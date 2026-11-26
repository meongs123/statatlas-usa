// charts.js — hand-rolled SVG bar charts. No library, no framework.
// One job: turn [{label, value}] into a labelled horizontal bar chart string.

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function barChart(rows, opts) {
  const o = Object.assign({ width: 560, barHeight: 26, gap: 12, max: null, unit: '%', color: '#0e7a6d', track: '#e9e2d2', labelWidth: 110, decimals: 2 }, opts || {});
  const max = o.max || Math.max.apply(null, rows.map(function (r) { return r.value; }));
  const labelW = o.labelWidth;
  const plotW = o.width - labelW - 86;
  const height = rows.length * (o.barHeight + o.gap) + 8;
  let out = '<svg viewBox="0 0 ' + o.width + ' ' + height + '" width="100%" role="img" aria-label="Bar chart">';
  rows.forEach(function (r, i) {
    const y = 8 + i * (o.barHeight + o.gap);
    const w = Math.max(2, (r.value / max) * plotW);
    const shown = r.display !== undefined ? r.display : r.value.toFixed(o.decimals) + o.unit;
    out += '<rect x="' + labelW + '" y="' + y + '" width="' + plotW + '" height="' + o.barHeight + '" rx="4" fill="' + o.track + '"/>';
    out += '<rect x="' + labelW + '" y="' + y + '" width="' + w.toFixed(1) + '" height="' + o.barHeight + '" rx="4" fill="' + (r.color || o.color) + '"/>';
    out += '<text x="0" y="' + (y + o.barHeight * 0.68) + '" font-size="13" fill="#2b2b26">' + esc(r.label) + '</text>';
    out += '<text x="' + (labelW + w + 8) + '" y="' + (y + o.barHeight * 0.68) + '" font-size="13" font-weight="700" fill="#14201f">' + esc(shown) + '</text>';
  });
  out += '</svg>';
  return out;
}

// Paired bars: two series side by side per row (used by the compare view).
export function pairedBarChart(rows, opts) {
  const o = Object.assign({ width: 560, barHeight: 18, gap: 16, max: null, unit: '', labelWidth: 150, decimals: 2 }, opts || {});
  const max = o.max || Math.max.apply(null, rows.map(function (r) { return Math.max(r.a, r.b); }));
  const labelW = o.labelWidth;
  const plotW = o.width - labelW - 96;
  const rowH = o.barHeight * 2 + 6;
  const height = rows.length * (rowH + o.gap) + 8;
  let out = '<svg viewBox="0 0 ' + o.width + ' ' + height + '" width="100%" role="img" aria-label="Paired bar chart">';
  rows.forEach(function (r, i) {
    const y = 8 + i * (rowH + o.gap);
    const wa = Math.max(2, (r.a / max) * plotW);
    const wb = Math.max(2, (r.b / max) * plotW);
    out += '<text x="0" y="' + (y + rowH * 0.55) + '" font-size="13" fill="#2b2b26">' + esc(r.label) + '</text>';
    out += '<rect x="' + labelW + '" y="' + y + '" width="' + wa.toFixed(1) + '" height="' + o.barHeight + '" rx="3" fill="#0e7a6d"/>';
    out += '<text x="' + (labelW + wa + 6) + '" y="' + (y + o.barHeight * 0.75) + '" font-size="12" font-weight="700" fill="#14201f">' + esc(r.aDisplay) + '</text>';
    out += '<rect x="' + labelW + '" y="' + (y + o.barHeight + 3) + '" width="' + wb.toFixed(1) + '" height="' + o.barHeight + '" rx="3" fill="#e8a33d"/>';
    out += '<text x="' + (labelW + wb + 6) + '" y="' + (y + o.barHeight * 2 + 1) + '" font-size="12" font-weight="700" fill="#14201f">' + esc(r.bDisplay) + '</text>';
  });
  out += '</svg>';
  return out;
}
