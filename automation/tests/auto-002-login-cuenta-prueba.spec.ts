import { test, expect } from '@playwright/test';
import { login, logout, expectLoggedIn, goToTab, testUser, invalidUser } from '../utils/auth';
import { evidencePath } from '../utils/evidence';

/**
 * AUTO-002 — Login con cuenta de prueba.
 * Vinculado a TC-001 (login válido) y TC-003 (login inválido) del informe manual.
 * Reutiliza el helper `login()` parametrizado con distintas credenciales,
 * demostrando la reutilización de una función común (indicador 6.1).
 */
test.describe('AUTO-002 - Login con cuenta de prueba', () => {
  test.skip(!testUser.email || !testUser.password, 'Configura TEST_USER_EMAIL y TEST_USER_PASSWORD en .env');

  test('TC-001 - inicio de sesión válido', async ({ page }, testInfo) => {
    await login(page, testUser.email, testUser.password);
    await expectLoggedIn(page);

    // Aserción adicional: el correo de la cuenta activa aparece en Ajustes.
    await goToTab(page, 'settingsSection');
    await expect(page.locator('#accountEmail')).toContainText(testUser.email);

    await page.screenshot({ path: evidencePath(testInfo, 'auto-002-login-ok'), fullPage: true });

    // Se deja el entorno limpio para la siguiente ejecución/prueba.
    await logout(page);
  });

  test('TC-003 - inicio de sesión inválido', async ({ page }, testInfo) => {
    await login(page, invalidUser.email, invalidUser.password);

    // El gate de autenticación debe permanecer visible y mostrar el mensaje de error
    // final (clase "auth-msg bad"). Se espera explícitamente esta clase y no solo
    // "visible + con texto", porque la app muestra primero un estado transitorio
    // "Ingresando…" (clase "info") antes del resultado definitivo; afirmar solo
    // visibilidad/texto no vacío puede capturar ese estado intermedio en vez del
    // error real (hallazgo detectado y corregido durante esta automatización,
    // ver informe sección 9.2).
    await expect(page.locator('#authGate')).toBeVisible();
    const authMsg = page.locator('#authMsg');
    await expect(authMsg).toHaveClass(/bad/, { timeout: 10_000 });
    await expect(authMsg).not.toHaveText('');

    await page.screenshot({ path: evidencePath(testInfo, 'auto-002-login-nook'), fullPage: true });
  });
});
