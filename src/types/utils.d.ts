type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = Omit<
  React.PropsWithChildren<AsProp<C>>,
  keyof Props
> &
  Props &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T;

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;


type filterProps = {
    item:keyof humanData
    value:string
    mode:'equal' | 'min' | 'max'
}
// "CityName":"Basavanagudi","HeartRate":54,"BloodPressure":"113/62","Temperature":36.9,"RespirationRate":17,"SPO2":88
type genderType = {
  Male:number,
  Female:number,
  Other:number
}
// "<= 18":300,"18-35":8000,"35-75":9000,">= 75":840
type ageType = {
  "<= 18":number,
  "18-35":number,
  "35-75":number,
  ">= 75":number
}

type CityData = {
  id:string
  name:string
  spo2:number
  riskLevel:string
  heartRate:number,
  DBPbloodPressure:number
  SBPbloodPressure:number
  temperature:number
  respirationRate:number
  latitude:string
  longitude:string
  membersLength:number
}

type humanData = {
  name:string
  spo2:number
  age:number
  riskLevel:string
  heartRate:number,
  DBPbloodPressure:number
  SBPbloodPressure:number
  temperature:number
  respirationRate:number
  latitude:string
  longitude:string
  gender:'Female'|'Male'|"Other"
}
                // "name": item[1][0].city,
                // "riskLevel": item[1].map(el =>el.riskLevel).sort((a,b) => item[1].filter((el) =>el.riskLevel == a).length - item[1].filter((el) =>el.riskLevel == b).length).pop(),
                // "heartRate": item[1].reduce((sum,{heartRate}) =>sum+Number(heartRate),0)/ item[1].length,
                // "DBPbloodPressure": item[1].reduce((sum,{DBPbloodPressure}) =>sum+Number(DBPbloodPressure),0)/ item[1].length,
                // "SBPbloodPressure": item[1].reduce((sum,{SBPbloodPressure}) =>sum+Number(SBPbloodPressure),0)/ item[1].length,
                // "temperature": item[1].reduce((sum,{temperature}) =>sum+Number(temperature),0)/ item[1].length,
                // "respirationRate": item[1].reduce((sum,{respirationRate}) =>sum+Number(respirationRate),0)/ item[1].length,
                // "spo2": item[1].reduce((sum,{spo2}) =>sum+Number(spo2),0) / item[1].length,
                // "latitude": item[1][0].latitude,
                // "longitude": item[1][0].longitude,
                // "city": item[1][0].city,   
// "gender":{"Male":600,"Female":520,"Other":30}
// "latitude":12.9716,"longitude":77.5946