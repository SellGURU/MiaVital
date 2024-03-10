import { Sop2Analysis, SwitchAnalysis } from '@/utils/analysis';
import { subscribe } from '@/utils/event';
import { describe, it } from 'node:test';
import React, { useState } from 'react';
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

const COLORS = ['#48C3B5', '#FF3E5D','#6432C9', '#FFBE13'];
const COLORSGender = ['#6432C9', '#FF3E5D', '#FFBE13'];
const COLORSAge = ['#6432C9','#48C3B5', '#FF3E5D', '#FFBE13'];
const resolveColorPlate = (panel:keyof CityData) => {
  if(panel == 'gender') {
    return COLORSGender
  }
  if(panel == 'AgeGroup'){
    return COLORSAge
  }
  return COLORS
}
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

interface PieChartCustomized {
  filterdData :() => Array<any>
  keyFilter: keyof CityData
}
const PieChartCustomized: React.FC<PieChartCustomized> = ({filterdData,keyFilter}) => {
  // const [data2,setData2] = useState(filterdData())
  // const dataMap = filterdData().map((item) => Sop2Analysis(item.SPO2))
  const resolveFinalData = (resolve:Array<any>) => {
    if(keyFilter == 'SPO2'){
      setresolveDatafinal([
       { name: '<= 50', value: resolve.filter((item) => item == '<= 50').length},
       { name: '50 - 70', value: resolve.filter((item) => item == '50 - 70').length },
       { name: '70 - 90', value: resolve.filter((item) => item == '70 - 90').length},
       { name: '>= 90', value: resolve.filter((item) => item == '>= 90').length},
    ])
    }
    if(keyFilter == 'gender'){
      setresolveDatafinal([
       { name: 'Male', value: resolve.reduce((sum,{Male}) => sum+ Male,0)},
       { name: 'Female', value: resolve.reduce((sum,{Female}) => sum+ Female,0)},
       { name: 'Other', value: resolve.reduce((sum,{Other}) => sum+ Other,0)}
    ])      
    }
    if(keyFilter == 'AgeGroup'){
      setresolveDatafinal([
       { name: '<= 18', value: resolve.reduce((sum,item:ageType) => sum+ item['<= 18'],0)},
       { name: '18 - 35', value: resolve.reduce((sum,item:ageType) => sum+ item['18-35'],0)},
       { name: '35 - 75', value:  resolve.reduce((sum,item:ageType) => sum+ item['35-75'],0)},
       { name: '>= 75', value: resolve.reduce((sum,item:ageType) => sum+ item['>= 75'],0)}
    ])      
    }    
  }
  const [resolveDatafinal,setresolveDatafinal] = useState<Array<any>>([])
  // resolveFinalData(dataMap)
  const resolveDataChart = (data2:Array<any>) => {
    let resolve = data2.map((item) => SwitchAnalysis(keyFilter,item[keyFilter]))
    resolveFinalData(resolve)
  }
  // const resolveMasklayer = (item:number) => {
  //   if(item > 95 ){
  //     return 'High'
  //   }else if(item >= 90){
  //     return 'Midrate'
  //   }
  //   return 'Low'

  // }
  subscribe("mapChange",() => {
    resolveDataChart(filterdData())
  })
  return (
    // <ResponsiveContainer width="100%" height={300}>
      <PieChart width={220} height={220}>
        <Pie
          data={resolveDatafinal}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={resolveColorPlate(keyFilter)[index % resolveColorPlate(keyFilter).length]} />
          ))}
        </Pie>
      </PieChart>
    // </ResponsiveContainer>
  );
};

export default PieChartCustomized;
