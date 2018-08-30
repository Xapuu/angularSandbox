import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponentComponent } from './mock-component.component';

describe('MockComponentComponent', () => {
	let component: MockComponentComponent;
	let fixture: ComponentFixture<MockComponentComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MockComponentComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MockComponentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
