import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Table } from 'primeng/table';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {


  
    valCheck: string[] = ['remember'];

    password!: string;
    user: User = new User();
    errorMessage: string = "";
    constructor(public layoutService: LayoutService,private authenticationService: AuthenticationService, private router: Router,private messageService: MessageService) { }

    ngOnInit(): void {
        if (this.authenticationService.currentUserValue?.username) {
          this.router.navigate(['']);
          return;
        }

        
      }
      login() {
        this.authenticationService.login(this.user).subscribe(data => {
          this.router.navigate(['']);
        }, err => {
          this.errorMessage = 'Kullanıcı Adı veya Şifre Hatası.';
          this.messageService.add({ severity: 'error', summary: 'Hata Mesajı', detail: 'Kullanıcı Adı veya Şifre Hatalı', life: 3000 });
        })
      }
}