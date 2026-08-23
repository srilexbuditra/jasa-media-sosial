(() => {
const q=document.getElementById("q"), form=document.getElementById("searchForm"), results=document.getElementById("results"), count=document.getElementById("count");
let index=[];
const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
function score(x,t){t=t.toLowerCase();let s=0,a=(x.title||"").toLowerCase(),b=(x.description||"").toLowerCase(),c=(x.content||"").toLowerCase();if(a.includes(t))s+=100;if(b.includes(t))s+=40;if(c.includes(t))s+=10;return s}
function render(term){term=term.trim();if(!term){count.textContent="";results.innerHTML="";return}
let f=index.map(x=>({x,s:score(x,term)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,50);
count.textContent=`${f.length} hasil ditemukan`;
results.innerHTML=f.length?f.map(({x})=>`<article class="result"><h2><a href="${esc(x.url)}">${esc(x.title)}</a></h2><p>${esc(x.description||(x.content||"").slice(0,240))}</p></article>`).join(""):'<div class="empty">Tidak ditemukan hasil untuk pencarian tersebut.</div>'}
fetch("/jasa-media-sosial/search-index.json").then(r=>r.json()).then(d=>{index=Array.isArray(d)?d:[];q.value=new URLSearchParams(location.search).get("q")||"";render(q.value)}).catch(()=>{results.innerHTML='<div class="empty">Indeks pencarian belum dapat dimuat.</div>'});
form.addEventListener("submit",e=>{e.preventDefault();let t=q.value.trim();history.replaceState(null,"",t?`?q=${encodeURIComponent(t)}`:"search.html");render(t)});
})();