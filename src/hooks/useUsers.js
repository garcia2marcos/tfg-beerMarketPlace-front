import {
    useReducer,
    useState
} from "react"
import {
    usersReducer
} from "../reducers/usersReducer"
import Swal from "sweetalert2"

const initialUsers = JSON.parse(sessionStorage.getItem('form'))||[]
const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
}


export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers)
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false)

    const handlerAddUser = (user) => {

        let type;

        if (user.id === 0) {
            type = 'addUser';
        } else {
            type = 'updateUser'
        }
        dispatch({
            type: type,
            payload: user,
        })

        Swal.fire(
            (user.id === 0) ? 'Usuario creado!' : 'Usuario Actualizado',
            (user.id === 0) ? 'El usuario se ha creado con exito!' : 'El usuario ha sido actualizado con exito',
            "success"
        );

        handlerCloseForm();
    }

    const handlerRemoveUser = (id) => {
        console.log(id)

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch({
                        type: 'removeUser',
                        payload: id,
                    })
                    Swal.fire({
                        title: "Usuario eliminado!",
                        text: "Usuario eliminado con exito.",
                        icon: "success"
                    });
                }
            });
    }

    const handlerUserSelectedForm = (user) => {
        //console.log(user)
        setVisibleForm(true)
        setUserSelected({
            ...user
        })

    }

    const handlerOpenForm=()=>{
        setVisibleForm(true);
    }

    const handlerCloseForm=()=>{
        setVisibleForm(false);
        setUserSelected(initialUserForm);
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm
    }
}