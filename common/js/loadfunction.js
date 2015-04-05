






















/*---------------------------------------*
	スライダー
/*---------------------------------------*/

var load_fn1 = function(){

	$(function(){






//カウンター
var i = 0;

//コンテンツの数＋１
var page = (i+5)%5;








/*---------------------------------------*
	//次ページへ　の
/*---------------------------------------*/
	$(window).on('click','.button',function(){ $('.click').text(page); });

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

}
























/*---------------------------------------*
	ギャラリー
/*---------------------------------------*/
var load_fn3 = function(){



$(function(){



//変数宣言	
var positionx;
var positiony;
var wrapper_margin;







/*---------------------------------------*/
	//#galleryの幅を自動で設定
/*---------------------------------------*/


			//イメージ用から幅を計算して適用する

					var gallery_width = 0;
					$('#load_wrapper #box img').each(function(){
						gallery_width = (gallery_width + parseInt($(this).attr('width')));
					}); 




			//幅とセンタリングマージンの適用

					$('#load_wrapper #box').css({
						width:gallery_width+"px",
						marginLeft:"-"+(gallery_width/2)+"px",
					});








/*---------------------------------------*/
	//windowの幅を取得　表示
/*---------------------------------------*/


			//ウィンドウ幅を取得

					var windowsize = window.innerWidth;
			
			//indicatorに書き出し

					$('#windowsize>span').text(windowsize);
					
					$(window).resize(function(){
						var windowsize = window.innerWidth;
						$('#windowsize>span').text(windowsize);
					});





/*---------------------------------------*/
	//ギャラリーの設定
/*---------------------------------------*/


//バグ　読み込みじゃないと動かない
			// stageのmargin-left の値を取得

			if($('#wrapper')){
				wrapper_margin = $('#wrapper').css('margin-left').match(new RegExp('[0-9]{0,9}')).toString();
				parseInt(wrapper_margin);
			}





			//画像を触ると動く

			$(window).mousemove(function(e) {



				//必要な情報を取得


					//ウィンドウの幅
						var windowsize = window.innerWidth;

					//マウスの座標
						var positionx = e.pageX;
						var positiony = e.pageY;



					//pageXの値の基準を　window幅の中心に持っていく
					//画面の中心から左に行くと　-の値になるように変換
						var centerx = positionx-(windowsize/2);



					//pageXの位置を相対的に取得
					//windowsizeを100分割した幅（1%）が いくつあると centerxになるか考える
						var persentx = -(centerx / (windowsize/100));




					//persentX を画像の割合に変換する

					//座標がwindowに対して左から 何%の位置にあるか

						var n = ( positionx / windowsize )*100;

			//boxがwindowsizeをはみ出していることが前提
			//はみ出した文の1% を 画面の位置の相対的な位置 n でかける
			// つまり　画面の 相対的な位置と はみ出した文の相対的な位置を　ひも付けている

			var s = (   ( windowsize-$('#box').outerWidth() )/100   )*n-wrapper_margin;




			//indicatorに書き出し
			$('#positionx>span').text(positionx);
			$('#positiony>span').text(positiony);



			setTimeout(function(){$('#box').css({
				marginLeft:s,
			});},150);
			
		});

});

}
// load_fn3();






















var load_fn4 = function(){


//全体のカウント 1~l　までカウントする
	var count = 1;


	var l_count = 1;
	var before_count;



	//要素の数
	var l = $('#three_slider li').length;
	//角度シータ
	var theta = 360/l;




	//スタイルを書き出す
	for(i=1; i<=l; i++){
		$('#3Dslider_style').append(

			'#three_slider .three_panel'+i+'{\n'+
			'	transform:rotateY('+theta*(i-1)+'deg) translateZ(200px);\n'+
			'}\n'+
			'\n'+

			'.rotY_prev'+i+'{\n'+
			'	animation:rotY_prev'+i+' 0.5s ease;\n'+
			'	transform:rotateY('+theta*(i-1)+'deg) translateZ(0px);\n'+
			'}\n'+
			'@keyframes rotY_prev'+i+'{\n'+
			'	0%{transform:rotateY('+((theta*(i-1))-theta)+'deg) translateZ(0px);}\n'+
			'	100%{transform:rotateY('+theta*(i-1)+'deg) translateZ(0px);}\n'+
			'}\n'+
			'\n'+

			'.rotY_next'+i+'{\n'+
			'	animation:rotY_next'+i+' 0.5s ease;\n'+
			'	transform:rotateY('+theta*(i-1)+'deg) translateZ(0px);\n'+
			'}\n'+
			'@keyframes rotY_next'+i+'{\n'+
			'	100%{transform:rotateY('+theta*(i-1)+'deg) translateZ(0px);}\n'+
			'	0%{transform:rotateY('+((theta*(i-1))+theta)+'deg) translateZ(0px);}\n'+
			'}\n'+
			'\n'+
		'');
	}


	prefixFree();





	$('#three_slider_prev').click(function(){
		//nextクラスを削除
		for(rm=1; rm<=l; rm++){
			$('#Y').removeClass('rotY_next'+rm);
		}


		//クリックしたとき＋１する	初期値は1なので　2 からスタート
		count++;

		//countが増えすぎたらリセット
		if(count>l) count=1;

		//一つ前のカウントを保存
		before_count = (count+(l-2))%l+1;


		//indicatorに書き出しチェック
		$('#count span').text(count);
		$('#before_count span').text(before_count);


		//カウントに対応した角度を割り振ったクラスを取り付ける
		$('#Y').removeClass('rotY_prev'+before_count)
				.addClass('rotY_prev'+count);
	});



	$('#three_slider_next').click(function(){
		//prevクラスを削除
		for(rm=1; rm<=l; rm++){
			$('#Y').removeClass('rotY_prev'+rm);
		}

		//クリックしたとき＋１する	初期値は1なので　2 からスタート
		count--;

		//countが増えすぎたらリセット
		if(count<=0) count=l;

		//一つ前のカウントを保存
		before_count = count%l+1;


		//indicatorに書き出しチェック
		$('#count span').text(count);
		$('#before_count span').text(before_count);


		//カウントに対応した角度を割り振ったクラスを取り付ける
		$('#Y').removeClass('rotY_next'+before_count)
				.addClass('rotY_next'+count);


	});
















}//load_fn4



























var load_fn5 = function(){







	$(function(){
		




/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
			//必要な値を用意する
/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/



			//カウント用変数
			var circle_count = 1;


			//要素の数
			var l = $('#load_wrapper li').length;


			//円を要素の数で割った角度
			var deg = 360/l;


			//円の半径
			var r = 200;


			//ステージの取得
			var stage = $('#stage');


			//ステージの 幅 / 高さ を取得
			var stageWidth = stage.outerWidth();
			var stageHeight = stage.outerHeight();


			//幅をpx指定しても自動で割り出してセンタリングする
			stage.css({
				marginLeft:-stageWidth/2,	//ステージの幅から中心を割り出して　基準点をずらす
				left:'50%'					//基準点をウィンドウの中心に持っていく
			})








/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
			//スタート位置をランダムに設定
/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/



			//要素の数だけ処理 01 ランダムに配置
			$('#load_wrapper li').each(function(){




					//初期位置のをランダムで取得
					var posrnd = Math.round(Math.random()*stageWidth*10)/10;
					var rotrnd = Math.round(Math.random()*360);//?



					$(this).css({


						//stageの範囲内でランダムに配置
						left:posrnd,
						bottom:posrnd,

						//最初の大きさ
						width:'80px',
						height:'80px',




					});//css
			});//each








/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
			//スタート位置をランダムに設定
/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/



			//要素の数だけ処理 02 円形に再配置
			
			$('#load_wrapper li').each(function(){


					$(this).animate({


						position:'absolute',



						// ┌────────────────────────────────────────────────────────────────────┐ \\
						// │	cosθ は x座標 を示す		//sinθ は y座標 を示す  			        │ \\
						// ├────────────────────────────────────────────────────────────────────┤ \\
						// │    π / 180 * deg　は　角度をradian単位に変換している                    │ \\
						// └────────────────────────────────────────────────────────────────────┘ \\
						



						/* x座標 */
						left: 	r*Math.cos(Math.PI/180*(deg*circle_count))
								+(stageWidth/2)
								,

																		//+(stageWidth/2)にすることで円全体を右上にずらす




						/* y座標 */
						bottom: r*Math.sin(Math.PI/180*(deg*circle_count))
								+(stageHeight/4)
								,

																		//r(半径)の数値を変更することで楕円にすることも可能


						//アニメーション後の大きさ
						width:'20px',
						height:'20px',



				},2000);//animate




			circle_count++;

			});//each
				


		});//おわり

}//load_fn5





















var load_fn6 = function(){





		$(function(){


/*---------------------------------------*
	load時にGPU処理に負荷がかかるので
	sphere_navを消す
/*---------------------------------------*/

		var sphere_nav;


		if(sphere_nav = $('#sphere_nav')){

			sphere_nav.animate({opacity:0},1000).css({display:"none"});

			$('#close_panel_button').click(function(){
				sphere_nav.css({display:"block"}).animate({opacity:1},1000);
			});

		}//if



/*---------------------------------------*
	重い場合に再生を止めるスイッチ
/*---------------------------------------*/
		

		$('#player #stop').click(function(){
			$('.sphe').removeClass('sphe1 sphe2');
		});

		$('#player #play').click(function(){
			$('#sphe1').addClass('sphe1');
			$('#sphe2').addClass('sphe2');
		});

/*---------------------------------------*
	要素の数に対応して角度を割り出す
/*---------------------------------------*/


		var cl = $('.c').length;
		var clhalf = Math.ceil(cl/2);
		var cPI = 360/cl;

		for(i=0; i<=cl; i++){
			$('#sphere_obj').append(
				".c"+ (i+1) +"{\n"+
				" transform:rotateY("+Math.round(cPI*i)+"deg) \n"+
				// " rotateX(80deg); \n"+
				"}"+
			'');
		}


		prefixFree();
/*---------------------------------------*		//これは animation本体の方でコントロールしないといけない
	新規タブで開くリンク
/*---------------------------------------*/


		// $('#load_wrapper').append(

		// '<div id="link_area">\n'+
		// '<div id="sphere_obj">球体<span class="none">をカスタマイズしたものもあります</span></div>\n'+
		// '<div><a href="common/html/UI/sphere_custom.html" target="_blank">カスタマイズ例</a></div>\n'+
		// '<div><a href="common/html/UI/sphere.html" target="_blank">動きが重い場合はこちら</a></div>\n'+
		// '</div>\n'+

		// 	'')




		});

}//load_fn6










