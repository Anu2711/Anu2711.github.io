/* MOTION — experience rail draws with scroll */
const rail = xp.querySelector(".rail");
const jobs = [...xp.querySelectorAll(".job")];
function railTick(){
  const r = xp.getBoundingClientRect();
  const focus = innerHeight*0.6;
  const h = Math.max(0, Math.min(r.height, focus - r.top));
  rail.style.height = h+"px";
  jobs.forEach(j => j.classList.toggle("on", j.getBoundingClientRect().top < focus));
}
if (reduce) { rail.style.height="100%"; jobs.forEach(j=>j.classList.add("on")); }
else { addEventListener("scroll", railTick, {passive:true}); railTick(); }
