/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import Litepicker from "litepicker";
import { LitepickerElement, LitepickerProps } from "./index";

// interface Picker extends Litepicker {
//   on?: (
//     event: string,
//     cb: (
//       startDate: {
//         dateInstance: Date;
//       },
//       endDate: {
//         dateInstance: Date;
//       }
//     ) => void
//   ) => {};
// }

const getDateFormat = (format: string | undefined) => {
  return format !== undefined ? format : "D MMM, YYYY";
};

const setValue = (props: LitepickerProps) => {
  const format = getDateFormat(props.options.format);
  if (!props.value.length) {
    let date = dayjs().format(format);
    date +=
      !props.options.singleMode && props.options.singleMode !== undefined
        ? " - " + dayjs().add(1, "month").format(format)
        : "";
    props.onChange(date);
  }
};

const init = (el: LitepickerElement, props: LitepickerProps) => {
  const format = getDateFormat(props.options.format);
  el.litePickerInstance = new Litepicker({
    ...props.options,
    element: el,
    format: format,
    setup: (picker: any) => {
      if (picker.on) {
        picker.on("selected", (startDate: { dateInstance: string | number | Date | dayjs.Dayjs | null | undefined; }, endDate: { dateInstance: string | number | Date | dayjs.Dayjs | null | undefined; } | undefined) => {
          let date = dayjs(startDate.dateInstance).format(format);
          date +=
            endDate !== undefined
              ? " - " + dayjs(endDate.dateInstance).format(format)
              : "";
          props.onChange(date);
        });
      }
    },
  });
};

const reInit = (el: LitepickerElement, props: LitepickerProps) => {
  el.litePickerInstance.destroy();
  init(el, props);
};

export { setValue, init, reInit };
