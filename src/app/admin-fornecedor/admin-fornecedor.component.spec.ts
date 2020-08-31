import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFornecedorComponent } from './admin-fornecedor.component';

describe('AdminFornecedorComponent', () => {
  let component: AdminFornecedorComponent;
  let fixture: ComponentFixture<AdminFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
