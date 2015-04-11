$(function(){

/*-------------------------------------------
	レスポンシブwrapper
/*-------------------------------------------*/

	var windowresize = function(){
	

		var windowWidth = $(window).width();

		if(windowWidth<980){
			$('#stage').css({
				width:windowWidth+"px",
				// marginLeft:(-windowWidth/2)+"px",
			});
		}else{
			$('#stage').css({
				width:"980px",
				// marginLeft:"-490px",
			});
		}
	}
	windowresize();
	
	$(window).resize(function(){
	
		windowresize();
	
	
	});




});