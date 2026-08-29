/* BASE BLOCKS - Incremental Clicker */

const GENERATORS = [
  { id:'worker', name:'Brick Layer', icon:'worker', desc:'Lays bricks by hand. Honest work.', baseCost:12, bps:0.8, costMult:1.16 },
  { id:'miner', name:'Auto Miner', icon:'miner', desc:'Digs blocks automatically.', baseCost:90, bps:5, costMult:1.16 },
  { id:'factory', name:'Block Factory', icon:'factory', desc:'Assembly line of blocks.', baseCost:450, bps:22, costMult:1.17 },
  { id:'quarry', name:'Deep Quarry', icon:'quarry', desc:'Excavates massive chunks.', baseCost:2600, bps:110, costMult:1.18 },
  { id:'printer', name:'3D Printer', icon:'printer', desc:'Prints blocks layer by layer.', baseCost:13500, bps:620, costMult:1.19 },
  { id:'quantum', name:'Quantum Lab', icon:'quantum', desc:'Entangles blocks into existence.', baseCost:82000, bps:3400, costMult:1.20 },
  { id:'forge', name:'Singularity Forge', icon:'forge', desc:'Forges blocks from spacetime.', baseCost:580000, bps:21000, costMult:1.21 },
];

/* Custom icon set — hand-built SVG (24x24), tinted per section via currentColor.
   Style: consistent line weight, construction/block themed. No emoji. */
const ICONS = {
  worker: '<rect x="3" y="6" width="8" height="4" rx="1"/><rect x="13" y="6" width="8" height="4" rx="1"/><rect x="3" y="12" width="8" height="4" rx="1"/><rect x="13" y="12" width="8" height="4" rx="1"/><rect x="7" y="18" width="8" height="4" rx="1"/>',
  miner: '<path d="M4 20 L13 11"/><path d="M13 11 a7 6 0 0 1 8 -3"/><path d="M13 11 a7 6 0 0 1 -2 8"/>',
  factory: '<path d="M4 21 V11 L9 8 V11 L14 8 V11 L19 8 V21 Z"/><rect x="7" y="14" width="3" height="3"/><rect x="12" y="14" width="3" height="3"/>',
  quarry: '<path d="M3 18 L9 8 L13 14 L16 9 L21 18 Z"/><path d="M12 11 L13.5 14 L11 16"/>',
  printer: '<rect x="5" y="9" width="14" height="9" rx="1.5"/><path d="M9 9 V6 h6 v3"/><rect x="9" y="14" width="6" height="4" fill="currentColor" opacity="0.35"/>',
  quantum: '<circle cx="12" cy="12" r="2" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
  forge: '<circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="12" r="5.5" opacity="0.5"/><circle cx="12" cy="12" r="9" opacity="0.28"/>',
  glove: '<path d="M7 11 V7.5 a1.4 1.4 0 0 1 2.8 0 V7 a1.4 1.4 0 0 1 2.8 0 V7 a1.4 1.4 0 0 1 2.8 0 V11"/><path d="M7 11 V15 a2 2 0 0 0 2 2 h5 a2 2 0 0 0 2 -2 V11"/>',
  hammer: '<path d="M14.5 4.5 L19.5 9.5 L16.5 12.5 L11.5 7.5 Z"/><path d="M11 7 L4 14"/>',
  jackhammer: '<path d="M9.5 3 h5 v4 l-1.5 1.5 h-2 L11 7 Z"/><line x1="12" y1="10.5" x2="12" y2="17"/><path d="M8.5 17 h7 l-1 3.5 h-5 Z"/><line x1="12" y1="20.5" x2="12" y2="22"/>',
  drill: '<rect x="9" y="3" width="6" height="6" rx="1"/><path d="M10.5 9 L12 17 L13.5 9 Z"/><line x1="9" y1="15" x2="15" y2="15"/>',
  fist: '<path d="M12 3 C13 9 15 11 21 12 C15 13 13 15 12 21 C11 15 9 13 3 12 C9 11 11 9 12 3 Z"/>',
  clover: '<circle cx="12" cy="9" r="2.4"/><circle cx="9" cy="12" r="2.4"/><circle cx="15" cy="12" r="2.4"/><circle cx="12" cy="15" r="2.4"/><line x1="12" y1="15" x2="12" y2="20"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.2"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
  ruler: '<path d="M4 19 L4 8 L19 19 Z"/><line x1="4" y1="13.5" x2="9.5" y2="19"/>',
  bolt: '<path d="M13 3 L6 13 H11 L10 21 L18 10 H12 Z"/>',
  gauge: '<path d="M4 18 a8 8 0 0 1 16 0"/><line x1="12" y1="18" x2="16" y2="12"/><circle cx="12" cy="18" r="1.4" fill="currentColor"/>',
  arm: '<rect x="4" y="19" width="5" height="2" rx="0.5"/><path d="M6.5 19 V11"/><path d="M6.5 11 L16 8"/><path d="M16 8 v-3 l-2 1 M16 8 v-3 l2 1"/>',
  lens: '<circle cx="10" cy="10" r="5"/><line x1="14" y1="14" x2="19" y2="19"/>',
  hand: '<path d="M8 11 V6.5 a1.4 1.4 0 0 1 2.8 0 V6 a1.4 1.4 0 0 1 2.8 0 V6 a1.4 1.4 0 0 1 2.8 0 V12"/><path d="M8 11 V15 a2 2 0 0 0 2 2 h5 a2 2 0 0 0 2 -2 V11"/>',
  gear: '<circle cx="12" cy="12" r="3.6"/><path d="M12 3.5 v3 M12 17.5 v3 M3.5 12 h3 M17.5 12 h3 M6 6 l2 2 M16 16 l2 2 M18 6 l-2 2 M8 16 l-2 2"/>',
  box: '<path d="M4 8 L12 4 L20 8 V16 L12 20 L4 16 Z"/><path d="M4 8 L12 12 L20 8"/><path d="M12 12 V20"/>',
  sparkle: '<path d="M12 3 C13 9 15 11 21 12 C15 13 13 15 12 21 C11 15 9 13 3 12 C9 11 11 9 12 3 Z"/>',
  trophy: '<path d="M6 5 H18 L17 12 H7 Z"/><path d="M6 7 H4 a4 4 0 0 0 4 6"/><path d="M18 7 H20 a4 4 0 0 1 -4 6"/><path d="M9 21 H15"/><path d="M12 13 V21"/>',
};
function iconSvg(key){
  const inner = ICONS[key];
  if(!inner) return '';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

const CLICK_UPGRADES = [
  { id:'click1', name:'Reinforced Gloves', icon:'glove', desc:'+1 per click', baseCost:50, costScale:1.65, value:1, max:100 },
  { id:'click2', name:'Steel Hammer', icon:'hammer', desc:'+4 per click', baseCost:300, costScale:1.70, value:4, max:80 },
  { id:'click3', name:'Jackhammer', icon:'jackhammer', desc:'+10 per click', baseCost:1800, costScale:1.75, value:10, max:60 },
  { id:'click4', name:'Plasma Drill', icon:'drill', desc:'+45 per click', baseCost:11000, costScale:1.80, value:45, max:40 },
  { id:'click5', name:'Graviton Fist', icon:'fist', desc:'+180 per click', baseCost:75000, costScale:1.85, value:180, max:30 },
];

const UPGRADES = [
  { id:'crit1', name:'Lucky Strike', icon:'clover', desc:'5% crit chance (x5)', cost:900, type:'critChance', value:0.05, req:0 },
  { id:'crit2', name:'Critical Mastery', icon:'target', desc:'+10% crit chance, crit x7', cost:14000, type:'critMult', value:7, req:5 },
  { id:'mult1', name:'Efficient Blueprints', icon:'ruler', desc:'All production x1.5', cost:3800, type:'globalMult', value:1.5, req:0 },
  { id:'mult2', name:'Industrial Overclock', icon:'bolt', desc:'All production x2', cost:28000, type:'globalMult', value:2, req:7 },
  { id:'mult3', name:'Quantum Efficiency', icon:'gauge', desc:'All production x2.5', cost:180000, type:'globalMult', value:2.5, req:8 },
  { id:'autoClick', name:'Auto-Clicker Arm', icon:'arm', desc:'Gain 15% of BPS on each click', cost:6500, type:'autoClickPct', value:0.15, req:0 },
  { id:'golden', name:'Golden Detector', icon:'lens', desc:'Golden Blocks appear more often (2x) & last longer', cost:4500, type:'goldenBoost', value:2, req:0 },
];

const BLUEPRINT_SHOP = [
  { id:'bpClick', name:'Blueprint Hands', icon:'hand', desc:'+2 base click per level', cost:1, costScale:1.65, type:'bpClick', value:2, max:25 },
  { id:'bpBps', name:'Blueprint Engine', icon:'gear', desc:'+10% BPS per level', cost:2, costScale:1.75, type:'bpBpsMult', value:0.10, max:20 },
  { id:'bpDiscount', name:'Supply Chain', icon:'box', desc:'-3% building cost per level', cost:3, costScale:1.85, type:'bpDiscount', value:0.03, max:15 },
  { id:'bpGolden', name:'Golden Fortune', icon:'sparkle', desc:'+25% Golden Block reward', cost:5, costScale:2.05, type:'bpGolden', value:0.25, max:10 },
];

const ACHIEVEMENTS = [
  { id:'firstClick', name:'First Block', desc:'Click the block once', icon:'hand', check:()=>state.clicks>=1 },
  { id:'hundredClicks', name:'Click Frenzy', desc:'Reach 100 clicks', icon:'bolt', check:()=>state.clicks>=100 },
  { id:'thousandClicks', name:'Click Storm', desc:'Reach 1,000 clicks', icon:'fist', check:()=>state.clicks>=1000 },
  { id:'kBlocks', name:'Stacked', desc:'Own 1,000 blocks at once', icon:'box', check:()=>state.blocks>=1000 },
  { id:'tenK', name:'Hoarder', desc:'Stack 10,000 total blocks', icon:'box', check:()=>state.totalEver>=10000 },
  { id:'hundredK', name:'Magnate', desc:'Stack 100,000 total blocks', icon:'factory', check:()=>state.totalEver>=100000 },
  { id:'million', name:'Millionaire', desc:'Stack 1,000,000 total blocks', icon:'forge', check:()=>state.totalEver>=1000000 },
  { id:'tenBuildings', name:'Builder', desc:'Own 10 generators', icon:'gear', check:()=>Object.values(state.generators).reduce((a,b)=>a+b,0)>=10 },
  { id:'fiftyBuildings', name:'Industrialist', desc:'Own 50 generators', icon:'gear', check:()=>Object.values(state.generators).reduce((a,b)=>a+b,0)>=50 },
  { id:'tenBps', name:'Automation', desc:'Reach 10 BPS', icon:'gauge', check:()=>bps>=10 },
  { id:'hundredBps', name:'Overdrive', desc:'Reach 100 BPS', icon:'gauge', check:()=>bps>=100 },
  { id:'thousandBps', name:'Mega Factory', desc:'Reach 1,000 BPS', icon:'gauge', check:()=>bps>=1000 },
  { id:'firstBP', name:'Blueprint Novice', desc:'Gain your first Blueprint', icon:'sparkle', check:()=>state.blueprints>=1 },
  { id:'fiveBP', name:'Architect', desc:'Gain 5 Blueprints', icon:'trophy', check:()=>state.blueprints>=5 },
  { id:'golden', name:'Golden Hunter', desc:'Catch a Golden Block', icon:'lens', check:()=>(state.stats?.goldenCaught||0)>=1 },
  { id:'golden5', name:'Treasure Seeker', desc:'Catch 5 Golden Blocks', icon:'sparkle', check:()=>(state.stats?.goldenCaught||0)>=5 },
  { id:'play10', name:'Dedicated', desc:'Play for 10 minutes', icon:'worker', check:()=>state.playTime>=600 },
  { id:'crit', name:'Lucky Hit', desc:'Land a critical click', icon:'clover', check:()=>(state.stats?.crits||0)>=1 },
];

const SAVE_KEY = 'baseblocks_save_v2';
const PRESTIGE_REQUIREMENT = 18000;
const PRESTIGE_MULT_PER_BP = 0.12; // 12% per blueprint (was 15%)

function formatNum(n, compact=true){
  if(!compact){
    return Math.floor(n).toLocaleString();
  }
  if(n < 1000) return Math.floor(n).toString();
  const units=['K','M','B','T','Qa','Qi'];
  let unitIndex=-1;
  let num=n;
  while(num >= 1000 && unitIndex < units.length-1){
    num/=1000;
    unitIndex++;
  }
  if(unitIndex==-1) return Math.floor(n).toString();
  let fixed = num >= 100 ? Math.floor(num).toString() : num >= 10 ? num.toFixed(1) : num.toFixed(2);
  // trim trailing zeros
  fixed = fixed.replace(/\.0+$/,'').replace(/(\.\d*[1-9])0+$/,'$1');
  return fixed + units[unitIndex];
}
function formatPrecise(n){
  if(n>=1) return formatNum(n,true);
  return n.toFixed(2);
}

const defaultState = () => ({
  blocks:0,
  totalEver:0,
  totalClicks:0,
  clicks:0,
  blueprints:0,
  prestigeCount:0,
  playTime:0,
  generators:{},
  upgrades:{},
  clickUpgradeLevels:{},
  blueprintLevels:{},
  achievementsUnlocked:[],
  stats:{ goldenCaught:0, crits:0 },
  settings:{ particles:true, shake:true, compact:true },
  lastSave:Date.now(),
  goldenBoostOwned:false,
  critMultOwned:false,
});

let state = defaultState();
let bps = 0;
let clickPower = 1;
let globalMult = 1;
let critChance = 0;
let critMult = 5;
let autoClickPct = 0;
let discount = 0;
let bpClickBonus = 0;
let bpBpsMult = 1;

let tickInterval=null;
let playTimeInterval=null;
let goldenTimer=null;
let goldenTimeout=null;

// DOM
const elBlocks=document.getElementById('blocks-display');
const elBps=document.getElementById('bps-display');
const elClickPower=document.getElementById('click-power-display');
const elTotalEver=document.getElementById('total-ever');
const elPlayTime=document.getElementById('playtime');
const elStatClicks=document.getElementById('stat-clicks');
const elStatBuilt=document.getElementById('stat-built');
const elStatBlueprints=document.getElementById('stat-blueprints');
const elPrestigeBadge=document.getElementById('prestige-mult-display');
const elPrestigeBanner=document.getElementById('prestige-banner');
const elPrestigePreview=document.getElementById('prestige-preview');
const elPrestigeBonusPreview=document.getElementById('prestige-bonus-preview');
const elPrestigeBtn=document.getElementById('prestige-btn');
const bigBlock=document.getElementById('big-block');
const blockStage=document.getElementById('block-stage');
const clickFxLayer=document.getElementById('click-fx-layer');
const crackLayer=document.getElementById('crack-layer');
const goldenBlock=document.getElementById('golden-block');
const genList=document.getElementById('generators-list');
const clickList=document.getElementById('click-upgrades-list');
const upgList=document.getElementById('upgrades-list');
const bpShopDiv=document.getElementById('blueprint-shop');
const achGrid=document.getElementById('achievements-grid');
const achCount=document.getElementById('ach-count');
const achFill=document.getElementById('ach-progress-fill');
const achText=document.getElementById('ach-progress-text');
const toastStack=document.getElementById('toast-stack');

function load(){
  try{
    const raw=localStorage.getItem(SAVE_KEY);
    if(!raw) { state=defaultState(); return; }
    const parsed=JSON.parse(raw);
    state={...defaultState(), ...parsed};
    // ensure nested objects
    state.generators = parsed.generators || {};
    state.upgrades = parsed.upgrades || {};
    state.clickUpgradeLevels = parsed.clickUpgradeLevels || {};
    state.blueprintLevels = parsed.blueprintLevels || {};
    state.settings = {...defaultState().settings, ...(parsed.settings||{})};
    state.achievementsUnlocked = Array.isArray(parsed.achievementsUnlocked) ? parsed.achievementsUnlocked : [];
    state.stats = { ...defaultState().stats, ...(parsed.stats||{}) };
    // migrate old one-time click upgrades (from UPGRADES) to new multi-buy levels
    for(const cu of CLICK_UPGRADES){
      if(parsed.upgrades && parsed.upgrades[cu.id]){
        if(!state.clickUpgradeLevels[cu.id]) state.clickUpgradeLevels[cu.id]=1;
        delete state.upgrades[cu.id];
      }
    }
    // offline progress
    const now=Date.now();
    const dt = Math.min((now - (state.lastSave||now))/1000, 24*3600);
    if(dt>5){
      recalc();
      const offlineGain = bps * dt;
      if(offlineGain>10){
        state.blocks += offlineGain;
        state.totalEver += offlineGain;
        setTimeout(()=>toast(`Welcome back! Earned ${formatNum(offlineGain)} blocks while away (${Math.floor(dt/60)}m ${Math.floor(dt%60)}s)`), 600);
      }
    }
  }catch(e){
    console.error('load fail',e);
    state=defaultState();
  }
}
function save(){
  state.lastSave=Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}
function recalc(){
  // global mult
  globalMult=1;
  let flatClick=1;
  critChance=0;
  critMult=5;
  autoClickPct=0;
  let goldenBoost=1;
  // click upgrades (multi-buy) — now grouped with CPS generators
  for(const cu of CLICK_UPGRADES){
    const lvl = state.clickUpgradeLevels[cu.id]||0;
    flatClick += lvl * cu.value;
  }
  // other upgrades (one-time)
  for(const u of UPGRADES){
    if(!state.upgrades[u.id]) continue;
    if(u.type==='globalMult') globalMult*=u.value;
    else if(u.type==='critChance') critChance+=u.value;
    else if(u.type==='critMult') critMult=u.value;
    else if(u.type==='autoClickPct') autoClickPct+=u.value;
    else if(u.type==='goldenBoost') goldenBoost*=u.value;
  }
  // blueprint shop
  bpClickBonus=0;
  bpBpsMult=1;
  discount=0;
  let goldenBpMult=1;
  for(const b of BLUEPRINT_SHOP){
    const lvl=state.blueprintLevels[b.id]||0;
    if(b.type==='bpClick') bpClickBonus+= b.value*lvl;
    else if(b.type==='bpBpsMult') bpBpsMult+= b.value*lvl;
    else if(b.type==='bpDiscount') discount+= b.value*lvl;
    else if(b.type==='bpGolden') goldenBpMult+= b.value*lvl;
  }
  discount=Math.min(discount,0.6);
  clickPower = (flatClick + bpClickBonus) * (state.blueprints>0?1:1); // click not directly mult? but apply? Let's include small?
  // prestige multiplier — balanced to 12% per BP (down from 15%)
  const prestigeMult = 1 + state.blueprints * PRESTIGE_MULT_PER_BP;
  globalMult *= prestigeMult * bpBpsMult;
  // cap crit
  critChance = Math.min(critChance,0.45);
  // bps
  bps=0;
  for(const g of GENERATORS){
    const owned=state.generators[g.id]||0;
    bps+= owned * g.bps;
  }
  bps *= globalMult;
  // store for UI
  state._prestigeMult = prestigeMult;
  state._goldenMult = goldenBoost * goldenBpMult;
  state._critChance = critChance;
  state._critMult = critMult;
  state._flatClick = flatClick;
}

function getGenCost(g){
  const owned=state.generators[g.id]||0;
  let cost = g.baseCost * Math.pow(g.costMult, owned);
  cost *= (1 - discount);
  return Math.ceil(cost);
}
function getClickUpgradeCost(cu){
  const lvl = state.clickUpgradeLevels[cu.id]||0;
  let cost = cu.baseCost * Math.pow(cu.costScale, lvl);
  cost *= (1 - discount);
  return Math.ceil(cost);
}
function getBpsForGen(g){
  return g.bps * (state._prestigeMult||1) * bpBpsMult * (getGlobalMultWithoutPrestige?1:1);
  // actually globalMult already includes prestige+bps; simpler: g.bps * globalMult portion?
  // We already calc globalMult includes those, so per gen contribution = g.bps * globalMult? But we want accurate.
}
function getGlobalMultWithoutPrestige(){
  let m=1;
  for(const u of UPGRADES) if(state.upgrades[u.id] && u.type==='globalMult') m*=u.value;
  m*=bpBpsMult;
  return m;
}

function getPotentialBlueprints(){
  const total = state.totalEver;
  if(total < PRESTIGE_REQUIREMENT) return 0;
  // Balanced: easier early prestige — 18k =>1, 72k=>2, 162k=>3, 288k=>4
  // sqrt(total/18000)
  return Math.floor(Math.sqrt(total / PRESTIGE_REQUIREMENT));
}
function getBlueprintsOnReset(){
  const totalPotential = getPotentialBlueprints();
  const gain = totalPotential - state.blueprints;
  return gain>0?gain:0;
}

function updateUI(){
  const compact = state.settings.compact;
  elBlocks.textContent = formatNum(state.blocks, compact);
  elBps.textContent = `${formatNum(bps, compact)} blocks / sec`;
  // click power display includes crit expectation?
  let cpText = `${formatNum(getClickPowerBase(), compact)} per click`;
  if(critChance>0) cpText += ` • ${(critChance*100).toFixed(0)}% crit x${critMult}`;
  if(autoClickPct>0) cpText += ` • +${Math.floor(autoClickPct*100)}% BPS`;
  elClickPower.textContent = cpText;
  elTotalEver.textContent = formatNum(state.totalEver, compact);
  const mins=Math.floor(state.playTime/60), secs=Math.floor(state.playTime%60);
  elPlayTime.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  elStatClicks.textContent = formatNum(state.clicks, compact);
  const totalBuilt = Object.values(state.generators).reduce((a,b)=>a+b,0);
  elStatBuilt.textContent = formatNum(totalBuilt, compact);
  elStatBlueprints.textContent = formatNum(state.blueprints, compact);
  elPrestigeBadge.textContent = `x${(state._prestigeMult||1).toFixed(2)}`;
  // prestige banner — now 12% per BP
  const gain = getBlueprintsOnReset();
  if(gain>0){
    elPrestigeBanner.classList.remove('hidden');
    elPrestigePreview.textContent = gain;
    elPrestigeBonusPreview.textContent = Math.round(gain * PRESTIGE_MULT_PER_BP * 100)+'%';
  }else{
    elPrestigeBanner.classList.add('hidden');
  }
  // prestige pane stats
  document.getElementById('p-blue-current').textContent = state.blueprints;
  document.getElementById('p-mult').textContent = `x${(state._prestigeMult||1).toFixed(2)}`;
  document.getElementById('p-on-reset').textContent = `+${gain}`;
  // Reinforce progress meter — "what am I working toward?"
  const gm=document.getElementById('goal-meter');
  const gf=document.getElementById('goal-fill');
  const gp=document.getElementById('goal-pct');
  const tier=getPotentialBlueprints();
  let goalPct;
  if(gain>0){
    goalPct=100;
    gm.classList.add('ready');
    gp.textContent='READY';
  }else{
    gm.classList.remove('ready');
    const tierLow=PRESTIGE_REQUIREMENT*tier*tier;
    const tierHigh=PRESTIGE_REQUIREMENT*(tier+1)*(tier+1);
    goalPct=Math.max(0,Math.min(100,((state.totalEver-tierLow)/(tierHigh-tierLow))*100));
    gp.textContent=Math.floor(goalPct)+'%';
  }
  gf.style.width=goalPct+'%';

  const reqEl=document.getElementById('prestige-req');
  const bigBtn=document.getElementById('prestige-big-btn');
  if(gain>0){
    bigBtn.disabled=false;
    reqEl.textContent=`Gain ${gain} Blueprint${gain>1?'s':''} +${Math.round(gain * PRESTIGE_MULT_PER_BP * 100)}% permanent production`;
    reqEl.style.color='var(--green)';
  }else{
    bigBtn.disabled=true;
    const need = PRESTIGE_REQUIREMENT - state.totalEver;
    if(need>0) reqEl.textContent=`Need ${formatNum(need,compact)} more lifetime blocks`;
    else reqEl.textContent=`Need ${formatNum(PRESTIGE_REQUIREMENT,compact)} lifetime blocks (you have ${formatNum(state.totalEver,compact)})`;
    reqEl.style.color='';
  }

  // shop highlights will be updated via renderShop? But we can do inline price color
  updateShopAffordability();

  // achievements header progress (light, no full re-render)
  if(achCount && achFill && achText){
    const total = ACHIEVEMENTS.length;
    const unlockedCount = state.achievementsUnlocked.length;
    achCount.textContent = `${unlockedCount} / ${total}`;
    const pct = total ? Math.round(unlockedCount/total*100) : 0;
    achFill.style.width = pct + '%';
    achText.textContent = pct + '%';
  }
  // also check for new unlocks periodically (throttled elsewhere)
  // we run a lightweight check every UI update — cheap (18 checks)
  // but only toast/save on new unlocks inside checkAchievements
  if(Math.random() < 0.08) checkAchievements();
}

function getClickPowerBase(){
  let base = state._flatClick + bpClickBonus;
  // add auto click pct portion? That's added at click time based on bps
  return base;
}
function getClickGain(){
  let base = getClickPowerBase();
  // auto click pct: 15% of bps added to click
  let extra = autoClickPct>0 ? bps * autoClickPct : 0;
  let gain = base + extra;
  gain *= state._prestigeMult ? 1 : 1; // click not multiplied? Let's also apply prestige? For feel, prestige should boost click too
  // Let's apply prestige + global mult partially? For incremental feel, click should scale with prestige & bps mult
  // We'll apply prestigeMult and bpBpsMult partially to clicks to avoid too OP? Use 0.5? But simpler apply same prestige
  gain *= (state._prestigeMult||1) * (bpBpsMult>1? Math.pow(bpBpsMult,0.6):1);
  // global mult upgrades also boost click? let's include globalMultUpgrades part
  let globalUpMult=1;
  for(const u of UPGRADES) if(state.upgrades[u.id] && u.type==='globalMult') globalUpMult*=Math.pow(u.value,0.5);
  gain *= globalUpMult;
  // crit
  let isCrit=false;
  if(Math.random() < critChance){
    gain *= critMult;
    isCrit=true;
  }
  return {gain, isCrit};
}

function renderGenerators(){
  genList.innerHTML='';
  GENERATORS.forEach(g=>{
    const owned=state.generators[g.id]||0;
    const cost=getGenCost(g);
    const affordable=state.blocks>=cost;
    const card=document.createElement('div');
    card.className='shop-card'+(affordable?' affordable':'')+(state.blocks < cost*0.2?' disabled':'');
    card.innerHTML=`
      <div class="shop-icon gen">${iconSvg(g.icon)}</div>
      <div class="shop-info">
        <div class="shop-name">${g.name} <span class="shop-owned">x${owned}</span></div>
        <div class="shop-desc">${g.desc}</div>
        <div class="shop-meta">
          <span class="bps">+${formatNum(g.bps * globalMult, true)}/s each</span>
          <span class="mono" style="color:var(--dim)">total: ${formatNum(owned*g.bps*globalMult,true)}/s</span>
        </div>
      </div>
      <div class="shop-buy">
        <div class="price ${affordable?'affordable':'expensive'}"><span class="cube-mini"></span> ${formatNum(cost,true)}</div>
        <button class="buy-btn ${affordable?'primary':''}" data-buy-gen="${g.id}" ${''}>BUY</button>
      </div>
    `;
    genList.appendChild(card);
  });
}
function renderClickUpgrades(){
  if(!clickList) return;
  clickList.innerHTML='';
  CLICK_UPGRADES.forEach(cu=>{
    const lvl = state.clickUpgradeLevels[cu.id]||0;
    const maxed = lvl >= cu.max;
    const cost = getClickUpgradeCost(cu);
    const affordable = state.blocks >= cost && !maxed;
    const totalBonus = lvl * cu.value;
    const card=document.createElement('div');
    card.className='shop-card'+(affordable?' affordable':'')+(maxed?'':'')+(state.blocks < cost*0.2 && !maxed ?' disabled':'');
    if(maxed) card.style.opacity='.6';
    card.innerHTML=`
      <div class="shop-icon upg" style="background:linear-gradient(135deg, rgba(255,158,44,.16), rgba(240,116,27,.12));border-color:rgba(255,158,44,.30)">${iconSvg(cu.icon)}</div>
      <div class="shop-info">
        <div class="shop-name">${cu.name} <span class="shop-owned">x${lvl}</span> ${maxed?'<span class="stamp">MAX</span>':''}</div>
        <div class="shop-desc">${cu.desc} <span style="color:var(--muted)">(total +${formatNum(totalBonus,true)})</span></div>
        <div class="shop-meta">
          <span class="mult">+${cu.value}/click each</span>
          <span class="mono" style="color:var(--dim)">${lvl}/${cu.max} owned</span>
        </div>
      </div>
      <div class="shop-buy">
        <div class="price ${maxed?'expensive':affordable?'affordable':'expensive'}"><span class="cube-mini"></span> ${maxed?'MAX':formatNum(cost,true)}</div>
        <button class="buy-btn ${affordable?'primary':''}" data-buy-click="${cu.id}" ${maxed?'disabled':''}>${maxed?'MAXED':'BUY'}</button>
      </div>
    `;
    clickList.appendChild(card);
  });
}
function renderUpgrades(){
  upgList.innerHTML='';
  let anyAvailable=false;
  UPGRADES.forEach(u=>{
    const owned=!!state.upgrades[u.id];
    if(owned){
      const card=document.createElement('div');
      card.className='shop-card';
      card.style.opacity='.6';
      card.innerHTML=`
          <div class="shop-icon upg" style="background:linear-gradient(135deg, rgba(46,232,158,.2), rgba(46,232,158,.08));border-color:rgba(46,232,158,.3)">${iconSvg(u.icon)}</div>
          <div class="shop-info">
            <div class="shop-name">${u.name} <span class="stamp">INSTALLED</span></div>
            <div class="shop-desc">${u.desc}</div>
          </div>
          <div class="shop-buy"><div class="stamp">PURCHASED</div></div>
      `;
      upgList.appendChild(card);
      return;
    }
    // check req? req is index reference? For simplicity hide locked? Show locked but disabled
    // Let's hide until prerequisites? We'll check using req value as not yet but we'll just show all
    const affordable=state.blocks>=u.cost;
    const card=document.createElement('div');
    card.className='shop-card'+(affordable?' affordable':'');
    card.innerHTML=`
      <div class="shop-icon upg">${iconSvg(u.icon)}</div>
      <div class="shop-info">
        <div class="shop-name">${u.name}</div>
        <div class="shop-desc">${u.desc}</div>
      </div>
      <div class="shop-buy">
        <div class="price ${affordable?'affordable':'expensive'}"><span class="cube-mini"></span> ${formatNum(u.cost,true)}</div>
        <button class="buy-btn ${affordable?'green':''}" data-buy-upg="${u.id}">BUY</button>
      </div>
    `;
    upgList.appendChild(card);
    anyAvailable=true;
  });
  if(!anyAvailable && upgList.children.length>0){
    // all bought? show message
    const msg=document.createElement('div');
    msg.style.cssText='text-align:center;padding:20px;color:var(--muted);font-size:.85rem';
    msg.textContent='All upgrades purchased! More coming soon...';
    upgList.appendChild(msg);
  }
}
function renderBlueprintShop(){
  bpShopDiv.innerHTML='';
  BLUEPRINT_SHOP.forEach(b=>{
    const lvl=state.blueprintLevels[b.id]||0;
    const maxed = lvl>=b.max;
    const cost = Math.ceil(b.cost * Math.pow(b.costScale, lvl));
    const canAfford = state.blueprints>=cost;
    const card=document.createElement('div');
    card.className='blueprint-card';
    card.style.opacity=maxed?'.6':'1';
    card.innerHTML=`
      <div class="b-icon">${iconSvg(b.icon)}</div>
      <div>
        <h5>${b.name} <span class="shop-owned" style="font-size:.65rem">Lv ${lvl}/${b.max}</span></h5>
        <p>${b.desc} <b style="color:var(--muted)">(${maxed?'MAX':'+'+b.value+(b.type.includes('Mult')?'×':'')+' / lvl'})</b></p>
      </div>
      <div style="text-align:right;min-width:90px">
        <div style="font-family:'JetBrains Mono',monospace;font-weight:800;font-size:.85rem;color:${canAfford?'#a8c8ff':'var(--muted)'}">${maxed?'MAX':cost+' ◆'}</div>
        <button class="buy-btn ${canAfford && !maxed?'primary':''}" style="margin-top:4px;padding:6px 10px;font-size:.68rem" data-buy-bp="${b.id}" ${maxed?'disabled':''}>${maxed?'MAXED':canAfford?'BUY':'NEED ◆'}</button>
      </div>
    `;
    bpShopDiv.appendChild(card);
  });
}

function renderAllShops(){
  renderClickUpgrades();
  renderGenerators();
  renderUpgrades();
  renderBlueprintShop();
}

function updateShopAffordability(){
  // quick update without re-rendering all: just update prices/colors? For simplicity re-render if needed every sec? We'll just update button states
  // We'll update every tick via class toggle; but easiest is to re-render generators every 1s or on block change threshold? For performance, just update price colors via DOM
  // For now, if blocks changed significantly, re-render every 500ms? We'll just call renderAllShops throttled
}

let lastRender=0;
function throttledRender(){
  const now=performance.now();
  if(now-lastRender>400){
    renderAllShops();
    lastRender=now;
  }
}

// Click handling
let lastClick=0;
bigBlock.addEventListener('click', (e)=>{
  e.preventDefault();
  const now=Date.now();
  // prevent double fire on touch?
  if(now-lastClick<40) return;
  lastClick=now;
  doClick(e);
});
bigBlock.addEventListener('touchstart', (e)=>{
  e.preventDefault();
  doClick(e.touches[0]);
}, {passive:false});

function doClick(e){
  const {gain, isCrit} = getClickGain();
  state.blocks += gain;
  state.totalEver += gain;
  state.clicks++;
  state.totalClicks++;
  if(isCrit){
    state.stats.crits = (state.stats.crits||0) + 1;
  }

  // visual
  bigBlock.classList.remove('popping');
  void bigBlock.offsetWidth;
  bigBlock.classList.add('popping');
  if(state.settings.shake && isCrit){
    blockStage.classList.remove('shake');
    void blockStage.offsetWidth;
    blockStage.classList.add('shake');
    setTimeout(()=>blockStage.classList.remove('shake'),400);
  }
  // crack flash
  crackLayer.classList.add('show');
  setTimeout(()=>crackLayer.classList.remove('show'),120);
  // shadow scale
  const shadow=document.querySelector('.block-shadow');
  shadow.style.transform='scaleX(0.86)';
  setTimeout(()=>shadow.style.transform='',120);

  // floater
  if(state.settings.particles){
    spawnFloater(gain, isCrit, e);
    spawnParticles(isCrit);
  }

  recalc();
  updateUI();
  throttledRender();
  // subtle satisfying bump on the resource readout (click only, not every tick)
  elBlocks.classList.remove('bump');
  void elBlocks.offsetWidth;
  elBlocks.classList.add('bump');
  checkAchievements(gain);
}

function spawnFloater(gain, isCrit, e){
  const rect=blockStage.getBoundingClientRect();
  const x = e && e.clientX ? e.clientX - rect.left : rect.width/2 + (Math.random()*40-20);
  const y = e && e.clientY ? e.clientY - rect.top : rect.height/2;
  const el=document.createElement('div');
  el.className='floater'+(isCrit?' crit':'');
  el.textContent = (isCrit?'CRIT! +':' +') + formatNum(gain, true);
  el.style.left = x+'px';
  el.style.top = y+'px';
  // random drift
  const drift = (Math.random()*40-20);
  el.style.setProperty('--drift', drift+'px');
  clickFxLayer.appendChild(el);
  setTimeout(()=>el.remove(), 900);
}
function spawnParticles(isCrit){
  const count = isCrit?10:4;
  for(let i=0;i<count;i++){
    const p=document.createElement('div');
    p.style.position='absolute';
    p.style.left='50%';
    p.style.top='46%';
    p.style.width=isCrit?'8px':'6px';
    p.style.height=isCrit?'8px':'6px';
    p.style.background=isCrit?'#ffd27a':'#ffb02e';
    p.style.border='1px solid rgba(0,0,0,.2)';
    p.style.borderRadius='2px';
    p.style.pointerEvents='none';
    p.style.boxShadow='0 2px 8px rgba(0,0,0,.3)';
    clickFxLayer.appendChild(p);
    const angle = (Math.PI*2 * i / count) + Math.random()*0.5;
    const dist = 40 + Math.random()* (isCrit?70:40);
    const tx = Math.cos(angle)*dist;
    const ty = Math.sin(angle)*dist - 20;
    p.animate([
      { transform:`translate(-50%,-50%) translate(0,0) scale(1)`, opacity:1 },
      { transform:`translate(-50%,-50%) translate(${tx}px,${ty}px) scale(0) rotate(${Math.random()*360}deg)`, opacity:0 }
    ], { duration: 600+Math.random()*200, easing:'cubic-bezier(.16,1,.3,1)' }).onfinish=()=>p.remove();
  }
}

function buyGenerator(id){
  const g=GENERATORS.find(x=>x.id===id);
  if(!g) return;
  const cost=getGenCost(g);
  if(state.blocks < cost){
    toast(`Need ${formatNum(cost,true)} blocks`);
    shakeBuy();
    return;
  }
  state.blocks-=cost;
  state.generators[id]=(state.generators[id]||0)+1;
  recalc();
  save();
  renderAllShops();
  updateUI();
  checkAchievements();
  toast(`Built ${g.name}!`);
}
function buyClickUpgrade(id){
  const cu=CLICK_UPGRADES.find(x=>x.id===id);
  if(!cu) return;
  const lvl=state.clickUpgradeLevels[id]||0;
  if(lvl>=cu.max){ toast('MAX level reached'); return; }
  const cost=getClickUpgradeCost(cu);
  if(state.blocks<cost){ toast(`Need ${formatNum(cost,true)} blocks`); shakeBuy(); return; }
  state.blocks-=cost;
  state.clickUpgradeLevels[id]=lvl+1;
  recalc();
  save();
  renderAllShops();
  updateUI();
  checkAchievements();
  toast(`${cu.name} Lv ${lvl+1}! +${cu.value}/click`);
}
function buyUpgrade(id){
  const u=UPGRADES.find(x=>x.id===id);
  if(!u || state.upgrades[id]) return;
  if(state.blocks < u.cost){
    toast(`Need ${formatNum(u.cost,true)} blocks`);
    shakeBuy();
    return;
  }
  state.blocks-=u.cost;
  state.upgrades[id]=true;
  recalc();
  save();
  renderAllShops();
  updateUI();
  checkAchievements();
  toast(`Unlocked ${u.name}!`);
}
function buyBlueprint(id){
  const b=BLUEPRINT_SHOP.find(x=>x.id===id);
  if(!b) return;
  const lvl=state.blueprintLevels[id]||0;
  if(lvl>=b.max) return;
  const cost=Math.ceil(b.cost * Math.pow(b.costScale, lvl));
  if(state.blueprints < cost){
    toast(`Need ${cost} Blueprints`);
    return;
  }
  state.blueprints-=cost;
  state.blueprintLevels[id]=lvl+1;
  recalc();
  save();
  renderAllShops();
  updateUI();
  checkAchievements();
  toast(`${b.name} Lv ${lvl+1}!`);
}
function shakeBuy(){
  document.querySelector('.panel-shop').animate([{transform:'translateX(0)'},{transform:'translateX(-3px)'},{transform:'translateX(3px)'},{transform:'translateX(0)'}],{duration:220});
}

function doPrestige(){
  const gain=getBlueprintsOnReset();
  if(gain<=0){
    toast('Not enough lifetime blocks to Reinforce');
    return;
  }
  if(!confirm(`Reinforce your base?\n\nYou will lose all blocks, generators and upgrades.\nYou will gain ${gain} Blueprints (x${(1+ (state.blueprints+gain)*PRESTIGE_MULT_PER_BP).toFixed(2)} total mult).\n\nBlueprints are permanent!\nContinue?`)) return;
  state.blueprints+=gain;
  state.prestigeCount++;
  // reset
  state.blocks=0;
  state.generators={};
  state.upgrades={};
  state.clickUpgradeLevels={};
  // keep blueprintLevels, blueprints, totalEver, playTime
  recalc();
  save();
  renderAllShops();
  updateUI();
  checkAchievements();
  toast(`REINFORCED! +${gain} Blueprints ◆`);
  // celebration particles
  for(let i=0;i<18;i++){
    setTimeout(()=> spawnParticles(true), i*60);
  }
}

// Golden Block
function scheduleGolden(){
  if(goldenTimer) clearTimeout(goldenTimer);
  const baseDelay = 45000 + Math.random()*50000; // 45-95s
  const mult = state.upgrades['golden']? 0.5 : 1; // half delay if owned
  const delay = baseDelay * mult;
  goldenTimer=setTimeout(spawnGolden, delay);
}
function spawnGolden(){
  const layer=blockStage;
  // random position within stage
  const x = 14 + Math.random()*72; // %
  const y = 10 + Math.random()*62;
  goldenBlock.style.left = x+'%';
  goldenBlock.style.top = y+'%';
  goldenBlock.classList.remove('hidden');
  // auto hide after duration
  const dur = state.upgrades['golden'] ? 9000 : 5500;
  if(goldenTimeout) clearTimeout(goldenTimeout);
  goldenTimeout=setTimeout(()=>{
    goldenBlock.classList.add('hidden');
    scheduleGolden();
  }, dur);
  // on animation, pick sound? toast hint?
}
goldenBlock.addEventListener('click', ()=>{
  goldenBlock.classList.add('hidden');
  if(goldenTimeout) clearTimeout(goldenTimeout);
  state.stats.goldenCaught = (state.stats.goldenCaught||0) + 1;
  const reward = Math.max( Math.floor(state.blocks * 0.10 * state._goldenMult), Math.floor(bps*8+ 40) );
  // Also add bonus based on totalEver? ensures early game decent
  const final = Math.max(reward, 120);
  state.blocks+=final;
  state.totalEver+=final;
  recalc();
  updateUI();
  throttledRender();
  checkAchievements();
  toast(`Golden Block! +${formatNum(final,true)} blocks ✦`);
  // burst particles
  for(let i=0;i<6;i++) spawnParticles(true);
  scheduleGolden();
});

// Delegation for shop buys
document.addEventListener('click', (e)=>{
  const genBtn=e.target.closest('[data-buy-gen]');
  if(genBtn){
    buyGenerator(genBtn.dataset.buyGen);
    return;
  }
  const clickBtn=e.target.closest('[data-buy-click]');
  if(clickBtn){
    buyClickUpgrade(clickBtn.dataset.buyClick);
    return;
  }
  const upgBtn=e.target.closest('[data-buy-upg]');
  if(upgBtn){
    buyUpgrade(upgBtn.dataset.buyUpg);
    return;
  }
  const bpBtn=e.target.closest('[data-buy-bp]');
  if(bpBtn){
    buyBlueprint(bpBtn.dataset.buyBp);
    return;
  }
});

// Tabs
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    const id=tab.dataset.tab;
    document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
    document.getElementById('pane-'+id).classList.add('active');
    if(id==='achievements') renderAchievements();
  });
});

// Prestige buttons
elPrestigeBtn.addEventListener('click', doPrestige);
document.getElementById('prestige-big-btn').addEventListener('click', doPrestige);

// Ticks
function tick(dt){
  if(bps>0){
    const gain = bps * dt;
    state.blocks += gain;
    state.totalEver += gain;
  }
}
let lastTick=performance.now();
function loop(){
  const now=performance.now();
  const dt=(now-lastTick)/1000;
  lastTick=now;
  if(dt<0.5) tick(dt);
  // UI update every frame for smooth? but throttle to 10fps
  if(Math.random()<0.15) updateUI();
  requestAnimationFrame(loop);
}

// Playtime
setInterval(()=>{
  state.playTime++;
  // autosave every 10s
  if(state.playTime%10===0) save();
},1000);

// Toast helper
function toast(msg){
  const el=document.createElement('div');
  el.className='toast';
  el.textContent=msg;
  toastStack.appendChild(el);
  setTimeout(()=>el.remove(), 3200);
}

// Achievements — viewable in Achievements tab, persisted in save
function renderAchievements(){
  if(!achGrid) return;
  const total = ACHIEVEMENTS.length;
  const unlockedCount = state.achievementsUnlocked.length;
  achCount.textContent = `${unlockedCount} / ${total}`;
  const pct = total ? Math.round(unlockedCount/total*100) : 0;
  achFill.style.width = pct + '%';
  achText.textContent = pct + '%';
  achGrid.innerHTML='';
  ACHIEVEMENTS.forEach(a=>{
    const isUnlocked = state.achievementsUnlocked.includes(a.id);
    const card=document.createElement('div');
    card.className='ach-card ' + (isUnlocked ? 'unlocked' : 'locked');
    card.innerHTML=`
      <div class="ach-icon">${iconSvg(a.icon)}</div>
      <div class="ach-info">
        <h5>${a.name}</h5>
        <p>${a.desc}</p>
      </div>
      <span class="ach-status">${isUnlocked ? 'UNLOCKED' : 'LOCKED'}</span>
    `;
    achGrid.appendChild(card);
  });
}

function checkAchievements(){
  let newly=0;
  for(const a of ACHIEVEMENTS){
    if(state.achievementsUnlocked.includes(a.id)) continue;
    try{
      if(a.check()){
        state.achievementsUnlocked.push(a.id);
        newly++;
        toast(`🏆 ${a.name} — ${a.desc}`);
      }
    }catch{}
  }
  if(newly>0){
    save();
    renderAchievements();
  }
}

// Settings
const settingsModal=document.getElementById('settings-modal');
document.getElementById('settings-btn').addEventListener('click',()=> settingsModal.classList.remove('hidden'));
document.getElementById('close-settings').addEventListener('click',()=> settingsModal.classList.add('hidden'));
settingsModal.addEventListener('click',(e)=>{ if(e.target===settingsModal) settingsModal.classList.add('hidden') });

document.getElementById('toggle-particles').addEventListener('change', e=>{ state.settings.particles=e.target.checked; save(); });
document.getElementById('toggle-shake').addEventListener('change', e=>{ state.settings.shake=e.target.checked; save(); });
document.getElementById('toggle-numbers').addEventListener('change', e=>{ state.settings.compact=e.target.checked; save(); updateUI(); throttledRender(); });
document.getElementById('save-btn').addEventListener('click', ()=>{ save(); toast('Game saved!'); });

// Export/Import
document.getElementById('export-btn').addEventListener('click', ()=>{
  save();
  const str=btoa(JSON.stringify(state));
  document.getElementById('export-area').value=str;
  navigator.clipboard.writeText(str).then(()=>toast('Save copied to clipboard!')).catch(()=>toast('Save exported below'));
  settingsModal.classList.remove('hidden');
});
document.getElementById('import-btn').addEventListener('click', ()=>{
  const str=document.getElementById('import-input').value.trim();
  if(!str) return;
  try{
    const data=JSON.parse(atob(str));
    if(!data.blocks && data.blocks!==0) throw new Error('invalid');
    if(!confirm('Import this save? Current progress will be overwritten.')) return;
    state={...defaultState(), ...data};
    // ensure new fields from imported save are normalized
    state.achievementsUnlocked = Array.isArray(data.achievementsUnlocked) ? data.achievementsUnlocked : (state.achievementsUnlocked||[]);
    state.stats = { ...defaultState().stats, ...(data.stats||{}) };
    save();
    recalc();
    renderAllShops();
    renderAchievements();
    updateUI();
    toast('Save imported!');
  }catch(e){ toast('Invalid save string'); }
});
document.getElementById('reset-btn').addEventListener('click', ()=>{
  if(confirm('WIPE SAVE? All progress lost forever! Are you sure?')){
    if(confirm('Really wipe? This cannot be undone.')){
      localStorage.removeItem(SAVE_KEY);
      state=defaultState();
      recalc();
      renderAllShops();
      renderAchievements();
      updateUI();
      toast('Save wiped. Fresh base!');
    }
  }
});

// Keyboard: Space to click, B to buy cheapest?
document.addEventListener('keydown', (e)=>{
  if(e.code==='Space'){
    e.preventDefault();
    // avoid when typing in input
    if(e.target.tagName==='INPUT' || e.target.tagName==='TEXTAREA') return;
    doClick({clientX: window.innerWidth/2, clientY: window.innerHeight/2});
  }
});

// Init
load();
recalc();
// sync settings UI
document.getElementById('toggle-particles').checked=state.settings.particles;
document.getElementById('toggle-shake').checked=state.settings.shake;
document.getElementById('toggle-numbers').checked=state.settings.compact;
renderAllShops();
renderAchievements();
updateUI();
checkAchievements();
scheduleGolden();
loop();
// fast tick for income + ui
setInterval(()=>{
  tick(0.1);
  updateUI();
  throttledRender();
},100);

// initial toast
setTimeout(()=>toast('Click the block to stack! Build your base.'), 700);

// Save on visibility hide
document.addEventListener('visibilitychange', ()=>{ if(document.hidden) save(); });
window.addEventListener('beforeunload', save);
