import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD } from '../../shared/constants';
import { AuthService } from '../../app/auth/auth.service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private auth: AuthService) {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: new FormControl(TEST_ADMIN_EMAIL, Validators.required),
      password: new FormControl(TEST_ADMIN_PASSWORD, Validators.required)
    });
  }

  onFormSubmit() {
    this.auth.userLogin({ email: this.form.value.email, password: this.form.value.password })
      .subscribe(response => {
        this.navCtrl.push(HomePage);
      }, err => {
        // show error
      });

  }

}
