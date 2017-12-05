$(function() {

	// SP：コンテンツ展開 //
	$('.head--content--open').click(function(){
		$('body').toggleClass('lock');
		$('.body--shadow').toggleClass('show');
		$('.head--content').toggleClass('show');
		$('.head--content--open').toggleClass('done');
	});

});