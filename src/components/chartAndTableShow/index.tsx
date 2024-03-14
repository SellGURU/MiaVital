import { useState } from "react"
import MixBarChart from "../MixBarChart"
import PieChartData from "../PieChartData"
import HumanTable from '@/components/Table/HumanTable'
import StandardTable from "../Table/StandardTable"

interface ChartAndTableShowProps {
    filterHumanDataWithBounds:() => Array<humanData>
    filters:Array<filterProps>
}
const ChartAndTableShow:React.FC<ChartAndTableShowProps> =({filterHumanDataWithBounds,filters}) => {
    const [showModeData,setShowModeData] = useState<'Graph'|'List'>('Graph')
    const lower="<=";
    const uper=">=";     
    console.log(filterHumanDataWithBounds())  

    //mina
interface DataItem {
    name: string;
    Normal: number;
    Suspected: number;
    AtRisk: number;
    }
type DataArray = DataItem[];

const data1: DataArray = [
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

const data2: DataArray = [
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

const data3: DataArray = [
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

const data4: DataArray = [
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

    return (
        <>
            <div className="mb-6 mt-6 flex justify-between items-center">
                <div className="title  text-lg font-medium">{showModeData=='Graph' ? 'Overview':'Member List'} </div>
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
                        <div className="flex flex-row justify-between items-center">
                            <p>Heart Rate<span className="text-xs"> (Avg)</span></p>
                            <div className="flex flex-row items-center gap-5">
                                <div className="flex gap-1 items-center text-xs"><span className="inline-block w-8 h-1 bg-[#48C3B5]"></span>Normal</div>
                                <div className="flex gap-1 items-center text-xs"><span className="w-8 h-1 bg-[#FFBE13]"></span>Suspected</div>
                                <div className="flex gap-1 items-center text-xs"><span className="w-8 h-1 bg-[#FF3E5D]"></span>At Risk</div>
                            </div>
                        </div>
                        <MixBarChart data={data1}/>
                    </div>
                    <div className="border rounded-lg p-6 bg-white">
                        <div className="flex flex-row justify-between items-center">
                            <p>Blood Pressure<span className="text-xs"> (Avg)</span></p>
                            <div className="flex flex-row items-center gap-5">
                                <div className="flex gap-1 items-center text-xs"><span className="inline-block w-8 h-1 bg-[#48C3B5]"></span>Normal</div>
                                <div className="flex gap-1 items-center text-xs"><span className="w-8 h-1 bg-[#FFBE13]"></span>Suspected</div>
                                <div className="flex gap-1 items-center text-xs"><span className="w-8 h-1 bg-[#FF3E5D]"></span>At Risk</div>
                            </div>
                        </div>
                        <MixBarChart data={data2}/>
                    </div>
                    <div className="border rounded-lg p-6 bg-white">
                        <div className="flex flex-row justify-between items-center">
                            <p>Temperature Rate<span className="text-xs"> (Avg)</span></p>
                            <div className="flex flex-row items-center gap-5">
                                <div className="flex gap-1 items-center text-xs"><span className="inline-block w-8 h-1 bg-[#48C3B5]"></span>Normal</div>
                                <div className="flex gap-1 items-center text-xs"><span className="w-8 h-1 bg-[#FFBE13]"></span>Suspected</div>
                                <div className="flex gap-1 items-center text-xs"><span className="w-8 h-1 bg-[#FF3E5D]"></span>At Risk</div>
                            </div>
                        </div>
                        <MixBarChart data={data3}/>
                    </div>
                    <div className="border rounded-lg p-6 bg-white">
                        <div className="flex flex-row justify-between items-center">
                            <p>Respiration Rate<span className="text-xs"> (Avg)</span></p>
                            <div className="flex flex-row items-center gap-5">
                                <div className="flex gap-1 items-center text-xs"><span className="inline-block w-8 h-1 bg-[#48C3B5]"></span>Normal</div>
                                <div className="flex gap-1 items-center text-xs"><span className="w-8 h-1 bg-[#FFBE13]"></span>Suspected</div>
                                <div className="flex gap-1 items-center text-xs"><span className="w-8 h-1 bg-[#FF3E5D]"></span>At Risk</div>
                            </div>
                        </div>
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
                        <div className="flex flex-row justify-evenly lg:justify-between items-center">
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
                        <div className="flex flex-row justify-evenly lg:justify-between items-center">
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
                {/* <HumanTable applyFilters={filterHumanDataWithBounds} filterBox={filters}></HumanTable>                 */}
                 <StandardTable filterBox={filters} mode="member" applyFilters={filterHumanDataWithBounds}></StandardTable>
            </div>
            }
        </>
    )
}

export default ChartAndTableShow