$('[data-hover-show]').on('mouseover', function(){
	var h = $(this).attr('data-hover-show')
	console.log(h)
	$('.index-bg div').removeClass('show')
	$('.' + h).addClass('show')
})