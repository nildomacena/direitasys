import { AuthGuard } from './auth.guard';
import { FireService } from './fire.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { appRoutes } from './app.routes'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NoticiasComponent } from './noticias/noticias.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MemesComponent } from './memes/memes.component';

const config = {
  apiKey: "AIzaSyBrb6gLWfsQL44TnQOh8WPJKEnxxHUKrZk",
  authDomain: "direita-app.firebaseapp.com",
  databaseURL: "https://direita-app.firebaseio.com",
  projectId: "direita-app",
  storageBucket: "direita-app.appspot.com",
  messagingSenderId: "346053489617"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoticiasComponent,
    SidenavComponent,
    MemesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [
    FireService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
