const express = require("express");
const task = express.Router();
const Middleware = require("../middleware/middleware");
const taskSchema = require("../Schema/Task");
const ProjectSchema = require("../Schema/Project");
const { response } = require("express");

task.post(
  "/addTask/:project",
  [Middleware.Authenticate, Middleware.ProjectId],
  async (req, res) => {
    const { title, description } = req.body;
    const user = res.user.id;
    const id = res.project.id;
    try {
      await taskSchema
        .find({})
        .where({ user: user, project: id, title: title })
        .then(async (response) => {
          if (response.length == 0) {
            await taskSchema
              .create({
                user: user,
                project: id,
                title,
                description,
                time: new Date(Date.now()),
                isComplete: false,
              })
              .then((result) => {
                //  console.log(result);
                res
                  .status(200)
                  .json({ success: true, message: "Task Created" });
              })
              .catch((err) => {
                console.log(err);
                res
                  .status(500)
                  .json({ success: false, message: "Internal Server Error" });
              });
          } else {
            res
              .status(200)
              .json({ success: false, message: "Title is Available" });
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
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    } finally {
      res.end();
    }
  }
);

task.delete(
  "/deleteTask/:project",
  [Middleware.Authenticate, Middleware.ProjectId],
  async (req, res) => {
    const project = res.project.id;
    const user = res.user.id;
    const { title } = req.body;

    try {
      await taskSchema
        .findOneAndDelete({ user: user, title: title, project: project })
        .then((result) => {
          console.log(result);
          if (result) {
            res.status(200).json({ success: true, message: "Task Delete" });
          } else {
            res
              .status(200)
              .json({ success: false, message: "No Task is Available" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    } finally {
      res.end();
    }
  }
);

task.put(
  "/updateTask/:project",
  [Middleware.Authenticate, Middleware.ProjectId],
  async (req, res) => {
    const title = req.body.title;
    const projectId = res.project.id;
    const user = res.user.id;
    const desc = req.body.newDescription;
    console.log(desc);
    try {
      const response = await taskSchema.findOneAndUpdate(
        { project: projectId, user: user, title: title },
        { description: desc, time: new Date(Date.now()) }
      );
      console.log(response);
      res.status(200).json({ success: true, message: "Updated" });
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

task.get(
  "/get/:project",
  [Middleware.Authenticate, Middleware.ProjectId],
  async (req, res) => {
    const user = res.user.id;
    const project = res.project.id;

    try {
      await taskSchema
        .find({})
        .where({ user: user, project: project })
        .then((result) => {
          if (result) {
            res.status(200).json({ success: true, message: result });
          } else {
            res.status(200).json({ success: false, message: "Empty" });
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
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    } finally {
      res.end();
    }
  }
);

task.put(
  "/changeTitle/:project/",
  [Middleware.Authenticate, Middleware.ProjectId],
  async (req, res) => {
    const titleName = req.body.title;
    const newTitleName = req.body.newtitle;
    const project = res.project.id;
    const user = res.user.id;

    try {
      await taskSchema
        .find({})
        .where({ user: user, project: project, title: newTitleName })
        .then(async (response) => {
          if (response.length === 0) {
            const result = await taskSchema.findOneAndUpdate(
              { user: user, project: project, title: titleName },
              { title: newTitleName, time: new Date(Date.now()) }
            );
            console.log(result);
            res.status(200).json({ success: true, message: "Title Update" });
          } else {
            res
              .status(200)
              .json({ success: false, message: "Title is in Used" });
          }
        })
        .catch((err) => {
          console.log(err);
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

task.put(
  "/changeState/:project/:state",
  [Middleware.Authenticate, Middleware.ProjectId],
  async (req, res) => {
    const titleName = req.body.title;
    const project = res.project.id;
    const user = res.user.id;
    const state = res.params.state;
    try {
      taskSchema
        .findOneAndUpdate(
          { user: user, project: project, title: titleName },
          { isComplete: state, time: new Date(Date.now()) }
        )
        .then((result) => {
          console.log(result);
          if (result) {
            res.status(200).json({ success: true, message: "State Updated" });
          } else {
            res.status(200).json({ success: false, message: "no title" });
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
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    } finally {
      res.end();
    }
  }
);
module.exports = task;
