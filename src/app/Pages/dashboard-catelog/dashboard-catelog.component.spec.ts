import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCatelogComponent } from './dashboard-catelog.component';

describe('DashboardCatelogComponent', () => {
  let component: DashboardCatelogComponent;
  let fixture: ComponentFixture<DashboardCatelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCatelogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardCatelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
