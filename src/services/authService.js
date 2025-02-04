import axios from "axios";


export const loginUser =({username,password})=>{

    return (username === 'admin' && password ==='admin');
}

export const verifyLogIn = async ({ username, password }) => {
    console.log(username, password);
  
    try {
      const response = await axios.get(`http://localhost:8080/users/${username}/${password}`);
      console.log(response);
  
      // Si la respuesta es válida, devolvemos true
      return true;
    } catch (error) {
      // Inspeccionamos el error
      if (error.response && error.response.status === 404) {
        console.log('Usuario no encontrado');
        return false;
      }
  
      // Logueamos otros posibles errores
      console.error('Error en la solicitud:', error);
      return false; // Devuelve false en caso de cualquier error
    }
  };
  