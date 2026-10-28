import{l as ie,c as B,e as l,f as se,g as _,k as ee}from"./api-BB4MCzuv.js";const de={docx:"https://cdn.jsdelivr.net/npm/docx@9.0.2/build/index.umd.js",pdf:"https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",mammoth:"https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",pdfjs:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",pdfworker:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"};function y(o){const t=Number(o);return isFinite(t)?t:0}function C(o,t="INR"){return o=y(o),t==="USD"?"$"+Math.round(o).toLocaleString("en-US"):"₹"+Math.round(o).toLocaleString("en-IN")}function Y(o){if(!o)return"—";const t=new Date(o+(String(o).length===10?"T00:00:00":""));return isNaN(t)?String(o):t.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}function O(o){if(!o)return"—";const t=new Date(o);return isNaN(t)?String(o):t.toLocaleString("en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}function we(o){const t=new Date((o.date||new Date().toISOString().slice(0,10))+"T00:00:00");return t.setDate(t.getDate()+y(o.validity||30)),t.toISOString().slice(0,10)}function N(o=8){const t="abcdefghijkmnpqrstuvwxyz23456789";return[...crypto.getRandomValues(new Uint8Array(o))].map(e=>t[e%t.length]).join("")}function ne(o){return JSON.parse(JSON.stringify(o??null))}function pe(o,t){return window[t]?Promise.resolve(window[t]):new Promise((e,n)=>{const s=document.createElement("script");s.src=o,s.onload=()=>window[t]?e(window[t]):n(new Error("Failed to load "+t)),s.onerror=()=>n(new Error("Failed to load "+t)),document.head.append(s)})}function ce(o,t){let e=0;return(o||[]).forEach(n=>{t>=y(n[0])&&y(n[1])>e&&(e=y(n[1]))}),e}function ue(o){const t=Math.max(1,y(o.mult)||1);let e=0,n=0;const s=(o.lines||[]).map(i=>{const c=y(i.qty)*y(i.rate),p=ce(i.slabs,y(i.qty)*t),h=c*(1-p/100);return e+=c,n+=c-h,{...i,gross:c,slabPct:p,net:h}}),a=e-n,r=a*y(o.packDisc)/100,u=y(o.fixed)>0,d=u?y(o.fixed):(a-r)*t;return{lines:s,m:t,gross:e*t,slab:n*t,pack:u?0:r*t,net:d,fixed:u,alacarte:e*t}}const oe={"q-adv":3,"term-adv":5,100:3};function X(o){const t=(o.heads||[]).map(q=>({...q,c:ue(q)})),e=t.filter(q=>q.billing==="monthly"),n=t.filter(q=>q.billing!=="monthly"),s=q=>q.reduce((m,b)=>m+b.c.net,0),a=y(o.gst),r=y(o.discount),u=y(o.termDisc),d=s(e),i=d*u/100,c=(d-i)*r/100,p=d-i-c,h=s(n),w=h*r/100,v=h-w,I=Math.max(1,y(o.term)||1),L=e.length?y(oe[o.retainerPay]):0,R=n.length?y(oe[o.projectPay]):0;return{heads:t,term:I,mon:{has:e.length>0,sub:d,term:i,disc:c,net:p,tax:p*a/100,total:p*(1+a/100),pre:L},one:{has:n.length>0,sub:h,disc:w,net:v,tax:v*a/100,total:v*(1+a/100),pre:R},contract:p*I+v}}const re={"m-adv":"Monthly fee invoiced in advance on the 1st of each month, payable within 7 days.","m-arr":"Monthly fee invoiced at the end of each month, payable within 15 days.","q-adv":"Invoiced quarterly in advance, payable within 7 days. A 3% prepayment discount applies to each quarterly invoice.","term-adv":"The full term is invoiced in advance on signing, with a 5% prepayment discount."},le={100:{label:"100% advance (3% discount)",ms:[[100,"On signing"]]},5050:{label:"50% advance, 50% on delivery",ms:[[50,"Advance on signing"],[50,"On final delivery"]]},403030:{label:"40 / 30 / 30 milestones",ms:[[40,"Advance on signing"],[30,"On approval of concept / shoot completion"],[30,"On final delivery"]]},304030:{label:"30 / 40 / 30 milestones",ms:[[30,"Advance on signing"],[40,"Mid-project milestone"],[30,"On final delivery"]]},custom:{label:"Custom milestones",ms:null}};function me(o){const t=[];let e=[],n=null,s=null;const a=()=>{e.length&&(t.push({t:"p",text:e.join(" ")}),e=[])},r=()=>{n&&(t.push({t:"ul",items:n}),n=null),s&&(t.push({t:"ol",items:s}),s=null)};return String(o||"").replace(/\r/g,"").split(`
`).forEach(u=>{const d=u.trim();if(!d){a(),r();return}let i;if(i=d.match(/^[-*\u2022]\s+(.*)$/)){a(),s&&r(),(n=n||[]).push(i[1]);return}if(i=d.match(/^\d+[.)]\s+(.*)$/)){a(),n&&r(),(s=s||[]).push(i[1]);return}if(i=d.match(/^#{1,4}\s+(.*)$/)){a(),r(),t.push({t:"h",text:i[1]});return}r(),e.push(d)}),a(),r(),t}function he(o){return String(o).split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(t=>t.startsWith("**")&&t.endsWith("**")?{bold:!0,text:t.slice(2,-2)}:{bold:!1,text:t})}function Se(o,t){const e=o.billing==="monthly"?" a month":"",n=(o.lines||[]).filter(a=>y(a.qty)>0).map(a=>`- ${y(a.qty)} × ${a.service}${e}${a.desc?": "+a.desc:""}`),s=[];return o.desc&&s.push(o.desc),y(o.mult)>1&&s.push(`For each of ${y(o.mult)} ${o.multLabel||"brands"}:`),n.length&&s.push(n.join(`
`)),o.exc&&s.push("**Not included:** "+o.exc),s.join(`

`)}function J(o,t,e={}){const n=o.currency||"INR",s=X(o),a=[];let r=0;const u=m=>a.push({t:"h",n:++r,text:m}),d=n==="INR"?"GST":"Tax",i=[o.contact,o.contactRole].filter(Boolean).join(", "),c=[];s.mon.has&&c.push(["Term",`${s.term} month${s.term>1?"s":""} from the agreed start date.`]),s.mon.has&&c.push(["Monthly investment",`${C(s.mon.net,n)} per month, ${d} extra.${s.mon.term?` Includes a ${y(o.termDisc)}% commitment discount for the ${s.term}-month term.`:""}`]),s.one.has&&c.push([s.mon.has?"One-time investment":"Investment",`${C(s.one.net,n)}, ${d} extra.`]),s.mon.has&&s.one.has&&c.push(["Total contract value",`${C(s.contract,n)} over ${s.term} months, ${d} extra.`]),o.oneLine&&c.push(["In one line",o.oneLine]),c.length&&a.push({t:"kv",rows:c}),(o.sections||[]).forEach(m=>{(m.title||m.body)&&(u(m.title),a.push({t:"md",text:m.body}))});const p=s.heads;if(p.length){u("What is included"),a.push({t:"table",cols:[{h:"Area",w:26},{h:"What you get",w:74}],rows:p.map(b=>({cells:[{b:b.title,s:b.billing==="monthly"?"Monthly":"One-time"},{md:Se(b)}]}))});const m=p.filter(b=>b.billing==="monthly");if(m.length){const b={},j=[];m.forEach(S=>(S.lines||[]).forEach(F=>{const k=y(F.qty)*Math.max(1,y(S.mult)||1);if(!k)return;const A=F.service+"|"+(F.unit||"");b[A]||(b[A]={s:F.service,u:F.unit||"",q:0},j.push(A)),b[A].q+=k})),a.push({t:"md",text:"**Monthly retainer: included every month**"}),a.push({t:"table",cols:[{h:"Deliverable",w:70},{h:"Per month",w:30,align:"r"}],rows:j.map((S,F)=>({style:F%2?"alt":"",cells:[b[S].s,`${b[S].q} ${b[S].u}`.trim()]}))});const T=(o.retainerIncl||[]).filter(Boolean);T.length&&a.push({t:"md",text:`**Also included in the retainer at no extra cost**
`+T.map(S=>"- "+S).join(`
`)})}}const h=(o.team||[]).filter(m=>m.name),w=(o.escalation||[]).filter(m=>m.name);if((h.length||o.cadence||w.length||o.clientTeam)&&(u("Team and governance"),h.length&&a.push({t:"table",cols:[{h:"Role on this engagement",w:30},{h:"Name",w:24},{h:"Responsibility",w:46}],rows:h.map((m,b)=>({style:b%2?"alt":"",cells:[{b:m.role||""},m.name,m.resp||""]}))}),o.clientTeam&&a.push({t:"md",text:`**From ${o.clientShort||o.client||"the client"}:** ${o.clientTeam}`}),o.cadence&&a.push({t:"md",text:o.cadence}),w.length&&(a.push({t:"md",text:"**Escalation path**"}),a.push({t:"table",cols:[{h:"Level",w:10},{h:"Contact",w:36},{h:"Raise when",w:54}],rows:w.map((m,b)=>({style:b%2?"alt":"",cells:[String(b+1),{b:m.name,s:m.role||""},m.when||""]}))}))),p.length){u("Investment");const m=o.pricingView||"heads",b=(T,S,F)=>{const k=[],A=F?" per month":"";return(m!=="overall"||S.term||S.disc)&&k.push({style:"sum",cells:["Subtotal",C(S.sub,n)+A]}),S.term&&k.push({style:"sum",cells:[`Commitment discount (${y(o.termDisc)}%, ${s.term}-month term)`,"−"+C(S.term,n)]}),S.disc&&k.push({style:"sum",cells:[`Discount (${y(o.discount)}%)`,"−"+C(S.disc,n)]}),k.push({style:"sum",cells:[`${T} before ${d}`,C(S.net,n)+A]}),y(o.gst)&&k.push({style:"sum",cells:[`${d} (${y(o.gst)}%)`,C(S.tax,n)]}),k.push({style:"grand",cells:[`${T} including ${d}`,C(S.total,n)+A]}),k},j=T=>{const S=T?s.mon:s.one,F=p.filter(A=>A.billing==="monthly"===T);if(!F.length)return;const k=T?"Monthly investment":s.mon.has?"One-time investment":"Investment";if(m==="overall")a.push({t:"table",cols:[{h:k,w:70},{h:"Amount",w:30,align:"r"}],rows:[{style:"hl",cells:[{b:`Everything in “What is included”${T?" billed monthly":""}: ${F.map(A=>A.title).join(", ")}. ${d} extra.`},{b:C(S.net,n)+(T?" per month":"")}]},...S.term||S.disc?[{style:"sub",cells:[`Includes ${[S.term?`a ${y(o.termDisc)}% commitment discount`:"",S.disc?`a ${y(o.discount)}% discount`:""].filter(Boolean).join(" and ")}.`,""]}]:[]]});else if(m==="heads")a.push({t:"table",cols:[{h:k,w:70},{h:"Amount",w:30,align:"r"}],rows:[...F.map((A,P)=>({style:P%2?"alt":"",cells:[{b:A.title,s:y(A.mult)>1?`${y(A.mult)} ${A.multLabel||"brands"}`:""},C(A.c.net,n)+(T?" per month":"")]})),...b(k,S,T)]});else{const A=[];F.forEach(P=>{A.push({style:"group",cells:[{b:P.title+(y(P.mult)>1?` (× ${y(P.mult)} ${P.multLabel||"brands"})`:"")},"","","",""]}),P.c.lines.forEach((E,K)=>A.push({style:K%2?"alt":"",cells:[{b:E.service,s:E.desc},String(y(E.qty)*P.c.m),E.unit||"",C(E.rate,n),C(E.net*P.c.m,n)+(E.slabPct?`
(${E.slabPct}% volume)`:"")]})),P.c.pack&&A.push({style:"sum",cells:["Package saving"+(y(P.packDisc)?` (${y(P.packDisc)}%)`:""),"","","","−"+C(P.c.pack,n)]}),P.c.fixed&&A.push({style:"sum",cells:["Package price","","","",C(P.c.net,n)]}),A.push({style:"sum",cells:[{b:P.title+" total"},"","","",{b:C(P.c.net,n)}]})}),b(k,S,T).forEach(P=>A.push({style:P.style,cells:[P.cells[0],"","","",P.cells[1]]})),a.push({t:"table",cols:[{h:k,w:44},{h:"Qty",w:9,align:"r"},{h:"Unit",w:13,align:"r"},{h:"Rate",w:15,align:"r"},{h:"Amount",w:19,align:"r"}],rows:A})}};j(!0),j(!1),s.mon.has&&s.one.has&&m!=="overall"&&a.push({t:"note",text:`Total contract value: ${C(s.contract,n)} (${s.term} months of retainer plus one-time work), ${d} extra.`})}const v=(o.onRequest||[]).filter(m=>m.item);if((v.length||o.exclusions)&&(u("Not included, available on request"),v.length&&a.push({t:"table",cols:[{h:"Item",w:30},{h:"How it works",w:45},{h:"Price",w:25,align:"r"}],rows:v.map((m,b)=>({style:b%2?"alt":"",cells:[{b:m.item},m.how||"",m.price||""]}))}),a.push({t:"note",text:"Add-ons start only with written go-ahead."+(o.exclusions?" Also outside this scope: "+o.exclusions:"")})),p.length){u("Payment terms");const m=[];if(s.mon.has&&(m.push("**Retainer.** "+(o.retainerPay==="custom"?o.retainerCustom||"":re[o.retainerPay]||re["m-adv"])),o.retainerPay==="q-adv"&&m.push(`Quarterly invoice: ${C(s.mon.net*3*.97,n)} plus ${d}.`),o.retainerPay==="term-adv"&&m.push(`Term invoice: ${C(s.mon.net*s.term*.95,n)} plus ${d}.`)),m.length&&a.push({t:"md",text:m.join(`

`)}),s.one.has){const j=((le[o.projectPay]||le[5050]).ms||(o.milestones||[]).map(S=>[y(S.pct),S.label])).filter(S=>S[0]),T=s.one.total*(1-s.one.pre/100);s.one.pre?a.push({t:"md",text:`**One-time work.** Paid 100% in advance with a ${s.one.pre}% prepayment discount.`}):a.push({t:"md",text:"**One-time work.** Invoiced against these milestones:"}),a.push({t:"table",cols:[{h:"Milestone",w:55},{h:"Share",w:15,align:"r"},{h:`Amount incl. ${d}`,w:30,align:"r"}],rows:j.map((S,F)=>({style:F%2?"alt":"",cells:[S[1],S[0]+"%",C(T*S[0]/100,n)]}))})}t.paymentNotes&&a.push({t:"md",text:t.paymentNotes})}const I=(o.terms||[]).filter(m=>m.on);I.length&&(u("Terms"),a.push({t:"md",text:I.map(m=>`- **${m.title}:** ${m.text}`).join(`
`)}));const L=(o.clientNeeds||[]).filter(Boolean);L.length&&(u(`What we need from ${o.clientShort||o.client||"you"} to start`),a.push({t:"md",text:L.map((m,b)=>`${b+1}. ${m}`).join(`
`)}));const R=(o.choices||[]).filter(m=>m.label);if(R.length&&(u("Choices to confirm on sign-off"),a.push({t:"choices",items:R.map(m=>({label:m.label,options:(m.options||[]).filter(Boolean),answer:e.answers?e.answers[m.id]:""}))})),u("Sign-off"),o.approval&&o.approval.decision==="approved"){const m=`🔐 Internally Approved & Verified with Admin PIN by ${o.approval.approverName||"Admin"} on ${O(o.approval.at)}`;a.push({t:"stamp",text:m,type:"admin"})}e.approval&&e.approval.name&&a.push({t:"stamp",text:`Approved online by client ${e.approval.name}${e.approval.role?", "+e.approval.role:""} on ${Y(e.approval.at)}`,type:"client"}),a.push({t:"sig",left:{who:"For "+(o.client||"the client"),name:"",role:""},right:{who:`For ${t.name}${t.legal?" ("+t.legal+")":""}`,name:t.signatory,role:t.signRole}});const q=[t.address,t.gstin&&"GSTIN "+t.gstin,t.email,t.phone,t.website].filter(Boolean).join(" • ");return{cover:{brand:t.name||"CI360 Degrees",title:o.title||"Proposal",subtitle:o.subtitle,kicker:o.kicker||"Proposal for sign-off",meta:[["Prepared for",[o.client,i].filter(Boolean).join(`
`)],["Reference",o.ref],["Date",Y(o.date)],["Valid until",Y(we(o))]]},blocks:a,foot:q,title:o.title||"Proposal",ref:o.ref,brand:t.name||"CI360 Degrees"}}function Q(o){return he(o).map(t=>t.bold?`<strong>${l(t.text)}</strong>`:l(t.text)).join("")}function ve(o){return me(o).map(t=>t.t==="p"?`<p>${Q(t.text)}</p>`:t.t==="h"?`<h3>${Q(t.text)}</h3>`:`<${t.t}>${t.items.map(e=>`<li>${Q(e)}</li>`).join("")}</${t.t}>`).join("")}function U(o){return o&&typeof o=="object"&&"md"in o?ve(o.md):o&&typeof o=="object"?`<strong>${Q(o.b||"")}</strong>${o.s?`<div class="desc">${l(o.s)}</div>`:""}`:String(o??"").split(`
`).map((t,e)=>e?`<div class="desc">${l(t)}</div>`:l(t)).join("")}function te(o,t=!1){const e=o.cover,n=o.blocks.map(s=>{if(s.t==="h")return`<h2><span class="n">${s.n}.</span>${l(s.text)}</h2>`;if(s.t==="md")return ve(s.text);if(s.t==="note")return`<p class="pnote">${l(s.text)}</p>`;if(s.t==="stamp")return`<div class="approved-stamp ${s.type==="admin"?"admin-stamp":""}">${l(s.text)}</div>`;if(s.t==="kv")return`<table class="kv"><tbody>${s.rows.map(([a,r])=>`<tr><th>${l(a)}</th><td>${U(r)}</td></tr>`).join("")}</tbody></table>`;if(s.t==="table"){const a=s.cols.length;return`<table class="pt"><thead><tr>${s.cols.map(r=>`<th class="${r.align==="r"?"r":""}" style="width:${r.w}%">${l(r.h)}</th>`).join("")}</tr></thead><tbody>${s.rows.map(r=>["sum","grand","sub","group"].includes(r.style)?`<tr class="${r.style}"><td colspan="${a-1}" class="${r.style==="group"||r.style==="sub"?"":"r"}">${U(r.cells[0])}</td><td class="r">${U(r.cells[r.cells.length-1])}</td></tr>`:`<tr class="${r.style||""}">${r.cells.map((u,d)=>`<td class="${s.cols[d].align==="r"?"r":""}">${U(u)}</td>`).join("")}</tr>`).join("")}</tbody></table>`}return s.t==="choices"?`<div class="choices">${s.items.map(a=>`<p><strong>${l(a.label)}:</strong> ${a.options.length?a.options.map(r=>`<span class="box">${a.answer===r?"☑":"☐"} ${l(r)}</span>`).join(" "):`<span class="blank">${a.answer?l(a.answer):""}</span>`}</p>`).join("")}</div>`:s.t==="sig"?`<div class="sig">${[s.left,s.right].map(a=>`<div><div class="who">${l(a.who)}</div>${[["Name",a.name],["Designation",a.role],["Signature",""],["Date",""]].map(([r,u])=>`<div class="ln"><span>${r}:</span> ${l(u||"")}</div>`).join("")}</div>`).join("")}</div>${o.foot?`<div class="foot">${l(o.foot)}</div>`:""}`:""}).join("");return`<article class="paper${t?" print":""}">
    <section class="cover">
      <div class="cv-brand">${l(e.brand)}</div>
      <div class="cv-kicker">${l(e.kicker)}</div>
      <h1>${l(e.title)}</h1>
      <p class="cv-sub">${l(e.subtitle||"")}</p>
      <div class="cv-rule"></div>
      <dl class="cv-meta">${e.meta.filter(s=>s[1]).map(([s,a])=>`<dt>${l(s)}</dt><dd>${l(a).replace(/\n/g,"<br>")}</dd>`).join("")}</dl>
    </section>
    <div class="pb"></div>
    <div class="body">${n}</div>
  </article>`}async function G(o,t,e,n={}){const s=e.textContent;e.disabled=!0,e.textContent="Generating Word (.docx)…";try{const a=await pe(de.docx,"docx"),r=J(o,t,n),u="0F2A4A",d="B8893A",i="1C2430",c="5A6577",p="D5DCE5",h="F1F4F8",w="EFE3CC",v=9026,I={style:a.BorderStyle.NONE,size:0,color:"FFFFFF"},L={top:I,bottom:I,left:I,right:I},R={style:a.BorderStyle.SINGLE,size:4,color:p},q={top:R,bottom:R,left:R,right:R},m=(f,g={})=>new a.TextRun({text:String(f??""),font:g.font||"Arial",size:g.size||20,bold:!!g.bold,italics:!!g.italics,color:g.color||i}),b=(f,g={})=>new a.Paragraph({children:f,alignment:g.align,keepNext:g.keepNext,numbering:g.numbering,border:g.border,heading:g.heading,spacing:{after:g.after??110,before:g.before??0,line:g.line??290,lineRule:"auto"}}),j=(f,g={})=>he(f).map($=>m($.text,{...g,bold:$.bold||g.bold})),T={n:0},S=(f,g={})=>{const $=[];return me(f).forEach(x=>{if(x.t==="p")$.push(b(j(x.text,g),{after:g.after??110}));else if(x.t==="h")$.push(b([m(x.text,{font:"Georgia",bold:!0,size:(g.size||20)+2,color:u})],{before:100,after:60,keepNext:!0}));else{const D=x.t==="ol"?"num"+Math.min(40,++T.n):"bul";x.items.forEach(z=>$.push(b(j(z,g),{numbering:{reference:D,level:0},after:50})))}}),$.length?$:[b([])]},F=(f,g={})=>{const $=g.size||18,x=g.color||i,D=g.align;if(f&&typeof f=="object"&&"md"in f)return S(f.md,{size:$,after:70});if(f&&typeof f=="object"){const z=[b(j(f.b||"",{bold:!0,size:$,color:x}),{after:f.s?30:0,align:D,line:260})];return f.s&&z.push(b([m(f.s,{size:$-2,color:g.sub||c})],{after:0,align:D,line:250})),z}return String(f??"").split(`
`).map((z,H)=>b([m(z,{size:H?$-2:$,color:H?g.sub||c:x,bold:g.bold})],{after:0,align:D,line:260}))},k=(f,g,$={})=>new a.TableCell({children:f,width:{size:g,type:a.WidthType.DXA},borders:$.borders||q,columnSpan:$.span,shading:$.fill?{type:a.ShadingType.CLEAR,color:"auto",fill:$.fill}:void 0,margins:{top:80,bottom:80,left:110,right:110},verticalAlign:$.v||a.VerticalAlign.TOP}),A=(f,g)=>b([m(f+".  ",{font:"Georgia",size:28,bold:!0,color:d}),m(g,{font:"Georgia",size:28,bold:!0,color:u})],{heading:a.HeadingLevel.HEADING_1,keepNext:!0,before:320,after:140,border:{bottom:{style:a.BorderStyle.SINGLE,size:8,color:d,space:5}}}),P=[],E=r.cover,K=E.meta.filter(f=>f[1]).map(([f,g])=>b([m(f+"   ",{color:"C9A35E",size:19}),...String(g).split(`
`).flatMap(($,x)=>x?[new a.TextRun({break:1,text:$,font:"Arial",size:21,color:"FFFFFF"})]:[m($,{color:"FFFFFF",size:21})])],{after:70}));P.push(new a.Table({width:{size:v,type:a.WidthType.DXA},columnWidths:[v],rows:[new a.TableRow({height:{value:12800,rule:a.HeightRule.ATLEAST},children:[new a.TableCell({width:{size:v,type:a.WidthType.DXA},borders:L,shading:{type:a.ShadingType.CLEAR,color:"auto",fill:u},margins:{top:900,bottom:900,left:700,right:700},children:[b([m(E.brand,{font:"Georgia",size:24,bold:!0,color:"C9A35E"})],{after:2200}),b([m(E.kicker,{size:20,color:"AEBBCD"})],{after:120}),b([m(E.title,{font:"Georgia",size:56,bold:!0,color:"FFFFFF"})],{after:200,line:260}),b(E.subtitle?[m(E.subtitle,{font:"Georgia",size:26,italics:!0,color:"D9E1EC"})]:[],{after:1500}),new a.Paragraph({border:{top:{style:a.BorderStyle.SINGLE,size:12,color:d,space:12}},spacing:{after:160},children:[]}),...K]})]})]})),P.push(new a.Paragraph({children:[new a.PageBreak]})),r.blocks.forEach(f=>{if(f.t==="h")P.push(A(f.n,f.text));else if(f.t==="md")P.push(...S(f.text));else if(f.t==="note")P.push(b([m(f.text,{italics:!0,size:18,color:c})],{before:80}));else if(f.t==="stamp")P.push(b([m(f.text,{bold:!0,size:19,color:f.type==="admin"?"0F2A4A":"2F6B45"})],{after:160}));else if(f.t==="kv"){const g=[2500,v-2500];P.push(new a.Table({width:{size:v,type:a.WidthType.DXA},columnWidths:g,rows:f.rows.map(([$,x],D)=>new a.TableRow({cantSplit:!0,children:[k(F({b:$},{size:19}),g[0],{fill:h}),k(F(x,{size:19}),g[1],{fill:D%2?h:void 0})]}))}))}else if(f.t==="table"){const g=f.cols.map(x=>Math.round(v*x.w/100));g[g.length-1]+=v-g.reduce((x,D)=>x+D,0);const $=[new a.TableRow({tableHeader:!0,children:f.cols.map((x,D)=>k(F(x.h,{size:17,color:"FFFFFF",bold:!0,align:x.align==="r"?a.AlignmentType.RIGHT:void 0}),g[D],{fill:u,v:a.VerticalAlign.CENTER}))})];f.rows.forEach(x=>{const D=x.style==="alt"?h:x.style==="grand"?u:x.style==="hl"?w:x.style==="group"?"E4E9F0":void 0,z=x.style==="grand"?"FFFFFF":i,H=x.style==="grand"?"D9E1EC":c;if(x.style==="sum"||x.style==="grand"||x.style==="sub"||x.style==="group"){const Z=x.cells[x.cells.length-1],V=g.slice(0,-1).reduce((be,xe)=>be+xe,0);$.push(new a.TableRow({cantSplit:!0,children:[k(F(x.cells[0],{size:x.style==="grand"?20:18,color:z,sub:H,bold:x.style==="grand",align:x.style==="group"||x.style==="sub"?void 0:a.AlignmentType.RIGHT}),V,{span:g.length-1,fill:D}),k(F(Z,{size:x.style==="grand"?20:18,color:z,sub:H,bold:x.style!=="sub",align:a.AlignmentType.RIGHT}),g[g.length-1],{fill:D})]}))}else $.push(new a.TableRow({cantSplit:!0,children:x.cells.map((Z,V)=>k(F(Z,{size:18,color:z,sub:H,align:f.cols[V].align==="r"?a.AlignmentType.RIGHT:void 0}),g[V],{fill:D}))}))}),P.push(new a.Table({width:{size:v,type:a.WidthType.DXA},columnWidths:g,rows:$})),P.push(b([],{after:60}))}else if(f.t==="choices")f.items.forEach(g=>{const $=g.answer,x=[m(g.label+":   ",{bold:!0})];g.options.length?g.options.forEach(D=>x.push(m(($===D?"☑ ":"☐ ")+D+"    "))):x.push(m($||"______________________________")),P.push(b(x,{after:140}))});else if(f.t==="sig"){const g=v/2,$=x=>[b([m(x.who,{font:"Georgia",bold:!0,color:u,size:21})],{after:200}),...[["Name",x.name],["Designation",x.role],["Signature",""],["Date",""]].map(([D,z])=>b([m(D+":  ",{size:19,color:c}),m(z||"",{size:20})],{after:200,border:{bottom:{style:a.BorderStyle.SINGLE,size:4,color:p,space:2}}}))];P.push(new a.Table({width:{size:v,type:a.WidthType.DXA},columnWidths:[g,g],rows:[new a.TableRow({cantSplit:!0,children:[k($(f.left),g,{borders:L}),k($(f.right),g,{borders:L})]})]})),r.foot&&P.push(b([m(r.foot,{size:16,color:c})],{before:360}))}});const ae=[{reference:"bul",levels:[{level:0,format:a.LevelFormat.BULLET,text:"•",alignment:a.AlignmentType.LEFT,style:{paragraph:{indent:{left:480,hanging:280}},run:{color:d}}}]}];for(let f=1;f<=40;f++)ae.push({reference:"num"+f,levels:[{level:0,format:a.LevelFormat.DECIMAL,text:"%1.",alignment:a.AlignmentType.LEFT,style:{paragraph:{indent:{left:480,hanging:320}},run:{color:u,bold:!0}}}]});const ge=new a.Document({creator:r.brand,title:r.title,styles:{default:{document:{run:{font:"Arial",size:20,color:i}}},paragraphStyles:[{id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:!0,run:{font:"Georgia",size:28,bold:!0,color:u},paragraph:{outlineLevel:0}}]},numbering:{config:ae},sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1300,bottom:1200,left:1440,right:1440}},titlePage:!0},headers:{first:new a.Header({children:[b([])]}),default:new a.Header({children:[b([m(r.brand,{font:"Georgia",size:16,bold:!0,color:d}),m("   "+r.title,{size:16,color:c})],{after:0})]})},footers:{first:new a.Footer({children:[b([])]}),default:new a.Footer({children:[new a.Paragraph({alignment:a.AlignmentType.RIGHT,children:[m((r.ref||"")+"   Page ",{size:15,color:c}),new a.TextRun({children:[a.PageNumber.CURRENT],size:15,color:c,font:"Arial"})]})]})},children:P}]}),fe=await a.Packer.toBlob(ge),ye=`${o.clientShort||o.client||"Client"} - ${o.title||"Proposal"}.docx`.replace(/[\\/:*?"<>|]+/g,"_"),M=document.createElement("a");M.href=URL.createObjectURL(fe),M.download=ye,document.body.append(M),M.click(),setTimeout(()=>{URL.revokeObjectURL(M.href),M.remove()},600)}catch(a){alert("Word document export error: "+a.message)}finally{e.disabled=!1,e.textContent=s}}async function W(o,t,e,n={}){const s=e.textContent;e.disabled=!0,e.textContent="Generating PDF…";try{const a=await pe(de.pdf,"html2pdf"),r=J(o,t,n),u=te(r,!0),d=document.createElement("div");d.style.position="fixed",d.style.left="-9999px",d.style.top="0",d.style.width="794px",d.style.background="#FFFFFF",d.style.color="#1C2430",d.innerHTML=`
      <style>
        .paper, .paper.print { background: #FFFFFF !important; color: #1C2430 !important; font-family: Arial, Helvetica, sans-serif !important; width: 794px !important; margin: 0 !important; box-shadow: none !important; }
        .paper .cover { background: #0F2A4A !important; color: #FFFFFF !important; min-height: 980px !important; padding: 50px 44px 44px !important; }
        .paper .cv-brand { color: #D4A657 !important; font-family: Georgia, serif !important; font-weight: 700 !important; font-size: 19px !important; }
        .paper .cv-kicker { color: #AEBBCD !important; font-size: 13px !important; }
        .paper .cover h1 { color: #FFFFFF !important; font-family: Georgia, serif !important; font-size: 34px !important; margin: 8px 0 12px !important; }
        .paper .cv-sub { color: #D9E1EC !important; font-family: Georgia, serif !important; font-style: italic !important; font-size: 16px !important; }
        .paper .cv-rule { background: #B8893A !important; height: 2px !important; margin-bottom: 18px !important; }
        .paper .cv-meta dt { color: #C9A35E !important; font-weight: 700 !important; }
        .paper .cv-meta dd { color: #FFFFFF !important; }
        .paper .body { background: #FFFFFF !important; color: #1C2430 !important; padding: 36px 44px 44px !important; }
        .paper h2 { color: #0F2A4A !important; font-family: Georgia, serif !important; font-size: 19px !important; border-bottom: 1.5px solid #B8893A !important; margin: 26px 0 12px !important; }
        .paper h2 .n { color: #B8893A !important; }
        .paper h3 { color: #0F2A4A !important; font-family: Georgia, serif !important; font-size: 14.5px !important; margin: 14px 0 6px !important; font-weight: 700 !important; }
        .paper p { color: #1E293B !important; font-size: 13.5px !important; line-height: 1.6 !important; margin: 0 0 9px !important; }
        .paper ul, .paper ol { color: #1E293B !important; margin: 0 0 10px !important; padding-left: 20px !important; }
        .paper li { color: #1E293B !important; font-size: 13.5px !important; line-height: 1.5 !important; margin-bottom: 4px !important; }
        .paper li::marker { color: #B8893A !important; }
        .paper strong { color: #0F172A !important; }
        .paper table { width: 100% !important; border-collapse: collapse !important; font-size: 12.5px !important; margin: 6px 0 12px !important; background: #FFFFFF !important; color: #1C2430 !important; }
        .paper th, .paper td { border: 1px solid #D5DCE5 !important; padding: 7px 9px !important; color: #1C2430 !important; }
        .paper table.pt thead th { background: #0F2A4A !important; color: #FFFFFF !important; border-color: #0F2A4A !important; font-weight: 700 !important; }
        .paper table.kv th { background: #F1F4F8 !important; color: #0F2A4A !important; font-weight: 700 !important; }
        .paper table.kv td { background: #FFFFFF !important; color: #1C2430 !important; }
        .paper tr.alt td { background: #F8FAFC !important; color: #1C2430 !important; }
        .paper tr.hl td { background: #FDF6E2 !important; color: #0F2A4A !important; font-size: 13.5px !important; }
        .paper tr.group td { background: #E2E8F0 !important; color: #0F2A4A !important; font-weight: 700 !important; }
        .paper tr.sub td { color: #64748B !important; font-style: italic !important; }
        .paper tr.grand td { background: #0F2A4A !important; color: #FFFFFF !important; font-weight: 700 !important; }
        .paper tr.grand td * { color: #FFFFFF !important; }
        .paper .desc { color: #475569 !important; font-size: 11.5px !important; }
        .paper .pnote { color: #475569 !important; font-style: italic !important; }
        .paper .approved-stamp { border: 1.5px solid #2F6B45 !important; background: #ECFDF5 !important; color: #2F6B45 !important; font-weight: 700 !important; }
        .paper .approved-stamp.admin-stamp { border-color: #0F2A4A !important; background: #F1F4F8 !important; color: #0F2A4A !important; }
        .paper .sig .who { color: #0F2A4A !important; font-family: Georgia, serif !important; font-weight: 700 !important; }
        .paper .sig .ln { border-bottom: 1px solid #CBD5E1 !important; color: #1E293B !important; }
        .paper .sig .ln span { color: #64748B !important; }
        .paper .foot { color: #64748B !important; }
      </style>
      ${u}
    `,document.body.appendChild(d);const i={margin:[10,10,12,10],filename:`${o.clientShort||o.client||"Client"} - ${o.title||"Proposal"}.pdf`.replace(/[\\/:*?"<>|]+/g,"_"),image:{type:"jpeg",quality:.98},html2canvas:{scale:2,backgroundColor:"#ffffff",scrollX:0,scrollY:0,useCORS:!0},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"},pagebreak:{mode:["css","legacy"],avoid:["tr","h2","h3","li","p",".sig",".kv",".approved-stamp"]}};try{await a().set(i).from(d).save()}finally{d.remove()}}catch(a){alert("PDF export error: "+a.message)}finally{e.disabled=!1,e.textContent=s}}class $e{constructor(t,e={}){this.container=t,this.options=e,this.currentUser=e.currentUser||ie()||{},this.userRole=e.userRole||this.currentUser.role||"employee",this.isAdmin=this.userRole==="admin"||this.userRole==="superadmin"||this.currentUser.role==="admin"||this.currentUser.role==="superadmin",this.proposals=[],this.rateDoc=null,this.pinStatus={isConfigured:!1,defaultPinHint:null},this.personnel=[],this.currentView="list",this.activeStep="brief",this.activeProposal=null,this.searchTerm="",this.statusFilter="all",this.briefTab="paste",this.saving=!1,this.saveTimeout=null}async init(){this.container.innerHTML='<div class="card" style="padding:40px;text-align:center"><div class="loading">Loading Proposal Studio…</div></div>';try{const[t,e,n,s]=await Promise.all([B("/proposals"),B("/proposals/ratecard"),B("/proposals/pin/status"),B("/personnel").catch(()=>[])]);this.proposals=t||[],this.rateDoc=e,this.pinStatus=n||{isConfigured:!1,defaultPinHint:null},this.personnel=s||[],this.render()}catch(t){this.container.innerHTML=`
        <div class="empty">
          <h3>Failed to load Proposal Studio</h3>
          <p class="muted">${l(t.message)}</p>
          <button class="btn primary" id="retry-ps-btn">Retry</button>
        </div>`;const e=this.container.querySelector("#retry-ps-btn");e&&(e.onclick=()=>this.init())}}render(){this.container.innerHTML=`
      <div class="ps-wrapper">
        <!-- Top Sub-Navigation Header -->
        <div class="ps-header">
          <div class="ps-title-block">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2 style="margin:0;font-size:22px;font-weight:800;color:var(--text-1);">Proposal Studio</h2>
              <span class="ps-badge-gold">CI360 Studio</span>
              <span class="badge green" title="Admin Approval PIN is secured and active">🔐 PIN Protected</span>
            </div>
            <p class="muted small" style="margin:4px 0 0;">Branded proposal generation, comprehensive rate card pricing, and secure Admin PIN authorization audit trail.</p>
          </div>

          <div class="ps-subnav">
            <button class="ps-nav-btn ${this.currentView==="list"?"active":""}" data-ps-view="list">📁 Proposals (${this.proposals.length})</button>
            <button class="ps-nav-btn ${this.currentView==="ratecard"?"active":""}" data-ps-view="ratecard">🏷️ Rate Card & Packages</button>
            ${this.isAdmin?`
              <button class="ps-nav-btn ${this.currentView==="audit"?"active":""}" data-ps-view="audit">🛡️ Admin PIN Audit Trail</button>
              <button class="ps-nav-btn ${this.currentView==="settings"?"active":""}" data-ps-view="settings">⚙️ Settings & PIN</button>
            `:""}
            <button class="btn gold" id="ps-btn-new-proposal">✨ New Proposal</button>
          </div>
        </div>

        <!-- Main View Area -->
        <div id="ps-view-content" class="ps-content-body"></div>
      </div>
    `,this.container.querySelectorAll("[data-ps-view]").forEach(n=>{n.onclick=()=>{this.currentView=n.dataset.psView,this.render()}});const t=this.container.querySelector("#ps-btn-new-proposal");t&&(t.onclick=()=>this.createNewProposal());const e=this.container.querySelector("#ps-view-content");this.currentView==="list"?this.renderProposalList(e):this.currentView==="editor"?this.renderProposalEditor(e):this.currentView==="ratecard"?this.renderRateCardView(e):this.currentView==="audit"?this.renderAuditTrailView(e):this.currentView==="settings"&&this.renderSettingsView(e)}renderProposalList(t){let e=[...this.proposals];if(this.statusFilter!=="all"&&(e=e.filter(i=>i.status===this.statusFilter)),this.searchTerm.trim()){const i=this.searchTerm.trim().toLowerCase();e=e.filter(c=>(c.client||"").toLowerCase().includes(i)||(c.title||"").toLowerCase().includes(i)||(c.ref||"").toLowerCase().includes(i))}const n=this.proposals.filter(i=>i.status==="pending").length,s=this.proposals.filter(i=>i.status==="approved"||i.status==="with_client"||i.status==="won").length,a=this.proposals.reduce((i,c)=>i+X(c).contract,0);t.innerHTML=`
      <!-- Stats Overview Banner -->
      <div class="grid grid-4" style="margin-bottom:20px;">
        <div class="card kpi">
          <div class="label">Total Proposals</div>
          <div class="value">${this.proposals.length}</div>
          <div class="sub">Active scope documents</div>
        </div>
        <div class="card kpi">
          <div class="label">Awaiting Admin PIN</div>
          <div class="value" style="color:${n>0?"var(--amber-500)":"var(--text-1)"}">${n}</div>
          <div class="sub">Needs internal authorization</div>
        </div>
        <div class="card kpi">
          <div class="label">PIN Approved / Live</div>
          <div class="value" style="color:var(--green-500)">${s}</div>
          <div class="sub">Verified & signed off</div>
        </div>
        <div class="card kpi">
          <div class="label">Pipeline Value</div>
          <div class="value" style="color:var(--brand-600)">${se(a)}</div>
          <div class="sub">Aggregate contract volume</div>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;flex:1;max-width:440px;">
          <input type="text" class="input" id="ps-search" placeholder="Search by client, title or reference..." value="${l(this.searchTerm)}">
        </div>

        <div style="display:flex;align-items:center;gap:10px;">
          <span class="muted small">Status:</span>
          <select class="input" id="ps-status-filter" style="width:190px;">
            <option value="all" ${this.statusFilter==="all"?"selected":""}>All Statuses</option>
            <option value="draft" ${this.statusFilter==="draft"?"selected":""}>Draft</option>
            <option value="pending" ${this.statusFilter==="pending"?"selected":""}>⏳ Awaiting Approval</option>
            <option value="approved" ${this.statusFilter==="approved"?"selected":""}>🔐 Approved with PIN</option>
            <option value="with_client" ${this.statusFilter==="with_client"?"selected":""}>📤 With Client</option>
            <option value="won" ${this.statusFilter==="won"?"selected":""}>🎉 Client Approved</option>
            <option value="changes" ${this.statusFilter==="changes"?"selected":""}>⚠️ Changes Requested</option>
            <option value="returned" ${this.statusFilter==="returned"?"selected":""}>↩️ Returned</option>
          </select>
        </div>
      </div>

      <!-- Proposals Table -->
      <div class="card" style="padding:0;overflow:hidden;">
        <div class="scroll">
          <table class="table" style="width:100%;margin:0;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th style="padding:12px 16px;">Reference & Proposal</th>
                <th style="padding:12px 16px;">Client Organisation</th>
                <th style="padding:12px 16px;">Date & Term</th>
                <th style="padding:12px 16px;text-align:right;">Contract Value</th>
                <th style="padding:12px 16px;text-align:center;">Internal Approval Status</th>
                <th style="padding:12px 16px;text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${e.length===0?`
                <tr>
                  <td colspan="6" style="padding:48px;text-align:center;">
                    <div class="empty">
                      <div style="font-size:36px;margin-bottom:10px;">📜</div>
                      <h3 style="margin:0 0 6px 0;">No proposals found</h3>
                      <p class="muted small">Create your first client proposal or clear your search filters.</p>
                      <button class="btn gold" id="ps-empty-new-btn" style="margin-top:12px;">Create Proposal</button>
                    </div>
                  </td>
                </tr>
              `:e.map(i=>{const c=X(i),p=this.renderStatusBadge(i),h=i.approval&&i.approval.decision==="approved"&&i.approval.pinVerified;return`
                  <tr style="cursor:pointer;" class="ps-row-hover" data-open-proposal="${l(i._id)}">
                    <td style="padding:14px 16px;">
                      <div style="font-weight:700;color:var(--text-1);font-size:14.5px;">${l(i.title||"Untitled Proposal")}</div>
                      <div class="muted small" style="font-family:var(--font-mono);">${l(i.ref)}${i.createdBy&&i.createdBy.name?` · <span style="color:var(--text-3);">By ${l(i.createdBy.name)}</span>`:""}</div>
                    </td>
                    <td style="padding:14px 16px;">
                      <div style="font-weight:600;color:var(--text-1);">${l(i.client)}</div>
                      <div class="muted small">${l(i.contact?i.contact+(i.contactRole?` (${i.contactRole})`:""):"—")}</div>
                    </td>
                    <td style="padding:14px 16px;">
                      <div>${Y(i.date)}</div>
                      <div class="muted small">${i.term?`${i.term} months retainer`:"One-time project"}</div>
                    </td>
                    <td style="padding:14px 16px;text-align:right;font-variant-numeric:tabular-nums;font-weight:700;color:var(--text-1);">
                      ${C(c.contract,i.currency)}
                      ${c.mon.has?`<div class="muted small" style="font-weight:400;">${C(c.mon.net,i.currency)}/mo</div>`:""}
                    </td>
                    <td style="padding:14px 16px;text-align:center;">
                      ${p}
                      ${h?'<div class="small" style="color:var(--green-600);font-size:11px;margin-top:2px;">🔐 PIN Verified</div>':""}
                    </td>
                    <td style="padding:14px 16px;text-align:right;" onclick="event.stopPropagation();">
                      <div style="display:inline-flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end;">
                        <button class="btn small" data-edit-p="${l(i._id)}" title="Edit proposal">✏️ Edit</button>
                        <button class="btn small" data-list-pdf="${l(i._id)}" title="Download PDF document directly">📄 PDF</button>
                        <button class="btn small" data-list-word="${l(i._id)}" title="Download Word (.docx) document directly">📝 Word</button>
                        ${i.shareId?`
                          <button class="btn small ghost" data-list-share="${l(i.shareId)}" title="Copy direct client review link">🔗 Link</button>
                        `:""}
                        ${this.isAdmin?`
                          ${i.status==="pending"||!h?`
                            <button class="btn small gold" data-quick-pin="${l(i._id)}" title="Approve with Admin PIN">🔐 Approve</button>
                          `:""}
                        `:`
                          ${i.status==="draft"?`
                            <button class="btn small gold" data-quick-submit="${l(i._id)}" title="Submit for Admin Approval">📤 Submit</button>
                          `:""}
                        `}
                      </div>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;const r=t.querySelector("#ps-search");r&&(r.oninput=i=>{this.searchTerm=i.target.value,this.renderProposalList(t)});const u=t.querySelector("#ps-status-filter");u&&(u.onchange=i=>{this.statusFilter=i.target.value,this.renderProposalList(t)});const d=t.querySelector("#ps-empty-new-btn");d&&(d.onclick=()=>this.createNewProposal()),t.querySelectorAll("[data-open-proposal]").forEach(i=>{i.onclick=()=>{const c=i.dataset.openProposal;this.openProposal(c)}}),t.querySelectorAll("[data-edit-p]").forEach(i=>{i.onclick=c=>{c.stopPropagation(),this.openProposal(i.dataset.editP)}}),t.querySelectorAll("[data-list-pdf]").forEach(i=>{i.onclick=async c=>{var h;c.stopPropagation();const p=this.proposals.find(w=>w._id===i.dataset.listPdf);p&&await W(p,(h=this.rateDoc)==null?void 0:h.settings,i)}}),t.querySelectorAll("[data-list-word]").forEach(i=>{i.onclick=async c=>{var h;c.stopPropagation();const p=this.proposals.find(w=>w._id===i.dataset.listWord);p&&await G(p,(h=this.rateDoc)==null?void 0:h.settings,i)}}),t.querySelectorAll("[data-list-share]").forEach(i=>{i.onclick=c=>{c.stopPropagation();const p=`${window.location.origin}/proposal?p=${i.dataset.listShare}`;navigator.clipboard.writeText(p).then(()=>{flashToast("Direct client proposal link copied! 📋")}).catch(()=>{prompt("Copy client link:",p)})}}),t.querySelectorAll("[data-quick-pin]").forEach(i=>{i.onclick=c=>{c.stopPropagation();const p=this.proposals.find(h=>h._id===i.dataset.quickPin);p&&this.showAdminPinModal(p,"Approved with Admin PIN",()=>this.init())}}),t.querySelectorAll("[data-quick-submit]").forEach(i=>{i.onclick=async c=>{c.stopPropagation();const p=i.dataset.quickSubmit;try{i.disabled=!0,i.textContent="Submitting…",await _(`/proposals/${p}/request-approval`,{note:`Submitted by ${this.currentUser.name||"employee"}`}),flashToast("Proposal submitted to Admin for approval! ⏳");const h=await B("/proposals");this.proposals=h||[],this.renderProposalList(t)}catch(h){alert(h.message),i.disabled=!1,i.textContent="📤 Submit"}}})}renderStatusBadge(t){const e=t.status||"draft";return e==="approved"?'<span class="badge green">🔐 Approved Internally</span>':e==="pending"?'<span class="badge amber">⏳ Awaiting Approval</span>':e==="with_client"?'<span class="badge blue">📤 With Client</span>':e==="won"?'<span class="badge green" style="font-weight:700;">🎉 Client Approved</span>':e==="changes"?'<span class="badge red">⚠️ Changes Requested</span>':e==="returned"?'<span class="badge red">↩️ Returned</span>':'<span class="badge gray">Draft</span>'}createNewProposal(){const t=new Date,e=t.getFullYear(),n=Math.floor(100+Math.random()*900),s=this.rateDoc&&this.rateDoc.settings||{};this.activeProposal={ref:`CI360/PR/${e}/${n}`,title:"Digital Marketing & Content Strategy Proposal",subtitle:"Comprehensive Strategy, Creative Production & Growth Execution",kicker:"Proposal for sign-off",oneLine:"Integrated marketing, creative content production, and managed digital visibility.",client:"",clientShort:"",contact:"",contactRole:"",industry:"",location:"India",currency:"INR",date:t.toISOString().slice(0,10),validity:30,brief:"",briefForm:{},briefFiles:[],services:[],tone:"Confident and consultative",sections:[{id:N(),title:"1. Understanding of the Brief",body:"We understand that your primary growth focus is building consistent brand presence, driving quality lead engagement, and scaling commercial outreach across digital platforms with high-caliber creative execution."},{id:N(),title:"2. Strategic Approach",body:`- Insight First, Story Always: Every deliverable is anchored in data, competitive analysis, and audience intent.
- Integrated Workflow: Unified management across design, copywriting, video, SEO, and performance tracking.
- Clear Governance: Regular weekly status updates and comprehensive monthly review calls.`},{id:N(),title:"3. Onboarding & First 30 Days",body:`- Days 1–7: Handover, admin access setup, brand asset audit, and team introduction.
- Days 8–15: Finalization of content calendar, tone guidelines, and campaign messaging framework.
- Days 16–30: Full publishing cadence, live monitoring, and delivery of month-one performance report.`},{id:N(),title:"4. Why CI360 Degrees",body:"With over 25+ years of strategic leadership (founded in 2017) and 60+ global mandates, CI360 Degrees pairs senior-level marketing counsel with responsive, AI-enabled production agility."}],heads:[],onRequest:[{id:N(),item:"Video Shoot Day (Director + Crew)",how:"On-location production day with lighting and sound",price:"₹45,000 per day"},{id:N(),item:"Custom Corporate Website (12 pages)",how:"WordPress/Elementor responsive website with SEO setup",price:"₹1,00,000 one-time"}],exclusions:"Paid media ad spend, external celebrity talent fees, venue/travel expenses outside city, and government filing fees.",term:6,termDisc:5,discount:0,gst:18,pricingView:"heads",retainerPay:"m-adv",retainerCustom:"",projectPay:"5050",milestones:[{pct:50,label:"Advance on signing"},{pct:50,label:"On final delivery and launch"}],retainerIncl:["A dedicated account lead and named team","A monthly content calendar, shared for approval before the month begins","A monthly performance report by the 5th working day, with a review call","A quarterly strategy review and plan reset","Replies to comments and messages within 1 business day","Two revision rounds on every deliverable","Use of CI360’s design, scheduling and AI tool stack at no extra cost"],team:(s.team||[]).slice(0,4).map(r=>({id:N(),memberId:r.id,name:r.name,role:r.engRole||r.role,resp:r.resp||""})),clientTeam:"Point of Contact for Approvals: TBD on signing",cadence:`**How we work together**
- Weekly 30-minute status call with the client’s designated point of contact.
- Shared tracker for requests, deliverables, and revisions.
- Monthly performance report by the 5th working day followed by an executive review call.
- Quarterly strategy review to reset targets and priorities.`,escalation:[{name:"Mansi Bagdai",role:"Strategy & Growth Lead, Account Lead",when:"Day-to-day operational matters not resolved within 1 working day"},{name:"Urna Banerji",role:"COO",when:"Delivery, quality, or timeline concerns not resolved within 2 working days"},{name:"Pramit Ghosh",role:"Founder & CEO",when:"Commercial or strategic relationship matters, or anything unresolved at Level 2"}],terms:(s.termsLib||[]).map(r=>({...r,on:r.tag==="general"})),clientNeeds:["A signed copy of this proposal, and purchase order if required by client policies.","Official start date and a designated primary point of contact with approver details.","Billing information: Legal entity name, registered office address, and GSTIN."],choices:[{id:N(),label:"Proposed Start Date",options:[]},{id:N(),label:"Billing Entity Name & GSTIN",options:[]}],openItems:[],notes:"",status:"draft",approval:null,approvalHistory:[],shareId:null,sharedVersion:0};const a=this.rateDoc&&this.rateDoc.packages&&this.rateDoc.packages[0];a&&this.activeProposal.heads.push(this.createHeadFromPackage(a)),this.activeStep="brief",this.currentView="editor",this.render()}createHeadFromPackage(t){const e=(t.components||[]).map(n=>{const s=this.rateDoc&&this.rateDoc.items&&this.rateDoc.items.find(a=>a.id===n.rateId);return s?{id:N(),rateId:s.id,service:s.service,desc:s.inc||"",unit:s.unit||"item",qty:y(n.qty)||1,rate:y(s.inr)||0,slabs:ne(s.slabs||[])}:null}).filter(Boolean);return{id:N(),packageId:t.id,title:t.service,billing:t.billing||"monthly",desc:t.desc||"",exc:t.exc||"",mult:y(t.mult)||1,multLabel:t.multLabel||"brands",packDisc:y(t.packDisc)||0,fixed:0,lines:e}}async openProposal(t){try{const e=await B(`/proposals/${t}`);this.activeProposal=e,this.activeStep="scope",this.currentView="editor",this.render()}catch(e){alert("Could not open proposal: "+e.message)}}async saveActiveProposal(t=!1){if(!this.activeProposal)return;this.saving=!0;const e=this.container.querySelector("#ps-save-state");e&&(e.textContent="Saving…");try{let n;this.activeProposal._id?n=await ee(`/proposals/${this.activeProposal._id}`,this.activeProposal):(n=await _("/proposals",this.activeProposal),this.activeProposal._id=n._id),this.activeProposal=n;const s=this.proposals.findIndex(a=>a._id===n._id);s>=0?this.proposals[s]=n:this.proposals.unshift(n),e&&(e.textContent="Saved ✓")}catch(n){e&&(e.textContent="Save failed: "+n.message)}finally{this.saving=!1}}scheduleAutoSave(){clearTimeout(this.saveTimeout);const t=this.container.querySelector("#ps-save-state");t&&(t.textContent="Unsaved changes"),this.saveTimeout=setTimeout(()=>this.saveActiveProposal(!0),1200)}renderProposalEditor(t){const e=this.activeProposal;if(!e)return this.render();const n=X(e),s=this.rateDoc&&this.rateDoc.settings||{},a=[["brief","1. Client & Brief"],["scope","2. Scope & Pricing"],["content","3. Content Narrative"],["team","4. Team & Governance"],["terms","5. Terms & Payment"],["approve","6. Approval & Release"]],r=e.approval&&e.approval.decision==="approved"&&e.approval.pinVerified;t.innerHTML=`
      <div class="ps-editor-container">
        <!-- Editor Navigation Header -->
        <div class="card ps-editor-topbar">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <button class="btn small" id="ps-editor-back-btn">← Back to Proposals</button>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">
              ${l(e.client||"Untitled Client")} — ${l(e.title||"Proposal")}
            </h3>
            <span class="muted small" style="font-family:var(--font-mono);">(${l(e.ref)})</span>
            ${this.renderStatusBadge(e)}
          </div>

          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <div id="ps-save-state" class="muted small" style="font-weight:600;">Saved ✓</div>
            <div style="text-align:right;margin-right:4px;">
              <span class="muted small">Contract Value:</span>
              <strong style="color:var(--brand-600);font-size:16px;margin-left:4px;">${C(n.contract,e.currency)}</strong>
            </div>

            <!-- PROPER PREVIEW BUTTON -->
            <button class="btn gold" id="ps-open-preview-modal-btn" style="font-weight:700;display:inline-flex;align-items:center;gap:8px;">
              <span>👁️ Preview Proposal Document</span>
            </button>

            <button class="btn small" id="ps-preview-pdf-btn" ${r?"":'disabled title="Requires Admin PIN Approval"'}>
              📄 Download PDF
            </button>
            <button class="btn small" id="ps-preview-docx-btn" ${r?"":'disabled title="Requires Admin PIN Approval"'}>
              📝 Word
            </button>
            <button class="btn small primary" id="ps-manual-save-btn">Save Changes</button>
          </div>
        </div>

        <!-- 6-Step Tab Bar -->
        <div class="ps-steps-bar card" style="padding:6px;display:flex;gap:4px;overflow-x:auto;">
          ${a.map(([p,h])=>`
            <button class="ps-step-btn ${this.activeStep===p?"active":""}" data-step="${p}">
              ${h}
              ${p==="approve"&&r?" 🔐":""}
            </button>
          `).join("")}
        </div>

        <!-- Full Width Step Content (Spacious, Proper UI) -->
        <div class="ps-step-content-full" id="ps-step-pane"></div>
      </div>
    `,t.querySelector("#ps-editor-back-btn").onclick=()=>{this.currentView="list",this.render()},t.querySelector("#ps-manual-save-btn").onclick=()=>this.saveActiveProposal();const u=t.querySelector("#ps-open-preview-modal-btn");u&&(u.onclick=()=>this.showPreviewModal()),t.querySelectorAll("[data-step]").forEach(p=>{p.onclick=()=>{this.activeStep=p.dataset.step,this.renderProposalEditor(t)}});const d=t.querySelector("#ps-preview-docx-btn");d&&(d.onclick=()=>G(e,s,d));const i=t.querySelector("#ps-preview-pdf-btn");i&&(i.onclick=()=>W(e,s,i));const c=t.querySelector("#ps-step-pane");this.activeStep==="brief"?this.renderStepBrief(c):this.activeStep==="scope"?this.renderStepScope(c):this.activeStep==="content"?this.renderStepContent(c):this.activeStep==="team"?this.renderStepTeam(c):this.activeStep==="terms"?this.renderStepTerms(c):this.activeStep==="approve"&&this.renderStepApprove(c)}showPreviewModal(){const t=this.activeProposal;if(!t)return;const e=this.rateDoc&&this.rateDoc.settings||{},n=t.approval&&t.approval.decision==="approved"&&t.approval.pinVerified,s=document.querySelector(".ps-preview-modal-overlay");s&&s.remove();const a=document.createElement("div");a.className="modal-backdrop ps-preview-modal-overlay",a.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,0.8);backdrop-filter:blur(6px);display:flex;flex-direction:column;z-index:99999;padding:0;animation:modalFade 0.2s ease;",a.innerHTML=`
      <!-- Modal Top Control Bar -->
      <div style="background:#0F2A4A;color:#FFFFFF;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.12);flex-shrink:0;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:22px;">📄</span>
          <div>
            <strong style="font-size:16px;color:#FFFFFF;">${l(t.client||"Client")} — ${l(t.title||"Proposal")}</strong>
            <span class="muted small" style="color:#AEBBCD;margin-left:8px;font-family:var(--font-mono);">(${l(t.ref)})</span>
          </div>
          ${n?'<span class="badge green" style="background:#059669;color:#fff;">🔐 PIN Approved</span>':'<span class="badge amber" style="background:#D97706;color:#fff;">Draft / Unapproved</span>'}
        </div>

        <div style="display:flex;align-items:center;gap:10px;">
          <button class="btn small" id="ps-modal-export-docx" ${n?"":'disabled title="Requires Admin PIN Approval"'} style="background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.25);">
            📝 Download Word (.docx)
          </button>
          <button class="btn small gold" id="ps-modal-export-pdf" ${n?"":'disabled title="Requires Admin PIN Approval"'} style="font-weight:700;">
            📄 Download PDF
          </button>
          <button class="btn small" id="ps-close-preview-modal" style="background:rgba(255,255,255,0.2);color:#fff;border-color:transparent;font-weight:700;margin-left:6px;">
            ✕ Close Preview
          </button>
        </div>
      </div>

      <!-- Scrollable Centered Document Container -->
      <div style="flex:1;overflow-y:auto;padding:36px 16px;background:#DCE1E8;">
        <div style="max-width:820px;margin:0 auto;box-shadow:0 8px 30px rgba(0,0,0,0.25);border-radius:6px;overflow:hidden;" id="ps-modal-live-paper">
          ${te(J(t,e))}
        </div>
      </div>
    `,document.body.append(a),a.querySelector("#ps-close-preview-modal").onclick=()=>a.remove();const r=a.querySelector("#ps-modal-export-docx");r&&(r.onclick=()=>G(t,e,r));const u=a.querySelector("#ps-modal-export-pdf");u&&(u.onclick=()=>W(t,e,u));const d=i=>{i.key==="Escape"&&(a.remove(),window.removeEventListener("keydown",d))};window.addEventListener("keydown",d)}refreshLivePaper(){const t=document.querySelector("#ps-modal-live-paper");if(t&&this.activeProposal){const e=this.rateDoc&&this.rateDoc.settings||{};t.innerHTML=te(J(this.activeProposal,e))}}renderStepBrief(t){const e=this.activeProposal;t.innerHTML=`
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Client Profile & Proposal Information</h3>
        <div class="grid grid-2">
          <div>
            <label class="label">Client Organisation <span style="color:var(--red-500)">*</span></label>
            <input type="text" class="input" id="ps-f-client" value="${l(e.client)}" placeholder="e.g. Times of India / Hilton">
          </div>
          <div>
            <label class="label">Short Name in Narrative</label>
            <input type="text" class="input" id="ps-f-clientShort" value="${l(e.clientShort)}" placeholder="e.g. TOI">
          </div>
          <div>
            <label class="label">Primary Contact Person</label>
            <input type="text" class="input" id="ps-f-contact" value="${l(e.contact)}" placeholder="e.g. Rajesh Sharma">
          </div>
          <div>
            <label class="label">Contact Designation / Title</label>
            <input type="text" class="input" id="ps-f-contactRole" value="${l(e.contactRole)}" placeholder="e.g. VP Marketing">
          </div>
          <div>
            <label class="label">Industry / Sector</label>
            <input type="text" class="input" id="ps-f-industry" value="${l(e.industry)}" placeholder="e.g. Hospitality / Fintech">
          </div>
          <div>
            <label class="label">Target Market / Geography</label>
            <input type="text" class="input" id="ps-f-location" value="${l(e.location)}" placeholder="e.g. India & GCC">
          </div>
          <div>
            <label class="label">Pricing Currency</label>
            <select class="input" id="ps-f-currency">
              <option value="INR" ${e.currency==="INR"?"selected":""}>INR (₹) — Indian Rupee</option>
              <option value="USD" ${e.currency==="USD"?"selected":""}>USD ($) — US Dollar</option>
            </select>
          </div>
          <div>
            <label class="label">Proposal Date</label>
            <input type="date" class="input" id="ps-f-date" value="${l(e.date)}">
          </div>
          <div>
            <label class="label">Proposal Validity (Days)</label>
            <input type="number" class="input" id="ps-f-validity" value="${l(e.validity)}" min="1">
          </div>
          <div>
            <label class="label">Proposal Reference ID</label>
            <input type="text" class="input" id="ps-f-ref" value="${l(e.ref)}">
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 4px 0;">Client Brief & Strategic Requirements</h3>
        <p class="muted small" style="margin:0 0 12px 0;">Paste discovery notes, client requirements, RFP extracts, or RFQ scope items below.</p>
        <textarea class="input" id="ps-f-brief" rows="7" placeholder="Paste discovery call transcripts, client goals, expected deliverables, competitor benchmarks, or timelines...">${l(e.brief)}</textarea>
      </div>

      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Proposal Title & Narrative Cover</h3>
        <div class="grid grid-2">
          <div class="span2">
            <label class="label">Cover Title</label>
            <input type="text" class="input" id="ps-f-title" value="${l(e.title)}">
          </div>
          <div class="span2">
            <label class="label">Cover Subtitle</label>
            <input type="text" class="input" id="ps-f-subtitle" value="${l(e.subtitle)}">
          </div>
          <div class="span2">
            <label class="label">One-Line Executive Scope Summary</label>
            <textarea class="input" id="ps-f-oneLine" rows="2">${l(e.oneLine)}</textarea>
          </div>
        </div>
      </div>
    `;const n=(a,r,u=!1)=>{const d=t.querySelector(a);d&&(d.oninput=()=>{e[r]=u?y(d.value):d.value,this.scheduleAutoSave(),this.refreshLivePaper()})};n("#ps-f-client","client"),n("#ps-f-clientShort","clientShort"),n("#ps-f-contact","contact"),n("#ps-f-contactRole","contactRole"),n("#ps-f-industry","industry"),n("#ps-f-location","location"),n("#ps-f-date","date"),n("#ps-f-validity","validity",!0),n("#ps-f-ref","ref"),n("#ps-f-brief","brief"),n("#ps-f-title","title"),n("#ps-f-subtitle","subtitle"),n("#ps-f-oneLine","oneLine");const s=t.querySelector("#ps-f-currency");s&&(s.onchange=()=>{e.currency=s.value,e.currency==="USD"&&e.gst===18&&(e.gst=0),e.currency==="INR"&&!e.gst&&(e.gst=18),this.repriceAllScopeLines(),this.scheduleAutoSave(),this.refreshLivePaper()})}repriceAllScopeLines(){const t=this.activeProposal;!t||!this.rateDoc||(t.heads||[]).forEach(e=>{(e.lines||[]).forEach(n=>{const s=this.rateDoc.items.find(a=>a.id===n.rateId);s&&(n.rate=y(t.currency==="USD"?s.usd:s.inr))})})}renderStepScope(t){const e=this.activeProposal,n=this.rateDoc&&this.rateDoc.items||[],s=this.rateDoc&&this.rateDoc.packages||[];t.innerHTML=`
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Heads of Work & Deliverables</h3>
            <p class="muted small" style="margin:0;">Add packaged service suites or custom line items. Volume discounts apply automatically as quantities scale.</p>
          </div>
          <div style="display:flex;gap:8px;">
            <select class="input" id="ps-add-pkg-select" style="width:200px;">
              <option value="">+ Add Package...</option>
              ${s.map(p=>`<option value="${l(p.id)}">${l(p.service)} (${p.billing})</option>`).join("")}
            </select>
            <select class="input" id="ps-add-svc-select" style="width:200px;">
              <option value="">+ Add Single Item...</option>
              ${n.map(p=>`<option value="${l(p.id)}">${l(p.category)}: ${l(p.service)}</option>`).join("")}
            </select>
            <button class="btn small" id="ps-add-blank-head-btn">+ Blank Head</button>
          </div>
        </div>

        <div id="ps-heads-list">
          ${(e.heads||[]).map((p,h)=>this.renderHeadCardHTML(p,h)).join("")}
        </div>
      </div>

      <!-- Commercials & Discounts -->
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Commercial Terms, Discounts & Taxes</h3>
        <div class="grid grid-4">
          <div>
            <label class="label">Retainer Term (Months)</label>
            <input type="number" class="input" id="ps-f-term" value="${l(e.term)}" min="1">
          </div>
          <div>
            <label class="label">Term Commitment Discount (%)</label>
            <input type="number" class="input" id="ps-f-termDisc" value="${l(e.termDisc)}" min="0" max="90" step="any">
          </div>
          <div>
            <label class="label">Additional Commercial Discount (%)</label>
            <input type="number" class="input" id="ps-f-discount" value="${l(e.discount)}" min="0" max="90" step="any">
          </div>
          <div>
            <label class="label">${e.currency==="INR"?"GST Tax Rate (%)":"Tax Rate (%)"}</label>
            <input type="number" class="input" id="ps-f-gst" value="${l(e.gst)}" min="0" step="any">
          </div>
          <div class="span4">
            <label class="label">Pricing Breakdown Displayed to Client</label>
            <div style="display:flex;gap:20px;margin-top:6px;">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
                <input type="radio" name="ps-pricing-view" value="heads" ${e.pricingView==="heads"?"checked":""}>
                <span>Head-wise Subtotals (Recommended)</span>
              </label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
                <input type="radio" name="ps-pricing-view" value="overall" ${e.pricingView==="overall"?"checked":""}>
                <span>One Overall Lump Sum</span>
              </label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
                <input type="radio" name="ps-pricing-view" value="itemised" ${e.pricingView==="itemised"?"checked":""}>
                <span>Fully Itemised Line Details</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Out of Scope & Exclusions -->
      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Available on Request & Scope Exclusions</h3>
        <label class="label">Scope Exclusions (Items Not Included)</label>
        <textarea class="input" id="ps-f-exclusions" rows="2" placeholder="e.g. Media ad spend, commercial talent fees, travel expenses...">${l(e.exclusions)}</textarea>
      </div>
    `;const a=t.querySelector("#ps-add-pkg-select");a&&(a.onchange=()=>{const p=a.value;if(!p)return;const h=s.find(w=>w.id===p);h&&(e.heads.push(this.createHeadFromPackage(h)),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper())});const r=t.querySelector("#ps-add-svc-select");r&&(r.onchange=()=>{const p=r.value;if(!p)return;const h=n.find(w=>w.id===p);if(h){const w=/month|handle set|platform/.test(h.unit)||/month/.test(h.note||"");e.heads.push({id:N(),packageId:null,title:h.service,billing:w?"monthly":"one-time",desc:"",exc:h.exc||"",mult:1,multLabel:"brands",packDisc:0,fixed:0,lines:[{id:N(),rateId:h.id,service:h.service,desc:h.inc||"",unit:h.unit||"item",qty:1,rate:y(e.currency==="USD"?h.usd:h.inr),slabs:ne(h.slabs||[])}]}),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}});const u=t.querySelector("#ps-add-blank-head-btn");u&&(u.onclick=()=>{e.heads.push({id:N(),packageId:null,title:"Custom Scope Area",billing:"monthly",desc:"",exc:"",mult:1,multLabel:"brands",packDisc:0,fixed:0,lines:[]}),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}),this.bindHeadEvents(t);const d=t.querySelector("#ps-f-term");d&&(d.oninput=()=>{e.term=Math.max(1,y(d.value)),e.term>=12?e.termDisc=10:e.term>=6?e.termDisc=5:e.termDisc=0;const p=t.querySelector("#ps-f-termDisc");p&&(p.value=e.termDisc),this.scheduleAutoSave(),this.refreshLivePaper()});const i=(p,h)=>{const w=t.querySelector(p);w&&(w.oninput=()=>{e[h]=y(w.value),this.scheduleAutoSave(),this.refreshLivePaper()})};i("#ps-f-termDisc","termDisc"),i("#ps-f-discount","discount"),i("#ps-f-gst","gst"),t.querySelectorAll('input[name="ps-pricing-view"]').forEach(p=>{p.onchange=()=>{e.pricingView=p.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const c=t.querySelector("#ps-f-exclusions");c&&(c.oninput=()=>{e.exclusions=c.value,this.scheduleAutoSave(),this.refreshLivePaper()})}renderHeadCardHTML(t,e){const n=this.activeProposal,s=ue(t);return`
      <div class="headcard" data-head-id="${l(t.id)}" style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:16px;margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap;">
          <input type="text" class="input hc-title" data-head-field="title" value="${l(t.title)}" style="font-weight:700;flex:1;min-width:200px;">
          <select class="input" data-head-field="billing" style="width:130px;">
            <option value="monthly" ${t.billing==="monthly"?"selected":""}>Monthly</option>
            <option value="one-time" ${t.billing!=="monthly"?"selected":""}>One-time</option>
          </select>
          <div style="display:inline-flex;gap:4px;">
            <button class="btn small" data-head-action="up" ${e===0?"disabled":""} title="Move Up">↑</button>
            <button class="btn small" data-head-action="down" ${e===n.heads.length-1?"disabled":""} title="Move Down">↓</button>
            <button class="btn small danger" data-head-action="remove" title="Remove Head">✕</button>
          </div>
        </div>

        <div style="display:flex;gap:14px;flex-wrap:wrap;font-size:13px;margin-bottom:12px;align-items:center;">
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Multiplier:</span>
            <input type="number" class="input" data-head-field="mult" value="${l(t.mult||1)}" min="1" style="width:65px;">
            <input type="text" class="input" data-head-field="multLabel" value="${l(t.multLabel||"brands")}" style="width:100px;">
          </label>
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Package Disc (%):</span>
            <input type="number" class="input" data-head-field="packDisc" value="${l(t.packDisc||0)}" min="0" max="90" style="width:75px;">
          </label>
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Fixed Override:</span>
            <input type="number" class="input" data-head-field="fixed" value="${l(t.fixed||"")}" placeholder="None" style="width:110px;">
          </label>
        </div>

        <!-- Lines Table -->
        <div class="scroll" style="margin-bottom:12px;overflow-x:auto;">
          <table class="table" style="width:100%;min-width:920px;margin:0;font-size:13px;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th style="min-width:230px;">Service Deliverable</th>
                <th style="min-width:320px;">Inclusions / Description</th>
                <th style="width:85px;text-align:center;">Qty</th>
                <th style="width:100px;">Unit</th>
                <th style="width:125px;text-align:right;">Rate</th>
                <th style="width:130px;text-align:right;">Net Amount</th>
                <th style="width:44px;text-align:center;"></th>
              </tr>
            </thead>
            <tbody>
              ${(t.lines||[]).map(a=>{const r=y(a.qty)*y(a.rate),u=ce(a.slabs,y(a.qty)*(y(t.mult)||1)),d=r*(1-u/100);return`
                  <tr data-line-id="${l(a.id)}">
                    <td><input type="text" class="input" data-line-field="service" value="${l(a.service)}" style="font-weight:600;width:100%;"></td>
                    <td><input type="text" class="input" data-line-field="desc" value="${l(a.desc)}" placeholder="What this line covers..." style="width:100%;"></td>
                    <td><input type="number" class="input" data-line-field="qty" value="${l(a.qty)}" min="0" style="text-align:center;width:100%;font-weight:700;font-variant-numeric:tabular-nums;"></td>
                    <td><input type="text" class="input" data-line-field="unit" value="${l(a.unit)}" style="width:100%;"></td>
                    <td><input type="number" class="input" data-line-field="rate" value="${l(a.rate)}" min="0" style="text-align:right;width:100%;font-weight:700;font-variant-numeric:tabular-nums;"></td>
                    <td style="text-align:right;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap;padding:12px 10px;">
                      ${C(d,n.currency)}
                      ${u?`<div style="color:var(--green-600);font-size:11px;font-weight:500;">(${u}% vol disc)</div>`:""}
                    </td>
                    <td style="text-align:center;"><button class="btn small danger" data-line-action="remove" style="padding:6px 10px;line-height:1;" title="Remove deliverable">✕</button></td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <button class="btn small" data-head-action="add-line">+ Add Deliverable Line</button>
          <div style="font-size:13.5px;font-weight:700;color:var(--text-1);">
            Head Subtotal: <span style="color:var(--brand-600);">${C(s.net,n.currency)}</span>
            <span class="muted small" style="font-weight:400;">${t.billing==="monthly"?"/ month":" one-time"}</span>
          </div>
        </div>
      </div>
    `}bindHeadEvents(t){const e=this.activeProposal;t.querySelectorAll(".headcard").forEach((n,s)=>{const a=n.dataset.headId,r=e.heads.find(d=>d.id===a);if(!r)return;n.querySelectorAll("[data-head-field]").forEach(d=>{d.oninput=()=>{const i=d.dataset.headField;r[i]=d.type==="number"?y(d.value):d.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const u=n.querySelector('select[data-head-field="billing"]');u&&(u.onchange=()=>{r.billing=u.value,this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}),n.querySelectorAll("[data-head-action]").forEach(d=>{d.onclick=()=>{const i=d.dataset.headAction;i==="remove"?e.heads=e.heads.filter(c=>c.id!==a):i==="up"&&s>0?[e.heads[s-1],e.heads[s]]=[e.heads[s],e.heads[s-1]]:i==="down"&&s<e.heads.length-1?[e.heads[s+1],e.heads[s]]=[e.heads[s],e.heads[s+1]]:i==="add-line"&&r.lines.push({id:N(),rateId:"",service:"Custom Deliverable",desc:"",unit:"item",qty:1,rate:0,slabs:[]}),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}}),n.querySelectorAll("tr[data-line-id]").forEach(d=>{const i=d.dataset.lineId,c=r.lines.find(h=>h.id===i);if(!c)return;d.querySelectorAll("[data-line-field]").forEach(h=>{h.oninput=()=>{const w=h.dataset.lineField;c[w]=h.type==="number"?y(h.value):h.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const p=d.querySelector('[data-line-action="remove"]');p&&(p.onclick=()=>{r.lines=r.lines.filter(h=>h.id!==i),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()})})})}renderStepContent(t){const e=this.activeProposal;t.innerHTML=`
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Proposal Narrative Sections</h3>
            <p class="muted small" style="margin:0;">The core strategic story: Understanding, Strategic Approach, Implementation, and Credentials.</p>
          </div>
          <button class="btn small" id="ps-add-section-btn">+ Add Section</button>
        </div>

        <div id="ps-sections-list">
          ${(e.sections||[]).map((n,s)=>`
            <div class="card ps-sec-card" data-sec-id="${l(n.id)}" style="background:var(--bg-elevated);border:1px solid var(--border-sm);padding:14px;margin-bottom:12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <input type="text" class="input" data-sec-field="title" value="${l(n.title)}" style="font-weight:700;flex:1;">
                <button class="btn small danger" data-sec-action="remove">✕</button>
              </div>
              <textarea class="input" data-sec-field="body" rows="4" placeholder="Section body text... Use '- ' for bullet points.">${l(n.body)}</textarea>
            </div>
          `).join("")}
        </div>
      </div>
    `,t.querySelector("#ps-add-section-btn").onclick=()=>{e.sections.push({id:N(),title:"New Narrative Section",body:""}),this.scheduleAutoSave(),this.renderStepContent(t),this.refreshLivePaper()},t.querySelectorAll(".ps-sec-card").forEach(n=>{const s=n.dataset.secId,a=e.sections.find(i=>i.id===s);if(!a)return;const r=n.querySelector('[data-sec-field="title"]');r&&(r.oninput=()=>{a.title=r.value,this.scheduleAutoSave(),this.refreshLivePaper()});const u=n.querySelector('[data-sec-field="body"]');u&&(u.oninput=()=>{a.body=u.value,this.scheduleAutoSave(),this.refreshLivePaper()});const d=n.querySelector('[data-sec-action="remove"]');d&&(d.onclick=()=>{e.sections=e.sections.filter(i=>i.id!==s),this.scheduleAutoSave(),this.renderStepContent(t),this.refreshLivePaper()})})}renderStepTeam(t){const e=this.activeProposal,n=this.rateDoc&&this.rateDoc.settings&&this.rateDoc.settings.team||[],s=(this.personnel||[]).filter(i=>i.status!=="inactive"),a=[];s.forEach(i=>{a.push({id:"emp_"+i._id,name:i.name,role:i.duties||i.role||"Team Member",resp:i.duties?`Execution lead for ${i.duties}`:"Mandate execution and client deliverables"})}),n.forEach(i=>{a.some(c=>c.name.toLowerCase()===i.name.toLowerCase())||a.push({id:i.id,name:i.name,role:i.engRole||i.role||"Specialist",resp:i.resp||""})}),(!Array.isArray(e.escalation)||!e.escalation.length)&&(e.escalation=[{name:"Mansi Bagdai",role:"Strategy & Growth Lead, Account Lead",when:"Day-to-day operational matters not resolved within 1 working day"},{name:"Urna Banerji",role:"COO",when:"Delivery, quality, or timeline concerns not resolved within 2 working days"},{name:"Pramit Ghosh",role:"Founder & CEO",when:"Commercial or strategic relationship matters, or anything unresolved at Level 2"}]),t.innerHTML=`
      <!-- Named Team -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Named CI360 Account Team</h3>
            <p class="muted small" style="margin:0;">Select from all employees in your team (${s.length} available) or enter custom role assignments for this engagement.</p>
          </div>
          <button class="btn small" id="ps-add-team-btn">+ Add Team Member</button>
        </div>

        <div class="scroll">
          <table class="table" style="width:100%;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th style="width:230px;">Select Employee / Role</th>
                <th style="min-width:160px;">Name</th>
                <th style="min-width:180px;">Engagement Role</th>
                <th style="min-width:240px;">Responsibility</th>
                <th style="width:40px;"></th>
              </tr>
            </thead>
            <tbody>
              ${(e.team||[]).map(i=>`
                <tr data-team-id="${l(i.id)}">
                  <td>
                    <select class="input" data-t-select style="font-size:12.5px;">
                      <option value="">Select Employee...</option>
                      ${a.map(c=>`<option value="${l(c.id)}" ${i.memberId===c.id||i.name===c.name?"selected":""}>${l(c.name)} (${l(c.role)})</option>`).join("")}
                    </select>
                  </td>
                  <td><input type="text" class="input" data-t-field="name" value="${l(i.name)}" placeholder="Full Name"></td>
                  <td><input type="text" class="input" data-t-field="role" value="${l(i.role)}" placeholder="e.g. Account Lead"></td>
                  <td><input type="text" class="input" data-t-field="resp" value="${l(i.resp)}" placeholder="Specific ownership"></td>
                  <td><button class="btn small danger" data-t-action="remove" title="Remove member">✕</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Escalation Path Matrix -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">🚨 Escalation Path & SLA Matrix</h3>
            <p class="muted small" style="margin:0;">Define tiered contacts for client escalation with SLA conditions and resolution triggers.</p>
          </div>
          <button class="btn small" id="ps-add-escl-btn">+ Add Escalation Level</button>
        </div>

        <div class="scroll">
          <table class="table" style="width:100%;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th style="width:90px;">Tier</th>
                <th style="width:230px;">Select Employee</th>
                <th style="min-width:160px;">Contact Name</th>
                <th style="min-width:180px;">Designation / Title</th>
                <th style="min-width:240px;">When to Escalate (Trigger Condition / SLA)</th>
                <th style="width:40px;"></th>
              </tr>
            </thead>
            <tbody>
              ${e.escalation.map((i,c)=>`
                <tr data-escl-idx="${c}">
                  <td><span class="badge blue">Level ${c+1}</span></td>
                  <td>
                    <select class="input" data-e-select style="font-size:12.5px;">
                      <option value="">Select Employee...</option>
                      ${a.map(p=>`<option value="${l(p.name)}" ${i.name===p.name?"selected":""}>${l(p.name)} (${l(p.role)})</option>`).join("")}
                    </select>
                  </td>
                  <td><input type="text" class="input" data-e-field="name" value="${l(i.name||"")}" placeholder="Contact Name"></td>
                  <td><input type="text" class="input" data-e-field="role" value="${l(i.role||"")}" placeholder="Designation / Role"></td>
                  <td><input type="text" class="input" data-e-field="when" value="${l(i.when||"")}" placeholder="Trigger SLA or condition"></td>
                  <td><button class="btn small danger" data-e-action="remove" title="Remove level">✕</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Client Side Contacts -->
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 6px 0;">Client-Side Contacts & Approvers</h3>
        <p class="muted small" style="margin:0 0 10px 0;">Named client contacts responsible for briefs, feedback approvals, and commercial sign-offs.</p>
        <textarea class="input" id="ps-f-clientTeam" rows="2" placeholder="e.g. Content approval: Sachin Nagi; Commercial sign-off: Pramit Ghosh">${l(e.clientTeam)}</textarea>
      </div>

      <!-- Meeting Cadence -->
      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 6px 0;">How We Work Together (Governance & Meeting Cadence)</h3>
        <p class="muted small" style="margin:0 0 10px 0;">Regular touchpoints, review calls, content calendar approval flow, and reporting rhythm.</p>
        <textarea class="input" id="ps-f-cadence" rows="4">${l(e.cadence)}</textarea>
      </div>
    `,t.querySelector("#ps-add-team-btn").onclick=()=>{e.team.push({id:N(),memberId:"",name:"",role:"",resp:""}),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()},t.querySelectorAll("tr[data-team-id]").forEach(i=>{const c=i.dataset.teamId,p=e.team.find(v=>v.id===c);if(!p)return;const h=i.querySelector("[data-t-select]");h&&(h.onchange=()=>{const v=a.find(I=>I.id===h.value);v?(p.memberId=v.id,p.name=v.name,p.role=v.role,p.resp=v.resp||""):p.memberId="",this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()}),i.querySelectorAll("[data-t-field]").forEach(v=>{v.oninput=()=>{p[v.dataset.tField]=v.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const w=i.querySelector('[data-t-action="remove"]');w&&(w.onclick=()=>{e.team=e.team.filter(v=>v.id!==c),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()})});const r=t.querySelector("#ps-add-escl-btn");r&&(r.onclick=()=>{e.escalation.push({name:"",role:"",when:""}),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()}),t.querySelectorAll("tr[data-escl-idx]").forEach(i=>{const c=Number(i.dataset.esclIdx),p=e.escalation[c];if(!p)return;const h=i.querySelector("[data-e-select]");h&&(h.onchange=()=>{const v=a.find(I=>I.name===h.value);v&&(p.name=v.name,p.role=v.role),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()}),i.querySelectorAll("[data-e-field]").forEach(v=>{v.oninput=()=>{p[v.dataset.eField]=v.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const w=i.querySelector('[data-e-action="remove"]');w&&(w.onclick=()=>{e.escalation.splice(c,1),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()})});const u=t.querySelector("#ps-f-clientTeam");u&&(u.oninput=()=>{e.clientTeam=u.value,this.scheduleAutoSave(),this.refreshLivePaper()});const d=t.querySelector("#ps-f-cadence");d&&(d.oninput=()=>{e.cadence=d.value,this.scheduleAutoSave(),this.refreshLivePaper()})}renderStepTerms(t){const e=this.activeProposal;t.innerHTML=`
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Payment Terms & Schedules</h3>
        <div class="grid grid-2">
          <div>
            <label class="label">Retainer Payment Schedule</label>
            <select class="input" id="ps-f-retainerPay">
              <option value="m-adv" ${e.retainerPay==="m-adv"?"selected":""}>Monthly in advance on the 1st</option>
              <option value="m-arr" ${e.retainerPay==="m-arr"?"selected":""}>Monthly in arrears, net 15 days</option>
              <option value="q-adv" ${e.retainerPay==="q-adv"?"selected":""}>Quarterly in advance (3% discount)</option>
              <option value="term-adv" ${e.retainerPay==="term-adv"?"selected":""}>Full term in advance (5% discount)</option>
            </select>
          </div>
          <div>
            <label class="label">One-time Work Milestone Schedule</label>
            <select class="input" id="ps-f-projectPay">
              <option value="5050" ${e.projectPay==="5050"?"selected":""}>50% advance, 50% on delivery</option>
              <option value="100" ${e.projectPay==="100"?"selected":""}>100% advance (3% discount)</option>
              <option value="403030" ${e.projectPay==="403030"?"selected":""}>40% / 30% / 30% milestones</option>
              <option value="304030" ${e.projectPay==="304030"?"selected":""}>30% / 40% / 30% milestones</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 8px 0;">What We Need from Client to Start</h3>
        <textarea class="input" id="ps-f-clientNeeds" rows="4" placeholder="One requirement per line...">${l((e.clientNeeds||[]).join(`
`))}</textarea>
      </div>

      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Legal Terms & Clauses Included</h3>
        <div style="display:grid;gap:8px;">
          ${(e.terms||[]).map(r=>`
            <label class="card" style="padding:10px 14px;display:flex;align-items:flex-start;gap:10px;cursor:pointer;background:var(--bg-elevated);border:1px solid var(--border-sm);margin:0;">
              <input type="checkbox" data-term-id="${l(r.id)}" ${r.on?"checked":""} style="margin-top:4px;">
              <div>
                <strong style="font-size:13.5px;color:var(--text-1);">${l(r.title)}</strong>
                <p class="muted small" style="margin:2px 0 0 0;">${l(r.text)}</p>
              </div>
            </label>
          `).join("")}
        </div>
      </div>
    `;const n=t.querySelector("#ps-f-retainerPay");n&&(n.onchange=()=>{e.retainerPay=n.value,this.scheduleAutoSave(),this.refreshLivePaper()});const s=t.querySelector("#ps-f-projectPay");s&&(s.onchange=()=>{e.projectPay=s.value,this.scheduleAutoSave(),this.refreshLivePaper()});const a=t.querySelector("#ps-f-clientNeeds");a&&(a.oninput=()=>{e.clientNeeds=a.value.split(`
`).map(r=>r.trim()).filter(Boolean),this.scheduleAutoSave(),this.refreshLivePaper()}),t.querySelectorAll("input[data-term-id]").forEach(r=>{r.onchange=()=>{const u=e.terms.find(d=>d.id===r.dataset.termId);u&&(u.on=r.checked,this.scheduleAutoSave(),this.refreshLivePaper())}})}renderStepApprove(t){const e=this.activeProposal,n=e.approval&&e.approval.decision==="approved"&&e.approval.pinVerified,s=e.status==="pending",a=e.shareId?`${window.location.origin}/proposal?p=${e.shareId}`:"";t.innerHTML=`
      <!-- Admin PIN Status Card -->
      <div class="card" style="margin-bottom:16px;border-left:4px solid ${n?"var(--green-500)":s?"var(--amber-500)":"var(--border-md)"}">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="display:flex;align-items:center;gap:8px;">
              <h3 style="font-size:18px;font-weight:800;color:var(--text-1);margin:0;">
                Internal Admin Approval & Sign-off
              </h3>
              ${n?'<span class="badge green">🔐 VERIFIED WITH ADMIN PIN</span>':s?'<span class="badge amber">⏳ AWAITING ADMIN PIN</span>':'<span class="badge gray">DRAFT (UNAPPROVED)</span>'}
            </div>
            <p class="muted small" style="margin:4px 0 0;">
              Proposals must be signed off by an authorized admin using their secure PIN before Word/PDF downloads or client links can be released.
            </p>
          </div>

          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
            <button class="btn" id="ps-step6-preview-btn" style="font-weight:700;">
              👁️ Preview Proposal Document
            </button>
            ${this.isAdmin?`
              ${n?`
                <button class="btn" id="ps-btn-reauthorize-pin">
                  🔄 Re-authorize / Sign Again
                </button>
              `:`
                <button class="btn gold" id="ps-btn-approve-pin" style="font-weight:700;">
                  🔐 Authorize & Approve with Admin PIN
                </button>
              `}
            `:`
              ${n?`
                <span class="badge green" style="font-size:13px;padding:7px 14px;font-weight:700;">🔐 Admin Approved</span>
              `:`
                ${s?`
                  <button class="btn" disabled style="font-weight:700;color:var(--amber-500);background:var(--bg-elevated);">
                    ⏳ Submitted for Admin Sign-off
                  </button>
                `:`
                  <button class="btn gold" id="ps-btn-emp-submit" style="font-weight:700;">
                    📤 Submit for Admin Approval
                  </button>
                `}
              `}
            `}
          </div>
        </div>

        ${n?`
          <div style="margin-top:14px;padding:12px 16px;background:var(--green-50, rgba(16,185,129,0.08));border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-md);">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:20px;">🛡️</span>
              <div>
                <strong style="color:var(--green-600);font-size:14px;">Officially Approved by Admin</strong>
                <div class="small" style="color:var(--text-2);">
                  Sign-off by <strong>${l(e.approval.approverName||"Admin")}</strong>
                  (${l(e.approval.approverEmail||"admin")}) on <strong>${O(e.approval.at)}</strong>
                </div>
                ${e.approval.note?`<div class="small muted" style="margin-top:4px;">“${l(e.approval.note)}”</div>`:""}
              </div>
            </div>
          </div>
        `:s?`
          <div style="margin-top:14px;padding:12px 16px;background:var(--amber-50, rgba(245,158,11,0.08));border:1px solid rgba(245,158,11,0.25);border-radius:var(--r-md);font-size:13.5px;color:var(--amber-600);">
            ⏳ This proposal has been submitted and is currently awaiting Admin PIN authorization. Once an Admin reviews and approves it, client release will be unlocked.
          </div>
        `:`
          <div style="margin-top:14px;padding:12px 16px;background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-md);font-size:13.5px;color:var(--text-2);">
            📝 <strong>Employee Draft Mode:</strong> Any team member can design deliverables and commercial pricing. Click <strong>Submit for Admin Approval</strong> when ready. Only an authorized Admin can enter their secure PIN to approve and release the proposal.
          </div>
        `}
      </div>

      <!-- Release & Sharing Card -->
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 6px 0;">Client Release & Online Share Link</h3>
        <p class="muted small" style="margin:0 0 14px 0;">Proposals must be approved by an Admin with their secure PIN before being released to clients.</p>

        ${e.shareId?`
          <div style="margin-bottom:14px;">
            <label class="label">Live Client Link (Version ${e.sharedVersion})</label>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <input type="text" class="input" id="ps-share-link-input" readonly value="${l(a)}" style="flex:1;min-width:240px;">
              <button class="btn" id="ps-copy-link-btn">📋 Copy Link</button>
              <a href="/proposal?p=${l(e.shareId)}" target="_blank" class="btn">👁️ Open View</a>
            </div>
          </div>

          <!-- Non-Portal / Offline Client Direct Download Section -->
          <div style="margin-bottom:16px;padding:14px 16px;background:var(--bg-elevated);border-radius:var(--r-md);border:1px solid var(--border-sm);">
            <div style="font-weight:700;color:var(--text-1);margin-bottom:4px;display:flex;align-items:center;gap:6px;">
              <span>💾 Client Direct Download Options</span>
              <span class="badge blue" style="font-size:11px;">If client is not registered on portal</span>
            </div>
            <p class="muted small" style="margin:0 0 12px 0;">If the client does not have a CI360 portal account, download the file directly or copy the public download link to send via email/WhatsApp:</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="btn" id="ps-step6-dl-pdf">📄 Download PDF</button>
              <button class="btn" id="ps-step6-dl-word">📝 Download Word (.docx)</button>
              <button class="btn ghost" id="ps-step6-copy-pdf-link">🔗 Copy Direct PDF Link</button>
            </div>
          </div>
        `:""}

        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          ${this.isAdmin?`
            <button class="btn primary" id="ps-btn-release-pin" ${n?"":'disabled title="Approve with PIN first"'}>
              🚀 ${e.shareId?"Update & Release New Version to Client":"Release Proposal to Client"}
            </button>
            <span class="muted small">
              ${n?"Unlocked ✓ Ready to release with Admin PIN.":"🔒 Unlocks after Admin PIN approval."}
            </span>
          `:`
            ${e.shareId?`
              <span class="badge green" style="font-size:13px;padding:6px 12px;">🚀 Released to Client by Admin</span>
            `:`
              <button class="btn" disabled style="opacity:0.6;cursor:not-allowed;">
                🔒 Release Proposal to Client (Admin Only)
              </button>
              <span class="muted small">
                ${n?"Admin must authorize initial release to client.":"Requires Admin PIN approval before release."}
              </span>
            `}
          `}
        </div>

        ${e.clientResponse&&e.clientResponse.decision?`
          <div style="margin-top:16px;padding:14px;border-radius:var(--r-md);background:${e.clientResponse.decision==="approved"?"var(--green-50, rgba(16,185,129,0.1))":"var(--amber-50, rgba(245,158,11,0.1))"};border:1px solid ${e.clientResponse.decision==="approved"?"rgba(16,185,129,0.3)":"rgba(245,158,11,0.3)"}">
            <strong style="color:${e.clientResponse.decision==="approved"?"var(--green-600)":"var(--amber-600)"}">
              ${e.clientResponse.decision==="approved"?"🎉 Client Approved Online":"⚠️ Client Requested Changes"}
            </strong>
            <div class="small muted" style="margin-top:2px;">
              Responded by ${l(e.clientResponse.name)} (${l(e.clientResponse.role||"Client")}) on ${O(e.clientResponse.at)}
            </div>
            ${e.clientResponse.comment?`<p style="margin:8px 0 0 0;font-size:13.5px;">“${l(e.clientResponse.comment)}”</p>`:""}
          </div>
        `:""}
      </div>

      <!-- Immutable Audit Log Table for this Proposal -->
      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 4px 0;">🛡️ Proposal Action & Admin PIN Audit Trail</h3>
        <p class="muted small" style="margin:0 0 12px 0;">Complete tamper-evident log recording admin identity, date, time, and authorized actions.</p>

        <div class="scroll">
          <table class="table" style="width:100%;font-size:13px;margin:0;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th>Action Performed</th>
                <th>Admin Identity</th>
                <th>Role</th>
                <th>Date & Time</th>
                <th>PIN Verified</th>
                <th>Content Hash</th>
                <th>Notes / Memo</th>
              </tr>
            </thead>
            <tbody>
              ${e.approvalHistory&&e.approvalHistory.length?e.approvalHistory.slice().reverse().map(v=>`
                <tr>
                  <td><strong style="color:var(--text-1);">${l(v.action)}</strong></td>
                  <td>${l(v.adminName)} <span class="muted small">(${l(v.adminEmail||"admin")})</span></td>
                  <td><span class="badge gray">${l(v.adminRole||"admin")}</span></td>
                  <td style="white-space:nowrap;">${O(v.timestamp)}</td>
                  <td>${v.pinVerified?'<span class="badge green">🔐 Verified</span>':'<span class="badge gray">—</span>'}</td>
                  <td><code style="font-size:11px;background:var(--bg-elevated);padding:2px 4px;border-radius:4px;">${l((v.hash||"").slice(0,8))}</code></td>
                  <td class="muted small">${l(v.note||"—")}</td>
                </tr>
              `).join(""):`
                <tr><td colspan="7" class="muted" style="text-align:center;padding:18px;">No audit events recorded yet.</td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;const r=t.querySelector("#ps-step6-preview-btn");r&&(r.onclick=()=>this.showPreviewModal());const u=t.querySelector("#ps-btn-emp-submit");u&&(u.onclick=async()=>{try{u.disabled=!0,u.textContent="Submitting…",await _(`/proposals/${e._id}/request-approval`,{note:`Submitted by ${this.currentUser.name||"team member"}`}),flashToast("Submitted to Admin for review & PIN sign-off! ⏳");const v=await B(`/proposals/${e._id}`);this.activeProposal=v,this.renderProposalEditor(this.container.querySelector("#ps-view-content"))}catch(v){alert(v.message),u.disabled=!1,u.textContent="📤 Submit for Admin Approval"}});const d=t.querySelector("#ps-btn-approve-pin")||t.querySelector("#ps-btn-reauthorize-pin");d&&(d.onclick=()=>{this.showAdminPinModal(e,"Approved with Admin PIN",()=>{this.renderProposalEditor(this.container.querySelector("#ps-view-content"))})});const i=t.querySelector("#ps-btn-release-pin");i&&(i.onclick=()=>{this.showAdminPinModal(e,"Released to Client with Admin PIN",()=>{this.renderProposalEditor(this.container.querySelector("#ps-view-content"))},!0)});const c=t.querySelector("#ps-copy-link-btn");c&&(c.onclick=async()=>{const v=t.querySelector("#ps-share-link-input");if(v){v.select();try{await navigator.clipboard.writeText(v.value),c.textContent="Copied ✓",setTimeout(()=>c.textContent="📋 Copy Link",2e3)}catch{alert("Press Ctrl+C to copy: "+v.value)}}});const p=t.querySelector("#ps-step6-dl-pdf");p&&(p.onclick=async()=>{var v;await W(e,(v=this.rateDoc)==null?void 0:v.settings,p)});const h=t.querySelector("#ps-step6-dl-word");h&&(h.onclick=async()=>{var v;await G(e,(v=this.rateDoc)==null?void 0:v.settings,h)});const w=t.querySelector("#ps-step6-copy-pdf-link");w&&(w.onclick=async()=>{const v=`${window.location.origin}/proposal?p=${e.shareId}&dl=pdf`;try{await navigator.clipboard.writeText(v),w.textContent="Copied ✓",setTimeout(()=>w.textContent="🔗 Copy Direct PDF Link",2e3)}catch{prompt("Direct PDF Download Link:",v)}})}showAdminPinModal(t,e="Approved with Admin PIN",n,s=!1){const a=ie()||{name:"Admin",email:"admin@ci360.local"},r=document.createElement("div");r.className="modal-backdrop",r.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,0.65);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:99999;padding:16px;",r.innerHTML=`
      <div class="card ps-pin-modal" style="width:100%;max-width:440px;padding:26px;box-shadow:var(--shadow-xl);border:1px solid var(--border-sm);animation:modalFade 0.2s ease;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg, #0F2A4A, #1E4A7E);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">
            🔐
          </div>
          <div>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">Admin PIN Authorization</h3>
            <p class="muted small" style="margin:2px 0 0 0;">Internal Sign-off & Release Gate</p>
          </div>
        </div>

        <div style="background:var(--bg-elevated);border-radius:var(--r-md);padding:12px 14px;margin-bottom:16px;font-size:13px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span class="muted">Proposal:</span>
            <strong>${l(t.ref)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span class="muted">Client:</span>
            <strong>${l(t.client||"Client")}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span class="muted">Approving Admin:</span>
            <span><strong>${l(a.name)}</strong> (${l(a.email||"admin")})</span>
          </div>
        </div>

        <form id="ps-pin-form">
          <div style="margin-bottom:14px;">
            <label class="label" style="font-weight:700;">Enter Secure Admin PIN / Passcode</label>
            <div style="position:relative;">
              <input type="password" id="ps-modal-pin-input" class="input" style="font-size:22px;letter-spacing:6px;text-align:center;padding:12px;font-family:var(--font-mono);" placeholder="••••" maxlength="8" autocomplete="off" autofocus required>
              <button type="button" id="ps-toggle-pin-visibility" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:0;cursor:pointer;font-size:16px;">👁️</button>
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <label class="label">Approval Note / Audit Memo (Optional)</label>
            <input type="text" id="ps-modal-note-input" class="input" placeholder="e.g. Scope & commercials verified with management">
          </div>

          <div id="ps-modal-error" style="color:var(--red-500);font-size:13px;margin-bottom:12px;display:none;"></div>

          <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button type="button" class="btn" id="ps-modal-cancel-btn">Cancel</button>
            <button type="submit" class="btn gold" id="ps-modal-submit-btn" style="font-weight:700;">
              Authorize & Sign
            </button>
          </div>
        </form>
      </div>
    `,document.body.append(r);const u=r.querySelector("#ps-modal-pin-input"),d=r.querySelector("#ps-modal-note-input"),i=r.querySelector("#ps-modal-error"),c=r.querySelector("#ps-toggle-pin-visibility"),p=r.querySelector("#ps-modal-cancel-btn"),h=r.querySelector("#ps-pin-form");u.focus(),c.onclick=()=>{u.type=u.type==="password"?"text":"password"},p.onclick=()=>r.remove(),h.onsubmit=async w=>{w.preventDefault();const v=u.value.trim(),I=d.value.trim();if(!v){i.textContent="Please enter your Admin PIN",i.style.display="block";return}const L=r.querySelector("#ps-modal-submit-btn");L.disabled=!0,L.textContent="Verifying PIN…",i.style.display="none";try{const R=s?`/proposals/${t._id}/release`:`/proposals/${t._id}/approve`,q=await _(R,{pin:v,note:I,action:e});if(q.proposal){Object.assign(t,q.proposal);const m=this.proposals.findIndex(b=>b._id===t._id);m>=0&&(this.proposals[m]=q.proposal)}r.remove(),alert(`✅ Action Authorized!
Proposal ${t.ref} has been officially recorded and approved with Admin PIN.`),typeof n=="function"&&n()}catch(R){i.textContent=R.message||"Incorrect Admin PIN / Passcode",i.style.display="block",u.select(),L.disabled=!1,L.textContent="Authorize & Sign"}}}renderRateCardView(t){if(!this.rateDoc)return;const e=this.rateDoc.items||[],n=this.rateDoc.packages||[];t.innerHTML=`
      <div class="card" style="margin-bottom:18px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">Rate Card Catalog & Pre-configured Packages</h3>
            <p class="muted small" style="margin:2px 0 0 0;">All proposal lines price from these standard deliverables and packages. Pricing in INR and USD.</p>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn small primary" id="ps-save-ratecard-btn">Save Rate Card Changes</button>
          </div>
        </div>
      </div>

      <!-- Packages Section -->
      <div class="card" style="margin-bottom:18px;">
        <h3 style="font-size:16px;font-weight:700;margin:0 0 12px 0;">Standard Service Packages (${n.length})</h3>
        <div class="grid grid-2">
          ${n.map(r=>`
            <div class="card" style="background:var(--bg-elevated);border:1px solid var(--border-sm);padding:14px;margin:0;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
                <strong style="font-size:15px;color:var(--text-1);">${l(r.service)}</strong>
                <span class="badge ${r.billing==="monthly"?"blue":"green"}">${l(r.billing)}</span>
              </div>
              <p class="small muted" style="margin:0 0 8px 0;">${l(r.desc)}</p>
              <div style="font-size:12.5px;color:var(--text-2);">
                <span>Discount: <strong>${r.packDisc}%</strong></span> •
                <span>Components: <strong>${r.components.length} items</strong></span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- All Deliverable Services -->
      <div class="card" style="padding:0;overflow:hidden;">
        <div style="padding:14px 18px;background:var(--bg-elevated);display:flex;align-items:center;justify-content:space-between;">
          <strong style="font-size:15px;color:var(--text-1);">All Rate Card Services (${e.length} items)</strong>
          <input type="text" class="input" id="ps-rate-filter" placeholder="Filter items..." style="max-width:240px;height:32px;font-size:13px;">
        </div>
        <div class="scroll">
          <table class="table" style="width:100%;font-size:13px;margin:0;" id="ps-rate-table">
            <thead>
              <tr style="background:var(--bg-card);">
                <th>Category</th>
                <th>Service Name</th>
                <th>Unit</th>
                <th style="text-align:right;">INR (₹)</th>
                <th style="text-align:right;">USD ($)</th>
                <th>Inclusions</th>
                <th>Tag</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(r=>`
                <tr data-rate-row="${l((r.service+" "+r.category).toLowerCase())}">
                  <td><span class="badge gray">${l(r.category)}</span></td>
                  <td><strong>${l(r.service)}</strong></td>
                  <td class="muted">${l(r.unit)}</td>
                  <td style="text-align:right;font-weight:700;font-variant-numeric:tabular-nums;">${se(r.inr)}</td>
                  <td style="text-align:right;font-variant-numeric:tabular-nums;">$${r.usd||0}</td>
                  <td class="muted small" style="max-width:320px;">${l(r.inc)}</td>
                  <td>${r.tag?`<span class="badge blue">${l(r.tag)}</span>`:"—"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;const s=t.querySelector("#ps-rate-filter");s&&(s.oninput=()=>{const r=s.value.toLowerCase().trim();t.querySelectorAll("tr[data-rate-row]").forEach(u=>{u.style.display=!r||u.dataset.rateRow.includes(r)?"":"none"})});const a=t.querySelector("#ps-save-ratecard-btn");a&&(a.onclick=async()=>{a.disabled=!0,a.textContent="Saving…";try{await ee("/proposals/ratecard",this.rateDoc),alert("Rate card updated successfully!")}catch(r){alert("Error: "+r.message)}finally{a.disabled=!1,a.textContent="Save Rate Card Changes"}})}renderAuditTrailView(t){const e=[];this.proposals.forEach(n=>{(n.approvalHistory||[]).forEach(s=>{e.push({...s,proposalRef:n.ref,proposalClient:n.client,proposalId:n._id})})}),e.sort((n,s)=>new Date(s.timestamp)-new Date(n.timestamp)),t.innerHTML=`
      <div class="card" style="margin-bottom:18px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">🔐 System-wide Admin PIN Authorization Audit Trail</h3>
            <p class="muted small" style="margin:2px 0 0 0;">Complete security register recording admin identity, date, time, and proposal actions.</p>
          </div>
          <button class="btn small" id="ps-refresh-audit-btn">🔄 Refresh Log</button>
        </div>
      </div>

      <div class="card" style="padding:0;overflow:hidden;">
        <div class="scroll">
          <table class="table" style="width:100%;font-size:13px;margin:0;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th>Date & Time</th>
                <th>Admin Name & Identity</th>
                <th>Role</th>
                <th>Proposal & Client</th>
                <th>Action Taken</th>
                <th>PIN Gate Status</th>
                <th>Content Fingerprint</th>
                <th>Notes / Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${e.length===0?`
                <tr><td colspan="8" class="muted" style="text-align:center;padding:36px;">No admin PIN actions logged yet. Authorize a proposal to create an audit record.</td></tr>
              `:e.map(n=>`
                <tr>
                  <td style="white-space:nowrap;font-weight:600;">${O(n.timestamp)}</td>
                  <td>
                    <strong>${l(n.adminName)}</strong>
                    <div class="muted small">${l(n.adminEmail||"admin")}</div>
                  </td>
                  <td><span class="badge gray">${l(n.adminRole||"superadmin")}</span></td>
                  <td>
                    <strong>${l(n.proposalClient)}</strong>
                    <div class="muted small">${l(n.proposalRef)}</div>
                  </td>
                  <td><span class="badge blue">${l(n.action)}</span></td>
                  <td>
                    ${n.pinVerified?'<span class="badge green">🔐 PIN Verified</span>':'<span class="badge gray">Standard</span>'}
                  </td>
                  <td>
                    <code style="font-size:11px;background:var(--bg-elevated);padding:2px 5px;border-radius:4px;">${l((n.hash||"").slice(0,8))}</code>
                  </td>
                  <td class="muted small">${l(n.note||"—")}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,t.querySelector("#ps-refresh-audit-btn").onclick=()=>this.init()}renderSettingsView(t){const e=this.rateDoc&&this.rateDoc.settings||{};t.innerHTML=`
      <!-- Admin PIN Configuration Card -->
      <div class="card" style="margin-bottom:18px;border-top:3px solid var(--brand-600);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <span style="font-size:26px;">🔐</span>
          <div>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">Admin Approval PIN / Passcode Configuration</h3>
            <p class="muted small" style="margin:2px 0 0 0;">Secure PIN entered by the administrator before any proposal can be approved, finalized, or released.</p>
          </div>
        </div>

        <div style="background:var(--bg-elevated);padding:14px 18px;border-radius:var(--r-md);margin-bottom:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
            <div>
              <div style="font-weight:700;font-size:14px;color:var(--text-1);">
                Current Status: ${this.pinStatus.isConfigured?'<span style="color:var(--green-600);">Custom PIN Active ✓</span>':'<span style="color:var(--amber-600);">Default Initial PIN Active (3600)</span>'}
              </div>
              <div class="muted small" style="margin-top:2px;">
                ${this.pinStatus.lastUpdated?`Last updated: ${O(this.pinStatus.lastUpdated)} by ${l(this.pinStatus.updatedBy||"Admin")}`:"Using default startup PIN: 3600"}
              </div>
            </div>
            <button class="btn gold" id="ps-change-pin-toggle-btn">Set / Change Admin PIN</button>
          </div>
        </div>

        <div id="ps-change-pin-panel" style="display:none;padding:16px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-card);margin-top:12px;">
          <h4 style="margin:0 0 12px 0;font-size:15px;color:var(--text-1);">Update Admin Approval PIN</h4>
          <form id="ps-update-pin-form" style="max-width:360px;">
            <div style="margin-bottom:12px;">
              <label class="label">Current PIN</label>
              <input type="password" class="input" id="ps-cur-pin" placeholder="${this.pinStatus.isConfigured?"Current PIN":"Enter 3600"}" required>
            </div>
            <div style="margin-bottom:12px;">
              <label class="label">New PIN (4–8 digits)</label>
              <input type="password" class="input" id="ps-new-pin" placeholder="New secure PIN" minlength="4" maxlength="8" required>
            </div>
            <div style="margin-bottom:14px;">
              <label class="label">Confirm New PIN</label>
              <input type="password" class="input" id="ps-confirm-pin" placeholder="Re-enter new PIN" minlength="4" maxlength="8" required>
            </div>
            <div id="ps-pin-update-err" style="color:var(--red-500);font-size:13px;margin-bottom:10px;display:none;"></div>
            <div style="display:flex;gap:8px;">
              <button type="submit" class="btn primary">Save New PIN</button>
              <button type="button" class="btn" id="ps-cancel-pin-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Company Agency Settings -->
      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 14px 0;">Company Profile & Signatory Defaults</h3>
        <div class="grid grid-2">
          <div>
            <label class="label">Brand Name</label>
            <input type="text" class="input" id="ps-set-name" value="${l(e.name)}">
          </div>
          <div>
            <label class="label">Legal Entity Name</label>
            <input type="text" class="input" id="ps-set-legal" value="${l(e.legal)}">
          </div>
          <div>
            <label class="label">Signatory Name</label>
            <input type="text" class="input" id="ps-set-signatory" value="${l(e.signatory)}">
          </div>
          <div>
            <label class="label">Signatory Designation</label>
            <input type="text" class="input" id="ps-set-signRole" value="${l(e.signRole)}">
          </div>
          <div>
            <label class="label">Official Email</label>
            <input type="email" class="input" id="ps-set-email" value="${l(e.email)}">
          </div>
          <div>
            <label class="label">GSTIN</label>
            <input type="text" class="input" id="ps-set-gstin" value="${l(e.gstin)}">
          </div>
          <div class="span2">
            <label class="label">Registered Address</label>
            <input type="text" class="input" id="ps-set-address" value="${l(e.address)}">
          </div>
        </div>
        <div style="margin-top:16px;text-align:right;">
          <button class="btn primary" id="ps-save-settings-btn">Save Company Profile</button>
        </div>
      </div>
    `;const n=t.querySelector("#ps-change-pin-toggle-btn"),s=t.querySelector("#ps-change-pin-panel"),a=t.querySelector("#ps-cancel-pin-btn");n&&(n.onclick=()=>{s.style.display=s.style.display==="none"?"block":"none"}),a&&(a.onclick=()=>{s.style.display="none"});const r=t.querySelector("#ps-update-pin-form");r&&(r.onsubmit=async d=>{d.preventDefault();const i=t.querySelector("#ps-cur-pin").value.trim(),c=t.querySelector("#ps-new-pin").value.trim(),p=t.querySelector("#ps-confirm-pin").value.trim(),h=t.querySelector("#ps-pin-update-err");if(c!==p){h.textContent="New PIN and Confirmation PIN do not match",h.style.display="block";return}try{await _("/proposals/pin/update",{currentPin:i,newPin:c}),alert("Admin PIN updated successfully!"),this.init()}catch(w){h.textContent=w.message||"Failed to update PIN",h.style.display="block"}});const u=t.querySelector("#ps-save-settings-btn");u&&(u.onclick=async()=>{e.name=t.querySelector("#ps-set-name").value,e.legal=t.querySelector("#ps-set-legal").value,e.signatory=t.querySelector("#ps-set-signatory").value,e.signRole=t.querySelector("#ps-set-signRole").value,e.email=t.querySelector("#ps-set-email").value,e.gstin=t.querySelector("#ps-set-gstin").value,e.address=t.querySelector("#ps-set-address").value,u.disabled=!0,u.textContent="Saving…";try{await ee("/proposals/ratecard",{settings:e}),alert("Company profile saved successfully!")}catch(d){alert("Error: "+d.message)}finally{u.disabled=!1,u.textContent="Save Company Profile"}})}}function Ae(o,t={}){const e=new $e(o,t);return e.init(),e}export{$e as ProposalStudioController,J as docModel,W as exportPdfDoc,G as exportWordDocx,Ae as initProposalStudio,te as paperHTML};
