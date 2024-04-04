import { useEffect, useState } from "react"
import styles from "../auth/pages/styles/login.module.css"
import image from '../images/beershopLogo.png'
import Swal from "sweetalert2";


export const LogInUserForm = ({ userSelected, handlerAddUser, initialUserForm, handlerCloseForm }) => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const { id, username, password, email } = userForm

    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: ''
        })
    }, [userSelected])


    const onInputChange = ({ target }) => {

        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        })

    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || (!password && id === 0) || !email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error de validacion!",
            });
            return;
        }

        //guardar userForm en el listado
        handlerAddUser(userForm)
        setUserForm(initialUserForm)
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }

    return (
        <div className='d-flex justify-content-center my-4'>
            <div className={styles.card}>
            <img className={styles.logo} src={image} alt="Logo" />
          <h4>Register now</h4>
                <form className={styles.form} onSubmit={onSubmit}>
                    <input
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onInputChange} />
                    <input
                    
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onInputChange} />

                    {id > 0 || <input
                    
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onInputChange} />}

                    {id > 0 || <input
                    
                    placeholder="Confirm password"
                    type="password"
                    name="password1"
                    onChange={onInputChange} />}

                    
                    <input type="hidden"
                        name="id"
                        value={id}
                    />
                    <button
                        type="submit">
                        {id > 0 ? 'Editar' : 'Register'}
                    </button>


                </form>
                <footer>
                Already have an account?
            <a href="#" onClick={() => onCloseForm()}> Sign in</a>
          </footer>
            </div>
        </div>
    )
}