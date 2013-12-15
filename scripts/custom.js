$(document).ready(function(){
	//Logout
	$('.logout').fastClick(function (){
		localStorage.setItem("logout", "1");
	});
	
	//colorbox punteggio
	$('body').on('click','.cboxElement',function(){
		console.log("click");
		$(".cboxElement").colorbox({inline:true, width:"255px", height:"270px",closeButton:true});
	});
	
	//filtro lista
	$('.filterFav').fastClick(function (){
		//stores item
		$('.store_list').hide(); //nascondo tutte le entry
		$('.prefered_1').show(); //mostro le entry
		
		//bottoni
		$('.icon-shop').removeClass('filterName-On filterName-Off filterFav-On filterFav-Off');
		$('.filterOff').addClass('filterName-Off');
		$('.filterFav').addClass('filterFav-On');
	});
	$('.filterOff').fastClick(function (){
		//stores item
		$('.store_list').show(); //mostra tutte le entry
		
		//bottoni
		$('.icon-shop').removeClass('filterName-On filterName-Off filterFav-On filterFav-Off');
		$('.filterOff').addClass('filterName-On');
		$('.filterFav').addClass('filterFav-Off');
	});
	$('.filterUser').fastClick(function (){
		//stores item
		$('.store_list').hide(); //nascondo tutte le entry
		
		//bottoni
		$('.icon-shop').removeClass('filterName-On filterName-Off filterFav-On filterFav-Off');
		$('.filterOff').addClass('filterName-On');
		$('.filterFav').addClass('filterFav-Off');
	});
	
	//Cards buttons
	$('#btnPunti_placeholder').fastClick(function (){
		//event.preventDefault();
		
	
	});
	$('#btnRegali_placeholder').fastClick(function (){
		//event.preventDefault();
		
		
	});
	$('#btnInfo_placeholder').fastClick(function (){
		//event.preventDefault();
		
		
	});
	
	//Like
	$('#btnLike').fastClick(function (){
		event.preventDefault();

		$('#btnLike').hide();
		$('#btnNonLike').show();
		likeStore ($('#btnLike').attr('id_store'),0);
	});
	$('#btnNonLike').fastClick(function (){
		event.preventDefault();

		$('#btnNonLike').hide();
		$('#btnLike').show();
		likeStore ($('#btnNonLike').attr('id_store'),1);
	});
	
	//sidebar
	$('#left-menu').fastClick(function (){
		showSidebar();
	});
	$('html').click(function() {
		hideSidebar();
	});
	$('#left-menu_off').fastClick(function() {
		hideSidebar();
	});
	$('#left-menu').fastClick(function(event){
    	event.stopPropagation();
	});
	
	
	$('.tab-one').click(function(){
		$('#tab-one').fadeIn(150);
		$('#tab-two').fadeOut(150);
		$('#tab-three').fadeOut(150);
	});
	
	$('.tab-two').click(function(){
		$('#tab-one').fadeOut(150);
		$('#tab-two').fadeIn(150);
		$('#tab-three').fadeOut(150);
	});
	
	$('.tab-three').click(function(){
		$('#tab-one').fadeOut(150);
		$('#tab-two').fadeOut(150);
		$('#tab-three').fadeIn(150);
	});
	
	$('body,html').animate({scrollTop:0},0);
	

	$('.deploy-navigation').click(function(){
		$('.page-content').delay(200).hide();
		$('.page-navigation').delay(200).fadeIn(300);
		$('.page-hider').animate({
			height:'120%'
		}, 300, 'easeInOutExpo');
		$('body,html').animate({scrollTop:0},500);
		return false;
	});
	
	$('.small-close-nav').click(function(){
		$('.page-content').delay(200).show();
		$('.page-navigation').fadeOut(300);
		$('.page-hider').delay(200).animate({
			height:'0%'
		}, 300, 'easeInOutExpo');
		$('body,html').animate({scrollTop:0},500);
		return false;
	});
			
	$('.bxslider').bxSlider({
		pager:false,
		controls:false,
		touchEnabed:true,
		infiniteLoop: false,
		useCSS:true,
		adaptiveHeight:true,
		preloadImages: 'all',
		preventDefaultSwipeX:true
	});	
	
	$('.bx-next').click(function(){
		return false;
	});
	
	$('.bx-prev').click(function(){
		return false;
	});	

});