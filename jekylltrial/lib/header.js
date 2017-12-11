$(function(){

	// header幅・border幅(スクロールバー幅と同じ) //
 	var hw = $('header').width();
 	var bw = ($(window).width() - $('header').width());
	$('header .head--inner').css({'width': hw + 'px'});
	$('#OuterBox').css({'border-right-width': bw + 'px'});

	// SP：メニュー開 //
	$('.SP--head--content--show').click(function(){
		$('#OuterBox').addClass('lock');
		$('.window--dark').addClass('show');
		$('.head--content').addClass('show');
		$('.SP--head--content--show').hide();
		$('.SP--head--content--hide').show();
	});
	// SP：メニュー閉 //
	$('.SP--head--content--hide, .window--dark').click(function(){
		$('#OuterBox').removeClass('lock');
		$('.window--dark').removeClass('show');
		$('.head--content').removeClass('show');
		$('.SP--head--content--show').show();
		$('.SP--head--content--hide').hide();
	});

});

$(window).on('resize', function(){

	// header幅(サイズ変更時再計算) //
 	var hs = $('header').width();
	$('header .head--inner').css({'width': hs + 'px'});

});