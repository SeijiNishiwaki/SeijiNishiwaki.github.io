$(function(){


//エラーメッセージリストを格納する箱	
var msgs;

//<li>エラーメッセージリスト</li>の作成する関数
//エラースタイルを加えるする関数


var setError = function(elem,msg){
	msgs.push('<li>'+msg+'</li>');
	$(elem).addClass('error_field')
			.after('<span class="error_mark">*</span>');
}


//送信ボタンを押した時
//各項目をチェックしてエラーメッセージを作成
//エラー関数で msgs に　エラーリストを作成する
/*
必須項目　	.required	<- requierd と打ち間違えていた  erが逆
書名			.length
価格			.range
出版社		.inarray
入力形式		.regexp
*/

$('#fm').submit(function(e){	//eはprebentDefault用
	msgs = [];
	$('.error_mark',this).remove();
	$('.valid',this)
		.removeClass('error_field')
		.filter('.required')				//<input class="required">が選択されている
	//1.必須項目チェック
		.each(function(){
			if($(this).val() === ""){
				setError(this,$(this).prev('label').text()+"は必須入力です");
			}
		}).end()	//	<li class="requied">選択から <li class="valid">に選択を切り替える

	//2.書名チェック（名前の長さでチェック）
		.filter('.length').each(function(){
			if($(this).length > $(this).data('length')){
				setError(this,$(this).prev('label').text()+"は"+$(this).data('length')+"文字以外で入力してください。");
			}
		}).end()
	//3 価格チェック
		.filter('.range').each(function(){
			var price = $(this).val();
			var v = parseFloat(price);
			if(v < $(this).data('min')||v > $(this).data('max')){
				setError(this,$(this).prev('label').text()+"は"+$(this).data('min')+"〜"+$(this).data('max')+"の範囲で入力してください。");
			}
		}).end()
	//出版社チェック　data-inarray="翔泳社 技術評論社 秀和システム"　とのマッチ
		.filter('.inarray').each(function(){
			//もじ入力された文字が data-inarrayになかったら　を書く
			//"翔泳社 技術評論社 秀和システム" という文字列を　配列に変換する
			var opts = $(this).data('option').split(' ');

			//入力された文字　が　配列の中にあるかチェックしたい
			if($.inArray( $(this).val() , opts ) === -1){
				setError(this,$(this).prev('label').text()+"は"+　opts.toString()　+"のいずれかを入力してください");
			}
		}).end()
	//入力形式
		.filter('.regexp').each(function(){
			//入力形式のチェック	htmlで　正規表現が定義されている
			var reg = new RegExp( $(this).data('pattern') , 'gi' );
			if(!reg.test($(this).val())){
				setError(this, $(this).prev('label').text()+"の入力形式が間違っています。" );
			}
		});
//できたエラーメッセージリストをhtmlに書き加える
		if(msgs.length===0){
			$('#error_summary').css({display:"none"});
		}else{
			$('#error_summary').css({display:"block"})
								.html(msgs);
		}
//エラーメッセージリストがあった場合は submit　を無効にする
		e.preventDefault();
});






});//おわり


/*
要点目次

e.preventDefault();
配列 = [];
.each(function(){}) と this
.split(' ');
$.inArray( 値 , 配列 );
new RegExp( 正規表現ルール , 文字列操作のオプション );
RegExp(~).test( 文字列などの値 );
*/


//e.preventDefault
//msgs によってイベントが発生するので その初期化　msgs = []
//.filter()　選択した中からさらにセレクターで絞る
//.each(function)　と　this 
		//jquery　は　最初の要素しか取得できない。全部の要素をそれぞれ操作したい場合は
		//要素.each(function(){})　として　その中で thisをセレクターとして使う
//文字列変数.split('区切りに指定する文字　, や @ など')
		//文字列を　ある文字を指定して区切って　配列に変換する
//$.inArray( 値 , 配列 );
		//ある値が　配列の中にあるかチェックする
		//なかったら false じゃなくて　−１　が帰ってくるので注意！！！
//正規表現オブジェクト？？？をつくる
// new RegExp( 正規表現ルール , 文字列操作オプション )
//その中の.test()に文字列を入れると オブジェクトで定義されたルールに従っているか調べられる
		// true / false

//	[0-9]{2,6} 0 ~ 9 までの　値が 2文字以上 6文字以下
//	[a-z]{1}   a ~ z までの　値が 1文字 

//	第二引数にしていできる文字列操作オプション
//	g　全部を検証
//	i　大文字　小文字　を　無視する
//	m　複数行を検証？
//	y　lastIndexプロパティ？との連動らしいけどよくわからない


