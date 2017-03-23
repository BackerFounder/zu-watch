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


var MutationObserver = window.MutationObserver
  || window.WebKitMutationObserver
  || window.MozMutationObserver;

var observeMutationSupport = !!MutationObserver;

// mobile
// add to cart
$('body').on('click', '.seecart-btn, .add-this-btn, #addtocart' , function () {
	$('#code-and-share').addClass('active')
  isAnimated = true // 避免 observeItemChange 執行太多次
  // 監聽 Class 變化來移動到該位置，讓使用者知道加入了什麼
	$(".cart-item.null").each(function() {
    this.observer = new MutationObserver(observeItemChange);
    var config = {
    	attributes: true,
    	childList: false,
			characterData: false,
			subtree: false
    };
    this.observer.observe(this, config);
	});
	function observeItemChange(mutations) {
		// 除了避免執行多次，對 delete item 的變化做阻擋，讓使用者不會刪除東西跳來跳去
		if ( mutations[0].target.className.indexOf("null") == -1 && ed == true) {
			var d = mutations[0].target.offsetLeft - mutations[0].target.offsetWidth
    	$('#code-and-share .bottom-box').animate( { scrollLeft: d }, 400);
    }
    isAnimateded = false // observeItemChange 執行一次就不能執行 直到重新 click
	}
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
