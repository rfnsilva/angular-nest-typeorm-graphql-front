import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdutoComponent } from './admin-produto.component';

describe('AdminProdutoComponent', () => {
  let component: AdminProdutoComponent;
  let fixture: ComponentFixture<AdminProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
