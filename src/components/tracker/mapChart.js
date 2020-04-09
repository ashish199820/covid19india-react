import React,{useState, useEffect,useRef} from 'react';
import { Map, Marker, Popup, TileLayer,Circle,CircleMarker,withLeaflet} from "react-leaflet";
import {ReactComponent as RedIcon} from './red.svg'
import L, { marker } from 'leaflet';
import Search from './search'
import './corona.svg'
import RoutingMachine from './routing'
import 'leaflet/dist/leaflet.css'
var research = require('../../hospital.json')

//import greenLogo from './green.svg'
//import redLogo from './red.svg'
const greenIcon = new  L.Icon({
  iconUrl:require('./green.svg'),
  iconRetinaUrl: require('./green.svg'),
  iconSize:[18,18],
  });

const redIcon = new L.Icon({
  iconUrl:require('./red.svg'),
  iconRetinaUrl: require('./red.svg'),
  iconSize:[18,18],
  });

 function MapChart(props) {
const [activeList,setActiveList]= useState(null);
const [direction,setDirection]=useState(null)
const [click,setClick]=useState(false);

  const refs = research.items.reduce((acc, value) => 
   { acc[value.id] = React.createRef();
    return acc;
  }, {});
      
useEffect(()=>{
  console.log('component updated')
})
const markerToList=(id)=>{
refs[id].current.scrollIntoView({block:'center', behavior: 'smooth'})
setActiveList(id)
}

const directionHandler=(location)=>{
window.scrollTo({
  top:0
})
if(props.currentLocation==null)
  alert('Enter your location via gps or search box')
setDirection(location)
console.log('location',direction,props.currentLocation)

}
const clearRouteHandler=()=>{
  
  console.log('[inside clear route handler]')
  setDirection(null)
}

const getBounds=(e)=>{

  console.log('inside getBound',e);
}

  return (
    <div className="map-container">
      <div >
    <Map  className="leaflet-container "   onmoveend={(e)=>getBounds(e)}
       center={props.currentLocation||props.pinLocation||[28.7041,77.1025]} zoom={props.radius?(props.radius>6?10:11):11} >
      <TileLayer
        detectRetina={true}
        maxNativeZoom="17"
        maxZoom={17}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright"></a> '
      />

       {research.items.map((item)=>{
         return(<Marker key ={item.id} 
          icon={item.catid=='15'?greenIcon:redIcon} position={[item.lat,item.lng]}
           onclick={()=>markerToList(item.id)} >
         
      </Marker>)
       })}
       
      {props.pLocation?( <Circle center={props.pLocation} fillColor="blue" color="red" radius={props.cases>'50'?10000:6000}>
      <Popup autoPan><h5>{props.cases} cases present in this area.</h5></Popup>
          </Circle>):null}
        
     <Search  search={props.searchMap}/>

    <RoutingMachine
          color="#345"
          road={(props.currentLocation&&direction)?[props.currentLocation,direction]:[]}
       />}
         
    </Map>
    <div style={{display:'flex'}}>
      <span><img height='15px' width='15px' src={require('./green.svg')}/>:GOVT</span>
      <span><img height='15px' width='15px' src={require('./red.svg')}/>:PRIVATE</span>
      <span className="button" onClick={clearRouteHandler}>clear route</span>
      </div>
    </div>
     
     <div className="tracker_hospital" >
     {  research.items.map(item=>{
  return (
    <div className={item.id===activeList?'row highlighted':'row'} ref={refs[item.id]} > 
    <div onClick={()=>markerToList(item.id)}>{item.city}</div>
    <div onClick={()=>markerToList(item.id)}>{item.cutDescription}</div>
    <div><button className="button"  onClick={()=>directionHandler([item.lat,item.lng])}>Direction</button></div>
     </div>
  )
 })
}
  </div>
    </div>
   
  );
}
export default  MapChart;  