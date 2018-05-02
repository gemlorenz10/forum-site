import { LibService } from './../../../providers/lib';
import { Component, OnInit } from '@angular/core';
import { FireService, USER, USER_CREATE } from '../../../modules/firelibrary/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './page.register.html',
  styleUrls: ['./page.register.scss']
})
export class RegisterPage implements OnInit {

  constructor( public fire: FireService, public lib: LibService,  public route: ActivatedRoute ) { }

  user = <USER>{};
  passwordConfirmation;
  loader = false;

  ngOnInit() {
  }

  onSubmitRegister(e) {
    if ( e ) {
       e.preventDefault();
    }
    if (this.registerValidator()) {
      this.fire.user.register(this.user)
      .then((re: USER_CREATE) => {
        if ( re.data ) {
          const u = <USER>{
            displayName: this.fire.user.displayName
          };
          return this.fire.user.create(u);
        }
      })
      .then(user => {
        if (this.route.snapshot.paramMap.get('param') === 'install') {
          this.fire.install(this.user);
        }
        return user;
      })
      .then(user => {
        if (user.data.id) {
          this.lib.openUpdateProfile();
        }
      })
      .catch(err => {
        alert('ERROR: ' + err);
        this.loader = false;
      });
    } else {
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
