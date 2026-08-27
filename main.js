/* ============================================================
   MAIN.JS — rendering + interactivity. Reads from PORTFOLIO_CONFIG.
   You shouldn't need to edit this file — edit config.js instead.
   ============================================================ */

(function () {
  "use strict";
  const CFG = PORTFOLIO_CONFIG;

  /* Chart color palette (kept in sync with CSS accents) */
  const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
  const palette = () => ({
    cyan: "#4FD1E5",
    violet: "#9B8CFF",
    green: "#3ECF8E",
    amber: "#F0B429",
    grid: isLight() ? "rgba(10,13,18,0.08)" : "rgba(255,255,255,0.06)",
    text: isLight() ? "#6b7686" : "#7C8798"
  });

  /* ---------------------------------------------------------
     THEME TOGGLE
  --------------------------------------------------------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  const MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeIcon.innerHTML = theme === "light" ? SUN : MOON;
    localStorage.setItem("portfolio-theme", theme);
    refreshAllCharts();
  }
  const savedTheme = localStorage.getItem("portfolio-theme") ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  applyTheme(savedTheme);
  themeToggle.addEventListener("click", () => applyTheme(isLight() ? "dark" : "light"));

  /* ---------------------------------------------------------
     MOBILE NAV
  --------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

  /* Active-section highlighting */
  const sections = [...document.querySelectorAll("section[id]")];
  const navA = [...navLinks.querySelectorAll("a")];
  function onScrollNav() {
    let current = sections[0]?.id;
    const y = window.scrollY + 140;
    for (const s of sections) if (s.offsetTop <= y) current = s.id;
    navA.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));

    const toTop = document.getElementById("toTop");
    toTop.classList.toggle("visible", window.scrollY > 600);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  document.getElementById("toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------------------------------------------------
     TOP TICKER
  --------------------------------------------------------- */
  (function buildTicker() {
    const items = [
      { t: `${CFG.kpis.find(k=>k.label==="Projects Completed")?.value ?? "42"} PROJECTS`, dir: "up" },
      { t: "MODEL_ACC 91.2%", dir: "up" },
      { t: "CHURN -23%", dir: "down" },
      { t: `${CFG.kpis.find(k=>k.label==="GitHub Contributions")?.value ?? "1.8k"} COMMITS YTD`, dir: "up" },
      { t: "REVENUE_LIFT +19%", dir: "up" },
      { t: "STATUS: " + CFG.status.toUpperCase(), dir: "" },
      { t: "R2 0.91 · RMSE $18.2K", dir: "" },
      { t: "SEGMENTS 5 · SILHOUETTE 0.61", dir: "" }
    ];
    const track = document.getElementById("tickerTrack");
    const html = items.map(i => `<span class="${i.dir}">${i.dir === "up" ? "▲" : i.dir === "down" ? "▼" : "●"} ${i.t}</span>`).join("");
    track.innerHTML = html + html; // duplicate for seamless loop
  })();

  /* ---------------------------------------------------------
     IDENTITY / HERO / FOOTER
  --------------------------------------------------------- */
  document.title = `${CFG.name} — Data Scientist & Analyst`;
  document.getElementById("brandName").textContent = CFG.name.split(" ")[0].toLowerCase();
  document.getElementById("heroName").innerHTML = `${CFG.name}<span class="accent">.</span>`;
  document.getElementById("heroTagline").textContent = CFG.tagline;
  document.getElementById("statusText").textContent = CFG.status;
  document.getElementById("termRole").textContent = `"${CFG.role.split("·")[0].trim()}"`;
  document.getElementById("termLocation").textContent = `"${CFG.location}"`;
  document.getElementById("footerText").textContent = `© ${new Date().getFullYear()} ${CFG.name}. Built with HTML, CSS & JavaScript.`;

  document.getElementById("btnGithub").href = CFG.links.github;
  document.getElementById("btnLinkedin").href = CFG.links.linkedin;
  document.getElementById("btnEmail").href = CFG.links.email;
  document.getElementById("btnResume").href = CFG.links.resume;
  document.getElementById("btnResume2").href = CFG.links.resume;
  [...document.querySelectorAll("#btnGithub,#btnLinkedin,#btnEmail")].forEach(a => a.target = "_blank");

  document.getElementById("footerLinks").innerHTML = `
    <a href="${CFG.links.github}" target="_blank" aria-label="GitHub">GitHub</a>
    <a href="${CFG.links.linkedin}" target="_blank" aria-label="LinkedIn">LinkedIn</a>
    <a href="${CFG.links.email}" aria-label="Email">Email</a>`;

  /* Typewriter role line */
  (function typewriter() {
    const el = document.getElementById("heroRole");
    const full = CFG.role;
    let i = 0;
    function tick() {
      el.textContent = full.slice(0, i++);
      if (i <= full.length) setTimeout(tick, 28);
    }
    tick();
  })();

  /* ---------------------------------------------------------
     KPI CARDS + ANIMATED COUNTERS
  --------------------------------------------------------- */
  const kpiGrid = document.getElementById("kpiGrid");
  kpiGrid.innerHTML = CFG.kpis.map((k, idx) => `
    <div class="kpi-card reveal" style="transition-delay:${idx * 60}ms">
      <div class="kpi-value"><span data-count="${k.value}">0</span><span class="suf">${k.suffix}</span></div>
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-bar"><i data-fill="${Math.min(100, (k.value / Math.max(...CFG.kpis.map(x=>x.value))) * 100)}"></i></div>
    </div>`).join("");

  function animateCount(el, target, duration = 1400) {
    const start = performance.now();
    function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------------------------------------------------------
     ABOUT / ANALYTICS PROFILE
  --------------------------------------------------------- */
  document.getElementById("aboutCopy").innerHTML = `<p>${CFG.bio}</p>`;

  const ringColors = ["#4FD1E5", "#9B8CFF", "#3ECF8E", "#4FD1E5", "#9B8CFF", "#3ECF8E"];
  document.getElementById("profileRings").innerHTML = CFG.profile.map((p, i) => {
    const r = 32, c = 2 * Math.PI * r;
    return `
    <div class="ring-card reveal" style="transition-delay:${i*60}ms">
      <svg viewBox="0 0 78 78">
        <circle class="ring-bg" cx="39" cy="39" r="${r}" fill="none" stroke-width="6"></circle>
        <circle class="ring-fg" data-ring="${p.value}" cx="39" cy="39" r="${r}" fill="none" stroke-width="6"
          stroke="${ringColors[i % ringColors.length]}"
          stroke-dasharray="${c}" stroke-dashoffset="${c}" transform="rotate(-90 39 39)"></circle>
        <text x="39" y="43" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="15" fill="currentColor">${p.value}%</text>
      </svg>
      <div class="ring-label">${p.label}</div>
    </div>`;
  }).join("");

  /* ---------------------------------------------------------
     SKILLS (with filtering)
  --------------------------------------------------------- */
  const skillsGrid = document.getElementById("skillsGrid");
  const skillsFilter = document.getElementById("skillsFilter");
  const categories = Object.keys(CFG.skills);

  skillsFilter.innerHTML = ["All", ...categories].map((c, i) =>
    `<button class="filter-chip ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");

  function renderSkills(filter) {
    let html = "";
    categories.forEach(cat => {
      if (filter !== "All" && filter !== cat) return;
      CFG.skills[cat].forEach(s => {
        html += `
        <div class="skill-card reveal in">
          <div class="top">
            <div><div class="name">${s.name}</div><div class="cat">${cat.toUpperCase()}</div></div>
            <div class="pct">${s.level}%</div>
          </div>
          <div class="skill-track"><i data-fill="${s.level}"></i></div>
        </div>`;
      });
    });
    skillsGrid.innerHTML = html;
    requestAnimationFrame(() => {
      skillsGrid.querySelectorAll("[data-fill]").forEach(el => { el.style.width = el.dataset.fill + "%"; });
    });
  }
  renderSkills("All");
  skillsFilter.addEventListener("click", e => {
    const btn = e.target.closest(".filter-chip");
    if (!btn) return;
    skillsFilter.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderSkills(btn.dataset.cat);
  });

  /* ---------------------------------------------------------
     PROJECTS (with filtering + mini charts)
  --------------------------------------------------------- */
  const projectsGrid = document.getElementById("projectsGrid");
  const projectFilter = document.getElementById("projectFilter");
  const projectCats = ["All", ...new Set(CFG.projects.map(p => p.category))];
  projectFilter.innerHTML = projectCats.map((c, i) =>
    `<button class="filter-chip ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");

  let projectCharts = [];
  function renderProjects(filter) {
    projectCharts.forEach(c => c.destroy());
    projectCharts = [];
    const list = CFG.projects.filter(p => filter === "All" || p.category === filter);
    projectsGrid.innerHTML = list.map((p, i) => `
      <div class="project-card reveal in">
        <div class="project-chart"><canvas id="proj-chart-${i}"></canvas></div>
        <div class="project-body">
          <div class="project-top">
            <div class="project-title">${p.title}</div>
            <span class="tag">${p.category}</span>
          </div>
          <p class="project-problem">${p.problem}</p>
          <div class="project-meta"><b>Dataset:</b> ${p.dataset}</div>
          <div class="project-meta"><b>Method:</b> ${p.methodology}</div>
          <div class="tech-row">${p.tech.map(t => `<span class="tech-chip">${t}</span>`).join("")}</div>
          <div class="metric-row">
            ${p.metrics.map(m => `<div class="metric-box"><div class="mv">${m.value}</div><div class="ml">${m.label}</div></div>`).join("")}
          </div>
          <p class="project-findings">${p.findings}</p>
          <div class="project-links">
            <a class="btn btn-ghost btn-sm" href="${p.github}" target="_blank">Code ↗</a>
            <a class="btn btn-ghost btn-sm" href="${p.demo}" target="_blank">Live Demo ↗</a>
          </div>
        </div>
      </div>`).join("");

    list.forEach((p, i) => {
      const ctx = document.getElementById(`proj-chart-${i}`);
      if (!ctx) return;
      const pal = palette();
      let cfg;
      if (p.chart.type === "scatter") {
        cfg = {
          type: "scatter",
          data: { datasets: [{ data: p.chart.data.map(([x,y])=>({x,y})), backgroundColor: pal.violet, pointRadius: 5 }] },
          options: baseChartOpts(pal, true)
        };
      } else if (p.chart.type === "line") {
        cfg = {
          type: "line",
          data: { labels: p.chart.data.map((_,i)=>i+1), datasets: [{ data: p.chart.data, borderColor: pal.cyan, backgroundColor: hexA(pal.cyan,0.12), fill:true, tension:.4, pointRadius:0, borderWidth:2 }] },
          options: baseChartOpts(pal, true)
        };
      } else {
        cfg = {
          type: "bar",
          data: { labels: p.chart.data.map((_,i)=>i+1), datasets: [{ data: p.chart.data, backgroundColor: pal.cyan, borderRadius: 4 }] },
          options: baseChartOpts(pal, true)
        };
      }
      projectCharts.push(new Chart(ctx, cfg));
    });
  }
  renderProjects("All");
  projectFilter.addEventListener("click", e => {
    const btn = e.target.closest(".filter-chip");
    if (!btn) return;
    projectFilter.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.cat);
  });

  function baseChartOpts(pal, minimal) {
    return {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display:false }, tooltip: { enabled: !minimal || true, backgroundColor:"#161C26", borderColor:pal.grid, borderWidth:1, titleColor:"#E6E9EF", bodyColor:"#A7B0C0" } },
      scales: minimal ? { x:{display:false}, y:{display:false} } : {
        x: { grid: { color: pal.grid }, ticks: { color: pal.text, font:{family:"JetBrains Mono", size:10} } },
        y: { grid: { color: pal.grid }, ticks: { color: pal.text, font:{family:"JetBrains Mono", size:10} } }
      }
    };
  }
  function hexA(hex, a) {
    const v = hex.replace("#","");
    const r = parseInt(v.substr(0,2),16), g = parseInt(v.substr(2,2),16), b = parseInt(v.substr(4,2),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  /* ---------------------------------------------------------
     HERO MINI CHART
  --------------------------------------------------------- */
  let heroChart;
  function drawHeroChart() {
    const pal = palette();
    const ctx = document.getElementById("heroChart");
    if (heroChart) heroChart.destroy();
    heroChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({length:12}, (_,i)=>i+1),
        datasets: [{ data: [71,74,78,76,82,85,83,87,89,88,91,93], borderColor: pal.cyan, backgroundColor: hexA(pal.cyan,0.15), fill:true, tension:.4, pointRadius:0, borderWidth:2 }]
      },
      options: baseChartOpts(pal, true)
    });
  }

  /* ---------------------------------------------------------
     DATA LAB CHARTS
  --------------------------------------------------------- */
  const labConfig = [
    { id:"revenueTrend", title:"Revenue Trend", type:"line" },
    { id:"customerGrowth", title:"Customer Growth", type:"bar" },
    { id:"churnRate", title:"Churn Rate (%)", type:"line" },
    { id:"modelAccuracy", title:"Model Accuracy Comparison", type:"bar" },
    { id:"featureImportance", title:"Feature Importance", type:"hbar" },
    { id:"correlation", title:"Correlation Heatmap", type:"heat" },
    { id:"segmentation", title:"Customer Segmentation", type:"doughnut" },
    { id:"geographic", title:"Geographic Analysis", type:"doughnut" }
  ];
  const labGrid = document.getElementById("labGrid");
  labGrid.innerHTML = labConfig.map(l => `
    <div class="lab-card reveal">
      <div class="lab-head"><h3>${l.title}</h3></div>
      <div class="lab-chart"><canvas id="lab-${l.id}"></canvas></div>
    </div>`).join("");

  let labCharts = [];
  function drawLabCharts() {
    labCharts.forEach(c => c.destroy && c.destroy());
    labCharts = [];
    const pal = palette();
    labConfig.forEach(l => {
      const d = CFG.dataLab[l.id];
      const ctx = document.getElementById(`lab-${l.id}`);
      if (!ctx) return;

      if (l.type === "heat") {
        drawHeatmap(ctx, d, pal);
        return;
      }
      let cfg;
      if (l.type === "line") {
        cfg = { type:"line", data:{ labels:d.labels, datasets:[{ data:d.values, borderColor:pal.cyan, backgroundColor:hexA(pal.cyan,0.14), fill:true, tension:.4, pointRadius:2, borderWidth:2 }]}, options: baseChartOpts(pal,false) };
      } else if (l.type === "bar") {
        cfg = { type:"bar", data:{ labels:d.labels, datasets:[{ data:d.values, backgroundColor: pal.violet, borderRadius:4 }]}, options: baseChartOpts(pal,false) };
      } else if (l.type === "hbar") {
        cfg = { type:"bar", data:{ labels:d.labels, datasets:[{ data:d.values, backgroundColor: pal.green, borderRadius:4 }]}, options: { ...baseChartOpts(pal,false), indexAxis:"y" } };
      } else if (l.type === "doughnut") {
        cfg = { type:"doughnut", data:{ labels:d.labels, datasets:[{ data:d.values, backgroundColor:[pal.cyan,pal.violet,pal.green,pal.amber,"#F16A6A"], borderWidth:0 }]},
          options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:"bottom", labels:{ color: pal.text, font:{family:"JetBrains Mono", size:10}, boxWidth:10, padding:12 } } } } };
      }
      labCharts.push(new Chart(ctx, cfg));
    });
  }
  function drawHeatmap(canvas, d, pal) {
    const parent = canvas.parentElement;
    parent.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.style.display = "grid";
    wrap.style.gridTemplateColumns = `70px repeat(${d.labels.length}, 1fr)`;
    wrap.style.gap = "3px";
    wrap.style.height = "100%";
    wrap.style.alignContent = "center";

    wrap.appendChild(document.createElement("div"));
    d.labels.forEach(l => {
      const h = document.createElement("div");
      h.className = "heat-cell"; h.style.color = pal.text; h.style.textAlign="center";
      h.textContent = l.slice(0,4);
      wrap.appendChild(h);
    });
    d.matrix.forEach((row, ri) => {
      const rl = document.createElement("div");
      rl.className = "heat-cell"; rl.style.color = pal.text;
      rl.textContent = d.labels[ri].slice(0,8);
      wrap.appendChild(rl);
      row.forEach(v => {
        const cell = document.createElement("div");
        const mag = Math.abs(v);
        const c = v >= 0 ? "79,209,229" : "241,106,106";
        cell.style.background = `rgba(${c},${0.12 + mag*0.7})`;
        cell.style.borderRadius = "3px";
        cell.style.display = "flex"; cell.style.alignItems="center"; cell.style.justifyContent="center";
        cell.style.fontFamily = "JetBrains Mono"; cell.style.fontSize = "9px"; cell.style.color = "#E6E9EF";
        cell.textContent = v.toFixed(2);
        wrap.appendChild(cell);
      });
    });
    parent.appendChild(wrap);
  }

  function refreshAllCharts() {
    drawHeroChart();
    drawLabCharts();
    renderProjects(document.querySelector("#projectFilter .active")?.dataset.cat || "All");
  }

  /* ---------------------------------------------------------
     TIMELINE
  --------------------------------------------------------- */
  document.getElementById("timeline").innerHTML = CFG.timeline.map(t => `
    <div class="timeline-item reveal" data-type="${t.type}">
      <div class="timeline-dot"><i></i></div>
      <div class="timeline-card">
        <div class="timeline-date">${t.date}</div>
        <div class="timeline-role">${t.role}</div>
        <div class="timeline-org">${t.org}</div>
        <ul class="timeline-points">${t.points.map(p => `<li>${p}</li>`).join("")}</ul>
      </div>
    </div>`).join("");

  /* ---------------------------------------------------------
     CERTIFICATIONS
  --------------------------------------------------------- */
  document.getElementById("certGrid").innerHTML = CFG.certifications.map(c => `
    <div class="cert-card reveal">
      <div class="cert-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/></svg>
      </div>
      <div>
        <div class="cert-name">${c.name}</div>
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-meta"><span>${c.date}</span><span>ID: ${c.id}</span></div>
        <a class="cert-verify" href="${c.url}" target="_blank">Verify credential ↗</a>
      </div>
    </div>`).join("");

  /* ---------------------------------------------------------
     GITHUB INTELLIGENCE (live API + graceful fallback)
  --------------------------------------------------------- */
  const ghStatsEl = document.getElementById("ghStats");
  const langBar = document.getElementById("langBar");
  const langLegend = document.getElementById("langLegend");
  const repoList = document.getElementById("repoList");
  const ghHeatmap = document.getElementById("ghHeatmap");
  document.getElementById("ghSubtext").textContent = `Live public statistics for @${CFG.githubUsername}`;

  // heatmap placeholder (random intensity, purely decorative)
  ghHeatmap.innerHTML = Array.from({ length: 26 * 7 }).map(() => {
    const lvl = Math.random();
    const c = lvl > .8 ? "rgba(62,207,142,0.9)" : lvl > .6 ? "rgba(62,207,142,0.6)" : lvl > .35 ? "rgba(62,207,142,0.3)" : "var(--line)";
    return `<i style="background:${c}"></i>`;
  }).join("");

  function renderGhFallback() {
    ghStatsEl.innerHTML = ghStatCards({ repos: "—", stars: "—", followers: "—", following: "—" });
    langBar.innerHTML = "";
    langLegend.innerHTML = `<span style="color:var(--text-muted)">GitHub API unavailable right now — showing static profile only.</span>`;
    repoList.innerHTML = `<a class="btn btn-ghost btn-sm" href="${CFG.links.github}" target="_blank">View GitHub Profile ↗</a>`;
  }
  function ghStatCards(s) {
    return `
      <div class="gh-stat"><div class="v">${s.repos}</div><div class="l">REPOSITORIES</div></div>
      <div class="gh-stat"><div class="v">${s.stars}</div><div class="l">TOTAL STARS</div></div>
      <div class="gh-stat"><div class="v">${s.followers}</div><div class="l">FOLLOWERS</div></div>
      <div class="gh-stat"><div class="v">${s.following}</div><div class="l">FOLLOWING</div></div>`;
  }

  async function loadGithub() {
    try {
      const uRes = await fetch(`https://api.github.com/users/${CFG.githubUsername}`);
      if (!uRes.ok) throw new Error("user fetch failed");
      const user = await uRes.json();

      const rRes = await fetch(`https://api.github.com/users/${CFG.githubUsername}/repos?per_page=100&sort=updated`);
      const repos = rRes.ok ? await rRes.json() : [];

      const totalStars = Array.isArray(repos) ? repos.reduce((s, r) => s + (r.stargazers_count || 0), 0) : 0;
      ghStatsEl.innerHTML = ghStatCards({
        repos: user.public_repos ?? "—",
        stars: totalStars,
        followers: user.followers ?? "—",
        following: user.following ?? "—"
      });

      if (Array.isArray(repos) && repos.length) {
        const langCount = {};
        repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
        const total = Object.values(langCount).reduce((a, b) => a + b, 0) || 1;
        const colors = ["#4FD1E5", "#9B8CFF", "#3ECF8E", "#F0B429", "#F16A6A", "#6B7686"];
        const sorted = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 6);
        langBar.innerHTML = sorted.map(([name, count], i) =>
          `<div style="width:${(count/total*100).toFixed(1)}%; background:${colors[i%colors.length]}"></div>`).join("");
        langLegend.innerHTML = sorted.map(([name], i) =>
          `<span><i style="background:${colors[i%colors.length]}"></i>${name}</span>`).join("");

        const recent = repos.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 4);
        repoList.innerHTML = recent.map(r => `
          <div class="repo-item">
            <a class="repo-name" href="${r.html_url}" target="_blank">${r.name}</a>
            <div class="repo-desc">${r.description ? r.description.slice(0,90) : "No description provided."}</div>
            <div class="repo-meta"><span>★ ${r.stargazers_count}</span><span>${r.language || "—"}</span></div>
          </div>`).join("");
      } else {
        langLegend.innerHTML = `<span style="color:var(--text-muted)">No public repositories found.</span>`;
        repoList.innerHTML = "";
      }
    } catch (err) {
      renderGhFallback();
    }
  }
  loadGithub();

  /* ---------------------------------------------------------
     RESUME SUMMARY
  --------------------------------------------------------- */
  const latestWork = CFG.timeline.find(t => t.type === "work");
  const education = CFG.timeline.find(t => t.type === "education");
  document.getElementById("resumePanel").innerHTML = `
    <div class="resume-col">
      <h4>PROFILE</h4>
      <p>${CFG.role}</p>
      <p>${CFG.location}</p>
    </div>
    <div class="resume-col">
      <h4>EXPERIENCE</h4>
      ${CFG.timeline.filter(t=>t.type==="work").map(t=>`<p><b>${t.role}</b><br>${t.org}<br>${t.date}</p>`).join("")}
    </div>
    <div class="resume-col">
      <h4>EDUCATION</h4>
      <p>${education ? `${education.role}<br>${education.org}<br>${education.date}` : "—"}</p>
    </div>
    <div class="resume-col">
      <h4>SKILLS</h4>
      <p>${Object.values(CFG.skills).flat().slice(0,8).map(s=>s.name).join(", ")}</p>
    </div>
    <div class="resume-col">
      <h4>CERTIFICATIONS</h4>
      ${CFG.certifications.slice(0,3).map(c=>`<p>${c.name}</p>`).join("")}
    </div>
    <div class="resume-col">
      <h4>PROJECTS</h4>
      ${CFG.projects.slice(0,3).map(p=>`<p>${p.title}</p>`).join("")}
    </div>`;

  /* ---------------------------------------------------------
     CONTACT
  --------------------------------------------------------- */
  document.getElementById("contactList").innerHTML = `
    <li><div class="contact-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg></div><div><div class="cl">EMAIL</div><div class="cv"><a href="${CFG.links.email}">${CFG.links.email.replace('mailto:','')}</a></div></div></li>
    <li><div class="contact-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></div><div><div class="cl">LINKEDIN</div><div class="cv"><a href="${CFG.links.linkedin}" target="_blank">${CFG.links.linkedin.replace('https://','')}</a></div></div></li>
    <li><div class="contact-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></div><div><div class="cl">GITHUB</div><div class="cv"><a href="${CFG.links.github}" target="_blank">${CFG.links.github.replace('https://','')}</a></div></div></li>
    <li><div class="contact-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div><div class="cl">LOCATION</div><div class="cv">${CFG.location}</div></div></li>`;

  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("formNote").textContent =
      "This is a static site — connect a form service (Formspree, Getform, etc.) to receive messages here.";
  });

  /* ---------------------------------------------------------
     SCROLL REVEAL + COUNTER/RING/BAR TRIGGERS
  --------------------------------------------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");

      entry.target.querySelectorAll("[data-count]").forEach(el => {
        if (el.dataset.done) return;
        el.dataset.done = "1";
        animateCount(el, parseInt(el.dataset.count, 10));
      });
      entry.target.querySelectorAll("[data-fill]").forEach(el => {
        el.style.width = el.dataset.fill + "%";
      });
      entry.target.querySelectorAll("[data-ring]").forEach(el => {
        const r = 32, c = 2 * Math.PI * r;
        const val = parseFloat(el.dataset.ring);
        el.style.strokeDashoffset = c - (val / 100) * c;
      });
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal, .kpi-card, .ring-card").forEach(el => io.observe(el));

  /* ---------------------------------------------------------
     INITIAL CHART DRAW
  --------------------------------------------------------- */
  drawHeroChart();
  drawLabCharts();

})();
