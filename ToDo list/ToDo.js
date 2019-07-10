$(document).ready()

const input = $('input')

$('span').on('click',function () {
    if (input.val() != '') {
        $('ul').append(`<li>${input.val()}</li>`)
        input.val('')
    }
    
});
$("input[type='text'").on('keypress', function (e) {
    if (e.which === 13) {
        $('ul').append(`<li>${input.val()}</li>`)
        input.val('')
    } 
});