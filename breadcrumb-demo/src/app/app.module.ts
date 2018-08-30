import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MockComponentComponent } from './components/mock-component/mock-component.component';
import { BreakInResolver } from './services/break-in.resolver';

/**
* !!! In order to better understand the problems solved by this demo first play around with
* the page and after that start reviewing the code
*/


/**
 * We have a simple router trough which we pass data that will be used inside
 * the `breadcrumb.component`, for visualizing the users current location.
 *
 * We also have an resolver, which is used for the second breadcrumb inside `breadcrumb.component`
 * that loads some dynamic data based on external factors
 *
 * The resolve option is used to load all 'break ins' in the `breakIn` property, which will be accesible
 * trough the `router`
 *
 */

const routes: Routes = [
	{ path: '', pathMatch: 'full', component: MockComponentComponent, data: { bc: 'Looking outside' } },
	{
		path: 'home', component: MockComponentComponent,
		runGuardsAndResolvers: 'always',
		data: { bc: 'I see a home' },
		resolve: { breakIn: BreakInResolver },
		children: [
			{
				path: 'primaryHouse', component: MockComponentComponent,
				data: { bc: 'I\'m going inside the home' },
				children: [
					{
						path: 'kitchen', component: MockComponentComponent,
						data: { bc: 'look inside the kitchen' }
					},
					{
						path: 'bedroom', component: MockComponentComponent,
						data: { bc: 'look inside the bedroom' }
					}
				]
			},
			{
				path: 'guestHouse', component: MockComponentComponent,
				data: { bc: 'I\'m going in the back yard' }
			}
		]
	}
];



/**
 * In the import block the option `onSameUrlNavigation` is used to update
 * the 'advanced' breadcrumb, upon 'breaking in' in someones home
 */
@NgModule({
	declarations: [
		AppComponent,
		BreadcrumbComponent,
		MockComponentComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
	],
	providers: [
		BreakInResolver
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
