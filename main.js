const input=document.querySelector("input");
const Ipoutput=document.getElementById("ipaddress");
const address=document.getElementById("location");
const timezone=document.getElementById("timezone");
const isp=document.getElementById("isp");

var [Ipaddress,domain,email,lat,lng]=["","","",51.5, -0.09];
var map;

var custommarker = L.icon({
    iconurl:"images/icon-arrow.svg"
});

const ipregex = "((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))";
    const domainregex = "(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]"
    const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var isempty=true;



const enterip=()=>{
isempty=false;
// console.log(Ipaddress);
if (input.value.match(ipregex)) {
   Ipaddress=input.value;
  }else if(input.value.match(emailregex)){
    email=input.value;
  }else if (input.value.match(domainregex)) {
    domain=input.value;
  }
  else{
      isempty=true;
  }
}


var tileurl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';



const showmap=()=>{
let url="https://geo.ipify.org/api/v1?apiKey=at_37fLeSZGDpeJ6tarovlvtiE7MFpfP";
if(!isempty)
{
    console.log("working");
url=`https://geo.ipify.org/api/v1?apiKey=at_37fLeSZGDpeJ6tarovlvtiE7MFpfP&ipAddress=${Ipaddress}&domain=${domain}&email=${email}`;
}
fetch(url).then(res=>{
    res.json().then(data=>{
        Ipoutput.innerHTML=data.ip;
        address.innerHTML=data.location.country+", "+data.location.city;
        timezone.innerHTML="UTC "+data.location.timezone;
        isp.innerHTML=data.isp;
        lat=data.location.lat;
        lng=data.location.lng;
         setmap();
    })
});
}
const setmap=()=>{

    if (map != undefined) { map.remove(); }
        console.log(lat,lng)
        map = L.map('map').setView([lat,lng], 13);
        L.tileLayer(tileurl, {attribution}).addTo(map);
        L.marker([lat,lng]).addTo(map);
    }
    
    
showmap();
