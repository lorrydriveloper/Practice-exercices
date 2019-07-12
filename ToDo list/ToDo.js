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

$('ul').on('click', 'li', function (e) {
  /*e.offsetX return the x coordinate of the click event and we check if is done in
     the after element set at 40 px because we move in css -40px and in hover we return
     it at its natural place.*/
    if (e.offsetX > 40) { 
       $(this).addClass('done')
    }
     else{
       // click on :before element
      $(this).slideUp(500, function () {
          $(this).remove();
      })

   }
});
