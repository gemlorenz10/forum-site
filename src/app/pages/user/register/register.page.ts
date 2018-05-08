import { LibService } from './../../../providers/lib';
import { Component, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FireService, USER, USER_CREATE } from '../../../modules/firelibrary/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  constructor( public fire: FireService, public lib: LibService,  public route: ActivatedRoute ) { }

  user = <USER>{};
  passwordConfirmation;
  loader = false;
  param = this.route.snapshot.paramMap.get('param');

  ngOnInit() {
    console.log(this.param);
  }

  onSubmitRegister(e) {
    if ( e ) {
      e.preventDefault();
    }
    this.loader = true;
    if (this.registerValidator()) {
      this.fire.user.register(this.user)
      // initialize/create a user collection in firestore
      .then((re: USER_CREATE) => {
        if ( re.data ) {
          const u = <USER>{
            displayName: this.fire.user.displayName
          };
          return this.fire.user.create(u);
        }
      })
      // install if necessesary - initializing admin account
      .then(user => {
        if ( this.param === 'install') {
          this.fire.install(this.user);
        }
        return user;
      })
      // open update profile page
      .then(user => {
        return this.fire.auth.onAuthStateChanged(u => {
          if (u) {
            console.log('Auth State: Logged in', u);
            this.lib.openUpdateProfile();
          } else {
            this.lib.openInstallPage();
            console.log('Auth state: Logged out');
          }
        });
      })
      // unsubscribe to auth listener
      .then(unsubscribe => {
        unsubscribe();
        this.loader = false;
      })
      .catch(err => {
        this.lib.failure(e, 'Error on user registration');
        this.loader = false;
      });
    } else { // if register validator fails
      this.loader = false;
    }
  }
  private registerValidator() {
    if (!this.user.email) {
      alert('Email field is required');
      return false;
    } else if (!this.user.password) {
      alert('Password field is required.');
      return false;
    } else if (this.user.password !== this.passwordConfirmation ) {
      alert('Password did not match!');
      return false;
    } else if (!this.user.displayName) {
      alert('Display name field is required!');
      return false;
    } else {
      return true;
    }
  }
}
