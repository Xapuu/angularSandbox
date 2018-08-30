import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { BreakInService } from './break-in.service';

@Injectable()
export class BreakInResolver implements Resolve<Observable<any[]>> {
	constructor(
		private breakIn: BreakInService
	) { }

	resolve() {
		return of(this.breakIn.getBreakIns());
	}
}
