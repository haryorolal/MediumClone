import { createAction, props } from "@ngrx/store";
import { BackendErrosInterface } from "src/app/shared/types/backendErrors.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { LoginRequestInterface } from "../../types/loginRequest.interface";
import { ActionTypes } from "../actionType";

export  const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{request: LoginRequestInterface}>()
)

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<{currentUser: CurrentUserInterface}>()
)

export const loginErrorAction = createAction(
    ActionTypes.LOGIN_ERROR,
    props<{errors: BackendErrosInterface}>()
)