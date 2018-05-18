$(function(){

	$('.intro--demo--open').click(function(){
		// iframe初期化
		$("#DEMO").attr('src','');
		$("#DEMO").attr('src','demo/ready.html');
		// #DEMOを開始
		$('.intro--video, .intro--info--logo, .intro--info--text').addClass('hide');
		setTimeout(function(){
		$('.intro').addClass('mode--demo');
		},500);
		setTimeout(function(){
		$('.intro--demo--iframe, .intro--demo--menu, .intro--demo--close').addClass('show');
		},1000);
	});
	$('.intro--demo--close').click(function(){
		// #DEMOを終了
		$('.intro--demo--iframe, .intro--demo--menu, .intro--demo--close').removeClass('show');
		setTimeout(function(){
		$('.intro').removeClass('mode--demo');
		},500);
		setTimeout(function(){
		$('.intro--video, .intro--info--logo, .intro--info--text').removeClass('hide');
		},1000);
	});

});

$(window).on('load resize', function(){

	// intro背景動画の縦軸を中央に移動
	var ii = 504;// .intro--inner の高い状態の値
	var t = (( ii - $('.intro--video video').height() )/2);
	$('.intro--video').css({'top': t + 'px'});
	// ロゴ自動調節
	if($(window).outerWidth() < 960){
 	var lg = ( 336 - $('.intro--info--text').height() );
	}else{
 	var lg = 272;
	}
	$('.intro--info--logo span').css({'height': lg + 'px'});

});

// PCのみ
if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
$(function(){

	// 動画タグを挿入
	var src = '/img/index/demo-v1.mp4';
	$('.intro--video').html('<video loop autoplay preload="none"><source src="' + src + '"></video>');

});
$(window).on('resize', function(){

	// iframeを中央に
 	var h = (( $('.intro--demo--iframe').height() - $('.intro--demo--iframe div').height() )/2);
	$('.intro--demo--iframe div').css({'margin': h + 'px auto'});

	// PC：iframe再読込
	var src = $('iframe#DEMO').attr('src');// 既に入っているURLの確保
	$('iframe#DEMO').attr('src','');
	$('iframe#DEMO').attr('src',src);

});
}