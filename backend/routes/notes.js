const express = require("express");
const router = new express.Router()

router.get("/api/auth", (req, res) => {
  obj={
    name:"pummy"
  }
    res.json(obj)
  });



  module.exports = router;