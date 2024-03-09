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
  return (
    <div className="w-full">
        <div className="my-6 w-full">
            <FilterBox></FilterBox>
        </div>
        <div className="w-full flex justify-center">
            <MapBox></MapBox>
        </div>
        <div className="w-full flex flex-col justify-center mt-[430px]">
            <div className="title mt-10 mb-6 font-medium">Overview</div>
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
                <PieChartCustomized/>
              </div>    
              <div className="border rounded-lg p-6 bg-white">
                Gender
                <PieChartCustomized/>
              </div> 
              <div className="border rounded-lg p-6 bg-white">
                Age
                <PieChartCustomized/>
              </div>         
            </div>

            <EnhancedTable applyFilter={filterdItems}></EnhancedTable>
        </div>
    </div>
  );
}

export default Main;
