import { subscribe } from '@/utils/event';
import { useConstructor } from '@/utils/helper';
import { describe, it } from 'node:test';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#48C3B5', '#FF3E5D','#6432C9', '#FFBE13'];
const COLORSGender = ['#6432C9', '#FF3E5D', '#FFBE13'];
const COLORSAge = ['#6432C9','#48C3B5', '#FF3E5D', '#FFBE13'];
const resolveColorPlate = (panel:keyof humanData) => {
  if(panel == 'gender') {
    return COLORSGender
  }
  if(panel == 'age'){
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

interface PieChartData{
  filterdData :() => Array<any>
  keyFilter: keyof humanData
}
const PieChartData: React.FC<PieChartData> = ({filterdData,keyFilter}) => {
  // const [data2,setData2] = useState(filterdData())
  const dataMap = filterdData().map((item) => item[keyFilter])
  const resolveFinalData = (resolve:Array<any>) => {
    if(keyFilter == 'spo2'){
        setresolveDatafinal([
        { name: '<= 50', value: resolve.filter((item) => item <= 50).length},
        { name: '50 - 70', value: resolve.filter((item) => item > 50 && item <= 70).length },
        { name: '70 - 90', value: resolve.filter((item) => item > 70 && item <= 90).length},
        { name: '>= 90', value: resolve.filter((item) => item >= 90).length},
        ])
    }  
    if(keyFilter == 'gender'){
      setresolveDatafinal([
       { name: 'Male', value: resolve.filter((item) =>item == 'Male').length},
       { name: 'Female', value: resolve.filter((item) =>item == 'Female').length},
       { name: 'Other', value:resolve.filter((item) =>item == 'Other').length}
    ])            
    }
    if(keyFilter == 'age'){
      setresolveDatafinal([
       { name: '<= 18', value: resolve.filter((item) =>item <= 18).length},
       { name: '18 - 35', value: resolve.filter((item) =>item > 18 && item <= 35).length},
       { name: '35 - 75', value: resolve.filter((item) =>item > 35 && item <= 75).length},
       { name: '>= 75', value:resolve.filter((item) =>item >= 75).length}
    ])            
    }    
  }
  const [resolveDatafinal,setresolveDatafinal] = useState<Array<any>>([])
  useConstructor(() => {
    resolveFinalData(dataMap)
  })
  const resolveDataChart = (data:Array<any>) => {
    let resolve = data.map((item) => item[keyFilter])
    console.log(resolve)
    // let resolve = data2.map((item) => SwitchAnalysis(keyFilter,item[keyFilter]))
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
          {resolveDatafinal.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={resolveColorPlate(keyFilter)[index % resolveColorPlate(keyFilter).length]} />
          ))}
        </Pie>
      </PieChart>
    // </ResponsiveContainer>
  );
};

export default PieChartData;
