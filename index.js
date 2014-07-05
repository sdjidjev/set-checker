$(document).ready(function(){
    var columns = 0;
    var cardWidth = 130;
    function setImgSrc(elem) {
        var selectType = elem.attr('attrType');
        var selectValue = elem.val();
        var changedImg = elem.parent().parent().parent().find('img');
        var changedImgSrc = changedImg.attr('src');
        var changedImgSrcArray = changedImgSrc.split("");
        changedImgSrcArray[10+Number(selectType)] = String(selectValue);
        changedImgSrc = changedImgSrcArray.join("");
        changedImg.attr('src',changedImgSrc);
    }

    function addColumn() {
        if (columns >= 7) {
            return;
        }
        columns++;
        $('.card-table').width(String(columns*cardWidth)+'px');
        $('.lineWrapper').each(function(){
            var attr0 = Math.floor(Math.random()*3);
            var attr1 = Math.floor(Math.random()*3);
            var attr2 = Math.floor(Math.random()*3);
            var attr3 = Math.floor(Math.random()*3);
            var addElem = $('<div class="flip-container" ontouchstart="this.classList.toggle(\\"hover\\");">' +
                '<div class="flipper">' +
                    '<div class="front">' +
                        '<div class="card">' +
                            '<img src="cards/card'+String(attr0)+String(attr1)+String(attr2)+String(attr3)+'.png" class="card-pic">' +
                        '</div>' +
                    '</div>' +
                    '<div class="back">' +
                        '<div class="card select-card">' +
                            '<select class="form-control btn btn-xs num" attrType="0">' +
                                '<option ' + ((attr0 == 0) ? 'selected' : '') + ' value="0">1</option>' +
                                '<option ' + ((attr0 == 1) ? 'selected' : '') + ' value="1">2</option>' +
                                '<option ' + ((attr0 == 2) ? 'selected' : '') + ' value="2">3</option>' +
                            '</select>' +
                            '<select class="form-control btn btn-xs color" attrType="1">' +
                                '<option ' + ((attr1 == 0) ? 'selected' : '') + ' value="0">red</option>' +
                                '<option ' + ((attr1 == 1) ? 'selected' : '') + ' value="1">purple</option>' +
                                '<option ' + ((attr1 == 2) ? 'selected' : '') + ' value="2">green</option>' +
                            '</select>' +
                            '<select class="form-control btn btn-xs pattern" attrType="3">' +
                                '<option ' + ((attr3 == 0) ? 'selected' : '') + ' value="0">filled</option>' +
                                '<option ' + ((attr3 == 1) ? 'selected' : '') + ' value="1">striped</option>' +
                                '<option ' + ((attr3 == 2) ? 'selected' : '') + ' value="2">open</option>' +
                            '</select>' +
                            '<select class="form-control btn btn-xs shape" attrType="2">' +
                                '<option ' + ((attr2 == 0) ? 'selected' : '') + ' value="0">diamonds</option>' +
                                '<option ' + ((attr2 == 1) ? 'selected' : '') + ' value="1">ovals</option>' +
                                '<option ' + ((attr2 == 2) ? 'selected' : '') + ' value="2">squiggles</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>');
            $(this).append(addElem);
            addElem.find('select').change(function(){
                setImgSrc($(this));
            });
        });
    }

    addColumn();
    addColumn();
    addColumn();
    addColumn();

    $('.set-check-btn').click(function(){
        $('.card').css('border','solid rgb(0, 0, 0) 2px');
        $('.card').css('box-shadow', '0px 0px 0px 0px #000000');
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
        var colors = ['rgb(255, 0, 0)','rgb(0, 0, 255)','rgb(50, 240, 0)',
                        'rgb(255, 0, 255)','rgb(50, 255, 255)','rgb(255, 255, 0)'];
        $('.select-card').each(function(){
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
                    $(cardDict[multiple_cards[i]][j]).parent().parent().find('.card').css('border-color', colors[i]);
                    $(cardDict[multiple_cards[i]][j]).parent().parent().find('.card').css('box-shadow', '0px 0px 5px 5px ' + colors[i]);
                    
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
                var colorIndex = Math.floor(1+ Math.random()*(colors.length-1));
                for (var i = 0; i < set.length; i++) {
                    // set[i].css('border', colors[colorIndex]);
                    set[i].parent().parent().find('.card').css('border-color', colors[colorIndex]);
                    set[i].parent().parent().find('.card').css('box-shadow', '0px 0px 5px 5px ' + colors[colorIndex]);
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
        addColumn();
    });
    $('.rmv-column').click(function(){
        if (columns > 1){ 
            columns--;
            $('.card-table').width(String(columns*cardWidth)+'px');
            $( ".lineWrapper .flip-container:last-child" ).remove();
        }
    });
});