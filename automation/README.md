# Automatización — Despensalo.cl (U3 Testing)

Suite de automatización con [Playwright](https://playwright.dev/) para los 3 casos
seleccionados como repetitivos y estables (tabla del informe, sección 9):

| ID | Caso | Archivo | TC manual relacionado |
|---|---|---|---|
| AUTO-001 | Carga y acceso inicial | `tests/auto-001-carga-acceso-inicial.spec.ts` | — (smoke test) |
| AUTO-002 | Login con cuenta de prueba (válido e inválido) | `tests/auto-002-login-cuenta-prueba.spec.ts` | TC-001, TC-003 |
| AUTO-003 | Creación de producto | `tests/auto-003-creacion-producto.spec.ts` | TC-006 |

## 1. Requisitos previos

- Node.js 18+ (verificado con Node 22).
- Una cuenta de usuario **de prueba** ya registrada en https://despensalo.cl/
  (creada exclusivamente para este proyecto, sin datos personales sensibles).

## 2. Instalación

```bash
cd automation
npm install
cp .env.example .env       # completar TEST_USER_EMAIL / TEST_USER_PASSWORD
```

Por defecto la suite usa el **Google Chrome ya instalado en tu sistema**
(`channel: 'chrome'` en `playwright.config.ts`), por lo que **no es necesario**
descargar los binarios embebidos de Playwright. Si de todas formas quieres
usar los navegadores propios de Playwright (Chromium/Firefox/WebKit
descargados), corre `npm run install:browsers` (ver sección 5 si falla).

`.env` **no se sube al repositorio** (ver `.gitignore`). Las credenciales de la cuenta
de prueba solo deben vivir en este archivo local.

## 3. Ejecución

```bash
npm test                    # corre las 3 suites en los proyectos configurados
npm run test:auto001        # solo AUTO-001
npm run test:auto002        # solo AUTO-002 (login OK / login NOOK)
npm run test:auto003        # solo AUTO-003 (creación de producto)

npm run test:desktop        # entorno 1: Chrome de escritorio
npm run test:mobile         # entorno 2: Chrome con emulación móvil (Pixel 7)
```

Para cumplir el requisito de **repetibilidad (≥3 ejecuciones)** y de **2 entornos**
(indicador 6.2), ejecutar:

```bash
npm run test:3runs                         # 3 corridas en chrome-desktop
PROJECT=chrome-mobile npm run test:3runs   # 3 corridas en chrome-mobile
```

Cada corrida genera:
- Capturas de pantalla en `evidence/` (una por test) y en `evidence/test-results/`
  (adjuntas automáticamente por Playwright, incluyendo trazas/video en fallos).
- Reporte HTML acumulado en `reports/html/` (`npm run report` para visualizarlo).
- Reporte JSON por corrida en `reports/run-N-<proyecto>.json`, útil para calcular
  las métricas del indicador 6.3 (tasa de éxito, duración, consistencia entre corridas).

## 4. Diseño y buenas prácticas aplicadas

- **Aserciones explícitas** en cada test (visibilidad de elementos, textos, título de
  página) para determinar con claridad si la ejecución fue exitosa o fallida.
- **Reutilización/parametrización** (`utils/auth.ts`, `utils/testData.ts`): la función
  `login()` se reutiliza en AUTO-002 (con credenciales válidas e inválidas) y en
  AUTO-003; los datos de producto se generan parametrizados para evitar colisiones
  entre corridas repetidas.
- **Evidencia de ejecución**: cada test guarda una captura de pantalla y Playwright
  adjunta trazas/video en caso de fallo.
- **2 entornos de ejecución**: `chrome-desktop` y `chrome-mobile` (Google Chrome
  instalado en el sistema, sin descargas adicionales) configurados como proyectos en
  `playwright.config.ts`, permitiendo comparar resolución/dispositivo. Si logras
  instalar los navegadores de Playwright, puedes descomentar el proyecto
  `firefox-desktop` para sumar un tercer entorno (navegador distinto).
- **Vinculación con casos manuales**: cada spec referencia explícitamente el TC del
  informe manual que automatiza (ver tabla arriba y trazabilidad del informe).

## 5. Solución de problemas

- **`SELF_SIGNED_CERT_IN_CHAIN` al correr `npm run install:browsers`**: es propio de
  redes corporativas o entornos con inspección TLS que bloquean la descarga de
  binarios de navegador desde `cdn.playwright.dev`. No es necesario resolverlo: la
  suite funciona igual usando el Chrome instalado (`channel: 'chrome'`). Si aun así
  quieres los navegadores de Playwright, intenta desde una red sin ese proxy, o
  configura `NODE_EXTRA_CA_CERTS`/`PLAYWRIGHT_DOWNLOAD_HOST` según tu organización.
- **`browserType.launch: Chromium/Chrome distribution not found`**: significa que
  Playwright no encontró Google Chrome instalado en las rutas esperadas. Instala
  Google Chrome (https://www.google.com/chrome/) o cambia el `channel` en
  `playwright.config.ts` por el navegador que tengas disponible (`msedge`, etc.).

## 6. Notas de seguridad

- Nunca commitear el archivo `.env` con credenciales reales.
- Las capturas generadas en `evidence/` pueden contener el correo de la cuenta de
  prueba; revisar antes de anexarlas al informe final que no incluyan datos sensibles
  adicionales (tokens, información de pago, etc.).
