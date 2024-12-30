import React from 'react';
import { useState } from "react";
import Swal from "sweetalert2";
import styles from "../auth/pages/styles/login.module.css"
import image from '../images/beershopLogo.png'
import { useUsers } from '../hooks/useUsers';
import { LogInUserForm } from './LogInForm';
import { UserModalForm } from "../components/UserModalForm"

const initialLoginForm = {
  username: '',
  password: ''
}

export const LoginPage = ({ handlerLogin }) => {


  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;
  const [visibleLogin, setVisibleLogin] = useState(true);

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }

  const onSubmit = () => {
    event.preventDefault();

    if (!username || !password) {
      Swal.fire('Error de validacion', 'Username y password requeridos', 'error')
    }


    handlerLogin({ username, password });
    setLoginForm(initialLoginForm);
  }
  const {
    users,
    userSelected,
    initialUserForm,
    visibleForm,

    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers
} = useUsers();

  const handlerVisibleLogin=()=>{
    setVisibleLogin(false);
    handlerOpenForm();
  }


  return (
    <>
      {!visibleForm || (
        <UserModalForm
          userSelected={userSelected}
          initialUserForm={initialUserForm}
          handlerAddUser={handlerAddUser}
          handlerCloseForm={handlerCloseForm}
          handlerVisibleLogin={handlerVisibleLogin}
        
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
                type="text"  // Se corrige "usurname" a "text"
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
  
            <footer>
              Don't have an account?
              <a href="#" onClick={handlerVisibleLogin}> Register Now</a> 
            </footer>
          </div>
        </div>
      )}
    </>
  );

}