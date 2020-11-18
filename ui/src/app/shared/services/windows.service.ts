import { Injectable } from '@angular/core';

@Injectable()
export class WindowsService {
  constructor() {}

  public getNativeWindow() {
    return window;
  }
}
