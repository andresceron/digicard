import { Component, Input } from '@angular/core';

@Component({
  selector: 'sc-svg',
  templateUrl: './svg.component.html'
})

export class SvgComponent {
  @Input() name: string;

  constructor() {}

  get absUrl(): string {
    return window.location.href;
  }
}
