const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminController");
const isAuth = require("../middlewares/isAuth");
const { checkRole } = require("../middlewares/checkRole");

router.get(
  "/getUsers",
  isAuth,
  checkRole("admin"),
  adminControllers.getAllUsers
);

router.get(
  "/getUser/:id",
  isAuth,
  checkRole("admin"),
  adminControllers.getOneUser
);

module.exports = router;
