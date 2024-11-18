const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminController");

router.get("/getUsers",  adminControllers.getAllUser);

router.get("/getUser/:id",  adminControllers.getOneUser);


module.exports = router;