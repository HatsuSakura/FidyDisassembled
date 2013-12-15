//apertura Db
function open_db() 
{
	html5sql.openDatabase(
    "com.fidywallet.fidy",
    "Fidy Db",
    3*1024*1024);
};

function db_query(query,callback)
{
	open_db();
	
	//trovo l'id della riga del current
	html5sql.process(
	[
		query,
	],
	function(transaction, results, rowsArray){
		callback(rowsArray);
		console.log("esito query positivo");
	},
	function(error, statement){
		console.log("Db, Some error: "+error.message+" - "+statement);
		//debug_log("db_query","Error db selecting. Error:"+error.message);
	});
}