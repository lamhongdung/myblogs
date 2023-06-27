import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './component/user-create/user-create.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { LoginComponent } from './component/login/login.component';
import { BlogListComponent } from './component/blog-list/blog-list.component';
import { BlogCreateComponent } from './component/blog-create/blog-create.component';
import { CommentAddComponent } from './component/comment-add/comment-add.component';
import { NotifierModule } from 'angular-notifier';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    HeaderComponent,
    FooterComponent,
    EditProfileComponent,
    LoginComponent,
    BlogListComponent,
    BlogCreateComponent,
    CommentAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NotifierModule,
    NotifierModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
