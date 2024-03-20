import { useReducer } from "react"
import { LoginPage } from "../auth/pages/LoginPage"
import { UsersPage } from "../pages/UsersPage"
import { loginReducer } from "../auth/pages/reducers/loginReducer"
import Swal from "sweetalert2"

const initialLogin={
    isAuth: false,
    user: undefined,
}

export const LoginView = () => {


   const [login,dispatch] = useReducer(loginReducer, initialLogin)
   const handlerLogin =({username,password})=>{

    if(username === 'magarciaga' && password ==='marcos127'){

        const user={username: 'magarciaga'}

        dispatch({
            type: 'login',
            payload: user,
        })    
        Swal.fire('','Login success','success')
    }else{
        Swal.fire('Error','Username y password no validos','error')
    }

   }

    return (

        <>
            {login.isAuth ? <UsersPage/> :  <LoginPage handlerLogin={handlerLogin}/>}
           
            
        </>
    )
}