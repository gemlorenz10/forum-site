import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { AppComponent } from './app.component';
import { RegisterPage } from './pages/user/register/page.register';
import { LoaderComponent } from './components/loader/loader.component';
import { LibService } from './providers/lib';

const appRoutes = [
  { path: 'register/:param', component: RegisterPage }
  // { path: '', component: RegisterPage }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterPage,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FirelibraryModule.forRoot( { firebaseApp: firebase.app(), functions: true } )
  ],
  providers: [FirelibraryModule, LibService],
  bootstrap: [AppComponent]
})
export class AppModule { }
