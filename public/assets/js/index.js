/// Check MutationObserver
var MutationObserver = window.MutationObserver
  || window.WebKitMutationObserver
  || window.MozMutationObserver;

var observeMutationSupport = !!MutationObserver;
///

/// OS Browser will be toggle its height of window. Q_Q
if (/(iPhone)/i.test(navigator.userAgent)) {
  var ih = $('#preview .preview-show').height()
  $('#preview .preview-show').height(ih - 40);
}

/// change background form different Reward
$('[data-hover-show]').on('mouseover', function(){
	var h = $(this).attr('data-hover-show')
	$('.index-bg div').removeClass('show')
	$('.' + h).addClass('show')
	$('.build-bg').css('background-image', "url('/assets/img/main/bg/" + h + ".jpg')")
})

// Choose the Reward to go to build page
$('.index-action .btn').click(function () {
  $('#index').fadeOut(300);
  $('section').removeClass('hide')
  $('body').css('overflow', 'auto')
})


/// Go back to index
$('.gobackindex-btn, .zu-title a').click(function(e) {
	e.preventDefault()
	$('#index').fadeIn(300);
  $('section').addClass('hide')
  $('body').css('overflow', 'hidden')
})


// output modal
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

$('#cart-back, .preview-show-body').click( function () {
	$('#code-and-share').removeClass('active')
})


// hotsyle
$('#mobile-tools .hotstyle-btn').click( function () {
	$('section.left').addClass('active')
})

$('#recommend-back, .recommend-style, .preview-show-body').click( function () {
	$('section.left').removeClass('active')
})


// mockup type select

// mockup show
$('.mockup-btns .mockup-btn, #mobile-tools .mockup-btn').click(function() {
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


if ( $(window).width() <= 850 ) {
	$('.wrap .mockup-man').attr('src', '/assets/img/main-mobile/mockup/man.png')
	$('.wrap .mockup-woman').attr('src', '/assets/img/main-mobile/mockup/woman.png')
} else {
	$('.wrap .mockup-man').attr('src', '/assets/img/main/mockup/man.png')
	$('.wrap .mockup-woman').attr('src', '/assets/img/main/mockup/woman.png')
}