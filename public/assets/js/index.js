$('[data-hover-show]').on('mouseover', function(){
	var h = $(this).attr('data-hover-show')
	$('.index-bg div').removeClass('show')
	$('.' + h).addClass('show')
	$('.build-bg').css('background-image', "url('/assets/img/main/bg/" + h + ".jpg')")
})