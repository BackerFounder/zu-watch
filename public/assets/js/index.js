$('[data-hover-show]').on('mouseover', function(){
	var h = $(this).attr('data-hover-show')
	$('.index-bg div').removeClass('show')
	$('.' + h).addClass('show')
	$('.build-bg').css('background-image', "url('/assets/img/main/bg/" + h + ".jpg')")
})

$('.index-action .btn').click(function () {
  $('#index').fadeOut(300);
  $('section').removeClass('hide')
  $('body').css('overflow', 'auto')
})

$('#cart-code-btn').click(function(){
	$('#output-popup').fadeIn(300);
})
$('#output-popup .close').click(function(){
	$('#output-popup').fadeOut(300);
})


// mobile
$('body').on('click', '#addtocart, .add-this-btn' , function () {
	$('#code-and-share').addClass('active')
})
$('#cart-back').click( function () {
	$('#code-and-share').removeClass('active')
})