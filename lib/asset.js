//↓読込時・リサイズ時↓//
$(window).on('load resize', function(){

	// iframeを再読込 //
	var src = $('.demo--head--main iframe').attr('src');// 既に入っているURLの確保 //
	$('.demo--head--main iframe').attr('src','');
	$('.demo--head--main iframe').attr('src',src);

	// iframeを中央に //
 	var x = (( $('.demo--head--main').width() - $('.demo--head--main iframe').width() )/2);
 	var y = (( $('.demo--head--main').height() - $('.demo--head--main iframe').height() )/2);
	$('.demo--head--main iframe').css({'left': x + 'px'});
	$('.demo--head--main iframe').css({'top': y + 'px'});

});
//↑読込時・リサイズ時↑//

$(function(){

	// 選択ファイル強調＋表示コード切替 //
	$('.demo--body--list li').click(function(){
	var num = $('.demo--body--list li').index(this) + 1;
		$('.demo--body--list li').removeClass('selected');
		$(this).addClass('selected');
		$('.demo--body--item pre').hide();// CODE //
		$('.demo--body--item div').hide();// CODE-IMAGES //
		$('#DEMO-ITEM-'+ num).show();
	});

	// ファイルメニュースクロール追従 //
	var t = $('.demo--body--list').offset().top;
	$(window).scroll(function (){
		if($(window).scrollTop() >= (t - $('header').innerHeight())){
			$('.demo--body--list').addClass('fixfliemenu--SP');
			$('.demo--body--item').addClass('fixfliemenu--SP');
		}else{
			$('.demo--body--list').removeClass('fixfliemenu--SP');
			$('.demo--body--item').removeClass('fixfliemenu--SP');
		}
	});

});