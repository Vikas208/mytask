const express = require("express");
const Middleware = require("../middleware/middleware");
const projectRouter = express.Router();
const projectSchema = require("../Schema/Project");
const task = require("../Schema/Task");

projectRouter.post("/add", Middleware.Authenticate, async (req, res) => {
  const user = res.user.id;
  const projectName = req.body.project;
  console.log(req.body);
  try {
    await projectSchema
      .find({})
      .where({ user: user, project: projectName })
      .then(async (result) => {
        if (result.length == 0) {
          await projectSchema
            .create({
              user: user,
              project: projectName,
            })
            .then((result) => {
              console.log(result);
              res
                .status(200)
                .json({ success: true, message: "Project Created" });
            })
            .catch((err) => {
              console.log(err);
              res.status(200).json({ success: false, message: "Try Again" });
            });
        } else {
          console.log("already Exists");
          res.status(200).json({ success: false, message: "Already Exists" });
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
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    res.end();
  }
});

projectRouter.get("/get", Middleware.Authenticate, async (req, res) => {
  const user = res.user.id;

  try {
    await projectSchema
      .find({})
      .select("project")
      .where({ user: user })
      .then((result) => {
        console.log(result);
        res.status(200).json({ success: true, message: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    res.end();
  }
});

projectRouter.delete(
  "/delete/:projectName",
  Middleware.Authenticate,
  async (req, res) => {
    const projectName = req.params.projectName;
    const user = res.user.id;
    console.log(projectName);
    try {
      projectSchema
        .find({})
        .where({ project: projectName, user: user })
        .then(async (result) => {
          console.log(result);
          if (result.length != 0) {
            await task
              .deleteMany({})
              .where({ project: result[0]._id })
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
                return;
              });

            await projectSchema
              .findByIdAndDelete({ _id: result[0]._id })
              .then((result) => {
                console.log(result);
                // res.status(200).json({ success: true, message: "Deleted" });
              })
              .catch((err) => {
                console.log(err);
                // res
                //   .status(500)
                //   .json({ success: false, message: "Internal Server Error" });
                return;
              });
          } else {
            console.log("no Project");
          }
        })
        .catch((err) => {
          console.log(err);
          // res
          //   .status(500)
          //   .json({ success: false, message: "Internal Server Error" });
          return;
        });
    } catch (err) {
      console.log(err);
      // res
      //   .status(500)
      //   .json({ success: false, message: "Internal Server Error" });
      return;
    } finally {
      res.end();
    }
  }
);
projectRouter.put(
  "/update/:oldprojectName/:newprojectName",
  Middleware.Authenticate,
  async (req, res) => {
    const projectName = req.params.oldprojectName;
    const newprojectName = req.params.newprojectName;
    const user = res.user.id;
    try {
      await projectSchema
        .findOneAndUpdate(
          { user: user, project: projectName },
          { project: newprojectName }
        )
        .then((result) => {
          if (result)
            res.status(200).json({ success: true, message: "Updated" });
          else
            res
              .status(200)
              .json({ success: false, message: "No Project is there" });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    } finally {
      res.end();
    }
  }
);

module.exports = projectRouter;
