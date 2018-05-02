import { LibService } from './providers/lib';
import { Component, OnInit } from '@angular/core';
import { FireService } from './modules/firelibrary/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ForumSite';

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
      } else {
        this.lib.openInstallPage();
      }
    });
  }
}
