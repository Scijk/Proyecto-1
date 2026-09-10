import { test, expect } from '@playwright/test';
import { evidencePath } from '../utils/evidence';

/**
 * AUTO-001 — Carga y acceso inicial.
 * Caso repetitivo y estable: verifica que la aplicación carga correctamente,
 * muestra el gate de autenticación y sus elementos principales (sin requerir
 * datos de sesión). Es un buen smoke test para ejecutar antes de cualquier
 * otra suite y detectar caídas o cambios de layout tempranamente.
 */
test.describe('AUTO-001 - Carga y acceso inicial', () => {
  test('la aplicación carga y presenta el formulario de acceso', async ({ page }, testInfo) => {
    await page.goto('/');

    // Verificación / aserción 1: título de la página.
    await expect(page).toHaveTitle(/Despénsalo/i);

    // Verificación / aserción 2: el gate de autenticación está visible.
    const authGate = page.locator('#authGate');
    await expect(authGate).toBeVisible();

    // Verificación / aserción 3: existen los campos de login y el botón de ingreso.
    await expect(page.locator('#loginEmail')).toBeVisible();
    await expect(page.locator('#loginPassword')).toBeVisible();
    await expect(page.locator('#btnLogin')).toBeVisible();

    // Verificación / aserción 4: no debe mostrarse la advertencia de configuración
    // (indicaría que Supabase no está conectado y la app no es utilizable).
    await expect(page.locator('#authConfigWarning')).toBeHidden();

    // Evidencia de ejecución.
    await page.screenshot({ path: evidencePath(testInfo, 'auto-001-carga-inicial'), fullPage: true });
  });
});
