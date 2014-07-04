$(document).ready(function(){
	var columns = 4;
	var cardWidth = 130;
	$('.set-check-btn').click(function(){
		$('.card').css('border','solid rgb(0, 0, 0) 2px');
		$('.alert').hide();
		var showSet = $(".show-set").is(':checked');
		var cardDict = {};
		var num;
		var color;
		var shape;
		var pattern;
		var alert = false;
		var multiple_cards = [];
		var set = [];
		var colors = ['solid rgb(255, 0, 0) 2px','solid rgb(0, 0, 255) 2px','solid rgb(50, 240, 0) 2px',
						'solid rgb(255, 0, 255) 2px','solid rgb(50, 255, 255) 2px','solid rgb(255, 255, 0) 2px'];
		$('.card:visible').each(function(){
			num = String($(this).children('select.num').val());
			color = String($(this).children('select.color').val());
			pattern = String($(this).children('select.pattern').val());
			shape = String($(this).children('select.shape').val());
			if (cardDict[num+color+pattern+shape] === undefined){
				cardDict[num+color+pattern+shape] = [];
				cardDict[num+color+pattern+shape].push($(this));
			}
			else {
				if (multiple_cards.indexOf(num+color+pattern+shape) == -1){
					multiple_cards.push(num+color+pattern+shape);
				}
				cardDict[num+color+pattern+shape].push($(this));
				alert = true;
			}
		});
		if(alert) {
			$('#duplicates').show();
			for (var i = 0; i < multiple_cards.length; i++) {
				for (var j = 0; j < cardDict[multiple_cards[i]].length; j++) {
					$(cardDict[multiple_cards[i]][j]).css('border',colors[i]);
				}
			}
		}
		else {
			var cardKeys = Object.keys(cardDict);
			for (var i = 0; i < cardKeys.length; i++) {
				for (var j = 1; j < cardKeys.length; j++) {
					for (var k = 2; k < cardKeys.length;k++) {
						if (i != j && i != k && j != k) {
							var isSet = true;
							var card1 = cardKeys[i];							
							var card2 = cardKeys[j];
							var card3 = cardKeys[k];
							var typeTracker = [[card1[0], card2[0], card3[0]],
												[card1[1], card2[1], card3[1]],
												[card1[2], card2[2], card3[2]],
												[card1[3], card2[3], card3[3]]]
							for (var m = 0; m < typeTracker.length; m++) {
								var counts = {};
								for(var n = 0; n < typeTracker[m].length; n++) {
								    var num = typeTracker[m][n];
								    counts[num] = counts[num] ? counts[num]+1 : 1;
								}
								if (counts[0] == 2 || counts[1] == 2 || counts[2] == 2) {
									isSet = false;
								}
							}
							if (isSet) {
								if (set.length == 0) {
									set.push($(cardDict[card1][0]));
									set.push($(cardDict[card2][0]));
									set.push($(cardDict[card3][0]));
								}
							}							
						}
					}
				}
			}
			if (showSet) {
				var colorIndex = Math.floor(Math.random()*colors.length);
				for (var i = 0; i < set.length; i++) {
					set[i].css('border', colors[colorIndex]);
				}
			}
			if (set.length == 0) {
				$('#no-set').show();
			}
			else {
				$('#set').show();
			}
		}
	});
	$('.add-column').click(function(){
		if (columns < 7){ 
			columns++;
			$('.card-table').width(String(columns*cardWidth)+'px');
			$('.lineWrapper').each(function(){
				$(this).append('<div class="card">'+
					'<select class="form-control btn btn-xs num">' +
                        '<option value="0">1</option>' +
                        '<option value="1">2</option>' +
                        '<option value="2">3</option>' +
                    '</select>' +
                    '<select class="form-control btn btn-xs color">' +
                        '<option value="0">green</option>' +
                        '<option value="1">red</option>' +
                        '<option value="2">purple</option>' +
                    '</select>' +
                    '<select class="form-control btn btn-xs pattern">' +
                        '<option value="0">open</option>' +
                        '<option value="1">striped</option>' +
                        '<option value="2">filled</option>' +
                    '</select>' +
                    '<select class="form-control btn btn-xs shape">' +
                        '<option value="0">ovals</option>' +
                        '<option value="1">diamonds</option>' +
                        '<option value="2">squiggles</option>' +
                    '</select>' +
				'</div>');
			});
		}
	});
	$('.rmv-column').click(function(){
		if (columns > 1){ 
			columns--;
			$('.card-table').width(String(columns*cardWidth)+'px');
			$( ".lineWrapper .card:last-child" ).remove();
		}
	});
});