import { FormSelect } from "@/components/Base/Form"
import { useState } from "react"

interface AddFilterProps  {
    filters:Array<any>
    setFilters:(filter:Array<any>) => void
}

const AddFilter:React.FC<AddFilterProps> = ({filters,setFilters}) => {
    const [openFilter,setOpenFilter] = useState(false)
    const [categoryfilter,setCategoryFilter] =useState('Risk Level')
    const [lavelFilter,setLevelFilter] = useState('Low')

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
    return (
        <>
            {openFilter ?
                <div className="w-[376px] h-10 px-2 bg-white justify-between flex items-center rounded-[10px]">
                   <div>
                    <FormSelect value={categoryfilter} onChange={(e) => {
                        setCategoryFilter(e.target.value)
                    }} formSelectSize="sm" className="w-[144px]">
                        <option value={"Risk Level"}>Risk Level</option>
                        <option value={"Risk Category"}>Risk Category</option>
                        <option value={"SPO2"}>SPO2</option>
                        <option value={"Respiration Rate"}>Respiration Rate</option>
                        <option value={"Blood Pressure"}>Blood Pressure</option>
                    </FormSelect>                    
                   </div>
                   <div>:</div>
                   <div>
                    <FormSelect value={lavelFilter} onChange={(e) => {
                        setLevelFilter(e.target.value)
                    }} formSelectSize="sm" className="w-[144px]">
                        <option>Low</option>
                        <option>Midrate</option>
                        <option>High</option>
                    </FormSelect>                    
                   </div>                   
                    <div className="flex gap-1 items-center">
                        <img onClick={() => {addFilter()}} src="./fi_check.svg" alt="" />
                        <img className="cursor-pointer" onClick={() => {setOpenFilter(false)}} src="./fi_x.svg" alt="" />
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