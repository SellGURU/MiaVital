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
    Suspected: 2,
    Risk: 3,
    amt: 10,
  },
  {
    name: 'Jan 12',
    Suspected: 12,
    Risk: 4,
    amt: 21,
  },
  {
    name: 'Jan 13',
    Suspected: 8,
    Risk: 3,
    amt: 6,
  },
  {
    name: 'Jan 14',
    Suspected: 8,
    Risk: 7,
    amt: 6,
  },
  {
    name: 'Jan 15',
    Suspected: 32,
    Risk: 74,
    amt: 8,
  },
  {
    name: 'Jan 16',
    Suspected: 35,
    Risk: 42,
    amt: 12,
  },
  {
    name: 'Jan 17',
    Suspected: 14,
    Risk: 25,
    amt: 7,
  },
  {
    name: 'Jan 18',
    Suspected: 35,
    Risk: 12,
    amt: 45,
  },
  {
    name: 'Jan 19',
    Suspected: 50,
    Risk: 14,
    amt: 32,
  },
  {
    name: 'Jan 20',
    Suspected: 42,
    Risk: 12,
    amt: 33,
  }
];
interface filterProps {
  item:string
  value:string
}

const TrendsChart: React.FC = () => {  
  return(
    <div className='border w-full pr-4 pt-5 pb-3 rounded-[8px]'>
      <div className='mb-2 flex justify-between'>
        <div className='ml-4  font-bold'>Trends</div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{
            top: 0,
            right: 5,
            left: 0,
            bottom: 0,
          }}
        >
          <Legend verticalAlign='top' className='mb-2' align='right' focusable  margin={{top: 0, left: 0, right: 0, bottom: 0}} />
          <CartesianGrid   strokeDasharray="1 3" vertical={false} />
          <XAxis dataKey="name" angle={0} />
          <YAxis strokeWidth={0} axisLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="Risk" stroke="#FF3E5D" activeDot={{ r: 8 }} strokeWidth={2}/>
          <Line type="monotone" dataKey="Suspected" stroke="#B1B1B9" strokeDasharray="3 3" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

    </div>

  )
}

export default TrendsChart;
