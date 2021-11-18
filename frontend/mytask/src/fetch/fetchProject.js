export const fetchProjects = async () => {
  let data = [];
  await fetch("/project/get", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      data = await res.json();
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const DeleteProject = async (project) => {
  let response = "";
  console.log("delete");
  await fetch(`/project/delete/${project}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      console.log(res);
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const fetchTask = async (project) => {
  let data = [];
  await fetch(`/task/get/${project}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      data = await res.json();
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
