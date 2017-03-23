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

$('.gobackindex-btn, .zu-title a').click(function(e) {
	e.preventDefault()
	$('#index').fadeIn(300);
  $('section').addClass('hide')
  $('body').css('overflow', 'hidden')
})

$('#cart-code-btn').click(function(){
	$('#output-popup').fadeIn(300);
})
$('#output-popup .close').click(function(){
	$('#output-popup').fadeOut(300);
})


// mobile

// add to cart
$('body').on('click', '.seecart-btn, .add-this-btn, #addtocart' , function () {
	$('#code-and-share').addClass('active')
})
$('#cart-back').click( function () {
	$('#code-and-share').removeClass('active')
})


// hotsyle
$('#mobile-tools .hotstyle-btn').click( function () {
	$('section.left').addClass('active')
})

$('#recommend-back').click( function () {
	$('section.left').removeClass('active')
})


// mockup type select
$('#mobile-tools .mockup-btn').click( function () {
	$('.mockup-btns').addClass('active')
})

$('#mockup-back').click( function () {
	$('.mockup-btns').removeClass('active')
})

// mockup show
$('.mockup-btns .mockup-btn').click(function() {
	$('.mockup-btns').removeClass('active')
	var t = $(this).attr('data-who')
	$('#mockup-area').fadeIn(300);
	$('.wrap>img').css('opacity', '0');
	$('.wrap>img.mockup-' + t).css('opacity', '1');
})

$('#mockup-area .back').click( function () {
	$('#mockup-area').fadeOut(300);
})

// s -> b
$('#cart-bigger').click(function(){
	$(this).toggleClass('active')
	$('section.right').toggleClass('bigger')
})
