import { AuthService } from './../../services/model/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent {
  frm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.initializeForm();
  }
  initializeForm(registerModel: any = {}) {
    this.frm = this.formBuilder.group({
      email: [registerModel.email || "", [Validators.required, Validators.email]],
      password: [registerModel.password || "", [Validators.required, Validators.minLength(6)]],
      confirmPassword: [registerModel.confirmPassword || "", [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }



  get email() {
    return this.frm.get("email");
  }

  get password() {
    return this.frm.get("password");
  }

  get confirmPassword() {
    return this.frm.get("confirmPassword");
  }

  RegisterSubmit() {
    if (this.frm.valid) {
  
      this.authService.register(this.frm.value).subscribe({
        next: (response) => {
          console.log(response, "register");
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
        complete: () => {
          console.log("Registration failed");
        }
      });
    }
  }
  
}
