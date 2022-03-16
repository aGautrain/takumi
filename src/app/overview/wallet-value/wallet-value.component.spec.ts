import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletValueComponent } from './wallet-value.component';

describe('WalletValueComponent', () => {
  let component: WalletValueComponent;
  let fixture: ComponentFixture<WalletValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
