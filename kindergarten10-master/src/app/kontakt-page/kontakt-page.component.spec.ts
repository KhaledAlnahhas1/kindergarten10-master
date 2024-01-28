import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontaktPageComponent } from './kontakt-page.component';

describe('KontaktPageComponent', () => {
  let component: KontaktPageComponent;
  let fixture: ComponentFixture<KontaktPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KontaktPageComponent]
    });
    fixture = TestBed.createComponent(KontaktPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
