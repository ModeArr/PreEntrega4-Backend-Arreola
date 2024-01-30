const express = require("express")
const handlebars = require("express-handlebars")
const path = require("path")
const productsRoutes = require("./routes/products.routes")
const cartsRoutes = require("./routes/carts.routes")
const viewRoutes = require("./routes/views.routes")

PORT = 8080
API_PREFIX = "api"

const app = express()



app.use(express.urlencoded({ extends: true }));
app.use(express.json()); 
app.use(express.static(__dirname + '/public'))

app.engine("handlebars", handlebars.engine())
app.set("views", path.join(`${__dirname}/views`))
app.set("view engine", "handlebars")

app.use(`/${API_PREFIX}/products`, productsRoutes)
app.use(`/${API_PREFIX}/carts`, cartsRoutes)
app.use('/', viewRoutes)

app.listen(PORT, () => {
    console.log("SERVER FUNCIONANDO")
})