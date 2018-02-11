import {Injectable} from '@angular/core';

@Injectable()
export class QuirksService {

  processingQuirks: boolean = false;

  pendingResult: string;

  constructor(private storage: Storage) {

  }

  saveStateRecovery(recovery: string): Promise<string> {
    return this.storage.set('state_recovery', recovery);
  }

  getStateRecovery(): Promise<string> {
    return this.storage.get('state_recovery');
  }

  removeStateRecovery(): Promise<string> {
    return this.storage.remove('state_recovery');
  }

}
