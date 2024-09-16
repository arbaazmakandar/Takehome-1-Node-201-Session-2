const router = require("express").Router();
const {
    getExchangeCurrencies,
    getExchangeConvert,
} = require("../controllers/exchange.controllers");

router.get("/currencies", getExchangeCurrencies);
router.get("/convert", getExchangeConvert);

module.exports = router;