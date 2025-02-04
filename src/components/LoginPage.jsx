import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import styles from "../auth/pages/styles/login.module.css";
import image from '../images/beershopLogo.png';
import { useUsers } from '../hooks/useUsers';
import { UserModalForm } from "../components/UserModalForm";
import React, { useState } from "react";

const initialLoginForm = {
  username: '',
  password: ''
};

export const LoginPage = ({ handlerLogin }) => {
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;
  const [visibleLogin, setVisibleLogin] = useState(true);

  const {
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerCloseForm,
    handlerOpenForm,
  } = useUsers();

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      Swal.fire('Error de validación', 'Username y password requeridos', 'error');
      return;
    }
    handlerLogin({ username, password });
    setLoginForm(initialLoginForm);
  };

  const handlerVisibleLogin = () => {
    setVisibleLogin(false);
    handlerOpenForm();
  };

  const handlerShowLogin = () => {
    setVisibleLogin(true);
    handlerCloseForm();
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Failed to parse JWT", error);
      return null;
    }
  };
  
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success", credentialResponse);
    const { credential } = credentialResponse;
  
    // Decodificar manualmente
    const decodedToken = parseJwt(credential);
    console.log("Decoded Token:", decodedToken);
  
    const user = {
      username: decodedToken.name,
      email: decodedToken.email,
    };
  
    handlerLogin(user);
  
    Swal.fire("Login Successful", `Welcome, ${user.username}!`, "success");
  };
  const handleGoogleLoginError = () => {
    Swal.fire("Error", "Failed to log in with Google", "error");
  };

  return (
    <GoogleOAuthProvider clientId="104561146725-937vuflfmhr9it1h19gkunst7667b2l1.apps.googleusercontent.com">
      <>
        {visibleForm && (
          <UserModalForm
            userSelected={userSelected}
            initialUserForm={initialUserForm}
            handlerAddUser={handlerAddUser}
            handlerCloseForm={handlerCloseForm}
            handlerVisibleLogin={handlerShowLogin}
          />
        )}
        {visibleLogin && (
          <div className="d-flex justify-content-center my-4">
            <div className={styles.card}>
              <img className={styles.logo} src={image} alt="Logo" />
              <h4>Welcome!</h4>
              <form className={styles.form} onSubmit={onSubmit}>
                <input
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={onInputChange}
                />
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
                <button>Sign in</button>
              </form>
              <div className="my-3">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  size="large"
                  shape="circle"
                  text="signin_with"
                  logo_alignment="center"
                  style={{
                    backgroundColor: "#4285F4",
                    color: "white",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <footer>
                Don't have an account?{" "}
                <a href="#" onClick={handlerVisibleLogin}>Register Now</a>
              </footer>
            </div>
          </div>
        )}
      </>
    </GoogleOAuthProvider>
  );
};