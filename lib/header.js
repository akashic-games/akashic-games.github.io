$(function(){

	// header幅 //
 	var hs = $('header').width();
	$('header .head--inner').css({'width': hs + 'px'});

	// SP：メニュー開閉 //
	$('.head--content--open').click(function(){
		$('body').toggleClass('lock');
		$('#OuterBox').toggleClass('lock');
		$('.head--content').toggleClass('show');
		$('.head--content--open').toggleClass('done');
	});

});

$(window).on('resize', function(){

	// header幅(サイズ変更時再計算) //
 	var hs = $('header').width();
	$('header .head--inner').css({'width': hs + 'px'});

});