import {Directive, HostListener, Input} from '@angular/core';

import {ModalService} from '@components/modal/shared/modal.service';

@Directive({
  selector: '[modalOpen]' // tslint:disable-line
})

export class ModalOpenDirective {
  @Input() modalId: string;
  @Input() modalTemplate: string;

  public modalOpen: string;

  constructor(private modalService: ModalService) {}

  @HostListener('click')
  open(): void {
    this.modalService.open(this.modalId, this.modalTemplate);
  }
}
