$(document).ready(function(){
	$('.set-check-btn').click(function(){
		$('.card').css('border','solid rgb(0, 0, 0) 2px');
		$('.alert').hide();
		var cardDict = {};
		var num;
		var color;
		var shape;
		var pattern;
		var alert = false;
		var multiple_cards = [];
		var colors = ['solid rgb(255, 0, 0) 2px','solid rgb(0, 0, 255) 2px','solid rgb(50, 240, 0) 2px',
						'solid rgb(255, 0, 255) 2px','solid rgb(50, 255, 255) 2px','solid rgb(255, 255, 0) 2px'];
		$('.card').each(function(){
			num = String($(this).children('select.num').val());
			color = String($(this).children('select.color').val());
			shape = String($(this).children('select.shape').val());
			pattern = String($(this).children('select.pattern').val());
			if (cardDict[num+color+shape+pattern] === undefined){
				cardDict[num+color+shape+pattern] = [];
				cardDict[num+color+shape+pattern].push($(this));
			}
			else {
				if (multiple_cards.indexOf(num+color+shape+pattern) == -1){
					multiple_cards.push(num+color+shape+pattern);
				}
				cardDict[num+color+shape+pattern].push($(this));
				console.log($(this))
				alert = true;
			}
		});
		if(alert) {
			$('.alert').show();
			for (var i = 0; i < multiple_cards.length; i++) {
				console.log(multiple_cards[i]);
				for (var j = 0; j < cardDict[multiple_cards[i]].length; j++) {
					$(cardDict[multiple_cards[i]][j]).css('border',colors[i]);
					console.log($(cardDict[multiple_cards[i]][j]));
				}
			}
		}
		
	});
});