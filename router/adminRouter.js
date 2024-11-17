const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminController");

router.get("/getUsers",  adminControllers.getAllUser);


module.exports = router;