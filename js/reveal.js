/* Reveal annotations + count metrics up when they enter the viewport */
(function(){
  const io = new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return;
    const n=e.target;
    if(n.classList.contains("ann")||n.classList.contains("stack-group")||n.classList.contains("work-cards")) n.classList.add("in");
    if(n.dataset.target!=null && !n.dataset.done){ n.dataset.done=1; countUp(n); }
    io.unobserve(n);
  }),{threshold:.4});
  document.querySelectorAll(".ann,[data-target],.stack-group,.work-cards").forEach(n=>io.observe(n));
  function countUp(n){
    const raw=n.dataset.target, m=raw.match(/^([^0-9]*)([0-9.]+)(.*)$/);
    if(!m||reduce){ n.textContent=raw; return; }
    const [,pre,num,post]=m, target=parseFloat(num), dec=(num.split(".")[1]||"").length, t0=performance.now(), dur=900;
    (function f(t){ const k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3);
      n.textContent=pre+(target*e).toFixed(dec)+post; if(k<1) requestAnimationFrame(f); })(t0);
  }
})();
