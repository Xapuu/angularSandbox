import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class BreakInService {

	/**
	 * `breakIns` holds the break ins in their respective order
	 */
	breakIns: string[] = [];

	/**
	 * `anyBreakIns` check if there is any break in
	 */
	anyBreakIns(): boolean {
		return this.breakIns.length === 0;
	}

	/**
	 *
	 * @param breakInTarget
	 *
	 * Adds record to the break ins (in other words adds one level to the breadcrumb)
	 */
	breakIn(breakInTarget: string): void {
		this.breakIns.push(breakInTarget);
	}

	/**
	 * returns all current break ins
	 */
	getBreakIns(): string[] {
		return this.breakIns;
	}

	/**
	 * Clears the record of the break ins
	 */
	resetBreakIns(): void {
		this.breakIns = [];
	}

}
