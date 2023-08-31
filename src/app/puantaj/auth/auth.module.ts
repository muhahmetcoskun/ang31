import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterComponent } from './register/register.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './login/login.component';
import { ToastModule } from 'primeng/toast';
@NgModule({
    declarations: [
        RegisterComponent,LoginComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        HttpClientModule,
        FormsModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        ToastModule
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [AuthRoutingModule]
})
export class AuthModule { }
