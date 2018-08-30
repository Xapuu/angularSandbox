import { Component } from '@angular/core';
import { BreakInService } from './services/break-in.service';
import { Router } from '@angular/router';

/**
* !!! In order to better understand the problems solved by this demo first play around with
* the page and after that start reviewing the code
*/

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'app';

	constructor(
		private breakInService: BreakInService,
		private router: Router
	) { }

	breakIn(breakInTarget: string): void {
		this.breakInService.breakIn(breakInTarget);
		this.router.navigate(['home']);
	}

	resetbreakIn(): void {
		this.breakInService.resetBreakIns();
		this.router.navigate(['home']);
	}
}
