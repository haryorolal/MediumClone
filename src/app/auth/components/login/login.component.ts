import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrosInterface } from 'src/app/shared/types/backendErrors.interface';
import { isSubmittingSelector, validationErrorSelector } from 'src/app/auth/store/selectors';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { loginAction } from '../../store/actions/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrosInterface | null>

  constructor(private formbuild: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.setFormState();
    this.initializeValues()
  }

  initializeValues(): void{
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector) );
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
  }

  setFormState(): void{
    this.form = this.formbuild.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(form){
    const request: LoginRequestInterface = {
      user: form.value
    }
    this.store.dispatch(loginAction( {request} ))
  }


}
