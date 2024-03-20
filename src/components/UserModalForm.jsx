import { LogInUserForm } from "./LogInForm";

export const UserModalForm =({userSelected,initialUserForm,handlerAddUser,handlerCloseForm})=>{


    return(
        <div className="abrir-modal animacion fadeIn">
                    <div className="modal" style={{display: "block"}}  tabIndex="-1">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {userSelected.id > 0 ? 'Editar':'Crear nuevo'} Modal Usuarios

                                    </h5>

                                </div>
                                <div className="modal-body">
                                <LogInUserForm
                                handlerAddUser={handlerAddUser}
                                userSelected={userSelected}
                                initialUserForm={initialUserForm}
                                handlerCloseForm={handlerCloseForm}
                            />


                                </div>

                            </div>


                        </div>


                    </div>

                </div>

    );
}