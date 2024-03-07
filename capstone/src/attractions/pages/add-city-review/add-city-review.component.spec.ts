import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCityReviewComponent } from './add-city-review.component';

describe('AddCityReviewComponent', () => {
  let component: AddCityReviewComponent;
  let fixture: ComponentFixture<AddCityReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCityReviewComponent]
    });
    fixture = TestBed.createComponent(AddCityReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
