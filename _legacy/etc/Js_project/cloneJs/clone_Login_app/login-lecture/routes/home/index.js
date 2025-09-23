"use strict"

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

//컨트롤러
router.get("/", ctrl.home);
router.get("/login", ctrl.login);

module.exports = router;