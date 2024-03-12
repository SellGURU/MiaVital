import { useState } from "react"
import MixBarChart from "../MixBarChart"
import PieChartData from "../PieChartData"
import HumanTable from '@/components/Table/HumanTable'

interface ChartAndTableShowProps {
    filterHumanDataWithBounds:() => Array<humanData>
    filters:Array<filterProps>
}
const ChartAndTableShow:React.FC<ChartAndTableShowProps> =({filterHumanDataWithBounds,filters}) => {
    const [showModeData,setShowModeData] = useState<'Graph'|'List'>('Graph')
    const lower="<=";
    const uper=">=";     
    console.log(filterHumanDataWithBounds())  
    return (
        <>
            <div className="mb-6 mt-6 flex justify-between items-center">
                <div className="title  text-lg font-medium">Overview</div>
                <div>
                    <div className="border flex items-center justify-between px-2 border-[#E2E8F0] w-[222px] h-12 rounded-[5px]">
                        <div onClick={(() => setShowModeData('List'))} className={` ${showModeData == 'List' ?'text-white' :'#30445B'}  ${showModeData == 'List' ?'opacity-100' :'opacity-50'}text-sm ${showModeData == 'List' ?'bg-[#48C3B5] ' :''} flex items-center cursor-pointer rounded-[5px] h-8 px-4`}>List View</div>
                        <div onClick={(() => setShowModeData('Graph'))} className={` ${showModeData == 'Graph' ?'text-white' :'#30445B'}  ${showModeData == 'Graph' ?'opacity-100' :'opacity-50'}text-sm ${showModeData == 'Graph' ?'bg-[#48C3B5] ' :''} flex items-center cursor-pointer rounded-[5px] h-8 px-4`}>Graph View</div>
                    </div>
                </div>
            </div>
            {showModeData == 'Graph' ?
                <>
                    <div className="grid lg:grid-cols-2 grid-flow-row gap-4 ">
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
                </>
            :
            <div>
                <HumanTable applyFilters={filterHumanDataWithBounds} filterBox={filters}></HumanTable>                
            </div>
            }
        </>
    )
}

export default ChartAndTableShow