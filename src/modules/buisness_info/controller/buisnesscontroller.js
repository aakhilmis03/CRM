const { Country, State, City } = require('country-state-city');

const getCountries=async(req,res)=>{
    try {
        const countries=await Country.getAllCountries({});
        res.status(200).send({success:true, msg:'Countries Data', data: countries });
    } catch (error) {
        res.status(400).send({success:false, msg:error.message});
    }
}

const getState=async(req,res)=>{
    try {
        const {countryCode} = req.query
        const states = State.getStatesOfCountry(countryCode);
        res.status(200).send({success:true, msg:'Sate Data', data: states});
    } catch (error) {
        res.status(400).send({success:false, msg:error.message});
    }
}


const getCity=async(req,res)=>{
    try {
        const { countryCode, stateCode } = req.query;
        console.log(Object.keys(City))
        const cities = City.getCitiesOfState(countryCode, stateCode);
        res.status(200).send({success:true, msg:'Sate Data', data: cities});
    } catch (error) {
        res.status(400).send({success:false, msg:error.message});
    }
}

module.exports={
    getCountries, getState, getCity
};

