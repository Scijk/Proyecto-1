import { test, expect } from '@playwright/test';
import { login, expectLoggedIn, goToTab, testUser } from '../utils/auth';
import { buildProduct } from '../utils/testData';
import { evidencePath } from '../utils/evidence';

/**
 * AUTO-003 — Creación de producto.
 * Vinculado a TC-006 (crear producto válido) del informe manual.
 * Requiere sesión iniciada (reutiliza login()) y datos parametrizados
 * generados dinámicamente para evitar colisiones entre corridas repetidas.
 */
test.describe('AUTO-003 - Creación de producto', () => {
  test.skip(!testUser.email || !testUser.password, 'Configura TEST_USER_EMAIL y TEST_USER_PASSWORD en .env');

  test('TC-006 - crear producto válido y verificar en inventario', async ({ page }, testInfo) => {
    const product = buildProduct(`${testInfo.project.name}-${testInfo.repeatEachIndex + 1}`);

    await login(page, testUser.email, testUser.password);
    await expectLoggedIn(page);

    // Ir a Inventario y abrir el modal de alta de producto.
    await goToTab(page, 'inventorySection');
    await expect(page.locator('#inventorySection')).toBeVisible();
    await page.locator('#btnAddManual').click();
    await expect(page.locator('#productModalBack')).toBeVisible();

    // Completar el formulario con los datos parametrizados.
    await page.locator('#pName').fill(product.name);
    await page.locator('#pBrand').fill(product.brand);
    await page.locator('#pStock').fill(product.stock);
    await page.locator('#pMin').fill(product.min);
    await page.locator('#pTarget').fill(product.target);
    await page.locator('#pPrice').fill(product.price);

    await page.locator('#btnSaveProduct').click();

    // Verificación / aserción: el modal se cierra y el producto aparece en el listado.
    await expect(page.locator('#productModalBack')).toBeHidden();
    await page.locator('#inventorySearch').fill(product.name);
    await expect(page.locator('#productList')).toContainText(product.name);

    await page.screenshot({ path: evidencePath(testInfo, 'auto-003-creacion-producto'), fullPage: true });
  });
});
