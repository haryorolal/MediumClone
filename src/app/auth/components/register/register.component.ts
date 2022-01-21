import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrosInterface } from 'src/app/shared/types/backendErrors.interface';
import { registerAction } from '../../store/actions/register.action';
import { isSubmittingSelector, validationErrorSelector } from '../../store/selectors';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(form){
    console.log(form.value)
    const request: RegisterRequestInterface = {
      user: form.value
    }
    this.store.dispatch(registerAction( {request} ))
  }

}
