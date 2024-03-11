import { FormSelect } from "@/components/Base/Form"
import { useState } from "react"

interface AddFilterProps  {
    filters:Array<any>
    setFilters:(filter:Array<any>) => void
}

interface FilterBoxs {
    name:string
    keyItem:keyof humanData
    mode:'minMax'|'list'
    list:Array<string>
}

const AddFilter:React.FC<AddFilterProps> = ({filters,setFilters}) => {
    const [openFilter,setOpenFilter] = useState(false)
    const [categoryfilter,setCategoryFilter] =useState('')
    const [lavelFilter,setLevelFilter] = useState('')

    const addFilter = () => {
        const myfilters = filters
        if(myfilters.map((val) => val.item).includes(categoryfilter)){
            myfilters[myfilters.findIndex((item) => item.item == categoryfilter)].value = lavelFilter 
            setFilters([...myfilters])
        }else{
            setFilters([...filters,{
                item:categoryfilter,
                value:lavelFilter           
            }])

        }
        // let filters = 
    }
    const filtersBox:Array<FilterBoxs>= [
        {
            name:"Risk Level",
            keyItem:'riskLevel',
            mode:'list',
            list:['Low','Moderate','High']
        },
        {
            name:"Gender",
            keyItem:'gender',
            mode:'list',
            list:['Male','Female','Other']
        },        
    ]
    return (
        <>
            {openFilter ?
                <div className="w-[376px] h-10 px-2 bg-white border border-[#E2E8F0] justify-between flex items-center rounded-[10px]">
                   <div>
                    <FormSelect  value={categoryfilter} onChange={(e) => {
                        setCategoryFilter(e.target.value)
                    }} formSelectSize="sm" className="w-[144px]">
                        <option className="hidden" value="" disabled selected>Filter Item...</option>
                        {filtersBox.map((item) => {
                            return (
                                <option  value={item.keyItem}>{item.name}</option>
                            )
                        })}
                        {/* <option value={"riskLevel"}>Risk Level</option> */}
                        {/* <option value={"riskLevel"}>Risk Category</option> */}
                        {/* <option value={"SPO2"}>SPO2</option> */}
                        {/* <option value={"RespirationRate"}>Respiration Rate</option> */}
                        {/* <option value={"BloodPressure"}>Blood Pressure</option> */}
                    </FormSelect>                    
                   </div>
                   <div>:</div>
                   <div>
                    <FormSelect value={lavelFilter} onChange={(e) => {
                        setLevelFilter(e.target.value)
                    }} formSelectSize="sm" className="w-[144px]">
                        <option className="hidden" value="" disabled selected>Filter Item...</option>
                        {filtersBox.filter((item) =>item.keyItem == categoryfilter)[0]?.list.map((item) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })}
                        {/* <option>Low</option>
                        <option>Moderate</option>
                        <option>High</option> */}
                    </FormSelect>                    
                   </div>                   
                    <div className="flex gap-1 items-center">
                        <img onClick={() => {
                            addFilter()
                            setCategoryFilter('')
                            setLevelFilter('')
                            setOpenFilter(false)                            
                            }} src="./fi_check.svg" alt="" />
                        <img className="cursor-pointer" onClick={() => {
                            setCategoryFilter('')
                            setLevelFilter('')
                            setOpenFilter(false)
                            }} src="./fi_x.svg" alt="" />
                    </div>
                </div>
            :
                <div onClick={() => {setOpenFilter(true)}} className="bg-white cursor-pointer border w-auto flex items-center px-3 py-2 rounded-[10px] border-[#E2E8F0]">
                    <img src="./filter.svg" alt="" />
                    <div className="text-xs text-[#475569] font-normal ml-1 mr-1">Add Filter</div>
                </div>               
            }
        </>
    )
}

export default AddFilter