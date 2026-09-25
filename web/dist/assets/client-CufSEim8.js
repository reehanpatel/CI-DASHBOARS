import"./api-Ctf9aBrp.js";let b=null,g=[],p=[],c={tab:"logjob",period:"month"},l={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:""};const $=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","Quality Check"]];async function A(){if(initTheme(),b=requireAuth("client"),!!b){try{const[a,t]=await Promise.all([apiGet("/services"),apiGet("/personnel")]);g=a,p=t.filter(i=>i.status==="active")}catch{g=[],p=[]}u()}}const m=[{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"Work Delivered",icon:"📦"},{key:"team",label:"Our Team",icon:"👥"}];function u(){const a=document.getElementById("app"),t=m.find(i=>i.key===c.tab)||m[0];a.innerHTML=renderAppShell({user:b,currentRole:"client",activeTab:c.tab,tabs:m,title:t.label,subtitle:"Client Portal & Service Requests"}),bindAppShellEvents(i=>{c.tab=i,u()}),f()}async function f(){const a=document.getElementById("content");if(a){if(c.tab==="logjob"){y(a);return}a.innerHTML=renderSkeletonCards(3);try{const t=await apiGet("/dashboard/client?period="+c.period);c.tab==="jobs"?w(a,t):c.tab==="team"&&k(a,t)}catch(t){a.innerHTML=renderEmptyState("Something went wrong",t.message,"⚠️")}}}function y(a){a.innerHTML=`
    <div class="block">
      <h2>Log a New Job <span class="eyebrow">Request or record work for your account</span></h2>
      <div class="card form-card">
        <form id="clientLogJobForm" novalidate>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">1</span>
              Job Details
            </div>
            <div class="field">
              <label for="clientJobTitle">Job Title *</label>
              <input type="text" id="clientJobTitle" value="${escapeHtml(l.title||"")}" placeholder="e.g. Brand Redesign &amp; Social Campaign" required>
            </div>
            <div class="field">
              <label for="clientJobService">Select Service *</label>
              <select id="clientJobService" required>
                <option value="">Select a service…</option>
                ${g.map(t=>`<option value="${t._id}" ${l.serviceId===t._id?"selected":""}>${escapeHtml(t.name)}</option>`).join("")}
              </select>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">2</span>
              Priority & Preferences
            </div>
            <div class="log-job-row">
              <div class="field">
                <label for="clientJobPriority">Priority Level *</label>
                <select id="clientJobPriority">
                  <option value="Medium" ${l.priority==="Medium"?"selected":""}>🟡 Medium Priority</option>
                  <option value="High"   ${l.priority==="High"?"selected":""}>🟠 High Priority</option>
                  <option value="Urgent" ${l.priority==="Urgent"?"selected":""}>🔴 Urgent</option>
                </select>
              </div>
              <div class="field">
                <label for="clientJobPrefPerson">Preferred Team Member</label>
                <select id="clientJobPrefPerson">
                  <option value="">No Preference (Auto-Assign)</option>
                  ${p.map(t=>`<option value="${t._id}" ${l.preferredPersonId===t._id?"selected":""}>👤 ${escapeHtml(t.name)}${t.duties?` (${escapeHtml(t.duties)})`:""}</option>`).join("")}
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">3</span>
              Timeline
            </div>
            <div class="log-job-row">
              <div class="field">
                <label for="clientJobDate">Start Date *</label>
                <input type="date" id="clientJobDate" value="${l.date}" required>
              </div>
              <div class="field">
                <label for="clientJobCompDate">Expected End Date</label>
                <input type="date" id="clientJobCompDate" value="${l.completionDate}">
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">4</span>
              Description
            </div>
            <div class="field">
              <label for="clientJobDesc">Deliverable Details</label>
              <textarea id="clientJobDesc" rows="3" placeholder="Describe the project scope, deliverables, or specific requirements…">${escapeHtml(l.desc)}</textarea>
            </div>
          </div>

          <div class="form-section" style="border-bottom:none;padding-bottom:0">
            <div class="form-section-title">
              <span class="form-section-num">5</span>
              Briefs &amp; File Attachments
            </div>
            ${renderAttachmentUploader({id:"clientJobAttachments",label:"Briefs & Reference Files",subtitle:"Upload briefs, design mockups, brand assets, spreadsheets or guideline documents"})}
          </div>

          <div class="form-actions">
            <button class="btn ghost" type="reset" id="resetClientJobBtn">Clear Form</button>
            <button class="btn gold" type="submit" id="submitClientJobBtn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Submit Job
            </button>
          </div>
        </form>
      </div>
    </div>`,bindAttachmentUploader("clientJobAttachments",{existing:l.attachments||[]}),document.getElementById("resetClientJobBtn").onclick=()=>{l={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},setUploaderAttachments("clientJobAttachments",[]),y(a)},document.getElementById("clientLogJobForm").onsubmit=async t=>{t.preventDefault();const i=document.getElementById("submitClientJobBtn"),o=document.getElementById("clientJobTitle").value.trim(),e=document.getElementById("clientJobService").value;if(!e){flashToast("Please select a service",!0);return}const s=document.getElementById("clientJobDate").value,r=document.getElementById("clientJobCompDate").value,n=document.getElementById("clientJobDesc").value.trim(),d=document.getElementById("clientJobPriority").value,v=document.getElementById("clientJobPrefPerson").value,x=getUploaderAttachments("clientJobAttachments");i.disabled=!0,i.textContent="Submitting…";try{await apiPost("/jobs",{title:o,serviceIds:[e],date:s,completionDate:r,value:0,description:n,priority:d,preferredPersonId:v||null,assignments:[],attachments:x}),flashToast("Job logged successfully with attachments! 🎉"),l={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},c.tab="jobs",u()}catch(h){flashToast(h.message,!0)}finally{i.disabled=!1,i.textContent="Submit Job"}}}function w(a,t){const i=t.jobs||[],o={Medium:"gray",High:"amber",Urgent:"red"};if(i.length===0){a.innerHTML=`
      <div class="block">
        <h2>Work Delivered <span class="eyebrow">No work logged yet</span></h2>
        ${renderEmptyState("Nothing logged for your account yet","Log a new job to start tracking work delivered.","📦",`<button class="btn gold" onclick="ui.tab='logjob';render()">Log Your First Job</button>`)}
      </div>`;return}a.innerHTML=`
    <div class="block">
      <h2>Work Delivered <span class="eyebrow">${i.length} entries, all time</span></h2>
      <div style="display:flex;flex-direction:column;gap:14px">
        ${i.map(e=>{var n;const s=e.status==="Completed",r=o[e.priority||"Medium"]||"gray";return`
          <div class="card" style="border-left:4px solid ${s?"var(--green-500)":"var(--amber-500)"};padding:18px 22px">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px">
              <div>
                <div style="font-size:15px;font-weight:800;color:var(--text-1);margin-bottom:6px">${escapeHtml(e.title||"Untitled Job")}</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  <span class="badge ${s?"green":"amber"}">${s?"✓ Completed":"⏳ In Progress"}</span>
                  <span class="badge ${r}">${escapeHtml(e.priority||"Medium")}</span>
                  ${(e.serviceNames||[]).map(d=>`<span class="badge gray">${escapeHtml(d)}</span>`).join("")}
                </div>
              </div>
              <div style="text-align:right;flex-shrink:0">
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.7px;color:var(--text-4)">Start</div>
                <div style="font-size:13px;font-weight:700;color:var(--text-1)">${fmtDate(e.date)}</div>
              </div>
            </div>
            ${e.description?`<div style="font-size:12.5px;color:var(--text-3);line-height:1.5;padding-top:10px;border-top:1px solid var(--border-xs)">${escapeHtml(e.description)}</div>`:""}
            ${e.preferredPersonName?`<div style="margin-top:8px;font-size:12px;color:var(--text-4)">Assigned to: <strong style="color:var(--text-2)">${escapeHtml(e.preferredPersonName)}</strong></div>`:""}
            ${e.completionDate?`<div style="margin-top:6px;font-size:12px;color:var(--s-green-text)">✓ Completed: ${fmtDate(e.completionDate)}</div>`:""}

            <!-- Brief Attachments & Completed Deliverables -->
            ${e.attachments&&e.attachments.length?`
              <div data-attachments="${encodeURIComponent(JSON.stringify(e.attachments))}">
                ${renderAttachmentChips(e.attachments,{title:"Initial Briefs & Assets"})}
              </div>
            `:""}

            ${e.deliverables&&e.deliverables.length?`
              <div data-attachments="${encodeURIComponent(JSON.stringify(e.deliverables))}">
                ${renderAttachmentChips(e.deliverables,{title:"Finished Deliverables & Artifacts"})}
              </div>
            `:""}

            <!-- Client Deliverable Approval / Revision Status Box -->
            ${e.deliverables&&e.deliverables.length?`
              ${e.clientApproval&&e.clientApproval.status==="Approved"?`
                <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);padding:10px 14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <span style="font-size:16px">✅</span>
                    <div>
                      <div style="font-size:13px;font-weight:700;color:var(--green-500)">Approved &amp; Signed Off</div>
                      <div style="font-size:11.5px;color:var(--text-3)">Approved by ${escapeHtml(e.clientApproval.approvedBy||"Client")} on ${fmtDate(e.clientApproval.approvedAt||e.completionDate)}</div>
                    </div>
                  </div>
                  ${e.clientApproval.rating?`<span class="badge gold" style="font-size:12px">${"★".repeat(e.clientApproval.rating)} ${e.clientApproval.rating}/5</span>`:""}
                </div>
              `:e.clientApproval&&e.clientApproval.status==="Revision Requested"?`
                <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:var(--r-sm);padding:10px 14px;margin-top:12px">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
                    <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--amber-500)">
                      <span>↺</span> Revision Requested
                    </div>
                    <span style="font-size:11px;color:var(--text-4)">${fmtDate(((n=(e.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:n.requestedAt)||e.updatedAt)}</span>
                  </div>
                  <div style="font-size:12.5px;color:var(--text-2);background:var(--bg-surface);border-radius:var(--r-xs);padding:8px 10px;margin-top:6px;line-height:1.4">
                    "${escapeHtml(e.clientApproval.feedback||"Revision requested")}"
                  </div>
                </div>
              `:`
                <div style="background:linear-gradient(135deg,rgba(99,102,241,0.08) 0%,rgba(139,92,246,0.04) 100%);border:1px solid rgba(99,102,241,0.25);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
                  <div>
                    <div style="font-size:13px;font-weight:700;color:var(--brand-500)">Deliverables Ready for Review</div>
                    <div style="font-size:11.5px;color:var(--text-3)">Please inspect the attached files above and approve or request revision.</div>
                  </div>
                  <div style="display:flex;gap:8px">
                    <button type="button" class="btn ghost small client-rev-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" style="border-color:rgba(245,158,11,0.4);color:var(--amber-500)">
                      ↺ Request Revision
                    </button>
                    <button type="button" class="btn gold small client-app-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}">
                      ✓ Approve &amp; Sign Off
                    </button>
                  </div>
                </div>
              `}
            `:""}

            ${renderSupportTicketSection(e._id,!1)}
          </div>`}).join("")}
      </div>
    </div>`,document.querySelectorAll(".client-app-btn").forEach(e=>{e.onclick=()=>S(e.dataset.id,e.dataset.title,()=>f())}),document.querySelectorAll(".client-rev-btn").forEach(e=>{e.onclick=()=>C(e.dataset.id,e.dataset.title,()=>f())}),i.forEach(e=>bindSupportTicketSection(e._id,!1))}function S(a,t,i){let o=5;const e=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Approve Deliverables &amp; Sign Off</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(t)}</div>
    </div>

    <div style="margin-bottom:16px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);padding:12px 14px">
      <div style="font-size:13px;font-weight:600;color:var(--green-500);margin-bottom:4px">✓ Confirming Completion</div>
      <div style="font-size:12px;color:var(--text-3);line-height:1.4">By approving, this job will be verified as completed and signed off.</div>
    </div>

    <div class="field" style="margin-bottom:16px">
      <label>Rate Work Quality (Optional)</label>
      <div id="starRatingWrap" style="display:flex;gap:8px;font-size:24px;cursor:pointer;margin-top:4px">
        <span class="star-item" data-val="1" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="2" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="3" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="4" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="5" style="color:#F59E0B">★</span>
      </div>
    </div>

    <div class="field" style="margin-bottom:16px">
      <label for="mAppFeedback">Feedback / Review Note (Optional)</label>
      <textarea id="mAppFeedback" rows="3" placeholder="Add comments, praise or notes for the team…"></textarea>
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mAppCancel">Cancel</button>
      <button class="btn gold" id="mAppConfirm">✓ Confirm Approval</button>
    </div>
  `),s=e.querySelectorAll(".star-item");function r(n){o=n,s.forEach(d=>{d.style.color=Number(d.dataset.val)<=n?"#F59E0B":"var(--text-4)"})}s.forEach(n=>{n.onclick=()=>r(Number(n.dataset.val))}),e.querySelector("#mAppCancel").onclick=()=>e.remove(),e.querySelector("#mAppConfirm").onclick=async()=>{const n=e.querySelector("#mAppFeedback").value.trim(),d=e.querySelector("#mAppConfirm");d.disabled=!0,d.textContent="Approving…";try{await apiPost(`/jobs/${a}/approve`,{rating:o,feedback:n}),flashToast("Deliverables approved & signed off! 🎉"),e.remove(),i&&i()}catch(v){flashToast(v.message,!0)}finally{d.disabled=!1,d.textContent="✓ Confirm Approval"}}}function C(a,t,i){const o=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Request Deliverable Revision</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(t)}</div>
    </div>

    <div class="field" style="margin-bottom:16px">
      <label for="mRevNotes">Revision Details &amp; Change Requests *</label>
      <textarea id="mRevNotes" rows="4" placeholder="Describe the changes, edits, or improvements required…"></textarea>
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mRevAttachments",label:"Reference Markups / Screenshots (Optional)",subtitle:"Attach annotated screenshots, briefs or reference files"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mRevCancel">Cancel</button>
      <button class="btn gold" id="mRevConfirm" style="background:linear-gradient(135deg,var(--amber-500) 0%,#D97706 100%)">↺ Send Revision Request</button>
    </div>
  `);bindAttachmentUploader("mRevAttachments"),o.querySelector("#mRevCancel").onclick=()=>o.remove(),o.querySelector("#mRevConfirm").onclick=async()=>{const e=o.querySelector("#mRevNotes").value.trim();if(!e){flashToast("Please enter revision details",!0);return}const s=getUploaderAttachments("mRevAttachments"),r=o.querySelector("#mRevConfirm");r.disabled=!0,r.textContent="Sending…";try{await apiPost(`/jobs/${a}/revision`,{feedback:e,attachments:s}),flashToast("Revision request sent to the team! ↺"),o.remove(),i&&i()}catch(n){flashToast(n.message,!0)}finally{r.disabled=!1,r.textContent="↺ Send Revision Request"}}}function k(a,t){const i=t.roster||[],o=p&&p.length?p:[];a.innerHTML=`
    <div class="block">
      <h2>Our Team <span class="eyebrow">${o.length} members</span></h2>

      ${i.length>0?`
        <div style="margin-bottom:24px">
          <h3 style="font-size:14px;font-weight:700;color:var(--text-2);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.8px">Account Lead Assignments</h3>
          ${i.map(e=>`
            <div class="card" style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span style="font-size:13px;font-weight:700;color:var(--text-1)">Roster</span>
                <span class="badge ${e.nature==="Existing"?"green":"blue"}">${e.nature}</span>
              </div>
              <div class="grid grid-2">
                ${$.filter(([s])=>(e.roles[s]||"").trim()&&e.roles[s]!=="TBD").map(([s,r])=>`
                  <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-xs)">
                    <span style="font-size:12.5px;color:var(--text-3)">${r}</span>
                    <strong style="font-size:12.5px;color:var(--text-1)">${escapeHtml(e.roles[s])}</strong>
                  </div>`).join("")||'<div style="color:var(--text-4);font-size:13px">Not yet assigned.</div>'}
              </div>
            </div>`).join("")}
        </div>`:""}

      <div class="grid grid-2">
        ${o.map(e=>`
          <div class="card" style="border-left:4px solid var(--gold-500);display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--brand-500),var(--gold-500));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">${e.name?e.name.charAt(0).toUpperCase():"?"}</div>
                <div>
                  <div style="font-size:14px;font-weight:800;color:var(--text-1)">${escapeHtml(e.name)}</div>
                  <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">${escapeHtml(e.duties||"Team Member")}</div>
                </div>
              </div>
              <span class="badge ${e.status==="active"?"green":"gray"}">${escapeHtml(e.status)}</span>
            </div>
          </div>`).join("")}
      </div>
    </div>`}A();
