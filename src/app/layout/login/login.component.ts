import { AuthService } from './../../services/model/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  frm : FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm(loginModel : any = {}){
    this.frm = this.formBuilder.group({
      email: [loginModel.email || "", [Validators.required, Validators.email]],
      password: [loginModel.password || "", [Validators.required]],
      twoFactorCode: [null],
      twoFactorRecoveryCode: [null]
    });
      
  }

  get email(){
    return this.frm.get("email");
  }

  get password(){
    return this.frm.get("password");
  }

  LoginSubmit(){
    console.log(this.frm.value);
    this.authService.login(this.frm.value).subscribe({
      next: () => {
        // If we reach here, the request was successful (no error thrown)
        // Authorization status is already set to true in the service
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Handle error, stay on login page
        console.error('Login error:', error);
        // Authorization status is already set to false in the service
      }
    });
  }

}
