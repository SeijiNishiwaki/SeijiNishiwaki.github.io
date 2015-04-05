$(function(){

//ページのフェードイン効果
$('#wrapper').css({opacity:0}).animate({opacity:1},1000);

//＃noscriptsytle を　適用外にする

$('link[href="common/css/noScript.css"]').remove();


//htmlに<style>をつくる
//各スクリプトが書き出したほうがいいと思う　idに　ファイルの名前をつけて管理するようにしたい <script id="animation.js"></script> みたいな
	// $('head').append('<!--次のスタイルはjavascriptで書き出しています-->\n<style type="text/css" id="style1"></style>');
	// $('head').append('<!--次のスタイルはjavascriptで書き出しています-->\n<style type="text/css" id="style2"></style>');
	// $('head').append('<!--次のスタイルはjavascriptで書き出しています-->\n<style type="text/css" id="style3"></style>');


//スクリプトを効かせた時に入らない要素は削除する
 $('.noscript').remove();


 // $('#header_text').css({
 // 	width:"800px",
 // 	margin:"0 auto",
 // 	marginTop:"50px",
 // 	textAlign:"center",
 // });
});

