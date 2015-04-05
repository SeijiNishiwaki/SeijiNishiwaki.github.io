$(function(){
	var i = 0;
	var page = (i+5)%5	;/*コンテンツの数＋１*/
	$('.button').click(function(){ $('.click').text(page); });
/* ー インナーネクスト　ー　クリックファンクション　ーーーーーーーーー*/
	$('#innernext').click(function(){
		
		i++;
		var page = (i+5)%5	/*コンテンツの数*/
		$('.click').text(page);
		switch(i){
			case 0:
			/*スイッチにコピペ--------------------------*/
							/*　cssの変更 */
		$('#width').animate({marginLeft:'-000%'}
							/*　animateオプション　*/
							,{duration:500});
		/*ーーーーーーーーーーーーーーーーーーーーーーー*/

			 break;
			case 1:
			/*スイッチにコピペ--------------------------*/
							/*　cssの変更 */
		$('#width').animate({marginLeft:'-100%'}
							/*　animateオプション　*/
							,{duration:500});
		/*ーーーーーーーーーーーーーーーーーーーーーーー*/

			 break;
			case 2:
			/*スイッチにコピペ--------------------------*/
							/*　cssの変更 */
		$('#width').animate({marginLeft:'-200%'}
							/*　animateオプション　*/
							,{duration:500});
		/*ーーーーーーーーーーーーーーーーーーーーーーー*/

			 break;
			case 3:
			/*スイッチにコピペ--------------------------*/
							/*　cssの変更 */
		$('#width').animate({marginLeft:'-300%'}
							/*　animateオプション　*/
							,{duration:500});
		/*ーーーーーーーーーーーーーーーーーーーーーーー*/

			 break;
			case 4:
			/*スイッチにコピペ--------------------------*/
							/*　cssの変更 */
		$('#width').animate({marginLeft:'-400%'}
							/*　animateオプション　*/
							,{duration:500});
		/*ーーーーーーーーーーーーーーーーーーーーーーー*/

			 break;   
		};
		$('.prev').show();
		if(i == 4){ $('.next').hide();};
	}); /* ー/インナーネクスト/　ークリックファンクションーーーーーーーーーーー*/

	/* ーインナープレブーーーーーーー　クリックファンクション　ーーーーーーーーー*/
	$('#innerprev').click(function(){
		
		i--;
		var page = (i+5)%5	/*コンテンツの数＋１*/
		$('.click').text(page);
		switch(i){
			case 0:
			/*スイッチにコピペ--------------------------*/
							/*　cssの変更 */
		$('#width').animate({marginLeft:'000%'}
							/*　animateオプション　*/
							,{duration:500});
		/*ーーーーーーーーーーーーーーーーーーーーーーー*/

			 break;
			case 1:
			/*スイッチにコピペ--------------------------*/
							/*　cssの変更 */
		$('#width').animate({marginLeft:'-100%'}
							/*　animateオプション　*/
							,{duration:500});
		/*ーーーーーーーーーーーーーーーーーーーーーーー*/

			 break;
			case 2:
			/*スイッチにコピペ--------------------------*/
							/*　cssの変更 */
		$('#width').animate({marginLeft:'-200%'}
							/*　animateオプション　*/
							,{duration:500});
		/*ーーーーーーーーーーーーーーーーーーーーーーー*/

			 break;
			case 3:
			/*スイッチにコピペ--------------------------*/
							/*　cssの変更 */
		$('#width').animate({marginLeft:'-300%'}
							/*　animateオプション　*/
							,{duration:500});
		/*ーーーーーーーーーーーーーーーーーーーーーーー*/

			 break;
			case 4:
			/*スイッチにコピペ--------------------------*/
							/*　cssの変更 */
		$('#width').animate({marginLeft:'-400%'}
							/*　animateオプション　*/
							,{duration:500});
		/*ーーーーーーーーーーーーーーーーーーーーーーー*/

			 break;   
		};
		$('.next').show();
		if(i == 0){ $('.prev').hide();};
	}); /* ーインナープレブー　ークリックファンクションーーーーーーーーーーー*/

	/*　アウターネクスト　歳後まで飛ぶ　ーーーーーーーーーーーーーーーーーーー*/
	$('#outernext').click(function(){
		$('#width').animate({ marginLeft:'-400%' });
		i = 4;
		$('.prev').show();
		if(i == 4){ $('.next').hide();};
	}); 
	/*　/アウターネクスト/　歳後まで飛ぶ　ーーーーーーーーーーーー*/
	/*　アウタープレヴ　ーーーーーーーーーーーーーーーーーーーーー*/
	$('#outerprev').click(function(){
		$('#width').animate({marginLeft:'0%'});
		i = 0;
		$('.next').show();
		if(i == 0){ $('.prev').hide();};
	});
	/*　アウタープレヴ　------------------------------------*/

});