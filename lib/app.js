var imageKey="";
var dateKey="";
//var image_d;
// -----------------------------------------
$(function() {
    $("#lookup").click(function() {
        $.mobile.changePage("#lookup_page", {transition: "slide",});
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
	        var cname = retrieve.get("customername");
			var cnumber = retrieve.get("customernumber");
			var camount = retrieve.get("amountdue");
			var cdate = retrieve.get("duedate");
			var cdesc = retrieve.get("description");
			var cpic = retrieve.get("idbadge")
			console.log(cname);
			console.log(cpic);
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
	         alert('Customer number not recognised');
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
			navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			    destinationType: Camera.DestinationType.DATA_URL, saveToPhotoAlbum: true
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
			console.log(dateKey);
			Parse.initialize("XXX", "XXX");
		    var CustomerObject = Parse.Object.extend("CustomerObject");
		    var customerObject = new CustomerObject();
		      customerObject.save({customername: $('#new_customername').val(), customernumber: $('#new_customernumber').val(), amountdue: $('#new_customeramount').val(), duedate: (dateKey), description: $('#textarea').val(), /*idbadge: (imageKey)*/}, {
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