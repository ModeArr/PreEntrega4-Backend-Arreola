const { Router } = require("express")
const path = require("path");
const pathDB = path.join(`${__dirname}/../products.json`)
const ProductManager = require("../ProductManager");
const products = new ProductManager(pathDB)

const router = Router()

router.get("/", (req, res) => {
    products.getProducts().then(result => {
        if (req.query.limit){
            res.status(200).json(result.slice(0,req.query.limit));
        } else{
            res.status(200).json(result);
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
})

router.get("/:pid", (req, res) => {
    const id = Number(req.params.pid)
    products.getProductById(id).then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err.message)
    })
})

router.post("/", (req, res) => {
    const newProduct = req.body
    const io = req.app.get('io');

    products.addProduct(newProduct.title, 
        newProduct.description, 
        newProduct.price, 
        newProduct.thumbnail, 
        newProduct.code, 
        newProduct.stock,
        newProduct.category,
        newProduct.status
        )
        .then(result => {
            console.log(result)
            io.emit('product created', result);
            return res.status(200).json("Se subio el producto correctamente");
        }).catch(err => {
            res.status(400).json(err.message)
        });
})

router.put("/:pid", (req, res) => {
    const editData = req.body
    const id = Number(req.params.pid)

    products.updateProduct(id, editData.field, editData.edit)
        .then(result => {
            return res.status(200).json(result);
        }).catch(err => {
            res.status(400).json(err.message)
        });
})

router.delete("/:pid", (req, res) => {
    const id = Number(req.params.pid)
    const io = req.app.get('io')

    products.deleteProduct(id)
        .then(result => {
            io.emit('product deleted', id)
            return res.status(200).json(result)
        }).catch(err => {
            res.status(400).json(err.message)
        });
})

module.exports = router