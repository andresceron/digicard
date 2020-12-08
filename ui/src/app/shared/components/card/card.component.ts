import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { IUser } from '@interfaces/user.interface';

@Component({
  selector: 'sc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardComponent {
  @Input() user: IUser;
  @Output() navBackEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}
