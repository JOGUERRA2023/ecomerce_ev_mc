import { test, expect } from '@playwright/test';

test('should add a product to the cart and verify it in the sidebar', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const productCard = page.locator('.cr-product-card').first();
  await expect(productCard).toBeVisible({ timeout: 15000 });

  const productNameElement = productCard.locator('.title');
  const productName = await productNameElement.textContent();
  expect(productName).not.toBeNull();
  const trimmedName = productName!.trim();

  const addToCartButton = productCard.locator('.cr-shopping-bag');
  await addToCartButton.click();

  const alertToast = page.locator('.alert-toast.success');
  await expect(alertToast).toBeVisible();
  await expect(alertToast).toContainText(trimmedName);

  const cartToggleBtn = page.locator('.Shopping-toggle').first();
  await cartToggleBtn.click();

  const cartSidebar = page.locator('.cr-cart-view');
  await expect(cartSidebar).toBeVisible();

  const productInCartTitle = cartSidebar.locator('.cart_pro_title');
  await expect(productInCartTitle).toHaveText(trimmedName);
});
