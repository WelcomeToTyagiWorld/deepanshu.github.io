
/* ════════════════════════════════
   LOADER
════════════════════════════════ */
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('loader').classList.add('hidden'),1800);
});

/* ════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════ */
const dot=document.getElementById('cursor-dot');
const ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  dot.style.left=mx+'px';dot.style.top=my+'px';
});
(function animRing(){
  rx+=(mx-rx)*.14;ry+=(my-ry)*.14;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.project-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    ring.style.width='52px';ring.style.height='52px';
    ring.style.borderColor='rgba(6,182,212,.6)';
  });
  el.addEventListener('mouseleave',()=>{
    ring.style.width='36px';ring.style.height='36px';
    ring.style.borderColor='rgba(37,99,235,.5)';
  });
});

/* ════════════════════════════════
   SCROLL PROGRESS
════════════════════════════════ */
const progress=document.getElementById('scroll-progress');
window.addEventListener('scroll',()=>{
  const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;
  progress.style.width=Math.min(pct,100)+'%';
},{ passive:true });

/* ════════════════════════════════
   NAV SCROLL + ACTIVE LINK
════════════════════════════════ */
const nav=document.getElementById('nav');
const navLinks=document.querySelectorAll('.nav-link');
const sections=document.querySelectorAll('section[id]');
const backTop=document.getElementById('back-top');
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  nav.classList.toggle('scrolled',y>60);
  backTop.classList.toggle('visible',y>400);
  let current='';
  sections.forEach(s=>{if(y>=s.offsetTop-120)current=s.id});
  navLinks.forEach(l=>{
    l.classList.toggle('active',l.getAttribute('href')==='#'+current);
  });
},{ passive:true });

/* ════════════════════════════════
   MOBILE MENU
════════════════════════════════ */
const mmOverlay=document.getElementById('mm-overlay');
const mobileMenu=document.getElementById('mobile-menu');
function openMenu(){mobileMenu.classList.add('open');mmOverlay.classList.add('open');document.body.style.overflow='hidden'}
function closeMenu(){mobileMenu.classList.remove('open');mmOverlay.classList.remove('open');document.body.style.overflow=''}

/* ════════════════════════════════
   THEME TOGGLE
════════════════════════════════ */
const themeBtn=document.getElementById('themeBtn');
let dark=localStorage.getItem('theme')!=='light';
function applyTheme(){
  document.documentElement.setAttribute('data-theme',dark?'dark':'light');
  themeBtn.textContent=dark?'🌙':'☀️';
}
applyTheme();
themeBtn.addEventListener('click',()=>{dark=!dark;localStorage.setItem('theme',dark?'dark':'light');applyTheme()});

/* ════════════════════════════════
   TYPEWRITER
════════════════════════════════ */
const words=['Solution Architect','Copilot Engineer','Power Platform Lead','SPFx Developer Lead','M365 Strategist'];
let wi=0,ci=0,del=false;
const tw=document.getElementById('typewriter');
function type(){
  const w=words[wi%words.length];
  if(!del){tw.textContent=w.slice(0,++ci);if(ci===w.length){del=true;setTimeout(type,2200);return}}
  else{tw.textContent=w.slice(0,--ci);if(ci===0){del=false;wi++}}
  setTimeout(type,del?55:95);
}
setTimeout(type,1400);

/* ════════════════════════════════
   SCROLL REVEAL
════════════════════════════════ */
const revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revObs.unobserve(e.target)}});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ════════════════════════════════
   COUNTER ANIMATION
════════════════════════════════ */
function animCount(el,to,dur=1800){
  let s=null;
  (function step(ts){
    if(!s)s=ts;
    const p=Math.min((ts-s)/dur,1);
    const e=1-Math.pow(1-p,3);
    el.textContent=Math.floor(e*to);
    if(p<1)requestAnimationFrame(step);
    else el.textContent=to;
  })(performance.now());
}
const cntObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      animCount(e.target,parseInt(e.target.dataset.target));
      cntObs.unobserve(e.target);
    }
  });
},{threshold:.6});
document.querySelectorAll('.counter').forEach(el=>cntObs.observe(el));

/* ════════════════════════════════
   SKILL BARS ANIMATION
════════════════════════════════ */
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-bar-fill').forEach(b=>{
        b.style.width=b.dataset.w+'%';
      });
      barObs.unobserve(e.target);
    }
  });
},{threshold:.2});
document.querySelectorAll('.skill-group').forEach(g=>barObs.observe(g));

/* ════════════════════════════════
   PROJECT FILTER
════════════════════════════════ */
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card=>{
      const cats=(card.dataset.cat||'').split(' ');
      const show=f==='all'||cats.includes(f);
      card.style.display=show?'flex':'none';
    });
  });
});

/* ════════════════════════════════
   PROJECT MODAL
════════════════════════════════ */
const overlay=document.getElementById('modal-overlay');
function openModal(card){
  document.getElementById('m-tag').textContent=card.dataset.tag||'';
  document.getElementById('m-title').textContent=card.dataset.title||'';
  document.getElementById('m-desc').textContent=card.dataset.desc||'';
  // flow diagram
  const flowSec=document.getElementById('m-flow-section');
  flowSec.style.display=card.dataset.flow?'block':'none';
  // impacts
  const impacts=JSON.parse(card.dataset.impacts||'[]');
  document.getElementById('m-impacts').innerHTML=impacts.map(i=>`<div class="modal-impact">✓ ${i}</div>`).join('');
  // bullets
  const bullets=JSON.parse(card.dataset.bullets||'[]');
  document.getElementById('m-bullets').innerHTML=bullets.map(b=>`<div class="modal-bullet"><span>${b}</span></div>`).join('');
  // stack
  const stack=JSON.parse(card.dataset.stack||'[]');
  document.getElementById('m-stack').innerHTML=stack.map(s=>`<span class="modal-chip">${s}</span>`).join('');
  overlay.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){overlay.classList.remove('open');document.body.style.overflow=''}
function handleOverlayClick(e){if(e.target===overlay)closeModal()}
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('click',()=>openModal(card));
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

/* ════════════════════════════════
   TOAST
════════════════════════════════ */
function showToast(msg,type='success'){
  const t=document.getElementById('toast');
  const icon=document.getElementById('toast-icon');
  document.getElementById('toast-msg').textContent=msg;
  icon.textContent=type==='success'?'✓':'✕';
  t.className='show '+(type==='success'?'success':'error');
  setTimeout(()=>t.className='',3500);
}

/* ════════════════════════════════
   CONTACT FORM
════════════════════════════════ */
document.getElementById('contact-form').addEventListener('submit',function(e){
  e.preventDefault();
  const name=document.getElementById('fname').value.trim();
  const email=document.getElementById('femail').value.trim();
  const subject=document.getElementById('fsubject').value.trim();
  const msg=document.getElementById('fmsg').value.trim();
  if(!name||!email||!subject||!msg){showToast('Please fill in all fields.','error');return}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showToast('Please enter a valid email.','error');return}
  const btn=document.getElementById('submit-btn');
  btn.textContent='Sending...';btn.classList.add('loading');btn.disabled=true;
  const mailto=`mailto:deepanshut34@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+msg)}`;
  window.location.href=mailto;
  setTimeout(()=>{
    btn.textContent='Send Message →';btn.classList.remove('loading');btn.disabled=false;
    document.getElementById('contact-form').reset();
    showToast('Opening email client... Message ready!','success');
  },1200);
});

