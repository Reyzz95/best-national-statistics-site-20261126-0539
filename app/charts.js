// Nusantara Stats — Pure SVG Chart Generator
export const Charts = {
  lineChart(years, data, options = {}) {
    const { color = '#0f5257', strokeWidth = 3, unit = '', showPoints = true, height = 260 } = options;
    const width = 600;
    const pad = 40;
    const padL = 60;
    const chartW = width - padL - pad;
    const chartH = height - pad * 2;

    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal || 1;
    // Add 10% padding top/bottom
    const adjustedMin = Math.max(0, minVal - range * 0.1);
    const adjustedMax = maxVal + range * 0.1;
    const valRange = adjustedMax - adjustedMin || 1;

    const points = data.map((val, i) => {
      const x = padL + (i / (data.length - 1)) * chartW;
      const y = height - pad - ((val - adjustedMin) / valRange) * chartH;
      return { x, y, val, year: years[i] };
    });

    const pathD = points.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

    // Area fill path
    const first = points[0];
    const last = points[points.length - 1];
    const areaD = `${pathD} L ${last.x} ${height - pad} L ${first.x} ${height - pad} Z`;

    // Horizontal grid lines
    const gridLines = [0.25, 0.5, 0.75].map((pct) => {
      const y = pad + chartH * pct;
      const val = adjustedMax - pct * valRange;
      return `<line x1="${padL}" y1="${y}" x2="${width - pad}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="4" /><text x="${padL - 8}" y="${y + 4}" font-size="10" fill="#64748b" text-anchor="end">${val.toFixed(1)}${unit}</text>`;
    }).join('');

    const xLabels = points.map((p) => `<text x="${p.x}" y="${height - pad + 20}" font-size="11" fill="#475569" text-anchor="middle">${p.year}</text>`).join('');

    const circles = showPoints ? points.map((p) => `<circle cx="${p.x}" cy="${p.y}" r="4.5" fill="${color}" stroke="#ffffff" stroke-width="2"><title>${p.year}: ${p.val}${unit}</title></circle>`).join('') : '';

    return `
      <svg viewBox="0 0 ${width} ${height}" class="nusantara-svg-chart" width="100%" height="100%">
        <defs>
          <linearGradient id="lineGrad-${color.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <!-- Background grid -->
        ${gridLines}
        <line x1="${padL}" y1="${pad}" x2="${padL}" y2="${height - pad}" stroke="#cbd5e1" stroke-width="1.5" />
        <line x1="${padL}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="#cbd5e1" stroke-width="1.5" />
        
        <!-- Area fill -->
        <path d="${areaD}" fill="url(#lineGrad-${color.replace('#','')})" />
        
        <!-- Main Line -->
        <path d="${pathD}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />
        
        <!-- Points -->
        ${circles}
        
        <!-- X Axis Labels -->
        ${xLabels}
      </svg>
    `;
  },

  barChart(years, data, options = {}) {
    const { color = '#0f5257', unit = '', height = 260 } = options;
    const width = 600;
    const pad = 40;
    const chartW = width - pad * 2;
    const chartH = height - pad * 2;

    const minVal = Math.min(0, ...data);
    const maxVal = Math.max(...data);
    const span = maxVal - minVal || 1;

    const barW = (chartW / data.length) * 0.65;
    const step = chartW / data.length;

    const zeroY = height - pad - ((0 - minVal) / span) * chartH;

    const bars = data.map((val, i) => {
      const x = pad + i * step + (step - barW) / 2;
      const barH = Math.abs((val / span) * chartH);
      const y = val >= 0 ? zeroY - barH : zeroY;
      return `
        <g class="bar-group">
          <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="3" fill="${color}" opacity="0.9">
            <title>${years[i]}: ${val}${unit}</title>
          </rect>
          <text x="${x + barW / 2}" y="${height - pad + 18}" font-size="11" fill="#475569" text-anchor="middle">${years[i]}</text>
          <text x="${x + barW / 2}" y="${val >= 0 ? y - 6 : y + barH + 14}" font-size="10" fill="#1e293b" text-anchor="middle" font-weight="600">${val}${unit}</text>
        </g>
      `;
    }).join('');

    return `
      <svg viewBox="0 0 ${width} ${height}" class="nusantara-svg-chart" width="100%" height="100%">
        <line x1="${pad}" y1="${zeroY}" x2="${width - pad}" y2="${zeroY}" stroke="#94a3b8" stroke-width="1.5" />
        <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" stroke="#cbd5e1" stroke-width="1.5" />
        ${bars}
      </svg>
    `;
  },

  horizontalBarChart(items, options = {}) {
    const { labelKey = 'name', valueKey = 'value', unit = '', color = '#0f5257', height = 300 } = options;
    const width = 600;
    const padL = 130;
    const padR = 50;
    const padT = 20;
    const padB = 20;
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;

    const maxVal = Math.max(...items.map((item) => item[valueKey])) || 1;
    const rowH = chartH / items.length;

    const rows = items.map((item, i) => {
      const val = item[valueKey];
      const barW = (val / maxVal) * chartW;
      const y = padT + i * rowH + (rowH * 0.15);
      const h = rowH * 0.7;
      const label = item[labelKey];

      return `
        <g class="hbar-group">
          <text x="${padL - 10}" y="${y + h / 2 + 4}" font-size="11" fill="#1e293b" text-anchor="end" font-weight="500">${label}</text>
          <rect x="${padL}" y="${y}" width="${barW}" height="${h}" rx="3" fill="${color}" opacity="0.9">
            <title>${label}: ${val}${unit}</title>
          </rect>
          <text x="${padL + barW + 8}" y="${y + h / 2 + 4}" font-size="11" fill="#475569" font-weight="600">${val}${unit}</text>
        </g>
      `;
    }).join('');

    return `
      <svg viewBox="0 0 ${width} ${height}" class="nusantara-svg-chart" width="100%" height="100%">
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${height - padB}" stroke="#cbd5e1" stroke-width="1.5" />
        ${rows}
      </svg>
    `;
  },

  donutChart(items, options = {}) {
    const { labelKey = 'sector', valueKey = 'share', unit = '%', height = 260 } = options;
    const width = 500;
    const cx = 140;
    const cy = height / 2;
    const r = 85;
    const rInner = 50;

    const total = items.reduce((sum, item) => sum + item[valueKey], 0) || 1;
    let accumulatedAngle = 0;

    const colors = ['#0f5257', '#d97706', '#2b6cb0', '#2f855a', '#b7791f', '#6b46c1', '#c53030', '#4a5568'];

    const slices = items.map((item, i) => {
      const val = item[valueKey];
      const angle = (val / total) * 360;
      const color = colors[i % colors.length];

      const x1 = cx + r * Math.cos((Math.PI * (accumulatedAngle - 90)) / 180);
      const y1 = cy + r * Math.sin((Math.PI * (accumulatedAngle - 90)) / 180);
      const x2 = cx + r * Math.cos((Math.PI * (accumulatedAngle + angle - 90)) / 180);
      const y2 = cy + r * Math.sin((Math.PI * (accumulatedAngle + angle - 90)) / 180);

      const ix1 = cx + rInner * Math.cos((Math.PI * (accumulatedAngle + angle - 90)) / 180);
      const iy1 = cy + rInner * Math.sin((Math.PI * (accumulatedAngle + angle - 90)) / 180);
      const ix2 = cx + rInner * Math.cos((Math.PI * (accumulatedAngle - 90)) / 180);
      const iy2 = cy + rInner * Math.sin((Math.PI * (accumulatedAngle - 90)) / 180);

      const largeArc = angle > 180 ? 1 : 0;
      const pathD = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${rInner} ${rInner} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;

      accumulatedAngle += angle;

      return `<path d="${pathD}" fill="${color}" stroke="#ffffff" stroke-width="2"><title>${item[labelKey]}: ${val}${unit} (${((val / total) * 100).toFixed(1)}%)</title></path>`;
    }).join('');

    const legend = items.map((item, i) => {
      const color = colors[i % colors.length];
      const y = 35 + i * 26;
      return `
        <g transform="translate(280, ${y})">
          <rect width="14" height="14" rx="3" fill="${color}" />
          <text x="22" y="11" font-size="11" fill="#1e293b" font-weight="500">${item[labelKey]} (${item[valueKey]}${unit})</text>
        </g>
      `;
    }).join('');

    return `
      <svg viewBox="0 0 ${width} ${height}" class="nusantara-svg-chart" width="100%" height="100%">
        ${slices}
        <circle cx="${cx}" cy="${cy}" r="${rInner}" fill="#ffffff" />
        <text x="${cx}" y="${cy - 4}" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Structure</text>
        <text x="${cx}" y="${cy + 14}" font-size="11" fill="#64748b" text-anchor="middle">100% Total</text>
        ${legend}
      </svg>
    `;
  }
};
