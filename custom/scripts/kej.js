    $(document).on('pageshow', '#user_requestmoreinfo_page',function(e){
		var me = function info_request(){
			var id_from = localStorage.loggedin_id;
			var id_to = localStorage.user_schoolls_id;
	$.getJSON("http://127.0.0.1/tum_old/custom/php/message.php",{id_from:id_from,id_to:id_to},function(response){
		console.log(data);
				var data = {response};
				for(var i= 0; i<data.response.length; i++){
					console.log(data.response);
					
				}
					$("#chatmessages").html(data);
				});
		};

		chat = setInterval(me,1000);
		console.log(e);
		var message = $("#text_user_message").val();
		
		$('#loginbtn').on('click', function(e){
	e.preventDefault();
	 if(message > 0 ){
                // Send data to server through the Ajax call
                // action is functionality we want to call and outputJSON is our data
                    $.ajax({url: '127.0.0.1/php/send.php',
                        data: {message:message,id_from:id_from,id_to:id_to},
                        type: 'post',                   
                        async: 'true',
                             dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                        },
                        success: function (result) {
                        console.log(result);
                        },
                        error: function (error) {
                            // This callback function will trigger on unsuccessful action                
                            console.log(error);
                        }
                    });                   
            } else {
                alert('Please fill all necessary fields');
            }           
            return false; // cancel original event to prevent form submitting
        });
				
	  });
