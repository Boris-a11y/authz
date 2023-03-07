import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AbilityModule } from '@casl/angular';
import { Ability, PureAbility } from '@casl/ability';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotallowedComponent } from './components/notallowed/notallowed.component';
import { AppAbility } from './app-ability';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NewpostComponent } from './components/newpost/newpost.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    NotallowedComponent,
    ProfileComponent,
    AdminComponent,
    LogoutComponent,
    NewpostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AbilityModule,
  ],
  providers: [
    { provide: AppAbility, useValue: new AppAbility() },
    { provide: PureAbility, useExisting: AppAbility },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
