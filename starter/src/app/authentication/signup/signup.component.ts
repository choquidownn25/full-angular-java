import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select'
import { AuthService } from '@core/service/auth.service';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        NgClass,
        MatButtonModule,
        MatSelectModule
    ],
})
export class SignupComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  hide = true;
  chide = true;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  states: string[] = [
    'mod',
    'user',
  ];
  selectedState: string = '';
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
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
  onStateChange(event: any): void {
    this.selectedState = event.target.value;
  }
  onSubmitJava(): void {


     //Use join method to concatenate array elements with a separator

    console.log(this.form['email'].value,this.form['email'].value, this.form['password'].value, this.selectedState);
    this.authService.register(this.form['email'].value,this.form['email'].value, this.form['password'].value, this.selectedState).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/dashboard/main']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        return;
      }
    );
  }
}
