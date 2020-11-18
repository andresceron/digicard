import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { SearchbarComponent } from '@components/searchbar/searchbar.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from '@components/modal/modal.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    ModalModule,
    FormsModule
  ],
  exports: [
    SearchbarComponent
  ],
  declarations: [
    SearchbarComponent
  ]
})

export class SearchbarModule {}
