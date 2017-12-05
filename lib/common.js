$(function(){

	// ページトップ //
	var PageTop = $('.page--top');
	PageTop.hide();
	var shown = false;
	$(window).scroll(function (){
		var scrollTop = $(this).scrollTop();
		var height = $(window).height();
		if (!shown && scrollTop > height){/* 非表示の状態で画面(縦)の値を超えたら */
			PageTop.fadeIn();
			shown = true;
		} else if (shown && scrollTop <= height) {/* 表示状態で画面(縦)値に収まる位置なら */
			PageTop.fadeOut();
			shown = false;
		}
	});
	PageTop.click(function (){
		$('html,body').animate({scrollTop: 0}, 500, 'swing');
		return false;
	});

	// ページ内スムーズアンカー //
	$('a[href^="#"]').click(function(){
		var href = $(this).attr('href');
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top - 56;/* ヘッダ(40)＋余裕(16) */
		$('html,body').animate({scrollTop: position}, 500, 'swing');
		return false;
	});

});
