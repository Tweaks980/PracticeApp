import { DEFAULT_CLUBS, DEFAULT_DRILLS, CONTACT_TYPES } from './data.js';
import { todayISO, getShots, getUserClubs, getUserDrills, getNote } from './app.js';

const fromDate=document.getElementById('fromDate');
const toDate=document.getElementById('toDate');
const drillFilter=document.getElementById('drillFilter');
const clubFilter=document.getElementById('clubFilter');
const thead=document.getElementById('thead');
const tbody=document.getElementById('tbody');
const viewByClubBtn=document.getElementById('viewByClub');
const viewByDrillBtn=document.getElementById('viewByDrill');
const exportBtn=document.getElementById('exportCsv');

let clubs=getUserClubs(DEFAULT_CLUBS);
let drills=getUserDrills(DEFAULT_DRILLS);
let mode='club';

function isoToInt(s){ return parseInt((s||'').replaceAll('-','')||'0',10); }
function pct(a,b){ return b?Math.round(a/b*100)+'%':'–'; }

function init(){
  const to=todayISO();
  const from=new Date(Date.now()-30*24*3600*1000).toISOString().slice(0,10);
  fromDate.value=from; toDate.value=to;

  drillFilter.innerHTML='<option value="">All drills</option>';
  for(const d of drills){ const o=document.createElement('option'); o.value=d.id; o.textContent=d.name; drillFilter.appendChild(o); }

  clubFilter.innerHTML='<option value="">All clubs</option>';
  for(const c of clubs){ const o=document.createElement('option'); o.value=c.id; o.textContent=c.name; clubFilter.appendChild(o); }
}

function filtered(){
  const shots=getShots();
  const f=isoToInt(fromDate.value);
  const t=isoToInt(toDate.value);
  const d=drillFilter.value;
  const c=clubFilter.value;
  return shots.filter(s=>{
    const di=isoToInt(s.date);
    if(f && di<f) return false;
    if(t && di>t) return false;
    if(d && s.drillId!==d) return false;
    if(c && s.clubId!==c) return false;
    return true;
  });
}

function aggregate(){
  const shots=filtered();
  const agg={};
  for(const s of shots){
    const key = mode==='club'?s.clubId:s.drillId;
    if(!agg[key]){
      agg[key]={label:(mode==='club'?(clubs.find(x=>x.id===key)?.name||key):(drills.find(x=>x.id===key)?.name||key)),
        total:0,success:0,miss:0,solid:0,thin:0,fat:0,toe:0,heel:0,miss_short:0,miss_long:0,miss_left:0,miss_right:0};
    }
    const a=agg[key];
    a.total+=1;
    if(s.outcome==='success') a.success+=1;
    if(s.outcome==='miss'){ a.miss+=1; if(s.missDirection) a['miss_'+s.missDirection]+=1; }
    for(const k of CONTACT_TYPES){ if(s.contact?.[k]) a[k]+=1; }
  }
  return Object.values(agg).sort((x,y)=>y.total-x.total);
}

function render(){
  const rows=aggregate();
  tbody.innerHTML='';
  if(mode==='club'){
    thead.innerHTML=`<tr><th>Club</th><th>Success</th><th>Miss</th><th>Success %</th><th>Solid</th><th>Thin</th><th>Fat</th><th>Toe</th><th>Heel</th><th>Miss: Short</th><th>Miss: Long</th><th>Miss: Left</th><th>Miss: Right</th></tr>`;
    for(const a of rows){
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${a.label}</td><td>${a.success}</td><td>${a.miss}</td><td>${pct(a.success,a.total)}</td><td>${a.solid}</td><td>${a.thin}</td><td>${a.fat}</td><td>${a.toe}</td><td>${a.heel}</td><td>${a.miss_short}</td><td>${a.miss_long}</td><td>${a.miss_left}</td><td>${a.miss_right}</td>`;
      tbody.appendChild(tr);
    }
  }else{
    thead.innerHTML=`<tr><th>Drill</th><th>Success</th><th>Miss</th><th>Success %</th><th>Miss: Short</th><th>Miss: Long</th><th>Miss: Left</th><th>Miss: Right</th></tr>`;
    for(const a of rows){
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${a.label}</td><td>${a.success}</td><td>${a.miss}</td><td>${pct(a.success,a.total)}</td><td>${a.miss_short}</td><td>${a.miss_long}</td><td>${a.miss_left}</td><td>${a.miss_right}</td>`;
      tbody.appendChild(tr);
    }
  }
}

function csvEscape(v){
  const s=(v??'').toString();
  if(s.includes('"')||s.includes(',')||s.includes('\n')) return '"'+s.replaceAll('"','""')+'"';
  return s;
}

function exportCSV(){
  const shots=filtered().slice().sort((a,b)=>a.timestamp.localeCompare(b.timestamp));
  const headers=['id','date','timestamp','drillId','drillName','clubId','clubName','outcome','missDirection','miss_type','miss_left','miss_right','miss_short','miss_long',...CONTACT_TYPES.map(k=>'contact_'+k),'notes'];
  const lines=[headers.join(',')];
  for(const s of shots){
    const note=getNote(s.date,s.drillId)||'';
    const missType=s.missDirection?(s.missDirection[0].toUpperCase()+s.missDirection.slice(1)):'';
    const row={
      id:s.id,date:s.date,timestamp:s.timestamp,drillId:s.drillId,drillName:s.drillName,clubId:s.clubId,clubName:s.clubName,
      outcome:s.outcome,missDirection:(s.missDirection||''),miss_type:missType,
      miss_left:s.missDirection==='left'?1:0,miss_right:s.missDirection==='right'?1:0,miss_short:s.missDirection==='short'?1:0,miss_long:s.missDirection==='long'?1:0,
      notes:note
    };
    for(const k of CONTACT_TYPES){ row['contact_'+k]=s.contact?.[k]?1:0; }
    lines.push(headers.map(h=>csvEscape(row[h])).join(','));
  }
  const blob=new Blob([lines.join('\n')],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='golf_practice_export.csv';
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

[fromDate,toDate,drillFilter,clubFilter].forEach(el=>el.addEventListener('change',render));
viewByClubBtn.addEventListener('click',()=>{mode='club';render();});
viewByDrillBtn.addEventListener('click',()=>{mode='drill';render();});
exportBtn.addEventListener('click',exportCSV);

init(); render();
