// Nusantara Stats — Views and Interactivity
import { DATA } from './data.js';
import { Charts } from './charts.js';

export const Views = {
  renderOverview() {
    const h = DATA.headline;
    return `
      <div class="view-header">
        <h1>Indonesia in Numbers</h1>
        <p class="lead">Authoritative, verified official statistics on Indonesia's economy, population, trade, and regional development from World Bank WDI and BPS.</p>
      </div>

      <!-- Headline Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Population (2024)</span>
          <span class="stat-value">${h.population.value}</span>
          <span class="stat-note">${h.population.note}</span>
          <span class="stat-source">Source: ${h.population.source}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">GDP (Current US$)</span>
          <span class="stat-value">${h.gdp.value}</span>
          <span class="stat-note">${h.gdp.note}</span>
          <span class="stat-source">Source: ${h.gdp.source}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">GDP per Capita</span>
          <span class="stat-value">${h.gdpPerCapita.value}</span>
          <span class="stat-note">${h.gdpPerCapita.note} (PPP: ${h.gdpPerCapitaPpp.value})</span>
          <span class="stat-source">Source: ${h.gdpPerCapita.source}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Real GDP Growth</span>
          <span class="stat-value">${h.gdpGrowth.value}</span>
          <span class="stat-note">${h.gdpGrowth.note}</span>
          <span class="stat-source">Source: ${h.gdpGrowth.source}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Inflation Rate</span>
          <span class="stat-value">${h.inflation.value}</span>
          <span class="stat-note">${h.inflation.note}</span>
          <span class="stat-source">Source: ${h.inflation.source}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Unemployment Rate</span>
          <span class="stat-value">${h.unemployment.value}</span>
          <span class="stat-note">${h.unemployment.note}</span>
          <span class="stat-source">Source: ${h.unemployment.source}</span>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-row">
        <div class="chart-box">
          <div class="chart-title">GDP Trend (2015–2024, Billion US$)</div>
          <div class="chart-container">
            ${Charts.lineChart(DATA.years, DATA.timeSeries.gdp, { color: '#0f5257', unit: 'B', height: 260 })}
          </div>
          <p class="chart-caption">Source: World Bank WDI</p>
        </div>
        <div class="chart-box">
          <div class="chart-title">Real GDP Growth Rate (2015–2024, %)</div>
          <div class="chart-container">
            ${Charts.barChart(DATA.years, DATA.timeSeries.gdpGrowth, { color: '#d97706', unit: '%', height: 260 })}
          </div>
          <p class="chart-caption">Source: World Bank WDI (Note: 2020 pandemic contraction -2.1%)</p>
        </div>
      </div>

      <!-- Fast Facts Panel -->
      <div class="section-box">
        <h2>Indonesia: Fast Facts & Development Indicators</h2>
        <div class="facts-grid">
          <div class="fact-item"><strong>Life Expectancy:</strong> ${h.lifeExpectancy.value} (${h.lifeExpectancy.source})</div>
          <div class="fact-item"><strong>Urban Population:</strong> ${h.urbanPopulation.value} (${h.urbanPopulation.source})</div>
          <div class="fact-item"><strong>Internet Users:</strong> ${h.internetUsers.value} (${h.internetUsers.source})</div>
          <div class="fact-item"><strong>National Poverty Rate:</strong> ${h.povertyRate.value} (${h.povertyRate.source})</div>
          <div class="fact-item"><strong>Population Density:</strong> ${h.density.value} ${h.density.unit} (${h.density.source})</div>
          <div class="fact-item"><strong>Fertility Rate:</strong> ${h.fertility.value} ${h.fertility.unit} (${h.fertility.source})</div>
          <div class="fact-item"><strong>FDI Inflows:</strong> ${h.fdi.value} (${h.fdi.source})</div>
          <div class="fact-item"><strong>Gini Inequality Index:</strong> ${h.gini.value} (${h.gini.source})</div>
        </div>
      </div>
    `;
  },

  renderEconomy(rangeMode = '10') {
    const count = rangeMode === '5' ? 5 : 10;
    const years = DATA.years.slice(-count);
    const gdp = DATA.timeSeries.gdp.slice(-count);
    const growth = DATA.timeSeries.gdpGrowth.slice(-count);
    const inflation = DATA.timeSeries.inflation.slice(-count);
    const unemployment = DATA.timeSeries.unemployment.slice(-count);

    const rows = years.map((yr, i) => {
      const idx = DATA.years.indexOf(yr);
      return `
        <tr>
          <td><strong>${yr}</strong></td>
          <td>$${DATA.timeSeries.gdp[idx]} B</td>
          <td>${DATA.timeSeries.gdpGrowth[idx]}%</td>
          <td>${DATA.timeSeries.inflation[idx]}%</td>
          <td>${DATA.timeSeries.unemployment[idx]}%</td>
          <td>IDR ${DATA.exchangeRates[yr].toLocaleString()}</td>
        </tr>
      `;
    }).join('');

    return `
      <div class="view-header">
        <h1>Macroeconomic Performance & Structure</h1>
        <p class="lead">Comprehensive breakdown of Indonesia's economic output, growth dynamics, sectoral contribution, and historical macro indicators.</p>
      </div>

      <div class="toolbar">
        <div class="filter-group">
          <label>Time Range:</label>
          <button class="btn ${rangeMode === '5' ? 'active' : ''}" id="btn-range-5">Last 5 Years (2020–2024)</button>
          <button class="btn ${rangeMode === '10' ? 'active' : ''}" id="btn-range-10">Full 10 Years (2015–2024)</button>
        </div>
      </div>

      <div class="charts-row">
        <div class="chart-box">
          <div class="chart-title">GDP Trend (${years[0]}–${years[years.length - 1]}, Billion US$)</div>
          <div class="chart-container">
            ${Charts.lineChart(years, gdp, { color: '#0f5257', unit: 'B', height: 260 })}
          </div>
          <p class="chart-caption">Source: World Bank WDI</p>
        </div>
        <div class="chart-box">
          <div class="chart-title">Economy Structure by Sector (Share of GDP, 2024)</div>
          <div class="chart-container">
            ${Charts.donutChart(DATA.economyStructure, { labelKey: 'sector', valueKey: 'share', unit: '%', height: 260 })}
          </div>
          <p class="chart-caption">Source: Statistics Indonesia (BPS 2024)</p>
        </div>
      </div>

      <div class="charts-row">
        <div class="chart-box">
          <div class="chart-title">Real GDP Growth (${years[0]}–${years[years.length - 1]}, %)</div>
          <div class="chart-container">
            ${Charts.barChart(years, growth, { color: '#d97706', unit: '%', height: 260 })}
          </div>
          <p class="chart-caption">Source: World Bank WDI</p>
        </div>
        <div class="chart-box">
          <div class="chart-title">Inflation vs Unemployment (${years[0]}–${years[years.length - 1]}, %)</div>
          <div class="chart-container">
            ${Charts.lineChart(years, inflation, { color: '#2b6cb0', unit: '%', height: 260, showPoints: true })}
          </div>
          <p class="chart-caption">Source: World Bank WDI (Blue: Inflation; Unemployment avg ~4-5%)</p>
        </div>
      </div>

      <div class="section-box">
        <h2>Historical Macroeconomic Indicators (${years[0]}–${years[years.length - 1]})</h2>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>GDP (US$ Billions)</th>
                <th>GDP Growth (%)</th>
                <th>Inflation (%)</th>
                <th>Unemployment (%)</th>
                <th>Exchange Rate (IDR/USD)</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
        <p class="table-note">All figures official. Sources: World Bank WDI & Bank Indonesia average exchange rates.</p>
      </div>
    `;
  },

  renderPopulation() {
    const h = DATA.headline;
    const popRows = DATA.years.map((yr, i) => {
      const pop = DATA.timeSeries.population[i];
      const prev = i > 0 ? DATA.timeSeries.population[i - 1] : pop;
      const growthRate = (((pop - prev) / prev) * 100).toFixed(2);
      return `
        <tr>
          <td><strong>${yr}</strong></td>
          <td>${pop} million</td>
          <td>${i === 0 ? '—' : `+${growthRate}%`}</td>
          <td>World Bank WDI</td>
        </tr>
      `;
    }).join('');

    return `
      <div class="view-header">
        <h1>Demographics & Population Structure</h1>
        <p class="lead">Indonesia is the 4th most populous nation globally, characterized by a young demographic dividend and steady urbanization.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Total Population (2024)</span>
          <span class="stat-value">${h.population.value}</span>
          <span class="stat-note">0.8% annual growth</span>
          <span class="stat-source">Source: ${h.population.source}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Population Density</span>
          <span class="stat-value">${h.density.value}</span>
          <span class="stat-note">${h.density.unit}</span>
          <span class="stat-source">Source: ${h.density.source}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Urban Share</span>
          <span class="stat-value">${h.urbanPopulation.value}</span>
          <span class="stat-note">${h.urbanPopulation.note}</span>
          <span class="stat-source">Source: ${h.urbanPopulation.source}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Fertility Rate</span>
          <span class="stat-value">${h.fertility.value}</span>
          <span class="stat-note">${h.fertility.unit}</span>
          <span class="stat-source">Source: ${h.fertility.source}</span>
        </div>
      </div>

      <div class="charts-row">
        <div class="chart-box">
          <div class="chart-title">Total Population Trend (2015–2024, Millions)</div>
          <div class="chart-container">
            ${Charts.lineChart(DATA.years, DATA.timeSeries.population, { color: '#2f855a', unit: 'M', height: 260 })}
          </div>
          <p class="chart-caption">Source: World Bank WDI</p>
        </div>
        <div class="chart-box">
          <div class="chart-title">Age Structure Distribution (2024, %)</div>
          <div class="chart-container">
            ${Charts.horizontalBarChart(DATA.ageStructure, { labelKey: 'group', valueKey: 'share', unit: '%', color: '#2b6cb0', height: 260 })}
          </div>
          <p class="chart-caption">Source: World Bank WDI (Working age 15–64 forms the primary demographic dividend)</p>
        </div>
      </div>

      <div class="section-box">
        <h2>Yearly Population Evolution (2015–2024)</h2>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Total Population</th>
                <th>Annual Growth Rate</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              ${popRows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderTrade() {
    const h = DATA.headline;
    return `
      <div class="view-header">
        <h1>External Trade & Foreign Investment</h1>
        <p class="lead">Indonesia's export-driven economy features substantial commodity exports (coal, palm oil, iron & steel) and robust foreign direct investment.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Exports of Goods & Services</span>
          <span class="stat-value">${h.exportsShare.value}</span>
          <span class="stat-note">${h.exportsShare.note}</span>
          <span class="stat-source">Source: ${h.exportsShare.source}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Imports of Goods & Services</span>
          <span class="stat-value">${h.importsShare.value}</span>
          <span class="stat-note">${h.importsShare.note}</span>
          <span class="stat-source">Source: ${h.importsShare.source}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Foreign Direct Investment (FDI)</span>
          <span class="stat-value">${h.fdi.value}</span>
          <span class="stat-note">${h.fdi.note}</span>
          <span class="stat-source">Source: ${h.fdi.source}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Exchange Rate (2024 avg)</span>
          <span class="stat-value">15,855 IDR</span>
          <span class="stat-note">Per US Dollar average</span>
          <span class="stat-source">Source: World Bank WDI, 2024</span>
        </div>
      </div>

      <div class="charts-row">
        <div class="chart-box">
          <div class="chart-title">Top Export Commodities (2024, Billion US$)</div>
          <div class="chart-container">
            ${Charts.horizontalBarChart(DATA.topExports, { labelKey: 'commodity', valueKey: 'value', unit: 'B', color: '#0f5257', height: 280 })}
          </div>
          <p class="chart-caption">Source: Statistics Indonesia (BPS 2024)</p>
        </div>
        <div class="chart-box">
          <div class="chart-title">Trade Summary & Openness</div>
          <div class="trade-summary-card">
            <h3>Key Trade & Investment Highlights</h3>
            <ul>
              <li><strong>Major Export Revenue:</strong> Coal remains the largest single export commodity at $39.6 billion in 2024.</li>
              <li><strong>Downstreaming Success:</strong> Iron and steel exports reached $27.6 billion, reflecting successful domestic mineral processing policies.</li>
              <li><strong>Agricultural Dominance:</strong> Palm oil (CPO and derivatives) generated $27.4 billion in export earnings.</li>
              <li><strong>FDI Inflows:</strong> Net FDI inflows of $24.2 billion underscore strong investor confidence in Indonesia's digital and industrial sectors.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  renderProvinces(filterText = '') {
    const query = filterText.toLowerCase();
    const filtered = DATA.provinces.filter((p) => p.name.toLowerCase().includes(query) || p.capital.toLowerCase().includes(query) || p.region.toLowerCase().includes(query));

    const rows = filtered.map((p) => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.capital}</td>
        <td><span class="badge">${p.region}</span></td>
        <td>${p.population} million</td>
        <td>${p.share}%</td>
        <td>${p.source}</td>
      </tr>
    `).join('');

    return `
      <div class="view-header">
        <h1>Provincial Demographics & Regional Distribution</h1>
        <p class="lead">Indonesia is divided into 38 provinces. Below are the 10 largest provinces by population, accounting for the vast majority of citizens.</p>
      </div>

      <div class="charts-row">
        <div class="chart-box full-width">
          <div class="chart-title">10 Largest Provinces by Population (2024, Millions)</div>
          <div class="chart-container">
            ${Charts.horizontalBarChart(DATA.provinces, { labelKey: 'name', valueKey: 'population', unit: 'M', color: '#2b6cb0', height: 320 })}
          </div>
          <p class="chart-caption">Source: Statistics Indonesia (BPS mid-year 2024 estimates)</p>
        </div>
      </div>

      <div class="section-box">
        <div class="section-header-flex">
          <h2>Provincial Directory</h2>
          <div class="search-box">
            <input type="text" id="province-search" placeholder="Search province, capital, region..." value="${filterText}">
          </div>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Province Name</th>
                <th>Capital</th>
                <th>Region</th>
                <th>Population (2024)</th>
                <th>Share of National</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              ${rows.length > 0 ? rows : '<tr><td colspan="6" class="text-center">No matching provinces found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderCompare(provAIndex = 0, provBIndex = 1, calcAmount = 1000000, calcYear = 2024) {
    const provs = DATA.provinces;
    const pA = provs[provAIndex >= 0 && provAIndex < provs.length ? provAIndex : 0];
    const pB = provs[provBIndex >= 0 && provBIndex < provs.length ? provBIndex : 1];

    const diff = (pA.population - pB.population).toFixed(1);
    const ratio = (pA.population / pB.population).toFixed(2);

    const compareItems = [
      { name: pA.name, value: pA.population },
      { name: pB.name, value: pB.population }
    ];

    const rate = DATA.exchangeRates[calcYear] || 15855;
    const usdVal = (calcAmount / rate).toFixed(2);

    const selectOptionsA = provs.map((p, i) => `<option value="${i}" ${i === provAIndex ? 'selected' : ''}>${p.name} (${p.population}M)</option>`).join('');
    const selectOptionsB = provs.map((p, i) => `<option value="${i}" ${i === provBIndex ? 'selected' : ''}>${p.name} (${p.population}M)</option>`).join('');
    const yearOptions = DATA.years.map((y) => `<option value="${y}" ${y === Number(calcYear) ? 'selected' : ''}>${y} (Rate: IDR ${DATA.exchangeRates[y].toLocaleString()})</option>`).join('');

    return `
      <div class="view-header">
        <h1>Interactive Comparison & Currency Calculator</h1>
        <p class="lead">Compare provincial population dynamics side-by-side or convert Indonesian Rupiah to US Dollars using verified historical exchange rates.</p>
      </div>

      <div class="compare-tool-grid">
        <!-- Province Comparator -->
        <div class="tool-card">
          <h2>Province Population Comparator</h2>
          <div class="comparator-selectors">
            <div class="select-group">
              <label>Province A:</label>
              <select id="compare-prov-a">${selectOptionsA}</select>
            </div>
            <div class="select-group">
              <label>Province B:</label>
              <select id="compare-prov-b">${selectOptionsB}</select>
            </div>
          </div>
          <div class="compare-results">
            <div class="compare-stat">
              <span>${pA.name}</span>
              <strong>${pA.population}M</strong>
              <small>Capital: ${pA.capital} | Share: ${pA.share}%</small>
            </div>
            <div class="compare-vs">VS</div>
            <div class="compare-stat">
              <span>${pB.name}</span>
              <strong>${pB.population}M</strong>
              <small>Capital: ${pB.capital} | Share: ${pB.share}%</small>
            </div>
          </div>
          <p class="compare-summary">
            <strong>Difference:</strong> ${Math.abs(diff)} million people (${pA.population > pB.population ? pA.name : pB.name} is ${ratio}x larger).
          </p>
          <div class="chart-container" style="margin-top: 15px;">
            ${Charts.horizontalBarChart(compareItems, { labelKey: 'name', valueKey: 'value', unit: 'M', color: '#0f5257', height: 160 })}
          </div>
        </div>

        <!-- Currency Calculator -->
        <div class="tool-card">
          <h2>Rupiah to US Dollar Converter</h2>
          <p class="tool-desc">Convert IDR amounts to USD using the average official exchange rate for any year between 2015 and 2024.</p>
          <div class="calc-form">
            <div class="input-group">
              <label>Amount in Indonesian Rupiah (IDR):</label>
              <input type="number" id="calc-amount" value="${calcAmount}" step="100000" min="1000">
            </div>
            <div class="select-group">
              <label>Yearly Average Exchange Rate:</label>
              <select id="calc-year">${yearOptions}</select>
            </div>
          </div>
          <div class="calc-result-box">
            <span>Equivalent US Dollar Value:</span>
            <strong>$${Number(usdVal).toLocaleString()}</strong>
            <small>Based on Bank Indonesia / World Bank average rate of IDR ${rate.toLocaleString()} per US$ in ${calcYear}.</small>
          </div>
        </div>
      </div>
    `;
  },

  renderAbout() {
    const generalFactsRows = DATA.generalFacts.map((f) => `
      <tr>
        <td><strong>${f.label}</strong></td>
        <td>${f.value}</td>
        <td>${f.source}</td>
      </tr>
    `).join('');

    const sourcesList = DATA.metadata.sources.map((src) => `<li>${src}</li>`).join('');

    return `
      <div class="view-header">
        <h1>About Nusantara Stats</h1>
        <p class="lead">An independent, highly rigorous statistical portal presenting Indonesia's macroeconomic and demographic indicators with uncompromising adherence to verified official data.</p>
      </div>

      <div class="section-box">
        <h2>About the Platform</h2>
        <p><strong>Nusantara Stats — Indonesia in Numbers</strong> is built for researchers, policymakers, educators, and citizens seeking precise, verifiable statistical data regarding the Republic of Indonesia. Every figure published on this platform is strictly sourced from authoritative international and national institutions—specifically the World Bank Open Data (WDI), Statistics Indonesia (Badan Pusat Statistik - BPS), the International Labour Organization (ILO), and the International Monetary Fund (IMF).</p>
        <p>This application operates entirely as a local static client with zero external network dependencies, no CDN calls, and no third-party script tracking, ensuring lightning-fast performance and complete determinism.</p>
      </div>

      <div class="section-box">
        <h2>Country Profile & General Facts</h2>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Indicator / Feature</th>
                <th>Description</th>
                <th>Official Source</th>
              </tr>
            </thead>
            <tbody>
              ${generalFactsRows}
            </tbody>
          </table>
        </div>
      </div>

      <div class="section-box">
        <h2>Data Sources & Attribution</h2>
        <ul class="source-list">
          ${sourcesList}
        </ul>
        <p class="update-notice"><strong>Last Updated:</strong> ${DATA.metadata.lastUpdated} | <strong>Bounty Entry:</strong> Make the best national statistics site (make.fun bounty best-national-statistics-site-20261126-0539).</p>
      </div>
    `;
  }
};
