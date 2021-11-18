const user = require("../Schema/user");
const ProjectSchema = require("../Schema/Project");
const Middleware = {
  Authenticate: async (req, res, next) => {
    const mail = req.cookies.mail;

    try {
      await user
        .find({ emailId: mail })
        .then((result) => {
          console.log(result);
          if (result.length == 0) {
            return res
              .status(401)
              .send({ success: false, message: "UnAuthorized user" });
          } else {
            res.user = {
              id: result[0]._id,
            };
            // res.status(200).send({ success: true });
            next();
          }
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .send({ success: false, message: "Internal Server Error" });
        });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }
  },

  ProjectId: async (req, res, next) => {
    const project = req.params.project;
    const user = res.user.id;
    ProjectSchema.find({ project: project, user: user })
      .then((result) => {
        if (result.length != 0) {
          res.project = {
            id: result[0]._id,
          };
          next();
        } else {
          return res
            .status(200)
            .json({ success: false, message: "Project is not There" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      });
  },
};

module.exports = Middleware;
