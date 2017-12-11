$(function(){

	// ページトップ //
	var PageTop = $('.page--top');
	PageTop.hide();
	var shown = false;

	$('#OuterBox').scroll(function (){
		var scrollTop = $(this).scrollTop();
		var h = $('#OuterBox').height();

		if (!shown && scrollTop > h){/* 非表示の状態で画面(縦)の値を超えたら */
			PageTop.fadeIn();
			shown = true;
		} else if (shown && scrollTop <= h) {/* 表示状態で画面(縦)値に収まる位置なら */
			PageTop.fadeOut();
			shown = false;
		}
	});
	PageTop.click(function (){
		$('#OuterBox').animate({scrollTop: 0}, 500, 'swing');
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