$(document).on('ready', function() {
//ANONYMOUS FUNCTIONS
	$('.user_info_request' ).on("click", function(){
	$.mobile.changePage( "#user_requestmoreinfo_page" );
      });

$(document).on("pagehide","#loginpage", function(event){
	event.preventDefault();
	$("#username_login").val("");
	$("#password_login").val("");
	
});


	//BTN CLICKS
$('#schools_list').delegate('a', 'click', function () {
	 var id = $(this).attr('id');
	$.getJSON("http://127.0.0.1/tum_old/custom/php/adminphp/showspecific_school.php",{id:id}, function(response){
		localStorage.removeItem("user_schoolls_head");
		
		localStorage.setItem("user_schoolls_id", response[0].school_id);
		localStorage.setItem("user_schoolls_head", response[0].head);
		$.mobile.changePage("#user_school_info");
		});
	
	//localStorage.removeItem("user_schoolls_id");
	//console.log(localStorage.user_schoolls_id);
   // $.mobile.changePage("#user_school_info");

   }); //schools btn
   
   $(".logout").click(function(){
	   localStorage.clear();
	   alert("You are now logging out");
	   	   $.mobile.changePage("#indexpage");
	   });

   $(".back_to_schoolsbtn").click(function(e){
		e.preventDefault();
		localStorage.removeItem("user_schoolls_id");
		localStorage.removeItem("user_schoolls_head");
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


//SIGN UP
$(document).on("pageinit", "#signup_form", function(e){
	e.preventDefault();
	//console.log(e);
	$("form#signupform").on("submit", function(e){
		var formdata =$("form#signupform").serialize();
		console.log(formdata);
		$.ajax({url: 'custom/php/signup.php',
                        data: formdata,
                        type: 'post',                   
                        async: 'true',
                      // dataType: 'json',
                        beforeSend: function() {
                             $.mobile.showPageLoadingMsg(true); 
                        },
                        complete: function() {
                            $.mobile.hidePageLoadingMsg();
                        },
                        success: function (result) {
					alert("successifully registered You can now Login.After Login Update your profile details");
							console.log(result);
                        },
                        error: function (event) {
							alert("A user exists with similar username and email");
							
							 }
                    });
					
		
		
		console.log(e);
		e.preventDefault();
		});
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
							//normal user-3,  hteacher-2, admin-1,
							localStorage.setItem('loggedin_id', data.result.id);
							localStorage.setItem('loggedin_username', data.result.username);
							console.log(data.result.level);
							if(data.result.level == 3){
								$.mobile.changePage('#user_loggedin');
								}else if(data.result.level == 2){
									 $.mobile.changePage('#hteacher_loggedin_sch');
									}
								else if(data.result.level == 1){
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

$(document).on("pageshow","#user_loggedin", function(){ // When entering pagetwo
 localStorage.removeItem("user_schoolls_head");
 
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
                for(var i=0; i<data.length; i++){
                     output += '<li>';	  
                    output += '<a href ="#" id=' + obj.data[i].id +'>';
                     output += '<h3> Year: '+obj.data[i].year+'</h3>';
                     output +='<p>Total Students:'+ obj.data[i].total_students+'<br><br>';
					 output += '<b>('+obj.data[i].performance+')</b>';
					 output +='</p>';
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
            
        });        

   });   // <!-- On show school info page-->

});//user page
    $(document).on('pageinit', '#user_requestmoreinfo_page',function(){

	 $("#submitmessage").click(function(e){
				e.preventDefault();
			if($('#text_user_message').val().length>0){
				var user_from = localStorage.loggedin_username;
				var id_from = localStorage.loggedin_id;
				var id_to_send_msg = localStorage.user_schoolls_head;
				var message = $("#text_user_message").val();
		
			$.ajax({url: 'custom/php/sendmessage.php',
                        data: {message:message,id_from:id_from,id_to_send_msg:id_to_send_msg,user_from:user_from},
                        type: 'post',                   
                        async: 'true',
                        dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							
                        },
                        complete: function() {
                            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$("#text_user_message").val("");
                        },
                        success: function (result) {
                           console.log(result);
							
							return false;
                        },
                        error: function (error) {                
                            console.log(error);
							return false;
                        }
                    });    
			return false;
			}else{
				console.log('Enter the message to send');
				return false;
				
			}
		});
				
	  });

	  
  $(document).on("pageshow","#user_requestmoreinfo_page", function(){
		$("#chatmessages").html('<b style ="margin:auto;" >Loading.....</b>');	
		
		var me = function info_request(){
			var id_from = localStorage.loggedin_id;
			var id_to_send = localStorage.user_schoolls_head;
			
function timeDifference(current, previous) {
			var msPerMinute = 60 * 1000;
			var msPerHour = msPerMinute * 60;
			var msPerDay = msPerHour * 24;
			var msPerMonth = msPerDay * 30;
			var msPerYear = msPerDay * 365;
			
			var elapsed = current - previous;
			
			if (elapsed < msPerMinute) {
				 return Math.round(elapsed/1000) + ' sec ago';   
			}
			
			else if (elapsed < msPerHour) {
				 return Math.round(elapsed/msPerMinute) + ' min ago';   
			}
			
			else if (elapsed < msPerDay ) {
				 return Math.round(elapsed/msPerHour ) + ' hr ago';   
			}
		
			else if (elapsed < msPerMonth) {
				 return + Math.round(elapsed/msPerDay) + ' day ago';   
			}
			
			else if (elapsed < msPerYear) {
				 return  + Math.round(elapsed/msPerMonth) + ' months ago';   
			}
			
			else {
				 return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
			}
}
	$.getJSON("http://127.0.0.1/tum_old/custom/php/message.php",{id_from:id_from,id_to_send:id_to_send},function(
	response){
	
		//console.log(respose);
		var current= new Date();
		//var previous = new Date("2016-05-01 23:10:58")\
				var output ="";
				for(var i=0; i<response.length; i++){
					
					output +=' <li > ';
					 output += '<a href="#">';
					if(response[i].comm ===id_from+id_to_send){
					
						 output += " <h3>Me</h3>";
					
					 }else{
						 if(response[i].comm ===id_to_send+id_from ){
								 output += " <h3>Reply</h3>";
										
					 }}
								output +="<p>";
								output +=response[i].messg;
								output += "</p>";
								output += '<p class="ui-li-aside">';
								output +=timeDifference(current, new Date(response[i].time_sent));
								output += '</p>';
								 output +="</a>";
								output +="</li>";
							
					}
		
				$("#chatmessages").html(output);
				$("#chatmessages").listview('refresh');
				//console.log(output);
				});
		};
		chat = setInterval(me,2000);
		  
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
	   
//ADMIN  UPDATE SCHOOL
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
	
	$(document).on("pagehide","#admin_addsch", function(){
		
		$("#textinput").val("");
		$("#selectmenu").val("");
		$("#textarea").val("");
		
		});
	    
$(document).on('pageinit','#admin_addsch', function(){
	
	$("#admin_addsch_btn_save").on("tap", function(e){
		var schname = $("#textinput").val();
		var category = $("#selectmenu").val();
		var direc = $("#textarea").val();
			$.ajax({url: 'custom/php/saveadminschool.php',
                        data: {schname:schname,category:category,direc:direc},
                        type: 'post',                   
                        async: 'true',
                        dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							
                        },
                        complete: function() {
                            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$("#text_user_message").val("");
                        },
                        success: function (result) {
                           console.log(result);
							
							return false;
                        },
                        error: function (error) {                
                            console.log(error);
							return false;
                        }
                    }); 
		
		});
	//var admin_addsch_form;
	
	});		
   
   //admin users
   $(document).on("pageinit","#adminusers", function(){
	   $('#user_state_0').on("click", function(){
		   	 $.getJSON("http://127.0.0.1/tum_old/custom/php/showusers.php",
					function(data){
						var users = "";
						for(var i=0; i<data.length; i++){
							users +="<li>";
								users +="<a href ='#'>";
								users += "<h3>"+data[i].username +"</h3>";
								users += "<p class='ui-li-aside'>" +data[i].user+"</p>";	
								users +="</a>";
								users +="<a href ='#'>";
								users +="</a>";
							users +="</li>";
							
						}
						$("#admin_users_listview").html(users);
						$("#admin_users_listview").listview('refresh');
					});
		   });
		   $('#user_state_1').on("click", function(){
		   	 $.getJSON("http://127.0.0.1/tum_old/custom/php/showusers.php",
					function(data){
						
						var users = "";
						for(var i=0; i<data.length; i++){
							if(data[i].active ==0 ){
							users +="<li>";
								users +="<a href ='#'>";
								users += "<h3>"+data[i].username +"</h3>";	
								users += "<p class='ui-li-aside'>" +data[i].user+"</p>";	
								users +="</a>";
								users +="<a href ='#'>";
								users +="</a>";
							users +="</li>";
							}
						}
						$("#admin_users_listview").html(users);
						$("#admin_users_listview").listview('refresh');
					});
		   });
		   
		   	   $('#user_state_2').on("click", function(){
		   	 $.getJSON("http://127.0.0.1/tum_old/custom/php/showusers.php",
					function(data){
						
						var users = "";
						for(var i=0; i<data.length; i++){
							if(data[i].active ==1 ){
							users +="<li>";
								users +="<a href ='#'>";
								users += "<h3>"+data[i].username +"</h3>";	
								users += "<p class='ui-li-aside'>" +data[i].user+"</p>";	
								users +="</a>";
								users +="<a href ='#'>";
								users +="</a>";
							users +="</li>";
							}
						}
						$("#admin_users_listview").html(users);
						$("#admin_users_listview").listview('refresh');
					});
		   });
	});
		
   $(document).on("pageshow","#adminusers", function(e){
		e.preventDefault();
		
	 $.getJSON("http://127.0.0.1/tum_old/custom/php/showusers.php",
		function(data){
			var users = "";
			for(var i=0; i<data.length; i++){
				users +="<li>";
					users +="<a href ='#'>";
					users += "<h3>"+data[i].username+"</h3>";	
					users += "<p class='ui-li-aside'>" +data[i].user+"</p>";	
					users +="</a>";
					users +="<a href ='#'>";
					users +="</a>";
				users +="</li>";
				
			}
			$("#admin_users_listview").html(users);
			$("#admin_users_listview").listview('refresh');
		});

   });
   
//admin_profile
   $(document).on('pageinit', "#admn_profile", function(e){
	   console.log(e);
	  $('#click').click(function(e){
		  
		console.log(e);
	     
	  });
	    
   });
   $(document).on('pageshow', "#admn_profile", function(e){
	 e.preventDefault();
	 var id=localStorage.loggedin_id;
	 
	 $.getJSON(
	 "http://127.0.0.1/tum_old/custom/php/loggedinuser.php",{id:id},function(response){
		 
		 var fname=  response.firstname;
		  $("#admin_profile_fname").html(fname);
		 $("#admin_profile_secname").html(response.secname);
		 $("#admin_profile_username").html(response.username);
		 $("#admin_profile_email").html(response.email);
		
	 });
	    
   });
   
   $(document).on("pageshow", '#updateprofile', function(){
	   var id=localStorage.loggedin_id;
	 $.getJSON(
	 "http://127.0.0.1/tum_old/custom/php/loggedinuser.php",{id:id},function(response){
		$("#updateinfo_username").val(response.username);
		  $("#updateinfo_fname").val( response.firstname);
		 $("#updateinfo_lname").val(response.secname);
		 $("#updateinfo_email").val(response.email);
		
	 });
	   
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



//HEAD TEACHER

$(document).on('pageinit','#hteacher_loggedin_sch', function(){

	var id=localStorage.loggedin_id;
	$.getJSON("http://127.0.0.1/tum_old/custom/php/showhteacher_school.php",{id:id},function(data){
	localStorage.setItem('hteacher_school_id', data.school_id); //school id associated with the loggedin h teacher
		//localStorage.setItem('hteacher_school_name', data.school_name);
		$("#hteacher_schoolinfo_name").html(data.school_name);
		$("#hteacher_schoolinfo_cate").html(data.category);	
		$("#hteacher_school_location").html(data.loca_description);	
		$("#hteacher_schoolinfo_website").html(data.website);	
		});
		
	});
	
	
	//ADD RESULTS ON PAGEINIT	
	$(document).on("pageinit", "#hteacher_add_result", function(e){
		console.log(e);
		
		var schid=localStorage.hteacher_school_id; //ID OF THE SCHOOL BASED ON THE HTEACHERID (LOCALSTORAGE)
		
		$("#hteach_add_res_save").click(function(e){
			var year = $("#yearpicker").val();
			var stdno = $("#hteach_add_res_stdno").val();
			var resmean = $("#hteach_add_res_mean").val();
			var perf = $("#hteach_add_res_perf").val();
			
				$.ajax({url: 'custom/php/savekcseresults.php',
                        data: {year:year, stdno:stdno,resmean:resmean,perf:perf,schid:schid},
                        type: 'post',                   
                        async: 'true',
                        //dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$("#hteach_add_res_stdno").val("");
							$("#hteach_add_res_mean").val("");
							$("#hteach_add_res_perf").val("");
							
                        },
                        success: function (result) {
                           console.log(result);
						$.mobile.changePage("#hteacher_loggedin_results");	
							return false;
                        },
                        error: function (error) {
                            // This callback function will trigger on unsuccessful action                
                            console.log(error);
							return false;
                        }
                    });
				
		});	
		
	});
		
	//ADD YEAR ON PAGE SHOW
	$(document).on("pageshow", "#hteacher_add_result", function(){
		for (i = new Date().getFullYear(); i > 1900; i--)
		{
			$('#yearpicker').append($('<option />').val(i).html(i));
		}
		
	});
	
	
$(document).on("pageshow", "#hteacher_update_sch_info", function(){
		var id=localStorage.loggedin_id;
	$.getJSON("http://127.0.0.1/tum_old/custom/php/showhteacher_school.php",{id:id},function(data){
		$("#txt_hteach_schname").val(data.school_name);
		$("#txt_hteach_schlocation").val(data.loca_description);	
		$("#txt_hteach_schwebsite").val(data.website);	
		$("#hteacher_update_sch_header").html(data.school_name);
		});	
		
			
});

$(document).on("pageshow", "#hteacher_loggedin_results", function(){
	 var hteach_schid=localStorage.hteacher_school_id; 
	 console.log(hteach_schid);
   $.getJSON('custom/php/showhteacherresults.php',{hteach_schid:hteach_schid},
   function(data){
	   //console.log(data);
		if(data.length !== 0){
            var output = "";
                for(var i=0; i<data.length; i++){
                     output += "<li class ='edit'>";	  
                    		
					output += '<a href ="#" id=' + data[i].id +'>';
                     output += '<h3> Year: '+data[i].year+'</h3>';
                     output +='<p>Total Students:'+ data[i].total_students+'<br><br>';
					 output += '<b>('+data[i].performance+')</b>';
					 output +='</p>';
                     output += '<span class="ui-li-count">'+data[i].mean_score+'</span>';
                    output +='<p class="ui-li-aside">Mean score</p>';
			
					 output += '</a>';
					output += "<a href='#'id="+data[i].id+" class ='hteacher_res_edit'> </a>";
                    
                    
                     output += "</li>";
                    }
            $("#hteach_results").html(output);
            $("#hteach_results").listview('refresh');
            }
        else
        {
         $("#hteach_results").html('<b>No Results have been added yet</b>');
         
		}
   });
	
	});
	
//--RESULTS PAGE PAGE INIT-->
$(document).on("pageinit", "#hteacher_loggedin_results",function(){
			
		$("#hteach_results").delegate('.hteacher_res_edit', 'tap', function(e){
		e.preventDefault();
		var id = $(this).attr('id');
		 localStorage.setItem("hteacheres_id_update",id); 
			 
		$('#hteacher_res_updel').popup( "open" );
			
		});
 });
	
//HEAD TEACHER UPDATE RESULTS

$(document).on("pageshow","#update_hteacher_result", function(){
	
	for (i = new Date().getFullYear(); i > 1900; i--)
		{
			$('#update_yearpicker').append($('<option />').val(i).html(i));
		}
		
	var id	= localStorage.hteacheres_id_update;// set at pageinit #hteacher_loggedin_results
		$.getJSON("http://127.0.0.1/tum_old/custom/php/headteacherupdateres.php",{id:id},function(data){
		if(data.length>1){
			alert('error processing the request');
			$.mobile.changePage('#hteacher_loggedin_results');
			}else{
			$("#update_hteach_add_res_stdno").val(data.total_students);
			$("#update_hteach_res_mean").val(data.mean_score);
			$("#update_hteach_res_perf").val(data.performance);
		}
		
		});	
	
	});


//HEADTEACHER UPDATE BTN CLICK
$(document).on("pageinit","#update_hteacher_result", function(){
	
	$("#update_hteach_res_save").click(function(e){
			var id = localStorage.hteacheres_id_update;
			var year  = $("#update_yearpicker").val();
		    var stdno = $("#update_hteach_add_res_stdno").val();
			var mean  = $("#update_hteach_res_mean").val();
			var perf  =$("#update_hteach_res_perf").val();
			
			$.ajax({url: 'custom/php/updatekcseresults.php',
                        data: {id:id,year:year,stdno:stdno,mean:mean, perf:perf },
                        type: 'post',                   
                        async: 'true',
                        //dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$("#update_hteach_add_res_stdno").val("");
							$("#update_hteach_res_mean").val("");
							$("#update_hteach_res_perf").val("");
                        },
                        success: function (result) {
                           console.log(result);
							$.mobile.changePage("#hteacher_loggedin_results");
							return false;
                        },
                        error: function (error) {
                            // This callback function will trigger on unsuccessful action                
                            console.log(error);
							return false;
                        }
                    }); 
		
		});
	
	});

//PAGE HIDE UPDATE RESULTS HEAD TEACHER
$(document).on("pagehide","#update_hteacher_result", function(){
	
	$("#update_hteach_add_res_stdno").val("");
	$("#update_hteach_res_mean").val("");
	$("#update_hteach_res_perf").val("");
	
	});
	
$(document).on("pageshow", "#hteacher_loggedin_adm", function(e){
	
	var id = localStorage.hteacher_school_id;
	$.getJSON("http://127.0.0.1/tum_old/custom/php/get_hteacher_admreq.php" ,{id:id}, function(data){
		
		var output="";
		for(var i=0;i<data.length;i++){
	
			output +="<li>";
			output += "<a >";
			output += data[i].requirement;
			if(data[i].no ==0 ){
				output +="";
				}else{
					output +="<span class='ui-li-count'>";
					output +=data[i].no;
					output +="</span>";
					}
			output += "</a>";
				output += "<a id="+ data[i].id+" class='requirement_edit'>";
					
				output += "</a>";
			output +="</li>";
			}
		
		$("#hteacher_admissionreq").html(output);
		$("#hteacher_admissionreq").listview("refresh");
		});
		
		
		
	//LINK CLICK TO UPDATE
	$('#hteacher_admissionreq').delegate('.requirement_edit', 'click', function (e) {
		
		var id = $(this).attr('id');
		localStorage.setItem("hteacherequmts_update_link_id", id);
		console.log(id);
		});
	
		
	});
	
	
	//ADDING REQUIREMENTS PAGE
	$(document).on("pageinit", "#hteacher_add_requirments", function(){
		
		$("#save_hteacher_requir_add").click(function(e){
			e.preventDefault();
			var id = localStorage.hteacher_school_id;
			var item = $("#hteacher_item_add").val();
			var value = $("#hteacher_val_add").val();
	
			$.ajax({url: 'custom/php/save_hteacher_admreq.php',
                        data: {item:item,value:value, id :id  },
                        type: 'post',                   
                        async: 'true',
                        //dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$("#hteacher_item_add").val("");
							 $("#hteacher_val_add").val("")
                        },
                        success: function (result) {
                           console.log(result);
						$.mobile.changePage("#hteacher_loggedin_adm");
							return false;
                        },
                        error: function (error) {
                            // This callback function will trigger on unsuccessful action                
                            console.log(error);
							return false;
                        }
                    });}); 
		});


// PAGE SHOW HTEACHER REQUEST	
$(document).on("pageshow", "#hteacher_request", function(){

function timeDifference(current, previous) {
			var msPerMinute = 60 * 1000;
			var msPerHour = msPerMinute * 60;
			var msPerDay = msPerHour * 24;
			var msPerMonth = msPerDay * 30;
			var msPerYear = msPerDay * 365;
			
			var elapsed = current - previous;
			
			if (elapsed < msPerMinute) {
				 return Math.round(elapsed/1000) + ' sec ago';   
			}
			
			else if (elapsed < msPerHour) {
				 return Math.round(elapsed/msPerMinute) + ' min ago';   
			}
			
			else if (elapsed < msPerDay ) {
				 return Math.round(elapsed/msPerHour ) + ' hr ago';   
			}
		
			else if (elapsed < msPerMonth) {
				 return + Math.round(elapsed/msPerDay) + ' day ago';   
			}
			
			else if (elapsed < msPerYear) {
				 return  + Math.round(elapsed/msPerMonth) + ' months ago';   
			}
			
			else {
				 return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
			}
}

var hteacher_id = localStorage.loggedin_id;
$.getJSON("http://127.0.0.1/tum_old/custom/php/getadminmsg.php",{hteacher_id:hteacher_id},
	function(response){
		console.log(response);
		var output = "";
		var current= new Date();
		for(var i=0; i<response.length; i++){
			
			output +=' <li > ';
							output += '<a href="#" id='+response[i].from_id+'>';
							output += " <h3>"+response[i].from_id_username+"</h3>";
								output += '<p class="ui-li-aside">';
								output +=timeDifference(current, new Date(response[i].time_sent));
								output += '</p>';
								 output +="</a>";
								output +="</li>";
			
		}

		$("#admin_messages").html(output);
		$("#hteach_chat_top").html("Click a user to reply the message");
		$("#admin_messages").listview('refresh');
		});
	});
	
	$(document).on("pageinit", "#hteacher_request", function(){
		
		$('#admin_messages').delegate('a', 'click', function () {
		var id = $(this).attr('id');
		localStorage.setItem("head_reply_msg_from", id);
		
			$.mobile.changePage("#hteacher_msg_reply");
		});
});
	
	
	$(document).on("pageinit","#hteacher_msg_reply", function(e){
		e.preventDefault();
		
		$("#btn_reply_msg").click(function(e){
				e.preventDefault();
			if($('#hteacher_msg_reply_msg').val().length>0){
				var id_from = localStorage.loggedin_id;
				var user_from = localStorage.loggedin_username; //set at login
				var id_to_send_msg = localStorage.head_reply_msg_from;
				var message = $("#hteacher_msg_reply_msg").val();
		
			$.ajax({url: 'custom/php/sendmessage.php',
                        data: {message:message,id_from:id_from,id_to_send_msg:id_to_send_msg,user_from:user_from},
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
							$("#hteacher_msg_reply_msg").val("");
                        },
                        success: function (result) {
                           console.log(result);
							
							return false;
                        },
                        error: function (error) {
                            // This callback function will trigger on unsuccessful action                
                            console.log(error);
							return false;
                        }
                    });    
			return false;
			}else{
				console.log('Enter the message to send');
				return false;
				
			}
		});
		});
	
	//PAGE SHOW MSG REPLY TIMER
	$(document).on("pageshow","#hteacher_msg_reply", function(){
			
		    var reply = function info_request(){
			var id_from = localStorage.loggedin_id;
			var id_to_send = localStorage.head_reply_msg_from;
		
			//var id_to_send = localStorage.user_schoolls_id;
			
function timeDifference(current, previous) {
			var msPerMinute = 60 * 1000;
			var msPerHour = msPerMinute * 60;
			var msPerDay = msPerHour * 24;
			var msPerMonth = msPerDay * 30;
			var msPerYear = msPerDay * 365;
			
			var elapsed = current - previous;
			
			if (elapsed < msPerMinute) {
				 return Math.round(elapsed/1000) + ' sec ago';   
			}
			
			else if (elapsed < msPerHour) {
				 return Math.round(elapsed/msPerMinute) + ' min ago';   
			}
			
			else if (elapsed < msPerDay ) {
				 return Math.round(elapsed/msPerHour ) + ' hr ago';   
			}
		
			else if (elapsed < msPerMonth) {
				 return + Math.round(elapsed/msPerDay) + ' day ago';   
			}
			
			else if (elapsed < msPerYear) {
				 return  + Math.round(elapsed/msPerMonth) + ' months ago';   
			}
			
			else {
				 return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
			}
}
	$.getJSON("http://127.0.0.1/tum_old/custom/php/message.php",{id_from:id_from,id_to_send:id_to_send},function(
	response){
	
		//console.log(respose);
		var current= new Date();
		//var previous = new Date("2016-05-01 23:10:58")\
				var output ="";
				for(var i=0; i<response.length; i++){
					
					output +=' <li > ';
					 output += '<a href="#">';
					if(response[i].comm ===id_from+id_to_send){
					
						 output += " <h3>Reply</h3>";
					
					 }else{
						 if(response[i].comm ===id_to_send+id_from ){
								 output += " <h3>Request</h3>";
										
					 }}
								output +="<p>";
								output +=response[i].messg;
								output += "</p>";
								output += '<p class="ui-li-aside">';
								output +=timeDifference(current, new Date(response[i].time_sent));
								output += '</p>';
								 output +="</a>";
								output +="</li>";
							
					}
		
				$("#hteacher_messages").html(output);
				$("#hteacher_messages").listview('refresh');
				});
		};

		
hreply = setInterval(reply,2000);

});	

//HEADTEACHER REPLY MESSAGE
$(document).on("pagebeforeshow","#hteacher_msg_reply", function(){
	$("#hteacher_messages").html("Please wait....");
	
	});
	
//HEAD TEACHER PAGE HIDES
$("#hteacher_msg_reply").bind("pagehide", function(){

	clearInterval(hreply);	
	localStorage.removeItem("head_reply_msg_from");
	});
	
	
	
	
$(document).on("pageshow","#user_schooladm", function(e){
		console.log(e);
			var id = localStorage.user_schoolls_id;
	$.getJSON("http://127.0.0.1/tum_old/custom/php/get_hteacher_admreq.php" ,{id:id}, function(data){
		var output="";
		for(var i=0;i<data.length;i++){
	
			output +="<li>";
			output += "<a >";
			output += data[i].requirement;
			if(data[i].no ==0 ){
				output +="";
				}else{
					output +="<span class='ui-li-count'>";
					output +=data[i].no;
					output +="</span>";
					}
			output += "</a>";
				
			output +="</li>";
			}
		
		$("#user_school_list").html(output);
		$("#user_school_list").listview("refresh");
		});
	});