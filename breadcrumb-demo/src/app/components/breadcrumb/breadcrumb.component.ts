import { Component, OnInit } from '@angular/core';
import {
	Router,
	Event,
	ActivationEnd,
	NavigationEnd
} from '@angular/router';
import {
	filter,
	map,
	buffer,
	pluck
} from 'rxjs/operators';

/**
 * Check if an angular router 'Event' is instance of 'NavigationEnd' event
 */
const isNavigationEnd = (ev: Event) => ev instanceof NavigationEnd;
/**
 * Check if an angular router 'Event' is instance of 'NavigationEnd' event
 */
const isActivationEnd = (ev: Event) => ev instanceof ActivationEnd;

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
	bcLoadedData;
	bcForDisplay;

	constructor(private router: Router) { }

	ngOnInit() {
		/**
		 * navigationEnd$ is triggered once per completed routing event, in other words
		 * once per loading a component that is in the end of the current route
		 */
		const navigationEnd$ = this.router.events.pipe(filter(isNavigationEnd));

		/**
		 * Here we subscribe to all navigation events, in order to update
		 * our route "data", which we will use for the breadcrumb visualization.
		 *
		 * Than we filter the events emitted from the `router` in such way, that we are only
		 * taking action upon a completed router event (in other words we are subscribing only for `ActivationEnd`
		 * events)
		 *
		 * We use pluck to get only the required breadcrumb data
		 *
		 * The buffer operator accumulates all `data` coming from the router and emits the accumulated data once
		 * when a `NavigationEnd` event passes trough `navigationEnd$`
		 *
		 * The `map` in the end is used to reverse the collected data, in order to convert it to more logical
		 * sequence. Without the revers first we will get the data for the current route, after that for it's parent
		 * and so on (that is how the ng router works).
		 */
		this.router.events
			.pipe(
				filter(isActivationEnd),
				pluck('snapshot'),
				pluck('data'),
				buffer(navigationEnd$),
				map((bcData: any[]) => bcData.reverse())
			)
			.subscribe(x => {
				this.bcLoadedData = x;

				this.bcForDisplay = this.bcLoadedData.reduce((rootAcc, rootElement) => {
					let breakIn = [];
					if (rootElement.breakIn) {
						breakIn = rootElement.breakIn.reduce(
							(acc, e) => [...acc, `break in ${e}'s home`],
							[]
						);
					}
					return [...rootAcc, rootElement.bc, ...breakIn];
				}, []);
			});
	}
}
