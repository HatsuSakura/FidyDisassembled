function backToHome() {
	//mostro il div output e nascondo output_article
	$('#output_dashboard').show();
	$('#output_articoli').hide();
}

////////////////////
//Sidebar Fnction//
////////////////////
function showSidebar() {
	$(".page-sidebar").show();
	$('.page-wrapper').transition({
		x:'+270px'
	}, 300, 'easeInOutExpo', function(){
	});
	
	//cambio icona del menu
	$('.icon-left-menu_on').hide();
	$('.icon-left-menu_off').show();
	
	return false;
};

function hideSidebar() {
	$('.page-wrapper').transition({
		x:'0px'
	}, 300, 'easeInOutExpo', function(){
		$(".page-sidebar").hide();
	});
	
	//cambio icona del menu
	$('.icon-left-menu_off').hide();
	$('.icon-left-menu_on').show();
	
	return false;
};