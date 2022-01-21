import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { environment } from 'src/environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  register(data: RegisterRequestInterface):Observable<CurrentUserInterface>{
    const url = environment.newUserApi + '/users';
    return this.http.post<AuthResponseInterface>(url, data).pipe(
      map( (this.getUser) )
    )
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface>{
    const url = environment.newUserApi + '/users/login'
    return this.http.post<AuthResponseInterface>(url,data).pipe(
      map( (this.getUser) )
    )
  }


}
