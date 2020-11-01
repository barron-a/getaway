document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
});

// Or with jQuery

$(document).ready(function () {
    $('select').formSelect();
});


//note we are going to need this !advanced note: When dynamically changing the value of a textarea with methods like jQuery's
// .val(), you must trigger an autoresize on it afterwords because .val() does not automatically trigger 
// the events we've binded to the textarea.
//$('#textarea1').val('New Text');
//M.textareaAutoResize($('#textarea1'));