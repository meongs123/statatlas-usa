// StatAtlas data — every figure below is copied from the verified research
// artifact (top10-patterns.md) and carries its U#/I# code, value, vintage and
// short source. Nothing here comes from the UNVERIFIED list: no US median age,
// no $81,604 / $87,460 income, no 36.8% bachelor's, no Banten 2024, no
// Mar-2026 poverty, no 73.6-year life expectancy, no 2026 population.
// Source names: "U.S. Census Bureau" = the U.S. Census Bureau's QuickFacts
// profile and Vintage 2025 estimates release; "WDI" = World Bank WDI
// (updated 11 Nov 2026); "BPS" = Statistics Indonesia.

export const USA = {
  name: 'United States',
  // U2 — population estimate, 1 Jul 2025 (Vintage 2025), U.S. Census Bureau
  population: { value: 341784857, display: '341,784,857', year: '1 Jul 2025', source: 'U.S. Census Bureau Vintage 2025 estimate' },
  // U1 — 2020 count, 1 Apr 2020, U.S. Census Bureau
  population2020: { value: 331449281, display: '331,449,281', year: '1 Apr 2020', source: 'U.S. Census Bureau 2020 count' },
  // U2w — total population, World Bank WDI SP.POP.TOTL, 2024 (compare view only,
  // so the compare table is one source and one year throughout)
  populationWdi2024: { value: 340003797, display: '340,003,797', year: '2024', source: 'World Bank WDI' },
  // U3 — growth 2024→2025 +1.8M (+0.5%); 2023→2024 +3.2M (+1.0%), U.S. Census Bureau release Jan 2026
  growth: [
    { period: '2023 → 2024', people: '+3.2 million', pct: 1.0 },
    { period: '2024 → 2025', people: '+1.8 million', pct: 0.5 },
  ],
  growthNote: 'Slowest growth since early COVID. Source: U.S. Census Bureau Vintage 2025 release, Jan 2026.',
  // U4 — net international migration, Jul 2024–Jun 2025, U.S. Census Bureau
  migration: { now: 1.3, before: 2.7, change: '−53.8%', year: 'Jul 2024–Jun 2025', source: 'U.S. Census Bureau Vintage 2025 release' },
  // U5 — median household income, 2023, CPS ASEC, U.S. Census Bureau
  medianIncome: { value: 80610, display: '$80,610', year: '2023', source: 'U.S. Census Bureau, CPS ASEC 2023' },
  // U6 — official poverty rate 11.1% (CPS 2023); QuickFacts current value 10.2%
  poverty: { value: 11.1, display: '11.1%', year: '2023', source: 'U.S. Census Bureau, CPS 2023' },
  povertyAlt: { value: 10.2, display: '10.2%', note: 'QuickFacts current value (different vintage)' },
  // U7 — GDP total, 2024, World Bank WDI NY.GDP.MKTP.CD
  gdp: { value: 29.298, display: '$29.298 trillion', year: '2024', source: 'World Bank WDI' },
  // U8 — GDP per capita, 2024, WDI NY.GDP.PCAP.CD
  gdpPerCapita: { value: 86169.66, display: '$86,169.66', year: '2024', source: 'World Bank WDI' },
  // U9 — GDP per capita PPP, 2024, WDI NY.GDP.PCAP.PP.CD (US is the PPP base)
  gdpPerCapitaPpp: { value: 86169.66, display: '$86,169.66', year: '2024', source: 'World Bank WDI' },
  // U10 — life expectancy, 2024, WDI SP.DYN.LE00.IN
  lifeExpectancy: { value: 78.89, display: '78.89 years', year: '2024', source: 'World Bank WDI' },
  // U11 — urban share, 2024, WDI SP.URB.TOTL.IN.ZS
  urban: { value: 80.12, display: '80.12%', year: '2024', source: 'World Bank WDI' },
  // U12 — unemployment, modeled ILO est., 2024, WDI SL.UEM.TOTL.ZS
  unemployment: { value: 4.02, display: '4.02%', year: '2024', source: 'World Bank WDI, modeled ILO est.' },
  // U13 — age/sex shares, 2025 vintage / 2020–2024, U.S. Census Bureau QuickFacts
  ageSex: [
    { label: 'Under 5', value: 5.4 },
    { label: 'Under 18', value: 21.1 },
    { label: 'Age 65+', value: 18.9 },
    { label: 'Female', value: 50.9 },
  ],
  // U14 — age structure, 2024, World Bank WDI
  ageStructure: [
    { label: 'Age 0–14', value: 17.32 },
    { label: 'Age 15–64', value: 64.75 },
    { label: 'Age 65+', value: 17.93 },
  ],
  // U15 — owner-occupied housing, 2020–2024 (ACS 5-yr), U.S. Census Bureau
  ownerOccupied: { value: 65.2, display: '65.2%', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts, ACS 5-yr' },
  // U16 — median home value / median gross rent, 2020–2024, U.S. Census Bureau
  homeValue: { value: 332700, display: '$332,700', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts, ACS 5-yr' },
  rent: { value: 1413, display: '$1,413 / month', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts, ACS 5-yr' },
  // U17 — housing units, 1 Jul 2025 (V2025), U.S. Census Bureau
  housingUnits: { value: 148260882, display: '148,260,882', year: '1 Jul 2025', source: 'U.S. Census Bureau Vintage 2025' },
  // U18 — education age 25+, 2020–2024, U.S. Census Bureau
  highSchool: { value: 89.6, display: '89.6%', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts, ACS 5-yr' },
  bachelors: { value: 35.7, display: '35.7%', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts, ACS 5-yr' },
  // U19 — per capita income, 2020–2024, U.S. Census Bureau
  perCapitaIncome: { value: 44673, display: '$44,673', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts, ACS 5-yr' },
  // U20 — households / persons per household, 2020–2024, U.S. Census Bureau
  households: { value: 129227496, display: '129,227,496', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts, ACS 5-yr' },
  personsPerHousehold: { value: 2.53, display: '2.53', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts, ACS 5-yr' },
  // U21 — businesses, 2023, U.S. Census Bureau
  establishments: { value: 8361342, display: '8,361,342', year: '2023', source: 'U.S. Census Bureau QuickFacts' },
  businessEmployment: { value: 139831742, display: '139,831,742', year: '2023', source: 'U.S. Census Bureau QuickFacts' },
  payroll: { value: 9.556, display: '$9.556 trillion', year: '2023', source: 'U.S. Census Bureau QuickFacts' },
  // U22 — geography, 2020, U.S. Census Bureau
  density: { value: 93.8, display: '93.8 / sq mi', year: '2020', source: 'U.S. Census Bureau QuickFacts' },
  landArea: { value: 3533038.28, display: '3,533,038.28 sq mi', year: '2020', source: 'U.S. Census Bureau QuickFacts' },
  // U25 — other QuickFacts figures
  foreignBorn: { value: 14.1, display: '14.1%', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts' },
  veterans: { value: 16185883, display: '16,185,883', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts' },
  broadband: { value: 91.0, display: '91.0%', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts' },
  commute: { value: 26.4, display: '26.4 min', year: '2020–2024', source: 'U.S. Census Bureau QuickFacts' },
  retailPerCapita: { value: 20928, display: '$20,928', year: '2022', source: 'U.S. Census Bureau QuickFacts' },
};

// U23 — top 10 most populous states, 1 Jul 2025 (Vintage 2025), U.S. Census Bureau,
// "Top Ten Most Populous States: 2025" table (re-verified 26 Nov 2026).
// Region is the standard U.S. Census Bureau geographic region of each state.
// U24 — fastest-growing state: South Carolina +1.5% (2024→2025); Texas largest
// numeric gain +391,243; North Carolina +1.3% and +145,907 people. Growth
// percentages are from the release's "Top 10 States by Percent Growth" table;
// other states show "—" because their growth rate is not in the verified table.
// South Carolina's population (5,570,274) is from the release's numeric-growth table.
export const STATES = [
  { rank: 1, name: 'California', population: 39355309, display: '39,355,309', region: 'West', growthPct: null, growthNote: '' },
  { rank: 2, name: 'Texas', population: 31709821, display: '31,709,821', region: 'South', growthPct: 1.2, growthNote: '+391,243 people — largest numeric gain, 2024→2025' },
  { rank: 3, name: 'Florida', population: 23462518, display: '23,462,518', region: 'South', growthPct: null, growthNote: '' },
  { rank: 4, name: 'New York', population: 20002427, display: '20,002,427', region: 'Northeast', growthPct: null, growthNote: '' },
  { rank: 5, name: 'Pennsylvania', population: 13059432, display: '13,059,432', region: 'Northeast', growthPct: null, growthNote: '' },
  { rank: 6, name: 'Illinois', population: 12719141, display: '12,719,141', region: 'Midwest', growthPct: null, growthNote: '' },
  { rank: 7, name: 'Ohio', population: 11900510, display: '11,900,510', region: 'Midwest', growthPct: null, growthNote: '' },
  { rank: 8, name: 'Georgia', population: 11302748, display: '11,302,748', region: 'South', growthPct: null, growthNote: '' },
  { rank: 9, name: 'North Carolina', population: 11197968, display: '11,197,968', region: 'South', growthPct: 1.3, growthNote: '+145,907 people, 2024→2025' },
  { rank: 10, name: 'Michigan', population: 10127884, display: '10,127,884', region: 'Midwest', growthPct: null, growthNote: '' },
  { rank: null, name: 'South Carolina', population: 5570274, display: '5,570,274', region: 'South', growthPct: 1.5, growthNote: '+1.5% — fastest-growing state, 2024→2025' },
];

export const STATES_SOURCE = 'U.S. Census Bureau, “Top Ten Most Populous States: 2025”, Vintage 2025 estimates (1 Jul 2025). South Carolina is listed below the top 10 for its growth rate; its population is from the release’s “Top 10 States by Numeric Growth” table.';

// Indonesia — shared World Bank WDI indicators only (compare view).
// I2 population 2024; I4 GDP; I5 GDP per capita; I6 GDP per capita PPP;
// I10 unemployment modeled ILO 3.30% 2024; I11 life expectancy 71.29;
// I12 urban 58.75%; I13 age structure 24.60 / 68.11 / 7.29.
// I8 poverty 8.57% (BPS national line, Sep 2024) is a FOOTNOTE ONLY — never a
// comparable column beside the US rate, because the lines differ.
// I9 (BPS TPT 4.91%) is NEVER shown beside the US ILO figure.
export const INDONESIA = {
  name: 'Indonesia',
  population: { value: 283487931, display: '283,487,931', year: '2024', source: 'World Bank WDI' },
  gdp: { value: 1.396, display: '$1.396 trillion', year: '2024', source: 'World Bank WDI' },
  gdpPerCapita: { value: 4925.44, display: '$4,925.44', year: '2024', source: 'World Bank WDI' },
  gdpPerCapitaPpp: { value: 16472.48, display: '$16,472.48', year: '2024', source: 'World Bank WDI' },
  lifeExpectancy: { value: 71.29, display: '71.29 years', year: '2024', source: 'World Bank WDI' },
  urban: { value: 58.75, display: '58.75%', year: '2024', source: 'World Bank WDI' },
  unemployment: { value: 3.30, display: '3.30%', year: '2024', source: 'World Bank WDI, modeled ILO est.' },
  ageStructure: [
    { label: 'Age 0–14', value: 24.60 },
    { label: 'Age 15–64', value: 68.11 },
    { label: 'Age 65+', value: 7.29 },
  ],
  povertyFootnote: 'Indonesia poverty on its national line (BPS): 8.57% — 24.06 million people, Sep 2024. Not comparable with the US rate: different poverty lines.',
};

// Latest releases strip (home). Dates are release dates of the sources above.
export const RELEASES = [
  { date: '27 Jan 2026', text: 'Vintage 2025 population estimates: growth slows to +0.5%' },
  { date: '11 Nov 2026', text: 'World Bank WDI update: 2024 GDP, life expectancy and urban shares' },
  { date: '15 Jan 2025', text: 'BPS: Indonesia poverty falls to 8.57% (Sep 2024)' },
];
