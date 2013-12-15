function storeList () {
	var output = $('.container');
	
	$.ajax({
		url: 'http://srv.fidywallet.com/api/client/API_comunication.php?act=storeList&user='+localStorage.getItem("id_user"),
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			$.each(data, function(i,item){
				console.log("document.ready - Sito "+item.nome);
				var landmark = '<div class="heading store_list prefered_'+item.prefered+'"><div class="heading-left"><a href="cards.html?id='+item.id_store+'"><h3>'+item.nome+'</h3></a>'
                +'<em style=\"color: #333;\">'+item.indirizzo+' - '+item.citta+'</em><br>'
                +'<em>'+item.tipologia+'</em>'
        		+'</div>'
       	  		+'<div class="heading-right">'
                +'<a href="stores.html?id='+item.id_store+'" class="icon-shop"><img src="images/fw_icons/fw_store_on.png" width="32"></a>'
                +'</div>'
				+'</div>';
				
				output.append(landmark);
				
				$.each(item, function(indice,valore){
					if(valore==='null')
						console.log("VUOTO");
					else
						console.log("");
				});
				
				item.descrizione = item.descrizione.replace(/'/g, "''");
				item.descrizioneConversione = item.descrizioneConversione.replace(/'/g, "''");
				item.ragioneSociale = item.ragioneSociale.replace(/'/g, "''");
				item.nome = item.nome.replace(/'/g, "''");
				item.tipologia = item.tipologia.replace(/'/g, "''");
				item.indirizzo = item.indirizzo.replace(/'/g, "''");
				item.citta = item.citta.replace(/'/g, "''");
				item.provincia = item.provincia.replace(/'/g, "''");
				item.tipologia = item.tipologia.replace(/'/g, "''");
				
				
				//inserimento nel db
				db_query("INSERT INTO storeList VALUES('"+item.id_store+"','"+item.ragioneSociale+"','"+item.nome+"','"+item.indirizzo+"','"+item.citta+"','"+item.provincia+"','"+item.telefono+"','"+item.tipologia+"','"+item.sito+"','"+item.email+"','"+item.maps+"','"+item.FbUrl+"','"+item.descrizione+"','"+item.descrizioneConversione+"','"+item.prefered+"','"+item.score+"','"+item.pin+"','"+item.img+"')",function(risultati){});
				
			});
		},
		error: function(ts){
			//alert("errore:"+ts.stringify);
			//debug_log("getSiteList","Error retriving site list");
			setTimeout(getSiteList(), 3000);
		}
	});
}

function initStoreDb () {
	//Apro il Db//
	open_db();
     
	//Create auto playlist table
	html5sql.process(
	[	
		"DROP TABLE IF EXISTS storeList;",
		"DROP TABLE IF EXISTS storeMedia;",
		"DROP TABLE IF EXISTS notices;",
		"CREATE TABLE IF NOT EXISTS storeList (id_store INTEGER PRIMARY KEY, ragioneSociale TEXT, nome TEXT, indirizzo TEXT, citta TEXT,provincia TEXT,telefono TEXT,tipologia TEXT,sito TEXT,email TEXT,maps TEXT,FbUrl TEXT,descrizione TEXT,descrizioneConversione TEXT, favorite TEXT,score TEXT,pin TEXT,img TEXT);",
		"CREATE TABLE IF NOT EXISTS storeMedia (id_media INTEGER PRIMARY KEY, store INTEGER, nome TEXT, contenuto TEXT);",
		"CREATE TABLE IF NOT EXISTS notices (id_notice INTEGER PRIMARY KEY, time TEXT, store INTEGER, contenuto TEXT);"
	],
	function(){
		console.log("Created table");
		//debug_log("db","Created Playlist Table");
	},
	function(error, statement){
		console.log("Db, Some error: "+error.message+" - "+statement);
		//debug_log("db","Error creating Playlist Table");
	});
}

function refreshScore (store) {
	$.ajax({
		url: 'http://srv.fidywallet.com/api/client/API_comunication.php?act=getScore&store='+store+'&user='+localStorage.getItem("id_user"),
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			$.each(data, function(i,item){
				
				console.log("UPDATE storeList SET score='"+item.score+"' WHERE id_store='"+store+"'");
				//inserimento nel db
				db_query("UPDATE storeList SET score='"+item.score+"' WHERE id_store='"+store+"'",function(risultati){
					location.reload();
				});
			});
		},
		error: function(ts){
			console.log("Error refreshScore()");
		}
	});
}
function likeStore (store,like) {
	
	console.log("Fn likeStore: "+store+" "+like);
	$.ajax({
		url: 'http://srv.fidywallet.com/api/client/API_comunication.php?act=likeStore&store='+store+'&like='+like+'&user='+localStorage.getItem("id_user"),
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
		},
		error: function(ts){
			console.log("Error");
		}
	});
	//aggiorno il db
	db_query("UPDATE storeList SET favorite='"+like+"' WHERE id_store='"+store+"'",function(risultati){
	});
}