import{c as ze,k as $,e as v,x as at,l as it,p as qt,m as Jt,j as ve,y as ma,z as na,A as fa}from"./api-awH_11eJ.js";const ha={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function Ta(){try{const s=localStorage.getItem("ci360_planner_settings");if(s)return Object.assign({},ha,JSON.parse(s))}catch{}return Object.assign({},ha)}function Fa(s){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(s))}catch{}}function Ke(){const s=new Date,a=s.getFullYear(),e=String(s.getMonth()+1).padStart(2,"0"),g=String(s.getDate()).padStart(2,"0");return`${a}-${e}-${g}`}function Kt(s,a){const e=new Date(s+"T00:00:00");e.setDate(e.getDate()+a);const g=e.getFullYear(),x=String(e.getMonth()+1).padStart(2,"0"),b=String(e.getDate()).padStart(2,"0");return`${g}-${x}-${b}`}function Dt(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function Ge(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function xa(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function Bt(s,a=1){const e=new Date(s+"T00:00:00"),g=e.getDay(),x=(g<a?7:0)+g-a,b=new Date(e);b.setDate(e.getDate()-x);const p=[];for(let o=0;o<7;o++){const R=new Date(b);R.setDate(b.getDate()+o);const J=R.getFullYear(),E=String(R.getMonth()+1).padStart(2,"0"),q=String(R.getDate()).padStart(2,"0");p.push(`${J}-${E}-${q}`)}return p}function Pa(){try{const s=window.AudioContext||window.webkitAudioContext;if(!s)return;const a=new s,e=a.currentTime,g=a.createOscillator(),x=a.createGain();g.type="sine",g.frequency.setValueAtTime(523.25,e),g.frequency.exponentialRampToValueAtTime(783.99,e+.15),x.gain.setValueAtTime(.2,e),x.gain.exponentialRampToValueAtTime(.001,e+.35),g.connect(x),x.connect(a.destination),g.start(e),g.stop(e+.35)}catch{}}function ri(s,a={}){const{userRole:e="employee",currentUser:g=null,onNavigate:x=null}=a,b=e==="superadmin"||e==="admin";let p=Ta(),o={selectedDate:Ke(),viewMode:"daily",filterStatus:"all",searchQuery:"",groupByEmployee:b,collapsedEmployees:{},selectedCategory:"all",selectedPersonnelId:"all",reportPersonnelId:"all",tasks:[],personnelList:[],clientList:[],loading:!1};La(),R();async function R(){o.loading=!0,J();try{const l=[ze("/tasks"),ze("/personnel").catch(()=>[]),ze("/clients").catch(()=>[])],[i,r,f]=await Promise.all(l);o.tasks=Array.isArray(i)?i:[],r&&(o.personnelList=Array.isArray(r)?r:[]),f&&(o.clientList=Array.isArray(f)?f:[])}catch(l){$("Failed to load planner tasks: "+l.message,!0)}finally{o.loading=!1,H()}}function J(){s.innerHTML=`
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
    `}function E(l){return o.tasks.filter(i=>{if(i.isDeleted===!0)return!1;if(b&&o.selectedPersonnelId!=="all"){const h=i.personnelId?._id||i.personnelId,M=String(h)===String(o.selectedPersonnelId),j=Array.isArray(i.coOwners)&&i.coOwners.some(C=>{const z=C.personnelId?._id||C.personnelId||C.userId?._id||C.userId;return String(z)===String(o.selectedPersonnelId)});if(!M&&!j)return!1}const r=i.completionDateStr||i.dateStr||(i.dueDate?new Date(i.dueDate).toISOString().slice(0,10):""),f=i.assignedDateStr||(i.assignedDate?new Date(i.assignedDate).toISOString().slice(0,10):"")||(i.createdAt?new Date(i.createdAt).toISOString().slice(0,10):"")||r;if(i.status==="In Progress"){const h=f&&r&&f<=r?f:r||f,M=f&&r&&f<=r?r:f||r;if(h&&M){if(l>=h&&l<=M)return!0}else{if(r&&r===l)return!0;if(f&&f===l)return!0}}return r&&r===l||i.status!=="Completed"&&f&&f===l?!0:!r&&!f?l===Ke():!1})}function q(l,i){if(l.status==="Completed")return!1;const r=l.completionDateStr||l.dateStr||(l.dueDate?new Date(l.dueDate).toISOString().slice(0,10):"");return r?r<i:!1}function W(l,i){const r=l.length,f=l.filter(z=>z.status==="Completed").length,h=l.filter(z=>z.status==="In Progress").length,M=l.filter(z=>z.status==="Pending"||z.status==="Todo").length,j=l.filter(z=>q(z,i)).length,C=r>0?Math.round(f/r*100):0;return{total:r,completed:f,inProgress:h,pending:M,overdue:j,percent:C}}function H(){const l=Ke(),i=o.selectedDate===l,r=E(o.selectedDate),f=W(r,l);s.innerHTML=`
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

            <button type="button" class="ci360-today-btn ${i?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${b?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${o.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${o.personnelList.map(h=>`
                  <option value="${h._id}" ${o.selectedPersonnelId===String(h._id)?"selected":""}>
                    ${v(h.name)} (${v(h.department||h.role||"Team")})
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
    `,lt(),Le()}function me(l,i){return o.viewMode==="weekly"?mt():o.viewMode==="report"?Ft():$e(l,i)}function $e(l,i){const r=Ke(),f=o.selectedDate<r;let h=l;if(o.filterStatus==="pending"?h=h.filter(C=>C.status==="Pending"||C.status==="Todo"):o.filterStatus==="in_progress"?h=h.filter(C=>C.status==="In Progress"):o.filterStatus==="completed"?h=h.filter(C=>C.status==="Completed"):o.filterStatus==="overdue"&&(h=h.filter(C=>q(C,r))),o.searchQuery){const C=o.searchQuery.toLowerCase().trim();h=h.filter(z=>{const O=(z.title||"").toLowerCase(),F=(z.description||"").toLowerCase(),U=(z.category||"").toLowerCase(),y=(z.clientName||"").toLowerCase(),T=(z.personnelId?.name||z.userId?.name||"").toLowerCase(),X=(z.createdByName||z.createdBy?.name||(z.createdBy?.email?z.createdBy.email.split("@")[0]:"")).toLowerCase(),_=Array.isArray(z.coOwners)?z.coOwners.map(c=>(c.name||"").toLowerCase()).join(" "):"",L=(z.clientId?.name||z.jobId?.clientId?.name||"").toLowerCase();return O.includes(C)||F.includes(C)||U.includes(C)||y.includes(C)||T.includes(C)||X.includes(C)||_.includes(C)||L.includes(C)})}h.sort((C,z)=>{if(C.status==="Completed"&&z.status!=="Completed")return 1;if(C.status!=="Completed"&&z.status==="Completed")return-1;const O={Urgent:0,High:1,Medium:2,Low:3};return(O[C.priority]||2)-(O[z.priority]||2)});const M=new Map;h.forEach(C=>{let z="unassigned",O="Unassigned / Team",F="",U="";C.personnelId&&typeof C.personnelId=="object"&&C.personnelId._id?(z=String(C.personnelId._id),O=C.personnelId.name||"Team Member",U=C.personnelId.role||"Personnel",F=C.personnelId.department||""):C.userId&&typeof C.userId=="object"&&C.userId._id?(z=String(C.userId._id),O=C.userId.name||"User",U=C.userId.role||"Member"):(C.createdByName||C.createdBy&&C.createdBy.name)&&(O=C.createdByName||C.createdBy.name,z="creator_"+O.toLowerCase().replace(/[^a-z0-9]/g,"_"),U="Creator"),M.has(z)||M.set(z,{key:z,name:O,department:F,role:U,tasks:[]}),M.get(z).tasks.push(C)});const j=Array.from(M.values()).sort((C,z)=>C.key==="unassigned"?1:z.key==="unassigned"?-1:C.name.localeCompare(z.name));return`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <h2 class="ci360-focus-title" style="margin:0;">
              <span class="accent-dot"></span>
              ${f?"Focus Archive":"Today's Focus"}
            </h2>
            <span class="ci360-task-count-badge">${h.length} ${h.length===1?"task":"tasks"}</span>
            ${f?"":`
              <button type="button" class="ci360-btn-primary" id="btnFocusAddTask" style="padding:6px 14px;font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:6px;border-radius:var(--r-md);margin-left:4px;cursor:pointer;box-shadow:0 2px 6px rgba(0,112,243,0.25);">
                <span style="font-size:15px;line-height:1;font-weight:800;">+</span> Add Task
              </button>
            `}
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${o.filterStatus==="all"?"active":""}" data-f="all">All (${i.total})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${i.pending})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${i.inProgress})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${i.completed})</button>
              ${i.overdue>0?`
                <button type="button" class="filter-pill overdue ${o.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${i.overdue})</button>
              `:""}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${b?`
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${o.groupByEmployee?"active":""}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${o.groupByEmployee?"By Employee":"Flat List"}
                </button>
                ${o.groupByEmployee&&j.length>0?`
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
          ${h.length===0?Qe(f):b&&o.groupByEmployee?`
              <div class="ci360-emp-groups-container">
                ${j.map(C=>{const z=!!o.collapsedEmployees[C.key],O=C.tasks.filter(T=>T.status==="Completed").length,F=C.tasks.filter(T=>T.status==="In Progress").length,U=C.tasks.filter(T=>T.status==="Pending"||T.status==="Todo").length,y=C.tasks.length>0?Math.round(O/C.tasks.length*100):0;return`
                    <div class="ci360-emp-group-card ${z?"is-collapsed":""}" data-emp-key="${C.key}">
                      <div class="ci360-emp-group-header" data-action="toggle-emp-group" data-emp-key="${C.key}" role="button" tabindex="0">
                        <div class="emp-group-left">
                          <span class="emp-collapse-icon">${z?"▶":"▼"}</span>
                          <div class="emp-avatar">${v((C.name||"U").charAt(0).toUpperCase())}</div>
                          <div class="emp-info">
                            <span class="emp-name">${v(C.name)}</span>
                            ${C.department||C.role?`<span class="emp-subtitle">${v(C.department?C.department+" · "+C.role:C.role)}</span>`:""}
                          </div>
                        </div>

                        <div class="emp-group-right">
                          <span class="emp-stat-pill total">${C.tasks.length} ${C.tasks.length===1?"task":"tasks"}</span>
                          <span class="emp-stat-pill done">${O} done</span>
                          ${F>0?`<span class="emp-stat-pill in-prog">${F} in progress</span>`:""}
                          ${U>0?`<span class="emp-stat-pill pending">${U} pending</span>`:""}
                          <div class="emp-mini-bar-wrap" title="${y}% completed">
                            <div class="emp-mini-bar-fill" style="width:${y}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${z?"":`
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${C.tasks.map(T=>nt(T,r)).join("")}
                          </div>
                        </div>
                      `}
                    </div>
                  `}).join("")}
              </div>
            `:`
              <div class="ci360-task-list">
                ${h.map(C=>nt(C,r)).join("")}
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
    `}function nt(l,i){const r=l.status==="Completed",f=q(l,i),h=l.completionDateStr||l.dateStr||(l.dueDate?new Date(l.dueDate).toISOString().slice(0,10):i),M=l.assignedDateStr||(l.assignedDate?new Date(l.assignedDate).toISOString().slice(0,10):"")||(l.createdAt?new Date(l.createdAt).toISOString().slice(0,10):""),j=l.status==="In Progress"&&M&&h&&M!==h,C=`pri-${(l.priority||"medium").toLowerCase()}`,z=`status-${(l.status||"pending").toLowerCase().replace(/\s+/g,"-")}`,O=l.createdByName||l.createdBy?.name||(l.createdBy?.email?l.createdBy.email.split("@")[0]:"")||l.personnelId?.name||l.userId?.name||"";return`
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
            <span class="ci360-badge ${C}">
              <span class="badge-dot"></span>
              ${v(l.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${z}">
              ${v(l.status||"Pending")}
            </span>

            <!-- Completion Date / Date Span Badge (Always Visible & Prominent) -->
            ${j?`
              <span class="ci360-badge completion-badge" style="background:rgba(59,130,246,0.15);color:#3b82f6;border-color:rgba(59,130,246,0.3);" title="In Progress from ${Ge(M)} to ${Ge(h)}">
                📅 ${Ge(M)} ➔ Due: ${Ge(h)}
              </span>
            `:`
              <span class="ci360-badge completion-badge" title="Target Completion Date: ${h}">
                📅 Due: ${Ge(h)}
              </span>
            `}

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${l.rescheduledFrom&&l.rescheduledFrom!==h?`
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${Ge(l.rescheduledFrom)} to ${Ge(h)} (${l.dateChangeCount||1} change${(l.dateChangeCount||1)>1?"s":""})">
                🔄 Date Changed: ${Ge(l.rescheduledFrom)} ➔ ${Ge(h)}
              </span>
            `:""}

            <!-- Added By Badge (Shows Who Created the Task) -->
            ${O?`
              <span class="ci360-badge creator-badge" title="Created / Added by: ${v(O)}">
                ✍️ Added by: ${v(O)}
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
            ${b&&(l.personnelId?.name||l.userId?.name)&&(l.personnelId?.name||l.userId?.name)!==O?`
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
    `}function mt(){const l=Bt(o.selectedDate,p.weekStartsOn),i=Ge(l[0]),r=Ge(l[6]),f=Ke();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${i} – ${r}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${l.map(h=>{const M=h===f,j=h===o.selectedDate,C=E(h),z=W(C,f);return`
              <div class="ci360-day-column ${M?"is-today":""} ${j?"is-selected":""}" data-date="${h}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${h}">
                  <div class="day-name">${xa(h)}</div>
                  <div class="day-number">${new Date(h+"T00:00:00").getDate()}</div>
                  ${M?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${z.completed}/${z.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${z.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${C.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:C.map(O=>`
                    <div class="ci360-mini-task-card ${O.status==="Completed"?"done":""}" data-id="${O._id}">
                      <button type="button" class="mini-check ${O.status==="Completed"?"checked":""}" data-action="toggle" data-id="${O._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${O._id}">
                        <div class="mini-title">${v(O.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(O.priority||"medium").toLowerCase()}">${O.priority||"Med"}</span>
                          ${O.dueTime?`<span class="mini-time">${v(O.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button (Locked on past dates) -->
                ${h<f?`
                  <div class="day-col-locked-note" title="Cannot add tasks on previous dates">
                    <span>🔒 Past Date</span>
                  </div>
                `:`
                  <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${h}">
                    + Add Task
                  </button>
                `}

              </div>
            `}).join("")}
        </div>

      </div>
    `}function Ft(){const l=Bt(o.selectedDate,p.weekStartsOn),i=Dt(l[0]),r=Dt(l[6]),f=Ke(),h=o.reportPersonnelId||"all",M=o.personnelList.find(T=>String(T._id)===String(h)),j=M?M.name:"",C=o.tasks.filter(T=>{if(T.isDeleted===!0)return!1;const X=T.completionDateStr||T.dateStr||(T.dueDate?new Date(T.dueDate).toISOString().slice(0,10):""),_=T.assignedDateStr||(T.assignedDate?new Date(T.assignedDate).toISOString().slice(0,10):"")||X;if(!(T.status==="In Progress"&&_&&X?l.some(c=>c>=_&&c<=X):l.includes(X)||l.includes(_)))return!1;if(h!=="all"){const c=String(T.personnelId?._id||T.personnelId||""),n=Array.isArray(T.coOwners)&&T.coOwners.some(t=>String(t.personnelId?._id||t.personnelId||t.userId?._id||t.userId||"")===String(h));return c===String(h)||n}return!0}),z=C.length,O=C.filter(T=>T.status==="Completed").length,F=C.filter(T=>T.status==="In Progress").length,U=z>0?Math.round(O/z*100):0,y={Urgent:0,High:0,Medium:0,Low:0};return C.forEach(T=>{const X=T.priority||"Medium";y[X]!==void 0&&y[X]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3);display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span>Week Period: ${i} – ${r}</span>
              ${h!=="all"&&j?`
                <span class="badge blue" style="font-size:11.5px;padding:2px 8px;font-weight:700;">👤 Employee: ${v(j)}</span>
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
                  <option value="all" ${h==="all"?"selected":""}>👥 All Team Members</option>
                  ${o.personnelList.map(T=>`
                    <option value="${T._id}" ${String(T._id)===String(h)?"selected":""}>
                      👤 ${v(T.name)} (${v(T.department||T.role||"Member")})
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
            <span class="value" style="font-size:28px">${z}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${O}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${F}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${U}%</span>
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
                ${l.map(T=>{const X=E(T),_=W(X,f);return`
                    <tr>
                      <td><strong>${xa(T)}</strong></td>
                      <td>${Ge(T)}</td>
                      <td>${_.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${_.completed}</td>
                      <td>${_.pending+_.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${_.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${_.percent}%</span>
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
              <div style="font-size:22px;font-weight:700">${y.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${y.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${y.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${y.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function lt(){const l=document.getElementById("btnViewDaily"),i=document.getElementById("btnViewWeekly"),r=document.getElementById("btnViewReport");l&&(l.onclick=()=>{o.viewMode="daily",H()}),i&&(i.onclick=()=>{o.viewMode="weekly",H()}),r&&(r.onclick=()=>{o.viewMode="report",H()});const f=document.getElementById("btnPrevDay"),h=document.getElementById("btnNextDay"),M=document.getElementById("btnJumpToday"),j=document.getElementById("hiddenDateInput"),C=document.getElementById("datePickerBadge");f&&(f.onclick=()=>{o.selectedDate=Kt(o.selectedDate,-1),H()}),h&&(h.onclick=()=>{o.selectedDate=Kt(o.selectedDate,1),H()}),M&&(M.onclick=()=>{o.selectedDate=Ke(),H()}),C&&j&&(C.onclick=()=>{try{typeof j.showPicker=="function"?j.showPicker():j.focus()}catch{j.focus()}},j.onchange=n=>{n.target.value&&(o.selectedDate=n.target.value,H())});const z=document.getElementById("admTeamSelect");z&&(z.onchange=n=>{o.selectedPersonnelId=n.target.value,H()});const O=document.getElementById("btnOpenAddTaskModal");O&&(O.onclick=()=>{if(o.selectedDate<Ke()){$("Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.",!0);return}Be()});const F=document.getElementById("btnPlannerActionsMenu"),U=document.getElementById("plannerActionsDropdown");F&&U&&(F.onclick=n=>{n.stopPropagation(),U.classList.toggle("hidden")},document.addEventListener("click",n=>{!U.contains(n.target)&&n.target!==F&&U.classList.add("hidden")}));const y=document.getElementById("btnActionImport");y&&(y.onclick=()=>{U?.classList.add("hidden"),vt()});const T=document.getElementById("btnActionExportPng");T&&(T.onclick=()=>{U?.classList.add("hidden"),Re()});const X=document.getElementById("btnActionExportPdf");X&&(X.onclick=()=>{U?.classList.add("hidden"),de()});const _=document.getElementById("btnActionAdminReport");_&&(_.onclick=()=>{U?.classList.add("hidden"),ct()});const L=document.getElementById("btnActionBackup");L&&(L.onclick=()=>{U?.classList.add("hidden"),ft()});const c=document.getElementById("btnActionSettings");c&&(c.onclick=()=>{U?.classList.add("hidden"),pt()})}function Le(l){if(o.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(_=>{_.onclick=()=>{o.filterStatus=_.dataset.f,H()}});const i=document.getElementById("plannerTaskSearchInp");i&&(i.oninput=_=>{const L=_.target.value;o.searchQuery=L;const c=_.target.selectionStart;H();const n=document.getElementById("plannerTaskSearchInp");if(n&&(n.focus(),c!==null))try{n.setSelectionRange(c,c)}catch{}});const r=document.getElementById("btnClearSearch");r&&(r.onclick=()=>{o.searchQuery="",H()});const f=document.getElementById("btnFocusAddTask");f&&(f.onclick=()=>{Be(null,o.selectedDate)});const h=document.getElementById("btnEmptyStateAddTask");h&&(h.onclick=()=>{Be(null,o.selectedDate)});const M=document.getElementById("quickAddTitleInp"),j=document.getElementById("quickAddCompletionDate"),C=document.getElementById("quickAddPriority"),z=document.getElementById("quickAddCategory"),O=document.getElementById("btnQuickAddSubmit"),F=async()=>{const _=Ke();if(o.selectedDate<_){$("Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.",!0);return}const L=(M?.value||"").trim();if(!L){$("Please enter a task title",!0),M?.focus();return}const c=(j?.value||"").trim()||o.selectedDate;if(c<_){$("Cannot set completion date on a previous date.",!0);return}try{const n={title:L,assignedDate:o.selectedDate,assignedDateStr:o.selectedDate,dateStr:c,completionDate:c,completionDateStr:c,dueDate:c,priority:C?.value||p.defaultPriority,category:z?.value||"General",status:"Pending"};if(b){const k=document.getElementById("quickAddAssignee")?.value;k==="all"?(n.assignAll=!0,n.personnelId="all"):k?n.personnelId=k:o.selectedPersonnelId!=="all"&&(n.personnelId=o.selectedPersonnelId)}const t=await ve("/tasks",n);o.tasks.unshift(t),$("Task added to today's focus! ✨"),M&&(M.value="",M.focus()),H()}catch(n){$(n.message,!0)}};O&&(O.onclick=F),M&&(M.onkeydown=_=>{_.key==="Enter"&&F()}),document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(_=>{_.onclick=()=>{const L=_.dataset.empKey;o.collapsedEmployees[L]=!o.collapsedEmployees[L],H()}});const U=document.getElementById("btnToggleEmpGrouping");U&&(U.onclick=()=>{o.groupByEmployee=!o.groupByEmployee,H()});const y=document.getElementById("btnExpandAllEmp");y&&(y.onclick=()=>{o.collapsedEmployees={},H()});const T=document.getElementById("btnCollapseAllEmp");T&&(T.onclick=()=>{document.querySelectorAll(".ci360-emp-group-card").forEach(_=>{const L=_.dataset.empKey;L&&(o.collapsedEmployees[L]=!0)}),H()});const X=document.getElementById("btnEmptyStateImport");X&&(X.onclick=()=>vt())}if(o.viewMode==="weekly"){const i=document.getElementById("btnPrevWeek"),r=document.getElementById("btnNextWeek"),f=document.getElementById("btnThisWeek");i&&(i.onclick=()=>{o.selectedDate=Kt(o.selectedDate,-7),H()}),r&&(r.onclick=()=>{o.selectedDate=Kt(o.selectedDate,7),H()}),f&&(f.onclick=()=>{o.selectedDate=Ke(),H()}),document.querySelectorAll(".day-col-header").forEach(h=>{h.onclick=()=>{o.selectedDate=h.dataset.date,o.viewMode="daily",H()}}),document.querySelectorAll('[data-action="add-day"]').forEach(h=>{h.onclick=()=>{Be(null,h.dataset.date)}})}if(o.viewMode==="report"){const i=document.getElementById("selectWeeklyReportEmployee");i&&(i.onchange=h=>{o.reportPersonnelId=h.target.value,H()});const r=document.getElementById("btnDownloadWeeklyPdf");r&&(r.onclick=()=>de({personnelId:o.reportPersonnelId||"all"}));const f=document.getElementById("btnOpenAdminReportModal");f&&(f.onclick=()=>ct())}s.querySelectorAll('[data-action="toggle"]').forEach(i=>{i.onclick=async r=>{r.stopPropagation();const f=i.dataset.id;await dt(f)}}),s.querySelectorAll('[data-action="edit"]').forEach(i=>{i.onclick=r=>{r.stopPropagation();const f=i.dataset.id,h=o.tasks.find(M=>M._id===f);h&&Be(h)}}),s.querySelectorAll('[data-action="delete"]').forEach(i=>{i.onclick=async r=>{r.stopPropagation();const f=i.dataset.id;await wt(f)}})}async function dt(l){const i=o.tasks.find(f=>f._id===l);if(!i)return;const r=i.status!=="Completed";try{const f=await at(`/tasks/${l}/toggle`,{}),h=o.tasks.findIndex(M=>M._id===l);h!==-1&&(o.tasks[h]=f),r?(p.soundEnabled&&Pa(),$("Task marked as completed! 🎉")):$("Task reopened as pending."),H()}catch(f){$(f.message,!0)}}async function wt(l){const i=o.tasks.find(r=>r._id===l);if(i&&confirm(`Are you sure you want to remove "${i.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await it(`/tasks/${l}`),o.tasks=o.tasks.filter(r=>r._id!==l),$("Task removed from planner (safely stored in database archive)"),H()}catch(r){$(r.message,!0)}}function Be(l=null,i=null){const r=!!l,f=Ke(),h=l?l.assignedDateStr||(l.assignedDate?new Date(l.assignedDate).toISOString().slice(0,10):"")||l.dateStr||(l.createdAt?new Date(l.createdAt).toISOString().slice(0,10):o.selectedDate):i&&i>=f?i:o.selectedDate>=f?o.selectedDate:f;l?l.completionDateStr||l.dueDate&&new Date(l.dueDate).toISOString().slice(0,10):i&&i>=f||o.selectedDate>=f&&o.selectedDate;const M=`
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
              <input type="date" id="taskDate" class="input" value="${h}" ${r?"":`min="${f}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${l?.completionDateStr||(l?.dueDate?new Date(l.dueDate).toISOString().slice(0,10):"")}" ${r?"":`min="${f}"`} placeholder="Defaults to that day">
              <small style="color:var(--text-3);font-size:11px;">If left blank, will default to that day (${h})</small>
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
    `,j=qt(M),C=j.querySelector("#taskForm"),z=j.querySelector("#btnModalClose"),O=j.querySelector("#btnCancelModal"),F=j.querySelector("#btnModalDeleteTask"),U=()=>j.remove();z&&(z.onclick=U),O&&(O.onclick=U),F&&l&&(F.onclick=async()=>{U(),await wt(l._id)});let y=[];l&&Array.isArray(l.coOwners)&&(y=l.coOwners.map(L=>({personnelId:L.personnelId?._id||L.personnelId||null,userId:L.userId?._id||L.userId||null,name:L.name||L.personnelId?.name||"",role:L.role||L.personnelId?.role||"",department:L.department||L.personnelId?.department||""})).filter(L=>L.personnelId||L.name));const T=j.querySelector("#coOwnersSelectedContainer"),X=j.querySelector("#taskCoOwnerSelect"),_=()=>{if(T){if(y.length===0){T.innerHTML='<span style="font-size:11.5px;color:var(--text-4);font-style:italic;">No co-owners added yet</span>';return}T.innerHTML=y.map((L,c)=>`
        <span class="co-owner-chip" style="display:inline-flex;align-items:center;gap:6px;background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);border-radius:16px;padding:3px 10px;font-size:12px;font-weight:600;">
          👤 ${v(L.name)}
          <button type="button" class="btn-remove-co" data-idx="${c}" style="background:transparent;border:none;color:var(--accent);cursor:pointer;font-size:14px;line-height:1;padding:0;margin-left:2px;font-weight:bold;" title="Remove co-owner">×</button>
        </span>
      `).join(""),T.querySelectorAll(".btn-remove-co").forEach(L=>{L.onclick=()=>{const c=parseInt(L.dataset.idx,10);y.splice(c,1),_()}})}};_(),X&&(X.onchange=()=>{const L=X.value;if(!L)return;const c=o.personnelList.find(n=>String(n._id)===String(L));c&&(y.some(t=>String(t.personnelId)===String(c._id))||(y.push({personnelId:c._id,name:c.name,role:c.role||"",department:c.department||""}),_())),X.value=""}),C.onsubmit=async L=>{L.preventDefault();const c=j.querySelector("#taskTitle").value.trim(),n=j.querySelector("#taskDesc").value.trim(),t=j.querySelector("#taskDate").value||h,A=j.querySelector("#taskCompletionDate")?.value?.trim()||t||o.selectedDate,P=j.querySelector("#taskPriority").value,D=j.querySelector("#taskStatus").value,Y=(j.querySelector("#taskClientName")?.value||j.querySelector("#taskCategory")?.value||"").trim(),ee=Y||"General";if(!c){$("Task title is required",!0);return}if(!r&&(A<f||t<f)){$("Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.",!0);return}const N={title:c,description:n,assignedDate:t,assignedDateStr:t,dateStr:A,completionDate:A,completionDateStr:A,dueDate:A,startTime:"",dueTime:"",priority:P,status:D,category:ee,clientName:Y,coOwners:y};if(b){const Q=j.querySelector("#taskAssignee")?.value;Q==="all"?(N.assignAll=!0,N.personnelId="all"):Q==="me"?N.personnelId="me":Q&&(N.personnelId=Q)}const I=j.querySelector("#btnSaveTask");I.disabled=!0,I.textContent="Saving...";try{if(r){const Q=await Jt(`/tasks/${l._id}`,N),ne=o.tasks.findIndex(ae=>ae._id===l._id);ne!==-1&&(o.tasks[ne]=Q),$("Task updated successfully! ✍️")}else{const Q=await ve("/tasks",N);Array.isArray(Q.tasks)?Q.tasks.forEach(ne=>o.tasks.unshift(ne)):o.tasks.unshift(Q),$("Task created successfully! ✨")}U(),H()}catch(Q){$(Q.message,!0),I.disabled=!1,I.textContent=r?"Save Changes":"Create Task"}}}function vt(){let l=[];const i=`
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
    `,r=qt(i),f=()=>r.remove();r.querySelector("#btnImportClose").onclick=f,r.querySelector("#btnCancelImport").onclick=f;const h=r.querySelector("#importTextarea"),M=r.querySelector("#importFileInput"),j=r.querySelector("#importDropzone"),C=r.querySelector("#previewListArea"),z=r.querySelector("#previewCountLabel"),O=r.querySelector("#btnConfirmImport"),F=r.querySelector("#importFileInfo");function U(T){if(!T)return[];const X=T.split(/\r?\n/),_=[];for(let L of X)L=L.trim(),L&&(L=L.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),L=L.replace(/^[-*•]\s+/,""),L=L.replace(/^\d+[\.\)]\s+/,""),L=L.trim(),L&&_.push(L));return _}function y(){const T=h.value,X=U(T),_=r.querySelector("#importTargetDate").value,L=E(_),c=new Set(L.map(n=>(n.title||"").trim().toLowerCase()));l=[];for(const n of X){const t=c.has(n.toLowerCase());l.push({title:n,isDuplicate:t})}if(z.textContent=`Preview (${l.length} ${l.length===1?"task":"tasks"} found)`,O.disabled=l.length===0,O.textContent=`Import ${l.length} ${l.length===1?"Task":"Tasks"}`,l.length===0){C.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}C.innerHTML=l.map((n,t)=>`
        <div class="preview-item ${n.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${t+1}.</span>
          <span class="preview-title">${v(n.title)}</span>
          ${n.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}h.oninput=y,j.onclick=()=>M.click(),M.onchange=T=>{const X=T.target.files[0];if(!X)return;F.textContent=`File selected: ${X.name} (${Math.round(X.size/1024)} KB)`;const _=new FileReader;_.onload=L=>{h.value=L.target.result,y()},_.readAsText(X)},j.ondragover=T=>{T.preventDefault(),j.classList.add("dragover")},j.ondragleave=()=>j.classList.remove("dragover"),j.ondrop=T=>{T.preventDefault(),j.classList.remove("dragover");const X=T.dataTransfer.files[0];if(X&&(X.type==="text/plain"||X.name.endsWith(".txt"))){F.textContent=`File dropped: ${X.name}`;const _=new FileReader;_.onload=L=>{h.value=L.target.result,y()},_.readAsText(X)}else $("Please drop a valid .txt plain-text file",!0)},O.onclick=async()=>{if(l.length===0)return;O.disabled=!0,O.textContent="Importing...";const T=r.querySelector("#importTargetDate").value;if(T<Ke()){$("Cannot import tasks for previous dates. Target date must be today or later.",!0),O.disabled=!1,O.textContent=`Import ${l.length} ${l.length===1?"Task":"Tasks"}`;return}const X=r.querySelector("#importPriority").value,_=r.querySelector("#importCategory").value.trim()||"General",L={date:T,tasks:l.map(c=>({title:c.title,priority:X,category:_,status:"Pending"}))};b&&o.selectedPersonnelId!=="all"&&(L.personnelId=o.selectedPersonnelId);try{const c=await ve("/tasks/bulk-import",L);Array.isArray(c.tasks)&&c.tasks.forEach(n=>o.tasks.unshift(n)),$(`Imported ${c.importedCount} tasks successfully! (${c.skippedCount} skipped duplicates)`),f(),o.selectedDate=T,H()}catch(c){$(c.message,!0),O.disabled=!1,O.textContent="Retry Import"}}}async function Re(){const l=E(o.selectedDate),i=W(l,Ke()),r=Dt(o.selectedDate),f=2,h=800,M=160,j=90,C=74,z=70,O=Math.max(120,l.length*C),F=M+j+O+z,U=document.createElement("canvas");U.width=h*f,U.height=F*f;const y=U.getContext("2d");y.scale(f,f);const T=document.documentElement.getAttribute("data-theme")==="dark",X=T?"#020713":"#F0F6FF",_=T?"#081226":"#FFFFFF",L=T?"rgba(56, 189, 248, 0.16)":"#E2E8F0",c=T?"#F8FAFC":"#0F172A",n=T?"#8EA4C8":"#475569",t="#0070F3",k="#10B981",A="#F59E0B";y.fillStyle=X,y.fillRect(0,0,h,F),y.fillStyle=_,je(y,24,20,h-48,M-30,16),y.fill(),y.strokeStyle=L,y.lineWidth=1,y.stroke(),y.fillStyle=t,y.font="bold 12px Inter, sans-serif",y.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),y.fillStyle=c,y.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',y.fillText(r,44,86),y.fillStyle=n,y.font="13px Inter, sans-serif",y.fillText(`Planned focus list · ${i.completed} of ${i.total} tasks completed (${i.percent}%)`,44,114);const P=M+6;y.fillStyle=_,je(y,24,P,h-48,j-16,12),y.fill(),y.stroke();const D=[{label:"TOTAL TASKS",val:String(i.total),color:c},{label:"COMPLETED",val:String(i.completed),color:k},{label:"IN PROGRESS",val:String(i.inProgress),color:A},{label:"PENDING",val:String(i.pending),color:n},{label:"PROGRESS",val:`${i.percent}%`,color:t}],Y=(h-48)/D.length;D.forEach((I,Q)=>{const ne=24+Q*Y+20;y.fillStyle=I.color,y.font="bold 20px Inter, sans-serif",y.fillText(I.val,ne,P+36),y.fillStyle=n,y.font="10px Inter, sans-serif",y.fillText(I.label,ne,P+54)});const ee=P+j;y.fillStyle=_,je(y,24,ee,h-48,O+10,16),y.fill(),y.stroke(),l.length===0?(y.fillStyle=n,y.font="14px Inter, sans-serif",y.textAlign="center",y.fillText("No scheduled tasks recorded for this date.",h/2,ee+60),y.textAlign="left"):l.forEach((I,Q)=>{const ne=ee+16+Q*C,ae=I.status==="Completed";y.beginPath(),y.arc(48,ne+14,10,0,Math.PI*2),ae?(y.fillStyle=k,y.fill(),y.strokeStyle="#FFFFFF",y.lineWidth=2,y.beginPath(),y.moveTo(44,ne+14),y.lineTo(47,ne+17),y.lineTo(52,ne+11),y.stroke()):(y.strokeStyle=L,y.lineWidth=2,y.stroke()),y.fillStyle=ae?n:c,y.font=`${ae?"normal":"500"} 14px Inter, sans-serif`;const pe=I.title.length>55?I.title.slice(0,52)+"...":I.title;if(y.fillText(pe,70,ne+18),ae){const ue=y.measureText(pe);y.strokeStyle=n,y.lineWidth=1.2,y.beginPath(),y.moveTo(70,ne+14),y.lineTo(70+ue.width,ne+14),y.stroke()}const ge=I.priority||"Medium";let le="#E2E8F0",xe="#334155";ge==="Urgent"?(le="#FEE2E2",xe="#DC2626"):ge==="High"?(le="#FEF3C7",xe="#D97706"):ge==="Low"&&(le="#ECFDF5",xe="#059669"),y.fillStyle=le,je(y,h-150,ne+4,60,20,10),y.fill(),y.fillStyle=xe,y.font="bold 10px Inter, sans-serif",y.fillText(ge,h-138,ne+18);const We=I.createdByName||I.createdBy?.name||(I.createdBy?.email?I.createdBy.email.split("@")[0]:"")||I.personnelId?.name||I.userId?.name||"Member",Z=I.completionDateStr||I.dateStr||"",De=[];De.push(`✍️ Added by: ${We}`),Z&&De.push(`📅 Due: ${Ge(Z)}`),I.dueTime&&De.push(`🕒 ${I.dueTime}`),I.category&&I.category!=="General"&&De.push(`#${I.category}`);const Ne=De.join("   ·   ");y.fillStyle=n,y.font="11px Inter, sans-serif",y.fillText(Ne,70,ne+36),Q<l.length-1&&(y.strokeStyle=L,y.lineWidth=.6,y.beginPath(),y.moveTo(40,ne+54),y.lineTo(h-40,ne+54),y.stroke())});const N=F-35;y.fillStyle=n,y.font="11px Inter, sans-serif",y.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,N);try{const I=U.toDataURL("image/png"),Q=document.createElement("a");Q.href=I,Q.download=`ci360-daily-planner-${o.selectedDate}.png`,document.body.appendChild(Q),Q.click(),Q.remove(),$("Daily Planner image exported! 🖼️")}catch(I){$("Failed to export image: "+I.message,!0)}}function je(l,i,r,f,h,M){l.beginPath(),l.moveTo(i+M,r),l.lineTo(i+f-M,r),l.quadraticCurveTo(i+f,r,i+f,r+M),l.lineTo(i+f,r+h-M),l.quadraticCurveTo(i+f,r+h,i+f-M,r+h),l.lineTo(i+M,r+h),l.quadraticCurveTo(i,r+h,i,r+h-M),l.lineTo(i,r+M),l.quadraticCurveTo(i,r,i+M,r),l.closePath()}function de(l={}){const i=Bt(o.selectedDate,p.weekStartsOn),r=Dt(i[0]),f=Dt(i[6]),h=Ke();let M=o.tasks.filter(_=>{if(_.isDeleted===!0)return!1;const L=_.completionDateStr||_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):""),c=_.assignedDateStr||(_.assignedDate?new Date(_.assignedDate).toISOString().slice(0,10):"")||L;return l.scope==="today"?L===h||c===h:l.scope==="all"?!0:_.status==="In Progress"&&c&&L?i.some(n=>n>=c&&n<=L):i.includes(L)||i.includes(c)});l.personnelId&&l.personnelId!=="all"&&(M=M.filter(_=>{const L=String(_.personnelId?._id||_.personnelId||""),c=Array.isArray(_.coOwners)&&_.coOwners.some(n=>String(n.personnelId?._id||n.personnelId||n.userId?._id||n.userId||"")===String(l.personnelId));return L===String(l.personnelId)||c})),l.status&&l.status!=="all"&&(M=M.filter(_=>_.status===l.status));const j=M.length,C=M.filter(_=>_.status==="Completed").length,z=M.filter(_=>_.status==="In Progress").length,O=j>0?Math.round(C/j*100):0,F=window.open("","_blank");if(!F){$("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const U=l.title||(l.isAdminReport?"CI360 Admin Detailed Executive Report":"Weekly Productivity Report"),y=l.scope==="today"?`Date: ${Dt(h)}`:l.scope==="all"?"All Active & Historical Tasks":`${r} – ${f}`;let T="";if(l.personnelId&&l.personnelId!=="all"){const _=o.personnelList.find(L=>String(L._id)===String(l.personnelId));_&&(T=`👤 Employee: ${_.name} (${_.department||_.role||"Member"})`)}const X=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${v(U)} — ${y}</title>
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
            <h1>${v(U)}</h1>
            <div class="period">
              ${y}
              ${T?`<span class="filter-tag" style="background:#dbeafe;color:#1e40af;font-weight:700;">${v(T)}</span>`:""}
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
            <div class="kpi-num">${j}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${C}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">In Progress</div>
            <div class="kpi-num" style="color:#f59e0b">${z}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#0070F3">${O}%</div>
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
            ${M.length===0?`
              <tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;font-weight:600">No scheduled tasks match the selected criteria.</td></tr>
            `:M.map(_=>{const L=_.completionDateStr||_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):"—"),c=_.assignedDateStr||(_.assignedDate?new Date(_.assignedDate).toISOString().slice(0,10):""),n=_.status==="In Progress"&&c&&L&&c!==L?`${Ge(c)} ➔ ${Ge(L)}`:Ge(L),t=_.jobId?.preferredPersonName||_.jobId?.assignments&&_.jobId.assignments[0]?.personId?.name||_.personnelId?.name||_.userId?.name||_.createdByName||"—",k=_.clientId?.name||_.jobId?.clientId?.name||_.clientId?.company||""||"—",A=_.description?v(_.description):'<span style="color:#cbd5e1">—</span>',P=Array.isArray(_.coOwners)&&_.coOwners.length>0?_.coOwners.map(N=>N.name).filter(Boolean).join(", "):"",D=(_.priority||"medium").toLowerCase(),Y=D==="urgent"?"badge-urgent":D==="high"?"badge-high":D==="low"?"badge-low":"badge-med",ee=(_.status||"pending").toLowerCase().replace(/\s+/g,"-");return`
                <tr>
                  <td><strong>${n}</strong></td>
                  <td><span class="client-tag">${v(k)}</span></td>
                  <td>
                    <span class="owner-tag">${v(t)}</span>
                    ${P?`<span class="co-owner-sub">👥 Co: ${v(P)}</span>`:""}
                  </td>
                  <td><strong>${v(_.title)}</strong></td>
                  <td><div class="desc-text">${A}</div></td>
                  <td><span class="badge ${Y}">${v(_.priority||"Medium")}</span></td>
                  <td><span class="status-tag status-${ee}">${v(_.status||"Pending")}</span></td>
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
    `;F.document.write(X),F.document.close(),$("Report generated for printing & PDF download! 📄")}function ct(){const l=Ke(),i=Bt(o.selectedDate,p.weekStartsOn),r=Ge(i[0]),f=Ge(i[6]),h=`
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
              ${o.personnelList.map(y=>`
                <option value="${y._id}" ${String(y._id)===String(o.reportPersonnelId)?"selected":""}>👤 ${v(y.name)} (${v(y.department||y.role||"Member")})</option>
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
    `,M=qt(h),j=M.querySelector("#btnAdminRepClose"),C=M.querySelector("#btnAdminRepCancel"),z=M.querySelector("#btnAdminRepPdf"),O=M.querySelector("#btnAdminRepCsv"),F=()=>M.remove();j&&(j.onclick=F),C&&(C.onclick=F);const U=()=>{const y=M.querySelector("#admRepScope")?.value||"week",T=M.querySelector("#admRepPersonnel")?.value||"all",X=M.querySelector("#admRepStatus")?.value||"all";let _="";if(T!=="all"){const L=o.personnelList.find(c=>String(c._id)===String(T));L&&(_+=`Person: ${L.name} · `)}return X!=="all"&&(_+=`Status: ${X}`),{scope:y,personnelId:T,status:X,filterSummary:_.replace(/\s*·\s*$/,"")}};z&&(z.onclick=()=>{const y=U();F(),de({...y,isAdminReport:!0,title:"CI360 Admin Detailed Executive Task Report"})}),O&&(O.onclick=()=>{const y=U();F(),we(y)})}function we(l={}){const i=Bt(o.selectedDate,p.weekStartsOn),r=Ke();let f=o.tasks.filter(F=>{if(F.isDeleted===!0)return!1;const U=F.completionDateStr||F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):""),y=F.assignedDateStr||(F.assignedDate?new Date(F.assignedDate).toISOString().slice(0,10):"")||U;return l.scope==="today"?U===r||y===r:l.scope==="all"?!0:F.status==="In Progress"&&y&&U?i.some(T=>T>=y&&T<=U):i.includes(U)||i.includes(y)});l.personnelId&&l.personnelId!=="all"&&(f=f.filter(F=>{const U=String(F.personnelId?._id||F.personnelId||""),y=Array.isArray(F.coOwners)&&F.coOwners.some(T=>String(T.personnelId?._id||T.personnelId||"")===String(l.personnelId));return U===String(l.personnelId)||y})),l.status&&l.status!=="all"&&(f=f.filter(F=>F.status===l.status));const h=["Date","Client Name","Job Owner","Primary Assignee","Co-Owners","Task Title","Description","Priority","Category","Status","Created By"],M=f.map(F=>{const U=F.completionDateStr||F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):""),y=F.jobId?.preferredPersonName||F.jobId?.assignments&&F.jobId.assignments[0]?.personId?.name||F.personnelId?.name||F.userId?.name||F.createdByName||"",T=F.clientId?.name||F.jobId?.clientId?.name||F.clientId?.company||"",X=F.personnelId?.name||F.userId?.name||"",_=Array.isArray(F.coOwners)?F.coOwners.map(D=>D.name).filter(Boolean).join("; "):"",L=F.title||"",c=F.description||"",n=F.priority||"Medium",t=F.category||"General",k=F.status||"Pending",A=F.createdByName||F.createdBy?.name||"",P=D=>`"${String(D||"").replace(/"/g,'""').replace(/\r?\n/g," ")}"`;return[P(U),P(T),P(y),P(X),P(_),P(L),P(c),P(n),P(t),P(k),P(A)].join(",")}),j="\uFEFF"+[h.join(","),...M].join(`\r
`),C=new Blob([j],{type:"text/csv;charset=utf-8;"}),z=URL.createObjectURL(C),O=document.createElement("a");O.href=z,O.download=`ci360-admin-report-${r}.csv`,document.body.appendChild(O),O.click(),document.body.removeChild(O),URL.revokeObjectURL(z),$("Admin CSV report downloaded! 📊")}function ft(){const i=qt(`
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
    `),r=()=>i.remove();i.querySelector("#btnBackupClose").onclick=r;const f=i.querySelector("#btnDownloadBackupJson");f.onclick=async()=>{f.disabled=!0,f.textContent="Generating backup...";try{const O=await ze("/tasks/backup"),F=new Blob([JSON.stringify(O,null,2)],{type:"application/json"}),U=URL.createObjectURL(F),y=document.createElement("a");y.href=U,y.download=`ci360-planner-backup-${Ke()}.json`,document.body.appendChild(y),y.click(),y.remove(),$("Planner backup downloaded successfully! 💾")}catch(O){$("Backup export failed: "+O.message,!0)}finally{f.disabled=!1,f.textContent="Download JSON Backup"}};const h=i.querySelector("#restoreFileInput"),M=i.querySelector("#restorePreviewArea"),j=i.querySelector("#restoreCountText"),C=i.querySelector("#btnExecuteRestore");let z=null;h.onchange=O=>{const F=O.target.files[0];if(!F)return;const U=new FileReader;U.onload=y=>{try{const T=JSON.parse(y.target.result),X=Array.isArray(T.tasks)?T.tasks:Array.isArray(T)?T:null;if(!X||X.length===0){$("Invalid backup file: No tasks found",!0);return}z=X,M.style.display="block",j.textContent=`Valid backup: ${X.length} tasks ready to restore.`,C.disabled=!1}catch(T){$("Error parsing JSON backup file: "+T.message,!0),M.style.display="none",C.disabled=!0}},U.readAsText(F)},C.onclick=async()=>{if(!z||z.length===0)return;C.disabled=!0,C.textContent="Restoring...";const O=i.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const F=await ve("/tasks/restore",{tasks:z,mode:O});$(`Restored ${F.restoredCount} tasks! (${F.skippedCount} skipped) ✨`),r(),await R()}catch(F){$("Restore failed: "+F.message,!0),C.disabled=!1,C.textContent="Retry Restore"}}}function pt(){const l=`
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
    `,i=qt(l),r=()=>i.remove();i.querySelector("#btnSettingsClose").onclick=r,i.querySelector("#btnCancelSettings").onclick=r;const f=i.querySelector("#btnPlannerTestNotif");f&&(f.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await requestNotificationPermission()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):$("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true");const h=i.querySelector("#setNotifEnabled");h&&(h.checked=!0);const M=i.querySelector("#plannerNotifStatusLabel");M&&(M.textContent="🟢 Active on this laptop"),await triggerSystemNotification({title:"CI360 Planner Alert 🔔",message:"Laptop & browser notifications are active and ready!",id:"ci360-planner-test-"+Date.now()}),$("Test notification sent to your laptop/browser! 🔔")}),i.querySelector("#settingsForm").onsubmit=h=>{h.preventDefault(),p.displayName=i.querySelector("#setDisplayName").value.trim()||"Daily Planner",p.weekStartsOn=Number(i.querySelector("#setWeekStart").value),p.defaultPriority=i.querySelector("#setDefaultPriority").value,p.density=i.querySelector("#setDensity").value,p.soundEnabled=i.querySelector("#setSound").checked;const M=i.querySelector("#setNotifEnabled")?.checked;localStorage.setItem("ci360_notif_enabled",M?"true":"false"),M&&"Notification"in window&&Notification.permission==="default"&&requestNotificationPermission(),Fa(p),$("Planner preferences saved! ⚙️"),r(),H()}}}function La(){if(document.getElementById("ci360-planner-styles"))return;const s=document.createElement("style");s.id="ci360-planner-styles",s.textContent=`
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
      display: flex;
      align-items: center;
      gap: 4px;
      background: transparent;
      border: none;
      padding: 0;
    }
    .filter-pill {
      background: rgba(0, 0, 0, 0.04);
      border: 1px solid var(--border-sm);
      padding: 5px 12px;
      border-radius: var(--r-full);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
    }
    [data-theme="dark"] .filter-pill {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(56, 189, 248, 0.14);
      color: #8EA4C8;
    }
    .filter-pill:hover {
      color: var(--text-1);
    }
    .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      border-color: #0070F3 !important;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35);
    }
    [data-theme="dark"] .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      border-color: #0070F3 !important;
      box-shadow: 0 0 16px rgba(0, 112, 243, 0.45);
    }
    .filter-pill.overdue.active {
      background: rgba(239, 68, 68, 0.1);
      color: var(--red-500);
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
    .ci360-week-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10px;
    }
    @media (max-width: 992px) {
      .ci360-week-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }
    .ci360-day-column {
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      padding: 12px 10px;
      display: flex;
      flex-direction: column;
      min-height: 380px;
      transition: all var(--t-fast);
    }
    .ci360-day-column.is-today {
      border-color: var(--accent);
      background: var(--bg-elevated);
      box-shadow: var(--shadow-sm);
    }
    .ci360-day-column.is-selected {
      outline: 2px solid var(--brand-400);
    }
    .day-col-header {
      cursor: pointer;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-xs);
      margin-bottom: 8px;
      text-align: center;
    }
    .day-col-header .day-name {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--text-3);
    }
    .day-col-header .day-number {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-1);
      line-height: 1.2;
    }
    .day-col-header .today-pill {
      display: inline-block;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 1px 6px;
      border-radius: var(--r-full);
      background: var(--accent);
      color: #FFFFFF;
      margin-top: 2px;
    }
    .day-col-stats {
      margin-bottom: 10px;
    }
    .day-col-stats .stat-text {
      font-size: 10.5px;
      color: var(--text-4);
      display: block;
      margin-bottom: 4px;
      text-align: center;
    }
    .day-col-stats .mini-bar-wrap {
      height: 4px;
      background: var(--border-xs);
      border-radius: var(--r-full);
      overflow: hidden;
    }
    .day-col-stats .mini-bar {
      height: 100%;
      background: var(--accent);
      border-radius: var(--r-full);
    }

    .day-col-tasks {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      overflow-y: auto;
      max-height: 440px;
    }
    .day-empty {
      font-size: 11px;
      color: var(--text-4);
      text-align: center;
      padding: 16px 0;
    }

    .ci360-mini-task-card {
      background: var(--bg-app);
      border: 1px solid var(--border-xs);
      border-radius: var(--r-sm);
      padding: 6px 8px;
      display: flex;
      align-items: flex-start;
      gap: 6px;
      font-size: 12px;
      transition: all var(--t-fast);
    }
    .ci360-mini-task-card:hover {
      border-color: var(--border-md);
      background: var(--bg-card);
    }
    .ci360-mini-task-card.done {
      opacity: 0.6;
    }
    .ci360-mini-task-card.done .mini-title {
      text-decoration: line-through;
    }
    .mini-check {
      background: transparent;
      border: 1px solid var(--border-md);
      width: 16px;
      height: 16px;
      border-radius: 50%;
      font-size: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: transparent;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .mini-check.checked {
      background: var(--green-500);
      border-color: var(--green-500);
      color: #fff;
    }
    .mini-info {
      flex: 1;
      min-width: 0;
      cursor: pointer;
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
      background: #FFFFFF;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .filter-pill,
    html:not([data-theme="dark"]) .filter-pill {
      color: #64748B;
    }
    [data-theme="light"] .filter-pill:hover,
    html:not([data-theme="dark"]) .filter-pill:hover {
      background: #F1F5F9;
      color: #0F172A;
    }
    [data-theme="light"] .filter-pill.active,
    html:not([data-theme="dark"]) .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      border-color: #0070F3 !important;
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
  `,document.head.appendChild(s)}function Ma(s){return s!==null?{comment:s,variations:[]}:{variations:[]}}function za(s,a,e,g,x){const b={move:s,variations:x};return a&&(b.suffix=a),e&&(b.nag=e),g!==null&&(b.comment=g),b}function qa(...s){const[a,...e]=s;let g=a;for(const x of e)x!==null&&(g.variations=[x,...x.variations],x.variations=[],g=x);return a}function Ba(s,a){if(a.marker&&a.marker.comment){let e=a.root;for(;;){const g=e.variations[0];if(!g){e.comment=a.marker.comment;break}e=g}}return{headers:s,root:a.root,result:(a.marker&&a.marker.result)??void 0}}function Ra(s,a){function e(){this.constructor=s}e.prototype=a.prototype,s.prototype=new e}function Lt(s,a,e,g){var x=Error.call(this,s);return Object.setPrototypeOf&&Object.setPrototypeOf(x,Lt.prototype),x.expected=a,x.found=e,x.location=g,x.name="SyntaxError",x}Ra(Lt,Error);function oa(s,a,e){return e=e||" ",s.length>a?s:(a-=s.length,e+=e.repeat(a),s+e.slice(0,a))}Lt.prototype.format=function(s){var a="Error: "+this.message;if(this.location){var e=null,g;for(g=0;g<s.length;g++)if(s[g].source===this.location.source){e=s[g].text.split(/\r\n|\n|\r/g);break}var x=this.location.start,b=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(x):x,p=this.location.source+":"+b.line+":"+b.column;if(e){var o=this.location.end,R=oa("",b.line.toString().length," "),J=e[x.line-1],E=x.line===o.line?o.column:J.length+1,q=E-x.column||1;a+=`
 --> `+p+`
`+R+` |
`+b.line+" | "+J+`
`+R+" | "+oa("",x.column-1," ")+oa("",q,"^")}else a+=`
 at `+p}return a};Lt.buildMessage=function(s,a){var e={literal:function(J){return'"'+x(J.text)+'"'},class:function(J){var E=J.parts.map(function(q){return Array.isArray(q)?b(q[0])+"-"+b(q[1]):b(q)});return"["+(J.inverted?"^":"")+E.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(J){return J.description}};function g(J){return J.charCodeAt(0).toString(16).toUpperCase()}function x(J){return J.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(E){return"\\x0"+g(E)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(E){return"\\x"+g(E)})}function b(J){return J.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(E){return"\\x0"+g(E)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(E){return"\\x"+g(E)})}function p(J){return e[J.type](J)}function o(J){var E=J.map(p),q,W;if(E.sort(),E.length>0){for(q=1,W=1;q<E.length;q++)E[q-1]!==E[q]&&(E[W]=E[q],W++);E.length=W}switch(E.length){case 1:return E[0];case 2:return E[0]+" or "+E[1];default:return E.slice(0,-1).join(", ")+", or "+E[E.length-1]}}function R(J){return J?'"'+x(J)+'"':"end of input"}return"Expected "+o(s)+" but "+R(a)+" found."};function ja(s,a){a=a!==void 0?a:{};var e={},g=a.grammarSource,x={pgn:Ae},b=Ae,p="[",o='"',R="]",J=".",E="O-O-O",q="O-O",W="0-0-0",H="0-0",me="$",$e="{",Qe="}",nt=";",mt="(",Ft=")",lt="1-0",Le="0-1",dt="1/2-1/2",wt="*",Be=/^[a-zA-Z]/,vt=/^[^"]/,Re=/^[0-9]/,je=/^[.]/,de=/^[a-zA-Z1-8\-=]/,ct=/^[+#]/,we=/^[!?]/,ft=/^[^}]/,pt=/^[^\r\n]/,l=/^[ \t\r\n]/,i=Ce("tag pair"),r=be("[",!1),f=be('"',!1),h=be("]",!1),M=Ce("tag name"),j=Fe([["a","z"],["A","Z"]],!1,!1),C=Ce("tag value"),z=Fe(['"'],!0,!1),O=Ce("move number"),F=Fe([["0","9"]],!1,!1),U=be(".",!1),y=Fe(["."],!1,!1),T=Ce("standard algebraic notation"),X=be("O-O-O",!1),_=be("O-O",!1),L=be("0-0-0",!1),c=be("0-0",!1),n=Fe([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),t=Fe(["+","#"],!1,!1),k=Ce("suffix annotation"),A=Fe(["!","?"],!1,!1),P=Ce("NAG"),D=be("$",!1),Y=Ce("brace comment"),ee=be("{",!1),N=Fe(["}"],!0,!1),I=be("}",!1),Q=Ce("rest of line comment"),ne=be(";",!1),ae=Fe(["\r",`
`],!0,!1),pe=Ce("variation"),ge=be("(",!1),le=be(")",!1),xe=Ce("game termination marker"),We=be("1-0",!1),Z=be("0-1",!1),De=be("1/2-1/2",!1),Ne=be("*",!1),ue=Ce("whitespace"),Se=Fe([" ","	","\r",`
`],!1,!1),ye=function(w,d){return Ba(w,d)},Oe=function(w){return Object.fromEntries(w)},Ue=function(w,d){return[w,d]},ce=function(w,d){return{root:w,marker:d}},Me=function(w,d){return qa(Ma(w),...d.flat())},qe=function(w,d,m,K,te){return za(w,d,m,K,te)},Ee=function(w){return w},Ie=function(w){return w.replace(/[\r\n]+/g," ")},Pe=function(w){return w.trim()},S=function(w){return w},B=function(w,d){return{result:w,comment:d}},u=a.peg$currPos|0,oe=[{line:1,column:1}],ie=u,Te=a.peg$maxFailExpected||[],G=a.peg$silentFails|0,he;if(a.startRule){if(!(a.startRule in x))throw new Error(`Can't start parsing from rule "`+a.startRule+'".');b=x[a.startRule]}function be(w,d){return{type:"literal",text:w,ignoreCase:d}}function Fe(w,d,m){return{type:"class",parts:w,inverted:d,ignoreCase:m}}function gt(){return{type:"end"}}function Ce(w){return{type:"other",description:w}}function _e(w){var d=oe[w],m;if(d)return d;if(w>=oe.length)m=oe.length-1;else for(m=w;!oe[--m];);for(d=oe[m],d={line:d.line,column:d.column};m<w;)s.charCodeAt(m)===10?(d.line++,d.column=1):d.column++,m++;return oe[w]=d,d}function ke(w,d,m){var K=_e(w),te=_e(d),fe={source:g,start:{offset:w,line:K.line,column:K.column},end:{offset:d,line:te.line,column:te.column}};return fe}function V(w){u<ie||(u>ie&&(ie=u,Te=[]),Te.push(w))}function He(w,d,m){return new Lt(Lt.buildMessage(w,d),w,d,m)}function Ae(){var w,d,m;return w=u,d=Xe(),m=ea(),w=ye(d,m),w}function Xe(){var w,d,m;for(w=u,d=[],m=ht();m!==e;)d.push(m),m=ht();return m=et(),w=Oe(d),w}function ht(){var w,d,m,K,te,fe,rt;return G++,w=u,et(),s.charCodeAt(u)===91?(d=p,u++):(d=e,G===0&&V(r)),d!==e?(et(),m=Ut(),m!==e?(et(),s.charCodeAt(u)===34?(K=o,u++):(K=e,G===0&&V(f)),K!==e?(te=Ht(),s.charCodeAt(u)===34?(fe=o,u++):(fe=e,G===0&&V(f)),fe!==e?(et(),s.charCodeAt(u)===93?(rt=R,u++):(rt=e,G===0&&V(h)),rt!==e?w=Ue(m,te):(u=w,w=e)):(u=w,w=e)):(u=w,w=e)):(u=w,w=e)):(u=w,w=e),G--,w===e&&G===0&&V(i),w}function Ut(){var w,d,m;if(G++,w=u,d=[],m=s.charAt(u),Be.test(m)?u++:(m=e,G===0&&V(j)),m!==e)for(;m!==e;)d.push(m),m=s.charAt(u),Be.test(m)?u++:(m=e,G===0&&V(j));else d=e;return d!==e?w=s.substring(w,u):w=d,G--,w===e&&(d=e,G===0&&V(M)),w}function Ht(){var w,d,m;for(G++,w=u,d=[],m=s.charAt(u),vt.test(m)?u++:(m=e,G===0&&V(z));m!==e;)d.push(m),m=s.charAt(u),vt.test(m)?u++:(m=e,G===0&&V(z));return w=s.substring(w,u),G--,d=e,G===0&&V(C),w}function ea(){var w,d,m;return w=u,d=It(),et(),m=Pt(),m===e&&(m=null),et(),w=ce(d,m),w}function It(){var w,d,m,K;for(w=u,d=yt(),d===e&&(d=null),m=[],K=Mt();K!==e;)m.push(K),K=Mt();return w=Me(d,m),w}function Mt(){var w,d,m,K,te,fe,rt,bt;if(w=u,et(),Gt(),et(),d=ta(),d!==e){for(m=aa(),m===e&&(m=null),K=[],te=zt();te!==e;)K.push(te),te=zt();for(te=et(),fe=yt(),fe===e&&(fe=null),rt=[],bt=kt();bt!==e;)rt.push(bt),bt=kt();w=qe(d,m,K,fe,rt)}else u=w,w=e;return w}function Gt(){var w,d,m,K,te,fe;for(G++,w=u,d=[],m=s.charAt(u),Re.test(m)?u++:(m=e,G===0&&V(F));m!==e;)d.push(m),m=s.charAt(u),Re.test(m)?u++:(m=e,G===0&&V(F));if(s.charCodeAt(u)===46?(m=J,u++):(m=e,G===0&&V(U)),m!==e){for(K=et(),te=[],fe=s.charAt(u),je.test(fe)?u++:(fe=e,G===0&&V(y));fe!==e;)te.push(fe),fe=s.charAt(u),je.test(fe)?u++:(fe=e,G===0&&V(y));d=[d,m,K,te],w=d}else u=w,w=e;return G--,w===e&&(d=e,G===0&&V(O)),w}function ta(){var w,d,m,K,te,fe;if(G++,w=u,d=u,s.substr(u,5)===E?(m=E,u+=5):(m=e,G===0&&V(X)),m===e&&(s.substr(u,3)===q?(m=q,u+=3):(m=e,G===0&&V(_)),m===e&&(s.substr(u,5)===W?(m=W,u+=5):(m=e,G===0&&V(L)),m===e&&(s.substr(u,3)===H?(m=H,u+=3):(m=e,G===0&&V(c)),m===e))))if(m=u,K=s.charAt(u),Be.test(K)?u++:(K=e,G===0&&V(j)),K!==e){if(te=[],fe=s.charAt(u),de.test(fe)?u++:(fe=e,G===0&&V(n)),fe!==e)for(;fe!==e;)te.push(fe),fe=s.charAt(u),de.test(fe)?u++:(fe=e,G===0&&V(n));else te=e;te!==e?(K=[K,te],m=K):(u=m,m=e)}else u=m,m=e;return m!==e?(K=s.charAt(u),ct.test(K)?u++:(K=e,G===0&&V(t)),K===e&&(K=null),m=[m,K],d=m):(u=d,d=e),d!==e?w=s.substring(w,u):w=d,G--,w===e&&(d=e,G===0&&V(T)),w}function aa(){var w,d,m;for(G++,w=u,d=[],m=s.charAt(u),we.test(m)?u++:(m=e,G===0&&V(A));m!==e;)d.push(m),d.length>=2?m=e:(m=s.charAt(u),we.test(m)?u++:(m=e,G===0&&V(A)));return d.length<1?(u=w,w=e):w=d,G--,w===e&&(d=e,G===0&&V(k)),w}function zt(){var w,d,m,K,te;if(G++,w=u,et(),s.charCodeAt(u)===36?(d=me,u++):(d=e,G===0&&V(D)),d!==e){if(m=u,K=[],te=s.charAt(u),Re.test(te)?u++:(te=e,G===0&&V(F)),te!==e)for(;te!==e;)K.push(te),te=s.charAt(u),Re.test(te)?u++:(te=e,G===0&&V(F));else K=e;K!==e?m=s.substring(m,u):m=K,m!==e?w=Ee(m):(u=w,w=e)}else u=w,w=e;return G--,w===e&&G===0&&V(P),w}function yt(){var w;return w=ia(),w===e&&(w=ut()),w}function ia(){var w,d,m,K,te;if(G++,w=u,s.charCodeAt(u)===123?(d=$e,u++):(d=e,G===0&&V(ee)),d!==e){for(m=u,K=[],te=s.charAt(u),ft.test(te)?u++:(te=e,G===0&&V(N));te!==e;)K.push(te),te=s.charAt(u),ft.test(te)?u++:(te=e,G===0&&V(N));m=s.substring(m,u),s.charCodeAt(u)===125?(K=Qe,u++):(K=e,G===0&&V(I)),K!==e?w=Ie(m):(u=w,w=e)}else u=w,w=e;return G--,w===e&&(d=e,G===0&&V(Y)),w}function ut(){var w,d,m,K,te;if(G++,w=u,s.charCodeAt(u)===59?(d=nt,u++):(d=e,G===0&&V(ne)),d!==e){for(m=u,K=[],te=s.charAt(u),pt.test(te)?u++:(te=e,G===0&&V(ae));te!==e;)K.push(te),te=s.charAt(u),pt.test(te)?u++:(te=e,G===0&&V(ae));m=s.substring(m,u),w=Pe(m)}else u=w,w=e;return G--,w===e&&(d=e,G===0&&V(Q)),w}function kt(){var w,d,m,K;return G++,w=u,et(),s.charCodeAt(u)===40?(d=mt,u++):(d=e,G===0&&V(ge)),d!==e?(m=It(),m!==e?(et(),s.charCodeAt(u)===41?(K=Ft,u++):(K=e,G===0&&V(le)),K!==e?w=S(m):(u=w,w=e)):(u=w,w=e)):(u=w,w=e),G--,w===e&&G===0&&V(pe),w}function Pt(){var w,d,m;return G++,w=u,s.substr(u,3)===lt?(d=lt,u+=3):(d=e,G===0&&V(We)),d===e&&(s.substr(u,3)===Le?(d=Le,u+=3):(d=e,G===0&&V(Z)),d===e&&(s.substr(u,7)===dt?(d=dt,u+=7):(d=e,G===0&&V(De)),d===e&&(s.charCodeAt(u)===42?(d=wt,u++):(d=e,G===0&&V(Ne))))),d!==e?(et(),m=yt(),m===e&&(m=null),w=B(d,m)):(u=w,w=e),G--,w===e&&(d=e,G===0&&V(xe)),w}function et(){var w,d;for(G++,w=[],d=s.charAt(u),l.test(d)?u++:(d=e,G===0&&V(Se));d!==e;)w.push(d),d=s.charAt(u),l.test(d)?u++:(d=e,G===0&&V(Se));return G--,d=e,G===0&&V(ue),w}if(he=b(),a.peg$library)return{peg$result:he,peg$currPos:u,peg$FAILED:e,peg$maxFailExpected:Te,peg$maxFailPos:ie};if(he!==e&&u===s.length)return he;throw he!==e&&u<s.length&&V(gt()),He(Te,ie<s.length?s.charAt(ie):null,ie<s.length?ke(ie,ie+1):ke(ie,ie))}/**
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
 */const Qt=0xffffffffffffffffn;function ra(s,a){return(s<<a|s>>64n-a)&0xffffffffffffffffn}function va(s,a){return s*a&Qt}function Na(s){return function(){let a=BigInt(s&Qt),e=BigInt(s>>64n&Qt);const g=va(ra(va(a,5n),7n),9n);return e^=a,a=(ra(a,24n)^e^e<<16n)&Qt,e=ra(e,37n),s=e<<64n|a,g}}const Zt=Na(0xa187eb39cdcaed8f31c4b365b102e01en),Oa=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Zt()))),Ua=Array.from({length:8},()=>Zt()),Ha=Array.from({length:16},()=>Zt()),sa=Zt(),tt="w",st="b",Ve="p",ua="n",Xt="b",Nt="r",Ct="q",Ye="k",la="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Vt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(a,e){const{color:g,piece:x,from:b,to:p,flags:o,captured:R,promotion:J}=e,E=Je(b),q=Je(p);this.color=g,this.piece=x,this.from=E,this.to=q,this.san=a._moveToSan(e,a._moves({legal:!0})),this.lan=E+q,this.before=a.fen(),a._makeMove(e),this.after=a.fen(),a._undoMove(),this.flags="";for(const W in se)se[W]&o&&(this.flags+=At[W]);R&&(this.captured=R),J&&(this.promotion=J,this.lan+=J)}isCapture(){return this.flags.indexOf(At.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(At.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(At.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(At.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(At.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(At.BIG_PAWN)>-1}}const Ze=-1,At={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},se={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ba={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Ga={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Wa={...ba,...Ga},re={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},da={b:[16,32,17,15],w:[-16,-32,-17,-15]},ya={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ka=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Va=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ya={p:1,n:2,b:4,r:8,q:16,k:32},Ja="pnbrqkPNBRQK",ka=[ua,Xt,Nt,Ct],Qa=7,Xa=6,Za=1,ei=0,Yt={[Ye]:se.KSIDE_CASTLE,[Ct]:se.QSIDE_CASTLE},$t={w:[{square:re.a1,flag:se.QSIDE_CASTLE},{square:re.h1,flag:se.KSIDE_CASTLE}],b:[{square:re.a8,flag:se.QSIDE_CASTLE},{square:re.h8,flag:se.KSIDE_CASTLE}]},ti={b:Za,w:Xa},ca="--";function Tt(s){return s>>4}function Ot(s){return s&15}function Ca(s){return"0123456789".indexOf(s)!==-1}function Je(s){const a=Ot(s),e=Tt(s);return"abcdefgh".substring(a,a+1)+"87654321".substring(e,e+1)}function Rt(s){return s===tt?st:tt}function ai(s){const a=s.split(/\s+/);if(a.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(a[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const g=parseInt(a[4],10);if(isNaN(g)||g<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(a[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(a[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(a[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const x=a[0].split("/");if(x.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let p=0;p<x.length;p++){let o=0,R=!1;for(let J=0;J<x[p].length;J++)if(Ca(x[p][J])){if(R)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};o+=parseInt(x[p][J],10),R=!0}else{if(!/^[prnbqkPRNBQK]$/.test(x[p][J]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};o+=1,R=!1}if(o!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(a[3][1]=="3"&&a[1]=="w"||a[3][1]=="6"&&a[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const b=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:p,regex:o}of b){if(!o.test(a[0]))return{ok:!1,error:`Invalid FEN: missing ${p} king`};if((a[0].match(o)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${p} kings`}}return Array.from(x[0]+x[7]).some(p=>p.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function ii(s,a){const e=s.from,g=s.to,x=s.piece;let b=0,p=0,o=0;for(let R=0,J=a.length;R<J;R++){const E=a[R].from,q=a[R].to,W=a[R].piece;x===W&&e!==E&&g===q&&(b++,Tt(e)===Tt(E)&&p++,Ot(e)===Ot(E)&&o++)}return b>0?p>0&&o>0?Je(e):o>0?Je(e).charAt(1):Je(e).charAt(0):""}function St(s,a,e,g,x,b=void 0,p=se.NORMAL){const o=Tt(g);if(x===Ve&&(o===Qa||o===ei))for(let R=0;R<ka.length;R++){const J=ka[R];s.push({color:a,from:e,to:g,piece:x,captured:b,promotion:J,flags:p|se.PROMOTION})}else s.push({color:a,from:e,to:g,piece:x,captured:b,flags:p})}function wa(s){let a=s.charAt(0);return a>="a"&&a<="h"?s.match(/[a-h]\d.*[a-h]\d/)?void 0:Ve:(a=a.toLowerCase(),a==="o"?Ye:a)}function pa(s){return s.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class $a{_board=new Array(128);_turn=tt;_header={};_kings={w:Ze,b:Ze};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(a=la,{skipValidation:e=!1}={}){this.load(a,{skipValidation:e})}clear({preserveHeaders:a=!1}={}){this._board=new Array(128),this._kings={w:Ze,b:Ze},this._turn=tt,this._castling={w:0,b:0},this._epSquare=Ze,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=a?this._header:{...Wa},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(a,{skipValidation:e=!1,preserveHeaders:g=!1}={}){let x=a.split(/\s+/);if(x.length>=2&&x.length<6){const o=["-","-","0","1"];a=x.concat(o.slice(-(6-x.length))).join(" ")}if(x=a.split(/\s+/),!e){const{ok:o,error:R}=ai(a);if(!o)throw new Error(R)}const b=x[0];let p=0;this.clear({preserveHeaders:g});for(let o=0;o<b.length;o++){const R=b.charAt(o);if(R==="/")p+=8;else if(Ca(R))p+=parseInt(R,10);else{const J=R<"a"?tt:st;this._put({type:R.toLowerCase(),color:J},Je(p)),p++}}this._turn=x[1],x[2].indexOf("K")>-1&&(this._castling.w|=se.KSIDE_CASTLE),x[2].indexOf("Q")>-1&&(this._castling.w|=se.QSIDE_CASTLE),x[2].indexOf("k")>-1&&(this._castling.b|=se.KSIDE_CASTLE),x[2].indexOf("q")>-1&&(this._castling.b|=se.QSIDE_CASTLE),this._epSquare=x[3]==="-"?Ze:re[x[3]],this._halfMoves=parseInt(x[4],10),this._moveNumber=parseInt(x[5],10),this._hash=this._computeHash(),this._updateSetup(a),this._incPositionCount()}fen({forceEnpassantSquare:a=!1}={}){let e=0,g="";for(let p=re.a8;p<=re.h1;p++){if(this._board[p]){e>0&&(g+=e,e=0);const{color:o,type:R}=this._board[p];g+=o===tt?R.toUpperCase():R.toLowerCase()}else e++;p+1&136&&(e>0&&(g+=e),p!==re.h1&&(g+="/"),e=0,p+=8)}let x="";this._castling[tt]&se.KSIDE_CASTLE&&(x+="K"),this._castling[tt]&se.QSIDE_CASTLE&&(x+="Q"),this._castling[st]&se.KSIDE_CASTLE&&(x+="k"),this._castling[st]&se.QSIDE_CASTLE&&(x+="q"),x=x||"-";let b="-";if(this._epSquare!==Ze)if(a)b=Je(this._epSquare);else{const p=this._epSquare+(this._turn===tt?16:-16),o=[p+1,p-1];for(const R of o){if(R&136)continue;const J=this._turn;if(this._board[R]?.color===J&&this._board[R]?.type===Ve){this._makeMove({color:J,from:R,to:this._epSquare,piece:Ve,captured:Ve,flags:se.EP_CAPTURE});const E=!this._isKingAttacked(J);if(this._undoMove(),E){b=Je(this._epSquare);break}}}}return[g,this._turn,x,b,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(a){if(!this._board[a])return 0n;const{color:e,type:g}=this._board[a],x={w:0,b:1}[e],b={p:0,n:1,b:2,r:3,q:4,k:5}[g];return Oa[x][b][a]}_epKey(){return this._epSquare===Ze?0n:Ua[this._epSquare&7]}_castlingKey(){const a=this._castling.w>>5|this._castling.b>>3;return Ha[a]}_computeHash(){let a=0n;for(let e=re.a8;e<=re.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(a^=this._pieceKey(e))}return a^=this._epKey(),a^=this._castlingKey(),this._turn==="b"&&(a^=sa),a}_updateSetup(a){this._history.length>0||(a!==la?(this._header.SetUp="1",this._header.FEN=a):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(la)}get(a){return this._board[re[a]]}findPiece(a){const e=[];for(let g=re.a8;g<=re.h1;g++){if(g&136){g+=7;continue}!this._board[g]||this._board[g]?.color!==a.color||this._board[g].color===a.color&&this._board[g].type===a.type&&e.push(Je(g))}return e}put({type:a,color:e},g){return this._put({type:a,color:e},g)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(a,e){this._hash^=this._pieceKey(a),this._board[a]=e,this._hash^=this._pieceKey(a)}_put({type:a,color:e},g){if(Ja.indexOf(a.toLowerCase())===-1||!(g in re))return!1;const x=re[g];if(a==Ye&&!(this._kings[e]==Ze||this._kings[e]==x))return!1;const b=this._board[x];return b&&b.type===Ye&&(this._kings[b.color]=Ze),this._set(x,{type:a,color:e}),a===Ye&&(this._kings[e]=x),!0}_clear(a){this._hash^=this._pieceKey(a),delete this._board[a]}remove(a){const e=this.get(a);return this._clear(re[a]),e&&e.type===Ye&&(this._kings[e.color]=Ze),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const a=this._board[re.e1]?.type===Ye&&this._board[re.e1]?.color===tt,e=this._board[re.e8]?.type===Ye&&this._board[re.e8]?.color===st;(!a||this._board[re.a1]?.type!==Nt||this._board[re.a1]?.color!==tt)&&(this._castling.w&=-65),(!a||this._board[re.h1]?.type!==Nt||this._board[re.h1]?.color!==tt)&&(this._castling.w&=-33),(!e||this._board[re.a8]?.type!==Nt||this._board[re.a8]?.color!==st)&&(this._castling.b&=-65),(!e||this._board[re.h8]?.type!==Nt||this._board[re.h8]?.color!==st)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Ze)return;const a=this._epSquare+(this._turn===tt?-16:16),e=this._epSquare+(this._turn===tt?16:-16),g=[e+1,e-1];if(this._board[a]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==Rt(this._turn)||this._board[e]?.type!==Ve){this._hash^=this._epKey(),this._epSquare=Ze;return}const x=b=>!(b&136)&&this._board[b]?.color===this._turn&&this._board[b]?.type===Ve;g.some(x)||(this._hash^=this._epKey(),this._epSquare=Ze)}_attacked(a,e,g){const x=[];for(let b=re.a8;b<=re.h1;b++){if(b&136){b+=7;continue}if(this._board[b]===void 0||this._board[b].color!==a)continue;const p=this._board[b],o=b-e;if(o===0)continue;const R=o+119;if(Ka[R]&Ya[p.type]){if(p.type===Ve){if(o>0&&p.color===tt||o<=0&&p.color===st)if(g)x.push(Je(b));else return!0;continue}if(p.type==="n"||p.type==="k")if(g){x.push(Je(b));continue}else return!0;const J=Va[R];let E=b+J,q=!1;for(;E!==e;){if(this._board[E]!=null){q=!0;break}E+=J}if(!q)if(g){x.push(Je(b));continue}else return!0}}return g?x:!1}attackers(a,e){return e?this._attacked(e,re[a],!0):this._attacked(this._turn,re[a],!0)}_isKingAttacked(a){const e=this._kings[a];return e===-1?!1:this._attacked(Rt(a),e)}hash(){return this._hash.toString(16)}isAttacked(a,e){return this._attacked(e,re[a])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const a={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let g=0,x=0;for(let b=re.a8;b<=re.h1;b++){if(x=(x+1)%2,b&136){b+=7;continue}const p=this._board[b];p&&(a[p.type]=p.type in a?a[p.type]+1:1,p.type===Xt&&e.push(x),g++)}if(g===2)return!0;if(g===3&&(a[Xt]===1||a[ua]===1))return!0;if(g===a[Xt]+2){let b=0;const p=e.length;for(let o=0;o<p;o++)b+=e[o];if(b===0||b===p)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:a=!1,square:e=void 0,piece:g=void 0}={}){const x=this._moves({square:e,piece:g});return a?x.map(b=>new Vt(this,b)):x.map(b=>this._moveToSan(b,x))}_moves({legal:a=!0,piece:e=void 0,square:g=void 0}={}){const x=g?g.toLowerCase():void 0,b=e?.toLowerCase(),p=[],o=this._turn,R=Rt(o);let J=re.a8,E=re.h1,q=!1;if(x)if(x in re)J=E=re[x],q=!0;else return[];for(let H=J;H<=E;H++){if(H&136){H+=7;continue}if(!this._board[H]||this._board[H].color===R)continue;const{type:me}=this._board[H];let $e;if(me===Ve){if(b&&b!==me)continue;$e=H+da[o][0],this._board[$e]||(St(p,o,H,$e,Ve),$e=H+da[o][1],ti[o]===Tt(H)&&!this._board[$e]&&St(p,o,H,$e,Ve,void 0,se.BIG_PAWN));for(let Qe=2;Qe<4;Qe++)$e=H+da[o][Qe],!($e&136)&&(this._board[$e]?.color===R?St(p,o,H,$e,Ve,this._board[$e].type,se.CAPTURE):$e===this._epSquare&&St(p,o,H,$e,Ve,Ve,se.EP_CAPTURE))}else{if(b&&b!==me)continue;for(let Qe=0,nt=ya[me].length;Qe<nt;Qe++){const mt=ya[me][Qe];for($e=H;$e+=mt,!($e&136);){if(!this._board[$e])St(p,o,H,$e,me);else{if(this._board[$e].color===o)break;St(p,o,H,$e,me,this._board[$e].type,se.CAPTURE);break}if(me===ua||me===Ye)break}}}}if((b===void 0||b===Ye)&&(!q||E===this._kings[o])){if(this._castling[o]&se.KSIDE_CASTLE){const H=this._kings[o],me=H+2;!this._board[H+1]&&!this._board[me]&&!this._attacked(R,this._kings[o])&&!this._attacked(R,H+1)&&!this._attacked(R,me)&&St(p,o,this._kings[o],me,Ye,void 0,se.KSIDE_CASTLE)}if(this._castling[o]&se.QSIDE_CASTLE){const H=this._kings[o],me=H-2;!this._board[H-1]&&!this._board[H-2]&&!this._board[H-3]&&!this._attacked(R,this._kings[o])&&!this._attacked(R,H-1)&&!this._attacked(R,me)&&St(p,o,this._kings[o],me,Ye,void 0,se.QSIDE_CASTLE)}}if(!a||this._kings[o]===-1)return p;const W=[];for(let H=0,me=p.length;H<me;H++)this._makeMove(p[H]),this._isKingAttacked(o)||W.push(p[H]),this._undoMove();return W}move(a,{strict:e=!1}={}){let g=null;if(typeof a=="string")g=this._moveFromSan(a,e);else if(a===null)g=this._moveFromSan(ca,e);else if(typeof a=="object"){const b=this._moves();for(let p=0,o=b.length;p<o;p++)if(a.from===Je(b[p].from)&&a.to===Je(b[p].to)&&(!("promotion"in b[p])||a.promotion===b[p].promotion)){g=b[p];break}}if(!g)throw typeof a=="string"?new Error(`Invalid move: ${a}`):new Error(`Invalid move: ${JSON.stringify(a)}`);if(this.isCheck()&&g.flags&se.NULL_MOVE)throw new Error("Null move not allowed when in check");const x=new Vt(this,g);return this._makeMove(g),this._incPositionCount(),x}_push(a){this._history.push({move:a,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(a,e){this._hash^=this._pieceKey(a),this._board[e]=this._board[a],delete this._board[a],this._hash^=this._pieceKey(e)}_makeMove(a){const e=this._turn,g=Rt(e);if(this._push(a),a.flags&se.NULL_MOVE){e===st&&this._moveNumber++,this._halfMoves++,this._turn=g,this._epSquare=Ze;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),a.captured&&(this._hash^=this._pieceKey(a.to)),this._movePiece(a.from,a.to),a.flags&se.EP_CAPTURE&&(this._turn===st?this._clear(a.to-16):this._clear(a.to+16)),a.promotion&&(this._clear(a.to),this._set(a.to,{type:a.promotion,color:e})),this._board[a.to].type===Ye){if(this._kings[e]=a.to,a.flags&se.KSIDE_CASTLE){const x=a.to-1,b=a.to+1;this._movePiece(b,x)}else if(a.flags&se.QSIDE_CASTLE){const x=a.to+1,b=a.to-2;this._movePiece(b,x)}this._castling[e]=0}if(this._castling[e]){for(let x=0,b=$t[e].length;x<b;x++)if(a.from===$t[e][x].square&&this._castling[e]&$t[e][x].flag){this._castling[e]^=$t[e][x].flag;break}}if(this._castling[g]){for(let x=0,b=$t[g].length;x<b;x++)if(a.to===$t[g][x].square&&this._castling[g]&$t[g][x].flag){this._castling[g]^=$t[g][x].flag;break}}if(this._hash^=this._castlingKey(),a.flags&se.BIG_PAWN){let x;e===st?x=a.to-16:x=a.to+16,!(a.to-1&136)&&this._board[a.to-1]?.type===Ve&&this._board[a.to-1]?.color===g||!(a.to+1&136)&&this._board[a.to+1]?.type===Ve&&this._board[a.to+1]?.color===g?(this._epSquare=x,this._hash^=this._epKey()):this._epSquare=Ze}else this._epSquare=Ze;a.piece===Ve?this._halfMoves=0:a.flags&(se.CAPTURE|se.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===st&&this._moveNumber++,this._turn=g,this._hash^=sa}undo(){const a=this._hash,e=this._undoMove();if(e){const g=new Vt(this,e);return this._decPositionCount(a),g}return null}_undoMove(){const a=this._history.pop();if(a===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=a.move;this._kings=a.kings,this._turn=a.turn,this._castling=a.castling,this._epSquare=a.epSquare,this._halfMoves=a.halfMoves,this._moveNumber=a.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=sa;const g=this._turn,x=Rt(g);if(e.flags&se.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:g})),e.captured)if(e.flags&se.EP_CAPTURE){let b;g===st?b=e.to-16:b=e.to+16,this._set(b,{type:Ve,color:x})}else this._set(e.to,{type:e.captured,color:x});if(e.flags&(se.KSIDE_CASTLE|se.QSIDE_CASTLE)){let b,p;e.flags&se.KSIDE_CASTLE?(b=e.to+1,p=e.to-1):(b=e.to-2,p=e.to+1),this._movePiece(p,b)}return e}pgn({newline:a=`
`,maxWidth:e=0}={}){const g=[];let x=!1;for(const W in this._header)this._header[W]&&g.push(`[${W} "${this._header[W]}"]`+a),x=!0;x&&this._history.length&&g.push(a);const b=W=>{const H=this._comments[this.fen()];if(typeof H<"u"){const me=W.length>0?" ":"";W=`${W}${me}{${H}}`}return W},p=[];for(;this._history.length>0;)p.push(this._undoMove());const o=[];let R="";for(p.length===0&&o.push(b(""));p.length>0;){R=b(R);const W=p.pop();if(!W)break;if(!this._history.length&&W.color==="b"){const H=`${this._moveNumber}. ...`;R=R?`${R} ${H}`:H}else W.color==="w"&&(R.length&&o.push(R),R=this._moveNumber+".");R=R+" "+this._moveToSan(W,this._moves({legal:!0})),this._makeMove(W)}if(R.length&&o.push(b(R)),o.push(this._header.Result||"*"),e===0)return g.join("")+o.join(" ");const J=function(){return g.length>0&&g[g.length-1]===" "?(g.pop(),!0):!1},E=function(W,H){for(const me of H.split(" "))if(me){if(W+me.length>e){for(;J();)W--;g.push(a),W=0}g.push(me),W+=me.length,g.push(" "),W++}return J()&&W--,W};let q=0;for(let W=0;W<o.length;W++){if(q+o[W].length>e&&o[W].includes("{")){q=E(q,o[W]);continue}q+o[W].length>e&&W!==0?(g[g.length-1]===" "&&g.pop(),g.push(a),q=0):W!==0&&(g.push(" "),q++),g.push(o[W]),q+=o[W].length}return g.join("")}header(...a){for(let e=0;e<a.length;e+=2)typeof a[e]=="string"&&typeof a[e+1]=="string"&&(this._header[a[e]]=a[e+1]);return this._header}setHeader(a,e){return this._header[a]=e??ba[a]??null,this.getHeaders()}removeHeader(a){return a in this._header?(this._header[a]=ba[a]||null,!0):!1}getHeaders(){const a={};for(const[e,g]of Object.entries(this._header))g!==null&&(a[e]=g);return a}loadPgn(a,{strict:e=!1,newlineChar:g=`\r?
`}={}){g!==`\r?
`&&(a=a.replace(new RegExp(g,"g"),`
`));const x=ja(a);this.reset();const b=x.headers;let p="";for(const J in b)J.toLowerCase()==="fen"&&(p=b[J]),this.header(J,b[J]);if(!e)p&&this.load(p,{preserveHeaders:!0});else if(b.SetUp==="1"){if(!("FEN"in b))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(b.FEN,{preserveHeaders:!0})}let o=x.root;for(;o;){if(o.move){const J=this._moveFromSan(o.move,e);if(J==null)throw new Error(`Invalid move in PGN: ${o.move}`);this._makeMove(J),this._incPositionCount()}o.comment!==void 0&&(this._comments[this.fen()]=o.comment),o=o.variations[0]}const R=x.result;R&&Object.keys(this._header).length&&this._header.Result!==R&&this.setHeader("Result",R)}_moveToSan(a,e){let g="";if(a.flags&se.KSIDE_CASTLE)g="O-O";else if(a.flags&se.QSIDE_CASTLE)g="O-O-O";else{if(a.flags&se.NULL_MOVE)return ca;if(a.piece!==Ve){const x=ii(a,e);g+=a.piece.toUpperCase()+x}a.flags&(se.CAPTURE|se.EP_CAPTURE)&&(a.piece===Ve&&(g+=Je(a.from)[0]),g+="x"),g+=Je(a.to),a.promotion&&(g+="="+a.promotion.toUpperCase())}return this._makeMove(a),this.isCheck()&&(this.isCheckmate()?g+="#":g+="+"),this._undoMove(),g}_moveFromSan(a,e=!1){let g=pa(a);if(e||(g==="0-0"?g="O-O":g==="0-0-0"&&(g="O-O-O")),g==ca)return{color:this._turn,from:0,to:0,piece:"k",flags:se.NULL_MOVE};let x=wa(g),b=this._moves({legal:!0,piece:x});for(let W=0,H=b.length;W<H;W++)if(g===pa(this._moveToSan(b[W],b)))return b[W];if(e)return null;let p,o,R,J,E,q=!1;if(o=g.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),o?(p=o[1],R=o[2],J=o[3],E=o[4],R.length==1&&(q=!0)):(o=g.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),o&&(p=o[1],R=o[2],J=o[3],E=o[4],R.length==1&&(q=!0))),x=wa(g),b=this._moves({legal:!0,piece:p||x}),!J)return null;for(let W=0,H=b.length;W<H;W++)if(R){if((!p||p.toLowerCase()==b[W].piece)&&re[R]==b[W].from&&re[J]==b[W].to&&(!E||E.toLowerCase()==b[W].promotion))return b[W];if(q){const me=Je(b[W].from);if((!p||p.toLowerCase()==b[W].piece)&&re[J]==b[W].to&&(R==me[0]||R==me[1])&&(!E||E.toLowerCase()==b[W].promotion))return b[W]}}else if(g===pa(this._moveToSan(b[W],b)).replace("x",""))return b[W];return null}ascii(){let a=`   +------------------------+
`;for(let e=re.a8;e<=re.h1;e++){if(Ot(e)===0&&(a+=" "+"87654321"[Tt(e)]+" |"),this._board[e]){const g=this._board[e].type,b=this._board[e].color===tt?g.toUpperCase():g.toLowerCase();a+=" "+b+" "}else a+=" . ";e+1&136&&(a+=`|
`,e+=8)}return a+=`   +------------------------+
`,a+="     a  b  c  d  e  f  g  h",a}perft(a){const e=this._moves({legal:!1});let g=0;const x=this._turn;for(let b=0,p=e.length;b<p;b++)this._makeMove(e[b]),this._isKingAttacked(x)||(a-1>0?g+=this.perft(a-1):g++),this._undoMove();return g}setTurn(a){return this._turn==a?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const a=[];let e=[];for(let g=re.a8;g<=re.h1;g++)this._board[g]==null?e.push(null):e.push({square:Je(g),type:this._board[g].type,color:this._board[g].color}),g+1&136&&(a.push(e),e=[],g+=8);return a}squareColor(a){if(a in re){const e=re[a];return(Tt(e)+Ot(e))%2===0?"light":"dark"}return null}history({verbose:a=!1}={}){const e=[],g=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const x=e.pop();if(!x)break;a?g.push(new Vt(this,x)):g.push(this._moveToSan(x,this._moves())),this._makeMove(x)}return g}_getPositionCount(a){return this._positionCount.get(a)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(a){const e=this._positionCount.get(a)??0;e===1?this._positionCount.delete(a):this._positionCount.set(a,e-1)}_pruneComments(){const a=[],e={},g=x=>{x in this._comments&&(e[x]=this._comments[x])};for(;this._history.length>0;)a.push(this._undoMove());for(g(this.fen());;){const x=a.pop();if(!x)break;this._makeMove(x),g(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(a){this._comments[this.fen()]=a.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const a=this._comments[this.fen()];return delete this._comments[this.fen()],a}getComments(){return this._pruneComments(),Object.keys(this._comments).map(a=>({fen:a,comment:this._comments[a]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(a=>{const e=this._comments[a];return delete this._comments[a],{fen:a,comment:e}})}setCastlingRights(a,e){for(const x of[Ye,Ct])e[x]!==void 0&&(e[x]?this._castling[a]|=Yt[x]:this._castling[a]&=~Yt[x]);this._updateCastlingRights();const g=this.getCastlingRights(a);return(e[Ye]===void 0||e[Ye]===g[Ye])&&(e[Ct]===void 0||e[Ct]===g[Ct])}getCastlingRights(a){return{[Ye]:(this._castling[a]&Yt[Ye])!==0,[Ct]:(this._castling[a]&Yt[Ct])!==0}}moveNumber(){return this._moveNumber}}async function si(s,a={}){const e=a.currentUser||{},g=a.userRole||e?.role||"employee";let x="chat",b=[],p=null,o=[],R=[],J=null,E=null,q=!1,W=null,H=null;s.innerHTML=`
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
  `,ni(),await lt(),Re();const me=s.querySelector("#tab-nav-chat"),$e=s.querySelector("#tab-nav-lounge"),Qe=s.querySelector("#bonding-chat-main-wrap"),nt=s.querySelector("#bonding-lounge-main-wrap");me?.addEventListener("click",async()=>{x="chat",me.classList.add("active"),$e.classList.remove("active"),Qe.style.display="grid",nt.style.display="none",Re(),p&&await Le(p._id)}),$e?.addEventListener("click",async()=>{x="lounge_games",$e.classList.add("active"),me.classList.remove("active"),Qe.style.display="none",nt.style.display="block",await h()}),s.querySelector("#btn-top-new-chat")?.addEventListener("click",y),s.querySelector("#btn-top-new-group")?.addEventListener("click",T),s.querySelector("#btn-top-challenge")?.addEventListener("click",()=>j());const mt=s.querySelector("#bonding-search-input");mt&&mt.addEventListener("input",c=>{const n=c.target.value.toLowerCase().trim();s.querySelectorAll(".bonding-channel-item").forEach(k=>{const A=k.textContent.toLowerCase();k.style.display=A.includes(n)?"flex":"none"})}),wt(),new MutationObserver((c,n)=>{document.body.contains(s)||(E&&clearInterval(E),H&&clearInterval(H),n.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function lt(){try{const[c,n]=await Promise.all([ze("/bonding/channels").catch(()=>[]),ze("/bonding/colleagues").catch(()=>[])]);if(b=c,o=n,b.length>0){const t=localStorage.getItem("ci360_bonding_active_channel");t&&b.some(k=>k._id===t)?p=b.find(k=>k._id===t):p||(p=b.find(k=>k.name.includes("Lounge"))||b[0])}Be(),p&&await Le(p._id)}catch(c){console.error("Failed to load bonding data",c)}}async function Le(c,n=!1){if(c)try{localStorage.setItem("ci360_bonding_active_channel",c),R=await ze(`/bonding/channels/${c}/messages`),n?r():f()}catch(t){console.error("Failed to load messages",t)}}let dt=0;function wt(){E&&clearInterval(E),E=setInterval(async()=>{try{if(!document.body.contains(s)){clearInterval(E);return}if(dt++,dt%2===0){const c=await ze("/bonding/channels").catch(()=>null);c&&JSON.stringify(c.map(n=>n._id+n.lastMessage?.sentAt))!==JSON.stringify(b.map(n=>n._id+n.lastMessage?.sentAt))&&(b=c,Be())}x==="chat"&&p?await Le(p._id,!0):x==="lounge_games"&&await h(!0)}catch{}},3e3)}function Be(){const c=s.querySelector("#bonding-group-list"),n=s.querySelector("#bonding-direct-list");if(!c||!n)return;const t=b.filter(A=>A.type==="group"),k=b.filter(A=>A.type==="direct");if(t.length===0)c.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const A=e?._id||e?.id,P=g==="superadmin"||e?.role==="superadmin";c.innerHTML=t.map(D=>{const Y=p&&p._id===D._id,N=D.createdBy&&D.createdBy.userId&&String(D.createdBy.userId)===String(A)||P;return`
          <div class="bonding-channel-item ${Y?"active":""}" data-channel-id="${D._id}">
            <div class="bonding-channel-icon">${D.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(D.name)}</div>
              <div class="bonding-channel-preview">${v(D.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${N?`
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
        `}).join("")}k.length===0?n.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':n.innerHTML=k.map(A=>{const P=p&&p._id===A._id,D=A.displayName||A.name||"Colleague",Y=D.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${P?"active":""}" data-channel-id="${A._id}">
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
        `}).join(""),vt()}function vt(){const c=s.querySelectorAll(".bonding-channel-item");c.forEach(n=>{n.onclick=async t=>{if(t.target.closest(".bonding-channel-del-btn")||t.target.closest(".bonding-channel-leave-btn"))return;const k=n.dataset.channelId,A=b.find(P=>P._id===k);A&&(p=A,c.forEach(P=>P.classList.remove("active")),n.classList.add("active"),Re(),await Le(A._id))}}),s.querySelectorAll(".bonding-channel-leave-btn").forEach(n=>{n.onclick=async t=>{t.stopPropagation();const k=n.dataset.channelId,P=b.find(D=>D._id===k)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${P}"?`))try{n.disabled=!0,await ve(`/bonding/channels/${k}/leave`,{}),$(`You left "${P}"`,"info"),b=b.filter(D=>D._id!==k),p&&p._id===k&&(p=b.find(D=>D.type==="group")||b[0]||null,Re(),p&&await Le(p._id)),Be()}catch(D){$(D.message||"Failed to leave group","error"),n.disabled=!1}}}),s.querySelectorAll(".bonding-channel-del-btn").forEach(n=>{n.onclick=async t=>{t.stopPropagation();const k=n.dataset.channelId,A=b.find(Y=>Y._id===k),P=A&&A.type==="direct",D=P?"this 1-on-1 chat":`the group "${A?.name||""}"`;if(confirm(`Are you sure you want to delete ${D}? All messages will be permanently removed.`))try{n.disabled=!0,await it(`/bonding/channels/${k}`),$(P?"1-on-1 chat deleted":"Group deleted","success"),b=b.filter(Y=>Y._id!==k),p&&p._id===k&&(p=b[0]||null,Re(),p&&await Le(p._id)),Be()}catch(Y){$(Y.message||"Failed to delete conversation","error"),n.disabled=!1}}}),s.querySelector("#btn-create-group")?.addEventListener("click",T),s.querySelector("#btn-new-direct-chat")?.addEventListener("click",y)}function Re(){const c=s.querySelector("#bonding-chat-panel");if(!c)return;if(!p){c.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const n=v(p.displayName||p.name),t=(p.members||[]).length,k=p.type==="group",A=e?._id||e?.id,P=k?null:(p.members||[]).find(N=>N.userId?.toString()!==A?.toString()),D=p.createdBy&&p.createdBy.userId&&String(p.createdBy.userId)===String(A),Y=g==="superadmin"||e?.role==="superadmin",ee=D||Y;c.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${k?p.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${n}</div>
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
    `,ct(P),we(P),ft(),i()}function je(){if(!R||R.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const c=e?._id||e?.id;return R.map(n=>{const t=n.sender&&n.sender.userId&&c&&n.sender.userId.toString()===c.toString();if(n.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${n._id}">
            <span>ℹ️</span> <span>${v(n.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${n._id}" title="Delete Message">&times;</button>
          </div>
        `;if(n.type==="challenge"&&n.challengeData){const D=n.challengeData,Y=D.gameTitle||"Game Challenge",ee=D.gameType||"dotsboxes",N=ee==="dotsboxes"?"⏹️":ee==="ludo"?"🎲":ee==="chess"?"♟️":"❌",I=D.gameState?.invitationId,Q=D.targetUserId?.toString(),ne=n.sender?.userId?.toString(),ae=c&&Q===c.toString(),pe=c&&ne===c.toString();return`
          <div class="bonding-msg-row ${t?"self":"other"}" data-msg-id="${n._id}">
            <div class="bonding-msg-avatar" title="${v(n.sender?.name||"Teammate")}">
              ${(n.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${v(n.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${L(n.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${n._id}" title="Delete Challenge Message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${N}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${v(Y)}</h4>
                    <p class="game-bubble-desc">${v(n.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${D.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':D.status==="active"||D.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':D.status==="declined"?'<span class="badge red">❌ Challenge Declined</span>':D.status==="cancelled"?'<span class="badge gray">🚫 Challenge Cancelled</span>':`<span class="badge gray">${v(D.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${D.status==="pending"&&ae?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${I}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${I}" data-action="decline">
                        Decline
                      </button>
                    `:D.status==="pending"&&pe?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${I}" data-action="cancel">
                          Cancel
                        </button>
                      `:D.status==="declined"||D.status==="cancelled"?`
                        <div class="game-pending-text" style="font-size:11.5px;color:var(--text-3);font-style:italic;">
                          ${D.status==="declined"?"Challenge was declined":"Challenge was cancelled"}
                        </div>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-match-id="${D.gameState?.matchId||""}" data-invite-id="${I||""}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${de(n)}
            </div>
          </div>
        `}const k=v(n.sender?.name||"Teammate"),A=L(n.createdAt),P=de(n);return`
        <div class="bonding-msg-row ${t?"self":"other"}" data-msg-id="${n._id}">
          <div class="bonding-msg-avatar" title="${k}">${k.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${k}</span>
              <span class="bonding-msg-time">${A}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${n._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${v(n.content).replace(/\n/g,"<br/>")}
            </div>
            ${P}
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
    `}function ct(c){const n=s.querySelector("#btn-chat-challenge");n&&(n.onclick=()=>{c?j(null,c.userId||c._id):j()});const t=s.querySelector("#btn-manage-members");t&&(t.onclick=O);const k=s.querySelector("#btn-delete-group");k&&(k.onclick=U);const A=s.querySelector("#btn-leave-group");A&&(A.onclick=F);const P=s.querySelector("#btn-delete-direct");P&&(P.onclick=async()=>{if(p&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{P.disabled=!0,await it(`/bonding/channels/${p._id}`),$("1-on-1 chat deleted successfully","success");const Y=p._id;b=b.filter(ee=>ee._id!==Y),p=b[0]||null,Be(),Re(),p&&await Le(p._id)}catch(Y){$(Y.message||"Could not delete 1-on-1 chat","error"),P.disabled=!1}});const D=s.querySelector("#btn-clear-chat");D&&(D.onclick=async()=>{if(p&&confirm("Are you sure you want to clear all messages in this conversation?"))try{D.disabled=!0,await it(`/bonding/channels/${p._id}/messages`),$("Chat messages cleared","success"),R=[],f()}catch(Y){$(Y.message||"Could not clear chat messages","error")}finally{D.disabled=!1}})}function we(c){const n=s.querySelector("#bonding-message-input"),t=s.querySelector("#btn-send-message"),k=s.querySelector("#btn-quick-emoji"),A=s.querySelector("#btn-input-challenge");n&&n.addEventListener("keydown",P=>{P.key==="Enter"&&!P.shiftKey&&(P.preventDefault(),pt())}),t&&(t.onclick=pt),A&&(A.onclick=()=>{c?j(null,c.userId||c._id):j()}),k&&(k.onclick=P=>{P.stopPropagation(),n&&X(k,D=>{const Y=n.selectionStart??n.value.length,ee=n.selectionEnd??n.value.length,N=n.value;n.value=N.substring(0,Y)+D+N.substring(ee),n.focus();const I=Y+D.length;try{n.setSelectionRange(I,I)}catch{}})})}function ft(){s.querySelectorAll(".btn-respond-invite").forEach(k=>{k.onclick=async()=>{const A=k.dataset.inviteId,P=k.dataset.action;await C(A,P)}}),s.querySelectorAll(".btn-launch-match-from-card").forEach(k=>{k.onclick=async()=>{const A=k.dataset.matchId,P=k.dataset.inviteId;if(A){z(A);return}try{k.disabled=!0;const D=await ze("/bonding/invitations"),ee=(D.incoming||[]).concat(D.sent||[]).find(Q=>Q._id===P||Q.matchId&&Q.matchId.toString()===P);if(ee&&ee.matchId){z(ee.matchId);return}const I=(await ze("/bonding/matches").catch(()=>[])||[]).find(Q=>Q.invitationId===P||Q._id===P);if(I){z(I._id);return}$("Match has not started yet or has finished","warning")}catch(D){$(D.message||"Could not load match","error")}finally{k.disabled=!1}}}),s.querySelectorAll(".bonding-msg-del-btn").forEach(k=>{k.onclick=async A=>{A.stopPropagation();const P=k.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{k.disabled=!0,await it(`/bonding/messages/${P}`),R=R.filter(D=>D._id!==P),r(),$("Message deleted","success")}catch(D){$(D.message||"Failed to delete message","error"),k.disabled=!1}}}),s.querySelectorAll(".bonding-rxn-tag").forEach(k=>{k.onclick=async()=>{const A=k.dataset.msgId,P=k.dataset.emoji;await l(A,P)}}),s.querySelectorAll(".bonding-add-rxn-btn").forEach(k=>{k.onclick=A=>{const P=k.dataset.msgId;_(A.currentTarget,async D=>{await l(P,D)})}})}async function pt(){const c=s.querySelector("#bonding-message-input");if(!c||!p||q)return;const n=c.value.trim();if(n)try{q=!0,c.value="";const t=await ve(`/bonding/channels/${p._id}/messages`,{content:n,type:"text"});R.push(t),f(),i()}catch(t){$(t.message||"Failed to send message","error")}finally{q=!1,c.focus()}}async function l(c,n){try{const t=await ve(`/bonding/messages/${c}/react`,{emoji:n}),k=R.find(A=>A._id===c);k&&(k.reactions=t,r())}catch(t){$(t.message||"Failed to react","error")}}function i(){const c=s.querySelector("#bonding-messages-feed");c&&(c.scrollTop=c.scrollHeight)}function r(){const c=s.querySelector("#bonding-messages-feed");if(!c)return;const n=c.scrollHeight-c.scrollTop<=c.clientHeight+80;c.innerHTML=je(),ft(),n&&i()}function f(){const c=s.querySelector("#bonding-messages-feed");c&&(c.innerHTML=je(),ft())}async function h(c=!1){const n=s.querySelector("#bonding-lounge-main-wrap");if(n){c||(n.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const t=await ze("/bonding/games/overview");J=t;const k=t.myStats||{},A=t.availableGames||[],P=t.incomingChallenges||[],D=t.sentChallenges||[],Y=t.activeMatches||[],ee=t.recentMatches||[],N=e?._id||e?.id;n.innerHTML=`
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
              ${A.map(I=>`
                <div class="lounge-game-card" data-game-id="${I.id}">
                  <div class="game-card-icon">${I.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${v(I.name)}</h4>
                    <p class="game-card-desc">${v(I.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${I.duration}</span>
                      ${I.id==="ludo"||I.id==="dotsboxes"?`<span class="meta-pill">👥 Up to 4 Players</span><span class="meta-pill">${I.id==="dotsboxes"?"⏹️ 16 Boxes Grid":"🎯 4 Pawns / Base"}</span>`:'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${I.id}" data-game-title="${v(I.name)}">
                    ${I.id==="dotsboxes"?"⚔️ Play Dots & Boxes (2P–4P)":I.id==="ludo"?"⚔️ Play Ludo (2P–4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${P.length+D.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${P.length})</h5>
              ${P.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${P.map(I=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(I.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(I.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${v(I.sender.name)}</strong> (${v(I.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${I._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${I._id}" data-action="decline">
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
                    ${D.map(I=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(I.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(I.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${v(I.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${I._id}" data-action="cancel">
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
                    ${Y.map(I=>{const ne=(I.players||I.gameState?.players||[I.player1,I.player2].filter(Boolean)).filter(le=>le.userId&&le.userId.toString()!==N?.toString()),ae=I.player1?.userId?.toString()===N?.toString()?I.player2:I.player1,pe=ne.length>0?ne.map(le=>v(le.name)).join(", "):ae?.name?v(ae.name):"Colleagues",ge=N&&I.currentTurnUserId&&I.currentTurnUserId.toString()===N.toString();return`
                        <div class="lounge-active-match-card ${ge?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${I.gameType==="dotsboxes"?"⏹️":I.gameType==="ludo"?"🎲":I.gameType==="chess"?"♟️":"❌"}</span>
                            <div>
                              <div class="match-game-title">${v(I.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${pe}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ge?"my-turn":"wait"}">
                              ${ge?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${I._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${I._id}" title="Delete Match">
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
                  ${ee.map(I=>{const ne=N&&I.player1.userId.toString()===N.toString()?I.player2:I.player1,ae=N&&I.winnerId&&I.winnerId.toString()===N.toString(),pe=I.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${v(I.gameTitle)}</span>
                          <span class="recent-date">${L(I.completedAt||I.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${I._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${v(ne.name)}</strong></div>
                          <div class="recent-outcome ${ae?"win":pe?"draw":"loss"}">
                            ${ae?"🏆 VICTORY":pe?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${v(I.winningReason||I.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${I._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${I._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,M()}catch(t){n.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${v(t.message)}</p>
        </div>
      `}}}function M(){s.querySelectorAll(".btn-challenge-game").forEach(n=>{n.onclick=()=>{const t=n.dataset.gameId;j(t)}}),s.querySelectorAll(".btn-respond-invite").forEach(n=>{n.onclick=async()=>{const t=n.dataset.inviteId,k=n.dataset.action;await C(t,k),await h()}}),s.querySelectorAll(".btn-resume-match").forEach(n=>{n.onclick=()=>{const t=n.dataset.matchId;z(t)}}),s.querySelectorAll(".btn-recent-rematch").forEach(n=>{n.onclick=async()=>{const t=n.dataset.matchId;try{n.disabled=!0;const k=await ve(`/bonding/matches/${t}/action`,{action:"rematch"});k.match&&($("Rematch created! Opening arena ⚔️","success"),z(k.match._id))}catch(k){$(k.message||"Could not start rematch","error")}finally{n.disabled=!1}}}),s.querySelectorAll(".btn-delete-match").forEach(n=>{n.onclick=async t=>{t.stopPropagation();const k=n.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{n.disabled=!0,await it(`/bonding/matches/${k}`),$("Match deleted successfully","success"),await h()}catch(A){$(A.message||"Failed to delete match","error")}finally{n.disabled=!1}}});const c=s.querySelector("#btn-clear-matches");c&&(c.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{c.disabled=!0,await it("/bonding/matches?filter=completed"),$("Completed matches history cleared","success"),await h()}catch(n){$(n.message||"Failed to clear matches","error")}finally{c.disabled=!1}})}function j(c=null,n=null){const t=s.querySelector("#bonding-modals-root"),k=e?._id||e?.id,A=new Set(["employee","admin","superadmin"]),P=o.filter(ae=>!ae.isSelf&&ae._id.toString()!==k?.toString()&&A.has(ae.role));let D=c||"dotsboxes",Y=n?n.toString():null,ee=2,N=Y?[Y]:[],I="none";function Q(){const ae=P.find(xe=>xe._id.toString()===Y),pe=D==="dotsboxes"||D==="ludo",ge=ee-1,le=N.length===ge;t.innerHTML=`
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
                  ${pe?`Step ${pe?3:2} — Select Colleagues to Play With (${N.length}/${ge} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${P.map(xe=>{const We=pe?N.includes(xe._id.toString()):Y===xe._id.toString();return`
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
                    <div><strong>Opponents:</strong> ${N.length>0?N.map(xe=>{const We=P.find(Z=>Z._id.toString()===xe);return We?`<strong>${v(We.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+ge+" colleague(s)</span>"}</div>
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
      `,ne()}function ne(){t.querySelector(".bonding-modal-close").onclick=()=>{t.innerHTML=""},t.querySelector("#btn-cancel-challenge-flow").onclick=()=>{t.innerHTML=""},t.querySelectorAll(".game-pill-btn").forEach(ge=>{ge.onclick=()=>{D=ge.dataset.game,Q()}}),t.querySelectorAll(".ludo-mode-btn").forEach(ge=>{ge.onclick=()=>{ee=Number(ge.dataset.count),N=N.slice(0,ee-1),Q()}});const ae=t.querySelector("#flow-emp-search");ae&&(ae.oninput=ge=>{const le=ge.target.value.toLowerCase().trim();t.querySelectorAll(".eligible-emp-item").forEach(xe=>{const We=xe.textContent.toLowerCase();xe.style.display=We.includes(le)?"flex":"none"})}),t.querySelectorAll(".eligible-emp-item").forEach(ge=>{ge.onclick=()=>{const le=ge.dataset.userId;if(D==="dotsboxes"||D==="ludo"){const We=ee-1;N.includes(le)?N=N.filter(Z=>Z!==le):N.length<We?N.push(le):N[We-1]=le}else Y=le;Q()}});const pe=t.querySelector("#btn-submit-challenge-flow");pe&&(pe.onclick=async()=>{if(D==="dotsboxes"){const ge=ee-1;if(N.length<ge){$(`Please select ${ge} colleague(s) to play with`,"warning");return}try{pe.disabled=!0,pe.textContent="Launching Dots & Boxes...";const le=await ve("/bonding/matches/instant-dotsboxes",{playerCount:ee,targetUserIds:N});t.innerHTML="",$(`Dots & Boxes match started (${ee} Players)! ⏹️`,"success"),le&&le._id&&z(le._id)}catch(le){$(le.message||"Failed to start Dots & Boxes match","error"),pe.disabled=!1,pe.textContent=`Start ${ee}P Dots & Boxes ⏹️`}return}if(D==="ludo"){const ge=ee-1;if(N.length<ge){$(`Please select ${ge} colleague(s) to play with`,"warning");return}try{pe.disabled=!0,pe.textContent="Launching Match...";const le=await ve("/bonding/matches/instant-ludo",{playerCount:ee,targetUserIds:N});t.innerHTML="",$(`Ludo match started (${ee} Players)! 🎲`,"success"),le&&le._id&&z(le._id)}catch(le){$(le.message||"Failed to start Ludo match","error"),pe.disabled=!1,pe.textContent=`Start ${ee}P Ludo Match 🎲`}return}if(!Y){$("Please select an employee to challenge","warning");return}try{pe.disabled=!0,pe.textContent="Sending Challenge...",await ve("/bonding/invitations",{gameType:D,targetUserId:Y,matchSettings:{timerMode:I},channelId:null}),$("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),t.innerHTML="",await loadChannels();const ge=b.find(le=>le.type==="direct"&&le.members?.some(xe=>(xe.userId||xe._id)?.toString()===Y));ge?selectChannel(ge):p&&await Le(p._id),x==="lounge_games"&&await h()}catch(ge){$(ge.message||"Could not send challenge","error"),pe.disabled=!1,pe.textContent="Send Challenge 🚀"}})}Q()}async function C(c,n){if(!(!c||!n))try{const t=await Jt(`/bonding/invitations/${c}/respond`,{action:n});n==="accept"?($("Challenge accepted! Entering match arena ⚔️","success"),t.match&&z(t.match._id)):n==="decline"?($("Challenge declined","info"),s.querySelectorAll(`[data-invite-id="${c}"]`).forEach(k=>{const A=k.closest(".lounge-invite-item")||k.closest(".bonding-msg-row");A&&A.remove()})):n==="cancel"&&($("Challenge cancelled","info"),s.querySelectorAll(`[data-invite-id="${c}"]`).forEach(k=>{const A=k.closest(".lounge-invite-item")||k.closest(".bonding-msg-row");A&&A.remove()})),p&&await Le(p._id),x==="lounge_games"&&await h()}catch(t){$(t.message||"Action failed","error")}}async function z(c){if(!c)return;W=c,H&&clearInterval(H);const n=s.querySelector("#bonding-modals-root");let t=null,k=null,A=[],P="",D=null,Y=!1,ee=!1,N=0;function I(Z){return Z?JSON.stringify({status:Z.status,turn:Z.currentTurnUserId?.toString(),turnColor:Z.turn,movesCount:Z.moves?.length,dice:Z.gameState?.dice,rolled:Z.gameState?.rolled,lastRoll:Z.gameState?.lastRoll,lastRollColor:Z.gameState?.lastRollColor,lastRollBy:Z.gameState?.lastRollBy,lastActionText:Z.gameState?.lastActionText,tokens:Z.gameState?.tokens,board:Z.gameState?.board,grid:Z.gameState?.grid,fen:Z.gameState?.fen,hLines:Z.gameState?.hLines,vLines:Z.gameState?.vLines,boxes:Z.gameState?.boxes,scores:Z.gameState?.scores,draw:Z.drawOfferedBy?.toString(),rematchOfferedBy:Z.rematchOfferedBy?.toString(),rematchDeclined:!!Z.rematchDeclined}):""}async function Q(){try{return t=await ze(`/bonding/matches/${c}`),t}catch(Z){return $(Z.message||"Could not load match","error"),ne(),null}}if(t=await Q(),!t)return;P=I(t);function ne(){H&&clearInterval(H),D&&clearTimeout(D),Y=!1,W=null,n.innerHTML="",x==="lounge_games"&&h(!0),p&&Le(p._id,!0)}H=setInterval(async()=>{if(!W||W!==c){clearInterval(H);return}if(!(ee&&Date.now()-N<2500))try{const Z=await ze(`/bonding/matches/${c}`);if(!Z)return;const De=I(Z);if(De!==P){if(P=De,t=Z,Z.rematchDeclined){$("Rematch was declined","info"),ne();return}ae()}}catch{}},800);function ae(){if(!t)return;const Z=e?._id||e?.id,De=Z&&t.player1?.userId?.toString()===Z.toString(),Ne=De?t.player1:t.player2||t.player1,ue=De&&t.player2||t.player1,Se=Z&&t.currentTurnUserId&&t.currentTurnUserId.toString()===Z.toString(),ye=t.status!=="active";let Oe=[];t.gameState?.players&&Array.isArray(t.gameState.players)&&t.gameState.players.length>0?Oe=t.gameState.players:Oe=[t.player1,t.player2].filter(Boolean);const Ue=[{emoji:"🐻",name:"Gentle Bear"},{emoji:"🦌",name:"Clever Deer"},{emoji:"🦊",name:"Swift Fox"},{emoji:"🦁",name:"Mighty Lion"}];n.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal arena-split-layout">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Left Sidebar Panel with Players & Controls -->
            <aside class="arena-sidebar-panel">
              <div class="arena-sidebar-players">
                ${Oe.map((ce,Me)=>{const qe=Ue[Me]||{emoji:"🎮",name:"Challenger"},Ee=ce.userId&&Z&&ce.userId.toString()===Z.toString();let Ie=!1,Pe="✕";if(t.gameType==="tictactoe"){const oe=ce.assignedRole||(Me===0?"X":"O");Ie=(t.turn===oe||t.currentTurnUserId&&ce.userId&&t.currentTurnUserId.toString()===ce.userId.toString())&&!ye,Pe=oe==="O"?"◯":"✕"}else if(t.gameType==="dotsboxes"){const oe=t.turn||t.gameState?.turnColor;Ie=(ce.color&&ce.color===oe||t.gameState?.turnIndex!==void 0&&t.gameState.turnIndex===Me||t.currentTurnUserId&&ce.userId&&t.currentTurnUserId.toString()===ce.userId.toString())&&!ye,Pe="⏹"}else if(t.gameType==="ludo"){const oe=t.turn||t.gameState?.turnColor;Ie=(ce.color&&ce.color===oe||t.currentTurnUserId&&ce.userId&&t.currentTurnUserId.toString()===ce.userId.toString())&&!ye,Pe="🎲"}else{const oe=ce.assignedRole||(Me===0?"white":"black");Ie=(t.turn===oe||t.currentTurnUserId&&ce.userId&&t.currentTurnUserId.toString()===ce.userId.toString())&&!ye,Pe="♟"}let S="";t.gameType==="dotsboxes"&&t.gameState?.scores?S=` · ${t.gameState.scores[ce.color]||0} pts`:t.gameType==="ludo"&&t.gameState?.tokens&&(S=` · ${(t.gameState.tokens[ce.color]||[]).filter(Te=>Te.step>=57).length}/4 Home`);const B=ce.name?ce.name:qe.name,u=Ee?"You":"Opponent";return`
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
                        <div class="game-player-role">${u}${S}</div>
                      </div>
                    </div>
                  `}).join("")}
              </div>

              <!-- Sidebar Bottom Footer -->
              <div class="arena-sidebar-footer">
                <div class="game-code-display">Game code: <strong>${(t._id||"7370").slice(-4).toUpperCase()}</strong></div>
                <div class="arena-sidebar-divider"></div>
                <div class="arena-sidebar-actions">
                  <button class="sidebar-action-item" id="btn-arena-settings" type="button" title="Game Settings">
                    <span class="action-icon">⚙️</span>
                    <span>Settings</span>
                  </button>
                  ${ye?`
                    <button class="sidebar-action-item danger" id="btn-arena-delete-match" type="button" title="Delete Match">
                      <span class="action-icon">🗑️</span>
                      <span>Delete Match</span>
                    </button>
                  `:`
                    <button class="sidebar-action-item" id="btn-arena-resign" type="button" title="Surrender Match">
                      <span class="action-icon">🤝</span>
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
      `,We(Se,De,Ne)}function pe(Z,De,Ne){const ue=t.gameState||{},Se=ue.rows||4,ye=ue.cols||4,Oe=ue.players||[{...t.player1,color:"red",assignedRole:"red"},{...t.player2,color:"blue",assignedRole:"blue"}],Ue=ue.activeColors||["red","blue"],ce=t.turn||ue.turnColor||"red",Me=e?._id||e?.id,Ee=(Oe.find(he=>he.userId&&he.userId.toString()===Me?.toString())||Oe[0])?.color||(Z?"red":"blue"),Ie=Ee===ce&&t.status==="active",Pe=ue.scores||{red:0,blue:0,green:0,amber:0},S=ue.hLines||Array(Se+1).fill(null).map(()=>Array(ye).fill(null)),B=ue.vLines||Array(Se).fill(null).map(()=>Array(ye+1).fill(null)),u=ue.boxes||Array(Se).fill(null).map(()=>Array(ye).fill(null)),oe={red:{name:"Red",hex:"#ef4444",light:"rgba(239,68,68,0.18)",border:"#f87171"},blue:{name:"Blue",hex:"#3b82f6",light:"rgba(59,130,246,0.18)",border:"#60a5fa"},green:{name:"Green",hex:"#10b981",light:"rgba(16,185,129,0.18)",border:"#34d399"},amber:{name:"Amber",hex:"#f59e0b",light:"rgba(245,158,11,0.18)",border:"#fbbf24"}},ie=Oe.find(he=>he.color===ce),Te=ie?v(ie.name):ce.toUpperCase();let G=[];for(let he=0;he<=Se*2;he++)for(let be=0;be<=ye*2;be++){const Fe=he%2===0,gt=be%2===0;if(Fe&&gt)G.push(`
              <div class="dots-cell dot-intersection" data-r="${he/2}" data-c="${be/2}">
                <span class="dots-dot"></span>
              </div>
            `);else if(Fe&&!gt){const Ce=he/2,_e=Math.floor(be/2),ke=S[Ce]&&S[Ce][_e],V=!!ke,He=ke?.color||"",Ae=Ie&&!V&&t.status==="active";G.push(`
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
      `}function ge(Z){const De=t.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Ne=new $a(De),ue=Z?t.player1.assignedRole==="white":t.player2.assignedRole==="white",Se={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},ye=ue?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Oe=ue?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Ue='<div class="chess-board-grid">';for(const qe of Oe)for(const Ee of ye){const Ie=`${Ee}${qe}`,Pe=Ne.get(Ie),S=(Ee.charCodeAt(0)-97+qe)%2!==0,B=k===Ie,u=A.includes(Ie),oe=Pe?Pe.color==="w"?Se[Pe.type.toUpperCase()]:Se[Pe.type]:"";Ue+=`
            <div class="chess-sq ${S?"light":"dark"} ${B?"selected":""} ${u?"legal-dot":""}" data-square="${Ie}">
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
      `}function xe(Z,De,Ne){const ue=t.gameState||{},Se=ue.activeColors||["red","green"],ye=ue.players||[{...t.player1,color:"red",assignedRole:"red",isBot:!1},{...t.player2,color:"green",assignedRole:"green",isBot:!1}],Oe=ue.tokens||{},Ue=d=>{const m=Oe[d]||(d==="red"?ue.p1Tokens:d==="green"?ue.p2Tokens:[])||[];return Array.from({length:4},(K,te)=>m[te]||{id:te,step:-1})},ce=Ue("red"),Me=Ue("green"),qe=Ue("yellow"),Ee=Ue("blue"),Ie=e?._id||e?.id,S=(ye.find(d=>d.userId&&d.userId.toString()===Ie?.toString())||ye[0])?.color||(Z?"red":"green"),B=ue.turnColor||t.turn||"red",u=S===B&&t.status==="active",oe=!!ue.rolled,ie=ue.dice,Te=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],G=[[7,1],[7,2],[7,3],[7,4],[7,5]],he=[[1,7],[2,7],[3,7],[4,7],[5,7]],be=[[7,13],[7,12],[7,11],[7,10],[7,9]],Fe=[[13,7],[12,7],[11,7],[10,7],[9,7]],gt=[0,8,13,21,26,34,39,47];function Ce(d,m){return m<0?null:m>=56?d==="red"?[7,6]:d==="green"?[6,7]:d==="yellow"?[7,8]:[8,7]:d==="red"?m<=50?Te[m]:G[m-51]:d==="green"?m<=50?Te[(13+m)%52]:he[m-51]:d==="yellow"?m<=50?Te[(26+m)%52]:be[m-51]:m<=50?Te[(39+m)%52]:Fe[m-51]}function _e(d,m){return d!==S||!u||!oe||!ie||t.status!=="active"?!1:m.step===-1?ie===6:m.step>=0&&m.step+ie<=56}const ke={},V=(d,m)=>{m.forEach(K=>{if(K.step>=0&&K.step<56){const te=Ce(d,K.step);if(te){const fe=te[0]+","+te[1];(ke[fe]=ke[fe]||[]).push({color:d,id:K.id,step:K.step,movable:_e(d,K)})}}})};Se.includes("red")&&V("red",ce),Se.includes("green")&&V("green",Me),Se.includes("yellow")&&V("yellow",qe),Se.includes("blue")&&V("blue",Ee);const He={};Te.forEach(([d,m],K)=>{He[d+","+m]=K});const Ae={};G.forEach(([d,m],K)=>{Ae[d+","+m]=K+1});const Xe={};he.forEach(([d,m],K)=>{Xe[d+","+m]=K+1});const ht={};be.forEach(([d,m],K)=>{ht[d+","+m]=K+1});const Ut={};Fe.forEach(([d,m],K)=>{Ut[d+","+m]=K+1});const Ht=[];for(let d=0;d<15;d++)for(let m=0;m<15;m++){if(d<6&&m<6||d<6&&m>8||d>8&&m<6||d>8&&m>8||d>=6&&d<=8&&m>=6&&m<=8)continue;const K=d+","+m,te=He[K],fe=te!==void 0&&gt.includes(te),rt=d===6&&m===1,bt=d===1&&m===8,ot=d===8&&m===13,Wt=d===13&&m===6,Ia=Ae[K],_a=Xe[K],Da=ht[K],Aa=Ut[K];let xt="ludo-cell";rt?xt+=" cell-red-start":bt?xt+=" cell-green-start":ot?xt+=" cell-yellow-start":Wt?xt+=" cell-blue-start":Ia?xt+=" cell-red-stretch":_a?xt+=" cell-green-stretch":Da?xt+=" cell-yellow-stretch":Aa?xt+=" cell-blue-stretch":fe&&(xt+=" cell-safe-star");const Ea=ke[K]||[];Ht.push(`
            <div class="${xt}" style="grid-row:${d+1};grid-column:${m+1}" data-pos="${K}">
              ${fe?'<span class="cell-star-glyph">⭐</span>':""}
              ${rt||bt||ot||Wt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Ea.map(_t=>`
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
        `}const Mt=ye.find(d=>d.color==="red"),Gt=ye.find(d=>d.color==="green"),ta=ye.find(d=>d.color==="yellow"),aa=ye.find(d=>d.color==="blue"),zt=ye.find(d=>d.color===B)||(B==="red"?Mt:Gt),yt=zt?v(zt.name):B.toUpperCase(),ia={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[B]||"🔴",ut=!!(oe&&(ie||ue.lastRoll&&ue.lastRollColor===B)),kt=ie||(ut?ue.lastRoll:null),Pt=u&&!ut&&t.status==="active",w=Ue(S).filter(d=>_e(S,d));return`
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
                ${u&&!ut&&t.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":u&&ut&&t.status==="active"?w.length>0?w.length===1?`🎲 Rolled <strong>${kt}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${kt}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${kt}</strong>. No legal moves possible — turn passing...`:t.status==="active"?ut?`🎲 ${ia} <strong>${yt}</strong> rolled <strong>${kt}</strong>!`:`⏳ Waiting for <strong>${yt}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${v(ue.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function We(Z,De,Ne){const ue=n.querySelector("#btn-close-arena");ue&&(ue.onclick=ne);const Se=n.querySelector("#btn-sidebar-leave");Se&&(Se.onclick=ne);const ye=n.querySelector("#btn-arena-settings");ye&&(ye.onclick=()=>{$(`🎮 ${t.gameTitle} • Code ${(t._id||"7370").slice(-4).toUpperCase()} • Audio & Visual cues enabled`,"info")});const Oe=n.querySelector("#btn-arena-resign");Oe&&(Oe.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{Oe.disabled=!0,await ve(`/bonding/matches/${c}/action`,{action:"resign"}),await Q(),ae()}catch(S){$(S.message||"Resign failed","error"),Oe.disabled=!1}});const Ue=n.querySelector("#btn-arena-draw");Ue&&(Ue.onclick=async()=>{try{await ve(`/bonding/matches/${c}/action`,{action:"offer_draw"}),$("Draw offer sent to opponent","info"),await Q(),ae()}catch(S){$(S.message||"Draw offer failed","error")}});const ce=n.querySelector("#btn-confirm-accept-draw");ce&&(ce.onclick=async()=>{try{await ve(`/bonding/matches/${c}/action`,{action:"accept_draw"}),$("Draw agreed!","info"),await Q(),ae()}catch(S){$(S.message,"error")}});const Me=n.querySelector("#btn-confirm-decline-draw");Me&&(Me.onclick=async()=>{try{await ve(`/bonding/matches/${c}/action`,{action:"decline_draw"}),await Q(),ae()}catch(S){$(S.message,"error")}}),[n.querySelector("#btn-arena-delete-match"),n.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(S=>{S.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{S.disabled=!0,await it(`/bonding/matches/${c}`),$("Match deleted","success"),ne(),x==="lounge_games"&&await h()}catch(B){$(B.message||"Failed to delete match","error"),S.disabled=!1}}});const Ee=n.querySelector("#btn-arena-rematch-action");Ee&&(Ee.onclick=async()=>{try{Ee.disabled=!0,Ee.textContent="Requesting...";const S=await ve(`/bonding/matches/${c}/action`,{action:"rematch_request"});S.match&&(t=S.match,P=I(S.match),ae(),$("Rematch request sent! Waiting for opponent ⚔️","info"))}catch(S){$(S.message||"Rematch request failed","error"),Ee.disabled=!1,Ee.textContent="🔄 Request Rematch"}});const Ie=n.querySelector("#btn-arena-accept-rematch");Ie&&(Ie.onclick=async()=>{try{Ie.disabled=!0,Ie.textContent="Starting...";const S=await ve(`/bonding/matches/${c}/action`,{action:"rematch_accept"});S.match&&(t=S.match,P=I(S.match),$("Rematch started! Same game is live ⚔️","success"),ae())}catch(S){$(S.message||"Could not accept rematch","error"),Ie.disabled=!1}});const Pe=n.querySelector("#btn-arena-decline-rematch");if(Pe&&(Pe.onclick=async()=>{try{await ve(`/bonding/matches/${c}/action`,{action:"rematch_decline"}),$("Rematch declined","info"),ne()}catch{ne()}}),t.gameType==="dotsboxes"&&Z&&t.status==="active"&&n.querySelectorAll(".dots-line.clickable").forEach(S=>{S.onclick=async()=>{const B=S.dataset.type,u=S.dataset.r,oe=S.dataset.c;try{S.style.opacity="0.5";const ie=await ve(`/bonding/matches/${c}/move`,{type:B,r:u,c:oe});t=ie,P=I(ie),ae()}catch(ie){S.style.opacity="1",$(ie.message||"Failed to draw line","error")}}}),t.gameType==="chess"&&Z&&t.status==="active"){const S=t.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",B=new $a(S),u=Ne.assignedRole==="white"?"w":"b";n.querySelectorAll(".chess-sq").forEach(oe=>{oe.onclick=async()=>{const ie=oe.dataset.square;if(k){if(k===ie){k=null,A=[],ae();return}if(A.includes(ie)){const G=B.get(k);let he;G&&G.type==="p"&&(ie.endsWith("8")||ie.endsWith("1"))&&(he=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const be={from:k,to:ie,promotion:he?he.toLowerCase():void 0};k=null,A=[],t=await ve(`/bonding/matches/${c}/move`,{move:be}),ae()}catch(be){$(be.message||"Illegal chess move","error"),k=null,A=[],ae()}return}}const Te=B.get(ie);Te&&Te.color===u?(k=ie,A=B.moves({square:ie,verbose:!0}).map(he=>he.to),ae()):(k=null,A=[],ae())}})}if(t.gameType==="tictactoe"&&Z&&t.status==="active"&&n.querySelectorAll(".ttt-cell.empty").forEach(S=>{S.onclick=async()=>{const B=S.dataset.cellIdx;try{S.style.opacity="0.5",t=await ve(`/bonding/matches/${c}/move`,{cellIndex:Number(B)}),ae()}catch(u){$(u.message||"Invalid move","error")}}}),t.gameType==="ludo"&&t.status==="active"){const S=t.gameState||{},B=!!S.rolled,u=S.turnColor||t.turn||"red",oe=!!(B&&(S.dice||S.lastRoll&&S.lastRollColor===u)),ie=e?._id||e?.id,Te=S.players||[{...t.player1,color:"red",assignedRole:"red",isBot:!1},{...t.player2,color:"green",assignedRole:"green",isBot:!1}],G=ie&&t.player1.userId.toString()===ie.toString(),be=(Te.find(ke=>ke.userId&&ke.userId.toString()===ie?.toString())||(G?Te[0]:Te[1]))?.color||(G?"red":"green"),Fe=be===u&&t.status==="active",gt=Te.find(ke=>ke.color===u)||(u==="red"?t.player1:t.player2),Ce=v(gt?.name||(u==="red"?"Player 1":"Player 2")),_e=n.querySelector("#btn-interactive-ludo-dice");if(_e){const ke=async V=>{if(V&&(V.preventDefault(),V.stopPropagation()),!Fe){$(`${Ce}'s turn right now`,"info");return}if(oe){$("Dice already rolled! Tap your glowing pawn to move.","info");return}if(t.status!=="active"){$("Match has ended","info");return}if(ee||_e.dataset.rolling==="true")return;ee=!0,N=Date.now(),_e.dataset.rolling="true",_e.classList.add("rolling");let He=0;const Ae=setInterval(()=>{He++;const Xe=Math.floor(Math.random()*6)+1;_e.innerHTML=renderNumberDisplay(Xe),He>=4&&clearInterval(Ae)},50);try{const Xe=await ve(`/bonding/matches/${c}/move`,{action:"roll"});clearInterval(Ae),t=Xe,P=I(Xe),ae()}catch(Xe){clearInterval(Ae),$(Xe.message||"Failed to roll dice","error"),_e&&(delete _e.dataset.rolling,_e.classList.remove("rolling"))}finally{ee=!1}};_e.onclick=ke,_e.onkeydown=V=>{(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),ke(V))}}if(Fe&&oe){const V=(S.tokens||{})[be]||[],He=S.dice||S.lastRoll||0,Ae=V.filter(Xe=>Xe.step===-1&&He===6||Xe.step>=0&&Xe.step+He<=56);if(Ae.length===1&&!Y){Y=!0;const Xe=Ae[0];D&&clearTimeout(D),D=setTimeout(async()=>{try{const ht=await ve(`/bonding/matches/${c}/move`,{action:"move",tokenId:Number(Xe.id)});t=ht,P=I(ht),Y=!1,ae()}catch(ht){Y=!1,$(ht.message||"Auto-move failed","error")}},400)}}Fe&&B&&n.querySelectorAll(".ludo-token.movable").forEach(ke=>{ke.onclick=async V=>{V.stopPropagation();const He=ke.dataset.tokenId;try{ke.style.opacity="0.5";const Ae=await ve(`/bonding/matches/${c}/move`,{action:"move",tokenId:Number(He)});t=Ae,P=I(Ae),ae()}catch(Ae){$(Ae.message||"Invalid token move","error"),ke.style.opacity="1"}}})}}ae()}function O(){if(!p||p.type==="direct")return;const c=s.querySelector("#bonding-modals-root"),n=N=>N==="employee"||N==="admin"||N==="superadmin",t=p.members||[],k=new Set(t.map(N=>N.userId?.toString())),A=o.filter(N=>n(N.role)&&!k.has(N._id.toString()));c.innerHTML=`
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
                  ${A.map(N=>`
                    <option value="${N._id}">${v(N.name)} (${v(N.role==="superadmin"?"Superadmin":N.role==="admin"?"Admin":"Employee")})</option>
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
                ${t.map(N=>{const I=e?._id||e?.id,Q=I&&N.userId&&N.userId.toString()===I.toString(),ne=p.createdBy&&p.createdBy.userId&&String(p.createdBy.userId)===String(I),ae=g==="superadmin"||e?.role==="superadmin",pe=ne||ae;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(N.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${v(N.name)} ${Q?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${v(N.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${Q?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${N.userId}">
                            🚪 Leave Group
                          </button>
                        `:pe?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${N.userId}" data-name="${v(N.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const N=e?._id||e?.id,I=p.createdBy&&p.createdBy.userId&&String(p.createdBy.userId)===String(N),Q=g==="superadmin"||e?.role==="superadmin";return I||Q?`
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""};const P=c.querySelector("#btn-modal-delete-group");P&&(P.onclick=()=>{c.innerHTML="",U()});const D=c.querySelector("#btn-modal-leave-group");D&&(D.onclick=()=>{c.innerHTML="",F()}),c.querySelectorAll(".btn-leave-group-action").forEach(N=>{N.onclick=()=>{c.innerHTML="",F()}});const Y=c.querySelector("#btn-submit-add-member");Y&&(Y.onclick=async()=>{const I=c.querySelector("#sel-add-colleague").value;if(!I){$("Please select a colleague to add","warning");return}try{Y.disabled=!0,Y.textContent="Adding...";const Q=await Jt(`/bonding/channels/${p._id}/members`,{action:"add",userIds:[I]});$("Colleague added to group! 🎉","success"),p=Q.channel,c.innerHTML="",await Le(p._id),Re()}catch(Q){$(Q.message||"Failed to add member","error"),Y.disabled=!1,Y.textContent="Add to Group"}}),c.querySelectorAll(".btn-remove-member").forEach(N=>{N.onclick=async()=>{const I=N.dataset.userId,Q=N.dataset.name;if(confirm(`Are you sure you want to remove ${Q} from this group?`))try{N.disabled=!0;const ne=await Jt(`/bonding/channels/${p._id}/members`,{action:"remove",userId:I});$(`${Q} removed from group`,"info"),p=ne.channel,c.innerHTML="",await Le(p._id),Re()}catch(ne){$(ne.message||"Failed to remove member","error"),N.disabled=!1}}})}async function F(){if(!p||p.type==="direct")return;const c=p.name;if(confirm(`Are you sure you want to leave the group "${c}"?`))try{await ve(`/bonding/channels/${p._id}/leave`,{}),$(`You left "${c}"`,"info"),b=await ze("/bonding/channels").catch(()=>[]),p=b.find(t=>t.type==="group")||b[0]||null,Be(),Re(),p&&await Le(p._id)}catch(t){$(t.message||"Failed to leave group","error")}}async function U(){if(!p||p.type==="direct")return;const c=p.name;if(confirm(`Are you sure you want to delete the group "${c}"?

All messages in this lounge will be deleted.`))try{await it(`/bonding/channels/${p._id}`),$(`Group "${c}" deleted successfully`,"success"),b=await ze("/bonding/channels").catch(()=>[]),p=b.find(t=>t.type==="group")||b[0]||null,Be(),Re(),p&&await Le(p._id)}catch(t){$(t.message||"Failed to delete group","error")}}function y(){const c=s.querySelector("#bonding-modals-root"),n=A=>A==="employee"||A==="admin"||A==="superadmin",t=o.filter(A=>!A.isSelf&&n(A.role));c.innerHTML=`
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelectorAll(".bonding-user-pick-item").forEach(A=>{A.onclick=async()=>{const P=A.dataset.userId;try{const D=await ve("/bonding/channels",{type:"direct",targetUserId:P});c.innerHTML="",b=await ze("/bonding/channels"),p=b.find(Y=>Y._id===D._id)||D,Be(),Re(),await Le(p._id)}catch(D){$(D.message||"Failed to open personal chat","error")}}})}function T(){const c=s.querySelector("#bonding-modals-root"),n=D=>D==="employee"||D==="admin"||D==="superadmin",t=o.filter(D=>!D.isSelf&&n(D.role));c.innerHTML=`
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelector("#btn-cancel-create-grp").onclick=()=>{c.innerHTML=""};let k="👥";const A=c.querySelectorAll(".avatar-opt");A.forEach(D=>{D.onclick=()=>{A.forEach(Y=>Y.classList.remove("active")),D.classList.add("active"),k=D.textContent.trim()}});const P=c.querySelector("#btn-confirm-create-grp");P.onclick=async()=>{const D=c.querySelector("#new-group-name"),Y=c.querySelector("#new-group-desc"),ee=D.value.trim();if(!ee){$("Please enter a group name","warning"),D.focus();return}const N=c.querySelectorAll(".new-group-member-chk:checked"),I=Array.from(N).map(Q=>Q.value);try{P.disabled=!0,P.textContent="Creating...";const Q=await ve("/bonding/channels",{type:"group",name:ee,description:Y.value.trim(),avatar:k,memberIds:I});$(`Group "${ee}" created! 🎉`,"success"),c.innerHTML="",b=await ze("/bonding/channels"),p=b.find(ne=>ne._id===Q._id)||Q,Be(),Re(),await Le(p._id)}catch(Q){$(Q.message||"Failed to create group","error"),P.disabled=!1,P.textContent="Create Group 🎉"}}}function X(c,n){const t=document.querySelector(".bonding-chat-emoji-palette");if(t){t.remove();return}const k=[{name:"Smileys & Faces",icon:"😀",emojis:["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","😉","😍","🥰","😘","😋","😎","🤔","🤨","😐","😴","🤯","🥳","🥺"]},{name:"Hands & People",icon:"👍",emojis:["👍","👎","👏","🙌","👐","🤝","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","👇","💪","🫡","🙏","🙋","🙆"]},{name:"Celebration & Work",icon:"🎉",emojis:["🎉","🎊","🔥","✨","💯","🚀","🎯","🏆","🥇","⭐","🌟","💡","📌","💼","📊","📈","⏱️","⏳","✅","❌","⚡"]},{name:"Break & Fun",icon:"☕",emojis:["☕","🍵","🍕","🍔","🍟","🎂","🍰","🍩","🍿","🍺","🍻","🎮","🎲","⏹️","🧩","🎵","🏖️","⚽","❤️","💖","💙"]}];let A=0;const P=document.createElement("div");P.className="bonding-chat-emoji-palette";function D(){const N=k[A];P.innerHTML=`
        <div class="emoji-palette-tabs">
          ${k.map((I,Q)=>`
            <button class="emoji-tab-btn ${Q===A?"active":""}" data-cat-idx="${Q}" title="${I.name}">
              ${I.icon}
            </button>
          `).join("")}
        </div>
        <div class="emoji-palette-header">
          <span>${N.name}</span>
          <button class="emoji-palette-close" type="button">&times;</button>
        </div>
        <div class="emoji-palette-grid">
          ${N.emojis.map(I=>`
            <button class="chat-emoji-cell" data-e="${I}" type="button">${I}</button>
          `).join("")}
        </div>
      `,P.querySelectorAll(".emoji-tab-btn").forEach(I=>{I.onclick=Q=>{Q.stopPropagation(),A=Number(I.dataset.catIdx),D()}}),P.querySelector(".emoji-palette-close").onclick=I=>{I.stopPropagation(),P.remove()},P.querySelectorAll(".chat-emoji-cell").forEach(I=>{I.onclick=Q=>{Q.stopPropagation(),n(I.dataset.e),P.remove()}})}D();const Y=c.getBoundingClientRect();P.style.position="fixed",P.style.bottom=`${window.innerHeight-Y.top+8}px`,P.style.left=`${Math.max(12,Math.min(window.innerWidth-300,Y.left-40))}px`,document.body.appendChild(P);const ee=N=>{!P.contains(N.target)&&N.target!==c&&!c.contains(N.target)&&(P.remove(),document.removeEventListener("click",ee))};setTimeout(()=>document.addEventListener("click",ee),10)}function _(c,n){const t=document.querySelector(".bonding-emoji-popup");t&&t.remove();const k=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],A=document.createElement("div");A.className="bonding-emoji-popup",A.innerHTML=k.map(Y=>`<button class="emoji-opt-btn" data-e="${Y}">${Y}</button>`).join("");const P=c.getBoundingClientRect();A.style.top=`${P.bottom+window.scrollY+6}px`,A.style.left=`${P.left+window.scrollX}px`,document.body.appendChild(A),A.querySelectorAll(".emoji-opt-btn").forEach(Y=>{Y.onclick=ee=>{ee.stopPropagation(),n(Y.dataset.e),A.remove()}});const D=Y=>{A.contains(Y.target)||(A.remove(),document.removeEventListener("click",D))};setTimeout(()=>document.addEventListener("click",D),10)}function L(c){if(!c)return"";try{return new Date(c).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function ni(){const s=document.getElementById("ci360-bonding-styles");s&&s.remove();const a=document.createElement("style");a.id="ci360-bonding-styles",a.textContent=`
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

    `,document.head.appendChild(a)}function Sa(s){if(!s)return"";const a=v(s),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return a.replace(e,g=>`<a href="${g}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${g} ↗</a>`)}const ga=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],Et=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],jt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function li(s,a={}){const{userRole:e="employee",currentUser:g=null,initialTicketId:x=null}=a,b=e==="superadmin"||e==="admin";if(e==="client"||g&&g.role==="client"){s.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let p=[],o={},R=[],J=[],E={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:a.initialJobId||"all",myIssuesOnly:!1},q=null,W="comments",H=!1;s.innerHTML=`
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
            <span class="ci-360-search-icon">🔍</span>
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
            ${Et.map(i=>`<option value="${i.key}">${i.icon} ${i.label}</option>`).join("")}
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
  `,await Promise.all([nt(),Qe(),mt(),Ft()]),lt(),dt(),Le(),Re(),x&&ct(x);const me=setInterval(()=>{if(!document.contains(s)){clearInterval(me);return}!(s.querySelector(".dragging")||s.querySelector("input:focus")||s.querySelector("textarea:focus"))&&!q&&de()},12e3),$e=()=>{document.contains(s)&&!q&&de()};window.addEventListener("focus",$e);async function Qe(){try{const i=new URLSearchParams;E.search&&i.set("search",E.search),E.priority!=="all"&&i.set("priority",E.priority),E.category!=="all"&&i.set("category",E.category),E.assigneeId!=="all"&&i.set("assigneeId",E.assigneeId),E.jobId&&E.jobId!=="all"&&i.set("jobId",E.jobId),E.reporterId&&E.reporterId!=="all"&&i.set("reporterId",E.reporterId),E.scope==="created"&&i.set("reporterId",g?._id||g?.id),E.scope==="assigned"&&i.set("assigneeId",g?._id||g?.id),E.myIssuesOnly&&i.set("myIssuesOnly","true");const r=await ze("/tickets?"+i.toString());p=Array.isArray(r)?r:[]}catch(i){$(i.message||"Failed to load tickets",!0),p=[]}}async function nt(){try{o=await ze("/tickets/stats")}catch(i){console.warn("Could not fetch ticket stats:",i)}}async function mt(){try{let i;try{i=await ze("/tickets/staff")}catch{i=await ze("/users")}R=(i||[]).filter(r=>r.active!==!1&&r.role!=="client")}catch(i){console.warn("Could not fetch employees:",i),R=[]}}async function Ft(){try{const i=await ze("/jobs?limit=250");J=Array.isArray(i)?i:i?.jobs||[]}catch(i){console.warn("Could not fetch jobs:",i)}}function lt(){const i=s.querySelector("#ci-360-stats-root");i&&(i.innerHTML=`
      <div class="ci-360-stat-card ${E.status==="all"&&!E.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="ci-360-stat-val">${o.total||0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${E.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${o.toDo||0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${E.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${o.content??(o.inProgress||0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${E.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${o.design||0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${E.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${o.underReview||0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${E.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
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
    `,i.querySelectorAll(".ci-360-stat-card").forEach(r=>{r.onclick=async()=>{const f=r.dataset.statFilter;f==="all"?(E.status="all",E.priority="all"):f==="critical"?(E.priority="Critical",E.status="all"):(E.status=f,E.priority="all"),await de()}}))}function Le(){const i=s.querySelector("#ci-360-filter-assignee");i&&(i.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${R.map(f=>`
          <option value="${f._id}" ${E.assigneeId===f._id.toString()?"selected":""}>
            ${v(f.name)} (${v(f.role)})
          </option>
        `).join("")}
      `);const r=s.querySelector("#ci-360-filter-job");r&&(r.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${J.map(f=>`
          <option value="${f._id}" ${E.jobId===f._id.toString()?"selected":""}>
            📁 ${v(f.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function dt(){const i=s.querySelector("#ci-360-board-columns-root");if(!i)return;const r={};ga.forEach(f=>{r[f.key]=[]}),p.forEach(f=>{let h=f.status||"To Do";h==="In Progress"?h="Content":h==="Resolved"?h="Under Review":h==="Closed"&&(h="Ready to Leave"),r[h]||(r[h]=[]),r[h].push(f)}),i.innerHTML=ga.map(f=>{const h=r[f.key]||[];return`
        <div class="ci-360-board-column" data-status="${f.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${v(f.label)}</span>
              <span class="ci-360-col-badge">${h.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${f.key}">
            ${h.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:h.map(M=>wt(M)).join("")}
          </div>
        </div>
      `}).join(""),Be(),vt()}function wt(i){const r=Et.find(T=>T.key===i.category)||Et[0],f=jt.find(T=>T.key===i.priority)||jt[2],h=i.dueDate&&new Date(i.dueDate)<new Date&&i.status!=="Ready to Leave"&&i.status!=="Closed",M=(i.subtasks||[]).filter(T=>T.completed).length,j=(i.subtasks||[]).length,C=Array.isArray(i.assignees)&&i.assignees.length>0?i.assignees:i.assignee&&i.assignee.userId?[i.assignee]:[],z=g?._id||g?.id,O=i.reporter&&i.reporter.userId&&String(i.reporter.userId)===String(z)||i.userId&&String(i.userId)===String(z),F=e==="superadmin"||g?.role==="superadmin",U=O||F;let y="";if(C.length===0)y='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const T=C.slice(0,3),X=C.length-3;y=`
        <div class="ci-360-avatar-group">
          ${T.map(_=>`
            <div class="ci-360-avatar" title="Assignee: ${v(_.name||"Member")} (${v(_.role||"")})">
              ${(_.avatar||_.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${X>0?`
            <div class="ci-360-avatar extra-count" title="${X} more assignees: ${v(C.slice(3).map(_=>_.name).join(", "))}">
              +${X}
            </div>
          `:""}
        </div>
      `}return`
      <div class="ci-360-card" draggable="true" data-ticket-id="${i._id}">
        <div class="ci-360-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="ci-360-category-pill ${r.slug}">
              ${r.icon} ${r.label}
            </span>
            ${O?`
              <span class="ci-360-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${i.dueDate?`
              <span class="ci-360-due-pill ${h?"overdue":""}" title="Due Date">
                ${h?"⚠️ ":"📅 "}
                ${new Date(i.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          ${U?`
            <button type="button" class="ci-360-card-quick-del btn-delete-card-ticket" data-ticket-id="${i._id}" data-ticket-num="${v(i.ticketId)}" title="Delete Ticket (${F?"Superadmin":"Creator"})">
              🗑️
            </button>
          `:""}
        </div>

        <div class="ci-360-card-title" title="${v(i.title)}">
          ${v(i.title)}
        </div>

        ${i.jobTitle||i.jobId&&i.jobId.title?`
          <div class="ci-360-card-job-link" title="Linked Internal Job: ${v(i.jobTitle||i.jobId.title)}">
            📁 ${v(i.jobTitle||i.jobId.title)}
          </div>
        `:""}

        ${i.linkUrl||i.links&&i.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${v(i.linkUrl||i.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${v(i.linkUrl||i.links[0]?.url)}">
              🔗 ${i.links&&i.links[0]?.title?v(i.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="ci-360-card-bottom">
          <div class="ci-360-card-id-row">
            <span class="ci-360-pri-icon" title="Priority: ${f.label}">${f.icon}</span>
            <span class="ci-360-ticket-id">${v(i.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${j>0?`
              <span class="ci-360-subtask-badge" title="${M} of ${j} subtasks completed">
                ☑ ${M}/${j}
              </span>
            `:""}
            ${y}
          </div>
        </div>
      </div>
    `}function Be(){const i=s.querySelectorAll(".ci-360-card"),r=s.querySelectorAll(".ci-360-board-column");i.forEach(f=>{f.ondragstart=h=>{h.dataTransfer.setData("text/plain",f.dataset.ticketId),f.classList.add("dragging")},f.ondragend=()=>{f.classList.remove("dragging")}}),r.forEach(f=>{f.ondragover=h=>{h.preventDefault(),f.classList.add("drag-over")},f.ondragleave=()=>{f.classList.remove("drag-over")},f.ondrop=async h=>{h.preventDefault(),f.classList.remove("drag-over");const M=h.dataTransfer.getData("text/plain"),j=f.dataset.status;if(!M||!j)return;const C=p.find(U=>U._id.toString()===M);if(!C||C.status===j)return;const z=C.status,O=C.assignees?[...C.assignees]:[],F=C.assignee?{...C.assignee}:null;if(C.status=j,j==="Under Review"){const U={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};C.assignee=U,C.assignees=[U]}dt();try{const U=await at(`/tickets/${M}/status`,{status:j}),y=j==="Under Review"?`Moved ${U.ticketId} to Under Review (Default assigned to John)`:`Moved ${U.ticketId} to ${j}`;$(y,!1),await de()}catch(U){$(U.message||"Status update failed",!0),C.status=z,C.assignees=O,C.assignee=F,await de()}}})}function vt(){s.querySelectorAll(".btn-delete-card-ticket").forEach(i=>{i.onclick=async r=>{r.stopPropagation(),r.preventDefault();const f=i.dataset.ticketId,h=i.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${h}?`)){i.disabled=!0;try{await it(`/tickets/${f}`),$(`Ticket ${h} deleted`,!1),await de()}catch(M){$(M.message||"Failed to delete ticket",!0),i.disabled=!1}}}}),s.querySelectorAll(".ci-360-card").forEach(i=>{i.onclick=r=>{if(r.target.tagName==="A"||r.target.closest(".btn-delete-card-ticket"))return;const f=i.dataset.ticketId;ct(f)}})}function Re(){const i=s.querySelector("#btn-ci-360-refresh");i&&(i.onclick=async()=>{await de(),$("Board updated",!1)});const r=s.querySelector("#btn-ci-360-create-ticket");r&&(r.onclick=()=>{l()});const f=s.querySelector("#ci-360-search-input");let h=null;f&&(f.oninput=_=>{clearTimeout(h),h=setTimeout(async()=>{E.search=_.target.value.trim(),je(),await de()},300)});const M=s.querySelector("#ci-360-filter-priority");M&&(M.onchange=async _=>{E.priority=_.target.value,je(),await de()});const j=s.querySelector("#ci-360-filter-category");j&&(j.onchange=async _=>{E.category=_.target.value,je(),await de()});const C=s.querySelector("#ci-360-filter-job");C&&(C.onchange=async _=>{E.jobId=_.target.value,je(),await de()});const z=s.querySelector("#ci-360-filter-assignee");z&&(z.onchange=async _=>{E.assigneeId=_.target.value,je(),await de()});const O=s.querySelector("#ci-360-pill-my-issues");O&&(O.onclick=async()=>{E.myIssuesOnly=!E.myIssuesOnly,O.classList.toggle("active",E.myIssuesOnly),je(),await de()});const F=s.querySelector("#ci-360-pill-scope-all"),U=s.querySelector("#ci-360-pill-scope-assigned"),y=s.querySelector("#ci-360-pill-scope-created"),T=async _=>{E.scope=_,F&&F.classList.toggle("active",_==="all"),U&&U.classList.toggle("active",_==="assigned"),y&&y.classList.toggle("active",_==="created"),je(),await de()};F&&(F.onclick=()=>T("all")),U&&(U.onclick=()=>T("assigned")),y&&(y.onclick=()=>T("created"));const X=s.querySelector("#ci-360-clear-filters");X&&(X.onclick=async()=>{E={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},f&&(f.value=""),M&&(M.value="all"),j&&(j.value="all");const _=s.querySelector("#ci-360-filter-job");_&&(_.value="all"),z&&(z.value="all"),O&&O.classList.remove("active"),F&&F.classList.add("active"),U&&U.classList.remove("active"),y&&y.classList.remove("active"),je(),await de()})}function je(){const i=s.querySelector("#ci-360-clear-filters");if(!i)return;const r=E.search||E.priority!=="all"||E.category!=="all"||E.jobId&&E.jobId!=="all"||E.assigneeId!=="all"||E.myIssuesOnly||E.scope&&E.scope!=="all";i.style.display=r?"inline":"none"}async function de(){await Qe(),dt()}async function ct(i){const r=s.querySelector("#ci-360-modals-root");if(r){r.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{q=await ze(`/tickets/${i}`)}catch(f){$(f.message||"Could not load ticket",!0),r.innerHTML="";return}we()}}function we(){const i=s.querySelector("#ci-360-modals-root");if(!i||!q)return;const r=q,f=Et.find(t=>t.key===r.category)||Et[0];jt.find(t=>t.key===r.priority)||jt[2];const h=r.subtasks||[],M=h.filter(t=>t.completed).length,j=h.length>0?Math.round(M/h.length*100):0,C=r.attachments||[],z=r.comments||[],O=(r.history||[]).slice().reverse(),F=r.workLogs||[],U=r.linkedTickets||[],y=g?._id||g?.id,T=r.reporter&&r.reporter.userId&&String(r.reporter.userId)===String(y)||r.userId&&String(r.userId)===String(y),X=e==="superadmin"||g?.role==="superadmin",_=T||X,L=Array.isArray(r.assignees)&&r.assignees.length>0?r.assignees:r.assignee&&r.assignee.userId?[r.assignee]:[];L.some(t=>t&&t.userId&&String(t.userId)===String(y));const c=r.jobId?._id?r.jobId._id.toString():r.jobId?r.jobId.toString():"",n=r.jobTitle||r.jobId&&r.jobId.title||"";i.innerHTML=`
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
                    ${H?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${H?`
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
                    ${r.description?Sa(r.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
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
                  <span>Attachments (${C.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${C.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${C.map(t=>{const k=t.type&&t.type.includes("video")||t.name&&t.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||t.url&&t.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
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
                  <span>Subtasks (${M}/${h.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${j}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${j}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${h.map(t=>`
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
                  <span>Linked Work Items (${U.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${U.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${U.map(t=>`
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
                    ${n?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${n?`
                  <div class="ci-360-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div class="ci-360-job-card-title" style="font-weight:700;font-size:13px;">${v(n)}</div>
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
                    Comments (${z.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${W==="history"?"active":""}" data-act-tab="history">
                    History (${O.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${W==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${F.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${W==="comments"?`
                  <div class="ci-360-comments-feed">
                    ${z.map(t=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(t.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${v(t.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${v(t.userRole)})</span></span>
                            <span class="ci-360-comment-time">${na(t.createdAt)}</span>
                          </div>
                          <div class="ci-360-comment-body">${Sa(t.content)}</div>
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
                    ${O.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:O.map(t=>`
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(t.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${v(t.userName)}</span>
                            <span class="ci-360-comment-time">${na(t.timestamp)}</span>
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
                            <span class="ci-360-comment-time">${na(t.loggedAt)}</span>
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
                    ${R.map(t=>{const k=L.some(A=>A&&A.userId&&String(A.userId)===String(t._id));return`
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
              ${_?`
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
    `,ft()}function ft(){const i=s.querySelector("#ci-360-modals-root");if(!i||!q)return;const r=i.querySelector("#btn-close-ci-360-modal");r&&(r.onclick=pt);const f=i.querySelector("#ci-360-detail-backdrop");f&&(f.onclick=S=>{S.target===f&&pt()});const h=i.querySelector("#inp-detail-title");h&&(h.onchange=async()=>{const S=h.value.trim();if(S)try{q=await at(`/tickets/${q._id}`,{title:S}),await de()}catch(B){$(B.message||"Failed to update title",!0)}});const M=i.querySelector("#btn-toggle-desc-edit");M&&(M.onclick=()=>{H=!H,we()});const j=i.querySelector("#btn-cancel-desc");j&&(j.onclick=()=>{H=!1,we()});const C=i.querySelector("#btn-save-desc");C&&(C.onclick=async()=>{const S=i.querySelector("#inp-detail-desc")?.value;try{q=await at(`/tickets/${q._id}`,{description:S}),H=!1,we(),await de(),$("Description saved",!1)}catch(B){$(B.message||"Failed to save description",!0)}});const z=i.querySelector("#sel-detail-status");z&&(z.onchange=async S=>{try{const B=await at(`/tickets/${q._id}/status`,{status:S.target.value});q=B,we(),await nt(),lt(),await de();const u=B.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${B.status}`;$(u,!1)}catch(B){$(B.message||"Status change failed",!0)}});const O=i.querySelector("#sel-detail-priority");O&&(O.onchange=async S=>{try{q=await at(`/tickets/${q._id}`,{priority:S.target.value}),we(),await de()}catch(B){$(B.message,!0)}});const F=i.querySelector("#btn-toggle-assignee-picker"),U=i.querySelector("#ci-360-detail-assignee-box"),y=i.querySelector("#btn-close-detail-assignee-box"),T=i.querySelector("#btn-save-detail-assignees");F&&U&&(F.onclick=()=>{const S=U.style.display==="none";U.style.display=S?"block":"none"}),y&&U&&(y.onclick=()=>{U.style.display="none"}),i.querySelectorAll(".chk-detail-emp").forEach(S=>{S.onchange=()=>{S.closest(".ci-360-emp-check-item")?.classList.toggle("selected",S.checked)}}),T&&(T.onclick=async()=>{const S=Array.from(i.querySelectorAll(".chk-detail-emp:checked")).map(B=>B.value);try{T.disabled=!0,q=await at(`/tickets/${q._id}`,{assigneeIds:S}),we(),await de(),$("Assignees updated!",!1)}catch(B){$(B.message,!0),T.disabled=!1}}),i.querySelectorAll(".btn-remove-assignee").forEach(S=>{S.onclick=async()=>{const B=S.dataset.userId,oe=(Array.isArray(q.assignees)&&q.assignees.length>0?q.assignees:q.assignee?.userId?[q.assignee]:[]).filter(ie=>ie&&ie.userId&&String(ie.userId)!==String(B)).map(ie=>String(ie.userId));try{q=await at(`/tickets/${q._id}`,{assigneeIds:oe}),we(),await de(),$("Assignee removed",!1)}catch(ie){$(ie.message,!0)}}});const X=i.querySelector("#sel-detail-category");X&&(X.onchange=async S=>{try{q=await at(`/tickets/${q._id}`,{category:S.target.value}),we(),await de()}catch(B){$(B.message,!0)}});const _=i.querySelector("#inp-detail-duedate");_&&(_.onchange=async S=>{try{q=await at(`/tickets/${q._id}`,{dueDate:S.target.value||null}),we(),await de()}catch(B){$(B.message,!0)}});const L=i.querySelector("#sel-detail-job");L&&(L.onchange=async S=>{try{q=await at(`/tickets/${q._id}`,{jobId:S.target.value||null}),we(),await de(),$(S.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(B){$(B.message,!0)}});const c=i.querySelector("#btn-toggle-job-link"),n=i.querySelector("#ci-360-job-link-box");c&&n&&(c.onclick=()=>{n.style.display=n.style.display==="none"?"block":"none"});const t=i.querySelector("#btn-cancel-job-link");t&&n&&(t.onclick=()=>{n.style.display="none"});const k=i.querySelector("#btn-save-job-link");k&&(k.onclick=async()=>{const S=i.querySelector("#inp-modal-job-select")?.value||null;try{q=await at(`/tickets/${q._id}`,{jobId:S}),we(),await de(),$(S?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(B){$(B.message,!0)}});const A=i.querySelector("#btn-unlink-job");A&&(A.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{q=await at(`/tickets/${q._id}`,{jobId:null}),we(),await de(),$("Job unlinked",!1)}catch(S){$(S.message,!0)}});const P=i.querySelector("#inp-detail-esthours");P&&(P.onchange=async S=>{try{q=await at(`/tickets/${q._id}`,{estimatedHours:Number(S.target.value)||0})}catch(B){$(B.message,!0)}}),i.querySelectorAll(".cb-subtask-toggle").forEach(S=>{S.onchange=async()=>{const B=S.dataset.subtaskId;try{q=await at(`/tickets/${q._id}/subtasks/${B}`,{completed:S.checked}),we(),await de()}catch(u){$(u.message,!0)}}}),i.querySelectorAll(".btn-del-subtask").forEach(S=>{S.onclick=async()=>{const B=S.dataset.subtaskId;try{q=await it(`/tickets/${q._id}/subtasks/${B}`),we(),await de()}catch(u){$(u.message,!0)}}});const D=i.querySelector("#inp-new-subtask"),Y=i.querySelector("#btn-add-subtask"),ee=async()=>{const S=D?.value.trim();if(S)try{q=await ve(`/tickets/${q._id}/subtasks`,{title:S}),we(),await de()}catch(B){$(B.message,!0)}};Y&&(Y.onclick=ee),D&&(D.onkeydown=S=>{S.key==="Enter"&&(S.preventDefault(),ee())});const N=i.querySelector("#btn-toggle-add-link"),I=i.querySelector("#add-link-form"),Q=i.querySelector("#btn-cancel-new-link"),ne=i.querySelector("#btn-save-new-link"),ae=i.querySelector("#inp-new-link-url"),pe=i.querySelector("#inp-new-link-title");N&&I&&(N.onclick=()=>{const S=I.style.display==="none";I.style.display=S?"block":"none",S&&ae&&ae.focus()}),Q&&I&&(Q.onclick=()=>{I.style.display="none",ae&&(ae.value=""),pe&&(pe.value="")}),ne&&ae&&(ne.onclick=async()=>{const S=ae.value.trim(),B=pe?.value.trim()||"";if(!S){$("Please enter a valid URL link",!0);return}try{ne.disabled=!0,ne.textContent="Saving...",q=await ve(`/tickets/${q._id}/links`,{url:S,title:B}),we(),await de(),$("Reference link added! 🔗",!1)}catch(u){$(u.message||"Failed to save link",!0),ne.disabled=!1,ne.textContent="Save Link 🔗"}}),i.querySelectorAll(".btn-copy-link").forEach(S=>{S.onclick=()=>{const B=S.dataset.url;B&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(B).then(()=>{$("Link copied to clipboard! 📋")}).catch(()=>{$("Link: "+B)}):$("Link: "+B))}}),i.querySelectorAll(".btn-del-link").forEach(S=>{S.onclick=async()=>{const B=S.dataset.linkId;try{q=await it(`/tickets/${q._id}/links/${B}`),we(),await de(),$("Link removed")}catch(u){$(u.message||"Failed to remove link",!0)}}});const ge=i.querySelector("#btn-trigger-detail-upload"),le=i.querySelector("#inp-detail-att-upload"),xe=i.querySelector("#detail-att-upload-progress");ge&&le&&(ge.onclick=S=>{S.preventDefault(),le.click()}),le&&(le.onchange=async()=>{const S=Array.from(le.files||[]);if(le.value="",!!S.length){xe&&(xe.style.display="block",xe.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${S.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const u=(await fa(S,oe=>{const ie=i.querySelector("#att-prog-pct"),Te=i.querySelector("#att-prog-bar");ie&&(ie.textContent=`${oe}%`),Te&&(Te.style.width=`${oe}%`)})).map(oe=>({name:oe.name,url:oe.url,size:oe.size||0,type:oe.type||"application/octet-stream"}));u.length&&(q=await ve(`/tickets/${q._id}/attachments`,{attachments:u}),we(),$(`Successfully attached ${u.length} file(s)! 📎`,!1))}catch(B){console.error("Upload error:",B),$(`Upload failed: ${B.message}`,!0)}finally{xe&&(xe.style.display="none")}}}),i.querySelectorAll(".btn-play-att-video").forEach(S=>{S.onclick=()=>{const B=S.dataset.slot,u=i.querySelector("#"+B);if(u){const oe=u.style.display==="none";u.style.display=oe?"block":"none",S.textContent=oe?"⏸ Close Video":"▶ Play Video";const ie=u.querySelector("video");ie&&oe?ie.play().catch(()=>{}):ie&&ie.pause()}}}),i.querySelectorAll(".btn-del-att").forEach(S=>{S.onclick=async()=>{const B=S.dataset.attId;try{q=await it(`/tickets/${q._id}/attachments/${B}`),we()}catch(u){$(u.message,!0)}}}),i.querySelectorAll(".ci-360-act-tab").forEach(S=>{S.onclick=()=>{W=S.dataset.actTab,we()}});const We=i.querySelector("#inp-new-comment"),Z=i.querySelector("#btn-submit-comment");Z&&We&&(Z.onclick=async()=>{const S=We.value.trim();if(S)try{Z.disabled=!0,Z.textContent="Saving...",q=await ve(`/tickets/${q._id}/comments`,{content:S}),we(),$("Comment added",!1)}catch(B){$(B.message||"Failed to add comment",!0)}finally{Z.disabled=!1}});const De=i.querySelector("#btn-open-link-dialog"),Ne=i.querySelector("#ci-360-link-box"),ue=i.querySelector("#btn-cancel-link"),Se=i.querySelector("#btn-submit-link"),ye=i.querySelector("#inp-link-target"),Oe=i.querySelector("#sel-link-rel");De&&Ne&&(De.onclick=()=>{Ne.style.display="block"}),ue&&Ne&&(ue.onclick=()=>{Ne.style.display="none"}),Se&&Ne&&(Se.onclick=async()=>{const S=ye?.value.trim(),B=Oe?.value||"relates to";if(S)try{Se.disabled=!0,q=await ve(`/tickets/${q._id}/links`,{targetTicketId:S,relationship:B}),we(),$(`Linked with ${S}`,!1)}catch(u){$(u.message||"Failed to link ticket",!0)}finally{Se.disabled=!1}}),i.querySelectorAll(".btn-del-link").forEach(S=>{S.onclick=async()=>{const B=S.dataset.linkId;try{q=await it(`/tickets/${q._id}/links/${B}`),we()}catch(u){$(u.message,!0)}}});const Ue=i.querySelector("#btn-open-worklog-dialog"),ce=i.querySelector("#ci-360-worklog-box"),Me=i.querySelector("#btn-cancel-worklog"),qe=i.querySelector("#btn-submit-worklog"),Ee=i.querySelector("#inp-worklog-time"),Ie=i.querySelector("#inp-worklog-desc");Ue&&ce&&(Ue.onclick=()=>{ce.style.display="block"}),Me&&ce&&(Me.onclick=()=>{ce.style.display="none"}),qe&&ce&&(qe.onclick=async()=>{const S=Ee?.value.trim(),B=Ie?.value.trim();if(!S){$("Enter time spent (e.g. 2h 30m)",!0);return}try{qe.disabled=!0,q=await ve(`/tickets/${q._id}/worklogs`,{timeSpent:S,description:B}),we(),$("Work logged",!1)}catch(u){$(u.message||"Failed to log work",!0)}finally{qe.disabled=!1}});const Pe=i.querySelector("#btn-delete-ticket");Pe&&(Pe.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${q.ticketId}?`))try{Pe.disabled=!0,await it(`/tickets/${q._id}`),$(`Ticket ${q.ticketId} deleted`,!1),pt(),await nt(),lt(),await de()}catch(S){$(S.message||"Failed to delete ticket",!0),Pe.disabled=!1}})}function pt(){q=null,H=!1;const i=s.querySelector("#ci-360-modals-root");i&&(i.innerHTML="")}function l(i=null){const r=s.querySelector("#ci-360-modals-root");if(!r)return;const f=i||(E.jobId&&E.jobId!=="all"?E.jobId:null);r.innerHTML=`
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
                  ${Et.map(n=>`<option value="${n.key}">${n.icon} ${n.label}</option>`).join("")}
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
                  ${R.map(n=>{const t=g&&String(g._id||g.id)===String(n._id);return`
                      <label class="ci-360-emp-check-item ${t?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${n._id}" ${t?"checked":""} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(n.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${v(n.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(n.role)})${t?" — (You)":""}</span>
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
                  ${J.map(n=>`
                    <option value="${n._id}" ${f&&String(f)===String(n._id)?"selected":""}>
                      📁 ${v(n.title||"Untitled Job")}
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
    `;const h=()=>{r.querySelectorAll(".ci-360-emp-check-item").forEach(n=>{const t=n.querySelector(".chk-create-emp");n.classList.toggle("selected",!!t?.checked)})};r.querySelectorAll(".chk-create-emp").forEach(n=>{n.onchange=h});const M=r.querySelector("#btn-create-assign-self");M&&g&&(M.onclick=()=>{const n=String(g._id||g.id);r.querySelectorAll(".chk-create-emp").forEach(t=>{t.value===n&&(t.checked=!0)}),h()});const j=r.querySelector("#btn-create-clear-assign");j&&(j.onclick=()=>{r.querySelectorAll(".chk-create-emp").forEach(n=>{n.checked=!1}),h()});const C=[],z=r.querySelector("#inp-create-ticket-att"),O=r.querySelector("#create-att-list"),F=r.querySelector("#create-att-count"),U=r.querySelector("#create-att-progress"),y=()=>{F&&(F.textContent=`${C.length} file(s) attached`),O&&(O.innerHTML=C.map((n,t)=>{const k=n.type&&n.type.includes("video")||n.name&&n.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${k?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${v(n.name)}">${v(n.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${ma(n.size)} ${k?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${t}" title="Remove">&times;</button>
          </div>
        `}).join(""),O.querySelectorAll(".btn-del-pending-att").forEach(n=>{n.onclick=()=>{C.splice(Number(n.dataset.idx),1),y()}}))};z&&(z.onchange=async()=>{const n=Array.from(z.files||[]);if(z.value="",!!n.length){U&&(U.style.display="block",U.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${n.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await fa(n,k=>{const A=r.querySelector("#create-prog-pct"),P=r.querySelector("#create-prog-bar");A&&(A.textContent=`${k}%`),P&&(P.style.width=`${k}%`)})).forEach(k=>{C.push({name:k.name,url:k.url,size:k.size||0,type:k.type||"application/octet-stream"})}),y()}catch(t){$(`Failed to upload files: ${t.message}`,!0)}finally{U&&(U.style.display="none"),z.value=""}}});const T=()=>{r.innerHTML=""},X=r.querySelector("#btn-close-create-modal");X&&(X.onclick=T);const _=r.querySelector("#btn-cancel-create-ticket");_&&(_.onclick=T);const L=r.querySelector("#ci-360-create-backdrop");L&&(L.onclick=n=>{n.target===L&&T()});const c=r.querySelector("#btn-submit-create-ticket");c&&(c.onclick=async()=>{const n=r.querySelector("#create-ticket-title")?.value.trim(),t=r.querySelector("#create-ticket-desc")?.value.trim(),k=r.querySelector("#create-ticket-cat")?.value||"Task",A=r.querySelector("#create-ticket-pri")?.value||"Medium",D=Array.from(r.querySelectorAll(".chk-create-emp:checked")).map(I=>I.value),Y=r.querySelector("#create-ticket-duedate")?.value||null,ee=r.querySelector("#create-ticket-job")?.value||null,N=r.querySelector("#create-ticket-url")?.value.trim()||"";if(!n){$("Ticket summary / title is required",!0);return}try{c.disabled=!0,c.textContent="Creating...";const I=await ve("/tickets",{title:n,description:t,category:k,priority:A,assigneeIds:D,assigneeId:D[0]||null,dueDate:Y,jobId:ee,linkUrl:N,attachments:C});$(`Ticket ${I.ticketId} created! 🎫`,!1),T(),await nt(),lt(),await de(),ct(I._id)}catch(I){$(I.message||"Could not create ticket",!0),c.disabled=!1,c.textContent="Create Ticket 🚀"}})}s._openCreateTicketModal=l,s._openTicketDetailModal=ct,s._setJobFilter=async i=>{E.jobId=i||"all";const r=s.querySelector("#ci-360-filter-job");r&&(r.value=E.jobId),je(),await de()}}export{li as a,si as b,ri as i};
