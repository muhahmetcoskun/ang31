import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'ANASAYFA',
                items: [
                    { label: 'Anasayfa', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'TANIMLAMALAR',
                items: [
                    { label: 'Tatil Günü Tanımla', icon: 'pi pi-fw pi-id-card', routerLink: ['/tanimlamalar/tatilgunutanimla'] },
                    { label: 'Prim Türleri Tanımla', icon: 'pi pi-money-bill', routerLink: ['/tanimlamalar/primturleritanimla'] },
                    { label: 'Çalışma Süresi Tanımla', icon: 'pi pi-clock', routerLink: ['/tanimlamalar/calismasuresitanimla'] }
                   // { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                   // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                   // { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                   // { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                   // { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                   // { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    
                ]
            },
            //{
               // label: 'GİRİŞ',
               // items: [
                //    { label: 'Login', icon: 'pi pi-fw pi-id-card', routerLink: ['/auth/login'] },
                   // { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                   // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                   // { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                   // { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                   // { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                   // { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    
              //  ]
            //}
            
        ];
    }
}
