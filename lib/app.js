var imageKey="";
var dateKey="";
var agentName="";
var smsNo="";
var objID="";
// -----------------------------------------
$(function() {
    $("#lookup").click(function() {
        $.mobile.changePage("#lookup_page", {transition: "slide",});
		$('#searchnumber').val("");   
    });        
});
// -----------------------------------------
$(function() {
    $("#create").click(function() {
        $.mobile.changePage("#create_page", {transition: "slide",});
    });        
});
// -----------------------------------------
$(function() {
    $("#quicklook").click(function() {
        $.mobile.changePage("#quicklook_page", {transition: "slide",});

		Parse.initialize("XXX", "XXX");
	    var CustomerObject = Parse.Object.extend("CustomerObject");
	    var retrieveAll = new Parse.Query(CustomerObject);
	    //retrieveAll.find("customernumber"); 
		retrieveAll.find({
	      success: function(results)
		  {
			for (i=0; i<results.length; i++)
			//console.log(results[1]);
			//console.log(results[1].id);
			//console.log(results[1].attributes['customernumber']);			
			document.getElementById('q_customername').innerHTML = (results[1].attributes['customername']);
			document.getElementById('q_customernumber').value = (results[1].attributes['customernumber']);
			document.getElementById('q_customeramount').value = (results[1].attributes['amountdue']);

			document.getElementById('q_customername_b').innerHTML = (results[2].attributes['customername']);
			document.getElementById('q_customernumber_b').value = (results[2].attributes['customernumber']);
			document.getElementById('q_customeramount_b').value = (results[2].attributes['amountdue']);



			}
		});

    });      

});
// -----------------------------------------
$(function() {
    $("#search").click(function() {

		Parse.initialize("XXX", "XXX");
	    var CustomerObject = Parse.Object.extend("CustomerObject");
	    var retrieve = new Parse.Query(CustomerObject);
	      retrieve.equalTo("customernumber", $('#searchnumber').val()); 

		  retrieve.first({
	      success: function(retrieve)
		  {
			var cnumber = retrieve.get("customernumber");			
	        var cname = retrieve.get("customername");
			var camount = retrieve.get("amountdue");
			var cdate = retrieve.get("duedate");
			var cdesc = retrieve.get("description");
			var cpic = retrieve.get("idbadge")
			objID = retrieve.id;
			console.log(objID);
			//console.log(cname);
			//console.log(cpic);
			document.getElementById('ex_customername').value = (cname);
			document.getElementById('ex_customernumber').value = (cnumber);
			document.getElementById('ex_customeramount').value = (camount);
			document.getElementById('ex_customerduedate').value = (cdate);
			document.getElementById('ex_description').innerHTML = (cdesc);
			document.getElementById('d_myImage').src = ("data:image/jpeg;base64," + cpic);
			$(".success").show();
			$.mobile.changePage("#details_page", {transition: "slide",});
	      },
	      error: function(model, error) {
	         alert('Connection error');
	      }
	    });
    });     
});
// -----------------------------------------

$(function() {
    $("#update").click(function() {
					Parse.initialize("XXX", "XXX");
				    var CustomerUpdate = Parse.Object.extend("CustomerObject");
				    var customerUpdate = new Parse.Query(CustomerUpdate);
					customerUpdate.get(objID, {
					success: function(cUp)
				  {
							cUp.set("customernumber", document.getElementById('ex_customernumber').value );			
					        cUp.set("customername", document.getElementById('ex_customername').value);
							cUp.set("amountdue", document.getElementById('ex_customeramount').value);
							cUp.set("duedate", document.getElementById('ex_customerduedate').value);
							cUp.set("description", document.getElementById('ex_description').innerHTML);
							cUp.save();
							//customerObject.save();
					        alert('Customer: ' + $('#ex_customername').val() + ' updated');
					  },
					  error: function(error) {
					    alert("Error");
					  }
					});
		});
	});
// -----------------------------------------


$(function() {
    $("#location").click(function() {
        $.mobile.changePage("#location_page", {transition: "slide",});
          

	var map = L.map('map');
	L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {maxZoom: 18}).addTo(map);

	function onLocationFound(e) {
		var radius = e.accuracy / 2;
		L.marker(e.latlng).addTo(map)
			.bindPopup("You are within " + radius + " meters from this point").openPopup();
		L.circle(e.latlng, radius).addTo(map);
	}
	function onLocationError(e) {
		alert(e.message);
	}
	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);
	map.locate({setView: true, maxZoom: 16});
	});

});
// -----------------------------------------

$(function() {
        $("#takePicture").click(function() {
            //navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
			navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
			    destinationType: Camera.DestinationType.DATA_URL, targetWidth: 100, targetHeight: 125, saveToPhotoAlbum: true,
			 }); 
			
			function onSuccess(imageData) {
			
			    var image = document.getElementById('myImage');
				image.src = "data:image/jpeg;base64," + imageData;
				var image_d = document.getElementById('d_myImage');
				image_d.src = "data:image/jpeg;base64," + imageData;
				imageKey = imageData;
				//console.log(imageKey);
			}

			function onFail(message) {
			    alert('Failed because: ' + message);
			}
    });        
});
// -----------------------------------------

$(function() {
        $("#save").click(function() {
			//console.log(imageKey);
			dateKey = $('#select-choice-month').val() + ' / ' + $('#select-choice-day').val()  + ' / ' + $('#select-choice-year').val();
			//console.log(dateKey);
			Parse.initialize("XXX", "XXX");
		    var CustomerObject = Parse.Object.extend("CustomerObject");
		    var customerObject = new CustomerObject();
		      customerObject.save({customername: $('#new_customername').val(), customernumber: $('#new_customernumber').val(), amountdue: $('#new_customeramount').val(), duedate: (dateKey), description: $('#textarea').val(), idbadge: (imageKey)}, {
				  success: function(object) {
			        alert('Customer: ' + $('#new_customername').val() + ' created');
					console.log("save tapped");
					//$(".success").show();
			      },
			      error: function(model, error) {
			        alert('Oops, Something went wrong');
					//$(".error").show();
			      }
			});
});
});
// -----------------------------------------

$(function() {
    $("#cancel_b").click(function() {
        $.mobile.changePage("#home_page", {transition: "flip",});
    });        
});
// -----------------------------------------
$(function() {
    $("#cancel_a").click(function() {
        $.mobile.changePage("#home_page", {transition: "flip",});
    });        
});
// -----------------------------------------
$(function() {
    $("#settings").click(function() {
        $.mobile.changePage("#options", {transition: "pop",});
    });        
})
$(function() {
    $("#check_in_no").click(function() {
		agentName = $('#save_agent').val();
        smsNo = $("#save_sms").val();
		alert('Defaults Saved');
		window.localStorage.setItem("a_key", agentName);
		window.localStorage.setItem("n_key", smsNo);
		$.mobile.changePage("#home_page", {transition: "pop",});
    });        
});
$(function() {
	$("#clear_cache").click(function() {
	window.localStorage.clear();
	$('#save_agent').val("");
	$('#save_sms').val("");  
	alert('Defaults cleared');
	$.mobile.changePage("#home_page", {transition: "pop",});
	//console.log(a_key);
	});
});
$(function() {
    $("#cancel_set").click(function() {
        $.mobile.changePage("#home_page", {transition: "pop",});
	});
});
// -----------------------------------------


$(function() {
    $("#checkin").click(function() {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	    function onSuccess(position) {
		window.localStorage.getItem("a_key", agentName);
		window.localStorage.getItem("n_key", smsNo);
		window.plugins.smsComposer.showSMSComposer(smsNo, agentName + ' Checking in at ' + position.timestamp + ' lat: '+ position.coords.latitude + ' long: '+ position.coords.latitude);
	}    
	function onError(error) {
	        alert('Unable to send location at this time');
	    }
});
});