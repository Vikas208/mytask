const express = require("express");
const login = express.Router();
const user = require("../Schema/user");

login.post("/", async (req, res) => {
  try {
    const emailId = req.body.user.email;
    const name = req.body.user.name;

    await user
      .find({ emailId: emailId })
      .then(async (result) => {
        console.log(result);
        if (result.length === 0) {
          await user
            .create({
              name: name,
              emailId: emailId,
            })
            .then((response) => {
              // console.log(response);
              res.cookie("mail", emailId, {
                expires: new Date(Date.now() + 25892000000),
              });
              res.status(200).json({ success: true, message: "Logined" });
            })
            .catch((err) => {
              console.log(err);

              res.status(500).json({ success: false, message: "Try Again" });
            });
        } else {
          res.cookie("mail", emailId, {
            expires: new Date(Date.now() + 25892000000),
          });
          res.status(200).json({ success: true, message: "Logined" });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);
  } finally {
    res.end();
  }
});

module.exports = login;
