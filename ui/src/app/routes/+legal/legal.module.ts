import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { LegalRouterModule } from './legal-router.module';
import { RouterModule } from '@angular/router';
import { LegalComponent } from './legal.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    PdfViewerModule,
    LegalRouterModule
  ],
  exports: [LegalRouterModule],
  declarations: [LegalComponent]
})

export class LegalModule { }
