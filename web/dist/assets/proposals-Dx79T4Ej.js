import{l as ne,c as j,e as o,f as se,h as _,g as M,j as oe,k as ie}from"./api-DGR5VCGO.js";const ce={docx:"https://cdn.jsdelivr.net/npm/docx@9.0.2/build/index.umd.js",pdf:"https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",mammoth:"https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",pdfjs:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",pdfworker:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"};function w(n){const t=Number(n);return isFinite(t)?t:0}function T(n,t="INR"){return n=w(n),t==="USD"?"$"+Math.round(n).toLocaleString("en-US"):"₹"+Math.round(n).toLocaleString("en-IN")}function Q(n){if(!n)return"—";const t=new Date(n+(String(n).length===10?"T00:00:00":""));return isNaN(t)?String(n):t.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}function U(n){if(!n)return"—";const t=new Date(n);return isNaN(t)?String(n):t.toLocaleString("en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}function $e(n){const t=new Date((n.date||new Date().toISOString().slice(0,10))+"T00:00:00");return t.setDate(t.getDate()+w(n.validity||30)),t.toISOString().slice(0,10)}function z(n=8){const t="abcdefghijkmnpqrstuvwxyz23456789";return[...crypto.getRandomValues(new Uint8Array(n))].map(e=>t[e%t.length]).join("")}function re(n){return JSON.parse(JSON.stringify(n??null))}function me(n,t){return window[t]?Promise.resolve(window[t]):new Promise((e,a)=>{const r=document.createElement("script");r.src=n,r.onload=()=>window[t]?e(window[t]):a(new Error("Failed to load "+t)),r.onerror=()=>a(new Error("Failed to load "+t)),document.head.append(r)})}function ue(n,t){let e=0;return(n||[]).forEach(a=>{t>=w(a[0])&&w(a[1])>e&&(e=w(a[1]))}),e}function he(n){const t=Math.max(1,w(n.mult)||1);let e=0,a=0;const r=(n.lines||[]).map(p=>{const v=w(p.qty)*w(p.rate),g=ue(p.slabs,w(p.qty)*t),f=v*(1-g/100);return e+=v,a+=v-f,{...p,gross:v,slabPct:g,net:f}}),i=e-a,d=i*w(n.packDisc)/100,l=w(n.fixed)>0,c=l?w(n.fixed):(i-d)*t;return{lines:r,m:t,gross:e*t,slab:a*t,pack:l?0:d*t,net:c,fixed:l,alacarte:e*t}}const le={"q-adv":3,"term-adv":5,100:3};function J(n){const t=(n.heads||[]).map(C=>({...C,c:he(C)})),e=t.filter(C=>C.billing==="monthly"),a=t.filter(C=>C.billing!=="monthly"),r=C=>C.reduce((u,b)=>u+b.c.net,0),i=w(n.gst),d=w(n.discount),l=w(n.termDisc),c=r(e),p=c*l/100,v=(c-p)*d/100,g=c-p-v,f=r(a),s=f*d/100,m=f-s,h=Math.max(1,w(n.term)||1),S=e.length?w(le[n.retainerPay]):0,F=a.length?w(le[n.projectPay]):0;return{heads:t,term:h,mon:{has:e.length>0,sub:c,term:p,disc:v,net:g,tax:g*i/100,total:g*(1+i/100),pre:S},one:{has:a.length>0,sub:f,disc:s,net:m,tax:m*i/100,total:m*(1+i/100),pre:F},contract:g*h+m}}const de={"m-adv":"Monthly fee invoiced in advance on the 1st of each month, payable within 7 days.","m-arr":"Monthly fee invoiced at the end of each month, payable within 15 days.","q-adv":"Invoiced quarterly in advance, payable within 7 days. A 3% prepayment discount applies to each quarterly invoice.","term-adv":"The full term is invoiced in advance on signing, with a 5% prepayment discount."},pe={100:{label:"100% advance (3% discount)",ms:[[100,"On signing"]]},5050:{label:"50% advance, 50% on delivery",ms:[[50,"Advance on signing"],[50,"On final delivery"]]},403030:{label:"40 / 30 / 30 milestones",ms:[[40,"Advance on signing"],[30,"On approval of concept / shoot completion"],[30,"On final delivery"]]},304030:{label:"30 / 40 / 30 milestones",ms:[[30,"Advance on signing"],[40,"Mid-project milestone"],[30,"On final delivery"]]},custom:{label:"Custom milestones",ms:null}};function ge(n){const t=[];let e=[],a=null,r=null;const i=()=>{e.length&&(t.push({t:"p",text:e.join(" ")}),e=[])},d=()=>{a&&(t.push({t:"ul",items:a}),a=null),r&&(t.push({t:"ol",items:r}),r=null)};return String(n||"").replace(/\r/g,"").split(`
`).forEach(l=>{const c=l.trim();if(!c){i(),d();return}let p;if(p=c.match(/^[-*\u2022]\s+(.*)$/)){i(),r&&d(),(a=a||[]).push(p[1]);return}if(p=c.match(/^\d+[.)]\s+(.*)$/)){i(),a&&d(),(r=r||[]).push(p[1]);return}if(p=c.match(/^#{1,4}\s+(.*)$/)){i(),d(),t.push({t:"h",text:p[1]});return}d(),e.push(c)}),i(),d(),t}function ve(n){return String(n).split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(t=>t.startsWith("**")&&t.endsWith("**")?{bold:!0,text:t.slice(2,-2)}:{bold:!1,text:t})}function Pe(n,t){const e=n.billing==="monthly"?" a month":"",a=(n.lines||[]).filter(i=>w(i.qty)>0).map(i=>`- ${w(i.qty)} × ${i.service}${e}${i.desc?": "+i.desc:""}`),r=[];return n.desc&&r.push(n.desc),w(n.mult)>1&&r.push(`For each of ${w(n.mult)} ${n.multLabel||"brands"}:`),a.length&&r.push(a.join(`
`)),n.exc&&r.push("**Not included:** "+n.exc),r.join(`

`)}function W(n,t,e={}){const a=n.currency||"INR",r=J(n),i=[];let d=0;const l=u=>i.push({t:"h",n:++d,text:u}),c=a==="INR"?"GST":"Tax",p=[n.contact,n.contactRole].filter(Boolean).join(", "),v=[];r.mon.has&&v.push(["Term",`${r.term} month${r.term>1?"s":""} from the agreed start date.`]),r.mon.has&&v.push(["Monthly investment",`${T(r.mon.net,a)} per month, ${c} extra.${r.mon.term?` Includes a ${w(n.termDisc)}% commitment discount for the ${r.term}-month term.`:""}`]),r.one.has&&v.push([r.mon.has?"One-time investment":"Investment",`${T(r.one.net,a)}, ${c} extra.`]),r.mon.has&&r.one.has&&v.push(["Total contract value",`${T(r.contract,a)} over ${r.term} months, ${c} extra.`]),n.oneLine&&v.push(["In one line",n.oneLine]),v.length&&i.push({t:"kv",rows:v}),(n.sections||[]).forEach(u=>{(u.title||u.body)&&(l(u.title),i.push({t:"md",text:u.body}))});const g=r.heads;if(g.length){l("What is included"),i.push({t:"table",cols:[{h:"Area",w:26},{h:"What you get",w:74}],rows:g.map(b=>({cells:[{b:b.title,s:b.billing==="monthly"?"Monthly":"One-time"},{md:Pe(b)}]}))});const u=g.filter(b=>b.billing==="monthly");if(u.length){const b={},L=[];u.forEach(P=>(P.lines||[]).forEach(N=>{const I=w(N.qty)*Math.max(1,w(P.mult)||1);if(!I)return;const D=N.service+"|"+(N.unit||"");b[D]||(b[D]={s:N.service,u:N.unit||"",q:0},L.push(D)),b[D].q+=I})),i.push({t:"md",text:"**Monthly retainer: included every month**"}),i.push({t:"table",cols:[{h:"Deliverable",w:70},{h:"Per month",w:30,align:"r"}],rows:L.map((P,N)=>({style:N%2?"alt":"",cells:[b[P].s,`${b[P].q} ${b[P].u}`.trim()]}))});const E=(n.retainerIncl||[]).filter(Boolean);E.length&&i.push({t:"md",text:`**Also included in the retainer at no extra cost**
`+E.map(P=>"- "+P).join(`
`)})}}const f=(n.team||[]).filter(u=>u.name),s=(n.escalation||[]).filter(u=>u.name);if((f.length||n.cadence||s.length||n.clientTeam)&&(l("Team and governance"),f.length&&i.push({t:"table",cols:[{h:"Role on this engagement",w:30},{h:"Name",w:24},{h:"Responsibility",w:46}],rows:f.map((u,b)=>({style:b%2?"alt":"",cells:[{b:u.role||""},u.name,u.resp||""]}))}),n.clientTeam&&i.push({t:"md",text:`**From ${n.clientShort||n.client||"the client"}:** ${n.clientTeam}`}),n.cadence&&i.push({t:"md",text:n.cadence}),s.length&&(i.push({t:"md",text:"**Escalation path**"}),i.push({t:"table",cols:[{h:"Level",w:10},{h:"Contact",w:36},{h:"Raise when",w:54}],rows:s.map((u,b)=>({style:b%2?"alt":"",cells:[String(b+1),{b:u.name,s:u.role||""},u.when||""]}))}))),g.length){l("Investment");const u=n.pricingView||"heads",b=(E,P,N)=>{const I=[],D=N?" per month":"";return(u!=="overall"||P.term||P.disc)&&I.push({style:"sum",cells:["Subtotal",T(P.sub,a)+D]}),P.term&&I.push({style:"sum",cells:[`Commitment discount (${w(n.termDisc)}%, ${r.term}-month term)`,"−"+T(P.term,a)]}),P.disc&&I.push({style:"sum",cells:[`Discount (${w(n.discount)}%)`,"−"+T(P.disc,a)]}),I.push({style:"sum",cells:[`${E} before ${c}`,T(P.net,a)+D]}),w(n.gst)&&I.push({style:"sum",cells:[`${c} (${w(n.gst)}%)`,T(P.tax,a)]}),I.push({style:"grand",cells:[`${E} including ${c}`,T(P.total,a)+D]}),I},L=E=>{const P=E?r.mon:r.one,N=g.filter(D=>D.billing==="monthly"===E);if(!N.length)return;const I=E?"Monthly investment":r.mon.has?"One-time investment":"Investment";if(u==="overall")i.push({t:"table",cols:[{h:I,w:70},{h:"Amount",w:30,align:"r"}],rows:[{style:"hl",cells:[{b:`Everything in “What is included”${E?" billed monthly":""}: ${N.map(D=>D.title).join(", ")}. ${c} extra.`},{b:T(P.net,a)+(E?" per month":"")}]},...P.term||P.disc?[{style:"sub",cells:[`Includes ${[P.term?`a ${w(n.termDisc)}% commitment discount`:"",P.disc?`a ${w(n.discount)}% discount`:""].filter(Boolean).join(" and ")}.`,""]}]:[]]});else if(u==="heads")i.push({t:"table",cols:[{h:I,w:70},{h:"Amount",w:30,align:"r"}],rows:[...N.map((D,k)=>({style:k%2?"alt":"",cells:[{b:D.title,s:w(D.mult)>1?`${w(D.mult)} ${D.multLabel||"brands"}`:""},T(D.c.net,a)+(E?" per month":"")]})),...b(I,P,E)]});else{const D=[];N.forEach(k=>{D.push({style:"group",cells:[{b:k.title+(w(k.mult)>1?` (× ${w(k.mult)} ${k.multLabel||"brands"})`:"")},"","","",""]}),k.c.lines.forEach((R,ee)=>D.push({style:ee%2?"alt":"",cells:[{b:R.service,s:R.desc},String(w(R.qty)*k.c.m),R.unit||"",T(R.rate,a),T(R.net*k.c.m,a)+(R.slabPct?`
(${R.slabPct}% volume)`:"")]})),k.c.pack&&D.push({style:"sum",cells:["Package saving"+(w(k.packDisc)?` (${w(k.packDisc)}%)`:""),"","","","−"+T(k.c.pack,a)]}),k.c.fixed&&D.push({style:"sum",cells:["Package price","","","",T(k.c.net,a)]}),D.push({style:"sum",cells:[{b:k.title+" total"},"","","",{b:T(k.c.net,a)}]})}),b(I,P,E).forEach(k=>D.push({style:k.style,cells:[k.cells[0],"","","",k.cells[1]]})),i.push({t:"table",cols:[{h:I,w:44},{h:"Qty",w:9,align:"r"},{h:"Unit",w:13,align:"r"},{h:"Rate",w:15,align:"r"},{h:"Amount",w:19,align:"r"}],rows:D})}};L(!0),L(!1),r.mon.has&&r.one.has&&u!=="overall"&&i.push({t:"note",text:`Total contract value: ${T(r.contract,a)} (${r.term} months of retainer plus one-time work), ${c} extra.`})}const m=(n.onRequest||[]).filter(u=>u.item);if((m.length||n.exclusions)&&(l("Not included, available on request"),m.length&&i.push({t:"table",cols:[{h:"Item",w:30},{h:"How it works",w:45},{h:"Price",w:25,align:"r"}],rows:m.map((u,b)=>({style:b%2?"alt":"",cells:[{b:u.item},u.how||"",u.price||""]}))}),i.push({t:"note",text:"Add-ons start only with written go-ahead."+(n.exclusions?" Also outside this scope: "+n.exclusions:"")})),g.length){l("Payment terms");const u=[];if(r.mon.has&&(u.push("**Retainer.** "+(n.retainerPay==="custom"?n.retainerCustom||"":de[n.retainerPay]||de["m-adv"])),n.retainerPay==="q-adv"&&u.push(`Quarterly invoice: ${T(r.mon.net*3*.97,a)} plus ${c}.`),n.retainerPay==="term-adv"&&u.push(`Term invoice: ${T(r.mon.net*r.term*.95,a)} plus ${c}.`)),u.length&&i.push({t:"md",text:u.join(`

`)}),r.one.has){const L=((pe[n.projectPay]||pe[5050]).ms||(n.milestones||[]).map(P=>[w(P.pct),P.label])).filter(P=>P[0]),E=r.one.total*(1-r.one.pre/100);r.one.pre?i.push({t:"md",text:`**One-time work.** Paid 100% in advance with a ${r.one.pre}% prepayment discount.`}):i.push({t:"md",text:"**One-time work.** Invoiced against these milestones:"}),i.push({t:"table",cols:[{h:"Milestone",w:55},{h:"Share",w:15,align:"r"},{h:`Amount incl. ${c}`,w:30,align:"r"}],rows:L.map((P,N)=>({style:N%2?"alt":"",cells:[P[1],P[0]+"%",T(E*P[0]/100,a)]}))})}t.paymentNotes&&i.push({t:"md",text:t.paymentNotes})}const h=(n.terms||[]).filter(u=>u.on);h.length&&(l("Terms"),i.push({t:"md",text:h.map(u=>`- **${u.title}:** ${u.text}`).join(`
`)}));const S=(n.clientNeeds||[]).filter(Boolean);S.length&&(l(`What we need from ${n.clientShort||n.client||"you"} to start`),i.push({t:"md",text:S.map((u,b)=>`${b+1}. ${u}`).join(`
`)}));const F=(n.choices||[]).filter(u=>u.label);if(F.length&&(l("Choices to confirm on sign-off"),i.push({t:"choices",items:F.map(u=>({label:u.label,options:(u.options||[]).filter(Boolean),answer:e.answers?e.answers[u.id]:""}))})),l("Sign-off"),n.approval&&n.approval.decision==="approved"){const u=`🔐 Internally Approved & Verified with Admin PIN by ${n.approval.approverName||"Admin"} on ${U(n.approval.at)}`;i.push({t:"stamp",text:u,type:"admin"})}e.approval&&e.approval.name&&i.push({t:"stamp",text:`Approved online by client ${e.approval.name}${e.approval.role?", "+e.approval.role:""} on ${Q(e.approval.at)}`,type:"client"}),i.push({t:"sig",left:{who:"For "+(n.client||"the client"),name:"",role:""},right:{who:`For ${t.name}${t.legal?" ("+t.legal+")":""}`,name:t.signatory,role:t.signRole}});const C=[t.address,t.gstin&&"GSTIN "+t.gstin,t.email,t.phone,t.website].filter(Boolean).join(" • ");return{cover:{brand:t.name||"CI360 Degrees",title:n.title||"Proposal",subtitle:n.subtitle,kicker:n.kicker||"Proposal for sign-off",meta:[["Prepared for",[n.client,p].filter(Boolean).join(`
`)],["Reference",n.ref],["Date",Q(n.date)],["Valid until",Q($e(n))]]},blocks:i,foot:C,title:n.title||"Proposal",ref:n.ref,brand:t.name||"CI360 Degrees"}}function K(n){return ve(n).map(t=>t.bold?`<strong>${o(t.text)}</strong>`:o(t.text)).join("")}function fe(n){return ge(n).map(t=>t.t==="p"?`<p>${K(t.text)}</p>`:t.t==="h"?`<h3>${K(t.text)}</h3>`:`<${t.t}>${t.items.map(e=>`<li>${K(e)}</li>`).join("")}</${t.t}>`).join("")}function G(n){return n&&typeof n=="object"&&"md"in n?fe(n.md):n&&typeof n=="object"?`<strong>${K(n.b||"")}</strong>${n.s?`<div class="desc">${o(n.s)}</div>`:""}`:String(n??"").split(`
`).map((t,e)=>e?`<div class="desc">${o(t)}</div>`:o(t)).join("")}function Z(n,t=!1){const e=n.cover;function a(l){if(l.t==="h")return`<h2><span class="n">${l.n}.</span>${o(l.text)}</h2>`;if(l.t==="md")return fe(l.text);if(l.t==="note")return`<p class="pnote">${o(l.text)}</p>`;if(l.t==="stamp")return`<div class="approved-stamp ${l.type==="admin"?"admin-stamp":""}">${o(l.text)}</div>`;if(l.t==="kv")return`<div class="pdf-table-wrap"><table class="kv"><tbody>${l.rows.map(([c,p])=>`<tr><th>${o(c)}</th><td>${G(p)}</td></tr>`).join("")}</tbody></table></div>`;if(l.t==="table"){const c=l.cols.length;return`<div class="pdf-table-wrap"><table class="pt"><thead><tr>${l.cols.map(p=>`<th class="${p.align==="r"?"r":""}" style="width:${p.w}%">${o(p.h)}</th>`).join("")}</tr></thead><tbody>${l.rows.map(p=>["sum","grand","sub","group"].includes(p.style)?`<tr class="${p.style}"><td colspan="${c-1}" class="${p.style==="group"||p.style==="sub"?"":"r"}">${G(p.cells[0])}</td><td class="r">${G(p.cells[p.cells.length-1])}</td></tr>`:`<tr class="${p.style||""}">${p.cells.map((v,g)=>`<td class="${l.cols[g].align==="r"?"r":""}">${G(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}return l.t==="choices"?`<div class="choices">${l.items.map(c=>`<p><strong>${o(c.label)}:</strong> ${c.options.length?c.options.map(p=>`<span class="box">${c.answer===p?"☑":"☐"} ${o(p)}</span>`).join(" "):`<span class="blank">${c.answer?o(c.answer):""}</span>`}</p>`).join("")}</div>`:l.t==="sig"?`<div class="sig">${[l.left,l.right].map(c=>`<div><div class="who">${o(c.who)}</div>${[["Name",c.name],["Designation",c.role],["Signature",""],["Date",""]].map(([p,v])=>`<div class="ln"><span>${p}:</span> ${o(v||"")}</div>`).join("")}</div>`).join("")}</div>${n.foot?`<div class="foot">${o(n.foot)}</div>`:""}`:""}const r=[];let i=[];for(const l of n.blocks)l.t==="h"&&i.length?(r.push(i),i=[l]):i.push(l);i.length&&r.push(i);const d=r.map(l=>`<section class="pdf-section">${l.map(a).join("")}</section>`).join("");return`<article class="paper${t?" print":""}">
    <section class="cover">
      <div class="cv-brand">${o(e.brand)}</div>
      <div class="cv-kicker">${o(e.kicker)}</div>
      <h1>${o(e.title)}</h1>
      <p class="cv-sub">${o(e.subtitle||"")}</p>
      <div class="cv-rule"></div>
      <dl class="cv-meta">${e.meta.filter(l=>l[1]).map(([l,c])=>`<dt>${o(l)}</dt><dd>${o(c).replace(/\n/g,"<br>")}</dd>`).join("")}</dl>
    </section>
    <div class="html2pdf__page-break pb"></div>
    <div class="body">${d}</div>
  </article>`}async function X(n,t,e,a={}){const r=e.textContent;e.disabled=!0,e.textContent="Generating Word (.docx)…";try{const i=await me(ce.docx,"docx"),d=W(n,t,a),l="0F2A4A",c="B8893A",p="1C2430",v="5A6577",g="D5DCE5",f="F1F4F8",s="EFE3CC",m=9026,h={style:i.BorderStyle.NONE,size:0,color:"FFFFFF"},S={top:h,bottom:h,left:h,right:h},F={style:i.BorderStyle.SINGLE,size:4,color:g},C={top:F,bottom:F,left:F,right:F},u=(x,y={})=>new i.TextRun({text:String(x??""),font:y.font||"Arial",size:y.size||20,bold:!!y.bold,italics:!!y.italics,color:y.color||p}),b=(x,y={})=>new i.Paragraph({children:x,alignment:y.align,keepNext:y.keepNext,numbering:y.numbering,border:y.border,heading:y.heading,spacing:{after:y.after??110,before:y.before??0,line:y.line??290,lineRule:"auto"}}),L=(x,y={})=>ve(x).map(A=>u(A.text,{...y,bold:A.bold||y.bold})),E={n:0},P=(x,y={})=>{const A=[];return ge(x).forEach($=>{if($.t==="p")A.push(b(L($.text,y),{after:y.after??110}));else if($.t==="h")A.push(b([u($.text,{font:"Georgia",bold:!0,size:(y.size||20)+2,color:l})],{before:100,after:60,keepNext:!0}));else{const q=$.t==="ol"?"num"+Math.min(40,++E.n):"bul";$.items.forEach(B=>A.push(b(L(B,y),{numbering:{reference:q,level:0},after:50})))}}),A.length?A:[b([])]},N=(x,y={})=>{const A=y.size||18,$=y.color||p,q=y.align;if(x&&typeof x=="object"&&"md"in x)return P(x.md,{size:A,after:70});if(x&&typeof x=="object"){const B=[b(L(x.b||"",{bold:!0,size:A,color:$}),{after:x.s?30:0,align:q,line:260})];return x.s&&B.push(b([u(x.s,{size:A-2,color:y.sub||v})],{after:0,align:q,line:250})),B}return String(x??"").split(`
`).map((B,O)=>b([u(B,{size:O?A-2:A,color:O?y.sub||v:$,bold:y.bold})],{after:0,align:q,line:260}))},I=(x,y,A={})=>new i.TableCell({children:x,width:{size:y,type:i.WidthType.DXA},borders:A.borders||C,columnSpan:A.span&&A.span>1?A.span:void 0,shading:A.fill?{type:i.ShadingType.CLEAR,color:"auto",fill:A.fill}:void 0,margins:{top:90,bottom:90,left:120,right:120},verticalAlign:A.v||i.VerticalAlign.TOP}),D=(x,y)=>b([u(x+".  ",{font:"Georgia",size:28,bold:!0,color:c}),u(y,{font:"Georgia",size:28,bold:!0,color:l})],{heading:i.HeadingLevel.HEADING_1,keepNext:!0,before:340,after:140,border:{bottom:{style:i.BorderStyle.SINGLE,size:8,color:c,space:6}}}),k=[],R=d.cover,ee=R.meta.filter(x=>x[1]).map(([x,y])=>b([u(x+":   ",{color:"C9A35E",size:19,bold:!0}),...String(y).split(`
`).flatMap((A,$)=>$?[new i.TextRun({break:1,text:A,font:"Arial",size:21,color:"FFFFFF"})]:[u(A,{color:"FFFFFF",size:21})])],{after:70}));k.push(new i.Table({width:{size:m,type:i.WidthType.DXA},columnWidths:[m],rows:[new i.TableRow({height:{value:11e3,rule:i.HeightRule.ATLEAST},children:[new i.TableCell({width:{size:m,type:i.WidthType.DXA},borders:S,shading:{type:i.ShadingType.CLEAR,color:"auto",fill:l},margins:{top:900,bottom:900,left:700,right:700},children:[b([u(R.brand,{font:"Georgia",size:24,bold:!0,color:"D4A657"})],{after:2e3}),b([u(R.kicker,{size:19,color:"AEBBCD",bold:!0})],{after:120}),b([u(R.title,{font:"Georgia",size:52,bold:!0,color:"FFFFFF"})],{after:200,line:260}),b(R.subtitle?[u(R.subtitle,{font:"Georgia",size:24,italics:!0,color:"D9E1EC"})]:[],{after:1400}),new i.Paragraph({border:{top:{style:i.BorderStyle.SINGLE,size:12,color:c,space:12}},spacing:{after:180},children:[]}),...ee]})]})]})),k.push(new i.Paragraph({children:[new i.PageBreak]})),d.blocks.forEach(x=>{if(x.t==="h")k.push(D(x.n,x.text));else if(x.t==="md")k.push(...P(x.text));else if(x.t==="note")k.push(b([u(x.text,{italics:!0,size:18,color:v})],{before:80}));else if(x.t==="stamp")k.push(new i.Table({width:{size:m,type:i.WidthType.DXA},columnWidths:[m],rows:[new i.TableRow({cantSplit:!0,children:[new i.TableCell({width:{size:m,type:i.WidthType.DXA},borders:{top:F,bottom:F,left:{style:i.BorderStyle.SINGLE,size:18,color:x.type==="admin"?l:"2F6B45"},right:F},shading:{type:i.ShadingType.CLEAR,color:"auto",fill:x.type==="admin"?"F1F4F8":"ECFDF5"},margins:{top:120,bottom:120,left:160,right:160},children:[b([u(x.text,{bold:!0,size:19,color:x.type==="admin"?l:"2F6B45"})],{after:0})]})]})]})),k.push(b([],{after:120}));else if(x.t==="kv"){const y=[2500,m-2500];k.push(new i.Table({width:{size:m,type:i.WidthType.DXA},columnWidths:y,rows:x.rows.map(([A,$],q)=>new i.TableRow({cantSplit:!0,children:[I(N({b:A},{size:19}),y[0],{fill:f}),I(N($,{size:19}),y[1],{fill:q%2?f:void 0})]}))}))}else if(x.t==="table"){const y=x.cols.map($=>Math.round(m*$.w/100));y[y.length-1]+=m-y.reduce(($,q)=>$+q,0);const A=[new i.TableRow({tableHeader:!0,children:x.cols.map(($,q)=>I(N($.h,{size:17,color:"FFFFFF",bold:!0,align:$.align==="r"?i.AlignmentType.RIGHT:void 0}),y[q],{fill:l,v:i.VerticalAlign.CENTER}))})];x.rows.forEach($=>{const q=$.style==="alt"?f:$.style==="grand"?l:$.style==="hl"?s:$.style==="group"?"E4E9F0":void 0,B=$.style==="grand"?"FFFFFF":p,O=$.style==="grand"?"D9E1EC":v;if($.style==="sum"||$.style==="grand"||$.style==="sub"||$.style==="group"){const te=$.cells[$.cells.length-1],V=y.slice(0,-1).reduce((we,Se)=>we+Se,0);A.push(new i.TableRow({cantSplit:!0,children:[I(N($.cells[0],{size:$.style==="grand"?20:18,color:B,sub:O,bold:$.style==="grand",align:$.style==="group"||$.style==="sub"?void 0:i.AlignmentType.RIGHT}),V,{span:y.length-1,fill:q}),I(N(te,{size:$.style==="grand"?20:18,color:B,sub:O,bold:$.style!=="sub",align:i.AlignmentType.RIGHT}),y[y.length-1],{fill:q})]}))}else A.push(new i.TableRow({cantSplit:!0,children:$.cells.map((te,V)=>I(N(te,{size:18,color:B,sub:O,align:x.cols[V]&&x.cols[V].align==="r"?i.AlignmentType.RIGHT:void 0}),y[V]||Math.round(m/Math.max(1,$.cells.length)),{fill:q}))}))}),k.push(new i.Table({width:{size:m,type:i.WidthType.DXA},columnWidths:y,rows:A})),k.push(b([],{after:60}))}else if(x.t==="choices")x.items.forEach(y=>{const A=y.answer,$=[u(y.label+":   ",{bold:!0})];y.options.length?y.options.forEach(q=>$.push(u((A===q?"☑ ":"☐ ")+q+"    "))):$.push(u(A||"______________________________")),k.push(b($,{after:140}))});else if(x.t==="sig"){const y=m/2,A=$=>[b([u($.who,{font:"Georgia",bold:!0,color:l,size:21})],{after:200}),...[["Name",$.name],["Designation",$.role],["Signature",""],["Date",""]].map(([q,B])=>b([u(q+":  ",{size:19,color:v}),u(B||"",{size:20})],{after:200,border:{bottom:{style:i.BorderStyle.SINGLE,size:4,color:g,space:2}}}))];k.push(new i.Table({width:{size:m,type:i.WidthType.DXA},columnWidths:[y,y],rows:[new i.TableRow({cantSplit:!0,children:[I(A(x.left),y,{borders:S}),I(A(x.right),y,{borders:S})]})]})),d.foot&&k.push(b([u(d.foot,{size:16,color:v})],{before:360}))}});const ae=[{reference:"bul",levels:[{level:0,format:i.LevelFormat.BULLET,text:"•",alignment:i.AlignmentType.LEFT,style:{paragraph:{indent:{left:480,hanging:280}},run:{color:c}}}]}];for(let x=1;x<=40;x++)ae.push({reference:"num"+x,levels:[{level:0,format:i.LevelFormat.DECIMAL,text:"%1.",alignment:i.AlignmentType.LEFT,style:{paragraph:{indent:{left:480,hanging:320}},run:{color:l,bold:!0}}}]});const be=new i.Document({creator:d.brand,title:d.title,styles:{default:{document:{run:{font:"Arial",size:20,color:p}}},paragraphStyles:[{id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:!0,run:{font:"Georgia",size:28,bold:!0,color:l},paragraph:{outlineLevel:0}}]},numbering:{config:ae},sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1300,bottom:1200,left:1440,right:1440}},titlePage:!0},headers:{first:new i.Header({children:[b([])]}),default:new i.Header({children:[b([u(d.brand,{font:"Georgia",size:16,bold:!0,color:c}),u("   "+d.title,{size:16,color:v})],{after:0})]})},footers:{first:new i.Footer({children:[b([])]}),default:new i.Footer({children:[new i.Paragraph({alignment:i.AlignmentType.RIGHT,children:[u((d.ref||"")+"   Page ",{size:15,color:v}),new i.TextRun({children:[i.PageNumber.CURRENT],size:15,color:v,font:"Arial"})]})]})},children:k}]}),ye=await i.Packer.toBlob(be),xe=`${n.clientShort||n.client||"Client"} - ${n.title||"Proposal"}.docx`.replace(/[\\/:*?"<>|]+/g,"_"),H=document.createElement("a");H.href=URL.createObjectURL(ye),H.download=xe,document.body.append(H),H.click(),setTimeout(()=>{URL.revokeObjectURL(H.href),H.remove()},600)}catch(i){alert("Word document export error: "+i.message)}finally{e.disabled=!1,e.textContent=r}}async function Y(n,t,e,a={}){const r=e.textContent;e.disabled=!0,e.textContent="Generating PDF…";const i=document.createElement("div");i.id="ci360-pdf-export-overlay",i.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,0.92);backdrop-filter:blur(6px);z-index:9999999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;",i.innerHTML=`
    <div style="background:#0F2A4A;border:1px solid #B8893A;border-radius:12px;padding:24px 36px;color:#fff;text-align:center;box-shadow:0 12px 48px rgba(0,0,0,0.6);max-width:480px;">
      <div style="font-size:32px;margin-bottom:8px;">📄</div>
      <div style="font-size:17px;font-weight:700;color:#D4A657;">Rendering High-Resolution Proposal PDF…</div>
      <div style="font-size:13px;color:#AEBBCD;margin-top:6px;line-height:1.5;">Formatting pages to standard A4 dimensions with exact table widths and styling.</div>
    </div>
  `,document.body.appendChild(i);const d=document.createElement("div");d.id="ci360-pdf-render-stage",d.setAttribute("data-theme","light"),d.style.cssText="position:absolute;left:-99999px;top:0;width:794px;margin:0;padding:0;background:#ffffff;box-sizing:border-box;";try{const l=await me(ce.pdf,"html2pdf"),c=W(n,t,a),p=Z(c,!0);d.innerHTML=`
      <style>
        * { box-sizing: border-box !important; }
        #ci360-pdf-render-stage, .paper, .paper.print {
          background: #FFFFFF !important;
          color: #1C2430 !important;
          font-family: Arial, Helvetica, sans-serif !important;
          width: 794px !important;
          min-width: 794px !important;
          max-width: 794px !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .paper .cover {
          background: #0F2A4A !important;
          color: #FFFFFF !important;
          box-sizing: border-box !important;
          width: 794px !important;
          min-width: 794px !important;
          max-width: 794px !important;
          height: 1120px !important;
          max-height: 1120px !important;
          padding: 56px 44px !important;
          position: relative !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .paper .cv-brand { color: #D4A657 !important; font-family: Georgia, serif !important; font-weight: 700 !important; font-size: 20px !important; }
        .paper .cv-kicker { color: #AEBBCD !important; font-size: 13px !important; margin-top: 4px !important; text-transform: uppercase !important; letter-spacing: 0.5px !important; }
        .paper .cover h1 { color: #FFFFFF !important; font-family: Georgia, serif !important; font-size: 34px !important; margin: 16px 0 12px !important; line-height: 1.25 !important; max-width: 100% !important; }
        .paper .cv-sub { color: #D9E1EC !important; font-family: Georgia, serif !important; font-style: italic !important; font-size: 16px !important; margin: 0 0 20px !important; max-width: 100% !important; }
        .paper .cv-rule { background: #B8893A !important; height: 2px !important; margin-bottom: 24px !important; }
        .paper .cv-meta dt { color: #C9A35E !important; font-weight: 700 !important; font-size: 13.5px !important; }
        .paper .cv-meta dd { color: #FFFFFF !important; font-size: 13.5px !important; }
        .paper .html2pdf__page-break, .paper .pb { break-before: page !important; page-break-before: always !important; height: 1px !important; line-height: 1px !important; display: block !important; margin: 0 !important; padding: 0 !important; }
        .paper .body {
          background: #FFFFFF !important;
          color: #1C2430 !important;
          width: 794px !important;
          min-width: 794px !important;
          max-width: 794px !important;
          box-sizing: border-box !important;
          padding: 40px 44px 44px !important;
        }
        .paper .pdf-section {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          margin-bottom: 22px !important;
          display: block !important;
        }
        .paper .pdf-table-wrap {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          margin: 8px 0 14px !important;
          display: block !important;
        }
        .paper h2 { color: #0F2A4A !important; font-family: Georgia, serif !important; font-size: 19px !important; border-bottom: 1.5px solid #B8893A !important; margin: 26px 0 12px !important; padding-bottom: 4px !important; break-after: avoid !important; page-break-after: avoid !important; }
        .paper h2 .n { color: #B8893A !important; margin-right: 6px !important; }
        .paper h3 { color: #0F2A4A !important; font-family: Georgia, serif !important; font-size: 14.5px !important; margin: 14px 0 6px !important; font-weight: 700 !important; break-after: avoid !important; page-break-after: avoid !important; }
        .paper p { color: #1E293B !important; font-size: 13px !important; line-height: 1.6 !important; margin: 0 0 9px !important; max-width: 100% !important; }
        .paper ul, .paper ol { color: #1E293B !important; margin: 0 0 10px !important; padding-left: 20px !important; }
        .paper li { color: #1E293B !important; font-size: 13px !important; line-height: 1.5 !important; margin-bottom: 4px !important; }
        .paper li::marker { color: #B8893A !important; }
        .paper strong, .paper b { color: #0F172A !important; font-weight: 700 !important; }
        .paper table {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          table-layout: fixed !important;
          border-collapse: collapse !important;
          font-size: 12px !important;
          margin: 8px 0 14px !important;
          background: #FFFFFF !important;
          color: #1C2430 !important;
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        .paper thead, .paper tbody { background: #FFFFFF !important; width: 100% !important; }
        .paper tbody tr {
          background: #FFFFFF !important;
          width: 100% !important;
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        .paper th, .paper td {
          border: 1px solid #D5DCE5 !important;
          padding: 8px 10px !important;
          color: #1C2430 !important;
          background: #FFFFFF !important;
          vertical-align: top !important;
          text-align: left !important;
          box-sizing: border-box !important;
          word-break: break-word !important;
        }
        .paper .r { text-align: right !important; white-space: nowrap !important; }
        .paper table.pt thead th { background: #0F2A4A !important; color: #FFFFFF !important; border: 1px solid #0F2A4A !important; font-weight: 700 !important; }
        .paper table.pt thead th * { color: #FFFFFF !important; }
        .paper table.kv th { background: #F1F4F8 !important; color: #0F2A4A !important; font-weight: 700 !important; border: 1px solid #D5DCE5 !important; width: 28% !important; }
        .paper table.kv td { background: #FFFFFF !important; color: #1C2430 !important; border: 1px solid #D5DCE5 !important; }
        .paper tr.alt td { background: #F8FAFC !important; color: #1C2430 !important; }
        .paper tr.sum td { background: #F8FAFC !important; color: #0F2A4A !important; font-weight: 700 !important; border-top: 1.5px solid #0F2A4A !important; }
        .paper tr.sum td * { color: #0F2A4A !important; font-weight: 700 !important; }
        .paper tr.hl td { background: #FDF6E2 !important; color: #0F2A4A !important; font-size: 13px !important; }
        .paper tr.hl td * { color: #0F2A4A !important; }
        .paper tr.group td { background: #E2E8F0 !important; color: #0F2A4A !important; font-weight: 700 !important; }
        .paper tr.group td * { color: #0F2A4A !important; font-weight: 700 !important; }
        .paper tr.sub td { background: #FFFFFF !important; color: #64748B !important; font-style: italic !important; border-top: 0 !important; }
        .paper tr.sub td * { color: #64748B !important; }
        .paper tr.grand td { background: #0F2A4A !important; color: #FFFFFF !important; font-weight: 700 !important; font-size: 13px !important; border: 1px solid #0F2A4A !important; }
        .paper tr.grand td * { color: #FFFFFF !important; }
        .paper td p, .paper td ul, .paper td ol, .paper td li, .paper td div, .paper td span { background: transparent !important; }
        .paper td p { color: #1E293B !important; margin: 0 0 3px !important; }
        .paper td ul, .paper td ol { color: #1E293B !important; margin: 0 0 4px !important; padding-left: 16px !important; }
        .paper td li { color: #1E293B !important; margin-bottom: 2px !important; }
        .paper td li::marker { color: #B8893A !important; }
        .paper tr.grand .desc { color: #D9E1EC !important; }
        .paper .desc { color: #475569 !important; font-size: 11px !important; margin-top: 2px !important; }
        .paper .pnote { color: #475569 !important; font-style: italic !important; font-size: 12px !important; }
        .paper .approved-stamp { border: 1.5px solid #2F6B45 !important; background: #ECFDF5 !important; color: #2F6B45 !important; font-weight: 700 !important; padding: 8px 14px !important; border-radius: 6px !important; display: inline-flex !important; margin: 10px 0 !important; font-size: 13px !important; }
        .paper .approved-stamp.admin-stamp { border-color: #0F2A4A !important; background: #F1F4F8 !important; color: #0F2A4A !important; }
        .paper .sig { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 32px !important; margin-top: 22px !important; width: 100% !important; }
        .paper .sig .who { color: #0F2A4A !important; font-family: Georgia, serif !important; font-weight: 700 !important; margin-bottom: 12px !important; font-size: 14px !important; }
        .paper .sig .ln { border-bottom: 1px solid #CBD5E1 !important; color: #1E293B !important; padding: 8px 0 4px !important; font-size: 12px !important; }
        .paper .sig .ln span { color: #64748B !important; }
        .paper .foot { color: #64748B !important; font-size: 11px !important; margin-top: 24px !important; padding-top: 10px !important; border-top: 1px solid #D5DCE5 !important; text-align: center !important; }
      </style>
      ${p}
    `,document.body.appendChild(d),await new Promise(f=>setTimeout(f,400));const v={margin:0,filename:`${n.clientShort||n.client||"Client"} - ${n.title||"Proposal"}.pdf`.replace(/[\\/:*?"<>|]+/g,"_"),image:{type:"jpeg",quality:.98},html2canvas:{scale:2,backgroundColor:"#ffffff",useCORS:!0,logging:!1},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"},pagebreak:{mode:["avoid-all","css","legacy"],before:[".html2pdf__page-break",".pb"],avoid:[".pdf-section",".pdf-table-wrap",".sig",".approved-stamp",".choices",".kv","table","h2","h3"]}},g=d.querySelector(".paper");await l().set(v).from(g||d).save(),_("PDF downloaded successfully! 📄")}catch(l){alert("PDF export error: "+l.message)}finally{d.remove(),i.remove(),e.disabled=!1,e.textContent=r}}function Ae(n,t,e={}){const a=W(n,t,e),r=Z(a,!0),i=window.open("","_blank","width=950,height=1050");if(!i){alert("Please allow popups to open the print dialog.");return}i.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${o(n.client||"Client")} - ${o(n.title||"Proposal")}</title>
      <link rel="stylesheet" href="/src/css/style.css">
      <style>
        @page { size: A4 portrait; margin: 0; }
        body { margin: 0; padding: 0; background: #FFFFFF; font-family: Arial, Helvetica, sans-serif; }
        .paper { width: 100% !important; max-width: none !important; margin: 0 !important; box-shadow: none !important; }
        .paper .cover { height: 100vh !important; min-height: 100vh !important; page-break-after: always !important; break-after: page !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        .paper .html2pdf__page-break, .paper .pb { page-break-before: always !important; break-before: page !important; height: 1px !important; }
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      </style>
    </head>
    <body>
      ${r}
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.focus();
            window.print();
          }, 350);
        };
      <\/script>
    </body>
    </html>
  `),i.document.close()}class ke{constructor(t,e={}){this.container=t,this.options=e,this.currentUser=e.currentUser||ne()||{},this.userRole=e.userRole||this.currentUser.role||"employee",this.isAdmin=this.userRole==="admin"||this.userRole==="superadmin"||this.currentUser.role==="admin"||this.currentUser.role==="superadmin",this.proposals=[],this.rateDoc=null,this.pinStatus={isConfigured:!1,defaultPinHint:null},this.personnel=[],this.currentView="list",this.activeStep="brief",this.activeProposal=null,this.searchTerm="",this.statusFilter="all",this.briefTab="paste",this.saving=!1,this.saveTimeout=null}async init(){this.container.innerHTML='<div class="card" style="padding:40px;text-align:center"><div class="loading">Loading Proposal Studio…</div></div>';try{const[t,e,a,r]=await Promise.all([j("/proposals"),j("/proposals/ratecard"),j("/proposals/pin/status"),j("/personnel").catch(()=>[])]);this.proposals=t||[],this.rateDoc=e,this.pinStatus=a||{isConfigured:!1,defaultPinHint:null},this.personnel=r||[],this.render()}catch(t){this.container.innerHTML=`
        <div class="empty">
          <h3>Failed to load Proposal Studio</h3>
          <p class="muted">${o(t.message)}</p>
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
    `,this.container.querySelectorAll("[data-ps-view]").forEach(a=>{a.onclick=()=>{this.currentView=a.dataset.psView,this.render()}});const t=this.container.querySelector("#ps-btn-new-proposal");t&&(t.onclick=()=>this.createNewProposal());const e=this.container.querySelector("#ps-view-content");this.currentView==="list"?this.renderProposalList(e):this.currentView==="editor"?this.renderProposalEditor(e):this.currentView==="ratecard"?this.renderRateCardView(e):this.currentView==="audit"?this.renderAuditTrailView(e):this.currentView==="settings"&&this.renderSettingsView(e)}renderProposalList(t){var v,g,f;let e=[...this.proposals];if(!this.isAdmin){const s=(((v=this.currentUser)==null?void 0:v.name)||"").toLowerCase().trim(),m=String(((g=this.currentUser)==null?void 0:g._id)||((f=this.currentUser)==null?void 0:f.id)||"");e=e.filter(h=>{var u;const S=Array.isArray(h.team)&&h.team.some(b=>b.name&&s&&b.name.toLowerCase().includes(s)||b.memberId&&m&&(b.memberId===m||b.memberId==="emp_"+m)),F=Array.isArray(h.escalation)&&h.escalation.some(b=>b.name&&s&&b.name.toLowerCase().includes(s)),C=h.createdBy&&(typeof h.createdBy=="object"&&String(h.createdBy._id||h.createdBy.id)===m||String(h.createdBy)===m||h.createdBy.email&&((u=this.currentUser)==null?void 0:u.email)&&h.createdBy.email.toLowerCase()===this.currentUser.email.toLowerCase());return S||F||C})}const a=e;if(this.statusFilter!=="all"&&(e=e.filter(s=>s.status===this.statusFilter)),this.searchTerm.trim()){const s=this.searchTerm.trim().toLowerCase();e=e.filter(m=>(m.client||"").toLowerCase().includes(s)||(m.title||"").toLowerCase().includes(s)||(m.ref||"").toLowerCase().includes(s))}const r=a.filter(s=>s.status==="pending").length,i=a.filter(s=>s.status==="approved"||s.status==="with_client"||s.status==="won").length,d=a.reduce((s,m)=>s+J(m).contract,0);t.innerHTML=`
      <!-- Stats Overview Banner -->
      <div class="grid grid-4" style="margin-bottom:20px;">
        <div class="card kpi">
          <div class="label">${this.isAdmin?"Total Proposals":"My Assigned Proposals"}</div>
          <div class="value">${a.length}</div>
          <div class="sub">${this.isAdmin?"Active scope documents":"Role of engagement or escalation"}</div>
        </div>
        <div class="card kpi">
          <div class="label">Awaiting Admin PIN</div>
          <div class="value" style="color:${r>0?"var(--amber-500)":"var(--text-1)"}">${r}</div>
          <div class="sub">Needs internal authorization</div>
        </div>
        <div class="card kpi">
          <div class="label">PIN Approved / Live</div>
          <div class="value" style="color:var(--green-500)">${i}</div>
          <div class="sub">Verified & signed off</div>
        </div>
        <div class="card kpi">
          <div class="label">Pipeline Value</div>
          <div class="value" style="color:var(--brand-600)">${se(d)}</div>
          <div class="sub">Aggregate contract volume</div>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;flex:1;max-width:440px;">
          <input type="text" class="input" id="ps-search" placeholder="Search by client, title or reference..." value="${o(this.searchTerm)}">
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
              `:e.map(s=>{const m=J(s),h=this.renderStatusBadge(s),S=s.approval&&s.approval.decision==="approved"&&s.approval.pinVerified;return`
                  <tr style="cursor:pointer;" class="ps-row-hover" data-open-proposal="${o(s._id)}">
                    <td style="padding:14px 16px;">
                      <div style="font-weight:700;color:var(--text-1);font-size:14.5px;">${o(s.title||"Untitled Proposal")}</div>
                      <div class="muted small" style="font-family:var(--font-mono);">${o(s.ref)}${s.createdBy&&s.createdBy.name?` · <span style="color:var(--text-3);">By ${o(s.createdBy.name)}</span>`:""}</div>
                    </td>
                    <td style="padding:14px 16px;">
                      <div style="font-weight:600;color:var(--text-1);">${o(s.client)}</div>
                      <div class="muted small">${o(s.contact?s.contact+(s.contactRole?` (${s.contactRole})`:""):"—")}</div>
                    </td>
                    <td style="padding:14px 16px;">
                      <div>${Q(s.date)}</div>
                      <div class="muted small">${s.term?`${s.term} months retainer`:"One-time project"}</div>
                    </td>
                    <td style="padding:14px 16px;text-align:right;font-variant-numeric:tabular-nums;font-weight:700;color:var(--text-1);">
                      ${T(m.contract,s.currency)}
                      ${m.mon.has?`<div class="muted small" style="font-weight:400;">${T(m.mon.net,s.currency)}/mo</div>`:""}
                    </td>
                    <td style="padding:14px 16px;text-align:center;">
                      ${h}
                      ${S?'<div class="small" style="color:var(--green-600);font-size:11px;margin-top:2px;">🔐 PIN Verified</div>':""}
                    </td>
                    <td style="padding:14px 16px;text-align:right;" onclick="event.stopPropagation();">
                      <div style="display:inline-flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end;">
                        <button class="btn small" data-edit-p="${o(s._id)}" title="Edit proposal">✏️ Edit</button>
                        <button class="btn small" data-list-pdf="${o(s._id)}" title="Download PDF document directly">📄 PDF</button>
                        <button class="btn small" data-list-word="${o(s._id)}" title="Download Word (.docx) document directly">📝 Word</button>
                        ${s.shareId?`
                          <button class="btn small ghost" data-list-share="${o(s.shareId)}" title="Copy direct client review link">🔗 Link</button>
                        `:""}
                        ${this.isAdmin?`
                          ${s.status==="pending"||!S?`
                            <button class="btn small gold" data-quick-pin="${o(s._id)}" title="Approve with Admin PIN">🔐 Approve</button>
                          `:""}
                        `:`
                          ${s.status==="draft"?`
                            <button class="btn small gold" data-quick-submit="${o(s._id)}" title="Submit for Admin Approval">📤 Submit</button>
                          `:""}
                        `}
                        ${(s.status==="approved"||S)&&s.status!=="won"?`
                          <button class="btn small primary" data-send-client="${o(s._id)}" title="Send authorized proposal to client">
                            📤 ${s.status==="with_client"?"Re-send":"Send to Client"}
                          </button>
                        `:""}
                        <button class="btn small ghost text-red" data-delete-p="${o(s._id)}" title="Delete proposal">🗑️</button>
                      </div>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;const l=t.querySelector("#ps-search");l&&(l.oninput=s=>{this.searchTerm=s.target.value,this.renderProposalList(t)});const c=t.querySelector("#ps-status-filter");c&&(c.onchange=s=>{this.statusFilter=s.target.value,this.renderProposalList(t)});const p=t.querySelector("#ps-empty-new-btn");p&&(p.onclick=()=>this.createNewProposal()),t.querySelectorAll("[data-open-proposal]").forEach(s=>{s.onclick=()=>{const m=s.dataset.openProposal;this.openProposal(m)}}),t.querySelectorAll("[data-edit-p]").forEach(s=>{s.onclick=m=>{m.stopPropagation(),this.openProposal(s.dataset.editP)}}),t.querySelectorAll("[data-list-pdf]").forEach(s=>{s.onclick=async m=>{var S;m.stopPropagation();const h=this.proposals.find(F=>F._id===s.dataset.listPdf);h&&await Y(h,(S=this.rateDoc)==null?void 0:S.settings,s)}}),t.querySelectorAll("[data-list-word]").forEach(s=>{s.onclick=async m=>{var S;m.stopPropagation();const h=this.proposals.find(F=>F._id===s.dataset.listWord);h&&await X(h,(S=this.rateDoc)==null?void 0:S.settings,s)}}),t.querySelectorAll("[data-list-share]").forEach(s=>{s.onclick=m=>{m.stopPropagation();const h=`${window.location.origin}/proposal?p=${s.dataset.listShare}`;navigator.clipboard.writeText(h).then(()=>{_("Direct client proposal link copied! 📋")}).catch(()=>{prompt("Copy client link:",h)})}}),t.querySelectorAll("[data-quick-pin]").forEach(s=>{s.onclick=m=>{m.stopPropagation();const h=this.proposals.find(S=>S._id===s.dataset.quickPin);h&&this.showAdminPinModal(h,"Approved with Admin PIN",()=>this.init())}}),t.querySelectorAll("[data-quick-submit]").forEach(s=>{s.onclick=async m=>{m.stopPropagation();const h=s.dataset.quickSubmit;try{s.disabled=!0,s.textContent="Submitting…",await M(`/proposals/${h}/request-approval`,{note:`Submitted by ${this.currentUser.name||"employee"}`}),_("Proposal submitted to Admin for approval! ⏳");const S=await j("/proposals");this.proposals=S||[],this.renderProposalList(t)}catch(S){alert(S.message),s.disabled=!1,s.textContent="📤 Submit"}}}),t.querySelectorAll("[data-delete-p]").forEach(s=>{s.onclick=async m=>{m.stopPropagation();const h=s.dataset.deleteP,S=this.proposals.find(C=>C._id===h),F=(S==null?void 0:S.title)||(S==null?void 0:S.ref)||"this proposal";if(confirm(`Are you sure you want to permanently delete proposal "${F}"?`))try{s.disabled=!0,s.textContent="…",await oe(`/proposals/${h}`),_("Proposal deleted successfully"),this.proposals=this.proposals.filter(C=>C._id!==h),this.renderProposalList(t)}catch(C){alert("Failed to delete proposal: "+C.message),s.disabled=!1,s.textContent="🗑️"}}}),t.querySelectorAll("[data-send-client]").forEach(s=>{s.onclick=async m=>{var S;m.stopPropagation();const h=s.dataset.sendClient;try{s.disabled=!0,s.textContent="Sending…";const F=await M(`/proposals/${h}/send-to-client`);_("Proposal sent to client! 📤");const C=`${window.location.origin}/proposal?p=${F.shareId||((S=F.proposal)==null?void 0:S.shareId)}`;navigator.clipboard.writeText(C).catch(()=>{}),alert(`Proposal successfully sent to client!

Direct review link:
${C}

(Link copied to clipboard)`);const u=await j("/proposals");this.proposals=u||[],this.renderProposalList(t)}catch(F){alert("Failed to send to client: "+F.message),s.disabled=!1,s.textContent="📤 Send to Client"}}})}renderStatusBadge(t){const e=t.status||"draft";return e==="approved"?'<span class="badge green">🔐 Approved Internally</span>':e==="pending"?'<span class="badge amber">⏳ Awaiting Approval</span>':e==="with_client"?'<span class="badge blue">📤 With Client</span>':e==="won"?'<span class="badge green" style="font-weight:700;">🎉 Client Approved</span>':e==="changes"?'<span class="badge red">⚠️ Changes Requested</span>':e==="returned"?'<span class="badge red">↩️ Returned</span>':'<span class="badge gray">Draft</span>'}async createNewProposal(){var d;const t=new Date,e=t.getFullYear(),a=Math.floor(100+Math.random()*900),r=this.rateDoc&&this.rateDoc.settings||{};this.activeProposal={ref:`CI360/PR/${e}/${a}`,title:"Digital Marketing & Content Strategy Proposal",subtitle:"Comprehensive Strategy, Creative Production & Growth Execution",kicker:"Proposal for sign-off",oneLine:"Integrated marketing, creative content production, and managed digital visibility.",client:"Client",clientShort:"Client",contact:"",contactRole:"",industry:"",location:"India",currency:"INR",date:t.toISOString().slice(0,10),validity:30,brief:"",briefForm:{},briefFiles:[],services:[],tone:"Confident and consultative",sections:[{id:z(),title:"1. Understanding of the Brief",body:"We understand that your primary growth focus is building consistent brand presence, driving quality lead engagement, and scaling commercial outreach across digital platforms with high-caliber creative execution."},{id:z(),title:"2. Strategic Approach",body:`- Insight First, Story Always: Every deliverable is anchored in data, competitive analysis, and audience intent.
- Integrated Workflow: Unified management across design, copywriting, video, SEO, and performance tracking.
- Clear Governance: Regular weekly status updates and comprehensive monthly review calls.`},{id:z(),title:"3. Onboarding & First 30 Days",body:`- Days 1–7: Handover, admin access setup, brand asset audit, and team introduction.
- Days 8–15: Finalization of content calendar, tone guidelines, and campaign messaging framework.
- Days 16–30: Full publishing cadence, live monitoring, and delivery of month-one performance report.`},{id:z(),title:"4. Why CI360 Degrees",body:"With over 25+ years of strategic leadership (founded in 2017) and 60+ global mandates, CI360 Degrees pairs senior-level marketing counsel with responsive, AI-enabled production agility."}],heads:[],onRequest:[{id:z(),item:"Video Shoot Day (Director + Crew)",how:"On-location production day with lighting and sound",price:"₹45,000 per day"},{id:z(),item:"Custom Corporate Website (12 pages)",how:"WordPress/Elementor responsive website with SEO setup",price:"₹1,00,000 one-time"}],exclusions:"Paid media ad spend, external celebrity talent fees, venue/travel expenses outside city, and government filing fees.",term:6,termDisc:5,discount:0,gst:18,pricingView:"heads",retainerPay:"m-adv",retainerCustom:"",projectPay:"5050",milestones:[{pct:50,label:"Advance on signing"},{pct:50,label:"On final delivery and launch"}],retainerIncl:["A dedicated account lead and named team","A monthly content calendar, shared for approval before the month begins","A monthly performance report by the 5th working day, with a review call","A quarterly strategy review and plan reset","Replies to comments and messages within 1 business day","Two revision rounds on every deliverable","Use of CI360’s design, scheduling and AI tool stack at no extra cost"],team:[...(d=this.currentUser)!=null&&d.name&&!this.isAdmin?[{id:z(),memberId:this.currentUser._id?"emp_"+this.currentUser._id:"",name:this.currentUser.name,role:"Engagement Lead",resp:"Project lead and primary client engagement liaison"}]:[],...(r.team||[]).slice(0,4).filter(l=>{var c;return!((c=this.currentUser)!=null&&c.name)||l.name.toLowerCase()!==this.currentUser.name.toLowerCase()}).map(l=>({id:z(),memberId:l.id,name:l.name,role:l.engRole||l.role,resp:l.resp||""}))],clientTeam:"Point of Contact for Approvals: TBD on signing",cadence:`**How we work together**
- Weekly 30-minute status call with the client’s designated point of contact.
- Shared tracker for requests, deliverables, and revisions.
- Monthly performance report by the 5th working day followed by an executive review call.
- Quarterly strategy review to reset targets and priorities.`,escalation:[{name:"Mansi Bagdai",role:"Strategy & Growth Lead, Account Lead",when:"Day-to-day operational matters not resolved within 1 working day"},{name:"Urna Banerji",role:"COO",when:"Delivery, quality, or timeline concerns not resolved within 2 working days"},{name:"Pramit Ghosh",role:"Founder & CEO",when:"Commercial or strategic relationship matters, or anything unresolved at Level 2"}],terms:(r.termsLib||[]).map(l=>({...l,on:l.tag==="general"})),clientNeeds:["A signed copy of this proposal, and purchase order if required by client policies.","Official start date and a designated primary point of contact with approver details.","Billing information: Legal entity name, registered office address, and GSTIN."],choices:[{id:z(),label:"Proposed Start Date",options:[]},{id:z(),label:"Billing Entity Name & GSTIN",options:[]}],openItems:[],notes:"",status:"draft",approval:null,approvalHistory:[],shareId:null,sharedVersion:0};const i=this.rateDoc&&this.rateDoc.packages&&this.rateDoc.packages[0];i&&this.activeProposal.heads.push(this.createHeadFromPackage(i)),await this.saveActiveProposal(!0),this.activeStep="brief",this.currentView="editor",this.render()}createHeadFromPackage(t){const e=(t.components||[]).map(a=>{const r=this.rateDoc&&this.rateDoc.items&&this.rateDoc.items.find(i=>i.id===a.rateId);return r?{id:z(),rateId:r.id,service:r.service,desc:r.inc||"",unit:r.unit||"item",qty:w(a.qty)||1,rate:w(r.inr)||0,slabs:re(r.slabs||[])}:null}).filter(Boolean);return{id:z(),packageId:t.id,title:t.service,billing:t.billing||"monthly",desc:t.desc||"",exc:t.exc||"",mult:w(t.mult)||1,multLabel:t.multLabel||"brands",packDisc:w(t.packDisc)||0,fixed:0,lines:e}}async openProposal(t){try{const e=await j(`/proposals/${t}`);this.activeProposal=e,this.activeStep="scope",this.currentView="editor",this.render()}catch(e){alert("Could not open proposal: "+e.message)}}async saveActiveProposal(t=!1){if(!this.activeProposal)return;this.saving=!0;const e=this.container.querySelector("#ps-save-state");e&&(e.textContent="Saving…");try{let a;this.activeProposal._id?a=await ie(`/proposals/${this.activeProposal._id}`,this.activeProposal):(a=await M("/proposals",this.activeProposal),this.activeProposal._id=a._id),this.activeProposal=a;const r=this.proposals.findIndex(i=>i._id===a._id);r>=0?this.proposals[r]=a:this.proposals.unshift(a),e&&(e.textContent="Saved ✓")}catch(a){e&&(e.textContent="Save failed: "+a.message)}finally{this.saving=!1}}scheduleAutoSave(){clearTimeout(this.saveTimeout);const t=this.container.querySelector("#ps-save-state");t&&(t.textContent="Unsaved changes"),this.saveTimeout=setTimeout(()=>this.saveActiveProposal(!0),1200)}renderProposalEditor(t){const e=this.activeProposal;if(!e)return this.render();const a=J(e),r=this.rateDoc&&this.rateDoc.settings||{},i=[["brief","1. Client & Brief"],["scope","2. Scope & Pricing"],["content","3. Content Narrative"],["team","4. Team & Governance"],["terms","5. Terms & Payment"],["approve","6. Approval & Release"]],d=e.approval&&e.approval.decision==="approved"&&e.approval.pinVerified;t.innerHTML=`
      <div class="ps-editor-container">
        <!-- Editor Navigation Header -->
        <div class="card ps-editor-topbar">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <button class="btn small" id="ps-editor-back-btn">← Back to Proposals</button>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">
              ${o(e.client||"Untitled Client")} — ${o(e.title||"Proposal")}
            </h3>
            <span class="muted small" style="font-family:var(--font-mono);">(${o(e.ref)})</span>
            ${this.renderStatusBadge(e)}
          </div>

          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <div id="ps-save-state" class="muted small" style="font-weight:600;">Saved ✓</div>
            <div style="text-align:right;margin-right:4px;">
              <span class="muted small">Contract Value:</span>
              <strong style="color:var(--brand-600);font-size:16px;margin-left:4px;">${T(a.contract,e.currency)}</strong>
            </div>

            <!-- PROPER PREVIEW BUTTON -->
            <button class="btn gold" id="ps-open-preview-modal-btn" style="font-weight:700;display:inline-flex;align-items:center;gap:8px;">
              <span>👁️ Preview Proposal Document</span>
            </button>

            <button class="btn small" id="ps-preview-pdf-btn" ${d?"":'disabled title="Requires Admin PIN Approval"'}>
              📄 Download PDF
            </button>
            <button class="btn small" id="ps-preview-docx-btn" ${d?"":'disabled title="Requires Admin PIN Approval"'}>
              📝 Word
            </button>
            <button class="btn small primary" id="ps-manual-save-btn">Save Changes</button>
            ${(d||e.status==="approved"||e.status==="with_client")&&e.status!=="won"?`
              <button class="btn small primary" id="ps-editor-send-client-btn" style="background:#0F2A4A;color:#FFFFFF;border-color:#0F2A4A;" title="Send proposal to client">
                📤 ${e.status==="with_client"?"Re-send Link":"Send to Client"}
              </button>
            `:""}
            <button class="btn small ghost text-red" id="ps-editor-delete-btn" title="Delete this proposal">🗑️ Delete</button>
          </div>
        </div>

        <!-- 6-Step Tab Bar -->
        <div class="ps-steps-bar card" style="padding:6px;display:flex;gap:4px;overflow-x:auto;">
          ${i.map(([s,m])=>`
            <button class="ps-step-btn ${this.activeStep===s?"active":""}" data-step="${s}">
              ${m}
              ${s==="approve"&&d?" 🔐":""}
            </button>
          `).join("")}
        </div>

        <!-- Full Width Step Content (Spacious, Proper UI) -->
        <div class="ps-step-content-full" id="ps-step-pane"></div>
      </div>
    `,t.querySelector("#ps-editor-back-btn").onclick=()=>{this.currentView="list",this.render()},t.querySelector("#ps-manual-save-btn").onclick=()=>this.saveActiveProposal();const l=t.querySelector("#ps-editor-delete-btn");l&&(l.onclick=async()=>{if(!e._id){this.activeProposal=null,this.currentView="list",this.render();return}const s=e.title||e.ref||"this proposal";if(confirm(`Are you sure you want to permanently delete proposal "${s}"?`))try{l.disabled=!0,l.textContent="Deleting…",await oe(`/proposals/${e._id}`),_("Proposal deleted successfully"),this.proposals=this.proposals.filter(m=>m._id!==e._id),this.activeProposal=null,this.currentView="list",this.render()}catch(m){alert("Failed to delete proposal: "+m.message),l.disabled=!1,l.textContent="🗑️ Delete"}});const c=t.querySelector("#ps-editor-send-client-btn");c&&(c.onclick=async()=>{var s;try{c.disabled=!0,c.textContent="Sending…";const m=await M(`/proposals/${e._id}/send-to-client`);_("Proposal sent to client! 📤");const h=`${window.location.origin}/proposal?p=${m.shareId||((s=m.proposal)==null?void 0:s.shareId)}`;navigator.clipboard.writeText(h).catch(()=>{}),alert(`Proposal successfully sent to client!

Direct review link:
${h}

(Link copied to clipboard)`);const S=await j(`/proposals/${e._id}`);this.activeProposal=S,this.renderProposalEditor(t)}catch(m){alert("Failed to send to client: "+m.message),c.disabled=!1,c.textContent="📤 Send to Client"}});const p=t.querySelector("#ps-open-preview-modal-btn");p&&(p.onclick=()=>this.showPreviewModal()),t.querySelectorAll("[data-step]").forEach(s=>{s.onclick=()=>{this.activeStep=s.dataset.step,this.renderProposalEditor(t)}});const v=t.querySelector("#ps-preview-docx-btn");v&&(v.onclick=()=>X(e,r,v));const g=t.querySelector("#ps-preview-pdf-btn");g&&(g.onclick=()=>Y(e,r,g));const f=t.querySelector("#ps-step-pane");this.activeStep==="brief"?this.renderStepBrief(f):this.activeStep==="scope"?this.renderStepScope(f):this.activeStep==="content"?this.renderStepContent(f):this.activeStep==="team"?this.renderStepTeam(f):this.activeStep==="terms"?this.renderStepTerms(f):this.activeStep==="approve"&&this.renderStepApprove(f)}showPreviewModal(){const t=this.activeProposal;if(!t)return;const e=this.rateDoc&&this.rateDoc.settings||{},a=t.approval&&t.approval.decision==="approved"&&t.approval.pinVerified,r=document.querySelector(".ps-preview-modal-overlay");r&&r.remove();const i=document.createElement("div");i.className="modal-backdrop ps-preview-modal-overlay",i.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,0.8);backdrop-filter:blur(6px);display:flex;flex-direction:column;z-index:99999;padding:0;animation:modalFade 0.2s ease;",i.innerHTML=`
      <!-- Modal Top Control Bar -->
      <div style="background:#0F2A4A;color:#FFFFFF;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.12);flex-shrink:0;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:22px;">📄</span>
          <div>
            <strong style="font-size:16px;color:#FFFFFF;">${o(t.client||"Client")} — ${o(t.title||"Proposal")}</strong>
            <span class="muted small" style="color:#AEBBCD;margin-left:8px;font-family:var(--font-mono);">(${o(t.ref)})</span>
          </div>
          ${a?'<span class="badge green" style="background:#059669;color:#fff;">🔐 PIN Approved</span>':'<span class="badge amber" style="background:#D97706;color:#fff;">Draft / Unapproved</span>'}
        </div>

        <div style="display:flex;align-items:center;gap:10px;">
          <button class="btn small" id="ps-modal-export-docx" ${a?"":'disabled title="Requires Admin PIN Approval"'} style="background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.25);">
            📝 Download Word (.docx)
          </button>
          <button class="btn small gold" id="ps-modal-export-pdf" ${a?"":'disabled title="Requires Admin PIN Approval"'} style="font-weight:700;">
            📄 Download PDF
          </button>
          <button class="btn small" id="ps-modal-print-btn" ${a?"":'disabled title="Requires Admin PIN Approval"'} style="background:rgba(255,255,255,0.18);color:#fff;border-color:rgba(255,255,255,0.3);font-weight:600;">
            🖨️ Print / Vector PDF
          </button>
          <button class="btn small" id="ps-close-preview-modal" style="background:rgba(255,255,255,0.2);color:#fff;border-color:transparent;font-weight:700;margin-left:6px;">
            ✕ Close Preview
          </button>
        </div>
      </div>

      <!-- Scrollable Centered Document Container -->
      <div style="flex:1;overflow-y:auto;padding:36px 16px;background:#DCE1E8;">
        <div style="max-width:820px;margin:0 auto;box-shadow:0 8px 30px rgba(0,0,0,0.25);border-radius:6px;overflow:hidden;" id="ps-modal-live-paper" data-theme="light">
          ${Z(W(t,e))}
        </div>
      </div>
    `,document.body.append(i),i.querySelector("#ps-close-preview-modal").onclick=()=>i.remove();const d=i.querySelector("#ps-modal-export-docx");d&&(d.onclick=()=>X(t,e,d));const l=i.querySelector("#ps-modal-export-pdf");l&&(l.onclick=()=>Y(t,e,l));const c=i.querySelector("#ps-modal-print-btn");c&&(c.onclick=()=>Ae(t,e));const p=v=>{v.key==="Escape"&&(i.remove(),window.removeEventListener("keydown",p))};window.addEventListener("keydown",p)}refreshLivePaper(){const t=document.querySelector("#ps-modal-live-paper");if(t&&this.activeProposal){const e=this.rateDoc&&this.rateDoc.settings||{};t.innerHTML=Z(W(this.activeProposal,e))}}renderStepBrief(t){const e=this.activeProposal;t.innerHTML=`
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Client Profile & Proposal Information</h3>
        <div class="grid grid-2">
          <div>
            <label class="label">Client Organisation <span style="color:var(--red-500)">*</span></label>
            <input type="text" class="input" id="ps-f-client" value="${o(e.client)}" placeholder="e.g. Times of India / Hilton">
          </div>
          <div>
            <label class="label">Short Name in Narrative</label>
            <input type="text" class="input" id="ps-f-clientShort" value="${o(e.clientShort)}" placeholder="e.g. TOI">
          </div>
          <div>
            <label class="label">Primary Contact Person</label>
            <input type="text" class="input" id="ps-f-contact" value="${o(e.contact)}" placeholder="e.g. Rajesh Sharma">
          </div>
          <div>
            <label class="label">Contact Designation / Title</label>
            <input type="text" class="input" id="ps-f-contactRole" value="${o(e.contactRole)}" placeholder="e.g. VP Marketing">
          </div>
          <div>
            <label class="label">Industry / Sector</label>
            <input type="text" class="input" id="ps-f-industry" value="${o(e.industry)}" placeholder="e.g. Hospitality / Fintech">
          </div>
          <div>
            <label class="label">Target Market / Geography</label>
            <input type="text" class="input" id="ps-f-location" value="${o(e.location)}" placeholder="e.g. India & GCC">
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
            <input type="date" class="input" id="ps-f-date" value="${o(e.date)}">
          </div>
          <div>
            <label class="label">Proposal Validity (Days)</label>
            <input type="number" class="input" id="ps-f-validity" value="${o(e.validity)}" min="1">
          </div>
          <div>
            <label class="label">Proposal Reference ID</label>
            <input type="text" class="input" id="ps-f-ref" value="${o(e.ref)}">
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 4px 0;">Client Brief & Strategic Requirements</h3>
        <p class="muted small" style="margin:0 0 12px 0;">Paste discovery notes, client requirements, RFP extracts, or RFQ scope items below.</p>
        <textarea class="input" id="ps-f-brief" rows="7" placeholder="Paste discovery call transcripts, client goals, expected deliverables, competitor benchmarks, or timelines...">${o(e.brief)}</textarea>
      </div>

      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Proposal Title & Narrative Cover</h3>
        <div class="grid grid-2">
          <div class="span2">
            <label class="label">Cover Title</label>
            <input type="text" class="input" id="ps-f-title" value="${o(e.title)}">
          </div>
          <div class="span2">
            <label class="label">Cover Subtitle</label>
            <input type="text" class="input" id="ps-f-subtitle" value="${o(e.subtitle)}">
          </div>
          <div class="span2">
            <label class="label">One-Line Executive Scope Summary</label>
            <textarea class="input" id="ps-f-oneLine" rows="2">${o(e.oneLine)}</textarea>
          </div>
        </div>
      </div>
    `;const a=(i,d,l=!1)=>{const c=t.querySelector(i);c&&(c.oninput=()=>{e[d]=l?w(c.value):c.value,this.scheduleAutoSave(),this.refreshLivePaper()})};a("#ps-f-client","client"),a("#ps-f-clientShort","clientShort"),a("#ps-f-contact","contact"),a("#ps-f-contactRole","contactRole"),a("#ps-f-industry","industry"),a("#ps-f-location","location"),a("#ps-f-date","date"),a("#ps-f-validity","validity",!0),a("#ps-f-ref","ref"),a("#ps-f-brief","brief"),a("#ps-f-title","title"),a("#ps-f-subtitle","subtitle"),a("#ps-f-oneLine","oneLine");const r=t.querySelector("#ps-f-currency");r&&(r.onchange=()=>{e.currency=r.value,e.currency==="USD"&&e.gst===18&&(e.gst=0),e.currency==="INR"&&!e.gst&&(e.gst=18),this.repriceAllScopeLines(),this.scheduleAutoSave(),this.refreshLivePaper()})}repriceAllScopeLines(){const t=this.activeProposal;!t||!this.rateDoc||(t.heads||[]).forEach(e=>{(e.lines||[]).forEach(a=>{const r=this.rateDoc.items.find(i=>i.id===a.rateId);r&&(a.rate=w(t.currency==="USD"?r.usd:r.inr))})})}renderStepScope(t){const e=this.activeProposal,a=this.rateDoc&&this.rateDoc.items||[],r=this.rateDoc&&this.rateDoc.packages||[];t.innerHTML=`
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Heads of Work & Deliverables</h3>
            <p class="muted small" style="margin:0;">Add packaged service suites or custom line items. Volume discounts apply automatically as quantities scale.</p>
          </div>
          <div style="display:flex;gap:8px;">
            <select class="input" id="ps-add-pkg-select" style="width:200px;">
              <option value="">+ Add Package...</option>
              ${r.map(g=>`<option value="${o(g.id)}">${o(g.service)} (${g.billing})</option>`).join("")}
            </select>
            <select class="input" id="ps-add-svc-select" style="width:200px;">
              <option value="">+ Add Single Item...</option>
              ${a.map(g=>`<option value="${o(g.id)}">${o(g.category)}: ${o(g.service)}</option>`).join("")}
            </select>
            <button class="btn small" id="ps-add-blank-head-btn">+ Blank Head</button>
          </div>
        </div>

        <div id="ps-heads-list">
          ${(e.heads||[]).map((g,f)=>this.renderHeadCardHTML(g,f)).join("")}
        </div>
      </div>

      <!-- Commercials & Discounts -->
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Commercial Terms, Discounts & Taxes</h3>
        <div class="grid grid-4">
          <div>
            <label class="label">Retainer Term (Months)</label>
            <input type="number" class="input" id="ps-f-term" value="${o(e.term)}" min="1">
          </div>
          <div>
            <label class="label">Term Commitment Discount (%)</label>
            <input type="number" class="input" id="ps-f-termDisc" value="${o(e.termDisc)}" min="0" max="90" step="any">
          </div>
          <div>
            <label class="label">Additional Commercial Discount (%)</label>
            <input type="number" class="input" id="ps-f-discount" value="${o(e.discount)}" min="0" max="90" step="any">
          </div>
          <div>
            <label class="label">${e.currency==="INR"?"GST Tax Rate (%)":"Tax Rate (%)"}</label>
            <input type="number" class="input" id="ps-f-gst" value="${o(e.gst)}" min="0" step="any">
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
        <textarea class="input" id="ps-f-exclusions" rows="2" placeholder="e.g. Media ad spend, commercial talent fees, travel expenses...">${o(e.exclusions)}</textarea>
      </div>
    `;const i=t.querySelector("#ps-add-pkg-select");i&&(i.onchange=()=>{const g=i.value;if(!g)return;const f=r.find(s=>s.id===g);f&&(e.heads.push(this.createHeadFromPackage(f)),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper())});const d=t.querySelector("#ps-add-svc-select");d&&(d.onchange=()=>{const g=d.value;if(!g)return;const f=a.find(s=>s.id===g);if(f){const s=/month|handle set|platform/.test(f.unit)||/month/.test(f.note||"");e.heads.push({id:z(),packageId:null,title:f.service,billing:s?"monthly":"one-time",desc:"",exc:f.exc||"",mult:1,multLabel:"brands",packDisc:0,fixed:0,lines:[{id:z(),rateId:f.id,service:f.service,desc:f.inc||"",unit:f.unit||"item",qty:1,rate:w(e.currency==="USD"?f.usd:f.inr),slabs:re(f.slabs||[])}]}),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}});const l=t.querySelector("#ps-add-blank-head-btn");l&&(l.onclick=()=>{e.heads.push({id:z(),packageId:null,title:"Custom Scope Area",billing:"monthly",desc:"",exc:"",mult:1,multLabel:"brands",packDisc:0,fixed:0,lines:[]}),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}),this.bindHeadEvents(t);const c=t.querySelector("#ps-f-term");c&&(c.oninput=()=>{e.term=Math.max(1,w(c.value)),e.term>=12?e.termDisc=10:e.term>=6?e.termDisc=5:e.termDisc=0;const g=t.querySelector("#ps-f-termDisc");g&&(g.value=e.termDisc),this.scheduleAutoSave(),this.refreshLivePaper()});const p=(g,f)=>{const s=t.querySelector(g);s&&(s.oninput=()=>{e[f]=w(s.value),this.scheduleAutoSave(),this.refreshLivePaper()})};p("#ps-f-termDisc","termDisc"),p("#ps-f-discount","discount"),p("#ps-f-gst","gst"),t.querySelectorAll('input[name="ps-pricing-view"]').forEach(g=>{g.onchange=()=>{e.pricingView=g.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const v=t.querySelector("#ps-f-exclusions");v&&(v.oninput=()=>{e.exclusions=v.value,this.scheduleAutoSave(),this.refreshLivePaper()})}renderHeadCardHTML(t,e){const a=this.activeProposal,r=he(t);return`
      <div class="headcard" data-head-id="${o(t.id)}" style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:16px;margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap;">
          <input type="text" class="input hc-title" data-head-field="title" value="${o(t.title)}" style="font-weight:700;flex:1;min-width:200px;">
          <select class="input" data-head-field="billing" style="width:130px;">
            <option value="monthly" ${t.billing==="monthly"?"selected":""}>Monthly</option>
            <option value="one-time" ${t.billing!=="monthly"?"selected":""}>One-time</option>
          </select>
          <div style="display:inline-flex;gap:4px;">
            <button class="btn small" data-head-action="up" ${e===0?"disabled":""} title="Move Up">↑</button>
            <button class="btn small" data-head-action="down" ${e===a.heads.length-1?"disabled":""} title="Move Down">↓</button>
            <button class="btn small danger" data-head-action="remove" title="Remove Head">✕</button>
          </div>
        </div>

        <div style="display:flex;gap:14px;flex-wrap:wrap;font-size:13px;margin-bottom:12px;align-items:center;">
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Multiplier:</span>
            <input type="number" class="input" data-head-field="mult" value="${o(t.mult||1)}" min="1" style="width:65px;">
            <input type="text" class="input" data-head-field="multLabel" value="${o(t.multLabel||"brands")}" style="width:100px;">
          </label>
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Package Disc (%):</span>
            <input type="number" class="input" data-head-field="packDisc" value="${o(t.packDisc||0)}" min="0" max="90" style="width:75px;">
          </label>
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Fixed Override:</span>
            <input type="number" class="input" data-head-field="fixed" value="${o(t.fixed||"")}" placeholder="None" style="width:110px;">
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
              ${(t.lines||[]).map(i=>{const d=w(i.qty)*w(i.rate),l=ue(i.slabs,w(i.qty)*(w(t.mult)||1)),c=d*(1-l/100);return`
                  <tr data-line-id="${o(i.id)}">
                    <td><input type="text" class="input" data-line-field="service" value="${o(i.service)}" style="font-weight:600;width:100%;"></td>
                    <td><input type="text" class="input" data-line-field="desc" value="${o(i.desc)}" placeholder="What this line covers..." style="width:100%;"></td>
                    <td><input type="number" class="input" data-line-field="qty" value="${o(i.qty)}" min="0" style="text-align:center;width:100%;font-weight:700;font-variant-numeric:tabular-nums;"></td>
                    <td><input type="text" class="input" data-line-field="unit" value="${o(i.unit)}" style="width:100%;"></td>
                    <td><input type="number" class="input" data-line-field="rate" value="${o(i.rate)}" min="0" style="text-align:right;width:100%;font-weight:700;font-variant-numeric:tabular-nums;"></td>
                    <td style="text-align:right;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap;padding:12px 10px;">
                      ${T(c,a.currency)}
                      ${l?`<div style="color:var(--green-600);font-size:11px;font-weight:500;">(${l}% vol disc)</div>`:""}
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
            Head Subtotal: <span style="color:var(--brand-600);">${T(r.net,a.currency)}</span>
            <span class="muted small" style="font-weight:400;">${t.billing==="monthly"?"/ month":" one-time"}</span>
          </div>
        </div>
      </div>
    `}bindHeadEvents(t){const e=this.activeProposal;t.querySelectorAll(".headcard").forEach((a,r)=>{const i=a.dataset.headId,d=e.heads.find(c=>c.id===i);if(!d)return;a.querySelectorAll("[data-head-field]").forEach(c=>{c.oninput=()=>{const p=c.dataset.headField;d[p]=c.type==="number"?w(c.value):c.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const l=a.querySelector('select[data-head-field="billing"]');l&&(l.onchange=()=>{d.billing=l.value,this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}),a.querySelectorAll("[data-head-action]").forEach(c=>{c.onclick=()=>{const p=c.dataset.headAction;p==="remove"?e.heads=e.heads.filter(v=>v.id!==i):p==="up"&&r>0?[e.heads[r-1],e.heads[r]]=[e.heads[r],e.heads[r-1]]:p==="down"&&r<e.heads.length-1?[e.heads[r+1],e.heads[r]]=[e.heads[r],e.heads[r+1]]:p==="add-line"&&d.lines.push({id:z(),rateId:"",service:"Custom Deliverable",desc:"",unit:"item",qty:1,rate:0,slabs:[]}),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}}),a.querySelectorAll("tr[data-line-id]").forEach(c=>{const p=c.dataset.lineId,v=d.lines.find(f=>f.id===p);if(!v)return;c.querySelectorAll("[data-line-field]").forEach(f=>{f.oninput=()=>{const s=f.dataset.lineField;v[s]=f.type==="number"?w(f.value):f.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const g=c.querySelector('[data-line-action="remove"]');g&&(g.onclick=()=>{d.lines=d.lines.filter(f=>f.id!==p),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()})})})}renderStepContent(t){const e=this.activeProposal;t.innerHTML=`
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Proposal Narrative Sections</h3>
            <p class="muted small" style="margin:0;">The core strategic story: Understanding, Strategic Approach, Implementation, and Credentials.</p>
          </div>
          <button class="btn small" id="ps-add-section-btn">+ Add Section</button>
        </div>

        <div id="ps-sections-list">
          ${(e.sections||[]).map((a,r)=>`
            <div class="card ps-sec-card" data-sec-id="${o(a.id)}" style="background:var(--bg-elevated);border:1px solid var(--border-sm);padding:14px;margin-bottom:12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <input type="text" class="input" data-sec-field="title" value="${o(a.title)}" style="font-weight:700;flex:1;">
                <button class="btn small danger" data-sec-action="remove">✕</button>
              </div>
              <textarea class="input" data-sec-field="body" rows="4" placeholder="Section body text... Use '- ' for bullet points.">${o(a.body)}</textarea>
            </div>
          `).join("")}
        </div>
      </div>
    `,t.querySelector("#ps-add-section-btn").onclick=()=>{e.sections.push({id:z(),title:"New Narrative Section",body:""}),this.scheduleAutoSave(),this.renderStepContent(t),this.refreshLivePaper()},t.querySelectorAll(".ps-sec-card").forEach(a=>{const r=a.dataset.secId,i=e.sections.find(p=>p.id===r);if(!i)return;const d=a.querySelector('[data-sec-field="title"]');d&&(d.oninput=()=>{i.title=d.value,this.scheduleAutoSave(),this.refreshLivePaper()});const l=a.querySelector('[data-sec-field="body"]');l&&(l.oninput=()=>{i.body=l.value,this.scheduleAutoSave(),this.refreshLivePaper()});const c=a.querySelector('[data-sec-action="remove"]');c&&(c.onclick=()=>{e.sections=e.sections.filter(p=>p.id!==r),this.scheduleAutoSave(),this.renderStepContent(t),this.refreshLivePaper()})})}renderStepTeam(t){const e=this.activeProposal,a=this.rateDoc&&this.rateDoc.settings&&this.rateDoc.settings.team||[],r=(this.personnel||[]).filter(p=>p.status!=="inactive"),i=[];r.forEach(p=>{i.push({id:"emp_"+p._id,name:p.name,role:p.duties||p.role||"Team Member",resp:p.duties?`Execution lead for ${p.duties}`:"Mandate execution and client deliverables"})}),a.forEach(p=>{i.some(v=>v.name.toLowerCase()===p.name.toLowerCase())||i.push({id:p.id,name:p.name,role:p.engRole||p.role||"Specialist",resp:p.resp||""})}),(!Array.isArray(e.escalation)||!e.escalation.length)&&(e.escalation=[{name:"Mansi Bagdai",role:"Strategy & Growth Lead, Account Lead",when:"Day-to-day operational matters not resolved within 1 working day"},{name:"Urna Banerji",role:"COO",when:"Delivery, quality, or timeline concerns not resolved within 2 working days"},{name:"Pramit Ghosh",role:"Founder & CEO",when:"Commercial or strategic relationship matters, or anything unresolved at Level 2"}]),t.innerHTML=`
      <!-- Named Team -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Named CI360 Account Team</h3>
            <p class="muted small" style="margin:0;">Select from all employees in your team (${r.length} available) or enter custom role assignments for this engagement.</p>
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
              ${(e.team||[]).map(p=>`
                <tr data-team-id="${o(p.id)}">
                  <td>
                    <select class="input" data-t-select style="font-size:12.5px;">
                      <option value="">Select Employee...</option>
                      ${i.map(v=>`<option value="${o(v.id)}" ${p.memberId===v.id||p.name===v.name?"selected":""}>${o(v.name)} (${o(v.role)})</option>`).join("")}
                    </select>
                  </td>
                  <td><input type="text" class="input" data-t-field="name" value="${o(p.name)}" placeholder="Full Name"></td>
                  <td><input type="text" class="input" data-t-field="role" value="${o(p.role)}" placeholder="e.g. Account Lead"></td>
                  <td><input type="text" class="input" data-t-field="resp" value="${o(p.resp)}" placeholder="Specific ownership"></td>
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
              ${e.escalation.map((p,v)=>`
                <tr data-escl-idx="${v}">
                  <td><span class="badge blue">Level ${v+1}</span></td>
                  <td>
                    <select class="input" data-e-select style="font-size:12.5px;">
                      <option value="">Select Employee...</option>
                      ${i.map(g=>`<option value="${o(g.name)}" ${p.name===g.name?"selected":""}>${o(g.name)} (${o(g.role)})</option>`).join("")}
                    </select>
                  </td>
                  <td><input type="text" class="input" data-e-field="name" value="${o(p.name||"")}" placeholder="Contact Name"></td>
                  <td><input type="text" class="input" data-e-field="role" value="${o(p.role||"")}" placeholder="Designation / Role"></td>
                  <td><input type="text" class="input" data-e-field="when" value="${o(p.when||"")}" placeholder="Trigger SLA or condition"></td>
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
        <textarea class="input" id="ps-f-clientTeam" rows="2" placeholder="e.g. Content approval: Sachin Nagi; Commercial sign-off: Pramit Ghosh">${o(e.clientTeam)}</textarea>
      </div>

      <!-- Meeting Cadence -->
      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 6px 0;">How We Work Together (Governance & Meeting Cadence)</h3>
        <p class="muted small" style="margin:0 0 10px 0;">Regular touchpoints, review calls, content calendar approval flow, and reporting rhythm.</p>
        <textarea class="input" id="ps-f-cadence" rows="4">${o(e.cadence)}</textarea>
      </div>
    `,t.querySelector("#ps-add-team-btn").onclick=()=>{e.team.push({id:z(),memberId:"",name:"",role:"",resp:""}),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()},t.querySelectorAll("tr[data-team-id]").forEach(p=>{const v=p.dataset.teamId,g=e.team.find(m=>m.id===v);if(!g)return;const f=p.querySelector("[data-t-select]");f&&(f.onchange=()=>{const m=i.find(h=>h.id===f.value);m?(g.memberId=m.id,g.name=m.name,g.role=m.role,g.resp=m.resp||""):g.memberId="",this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()}),p.querySelectorAll("[data-t-field]").forEach(m=>{m.oninput=()=>{g[m.dataset.tField]=m.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const s=p.querySelector('[data-t-action="remove"]');s&&(s.onclick=()=>{e.team=e.team.filter(m=>m.id!==v),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()})});const d=t.querySelector("#ps-add-escl-btn");d&&(d.onclick=()=>{e.escalation.push({name:"",role:"",when:""}),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()}),t.querySelectorAll("tr[data-escl-idx]").forEach(p=>{const v=Number(p.dataset.esclIdx),g=e.escalation[v];if(!g)return;const f=p.querySelector("[data-e-select]");f&&(f.onchange=()=>{const m=i.find(h=>h.name===f.value);m&&(g.name=m.name,g.role=m.role),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()}),p.querySelectorAll("[data-e-field]").forEach(m=>{m.oninput=()=>{g[m.dataset.eField]=m.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const s=p.querySelector('[data-e-action="remove"]');s&&(s.onclick=()=>{e.escalation.splice(v,1),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()})});const l=t.querySelector("#ps-f-clientTeam");l&&(l.oninput=()=>{e.clientTeam=l.value,this.scheduleAutoSave(),this.refreshLivePaper()});const c=t.querySelector("#ps-f-cadence");c&&(c.oninput=()=>{e.cadence=c.value,this.scheduleAutoSave(),this.refreshLivePaper()})}renderStepTerms(t){const e=this.activeProposal;t.innerHTML=`
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
        <textarea class="input" id="ps-f-clientNeeds" rows="4" placeholder="One requirement per line...">${o((e.clientNeeds||[]).join(`
`))}</textarea>
      </div>

      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Legal Terms & Clauses Included</h3>
        <div style="display:grid;gap:8px;">
          ${(e.terms||[]).map(d=>`
            <label class="card" style="padding:10px 14px;display:flex;align-items:flex-start;gap:10px;cursor:pointer;background:var(--bg-elevated);border:1px solid var(--border-sm);margin:0;">
              <input type="checkbox" data-term-id="${o(d.id)}" ${d.on?"checked":""} style="margin-top:4px;">
              <div>
                <strong style="font-size:13.5px;color:var(--text-1);">${o(d.title)}</strong>
                <p class="muted small" style="margin:2px 0 0 0;">${o(d.text)}</p>
              </div>
            </label>
          `).join("")}
        </div>
      </div>
    `;const a=t.querySelector("#ps-f-retainerPay");a&&(a.onchange=()=>{e.retainerPay=a.value,this.scheduleAutoSave(),this.refreshLivePaper()});const r=t.querySelector("#ps-f-projectPay");r&&(r.onchange=()=>{e.projectPay=r.value,this.scheduleAutoSave(),this.refreshLivePaper()});const i=t.querySelector("#ps-f-clientNeeds");i&&(i.oninput=()=>{e.clientNeeds=i.value.split(`
`).map(d=>d.trim()).filter(Boolean),this.scheduleAutoSave(),this.refreshLivePaper()}),t.querySelectorAll("input[data-term-id]").forEach(d=>{d.onchange=()=>{const l=e.terms.find(c=>c.id===d.dataset.termId);l&&(l.on=d.checked,this.scheduleAutoSave(),this.refreshLivePaper())}})}renderStepApprove(t){const e=this.activeProposal,a=e.approval&&e.approval.decision==="approved"&&e.approval.pinVerified,r=e.status==="pending",i=e.shareId?`${window.location.origin}/proposal?p=${e.shareId}`:"";t.innerHTML=`
      <!-- Admin PIN Status Card -->
      <div class="card" style="margin-bottom:16px;border-left:4px solid ${a?"var(--green-500)":r?"var(--amber-500)":"var(--border-md)"}">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="display:flex;align-items:center;gap:8px;">
              <h3 style="font-size:18px;font-weight:800;color:var(--text-1);margin:0;">
                Internal Admin Approval & Sign-off
              </h3>
              ${a?'<span class="badge green">🔐 VERIFIED WITH ADMIN PIN</span>':r?'<span class="badge amber">⏳ AWAITING ADMIN PIN</span>':'<span class="badge gray">DRAFT (UNAPPROVED)</span>'}
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
              ${a?`
                <button class="btn" id="ps-btn-reauthorize-pin">
                  🔄 Re-authorize / Sign Again
                </button>
              `:`
                <button class="btn gold" id="ps-btn-approve-pin" style="font-weight:700;">
                  🔐 Authorize & Approve with Admin PIN
                </button>
              `}
            `:`
              ${a?`
                <span class="badge green" style="font-size:13px;padding:7px 14px;font-weight:700;">🔐 Admin Approved</span>
              `:`
                ${r?`
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

        ${a?`
          <div style="margin-top:14px;padding:12px 16px;background:var(--green-50, rgba(16,185,129,0.08));border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-md);">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:20px;">🛡️</span>
              <div>
                <strong style="color:var(--green-600);font-size:14px;">Officially Approved by Admin</strong>
                <div class="small" style="color:var(--text-2);">
                  Sign-off by <strong>${o(e.approval.approverName||"Admin")}</strong>
                  (${o(e.approval.approverEmail||"admin")}) on <strong>${U(e.approval.at)}</strong>
                </div>
                ${e.approval.note?`<div class="small muted" style="margin-top:4px;">“${o(e.approval.note)}”</div>`:""}
              </div>
            </div>
          </div>
        `:r?`
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
              <input type="text" class="input" id="ps-share-link-input" readonly value="${o(i)}" style="flex:1;min-width:240px;">
              <button class="btn" id="ps-copy-link-btn">📋 Copy Link</button>
              <a href="/proposal?p=${o(e.shareId)}" target="_blank" class="btn">👁️ Open View</a>
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
          ${a?`
            <button class="btn primary" id="ps-step6-send-client-btn" style="font-weight:700;">
              📤 ${e.shareId?"Re-send / Copy Client Review Link":"Send to Client"}
            </button>
            ${this.isAdmin?`
              <button class="btn" id="ps-btn-release-pin" title="Record updated release version with Admin PIN">
                🚀 Update Version with Admin PIN
              </button>
            `:""}
            <span class="muted small" style="color:var(--green-600);font-weight:600;">
              ✓ Proposal authorized by Admin. Ready for client delivery.
            </span>
          `:`
            <button class="btn" disabled style="opacity:0.6;cursor:not-allowed;">
              🔒 Send to Client (Requires Admin PIN Approval First)
            </button>
            <span class="muted small">
              ${r?"⏳ Awaiting Admin review and PIN sign-off.":"Draft must be submitted and approved by Admin."}
            </span>
          `}
        </div>

        ${e.clientResponse&&e.clientResponse.decision?`
          <div style="margin-top:16px;padding:14px;border-radius:var(--r-md);background:${e.clientResponse.decision==="approved"?"var(--green-50, rgba(16,185,129,0.1))":"var(--amber-50, rgba(245,158,11,0.1))"};border:1px solid ${e.clientResponse.decision==="approved"?"rgba(16,185,129,0.3)":"rgba(245,158,11,0.3)"}">
            <strong style="color:${e.clientResponse.decision==="approved"?"var(--green-600)":"var(--amber-600)"}">
              ${e.clientResponse.decision==="approved"?"🎉 Client Approved Online":"⚠️ Client Requested Changes"}
            </strong>
            <div class="small muted" style="margin-top:2px;">
              Responded by ${o(e.clientResponse.name)} (${o(e.clientResponse.role||"Client")}) on ${U(e.clientResponse.at)}
            </div>
            ${e.clientResponse.comment?`<p style="margin:8px 0 0 0;font-size:13.5px;">“${o(e.clientResponse.comment)}”</p>`:""}
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
              ${e.approvalHistory&&e.approvalHistory.length?e.approvalHistory.slice().reverse().map(h=>`
                <tr>
                  <td><strong style="color:var(--text-1);">${o(h.action)}</strong></td>
                  <td>${o(h.adminName)} <span class="muted small">(${o(h.adminEmail||"admin")})</span></td>
                  <td><span class="badge gray">${o(h.adminRole||"admin")}</span></td>
                  <td style="white-space:nowrap;">${U(h.timestamp)}</td>
                  <td>${h.pinVerified?'<span class="badge green">🔐 Verified</span>':'<span class="badge gray">—</span>'}</td>
                  <td><code style="font-size:11px;background:var(--bg-elevated);padding:2px 4px;border-radius:4px;">${o((h.hash||"").slice(0,8))}</code></td>
                  <td class="muted small">${o(h.note||"—")}</td>
                </tr>
              `).join(""):`
                <tr><td colspan="7" class="muted" style="text-align:center;padding:18px;">No audit events recorded yet.</td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;const d=t.querySelector("#ps-step6-preview-btn");d&&(d.onclick=()=>this.showPreviewModal());const l=t.querySelector("#ps-btn-emp-submit");l&&(l.onclick=async()=>{try{l.disabled=!0,l.textContent="Submitting…",await M(`/proposals/${e._id}/request-approval`,{note:`Submitted by ${this.currentUser.name||"team member"}`}),_("Submitted to Admin for review & PIN sign-off! ⏳");const h=await j(`/proposals/${e._id}`);this.activeProposal=h,this.renderProposalEditor(this.container.querySelector("#ps-view-content"))}catch(h){alert(h.message),l.disabled=!1,l.textContent="📤 Submit for Admin Approval"}});const c=t.querySelector("#ps-btn-approve-pin")||t.querySelector("#ps-btn-reauthorize-pin");c&&(c.onclick=async()=>{(!e._id||e._id==="undefined")&&await this.saveActiveProposal(!0),this.showAdminPinModal(this.activeProposal||e,"Approved with Admin PIN",()=>{this.renderProposalEditor(this.container.querySelector("#ps-view-content"))})});const p=t.querySelector("#ps-btn-release-pin");p&&(p.onclick=async()=>{(!e._id||e._id==="undefined")&&await this.saveActiveProposal(!0),this.showAdminPinModal(this.activeProposal||e,"Released to Client with Admin PIN",()=>{this.renderProposalEditor(this.container.querySelector("#ps-view-content"))},!0)});const v=t.querySelector("#ps-step6-send-client-btn");v&&(v.onclick=async()=>{var h;try{v.disabled=!0,v.textContent="Sending…";const S=await M(`/proposals/${e._id}/send-to-client`);_("Proposal sent to client! 📤");const F=`${window.location.origin}/proposal?p=${S.shareId||((h=S.proposal)==null?void 0:h.shareId)}`;navigator.clipboard.writeText(F).catch(()=>{}),alert(`Proposal successfully sent to client!

Direct review link:
${F}

(Link copied to clipboard)`);const C=await j(`/proposals/${e._id}`);this.activeProposal=C,this.renderProposalEditor(this.container.querySelector("#ps-view-content"))}catch(S){alert("Failed to send to client: "+S.message),v.disabled=!1,v.textContent="📤 Send to Client"}});const g=t.querySelector("#ps-copy-link-btn");g&&(g.onclick=async()=>{const h=t.querySelector("#ps-share-link-input");if(h){h.select();try{await navigator.clipboard.writeText(h.value),g.textContent="Copied ✓",setTimeout(()=>g.textContent="📋 Copy Link",2e3)}catch{alert("Press Ctrl+C to copy: "+h.value)}}});const f=t.querySelector("#ps-step6-dl-pdf");f&&(f.onclick=async()=>{var h;await Y(e,(h=this.rateDoc)==null?void 0:h.settings,f)});const s=t.querySelector("#ps-step6-dl-word");s&&(s.onclick=async()=>{var h;await X(e,(h=this.rateDoc)==null?void 0:h.settings,s)});const m=t.querySelector("#ps-step6-copy-pdf-link");m&&(m.onclick=async()=>{const h=`${window.location.origin}/proposal?p=${e.shareId}&dl=pdf`;try{await navigator.clipboard.writeText(h),m.textContent="Copied ✓",setTimeout(()=>m.textContent="🔗 Copy Direct PDF Link",2e3)}catch{prompt("Direct PDF Download Link:",h)}})}showAdminPinModal(t,e="Approved with Admin PIN",a,r=!1){const i=ne()||{name:"Admin",email:"admin@ci360.local"},d=document.createElement("div");d.className="modal-backdrop",d.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,0.65);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:99999;padding:16px;",d.innerHTML=`
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
            <strong>${o(t.ref)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span class="muted">Client:</span>
            <strong>${o(t.client||"Client")}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span class="muted">Approving Admin:</span>
            <span><strong>${o(i.name)}</strong> (${o(i.email||"admin")})</span>
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
    `,document.body.append(d);const l=d.querySelector("#ps-modal-pin-input"),c=d.querySelector("#ps-modal-note-input"),p=d.querySelector("#ps-modal-error"),v=d.querySelector("#ps-toggle-pin-visibility"),g=d.querySelector("#ps-modal-cancel-btn"),f=d.querySelector("#ps-pin-form");l.focus(),v.onclick=()=>{l.type=l.type==="password"?"text":"password"},g.onclick=()=>d.remove(),f.onsubmit=async s=>{var F,C;s.preventDefault();const m=l.value.trim(),h=c.value.trim();if(!m){p.textContent="Please enter your Admin PIN",p.style.display="block";return}const S=d.querySelector("#ps-modal-submit-btn");S.disabled=!0,S.textContent="Verifying PIN…",p.style.display="none";try{let u=t._id||((F=this.activeProposal)==null?void 0:F._id);if((!u||u==="undefined")&&(S.textContent="Saving proposal…",this.activeProposal&&(!this.activeProposal.client||!this.activeProposal.client.trim())&&(this.activeProposal.client="Client"),await this.saveActiveProposal(!0),u=(C=this.activeProposal)==null?void 0:C._id,u&&(t._id=u,Object.assign(t,this.activeProposal))),!u||u==="undefined")throw new Error("Please ensure proposal is saved before authorizing.");S.textContent="Verifying PIN…";const b=r?`/proposals/${u}/release`:`/proposals/${u}/approve`,L=await M(b,{pin:m,note:h,action:e});if(L.proposal){Object.assign(t,L.proposal),this.activeProposal&&Object.assign(this.activeProposal,L.proposal);const E=this.proposals.findIndex(P=>P._id===L.proposal._id);E>=0?this.proposals[E]=L.proposal:this.proposals.unshift(L.proposal)}d.remove(),alert(`✅ Action Authorized!
Proposal ${t.ref} has been officially recorded and approved with Admin PIN.`),typeof a=="function"&&a()}catch(u){p.textContent=u.message||"Incorrect Admin PIN / Passcode",p.style.display="block",l.select(),S.disabled=!1,S.textContent="Authorize & Sign"}}}renderRateCardView(t){if(!this.rateDoc)return;const e=this.rateDoc.items||[],a=this.rateDoc.packages||[];t.innerHTML=`
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
        <h3 style="font-size:16px;font-weight:700;margin:0 0 12px 0;">Standard Service Packages (${a.length})</h3>
        <div class="grid grid-2">
          ${a.map(d=>`
            <div class="card" style="background:var(--bg-elevated);border:1px solid var(--border-sm);padding:14px;margin:0;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
                <strong style="font-size:15px;color:var(--text-1);">${o(d.service)}</strong>
                <span class="badge ${d.billing==="monthly"?"blue":"green"}">${o(d.billing)}</span>
              </div>
              <p class="small muted" style="margin:0 0 8px 0;">${o(d.desc)}</p>
              <div style="font-size:12.5px;color:var(--text-2);">
                <span>Discount: <strong>${d.packDisc}%</strong></span> •
                <span>Components: <strong>${d.components.length} items</strong></span>
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
              ${e.map(d=>`
                <tr data-rate-row="${o((d.service+" "+d.category).toLowerCase())}">
                  <td><span class="badge gray">${o(d.category)}</span></td>
                  <td><strong>${o(d.service)}</strong></td>
                  <td class="muted">${o(d.unit)}</td>
                  <td style="text-align:right;font-weight:700;font-variant-numeric:tabular-nums;">${se(d.inr)}</td>
                  <td style="text-align:right;font-variant-numeric:tabular-nums;">$${d.usd||0}</td>
                  <td class="muted small" style="max-width:320px;">${o(d.inc)}</td>
                  <td>${d.tag?`<span class="badge blue">${o(d.tag)}</span>`:"—"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;const r=t.querySelector("#ps-rate-filter");r&&(r.oninput=()=>{const d=r.value.toLowerCase().trim();t.querySelectorAll("tr[data-rate-row]").forEach(l=>{l.style.display=!d||l.dataset.rateRow.includes(d)?"":"none"})});const i=t.querySelector("#ps-save-ratecard-btn");i&&(i.onclick=async()=>{i.disabled=!0,i.textContent="Saving…";try{await ie("/proposals/ratecard",this.rateDoc),alert("Rate card updated successfully!")}catch(d){alert("Error: "+d.message)}finally{i.disabled=!1,i.textContent="Save Rate Card Changes"}})}renderAuditTrailView(t){const e=[];this.proposals.forEach(a=>{(a.approvalHistory||[]).forEach(r=>{e.push({...r,proposalRef:a.ref,proposalClient:a.client,proposalId:a._id})})}),e.sort((a,r)=>new Date(r.timestamp)-new Date(a.timestamp)),t.innerHTML=`
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
              `:e.map(a=>`
                <tr>
                  <td style="white-space:nowrap;font-weight:600;">${U(a.timestamp)}</td>
                  <td>
                    <strong>${o(a.adminName)}</strong>
                    <div class="muted small">${o(a.adminEmail||"admin")}</div>
                  </td>
                  <td><span class="badge gray">${o(a.adminRole||"superadmin")}</span></td>
                  <td>
                    <strong>${o(a.proposalClient)}</strong>
                    <div class="muted small">${o(a.proposalRef)}</div>
                  </td>
                  <td><span class="badge blue">${o(a.action)}</span></td>
                  <td>
                    ${a.pinVerified?'<span class="badge green">🔐 PIN Verified</span>':'<span class="badge gray">Standard</span>'}
                  </td>
                  <td>
                    <code style="font-size:11px;background:var(--bg-elevated);padding:2px 5px;border-radius:4px;">${o((a.hash||"").slice(0,8))}</code>
                  </td>
                  <td class="muted small">${o(a.note||"—")}</td>
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
                ${this.pinStatus.lastUpdated?`Last updated: ${U(this.pinStatus.lastUpdated)} by ${o(this.pinStatus.updatedBy||"Admin")}`:"Using default startup PIN: 3600"}
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
            <input type="text" class="input" id="ps-set-name" value="${o(e.name)}">
          </div>
          <div>
            <label class="label">Legal Entity Name</label>
            <input type="text" class="input" id="ps-set-legal" value="${o(e.legal)}">
          </div>
          <div>
            <label class="label">Signatory Name</label>
            <input type="text" class="input" id="ps-set-signatory" value="${o(e.signatory)}">
          </div>
          <div>
            <label class="label">Signatory Designation</label>
            <input type="text" class="input" id="ps-set-signRole" value="${o(e.signRole)}">
          </div>
          <div>
            <label class="label">Official Email</label>
            <input type="email" class="input" id="ps-set-email" value="${o(e.email)}">
          </div>
          <div>
            <label class="label">GSTIN</label>
            <input type="text" class="input" id="ps-set-gstin" value="${o(e.gstin)}">
          </div>
          <div class="span2">
            <label class="label">Registered Address</label>
            <input type="text" class="input" id="ps-set-address" value="${o(e.address)}">
          </div>
        </div>
        <div style="margin-top:16px;text-align:right;">
          <button class="btn primary" id="ps-save-settings-btn">Save Company Profile</button>
        </div>
      </div>
    `;const a=t.querySelector("#ps-change-pin-toggle-btn"),r=t.querySelector("#ps-change-pin-panel"),i=t.querySelector("#ps-cancel-pin-btn");a&&(a.onclick=()=>{r.style.display=r.style.display==="none"?"block":"none"}),i&&(i.onclick=()=>{r.style.display="none"});const d=t.querySelector("#ps-update-pin-form");d&&(d.onsubmit=async c=>{c.preventDefault();const p=t.querySelector("#ps-cur-pin").value.trim(),v=t.querySelector("#ps-new-pin").value.trim(),g=t.querySelector("#ps-confirm-pin").value.trim(),f=t.querySelector("#ps-pin-update-err");if(v!==g){f.textContent="New PIN and Confirmation PIN do not match",f.style.display="block";return}try{await M("/proposals/pin/update",{currentPin:p,newPin:v}),alert("Admin PIN updated successfully!"),this.init()}catch(s){f.textContent=s.message||"Failed to update PIN",f.style.display="block"}});const l=t.querySelector("#ps-save-settings-btn");l&&(l.onclick=async()=>{e.name=t.querySelector("#ps-set-name").value,e.legal=t.querySelector("#ps-set-legal").value,e.signatory=t.querySelector("#ps-set-signatory").value,e.signRole=t.querySelector("#ps-set-signRole").value,e.email=t.querySelector("#ps-set-email").value,e.gstin=t.querySelector("#ps-set-gstin").value,e.address=t.querySelector("#ps-set-address").value,l.disabled=!0,l.textContent="Saving…";try{await ie("/proposals/ratecard",{settings:e}),alert("Company profile saved successfully!")}catch(c){alert("Error: "+c.message)}finally{l.disabled=!1,l.textContent="Save Company Profile"}})}}function Ce(n,t={}){const e=new ke(n,t);return e.init(),e}export{ke as ProposalStudioController,W as docModel,Y as exportPdfDoc,X as exportWordDocx,Ce as initProposalStudio,Z as paperHTML,Ae as printProposalDocument};
