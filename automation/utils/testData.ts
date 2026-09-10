/**
 * Datos de prueba parametrizados para la creación de productos (AUTO-003 / TC-006).
 * Se genera un nombre único por ejecución para evitar colisiones entre corridas
 * repetidas (Run 1, Run 2, Run 3) y permitir verificar la aparición del producto
 * recién creado en el inventario.
 */
export function buildProduct(runLabel = 'Run') {
  const suffix = Date.now().toString().slice(-6);
  return {
    name: `Arroz QA Automatizado ${runLabel} ${suffix}`,
    brand: 'Marca QA',
    stock: '5',
    min: '2',
    target: '10',
    price: '1990',
  };
}
