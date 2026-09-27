// ITPro theme JS: typing, theme toggle, reveal, bars, palette, filters, code-rain, copy, counters. No deps. <1200 lines, defer-loaded.
(()=>{"use strict";
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
// theme
const root=document.documentElement;
const saved=localStorage.getItem("itpro-theme"); if(saved)root.dataset.theme=saved; else root.dataset.theme="dark";
$("#themeToggle")?.addEventListener("click",()=>{root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";localStorage.setItem("itpro-theme",root.dataset.theme)});
// terminal whoami typing (runs once, then stays readable)
const term=$("#term-out");
if(term){const lines=["$ whoami","madhusudan.upadhyay — ICT Support Executive","$ experience --summary","11+ yrs · UNDP + Judicial Council, Nepal","$ cat mission.txt","\"Workplace tech, reliable + documented.\""];
let li=0;term.textContent="";(function nl(){if(li>=lines.length)return;const l=lines[li++];let c=0;const iv=setInterval(()=>{term.textContent+=l[c++]||"";if(c>l.length){term.textContent+="\n";clearInterval(iv);setTimeout(nl,350)}},14)})();}
// code rain (lightweight matrix-lite)
const cv=$("#coderain");
if(cv&&matchMedia("(prefers-reduced-motion: no-preference)").matches){const ctx=cv.getContext("2d");let W,H,col,drops,chars="01{}<>/=+#$アイティー01";
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;col=Math.floor(W/16);drops=Array(col).fill(0).map(()=>Math.random()*H/16)}rs();addEventListener("resize",rs);
const isLight=()=>document.documentElement.dataset.theme==="light";
setInterval(()=>{ctx.fillStyle=isLight()?"rgba(247,249,252,.12)":"rgba(9,11,18,.12)";ctx.fillRect(0,0,W,H);ctx.fillStyle=isLight()?"rgba(59,130,246,.35)":"rgba(59,130,246,.55)";ctx.font="13px monospace";
drops.forEach((y,i)=>{const ch=chars[Math.floor(Math.random()*chars.length)];ctx.fillText(ch,i*16,y*16);drops[i]=y*16>H&&Math.random()>.976?0:y+.6})},66);}
// reveal + bars + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");
$$(".bar i",e.target).forEach(b=>b.style.width=b.dataset.w+"%");
$$("[data-count]",e.target).forEach(n=>{if(n.dataset.done)return;n.dataset.done=1;const t=parseFloat(n.dataset.count);const suf=n.dataset.suffix||"";const st=performance.now();
(function f(now){const p=Math.min(1,(now-st)/1400);n.textContent=(t%1?t.toFixed(1)*(p):Math.round(t*p))+ (p===1?suf:"");if(p<1)requestAnimationFrame(f)})(st)});io.unobserve(e.target)}}),{threshold:.15});
$$(".rv").forEach(n=>io.observe(n));
// filters
$$("[data-filter-btn]").forEach(b=>b.addEventListener("click",()=>{$$("[data-filter-btn]").forEach(x=>x.classList.remove("on"));b.classList.add("on");
const f=b.dataset.filterBtn;$$("[data-cat]").forEach(c=>{c.style.display=(f==="all"||c.dataset.cat.includes(f))?"":"none"})}));
// copy buttons for code
$$("div.highlight,pre").forEach(block=>{if(block.querySelector(".copybtn"))return;const b=document.createElement("button");b.className="copybtn";b.textContent="copy";
b.onclick=async()=>{try{await navigator.clipboard.writeText(block.innerText.replace(/^copy\n/,""));b.textContent="copied ✓";setTimeout(()=>b.textContent="copy",1500)}catch{}};block.style.position="relative";block.appendChild(b)});
// command palette Cmd+K
const pal=$("#palette"),inp=$("#pal-input"),list=$("#pal-list");
function togglePal(open){pal.classList.toggle("open",open===undefined?!pal.classList.contains("open"):open);if(pal.classList.contains("open")){inp.value="";filter("");setTimeout(()=>inp.focus(),30)}}
addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();togglePal()}if(e.key==="Escape")togglePal(false);if(e.key==="/"&&document.activeElement.tagName!=="INPUT"&&document.activeElement.tagName!=="TEXTAREA"){e.preventDefault();location.href="/blog/"}});
function filter(q){const items=$$("li",list);items.forEach(li=>{li.style.display=li.textContent.toLowerCase().includes(q.toLowerCase())?"":"none"})}
inp?.addEventListener("input",e=>filter(e.target.value));
$("[data-pal]")?.addEventListener("click",()=>togglePal(true));
pal?.addEventListener("click",e=>{if(e.target===pal)togglePal(false)});
 // search index (Hugo JSON output /search.json) -> palette (XSS-safe: textContent only, same-origin links only)
 const safePermalink = u => { u = String(u || ""); return (/^\/[A-Za-z0-9\/\-._~%?#[\]@!$&'()*+,;=]*$/.test(u) && !/[\s`"\\<>]/.test(u)) ? u : "/"; };
 fetch("/search.json").then(r=>r.json()).then(idx=>{if(!idx||!list)return;idx.slice(0,60).forEach(p=>{const li=document.createElement("li");const a=document.createElement("a");a.href=safePermalink(p.permalink);const tag=document.createElement("span");tag.className="mono small";tag.textContent=String(p.section||"");a.appendChild(tag);a.appendChild(document.createTextNode(" — "+String(p.title||"")));li.appendChild(a);list.appendChild(li)})}).catch(()=>{});
// mobile nav: toggle + auto-close on navigate, Escape, or resize to desktop
const mnavBtn=$("#mnavBtn"),mnav=$("#mnav");
function setMnav(open){if(!mnav||!mnavBtn)return;mnav.style.display=open?"block":"none";mnavBtn.setAttribute("aria-expanded",String(open))}
mnavBtn?.addEventListener("click",()=>setMnav(mnav.style.display!=="block"));
$$("#mnav a").forEach(a=>a.addEventListener("click",()=>setMnav(false)));
addEventListener("resize",()=>{if(innerWidth>960)setMnav(false)});
addEventListener("keydown",e=>{if(e.key==="Escape"&&mnav&&mnav.style.display==="block"){setMnav(false);mnavBtn.focus()}});
 // contact form: time-trap (bots submit instantly) + double-submit lock.
 // Server-side: enable spam filtering in Web3Forms dashboard; never ask for secrets via this form.
 const cform=document.querySelector('form[name="contact"]');
 if(cform){const loadedAt=Date.now();cform.addEventListener("submit",e=>{if(cform.dataset.sent){e.preventDefault();return}
 if(Date.now()-loadedAt<3000){e.preventDefault();const b=cform.querySelector('button[type="submit"]');if(b)b.textContent="Please wait a moment, then send again";return}
 cform.dataset.sent="1";const b=cform.querySelector('button[type="submit"]');if(b){b.disabled=true;b.textContent="Sending…"}})}
 // footer year
 $("#yr")&&( $("#yr").textContent=new Date().getFullYear());
})();
