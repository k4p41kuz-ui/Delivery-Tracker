const KEY='deliveryMileageTrackerV1';
let data=JSON.parse(localStorage.getItem(KEY)||'{"records":[],"activeTrip":null}');

const $=id=>document.getElementById(id);
const save=()=>{localStorage.setItem(KEY,JSON.stringify(data));render()};
const now=()=>new Date().toISOString();
const fmtDate=s=>new Date(s).toLocaleString([], {dateStyle:'medium',timeStyle:'short'});
const km=n=>Number(n||0).toFixed(1);

function render(){
  const active=!!data.activeTrip;
  $('startTrip').disabled=active;
  $('finishTrip').disabled=!active;
  $('startOdo').disabled=active;
  $('endOdo').disabled=!active;
  $('tripStatus').textContent=active ? `Trip started ${fmtDate(data.activeTrip.startedAt)}` : 'No trip running';

  const today=new Date(); today.setHours(0,0,0,0);
  const week=new Date(today); week.setDate(today.getDate()-today.getDay());
  let todayKm=0, weekKm=0, deliveries=0;
  for(const r of data.records){
    const d=new Date(r.date);
    if(r.type==='trip'){
      if(d>=today) todayKm+=r.km;
      if(d>=week) weekKm+=r.km;
    } else if(r.type==='delivery') {
      deliveries++;
      if(d>=today) todayKm+=r.km;
      if(d>=week) weekKm+=r.km;
    }
  }
  $('todayKm').textContent=km(todayKm);
  $('weekKm').textContent=km(weekKm);
  $('deliveryCount').textContent=deliveries;

  const items=[...data.records].reverse();
  $('history').innerHTML=items.length ? items.map(r=>{
    if(r.type==='trip') return `<div class="history-item"><strong>🚗 Trip — ${km(r.km)} km</strong><div class="muted">${fmtDate(r.date)} · Odometer ${km(r.startOdo)} → ${km(r.endOdo)}</div></div>`;
    return `<div class="history-item"><strong>📦 ${escapeHtml(r.name||'Delivery')}</strong><div class="muted">${fmtDate(r.date)} · ${km(r.km)} km${r.notes?' · '+escapeHtml(r.notes):''}</div></div>`;
  }).join('') : '<div class="empty">No records yet.</div>';
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}

$('startTrip').onclick=()=>{
  const odo=Number($('startOdo').value);
  if(!Number.isFinite(odo)||odo<0) return alert('Enter a valid starting odometer reading.');
  data.activeTrip={startOdo:odo,startedAt:now()};
  $('tripResult').textContent='Trip started.';
  save();
};
$('finishTrip').onclick=()=>{
  const end=Number($('endOdo').value);
  if(!Number.isFinite(end)||end<0) return alert('Enter a valid ending odometer reading.');
  if(end<data.activeTrip.startOdo) return alert('Ending odometer cannot be lower than starting odometer.');
  data.records.push({type:'trip',date:now(),startOdo:data.activeTrip.startOdo,endOdo:end,km:end-data.activeTrip.startOdo});
  data.activeTrip=null;
  $('startOdo').value=''; $('endOdo').value='';
  $('tripResult').textContent='Trip saved.';
  save();
};
$('addDelivery').onclick=()=>{
  const name=$('deliveryName').value.trim();
  const distance=Number($('deliveryKm').value||0);
  if(!name) return alert('Enter a delivery or order number.');
  if(!Number.isFinite(distance)||distance<0) return alert('Enter a valid distance.');
  data.records.push({type:'delivery',date:now(),name,km:distance,notes:$('deliveryNotes').value.trim()});
  $('deliveryName').value=''; $('deliveryKm').value=''; $('deliveryNotes').value='';
  save();
};
$('clearAll').onclick=()=>{
  if(confirm('Delete all saved records?')){data={records:[],activeTrip:null};save();}
};
render();
