import { Component } from '@angular/core';

@Component({
	selector: 'app-mock-component',
	templateUrl: './mock-component.component.html',
	styleUrls: ['./mock-component.component.scss']
})
export class MockComponentComponent {
	/**
	 * This is a mock component it's used to hold info about the demo, also is used
	 * in the router because the `component` property is required if there is no redirects.
	 */

}
