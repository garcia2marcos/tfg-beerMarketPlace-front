import axios from "axios"

export const findAll=async()=>{

    try {
        
        const response = await axios.get('http://localhost:8080/users');
        return response

    } catch (error) {
        console.log(error);
        
    }

    return null;
   
}

export const save = async({username, email, password}) => {

    try {
        return await axios.post('http://localhost:8080/users', {
            username,
            email,
            password,
        })
    } catch (error) {
        console.log(error);
        
    }

    return null;

}

export const update = async({id,username,email})=>{


    try {
        return await axios.put(`${'http://localhost:8080/users'}/${id}`,{
            username,
            email,
        })
    } catch (error) {

        console.log(error);
        
    }

    return null;
}

export const remove = async(id)=>{

    try {
        return await axios.delete(`${'http://localhost:8080/users'}/${id}`);
    } catch (error) {

        console.log(error);
        
    }
}