import { NgModule } from '@angular/core';
import { ShareQrRouterModule } from './share-qr-router.module';
import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { ShareQrComponent } from './share-qr.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    ShareQrRouterModule
  ],
  exports: [ShareQrRouterModule],
  declarations: [ShareQrComponent]
})

export class ShareQrModule { }
