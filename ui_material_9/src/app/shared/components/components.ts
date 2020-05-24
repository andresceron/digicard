import { HeaderModule } from '@components/header/header.module';
import { ModalModule } from '@components/modal/modal.module';
import { FooterModule } from '@components/footer/footer.module';
import { SearchbarModule } from '@components/searchbar/searchbar.module';
import { DataListModule } from '@components/data-list/data-list.module';
import { SortbyModule } from '@components/sortby/sortby.module';
import { SvgModule } from '@components/svg/svg.module';
import { SvgDefsModule } from '@components/svg-defs/svg-defs.module';
import { FileUploaderModule } from '@components/file-uploader/file-uploader.module';
import { ProgressModule } from '@components/progress/progress.module';

export const COMPONENTS: any[] = [
  HeaderModule,
  ModalModule,
  FooterModule,
  SearchbarModule,
  DataListModule,
  SortbyModule,
  SvgModule,
  SvgDefsModule,
  FileUploaderModule,
  ProgressModule
];
