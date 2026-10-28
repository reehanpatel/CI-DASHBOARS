import{c as O,e as r,f as te,k as J,g as K,l as ye}from"./api-sGh9QbEi.js";const le={docx:"https://cdn.jsdelivr.net/npm/docx@9.0.2/build/index.umd.js",pdf:"https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",mammoth:"https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",pdfjs:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",pdfworker:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"};function f(l){const t=Number(l);return isFinite(t)?t:0}function A(l,t="INR"){return l=f(l),t==="USD"?"$"+Math.round(l).toLocaleString("en-US"):"₹"+Math.round(l).toLocaleString("en-IN")}function G(l){if(!l)return"—";const t=new Date(l+(String(l).length===10?"T00:00:00":""));return isNaN(t)?String(l):t.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}function H(l){if(!l)return"—";const t=new Date(l);return isNaN(t)?String(l):t.toLocaleString("en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}function be(l){const t=new Date((l.date||new Date().toISOString().slice(0,10))+"T00:00:00");return t.setDate(t.getDate()+f(l.validity||30)),t.toISOString().slice(0,10)}function T(l=8){const t="abcdefghijkmnpqrstuvwxyz23456789";return[...crypto.getRandomValues(new Uint8Array(l))].map(e=>t[e%t.length]).join("")}function ie(l){return JSON.parse(JSON.stringify(l??null))}function re(l,t){return window[t]?Promise.resolve(window[t]):new Promise((e,s)=>{const a=document.createElement("script");a.src=l,a.onload=()=>window[t]?e(window[t]):s(new Error("Failed to load "+t)),a.onerror=()=>s(new Error("Failed to load "+t)),document.head.append(a)})}function oe(l,t){let e=0;return(l||[]).forEach(s=>{t>=f(s[0])&&f(s[1])>e&&(e=f(s[1]))}),e}function de(l){const t=Math.max(1,f(l.mult)||1);let e=0,s=0;const a=(l.lines||[]).map(o=>{const m=f(o.qty)*f(o.rate),u=oe(o.slabs,f(o.qty)*t),v=m*(1-u/100);return e+=m,s+=m-v,{...o,gross:m,slabPct:u,net:v}}),i=e-s,n=i*f(l.packDisc)/100,c=f(l.fixed)>0,d=c?f(l.fixed):(i-n)*t;return{lines:a,m:t,gross:e*t,slab:s*t,pack:c?0:n*t,net:d,fixed:c,alacarte:e*t}}const ae={"q-adv":3,"term-adv":5,100:3};function U(l){const t=(l.heads||[]).map(q=>({...q,c:de(q)})),e=t.filter(q=>q.billing==="monthly"),s=t.filter(q=>q.billing!=="monthly"),a=q=>q.reduce((p,y)=>p+y.c.net,0),i=f(l.gst),n=f(l.discount),c=f(l.termDisc),d=a(e),o=d*c/100,m=(d-o)*n/100,u=d-o-m,v=a(s),I=v*n/100,k=v-I,E=Math.max(1,f(l.term)||1),L=e.length?f(ae[l.retainerPay]):0,z=s.length?f(ae[l.projectPay]):0;return{heads:t,term:E,mon:{has:e.length>0,sub:d,term:o,disc:m,net:u,tax:u*i/100,total:u*(1+i/100),pre:L},one:{has:s.length>0,sub:v,disc:I,net:k,tax:k*i/100,total:k*(1+i/100),pre:z},contract:u*E+k}}const se={"m-adv":"Monthly fee invoiced in advance on the 1st of each month, payable within 7 days.","m-arr":"Monthly fee invoiced at the end of each month, payable within 15 days.","q-adv":"Invoiced quarterly in advance, payable within 7 days. A 3% prepayment discount applies to each quarterly invoice.","term-adv":"The full term is invoiced in advance on signing, with a 5% prepayment discount."},ne={100:{label:"100% advance (3% discount)",ms:[[100,"On signing"]]},5050:{label:"50% advance, 50% on delivery",ms:[[50,"Advance on signing"],[50,"On final delivery"]]},403030:{label:"40 / 30 / 30 milestones",ms:[[40,"Advance on signing"],[30,"On approval of concept / shoot completion"],[30,"On final delivery"]]},304030:{label:"30 / 40 / 30 milestones",ms:[[30,"Advance on signing"],[40,"Mid-project milestone"],[30,"On final delivery"]]},custom:{label:"Custom milestones",ms:null}};function ce(l){const t=[];let e=[],s=null,a=null;const i=()=>{e.length&&(t.push({t:"p",text:e.join(" ")}),e=[])},n=()=>{s&&(t.push({t:"ul",items:s}),s=null),a&&(t.push({t:"ol",items:a}),a=null)};return String(l||"").replace(/\r/g,"").split(`
`).forEach(c=>{const d=c.trim();if(!d){i(),n();return}let o;if(o=d.match(/^[-*\u2022]\s+(.*)$/)){i(),a&&n(),(s=s||[]).push(o[1]);return}if(o=d.match(/^\d+[.)]\s+(.*)$/)){i(),s&&n(),(a=a||[]).push(o[1]);return}if(o=d.match(/^#{1,4}\s+(.*)$/)){i(),n(),t.push({t:"h",text:o[1]});return}n(),e.push(d)}),i(),n(),t}function pe(l){return String(l).split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(t=>t.startsWith("**")&&t.endsWith("**")?{bold:!0,text:t.slice(2,-2)}:{bold:!1,text:t})}function xe(l,t){const e=l.billing==="monthly"?" a month":"",s=(l.lines||[]).filter(i=>f(i.qty)>0).map(i=>`- ${f(i.qty)} × ${i.service}${e}${i.desc?": "+i.desc:""}`),a=[];return l.desc&&a.push(l.desc),f(l.mult)>1&&a.push(`For each of ${f(l.mult)} ${l.multLabel||"brands"}:`),s.length&&a.push(s.join(`
`)),l.exc&&a.push("**Not included:** "+l.exc),a.join(`

`)}function Y(l,t,e={}){const s=l.currency||"INR",a=U(l),i=[];let n=0;const c=p=>i.push({t:"h",n:++n,text:p}),d=s==="INR"?"GST":"Tax",o=[l.contact,l.contactRole].filter(Boolean).join(", "),m=[];a.mon.has&&m.push(["Term",`${a.term} month${a.term>1?"s":""} from the agreed start date.`]),a.mon.has&&m.push(["Monthly investment",`${A(a.mon.net,s)} per month, ${d} extra.${a.mon.term?` Includes a ${f(l.termDisc)}% commitment discount for the ${a.term}-month term.`:""}`]),a.one.has&&m.push([a.mon.has?"One-time investment":"Investment",`${A(a.one.net,s)}, ${d} extra.`]),a.mon.has&&a.one.has&&m.push(["Total contract value",`${A(a.contract,s)} over ${a.term} months, ${d} extra.`]),l.oneLine&&m.push(["In one line",l.oneLine]),m.length&&i.push({t:"kv",rows:m}),(l.sections||[]).forEach(p=>{(p.title||p.body)&&(c(p.title),i.push({t:"md",text:p.body}))});const u=a.heads;if(u.length){c("What is included"),i.push({t:"table",cols:[{h:"Area",w:26},{h:"What you get",w:74}],rows:u.map(y=>({cells:[{b:y.title,s:y.billing==="monthly"?"Monthly":"One-time"},{md:xe(y)}]}))});const p=u.filter(y=>y.billing==="monthly");if(p.length){const y={},j=[];p.forEach(x=>(x.lines||[]).forEach(C=>{const P=f(C.qty)*Math.max(1,f(x.mult)||1);if(!P)return;const $=C.service+"|"+(C.unit||"");y[$]||(y[$]={s:C.service,u:C.unit||"",q:0},j.push($)),y[$].q+=P})),i.push({t:"md",text:"**Monthly retainer: included every month**"}),i.push({t:"table",cols:[{h:"Deliverable",w:70},{h:"Per month",w:30,align:"r"}],rows:j.map((x,C)=>({style:C%2?"alt":"",cells:[y[x].s,`${y[x].q} ${y[x].u}`.trim()]}))});const D=(l.retainerIncl||[]).filter(Boolean);D.length&&i.push({t:"md",text:`**Also included in the retainer at no extra cost**
`+D.map(x=>"- "+x).join(`
`)})}}const v=(l.team||[]).filter(p=>p.name),I=(l.escalation||[]).filter(p=>p.name);if((v.length||l.cadence||I.length||l.clientTeam)&&(c("Team and governance"),v.length&&i.push({t:"table",cols:[{h:"Role on this engagement",w:30},{h:"Name",w:24},{h:"Responsibility",w:46}],rows:v.map((p,y)=>({style:y%2?"alt":"",cells:[{b:p.role||""},p.name,p.resp||""]}))}),l.clientTeam&&i.push({t:"md",text:`**From ${l.clientShort||l.client||"the client"}:** ${l.clientTeam}`}),l.cadence&&i.push({t:"md",text:l.cadence}),I.length&&(i.push({t:"md",text:"**Escalation path**"}),i.push({t:"table",cols:[{h:"Level",w:10},{h:"Contact",w:36},{h:"Raise when",w:54}],rows:I.map((p,y)=>({style:y%2?"alt":"",cells:[String(y+1),{b:p.name,s:p.role||""},p.when||""]}))}))),u.length){c("Investment");const p=l.pricingView||"heads",y=(D,x,C)=>{const P=[],$=C?" per month":"";return(p!=="overall"||x.term||x.disc)&&P.push({style:"sum",cells:["Subtotal",A(x.sub,s)+$]}),x.term&&P.push({style:"sum",cells:[`Commitment discount (${f(l.termDisc)}%, ${a.term}-month term)`,"−"+A(x.term,s)]}),x.disc&&P.push({style:"sum",cells:[`Discount (${f(l.discount)}%)`,"−"+A(x.disc,s)]}),P.push({style:"sum",cells:[`${D} before ${d}`,A(x.net,s)+$]}),f(l.gst)&&P.push({style:"sum",cells:[`${d} (${f(l.gst)}%)`,A(x.tax,s)]}),P.push({style:"grand",cells:[`${D} including ${d}`,A(x.total,s)+$]}),P},j=D=>{const x=D?a.mon:a.one,C=u.filter($=>$.billing==="monthly"===D);if(!C.length)return;const P=D?"Monthly investment":a.mon.has?"One-time investment":"Investment";if(p==="overall")i.push({t:"table",cols:[{h:P,w:70},{h:"Amount",w:30,align:"r"}],rows:[{style:"hl",cells:[{b:`Everything in “What is included”${D?" billed monthly":""}: ${C.map($=>$.title).join(", ")}. ${d} extra.`},{b:A(x.net,s)+(D?" per month":"")}]},...x.term||x.disc?[{style:"sub",cells:[`Includes ${[x.term?`a ${f(l.termDisc)}% commitment discount`:"",x.disc?`a ${f(l.discount)}% discount`:""].filter(Boolean).join(" and ")}.`,""]}]:[]]});else if(p==="heads")i.push({t:"table",cols:[{h:P,w:70},{h:"Amount",w:30,align:"r"}],rows:[...C.map(($,S)=>({style:S%2?"alt":"",cells:[{b:$.title,s:f($.mult)>1?`${f($.mult)} ${$.multLabel||"brands"}`:""},A($.c.net,s)+(D?" per month":"")]})),...y(P,x,D)]});else{const $=[];C.forEach(S=>{$.push({style:"group",cells:[{b:S.title+(f(S.mult)>1?` (× ${f(S.mult)} ${S.multLabel||"brands"})`:"")},"","","",""]}),S.c.lines.forEach((R,X)=>$.push({style:X%2?"alt":"",cells:[{b:R.service,s:R.desc},String(f(R.qty)*S.c.m),R.unit||"",A(R.rate,s),A(R.net*S.c.m,s)+(R.slabPct?`
(${R.slabPct}% volume)`:"")]})),S.c.pack&&$.push({style:"sum",cells:["Package saving"+(f(S.packDisc)?` (${f(S.packDisc)}%)`:""),"","","","−"+A(S.c.pack,s)]}),S.c.fixed&&$.push({style:"sum",cells:["Package price","","","",A(S.c.net,s)]}),$.push({style:"sum",cells:[{b:S.title+" total"},"","","",{b:A(S.c.net,s)}]})}),y(P,x,D).forEach(S=>$.push({style:S.style,cells:[S.cells[0],"","","",S.cells[1]]})),i.push({t:"table",cols:[{h:P,w:44},{h:"Qty",w:9,align:"r"},{h:"Unit",w:13,align:"r"},{h:"Rate",w:15,align:"r"},{h:"Amount",w:19,align:"r"}],rows:$})}};j(!0),j(!1),a.mon.has&&a.one.has&&p!=="overall"&&i.push({t:"note",text:`Total contract value: ${A(a.contract,s)} (${a.term} months of retainer plus one-time work), ${d} extra.`})}const k=(l.onRequest||[]).filter(p=>p.item);if((k.length||l.exclusions)&&(c("Not included, available on request"),k.length&&i.push({t:"table",cols:[{h:"Item",w:30},{h:"How it works",w:45},{h:"Price",w:25,align:"r"}],rows:k.map((p,y)=>({style:y%2?"alt":"",cells:[{b:p.item},p.how||"",p.price||""]}))}),i.push({t:"note",text:"Add-ons start only with written go-ahead."+(l.exclusions?" Also outside this scope: "+l.exclusions:"")})),u.length){c("Payment terms");const p=[];if(a.mon.has&&(p.push("**Retainer.** "+(l.retainerPay==="custom"?l.retainerCustom||"":se[l.retainerPay]||se["m-adv"])),l.retainerPay==="q-adv"&&p.push(`Quarterly invoice: ${A(a.mon.net*3*.97,s)} plus ${d}.`),l.retainerPay==="term-adv"&&p.push(`Term invoice: ${A(a.mon.net*a.term*.95,s)} plus ${d}.`)),p.length&&i.push({t:"md",text:p.join(`

`)}),a.one.has){const j=((ne[l.projectPay]||ne[5050]).ms||(l.milestones||[]).map(x=>[f(x.pct),x.label])).filter(x=>x[0]),D=a.one.total*(1-a.one.pre/100);a.one.pre?i.push({t:"md",text:`**One-time work.** Paid 100% in advance with a ${a.one.pre}% prepayment discount.`}):i.push({t:"md",text:"**One-time work.** Invoiced against these milestones:"}),i.push({t:"table",cols:[{h:"Milestone",w:55},{h:"Share",w:15,align:"r"},{h:`Amount incl. ${d}`,w:30,align:"r"}],rows:j.map((x,C)=>({style:C%2?"alt":"",cells:[x[1],x[0]+"%",A(D*x[0]/100,s)]}))})}t.paymentNotes&&i.push({t:"md",text:t.paymentNotes})}const E=(l.terms||[]).filter(p=>p.on);E.length&&(c("Terms"),i.push({t:"md",text:E.map(p=>`- **${p.title}:** ${p.text}`).join(`
`)}));const L=(l.clientNeeds||[]).filter(Boolean);L.length&&(c(`What we need from ${l.clientShort||l.client||"you"} to start`),i.push({t:"md",text:L.map((p,y)=>`${y+1}. ${p}`).join(`
`)}));const z=(l.choices||[]).filter(p=>p.label);if(z.length&&(c("Choices to confirm on sign-off"),i.push({t:"choices",items:z.map(p=>({label:p.label,options:(p.options||[]).filter(Boolean),answer:e.answers?e.answers[p.id]:""}))})),c("Sign-off"),l.approval&&l.approval.decision==="approved"){const p=`🔐 Internally Approved & Verified with Admin PIN by ${l.approval.approverName||"Admin"} on ${H(l.approval.at)}`;i.push({t:"stamp",text:p,type:"admin"})}e.approval&&e.approval.name&&i.push({t:"stamp",text:`Approved online by client ${e.approval.name}${e.approval.role?", "+e.approval.role:""} on ${G(e.approval.at)}`,type:"client"}),i.push({t:"sig",left:{who:"For "+(l.client||"the client"),name:"",role:""},right:{who:`For ${t.name}${t.legal?" ("+t.legal+")":""}`,name:t.signatory,role:t.signRole}});const q=[t.address,t.gstin&&"GSTIN "+t.gstin,t.email,t.phone,t.website].filter(Boolean).join(" • ");return{cover:{brand:t.name||"CI360 Degrees",title:l.title||"Proposal",subtitle:l.subtitle,kicker:l.kicker||"Proposal for sign-off",meta:[["Prepared for",[l.client,o].filter(Boolean).join(`
`)],["Reference",l.ref],["Date",G(l.date)],["Valid until",G(be(l))]]},blocks:i,foot:q,title:l.title||"Proposal",ref:l.ref,brand:t.name||"CI360 Degrees"}}function W(l){return pe(l).map(t=>t.bold?`<strong>${r(t.text)}</strong>`:r(t.text)).join("")}function ue(l){return ce(l).map(t=>t.t==="p"?`<p>${W(t.text)}</p>`:t.t==="h"?`<h3>${W(t.text)}</h3>`:`<${t.t}>${t.items.map(e=>`<li>${W(e)}</li>`).join("")}</${t.t}>`).join("")}function _(l){return l&&typeof l=="object"&&"md"in l?ue(l.md):l&&typeof l=="object"?`<strong>${W(l.b||"")}</strong>${l.s?`<div class="desc">${r(l.s)}</div>`:""}`:String(l??"").split(`
`).map((t,e)=>e?`<div class="desc">${r(t)}</div>`:r(t)).join("")}function Z(l,t=!1){const e=l.cover,s=l.blocks.map(a=>{if(a.t==="h")return`<h2><span class="n">${a.n}.</span>${r(a.text)}</h2>`;if(a.t==="md")return ue(a.text);if(a.t==="note")return`<p class="pnote">${r(a.text)}</p>`;if(a.t==="stamp")return`<div class="approved-stamp ${a.type==="admin"?"admin-stamp":""}">${r(a.text)}</div>`;if(a.t==="kv")return`<table class="kv"><tbody>${a.rows.map(([i,n])=>`<tr><th>${r(i)}</th><td>${_(n)}</td></tr>`).join("")}</tbody></table>`;if(a.t==="table"){const i=a.cols.length;return`<table class="pt"><thead><tr>${a.cols.map(n=>`<th class="${n.align==="r"?"r":""}" style="width:${n.w}%">${r(n.h)}</th>`).join("")}</tr></thead><tbody>${a.rows.map(n=>["sum","grand","sub","group"].includes(n.style)?`<tr class="${n.style}"><td colspan="${i-1}" class="${n.style==="group"||n.style==="sub"?"":"r"}">${_(n.cells[0])}</td><td class="r">${_(n.cells[n.cells.length-1])}</td></tr>`:`<tr class="${n.style||""}">${n.cells.map((c,d)=>`<td class="${a.cols[d].align==="r"?"r":""}">${_(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`}return a.t==="choices"?`<div class="choices">${a.items.map(i=>`<p><strong>${r(i.label)}:</strong> ${i.options.length?i.options.map(n=>`<span class="box">${i.answer===n?"☑":"☐"} ${r(n)}</span>`).join(" "):`<span class="blank">${i.answer?r(i.answer):""}</span>`}</p>`).join("")}</div>`:a.t==="sig"?`<div class="sig">${[a.left,a.right].map(i=>`<div><div class="who">${r(i.who)}</div>${[["Name",i.name],["Designation",i.role],["Signature",""],["Date",""]].map(([n,c])=>`<div class="ln"><span>${n}:</span> ${r(c||"")}</div>`).join("")}</div>`).join("")}</div>${l.foot?`<div class="foot">${r(l.foot)}</div>`:""}`:""}).join("");return`<article class="paper${t?" print":""}">
    <section class="cover">
      <div class="cv-brand">${r(e.brand)}</div>
      <div class="cv-kicker">${r(e.kicker)}</div>
      <h1>${r(e.title)}</h1>
      <p class="cv-sub">${r(e.subtitle||"")}</p>
      <div class="cv-rule"></div>
      <dl class="cv-meta">${e.meta.filter(a=>a[1]).map(([a,i])=>`<dt>${r(a)}</dt><dd>${r(i).replace(/\n/g,"<br>")}</dd>`).join("")}</dl>
    </section>
    <div class="pb"></div>
    <div class="body">${s}</div>
  </article>`}async function we(l,t,e,s={}){const a=e.textContent;e.disabled=!0,e.textContent="Generating Word (.docx)…";try{const i=await re(le.docx,"docx"),n=Y(l,t,s),c="0F2A4A",d="B8893A",o="1C2430",m="5A6577",u="D5DCE5",v="F1F4F8",I="EFE3CC",k=9026,E={style:i.BorderStyle.NONE,size:0,color:"FFFFFF"},L={top:E,bottom:E,left:E,right:E},z={style:i.BorderStyle.SINGLE,size:4,color:u},q={top:z,bottom:z,left:z,right:z},p=(g,h={})=>new i.TextRun({text:String(g??""),font:h.font||"Arial",size:h.size||20,bold:!!h.bold,italics:!!h.italics,color:h.color||o}),y=(g,h={})=>new i.Paragraph({children:g,alignment:h.align,keepNext:h.keepNext,numbering:h.numbering,border:h.border,heading:h.heading,spacing:{after:h.after??110,before:h.before??0,line:h.line??290,lineRule:"auto"}}),j=(g,h={})=>pe(g).map(w=>p(w.text,{...h,bold:w.bold||h.bold})),D={n:0},x=(g,h={})=>{const w=[];return ce(g).forEach(b=>{if(b.t==="p")w.push(y(j(b.text,h),{after:h.after??110}));else if(b.t==="h")w.push(y([p(b.text,{font:"Georgia",bold:!0,size:(h.size||20)+2,color:c})],{before:100,after:60,keepNext:!0}));else{const N=b.t==="ol"?"num"+Math.min(40,++D.n):"bul";b.items.forEach(F=>w.push(y(j(F,h),{numbering:{reference:N,level:0},after:50})))}}),w.length?w:[y([])]},C=(g,h={})=>{const w=h.size||18,b=h.color||o,N=h.align;if(g&&typeof g=="object"&&"md"in g)return x(g.md,{size:w,after:70});if(g&&typeof g=="object"){const F=[y(j(g.b||"",{bold:!0,size:w,color:b}),{after:g.s?30:0,align:N,line:260})];return g.s&&F.push(y([p(g.s,{size:w-2,color:h.sub||m})],{after:0,align:N,line:250})),F}return String(g??"").split(`
`).map((F,B)=>y([p(F,{size:B?w-2:w,color:B?h.sub||m:b,bold:h.bold})],{after:0,align:N,line:260}))},P=(g,h,w={})=>new i.TableCell({children:g,width:{size:h,type:i.WidthType.DXA},borders:w.borders||q,columnSpan:w.span,shading:w.fill?{type:i.ShadingType.CLEAR,color:"auto",fill:w.fill}:void 0,margins:{top:80,bottom:80,left:110,right:110},verticalAlign:w.v||i.VerticalAlign.TOP}),$=(g,h)=>y([p(g+".  ",{font:"Georgia",size:28,bold:!0,color:d}),p(h,{font:"Georgia",size:28,bold:!0,color:c})],{heading:i.HeadingLevel.HEADING_1,keepNext:!0,before:320,after:140,border:{bottom:{style:i.BorderStyle.SINGLE,size:8,color:d,space:5}}}),S=[],R=n.cover,X=R.meta.filter(g=>g[1]).map(([g,h])=>y([p(g+"   ",{color:"C9A35E",size:19}),...String(h).split(`
`).flatMap((w,b)=>b?[new i.TextRun({break:1,text:w,font:"Arial",size:21,color:"FFFFFF"})]:[p(w,{color:"FFFFFF",size:21})])],{after:70}));S.push(new i.Table({width:{size:k,type:i.WidthType.DXA},columnWidths:[k],rows:[new i.TableRow({height:{value:12800,rule:i.HeightRule.ATLEAST},children:[new i.TableCell({width:{size:k,type:i.WidthType.DXA},borders:L,shading:{type:i.ShadingType.CLEAR,color:"auto",fill:c},margins:{top:900,bottom:900,left:700,right:700},children:[y([p(R.brand,{font:"Georgia",size:24,bold:!0,color:"C9A35E"})],{after:2200}),y([p(R.kicker,{size:20,color:"AEBBCD"})],{after:120}),y([p(R.title,{font:"Georgia",size:56,bold:!0,color:"FFFFFF"})],{after:200,line:260}),y(R.subtitle?[p(R.subtitle,{font:"Georgia",size:26,italics:!0,color:"D9E1EC"})]:[],{after:1500}),new i.Paragraph({border:{top:{style:i.BorderStyle.SINGLE,size:12,color:d,space:12}},spacing:{after:160},children:[]}),...X]})]})]})),S.push(new i.Paragraph({children:[new i.PageBreak]})),n.blocks.forEach(g=>{if(g.t==="h")S.push($(g.n,g.text));else if(g.t==="md")S.push(...x(g.text));else if(g.t==="note")S.push(y([p(g.text,{italics:!0,size:18,color:m})],{before:80}));else if(g.t==="stamp")S.push(y([p(g.text,{bold:!0,size:19,color:g.type==="admin"?"0F2A4A":"2F6B45"})],{after:160}));else if(g.t==="kv"){const h=[2500,k-2500];S.push(new i.Table({width:{size:k,type:i.WidthType.DXA},columnWidths:h,rows:g.rows.map(([w,b],N)=>new i.TableRow({cantSplit:!0,children:[P(C({b:w},{size:19}),h[0],{fill:v}),P(C(b,{size:19}),h[1],{fill:N%2?v:void 0})]}))}))}else if(g.t==="table"){const h=g.cols.map(b=>Math.round(k*b.w/100));h[h.length-1]+=k-h.reduce((b,N)=>b+N,0);const w=[new i.TableRow({tableHeader:!0,children:g.cols.map((b,N)=>P(C(b.h,{size:17,color:"FFFFFF",bold:!0,align:b.align==="r"?i.AlignmentType.RIGHT:void 0}),h[N],{fill:c,v:i.VerticalAlign.CENTER}))})];g.rows.forEach(b=>{const N=b.style==="alt"?v:b.style==="grand"?c:b.style==="hl"?I:b.style==="group"?"E4E9F0":void 0,F=b.style==="grand"?"FFFFFF":o,B=b.style==="grand"?"D9E1EC":m;if(b.style==="sum"||b.style==="grand"||b.style==="sub"||b.style==="group"){const Q=b.cells[b.cells.length-1],V=h.slice(0,-1).reduce((ge,fe)=>ge+fe,0);w.push(new i.TableRow({cantSplit:!0,children:[P(C(b.cells[0],{size:b.style==="grand"?20:18,color:F,sub:B,bold:b.style==="grand",align:b.style==="group"||b.style==="sub"?void 0:i.AlignmentType.RIGHT}),V,{span:h.length-1,fill:N}),P(C(Q,{size:b.style==="grand"?20:18,color:F,sub:B,bold:b.style!=="sub",align:i.AlignmentType.RIGHT}),h[h.length-1],{fill:N})]}))}else w.push(new i.TableRow({cantSplit:!0,children:b.cells.map((Q,V)=>P(C(Q,{size:18,color:F,sub:B,align:g.cols[V].align==="r"?i.AlignmentType.RIGHT:void 0}),h[V],{fill:N}))}))}),S.push(new i.Table({width:{size:k,type:i.WidthType.DXA},columnWidths:h,rows:w})),S.push(y([],{after:60}))}else if(g.t==="choices")g.items.forEach(h=>{const w=h.answer,b=[p(h.label+":   ",{bold:!0})];h.options.length?h.options.forEach(N=>b.push(p((w===N?"☑ ":"☐ ")+N+"    "))):b.push(p(w||"______________________________")),S.push(y(b,{after:140}))});else if(g.t==="sig"){const h=k/2,w=b=>[y([p(b.who,{font:"Georgia",bold:!0,color:c,size:21})],{after:200}),...[["Name",b.name],["Designation",b.role],["Signature",""],["Date",""]].map(([N,F])=>y([p(N+":  ",{size:19,color:m}),p(F||"",{size:20})],{after:200,border:{bottom:{style:i.BorderStyle.SINGLE,size:4,color:u,space:2}}}))];S.push(new i.Table({width:{size:k,type:i.WidthType.DXA},columnWidths:[h,h],rows:[new i.TableRow({cantSplit:!0,children:[P(w(g.left),h,{borders:L}),P(w(g.right),h,{borders:L})]})]})),n.foot&&S.push(y([p(n.foot,{size:16,color:m})],{before:360}))}});const ee=[{reference:"bul",levels:[{level:0,format:i.LevelFormat.BULLET,text:"•",alignment:i.AlignmentType.LEFT,style:{paragraph:{indent:{left:480,hanging:280}},run:{color:d}}}]}];for(let g=1;g<=40;g++)ee.push({reference:"num"+g,levels:[{level:0,format:i.LevelFormat.DECIMAL,text:"%1.",alignment:i.AlignmentType.LEFT,style:{paragraph:{indent:{left:480,hanging:320}},run:{color:c,bold:!0}}}]});const me=new i.Document({creator:n.brand,title:n.title,styles:{default:{document:{run:{font:"Arial",size:20,color:o}}},paragraphStyles:[{id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:!0,run:{font:"Georgia",size:28,bold:!0,color:c},paragraph:{outlineLevel:0}}]},numbering:{config:ee},sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1300,bottom:1200,left:1440,right:1440}},titlePage:!0},headers:{first:new i.Header({children:[y([])]}),default:new i.Header({children:[y([p(n.brand,{font:"Georgia",size:16,bold:!0,color:d}),p("   "+n.title,{size:16,color:m})],{after:0})]})},footers:{first:new i.Footer({children:[y([])]}),default:new i.Footer({children:[new i.Paragraph({alignment:i.AlignmentType.RIGHT,children:[p((n.ref||"")+"   Page ",{size:15,color:m}),new i.TextRun({children:[i.PageNumber.CURRENT],size:15,color:m,font:"Arial"})]})]})},children:S}]}),he=await i.Packer.toBlob(me),ve=`${l.clientShort||l.client||"Client"} - ${l.title||"Proposal"}.docx`.replace(/[\\/:*?"<>|]+/g,"_"),M=document.createElement("a");M.href=URL.createObjectURL(he),M.download=ve,document.body.append(M),M.click(),setTimeout(()=>{URL.revokeObjectURL(M.href),M.remove()},600)}catch(i){alert("Word document export error: "+i.message)}finally{e.disabled=!1,e.textContent=a}}async function Se(l,t,e,s={}){const a=e.textContent;e.disabled=!0,e.textContent="Generating PDF…";try{const i=await re(le.pdf,"html2pdf"),n=Y(l,t,s),c=Z(n,!0),d={margin:[14,15,16,15],filename:`${l.clientShort||l.client||"Client"} - ${l.title||"Proposal"}.pdf`.replace(/[\\/:*?"<>|]+/g,"_"),image:{type:"jpeg",quality:.98},html2canvas:{scale:2,backgroundColor:"#ffffff",scrollX:0,scrollY:0,useCORS:!0},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"},pagebreak:{mode:["css","legacy"],avoid:["tr","h2","h3","li","p",".sig",".kv",".approved-stamp"]}};await i().set(d).from(c,"string").save()}catch(i){alert("PDF export error: "+i.message)}finally{e.disabled=!1,e.textContent=a}}class $e{constructor(t,e={}){this.container=t,this.options=e,this.proposals=[],this.rateDoc=null,this.pinStatus={isConfigured:!1,defaultPinHint:"3600"},this.currentView="list",this.activeStep="brief",this.activeProposal=null,this.searchTerm="",this.statusFilter="all",this.briefTab="paste",this.saving=!1,this.saveTimeout=null}async init(){this.container.innerHTML='<div class="card" style="padding:40px;text-align:center"><div class="loading">Loading Proposal Studio…</div></div>';try{const[t,e,s]=await Promise.all([O("/proposals"),O("/proposals/ratecard"),O("/proposals/pin/status")]);this.proposals=t||[],this.rateDoc=e,this.pinStatus=s||{isConfigured:!1,defaultPinHint:"3600"},this.render()}catch(t){this.container.innerHTML=`
        <div class="empty">
          <h3>Failed to load Proposal Studio</h3>
          <p class="muted">${r(t.message)}</p>
          <button class="btn primary" id="retry-ps-btn">Retry</button>
        </div>`;const e=this.container.querySelector("#retry-ps-btn");e&&(e.onclick=()=>this.init())}}render(){this.container.innerHTML=`
      <div class="ps-wrapper">
        <!-- Top Sub-Navigation Header -->
        <div class="ps-header">
          <div class="ps-title-block">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2 style="margin:0;font-size:22px;font-weight:800;color:var(--text-1);">Proposal Studio</h2>
              <span class="ps-badge-gold">CI360 Studio</span>
              ${this.pinStatus.isConfigured?'<span class="badge green" title="Admin Approval PIN is secured and active">🔐 PIN Protected</span>':'<span class="badge amber" title="Default PIN active (3600). Change in PIN Settings">⚠️ Default PIN (3600)</span>'}
            </div>
            <p class="muted small" style="margin:4px 0 0;">Branded proposal generation, comprehensive rate card pricing, and secure Admin PIN authorization audit trail.</p>
          </div>

          <div class="ps-subnav">
            <button class="ps-nav-btn ${this.currentView==="list"?"active":""}" data-ps-view="list">📁 All Proposals (${this.proposals.length})</button>
            <button class="ps-nav-btn ${this.currentView==="ratecard"?"active":""}" data-ps-view="ratecard">🏷️ Rate Card & Packages</button>
            <button class="ps-nav-btn ${this.currentView==="audit"?"active":""}" data-ps-view="audit">🛡️ Admin PIN Audit Trail</button>
            <button class="ps-nav-btn ${this.currentView==="settings"?"active":""}" data-ps-view="settings">⚙️ Settings & PIN</button>
            <button class="btn gold" id="ps-btn-new-proposal">✨ New Proposal</button>
          </div>
        </div>

        <!-- Main View Area -->
        <div id="ps-view-content" class="ps-content-body"></div>
      </div>
    `,this.container.querySelectorAll("[data-ps-view]").forEach(s=>{s.onclick=()=>{this.currentView=s.dataset.psView,this.render()}});const t=this.container.querySelector("#ps-btn-new-proposal");t&&(t.onclick=()=>this.createNewProposal());const e=this.container.querySelector("#ps-view-content");this.currentView==="list"?this.renderProposalList(e):this.currentView==="editor"?this.renderProposalEditor(e):this.currentView==="ratecard"?this.renderRateCardView(e):this.currentView==="audit"?this.renderAuditTrailView(e):this.currentView==="settings"&&this.renderSettingsView(e)}renderProposalList(t){let e=[...this.proposals];if(this.statusFilter!=="all"&&(e=e.filter(o=>o.status===this.statusFilter)),this.searchTerm.trim()){const o=this.searchTerm.trim().toLowerCase();e=e.filter(m=>(m.client||"").toLowerCase().includes(o)||(m.title||"").toLowerCase().includes(o)||(m.ref||"").toLowerCase().includes(o))}const s=this.proposals.filter(o=>o.status==="pending").length,a=this.proposals.filter(o=>o.status==="approved"||o.status==="with_client"||o.status==="won").length,i=this.proposals.reduce((o,m)=>o+U(m).contract,0);t.innerHTML=`
      <!-- Stats Overview Banner -->
      <div class="grid grid-4" style="margin-bottom:20px;">
        <div class="card kpi">
          <div class="label">Total Proposals</div>
          <div class="value">${this.proposals.length}</div>
          <div class="sub">Active scope documents</div>
        </div>
        <div class="card kpi">
          <div class="label">Awaiting Admin PIN</div>
          <div class="value" style="color:${s>0?"var(--amber-500)":"var(--text-1)"}">${s}</div>
          <div class="sub">Needs internal authorization</div>
        </div>
        <div class="card kpi">
          <div class="label">PIN Approved / Live</div>
          <div class="value" style="color:var(--green-500)">${a}</div>
          <div class="sub">Verified & signed off</div>
        </div>
        <div class="card kpi">
          <div class="label">Pipeline Value</div>
          <div class="value" style="color:var(--brand-600)">${te(i)}</div>
          <div class="sub">Aggregate contract volume</div>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;flex:1;max-width:440px;">
          <input type="text" class="input" id="ps-search" placeholder="Search by client, title or reference..." value="${r(this.searchTerm)}">
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
              `:e.map(o=>{const m=U(o),u=this.renderStatusBadge(o),v=o.approval&&o.approval.decision==="approved"&&o.approval.pinVerified;return`
                  <tr style="cursor:pointer;" class="ps-row-hover" data-open-proposal="${r(o._id)}">
                    <td style="padding:14px 16px;">
                      <div style="font-weight:700;color:var(--text-1);font-size:14.5px;">${r(o.title||"Untitled Proposal")}</div>
                      <div class="muted small" style="font-family:var(--font-mono);">${r(o.ref)}</div>
                    </td>
                    <td style="padding:14px 16px;">
                      <div style="font-weight:600;color:var(--text-1);">${r(o.client)}</div>
                      <div class="muted small">${r(o.contact?o.contact+(o.contactRole?` (${o.contactRole})`:""):"—")}</div>
                    </td>
                    <td style="padding:14px 16px;">
                      <div>${G(o.date)}</div>
                      <div class="muted small">${o.term?`${o.term} months retainer`:"One-time project"}</div>
                    </td>
                    <td style="padding:14px 16px;text-align:right;font-variant-numeric:tabular-nums;font-weight:700;color:var(--text-1);">
                      ${A(m.contract,o.currency)}
                      ${m.mon.has?`<div class="muted small" style="font-weight:400;">${A(m.mon.net,o.currency)}/mo</div>`:""}
                    </td>
                    <td style="padding:14px 16px;text-align:center;">
                      ${u}
                      ${v?'<div class="small" style="color:var(--green-600);font-size:11px;margin-top:2px;">🔐 PIN Verified</div>':""}
                    </td>
                    <td style="padding:14px 16px;text-align:right;" onclick="event.stopPropagation();">
                      <div style="display:inline-flex;gap:6px;">
                        <button class="btn small" data-edit-p="${r(o._id)}" title="Edit proposal">✏️ Edit</button>
                        ${o.status==="pending"||!v?`
                          <button class="btn small gold" data-quick-pin="${r(o._id)}" title="Approve with Admin PIN">🔐 Approve</button>
                        `:""}
                      </div>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;const n=t.querySelector("#ps-search");n&&(n.oninput=o=>{this.searchTerm=o.target.value,this.renderProposalList(t)});const c=t.querySelector("#ps-status-filter");c&&(c.onchange=o=>{this.statusFilter=o.target.value,this.renderProposalList(t)});const d=t.querySelector("#ps-empty-new-btn");d&&(d.onclick=()=>this.createNewProposal()),t.querySelectorAll("[data-open-proposal]").forEach(o=>{o.onclick=()=>{const m=o.dataset.openProposal;this.openProposal(m)}}),t.querySelectorAll("[data-edit-p]").forEach(o=>{o.onclick=m=>{m.stopPropagation(),this.openProposal(o.dataset.editP)}}),t.querySelectorAll("[data-quick-pin]").forEach(o=>{o.onclick=m=>{m.stopPropagation();const u=this.proposals.find(v=>v._id===o.dataset.quickPin);u&&this.showAdminPinModal(u,"Approved with Admin PIN",()=>this.init())}})}renderStatusBadge(t){const e=t.status||"draft";return e==="approved"?'<span class="badge green">🔐 Approved Internally</span>':e==="pending"?'<span class="badge amber">⏳ Awaiting Approval</span>':e==="with_client"?'<span class="badge blue">📤 With Client</span>':e==="won"?'<span class="badge green" style="font-weight:700;">🎉 Client Approved</span>':e==="changes"?'<span class="badge red">⚠️ Changes Requested</span>':e==="returned"?'<span class="badge red">↩️ Returned</span>':'<span class="badge gray">Draft</span>'}createNewProposal(){const t=new Date,e=t.getFullYear(),s=Math.floor(100+Math.random()*900),a=this.rateDoc&&this.rateDoc.settings||{};this.activeProposal={ref:`CI360/PR/${e}/${s}`,title:"Digital Marketing & Content Strategy Proposal",subtitle:"Comprehensive Strategy, Creative Production & Growth Execution",kicker:"Proposal for sign-off",oneLine:"Integrated marketing, creative content production, and managed digital visibility.",client:"",clientShort:"",contact:"",contactRole:"",industry:"",location:"India",currency:"INR",date:t.toISOString().slice(0,10),validity:30,brief:"",briefForm:{},briefFiles:[],services:[],tone:"Confident and consultative",sections:[{id:T(),title:"1. Understanding of the Brief",body:"We understand that your primary growth focus is building consistent brand presence, driving quality lead engagement, and scaling commercial outreach across digital platforms with high-caliber creative execution."},{id:T(),title:"2. Strategic Approach",body:`- Insight First, Story Always: Every deliverable is anchored in data, competitive analysis, and audience intent.
- Integrated Workflow: Unified management across design, copywriting, video, SEO, and performance tracking.
- Clear Governance: Regular weekly status updates and comprehensive monthly review calls.`},{id:T(),title:"3. Onboarding & First 30 Days",body:`- Days 1–7: Handover, admin access setup, brand asset audit, and team introduction.
- Days 8–15: Finalization of content calendar, tone guidelines, and campaign messaging framework.
- Days 16–30: Full publishing cadence, live monitoring, and delivery of month-one performance report.`},{id:T(),title:"4. Why CI360 Degrees",body:"With over 25+ years of strategic leadership (founded in 2017) and 60+ global mandates, CI360 Degrees pairs senior-level marketing counsel with responsive, AI-enabled production agility."}],heads:[],onRequest:[{id:T(),item:"Video Shoot Day (Director + Crew)",how:"On-location production day with lighting and sound",price:"₹45,000 per day"},{id:T(),item:"Custom Corporate Website (12 pages)",how:"WordPress/Elementor responsive website with SEO setup",price:"₹1,00,000 one-time"}],exclusions:"Paid media ad spend, external celebrity talent fees, venue/travel expenses outside city, and government filing fees.",term:6,termDisc:5,discount:0,gst:18,pricingView:"heads",retainerPay:"m-adv",retainerCustom:"",projectPay:"5050",milestones:[{pct:50,label:"Advance on signing"},{pct:50,label:"On final delivery and launch"}],retainerIncl:["A dedicated account lead and named team","A monthly content calendar, shared for approval before the month begins","A monthly performance report by the 5th working day, with a review call","A quarterly strategy review and plan reset","Replies to comments and messages within 1 business day","Two revision rounds on every deliverable","Use of CI360’s design, scheduling and AI tool stack at no extra cost"],team:(a.team||[]).slice(0,4).map(n=>({id:T(),memberId:n.id,name:n.name,role:n.engRole||n.role,resp:n.resp||""})),clientTeam:"Point of Contact for Approvals: TBD on signing",cadence:`**How we work together**
- Weekly 30-minute status call with the client’s designated point of contact.
- Shared tracker for requests, deliverables, and revisions.
- Monthly performance report by the 5th working day followed by an executive review call.
- Quarterly strategy review to reset targets and priorities.`,escalation:[{name:"Mansi Bagdai",role:"Strategy & Growth Lead, Account Lead",when:"Day-to-day operational matters not resolved within 1 working day"},{name:"Urna Banerji",role:"COO",when:"Delivery, quality, or timeline concerns not resolved within 2 working days"},{name:"Pramit Ghosh",role:"Founder & CEO",when:"Commercial or strategic relationship matters, or anything unresolved at Level 2"}],terms:(a.termsLib||[]).map(n=>({...n,on:n.tag==="general"})),clientNeeds:["A signed copy of this proposal, and purchase order if required by client policies.","Official start date and a designated primary point of contact with approver details.","Billing information: Legal entity name, registered office address, and GSTIN."],choices:[{id:T(),label:"Proposed Start Date",options:[]},{id:T(),label:"Billing Entity Name & GSTIN",options:[]}],openItems:[],notes:"",status:"draft",approval:null,approvalHistory:[],shareId:null,sharedVersion:0};const i=this.rateDoc&&this.rateDoc.packages&&this.rateDoc.packages[0];i&&this.activeProposal.heads.push(this.createHeadFromPackage(i)),this.activeStep="brief",this.currentView="editor",this.render()}createHeadFromPackage(t){const e=(t.components||[]).map(s=>{const a=this.rateDoc&&this.rateDoc.items&&this.rateDoc.items.find(i=>i.id===s.rateId);return a?{id:T(),rateId:a.id,service:a.service,desc:a.inc||"",unit:a.unit||"item",qty:f(s.qty)||1,rate:f(a.inr)||0,slabs:ie(a.slabs||[])}:null}).filter(Boolean);return{id:T(),packageId:t.id,title:t.service,billing:t.billing||"monthly",desc:t.desc||"",exc:t.exc||"",mult:f(t.mult)||1,multLabel:t.multLabel||"brands",packDisc:f(t.packDisc)||0,fixed:0,lines:e}}async openProposal(t){try{const e=await O(`/proposals/${t}`);this.activeProposal=e,this.activeStep="scope",this.currentView="editor",this.render()}catch(e){alert("Could not open proposal: "+e.message)}}async saveActiveProposal(t=!1){if(!this.activeProposal)return;this.saving=!0;const e=this.container.querySelector("#ps-save-state");e&&(e.textContent="Saving…");try{let s;this.activeProposal._id?s=await J(`/proposals/${this.activeProposal._id}`,this.activeProposal):(s=await K("/proposals",this.activeProposal),this.activeProposal._id=s._id),this.activeProposal=s;const a=this.proposals.findIndex(i=>i._id===s._id);a>=0?this.proposals[a]=s:this.proposals.unshift(s),e&&(e.textContent="Saved ✓")}catch(s){e&&(e.textContent="Save failed: "+s.message)}finally{this.saving=!1}}scheduleAutoSave(){clearTimeout(this.saveTimeout);const t=this.container.querySelector("#ps-save-state");t&&(t.textContent="Unsaved changes"),this.saveTimeout=setTimeout(()=>this.saveActiveProposal(!0),1200)}renderProposalEditor(t){const e=this.activeProposal;if(!e)return this.render();const s=U(e),a=this.rateDoc&&this.rateDoc.settings||{},i=[["brief","1. Client & Brief"],["scope","2. Scope & Pricing"],["content","3. Content Narrative"],["team","4. Team & Governance"],["terms","5. Terms & Payment"],["approve","6. Approval & Release"]],n=e.approval&&e.approval.decision==="approved"&&e.approval.pinVerified;t.innerHTML=`
      <div class="ps-editor-container">
        <!-- Editor Navigation Header -->
        <div class="card ps-editor-topbar">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <button class="btn small" id="ps-editor-back-btn">← Back to Proposals</button>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">
              ${r(e.client||"Untitled Client")} — ${r(e.title||"Proposal")}
            </h3>
            <span class="muted small" style="font-family:var(--font-mono);">(${r(e.ref)})</span>
            ${this.renderStatusBadge(e)}
          </div>

          <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
            <div id="ps-save-state" class="muted small" style="font-weight:600;">Saved ✓</div>
            <div style="text-align:right;">
              <span class="muted small">Contract Value:</span>
              <strong style="color:var(--brand-600);font-size:16px;margin-left:4px;">${A(s.contract,e.currency)}</strong>
            </div>
            <button class="btn small primary" id="ps-manual-save-btn">Save Changes</button>
          </div>
        </div>

        <!-- 6-Step Tab Bar -->
        <div class="ps-steps-bar card" style="padding:6px;display:flex;gap:4px;overflow-x:auto;">
          ${i.map(([m,u])=>`
            <button class="ps-step-btn ${this.activeStep===m?"active":""}" data-step="${m}">
              ${u}
              ${m==="approve"&&n?" 🔐":""}
            </button>
          `).join("")}
        </div>

        <!-- Step Body & Live Paper Preview Grid -->
        <div class="ps-editor-split">
          <!-- Left Column: Step Settings -->
          <div class="ps-step-content" id="ps-step-pane"></div>

          <!-- Right Column: Interactive Paper Preview -->
          <div class="ps-paper-preview-col">
            <div class="card" style="padding:14px;display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
              <div style="font-weight:700;font-size:13px;display:flex;align-items:center;gap:6px;">
                <span>📄 Live Branded Preview</span>
                <span class="muted small">(${e.currency})</span>
              </div>
              <div style="display:flex;gap:6px;">
                <button class="btn small" id="ps-preview-docx-btn" ${n?"":'disabled title="Requires Admin PIN Approval"'}>Word (.docx)</button>
                <button class="btn small" id="ps-preview-pdf-btn" ${n?"":'disabled title="Requires Admin PIN Approval"'}>PDF Document</button>
              </div>
            </div>
            <div class="paperwrap" id="ps-live-paper">
              ${Z(Y(e,a))}
            </div>
          </div>
        </div>
      </div>
    `,t.querySelector("#ps-editor-back-btn").onclick=()=>{this.currentView="list",this.render()},t.querySelector("#ps-manual-save-btn").onclick=()=>this.saveActiveProposal(),t.querySelectorAll("[data-step]").forEach(m=>{m.onclick=()=>{this.activeStep=m.dataset.step,this.renderProposalEditor(t)}});const c=t.querySelector("#ps-preview-docx-btn");c&&(c.onclick=()=>we(e,a,c));const d=t.querySelector("#ps-preview-pdf-btn");d&&(d.onclick=()=>Se(e,a,d));const o=t.querySelector("#ps-step-pane");this.activeStep==="brief"?this.renderStepBrief(o):this.activeStep==="scope"?this.renderStepScope(o):this.activeStep==="content"?this.renderStepContent(o):this.activeStep==="team"?this.renderStepTeam(o):this.activeStep==="terms"?this.renderStepTerms(o):this.activeStep==="approve"&&this.renderStepApprove(o)}refreshLivePaper(){const t=this.container.querySelector("#ps-live-paper");if(t&&this.activeProposal){const e=this.rateDoc&&this.rateDoc.settings||{};t.innerHTML=Z(Y(this.activeProposal,e))}}renderStepBrief(t){const e=this.activeProposal;t.innerHTML=`
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Client Profile & Proposal Information</h3>
        <div class="grid grid-2">
          <div>
            <label class="label">Client Organisation <span style="color:var(--red-500)">*</span></label>
            <input type="text" class="input" id="ps-f-client" value="${r(e.client)}" placeholder="e.g. Times of India / Hilton">
          </div>
          <div>
            <label class="label">Short Name in Narrative</label>
            <input type="text" class="input" id="ps-f-clientShort" value="${r(e.clientShort)}" placeholder="e.g. TOI">
          </div>
          <div>
            <label class="label">Primary Contact Person</label>
            <input type="text" class="input" id="ps-f-contact" value="${r(e.contact)}" placeholder="e.g. Rajesh Sharma">
          </div>
          <div>
            <label class="label">Contact Designation / Title</label>
            <input type="text" class="input" id="ps-f-contactRole" value="${r(e.contactRole)}" placeholder="e.g. VP Marketing">
          </div>
          <div>
            <label class="label">Industry / Sector</label>
            <input type="text" class="input" id="ps-f-industry" value="${r(e.industry)}" placeholder="e.g. Hospitality / Fintech">
          </div>
          <div>
            <label class="label">Target Market / Geography</label>
            <input type="text" class="input" id="ps-f-location" value="${r(e.location)}" placeholder="e.g. India & GCC">
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
            <input type="date" class="input" id="ps-f-date" value="${r(e.date)}">
          </div>
          <div>
            <label class="label">Proposal Validity (Days)</label>
            <input type="number" class="input" id="ps-f-validity" value="${r(e.validity)}" min="1">
          </div>
          <div>
            <label class="label">Proposal Reference ID</label>
            <input type="text" class="input" id="ps-f-ref" value="${r(e.ref)}">
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 4px 0;">Client Brief & Strategic Requirements</h3>
        <p class="muted small" style="margin:0 0 12px 0;">Paste discovery notes, client requirements, RFP extracts, or RFQ scope items below.</p>
        <textarea class="input" id="ps-f-brief" rows="7" placeholder="Paste discovery call transcripts, client goals, expected deliverables, competitor benchmarks, or timelines...">${r(e.brief)}</textarea>
      </div>

      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Proposal Title & Narrative Cover</h3>
        <div class="grid grid-2">
          <div class="span2">
            <label class="label">Cover Title</label>
            <input type="text" class="input" id="ps-f-title" value="${r(e.title)}">
          </div>
          <div class="span2">
            <label class="label">Cover Subtitle</label>
            <input type="text" class="input" id="ps-f-subtitle" value="${r(e.subtitle)}">
          </div>
          <div class="span2">
            <label class="label">One-Line Executive Scope Summary</label>
            <textarea class="input" id="ps-f-oneLine" rows="2">${r(e.oneLine)}</textarea>
          </div>
        </div>
      </div>
    `;const s=(i,n,c=!1)=>{const d=t.querySelector(i);d&&(d.oninput=()=>{e[n]=c?f(d.value):d.value,this.scheduleAutoSave(),this.refreshLivePaper()})};s("#ps-f-client","client"),s("#ps-f-clientShort","clientShort"),s("#ps-f-contact","contact"),s("#ps-f-contactRole","contactRole"),s("#ps-f-industry","industry"),s("#ps-f-location","location"),s("#ps-f-date","date"),s("#ps-f-validity","validity",!0),s("#ps-f-ref","ref"),s("#ps-f-brief","brief"),s("#ps-f-title","title"),s("#ps-f-subtitle","subtitle"),s("#ps-f-oneLine","oneLine");const a=t.querySelector("#ps-f-currency");a&&(a.onchange=()=>{e.currency=a.value,e.currency==="USD"&&e.gst===18&&(e.gst=0),e.currency==="INR"&&!e.gst&&(e.gst=18),this.repriceAllScopeLines(),this.scheduleAutoSave(),this.refreshLivePaper()})}repriceAllScopeLines(){const t=this.activeProposal;!t||!this.rateDoc||(t.heads||[]).forEach(e=>{(e.lines||[]).forEach(s=>{const a=this.rateDoc.items.find(i=>i.id===s.rateId);a&&(s.rate=f(t.currency==="USD"?a.usd:a.inr))})})}renderStepScope(t){const e=this.activeProposal,s=this.rateDoc&&this.rateDoc.items||[],a=this.rateDoc&&this.rateDoc.packages||[];t.innerHTML=`
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Heads of Work & Deliverables</h3>
            <p class="muted small" style="margin:0;">Add packaged service suites or custom line items. Volume discounts apply automatically as quantities scale.</p>
          </div>
          <div style="display:flex;gap:8px;">
            <select class="input" id="ps-add-pkg-select" style="width:200px;">
              <option value="">+ Add Package...</option>
              ${a.map(u=>`<option value="${r(u.id)}">${r(u.service)} (${u.billing})</option>`).join("")}
            </select>
            <select class="input" id="ps-add-svc-select" style="width:200px;">
              <option value="">+ Add Single Item...</option>
              ${s.map(u=>`<option value="${r(u.id)}">${r(u.category)}: ${r(u.service)}</option>`).join("")}
            </select>
            <button class="btn small" id="ps-add-blank-head-btn">+ Blank Head</button>
          </div>
        </div>

        <div id="ps-heads-list">
          ${(e.heads||[]).map((u,v)=>this.renderHeadCardHTML(u,v)).join("")}
        </div>
      </div>

      <!-- Commercials & Discounts -->
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Commercial Terms, Discounts & Taxes</h3>
        <div class="grid grid-4">
          <div>
            <label class="label">Retainer Term (Months)</label>
            <input type="number" class="input" id="ps-f-term" value="${r(e.term)}" min="1">
          </div>
          <div>
            <label class="label">Term Commitment Discount (%)</label>
            <input type="number" class="input" id="ps-f-termDisc" value="${r(e.termDisc)}" min="0" max="90" step="any">
          </div>
          <div>
            <label class="label">Additional Commercial Discount (%)</label>
            <input type="number" class="input" id="ps-f-discount" value="${r(e.discount)}" min="0" max="90" step="any">
          </div>
          <div>
            <label class="label">${e.currency==="INR"?"GST Tax Rate (%)":"Tax Rate (%)"}</label>
            <input type="number" class="input" id="ps-f-gst" value="${r(e.gst)}" min="0" step="any">
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
        <textarea class="input" id="ps-f-exclusions" rows="2" placeholder="e.g. Media ad spend, commercial talent fees, travel expenses...">${r(e.exclusions)}</textarea>
      </div>
    `;const i=t.querySelector("#ps-add-pkg-select");i&&(i.onchange=()=>{const u=i.value;if(!u)return;const v=a.find(I=>I.id===u);v&&(e.heads.push(this.createHeadFromPackage(v)),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper())});const n=t.querySelector("#ps-add-svc-select");n&&(n.onchange=()=>{const u=n.value;if(!u)return;const v=s.find(I=>I.id===u);if(v){const I=/month|handle set|platform/.test(v.unit)||/month/.test(v.note||"");e.heads.push({id:T(),packageId:null,title:v.service,billing:I?"monthly":"one-time",desc:"",exc:v.exc||"",mult:1,multLabel:"brands",packDisc:0,fixed:0,lines:[{id:T(),rateId:v.id,service:v.service,desc:v.inc||"",unit:v.unit||"item",qty:1,rate:f(e.currency==="USD"?v.usd:v.inr),slabs:ie(v.slabs||[])}]}),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}});const c=t.querySelector("#ps-add-blank-head-btn");c&&(c.onclick=()=>{e.heads.push({id:T(),packageId:null,title:"Custom Scope Area",billing:"monthly",desc:"",exc:"",mult:1,multLabel:"brands",packDisc:0,fixed:0,lines:[]}),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}),this.bindHeadEvents(t);const d=t.querySelector("#ps-f-term");d&&(d.oninput=()=>{e.term=Math.max(1,f(d.value)),e.term>=12?e.termDisc=10:e.term>=6?e.termDisc=5:e.termDisc=0;const u=t.querySelector("#ps-f-termDisc");u&&(u.value=e.termDisc),this.scheduleAutoSave(),this.refreshLivePaper()});const o=(u,v)=>{const I=t.querySelector(u);I&&(I.oninput=()=>{e[v]=f(I.value),this.scheduleAutoSave(),this.refreshLivePaper()})};o("#ps-f-termDisc","termDisc"),o("#ps-f-discount","discount"),o("#ps-f-gst","gst"),t.querySelectorAll('input[name="ps-pricing-view"]').forEach(u=>{u.onchange=()=>{e.pricingView=u.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const m=t.querySelector("#ps-f-exclusions");m&&(m.oninput=()=>{e.exclusions=m.value,this.scheduleAutoSave(),this.refreshLivePaper()})}renderHeadCardHTML(t,e){const s=this.activeProposal,a=de(t);return`
      <div class="headcard" data-head-id="${r(t.id)}" style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:16px;margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap;">
          <input type="text" class="input hc-title" data-head-field="title" value="${r(t.title)}" style="font-weight:700;flex:1;min-width:200px;">
          <select class="input" data-head-field="billing" style="width:130px;">
            <option value="monthly" ${t.billing==="monthly"?"selected":""}>Monthly</option>
            <option value="one-time" ${t.billing!=="monthly"?"selected":""}>One-time</option>
          </select>
          <div style="display:inline-flex;gap:4px;">
            <button class="btn small" data-head-action="up" ${e===0?"disabled":""} title="Move Up">↑</button>
            <button class="btn small" data-head-action="down" ${e===s.heads.length-1?"disabled":""} title="Move Down">↓</button>
            <button class="btn small danger" data-head-action="remove" title="Remove Head">✕</button>
          </div>
        </div>

        <div style="display:flex;gap:14px;flex-wrap:wrap;font-size:13px;margin-bottom:12px;align-items:center;">
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Multiplier:</span>
            <input type="number" class="input" data-head-field="mult" value="${r(t.mult||1)}" min="1" style="width:65px;">
            <input type="text" class="input" data-head-field="multLabel" value="${r(t.multLabel||"brands")}" style="width:100px;">
          </label>
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Package Disc (%):</span>
            <input type="number" class="input" data-head-field="packDisc" value="${r(t.packDisc||0)}" min="0" max="90" style="width:75px;">
          </label>
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Fixed Override:</span>
            <input type="number" class="input" data-head-field="fixed" value="${r(t.fixed||"")}" placeholder="None" style="width:110px;">
          </label>
        </div>

        <!-- Lines Table -->
        <div class="scroll" style="margin-bottom:10px;">
          <table class="table" style="width:100%;margin:0;font-size:13px;">
            <thead>
              <tr style="background:var(--bg-card);">
                <th>Service Deliverable</th>
                <th>Inclusions / Description</th>
                <th style="width:70px;text-align:right;">Qty</th>
                <th style="width:80px;">Unit</th>
                <th style="width:95px;text-align:right;">Rate</th>
                <th style="width:105px;text-align:right;">Net</th>
                <th style="width:40px;"></th>
              </tr>
            </thead>
            <tbody>
              ${(t.lines||[]).map(i=>{const n=f(i.qty)*f(i.rate),c=oe(i.slabs,f(i.qty)*(f(t.mult)||1)),d=n*(1-c/100);return`
                  <tr data-line-id="${r(i.id)}">
                    <td><input type="text" class="input" data-line-field="service" value="${r(i.service)}"></td>
                    <td><input type="text" class="input" data-line-field="desc" value="${r(i.desc)}" placeholder="What this line covers..."></td>
                    <td><input type="number" class="input" data-line-field="qty" value="${r(i.qty)}" min="0" style="text-align:right;"></td>
                    <td><input type="text" class="input" data-line-field="unit" value="${r(i.unit)}"></td>
                    <td><input type="number" class="input" data-line-field="rate" value="${r(i.rate)}" min="0" style="text-align:right;"></td>
                    <td style="text-align:right;font-weight:700;font-variant-numeric:tabular-nums;padding-top:14px;">
                      ${A(d,s.currency)}
                      ${c?`<div style="color:var(--green-600);font-size:11px;font-weight:400;">(${c}% vol)</div>`:""}
                    </td>
                    <td><button class="btn small danger" data-line-action="remove" style="padding:4px 6px;">✕</button></td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <button class="btn small" data-head-action="add-line">+ Add Deliverable Line</button>
          <div style="font-size:13.5px;font-weight:700;color:var(--text-1);">
            Head Subtotal: <span style="color:var(--brand-600);">${A(a.net,s.currency)}</span>
            <span class="muted small" style="font-weight:400;">${t.billing==="monthly"?"/ month":" one-time"}</span>
          </div>
        </div>
      </div>
    `}bindHeadEvents(t){const e=this.activeProposal;t.querySelectorAll(".headcard").forEach((s,a)=>{const i=s.dataset.headId,n=e.heads.find(d=>d.id===i);if(!n)return;s.querySelectorAll("[data-head-field]").forEach(d=>{d.oninput=()=>{const o=d.dataset.headField;n[o]=d.type==="number"?f(d.value):d.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const c=s.querySelector('select[data-head-field="billing"]');c&&(c.onchange=()=>{n.billing=c.value,this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}),s.querySelectorAll("[data-head-action]").forEach(d=>{d.onclick=()=>{const o=d.dataset.headAction;o==="remove"?e.heads=e.heads.filter(m=>m.id!==i):o==="up"&&a>0?[e.heads[a-1],e.heads[a]]=[e.heads[a],e.heads[a-1]]:o==="down"&&a<e.heads.length-1?[e.heads[a+1],e.heads[a]]=[e.heads[a],e.heads[a+1]]:o==="add-line"&&n.lines.push({id:T(),rateId:"",service:"Custom Deliverable",desc:"",unit:"item",qty:1,rate:0,slabs:[]}),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()}}),s.querySelectorAll("tr[data-line-id]").forEach(d=>{const o=d.dataset.lineId,m=n.lines.find(v=>v.id===o);if(!m)return;d.querySelectorAll("[data-line-field]").forEach(v=>{v.oninput=()=>{const I=v.dataset.lineField;m[I]=v.type==="number"?f(v.value):v.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const u=d.querySelector('[data-line-action="remove"]');u&&(u.onclick=()=>{n.lines=n.lines.filter(v=>v.id!==o),this.scheduleAutoSave(),this.renderStepScope(t),this.refreshLivePaper()})})})}renderStepContent(t){const e=this.activeProposal;t.innerHTML=`
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Proposal Narrative Sections</h3>
            <p class="muted small" style="margin:0;">The core strategic story: Understanding, Strategic Approach, Implementation, and Credentials.</p>
          </div>
          <button class="btn small" id="ps-add-section-btn">+ Add Section</button>
        </div>

        <div id="ps-sections-list">
          ${(e.sections||[]).map((s,a)=>`
            <div class="card ps-sec-card" data-sec-id="${r(s.id)}" style="background:var(--bg-elevated);border:1px solid var(--border-sm);padding:14px;margin-bottom:12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <input type="text" class="input" data-sec-field="title" value="${r(s.title)}" style="font-weight:700;flex:1;">
                <button class="btn small danger" data-sec-action="remove">✕</button>
              </div>
              <textarea class="input" data-sec-field="body" rows="4" placeholder="Section body text... Use '- ' for bullet points.">${r(s.body)}</textarea>
            </div>
          `).join("")}
        </div>
      </div>
    `,t.querySelector("#ps-add-section-btn").onclick=()=>{e.sections.push({id:T(),title:"New Narrative Section",body:""}),this.scheduleAutoSave(),this.renderStepContent(t),this.refreshLivePaper()},t.querySelectorAll(".ps-sec-card").forEach(s=>{const a=s.dataset.secId,i=e.sections.find(o=>o.id===a);if(!i)return;const n=s.querySelector('[data-sec-field="title"]');n&&(n.oninput=()=>{i.title=n.value,this.scheduleAutoSave(),this.refreshLivePaper()});const c=s.querySelector('[data-sec-field="body"]');c&&(c.oninput=()=>{i.body=c.value,this.scheduleAutoSave(),this.refreshLivePaper()});const d=s.querySelector('[data-sec-action="remove"]');d&&(d.onclick=()=>{e.sections=e.sections.filter(o=>o.id!==a),this.scheduleAutoSave(),this.renderStepContent(t),this.refreshLivePaper()})})}renderStepTeam(t){const e=this.activeProposal,s=this.rateDoc&&this.rateDoc.settings&&this.rateDoc.settings.team||[];t.innerHTML=`
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Named CI360 Account Team</h3>
            <p class="muted small" style="margin:0;">Who will work on the mandate and what each lead specifically owns.</p>
          </div>
          <button class="btn small" id="ps-add-team-btn">+ Add Member</button>
        </div>

        <table class="table" style="width:100%;">
          <thead>
            <tr style="background:var(--bg-elevated);">
              <th style="width:200px;">From Team Library</th>
              <th>Name</th>
              <th>Engagement Role</th>
              <th>Responsibility</th>
              <th style="width:40px;"></th>
            </tr>
          </thead>
          <tbody>
            ${(e.team||[]).map(n=>`
              <tr data-team-id="${r(n.id)}">
                <td>
                  <select class="input" data-t-select>
                    <option value="">Custom member...</option>
                    ${s.map(c=>`<option value="${r(c.id)}" ${n.memberId===c.id?"selected":""}>${r(c.name)} (${r(c.role)})</option>`).join("")}
                  </select>
                </td>
                <td><input type="text" class="input" data-t-field="name" value="${r(n.name)}"></td>
                <td><input type="text" class="input" data-t-field="role" value="${r(n.role)}"></td>
                <td><input type="text" class="input" data-t-field="resp" value="${r(n.resp)}"></td>
                <td><button class="btn small danger" data-t-action="remove">✕</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Client-Side Contacts & Approvers</h3>
        <textarea class="input" id="ps-f-clientTeam" rows="2" placeholder="e.g. Content approval: Sachin Nagi; Commercial sign-off: Pramit Ghosh">${r(e.clientTeam)}</textarea>
      </div>

      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">How We Work Together (Meeting Cadence)</h3>
        <textarea class="input" id="ps-f-cadence" rows="4">${r(e.cadence)}</textarea>
      </div>
    `,t.querySelector("#ps-add-team-btn").onclick=()=>{e.team.push({id:T(),memberId:"",name:"",role:"",resp:""}),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()},t.querySelectorAll("tr[data-team-id]").forEach(n=>{const c=n.dataset.teamId,d=e.team.find(u=>u.id===c);if(!d)return;const o=n.querySelector("[data-t-select]");o&&(o.onchange=()=>{const u=s.find(v=>v.id===o.value);u?(d.memberId=u.id,d.name=u.name,d.role=u.engRole||u.role,d.resp=u.resp||""):d.memberId="",this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()}),n.querySelectorAll("[data-t-field]").forEach(u=>{u.oninput=()=>{d[u.dataset.tField]=u.value,this.scheduleAutoSave(),this.refreshLivePaper()}});const m=n.querySelector('[data-t-action="remove"]');m&&(m.onclick=()=>{e.team=e.team.filter(u=>u.id!==c),this.scheduleAutoSave(),this.renderStepTeam(t),this.refreshLivePaper()})});const a=t.querySelector("#ps-f-clientTeam");a&&(a.oninput=()=>{e.clientTeam=a.value,this.scheduleAutoSave(),this.refreshLivePaper()});const i=t.querySelector("#ps-f-cadence");i&&(i.oninput=()=>{e.cadence=i.value,this.scheduleAutoSave(),this.refreshLivePaper()})}renderStepTerms(t){const e=this.activeProposal;t.innerHTML=`
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
        <textarea class="input" id="ps-f-clientNeeds" rows="4" placeholder="One requirement per line...">${r((e.clientNeeds||[]).join(`
`))}</textarea>
      </div>

      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Legal Terms & Clauses Included</h3>
        <div style="display:grid;gap:8px;">
          ${(e.terms||[]).map(n=>`
            <label class="card" style="padding:10px 14px;display:flex;align-items:flex-start;gap:10px;cursor:pointer;background:var(--bg-elevated);border:1px solid var(--border-sm);margin:0;">
              <input type="checkbox" data-term-id="${r(n.id)}" ${n.on?"checked":""} style="margin-top:4px;">
              <div>
                <strong style="font-size:13.5px;color:var(--text-1);">${r(n.title)}</strong>
                <p class="muted small" style="margin:2px 0 0 0;">${r(n.text)}</p>
              </div>
            </label>
          `).join("")}
        </div>
      </div>
    `;const s=t.querySelector("#ps-f-retainerPay");s&&(s.onchange=()=>{e.retainerPay=s.value,this.scheduleAutoSave(),this.refreshLivePaper()});const a=t.querySelector("#ps-f-projectPay");a&&(a.onchange=()=>{e.projectPay=a.value,this.scheduleAutoSave(),this.refreshLivePaper()});const i=t.querySelector("#ps-f-clientNeeds");i&&(i.oninput=()=>{e.clientNeeds=i.value.split(`
`).map(n=>n.trim()).filter(Boolean),this.scheduleAutoSave(),this.refreshLivePaper()}),t.querySelectorAll("input[data-term-id]").forEach(n=>{n.onchange=()=>{const c=e.terms.find(d=>d.id===n.dataset.termId);c&&(c.on=n.checked,this.scheduleAutoSave(),this.refreshLivePaper())}})}renderStepApprove(t){const e=this.activeProposal,s=e.approval&&e.approval.decision==="approved"&&e.approval.pinVerified;e.status;const a=e.shareId?`${window.location.origin}/proposal?p=${e.shareId}`:"";t.innerHTML=`
      <!-- Admin PIN Status Card -->
      <div class="card" style="margin-bottom:16px;border-left:4px solid ${s?"var(--green-500)":"var(--amber-500)"}">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="display:flex;align-items:center;gap:8px;">
              <h3 style="font-size:18px;font-weight:800;color:var(--text-1);margin:0;">
                Internal Admin Approval & Sign-off
              </h3>
              ${s?'<span class="badge green">🔐 VERIFIED WITH ADMIN PIN</span>':'<span class="badge amber">UNAPPROVED</span>'}
            </div>
            <p class="muted small" style="margin:4px 0 0;">
              Proposals must be signed off by an authorized admin using their secure PIN before Word/PDF downloads or client links can be released.
            </p>
          </div>

          <div style="display:flex;gap:8px;">
            ${s?`
              <button class="btn" id="ps-btn-reauthorize-pin">
                🔄 Re-authorize / Sign Again
              </button>
            `:`
              <button class="btn gold" id="ps-btn-approve-pin" style="font-weight:700;">
                🔐 Authorize & Approve with Admin PIN
              </button>
            `}
          </div>
        </div>

        ${s?`
          <div style="margin-top:14px;padding:12px 16px;background:var(--green-50, rgba(16,185,129,0.08));border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-md);">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:20px;">🛡️</span>
              <div>
                <strong style="color:var(--green-600);font-size:14px;">Officially Approved by Admin</strong>
                <div class="small" style="color:var(--text-2);">
                  Sign-off by <strong>${r(e.approval.approverName||"Admin")}</strong>
                  (${r(e.approval.approverEmail||"admin")}) on <strong>${H(e.approval.at)}</strong>
                </div>
                ${e.approval.note?`<div class="small muted" style="margin-top:4px;">“${r(e.approval.note)}”</div>`:""}
              </div>
            </div>
          </div>
        `:`
          <div style="margin-top:14px;padding:12px 16px;background:var(--amber-50, rgba(245,158,11,0.08));border:1px solid rgba(245,158,11,0.25);border-radius:var(--r-md);font-size:13.5px;color:var(--amber-600);">
            ⚠️ This proposal is currently in draft / awaiting approval. Enter your Admin PIN to authorize and release it.
          </div>
        `}
      </div>

      <!-- Release & Sharing Card -->
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 6px 0;">Client Release & Online Share Link</h3>
        <p class="muted small" style="margin:0 0 14px 0;">Share a secure online copy with the client so they can review sign-off choices, approve, or request modifications.</p>

        ${e.shareId?`
          <div style="margin-bottom:14px;">
            <label class="label">Live Client Link (Version ${e.sharedVersion})</label>
            <div style="display:flex;gap:8px;">
              <input type="text" class="input" id="ps-share-link-input" readonly value="${r(a)}">
              <button class="btn" id="ps-copy-link-btn">📋 Copy Link</button>
              <a href="/proposal?p=${r(e.shareId)}" target="_blank" class="btn">👁️ Open View</a>
            </div>
          </div>
        `:""}

        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          <button class="btn primary" id="ps-btn-release-pin" ${s?"":'disabled title="Approve with PIN first"'}>
            🚀 ${e.shareId?"Update & Release New Version to Client":"Release Proposal to Client"}
          </button>
          <span class="muted small">
            ${s?"Unlocked ✓ Ready to release.":"🔒 Unlocks after Admin PIN approval."}
          </span>
        </div>

        ${e.clientResponse&&e.clientResponse.decision?`
          <div style="margin-top:16px;padding:14px;border-radius:var(--r-md);background:${e.clientResponse.decision==="approved"?"var(--green-50, rgba(16,185,129,0.1))":"var(--amber-50, rgba(245,158,11,0.1))"};border:1px solid ${e.clientResponse.decision==="approved"?"rgba(16,185,129,0.3)":"rgba(245,158,11,0.3)"}">
            <strong style="color:${e.clientResponse.decision==="approved"?"var(--green-600)":"var(--amber-600)"}">
              ${e.clientResponse.decision==="approved"?"🎉 Client Approved Online":"⚠️ Client Requested Changes"}
            </strong>
            <div class="small muted" style="margin-top:2px;">
              Responded by ${r(e.clientResponse.name)} (${r(e.clientResponse.role||"Client")}) on ${H(e.clientResponse.at)}
            </div>
            ${e.clientResponse.comment?`<p style="margin:8px 0 0 0;font-size:13.5px;">“${r(e.clientResponse.comment)}”</p>`:""}
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
              ${e.approvalHistory&&e.approvalHistory.length?e.approvalHistory.slice().reverse().map(d=>`
                <tr>
                  <td><strong style="color:var(--text-1);">${r(d.action)}</strong></td>
                  <td>${r(d.adminName)} <span class="muted small">(${r(d.adminEmail||"admin")})</span></td>
                  <td><span class="badge gray">${r(d.adminRole||"admin")}</span></td>
                  <td style="white-space:nowrap;">${H(d.timestamp)}</td>
                  <td>${d.pinVerified?'<span class="badge green">🔐 Verified</span>':'<span class="badge gray">—</span>'}</td>
                  <td><code style="font-size:11px;background:var(--bg-elevated);padding:2px 4px;border-radius:4px;">${r((d.hash||"").slice(0,8))}</code></td>
                  <td class="muted small">${r(d.note||"—")}</td>
                </tr>
              `).join(""):`
                <tr><td colspan="7" class="muted" style="text-align:center;padding:18px;">No audit events recorded yet.</td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;const i=t.querySelector("#ps-btn-approve-pin")||t.querySelector("#ps-btn-reauthorize-pin");i&&(i.onclick=()=>{this.showAdminPinModal(e,"Approved with Admin PIN",()=>{this.renderProposalEditor(this.container.querySelector("#ps-view-content"))})});const n=t.querySelector("#ps-btn-release-pin");n&&(n.onclick=()=>{this.showAdminPinModal(e,"Released to Client with Admin PIN",()=>{this.renderProposalEditor(this.container.querySelector("#ps-view-content"))},!0)});const c=t.querySelector("#ps-copy-link-btn");c&&(c.onclick=async()=>{const d=t.querySelector("#ps-share-link-input");if(d){d.select();try{await navigator.clipboard.writeText(d.value),c.textContent="Copied ✓",setTimeout(()=>c.textContent="📋 Copy Link",2e3)}catch{alert("Press Ctrl+C to copy: "+d.value)}}})}showAdminPinModal(t,e="Approved with Admin PIN",s,a=!1){const i=ye()||{name:"Admin",email:"admin@ci360.local"},n=document.createElement("div");n.className="modal-backdrop",n.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,0.65);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:99999;padding:16px;",n.innerHTML=`
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
            <strong>${r(t.ref)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span class="muted">Client:</span>
            <strong>${r(t.client||"Client")}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span class="muted">Approving Admin:</span>
            <span><strong>${r(i.name)}</strong> (${r(i.email||"admin")})</span>
          </div>
        </div>

        <form id="ps-pin-form">
          <div style="margin-bottom:14px;">
            <label class="label" style="font-weight:700;">Enter Secure Admin PIN / Passcode</label>
            <div style="position:relative;">
              <input type="password" id="ps-modal-pin-input" class="input" style="font-size:22px;letter-spacing:6px;text-align:center;padding:12px;font-family:var(--font-mono);" placeholder="••••" maxlength="8" autocomplete="off" autofocus required>
              <button type="button" id="ps-toggle-pin-visibility" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:0;cursor:pointer;font-size:16px;">👁️</button>
            </div>
            ${this.pinStatus.isConfigured?"":'<p class="small muted" style="margin:4px 0 0;color:var(--amber-600);">💡 Default PIN is <strong>3600</strong> (customize in Settings & PIN)</p>'}
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
    `,document.body.append(n);const c=n.querySelector("#ps-modal-pin-input"),d=n.querySelector("#ps-modal-note-input"),o=n.querySelector("#ps-modal-error"),m=n.querySelector("#ps-toggle-pin-visibility"),u=n.querySelector("#ps-modal-cancel-btn"),v=n.querySelector("#ps-pin-form");c.focus(),m.onclick=()=>{c.type=c.type==="password"?"text":"password"},u.onclick=()=>n.remove(),v.onsubmit=async I=>{I.preventDefault();const k=c.value.trim(),E=d.value.trim();if(!k){o.textContent="Please enter your Admin PIN",o.style.display="block";return}const L=n.querySelector("#ps-modal-submit-btn");L.disabled=!0,L.textContent="Verifying PIN…",o.style.display="none";try{const z=a?`/proposals/${t._id}/release`:`/proposals/${t._id}/approve`,q=await K(z,{pin:k,note:E,action:e});if(q.proposal){Object.assign(t,q.proposal);const p=this.proposals.findIndex(y=>y._id===t._id);p>=0&&(this.proposals[p]=q.proposal)}n.remove(),alert(`✅ Action Authorized!
Proposal ${t.ref} has been officially recorded and approved with Admin PIN.`),typeof s=="function"&&s()}catch(z){o.textContent=z.message||"Incorrect Admin PIN / Passcode",o.style.display="block",c.select(),L.disabled=!1,L.textContent="Authorize & Sign"}}}renderRateCardView(t){if(!this.rateDoc)return;const e=this.rateDoc.items||[],s=this.rateDoc.packages||[];t.innerHTML=`
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
        <h3 style="font-size:16px;font-weight:700;margin:0 0 12px 0;">Standard Service Packages (${s.length})</h3>
        <div class="grid grid-2">
          ${s.map(n=>`
            <div class="card" style="background:var(--bg-elevated);border:1px solid var(--border-sm);padding:14px;margin:0;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
                <strong style="font-size:15px;color:var(--text-1);">${r(n.service)}</strong>
                <span class="badge ${n.billing==="monthly"?"blue":"green"}">${r(n.billing)}</span>
              </div>
              <p class="small muted" style="margin:0 0 8px 0;">${r(n.desc)}</p>
              <div style="font-size:12.5px;color:var(--text-2);">
                <span>Discount: <strong>${n.packDisc}%</strong></span> •
                <span>Components: <strong>${n.components.length} items</strong></span>
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
              ${e.map(n=>`
                <tr data-rate-row="${r((n.service+" "+n.category).toLowerCase())}">
                  <td><span class="badge gray">${r(n.category)}</span></td>
                  <td><strong>${r(n.service)}</strong></td>
                  <td class="muted">${r(n.unit)}</td>
                  <td style="text-align:right;font-weight:700;font-variant-numeric:tabular-nums;">${te(n.inr)}</td>
                  <td style="text-align:right;font-variant-numeric:tabular-nums;">$${n.usd||0}</td>
                  <td class="muted small" style="max-width:320px;">${r(n.inc)}</td>
                  <td>${n.tag?`<span class="badge blue">${r(n.tag)}</span>`:"—"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;const a=t.querySelector("#ps-rate-filter");a&&(a.oninput=()=>{const n=a.value.toLowerCase().trim();t.querySelectorAll("tr[data-rate-row]").forEach(c=>{c.style.display=!n||c.dataset.rateRow.includes(n)?"":"none"})});const i=t.querySelector("#ps-save-ratecard-btn");i&&(i.onclick=async()=>{i.disabled=!0,i.textContent="Saving…";try{await J("/proposals/ratecard",this.rateDoc),alert("Rate card updated successfully!")}catch(n){alert("Error: "+n.message)}finally{i.disabled=!1,i.textContent="Save Rate Card Changes"}})}renderAuditTrailView(t){const e=[];this.proposals.forEach(s=>{(s.approvalHistory||[]).forEach(a=>{e.push({...a,proposalRef:s.ref,proposalClient:s.client,proposalId:s._id})})}),e.sort((s,a)=>new Date(a.timestamp)-new Date(s.timestamp)),t.innerHTML=`
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
              `:e.map(s=>`
                <tr>
                  <td style="white-space:nowrap;font-weight:600;">${H(s.timestamp)}</td>
                  <td>
                    <strong>${r(s.adminName)}</strong>
                    <div class="muted small">${r(s.adminEmail||"admin")}</div>
                  </td>
                  <td><span class="badge gray">${r(s.adminRole||"superadmin")}</span></td>
                  <td>
                    <strong>${r(s.proposalClient)}</strong>
                    <div class="muted small">${r(s.proposalRef)}</div>
                  </td>
                  <td><span class="badge blue">${r(s.action)}</span></td>
                  <td>
                    ${s.pinVerified?'<span class="badge green">🔐 PIN Verified</span>':'<span class="badge gray">Standard</span>'}
                  </td>
                  <td>
                    <code style="font-size:11px;background:var(--bg-elevated);padding:2px 5px;border-radius:4px;">${r((s.hash||"").slice(0,8))}</code>
                  </td>
                  <td class="muted small">${r(s.note||"—")}</td>
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
                ${this.pinStatus.lastUpdated?`Last updated: ${H(this.pinStatus.lastUpdated)} by ${r(this.pinStatus.updatedBy||"Admin")}`:"Using default startup PIN: 3600"}
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
            <input type="text" class="input" id="ps-set-name" value="${r(e.name)}">
          </div>
          <div>
            <label class="label">Legal Entity Name</label>
            <input type="text" class="input" id="ps-set-legal" value="${r(e.legal)}">
          </div>
          <div>
            <label class="label">Signatory Name</label>
            <input type="text" class="input" id="ps-set-signatory" value="${r(e.signatory)}">
          </div>
          <div>
            <label class="label">Signatory Designation</label>
            <input type="text" class="input" id="ps-set-signRole" value="${r(e.signRole)}">
          </div>
          <div>
            <label class="label">Official Email</label>
            <input type="email" class="input" id="ps-set-email" value="${r(e.email)}">
          </div>
          <div>
            <label class="label">GSTIN</label>
            <input type="text" class="input" id="ps-set-gstin" value="${r(e.gstin)}">
          </div>
          <div class="span2">
            <label class="label">Registered Address</label>
            <input type="text" class="input" id="ps-set-address" value="${r(e.address)}">
          </div>
        </div>
        <div style="margin-top:16px;text-align:right;">
          <button class="btn primary" id="ps-save-settings-btn">Save Company Profile</button>
        </div>
      </div>
    `;const s=t.querySelector("#ps-change-pin-toggle-btn"),a=t.querySelector("#ps-change-pin-panel"),i=t.querySelector("#ps-cancel-pin-btn");s&&(s.onclick=()=>{a.style.display=a.style.display==="none"?"block":"none"}),i&&(i.onclick=()=>{a.style.display="none"});const n=t.querySelector("#ps-update-pin-form");n&&(n.onsubmit=async d=>{d.preventDefault();const o=t.querySelector("#ps-cur-pin").value.trim(),m=t.querySelector("#ps-new-pin").value.trim(),u=t.querySelector("#ps-confirm-pin").value.trim(),v=t.querySelector("#ps-pin-update-err");if(m!==u){v.textContent="New PIN and Confirmation PIN do not match",v.style.display="block";return}try{await K("/proposals/pin/update",{currentPin:o,newPin:m}),alert("Admin PIN updated successfully!"),this.init()}catch(I){v.textContent=I.message||"Failed to update PIN",v.style.display="block"}});const c=t.querySelector("#ps-save-settings-btn");c&&(c.onclick=async()=>{e.name=t.querySelector("#ps-set-name").value,e.legal=t.querySelector("#ps-set-legal").value,e.signatory=t.querySelector("#ps-set-signatory").value,e.signRole=t.querySelector("#ps-set-signRole").value,e.email=t.querySelector("#ps-set-email").value,e.gstin=t.querySelector("#ps-set-gstin").value,e.address=t.querySelector("#ps-set-address").value,c.disabled=!0,c.textContent="Saving…";try{await J("/proposals/ratecard",{settings:e}),alert("Company profile saved successfully!")}catch(d){alert("Error: "+d.message)}finally{c.disabled=!1,c.textContent="Save Company Profile"}})}}function Ae(l,t={}){const e=new $e(l,t);return e.init(),e}export{Se as e,Ae as i,Z as p};
