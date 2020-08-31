import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriaComponent } from './admin-categoria.component';

describe('AdminCategoriaComponent', () => {
  let component: AdminCategoriaComponent;
  let fixture: ComponentFixture<AdminCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
