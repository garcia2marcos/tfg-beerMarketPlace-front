import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "../auth/pages/styles/login.module.css";
import image from '../images/beershopLogo.png';

export const LogInUserForm = ({
  userSelected,
  handlerAddUser,
  initialUserForm,
  handlerCloseForm,
  handlerVisibleLogin,
}) => {
  const [userForm, setUserForm] = useState(initialUserForm);
  const { id, username, password, email } = userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: ''
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || (!password && id === 0) || !email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error de validación!",
      });
      return;
    }
    handlerAddUser(userForm);
    setUserForm(initialUserForm);
    handlerVisibleLogin(); // Cambia al login al registrar un usuario.
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <div className={styles.card}>
        <img className={styles.logo} src={image} alt="Logo" />
        <h4>Register now!</h4>
        <form className={styles.form} onSubmit={onSubmit}>
          <input
            placeholder="Username"
            name="username"
            value={username}
            onChange={onInputChange}
          />
          <input
            placeholder="Email"
            name="email"
            value={email}
            onChange={onInputChange}
          />
          {id > 0 || (
            <>
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
              />
              <input
                placeholder="Confirm password"
                type="password"
                name="password1"
              />
            </>
          )}
          <input type="hidden" name="id" value={id} />
          <button type="submit">{id > 0 ? "Editar" : "Register"}</button>
        </form>
        <footer>
          Already have an account?{" "}
          <a href="#" onClick={handlerVisibleLogin}>Sign in</a>
        </footer>
      </div>
    </div>
  );
};
