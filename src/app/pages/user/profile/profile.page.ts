import { LibService } from './../../../providers/lib';
import { Component, OnInit } from '@angular/core';
import { USER, FireService, USER_CREATE, USER_DATA } from '../../../modules/firelibrary/core';

@Component({
  selector: 'page-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  user = <USER>{};
  loader;
  label;
  constructor( public fire: FireService, public lib: LibService ) { }

  ngOnInit() {
    if (this.fire.user.isLogin) {
      this.fire.user.data()
      .then((re: USER_DATA) => {

        this.user = re.data.user;
        // if ( this.user.profilePhoto && this.user.profilePhoto.thumbnailUrl) {
          // this.photo = this.user.profilePhoto.thumbnailUrl;
        // }

        // Set label
        if ( ! re.data.user.updated && re.data.user.created ) {
          this.label = 'Welcome! ' + re.data.user.displayName;
        } else {
          this.label = 'Update Profile';
        }

      })
      .catch(e => {
        alert('Error on getting data: ' + e.message);
      });
    } else {
      this.lib.openHomePage();
    }
  }

  onClickSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    this.loader = true;
    if (this.formValidator()) {

      this.lib.sanitize(this.user);

      this.fire.user.update(this.user)
      .then((res: USER_CREATE) => {
        // if (res.data.id) {
          this.lib.openHomePage();
          this.loader = false;
        // } else {
          // alert('Error on update return');
          // console.log('Error on update didnt return id', res);
          // this.loader = false;
        // }
      })
      .catch(e => {
        alert(e.message);
        console.error(e);
        this.loader = false;
      });

    } else {
      console.log('Validator is falsy');
      this.loader = false;
    }

  }

  formValidator() {

    if (this.validateBirthday()) {
      alert('Invalid Birthday');
      return false;
    } else if (!this.user.firstName) {
      alert('Firstname field is required.');
      return false;
    } else if (!this.user.lastName) {
      alert('Lastname field is required.');
      return false;
    } else if (!this.user.gender) {
      alert('Gender field is required.');
      return false;
    } else {
      return true;
    }

  }

  validateBirthday(): boolean {
    const now = (new Date()).getTime();
    const bday = (new Date(this.user.birthday)).getTime();
    return now < bday;
  }
}
