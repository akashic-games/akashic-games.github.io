//↓読込時・リサイズ時↓//
$(window).on('load resize', function(){

	// intro背景動画の縦軸を中央に移動 //
	var ii = 504;// .intro--inner の高い状態の値 //
	var t = (( ii - $('.intro--video video').height() )/2);
	$('.intro--video').css({'top': t + 'px'});

	// ロゴ自動調節 //
	var w = $(window).outerWidth();
	var x = 960;// PC用ページ幅の値 //
	if (w < x) {
 	var LogoHeight = ( 352 - $('.intro--sec2').innerHeight() );
	} else {
 	var LogoHeight = 272;
	}
	$('.intro--logo').css({'height': LogoHeight + 'px'});

	// DEMOiframeを中央に移動 //
	var t = (( $('.intro--demo--iframe').height() - $('#DEMO').height() )/2);
	var l = (( $('.intro--demo--iframe').width() - $('#DEMO').width() )/2);
	$('#DEMO').css({'top': t + 'px'});
	$('#DEMO').css({'left': l + 'px'});
});
//↑読込時・リサイズ時↑//

$(function() {

	// #DEMOを開始 //
	$('.intro--demo--open').click(function(){
		$("#DEMO").attr('src','');
		$("#DEMO").attr('src','demo/ready.html');// iframe初期化 //
		$('.intro--sec1').addClass('hide');
		$('.intro--sec2').addClass('hide');
		$('.intro--video').addClass('hide');
		setTimeout(function(){
		$('.intro--inner').addClass('mode--demo');
		},500);
		setTimeout(function(){
		$('.intro--demo').addClass('show');
		},1000);
	});

	// #DEMOを終了 //
	$('.intro--demo--close').click(function(){
		$('.intro--demo').removeClass('show');
		setTimeout(function(){
		$('.intro--inner').removeClass('mode--demo');
		},500);
		setTimeout(function(){
		$('.intro--sec1').removeClass('hide');
		$('.intro--sec2').removeClass('hide');
		$('.intro--video').removeClass('hide');
		},1000);
	});

});