import { useState } from "react";
import Litepicker from "../../Litepicker";

const DatePicker = () => {
  const [day, setDay] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <>
        <Litepicker
        className="text-xs cursor-pointer border-none"
        value={`${day.startDate.toLocaleDateString()} - ${day.endDate.toLocaleDateString()}`}
        onChange={(value) => {
            const [startDateString, endDateString] = value.split(" - ");
            setDay({
            startDate: new Date(startDateString),
            endDate: new Date(endDateString),
            });
        }}
        options={{
            autoApply: false,
            format: "YYYY-MM-DD",
            singleMode: false,
            numberOfColumns: 1,
            numberOfMonths: 2,
            showWeekNumbers: true,
            dropdowns: {
            minYear: 1990,
            maxYear: null,
            months: true,
            years: true,
            },
        }}
        />
    </>
  );
};

export default DatePicker;
