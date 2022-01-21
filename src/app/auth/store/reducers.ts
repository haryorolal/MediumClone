import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "src/app/auth/types/authState.interface";
import { loginAction, loginErrorAction, loginSuccessAction } from "src/app/auth/store/actions/login.action";
import { registerAction, registerErrorAction, registerSuccessAction } from "src/app/auth/store/actions/register.action";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn__: null
}

const authReducer = createReducer(initialState, 
    on(
        registerAction, 
        (state:AuthStateInterface) => ({
            ...state,
            isSubmitting: true,
            validationErrors: null
        })
    ),
    on(registerSuccessAction, (state, action):AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        isLoggedIn__: true,
        currentUser: action.currentUser
        }) 
    ),
    on(registerErrorAction, (state, action):AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors
        })
    ),
    on(loginAction, (state):AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null
        })
    ),
    on(loginSuccessAction, (state, action):AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        isLoggedIn__: true,
        currentUser: action.currentUser
        })
    ),
    on(loginErrorAction, (state, action):AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors
    }))
)

export function reducers(state: AuthStateInterface, action: Action){
    return authReducer(state, action)
}