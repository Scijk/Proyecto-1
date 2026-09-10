import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Configuración de Playwright para la automatización de despensalo.cl.
 * Define 2 "entornos" de ejecución (indicador 6.2): dos navegadores distintos
 * (Chromium y Firefox) y, alternativamente, dos resoluciones (desktop y mobile).
 * Ejecutar con --project=<nombre> para correr uno solo, o sin flag para correr todos.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://despensalo.cl/',
    screenshot: 'on',
    // Video deshabilitado: requiere descargar el binario ffmpeg de Playwright,
    // lo que puede fallar en redes con inspección TLS. Las trazas y capturas
    // ya aportan evidencia suficiente de cada ejecución.
    video: 'off',
    trace: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  outputDir: 'evidence/test-results',
  // Se usa el Google Chrome ya instalado en el sistema (channel: 'chrome') para
  // no depender de la descarga de los binarios embebidos de Playwright, que en
  // algunas redes falla por inspección TLS/proxy (ver README, sección 5).
  // Esto igual entrega 2 "entornos" distintos para el indicador 6.2: navegador
  // de escritorio vs. emulación de navegador móvil.
  projects: [
    {
      name: 'chrome-desktop',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'chrome-mobile',
      use: { ...devices['Pixel 7'], channel: 'chrome' },
    },
    // Alternativa si se logran instalar los navegadores de Playwright
    // (`npm run install:browsers` desde una red sin restricciones):
    // {
    //   name: 'firefox-desktop',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
});
