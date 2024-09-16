const currenciesJSON = require("../exchangeRates.json");
const currencySearchSchema = require("../validations/exchangeConvert.js");
const axios = require('axios')

const getQueryErrors = (schema, data) => {
    const result = schema.validate(data);
    return result.error;
  };

const getExchangeCurrencies = (req, res) => {

    try {
        return res.status(200).send({data:Object.keys(currenciesJSON.rate)});
    } catch (error) {
        console.log(error)
        return res.status(500).send({message : "The service is currently down, please check again later"});
    }

   
};

const getExchangeConvert = async (req, res) => {
    try {
        const { value, currency, to_currency } = req.query; //path params /AED
        const error = getQueryErrors(currencySearchSchema, { value, currency, to_currency });
        if (error) return res.status(400).send({ message: error.details[0].message });
        const currencies = await axios.get('https://open.er-api.com/v6/latest');
        const currencyCode = currencies.data.rates;
        const currencyRate = currencyCode[currency]
        const to_currencyRate = currencyCode[to_currency];
        if(!currencyRate || !to_currencyRate) return res.status(404).send({message: "Cannot find given currency code"});
        //conversion logic
        return res.status(200).send({data:{data : (value/currencyRate) * to_currencyRate + to_currency}});


        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message : "The service is currently down, please check again later"});

    }

};

module.exports = { getExchangeCurrencies, getExchangeConvert };