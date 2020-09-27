import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import "./login.css";

import { auth, provider } from "../../firebase";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/login/login.actions";

const Login = () => {
  const loginUser = useSelector((state) => state.loginUser);
  const { user } = loginUser;

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(login(user));
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [user]);

  const signin = () => {
    auth.signInWithPopup(provider).then((result) => {
      dispatch(login(result.user));
    }).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://whatsappbrand.com/wp-content/themes/whatsapp-brc/images/WhatsApp_Logo_1.png"
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
