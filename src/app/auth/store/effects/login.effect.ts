import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { AuthService } from "src/app/auth/services/auth.service";
import { loginAction, loginErrorAction, loginSuccessAction } from "src/app/auth/store/actions/login.action";


@Injectable()

export class LoginEffect {

    constructor(private actions$: Actions, private authService: AuthService, private persistanceService: PersistanceService, private router: Router){}

    login$ = createEffect( () => this.actions$.pipe(
            ofType(loginAction),
            switchMap( ({request}) => {
                return this.authService.login(request).pipe(
                    map( (currentUser: CurrentUserInterface) => {
                        this.persistanceService.set('accessToken', currentUser.token)
                        return loginSuccessAction({currentUser})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(loginErrorAction({errors: errorResponse.error.errors}))
                    })
                )
            })
        ) 
    )

    redirectAfterSubmit$ = createEffect(
        () => this.actions$.pipe(
            ofType(loginSuccessAction),
            tap(() => {
                this.router.navigateByUrl('/')
            } )
        ),
        {dispatch: false}
    )

}