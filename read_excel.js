const xlsx = require('xlsx');
const path = require('path');

const filePath = 'C:\\Users\\miriam.castro\\Downloads\\AXTECH INGENIERIA\\AXT-COT.xlsx';
const workbook = xlsx.readFile(filePath);

console.log('Sheet Names:', workbook.SheetNames);

workbook.SheetNames.forEach(sheetName => {
    console.log(`\n--- Sheet: ${sheetName} ---`);
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Print first 20 rows to understand the structure
    data.slice(0, 20).forEach((row, i) => {
        console.log(`Row ${i + 1}:`, row);
    });
});
