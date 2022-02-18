const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

//register
//password hash

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // User is found

    const existingUser = await User.findOne({ email });
    // verifing the email and passowrd hashing
    if (existingUser) {
      res.status(404).json({ status: true, msg: "User already exists !! " });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);

    //register

    const newUser = await User.create({
      name,
      email,
      password: hashedPassowrd,
    });
    res.status(200).json({
      status: true,
      msg: "User has been created successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }

  //login
  // passwored comparaison
  // token

  router.post("/login ", async (req, res) => {
    try {
      // user is found
      const user = await User.findOne({ email: req.body.email });
      //true
      if (user) {
        //verifing passowrd
        const verifypwd = await bcrypt.compare(
          req.body.password,
          user.password
        );
        //token generation
        if (verifypwd) {
          const token = await jwt.sign(
            { id: req.body.id },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            status: true,
            msg: "logged successfully ",
            token: token,
            data: user.name,
          });
        } else {
          res.status(404).json({ status: true, msg: "Wrong credentienls" });
        }
      } else {
        res.status(404).json({ status: true, msg: "User cannot be found " });
      }
    } catch (err) {
      res.status(500).json({ status: false, msg: err });
    }
  });
});

module.exports = router;
