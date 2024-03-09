import "@/assets/css/vendors/leaflet.css";
import LeafletMapLoader, { Init } from "@/components/Base/LeafletMapLoader";
import { getColor } from "@/utils/colors";
import { selectDarkMode } from "@/stores/darkModeSlice";
import location from "@/assets/json/location.json";
import { selectColorScheme } from "@/stores/colorSchemeSlice";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { LatLng } from "leaflet";
import { useAppSelector } from "@/stores/hooks";

interface boundsFilter {
  northE:LatLng
  southW:LatLng
}
type boundsFiltertype = {
  boundsFilter:React.MutableRefObject<boundsFilter>
  applyFilter:() =>void
}

type MainProps = React.ComponentPropsWithoutRef<"div"> & boundsFiltertype;



function Main(props: MainProps) {
  const darkMode = useAppSelector(selectDarkMode);
  const colorScheme = useAppSelector(selectColorScheme);
  // const boundsFilter:boundsFilter = {
  //   northE:new LatLng(17,12),
  //   southW: new LatLng(15,16)
  // }

  // const boundsFilter = useRef<boundsFilter>({
  //     northE:new LatLng(17,12),
  //     southW: new LatLng(15,16)    
  // })
  // changeBunds()
  const init: Init = async (initializeMap) => {
    const mapInstance = await initializeMap({
      config: {
        center: [12.97194, 77.59369],
        zoom: 13,
      },
    });

    if (mapInstance) {
      const apiKey = "1e86fd5a7f60486a8e899411776f60d5";
      const { map, leaflet } = mapInstance;

      leaflet
        .tileLayer(
          `https://tile.thunderforest.com/atlas/{z}/{x}/{y}@2x.png?apikey=${apiKey}`,
          {
            attribution:
              "Map data &copy; OpenStreetMap contributors, Tiles &copy; Thunderforest",
          }
        )
        .addTo(map);

      const markers = leaflet.markerClusterGroup({
        maxClusterRadius: 30,
        iconCreateFunction: function (cluster) {
          console.log(cluster)
          const risks = cluster.getAllChildMarkers().find(item => item.options.attribution == 'High')
          let color =
            darkMode && colorScheme
              ? getColor(risks?'red.500':"darkmode.100", 0.6)
              : getColor(risks?'red.500':"primary", 0.8);
          const mapMarkerRegionSvg =
            window.btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="55.066" height="47.691" viewBox="0 0 55.066 47.691">
                  <g id="Group_15" data-name="Group 15" transform="translate(-319.467 -83.991)">
                    <g id="Group_14" data-name="Group 14">
                      <path id="Intersection_4" data-name="Intersection 4" d="M12.789,17.143a15,15,0,0,1,20.7,0l-1.6,2.141-.018-.018a12.352,12.352,0,0,0-17.469,0l-.018.018Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.845"/>
                      <path id="Intersection_5" data-name="Intersection 5" d="M10.384,13.919a19,19,0,0,1,25.511,0l-2.016,2.7a15.647,15.647,0,0,0-21.479,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.652"/>
                      <path id="Intersection_6" data-name="Intersection 6" d="M7.982,10.7a22.978,22.978,0,0,1,30.313,0l-2,2.679a19.652,19.652,0,0,0-26.316,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.453"/>
                    </g>
                    <g id="Group_13" data-name="Group 13" transform="translate(427.806 461.061) rotate(-120)">
                      <path id="Intersection_4-2" data-name="Intersection 4" d="M12.789,17.143a15,15,0,0,1,20.7,0l-1.6,2.141-.018-.018a12.352,12.352,0,0,0-17.469,0l-.018.018Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.845"/>
                      <path id="Intersection_5-2" data-name="Intersection 5" d="M10.384,13.919a19,19,0,0,1,25.511,0l-2.016,2.7a15.647,15.647,0,0,0-21.479,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.652"/>
                      <path id="Intersection_6-2" data-name="Intersection 6" d="M7.982,10.7a22.978,22.978,0,0,1,30.313,0l-2,2.679a19.652,19.652,0,0,0-26.316,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.453"/>
                    </g>
                    <circle id="Ellipse_9" data-name="Ellipse 9" cx="11" cy="11" r="11" transform="translate(336 96)" fill="${color}"/>
                    <g id="Group_12" data-name="Group 12" transform="translate(613.194 -139.96) rotate(120)">
                      <path id="Intersection_4-3" data-name="Intersection 4" d="M12.789,17.143a15,15,0,0,1,20.7,0l-1.6,2.141-.018-.018a12.352,12.352,0,0,0-17.469,0l-.018.018Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.845"/>
                      <path id="Intersection_5-3" data-name="Intersection 5" d="M10.384,13.919a19,19,0,0,1,25.511,0l-2.016,2.7a15.647,15.647,0,0,0-21.479,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.652"/>
                      <path id="Intersection_6-3" data-name="Intersection 6" d="M7.982,10.7a22.978,22.978,0,0,1,30.313,0l-2,2.679a19.652,19.652,0,0,0-26.316,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.453"/>
                    </g>
                  </g>
                </svg>
              `);
          return leaflet.divIcon({
            html: `<div class="relative w-full h-full">
                    <div class="absolute inset-0 flex items-center justify-center ml-1.5 mb-0.5 font-medium text-white">${cluster.getChildCount()}</div>
                    <img class="w-full h-full" src="data:image/svg+xml;base64,${mapMarkerRegionSvg}">
                  </div>`,
            className: "",
            iconSize: leaflet.point(42, 42),
            iconAnchor: leaflet.point(20, 45),
          });
        },
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
      });

      map.addLayer(markers);

      let color =
        darkMode && colorScheme
          ? getColor("gray.100",0.9)
          : getColor("primary",0.9);
      const mapMarkerSvg =
        window.btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="31.063" viewBox="0 0 20 31.063">
                <g id="Group_16" data-name="Group 16" transform="translate(-408 -150.001)">
                  <path id="Subtraction_21" data-name="Subtraction 21" d="M10,31.064h0L1.462,15.208A10,10,0,1,1,20,10a9.9,9.9,0,0,1-1.078,4.522l-.056.108c-.037.071-.077.146-.121.223L10,31.062ZM10,2a8,8,0,1,0,8,8,8,8,0,0,0-8-8Z" transform="translate(408 150)" fill="${color}"/>
                  <circle id="Ellipse_26" data-name="Ellipse 26" cx="6" cy="6" r="6" transform="translate(412 154)" fill="${color}"/>
                </g>
              </svg>
            `);
    color =
        darkMode && colorScheme
          ? getColor("red.500")
          : getColor("red.500");        
    const mapMarkerSvgRed = window.btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="31.063" viewBox="0 0 20 31.063">
                <g id="Group_16" data-name="Group 16" transform="translate(-408 -150.001)">
                  <path id="Subtraction_21" data-name="Subtraction 21" d="M10,31.064h0L1.462,15.208A10,10,0,1,1,20,10a9.9,9.9,0,0,1-1.078,4.522l-.056.108c-.037.071-.077.146-.121.223L10,31.062ZM10,2a8,8,0,1,0,8,8,8,8,0,0,0-8-8Z" transform="translate(408 150)" fill="${color}"/>
                  <circle id="Ellipse_26" data-name="Ellipse 26" cx="6" cy="6" r="6" transform="translate(412 154)" fill="${color}"/>
                </g>
              </svg>
            `);
      location.map(function (markerElem) {
        const marker = leaflet.marker(
          {
            lat: markerElem.latitude,
            lng: markerElem.longitude,
          },
          {
            title: markerElem.name,
            attribution:markerElem.riskLevel,
            icon: leaflet.icon({
              iconUrl: `data:image/svg+xml;base64,${markerElem.riskLevel == 'High' ?mapMarkerSvgRed :mapMarkerSvg}`,
              iconAnchor: leaflet.point(10, 35),
            }),
          }
        );
        markers.addLayer(marker);
      });
      map.addEventListener('mouseup',(e) => {
        // setBoundsFilter(map.getBounds())
        // setBoundsFilter({
        //   northE:map.getBounds().getNorthEast(),
        //   southW:map.getBounds().getSouthWest()
        // })
        props.boundsFilter.current.northE = map.getBounds().getNorthEast()
        props.boundsFilter.current.southW = map.getBounds().getSouthWest()
        // render()
        props.applyFilter()
        // checklocations()
      })
      map.addEventListener("zoom",() => {
        props.boundsFilter.current.northE = map.getBounds().getNorthEast()
        props.boundsFilter.current.southW = map.getBounds().getSouthWest()
        // render()
        props.applyFilter()        
      })
      // setBoundsFilter({
      //   northE:map.getBounds().getNorthEast(),
      //   southW:map.getBounds().getSouthWest()        
      // })
    }
  };

  return (
    <LeafletMapLoader
      init={init}
      darkMode={darkMode}
      className={props.className}
    />
  );
}

Main.defaultProps = {
  width: 0,
  height: 0,
  className: "",
};

export default Main;
