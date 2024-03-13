import { LeafletElement } from "@/components/Base/LeafletMapLoader/leaflet-map-loader";
import LeafletMap from "@/components/LeafletMap"
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import MainData from '@/assets/json/main.json';
import HistoryData from '@/assets/json/history.json';
import _ from "lodash";
import MixBarChart from "@/components/MixBarChart";
import Table from "@/components/Table";
import PieChartData from "@/components/PieChartData";
import { publish } from "@/utils/event";
import { LatLng } from "leaflet";
import TrendsChart from "@/components/TrendsChart";
import FilterBox from "@/components/FilterBox";
import ChartAndTableShowProps from '@/components/chartAndTableShow'
type riskPanelType = {
    name:string,
    key:keyof humanData
}
const Main = () => {
    const mapRef = createRef<LeafletElement>();
    const boundsFilter = useRef({
        northE:new LatLng(13.520508153934646,79.26361083984376),
        southW: new LatLng(12.42316552500995,75.92651367187501)        
    })
    
    const filterdData = () => {           
        const result = _.groupBy(filterHumanData(),'city')
        
        return Object.entries(result).map((item) => {
            console.log(item[1].filter((el) => el.city == 'Kolar'))
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
        const result = _.groupBy(filterHumanData(),'city')
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
        }  else{
            return resolve
        }        
    }    
    const filterHumanData =() => {
      const filterlayer:Array<humanData> = HistoryData.filter((item) => {
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
      }) as Array<humanData>       
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
    const getAllData = () => {
        return HistoryData
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
    const riskPanels:Array<riskPanelType> =[
        {
            name:'Pregnancy',
            key:'pregnancy'
        },
        {
            name:'Hypertension',
            key:'hypertension'
        },
        {
            name:'CHF',
            key:'CHF'
        },
        {
            name:'COPD',
            key:'COPD'
        },
        {
            name:'Stroke',
            key:'stroke'
        },
        {
            name:'Mental Health',
            key:'mentalHealth'
        },
        {
            name:'Arrythmia',
            key:'arrhythmia'
        } ,
        {
            name:'Neurological',
            key:'neurologicalDisorders'
        },
        {
            name:'Diabetes',
            key:'diabetes'
        } ,
        {
            name:'Sleep Disorders',
            key:'sleepDisorders'
        },
        {
            name:'Chronic Pain',
            key:'chronicPain'
        },
        {
            name:'Obesity',
            key:'obesity'
        }                                                                                          
    ]
    return (
        <>
            <div className="w-full">
                {/* <div className="my-6 w-full">
                    <FilterBox filters={filters} setFilters={setFilters}></FilterBox>
                </div> */}
                <div className="my-10 w-full text-[#475569] flex flex-col gap-10">
                {/* <FilterBox></FilterBox> */}
                    <div className="flex flex-wrap gap-4 flex-row justify-start items-center">
                        <FilterBox showCalender filters={filters} setFilters={setFilters}></FilterBox>
                    </div>
                    <div className="flex flex-col justify-start">
                        <p className="font-medium mb-4">Risk Panel</p>
                        <div className="flex flex-row gap-2 justify-start items-center h-[156px]">
                        <div className="font-medium flex flex-col min-w-[70px] gap-4 items-center h-full justify-center p-2 border border-[#E2E8F0] rounded-lg bg-white cursor-pointer">
                            At Risk<p className="text-[#DC2626]">{getAllData().reduce((sum,el) => {
                                return sum + riskPanels.filter((ris) => {
                                    return el[ris.key] =='Risk'
                                }).length
                            },0)}</p></div>
                        {/* <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 justify-start items-center">
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">Pregnancy</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">Hypertension</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">CHF</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">COPD</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">Stroke</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">Mental Health</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            </div>

                            <div className="flex flex-row gap-2 justify-start items-center">
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">Arrythmia</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">Neurological</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">Diabetes</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">Sleep Disorders</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">Chronic Pain</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            <div className="font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg bg-white cursor-pointer">
                                <p className="font-medium	">Obesity</p>
                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">5</p></div>  
                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ms-2">3</p></div>  
                                </div>
                            </div>
                            </div>

                        </div> */}
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row flex-wrap gap-2 justify-start items-center">
                               {riskPanels.map((item) => {
                                    return (
                                        <>
                                            <div onClick={() => {
                                                if(filters.filter((el) =>el.item == item.key).length>0){
                                                   setFilters([...filters.filter((el) => el.item != item.key)])
                                                }else{
                                                    setFilters([...filters,{
                                                        item:item.key,
                                                        mode:'equal',
                                                        value:'Risk'
                                                    }])
                                                }
                                            }} className={`font-medium flex flex-1 flex-col gap-2 items-center p-2 border border-[#E2E8F0] px-[10px] py-[13px] rounded-lg ${filters.filter((el) =>el.item == item.key).length>0?'bg-[#48C3B529]':'bg-white'} cursor-pointer`}>
                                                <p className="font-medium	">{item.name}</p>
                                                <div className="flex flex-row justify-between items-center text-xs gap-5">
                                                <div className="flex flex-row gap-2">Suspected<p className="text-[#FACC15]">{getAllData().filter((el) => el[item.key] == 'Suspect').length}</p></div>  
                                                <div className="flex flex-row gap-2">At Risk<p className="text-[#DC2626] ">{getAllData().filter((el) => el[item.key] == 'Risk').length}</p></div>  
                                                </div>
                                            </div>                                
                                        </>
                                    )                                
                               })}
                            </div>
                        </div>
                        </div>
                    </div>
                
                </div>                
                <div className="w-full mt-5 flex justify-center">
                    <div className="w-full intro-y  ">
                        <LeafletMap mode="City" mapRef={mapRef} applyFilters={filterdData} className="h-[410px] mt-5 rounded-md bg-slate-200" />
                    </div>
                </div>             
                <div className="w-full flex flex-col justify-center mt-[56px]">
                    <div className="w-full">
                        <TrendsChart/>
                    </div>
                    <ChartAndTableShowProps filters={filters} filterHumanDataWithBounds={filterHumanDataWithBounds}></ChartAndTableShowProps>
                    <Table applyFilters={filterdDataWithBounds} filterBox={[]}></Table>  
                    {/* <EnhancedTable filterBox={filters} applyFilters={filterdItems} ></EnhancedTable> */}
                </div>                   
            </div>
        </>
    )
}

export default Main