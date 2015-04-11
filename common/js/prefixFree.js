//prefixFree.js
//げんざいの対応状況

//transform系
//animation
//keyframes
//perspective
//matrix




//関数を呼び出す変数
	var prefixFree; 


//取得したベンダープレフィックスを入れとく箱 
	var prefix;



$(function(){

	//使い方 	prefix(); prefix('TAG_NAME');  ,  prefix('#ID_NAME');  ,  prefix('.CLASS_NAME');

	//引数にセレクターを入れると　その子要素のスタイルを全て置換するようになっている

	//別のjs.ファイルでも　prefixFree(); を呼び出すと　<style>タグを全件検索して　条件に合ったものを置換する

	//ブラウザのベンダープレフィックスは　prefix に格納されているので prefixFree.jsを読み込んだ後の
	//他の.jsファイルでも　必要ならばつかえる


		// = > バグ　使えるとおもったら使えない




//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



	$(function(){


/**/
		//適当なDOMを作ってスタイルシートを配列で取得
			var css = document.createElement("div").style;



/**/
		//検索するベンダープレフィックス

			var prefixes = [
				"-webkit-","-moz-","-o-","-ms-",""
			]


/**/
		//ブラウザのベンダープレフィックスを取得する

			for(var i = 0; i < prefixes.length; i++) { 	//styleの全てに処理をかける
			
			    if(typeof css[prefixes[i]+"transform"] != "undefined") { 
			
			      prefix = prefixes[i];
			      break;
				}
			}



	// console.log(prefix);
	});



//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー




	prefixFree = function(selecter){

		var match;


		//引数に　IDセレクタか　classセレクタか　それ以外（タグの名前）か　を判定する

			if(selecter){ match = selecter.match(new RegExp('[#\\.]'))}



		//（タグの名前）だったら　そのタグの中の　<style> を全て検索　置換

			if(match===null){var IDclass = ""; var parent = selecter+" "; }



		//IDセレクタか　classセレクタ　だったら スタイルについたIDか　classを検索して置換

			else if(match=="#"||match=="."){ var IDclass = selecter; var parent = ""; }



		//何も指定がなかったら全ての <style> を検索　置換する

			else if(!selecter){ var IDclass = ""; var parent = ""; }



//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



		//スタイルから必要なものにベンダープレフィックスを書き加える
		//セレクタで取得した<style>の中身をプレフィックスをつけて置換
		//その文字列を<style>タグの中身に上書き
		//それを取得した<style>それぞれに実行する

		//おそらく　<style id= ~~ > として　必要な部分にIDで指定して実行したほうが軽いはず



			$(parent+'style'+IDclass).each(function(){



				var styleText = $(this).text();



				var changeText = styleText
									//プレフィックスが付いていない場合
									.replace(new RegExp('transform','g'),prefix+'transform')
									.replace(new RegExp('keyframes','g'),prefix+'keyframes')
									.replace(new RegExp('animation','g'),prefix+'animation')
									.replace(new RegExp('perspective','g'),prefix+'perspective')
									.replace(new RegExp('matrix3d','g'),prefix+'matrix3d')

									//多分これはいらない：
									// .replace(new RegExp(prefix+'transform','g'),prefix+'transform')
									// .replace(new RegExp(prefix+'keyframes','g'),prefix+'keyframes')
									// .replace(new RegExp(prefix+'animation','g'),prefix+'animation')
									// .replace(new RegExp(prefix+'perspective','g'),prefix+'perspective')

									//すでにプレフィックスが付いていた場合に起こるバグ対策
									.replace(new RegExp("-[a-z]{1,6}-"+prefix+'transform','g'),prefix+'transform')
									.replace(new RegExp("-[a-z]{1,6}-"+prefix+'keyframes','g'),prefix+'keyframes')
									.replace(new RegExp("-[a-z]{1,6}-"+prefix+'animation','g'),prefix+'animation')
									.replace(new RegExp("-[a-z]{1,6}-"+prefix+'perspective','g'),prefix+'perspective')
									.replace(new RegExp("-[a-z]{1,6}-"+prefix+'matrix3d','g'),prefix+'matrix3d')
									;

				$(this).html(changeText);

			});// each();

		}// prefixFree();
		
		
			
});//おわり
