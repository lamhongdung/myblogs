import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './component/user-create/user-create.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { LoginComponent } from './component/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCreateComponent } from './component/post-create/post-create.component';
import { PostEditComponent } from './component/post-edit/post-edit.component';
import { PostListComponent } from './component/post-list/post-list.component';
import { PostViewComponent } from './component/post-view/post-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationModule } from './notification.module';
import { NgxEditorModule } from 'ngx-editor';
import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    HeaderComponent,
    FooterComponent,
    EditProfileComponent,
    LoginComponent,
    PostCreateComponent,
    PostEditComponent,
    PostListComponent,
    PostViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NotificationModule,
    NgbModule,
    NgxPaginationModule,
    NgxEditorModule,
    NgxAwesomePopupModule.forRoot(), 
    ConfirmBoxConfigModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
