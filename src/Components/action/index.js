import * as actionType from './Type'

export const UserLogin = (user)=>{
    return{
        type: actionType.USER_LOGGED,
        payload:{
            currentUser : user
        }
    }
}

export const Clearuser = ()=>{
    return{
        type: actionType.CLEAR_LOGGED
    }
}
export const currentgroups = (groups)=>{
    return{
        type: actionType.CURRENT_GROUP,
        payload:{
            currentgroup: groups
        }
    }
}