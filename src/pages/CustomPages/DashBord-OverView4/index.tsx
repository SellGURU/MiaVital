import { LeafletElement } from "@/components/Base/LeafletMapLoader/leaflet-map-loader";
import LeafletMap from "@/components/LeafletMap"
import { createRef, useEffect, useRef } from "react";
import MainData from '@/assets/json/main.json';
import _ from "lodash";
import MixBarChart from "@/components/MixBarChart";
import Table from "@/components/Table";
import PieChartData from "@/components/PieChartData";
import { publish } from "@/utils/event";
import { LatLng } from "leaflet";
import TrendsChart from "@/components/TrendsChart";

const Main = () => {
    const mapRef = createRef<LeafletElement>();
    const boundsFilter = useRef({
        northE:new LatLng(13.00623032604816,77.69445419311525),
        southW: new LatLng(12.937645284624287,77.49292373657228)        
    })
    const filterdData = () => {
        const result = _.groupBy(MainData,'city')
        console.log(Object.entries(result).map((item) => item[1][0]))
        
        return Object.entries(result).map((item) => {
            return {
                "id":item[1][0].id,
                "name": item[1][0].city,
                "riskLevel": item[1].map(el =>el.riskLevel).sort((a,b) => item[1].filter((el) =>el.riskLevel == a).length - item[1].filter((el) =>el.riskLevel == b).length).pop() as string,
                "heartRate": item[1].reduce((sum,{heartRate}) =>sum+Number(heartRate),0)/ item[1].length,
                "DBPbloodPressure": item[1].reduce((sum,{DBPbloodPressure}) =>sum+Number(DBPbloodPressure),0)/ item[1].length,
                "SBPbloodPressure": item[1].reduce((sum,{SBPbloodPressure}) =>sum+Number(SBPbloodPressure),0)/ item[1].length,
                "temperature": item[1].reduce((sum,{temperature}) =>sum+Number(temperature),0)/ item[1].length,
                "respirationRate": item[1].reduce((sum,{respirationRate}) =>sum+Number(respirationRate),0)/ item[1].length,
                "spo2": item[1].reduce((sum,{spo2}) =>sum+Number(spo2),0) / item[1].length,
                "latitude": item[1][0].latitude,
                "longitude": item[1][0].longitude,
                "city": item[1][0].city,        
                "membersLength":item[1].length  
            }
        })
    }
    const filterdDataWithBounds = () => {
        const result = _.groupBy(MainData,'city')
        let resolve =Object.entries(result).map((item) => {
            return {
                "id":item[1][0].id,
                "name": item[1][0].city,
                "riskLevel": item[1].map(el =>el.riskLevel).sort((a,b) => item[1].filter((el) =>el.riskLevel == a).length - item[1].filter((el) =>el.riskLevel == b).length).pop() as string,
                "heartRate": item[1].reduce((sum,{heartRate}) =>sum+Number(heartRate),0)/ item[1].length,
                "DBPbloodPressure": item[1].reduce((sum,{DBPbloodPressure}) =>sum+Number(DBPbloodPressure),0)/ item[1].length,
                "SBPbloodPressure": item[1].reduce((sum,{SBPbloodPressure}) =>sum+Number(SBPbloodPressure),0)/ item[1].length,
                "temperature": item[1].reduce((sum,{temperature}) =>sum+Number(temperature),0)/ item[1].length,
                "respirationRate": item[1].reduce((sum,{respirationRate}) =>sum+Number(respirationRate),0)/ item[1].length,
                "spo2": item[1].reduce((sum,{spo2}) =>sum+Number(spo2),0) / item[1].length,
                "latitude": item[1][0].latitude,
                "longitude": item[1][0].longitude,
                "city": item[1][0].city,        
                "membersLength":item[1].length  
            }
        })
        if(boundsFilter){
            const filterd = resolve.filter((ite) => {
            return  Number(ite.latitude) > boundsFilter.current.southW.lat && 
                    Number(ite.latitude) < boundsFilter.current.northE.lat &&
                    Number(ite.longitude) < boundsFilter.current.northE.lng &&
                    Number(ite.longitude) > boundsFilter.current.southW.lng
            })
            return filterd
        }
        return resolve
    }    
    const filterHumanData =() => {
      if(boundsFilter){
        const filterd = MainData.filter((ite) => {
          return  Number(ite.latitude) > boundsFilter.current.southW.lat && 
                  Number(ite.latitude) < boundsFilter.current.northE.lat &&
                  Number(ite.longitude) < boundsFilter.current.northE.lng &&
                  Number(ite.longitude) > boundsFilter.current.southW.lng
        })
        return filterd
      }  else{
        return MainData
      }
    }
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
        mapRef.current.map.addEventListener('load',() => {
            boundsFilter.current.northE = mapRef.current?.map.getBounds().getNorthEast()  as LatLng
            boundsFilter.current.southW = mapRef.current?.map.getBounds().getSouthWest()  as LatLng
            publish('mapChange',{})
        })        
        }
    })    
    const lower="<=";
    const uper=">=";    
    return (
        <>
            <div className="w-full">

                <div className="w-full mt-5 flex justify-center">
                    <div className="w-full intro-y  ">
                        <LeafletMap mapRef={mapRef} applyFilters={filterdData} className="h-[410px] mt-5 rounded-md bg-slate-200" />
                    </div>
                </div>             
                <div className="w-full flex flex-col justify-center mt-[56px]">
                    <TrendsChart/>
                    <div className="title mb-6 font-medium">Overview</div>
                    <div className="grid grid-cols-2 grid-flow-row gap-4 ">
                    <div className="border rounded-lg p-6 bg-white">
                        Heart Rate
                        <MixBarChart/>
                    </div>
                    <div className="border rounded-lg p-6 bg-white">
                        Blood Pressure
                        <MixBarChart/>
                    </div>
                    <div className="border rounded-lg p-6 bg-white">
                        Temperature Rate
                        <MixBarChart/>
                    </div>
                    <div className="border rounded-lg p-6 bg-white">
                        Respiration Rate
                        <MixBarChart/>
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
                        
                        <PieChartData keyFilter="spo2" filterdData={filterHumanData}/>
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
                        <PieChartData keyFilter="gender" filterdData={filterHumanData}/>
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
                         <PieChartData keyFilter="age" filterdData={filterHumanData}/>
                        {/* <PieChartCustomized  keyFilter="AgeGroup" filterdData={filterdItems2}/> */}
                        </div>
                    </div>         
                    </div>  
                    <Table applyFilters={filterdDataWithBounds} filterBox={[]}></Table>  
                    {/* <EnhancedTable filterBox={filters} applyFilters={filterdItems} ></EnhancedTable> */}
                </div>                   
            </div>
        </>
    )
}

export default Main