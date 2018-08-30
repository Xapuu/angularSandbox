import {
	Component,
	OnInit
} from '@angular/core';
import {
	Router,
	ActivationStart,
	ActivatedRouteSnapshot,
	ActivationEnd
} from '@angular/router';
import { filter, map, debounceTime } from 'rxjs/operators';

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
		 * First we subscribe to all navigation events, in order to update
		 * our route "data", which we will use for the breadcrumb visualization.
		 *
		 * We also filter the events emitted from the `router` in such way, that we are only
		 * taking action upon a completed router event (in other words we are subscribing only for `ActivationEnd`
		 * events)
		 *
		 * The `debounceTime` is used as a workaround, in order to skip all `ActivationEnd` events emitted before the
		 * last one (The router is emitting an router event for each nested route, see line 46)
		 *
		 * In the end of the pipe we are mapping the emitted values to `snapshot`-s, so that we can retrieve the breadcrumb data
		 * in easier manner,
		 */

		this.router.events
			.pipe(
				filter(x => (x instanceof ActivationEnd)),
				// tap(x => console.log(x)),     // Remove the comment to see the effect without debounce time
				debounceTime(1),
				map((x: ActivationStart) => x.snapshot)
			)
			.subscribe(x => {
				this.bcLoadedData = this.getChildrenBcDate(x.root).filter(d => d.bc);
				this.bcForDisplay = this.bcLoadedData.reduce((rootAcc, rootElement) => {
					let breakIn = [];
					if (rootElement.breakIn) {
						breakIn = rootElement.breakIn.reduce((acc, e) => [...acc, `break in ${e}'s home`], []);
					}
					return [...rootAcc, rootElement.bc, ...breakIn];
				}, []);
			});
	}

	getChildrenBcDate(x: ActivatedRouteSnapshot) {
		let bcData = [x.data];

		if (x.firstChild !== null) {
			bcData = [...bcData, ...this.getChildrenBcDate(x.firstChild)];
		}
		return bcData;
	}
}
