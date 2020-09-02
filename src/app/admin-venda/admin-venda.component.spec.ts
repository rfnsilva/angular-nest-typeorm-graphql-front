import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVendaComponent } from './admin-venda.component';

describe('AdminVendaComponent', () => {
  let component: AdminVendaComponent;
  let fixture: ComponentFixture<AdminVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
