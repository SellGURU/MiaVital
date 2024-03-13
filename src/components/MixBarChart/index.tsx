import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataItem {
  name: string;
  Normal: number;
  Suspected: number;
  AtRisk: number;
}

interface MixBarChartProps {
  data: DataItem[];
}
const MixBarChart: React.FC<MixBarChartProps> = ({ data }) => {  
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 20,
          bottom: 5,

        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
        <XAxis type="number" fontSize={12} tick={{ fill: '#9CA3AF' }} ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]} opacity={0.7} />
        <YAxis dataKey="name" type="category" fontSize={12} tick={{ fill: '#9CA3AF' }} opacity={0.7}/>
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="Normal" stackId="a" fill="#48C3B5" barSize={12} radius={[0,3,3,0]}  /> 
        <Bar dataKey="Suspected" stackId="a" fill="#FFBE13" barSize={12} radius={[0,3,3,0]}  /> 
        <Bar dataKey="AtRisk" stackId="a" fill="#FF3E5D" barSize={12} radius={[0,3,3,0]}  /> 
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MixBarChart;
