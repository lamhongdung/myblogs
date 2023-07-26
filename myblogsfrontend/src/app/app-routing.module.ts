import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './component/user-create/user-create.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { PostListComponent } from './component/post-list/post-list.component';
import { PostCreateComponent } from './component/post-create/post-create.component';
import { PostEditComponent } from './component/post-edit/post-edit.component';
import { PostViewComponent } from './component/post-view/post-view.component';
import { ContactComponent } from './component/contact/contact.component';

const routes: Routes = [
  // sign up
  { path: 'signup', component: UserCreateComponent },
  // login
  { path: 'login', component: LoginComponent },
  // posts list
  { path: 'post-list', component: PostListComponent },
  // user clicks on a category on the sidebar menu
  { path: 'category-sidebar/:id', component: PostListComponent },
  // create new post. only user has already logged-in can see 'New post' menu.
  {
    path: 'post-create', component: PostCreateComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN']
    }
  },
  // edit existing post. 
  // user only can edit posts which are posted by them-self
  {
    path: 'post-edit/:id', component: PostEditComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN']
    }
  },
  // view specific post
  { path: 'post-view/:id', component: PostViewComponent },
  // edit profile. only user has already logged-in can see 'edit profile' menu.
  {
    path: 'edit-profile/:id', component: EditProfileComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN']
    }
  },
  // contact page. all users can access the 'Contact' page.
  { path: 'contact', component: ContactComponent },
  //
  { path: '', redirectTo: '/post-list', pathMatch: 'full' },
  // if paths are not in the above list then redirects to path '/post-list'
  { path: '**', redirectTo: '/post-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
