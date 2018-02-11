import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TabsService {

  private tabIndexSource: Subject<number> = new Subject<number>();
  tabIndex: Observable<number> = this.tabIndexSource.asObservable();

  switchToTab(index: number) {
    this.tabIndexSource.next(index);
  }

}
