// app.js (storage + helpers)
export const STORAGE = {
  SHOTS: "golfPracticeLogs_v1",
  NOTES: "golfPracticeNotes_v1",
  CLUBS: "golfPracticeClubs_v1",
  DRILLS: "golfPracticeDrills_v1",
};

export function loadJSON(key, fallback){
  try{ const raw = localStorage.getItem(key); if(!raw) return fallback; const v = JSON.parse(raw); return (v ?? fallback); }
  catch{ return fallback; }
}

export function saveJSON(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

export function uid(){ return (Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,10)); }

export function todayISO(){ return new Date().toISOString().slice(0,10); }

export function getNotes(){ return loadJSON(STORAGE.NOTES, {}); }
export function getNote(date, drillId){ const notes = getNotes(); return notes[`${date}__${drillId}`] || ''; }
export function saveNote(date, drillId, text){ const notes = getNotes(); notes[`${date}__${drillId}`] = text; saveJSON(STORAGE.NOTES, notes); }

export function getShots(){ const s = loadJSON(STORAGE.SHOTS, []); return Array.isArray(s) ? s : []; }
export function saveShots(shots){ saveJSON(STORAGE.SHOTS, shots); }
export function addShot(shot){ const shots = getShots(); shots.push(shot); saveShots(shots); }
export function deleteShotById(id){ const shots = getShots(); const next = shots.filter(x=>x.id!==id); saveShots(next); return shots.length !== next.length; }

export function getUserClubs(defaultClubs){ const v = loadJSON(STORAGE.CLUBS, null); return (Array.isArray(v) && v.length) ? v : defaultClubs; }
export function setUserClubs(clubs){ saveJSON(STORAGE.CLUBS, clubs); }
export function getUserDrills(defaultDrills){ const v = loadJSON(STORAGE.DRILLS, null); return (Array.isArray(v) && v.length) ? v : defaultDrills; }
export function setUserDrills(drills){ saveJSON(STORAGE.DRILLS, drills); }
