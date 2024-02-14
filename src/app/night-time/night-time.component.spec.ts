import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightTimeComponent } from './night-time.component';

describe('NightTimeComponent', () => {
  let component: NightTimeComponent;
  let fixture: ComponentFixture<NightTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NightTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NightTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
