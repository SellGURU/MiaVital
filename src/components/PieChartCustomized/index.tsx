import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

const data: DataItem[] = [
  
  { name: 'Group A', value: 13 },
  { name: 'Group B', value: 12 },
  { name: 'Group C', value: 62 },
  { name: 'Group D', value: 13 },
];

const COLORS = ['#6432C9', '#FF3E5D', '#48C3B5', '#FFBE13'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
// interface filterProps {
//   item:string
//   value:string
// }
// const resolveFilterRate=(FilterItem:filterProps,item:any)=>{
//   switch(FilterItem.item){
//     case 'SPO2' :
//       if(Number(item[FilterItem.item]) >= 90) {
//         return 'yellow'
//       }
//       if(Number(item[FilterItem.item]) > 70 && Number(item[FilterItem.item]) < 90) {
//         return 'purple'
//       }
//       if(Number(item[FilterItem.item]) > 50 && Number(item[FilterItem.item]) <= 70) {
//         return 'red'
//       }
//       return 'green'

//     case 'Gender' :
//       if(item[FilterItem.item] = "Male") {
//         return 'blue'
//       }
//       if(item[FilterItem.item] = "Female") {
//         return 'red'
//       }
//       return 'yellow'

//     case 'Age' :
//       if(Number(item[FilterItem.item]) >= 75) {
//         return 'yellow'
//       }
//       if(Number(item[FilterItem.item]) > 35 && Number(item[FilterItem.item]) < 75) {
//         return 'red'
//       }
//       if(Number(item[FilterItem.item]) > 18 && Number(item[FilterItem.item]) <= 35) {
//         return 'green'
//       }
//       return 'purple'
//   }
// } 
const PieChartCustomized: React.FC = () => {

  return (
    // <ResponsiveContainer width="100%" height={300}>
      <PieChart width={220} height={220}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    // </ResponsiveContainer>
  );
};

export default PieChartCustomized;
