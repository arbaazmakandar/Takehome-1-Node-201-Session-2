const express = require('express');
const app = express();
const PORT = 8082;
const exchangeRouter = require("./routes/exchange.routes");

app.use("/exchange", exchangeRouter);

app.listen(PORT, ()=>{
    console.log(`Server Listening on PORT, ${PORT}`);
})