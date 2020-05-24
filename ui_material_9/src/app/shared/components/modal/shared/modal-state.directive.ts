import {Directive, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {ModalService} from '@components/modal/shared/modal.service';

@Directive({
  selector: '[modalState]'
})

export class ModalStateDirective implements OnDestroy, OnInit {

  @HostBinding('class.modal-open')
  isOpen: boolean;

  private statesSubscription: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit() {

    this.statesSubscription = this.modalService.states$
    .subscribe(
      (modal: any) => {
        console.log(modal);
        this.isOpen = modal.isOpen;
      }
    );
  }

  ngOnDestroy() {
    this.statesSubscription.unsubscribe();
  }
}
