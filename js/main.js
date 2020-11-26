//This function is for some tests i run

$(document).ready(function() {

    

    $form = $('form');
    $form.validate({
        highlight: function(element) {
            $(element).removeClass('input-valid').addClass('input-error');
        },

        unhighlight: function(element) {
            $(element).removeClass('input-error').addClass('input-valid');
        }
    });


    var $inputs = $('input');
    $inputs.each(function() {

        $(this).rules('add', {
            required: true,
            range: [-50,50]
        });

    });

    $('.slider').slider({

        max: 50,
        min: -50,

        /* "Moving the slider should instantly change the text input field
            value." */
        slide: function(event, ui) {                // On slide

            $(this).siblings('input').val(ui.value);// Update input value
            if ($form.valid()) generate();     // Update table if possible

        }

    }).css('margin-bottom', '1em');


    $inputs.on('change', function() {       // On input change.

        if ( $.isNumeric($(this).val()) ) { // If the new value is valid.

            // Update the corresponding slider.
            $(this).siblings('.slider').slider( "value", $(this).val() );

            // If the entire form is valid, update the table.
            if ($form.valid()) generate();
        }

    });

    var i = 0,
        vals = [1,5,1,5];
    $inputs.each(function() {
        $(this).val(vals[i]);
        i++;
    });
    $inputs.trigger('change');


    var i = 1;
    var str_input_vals = "";
    var curTabId = "";
    var $tabs = $('#tabs').tabs();

    

    $("#save-btn").on('click', function(e) {
        e.preventDefault();

        // Create tab label
        str_input_vals = "";
        $inputs.each(function() {
            str_input_vals += $(this).val() + ', ';
        });
        str_input_vals = str_input_vals.substring(0, str_input_vals.length - 2);
        str_input_vals = '('.concat(str_input_vals, ')');

        // Generate tab
        curTabId = ('tabs-' + i);
        $newDiv = $('<div>')
                    .attr('id', curTabId).addClass('overflow-auto')
                    .append( $('#table').clone().html() );
        $newDiv.children().removeAttr('id');
        $('#tabs ul').append('<li><a href="#' + curTabId + '">' + str_input_vals + "</a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>");
        $tabs.append( $newDiv );
        i++;

        // Refresh tab widget and select the newly added tab.
        $tabs.tabs("refresh");
        $('a[href="#' + curTabId + '"]').click();

    });

    $tabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        $tabs.tabs("refresh");
    });


});





// this is our generate function where we generate the table
function generate() {
    
    var array = [],i,j;

    $('input').each(function() {
        array.push(parseInt($(this).val(),10));
    });


    for(i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
    //swap if needed
    for(var i =0; i < array.length;i+=2) {
        if(array[i] > array[i+1]) {
            [array[i+1], array[i]] = [array[i], array[i+1]];
        }
    }
    var $table = $('#tabler')
    //var $col = $table.parent();
    $table.empty()
 
    var $row = $('<tr>');
    $row.append('<th>');

    // $col.css({
    //     'opacity': '0.0',
    //     'padding-left': '500px'
    // });

    for(var i = array[0]; i <= array[1]; i++) {
        $row.append('<th>' + i + '</th>');
    }
    $table.append($row);
    
    
    for(var j = array[2]; j <= array[3]; ++j) {
        $row = $('<tr>');

        $row.append('<th>' + j + '</th>')
        for(var i = array[0]; i <= array[1]; ++i) {
            $row.append('<td>' + (i * j) + '</td>');
        }
        $table.append($row);
    }
   

}
