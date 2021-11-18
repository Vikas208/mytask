import React from "react";
import "./login.css";
import { auth, provider } from "../FireBaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useDataLayerValue } from "../DataLayer";

function Login() {
  const [{ user }, dispatch] = useDataLayerValue();
  const Signin = async () => {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        // console.log((await result.user.getIdTokenResult()).token);
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
        await fetch("/login/", {
          method: "POST",
          body: JSON.stringify({
            user: {
              accessToken: (await result.user.getIdTokenResult()).token,
              email: result.user.email,
              name: result.user.displayName,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="logo">
        <h2>My Task</h2>
      </div>
      <button
        className="login_btn"
        onClick={() => {
          Signin();
        }}
      >
        Login with Google Account
      </button>
    </div>
  );
}

export default Login;
