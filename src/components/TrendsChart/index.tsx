import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



interface DataItem {
  name: string;
  Suspected: number;
  Risk: number;
  amt: number;
}

const data: DataItem[] = [
  {
    name: 'Jan 11',
    Suspected: 1000,
    Risk: 2500,
    amt: 2400,
  },
  {
    name: 'Jan 12',
    Suspected: 1850,
    Risk: 1300,
    amt: 2210,
  },
  {
    name: 'Jan 13',
    Suspected: 1520,
    Risk: 2600,
    amt: 2290,
  },
  {
    name: 'Jan 14',
    Suspected: 2350,
    Risk: 1500,
    amt: 2000,
  },
  {
    name: 'Jan 15',
    Suspected: 1520,
    Risk: 1800,
    amt: 2181,
  },
  {
    name: 'Jan 16',
    Suspected: 2900,
    Risk: 1100,
    amt: 2500,
  },
  {
    name: 'Jan 17',
    Suspected: 2400,
    Risk: 2450,
    amt: 2100,
  },
  {
    name: 'Jan 18',
    Suspected: 2400,
    Risk: 2100,
    amt: 3100,
  },
  {
    name: 'Jan 19',
    Suspected: 1800,
    Risk: 2500,
    amt: 3100,
  },
  {
    name: 'Jan 20',
    Suspected: 1800,
    Risk: 1950,
    amt: 3100,
  },
  {
    name: 'Jan 21',
    Suspected: 1200,
    Risk: 2510,
    amt: 3100,
  },
  {
    name: 'Jan 22',
    Suspected: 1900,
    Risk: 2200,
    amt: 3100,
  },
  {
    name: 'Jan 23',
    Suspected: 1600,
    Risk: 1700,
    amt: 3100,
  },
  {
    name: 'Jan 24',
    Suspected: 2400,
    Risk: 1950,
    amt: 3100,
  },
  {
    name: 'Jan 25',
    Suspected: 1550,
    Risk: 1700,
    amt: 3100,
  },
  {
    name: 'Jan 26',
    Suspected: 1480,
    Risk: 2500,
    amt: 3100,
  },
];
interface filterProps {
  item:string
  value:string
}

const TrendsChart: React.FC = () => {  
  return(
    // <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={1000}
          height={350}
          data={data}
          margin={{
            top: 40,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"  angle={0} />
          <YAxis strokeWidth={0} axisLine={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Risk" stroke="#FF3E5D" activeDot={{ r: 8 }} strokeWidth={2}/>
          <Line type="monotone" dataKey="Suspected" stroke="#B1B1B9" strokeDasharray="3 3" strokeWidth={2} />
        </LineChart>
    //   </ResponsiveContainer>

  )
}

export default TrendsChart;
