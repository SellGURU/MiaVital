import Lucide from "@/components/Base/Lucide"

interface FilterItemProps {
    item:any
    ondelete:(item:any) => void
}
const FilterItem:React.FC<FilterItemProps> = ({item,ondelete}) => {
    return (
        <>
            <div className="bg-white border w-auto flex items-center px-3 py-2 rounded-[10px] border-[#E2E8F0]">
                <div className="text-xs text-[#475569B2]">{item.item}:</div>
                <div className="text-xs text-[#475569] font-medium ml-1 mr-1">{item.value}</div>
                <Lucide onClick={() => ondelete(item)} icon="X" ></Lucide>
            </div>
        </>
    )
}

export default FilterItem