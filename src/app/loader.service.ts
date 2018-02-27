import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    display(value: boolean) {
        this.status.next(value);
    }
}

@Injectable()
export class MsgBoxService {
    public statusMessage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    debugger
    display(fn: boolean)
    {
        this.statusMessage.next(true)
    }
    
}