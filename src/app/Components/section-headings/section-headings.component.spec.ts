import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHeadingsComponent } from './section-headings.component';

describe('SectionHeadingsComponent', () => {
  let component: SectionHeadingsComponent;
  let fixture: ComponentFixture<SectionHeadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeadingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionHeadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
