const Sop2Analysis = (spo2Value:number) => {
    console.log(spo2Value)
    if(spo2Value<= 50) {
        return '<= 50'
    }
    if(spo2Value > 50 && spo2Value < 70){
        return '50 - 70'
    }
    if(spo2Value >= 70 && spo2Value < 90){
        return '70 - 90'
    }    
    return '>= 90'
}

const GenderAnalysis = (gendr:genderType) => {
    return gendr
}

const AgeAnalysis =(Age:ageType) => {
    return Age
}

const SwitchAnalysis = (keyitem:keyof CityData,value:any) =>{
    if(keyitem == 'SPO2'){
        return Sop2Analysis(value)
    }   

    if(keyitem == 'gender'){
        return GenderAnalysis(value)
    }

    if(keyitem == 'AgeGroup'){
        return AgeAnalysis(value)
    }
}
export {
    Sop2Analysis,
    SwitchAnalysis
}