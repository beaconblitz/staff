const fs = require('fs');
const path = require('path');

const source = process.argv[2] || 'C:/Users/aslu4/Downloads/bb-staff-default-rtdb-export.json';
const output = process.argv[3] || path.join(process.cwd(), 'supabase-import-firebase.sql');

const data = JSON.parse(fs.readFileSync(source, 'utf8'));
const rows = [];

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function walk(currentPath, value) {
  if (value === undefined) return;
  if (isPlainObject(value) && Object.keys(value).length) {
    Object.entries(value).forEach(([key, child]) => {
      walk(currentPath ? `${currentPath}/${key}` : key, child);
    });
    return;
  }
  rows.push({ path: currentPath, value });
}

function sqlQuote(value) {
  return String(value).replace(/'/g, "''");
}

walk('', data);

let sql = '-- Import Firebase Realtime Database export into Supabase kv_store\n';
sql += '-- Run supabase-schema.sql first, then run this file in Supabase SQL Editor.\n\n';
sql += 'begin;\n';

for (let i = 0; i < rows.length; i += 250) {
  const chunk = rows.slice(i, i + 250);
  sql += 'insert into public.kv_store (path, value) values\n';
  sql += chunk
    .map((row) => `  ('${sqlQuote(row.path)}', '${sqlQuote(JSON.stringify(row.value))}'::jsonb)`)
    .join(',\n');
  sql += '\non conflict (path) do update set value = excluded.value, updated_at = now();\n';
}

sql += 'commit;\n';

fs.writeFileSync(output, sql);
console.log(`Created ${output}`);
console.log(`Rows: ${rows.length}`);
