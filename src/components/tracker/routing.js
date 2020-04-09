import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import React ,{useState} from 'react'
import { withLeaflet } from 'react-leaflet';
import 'leaflet-routing-machine/src';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
//const portalRoot = document.getElementById("control")
let leafletElement = null;
class RoutingMachine extends MapLayer {



  shouldComponentUpdate(){
    console.log('should component update',this.props.road);
    return true;
  }
  createLeafletElement() {
    console.log('inside leaflet element')
    const color = this.props.color;
  //  const road = this.props.road;
    const map =this.props.leaflet.map;
   
    console.log('map',map)
    console.log("Route computation: ")
    
    leafletElement = L.Routing.control({
      
      waypoints:[],
      router: L.Routing.mapbox('pk.eyJ1IjoibHVpZ2kwMjI5IiwiYSI6ImNqNnhseGNsczFyb2Eyd3Bkbmp4cW5jbzAifQ.auFCa3NZcIgFS20o8QreNw'),
      lineOptions: {
        styles: [{ 
          color, 
          opacity: 1,
          weight: 6 
        }]
      },
    //   collapseBtn(){
    //      
    //   },
    containerClassName:'tracker-map',
      collapsible:true,
      addWaypoints: true,
      draggableWaypoints: true,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      altLineOptions: { styles: [{opacity: 1}] },
      //createMarker: () => { return null; }
    })
    .addTo(map); ///table tbody td
    
     leafletElement.setWaypoints([L.latLng(this.props.road[0]),L.latLng(this.props.road[1])]);
    leafletElement.getContainer().style.maxWidth='150px';
     leafletElement.hide(); // hide road describtion
    return leafletElement.getPlan();
  }

  updateLeafletElement(){
    console.log('inside leaflet element')
    const color = this.props.color;
  //  const road = this.props.road;
    const map =this.props.leaflet.map;
   
    console.log('map',map)
    console.log("Route computation: ")
    //map.removeControl(L.routing.control())
    // let leafletElement = L.Routing.control({
      
    //   waypoints:[],
    //   router: L.Routing.mapbox('pk.eyJ1IjoibHVpZ2kwMjI5IiwiYSI6ImNqNnhseGNsczFyb2Eyd3Bkbmp4cW5jbzAifQ.auFCa3NZcIgFS20o8QreNw'),
    //   lineOptions: {
    //     styles: [{ 
    //       color, 
    //       opacity: 1,
    //       weight: 6 
    //     }]
    //   },
    // //   collapseBtn(){
    // //      
    // //   },
    // containerClassName:'tracker-map',
    //   collapsible:true,
    //   addWaypoints: true,
    //   draggableWaypoints: true,
    //   routeWhileDragging: false,
    //   fitSelectedRoutes: true,
    //   showAlternatives: false,
    //   altLineOptions: { styles: [{opacity: 1}] },
    //   //createMarker: () => { return null; }
    // })
    //  .addTo(map); ///table tbody td
    if(leafletElement){
      leafletElement.setWaypoints([L.latLng(this.props.road[0]),L.latLng(this.props.road[1])]);
      leafletElement.getContainer().style.maxWidth='150px';
       leafletElement.hide(); // hide road describtion
    }
    
    
   return leafletElement.getPlan();
  }
 render(){return null}
  
}

export default withLeaflet(RoutingMachine);