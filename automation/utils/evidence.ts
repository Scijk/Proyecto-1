import { TestInfo } from '@playwright/test';

/**
 * Genera una ruta de evidencia única por ejecución (proyecto/entorno + marca de
 * tiempo), para no sobrescribir capturas entre corridas repetidas y así conservar
 * evidencia de las 3 ejecuciones exigidas por caso, en cada entorno probado.
 */
export function evidencePath(testInfo: TestInfo, label: string) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `evidence/${label}__${testInfo.project.name}__${stamp}.png`;
}
