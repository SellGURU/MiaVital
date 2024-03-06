import _ from "lodash";
import { useRef, useState } from "react";

import { TinySliderElement } from "@/components/Base/TinySlider";
import MapBox from "@/components/MapBox";
import FilterBox from "@/components/FilterBox";
import EnhancedTable from "@/components/EnhancedTable";
import LeafletMap from "@/components/LeafletMap";


function Main() {
  const [salesReportFilter, setSalesReportFilter] = useState<string>();
  const importantNotesRef = useRef<TinySliderElement>();
  const prevImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("prev");
  };
  const nextImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("next");
  };

  return (
    <div className="w-full">
        <div className="my-6 w-full">
            <FilterBox></FilterBox>

        </div>
        <div className="w-full flex justify-center">
          <div className="p-5 w-full mt-12 intro-y box sm:mt-5">
            <LeafletMap className="h-[410px] mt-5 rounded-md bg-slate-200" />
          </div>
        </div>
        <div className="w-full flex flex-col justify-center mt-[32px]">
            <EnhancedTable></EnhancedTable>
        </div>
    </div>
  );
}

export default Main;
