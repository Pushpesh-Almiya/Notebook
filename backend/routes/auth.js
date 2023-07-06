const express = require("express");
const router = new express.Router();
const User = require("../models/User");

//  create a user>>>
router.post("/api/auth/createuser", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send("The user is already exists");
    } else {
      const createUser = new User(req.body);
      await createUser.save();
      res.status(201).send("User register successfully");
      console.log(req.body);
    }
  } catch (error) {
    res.status(400).send("Some error occurs " + error);
  }
});

module.exports = router;
