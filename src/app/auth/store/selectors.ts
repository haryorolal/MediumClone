import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { AuthStateInterface } from "src/app/auth/types/authState.interface";


export const authFeatureSelector = (authState: AppStateInterface): AuthStateInterface => authState.auth

export const isSubmittingSelector = createSelector(
    authFeatureSelector, (authState: AuthStateInterface) => authState.isSubmitting 
)

export const validationErrorSelector = createSelector(
    authFeatureSelector, (authState: AuthStateInterface) => authState.validationErrors
)

export const isLoggedInSelector = createSelector(
    authFeatureSelector, (authState: AuthStateInterface) => authState.isLoggedIn__
    
)

export const isAnonymousSelector = createSelector(
    authFeatureSelector, (authState: AuthStateInterface) => authState.isLoggedIn__ === false
)

export const currentUserSelector = createSelector(
    authFeatureSelector, (authState: AuthStateInterface) => authState.currentUser
)