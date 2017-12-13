$(function(){

	// SP：メニュー開 //
	$('.SP--head--menu--show').click(function(){
		$('#OuterBox').addClass('lock');
		$('.window--dark').addClass('show');
		$('.head--menu').addClass('show');
		$('.SP--head--menu--show').hide();
		$('.SP--head--menu--hide').show();
	});
	// SP：メニュー閉 //
	$('.SP--head--menu--hide, .window--dark').click(function(){
		$('#OuterBox').removeClass('lock');
		$('.window--dark').removeClass('show');
		$('.head--menu').removeClass('show');
		$('.SP--head--menu--show').show();
		$('.SP--head--menu--hide').hide();
	});

});

// header幅・border幅 //
$(window).on('load resize', function(){
	 var hw = $('header').width();
	 var bw = $(window).width() - $('header').width();
	$('#OuterBox').css({'border-right-width': bw + 'px'});
	$('header .head--inner').css({'width': hw + 'px'});
});