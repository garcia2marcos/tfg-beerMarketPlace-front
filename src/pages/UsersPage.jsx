import { useUsers } from "../hooks/useUsers"
import { UsersList } from "../components/UserList"
import { UserModalForm } from "../components/UserModalForm"
import { useEffect } from "react";


export const UsersPage = () => {


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

    useEffect(()=>{
        getUsers();

    },[]);


    return (

        <>
            {!visibleForm || 
            <UserModalForm
            userSelected={userSelected}
            initialUserForm={initialUserForm}
            handlerAddUser={handlerAddUser}
            handlerCloseForm={handlerCloseForm}
            /> }
                
            <div className="container my-4">
             
                <div className="row">

                    <div className="col">
                        {visibleForm || <button
                            className="btn btn-primary my-2"
                            onClick={handlerOpenForm}>
                            Nuevo Usuario
                        </button>}

                        {users.length === 0
                            ? <div className="alert alert-warning">No hay usuarios en el sistema</div>
                            : <UsersList
                                users={users}
                                handlerRemoveUser={handlerRemoveUser}
                                handlerUserSelectedForm={handlerUserSelectedForm}
                            />}

                    </div>
                </div>



            </div>

        </>
    )
}