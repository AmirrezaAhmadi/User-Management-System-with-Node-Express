const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminController");
const isAuth = require("../middlewares/isAuth");
const { checkRole } = require("../middlewares/checkRole");

router.get(
  "/getUsers",
  isAuth,
  checkRole("Admin"),
  adminControllers.getAllUsers
);

router.get(
  "/getUser/:id",
  isAuth,
  checkRole("Admin"),
  adminControllers.getOneUser
);

router.post(
  "/addUser",
  isAuth,
  checkRole("Admin"),
  adminControllers.addUser
);

router.put(
  "/editUser/:id",
  isAuth,
  checkRole("Admin"),
  adminControllers.editUser
);

router.delete(
  "/deleteUser/:id",
  isAuth,
  checkRole("Admin"),
  adminControllers.deleteUser
);


module.exports = router;
