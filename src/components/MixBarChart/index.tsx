import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import FilterItem from '../FilterBox/FilterItem';


interface DataItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

const data: DataItem[] = [
  {
    name: '180-200',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '160-180',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '140-160',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '120-140',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '100-120',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '80-100',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '60-80',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '40-60',
    uv: 2490,
    pv: 3300,
    amt: 3100,
  },
];
interface filterProps {
  item:string
  value:string
}


const MixBarChart: React.FC = () => {  
  return(
    <BarChart
      layout="vertical"
      width={517}
      height={268}
      data={data}
      margin={{
        top: 20,
        // right: 30,
        // left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" fontSize={12} tick={{ fill: '#9CA3AF' }} />
      <YAxis dataKey="name" type="category" fontSize={12} tick={{ fill: '#9CA3AF' }} />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" stackId="a" fill="#FF3E5D" barSize={12} /> 
      <Bar dataKey="amt" stackId="a" fill="#FFBE13" barSize={12} /> 
      <Bar dataKey="uv" stackId="a" fill="#48C3B5" barSize={12} /> 
    </BarChart>

  )
}

export default MixBarChart;
