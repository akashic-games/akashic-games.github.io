window.addEventListener("load", function(){
	// 爆発 //
	var h = $('.explosive').height() - $('.explosive li').height();
	var w = $('.explosive').width() - $('.explosive li').width();
	setInterval(function () {
		var y = Math.round((Math.random()*100) * h /100);
		var x = Math.round((Math.random()*100) * w /100);
		var explosion = $('<li style="top:' + y + 'px; left:' + x + 'px;"></li>');
		$('.explosive').prepend(explosion);
		setTimeout(function () {
			explosion.remove();
		}, 250);
	}, 50);
});