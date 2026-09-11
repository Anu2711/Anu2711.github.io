/* ============================================================
   RENDER — builds the DOM from the data/*.js globals.
   ============================================================ */
const el = (tag, cls, html) => { const n=document.createElement(tag); if(cls) n.className=cls; if(html!=null) n.innerHTML=html; return n; };

// Shared across render.js, reveal.js, rail.js, graph.js
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// About: photo slot.
const PHOTO = "assets/photo.jpg";
const ph = document.getElementById("photo");
if(PHOTO){ ph.innerHTML=`<img src="${PHOTO}" alt="Anusha Raisinghani">`; } else { ph.classList.add("empty"); ph.textContent="photo"; }

// About: stack with logos, downloaded from Simple Icons into assets/icons/
document.getElementById("stack").append(...STACK.map(g => {
  const d = el("div","stack-group");
  d.append(el("h3",null,g.name));
  const row = el("div","tiles");
  g.items.forEach(([name,slug],i)=>{
    const t = el("div","tile"); t.style.setProperty("--d",(i*40)+"ms"); t.title=name;
    const box = el("div","box");
    const monogram = () => { box.innerHTML=""; box.append(el("span","mg",name.replace(/[^A-Za-z0-9]/g,"").slice(0,3))); };
    if(slug){
      const ink=new Image(), brand=new Image();
      ink.className="ink"; brand.className="brand"; ink.alt=name; brand.alt=""; ink.loading=brand.loading="lazy";
      ink.src=`assets/icons/${slug}-ink.svg`;     // tinted to the palette at rest
      brand.src=`assets/icons/${slug}-brand.svg`; // the tool's own colour on hover
      ink.onerror=monogram; box.append(ink,brand);
    } else monogram();
    t.append(box, el("span","name",name)); row.append(t);
  });
  d.append(row); return d;
}));

// Hero callout cards
document.getElementById("hero-cards").append(...FACTS.map((f,i)=>{
  const c = el("div","card"); c.style.setProperty("--d",(600+i*70)+"ms");
  c.innerHTML = `<span class="k">${f.k}</span><span class="v${f.todo?" todo":""}">${f.v}</span>${f.s?`<span class="s">${f.s}</span>`:""}`;
  return c;
}));

// Work callout cards — years computed from role dates, so they stay right as roles are added
const months = (a,b) => { const [y1,m1]=a.split("-").map(Number); const [y2,m2]=(b||new Date().toISOString().slice(0,7)).split("-").map(Number); return (y2-y1)*12+(m2-m1); };
const yoe = t => Math.round(EXPERIENCE.filter(j=>j.type===t).reduce((n,j)=>n+months(j.start,j.end),0)/12*2)/2;
const companies = new Set(EXPERIENCE.filter(j=>j.type!=="other").map(j=>j.company)).size;
const WORK_CARDS = [
  { k:"full-time",  v:`${yoe("full")} yrs`, s:"data science and analytics engineering", big:true },
  { k:"co-op",      v:`${yoe("coop")} yrs`, s:"data engineering and modelling", big:true },
  { k:"companies",  v:`${companies}`,      s:"fintech, e-commerce, transit, enterprise software" },
];
document.getElementById("work-cards").append(...WORK_CARDS.map((f,i)=>{
  const c = el("div","card"+(f.big?" big":"")); c.style.setProperty("--d",(i*90)+"ms");
  c.innerHTML = `<span class="k">${f.k}</span><span class="v">${f.v}</span>${f.s?`<span class="s">${f.s}</span>`:""}`;
  return c;
}));

// Section counts (data labels under the sticky headings)
document.getElementById("count-stack").textContent = STACK.reduce((n,g)=>n+g.items.length,0)+" tools";
{ const yrs = EXPERIENCE.map(j=>+j.year); document.getElementById("count-work").textContent = `${EXPERIENCE.length} roles, ${Math.min(...yrs)} to present`; }
document.getElementById("count-projects").textContent = PROJECTS.length+" projects";

// Experience
const logoFor = j => {
  const mono = `<span class="logo mono" aria-hidden="true">${j.company.split(/[\s,]+/).slice(0,2).map(w=>w[0]).join("")}</span>`;
  const src = j.logo || (j.domain ? `https://www.google.com/s2/favicons?domain=${j.domain}&sz=64` : null);
  return src ? `<span class="logo"><img src="${src}" alt="" loading="lazy" onerror="this.parentElement.outerHTML=${JSON.stringify(mono).replace(/"/g,'&quot;')}"></span>` : mono;
};
const xp = document.getElementById("xp");
EXPERIENCE.forEach(j => {
  const art = el("article","job"+(j.current?" current":""));
  art.innerHTML = `
    <span class="year">${j.year}</span><span class="tick"></span>
    <header>${logoFor(j)}<h3>${j.role}</h3><span class="co">${j.company}, ${j.range}</span></header>
    <ul>${j.bullets.map(b=>`<li>${b}</li>`).join("")}</ul>
    ${j.metrics?.length ? `<div class="metrics">${j.metrics.map(([v,k],i)=>`<div class="metric"><b data-target="${v}">${v}</b><span>${k}</span>${(j.note&&i===0)?`<span class="ann metric-ann"><svg viewBox="0 0 60 44"><path d="M56 4 C 40 10, 22 24, 6 40 M8 30 l-3 11 11 -3"/></svg>${j.note}</span>`:""}</div>`).join("")}</div>`:""}
  `;
  xp.append(art);
});

// Projects
const sparkSVG = (data) => {
  const w=200,h=28,max=Math.max(...data),min=Math.min(...data);
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-2-((v-min)/(max-min||1))*(h-4)}`).join(" ");
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
    <polyline points="${pts}" fill="none" stroke="var(--signal)" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
    <circle cx="${w}" cy="${pts.split(" ").pop().split(",")[1]}" r="2.5" fill="var(--signal)"/></svg>`;
};
document.getElementById("projects-grid").append(...PROJECTS.map(p => {
  const a = el("article",`proj ${p.size}`);
  a.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.blurb}</p>
    ${p.spark ? sparkSVG(p.spark) : ""}
    <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
    ${p.links.length ? `<div class="links">${p.links.map(([t,h])=>`<a class="u" href="${h}" target="_blank" rel="noopener">${t}</a>`).join("")}</div>`:""}
  `;
  return a;
}));

// Notes
const nb = document.getElementById("notes-body");
if (!NOTES.length) {
  nb.innerHTML = `<div class="notes-empty">
    <h3>Nothing published yet.</h3>
    <p>The first note goes here. Add an object to the <code>NOTES</code> array and it will appear in this list with a date rail, newest first.</p>
  </div>`;
} else {
  const list = el("div","notes-list");
  NOTES.sort((a,b)=>b.date.localeCompare(a.date)).forEach(n=>{
    list.innerHTML += `<a class="note" href="${n.href}"><time>${n.date}</time><div><h3>${n.title}</h3><p>${n.blurb}</p></div></a>`;
  });
  nb.append(list);
}
