/* MOTION — the hero graph (the one bold element)
   Simple force layout + activation pulses along edges. */
(function(){
  const cv = document.getElementById("net"), ctx = cv.getContext("2d");
  const css = getComputedStyle(document.documentElement);
  const INK = css.getPropertyValue("--ink").trim(), SIG = css.getPropertyValue("--signal").trim(),
        TRACE = css.getPropertyValue("--trace").trim(), AMB = css.getPropertyValue("--amber").trim();
  let W,H,dpr;
  const N = GRAPH.nodes.map((n,i)=>({...n, x:0,y:0,vx:0,vy:0, r:n.hub?5:3, act:0}));
  const byId = Object.fromEntries(N.map(n=>[n.id,n]));
  const L = GRAPH.links.map(([a,b])=>({a:byId[a], b:byId[b]}));
  const pulses = [];
  let mouse = {x:-1e4,y:-1e4}, drag=null, t=0;

  function size(){
    dpr = Math.min(devicePixelRatio||1,2);
    const rect = cv.getBoundingClientRect();
    W = rect.width; H = rect.height;
    cv.width = W*dpr; cv.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function seed(){
    // seed groups around loose centres so clusters read immediately
    const centres = [[.28,.35],[.68,.28],[.72,.72],[.3,.78],[.5,.52]];
    N.forEach(n=>{ const c=centres[n.g]; n.x=c[0]*W+(Math.random()-.5)*W*.18; n.y=c[1]*H+(Math.random()-.5)*H*.18; });
  }
  size(); seed();
  addEventListener("resize", ()=>{ size(); });

  function step(){
    // repulsion
    for(let i=0;i<N.length;i++) for(let j=i+1;j<N.length;j++){
      const a=N[i],b=N[j]; let dx=b.x-a.x, dy=b.y-a.y; let d2=dx*dx+dy*dy+0.01; const d=Math.sqrt(d2);
      const f = 1800/d2; dx/=d; dy/=d;
      a.vx-=dx*f; a.vy-=dy*f; b.vx+=dx*f; b.vy+=dy*f;
    }
    // springs
    L.forEach(({a,b})=>{
      let dx=b.x-a.x, dy=b.y-a.y; const d=Math.sqrt(dx*dx+dy*dy)+0.01;
      const rest = (a.hub&&b.hub)? W*.22 : W*.14;
      const f=(d-rest)*0.012; dx/=d; dy/=d;
      a.vx+=dx*f; a.vy+=dy*f; b.vx-=dx*f; b.vy-=dy*f;
    });
    // gentle centring + mouse curiosity + integrate
    N.forEach(n=>{
      n.vx+=(W*.5-n.x)*0.0025; n.vy+=(H*.5-n.y)*0.0025;
      const dx=mouse.x-n.x, dy=mouse.y-n.y, d=Math.hypot(dx,dy);
      if(d<140 && n!==drag){ n.vx+=dx/d*0.35; n.vy+=dy/d*0.35; n.act=Math.max(n.act, 1-d/140); }
      n.vx*=0.86; n.vy*=0.86;
      if(n!==drag){ n.x+=n.vx; n.y+=n.vy; }
      n.x=Math.max(14,Math.min(W-14,n.x)); n.y=Math.max(14,Math.min(H-14,n.y));
      n.act*=0.94;
    });
    // spawn pulses occasionally from hubs
    if(!reduce && mouse.x>0 && Math.random()<0.09 && pulses.length<12){
      const from = N[Math.floor(Math.random()*N.length)];
      const out = L.filter(l=>l.a===from||l.b===from);
      if(out.length){ const l=out[Math.floor(Math.random()*out.length)]; pulses.push({l, dir:l.a===from?1:-1, p:0}); }
    }
    for(let i=pulses.length-1;i>=0;i--){
      const q=pulses[i]; q.p+=0.018;
      if(q.p>=1){ const end = q.dir===1?q.l.b:q.l.a; end.act=1; pulses.splice(i,1); }
    }
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    // edges
    ctx.lineWidth=1;
    L.forEach(({a,b})=>{
      const s=Math.max(a.act,b.act);
      ctx.strokeStyle = s>0.05 ? SIG : TRACE;
      ctx.globalAlpha = 0.35 + s*0.5;
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
    });
    ctx.globalAlpha=1;
    // pulses
    pulses.forEach(q=>{
      const a=q.dir===1?q.l.a:q.l.b, b=q.dir===1?q.l.b:q.l.a;
      const x=a.x+(b.x-a.x)*q.p, y=a.y+(b.y-a.y)*q.p;
      ctx.fillStyle=SIG; ctx.beginPath(); ctx.arc(x,y,2.2,0,7); ctx.fill();
    });
    // nodes
    N.forEach(n=>{
      const r = n.r + n.act*3;
      ctx.beginPath(); ctx.arc(n.x,n.y,r,0,7);
      ctx.fillStyle = n.act>0.35 ? AMB : INK; ctx.fill();
      if(n.hub){
        ctx.font="500 11.5px DM Mono, monospace";
        ctx.fillStyle = INK; ctx.globalAlpha=.85;
        ctx.fillText(n.id, n.x+r+6, n.y+4); ctx.globalAlpha=1;
      } else if(n.act>0.5){
        ctx.font="400 10.5px DM Mono, monospace";
        ctx.fillStyle = INK; ctx.globalAlpha = (n.act-0.5)*2;
        ctx.fillText(n.id, n.x+r+6, n.y+4); ctx.globalAlpha=1;
      }
    });
    // crosshair readout, bottom-right
    if(mouse.x>0){
      ctx.font="400 10.5px DM Mono, monospace"; ctx.fillStyle=TRACE;
      ctx.fillText(`${Math.round(mouse.x)}, ${Math.round(mouse.y)}`, W-84, H-10);
    }
  }

  function loop(){ t++; step(); draw(); if(!reduce || t<240) requestAnimationFrame(loop); }
  // settle the layout, then start the loop once the headline has landed (800ms)
  for(let i=0;i<60;i++) step();
  draw(); setTimeout(loop, reduce?0:800);

  // pointer
  const pos = e => { const r=cv.getBoundingClientRect(); const p=e.touches?e.touches[0]:e; return {x:p.clientX-r.left, y:p.clientY-r.top}; };
  cv.addEventListener("pointermove", e=>{ mouse=pos(e); if(drag){ drag.x=mouse.x; drag.y=mouse.y; } });
  cv.addEventListener("pointerleave", ()=>{ mouse={x:-1e4,y:-1e4}; drag=null; });
  cv.addEventListener("pointerdown", e=>{ const m=pos(e); drag = N.find(n=>Math.hypot(n.x-m.x,n.y-m.y)<14) || null; if(drag) drag.act=1; });
  cv.addEventListener("pointerup", ()=>{ drag=null; });
})();
