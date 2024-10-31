const express = require("express");
const router = express.Router();

router.post('/register')

router.post('/login')

router.post('/logout')

router.get('/profile')

//Edit Profile
router.put('/profile')

router.delete('/profile')

router.post('/forgot-password')

router.post('/reset-password')

module.exports=router;