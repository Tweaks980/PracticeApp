import { DEFAULT_CLUBS, DEFAULT_DRILLS, CONTACT_TYPES, isPuttingDrill } from './data.js';
import { todayISO, uid, getShots, addShot, deleteShotById, getUserClubs, getUserDrills, getNote, saveNote } from './app.js';

const dateInput = document.getElementById('dateInput');
const drillSearch = document.getElementById('drillSearch');
const drillSelect = document.getElementById('drillSelect');
const drillDesc = document.getElementById('drillDesc');
const drillBadges = document.getElementById('drillBadges');
const clubPills = document.getElementById('clubPills');
const contactSection = document.getElementById('contactSection');
const contactGrid = document.getElementById('contactGrid');
const outcomeGrid = document.getElementById('outcomeGrid');
const dirSection = document.getElementById('dirSection');
const dirGrid = document.getElementById('dirGrid');
const notesBox = document.getElementById('notesBox');
const summary = document.getElementById('summary');
const totalsBody = document.getElementById('totalsBody');
const shotsBody = document.getElementById('shotsBody');
const undoBtn = document.getElementById('undoBtn');

let clubs = getUserClubs(DEFAULT_CLUBS);
let drills = getUserDrills(DEFAULT_DRILLS);

let selectedDate = todayISO();
let selectedDrillId = drills[0]?.id || '';
let selectedClubId = clubs[0]?.id || '';
let currentContact = Object.fromEntries(CONTACT_TYPES.map(k => [k,false]));

function filteredSessionShots(){
  return getShots().filter(s => s.date===selectedDate && s.drillId===selectedDrillId);
}

function renderDrillOptions(filterText=''){
  const ft = (filterText||'').trim().toLowerCase();
  drillSelect.innerHTML = '';
  const list = ft ? drills.filter(d => (d.name||'').toLowerCase().includes(ft)) : drills;
  for (const d of list){
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = d.name;
    drillSelect.appendChild(opt);
  }
  if (![...drillSelect.options].some(o => o.value===selectedDrillId)){
    selectedDrillId = drillSelect.options[0]?.value || selectedDrillId;
  }
  drillSelect.value = selectedDrillId;
}

function renderDrillDetails(){
  const d = drills.find(x=>x.id===selectedDrillId);
  if (!d){ drillDesc.textContent='Select a drill.'; drillBadges.innerHTML=''; return; }
  drillDesc.textContent = d.constraints?.[0] || '';
  drillBadges.innerHTML = '';
  (d.constraints||[]).slice(0,6).forEach(line=>{
    const b=document.createElement('span');
    b.className='badge';
    b.textContent=line;
    drillBadges.appendChild(b);
  });
}

function renderClubs(){
  clubPills.innerHTML='';
  for (const c of clubs){
    const pill=document.createElement('div');
    pill.className='pill'+(c.id===selectedClubId?' active':'');
    pill.innerHTML = `${c.name}${c.loft!=null?` (${c.loft}°)`:''} <small>${c.carryMin}–${c.carryMax}</small>`;
    pill.addEventListener('click', ()=>{ selectedClubId=c.id; renderClubs(); renderSummary(''); });
    clubPills.appendChild(pill);
  }
}

function renderContact(){
  contactGrid.innerHTML='';
  for (const k of CONTACT_TYPES){
    const tile=document.createElement('div');
    tile.className='tile'+(currentContact[k]?' active':'');
    tile.textContent = k[0].toUpperCase()+k.slice(1);
    tile.addEventListener('click', ()=>{ currentContact[k]=!currentContact[k]; renderContact(); renderSummary(''); });
    contactGrid.appendChild(tile);
  }
}

function clearContact(){
  currentContact = Object.fromEntries(CONTACT_TYPES.map(k => [k,false]));
  renderContact();
}

function renderSummary(extra){
  const d = drills.find(x=>x.id===selectedDrillId);
  const c = clubs.find(x=>x.id===selectedClubId);
  if (!d || !c){ summary.textContent=''; return; }
  const byClub = filteredSessionShots().filter(s=>s.clubId===selectedClubId);
  const success = byClub.filter(s=>s.outcome==='success').length;
  const miss = byClub.filter(s=>s.outcome==='miss').length;
  const total = success+miss;
  const pct = total ? Math.round(success/total*100) : null;
  summary.innerHTML = `Logging <strong>${d.name}</strong> · <strong>${c.name}</strong> — ${total} shots (${success} success, ${miss} miss${pct!=null?`, ${pct}%`:''}). ${extra||''}`;
}

function calcTotals(){
  const session = filteredSessionShots();
  const totals = {};
  for (const c of clubs){
    totals[c.id] = {clubName:c.name, success:0, miss:0, total:0, solid:0, thin:0, fat:0, toe:0, heel:0, miss_short:0, miss_long:0, miss_left:0, miss_right:0};
  }
  for (const s of session){
    const t = totals[s.clubId]; if (!t) continue;
    t.total += 1;
    if (s.outcome==='success') t.success += 1;
    if (s.outcome==='miss'){ t.miss += 1; if (s.missDirection) t['miss_'+s.missDirection] += 1; }
    for (const k of CONTACT_TYPES){ if (s.contact?.[k]) t[k] += 1; }
  }
  return totals;
}

function renderTotals(){
  const totals = calcTotals();
  totalsBody.innerHTML='';
  for (const c of clubs){
    const t = totals[c.id];
    const pct = t.total ? Math.round(t.success/t.total*100)+'%' : '–';
    const tr=document.createElement('tr');
    tr.innerHTML = `<td>${t.clubName}</td><td>${t.success}</td><td>${t.miss}</td><td>${pct}</td><td>${t.solid}</td><td>${t.thin}</td><td>${t.fat}</td><td>${t.toe}</td><td>${t.heel}</td><td>${t.miss_short}</td><td>${t.miss_long}</td><td>${t.miss_left}</td><td>${t.miss_right}</td>`;
    totalsBody.appendChild(tr);
  }
}

function renderShots(){
  const session = filteredSessionShots().slice().sort((a,b)=>a.timestamp.localeCompare(b.timestamp));
  shotsBody.innerHTML='';
  for (const s of session){
    const tags = Object.entries(s.contact||{}).filter(([_,v])=>v).map(([k])=>k).join(', ');
    const tr=document.createElement('tr');
    tr.innerHTML = `<td>${s.date}</td><td>${s.drillName}</td><td>${s.clubName}</td><td>${s.outcome}</td><td>${s.missDirection||''}</td><td>${tags}</td>`;
    shotsBody.appendChild(tr);
  }
}

function refreshAll(){
  renderDrillDetails();
  renderClubs();
  renderContact();
  renderTotals();
  renderShots();
  renderSummary('');
}

function setDrill(id){
  selectedDrillId = id;
  const putting = isPuttingDrill(selectedDrillId);
  contactSection.classList.toggle('hidden', putting);
  if (putting) clearContact();
  notesBox.value = getNote(selectedDate, selectedDrillId);
  refreshAll();
}

function commitShot(outcome, dir=null){
  const d = drills.find(x=>x.id===selectedDrillId);
  const c = clubs.find(x=>x.id===selectedClubId);
  if (!d || !c) return;
  const putting = isPuttingDrill(selectedDrillId);
  const shot = {
    id: uid(),
    date: selectedDate,
    timestamp: new Date().toISOString(),
    drillId: d.id, drillName: d.name,
    clubId: c.id, clubName: c.name,
    outcome,
    missDirection: outcome==='miss' ? dir : null,
    contact: putting ? {} : {...currentContact},
  };
  addShot(shot);
  if (!putting) clearContact();
  dirSection.classList.add('hidden');
  refreshAll();
  renderSummary(outcome==='success' ? 'Last: Success.' : `Last: Miss – ${dir}.`);
}

dateInput.value = selectedDate;
dateInput.addEventListener('change', ()=>{ selectedDate = dateInput.value || todayISO(); notesBox.value = getNote(selectedDate, selectedDrillId); refreshAll(); });

renderDrillOptions('');
drillSelect.addEventListener('change', ()=> setDrill(drillSelect.value));
drillSearch.addEventListener('input', ()=>{ renderDrillOptions(drillSearch.value); setDrill(selectedDrillId); });

notesBox.value = getNote(selectedDate, selectedDrillId);
notesBox.addEventListener('input', ()=> saveNote(selectedDate, selectedDrillId, notesBox.value));

outcomeGrid.addEventListener('click', (e)=>{
  const el = e.target.closest('[data-outcome]'); if (!el) return;
  const o = el.getAttribute('data-outcome');
  if (o==='success') commitShot('success', null);
  if (o==='miss') dirSection.classList.remove('hidden');
});
dirGrid.addEventListener('click', (e)=>{
  const el = e.target.closest('[data-dir]'); if (!el) return;
  commitShot('miss', el.getAttribute('data-dir'));
});

undoBtn.addEventListener('click', ()=>{
  const session = filteredSessionShots();
  if (!session.length) return;
  const last = session.slice().sort((a,b)=>b.timestamp.localeCompare(a.timestamp))[0];
  if (confirm('Undo the last shot for this date + drill?')){
    deleteShotById(last.id);
    refreshAll();
  }
});

// init
setDrill(selectedDrillId);
refreshAll();
