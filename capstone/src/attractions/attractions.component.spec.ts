import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsComponent } from './attractions.component';

describe('AttractionsComponent', () => {
  let component: AttractionsComponent;
  let fixture: ComponentFixture<AttractionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttractionsComponent]
    });
    fixture = TestBed.createComponent(AttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
