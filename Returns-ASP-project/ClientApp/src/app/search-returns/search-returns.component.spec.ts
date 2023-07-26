import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReturnsComponent } from './search-returns.component';

describe('SearchReturnsComponent', () => {
  let component: SearchReturnsComponent;
  let fixture: ComponentFixture<SearchReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
