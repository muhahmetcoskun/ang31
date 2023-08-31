import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimTurleriTanimlaComponent } from './prim-turleri-tanimla/prim-turleri-tanimla.component';
import { TatilGunuTanimlaHomeComponent } from './tatil-gunu-tanimla-home/tatil-gunu-tanimla-home.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CalismaSuresiTanimlamaComponent } from './calisma-suresi-tanimlama/calisma-suresi-tanimlama.component';





@NgModule({


  imports: [RouterModule.forChild([
    { path: 'tatilgunutanimla', component: TatilGunuTanimlaHomeComponent,canActivate: [AuthGuard] },
    { path: 'primturleritanimla', component: PrimTurleriTanimlaComponent,canActivate: [AuthGuard] },
    { path: 'calismasuresitanimla', component: CalismaSuresiTanimlamaComponent,canActivate: [AuthGuard] },
  ])],
  exports: [RouterModule]
})
export class TanimlamalarRoutingModule { }
