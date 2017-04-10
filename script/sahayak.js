

console.log('Inside script: after include');
 	  var serviceurl ="resources/json/service.json";
	  var serviceproviderurl ="resources/json/serviceprovider.json";
	  var servicedataurl = "resources/json/servicedata-final.json";
	  
	  var services = null;
	  var serviceprovider = null;
	  var servicedata = null;
	  var modifiedservicedata = null;
	  
	  
//	  console.log('service script start');


//	console.log('service data :inside ready');
	
	$.getJSON(serviceurl,function(data){
//		console.log("Json from services", data);
		services = data;
	 });
	
	$.getJSON(serviceproviderurl,function(data){
//		console.log("Json from service provider", data);
		serviceprovider = data;
	 });
	
	 
	 $.getJSON(servicedataurl,function(data){
		console.log("Json from services", data);
		servicedata = data;
	 });
 


	$('#service').autocomplete({
    source: function (request, response) {
	$('#serviceprovider').val('');
		response($.map(services.servicelist,function(item){
//		console.log('inside services' +item);
		return {
			label : item.name
	//		value : item.id
		}
	}));
	},
	minLength: 2,
	delay: 100
	});

 	$('#service').on("autocompletechange", function(event, ui) 
	{
		$('#serviceprovider').val(' ');
		$('#location').val('');
		$('#locality').val('');
//		console.log('Service on change here.', ui.item.label);
		populateserviceprovider (getserviceprovider(serviceprovider.serviceprovider,ui.item.label));
		
	});

	$('#serviceprovider').on("autocompletechange", function(event, ui) 
	{
		$('#location').val(' ');
		$('#location').val('');
		$('#locality').val('');
		var selectedservice = $('#service').val();
//		console.log('Service on change here.', ui.item.label +" selected service ",selectedservice);
		populatelocation (getlocation(servicedata,selectedservice,ui.item.label));
		
	});
	
//	$('#location').on("autocompletechange", function(event, ui) 
	$('#location').on("autocompleteselect", function(event, ui)
	{
	//	$('#location').val(' ');
		$('#locality').val('');
		var selectedservice = $('#service').val();
		var selectedserviceprovider = $('#serviceprovider').val();
//		console.log('location on change here.', ui.item.label +" selected service ",selectedservice +" selected service provider ",selectedserviceprovider);
		
		populatelocality (getlocality(servicedata,selectedservice,selectedserviceprovider,ui.item.label));
		showservicedata(servicedata,selectedservice,selectedserviceprovider,ui.item.label);
		
		
		
	});
	
$('#locality').on("autocompleteselect", function(event, ui)
	{
	//	$('#location').val(' ');
	//	$('#locality').val('');
		var selectedservice = $('#service').val();
		var selectedserviceprovider = $('#serviceprovider').val();
		var selectedlocation = $('#location').val();
//		console.log('location on change here.', ui.item.label +" selected service ",selectedservice +" selected service provider ",selectedserviceprovider);
		showservicedatabylocation(servicedata,selectedservice,selectedserviceprovider,selectedlocation,ui.item.label);
	//	populatelocation (getlocation(servicedata,selectedservice,ui.item.label));
		
	});
	

function getserviceprovider (serviceproviders,selectedservice)
{
//	console.log("getserviceprovider ", +serviceproviders +" selectedservice ", selectedservice);
	var servicearray = [];
	$.each(serviceproviders,function (key,value) 
	{
		if($.inArray(selectedservice,value.service) !== -1)
		{	 
			servicearray.push(value.name);
		}
//	console.log('service array', servicearray);
	});
	return servicearray;
}

function getlocation (servicedata,selectedservice,selectedserviceprovider)
{
	var result=[] ;
//	var selectedservice = 'Yoga';
//	var selectedserviceprovider ='Art of Living';
//console.log("getlocation ", servicedata);
	$.each(servicedata.servicedata, 
        function(i,e)
		{
//			console.log("selected service " +selectedservice, +"Service in service data", e.service);
			if($.inArray(selectedservice, e.service) !== -1)
			{
//				console.log("selected service provider " +selectedserviceprovider, +"Serviceprovider in service data", e.serviceprovider);
				if($.inArray(selectedserviceprovider, e.serviceprovider) !==-1){
						
						if($.inArray(e.district,result)===-1) 
						{
//							console.log ("district " +e.district);
							result.push(e.district) ;
						}
				}
			}
			
		
		});
	return result;
}

function getlocality (servicedata,selectedservice,selectedserviceprovider,selectedlocation)
{
	var result=[] ;
//	var selectedservice = 'Yoga';
//	var selectedserviceprovider ='Art of Living';
//console.log("getlocality:selected location ", selectedlocation);
	$.each(servicedata.servicedata, 
        function(i,e)
		{
//			console.log("selected service " +selectedservice, +"Service in service data", e.service);
			if($.inArray(selectedservice, e.service) !== -1)
			{
//				console.log("selected service provider " +selectedserviceprovider, +"Serviceprovider in service data", e.serviceprovider);
				if($.inArray(selectedserviceprovider, e.serviceprovider) !==-1){
						
						if(selectedlocation == e.district) 
						{
//							console.log ("district " +e.district);
							if ($.inArray(e.locality,result)===-1)
							{
//								console.log ("locality " +e.locality);
								result.push(e.locality) ;
							}
						}
				
				}
			}
			
		
		});
	return result;
}



function populateserviceprovider (serviceprovider)
{
//	console.log('getserviceprovider..Insider');
	$('#serviceprovider').val(' ');
	$('#serviceprovider').autocomplete({
    source: function (request, response) {
	response($.map(serviceprovider,function(item){
//		console.log("Inside the array service " +item);
		return {
			label : item
		//	value :item.id
		}	
	 }));
	},
	minLength: 2,
	delay: 100
	 });
}

function populatelocation (servicedata)
{
//	console.log('populatelocation..Insider', servicedata);
	$('#location').val(' ');
	$('#location').autocomplete({
    source: function (request, response) {
	response($.map(servicedata,function(item){
//		console.log("Inside the array service " +item);
		return {
			label : item
		//	value :item.id
		}	
	 }));
	},
	minLength: 2,
	delay: 100
	 });
}

function populatelocality (servicedata)
{
//	console.log('populatelocation..Insider', servicedata);
	$('#locality').val(' ');
	$('#locality').autocomplete({
    source: function (request, response) {
	response($.map(servicedata,function(item){
//		console.log("Inside the array service " +item);
		return {
			label : item
		//	value :item.id
		}	
	 }));
	},
	minLength: 2,
	delay: 100
	 });
}


function showservicedata(servicedata,selectedservice,selectedserviceprovider,selectedlocation)
{
	//console.log("showservicedata");
	$('#output').text('');
	var cols = GetHeaders(servicedata);
//	console.log('getheaders ',cols);
	modifiedservicedata = getdisplaydata(servicedata,selectedservice,selectedserviceprovider,selectedlocation);
//	console.log('showservicedata #', modifiedservicedata);
	$('#output').html(CreateTable(modifiedservicedata, cols));
		console.log($('#output').html());
//	displaydetailinfo();
}

function showservicedatabylocation(servicedata,selectedservice,selectedserviceprovider,selectedlocation,selectedlocality)
{
	//console.log("showservicedata");
	var cols = GetHeaders(servicedata);
//	console.log('getheaders ',cols);
	modifiedservicedata = getdisplaydatabylocation(servicedata,selectedservice,selectedserviceprovider,selectedlocation,selectedlocality);
//	console.log('showservicedata #', modifiedservicedata);
	$('#output').html(CreateTable(modifiedservicedata, cols));	
}



//$("#locality").easyAutocomplete(options1);


	function GetHeaders(servicedata) {
        var cols = new Array();
       var p = servicedata.servicedata[0];
	//	var p = obj;
        for (var key in p) {
		if ((key == "district") || (key=="taluk") || (key=="locality") || (key=="contact"))
			{
  //          console.log(' name=' + key + ' value=' + p[key]);
				cols.push(key);
			}
        }
        return cols;
    }
	
	function CreateTable(obj, cols) {
	//console.log('Inside create table');
	//        var table = $('<table id="datatable" class="table table-bordered table-condensed table-striped"></table>');
	        var table = $('<table id="datatable" class="table table-bordered"></table>');
			
			tablehead = $('<thead></thead>').appendTo(table);
		        var th = $('<tr></tr>').appendTo(tablehead);
				
        for (var i = 0; i < cols.length; i++) {
		
				
				th.append('<th>' + cols[i] + '</th>');
			
        }
				

	console.log('table header' +table);	
	
	var tablebody = $('<tbody class="member"></tbody>');
   table.append(tablebody);
	
	

        for (var j = 0; j < obj.length; j++) {
           var player = obj[j];
//		   var tablebody = $('<tbody></tbody>');
//		   table.append(tablebody);
            var tr = $('<tr class="table-row" id="'+player["code"]+'"></tr>');
            for (var k = 0; k < cols.length; k++) {
                var columnName = cols[k];
//				console.log(columnName);
				if ((columnName == "district") || (columnName=="taluk") || (columnName=="locality") || (columnName=="contact"))
                tr.append('<td>' + player[columnName] + '</td>');
            }
            table.append(tr);
        } 
        console.log('with data ', table);
		return table;
    }


function getdisplaydata (servicedata,selectedservice,selectedserviceprovider,selectedlocation)
{
//	console.log('getdisplaydata');
	servicedata = $.grep(servicedata.servicedata,function (value,i) 
	{
//		console.log('getdisplaydata:selected service #',value.service);
		return ($.inArray(selectedservice, value.service) !== -1 && $.inArray(selectedserviceprovider, value.serviceprovider) !== -1 && selectedlocation== value.district);
	});
//	console.log('getdisplay:Servicedata: ', servicedata);
	return servicedata;
	
}

	
function getdisplaydatabylocation (servicedata,selectedservice,selectedserviceprovider,selectedlocation,selectedlocality)
{
//	console.log('getdisplaydatabylocation');
	servicedata = $.grep(servicedata.servicedata,function (value,i) 
	{
//		console.log('getdisplaydatabylocation:selected service #',value.service);
		return ($.inArray(selectedservice, value.service) !== -1 && $.inArray(selectedserviceprovider, value.serviceprovider) !== -1 && selectedlocation== value.district && selectedlocality== value.locality);
	});
//	console.log('getdisplaydatabylocation:Servicedata: ', servicedata);
	return servicedata;
	
}



$('body').on('click','tr',function () {
	var centerdata=null;	
//	alert('Why have you clicked me');
	 console.log('You have clicked this row:identify me',this.id);	
	 $(this).addClass('selected').siblings().removeClass("selected");
	 centerdata = getcenterdata(this.id);
	 displaycenterdata(centerdata);
});

function getcenterdata(id){
var rowdata = null;
console.log('my id is:servicedata ', id,'service data',servicedata);
rowdata = $.grep(servicedata.servicedata,function (value,i) 
	{
		console.log('getid #',(value.code == id));
		return value.code == id;
	});
return rowdata;
}


function displaycenterdata(centerdata)
{
 console.log('displaycenterdata',centerdata);
 var displayinfo = null;
 var table = $('<table id="datatable" class="table table-bordered table-condensed table-striped table-hover"></table>');
	
	tablehead = $('<thead></thead>').appendTo(table);
		        var th = $('<tr><th colspan="2" text-align="center">Center Information</th></tr>').appendTo(tablehead);
				
       

//	console.log('table header' +table);	
	
	var tablebody = $('<tbody></tbody>');
   table.append(tablebody);
	
	
	var centercode = null;
	var latvalue =null;
	var lngvalue=null;
	
	$.each (centerdata,function(key,value)
	{
		$.each(this,function(key,value){
			console.log(key,' ## ',value)
			if (key =="code"){
				centercode = value;
			}
			
			if (key =="longitude"){
				lngvalue = value;
			}
			
			if (key =="latitude"){
				latvalue = value;
			}
			
			
			if (key == "address" || key=="timingsfrom" || key=="timingsto")
			{
			//	var datarow = $('<tr><td></td></tr>').appendTo(table);
				var datarow = $('<tr></tr>').appendTo(table);
				$('<td align="center">'+key+'</td><td align="center">'+value+'</td>').appendTo(datarow);				
			}			
		});
	});
	
	
	
//	var googlemap = $('<tr id="mapid">Google map</tr>').appendTo(table);

	 
 $('#detailinfo').html(table);
 console.log("which row is clicked",centerdata.code);
 initMap(centercode,latvalue,lngvalue);
       
} 


function initMap(code,latvalue,lngvalue) {
console.log("init map:code:parse :which is first:Float",code," latvalue ##",latvalue," lngvalue ##",lngvalue);
  //      var uluru = {lat: parseInt(latvalue), lng: parseInt(lngvalue)};
  var uluru = {lat: parseFloat(latvalue), lng: parseFloat(lngvalue)};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
		
		
		
		var myImage = 'img/yoga.png';

        var marker = new google.maps.Marker({
          position: uluru,
          map: map,
		  icon: myImage
        });
		
		
		marker.addListener('click', function() {
    window.open("info.html?code="+code);
		
		
		
		
      
	  });
}
 

 



	
	
