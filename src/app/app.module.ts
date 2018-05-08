import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleDoubleDown);

import * as firebase from 'firebase';
import 'firebase/firestore';
firebase.initializeApp({
  apiKey: 'AIzaSyAIn63jqLd-dKQWjt2s9T1w97qiTrFH7KA',
  authDomain: 'forum-site-ph.firebaseapp.com',
  databaseURL: 'https://forum-site-ph.firebaseio.com',
  projectId: 'forum-site-ph',
  storageBucket: 'forum-site-ph.appspot.com',
  messagingSenderId: '543234154938'
});

import { FirelibraryModule } from './modules/firelibrary/core';
import { LibService } from './providers/lib';

import { RegisterPage } from './pages/user/register/register.page';
import { ProfilePage } from './pages/user/profile/profile.page';
import { HomePage } from './pages/home/home.page';

import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';


const appRoutes = [
  // User routes
  { path: 'user/:param', component: RegisterPage },
  { path: 'user/update-profile', component: ProfilePage },
  { path: '', component: HomePage }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterPage,
    ProfilePage,
    HomePage,

    FileUploadComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    FirelibraryModule.forRoot( { firebaseApp: firebase.app(), functions: true } )
  ],
  providers: [FirelibraryModule, LibService],
  bootstrap: [AppComponent]
})
export class AppModule { }
