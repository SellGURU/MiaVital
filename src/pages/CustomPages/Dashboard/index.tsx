import _ from "lodash";
import { useRef, useState } from "react";

import { TinySliderElement } from "@/components/Base/TinySlider";
import MapBox from "@/components/MapBox";
import FilterBox from "@/components/FilterBox";
import EnhancedTable from "@/components/EnhancedTable";
import location from "@/assets/json/location.json";
import MixBarChart from "@/components/MixBarChart";
import PieChartCustomized from "@/components/PieChartCustomized";
import TrendsChart from "@/components/TrendsChart";

function Main() {
  const [salesReportFilter, setSalesReportFilter] = useState<string>();
  const [filters,setFilters] = useState<Array<filterProps>>([])
  const importantNotesRef = useRef<TinySliderElement>();
  const prevImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("prev");
  };
  const nextImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("next");
  };
  const filterdItems =() => { 
      return location
  }
  // const lower="<=";
  // const uper=">=";
  return (
    <div className="w-full">
        <div className="my-10 w-full text-[#475569] flex flex-col gap-10">
          {/* <FilterBox></FilterBox> */}
          <div className="flex flex-row gap-4 justify-start items-center">
            <div className="flex flex-row gap-2 justify-between items-center px-3 py-2 border border-[#E2E8F0] rounded-lg bg-white cursor-pointer">  
              <img src="/calendar.svg" className="w-5 h-5"/>
              <p className="text-xs">Feb 26 - Mar 3</p>
              <img src="/arrowBottom.svg" className="w-5 h-5 cursor-pointer"/>
            </div>
            <div className="flex flex-row gap-2 justify-between items-center px-3 py-2 border border-[#E2E8F0] rounded-lg bg-white cursor-pointer">  
              <p className="text-xs ">Risk Category:</p>
              <p className="text-xs font-medium	">COPD</p>
              <img src="/close.svg" className="w-4 h-4 cursor-pointer"/>
            </div>
            <div className="flex flex-row gap-2 justify-between items-center px-3 py-2 border border-[#E2E8F0] rounded-lg bg-white cursor-pointer">  
              <p className="text-xs ">Blood Pressure:</p>
              <p className="text-xs font-medium	">Normal Rate</p>
              <img src="/close.svg" className="w-4 h-4 cursor-pointer"/>
            </div>
            <div className="flex flex-row gap-2 justify-between items-center px-3 py-2 border border-[#E2E8F0] rounded-lg bg-white cursor-pointer">  
              <img src="/filter.svg" className="w-5 h-5 cursor-pointer"/>
              <p className="text-xs ">Add Filter</p>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <p className="font-medium mb-4">Risk Panel</p>
            <div className="flex flex-row gap-2 justify-start items-center h-[156px]">
              <div className="font-medium flex flex-col gap-4 items-center h-full justify-center p-2 border border-[#E2E8F0] rounded-lg bg-white cursor-pointer">At Risk<p className="text-[#DC2626]">21</p></div>
              <div className="flex flex-col gap-2">
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

              </div>
            </div>
          </div>
          
        </div>
        <div className="w-full flex justify-center">
            <MapBox></MapBox>
        </div>
        <div className="w-full flex flex-col justify-center mt-[430px]">
          <div className="title mt-10 mb-6 font-medium">Overview</div>
          <TrendsChart/>
            {/*<div className="grid grid-cols-2 grid-flow-row gap-4 ">
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
            <div className="grid grid-cols-3 grid-flow-row gap-4 my-4">
              <div className="border rounded-lg p-6 bg-white">
                SPO2
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col items-start justify-start gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 bg-[#48C3B5] rounded-full"></div>
                      <div className="">{lower} 50</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 bg-[#FF3E5D] rounded-full"></div>
                      <div className="">50 - 70</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 bg-[#6432C9] rounded-full"></div>
                      <div className="">70 - 90</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 bg-[#FFBA52] rounded-full"></div>
                      <div className="">{uper} 90</div>
                    </div>      
                  </div>
                  
                  <PieChartCustomized/>
                </div>
              </div>    
              <div className="border rounded-lg p-6 bg-white">
                Gender
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col items-start justify-start gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 bg-[#236AF2] rounded-full"></div>
                      <div className="">Male</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 bg-[#FF3E5D] rounded-full"></div>
                      <div className="">Female</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 bg-[#FFBA52] rounded-full"></div>
                      <div className="">Others</div>
                    </div>      
                  </div>
                  
                  <PieChartCustomized/>
                </div>
              </div> 
              <div className="border rounded-lg p-6 bg-white">
                Age
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col items-start justify-start gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 bg-[#6432C9] rounded-full"></div>
                      <div className="">{lower} 18</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 bg-[#48C3B5] rounded-full"></div>
                      <div className="">18 - 35</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 bg-[#FF3E5D] rounded-full"></div>
                      <div className="">35 - 75</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 bg-[#FFBA52] rounded-full"></div>
                      <div className="">{uper} 75</div>
                    </div>      
                  </div>
                  
                  <PieChartCustomized/>
                </div>
              </div>         
            </div> */}

            {/* <EnhancedTable applyFilter={filterdItems}></EnhancedTable> */}
        </div>
    </div>
  );
}

export default Main;
