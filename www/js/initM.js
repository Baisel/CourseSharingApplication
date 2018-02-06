function Rodn(){
    de=location.search;
    idd=de.split("=");
    var url='msev/'+idd[1]+'/date'; 
    var url1='msev/'+idd[1]+'/title'
    var url2='msev/'+idd[1]+'/description'
   
    firebase.database();
    var commentsRef = firebase.database().ref(url1)
    commentsRef.on('value', function(snapshot) {
         titlss =snapshot.val();
         document.getElementById('title').textContent=titlss;
        
        });   
        var commentsRef = firebase.database().ref(url2)
    commentsRef.on('value', function(snapshot) {
        description =snapshot.val();
        document.getElementById('description').textContent=description;
          
        });   
    var commentsRef = firebase.database().ref(url)
    commentsRef.on('value', function(snapshot) {
         msg =snapshot.val();
          points = JSON.parse(msg); 
         

         initMap();
        });   
}

function initMap() {
   var map = new google.maps.Map(document.getElementById("map"), {
       center: new google.maps.LatLng(35.681298, 139.766247), 
       zoom: 15 
       
   });

   var d = new google.maps.DirectionsService(); 
   var origin = null, waypoints = [], dest = null; 
   var resultMap = {}; 
   var requestIndex = 0; 
   var done = 0; 
   for (var i = 0, len = points.length; i < len; i++) {
       if (origin == null) {
           origin = points[i];
       }
       else if (waypoints.length == 8 || i == len - 1) {
           dest = points[i];

           (function(index){
               var request = {
                   origin: origin, 
                   destination: dest, 
                   waypoints: waypoints, 
                   travelMode: google.maps.DirectionsTravelMode.WALKING, 
               };
               console.log(request);
               
               d.route(request, function(result, status){
                   if (status == google.maps.DirectionsStatus.OK) {
                       resultMap[index] = result; 
                       done++;
                   }
                   else {
                       console.log(status); 
                   }
               });
           })(requestIndex);

           requestIndex++;
           origin = points[i]; 
           waypoints = [];
       }
       else {
           waypoints.push({ location: points[i], stopover: true });
       }
   }
   
   var infoWindow = new google.maps.InfoWindow();
   var mark = function(position, content) {
       var marker = new google.maps.Marker({
           map: map, 
           position: position 
       });

   };

   var sid = setInterval(function(){
       
    if (requestIndex > done) return;
       clearInterval(sid);

       
              var path = [];
       var result;
       for (var i = 0, len = requestIndex; i < len; i++) {
           result = resultMap[i]; 
           var legs = result.routes[0].legs; 
           for (var li = 0, llen = legs.length; li < llen; li++) {
               var leg = legs[li]; 
               var steps = leg.steps; 
               var _path = steps.map(function(step){ return step.path })
                   .reduce(function(all, paths){ return all.concat(paths) });
               path = path.concat(_path);

               mark(leg.start_location, leg.start_address);
           }
       }
       
       var endLeg = result.routes[0].legs[result.routes[0].legs.length-1];
       mark(endLeg.end_location, endLeg.end_address);

       var line = new google.maps.Polyline({
           map: map, 
           strokeColor: "#2196f3", 
                  strokeOpacity: 0.8, 
                 strokeWeight: 6, 
           path: path 
       });
  }, 1000);

}