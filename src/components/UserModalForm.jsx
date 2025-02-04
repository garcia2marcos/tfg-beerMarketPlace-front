import { LogInUserForm } from "./LogInForm";

export const UserModalForm = ({
  userSelected,
  initialUserForm,
  handlerAddUser,
  handlerCloseForm,
  handlerVisibleLogin,
}) => {
  return (
    <LogInUserForm
      handlerAddUser={handlerAddUser}
      userSelected={userSelected}
      initialUserForm={initialUserForm}
      handlerCloseForm={handlerCloseForm}
      handlerVisibleLogin={handlerVisibleLogin}
    />
  );
};
