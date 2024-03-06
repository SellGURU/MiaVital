import _ from "lodash";
import { useRef, useState } from "react";

import { TinySliderElement } from "@/components/Base/TinySlider";
import MapBox from "@/components/MapBox";
import FilterBox from "@/components/FilterBox";
import EnhancedTable from "@/components/EnhancedTable";


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
            <MapBox></MapBox>
        </div>
        <div className="w-full flex flex-col justify-center mt-[430px]">
            <EnhancedTable></EnhancedTable>
        </div>
    </div>
  );
}

export default Main;
