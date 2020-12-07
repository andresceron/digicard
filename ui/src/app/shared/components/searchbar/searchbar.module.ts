import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { SearchbarComponent } from '@components/searchbar/searchbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
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
