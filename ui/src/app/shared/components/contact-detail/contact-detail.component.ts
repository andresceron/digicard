import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@interfaces/user.interface';

@Component({
  selector: 'sc-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactDetailComponent implements OnInit {
  @Input() user: IUser;
  @Output() navBackEvent: EventEmitter<any> = new EventEmitter<any>();

  currentUser: any;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  }

}
