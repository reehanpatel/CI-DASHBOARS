import"./api-BBnuTHQX.js";import{exportPdfDoc as R,exportWordDocx as S,docModel as F,paperHTML as L}from"./proposals-B0_4YWRc.js";const e=document.getElementById("proposal-client-root"),C=new URLSearchParams(window.location.search),u=C.get("p");u?B(u):e.innerHTML=`
    <div class="card" style="padding:48px;text-align:center;">
      <h3>Invalid Proposal Link</h3>
      <p class="muted">No proposal identifier provided. Please use the exact link sent to you by your CI360 contact.</p>
    </div>
  `;let r=null;async function B(n){try{const o=await fetch(`/api/proposals/shared/${encodeURIComponent(n)}`);if(!o.ok){const p=await o.json().catch(()=>({}));throw new Error(p.error||"Proposal not found or link has expired")}r=await o.json(),v()}catch(o){e.innerHTML=`
      <div class="card" style="padding:48px;text-align:center;">
        <h3>Unable to Open Proposal</h3>
        <p class="muted">${o.message}</p>
      </div>
    `}}function v(){const{proposal:n,company:o,version:p,clientResponse:t}=r,y=t&&t.decision;e.innerHTML=`
    <div class="client-split">
      <div class="paperwrap" id="client-paper-preview" data-theme="light">
        <!-- Render paper inside -->
      </div>

      <div class="card respond-card">
        <h3 style="margin:0 0 4px 0;font-size:18px;font-weight:800;color:var(--text-1);">
          ${y?t.decision==="approved"?"🎉 Proposal Approved":"⚠️ Modification Requested":"Sign-off & Response"}
        </h3>
        <p class="muted small" style="margin:0 0 16px 0;">
          Review the scope, deliverables, and commercial terms, then approve online or request changes.
        </p>

        <!-- Direct Document Downloads -->
        <div style="margin-bottom:16px;padding:12px;background:var(--bg-elevated);border-radius:var(--r-md);border:1px solid var(--border-sm);">
          <div style="font-weight:700;font-size:12.5px;color:var(--text-1);margin-bottom:8px;">💾 Download Document Files</div>
          <div style="display:flex;gap:6px;flex-direction:column;">
            <button class="btn small" id="client-download-pdf-btn" style="width:100%;font-weight:700;">📄 Download PDF Document</button>
            <button class="btn small" id="client-download-word-btn" style="width:100%;">📝 Download Word (.docx)</button>
          </div>
        </div>

        ${y?`
          <div style="padding:14px;border-radius:var(--r-md);background:${t.decision==="approved"?"var(--green-50, #ECFDF5)":"var(--amber-50, #FFFBEB)"};border:1px solid ${t.decision==="approved"?"rgba(16,185,129,0.3)":"rgba(245,158,11,0.3)"};margin-bottom:14px;">
            <strong style="color:${t.decision==="approved"?"var(--green-600)":"var(--amber-600)"}">
              ${t.decision==="approved"?"Proposal Officially Approved":"Revision Requested"}
            </strong>
            <div class="small muted" style="margin-top:2px;">
              Submitted by <strong>${t.name}</strong> (${t.role||"Client"}) on ${new Date(t.at).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}
            </div>
            ${t.comment?`<p style="margin:8px 0 0;font-size:13.5px;color:var(--text-2);">“${t.comment}”</p>`:""}
          </div>
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
          </form>
        `}
      </div>
    </div>
  `,M();const s=e.querySelector("#client-download-pdf-btn");s&&(s.onclick=()=>R(n,o,s));const i=e.querySelector("#client-download-word-btn");i&&(i.onclick=()=>S(n,o,i));const g=C.get("dl");g==="pdf"&&s?R(n,o,s):g==="word"&&i&&S(n,o,i);const f=e.querySelector("#client-change-btn");f&&(f.onclick=()=>{r.clientResponse=null,v()});const h=e.querySelector("#client-response-form");if(h){let m="approved";const l=e.querySelector("#btn-decide-approve"),c=e.querySelector("#btn-decide-changes"),x=e.querySelector("#client-comment-label");l.onclick=()=>{m="approved",l.style.background="var(--green-600)",l.style.color="#fff",c.style.background="var(--bg-surface)",c.style.color="var(--text-1)",x.textContent="Comments / Remarks (Optional)"},c.onclick=()=>{m="changes",c.style.background="var(--amber-500)",c.style.color="#fff",l.style.background="var(--bg-surface)",l.style.color="var(--text-1)",x.textContent="Please Describe the Required Changes *"},h.onsubmit=async D=>{D.preventDefault();const w=e.querySelector("#client-res-name").value.trim(),q=e.querySelector("#client-res-role").value.trim(),k=e.querySelector("#client-res-comment").value.trim(),a=e.querySelector("#client-res-error");if(!w){a.textContent="Please enter your name",a.style.display="block";return}if(m==="changes"&&!k){a.textContent="Please describe what needs to be changed in the remarks field",a.style.display="block";return}const b=e.querySelector("#client-submit-btn");b.disabled=!0,b.textContent="Submitting…";try{const d=await fetch(`/api/proposals/shared/${encodeURIComponent(u)}/respond`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({decision:m,name:w,role:q,comment:k,answers:{}})});if(!d.ok){const $=await d.json().catch(()=>({}));throw new Error($.error||"Failed to submit response")}const P=await d.json();r.clientResponse=P.response,v()}catch(d){a.textContent=d.message,a.style.display="block",b.disabled=!1,b.textContent="Confirm & Submit Response"}}}}function M(){const n=e.querySelector("#client-paper-preview");if(n&&r){const{proposal:o,company:p}=r,t=F(o,p,{approval:r.clientResponse});n.innerHTML=L(t)}}
