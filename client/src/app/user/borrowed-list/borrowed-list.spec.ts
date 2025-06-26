import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedList } from './borrowed-list';

describe('BorrowedList', () => {
  let component: BorrowedList;
  let fixture: ComponentFixture<BorrowedList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowedList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
