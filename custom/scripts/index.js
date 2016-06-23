$(document).on('ready', function() {
//ANONYMOUS FUNCTIONS
	$('.user_info_request' ).on("click", function(){
	$.mobile.changePage( "#user_requestmoreinfo_page" );
	// $.mobile.ajaxEnabled=false;
      });

	//BTN CLICKS
$('#schools_list').delegate('a', 'click', function () {
    var schools_list_id = $(this).attr('id');
	
	localStorage.setItem("user_schoolls_id", schools_list_id);
	//localStorage.removeItem("user_schoolls_id");
	//console.log(localStorage.user_schoolls_id);
    $.mobile.changePage("#user_school_info");

   }); //schools btn

   $(".back_to_schoolsbtn").click(function(e){
		e.preventDefault();
		localStorage.removeItem("user_schoolls_id");
		$.mobile.changePage('#user_loggedin');
     
	});	

	

  $('#admin_content_schools').delegate('.adminedit', 'tap', function () {
	  var id=$(this).attr('id');
	  if(typeof(Storage) !== "undefined") {
		  localStorage.admin_school_id = id;
	  }
	   
	$('#pop_adminsch_delup').popup( "open" );
	//$.mobile.changePage( "#updateschool");
  }); //Click of listview items
	  
	$('#pop_admdel_sch').on('tap', function(){
		  $.mobile.changePage('#admin_loggedin_schools');
	});

//PAGE SHOWS:
$(document).on("pageshow","#loginpage", function(){
	
	$('#loginbtn').on('tap', function(){
	if($('#username_login').val().length > 0 && $('#password_login').val().length > 0){
		var formval = $('form#login_form').serialize();
		
		$.ajax({url: 'custom/php/login.php',
                        data: formval,
                        type: 'post',                   
                        async: 'true',
                       dataType: 'json',
                        beforeSend: function() {
                             $.mobile.showPageLoadingMsg(true); 
                        },
                        complete: function() {
                            $.mobile.hidePageLoadingMsg();
                        },
                        success: function (result) {
							var data ={result};
							if(data.result === null){
								$('#failedmessage').html('Failed');
								$('#pop_up_message').html('Incorrect username/ password');
								$( "#mwangian" ).popup( "open" );
								
								}
						else{
							localStorage.setItem('loggedin_id', data.result.id);
							console.log(data.result.level);
							if(data.result.level == 3){
								$.mobile.changePage('#user_loggedin');
								}else{
								$.mobile.changePage('#admin_loggedin_schools');
								}
							}	
                        },
                        error: function (event) {
							console.log(event);
							 }
                    });
					}else{
			$('#failedmessage').html('Failed');
			$('#pop_up_message').html('Username and password are mandatory');
			$( "#mwangian" ).popup( "open" );
			}});
});

$(document).on("pageshow","#signup_form", function(){
	console.log('dd');
$('#loginbtn').on('click', function(e){
	e.preventDefault();
	 if($('#username_login').val().length > 0 && $('#password_login').val().length > 0){
                // Send data to server through the Ajax call
                // action is functionality we want to call and outputJSON is our data
                    $.ajax({url: 'check.php',
                        data: {action : 'login', formData : $('#check-user').serialize()},
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
                            if(result.status) {
                                $.mobile.changePage("#second");                         
                            } else {
                                alert('Logon unsuccessful!'); 
                            }
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

$(document).on("pageshow","#user_loggedin", function(){ // When entering pagetwo
	var id = localStorage.loggedin_id;
  $.getJSON(
	"http://127.0.0.1/tum_old/custom/php/schools.php",
	function(data){
		var schools = "";
		for(var i=0; i<data.length;i++){
		schools +="<li>";
		schools +="<a href='#' id="+ data[i].school_id +">";	
		schools +=data[i].school_name;
		schools +="</a>";
		schools +="</li>";
		}
		
		 $("#schools_list").html(schools);
		 $("#schools_list").listview('refresh');
		//console.log(data);
		}
	);
	 
	 $.getJSON("http://127.0.0.1/tum_old/custom/php/loggedinuser.php",{id:id},function(data){
		 $('#user_loggedin_name').html(data.firstname);
		 });
	 
}); //schoolpage End  

  $(document).on('pageshow', "#user_schoolperformance",function () {	
  var id = localStorage.user_schoolls_id;  
   $.getJSON('custom/php/showresults.php',{id:id},
   function(data){
	   console.log(data);
	     var obj = {data};
		 
		 var dataobj = obj.data.length;
		if(dataobj !== 0){
            var output = "";
                for(var i=0; i<data.length;i++){
                     output += '<li>';	  
                    output += '<a href ="#" id=' + obj.data[i].id +'>';
                     output += '<h3>'+obj.data[i].year+'</h3>';
                     output +='<p>KCSE Results</p>';
                     output += '<span class="ui-li-count">'+obj.data[i].mean_score+'</span>';
                    output +='<p class="ui-li-aside">Mean score</p>';
                     output += '</a>';
                    
                     output += "</li>";
                    }
             $("#resyults_content").html(output);
             $("#resyults_content").listview('refresh');
            }
        else
        {
         $("#resyults_content").html('<b>Sorry the results are to be uploaded soon check later</b>');
         
		}
   });
});  // On show school performance page


$(document).on("pageshow","#user_school_info", function(){

	var id = localStorage.user_schoolls_id;
    $.getJSON('custom/php/showinfo.php',{id:id},
        function(data){
            var obj = {data};
            $("#new_schoolinfo_name").html(obj.data.school_name );
           $("#new_schoolinfo_page").html(obj.data.category + " school");
           $("#schoolinfo_location").html(obj.data.loca_description);
             $("#headerschoolinfo").html(obj.data.school_name);
        });        

   });   // <!-- On show school info page-->


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
					
		$("#chatmessages").html('......Loading conversations');	
		
			$("#mm").on('tap', function(e){
				console.log(e);
			});	
				
	  });
   
//ADMINISTRATOR

   $(document).on("pageshow", '#admin_loggedin_schools', function(){
	   
	   	$.getJSON("http://127.0.0.1/tum_old/custom/php/loggedinuser.php",
	function(data){
		$('#header_admin_name').html(data.firstname +" "+ data.secname);
			});
		
		$.getJSON("http://127.0.0.1/tum_old/custom/php/schools.php",function(data){
			var output = "";
			 for(var i=0; i<data.length;i++){
				output += "<li>"; 
					output +="<a href='#' class ='adminschool' id ="+data[i].school_id+">";
					output += data[i].school_name;
					output +="</a>";
					output +="<a href ='#' id ="+data[i].school_id+" class ='adminedit' data-theme='e' data-rel='popup'>";
					output +="</a>";
				output += "</li>"; 
				 }
				 output += "</ul>";
				 $("#admin_content_schools").html(output);
				 $("#admin_content_schools").listview('refresh');
				 
			});
	   });
	   

$(document).on('pageshow', '#updateschool', function(){
	var id =localStorage.admin_school_id;
	$.getJSON("http://127.0.0.1/tum_old/custom/php/adminphp/showspecific_school.php",{id:id},function(data){
		if(data.length>1){
			alert('error');
			$.mobile.changePage('admin_loggedin_schools');
			}else{
				$('#admin_sch_up_name').html(data[0].school_name);
				$('#admin_schup_nme').val(data[0].school_name);
				$('#admin_schup_cate').val(data[0].category);
				$('#admin_schup_loc').val(data[0].loca_description);
				}
		
		
		});
	
	});
	    
$(document).on('pageshow','#admin_addsch', function(){
	
	var crit = $('#admin_addsch_yesno').val();
	var nextbtn ='<a href="#" data-role="button" data-theme="b" data-inline="true">Next</a>';
	var savebtn ='<a href="#" data-role="button" data-theme="b" data-inline="true">Save</a>';
	if(crit === 'off'){
		$('#admin_addsch_add_nextbtn').html(savebtn);
		}else{
			$('#admin_addsch_add_nextbtn').html(nextbtn);
			$('#admin_addsch_add_nextbtn').button('refresh');
	}
	
	});		
   

	   //PAGE HIDES	
$("#updateschool").bind("pagehide",function(){
	  localStorage.removeItem('admin_school_id');
  });

	  
	$('#admin_pop_back').bind("pagehide",function(){
		localStorage.removeItem("admin_school_id");
	});

$('#user_requestmoreinfo_page').bind("pagehide",function(){
		$("#text_user_message").val("");
		clearInterval(chat);
	});


	
	
//PAGE INITS
$('#user_requestmoreinfo_page').bind("pagehide",function(){
		$("#text_user_message").val("");
		$("#chatmessages").html('...Loading Previous Messages');
		//clearInterval(chat);
		
});

});
	
