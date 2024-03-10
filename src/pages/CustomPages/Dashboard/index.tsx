import _ from "lodash";
import { useRef, useState } from "react";

import { TinySliderElement } from "@/components/Base/TinySlider";
import MapBox from "@/components/MapBox";
import FilterBox from "@/components/FilterBox";
import EnhancedTable from "@/components/EnhancedTable";
import location from "@/assets/json/location.json";
import MixBarChart from "@/components/MixBarChart";
import PieChartCustomized from "@/components/PieChartCustomized";

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
        <div className="my-6 w-full">
            {/* <FilterBox></FilterBox> */}
        </div>
        <div className="w-full flex justify-center">
            <MapBox></MapBox>
        </div>
        <div className="w-full flex flex-col justify-center mt-[430px]">
            {/* <div className="title mt-10 mb-6 font-medium">Overview</div>
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
