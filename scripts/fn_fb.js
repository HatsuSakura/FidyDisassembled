function getMe()
{
	FB.api('/me', function(response) {
		//alert ("Dati Email:"+response.email+" Dati id:"+response.id);
		//SetAsLoged (response.id,response.email);
		/*
		SetAsLoged(response.id,response.email, function(output){
  			// here you use the output
  			localStorage.setItem("id_user", output);
		});
		*/
		
		FB.getLoginStatus(function(response2) {
			var token = response2.authResponse.accessToken;
			//alert ("Token:"+token);
			
			if (response2.status == 'connected') {
				//alert("loged IN: " + JSON.stringify(response2));
				//setto l'utente come loggato
				
				$.ajax({
					url: 'http://srv.fidywallet.com/api/client/API_comunication.php?act=logged&nome=prova&FbUser='+response.id+'&user_email='+response.email+'&type=facebook&token='+token,
					dataType: 'jsonp',
					jsonp: 'jsoncallback',
					timeout: 5000,
					success: function(data, status){
						$.each(data, function(i,item){
							//return item.id_user;
							localStorage.setItem("id_user", item.id_user);
							//canLogin(item.id_user); //da riabilitare appena funziona
							//alert('Ok, faccio il login');
							localStorage.setItem("loggedMethod", "fb"); //variabile per capire se l'utente ha mai fatto un login o no
							LoginOk();
						});
					},
					error: function(){
						//console.log("Set As Logged: failed");
						//alert("Errore Ajax call");
					}
				}); 
				
			} else {
				//alert('not logged in');
			}
		});	     					
	});
	
};

function getLoginStatus() {
	FB.getLoginStatus(function(response) {
		var arrayToDisplay = JSON.stringify(response);
		//alert ("Login status array:"+arrayToDisplay);
		var token = response.authResponse.accessToken;
		
		if (response.status == 'connected') {
			//alert('logged in');
		} else {
			//alert('not logged in');
		}
	});
}

            var friendIDs = [];
			var fdata;
            function me() {
                FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
                       if (response.error) {
                       //alert(JSON.stringify(response.error));
                       } else {
                       var data = document.getElementById('data');
					   fdata=response.data;
					   console.log("fdata: "+fdata);
					   //alert("fdata: "+fdata);
                       response.data.forEach(function(item) {
                                             var d = document.createElement('div');
                                             d.innerHTML = "<img src="+item.picture+"/>"+item.name;
                                             data.appendChild(d);
                                             });
                       }
					var friends = response.data;
					console.log(friends.length); 
					for (var k = 0; k < friends.length && k < 200; k++) {
				        var friend = friends[k];
				        var index = 1;

				        friendIDs[k] = friend.id;
				        //friendsInfo[k] = friend;
					}
					console.log("friendId's: "+friendIDs);
					//alert("friendId's: "+friendIDs);
                       });
            }
            
            
            function MyData() {
                FB.api('/me', { fields: 'id, name, picture, email' },  function(response) {
                       if (response.error) {
                       	//alert("MyData "+JSON.stringify(response.error));
                       } else {
                      	//alert("MyData "+JSON.stringify(response));
                       }
            	});
            }
            
            
            function logout() {
                FB.logout(function(response) {
                	//alert('logged out');
				});
				localStorage.removeItem("id_user");
				window.location.replace("main.html"); //redirect to home
            }
            
            function exitFromApp()
             {
                navigator.app.exitApp();
             }
            
            
            function login() {
                FB.login(
                 function(response) {
                 	if (response.session) {
                 		//alert('logged in (login function). Email:'+response.email);
                 	} else {
                 		//alert('not logged in(login function). Email:'+response.email);
                 	}
                 },
                 { scope: "email" }
                 );
            }
			
			
			function facebookWallPost() {
			    console.log('Debug 1');
				var params = {
				    method: 'feed',
				    name: 'Facebook Dialogs',
				    link: 'https://developers.facebook.com/docs/reference/dialogs/',
				    picture: 'http://fbrell.com/f8.jpg',
				    caption: 'Reference Documentation',
				    description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
				  };
				console.log(params);
			    FB.ui(params, function(obj) { console.log(obj);});
			}
            
			function publishStoryFriend() {
				randNum = Math.floor ( Math.random() * friendIDs.length ); 

				var friendID = friendIDs[randNum];
				if (friendID == undefined){
					alert('please click the me button to get a list of friends first');
				}else{
			    	console.log("friend id: " + friendID );
			        console.log('Opening a dialog for friendID: ', friendID);
			        var params = {
			        	method: 'feed',
			            to: friendID.toString(),
			            name: 'Facebook Dialogs',
			            link: 'https://developers.facebook.com/docs/reference/dialogs/',
			            picture: 'http://fbrell.com/f8.jpg',
			            caption: 'Reference Documentation',
			            description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
			     	};
					FB.ui(params, function(obj) { console.log(obj);});
			    }
			}