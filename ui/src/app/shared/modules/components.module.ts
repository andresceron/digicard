import { NgModule } from '@angular/core';

// Project scope
import { COMPONENTS } from '@components/components';

@NgModule({
  imports: [
    COMPONENTS
  ],
  exports: [
    COMPONENTS
  ]
})

export class ComponentsModule { }
