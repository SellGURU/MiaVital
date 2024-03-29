import { LeafletElement } from "@/components/Base/LeafletMapLoader/leaflet-map-loader";
import LeafletMap from "@/components/LeafletMap"
import { createRef, useEffect, useRef, useState } from "react";
import MainData from '@/assets/json/history.json';
import _ from "lodash";
import MixBarChart from "@/components/MixBarChart";
import Table from "@/components/Table";
import PieChartData from "@/components/PieChartData";
import { publish } from "@/utils/event";
import { LatLng } from "leaflet";
import TrendsChart from "@/components/TrendsChart";
import FilterBox from "@/components/FilterBox";
import StandardTable from "@/components/Table/StandardTable";


const data1 = [
    {
        
      name: '180-200',
      Normal: 36,
      Suspected: 34,
      AtRisk: 32,
    },
    {
      name: '160-180',
      Normal: 54,
      Suspected: 50,
      AtRisk: 45,
    },
    {
      name: '140-160',
      Normal: 20,
      Suspected: 18,
      AtRisk: 60,
    },
    {
      name: '120-140',
      Normal: 31,
      Suspected: 7,
      AtRisk: 4,
    },
    {
      name: '100-120',
      Normal: 84,
      Suspected: 30,
      AtRisk: 8,
    },
    {
      name: '80-100',
      Normal: 53,
      Suspected: 7,
      AtRisk: 49,
    },
    {
      name: '60-80',
      Normal: 19,
      Suspected: 43,
      AtRisk: 20,
    },
    {
      name: '40-60',
      Normal: 10,
      Suspected: 53,
      AtRisk: 59,
    },
];

const data2 = [
    {
        name: '>=75',
        Normal: 10,
        Suspected: 52,
        AtRisk: 60,
      },
      {
        name: '45-75',
        Normal: 20,
        Suspected: 18,
        AtRisk: 95,
      },
      {
        name: '25-45',
        Normal: 22,
        Suspected: 23,
        AtRisk: 34,
      },
      {
        name: '18-25',
        Normal: 36,
        Suspected: 34,
        AtRisk: 34,
      },
      {
        name: '<=18',
        Normal: 54,
        Suspected: 6,
        AtRisk: 59,
    }
];

const data3 = [
    {
        name: '39-40',
        Normal: 22,
        Suspected: 23,
        AtRisk: 34,
      },
      {
        name: '38-39',
        Normal: 20,
        Suspected: 18,
        AtRisk: 95,
      },
      {
        name: '37-38',
        Normal: 83,
        Suspected: 31,
        AtRisk: 7,
      },
      {
        name: '36-37',
        Normal: 52,
        Suspected: 9,
        AtRisk: 12,
      },
      {
        name: '35-36',
        Normal: 31,
        Suspected: 23,
        AtRisk: 64,
      },
      {
        name: '34-35',
        Normal: 10,
        Suspected: 52,
        AtRisk: 60,
      },
      {
        name: '33-34',
        Normal: 30,
        Suspected: 8,
        AtRisk: 4,
      },
      {
        name: '32-33',
        Normal: 54,
        Suspected: 6,
        AtRisk: 59,
      },
      {
        name: '31-32',
        Normal: 19,
        Suspected: 45,
        AtRisk: 20,
      },
      {
        name: '30-31',
        Normal: 36,
        Suspected: 34,
        AtRisk: 34,
      }
  ];
const data4 = [
    {
        name: '>=40',
        Normal: 22,
        Suspected: 23,
        AtRisk: 34,
      },
      {
        name: '30-40',
        Normal: 20,
        Suspected: 18,
        AtRisk: 95,
      },
      {
        name: '20-30',
        Normal: 10,
        Suspected: 52,
        AtRisk: 60,
      },
      {
        name: '10-20',
        Normal: 54,
        Suspected: 6,
        AtRisk: 59,
      },
      {
        name: '<=10',
        Normal: 36,
        Suspected: 34,
        AtRisk: 34,
    }
];
const Main = () => {
    const mapRef = createRef<LeafletElement>();
    const boundsFilter = useRef({
        northE:new LatLng(13.520508153934646,79.26361083984376),
        southW: new LatLng(12.42316552500995,75.92651367187501)        
    })
    const filterdData = () => {           
        const result = _.groupBy(filterHumanData(),'city')
        
        return Object.entries(result).map((item) => {
            return {
                "id":item[1][0].id,
                "name": item[1][0].city,
                "membersLength":item[1].length,  
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
            }
        })
    }
    const filterdDataWithBounds = () => {
        const result = _.groupBy(filterHumanData(),'city')
        let resolve =Object.entries(result).map((item) => {
            const sbp =  (item[1].reduce((sum,{SBPbloodPressure}) =>sum+Number(SBPbloodPressure),0)/ item[1].length).toFixed(0)
            const dbp = (item[1].reduce((sum,{DBPbloodPressure}) =>sum+Number(DBPbloodPressure),0)/ item[1].length).toFixed(0)
            return {
                "id":item[1][0].id,
                "name": item[1][0].city,
                "membersLength":item[1].length,  
                "riskLevel": item[1].map(el =>el.riskLevel).sort((a,b) => item[1].filter((el) =>el.riskLevel == a).length - item[1].filter((el) =>el.riskLevel == b).length).pop() as string,
                "heartRate": (item[1].reduce((sum,{heartRate}) =>sum+Number(heartRate),0)/ item[1].length).toFixed(2),
                "DBPbloodPressure":dbp ,
                "SBPbloodPressure": sbp,
                "temperature": (item[1].reduce((sum,{temperature}) =>sum+Number(temperature),0)/ item[1].length).toFixed(2),
                "respirationRate": (item[1].reduce((sum,{respirationRate}) =>sum+Number(respirationRate),0)/ item[1].length).toFixed(2),
                "spo2": (item[1].reduce((sum,{spo2}) =>sum+Number(spo2),0) / item[1].length).toFixed(2),
                "latitude": item[1][0].latitude,
                "longitude": item[1][0].longitude,
                "city": item[1][0].city,     
                "bloodPressure": sbp +'/'+dbp  
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
        }  else{
            return resolve
        }        
    }    
    const filterHumanData =() => {
      const filterlayer = MainData.filter((item) => {
        if(filters.length == 0) {
          return item
        }
        let maps = filters.filter(fil => {
          if(fil.mode == 'equal'){
              if(item[fil.item] == fil.value){
                return fil
              }
          }
          if(fil.mode == 'min'){
              if(Number(item[fil.item]) >= Number(fil.value)){
                return fil
              }
          }
          if(fil.mode == 'max'){
              if(Number(item[fil.item]) < Number(fil.value)){
                return fil
              }
          }          
        })
        if(maps.length == filters.length){
          return item
        }
      })        
      return filterlayer
    }
    const filterHumanDataWithBounds = () => {
        if(boundsFilter){
            const filterd = filterHumanData().filter((ite) => {
            return  Number(ite.latitude) > boundsFilter.current.southW.lat && 
                    Number(ite.latitude) < boundsFilter.current.northE.lat &&
                    Number(ite.longitude) < boundsFilter.current.northE.lng &&
                    Number(ite.longitude) > boundsFilter.current.southW.lng
            })
            return filterd
        }  else{
            return filterHumanData()
        }            
    }
    useEffect(() => {
        if(mapRef.current){
            // console.log(mapRef.current?.map.getBounds())
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
    const [filters,setFilters] = useState<Array<filterProps>>([])
    const lower="<=";
    const uper=">=";    
    return (
        <>
            <div className="w-full">
                <div className="my-10 w-full text-[#475569] flex flex-col gap-10">
                    <div className="flex flex-wrap gap-4 flex-row justify-start items-center">
                        <FilterBox  filters={filters} setFilters={setFilters}></FilterBox>
                    </div>
                </div> 
                <div className="w-full mt-5 flex justify-center">
                    <div className="w-full intro-y  ">
                        <LeafletMap mode="City"  mapRef={mapRef} applyFilters={filterdData} className="h-[410px] mt-5 rounded-md bg-slate-200" />
                    </div>
                </div>             
                <div className="w-full flex flex-col justify-center mt-[56px]">
                    {/* <div className="w-full -ms-4">
                        <TrendsChart/>
                    </div> */}
                    <div className="mb-6 mt-6 flex justify-between items-center">
                        <div className="title  text-lg font-medium">Overview</div>
                    </div>   
                    <div className="grid lg:grid-cols-2 grid-flow-row gap-4 ">
                    <div className="border rounded-lg p-6 bg-white">
                        Heart Rate
                        <MixBarChart data={data1}/>
                    </div>
                    <div className="border rounded-lg p-6 bg-white">
                        Blood Pressure
                        <MixBarChart data={data2}/>
                    </div>
                    <div className="border rounded-lg p-6 bg-white">
                        Temperature Rate
                        <MixBarChart data={data3}/>
                    </div>
                    <div className="border rounded-lg p-6 bg-white">
                        Respiration Rate
                        <MixBarChart data={data4}/>
                    </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4 mt-4 mb-[40px]">
                    <div className="border rounded-lg p-6 bg-white">
                        SPO2
                        <div className="flex flex-row justify-evenly lg:justify-between items-center">
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
                        
                        <PieChartData keyFilter="spo2" filterdData={filterHumanDataWithBounds}/>
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
                        <PieChartData keyFilter="gender" filterdData={filterHumanDataWithBounds}/>
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
                         <PieChartData keyFilter="age" filterdData={filterHumanDataWithBounds}/>
                        {/* <PieChartCustomized  keyFilter="AgeGroup" filterdData={filterdItems2}/> */}
                        </div>
                    </div>         
                    </div>  
                    {/* <Table applyFilters={filterdDataWithBounds} filterBox={filters}></Table>   */}
                    <div>
                        <div className="mb-6 mt-6 flex justify-between items-center">
                            <div className="title  text-lg font-medium">City List</div>
                        </div>                        
                        <StandardTable filterBox={filters} mode="city" applyFilters={filterdDataWithBounds}></StandardTable>
                    </div>
                    {/* <EnhancedTable filterBox={filters} applyFilters={filterdItems} ></EnhancedTable> */}
                </div>                   
                    {/* <StandardTable mode="member" applyFilters={filterHumanDataWithBounds}></StandardTable> */}
            </div>
        </>
    )
}

export default Main