import { FormSelect } from "@/components/Base/Form"
import { useState } from "react"

interface AddFilterProps  {
    filters:Array<filterProps>
    setFilters:(filter:Array<filterProps>) => void
}

interface FilterBoxs {
    name:string
    keyItem:keyof humanData
    mode:'minMax'|'list'
    list:Array<string>
}

const AddFilter:React.FC<AddFilterProps> = ({filters,setFilters}) => {
    const [openFilter,setOpenFilter] = useState(false)
    const [categoryfilter,setCategoryFilter] =useState<keyof humanData | ''>('')
    const [lavelFilter,setLevelFilter] = useState('')
    const [minimum,setMinimum] =useState('')
    const [maximum,setMaximum] = useState('')

    const addFilter = () => {
        const myfilters = filters
        if(categoryfilter != '') {
            if(filtersBox.filter((item) => item.keyItem == categoryfilter)[0].mode == 'list'){
                if(lavelFilter != ''){
                    if(myfilters.map((val) => val.item).includes(categoryfilter)){
                        myfilters[myfilters.findIndex((item) => item.item == categoryfilter)].value = lavelFilter 
                        setFilters([...myfilters])                    
                    }else{
                        setFilters([...filters,{
                            item:categoryfilter,
                            value:lavelFilter,
                            mode:'equal'          
                        }])                    
                    }
                }
            }else if(filtersBox.filter((item) => item.keyItem == categoryfilter)[0].mode == 'minMax'){
                const newArray =filters
                if(minimum != ''){
                    if(myfilters.filter((item) => item.item ==categoryfilter && item.mode == 'min').length > 0){
                        myfilters[myfilters.findIndex((item) => item.item == categoryfilter && item.mode == 'min')].value = minimum 
                        setFilters([...myfilters])                           
                    }else {
                        newArray.push({
                            item:categoryfilter,
                            value:minimum,
                            mode:'min'                            
                        })                        
                    }
                }
                if(maximum != ''){
                    if(myfilters.filter((item) => item.item ==categoryfilter && item.mode == 'max').length >0){
                        myfilters[myfilters.findIndex((item) => item.item == categoryfilter && item.mode == 'max')].value = maximum 
                        setFilters([...myfilters])                           
                    }else {
                        newArray.push({
                            item:categoryfilter,
                            value:maximum,
                            mode:'max'                            
                        })                        
                    }
                }  
                setFilters([...newArray])                  
            }
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
        {
            name:"SPO2",
            keyItem:'spo2',
            mode:'minMax',
            list:['50','60','70','80','90','100']
        },    
        {
            name:"Heart Rate",
            keyItem:'heartRate',
            mode:'minMax',
            list:['40','60','80','100','120','140','160','180','200']
        }, 
        {
            name:"Temperature",
            keyItem:'temperature',
            mode:'minMax',
            list:['30','31','32','33','34','35','36','37','38','39','40']
        }, 
        {
            name:"DBP Blood Pressure",
            keyItem:'DBPbloodPressure',
            mode:'minMax',
            list:['60','70','80','90','100','110','120']
        },  
        {
            name:"SBP Blood Pressure",
            keyItem:'SBPbloodPressure',
            mode:'minMax',
            list:['100','110','120','130','140','150','160','170','180']
        },                 
        {
            name:"Respiration Rate",
            keyItem:'respirationRate',
            mode:'minMax',
            list:['10','20','30']
        },       
        {
            name:"Age",
            keyItem:'age',
            mode:'minMax',
            list:['0','10','18','25','30','35','45','55','65','75','85','95','100']
        },                                                    
    ]
    return (
        <>
            {openFilter ?
                <div className="min-w-[376px] h-10 px-2 bg-white border border-[#E2E8F0] justify-between flex items-center rounded-[10px]">
                   <div>
                    <FormSelect  value={categoryfilter} onChange={(e) => {
                        setCategoryFilter(e.target.value as keyof humanData)
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
                   <div className="mx-2">:</div>
                   <div>
                    {
                        filtersBox.filter((item) => item.keyItem == categoryfilter)[0]?.mode == 'minMax'?
                 
                            <div className="flex ">
                                <FormSelect value={minimum} onChange={(e) => {
                                    setMinimum(e.target.value)
                                }} formSelectSize="sm" className="w-[130px] mr-2">
                                    <option className="hidden" value="" disabled selected>Minimum</option>
                                    {filtersBox.filter((item) =>item.keyItem == categoryfilter)[0]?.list?.map((item) => {
                                        return (
                                            <option value={item}>{item}</option>
                                        )
                                    })}                                
                                </FormSelect>
                                <FormSelect  value={maximum} onChange={(e) => {
                                    setMaximum(e.target.value)
                                }}  formSelectSize="sm" className="w-[130px] mr-2">
                                    <option className="hidden" value="" disabled selected>Maximum</option>
                                    {filtersBox.filter((item) =>item.keyItem == categoryfilter)[0]?.list.filter((item) => Number(item) > Number(minimum)).map((item) => {
                                        return (
                                            <option value={item}>{item}</option>
                                        )
                                    })}                               
                                </FormSelect>                                
                            </div>
                        :
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
                    }
                   </div>                   
                    <div className="flex gap-1 items-center">
                        <img onClick={() => {
                            addFilter()
                            setCategoryFilter('')
                            setLevelFilter('')
                            setMaximum('')
                            setMinimum('')
                            setOpenFilter(false)                            
                            }} src="./fi_check.svg" alt="" />
                        <img className="cursor-pointer" onClick={() => {
                            setCategoryFilter('')
                            setLevelFilter('')
                            setMaximum('')
                            setMinimum('')                            
                            setOpenFilter(false)
                            }} src="./fi_x.svg" alt="" />
                    </div>
                </div>
            :
                <div onClick={() => {setOpenFilter(true)}} className="bg-white cursor-pointer h-10 border w-auto flex items-center px-3 py-2 rounded-[10px] border-[#E2E8F0]">
                    <img src="./filter.svg" alt="" />
                    <div className="text-xs text-[#475569] font-normal ml-1 mr-1">Add Filter</div>
                </div>               
            }
        </>
    )
}

export default AddFilter