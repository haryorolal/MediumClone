import { BackendErrosInterface } from "src/app/shared/types/backendErrors.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

export interface AuthStateInterface {
    isSubmitting: boolean
    currentUser: CurrentUserInterface | null
    isLoggedIn__: boolean | null
    validationErrors: BackendErrosInterface | null
}