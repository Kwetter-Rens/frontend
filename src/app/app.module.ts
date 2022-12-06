import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { TweetsComponent } from './tweets/tweets.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthModule } from "@auth0/auth0-angular";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthHttpInterceptor } from "@auth0/auth0-angular";
import { NotfoundComponent } from './notfound/notfound.component';
import { ErrorComponent } from './error/error.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import { AdminpageComponent } from './adminpage/adminpage.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    TweetsComponent,
    HomeComponent,
    LogoutComponent,
    NotfoundComponent,
    ErrorComponent,
    AdminpageComponent,
  ],
    imports: [
      FormsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
        BrowserModule,
        AuthModule.forRoot({
            // The domain and clientId were configured in the previous chapter
            domain: 'dev-f32d4z1k.us.auth0.com',
            clientId: 'DLTTSJAXkWWN3qhLWcXWXCQhDUeBCTDc',

            // Request this audience at user authentication time
            audience: 'https://dev-f32d4z1k.us.auth0.com/api/v2/',

            // Request this scope at user authentication time
            scope: 'read:current_user',

            // Specify configuration for the interceptor
            httpInterceptor: {
                allowedList: [
                    {
                        // Match any request that starts 'https://dev-f32d4z1k.us.auth0.com/api/v2/' (note the asterisk)
                        uri: 'https://dev-f32d4z1k.us.auth0.com/api/v2/*',
                        tokenOptions: {
                            // The attached token should target this audience
                            audience: 'https://dev-f32d4z1k.us.auth0.com/api/v2/',

                            // The attached token should have these scopes
                            scope: 'read:current_user'
                        }
                    }
                ]
            }
        }),
        AppRoutingModule,

    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
