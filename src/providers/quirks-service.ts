import {Injectable} from '@angular/core';

@Injectable()
export class QuirksService {

  processingQuirks: boolean = false;

  pendingResult: string;

}
