<?php  
	header('Content-Type: text/javascript;'); 
?>

$(document).ready(function() {

   $(".back_to_schoolsbtn").click(function(e){
		e.preventDefault();
		var id = "schoolid";
     
     	$.ajax({
				type: 'POST',
				url: "custom/php/destroysession.php",
				data:({id:id}),
				
			success: function(data){ 
             $.mobile.changePage('#schoolpage');
          },
		
			error: function(){  //on error
					
				
			}
			
			}); //ajax post
     
	});	
    
  

	function setSession(var1, id){
		
		      $.ajax({
                        type: 'POST',
                        url: "custom/php/setsession.php",
                        data:({id:id, var1:var1}),
                        
                success: function(data){            
                   
                    },
                    
                error: function(){ 		
                  
                }
                    
       }); 
	
	}<!-- Set sesions-->

$('#schools_list').delegate('a', 'click', function () {
    var id = $(this).attr('id');
    setSession('schoolid', id);
    $.mobile.changePage("#schoolinfopage");

   });
   

$(document).on("pageshow","#schoolpage", function(){ // When entering pagetwo
  $.mobile.loading('show');
	$.get(
		"http://127.0.0.1/tum_old/custom/php/showschools.php",
          function(data){
           $.mobile.loading('hide');
                   $("#schools_list").html(data);
         $("#schools_list").listview('refresh');
   
         }); 
         
   
}); <!-- schoolpage End-->

  $(document).on('pageshow', "#schoolperformance",function () {
	
	//get data and create a listview
   $.getJSON('custom/php/showresults.php',
   function(data){
	    var obj = {data};
        var dataobj = obj.data.length;
		
        if(dataobj != 0){
            var output = "";
                for(var i=0; i<data.length;i++){
                     output += '<li>';	  
                    output += '<a href ="#" id=' + obj.data[i].id +'>';
                     output += '<h3>'+obj.data[i].year+'</h3>'
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
         $("#resyults_content").html('<b>Sorry the results are awaiting moderation</b>');
         
		}
   });
   
   //on click of the listview item
   $('#resyults_content').delegate('a', 'tap', function () {
	   var id =$(this).attr('id');
	   $.mobile.changePage('#specific_result');
	 });

});  <!-- On show school performance page-->


$(document).on("pageshow","#schooladm", function(){ // When entering pagetwo

	$.ajax({
				type: 'POST',
				url: "custom/php/showadmission.php",
				
			success: function(data){
				
			var result_year = {data};
			
            console.log(result_year);
			
			$("#newadmreq").html(data);
          },
		
			error: function(){  //on error
				
			}
			
			}); 
		

});    <!-- On show School admission requirements page-->

$(document).on("pageshow","#schoolinfopage", function(){

    $.getJSON('custom/php/showinfo.php',
        function(data){
            var obj = {data};
            
            console.log(obj);
            $("#new_schoolinfo_name").html(obj.data.school_name );
           $("#new_schoolinfo_page").html(obj.data.category + " school");
           $("#schoolinfo_location").html(obj.data.loca_description);
             $("#headerschoolinfo").html(obj.data.school_name)
        });        

   });    <!-- On show school info page-->
	
$('#loginbtn').on('tap', function(){
	
    var username = $('#username_login').val();
    var password = $('#password_login').val();
    
    if(username =="" )
    {
    	$('#failedmessage').html('Failed');
        $('#pop_up_message').html('username cannot be empty');
        $( "#mwangian" ).popup( "open" );
    }else
    {
    if(password =="" ){
  		 $('#failedmessage').html('Failed');
        $('#pop_up_message').html('password cannot be empty');
        $( "#mwangian" ).popup( "open" );
    }
    else{
    
    handlelogin();
    	 
    }
    }
   
});
$( window ).on( "navigate", function() {
  console.log( "navigated!" );
});

function handlelogin(){
      $.ajax({
        type: 'POST',
        url: 'custom/php/login.php',
        data: $('form#login_form').serialize(),
   success: function(data){

       if(data == 1){
        
         $('#failedmessage').html('Incorrect');
         $('#pop_up_message').html('Username and password');
          $( "#mwangian" ).popup( "open" );
        
       }else
       {
       if(data == 2){
       $.mobile.changePage("#adm");
       }
       else{
           if(data == 3){
        $.mobile.changePage("#hteacher");
           
       }else{
   
      $.mobile.changePage("parentsloggedin.html");
   
       }
       } }
       
       }
       
 });
}


   //ADMINISTRATOR
$(document).on("pageshow","#adm", function(){
	
    //add btn click
    $('#admin_add_school_btn').on('tap', function(){
    $.mobile.changePage('#admin_add_school');
    
    });
});// admin functions end



   //PARENT
$(document).on("pageshow","#parent", function(){
  $.mobile.loading('show');
	alert('shown page');
 $.mobile.loading('hide');
});


});