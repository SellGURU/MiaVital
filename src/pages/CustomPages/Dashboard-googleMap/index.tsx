import _ from "lodash";
import { useEffect, useRef, useState } from "react";

import { TinySliderElement } from "@/components/Base/TinySlider";
import MapBox from "@/components/MapBox";
import FilterBox from "@/components/FilterBox";
import EnhancedTable from "@/components/EnhancedTable";
import LeafletMap from "@/components/LeafletMap";
import { LatLng } from "leaflet";
import location from "@/assets/json/location.json";

function Main() {
  const [salesReportFilter, setSalesReportFilter] = useState<string>();
  const boundsFilter = useRef<any>({
    northE:new LatLng(13.00623032604816,77.69445419311525),
    southW: new LatLng(12.937645284624287,77.49292373657228)    
  })

  const importantNotesRef = useRef<TinySliderElement>();
  const prevImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("prev");
  };
  const nextImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("next");
  };
  const filterdItems =() => {
      if(boundsFilter.current){
        const filterd = location.filter((ite) => {
          return  Number(ite.latitude) > boundsFilter.current.southW.lat && 
                  Number(ite.latitude) < boundsFilter.current.northE.lat &&
                  Number(ite.longitude) < boundsFilter.current.northE.lng &&
                  Number(ite.longitude) > boundsFilter.current.southW.lng
        })
        return filterd
      }    
      return location
  }
  return (
    <div className="w-full">
        <div className="my-6 w-full">
            <FilterBox></FilterBox>

        </div>
        <div className="w-full flex justify-center">
          <div className="p-5 w-full mt-12 intro-y box sm:mt-5">
            <LeafletMap applyFilter={filterdItems} boundsFilter={boundsFilter} className="h-[410px] mt-5 rounded-md bg-slate-200" />
          </div>
        </div>
        <div className="w-full flex flex-col justify-center mt-[32px]">
            <EnhancedTable applyFilter={filterdItems} ></EnhancedTable>
        </div>
    </div>
  );
}

export default Main;
