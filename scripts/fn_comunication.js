function SetAsLoged (FbUser,user_email,response) {
		$.ajax({
		url: 'http://srv.fidywallet.com/api/client/API_comunication.php?act=logged&FbUser='+FbUser+'&user_email='+user_email+'&type=facebook',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			$.each(data, function(i,item){
				//return item.id_user;
				//localStorage.setItem("id_user", item.id_user);
				response(item.id_user);
			});
		},
		error: function(){
			console.log("Set As Logged: failed");
		}
	});
	return true;
};

function canLogin(id_user) {
	$.ajax({
		url: 'http://srv.fidywallet.com/api/client/API_comunication.php?act=canlogin&idUser='+id_user,
		dataType: 	'jsonp',
		jsonp: 		'jsoncallback',
		timeout: 	5000,
		success: function(data, status){
			$.each(data, function(i,item){
				//alert("Item result: "+item.result);
				if(item.result=='true')
				{
					console.log("Set As Logged: Succeed");
					//set the user id on local storage
					LoginOk();
				}
				else
				{
					console.log("Set As Logged: Failed");
				}
			});
		},
		error: function(){
			
		}
	});
}

function Login(username,password) {
	$.ajax({
		url: 'http://srv.fidywallet.com/api/client/API_comunication.php?act=login&username='+username+'&password='+password,
		dataType: 	'jsonp',
		jsonp: 		'jsoncallback',
		timeout: 	5000,
		success: function(data, status){
			$.each(data, function(i,item){
				//alert("Item result: "+item.result);
				if(item.esito=='true')
				{
					console.log("Set As Logged: Succeed");
					//set the user id on local storage
					localStorage.setItem("id_user", item.id_user);
					localStorage.setItem("LoginUsername", username);
					localStorage.setItem("LoginPassword", password);
					LoginOk();
				}
				else
				{
					console.log("Set As Logged: Failed");
					$('.formValidationError').show();
				}
			});
		},
		error: function(){
			
		}
	});
}

function Register(name,surname,email,password) {
	$.ajax({
		url: 'http://srv.fidywallet.com/api/client/API_comunication.php?act=register&name='+name+'&surname='+surname+'&email='+email+'&password='+password,
		dataType: 	'jsonp',
		jsonp: 		'jsoncallback',
		timeout: 	5000,
		success: function(data, status){
			$.each(data, function(i,item){
				//alert("Item result: "+item.result);
				if(item.esito=='true')
				{
					console.log("Set As Register: Succeed");
					//set the user id on local storage
					localStorage.setItem("id_user", item.id_user);
					console.log("ecco l'id User:"+item.id_user);
					LoginOk();
				}
				else if(item.esito=='false')
				{
					console.log("Set As Register: Failed");
					$('#contactRegisterSameUserError').show();
				}
				else
				{
					console.log("Set As Register (Connection): Failed");
					$('#contactRegisterError').show();
				}
			});
		},
		error: function(){
			
		}
	});
}

function sendAlertPin (note) {
	console.log("inviato alert pin");
	$.ajax({
		url: 'http://srv.fidywallet.com/api/client/API_comunication.php?act=alert&type=pin&note='+note+'&user='+localStorage.getItem("id_user"),
		dataType: 	'jsonp',
		jsonp: 		'jsoncallback',
		timeout: 	5000,
		success: function(data, status){
			
		},
		error: function(){
			
		}
	});
}

//function that simply redirect the user to the home page
function LoginOk () {
	//alert("qui dovrebbe fare il redirect");
	if(localStorage.getItem("tutorial")=='1')
		window.location.replace("main.html"); //redirect to home
	else
		window.location.replace("tutorial.html"); //redirect to tutorial
}