function noticesList () {
	var output = $('.container');
	
	$.ajax({
		url: 'http://srv.fidywallet.com/api/client/API_comunication.php?act=noticesList&user='+localStorage.getItem("id_user"),
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			$.each(data, function(i,item){
				console.log("document.ready - Notice "+item.storeName);
				var landmark = '<div class="heading store_list prefered_'+item.prefered+'"><div class="heading-left fitContainer"><a href="cards.html?id='+item.id_store+'"><h3>'+item.storeName+'</h3></a>'
        		+'<em>'+item.timeHuman+'</em>'
        		+'<p>'+item.contenuto+'</p></div>'
				+'</div>';
				
				output.append(landmark);
				
				$.each(item, function(indice,valore){
					if(valore==='null')
						console.log("VUOTO");
					else
						console.log("");
				});
				
				item.contenuto = item.contenuto.replace(/'/g, "''");
				
				//inserimento nel db
				db_query("INSERT INTO notices VALUES('"+item.id_notice+"','"+item.timeHuman+"','"+item.store+"','"+item.contenuto+"')",function(risultati){});
			});
		},
		error: function(ts){
			//alert("errore:"+ts.stringify);
			//debug_log("getSiteList","Error retriving site list");
			setTimeout(noticesList(), 3000);
		}
	});
}
function noticesPresence () {
	$.ajax({
		url: 'http://srv.fidywallet.com/api/client/API_comunication.php?act=noticesPresence&user='+localStorage.getItem("id_user"),
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			$.each(data, function(i,item){
				if(item.esito=='true')
				{
					showSidebar();
					highlightNotice();
				}
				else
					delightNotice();
			});
		},
		error: function(ts){

		}
	});
}

function highlightNotice() {
	$('#menuNotice').append(" <span id=\"noticeNew\">- NEW!!!</span>");
	$('#menuNotice').css("color","#eea917");
	$('#noticeNew').css("color","#eea917");
}
function delightNotice() {
	$('#noticeNew').hide();
	$('#menuNotice').css("color","#fff");
}
