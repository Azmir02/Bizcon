import { combineReducers } from 'redux'
import * as actionType from '../action/Type'

const initialValue = {
    currentUser: null,
    isLoading: true
}

const CreateReducer = (state = initialValue,action)=>{
    switch(action.type){
        case actionType.USER_LOGGED:
            return{
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionType.CLEAR_LOGGED:
            return{
                ...initialValue 
            }
        default: 
            return state
    }
}

const initialValuegroup = {
    currentgroup: null
}

const groupreducer = (state = initialValuegroup,action)=>{
    switch(action.type){
        case actionType.CURRENT_GROUP:
            return{
                ...state,
                currentgroup: action.payload.currentgroup
            }
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    user: CreateReducer,
    groups: groupreducer
})

export default rootReducer