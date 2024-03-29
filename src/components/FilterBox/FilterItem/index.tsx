import Lucide from "@/components/Base/Lucide"

interface FilterItemProps {
    item:filterProps
    ondelete:(item:any) => void
}
const FilterItem:React.FC<FilterItemProps> = ({item,ondelete}) => {
    return (
        <>
            <div className="bg-white border w-auto flex items-center px-3 py-2 rounded-[10px] border-[#E2E8F0]">
                <div className="text-xs text-[#475569B2]">
                    {item.mode != 'category' ?
                    <>
                        {item.item}
                    </>
                    :
                    'Risk Category'
                    }
                {item.mode == 'min' || item.mode == 'max' ?
                    <span className="ml-1 font-bold">{item.mode}</span>
                : ':'}                
                </div>

                <div className="text-xs text-[#475569] font-medium ml-1 mr-1">
                    {item.mode == 'category' ? 
                        item.item
                    :
                        item.value
                    }
                    {/* {item.value} */}
                </div>
                <Lucide onClick={() => ondelete(item)} icon="X" ></Lucide>
            </div>
        </>
    )
}

export default FilterItem