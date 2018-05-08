import { LibService } from './providers/lib';
import { Component, OnInit } from '@angular/core';
import { FireService } from './modules/firelibrary/core';
import { POST_PAGE_OPTIONS } from './modules/firelibrary/providers/etc/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ForumSite';
  installed;
  constructor( public lib: LibService, public fire: FireService ) {
  }
  ngOnInit() {
    this.initApp();
  }

  initApp() {
    this.fire.checkInstall()
    .then( re => {
      if (re.data.installed) {
        this.lib.openHomePage();
        this.installed = true;
      } else {
        this.lib.openInstallPage();
        this.installed = false;
      }
    });
  }

  onClickLogout(e) {
    this.fire.user.logout()
    .then(() => {
      return this.fire.auth.onAuthStateChanged(user => {
          if (user) {
          } else {
            this.lib.openHomePage();
          }
        });
    })
    .then( unsubscribe => {
      unsubscribe();
    })
    .catch(err => {
      this.lib.failure(err, 'Error logging out.');
    });
  }
}
