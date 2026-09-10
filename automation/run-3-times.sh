#!/usr/bin/env bash
# Ejecuta la suite completa 3 veces consecutivas (indicador 6.1 / 6.2: repetibilidad)
# y guarda un reporte JSON por corrida en reports/run-N.json para poder comparar
# resultados y calcular métricas de consistencia (indicador 6.3).
#
# Uso:
#   ./run-3-times.sh                 # corre en el proyecto por defecto (chromium-desktop)
#   PROJECT=firefox-desktop ./run-3-times.sh   # corre en otro entorno/navegador
set -euo pipefail
cd "$(dirname "$0")"

PROJECT="${PROJECT:-chrome-desktop}"
mkdir -p reports

for i in 1 2 3; do
  echo "== Run $i ($PROJECT) =="
  PLAYWRIGHT_JSON_OUTPUT_NAME="reports/run-${i}-${PROJECT}.json" \
    npx playwright test --project="$PROJECT" --reporter=list,json || true
done

echo "Corridas finalizadas. Revisa reports/run-*-${PROJECT}.json y reports/html/index.html"
