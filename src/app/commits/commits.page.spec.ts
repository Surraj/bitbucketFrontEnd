import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsPage } from './commits.page';

describe('CommitsPage', () => {
  let component: CommitsPage;
  let fixture: ComponentFixture<CommitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
