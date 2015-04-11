
$(function(){


/*ーーーーーーーーーーーーーーーーーーーーーーー*/
		//設定項目
/*ーーーーーーーーーーーーーーーーーーーーーーー*/
//空間のコントロール
	var slope = 10;
	var control_rotX = (180 + slope); //通常は0 180 ということは 上下裏表がひっくり返っている
	var control_rotY = (180);
	var control_rotZ;

//位置の設定	%に対応させたい
	var positionX = "0px";
	var positionY = "-50px";
	var AllZposition = "500px";

//パネルの中心からのZ座標
	var positionZ = 110;

//パネルの大きさ
	var panel_width = "100%";
	var panel_height = "150%";

//centering_margin
	var CML = Math.round(panel_width.match(new RegExp('[0-9]{1,9}')))/2+panel_width.match(new RegExp('[%,a-z]{1,9}'));
	// var CMT = Math.round(panel_height.match(new RegExp('[0-9]{1,9}')))/2+panel_width.match(new RegExp('[%,a-z] {1,9}'));

//パネル選択時の表示位置の調整
	var tarTransX = "-50%";
	var tarTransY = "60%";
	var tarTransZ = "500px";
	// var tarMarginL = "0px";
	// var tarMarginT = "0px";

//軸の傾き設定
	var x = 0;

//アニメーションスピードの設定
	var duration = 0.5;

//透明度の設定
	var o = 1;
	var obd = 2;// opacity back duration
	var ofd = 1;// opacity front duration

//エフェクトタイム設定
	var effectTime = 0.8;




var circle_margin_top = "-200px";
var panel_margin_top = "50%";



//その他変数
var flag = false;			//何かが選択されているかを判定する
var save_position;			//前にクリックした座標を保存
var this_position;			//今クリックした座標
var target_position;		//ターゲット座標

var second_transform;



var style ;					//最初に選択されたパネルの座標
var origin_class;			//さいしょに選択されたパネルのクラス
var change;					//最初に選択されたパネルのターゲット座標

var check;					//選択か非選択かを判定する変数
var check2;					//セレクト中かどうかを判定する変数

var other_origin_style;		//後から選択した別のパネルの座標
var other_origin_class;		//後から選択した別のパネルのクラス

var front;					// パネルをクリックした時の　画面側を向くための角度

var url;
var save_url;
var no_selected_url;
/*ーーーーーーーーーーーーーーーーーーーーーーー*/
		//レスポンシブル設定
/*ーーーーーーーーーーーーーーーーーーーーーーー*/
// var win_width = $(window).width();//stage.js で取得済み

//変数宣言
var positionZ_save = positionZ;

//初期設定
	var stage_width = $('#stage').width(); 
		if(stage_width < 980){
			var positionZ_les = (positionZ*(stage_width/980));
			if(positionZ_les>50){
				positionZ = positionZ_les;
			}//if positionZ_les>50
		};//if

//3dパネルの　z座標==パネル同士の間隔　を　レスポンシブルにする
	$(window).resize(function(){
		var stage_width = $('#stage').width(); 
		if(stage_width < 980){
			var positionZ_les = (positionZ_save*(stage_width/980));
			if(positionZ_les>50){
				for(n=0; n<l; n++){
					$('#circle>li').eq(n).css({
						transform:"rotateY("+PI*n+"deg) translateZ("+positionZ_les*l+"px)",
					});//css
				}//for
			}//if positionZ_les>50
		};//if


//window resize時のバグ対策

	//リロードファイルを削除(クラスの初期化より前に実行)
		$('.selected>div').html(save_url)
	//幅を元に戻す
		.removeClass('width200')
		;
	//リサイズ時には元に戻す
		$('#controll .selected').attr('style',save_position);
	//クラスの初期化
		$('#circle .selected').removeClass('select_panel_anime selected')
										.addClass('no_selected');
	//ボタンを復活させる
		$('#buttonwrapper:not(animated)')
				.css({ display:"block" })
				.animate({ opacity:1 },effectTime*1000);
	//レイヤーの重なりを初期化
		$('#controll').css({
			zIndex:"0",
		});
	//全体の傾きを戻す
		$('#controll').removeClass('control_rotX_horizon').addClass('control_rotX_default');

		flag = false;
	});//resize



/*ーーーーーーーーーーーーーーーーーーーーーーー*/
		//必要なDOMを取得
/*ーーーーーーーーーーーーーーーーーーーーーーー*/

//ボタンを書き出す
	$('#stage').append(
		'<!--javascriptで書き出しています　animationCSS.js-->\n'+
		'<div id =buttonwrapper>\n'+
		'<div id="prev" class="button">←</div>\n'+
		'<div id="next" class="button">→</div>\n'+
		'</div><!--buttonwrapper-->'
		);


$('head').append(
			'<style id="3D_panel_base"></style>'+
			'<style id="3D_panel_animation"></style>'+
			'<style id="select_animation"></style>'+
			'');


/*ーーーーーーーーーーーーーーーーーーーーーーー*/
		//必要な材料を取得
/*ーーーーーーーーーーーーーーーーーーーーーーー*/



//DOMの数
	var l = $('#circle>li').length;			//liじゃなくてもできるようにしたい
	var half_l = l/2;



//πの均等割
	var PI = 360/l;
		for(i=0; i<l; i++){
			$('#circle>li').eq(i).css({
				transform:"rotateY("+PI*i+"deg) translateZ("+positionZ*l+"px)",
			});
		}




// var timer = false;
// 	$(window).resize(function(){

// 		if (timer !== false) {
//        		 clearTimeout(timer);
//   		  }

// 		timer = setTimeout(function(){
// 			positionZ = positionZ*(($('#stage').width()/980)/1);
// 				for(i=0; i<l; i++){
// 					$('#circle>li').eq(i).css({
// 						transform:"rotateY("+PI*i+"deg) translateZ("+positionZ*l+"px)",
// 					});
// 				}
// 			console.log($('#stage').width()/980);
// 			console.log($($('#stage').width()/980)/1);
// 		},0);
		
// 	});





//ベンダーの自動取得　とりあえず　webkitをつける
	var transform = "WebkitTransform";











/*ーーーーーーーーーーーーーーーーーーーーーーー*/
	//スタイルシートを書き出す ベース
/*ーーーーーーーーーーーーーーーーーーーーーーー*/
		$('#3D_panel_base').append(

			"\t.over_ray{transform-style:preserve-3d; parsepective:1000px;}\n"+

			".controll{\n"												+
			// "\t	border:1px solid;\n"									+
			"\t	position:absolute;\n"									+
			"\t	top:50%;\n"											+
			"\t	left:50%;\n"											+

			"\t	width:50%;\n"											+
			"\t	height:50%;\n"											+
			"\t	margin-left:-25%;\n"											+
			"\t	margin-top:20%;\n"											+

			"\t	border-radius:50px;\n"									+
			"\t	transform:\n"											+
			"\t			rotateZ(0deg) rotateX("+control_rotX+"deg) rotateY("+control_rotY+"deg)\n"+
			"\t			translateY("+positionY+") translateZ("+AllZposition+") translateX("+positionX+");\n"			+

			"\n"														+
			"\t	transform-style:preserve-3d;\n"							+
			"\t	perspective:1000px;\n"							+
			"}\n"														+


			//パネルの入っている　親要素の空間
			"\t	#circle{\n"												+
			"\n"														+
			"\t	transform-style:preserve-3d;\n"							+

			"\t	border-radius:150px;\n"									+

			"\t	position: absolute;\n"									+
			"\t	left:50%;\n"											+
			"\t	top:-100%;\n"												+

			// "\t	width:300px;\n"										+
			// "\t	height:0px;\n"										+
			"\t	width:100%;\n"											+
			"\t	height:150%;\n"											+
			
			// "\t	margin-left:-150px;\n"								+
			// "\t	margin-top:-150px;\n"								+
			"\t	margin-left:-50%;\n"									+
			"\t	margin-top:"+circle_margin_top+";\n"									+
			// "\t	margin-top:-350px;\n"									+

			
			"\t	}\n"													+
			"\n"														+


			//実際のパネル
			".panel{\n"													+

			"\t	position:absolute;\n"									+
			"\t	top:50%;\n"												+
			"\t	left:50%;\n"											+
			"\t	z-index:500;\n"											+

			// "\t	background:rgba(200,200,200,0.8);\n"					+
			// "\t	border-top:1px solid #fff;\n"							+
			// "\t	border-right:1px solid #fff;\n"							+
			// "\t	border-left:1px solid #ccc;\n"							+
			// "\t	border-bottom:1px solid #aaa;\n"						+
			// "\t	width:500px;\n"										+
			// "\t	height:300px;\n"									+
			"\t	width:"+panel_width+";\n"											+
			"\t	height:"+panel_height+";\n"										+
			// "\t	margin-left:-250px;\n"									+
			// "\t	margin-top:-150px;\n"									+
			"\t	margin-left:-"+CML+";\n"									+
			// "\t	margin-top:-"+CMT+";\n"									+
			"\t	margin-top:"+panel_margin_top+";\n"									+

			"\t	opacity:0.3;\n"											+
			"}\n"														+

			// ".panel:hover{\n"											+
			// "\t	border:2px solid #000;\n"								+
			// "\t	background:rgba(0,0,0,0.7);\n"							+
			// "\t	opacity:0.8;\n"											+
			// "\t	cursor:pointer;\n"										+
			// "}\n"														+


			//パネルの中の要素
			".panel>div{\n"												+
			"\t	height:100%;\n"											+
			// "\t	border:1px solid;\n"									+
			"\t	transform:rotateX(180deg) rotateZ(0deg);\n"				+
			"}\n"														+

			".selected{\n"+
			"	animation:selected 5s ease;\n"+
			"	opacity:1;\n"+
			"}\n"+
			"@keyframes selected{\n"+
			"	0%{opacity:0.8;}\n"+
			"	100%{opacity:1;}\n"+
			"}\n"+

			
			"\n"														+
			"\n"														+


			/*そうさボタン*/
			"\t#buttonwrapper{\n"										+
			"\t		position: absolute;\n"								+
			"\t		z-index:9999;\n"									+
			"\t		width:50%;\n"										+
			"\t		margin-left:-25%;\n"								+
			// "\t		margin:0 auto;\n"								+
			// "\t		border:1px solid;\n"							+
			"\t		overflow:hidden;\n"									+
			// "\t		margin-top:40%;\n"								+
			"\t		bottom:0;\n"										+
			"\t		left:50%;\n"										+
			"\t	}\n\n"													+
			"#prev,#next{\n"											+
			// "\tposition:absolute; bottom:0;\n"						+
			"\tfont-size: 3em;\n"										+
			"\twidth:1em; height:1em;\n"								+
			"\tborder:1px solid; z-index:1000;}\n"						+
			// "\t#prev{left:0;}\n"										+
			// "\t#next{right:0;\n"										+
			"\t#prev{float:left;}\n"									+
			"\t#next{float:right;\n"									+
			"\t}\n"+

			//closeボタン
			"\t#close_panel_button{\n"									+
			"\t	position:absolute;\n"										+
			"\t	z-index:9999;\n"										+
			"\t	top:0px;\n"												+
			"\t	left:0;\n"												+
			"\t	width:50px;\n"											+
			"\t	height:50px;\n"											+
			"\t	border:1px solid #aaa;\n"								+
			"\t	font-size:3em;\n"										+
			"\t	text-align:center;\n"									+
			"\t	line-height:1em;\n"										+
			"\t	cursor:pointer;\n"										+
			"\t}\n"														+
			"\n"														+
			"\t#close_panel_button:hover{\n"									+
			"\t	background-color:#333;\n"								+
			"\t	color:#eee;\n"											+
			"\t}\n"														+



		'');//$('#3D_panel_base').append








/*ーーーーーーーーーーーーーーーーーーーーーーー*/
	//スタイルシートを書き出す animation
/*ーーーーーーーーーーーーーーーーーーーーーーー*/




		//スタイルシートを書き出す
		for(s=1; s<=l; s++){
			var num = s%l+1;
			$('#3D_panel_animation').append("\n"+


			//next用
				"\t.next"+num+"{animation:next"+num+" "+duration+"s ease 0s 1 normal; animation-fill-mode: forwards;}\n"+
				"\t@keyframes next"+num+"{\n"+
				"\t	0%{transform:rotateY("+-(PI*(s-1))+"deg) rotateX("+x+"deg);}\n"+
				"\t	100%{transform:rotateY("+-(PI*s)+"deg) rotateX("+x+"deg);}\n"+
				"}\n"+


			//prev用
				"\t.prev"+s+"{animation:prev"+s+" "+duration+"s ease 0s normal; animation-fill-mode: forwards;}\n"+
				"\t@keyframes prev"+s+"{\n"+
				"\t	0%{transform:rotateY("+-(PI*s)+"deg) rotateX("+x+"deg);}\n"+
				"\t	100%{transform:rotateY("+-(PI*(s-1))+"deg) rotateX("+x+"deg);}\n"+
				"}\n"+

			
			"");
		}

		$('#3D_panel_animation').append(

			//拡大するクラス
				".width200{\n"+
				"	animation:width200 1s ease;\n"+
				"	width:200% !important; \n"+
				"}\n"+
			//キーフレーム
				"@keyframes width200{\n"+
				"	0%{transform:scale3d(100%,0%,0%);}\n"+
				"	100%{transform:scale3d(200%,0%,0%);}\n"+
				"}\n"+

			//拡大するクラス
				".width100{\n"+
				"	animation:width100 1s ease;\n"+
				"	width:100% !important; \n"+
				"}\n"+
			//キーフレーム
				"@keyframes width100{\n"+
				"	0%{transform:scale3d(200%,0%,0%);}\n"+
				"	100%{transform:scale3d(100%,0%,0%);}\n"+
				"}\n"+

			
				
			'');







/*ーーーーーーーーーーーーーーーーーーーーーーー*/
		//スタイルの書き出し opacity
/*ーーーーーーーーーーーーーーーーーーーーーーー*/



		$('#3D_panel_base').append("\n"+

			"\t#circle{\n"+
				"\t\ttransform:rotateX("+x+"deg);\n"+
			"\t}\n"+

			"\t\n"+
			"\t.default{ \n"+ 
			"\t\topacity:0.3; \n"+
			"\t}\n"+

			"\t\n"+
			"\t.back{\n"+
			"\t	animation:shading "+obd+"s ease;\n"+
			"\t}\n"+

			"\t\n"+
			"\t@keyframes shading{\n"+
			"\t	0%{ opacity:1; }\n"+
			"\t	100%{ opacity:0.3 }\n"+
			"\t}\n"+

			"\t\n"+
			"\t.front{\n"+
			"\t	animation:sharp "+ofd+"s ease;\n"+
			"\t}\n"+

			"\t@keyframes sharp{\n"+
			"\t	0%{ opacity:0.4; }\n"+
			"\t	100%{ opacity:1 }\n"+
			"\t}\n"
		);


/*ーーーーーーーーーーーーーーーーーーーーーーー*/
	//全体の傾きを戻すアニメーションスタイル
/*ーーーーーーーーーーーーーーーーーーーーーーー*/


		$('head').append(
			'\t<style id="control_rotX">\n'																							+

			//パネル選択時　全体の傾きを水平にする　アニメーションクラス
			"\t.control_rotX_horizon{\n"																									+
			"\t		animation:control_rotX_horizon "+effectTime+"s ease;\n"																	+
			"\t		transform:rotateX("+(control_rotX-slope)+"deg) rotateY("+control_rotY+"deg) rotateZ(0deg) translate3d("+positionX+","+positionY+","+AllZposition+");\n"						+
			"\t	}\n"																												+
			"\t	@keyframes control_rotX_horizon{\n"																							+
			"\t		0%{ transform:rotateX("+(180+slope)+"deg) rotateY("+control_rotY+"deg) rotateZ(0deg) translate3d("+positionX+","+positionY+","+AllZposition+"); }\n"		+
			"\t		100%{ transform:rotateX("+(control_rotX-slope)+"deg) rotateY("+control_rotY+"deg) rotateZ(0deg) translate3d("+positionX+","+positionY+","+AllZposition+"); }\n"				+
			"\t	}\n"																												+

			//元に戻す　クラス
			"\t.control_rotX_default{\n"																									+
			"\t		animation:control_rotX_default "+effectTime+"s ease;\n"																	+
			"\t		transform:rotateX("+(180+slope)+"deg) rotateY("+control_rotY+"deg) rotateZ(0deg) translate3d("+positionX+","+positionY+","+AllZposition+");\n"			+
			"\t	}\n"																												+
			"\t	@keyframes control_rotX_default{\n"																							+
			"\t		0%{ transform:rotateX("+(control_rotX-slope)+"deg) rotateY("+control_rotY+"deg) rotateZ(0deg) translate3d("+positionX+","+positionY+","+AllZposition+"); }\n"					+
			"\t		100%{ transform:rotateX("+(180+slope)+"deg) rotateY("+control_rotY+"deg) rotateZ(0deg) translate3d("+positionX+","+positionY+","+AllZposition+"); }\n"	+
			
			"\t	}\n"																												+

			"\t</style>\n"																											+
		'');





//    ! ここまでのスタイル書き出しは　-prefixFree.js によって 処理されています






/*ーーーーーーーーーーーーーーーーーーーーーーー*/
	//裏側の設定
/*ーーーーーーーーーーーーーーーーーーーーーーー*/

//背面の設定
// if(l%2==0){//パネルの数が偶数の場合のデフォルトopacity設定
// 	for(i=Math.ceil(half_l/2); i<(half_l/2)*3+1; i++){
// 		$('.panel').eq(i).css({
// 			opacity:o,
// 			display:"none",
// 		});
// 	}
// }else{//パネルの数が奇数の場合のデフォルトopacity設定
// 	for(i=Math.ceil(half_l/2); i<(half_l/2)*3; i++){
// 		$('.panel').eq(i).css({
// 			opacity:o,
// 			display:"none",
// 		});
// 	}
// }


//前面の設定
// if(l%2==0){//パネルの数が偶数の場合のデフォルトopacity設定


	for(i=1; i<=Math.ceil(half_l/2); i++){
		$('.panel'+i).css({
			// opacity:o,
			display:"none",
		});
	}
	for(i=Math.ceil(half_l/2)*3; i<=l; i++){
		$('.panel'+i).css({
			// opacity:o,
			display:"none",
		});
	}

// }else{//パネルの数が奇数の場合のデフォルトopacity設定
// 	for(i=1; i<Math.ceil(half_l/2)*3; i++){
// 		$('.panel').eq(i).css({
// 			opacity:o,
// 			display:"none",
// 		});
// 	}
// }









/*ーーーーーーーーーーーーーーーーーーーーーーー*/
		//　アニメーション属性の管理
/*ーーーーーーーーーーーーーーーーーーーーーーー*/


		var i = 1;
		
		$('#next').click(function(){


		//全体のフラグ　i 	++
			for(rm=1; rm<=l; rm++){
				$('#circle').removeClass('prev'+rm);
			}

			i++;

			if(i==(l+1)){
				i=1;
			}

		//クラスの付け替え　パネルのローテーション
			if(i==1){
				$('#circle').removeClass('next'+l).addClass('next'+1);
			}else if(i<=l){
				$('#circle').removeClass('next'+(i-1)).addClass('next'+i);
			}

		//クラスの付け替え　パネルの表示非表示
			//iを 1からのカウントに変換	! i は 2 ~ l , 1 とカウント
			var q = Math.ceil(l/4);
			var t = q*3;

			var change = (i%l)+1;
			var none = change;
			var block = (i+((l-1)-2))%l+1;

			// console.log(block+'+'+none);
			//各ポジションから l までをカウントするための変換

		 $('.panel'+block).css({display:"block"});
		 $('.panel'+i).css({display:"none"});
		

		});//next click




		$('#prev').click(function(){

		//全体のフラグ i --
			for(rm=1; rm<=l; rm++){
				$('#circle').removeClass('next'+rm);
			}
	
			i--;				//初期に i は 0になる
	
			if(i<1){			//	16 ~~~ 1
				i=l;
			}
	
		//クラスの付け替え　パネルのローテーション
			if(i==l){
				$('#circle').removeClass('prev'+1).addClass('prev'+l)
			}else if(i>=1){
				$('#circle').removeClass('prev'+(i+1)).addClass('prev'+i);
			}


		//クラスの付け替え　パネルの表示非表示
			//iを 1からのカウントに変換	! i は 2 ~ l , 1 とカウント
			var q = Math.ceil(l/4);
			var t = q*3;

			var none = i;
			var change = (i+1)%l+1;		//	１は固定じゃないかもしれない
			var block = change;
			

			console.log(change);
			//各ポジションから l までをカウントするための変換

		 $('.panel'+block).css({display:"block"});
		 $('.panel'+i).css({display:"none"});




		});//prev click

	









/*かんたんにできると思っていたら、かなり苦戦したので、ポイントをメモ
	
	//シーンの状況
		何も選択されていない状態　／　何か選択した状態　に状況が大きく分かれる

	//パネルの状況
		選択されていない状態　／　選択中のアニメーション状態　／　選択後の状態　に分かれる

	//パネルをクリックした時の処理の種類
		何も選択されていない時にだけ実行する処理		選択／非選択　を　クラスで分ける
		クリックしたら必ず実行される処理				


	//ターゲット座標の調整
		prev/nextボタンで操作していると　空間全体の座標が回転するので 正面 rotateY(0deg)の向き
		に調整を加える必要があった。　回転した角度分 rotateY(0deg)から差し引く処理をするので
		ターゲット座標はそれを適用するタイミングでその都度作らないといけない
		これはscriptじゃないとできない　が　もっと上手い方法はあるだろうか

		transform　の中の一部を書き換えることはできないので rotateY　だけ編集したくても
		全ての情報を入力する必要があった。 面倒だったので文字列置換で直接書き換えてみようと思ったが
		逆に大変だったかもしれない。　正規表現の勉強になったと考えよう。

		prefixFree.js を改良して　変数　prefix に　ブラウザの　ベンダープレフィックスを
		格納できるようになったので

		parent_li.attr(prefix+'transform','ターゲット座標');　でいけた

		最終的にこれで解決した
		=> var target_position = prefix+'ターゲット座標'; を　attr('style',target_position)

	//close_panel_buttonについて
		仮でselectedパネルをクリックすると　最初の状態に戻るようにしていたが
		それを close_panel_button をクリックすると処理するように書き換えた

		if判定の中で $(document).on('click','#close_panel_button',function(){})　としたら
		バブリングのような現象が起きたがよく分からない。パネルをクリックする回数に連動して　処理が
		ループする回数も増えて行く。　原因不明

		if判定とは独立させたら　不具合がなくなった。　なぜだろう。


	//select したら　selectedになるまでに　幅を2倍（980px）にしたかったが　むちゃくちゃ処理が重い
		scale3d() をつかえばいいのか？


	//ぜんたいの構成
		変数宣言
			var flag = false;			//何かが選択されているかを判定する
			var save_position;			//前にクリックした座標を保存
			var this_position;			//今クリックした座標
			var target_position;		//ターゲット座標
			var style ;					//最初に選択されたパネルの座標
			var origin_class;			//さいしょに選択されたパネルのクラス
			var change;					//最初に選択されたパネルのターゲット座標
			var check;					//選択か非選択かを判定する変数
			var check2;					//セレクト中かどうかを判定する変数
			var other_origin_style;		//後から選択した別のパネルの座標
			var other_origin_class;		//後から選択した別のパネルのクラス
			var front;					// パネルをクリックした時の　画面側を向くための角度
		//何も選択されていない状態の時
			クリックした要素を取得　		// <a>を内包する親の <li>を取得した
			要素の座票情報を取得　			// style属性から取得
			ターゲット座標調整用の変数　		// front = (PI*(i-1));
			選択状態/非選択状態に分ける　	// select no_selected (selected は selectの処理が終わった後で上書き)


/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
		// クリックエフェクト
/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
	


//変数宣言

// var flag = false;			//何かが選択されているかを判定する
// var save_position;			//前にクリックした座標を保存
// var this_position;			//今クリックした座標
// var target_position;		//ターゲット座標

// var second_transform;



// var style ;					//最初に選択されたパネルの座標
// var origin_class;			//さいしょに選択されたパネルのクラス
// var change;					//最初に選択されたパネルのターゲット座標

// var check;					//選択か非選択かを判定する変数
// var check2;					//セレクト中かどうかを判定する変数

// var other_origin_style;		//後から選択した別のパネルの座標
// var other_origin_class;		//後から選択した別のパネルのクラス

// var front;					// パネルをクリックした時の　画面側を向くための角度


// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー


	$(document).on('click','.panel>div>a',function(e){e.preventDefault();
	// $('.panel a').click(function(e){<-別のファイルを読み込む時にこれだとバッティングする

		if(flag===false){							//何も選択していない時だけ処理する


/**/
			//クリックしたものを取得

				var parent_li = $(this).parent().parent();


/**/
			//クリックしたものの座標を取得 3dmatrix で取得してしまうので　不安； => やはりトラブルになった
			//トラブルメモ：
			//css('transform')　でしゅとくすると うらでは matrix3dの行列に変換されていて、後の文字列置換が
			//大変になったので, style属性に直接書き込んだほうが管理しやすいと考えた。

				// save_position = parent_li.css('transform');
				save_position = parent_li.attr('style');


/**/
			//クリック後のパネルのrotateYの値　i の値と連動する クリックした時に 現在のiから　角度を割り出す

				front = (PI*(i-1));


/**/
			//ターゲット座標の作成	front-180は front-control_rotY のほうがいいかもしれない

				target_position = prefix+"transform:rotateX(0deg) rotateY("+(front-180)+"deg) rotateZ(0deg) translate3d("+tarTransX+","+tarTransY+","+tarTransZ+");";
				// +							"margin-left:"+tarMarginL+"; margin-top:"+tarMarginT+";";


/**/
			//クリックしたものを選択状態に　それ以外を日選択状態に


				$('#circle .panel').addClass('no_selected').removeClass('select');


/**/
			//クリックした要素だけ no_selected を外して　selected に上書き

				parent_li.removeClass('no_selected').addClass('select');


/**/
			//オーバーレイヤーでスフィアをクリックできないようにする
				$('#over_ray').css({
					width:"100%",
					height:"100%",
					position:"absolute",
					zIndex:"1000",
				}).addClass('over_ray');




			//このURLを保存
				save_url = $(this).parent().html();


// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー


/**/
		//全体の傾きを水平にする

			//コントロールレイヤーの調整

				$('#controll').css({
					zIndex:"9000",
				});

				$('#controll').removeClass('control_rotX_default').addClass('control_rotX_horizon');


/**/
		//prev nextボタンをけす

					$('#buttonwrapper').animate({ opacity:0 },effectTime*1000)
					.css({ display:"none" });



/**/
		//closeボタンを作る

			//閉じるボタンの生成
				$('#stage').append('<div id="close_panel_button">&times;</div>');





			flag=true;


		}//if(flag===false)



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



		if(flag===true){													//クリックしたら必ず処理


/**/
			var parent_li = $(this).parent().parent();
			var panel_class = parent_li.attr('class');


/**/
			//書き出したクラスを初期化

					$('#select_animation').empty();


/**/
			//アニメーションクラスの　初期化

					$('#circle .panel').removeClass('out_panel_anime');


/**/
			//クリックしたものの座標

				this_position = parent_li.attr('style');


/**/
			//クリックした要素が selectedかno_selectedかを判定 selected=false no_selected=true
			//クリックしたものは必ず　selected がつくので no_selected　を持っているかで判定

				check = parent_li.hasClass('no_selected'); 


/**/
			//セレクト中　を判定する必要があったので　これで管理する

				check2 = parent_li.hasClass('select'); 



			//クリックしたものを選択状態に　それ以外を日選択状態に
/**/
				//全てに no_selected　をつけて

					$('#circle .panel:not(.selected)').addClass('no_selected').removeClass('selected');


/**/
				//クリックした要素だけ no_selected を外して　selected に上書き

					parent_li.addClass('select');




				//読み込み時 img などの　パスがきかなくなるので書き換える
			//css3がおそらく効かなくなるので　プレフィックスを処理する
			//必要なjsファイルをよみこめなかったら、書き直し

				//ajaxでファイルを読み込み


					//リンク先のファイルを読み込む
					url = $(this).attr('href');
					$(this).parent().load(url,function(){   //なぜかコールバックが処理されない　第二引数を指定しないとだめ

					// //読み込んだ後に処理する

					// 	//全ての画像のパスの変更
					// 	$('#load_wrapper img').each(function(){
					// 		var url_change = $(this).attr('src')
					// 		.replace(new RegExp('../../'),'common/');
					// 		$(this).attr('src',url_change);
					// 	});//each

					// 	//prefixをつける
					// 	prefixFree();


					// 	var load_stage2;
					// 	var load_stage3;
					// 	if(load_stage2 = $('.load_stage2'))		load_stage2.addClass('none');
					// 	if(load_stage3 = $('.load_stage3'))		load_stage3.addClass('none');
						




					}).animate({opacity:1,},500,function(){

						//読み込んだ後に処理する

						//全ての画像のパスの変更
						// alert($('#load_wrapper img').attr('src'));

						$('#load_wrapper img').each(function(){
							var url_change = $(this).attr('src')
							.replace(new RegExp('../../'),'common/');
							// alert(url_change);
							$(this).attr('src',url_change);
						});//each

						//prefixをつける
						prefixFree();


						var load_stage2;
						var load_stage3;
						if(load_stage2 = $('.load_stage2'))		load_stage2.addClass('none');
						if(load_stage3 = $('.load_stage3'))		load_stage3.addClass('none');

						var number;
						//以下必要なスクリプトを呼び出し
						// これでここのパネルを判別
						var number = panel_class.match(new RegExp('panel[0-9]{1,10}'));
						number = number.toString().match(new RegExp('[0-9]{1,10}'));
						
						if(number==1){
							if(load_fn1){load_fn1();}
						}else if(number==2){
							if(load_fn2){load_fn2();}
						}else if(number==3){
							if(load_fn3){load_fn3();}
						}else if(number==4){
							if(load_fn4){load_fn4();}
						}else if(number==5){
							if(load_fn5){load_fn5();}
						}else if(number==6){
							if(load_fn6){load_fn6();}
						}else if(number==7){
							if(load_fn7){load_fn7();}
						}else if(number==8){
							if(load_fn8){load_fn8();}
						}else if(number==9){

							if(load_fn9){load_fn9();}
						}else if(number==10){
							if(load_fn10){load_fn10();}
						}else if(number==11){
							if(load_fn11){load_fn11();}
						}else if(number==12){
							if(load_fn12){load_fn12();}
						}else if(number==13){
							if(load_fn13){load_fn13();}
						}
					
					
					});
					//load().animate();




// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



		if(check===false&&check2===true){											//selectの処理


/**/
			parent_li.removeClass('no_selected');


/**/
			//アニメーションクラスの作成
				// この座標から　ターゲット座標へ

				$('#select_animation').append(


				//移動させるクラス
					".select_panel_anime{\n"+
					"	animation:select_panel_anime "+effectTime+"s ease;\n"+
					"	opacity:1;\n"+
					"}\n"+


				//キーフレーム
					"@keyframes select_panel_anime{\n"+
					"	0%{"+this_position+" width:100%; margin-left:-50%; opacity:0.8;}\n"+
					"	80%{"+target_position+" opacity:0.9;}\n"+
					"	100%{"+target_position+" opacity:0.9;}\n"+
					"}\n"+

				'');

				prefixFree('#select_animation');



			//アニメーションクラスの適用

				//移動させるレイヤ
				parent_li.addClass('select_panel_anime');

				//拡大するレイヤ
				$(this).parent().removeClass('width100').addClass('width200');



			//状態を固定	 本当はcssでやりたいが cssの取得がmatrix3dになってしまうので styleでコントロール

				parent_li.attr('style',target_position)
							.removeClass('select')
							.addClass('selected');


// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



		}else if(check===false&&check2===false){									//selectedの処理

			var url = $(this).attr('href');
			// $(this).parent().load(url).animate({width:"200%"},500);
			//本当はAjax でファイルを読み込む処理が入る



		}else if(check===true){														//no_selectedの処理



		//前のパネルに対して

			//アニメーションクラスの作成
				//書き出したクラスを空にする ini
				$('#select_animation').empty();

			//状態を固定	 本当はcssでやりたいが cssの取得がmatrix3dになってしまうので styleでコントロール
				//セレクテッドパネルをもとの位置に設定
				$('#circle .selected').attr('style',save_position).children().removeClass('width200').addClass('width100');


			//Ajaxファイルを元に戻す
				$('.selected>div').empty().append(save_url);


			//このパネルのurlを取得
				no_selected_url = $(this).parent().html();

			//save_urlに このurlを上書き

				save_url = no_selected_url;


			//アニメーションクラスの作成
			// ターゲット座標から　この座標へ
				$('#select_animation').append(

					//selectedパネルを元に戻すアニメーションクラス
					".out_panel_anime{\n"+
					"	animation:out_panel_anime "+effectTime+"s ease;\n"+
					// "width:100%; margin-left:-50%;"+
					"}\n"+
					"@keyframes out_panel_anime{\n"+
					"	0%{"+target_position+"}\n"+
					"	100%{"+save_position+"}\n"+
					"}\n"+

					//このパネルを前に出すアニメーションクラス
					".select_panel_anime{\n"+
					"	animation:select_panel_anime "+effectTime+"s ease;\n"+
					// "width:200%; margin-left:-100%;"+
					"}\n"+
					"@keyframes select_panel_anime{\n"+
					"	0%{"+this_position+"}\n"+
					"	100%{"+target_position+"}\n"+

					"}\n"+
					'');
				prefixFree('#select_animation');


				//この座標を　前の座標に上書き

				save_position = parent_li.attr('style');
			


				//このパネルをターゲット座標に設定

				parent_li.attr('style',target_position);



				// いらない設定を削除 アニメーション効果の取り付け

				//移動効果
				$('#circle .selected').removeClass('select_panel_anime selected width200')
										.addClass('out_panel_anime no_selected width100');
				//拡大効果
				$('.select>div').removeClass('width100')
				.addClass('width200');



				// このパネルに　アニメーション効果を取り付け //no_selected を selected に上書き

				parent_li.addClass('select_panel_anime selected').removeClass('no_selected select');
				// parent_li.removeClass('select selected select_panel_anime').addClass('no_selected');
		

		}//if check判定






	}//if flag === true;
		

});//click panel

	$(document).on('click','#close_panel_button',function(e){

			// e.stopPropagation();



				//アニメーションクラスの作成
				// ターゲット座標から　この座標へ
				$('#select_animation').append(
					".out_panel_anime{\n"+
					"	animation:out_panel_anime "+effectTime+"s ease;\n"+
					"\n"+
					"}\n"+
					"@keyframes out_panel_anime{\n"+
					"	0%{"+target_position+"}\n"+
					"	100%{"+save_position+"}\n"+
					"}\n"+
					'');
				prefixFree('#select_animation');



			//幅を元に戻す

				//大きさ
				$('.selected>div').removeClass('width200');

				//Ajaxファイルを元に戻す

				$('.selected>div').html(save_url);

			// 状態を固定	 本当はcssでやりたいが cssの取得がmatrix3dになってしまうので styleでコントロール
				$('#controll .selected').attr('style',save_position);

			//クラスの付け替え

				$('#controll .selected').removeClass('select_panel_anime selected').addClass('out_panel_anime')
			 //書き出したクラスを空にする ini

				// $('#select_animation').empty();


			



		//全体の傾きをデフォルトにする

			// コントロールレイヤーの調整

			$('#controll').css({
				zIndex:"0",
			});

			$('#controll').removeClass('control_rotX_horizon').addClass('control_rotX_default');


			//prev nextボタンを復活させる
			$('#buttonwrapper:not(animated)')
				.css({ display:"block" })
				.animate({ opacity:1 },effectTime*1000);

				flag = false;

			//closeボタンを消す
			$('#close_panel_button:not(animated)').animate({
				opacity:0,
			},effectTime*1000).remove();

			

/**/
			//オーバーレイヤーをもとに戻す
				$('#over_ray').css({
					width:"0%",
					height:"0%",
					position:"static",
					zIndex:"0",
				}).removeClass('over_ray');









	});//close_button on click




/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
		// select後のUI
/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/


	$(document).on('click','#load1',function(){
		$('.load_stage').addClass('none');
		$('.load_stage1').removeClass('none');
		// alert();
	});

	$(document).on('click','#load2',function(){
		$('.load_stage').addClass('none');
		$('.load_stage2').removeClass('none');
		// alert();
	});

	$(document).on('click','#load3',function(){
		$('.load_stage').addClass('none');
		$('.load_stage3').removeClass('none');
		// alert();
	});


});//おわり