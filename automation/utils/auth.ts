import { Page, expect } from '@playwright/test';

/**
 * Credenciales de prueba, parametrizadas vía variables de entorno.
 * Se reutiliza en AUTO-002 y AUTO-003 (indicador 6.1: script con dato parametrizado).
 */
export const testUser = {
  email: process.env.TEST_USER_EMAIL || '',
  password: process.env.TEST_USER_PASSWORD || '',
};

export const invalidUser = {
  email: process.env.INVALID_USER_EMAIL || 'usuario.invalido@example.com',
  password: process.env.INVALID_USER_PASSWORD || 'ClaveInvalida999',
};

/**
 * Helper reutilizable de inicio de sesión (TC-001 / AUTO-002).
 * Recibe email y password como parámetros para poder reutilizarse
 * tanto con la cuenta válida como con credenciales inválidas.
 */
export async function login(page: Page, email: string, password: string) {
  await page.goto('/');
  await expect(page.locator('#authGate')).toBeVisible();
  await page.locator('#authTabLogin').click();
  await page.locator('#loginEmail').fill(email);
  await page.locator('#loginPassword').fill(password);
  await page.locator('#btnLogin').click();
}

/** Espera a que la sesión quede activa (authGate oculto y home visible). */
export async function expectLoggedIn(page: Page) {
  await expect(page.locator('#authGate')).toBeHidden({ timeout: 15_000 });
  await expect(page.locator('#homeSection')).toBeVisible();
}

/** Navega a una sección mediante el botón de navegación visible (evita duplicados
 * entre el nav de escritorio y el nav inferior de móvil, ambos presentes en el DOM). */
export async function goToTab(page: Page, target: string) {
  await page.locator(`button.nav-btn[data-target="${target}"]:visible`).first().click();
}

/** Cierra sesión desde Ajustes, dejando la app lista para la siguiente prueba. */
export async function logout(page: Page) {
  await goToTab(page, 'settingsSection');
  await page.locator('#btnLogout').click();
  await expect(page.locator('#authGate')).toBeVisible();
}
