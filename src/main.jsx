import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Calculator, FileText, Search, Fence, Download, Trash2, Plus, Eye, Printer } from 'lucide-react';
import './style.css';

const TVA = 0.20;
const TVA = 0.20;
const LARGEURS = {standard:2, premium:2.5};

const produits = [
  { ref:'F8000601', designation:'Filiaclos vert - Panneau rigide 0,63 m x 2 m', categorie:'Panneaux rigides', hauteur:0.63, couleur:'Vert RAL 6005', prix:10.14 },
  { ref:'F8000596', designation:'Filiaclos vert - Panneau rigide 1,03 m x 2 m', categorie:'Panneaux rigides', hauteur:1.03, couleur:'Vert RAL 6005', prix:12.00 },
  { ref:'F8000597', designation:'Filiaclos vert - Panneau rigide 1,23 m x 2 m', categorie:'Panneaux rigides', hauteur:1.23, couleur:'Vert RAL 6005', prix:13.36 },
  { ref:'F8000598', designation:'Filiaclos vert - Panneau rigide 1,53 m x 2 m', categorie:'Panneaux rigides', hauteur:1.53, couleur:'Vert RAL 6005', prix:16.23 },
  { ref:'F8000599', designation:'Filiaclos vert - Panneau rigide 1,73 m x 2 m', categorie:'Panneaux rigides', hauteur:1.73, couleur:'Vert RAL 6005', prix:17.58 },
  { ref:'F8000600', designation:'Filiaclos vert - Panneau rigide 1,93 m x 2 m', categorie:'Panneaux rigides', hauteur:1.93, couleur:'Vert RAL 6005', prix:19.10 },
  { ref:'F8002594', designation:'Filiaclos gris - Panneau rigide 0,63 m x 2 m', categorie:'Panneaux rigides', hauteur:0.63, couleur:'Gris RAL 7016', prix:10.14 },
  { ref:'F8002596', designation:'Filiaclos gris - Panneau rigide 1,03 m x 2 m', categorie:'Panneaux rigides', hauteur:1.03, couleur:'Gris RAL 7016', prix:12.00 },
  { ref:'F8002597', designation:'Filiaclos gris - Panneau rigide 1,23 m x 2 m', categorie:'Panneaux rigides', hauteur:1.23, couleur:'Gris RAL 7016', prix:13.36 },
  { ref:'F8002598', designation:'Filiaclos gris - Panneau rigide 1,53 m x 2 m', categorie:'Panneaux rigides', hauteur:1.53, couleur:'Gris RAL 7016', prix:16.23 },
  { ref:'F8002599', designation:'Filiaclos gris - Panneau rigide 1,73 m x 2 m', categorie:'Panneaux rigides', hauteur:1.73, couleur:'Gris RAL 7016', prix:17.58 },
  { ref:'F8002600', designation:'Filiaclos gris - Panneau rigide 1,93 m x 2 m', categorie:'Panneaux rigides', hauteur:1.93, couleur:'Gris RAL 7016', prix:19.10 },
  { ref:'F8000640', designation:'Poteau à encoches vert 1,07 m', categorie:'Poteaux', hauteur:1.07, couleur:'Vert RAL 6005', prix:9.23 },
  { ref:'F8000642', designation:'Poteau à encoches vert 1,27 m', categorie:'Poteaux', hauteur:1.27, couleur:'Vert RAL 6005', prix:10.53 },
  { ref:'F8000644', designation:'Poteau à encoches vert 1,57 m', categorie:'Poteaux', hauteur:1.57, couleur:'Vert RAL 6005', prix:12.82 },
  { ref:'F8000646', designation:'Poteau à encoches vert 1,87 m', categorie:'Poteaux', hauteur:1.87, couleur:'Vert RAL 6005', prix:14.68 },
  { ref:'F8000649', designation:'Poteau à encoches vert 2,27 m', categorie:'Poteaux', hauteur:2.27, couleur:'Vert RAL 6005', prix:16.78 },
  { ref:'F8000840', designation:'Poteau à encoches gris 1,07 m', categorie:'Poteaux', hauteur:1.07, couleur:'Gris RAL 7016', prix:9.23 },
  { ref:'F8000842', designation:'Poteau à encoches gris 1,27 m', categorie:'Poteaux', hauteur:1.27, couleur:'Gris RAL 7016', prix:10.53 },
  { ref:'F8000844', designation:'Poteau à encoches gris 1,57 m', categorie:'Poteaux', hauteur:1.57, couleur:'Gris RAL 7016', prix:12.82 },
  { ref:'F8000846', designation:'Poteau à encoches gris 1,87 m', categorie:'Poteaux', hauteur:1.87, couleur:'Gris RAL 7016', prix:14.68 },
  { ref:'F8000849', designation:'Poteau à encoches gris 2,27 m', categorie:'Poteaux', hauteur:2.27, couleur:'Gris RAL 7016', prix:16.78 },
  { ref:'F9010004', designation:'Kit occultation PVC vert - panneau 1,03 m x 2 m', categorie:'Occultation PVC', hauteur:1.03, couleur:'Vert RAL 6005', prix:29.17 },
  { ref:'F9010001', designation:'Kit occultation PVC vert - panneau 1,53 m x 2 m', categorie:'Occultation PVC', hauteur:1.53, couleur:'Vert RAL 6005', prix:37.92 },
  { ref:'F9010003', designation:'Kit occultation PVC vert - panneau 1,93 m x 2 m', categorie:'Occultation PVC', hauteur:1.93, couleur:'Vert RAL 6005', prix:43.91 },
  { ref:'F9020004', designation:'Kit occultation PVC gris - panneau 1,03 m x 2 m', categorie:'Occultation PVC', hauteur:1.03, couleur:'Gris RAL 7016', prix:29.17 },
  { ref:'F9020001', designation:'Kit occultation PVC gris - panneau 1,53 m x 2 m', categorie:'Occultation PVC', hauteur:1.53, couleur:'Gris RAL 7016', prix:37.92 },
  { ref:'F9020003', designation:'Kit occultation PVC gris - panneau 1,93 m x 2 m', categorie:'Occultation PVC', hauteur:1.93, couleur:'Gris RAL 7016', prix:43.91 },
  { ref:'F8002001', designation:'Portillon grillagé ECO gris 100 x 120 + serrure', categorie:'Portillons', hauteur:1.2, couleur:'Gris RAL 7016', prix:99.50 },
  { ref:'F8030002', designation:'Portillon grillagé PREMIUM gris 100 x 150 + serrure', categorie:'Portillons', hauteur:1.5, couleur:'Gris RAL 7016', prix:112.50 },
  { ref:'F8000654', designation:'Platine grise pour poteau à encoches', categorie:'Accessoires', hauteur:null, couleur:'Gris RAL 7016', prix:5.50 },
  { ref:'F8000955', designation:'Cale de pose pour panneau', categorie:'Accessoires', hauteur:null, couleur:'-', prix:0.40 }
];

function euros(n){return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(Number(n||0));}
function bestPoteau(hauteur,couleur){return produits.filter(p=>p.categorie==='Poteaux'&&p.couleur===couleur&&p.hauteur>=hauteur).sort((a,b)=>a.hauteur-b.hauteur)[0];}

function App(){
 const [vue,setVue]=useState('chiffrage');
 const [client,setClient]=useState(''); const [telephone,setTelephone]=useState('');
 const [longueur,setLongueur]=useState(20); const [hauteur,setHauteur]=useState(1.53); const [couleur,setCouleur]=useState('Gris RAL 7016');
 const [occultation,setOccultation]=useState('Aucune'); const [pose,setPose]=useState(false); const [prixPoseMl,setPrixPoseMl]=useState(0); const [remise,setRemise]=useState(0); const [largeurPanneau,setLargeurPanneau]=useState('standard'); const [gamme,setGamme]=useState('Standard');
 const [recherche,setRecherche]=useState(''); const [extras,setExtras]=useState([]);
 const panneau=useMemo(()=>produits.find(p=>p.categorie==='Panneaux rigides'&&p.hauteur===Number(hauteur)&&p.couleur===couleur),[hauteur,couleur]);
 const poteau=useMemo(()=>bestPoteau(Number(hauteur),couleur),[hauteur,couleur]);
 const kit=useMemo(()=>occultation==='Aucune'?null:produits.find(p=>p.categorie===occultation&&p.hauteur===Number(hauteur)&&p.couleur===couleur),[occultation,hauteur,couleur]);
 const auto=useMemo(()=>{const largeur=LARGEURS[largeurPanneau]; const nbP=Math.ceil(Number(longueur||0)/largeur); const nbPot=nbP+1; const arr=[]; if(panneau)arr.push({...panneau,qte:nbP,auto:true}); if(poteau)arr.push({...poteau,qte:nbPot,auto:true}); if(kit)arr.push({...kit,qte:nbP,auto:true}); if(pose)arr.push({ref:'POSE',designation:'Forfait pose clôture',categorie:'Main d’œuvre',prix:Number(prixPoseMl||0),qte:Number(longueur||0),auto:true}); return arr;},[longueur,panneau,poteau,kit,pose,prixPoseMl]);
 const lignes=[...auto,...extras]; const coef=gamme==='Eco'?1.8:gamme==='Premium'?2.8:2.3; const brutHT=lignes.reduce((s,l)=>s+Number(l.prix||0)*Number(l.qte||0)*coef,0); const netHT=brutHT-(brutHT*Number(remise||0)/100); const tva=netHT*TVA; const totalTTC=netHT+tva;
 const resultats=produits.filter(p=>`${p.ref} ${p.designation} ${p.categorie}`.toLowerCase().includes(recherche.toLowerCase())).slice(0,20);
 const add=p=>{setExtras([...extras,{...p,qte:1}]);setRecherche('')}; const updateExtra=(i,qte)=>setExtras(extras.map((e,idx)=>idx===i?{...e,qte:Number(qte)}:e)); const delExtra=i=>setExtras(extras.filter((_,idx)=>idx!==i));
 const exporter=()=>{const txt=`DESTOCK MENUISERIE - CHIFFRAGE CLOTURE\nClient: ${client}\nTelephone: ${telephone}\nLongueur: ${longueur} ml\nHauteur: ${hauteur} m\nCouleur: ${couleur}\n\n${lignes.map(l=>`${l.ref} | ${l.designation} | Qte ${l.qte} | ${euros(l.prix*l.qte)}`).join('\n')}\n\nTotal TTC: ${euros(totalTTC)}`; const b=new Blob([txt],{type:'text/plain;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='chiffrage-cloture.txt'; a.click();};
 return <div className="page"><div className="phone"><header><div className="logo"><Fence/></div><div><h1><span>DEST</span><b>O</b><span>CK MENUISERIE</span></h1><p>Application de chiffrage clôture</p></div></header><nav>{[['chiffrage','Chiffrage',Calculator],['devis','Devis',FileText],['base','Base',Search]].map(([id,label,Icon])=><button key={id} onClick={()=>setVue(id)} className={vue===id?'active':''}><Icon size={18}/>{label}</button>)}</nav><main>{vue==='chiffrage'&&<><section className="hero"><h2><Calculator size={20}/> Chiffrage rapide</h2><div className="grid"><label className="full">Client<input value={client} onChange={e=>setClient(e.target.value)} placeholder="Nom du client"/></label><label className="full">Téléphone<input value={telephone} onChange={e=>setTelephone(e.target.value)} placeholder="06..."/></label><label>Longueur ml<input type="number" value={longueur} onChange={e=>setLongueur(e.target.value)}/></label><label>Largeur<select value={largeurPanneau} onChange={e=>setLargeurPanneau(e.target.value)}><option value='standard'>2m</option><option value='premium'>2m50</option></select></label><label>Hauteur<select value={hauteur} onChange={e=>setHauteur(Number(e.target.value))}>{[0.63,1.03,1.23,1.53,1.73,1.93].map(h=><option key={h} value={h}>{h} m</option>)}</select></label><label className="full">Couleur<select value={couleur} onChange={e=>setCouleur(e.target.value)}><option>Gris RAL 7016</option><option>Vert RAL 6005</option></select></label><label className="full">Gamme<select value={gamme} onChange={e=>setGamme(e.target.value)}><option>Eco</option><option selected>Standard</option><option>Premium</option></select></label><label className="full">Occultation<select value={occultation} onChange={e=>setOccultation(e.target.value)}><option>Aucune</option><option>Occultation PVC</option></select></label></div></section><section><h2>Options commerciales</h2><div className="check"><span>Ajouter la pose</span><input type="checkbox" checked={pose} onChange={e=>setPose(e.target.checked)}/></div>{pose&&<label>Prix pose / ml<input type="number" value={prixPoseMl} onChange={e=>setPrixPoseMl(e.target.value)}/></label>}<label>Remise client (%)<input type="number" value={remise} onChange={e=>setRemise(e.target.value)}/></label></section><section><h2><Plus size={18}/> Ajouter une référence F...</h2><input value={recherche} onChange={e=>setRecherche(e.target.value)} placeholder="Ex : F8002598"/>{recherche&&<div className="results">{resultats.map(p=><button key={p.ref} onClick={()=>add(p)}><strong>{p.ref}</strong><span>{euros(p.prix)}</span><small>{p.designation}</small></button>)}</div>}</section></>}{(vue==='devis'||vue==='chiffrage')&&<section><h2><FileText size={18}/> Détail du devis</h2>{lignes.map((l,i)=>{const mi=i-auto.length;return <div className="line" key={l.ref+i}><div><strong>{l.ref}</strong>{mi>=0&&<button onClick={()=>delExtra(mi)}><Trash2 size={16}/></button>}</div><p>{l.designation}</p><div className="lineBottom"><span>PU {euros(l.prix)}</span>{mi>=0?<input type="number" value={l.qte} onChange={e=>updateExtra(mi,e.target.value)}/>:<b>x {l.qte}</b>}<b>{euros(l.prix*l.qte)}</b></div></div>})}<div className="total"><div><span>Total HT</span><b>{euros(netHT)}</b></div><div><span>TVA 20%</span><b>{euros(tva)}</b></div><div className="big"><span>Total TTC</span><b>{euros(totalTTC)}</b></div></div><div className="actions"><button onClick={()=>window.print()}><Printer size={18}/> PDF</button><button onClick={exporter}><Download size={18}/> Export</button></div></section>}{vue==='base'&&<section><h2>Base produits</h2><input value={recherche} onChange={e=>setRecherche(e.target.value)} placeholder="Référence ou désignation"/><div className="results show">{resultats.map(p=><button key={p.ref} onClick={()=>add(p)}><strong>{p.ref}</strong><span>{euros(p.prix)}</span><small>{p.designation}</small></button>)}</div></section>}</main><footer><div><small>Total client TTC</small><strong>{euros(totalTTC)}</strong></div><button onClick={()=>setVue('devis')}><Eye size={18}/> Voir</button></footer></div></div>
}

createRoot(document.getElementById('root')).render(<App/>);