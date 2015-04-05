$(function(){
//stage.js に依存しているので stage.jsを先に読み込んでおくこと
//現在　div に非対応　ul li をつかう

/*ーーーーーーーーーーーーーーーーーーーーーーー*/
	//設定
/*ーーーーーーーーーーーーーーーーーーーーーーー*/

//! 単位は px で指定されます


/* ーーーーーーーーーーー *
	text設定
/* ーーーーーーーーーーー */
//テキスト<span>の　Y軸からの位置を調整します　text1が上段、text2Zが下段の設定です
var text1Z = 150;
var text2Z = 300;
var text1Y = -10;
var text2Y = -80;

//あまりいじらないほうが良い
var text1X = 0;
var text2X = 0;

var textwidth = 120;	//設定を変更すると　レイアウトが崩れるので調整すること！！！
var textheight = 120;

var text_paddingTop = 25 ;
var text_paddingRight = 0 ;
var text_paddingBottom = 0 ;
var text_paddingLeft = 0 ;

//色の設定
var textBGColor = "rgba(0,0,0,0.2)";

var textHoverBGColor ="rgba(0,0,0,0.0)";
var textHoverBorderColor = "rgba(0,0,0,0.0)";

/* ーーーーーーーーーーー *
	スフィア設定
/* ーーーーーーーーーーー */
//スフィアを構成するリングの設定（spheresize を指定すると 高さと幅が一括で設定されます）
var spheresize="200";
var ringwidth = 300;
var ringheight = 300;

if(spheresize != undefined){ ringwidth = spheresize;  ringheight = spheresize;}


//全体の位置
var spaceposX = 0;
var spaceposY = "-480px";
var sphere_margin_top = "35%";
var spaceposZ = -100;

//全体の角度設定
var spheredeg= 0; //非推奨
var spacedegX = 5;
var spacedegY = 0;
var spacedegZ = 0;


//色の設定
var sphereColor = "rgba(255,255,255,0.1)";
var ringColor = "#aaa"

//クリックした時のテキストの移動効果の設定
var effectTime = 1;//一括設定
var effectTranslateZ = 500;




var text_class;
/*　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー　*/
										//スタイルシートを書き出す ベース
/*　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー　*/

		$('head').append(
			'\t<!--スフィアのスタイル sphere.js　から書き出されています-->\n'			+
			'\t<style type="text/css" id="default_base_style"></style>\n'						+
			'\t<style type="text/css" id="default_animation_style"></style>\n'					+
			'\t<style type="text/css" id="effect_animation_style"></style>\n'					+
			'\t<style type="text/css" id="default_transform_style"></style>\n'					+
			'\t<style type="text/css" id="sphere_effect_style"></style>\n'								+
			'\t');







		$('#default_base_style').append(
	
		//スフィアの設定
			"\t#sphere_space{\n"+
			"\t	persepective:1000px;\n"+
			"\t}\n"+
			"\t#sphere_space,.sphere,.circle,.circle span{\n"																+
			"\t	transform-style:preserve-3d;\n"																+
			"\t}\n"																+
			// "\t#sphere_nav,#memo{position:relative; height:100%; width:100%;}\n"								+
			"\t	#sphere_space,.sphere{\n"														+
			"\t 	border:1px solid;\n"												+
			"\t		transform-style:preserve-3d;\n"								+
			"\t		position:absolute;\n"										+
			"\t		top:50%;\n"													+
			"\t		left:50%;\n"												+
			"\t		width:0px;\n"												+
			"\t		height:0px;\n"											+
			"\t	}\n"															+
			"\t.sphere_space{\n"+
			"\t		margin-top:"+sphere_margin_top+";\n"+
			"\t	transform:\n"+
			"\t		translate3d(0px,0px,0px)\n"+
			"\t		rotateX("+spacedegX+"deg) rotateY("+spacedegY+"deg) rotateZ("+spacedegZ+"deg)\n"+
			"\t 	translate3d("+(spaceposX)+"px,"+(spaceposY)+","+(spaceposZ)+"px);\n"+
			"\t		;\n"+
			"\t} \n"+
			"\t	.sphere:hover{\n"												+
			"\t		cursor:pointer;\n"											+
			"\t	}\n"															+
			"\t	.sphere1{\n"													+
			"\t		transform:rotateX("+(0+(spheredeg))+"deg);\n"								+
			"\t	}\n"															+
			"\t	.sphere2{\n"													+
			"\t		transform:rotateX("+(90+(spheredeg))+"deg);\n"								+
			"\t	}\n"															+
	
		//リングのスタイル	 <div>
			"\t/*リングのスタイル*/\n"												+
			"\t	.circle{\n"														+
			"\t		position:absolute;\n"										+
			"\t		z-index:0;\n"												+
			"\t		background-color:"+sphereColor+";\n"								+
			"\t		top:50%;\n"													+
			"\t		left:50%;\n"												+
			//	! 高さ幅を変えると　テキストの軸がずれるバグがある
			"\t		width:"+ringwidth+"px;\n"												+
			"\t		height:"+ringheight+"px;\n"											+
			"\t			margin-left:"+(-(ringwidth/2))+"px;\n"						+
			"\t			margin-top:"+(-(ringheight/2))+"px;\n"						+
			"\t		border:1px solid "+ringColor+";\n"									+
			"\t		border-radius:"+(ringwidth/2)+"px / "+(ringheight/2)+"px ;\n"						+
			"\t		transform-style:preserve-3d;\n"								+
			"\t	}\n"															+
			"\t\n"																+
	
	
		//テキストのスタイル <span>
			"\t/*テキストのスタイル*/\n"												+
			"\t	.circle span{\n"												+
			"\t		position:absolute;\n"										+
			"\t 	top:50%;\n"														+
			"\t 	left:50%;\n"														+
			"\t		z-index:9000;\n"											+
			"\t		display:block;\n"											+
			"\t		width:"+textwidth+"px;\n"												+
			"\t		height:"+textheight+"px;\n"												+
			"\tmargin-left:"+(-(textwidth/2))+"px;\n"								+
			"\tmargin-top:"+(-(textheight/2))+"px;\n"								+
			"\t}\n"																		+
			"\t.circle .text{\n"																		+
			"\t		padding:"+text_paddingTop+"px "+text_paddingRight+"px "+text_paddingBottom+"px "+text_paddingLeft+"px;\n"										+
			"\t		width:"+textwidth+"px;\n"												+
			"\t		height:"+(textheight-text_paddingTop)+"px;\n"												+
			"\t	}\n"															+
			"\t	.circle .text:hover{\n"											+
			"\t		border:1px solid "+textHoverBorderColor+";\n"									+
			"\t		background-color:"+textHoverBGColor+";\n"								+
			"\t	}\n"															+
			"\t	.circle .text{\n"												+
			// "\t		transform-origin:100% 100% 0px;\n"							+
			"\t 	background-color:"+textBGColor+";"							+
			"\t	}\n"															+
		"\n");





		$('#default_animation_style').append(
		
			//アニメーションスタイル
				"\t	.sphere1{animation:circle 10s linear 0s infinite;}\n"			+
				"\t	.sphere2{animation:circle2 10s linear 0s infinite;}\n"			+
				"\t\n"																+
				//回転アニメーションの設定
				"\t	@keyframes circle{\n"											+
				"\t		0%{ transform:rotateY(0deg) rotateX(0deg); }\n"				+
				"\t		100%{ transform:rotateY(360deg) rotateX(0deg); }\n"			+
				"\t	}\n"															+
				"\t	@keyframes circle2{\n"											+
				"\t		0%{ transform:rotateY(0deg) rotateX(90deg); }\n"			+
				"\t		100%{ transform:rotateY(360deg) rotateX(90deg); }\n"		+
				"\t	}\n"+														
				'');




		$('#effect_animation_style').append(
			//クリック後のスタイル
				"\t.afterEffect{\n"													+
				"\t		border-radius:0px !important;\n"							+
				"\t		transform:rotateY(0deg);\n"									+
				"\t}\n"																+
		
				"\t.circle_afterEffect{\n"											+
				"\t		background:rgba(0,0,0,0) !important;\n"+
				"\t}\n"																+
		
				"\t.text_afterEffect{\n"											+
				"\t}\n"																+
				'\n');
















/*　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー　*/
										//自動で角度を割り出す
/*　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー　*/


	var cl = $('.circle').length;			//これが原因でレイアウトにバグが出る
	var spanW = $('.circle').width();
	var clhalf = Math.ceil(cl/2);
	var cPI = 360/cl;

	var c1l = $('.sphere1 .circle').length;
	var c1PI = (360/2)/c1l;
	var c2l = $('.sphere2 .circle').length;
	var c2PI = (360/2)/c2l;


	// PI/2 を.circleの数で割って、それぞれに角度を割り当てる
		//c1lの場合
		for(i=1; i<=c1l; i++){

			$('#default_transform_style').append(

				".sphere1 .circle"+ (i) +"{\n"										+
				"\ttransform:rotateY("+(c1PI*(i-1))+"deg) \n"			+
				"}\n"														+

			"\n");
		}
		//c2lの場合
		for(i=1; i<=c2l; i++){

			$('#default_transform_style').append(

				".sphere2 .circle"+ (i) +"{\n"										+
				"\ttransform:rotateY("+(c2PI*(i-1))+"deg) \n"			+
				"}\n"														+

			"\n");
		}


	//sphere1のspanの位置を整える
		var c1l = $('#sphere1 .circle').length;
		var sphere1PI = 360/c1l;
		// console.log(sphere1PI);
		for(i=1; i<=c1l; i++){

			$('#default_transform_style').append(



//1段目の位置操作
				".sphere1 .circle"+i+" .text{\n"													+

				"\ttransform:\n"																+
				"\trotateZ(0deg) rotateX("+0+"deg) rotateY("+(c1PI*(i-1))+"deg)\n"			+
				"\ttranslateX("+text1X+"px) translateZ("+text1Z+"px) translateY("+text1Y+"px);\n}\n"		+

			"\n");
		}



	//sphere2のspanの傾きを修正する
		var c2l = $('#sphere2 .circle').length;
		var sphere2PI = 360/c2l;
		for(i=1; i<=c2l; i++){

			$('#default_transform_style').append(

			//触らないこと！！！
				".sphere2 .circle"+i+" .textY{\n"+
				"\ttransform:\n"+
				"\trotateZ(0deg) rotateX("+(0)+"deg) rotateY("+(-(c2PI*(i-1)))+"deg)\n"+
				"\ttranslateX("+0+"px) translateZ("+0+"px) translateY(0px);\n}\n"+

			"\n");
		}




//二段目の位置操作
		for(i=1; i<=c2l; i++){

			$('#default_transform_style').append(


				".sphere2 .circle"+i+" .textX{\n"+

				"\ttransform:\n"+
				"\trotateZ(0deg) rotateX("+(-90)+"deg) rotateY("+((c2PI*(i-1))*2)+"deg)\n"+
				"\ttranslateX("+text2X+"px) translateZ("+text2Z+"px) translateY("+text2Y+"px);\n"+
				
				"\t}\n"+

			"\n");
		}

		


		

		//sphere1のcircle span　のテキストのエフェクト
		for(i=1; i<=c1l; i++){
			$('#sphere_effect_style').append(



			//テキストアウトエフェクト
				"\t.textout1"+i+"{\n"																+
				"\t		animation:textout1"+i+" "+effectTime+"s ease 0s normal 1;\n"						+
				"\t}\n"																					+

				"\t@keyframes textout1"+i+"{\n"																+
				"\t		0%{\n"																						+

				"\t 		transform:\n"																+
				"\t 		rotateZ(0deg) rotateX("+0+"deg) rotateY("+(c1PI*(i-1))+"deg)\n"			+
				"\t 		translateX("+text1X+"px) translateZ("+text1Z+"px) translateY("+text1Y+"px);\n"			+

				"\t			opacity:1;\n"																					+
				"\t 	}\n"		+

				"\t		100%{\n"+

				"\t 		transform:\n"																+
				"\t 		rotateZ(0deg) rotateX("+0+"deg) rotateY("+(c1PI*(i-1))+"deg)\n"			+
				"\t 		translateX("+text1X+"px) translateZ("+effectTranslateZ+"px) translateY("+text1Y+"px);\n"		+

				"\t			opacity:0;\n"																	+
				"\t 	} \n"																					+

				"\t}\n"																					+

			//テキストインエフェクト
				"\t.textin1"+i+"{\n"																+
				"\t		animation:textin1"+i+" "+effectTime+"s ease 0s reverse 1;\n"					+

				"\t}\n"																				+

				"\t@keyframes textin1"+i+"{\n"														+
				"\t		0%{\n"																		+

				"\t 		transform:\n"																+
				"\t 		rotateZ(0deg) rotateX("+0+"deg) rotateY("+(c1PI*(i-1))+"deg)\n"			+
				"\t 		translateX("+text1X+"px) translateZ("+text1Z+"px) translateY("+text1Y+"px);\n"			+

				"\t			opacity:1;\n"																	+
				"\t 	} \n"																				+

				"\t		100%{\n"																		+

				"\t 		transform:\n"																+
				"\t 		rotateZ(0deg) rotateX("+0+"deg) rotateY("+(c1PI*(i-1))+"deg)\n"			+
				"\t 		translateX("+text1X+"px) translateZ("+effectTranslateZ+"px) translateY("+text1Y+"px);\n"		+

				"\t			opacity:0;\n"																							+
				"\t 	} \n"																							+

				"\t}\n"
			);
		}
		//sphere2の傾きを調整した
		//クリック時のエフェクト追加　同時に書き出すと偶数番目でバグが出るので分けた　原因不明　ー＞解決
		//スタイルシートの translate ~~~;} 　が　translate ~~~ ;};} と多く書かれていたのに気がつかなかった　;;;　
		for(i=1; i<=c2l; i++){
			$('#sphere_effect_style').append(

				//テキストアウトエフェクト
				"\t.textout2"+i+"{\n"+
				"\t 	animation:textout2"+i+" "+effectTime+"s ease 0s normal 1;\n"+
				"\t}\n"+

				"\t@keyframes textout2"+i+"{\n"+
				"\t 	0%{\n"+

				"\ttransform:\n"+
				"\trotateZ(0deg) rotateX("+(-90)+"deg) rotateY("+((c2PI*(i-1))*2)+"deg)\n"+
				"\ttranslateX("+text2X+"px) translateZ("+text2Z+"px) translateY("+text2Y+"px);\n"+

				"\t 		opacity:1;\n"+
				"\t 	}\n"+

				"\t 	100%{\n"+

				"\ttransform:\n"+
				"\trotateZ(0deg) rotateX("+(-90)+"deg) rotateY("+((c2PI*(i-1))*2)+"deg)\n"+
				"\ttranslateX("+text2X+"px) translateZ("+effectTranslateZ+"px) translateY("+text2Y+"px);\n"+

				"\t 		opacity:0;\n"+
				"\t 	}\n"+
				"\t}\n"+

				//テキストインエフェクト
				"\t.textin2"+i+"{\n"+
				"\t 	animation:textin2"+i+" "+effectTime+"s ease 0s reverse 1;\n"+
				"\t}\n"+

				"\t@keyframes textin2"+i+"{\n"+
				"\t 	0%{\n"+

				"\ttransform:\n"+
				"\trotateZ(0deg) rotateX("+(-90)+"deg) rotateY("+((c2PI*(i-1))*2)+"deg)\n"+
				"\ttranslateX("+text2X+"px) translateZ("+text2Z+"px) translateY("+text2Y+"px);\n"+

				"\t 		opacity:1;\n"+
				"\t 	}\n"+

				"\t 	100%{\n"+

				"\ttransform:\n"+
				"\trotateZ(0deg) rotateX("+(-90)+"deg) rotateY("+((c2PI*(i-1))*2)+"deg)\n"+
				"\ttranslateX("+text2X+"px) translateZ("+effectTranslateZ+"px) translateY("+text2Y+"px);\n"+

				"\t 		opacity:0;\n"+
				"\t 	}\n"+
				"\t}\n"
			);
		}

		

		











/*　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー　*/
										//エフェクトクラスの　コントロール
/*　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー　*/

		var flag = true;


		


	//スフィアを押した時
			// $('.sphere,.circle,.circle span').on('click',function(e){
			$('.sphere').on('click',function(e){


		if(flag===true){

			//表示モードへ変更
			//エフェクトスタイルをつける
				for(i=1; i<=c1l; i++){
					$('#sphere1 .circle'+i+' .text').addClass('textout1'+i).removeClass('textin1'+i);
				}
				for(i=1; i<=c2l; i++){
					$('#sphere2 .circle'+i+' .textX').addClass('textout2'+i).removeClass('textin2'+i);
				}
	
			//３Dスライダーのボタンを消す
				$('#button_wrapper,.button').css({display:"none"});

			//選択モードへフェードイン
				$('#sphere_space')
				.stop(true,true)
				.animate({
					opacity:1,
				},effectTime*1000,function(){
				//特定のクラス以外全て取り除く 
					$('#sphere_space,#sphere_space li,#sphere_space div,#sphere_space span').removeClass();

				//スタイルタグの書き出し
					$('head').append(
							'\t<!--エフェクト後のスタイル sphere.jsで書き出しています-->\n'+
							'\t<style id="after_effect_style"></style>\n'+
							'');
				//sphere_spaceのスタイルを追加
					$('#after_effect_style').append(
						'\t#sphere_nav{\n'+
							'\t	border:1px solid blue;\n'+
							// '\t	background:rgba(0,0,0,0.1);\n'+
							'\t	position:absolute;\n'+
							'\t	z-index:9000;\n'+
							'\t	width:100%;\n'+
							'\t	height:100%;\n'+
							'\t}\n'+
						'\t#sphere_space{\n'+
							'\t	position:static;\n'+
							// '\t	position:relative;\n'+
							// '\t	top:0;\n'+
							// '\t	left:0;\n'+
							'\t	width:100%;\n'+
							'\t	padding-left:5%;\n'+
							// '\t	height:100%;\n'+
							'\t	width:auto;\n'+
							'\t	height:100%;\n'+
							// '\t	margin-top:50px;\n'+
							'\t	overflow:scroll;\n'+
							// "\t	border:0;\n"+
							'\t}\n'+
						'');

				//テキストの位置を調整　フロートレフト
//上で設定できるように逃がす
					$('#after_effect_style').append(
						"\t#sphere_space li{\n"+
						"\t	position:relative;\n"+
						"\t	z-index:9000;\n"+
						"\t	display:block;\n"+
						"\t	width:"+textwidth+"px;\n"+
						"\t	height:"+(textheight-20)+"px;\n"+
						"\t	padding-top:20px;\n"+
						"\t	border:1px solid #aaa;\n"+
						"\t	float:left;\n"+
						"\t	margin-left:20px;\n"+
						"\t	margin-top:5%;\n"+
						"\t}\n"+
						"\t#sphere_space li:hover{\n"+
						"\t	background:rgba(0,0,0,0.3);\n"+
						"\t}\n"+
						'');

				//閉じるボタンの生成
					$('#sphere_nav').append('<div id="close_button">&times;</div>');

				//閉じるボタンのスタイル
					$('#after_effect_style').append(
						"\t#close_button{\n"+
						"\t	position:fixed;\n"+
						"\t	z-index:9999;\n"+
						"\t	top:0px;\n"+
						"\t	left:0;\n"+
						"\t	width:50px;\n"+
						"\t	height:50px;\n"+
						"\t	border:1px solid #aaa;\n"+
						"\t	font-size:3em;\n"+
						"\t	text-align:center;\n"+
						"\t	line-height:1em;\n"+
						"\t	cursor:pointer;\n"+
						"\t}\n"+
						"\n"+
						"\t#close_button:hover{\n"+
						"\t	background-color:#333;\n"+
						"\t	color:#eee;\n"+
						"\t}\n"+
					'');
				//effect_inクラスの生成
					$('head').append('<style id="effect_in_style"></style>');

				//effect_inクラスの取り付け
					i=1;
					$('#sphere_space li').each(function(){

						var rand1 = Math.round(Math.random()*3000-1500);
						var rand2 = Math.round(Math.random()*3000-1500);

						$(this).addClass('effect_in'+i).removeClass('effect_out'+i);
						$('#effect_in_style').append(
							".effect_in"+i+"{\n"+
							"\t	animation:effect_in"+i+" "+effectTime+"s ease-out 0s reverse;\n"+
							"\t}\n"+
							"\t@keyframes effect_in"+i+"{\n"+
							"\t	from{ transform:translate3d(0px,0px,0px); opacity:1;}\n"+
							"\t	to{ transform:translate3d("+rand1+"px,"+rand2+"px,0px); opacity:0; }\n"+
							"\t}\n"+
							'');
						i++;
					});
					prefixFree();
				});

				flag=false;
			e.stopPropagation();
				// alert(flag);

}//if
			});//click処理


		

		








	//closeボタンを押した時
			$(document).on('click','#close_button',function(e){
// alert();

if(flag===false){
								$('#text_list').addClass('none');
								$('#text_viewer').addClass('none');
								$('#sphere_space').removeClass('none');
								$('#text_list').removeClass('none');

								$('head').append('<style id="effect_out_style"></style>');
								i=1;
					
								$('#sphere_space li').each(function(){
									var rand1 = Math.round(Math.random()*3000-1500);
									var rand2 = Math.round(Math.random()*3000-1500);
									$(this).addClass('effect_out'+i).removeClass('effect_in'+i);
									$('#effect_out_style').append(
										".effect_out"+i+"{\n"+
										"\t	animation:effect_out"+i+" "+effectTime+"s ease-in;\n"+
										"\t}\n"+
										"\t@keyframes effect_out"+i+"{\n"+
										"\t	from{ transform:translate3d(0px,0px,0px); opacity:1; }\n"+
										"\t	to{ transform:translate3d("+rand1+"px,"+rand2+"px,0px); opacity:0; }\n"+
										"\t}\n"+
									'');
									i++;
								});//each
								prefixFree();

							//cssアニメーションが終わった後で処理を実行したいが　関数の実行とは別のようなので
							//setTimeoutで時間を調整する
								setTimeout(function(){//cssアニメーションが終わったかどうかを取得できるみたいなので調べる

								//styleのリムーブ
										$('#effect_in_style').remove();
										$('#effect_out_style').remove();
										$('#after_effect_style').remove();
								//closeボタンのリムーブ
										$('#close_button').remove();
										$('#close_button').remove();
								//effect_outを取り除く
										$('#sphere_space li').removeClass();
								//取り除いたクラスを付け直す
										$('#sphere_space,#sphere_space li,#sphere_space span').addClass();
										$('#sphere_space').addClass('sphere_space');
										$('#sphere_space #sphere1').addClass('sphere sphere1');
										$('#sphere_space #sphere2').addClass('sphere sphere2');
										$('.sphere li').addClass('circle');
										var i = 1;
										$('#sphere1 .circle').each(function(){ $(this).addClass('circle'+i); i++; });
										var i = 1;
										$('#sphere2 .circle').each(function(){ $(this).addClass('circle'+i); i++; });
										$('.circle>span').addClass('textY');
										$('.textY>span').addClass('textX');
										$('.textX>span').addClass('text');
								//text_inのとりつけ
										for(i=1; i<=c1l; i++){
											$('#sphere1 .circle'+i+' .text').addClass('textin1'+i).removeClass('textout1'+i);
										}
										for(i=1; i<=c2l; i++){
											$('#sphere2 .circle'+i+' .textX').addClass('textin2'+i).removeClass('textout2'+i);
										}
										
								//prev nextを再表示
										$('#button_wrapper,.button').css({display:"block"});
								//フェードイン
										$('#sphere_space')
											.css({opacity:0})
											.animate({opacity:1},effectTime*1000);
								//コメントアウトを削除
//head内のコメントが削除できない
								// .replace(new RegExp('transform','g'),prefix+'transform')
								
										$('head').text().replace(new RegExp('<!--エフェクト後のスタイル sphere.jsで書き出しています-->','g'),'');
										// console.log($('head').text());
								},effectTime*1000);
			flag=true;
}

if(flag===10){

	//closeボタンをクリックしたら
		
		$('#text_viewer').addClass('none');
			
		$('#text'+text_class).addClass('none');

		$('#text_list').removeClass('none');
		$('#sphere_space').removeClass('none');

	flag=false;
}

			});//onclick
		




















/*　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー　*/
										//テキストのジャンルを選択
/*　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー　*/


		//#sphere_space c_html	#text_viewer,#text_html
		//#sphere_space c_css	#text_viewer,#text_css

		//c_[a-z]{0,9} でマッチしたものの []{}をとりだして　#text_変数　でクラスを付け替える

		$('#sphere_space li').click(function(){
if(flag===false){
			text_class = $(this).attr('class').match(new RegExp('[0-9]{1,9}'));
			$('#text_list').addClass('none');
			$('#sphere_space').addClass('none');
			

			// // alert($('#text'+text_class).html());
			$('#text_viewer').removeClass('none');
			
			$('#text'+text_class).removeClass('none');

			flag=10;
}//if false
		});//click

		//closeボタンをクリックしたら
		// $('#text_list').addClass('none');

	


	});//おわり

//css アニメーション中は　クリックできないようにする
//連続でスフィアをクリックすると　スフィアクリックの処理が　複数回処理されるので　結果x が増えていってしまう

//head内のコメントを削除する方法
//head内の　スタイルを消した時に　コメントが消されずに残ってしまうので　結果として　コメントがどんどん増えていってしまう
	//htmlで取得すると コメントを取得できるが replace がつかえない
	//textで取得すると コメントが取得できない
	



