# Spec del Proyecto — Evaluación de Calidad y Pruebas para Despensalo.cl (U3 Testing)

Este documento estructura el trabajo pendiente para completar la Evaluación 3 de la
asignatura *Testing Aplicado al Desarrollo de Sistemas*, en base a:

- `resources/docs/Definiciones/Evaluacion_U3_Testing.pdf` (pauta/enunciado)
- `resources/docs/Definiciones/Rubrica_Evaluacion_3_Testing.pdf` (rúbrica de evaluación)
- `resources/docs/Informe_Evaluacion_Calidad_Despénsalo_ACTUALIZADO.docx` (informe en curso)
- `resources/docs/EVU3_Gomez_Araya_Christopher_Seccion50_VERSION_FINAL.docx` (plan de pruebas extendido)
- `resources/images/*.png` (evidencia fotográfica de ejecución manual)

## 1. Objeto de evaluación

- **Actor de interés:** despensalo.cl
- **Plataforma:** https://despensalo.cl/
- **Rol del equipo:** QA, con cuenta de usuario propia por estudiante.
- **Restricciones:** sin pruebas de carga/estrés, sin escaneo de vulnerabilidades, sin
  accesos no autorizados; detener cualquier flujo antes de confirmar compras/pagos reales.

## 2. Resultados de aprendizaje e indicadores (rúbrica)

| Indicador | Descripción | Puntaje máx. |
|---|---|---|
| 5.1 | Ejecución manual de casos de prueba (≥8 casos, ≥2 negativos/borde, ≥2 flujos autenticados, 100% con evidencia) | 15 |
| 5.2 | Identificación y documentación de defectos (≥3 hallazgos, 7 campos obligatorios + recomendación) | 20 |
| 5.3 | Testing exploratorio (≥3 sesiones, ≥3 funcionalidades, ≥6 escenarios, ≥2 hallazgos nuevos con evidencia) | 15 |
| 6.1 | Scripts de automatización (≥3 scripts funcionales, aserciones, evidencia, ≥1 con parametrización/reutilización) | 15 |
| 6.2 | Integración/repetibilidad (100% scripts vinculados a casos, ≥3 ejecuciones en 2 entornos, ≥90% consistencia) | 15 |
| 6.3 | Análisis de resultados (≥5 métricas, ≥3 tendencias/patrones, comparación manual vs. automatizado, ≥3 recomendaciones priorizadas) | 20 |
| **Total** | | **100** |

> Meta: apuntar al nivel "Sobresaliente" (100%) en cada indicador, ya que faltan pocos
> elementos concretos para alcanzarlo (ver checklist de brechas, sección 6).

## 3. Estado actual (evidencia disponible)

- 15 escenarios funcionales base ejecutados y respaldados con capturas en `resources/images`
  (TC-001 a TC-016, con TC-016 marcado como `OBSERVADO` por falta de precisión del criterio
  de búsqueda usado).
- Casos cubren: autenticación (login OK/NOOK, logout), registro (OK/NOOK por contraseñas
  distintas), inventario (alta, alta inválida, edición, agotar, eliminar), botiquín (alta,
  próximo a vencer, vencido), y estados de stock (bajo, cero).
- El informe `Informe_Evaluacion_Calidad_Despénsalo_ACTUALIZADO.docx` ya integra: portada,
  resumen ejecutivo, alcance/metodología, ambiente, tabla de 16 casos, análisis funcional,
  matriz de casos negativos/límite, sección de defectos (sin defectos confirmados aún),
  testing exploratorio (3 charters registrados, sin duración/fecha/dispositivo), automatización
  (tabla de 3 casos AUTO-001 a AUTO-003 pendiente de ejecución), trazabilidad evidencia↔caso,
  conclusiones/recomendaciones, y un anexo **12.1 Evidencia fotográfica por caso de prueba**
  con las 32 imágenes ya insertadas y agrupadas por TC (recién incorporado en esta sesión).
- El documento `EVU3_..._VERSION_FINAL.docx` aporta un plan de pruebas más extenso (objetivos,
  alcance ampliado, más funcionalidades: lista de compras, gastos, boletas, respaldo,
  exportación) que puede usarse como fuente para ampliar casos si se requiere ir más allá del
  mínimo.

## 4. Estructura de entregables (según pauta, sección "ENTREGABLES")

1. **Documento/repositorio de casos de prueba, ejecuciones, evidencias y defectos.**
   - Fuente: tabla de 16 TC + matriz de defectos del informe.
2. **Scripts de automatización + instrucciones de ejecución + evidencia de resultados.**
   - Pendiente: implementar (Playwright recomendado, ver sección 5).
3. **Informe Final de Evaluación de Calidad en PDF.**
   - Fuente: `Informe_Evaluacion_Calidad_Despénsalo_ACTUALIZADO.docx` → exportar a PDF al cerrar
     todas las brechas.
4. **Diapositivas de la Presentación Final Ejecutiva (PDF).**
   - Pendiente: crear a partir del resumen ejecutivo, hallazgos y recomendaciones del informe.
5. **Carga individual en EVA.**

## 5. Estructura de repo propuesta

```
Proyecto-1/
├── SPEC.md                                   # este documento
├── resources/
│   ├── docs/
│   │   ├── Definiciones/                     # pauta y rúbrica (no modificar)
│   │   ├── Informe_Evaluacion_Calidad_Despénsalo_ACTUALIZADO.docx  # informe final (editable)
│   │   └── EVU3_Gomez_Araya_..._VERSION_FINAL.docx                  # plan de pruebas extendido
│   └── images/                                # evidencia manual (PNG por caso)
├── automation/                                # NUEVO — scripts de automatización
│   ├── package.json
│   ├── playwright.config.ts
│   ├── tests/
│   │   ├── auto-001-carga-acceso-inicial.spec.ts
│   │   ├── auto-002-login-cuenta-prueba.spec.ts
│   │   └── auto-003-<tercer-caso-estable>.spec.ts
│   ├── evidence/                              # screenshots/videos/trace por corrida
│   └── reports/                               # reporte HTML/JSON de Playwright (3 corridas)
└── presentacion/
    └── Presentacion_Final_Despensalo.pdf      # NUEVO — diapositivas ejecutivas
```

## 6. Checklist de brechas para llegar a "Sobresaliente"

### 5.1 Casos manuales
- [x] 16 casos documentados (≥8 requerido), con ≥2 negativos/borde y ≥2 con sesión iniciada.
- [ ] Cerrar TC-016: registrar el término de búsqueda exacto usado y el resultado esperado.

### 5.2 Defectos
- [ ] Revisar ejecución real y confirmar si existe al menos 1 discrepancia reproducible;
      si no la hay, documentar explícitamente que no se detectaron defectos y sustentarlo.
- [ ] Si se detectan defectos, registrar ≥3 con los 7 campos obligatorios (ID, título,
      funcionalidad, pasos, resultado esperado, resultado obtenido, evidencia, severidad,
      prioridad, ambiente) + recomendación concreta por hallazgo.

### 5.3 Testing exploratorio
- [x] 3 charters registrados (inventario/stock, autenticación, botiquín/vencimientos).
- [ ] Completar duración, fecha/hora y dispositivo/resolución de cada sesión.
- [ ] Confirmar ≥6 escenarios adicionales ejecutados en total y documentar ≥2 hallazgos
      nuevos derivados de la exploración (no cubiertos por los TC predefinidos), con evidencia.

### 6.1 / 6.2 Automatización
- [x] Esqueleto Playwright creado en `automation/` (config, helpers, 3 specs:
      AUTO-001 carga/acceso, AUTO-002 login OK/NOOK, AUTO-003 creación de producto),
      con aserciones explícitas y datos parametrizados (`utils/auth.ts`, `utils/testData.ts`).
      Proyectos `chrome-desktop` y `chrome-mobile` (Google Chrome del sistema, sin
      descarga de binarios) configurados para cubrir 2 entornos.
- [x] `automation/.env` completado con cuenta de prueba real.
- [x] Ejecutado cada script 3 veces en 2 entornos (`chrome-desktop` y `chrome-mobile`
      vía `npm run test:3runs` / `PROJECT=chrome-mobile npm run test:3runs`).
      **Resultado: 24/24 ejecuciones exitosas (100%)**, ~41.0 s promedio por corrida
      completa (4 tests). Reportes en `automation/reports/run-*.json` y capturas
      únicas por corrida en `automation/evidence/` (24 PNG).
- [x] Se detectaron y corrigieron 2 hallazgos técnicos durante la implementación:
      (1) navegación duplicada en el DOM (top-nav/bottom-nav) causando "strict mode
      violation" en Playwright — resuelto con selector `:visible` en `goToTab()`;
      (2) aserción de login inválido sensible al estado transitorio "Ingresando…" —
      resuelto esperando la clase CSS `bad` en `#authMsg`. Documentados en el informe
      como BUG-001 (sección 7) y sección 9.3 (hallazgos técnicos y solución aplicada).
- [x] Capturas (6 representativas) y tabla de métricas incorporadas al informe Word
      en la sección 9 (9.1 Ejecución realizada, 9.2 Evidencia, 9.3 Hallazgos técnicos).
- [ ] Revisar y, si corresponde, eliminar en despensalo.cl los productos de prueba
      creados por AUTO-003 (nombre `Arroz QA Automatizado <entorno>-<n> <timestamp>`),
      para no dejar datos de prueba residuales en la cuenta.

### 6.3 Análisis
- [x] Métricas y tabla comparativa incorporadas al informe Word (sección 9.1):
      24/24 ejecuciones exitosas (100%), 0 fallidas, 6 corridas (3 por entorno),
      ~41.0 s promedio por corrida, duración promedio por caso (AUTO-001 ~6.0 s,
      AUTO-002 TC-001 ~10.2 s, AUTO-002 TC-003 ~7.3 s, AUTO-003 ~12.2 s), 100% de
      consistencia entre corridas y entre entornos (chrome-desktop vs. chrome-mobile).
- [ ] Calcular y presentar ≥5 métricas en el informe (ej. % éxito manual, % éxito
      automatizado, tiempo promedio de ejecución, tasa de consistencia entre corridas,
      cantidad de defectos por severidad).
- [ ] Identificar ≥3 tendencias/patrones/fallos recurrentes.
- [ ] Comparar resultados manuales vs. automatizados.
- [ ] Formular ≥3 recomendaciones priorizadas y sustentadas en evidencia.

### Generales
- [ ] Completar datos de portada: asignatura, profesor/a, fecha, integrantes.
- [ ] Verificar que ninguna captura exponga contraseñas/tokens/datos sensibles.
- [ ] Exportar informe final a PDF.
- [ ] Preparar y exportar diapositivas ejecutivas a PDF.

## 7. Próximos pasos sugeridos (orden de ejecución)

1. Completar TC-016 y decidir sobre defectos (5.1 / 5.2).
2. Completar metadatos de las 3 sesiones exploratorias (5.3).
3. Crear carpeta `automation/` con Playwright, implementar y ejecutar los 3 scripts
   (≥3 corridas, 2 entornos) (6.1 / 6.2).
4. Calcular métricas y redactar el análisis comparativo (6.3).
5. Completar portada y checklist de entrega del informe; exportar a PDF.
6. Construir las diapositivas ejecutivas a partir del resumen/hallazgos/recomendaciones.
7. Revisión final de datos sensibles y carga individual en EVA.
