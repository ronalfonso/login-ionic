import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TEST_USER_EMAIL } from '../../shared/constants';
import { HomeService } from './home.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public form: FormGroup;
  public firstSearch: boolean = true;
  public bookings: Array<any> = [];
  public searchTerm: string = '';

  constructor(
    public navCtrl: NavController,
    private home: HomeService,
    private formBuilder: FormBuilder) {
      this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: new FormControl(TEST_USER_EMAIL, Validators.required),
      current: new FormControl(true)
    });
  }

  search() {
    this.home.getBookings(this.form.value.email, this.form.value.current)
      .subscribe((response: Array<any>) => {
        this.firstSearch = false;
        this.bookings = response;
      }, err => {
        console.log(err);
      })
  }

  setFilteredItems() {
    this.bookings = this.home.filterBookings(this.searchTerm);
  }

}
