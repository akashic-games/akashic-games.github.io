if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
$(window).on('resize', function(){

	// iframeを中央に //
 	var h = (( $('.demo--head--main').height() - $('.demo--head--main div').height() )/2);
	$('.demo--head--main div').css({'margin': h + 'px auto'});

	// iframe再読込 //
	var src = $('iframe#DEMO').attr('src');// 既に入っているURLの確保 //
	$('iframe#DEMO').attr('src','');
	$('iframe#DEMO').attr('src',src);

});
}
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