export const UserRow=({id,username,email,handlerRemoveUser,handlerUserSelectedForm})=>{


    return(
        <tr>

                            <td>{id}</td>
                            <td>{username}</td>
                            <td>{email}</td>
                            <td>
                            <button type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={()=>handlerUserSelectedForm({
                                        id:id,
                                        username:username,
                                        email:email,
                            
                                    })}>
                                        Update
                                
                            </button>    
                            </td>
                            <td>
                            <button type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={()=> handlerRemoveUser(id)}>
                                        Remove
                                
                            </button>    
                            </td>
                        


    </tr>
    )

    
}