import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPlaceComponent } from './book-place.component';

describe('BookPlaceComponent', () => {
  let component: BookPlaceComponent;
  let fixture: ComponentFixture<BookPlaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookPlaceComponent]
    });
    fixture = TestBed.createComponent(BookPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
