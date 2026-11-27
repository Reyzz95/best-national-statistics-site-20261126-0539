// Nusantara Stats — Indonesia in Numbers: Verified Data (DATA.md sources: World Bank WDI, BPS, ILO, IMF)
export const DATA = {
  metadata: {
    siteName: "Nusantara Stats — Indonesia in Numbers",
    lastUpdated: "27 November 2026",
    sources: [
      "World Bank Open Data (World Development Indicators - WDI)",
      "Statistics Indonesia (Badan Pusat Statistik - BPS)",
      "International Labour Organization (ILO)",
      "International Monetary Fund (IMF)"
    ]
  },
  headline: {
    population: { value: "283,487,931", numeric: 283.5, unit: "million", note: "4th most populous globally; 0.8% annual growth", source: "World Bank WDI, 2024" },
    gdp: { value: "$1,396.3 billion", numeric: 1396.3, unit: "billion US$", note: "16th largest economy in the world", source: "World Bank WDI, 2024" },
    gdpPerCapita: { value: "$4,925", numeric: 4925, unit: "US$", note: "Nominal GDP per capita", source: "World Bank WDI, 2024" },
    gdpPerCapitaPpp: { value: "$16,472", numeric: 16472, unit: "US$ PPP", note: "Purchasing power parity adjusted", source: "World Bank WDI, 2024" },
    gdpGrowth: { value: "5.0%", numeric: 5.0, unit: "%", note: "Real annual GDP growth", source: "World Bank WDI, 2024" },
    inflation: { value: "2.2%", numeric: 2.2, unit: "%", note: "Consumer prices annual (World Bank); BPS: 1.57%", source: "World Bank WDI / BPS, 2024" },
    unemployment: { value: "3.3%", numeric: 3.3, unit: "%", note: "ILO modelled (World Bank); BPS (Aug 2024): 4.9%", source: "World Bank / ILO / BPS, 2024" },
    lifeExpectancy: { value: "71.3 years", numeric: 71.3, unit: "years", note: "Life expectancy at birth", source: "World Bank WDI, 2023" },
    urbanPopulation: { value: "58.8%", numeric: 58.8, unit: "% of total", note: "Urban share of population", source: "World Bank WDI, 2024" },
    internetUsers: { value: "72.8%", numeric: 72.8, unit: "% of population", note: "Individuals using the internet", source: "World Bank WDI, 2024" },
    povertyRate: { value: "8.57%", numeric: 8.57, unit: "%", note: "National poverty rate (BPS, Sep 2024); $2.15/day PPP: 1.5%", source: "BPS / World Bank, 2024" },
    exportsShare: { value: "22.2%", numeric: 22.2, unit: "% of GDP", note: "Exports of goods and services", source: "World Bank WDI, 2024" },
    importsShare: { value: "20.4%", numeric: 20.4, unit: "% of GDP", note: "Imports of goods and services", source: "World Bank WDI, 2024" },
    fdi: { value: "$24.2 billion", numeric: 24.2, unit: "billion US$", note: "Foreign direct investment, net inflows", source: "World Bank WDI, 2024" },
    gini: { value: "34.4", numeric: 34.4, unit: "index", note: "Gini inequality index", source: "World Bank WDI, 2025" },
    density: { value: "148.6", numeric: 148.6, unit: "people / sq km", note: "Population density", source: "World Bank WDI, 2023" },
    fertility: { value: "2.1", numeric: 2.1, unit: "births / woman", note: "Fertility rate", source: "World Bank WDI, 2023" }
  },
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  timeSeries: {
    gdp: [860.9, 931.9, 1015.6, 1042.3, 1119.1, 1059.1, 1186.5, 1319.1, 1371.2, 1406.3], // billions USD
    gdpGrowth: [4.9, 5.0, 5.1, 5.2, 5.0, -2.1, 3.7, 5.3, 5.0, 5.0], // %
    population: [258.4, 261.6, 264.7, 267.7, 270.6, 273.5, 276.4, 279.1, 282.1, 283.5], // millions
    inflation: [6.4, 3.5, 3.8, 3.3, 2.8, 2.0, 1.6, 4.1, 3.7, 2.2], // %
    unemployment: [6.2, 5.6, 5.5, 5.3, 5.3, 7.1, 6.5, 5.9, 5.3, 3.3] // %
  },
  exchangeRates: {
    2015: 13389,
    2016: 13308,
    2017: 13381,
    2018: 14237,
    2019: 14148,
    2020: 14582,
    2021: 14308,
    2022: 14850,
    2023: 15237,
    2024: 15855
  },
  economyStructure: [
    { sector: "Manufacturing", share: 18.9, source: "BPS 2024" },
    { sector: "Wholesale & Retail Trade", share: 13.0, source: "BPS 2024" },
    { sector: "Agriculture, Forestry & Fishing", share: 12.5, source: "BPS 2024" },
    { sector: "Construction", share: 9.9, source: "BPS 2024" },
    { sector: "Mining & Quarrying", share: 8.2, source: "BPS 2024" },
    { sector: "Information & Communication", share: 4.0, source: "BPS 2024" },
    { sector: "Other Services & Industries", share: 33.5, source: "BPS 2024" }
  ],
  topExports: [
    { commodity: "Coal", value: 39.6, unit: "billion US$", source: "BPS 2024" },
    { commodity: "Iron and steel", value: 27.6, unit: "billion US$", source: "BPS 2024" },
    { commodity: "Palm oil (CPO & derivatives)", value: 27.4, unit: "billion US$", source: "BPS 2024" },
    { commodity: "Electrical machinery & equipment", value: 14.6, unit: "billion US$", source: "BPS 2024" },
    { commodity: "Vehicles and parts", value: 10.9, unit: "billion US$", source: "BPS 2024" },
    { commodity: "Rubber and rubber articles", value: 6.3, unit: "billion US$", source: "BPS 2024" }
  ],
  ageStructure: [
    { group: "Ages 0–14", share: 24.6, source: "World Bank WDI, 2024" },
    { group: "Ages 15–64 (Working age)", share: 68.1, source: "World Bank WDI, 2024" },
    { group: "Ages 65+", share: 7.3, source: "World Bank WDI, 2024" }
  ],
  provinces: [
    { name: "Jawa Barat (West Java)", population: 49.9, share: 17.6, capital: "Bandung", region: "Java", source: "BPS mid-year 2024" },
    { name: "Jawa Timur (East Java)", population: 41.8, share: 14.7, capital: "Surabaya", region: "Java", source: "BPS mid-year 2024" },
    { name: "Jawa Tengah (Central Java)", population: 38.0, share: 13.4, capital: "Semarang", region: "Java", source: "BPS mid-year 2024" },
    { name: "Sumatera Utara (North Sumatra)", population: 15.6, share: 5.5, capital: "Medan", region: "Sumatra", source: "BPS mid-year 2024" },
    { name: "Banten", population: 12.4, share: 4.4, capital: "Serang", region: "Java", source: "BPS mid-year 2024" },
    { name: "DKI Jakarta", population: 10.6, share: 3.7, capital: "Jakarta", region: "Java", source: "BPS mid-year 2024" },
    { name: "Sulawesi Selatan (South Sulawesi)", population: 9.4, share: 3.3, capital: "Makassar", region: "Sulawesi", source: "BPS mid-year 2024" },
    { name: "Lampung", population: 9.3, share: 3.3, capital: "Bandar Lampung", region: "Sumatra", source: "BPS mid-year 2024" },
    { name: "Sumatera Selatan (South Sumatra)", population: 8.8, share: 3.1, capital: "Palembang", region: "Sumatra", source: "BPS mid-year 2024" },
    { name: "Riau", population: 7.0, share: 2.5, capital: "Pekanbaru", region: "Sumatra", source: "BPS mid-year 2024" }
  ],
  generalFacts: [
    { label: "Capital City", value: "Jakarta (National capital moving to Nusantara, East Kalimantan)", source: "Government of Indonesia" },
    { label: "Official Language", value: "Indonesian (Bahasa Indonesia)", source: "Constitution of Indonesia" },
    { label: "National Currency", value: "Indonesian Rupiah (IDR)", source: "Bank Indonesia" },
    { label: "Total Land Area", value: "1,904,569 sq km", source: "BPS / Geospatial Information Agency" },
    { label: "Archipelago Geography", value: "17,508 islands across 38 provinces (2024)", source: "Ministry of Home Affairs, 2024" },
    { label: "Government Structure", value: "Presidential Republic; President Prabowo Subianto (since Oct 2024)", source: "General Elections Commission (KPU)" },
    { label: "Independence Day", value: "17 August 1945", source: "Historical Record" },
    { label: "Time Zones", value: "WIB (UTC+7), WITA (UTC+8), WIT (UTC+9)", source: "Standard Time Regulation" }
  ]
};
