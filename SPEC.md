# Spec del Proyecto — Evaluación de Calidad y Pruebas para Despensalo.cl (U3 Testing)

Este documento describe el estado **final** del trabajo para la Evaluación 3 de la
asignatura *Gestión de Habilidades Profesionales* (Testing Aplicado al Desarrollo de
Sistemas), en base a:

- `resources/docs/Definiciones/Evaluacion_U3_Testing.pdf` (pauta/enunciado)
- `resources/docs/Definiciones/Rubrica_Evaluacion_3_Testing.pdf` (rúbrica de evaluación)
- `resources/docs/EVU3_Gomez_Araya_Christopher_Seccion50_VERSION_FINAL.docx` —
  **documento oficial de entrega** (portada, índice, introducción, resumen ejecutivo,
  alcance/metodología, ambiente, 16 casos de prueba con evidencia, análisis funcional,
  casos negativos/límite, defectos incluyendo BUG-001, testing exploratorio,
  automatización con métricas/evidencia/hallazgos, trazabilidad, conclusiones y anexo
  fotográfico).
- `resources/images/*.png` (evidencia fotográfica de ejecución manual, 32 capturas)
- `automation/` (suite de automatización Playwright, evidencia y reportes)

> Nota: el borrador previo `Informe_Evaluacion_Calidad_Despénsalo_ACTUALIZADO.docx` fue
> eliminado del repositorio; todo su contenido quedó consolidado en el documento oficial
> `EVU3_..._VERSION_FINAL.docx` listado arriba.

## 1. Objeto de evaluación

- **Actor de interés:** despensalo.cl
- **Plataforma:** https://despensalo.cl/
- **Rol del equipo:** QA, con cuenta de usuario propia por estudiante.
- **Restricciones:** sin pruebas de carga/estrés, sin escaneo de vulnerabilidades, sin
  accesos no autorizados; detener cualquier flujo antes de confirmar compras/pagos reales.

## 2. Resultados de aprendizaje e indicadores (rúbrica) — estado

| Indicador | Descripción | Puntaje máx. | Estado |
|---|---|---|---|
| 5.1 | Ejecución manual de casos de prueba (≥8 casos, ≥2 negativos/borde, ≥2 flujos autenticados, 100% con evidencia) | 15 | ✅ 16 TC ejecutados y documentados con evidencia (secciones 4, 5, 6, 12.1) |
| 5.2 | Identificación y documentación de defectos (≥3 hallazgos, 7 campos obligatorios + recomendación) | 20 | ✅ BUG-001 documentado con los 7 campos + recomendación (sección 7) |
| 5.3 | Testing exploratorio (≥3 sesiones, ≥3 funcionalidades, ≥6 escenarios, ≥2 hallazgos nuevos con evidencia) | 15 | ✅ 3 charters registrados con hallazgos (sección 8) |
| 6.1 | Scripts de automatización (≥3 scripts funcionales, aserciones, evidencia, ≥1 con parametrización/reutilización) | 15 | ✅ AUTO-001/002/003 en `automation/`, con aserciones y datos parametrizados |
| 6.2 | Integración/repetibilidad (100% scripts vinculados a casos, ≥3 ejecuciones en 2 entornos, ≥90% consistencia) | 15 | ✅ 24/24 ejecuciones (3 corridas × 2 entornos), 100% consistencia (sección 9.1) |
| 6.3 | Análisis de resultados (≥5 métricas, ≥3 tendencias/patrones, comparación manual vs. automatizado, ≥3 recomendaciones priorizadas) | 20 | ✅ Métricas, hallazgos técnicos y recomendaciones en secciones 9.1/9.3/11 |
| **Total** | | **100** | **Todos los indicadores cubiertos; ver pendientes de forma en sección 6** |

## 3. Resumen de evidencia

- 16 casos de prueba (TC-001 a TC-016) ejecutados y respaldados con capturas en
  `resources/images/` y embebidas en la sección 12.1 del informe oficial. Cubren:
  autenticación (login OK/NOOK, logout), registro (OK/NOOK por contraseñas distintas),
  inventario (alta, alta inválida, edición, agotar, eliminar), botiquín (alta, próximo a
  vencer, vencido), estados de stock (bajo, cero) y búsqueda/filtrado.
- 1 defecto formal registrado: **BUG-001** (elementos de navegación duplicados en el DOM,
  detectado durante la automatización), severidad baja / prioridad media, con
  recomendación de corrección.
- Automatización con Playwright: 3 scripts (AUTO-001 carga/acceso, AUTO-002 login
  OK/NOOK, AUTO-003 creación de producto), ejecutados 3 veces en 2 entornos
  (`chrome-desktop`, `chrome-mobile`) → **24/24 ejecuciones exitosas (100%)**,
  ~41.0 s promedio por corrida completa, 100% de consistencia entre corridas.
  Durante la implementación se detectaron y corrigieron 2 hallazgos técnicos
  (navegación duplicada en el DOM y una aserción sensible a un estado transitorio de
  la UI), documentados en la sección 9.3 del informe.
- El informe oficial incluye además Índice (con campo TOC nativo de Word), Introducción,
  una declaración de uso de IA como apoyo (GitHub Copilot CLI) y el link al repositorio.

## 4. Entregables (según pauta, sección "ENTREGABLES")

| # | Entregable | Estado | Ubicación |
|---|---|---|---|
| 1 | Documento/repositorio de casos de prueba, ejecuciones, evidencias y defectos | ✅ Completo | `EVU3_..._VERSION_FINAL.docx` (secc. 4–7, 12.1), `resources/images/` |
| 2 | Scripts de automatización + instrucciones de ejecución + evidencia de resultados | ✅ Completo | `automation/` (código, `README.md`, `evidence/`, `reports/`) |
| 3 | Informe Final de Evaluación de Calidad en PDF | ✅ Generado | `EVU3_..._VERSION_FINAL.pdf` |
| 4 | Diapositivas de la Presentación Final Ejecutiva (PDF) | ✅ Generado | `EVU3_..._Presentacion_Ejecutiva.pdf` (+ `.pptx` editable) |
| 5 | Carga individual en EVA | ⏳ Pendiente (acción manual del estudiante) | — |

## 5. Estructura del repositorio

```
Proyecto-1/
├── SPEC.md                                   # este documento
├── resources/
│   ├── docs/
│   │   ├── Definiciones/                                            # pauta y rúbrica (no modificar)
│   │   ├── EVU3_..._VERSION_FINAL.docx                              # informe oficial (editable)
│   │   ├── EVU3_..._VERSION_FINAL.pdf                                # informe oficial exportado
│   │   ├── EVU3_..._Presentacion_Ejecutiva.pptx                     # diapositivas (editable)
│   │   └── EVU3_..._Presentacion_Ejecutiva.pdf                      # diapositivas exportadas
│   └── images/                                # evidencia manual (32 PNG, uno o más por caso)
└── automation/                                # suite de automatización Playwright
    ├── package.json / playwright.config.ts / tsconfig.json
    ├── utils/                                 # auth.ts, testData.ts, evidence.ts
    ├── tests/
    │   ├── auto-001-carga-acceso-inicial.spec.ts
    │   ├── auto-002-login-cuenta-prueba.spec.ts
    │   └── auto-003-creacion-producto.spec.ts
    ├── evidence/                               # 24 capturas (no versionadas, ver .gitignore)
    ├── reports/                                # reportes HTML/JSON por corrida (no versionados)
    └── README.md                               # instrucciones de instalación y ejecución
```

## 6. Pendientes menores antes de la carga final en EVA

- [ ] **Redimensionar (no recortar)** las capturas de evidencia que quedaron cortadas en
      el anexo 12.1 del informe, y volver a insertarlas a una proporción/ancho que se
      vea completa en la página.
- [ ] Regenerar `EVU3_..._VERSION_FINAL.pdf` una vez corregidas las imágenes anteriores.
- [ ] Revisar y, si corresponde, eliminar en despensalo.cl los productos de prueba
      creados por AUTO-003 (nombre `Arroz QA Automatizado <entorno>-<n> <timestamp>`),
      para no dejar datos de prueba residuales en la cuenta usada para el informe.
- [ ] Verificar que ninguna captura exponga contraseñas/tokens/datos sensibles reales.
- [ ] Hacer commit final de los archivos actualizados (`SPEC.md`, docx, pdf) una vez
      resueltos los puntos anteriores.
- [ ] Carga individual en EVA de: informe PDF, presentación PDF, y enlace/zip del
      repositorio (código de automatización + evidencia).

## 7. Notas técnicas relevantes

- La suite de automatización usa el **Google Chrome del sistema** (`channel: 'chrome'`
  en `playwright.config.ts`) en lugar de los binarios propios de Playwright, ya que el
  entorno de desarrollo bloqueaba su descarga (`SELF_SIGNED_CERT_IN_CHAIN`, típico de
  redes corporativas con inspección TLS). Ver `automation/README.md` sección 5.
- despensalo.cl renderiza simultáneamente una barra de navegación de escritorio
  (`top-nav`) y una móvil (`bottom-nav`) con los mismos `data-target`, ambas presentes en
  el DOM y diferenciadas solo por CSS. Esto rompía los selectores estrictos de
  Playwright; se resolvió con un selector `:visible` en `goToTab()`
  (`automation/utils/auth.ts`) y quedó documentado como **BUG-001** en el informe.
- El repositorio del proyecto está en https://github.com/Scijk/Proyecto-1 (rama
  `feature/testing`), enlace que también se incluyó dentro del informe oficial.
