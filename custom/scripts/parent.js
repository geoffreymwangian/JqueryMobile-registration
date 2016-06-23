$(document).ready(function(){
	$('.user_info_request' ).on("click", function(){
	$.mobile.changePage( "#user_requestmoreinfo_page" );
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
	$(document).on('pageinit', '#user_requestmoreinfo_page', function(){  
		
		
		
		
	});
});
