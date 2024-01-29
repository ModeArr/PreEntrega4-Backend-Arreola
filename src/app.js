const express = require("express")
const productsRoutes = require("./routes/products.routes")
const cartsRoutes = require("./routes/carts.routes")

PORT = 8080
API_PREFIX = "api"

const app = express()

app.use(express.urlencoded({ extends: true }));
app.use(express.json()); 
app.use(express.static(__dirname + '/public'))

app.use(`/${API_PREFIX}/products`, productsRoutes)
app.use(`/${API_PREFIX}/carts`, cartsRoutes)

app.listen(PORT, () => {
    console.log("SERVER FUNCIONANDO")
})