import { useReducer } from "react"
import { loginReducer } from "../auth/pages/reducers/loginReducer"
import Swal from "sweetalert2"


const initialLogin= JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}

export const useLogIn=()=>{

    const [login,dispatch] = useReducer(loginReducer, initialLogin)
    const handlerLogin =({username,password})=>{

 
     if(username === 'magarciaga' && password ==='Supermessi47.'){
 
         const user={username: 'magarciaga'}
 
         dispatch({
             type: 'login',
             payload: user,
         })  
         sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            user
         }))  
         Swal.fire('','Login success','success')
     }else{
         Swal.fire('Error','Username y password no validos','error')
     }
 
    }

    const handlerLogOut =()=>{

        dispatch({
            type: 'logout',
        })
        sessionStorage.removeItem('login')

    }

    return(
        login,

        handlerLogin,
        handlerLogOut

    )


}