import {Directive, HostListener, Input} from '@angular/core';

import {ModalService} from '@components/modal/shared/modal.service';

@Directive({
  selector: '[modalClose]'
})

export class ModalCloseDirective {
  @Input() modalId: string;

  constructor(private modalService: ModalService) {}

  @HostListener('click')
  close(): void {
    this.modalService.close(this.modalId);
  }
}
