(function () {
  const DATA = window.VC_DATA;
  const eras = DATA.eras;
  const categories = DATA.categories;
  const sectors = DATA.startupSectors;

  // State
  let currentEraIndex = eras.length - 1; // Default to 2026 ("all" mode is -1)
  let currentStageMode = "all"; // all | seed | seriesA | seriesB
  let currentMetricMode = "funding"; // funding | companies
  let selectedStarId = null;
  let playInterval = null;

  // Hub filters
  let activeSectorFilter = "all";
  let activeHubStage = "all";
  let searchQuery = "";

  // DOM Elements
  const yearBarsChartEl = document.getElementById("year-bars-chart");
  const yearSliderEl = document.getElementById("year-slider");
  const sliderTicksEl = document.getElementById("slider-ticks");
  const galaxyModeBtn = document.getElementById("galaxy-mode-btn");
  const eraTitleEl = document.getElementById("era-title");
  const eraMacroEl = document.getElementById("era-macro-text");
  const eraStageEl = document.getElementById("era-stage-text");
  const eraGlobalVcEl = document.getElementById("era-global-vc");
  const eraTotalCompaniesEl = document.getElementById("era-total-companies");
  const hudMetricLabelEl = document.getElementById("hud-metric-label");
  const hudStageLabelEl = document.getElementById("hud-stage-label");
  const legendEl = document.getElementById("category-legend");
  const svgEl = document.getElementById("constellation-svg");
  const inspectorEl = document.getElementById("star-inspector");
  const playBtn = document.getElementById("play-timeline-btn");
  const playIcon = document.getElementById("play-icon");
  const timelineGridEl = document.getElementById("timeline-grid");
  const sectorPillsEl = document.getElementById("sector-pills");
  const sectorsContainerEl = document.getElementById("sectors-container");
  const searchInputEl = document.getElementById("startup-search");
  const shareBtn = document.getElementById("share-btn");
  const toastEl = document.getElementById("toast");

  // 1. Ambient Starfield Canvas
  function initBackgroundStars() {
    const canvas = document.getElementById("bg-stars");
    const ctx = canvas.getContext("2d");
    let width, height, particles;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.min(160, Math.floor((width * height) / 11000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.65 + 0.15,
        speed: Math.random() * 0.012 + 0.004,
        phase: Math.random() * Math.PI * 2
      }));
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const twinkle = 0.55 + 0.45 * Math.sin(t * p.speed + p.phase);
        ctx.fillStyle = `rgba(226, 232, 240, ${p.alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(draw);
  }

  // Helpers for funding AND company count per stage
  // Note: Seed has smaller check sizes and higher deal share than dollar share; Series B+ has larger checks and fewer companies.
  function getTagStageCompanies(tag, stageMode) {
    const total = tag.dealsEst || 500;
    // Weight deal counts realistically (Seed ~52% of deals, Series A ~31% of deals, Series B+ ~17% of deals, modulated by tag's stage tilt)
    const wSeed = tag.seedShare * 2.4;
    const wA = tag.seriesAShare * 1.1;
    const wB = tag.seriesBPlusShare * 0.42;
    const wSum = wSeed + wA + wB || 1;
    if (stageMode === "seed") return Math.max(8, Math.round(total * (wSeed / wSum)));
    if (stageMode === "seriesA") return Math.max(6, Math.round(total * (wA / wSum)));
    if (stageMode === "seriesB") return Math.max(4, Math.round(total * (wB / wSum)));
    return total;
  }

  function getTagStageValue(tag, stageMode) {
    if (stageMode === "seed") return +(tag.totalFundingB * (tag.seedShare / 100)).toFixed(2);
    if (stageMode === "seriesA") return +(tag.totalFundingB * (tag.seriesAShare / 100)).toFixed(2);
    if (stageMode === "seriesB") return +(tag.totalFundingB * (tag.seriesBPlusShare / 100)).toFixed(2);
    return tag.totalFundingB;
  }

  function getTagSizingMetric(tag, stageMode, metricMode) {
    if (metricMode === "companies") {
      return getTagStageCompanies(tag, stageMode);
    }
    return getTagStageValue(tag, stageMode);
  }

  function getStageLabel(stageMode) {
    if (stageMode === "seed") return "Rodadas Seed";
    if (stageMode === "seriesA") return "Rodadas Series A";
    if (stageMode === "seriesB") return "Rodadas Series B+ & Growth";
    return "Total VC (Seed → Growth)";
  }

  // Build Legend
  function renderLegend() {
    legendEl.innerHTML = Object.entries(categories)
      .map(
        ([, cfg]) => `
        <span class="legend-item">
          <span class="legend-dot" style="background:${cfg.color}; box-shadow: 0 0 8px ${cfg.color}"></span>
          ${cfg.label}
        </span>`
      )
      .join("");
  }

  // Build Per-Year Bar Chart + Time Slider (2006..2026)
  function renderYearTrack() {
    const eraStats = eras.map((era) => {
      const moneySum = +era.tags.reduce((acc, t) => acc + getTagStageValue(t, currentStageMode), 0).toFixed(1);
      const compSum = era.tags.reduce((acc, t) => acc + getTagStageCompanies(t, currentStageMode), 0);
      return {
        year: era.year,
        globalVC: era.totalGlobalVC,
        moneySum: currentStageMode === "all" ? era.totalGlobalVC : moneySum,
        compSum
      };
    });

    const maxMoney = Math.max(...eraStats.map((s) => s.moneySum), 1);
    const maxComps = Math.max(...eraStats.map((s) => s.compSum), 1);

    yearBarsChartEl.innerHTML = eraStats
      .map((st, idx) => {
        const hMoney = Math.max(10, Math.round((st.moneySum / maxMoney) * 68));
        const hComps = Math.max(10, Math.round((st.compSum / maxComps) * 68));
        const compFormatted = st.compSum >= 1000 ? `${(st.compSum / 1000).toFixed(1)}k` : st.compSum;
        return `
          <button type="button" class="year-bar-col ${idx === currentEraIndex ? "active" : ""}" data-idx="${idx}" role="tab" title="${st.year}: $${st.moneySum}B levantados • ~${st.compSum.toLocaleString("pt-BR")} empresas">
            <div class="yb-stats">
              <span class="yb-money">$${st.moneySum}B</span>
              <span class="yb-comps">${compFormatted} emp.</span>
            </div>
            <div class="yb-track">
              <div class="yb-fill-money" style="height:${hMoney}px" title="Volume ($B)"></div>
              <div class="yb-fill-comps" style="height:${hComps}px" title="Nº de Empresas"></div>
            </div>
            <span class="yb-year">${st.year}</span>
          </button>
        `;
      })
      .join("");

    sliderTicksEl.innerHTML = eras.map((e) => `<span>${e.year}</span>`).join("");

    yearBarsChartEl.querySelectorAll(".year-bar-col").forEach((btn) => {
      btn.addEventListener("click", () => {
        stopTimelinePlay();
        currentEraIndex = parseInt(btn.dataset.idx, 10);
        yearSliderEl.value = String(currentEraIndex);
        selectedStarId = null;
        updateConstellationView();
      });
    });
  }

  // Build Super-Galaxy (All-time 2006-2026 aggregated top stars) when currentEraIndex === -1
  function buildAllTimeGalaxy() {
    const allStars = [];
    eras.forEach((era) => {
      const sorted = [...era.tags].sort(
        (a, b) =>
          getTagSizingMetric(b, currentStageMode, currentMetricMode) -
          getTagSizingMetric(a, currentStageMode, currentMetricMode)
      );
      sorted.slice(0, 2).forEach((t) => {
        allStars.push({
          ...t,
          yearLabel: era.year,
          displayName: `${t.name} (${era.year})`
        });
      });
    });

    const links = [];
    for (let i = 0; i < allStars.length - 2; i += 2) {
      links.push([allStars[i].id, allStars[i + 2].id]);
      links.push([allStars[i].id, allStars[i + 1].id]);
    }

    return {
      year: "2006–2026",
      title: "Galáxia Histórica Completa — Os Maiores Ímãs de Capital e Startups de Cada Biênio",
      totalGlobalVC: eras.reduce((acc, e) => acc + e.totalGlobalVC, 0),
      macroContext:
        "Visão panorâmica comparando lado a lado a evolução de 2006 a 2026 tanto em bilhões captados quanto em quantidade de empresas criadas.",
      stageHighlight:
        "Alterne entre '💰 Valor Levantado' e '🏢 Nº de Empresas' no topo: veja como 2020–2022 teve recorde pulverizado de empresas (Web3/SaaS), enquanto 2026 concentra somas gigantescas em menos super-startups de IA.",
      tags: allStars,
      links
    };
  }

  // Deterministic celestial layout for stars on 1000x620 SVG
  function computeStarPositions(tags, isGalaxy) {
    const W = 1000;
    const sorted = [...tags].sort(
      (a, b) =>
        getTagSizingMetric(b, currentStageMode, currentMetricMode) -
        getTagSizingMetric(a, currentStageMode, currentMetricMode)
    );

    const metrics = sorted.map((t) => getTagSizingMetric(t, currentStageMode, currentMetricMode));
    const maxMetric = Math.max(...metrics, 1);
    const minMetric = Math.min(...metrics, 0.2);

    const eraSlots = [
      { x: 490, y: 280 }, // Brightest Alpha Star near center
      { x: 250, y: 195 },
      { x: 750, y: 195 },
      { x: 295, y: 440 },
      { x: 715, y: 435 },
      { x: 505, y: 112 },
      { x: 155, y: 340 },
      { x: 845, y: 330 }
    ];

    return sorted.map((tag, idx) => {
      const val = getTagStageValue(tag, currentStageMode);
      const companiesCount = getTagStageCompanies(tag, currentStageMode);
      const metricVal = currentMetricMode === "companies" ? companiesCount : val;

      const norm = maxMetric === minMetric ? 0.6 : (metricVal - minMetric) / (maxMetric - minMetric);
      const minR = isGalaxy ? 7 : 12;
      const maxR = isGalaxy ? 36 : 46;
      const r = minR + Math.sqrt(Math.max(0.04, norm)) * (maxR - minR);

      let x, y;
      if (!isGalaxy && idx < eraSlots.length) {
        const hash = tag.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
        const dx = ((hash % 36) - 18) * 1.25;
        const dy = (((hash >> 2) % 32) - 16) * 1.15;
        x = eraSlots[idx].x + dx;
        y = eraSlots[idx].y + dy;
      } else {
        const chronologicalIdx = tags.findIndex((t) => t.id === tag.id);
        const total = tags.length;
        const col = Math.floor(chronologicalIdx / 2);
        const row = chronologicalIdx % 2;
        x = 85 + (col / Math.max(1, total / 2 - 1)) * (W - 170);
        y = row === 0 ? 180 + (col % 3) * 58 : 420 - (col % 3) * 55;
      }

      return {
        ...tag,
        val,
        companiesCount,
        r,
        x,
        y
      };
    });
  }

  // Render SVG Constellation
  function updateConstellationView() {
    renderYearTrack();

    const isGalaxy = currentEraIndex === -1;
    galaxyModeBtn.classList.toggle("active", isGalaxy);
    if (!isGalaxy) {
      yearSliderEl.value = String(currentEraIndex);
    }

    const eraData = isGalaxy ? buildAllTimeGalaxy() : eras[currentEraIndex];
    const totalCompaniesInView = eraData.tags.reduce(
      (acc, t) => acc + getTagStageCompanies(t, currentStageMode),
      0
    );
    const stageFundingSum = +eraData.tags
      .reduce((acc, t) => acc + getTagStageValue(t, currentStageMode), 0)
      .toFixed(1);

    eraTitleEl.textContent = `${eraData.year} — ${eraData.title}`;
    eraMacroEl.textContent = eraData.macroContext;
    eraStageEl.textContent = eraData.stageHighlight;
    eraGlobalVcEl.textContent =
      currentStageMode === "all" ? `$${eraData.totalGlobalVC}B` : `$${stageFundingSum}B`;
    eraTotalCompaniesEl.textContent = totalCompaniesInView.toLocaleString("pt-BR");

    hudMetricLabelEl.textContent =
      currentMetricMode === "companies" ? "Nº de Empresas Financiadas" : "Valor Levantado ($B)";
    hudMetricLabelEl.style.color = currentMetricMode === "companies" ? "var(--emerald)" : "var(--cyan)";
    hudStageLabelEl.textContent = getStageLabel(currentStageMode);

    const positioned = computeStarPositions(eraData.tags, isGalaxy);
    const posMap = new Map(positioned.map((s) => [s.id, s]));

    if (!selectedStarId || !posMap.has(selectedStarId)) {
      selectedStarId = positioned[0]?.id || null;
    }

    let svgHtml = `
      <defs>
        <filter id="star-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="nebula-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(56,189,248,0.10)" />
          <stop offset="100%" stop-color="rgba(56,189,248,0)" />
        </radialGradient>
      </defs>

      <!-- Celestial Orbit Rings -->
      <circle cx="500" cy="310" r="145" fill="none" stroke="rgba(148,163,184,0.06)" stroke-dasharray="3 6" />
      <circle cx="500" cy="310" r="265" fill="none" stroke="rgba(148,163,184,0.05)" stroke-dasharray="3 8" />
      <ellipse cx="500" cy="310" rx="430" ry="250" fill="url(#nebula-center)" />
    `;

    eraData.links.forEach(([aId, bId]) => {
      const a = posMap.get(aId);
      const b = posMap.get(bId);
      if (!a || !b) return;
      const isHighlighted = a.id === selectedStarId || b.id === selectedStarId;
      svgHtml += `<line class="constellation-line ${isHighlighted ? "highlighted" : ""}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" />`;
    });

    positioned.forEach((star) => {
      const catCfg = categories[star.category] || { color: "#38bdf8", glow: "rgba(56,189,248,0.5)" };
      const isSelected = star.id === selectedStarId;
      const label = star.displayName || star.name;
      const labelY = star.y + star.r + 17;
      const subY = labelY + 15;

      const subText = isGalaxy
        ? currentMetricMode === "companies"
          ? `${star.companiesCount.toLocaleString("pt-BR")} emp.`
          : `$${star.val}B`
        : `$${star.val}B • ${star.companiesCount.toLocaleString("pt-BR")} emp.`;

      const flare = star.r * 1.55;

      svgHtml += `
        <g class="star-group ${isSelected ? "selected" : ""}" data-star-id="${star.id}">
          <circle class="star-halo" cx="${star.x}" cy="${star.y}" r="${(star.r * 1.85).toFixed(1)}" fill="${catCfg.color}" opacity="${isSelected ? 0.36 : 0.17}" />
          <circle class="star-ring" cx="${star.x}" cy="${star.y}" r="${(star.r + 8).toFixed(1)}" />
          <line x1="${star.x - flare}" y1="${star.y}" x2="${star.x + flare}" y2="${star.y}" stroke="${catCfg.color}" stroke-width="1.2" opacity="0.55" />
          <line x1="${star.x}" y1="${star.y - flare}" x2="${star.x}" y2="${star.y + flare}" stroke="${catCfg.color}" stroke-width="1.2" opacity="0.55" />
          <circle class="star-core" cx="${star.x}" cy="${star.y}" r="${star.r.toFixed(1)}" fill="${catCfg.color}" stroke="#ffffff" stroke-width="${isSelected ? 2.6 : 1.2}" filter="url(#star-glow)" />
          <circle cx="${star.x - star.r * 0.28}" cy="${star.y - star.r * 0.28}" r="${Math.max(2, star.r * 0.24).toFixed(1)}" fill="#ffffff" opacity="0.85" />
          <text class="star-label" x="${star.x}" y="${labelY}" text-anchor="middle" style="font-size:${isGalaxy ? "11px" : "12.8px"}">${label}</text>
          <text class="star-sublabel" x="${star.x}" y="${subY}" text-anchor="middle">${subText}</text>
        </g>
      `;
    });

    svgEl.innerHTML = svgHtml;

    svgEl.querySelectorAll(".star-group").forEach((g) => {
      g.addEventListener("click", () => {
        selectedStarId = g.dataset.starId;
        updateConstellationView();
      });
    });

    const selectedObj = posMap.get(selectedStarId);
    if (selectedObj) {
      renderStarInspector(selectedObj, eraData.year);
    }
  }

  // Render Right-Side Star Inspector (shows BOTH $B raised AND Number of Companies + Avg Ticket)
  function renderStarInspector(star, eraYear) {
    const catCfg = categories[star.category] || { color: "#38bdf8", label: star.category };
    const seedB = +(star.totalFundingB * (star.seedShare / 100)).toFixed(2);
    const seriesAB = +(star.totalFundingB * (star.seriesAShare / 100)).toFixed(2);
    const seriesBB = +(star.totalFundingB * (star.seriesBPlusShare / 100)).toFixed(2);

    const seedComps = getTagStageCompanies(star, "seed");
    const seriesAComps = getTagStageCompanies(star, "seriesA");
    const seriesBComps = getTagStageCompanies(star, "seriesB");

    const avgDealM = +((star.val * 1000) / Math.max(1, star.companiesCount)).toFixed(1);

    inspectorEl.innerHTML = `
      <div class="inspector-badge-row">
        <span class="cat-pill" style="border: 1px solid ${catCfg.color}; color: ${catCfg.color}">
          ● ${catCfg.label}
        </span>
        <span class="inspector-year-tag">Janela ${star.yearLabel || eraYear}</span>
      </div>

      <div>
        <h3 class="inspector-title">${star.name}</h3>
        <p class="inspector-desc" style="margin-top:6px">${star.desc}</p>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px">
        <div class="inspector-big-box" style="flex-direction:column; align-items:flex-start; gap:3px; border-color:${currentMetricMode === "funding" ? "var(--cyan)" : "var(--border-subtle)"}">
          <span class="kpi-caption">💰 Valor Captado</span>
          <span class="val" style="font-size:1.5rem">$${star.val}B</span>
          <span style="font-size:0.71rem; color:#94a3b8">${getStageLabel(currentStageMode)}</span>
        </div>

        <div class="inspector-big-box" style="flex-direction:column; align-items:flex-start; gap:3px; border-color:${currentMetricMode === "companies" ? "var(--emerald)" : "var(--border-subtle)"}">
          <span class="kpi-caption">🏢 Nº de Empresas</span>
          <span class="val" style="font-size:1.5rem; color:var(--emerald)">${star.companiesCount.toLocaleString("pt-BR")}</span>
          <span style="font-size:0.71rem; color:#94a3b8">Cheque médio: ~$${avgDealM}M</span>
        </div>
      </div>

      <div>
        <span class="eyebrow" style="margin-bottom:10px">QUEBRA POR RODADA ($ LEVANTADO & EMPRESAS)</span>
        <div class="stage-bars">
          <div class="stage-bar-row">
            <div class="stage-bar-head">
              <span>Seed (${star.seedShare}%)</span>
              <strong>$${seedB}B • ~${seedComps.toLocaleString("pt-BR")} emp.</strong>
            </div>
            <div class="stage-bar-track">
              <div class="stage-bar-fill" style="width:${star.seedShare}%; background:#34d399"></div>
            </div>
          </div>

          <div class="stage-bar-row">
            <div class="stage-bar-head">
              <span>Series A (${star.seriesAShare}%)</span>
              <strong>$${seriesAB}B • ~${seriesAComps.toLocaleString("pt-BR")} emp.</strong>
            </div>
            <div class="stage-bar-track">
              <div class="stage-bar-fill" style="width:${star.seriesAShare}%; background:#38bdf8"></div>
            </div>
          </div>

          <div class="stage-bar-row">
            <div class="stage-bar-head">
              <span>Series B+ (${star.seriesBPlusShare}%)</span>
              <strong>$${seriesBB}B • ~${seriesBComps.toLocaleString("pt-BR")} emp.</strong>
            </div>
            <div class="stage-bar-track">
              <div class="stage-bar-fill" style="width:${star.seriesBPlusShare}%; background:#a78bfa"></div>
            </div>
          </div>
        </div>
      </div>

      <div style="font-size:0.81rem; color:#cbd5e1; background:rgba(255,255,255,0.03); padding:10px 12px; border-radius:10px; border:1px solid rgba(148,163,184,0.12)">
        <strong style="color:#f8fafc">Pico de Atração:</strong> ${star.peakRound}
      </div>

      <div>
        <span class="eyebrow">EXEMPLOS ICÔNICOS QUE USARAM A TAG</span>
        <div class="examples-list">
          ${star.examples.map((ex) => `<span class="example-chip">${ex}</span>`).join("")}
        </div>
      </div>
    `;
  }

  // Timeline Autoplay (2006 -> 2026)
  function toggleTimelinePlay() {
    if (playInterval) {
      stopTimelinePlay();
      return;
    }
    currentEraIndex = 0;
    selectedStarId = null;
    updateConstellationView();
    playBtn.classList.add("playing");
    playIcon.textContent = "⏸";

    playInterval = setInterval(() => {
      if (currentEraIndex < eras.length - 1) {
        currentEraIndex++;
        selectedStarId = null;
        updateConstellationView();
      } else {
        stopTimelinePlay();
      }
    }, 2200);
  }

  function stopTimelinePlay() {
    if (playInterval) {
      clearInterval(playInterval);
      playInterval = null;
    }
    playBtn.classList.remove("playing");
    playIcon.textContent = "▶";
  }

  // Section 2: Render 2-by-2 Historical Overview Cards
  function renderHistoricalMatrix() {
    timelineGridEl.innerHTML = eras
      .map((era, idx) => {
        const eraComps = era.tags.reduce((acc, t) => acc + (t.dealsEst || 0), 0);
        const sortedTags = [...era.tags].sort((a, b) => b.totalFundingB - a.totalFundingB);
        const rowsHtml = sortedTags
          .slice(0, 4)
          .map((t) => {
            const c = categories[t.category]?.color || "#38bdf8";
            return `
              <div class="mini-tag-row">
                <div class="mini-tag-bar-wrap">
                  <span class="mini-dot" style="background:${c}"></span>
                  <span>${t.name}</span>
                </div>
                <span class="mini-val">$${t.totalFundingB}B • ${(t.dealsEst || 0).toLocaleString("pt-BR")} emp.</span>
              </div>`;
          })
          .join("");

        return `
          <article class="era-card glass-panel" data-jump-era="${idx}" title="Clique para abrir a constelação de ${era.year}">
            <div class="era-card-top">
              <span class="era-card-year">${era.year}</span>
              <span class="era-card-total">~$${era.totalGlobalVC}B • ${eraComps.toLocaleString("pt-BR")} emp.</span>
            </div>
            <h3>${era.title}</h3>
            <div class="mini-tag-list">${rowsHtml}</div>
          </article>
        `;
      })
      .join("");

    timelineGridEl.querySelectorAll(".era-card").forEach((card) => {
      card.addEventListener("click", () => {
        stopTimelinePlay();
        currentEraIndex = parseInt(card.dataset.jumpEra, 10);
        selectedStarId = null;
        updateConstellationView();
        document.getElementById("constelacao").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  // Section 3: Render Hottest Startups Hub
  function renderSectorPills() {
    const allPill = `<button type="button" class="sector-pill ${activeSectorFilter === "all" ? "active" : ""}" data-sec="all">✦ Todas as Áreas (${sectors.reduce((a, s) => a + s.startups.length, 0)})</button>`;
    const pills = sectors
      .map(
        (s) => `
        <button type="button" class="sector-pill ${activeSectorFilter === s.id ? "active" : ""}" data-sec="${s.id}">
          <span style="color:${s.color}">${s.icon}</span> ${s.name}
        </button>`
      )
      .join("");

    sectorPillsEl.innerHTML = allPill + pills;

    sectorPillsEl.querySelectorAll(".sector-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeSectorFilter = btn.dataset.sec;
        renderSectorPills();
        renderStartupSectors();
      });
    });
  }

  function matchesStageFilter(stageStr, filter) {
    if (filter === "all") return true;
    const norm = stageStr.toLowerCase();
    if (filter === "Seed") return norm.includes("seed");
    if (filter === "Series A") return norm.includes("series a") || norm.includes("/ a");
    if (filter === "Series B") return norm.includes("series b") || norm.includes("growth") || norm.includes("late");
    return true;
  }

  function renderStartupSectors() {
    const q = searchQuery.trim().toLowerCase();

    const filteredBlocks = sectors
      .filter((sec) => activeSectorFilter === "all" || sec.id === activeSectorFilter)
      .map((sec) => {
        const matchedStartups = sec.startups.filter((st) => {
          if (!matchesStageFilter(st.stage, activeHubStage)) return false;
          if (!q) return true;
          const hay = `${st.name} ${st.stage} ${st.backers} ${st.oneLiner} ${st.tags.join(" ")} ${sec.name}`.toLowerCase();
          return hay.includes(q);
        });
        return { ...sec, matchedStartups };
      })
      .filter((sec) => sec.matchedStartups.length > 0);

    if (filteredBlocks.length === 0) {
      sectorsContainerEl.innerHTML = `
        <div class="glass-panel" style="padding:36px; text-align:center; color:#94a3b8">
          Nenhuma startup encontrada com os filtros atuais. Tente limpar a busca ou selecionar "Todos Estágios".
        </div>`;
      return;
    }

    sectorsContainerEl.innerHTML = filteredBlocks
      .map(
        (sec) => `
        <div class="sector-block glass-panel" style="border-top: 2px solid ${sec.color}">
          <div class="sector-block-header">
            <div class="sector-title-wrap">
              <h3><span style="color:${sec.color}">${sec.icon}</span> ${sec.name}</h3>
              <p class="sector-thesis">${sec.thesis}</p>
            </div>
            <span class="sector-hot-badge" style="color:${sec.color}">Tags: ${sec.hotTag}</span>
          </div>

          <div class="startup-cards-grid">
            ${sec.matchedStartups
              .map(
                (st) => `
                <article class="startup-card">
                  <div class="sc-top">
                    <div>
                      <div class="sc-name">${st.name}</div>
                      <div class="sc-hq">${st.hq}</div>
                    </div>
                    <span class="hot-meter" title="Índice de disputa entre fundos Tier-1">🔥 ${st.hotScore}/100</span>
                  </div>

                  <div class="sc-funding-row">
                    <span class="sc-stage">${st.stage}</span>
                    <span class="sc-raised">${st.raised} captados</span>
                  </div>

                  <p class="sc-desc">${st.oneLiner}</p>

                  <div class="sc-tags">
                    ${st.tags.map((tg) => `<span class="sc-tag">#${tg}</span>`).join("")}
                  </div>

                  <div class="sc-backers">
                    <strong>VCs / Investidores:</strong> ${st.backers}
                  </div>
                </article>`
              )
              .join("")}
          </div>
        </div>`
      )
      .join("");
  }

  // Event Listeners
  function bindControls() {
    document.querySelectorAll(".metric-mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".metric-mode-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentMetricMode = btn.dataset.metric;
        updateConstellationView();
      });
    });

    document.querySelectorAll(".stage-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".stage-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentStageMode = btn.dataset.stage;
        updateConstellationView();
      });
    });

    yearSliderEl.addEventListener("input", (e) => {
      stopTimelinePlay();
      currentEraIndex = parseInt(e.target.value, 10);
      selectedStarId = null;
      updateConstellationView();
    });

    galaxyModeBtn.addEventListener("click", () => {
      stopTimelinePlay();
      currentEraIndex = currentEraIndex === -1 ? eras.length - 1 : -1;
      selectedStarId = null;
      updateConstellationView();
    });

    playBtn.addEventListener("click", toggleTimelinePlay);

    document.querySelectorAll("#hub-stage-chips .chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("#hub-stage-chips .chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        activeHubStage = chip.dataset.hubstage;
        renderStartupSectors();
      });
    });

    searchInputEl.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderStartupSectors();
    });

    shareBtn.addEventListener("click", async () => {
      const shareData = {
        title: "Start-up World • Constelação de VC (2006–2026) & Startups Quentes",
        text: "Veja a constelação dos jargões que mais arrecadaram Venture Capital de 2 em 2 anos e o radar das startups mais quentes por área:",
        url: window.location.href
      };
      try {
        if (navigator.share && window.location.protocol.startsWith("http")) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          toastEl.classList.add("show");
          setTimeout(() => toastEl.classList.remove("show"), 2800);
        }
      } catch {
        // user cancelled share dialog
      }
    });
  }

  // Init
  function renderDailyFeed(verdictFilter = "all") {
    const feed = window.DAILY_TAAFT_UPDATES || { lastUpdated: "—", entries: [] };
    const updatedEl = document.getElementById("daily-last-updated");
    const gridEl = document.getElementById("daily-entries-grid");
    if (!updatedEl || !gridEl) return;

    updatedEl.textContent = `Última varredura: ${feed.lastUpdated}`;

    const items = (feed.entries || []).filter((item) => {
      if (verdictFilter === "all") return true;
      if (verdictFilter === "copiar" || verdictFilter === "adaptar") {
        return item.copyCode === verdictFilter;
      }
      return item.verdictCode === verdictFilter;
    });

    if (items.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 28px; text-align: center; color: #94a3b8;">
          Nenhum registro para este filtro ainda. Assim que o agente diário rodar (ou após o teste inicial), as novas startups do <strong>There's An AI For That</strong> aparecerão aqui com área e análise de viabilidade.
        </div>`;
      return;
    }

    gridEl.innerHTML = items
      .map((item) => {
        const vClass =
          item.verdictCode === "sim"
            ? "verdict-sim"
            : item.verdictCode === "nao"
            ? "verdict-nao"
            : "verdict-atencao";
        const cClass =
          item.copyCode === "copiar"
            ? "copy-yes"
            : item.copyCode === "adaptar"
            ? "copy-niche"
            : "copy-avoid";
        return `
          <article class="startup-card">
            <div class="sc-top">
              <div>
                <div class="sc-name">
                  ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener" style="color:inherit; text-decoration:none">${item.name} ↗</a>` : item.name}
                </div>
                <div class="sc-hq">${item.date} • Área: <strong>${item.area}</strong></div>
              </div>
              <span class="verdict-badge ${vClass}">${item.verdictLabel}</span>
            </div>

            <p class="sc-desc">${item.whatItDoes}</p>

            <div class="verdict-reason">
              <strong>Lente VC:</strong> ${item.analysis}
            </div>

            ${
              item.copyIdea
                ? `<div class="copy-idea-box ${cClass}">
                    <div class="copy-idea-head">
                      <strong>💡 Dá pra copiar?</strong>
                      ${item.copyLabel ? `<span class="copy-pill ${cClass}">${item.copyLabel}</span>` : ""}
                    </div>
                    <div>${item.copyIdea}</div>
                  </div>`
                : ""
            }

            <div class="sc-tags">
              ${(item.tags || []).map((tg) => `<span class="sc-tag">#${tg}</span>`).join("")}
            </div>
          </article>
        `;
      })
      .join("");
  }

  document.querySelectorAll("#daily-verdict-filters .chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#daily-verdict-filters .chip").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderDailyFeed(btn.dataset.verdict);
    });
  });

  initBackgroundStars();
  renderLegend();
  renderYearTrack();
  bindControls();
  updateConstellationView();
  renderHistoricalMatrix();
  renderSectorPills();
  renderStartupSectors();
  renderDailyFeed();
})();
