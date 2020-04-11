import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadlogComponent } from './loadlog.component';

describe('LoadlogComponent', () => {
  let component: LoadlogComponent;
  let fixture: ComponentFixture<LoadlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
