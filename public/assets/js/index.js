/// Check MutationObserver
var MutationObserver = window.MutationObserver
  || window.WebKitMutationObserver
  || window.MozMutationObserver;

var observeMutationSupport = !!MutationObserver;
///

/// OS Browser will be toggle its height of window. Q_Q
if (/(iPhone)/i.test(navigator.userAgent)) {
  // var ih = $('#preview .preview-show').height()
  // $('#preview .preview-show').height(ih - 40);
  // $('body').animate( { scrollTop: 0 }, 0);
}

/// change background form different Reward
$('body').on('mouseover', '[data-hover-show]', function(){
	var h = $(this).attr('data-hover-show')
	$('.index-bg div').removeClass('show')
	$('.' + h).addClass('show')
	$('.build-bg').css('background-image', "url('/assets/img/main/bg/" + h + ".jpg')")
})

// Choose the Reward to go to build page
$('body').on('click', '.index-action .btn' ,function () {
  $('#index').fadeOut(300);
  $('section').removeClass('hide')
  $('body').css('overflow', 'auto')
  $('body').animate( { scrollTop: 0 }, 0);
})


/// Go back to index
$('body').on('click', '.gobackindex-btn, .zu-title a', function(e) {
	e.preventDefault()
	$('#index').fadeIn(300);
  $('section').addClass('hide')
  $('body').css('overflow', 'hidden')
})


// output modal
$('body').on('click', '#cart-code-btn', function(){
	$('#output-popup').fadeIn(300);
})
$('body').on('click', '#output-popup .close', function(){
	$('#output-popup').fadeOut(300);
})

// details modal
$('body').on('click', '[data-details]', function(){
	var t = $(this).attr('data-details')
	$('#details-popup').fadeIn(300);
	$('#details-popup .content').hide();
	$('#details-popup .content[data-details="' + t + '"]').show();
})
$('body').on('click', '#details-popup .close', function(){
	$('#details-popup').fadeOut(300);
})

// mobile
// add to cart
$('body').on('click', '.seecart-btn, .add-this-btn, #addtocart' , function () {
	$('#code-and-share').addClass('active')
})

$('body').on('click', '#cart-back, .preview-show-body', function () {
	$('#code-and-share').removeClass('active')
})


// hotsyle
$('body').on('click', '#mobile-tools .hotstyle-btn', function () {
	$('section.left').addClass('active')
})

$('body').on('click', '#recommend-back, .recommend-style, .preview-show-body', function () {
	$('section.left').removeClass('active')
})


// mockup type select

// mockup show
$('body').on('click', '.mockup-btns .mockup-btn, #mobile-tools .mockup-btn', function() {
	$('.mockup-btns').removeClass('active')
	var t = $(this).attr('data-who')
	$('#mockup-area').fadeIn(300);
	$('.wrap>img').css('opacity', '0');
	$('.wrap>img.mockup-' + t).css('opacity', '1');
})

$('body').on('click', '#mockup-area .back', function () {
	$('#mockup-area').fadeOut(300);
})

// s -> b
$('body').on('click', '#cart-bigger', function(){
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


console.log("Hi, I'm Doppler Kuo.")
console.log("This is my website: http://www.doppler.rocks/")