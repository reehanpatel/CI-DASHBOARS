import"./api-fIERhmPm.js";import{e as R,p as S}from"./proposals-3JdNAc5G.js";const t=document.getElementById("proposal-client-root"),q=new URLSearchParams(window.location.search),u=q.get("p");u?$(u):t.innerHTML=`
    <div class="card" style="padding:48px;text-align:center;">
      <h3>Invalid Proposal Link</h3>
      <p class="muted">No proposal identifier provided. Please use the exact link sent to you by your CI360 contact.</p>
    </div>
  `;let i=null;async function $(n){try{const e=await fetch(`/api/proposals/shared/${encodeURIComponent(n)}`);if(!e.ok){const r=await e.json().catch(()=>({}));throw new Error(r.error||"Proposal not found or link has expired")}i=await e.json(),y()}catch(e){t.innerHTML=`
      <div class="card" style="padding:48px;text-align:center;">
        <h3>Unable to Open Proposal</h3>
        <p class="muted">${e.message}</p>
      </div>
    `}}function y(){const{proposal:n,company:e,version:r,clientResponse:o}=i,d=o&&o.decision;t.innerHTML=`
    <div class="client-split">
      <div class="paperwrap" id="client-paper-preview">
        <!-- Render paper inside -->
      </div>

      <div class="card respond-card">
        <h3 style="margin:0 0 4px 0;font-size:18px;font-weight:800;color:var(--text-1);">
          ${d?o.decision==="approved"?"🎉 Proposal Approved":"⚠️ Modification Requested":"Sign-off & Response"}
        </h3>
        <p class="muted small" style="margin:0 0 16px 0;">
          Review the scope, deliverables, and commercial terms, then approve online or request changes.
        </p>

        ${d?`
          <div style="padding:14px;border-radius:var(--r-md);background:${o.decision==="approved"?"var(--green-50, #ECFDF5)":"var(--amber-50, #FFFBEB)"};border:1px solid ${o.decision==="approved"?"rgba(16,185,129,0.3)":"rgba(245,158,11,0.3)"};margin-bottom:14px;">
            <strong style="color:${o.decision==="approved"?"var(--green-600)":"var(--amber-600)"}">
              ${o.decision==="approved"?"Proposal Officially Approved":"Revision Requested"}
            </strong>
            <div class="small muted" style="margin-top:2px;">
              Submitted by <strong>${o.name}</strong> (${o.role||"Client"}) on ${new Date(o.at).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}
            </div>
            ${o.comment?`<p style="margin:8px 0 0;font-size:13.5px;color:var(--text-2);">“${o.comment}”</p>`:""}
          </div>
          <button class="btn" id="client-download-pdf-btn" style="width:100%;margin-bottom:10px;">📄 Download PDF Copy</button>
          <button class="btn ghost small" id="client-change-btn" style="width:100%;">Update My Response</button>
        `:`
          <form id="client-response-form">
            <div style="display:flex;gap:8px;margin-bottom:14px;">
              <button type="button" class="btn primary" id="btn-decide-approve" style="flex:1;background:var(--green-600);border-color:var(--green-600);color:#fff;font-weight:700;">✓ Approve</button>
              <button type="button" class="btn" id="btn-decide-changes" style="flex:1;">Request Changes</button>
            </div>

            <div style="margin-bottom:12px;">
              <label class="label">Your Name *</label>
              <input type="text" class="input" id="client-res-name" value="${n.contact||""}" placeholder="Full Name" required>
            </div>
            <div style="margin-bottom:12px;">
              <label class="label">Designation / Role</label>
              <input type="text" class="input" id="client-res-role" value="${n.contactRole||""}" placeholder="e.g. Director / VP">
            </div>
            <div style="margin-bottom:14px;">
              <label class="label" id="client-comment-label">Comments / Remarks (Optional)</label>
              <textarea class="input" id="client-res-comment" rows="3" placeholder="Additional notes or specifications..."></textarea>
            </div>

            <div id="client-res-error" style="color:var(--red-500);font-size:13px;margin-bottom:12px;display:none;"></div>

            <button type="submit" class="btn gold" id="client-submit-btn" style="width:100%;font-weight:700;margin-bottom:10px;">
              Confirm & Submit Response
            </button>
            <button type="button" class="btn" id="client-download-pdf-btn" style="width:100%;">📄 Download PDF Copy</button>
          </form>
        `}
      </div>
    </div>
  `,D();const b=t.querySelector("#client-download-pdf-btn");b&&(b.onclick=()=>R(n,e,b));const v=t.querySelector("#client-change-btn");v&&(v.onclick=()=>{i.clientResponse=null,y()});const g=t.querySelector("#client-response-form");if(g){let p="approved";const s=t.querySelector("#btn-decide-approve"),l=t.querySelector("#btn-decide-changes"),f=t.querySelector("#client-comment-label");s.onclick=()=>{p="approved",s.style.background="var(--green-600)",s.style.color="#fff",l.style.background="var(--bg-surface)",l.style.color="var(--text-1)",f.textContent="Comments / Remarks (Optional)"},l.onclick=()=>{p="changes",l.style.background="var(--amber-500)",l.style.color="#fff",s.style.background="var(--bg-surface)",s.style.color="var(--text-1)",f.textContent="Please Describe the Required Changes *"},g.onsubmit=async w=>{w.preventDefault();const h=t.querySelector("#client-res-name").value.trim(),k=t.querySelector("#client-res-role").value.trim(),x=t.querySelector("#client-res-comment").value.trim(),a=t.querySelector("#client-res-error");if(!h){a.textContent="Please enter your name",a.style.display="block";return}if(p==="changes"&&!x){a.textContent="Please describe what needs to be changed in the remarks field",a.style.display="block";return}const m=t.querySelector("#client-submit-btn");m.disabled=!0,m.textContent="Submitting…";try{const c=await fetch(`/api/proposals/shared/${encodeURIComponent(u)}/respond`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({decision:p,name:h,role:k,comment:x,answers:{}})});if(!c.ok){const P=await c.json().catch(()=>({}));throw new Error(P.error||"Failed to submit response")}const C=await c.json();i.clientResponse=C.response,y()}catch(c){a.textContent=c.message,a.style.display="block",m.disabled=!1,m.textContent="Confirm & Submit Response"}}}}function D(){const n=t.querySelector("#client-paper-preview");if(n&&i){const{proposal:e,company:r}=i,o={cover:{brand:r.name||"CI360 Degrees",title:e.title||"Proposal",subtitle:e.subtitle,kicker:e.kicker||"Proposal for sign-off",meta:[["Prepared for",e.client],["Reference",e.ref],["Date",e.date],["Valid until",e.validity?`${e.validity} days`:"30 days"]]},blocks:[{t:"stamp",text:e.approval&&e.approval.decision==="approved"?`🔐 Internally Approved with Admin PIN on ${e.approval.at}`:"Official Proposal",type:"admin"},...(e.sections||[]).map(d=>({t:"h",n:1,text:d.title})),{t:"sig",left:{who:"For "+e.client,name:"",role:""},right:{who:"For "+r.name,name:r.signatory||"Pramit Ghosh",role:r.signRole||"Founder & CEO"}}],foot:r.website||"ci360degrees.com"};n.innerHTML=S(o)}}
