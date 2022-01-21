import { createAction, props } from "@ngrx/store";
import { BackendErrosInterface } from "src/app/shared/types/backendErrors.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { ActionTypes } from "../actionType";

export const registerAction = createAction(
    ActionTypes.REGISTER,
    props<{request: RegisterRequestInterface}>()
)

export const registerSuccessAction = createAction(
    ActionTypes.REGISTER_SUCCESS,
    props<{currentUser: CurrentUserInterface}>()
)

export const registerErrorAction = createAction(
    ActionTypes.REGISTER_ERROR,
    props<{errors: BackendErrosInterface}>()
)

