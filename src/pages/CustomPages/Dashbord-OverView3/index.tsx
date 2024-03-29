import _ from "lodash";
import { createRef, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { TinySliderElement } from "@/components/Base/TinySlider";
import FilterBox from "@/components/FilterBox";
import EnhancedTable from "@/components/EnhancedTable";
import LeafletMap from "@/components/LeafletMap";
import { LatLng } from "leaflet";
// import location from "@/assets/json/location.json";
// import citydata from "@/assets/json/city.json"
import mainData from '@/assets/json/main.json';
import MixBarChart from "@/components/MixBarChart";
import { LeafletElement } from "@/components/Base/LeafletMapLoader/leaflet-map-loader";
import { publish } from "@/utils/event";
import Table from "@/components/Table";
import PieChartData from "@/components/PieChartData";

function Main() {
  const mapRef = createRef<LeafletElement>();

  const boundsFilter = useRef({
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
  // const resolveFilterRate = (filterItem:filterProps,item:any) => {
  //   switch(filterItem.item) {
  //     case 'spo2':
  //       if(Number(item[filterItem.item]) >= 95) {
  //         return 'High'
  //       }
  //       if(Number(item[filterItem.item]) >= 90 && Number(item[filterItem.item]) < 95){
  //         return 'Midrate'
  //       }
  //       return 'Low'
  //     case 'respirationRate':
  //       if(Number(item[filterItem.item]) >= 20) {
  //         return 'High'
  //       }
  //       if(Number(item[filterItem.item]) >= 12 && Number(item[filterItem.item]) < 20){
  //         return 'Midrate'
  //       }
  //       return 'Low'     
  //     case 'bloodPressure':
  //       if(Number(item[filterItem.item]) >= 120) {
  //         return 'High'
  //       }
  //       if(Number(item[filterItem.item]) >= 90 && Number(item[filterItem.item]) < 120){
  //         return 'Midrate'
  //       }
  //       return 'Low'               
  //     default : return item[filterItem.item]
  //   }
  // }
  const filterdItems =() => {
      const filter1 = mainData.filter((item) => {
        if(filters.length == 0) {
          return item
        }
        let maps = filters
        if(maps.length == filters.length){
          return item
        }
      })
      if(boundsFilter){
        const filterd = filter1.filter((ite) => {
          return  Number(ite.latitude) > boundsFilter.current.southW.lat && 
                  Number(ite.latitude) < boundsFilter.current.northE.lat &&
                  Number(ite.longitude) < boundsFilter.current.northE.lng &&
                  Number(ite.longitude) > boundsFilter.current.southW.lng
        })
        return filterd
      }  else{
        return location
      }
  }
  const filterdItems2 =() => {
      const filter1 = mainData
      if(boundsFilter){
        const filterd = filter1.filter((ite) => {
          return  Number(ite.latitude) > boundsFilter.current.southW.lat && 
                  Number(ite.latitude) < boundsFilter.current.northE.lat &&
                  Number(ite.longitude) < boundsFilter.current.northE.lng &&
                  Number(ite.longitude) > boundsFilter.current.southW.lng
        })
        return filterd
      }  else{
        return mainData
      }
  }  
  const filterdItemsWithoutBounds =() => {
      const filter1 = mainData
      return filter1
  }
  const [filters,setFilters] = useState<Array<filterProps>>([])

  useEffect(() => {
    if(mapRef.current){
      mapRef.current.map.addEventListener('mouseup',() => {
        boundsFilter.current.northE = mapRef.current?.map.getBounds().getNorthEast()  as LatLng
        boundsFilter.current.southW = mapRef.current?.map.getBounds().getSouthWest()  as LatLng
        publish('mapChange',{})
      })      
      mapRef.current.map.addEventListener('zoom',() => {
        boundsFilter.current.northE = mapRef.current?.map.getBounds().getNorthEast()  as LatLng
        boundsFilter.current.southW = mapRef.current?.map.getBounds().getSouthWest()  as LatLng
        publish('mapChange',{})
      })            
    }
  })
  const lower="<=";
  const uper=">=";
  return (
    <div className="w-full">
        <div className="my-6 w-full">
            {/* <FilterBox filters={filters} setFilters={setFilters}></FilterBox> */}

        </div>
        <div className="w-full flex justify-center">
          <div className="p-5 w-full mt-12 intro-y box sm:mt-5">
            <LeafletMap mode="Member" mapRef={mapRef} applyFilters={filterdItemsWithoutBounds} className="h-[410px] mt-5 rounded-md bg-slate-200" />
          </div>
        </div>
      <div className="w-full flex flex-col justify-center mt-[56px]">

        <div className="title mb-6 font-medium">Overview</div>
        <div className="grid grid-cols-2 grid-flow-row gap-4 ">
          <div className="border rounded-lg p-6 bg-white">
            Heart Rate
            <MixBarChart data={[]}/>
          </div>
          <div className="border rounded-lg p-6 bg-white">
            Blood Pressure
            <MixBarChart data={[]}/>
          </div>
          <div className="border rounded-lg p-6 bg-white">
            Temperature Rate
            <MixBarChart data={[]}/>
          </div>
          <div className="border rounded-lg p-6 bg-white">
            Respiration Rate
            <MixBarChart data={[]}/>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-flow-row gap-4 mt-4 mb-[40px]">
          <div className="border rounded-lg p-6 bg-white">
            SPO2
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col items-start justify-start gap-4">
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-[#48C3B5] rounded-full"></div>
                  <div className="">{lower} 50</div>
                </div>
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-[#FF3E5D] rounded-full"></div>
                  <div className="">50 - 70</div>
                </div>
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-[#6432C9] rounded-full"></div>
                  <div className="">70 - 90</div>
                </div>
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-[#FFBA52] rounded-full"></div>
                  <div className="">{uper} 90</div>
                </div>      
              </div>
              <PieChartData keyFilter="spo2" filterdData={filterdItems2}></PieChartData>
              {/* <PieChartCustomized keyFilter="SPO2" filterdData={filterdItems2}/> */}
            </div>
          </div>    
          <div className="border rounded-lg p-6 bg-white">
            Gender
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col items-start justify-start gap-4">
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-[#236AF2] rounded-full"></div>
                  <div className="">Male</div>
                </div>
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-[#FF3E5D] rounded-full"></div>
                  <div className="">Female</div>
                </div>
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-[#FFBA52] rounded-full"></div>
                  <div className="">Others</div>
                </div>      
              </div>
              
              {/* <PieChartCustomized  keyFilter="gender" filterdData={filterdItems2}/> */}
            </div>
          </div> 
          <div className="border rounded-lg p-6 bg-white">
            Age
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col items-start justify-start gap-4 ">
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-[#6432C9] rounded-full"></div>
                  <div className="">{lower} 18</div>
                </div>
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-[#48C3B5] rounded-full"></div>
                  <div className="">18 - 35</div>
                </div>
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-[#FF3E5D] rounded-full"></div>
                  <div className="">35 - 75</div>
                </div>
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-[#FFBA52] rounded-full"></div>
                  <div className="">{uper} 75</div>
                </div>      
              </div>
              
              {/* <PieChartCustomized  keyFilter="AgeGroup" filterdData={filterdItems2}/> */}
            </div>
          </div>         
        </div>  
        {/* <Table applyFilters={filterdItems2} filterBox={filters}></Table>   */}
        {/* <EnhancedTable filterBox={filters} applyFilters={filterdItems} ></EnhancedTable> */}
      </div>    

      </div>
  );
}

export default Main;
