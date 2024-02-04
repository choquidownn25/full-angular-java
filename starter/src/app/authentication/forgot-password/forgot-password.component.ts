import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        NgClass,
        MatButtonModule,
    ],
})
export class ForgotPasswordComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
  }
  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.router.navigate(['/dashboard/main']);
    }
  }
  onSubmitForgotPassword() {
    this.submitted = true;
    // stop here if form is invalid
    this.authService.forgotPassword(this.form['email'].value).subscribe(
      data => {

        //this.reloadPage();
        this.router.navigate(['/authentication/signin'], {
          relativeTo: this.route,
        });
      },
      (error: HttpErrorResponse) => {

          console.log (error.name + ' ' + error.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!' + "\n" + error.name + ' ' + error.message,
            footer: '<a href="">Why do I have this issue?</a>'
          })


      }
    );
  }
}
