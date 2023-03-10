const {requireAuth} = require('../middleware/RequireAuth.js');
const { verifyAToken, createToken} = require('../middleware/AuthenticatedUser.js');

module.exports = app => {
    var router = require("express").Router();

    const user = require("../controllers/UserControllers.js");
    router.post("/register", user.create);
    router.post("/login", user.loginUser);
    router.get("/users", user.findAll);
    router.get("/user/:id", user.findOne);
    router.put("/user/:id", user.update);
    router.delete("/user/:id", user.delete);

    const product = require('../controllers/ProductControllers');
    router.post("/product", product.create);
    router.get("/products", product.findAll);
    router.get("/product/:id", verifyAToken, requireAuth, product.findOne);
    router.put("/product/:id", product.update);
    router.delete("/product/:id", product.delete);

    app.use('/', router);
};