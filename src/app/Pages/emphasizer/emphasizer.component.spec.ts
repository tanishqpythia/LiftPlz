import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmphasizerComponent } from './emphasizer.component';

describe('EmphasizerComponent', () => {
  let component: EmphasizerComponent;
  let fixture: ComponentFixture<EmphasizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmphasizerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmphasizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
