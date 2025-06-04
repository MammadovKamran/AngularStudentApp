import { AuthService } from './../../services/model/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  frm : FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.initializeForm();
  }

  initializeForm(loginModel : any = {}){
    this.frm = this.formBuilder.group({
      email : [loginModel.email || "", [Validators.required]],
      password : [loginModel.password || "", [Validators.required]]
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
    this.authService.login(this.frm.value).subscribe(response => {
      console.log(response);
    });
  }

}
