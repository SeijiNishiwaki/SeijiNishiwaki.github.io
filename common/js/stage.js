
$('head').append('<style id="stage_style"></style>');
/*ーーーーーーーーーーーーーーーーーーーーーーー*/
	//スタイルシートを書き出す
/*ーーーーーーーーーーーーーーーーーーーーーーー*/

var stage_width = 980;
var win_width = $(window).width();
if(win_width<980){
	stage_width = win_width;
}
		$('#stage_style').append(


	//3D化した要素に　パース表現を加える親要素
	"\t	#stage{\n"												+
	"\t		position: absolute;\n"								+
	// "\t		top:400px;\n"											+
	// "\t		left:50%;\n"										+
	"\t		width:"+stage_width+"px;\n"										+
	"\t		height:70%;\n"									+
	// "\t		border:1px solid red;\n"							+
	"\t		overflow:visible;\n"								+
	"\t		perspective:1000px;\n"								+
	// "\t		margin-left:-490px;\n"								+
	// "\t		margin-top:-300px;\n"								+
	"\t	}\n"													

	);

