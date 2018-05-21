$(function(){
//↓//

	// SP：メニュー開 //
	$('.SP--head--menu--show').click(function(){
		$('html, body, #BodyInner').addClass('lock');
		$('.window--dark').addClass('show');
		$('.head--menu--outer').addClass('show');
		$('.SP--head--menu--show').hide();
		$('.SP--head--menu--hide').show();
	});

	// SP：メニュー閉 //
	$('.SP--head--menu--hide, .window--dark').click(function(){
		$('html, body, #BodyInner').removeClass('lock');
		$('.window--dark').removeClass('show');
		$('.head--menu--outer').removeClass('show');
		$('.SP--head--menu--show').show();
		$('.SP--head--menu--hide').hide();
	});

	// ページトップ：表示／非表示 //
	$('.page--top').hide();
	var shown = false;

	$(window).scroll(function (){
		var scrollTop = $(this).scrollTop();
		var h = $(window).height();

		if (!shown && scrollTop > h){/* 非表示の状態で画面(縦)の値を超えたら */
			$('.page--top').fadeIn();
			shown = true;
		} else if (shown && scrollTop <= h) {/* 表示状態で画面(縦)値に収まる位置なら */
			$('.page--top').fadeOut();
			shown = false;
		}
	});

	// ページトップ：ページ最上部へ //
	$('.page--top').click(function (){
	$('html,body').animate({scrollTop: 0}, 500, 'swing');
	return false;
	});

//↑//
});