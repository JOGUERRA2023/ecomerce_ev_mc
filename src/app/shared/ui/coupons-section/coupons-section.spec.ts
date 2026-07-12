import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CouponsSection } from './coupons-section';
import { COUPONS } from 'app/shared/constants';
import { vi, describe, beforeEach, it, expect, beforeAll } from 'vitest';

describe('CouponsSection', () => {
  let component: CouponsSection;
  let fixture: ComponentFixture<CouponsSection>;

  beforeAll(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
      writable: true,
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsSection],
    }).compileComponents();

    fixture = TestBed.createComponent(CouponsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all coupons defined in constants', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    COUPONS.forEach((coupon) => {
      expect(compiled.textContent).toContain(coupon.discount);
      expect(compiled.textContent).toContain(coupon.title);
      expect(compiled.textContent).toContain(coupon.code);
    });
  });

  it('should copy coupon code to clipboard when clicked', async () => {
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');
    const firstCoupon = COUPONS[0];
    
    component.copyCode(firstCoupon.code);
    fixture.detectChanges();

    expect(writeTextSpy).toHaveBeenCalledWith(firstCoupon.code);
    expect(component.copiedCode()).toBe(firstCoupon.code);
  });
});
