import React from "react";
import { Button } from "@material-ui/core";
import "./login.css";

import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signin = () => {
    auth.signInWithPopup(provider).then((result) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
        token: result.refreshToken,
      });
    }).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://lh3.googleusercontent.com/proxy/lptEFvK3ulkM7Sn58E7vQi_5EvZNIHVGXUK7KOe86UO_oE_uiki_SCE51hH4DyB1FnltRBGU4tn-ABIau_0d2pXOjWpjLAsv0UMWcOdaohDtxuZMV6s"
          alt="whatsapp_logo"
        />
        <div className="login_text">
          <h1>Signin in to WhatsApp Clone</h1>
        </div>
        <Button type="submit" onClick={signin}>Signin With Google</Button>
      </div>
    </div>
  );
};

export default Login;
