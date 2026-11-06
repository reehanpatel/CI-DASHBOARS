import{c as ze,k as $,e as v,x as at,l as nt,p as qt,m as Jt,j as ve,y as ma,z as ia,A as fa}from"./api-HIjfYcDT.js";const ha={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function Ea(){try{const s=localStorage.getItem("ci360_planner_settings");if(s)return Object.assign({},ha,JSON.parse(s))}catch{}return Object.assign({},ha)}function Ta(s){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(s))}catch{}}function Ke(){const s=new Date,a=s.getFullYear(),e=String(s.getMonth()+1).padStart(2,"0"),g=String(s.getDate()).padStart(2,"0");return`${a}-${e}-${g}`}function Kt(s,a){const e=new Date(s+"T00:00:00");e.setDate(e.getDate()+a);const g=e.getFullYear(),h=String(e.getMonth()+1).padStart(2,"0"),b=String(e.getDate()).padStart(2,"0");return`${g}-${h}-${b}`}function Dt(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function Ge(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function Fa(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function Bt(s,a=1){const e=new Date(s+"T00:00:00"),g=e.getDay(),h=(g<a?7:0)+g-a,b=new Date(e);b.setDate(e.getDate()-h);const p=[];for(let o=0;o<7;o++){const j=new Date(b);j.setDate(b.getDate()+o);const J=j.getFullYear(),T=String(j.getMonth()+1).padStart(2,"0"),q=String(j.getDate()).padStart(2,"0");p.push(`${J}-${T}-${q}`)}return p}function Pa(){try{const s=window.AudioContext||window.webkitAudioContext;if(!s)return;const a=new s,e=a.currentTime,g=a.createOscillator(),h=a.createGain();g.type="sine",g.frequency.setValueAtTime(523.25,e),g.frequency.exponentialRampToValueAtTime(783.99,e+.15),h.gain.setValueAtTime(.2,e),h.gain.exponentialRampToValueAtTime(.001,e+.35),g.connect(h),h.connect(a.destination),g.start(e),g.stop(e+.35)}catch{}}function sn(s,a={}){const{userRole:e="employee",currentUser:g=null,onNavigate:h=null}=a,b=e==="superadmin"||e==="admin";let p=Ea(),o={selectedDate:Ke(),viewMode:"daily",filterStatus:"all",searchQuery:"",groupByEmployee:b,collapsedEmployees:{},selectedCategory:"all",selectedPersonnelId:"all",reportPersonnelId:"all",tasks:[],personnelList:[],clientList:[],loading:!1};La(),j();async function j(){o.loading=!0,J();try{const l=[ze("/tasks"),ze("/personnel").catch(()=>[]),ze("/clients").catch(()=>[])],[n,r,f]=await Promise.all(l);o.tasks=Array.isArray(n)?n:[],r&&(o.personnelList=Array.isArray(r)?r:[]),f&&(o.clientList=Array.isArray(f)?f:[])}catch(l){$("Failed to load planner tasks: "+l.message,!0)}finally{o.loading=!1,U()}}function J(){s.innerHTML=`
      <div class="ci360-planner-wrap">
        <div class="ci360-planner-skeleton" style="padding:24px;background:var(--bg-card);border-radius:var(--r-lg);border:1px solid var(--border-sm)">
          <div style="height:32px;width:240px;background:var(--border-xs);border-radius:6px;margin-bottom:12px;animation:pulse 1.5s infinite"></div>
          <div style="height:18px;width:340px;background:var(--border-xs);border-radius:4px;margin-bottom:28px"></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:12px;margin-bottom:24px">
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
          </div>
          <div style="height:200px;background:var(--border-xs);border-radius:12px"></div>
        </div>
      </div>
    `}function T(l){return o.tasks.filter(n=>{if(n.isDeleted===!0)return!1;if(b&&o.selectedPersonnelId!=="all"){const y=n.personnelId?._id||n.personnelId,z=String(y)===String(o.selectedPersonnelId),N=Array.isArray(n.coOwners)&&n.coOwners.some(S=>{const P=S.personnelId?._id||S.personnelId||S.userId?._id||S.userId;return String(P)===String(o.selectedPersonnelId)});if(!z&&!N)return!1}const r=n.completionDateStr||n.dateStr||(n.dueDate?new Date(n.dueDate).toISOString().slice(0,10):""),f=n.assignedDateStr||(n.assignedDate?new Date(n.assignedDate).toISOString().slice(0,10):"")||(n.createdAt?new Date(n.createdAt).toISOString().slice(0,10):"")||r;if(n.status==="In Progress"){const y=f&&r&&f<=r?f:r||f,z=f&&r&&f<=r?r:f||r;if(y&&z){if(l>=y&&l<=z)return!0}else{if(r&&r===l)return!0;if(f&&f===l)return!0}}return r&&r===l||n.status!=="Completed"&&f&&f===l?!0:!r&&!f?l===Ke():!1})}function q(l,n){if(l.status==="Completed")return!1;const r=l.completionDateStr||l.dateStr||(l.dueDate?new Date(l.dueDate).toISOString().slice(0,10):"");return r?r<n:!1}function W(l,n){const r=l.length,f=l.filter(P=>P.status==="Completed").length,y=l.filter(P=>P.status==="In Progress").length,z=l.filter(P=>P.status==="Pending"||P.status==="Todo").length,N=l.filter(P=>q(P,n)).length,S=r>0?Math.round(f/r*100):0;return{total:r,completed:f,inProgress:y,pending:z,overdue:N,percent:S}}function U(){const l=Ke(),n=o.selectedDate===l,r=T(o.selectedDate),f=W(r,l);s.innerHTML=`
      <div class="ci360-planner-wrap ${p.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header (Hero Card) -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-hero-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="3" ry="3"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="m9 16 2 2 4-4"></path>
              </svg>
            </div>
            <div class="ci360-planner-title-group">
              <h1 class="ci360-planner-heading">${v(p.displayName||"Daily Planner")}</h1>
              <p class="ci360-planner-subheading">Plan your day. Track your progress.</p>
            </div>
          </div>

          <div class="ci360-planner-header-actions">
            <!-- View Mode Switcher -->
            <div class="ci360-view-switcher" role="tablist">
              <button type="button" class="ci360-switch-btn ${o.viewMode==="daily"?"active":""}" id="btnViewDaily" title="Daily View">
                <span>📅 Daily</span>
              </button>
              <button type="button" class="ci360-switch-btn ${o.viewMode==="weekly"?"active":""}" id="btnViewWeekly" title="Weekly View">
                <span>🗓️ Weekly</span>
              </button>
              <button type="button" class="ci360-switch-btn ${o.viewMode==="report"?"active":""}" id="btnViewReport" title="Weekly Analytics & Report">
                <span>📊 Report</span>
              </button>
            </div>

            <!-- Primary Add Task Button -->
            <button type="button" class="ci360-btn-primary ${o.selectedDate<l?"is-locked-past":""}" id="btnOpenAddTaskModal" title="${o.selectedDate<l?"Cannot add tasks on previous dates (switch to today or later)":"Add Task"}">
              ${o.selectedDate<l?`
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Add Task (Past Date)</span>
              `:`
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Add Task</span>
              `}
            </button>

            <!-- Actions Dropdown Button -->
            <div class="ci360-dropdown-wrap">
              <button type="button" class="ci360-btn-secondary" id="btnPlannerActionsMenu" title="More Tools & Exports">
                <span>Tools & Export ▾</span>
              </button>
              <div class="ci360-dropdown-menu hidden" id="plannerActionsDropdown">
                <button type="button" class="ci360-menu-item" id="btnActionImport">
                  <span class="icon">📥</span>
                  <div class="meta">
                    <strong>Import Task List</strong>
                    <small>Paste lines or upload .txt file</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionExportPng">
                  <span class="icon">🖼️</span>
                  <div class="meta">
                    <strong>Download Daily Planner Image</strong>
                    <small>High-resolution PNG for today</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionExportPdf">
                  <span class="icon">📄</span>
                  <div class="meta">
                    <strong>Download Weekly Report (PDF)</strong>
                    <small>Summary report with job owner</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionAdminReport">
                  <span class="icon">📊</span>
                  <div class="meta">
                    <strong>Admin Detailed Report (PDF & CSV)</strong>
                    <small>With Client Name & Description</small>
                  </div>
                </button>
                <div class="ci360-dropdown-divider"></div>
                <button type="button" class="ci360-menu-item" id="btnActionBackup">
                  <span class="icon">💾</span>
                  <div class="meta">
                    <strong>Backup / Restore</strong>
                    <small>Export or import JSON backup</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionSettings">
                  <span class="icon">⚙️</span>
                  <div class="meta">
                    <strong>Planner Settings</strong>
                    <small>Timezone, layout & preferences</small>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        <!-- Date & Team Navigator Bar -->
        <div class="ci360-planner-nav-strip">
          <div class="ci360-date-nav-controls">
            <button type="button" class="ci360-nav-arrow" id="btnPrevDay" title="Previous Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <div class="ci360-date-picker-badge" id="datePickerBadge">
              <span class="calendar-icon">📅</span>
              <span class="date-text" id="displayDateLabel">${Dt(o.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${o.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${n?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${b?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${o.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${o.personnelList.map(y=>`
                  <option value="${y._id}" ${o.selectedPersonnelId===String(y._id)?"selected":""}>
                    ${v(y.name)} (${v(y.department||y.role||"Team")})
                  </option>
                `).join("")}
              </select>
            </div>
          `:""}
        </div>

        <!-- Progress Summary Ribbon -->
        <section class="ci360-progress-summary-card">
          <div class="ci360-summary-main">
            <div class="ci360-ring-stat">
              <div class="ci360-circular-progress" style="--val: ${f.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${f.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${f.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <div class="kpi-icon-wrap total">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${f.total}</span>
                  <span class="kpi-label">Total Tasks</span>
                </div>
              </div>
              <div class="kpi-box completed">
                <div class="kpi-icon-wrap completed">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${f.completed}</span>
                  <span class="kpi-label">Completed</span>
                </div>
              </div>
              <div class="kpi-box in-progress">
                <div class="kpi-icon-wrap in-prog">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${f.inProgress}</span>
                  <span class="kpi-label">In Progress</span>
                </div>
              </div>
              <div class="kpi-box pending">
                <div class="kpi-icon-wrap pending">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14M5 2h14m-2 20v-5a5 5 0 0 0-2.83-4.5A5 5 0 0 0 17 7V2M7 22v-5a5 5 0 0 1 2.83-4.5A5 5 0 0 1 7 7V2"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${f.pending}</span>
                  <span class="kpi-label">Pending</span>
                </div>
              </div>
              ${f.overdue>0?`
                <div class="kpi-box overdue">
                  <div class="kpi-icon-wrap overdue">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <div class="kpi-text-wrap">
                    <span class="kpi-num">${f.overdue}</span>
                    <span class="kpi-label">Overdue</span>
                  </div>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${f.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${me(r,f)}
        </main>

      </div>
    `,lt(),Le()}function me(l,n){return o.viewMode==="weekly"?mt():o.viewMode==="report"?Ft():$e(l,n)}function $e(l,n){const r=Ke(),f=o.selectedDate<r;let y=l;if(o.filterStatus==="pending"?y=y.filter(S=>S.status==="Pending"||S.status==="Todo"):o.filterStatus==="in_progress"?y=y.filter(S=>S.status==="In Progress"):o.filterStatus==="completed"?y=y.filter(S=>S.status==="Completed"):o.filterStatus==="overdue"&&(y=y.filter(S=>q(S,r))),o.searchQuery){const S=o.searchQuery.toLowerCase().trim();y=y.filter(P=>{const H=(P.title||"").toLowerCase(),F=(P.description||"").toLowerCase(),R=(P.category||"").toLowerCase(),x=(P.clientName||"").toLowerCase(),E=(P.personnelId?.name||P.userId?.name||"").toLowerCase(),X=(P.createdByName||P.createdBy?.name||(P.createdBy?.email?P.createdBy.email.split("@")[0]:"")).toLowerCase(),I=Array.isArray(P.coOwners)?P.coOwners.map(c=>(c.name||"").toLowerCase()).join(" "):"",L=(P.clientId?.name||P.jobId?.clientId?.name||"").toLowerCase();return H.includes(S)||F.includes(S)||R.includes(S)||x.includes(S)||E.includes(S)||X.includes(S)||I.includes(S)||L.includes(S)})}y.sort((S,P)=>{if(S.status==="Completed"&&P.status!=="Completed")return 1;if(S.status!=="Completed"&&P.status==="Completed")return-1;const H={Urgent:0,High:1,Medium:2,Low:3};return(H[S.priority]||2)-(H[P.priority]||2)});const z=new Map;y.forEach(S=>{let P="unassigned",H="Unassigned / Team",F="",R="";S.personnelId&&typeof S.personnelId=="object"&&S.personnelId._id?(P=String(S.personnelId._id),H=S.personnelId.name||"Team Member",R=S.personnelId.role||"Personnel",F=S.personnelId.department||""):S.userId&&typeof S.userId=="object"&&S.userId._id?(P=String(S.userId._id),H=S.userId.name||"User",R=S.userId.role||"Member"):(S.createdByName||S.createdBy&&S.createdBy.name)&&(H=S.createdByName||S.createdBy.name,P="creator_"+H.toLowerCase().replace(/[^a-z0-9]/g,"_"),R="Creator"),z.has(P)||z.set(P,{key:P,name:H,department:F,role:R,tasks:[]}),z.get(P).tasks.push(S)});const N=Array.from(z.values()).sort((S,P)=>S.key==="unassigned"?1:P.key==="unassigned"?-1:S.name.localeCompare(P.name));return`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <h2 class="ci360-focus-title" style="margin:0;">
              <span class="accent-dot"></span>
              ${f?"Focus Archive":"Today's Focus"}
            </h2>
            <span class="ci360-task-count-badge">${y.length} ${y.length===1?"task":"tasks"}</span>
            ${f?"":`
              <button type="button" class="ci360-btn-primary" id="btnFocusAddTask" style="padding:6px 14px;font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:6px;border-radius:var(--r-md);margin-left:4px;cursor:pointer;box-shadow:0 2px 6px rgba(0,112,243,0.25);">
                <span style="font-size:15px;line-height:1;font-weight:800;">+</span> Add Task
              </button>
            `}
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${o.filterStatus==="all"?"active":""}" data-f="all">All (${n.total})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${n.pending})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${n.inProgress})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${n.completed})</button>
              ${n.overdue>0?`
                <button type="button" class="filter-pill overdue ${o.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${n.overdue})</button>
              `:""}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${b?`
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${o.groupByEmployee?"active":""}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${o.groupByEmployee?"By Employee":"Flat List"}
                </button>
                ${o.groupByEmployee&&N.length>0?`
                  <button type="button" class="filter-pill" id="btnExpandAllEmp" title="Expand all employee tasks">⊞ Expand</button>
                  <button type="button" class="filter-pill" id="btnCollapseAllEmp" title="Collapse all employee tasks">⊟ Collapse</button>
                `:""}
              </div>
            `:""}

            <!-- Search Bar with employee search support -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks, client name, employee or co-owner..." value="${v(o.searchQuery)}">
              ${o.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Past Date Banner (Only for Previous Dates) -->
        ${f?`
          <div class="ci360-past-date-banner">
            <div class="past-banner-icon">🔒</div>
            <div class="past-banner-body">
              <div class="past-banner-title">Previous Date (${Ge(o.selectedDate)})</div>
              <div class="past-banner-desc">
                Adding new tasks on previous dates is restricted. You can edit existing tasks, adjust completion dates, or mark tasks as completed.
              </div>
            </div>
          </div>
        `:""}

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${y.length===0?Qe(f):b&&o.groupByEmployee?`
              <div class="ci360-emp-groups-container">
                ${N.map(S=>{const P=!!o.collapsedEmployees[S.key],H=S.tasks.filter(E=>E.status==="Completed").length,F=S.tasks.filter(E=>E.status==="In Progress").length,R=S.tasks.filter(E=>E.status==="Pending"||E.status==="Todo").length,x=S.tasks.length>0?Math.round(H/S.tasks.length*100):0;return`
                    <div class="ci360-emp-group-card ${P?"is-collapsed":""}" data-emp-key="${S.key}">
                      <div class="ci360-emp-group-header" data-action="toggle-emp-group" data-emp-key="${S.key}" role="button" tabindex="0">
                        <div class="emp-group-left">
                          <span class="emp-collapse-icon">${P?"▶":"▼"}</span>
                          <div class="emp-avatar">${v((S.name||"U").charAt(0).toUpperCase())}</div>
                          <div class="emp-info">
                            <span class="emp-name">${v(S.name)}</span>
                            ${S.department||S.role?`<span class="emp-subtitle">${v(S.department?S.department+" · "+S.role:S.role)}</span>`:""}
                          </div>
                        </div>

                        <div class="emp-group-right">
                          <span class="emp-stat-pill total">${S.tasks.length} ${S.tasks.length===1?"task":"tasks"}</span>
                          <span class="emp-stat-pill done">${H} done</span>
                          ${F>0?`<span class="emp-stat-pill in-prog">${F} in progress</span>`:""}
                          ${R>0?`<span class="emp-stat-pill pending">${R} pending</span>`:""}
                          <div class="emp-mini-bar-wrap" title="${x}% completed">
                            <div class="emp-mini-bar-fill" style="width:${x}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${P?"":`
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${S.tasks.map(E=>it(E,r)).join("")}
                          </div>
                        </div>
                      `}
                    </div>
                  `}).join("")}
              </div>
            `:`
              <div class="ci360-task-list">
                ${y.map(S=>it(S,r)).join("")}
              </div>
            `}
        </div>

      </div>
    `}function Qe(l=!1){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">${l?"📜":"✨"}</div>
        <h3>No tasks found for ${Ge(o.selectedDate)}</h3>
        <p>${l?"No scheduled tasks were recorded on this past date.":"Your schedule is clean and ready. Add your first priority task above or import your daily agenda."}</p>
        ${l?"":`
          <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
            <button type="button" class="ci360-btn-primary" id="btnEmptyStateAddTask">
              + Add Task
            </button>
            <button type="button" class="ci360-btn-secondary" id="btnEmptyStateImport">
              📥 Import List
            </button>
          </div>
        `}
      </div>
    `}function it(l,n){const r=l.status==="Completed",f=q(l,n),y=l.completionDateStr||l.dateStr||(l.dueDate?new Date(l.dueDate).toISOString().slice(0,10):n),z=l.assignedDateStr||(l.assignedDate?new Date(l.assignedDate).toISOString().slice(0,10):"")||(l.createdAt?new Date(l.createdAt).toISOString().slice(0,10):""),N=l.status==="In Progress"&&z&&y&&z!==y,S=`pri-${(l.priority||"medium").toLowerCase()}`,P=`status-${(l.status||"pending").toLowerCase().replace(/\s+/g,"-")}`,H=l.createdByName||l.createdBy?.name||(l.createdBy?.email?l.createdBy.email.split("@")[0]:"")||l.personnelId?.name||l.userId?.name||"";return`
      <div class="ci360-task-card ${r?"is-completed":""} ${f?"is-overdue":""}" data-id="${l._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${r?"checked":""}" data-action="toggle" data-id="${l._id}" title="${r?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${v(l.title)}</span>
          </div>

          ${l.description?`
            <div class="ci360-task-desc">${v(l.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${S}">
              <span class="badge-dot"></span>
              ${v(l.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${P}">
              ${v(l.status||"Pending")}
            </span>

            <!-- Completion Date / Date Span Badge (Always Visible & Prominent) -->
            ${N?`
              <span class="ci360-badge completion-badge" style="background:rgba(59,130,246,0.15);color:#3b82f6;border-color:rgba(59,130,246,0.3);" title="In Progress from ${Ge(z)} to ${Ge(y)}">
                📅 ${Ge(z)} ➔ Due: ${Ge(y)}
              </span>
            `:`
              <span class="ci360-badge completion-badge" title="Target Completion Date: ${y}">
                📅 Due: ${Ge(y)}
              </span>
            `}

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${l.rescheduledFrom&&l.rescheduledFrom!==y?`
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${Ge(l.rescheduledFrom)} to ${Ge(y)} (${l.dateChangeCount||1} change${(l.dateChangeCount||1)>1?"s":""})">
                🔄 Date Changed: ${Ge(l.rescheduledFrom)} ➔ ${Ge(y)}
              </span>
            `:""}

            <!-- Added By Badge (Shows Who Created the Task) -->
            ${H?`
              <span class="ci360-badge creator-badge" title="Created / Added by: ${v(H)}">
                ✍️ Added by: ${v(H)}
              </span>
            `:""}

            <!-- Category -->
            ${l.category?`
              <span class="ci360-badge category-badge">
                #${v(l.category)}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${f?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name (if different from addedByName) -->
            ${b&&(l.personnelId?.name||l.userId?.name)&&(l.personnelId?.name||l.userId?.name)!==H?`
              <span class="ci360-badge personnel-badge" title="Assigned Employee">
                👤 Assigned: ${v(l.personnelId?.name||l.userId?.name)}
              </span>
            `:""}

            <!-- Co-Owners Badge (Multiple People) -->
            ${Array.isArray(l.coOwners)&&l.coOwners.length>0?`
              <span class="ci360-badge coowner-badge" style="background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);" title="Co-Owners: ${l.coOwners.map(F=>F.name).filter(Boolean).join(", ")}">
                👥 Co-Owners: ${v(l.coOwners.map(F=>F.name).filter(Boolean).join(", "))}
              </span>
            `:""}

            <!-- Client Badge -->
            ${l.clientName||l.clientId?.name||l.jobId?.clientId?.name||l.category&&l.category!=="General"&&l.category?`
              <span class="ci360-badge client-badge" style="background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.25);" title="Client: ${v(l.clientName||l.clientId?.name||l.jobId?.clientId?.name||l.category)}">
                🏢 ${v(l.clientName||l.clientId?.name||l.jobId?.clientId?.name||l.category)}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu: Previous tasks can be edited, deleted, changed by all -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${l._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${l._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function mt(){const l=Bt(o.selectedDate,p.weekStartsOn),n=Ge(l[0]),r=Ge(l[6]),f=Ke(),y=l.flatMap(P=>T(P)),z=new Map;y.forEach(P=>{const H=P._id?String(P._id):JSON.stringify(P);z.set(H,P)});const N=Array.from(z.values()),S=W(N,f);return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${n} – ${r}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 8-Card Modern Weekly Grid (7 Days + Week at a Glance) -->
        <div class="ci360-week-grid modern-grid">
          ${l.map(P=>{const H=P===f,F=P===o.selectedDate,R=T(P),x=W(R,f),E=new Date(P+"T00:00:00"),X=E.toLocaleDateString("en-US",{weekday:"short"}),I=E.toLocaleDateString("en-US",{weekday:"long"}),L=E.toLocaleDateString("en-US",{month:"short"}),c=E.getDate();return`
              <div class="ci360-weekly-day-card ${H?"is-today":""} ${F?"is-selected":""}" data-date="${P}">
                
                <!-- Day Card Header -->
                <div class="weekly-day-header ${H?"today-banner":""}">
                  <div class="day-badge-box">
                    <span class="day-badge-name">${X}</span>
                    <span class="day-badge-num">${c}</span>
                  </div>
                  <div class="day-header-meta">
                    <div class="day-full-name">${I}, ${L} ${c}</div>
                    <div class="day-header-stats-row">
                      <span class="day-done-label">${x.completed}/${x.total} Done</span>
                      <div class="day-progress-track">
                        <div class="day-progress-bar" style="width: ${x.percent}%"></div>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="day-action-clipboard-btn" data-action="add-day" data-date="${P}" title="Add/Manage tasks for ${I}">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                  </button>
                </div>

                <!-- Day Card Tasks List -->
                <div class="weekly-day-tasks">
                  ${R.length===0?`
                    <div class="weekly-empty-state">
                      <span>No tasks scheduled</span>
                    </div>
                  `:R.map(i=>{const t=i.status==="Completed",k=(i.priority||"medium").toLowerCase(),A=i.priority?i.priority.charAt(0).toUpperCase()+i.priority.slice(1).toLowerCase():"Medium";return`
                      <div class="weekly-task-item ${t?"done":""}" data-id="${i._id}">
                        <button type="button" class="weekly-check-btn ${t?"checked":""}" data-action="toggle" data-id="${i._id}" title="Mark ${t?"Incomplete":"Complete"}">
                          ${t?`
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          `:""}
                        </button>
                        <span class="weekly-task-title ${t?"strike":""}" data-action="edit" data-id="${i._id}" title="${v(i.title)}">
                          ${v(i.title)}
                        </span>
                        <span class="weekly-pri-badge pri-${k}">
                          ${A}
                        </span>
                      </div>
                    `}).join("")}
                </div>

              </div>
            `}).join("")}

          <!-- 8th Card: Week at a Glance -->
          <div class="ci360-weekly-day-card week-glance-card">
            <div class="glance-header">
              <span class="glance-icon">📊</span>
              <h3 class="glance-title">Week at a Glance</h3>
            </div>
            
            <div class="glance-metrics-grid">
              <div class="glance-metric-item">
                <span class="glance-m-icon total">📋</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${S.total}</div>
                  <div class="glance-m-lbl">Total Tasks</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon completed">✅</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${S.completed}</div>
                  <div class="glance-m-lbl">Completed</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon in-progress">🔄</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${S.inProgress}</div>
                  <div class="glance-m-lbl">In Progress</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon pending">⏳</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${S.pending}</div>
                  <div class="glance-m-lbl">Pending</div>
                </div>
              </div>
            </div>

            <div class="glance-footer">
              <div class="glance-progress-track">
                <div class="glance-progress-bar" style="width: ${S.percent}%"></div>
              </div>
              <div class="glance-progress-caption">
                ${S.completed} / ${S.total} Tasks (${S.percent}% Complete)
              </div>
            </div>
          </div>

        </div>

      </div>
    `}function Ft(){const l=Bt(o.selectedDate,p.weekStartsOn),n=Dt(l[0]),r=Dt(l[6]),f=Ke(),y=o.reportPersonnelId||"all",z=o.personnelList.find(E=>String(E._id)===String(y)),N=z?z.name:"",S=o.tasks.filter(E=>{if(E.isDeleted===!0)return!1;const X=E.completionDateStr||E.dateStr||(E.dueDate?new Date(E.dueDate).toISOString().slice(0,10):""),I=E.assignedDateStr||(E.assignedDate?new Date(E.assignedDate).toISOString().slice(0,10):"")||X;if(!(E.status==="In Progress"&&I&&X?l.some(c=>c>=I&&c<=X):l.includes(X)||l.includes(I)))return!1;if(y!=="all"){const c=String(E.personnelId?._id||E.personnelId||""),i=Array.isArray(E.coOwners)&&E.coOwners.some(t=>String(t.personnelId?._id||t.personnelId||t.userId?._id||t.userId||"")===String(y));return c===String(y)||i}return!0}),P=S.length,H=S.filter(E=>E.status==="Completed").length,F=S.filter(E=>E.status==="In Progress").length,R=P>0?Math.round(H/P*100):0,x={Urgent:0,High:0,Medium:0,Low:0};return S.forEach(E=>{const X=E.priority||"Medium";x[X]!==void 0&&x[X]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3);display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span>Week Period: ${n} – ${r}</span>
              ${y!=="all"&&N?`
                <span class="badge blue" style="font-size:11.5px;padding:2px 8px;font-weight:700;">👤 Employee: ${v(N)}</span>
              `:`
                <span class="badge gray" style="font-size:11.5px;padding:2px 8px;font-weight:600;">👥 All Team Members</span>
              `}
            </div>
          </div>

          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            ${b?`
              <div style="display:inline-flex;align-items:center;gap:6px;">
                <label for="selectWeeklyReportEmployee" style="font-size:12px;font-weight:700;color:var(--text-2);white-space:nowrap;">Whose Report:</label>
                <select id="selectWeeklyReportEmployee" class="input" style="padding:6px 12px;font-size:12.5px;font-weight:600;min-width:180px;height:36px;border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);border:1px solid var(--border-sm);">
                  <option value="all" ${y==="all"?"selected":""}>👥 All Team Members</option>
                  ${o.personnelList.map(E=>`
                    <option value="${E._id}" ${String(E._id)===String(y)?"selected":""}>
                      👤 ${v(E.name)} (${v(E.department||E.role||"Member")})
                    </option>
                  `).join("")}
                </select>
              </div>
            `:""}

            <button type="button" class="ci360-btn-primary" id="btnDownloadWeeklyPdf" title="Download weekly report PDF for the selected employee">
              📄 Download Weekly Report PDF
            </button>
            <button type="button" class="ci360-btn-secondary" id="btnOpenAdminReportModal" style="background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);font-weight:700;">
              📊 Specific Admin Report (with Description & Client)
            </button>
          </div>
        </div>

        <!-- KPI Grid -->
        <div class="ci360-report-kpis">
          <div class="card kpi">
            <span class="label">Total Weekly Tasks</span>
            <span class="value" style="font-size:28px">${P}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${H}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${F}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${R}%</span>
          </div>
        </div>

        <!-- Daily Breakdown Table -->
        <div class="card" style="margin-top:20px;padding:20px">
          <h3 style="margin:0 0 16px;font-size:16px">Daily Completion Performance</h3>
          <div style="overflow-x:auto">
            <table class="table" style="width:100%">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Date</th>
                  <th>Total Tasks</th>
                  <th>Completed</th>
                  <th>Pending / Active</th>
                  <th>Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                ${l.map(E=>{const X=T(E),I=W(X,f);return`
                    <tr>
                      <td><strong>${Fa(E)}</strong></td>
                      <td>${Ge(E)}</td>
                      <td>${I.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${I.completed}</td>
                      <td>${I.pending+I.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${I.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${I.percent}%</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Priority Breakdown -->
        <div class="card" style="margin-top:20px;padding:20px">
          <h3 style="margin:0 0 14px;font-size:16px">Priority Distribution</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:12px">
            <div class="kpi-box pri-urgent" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--red-600)">Urgent</div>
              <div style="font-size:22px;font-weight:700">${x.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${x.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${x.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${x.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function lt(){const l=document.getElementById("btnViewDaily"),n=document.getElementById("btnViewWeekly"),r=document.getElementById("btnViewReport");l&&(l.onclick=()=>{o.viewMode="daily",U()}),n&&(n.onclick=()=>{o.viewMode="weekly",U()}),r&&(r.onclick=()=>{o.viewMode="report",U()});const f=document.getElementById("btnPrevDay"),y=document.getElementById("btnNextDay"),z=document.getElementById("btnJumpToday"),N=document.getElementById("hiddenDateInput"),S=document.getElementById("datePickerBadge");f&&(f.onclick=()=>{o.selectedDate=Kt(o.selectedDate,-1),U()}),y&&(y.onclick=()=>{o.selectedDate=Kt(o.selectedDate,1),U()}),z&&(z.onclick=()=>{o.selectedDate=Ke(),U()}),S&&N&&(S.onclick=()=>{try{typeof N.showPicker=="function"?N.showPicker():N.focus()}catch{N.focus()}},N.onchange=i=>{i.target.value&&(o.selectedDate=i.target.value,U())});const P=document.getElementById("admTeamSelect");P&&(P.onchange=i=>{o.selectedPersonnelId=i.target.value,U()});const H=document.getElementById("btnOpenAddTaskModal");H&&(H.onclick=()=>{if(o.selectedDate<Ke()){$("Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.",!0);return}Be()});const F=document.getElementById("btnPlannerActionsMenu"),R=document.getElementById("plannerActionsDropdown");F&&R&&(F.onclick=i=>{i.stopPropagation(),R.classList.toggle("hidden")},document.addEventListener("click",i=>{!R.contains(i.target)&&i.target!==F&&R.classList.add("hidden")}));const x=document.getElementById("btnActionImport");x&&(x.onclick=()=>{R?.classList.add("hidden"),vt()});const E=document.getElementById("btnActionExportPng");E&&(E.onclick=()=>{R?.classList.add("hidden"),Re()});const X=document.getElementById("btnActionExportPdf");X&&(X.onclick=()=>{R?.classList.add("hidden"),de()});const I=document.getElementById("btnActionAdminReport");I&&(I.onclick=()=>{R?.classList.add("hidden"),ct()});const L=document.getElementById("btnActionBackup");L&&(L.onclick=()=>{R?.classList.add("hidden"),ft()});const c=document.getElementById("btnActionSettings");c&&(c.onclick=()=>{R?.classList.add("hidden"),pt()})}function Le(l){if(o.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(I=>{I.onclick=()=>{o.filterStatus=I.dataset.f,U()}});const n=document.getElementById("plannerTaskSearchInp");n&&(n.oninput=I=>{const L=I.target.value;o.searchQuery=L;const c=I.target.selectionStart;U();const i=document.getElementById("plannerTaskSearchInp");if(i&&(i.focus(),c!==null))try{i.setSelectionRange(c,c)}catch{}});const r=document.getElementById("btnClearSearch");r&&(r.onclick=()=>{o.searchQuery="",U()});const f=document.getElementById("btnFocusAddTask");f&&(f.onclick=()=>{Be(null,o.selectedDate)});const y=document.getElementById("btnEmptyStateAddTask");y&&(y.onclick=()=>{Be(null,o.selectedDate)});const z=document.getElementById("quickAddTitleInp"),N=document.getElementById("quickAddCompletionDate"),S=document.getElementById("quickAddPriority"),P=document.getElementById("quickAddCategory"),H=document.getElementById("btnQuickAddSubmit"),F=async()=>{const I=Ke();if(o.selectedDate<I){$("Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.",!0);return}const L=(z?.value||"").trim();if(!L){$("Please enter a task title",!0),z?.focus();return}const c=(N?.value||"").trim()||o.selectedDate;if(c<I){$("Cannot set completion date on a previous date.",!0);return}try{const i={title:L,assignedDate:o.selectedDate,assignedDateStr:o.selectedDate,dateStr:c,completionDate:c,completionDateStr:c,dueDate:c,priority:S?.value||p.defaultPriority,category:P?.value||"General",status:"Pending"};if(b){const k=document.getElementById("quickAddAssignee")?.value;k==="all"?(i.assignAll=!0,i.personnelId="all"):k?i.personnelId=k:o.selectedPersonnelId!=="all"&&(i.personnelId=o.selectedPersonnelId)}const t=await ve("/tasks",i);o.tasks.unshift(t),$("Task added to today's focus! ✨"),z&&(z.value="",z.focus()),U()}catch(i){$(i.message,!0)}};H&&(H.onclick=F),z&&(z.onkeydown=I=>{I.key==="Enter"&&F()}),document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(I=>{I.onclick=()=>{const L=I.dataset.empKey;o.collapsedEmployees[L]=!o.collapsedEmployees[L],U()}});const R=document.getElementById("btnToggleEmpGrouping");R&&(R.onclick=()=>{o.groupByEmployee=!o.groupByEmployee,U()});const x=document.getElementById("btnExpandAllEmp");x&&(x.onclick=()=>{o.collapsedEmployees={},U()});const E=document.getElementById("btnCollapseAllEmp");E&&(E.onclick=()=>{document.querySelectorAll(".ci360-emp-group-card").forEach(I=>{const L=I.dataset.empKey;L&&(o.collapsedEmployees[L]=!0)}),U()});const X=document.getElementById("btnEmptyStateImport");X&&(X.onclick=()=>vt())}if(o.viewMode==="weekly"){const n=document.getElementById("btnPrevWeek"),r=document.getElementById("btnNextWeek"),f=document.getElementById("btnThisWeek");n&&(n.onclick=()=>{o.selectedDate=Kt(o.selectedDate,-7),U()}),r&&(r.onclick=()=>{o.selectedDate=Kt(o.selectedDate,7),U()}),f&&(f.onclick=()=>{o.selectedDate=Ke(),U()}),document.querySelectorAll(".day-col-header").forEach(y=>{y.onclick=()=>{o.selectedDate=y.dataset.date,o.viewMode="daily",U()}}),document.querySelectorAll('[data-action="add-day"]').forEach(y=>{y.onclick=()=>{Be(null,y.dataset.date)}})}if(o.viewMode==="report"){const n=document.getElementById("selectWeeklyReportEmployee");n&&(n.onchange=y=>{o.reportPersonnelId=y.target.value,U()});const r=document.getElementById("btnDownloadWeeklyPdf");r&&(r.onclick=()=>de({personnelId:o.reportPersonnelId||"all"}));const f=document.getElementById("btnOpenAdminReportModal");f&&(f.onclick=()=>ct())}s.querySelectorAll('[data-action="toggle"]').forEach(n=>{n.onclick=async r=>{r.stopPropagation();const f=n.dataset.id;await dt(f)}}),s.querySelectorAll('[data-action="edit"]').forEach(n=>{n.onclick=r=>{r.stopPropagation();const f=n.dataset.id,y=o.tasks.find(z=>z._id===f);y&&Be(y)}}),s.querySelectorAll('[data-action="delete"]').forEach(n=>{n.onclick=async r=>{r.stopPropagation();const f=n.dataset.id;await wt(f)}})}async function dt(l){const n=o.tasks.find(f=>f._id===l);if(!n)return;const r=n.status!=="Completed";try{const f=await at(`/tasks/${l}/toggle`,{}),y=o.tasks.findIndex(z=>z._id===l);y!==-1&&(o.tasks[y]=f),r?(p.soundEnabled&&Pa(),$("Task marked as completed! 🎉")):$("Task reopened as pending."),U()}catch(f){$(f.message,!0)}}async function wt(l){const n=o.tasks.find(r=>r._id===l);if(n&&confirm(`Are you sure you want to remove "${n.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await nt(`/tasks/${l}`),o.tasks=o.tasks.filter(r=>r._id!==l),$("Task removed from planner (safely stored in database archive)"),U()}catch(r){$(r.message,!0)}}function Be(l=null,n=null){const r=!!l,f=Ke(),y=l?l.assignedDateStr||(l.assignedDate?new Date(l.assignedDate).toISOString().slice(0,10):"")||l.dateStr||(l.createdAt?new Date(l.createdAt).toISOString().slice(0,10):o.selectedDate):n&&n>=f?n:o.selectedDate>=f?o.selectedDate:f;l?l.completionDateStr||l.dueDate&&new Date(l.dueDate).toISOString().slice(0,10):n&&n>=f||o.selectedDate>=f&&o.selectedDate;const z=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${r?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${v(l?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${v(l?.description||"")}</textarea>
          </div>

          <!-- Date Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${y}" ${r?"":`min="${f}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${l?.completionDateStr||(l?.dueDate?new Date(l.dueDate).toISOString().slice(0,10):"")}" ${r?"":`min="${f}"`} placeholder="Defaults to that day">
              <small style="color:var(--text-3);font-size:11px;">If left blank, will default to that day (${y})</small>
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${l?.priority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!l&&p.defaultPriority==="Medium"||l?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!l&&p.defaultPriority==="High"||l?.priority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${l?.priority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${l?.status==="Pending"||l?.status==="Todo"||!l?"selected":""}>Pending</option>
                <option value="In Progress" ${l?.status==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${l?.status==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskClientName">Client Name</label>
              <input type="text" id="taskClientName" class="input" list="clientOptions" placeholder="Enter or select client name..." value="${v(l?.clientName||(l?.category&&l.category!=="General"?l.category:""))}">
              <datalist id="clientOptions">
                ${(o.clientList||[]).map(L=>`<option value="${v(L.name)}">`).join("")}
                <option value="Internal CI">
                <option value="General">
              </datalist>
            </div>
          </div>

          <!-- Superadmin Assign To -->
          ${b?`
            <div class="form-group">
              <label for="taskAssignee">Primary Assignee / Owner</label>
              <select id="taskAssignee" class="input">
                <option value="me" ${!l||!l?.personnelId&&!l?.assignAll?"selected":""}>Myself (Admin)</option>
                <option value="all" ${l?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${o.personnelList.map(L=>{const c=l?.personnelId?._id===L._id||l?.personnelId===L._id;return`<option value="${L._id}" ${c?"selected":""}>👤 ${v(L.name)} (${v(L.department||L.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <!-- Co-Owners / Multiple Collaborators -->
          <div class="form-group" style="margin-top:10px;">
            <label style="display:flex;justify-content:space-between;align-items:center;">
              <span>Co-Owners / Additional People</span>
              <small style="color:var(--text-3);font-size:11px;">Add multiple collaborators for this task</small>
            </label>
            <div id="coOwnersSelectedContainer" style="display:flex;flex-wrap:wrap;gap:6px;min-height:28px;margin:4px 0 8px;"></div>
            <select id="taskCoOwnerSelect" class="input">
              <option value="">+ Add Co-Owner / Collaborator...</option>
              ${o.personnelList.map(L=>`
                <option value="${L._id}">+ 👤 ${v(L.name)} (${v(L.department||L.role||"Member")})</option>
              `).join("")}
            </select>
          </div>

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${r?`
                <button type="button" class="btn danger small" id="btnModalDeleteTask" style="padding:6px 12px;background:#ef4444;color:#fff;border-radius:var(--r-sm);border:none;cursor:pointer;font-weight:700;font-size:12px;">🗑️ Delete Task</button>
              `:""}
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
              <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
                ${r?"Save Changes":"Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    `,N=qt(z),S=N.querySelector("#taskForm"),P=N.querySelector("#btnModalClose"),H=N.querySelector("#btnCancelModal"),F=N.querySelector("#btnModalDeleteTask"),R=()=>N.remove();P&&(P.onclick=R),H&&(H.onclick=R),F&&l&&(F.onclick=async()=>{R(),await wt(l._id)});let x=[];l&&Array.isArray(l.coOwners)&&(x=l.coOwners.map(L=>({personnelId:L.personnelId?._id||L.personnelId||null,userId:L.userId?._id||L.userId||null,name:L.name||L.personnelId?.name||"",role:L.role||L.personnelId?.role||"",department:L.department||L.personnelId?.department||""})).filter(L=>L.personnelId||L.name));const E=N.querySelector("#coOwnersSelectedContainer"),X=N.querySelector("#taskCoOwnerSelect"),I=()=>{if(E){if(x.length===0){E.innerHTML='<span style="font-size:11.5px;color:var(--text-4);font-style:italic;">No co-owners added yet</span>';return}E.innerHTML=x.map((L,c)=>`
        <span class="co-owner-chip" style="display:inline-flex;align-items:center;gap:6px;background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);border-radius:16px;padding:3px 10px;font-size:12px;font-weight:600;">
          👤 ${v(L.name)}
          <button type="button" class="btn-remove-co" data-idx="${c}" style="background:transparent;border:none;color:var(--accent);cursor:pointer;font-size:14px;line-height:1;padding:0;margin-left:2px;font-weight:bold;" title="Remove co-owner">×</button>
        </span>
      `).join(""),E.querySelectorAll(".btn-remove-co").forEach(L=>{L.onclick=()=>{const c=parseInt(L.dataset.idx,10);x.splice(c,1),I()}})}};I(),X&&(X.onchange=()=>{const L=X.value;if(!L)return;const c=o.personnelList.find(i=>String(i._id)===String(L));c&&(x.some(t=>String(t.personnelId)===String(c._id))||(x.push({personnelId:c._id,name:c.name,role:c.role||"",department:c.department||""}),I())),X.value=""}),S.onsubmit=async L=>{L.preventDefault();const c=N.querySelector("#taskTitle").value.trim(),i=N.querySelector("#taskDesc").value.trim(),t=N.querySelector("#taskDate").value||y,A=N.querySelector("#taskCompletionDate")?.value?.trim()||t||o.selectedDate,M=N.querySelector("#taskPriority").value,D=N.querySelector("#taskStatus").value,Y=(N.querySelector("#taskClientName")?.value||N.querySelector("#taskCategory")?.value||"").trim(),ee=Y||"General";if(!c){$("Task title is required",!0);return}if(!r&&(A<f||t<f)){$("Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.",!0);return}const O={title:c,description:i,assignedDate:t,assignedDateStr:t,dateStr:A,completionDate:A,completionDateStr:A,dueDate:A,startTime:"",dueTime:"",priority:M,status:D,category:ee,clientName:Y,coOwners:x};if(b){const Q=N.querySelector("#taskAssignee")?.value;Q==="all"?(O.assignAll=!0,O.personnelId="all"):Q==="me"?O.personnelId="me":Q&&(O.personnelId=Q)}const _=N.querySelector("#btnSaveTask");_.disabled=!0,_.textContent="Saving...";try{if(r){const Q=await Jt(`/tasks/${l._id}`,O),ie=o.tasks.findIndex(ae=>ae._id===l._id);ie!==-1&&(o.tasks[ie]=Q),$("Task updated successfully! ✍️")}else{const Q=await ve("/tasks",O);Array.isArray(Q.tasks)?Q.tasks.forEach(ie=>o.tasks.unshift(ie)):o.tasks.unshift(Q),$("Task created successfully! ✨")}R(),U()}catch(Q){$(Q.message,!0),_.disabled=!1,_.textContent=r?"Save Changes":"Create Task"}}}function vt(){let l=[];const n=`
      <div class="ci360-planner-modal import-modal" style="max-width:680px">
        <div class="ci360-modal-header">
          <div>
            <h3>Import Task List</h3>
            <p style="font-size:12px;color:var(--text-3);margin:2px 0 0">Paste tasks or upload a plain-text (.txt) file — one task per line.</p>
          </div>
          <button type="button" class="ci360-modal-close" id="btnImportClose">×</button>
        </div>

        <div class="ci360-modal-form">
          
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="importTargetDate" class="required">Target Date for Tasks</label>
              <input type="date" id="importTargetDate" class="input" value="${o.selectedDate<Ke()?Ke():o.selectedDate}" min="${Ke()}">
            </div>

            <div class="form-group flex-1">
              <label for="importPriority">Default Priority</label>
              <select id="importPriority" class="input">
                <option value="Low">Low</option>
                <option value="Medium" selected>Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="importCategory">Default Category</label>
              <input type="text" id="importCategory" class="input" value="General">
            </div>
          </div>

          <!-- File Upload Zone -->
          <div class="ci360-dropzone" id="importDropzone">
            <input type="file" id="importFileInput" accept=".txt,text/plain" style="display:none">
            <div class="drop-icon">📄</div>
            <div class="drop-text">
              <strong>Click to upload .txt file</strong> or drag and drop here
            </div>
            <div class="drop-sub" id="importFileInfo">One task per line formatted in plain text</div>
          </div>

          <!-- Paste Textarea -->
          <div class="form-group" style="margin-top:12px">
            <label for="importTextarea">Or Paste Tasks Directly (one task per line):</label>
            <textarea id="importTextarea" class="input" rows="6" placeholder="Finalize onboarding wireframes&#10;Conduct team sync at 11am&#10;Review client contract terms&#10;Deploy frontend v1.6"></textarea>
          </div>

          <!-- Live Preview Box -->
          <div class="ci360-import-preview-wrap">
            <div class="preview-header">
              <strong id="previewCountLabel">Preview (0 tasks found)</strong>
              <span id="previewNotice" style="font-size:12px;color:var(--text-3)"></span>
            </div>
            <div class="preview-list" id="previewListArea">
              <div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">
                Paste lines or upload a file above to preview tasks before importing.
              </div>
            </div>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelImport">Cancel</button>
            <button type="button" class="ci360-btn-primary" id="btnConfirmImport" disabled>
              Import 0 Tasks
            </button>
          </div>

        </div>
      </div>
    `,r=qt(n),f=()=>r.remove();r.querySelector("#btnImportClose").onclick=f,r.querySelector("#btnCancelImport").onclick=f;const y=r.querySelector("#importTextarea"),z=r.querySelector("#importFileInput"),N=r.querySelector("#importDropzone"),S=r.querySelector("#previewListArea"),P=r.querySelector("#previewCountLabel"),H=r.querySelector("#btnConfirmImport"),F=r.querySelector("#importFileInfo");function R(E){if(!E)return[];const X=E.split(/\r?\n/),I=[];for(let L of X)L=L.trim(),L&&(L=L.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),L=L.replace(/^[-*•]\s+/,""),L=L.replace(/^\d+[\.\)]\s+/,""),L=L.trim(),L&&I.push(L));return I}function x(){const E=y.value,X=R(E),I=r.querySelector("#importTargetDate").value,L=T(I),c=new Set(L.map(i=>(i.title||"").trim().toLowerCase()));l=[];for(const i of X){const t=c.has(i.toLowerCase());l.push({title:i,isDuplicate:t})}if(P.textContent=`Preview (${l.length} ${l.length===1?"task":"tasks"} found)`,H.disabled=l.length===0,H.textContent=`Import ${l.length} ${l.length===1?"Task":"Tasks"}`,l.length===0){S.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}S.innerHTML=l.map((i,t)=>`
        <div class="preview-item ${i.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${t+1}.</span>
          <span class="preview-title">${v(i.title)}</span>
          ${i.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}y.oninput=x,N.onclick=()=>z.click(),z.onchange=E=>{const X=E.target.files[0];if(!X)return;F.textContent=`File selected: ${X.name} (${Math.round(X.size/1024)} KB)`;const I=new FileReader;I.onload=L=>{y.value=L.target.result,x()},I.readAsText(X)},N.ondragover=E=>{E.preventDefault(),N.classList.add("dragover")},N.ondragleave=()=>N.classList.remove("dragover"),N.ondrop=E=>{E.preventDefault(),N.classList.remove("dragover");const X=E.dataTransfer.files[0];if(X&&(X.type==="text/plain"||X.name.endsWith(".txt"))){F.textContent=`File dropped: ${X.name}`;const I=new FileReader;I.onload=L=>{y.value=L.target.result,x()},I.readAsText(X)}else $("Please drop a valid .txt plain-text file",!0)},H.onclick=async()=>{if(l.length===0)return;H.disabled=!0,H.textContent="Importing...";const E=r.querySelector("#importTargetDate").value;if(E<Ke()){$("Cannot import tasks for previous dates. Target date must be today or later.",!0),H.disabled=!1,H.textContent=`Import ${l.length} ${l.length===1?"Task":"Tasks"}`;return}const X=r.querySelector("#importPriority").value,I=r.querySelector("#importCategory").value.trim()||"General",L={date:E,tasks:l.map(c=>({title:c.title,priority:X,category:I,status:"Pending"}))};b&&o.selectedPersonnelId!=="all"&&(L.personnelId=o.selectedPersonnelId);try{const c=await ve("/tasks/bulk-import",L);Array.isArray(c.tasks)&&c.tasks.forEach(i=>o.tasks.unshift(i)),$(`Imported ${c.importedCount} tasks successfully! (${c.skippedCount} skipped duplicates)`),f(),o.selectedDate=E,U()}catch(c){$(c.message,!0),H.disabled=!1,H.textContent="Retry Import"}}}async function Re(){const l=T(o.selectedDate),n=W(l,Ke()),r=Dt(o.selectedDate),f=2,y=800,z=160,N=90,S=74,P=70,H=Math.max(120,l.length*S),F=z+N+H+P,R=document.createElement("canvas");R.width=y*f,R.height=F*f;const x=R.getContext("2d");x.scale(f,f);const E=document.documentElement.getAttribute("data-theme")==="dark",X=E?"#020713":"#F0F6FF",I=E?"#081226":"#FFFFFF",L=E?"rgba(56, 189, 248, 0.16)":"#E2E8F0",c=E?"#F8FAFC":"#0F172A",i=E?"#8EA4C8":"#475569",t="#0070F3",k="#10B981",A="#F59E0B";x.fillStyle=X,x.fillRect(0,0,y,F),x.fillStyle=I,je(x,24,20,y-48,z-30,16),x.fill(),x.strokeStyle=L,x.lineWidth=1,x.stroke(),x.fillStyle=t,x.font="bold 12px Inter, sans-serif",x.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),x.fillStyle=c,x.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',x.fillText(r,44,86),x.fillStyle=i,x.font="13px Inter, sans-serif",x.fillText(`Planned focus list · ${n.completed} of ${n.total} tasks completed (${n.percent}%)`,44,114);const M=z+6;x.fillStyle=I,je(x,24,M,y-48,N-16,12),x.fill(),x.stroke();const D=[{label:"TOTAL TASKS",val:String(n.total),color:c},{label:"COMPLETED",val:String(n.completed),color:k},{label:"IN PROGRESS",val:String(n.inProgress),color:A},{label:"PENDING",val:String(n.pending),color:i},{label:"PROGRESS",val:`${n.percent}%`,color:t}],Y=(y-48)/D.length;D.forEach((_,Q)=>{const ie=24+Q*Y+20;x.fillStyle=_.color,x.font="bold 20px Inter, sans-serif",x.fillText(_.val,ie,M+36),x.fillStyle=i,x.font="10px Inter, sans-serif",x.fillText(_.label,ie,M+54)});const ee=M+N;x.fillStyle=I,je(x,24,ee,y-48,H+10,16),x.fill(),x.stroke(),l.length===0?(x.fillStyle=i,x.font="14px Inter, sans-serif",x.textAlign="center",x.fillText("No scheduled tasks recorded for this date.",y/2,ee+60),x.textAlign="left"):l.forEach((_,Q)=>{const ie=ee+16+Q*S,ae=_.status==="Completed";x.beginPath(),x.arc(48,ie+14,10,0,Math.PI*2),ae?(x.fillStyle=k,x.fill(),x.strokeStyle="#FFFFFF",x.lineWidth=2,x.beginPath(),x.moveTo(44,ie+14),x.lineTo(47,ie+17),x.lineTo(52,ie+11),x.stroke()):(x.strokeStyle=L,x.lineWidth=2,x.stroke()),x.fillStyle=ae?i:c,x.font=`${ae?"normal":"500"} 14px Inter, sans-serif`;const pe=_.title.length>55?_.title.slice(0,52)+"...":_.title;if(x.fillText(pe,70,ie+18),ae){const ue=x.measureText(pe);x.strokeStyle=i,x.lineWidth=1.2,x.beginPath(),x.moveTo(70,ie+14),x.lineTo(70+ue.width,ie+14),x.stroke()}const ge=_.priority||"Medium";let le="#E2E8F0",xe="#334155";ge==="Urgent"?(le="#FEE2E2",xe="#DC2626"):ge==="High"?(le="#FEF3C7",xe="#D97706"):ge==="Low"&&(le="#ECFDF5",xe="#059669"),x.fillStyle=le,je(x,y-150,ie+4,60,20,10),x.fill(),x.fillStyle=xe,x.font="bold 10px Inter, sans-serif",x.fillText(ge,y-138,ie+18);const We=_.createdByName||_.createdBy?.name||(_.createdBy?.email?_.createdBy.email.split("@")[0]:"")||_.personnelId?.name||_.userId?.name||"Member",Z=_.completionDateStr||_.dateStr||"",De=[];De.push(`✍️ Added by: ${We}`),Z&&De.push(`📅 Due: ${Ge(Z)}`),_.dueTime&&De.push(`🕒 ${_.dueTime}`),_.category&&_.category!=="General"&&De.push(`#${_.category}`);const Ne=De.join("   ·   ");x.fillStyle=i,x.font="11px Inter, sans-serif",x.fillText(Ne,70,ie+36),Q<l.length-1&&(x.strokeStyle=L,x.lineWidth=.6,x.beginPath(),x.moveTo(40,ie+54),x.lineTo(y-40,ie+54),x.stroke())});const O=F-35;x.fillStyle=i,x.font="11px Inter, sans-serif",x.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,O);try{const _=R.toDataURL("image/png"),Q=document.createElement("a");Q.href=_,Q.download=`ci360-daily-planner-${o.selectedDate}.png`,document.body.appendChild(Q),Q.click(),Q.remove(),$("Daily Planner image exported! 🖼️")}catch(_){$("Failed to export image: "+_.message,!0)}}function je(l,n,r,f,y,z){l.beginPath(),l.moveTo(n+z,r),l.lineTo(n+f-z,r),l.quadraticCurveTo(n+f,r,n+f,r+z),l.lineTo(n+f,r+y-z),l.quadraticCurveTo(n+f,r+y,n+f-z,r+y),l.lineTo(n+z,r+y),l.quadraticCurveTo(n,r+y,n,r+y-z),l.lineTo(n,r+z),l.quadraticCurveTo(n,r,n+z,r),l.closePath()}function de(l={}){const n=Bt(o.selectedDate,p.weekStartsOn),r=Dt(n[0]),f=Dt(n[6]),y=Ke();let z=o.tasks.filter(I=>{if(I.isDeleted===!0)return!1;const L=I.completionDateStr||I.dateStr||(I.dueDate?new Date(I.dueDate).toISOString().slice(0,10):""),c=I.assignedDateStr||(I.assignedDate?new Date(I.assignedDate).toISOString().slice(0,10):"")||L;return l.scope==="today"?L===y||c===y:l.scope==="all"?!0:I.status==="In Progress"&&c&&L?n.some(i=>i>=c&&i<=L):n.includes(L)||n.includes(c)});l.personnelId&&l.personnelId!=="all"&&(z=z.filter(I=>{const L=String(I.personnelId?._id||I.personnelId||""),c=Array.isArray(I.coOwners)&&I.coOwners.some(i=>String(i.personnelId?._id||i.personnelId||i.userId?._id||i.userId||"")===String(l.personnelId));return L===String(l.personnelId)||c})),l.status&&l.status!=="all"&&(z=z.filter(I=>I.status===l.status));const N=z.length,S=z.filter(I=>I.status==="Completed").length,P=z.filter(I=>I.status==="In Progress").length,H=N>0?Math.round(S/N*100):0,F=window.open("","_blank");if(!F){$("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const R=l.title||(l.isAdminReport?"CI360 Admin Detailed Executive Report":"Weekly Productivity Report"),x=l.scope==="today"?`Date: ${Dt(y)}`:l.scope==="all"?"All Active & Historical Tasks":`${r} – ${f}`;let E="";if(l.personnelId&&l.personnelId!=="all"){const I=o.personnelList.find(L=>String(L._id)===String(l.personnelId));I&&(E=`👤 Employee: ${I.name} (${I.department||I.role||"Member"})`)}const X=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${v(R)} — ${x}</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.4; padding: 12px; margin: 0; }
          .header { border-bottom: 2.5px solid #0070F3; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
          .brand { font-size: 11px; font-weight: 800; color: #0070F3; letter-spacing: 0.6px; text-transform: uppercase; }
          h1 { margin: 4px 0 2px; font-size: 22px; color: #0f172a; }
          .period { font-size: 13px; color: #475569; font-weight: 500; }
          .filter-tag { display: inline-block; font-size: 11px; color: #0369A1; background: #E0F2FE; padding: 2px 8px; border-radius: 4px; font-weight: 600; margin-left: 8px; }
          
          .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 18px; }
          .kpi { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; }
          .kpi-num { font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 3px; }
          .kpi-label { font-size: 10.5px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.3px; }
          
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11.5px; }
          th { text-align: left; background: #f1f5f9; padding: 8px 10px; border: 1px solid #cbd5e1; font-weight: 700; color: #334155; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3px; }
          td { padding: 8px 10px; border: 1px solid #e2e8f0; vertical-align: top; }
          tr:nth-child(even) td { background: #fbfcfe; }
          
          .client-tag { display: inline-block; background: #ecfdf5; color: #047857; font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 10.5px; border: 1px solid #a7f3d0; }
          .owner-tag { font-weight: 700; color: #1e293b; }
          .co-owner-sub { font-size: 10px; color: #0284C7; font-weight: 600; display: block; margin-top: 2px; }
          .desc-text { font-size: 10.5px; color: #475569; white-space: pre-wrap; line-height: 1.35; max-width: 280px; word-break: break-word; }
          
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; }
          .badge-urgent { background: #fee2e2; color: #b91c1c; }
          .badge-high { background: #fef3c7; color: #b45309; }
          .badge-med { background: #e0e7ff; color: #0369a1; }
          .badge-low { background: #ecfdf5; color: #047857; }
          
          .status-tag { display: inline-block; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; font-weight: 700; }
          .status-completed { background: #dcfce7; color: #15803d; }
          .status-in-progress { background: #fef3c7; color: #b45309; }
          .status-pending { background: #f1f5f9; color: #475569; }
          
          .footer { margin-top: 24px; font-size: 10.5px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 8px; display: flex; justify-content: space-between; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">CI360 Intelligence Productivity Suite · Official Report</div>
            <h1>${v(R)}</h1>
            <div class="period">
              ${x}
              ${E?`<span class="filter-tag" style="background:#dbeafe;color:#1e40af;font-weight:700;">${v(E)}</span>`:""}
              ${l.filterSummary?`<span class="filter-tag">${v(l.filterSummary)}</span>`:""}
            </div>
          </div>
          <div style="text-align:right" class="no-print">
            <button onclick="window.print()" style="padding:8px 16px;background:#0070F3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:13px;box-shadow:0 2px 4px rgba(0,112,243,0.3);">🖨️ Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${N}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${S}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">In Progress</div>
            <div class="kpi-num" style="color:#f59e0b">${P}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#0070F3">${H}%</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width:11%">Date</th>
              <th style="width:13%">Client Name</th>
              <th style="width:15%">Job Owner / Assignee</th>
              <th style="width:18%">Task Title</th>
              <th style="width:23%">Description / Deliverables</th>
              <th style="width:8%">Priority</th>
              <th style="width:12%">Status</th>
            </tr>
          </thead>
          <tbody>
            ${z.length===0?`
              <tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;font-weight:600">No scheduled tasks match the selected criteria.</td></tr>
            `:z.map(I=>{const L=I.completionDateStr||I.dateStr||(I.dueDate?new Date(I.dueDate).toISOString().slice(0,10):"—"),c=I.assignedDateStr||(I.assignedDate?new Date(I.assignedDate).toISOString().slice(0,10):""),i=I.status==="In Progress"&&c&&L&&c!==L?`${Ge(c)} ➔ ${Ge(L)}`:Ge(L),t=I.jobId?.preferredPersonName||I.jobId?.assignments&&I.jobId.assignments[0]?.personId?.name||I.personnelId?.name||I.userId?.name||I.createdByName||"—",k=I.clientId?.name||I.jobId?.clientId?.name||I.clientId?.company||""||"—",A=I.description?v(I.description):'<span style="color:#cbd5e1">—</span>',M=Array.isArray(I.coOwners)&&I.coOwners.length>0?I.coOwners.map(O=>O.name).filter(Boolean).join(", "):"",D=(I.priority||"medium").toLowerCase(),Y=D==="urgent"?"badge-urgent":D==="high"?"badge-high":D==="low"?"badge-low":"badge-med",ee=(I.status||"pending").toLowerCase().replace(/\s+/g,"-");return`
                <tr>
                  <td><strong>${i}</strong></td>
                  <td><span class="client-tag">${v(k)}</span></td>
                  <td>
                    <span class="owner-tag">${v(t)}</span>
                    ${M?`<span class="co-owner-sub">👥 Co: ${v(M)}</span>`:""}
                  </td>
                  <td><strong>${v(I.title)}</strong></td>
                  <td><div class="desc-text">${A}</div></td>
                  <td><span class="badge ${Y}">${v(I.priority||"Medium")}</span></td>
                  <td><span class="status-tag status-${ee}">${v(I.status||"Pending")}</span></td>
                </tr>
              `}).join("")}
          </tbody>
        </table>

        <div class="footer">
          <span>Generated automatically by CI360 Daily Planner & Task Manager</span>
          <span>Printed on: ${new Date().toLocaleString()}</span>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
          };
        <\/script>
      </body>
      </html>
    `;F.document.write(X),F.document.close(),$("Report generated for printing & PDF download! 📄")}function ct(){const l=Ke(),n=Bt(o.selectedDate,p.weekStartsOn),r=Ge(n[0]),f=Ge(n[6]),y=`
      <div class="ci360-planner-modal" style="max-width:540px;">
        <div class="ci360-modal-header">
          <h3>📊 Download Specific Admin Report</h3>
          <button type="button" class="ci360-modal-close" id="btnAdminRepClose">×</button>
        </div>

        <div class="ci360-modal-form">
          <p style="font-size:12.5px;color:var(--text-3);margin:0 0 16px;">
            Export a comprehensive administrative report containing full <strong>Task Descriptions</strong>, <strong>Client Names</strong>, <strong>Job Owners</strong>, and <strong>Co-Owners</strong>.
          </p>

          <!-- Report Scope -->
          <div class="form-group">
            <label for="admRepScope">Date Range / Scope</label>
            <select id="admRepScope" class="input">
              <option value="week" selected>Current Week (${r} – ${f})</option>
              <option value="today">Today Only (${Ge(l)})</option>
              <option value="all">All Available Tasks</option>
            </select>
          </div>

          <!-- Employee Filter -->
          <div class="form-group">
            <label for="admRepPersonnel">Filter by Employee / Person</label>
            <select id="admRepPersonnel" class="input">
              <option value="all" ${!o.reportPersonnelId||o.reportPersonnelId==="all"?"selected":""}>👥 All Team Members</option>
              ${o.personnelList.map(x=>`
                <option value="${x._id}" ${String(x._id)===String(o.reportPersonnelId)?"selected":""}>👤 ${v(x.name)} (${v(x.department||x.role||"Member")})</option>
              `).join("")}
            </select>
          </div>

          <!-- Status Filter -->
          <div class="form-group">
            <label for="admRepStatus">Filter by Status</label>
            <select id="admRepStatus" class="input">
              <option value="all" selected>All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <!-- Feature Highlights Checklist -->
          <div style="background:var(--bg-hover);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:10px 14px;margin-bottom:18px;font-size:12px;color:var(--text-2);">
            <div style="font-weight:700;margin-bottom:4px;color:var(--text-1);">Included in this export:</div>
            <div>✓ <strong>Job Owner Name</strong> & Primary Assignee</div>
            <div>✓ <strong>Client Name</strong> & Account association</div>
            <div>✓ Full <strong>Task Description / Notes</strong></div>
            <div>✓ Multiple <strong>Co-Owners & Collaborators</strong></div>
            <div>✓ Priority, Category, and Real-time Status</div>
          </div>

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <button type="button" class="ci360-btn-secondary" id="btnAdminRepCancel">Cancel</button>
            <div style="display:flex;gap:8px;">
              <button type="button" class="btn small" id="btnAdminRepCsv" style="background:#059669;color:#fff;font-weight:700;border:none;border-radius:var(--r-sm);padding:8px 14px;cursor:pointer;">
                📊 Export CSV / Excel
              </button>
              <button type="button" class="ci360-btn-primary" id="btnAdminRepPdf" style="font-weight:700;padding:8px 16px;">
                📄 Download Admin PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    `,z=qt(y),N=z.querySelector("#btnAdminRepClose"),S=z.querySelector("#btnAdminRepCancel"),P=z.querySelector("#btnAdminRepPdf"),H=z.querySelector("#btnAdminRepCsv"),F=()=>z.remove();N&&(N.onclick=F),S&&(S.onclick=F);const R=()=>{const x=z.querySelector("#admRepScope")?.value||"week",E=z.querySelector("#admRepPersonnel")?.value||"all",X=z.querySelector("#admRepStatus")?.value||"all";let I="";if(E!=="all"){const L=o.personnelList.find(c=>String(c._id)===String(E));L&&(I+=`Person: ${L.name} · `)}return X!=="all"&&(I+=`Status: ${X}`),{scope:x,personnelId:E,status:X,filterSummary:I.replace(/\s*·\s*$/,"")}};P&&(P.onclick=()=>{const x=R();F(),de({...x,isAdminReport:!0,title:"CI360 Admin Detailed Executive Task Report"})}),H&&(H.onclick=()=>{const x=R();F(),we(x)})}function we(l={}){const n=Bt(o.selectedDate,p.weekStartsOn),r=Ke();let f=o.tasks.filter(F=>{if(F.isDeleted===!0)return!1;const R=F.completionDateStr||F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):""),x=F.assignedDateStr||(F.assignedDate?new Date(F.assignedDate).toISOString().slice(0,10):"")||R;return l.scope==="today"?R===r||x===r:l.scope==="all"?!0:F.status==="In Progress"&&x&&R?n.some(E=>E>=x&&E<=R):n.includes(R)||n.includes(x)});l.personnelId&&l.personnelId!=="all"&&(f=f.filter(F=>{const R=String(F.personnelId?._id||F.personnelId||""),x=Array.isArray(F.coOwners)&&F.coOwners.some(E=>String(E.personnelId?._id||E.personnelId||"")===String(l.personnelId));return R===String(l.personnelId)||x})),l.status&&l.status!=="all"&&(f=f.filter(F=>F.status===l.status));const y=["Date","Client Name","Job Owner","Primary Assignee","Co-Owners","Task Title","Description","Priority","Category","Status","Created By"],z=f.map(F=>{const R=F.completionDateStr||F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):""),x=F.jobId?.preferredPersonName||F.jobId?.assignments&&F.jobId.assignments[0]?.personId?.name||F.personnelId?.name||F.userId?.name||F.createdByName||"",E=F.clientId?.name||F.jobId?.clientId?.name||F.clientId?.company||"",X=F.personnelId?.name||F.userId?.name||"",I=Array.isArray(F.coOwners)?F.coOwners.map(D=>D.name).filter(Boolean).join("; "):"",L=F.title||"",c=F.description||"",i=F.priority||"Medium",t=F.category||"General",k=F.status||"Pending",A=F.createdByName||F.createdBy?.name||"",M=D=>`"${String(D||"").replace(/"/g,'""').replace(/\r?\n/g," ")}"`;return[M(R),M(E),M(x),M(X),M(I),M(L),M(c),M(i),M(t),M(k),M(A)].join(",")}),N="\uFEFF"+[y.join(","),...z].join(`\r
`),S=new Blob([N],{type:"text/csv;charset=utf-8;"}),P=URL.createObjectURL(S),H=document.createElement("a");H.href=P,H.download=`ci360-admin-report-${r}.csv`,document.body.appendChild(H),H.click(),document.body.removeChild(H),URL.revokeObjectURL(P),$("Admin CSV report downloaded! 📊")}function ft(){const n=qt(`
      <div class="ci360-planner-modal" style="max-width:560px">
        <div class="ci360-modal-header">
          <h3>Backup & Restore Planner</h3>
          <button type="button" class="ci360-modal-close" id="btnBackupClose">×</button>
        </div>

        <div class="ci360-modal-form">
          
          <!-- Export Section -->
          <div class="card" style="padding:16px;margin-bottom:16px;border:1px solid var(--border-sm)">
            <h4 style="margin:0 0 6px;font-size:14px;display:flex;align-items:center;gap:6px">
              <span>💾</span> Export Planner Backup
            </h4>
            <p style="font-size:12px;color:var(--text-3);margin:0 0 12px">
              Download all your planner tasks, timestamps, priorities, and descriptions as a standardized JSON backup file.
            </p>
            <button type="button" class="ci360-btn-primary" id="btnDownloadBackupJson">
              Download JSON Backup
            </button>
          </div>

          <!-- Restore Section -->
          <div class="card" style="padding:16px;border:1px solid var(--border-sm)">
            <h4 style="margin:0 0 6px;font-size:14px;display:flex;align-items:center;gap:6px">
              <span>🔄</span> Restore Planner Backup
            </h4>
            <p style="font-size:12px;color:var(--text-3);margin:0 0 12px">
              Upload a previously exported JSON backup file. Existing records will be preserved safely.
            </p>

            <input type="file" id="restoreFileInput" accept=".json,application/json" style="margin-bottom:12px">
            
            <div id="restorePreviewArea" style="display:none;background:var(--bg-elevated);padding:12px;border-radius:8px;margin-bottom:12px;font-size:12px">
              <strong id="restoreCountText">0 tasks detected in file</strong>
              <div style="margin-top:8px">
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
                  <input type="radio" name="restoreMode" value="merge" checked> Merge (skip duplicates)
                </label>
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;margin-top:4px">
                  <input type="radio" name="restoreMode" value="overwrite"> Overwrite matching tasks
                </label>
              </div>
            </div>

            <button type="button" class="ci360-btn-secondary" id="btnExecuteRestore" disabled>
              Restore Tasks
            </button>
          </div>

        </div>
      </div>
    `),r=()=>n.remove();n.querySelector("#btnBackupClose").onclick=r;const f=n.querySelector("#btnDownloadBackupJson");f.onclick=async()=>{f.disabled=!0,f.textContent="Generating backup...";try{const H=await ze("/tasks/backup"),F=new Blob([JSON.stringify(H,null,2)],{type:"application/json"}),R=URL.createObjectURL(F),x=document.createElement("a");x.href=R,x.download=`ci360-planner-backup-${Ke()}.json`,document.body.appendChild(x),x.click(),x.remove(),$("Planner backup downloaded successfully! 💾")}catch(H){$("Backup export failed: "+H.message,!0)}finally{f.disabled=!1,f.textContent="Download JSON Backup"}};const y=n.querySelector("#restoreFileInput"),z=n.querySelector("#restorePreviewArea"),N=n.querySelector("#restoreCountText"),S=n.querySelector("#btnExecuteRestore");let P=null;y.onchange=H=>{const F=H.target.files[0];if(!F)return;const R=new FileReader;R.onload=x=>{try{const E=JSON.parse(x.target.result),X=Array.isArray(E.tasks)?E.tasks:Array.isArray(E)?E:null;if(!X||X.length===0){$("Invalid backup file: No tasks found",!0);return}P=X,z.style.display="block",N.textContent=`Valid backup: ${X.length} tasks ready to restore.`,S.disabled=!1}catch(E){$("Error parsing JSON backup file: "+E.message,!0),z.style.display="none",S.disabled=!0}},R.readAsText(F)},S.onclick=async()=>{if(!P||P.length===0)return;S.disabled=!0,S.textContent="Restoring...";const H=n.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const F=await ve("/tasks/restore",{tasks:P,mode:H});$(`Restored ${F.restoredCount} tasks! (${F.skippedCount} skipped) ✨`),r(),await j()}catch(F){$("Restore failed: "+F.message,!0),S.disabled=!1,S.textContent="Retry Restore"}}}function pt(){const l=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${v(p.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${p.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${p.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${v(p.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${p.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${p.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${p.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${p.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${p.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${p.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${p.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <!-- Desktop & Laptop Notifications -->
          <div class="form-group" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);">
            <div style="font-weight:600;font-size:13px;margin-bottom:4px;color:var(--text-1);">🔔 Desktop & Laptop Notifications (Brave & All Browsers)</div>
            <div style="font-size:12px;color:var(--text-3);margin-bottom:8px;">Receive real-time popups on your laptop and browser when tasks are assigned, dates change, and due alerts arrive.</div>
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setNotifEnabled" ${typeof window<"u"&&localStorage.getItem("ci360_notif_enabled")!=="false"&&typeof Notification<"u"&&Notification.permission==="granted"?"checked":""}>
              <span>Enable Browser & Laptop Notifications</span>
            </label>
            <div style="margin-top:8px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <button type="button" class="btn ghost small" id="btnPlannerTestNotif" style="padding:4px 10px;font-size:11.5px;">🔔 Send Test Notification</button>
              <span style="font-size:11px;color:var(--text-3);" id="plannerNotifStatusLabel">${typeof Notification<"u"&&Notification.permission==="granted"?"🟢 Active on this laptop":typeof Notification<"u"&&Notification.permission==="denied"?"🔴 Blocked in browser":"⚪ Ready to enable"}</span>
            </div>
            <div style="margin-top:6px;font-size:11px;color:var(--text-3);">
              💡 <strong>Brave, Chrome & Edge Tip:</strong> Notifications show in Windows Action Center. In Brave, ensure notifications are allowed under the site shield/lock icon in the URL bar.
            </div>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,n=qt(l),r=()=>n.remove();n.querySelector("#btnSettingsClose").onclick=r,n.querySelector("#btnCancelSettings").onclick=r;const f=n.querySelector("#btnPlannerTestNotif");f&&(f.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await requestNotificationPermission()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):$("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true");const y=n.querySelector("#setNotifEnabled");y&&(y.checked=!0);const z=n.querySelector("#plannerNotifStatusLabel");z&&(z.textContent="🟢 Active on this laptop"),await triggerSystemNotification({title:"CI360 Planner Alert 🔔",message:"Laptop & browser notifications are active and ready!",id:"ci360-planner-test-"+Date.now()}),$("Test notification sent to your laptop/browser! 🔔")}),n.querySelector("#settingsForm").onsubmit=y=>{y.preventDefault(),p.displayName=n.querySelector("#setDisplayName").value.trim()||"Daily Planner",p.weekStartsOn=Number(n.querySelector("#setWeekStart").value),p.defaultPriority=n.querySelector("#setDefaultPriority").value,p.density=n.querySelector("#setDensity").value,p.soundEnabled=n.querySelector("#setSound").checked;const z=n.querySelector("#setNotifEnabled")?.checked;localStorage.setItem("ci360_notif_enabled",z?"true":"false"),z&&"Notification"in window&&Notification.permission==="default"&&requestNotificationPermission(),Ta(p),$("Planner preferences saved! ⚙️"),r(),U()}}}function La(){if(document.getElementById("ci360-planner-styles"))return;const s=document.createElement("style");s.id="ci360-planner-styles",s.textContent=`
    /* CI360 Dayfolio Planner Module Styles */
    .ci360-planner-wrap,
    .ci360-planner-wrap * {
      box-sizing: border-box !important;
    }

    .ci360-planner-wrap {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 0 60px !important;
      box-sizing: border-box !important;
      font-family: var(--font-sans);
      color: var(--text-1);
    }

    .ci360-planner-content,
    .ci360-today-focus-section,
    .ci360-tasks-container,
    .ci360-task-list,
    .ci360-quick-add-bar,
    .ci360-progress-summary-card,
    .ci360-planner-nav-strip,
    .ci360-planner-header {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
    }

    /* Header (Hero Card) */
    .ci360-planner-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      padding: 18px 24px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(224, 242, 254, 0.75) 0%, rgba(240, 249, 255, 0.88) 45%, rgba(255, 255, 255, 0.95) 100%);
      border: 1px solid rgba(186, 230, 253, 0.7);
      box-shadow: 0 4px 20px rgba(186, 230, 253, 0.28);
      flex-wrap: wrap;
    }
    [data-theme="dark"] .ci360-planner-header {
      background: linear-gradient(135deg, rgba(6, 24, 60, 0.85) 0%, rgba(5, 15, 38, 0.95) 100%);
      border: 1px solid rgba(56, 189, 248, 0.25);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(125, 211, 252, 0.18);
    }
    .ci360-planner-header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .ci360-planner-hero-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(0, 112, 243, 0.12);
      border: 1px solid rgba(0, 112, 243, 0.2);
      color: #0070F3;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 14px rgba(0, 112, 243, 0.15);
    }
    [data-theme="dark"] .ci360-planner-hero-icon {
      background: rgba(0, 112, 243, 0.2);
      border-color: rgba(56, 189, 248, 0.35);
      color: #38BDF8;
      box-shadow: 0 0 18px rgba(0, 112, 243, 0.35);
    }
    .ci360-planner-title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .ci360-planner-heading {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--text-1);
      margin: 0;
      font-family: var(--font-heading);
    }
    .ci360-planner-subheading {
      font-size: 13.5px;
      color: var(--text-3);
      margin: 0;
    }

    /* Header Actions */
    .ci360-planner-header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .ci360-view-switcher {
      display: flex;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      padding: 3px;
      gap: 2px;
      box-shadow: var(--shadow-xs);
    }
    .ci360-switch-btn {
      background: transparent;
      border: none;
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ci360-switch-btn:hover {
      color: var(--text-1);
      background: var(--bg-hover);
    }
    .ci360-switch-btn.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35);
    }
    [data-theme="dark"] .ci360-switch-btn.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      box-shadow: 0 0 16px rgba(0, 112, 243, 0.45);
    }

    .ci360-btn-primary {
      background: #0070F3;
      color: #FFFFFF;
      border: none;
      padding: 8px 18px;
      border-radius: var(--r-md);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35);
      transition: all var(--t-fast);
    }
    .ci360-btn-primary:hover {
      filter: brightness(1.08);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0, 112, 243, 0.45);
    }
    [data-theme="dark"] .ci360-btn-primary {
      box-shadow: 0 0 16px rgba(0, 112, 243, 0.45);
    }
    .ci360-btn-secondary {
      background: var(--bg-card);
      color: var(--text-2);
      border: 1px solid var(--border-sm);
      padding: 8px 14px;
      border-radius: var(--r-md);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all var(--t-fast);
    }
    .ci360-btn-secondary:hover {
      background: var(--bg-hover);
      color: var(--text-1);
      border-color: var(--border-md);
    }

    /* Dropdown */
    .ci360-dropdown-wrap {
      position: relative;
    }
    .ci360-dropdown-menu {
      position: absolute;
      right: 0;
      top: 100%;
      margin-top: 6px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      box-shadow: var(--shadow-lg);
      min-width: 260px;
      z-index: 100;
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .ci360-dropdown-menu.hidden {
      display: none !important;
    }
    .ci360-menu-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      background: transparent;
      border: none;
      border-radius: var(--r-sm);
      text-align: left;
      cursor: pointer;
      color: var(--text-1);
      transition: background var(--t-fast);
      width: 100%;
    }
    .ci360-menu-item:hover {
      background: var(--bg-hover);
    }
    .ci360-menu-item .icon {
      font-size: 16px;
      width: 24px;
      text-align: center;
    }
    .ci360-menu-item .meta strong {
      display: block;
      font-size: 12.5px;
      font-weight: 600;
    }
    .ci360-menu-item .meta small {
      display: block;
      font-size: 11px;
      color: var(--text-3);
    }
    .ci360-dropdown-divider {
      height: 1px;
      background: var(--border-xs);
      margin: 4px 0;
    }

    /* Date Nav Strip */
    .ci360-planner-nav-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      padding: 8px 16px;
      flex-wrap: wrap;
      box-shadow: var(--shadow-xs);
    }
    .ci360-date-nav-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-nav-arrow {
      background: transparent;
      border: 1px solid var(--border-sm);
      width: 32px;
      height: 32px;
      border-radius: var(--r-md);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-2);
      transition: all var(--t-fast);
    }
    .ci360-nav-arrow:hover {
      background: var(--bg-hover);
      color: var(--text-1);
    }
    .ci360-date-picker-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: var(--r-md);
      background: var(--bg-hover);
      border: 1px solid var(--border-sm);
      cursor: pointer;
      position: relative;
      user-select: none;
    }
    .ci360-date-picker-badge:hover {
      border-color: var(--accent);
    }
    .ci360-date-picker-badge .date-text {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-1);
    }
    .ci360-hidden-date-input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
      width: 1px;
      height: 1px;
    }
    .ci360-today-btn {
      background: transparent;
      border: 1px solid var(--border-sm);
      padding: 5px 14px;
      border-radius: var(--r-full);
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
    }
    .ci360-today-btn:hover {
      background: var(--bg-hover);
      color: var(--text-1);
    }
    .ci360-today-btn.is-current {
      background: #E0F2FE;
      color: #0070F3;
      border-color: #BAE6FD;
    }
    [data-theme="dark"] .ci360-today-btn.is-current {
      background: rgba(0, 112, 243, 0.2);
      color: #38BDF8;
      border-color: rgba(56, 189, 248, 0.35);
    }
    .ci360-team-filter-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-label-inline {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-3);
    }
    .ci360-select-inline {
      padding: 6px 12px;
      font-size: 12.5px;
      border-radius: var(--r-md);
      border: 1px solid var(--border-sm);
      background: var(--bg-app);
      color: var(--text-1);
      cursor: pointer;
    }

    /* Progress Summary Card */
    .ci360-progress-summary-card {
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-xl);
      padding: 16px 20px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    [data-theme="dark"] .ci360-progress-summary-card {
      background: rgba(8, 18, 38, 0.7);
      border-color: rgba(56, 189, 248, 0.16);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
    }
    .ci360-summary-main {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }
    .ci360-ring-stat {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 14px;
      background: var(--bg-app);
      border: 1px solid var(--border-xs);
      border-radius: var(--r-lg);
    }
    [data-theme="dark"] .ci360-ring-stat {
      background: rgba(10, 22, 48, 0.6);
      border-color: rgba(56, 189, 248, 0.14);
    }
    .ci360-circular-progress {
      position: relative;
      width: 64px;
      height: 64px;
    }
    .ci360-circular-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    .ci360-circular-svg .circle-bg {
      fill: none;
      stroke: var(--border-sm);
      stroke-width: 3.5;
    }
    .ci360-circular-svg .circle-fill {
      fill: none;
      stroke: #0070F3;
      stroke-width: 3.5;
      stroke-linecap: round;
      transition: stroke-dasharray 0.4s ease;
    }
    [data-theme="dark"] .ci360-circular-svg .circle-fill {
      stroke: #38BDF8;
    }
    .ring-text {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .ring-num {
      font-size: 14px;
      font-weight: 800;
      color: var(--text-1);
      line-height: 1;
    }
    .ring-label {
      font-size: 9.5px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-3);
      margin-top: 2px;
    }

    .ci360-summary-kpis {
      display: flex;
      align-items: center;
      gap: 14px;
      flex: 1;
      flex-wrap: wrap;
    }
    .kpi-box {
      display: flex;
      align-items: center;
      gap: 14px;
      background: #FFFFFF;
      padding: 12px 18px;
      border-radius: var(--r-lg);
      flex: 1;
      min-width: 140px;
      border: 1px solid var(--border-sm);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      transition: all var(--t-fast);
    }
    [data-theme="dark"] .kpi-box {
      background: rgba(8, 18, 38, 0.85);
      border-color: rgba(56, 189, 248, 0.16);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }
    .kpi-box:hover {
      transform: translateY(-1px);
    }
    .kpi-icon-wrap {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .kpi-icon-wrap.total {
      background: rgba(0, 112, 243, 0.1);
      color: #0070F3;
    }
    .kpi-icon-wrap.completed {
      background: rgba(16, 185, 129, 0.1);
      color: #10B981;
    }
    .kpi-icon-wrap.in-prog {
      background: rgba(245, 158, 11, 0.1);
      color: #F59E0B;
    }
    .kpi-icon-wrap.pending {
      background: rgba(139, 92, 246, 0.1);
      color: #8B5CF6;
    }
    .kpi-icon-wrap.overdue {
      background: rgba(239, 68, 68, 0.1);
      color: #EF4444;
    }
    .kpi-text-wrap {
      display: flex;
      flex-direction: column;
    }
    .kpi-box .kpi-num {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-1);
      line-height: 1.1;
    }
    .kpi-box .kpi-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-3);
      margin-top: 1px;
    }
    .kpi-box.completed .kpi-num { color: var(--green-500); }
    .kpi-box.in-progress .kpi-num { color: var(--amber-500); }
    .kpi-box.overdue {
      background: rgba(239, 68, 68, 0.08);
      border-color: rgba(239, 68, 68, 0.2);
    }
    .kpi-box.overdue .kpi-num { color: var(--red-500); }

    .ci360-linear-progress-wrap {
      width: 100%;
      height: 4px;
      background: var(--border-xs);
      border-radius: var(--r-full);
      overflow: hidden;
      margin-top: 10px;
    }
    .ci360-linear-bar {
      height: 100%;
      background: linear-gradient(90deg, #0070F3, #10B981);
      border-radius: var(--r-full);
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Today Focus Section */
    .ci360-today-focus-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .ci360-focus-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .ci360-focus-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ci360-focus-title {
      font-size: 19px;
      font-weight: 800;
      color: var(--text-1);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-focus-title::before {
      content: '';
      width: 3.5px;
      height: 18px;
      border-radius: 2px;
      background: #0070F3;
      display: inline-block;
    }
    .ci360-task-count-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: var(--r-full);
      background: rgba(0, 112, 243, 0.1);
      color: #0070F3;
    }
    [data-theme="dark"] .ci360-task-count-badge {
      background: rgba(0, 112, 243, 0.2);
      color: #38BDF8;
    }

    .ci360-focus-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .ci360-filter-pills {
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
      box-shadow: none !important;
    }
    .filter-pill {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 6px 14px !important;
      border-radius: 999px !important;
      font-size: 13px !important;
      font-weight: 600 !important;
      color: var(--text-3, #64748B) !important;
      cursor: pointer !important;
      transition: all var(--t-fast) !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      line-height: 1.2 !important;
    }
    [data-theme="dark"] .filter-pill {
      background: transparent !important;
      border: none !important;
      color: #8EA4C8 !important;
    }
    .filter-pill:hover {
      color: var(--text-1, #0F172A) !important;
      background: rgba(0, 0, 0, 0.04) !important;
    }
    [data-theme="dark"] .filter-pill:hover {
      color: #F8FAFC !important;
      background: rgba(255, 255, 255, 0.06) !important;
    }
    .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      font-weight: 700 !important;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35) !important;
    }
    [data-theme="dark"] .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      box-shadow: 0 0 16px rgba(0, 112, 243, 0.45) !important;
    }
    .filter-pill.overdue.active {
      background: rgba(239, 68, 68, 0.15) !important;
      color: #EF4444 !important;
    }

    .ci360-search-box {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      padding: 6px 12px;
      min-width: 180px;
      position: relative;
    }
    .ci360-search-box input {
      border: none;
      background: transparent;
      font-size: 12.5px;
      color: var(--text-1);
      outline: none;
      width: 100%;
    }
    .clear-search-btn {
      background: transparent;
      border: none;
      font-size: 14px;
      color: var(--text-4);
      cursor: pointer;
      line-height: 1;
    }

    /* Quick-Add Bar */
    .ci360-quick-add-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      padding: 10px 16px;
      box-shadow: var(--shadow-xs);
      flex-wrap: wrap;
      transition: border-color var(--t-fast);
    }
    .ci360-quick-add-bar:focus-within {
      border-color: var(--accent);
      border-style: solid;
    }
    .ci360-quick-add-input-wrap {
      flex: 1;
      min-width: 240px;
    }
    .ci360-quick-input {
      width: 100%;
      border: none;
      background: transparent;
      font-size: 14px;
      color: var(--text-1);
      outline: none;
      font-family: inherit;
    }
    .ci360-quick-input::placeholder {
      color: var(--text-4);
    }
    .ci360-quick-add-meta {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-quick-select {
      background: var(--bg-app);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-sm);
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 500;
      color: var(--text-2);
      outline: none;
      cursor: pointer;
    }
    .ci360-quick-add-btn {
      background: #0070F3;
      color: #FFFFFF;
      border: none;
      border-radius: var(--r-md);
      padding: 7px 16px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all var(--t-fast);
      box-shadow: 0 2px 6px rgba(0, 112, 243, 0.3);
    }
    .ci360-quick-add-btn:hover {
      filter: brightness(1.08);
      transform: translateY(-1px);
    }

    /* Task List & Cards */
    .ci360-task-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .ci360-task-card {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-left: 3.5px solid #0070F3;
      border-radius: 14px;
      padding: 14px 16px;
      box-shadow: var(--shadow-xs);
      transition: all var(--t-fast);
    }
    [data-theme="dark"] .ci360-task-card {
      background: rgba(8, 18, 38, 0.85);
      border-color: rgba(56, 189, 248, 0.16);
      border-left: 3.5px solid #0070F3;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }
    .ci360-task-card:hover {
      box-shadow: var(--shadow-sm);
      border-color: var(--border-md);
      transform: translateY(-1px);
    }
    .ci360-task-card.is-completed {
      background: var(--bg-elevated);
      opacity: 0.75;
      border-left-color: var(--green-500);
    }
    .ci360-task-card.is-overdue {
      border-left: 3.5px solid var(--red-500) !important;
    }

    /* Checkbox */
    .ci360-task-check {
      background: transparent;
      border: 2px solid var(--border-md);
      width: 22px;
      height: 22px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: transparent;
      transition: all var(--t-fast);
      margin-top: 2px;
      flex-shrink: 0;
    }
    .ci360-task-check:hover {
      border-color: var(--accent);
    }
    .ci360-task-check.checked {
      background: var(--green-500);
      border-color: var(--green-500);
      color: #FFFFFF;
      transform: scale(1.05);
    }
    .ci360-task-check .check-svg {
      stroke: currentColor;
    }

    /* Task Body */
    .ci360-task-body {
      flex: 1;
      min-width: 0;
    }
    .ci360-task-title-row {
      margin-bottom: 4px;
    }
    .ci360-task-title {
      font-size: 14.5px;
      font-weight: 600;
      color: var(--text-1);
      line-height: 1.35;
      word-break: break-word;
    }
    .ci360-task-card.is-completed .ci360-task-title {
      text-decoration: line-through;
      color: var(--text-4);
    }
    .ci360-task-desc {
      font-size: 12.5px;
      color: var(--text-3);
      line-height: 1.4;
      margin-bottom: 8px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .ci360-task-badges {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    /* Badges */
    .ci360-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--r-full);
      line-height: 1.4;
    }
    .ci360-badge .badge-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: currentColor;
    }
    /* Priority Badges */
    .ci360-badge.pri-urgent { background: rgba(239, 68, 68, 0.12); color: var(--red-600); }
    .ci360-badge.pri-high { background: rgba(245, 158, 11, 0.14); color: var(--amber-600); }
    .ci360-badge.pri-medium { background: rgba(59, 130, 246, 0.12); color: var(--blue-600); }
    .ci360-badge.pri-low { background: rgba(16, 185, 129, 0.12); color: var(--green-600); }

    /* Status Badges */
    .ci360-badge.status-completed { background: rgba(16, 185, 129, 0.12); color: var(--green-600); }
    .ci360-badge.status-in-progress { background: rgba(245, 158, 11, 0.14); color: var(--amber-600); }
    .ci360-badge.status-pending { background: var(--bg-hover); color: var(--text-3); }

    .ci360-badge.category-badge { background: var(--bg-hover); color: var(--text-2); font-weight: 500; }
    .ci360-badge.time-badge { background: var(--bg-hover); color: var(--text-2); font-weight: 500; }
    .ci360-badge.completion-badge {
      background: rgba(37, 99, 235, 0.12);
      color: #2563EB;
      font-weight: 700;
      border: 1px solid rgba(37, 99, 235, 0.25);
    }
    [data-theme="dark"] .ci360-badge.completion-badge {
      background: rgba(59, 130, 246, 0.2);
      color: #93C5FD;
      border-color: rgba(59, 130, 246, 0.35);
    }
    .ci360-badge.creator-badge {
      background: rgba(0, 112, 243, 0.1);
      color: #0070F3;
      font-weight: 600;
      border: 1px solid rgba(0, 112, 243, 0.2);
    }
    [data-theme="dark"] .ci360-badge.creator-badge {
      background: rgba(0, 112, 243, 0.2);
      color: #38BDF8;
      border-color: rgba(56, 189, 248, 0.35);
    }
    .ci360-badge.overdue-badge { background: rgba(239, 68, 68, 0.12); color: var(--red-600); }
    .ci360-badge.personnel-badge { background: #E0F2FE; color: #0070F3; }
    [data-theme="dark"] .ci360-badge.personnel-badge { background: rgba(0, 112, 243, 0.2); color: #38BDF8; }

    .ci360-badge.date-changed-badge {
      background: rgba(245, 158, 11, 0.14);
      color: #D97706;
      font-weight: 700;
      border: 1px solid rgba(245, 158, 11, 0.35);
    }
    [data-theme="dark"] .ci360-badge.date-changed-badge {
      background: rgba(245, 158, 11, 0.22);
      color: #FBBF24;
      border-color: rgba(245, 158, 11, 0.45);
    }

    /* Task Actions */
    .ci360-task-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      opacity: 0.6;
      transition: opacity var(--t-fast);
    }
    .ci360-task-card:hover .ci360-task-actions {
      opacity: 1;
    }
    .task-action-btn {
      background: transparent;
      border: none;
      width: 28px;
      height: 28px;
      border-radius: var(--r-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-3);
      transition: all var(--t-fast);
    }
    .task-action-btn:hover {
      background: var(--bg-hover);
      color: var(--text-1);
    }
    .task-action-btn.delete:hover {
      color: var(--red-500);
      background: rgba(239, 68, 68, 0.1);
    }

    /* Empty State */
    .ci360-empty-focus-state {
      text-align: center;
      padding: 48px 24px;
      background: var(--bg-card);
      border: 1px dashed var(--border-sm);
      border-radius: var(--r-xl);
    }
    .ci360-empty-focus-state .empty-icon-wrap {
      font-size: 32px;
      margin-bottom: 12px;
    }
    .ci360-empty-focus-state h3 {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-1);
      margin: 0 0 6px;
    }
    .ci360-empty-focus-state p {
      font-size: 13px;
      color: var(--text-3);
      max-width: 420px;
      margin: 0 auto;
    }

    /* Weekly Grid Layout */
    .ci360-weekly-planner-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .ci360-week-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .ci360-week-banner .week-title {
      font-size: 19px;
      font-weight: 700;
      color: var(--text-1);
      margin: 0 0 2px;
    }
    .ci360-week-banner .week-range-text {
      font-size: 13px;
      color: var(--text-3);
    }
    .ci360-week-banner .week-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ci360-week-grid.modern-grid {
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 16px !important;
      align-items: stretch !important;
    }
    @media (max-width: 1200px) {
      .ci360-week-grid.modern-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (max-width: 640px) {
      .ci360-week-grid.modern-grid {
        grid-template-columns: 1fr !important;
      }
    }

    .ci360-weekly-day-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 20px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-height: 270px;
      transition: all 0.2s ease;
    }
    [data-theme="dark"] .ci360-weekly-day-card {
      background: #111827;
      border-color: #1f2937;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }
    .ci360-weekly-day-card:hover {
      box-shadow: 0 8px 26px rgba(0, 0, 0, 0.06);
      border-color: var(--border-md, #cbd5e1);
    }

    /* Header */
    .weekly-day-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 16px 14px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);
      background: transparent;
    }
    [data-theme="dark"] .weekly-day-header {
      border-bottom-color: rgba(255, 255, 255, 0.05);
    }
    .weekly-day-header.today-banner {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%) !important;
      color: #ffffff !important;
      border-bottom: none !important;
    }

    /* Date Badge Box */
    .day-badge-box {
      width: 44px;
      height: 48px;
      border-radius: 12px;
      background: #eff2fe;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    [data-theme="dark"] .day-badge-box {
      background: #1e293b;
    }
    .weekly-day-header.today-banner .day-badge-box {
      background: rgba(0, 0, 0, 0.28) !important;
    }
    .day-badge-name {
      font-size: 11px;
      font-weight: 700;
      color: #4f46e5;
      line-height: 1;
      margin-bottom: 2px;
    }
    .weekly-day-header.today-banner .day-badge-name {
      color: rgba(255, 255, 255, 0.9) !important;
    }
    .day-badge-num {
      font-size: 17px;
      font-weight: 800;
      color: #1e293b;
      line-height: 1;
    }
    [data-theme="dark"] .day-badge-num {
      color: #f8fafc;
    }
    .weekly-day-header.today-banner .day-badge-num {
      color: #ffffff !important;
    }

    /* Day Title & Progress Row */
    .day-header-meta {
      flex: 1;
      min-width: 0;
    }
    .day-full-name {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    [data-theme="dark"] .day-full-name {
      color: #f8fafc;
    }
    .weekly-day-header.today-banner .day-full-name {
      color: #ffffff !important;
    }
    .day-header-stats-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .day-done-label {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      font-weight: 500;
    }
    .weekly-day-header.today-banner .day-done-label {
      color: rgba(255, 255, 255, 0.85) !important;
    }
    .day-progress-track {
      height: 4px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
      width: 90px;
      max-width: 100%;
    }
    [data-theme="dark"] .day-progress-track {
      background: #334155;
    }
    .weekly-day-header.today-banner .day-progress-track {
      background: rgba(255, 255, 255, 0.3) !important;
    }
    .day-progress-bar {
      height: 100%;
      background: #4f46e5;
      border-radius: 999px;
      transition: width 0.3s ease;
    }
    .weekly-day-header.today-banner .day-progress-bar {
      background: #ffffff !important;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
    }

    /* Action Clipboard Button */
    .day-action-clipboard-btn {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      color: #4f46e5;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }
    [data-theme="dark"] .day-action-clipboard-btn {
      background: #1e293b;
      border-color: #334155;
      color: #818cf8;
    }
    .day-action-clipboard-btn:hover {
      background: #eff2fe;
      border-color: #c7d2fe;
      transform: scale(1.05);
    }
    .weekly-day-header.today-banner .day-action-clipboard-btn {
      background: rgba(255, 255, 255, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
      color: #ffffff !important;
    }
    .weekly-day-header.today-banner .day-action-clipboard-btn:hover {
      background: rgba(255, 255, 255, 0.3) !important;
    }

    /* Day Tasks List */
    .weekly-day-tasks {
      padding: 12px 14px 14px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      overflow-y: auto;
      max-height: 360px;
    }
    .weekly-empty-state {
      padding: 24px 0;
      text-align: center;
      font-size: 12px;
      color: var(--text-4, #94a3b8);
    }
    .weekly-task-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 0;
      font-size: 13px;
    }
    .weekly-check-btn {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid #cbd5e1;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      padding: 0;
      transition: all 0.15s ease;
    }
    [data-theme="dark"] .weekly-check-btn {
      border-color: #475569;
    }
    .weekly-check-btn.checked {
      background: #22c55e !important;
      border-color: #22c55e !important;
      color: #ffffff !important;
    }
    .weekly-check-btn:hover:not(.checked) {
      border-color: #4f46e5;
    }
    .weekly-task-title {
      flex: 1;
      min-width: 0;
      font-weight: 500;
      color: var(--text-1, #0f172a);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    [data-theme="dark"] .weekly-task-title {
      color: #e2e8f0;
    }
    .weekly-task-title.strike {
      text-decoration: line-through;
      color: var(--text-4, #94a3b8);
      opacity: 0.65;
    }
    .weekly-pri-badge {
      font-size: 10.5px;
      font-weight: 700;
      border-radius: 5px;
      padding: 1.5px 7px;
      flex-shrink: 0;
    }
    .weekly-pri-badge.pri-medium {
      background: #eff6ff;
      color: #2563eb;
      border: 1px solid #dbeafe;
    }
    .weekly-pri-badge.pri-urgent,
    .weekly-pri-badge.pri-high {
      background: #fef2f2;
      color: #ef4444;
      border: 1px solid #fee2e2;
    }
    .weekly-pri-badge.pri-low {
      background: #f0fdf4;
      color: #16a34a;
      border: 1px solid #dcfce7;
    }
    [data-theme="dark"] .weekly-pri-badge.pri-medium {
      background: rgba(37, 99, 235, 0.15);
      color: #60a5fa;
      border-color: rgba(37, 99, 235, 0.3);
    }
    [data-theme="dark"] .weekly-pri-badge.pri-urgent,
    [data-theme="dark"] .weekly-pri-badge.pri-high {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.3);
    }
    [data-theme="dark"] .weekly-pri-badge.pri-low {
      background: rgba(22, 163, 74, 0.15);
      color: #4ade80;
      border-color: rgba(22, 163, 74, 0.3);
    }

    /* 8th Card: Week at a Glance */
    .week-glance-card {
      background: linear-gradient(180deg, rgba(238, 242, 255, 0.6) 0%, rgba(255, 255, 255, 1) 40%) !important;
      padding: 18px 16px !important;
    }
    [data-theme="dark"] .week-glance-card {
      background: linear-gradient(180deg, rgba(30, 27, 75, 0.3) 0%, #111827 40%) !important;
    }
    .glance-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }
    .glance-icon {
      font-size: 18px;
    }
    .glance-title {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0;
    }
    [data-theme="dark"] .glance-title {
      color: #f8fafc;
    }
    .glance-metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 18px;
    }
    .glance-metric-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    [data-theme="dark"] .glance-metric-item {
      background: #1e293b;
      border-color: #334155;
    }
    .glance-m-icon {
      font-size: 16px;
      width: 30px;
      height: 30px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eff2fe;
      flex-shrink: 0;
    }
    .glance-m-data {
      display: flex;
      flex-direction: column;
    }
    .glance-m-val {
      font-size: 17px;
      font-weight: 800;
      color: var(--text-1, #0f172a);
      line-height: 1.1;
    }
    [data-theme="dark"] .glance-m-val {
      color: #f8fafc;
    }
    .glance-m-lbl {
      font-size: 11px;
      color: var(--text-3, #64748b);
      font-weight: 500;
    }
    .glance-footer {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .glance-progress-track {
      height: 6px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
    }
    [data-theme="dark"] .glance-progress-track {
      background: #334155;
    }
    .glance-progress-bar {
      height: 100%;
      background: #4f46e5;
      border-radius: 999px;
      transition: width 0.3s ease;
    }
    .glance-progress-caption {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      font-weight: 600;
      text-align: center;
    }
    .mini-title {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-1);
      line-height: 1.25;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mini-meta {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 3px;
    }
    .mini-pri {
      font-size: 9.5px;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 3px;
    }
    .mini-pri.pri-urgent { background: rgba(239, 68, 68, 0.15); color: var(--red-600); }
    .mini-pri.pri-high { background: rgba(245, 158, 11, 0.18); color: var(--amber-600); }
    .mini-pri.pri-medium { background: rgba(59, 130, 246, 0.15); color: var(--blue-600); }
    .mini-pri.pri-low { background: rgba(16, 185, 129, 0.15); color: var(--green-600); }
    .mini-time {
      font-size: 9.5px;
      color: var(--text-3);
    }
    .day-col-add-btn {
      margin-top: 8px;
      background: transparent;
      border: 1px dashed var(--border-sm);
      border-radius: var(--r-sm);
      padding: 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
      width: 100%;
    }
    .day-col-add-btn:hover {
      background: var(--bg-hover);
      color: var(--accent);
      border-color: var(--accent);
    }

    /* Report Section */
    .ci360-report-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .ci360-report-kpis {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 14px;
    }

    /* Modal Styling */
    .ci360-planner-modal {
      width: 100%;
      max-width: 580px;
      background: var(--bg-card);
      border-radius: var(--r-xl);
      padding: 24px;
      box-shadow: var(--shadow-xl);
      color: var(--text-1);
    }
    .ci360-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
    }
    .ci360-modal-header h3 {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-1);
      margin: 0;
    }
    .ci360-modal-close {
      background: transparent;
      border: none;
      font-size: 24px;
      color: var(--text-4);
      cursor: pointer;
      line-height: 1;
      padding: 0 4px;
    }
    .ci360-modal-close:hover {
      color: var(--text-1);
    }
    .ci360-modal-form {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .form-row {
      display: flex;
      gap: 12px;
    }
    @media (max-width: 600px) {
      .form-row { flex-direction: column; }
    }
    .flex-1 { flex: 1; }
    .form-group label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-2);
      margin-bottom: 4px;
    }
    .form-group label.required::after {
      content: ' *';
      color: var(--red-500);
    }
    .ci360-modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 10px;
      padding-top: 14px;
      border-top: 1px solid var(--border-xs);
    }

    /* Dropzone & Import Preview */
    .ci360-dropzone {
      border: 2px dashed var(--border-md);
      border-radius: var(--r-lg);
      padding: 24px;
      text-align: center;
      cursor: pointer;
      background: var(--bg-app);
      transition: all var(--t-fast);
    }
    .ci360-dropzone:hover, .ci360-dropzone.dragover {
      border-color: var(--accent);
      background: var(--brand-50);
    }
    [data-theme="dark"] .ci360-dropzone:hover, [data-theme="dark"] .ci360-dropzone.dragover {
      background: rgba(0, 112, 243, 0.15);
    }
    .ci360-dropzone .drop-icon {
      font-size: 28px;
      margin-bottom: 6px;
    }
    .ci360-dropzone .drop-text {
      font-size: 13px;
      color: var(--text-2);
    }
    .ci360-dropzone .drop-sub {
      font-size: 11px;
      color: var(--text-4);
      margin-top: 2px;
    }

    .ci360-import-preview-wrap {
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      background: var(--bg-app);
      overflow: hidden;
    }
    .ci360-import-preview-wrap .preview-header {
      padding: 8px 12px;
      background: var(--bg-hover);
      border-bottom: 1px solid var(--border-xs);
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ci360-import-preview-wrap .preview-list {
      max-height: 180px;
      overflow-y: auto;
      padding: 6px 12px;
    }
    .preview-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
      font-size: 12px;
      border-bottom: 1px solid var(--border-xs);
    }
    .preview-item.is-duplicate {
      opacity: 0.6;
    }
    .preview-index {
      color: var(--text-4);
      font-size: 11px;
      width: 20px;
    }
    .preview-title {
      flex: 1;
      color: var(--text-1);
    }

    /* Compact Density */
    .ci360-planner-wrap.is-compact .ci360-task-card {
      padding: 8px 12px;
      gap: 10px;
    }
    .ci360-planner-wrap.is-compact .ci360-task-title {
      font-size: 13.5px;
    }
    .ci360-planner-wrap.is-compact .ci360-progress-summary-card {
      padding: 12px 18px;
    }
    .ci360-planner-wrap.is-compact .kpi-box {
      padding: 6px 12px;
      min-width: 80px;
    }

    /* Past Date Banner */
    .ci360-past-date-banner {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      border-radius: var(--r-lg);
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.25);
      margin-bottom: 8px;
    }
    .past-banner-icon {
      font-size: 22px;
      flex-shrink: 0;
    }
    .past-banner-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .past-banner-title {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-1);
    }
    .past-banner-desc {
      font-size: 12.5px;
      color: var(--text-3);
      line-height: 1.4;
    }
    .day-col-locked-note {
      text-align: center;
      padding: 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-4);
      background: var(--bg-hover);
      border-radius: var(--r-sm);
      margin-top: 8px;
    }
    .ci360-btn-primary.is-locked-past {
      opacity: 0.75;
      background: var(--text-4);
      cursor: not-allowed;
    }

    /* Admin Employee Grouping & Collapsible Cards */
    .ci360-emp-groups-container {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .ci360-emp-group-card {
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      overflow: hidden;
      box-shadow: var(--shadow-xs);
      transition: all var(--t-fast);
    }
    .ci360-emp-group-card:hover {
      border-color: var(--border-md);
    }
    .ci360-emp-group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 18px;
      background: var(--bg-elevated);
      cursor: pointer;
      user-select: none;
      transition: background var(--t-fast);
    }
    .ci360-emp-group-header:hover {
      background: var(--bg-hover);
    }
    .emp-group-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
    }
    .emp-collapse-icon {
      font-size: 11px;
      color: var(--text-3);
      width: 14px;
      text-align: center;
      transition: transform var(--t-fast);
    }
    .emp-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(0, 112, 243, 0.15);
      color: #0070F3;
      font-weight: 800;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .emp-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .emp-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-1);
    }
    .emp-subtitle {
      font-size: 11.5px;
      color: var(--text-3);
    }
    .emp-group-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .emp-stat-pill {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--r-full);
      background: var(--bg-card);
      border: 1px solid var(--border-xs);
      color: var(--text-2);
    }
    .emp-stat-pill.done {
      color: var(--green-600);
      background: rgba(16, 185, 129, 0.1);
      border-color: rgba(16, 185, 129, 0.2);
    }
    .emp-stat-pill.in-prog {
      color: var(--amber-600);
      background: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.2);
    }
    .emp-stat-pill.pending {
      color: var(--text-3);
      background: var(--bg-hover);
    }
    .emp-mini-bar-wrap {
      width: 50px;
      height: 6px;
      border-radius: var(--r-full);
      background: var(--border-xs);
      overflow: hidden;
    }
    .emp-mini-bar-fill {
      height: 100%;
      background: var(--green-500);
      border-radius: var(--r-full);
      transition: width 0.3s ease;
    }
    .ci360-emp-group-body {
      padding: 12px 16px;
      border-top: 1px solid var(--border-xs);
    }

    /* ── COMPREHENSIVE LIGHT THEME ENHANCEMENTS FOR DAILY PLANNER ── */
    [data-theme="light"] .ci360-planner-wrap,
    html:not([data-theme="dark"]) .ci360-planner-wrap {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-planner-heading,
    html:not([data-theme="dark"]) .ci360-planner-heading {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-planner-subheading,
    html:not([data-theme="dark"]) .ci360-planner-subheading {
      color: #64748B;
    }
    [data-theme="light"] .ci360-view-switcher,
    html:not([data-theme="dark"]) .ci360-view-switcher {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .ci360-switch-btn,
    html:not([data-theme="dark"]) .ci360-switch-btn {
      color: #64748B;
    }
    [data-theme="light"] .ci360-switch-btn:hover,
    html:not([data-theme="dark"]) .ci360-switch-btn:hover {
      background: #F1F5F9;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-switch-btn.active,
    html:not([data-theme="dark"]) .ci360-switch-btn.active {
      background: #0070F3;
      color: #FFFFFF;
    }
    [data-theme="light"] .ci360-btn-secondary,
    html:not([data-theme="dark"]) .ci360-btn-secondary {
      background: #FFFFFF;
      color: #334155;
      border-color: #CBD5E1;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-btn-secondary:hover,
    html:not([data-theme="dark"]) .ci360-btn-secondary:hover {
      background: #F8FAFC;
      color: #0F172A;
      border-color: #94A3B8;
    }
    [data-theme="light"] .ci360-dropdown-menu,
    html:not([data-theme="dark"]) .ci360-dropdown-menu {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
    }
    [data-theme="light"] .ci360-menu-item,
    html:not([data-theme="dark"]) .ci360-menu-item {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-menu-item:hover,
    html:not([data-theme="dark"]) .ci360-menu-item:hover {
      background: #F1F5F9;
    }
    [data-theme="light"] .ci360-menu-item .meta small,
    html:not([data-theme="dark"]) .ci360-menu-item .meta small {
      color: #64748B;
    }
    [data-theme="light"] .ci360-planner-nav-strip,
    html:not([data-theme="dark"]) .ci360-planner-nav-strip {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .ci360-nav-arrow,
    html:not([data-theme="dark"]) .ci360-nav-arrow {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #334155;
    }
    [data-theme="light"] .ci360-date-picker-badge,
    html:not([data-theme="dark"]) .ci360-date-picker-badge {
      background: #F8FAFC;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .ci360-date-picker-badge .date-text,
    html:not([data-theme="dark"]) .ci360-date-picker-badge .date-text {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-today-btn,
    html:not([data-theme="dark"]) .ci360-today-btn {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #475569;
    }
    [data-theme="light"] .ci360-today-btn.is-current,
    html:not([data-theme="dark"]) .ci360-today-btn.is-current {
      background: #E0F2FE;
      color: #0070F3;
      border-color: #BAE6FD;
    }
    [data-theme="light"] .ci360-select-inline,
    html:not([data-theme="dark"]) .ci360-select-inline {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-progress-summary-card,
    html:not([data-theme="dark"]) .ci360-progress-summary-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .kpi-box,
    html:not([data-theme="dark"]) .kpi-box {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .kpi-box .kpi-num,
    html:not([data-theme="dark"]) .kpi-box .kpi-num {
      color: #0F172A;
    }
    [data-theme="light"] .kpi-box .kpi-label,
    html:not([data-theme="dark"]) .kpi-box .kpi-label {
      color: #64748B;
    }
    [data-theme="light"] .ring-num,
    html:not([data-theme="dark"]) .ring-num {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-circular-svg .circle-bg,
    html:not([data-theme="dark"]) .ci360-circular-svg .circle-bg {
      stroke: #E2E8F0;
    }
    [data-theme="light"] .ci360-focus-title,
    html:not([data-theme="dark"]) .ci360-focus-title {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-filter-pills,
    html:not([data-theme="dark"]) .ci360-filter-pills {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }
    [data-theme="light"] .filter-pill,
    html:not([data-theme="dark"]) .filter-pill {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      color: #64748B !important;
    }
    [data-theme="light"] .filter-pill:hover,
    html:not([data-theme="dark"]) .filter-pill:hover {
      background: rgba(0, 0, 0, 0.04) !important;
      color: #0F172A !important;
    }
    [data-theme="light"] .filter-pill.active,
    html:not([data-theme="dark"]) .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35) !important;
    }
    [data-theme="light"] .ci360-search-box,
    html:not([data-theme="dark"]) .ci360-search-box {
      background: #FFFFFF;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .ci360-search-box input,
    html:not([data-theme="dark"]) .ci360-search-box input {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-search-box input::placeholder,
    html:not([data-theme="dark"]) .ci360-search-box input::placeholder {
      color: #94A3B8;
    }
    [data-theme="light"] .ci360-quick-add-bar,
    html:not([data-theme="dark"]) .ci360-quick-add-bar {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    [data-theme="light"] .ci360-quick-input,
    html:not([data-theme="dark"]) .ci360-quick-input {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-quick-input::placeholder,
    html:not([data-theme="dark"]) .ci360-quick-input::placeholder {
      color: #94A3B8;
    }
    [data-theme="light"] .ci360-quick-select,
    html:not([data-theme="dark"]) .ci360-quick-select {
      background: #F8FAFC;
      border-color: #CBD5E1;
      color: #334155;
    }
    [data-theme="light"] .ci360-task-card,
    html:not([data-theme="dark"]) .ci360-task-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      border-left: 3.5px solid #0070F3;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-task-card:hover,
    html:not([data-theme="dark"]) .ci360-task-card:hover {
      border-color: #CBD5E1;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    [data-theme="light"] .ci360-task-card.is-completed,
    html:not([data-theme="dark"]) .ci360-task-card.is-completed {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-task-title,
    html:not([data-theme="dark"]) .ci360-task-title {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-task-desc,
    html:not([data-theme="dark"]) .ci360-task-desc {
      color: #475569;
    }
    [data-theme="light"] .ci360-task-check,
    html:not([data-theme="dark"]) .ci360-task-check {
      border-color: #CBD5E1;
    }
    [data-theme="light"] .task-action-btn,
    html:not([data-theme="dark"]) .task-action-btn {
      color: #64748B;
    }
    [data-theme="light"] .task-action-btn:hover,
    html:not([data-theme="dark"]) .task-action-btn:hover {
      background: #F1F5F9;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-past-date-banner,
    html:not([data-theme="dark"]) .ci360-past-date-banner {
      background: #FFFBEB;
      border-color: #FDE68A;
    }
    [data-theme="light"] .past-banner-title,
    html:not([data-theme="dark"]) .past-banner-title {
      color: #92400E;
    }
    [data-theme="light"] .past-banner-desc,
    html:not([data-theme="dark"]) .past-banner-desc {
      color: #B45309;
    }
    [data-theme="light"] .ci360-emp-group-card,
    html:not([data-theme="dark"]) .ci360-emp-group-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-emp-group-header,
    html:not([data-theme="dark"]) .ci360-emp-group-header {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-emp-group-header:hover,
    html:not([data-theme="dark"]) .ci360-emp-group-header:hover {
      background: #F1F5F9;
    }
    [data-theme="light"] .emp-avatar,
    html:not([data-theme="dark"]) .emp-avatar {
      background: #E0F2FE;
      color: #0070F3;
      border: 1px solid #BAE6FD;
    }
    [data-theme="light"] .emp-name,
    html:not([data-theme="dark"]) .emp-name {
      color: #0F172A;
    }
    [data-theme="light"] .emp-subtitle,
    html:not([data-theme="dark"]) .emp-subtitle {
      color: #64748B;
    }
    [data-theme="light"] .emp-stat-pill,
    html:not([data-theme="dark"]) .emp-stat-pill {
      background: #FFFFFF;
      border-color: #E2E8F0;
      color: #475569;
    }
    [data-theme="light"] .ci360-day-column,
    html:not([data-theme="dark"]) .ci360-day-column {
      background: #FFFFFF;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .day-col-header .day-name,
    html:not([data-theme="dark"]) .day-col-header .day-name {
      color: #64748B;
    }
    [data-theme="light"] .day-col-header .day-number,
    html:not([data-theme="dark"]) .day-col-header .day-number {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-mini-task-card,
    html:not([data-theme="dark"]) .ci360-mini-task-card {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-mini-task-card:hover,
    html:not([data-theme="dark"]) .ci360-mini-task-card:hover {
      background: #FFFFFF;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .mini-title,
    html:not([data-theme="dark"]) .mini-title {
      color: #0F172A;
    }
    [data-theme="light"] .day-col-add-btn,
    html:not([data-theme="dark"]) .day-col-add-btn {
      border: 1px dashed #CBD5E1;
      color: #64748B;
    }
    [data-theme="light"] .day-col-add-btn:hover,
    html:not([data-theme="dark"]) .day-col-add-btn:hover {
      border-color: #0070F3;
      color: #0070F3;
      background: #E0F2FE;
    }
    [data-theme="light"] .ci360-planner-modal,
    html:not([data-theme="dark"]) .ci360-planner-modal {
      background: #FFFFFF;
      color: #0F172A;
      border: 1px solid #E2E8F0;
      box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    }
    [data-theme="light"] .ci360-modal-header h3,
    html:not([data-theme="dark"]) .ci360-modal-header h3 {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-modal-form label,
    html:not([data-theme="dark"]) .ci360-modal-form label {
      color: #334155;
    }
    [data-theme="light"] .ci360-modal-form .input,
    html:not([data-theme="dark"]) .ci360-modal-form .input {
      background: #FFFFFF;
      color: #0F172A;
      border: 1px solid #CBD5E1;
    }
    [data-theme="light"] .ci360-badge.creator-badge,
    html:not([data-theme="dark"]) .ci360-badge.creator-badge {
      background: #F5F3FF;
      color: #6D28D9;
      border-color: #DDD6FE;
    }
    [data-theme="light"] .ci360-badge.completion-badge,
    html:not([data-theme="dark"]) .ci360-badge.completion-badge {
      background: #EFF6FF;
      color: #1D4ED8;
      border-color: #BFDBFE;
    }
    [data-theme="light"] .ci360-badge.date-changed-badge,
    html:not([data-theme="dark"]) .ci360-badge.date-changed-badge {
      background: #FFFBEB;
      color: #B45309;
      border-color: #FDE68A;
    }
  `,document.head.appendChild(s)}function Ma(s){return s!==null?{comment:s,variations:[]}:{variations:[]}}function za(s,a,e,g,h){const b={move:s,variations:h};return a&&(b.suffix=a),e&&(b.nag=e),g!==null&&(b.comment=g),b}function qa(...s){const[a,...e]=s;let g=a;for(const h of e)h!==null&&(g.variations=[h,...h.variations],h.variations=[],g=h);return a}function Ba(s,a){if(a.marker&&a.marker.comment){let e=a.root;for(;;){const g=e.variations[0];if(!g){e.comment=a.marker.comment;break}e=g}}return{headers:s,root:a.root,result:(a.marker&&a.marker.result)??void 0}}function Ra(s,a){function e(){this.constructor=s}e.prototype=a.prototype,s.prototype=new e}function Lt(s,a,e,g){var h=Error.call(this,s);return Object.setPrototypeOf&&Object.setPrototypeOf(h,Lt.prototype),h.expected=a,h.found=e,h.location=g,h.name="SyntaxError",h}Ra(Lt,Error);function oa(s,a,e){return e=e||" ",s.length>a?s:(a-=s.length,e+=e.repeat(a),s+e.slice(0,a))}Lt.prototype.format=function(s){var a="Error: "+this.message;if(this.location){var e=null,g;for(g=0;g<s.length;g++)if(s[g].source===this.location.source){e=s[g].text.split(/\r\n|\n|\r/g);break}var h=this.location.start,b=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(h):h,p=this.location.source+":"+b.line+":"+b.column;if(e){var o=this.location.end,j=oa("",b.line.toString().length," "),J=e[h.line-1],T=h.line===o.line?o.column:J.length+1,q=T-h.column||1;a+=`
 --> `+p+`
`+j+` |
`+b.line+" | "+J+`
`+j+" | "+oa("",h.column-1," ")+oa("",q,"^")}else a+=`
 at `+p}return a};Lt.buildMessage=function(s,a){var e={literal:function(J){return'"'+h(J.text)+'"'},class:function(J){var T=J.parts.map(function(q){return Array.isArray(q)?b(q[0])+"-"+b(q[1]):b(q)});return"["+(J.inverted?"^":"")+T.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(J){return J.description}};function g(J){return J.charCodeAt(0).toString(16).toUpperCase()}function h(J){return J.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(T){return"\\x0"+g(T)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(T){return"\\x"+g(T)})}function b(J){return J.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(T){return"\\x0"+g(T)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(T){return"\\x"+g(T)})}function p(J){return e[J.type](J)}function o(J){var T=J.map(p),q,W;if(T.sort(),T.length>0){for(q=1,W=1;q<T.length;q++)T[q-1]!==T[q]&&(T[W]=T[q],W++);T.length=W}switch(T.length){case 1:return T[0];case 2:return T[0]+" or "+T[1];default:return T.slice(0,-1).join(", ")+", or "+T[T.length-1]}}function j(J){return J?'"'+h(J)+'"':"end of input"}return"Expected "+o(s)+" but "+j(a)+" found."};function ja(s,a){a=a!==void 0?a:{};var e={},g=a.grammarSource,h={pgn:Ae},b=Ae,p="[",o='"',j="]",J=".",T="O-O-O",q="O-O",W="0-0-0",U="0-0",me="$",$e="{",Qe="}",it=";",mt="(",Ft=")",lt="1-0",Le="0-1",dt="1/2-1/2",wt="*",Be=/^[a-zA-Z]/,vt=/^[^"]/,Re=/^[0-9]/,je=/^[.]/,de=/^[a-zA-Z1-8\-=]/,ct=/^[+#]/,we=/^[!?]/,ft=/^[^}]/,pt=/^[^\r\n]/,l=/^[ \t\r\n]/,n=Ce("tag pair"),r=be("[",!1),f=be('"',!1),y=be("]",!1),z=Ce("tag name"),N=Fe([["a","z"],["A","Z"]],!1,!1),S=Ce("tag value"),P=Fe(['"'],!0,!1),H=Ce("move number"),F=Fe([["0","9"]],!1,!1),R=be(".",!1),x=Fe(["."],!1,!1),E=Ce("standard algebraic notation"),X=be("O-O-O",!1),I=be("O-O",!1),L=be("0-0-0",!1),c=be("0-0",!1),i=Fe([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),t=Fe(["+","#"],!1,!1),k=Ce("suffix annotation"),A=Fe(["!","?"],!1,!1),M=Ce("NAG"),D=be("$",!1),Y=Ce("brace comment"),ee=be("{",!1),O=Fe(["}"],!0,!1),_=be("}",!1),Q=Ce("rest of line comment"),ie=be(";",!1),ae=Fe(["\r",`
`],!0,!1),pe=Ce("variation"),ge=be("(",!1),le=be(")",!1),xe=Ce("game termination marker"),We=be("1-0",!1),Z=be("0-1",!1),De=be("1/2-1/2",!1),Ne=be("*",!1),ue=Ce("whitespace"),Se=Fe([" ","	","\r",`
`],!1,!1),ye=function(w,d){return Ba(w,d)},Oe=function(w){return Object.fromEntries(w)},Ue=function(w,d){return[w,d]},ce=function(w,d){return{root:w,marker:d}},Me=function(w,d){return qa(Ma(w),...d.flat())},qe=function(w,d,m,K,te){return za(w,d,m,K,te)},Ee=function(w){return w},Ie=function(w){return w.replace(/[\r\n]+/g," ")},Pe=function(w){return w.trim()},C=function(w){return w},B=function(w,d){return{result:w,comment:d}},u=a.peg$currPos|0,oe=[{line:1,column:1}],ne=u,Te=a.peg$maxFailExpected||[],G=a.peg$silentFails|0,he;if(a.startRule){if(!(a.startRule in h))throw new Error(`Can't start parsing from rule "`+a.startRule+'".');b=h[a.startRule]}function be(w,d){return{type:"literal",text:w,ignoreCase:d}}function Fe(w,d,m){return{type:"class",parts:w,inverted:d,ignoreCase:m}}function gt(){return{type:"end"}}function Ce(w){return{type:"other",description:w}}function _e(w){var d=oe[w],m;if(d)return d;if(w>=oe.length)m=oe.length-1;else for(m=w;!oe[--m];);for(d=oe[m],d={line:d.line,column:d.column};m<w;)s.charCodeAt(m)===10?(d.line++,d.column=1):d.column++,m++;return oe[w]=d,d}function ke(w,d,m){var K=_e(w),te=_e(d),fe={source:g,start:{offset:w,line:K.line,column:K.column},end:{offset:d,line:te.line,column:te.column}};return fe}function V(w){u<ne||(u>ne&&(ne=u,Te=[]),Te.push(w))}function He(w,d,m){return new Lt(Lt.buildMessage(w,d),w,d,m)}function Ae(){var w,d,m;return w=u,d=Xe(),m=ea(),w=ye(d,m),w}function Xe(){var w,d,m;for(w=u,d=[],m=ht();m!==e;)d.push(m),m=ht();return m=et(),w=Oe(d),w}function ht(){var w,d,m,K,te,fe,rt;return G++,w=u,et(),s.charCodeAt(u)===91?(d=p,u++):(d=e,G===0&&V(r)),d!==e?(et(),m=Ut(),m!==e?(et(),s.charCodeAt(u)===34?(K=o,u++):(K=e,G===0&&V(f)),K!==e?(te=Ht(),s.charCodeAt(u)===34?(fe=o,u++):(fe=e,G===0&&V(f)),fe!==e?(et(),s.charCodeAt(u)===93?(rt=j,u++):(rt=e,G===0&&V(y)),rt!==e?w=Ue(m,te):(u=w,w=e)):(u=w,w=e)):(u=w,w=e)):(u=w,w=e)):(u=w,w=e),G--,w===e&&G===0&&V(n),w}function Ut(){var w,d,m;if(G++,w=u,d=[],m=s.charAt(u),Be.test(m)?u++:(m=e,G===0&&V(N)),m!==e)for(;m!==e;)d.push(m),m=s.charAt(u),Be.test(m)?u++:(m=e,G===0&&V(N));else d=e;return d!==e?w=s.substring(w,u):w=d,G--,w===e&&(d=e,G===0&&V(z)),w}function Ht(){var w,d,m;for(G++,w=u,d=[],m=s.charAt(u),vt.test(m)?u++:(m=e,G===0&&V(P));m!==e;)d.push(m),m=s.charAt(u),vt.test(m)?u++:(m=e,G===0&&V(P));return w=s.substring(w,u),G--,d=e,G===0&&V(S),w}function ea(){var w,d,m;return w=u,d=It(),et(),m=Pt(),m===e&&(m=null),et(),w=ce(d,m),w}function It(){var w,d,m,K;for(w=u,d=yt(),d===e&&(d=null),m=[],K=Mt();K!==e;)m.push(K),K=Mt();return w=Me(d,m),w}function Mt(){var w,d,m,K,te,fe,rt,bt;if(w=u,et(),Gt(),et(),d=ta(),d!==e){for(m=aa(),m===e&&(m=null),K=[],te=zt();te!==e;)K.push(te),te=zt();for(te=et(),fe=yt(),fe===e&&(fe=null),rt=[],bt=kt();bt!==e;)rt.push(bt),bt=kt();w=qe(d,m,K,fe,rt)}else u=w,w=e;return w}function Gt(){var w,d,m,K,te,fe;for(G++,w=u,d=[],m=s.charAt(u),Re.test(m)?u++:(m=e,G===0&&V(F));m!==e;)d.push(m),m=s.charAt(u),Re.test(m)?u++:(m=e,G===0&&V(F));if(s.charCodeAt(u)===46?(m=J,u++):(m=e,G===0&&V(R)),m!==e){for(K=et(),te=[],fe=s.charAt(u),je.test(fe)?u++:(fe=e,G===0&&V(x));fe!==e;)te.push(fe),fe=s.charAt(u),je.test(fe)?u++:(fe=e,G===0&&V(x));d=[d,m,K,te],w=d}else u=w,w=e;return G--,w===e&&(d=e,G===0&&V(H)),w}function ta(){var w,d,m,K,te,fe;if(G++,w=u,d=u,s.substr(u,5)===T?(m=T,u+=5):(m=e,G===0&&V(X)),m===e&&(s.substr(u,3)===q?(m=q,u+=3):(m=e,G===0&&V(I)),m===e&&(s.substr(u,5)===W?(m=W,u+=5):(m=e,G===0&&V(L)),m===e&&(s.substr(u,3)===U?(m=U,u+=3):(m=e,G===0&&V(c)),m===e))))if(m=u,K=s.charAt(u),Be.test(K)?u++:(K=e,G===0&&V(N)),K!==e){if(te=[],fe=s.charAt(u),de.test(fe)?u++:(fe=e,G===0&&V(i)),fe!==e)for(;fe!==e;)te.push(fe),fe=s.charAt(u),de.test(fe)?u++:(fe=e,G===0&&V(i));else te=e;te!==e?(K=[K,te],m=K):(u=m,m=e)}else u=m,m=e;return m!==e?(K=s.charAt(u),ct.test(K)?u++:(K=e,G===0&&V(t)),K===e&&(K=null),m=[m,K],d=m):(u=d,d=e),d!==e?w=s.substring(w,u):w=d,G--,w===e&&(d=e,G===0&&V(E)),w}function aa(){var w,d,m;for(G++,w=u,d=[],m=s.charAt(u),we.test(m)?u++:(m=e,G===0&&V(A));m!==e;)d.push(m),d.length>=2?m=e:(m=s.charAt(u),we.test(m)?u++:(m=e,G===0&&V(A)));return d.length<1?(u=w,w=e):w=d,G--,w===e&&(d=e,G===0&&V(k)),w}function zt(){var w,d,m,K,te;if(G++,w=u,et(),s.charCodeAt(u)===36?(d=me,u++):(d=e,G===0&&V(D)),d!==e){if(m=u,K=[],te=s.charAt(u),Re.test(te)?u++:(te=e,G===0&&V(F)),te!==e)for(;te!==e;)K.push(te),te=s.charAt(u),Re.test(te)?u++:(te=e,G===0&&V(F));else K=e;K!==e?m=s.substring(m,u):m=K,m!==e?w=Ee(m):(u=w,w=e)}else u=w,w=e;return G--,w===e&&G===0&&V(M),w}function yt(){var w;return w=na(),w===e&&(w=ut()),w}function na(){var w,d,m,K,te;if(G++,w=u,s.charCodeAt(u)===123?(d=$e,u++):(d=e,G===0&&V(ee)),d!==e){for(m=u,K=[],te=s.charAt(u),ft.test(te)?u++:(te=e,G===0&&V(O));te!==e;)K.push(te),te=s.charAt(u),ft.test(te)?u++:(te=e,G===0&&V(O));m=s.substring(m,u),s.charCodeAt(u)===125?(K=Qe,u++):(K=e,G===0&&V(_)),K!==e?w=Ie(m):(u=w,w=e)}else u=w,w=e;return G--,w===e&&(d=e,G===0&&V(Y)),w}function ut(){var w,d,m,K,te;if(G++,w=u,s.charCodeAt(u)===59?(d=it,u++):(d=e,G===0&&V(ie)),d!==e){for(m=u,K=[],te=s.charAt(u),pt.test(te)?u++:(te=e,G===0&&V(ae));te!==e;)K.push(te),te=s.charAt(u),pt.test(te)?u++:(te=e,G===0&&V(ae));m=s.substring(m,u),w=Pe(m)}else u=w,w=e;return G--,w===e&&(d=e,G===0&&V(Q)),w}function kt(){var w,d,m,K;return G++,w=u,et(),s.charCodeAt(u)===40?(d=mt,u++):(d=e,G===0&&V(ge)),d!==e?(m=It(),m!==e?(et(),s.charCodeAt(u)===41?(K=Ft,u++):(K=e,G===0&&V(le)),K!==e?w=C(m):(u=w,w=e)):(u=w,w=e)):(u=w,w=e),G--,w===e&&G===0&&V(pe),w}function Pt(){var w,d,m;return G++,w=u,s.substr(u,3)===lt?(d=lt,u+=3):(d=e,G===0&&V(We)),d===e&&(s.substr(u,3)===Le?(d=Le,u+=3):(d=e,G===0&&V(Z)),d===e&&(s.substr(u,7)===dt?(d=dt,u+=7):(d=e,G===0&&V(De)),d===e&&(s.charCodeAt(u)===42?(d=wt,u++):(d=e,G===0&&V(Ne))))),d!==e?(et(),m=yt(),m===e&&(m=null),w=B(d,m)):(u=w,w=e),G--,w===e&&(d=e,G===0&&V(xe)),w}function et(){var w,d;for(G++,w=[],d=s.charAt(u),l.test(d)?u++:(d=e,G===0&&V(Se));d!==e;)w.push(d),d=s.charAt(u),l.test(d)?u++:(d=e,G===0&&V(Se));return G--,d=e,G===0&&V(ue),w}if(he=b(),a.peg$library)return{peg$result:he,peg$currPos:u,peg$FAILED:e,peg$maxFailExpected:Te,peg$maxFailPos:ne};if(he!==e&&u===s.length)return he;throw he!==e&&u<s.length&&V(gt()),He(Te,ne<s.length?s.charAt(ne):null,ne<s.length?ke(ne,ne+1):ke(ne,ne))}/**
 * @license
 * Copyright (c) 2025, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */const Qt=0xffffffffffffffffn;function ra(s,a){return(s<<a|s>>64n-a)&0xffffffffffffffffn}function xa(s,a){return s*a&Qt}function Na(s){return function(){let a=BigInt(s&Qt),e=BigInt(s>>64n&Qt);const g=xa(ra(xa(a,5n),7n),9n);return e^=a,a=(ra(a,24n)^e^e<<16n)&Qt,e=ra(e,37n),s=e<<64n|a,g}}const Zt=Na(0xa187eb39cdcaed8f31c4b365b102e01en),Oa=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Zt()))),Ua=Array.from({length:8},()=>Zt()),Ha=Array.from({length:16},()=>Zt()),sa=Zt(),tt="w",st="b",Ve="p",ua="n",Xt="b",Nt="r",Ct="q",Ye="k",la="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Vt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(a,e){const{color:g,piece:h,from:b,to:p,flags:o,captured:j,promotion:J}=e,T=Je(b),q=Je(p);this.color=g,this.piece=h,this.from=T,this.to=q,this.san=a._moveToSan(e,a._moves({legal:!0})),this.lan=T+q,this.before=a.fen(),a._makeMove(e),this.after=a.fen(),a._undoMove(),this.flags="";for(const W in se)se[W]&o&&(this.flags+=At[W]);j&&(this.captured=j),J&&(this.promotion=J,this.lan+=J)}isCapture(){return this.flags.indexOf(At.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(At.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(At.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(At.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(At.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(At.BIG_PAWN)>-1}}const Ze=-1,At={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},se={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ba={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Ga={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Wa={...ba,...Ga},re={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},da={b:[16,32,17,15],w:[-16,-32,-17,-15]},va={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ka=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Va=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ya={p:1,n:2,b:4,r:8,q:16,k:32},Ja="pnbrqkPNBRQK",ya=[ua,Xt,Nt,Ct],Qa=7,Xa=6,Za=1,en=0,Yt={[Ye]:se.KSIDE_CASTLE,[Ct]:se.QSIDE_CASTLE},$t={w:[{square:re.a1,flag:se.QSIDE_CASTLE},{square:re.h1,flag:se.KSIDE_CASTLE}],b:[{square:re.a8,flag:se.QSIDE_CASTLE},{square:re.h8,flag:se.KSIDE_CASTLE}]},tn={b:Za,w:Xa},ca="--";function Tt(s){return s>>4}function Ot(s){return s&15}function Sa(s){return"0123456789".indexOf(s)!==-1}function Je(s){const a=Ot(s),e=Tt(s);return"abcdefgh".substring(a,a+1)+"87654321".substring(e,e+1)}function Rt(s){return s===tt?st:tt}function an(s){const a=s.split(/\s+/);if(a.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(a[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const g=parseInt(a[4],10);if(isNaN(g)||g<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(a[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(a[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(a[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const h=a[0].split("/");if(h.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let p=0;p<h.length;p++){let o=0,j=!1;for(let J=0;J<h[p].length;J++)if(Sa(h[p][J])){if(j)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};o+=parseInt(h[p][J],10),j=!0}else{if(!/^[prnbqkPRNBQK]$/.test(h[p][J]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};o+=1,j=!1}if(o!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(a[3][1]=="3"&&a[1]=="w"||a[3][1]=="6"&&a[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const b=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:p,regex:o}of b){if(!o.test(a[0]))return{ok:!1,error:`Invalid FEN: missing ${p} king`};if((a[0].match(o)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${p} kings`}}return Array.from(h[0]+h[7]).some(p=>p.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function nn(s,a){const e=s.from,g=s.to,h=s.piece;let b=0,p=0,o=0;for(let j=0,J=a.length;j<J;j++){const T=a[j].from,q=a[j].to,W=a[j].piece;h===W&&e!==T&&g===q&&(b++,Tt(e)===Tt(T)&&p++,Ot(e)===Ot(T)&&o++)}return b>0?p>0&&o>0?Je(e):o>0?Je(e).charAt(1):Je(e).charAt(0):""}function St(s,a,e,g,h,b=void 0,p=se.NORMAL){const o=Tt(g);if(h===Ve&&(o===Qa||o===en))for(let j=0;j<ya.length;j++){const J=ya[j];s.push({color:a,from:e,to:g,piece:h,captured:b,promotion:J,flags:p|se.PROMOTION})}else s.push({color:a,from:e,to:g,piece:h,captured:b,flags:p})}function ka(s){let a=s.charAt(0);return a>="a"&&a<="h"?s.match(/[a-h]\d.*[a-h]\d/)?void 0:Ve:(a=a.toLowerCase(),a==="o"?Ye:a)}function pa(s){return s.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class wa{_board=new Array(128);_turn=tt;_header={};_kings={w:Ze,b:Ze};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(a=la,{skipValidation:e=!1}={}){this.load(a,{skipValidation:e})}clear({preserveHeaders:a=!1}={}){this._board=new Array(128),this._kings={w:Ze,b:Ze},this._turn=tt,this._castling={w:0,b:0},this._epSquare=Ze,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=a?this._header:{...Wa},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(a,{skipValidation:e=!1,preserveHeaders:g=!1}={}){let h=a.split(/\s+/);if(h.length>=2&&h.length<6){const o=["-","-","0","1"];a=h.concat(o.slice(-(6-h.length))).join(" ")}if(h=a.split(/\s+/),!e){const{ok:o,error:j}=an(a);if(!o)throw new Error(j)}const b=h[0];let p=0;this.clear({preserveHeaders:g});for(let o=0;o<b.length;o++){const j=b.charAt(o);if(j==="/")p+=8;else if(Sa(j))p+=parseInt(j,10);else{const J=j<"a"?tt:st;this._put({type:j.toLowerCase(),color:J},Je(p)),p++}}this._turn=h[1],h[2].indexOf("K")>-1&&(this._castling.w|=se.KSIDE_CASTLE),h[2].indexOf("Q")>-1&&(this._castling.w|=se.QSIDE_CASTLE),h[2].indexOf("k")>-1&&(this._castling.b|=se.KSIDE_CASTLE),h[2].indexOf("q")>-1&&(this._castling.b|=se.QSIDE_CASTLE),this._epSquare=h[3]==="-"?Ze:re[h[3]],this._halfMoves=parseInt(h[4],10),this._moveNumber=parseInt(h[5],10),this._hash=this._computeHash(),this._updateSetup(a),this._incPositionCount()}fen({forceEnpassantSquare:a=!1}={}){let e=0,g="";for(let p=re.a8;p<=re.h1;p++){if(this._board[p]){e>0&&(g+=e,e=0);const{color:o,type:j}=this._board[p];g+=o===tt?j.toUpperCase():j.toLowerCase()}else e++;p+1&136&&(e>0&&(g+=e),p!==re.h1&&(g+="/"),e=0,p+=8)}let h="";this._castling[tt]&se.KSIDE_CASTLE&&(h+="K"),this._castling[tt]&se.QSIDE_CASTLE&&(h+="Q"),this._castling[st]&se.KSIDE_CASTLE&&(h+="k"),this._castling[st]&se.QSIDE_CASTLE&&(h+="q"),h=h||"-";let b="-";if(this._epSquare!==Ze)if(a)b=Je(this._epSquare);else{const p=this._epSquare+(this._turn===tt?16:-16),o=[p+1,p-1];for(const j of o){if(j&136)continue;const J=this._turn;if(this._board[j]?.color===J&&this._board[j]?.type===Ve){this._makeMove({color:J,from:j,to:this._epSquare,piece:Ve,captured:Ve,flags:se.EP_CAPTURE});const T=!this._isKingAttacked(J);if(this._undoMove(),T){b=Je(this._epSquare);break}}}}return[g,this._turn,h,b,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(a){if(!this._board[a])return 0n;const{color:e,type:g}=this._board[a],h={w:0,b:1}[e],b={p:0,n:1,b:2,r:3,q:4,k:5}[g];return Oa[h][b][a]}_epKey(){return this._epSquare===Ze?0n:Ua[this._epSquare&7]}_castlingKey(){const a=this._castling.w>>5|this._castling.b>>3;return Ha[a]}_computeHash(){let a=0n;for(let e=re.a8;e<=re.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(a^=this._pieceKey(e))}return a^=this._epKey(),a^=this._castlingKey(),this._turn==="b"&&(a^=sa),a}_updateSetup(a){this._history.length>0||(a!==la?(this._header.SetUp="1",this._header.FEN=a):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(la)}get(a){return this._board[re[a]]}findPiece(a){const e=[];for(let g=re.a8;g<=re.h1;g++){if(g&136){g+=7;continue}!this._board[g]||this._board[g]?.color!==a.color||this._board[g].color===a.color&&this._board[g].type===a.type&&e.push(Je(g))}return e}put({type:a,color:e},g){return this._put({type:a,color:e},g)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(a,e){this._hash^=this._pieceKey(a),this._board[a]=e,this._hash^=this._pieceKey(a)}_put({type:a,color:e},g){if(Ja.indexOf(a.toLowerCase())===-1||!(g in re))return!1;const h=re[g];if(a==Ye&&!(this._kings[e]==Ze||this._kings[e]==h))return!1;const b=this._board[h];return b&&b.type===Ye&&(this._kings[b.color]=Ze),this._set(h,{type:a,color:e}),a===Ye&&(this._kings[e]=h),!0}_clear(a){this._hash^=this._pieceKey(a),delete this._board[a]}remove(a){const e=this.get(a);return this._clear(re[a]),e&&e.type===Ye&&(this._kings[e.color]=Ze),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const a=this._board[re.e1]?.type===Ye&&this._board[re.e1]?.color===tt,e=this._board[re.e8]?.type===Ye&&this._board[re.e8]?.color===st;(!a||this._board[re.a1]?.type!==Nt||this._board[re.a1]?.color!==tt)&&(this._castling.w&=-65),(!a||this._board[re.h1]?.type!==Nt||this._board[re.h1]?.color!==tt)&&(this._castling.w&=-33),(!e||this._board[re.a8]?.type!==Nt||this._board[re.a8]?.color!==st)&&(this._castling.b&=-65),(!e||this._board[re.h8]?.type!==Nt||this._board[re.h8]?.color!==st)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Ze)return;const a=this._epSquare+(this._turn===tt?-16:16),e=this._epSquare+(this._turn===tt?16:-16),g=[e+1,e-1];if(this._board[a]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==Rt(this._turn)||this._board[e]?.type!==Ve){this._hash^=this._epKey(),this._epSquare=Ze;return}const h=b=>!(b&136)&&this._board[b]?.color===this._turn&&this._board[b]?.type===Ve;g.some(h)||(this._hash^=this._epKey(),this._epSquare=Ze)}_attacked(a,e,g){const h=[];for(let b=re.a8;b<=re.h1;b++){if(b&136){b+=7;continue}if(this._board[b]===void 0||this._board[b].color!==a)continue;const p=this._board[b],o=b-e;if(o===0)continue;const j=o+119;if(Ka[j]&Ya[p.type]){if(p.type===Ve){if(o>0&&p.color===tt||o<=0&&p.color===st)if(g)h.push(Je(b));else return!0;continue}if(p.type==="n"||p.type==="k")if(g){h.push(Je(b));continue}else return!0;const J=Va[j];let T=b+J,q=!1;for(;T!==e;){if(this._board[T]!=null){q=!0;break}T+=J}if(!q)if(g){h.push(Je(b));continue}else return!0}}return g?h:!1}attackers(a,e){return e?this._attacked(e,re[a],!0):this._attacked(this._turn,re[a],!0)}_isKingAttacked(a){const e=this._kings[a];return e===-1?!1:this._attacked(Rt(a),e)}hash(){return this._hash.toString(16)}isAttacked(a,e){return this._attacked(e,re[a])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const a={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let g=0,h=0;for(let b=re.a8;b<=re.h1;b++){if(h=(h+1)%2,b&136){b+=7;continue}const p=this._board[b];p&&(a[p.type]=p.type in a?a[p.type]+1:1,p.type===Xt&&e.push(h),g++)}if(g===2)return!0;if(g===3&&(a[Xt]===1||a[ua]===1))return!0;if(g===a[Xt]+2){let b=0;const p=e.length;for(let o=0;o<p;o++)b+=e[o];if(b===0||b===p)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:a=!1,square:e=void 0,piece:g=void 0}={}){const h=this._moves({square:e,piece:g});return a?h.map(b=>new Vt(this,b)):h.map(b=>this._moveToSan(b,h))}_moves({legal:a=!0,piece:e=void 0,square:g=void 0}={}){const h=g?g.toLowerCase():void 0,b=e?.toLowerCase(),p=[],o=this._turn,j=Rt(o);let J=re.a8,T=re.h1,q=!1;if(h)if(h in re)J=T=re[h],q=!0;else return[];for(let U=J;U<=T;U++){if(U&136){U+=7;continue}if(!this._board[U]||this._board[U].color===j)continue;const{type:me}=this._board[U];let $e;if(me===Ve){if(b&&b!==me)continue;$e=U+da[o][0],this._board[$e]||(St(p,o,U,$e,Ve),$e=U+da[o][1],tn[o]===Tt(U)&&!this._board[$e]&&St(p,o,U,$e,Ve,void 0,se.BIG_PAWN));for(let Qe=2;Qe<4;Qe++)$e=U+da[o][Qe],!($e&136)&&(this._board[$e]?.color===j?St(p,o,U,$e,Ve,this._board[$e].type,se.CAPTURE):$e===this._epSquare&&St(p,o,U,$e,Ve,Ve,se.EP_CAPTURE))}else{if(b&&b!==me)continue;for(let Qe=0,it=va[me].length;Qe<it;Qe++){const mt=va[me][Qe];for($e=U;$e+=mt,!($e&136);){if(!this._board[$e])St(p,o,U,$e,me);else{if(this._board[$e].color===o)break;St(p,o,U,$e,me,this._board[$e].type,se.CAPTURE);break}if(me===ua||me===Ye)break}}}}if((b===void 0||b===Ye)&&(!q||T===this._kings[o])){if(this._castling[o]&se.KSIDE_CASTLE){const U=this._kings[o],me=U+2;!this._board[U+1]&&!this._board[me]&&!this._attacked(j,this._kings[o])&&!this._attacked(j,U+1)&&!this._attacked(j,me)&&St(p,o,this._kings[o],me,Ye,void 0,se.KSIDE_CASTLE)}if(this._castling[o]&se.QSIDE_CASTLE){const U=this._kings[o],me=U-2;!this._board[U-1]&&!this._board[U-2]&&!this._board[U-3]&&!this._attacked(j,this._kings[o])&&!this._attacked(j,U-1)&&!this._attacked(j,me)&&St(p,o,this._kings[o],me,Ye,void 0,se.QSIDE_CASTLE)}}if(!a||this._kings[o]===-1)return p;const W=[];for(let U=0,me=p.length;U<me;U++)this._makeMove(p[U]),this._isKingAttacked(o)||W.push(p[U]),this._undoMove();return W}move(a,{strict:e=!1}={}){let g=null;if(typeof a=="string")g=this._moveFromSan(a,e);else if(a===null)g=this._moveFromSan(ca,e);else if(typeof a=="object"){const b=this._moves();for(let p=0,o=b.length;p<o;p++)if(a.from===Je(b[p].from)&&a.to===Je(b[p].to)&&(!("promotion"in b[p])||a.promotion===b[p].promotion)){g=b[p];break}}if(!g)throw typeof a=="string"?new Error(`Invalid move: ${a}`):new Error(`Invalid move: ${JSON.stringify(a)}`);if(this.isCheck()&&g.flags&se.NULL_MOVE)throw new Error("Null move not allowed when in check");const h=new Vt(this,g);return this._makeMove(g),this._incPositionCount(),h}_push(a){this._history.push({move:a,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(a,e){this._hash^=this._pieceKey(a),this._board[e]=this._board[a],delete this._board[a],this._hash^=this._pieceKey(e)}_makeMove(a){const e=this._turn,g=Rt(e);if(this._push(a),a.flags&se.NULL_MOVE){e===st&&this._moveNumber++,this._halfMoves++,this._turn=g,this._epSquare=Ze;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),a.captured&&(this._hash^=this._pieceKey(a.to)),this._movePiece(a.from,a.to),a.flags&se.EP_CAPTURE&&(this._turn===st?this._clear(a.to-16):this._clear(a.to+16)),a.promotion&&(this._clear(a.to),this._set(a.to,{type:a.promotion,color:e})),this._board[a.to].type===Ye){if(this._kings[e]=a.to,a.flags&se.KSIDE_CASTLE){const h=a.to-1,b=a.to+1;this._movePiece(b,h)}else if(a.flags&se.QSIDE_CASTLE){const h=a.to+1,b=a.to-2;this._movePiece(b,h)}this._castling[e]=0}if(this._castling[e]){for(let h=0,b=$t[e].length;h<b;h++)if(a.from===$t[e][h].square&&this._castling[e]&$t[e][h].flag){this._castling[e]^=$t[e][h].flag;break}}if(this._castling[g]){for(let h=0,b=$t[g].length;h<b;h++)if(a.to===$t[g][h].square&&this._castling[g]&$t[g][h].flag){this._castling[g]^=$t[g][h].flag;break}}if(this._hash^=this._castlingKey(),a.flags&se.BIG_PAWN){let h;e===st?h=a.to-16:h=a.to+16,!(a.to-1&136)&&this._board[a.to-1]?.type===Ve&&this._board[a.to-1]?.color===g||!(a.to+1&136)&&this._board[a.to+1]?.type===Ve&&this._board[a.to+1]?.color===g?(this._epSquare=h,this._hash^=this._epKey()):this._epSquare=Ze}else this._epSquare=Ze;a.piece===Ve?this._halfMoves=0:a.flags&(se.CAPTURE|se.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===st&&this._moveNumber++,this._turn=g,this._hash^=sa}undo(){const a=this._hash,e=this._undoMove();if(e){const g=new Vt(this,e);return this._decPositionCount(a),g}return null}_undoMove(){const a=this._history.pop();if(a===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=a.move;this._kings=a.kings,this._turn=a.turn,this._castling=a.castling,this._epSquare=a.epSquare,this._halfMoves=a.halfMoves,this._moveNumber=a.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=sa;const g=this._turn,h=Rt(g);if(e.flags&se.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:g})),e.captured)if(e.flags&se.EP_CAPTURE){let b;g===st?b=e.to-16:b=e.to+16,this._set(b,{type:Ve,color:h})}else this._set(e.to,{type:e.captured,color:h});if(e.flags&(se.KSIDE_CASTLE|se.QSIDE_CASTLE)){let b,p;e.flags&se.KSIDE_CASTLE?(b=e.to+1,p=e.to-1):(b=e.to-2,p=e.to+1),this._movePiece(p,b)}return e}pgn({newline:a=`
`,maxWidth:e=0}={}){const g=[];let h=!1;for(const W in this._header)this._header[W]&&g.push(`[${W} "${this._header[W]}"]`+a),h=!0;h&&this._history.length&&g.push(a);const b=W=>{const U=this._comments[this.fen()];if(typeof U<"u"){const me=W.length>0?" ":"";W=`${W}${me}{${U}}`}return W},p=[];for(;this._history.length>0;)p.push(this._undoMove());const o=[];let j="";for(p.length===0&&o.push(b(""));p.length>0;){j=b(j);const W=p.pop();if(!W)break;if(!this._history.length&&W.color==="b"){const U=`${this._moveNumber}. ...`;j=j?`${j} ${U}`:U}else W.color==="w"&&(j.length&&o.push(j),j=this._moveNumber+".");j=j+" "+this._moveToSan(W,this._moves({legal:!0})),this._makeMove(W)}if(j.length&&o.push(b(j)),o.push(this._header.Result||"*"),e===0)return g.join("")+o.join(" ");const J=function(){return g.length>0&&g[g.length-1]===" "?(g.pop(),!0):!1},T=function(W,U){for(const me of U.split(" "))if(me){if(W+me.length>e){for(;J();)W--;g.push(a),W=0}g.push(me),W+=me.length,g.push(" "),W++}return J()&&W--,W};let q=0;for(let W=0;W<o.length;W++){if(q+o[W].length>e&&o[W].includes("{")){q=T(q,o[W]);continue}q+o[W].length>e&&W!==0?(g[g.length-1]===" "&&g.pop(),g.push(a),q=0):W!==0&&(g.push(" "),q++),g.push(o[W]),q+=o[W].length}return g.join("")}header(...a){for(let e=0;e<a.length;e+=2)typeof a[e]=="string"&&typeof a[e+1]=="string"&&(this._header[a[e]]=a[e+1]);return this._header}setHeader(a,e){return this._header[a]=e??ba[a]??null,this.getHeaders()}removeHeader(a){return a in this._header?(this._header[a]=ba[a]||null,!0):!1}getHeaders(){const a={};for(const[e,g]of Object.entries(this._header))g!==null&&(a[e]=g);return a}loadPgn(a,{strict:e=!1,newlineChar:g=`\r?
`}={}){g!==`\r?
`&&(a=a.replace(new RegExp(g,"g"),`
`));const h=ja(a);this.reset();const b=h.headers;let p="";for(const J in b)J.toLowerCase()==="fen"&&(p=b[J]),this.header(J,b[J]);if(!e)p&&this.load(p,{preserveHeaders:!0});else if(b.SetUp==="1"){if(!("FEN"in b))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(b.FEN,{preserveHeaders:!0})}let o=h.root;for(;o;){if(o.move){const J=this._moveFromSan(o.move,e);if(J==null)throw new Error(`Invalid move in PGN: ${o.move}`);this._makeMove(J),this._incPositionCount()}o.comment!==void 0&&(this._comments[this.fen()]=o.comment),o=o.variations[0]}const j=h.result;j&&Object.keys(this._header).length&&this._header.Result!==j&&this.setHeader("Result",j)}_moveToSan(a,e){let g="";if(a.flags&se.KSIDE_CASTLE)g="O-O";else if(a.flags&se.QSIDE_CASTLE)g="O-O-O";else{if(a.flags&se.NULL_MOVE)return ca;if(a.piece!==Ve){const h=nn(a,e);g+=a.piece.toUpperCase()+h}a.flags&(se.CAPTURE|se.EP_CAPTURE)&&(a.piece===Ve&&(g+=Je(a.from)[0]),g+="x"),g+=Je(a.to),a.promotion&&(g+="="+a.promotion.toUpperCase())}return this._makeMove(a),this.isCheck()&&(this.isCheckmate()?g+="#":g+="+"),this._undoMove(),g}_moveFromSan(a,e=!1){let g=pa(a);if(e||(g==="0-0"?g="O-O":g==="0-0-0"&&(g="O-O-O")),g==ca)return{color:this._turn,from:0,to:0,piece:"k",flags:se.NULL_MOVE};let h=ka(g),b=this._moves({legal:!0,piece:h});for(let W=0,U=b.length;W<U;W++)if(g===pa(this._moveToSan(b[W],b)))return b[W];if(e)return null;let p,o,j,J,T,q=!1;if(o=g.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),o?(p=o[1],j=o[2],J=o[3],T=o[4],j.length==1&&(q=!0)):(o=g.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),o&&(p=o[1],j=o[2],J=o[3],T=o[4],j.length==1&&(q=!0))),h=ka(g),b=this._moves({legal:!0,piece:p||h}),!J)return null;for(let W=0,U=b.length;W<U;W++)if(j){if((!p||p.toLowerCase()==b[W].piece)&&re[j]==b[W].from&&re[J]==b[W].to&&(!T||T.toLowerCase()==b[W].promotion))return b[W];if(q){const me=Je(b[W].from);if((!p||p.toLowerCase()==b[W].piece)&&re[J]==b[W].to&&(j==me[0]||j==me[1])&&(!T||T.toLowerCase()==b[W].promotion))return b[W]}}else if(g===pa(this._moveToSan(b[W],b)).replace("x",""))return b[W];return null}ascii(){let a=`   +------------------------+
`;for(let e=re.a8;e<=re.h1;e++){if(Ot(e)===0&&(a+=" "+"87654321"[Tt(e)]+" |"),this._board[e]){const g=this._board[e].type,b=this._board[e].color===tt?g.toUpperCase():g.toLowerCase();a+=" "+b+" "}else a+=" . ";e+1&136&&(a+=`|
`,e+=8)}return a+=`   +------------------------+
`,a+="     a  b  c  d  e  f  g  h",a}perft(a){const e=this._moves({legal:!1});let g=0;const h=this._turn;for(let b=0,p=e.length;b<p;b++)this._makeMove(e[b]),this._isKingAttacked(h)||(a-1>0?g+=this.perft(a-1):g++),this._undoMove();return g}setTurn(a){return this._turn==a?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const a=[];let e=[];for(let g=re.a8;g<=re.h1;g++)this._board[g]==null?e.push(null):e.push({square:Je(g),type:this._board[g].type,color:this._board[g].color}),g+1&136&&(a.push(e),e=[],g+=8);return a}squareColor(a){if(a in re){const e=re[a];return(Tt(e)+Ot(e))%2===0?"light":"dark"}return null}history({verbose:a=!1}={}){const e=[],g=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const h=e.pop();if(!h)break;a?g.push(new Vt(this,h)):g.push(this._moveToSan(h,this._moves())),this._makeMove(h)}return g}_getPositionCount(a){return this._positionCount.get(a)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(a){const e=this._positionCount.get(a)??0;e===1?this._positionCount.delete(a):this._positionCount.set(a,e-1)}_pruneComments(){const a=[],e={},g=h=>{h in this._comments&&(e[h]=this._comments[h])};for(;this._history.length>0;)a.push(this._undoMove());for(g(this.fen());;){const h=a.pop();if(!h)break;this._makeMove(h),g(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(a){this._comments[this.fen()]=a.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const a=this._comments[this.fen()];return delete this._comments[this.fen()],a}getComments(){return this._pruneComments(),Object.keys(this._comments).map(a=>({fen:a,comment:this._comments[a]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(a=>{const e=this._comments[a];return delete this._comments[a],{fen:a,comment:e}})}setCastlingRights(a,e){for(const h of[Ye,Ct])e[h]!==void 0&&(e[h]?this._castling[a]|=Yt[h]:this._castling[a]&=~Yt[h]);this._updateCastlingRights();const g=this.getCastlingRights(a);return(e[Ye]===void 0||e[Ye]===g[Ye])&&(e[Ct]===void 0||e[Ct]===g[Ct])}getCastlingRights(a){return{[Ye]:(this._castling[a]&Yt[Ye])!==0,[Ct]:(this._castling[a]&Yt[Ct])!==0}}moveNumber(){return this._moveNumber}}async function ln(s,a={}){const e=a.currentUser||{},g=a.userRole||e?.role||"employee";let h="chat",b=[],p=null,o=[],j=[],J=null,T=null,q=!1,W=null,U=null;s.innerHTML=`
    <div class="bonding-wrap" id="bonding-app-root">
      <!-- Top Navigation & Header Bar -->
      <div class="bonding-nav-bar">
        <div class="bonding-nav-left">
          <div class="bonding-logo-badge">💬</div>
          <div>
            <h2 class="bonding-title">Team Chat & Lounge</h2>
            <p class="bonding-subtitle">Direct Messages · Group Lounges · Multiplayer Games</p>
          </div>
        </div>

        <!-- View Switcher Tabs -->
        <div class="bonding-view-tabs">
          <button class="bonding-view-tab active" id="tab-nav-chat">
            <span>💬</span> <span>Team Chat</span>
          </button>
          <button class="bonding-view-tab" id="tab-nav-lounge">
            <span>🎮</span> <span>Lounge & Games</span>
          </button>
        </div>

        <div class="bonding-nav-right">
          <button class="bonding-top-action-btn primary" id="btn-top-challenge" title="Challenge an Employee">
            <span>⚔️</span> <span>Challenge</span>
          </button>
          <button class="bonding-top-action-btn" id="btn-top-new-chat" title="Start a Personal Chat">
            <span>👤</span> <span>New Chat</span>
          </button>
          <button class="bonding-top-action-btn" id="btn-top-new-group" title="Create a Group Lounge">
            <span>👥</span> <span>+ Group</span>
          </button>
        </div>
      </div>

      <!-- Main Chat Layout (Shown when currentView === 'chat') -->
      <div class="bonding-chat-layout" id="bonding-chat-main-wrap">
        <!-- Sidebar: Direct Chats & Group Lounges -->
        <aside class="bonding-sidebar">
          <div class="bonding-search-box">
            <input type="text" id="bonding-search-input" placeholder="Search conversations or teammates..." />
          </div>

          <!-- Group Lounges Section -->
          <div class="bonding-section-header">
            <span class="bonding-section-title">GROUP LOUNGES</span>
            <button class="bonding-mini-btn" id="btn-create-group" title="Create New Group">
              <span>+</span> New Group
            </button>
          </div>
          <div class="bonding-channel-list" id="bonding-group-list">
            <div class="bonding-loading-text">Loading groups...</div>
          </div>

          <!-- Direct 1-on-1 Messages Section -->
          <div class="bonding-section-header" style="margin-top: 18px;">
            <span class="bonding-section-title">DIRECT MESSAGES</span>
            <button class="bonding-mini-btn" id="btn-new-direct-chat" title="New Direct Message">
              <span>+</span> New Chat
            </button>
          </div>
          <div class="bonding-channel-list" id="bonding-direct-list">
            <div class="bonding-loading-text">Loading direct chats...</div>
          </div>
        </aside>

        <!-- Main Chat Area -->
        <main class="bonding-chat-main" id="bonding-chat-panel">
          <div class="bonding-chat-loading">Loading conversation...</div>
        </main>
      </div>

      <!-- Lounge & Multiplayer Games Arena Layout (Shown when currentView === 'lounge_games') -->
      <div class="bonding-lounge-layout" id="bonding-lounge-main-wrap" style="display: none;">
        <div class="bonding-loading-text" style="padding: 40px; text-align: center;">Loading Lounge & Games Arena...</div>
      </div>
    </div>

    <!-- Modals container -->
    <div id="bonding-modals-root"></div>
  `,on(),await lt(),Re();const me=s.querySelector("#tab-nav-chat"),$e=s.querySelector("#tab-nav-lounge"),Qe=s.querySelector("#bonding-chat-main-wrap"),it=s.querySelector("#bonding-lounge-main-wrap");me?.addEventListener("click",async()=>{h="chat",me.classList.add("active"),$e.classList.remove("active"),Qe.style.display="grid",it.style.display="none",Re(),p&&await Le(p._id)}),$e?.addEventListener("click",async()=>{h="lounge_games",$e.classList.add("active"),me.classList.remove("active"),Qe.style.display="none",it.style.display="block",await y()}),s.querySelector("#btn-top-new-chat")?.addEventListener("click",x),s.querySelector("#btn-top-new-group")?.addEventListener("click",E),s.querySelector("#btn-top-challenge")?.addEventListener("click",()=>N());const mt=s.querySelector("#bonding-search-input");mt&&mt.addEventListener("input",c=>{const i=c.target.value.toLowerCase().trim();s.querySelectorAll(".bonding-channel-item").forEach(k=>{const A=k.textContent.toLowerCase();k.style.display=A.includes(i)?"flex":"none"})}),wt(),new MutationObserver((c,i)=>{document.body.contains(s)||(T&&clearInterval(T),U&&clearInterval(U),i.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function lt(){try{const[c,i]=await Promise.all([ze("/bonding/channels").catch(()=>[]),ze("/bonding/colleagues").catch(()=>[])]);if(b=c,o=i,b.length>0){const t=localStorage.getItem("ci360_bonding_active_channel");t&&b.some(k=>k._id===t)?p=b.find(k=>k._id===t):p||(p=b.find(k=>k.name.includes("Lounge"))||b[0])}Be(),p&&await Le(p._id)}catch(c){console.error("Failed to load bonding data",c)}}async function Le(c,i=!1){if(c)try{localStorage.setItem("ci360_bonding_active_channel",c),j=await ze(`/bonding/channels/${c}/messages`),i?r():f()}catch(t){console.error("Failed to load messages",t)}}let dt=0;function wt(){T&&clearInterval(T),T=setInterval(async()=>{try{if(!document.body.contains(s)){clearInterval(T);return}if(dt++,dt%2===0){const c=await ze("/bonding/channels").catch(()=>null);c&&JSON.stringify(c.map(i=>i._id+i.lastMessage?.sentAt))!==JSON.stringify(b.map(i=>i._id+i.lastMessage?.sentAt))&&(b=c,Be())}h==="chat"&&p?await Le(p._id,!0):h==="lounge_games"&&await y(!0)}catch{}},3e3)}function Be(){const c=s.querySelector("#bonding-group-list"),i=s.querySelector("#bonding-direct-list");if(!c||!i)return;const t=b.filter(A=>A.type==="group"),k=b.filter(A=>A.type==="direct");if(t.length===0)c.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const A=e?._id||e?.id,M=g==="superadmin"||e?.role==="superadmin";c.innerHTML=t.map(D=>{const Y=p&&p._id===D._id,O=D.createdBy&&D.createdBy.userId&&String(D.createdBy.userId)===String(A)||M;return`
          <div class="bonding-channel-item ${Y?"active":""}" data-channel-id="${D._id}">
            <div class="bonding-channel-icon">${D.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(D.name)}</div>
              <div class="bonding-channel-preview">${v(D.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${O?`
              <button class="bonding-channel-del-btn" data-channel-id="${D._id}" title="Delete Group (Creator only)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            `:`
              <button class="bonding-channel-leave-btn" data-channel-id="${D._id}" title="Leave Group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            `}
          </div>
        `}).join("")}k.length===0?i.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':i.innerHTML=k.map(A=>{const M=p&&p._id===A._id,D=A.displayName||A.name||"Colleague",Y=D.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${M?"active":""}" data-channel-id="${A._id}">
            <div class="bonding-channel-avatar">${Y}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(D)}</div>
              <div class="bonding-channel-preview">${v(A.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${A._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),vt()}function vt(){const c=s.querySelectorAll(".bonding-channel-item");c.forEach(i=>{i.onclick=async t=>{if(t.target.closest(".bonding-channel-del-btn")||t.target.closest(".bonding-channel-leave-btn"))return;const k=i.dataset.channelId,A=b.find(M=>M._id===k);A&&(p=A,c.forEach(M=>M.classList.remove("active")),i.classList.add("active"),Re(),await Le(A._id))}}),s.querySelectorAll(".bonding-channel-leave-btn").forEach(i=>{i.onclick=async t=>{t.stopPropagation();const k=i.dataset.channelId,M=b.find(D=>D._id===k)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${M}"?`))try{i.disabled=!0,await ve(`/bonding/channels/${k}/leave`,{}),$(`You left "${M}"`,"info"),b=b.filter(D=>D._id!==k),p&&p._id===k&&(p=b.find(D=>D.type==="group")||b[0]||null,Re(),p&&await Le(p._id)),Be()}catch(D){$(D.message||"Failed to leave group","error"),i.disabled=!1}}}),s.querySelectorAll(".bonding-channel-del-btn").forEach(i=>{i.onclick=async t=>{t.stopPropagation();const k=i.dataset.channelId,A=b.find(Y=>Y._id===k),M=A&&A.type==="direct",D=M?"this 1-on-1 chat":`the group "${A?.name||""}"`;if(confirm(`Are you sure you want to delete ${D}? All messages will be permanently removed.`))try{i.disabled=!0,await nt(`/bonding/channels/${k}`),$(M?"1-on-1 chat deleted":"Group deleted","success"),b=b.filter(Y=>Y._id!==k),p&&p._id===k&&(p=b[0]||null,Re(),p&&await Le(p._id)),Be()}catch(Y){$(Y.message||"Failed to delete conversation","error"),i.disabled=!1}}}),s.querySelector("#btn-create-group")?.addEventListener("click",E),s.querySelector("#btn-new-direct-chat")?.addEventListener("click",x)}function Re(){const c=s.querySelector("#bonding-chat-panel");if(!c)return;if(!p){c.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const i=v(p.displayName||p.name),t=(p.members||[]).length,k=p.type==="group",A=e?._id||e?.id,M=k?null:(p.members||[]).find(O=>O.userId?.toString()!==A?.toString()),D=p.createdBy&&p.createdBy.userId&&String(p.createdBy.userId)===String(A),Y=g==="superadmin"||e?.role==="superadmin",ee=D||Y;c.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${k?p.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${i}</div>
            <div class="bonding-chat-sub">
              ${k?`<span>${t} members</span> · <span>${v(p.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
            </div>
          </div>
        </div>

        <div class="bonding-chat-header-actions">
          <!-- Quick Challenge Button -->
          <button class="bonding-header-btn challenge-highlight" id="btn-chat-challenge" title="Challenge to Multiplayer Game">
            <span>⚔️</span> <span>Challenge Game</span>
          </button>

          <!-- Clear messages button -->
          <button class="bonding-header-btn" id="btn-clear-chat" title="Clear All Messages in this Chat">
            <span>🧹</span> <span>Clear Chat</span>
          </button>

          ${k?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${t})</span>
            </button>
            ${ee?`
              <button class="bonding-header-btn danger" id="btn-delete-group" title="Delete this group (Creator only)">
                <span>🗑️</span> <span>Delete Group</span>
              </button>
            `:`
              <button class="bonding-header-btn danger" id="btn-leave-group" title="Leave this group">
                <span>🚪</span> <span>Leave Group</span>
              </button>
            `}
          `:`
            <button class="bonding-header-btn danger" id="btn-delete-direct" title="Delete 1-on-1 Chat">
              <span>🗑️</span> <span>Delete Chat</span>
            </button>
          `}
        </div>
      </div>

      <div class="bonding-messages-container" id="bonding-messages-feed">
        ${je()}
      </div>

      <div class="bonding-chat-input-bar">
        <button class="bonding-input-action-btn" id="btn-quick-emoji" title="Insert Emoji">
          <span>😀</span>
        </button>
        <button class="bonding-input-action-btn" id="btn-input-challenge" title="Send Multiplayer Challenge">
          <span>🎮</span>
        </button>
        <input
          type="text"
          id="bonding-message-input"
          class="bonding-input-field"
          placeholder="Type a message or challenge to a game... (Press Enter to send)"
          autocomplete="off"
        />
        <button class="bonding-send-btn" id="btn-send-message">
          <span>Send</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `,ct(M),we(M),ft(),n()}function je(){if(!j||j.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const c=e?._id||e?.id;return j.map(i=>{const t=i.sender&&i.sender.userId&&c&&i.sender.userId.toString()===c.toString();if(i.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${i._id}">
            <span>ℹ️</span> <span>${v(i.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${i._id}" title="Delete Message">&times;</button>
          </div>
        `;if(i.type==="challenge"&&i.challengeData){const D=i.challengeData,Y=D.gameTitle||"Game Challenge",ee=D.gameType||"dotsboxes",O=ee==="dotsboxes"?"⏹️":ee==="ludo"?"🎲":ee==="chess"?"♟️":"❌",_=D.gameState?.invitationId,Q=D.targetUserId?.toString(),ie=i.sender?.userId?.toString(),ae=c&&Q===c.toString(),pe=c&&ie===c.toString();return`
          <div class="bonding-msg-row ${t?"self":"other"}" data-msg-id="${i._id}">
            <div class="bonding-msg-avatar" title="${v(i.sender?.name||"Teammate")}">
              ${(i.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${v(i.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${L(i.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${i._id}" title="Delete Challenge Message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${O}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${v(Y)}</h4>
                    <p class="game-bubble-desc">${v(i.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${D.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':D.status==="active"||D.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':D.status==="declined"?'<span class="badge red">❌ Challenge Declined</span>':D.status==="cancelled"?'<span class="badge gray">🚫 Challenge Cancelled</span>':`<span class="badge gray">${v(D.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${D.status==="pending"&&ae?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${_}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${_}" data-action="decline">
                        Decline
                      </button>
                    `:D.status==="pending"&&pe?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${_}" data-action="cancel">
                          Cancel
                        </button>
                      `:D.status==="declined"||D.status==="cancelled"?`
                        <div class="game-pending-text" style="font-size:11.5px;color:var(--text-3);font-style:italic;">
                          ${D.status==="declined"?"Challenge was declined":"Challenge was cancelled"}
                        </div>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-match-id="${D.gameState?.matchId||""}" data-invite-id="${_||""}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${de(i)}
            </div>
          </div>
        `}const k=v(i.sender?.name||"Teammate"),A=L(i.createdAt),M=de(i);return`
        <div class="bonding-msg-row ${t?"self":"other"}" data-msg-id="${i._id}">
          <div class="bonding-msg-avatar" title="${k}">${k.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${k}</span>
              <span class="bonding-msg-time">${A}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${i._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${v(i.content).replace(/\n/g,"<br/>")}
            </div>
            ${M}
          </div>
        </div>
      `}).join("")}function de(c){return`
      <div class="bonding-reactions-row">
        ${(c.reactions||[]).map(k=>{const A=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(k.users||[]).some(D=>D.toString()===A?.toString())?"active":""}" data-msg-id="${c._id}" data-emoji="${k.emoji}">
          <span>${k.emoji}</span> <span>${k.users?k.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${c._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function ct(c){const i=s.querySelector("#btn-chat-challenge");i&&(i.onclick=()=>{c?N(null,c.userId||c._id):N()});const t=s.querySelector("#btn-manage-members");t&&(t.onclick=H);const k=s.querySelector("#btn-delete-group");k&&(k.onclick=R);const A=s.querySelector("#btn-leave-group");A&&(A.onclick=F);const M=s.querySelector("#btn-delete-direct");M&&(M.onclick=async()=>{if(p&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{M.disabled=!0,await nt(`/bonding/channels/${p._id}`),$("1-on-1 chat deleted successfully","success");const Y=p._id;b=b.filter(ee=>ee._id!==Y),p=b[0]||null,Be(),Re(),p&&await Le(p._id)}catch(Y){$(Y.message||"Could not delete 1-on-1 chat","error"),M.disabled=!1}});const D=s.querySelector("#btn-clear-chat");D&&(D.onclick=async()=>{if(p&&confirm("Are you sure you want to clear all messages in this conversation?"))try{D.disabled=!0,await nt(`/bonding/channels/${p._id}/messages`),$("Chat messages cleared","success"),j=[],f()}catch(Y){$(Y.message||"Could not clear chat messages","error")}finally{D.disabled=!1}})}function we(c){const i=s.querySelector("#bonding-message-input"),t=s.querySelector("#btn-send-message"),k=s.querySelector("#btn-quick-emoji"),A=s.querySelector("#btn-input-challenge");i&&i.addEventListener("keydown",M=>{M.key==="Enter"&&!M.shiftKey&&(M.preventDefault(),pt())}),t&&(t.onclick=pt),A&&(A.onclick=()=>{c?N(null,c.userId||c._id):N()}),k&&(k.onclick=M=>{M.stopPropagation(),i&&X(k,D=>{const Y=i.selectionStart??i.value.length,ee=i.selectionEnd??i.value.length,O=i.value;i.value=O.substring(0,Y)+D+O.substring(ee),i.focus();const _=Y+D.length;try{i.setSelectionRange(_,_)}catch{}})})}function ft(){s.querySelectorAll(".btn-respond-invite").forEach(k=>{k.onclick=async()=>{const A=k.dataset.inviteId,M=k.dataset.action;await S(A,M)}}),s.querySelectorAll(".btn-launch-match-from-card").forEach(k=>{k.onclick=async()=>{const A=k.dataset.matchId,M=k.dataset.inviteId;if(A){P(A);return}try{k.disabled=!0;const D=await ze("/bonding/invitations"),ee=(D.incoming||[]).concat(D.sent||[]).find(Q=>Q._id===M||Q.matchId&&Q.matchId.toString()===M);if(ee&&ee.matchId){P(ee.matchId);return}const _=(await ze("/bonding/matches").catch(()=>[])||[]).find(Q=>Q.invitationId===M||Q._id===M);if(_){P(_._id);return}$("Match has not started yet or has finished","warning")}catch(D){$(D.message||"Could not load match","error")}finally{k.disabled=!1}}}),s.querySelectorAll(".bonding-msg-del-btn").forEach(k=>{k.onclick=async A=>{A.stopPropagation();const M=k.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{k.disabled=!0,await nt(`/bonding/messages/${M}`),j=j.filter(D=>D._id!==M),r(),$("Message deleted","success")}catch(D){$(D.message||"Failed to delete message","error"),k.disabled=!1}}}),s.querySelectorAll(".bonding-rxn-tag").forEach(k=>{k.onclick=async()=>{const A=k.dataset.msgId,M=k.dataset.emoji;await l(A,M)}}),s.querySelectorAll(".bonding-add-rxn-btn").forEach(k=>{k.onclick=A=>{const M=k.dataset.msgId;I(A.currentTarget,async D=>{await l(M,D)})}})}async function pt(){const c=s.querySelector("#bonding-message-input");if(!c||!p||q)return;const i=c.value.trim();if(i)try{q=!0,c.value="";const t=await ve(`/bonding/channels/${p._id}/messages`,{content:i,type:"text"});j.push(t),f(),n()}catch(t){$(t.message||"Failed to send message","error")}finally{q=!1,c.focus()}}async function l(c,i){try{const t=await ve(`/bonding/messages/${c}/react`,{emoji:i}),k=j.find(A=>A._id===c);k&&(k.reactions=t,r())}catch(t){$(t.message||"Failed to react","error")}}function n(){const c=s.querySelector("#bonding-messages-feed");c&&(c.scrollTop=c.scrollHeight)}function r(){const c=s.querySelector("#bonding-messages-feed");if(!c)return;const i=c.scrollHeight-c.scrollTop<=c.clientHeight+80;c.innerHTML=je(),ft(),i&&n()}function f(){const c=s.querySelector("#bonding-messages-feed");c&&(c.innerHTML=je(),ft())}async function y(c=!1){const i=s.querySelector("#bonding-lounge-main-wrap");if(i){c||(i.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const t=await ze("/bonding/games/overview");J=t;const k=t.myStats||{},A=t.availableGames||[],M=t.incomingChallenges||[],D=t.sentChallenges||[],Y=t.activeMatches||[],ee=t.recentMatches||[],O=e?._id||e?.id;i.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${k.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${k.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${k.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${k.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${k.gamesPlayed>0?Math.round((k.wins||0)/k.gamesPlayed*100):0}%</span>
              <span class="stat-lbl">Win Rate</span>
            </div>
          </div>

          <!-- Section 1: Available Games Cards -->
          <div class="lounge-section">
            <div class="lounge-section-head">
              <h3>🎮 Available Multiplayer Games</h3>
              <p>Voluntary casual competition with colleagues during breaks. Pick a game and challenge any employee!</p>
            </div>

            <div class="lounge-games-grid">
              ${A.map(_=>`
                <div class="lounge-game-card" data-game-id="${_.id}">
                  <div class="game-card-icon">${_.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${v(_.name)}</h4>
                    <p class="game-card-desc">${v(_.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${_.duration}</span>
                      ${_.id==="ludo"||_.id==="dotsboxes"?`<span class="meta-pill">👥 Up to 4 Players</span><span class="meta-pill">${_.id==="dotsboxes"?"⏹️ 16 Boxes Grid":"🎯 4 Pawns / Base"}</span>`:'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${_.id}" data-game-title="${v(_.name)}">
                    ${_.id==="dotsboxes"?"⚔️ Play Dots & Boxes (2P–4P)":_.id==="ludo"?"⚔️ Play Ludo (2P–4P)":"⚔️ Challenge Employee"}
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Section 2: Active Matches & Pending Challenges (2-col grid) -->
          <div class="lounge-two-col">
            <!-- Left: Incoming & Sent Challenges -->
            <div class="lounge-card-box">
              <div class="lounge-box-title">
                <span>📬 Game Invitations</span>
                <span class="badge blue">${M.length+D.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${M.length})</h5>
              ${M.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${M.map(_=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(_.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(_.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${v(_.sender.name)}</strong> (${v(_.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${_._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${_._id}" data-action="decline">
                            Decline
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

              <!-- Sent -->
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${D.length})</h5>
              ${D.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${D.map(_=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(_.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(_.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${v(_.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${_._id}" data-action="cancel">
                            Cancel
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}
            </div>

            <!-- Right: Active Matches -->
            <div class="lounge-card-box">
              <div class="lounge-box-title">
                <span>⚡ Active Multiplayer Matches</span>
                <span class="badge green">${Y.length} Live</span>
              </div>

              ${Y.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${Y.map(_=>{const ie=(_.players||_.gameState?.players||[_.player1,_.player2].filter(Boolean)).filter(le=>le.userId&&le.userId.toString()!==O?.toString()),ae=_.player1?.userId?.toString()===O?.toString()?_.player2:_.player1,pe=ie.length>0?ie.map(le=>v(le.name)).join(", "):ae?.name?v(ae.name):"Colleagues",ge=O&&_.currentTurnUserId&&_.currentTurnUserId.toString()===O.toString();return`
                        <div class="lounge-active-match-card ${ge?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${_.gameType==="dotsboxes"?"⏹️":_.gameType==="ludo"?"🎲":_.gameType==="chess"?"♟️":"❌"}</span>
                            <div>
                              <div class="match-game-title">${v(_.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${pe}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ge?"my-turn":"wait"}">
                              ${ge?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${_._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${_._id}" title="Delete Match">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      `}).join("")}
                  </div>
                `}
            </div>
          </div>

          <!-- Section 3: Recent Completed Matches -->
          <div class="lounge-section" style="margin-top: 24px;">
            <div class="lounge-section-head" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <div>
                <h3>📜 Recent Completed Matches</h3>
                <p>Audit results, rematch recent opponents, or review match outcomes.</p>
              </div>
              ${ee.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${ee.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${ee.map(_=>{const ie=O&&_.player1.userId.toString()===O.toString()?_.player2:_.player1,ae=O&&_.winnerId&&_.winnerId.toString()===O.toString(),pe=_.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${v(_.gameTitle)}</span>
                          <span class="recent-date">${L(_.completedAt||_.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${_._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${v(ie.name)}</strong></div>
                          <div class="recent-outcome ${ae?"win":pe?"draw":"loss"}">
                            ${ae?"🏆 VICTORY":pe?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${v(_.winningReason||_.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${_._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${_._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,z()}catch(t){i.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${v(t.message)}</p>
        </div>
      `}}}function z(){s.querySelectorAll(".btn-challenge-game").forEach(i=>{i.onclick=()=>{const t=i.dataset.gameId;N(t)}}),s.querySelectorAll(".btn-respond-invite").forEach(i=>{i.onclick=async()=>{const t=i.dataset.inviteId,k=i.dataset.action;await S(t,k),await y()}}),s.querySelectorAll(".btn-resume-match").forEach(i=>{i.onclick=()=>{const t=i.dataset.matchId;P(t)}}),s.querySelectorAll(".btn-recent-rematch").forEach(i=>{i.onclick=async()=>{const t=i.dataset.matchId;try{i.disabled=!0;const k=await ve(`/bonding/matches/${t}/action`,{action:"rematch"});k.match&&($("Rematch created! Opening arena ⚔️","success"),P(k.match._id))}catch(k){$(k.message||"Could not start rematch","error")}finally{i.disabled=!1}}}),s.querySelectorAll(".btn-delete-match").forEach(i=>{i.onclick=async t=>{t.stopPropagation();const k=i.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{i.disabled=!0,await nt(`/bonding/matches/${k}`),$("Match deleted successfully","success"),await y()}catch(A){$(A.message||"Failed to delete match","error")}finally{i.disabled=!1}}});const c=s.querySelector("#btn-clear-matches");c&&(c.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{c.disabled=!0,await nt("/bonding/matches?filter=completed"),$("Completed matches history cleared","success"),await y()}catch(i){$(i.message||"Failed to clear matches","error")}finally{c.disabled=!1}})}function N(c=null,i=null){const t=s.querySelector("#bonding-modals-root"),k=e?._id||e?.id,A=new Set(["employee","admin","superadmin"]),M=o.filter(ae=>!ae.isSelf&&ae._id.toString()!==k?.toString()&&A.has(ae.role));let D=c||"dotsboxes",Y=i?i.toString():null,ee=2,O=Y?[Y]:[],_="none";function Q(){const ae=M.find(xe=>xe._id.toString()===Y),pe=D==="dotsboxes"||D==="ludo",ge=ee-1,le=O.length===ge;t.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${D==="dotsboxes"?"Play Dots & Boxes (2P, 3P, 4P)":D==="ludo"?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${D==="dotsboxes"?"active":""}" data-game="dotsboxes">
                    <span>⏹️</span> <span>Dots & Boxes</span>
                  </button>
                  <button class="game-pill-btn ${D==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                  <button class="game-pill-btn ${D==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                </div>
              </div>

              <!-- MULTIPLAYER: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${pe?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${ee===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${ee===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${ee===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${pe?`Step ${pe?3:2} — Select Colleagues to Play With (${O.length}/${ge} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${M.map(xe=>{const We=pe?O.includes(xe._id.toString()):Y===xe._id.toString();return`
                      <div class="eligible-emp-item ${We?"selected":""}" data-user-id="${xe._id}">
                        <div class="emp-item-avatar">${xe.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${v(xe.name)}</span>
                          <span class="emp-item-role">${v(xe.role==="superadmin"?"Superadmin":xe.role==="admin"?"Admin":"Employee")} · ${v(xe.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${We?"active":""}">
                          ${We?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${D==="dotsboxes"?`⏹️ Dots & Boxes (${ee} Players)`:D==="ludo"?`🎲 Ludo (${ee} Players · 4 Pawns)`:"❌ Tic-Tac-Toe Challenge"}</div>
                  ${pe?`
                    <div><strong>Opponents:</strong> ${O.length>0?O.map(xe=>{const We=M.find(Z=>Z._id.toString()===xe);return We?`<strong>${v(We.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+ge+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${ae?`<strong>${v(ae.name)}</strong> (${v(ae.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(pe?!le:!Y)?"disabled":""}>
                ${D==="dotsboxes"?`Start ${ee}P Dots & Boxes ⏹️`:D==="ludo"?`Start ${ee}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,ie()}function ie(){t.querySelector(".bonding-modal-close").onclick=()=>{t.innerHTML=""},t.querySelector("#btn-cancel-challenge-flow").onclick=()=>{t.innerHTML=""},t.querySelectorAll(".game-pill-btn").forEach(ge=>{ge.onclick=()=>{D=ge.dataset.game,Q()}}),t.querySelectorAll(".ludo-mode-btn").forEach(ge=>{ge.onclick=()=>{ee=Number(ge.dataset.count),O=O.slice(0,ee-1),Q()}});const ae=t.querySelector("#flow-emp-search");ae&&(ae.oninput=ge=>{const le=ge.target.value.toLowerCase().trim();t.querySelectorAll(".eligible-emp-item").forEach(xe=>{const We=xe.textContent.toLowerCase();xe.style.display=We.includes(le)?"flex":"none"})}),t.querySelectorAll(".eligible-emp-item").forEach(ge=>{ge.onclick=()=>{const le=ge.dataset.userId;if(D==="dotsboxes"||D==="ludo"){const We=ee-1;O.includes(le)?O=O.filter(Z=>Z!==le):O.length<We?O.push(le):O[We-1]=le}else Y=le;Q()}});const pe=t.querySelector("#btn-submit-challenge-flow");pe&&(pe.onclick=async()=>{if(D==="dotsboxes"){const ge=ee-1;if(O.length<ge){$(`Please select ${ge} colleague(s) to play with`,"warning");return}try{pe.disabled=!0,pe.textContent="Launching Dots & Boxes...";const le=await ve("/bonding/matches/instant-dotsboxes",{playerCount:ee,targetUserIds:O});t.innerHTML="",$(`Dots & Boxes match started (${ee} Players)! ⏹️`,"success"),le&&le._id&&P(le._id)}catch(le){$(le.message||"Failed to start Dots & Boxes match","error"),pe.disabled=!1,pe.textContent=`Start ${ee}P Dots & Boxes ⏹️`}return}if(D==="ludo"){const ge=ee-1;if(O.length<ge){$(`Please select ${ge} colleague(s) to play with`,"warning");return}try{pe.disabled=!0,pe.textContent="Launching Match...";const le=await ve("/bonding/matches/instant-ludo",{playerCount:ee,targetUserIds:O});t.innerHTML="",$(`Ludo match started (${ee} Players)! 🎲`,"success"),le&&le._id&&P(le._id)}catch(le){$(le.message||"Failed to start Ludo match","error"),pe.disabled=!1,pe.textContent=`Start ${ee}P Ludo Match 🎲`}return}if(!Y){$("Please select an employee to challenge","warning");return}try{pe.disabled=!0,pe.textContent="Sending Challenge...",await ve("/bonding/invitations",{gameType:D,targetUserId:Y,matchSettings:{timerMode:_},channelId:null}),$("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),t.innerHTML="",await loadChannels();const ge=b.find(le=>le.type==="direct"&&le.members?.some(xe=>(xe.userId||xe._id)?.toString()===Y));ge?selectChannel(ge):p&&await Le(p._id),h==="lounge_games"&&await y()}catch(ge){$(ge.message||"Could not send challenge","error"),pe.disabled=!1,pe.textContent="Send Challenge 🚀"}})}Q()}async function S(c,i){if(!(!c||!i))try{const t=await Jt(`/bonding/invitations/${c}/respond`,{action:i});i==="accept"?($("Challenge accepted! Entering match arena ⚔️","success"),t.match&&P(t.match._id)):i==="decline"?($("Challenge declined","info"),s.querySelectorAll(`[data-invite-id="${c}"]`).forEach(k=>{const A=k.closest(".lounge-invite-item")||k.closest(".bonding-msg-row");A&&A.remove()})):i==="cancel"&&($("Challenge cancelled","info"),s.querySelectorAll(`[data-invite-id="${c}"]`).forEach(k=>{const A=k.closest(".lounge-invite-item")||k.closest(".bonding-msg-row");A&&A.remove()})),p&&await Le(p._id),h==="lounge_games"&&await y()}catch(t){$(t.message||"Action failed","error")}}async function P(c){if(!c)return;W=c,U&&clearInterval(U);const i=s.querySelector("#bonding-modals-root");let t=null,k=null,A=[],M="",D=null,Y=!1,ee=!1,O=0;function _(Z){return Z?JSON.stringify({status:Z.status,turn:Z.currentTurnUserId?.toString(),turnColor:Z.turn,movesCount:Z.moves?.length,dice:Z.gameState?.dice,rolled:Z.gameState?.rolled,lastRoll:Z.gameState?.lastRoll,lastRollColor:Z.gameState?.lastRollColor,lastRollBy:Z.gameState?.lastRollBy,lastActionText:Z.gameState?.lastActionText,tokens:Z.gameState?.tokens,board:Z.gameState?.board,grid:Z.gameState?.grid,fen:Z.gameState?.fen,hLines:Z.gameState?.hLines,vLines:Z.gameState?.vLines,boxes:Z.gameState?.boxes,scores:Z.gameState?.scores,draw:Z.drawOfferedBy?.toString(),rematchOfferedBy:Z.rematchOfferedBy?.toString(),rematchDeclined:!!Z.rematchDeclined}):""}async function Q(){try{return t=await ze(`/bonding/matches/${c}`),t}catch(Z){return $(Z.message||"Could not load match","error"),ie(),null}}if(t=await Q(),!t)return;M=_(t);function ie(){U&&clearInterval(U),D&&clearTimeout(D),Y=!1,W=null,i.innerHTML="",h==="lounge_games"&&y(!0),p&&Le(p._id,!0)}U=setInterval(async()=>{if(!W||W!==c){clearInterval(U);return}if(!(ee&&Date.now()-O<2500))try{const Z=await ze(`/bonding/matches/${c}`);if(!Z)return;const De=_(Z);if(De!==M){if(M=De,t=Z,Z.rematchDeclined){$("Rematch was declined","info"),ie();return}ae()}}catch{}},800);function ae(){if(!t)return;const Z=e?._id||e?.id,De=Z&&t.player1?.userId?.toString()===Z.toString(),Ne=De?t.player1:t.player2||t.player1,ue=De&&t.player2||t.player1,Se=Z&&t.currentTurnUserId&&t.currentTurnUserId.toString()===Z.toString(),ye=t.status!=="active";let Oe=[];t.gameState?.players&&Array.isArray(t.gameState.players)&&t.gameState.players.length>0?Oe=t.gameState.players:Oe=[t.player1,t.player2].filter(Boolean);const Ue=[{emoji:"🐻",name:"Gentle Bear"},{emoji:"🦌",name:"Clever Deer"},{emoji:"🦊",name:"Swift Fox"},{emoji:"🦁",name:"Mighty Lion"}];i.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal arena-split-layout">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Left Sidebar Panel with Players & Controls -->
            <aside class="arena-sidebar-panel">
              <div class="arena-sidebar-players">
                ${Oe.map((ce,Me)=>{const qe=Ue[Me]||{emoji:"🎮",name:"Challenger"},Ee=ce.userId&&Z&&ce.userId.toString()===Z.toString();let Ie=!1,Pe="✕";if(t.gameType==="tictactoe"){const oe=ce.assignedRole||(Me===0?"X":"O");Ie=(t.turn===oe||t.currentTurnUserId&&ce.userId&&t.currentTurnUserId.toString()===ce.userId.toString())&&!ye,Pe=oe==="O"?"◯":"✕"}else if(t.gameType==="dotsboxes"){const oe=t.turn||t.gameState?.turnColor;Ie=(ce.color&&ce.color===oe||t.gameState?.turnIndex!==void 0&&t.gameState.turnIndex===Me||t.currentTurnUserId&&ce.userId&&t.currentTurnUserId.toString()===ce.userId.toString())&&!ye,Pe="⏹"}else if(t.gameType==="ludo"){const oe=t.turn||t.gameState?.turnColor;Ie=(ce.color&&ce.color===oe||t.currentTurnUserId&&ce.userId&&t.currentTurnUserId.toString()===ce.userId.toString())&&!ye,Pe="🎲"}else{const oe=ce.assignedRole||(Me===0?"white":"black");Ie=(t.turn===oe||t.currentTurnUserId&&ce.userId&&t.currentTurnUserId.toString()===ce.userId.toString())&&!ye,Pe="♟"}let C="";t.gameType==="dotsboxes"&&t.gameState?.scores?C=` · ${t.gameState.scores[ce.color]||0} pts`:t.gameType==="ludo"&&t.gameState?.tokens&&(C=` · ${(t.gameState.tokens[ce.color]||[]).filter(Te=>Te.step>=57).length}/4 Home`);const B=ce.name?ce.name:qe.name,u=Ee?"You":"Opponent";return`
                    <div class="game-sidebar-player-row ${Ie?"active-turn":""}">
                      <div class="turn-indicator-slot">
                        ${Ie?`
                          <div class="turn-pointer-pill">
                            <span class="pill-sym">${Pe}</span>
                            <span class="pill-txt">Turn</span>
                          </div>
                        `:""}
                      </div>
                      <div class="game-player-avatar-circle p-color-${Me}">
                        <span class="avatar-emoji">${qe.emoji}</span>
                      </div>
                      <div class="game-player-meta">
                        <div class="game-player-name" title="${v(B)}">${v(B)}</div>
                        <div class="game-player-role">${u}${C}</div>
                      </div>
                    </div>
                  `}).join("")}
              </div>

              <!-- Sidebar Bottom Footer -->
              <div class="arena-sidebar-footer">
                <div class="game-code-display">Game code: <strong>${(t._id||"7370").slice(-4).toUpperCase()}</strong></div>
                <div class="arena-sidebar-divider"></div>
                <div class="arena-sidebar-actions">
                  ${ye?`
                    <button class="sidebar-action-item danger" id="btn-arena-delete-match" type="button" title="Delete Match">
                      <span class="action-icon">🗑️</span>
                      <span>Delete Match</span>
                    </button>
                  `:`
                    <button class="sidebar-action-item" id="btn-arena-draw" type="button" title="Offer Draw to Opponent">
                      <span class="action-icon">🤝</span>
                      <span>Offer Draw</span>
                    </button>
                    <button class="sidebar-action-item" id="btn-arena-resign" type="button" title="Surrender Match">
                      <span class="action-icon">🏳️</span>
                      <span>Surrender</span>
                    </button>
                  `}
                  <button class="sidebar-action-item" id="btn-sidebar-leave" type="button" title="Exit Match">
                    <span class="action-icon">🚪</span>
                    <span>Leave Game</span>
                  </button>
                </div>
              </div>
            </aside>

            <!-- Right Main Arena Canvas -->
            <main class="arena-main-content">
              <!-- Draw Offer Notification -->
              ${t.drawOfferedBy&&t.drawOfferedBy.toString()!==Z?.toString()&&!ye?`
                <div class="arena-draw-offer-banner">
                  <span>🤝 ${v(ue?.name||"Opponent")} has offered a draw. Accept?</span>
                  <div style="display:flex;gap:8px;">
                    <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                    <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
                  </div>
                </div>
              `:""}

              <!-- Main Playing Board -->
              <div class="arena-board-wrap">
                ${t.gameType==="dotsboxes"?pe(De):""}
                ${t.gameType==="chess"?ge(De):""}
                ${t.gameType==="tictactoe"?le():""}
                ${t.gameType==="ludo"?xe(De):""}
              </div>

              <!-- Match Result Banner (When finished) -->
              ${ye?`
                <div class="arena-game-over-banner">
                  <div class="game-over-icon">${t.winnerId&&t.winnerId.toString()===Z?.toString()?"🏆":t.status==="draw"?"🤝":"🎖️"}</div>
                  <div class="game-over-text">
                    <h4>${t.winnerId&&t.winnerId.toString()===Z?.toString()?"VICTORY!":t.status==="draw"?"STALEMATE / DRAW":`${v(t.winnerName)} Wins!`}</h4>
                    <p>Reason: ${v(t.winningReason||"Match concluded")}</p>
                  </div>
                  <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                    ${t.rematchOfferedBy&&t.rematchOfferedBy.toString()===Z?.toString()?`
                      <div class="game-pending-text" style="font-size:12px;color:var(--text-2);padding:6px 12px;background:rgba(255,255,255,0.06);border-radius:var(--r-md);border:1px solid rgba(255,255,255,0.1);">
                        ⏳ Rematch requested. Waiting for opponent...
                      </div>
                    `:t.rematchOfferedBy?`
                      <button class="btn-arena-rematch" id="btn-arena-accept-rematch" style="background:#10b981;border-color:#10b981;">
                        ✅ Accept Rematch
                      </button>
                      <button class="btn-arena-action" id="btn-arena-decline-rematch" style="border:1px solid rgba(255,255,255,0.15);">
                        ❌ Decline
                      </button>
                    `:`
                      <button class="btn-arena-rematch" id="btn-arena-rematch-action">
                        🔄 Request Rematch
                      </button>
                    `}
                    <button class="btn-arena-action danger" id="btn-arena-delete-match-ended">
                      🗑️ Delete Match
                    </button>
                  </div>
                </div>
              `:""}
            </main>
          </div>
        </div>
      `,We(Se,De,Ne)}function pe(Z,De,Ne){const ue=t.gameState||{},Se=ue.rows||4,ye=ue.cols||4,Oe=ue.players||[{...t.player1,color:"red",assignedRole:"red"},{...t.player2,color:"blue",assignedRole:"blue"}],Ue=ue.activeColors||["red","blue"],ce=t.turn||ue.turnColor||"red",Me=e?._id||e?.id,Ee=(Oe.find(he=>he.userId&&he.userId.toString()===Me?.toString())||Oe[0])?.color||(Z?"red":"blue"),Ie=Ee===ce&&t.status==="active",Pe=ue.scores||{red:0,blue:0,green:0,amber:0},C=ue.hLines||Array(Se+1).fill(null).map(()=>Array(ye).fill(null)),B=ue.vLines||Array(Se).fill(null).map(()=>Array(ye+1).fill(null)),u=ue.boxes||Array(Se).fill(null).map(()=>Array(ye).fill(null)),oe={red:{name:"Red",hex:"#ef4444",light:"rgba(239,68,68,0.18)",border:"#f87171"},blue:{name:"Blue",hex:"#3b82f6",light:"rgba(59,130,246,0.18)",border:"#60a5fa"},green:{name:"Green",hex:"#10b981",light:"rgba(16,185,129,0.18)",border:"#34d399"},amber:{name:"Amber",hex:"#f59e0b",light:"rgba(245,158,11,0.18)",border:"#fbbf24"}},ne=Oe.find(he=>he.color===ce),Te=ne?v(ne.name):ce.toUpperCase();let G=[];for(let he=0;he<=Se*2;he++)for(let be=0;be<=ye*2;be++){const Fe=he%2===0,gt=be%2===0;if(Fe&&gt)G.push(`
              <div class="dots-cell dot-intersection" data-r="${he/2}" data-c="${be/2}">
                <span class="dots-dot"></span>
              </div>
            `);else if(Fe&&!gt){const Ce=he/2,_e=Math.floor(be/2),ke=C[Ce]&&C[Ce][_e],V=!!ke,He=ke?.color||"",Ae=Ie&&!V&&t.status==="active";G.push(`
              <div 
                class="dots-cell dots-line h-line ${V?"drawn color-"+He:""} ${Ae?"clickable my-color-"+Ee:""}"
                data-type="h" 
                data-r="${Ce}" 
                data-c="${_e}"
                role="button"
                tabindex="${Ae?"0":"-1"}"
                title="${V?`Drawn by ${v(ke.player||He)}`:Ae?"Click to draw line":""}"
              >
                <div class="dots-line-bar"></div>
              </div>
            `)}else if(!Fe&&gt){const Ce=Math.floor(he/2),_e=be/2,ke=B[Ce]&&B[Ce][_e],V=!!ke,He=ke?.color||"",Ae=Ie&&!V&&t.status==="active";G.push(`
              <div 
                class="dots-cell dots-line v-line ${V?"drawn color-"+He:""} ${Ae?"clickable my-color-"+Ee:""}"
                data-type="v" 
                data-r="${Ce}" 
                data-c="${_e}"
                role="button"
                tabindex="${Ae?"0":"-1"}"
                title="${V?`Drawn by ${v(ke.player||He)}`:Ae?"Click to draw line":""}"
              >
                <div class="dots-line-bar"></div>
              </div>
            `)}else{const Ce=Math.floor(he/2),_e=Math.floor(be/2),ke=u[Ce]&&u[Ce][_e],V=!!ke,He=ke?.owner||"",Ae=ke?.ownerName?ke.ownerName.charAt(0).toUpperCase():He.charAt(0).toUpperCase();G.push(`
              <div class="dots-cell dots-box ${V?"claimed color-"+He:""}" data-br="${Ce}" data-bc="${_e}">
                ${V?`
                  <div class="dots-box-claim-badge">
                    <span class="box-owner-initial">${Ae}</span>
                    <span class="box-score-tag">+1</span>
                  </div>
                `:""}
              </div>
            `)}}return`
        <div class="dotsboxes-arena-layout">
          <!-- Scoreboard Header for up to 4 Players -->
          <div class="dotsboxes-scoreboard">
            ${Ue.map(he=>{const be=Oe.find(_e=>_e.color===he)||{name:oe[he].name},Fe=ce===he&&t.status==="active",gt=be.userId&&be.userId.toString()===Me?.toString(),Ce=Pe[he]||0;return`
                <div class="dots-player-card ${he} ${Fe?"is-turn-active":""}">
                  <div class="dots-player-header">
                    <span class="dots-player-dot" style="background:${oe[he].hex}"></span>
                    <span class="dots-player-name">${v(be.name)} ${gt?"(You)":""}</span>
                    ${Fe?'<span class="dots-turn-pill">TURN</span>':""}
                  </div>
                  <div class="dots-player-score">
                    <span class="score-val" style="color:${oe[he].hex}">${Ce}</span>
                    <span class="score-lbl">boxes</span>
                  </div>
                </div>
              `}).join("")}
          </div>

          <!-- Board Grid Container (9x9) -->
          <div class="dotsboxes-board-wrapper">
            <div class="dotsboxes-grid">
              ${G.join("")}
            </div>
          </div>

          <!-- Console & Status Bar -->
          <div class="dotsboxes-console-bar">
            <div class="dots-guidance ${Ie?"highlight":""}">
              ${Ie?`👉 It is your turn (<strong>${oe[Ee].name}</strong>)! Click any open line between two dots to draw.`:`⏳ Waiting for <strong>${Te}</strong> (<strong>${oe[ce]?.name||ce}</strong>) to draw a line...`}
            </div>
            <div class="dots-caption">
              ${v(ue.lastActionText||"Connect 4 sides to claim a box and earn a bonus turn!")}
            </div>
          </div>
        </div>
      `}function ge(Z){const De=t.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Ne=new wa(De),ue=Z?t.player1.assignedRole==="white":t.player2.assignedRole==="white",Se={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},ye=ue?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Oe=ue?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Ue='<div class="chess-board-grid">';for(const qe of Oe)for(const Ee of ye){const Ie=`${Ee}${qe}`,Pe=Ne.get(Ie),C=(Ee.charCodeAt(0)-97+qe)%2!==0,B=k===Ie,u=A.includes(Ie),oe=Pe?Pe.color==="w"?Se[Pe.type.toUpperCase()]:Se[Pe.type]:"";Ue+=`
            <div class="chess-sq ${C?"light":"dark"} ${B?"selected":""} ${u?"legal-dot":""}" data-square="${Ie}">
              ${oe?`<span class="chess-piece ${Pe.color==="w"?"white-piece":"black-piece"}">${oe}</span>`:""}
            </div>
          `}Ue+="</div>";const Me=(t.moves||[]).map(qe=>`
        <span class="chess-move-token">${qe.moveNum}. ${qe.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${Ue}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${Me||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function le(){const Z=t.gameState?.board||Array(9).fill(null),De=t.winningCells||[];return`
        <div class="ttt-modern-court">
          <div class="ttt-modern-grid">
            ${Z.map((Ne,ue)=>{const Se=De.includes(ue);let ye="";return Ne==="X"?ye=`
                  <svg class="ttt-svg-symbol x" width="58" height="58" viewBox="0 0 58 58" fill="none">
                    <line x1="15" y1="15" x2="43" y2="43" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/>
                    <line x1="43" y1="15" x2="15" y2="43" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/>
                  </svg>
                `:Ne==="O"&&(ye=`
                  <svg class="ttt-svg-symbol o" width="58" height="58" viewBox="0 0 58 58" fill="none">
                    <circle cx="29" cy="29" r="16" stroke="#FF2A5F" stroke-width="8" fill="none"/>
                  </svg>
                `),`
                <div class="ttt-cell ttt-modern-tile ${Ne?"filled":"empty"} ${Se?"win-cell":""}" data-cell-idx="${ue}">
                  ${ye}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function xe(Z,De,Ne){const ue=t.gameState||{},Se=ue.activeColors||["red","green"],ye=ue.players||[{...t.player1,color:"red",assignedRole:"red",isBot:!1},{...t.player2,color:"green",assignedRole:"green",isBot:!1}],Oe=ue.tokens||{},Ue=d=>{const m=Oe[d]||(d==="red"?ue.p1Tokens:d==="green"?ue.p2Tokens:[])||[];return Array.from({length:4},(K,te)=>m[te]||{id:te,step:-1})},ce=Ue("red"),Me=Ue("green"),qe=Ue("yellow"),Ee=Ue("blue"),Ie=e?._id||e?.id,C=(ye.find(d=>d.userId&&d.userId.toString()===Ie?.toString())||ye[0])?.color||(Z?"red":"green"),B=ue.turnColor||t.turn||"red",u=C===B&&t.status==="active",oe=!!ue.rolled,ne=ue.dice,Te=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],G=[[7,1],[7,2],[7,3],[7,4],[7,5]],he=[[1,7],[2,7],[3,7],[4,7],[5,7]],be=[[7,13],[7,12],[7,11],[7,10],[7,9]],Fe=[[13,7],[12,7],[11,7],[10,7],[9,7]],gt=[0,8,13,21,26,34,39,47];function Ce(d,m){return m<0?null:m>=56?d==="red"?[7,6]:d==="green"?[6,7]:d==="yellow"?[7,8]:[8,7]:d==="red"?m<=50?Te[m]:G[m-51]:d==="green"?m<=50?Te[(13+m)%52]:he[m-51]:d==="yellow"?m<=50?Te[(26+m)%52]:be[m-51]:m<=50?Te[(39+m)%52]:Fe[m-51]}function _e(d,m){return d!==C||!u||!oe||!ne||t.status!=="active"?!1:m.step===-1?ne===6:m.step>=0&&m.step+ne<=56}const ke={},V=(d,m)=>{m.forEach(K=>{if(K.step>=0&&K.step<56){const te=Ce(d,K.step);if(te){const fe=te[0]+","+te[1];(ke[fe]=ke[fe]||[]).push({color:d,id:K.id,step:K.step,movable:_e(d,K)})}}})};Se.includes("red")&&V("red",ce),Se.includes("green")&&V("green",Me),Se.includes("yellow")&&V("yellow",qe),Se.includes("blue")&&V("blue",Ee);const He={};Te.forEach(([d,m],K)=>{He[d+","+m]=K});const Ae={};G.forEach(([d,m],K)=>{Ae[d+","+m]=K+1});const Xe={};he.forEach(([d,m],K)=>{Xe[d+","+m]=K+1});const ht={};be.forEach(([d,m],K)=>{ht[d+","+m]=K+1});const Ut={};Fe.forEach(([d,m],K)=>{Ut[d+","+m]=K+1});const Ht=[];for(let d=0;d<15;d++)for(let m=0;m<15;m++){if(d<6&&m<6||d<6&&m>8||d>8&&m<6||d>8&&m>8||d>=6&&d<=8&&m>=6&&m<=8)continue;const K=d+","+m,te=He[K],fe=te!==void 0&&gt.includes(te),rt=d===6&&m===1,bt=d===1&&m===8,ot=d===8&&m===13,Wt=d===13&&m===6,Ca=Ae[K],Ia=Xe[K],_a=ht[K],Da=Ut[K];let xt="ludo-cell";rt?xt+=" cell-red-start":bt?xt+=" cell-green-start":ot?xt+=" cell-yellow-start":Wt?xt+=" cell-blue-start":Ca?xt+=" cell-red-stretch":Ia?xt+=" cell-green-stretch":_a?xt+=" cell-yellow-stretch":Da?xt+=" cell-blue-stretch":fe&&(xt+=" cell-safe-star");const Aa=ke[K]||[];Ht.push(`
            <div class="${xt}" style="grid-row:${d+1};grid-column:${m+1}" data-pos="${K}">
              ${fe?'<span class="cell-star-glyph">⭐</span>':""}
              ${rt||bt||ot||Wt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Aa.map(_t=>`
                <div class="ludo-token token-${_t.color} ${_t.movable?"movable":""}" data-token-id="${_t.id}" data-color="${_t.color}" title="${_t.color.toUpperCase()} Pawn ${_t.id+1}">
                  <span>${_t.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function ea(d,m=!1){if(m||!d)return`
            <div class="ludo-direct-number-box num-prompt" role="img" aria-label="Dice ready">
              <span class="ludo-direct-num prompt-icon" style="font-size:30px;line-height:1;">🎲</span>
            </div>
          `;const K=Math.max(1,Math.min(6,Number(d)||1));return`
          <div class="ludo-direct-number-box num-${K}" role="img" aria-label="Number ${K}">
            <span class="ludo-direct-num">${K}</span>
          </div>
        `}function It(d,m,K,te,fe){const rt=`${d}-yard`;if(!K)return`
            <div class="ludo-yard ${rt}">
              <div class="yard-box decorative">
                <div class="yard-title">${m} (Inactive)</div>
              </div>
            </div>
          `;const bt=fe.filter(ot=>ot.step===56).length;return`
          <div class="ludo-yard ${rt} ${B===d?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${m}</span>
                ${bt>0?`<span class="yard-home-badge" title="${bt} of 4 pawns reached Home!">👑 ${bt}/4 Home</span>`:""}
                ${te?`<small class="yard-player-lbl">${v(te.name)}${te.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${fe.map((ot,Wt)=>`
                  <div class="yard-token-slot ${ot.step===56?"slot-home":""}">
                    ${ot.step===-1?`
                      <div class="ludo-token token-${d} ${_e(d,ot)?"movable":""}" data-token-id="${ot.id}" data-color="${d}" title="${d.toUpperCase()} Pawn ${ot.id+1}">
                        <span>${ot.id+1}</span>
                      </div>
                    `:ot.step===56?`
                      <div class="ludo-token token-reached-home token-${d}" title="${d.toUpperCase()} Pawn ${ot.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${ot.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${Wt+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Mt=ye.find(d=>d.color==="red"),Gt=ye.find(d=>d.color==="green"),ta=ye.find(d=>d.color==="yellow"),aa=ye.find(d=>d.color==="blue"),zt=ye.find(d=>d.color===B)||(B==="red"?Mt:Gt),yt=zt?v(zt.name):B.toUpperCase(),na={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[B]||"🔴",ut=!!(oe&&(ne||ue.lastRoll&&ue.lastRollColor===B)),kt=ne||(ut?ue.lastRoll:null),Pt=u&&!ut&&t.status==="active",w=Ue(C).filter(d=>_e(C,d));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${It("red","🔴 Red Base",Se.includes("red"),Mt,ce)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${It("green","🟢 Green Base",Se.includes("green"),Gt,Me)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${It("blue","🔵 Blue Base",Se.includes("blue"),aa,Ee)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${It("yellow","🟡 Yellow Base",Se.includes("yellow"),ta,qe)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${ce.filter(d=>d.step===56).map(d=>`<div class="home-tri-pawn red" title="Red Pawn ${d.id+1} Home! 👑">👑${d.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${Me.filter(d=>d.step===56).map(d=>`<div class="home-tri-pawn green" title="Green Pawn ${d.id+1} Home! 👑">👑${d.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${qe.filter(d=>d.step===56).map(d=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${d.id+1} Home! 👑">👑${d.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${Ee.filter(d=>d.step===56).map(d=>`<div class="home-tri-pawn blue" title="Blue Pawn ${d.id+1} Home! 👑">👑${d.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...ce.filter(d=>d.step===56).map(d=>({col:"red",id:d.id})),...Me.filter(d=>d.step===56).map(d=>({col:"green",id:d.id})),...qe.filter(d=>d.step===56).map(d=>({col:"yellow",id:d.id})),...Ee.filter(d=>d.step===56).map(d=>({col:"blue",id:d.id}))].map(d=>`
                    <div class="tok-home-champion ${d.col}" title="${d.col.toUpperCase()} Pawn ${d.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${d.id+1}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Ht.join("")}
          </div>

          <!-- Ludo Action & Interactive Dice Console -->
          <div class="ludo-interactive-console">
            <div class="ludo-dice-interactive-box">
              <div 
                class="ludo-3d-dice ${Pt?"clickable":""} ${ut?"just-rolled":""} border-${B}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${Pt?"0":"-1"}"
                title="${Pt?"Tap dice to roll!":u?"Choose a pawn to move":ut?`${yt} rolled ${kt}`:`Waiting for ${yt} to roll`}"
                style="${Pt?"cursor:pointer;touch-action:manipulation;":""}"
              >
                ${ea(kt,!ut)}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${B}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${yt}</strong> (${B.toUpperCase()})
                </span>
                ${u?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${u&&ut?"highlight":""}">
                ${u&&!ut&&t.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":u&&ut&&t.status==="active"?w.length>0?w.length===1?`🎲 Rolled <strong>${kt}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${kt}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${kt}</strong>. No legal moves possible — turn passing...`:t.status==="active"?ut?`🎲 ${na} <strong>${yt}</strong> rolled <strong>${kt}</strong>!`:`⏳ Waiting for <strong>${yt}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${v(ue.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function We(Z,De,Ne){const ue=i.querySelector("#btn-close-arena");ue&&(ue.onclick=ie);const Se=i.querySelector("#btn-sidebar-leave");Se&&(Se.onclick=ie);const ye=i.querySelector("#btn-arena-settings");ye&&(ye.onclick=()=>{$(`🎮 ${t.gameTitle} • Code ${(t._id||"7370").slice(-4).toUpperCase()} • Audio & Visual cues enabled`,"info")});const Oe=i.querySelector("#btn-arena-resign");Oe&&(Oe.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{Oe.disabled=!0,await ve(`/bonding/matches/${c}/action`,{action:"resign"}),await Q(),ae()}catch(C){$(C.message||"Resign failed","error"),Oe.disabled=!1}});const Ue=i.querySelector("#btn-arena-draw");Ue&&(Ue.onclick=async()=>{try{await ve(`/bonding/matches/${c}/action`,{action:"offer_draw"}),$("Draw offer sent to opponent","info"),await Q(),ae()}catch(C){$(C.message||"Draw offer failed","error")}});const ce=i.querySelector("#btn-confirm-accept-draw");ce&&(ce.onclick=async()=>{try{await ve(`/bonding/matches/${c}/action`,{action:"accept_draw"}),$("Draw agreed!","info"),await Q(),ae()}catch(C){$(C.message,"error")}});const Me=i.querySelector("#btn-confirm-decline-draw");Me&&(Me.onclick=async()=>{try{await ve(`/bonding/matches/${c}/action`,{action:"decline_draw"}),await Q(),ae()}catch(C){$(C.message,"error")}}),[i.querySelector("#btn-arena-delete-match"),i.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(C=>{C.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{C.disabled=!0,await nt(`/bonding/matches/${c}`),$("Match deleted","success"),ie(),h==="lounge_games"&&await y()}catch(B){$(B.message||"Failed to delete match","error"),C.disabled=!1}}});const Ee=i.querySelector("#btn-arena-rematch-action");Ee&&(Ee.onclick=async()=>{try{Ee.disabled=!0,Ee.textContent="Requesting...";const C=await ve(`/bonding/matches/${c}/action`,{action:"rematch_request"});C.match&&(t=C.match,M=_(C.match),ae(),$("Rematch request sent! Waiting for opponent ⚔️","info"))}catch(C){$(C.message||"Rematch request failed","error"),Ee.disabled=!1,Ee.textContent="🔄 Request Rematch"}});const Ie=i.querySelector("#btn-arena-accept-rematch");Ie&&(Ie.onclick=async()=>{try{Ie.disabled=!0,Ie.textContent="Starting...";const C=await ve(`/bonding/matches/${c}/action`,{action:"rematch_accept"});C.match&&(t=C.match,M=_(C.match),$("Rematch started! Same game is live ⚔️","success"),ae())}catch(C){$(C.message||"Could not accept rematch","error"),Ie.disabled=!1}});const Pe=i.querySelector("#btn-arena-decline-rematch");if(Pe&&(Pe.onclick=async()=>{try{await ve(`/bonding/matches/${c}/action`,{action:"rematch_decline"}),$("Rematch declined","info"),ie()}catch{ie()}}),t.gameType==="dotsboxes"&&Z&&t.status==="active"&&i.querySelectorAll(".dots-line.clickable").forEach(C=>{C.onclick=async()=>{const B=C.dataset.type,u=C.dataset.r,oe=C.dataset.c;try{C.style.opacity="0.5";const ne=await ve(`/bonding/matches/${c}/move`,{type:B,r:u,c:oe});t=ne,M=_(ne),ae()}catch(ne){C.style.opacity="1",$(ne.message||"Failed to draw line","error")}}}),t.gameType==="chess"&&Z&&t.status==="active"){const C=t.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",B=new wa(C),u=Ne.assignedRole==="white"?"w":"b";i.querySelectorAll(".chess-sq").forEach(oe=>{oe.onclick=async()=>{const ne=oe.dataset.square;if(k){if(k===ne){k=null,A=[],ae();return}if(A.includes(ne)){const G=B.get(k);let he;G&&G.type==="p"&&(ne.endsWith("8")||ne.endsWith("1"))&&(he=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const be={from:k,to:ne,promotion:he?he.toLowerCase():void 0};k=null,A=[],t=await ve(`/bonding/matches/${c}/move`,{move:be}),ae()}catch(be){$(be.message||"Illegal chess move","error"),k=null,A=[],ae()}return}}const Te=B.get(ne);Te&&Te.color===u?(k=ne,A=B.moves({square:ne,verbose:!0}).map(he=>he.to),ae()):(k=null,A=[],ae())}})}if(t.gameType==="tictactoe"&&Z&&t.status==="active"&&i.querySelectorAll(".ttt-cell.empty").forEach(C=>{C.onclick=async()=>{const B=C.dataset.cellIdx;try{C.style.opacity="0.5",t=await ve(`/bonding/matches/${c}/move`,{cellIndex:Number(B)}),ae()}catch(u){$(u.message||"Invalid move","error")}}}),t.gameType==="ludo"&&t.status==="active"){const C=t.gameState||{},B=!!C.rolled,u=C.turnColor||t.turn||"red",oe=!!(B&&(C.dice||C.lastRoll&&C.lastRollColor===u)),ne=e?._id||e?.id,Te=C.players||[{...t.player1,color:"red",assignedRole:"red",isBot:!1},{...t.player2,color:"green",assignedRole:"green",isBot:!1}],G=ne&&t.player1.userId.toString()===ne.toString(),be=(Te.find(ke=>ke.userId&&ke.userId.toString()===ne?.toString())||(G?Te[0]:Te[1]))?.color||(G?"red":"green"),Fe=be===u&&t.status==="active",gt=Te.find(ke=>ke.color===u)||(u==="red"?t.player1:t.player2),Ce=v(gt?.name||(u==="red"?"Player 1":"Player 2")),_e=i.querySelector("#btn-interactive-ludo-dice");if(_e){const ke=async V=>{if(V&&(V.preventDefault(),V.stopPropagation()),!Fe){$(`${Ce}'s turn right now`,"info");return}if(oe){$("Dice already rolled! Tap your glowing pawn to move.","info");return}if(t.status!=="active"){$("Match has ended","info");return}if(ee||_e.dataset.rolling==="true")return;ee=!0,O=Date.now(),_e.dataset.rolling="true",_e.classList.add("rolling");let He=0;const Ae=setInterval(()=>{He++;const Xe=Math.floor(Math.random()*6)+1;_e.innerHTML=renderNumberDisplay(Xe),He>=4&&clearInterval(Ae)},50);try{const Xe=await ve(`/bonding/matches/${c}/move`,{action:"roll"});clearInterval(Ae),t=Xe,M=_(Xe),ae()}catch(Xe){clearInterval(Ae),$(Xe.message||"Failed to roll dice","error"),_e&&(delete _e.dataset.rolling,_e.classList.remove("rolling"))}finally{ee=!1}};_e.onclick=ke,_e.onkeydown=V=>{(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),ke(V))}}if(Fe&&oe){const V=(C.tokens||{})[be]||[],He=C.dice||C.lastRoll||0,Ae=V.filter(Xe=>Xe.step===-1&&He===6||Xe.step>=0&&Xe.step+He<=56);if(Ae.length===1&&!Y){Y=!0;const Xe=Ae[0];D&&clearTimeout(D),D=setTimeout(async()=>{try{const ht=await ve(`/bonding/matches/${c}/move`,{action:"move",tokenId:Number(Xe.id)});t=ht,M=_(ht),Y=!1,ae()}catch(ht){Y=!1,$(ht.message||"Auto-move failed","error")}},400)}}Fe&&B&&i.querySelectorAll(".ludo-token.movable").forEach(ke=>{ke.onclick=async V=>{V.stopPropagation();const He=ke.dataset.tokenId;try{ke.style.opacity="0.5";const Ae=await ve(`/bonding/matches/${c}/move`,{action:"move",tokenId:Number(He)});t=Ae,M=_(Ae),ae()}catch(Ae){$(Ae.message||"Invalid token move","error"),ke.style.opacity="1"}}})}}ae()}function H(){if(!p||p.type==="direct")return;const c=s.querySelector("#bonding-modals-root"),i=O=>O==="employee"||O==="admin"||O==="superadmin",t=p.members||[],k=new Set(t.map(O=>O.userId?.toString())),A=o.filter(O=>i(O.role)&&!k.has(O._id.toString()));c.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${v(p.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${A.map(O=>`
                    <option value="${O._id}">${v(O.name)} (${v(O.role==="superadmin"?"Superadmin":O.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${A.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${A.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${t.length}):</label>
              <div class="bonding-members-list">
                ${t.map(O=>{const _=e?._id||e?.id,Q=_&&O.userId&&O.userId.toString()===_.toString(),ie=p.createdBy&&p.createdBy.userId&&String(p.createdBy.userId)===String(_),ae=g==="superadmin"||e?.role==="superadmin",pe=ie||ae;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(O.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${v(O.name)} ${Q?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${v(O.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${Q?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${O.userId}">
                            🚪 Leave Group
                          </button>
                        `:pe?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${O.userId}" data-name="${v(O.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const O=e?._id||e?.id,_=p.createdBy&&p.createdBy.userId&&String(p.createdBy.userId)===String(O),Q=g==="superadmin"||e?.role==="superadmin";return _||Q?`
                <!-- Delete Group Option in Modal (Creator only) -->
                <div class="bonding-danger-zone">
                  <div class="danger-zone-text">
                    <strong>Delete Group</strong>
                    <span>Permanently delete this group lounge and remove all its messages.</span>
                  </div>
                  <button class="bonding-btn-danger" id="btn-modal-delete-group">
                    Delete Group
                  </button>
                </div>
              `:`
                <!-- Leave Group Option in Modal (Members) -->
                <div class="bonding-danger-zone">
                  <div class="danger-zone-text">
                    <strong>Leave Group</strong>
                    <span>Exit this group lounge. You can rejoin if invited again.</span>
                  </div>
                  <button class="bonding-btn-danger" id="btn-modal-leave-group">
                    🚪 Leave Group
                  </button>
                </div>
              `})()}
          </div>
        </div>
      </div>
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""};const M=c.querySelector("#btn-modal-delete-group");M&&(M.onclick=()=>{c.innerHTML="",R()});const D=c.querySelector("#btn-modal-leave-group");D&&(D.onclick=()=>{c.innerHTML="",F()}),c.querySelectorAll(".btn-leave-group-action").forEach(O=>{O.onclick=()=>{c.innerHTML="",F()}});const Y=c.querySelector("#btn-submit-add-member");Y&&(Y.onclick=async()=>{const _=c.querySelector("#sel-add-colleague").value;if(!_){$("Please select a colleague to add","warning");return}try{Y.disabled=!0,Y.textContent="Adding...";const Q=await Jt(`/bonding/channels/${p._id}/members`,{action:"add",userIds:[_]});$("Colleague added to group! 🎉","success"),p=Q.channel,c.innerHTML="",await Le(p._id),Re()}catch(Q){$(Q.message||"Failed to add member","error"),Y.disabled=!1,Y.textContent="Add to Group"}}),c.querySelectorAll(".btn-remove-member").forEach(O=>{O.onclick=async()=>{const _=O.dataset.userId,Q=O.dataset.name;if(confirm(`Are you sure you want to remove ${Q} from this group?`))try{O.disabled=!0;const ie=await Jt(`/bonding/channels/${p._id}/members`,{action:"remove",userId:_});$(`${Q} removed from group`,"info"),p=ie.channel,c.innerHTML="",await Le(p._id),Re()}catch(ie){$(ie.message||"Failed to remove member","error"),O.disabled=!1}}})}async function F(){if(!p||p.type==="direct")return;const c=p.name;if(confirm(`Are you sure you want to leave the group "${c}"?`))try{await ve(`/bonding/channels/${p._id}/leave`,{}),$(`You left "${c}"`,"info"),b=await ze("/bonding/channels").catch(()=>[]),p=b.find(t=>t.type==="group")||b[0]||null,Be(),Re(),p&&await Le(p._id)}catch(t){$(t.message||"Failed to leave group","error")}}async function R(){if(!p||p.type==="direct")return;const c=p.name;if(confirm(`Are you sure you want to delete the group "${c}"?

All messages in this lounge will be deleted.`))try{await nt(`/bonding/channels/${p._id}`),$(`Group "${c}" deleted successfully`,"success"),b=await ze("/bonding/channels").catch(()=>[]),p=b.find(t=>t.type==="group")||b[0]||null,Be(),Re(),p&&await Le(p._id)}catch(t){$(t.message||"Failed to delete group","error")}}function x(){const c=s.querySelector("#bonding-modals-root"),i=A=>A==="employee"||A==="admin"||A==="superadmin",t=o.filter(A=>!A.isSelf&&i(A.role));c.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${t.map(A=>`
                <div class="bonding-user-pick-item" data-user-id="${A._id}" data-name="${v(A.name)}">
                  <div class="bonding-member-avatar">${A.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${v(A.name)}</span>
                    <span class="user-pick-role">${v(A.role==="superadmin"?"Superadmin":A.role==="admin"?"Admin":"Employee")} · ${v(A.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelectorAll(".bonding-user-pick-item").forEach(A=>{A.onclick=async()=>{const M=A.dataset.userId;try{const D=await ve("/bonding/channels",{type:"direct",targetUserId:M});c.innerHTML="",b=await ze("/bonding/channels"),p=b.find(Y=>Y._id===D._id)||D,Be(),Re(),await Le(p._id)}catch(D){$(D.message||"Failed to open personal chat","error")}}})}function E(){const c=s.querySelector("#bonding-modals-root"),i=D=>D==="employee"||D==="admin"||D==="superadmin",t=o.filter(D=>!D.isSelf&&i(D.role));c.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Create a New Group Lounge</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <div class="bonding-form-section">
              <label class="bonding-form-label">Group Name *</label>
              <input type="text" id="new-group-name" class="bonding-input" placeholder="e.g. Design Sync, Dev Team, Marketing Lounge..." />
            </div>

            <div class="bonding-form-section">
              <label class="bonding-form-label">Description (Optional)</label>
              <input type="text" id="new-group-desc" class="bonding-input" placeholder="What is this group about?" />
            </div>

            <div class="bonding-form-section">
              <label class="bonding-form-label">Select Group Icon</label>
              <div class="bonding-avatar-picker" id="new-group-avatar-pick">
                <span class="avatar-opt active">👥</span>
                <span class="avatar-opt">☕</span>
                <span class="avatar-opt">💡</span>
                <span class="avatar-opt">🚀</span>
                <span class="avatar-opt">💬</span>
                <span class="avatar-opt">🍕</span>
                <span class="avatar-opt">🎯</span>
                <span class="avatar-opt">⭐</span>
              </div>
            </div>

            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Initial Members (Employees & Admins only)</label>
              <div class="bonding-member-checkboxes">
                ${t.map(D=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${D._id}" />
                    <span>${v(D.name)} (${v(D.role==="superadmin"?"Superadmin":D.role==="admin"?"Admin":"Employee")})</span>
                  </label>
                `).join("")}
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-create-grp">Cancel</button>
              <button class="bonding-btn-primary" id="btn-confirm-create-grp">Create Group 🎉</button>
            </div>
          </div>
        </div>
      </div>
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelector("#btn-cancel-create-grp").onclick=()=>{c.innerHTML=""};let k="👥";const A=c.querySelectorAll(".avatar-opt");A.forEach(D=>{D.onclick=()=>{A.forEach(Y=>Y.classList.remove("active")),D.classList.add("active"),k=D.textContent.trim()}});const M=c.querySelector("#btn-confirm-create-grp");M.onclick=async()=>{const D=c.querySelector("#new-group-name"),Y=c.querySelector("#new-group-desc"),ee=D.value.trim();if(!ee){$("Please enter a group name","warning"),D.focus();return}const O=c.querySelectorAll(".new-group-member-chk:checked"),_=Array.from(O).map(Q=>Q.value);try{M.disabled=!0,M.textContent="Creating...";const Q=await ve("/bonding/channels",{type:"group",name:ee,description:Y.value.trim(),avatar:k,memberIds:_});$(`Group "${ee}" created! 🎉`,"success"),c.innerHTML="",b=await ze("/bonding/channels"),p=b.find(ie=>ie._id===Q._id)||Q,Be(),Re(),await Le(p._id)}catch(Q){$(Q.message||"Failed to create group","error"),M.disabled=!1,M.textContent="Create Group 🎉"}}}function X(c,i){const t=document.querySelector(".bonding-chat-emoji-palette");if(t){t.remove();return}const k=[{name:"Smileys & Faces",icon:"😀",emojis:["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","😉","😍","🥰","😘","😋","😎","🤔","🤨","😐","😴","🤯","🥳","🥺"]},{name:"Hands & People",icon:"👍",emojis:["👍","👎","👏","🙌","👐","🤝","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","👇","💪","🫡","🙏","🙋","🙆"]},{name:"Celebration & Work",icon:"🎉",emojis:["🎉","🎊","🔥","✨","💯","🚀","🎯","🏆","🥇","⭐","🌟","💡","📌","💼","📊","📈","⏱️","⏳","✅","❌","⚡"]},{name:"Break & Fun",icon:"☕",emojis:["☕","🍵","🍕","🍔","🍟","🎂","🍰","🍩","🍿","🍺","🍻","🎮","🎲","⏹️","🧩","🎵","🏖️","⚽","❤️","💖","💙"]}];let A=0;const M=document.createElement("div");M.className="bonding-chat-emoji-palette";function D(){const O=k[A];M.innerHTML=`
        <div class="emoji-palette-tabs">
          ${k.map((_,Q)=>`
            <button class="emoji-tab-btn ${Q===A?"active":""}" data-cat-idx="${Q}" title="${_.name}">
              ${_.icon}
            </button>
          `).join("")}
        </div>
        <div class="emoji-palette-header">
          <span>${O.name}</span>
          <button class="emoji-palette-close" type="button">&times;</button>
        </div>
        <div class="emoji-palette-grid">
          ${O.emojis.map(_=>`
            <button class="chat-emoji-cell" data-e="${_}" type="button">${_}</button>
          `).join("")}
        </div>
      `,M.querySelectorAll(".emoji-tab-btn").forEach(_=>{_.onclick=Q=>{Q.stopPropagation(),A=Number(_.dataset.catIdx),D()}}),M.querySelector(".emoji-palette-close").onclick=_=>{_.stopPropagation(),M.remove()},M.querySelectorAll(".chat-emoji-cell").forEach(_=>{_.onclick=Q=>{Q.stopPropagation(),i(_.dataset.e),M.remove()}})}D();const Y=c.getBoundingClientRect();M.style.position="fixed",M.style.bottom=`${window.innerHeight-Y.top+8}px`,M.style.left=`${Math.max(12,Math.min(window.innerWidth-300,Y.left-40))}px`,document.body.appendChild(M);const ee=O=>{!M.contains(O.target)&&O.target!==c&&!c.contains(O.target)&&(M.remove(),document.removeEventListener("click",ee))};setTimeout(()=>document.addEventListener("click",ee),10)}function I(c,i){const t=document.querySelector(".bonding-emoji-popup");t&&t.remove();const k=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],A=document.createElement("div");A.className="bonding-emoji-popup",A.innerHTML=k.map(Y=>`<button class="emoji-opt-btn" data-e="${Y}">${Y}</button>`).join("");const M=c.getBoundingClientRect();A.style.top=`${M.bottom+window.scrollY+6}px`,A.style.left=`${M.left+window.scrollX}px`,document.body.appendChild(A),A.querySelectorAll(".emoji-opt-btn").forEach(Y=>{Y.onclick=ee=>{ee.stopPropagation(),i(Y.dataset.e),A.remove()}});const D=Y=>{A.contains(Y.target)||(A.remove(),document.removeEventListener("click",D))};setTimeout(()=>document.addEventListener("click",D),10)}function L(c){if(!c)return"";try{return new Date(c).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function on(){const s=document.getElementById("ci360-bonding-styles");s&&s.remove();const a=document.createElement("style");a.id="ci360-bonding-styles",a.textContent=`
    /* Root Wrap */
    .bonding-wrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 0 2px;
      font-family: inherit;
      color: var(--text-1, #0f172a);
    }

    /* Top Navigation / Header Bar */
    .bonding-nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(224, 242, 254, 0.75) 0%, rgba(240, 249, 255, 0.88) 45%, rgba(255, 255, 255, 0.95) 100%);
      border: 1px solid rgba(186, 230, 253, 0.7);
      padding: 16px 24px;
      box-shadow: 0 4px 20px rgba(186, 230, 253, 0.28);
      transition: all 0.2s ease;
    }

    [data-theme="dark"] .bonding-nav-bar {
      background: linear-gradient(135deg, rgba(6, 24, 60, 0.85) 0%, rgba(5, 15, 38, 0.95) 100%) !important;
      border: 1px solid rgba(56, 189, 248, 0.25) !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(125, 211, 252, 0.18) !important;
    }

    .bonding-nav-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .bonding-logo-badge {
      font-size: 24px;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #0284C7 0%, #0070F3 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(0, 112, 243, 0.35);
      color: #ffffff;
      flex-shrink: 0;
    }

    .bonding-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0 0 2px 0;
    }

    [data-theme="dark"] .bonding-title {
      color: #f9fafb !important;
    }

    .bonding-subtitle {
      font-size: 12.5px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    [data-theme="dark"] .bonding-subtitle {
      color: #9ca3af !important;
    }

    /* View Switcher Tabs */
    .bonding-view-tabs {
      display: flex;
      gap: 6px;
      background: var(--bg-muted, #f1f5f9);
      padding: 4px;
      border-radius: 12px;
    }

    [data-theme="dark"] .bonding-view-tabs {
      background: #1e293b;
    }

    .bonding-view-tab {
      padding: 8px 16px;
      border-radius: 9px;
      border: none;
      background: transparent;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-2, #475569);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-view-tab {
      color: #94a3b8;
    }

    .bonding-view-tab.active {
      background: var(--bg-card, #ffffff);
      color: #0070F3;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }

    [data-theme="dark"] .bonding-view-tab.active {
      background: #0f172a;
      color: #38BDF8;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    }

    .bonding-nav-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bonding-top-action-btn {
      padding: 8px 14px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-card, #ffffff);
      color: var(--text-1, #1e293b);
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-top-action-btn {
      background: #1e293b;
      border-color: #334155;
      color: #f1f5f9;
    }

    .bonding-top-action-btn:hover {
      background: var(--bg-hover, #f8fafc);
      border-color: #94a3b8;
    }

    [data-theme="dark"] .bonding-top-action-btn:hover {
      background: #283548;
      border-color: #475569;
    }

    .bonding-top-action-btn.primary {
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      box-shadow: 0 3px 8px rgba(0, 112, 243, 0.3);
    }

    .bonding-top-action-btn.primary:hover {
      opacity: 0.93;
      transform: translateY(-1px);
    }

    /* Main Chat Layout */
    .bonding-chat-layout {
      display: grid;
      grid-template-columns: 310px 1fr;
      gap: 16px;
      height: calc(100vh - 210px);
      min-height: 580px;
    }

    @media (max-width: 900px) {
      .bonding-chat-layout {
        grid-template-columns: 1fr;
        height: auto;
      }
    }

    /* Sidebar */
    .bonding-sidebar {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .bonding-sidebar {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .bonding-search-box input {
      width: 100%;
      box-sizing: border-box;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      color: inherit;
      font-size: 13px;
      outline: none;
      transition: border-color 0.15s ease;
    }

    [data-theme="dark"] .bonding-search-box input {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 16px 0 8px 0;
    }

    .bonding-section-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.8px;
      color: var(--text-3, #94a3b8);
    }

    .bonding-mini-btn {
      font-size: 11.5px;
      font-weight: 600;
      color: #0070F3;
      background: transparent;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 2px 6px;
      border-radius: 6px;
    }

    .bonding-mini-btn:hover {
      background: rgba(0, 112, 243, 0.1);
    }

    .bonding-channel-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bonding-channel-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.15s ease;
      position: relative;
    }

    .bonding-channel-item:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-channel-item:hover {
      background: #1e293b;
    }

    .bonding-channel-item.active {
      background: rgba(0, 112, 243, 0.12);
      border-left: 3px solid #0070F3;
    }

    [data-theme="dark"] .bonding-channel-item.active {
      background: rgba(0, 112, 243, 0.22);
      border-left-color: #38BDF8;
    }

    .bonding-channel-avatar, .bonding-channel-icon {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
      color: #4338ca;
      font-size: 15px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    [data-theme="dark"] .bonding-channel-avatar, [data-theme="dark"] .bonding-channel-icon {
      background: #2e3b52;
      color: #c7d2fe;
    }

    .bonding-channel-info {
      flex: 1;
      min-width: 0;
    }

    .bonding-channel-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-1, #0f172a);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-theme="dark"] .bonding-channel-name {
      color: #f1f5f9;
    }

    .bonding-channel-preview {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .bonding-channel-del-btn {
      opacity: 0;
      background: transparent;
      border: none;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 5px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      flex-shrink: 0;
      margin-left: auto;
    }

    .bonding-channel-item:hover .bonding-channel-del-btn {
      opacity: 0.75;
    }

    .bonding-channel-del-btn:hover {
      opacity: 1 !important;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.12);
    }

    /* Main Chat Panel */
    .bonding-chat-main {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .bonding-chat-main {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .bonding-chat-header {
      padding: 12px 18px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    [data-theme="dark"] .bonding-chat-header {
      border-color: #1f2937;
    }

    .bonding-chat-header-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .bonding-chat-header-avatar {
      font-size: 20px;
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: rgba(0, 112, 243, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-chat-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-chat-title {
      color: #f9fafb;
    }

    .bonding-chat-sub {
      font-size: 12px;
      color: var(--text-3, #64748b);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-online {
      color: #10b981;
      font-weight: 600;
    }

    .bonding-chat-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bonding-header-btn {
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: transparent;
      color: var(--text-2, #334155);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-header-btn {
      border-color: #334155;
      color: #cbd5e1;
    }

    .bonding-header-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-header-btn:hover {
      background: #1e293b;
    }

    .bonding-header-btn.challenge-highlight {
      background: rgba(0, 112, 243, 0.12);
      border-color: #38BDF8;
      color: #0070F3;
    }

    [data-theme="dark"] .bonding-header-btn.challenge-highlight {
      background: rgba(0, 112, 243, 0.25);
      color: #a5b4fc;
    }

    .bonding-header-btn.danger {
      color: #ef4444;
      border-color: rgba(239, 68, 68, 0.3);
    }

    .bonding-header-btn.danger:hover {
      background: rgba(239, 68, 68, 0.1);
    }

    /* Messages container */
    .bonding-messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bonding-empty-feed {
      margin: auto;
      text-align: center;
      color: var(--text-3, #94a3b8);
      padding: 40px 20px;
    }

    .bonding-empty-icon {
      font-size: 40px;
      margin-bottom: 8px;
    }

    .bonding-msg-row {
      display: flex;
      gap: 10px;
      max-width: 78%;
    }

    .bonding-msg-row.self {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    .bonding-msg-row.other {
      align-self: flex-start;
    }

    .bonding-msg-avatar {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: #e2e8f0;
      color: #475569;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    [data-theme="dark"] .bonding-msg-avatar {
      background: #334155;
      color: #f1f5f9;
    }

    .bonding-msg-bubble-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bonding-msg-row.self .bonding-msg-bubble-wrap {
      align-items: flex-end;
    }

    .bonding-msg-meta {
      font-size: 11.5px;
      color: var(--text-3, #94a3b8);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .bonding-msg-del-btn {
      opacity: 0;
      background: transparent;
      border: none;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      font-size: 11px;
    }

    .bonding-msg-row:hover .bonding-msg-del-btn,
    .bonding-msg-system:hover .bonding-msg-del-btn {
      opacity: 0.75;
    }

    .bonding-msg-del-btn:hover {
      opacity: 1 !important;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.12);
    }

    .bonding-msg-del-btn.mini {
      margin-left: 8px;
      font-size: 14px;
      line-height: 1;
    }

    .bonding-msg-sender {
      font-weight: 600;
      color: var(--text-2, #475569);
    }

    [data-theme="dark"] .bonding-msg-sender {
      color: #cbd5e1;
    }

    .bonding-msg-bubble {
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.45;
      word-break: break-word;
      background: var(--bg-muted, #f1f5f9);
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-msg-bubble {
      background: #1e293b;
      color: #f8fafc;
    }

    .bonding-msg-row.self .bonding-msg-bubble {
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
    }

    .bonding-msg-system {
      align-self: center;
      background: rgba(0, 112, 243, 0.08);
      color: #0284C7;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin: 4px 0;
    }

    [data-theme="dark"] .bonding-msg-system {
      background: rgba(0, 112, 243, 0.2);
      color: #a5b4fc;
    }

    /* Game Card inside Chat Stream */
    .bonding-game-card-bubble {
      background: var(--bg-surface, #ffffff);
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 14px;
      padding: 14px;
      width: 290px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    [data-theme="dark"] .bonding-game-card-bubble {
      background: #1a2333;
      border-color: #334155;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    }

    .game-bubble-top {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }

    .game-bubble-icon {
      font-size: 26px;
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: rgba(0, 112, 243, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .game-bubble-title {
      font-size: 14.5px;
      font-weight: 700;
      margin: 0 0 2px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .game-bubble-title {
      color: #f9fafb;
    }

    .game-bubble-desc {
      font-size: 12px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    .game-bubble-status {
      margin: 8px 0;
    }

    .game-bubble-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 10px;
    }

    .game-btn-accept {
      flex: 1;
      padding: 7px 12px;
      background: #10b981;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }

    .game-btn-decline {
      padding: 7px 10px;
      background: transparent;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 12px;
      cursor: pointer;
      color: var(--text-2, #64748b);
    }

    .game-btn-cancel {
      padding: 5px 10px;
      background: transparent;
      border: 1px solid #ef4444;
      color: #ef4444;
      border-radius: 6px;
      font-size: 11.5px;
      cursor: pointer;
    }

    .game-btn-play {
      flex: 1;
      padding: 8px 12px;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.3);
    }

    /* Reactions row */
    .bonding-reactions-row {
      display: flex;
      gap: 4px;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 2px;
    }

    .bonding-rxn-tag {
      padding: 2px 7px;
      border-radius: 12px;
      border: 1px solid var(--border-sm, #e2e8f0);
      background: var(--bg-card, #ffffff);
      font-size: 12px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    [data-theme="dark"] .bonding-rxn-tag {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-rxn-tag.active {
      border-color: #0070F3;
      background: rgba(0, 112, 243, 0.12);
    }

    .bonding-add-rxn-btn {
      padding: 2px 6px;
      border-radius: 12px;
      border: 1px dashed var(--border-sm, #cbd5e1);
      background: transparent;
      font-size: 11.5px;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
    }

    /* Input bar - Kept strictly in 1 single clean line */
    .bonding-chat-input-bar {
      padding: 10px 18px;
      border-top: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      flex-direction: row !important;
      align-items: center !important;
      gap: 10px;
      background: var(--bg-card, #ffffff);
      flex-wrap: nowrap !important;
      white-space: nowrap !important;
      box-sizing: border-box !important;
    }

    [data-theme="dark"] .bonding-chat-input-bar {
      background: var(--bg-surface, #111827);
      border-color: #1f2937;
    }

    .bonding-input-action-btn {
      font-size: 18px;
      padding: 6px;
      background: transparent;
      border: none;
      cursor: pointer;
      border-radius: 8px;
      transition: background 0.15s ease;
      flex-shrink: 0 !important;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-input-action-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-input-action-btn:hover {
      background: #1e293b;
    }

    .bonding-input-field {
      flex: 1 1 auto !important;
      height: 42px !important;
      min-height: 42px !important;
      max-height: 42px !important;
      line-height: normal !important;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      padding: 0 14px !important;
      border-radius: 10px;
      font-size: 13.5px;
      color: inherit;
      outline: none;
      font-family: inherit;
      box-sizing: border-box !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }

    [data-theme="dark"] .bonding-input-field {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-send-btn {
      flex-shrink: 0 !important;
      height: 42px !important;
      padding: 0 18px !important;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-sizing: border-box !important;
      white-space: nowrap !important;
    }

    /* =========================================================================
       LOUNGE & GAMES ARENA VIEW STYLES
       ========================================================================= */
    .lounge-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .lounge-stats-ribbon {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
    }

    .lounge-stat-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .lounge-stat-card {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .lounge-stat-card .stat-num {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .lounge-stat-card .stat-num {
      color: #f9fafb;
    }

    .lounge-stat-card .stat-lbl {
      font-size: 12px;
      color: var(--text-3, #64748b);
      margin-top: 3px;
    }

    .lounge-stat-card.highlight .stat-num {
      color: #10b981;
    }

    .lounge-section {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      padding: 20px 22px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .lounge-section {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .lounge-section-head h3 {
      font-size: 17px;
      font-weight: 800;
      margin: 0 0 4px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .lounge-section-head h3 {
      color: #f9fafb;
    }

    .lounge-section-head p {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0 0 16px 0;
    }

    .lounge-games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .lounge-game-card {
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 14px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.2s ease;
    }

    [data-theme="dark"] .lounge-game-card {
      background: #182234;
      border-color: #2b3952;
    }

    .lounge-game-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.06);
      border-color: #0070F3;
    }

    .game-card-icon {
      font-size: 34px;
      width: 54px;
      height: 54px;
      border-radius: 14px;
      background: rgba(0, 112, 243, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .game-card-title {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 4px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .game-card-title {
      color: #f9fafb;
    }

    .game-card-desc {
      font-size: 12.5px;
      color: var(--text-3, #64748b);
      margin: 0 0 10px 0;
      line-height: 1.4;
    }

    .game-card-meta {
      display: flex;
      gap: 6px;
    }

    .meta-pill {
      font-size: 11.5px;
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #cbd5e1);
      padding: 3px 8px;
      border-radius: 8px;
      color: var(--text-2, #475569);
    }

    [data-theme="dark"] .meta-pill {
      background: #25334c;
      border-color: #3b4d6e;
      color: #cbd5e1;
    }

    .lounge-card-challenge-btn {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: auto;
      transition: opacity 0.15s ease;
    }

    .lounge-card-challenge-btn:hover {
      opacity: 0.93;
    }

    .lounge-two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 900px) {
      .lounge-two-col {
        grid-template-columns: 1fr;
      }
    }

    .lounge-card-box {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      padding: 20px;
    }

    [data-theme="dark"] .lounge-card-box {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .lounge-box-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 14px;
    }

    .sub-box-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-3, #94a3b8);
      margin: 0 0 8px 0;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }

    .box-empty-text {
      font-size: 12.5px;
      color: var(--text-3, #94a3b8);
      font-style: italic;
      padding: 8px 0;
    }

    .lounge-invites-list, .lounge-active-matches-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .lounge-invite-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 10px;
      gap: 10px;
    }

    [data-theme="dark"] .lounge-invite-item {
      background: #182234;
      border-color: #2b3952;
    }

    .invite-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .invite-avatar {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .invite-info {
      display: flex;
      flex-direction: column;
    }

    .invite-title {
      font-size: 13px;
      font-weight: 700;
    }

    .invite-sender {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
    }

    .btn-invite-accept {
      padding: 6px 12px;
      background: #10b981;
      color: #ffffff;
      border: none;
      border-radius: 7px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }

    .btn-invite-decline {
      padding: 6px 10px;
      background: transparent;
      border: 1px solid #cbd5e1;
      color: var(--text-2, #475569);
      border-radius: 7px;
      font-size: 11.5px;
      cursor: pointer;
    }

    .btn-invite-cancel {
      padding: 5px 9px;
      background: transparent;
      border: 1px solid #ef4444;
      color: #ef4444;
      border-radius: 6px;
      font-size: 11.5px;
      cursor: pointer;
    }

    .lounge-active-match-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      gap: 10px;
      flex-wrap: wrap;
    }

    [data-theme="dark"] .lounge-active-match-card {
      background: #182234;
      border-color: #2b3952;
    }

    .lounge-active-match-card.turn-active {
      border-color: #10b981;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
    }

    .active-match-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .match-game-icon {
      font-size: 26px;
    }

    .match-game-title {
      font-size: 14px;
      font-weight: 700;
    }

    .match-opp-text {
      font-size: 12px;
      color: var(--text-3, #64748b);
    }

    .active-match-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .match-turn-tag {
      font-size: 11.5px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .match-turn-tag.my-turn {
      background: rgba(16, 185, 129, 0.15);
      color: #059669;
    }

    .match-turn-tag.wait {
      background: rgba(148, 163, 184, 0.15);
      color: #64748b;
    }

    .btn-resume-match {
      padding: 7px 14px;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }

    .lounge-recent-matches-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }

    .recent-match-card {
      padding: 12px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #e2e8f0);
      background: var(--bg-muted, #f8fafc);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    [data-theme="dark"] .recent-match-card {
      background: #182234;
      border-color: #2b3952;
    }

    .recent-card-head {
      display: flex;
      justify-content: space-between;
      font-size: 12.5px;
      font-weight: 700;
    }

    .recent-date {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
    }

    .recent-outcome.win { color: #10b981; font-weight: 700; }
    .recent-outcome.loss { color: #ef4444; font-weight: 700; }
    .recent-outcome.draw { color: #f59e0b; font-weight: 700; }

    .btn-recent-rematch {
      padding: 6px 10px;
      border: 1px solid #0070F3;
      background: transparent;
      color: #0070F3;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 4px;
    }

    .btn-delete-match {
      padding: 6px 10px;
      background: transparent;
      border: 1px solid var(--border-sm, #e2e8f0);
      color: var(--text-3, #94a3b8);
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    .btn-delete-match:hover {
      color: #ef4444;
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
    }

    .btn-delete-match.mini {
      padding: 3px 6px;
      border: none;
    }

    .btn-delete-match.text-btn {
      border: 1px solid rgba(239, 68, 68, 0.35);
      color: #ef4444;
      background: rgba(239, 68, 68, 0.04);
      margin-top: 4px;
    }

    .btn-delete-match.text-btn:hover {
      background: rgba(239, 68, 68, 0.12);
    }

    .btn-clear-matches {
      padding: 6px 12px;
      background: transparent;
      border: 1px solid var(--border-sm, #e2e8f0);
      color: var(--text-2, #64748b);
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .btn-clear-matches {
      border-color: #334155;
      color: #94a3b8;
    }

    .btn-clear-matches:hover {
      color: #ef4444;
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
    }

    /* Leaderboard Table */
    .lounge-lb-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    .lounge-lb-table th {
      text-align: left;
      padding: 10px 12px;
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: var(--text-3, #94a3b8);
      border-bottom: 2px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .lounge-lb-table th {
      border-color: #334155;
    }

    .lounge-lb-table td {
      padding: 12px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .lounge-lb-table td {
      border-color: #1e293b;
    }

    .lb-player-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .lb-avatar {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
      color: #4338ca;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* =========================================================================
       CHALLENGE FLOW MODAL STYLES (MANDATORY EMPLOYEE SELECTION)
       ========================================================================= */
    .challenge-flow-modal {
      width: 520px;
      max-width: 95vw;
    }

    .flow-step-box {
      margin-bottom: 16px;
    }

    .flow-step-lbl {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      color: var(--text-3, #94a3b8);
      margin-bottom: 8px;
    }

    .game-select-pills {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .game-pill-btn {
      padding: 10px 8px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      color: var(--text-1, #0f172a);
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .game-pill-btn {
      background: #1e293b;
      border-color: #334155;
      color: #f1f5f9;
    }

    .game-pill-btn.active {
      border-color: #0070F3;
      background: rgba(0, 112, 243, 0.12);
      color: #0070F3;
    }

    .emp-search-wrap {
      margin-bottom: 8px;
    }

    .eligible-emp-list {
      max-height: 180px;
      overflow-y: auto;
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 10px;
      padding: 4px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    [data-theme="dark"] .eligible-emp-list {
      border-color: #334155;
    }

    .eligible-emp-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .eligible-emp-item:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .eligible-emp-item:hover {
      background: #25334c;
    }

    .eligible-emp-item.selected {
      background: rgba(0, 112, 243, 0.12);
      border-left: 3px solid #0070F3;
    }

    .emp-item-avatar {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      background: #e2e8f0;
      color: #334155;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .emp-item-info {
      flex: 1;
      margin-left: 8px;
    }

    .emp-item-name {
      font-size: 13px;
      font-weight: 700;
      display: block;
    }

    .emp-item-role {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
    }

    .btn-select-opponent {
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      background: transparent;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-select-opponent.active {
      background: #0070F3;
      color: #ffffff;
      border-color: #0070F3;
    }

    .timer-opts-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .timer-radio-lbl {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 8px;
      background: var(--bg-muted, #f8fafc);
    }

    [data-theme="dark"] .timer-radio-lbl {
      background: #1e293b;
    }

    .flow-confirmation-card {
      background: rgba(0, 112, 243, 0.08);
      border: 1px solid rgba(0, 112, 243, 0.2);
      border-radius: 10px;
      padding: 12px;
      font-size: 12.5px;
    }

    .confirm-head {
      font-weight: 700;
      margin-bottom: 6px;
      color: #0070F3;
    }

    .confirm-body {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* =========================================================================
       LIVE GAME ARENA MODAL & SPLIT LAYOUT (DARK THEME WITH LEFT SIDEBAR)
       ========================================================================= */
    .game-arena-modal.arena-split-layout {
      width: 740px !important;
      max-width: 95vw !important;
      min-height: 480px !important;
      max-height: 90vh !important;
      padding: 0 !important;
      background: #13151b !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      border-radius: 22px !important;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8) !important;
      display: flex !important;
      flex-direction: row !important;
      overflow: hidden !important;
      position: relative !important;
    }

    [data-theme="dark"] .game-arena-modal.arena-split-layout {
      background: #111319 !important;
      border-color: rgba(255, 255, 255, 0.08) !important;
    }

    /* Left Sidebar Panel */
    .arena-sidebar-panel {
      width: 250px !important;
      flex-shrink: 0 !important;
      background: #161922 !important;
      border-right: 1px solid rgba(255, 255, 255, 0.06) !important;
      padding: 24px 18px !important;
      display: flex !important;
      flex-direction: column !important;
      box-sizing: border-box !important;
      position: relative !important;
    }

    .arena-sidebar-players {
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
    }

    .game-sidebar-player-row {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      position: relative !important;
    }

    .turn-indicator-slot {
      width: 70px !important;
      display: flex !important;
      justify-content: flex-end !important;
      align-items: center !important;
      flex-shrink: 0 !important;
    }

    .turn-pointer-pill {
      position: relative !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 4px !important;
      background: #0070F3 !important;
      color: #ffffff !important;
      font-size: 11px !important;
      font-weight: 800 !important;
      padding: 4px 8px !important;
      border-radius: 6px !important;
      letter-spacing: 0.2px !important;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.4) !important;
    }

    .turn-pointer-pill::after {
      content: '' !important;
      position: absolute !important;
      right: -5px !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      width: 0 !important;
      height: 0 !important;
      border-top: 5px solid transparent !important;
      border-bottom: 5px solid transparent !important;
      border-left: 5px solid #0070F3 !important;
    }

    .turn-pointer-pill .pill-sym {
      font-size: 11px !important;
      line-height: 1 !important;
    }

    .turn-pointer-pill .pill-txt {
      font-size: 11px !important;
      line-height: 1 !important;
      text-transform: capitalize !important;
    }

    .game-player-avatar-circle {
      width: 42px !important;
      height: 42px !important;
      border-radius: 50% !important;
      background: #202531 !important;
      border: 2px solid rgba(255, 255, 255, 0.12) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 20px !important;
      flex-shrink: 0 !important;
      transition: all 0.2s ease !important;
    }

    .game-sidebar-player-row.active-turn .game-player-avatar-circle {
      border-color: #0070F3 !important;
      box-shadow: 0 0 14px rgba(0, 112, 243, 0.45) !important;
    }

    .game-player-meta {
      display: flex !important;
      flex-direction: column !important;
      min-width: 0 !important;
    }

    .game-player-name {
      font-size: 13.5px !important;
      font-weight: 700 !important;
      color: #f1f5f9 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    .game-player-role {
      font-size: 11.5px !important;
      color: #94a3b8 !important;
      font-weight: 500 !important;
    }

    /* Sidebar Footer */
    .arena-sidebar-footer {
      margin-top: auto !important;
      padding-top: 24px !important;
    }

    .game-code-display {
      font-size: 12.5px !important;
      color: #94a3b8 !important;
      margin-bottom: 12px !important;
      font-weight: 500 !important;
    }

    .game-code-display strong {
      color: #f1f5f9 !important;
      letter-spacing: 0.5px !important;
    }

    .arena-sidebar-divider {
      height: 1px !important;
      background: rgba(255, 255, 255, 0.08) !important;
      margin-bottom: 12px !important;
    }

    .arena-sidebar-actions {
      display: flex !important;
      flex-direction: column !important;
      gap: 4px !important;
    }

    .sidebar-action-item {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      padding: 8px 10px !important;
      border-radius: 8px !important;
      background: transparent !important;
      border: none !important;
      color: #cbd5e1 !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      cursor: pointer !important;
      text-align: left !important;
      transition: all 0.15s ease !important;
      width: 100% !important;
    }

    .sidebar-action-item:hover {
      background: rgba(255, 255, 255, 0.06) !important;
      color: #ffffff !important;
    }

    .sidebar-action-item.danger:hover {
      background: rgba(239, 68, 68, 0.15) !important;
      color: #ef4444 !important;
    }

    .sidebar-action-item .action-icon {
      font-size: 15px !important;
      opacity: 0.85 !important;
    }

    /* Right Main Content Area */
    .arena-main-content {
      flex: 1 !important;
      background: #13151b !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 24px !important;
      box-sizing: border-box !important;
      position: relative !important;
      overflow-y: auto !important;
    }

    /* Modern Tic-Tac-Toe Court & Tiles matching screenshot */
    .ttt-modern-court {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      user-select: none !important;
    }

    .ttt-modern-grid {
      display: grid !important;
      grid-template-columns: repeat(3, 104px) !important;
      grid-template-rows: repeat(3, 104px) !important;
      gap: 14px !important;
      padding: 12px !important;
      box-sizing: border-box !important;
    }

    .ttt-modern-tile {
      width: 104px !important;
      height: 104px !important;
      border-radius: 18px !important;
      background: #1c202a !important;
      border: 1px solid rgba(255, 255, 255, 0.04) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
      transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1) !important;
      cursor: default !important;
    }

    .ttt-modern-tile.empty {
      cursor: pointer !important;
    }

    .ttt-modern-tile.empty:hover {
      background: #242938 !important;
      border-color: #2563EB !important;
      transform: scale(1.03) !important;
      box-shadow: 0 0 20px rgba(37, 99, 235, 0.35) !important;
    }

    .ttt-modern-tile.win-cell {
      background: rgba(37, 99, 235, 0.2) !important;
      border-color: #38BDF8 !important;
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.6) !important;
      animation: tttWinGlow 1s infinite alternate !important;
    }

    .ttt-svg-symbol {
      display: block !important;
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4)) !important;
    }

    @media (max-width: 680px) {
      .game-arena-modal.arena-split-layout {
        flex-direction: column !important;
        height: auto !important;
        max-height: 92vh !important;
      }
      .arena-sidebar-panel {
        width: 100% !important;
        border-right: none !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
        padding: 16px !important;
      }
      .ttt-modern-grid {
        grid-template-columns: repeat(3, 84px) !important;
        grid-template-rows: repeat(3, 84px) !important;
        gap: 8px !important;
      }
      .ttt-modern-tile {
        width: 84px !important;
        height: 84px !important;
      }
    }

    /* Dedicated Top-Right Close Button */
    .arena-close-btn {
      position: absolute;
      top: 18px;
      right: 18px;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(255,255,255,0.08);
      border: none;
      color: #94a3b8;
      font-size: 22px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
      z-index: 10;
    }

    .arena-close-btn:hover {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      transform: scale(1.08);
    }

    /* Arena Header */
    .arena-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 14px;
      padding-right: 36px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .arena-header {
      border-color: #1e293b;
    }

    .arena-title-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .arena-icon {
      font-size: 32px;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(0, 112, 243, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .arena-title {
      font-size: 18px;
      font-weight: 800;
      margin: 0 0 4px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .arena-title {
      color: #f8fafc;
    }

    .arena-players-vs {
      font-size: 12.5px;
      color: var(--text-3, #64748b);
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .player-tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .player-tag strong {
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .player-tag strong {
      color: #f1f5f9;
    }

    .vs-pill {
      font-weight: 800;
      font-size: 10px;
      padding: 1px 5px;
      border-radius: 4px;
      background: rgba(0, 112, 243, 0.12);
      color: #0070F3;
    }

    /* Turn Banner */
    .arena-turn-banner {
      padding: 7px 14px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.3px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .arena-turn-banner.my-turn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.5);
      animation: pulseGlow 1.8s infinite;
    }

    .arena-turn-banner.opp-turn {
      background: var(--bg-muted, #f1f5f9);
      color: var(--text-2, #64748b);
      border: 1px solid var(--border-sm, #cbd5e1);
    }

    [data-theme="dark"] .arena-turn-banner.opp-turn {
      background: #1e293b;
      color: #94a3b8;
      border-color: #334155;
    }

    .arena-turn-banner.ended {
      background: rgba(0, 112, 243, 0.12);
      color: #0070F3;
      border: 1px solid #38BDF8;
    }

    /* Sub Toolbar */
    .arena-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid var(--border-sm, #f1f5f9);
    }

    [data-theme="dark"] .arena-toolbar {
      border-color: #1e293b;
    }

    .arena-tip-text {
      font-size: 12px;
      color: var(--text-3, #64748b);
      font-weight: 500;
    }

    .arena-action-btns {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-arena-action {
      padding: 5px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-card, #ffffff);
      color: var(--text-2, #475569);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    .btn-arena-action:hover {
      background: var(--bg-muted, #f8fafc);
      border-color: #94a3b8;
    }

    [data-theme="dark"] .btn-arena-action {
      background: #1e293b;
      border-color: #334155;
      color: #cbd5e1;
    }

    [data-theme="dark"] .btn-arena-action:hover {
      background: #25334c;
      border-color: #475569;
    }

    .btn-arena-action.danger {
      color: #ef4444;
      border-color: rgba(239, 68, 68, 0.4);
    }

    .btn-arena-action.danger:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: #ef4444;
    }

    /* Draw Offer Notification */
    .arena-draw-offer-banner {
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid #f59e0b;
      padding: 10px 14px;
      border-radius: 10px;
      margin: 12px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 13px;
    }

    .btn-accept-draw {
      background: #10b981;
      color: #fff;
      border: none;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 700;
    }

    .btn-decline-draw {
      background: transparent;
      border: 1px solid #cbd5e1;
      padding: 5px 10px;
      border-radius: 6px;
      cursor: pointer;
    }

    /* Main Playing Board Arena Wrapper */
    .arena-board-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0;
      width: 100%;
      min-height: 380px;
      box-sizing: border-box;
    }

    /* =========================================================================
       TIC-TAC-TOE BOARD (AUTHENTIC SQUARE 3x3 COURT)
       ========================================================================= */
    .ttt-court {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6px;
      user-select: none;
    }

    .ttt-board-grid {
      display: grid !important;
      grid-template-columns: repeat(3, 98px) !important;
      grid-template-rows: repeat(3, 98px) !important;
      gap: 10px !important;
      width: 324px !important;
      height: 324px !important;
      min-width: 324px !important;
      min-height: 324px !important;
      max-width: 324px !important;
      max-height: 324px !important;
      place-items: center !important;
      align-content: center !important;
      justify-content: center !important;
      background: var(--bg-muted, #f1f5f9);
      padding: 10px;
      border-radius: 24px;
      border: 1px solid var(--border-sm, #cbd5e1);
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.04);
      box-sizing: border-box !important;
    }

    [data-theme="dark"] .ttt-board-grid {
      background: #090e1a;
      border-color: #1e293b;
      box-shadow: inset 0 2px 14px rgba(0,0,0,0.6);
    }

    .ttt-cell {
      width: 94px !important;
      height: 94px !important;
      min-width: 94px !important;
      min-height: 94px !important;
      max-width: 94px !important;
      max-height: 94px !important;
      aspect-ratio: 1 / 1 !important;
      box-sizing: border-box !important;
      flex-shrink: 0 !important;
      border-radius: 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 52px;
      font-weight: 900;
      line-height: 1;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      background: var(--bg-card, #ffffff);
      border: 2px solid var(--border-sm, #e2e8f0);
      box-shadow: 0 4px 10px rgba(0,0,0,0.04);
    }

    [data-theme="dark"] .ttt-cell {
      background: #151d2e;
      border-color: #243247;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    .ttt-cell.empty:hover {
      background: #e0e7ff;
      border-color: #0070F3;
      transform: scale(1.04);
      box-shadow: 0 6px 18px rgba(0, 112, 243, 0.25);
    }

    [data-theme="dark"] .ttt-cell.empty:hover {
      background: #1e2a42;
      border-color: #38BDF8;
      box-shadow: 0 0 16px rgba(129, 140, 248, 0.35);
    }

    .ttt-cell.win-cell {
      background: #d1fae5 !important;
      border-color: #10b981 !important;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.5) !important;
      animation: tttWinGlow 1s infinite alternate;
    }

    [data-theme="dark"] .ttt-cell.win-cell {
      background: rgba(16, 185, 129, 0.25) !important;
      border-color: #34d399 !important;
      box-shadow: 0 0 25px rgba(52, 211, 153, 0.6) !important;
    }

    @keyframes tttWinGlow {
      from { transform: scale(1); }
      to { transform: scale(1.05); }
    }

    .ttt-x {
      color: #0284C7;
      filter: drop-shadow(0 2px 4px rgba(0, 112, 243, 0.3));
    }

    [data-theme="dark"] .ttt-x {
      color: #38BDF8;
      text-shadow: 0 0 16px rgba(129, 140, 248, 0.85);
    }

    .ttt-o {
      color: #ea580c;
      filter: drop-shadow(0 2px 4px rgba(234, 88, 12, 0.3));
    }

    [data-theme="dark"] .ttt-o {
      color: #fbbf24;
      text-shadow: 0 0 16px rgba(251, 191, 36, 0.85);
    }

    /* =========================================================================
       CONNECT FOUR BOARD (AUTHENTIC TABLETOP DISK RACK)
       ========================================================================= */
    .c4-board-rack {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: fit-content;
      margin: 0 auto;
      user-select: none;
    }

    /* Top Drop Arrow Column Buttons */
    .c4-drop-arrows-row {
      display: grid !important;
      grid-template-columns: repeat(7, 48px) !important;
      gap: 8px !important;
      width: fit-content !important;
      margin-bottom: 8px !important;
      justify-content: center !important;
      align-items: center !important;
    }

    .c4-drop-col-btn {
      width: 48px !important;
      height: 36px !important;
      min-width: 48px !important;
      min-height: 36px !important;
      border-radius: 10px;
      border: 1px solid #c7d2fe;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 18px;
      font-weight: 800;
      cursor: pointer;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 5px rgba(0,0,0,0.06);
    }

    .c4-drop-col-btn:hover {
      background: #0284C7;
      color: #ffffff;
      transform: translateY(3px);
      box-shadow: 0 4px 12px rgba(0, 112, 243, 0.4);
    }

    [data-theme="dark"] .c4-drop-col-btn {
      background: #1e293b;
      border-color: #3b82f6;
      color: #60a5fa;
    }

    [data-theme="dark"] .c4-drop-col-btn:hover {
      background: #2563eb;
      color: #ffffff;
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
    }

    /* The Main Blue Game Rack */
    .c4-grid-slots {
      display: grid !important;
      grid-template-columns: repeat(7, 48px) !important;
      grid-template-rows: repeat(6, 48px) !important;
      gap: 8px !important;
      width: fit-content !important;
      height: fit-content !important;
      min-width: 400px !important;
      min-height: 344px !important;
      max-width: 400px !important;
      max-height: 344px !important;
      place-items: center !important;
      align-content: center !important;
      justify-content: center !important;
      padding: 14px !important;
      border-radius: 22px !important;
      box-sizing: border-box !important;
      background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 60%, #1e40af 100%) !important;
      border: 3px solid #1e40af !important;
      box-shadow: 0 16px 36px rgba(37, 99, 235, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3) !important;
      position: relative;
      z-index: 2;
    }

    [data-theme="dark"] .c4-grid-slots {
      background: linear-gradient(180deg, #1d4ed8 0%, #1e3a8a 60%, #172554 100%) !important;
      border: 3px solid #3b82f6 !important;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(37, 99, 235, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2) !important;
    }

    /* Tabletop Stand Feet */
    .c4-rack-stand {
      display: flex;
      justify-content: space-between;
      width: 410px;
      height: 14px;
      margin-top: -2px;
      position: relative;
      z-index: 1;
    }

    .c4-stand-leg {
      width: 46px;
      height: 14px;
      background: #1e3a8a;
      border-radius: 0 0 8px 8px;
    }

    [data-theme="dark"] .c4-stand-leg {
      background: #0f172a;
      border: 1px solid #1e3a8a;
    }

    /* Slot Circular Container */
    .c4-slot {
      width: 48px !important;
      height: 48px !important;
      min-width: 48px !important;
      min-height: 48px !important;
      max-width: 48px !important;
      max-height: 48px !important;
      aspect-ratio: 1 / 1 !important;
      box-sizing: border-box !important;
      flex-shrink: 0 !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer;
      position: relative;
      background: #090e1a !important;
      box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.8) !important;
      transition: transform 0.15s ease;
    }

    .c4-slot:hover {
      transform: scale(1.04);
    }

    /* Empty Hole Inset */
    .c4-hole {
      width: 42px !important;
      height: 42px !important;
      min-width: 42px !important;
      min-height: 42px !important;
      max-width: 42px !important;
      max-height: 42px !important;
      aspect-ratio: 1 / 1 !important;
      border-radius: 50% !important;
      flex-shrink: 0 !important;
      background: #0b1329 !important;
      box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.9) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }

    /* Checkers Discs */
    .c4-disc {
      width: 44px !important;
      height: 44px !important;
      min-width: 44px !important;
      min-height: 44px !important;
      max-width: 44px !important;
      max-height: 44px !important;
      aspect-ratio: 1 / 1 !important;
      border-radius: 50% !important;
      flex-shrink: 0 !important;
      box-sizing: border-box !important;
      animation: dropDiscAnim 0.3s cubic-bezier(0.25, 1, 0.5, 1);
      position: relative;
    }

    @keyframes dropDiscAnim {
      0% { transform: translateY(-160px); opacity: 0; }
      80% { transform: translateY(6px); opacity: 1; }
      100% { transform: translateY(0); opacity: 1; }
    }

    /* Red Disc */
    .c4-disc.red {
      background: radial-gradient(circle at 35% 35%, #f87171 0%, #ef4444 35%, #dc2626 70%, #991b1b 100%) !important;
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -3px 5px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.4) !important;
      border: 3px double rgba(255,255,255,0.3) !important;
    }

    /* Yellow Disc */
    .c4-disc.yellow {
      background: radial-gradient(circle at 35% 35%, #fef08a 0%, #facc15 35%, #eab308 70%, #a16207 100%) !important;
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -3px 5px rgba(0,0,0,0.5), 0 3px 6px rgba(0,0,0,0.3) !important;
      border: 3px double rgba(0,0,0,0.2) !important;
    }

    /* Winning Disc Aura */
    .c4-slot.win-disc .c4-disc {
      box-shadow: 0 0 16px #ffffff, 0 0 28px #fbbf24 !important;
      animation: c4WinDiscPulse 0.9s infinite alternate !important;
    }

    @keyframes c4WinDiscPulse {
      from { transform: scale(1); filter: brightness(1); }
      to { transform: scale(1.1); filter: brightness(1.2); }
    }

    /* =========================================================================
       CHESS DUEL BOARD (AUTHENTIC TOURNAMENT 8x8)
       ========================================================================= */
    .chess-arena-layout {
      display: flex;
      gap: 18px;
      align-items: flex-start;
      flex-wrap: wrap;
      justify-content: center;
    }

    .chess-board-grid {
      display: grid !important;
      grid-template-columns: repeat(8, 48px) !important;
      grid-template-rows: repeat(8, 48px) !important;
      width: 384px !important;
      height: 384px !important;
      min-width: 384px !important;
      min-height: 384px !important;
      border: 4px solid #334155;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 12px 30px rgba(0,0,0,0.25);
      box-sizing: border-box !important;
    }

    @media (max-width: 520px) {
      .chess-board-grid {
        grid-template-columns: repeat(8, 40px) !important;
        grid-template-rows: repeat(8, 40px) !important;
        width: 320px !important;
        height: 320px !important;
        min-width: 320px !important;
        min-height: 320px !important;
      }
    }

    .chess-sq {
      width: 100% !important;
      height: 100% !important;
      aspect-ratio: 1 / 1 !important;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      position: relative;
      box-sizing: border-box !important;
    }

    .chess-sq.light {
      background: #f0d9b5;
    }

    .chess-sq.dark {
      background: #b58863;
    }

    [data-theme="dark"] .chess-sq.light {
      background: #cbd5e1;
    }

    [data-theme="dark"] .chess-sq.dark {
      background: #475569;
    }

    .chess-sq.selected {
      background: #38bdf8 !important;
      box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
    }

    .chess-sq.legal-dot::after {
      content: '';
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.75);
      box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
      position: absolute;
    }

    .chess-piece {
      font-size: 34px;
      line-height: 1;
      user-select: none;
      transition: transform 0.1s ease;
    }

    .chess-piece:hover {
      transform: scale(1.12);
    }

    .chess-piece.white-piece {
      color: #ffffff;
      filter: drop-shadow(0 2px 3px rgba(0,0,0,0.8));
    }

    .chess-piece.black-piece {
      color: #0f172a;
      filter: drop-shadow(0 1px 2px rgba(255,255,255,0.4));
    }

    .chess-sidebar-notation {
      width: 160px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 10px;
      padding: 10px;
      height: 384px;
      display: flex;
      flex-direction: column;
    }

    [data-theme="dark"] .chess-sidebar-notation {
      background: #182234;
      border-color: #2b3952;
    }

    .notation-head {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--text-3, #94a3b8);
      margin-bottom: 6px;
      text-transform: uppercase;
    }

    .notation-feed {
      flex: 1;
      overflow-y: auto;
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      align-content: flex-start;
    }


    /* =========================================================================
       LUDO MULTIPLAYER DUEL BOARD (15x15 AUTHENTIC CROSS)
       ========================================================================= */
    .ludo-arena-layout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      width: 100%;
    }

    .ludo-board-grid {
      display: grid !important;
      grid-template-columns: repeat(15, 26px) !important;
      grid-template-rows: repeat(15, 26px) !important;
      width: 390px !important;
      height: 390px !important;
      border: 3px solid #334155;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 12px 32px rgba(0,0,0,0.28);
      background: #ffffff;
      user-select: none;
      box-sizing: border-box !important;
      position: relative;
    }

    @media (max-width: 480px) {
      .ludo-board-grid {
        grid-template-columns: repeat(15, 21px) !important;
        grid-template-rows: repeat(15, 21px) !important;
        width: 315px !important;
        height: 315px !important;
      }
    }

    /* Yards */
    .ludo-yard {
      padding: 8px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ludo-yard.red-yard {
      grid-column: 1 / 7;
      grid-row: 1 / 7;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    .ludo-yard.green-yard {
      grid-column: 10 / 16;
      grid-row: 1 / 7;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .ludo-yard.blue-yard {
      grid-column: 1 / 7;
      grid-row: 10 / 16;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }

    .ludo-yard.yellow-yard {
      grid-column: 10 / 16;
      grid-row: 10 / 16;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }

    .ludo-yard.yard-active-turn {
      outline: 3px solid #38bdf8;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.6);
      transform: scale(1.02);
      z-index: 2;
    }

    .yard-player-lbl {
      display: block;
      font-size: 8.5px;
      color: #64748b;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90px;
    }

    .yard-box {
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.15);
      padding: 6px;
      box-sizing: border-box;
    }

    .yard-box.decorative {
      opacity: 0.65;
    }

    .yard-title {
      font-size: 10.5px;
      font-weight: 800;
      color: #334155;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .yard-slots {
      display: grid !important;
      grid-template-columns: repeat(2, 28px);
      grid-template-rows: repeat(2, 28px);
      gap: 6px;
      align-items: center;
      justify-content: center;
    }

    .yard-token-slot {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f1f5f9;
      border: 1.5px dashed #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .slot-empty {
      font-size: 10px;
      color: #94a3b8;
      font-weight: 700;
    }

    /* Center Home Victory Area */
    .ludo-center-home {
      grid-column: 7 / 10;
      grid-row: 7 / 10;
      position: relative;
      background: #1e293b;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .home-triangle {
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }

    .home-triangle.red-tri {
      top: 0; left: 0; bottom: 0;
      border-width: 39px 0 39px 39px;
      border-color: transparent transparent transparent #ef4444;
    }

    .home-triangle.green-tri {
      top: 0; left: 0; right: 0;
      border-width: 39px 39px 0 39px;
      border-color: #10b981 transparent transparent transparent;
    }

    .home-triangle.yellow-tri {
      top: 0; right: 0; bottom: 0;
      border-width: 39px 39px 39px 0;
      border-color: transparent #f59e0b transparent transparent;
    }

    .home-triangle.blue-tri {
      bottom: 0; left: 0; right: 0;
      border-width: 0 39px 39px 39px;
      border-color: transparent transparent #3b82f6 transparent;
    }

    .home-center-core {
      position: relative;
      z-index: 5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .home-crown {
      font-size: 18px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    }

    .home-finished-tokens {
      display: flex;
      gap: 3px;
      margin-top: 2px;
    }

    .tok-finished {
      font-size: 9px;
      font-weight: 800;
      padding: 1px 3px;
      border-radius: 4px;
      background: rgba(0,0,0,0.6);
      color: #fff;
    }

    /* Pathway Cells */
    .ludo-cell {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0.5px solid #cbd5e1;
      background: #ffffff;
      box-sizing: border-box;
      font-size: 11px;
    }

    [data-theme="dark"] .ludo-cell {
      background: #1e293b;
      border-color: #334155;
    }

    .cell-red-start {
      background: #fee2e2 !important;
      border: 1.5px solid #ef4444 !important;
    }

    .cell-green-start {
      background: #d1fae5 !important;
      border: 1.5px solid #10b981 !important;
    }

    .cell-red-stretch {
      background: #ef4444 !important;
      color: #ffffff !important;
    }

    .cell-green-stretch {
      background: #10b981 !important;
      color: #ffffff !important;
    }

    .cell-safe-star {
      background: #fef3c7 !important;
    }

    .cell-star-glyph {
      font-size: 11px;
      line-height: 1;
      position: absolute;
      opacity: 0.85;
      pointer-events: none;
    }

    .cell-arrow-glyph {
      font-size: 10px;
      font-weight: 800;
      color: inherit;
      position: absolute;
      opacity: 0.7;
      pointer-events: none;
    }

    /* Tokens */
    .ludo-token {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 10px;
      color: #ffffff;
      cursor: default;
      transition: all 0.15s ease;
      z-index: 10;
      user-select: none;
    }

    .ludo-token.token-red {
      background: radial-gradient(circle at 35% 35%, #f87171, #b91c1c);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(185, 28, 28, 0.7);
    }

    .ludo-token.token-green {
      background: radial-gradient(circle at 35% 35%, #34d399, #047857);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(4, 120, 87, 0.7);
    }

    .ludo-token.token-yellow {
      background: radial-gradient(circle at 35% 35%, #fde047, #d97706);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(217, 119, 6, 0.7);
    }

    .ludo-token.token-blue {
      background: radial-gradient(circle at 35% 35%, #60a5fa, #1d4ed8);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(29, 78, 216, 0.7);
    }

    .cell-yellow-start {
      background: #fef3c7 !important;
      border: 1.5px solid #f59e0b !important;
    }

    .cell-blue-start {
      background: #dbeafe !important;
      border: 1.5px solid #3b82f6 !important;
    }

    .cell-yellow-stretch {
      background: #f59e0b !important;
      color: #ffffff !important;
    }

    .cell-blue-stretch {
      background: #3b82f6 !important;
      color: #ffffff !important;
    }

    .tok-finished.yellow { background: #d97706; }
    .tok-finished.blue { background: #2563eb; }

    .progress-pill.yellow { border-left: 4px solid #f59e0b; }
    .progress-pill.blue { border-left: 4px solid #3b82f6; }

    .ludo-players-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }

    .player-tag.turn-active {
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.7);
      border-color: #38bdf8 !important;
    }

    .ludo-mode-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .ludo-mode-btn {
      flex: 1;
      min-width: 90px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-sm, #334155);
      background: var(--bg-card, #1e293b);
      color: var(--text-1, #e2e8f0);
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
    }

    .ludo-mode-btn.active {
      background: #3b82f6;
      border-color: #60a5fa;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
    }

    .ludo-token.movable {
      cursor: pointer !important;
      animation: ludoTokPulse 0.9s infinite alternate !important;
      transform: scale(1.18);
      box-shadow: 0 0 10px #38bdf8, 0 0 18px #0284c7 !important;
    }

    .ludo-token.movable:hover {
      transform: scale(1.3) !important;
    }

    @keyframes ludoTokPulse {
      from { transform: scale(1.1); filter: brightness(1); }
      to { transform: scale(1.22); filter: brightness(1.25); }
    }

    /* ── Ludo Interactive 3D Dice Console ── */
    .ludo-interactive-console {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      max-width: 440px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 14px;
      padding: 12px 16px;
      box-sizing: border-box;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }

    [data-theme="dark"] .ludo-interactive-console {
      background: #151f32;
      border-color: #2b3952;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }

    .ludo-dice-interactive-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .ludo-3d-dice {
      position: relative;
      width: 64px;
      height: 64px;
      background: linear-gradient(145deg, #ffffff 0%, #f8fafc 55%, #e2e8f0 100%) !important;
      border-radius: 14px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 6px 0 #cbd5e1, 0 10px 20px rgba(0, 0, 0, 0.25), inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 4px rgba(0, 0, 0, 0.08) !important;
      border: 3px solid #cbd5e1 !important;
      cursor: default;
      transition: transform 0.12s ease, opacity 0.12s ease;
      user-select: none;
      box-sizing: border-box !important;
      touch-action: manipulation;
    }

    [data-theme="dark"] .ludo-3d-dice {
      background: linear-gradient(145deg, #ffffff 0%, #f1f5f9 60%, #cbd5e1 100%) !important;
      box-shadow: 0 4px 0 #94a3b8, 0 8px 16px rgba(0, 0, 0, 0.45) !important;
    }

    .ludo-3d-dice.clickable {
      cursor: pointer !important;
      animation: ludoDicePulse 1.8s ease-in-out infinite alternate !important;
    }

    @keyframes ludoDicePulse {
      0% { transform: scale(0.98); }
      100% { transform: scale(1.04); }
    }

    .ludo-3d-dice.clickable:hover {
      transform: translateY(-2px);
    }

    .ludo-3d-dice.clickable:active {
      transform: translateY(2px) scale(0.96);
    }

    .ludo-3d-dice.border-red {
      border-color: #ef4444 !important;
      box-shadow: 0 4px 0 #dc2626, 0 6px 14px rgba(239, 68, 68, 0.3) !important;
    }
    .ludo-3d-dice.border-green {
      border-color: #10b981 !important;
      box-shadow: 0 4px 0 #059669, 0 6px 14px rgba(16, 185, 129, 0.3) !important;
    }
    .ludo-3d-dice.border-yellow {
      border-color: #f59e0b !important;
      box-shadow: 0 4px 0 #d97706, 0 6px 14px rgba(245, 158, 11, 0.3) !important;
    }
    .ludo-3d-dice.border-blue {
      border-color: #3b82f6 !important;
      box-shadow: 0 4px 0 #2563eb, 0 6px 14px rgba(59, 130, 246, 0.3) !important;
    }

    .ludo-direct-number-box {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
      height: 100% !important;
      user-select: none !important;
      pointer-events: none !important;
    }

    .ludo-direct-num {
      font-size: 38px !important;
      font-weight: 900 !important;
      line-height: 1 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif !important;
      color: #0f172a !important;
      letter-spacing: -1px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      pointer-events: none !important;
    }

    [data-theme="dark"] .ludo-direct-num {
      color: #0f172a !important;
    }

    .ludo-direct-number-box.num-6 .ludo-direct-num {
      color: #ef4444 !important;
      text-shadow: 0 1px 4px rgba(239, 68, 68, 0.35);
    }

    .ludo-3d-dice.rolling {
      animation: ludoDiceWobble 0.22s ease-in-out infinite alternate !important;
      pointer-events: none !important;
    }

    @keyframes ludoDiceWobble {
      0% { transform: rotate(-7deg) scale(0.96); }
      100% { transform: rotate(7deg) scale(1.04); }
    }

    .ludo-3d-dice.just-rolled {
      animation: ludoDicePop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }

    @keyframes ludoDicePop {
      0% { transform: scale(0.85); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }

    .ludo-dice-svg {
      display: block !important;
      width: 52px !important;
      height: 52px !important;
      pointer-events: none !important;
      user-select: none !important;
      filter: drop-shadow(0 1px 1px rgba(0,0,0,0.08));
    }

    .ludo-dice-face {
      width: 48px !important;
      height: 48px !important;
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      grid-template-rows: repeat(3, 1fr) !important;
      gap: 3px !important;
      padding: 3px !important;
      box-sizing: border-box !important;
    }

    .ludo-pip {
      display: block !important;
      width: 10px !important;
      height: 10px !important;
      border-radius: 50% !important;
      margin: auto !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      line-height: 0 !important;
      font-size: 0 !important;
    }

    .ludo-pip.ludo-pip-empty {
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      background: transparent !important;
      box-shadow: none !important;
      padding: 0 !important;
      margin: auto !important;
      width: 10px !important;
      height: 10px !important;
    }

    .ludo-pip.ludo-pip-filled {
      visibility: visible !important;
      opacity: 1 !important;
      background: radial-gradient(circle at 35% 35%, #334155, #0f172a) !important;
      box-shadow: inset 0 2px 3px rgba(0,0,0,0.85), 0 1px 1px rgba(255,255,255,0.9) !important;
    }

    .ludo-dice-face.face-1 .ludo-pip.ludo-pip-filled {
      background: radial-gradient(circle at 35% 35%, #ef4444, #b91c1c) !important;
      width: 16px !important;
      height: 16px !important;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(255,255,255,0.8), 0 0 8px rgba(239, 68, 68, 0.45) !important;
    }

    .ludo-dice-action-badge {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      text-align: center;
      white-space: nowrap;
    }

    .badge-click-roll {
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      color: #ffffff !important;
      background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
      padding: 4px 11px !important;
      border-radius: 8px !important;
      border: 1px solid rgba(255, 255, 255, 0.25) !important;
      box-shadow: 0 3px 8px rgba(37, 99, 235, 0.35) !important;
      cursor: pointer !important;
      font-size: 10.5px !important;
      font-weight: 800 !important;
      animation: badgePulse 1.2s infinite alternate !important;
      transition: transform 0.15s ease, box-shadow 0.15s ease !important;
    }

    .badge-click-roll:hover {
      transform: translateY(-1px) scale(1.05) !important;
      box-shadow: 0 5px 12px rgba(37, 99, 235, 0.5) !important;
    }

    .badge-click-roll:active {
      transform: translateY(1px) scale(0.97) !important;
    }

    @keyframes badgePulse {
      from { transform: scale(0.98); opacity: 0.92; }
      to { transform: scale(1.03); opacity: 1; }
    }

    .badge-rolled-val {
      color: #047857 !important;
      background: rgba(16, 185, 129, 0.16) !important;
      padding: 4px 10px !important;
      border-radius: 8px !important;
      border: 1px solid rgba(16, 185, 129, 0.35) !important;
      font-weight: 800 !important;
    }

    [data-theme="dark"] .badge-rolled-val {
      color: #34d399 !important;
      background: rgba(16, 185, 129, 0.2) !important;
    }

    .badge-last-roll {
      color: var(--text-2, #64748b) !important;
      background: var(--bg-card, #e2e8f0) !important;
      padding: 3px 8px !important;
      border-radius: 6px !important;
      border: 1px solid rgba(100, 116, 139, 0.25) !important;
    }

    .badge-waiting {
      color: var(--text-3, #94a3b8);
      font-size: 10px;
    }

    .ludo-console-status-pane {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .ludo-turn-indicator-bar {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
    }

    .ludo-turn-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .ludo-turn-dot.red { background: #ef4444; box-shadow: 0 0 6px #ef4444; }
    .ludo-turn-dot.green { background: #10b981; box-shadow: 0 0 6px #10b981; }
    .ludo-turn-dot.yellow { background: #f59e0b; box-shadow: 0 0 6px #f59e0b; }
    .ludo-turn-dot.blue { background: #3b82f6; box-shadow: 0 0 6px #3b82f6; }

    .ludo-turn-player-tag {
      font-size: 12.5px;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .ludo-turn-player-tag {
      color: #f1f5f9;
    }

    .ludo-guidance-message {
      font-size: 12px;
      color: var(--text-2, #64748b);
      line-height: 1.4;
    }

    .ludo-guidance-message.highlight {
      color: #0284c7;
      font-weight: 700;
    }

    [data-theme="dark"] .ludo-guidance-message.highlight {
      color: #38bdf8;
    }

    .ludo-last-action-caption {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
      background: var(--bg-card, #ffffff);
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid var(--border-sm, #e2e8f0);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-theme="dark"] .ludo-last-action-caption {
      background: #0f172a;
      border-color: #334155;
      color: #94a3b8;
    }

    /* ── Home Finished Celebratory Pawns & Badges ── */
    .yard-home-badge {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 10px;
      font-weight: 800;
      color: #b45309;
      background: #fef3c7;
      border: 1px solid #fde68a;
      padding: 2px 6px;
      border-radius: 10px;
      margin-left: 5px;
    }

    [data-theme="dark"] .yard-home-badge {
      color: #fde047;
      background: rgba(245, 158, 11, 0.2);
      border-color: rgba(245, 158, 11, 0.4);
    }

    .tok-home-champion {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 2px 5px;
      border-radius: 10px;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      border: 1.5px solid #fef08a;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.8), 0 2px 4px rgba(0,0,0,0.3);
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      animation: homePawnGlow 1.5s infinite alternate;
    }

    .home-tri-pawn {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      font-weight: 800;
      padding: 1px 3px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.7);
      color: #fef08a;
      box-shadow: 0 0 6px rgba(245, 158, 11, 0.9);
      z-index: 6;
    }
    .home-triangle.red-tri .home-tri-pawn { left: 4px; top: 35%; }
    .home-triangle.green-tri .home-tri-pawn { top: 4px; left: 35%; }
    .home-triangle.yellow-tri .home-tri-pawn { right: 4px; top: 35%; }
    .home-triangle.blue-tri .home-tri-pawn { bottom: 4px; left: 35%; }

    .ludo-token.token-reached-home {
      background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%) !important;
      border: 2px solid #fef08a !important;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.9), 0 2px 4px rgba(0,0,0,0.4) !important;
      color: #ffffff !important;
      position: relative;
      animation: homePawnGlow 1.4s infinite alternate;
    }
    .home-crown-mini {
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.8));
    }
    .yard-token-slot.slot-home {
      border-color: rgba(245, 158, 11, 0.7) !important;
      background: rgba(245, 158, 11, 0.1) !important;
    }

    @keyframes homePawnGlow {
      from { box-shadow: 0 0 6px #f59e0b; }
      to { box-shadow: 0 0 14px #fbbf24; transform: scale(1.05); }
    }

    [data-theme="dark"] .progress-pill.green {
      background: rgba(16, 185, 129, 0.15);
      border-color: rgba(16, 185, 129, 0.4);
      color: #86efac;
    }

    .chess-move-token {
      background: var(--bg-card, #ffffff);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }

    /* Game Over Banner in Modal */
    .arena-game-over-banner {
      margin-top: 14px;
      padding: 14px 18px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(0, 112, 243, 0.15) 0%, rgba(56, 189, 248, 0.15) 100%);
      border: 1px solid #38BDF8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .game-over-icon {
      font-size: 32px;
    }

    .game-over-text h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 800;
      color: #0284C7;
    }

    [data-theme="dark"] .game-over-text h4 {
      color: #a5b4fc;
    }

    .game-over-text p {
      margin: 2px 0 0 0;
      font-size: 12.5px;
      color: var(--text-2, #475569);
    }

    .btn-arena-rematch {
      padding: 8px 16px;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 3px 10px rgba(0, 112, 243, 0.3);
    }

    /* General modal shared components */
    .bonding-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 16px;
    }

    .bonding-modal-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 18px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      max-height: 90vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      animation: modalFadeIn 0.2s ease-out;
    }

    [data-theme="dark"] .bonding-modal-card {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

    .bonding-modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    [data-theme="dark"] .bonding-modal-header {
      border-color: #1f2937;
    }

    .bonding-modal-header h3 {
      font-size: 16px;
      font-weight: 700;
      margin: 0;
    }

    .bonding-modal-close {
      background: transparent;
      border: none;
      font-size: 24px;
      line-height: 1;
      cursor: pointer;
      color: var(--text-3, #94a3b8);
    }

    .bonding-modal-body {
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .bonding-modal-footer {
      padding: 14px 22px;
      border-top: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }

    [data-theme="dark"] .bonding-modal-footer {
      border-color: #1f2937;
    }

    .bonding-form-label {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      display: block;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-form-label {
      color: #f1f5f9;
    }

    .bonding-input, .bonding-select {
      width: 100%;
      padding: 10px 12px;
      border-radius: 9px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      color: inherit;
      font-size: 13px;
      outline: none;
    }

    [data-theme="dark"] .bonding-input, [data-theme="dark"] .bonding-select {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-btn-primary {
      padding: 9px 16px;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      border-radius: 9px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    .bonding-btn-secondary {
      padding: 9px 14px;
      background: transparent;
      border: 1px solid #cbd5e1;
      color: var(--text-2, #475569);
      border-radius: 9px;
      font-size: 13px;
      cursor: pointer;
    }

    .bonding-btn-danger {
      padding: 6px 12px;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ef4444;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }

    .bonding-add-member-row {
      display: flex;
      gap: 10px;
    }

    .bonding-members-list {
      max-height: 200px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .bonding-member-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 8px;
      background: var(--bg-muted, #f8fafc);
    }

    [data-theme="dark"] .bonding-member-item {
      background: #1e293b;
    }

    .bonding-member-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bonding-member-avatar {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-member-name {
      font-size: 13px;
      font-weight: 600;
    }

    .bonding-member-role {
      font-size: 11px;
      color: var(--text-3, #64748b);
      margin-left: 6px;
    }

    .you-badge {
      font-size: 11px;
      color: #0070F3;
      font-weight: 700;
    }

    .bonding-danger-zone {
      margin-top: 16px;
      padding: 14px;
      border: 1px dashed rgba(239, 68, 68, 0.4);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: rgba(239, 68, 68, 0.03);
    }

    .danger-zone-text strong {
      display: block;
      color: #ef4444;
      font-size: 13px;
    }

    .danger-zone-text span {
      font-size: 12px;
      color: var(--text-3, #64748b);
    }

    .bonding-user-pick-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 280px;
      overflow-y: auto;
    }

    .bonding-user-pick-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--bg-muted, #f8fafc);
      cursor: pointer;
      transition: background 0.15s ease;
    }

    [data-theme="dark"] .bonding-user-pick-item {
      background: #1e293b;
    }

    .bonding-user-pick-item:hover {
      background: rgba(0, 112, 243, 0.1);
    }

    .bonding-user-pick-info {
      flex: 1;
      margin-left: 10px;
    }

    .user-pick-name {
      font-size: 13.5px;
      font-weight: 700;
      display: block;
    }

    .user-pick-role {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
    }

    .bonding-avatar-picker {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .avatar-opt {
      font-size: 22px;
      padding: 8px 12px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .avatar-opt.active {
      border-color: #0070F3;
      background: rgba(0, 112, 243, 0.12);
      transform: scale(1.08);
    }

    .bonding-member-checkboxes {
      max-height: 180px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 10px;
      padding: 8px;
    }

    .bonding-check-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
    }

    .bonding-check-label:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-check-label:hover {
      background: #1e293b;
    }

    .bonding-emoji-popup {
      position: absolute;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 6px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.18);
      z-index: 10001;
    }

    [data-theme="dark"] .bonding-emoji-popup {
      background: #1c2638;
      border-color: #334361;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    .emoji-opt-btn {
      font-size: 20px;
      padding: 6px;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .emoji-opt-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .emoji-opt-btn:hover {
      background: #2a374f;
    }
    /* Dots & Boxes 4x4 Arena & Multiplayer Board Styles */
    .dotsboxes-arena-layout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: 100%;
      max-width: 440px;
      margin: 0 auto;
    }
    .dotsboxes-scoreboard {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      width: 100%;
    }
    .dots-player-card {
      display: flex;
      flex-direction: column;
      padding: 8px 14px;
      border-radius: 12px;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      min-width: 90px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .dots-player-card.is-turn-active {
      border-color: #38bdf8;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.4);
      transform: translateY(-2px);
    }
    .dots-player-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      color: #f8fafc;
      margin-bottom: 4px;
    }
    .dots-player-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0 0 6px currentColor;
    }
    .dots-player-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90px;
    }
    .dots-turn-pill {
      font-size: 9px;
      font-weight: 800;
      padding: 2px 5px;
      border-radius: 4px;
      background: #38bdf8;
      color: #0f172a;
      letter-spacing: 0.5px;
      margin-left: auto;
    }
    .dots-player-score {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .dots-player-score .score-val {
      font-size: 20px;
      font-weight: 900;
      line-height: 1;
    }
    .dots-player-score .score-lbl {
      font-size: 11px;
      color: #94a3b8;
      font-weight: 600;
    }
    .dotsboxes-board-wrapper {
      position: relative;
      padding: 18px;
      background: rgba(15, 23, 42, 0.9);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: inset 0 2px 14px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dotsboxes-grid {
      display: grid;
      grid-template-columns: 14px 52px 14px 52px 14px 52px 14px 52px 14px;
      grid-template-rows: 14px 52px 14px 52px 14px 52px 14px 52px 14px;
      align-items: center;
      justify-items: center;
      user-select: none;
    }
    .dots-cell.dot-intersection {
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
    }
    .dots-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #f8fafc;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
      pointer-events: none;
    }
    .dots-cell.dots-line {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      z-index: 3;
    }
    .dots-cell.dots-line.h-line {
      width: 52px;
      height: 14px;
    }
    .dots-cell.dots-line.v-line {
      width: 14px;
      height: 52px;
    }
    .dots-cell.dots-line.h-line .dots-line-bar {
      width: 50px;
      height: 6px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.12);
      transition: all 0.15s ease;
    }
    .dots-cell.dots-line.v-line .dots-line-bar {
      width: 6px;
      height: 50px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.12);
      transition: all 0.15s ease;
    }
    .dots-cell.dots-line.clickable {
      cursor: pointer;
    }
    .dots-cell.dots-line.clickable:hover .dots-line-bar {
      background: rgba(56, 189, 248, 0.85);
      box-shadow: 0 0 10px #38bdf8;
      transform: scale(1.15);
    }
    .dots-cell.dots-line.drawn.color-red .dots-line-bar {
      background: #ef4444;
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
    }
    .dots-cell.dots-line.drawn.color-blue .dots-line-bar {
      background: #3b82f6;
      box-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
    }
    .dots-cell.dots-line.drawn.color-green .dots-line-bar {
      background: #10b981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.8);
    }
    .dots-cell.dots-line.drawn.color-amber .dots-line-bar {
      background: #f59e0b;
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.8);
    }
    .dots-cell.dots-box {
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 1;
    }
    .dots-cell.dots-box.claimed {
      animation: boxClaimPop 0.3s ease-out;
    }
    @keyframes boxClaimPop {
      0% { transform: scale(0.6); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    .dots-cell.dots-box.claimed.color-red {
      background: rgba(239, 68, 68, 0.22);
      border: 1px solid rgba(239, 68, 68, 0.45);
    }
    .dots-cell.dots-box.claimed.color-blue {
      background: rgba(59, 130, 246, 0.22);
      border: 1px solid rgba(59, 130, 246, 0.45);
    }
    .dots-cell.dots-box.claimed.color-green {
      background: rgba(16, 185, 129, 0.22);
      border: 1px solid rgba(16, 185, 129, 0.45);
    }
    .dots-cell.dots-box.claimed.color-amber {
      background: rgba(245, 158, 11, 0.22);
      border: 1px solid rgba(245, 158, 11, 0.45);
    }
    .dots-box-claim-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    .box-owner-initial {
      font-size: 16px;
      font-weight: 900;
      color: #f8fafc;
    }
    .box-score-tag {
      font-size: 9px;
      font-weight: 800;
      color: #38bdf8;
      margin-top: 2px;
    }
    .dotsboxes-console-bar {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      width: 100%;
      text-align: center;
      padding: 8px 12px;
      background: rgba(15, 23, 42, 0.5);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .dots-guidance {
      font-size: 13px;
      font-weight: 600;
      color: #cbd5e1;
    }
    .dots-guidance.highlight {
      color: #38bdf8;
    }
    .dots-guidance strong {
      color: #ffffff;
    }
    .dots-caption {
      font-size: 11.5px;
      color: #94a3b8;
    }

    /* Chat Emoji Palette Popover */
    .chat-emoji-picker-popover {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 10px;
      width: 290px;
      max-height: 260px;
      background: var(--bg-surface, #1e293b);
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
      border-radius: 14px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
      z-index: 10005;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: popoverFadeIn 0.15s ease-out;
    }
    @keyframes popoverFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .emoji-picker-nav {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(0, 0, 0, 0.15);
      padding: 4px;
      gap: 2px;
    }
    .emoji-picker-tab {
      flex: 1;
      padding: 4px;
      font-size: 15px;
      background: transparent;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: background 0.12s;
    }
    .emoji-picker-tab:hover, .emoji-picker-tab.active {
      background: rgba(255, 255, 255, 0.12);
    }
    .emoji-picker-body {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 4px;
    }
    .emoji-picker-btn {
      background: transparent;
      border: none;
      font-size: 20px;
      padding: 6px 2px;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: transform 0.1s, background 0.1s;
    }
    .emoji-picker-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: scale(1.2);
    }

    `,document.head.appendChild(a)}function $a(s){if(!s)return"";const a=v(s),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return a.replace(e,g=>`<a href="${g}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${g} ↗</a>`)}const ga=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],Et=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],jt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function dn(s,a={}){const{userRole:e="employee",currentUser:g=null,initialTicketId:h=null}=a,b=e==="superadmin"||e==="admin";if(e==="client"||g&&g.role==="client"){s.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let p=[],o={},j=[],J=[],T={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:a.initialJobId||"all",myIssuesOnly:!1},q=null,W="comments",U=!1;s.innerHTML=`
    <div class="ci-360-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="ci-360-header-bar">
        <div class="ci-360-header-left">
          <div class="ci-360-breadcrumb">
            <span class="ci-360-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${b?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="ci-360-title-row">
            <h2 class="ci-360-main-title">🎫 ${b?"Support Tickets Board":"Support Tickets"}</h2>
          </div>
        </div>
        <div class="ci-360-header-actions">
          <button class="btn-ci-360-secondary" id="btn-ci-360-refresh" title="Refresh Board">
            🔄 Refresh
          </button>
          <button class="btn-ci-360-primary" id="btn-ci-360-create-ticket">
            + Create Ticket
          </button>
        </div>
      </div>

      <!-- Stats Overview Ribbon -->
      <div class="ci-360-stats-ribbon" id="ci-360-stats-root">
        <div class="ci-360-stat-card"><span class="ci-360-stat-val">—</span><span class="ci-360-stat-lbl">Loading Stats...</span></div>
      </div>

      <!-- Filter Toolbar -->
      <div class="ci-360-filter-bar">
        <div class="ci-360-filter-left">
          <div class="ci-360-search-wrap">
            <span class="ci-360-search-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input type="text" id="ci-360-search-input" class="ci-360-search-input" placeholder="Search ticket (ID, title, description)..." />
          </div>

          <select id="ci-360-filter-priority" class="ci-360-filter-select">
            <option value="all">Priority: All</option>
            <option value="Critical">🔴 Critical</option>
            <option value="High">🟠 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <select id="ci-360-filter-category" class="ci-360-filter-select">
            <option value="all">Category: All</option>
            ${Et.map(n=>`<option value="${n.key}">${n.icon} ${n.label}</option>`).join("")}
          </select>

          <select id="ci-360-filter-job" class="ci-360-filter-select">
            <option value="all">Linked Job: All</option>
          </select>

          <select id="ci-360-filter-assignee" class="ci-360-filter-select">
            <option value="all">Assignee: All</option>
            <option value="unassigned">Unassigned</option>
          </select>

          <button type="button" class="ci-360-pill-filter" id="ci-360-pill-my-issues">
            Only My Issues
          </button>

          <span class="ci-360-clear-filters" id="ci-360-clear-filters" style="display:none;">Clear Filters</span>
        </div>
      </div>

      <!-- Scrum Board Columns Container -->
      <div class="ci-360-board-columns" id="ci-360-board-columns-root">
        <div style="padding:40px;color:#94a3b8;font-size:14px;font-weight:600;">
          Loading Scrum Board...
        </div>
      </div>

      <!-- Modal Injection Root -->
      <div id="ci-360-modals-root"></div>
    </div>
  `,await Promise.all([it(),Qe(),mt(),Ft()]),lt(),dt(),Le(),Re(),h&&ct(h);const me=setInterval(()=>{if(!document.contains(s)){clearInterval(me);return}!(s.querySelector(".dragging")||s.querySelector("input:focus")||s.querySelector("textarea:focus"))&&!q&&de()},12e3),$e=()=>{document.contains(s)&&!q&&de()};window.addEventListener("focus",$e);async function Qe(){try{const n=new URLSearchParams;T.search&&n.set("search",T.search),T.priority!=="all"&&n.set("priority",T.priority),T.category!=="all"&&n.set("category",T.category),T.assigneeId!=="all"&&n.set("assigneeId",T.assigneeId),T.jobId&&T.jobId!=="all"&&n.set("jobId",T.jobId),T.reporterId&&T.reporterId!=="all"&&n.set("reporterId",T.reporterId),T.scope==="created"&&n.set("reporterId",g?._id||g?.id),T.scope==="assigned"&&n.set("assigneeId",g?._id||g?.id),T.myIssuesOnly&&n.set("myIssuesOnly","true");const r=await ze("/tickets?"+n.toString());p=Array.isArray(r)?r:[]}catch(n){$(n.message||"Failed to load tickets",!0),p=[]}}async function it(){try{o=await ze("/tickets/stats")}catch(n){console.warn("Could not fetch ticket stats:",n)}}async function mt(){try{let n;try{n=await ze("/tickets/staff")}catch{n=await ze("/users")}j=(n||[]).filter(r=>r.active!==!1&&r.role!=="client")}catch(n){console.warn("Could not fetch employees:",n),j=[]}}async function Ft(){try{const n=await ze("/jobs?limit=250");J=Array.isArray(n)?n:n?.jobs||[]}catch(n){console.warn("Could not fetch jobs:",n)}}function lt(){const n=s.querySelector("#ci-360-stats-root");n&&(n.innerHTML=`
      <div class="ci-360-stat-card ${T.status==="all"&&!T.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="ci-360-stat-val">${o.total||0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${T.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${o.toDo||0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${T.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${o.content??(o.inProgress||0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${T.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${o.design||0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${T.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${o.underReview||0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${T.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
        <span class="ci-360-stat-val">${o.readyToLeave??(o.resolved||o.closed||0)}</span>
        <span class="ci-360-stat-lbl">Ready to Leave</span>
      </div>
      <div class="ci-360-stat-card critical" data-stat-filter="critical">
        <span class="ci-360-stat-val">${o.critical||0}</span>
        <span class="ci-360-stat-lbl">Critical 🔴</span>
      </div>
      <div class="ci-360-stat-card overdue" data-stat-filter="overdue">
        <span class="ci-360-stat-val">${o.overdue||0}</span>
        <span class="ci-360-stat-lbl">Overdue ⚠️</span>
      </div>
    `,n.querySelectorAll(".ci-360-stat-card").forEach(r=>{r.onclick=async()=>{const f=r.dataset.statFilter;f==="all"?(T.status="all",T.priority="all"):f==="critical"?(T.priority="Critical",T.status="all"):(T.status=f,T.priority="all"),await de()}}))}function Le(){const n=s.querySelector("#ci-360-filter-assignee");n&&(n.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${j.map(f=>`
          <option value="${f._id}" ${T.assigneeId===f._id.toString()?"selected":""}>
            ${v(f.name)} (${v(f.role)})
          </option>
        `).join("")}
      `);const r=s.querySelector("#ci-360-filter-job");r&&(r.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${J.map(f=>`
          <option value="${f._id}" ${T.jobId===f._id.toString()?"selected":""}>
            📁 ${v(f.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function dt(){const n=s.querySelector("#ci-360-board-columns-root");if(!n)return;const r={};ga.forEach(f=>{r[f.key]=[]}),p.forEach(f=>{let y=f.status||"To Do";y==="In Progress"?y="Content":y==="Resolved"?y="Under Review":y==="Closed"&&(y="Ready to Leave"),r[y]||(r[y]=[]),r[y].push(f)}),n.innerHTML=ga.map(f=>{const y=r[f.key]||[];return`
        <div class="ci-360-board-column" data-status="${f.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${v(f.label)}</span>
              <span class="ci-360-col-badge">${y.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${f.key}">
            ${y.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:y.map(z=>wt(z)).join("")}
          </div>
        </div>
      `}).join(""),Be(),vt()}function wt(n){const r=Et.find(E=>E.key===n.category)||Et[0],f=jt.find(E=>E.key===n.priority)||jt[2],y=n.dueDate&&new Date(n.dueDate)<new Date&&n.status!=="Ready to Leave"&&n.status!=="Closed",z=(n.subtasks||[]).filter(E=>E.completed).length,N=(n.subtasks||[]).length,S=Array.isArray(n.assignees)&&n.assignees.length>0?n.assignees:n.assignee&&n.assignee.userId?[n.assignee]:[],P=g?._id||g?.id,H=n.reporter&&n.reporter.userId&&String(n.reporter.userId)===String(P)||n.userId&&String(n.userId)===String(P),F=e==="superadmin"||g?.role==="superadmin",R=H||F;let x="";if(S.length===0)x='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const E=S.slice(0,3),X=S.length-3;x=`
        <div class="ci-360-avatar-group">
          ${E.map(I=>`
            <div class="ci-360-avatar" title="Assignee: ${v(I.name||"Member")} (${v(I.role||"")})">
              ${(I.avatar||I.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${X>0?`
            <div class="ci-360-avatar extra-count" title="${X} more assignees: ${v(S.slice(3).map(I=>I.name).join(", "))}">
              +${X}
            </div>
          `:""}
        </div>
      `}return`
      <div class="ci-360-card" draggable="true" data-ticket-id="${n._id}">
        <div class="ci-360-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="ci-360-category-pill ${r.slug}">
              ${r.icon} ${r.label}
            </span>
            ${H?`
              <span class="ci-360-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${n.dueDate?`
              <span class="ci-360-due-pill ${y?"overdue":""}" title="Due Date">
                ${y?"⚠️ ":"📅 "}
                ${new Date(n.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          ${R?`
            <button type="button" class="ci-360-card-quick-del btn-delete-card-ticket" data-ticket-id="${n._id}" data-ticket-num="${v(n.ticketId)}" title="Delete Ticket (${F?"Superadmin":"Creator"})">
              🗑️
            </button>
          `:""}
        </div>

        <div class="ci-360-card-title" title="${v(n.title)}">
          ${v(n.title)}
        </div>

        ${n.jobTitle||n.jobId&&n.jobId.title?`
          <div class="ci-360-card-job-link" title="Linked Internal Job: ${v(n.jobTitle||n.jobId.title)}">
            📁 ${v(n.jobTitle||n.jobId.title)}
          </div>
        `:""}

        ${n.linkUrl||n.links&&n.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${v(n.linkUrl||n.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${v(n.linkUrl||n.links[0]?.url)}">
              🔗 ${n.links&&n.links[0]?.title?v(n.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="ci-360-card-bottom">
          <div class="ci-360-card-id-row">
            <span class="ci-360-pri-icon" title="Priority: ${f.label}">${f.icon}</span>
            <span class="ci-360-ticket-id">${v(n.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${N>0?`
              <span class="ci-360-subtask-badge" title="${z} of ${N} subtasks completed">
                ☑ ${z}/${N}
              </span>
            `:""}
            ${x}
          </div>
        </div>
      </div>
    `}function Be(){const n=s.querySelectorAll(".ci-360-card"),r=s.querySelectorAll(".ci-360-board-column");n.forEach(f=>{f.ondragstart=y=>{y.dataTransfer.setData("text/plain",f.dataset.ticketId),f.classList.add("dragging")},f.ondragend=()=>{f.classList.remove("dragging")}}),r.forEach(f=>{f.ondragover=y=>{y.preventDefault(),f.classList.add("drag-over")},f.ondragleave=()=>{f.classList.remove("drag-over")},f.ondrop=async y=>{y.preventDefault(),f.classList.remove("drag-over");const z=y.dataTransfer.getData("text/plain"),N=f.dataset.status;if(!z||!N)return;const S=p.find(R=>R._id.toString()===z);if(!S||S.status===N)return;const P=S.status,H=S.assignees?[...S.assignees]:[],F=S.assignee?{...S.assignee}:null;if(S.status=N,N==="Under Review"){const R={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};S.assignee=R,S.assignees=[R]}dt();try{const R=await at(`/tickets/${z}/status`,{status:N}),x=N==="Under Review"?`Moved ${R.ticketId} to Under Review (Default assigned to John)`:`Moved ${R.ticketId} to ${N}`;$(x,!1),await de()}catch(R){$(R.message||"Status update failed",!0),S.status=P,S.assignees=H,S.assignee=F,await de()}}})}function vt(){s.querySelectorAll(".btn-delete-card-ticket").forEach(n=>{n.onclick=async r=>{r.stopPropagation(),r.preventDefault();const f=n.dataset.ticketId,y=n.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${y}?`)){n.disabled=!0;try{await nt(`/tickets/${f}`),$(`Ticket ${y} deleted`,!1),await de()}catch(z){$(z.message||"Failed to delete ticket",!0),n.disabled=!1}}}}),s.querySelectorAll(".ci-360-card").forEach(n=>{n.onclick=r=>{if(r.target.tagName==="A"||r.target.closest(".btn-delete-card-ticket"))return;const f=n.dataset.ticketId;ct(f)}})}function Re(){const n=s.querySelector("#btn-ci-360-refresh");n&&(n.onclick=async()=>{await de(),$("Board updated",!1)});const r=s.querySelector("#btn-ci-360-create-ticket");r&&(r.onclick=()=>{l()});const f=s.querySelector("#ci-360-search-input");let y=null;f&&(f.oninput=I=>{clearTimeout(y),y=setTimeout(async()=>{T.search=I.target.value.trim(),je(),await de()},300)});const z=s.querySelector("#ci-360-filter-priority");z&&(z.onchange=async I=>{T.priority=I.target.value,je(),await de()});const N=s.querySelector("#ci-360-filter-category");N&&(N.onchange=async I=>{T.category=I.target.value,je(),await de()});const S=s.querySelector("#ci-360-filter-job");S&&(S.onchange=async I=>{T.jobId=I.target.value,je(),await de()});const P=s.querySelector("#ci-360-filter-assignee");P&&(P.onchange=async I=>{T.assigneeId=I.target.value,je(),await de()});const H=s.querySelector("#ci-360-pill-my-issues");H&&(H.onclick=async()=>{T.myIssuesOnly=!T.myIssuesOnly,H.classList.toggle("active",T.myIssuesOnly),je(),await de()});const F=s.querySelector("#ci-360-pill-scope-all"),R=s.querySelector("#ci-360-pill-scope-assigned"),x=s.querySelector("#ci-360-pill-scope-created"),E=async I=>{T.scope=I,F&&F.classList.toggle("active",I==="all"),R&&R.classList.toggle("active",I==="assigned"),x&&x.classList.toggle("active",I==="created"),je(),await de()};F&&(F.onclick=()=>E("all")),R&&(R.onclick=()=>E("assigned")),x&&(x.onclick=()=>E("created"));const X=s.querySelector("#ci-360-clear-filters");X&&(X.onclick=async()=>{T={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},f&&(f.value=""),z&&(z.value="all"),N&&(N.value="all");const I=s.querySelector("#ci-360-filter-job");I&&(I.value="all"),P&&(P.value="all"),H&&H.classList.remove("active"),F&&F.classList.add("active"),R&&R.classList.remove("active"),x&&x.classList.remove("active"),je(),await de()})}function je(){const n=s.querySelector("#ci-360-clear-filters");if(!n)return;const r=T.search||T.priority!=="all"||T.category!=="all"||T.jobId&&T.jobId!=="all"||T.assigneeId!=="all"||T.myIssuesOnly||T.scope&&T.scope!=="all";n.style.display=r?"inline":"none"}async function de(){await Qe(),dt()}async function ct(n){const r=s.querySelector("#ci-360-modals-root");if(r){r.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{q=await ze(`/tickets/${n}`)}catch(f){$(f.message||"Could not load ticket",!0),r.innerHTML="";return}we()}}function we(){const n=s.querySelector("#ci-360-modals-root");if(!n||!q)return;const r=q,f=Et.find(t=>t.key===r.category)||Et[0];jt.find(t=>t.key===r.priority)||jt[2];const y=r.subtasks||[],z=y.filter(t=>t.completed).length,N=y.length>0?Math.round(z/y.length*100):0,S=r.attachments||[],P=r.comments||[],H=(r.history||[]).slice().reverse(),F=r.workLogs||[],R=r.linkedTickets||[],x=g?._id||g?.id,E=r.reporter&&r.reporter.userId&&String(r.reporter.userId)===String(x)||r.userId&&String(r.userId)===String(x),X=e==="superadmin"||g?.role==="superadmin",I=E||X,L=Array.isArray(r.assignees)&&r.assignees.length>0?r.assignees:r.assignee&&r.assignee.userId?[r.assignee]:[];L.some(t=>t&&t.userId&&String(t.userId)===String(x));const c=r.jobId?._id?r.jobId._id.toString():r.jobId?r.jobId.toString():"",i=r.jobTitle||r.jobId&&r.jobId.title||"";n.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${f.slug}">${f.icon} ${f.label}</span>
              <span class="ci-360-ticket-id" style="font-size:13px;color:#38bdf8;">${v(r.ticketId)}</span>
            </div>
            <button class="ci-360-modal-close" id="btn-close-ci-360-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="ci-360-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="ci-360-detail-main">
              <!-- Issue Title Header -->
              <div class="ci-360-issue-header-wrap">
                <input type="text" class="ci-360-editable-title" id="inp-detail-title" value="${v(r.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Description</span>
                  <button type="button" class="ci-360-tool-btn" id="btn-toggle-desc-edit">
                    ${U?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${U?`
                  <div class="ci-360-editor-toolbar">
                    <button type="button" class="ci-360-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="ci-360-desc-editor" rows="6">${v(r.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-ci-360-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="ci-360-desc-wrap" id="view-detail-desc">
                    ${r.description?$a(r.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>🔗 Reference &amp; External Links (${(r.links||[]).length+(r.linkUrl&&!(r.links||[]).some(t=>t.url===r.linkUrl)?1:0)})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-toggle-add-link" style="font-size:11px;padding:4px 9px;">
                    + Add Link
                  </button>
                </div>

                <div id="add-link-form" class="ci-360-form-box" style="display:none;padding:12px;margin-bottom:10px;">
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <input type="url" id="inp-new-link-url" class="ci-360-form-input" placeholder="Paste link URL (e.g. https://figma.com/..., https://loom.com/..., live website)..." />
                    <input type="text" id="inp-new-link-title" class="ci-360-form-input" placeholder="Link label / description (Optional, e.g. Figma UI, Loom Video, Live App)..." />
                    <div style="display:flex;gap:8px;justify-content:flex-end;">
                      <button type="button" class="btn-ci-360-secondary" id="btn-cancel-new-link" style="font-size:12px;padding:6px 12px;">Cancel</button>
                      <button type="button" class="btn-ci-360-primary" id="btn-save-new-link" style="font-size:12px;padding:6px 12px;">Save Link 🔗</button>
                    </div>
                  </div>
                </div>

                ${r.links&&r.links.length>0||r.linkUrl?`
                  <div class="ci-360-links-list" style="display:flex;flex-direction:column;gap:8px;">
                    ${r.linkUrl&&!(r.links||[]).some(t=>t.url===r.linkUrl)?`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(r.linkUrl)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(r.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${v(r.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(r.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    `:""}
                    ${(r.links||[]).map(t=>`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(t.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(t.title||t.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${t.title?`<span style="word-break:break-all;">${v(t.url)}</span> · `:""}Added by ${v(t.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${v(t.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(t.url)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${t.id}" title="Remove Link">&times;</button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No reference links added yet. Click "+ Add Link" to attach Figma, Loom, Live App, or Drive links.</div>
                `}
              </div>

              <!-- Attachments Section (Fast streaming - any file format up to 1GB) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Attachments (${S.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${S.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${S.map(t=>{const k=t.type&&t.type.includes("video")||t.name&&t.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||t.url&&t.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="ci-360-att-card ${k?"is-video":""}" style="${k?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${k?"16px":"13px"};">${k?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${v(t.name)}">
                                  ${v(t.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${ma(t.size)} ${k?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${k?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${t.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${t.url}" download="${v(t.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${t.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${k?`
                            <div class="ci-360-video-slot" id="video-slot-${t.id}" style="display:none;margin-top:6px;width:100%;">
                              <video controls preload="metadata" style="width:100%;max-height:360px;border-radius:6px;background:#000;">
                                <source src="${t.url}" type="${t.type||"video/mp4"}">
                                Your browser does not support HTML5 video streaming.
                              </video>
                            </div>
                          `:""}
                        </div>
                      `}).join("")}
                  </div>
                `}
              </div>

              <!-- Subtasks Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Subtasks (${z}/${y.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${N}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${N}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${y.map(t=>`
                    <div class="ci-360-subtask-item">
                      <div class="ci-360-subtask-left">
                        <input type="checkbox" class="ci-360-subtask-cb cb-subtask-toggle" data-subtask-id="${t.id}" ${t.completed?"checked":""} />
                        <span class="ci-360-subtask-title ${t.completed?"done":""}">${v(t.title)}</span>
                      </div>
                      <button type="button" class="ci-360-att-del btn-del-subtask" data-subtask-id="${t.id}" title="Remove subtask">&times;</button>
                    </div>
                  `).join("")}
                </div>

                <div class="ci-360-subtask-add-row">
                  <input type="text" id="inp-new-subtask" class="ci-360-subtask-input" placeholder="+ Add a subtask (press Enter)..." />
                  <button type="button" class="btn-ci-360-secondary" id="btn-add-subtask">Add</button>
                </div>
              </div>

              <!-- Linked Work Items Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Linked Work Items (${R.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${R.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${R.map(t=>`
                      <div class="ci-360-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${v(t.relationship)}</span>
                          <span class="ci-360-ticket-id" style="color:#38bdf8;">${v(t.ticketId)}</span>
                          <span class="ci-360-linked-title" style="font-size:12.5px;">${v(t.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="ci-360-col-badge">${v(t.status||"Open")}</span>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${t.id}" title="Remove link">&times;</button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

                <div id="ci-360-link-box" class="ci-360-form-box" style="display:none;padding:10px;border-radius:6px;margin-top:6px;">
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="sel-link-rel" class="ci-360-select-field" style="width:140px;">
                      <option value="relates to">relates to</option>
                      <option value="blocks">blocks</option>
                      <option value="is blocked by">is blocked by</option>
                      <option value="duplicates">duplicates</option>
                    </select>
                    <input type="text" id="inp-link-target" class="ci-360-subtask-input" placeholder="Ticket ID (e.g. SUP-002)..." style="flex:1;" />
                    <button class="btn-ci-360-primary" id="btn-submit-link">Link</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Dedicated Linked Internal Job Block -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span style="display:flex;align-items:center;gap:6px;">📁 Linked Internal Job</span>
                  <button type="button" class="ci-360-tool-btn" id="btn-toggle-job-link">
                    ${i?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${i?`
                  <div class="ci-360-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div class="ci-360-job-card-title" style="font-weight:700;font-size:13px;">${v(i)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${v(c)}</div>
                      </div>
                    </div>
                    <button type="button" class="ci-360-tool-btn" id="btn-unlink-job" style="color:#ef4444;border-color:rgba(239,68,68,0.3);" title="Remove job link">
                      ✕ Unlink
                    </button>
                  </div>
                `:`
                  <div style="color:#64748b;font-size:12.5px;font-style:italic;padding:4px 0;">
                    No job linked yet. Click "+ Link a Job" to associate this ticket with a client deliverable or project.
                  </div>
                `}

                <div id="ci-360-job-link-box" class="ci-360-form-box" style="display:none;padding:12px;border-radius:6px;margin-top:8px;">
                  <label class="ci-360-form-label" style="font-size:11.5px;font-weight:700;display:block;margin-bottom:6px;">Choose Job to Link:</label>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="inp-modal-job-select" class="ci-360-select-field" style="flex:1;min-width:220px;">
                      <option value="">-- Select a Job --</option>
                      ${J.map(t=>`
                        <option value="${t._id}" ${c===t._id.toString()?"selected":""}>
                          📁 ${v(t.title||"Untitled Job")}
                        </option>
                      `).join("")}
                    </select>
                    <button class="btn-ci-360-primary" id="btn-save-job-link">Link Job</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-job-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Activity Tabs Section -->
              <div class="ci-360-section-block" style="margin-top:10px;">
                <div class="ci-360-sec-title">Activity</div>
                <div class="ci-360-activity-tabs">
                  <button type="button" class="ci-360-act-tab ${W==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${P.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${W==="history"?"active":""}" data-act-tab="history">
                    History (${H.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${W==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${F.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${W==="comments"?`
                  <div class="ci-360-comments-feed">
                    ${P.map(t=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(t.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${v(t.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${v(t.userRole)})</span></span>
                            <span class="ci-360-comment-time">${ia(t.createdAt)}</span>
                          </div>
                          <div class="ci-360-comment-body">${$a(t.content)}</div>
                        </div>
                      </div>
                    `).join("")}

                    <!-- Add Comment Composer -->
                    <div class="ci-360-comment-composer">
                      <div class="ci-360-avatar" style="background:#3b82f6;">
                        ${(g?.name||"U").slice(0,1).toUpperCase()}
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
                        <textarea id="inp-new-comment" class="ci-360-comment-textarea" rows="2" placeholder="Add an internal comment..."></textarea>
                        <div style="display:flex;justify-content:flex-end;">
                          <button class="btn-ci-360-primary" id="btn-submit-comment">Save Comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                `:""}

                <!-- B. History Tab -->
                ${W==="history"?`
                  <div class="ci-360-history-feed">
                    ${H.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:H.map(t=>`
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(t.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${v(t.userName)}</span>
                            <span class="ci-360-comment-time">${ia(t.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="ci-360-history-field">${v(t.field)}</strong>:
                            ${t.from?`<span style="text-decoration:line-through;color:#ef4444;">${v(t.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${v(t.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${W==="worklog"?`
                  <div class="ci-360-worklog-feed">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${r.loggedHours||0} hrs</strong></span>
                      <button class="btn-ci-360-secondary" id="btn-open-worklog-dialog" style="font-size:11px;padding:4px 8px;">
                        ⏱️ Log Work
                      </button>
                    </div>

                    <div id="ci-360-worklog-box" class="ci-360-form-box" style="display:none;padding:10px;border-radius:6px;margin:6px 0;">
                      <div style="display:flex;flex-direction:column;gap:8px;">
                        <input type="text" id="inp-worklog-time" class="ci-360-subtask-input" placeholder="Time spent (e.g. 2h 30m, 45m)..." />
                        <input type="text" id="inp-worklog-desc" class="ci-360-subtask-input" placeholder="Description of work performed..." />
                        <div style="display:flex;justify-content:flex-end;gap:6px;">
                          <button class="btn-ci-360-primary" id="btn-submit-worklog">Log</button>
                          <button class="btn-ci-360-secondary" id="btn-cancel-worklog">Cancel</button>
                        </div>
                      </div>
                    </div>

                    ${F.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:F.map(t=>`
                      <div class="ci-360-worklog-item">
                        <div class="ci-360-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(t.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-worklog-main">
                          <div class="ci-360-worklog-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${v(t.userName)} logged <strong style="color:#38bdf8;">${v(t.timeSpent)}</strong></span>
                            <span class="ci-360-comment-time">${ia(t.loggedAt)}</span>
                          </div>
                          ${t.description?`<div class="ci-360-comment-body" style="font-size:12px;">${v(t.description)}</div>`:""}
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}
              </div>
            </div>

            <!-- Right Sidebar Panel (32%) -->
            <div class="ci-360-detail-sidebar">
              <!-- Status -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Status</span>
                <select id="sel-detail-status" class="ci-360-select-field">
                  ${ga.map(t=>{let k=r.status||"To Do";return k==="In Progress"?k="Content":k==="Resolved"?k="Under Review":k==="Closed"&&(k="Ready to Leave"),`
                      <option value="${t.key}" ${k===t.key?"selected":""}>
                        ${t.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="ci-360-select-field">
                  ${jt.map(t=>`
                    <option value="${t.key}" ${r.priority===t.key?"selected":""}>
                      ${t.icon} ${t.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="ci-360-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="ci-360-side-lbl" style="margin-bottom:0;">Assigned Personnel (${L.length})</span>
                  
                    <button type="button" class="ci-360-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="ci-360-assigned-chips-wrap">
                  ${L.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:L.map(t=>`
                    <div class="ci-360-assignee-chip">
                      <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(t.avatar||t.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="ci-360-assignee-chip-name" title="${v(t.name)}">${v(t.name)}</span>
                      ${`
                        <button type="button" class="ci-360-assignee-chip-remove btn-remove-assignee" data-user-id="${t.userId}" title="Remove ${v(t.name)}">&times;</button>
                      `}
                    </div>
                  `).join("")}
                </div>

                <!-- Interactive Multi-select Assignee Picker -->
                <div id="ci-360-detail-assignee-box" class="ci-360-form-box" style="display:none;margin-top:8px;padding:10px;border-radius:6px;">
                  <div class="ci-360-assignee-header" style="font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
                    <span>ASSIGN / REASSIGN EMPLOYEES</span>
                    <button type="button" id="btn-close-detail-assignee-box" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:13px;">✕</button>
                  </div>
                  <div class="ci-360-emp-checklist" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;">
                    ${j.map(t=>{const k=L.some(A=>A&&A.userId&&String(A.userId)===String(t._id));return`
                        <label class="ci-360-emp-check-item ${k?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${t._id}" ${k?"checked":""} />
                          <div class="ci-360-avatar" style="width:18px;height:18px;font-size:9px;">${(t.name||"U").slice(0,1).toUpperCase()}</div>
                          <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                            ${v(t.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(t.role)})</span>
                          </span>
                        </label>
                      `}).join("")}
                  </div>
                  <div style="margin-top:8px;display:flex;justify-content:flex-end;gap:6px;">
                    <button type="button" class="btn-ci-360-primary" id="btn-save-detail-assignees" style="font-size:11px;padding:4px 10px;">
                      Save Assignees
                    </button>
                  </div>
                </div>
              </div>

              <!-- Reporter (Read Only) -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Reporter</span>
                <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                  <div class="ci-360-avatar" style="background:#2563eb;">
                    ${(r.reporter?.name||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${v(r.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${v(r.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Category</span>
                <select id="sel-detail-category" class="ci-360-select-field">
                  ${Et.map(t=>`
                    <option value="${t.key}" ${r.category===t.key?"selected":""}>
                      ${t.icon} ${t.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="ci-360-date-field" value="${r.dueDate?new Date(r.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="ci-360-select-field">
                  <option value="">None (Workspace General)</option>
                  ${J.map(t=>`
                    <option value="${t._id}" ${c===t._id.toString()?"selected":""}>
                      📁 ${v(t.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${r.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" class="ci-360-est-input" value="${r.estimatedHours||0}" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(r.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(r.updatedAt).toLocaleString()}</div>
                ${r.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(r.resolvedAt).toLocaleString()}</div>`:""}
              </div>

              <!-- Actions (Delete - Creator or Superadmin) -->
              ${I?`
                <div style="padding-top:10px;">
                  <button type="button" class="ci-360-tool-btn" id="btn-delete-ticket" style="color:#ef4444;border-color:rgba(239,68,68,0.4);width:100%;padding:6px;">
                    🗑️ Delete Ticket
                  </button>
                </div>
              `:""}
            </div>
          </div>
        </div>
      </div>
    `,ft()}function ft(){const n=s.querySelector("#ci-360-modals-root");if(!n||!q)return;const r=n.querySelector("#btn-close-ci-360-modal");r&&(r.onclick=pt);const f=n.querySelector("#ci-360-detail-backdrop");f&&(f.onclick=C=>{C.target===f&&pt()});const y=n.querySelector("#inp-detail-title");y&&(y.onchange=async()=>{const C=y.value.trim();if(C)try{q=await at(`/tickets/${q._id}`,{title:C}),await de()}catch(B){$(B.message||"Failed to update title",!0)}});const z=n.querySelector("#btn-toggle-desc-edit");z&&(z.onclick=()=>{U=!U,we()});const N=n.querySelector("#btn-cancel-desc");N&&(N.onclick=()=>{U=!1,we()});const S=n.querySelector("#btn-save-desc");S&&(S.onclick=async()=>{const C=n.querySelector("#inp-detail-desc")?.value;try{q=await at(`/tickets/${q._id}`,{description:C}),U=!1,we(),await de(),$("Description saved",!1)}catch(B){$(B.message||"Failed to save description",!0)}});const P=n.querySelector("#sel-detail-status");P&&(P.onchange=async C=>{try{const B=await at(`/tickets/${q._id}/status`,{status:C.target.value});q=B,we(),await it(),lt(),await de();const u=B.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${B.status}`;$(u,!1)}catch(B){$(B.message||"Status change failed",!0)}});const H=n.querySelector("#sel-detail-priority");H&&(H.onchange=async C=>{try{q=await at(`/tickets/${q._id}`,{priority:C.target.value}),we(),await de()}catch(B){$(B.message,!0)}});const F=n.querySelector("#btn-toggle-assignee-picker"),R=n.querySelector("#ci-360-detail-assignee-box"),x=n.querySelector("#btn-close-detail-assignee-box"),E=n.querySelector("#btn-save-detail-assignees");F&&R&&(F.onclick=()=>{const C=R.style.display==="none";R.style.display=C?"block":"none"}),x&&R&&(x.onclick=()=>{R.style.display="none"}),n.querySelectorAll(".chk-detail-emp").forEach(C=>{C.onchange=()=>{C.closest(".ci-360-emp-check-item")?.classList.toggle("selected",C.checked)}}),E&&(E.onclick=async()=>{const C=Array.from(n.querySelectorAll(".chk-detail-emp:checked")).map(B=>B.value);try{E.disabled=!0,q=await at(`/tickets/${q._id}`,{assigneeIds:C}),we(),await de(),$("Assignees updated!",!1)}catch(B){$(B.message,!0),E.disabled=!1}}),n.querySelectorAll(".btn-remove-assignee").forEach(C=>{C.onclick=async()=>{const B=C.dataset.userId,oe=(Array.isArray(q.assignees)&&q.assignees.length>0?q.assignees:q.assignee?.userId?[q.assignee]:[]).filter(ne=>ne&&ne.userId&&String(ne.userId)!==String(B)).map(ne=>String(ne.userId));try{q=await at(`/tickets/${q._id}`,{assigneeIds:oe}),we(),await de(),$("Assignee removed",!1)}catch(ne){$(ne.message,!0)}}});const X=n.querySelector("#sel-detail-category");X&&(X.onchange=async C=>{try{q=await at(`/tickets/${q._id}`,{category:C.target.value}),we(),await de()}catch(B){$(B.message,!0)}});const I=n.querySelector("#inp-detail-duedate");I&&(I.onchange=async C=>{try{q=await at(`/tickets/${q._id}`,{dueDate:C.target.value||null}),we(),await de()}catch(B){$(B.message,!0)}});const L=n.querySelector("#sel-detail-job");L&&(L.onchange=async C=>{try{q=await at(`/tickets/${q._id}`,{jobId:C.target.value||null}),we(),await de(),$(C.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(B){$(B.message,!0)}});const c=n.querySelector("#btn-toggle-job-link"),i=n.querySelector("#ci-360-job-link-box");c&&i&&(c.onclick=()=>{i.style.display=i.style.display==="none"?"block":"none"});const t=n.querySelector("#btn-cancel-job-link");t&&i&&(t.onclick=()=>{i.style.display="none"});const k=n.querySelector("#btn-save-job-link");k&&(k.onclick=async()=>{const C=n.querySelector("#inp-modal-job-select")?.value||null;try{q=await at(`/tickets/${q._id}`,{jobId:C}),we(),await de(),$(C?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(B){$(B.message,!0)}});const A=n.querySelector("#btn-unlink-job");A&&(A.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{q=await at(`/tickets/${q._id}`,{jobId:null}),we(),await de(),$("Job unlinked",!1)}catch(C){$(C.message,!0)}});const M=n.querySelector("#inp-detail-esthours");M&&(M.onchange=async C=>{try{q=await at(`/tickets/${q._id}`,{estimatedHours:Number(C.target.value)||0})}catch(B){$(B.message,!0)}}),n.querySelectorAll(".cb-subtask-toggle").forEach(C=>{C.onchange=async()=>{const B=C.dataset.subtaskId;try{q=await at(`/tickets/${q._id}/subtasks/${B}`,{completed:C.checked}),we(),await de()}catch(u){$(u.message,!0)}}}),n.querySelectorAll(".btn-del-subtask").forEach(C=>{C.onclick=async()=>{const B=C.dataset.subtaskId;try{q=await nt(`/tickets/${q._id}/subtasks/${B}`),we(),await de()}catch(u){$(u.message,!0)}}});const D=n.querySelector("#inp-new-subtask"),Y=n.querySelector("#btn-add-subtask"),ee=async()=>{const C=D?.value.trim();if(C)try{q=await ve(`/tickets/${q._id}/subtasks`,{title:C}),we(),await de()}catch(B){$(B.message,!0)}};Y&&(Y.onclick=ee),D&&(D.onkeydown=C=>{C.key==="Enter"&&(C.preventDefault(),ee())});const O=n.querySelector("#btn-toggle-add-link"),_=n.querySelector("#add-link-form"),Q=n.querySelector("#btn-cancel-new-link"),ie=n.querySelector("#btn-save-new-link"),ae=n.querySelector("#inp-new-link-url"),pe=n.querySelector("#inp-new-link-title");O&&_&&(O.onclick=()=>{const C=_.style.display==="none";_.style.display=C?"block":"none",C&&ae&&ae.focus()}),Q&&_&&(Q.onclick=()=>{_.style.display="none",ae&&(ae.value=""),pe&&(pe.value="")}),ie&&ae&&(ie.onclick=async()=>{const C=ae.value.trim(),B=pe?.value.trim()||"";if(!C){$("Please enter a valid URL link",!0);return}try{ie.disabled=!0,ie.textContent="Saving...",q=await ve(`/tickets/${q._id}/links`,{url:C,title:B}),we(),await de(),$("Reference link added! 🔗",!1)}catch(u){$(u.message||"Failed to save link",!0),ie.disabled=!1,ie.textContent="Save Link 🔗"}}),n.querySelectorAll(".btn-copy-link").forEach(C=>{C.onclick=()=>{const B=C.dataset.url;B&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(B).then(()=>{$("Link copied to clipboard! 📋")}).catch(()=>{$("Link: "+B)}):$("Link: "+B))}}),n.querySelectorAll(".btn-del-link").forEach(C=>{C.onclick=async()=>{const B=C.dataset.linkId;try{q=await nt(`/tickets/${q._id}/links/${B}`),we(),await de(),$("Link removed")}catch(u){$(u.message||"Failed to remove link",!0)}}});const ge=n.querySelector("#btn-trigger-detail-upload"),le=n.querySelector("#inp-detail-att-upload"),xe=n.querySelector("#detail-att-upload-progress");ge&&le&&(ge.onclick=C=>{C.preventDefault(),le.click()}),le&&(le.onchange=async()=>{const C=Array.from(le.files||[]);if(le.value="",!!C.length){xe&&(xe.style.display="block",xe.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${C.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const u=(await fa(C,oe=>{const ne=n.querySelector("#att-prog-pct"),Te=n.querySelector("#att-prog-bar");ne&&(ne.textContent=`${oe}%`),Te&&(Te.style.width=`${oe}%`)})).map(oe=>({name:oe.name,url:oe.url,size:oe.size||0,type:oe.type||"application/octet-stream"}));u.length&&(q=await ve(`/tickets/${q._id}/attachments`,{attachments:u}),we(),$(`Successfully attached ${u.length} file(s)! 📎`,!1))}catch(B){console.error("Upload error:",B),$(`Upload failed: ${B.message}`,!0)}finally{xe&&(xe.style.display="none")}}}),n.querySelectorAll(".btn-play-att-video").forEach(C=>{C.onclick=()=>{const B=C.dataset.slot,u=n.querySelector("#"+B);if(u){const oe=u.style.display==="none";u.style.display=oe?"block":"none",C.textContent=oe?"⏸ Close Video":"▶ Play Video";const ne=u.querySelector("video");ne&&oe?ne.play().catch(()=>{}):ne&&ne.pause()}}}),n.querySelectorAll(".btn-del-att").forEach(C=>{C.onclick=async()=>{const B=C.dataset.attId;try{q=await nt(`/tickets/${q._id}/attachments/${B}`),we()}catch(u){$(u.message,!0)}}}),n.querySelectorAll(".ci-360-act-tab").forEach(C=>{C.onclick=()=>{W=C.dataset.actTab,we()}});const We=n.querySelector("#inp-new-comment"),Z=n.querySelector("#btn-submit-comment");Z&&We&&(Z.onclick=async()=>{const C=We.value.trim();if(C)try{Z.disabled=!0,Z.textContent="Saving...",q=await ve(`/tickets/${q._id}/comments`,{content:C}),we(),$("Comment added",!1)}catch(B){$(B.message||"Failed to add comment",!0)}finally{Z.disabled=!1}});const De=n.querySelector("#btn-open-link-dialog"),Ne=n.querySelector("#ci-360-link-box"),ue=n.querySelector("#btn-cancel-link"),Se=n.querySelector("#btn-submit-link"),ye=n.querySelector("#inp-link-target"),Oe=n.querySelector("#sel-link-rel");De&&Ne&&(De.onclick=()=>{Ne.style.display="block"}),ue&&Ne&&(ue.onclick=()=>{Ne.style.display="none"}),Se&&Ne&&(Se.onclick=async()=>{const C=ye?.value.trim(),B=Oe?.value||"relates to";if(C)try{Se.disabled=!0,q=await ve(`/tickets/${q._id}/links`,{targetTicketId:C,relationship:B}),we(),$(`Linked with ${C}`,!1)}catch(u){$(u.message||"Failed to link ticket",!0)}finally{Se.disabled=!1}}),n.querySelectorAll(".btn-del-link").forEach(C=>{C.onclick=async()=>{const B=C.dataset.linkId;try{q=await nt(`/tickets/${q._id}/links/${B}`),we()}catch(u){$(u.message,!0)}}});const Ue=n.querySelector("#btn-open-worklog-dialog"),ce=n.querySelector("#ci-360-worklog-box"),Me=n.querySelector("#btn-cancel-worklog"),qe=n.querySelector("#btn-submit-worklog"),Ee=n.querySelector("#inp-worklog-time"),Ie=n.querySelector("#inp-worklog-desc");Ue&&ce&&(Ue.onclick=()=>{ce.style.display="block"}),Me&&ce&&(Me.onclick=()=>{ce.style.display="none"}),qe&&ce&&(qe.onclick=async()=>{const C=Ee?.value.trim(),B=Ie?.value.trim();if(!C){$("Enter time spent (e.g. 2h 30m)",!0);return}try{qe.disabled=!0,q=await ve(`/tickets/${q._id}/worklogs`,{timeSpent:C,description:B}),we(),$("Work logged",!1)}catch(u){$(u.message||"Failed to log work",!0)}finally{qe.disabled=!1}});const Pe=n.querySelector("#btn-delete-ticket");Pe&&(Pe.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${q.ticketId}?`))try{Pe.disabled=!0,await nt(`/tickets/${q._id}`),$(`Ticket ${q.ticketId} deleted`,!1),pt(),await it(),lt(),await de()}catch(C){$(C.message||"Failed to delete ticket",!0),Pe.disabled=!1}})}function pt(){q=null,U=!1;const n=s.querySelector("#ci-360-modals-root");n&&(n.innerHTML="")}function l(n=null){const r=s.querySelector("#ci-360-modals-root");if(!r)return;const f=n||(T.jobId&&T.jobId!=="all"?T.jobId:null);r.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-create-backdrop">
        <div class="ci-360-modal-card" style="max-width:680px;height:auto;max-height:92vh;">
          <div class="ci-360-modal-header">
            <h3 style="margin:0;font-size:16px;font-weight:700;color:#f8fafc;">
              🎫 Create Support Ticket
            </h3>
            <button class="ci-360-modal-close" id="btn-close-create-modal">&times;</button>
          </div>

          <div style="padding:22px;overflow-y:auto;flex:1;">
            <div class="ci-360-form-grid-2">
              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Issue Type / Category *</label>
                <select id="create-ticket-cat" class="ci-360-select-field">
                  ${Et.map(i=>`<option value="${i.key}">${i.icon} ${i.label}</option>`).join("")}
                </select>
              </div>

              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Priority *</label>
                <select id="create-ticket-pri" class="ci-360-select-field">
                  <option value="Medium" selected>🟡 Medium</option>
                  <option value="Low">🟢 Low</option>
                  <option value="High">🟠 High</option>
                  <option value="Critical">🔴 Critical</option>
                </select>
              </div>
            </div>

            <div class="ci-360-form-group">
              <label class="ci-360-form-label">Summary / Title *</label>
              <input type="text" id="create-ticket-title" class="ci-360-form-input" placeholder="e.g. Navigation dropdown glitch on Safari mobile" required />
            </div>

            <div class="ci-360-form-group">
              <label class="ci-360-form-label">Description (Provide details, steps, or context)</label>
              <textarea id="create-ticket-desc" class="ci-360-form-textarea" rows="4" placeholder="Describe the issue, requirements, or internal request..."></textarea>
            </div>

            <div class="ci-360-form-group">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="ci-360-form-label" style="margin-bottom:0;">Assign Employees (Choose one or multiple)</label>
                <div style="display:flex;gap:8px;">
                  <button type="button" id="btn-create-assign-self" style="background:none;border:none;color:#38bdf8;font-size:11px;font-weight:600;cursor:pointer;text-decoration:underline;">
                    + Select Myself
                  </button>
                  <button type="button" id="btn-create-clear-assign" style="background:none;border:none;color:#94a3b8;font-size:11px;cursor:pointer;">
                    Clear All
                  </button>
                </div>
              </div>

              <div class="ci-360-emp-checklist-box">
                <div class="ci-360-emp-checklist" id="create-emp-checklist">
                  ${j.map(i=>{const t=g&&String(g._id||g.id)===String(i._id);return`
                      <label class="ci-360-emp-check-item ${t?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${i._id}" ${t?"checked":""} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(i.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${v(i.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(i.role)})${t?" — (You)":""}</span>
                        </span>
                      </label>
                    `}).join("")}
                </div>
              </div>
              <div id="create-assignee-hint" style="font-size:11px;color:#94a3b8;margin-top:4px;">
                Check all employees you want to assign to this ticket.
              </div>
            </div>

            <div class="ci-360-form-grid-2">
              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Due Date (Optional)</label>
                <input type="date" id="create-ticket-duedate" class="ci-360-date-field" />
              </div>

              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Related Job / Internal Project (Optional)</label>
                <select id="create-ticket-job" class="ci-360-select-field">
                  <option value="">None (General Workspace Issue)</option>
                  ${J.map(i=>`
                    <option value="${i._id}" ${f&&String(f)===String(i._id)?"selected":""}>
                      📁 ${v(i.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>
            </div>

            <!-- External Reference URL / Link -->
            <div class="ci-360-form-group">
              <label class="ci-360-form-label">🔗 External Reference Link / URL (Optional)</label>
              <input type="url" id="create-ticket-url" class="ci-360-form-input" placeholder="e.g. https://figma.com/..., https://loom.com/..., live website URL, Google Drive..." />
            </div>

            <!-- Attachments & Fast File Uploader (Up to 1GB) -->
            <div class="ci-360-form-group" style="margin-top:14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="ci-360-form-label" style="margin:0;">Attachments &amp; Files (All formats up to 1GB)</label>
                <span id="create-att-count" style="font-size:11px;color:#94a3b8;">0 files attached</span>
              </div>
              <label class="ci-360-att-dropzone" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px;border-radius:8px;cursor:pointer;transition:border-color 0.2s;">
                <div style="font-size:18px;">📁 ⚡</div>
                <div style="font-size:12px;font-weight:600;color:#e2e8f0;">Click or drag &amp; drop files or videos here</div>
                <div style="font-size:10.5px;color:#64748b;">Fast parallel uploading: MP4, MOV, WebM, images, PDFs, archives (Up to 1GB supported)</div>
                <input type="file" id="inp-create-ticket-att" multiple style="display:none;" />
              </label>
              <div id="create-att-progress" style="display:none;margin-top:8px;"></div>
              <div id="create-att-list" class="ci-360-attachments-grid" style="margin-top:8px;"></div>
            </div>
          </div>

          <div class="ci-360-modal-footer">
            <button type="button" class="btn-ci-360-secondary" id="btn-cancel-create-ticket">Cancel</button>
            <button type="button" class="btn-ci-360-primary" id="btn-submit-create-ticket">Create Ticket 🚀</button>
          </div>
        </div>
      </div>
    `;const y=()=>{r.querySelectorAll(".ci-360-emp-check-item").forEach(i=>{const t=i.querySelector(".chk-create-emp");i.classList.toggle("selected",!!t?.checked)})};r.querySelectorAll(".chk-create-emp").forEach(i=>{i.onchange=y});const z=r.querySelector("#btn-create-assign-self");z&&g&&(z.onclick=()=>{const i=String(g._id||g.id);r.querySelectorAll(".chk-create-emp").forEach(t=>{t.value===i&&(t.checked=!0)}),y()});const N=r.querySelector("#btn-create-clear-assign");N&&(N.onclick=()=>{r.querySelectorAll(".chk-create-emp").forEach(i=>{i.checked=!1}),y()});const S=[],P=r.querySelector("#inp-create-ticket-att"),H=r.querySelector("#create-att-list"),F=r.querySelector("#create-att-count"),R=r.querySelector("#create-att-progress"),x=()=>{F&&(F.textContent=`${S.length} file(s) attached`),H&&(H.innerHTML=S.map((i,t)=>{const k=i.type&&i.type.includes("video")||i.name&&i.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${k?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${v(i.name)}">${v(i.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${ma(i.size)} ${k?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${t}" title="Remove">&times;</button>
          </div>
        `}).join(""),H.querySelectorAll(".btn-del-pending-att").forEach(i=>{i.onclick=()=>{S.splice(Number(i.dataset.idx),1),x()}}))};P&&(P.onchange=async()=>{const i=Array.from(P.files||[]);if(P.value="",!!i.length){R&&(R.style.display="block",R.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${i.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await fa(i,k=>{const A=r.querySelector("#create-prog-pct"),M=r.querySelector("#create-prog-bar");A&&(A.textContent=`${k}%`),M&&(M.style.width=`${k}%`)})).forEach(k=>{S.push({name:k.name,url:k.url,size:k.size||0,type:k.type||"application/octet-stream"})}),x()}catch(t){$(`Failed to upload files: ${t.message}`,!0)}finally{R&&(R.style.display="none"),P.value=""}}});const E=()=>{r.innerHTML=""},X=r.querySelector("#btn-close-create-modal");X&&(X.onclick=E);const I=r.querySelector("#btn-cancel-create-ticket");I&&(I.onclick=E);const L=r.querySelector("#ci-360-create-backdrop");L&&(L.onclick=i=>{i.target===L&&E()});const c=r.querySelector("#btn-submit-create-ticket");c&&(c.onclick=async()=>{const i=r.querySelector("#create-ticket-title")?.value.trim(),t=r.querySelector("#create-ticket-desc")?.value.trim(),k=r.querySelector("#create-ticket-cat")?.value||"Task",A=r.querySelector("#create-ticket-pri")?.value||"Medium",D=Array.from(r.querySelectorAll(".chk-create-emp:checked")).map(_=>_.value),Y=r.querySelector("#create-ticket-duedate")?.value||null,ee=r.querySelector("#create-ticket-job")?.value||null,O=r.querySelector("#create-ticket-url")?.value.trim()||"";if(!i){$("Ticket summary / title is required",!0);return}try{c.disabled=!0,c.textContent="Creating...";const _=await ve("/tickets",{title:i,description:t,category:k,priority:A,assigneeIds:D,assigneeId:D[0]||null,dueDate:Y,jobId:ee,linkUrl:O,attachments:S});$(`Ticket ${_.ticketId} created! 🎫`,!1),E(),await it(),lt(),await de(),ct(_._id)}catch(_){$(_.message||"Could not create ticket",!0),c.disabled=!1,c.textContent="Create Ticket 🚀"}})}s._openCreateTicketModal=l,s._openTicketDetailModal=ct,s._setJobFilter=async n=>{T.jobId=n||"all";const r=s.querySelector("#ci-360-filter-job");r&&(r.value=T.jobId),je(),await de()}}export{dn as a,ln as b,sn as i};
