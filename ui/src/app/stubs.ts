import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthServiceStub {
    private loadSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');

    currentAuth(): Observable<any> {
        return this.loadSubject;
    }
}
