import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'sc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent {
  constructor(
  ) {}

}
