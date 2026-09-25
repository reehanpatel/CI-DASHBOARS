import"./api-BzPrPlDy.js";let r=null,z={personnel:[],clients:[],services:[]},$={tab:"myjobs",period:"month",ticketsFilter:"all"};async function L(){if(initTheme(),r=requireAuth("employee"),!r)return;const[a,s,i]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);z.personnel=a,z.clients=s,z.services=i,R()}function J(a){const s=z.clients.find(i=>i._id===a);return s?s.name:"—"}function P(){return r&&(/mansi/i.test(r.name)||/urna/i.test(r.name))}const B=[{key:"myjobs",label:"My Jobs",icon:"📋"},{key:"dailytasks",label:"Daily Tasks",icon:"✅"},{key:"tickets",label:"Support Tickets",icon:"🎫"},{key:"targets",label:"My Targets",icon:"🎯"}];function R(){const a=document.getElementById("app"),s=B.find(i=>i.key===$.tab)||B[0];a.innerHTML=renderAppShell({user:r,currentRole:"employee",activeTab:$.tab,tabs:B,title:s.label,subtitle:P()?"Lead Workspace · Mansi & Urna Management":"Employee Workspace & Daily Task Checklist"}),bindAppShellEvents(i=>{$.tab=i,R()}),v()}window.ci360NavTab=a=>{$.tab=a,R()};async function v(){const a=document.getElementById("content");if(a){a.innerHTML=renderSkeletonCards(3);try{$.tab==="myjobs"?await W(a):$.tab==="dailytasks"||$.tab==="mytasks"?await O(a):$.tab==="tickets"?await M(a):$.tab==="targets"&&await V(a)}catch(s){a.innerHTML=renderEmptyState("Something went wrong",s.message,"⚠️")}}}function F(){return renderPeriodPicker($.period)}function j(){document.querySelectorAll("[data-period]").forEach(a=>{a.onclick=()=>{$.period=a.dataset.period,v()}})}async function W(a){const s=await apiGet("/jobs?mine=true"),i={Medium:"gray",High:"amber",Urgent:"red"};if(s.length===0){a.innerHTML=`
      <div class="block">
        <h2>My Jobs <span class="eyebrow">No assigned jobs yet</span></h2>
        ${renderEmptyState("No jobs assigned yet","Jobs assigned to you by admins will appear here.","📋")}
      </div>`;return}a.innerHTML=`
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
        <h2 style="margin:0">My Jobs <span class="eyebrow">${s.length} total</span></h2>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:12px;color:var(--text-3)">Click the date or 💾 to save completion date</span>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px">
        ${s.map(e=>{var m,w,x;const o=(e.assignments||[]).find(h=>String(h.personId)===String(r.personnelId._id||r.personnelId)),c=String(e.createdBy)===String(r._id),n=e.status==="Completed",b=e.clientApproval&&e.clientApproval.status==="Approved",y=e.clientApproval&&e.clientApproval.status==="Revision Requested",u=e.completionDate?new Date(e.completionDate).toISOString().slice(0,10):"",p=i[e.priority||"Medium"]||"gray";return`
          <div class="job-card" style="background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:20px 22px;box-shadow:var(--shadow-xs);transition:all var(--t-fast);border-left:4px solid ${b?"var(--green-500)":y?"var(--red-500)":n?"var(--green-500)":"var(--brand-500)"}">
            <!-- Header row -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap">
              <div style="min-width:0">
                <h3 style="font-size:15px;font-weight:800;color:var(--text-1);margin:0 0 6px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(e.title||"Untitled Job")}</h3>
                <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">
                  <span class="badge ${n?"green":"amber"}">${n?"✓ Completed":"⏳ In Progress"}</span>
                  ${b?`<span class="badge green">✓ Client Approved ${e.clientApproval.rating?`(${e.clientApproval.rating}★)`:""}</span>`:""}
                  ${y?'<span class="badge red">↺ Revision Requested</span>':""}
                  <span class="badge ${p}">${escapeHtml(e.priority||"Medium")}</span>
                  ${(e.serviceNames||[]).map(h=>`<span class="badge gray">${escapeHtml(h)}</span>`).join("")}
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0;align-items:center">
                <!-- Toggle Status -->
                <button type="button" class="btn ${n?"secondary":"primary"} small"
                        onclick="toggleStatus('${e._id}', ${!n})"
                        style="font-size:12px">
                  ${n?"↩ Reopen":"✓ Mark Done"}
                </button>
                ${c?`<button type="button" class="btn danger small" onclick="delJob('${e._id}')">Delete</button>`:""}
              </div>
            </div>

            <!-- Revision Requested Alert Box for Employee -->
            ${y?`
              <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-bottom:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
                  <strong style="color:var(--red-500);font-size:13px;display:flex;align-items:center;gap:6px">
                    <span>⚠️</span> Client Requested Changes / Revision
                  </strong>
                  <span style="font-size:11px;color:var(--text-4)">${fmtDate(((m=(e.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:m.requestedAt)||e.updatedAt)}</span>
                </div>
                <div style="font-size:12.5px;color:var(--text-1);background:var(--bg-surface);padding:8px 10px;border-radius:var(--r-xs);margin-top:6px;line-height:1.4">
                  "${escapeHtml(e.clientApproval.feedback||"Revision requested")}"
                </div>
                ${(x=(w=(e.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:w.attachments)!=null&&x.length?`
                  <div style="margin-top:8px">
                    ${renderAttachmentChips(e.clientApproval.revisions.slice(-1)[0].attachments,{title:"Client Reference Markups"})}
                  </div>
                `:""}
              </div>
            `:""}

            <!-- Details grid -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:14px">
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Client</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${escapeHtml(J(e.clientId))}</div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Start Date</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${fmtDate(e.date)}</div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Target End Date (Admin / Client)</div>
                <div style="font-size:13px;font-weight:700;color:${e.completionDate?"var(--brand-600)":"var(--text-4)"}">
                  ${e.completionDate?`📅 ${fmtDate(e.completionDate)}`:"— Not Specified —"}
                </div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Your Logged Hours</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${o?fmtHours(o.hours):"0 hrs"}</div>
              </div>
              ${e.description?`
              <div style="grid-column:1 / -1">
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Description</div>
                <div style="font-size:12.5px;color:var(--text-2);line-height:1.5">${escapeHtml(e.description)}</div>
              </div>`:""}
            </div>

            <!-- Brief Attachments & Deliverables Section -->
            ${e.attachments&&e.attachments.length?`
              <div data-attachments="${encodeURIComponent(JSON.stringify(e.attachments))}">
                ${renderAttachmentChips(e.attachments,{title:"Job Brief & Reference Files"})}
              </div>
            `:""}

            ${e.deliverables&&e.deliverables.length?`
              <div data-attachments="${encodeURIComponent(JSON.stringify(e.deliverables))}">
                ${renderAttachmentChips(e.deliverables,{title:"Finished Deliverables & Completed Artifacts"})}
              </div>
            `:""}

            <!-- Deliverable Uploader for Employee -->
            <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <span style="font-size:12.5px;font-weight:700;color:var(--text-1)">📦 Submit Finished Deliverable / Work Artifact</span>
                <button type="button" class="btn ghost small emp-del-toggle" data-id="${e._id}" style="padding:2px 8px;font-size:11px">+ Add Deliverables</button>
              </div>
              <div class="emp-del-form" id="empDelForm-${e._id}" style="display:none;margin-top:10px">
                <div class="field" style="margin-bottom:8px">
                  <label style="font-size:11.5px">Deliverable Notes / Details</label>
                  <input type="text" id="empDelNotes-${e._id}" placeholder="e.g. Final Video Render v2, PSD Source files, Figma export link..." style="font-size:12.5px;padding:6px 10px" />
                </div>
                ${renderAttachmentUploader({id:"empDelUp-"+e._id,label:"Completed Files",subtitle:"Upload exported videos, PSDs, PDFs, spreadsheets, images or zip packages"})}
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-top:10px">
                  <label style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--text-2);cursor:pointer;font-weight:600">
                    <input type="checkbox" id="empDelMarkComplete-${e._id}" ${n?"":"checked"} style="cursor:pointer;width:14px;height:14px;accent-color:var(--brand-600)">
                    <span>Mark Job as Completed upon submitting</span>
                  </label>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="btn ghost small emp-del-cancel" data-id="${e._id}">Cancel</button>
                    <button type="button" class="btn gold small emp-del-submit" data-id="${e._id}">Submit Deliverables</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Employee Delivery Date Setter -->
            <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:12px 14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:10px">
              <div style="display:flex;align-items:center;gap:6px">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span style="font-size:12px;font-weight:700;color:var(--text-2)">Set Delivery Date:</span>
              </div>
              <input
                type="date"
                class="emp-completion-date"
                data-id="${e._id}"
                value="${u}"
                style="border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:6px 10px;font-size:13px;background:var(--bg-surface);color:var(--text-1);cursor:pointer;outline:none;max-width:180px"
              >
              <button type="button" class="btn gold small" onclick="saveCompDate('${e._id}')" title="Save your delivery date">
                💾 Save Date
              </button>
              ${u?`<span class="badge green" style="margin-left:auto">Committed Delivery: ${u}</span>`:'<span class="badge gray" style="margin-left:auto">No Date Set</span>'}
            </div>

            ${renderSupportTicketSection(e._id,P())}
          </div>`}).join("")}
      </div>
    </div>`,document.querySelectorAll(".emp-completion-date").forEach(e=>{e.addEventListener("focus",()=>{e.style.borderColor="var(--border-focus)",e.style.boxShadow="0 0 0 3px var(--accent-ring)"}),e.addEventListener("blur",()=>{e.style.borderColor="",e.style.boxShadow=""})}),s.forEach(e=>{bindAttachmentUploader("empDelUp-"+e._id)}),document.querySelectorAll(".emp-del-toggle").forEach(e=>{e.onclick=()=>{const o=document.getElementById("empDelForm-"+e.dataset.id);if(o){const c=o.style.display==="none";o.style.display=c?"block":"none",e.textContent=c?"✕ Close":"+ Add Deliverables"}}}),document.querySelectorAll(".emp-del-cancel").forEach(e=>{e.onclick=()=>{const o=document.getElementById("empDelForm-"+e.dataset.id);o&&(o.style.display="none");const c=document.querySelector(`.emp-del-toggle[data-id="${e.dataset.id}"]`);c&&(c.textContent="+ Add Deliverables")}}),document.querySelectorAll(".emp-del-submit").forEach(e=>{e.onclick=async()=>{var y,u;const o=e.dataset.id,c=getUploaderAttachments("empDelUp-"+o),n=((y=(document.getElementById("empDelNotes-"+o)||{}).value)==null?void 0:y.trim())||"",b=((u=document.getElementById("empDelMarkComplete-"+o))==null?void 0:u.checked)||!1;if(!c.length){flashToast("Please upload or attach at least one file",!0);return}e.disabled=!0,e.textContent="Submitting…";try{const p=c.map(m=>({...m,notes:n}));await apiPost(`/jobs/${o}/deliverables`,{deliverables:p,markComplete:b}),flashToast(b?"Deliverables submitted & job marked as Completed! 📦🎉":"Deliverables submitted successfully! 📦"),v()}catch(p){flashToast(p.message,!0)}finally{e.disabled=!1,e.textContent="Submit Deliverables"}}}),s.forEach(e=>bindSupportTicketSection(e._id,P()))}let g={date:new Date().toISOString().slice(0,10),filter:"all",search:""};async function N(){try{const a=await apiGet("/tasks");if(Array.isArray(a))return localStorage.setItem("ci360_tasks_"+((r==null?void 0:r._id)||"user"),JSON.stringify(a)),a}catch(a){console.warn("Backend /api/tasks offline, using local fallback:",a)}try{const a=localStorage.getItem("ci360_tasks_"+((r==null?void 0:r._id)||"user"));return a?JSON.parse(a):[]}catch{return[]}}async function U(a,s=null){let i=null;try{s?i=await apiPut("/tasks/"+s,a):i=await apiPost("/tasks",a)}catch(o){console.warn("API task save failed, writing local backup:",o)}let e=[];try{const o=localStorage.getItem("ci360_tasks_"+((r==null?void 0:r._id)||"user"));e=o?JSON.parse(o):[]}catch{}if(s){const o=e.findIndex(c=>c._id===s);o>=0&&(e[o]=i||{...e[o],...a,updatedAt:new Date})}else i||(i={_id:"loc_"+Date.now(),...a,createdAt:new Date,completedAt:a.status==="Completed"?new Date:null}),e.unshift(i);return localStorage.setItem("ci360_tasks_"+((r==null?void 0:r._id)||"user"),JSON.stringify(e)),i}async function G(a){try{await apiDelete("/tasks/"+a)}catch(s){console.warn("API task delete failed, updating storage:",s)}try{const s=localStorage.getItem("ci360_tasks_"+((r==null?void 0:r._id)||"user"));let i=s?JSON.parse(s):[];i=i.filter(e=>e._id!==a),localStorage.setItem("ci360_tasks_"+((r==null?void 0:r._id)||"user"),JSON.stringify(i))}catch{}}async function Q(a){try{return await apiPatch("/tasks/"+a+"/toggle",{})}catch(s){console.warn("API toggle failed, toggling locally:",s)}try{const s=localStorage.getItem("ci360_tasks_"+((r==null?void 0:r._id)||"user"));let i=s?JSON.parse(s):[];const e=i.find(o=>o._id===a);if(e){const o=e.status!=="Completed";return e.status=o?"Completed":"Todo",e.completedAt=o?new Date:null,localStorage.setItem("ci360_tasks_"+((r==null?void 0:r._id)||"user"),JSON.stringify(i)),e}}catch{}return null}function H(a,s){let i;if(!a||a==="all")i=new Date;else{const n=a.split("-");n.length===3?i=new Date(Number(n[0]),Number(n[1])-1,Number(n[2])):i=new Date}i.setDate(i.getDate()+s);const e=i.getFullYear(),o=String(i.getMonth()+1).padStart(2,"0"),c=String(i.getDate()).padStart(2,"0");return`${e}-${o}-${c}`}function Y(a){if(!a||a==="all")return"All Days Checklist";const s=a.split("-"),i=s.length===3?new Date(Number(s[0]),Number(s[1])-1,Number(s[2])):new Date,e=new Date;e.setHours(0,0,0,0);const o=new Date(i);o.setHours(0,0,0,0);const c=Math.round((o-e)/(1e3*60*60*24)),n=i.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric",year:"numeric"});return c===0?`Today · ${n}`:c===-1?`Yesterday · ${n}`:c===1?`Tomorrow · ${n}`:n}async function O(a){const s=await N(),i=new Date,e=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`,o=g.date;let c=s;o!=="all"&&(c=s.filter(d=>d.dueDate?new Date(d.dueDate).toISOString().slice(0,10)===o:o===e));const n=c.length,b=c.filter(d=>d.status==="Completed").length,y=n-b,u=n>0?Math.round(b/n*100):0,p=n>0&&b===n;let m=c;if(g.filter==="active"?m=m.filter(d=>d.status!=="Completed"):g.filter==="completed"&&(m=m.filter(d=>d.status==="Completed")),g.search){const d=g.search.toLowerCase();m=m.filter(k=>(k.title||"").toLowerCase().includes(d))}const w=o===e;a.innerHTML=`
    <div class="block" style="max-width:880px;margin:0 auto">
      <!-- Section Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="margin:0 0 4px;display:flex;align-items:center;gap:8px">
            <span>Daily Tasks</span>
            <span class="eyebrow">${n} ${n===1?"task":"tasks"}</span>
          </h2>
          <div style="font-size:12.5px;color:var(--text-3)">Your simple daily checklist to check off what gets done today.</div>
        </div>

        <!-- Date Navigation Bar -->
        <div class="daily-date-nav-bar">
          <button type="button" class="daily-nav-arrow" id="dailyPrevDayBtn" title="Previous Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button type="button" class="btn ${w?"primary":"ghost"} small" id="dailyTodayBtn" style="padding:4px 10px;font-size:12px;font-weight:700">
            📅 Today
          </button>

          <input type="date" id="dailyDatePickerInp" class="daily-date-picker-inp" value="${o==="all"?e:o}">

          <button type="button" class="daily-nav-arrow" id="dailyNextDayBtn" title="Next Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button type="button" class="btn ${o==="all"?"gold":"ghost"} small" id="dailyAllDatesBtn" style="padding:4px 10px;font-size:12px">
            All Tasks
          </button>
        </div>
      </div>

      <!-- Main Checklist Card -->
      <div class="daily-checklist-card">
        <!-- Day Banner & Progress -->
        <div class="daily-checklist-header">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
            <span style="font-size:16px;font-weight:800;color:var(--text-1)">
              ${Y(o)}
            </span>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:12.5px;font-weight:700;color:${p?"var(--green-600)":"var(--text-2)"}">
                ${n>0?`${b} of ${n} completed (${u}%)`:"No tasks yet"}
              </span>
            </div>
          </div>

          <div class="heatmap-bar-wrap" style="height:8px;background:var(--bg-elevated);border-radius:var(--r-full);overflow:hidden">
            <div class="heatmap-bar-fill" style="width:${u}%;background:${p?"var(--green-500)":"var(--brand-500)"};height:100%;transition:width 0.4s ease"></div>
          </div>

          ${p?`
            <div style="margin-top:10px;padding:8px 12px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);color:var(--green-600);font-size:12.5px;font-weight:700;display:flex;align-items:center;gap:6px">
              <span>🎉</span> All tasks for today completed! Excellent job!
            </div>
          `:""}
        </div>

        <!-- Add Task Bar -->
        <div style="padding:20px 24px 10px">
          <div class="daily-checklist-add-bar">
            <span style="font-size:16px;color:var(--text-4);font-weight:700">◯</span>
            <input type="text" id="dailyTaskQuickInput" class="daily-checklist-input" placeholder="Add a daily task... (Press Enter to add)">
            <button type="button" class="btn gold small" id="dailyTaskAddBtn" style="padding:6px 14px;font-weight:700">
              + Add Task
            </button>
          </div>

          <!-- Controls: Filter Chips & Search -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px">
            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
              <button class="pchip ${g.filter==="all"?"active":""}" data-df="all">All (${n})</button>
              <button class="pchip ${g.filter==="active"?"active":""}" data-df="active">To Do (${y})</button>
              <button class="pchip ${g.filter==="completed"?"active":""}" data-df="completed">✓ Completed (${b})</button>
            </div>

            <div style="display:flex;gap:8px;align-items:center">
              <div class="ticket-search-box" style="margin:0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="dailySearchInp" placeholder="Search checklist…" value="${escapeHtml(g.search)}" style="font-size:12px;padding:4px 6px">
                ${g.search?'<button type="button" id="dailyClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:11px">✕</button>':""}
              </div>

              ${b>0?`
                <button type="button" class="btn ghost small" onclick="clearCompletedDailyTasks()" style="font-size:11.5px;color:var(--text-3);padding:4px 8px" title="Remove completed tasks">
                  Clear Completed
                </button>
              `:""}
            </div>
          </div>
        </div>

        <!-- Checklist Rows -->
        <div id="dailyChecklistRowsContainer" style="border-top:1px solid var(--border-xs)">
          ${m.length===0?`
            <div style="text-align:center;padding:48px 20px;color:var(--text-3)">
              <div style="font-size:36px;margin-bottom:8px">📝</div>
              <div style="font-weight:700;font-size:15px;color:var(--text-1);margin-bottom:4px">No tasks on this checklist</div>
              <div style="font-size:12.5px;color:var(--text-4);max-width:320px;margin:0 auto">Type your task above and press Enter to start checking off items for ${o==="all"?"your list":"today"}.</div>
            </div>
          `:m.map(d=>{const k=d.status==="Completed",_=d.dueDate?new Date(d.dueDate).toISOString().slice(0,10):"";return`
              <div class="daily-item-row ${k?"completed":""}" id="daily-row-${d._id}">
                <!-- Circle checkbox -->
                <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:0">
                  <button type="button" class="daily-circle-check ${k?"checked":""}" onclick="toggleDailyTask('${d._id}')" title="${k?"Mark Incomplete":"Mark Complete"}">
                    ✓
                  </button>
                  <span class="daily-item-text" onclick="toggleDailyTask('${d._id}')" style="cursor:pointer;flex:1">
                    ${escapeHtml(d.title)}
                  </span>
                </div>

                <!-- Right Side Meta & Actions -->
                <div class="daily-actions-hover">
                  ${o==="all"&&_?`
                    <span class="task-tag-pill" style="font-size:10.5px;margin-right:6px">📅 ${_===e?"Today":_}</span>
                  `:""}
                  <button type="button" class="btn ghost small" onclick="editDailyTask('${d._id}')" title="Edit task" style="padding:3px 7px;font-size:12px">✏️</button>
                  <button type="button" class="btn ghost small" onclick="deleteDailyTask('${d._id}')" title="Delete task" style="padding:3px 7px;font-size:12px;color:var(--red-500)">🗑️</button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    </div>
  `;const x=document.getElementById("dailyTaskQuickInput"),h=document.getElementById("dailyTaskAddBtn"),T=async()=>{const d=((x==null?void 0:x.value)||"").trim();if(!d){flashToast("Please enter a task",!0);return}const k=g.date==="all"?e:g.date;try{await U({title:d,status:"Todo",dueDate:k}),flashToast("Task added! ✍️"),x&&(x.value="",x.focus()),v()}catch(_){flashToast(_.message,!0)}};h&&(h.onclick=T),x&&(x.onkeydown=d=>{d.key==="Enter"&&T()}),document.querySelectorAll("[data-df]").forEach(d=>{d.onclick=()=>{g.filter=d.dataset.df,v()}});const C=document.getElementById("dailyPrevDayBtn");C&&(C.onclick=()=>{g.date=H(g.date,-1),v()});const A=document.getElementById("dailyNextDayBtn");A&&(A.onclick=()=>{g.date=H(g.date,1),v()});const t=document.getElementById("dailyTodayBtn");t&&(t.onclick=()=>{g.date=e,v()});const l=document.getElementById("dailyAllDatesBtn");l&&(l.onclick=()=>{g.date=g.date==="all"?e:"all",v()});const f=document.getElementById("dailyDatePickerInp");f&&(f.onchange=d=>{d.target.value&&(g.date=d.target.value,v())});const S=document.getElementById("dailySearchInp");S&&(S.oninput=d=>{g.search=d.target.value,O(a)});const D=document.getElementById("dailyClearSearch");D&&(D.onclick=()=>{g.search="",v()})}window.toggleDailyTask=async function(a){try{await Q(a),v()}catch(s){flashToast(s.message,!0)}};window.deleteDailyTask=async function(a){try{await G(a),flashToast("Task deleted"),v()}catch(s){flashToast(s.message,!0)}};window.editDailyTask=async function(a){const i=(await N()).find(o=>o._id===a);if(!i)return;const e=prompt("Edit task:",i.title);if(e!==null&&e.trim())try{await U({title:e.trim()},a),flashToast("Task updated"),v()}catch(o){flashToast(o.message,!0)}};window.clearCompletedDailyTasks=async function(){if(confirm("Delete all completed tasks from this view?"))try{await apiPost("/tasks/clear-completed",{date:g.date});try{const a=localStorage.getItem("ci360_tasks_"+((r==null?void 0:r._id)||"user"));if(a){let s=JSON.parse(a);s=s.filter(i=>i.status!=="Completed"),localStorage.setItem("ci360_tasks_"+((r==null?void 0:r._id)||"user"),JSON.stringify(s))}}catch{}flashToast("Completed tasks deleted! 🗑️"),v()}catch(a){flashToast(a.message,!0)}};let I="",E="all";async function M(a){let s=await apiGet("/tickets");s.sort((t,l)=>new Date(l.createdAt)-new Date(t.createdAt));const i=P(),e=s.length,o=s.filter(t=>t.status==="Open").length,c=s.filter(t=>t.status==="In Review").length,n=s.filter(t=>t.status==="Resolved"||t.status==="Closed").length,b=e>0?Math.round(n/e*100):100,y=$.ticketsFilter||"all";let u=s;if(y==="open"?u=u.filter(t=>t.status==="Open"):y==="in-review"?u=u.filter(t=>t.status==="In Review"):y==="resolved"?u=u.filter(t=>t.status==="Resolved"):y==="closed"&&(u=u.filter(t=>t.status==="Closed")),E!=="all"&&(u=u.filter(t=>t.priority===E)),I){const t=I.toLowerCase();u=u.filter(l=>{const f=l.jobId&&l.jobId.title||"";return(l.subject||"").toLowerCase().includes(t)||(l.message||"").toLowerCase().includes(t)||(l.userName||"").toLowerCase().includes(t)||f.toLowerCase().includes(t)})}const p={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},m={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function w(t){if(!t)return"U";const l=t.trim().split(/\s+/);return l.length===1?l[0].slice(0,2).toUpperCase():(l[0][0]+l[l.length-1][0]).toUpperCase()}function x(t){if(!t)return"";const l=new Date,f=new Date(t),S=Math.floor((l-f)/1e3);if(S<60)return"Just now";const D=Math.floor(S/60);if(D<60)return`${D}m ago`;const d=Math.floor(D/60);if(d<24)return`${d}h ago`;const k=Math.floor(d/24);return k<7?`${k}d ago`:fmtDate(t)}a.innerHTML=`
    <section class="block">
      <!-- Top KPIs -->
      <div class="ticket-hub-kpis">
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon blue">🎫</div>
          <div>
            <div class="ticket-kpi-val">${e}</div>
            <div class="ticket-kpi-lbl">Total Tickets</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon red">🔴</div>
          <div>
            <div class="ticket-kpi-val">${o}</div>
            <div class="ticket-kpi-lbl">Open Action Req.</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon amber">🟡</div>
          <div>
            <div class="ticket-kpi-val">${c}</div>
            <div class="ticket-kpi-lbl">In Review</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon green">⚡</div>
          <div>
            <div class="ticket-kpi-val">${b}%</div>
            <div class="ticket-kpi-lbl">Resolution Rate</div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <button class="pchip ${y==="all"?"active":""}" data-tf="all">All (${e})</button>
          <button class="pchip ${y==="open"?"active":""}" data-tf="open">🔴 Open (${o})</button>
          <button class="pchip ${y==="in-review"?"active":""}" data-tf="in-review">🟡 In Review (${c})</button>
          <button class="pchip ${y==="resolved"?"active":""}" data-tf="resolved">🟢 Resolved (${n})</button>
          <button class="pchip ${y==="closed"?"active":""}" data-tf="closed">⚪ Closed</button>
        </div>

        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <select id="empTkPriFilter" style="font-size:12.5px;padding:8px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-card);color:var(--text-1);outline:none">
            <option value="all" ${E==="all"?"selected":""}>All Priorities</option>
            <option value="Urgent" ${E==="Urgent"?"selected":""}>🔴 Urgent</option>
            <option value="High" ${E==="High"?"selected":""}>🟠 High</option>
            <option value="Medium" ${E==="Medium"?"selected":""}>🟡 Medium</option>
            <option value="Low" ${E==="Low"?"selected":""}>🟢 Low</option>
          </select>

          <div class="ticket-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="empTkSearch" placeholder="Search by subject, client, job…" value="${escapeHtml(I)}">
            ${I?'<button type="button" id="empClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:12px">✕</button>':""}
          </div>

          <button class="btn gold" id="empRaiseTicketGlobalBtn" type="button" style="display:flex;align-items:center;gap:6px;padding:8px 16px;font-size:13px;font-weight:700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            + Raise Ticket
          </button>
        </div>
      </div>

      <!-- Ticket Cards -->
      ${u.length===0?renderEmptyState("No support tickets found","No tickets match the selected criteria.","🎫"):`
      <div style="display:flex;flex-direction:column;gap:14px">
        ${u.map(t=>{var k;const l=t.jobId?t.jobId.title||"Untitled Job":"General Workspace Support",f=(t.status||"Open").toLowerCase().replace(" ","-"),S=t.status==="Open",D=(t._id||"").slice(-4).toUpperCase(),d=w(t.userName);return`
          <div class="ticket-card status-${f}" id="emp-tk-${t._id}">
            <div class="ticket-card-header">
              <div>
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">
                  <span class="ticket-id-tag">#TK-${D}</span>
                  <span class="ticket-subject">${escapeHtml(t.subject)}</span>
                </div>
                <div style="font-size:12px;color:var(--text-4);margin-top:2px">
                  📁 Job: <strong style="color:var(--text-2)">${escapeHtml(l)}</strong>
                </div>
              </div>
              <div class="ticket-meta-badges">
                <span class="badge ${p[t.status]||"gray"}">
                  ${S?'<span class="pulse-dot"></span>':""} ${escapeHtml(t.status)}
                </span>
                <span class="badge ${m[t.priority]||"gray"}">${escapeHtml(t.priority)}</span>
              </div>
            </div>

            <div class="ticket-author-row">
              <div class="ticket-avatar">${d}</div>
              <div class="ticket-author-meta">
                <div class="ticket-author-name">
                  ${escapeHtml(t.userName)}
                  <span class="ticket-role-pill">${escapeHtml(t.userRole)}</span>
                </div>
                <span class="ticket-time-ago">${x(t.createdAt)} · ${fmtDate(t.createdAt)}</span>
              </div>
            </div>

            <div class="ticket-message-box">
              ${escapeHtml(t.message)}
            </div>

            ${t.adminReply?`
              <div class="ticket-thread-wrap">
                <div class="ticket-admin-reply-card">
                  <div class="ticket-admin-reply-header">
                    <span class="ticket-shield-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Staff Response
                    </span>
                    ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${x(t.repliedAt)}</span>`:""}
                  </div>
                  <div class="ticket-admin-reply-text">${escapeHtml(t.adminReply)}</div>
                </div>
              </div>`:""}

            ${i?`
            <div class="ticket-toolbar">
              <label style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Status:</label>
              <select class="emp-tk-status-sel" data-tkid="${t._id}" style="font-size:12px;padding:5px 8px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1)">
                <option value="Open" ${t.status==="Open"?"selected":""}>🔴 Open</option>
                <option value="In Review" ${t.status==="In Review"?"selected":""}>🟡 In Review</option>
                <option value="Resolved" ${t.status==="Resolved"?"selected":""}>🟢 Resolved</option>
                <option value="Closed" ${t.status==="Closed"?"selected":""}>⚪ Closed</option>
              </select>

              <button class="btn ghost small emp-tk-reply-toggle" data-tkid="${t._id}" type="button">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                ${t.adminReply?"Edit Reply":"💬 Reply"}
              </button>

              ${t.status!=="Resolved"?`
                <button class="btn ghost small emp-tk-quick-resolve" data-tkid="${t._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
                  ✓ Quick Resolve
                </button>`:""}

              <button class="btn danger small emp-tk-del-btn" data-tkid="${t._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>

              <div class="ticket-reply-form" id="emp-tk-replyform-${t._id}">
                <div class="ticket-templates-bar">
                  <span style="font-size:10px;font-weight:700;color:var(--text-4);text-transform:uppercase;align-self:center">Quick:</span>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="Mansi & Urna team is on it! Updates will be shared shortly.">🚀 On It</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="This issue has been resolved and the updates have been saved.">✅ Resolved</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="Could you please provide more details so we can assist further?">ℹ️ Need Info</button>
                </div>
                <textarea id="emp-tk-replytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${escapeHtml(t.adminReply||"")}</textarea>
                <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:6px">
                  <button class="btn ghost small emp-tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
                  <button class="btn gold small emp-tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
                </div>
              </div>
            </div>`:r&&String(((k=t.userId)==null?void 0:k._id)||t.userId)===String(r._id)?`
            <div class="ticket-toolbar" style="display:flex;align-items:center;gap:8px">
              <span style="font-size:11.5px;color:var(--text-3);font-weight:700">My Ticket</span>
              ${t.status!=="Resolved"&&t.status!=="Closed"?`
                <button class="btn ghost small emp-tk-quick-resolve" data-tkid="${t._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
                  ✓ Mark Resolved
                </button>`:""}
              <button class="btn danger small emp-tk-del-btn" data-tkid="${t._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>
            </div>
            `:""}
          </div>`}).join("")}
      </div>`}
    </section>
  `,document.querySelectorAll("[data-tf]").forEach(t=>{t.onclick=()=>{$.ticketsFilter=t.dataset.tf,v()}});const h=document.getElementById("empTkSearch");h&&(h.oninput=t=>{I=t.target.value,M(a)});const T=document.getElementById("empClearSearch");T&&(T.onclick=()=>{I="",M(a)});const C=document.getElementById("empTkPriFilter");C&&(C.onchange=t=>{E=t.target.value,M(a)});const A=document.getElementById("empRaiseTicketGlobalBtn");A&&(A.onclick=async()=>{let t=[];try{t=await apiGet("/jobs?mine=true"),(!t||!t.length)&&(t=await apiGet("/jobs").catch(()=>[]))}catch{t=[]}const l=openModal(`
        <div style="margin-bottom:14px">
          <h3 style="margin-bottom:4px">🎫 Raise Support Ticket</h3>
          <div style="font-size:12.5px;color:var(--text-3)">Create a new support request, note, or blocker report.</div>
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Target / Job (Optional)</label>
          <select id="empModalTkJob" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1)">
            <option value="">📁 General Workspace Support (No specific job)</option>
            ${t.map(f=>`<option value="${f._id}">${escapeHtml(f.title||"Untitled Job")}</option>`).join("")}
          </select>
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Subject / Issue Title *</label>
          <input type="text" id="empModalTkSub" placeholder="Brief summary of the issue…" maxlength="120" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);box-sizing:border-box">
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Priority Level</label>
          <select id="empModalTkPri" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1)">
            <option value="Low">🟢 Low Priority</option>
            <option value="Medium" selected>🟡 Medium Priority</option>
            <option value="High">🟠 High Priority</option>
            <option value="Urgent">🔴 Urgent / Blocker</option>
          </select>
        </div>

        <div class="field" style="margin-bottom:16px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Detailed Description *</label>
          <textarea id="empModalTkMsg" rows="4" placeholder="Provide full details, feedback, or blockers…" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);box-sizing:border-box;resize:vertical"></textarea>
        </div>

        <div class="modal-actions">
          <button class="btn ghost" id="mEmpCancelTicket">Cancel</button>
          <button class="btn gold" id="mEmpSubmitTicket">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Submit Ticket
          </button>
        </div>
      `);l.querySelector("#mEmpCancelTicket").onclick=()=>l.remove(),l.querySelector("#mEmpSubmitTicket").onclick=async()=>{const f=l.querySelector("#empModalTkJob").value||null,S=l.querySelector("#empModalTkSub").value.trim(),D=l.querySelector("#empModalTkPri").value,d=l.querySelector("#empModalTkMsg").value.trim();if(!S){flashToast("Please enter an issue subject",!0);return}if(!d){flashToast("Please enter description",!0);return}try{await apiPost("/tickets",{jobId:f,subject:S,message:d,priority:D}),flashToast("Support Ticket Raised! 🎫"),l.remove(),M(a)}catch(k){flashToast(k.message,!0)}}}),document.querySelectorAll(".emp-tk-quick-resolve").forEach(t=>{t.onclick=async()=>{try{await apiPut("/tickets/"+t.dataset.tkid,{status:"Resolved"}),flashToast("Ticket marked as Resolved! 🎉"),v()}catch(l){flashToast(l.message,!0)}}}),document.querySelectorAll(".emp-tk-del-btn").forEach(t=>{t.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await apiDelete("/tickets/"+t.dataset.tkid),flashToast("Ticket deleted"),v()}catch(l){flashToast(l.message,!0)}}}),i&&(document.querySelectorAll(".ticket-template-btn").forEach(t=>{t.onclick=()=>{const l=document.getElementById("emp-tk-replytxt-"+t.dataset.tkid);l&&(l.value=t.dataset.tpl,l.focus())}}),document.querySelectorAll(".emp-tk-status-sel").forEach(t=>{t.onchange=async()=>{try{await apiPut("/tickets/"+t.dataset.tkid,{status:t.value}),flashToast("Status updated"),v()}catch(l){flashToast(l.message,!0)}}}),document.querySelectorAll(".emp-tk-reply-toggle").forEach(t=>{t.onclick=()=>{const l=document.getElementById("emp-tk-replyform-"+t.dataset.tkid);l&&l.classList.toggle("show")}}),document.querySelectorAll(".emp-tk-reply-cancel").forEach(t=>{t.onclick=()=>{const l=document.getElementById("emp-tk-replyform-"+t.dataset.tkid);l&&l.classList.remove("show")}}),document.querySelectorAll(".emp-tk-reply-save").forEach(t=>{t.onclick=async()=>{const l=document.getElementById("emp-tk-replytxt-"+t.dataset.tkid);if(l)try{await apiPut("/tickets/"+t.dataset.tkid,{adminReply:l.value.trim()}),flashToast("Response saved! 🛡️"),v()}catch(f){flashToast(f.message,!0)}}}))}window.saveCompDate=async function(a){try{const s=document.querySelector(`.emp-completion-date[data-id="${a}"]`);if(!s)return;const i=s.value?s.value:null;await apiPut("/jobs/"+a,{completionDate:i,status:i?"Completed":"In Progress"}),flashToast("Delivery date & status saved!"),v()}catch(s){flashToast(s.message,!0)}};window.toggleStatus=async function(a,s){try{const i=document.querySelector(`.emp-completion-date[data-id="${a}"]`);let e=s?(i==null?void 0:i.value)||new Date().toISOString().slice(0,10):null;i&&(i.value=e||""),await apiPut("/jobs/"+a,{status:s?"Completed":"In Progress",completionDate:e}),flashToast(s?"Job marked as Completed! 🎉":"Job reopened as In Progress"),v()}catch(i){flashToast(i.message,!0)}};window.delJob=async function(a){if(confirm("Delete this job entry? This cannot be undone."))try{await apiDelete("/jobs/"+a),flashToast("Job deleted"),v()}catch(s){flashToast(s.message,!0)}};async function V(a){const[s,i]=await Promise.all([apiGet("/dashboard/employee?period="+$.period),apiGet("/targets?mine=true")]),e=z.personnel.find(p=>{var m;return String(p._id)===String(((m=r.personnelId)==null?void 0:m._id)||r.personnelId)}),o=e?e.capacity:48,c=s.target?s.target.targetHours:Math.round(o*.85),n=Math.round(s.hours/(c||1)*100),b=n>=100?"green":n>=75?"amber":"red",y=Math.min(n,100);a.innerHTML=`
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2 style="margin:0 0 2px">My Targets <span class="eyebrow">${escapeHtml(r.name)}</span></h2>
          <div style="font-size:12.5px;color:var(--text-3)">Track your productivity targets and output quotas assigned by management.</div>
        </div>
        ${F()}
      </div>

      <!-- Top Summary Metrics -->
      <div class="grid grid-4" style="margin-bottom:20px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Hours Logged</span><div class="kpi-icon">⏱</div></div>
          <div class="kpi-value">${fmtHours(s.hours)}</div>
          <div class="kpi-sub">${s.jobCount} jobs this period</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Target Hours</span><div class="kpi-icon">🎯</div></div>
          <div class="kpi-value">${fmtHours(c)}</div>
          <div class="kpi-sub">${n}% completed</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Weekly Capacity</span><div class="kpi-icon">⚡</div></div>
          <div class="kpi-value">${o} hrs/wk</div>
          <div class="kpi-sub">${e?e.status:"active"} status</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Assigned Targets</span><div class="kpi-icon">📋</div></div>
          <div class="kpi-value">${i.length}</div>
          <div class="kpi-sub">Admin configured</div>
        </div>
      </div>

      <!-- Period Hours Progress Card -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-size:13.5px;font-weight:700;color:var(--text-1)">Overall Hours Target (${$.period})</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">${fmtHours(s.hours)} logged of ${fmtHours(c)} target capacity</div>
          </div>
          <span class="badge ${b}" style="font-size:12.5px;padding:4px 10px">${n}% Achieved</span>
        </div>
        <div class="progress-bar-wrap" style="height:10px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden">
          <div class="progress-bar-fill ${b}" style="width:${y}%;height:100%;border-radius:var(--r-full);background:var(--${b==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-4);margin-top:8px">
          <span>0 hrs</span><span>Target: ${fmtHours(c)}</span>
        </div>
      </div>

      <!-- Admin Assigned Throughput Targets -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin:0 0 14px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:16px;margin:0;display:flex;align-items:center;gap:8px">
          <span>🎯 Service & Throughput Targets</span>
          <span class="eyebrow">${i.length} active</span>
        </h3>
        <button class="btn gold small" id="addEmpTargetBtn" type="button">+ Set Target</button>
      </div>

      ${i.length===0?`
        <div class="card" style="text-align:center;padding:36px 20px">
          <div style="font-size:32px;margin-bottom:8px">🎯</div>
          <div style="font-weight:700;color:var(--text-1);font-size:15px;margin-bottom:4px">No specific service targets assigned yet</div>
          <div style="font-size:12.5px;color:var(--text-3);max-width:420px;margin:0 auto 16px">Your general hours target is active above. Click "+ Set Target" to define your own daily or weekly quotas for reels, stories, posts, or deliverables.</div>
          <button class="btn gold small" onclick="openEmpTargetModal(null)">+ Set First Target</button>
        </div>
      `:`
        <div class="grid grid-2" style="gap:16px">
          ${i.map(p=>{var f;const m=((f=p.serviceId)==null?void 0:f.name)||"General Service",x={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"}[p.unit]||(p.unit?p.unit.charAt(0).toUpperCase()+p.unit.slice(1):"Deliverables"),h=p.actual||0,T=p.quantity||1,C=T>0?h/T:0,A=Math.round(C*100),t=Math.min(A,100),l=C>=1?{l:"🟢 On Pace",c:"green"}:C>=.6?{l:"🟡 Behind",c:"amber"}:{l:"🔴 Off Pace",c:"red"};return`
            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;border:1px solid var(--border-sm);position:relative">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:8px">
                  <div>
                    <span style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;letter-spacing:0.04em">Service Target</span>
                    <h4 style="font-size:15.5px;font-weight:700;margin:2px 0 0;color:var(--text-1)">${escapeHtml(m)}</h4>
                  </div>
                  <div style="display:flex;gap:6px;align-items:center">
                    <span class="badge ${l.c}">${l.l}</span>
                    <button type="button" class="btn ghost small edit-emp-target" data-id="${p._id}" style="padding:4px 8px;font-size:11.5px">✏️ Edit</button>
                  </div>
                </div>

                <div style="display:flex;align-items:baseline;gap:6px;margin:10px 0 6px">
                  <span style="font-size:24px;font-weight:800;color:var(--text-1)">${h}</span>
                  <span style="font-size:13px;color:var(--text-3)">/ ${T} ${escapeHtml(x)} per ${p.period==="day"?"day":p.period==="week"?"week":"month"}</span>
                </div>

                <!-- Progress Bar -->
                <div class="progress-bar-wrap" style="height:8px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden;margin:6px 0 10px">
                  <div class="progress-bar-fill ${l.c}" style="width:${t}%;height:100%;border-radius:var(--r-full);background:var(--${l.c==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
                </div>

                <!-- Direct Log Completed Output -->
                <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px">
                  <span style="font-size:12px;font-weight:700;color:var(--text-2)">Completed:</span>
                  <div style="display:flex;align-items:center;gap:5px">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${p._id}', -1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">-</button>
                    <input type="number" min="0" step="0.5" class="emp-target-completed-inp" data-id="${p._id}" value="${h}" style="width:60px;padding:4px 6px;text-align:center;font-weight:700;font-size:13px;border:1px solid var(--border-sm);border-radius:var(--r-xs);background:var(--bg-surface);color:var(--text-1);outline:none">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${p._id}', 1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">+</button>
                    <button type="button" class="btn gold small" onclick="saveTargetCompleted('${p._id}')" style="padding:4px 8px;font-size:11.5px" title="Save completed quantity">💾 Save</button>
                  </div>
                </div>

                <!-- Proof of Work Attachments -->
                ${p.attachments&&p.attachments.length?`
                  <div data-attachments="${encodeURIComponent(JSON.stringify(p.attachments))}" style="margin-top:8px">
                    ${renderAttachmentChips(p.attachments,{title:"Attached Proofs & Files"})}
                  </div>
                `:""}
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--text-4);border-top:1px solid var(--border-sm);padding-top:10px">
                <span>Period: <strong style="color:var(--text-2)">${p.period==="day"?"Daily":p.period==="week"?"Weekly":"Monthly"}</strong></span>
                <span><strong>${A}%</strong> Completed</span>
              </div>
            </div>`}).join("")}
        </div>
      `}
    </div>`;const u=document.getElementById("addEmpTargetBtn");u&&(u.onclick=()=>q(null)),document.querySelectorAll(".edit-emp-target").forEach(p=>{p.onclick=()=>q(i.find(m=>m._id===p.dataset.id))}),j()}window.stepTargetCompleted=function(a,s){const i=document.querySelector(`.emp-target-completed-inp[data-id="${a}"]`);if(!i)return;let e=Math.max(0,(Number(i.value)||0)+s);i.value=e,saveTargetCompleted(a)};window.saveTargetCompleted=async function(a){try{const s=document.querySelector(`.emp-target-completed-inp[data-id="${a}"]`);if(!s)return;const i=Number(s.value)||0;await apiPut("/targets/"+a,{completed:i}),flashToast("Target progress updated! 🎯"),v()}catch(s){flashToast(s.message,!0)}};function q(a){var p,m;const s=!a,i=z.services||[];a=a||{serviceId:(p=i[0])==null?void 0:p._id,quantity:5,unit:"reels",period:"day",completed:0,attachments:[]};const e=((m=a.serviceId)==null?void 0:m._id)||a.serviceId||"",c=["reels","stories","posts","count","hours"].includes(a.unit),n=openModal(`
    <h3>${s?"Set New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Customize your output target goals, choose or type your own unit, and track completed output.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Category *</label>
      <select id="mEmpTgtService">
        ${i.map(w=>`<option value="${w._id}" ${String(w._id)===String(e)?"selected":""}>${escapeHtml(w.name)}</option>`).join("")}
      </select>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Target Goal Quota *</label>
        <input type="number" id="mEmpTgtQty" min="0.5" step="0.5" value="${a.quantity||1}">
      </div>
      <div class="field" style="margin-bottom:0">
        <label>Completed Output</label>
        <input type="number" id="mEmpTgtCompleted" min="0" step="0.5" value="${a.actual||a.completed||0}">
      </div>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Measured In *</label>
        <select id="mEmpTgtUnit">
          <option value="reels" ${c&&a.unit==="reels"?"selected":""}>🎬 Reels</option>
          <option value="stories" ${c&&a.unit==="stories"?"selected":""}>📱 Stories</option>
          <option value="posts" ${c&&a.unit==="posts"?"selected":""}>🖼️ Posts</option>
          <option value="count" ${c&&a.unit==="count"?"selected":""}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${c&&a.unit==="hours"?"selected":""}>⏱️ Hours Spent</option>
          <option value="custom" ${c?"":"selected"}>✏️ Custom / Add Your Own…</option>
        </select>
      </div>

      <div class="field" style="margin-bottom:0">
        <label>Frequency / Target Period *</label>
        <select id="mEmpTgtPeriod">
          <option value="day" ${a.period==="day"?"selected":""}>Per Day</option>
          <option value="week" ${a.period==="week"?"selected":""}>Per Week</option>
          <option value="month" ${a.period==="month"?"selected":""}>Per Month</option>
        </select>
      </div>
    </div>

    <div class="field" id="mEmpTgtCustomUnitWrap" style="margin-bottom:16px;display:${c?"none":"flex"}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mEmpTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${c?"":escapeHtml(a.unit||"")}">
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mEmpTgtAttachments",label:"Proof of Work / Deliverable Attachments",subtitle:"Upload links, finished files, screenshots or design outputs"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mEmpTgtCancel">Cancel</button>
      <button class="btn gold" id="mEmpTgtSave">💾 Save Target</button>
    </div>
  `);bindAttachmentUploader("mEmpTgtAttachments",{existing:a.attachments||[]});const b=n.querySelector("#mEmpTgtUnit"),y=n.querySelector("#mEmpTgtCustomUnitWrap"),u=n.querySelector("#mEmpTgtCustomUnit");b.onchange=()=>{b.value==="custom"?(y.style.display="flex",u.focus()):y.style.display="none"},n.querySelector("#mEmpTgtCancel").onclick=()=>n.remove(),n.querySelector("#mEmpTgtSave").onclick=async()=>{let w=b.value;w==="custom"&&(w=u.value.trim()||"Deliverables");const x=getUploaderAttachments("mEmpTgtAttachments"),h={serviceId:n.querySelector("#mEmpTgtService").value,quantity:Number(n.querySelector("#mEmpTgtQty").value)||1,completed:Number(n.querySelector("#mEmpTgtCompleted").value)||0,unit:w,period:n.querySelector("#mEmpTgtPeriod").value,attachments:x};if(!h.serviceId){flashToast("Service is required",!0);return}try{s?await apiPost("/targets",h):await apiPut("/targets/"+a._id,h),flashToast("Target saved! 🎯"),n.remove(),v()}catch(T){flashToast(T.message,!0)}}}L();
