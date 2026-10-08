const fs = require('fs');
const path = require('path');

const filesToClean = [
  'src/app/admin/cotizaciones/page.tsx',
  'src/app/admin/ventas/page.tsx',
  'src/app/admin/inventario/nuevo/page.tsx',
  'src/app/admin/inventario/importar/page.tsx',
  'src/components/ProductCard.tsx',
  'src/components/QuoteForm.tsx',
  'src/components/TrackingModal.tsx',
  'src/components/StoreCatalog.tsx'
];

filesToClean.forEach(fileRel => {
  const file = path.resolve(fileRel);
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  content = content
    .replace(/CotizaciÃ³n/g, 'Cotización')
    .replace(/cotizaciÃ³n/g, 'cotización')
    .replace(/CotizaciÃ³/g, 'Cotizació')
    .replace(/DescripciÃ³n/g, 'Descripción')
    .replace(/descripciÃ³n/g, 'descripción')
    .replace(/CÃ³digo/g, 'Código')
    .replace(/cÃ³digo/g, 'código')
    .replace(/Ã“rdenes/g, 'Órdenes')
    .replace(/Ã³rdenes/g, 'órdenes')
    .replace(/CategorÃ­a/g, 'Categoría')
    .replace(/categorÃ­a/g, 'categoría')
    .replace(/GarantÃ­a/g, 'Garantía')
    .replace(/garantÃ­a/g, 'garantía')
    .replace(/TelÃ©fono/g, 'Teléfono')
    .replace(/telÃ©fono/g, 'teléfono')
    .replace(/ElectrÃ³nico/g, 'Electrónico')
    .replace(/electrÃ³nico/g, 'electrónico')
    .replace(/DirecciÃ³n/g, 'Dirección')
    .replace(/direcciÃ³n/g, 'dirección')
    .replace(/RazÃ³n/g, 'Razón')
    .replace(/razÃ³n/g, 'razón')
    .replace(/InformaciÃ³n/g, 'Información')
    .replace(/informaciÃ³n/g, 'información')
    .replace(/EdiciÃ³n/g, 'Edición')
    .replace(/ediciÃ³n/g, 'edición')
    .replace(/AtenciÃ³n/g, 'Atención')
    .replace(/atenciÃ³n/g, 'atención')
    .replace(/UbicaciÃ³n/g, 'Ubicación')
    .replace(/ubicaciÃ³n/g, 'ubicación')
    .replace(/RetenciÃ³n/g, 'Retención')
    .replace(/retenciÃ³n/g, 'retención')
    .replace(/TÃ©rminos/g, 'Términos')
    .replace(/tÃ©rminos/g, 'términos')
    .replace(/ArtÃ­culo/g, 'Artículo')
    .replace(/artÃ­culo/g, 'artículo')
    .replace(/NÃºmero/g, 'Número')
    .replace(/nÃºmero/g, 'número')
    .replace(/IngenierÃ­a/g, 'Ingeniería')
    .replace(/ingenierÃ­a/g, 'ingeniería')
    .replace(/Ã/g, 'Á')
    .replace(/Ã‰/g, 'É')
    .replace(/Ã/g, 'Í')
    .replace(/Ã“/g, 'Ó')
    .replace(/Ãš/g, 'Ú')
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã‘/g, 'Ñ');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Cleaned file:', fileRel);
});