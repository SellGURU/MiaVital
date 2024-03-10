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
    item:'id'|'name'|'memberId'|'riskCategory'|'riskLevel'|'heartRate'|'bloodPressure'|'temperature'|'respirationRate'| 'spo2' | 'gender' | 'age'
    value:string
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
  id:string,
  CityName:string,
  HeartRate:number,
  BloodPressure:string,
  Temperature:number,
  RespirationRate:number,
  SPO2:number,
  latitude:number,
  longitude:number,
  gender:genderType
  AgeGroup:ageType
}

// "gender":{"Male":600,"Female":520,"Other":30}
// "latitude":12.9716,"longitude":77.5946