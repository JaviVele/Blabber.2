import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    RouterModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
