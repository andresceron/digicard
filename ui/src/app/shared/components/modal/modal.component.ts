
import {filter} from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { NavigationStart, Router } from '@angular/router';

import { Subject ,  Subscription } from 'rxjs';

import { ModalService } from '@components/modal/shared/modal.service';
import { IModal } from '@components/modal/shared/modal.interface';

@Component({
  selector: 'sc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('overlay') overlay: ElementRef;
  @Input() modalId: string;
  @Input() title: string;
  @Input() size: 'sm';
  @Input() position = 'top';
  @Output() closed: EventEmitter<any> = new EventEmitter<any>();

  public isOpen = false;
  public currentTemplate: string;

  private statesSubscription: Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private modalService: ModalService,
    private router: Router
  ) {}

  @HostListener('document:click', ['$event'])
  documentClick(e: MouseEvent) {

    if (this.overlay.nativeElement === e.target) {
      this.modalService.close(this.modalId);
    }
  }

  ngOnInit() {

    this.statesSubscription = this.modalService.states$.pipe(
      filter((modal: IModal) => !!modal))
      .subscribe(
      (modal: any) => {

        if (modal.id === this.modalId) {

          if (modal.action === 'open') {
            this.isOpen = true;
          } else {
            this.isOpen = false;
            this.closed.emit(this.modalId);
          }

          this.currentTemplate = modal.template;

          this.cd.markForCheck();
        }
      }
    );

    this.router.events.pipe(
      filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.modalService.close(this.modalId);
      }
    );
  }

  ngOnDestroy() {
    this.statesSubscription.unsubscribe();
  }
}
