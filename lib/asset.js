if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
$(window).on('resize', function(){

	// iframe再読込 //
	var src = $('iframe#DEMO').attr('src');// 既に入っているURLの確保 //
	$('iframe#DEMO').attr('src','');
	$('iframe#DEMO').attr('src',src);

});
}
$(function(){

	// 選択ファイル強調＋表示コード切替 //
	$('.asset--body--list li').click(function(){
	var num = $(this).index()+1;
	var txt = $(this).text();
		$('.asset--body--list li').removeClass('selected');
		$(this).addClass('selected');
		$('.asset--body--item pre, .asset--body--item div').hide();
		$('.asset--body--name').html(txt);
		$('#DEMO-ITEM-'+ num).show();
	});

	// asset--body--listスクロール追従 //
	var hh = $('header').height();
	var ot = $('.asset--body--list').offset().top;
	$(window).scroll(function (){
		if($(window).scrollTop() >= ot - hh){
			$('.asset--body--list, .asset--body--name, .asset--body--item').addClass('SP--fixed');
		}else{
			$('.asset--body--list, .asset--body--name, .asset--body--item').removeClass('SP--fixed');
		}
	});

});