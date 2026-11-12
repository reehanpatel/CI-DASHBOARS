import{c as Le,k as S,e as v,x as Ta,y as tt,l as at,z as Fa,p as zt,A as Pa,B as ma,m as Jt,j as xe,C as za,E as La,F as fa,G as ia,H as ha}from"./api-De5hpWjE.js";const xa={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function Ma(){try{const s=localStorage.getItem("ci360_planner_settings");if(s)return Object.assign({},xa,JSON.parse(s))}catch{}return Object.assign({},xa)}function Ba(s){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(s))}catch{}}function Ge(){const s=new Date,n=s.getFullYear(),a=String(s.getMonth()+1).padStart(2,"0"),g=String(s.getDate()).padStart(2,"0");return`${n}-${a}-${g}`}function Kt(s,n){const a=new Date(s+"T00:00:00");a.setDate(a.getDate()+n);const g=a.getFullYear(),k=String(a.getMonth()+1).padStart(2,"0"),f=String(a.getDate()).padStart(2,"0");return`${g}-${k}-${f}`}function Dt(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function ze(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function qa(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function qt(s,n=1){const a=new Date(s+"T00:00:00"),g=a.getDay(),k=(g<n?7:0)+g-n,f=new Date(a);f.setDate(a.getDate()-k);const c=[];for(let r=0;r<7;r++){const O=new Date(f);O.setDate(f.getDate()+r);const Q=O.getFullYear(),E=String(O.getMonth()+1).padStart(2,"0"),q=String(O.getDate()).padStart(2,"0");c.push(`${Q}-${E}-${q}`)}return c}function ja(){try{const s=window.AudioContext||window.webkitAudioContext;if(!s)return;const n=new s,a=n.currentTime,g=n.createOscillator(),k=n.createGain();g.type="sine",g.frequency.setValueAtTime(523.25,a),g.frequency.exponentialRampToValueAtTime(783.99,a+.15),k.gain.setValueAtTime(.2,a),k.gain.exponentialRampToValueAtTime(.001,a+.35),g.connect(k),k.connect(n.destination),g.start(a),g.stop(a+.35)}catch{}}function un(s,n={}){const{userRole:a="employee",currentUser:g=null,onNavigate:k=null}=n,f=a==="superadmin"||a==="admin";let c=Ma(),r={selectedDate:Ge(),viewMode:"daily",filterStatus:"all",searchQuery:"",groupByEmployee:f,collapsedEmployees:{},selectedCategory:"all",selectedPersonnelId:"all",reportPersonnelId:"all",tasks:[],personnelList:[],clientList:[],loading:!1};Ra(),O();async function O(){r.loading=!0,Q();try{const e=[Le("/tasks"),Le("/personnel").catch(()=>[]),Le("/clients").catch(()=>[])],[o,m,y]=await Promise.all(e);r.tasks=Array.isArray(o)?o:[],m&&(r.personnelList=Array.isArray(m)?m:[]),y&&(r.clientList=Array.isArray(y)?y:[])}catch(e){S("Failed to load planner tasks: "+e.message,!0)}finally{r.loading=!1,H()}}function Q(){s.innerHTML=`
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
    `}function E(e){return r.tasks.filter(o=>{if(o.isDeleted===!0)return!1;if(f&&r.selectedPersonnelId!=="all"){const A=o.personnelId?._id||o.personnelId,F=String(A)===String(r.selectedPersonnelId),j=Array.isArray(o.coOwners)&&o.coOwners.some(C=>{const z=C.personnelId?._id||C.personnelId||C.userId?._id||C.userId;return String(z)===String(r.selectedPersonnelId)});if(!F&&!j)return!1}const m=o.completionDateStr||o.dateStr||(o.dueDate?new Date(o.dueDate).toISOString().slice(0,10):""),y=o.assignedDateStr||(o.assignedDate?new Date(o.assignedDate).toISOString().slice(0,10):"")||(o.createdAt?new Date(o.createdAt).toISOString().slice(0,10):"")||m;if(o.status==="In Progress"){const A=y&&m&&y<=m?y:m||y,F=y&&m&&y<=m?m:y||m;if(A&&F){if(e>=A&&e<=F)return!0}else{if(m&&m===e)return!0;if(y&&y===e)return!0}}return m&&m===e||o.status!=="Completed"&&y&&y===e?!0:!m&&!y?e===Ge():!1})}function q(e,o){if(e.status==="Completed")return!1;const m=e.completionDateStr||e.dateStr||(e.dueDate?new Date(e.dueDate).toISOString().slice(0,10):"");return m?m<o:!1}function W(e,o){const m=e.length,y=e.filter(z=>z.status==="Completed").length,A=e.filter(z=>z.status==="In Progress").length,F=e.filter(z=>z.status==="Pending"||z.status==="Todo").length,j=e.filter(z=>q(z,o)).length,C=m>0?Math.round(y/m*100):0;return{total:m,completed:y,inProgress:A,pending:F,overdue:j,percent:C}}function H(){const e=Ge(),o=r.selectedDate===e,m=E(r.selectedDate),y=W(m,e);s.innerHTML=`
      <div class="ci360-planner-wrap ${c.density==="compact"?"is-compact":""}">
        
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
              <h1 class="ci360-planner-heading">${v(c.displayName||"Daily Planner")}</h1>
              <p class="ci360-planner-subheading">Plan your day. Track your progress.</p>
            </div>
          </div>

          <div class="ci360-planner-header-actions">
            <!-- View Mode Switcher -->
            <div class="ci360-view-switcher" role="tablist">
              <button type="button" class="ci360-switch-btn ${r.viewMode==="daily"?"active":""}" id="btnViewDaily" title="Daily View">
                <span>📅 Daily</span>
              </button>
              <button type="button" class="ci360-switch-btn ${r.viewMode==="weekly"?"active":""}" id="btnViewWeekly" title="Weekly View">
                <span>🗓️ Weekly</span>
              </button>
              <button type="button" class="ci360-switch-btn ${r.viewMode==="report"?"active":""}" id="btnViewReport" title="Weekly Analytics & Report">
                <span>📊 Report</span>
              </button>
            </div>

            <!-- Primary Add Task Button -->
            <button type="button" class="ci360-btn-primary ${r.selectedDate<e?"is-locked-past":""}" id="btnOpenAddTaskModal" title="${r.selectedDate<e?"Cannot add tasks on previous dates (switch to today or later)":"Add Task"}">
              ${r.selectedDate<e?`
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Add Task (Past Date)</span>
              `:`
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Add Task</span>
              `}
            </button>

            <!-- Recent Tasks Button -->
            <button type="button" class="ci360-btn-secondary" id="btnOpenRecentModal" title="See latest added, completed, or changed tasks" style="display:inline-flex;align-items:center;gap:6px;font-weight:600;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Recent</span>
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
              <span class="date-text" id="displayDateLabel">${Dt(r.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${r.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${o?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${f?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${r.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${r.personnelList.map(A=>`
                  <option value="${A._id}" ${r.selectedPersonnelId===String(A._id)?"selected":""}>
                    ${v(A.name)} (${v(A.department||A.role||"Team")})
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
              <div class="ci360-circular-progress" style="--val: ${y.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${y.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${y.percent}%</span>
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
                  <span class="kpi-num">${y.total}</span>
                  <span class="kpi-label">Total Tasks</span>
                </div>
              </div>
              <div class="kpi-box completed">
                <div class="kpi-icon-wrap completed">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${y.completed}</span>
                  <span class="kpi-label">Completed</span>
                </div>
              </div>
              <div class="kpi-box in-progress">
                <div class="kpi-icon-wrap in-prog">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${y.inProgress}</span>
                  <span class="kpi-label">In Progress</span>
                </div>
              </div>
              <div class="kpi-box pending">
                <div class="kpi-icon-wrap pending">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14M5 2h14m-2 20v-5a5 5 0 0 0-2.83-4.5A5 5 0 0 0 17 7V2M7 22v-5a5 5 0 0 1 2.83-4.5A5 5 0 0 1 7 7V2"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${y.pending}</span>
                  <span class="kpi-label">Pending</span>
                </div>
              </div>
              ${y.overdue>0?`
                <div class="kpi-box overdue">
                  <div class="kpi-icon-wrap overdue">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <div class="kpi-text-wrap">
                    <span class="kpi-num">${y.overdue}</span>
                    <span class="kpi-label">Overdue</span>
                  </div>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${y.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${be(m,y)}
        </main>

      </div>
    `,lt(),Me()}function be(e,o){return r.viewMode==="weekly"?bt():r.viewMode==="report"?Ft():$e(e,o)}function $e(e,o){const m=Ge(),y=r.selectedDate<m;let A=e;if(r.filterStatus==="pending"?A=A.filter(C=>C.status==="Pending"||C.status==="Todo"):r.filterStatus==="in_progress"?A=A.filter(C=>C.status==="In Progress"):r.filterStatus==="completed"?A=A.filter(C=>C.status==="Completed"):r.filterStatus==="overdue"?A=A.filter(C=>q(C,m)):r.filterStatus==="recent"&&(A=[...e].sort((C,z)=>new Date(z.updatedAt||z.createdAt||0)-new Date(C.updatedAt||C.createdAt||0))),r.searchQuery){const C=r.searchQuery.toLowerCase().trim();A=A.filter(z=>{const L=(z.title||"").toLowerCase(),p=(z.description||"").toLowerCase(),B=(z.category||"").toLowerCase(),h=(z.clientName||"").toLowerCase(),T=(z.personnelId?.name||z.userId?.name||"").toLowerCase(),U=(z.createdByName||z.createdBy?.name||(z.createdBy?.email?z.createdBy.email.split("@")[0]:"")).toLowerCase(),_=Array.isArray(z.coOwners)?z.coOwners.map(i=>(i.name||"").toLowerCase()).join(" "):"",d=(z.clientId?.name||z.jobId?.clientId?.name||"").toLowerCase();return L.includes(C)||p.includes(C)||B.includes(C)||h.includes(C)||T.includes(C)||U.includes(C)||_.includes(C)||d.includes(C)})}r.filterStatus!=="recent"&&A.sort((C,z)=>{if(C.status==="Completed"&&z.status!=="Completed")return 1;if(C.status!=="Completed"&&z.status==="Completed")return-1;const L={Urgent:0,High:1,Medium:2,Low:3};return(L[C.priority]||2)-(L[z.priority]||2)});const F=new Map;A.forEach(C=>{let z="unassigned",L="Unassigned / Team",p="",B="";C.personnelId&&typeof C.personnelId=="object"&&C.personnelId._id?(z=String(C.personnelId._id),L=C.personnelId.name||"Team Member",B=C.personnelId.role||"Personnel",p=C.personnelId.department||""):C.userId&&typeof C.userId=="object"&&C.userId._id?(z=String(C.userId._id),L=C.userId.name||"User",B=C.userId.role||"Member"):(C.createdByName||C.createdBy&&C.createdBy.name)&&(L=C.createdByName||C.createdBy.name,z="creator_"+L.toLowerCase().replace(/[^a-z0-9]/g,"_"),B="Creator"),F.has(z)||F.set(z,{key:z,name:L,department:p,role:B,tasks:[]}),F.get(z).tasks.push(C)});const j=Array.from(F.values()).sort((C,z)=>C.key==="unassigned"?1:z.key==="unassigned"?-1:C.name.localeCompare(z.name));return`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <h2 class="ci360-focus-title" style="margin:0;">
              <span class="accent-dot"></span>
              ${y?"Focus Archive":"Today's Focus"}
            </h2>
            <span class="ci360-task-count-badge">${A.length} ${A.length===1?"task":"tasks"}</span>
            ${y?"":`
              <button type="button" class="ci360-btn-primary" id="btnFocusAddTask" style="padding:6px 14px;font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:6px;border-radius:var(--r-md);margin-left:4px;cursor:pointer;box-shadow:0 2px 6px rgba(0,112,243,0.25);">
                <span style="font-size:15px;line-height:1;font-weight:800;">+</span> Add Task
              </button>
            `}
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${r.filterStatus==="all"?"active":""}" data-f="all">All (${o.total})</button>
              <button type="button" class="filter-pill ${r.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${o.pending})</button>
              <button type="button" class="filter-pill ${r.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${o.inProgress})</button>
              <button type="button" class="filter-pill ${r.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${o.completed})</button>
              <button type="button" class="filter-pill ${r.filterStatus==="recent"?"active":""}" data-f="recent" title="Latest added, completed, or changed tasks">🕒 Recent</button>
              ${o.overdue>0?`
                <button type="button" class="filter-pill overdue ${r.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${o.overdue})</button>
              `:""}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${f?`
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${r.groupByEmployee?"active":""}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${r.groupByEmployee?"By Employee":"Flat List"}
                </button>
                ${r.groupByEmployee&&j.length>0?`
                  <button type="button" class="filter-pill" id="btnExpandAllEmp" title="Expand all employee tasks">⊞ Expand</button>
                  <button type="button" class="filter-pill" id="btnCollapseAllEmp" title="Collapse all employee tasks">⊟ Collapse</button>
                `:""}
              </div>
            `:""}

            <!-- Search Bar with employee search support -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks, client name, employee or co-owner..." value="${v(r.searchQuery)}">
              ${r.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Past Date Banner (Only for Previous Dates) -->
        ${y?`
          <div class="ci360-past-date-banner">
            <div class="past-banner-icon">🔒</div>
            <div class="past-banner-body">
              <div class="past-banner-title">Previous Date (${ze(r.selectedDate)})</div>
              <div class="past-banner-desc">
                Adding new tasks on previous dates is restricted. You can edit existing tasks, adjust completion dates, or mark tasks as completed.
              </div>
            </div>
          </div>
        `:""}

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${A.length===0?Je(y):f&&r.groupByEmployee?`
              <div class="ci360-emp-groups-container">
                ${j.map(C=>{const z=!!r.collapsedEmployees[C.key],L=C.tasks.filter(T=>T.status==="Completed").length,p=C.tasks.filter(T=>T.status==="In Progress").length,B=C.tasks.filter(T=>T.status==="Pending"||T.status==="Todo").length,h=C.tasks.length>0?Math.round(L/C.tasks.length*100):0;return`
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
                          <span class="emp-stat-pill done">${L} done</span>
                          ${p>0?`<span class="emp-stat-pill in-prog">${p} in progress</span>`:""}
                          ${B>0?`<span class="emp-stat-pill pending">${B} pending</span>`:""}
                          <div class="emp-mini-bar-wrap" title="${h}% completed">
                            <div class="emp-mini-bar-fill" style="width:${h}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${z?"":`
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${C.tasks.map(T=>nt(T,m)).join("")}
                          </div>
                        </div>
                      `}
                    </div>
                  `}).join("")}
              </div>
            `:`
              <div class="ci360-task-list">
                ${A.map(C=>nt(C,m)).join("")}
              </div>
            `}
        </div>

      </div>
    `}function Je(e=!1){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">${e?"📜":"✨"}</div>
        <h3>No tasks found for ${ze(r.selectedDate)}</h3>
        <p>${e?"No scheduled tasks were recorded on this past date.":"Your schedule is clean and ready. Add your first priority task above or import your daily agenda."}</p>
        ${e?"":`
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
    `}function nt(e,o){const m=e.status==="Completed",y=q(e,o),A=e.completionDateStr||e.dateStr||(e.dueDate?new Date(e.dueDate).toISOString().slice(0,10):o),F=e.assignedDateStr||(e.assignedDate?new Date(e.assignedDate).toISOString().slice(0,10):"")||(e.createdAt?new Date(e.createdAt).toISOString().slice(0,10):""),j=e.status==="In Progress"&&F&&A&&F!==A,C=`pri-${(e.priority||"medium").toLowerCase()}`,z=`status-${(e.status||"pending").toLowerCase().replace(/\s+/g,"-")}`,L=e.createdByName||e.createdBy?.name||(e.createdBy?.email?e.createdBy.email.split("@")[0]:"")||e.personnelId?.name||e.userId?.name||"";return`
      <div class="ci360-task-card ${m?"is-completed":""} ${y?"is-overdue":""}" data-id="${e._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${m?"checked":""}" data-action="toggle" data-id="${e._id}" title="${m?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${v(e.title)}</span>
          </div>

          ${e.description?`
            <div class="ci360-task-desc">${v(e.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${C}">
              <span class="badge-dot"></span>
              ${v(e.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${z}">
              ${v(e.status||"Pending")}
            </span>

            <!-- Completion Date / Date Span Badge (Always Visible & Prominent) -->
            ${j?`
              <span class="ci360-badge completion-badge" style="background:rgba(59,130,246,0.15);color:#3b82f6;border-color:rgba(59,130,246,0.3);" title="In Progress from ${ze(F)} to ${ze(A)}">
                📅 ${ze(F)} ➔ Due: ${ze(A)}
              </span>
            `:`
              <span class="ci360-badge completion-badge" title="Target Completion Date: ${A}">
                📅 Due: ${ze(A)}
              </span>
            `}

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${e.rescheduledFrom&&e.rescheduledFrom!==A?`
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${ze(e.rescheduledFrom)} to ${ze(A)} (${e.dateChangeCount||1} change${(e.dateChangeCount||1)>1?"s":""})">
                🔄 Date Changed: ${ze(e.rescheduledFrom)} ➔ ${ze(A)}
              </span>
            `:""}

            <!-- Added By Badge (Shows Who Created the Task) -->
            ${L?`
              <span class="ci360-badge creator-badge" title="Created / Added by: ${v(L)}">
                ✍️ Added by: ${v(L)}
              </span>
            `:""}

            <!-- Category (Hide if empty or General) -->
            ${e.category&&e.category.trim()&&e.category.trim().toLowerCase()!=="general"?`
              <span class="ci360-badge category-badge">
                #${v(e.category)}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${y?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name (if different from addedByName) -->
            ${f&&(e.personnelId?.name||e.userId?.name)&&(e.personnelId?.name||e.userId?.name)!==L?`
              <span class="ci360-badge personnel-badge" title="Assigned Employee">
                👤 Assigned: ${v(e.personnelId?.name||e.userId?.name)}
              </span>
            `:""}

            <!-- Co-Owners Badge (Multiple People) -->
            ${Array.isArray(e.coOwners)&&e.coOwners.length>0?`
              <span class="ci360-badge coowner-badge" style="background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);" title="Co-Owners: ${e.coOwners.map(p=>p.name).filter(Boolean).join(", ")}">
                👥 Co-Owners: ${v(e.coOwners.map(p=>p.name).filter(Boolean).join(", "))}
              </span>
            `:""}

            <!-- Client Badge -->
            ${e.clientName||e.clientId?.name||e.jobId?.clientId?.name?`
              <span class="ci360-badge client-badge" style="background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.25);" title="Client: ${v(e.clientName||e.clientId?.name||e.jobId?.clientId?.name)}">
                🏢 ${v(e.clientName||e.clientId?.name||e.jobId?.clientId?.name)}
              </span>
            `:""}

            <!-- Attachments Badge -->
            ${Array.isArray(e.attachments)&&e.attachments.length>0?`
              <span class="ci360-badge attachments-badge btn-view-task-atts" data-id="${e._id}" style="background:rgba(59,130,246,0.12);color:#2563eb;border:1px solid rgba(59,130,246,0.25);cursor:pointer;" title="Click to view/edit ${e.attachments.length} attachment(s)">
                📎 ${e.attachments.length} file${e.attachments.length===1?"":"s"}
              </span>
            `:""}
          </div>

          <!-- Image Thumbnails Strip if any -->
          ${Array.isArray(e.attachments)&&e.attachments.some(p=>p.type&&p.type.startsWith("image/")||p.name&&p.name.match(/\.(png|jpe?g|gif|webp|svg)$/i))?`
            <div class="ci360-task-thumb-strip">
              ${e.attachments.filter(p=>p.type&&p.type.startsWith("image/")||p.name&&p.name.match(/\.(png|jpe?g|gif|webp|svg)$/i)).slice(0,6).map(p=>`
                <div class="ci360-att-thumb-box btn-preview-task-att" data-url="${v(p.url)}" data-name="${v(p.name)}" title="${v(p.name)}">
                  <img src="${v(p.url)}" alt="${v(p.name)}" loading="lazy" />
                </div>
              `).join("")}
              ${e.attachments.filter(p=>p.type&&p.type.startsWith("image/")||p.name&&p.name.match(/\.(png|jpe?g|gif|webp|svg)$/i)).length>6?`
                <span class="att-more-count">+${e.attachments.filter(p=>p.type&&p.type.startsWith("image/")||p.name&&p.name.match(/\.(png|jpe?g|gif|webp|svg)$/i)).length-6} more</span>
              `:""}
            </div>
          `:""}
        </div>

        <!-- Task Actions Menu: Previous tasks can be edited, deleted, changed by all -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${e._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${e._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function bt(){const e=qt(r.selectedDate,c.weekStartsOn),o=ze(e[0]),m=ze(e[6]),y=Ge(),A=e.flatMap(z=>E(z)),F=new Map;A.forEach(z=>{const L=z._id?String(z._id):JSON.stringify(z);F.set(L,z)});const j=Array.from(F.values()),C=W(j,y);return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${o} – ${m}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 8-Card Modern Weekly Grid (7 Days + Week at a Glance) -->
        <div class="ci360-week-grid modern-grid">
          ${e.map(z=>{const L=z===y,p=z===r.selectedDate,B=E(z),h=W(B,y),T=new Date(z+"T00:00:00"),U=T.toLocaleDateString("en-US",{weekday:"short"}),_=T.toLocaleDateString("en-US",{weekday:"long"}),d=T.toLocaleDateString("en-US",{month:"short"}),i=T.getDate();return`
              <div class="ci360-weekly-day-card ${L?"is-today":""} ${p?"is-selected":""}" data-date="${z}">
                
                <!-- Day Card Header -->
                <div class="weekly-day-header ${L?"today-banner":""}">
                  <div class="day-badge-box">
                    <span class="day-badge-name">${U}</span>
                    <span class="day-badge-num">${i}</span>
                  </div>
                  <div class="day-header-meta">
                    <div class="day-full-name">${_}, ${d} ${i}</div>
                    <div class="day-header-stats-row">
                      <span class="day-done-label">${h.completed}/${h.total} Done</span>
                      <div class="day-progress-track">
                        <div class="day-progress-bar" style="width: ${h.percent}%"></div>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="day-action-clipboard-btn" data-action="add-day" data-date="${z}" title="Add/Manage tasks for ${_}">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                  </button>
                </div>

                <!-- Day Card Tasks List -->
                <div class="weekly-day-tasks">
                  ${B.length===0?`
                    <div class="weekly-empty-state">
                      <span>No tasks scheduled</span>
                    </div>
                  `:B.map(t=>{const b=t.status==="Completed",D=(t.priority||"medium").toLowerCase(),M=t.priority?t.priority.charAt(0).toUpperCase()+t.priority.slice(1).toLowerCase():"Medium";return`
                      <div class="weekly-task-item ${b?"done":""}" data-id="${t._id}">
                        <button type="button" class="weekly-check-btn ${b?"checked":""}" data-action="toggle" data-id="${t._id}" title="Mark ${b?"Incomplete":"Complete"}">
                          ${b?`
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          `:""}
                        </button>
                        <span class="weekly-task-title ${b?"strike":""}" data-action="edit" data-id="${t._id}" title="${v(t.title)}">
                          ${v(t.title)}
                        </span>
                        <span class="weekly-pri-badge pri-${D}">
                          ${M}
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
                  <div class="glance-m-val">${C.total}</div>
                  <div class="glance-m-lbl">Total Tasks</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon completed">✅</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${C.completed}</div>
                  <div class="glance-m-lbl">Completed</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon in-progress">🔄</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${C.inProgress}</div>
                  <div class="glance-m-lbl">In Progress</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon pending">⏳</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${C.pending}</div>
                  <div class="glance-m-lbl">Pending</div>
                </div>
              </div>
            </div>

            <div class="glance-footer">
              <div class="glance-progress-track">
                <div class="glance-progress-bar" style="width: ${C.percent}%"></div>
              </div>
              <div class="glance-progress-caption">
                ${C.completed} / ${C.total} Tasks (${C.percent}% Complete)
              </div>
            </div>
          </div>

        </div>

      </div>
    `}function Ft(){const e=qt(r.selectedDate,c.weekStartsOn),o=Dt(e[0]),m=Dt(e[6]),y=Ge(),A=r.reportPersonnelId||"all",F=r.personnelList.find(T=>String(T._id)===String(A)),j=F?F.name:"",C=r.tasks.filter(T=>{if(T.isDeleted===!0)return!1;const U=T.completionDateStr||T.dateStr||(T.dueDate?new Date(T.dueDate).toISOString().slice(0,10):""),_=T.assignedDateStr||(T.assignedDate?new Date(T.assignedDate).toISOString().slice(0,10):"")||U;if(!(T.status==="In Progress"&&_&&U?e.some(i=>i>=_&&i<=U):e.includes(U)||e.includes(_)))return!1;if(A!=="all"){const i=String(T.personnelId?._id||T.personnelId||""),t=Array.isArray(T.coOwners)&&T.coOwners.some(b=>String(b.personnelId?._id||b.personnelId||b.userId?._id||b.userId||"")===String(A));return i===String(A)||t}return!0}),z=C.length,L=C.filter(T=>T.status==="Completed").length,p=C.filter(T=>T.status==="In Progress").length,B=z>0?Math.round(L/z*100):0,h={Urgent:0,High:0,Medium:0,Low:0};return C.forEach(T=>{const U=T.priority||"Medium";h[U]!==void 0&&h[U]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3);display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span>Week Period: ${o} – ${m}</span>
              ${A!=="all"&&j?`
                <span class="badge blue" style="font-size:11.5px;padding:2px 8px;font-weight:700;">👤 Employee: ${v(j)}</span>
              `:`
                <span class="badge gray" style="font-size:11.5px;padding:2px 8px;font-weight:600;">👥 All Team Members</span>
              `}
            </div>
          </div>

          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            ${f?`
              <div style="display:inline-flex;align-items:center;gap:6px;">
                <label for="selectWeeklyReportEmployee" style="font-size:12px;font-weight:700;color:var(--text-2);white-space:nowrap;">Whose Report:</label>
                <select id="selectWeeklyReportEmployee" class="input" style="padding:6px 12px;font-size:12.5px;font-weight:600;min-width:180px;height:36px;border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);border:1px solid var(--border-sm);">
                  <option value="all" ${A==="all"?"selected":""}>👥 All Team Members</option>
                  ${r.personnelList.map(T=>`
                    <option value="${T._id}" ${String(T._id)===String(A)?"selected":""}>
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
            <span class="value" style="font-size:28px;color:var(--green-500)">${L}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${p}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${B}%</span>
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
                ${e.map(T=>{const U=E(T),_=W(U,y);return`
                    <tr>
                      <td><strong>${qa(T)}</strong></td>
                      <td>${ze(T)}</td>
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
              <div style="font-size:22px;font-weight:700">${h.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${h.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${h.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${h.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function lt(){const e=document.getElementById("btnViewDaily"),o=document.getElementById("btnViewWeekly"),m=document.getElementById("btnViewReport");e&&(e.onclick=()=>{r.viewMode="daily",H()}),o&&(o.onclick=()=>{r.viewMode="weekly",H()}),m&&(m.onclick=()=>{r.viewMode="report",H()});const y=document.getElementById("btnPrevDay"),A=document.getElementById("btnNextDay"),F=document.getElementById("btnJumpToday"),j=document.getElementById("hiddenDateInput"),C=document.getElementById("datePickerBadge");y&&(y.onclick=()=>{r.selectedDate=Kt(r.selectedDate,-1),H()}),A&&(A.onclick=()=>{r.selectedDate=Kt(r.selectedDate,1),H()}),F&&(F.onclick=()=>{r.selectedDate=Ge(),H()}),C&&j&&(C.onclick=()=>{try{typeof j.showPicker=="function"?j.showPicker():j.focus()}catch{j.focus()}},j.onchange=b=>{b.target.value&&(r.selectedDate=b.target.value,H())});const z=document.getElementById("admTeamSelect");z&&(z.onchange=b=>{r.selectedPersonnelId=b.target.value,H()});const L=document.getElementById("btnOpenAddTaskModal");L&&(L.onclick=()=>{if(r.selectedDate<Ge()){S("Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.",!0);return}Be()});const p=document.getElementById("btnOpenRecentModal");p&&(p.onclick=()=>{wt()});const B=document.getElementById("btnPlannerActionsMenu"),h=document.getElementById("plannerActionsDropdown");B&&h&&(B.onclick=b=>{b.stopPropagation(),h.classList.toggle("hidden")},document.addEventListener("click",b=>{!h.contains(b.target)&&b.target!==B&&h.classList.add("hidden")}));const T=document.getElementById("btnActionImport");T&&(T.onclick=()=>{h?.classList.add("hidden"),Re()});const U=document.getElementById("btnActionExportPng");U&&(U.onclick=()=>{h?.classList.add("hidden"),Ve()});const _=document.getElementById("btnActionExportPdf");_&&(_.onclick=()=>{h?.classList.add("hidden"),st()});const d=document.getElementById("btnActionAdminReport");d&&(d.onclick=()=>{h?.classList.add("hidden"),ve()});const i=document.getElementById("btnActionBackup");i&&(i.onclick=()=>{h?.classList.add("hidden"),ct()});const t=document.getElementById("btnActionSettings");t&&(t.onclick=()=>{h?.classList.add("hidden"),ft()})}function Me(e){if(r.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(_=>{_.onclick=()=>{r.filterStatus=_.dataset.f,H()}});const o=document.getElementById("plannerTaskSearchInp");o&&(o.oninput=_=>{const d=_.target.value;r.searchQuery=d;const i=_.target.selectionStart;H();const t=document.getElementById("plannerTaskSearchInp");if(t&&(t.focus(),i!==null))try{t.setSelectionRange(i,i)}catch{}});const m=document.getElementById("btnClearSearch");m&&(m.onclick=()=>{r.searchQuery="",H()});const y=document.getElementById("btnFocusAddTask");y&&(y.onclick=()=>{Be(null,r.selectedDate)});const A=document.getElementById("btnEmptyStateAddTask");A&&(A.onclick=()=>{Be(null,r.selectedDate)});const F=document.getElementById("quickAddTitleInp"),j=document.getElementById("quickAddCompletionDate"),C=document.getElementById("quickAddPriority"),z=document.getElementById("quickAddCategory"),L=document.getElementById("btnQuickAddSubmit"),p=async()=>{const _=Ge();if(r.selectedDate<_){S("Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.",!0);return}const d=(F?.value||"").trim();if(!d){S("Please enter a task title",!0),F?.focus();return}const i=(j?.value||"").trim()||r.selectedDate;if(i<_){S("Cannot set completion date on a previous date.",!0);return}try{const t={title:d,assignedDate:r.selectedDate,assignedDateStr:r.selectedDate,dateStr:i,completionDate:i,completionDateStr:i,dueDate:i,priority:C?.value||c.defaultPriority,category:z?.value||"General",status:"Pending"};if(f){const D=document.getElementById("quickAddAssignee")?.value;D==="all"?(t.assignAll=!0,t.personnelId="all"):D?t.personnelId=D:r.selectedPersonnelId!=="all"&&(t.personnelId=r.selectedPersonnelId)}const b=await xe("/tasks",t);r.tasks.unshift(b),S("Task added to today's focus! ✨"),F&&(F.value="",F.focus()),H()}catch(t){S(t.message,!0)}};L&&(L.onclick=p),F&&(F.onkeydown=_=>{_.key==="Enter"&&p()}),document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(_=>{_.onclick=()=>{const d=_.dataset.empKey;r.collapsedEmployees[d]=!r.collapsedEmployees[d],H()}});const B=document.getElementById("btnToggleEmpGrouping");B&&(B.onclick=()=>{r.groupByEmployee=!r.groupByEmployee,H()});const h=document.getElementById("btnExpandAllEmp");h&&(h.onclick=()=>{r.collapsedEmployees={},H()});const T=document.getElementById("btnCollapseAllEmp");T&&(T.onclick=()=>{document.querySelectorAll(".ci360-emp-group-card").forEach(_=>{const d=_.dataset.empKey;d&&(r.collapsedEmployees[d]=!0)}),H()});const U=document.getElementById("btnEmptyStateImport");U&&(U.onclick=()=>Re())}if(r.viewMode==="weekly"){const o=document.getElementById("btnPrevWeek"),m=document.getElementById("btnNextWeek"),y=document.getElementById("btnThisWeek");o&&(o.onclick=()=>{r.selectedDate=Kt(r.selectedDate,-7),H()}),m&&(m.onclick=()=>{r.selectedDate=Kt(r.selectedDate,7),H()}),y&&(y.onclick=()=>{r.selectedDate=Ge(),H()}),document.querySelectorAll(".day-col-header").forEach(A=>{A.onclick=()=>{r.selectedDate=A.dataset.date,r.viewMode="daily",H()}}),document.querySelectorAll('[data-action="add-day"]').forEach(A=>{A.onclick=()=>{Be(null,A.dataset.date)}})}if(r.viewMode==="report"){const o=document.getElementById("selectWeeklyReportEmployee");o&&(o.onchange=A=>{r.reportPersonnelId=A.target.value,H()});const m=document.getElementById("btnDownloadWeeklyPdf");m&&(m.onclick=()=>st({personnelId:r.reportPersonnelId||"all"}));const y=document.getElementById("btnOpenAdminReportModal");y&&(y.onclick=()=>ve())}s.querySelectorAll('[data-action="toggle"]').forEach(o=>{o.onclick=async m=>{m.stopPropagation();const y=o.dataset.id;await dt(y)}}),s.querySelectorAll('[data-action="edit"]').forEach(o=>{o.onclick=m=>{m.stopPropagation();const y=o.dataset.id,A=r.tasks.find(F=>F._id===y);A&&Be(A)}}),s.querySelectorAll('[data-action="delete"]').forEach(o=>{o.onclick=async m=>{m.stopPropagation();const y=o.dataset.id;await kt(y)}}),s.querySelectorAll(".btn-preview-task-att").forEach(o=>{o.onclick=m=>{m.stopPropagation();const y=o.dataset.url,A=o.dataset.name;y&&Ta({url:y,name:A})}}),s.querySelectorAll(".btn-view-task-atts").forEach(o=>{o.onclick=m=>{m.stopPropagation();const y=o.dataset.id,A=r.tasks.find(F=>F._id===y);A&&Be(A)}})}async function dt(e){const o=r.tasks.find(y=>y._id===e);if(!o)return;const m=o.status!=="Completed";try{const y=await tt(`/tasks/${e}/toggle`,{}),A=r.tasks.findIndex(F=>F._id===e);A!==-1&&(r.tasks[A]=y),m?(c.soundEnabled&&ja(),S("Task marked as completed! 🎉")):S("Task reopened as pending."),H()}catch(y){S(y.message,!0)}}async function kt(e){const o=r.tasks.find(m=>m._id===e);if(o&&confirm(`Are you sure you want to remove "${o.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await at(`/tasks/${e}`),r.tasks=r.tasks.filter(m=>m._id!==e),S("Task removed from planner (safely stored in database archive)"),H()}catch(m){S(m.message,!0)}}function Be(e=null,o=null){const m=!!e,y=Ge(),A=e?e.assignedDateStr||(e.assignedDate?new Date(e.assignedDate).toISOString().slice(0,10):"")||e.dateStr||(e.createdAt?new Date(e.createdAt).toISOString().slice(0,10):r.selectedDate):o&&o>=y?o:r.selectedDate>=y?r.selectedDate:y;e?e.completionDateStr||e.dueDate&&new Date(e.dueDate).toISOString().slice(0,10):o&&o>=y||r.selectedDate>=y&&r.selectedDate;const F=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${m?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${v(e?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${v(e?.description||"")}</textarea>
          </div>

          <!-- Date Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${A}" ${m?"":`min="${y}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${e?.completionDateStr||(e?.dueDate?new Date(e.dueDate).toISOString().slice(0,10):"")}" ${m?"":`min="${y}"`} placeholder="Defaults to that day">
              <small style="color:var(--text-3);font-size:11px;">If left blank, will default to that day (${A})</small>
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${e?.priority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!e&&c.defaultPriority==="Medium"||e?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!e&&c.defaultPriority==="High"||e?.priority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${e?.priority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${e?.status==="Pending"||e?.status==="Todo"||!e?"selected":""}>Pending</option>
                <option value="In Progress" ${e?.status==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${e?.status==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskClientName">Client Name</label>
              <input type="text" id="taskClientName" class="input" list="clientOptions" placeholder="Enter or select client name..." value="${v(e?.clientName||(e?.category&&e.category!=="General"?e.category:""))}">
              <datalist id="clientOptions">
                ${(r.clientList||[]).map(i=>`<option value="${v(i.name)}">`).join("")}
                <option value="Internal CI">
              </datalist>
            </div>
          </div>

          <!-- Superadmin Assign To -->
          ${f?`
            <div class="form-group">
              <label for="taskAssignee">Primary Assignee / Owner</label>
              <select id="taskAssignee" class="input">
                <option value="me" ${!e||!e?.personnelId&&!e?.assignAll?"selected":""}>Myself (Admin)</option>
                <option value="all" ${e?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${r.personnelList.map(i=>{const t=e?.personnelId?._id===i._id||e?.personnelId===i._id;return`<option value="${i._id}" ${t?"selected":""}>👤 ${v(i.name)} (${v(i.department||i.role||"Member")})</option>`}).join("")}
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
              ${r.personnelList.map(i=>`
                <option value="${i._id}">+ 👤 ${v(i.name)} (${v(i.department||i.role||"Member")})</option>
              `).join("")}
            </select>
          </div>

          <!-- Attachments & Paste Screenshot Section -->
          <div class="form-group" style="margin-top:14px;">
            ${Fa({id:"task-attachments-uploader",label:"Attachments & Screenshots",subtitle:"Drag & drop files, browse local files, or paste screenshot anywhere with Ctrl+V"})}
            <div class="task-paste-notice">
              <span style="font-size:14px;">📋</span>
              <span><strong>Paste anywhere:</strong> Press <strong>Ctrl + V</strong> in this window to immediately attach a screenshot or image from your clipboard.</span>
            </div>
          </div>

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${m?`
                <button type="button" class="btn danger small" id="btnModalDeleteTask" style="padding:6px 12px;background:#ef4444;color:#fff;border-radius:var(--r-sm);border:none;cursor:pointer;font-weight:700;font-size:12px;">🗑️ Delete Task</button>
              `:""}
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
              <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
                ${m?"Save Changes":"Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    `,j=zt(F),C=j.querySelector("#taskForm"),z=j.querySelector("#btnModalClose"),L=j.querySelector("#btnCancelModal"),p=j.querySelector("#btnModalDeleteTask"),B=()=>j.remove();z&&(z.onclick=B),L&&(L.onclick=B),p&&e&&(p.onclick=async()=>{B(),await kt(e._id)});let h=[];e&&Array.isArray(e.coOwners)&&(h=e.coOwners.map(i=>({personnelId:i.personnelId?._id||i.personnelId||null,userId:i.userId?._id||i.userId||null,name:i.name||i.personnelId?.name||"",role:i.role||i.personnelId?.role||"",department:i.department||i.personnelId?.department||""})).filter(i=>i.personnelId||i.name));const T=j.querySelector("#coOwnersSelectedContainer"),U=j.querySelector("#taskCoOwnerSelect"),_=()=>{if(T){if(h.length===0){T.innerHTML='<span style="font-size:11.5px;color:var(--text-4);font-style:italic;">No co-owners added yet</span>';return}T.innerHTML=h.map((i,t)=>`
        <span class="co-owner-chip" style="display:inline-flex;align-items:center;gap:6px;background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);border-radius:16px;padding:3px 10px;font-size:12px;font-weight:600;">
          👤 ${v(i.name)}
          <button type="button" class="btn-remove-co" data-idx="${t}" style="background:transparent;border:none;color:var(--accent);cursor:pointer;font-size:14px;line-height:1;padding:0;margin-left:2px;font-weight:bold;" title="Remove co-owner">×</button>
        </span>
      `).join(""),T.querySelectorAll(".btn-remove-co").forEach(i=>{i.onclick=()=>{const t=parseInt(i.dataset.idx,10);h.splice(t,1),_()}})}};_(),U&&(U.onchange=()=>{const i=U.value;if(!i)return;const t=r.personnelList.find(b=>String(b._id)===String(i));t&&(h.some(D=>String(D.personnelId)===String(t._id))||(h.push({personnelId:t._id,name:t.name,role:t.role||"",department:t.department||""}),_())),U.value=""}),Pa("task-attachments-uploader",{existing:Array.isArray(e?.attachments)?e.attachments:[]});const d=async i=>{const t=i.clipboardData?.items;if(!t||!t.length)return;const b=[];for(let D=0;D<t.length;D++)if(t[D].type&&t[D].type.startsWith("image/")){const M=t[D].getAsFile();if(M){const w=M.type.split("/")[1]||"png",X=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),R=new File([M],`screenshot-${X}.${w}`,{type:M.type});b.push(R)}}if(b.length>0){i.preventDefault(),S(`Pasting ${b.length} screenshot(s)... 📸`);for(const D of b)try{const M=await za(D);if(M){const w=ma("task-attachments-uploader");La("task-attachments-uploader",[...w,M]),S("Screenshot attached successfully! 📸")}}catch(M){S("Failed to paste screenshot: "+(M.message||"Error"),!0)}}};j.addEventListener("paste",d),C.onsubmit=async i=>{i.preventDefault();const t=j.querySelector("#taskTitle").value.trim(),b=j.querySelector("#taskDesc").value.trim(),D=j.querySelector("#taskDate").value||A,w=j.querySelector("#taskCompletionDate")?.value?.trim()||D||r.selectedDate,K=j.querySelector("#taskPriority").value,X=j.querySelector("#taskStatus").value,R=(j.querySelector("#taskClientName")?.value||j.querySelector("#taskCategory")?.value||"").trim(),P=R||"",J=ma("task-attachments-uploader");if(!t){S("Task title is required",!0);return}if(!m&&(w<y||D<y)){S("Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.",!0);return}const ie={title:t,description:b,assignedDate:D,assignedDateStr:D,dateStr:w,completionDate:w,completionDateStr:w,dueDate:w,startTime:"",dueTime:"",priority:K,status:X,category:P,clientName:R,attachments:J,coOwners:h};if(f){const ae=j.querySelector("#taskAssignee")?.value;ae==="all"?(ie.assignAll=!0,ie.personnelId="all"):ae==="me"?ie.personnelId=null:ae&&(ie.personnelId=ae)}const Z=j.querySelector("#btnSaveTask");Z.disabled=!0,Z.textContent="Saving...";try{if(m){const ae=await Jt(`/tasks/${e._id}`,ie),ce=r.tasks.findIndex(se=>se._id===e._id);ce!==-1&&(r.tasks[ce]=ae),S("Task updated successfully! ✍️")}else{const ae=await xe("/tasks",ie);Array.isArray(ae.tasks)?ae.tasks.forEach(ce=>r.tasks.unshift(ce)):r.tasks.unshift(ae),S("Task created successfully! ✨")}B(),H()}catch(ae){S(ae.message,!0),Z.disabled=!1,Z.textContent=m?"Save Changes":"Create Task"}}}async function wt(){let e=[],o="all",m="";const A=zt(`
      <div class="ci360-planner-modal recent-tasks-modal" style="max-width:860px;width:95vw;">
        <div class="ci360-modal-header" style="border-bottom:1px solid var(--border-sm);padding-bottom:12px;">
          <div>
            <h3 style="display:flex;align-items:center;gap:8px;margin:0;">
              <span>🕒</span>
              <span>Recent Task Activity</span>
            </h3>
            <p style="font-size:12px;color:var(--text-3);margin:4px 0 0">
              Live stream of latest added, completed, and rescheduled or edited tasks.
            </p>
          </div>
          <button type="button" class="ci360-modal-close" id="btnRecentModalClose">×</button>
        </div>

        <div style="padding:16px 20px;">
          <!-- Filter Tabs & Quick Search -->
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;">
            <div class="recent-modal-header-tabs" style="display:flex;gap:6px;flex-wrap:wrap;margin:0;padding:0;border:none;">
              <button type="button" class="recent-tab-btn active" data-tab="all">⚡ All Recent</button>
              <button type="button" class="recent-tab-btn" data-tab="added">➕ Newly Added</button>
              <button type="button" class="recent-tab-btn" data-tab="completed">✅ Completed</button>
              <button type="button" class="recent-tab-btn" data-tab="changed">🔄 Changed / Rescheduled</button>
            </div>
            <div style="position:relative;min-width:220px;flex:1;max-width:320px;">
              <input type="text" id="recentTaskSearch" class="input" placeholder="Search tasks, client, or assignee..." style="padding:7px 12px;font-size:12px;border-radius:20px;">
            </div>
          </div>

          <!-- Task List Body -->
          <div id="recentTasksListContainer" style="max-height:480px;overflow-y:auto;padding-right:4px;">
            <div style="text-align:center;padding:48px;color:var(--text-3);">
              <div style="font-size:24px;margin-bottom:8px;">⏳</div>
              <div>Loading recent activity...</div>
            </div>
          </div>
        </div>
      </div>
    `),F=A.querySelector("#btnRecentModalClose");F&&(F.onclick=()=>A.remove());const j=A.querySelector("#recentTasksListContainer"),C=A.querySelector("#recentTaskSearch");try{const L=await Le("/tasks/recent");e=Array.isArray(L)?L:r.tasks||[]}catch(L){console.warn("Fallback to local state tasks for recent:",L),e=[...r.tasks||[]].sort((p,B)=>new Date(B.updatedAt||B.createdAt||0)-new Date(p.updatedAt||p.createdAt||0))}const z=()=>{if(!j)return;let L=[...e];if(o==="completed"?(L=L.filter(p=>p.status==="Completed"||p.completedAt),L.sort((p,B)=>new Date(B.completedAt||B.updatedAt||0)-new Date(p.completedAt||p.updatedAt||0))):o==="changed"?(L=L.filter(p=>p.rescheduledFrom||p.dateChangeCount&&p.dateChangeCount>0||p.updatedAt&&p.createdAt&&new Date(p.updatedAt).getTime()-new Date(p.createdAt).getTime()>1e4),L.sort((p,B)=>new Date(B.updatedAt||0)-new Date(p.updatedAt||0))):o==="added"&&L.sort((p,B)=>new Date(B.createdAt||0)-new Date(p.createdAt||0)),m){const p=m.toLowerCase();L=L.filter(B=>B.title&&B.title.toLowerCase().includes(p)||B.description&&B.description.toLowerCase().includes(p)||B.clientName&&B.clientName.toLowerCase().includes(p)||B.personnelId?.name&&B.personnelId.name.toLowerCase().includes(p)||B.createdBy?.name&&B.createdBy.name.toLowerCase().includes(p))}if(!L.length){j.innerHTML=`
          <div style="text-align:center;padding:48px 20px;color:var(--text-4);">
            <div style="font-size:32px;margin-bottom:8px;">🔍</div>
            <div style="font-size:14px;font-weight:600;color:var(--text-2);">No matching recent tasks found</div>
            <div style="font-size:12px;margin-top:4px;">Try selecting another filter or adjusting your search term.</div>
          </div>
        `;return}j.innerHTML=L.map(p=>{const B=p.status==="Completed",h=ze(p.assignedDateStr||p.assignedDate||(p.createdAt?new Date(p.createdAt).toISOString().slice(0,10):"")),T=ze(p.completionDateStr||p.completionDate||p.dueDate||""),U=p.updatedAt?new Date(p.updatedAt).toLocaleString("en-IN",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"";p.createdAt&&new Date(p.createdAt).toLocaleString("en-IN",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});const _=p.createdBy?.name||(typeof p.createdBy=="string"?p.createdBy:""),d=p.personnelId?.name||p.userId?.name||"",i=Array.isArray(p.attachments)&&p.attachments.length>0;return`
          <div class="recent-task-row">
            <div style="display:flex;align-items:flex-start;gap:12px;min-width:0;flex:1;">
              <span class="status-dot" style="width:10px;height:10px;border-radius:50%;margin-top:6px;flex-shrink:0;background:${B?"#10b981":p.status==="In Progress"?"#3b82f6":"#f59e0b"};box-shadow:0 0 6px ${B?"rgba(16,185,129,0.5)":p.status==="In Progress"?"rgba(59,130,246,0.5)":"rgba(245,158,11,0.5)"};"></span>
              <div style="min-width:0;flex:1;">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
                  <span style="font-size:13.5px;font-weight:700;color:var(--text-1);${B?"text-decoration:line-through;color:var(--text-3);":""}">${v(p.title)}</span>
                  <span class="ci360-badge priority-${(p.priority||"medium").toLowerCase()}" style="font-size:10px;padding:2px 6px;">${v(p.priority||"Medium")}</span>
                  <span class="ci360-badge" style="font-size:10px;padding:2px 6px;background:${B?"rgba(16,185,129,0.1)":"rgba(59,130,246,0.1)"};color:${B?"#10b981":"#3b82f6"};">${B?"Completed":v(p.status)||"Pending"}</span>
                  ${p.clientName?`<span class="ci360-badge" style="background:rgba(16,185,129,0.1);color:#10b981;font-size:10px;padding:2px 6px;">🏢 ${v(p.clientName)}</span>`:""}
                  ${i?`<span class="ci360-badge" style="background:rgba(59,130,246,0.12);color:#2563eb;font-size:10px;padding:2px 6px;">📎 ${p.attachments.length} file(s)</span>`:""}
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:11.5px;color:var(--text-3);">
                  ${p.rescheduledFrom?`
                    <span style="color:#d97706;font-weight:600;">🔄 Rescheduled: ${ze(p.rescheduledFrom)} ➔ ${T}</span>
                  `:`
                    <span>📅 Due: ${T||h}</span>
                  `}
                  ${_?`<span>✍️ By: <strong>${v(_)}</strong></span>`:""}
                  ${d?`<span>👤 Assigned: <strong>${v(d)}</strong></span>`:""}
                  ${U?`<span style="color:var(--text-4);">🕒 Updated ${U}</span>`:""}
                </div>
              </div>
            </div>

            <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
              <button type="button" class="btn secondary small btn-open-recent-task" data-id="${p._id}" style="padding:5px 12px;font-size:11.5px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">
                <span>✏️ Edit</span>
              </button>
            </div>
          </div>
        `}).join(""),j.querySelectorAll(".btn-open-recent-task").forEach(p=>{p.onclick=()=>{const B=p.dataset.id,h=e.find(T=>String(T._id)===String(B))||r.tasks.find(T=>String(T._id)===String(B));h&&(A.remove(),Be(h))}})};z(),A.querySelectorAll(".recent-tab-btn").forEach(L=>{L.onclick=()=>{A.querySelectorAll(".recent-tab-btn").forEach(p=>p.classList.remove("active")),L.classList.add("active"),o=L.dataset.tab,z()}}),C&&(C.oninput=L=>{m=L.target.value.trim(),z()})}function Re(){let e=[];const o=`
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
              <input type="date" id="importTargetDate" class="input" value="${r.selectedDate<Ge()?Ge():r.selectedDate}" min="${Ge()}">
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
    `,m=zt(o),y=()=>m.remove();m.querySelector("#btnImportClose").onclick=y,m.querySelector("#btnCancelImport").onclick=y;const A=m.querySelector("#importTextarea"),F=m.querySelector("#importFileInput"),j=m.querySelector("#importDropzone"),C=m.querySelector("#previewListArea"),z=m.querySelector("#previewCountLabel"),L=m.querySelector("#btnConfirmImport"),p=m.querySelector("#importFileInfo");function B(T){if(!T)return[];const U=T.split(/\r?\n/),_=[];for(let d of U)d=d.trim(),d&&(d=d.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),d=d.replace(/^[-*•]\s+/,""),d=d.replace(/^\d+[\.\)]\s+/,""),d=d.trim(),d&&_.push(d));return _}function h(){const T=A.value,U=B(T),_=m.querySelector("#importTargetDate").value,d=E(_),i=new Set(d.map(t=>(t.title||"").trim().toLowerCase()));e=[];for(const t of U){const b=i.has(t.toLowerCase());e.push({title:t,isDuplicate:b})}if(z.textContent=`Preview (${e.length} ${e.length===1?"task":"tasks"} found)`,L.disabled=e.length===0,L.textContent=`Import ${e.length} ${e.length===1?"Task":"Tasks"}`,e.length===0){C.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}C.innerHTML=e.map((t,b)=>`
        <div class="preview-item ${t.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${b+1}.</span>
          <span class="preview-title">${v(t.title)}</span>
          ${t.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}A.oninput=h,j.onclick=()=>F.click(),F.onchange=T=>{const U=T.target.files[0];if(!U)return;p.textContent=`File selected: ${U.name} (${Math.round(U.size/1024)} KB)`;const _=new FileReader;_.onload=d=>{A.value=d.target.result,h()},_.readAsText(U)},j.ondragover=T=>{T.preventDefault(),j.classList.add("dragover")},j.ondragleave=()=>j.classList.remove("dragover"),j.ondrop=T=>{T.preventDefault(),j.classList.remove("dragover");const U=T.dataTransfer.files[0];if(U&&(U.type==="text/plain"||U.name.endsWith(".txt"))){p.textContent=`File dropped: ${U.name}`;const _=new FileReader;_.onload=d=>{A.value=d.target.result,h()},_.readAsText(U)}else S("Please drop a valid .txt plain-text file",!0)},L.onclick=async()=>{if(e.length===0)return;L.disabled=!0,L.textContent="Importing...";const T=m.querySelector("#importTargetDate").value;if(T<Ge()){S("Cannot import tasks for previous dates. Target date must be today or later.",!0),L.disabled=!1,L.textContent=`Import ${e.length} ${e.length===1?"Task":"Tasks"}`;return}const U=m.querySelector("#importPriority").value,_=m.querySelector("#importCategory").value.trim()||"General",d={date:T,tasks:e.map(i=>({title:i.title,priority:U,category:_,status:"Pending"}))};f&&r.selectedPersonnelId!=="all"&&(d.personnelId=r.selectedPersonnelId);try{const i=await xe("/tasks/bulk-import",d);Array.isArray(i.tasks)&&i.tasks.forEach(t=>r.tasks.unshift(t)),S(`Imported ${i.importedCount} tasks successfully! (${i.skippedCount} skipped duplicates)`),y(),r.selectedDate=T,H()}catch(i){S(i.message,!0),L.disabled=!1,L.textContent="Retry Import"}}}async function Ve(){const e=E(r.selectedDate),o=W(e,Ge()),m=Dt(r.selectedDate),y=2,A=800,F=160,j=90,C=74,z=70,L=Math.max(120,e.length*C),p=F+j+L+z,B=document.createElement("canvas");B.width=A*y,B.height=p*y;const h=B.getContext("2d");h.scale(y,y);const T=document.documentElement.getAttribute("data-theme")==="dark",U=T?"#020713":"#F0F6FF",_=T?"#081226":"#FFFFFF",d=T?"rgba(56, 189, 248, 0.16)":"#E2E8F0",i=T?"#F8FAFC":"#0F172A",t=T?"#8EA4C8":"#475569",b="#0070F3",D="#10B981",M="#F59E0B";h.fillStyle=U,h.fillRect(0,0,A,p),h.fillStyle=_,de(h,24,20,A-48,F-30,16),h.fill(),h.strokeStyle=d,h.lineWidth=1,h.stroke(),h.fillStyle=b,h.font="bold 12px Inter, sans-serif",h.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),h.fillStyle=i,h.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',h.fillText(m,44,86),h.fillStyle=t,h.font="13px Inter, sans-serif",h.fillText(`Planned focus list · ${o.completed} of ${o.total} tasks completed (${o.percent}%)`,44,114);const w=F+6;h.fillStyle=_,de(h,24,w,A-48,j-16,12),h.fill(),h.stroke();const K=[{label:"TOTAL TASKS",val:String(o.total),color:i},{label:"COMPLETED",val:String(o.completed),color:D},{label:"IN PROGRESS",val:String(o.inProgress),color:M},{label:"PENDING",val:String(o.pending),color:t},{label:"PROGRESS",val:`${o.percent}%`,color:b}],X=(A-48)/K.length;K.forEach((J,ie)=>{const Z=24+ie*X+20;h.fillStyle=J.color,h.font="bold 20px Inter, sans-serif",h.fillText(J.val,Z,w+36),h.fillStyle=t,h.font="10px Inter, sans-serif",h.fillText(J.label,Z,w+54)});const R=w+j;h.fillStyle=_,de(h,24,R,A-48,L+10,16),h.fill(),h.stroke(),e.length===0?(h.fillStyle=t,h.font="14px Inter, sans-serif",h.textAlign="center",h.fillText("No scheduled tasks recorded for this date.",A/2,R+60),h.textAlign="left"):e.forEach((J,ie)=>{const Z=R+16+ie*C,ae=J.status==="Completed";h.beginPath(),h.arc(48,Z+14,10,0,Math.PI*2),ae?(h.fillStyle=D,h.fill(),h.strokeStyle="#FFFFFF",h.lineWidth=2,h.beginPath(),h.moveTo(44,Z+14),h.lineTo(47,Z+17),h.lineTo(52,Z+11),h.stroke()):(h.strokeStyle=d,h.lineWidth=2,h.stroke()),h.fillStyle=ae?t:i,h.font=`${ae?"normal":"500"} 14px Inter, sans-serif`;const ce=J.title.length>55?J.title.slice(0,52)+"...":J.title;if(h.fillText(ce,70,Z+18),ae){const ye=h.measureText(ce);h.strokeStyle=t,h.lineWidth=1.2,h.beginPath(),h.moveTo(70,Z+14),h.lineTo(70+ye.width,Z+14),h.stroke()}const se=J.priority||"Medium";let he="#E2E8F0",qe="#334155";se==="Urgent"?(he="#FEE2E2",qe="#DC2626"):se==="High"?(he="#FEF3C7",qe="#D97706"):se==="Low"&&(he="#ECFDF5",qe="#059669"),h.fillStyle=he,de(h,A-150,Z+4,60,20,10),h.fill(),h.fillStyle=qe,h.font="bold 10px Inter, sans-serif",h.fillText(se,A-138,Z+18);const ee=J.createdByName||J.createdBy?.name||(J.createdBy?.email?J.createdBy.email.split("@")[0]:"")||J.personnelId?.name||J.userId?.name||"Member",Fe=J.completionDateStr||J.dateStr||"",De=[];De.push(`✍️ Added by: ${ee}`),Fe&&De.push(`📅 Due: ${ze(Fe)}`),J.dueTime&&De.push(`🕒 ${J.dueTime}`),J.category&&J.category!=="General"&&De.push(`#${J.category}`);const ge=De.join("   ·   ");h.fillStyle=t,h.font="11px Inter, sans-serif",h.fillText(ge,70,Z+36),ie<e.length-1&&(h.strokeStyle=d,h.lineWidth=.6,h.beginPath(),h.moveTo(40,Z+54),h.lineTo(A-40,Z+54),h.stroke())});const P=p-35;h.fillStyle=t,h.font="11px Inter, sans-serif",h.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,P);try{const J=B.toDataURL("image/png"),ie=document.createElement("a");ie.href=J,ie.download=`ci360-daily-planner-${r.selectedDate}.png`,document.body.appendChild(ie),ie.click(),ie.remove(),S("Daily Planner image exported! 🖼️")}catch(J){S("Failed to export image: "+J.message,!0)}}function de(e,o,m,y,A,F){e.beginPath(),e.moveTo(o+F,m),e.lineTo(o+y-F,m),e.quadraticCurveTo(o+y,m,o+y,m+F),e.lineTo(o+y,m+A-F),e.quadraticCurveTo(o+y,m+A,o+y-F,m+A),e.lineTo(o+F,m+A),e.quadraticCurveTo(o,m+A,o,m+A-F),e.lineTo(o,m+F),e.quadraticCurveTo(o,m,o+F,m),e.closePath()}function st(e={}){const o=qt(r.selectedDate,c.weekStartsOn),m=Dt(o[0]),y=Dt(o[6]),A=Ge();let F=r.tasks.filter(_=>{if(_.isDeleted===!0)return!1;const d=_.completionDateStr||_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):""),i=_.assignedDateStr||(_.assignedDate?new Date(_.assignedDate).toISOString().slice(0,10):"")||d;return e.scope==="today"?d===A||i===A:e.scope==="all"?!0:_.status==="In Progress"&&i&&d?o.some(t=>t>=i&&t<=d):o.includes(d)||o.includes(i)});e.personnelId&&e.personnelId!=="all"&&(F=F.filter(_=>{const d=String(_.personnelId?._id||_.personnelId||""),i=Array.isArray(_.coOwners)&&_.coOwners.some(t=>String(t.personnelId?._id||t.personnelId||t.userId?._id||t.userId||"")===String(e.personnelId));return d===String(e.personnelId)||i})),e.status&&e.status!=="all"&&(F=F.filter(_=>_.status===e.status));const j=F.length,C=F.filter(_=>_.status==="Completed").length,z=F.filter(_=>_.status==="In Progress").length,L=j>0?Math.round(C/j*100):0,p=window.open("","_blank");if(!p){S("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const B=e.title||(e.isAdminReport?"CI360 Admin Detailed Executive Report":"Weekly Productivity Report"),h=e.scope==="today"?`Date: ${Dt(A)}`:e.scope==="all"?"All Active & Historical Tasks":`${m} – ${y}`;let T="";if(e.personnelId&&e.personnelId!=="all"){const _=r.personnelList.find(d=>String(d._id)===String(e.personnelId));_&&(T=`👤 Employee: ${_.name} (${_.department||_.role||"Member"})`)}const U=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${v(B)} — ${h}</title>
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
            <h1>${v(B)}</h1>
            <div class="period">
              ${h}
              ${T?`<span class="filter-tag" style="background:#dbeafe;color:#1e40af;font-weight:700;">${v(T)}</span>`:""}
              ${e.filterSummary?`<span class="filter-tag">${v(e.filterSummary)}</span>`:""}
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
            <div class="kpi-num" style="color:#0070F3">${L}%</div>
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
            ${F.length===0?`
              <tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;font-weight:600">No scheduled tasks match the selected criteria.</td></tr>
            `:F.map(_=>{const d=_.completionDateStr||_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):"—"),i=_.assignedDateStr||(_.assignedDate?new Date(_.assignedDate).toISOString().slice(0,10):""),t=_.status==="In Progress"&&i&&d&&i!==d?`${ze(i)} ➔ ${ze(d)}`:ze(d),b=_.jobId?.preferredPersonName||_.jobId?.assignments&&_.jobId.assignments[0]?.personId?.name||_.personnelId?.name||_.userId?.name||_.createdByName||"—",D=_.clientId?.name||_.jobId?.clientId?.name||_.clientId?.company||""||"—",M=_.description?v(_.description):'<span style="color:#cbd5e1">—</span>',w=Array.isArray(_.coOwners)&&_.coOwners.length>0?_.coOwners.map(P=>P.name).filter(Boolean).join(", "):"",K=(_.priority||"medium").toLowerCase(),X=K==="urgent"?"badge-urgent":K==="high"?"badge-high":K==="low"?"badge-low":"badge-med",R=(_.status||"pending").toLowerCase().replace(/\s+/g,"-");return`
                <tr>
                  <td><strong>${t}</strong></td>
                  <td><span class="client-tag">${v(D)}</span></td>
                  <td>
                    <span class="owner-tag">${v(b)}</span>
                    ${w?`<span class="co-owner-sub">👥 Co: ${v(w)}</span>`:""}
                  </td>
                  <td><strong>${v(_.title)}</strong></td>
                  <td><div class="desc-text">${M}</div></td>
                  <td><span class="badge ${X}">${v(_.priority||"Medium")}</span></td>
                  <td><span class="status-tag status-${R}">${v(_.status||"Pending")}</span></td>
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
    `;p.document.write(U),p.document.close(),S("Report generated for printing & PDF download! 📄")}function ve(){const e=Ge(),o=qt(r.selectedDate,c.weekStartsOn),m=ze(o[0]),y=ze(o[6]),A=`
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
              <option value="week" selected>Current Week (${m} – ${y})</option>
              <option value="today">Today Only (${ze(e)})</option>
              <option value="all">All Available Tasks</option>
            </select>
          </div>

          <!-- Employee Filter -->
          <div class="form-group">
            <label for="admRepPersonnel">Filter by Employee / Person</label>
            <select id="admRepPersonnel" class="input">
              <option value="all" ${!r.reportPersonnelId||r.reportPersonnelId==="all"?"selected":""}>👥 All Team Members</option>
              ${r.personnelList.map(h=>`
                <option value="${h._id}" ${String(h._id)===String(r.reportPersonnelId)?"selected":""}>👤 ${v(h.name)} (${v(h.department||h.role||"Member")})</option>
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
    `,F=zt(A),j=F.querySelector("#btnAdminRepClose"),C=F.querySelector("#btnAdminRepCancel"),z=F.querySelector("#btnAdminRepPdf"),L=F.querySelector("#btnAdminRepCsv"),p=()=>F.remove();j&&(j.onclick=p),C&&(C.onclick=p);const B=()=>{const h=F.querySelector("#admRepScope")?.value||"week",T=F.querySelector("#admRepPersonnel")?.value||"all",U=F.querySelector("#admRepStatus")?.value||"all";let _="";if(T!=="all"){const d=r.personnelList.find(i=>String(i._id)===String(T));d&&(_+=`Person: ${d.name} · `)}return U!=="all"&&(_+=`Status: ${U}`),{scope:h,personnelId:T,status:U,filterSummary:_.replace(/\s*·\s*$/,"")}};z&&(z.onclick=()=>{const h=B();p(),st({...h,isAdminReport:!0,title:"CI360 Admin Detailed Executive Task Report"})}),L&&(L.onclick=()=>{const h=B();p(),mt(h)})}function mt(e={}){const o=qt(r.selectedDate,c.weekStartsOn),m=Ge();let y=r.tasks.filter(p=>{if(p.isDeleted===!0)return!1;const B=p.completionDateStr||p.dateStr||(p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):""),h=p.assignedDateStr||(p.assignedDate?new Date(p.assignedDate).toISOString().slice(0,10):"")||B;return e.scope==="today"?B===m||h===m:e.scope==="all"?!0:p.status==="In Progress"&&h&&B?o.some(T=>T>=h&&T<=B):o.includes(B)||o.includes(h)});e.personnelId&&e.personnelId!=="all"&&(y=y.filter(p=>{const B=String(p.personnelId?._id||p.personnelId||""),h=Array.isArray(p.coOwners)&&p.coOwners.some(T=>String(T.personnelId?._id||T.personnelId||"")===String(e.personnelId));return B===String(e.personnelId)||h})),e.status&&e.status!=="all"&&(y=y.filter(p=>p.status===e.status));const A=["Date","Client Name","Job Owner","Primary Assignee","Co-Owners","Task Title","Description","Priority","Category","Status","Created By"],F=y.map(p=>{const B=p.completionDateStr||p.dateStr||(p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):""),h=p.jobId?.preferredPersonName||p.jobId?.assignments&&p.jobId.assignments[0]?.personId?.name||p.personnelId?.name||p.userId?.name||p.createdByName||"",T=p.clientId?.name||p.jobId?.clientId?.name||p.clientId?.company||"",U=p.personnelId?.name||p.userId?.name||"",_=Array.isArray(p.coOwners)?p.coOwners.map(K=>K.name).filter(Boolean).join("; "):"",d=p.title||"",i=p.description||"",t=p.priority||"Medium",b=p.category||"General",D=p.status||"Pending",M=p.createdByName||p.createdBy?.name||"",w=K=>`"${String(K||"").replace(/"/g,'""').replace(/\r?\n/g," ")}"`;return[w(B),w(T),w(h),w(U),w(_),w(d),w(i),w(t),w(b),w(D),w(M)].join(",")}),j="\uFEFF"+[A.join(","),...F].join(`\r
`),C=new Blob([j],{type:"text/csv;charset=utf-8;"}),z=URL.createObjectURL(C),L=document.createElement("a");L.href=z,L.download=`ci360-admin-report-${m}.csv`,document.body.appendChild(L),L.click(),document.body.removeChild(L),URL.revokeObjectURL(z),S("Admin CSV report downloaded! 📊")}function ct(){const o=zt(`
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
    `),m=()=>o.remove();o.querySelector("#btnBackupClose").onclick=m;const y=o.querySelector("#btnDownloadBackupJson");y.onclick=async()=>{y.disabled=!0,y.textContent="Generating backup...";try{const L=await Le("/tasks/backup"),p=new Blob([JSON.stringify(L,null,2)],{type:"application/json"}),B=URL.createObjectURL(p),h=document.createElement("a");h.href=B,h.download=`ci360-planner-backup-${Ge()}.json`,document.body.appendChild(h),h.click(),h.remove(),S("Planner backup downloaded successfully! 💾")}catch(L){S("Backup export failed: "+L.message,!0)}finally{y.disabled=!1,y.textContent="Download JSON Backup"}};const A=o.querySelector("#restoreFileInput"),F=o.querySelector("#restorePreviewArea"),j=o.querySelector("#restoreCountText"),C=o.querySelector("#btnExecuteRestore");let z=null;A.onchange=L=>{const p=L.target.files[0];if(!p)return;const B=new FileReader;B.onload=h=>{try{const T=JSON.parse(h.target.result),U=Array.isArray(T.tasks)?T.tasks:Array.isArray(T)?T:null;if(!U||U.length===0){S("Invalid backup file: No tasks found",!0);return}z=U,F.style.display="block",j.textContent=`Valid backup: ${U.length} tasks ready to restore.`,C.disabled=!1}catch(T){S("Error parsing JSON backup file: "+T.message,!0),F.style.display="none",C.disabled=!0}},B.readAsText(p)},C.onclick=async()=>{if(!z||z.length===0)return;C.disabled=!0,C.textContent="Restoring...";const L=o.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const p=await xe("/tasks/restore",{tasks:z,mode:L});S(`Restored ${p.restoredCount} tasks! (${p.skippedCount} skipped) ✨`),m(),await O()}catch(p){S("Restore failed: "+p.message,!0),C.disabled=!1,C.textContent="Retry Restore"}}}function ft(){const e=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${v(c.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${c.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${c.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${v(c.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${c.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${c.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${c.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${c.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${c.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${c.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${c.soundEnabled?"checked":""}>
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
    `,o=zt(e),m=()=>o.remove();o.querySelector("#btnSettingsClose").onclick=m,o.querySelector("#btnCancelSettings").onclick=m;const y=o.querySelector("#btnPlannerTestNotif");y&&(y.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await requestNotificationPermission()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):S("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true");const A=o.querySelector("#setNotifEnabled");A&&(A.checked=!0);const F=o.querySelector("#plannerNotifStatusLabel");F&&(F.textContent="🟢 Active on this laptop"),await triggerSystemNotification({title:"CI360 Planner Alert 🔔",message:"Laptop & browser notifications are active and ready!",id:"ci360-planner-test-"+Date.now()}),S("Test notification sent to your laptop/browser! 🔔")}),o.querySelector("#settingsForm").onsubmit=A=>{A.preventDefault(),c.displayName=o.querySelector("#setDisplayName").value.trim()||"Daily Planner",c.weekStartsOn=Number(o.querySelector("#setWeekStart").value),c.defaultPriority=o.querySelector("#setDefaultPriority").value,c.density=o.querySelector("#setDensity").value,c.soundEnabled=o.querySelector("#setSound").checked;const F=o.querySelector("#setNotifEnabled")?.checked;localStorage.setItem("ci360_notif_enabled",F?"true":"false"),F&&"Notification"in window&&Notification.permission==="default"&&requestNotificationPermission(),Ba(c),S("Planner preferences saved! ⚙️"),m(),H()}}}function Ra(){if(document.getElementById("ci360-planner-styles"))return;const s=document.createElement("style");s.id="ci360-planner-styles",s.textContent=`
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

    /* Task Thumbnails Strip */
    .ci360-task-thumb-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
      align-items: center;
    }
    .ci360-att-thumb-box {
      width: 44px;
      height: 44px;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid var(--border-sm);
      background: var(--bg-hover);
      cursor: pointer;
      transition: transform 0.15s ease, border-color 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ci360-att-thumb-box:hover {
      transform: scale(1.06);
      border-color: var(--accent);
    }
    .ci360-att-thumb-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .att-more-count {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-3);
      padding: 4px 6px;
    }

    /* Recent Tasks Modal & Activity Rows */
    .recent-tasks-modal {
      max-width: 860px !important;
      width: 95vw;
    }
    .recent-modal-header-tabs {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .recent-tab-btn {
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      color: var(--text-2);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .recent-tab-btn:hover {
      background: var(--bg-hover);
      color: var(--text-1);
    }
    .recent-tab-btn.active {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
    }
    .recent-task-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      margin-bottom: 8px;
      gap: 12px;
      transition: all 0.15s ease;
    }
    .recent-task-row:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }
    .task-paste-notice {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: rgba(0, 112, 243, 0.08);
      border: 1px dashed rgba(0, 112, 243, 0.3);
      border-radius: 6px;
      font-size: 11.5px;
      color: var(--text-2);
      margin-top: 8px;
    }
    [data-theme="light"] .recent-task-row,
    html:not([data-theme="dark"]) .recent-task-row {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .recent-tab-btn,
    html:not([data-theme="dark"]) .recent-tab-btn {
      background: #F8FAFC;
      border-color: #E2E8F0;
      color: #475569;
    }
    [data-theme="light"] .recent-tab-btn.active,
    html:not([data-theme="dark"]) .recent-tab-btn.active {
      background: #2563EB;
      color: #FFFFFF;
      border-color: #2563EB;
    }

    /* Mobile Responsive Optimizations for Planner */
    @media (max-width: 768px) {
      .ci360-planner-wrap {
        padding: 0 0 60px 0 !important;
        margin: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      .ci360-planner-header {
        flex-direction: column !important;
        align-items: stretch !important;
        padding: 14px !important;
        gap: 12px !important;
        border-radius: 14px !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .ci360-planner-header-left {
        width: 100% !important;
        gap: 10px !important;
      }
      .ci360-planner-hero-icon {
        width: 42px !important;
        height: 42px !important;
        font-size: 20px !important;
      }
      .ci360-planner-header-actions {
        width: 100% !important;
        flex-wrap: wrap !important;
        gap: 8px !important;
      }
      .ci360-view-switcher {
        width: 100% !important;
        display: flex !important;
      }
      .ci360-switch-btn {
        flex: 1 !important;
        justify-content: center !important;
        padding: 7px 8px !important;
        font-size: 12px !important;
      }
      .ci360-today-focus-section {
        padding: 0 !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .ci360-task-item {
        padding: 12px !important;
        gap: 10px !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .ci360-task-badges-row {
        gap: 4px !important;
      }
      .ci360-badge {
        font-size: 10.5px !important;
        padding: 2px 7px !important;
      }
      .recent-tasks-modal {
        width: 96vw !important;
        max-width: 96vw !important;
      }
      .recent-modal-header-tabs {
        width: 100% !important;
        overflow-x: auto !important;
        white-space: nowrap !important;
        scrollbar-width: none !important;
      }
      .recent-task-row {
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 8px !important;
      }
    }
  `,document.head.appendChild(s)}function Na(s){return s!==null?{comment:s,variations:[]}:{variations:[]}}function Oa(s,n,a,g,k){const f={move:s,variations:k};return n&&(f.suffix=n),a&&(f.nag=a),g!==null&&(f.comment=g),f}function Ua(...s){const[n,...a]=s;let g=n;for(const k of a)k!==null&&(g.variations=[k,...k.variations],k.variations=[],g=k);return n}function Ha(s,n){if(n.marker&&n.marker.comment){let a=n.root;for(;;){const g=a.variations[0];if(!g){a.comment=n.marker.comment;break}a=g}}return{headers:s,root:n.root,result:(n.marker&&n.marker.result)??void 0}}function Ga(s,n){function a(){this.constructor=s}a.prototype=n.prototype,s.prototype=new a}function Lt(s,n,a,g){var k=Error.call(this,s);return Object.setPrototypeOf&&Object.setPrototypeOf(k,Lt.prototype),k.expected=n,k.found=a,k.location=g,k.name="SyntaxError",k}Ga(Lt,Error);function oa(s,n,a){return a=a||" ",s.length>n?s:(n-=s.length,a+=a.repeat(n),s+a.slice(0,n))}Lt.prototype.format=function(s){var n="Error: "+this.message;if(this.location){var a=null,g;for(g=0;g<s.length;g++)if(s[g].source===this.location.source){a=s[g].text.split(/\r\n|\n|\r/g);break}var k=this.location.start,f=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(k):k,c=this.location.source+":"+f.line+":"+f.column;if(a){var r=this.location.end,O=oa("",f.line.toString().length," "),Q=a[k.line-1],E=k.line===r.line?r.column:Q.length+1,q=E-k.column||1;n+=`
 --> `+c+`
`+O+` |
`+f.line+" | "+Q+`
`+O+" | "+oa("",k.column-1," ")+oa("",q,"^")}else n+=`
 at `+c}return n};Lt.buildMessage=function(s,n){var a={literal:function(Q){return'"'+k(Q.text)+'"'},class:function(Q){var E=Q.parts.map(function(q){return Array.isArray(q)?f(q[0])+"-"+f(q[1]):f(q)});return"["+(Q.inverted?"^":"")+E.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(Q){return Q.description}};function g(Q){return Q.charCodeAt(0).toString(16).toUpperCase()}function k(Q){return Q.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(E){return"\\x0"+g(E)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(E){return"\\x"+g(E)})}function f(Q){return Q.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(E){return"\\x0"+g(E)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(E){return"\\x"+g(E)})}function c(Q){return a[Q.type](Q)}function r(Q){var E=Q.map(c),q,W;if(E.sort(),E.length>0){for(q=1,W=1;q<E.length;q++)E[q-1]!==E[q]&&(E[W]=E[q],W++);E.length=W}switch(E.length){case 1:return E[0];case 2:return E[0]+" or "+E[1];default:return E.slice(0,-1).join(", ")+", or "+E[E.length-1]}}function O(Q){return Q?'"'+k(Q)+'"':"end of input"}return"Expected "+r(s)+" but "+O(n)+" found."};function Wa(s,n){n=n!==void 0?n:{};var a={},g=n.grammarSource,k={pgn:Ae},f=Ae,c="[",r='"',O="]",Q=".",E="O-O-O",q="O-O",W="0-0-0",H="0-0",be="$",$e="{",Je="}",nt=";",bt="(",Ft=")",lt="1-0",Me="0-1",dt="1/2-1/2",kt="*",Be=/^[a-zA-Z]/,wt=/^[^"]/,Re=/^[0-9]/,Ve=/^[.]/,de=/^[a-zA-Z1-8\-=]/,st=/^[+#]/,ve=/^[!?]/,mt=/^[^}]/,ct=/^[^\r\n]/,ft=/^[ \t\r\n]/,e=Se("tag pair"),o=ue("[",!1),m=ue('"',!1),y=ue("]",!1),A=Se("tag name"),F=Te([["a","z"],["A","Z"]],!1,!1),j=Se("tag value"),C=Te(['"'],!0,!1),z=Se("move number"),L=Te([["0","9"]],!1,!1),p=ue(".",!1),B=Te(["."],!1,!1),h=Se("standard algebraic notation"),T=ue("O-O-O",!1),U=ue("O-O",!1),_=ue("0-0-0",!1),d=ue("0-0",!1),i=Te([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),t=Te(["+","#"],!1,!1),b=Se("suffix annotation"),D=Te(["!","?"],!1,!1),M=Se("NAG"),w=ue("$",!1),K=Se("brace comment"),X=ue("{",!1),R=Te(["}"],!0,!1),P=ue("}",!1),J=Se("rest of line comment"),ie=ue(";",!1),Z=Te(["\r",`
`],!0,!1),ae=Se("variation"),ce=ue("(",!1),se=ue(")",!1),he=Se("game termination marker"),qe=ue("1-0",!1),ee=ue("0-1",!1),Fe=ue("1/2-1/2",!1),De=ue("*",!1),ge=Se("whitespace"),ye=Te([" ","	","\r",`
`],!1,!1),ke=function($,l){return Ha($,l)},Oe=function($){return Object.fromEntries($)},Ue=function($,l){return[$,l]},pe=function($,l){return{root:$,marker:l}},je=function($,l){return Ua(Na($),...l.flat())},Ne=function($,l,x,V,te){return Oa($,l,x,V,te)},_e=function($){return $},Ce=function($){return $.replace(/[\r\n]+/g," ")},Pe=function($){return $.trim()},I=function($){return $},N=function($,l){return{result:$,comment:l}},u=n.peg$currPos|0,oe=[{line:1,column:1}],ne=u,Ee=n.peg$maxFailExpected||[],G=n.peg$silentFails|0,fe;if(n.startRule){if(!(n.startRule in k))throw new Error(`Can't start parsing from rule "`+n.startRule+'".');f=k[n.startRule]}function ue($,l){return{type:"literal",text:$,ignoreCase:l}}function Te($,l,x){return{type:"class",parts:$,inverted:l,ignoreCase:x}}function pt(){return{type:"end"}}function Se($){return{type:"other",description:$}}function Ie($){var l=oe[$],x;if(l)return l;if($>=oe.length)x=oe.length-1;else for(x=$;!oe[--x];);for(l=oe[x],l={line:l.line,column:l.column};x<$;)s.charCodeAt(x)===10?(l.line++,l.column=1):l.column++,x++;return oe[$]=l,l}function we($,l,x){var V=Ie($),te=Ie(l),me={source:g,start:{offset:$,line:V.line,column:V.column},end:{offset:l,line:te.line,column:te.column}};return me}function Y($){u<ne||(u>ne&&(ne=u,Ee=[]),Ee.push($))}function He($,l,x){return new Lt(Lt.buildMessage($,l),$,l,x)}function Ae(){var $,l,x;return $=u,l=Qe(),x=ea(),$=ke(l,x),$}function Qe(){var $,l,x;for($=u,l=[],x=ht();x!==a;)l.push(x),x=ht();return x=Ze(),$=Oe(l),$}function ht(){var $,l,x,V,te,me,ot;return G++,$=u,Ze(),s.charCodeAt(u)===91?(l=c,u++):(l=a,G===0&&Y(o)),l!==a?(Ze(),x=Ut(),x!==a?(Ze(),s.charCodeAt(u)===34?(V=r,u++):(V=a,G===0&&Y(m)),V!==a?(te=Ht(),s.charCodeAt(u)===34?(me=r,u++):(me=a,G===0&&Y(m)),me!==a?(Ze(),s.charCodeAt(u)===93?(ot=O,u++):(ot=a,G===0&&Y(y)),ot!==a?$=Ue(x,te):(u=$,$=a)):(u=$,$=a)):(u=$,$=a)):(u=$,$=a)):(u=$,$=a),G--,$===a&&G===0&&Y(e),$}function Ut(){var $,l,x;if(G++,$=u,l=[],x=s.charAt(u),Be.test(x)?u++:(x=a,G===0&&Y(F)),x!==a)for(;x!==a;)l.push(x),x=s.charAt(u),Be.test(x)?u++:(x=a,G===0&&Y(F));else l=a;return l!==a?$=s.substring($,u):$=l,G--,$===a&&(l=a,G===0&&Y(A)),$}function Ht(){var $,l,x;for(G++,$=u,l=[],x=s.charAt(u),wt.test(x)?u++:(x=a,G===0&&Y(C));x!==a;)l.push(x),x=s.charAt(u),wt.test(x)?u++:(x=a,G===0&&Y(C));return $=s.substring($,u),G--,l=a,G===0&&Y(j),$}function ea(){var $,l,x;return $=u,l=It(),Ze(),x=Pt(),x===a&&(x=null),Ze(),$=pe(l,x),$}function It(){var $,l,x,V;for($=u,l=vt(),l===a&&(l=null),x=[],V=Mt();V!==a;)x.push(V),V=Mt();return $=je(l,x),$}function Mt(){var $,l,x,V,te,me,ot,ut;if($=u,Ze(),Gt(),Ze(),l=ta(),l!==a){for(x=aa(),x===a&&(x=null),V=[],te=Bt();te!==a;)V.push(te),te=Bt();for(te=Ze(),me=vt(),me===a&&(me=null),ot=[],ut=yt();ut!==a;)ot.push(ut),ut=yt();$=Ne(l,x,V,me,ot)}else u=$,$=a;return $}function Gt(){var $,l,x,V,te,me;for(G++,$=u,l=[],x=s.charAt(u),Re.test(x)?u++:(x=a,G===0&&Y(L));x!==a;)l.push(x),x=s.charAt(u),Re.test(x)?u++:(x=a,G===0&&Y(L));if(s.charCodeAt(u)===46?(x=Q,u++):(x=a,G===0&&Y(p)),x!==a){for(V=Ze(),te=[],me=s.charAt(u),Ve.test(me)?u++:(me=a,G===0&&Y(B));me!==a;)te.push(me),me=s.charAt(u),Ve.test(me)?u++:(me=a,G===0&&Y(B));l=[l,x,V,te],$=l}else u=$,$=a;return G--,$===a&&(l=a,G===0&&Y(z)),$}function ta(){var $,l,x,V,te,me;if(G++,$=u,l=u,s.substr(u,5)===E?(x=E,u+=5):(x=a,G===0&&Y(T)),x===a&&(s.substr(u,3)===q?(x=q,u+=3):(x=a,G===0&&Y(U)),x===a&&(s.substr(u,5)===W?(x=W,u+=5):(x=a,G===0&&Y(_)),x===a&&(s.substr(u,3)===H?(x=H,u+=3):(x=a,G===0&&Y(d)),x===a))))if(x=u,V=s.charAt(u),Be.test(V)?u++:(V=a,G===0&&Y(F)),V!==a){if(te=[],me=s.charAt(u),de.test(me)?u++:(me=a,G===0&&Y(i)),me!==a)for(;me!==a;)te.push(me),me=s.charAt(u),de.test(me)?u++:(me=a,G===0&&Y(i));else te=a;te!==a?(V=[V,te],x=V):(u=x,x=a)}else u=x,x=a;return x!==a?(V=s.charAt(u),st.test(V)?u++:(V=a,G===0&&Y(t)),V===a&&(V=null),x=[x,V],l=x):(u=l,l=a),l!==a?$=s.substring($,u):$=l,G--,$===a&&(l=a,G===0&&Y(h)),$}function aa(){var $,l,x;for(G++,$=u,l=[],x=s.charAt(u),ve.test(x)?u++:(x=a,G===0&&Y(D));x!==a;)l.push(x),l.length>=2?x=a:(x=s.charAt(u),ve.test(x)?u++:(x=a,G===0&&Y(D)));return l.length<1?(u=$,$=a):$=l,G--,$===a&&(l=a,G===0&&Y(b)),$}function Bt(){var $,l,x,V,te;if(G++,$=u,Ze(),s.charCodeAt(u)===36?(l=be,u++):(l=a,G===0&&Y(w)),l!==a){if(x=u,V=[],te=s.charAt(u),Re.test(te)?u++:(te=a,G===0&&Y(L)),te!==a)for(;te!==a;)V.push(te),te=s.charAt(u),Re.test(te)?u++:(te=a,G===0&&Y(L));else V=a;V!==a?x=s.substring(x,u):x=V,x!==a?$=_e(x):(u=$,$=a)}else u=$,$=a;return G--,$===a&&G===0&&Y(M),$}function vt(){var $;return $=na(),$===a&&($=gt()),$}function na(){var $,l,x,V,te;if(G++,$=u,s.charCodeAt(u)===123?(l=$e,u++):(l=a,G===0&&Y(X)),l!==a){for(x=u,V=[],te=s.charAt(u),mt.test(te)?u++:(te=a,G===0&&Y(R));te!==a;)V.push(te),te=s.charAt(u),mt.test(te)?u++:(te=a,G===0&&Y(R));x=s.substring(x,u),s.charCodeAt(u)===125?(V=Je,u++):(V=a,G===0&&Y(P)),V!==a?$=Ce(x):(u=$,$=a)}else u=$,$=a;return G--,$===a&&(l=a,G===0&&Y(K)),$}function gt(){var $,l,x,V,te;if(G++,$=u,s.charCodeAt(u)===59?(l=nt,u++):(l=a,G===0&&Y(ie)),l!==a){for(x=u,V=[],te=s.charAt(u),ct.test(te)?u++:(te=a,G===0&&Y(Z));te!==a;)V.push(te),te=s.charAt(u),ct.test(te)?u++:(te=a,G===0&&Y(Z));x=s.substring(x,u),$=Pe(x)}else u=$,$=a;return G--,$===a&&(l=a,G===0&&Y(J)),$}function yt(){var $,l,x,V;return G++,$=u,Ze(),s.charCodeAt(u)===40?(l=bt,u++):(l=a,G===0&&Y(ce)),l!==a?(x=It(),x!==a?(Ze(),s.charCodeAt(u)===41?(V=Ft,u++):(V=a,G===0&&Y(se)),V!==a?$=I(x):(u=$,$=a)):(u=$,$=a)):(u=$,$=a),G--,$===a&&G===0&&Y(ae),$}function Pt(){var $,l,x;return G++,$=u,s.substr(u,3)===lt?(l=lt,u+=3):(l=a,G===0&&Y(qe)),l===a&&(s.substr(u,3)===Me?(l=Me,u+=3):(l=a,G===0&&Y(ee)),l===a&&(s.substr(u,7)===dt?(l=dt,u+=7):(l=a,G===0&&Y(Fe)),l===a&&(s.charCodeAt(u)===42?(l=kt,u++):(l=a,G===0&&Y(De))))),l!==a?(Ze(),x=vt(),x===a&&(x=null),$=N(l,x)):(u=$,$=a),G--,$===a&&(l=a,G===0&&Y(he)),$}function Ze(){var $,l;for(G++,$=[],l=s.charAt(u),ft.test(l)?u++:(l=a,G===0&&Y(ye));l!==a;)$.push(l),l=s.charAt(u),ft.test(l)?u++:(l=a,G===0&&Y(ye));return G--,l=a,G===0&&Y(ge),$}if(fe=f(),n.peg$library)return{peg$result:fe,peg$currPos:u,peg$FAILED:a,peg$maxFailExpected:Ee,peg$maxFailPos:ne};if(fe!==a&&u===s.length)return fe;throw fe!==a&&u<s.length&&Y(pt()),He(Ee,ne<s.length?s.charAt(ne):null,ne<s.length?we(ne,ne+1):we(ne,ne))}/**
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
 */const Qt=0xffffffffffffffffn;function ra(s,n){return(s<<n|s>>64n-n)&0xffffffffffffffffn}function va(s,n){return s*n&Qt}function Ka(s){return function(){let n=BigInt(s&Qt),a=BigInt(s>>64n&Qt);const g=va(ra(va(n,5n),7n),9n);return a^=n,n=(ra(n,24n)^a^a<<16n)&Qt,a=ra(a,37n),s=a<<64n|n,g}}const Zt=Ka(0xa187eb39cdcaed8f31c4b365b102e01en),Va=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Zt()))),Ya=Array.from({length:8},()=>Zt()),Ja=Array.from({length:16},()=>Zt()),sa=Zt(),et="w",rt="b",We="p",ua="n",Xt="b",Nt="r",Ct="q",Ke="k",la="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Vt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(n,a){const{color:g,piece:k,from:f,to:c,flags:r,captured:O,promotion:Q}=a,E=Ye(f),q=Ye(c);this.color=g,this.piece=k,this.from=E,this.to=q,this.san=n._moveToSan(a,n._moves({legal:!0})),this.lan=E+q,this.before=n.fen(),n._makeMove(a),this.after=n.fen(),n._undoMove(),this.flags="";for(const W in le)le[W]&r&&(this.flags+=_t[W]);O&&(this.captured=O),Q&&(this.promotion=Q,this.lan+=Q)}isCapture(){return this.flags.indexOf(_t.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(_t.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(_t.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(_t.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(_t.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(_t.BIG_PAWN)>-1}}const Xe=-1,_t={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},le={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ba={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Qa={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Xa={...ba,...Qa},re={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},da={b:[16,32,17,15],w:[-16,-32,-17,-15]},ya={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Za=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],en=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],tn={p:1,n:2,b:4,r:8,q:16,k:32},an="pnbrqkPNBRQK",ka=[ua,Xt,Nt,Ct],nn=7,on=6,rn=1,sn=0,Yt={[Ke]:le.KSIDE_CASTLE,[Ct]:le.QSIDE_CASTLE},$t={w:[{square:re.a1,flag:le.QSIDE_CASTLE},{square:re.h1,flag:le.KSIDE_CASTLE}],b:[{square:re.a8,flag:le.QSIDE_CASTLE},{square:re.h8,flag:le.KSIDE_CASTLE}]},ln={b:rn,w:on},ca="--";function Tt(s){return s>>4}function Ot(s){return s&15}function Ca(s){return"0123456789".indexOf(s)!==-1}function Ye(s){const n=Ot(s),a=Tt(s);return"abcdefgh".substring(n,n+1)+"87654321".substring(a,a+1)}function jt(s){return s===et?rt:et}function dn(s){const n=s.split(/\s+/);if(n.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const a=parseInt(n[5],10);if(isNaN(a)||a<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const g=parseInt(n[4],10);if(isNaN(g)||g<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(n[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(n[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(n[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const k=n[0].split("/");if(k.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let c=0;c<k.length;c++){let r=0,O=!1;for(let Q=0;Q<k[c].length;Q++)if(Ca(k[c][Q])){if(O)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};r+=parseInt(k[c][Q],10),O=!0}else{if(!/^[prnbqkPRNBQK]$/.test(k[c][Q]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};r+=1,O=!1}if(r!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(n[3][1]=="3"&&n[1]=="w"||n[3][1]=="6"&&n[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const f=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:c,regex:r}of f){if(!r.test(n[0]))return{ok:!1,error:`Invalid FEN: missing ${c} king`};if((n[0].match(r)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${c} kings`}}return Array.from(k[0]+k[7]).some(c=>c.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function cn(s,n){const a=s.from,g=s.to,k=s.piece;let f=0,c=0,r=0;for(let O=0,Q=n.length;O<Q;O++){const E=n[O].from,q=n[O].to,W=n[O].piece;k===W&&a!==E&&g===q&&(f++,Tt(a)===Tt(E)&&c++,Ot(a)===Ot(E)&&r++)}return f>0?c>0&&r>0?Ye(a):r>0?Ye(a).charAt(1):Ye(a).charAt(0):""}function St(s,n,a,g,k,f=void 0,c=le.NORMAL){const r=Tt(g);if(k===We&&(r===nn||r===sn))for(let O=0;O<ka.length;O++){const Q=ka[O];s.push({color:n,from:a,to:g,piece:k,captured:f,promotion:Q,flags:c|le.PROMOTION})}else s.push({color:n,from:a,to:g,piece:k,captured:f,flags:c})}function wa(s){let n=s.charAt(0);return n>="a"&&n<="h"?s.match(/[a-h]\d.*[a-h]\d/)?void 0:We:(n=n.toLowerCase(),n==="o"?Ke:n)}function pa(s){return s.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class $a{_board=new Array(128);_turn=et;_header={};_kings={w:Xe,b:Xe};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(n=la,{skipValidation:a=!1}={}){this.load(n,{skipValidation:a})}clear({preserveHeaders:n=!1}={}){this._board=new Array(128),this._kings={w:Xe,b:Xe},this._turn=et,this._castling={w:0,b:0},this._epSquare=Xe,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=n?this._header:{...Xa},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(n,{skipValidation:a=!1,preserveHeaders:g=!1}={}){let k=n.split(/\s+/);if(k.length>=2&&k.length<6){const r=["-","-","0","1"];n=k.concat(r.slice(-(6-k.length))).join(" ")}if(k=n.split(/\s+/),!a){const{ok:r,error:O}=dn(n);if(!r)throw new Error(O)}const f=k[0];let c=0;this.clear({preserveHeaders:g});for(let r=0;r<f.length;r++){const O=f.charAt(r);if(O==="/")c+=8;else if(Ca(O))c+=parseInt(O,10);else{const Q=O<"a"?et:rt;this._put({type:O.toLowerCase(),color:Q},Ye(c)),c++}}this._turn=k[1],k[2].indexOf("K")>-1&&(this._castling.w|=le.KSIDE_CASTLE),k[2].indexOf("Q")>-1&&(this._castling.w|=le.QSIDE_CASTLE),k[2].indexOf("k")>-1&&(this._castling.b|=le.KSIDE_CASTLE),k[2].indexOf("q")>-1&&(this._castling.b|=le.QSIDE_CASTLE),this._epSquare=k[3]==="-"?Xe:re[k[3]],this._halfMoves=parseInt(k[4],10),this._moveNumber=parseInt(k[5],10),this._hash=this._computeHash(),this._updateSetup(n),this._incPositionCount()}fen({forceEnpassantSquare:n=!1}={}){let a=0,g="";for(let c=re.a8;c<=re.h1;c++){if(this._board[c]){a>0&&(g+=a,a=0);const{color:r,type:O}=this._board[c];g+=r===et?O.toUpperCase():O.toLowerCase()}else a++;c+1&136&&(a>0&&(g+=a),c!==re.h1&&(g+="/"),a=0,c+=8)}let k="";this._castling[et]&le.KSIDE_CASTLE&&(k+="K"),this._castling[et]&le.QSIDE_CASTLE&&(k+="Q"),this._castling[rt]&le.KSIDE_CASTLE&&(k+="k"),this._castling[rt]&le.QSIDE_CASTLE&&(k+="q"),k=k||"-";let f="-";if(this._epSquare!==Xe)if(n)f=Ye(this._epSquare);else{const c=this._epSquare+(this._turn===et?16:-16),r=[c+1,c-1];for(const O of r){if(O&136)continue;const Q=this._turn;if(this._board[O]?.color===Q&&this._board[O]?.type===We){this._makeMove({color:Q,from:O,to:this._epSquare,piece:We,captured:We,flags:le.EP_CAPTURE});const E=!this._isKingAttacked(Q);if(this._undoMove(),E){f=Ye(this._epSquare);break}}}}return[g,this._turn,k,f,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(n){if(!this._board[n])return 0n;const{color:a,type:g}=this._board[n],k={w:0,b:1}[a],f={p:0,n:1,b:2,r:3,q:4,k:5}[g];return Va[k][f][n]}_epKey(){return this._epSquare===Xe?0n:Ya[this._epSquare&7]}_castlingKey(){const n=this._castling.w>>5|this._castling.b>>3;return Ja[n]}_computeHash(){let n=0n;for(let a=re.a8;a<=re.h1;a++){if(a&136){a+=7;continue}this._board[a]&&(n^=this._pieceKey(a))}return n^=this._epKey(),n^=this._castlingKey(),this._turn==="b"&&(n^=sa),n}_updateSetup(n){this._history.length>0||(n!==la?(this._header.SetUp="1",this._header.FEN=n):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(la)}get(n){return this._board[re[n]]}findPiece(n){const a=[];for(let g=re.a8;g<=re.h1;g++){if(g&136){g+=7;continue}!this._board[g]||this._board[g]?.color!==n.color||this._board[g].color===n.color&&this._board[g].type===n.type&&a.push(Ye(g))}return a}put({type:n,color:a},g){return this._put({type:n,color:a},g)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(n,a){this._hash^=this._pieceKey(n),this._board[n]=a,this._hash^=this._pieceKey(n)}_put({type:n,color:a},g){if(an.indexOf(n.toLowerCase())===-1||!(g in re))return!1;const k=re[g];if(n==Ke&&!(this._kings[a]==Xe||this._kings[a]==k))return!1;const f=this._board[k];return f&&f.type===Ke&&(this._kings[f.color]=Xe),this._set(k,{type:n,color:a}),n===Ke&&(this._kings[a]=k),!0}_clear(n){this._hash^=this._pieceKey(n),delete this._board[n]}remove(n){const a=this.get(n);return this._clear(re[n]),a&&a.type===Ke&&(this._kings[a.color]=Xe),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),a}_updateCastlingRights(){this._hash^=this._castlingKey();const n=this._board[re.e1]?.type===Ke&&this._board[re.e1]?.color===et,a=this._board[re.e8]?.type===Ke&&this._board[re.e8]?.color===rt;(!n||this._board[re.a1]?.type!==Nt||this._board[re.a1]?.color!==et)&&(this._castling.w&=-65),(!n||this._board[re.h1]?.type!==Nt||this._board[re.h1]?.color!==et)&&(this._castling.w&=-33),(!a||this._board[re.a8]?.type!==Nt||this._board[re.a8]?.color!==rt)&&(this._castling.b&=-65),(!a||this._board[re.h8]?.type!==Nt||this._board[re.h8]?.color!==rt)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Xe)return;const n=this._epSquare+(this._turn===et?-16:16),a=this._epSquare+(this._turn===et?16:-16),g=[a+1,a-1];if(this._board[n]!==null||this._board[this._epSquare]!==null||this._board[a]?.color!==jt(this._turn)||this._board[a]?.type!==We){this._hash^=this._epKey(),this._epSquare=Xe;return}const k=f=>!(f&136)&&this._board[f]?.color===this._turn&&this._board[f]?.type===We;g.some(k)||(this._hash^=this._epKey(),this._epSquare=Xe)}_attacked(n,a,g){const k=[];for(let f=re.a8;f<=re.h1;f++){if(f&136){f+=7;continue}if(this._board[f]===void 0||this._board[f].color!==n)continue;const c=this._board[f],r=f-a;if(r===0)continue;const O=r+119;if(Za[O]&tn[c.type]){if(c.type===We){if(r>0&&c.color===et||r<=0&&c.color===rt)if(g)k.push(Ye(f));else return!0;continue}if(c.type==="n"||c.type==="k")if(g){k.push(Ye(f));continue}else return!0;const Q=en[O];let E=f+Q,q=!1;for(;E!==a;){if(this._board[E]!=null){q=!0;break}E+=Q}if(!q)if(g){k.push(Ye(f));continue}else return!0}}return g?k:!1}attackers(n,a){return a?this._attacked(a,re[n],!0):this._attacked(this._turn,re[n],!0)}_isKingAttacked(n){const a=this._kings[n];return a===-1?!1:this._attacked(jt(n),a)}hash(){return this._hash.toString(16)}isAttacked(n,a){return this._attacked(a,re[n])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const n={b:0,n:0,r:0,q:0,k:0,p:0},a=[];let g=0,k=0;for(let f=re.a8;f<=re.h1;f++){if(k=(k+1)%2,f&136){f+=7;continue}const c=this._board[f];c&&(n[c.type]=c.type in n?n[c.type]+1:1,c.type===Xt&&a.push(k),g++)}if(g===2)return!0;if(g===3&&(n[Xt]===1||n[ua]===1))return!0;if(g===n[Xt]+2){let f=0;const c=a.length;for(let r=0;r<c;r++)f+=a[r];if(f===0||f===c)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:n=!1,square:a=void 0,piece:g=void 0}={}){const k=this._moves({square:a,piece:g});return n?k.map(f=>new Vt(this,f)):k.map(f=>this._moveToSan(f,k))}_moves({legal:n=!0,piece:a=void 0,square:g=void 0}={}){const k=g?g.toLowerCase():void 0,f=a?.toLowerCase(),c=[],r=this._turn,O=jt(r);let Q=re.a8,E=re.h1,q=!1;if(k)if(k in re)Q=E=re[k],q=!0;else return[];for(let H=Q;H<=E;H++){if(H&136){H+=7;continue}if(!this._board[H]||this._board[H].color===O)continue;const{type:be}=this._board[H];let $e;if(be===We){if(f&&f!==be)continue;$e=H+da[r][0],this._board[$e]||(St(c,r,H,$e,We),$e=H+da[r][1],ln[r]===Tt(H)&&!this._board[$e]&&St(c,r,H,$e,We,void 0,le.BIG_PAWN));for(let Je=2;Je<4;Je++)$e=H+da[r][Je],!($e&136)&&(this._board[$e]?.color===O?St(c,r,H,$e,We,this._board[$e].type,le.CAPTURE):$e===this._epSquare&&St(c,r,H,$e,We,We,le.EP_CAPTURE))}else{if(f&&f!==be)continue;for(let Je=0,nt=ya[be].length;Je<nt;Je++){const bt=ya[be][Je];for($e=H;$e+=bt,!($e&136);){if(!this._board[$e])St(c,r,H,$e,be);else{if(this._board[$e].color===r)break;St(c,r,H,$e,be,this._board[$e].type,le.CAPTURE);break}if(be===ua||be===Ke)break}}}}if((f===void 0||f===Ke)&&(!q||E===this._kings[r])){if(this._castling[r]&le.KSIDE_CASTLE){const H=this._kings[r],be=H+2;!this._board[H+1]&&!this._board[be]&&!this._attacked(O,this._kings[r])&&!this._attacked(O,H+1)&&!this._attacked(O,be)&&St(c,r,this._kings[r],be,Ke,void 0,le.KSIDE_CASTLE)}if(this._castling[r]&le.QSIDE_CASTLE){const H=this._kings[r],be=H-2;!this._board[H-1]&&!this._board[H-2]&&!this._board[H-3]&&!this._attacked(O,this._kings[r])&&!this._attacked(O,H-1)&&!this._attacked(O,be)&&St(c,r,this._kings[r],be,Ke,void 0,le.QSIDE_CASTLE)}}if(!n||this._kings[r]===-1)return c;const W=[];for(let H=0,be=c.length;H<be;H++)this._makeMove(c[H]),this._isKingAttacked(r)||W.push(c[H]),this._undoMove();return W}move(n,{strict:a=!1}={}){let g=null;if(typeof n=="string")g=this._moveFromSan(n,a);else if(n===null)g=this._moveFromSan(ca,a);else if(typeof n=="object"){const f=this._moves();for(let c=0,r=f.length;c<r;c++)if(n.from===Ye(f[c].from)&&n.to===Ye(f[c].to)&&(!("promotion"in f[c])||n.promotion===f[c].promotion)){g=f[c];break}}if(!g)throw typeof n=="string"?new Error(`Invalid move: ${n}`):new Error(`Invalid move: ${JSON.stringify(n)}`);if(this.isCheck()&&g.flags&le.NULL_MOVE)throw new Error("Null move not allowed when in check");const k=new Vt(this,g);return this._makeMove(g),this._incPositionCount(),k}_push(n){this._history.push({move:n,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(n,a){this._hash^=this._pieceKey(n),this._board[a]=this._board[n],delete this._board[n],this._hash^=this._pieceKey(a)}_makeMove(n){const a=this._turn,g=jt(a);if(this._push(n),n.flags&le.NULL_MOVE){a===rt&&this._moveNumber++,this._halfMoves++,this._turn=g,this._epSquare=Xe;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),n.captured&&(this._hash^=this._pieceKey(n.to)),this._movePiece(n.from,n.to),n.flags&le.EP_CAPTURE&&(this._turn===rt?this._clear(n.to-16):this._clear(n.to+16)),n.promotion&&(this._clear(n.to),this._set(n.to,{type:n.promotion,color:a})),this._board[n.to].type===Ke){if(this._kings[a]=n.to,n.flags&le.KSIDE_CASTLE){const k=n.to-1,f=n.to+1;this._movePiece(f,k)}else if(n.flags&le.QSIDE_CASTLE){const k=n.to+1,f=n.to-2;this._movePiece(f,k)}this._castling[a]=0}if(this._castling[a]){for(let k=0,f=$t[a].length;k<f;k++)if(n.from===$t[a][k].square&&this._castling[a]&$t[a][k].flag){this._castling[a]^=$t[a][k].flag;break}}if(this._castling[g]){for(let k=0,f=$t[g].length;k<f;k++)if(n.to===$t[g][k].square&&this._castling[g]&$t[g][k].flag){this._castling[g]^=$t[g][k].flag;break}}if(this._hash^=this._castlingKey(),n.flags&le.BIG_PAWN){let k;a===rt?k=n.to-16:k=n.to+16,!(n.to-1&136)&&this._board[n.to-1]?.type===We&&this._board[n.to-1]?.color===g||!(n.to+1&136)&&this._board[n.to+1]?.type===We&&this._board[n.to+1]?.color===g?(this._epSquare=k,this._hash^=this._epKey()):this._epSquare=Xe}else this._epSquare=Xe;n.piece===We?this._halfMoves=0:n.flags&(le.CAPTURE|le.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,a===rt&&this._moveNumber++,this._turn=g,this._hash^=sa}undo(){const n=this._hash,a=this._undoMove();if(a){const g=new Vt(this,a);return this._decPositionCount(n),g}return null}_undoMove(){const n=this._history.pop();if(n===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const a=n.move;this._kings=n.kings,this._turn=n.turn,this._castling=n.castling,this._epSquare=n.epSquare,this._halfMoves=n.halfMoves,this._moveNumber=n.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=sa;const g=this._turn,k=jt(g);if(a.flags&le.NULL_MOVE)return a;if(this._movePiece(a.to,a.from),a.piece&&(this._clear(a.from),this._set(a.from,{type:a.piece,color:g})),a.captured)if(a.flags&le.EP_CAPTURE){let f;g===rt?f=a.to-16:f=a.to+16,this._set(f,{type:We,color:k})}else this._set(a.to,{type:a.captured,color:k});if(a.flags&(le.KSIDE_CASTLE|le.QSIDE_CASTLE)){let f,c;a.flags&le.KSIDE_CASTLE?(f=a.to+1,c=a.to-1):(f=a.to-2,c=a.to+1),this._movePiece(c,f)}return a}pgn({newline:n=`
`,maxWidth:a=0}={}){const g=[];let k=!1;for(const W in this._header)this._header[W]&&g.push(`[${W} "${this._header[W]}"]`+n),k=!0;k&&this._history.length&&g.push(n);const f=W=>{const H=this._comments[this.fen()];if(typeof H<"u"){const be=W.length>0?" ":"";W=`${W}${be}{${H}}`}return W},c=[];for(;this._history.length>0;)c.push(this._undoMove());const r=[];let O="";for(c.length===0&&r.push(f(""));c.length>0;){O=f(O);const W=c.pop();if(!W)break;if(!this._history.length&&W.color==="b"){const H=`${this._moveNumber}. ...`;O=O?`${O} ${H}`:H}else W.color==="w"&&(O.length&&r.push(O),O=this._moveNumber+".");O=O+" "+this._moveToSan(W,this._moves({legal:!0})),this._makeMove(W)}if(O.length&&r.push(f(O)),r.push(this._header.Result||"*"),a===0)return g.join("")+r.join(" ");const Q=function(){return g.length>0&&g[g.length-1]===" "?(g.pop(),!0):!1},E=function(W,H){for(const be of H.split(" "))if(be){if(W+be.length>a){for(;Q();)W--;g.push(n),W=0}g.push(be),W+=be.length,g.push(" "),W++}return Q()&&W--,W};let q=0;for(let W=0;W<r.length;W++){if(q+r[W].length>a&&r[W].includes("{")){q=E(q,r[W]);continue}q+r[W].length>a&&W!==0?(g[g.length-1]===" "&&g.pop(),g.push(n),q=0):W!==0&&(g.push(" "),q++),g.push(r[W]),q+=r[W].length}return g.join("")}header(...n){for(let a=0;a<n.length;a+=2)typeof n[a]=="string"&&typeof n[a+1]=="string"&&(this._header[n[a]]=n[a+1]);return this._header}setHeader(n,a){return this._header[n]=a??ba[n]??null,this.getHeaders()}removeHeader(n){return n in this._header?(this._header[n]=ba[n]||null,!0):!1}getHeaders(){const n={};for(const[a,g]of Object.entries(this._header))g!==null&&(n[a]=g);return n}loadPgn(n,{strict:a=!1,newlineChar:g=`\r?
`}={}){g!==`\r?
`&&(n=n.replace(new RegExp(g,"g"),`
`));const k=Wa(n);this.reset();const f=k.headers;let c="";for(const Q in f)Q.toLowerCase()==="fen"&&(c=f[Q]),this.header(Q,f[Q]);if(!a)c&&this.load(c,{preserveHeaders:!0});else if(f.SetUp==="1"){if(!("FEN"in f))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(f.FEN,{preserveHeaders:!0})}let r=k.root;for(;r;){if(r.move){const Q=this._moveFromSan(r.move,a);if(Q==null)throw new Error(`Invalid move in PGN: ${r.move}`);this._makeMove(Q),this._incPositionCount()}r.comment!==void 0&&(this._comments[this.fen()]=r.comment),r=r.variations[0]}const O=k.result;O&&Object.keys(this._header).length&&this._header.Result!==O&&this.setHeader("Result",O)}_moveToSan(n,a){let g="";if(n.flags&le.KSIDE_CASTLE)g="O-O";else if(n.flags&le.QSIDE_CASTLE)g="O-O-O";else{if(n.flags&le.NULL_MOVE)return ca;if(n.piece!==We){const k=cn(n,a);g+=n.piece.toUpperCase()+k}n.flags&(le.CAPTURE|le.EP_CAPTURE)&&(n.piece===We&&(g+=Ye(n.from)[0]),g+="x"),g+=Ye(n.to),n.promotion&&(g+="="+n.promotion.toUpperCase())}return this._makeMove(n),this.isCheck()&&(this.isCheckmate()?g+="#":g+="+"),this._undoMove(),g}_moveFromSan(n,a=!1){let g=pa(n);if(a||(g==="0-0"?g="O-O":g==="0-0-0"&&(g="O-O-O")),g==ca)return{color:this._turn,from:0,to:0,piece:"k",flags:le.NULL_MOVE};let k=wa(g),f=this._moves({legal:!0,piece:k});for(let W=0,H=f.length;W<H;W++)if(g===pa(this._moveToSan(f[W],f)))return f[W];if(a)return null;let c,r,O,Q,E,q=!1;if(r=g.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),r?(c=r[1],O=r[2],Q=r[3],E=r[4],O.length==1&&(q=!0)):(r=g.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),r&&(c=r[1],O=r[2],Q=r[3],E=r[4],O.length==1&&(q=!0))),k=wa(g),f=this._moves({legal:!0,piece:c||k}),!Q)return null;for(let W=0,H=f.length;W<H;W++)if(O){if((!c||c.toLowerCase()==f[W].piece)&&re[O]==f[W].from&&re[Q]==f[W].to&&(!E||E.toLowerCase()==f[W].promotion))return f[W];if(q){const be=Ye(f[W].from);if((!c||c.toLowerCase()==f[W].piece)&&re[Q]==f[W].to&&(O==be[0]||O==be[1])&&(!E||E.toLowerCase()==f[W].promotion))return f[W]}}else if(g===pa(this._moveToSan(f[W],f)).replace("x",""))return f[W];return null}ascii(){let n=`   +------------------------+
`;for(let a=re.a8;a<=re.h1;a++){if(Ot(a)===0&&(n+=" "+"87654321"[Tt(a)]+" |"),this._board[a]){const g=this._board[a].type,f=this._board[a].color===et?g.toUpperCase():g.toLowerCase();n+=" "+f+" "}else n+=" . ";a+1&136&&(n+=`|
`,a+=8)}return n+=`   +------------------------+
`,n+="     a  b  c  d  e  f  g  h",n}perft(n){const a=this._moves({legal:!1});let g=0;const k=this._turn;for(let f=0,c=a.length;f<c;f++)this._makeMove(a[f]),this._isKingAttacked(k)||(n-1>0?g+=this.perft(n-1):g++),this._undoMove();return g}setTurn(n){return this._turn==n?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const n=[];let a=[];for(let g=re.a8;g<=re.h1;g++)this._board[g]==null?a.push(null):a.push({square:Ye(g),type:this._board[g].type,color:this._board[g].color}),g+1&136&&(n.push(a),a=[],g+=8);return n}squareColor(n){if(n in re){const a=re[n];return(Tt(a)+Ot(a))%2===0?"light":"dark"}return null}history({verbose:n=!1}={}){const a=[],g=[];for(;this._history.length>0;)a.push(this._undoMove());for(;;){const k=a.pop();if(!k)break;n?g.push(new Vt(this,k)):g.push(this._moveToSan(k,this._moves())),this._makeMove(k)}return g}_getPositionCount(n){return this._positionCount.get(n)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(n){const a=this._positionCount.get(n)??0;a===1?this._positionCount.delete(n):this._positionCount.set(n,a-1)}_pruneComments(){const n=[],a={},g=k=>{k in this._comments&&(a[k]=this._comments[k])};for(;this._history.length>0;)n.push(this._undoMove());for(g(this.fen());;){const k=n.pop();if(!k)break;this._makeMove(k),g(this.fen())}this._comments=a}getComment(){return this._comments[this.fen()]}setComment(n){this._comments[this.fen()]=n.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const n=this._comments[this.fen()];return delete this._comments[this.fen()],n}getComments(){return this._pruneComments(),Object.keys(this._comments).map(n=>({fen:n,comment:this._comments[n]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(n=>{const a=this._comments[n];return delete this._comments[n],{fen:n,comment:a}})}setCastlingRights(n,a){for(const k of[Ke,Ct])a[k]!==void 0&&(a[k]?this._castling[n]|=Yt[k]:this._castling[n]&=~Yt[k]);this._updateCastlingRights();const g=this.getCastlingRights(n);return(a[Ke]===void 0||a[Ke]===g[Ke])&&(a[Ct]===void 0||a[Ct]===g[Ct])}getCastlingRights(n){return{[Ke]:(this._castling[n]&Yt[Ke])!==0,[Ct]:(this._castling[n]&Yt[Ct])!==0}}moveNumber(){return this._moveNumber}}async function bn(s,n={}){const a=n.currentUser||{},g=n.userRole||a?.role||"employee";let k="chat",f=[],c=null,r=[],O=[],Q=null,E=null,q=!1,W=null,H=null;s.innerHTML=`
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
      <div class="bonding-chat-layout mobile-view-chat" id="bonding-chat-main-wrap">
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
  `,pn(),await lt(),Re();const be=s.querySelector("#tab-nav-chat"),$e=s.querySelector("#tab-nav-lounge"),Je=s.querySelector("#bonding-chat-main-wrap"),nt=s.querySelector("#bonding-lounge-main-wrap");be?.addEventListener("click",async()=>{k="chat",be.classList.add("active"),$e.classList.remove("active"),Je.style.display="grid",nt.style.display="none",Re(),c&&await Me(c._id)}),$e?.addEventListener("click",async()=>{k="lounge_games",$e.classList.add("active"),be.classList.remove("active"),Je.style.display="none",nt.style.display="block",await y()}),s.querySelector("#btn-top-new-chat")?.addEventListener("click",B),s.querySelector("#btn-top-new-group")?.addEventListener("click",h),s.querySelector("#btn-top-challenge")?.addEventListener("click",()=>F());const bt=s.querySelector("#bonding-search-input");bt&&bt.addEventListener("input",d=>{const i=d.target.value.toLowerCase().trim();s.querySelectorAll(".bonding-channel-item").forEach(b=>{const D=b.textContent.toLowerCase();b.style.display=D.includes(i)?"flex":"none"})}),kt(),new MutationObserver((d,i)=>{document.body.contains(s)||(E&&clearInterval(E),H&&clearInterval(H),i.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function lt(){try{const[d,i]=await Promise.all([Le("/bonding/channels").catch(()=>[]),Le("/bonding/colleagues").catch(()=>[])]);if(f=d,r=i,f.length>0){const t=localStorage.getItem("ci360_bonding_active_channel");t&&f.some(b=>b._id===t)?c=f.find(b=>b._id===t):c||(c=f.find(b=>b.name.includes("Lounge"))||f[0])}Be(),c&&await Me(c._id)}catch(d){console.error("Failed to load bonding data",d)}}async function Me(d,i=!1){if(d)try{localStorage.setItem("ci360_bonding_active_channel",d),O=await Le(`/bonding/channels/${d}/messages`),i?o():m()}catch(t){console.error("Failed to load messages",t)}}let dt=0;function kt(){E&&clearInterval(E),E=setInterval(async()=>{try{if(!document.body.contains(s)){clearInterval(E);return}if(dt++,dt%2===0){const d=await Le("/bonding/channels").catch(()=>null);d&&JSON.stringify(d.map(i=>i._id+i.lastMessage?.sentAt))!==JSON.stringify(f.map(i=>i._id+i.lastMessage?.sentAt))&&(f=d,Be())}k==="chat"&&c?await Me(c._id,!0):k==="lounge_games"&&await y(!0)}catch{}},3e3)}function Be(){const d=s.querySelector("#bonding-group-list"),i=s.querySelector("#bonding-direct-list");if(!d||!i)return;const t=f.filter(D=>D.type==="group"),b=f.filter(D=>D.type==="direct");if(t.length===0)d.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const D=a?._id||a?.id,M=g==="superadmin"||a?.role==="superadmin";d.innerHTML=t.map(w=>{const K=c&&c._id===w._id,R=w.createdBy&&w.createdBy.userId&&String(w.createdBy.userId)===String(D)||M;return`
          <div class="bonding-channel-item ${K?"active":""}" data-channel-id="${w._id}">
            <div class="bonding-channel-icon">${w.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(w.name)}</div>
              <div class="bonding-channel-preview">${v(w.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${R?`
              <button class="bonding-channel-del-btn" data-channel-id="${w._id}" title="Delete Group (Creator only)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            `:`
              <button class="bonding-channel-leave-btn" data-channel-id="${w._id}" title="Leave Group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            `}
          </div>
        `}).join("")}b.length===0?i.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':i.innerHTML=b.map(D=>{const M=c&&c._id===D._id,w=D.displayName||D.name||"Colleague",K=w.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${M?"active":""}" data-channel-id="${D._id}">
            <div class="bonding-channel-avatar">${K}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(w)}</div>
              <div class="bonding-channel-preview">${v(D.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${D._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),wt()}function wt(){const d=s.querySelectorAll(".bonding-channel-item");d.forEach(i=>{i.onclick=async t=>{if(t.target.closest(".bonding-channel-del-btn")||t.target.closest(".bonding-channel-leave-btn"))return;const b=i.dataset.channelId,D=f.find(M=>M._id===b);if(D){c=D,d.forEach(w=>w.classList.remove("active")),i.classList.add("active");const M=s.querySelector("#bonding-chat-main-wrap");M&&(M.classList.remove("mobile-view-sidebar"),M.classList.add("mobile-view-chat")),Re(),await Me(D._id)}}}),s.querySelectorAll(".bonding-channel-leave-btn").forEach(i=>{i.onclick=async t=>{t.stopPropagation();const b=i.dataset.channelId,M=f.find(w=>w._id===b)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${M}"?`))try{i.disabled=!0,await xe(`/bonding/channels/${b}/leave`,{}),S(`You left "${M}"`,"info"),f=f.filter(w=>w._id!==b),c&&c._id===b&&(c=f.find(w=>w.type==="group")||f[0]||null,Re(),c&&await Me(c._id)),Be()}catch(w){S(w.message||"Failed to leave group","error"),i.disabled=!1}}}),s.querySelectorAll(".bonding-channel-del-btn").forEach(i=>{i.onclick=async t=>{t.stopPropagation();const b=i.dataset.channelId,D=f.find(K=>K._id===b),M=D&&D.type==="direct",w=M?"this 1-on-1 chat":`the group "${D?.name||""}"`;if(confirm(`Are you sure you want to delete ${w}? All messages will be permanently removed.`))try{i.disabled=!0,await at(`/bonding/channels/${b}`),S(M?"1-on-1 chat deleted":"Group deleted","success"),f=f.filter(K=>K._id!==b),c&&c._id===b&&(c=f[0]||null,Re(),c&&await Me(c._id)),Be()}catch(K){S(K.message||"Failed to delete conversation","error"),i.disabled=!1}}}),s.querySelector("#btn-create-group")?.addEventListener("click",h),s.querySelector("#btn-new-direct-chat")?.addEventListener("click",B)}function Re(){const d=s.querySelector("#bonding-chat-panel");if(!d)return;if(!c){d.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const i=v(c.displayName||c.name),t=(c.members||[]).length,b=c.type==="group",D=a?._id||a?.id,M=b?null:(c.members||[]).find(R=>R.userId?.toString()!==D?.toString()),w=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(D),K=g==="superadmin"||a?.role==="superadmin",X=w||K;d.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <button type="button" class="bonding-header-btn mobile-back-channels-btn" id="btn-mobile-back-channels" title="Back to All Chats">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Chats</span>
          </button>
          <div class="bonding-chat-header-avatar">${b?c.avatar||"👥":"👤"}</div>
          <div class="bonding-chat-header-titles">
            <div class="bonding-chat-title">${i}</div>
            <div class="bonding-chat-sub">
              ${b?`<span>${t} members</span> · <span>${v(c.description||"Public Lounge")}</span>`:'<span>Direct Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${b?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${t})</span>
            </button>
            ${X?`
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
        ${Ve()}
      </div>

      <div class="bonding-chat-input-bar">
        <button class="bonding-input-action-btn" id="btn-quick-emoji" title="Insert Emoji">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
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
    `,st(M),ve(M),mt(),e()}function Ve(){if(!O||O.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const d=a?._id||a?.id;return O.map(i=>{const t=i.sender&&i.sender.userId&&d&&i.sender.userId.toString()===d.toString();if(i.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${i._id}">
            <span>ℹ️</span> <span>${v(i.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${i._id}" title="Delete Message">&times;</button>
          </div>
        `;if(i.type==="challenge"&&i.challengeData){const w=i.challengeData,K=w.gameTitle||"Game Challenge",X=w.gameType||"dotsboxes",R=X==="dotsboxes"?"🎮":X==="ludo"?"🎲":X==="chess"?"♟️":"❌",P=w.gameState?.invitationId,J=w.targetUserId?.toString(),ie=i.sender?.userId?.toString(),Z=d&&J===d.toString(),ae=d&&ie===d.toString();return`
          <div class="bonding-msg-row ${t?"self":"other"}" data-msg-id="${i._id}">
            <div class="bonding-msg-avatar" title="${v(i.sender?.name||"Teammate")}">
              ${(i.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-time">${_(i.createdAt)}</span>
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
                  <div class="game-bubble-icon">${R}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${v(K)}</h4>
                    <p class="game-bubble-desc">${v(i.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${w.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':w.status==="active"||w.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':w.status==="declined"?'<span class="badge red">❌ Challenge Declined</span>':w.status==="cancelled"?'<span class="badge gray">🚫 Challenge Cancelled</span>':`<span class="badge gray">${v(w.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${w.status==="pending"&&Z?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${P}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${P}" data-action="decline">
                        Decline
                      </button>
                    `:w.status==="pending"&&ae?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${P}" data-action="cancel">
                          Cancel
                        </button>
                      `:w.status==="declined"||w.status==="cancelled"?`
                        <div class="game-pending-text" style="font-size:11.5px;color:var(--text-3);font-style:italic;">
                          ${w.status==="declined"?"Challenge was declined":"Challenge was cancelled"}
                        </div>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-match-id="${w.gameState?.matchId||""}" data-invite-id="${P||""}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${de(i)}
            </div>
          </div>
        `}const b=v(i.sender?.name||"Teammate"),D=_(i.createdAt),M=de(i);return`
        <div class="bonding-msg-row ${t?"self":"other"}" data-msg-id="${i._id}">
          <div class="bonding-msg-avatar" title="${b}">${b.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-time">${D}</span>
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
      `}).join("")}function de(d){const i=d.reactions||[];return!i||i.length===0?"":`
      <div class="bonding-reactions-row">
        ${i.map(b=>{const D=a?._id||a?.id;return`
        <button class="bonding-rxn-tag ${(b.users||[]).some(w=>w.toString()===D?.toString())?"active":""}" data-msg-id="${d._id}" data-emoji="${b.emoji}">
          <span>${b.emoji}</span> <span>${b.users?b.users.length:1}</span>
        </button>
      `}).join("")}
      </div>
    `}function st(d){const i=s.querySelector("#btn-mobile-back-channels");i&&(i.onclick=X=>{X.stopPropagation();const R=s.querySelector("#bonding-chat-main-wrap");R&&(R.classList.remove("mobile-view-chat"),R.classList.add("mobile-view-sidebar"))});const t=s.querySelector("#btn-chat-challenge");t&&(t.onclick=()=>{d?F(null,d.userId||d._id):F()});const b=s.querySelector("#btn-manage-members");b&&(b.onclick=z);const D=s.querySelector("#btn-delete-group");D&&(D.onclick=p);const M=s.querySelector("#btn-leave-group");M&&(M.onclick=L);const w=s.querySelector("#btn-delete-direct");w&&(w.onclick=async()=>{if(c&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{w.disabled=!0,await at(`/bonding/channels/${c._id}`),S("1-on-1 chat deleted successfully","success");const X=c._id;f=f.filter(R=>R._id!==X),c=f[0]||null,Be(),Re(),c&&await Me(c._id)}catch(X){S(X.message||"Could not delete 1-on-1 chat","error"),w.disabled=!1}});const K=s.querySelector("#btn-clear-chat");K&&(K.onclick=async()=>{if(c&&confirm("Are you sure you want to clear all messages in this conversation?"))try{K.disabled=!0,await at(`/bonding/channels/${c._id}/messages`),S("Chat messages cleared","success"),O=[],m()}catch(X){S(X.message||"Could not clear chat messages","error")}finally{K.disabled=!1}})}function ve(d){const i=s.querySelector("#bonding-message-input"),t=s.querySelector("#btn-send-message"),b=s.querySelector("#btn-quick-emoji"),D=s.querySelector("#btn-input-challenge");i&&i.addEventListener("keydown",M=>{M.key==="Enter"&&!M.shiftKey&&(M.preventDefault(),ct())}),t&&(t.onclick=ct),D&&(D.onclick=()=>{d?F(null,d.userId||d._id):F()}),b&&(b.onclick=M=>{M.stopPropagation(),i&&T(b,w=>{const K=i.selectionStart??i.value.length,X=i.selectionEnd??i.value.length,R=i.value;i.value=R.substring(0,K)+w+R.substring(X),i.focus();const P=K+w.length;try{i.setSelectionRange(P,P)}catch{}})})}function mt(){s.querySelectorAll(".btn-respond-invite").forEach(b=>{b.onclick=async()=>{const D=b.dataset.inviteId,M=b.dataset.action;await j(D,M)}}),s.querySelectorAll(".btn-launch-match-from-card").forEach(b=>{b.onclick=async()=>{const D=b.dataset.matchId,M=b.dataset.inviteId;if(D){C(D);return}try{b.disabled=!0;const w=await Le("/bonding/invitations"),X=(w.incoming||[]).concat(w.sent||[]).find(J=>J._id===M||J.matchId&&J.matchId.toString()===M);if(X&&X.matchId){C(X.matchId);return}const P=(await Le("/bonding/matches").catch(()=>[])||[]).find(J=>J.invitationId===M||J._id===M);if(P){C(P._id);return}S("Match has not started yet or has finished","warning")}catch(w){S(w.message||"Could not load match","error")}finally{b.disabled=!1}}}),s.querySelectorAll(".bonding-msg-del-btn").forEach(b=>{b.onclick=async D=>{D.stopPropagation();const M=b.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{b.disabled=!0,await at(`/bonding/messages/${M}`),O=O.filter(w=>w._id!==M),o(),S("Message deleted","success")}catch(w){S(w.message||"Failed to delete message","error"),b.disabled=!1}}}),s.querySelectorAll(".bonding-rxn-tag").forEach(b=>{b.onclick=async()=>{const D=b.dataset.msgId,M=b.dataset.emoji;await ft(D,M)}}),s.querySelectorAll(".bonding-add-rxn-btn").forEach(b=>{b.onclick=D=>{const M=b.dataset.msgId;U(D.currentTarget,async w=>{await ft(M,w)})}})}async function ct(){const d=s.querySelector("#bonding-message-input");if(!d||!c||q)return;const i=d.value.trim();if(i)try{q=!0,d.value="";const t=await xe(`/bonding/channels/${c._id}/messages`,{content:i,type:"text"});O.push(t),m(),e()}catch(t){S(t.message||"Failed to send message","error")}finally{q=!1,d.focus()}}async function ft(d,i){try{const t=await xe(`/bonding/messages/${d}/react`,{emoji:i}),b=O.find(D=>D._id===d);b&&(b.reactions=t,o())}catch(t){S(t.message||"Failed to react","error")}}function e(){const d=s.querySelector("#bonding-messages-feed");d&&(d.scrollTop=d.scrollHeight)}function o(){const d=s.querySelector("#bonding-messages-feed");if(!d)return;const i=d.scrollHeight-d.scrollTop<=d.clientHeight+80;d.innerHTML=Ve(),mt(),i&&e()}function m(){const d=s.querySelector("#bonding-messages-feed");d&&(d.innerHTML=Ve(),mt())}async function y(d=!1){const i=s.querySelector("#bonding-lounge-main-wrap");if(i){d||(i.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const t=await Le("/bonding/games/overview");Q=t;const b=t.myStats||{},D=t.availableGames||[],M=t.incomingChallenges||[],w=t.sentChallenges||[],K=t.activeMatches||[],X=t.recentMatches||[],R=a?._id||a?.id;i.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${b.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${b.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${b.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${b.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${b.gamesPlayed>0?Math.round((b.wins||0)/b.gamesPlayed*100):0}%</span>
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
              ${D.map(P=>`
                <div class="lounge-game-card" data-game-id="${P.id}">
                  <div class="game-card-icon">${P.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${v(P.name)}</h4>
                    <p class="game-card-desc">${v(P.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${P.duration}</span>
                      ${P.id==="ludo"||P.id==="dotsboxes"?`<span class="meta-pill">👥 Up to 4 Players</span><span class="meta-pill">${P.id==="dotsboxes"?"🎮 16 Boxes Grid":"🎯 4 Pawns / Base"}</span>`:'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${P.id}" data-game-title="${v(P.name)}">
                    ${P.id==="dotsboxes"?"⚔️ Play Dots & Boxes (2P–4P)":P.id==="ludo"?"⚔️ Play Ludo (2P–4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${M.length+w.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${M.length})</h5>
              ${M.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${M.map(P=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(P.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(P.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${v(P.sender.name)}</strong> (${v(P.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${P._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${P._id}" data-action="decline">
                            Decline
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

              <!-- Sent -->
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${w.length})</h5>
              ${w.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${w.map(P=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(P.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(P.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${v(P.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${P._id}" data-action="cancel">
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
                <span class="badge green">${K.length} Live</span>
              </div>

              ${K.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${K.map(P=>{const ie=(P.players||P.gameState?.players||[P.player1,P.player2].filter(Boolean)).filter(se=>se.userId&&se.userId.toString()!==R?.toString()),Z=P.player1?.userId?.toString()===R?.toString()?P.player2:P.player1,ae=ie.length>0?ie.map(se=>v(se.name)).join(", "):Z?.name?v(Z.name):"Colleagues",ce=R&&P.currentTurnUserId&&P.currentTurnUserId.toString()===R.toString();return`
                        <div class="lounge-active-match-card ${ce?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${P.gameType==="dotsboxes"?"🎮":P.gameType==="ludo"?"🎲":P.gameType==="chess"?"♟️":"❌"}</span>
                            <div>
                              <div class="match-game-title">${v(P.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${ae}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ce?"my-turn":"wait"}">
                              ${ce?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${P._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${P._id}" title="Delete Match">
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
              ${X.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${X.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${X.map(P=>{const ie=R&&P.player1.userId.toString()===R.toString()?P.player2:P.player1,Z=R&&P.winnerId&&P.winnerId.toString()===R.toString(),ae=P.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${v(P.gameTitle)}</span>
                          <span class="recent-date">${_(P.completedAt||P.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${P._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${v(ie.name)}</strong></div>
                          <div class="recent-outcome ${Z?"win":ae?"draw":"loss"}">
                            ${Z?"🏆 VICTORY":ae?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${v(P.winningReason||P.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${P._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${P._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,A()}catch(t){i.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${v(t.message)}</p>
        </div>
      `}}}function A(){s.querySelectorAll(".btn-challenge-game").forEach(i=>{i.onclick=()=>{const t=i.dataset.gameId;F(t)}}),s.querySelectorAll(".btn-respond-invite").forEach(i=>{i.onclick=async()=>{const t=i.dataset.inviteId,b=i.dataset.action;await j(t,b),await y()}}),s.querySelectorAll(".btn-resume-match").forEach(i=>{i.onclick=()=>{const t=i.dataset.matchId;C(t)}}),s.querySelectorAll(".btn-recent-rematch").forEach(i=>{i.onclick=async()=>{const t=i.dataset.matchId;try{i.disabled=!0;const b=await xe(`/bonding/matches/${t}/action`,{action:"rematch"});b.match&&(S("Rematch created! Opening arena ⚔️","success"),C(b.match._id))}catch(b){S(b.message||"Could not start rematch","error")}finally{i.disabled=!1}}}),s.querySelectorAll(".btn-delete-match").forEach(i=>{i.onclick=async t=>{t.stopPropagation();const b=i.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{i.disabled=!0,await at(`/bonding/matches/${b}`),S("Match deleted successfully","success"),await y()}catch(D){S(D.message||"Failed to delete match","error")}finally{i.disabled=!1}}});const d=s.querySelector("#btn-clear-matches");d&&(d.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{d.disabled=!0,await at("/bonding/matches?filter=completed"),S("Completed matches history cleared","success"),await y()}catch(i){S(i.message||"Failed to clear matches","error")}finally{d.disabled=!1}})}function F(d=null,i=null){const t=s.querySelector("#bonding-modals-root"),b=a?._id||a?.id,D=new Set(["employee","admin","superadmin"]),M=r.filter(Z=>!Z.isSelf&&Z._id.toString()!==b?.toString()&&D.has(Z.role));let w=d||"dotsboxes",K=i?i.toString():null,X=2,R=K?[K]:[],P="none";function J(){const Z=M.find(he=>he._id.toString()===K),ae=w==="dotsboxes"||w==="ludo",ce=X-1,se=R.length===ce;t.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${w==="dotsboxes"?"Play Dots & Boxes (2P, 3P, 4P)":w==="ludo"?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${w==="dotsboxes"?"active":""}" data-game="dotsboxes">
                    <span>🎮</span> <span>Dots & Boxes</span>
                  </button>
                  <button class="game-pill-btn ${w==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                  <button class="game-pill-btn ${w==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                </div>
              </div>

              <!-- MULTIPLAYER: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${ae?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${X===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${X===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${X===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${ae?`Step ${ae?3:2} — Select Colleagues to Play With (${R.length}/${ce} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${M.map(he=>{const qe=ae?R.includes(he._id.toString()):K===he._id.toString();return`
                      <div class="eligible-emp-item ${qe?"selected":""}" data-user-id="${he._id}">
                        <div class="emp-item-avatar">${he.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${v(he.name)}</span>
                          <span class="emp-item-role">${v(he.role==="superadmin"?"Superadmin":he.role==="admin"?"Admin":"Employee")} · ${v(he.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${qe?"active":""}">
                          ${qe?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${w==="dotsboxes"?`🎮 Dots & Boxes (${X} Players)`:w==="ludo"?`🎲 Ludo (${X} Players · 4 Pawns)`:"❌ Tic-Tac-Toe Challenge"}</div>
                  ${ae?`
                    <div><strong>Opponents:</strong> ${R.length>0?R.map(he=>{const qe=M.find(ee=>ee._id.toString()===he);return qe?`<strong>${v(qe.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+ce+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${Z?`<strong>${v(Z.name)}</strong> (${v(Z.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(ae?!se:!K)?"disabled":""}>
                ${w==="dotsboxes"?`Start ${X}P Dots & Boxes 🎮`:w==="ludo"?`Start ${X}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,ie()}function ie(){t.querySelector(".bonding-modal-close").onclick=()=>{t.innerHTML=""},t.querySelector("#btn-cancel-challenge-flow").onclick=()=>{t.innerHTML=""},t.querySelectorAll(".game-pill-btn").forEach(ce=>{ce.onclick=()=>{w=ce.dataset.game,J()}}),t.querySelectorAll(".ludo-mode-btn").forEach(ce=>{ce.onclick=()=>{X=Number(ce.dataset.count),R=R.slice(0,X-1),J()}});const Z=t.querySelector("#flow-emp-search");Z&&(Z.oninput=ce=>{const se=ce.target.value.toLowerCase().trim();t.querySelectorAll(".eligible-emp-item").forEach(he=>{const qe=he.textContent.toLowerCase();he.style.display=qe.includes(se)?"flex":"none"})}),t.querySelectorAll(".eligible-emp-item").forEach(ce=>{ce.onclick=()=>{const se=ce.dataset.userId;if(w==="dotsboxes"||w==="ludo"){const qe=X-1;R.includes(se)?R=R.filter(ee=>ee!==se):R.length<qe?R.push(se):R[qe-1]=se}else K=se;J()}});const ae=t.querySelector("#btn-submit-challenge-flow");ae&&(ae.onclick=async()=>{if(w==="dotsboxes"){const ce=X-1;if(R.length<ce){S(`Please select ${ce} colleague(s) to play with`,"warning");return}try{ae.disabled=!0,ae.textContent="Launching Dots & Boxes...";const se=await xe("/bonding/matches/instant-dotsboxes",{playerCount:X,targetUserIds:R});t.innerHTML="",S(`Dots & Boxes match started (${X} Players)! 🎮`,"success"),se&&se._id&&C(se._id)}catch(se){S(se.message||"Failed to start Dots & Boxes match","error"),ae.disabled=!1,ae.textContent=`Start ${X}P Dots & Boxes 🎮`}return}if(w==="ludo"){const ce=X-1;if(R.length<ce){S(`Please select ${ce} colleague(s) to play with`,"warning");return}try{ae.disabled=!0,ae.textContent="Launching Match...";const se=await xe("/bonding/matches/instant-ludo",{playerCount:X,targetUserIds:R});t.innerHTML="",S(`Ludo match started (${X} Players)! 🎲`,"success"),se&&se._id&&C(se._id)}catch(se){S(se.message||"Failed to start Ludo match","error"),ae.disabled=!1,ae.textContent=`Start ${X}P Ludo Match 🎲`}return}if(!K){S("Please select an employee to challenge","warning");return}try{ae.disabled=!0,ae.textContent="Sending Challenge...",await xe("/bonding/invitations",{gameType:w,targetUserId:K,matchSettings:{timerMode:P},channelId:null}),S("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),t.innerHTML="",await loadChannels();const ce=f.find(se=>se.type==="direct"&&se.members?.some(he=>(he.userId||he._id)?.toString()===K));ce?selectChannel(ce):c&&await Me(c._id),k==="lounge_games"&&await y()}catch(ce){S(ce.message||"Could not send challenge","error"),ae.disabled=!1,ae.textContent="Send Challenge 🚀"}})}J()}async function j(d,i){if(!(!d||!i))try{const t=await Jt(`/bonding/invitations/${d}/respond`,{action:i});i==="accept"?(S("Challenge accepted! Entering match arena ⚔️","success"),t.match&&C(t.match._id)):i==="decline"?(S("Challenge declined","info"),s.querySelectorAll(`[data-invite-id="${d}"]`).forEach(b=>{const D=b.closest(".lounge-invite-item")||b.closest(".bonding-msg-row");D&&D.remove()})):i==="cancel"&&(S("Challenge cancelled","info"),s.querySelectorAll(`[data-invite-id="${d}"]`).forEach(b=>{const D=b.closest(".lounge-invite-item")||b.closest(".bonding-msg-row");D&&D.remove()})),c&&await Me(c._id),k==="lounge_games"&&await y()}catch(t){S(t.message||"Action failed","error")}}async function C(d){if(!d)return;W=d,H&&clearInterval(H);const i=s.querySelector("#bonding-modals-root");let t=null,b=null,D=[],M="",w=null,K=!1,X=!1,R=0;function P(ee){return ee?JSON.stringify({status:ee.status,turn:ee.currentTurnUserId?.toString(),turnColor:ee.turn,movesCount:ee.moves?.length,dice:ee.gameState?.dice,rolled:ee.gameState?.rolled,lastRoll:ee.gameState?.lastRoll,lastRollColor:ee.gameState?.lastRollColor,lastRollBy:ee.gameState?.lastRollBy,lastActionText:ee.gameState?.lastActionText,tokens:ee.gameState?.tokens,board:ee.gameState?.board,grid:ee.gameState?.grid,fen:ee.gameState?.fen,hLines:ee.gameState?.hLines,vLines:ee.gameState?.vLines,boxes:ee.gameState?.boxes,scores:ee.gameState?.scores,draw:ee.drawOfferedBy?.toString(),rematchOfferedBy:ee.rematchOfferedBy?.toString(),rematchDeclined:!!ee.rematchDeclined}):""}async function J(){try{return t=await Le(`/bonding/matches/${d}`),t}catch(ee){return S(ee.message||"Could not load match","error"),ie(),null}}if(t=await J(),!t)return;M=P(t);function ie(){H&&clearInterval(H),w&&clearTimeout(w),K=!1,W=null,i.innerHTML="",k==="lounge_games"&&y(!0),c&&Me(c._id,!0)}H=setInterval(async()=>{if(!W||W!==d){clearInterval(H);return}if(!(X&&Date.now()-R<2500))try{const ee=await Le(`/bonding/matches/${d}`);if(!ee)return;const Fe=P(ee);if(Fe!==M){if(M=Fe,t=ee,ee.rematchDeclined){S("Rematch was declined","info"),ie();return}Z()}}catch{}},800);function Z(){if(!t)return;const ee=a?._id||a?.id,Fe=ee&&t.player1?.userId?.toString()===ee.toString(),De=Fe?t.player1:t.player2||t.player1,ge=Fe&&t.player2||t.player1,ye=ee&&t.currentTurnUserId&&t.currentTurnUserId.toString()===ee.toString(),ke=t.status!=="active";let Oe=[];t.gameState?.players&&Array.isArray(t.gameState.players)&&t.gameState.players.length>0?Oe=t.gameState.players:Oe=[t.player1,t.player2].filter(Boolean);const Ue=[{emoji:"🐻",name:"Gentle Bear"},{emoji:"🦌",name:"Clever Deer"},{emoji:"🦊",name:"Swift Fox"},{emoji:"🦁",name:"Mighty Lion"}];i.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal arena-split-layout">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Left Sidebar Panel with Players & Controls -->
            <aside class="arena-sidebar-panel">
              <div class="arena-sidebar-players">
                ${Oe.map((pe,je)=>{const Ne=Ue[je]||{emoji:"🎮",name:"Challenger"},_e=pe.userId&&ee&&pe.userId.toString()===ee.toString();let Ce=!1,Pe="✕";if(t.gameType==="tictactoe"){const oe=pe.assignedRole||(je===0?"X":"O");Ce=(t.turn===oe||t.currentTurnUserId&&pe.userId&&t.currentTurnUserId.toString()===pe.userId.toString())&&!ke,Pe=oe==="O"?"◯":"✕"}else if(t.gameType==="dotsboxes"){const oe=t.turn||t.gameState?.turnColor;Ce=(pe.color&&pe.color===oe||t.gameState?.turnIndex!==void 0&&t.gameState.turnIndex===je||t.currentTurnUserId&&pe.userId&&t.currentTurnUserId.toString()===pe.userId.toString())&&!ke,Pe="⏹"}else if(t.gameType==="ludo"){const oe=t.turn||t.gameState?.turnColor;Ce=(pe.color&&pe.color===oe||t.currentTurnUserId&&pe.userId&&t.currentTurnUserId.toString()===pe.userId.toString())&&!ke,Pe="🎲"}else{const oe=pe.assignedRole||(je===0?"white":"black");Ce=(t.turn===oe||t.currentTurnUserId&&pe.userId&&t.currentTurnUserId.toString()===pe.userId.toString())&&!ke,Pe="♟"}let I="";t.gameType==="dotsboxes"&&t.gameState?.scores?I=` · ${t.gameState.scores[pe.color]||0} pts`:t.gameType==="ludo"&&t.gameState?.tokens&&(I=` · ${(t.gameState.tokens[pe.color]||[]).filter(Ee=>Ee.step>=57).length}/4 Home`);const N=pe.name?pe.name:Ne.name,u=_e?"You":"Opponent";return`
                    <div class="game-sidebar-player-row ${Ce?"active-turn":""}">
                      <div class="turn-indicator-slot">
                        ${Ce?`
                          <div class="turn-pointer-pill">
                            <span class="pill-sym">${Pe}</span>
                            <span class="pill-txt">Turn</span>
                          </div>
                        `:""}
                      </div>
                      <div class="game-player-avatar-circle p-color-${je}">
                        <span class="avatar-emoji">${Ne.emoji}</span>
                      </div>
                      <div class="game-player-meta">
                        <div class="game-player-name" title="${v(N)}">${v(N)}</div>
                        <div class="game-player-role">${u}${I}</div>
                      </div>
                    </div>
                  `}).join("")}
              </div>

              <!-- Sidebar Bottom Footer -->
              <div class="arena-sidebar-footer">
                <div class="game-code-display">Game code: <strong>${(t._id||"7370").slice(-4).toUpperCase()}</strong></div>
                <div class="arena-sidebar-divider"></div>
                <div class="arena-sidebar-actions">
                  ${ke?`
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
              ${t.drawOfferedBy&&t.drawOfferedBy.toString()!==ee?.toString()&&!ke?`
                <div class="arena-draw-offer-banner">
                  <span>🤝 ${v(ge?.name||"Opponent")} has offered a draw. Accept?</span>
                  <div style="display:flex;gap:8px;">
                    <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                    <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
                  </div>
                </div>
              `:""}

              <!-- Main Playing Board -->
              <div class="arena-board-wrap">
                ${t.gameType==="dotsboxes"?ae(Fe):""}
                ${t.gameType==="chess"?ce(Fe):""}
                ${t.gameType==="tictactoe"?se():""}
                ${t.gameType==="ludo"?he(Fe):""}
              </div>

              <!-- Match Result Banner (When finished) -->
              ${ke?`
                <div class="arena-game-over-banner">
                  <div class="game-over-icon">${t.winnerId&&t.winnerId.toString()===ee?.toString()?"🏆":t.status==="draw"?"🤝":"🎖️"}</div>
                  <div class="game-over-text">
                    <h4>${t.winnerId&&t.winnerId.toString()===ee?.toString()?"VICTORY!":t.status==="draw"?"STALEMATE / DRAW":`${v(t.winnerName)} Wins!`}</h4>
                    <p>Reason: ${v(t.winningReason||"Match concluded")}</p>
                  </div>
                  <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                    ${t.rematchOfferedBy&&t.rematchOfferedBy.toString()===ee?.toString()?`
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
      `,qe(ye,Fe,De)}function ae(ee,Fe,De){const ge=t.gameState||{},ye=ge.rows||4,ke=ge.cols||4,Oe=ge.players||[{...t.player1,color:"red",assignedRole:"red"},{...t.player2,color:"blue",assignedRole:"blue"}],Ue=ge.activeColors||["red","blue"],pe=t.turn||ge.turnColor||"red",je=a?._id||a?.id,_e=(Oe.find(fe=>fe.userId&&fe.userId.toString()===je?.toString())||Oe[0])?.color||(ee?"red":"blue"),Ce=_e===pe&&t.status==="active",Pe=ge.scores||{red:0,blue:0,green:0,amber:0},I=ge.hLines||Array(ye+1).fill(null).map(()=>Array(ke).fill(null)),N=ge.vLines||Array(ye).fill(null).map(()=>Array(ke+1).fill(null)),u=ge.boxes||Array(ye).fill(null).map(()=>Array(ke).fill(null)),oe={red:{name:"Red",hex:"#ef4444",light:"rgba(239,68,68,0.18)",border:"#f87171"},blue:{name:"Blue",hex:"#3b82f6",light:"rgba(59,130,246,0.18)",border:"#60a5fa"},green:{name:"Green",hex:"#10b981",light:"rgba(16,185,129,0.18)",border:"#34d399"},amber:{name:"Amber",hex:"#f59e0b",light:"rgba(245,158,11,0.18)",border:"#fbbf24"}},ne=Oe.find(fe=>fe.color===pe),Ee=ne?v(ne.name):pe.toUpperCase();let G=[];for(let fe=0;fe<=ye*2;fe++)for(let ue=0;ue<=ke*2;ue++){const Te=fe%2===0,pt=ue%2===0;if(Te&&pt)G.push(`
              <div class="dots-cell dot-intersection" data-r="${fe/2}" data-c="${ue/2}">
                <span class="dots-dot"></span>
              </div>
            `);else if(Te&&!pt){const Se=fe/2,Ie=Math.floor(ue/2),we=I[Se]&&I[Se][Ie],Y=!!we,He=we?.color||"",Ae=Ce&&!Y&&t.status==="active";G.push(`
              <div 
                class="dots-cell dots-line h-line ${Y?"drawn color-"+He:""} ${Ae?"clickable my-color-"+_e:""}"
                data-type="h" 
                data-r="${Se}" 
                data-c="${Ie}"
                role="button"
                tabindex="${Ae?"0":"-1"}"
                title="${Y?`Drawn by ${v(we.player||He)}`:Ae?"Click to draw line":""}"
              >
                <div class="dots-line-bar"></div>
              </div>
            `)}else if(!Te&&pt){const Se=Math.floor(fe/2),Ie=ue/2,we=N[Se]&&N[Se][Ie],Y=!!we,He=we?.color||"",Ae=Ce&&!Y&&t.status==="active";G.push(`
              <div 
                class="dots-cell dots-line v-line ${Y?"drawn color-"+He:""} ${Ae?"clickable my-color-"+_e:""}"
                data-type="v" 
                data-r="${Se}" 
                data-c="${Ie}"
                role="button"
                tabindex="${Ae?"0":"-1"}"
                title="${Y?`Drawn by ${v(we.player||He)}`:Ae?"Click to draw line":""}"
              >
                <div class="dots-line-bar"></div>
              </div>
            `)}else{const Se=Math.floor(fe/2),Ie=Math.floor(ue/2),we=u[Se]&&u[Se][Ie],Y=!!we,He=we?.owner||"",Ae=we?.ownerName?we.ownerName.charAt(0).toUpperCase():He.charAt(0).toUpperCase();G.push(`
              <div class="dots-cell dots-box ${Y?"claimed color-"+He:""}" data-br="${Se}" data-bc="${Ie}">
                ${Y?`
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
            ${Ue.map(fe=>{const ue=Oe.find(Ie=>Ie.color===fe)||{name:oe[fe].name},Te=pe===fe&&t.status==="active",pt=ue.userId&&ue.userId.toString()===je?.toString(),Se=Pe[fe]||0;return`
                <div class="dots-player-card ${fe} ${Te?"is-turn-active":""}">
                  <div class="dots-player-header">
                    <span class="dots-player-dot" style="background:${oe[fe].hex}"></span>
                    <span class="dots-player-name">${v(ue.name)} ${pt?"(You)":""}</span>
                    ${Te?'<span class="dots-turn-pill">TURN</span>':""}
                  </div>
                  <div class="dots-player-score">
                    <span class="score-val" style="color:${oe[fe].hex}">${Se}</span>
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
            <div class="dots-guidance ${Ce?"highlight":""}">
              ${Ce?`👉 It is your turn (<strong>${oe[_e].name}</strong>)! Click any open line between two dots to draw.`:`⏳ Waiting for <strong>${Ee}</strong> (<strong>${oe[pe]?.name||pe}</strong>) to draw a line...`}
            </div>
            <div class="dots-caption">
              ${v(ge.lastActionText||"Connect 4 sides to claim a box and earn a bonus turn!")}
            </div>
          </div>
        </div>
      `}function ce(ee){const Fe=t.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",De=new $a(Fe),ge=ee?t.player1.assignedRole==="white":t.player2.assignedRole==="white",ye={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},ke=ge?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Oe=ge?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Ue='<div class="chess-board-grid">';for(const Ne of Oe)for(const _e of ke){const Ce=`${_e}${Ne}`,Pe=De.get(Ce),I=(_e.charCodeAt(0)-97+Ne)%2!==0,N=b===Ce,u=D.includes(Ce),oe=Pe?Pe.color==="w"?ye[Pe.type.toUpperCase()]:ye[Pe.type]:"";Ue+=`
            <div class="chess-sq ${I?"light":"dark"} ${N?"selected":""} ${u?"legal-dot":""}" data-square="${Ce}">
              ${oe?`<span class="chess-piece ${Pe.color==="w"?"white-piece":"black-piece"}">${oe}</span>`:""}
            </div>
          `}Ue+="</div>";const je=(t.moves||[]).map(Ne=>`
        <span class="chess-move-token">${Ne.moveNum}. ${Ne.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${Ue}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${je||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function se(){const ee=t.gameState?.board||Array(9).fill(null),Fe=t.winningCells||[];return`
        <div class="ttt-modern-court">
          <div class="ttt-modern-grid">
            ${ee.map((De,ge)=>{const ye=Fe.includes(ge);let ke="";return De==="X"?ke=`
                  <svg class="ttt-svg-symbol x" width="58" height="58" viewBox="0 0 58 58" fill="none">
                    <line x1="15" y1="15" x2="43" y2="43" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/>
                    <line x1="43" y1="15" x2="15" y2="43" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/>
                  </svg>
                `:De==="O"&&(ke=`
                  <svg class="ttt-svg-symbol o" width="58" height="58" viewBox="0 0 58 58" fill="none">
                    <circle cx="29" cy="29" r="16" stroke="#FF2A5F" stroke-width="8" fill="none"/>
                  </svg>
                `),`
                <div class="ttt-cell ttt-modern-tile ${De?"filled":"empty"} ${ye?"win-cell":""}" data-cell-idx="${ge}">
                  ${ke}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function he(ee,Fe,De){const ge=t.gameState||{},ye=ge.activeColors||["red","green"],ke=ge.players||[{...t.player1,color:"red",assignedRole:"red",isBot:!1},{...t.player2,color:"green",assignedRole:"green",isBot:!1}],Oe=ge.tokens||{},Ue=l=>{const x=Oe[l]||(l==="red"?ge.p1Tokens:l==="green"?ge.p2Tokens:[])||[];return Array.from({length:4},(V,te)=>x[te]||{id:te,step:-1})},pe=Ue("red"),je=Ue("green"),Ne=Ue("yellow"),_e=Ue("blue"),Ce=a?._id||a?.id,I=(ke.find(l=>l.userId&&l.userId.toString()===Ce?.toString())||ke[0])?.color||(ee?"red":"green"),N=ge.turnColor||t.turn||"red",u=I===N&&t.status==="active",oe=!!ge.rolled,ne=ge.dice,Ee=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],G=[[7,1],[7,2],[7,3],[7,4],[7,5]],fe=[[1,7],[2,7],[3,7],[4,7],[5,7]],ue=[[7,13],[7,12],[7,11],[7,10],[7,9]],Te=[[13,7],[12,7],[11,7],[10,7],[9,7]],pt=[0,8,13,21,26,34,39,47];function Se(l,x){return x<0?null:x>=56?l==="red"?[7,6]:l==="green"?[6,7]:l==="yellow"?[7,8]:[8,7]:l==="red"?x<=50?Ee[x]:G[x-51]:l==="green"?x<=50?Ee[(13+x)%52]:fe[x-51]:l==="yellow"?x<=50?Ee[(26+x)%52]:ue[x-51]:x<=50?Ee[(39+x)%52]:Te[x-51]}function Ie(l,x){return l!==I||!u||!oe||!ne||t.status!=="active"?!1:x.step===-1?ne===6:x.step>=0&&x.step+ne<=56}const we={},Y=(l,x)=>{x.forEach(V=>{if(V.step>=0&&V.step<56){const te=Se(l,V.step);if(te){const me=te[0]+","+te[1];(we[me]=we[me]||[]).push({color:l,id:V.id,step:V.step,movable:Ie(l,V)})}}})};ye.includes("red")&&Y("red",pe),ye.includes("green")&&Y("green",je),ye.includes("yellow")&&Y("yellow",Ne),ye.includes("blue")&&Y("blue",_e);const He={};Ee.forEach(([l,x],V)=>{He[l+","+x]=V});const Ae={};G.forEach(([l,x],V)=>{Ae[l+","+x]=V+1});const Qe={};fe.forEach(([l,x],V)=>{Qe[l+","+x]=V+1});const ht={};ue.forEach(([l,x],V)=>{ht[l+","+x]=V+1});const Ut={};Te.forEach(([l,x],V)=>{Ut[l+","+x]=V+1});const Ht=[];for(let l=0;l<15;l++)for(let x=0;x<15;x++){if(l<6&&x<6||l<6&&x>8||l>8&&x<6||l>8&&x>8||l>=6&&l<=8&&x>=6&&x<=8)continue;const V=l+","+x,te=He[V],me=te!==void 0&&pt.includes(te),ot=l===6&&x===1,ut=l===1&&x===8,it=l===8&&x===13,Wt=l===13&&x===6,Ia=Ae[V],Aa=Qe[V],Da=ht[V],_a=Ut[V];let xt="ludo-cell";ot?xt+=" cell-red-start":ut?xt+=" cell-green-start":it?xt+=" cell-yellow-start":Wt?xt+=" cell-blue-start":Ia?xt+=" cell-red-stretch":Aa?xt+=" cell-green-stretch":Da?xt+=" cell-yellow-stretch":_a?xt+=" cell-blue-stretch":me&&(xt+=" cell-safe-star");const Ea=we[V]||[];Ht.push(`
            <div class="${xt}" style="grid-row:${l+1};grid-column:${x+1}" data-pos="${V}">
              ${me?'<span class="cell-star-glyph">⭐</span>':""}
              ${ot||ut||it||Wt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Ea.map(At=>`
                <div class="ludo-token token-${At.color} ${At.movable?"movable":""}" data-token-id="${At.id}" data-color="${At.color}" title="${At.color.toUpperCase()} Pawn ${At.id+1}">
                  <span>${At.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function ea(l,x=!1){if(x||!l)return`
            <div class="ludo-direct-number-box num-prompt" role="img" aria-label="Dice ready">
              <span class="ludo-direct-num prompt-icon" style="font-size:30px;line-height:1;">🎲</span>
            </div>
          `;const V=Math.max(1,Math.min(6,Number(l)||1));return`
          <div class="ludo-direct-number-box num-${V}" role="img" aria-label="Number ${V}">
            <span class="ludo-direct-num">${V}</span>
          </div>
        `}function It(l,x,V,te,me){const ot=`${l}-yard`;if(!V)return`
            <div class="ludo-yard ${ot}">
              <div class="yard-box decorative">
                <div class="yard-title">${x} (Inactive)</div>
              </div>
            </div>
          `;const ut=me.filter(it=>it.step===56).length;return`
          <div class="ludo-yard ${ot} ${N===l?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${x}</span>
                ${ut>0?`<span class="yard-home-badge" title="${ut} of 4 pawns reached Home!">👑 ${ut}/4 Home</span>`:""}
                ${te?`<small class="yard-player-lbl">${v(te.name)}${te.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${me.map((it,Wt)=>`
                  <div class="yard-token-slot ${it.step===56?"slot-home":""}">
                    ${it.step===-1?`
                      <div class="ludo-token token-${l} ${Ie(l,it)?"movable":""}" data-token-id="${it.id}" data-color="${l}" title="${l.toUpperCase()} Pawn ${it.id+1}">
                        <span>${it.id+1}</span>
                      </div>
                    `:it.step===56?`
                      <div class="ludo-token token-reached-home token-${l}" title="${l.toUpperCase()} Pawn ${it.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${it.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${Wt+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Mt=ke.find(l=>l.color==="red"),Gt=ke.find(l=>l.color==="green"),ta=ke.find(l=>l.color==="yellow"),aa=ke.find(l=>l.color==="blue"),Bt=ke.find(l=>l.color===N)||(N==="red"?Mt:Gt),vt=Bt?v(Bt.name):N.toUpperCase(),na={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[N]||"🔴",gt=!!(oe&&(ne||ge.lastRoll&&ge.lastRollColor===N)),yt=ne||(gt?ge.lastRoll:null),Pt=u&&!gt&&t.status==="active",$=Ue(I).filter(l=>Ie(I,l));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${It("red","🔴 Red Base",ye.includes("red"),Mt,pe)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${It("green","🟢 Green Base",ye.includes("green"),Gt,je)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${It("blue","🔵 Blue Base",ye.includes("blue"),aa,_e)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${It("yellow","🟡 Yellow Base",ye.includes("yellow"),ta,Ne)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${pe.filter(l=>l.step===56).map(l=>`<div class="home-tri-pawn red" title="Red Pawn ${l.id+1} Home! 👑">👑${l.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${je.filter(l=>l.step===56).map(l=>`<div class="home-tri-pawn green" title="Green Pawn ${l.id+1} Home! 👑">👑${l.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${Ne.filter(l=>l.step===56).map(l=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${l.id+1} Home! 👑">👑${l.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${_e.filter(l=>l.step===56).map(l=>`<div class="home-tri-pawn blue" title="Blue Pawn ${l.id+1} Home! 👑">👑${l.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...pe.filter(l=>l.step===56).map(l=>({col:"red",id:l.id})),...je.filter(l=>l.step===56).map(l=>({col:"green",id:l.id})),...Ne.filter(l=>l.step===56).map(l=>({col:"yellow",id:l.id})),..._e.filter(l=>l.step===56).map(l=>({col:"blue",id:l.id}))].map(l=>`
                    <div class="tok-home-champion ${l.col}" title="${l.col.toUpperCase()} Pawn ${l.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${l.id+1}</span>
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
                class="ludo-3d-dice ${Pt?"clickable":""} ${gt?"just-rolled":""} border-${N}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${Pt?"0":"-1"}"
                title="${Pt?"Tap dice to roll!":u?"Choose a pawn to move":gt?`${vt} rolled ${yt}`:`Waiting for ${vt} to roll`}"
                style="${Pt?"cursor:pointer;touch-action:manipulation;":""}"
              >
                ${ea(yt,!gt)}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${N}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${vt}</strong> (${N.toUpperCase()})
                </span>
                ${u?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${u&&gt?"highlight":""}">
                ${u&&!gt&&t.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":u&&gt&&t.status==="active"?$.length>0?$.length===1?`🎲 Rolled <strong>${yt}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${yt}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${yt}</strong>. No legal moves possible — turn passing...`:t.status==="active"?gt?`🎲 ${na} <strong>${vt}</strong> rolled <strong>${yt}</strong>!`:`⏳ Waiting for <strong>${vt}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${v(ge.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function qe(ee,Fe,De){const ge=i.querySelector("#btn-close-arena");ge&&(ge.onclick=ie);const ye=i.querySelector("#btn-sidebar-leave");ye&&(ye.onclick=ie);const ke=i.querySelector("#btn-arena-settings");ke&&(ke.onclick=()=>{S(`🎮 ${t.gameTitle} • Code ${(t._id||"7370").slice(-4).toUpperCase()} • Audio & Visual cues enabled`,"info")});const Oe=i.querySelector("#btn-arena-resign");Oe&&(Oe.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{Oe.disabled=!0,await xe(`/bonding/matches/${d}/action`,{action:"resign"}),await J(),Z()}catch(I){S(I.message||"Resign failed","error"),Oe.disabled=!1}});const Ue=i.querySelector("#btn-arena-draw");Ue&&(Ue.onclick=async()=>{try{await xe(`/bonding/matches/${d}/action`,{action:"offer_draw"}),S("Draw offer sent to opponent","info"),await J(),Z()}catch(I){S(I.message||"Draw offer failed","error")}});const pe=i.querySelector("#btn-confirm-accept-draw");pe&&(pe.onclick=async()=>{try{await xe(`/bonding/matches/${d}/action`,{action:"accept_draw"}),S("Draw agreed!","info"),await J(),Z()}catch(I){S(I.message,"error")}});const je=i.querySelector("#btn-confirm-decline-draw");je&&(je.onclick=async()=>{try{await xe(`/bonding/matches/${d}/action`,{action:"decline_draw"}),await J(),Z()}catch(I){S(I.message,"error")}}),[i.querySelector("#btn-arena-delete-match"),i.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(I=>{I.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{I.disabled=!0,await at(`/bonding/matches/${d}`),S("Match deleted","success"),ie(),k==="lounge_games"&&await y()}catch(N){S(N.message||"Failed to delete match","error"),I.disabled=!1}}});const _e=i.querySelector("#btn-arena-rematch-action");_e&&(_e.onclick=async()=>{try{_e.disabled=!0,_e.textContent="Requesting...";const I=await xe(`/bonding/matches/${d}/action`,{action:"rematch_request"});I.match&&(t=I.match,M=P(I.match),Z(),S("Rematch request sent! Waiting for opponent ⚔️","info"))}catch(I){S(I.message||"Rematch request failed","error"),_e.disabled=!1,_e.textContent="🔄 Request Rematch"}});const Ce=i.querySelector("#btn-arena-accept-rematch");Ce&&(Ce.onclick=async()=>{try{Ce.disabled=!0,Ce.textContent="Starting...";const I=await xe(`/bonding/matches/${d}/action`,{action:"rematch_accept"});I.match&&(t=I.match,M=P(I.match),S("Rematch started! Same game is live ⚔️","success"),Z())}catch(I){S(I.message||"Could not accept rematch","error"),Ce.disabled=!1}});const Pe=i.querySelector("#btn-arena-decline-rematch");if(Pe&&(Pe.onclick=async()=>{try{await xe(`/bonding/matches/${d}/action`,{action:"rematch_decline"}),S("Rematch declined","info"),ie()}catch{ie()}}),t.gameType==="dotsboxes"&&ee&&t.status==="active"&&i.querySelectorAll(".dots-line.clickable").forEach(I=>{I.onclick=async()=>{const N=I.dataset.type,u=I.dataset.r,oe=I.dataset.c;try{I.style.opacity="0.5";const ne=await xe(`/bonding/matches/${d}/move`,{type:N,r:u,c:oe});t=ne,M=P(ne),Z()}catch(ne){I.style.opacity="1",S(ne.message||"Failed to draw line","error")}}}),t.gameType==="chess"&&ee&&t.status==="active"){const I=t.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",N=new $a(I),u=De.assignedRole==="white"?"w":"b";i.querySelectorAll(".chess-sq").forEach(oe=>{oe.onclick=async()=>{const ne=oe.dataset.square;if(b){if(b===ne){b=null,D=[],Z();return}if(D.includes(ne)){const G=N.get(b);let fe;G&&G.type==="p"&&(ne.endsWith("8")||ne.endsWith("1"))&&(fe=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const ue={from:b,to:ne,promotion:fe?fe.toLowerCase():void 0};b=null,D=[],t=await xe(`/bonding/matches/${d}/move`,{move:ue}),Z()}catch(ue){S(ue.message||"Illegal chess move","error"),b=null,D=[],Z()}return}}const Ee=N.get(ne);Ee&&Ee.color===u?(b=ne,D=N.moves({square:ne,verbose:!0}).map(fe=>fe.to),Z()):(b=null,D=[],Z())}})}if(t.gameType==="tictactoe"&&ee&&t.status==="active"&&i.querySelectorAll(".ttt-cell.empty").forEach(I=>{I.onclick=async()=>{const N=I.dataset.cellIdx;try{I.style.opacity="0.5",t=await xe(`/bonding/matches/${d}/move`,{cellIndex:Number(N)}),Z()}catch(u){S(u.message||"Invalid move","error")}}}),t.gameType==="ludo"&&t.status==="active"){const I=t.gameState||{},N=!!I.rolled,u=I.turnColor||t.turn||"red",oe=!!(N&&(I.dice||I.lastRoll&&I.lastRollColor===u)),ne=a?._id||a?.id,Ee=I.players||[{...t.player1,color:"red",assignedRole:"red",isBot:!1},{...t.player2,color:"green",assignedRole:"green",isBot:!1}],G=ne&&t.player1.userId.toString()===ne.toString(),ue=(Ee.find(we=>we.userId&&we.userId.toString()===ne?.toString())||(G?Ee[0]:Ee[1]))?.color||(G?"red":"green"),Te=ue===u&&t.status==="active",pt=Ee.find(we=>we.color===u)||(u==="red"?t.player1:t.player2),Se=v(pt?.name||(u==="red"?"Player 1":"Player 2")),Ie=i.querySelector("#btn-interactive-ludo-dice");if(Ie){const we=async Y=>{if(Y&&(Y.preventDefault(),Y.stopPropagation()),!Te){S(`${Se}'s turn right now`,"info");return}if(oe){S("Dice already rolled! Tap your glowing pawn to move.","info");return}if(t.status!=="active"){S("Match has ended","info");return}if(X||Ie.dataset.rolling==="true")return;X=!0,R=Date.now(),Ie.dataset.rolling="true",Ie.classList.add("rolling");let He=0;const Ae=setInterval(()=>{He++;const Qe=Math.floor(Math.random()*6)+1;Ie.innerHTML=renderNumberDisplay(Qe),He>=4&&clearInterval(Ae)},50);try{const Qe=await xe(`/bonding/matches/${d}/move`,{action:"roll"});clearInterval(Ae),t=Qe,M=P(Qe),Z()}catch(Qe){clearInterval(Ae),S(Qe.message||"Failed to roll dice","error"),Ie&&(delete Ie.dataset.rolling,Ie.classList.remove("rolling"))}finally{X=!1}};Ie.onclick=we,Ie.onkeydown=Y=>{(Y.key==="Enter"||Y.key===" ")&&(Y.preventDefault(),we(Y))}}if(Te&&oe){const Y=(I.tokens||{})[ue]||[],He=I.dice||I.lastRoll||0,Ae=Y.filter(Qe=>Qe.step===-1&&He===6||Qe.step>=0&&Qe.step+He<=56);if(Ae.length===1&&!K){K=!0;const Qe=Ae[0];w&&clearTimeout(w),w=setTimeout(async()=>{try{const ht=await xe(`/bonding/matches/${d}/move`,{action:"move",tokenId:Number(Qe.id)});t=ht,M=P(ht),K=!1,Z()}catch(ht){K=!1,S(ht.message||"Auto-move failed","error")}},400)}}Te&&N&&i.querySelectorAll(".ludo-token.movable").forEach(we=>{we.onclick=async Y=>{Y.stopPropagation();const He=we.dataset.tokenId;try{we.style.opacity="0.5";const Ae=await xe(`/bonding/matches/${d}/move`,{action:"move",tokenId:Number(He)});t=Ae,M=P(Ae),Z()}catch(Ae){S(Ae.message||"Invalid token move","error"),we.style.opacity="1"}}})}}Z()}function z(){if(!c||c.type==="direct")return;const d=s.querySelector("#bonding-modals-root"),i=R=>R==="employee"||R==="admin"||R==="superadmin",t=c.members||[],b=new Set(t.map(R=>R.userId?.toString())),D=r.filter(R=>i(R.role)&&!b.has(R._id.toString()));d.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${v(c.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${D.map(R=>`
                    <option value="${R._id}">${v(R.name)} (${v(R.role==="superadmin"?"Superadmin":R.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${D.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${D.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${t.length}):</label>
              <div class="bonding-members-list">
                ${t.map(R=>{const P=a?._id||a?.id,J=P&&R.userId&&R.userId.toString()===P.toString(),ie=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(P),Z=g==="superadmin"||a?.role==="superadmin",ae=ie||Z;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(R.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${v(R.name)} ${J?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${v(R.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${J?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${R.userId}">
                            🚪 Leave Group
                          </button>
                        `:ae?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${R.userId}" data-name="${v(R.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const R=a?._id||a?.id,P=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(R),J=g==="superadmin"||a?.role==="superadmin";return P||J?`
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
    `,d.querySelector(".bonding-modal-close").onclick=()=>{d.innerHTML=""};const M=d.querySelector("#btn-modal-delete-group");M&&(M.onclick=()=>{d.innerHTML="",p()});const w=d.querySelector("#btn-modal-leave-group");w&&(w.onclick=()=>{d.innerHTML="",L()}),d.querySelectorAll(".btn-leave-group-action").forEach(R=>{R.onclick=()=>{d.innerHTML="",L()}});const K=d.querySelector("#btn-submit-add-member");K&&(K.onclick=async()=>{const P=d.querySelector("#sel-add-colleague").value;if(!P){S("Please select a colleague to add","warning");return}try{K.disabled=!0,K.textContent="Adding...";const J=await Jt(`/bonding/channels/${c._id}/members`,{action:"add",userIds:[P]});S("Colleague added to group! 🎉","success"),c=J.channel,d.innerHTML="",await Me(c._id),Re()}catch(J){S(J.message||"Failed to add member","error"),K.disabled=!1,K.textContent="Add to Group"}}),d.querySelectorAll(".btn-remove-member").forEach(R=>{R.onclick=async()=>{const P=R.dataset.userId,J=R.dataset.name;if(confirm(`Are you sure you want to remove ${J} from this group?`))try{R.disabled=!0;const ie=await Jt(`/bonding/channels/${c._id}/members`,{action:"remove",userId:P});S(`${J} removed from group`,"info"),c=ie.channel,d.innerHTML="",await Me(c._id),Re()}catch(ie){S(ie.message||"Failed to remove member","error"),R.disabled=!1}}})}async function L(){if(!c||c.type==="direct")return;const d=c.name;if(confirm(`Are you sure you want to leave the group "${d}"?`))try{await xe(`/bonding/channels/${c._id}/leave`,{}),S(`You left "${d}"`,"info"),f=await Le("/bonding/channels").catch(()=>[]),c=f.find(t=>t.type==="group")||f[0]||null,Be(),Re(),c&&await Me(c._id)}catch(t){S(t.message||"Failed to leave group","error")}}async function p(){if(!c||c.type==="direct")return;const d=c.name;if(confirm(`Are you sure you want to delete the group "${d}"?

All messages in this lounge will be deleted.`))try{await at(`/bonding/channels/${c._id}`),S(`Group "${d}" deleted successfully`,"success"),f=await Le("/bonding/channels").catch(()=>[]),c=f.find(t=>t.type==="group")||f[0]||null,Be(),Re(),c&&await Me(c._id)}catch(t){S(t.message||"Failed to delete group","error")}}function B(){const d=s.querySelector("#bonding-modals-root"),i=D=>D==="employee"||D==="admin"||D==="superadmin",t=r.filter(D=>!D.isSelf&&i(D.role));d.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${t.map(D=>`
                <div class="bonding-user-pick-item" data-user-id="${D._id}" data-name="${v(D.name)}">
                  <div class="bonding-member-avatar">${D.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${v(D.name)}</span>
                    <span class="user-pick-role">${v(D.role==="superadmin"?"Superadmin":D.role==="admin"?"Admin":"Employee")} · ${v(D.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,d.querySelector(".bonding-modal-close").onclick=()=>{d.innerHTML=""},d.querySelectorAll(".bonding-user-pick-item").forEach(D=>{D.onclick=async()=>{const M=D.dataset.userId;try{const w=await xe("/bonding/channels",{type:"direct",targetUserId:M});d.innerHTML="",f=await Le("/bonding/channels"),c=f.find(K=>K._id===w._id)||w,Be(),Re(),await Me(c._id)}catch(w){S(w.message||"Failed to open personal chat","error")}}})}function h(){const d=s.querySelector("#bonding-modals-root"),i=w=>w==="employee"||w==="admin"||w==="superadmin",t=r.filter(w=>!w.isSelf&&i(w.role));d.innerHTML=`
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
                ${t.map(w=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${w._id}" />
                    <span>${v(w.name)} (${v(w.role==="superadmin"?"Superadmin":w.role==="admin"?"Admin":"Employee")})</span>
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
    `,d.querySelector(".bonding-modal-close").onclick=()=>{d.innerHTML=""},d.querySelector("#btn-cancel-create-grp").onclick=()=>{d.innerHTML=""};let b="👥";const D=d.querySelectorAll(".avatar-opt");D.forEach(w=>{w.onclick=()=>{D.forEach(K=>K.classList.remove("active")),w.classList.add("active"),b=w.textContent.trim()}});const M=d.querySelector("#btn-confirm-create-grp");M.onclick=async()=>{const w=d.querySelector("#new-group-name"),K=d.querySelector("#new-group-desc"),X=w.value.trim();if(!X){S("Please enter a group name","warning"),w.focus();return}const R=d.querySelectorAll(".new-group-member-chk:checked"),P=Array.from(R).map(J=>J.value);try{M.disabled=!0,M.textContent="Creating...";const J=await xe("/bonding/channels",{type:"group",name:X,description:K.value.trim(),avatar:b,memberIds:P});S(`Group "${X}" created! 🎉`,"success"),d.innerHTML="",f=await Le("/bonding/channels"),c=f.find(ie=>ie._id===J._id)||J,Be(),Re(),await Me(c._id)}catch(J){S(J.message||"Failed to create group","error"),M.disabled=!1,M.textContent="Create Group 🎉"}}}function T(d,i){const t=document.querySelector(".bonding-chat-emoji-palette");if(t){t.remove();return}const b=[{name:"Smileys & Faces",icon:"😀",emojis:["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","😉","😍","🥰","😘","😋","😎","🤔","🤨","😐","😴","🤯","🥳","🥺"]},{name:"Hands & People",icon:"👍",emojis:["👍","👎","👏","🙌","👐","🤝","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","👇","💪","🫡","🙏","🙋","🙆"]},{name:"Celebration & Work",icon:"🎉",emojis:["🎉","🎊","🔥","✨","💯","🚀","🎯","🏆","🥇","⭐","🌟","💡","📌","💼","📊","📈","⏱️","⏳","✅","❌","⚡"]},{name:"Break & Fun",icon:"☕",emojis:["☕","🍵","🍕","🍔","🍟","🎂","🍰","🍩","🍿","🍺","🍻","🎮","🎲","🎯","🧩","🎵","🏖️","⚽","❤️","💖","💙"]}];let D=0;const M=document.createElement("div");M.className="bonding-chat-emoji-palette";function w(){const R=b[D];M.innerHTML=`
        <div class="emoji-palette-tabs">
          ${b.map((P,J)=>`
            <button class="emoji-tab-btn ${J===D?"active":""}" data-cat-idx="${J}" title="${P.name}">
              ${P.icon}
            </button>
          `).join("")}
        </div>
        <div class="emoji-palette-header">
          <span>${R.name}</span>
          <button class="emoji-palette-close" type="button">&times;</button>
        </div>
        <div class="emoji-palette-grid">
          ${R.emojis.map(P=>`
            <button class="chat-emoji-cell" data-e="${P}" type="button">${P}</button>
          `).join("")}
        </div>
      `,M.querySelectorAll(".emoji-tab-btn").forEach(P=>{P.onclick=J=>{J.stopPropagation(),D=Number(P.dataset.catIdx),w()}}),M.querySelector(".emoji-palette-close").onclick=P=>{P.stopPropagation(),M.remove()},M.querySelectorAll(".chat-emoji-cell").forEach(P=>{P.onclick=J=>{J.stopPropagation(),i(P.dataset.e),M.remove()}})}w();const K=d.getBoundingClientRect();M.style.position="fixed",M.style.bottom=`${window.innerHeight-K.top+8}px`,M.style.left=`${Math.max(12,Math.min(window.innerWidth-300,K.left-40))}px`,document.body.appendChild(M);const X=R=>{!M.contains(R.target)&&R.target!==d&&!d.contains(R.target)&&(M.remove(),document.removeEventListener("click",X))};setTimeout(()=>document.addEventListener("click",X),10)}function U(d,i){const t=document.querySelector(".bonding-emoji-popup");t&&t.remove();const b=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],D=document.createElement("div");D.className="bonding-emoji-popup",D.innerHTML=b.map(K=>`<button class="emoji-opt-btn" data-e="${K}">${K}</button>`).join("");const M=d.getBoundingClientRect();D.style.top=`${M.bottom+window.scrollY+6}px`,D.style.left=`${M.left+window.scrollX}px`,document.body.appendChild(D),D.querySelectorAll(".emoji-opt-btn").forEach(K=>{K.onclick=X=>{X.stopPropagation(),i(K.dataset.e),D.remove()}});const w=K=>{D.contains(K.target)||(D.remove(),document.removeEventListener("click",w))};setTimeout(()=>document.addEventListener("click",w),10)}function _(d){if(!d)return"";try{return new Date(d).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function pn(){const s=document.getElementById("ci360-bonding-styles");s&&s.remove();const n=document.createElement("style");n.id="ci360-bonding-styles",n.textContent=`
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
      gap: 0;
      height: calc(100vh - 210px);
      min-height: 580px;
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .bonding-chat-layout {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .mobile-back-channels-btn {
      display: none;
    }

    @media (max-width: 1024px) {
      .bonding-chat-layout {
        grid-template-columns: 280px 1fr;
      }
    }

    @media (max-width: 768px) {
      .bonding-wrap {
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        box-sizing: border-box !important;
      }

      .bonding-nav-bar {
        padding: 12px 14px !important;
        border-radius: 14px !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 12px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      .bonding-nav-left {
        width: 100% !important;
        gap: 10px !important;
      }

      .bonding-title {
        font-size: 16px !important;
      }

      .bonding-subtitle {
        font-size: 11.5px !important;
      }

      .bonding-view-tabs {
        width: 100% !important;
        display: flex !important;
        padding: 3px !important;
        gap: 4px !important;
        box-sizing: border-box !important;
      }

      .bonding-view-tab {
        flex: 1 !important;
        justify-content: center !important;
        padding: 8px 10px !important;
        font-size: 12.5px !important;
      }

      .bonding-nav-right {
        width: 100% !important;
        display: flex !important;
        gap: 6px !important;
        justify-content: space-between !important;
        box-sizing: border-box !important;
      }

      .bonding-top-action-btn {
        flex: 1 !important;
        justify-content: center !important;
        padding: 7px 6px !important;
        font-size: 11px !important;
      }

      .bonding-chat-layout {
        display: flex !important;
        flex-direction: column !important;
        height: calc(100dvh - 210px) !important;
        min-height: 480px !important;
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 14px !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }

      .bonding-chat-layout.mobile-view-sidebar .bonding-sidebar {
        display: flex !important;
        width: 100% !important;
        height: 100% !important;
        border-right: none !important;
        border-bottom: none !important;
        padding: 12px !important;
      }

      .bonding-chat-layout.mobile-view-sidebar .bonding-chat-main {
        display: none !important;
      }

      .bonding-chat-layout.mobile-view-chat .bonding-sidebar {
        display: none !important;
      }

      .bonding-chat-layout.mobile-view-chat .bonding-chat-main {
        display: flex !important;
        width: 100% !important;
        height: 100% !important;
        min-width: 0 !important;
      }

      .mobile-back-channels-btn {
        display: inline-flex !important;
        align-items: center !important;
        gap: 4px !important;
        padding: 5px 9px !important;
        background: rgba(0, 112, 243, 0.1) !important;
        color: #0070F3 !important;
        border: 1px solid rgba(0, 112, 243, 0.25) !important;
        border-radius: 8px !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        flex-shrink: 0 !important;
      }

      [data-theme="dark"] .mobile-back-channels-btn {
        background: rgba(56, 189, 248, 0.15) !important;
        color: #38BDF8 !important;
        border-color: rgba(56, 189, 248, 0.3) !important;
      }

      .bonding-chat-header {
        padding: 10px 12px !important;
        gap: 8px !important;
        flex-direction: column !important;
        align-items: stretch !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      .bonding-chat-header-info {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        width: 100% !important;
        min-width: 0 !important;
      }

      .bonding-chat-header-titles {
        flex: 1 !important;
        min-width: 0 !important;
      }

      .bonding-chat-title {
        font-size: 14px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      .bonding-chat-sub {
        font-size: 11px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      .bonding-chat-header-actions {
        display: flex !important;
        gap: 6px !important;
        width: 100% !important;
        overflow-x: auto !important;
        white-space: nowrap !important;
        scrollbar-width: none !important;
        padding-bottom: 2px !important;
      }

      .bonding-header-btn {
        padding: 5px 9px !important;
        font-size: 11px !important;
        flex-shrink: 0 !important;
      }

      .bonding-chat-input-bar {
        padding: 8px 10px !important;
        gap: 6px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      .bonding-input-field {
        height: 38px !important;
        min-height: 38px !important;
        padding: 0 10px !important;
        font-size: 13px !important;
      }

      .bonding-send-btn {
        height: 38px !important;
        padding: 0 12px !important;
        font-size: 12px !important;
      }

      .bonding-messages-container {
        padding: 12px 10px !important;
        gap: 8px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      .bonding-msg-row {
        max-width: 92% !important;
      }

      .bonding-game-card-bubble {
        max-width: 100% !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      .lounge-container {
        width: 100% !important;
        max-width: 100% !important;
        gap: 14px !important;
      }

      .lounge-stats-ribbon {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 10px !important;
      }

      .lounge-two-col {
        grid-template-columns: 1fr !important;
        gap: 14px !important;
      }

      .lounge-card-box {
        padding: 14px !important;
      }
    }

    /* Sidebar */
    .bonding-sidebar {
      background: transparent;
      border: none;
      border-right: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 0;
      padding: 16px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      box-shadow: none;
    }

    [data-theme="dark"] .bonding-sidebar {
      background: transparent;
      border-color: transparent;
      border-right: 1px solid var(--border-subtle, #1f2937);
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
      background: transparent;
      border: none;
      border-radius: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: none;
    }

    [data-theme="dark"] .bonding-chat-main {
      background: transparent;
      border-color: transparent;
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
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 16px;
      box-sizing: border-box;
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
      font-size: 24px;
      padding: 8px;
      border: none;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .emoji-opt-btn:hover {
      background: var(--bg-hover, #f1f5f9);
      transform: scale(1.2);
    }

    [data-theme="dark"] .emoji-opt-btn:hover {
      background: #2a374f;
    }

    /* Organized Chat Emoji Palette (Floating above input bar) */
    .bonding-chat-emoji-palette {
      width: 320px;
      max-width: calc(100vw - 24px);
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16);
      z-index: 10002;
      overflow: hidden;
      animation: bondingPalettePop 0.18s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes bondingPalettePop {
      from { opacity: 0; transform: translateY(8px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    [data-theme="dark"] .bonding-chat-emoji-palette {
      background: #111827;
      border-color: #374151;
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.55);
    }

    .emoji-palette-tabs {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 10px;
      background: var(--bg-muted, #f8fafc);
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .emoji-palette-tabs {
      background: #1f2937;
      border-color: #374151;
    }

    .emoji-tab-btn {
      flex: 1;
      height: 36px;
      padding: 0;
      border: none;
      background: transparent;
      font-size: 20px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .emoji-tab-btn:hover {
      background: var(--bg-hover, #f1f5f9);
      transform: scale(1.08);
    }

    [data-theme="dark"] .emoji-tab-btn:hover {
      background: #374151;
    }

    .emoji-tab-btn.active {
      background: rgba(0, 112, 243, 0.14);
      border-bottom: 2px solid #0070F3;
      transform: scale(1.1);
    }

    [data-theme="dark"] .emoji-tab-btn.active {
      background: rgba(0, 112, 243, 0.25);
      border-bottom-color: #38BDF8;
    }

    .emoji-palette-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px 4px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--text-3, #94a3b8);
    }

    .emoji-palette-close {
      border: none;
      background: transparent;
      font-size: 20px;
      line-height: 1;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .emoji-palette-close:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }

    .emoji-palette-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 6px;
      padding: 8px 12px 14px;
      max-height: 220px;
      overflow-y: auto;
    }

    .chat-emoji-cell {
      height: 42px;
      border: none;
      background: transparent;
      font-size: 24px;
      line-height: 1;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.12s ease, background 0.12s ease;
      user-select: none;
    }

    .chat-emoji-cell:hover {
      background: rgba(0, 112, 243, 0.12);
      transform: scale(1.22);
    }

    [data-theme="dark"] .chat-emoji-cell:hover {
      background: rgba(0, 112, 243, 0.22);
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

    `,document.head.appendChild(n)}function Sa(s){if(!s)return"";const n=v(s),a=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return n.replace(a,g=>`<a href="${g}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${g} ↗</a>`)}const ga=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],Et=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Rt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function mn(s,n={}){const{userRole:a="employee",currentUser:g=null,initialTicketId:k=null}=n,f=a==="superadmin"||a==="admin";if(a==="client"||g&&g.role==="client"){s.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let c=[],r={},O=[],Q=[],E={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:n.initialJobId||"all",myIssuesOnly:!1},q=null,W="comments",H=!1;s.innerHTML=`
    <div class="ci-360-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="ci-360-header-bar">
        <div class="ci-360-header-left">
          <div class="ci-360-breadcrumb">
            <span class="ci-360-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${f?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="ci-360-title-row">
            <h2 class="ci-360-main-title">🎫 ${f?"Support Tickets Board":"Support Tickets"}</h2>
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
            ${Et.map(e=>`<option value="${e.key}">${e.icon} ${e.label}</option>`).join("")}
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
  `,await Promise.all([nt(),Je(),bt(),Ft()]),lt(),dt(),Me(),Re(),k&&st(k);const be=setInterval(()=>{if(!document.contains(s)){clearInterval(be);return}!(s.querySelector(".dragging")||s.querySelector("input:focus")||s.querySelector("textarea:focus"))&&!q&&de()},12e3),$e=()=>{document.contains(s)&&!q&&de()};window.addEventListener("focus",$e);async function Je(){try{const e=new URLSearchParams;E.search&&e.set("search",E.search),E.priority!=="all"&&e.set("priority",E.priority),E.category!=="all"&&e.set("category",E.category),E.assigneeId!=="all"&&e.set("assigneeId",E.assigneeId),E.jobId&&E.jobId!=="all"&&e.set("jobId",E.jobId),E.reporterId&&E.reporterId!=="all"&&e.set("reporterId",E.reporterId),E.scope==="created"&&e.set("reporterId",g?._id||g?.id),E.scope==="assigned"&&e.set("assigneeId",g?._id||g?.id),E.myIssuesOnly&&e.set("myIssuesOnly","true");const o=await Le("/tickets?"+e.toString());c=Array.isArray(o)?o:[]}catch(e){S(e.message||"Failed to load tickets",!0),c=[]}}async function nt(){try{r=await Le("/tickets/stats")}catch(e){console.warn("Could not fetch ticket stats:",e)}}async function bt(){try{let e;try{e=await Le("/tickets/staff")}catch{e=await Le("/users")}O=(e||[]).filter(o=>o.active!==!1&&o.role!=="client")}catch(e){console.warn("Could not fetch employees:",e),O=[]}}async function Ft(){try{const e=await Le("/jobs?limit=250");Q=Array.isArray(e)?e:e?.jobs||[]}catch(e){console.warn("Could not fetch jobs:",e)}}function lt(){const e=s.querySelector("#ci-360-stats-root");e&&(e.innerHTML=`
      <div class="ci-360-stat-card ${E.status==="all"&&!E.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="ci-360-stat-val">${r.total||0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${E.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${r.toDo||0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${E.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${r.content??(r.inProgress||0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${E.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${r.design||0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${E.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${r.underReview||0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${E.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
        <span class="ci-360-stat-val">${r.readyToLeave??(r.resolved||r.closed||0)}</span>
        <span class="ci-360-stat-lbl">Ready to Leave</span>
      </div>
      <div class="ci-360-stat-card critical" data-stat-filter="critical">
        <span class="ci-360-stat-val">${r.critical||0}</span>
        <span class="ci-360-stat-lbl">Critical 🔴</span>
      </div>
      <div class="ci-360-stat-card overdue" data-stat-filter="overdue">
        <span class="ci-360-stat-val">${r.overdue||0}</span>
        <span class="ci-360-stat-lbl">Overdue ⚠️</span>
      </div>
    `,e.querySelectorAll(".ci-360-stat-card").forEach(o=>{o.onclick=async()=>{const m=o.dataset.statFilter;m==="all"?(E.status="all",E.priority="all"):m==="critical"?(E.priority="Critical",E.status="all"):(E.status=m,E.priority="all"),await de()}}))}function Me(){const e=s.querySelector("#ci-360-filter-assignee");e&&(e.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${O.map(m=>`
          <option value="${m._id}" ${E.assigneeId===m._id.toString()?"selected":""}>
            ${v(m.name)} (${v(m.role)})
          </option>
        `).join("")}
      `);const o=s.querySelector("#ci-360-filter-job");o&&(o.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${Q.map(m=>`
          <option value="${m._id}" ${E.jobId===m._id.toString()?"selected":""}>
            📁 ${v(m.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function dt(){const e=s.querySelector("#ci-360-board-columns-root");if(!e)return;const o={};ga.forEach(m=>{o[m.key]=[]}),c.forEach(m=>{let y=m.status||"To Do";y==="In Progress"?y="Content":y==="Resolved"?y="Under Review":y==="Closed"&&(y="Ready to Leave"),o[y]||(o[y]=[]),o[y].push(m)}),e.innerHTML=ga.map(m=>{const y=o[m.key]||[];return`
        <div class="ci-360-board-column" data-status="${m.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${v(m.label)}</span>
              <span class="ci-360-col-badge">${y.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${m.key}">
            ${y.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:y.map(A=>kt(A)).join("")}
          </div>
        </div>
      `}).join(""),Be(),wt()}function kt(e){const o=Et.find(h=>h.key===e.category)||Et[0],m=Rt.find(h=>h.key===e.priority)||Rt[2],y=e.dueDate&&new Date(e.dueDate)<new Date&&e.status!=="Ready to Leave"&&e.status!=="Closed",A=(e.subtasks||[]).filter(h=>h.completed).length,F=(e.subtasks||[]).length,j=Array.isArray(e.assignees)&&e.assignees.length>0?e.assignees:e.assignee&&e.assignee.userId?[e.assignee]:[],C=g?._id||g?.id,z=e.reporter&&e.reporter.userId&&String(e.reporter.userId)===String(C)||e.userId&&String(e.userId)===String(C),L=a==="superadmin"||g?.role==="superadmin",p=z||L;let B="";if(j.length===0)B='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const h=j.slice(0,3),T=j.length-3;B=`
        <div class="ci-360-avatar-group">
          ${h.map(U=>`
            <div class="ci-360-avatar" title="Assignee: ${v(U.name||"Member")} (${v(U.role||"")})">
              ${(U.avatar||U.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${T>0?`
            <div class="ci-360-avatar extra-count" title="${T} more assignees: ${v(j.slice(3).map(U=>U.name).join(", "))}">
              +${T}
            </div>
          `:""}
        </div>
      `}return`
      <div class="ci-360-card" draggable="true" data-ticket-id="${e._id}">
        <div class="ci-360-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="ci-360-category-pill ${o.slug}">
              ${o.icon} ${o.label}
            </span>
            ${z?`
              <span class="ci-360-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${e.dueDate?`
              <span class="ci-360-due-pill ${y?"overdue":""}" title="Due Date">
                ${y?"⚠️ ":"📅 "}
                ${new Date(e.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          ${p?`
            <button type="button" class="ci-360-card-quick-del btn-delete-card-ticket" data-ticket-id="${e._id}" data-ticket-num="${v(e.ticketId)}" title="Delete Ticket (${L?"Superadmin":"Creator"})">
              🗑️
            </button>
          `:""}
        </div>

        <div class="ci-360-card-title" title="${v(e.title)}">
          ${v(e.title)}
        </div>

        ${e.jobTitle||e.jobId&&e.jobId.title?`
          <div class="ci-360-card-job-link" title="Linked Internal Job: ${v(e.jobTitle||e.jobId.title)}">
            📁 ${v(e.jobTitle||e.jobId.title)}
          </div>
        `:""}

        ${e.linkUrl||e.links&&e.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${v(e.linkUrl||e.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${v(e.linkUrl||e.links[0]?.url)}">
              🔗 ${e.links&&e.links[0]?.title?v(e.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="ci-360-card-bottom">
          <div class="ci-360-card-id-row">
            <span class="ci-360-pri-icon" title="Priority: ${m.label}">${m.icon}</span>
            <span class="ci-360-ticket-id">${v(e.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${F>0?`
              <span class="ci-360-subtask-badge" title="${A} of ${F} subtasks completed">
                ☑ ${A}/${F}
              </span>
            `:""}
            ${B}
          </div>
        </div>
      </div>
    `}function Be(){const e=s.querySelectorAll(".ci-360-card"),o=s.querySelectorAll(".ci-360-board-column");e.forEach(m=>{m.ondragstart=y=>{y.dataTransfer.setData("text/plain",m.dataset.ticketId),m.classList.add("dragging")},m.ondragend=()=>{m.classList.remove("dragging")}}),o.forEach(m=>{m.ondragover=y=>{y.preventDefault(),m.classList.add("drag-over")},m.ondragleave=()=>{m.classList.remove("drag-over")},m.ondrop=async y=>{y.preventDefault(),m.classList.remove("drag-over");const A=y.dataTransfer.getData("text/plain"),F=m.dataset.status;if(!A||!F)return;const j=c.find(p=>p._id.toString()===A);if(!j||j.status===F)return;const C=j.status,z=j.assignees?[...j.assignees]:[],L=j.assignee?{...j.assignee}:null;if(j.status=F,F==="Under Review"){const p={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};j.assignee=p,j.assignees=[p]}dt();try{const p=await tt(`/tickets/${A}/status`,{status:F}),B=F==="Under Review"?`Moved ${p.ticketId} to Under Review (Default assigned to John)`:`Moved ${p.ticketId} to ${F}`;S(B,!1),await de()}catch(p){S(p.message||"Status update failed",!0),j.status=C,j.assignees=z,j.assignee=L,await de()}}})}function wt(){s.querySelectorAll(".btn-delete-card-ticket").forEach(e=>{e.onclick=async o=>{o.stopPropagation(),o.preventDefault();const m=e.dataset.ticketId,y=e.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${y}?`)){e.disabled=!0;try{await at(`/tickets/${m}`),S(`Ticket ${y} deleted`,!1),await de()}catch(A){S(A.message||"Failed to delete ticket",!0),e.disabled=!1}}}}),s.querySelectorAll(".ci-360-card").forEach(e=>{e.onclick=o=>{if(o.target.tagName==="A"||o.target.closest(".btn-delete-card-ticket"))return;const m=e.dataset.ticketId;st(m)}})}function Re(){const e=s.querySelector("#btn-ci-360-refresh");e&&(e.onclick=async()=>{await de(),S("Board updated",!1)});const o=s.querySelector("#btn-ci-360-create-ticket");o&&(o.onclick=()=>{ft()});const m=s.querySelector("#ci-360-search-input");let y=null;m&&(m.oninput=U=>{clearTimeout(y),y=setTimeout(async()=>{E.search=U.target.value.trim(),Ve(),await de()},300)});const A=s.querySelector("#ci-360-filter-priority");A&&(A.onchange=async U=>{E.priority=U.target.value,Ve(),await de()});const F=s.querySelector("#ci-360-filter-category");F&&(F.onchange=async U=>{E.category=U.target.value,Ve(),await de()});const j=s.querySelector("#ci-360-filter-job");j&&(j.onchange=async U=>{E.jobId=U.target.value,Ve(),await de()});const C=s.querySelector("#ci-360-filter-assignee");C&&(C.onchange=async U=>{E.assigneeId=U.target.value,Ve(),await de()});const z=s.querySelector("#ci-360-pill-my-issues");z&&(z.onclick=async()=>{E.myIssuesOnly=!E.myIssuesOnly,z.classList.toggle("active",E.myIssuesOnly),Ve(),await de()});const L=s.querySelector("#ci-360-pill-scope-all"),p=s.querySelector("#ci-360-pill-scope-assigned"),B=s.querySelector("#ci-360-pill-scope-created"),h=async U=>{E.scope=U,L&&L.classList.toggle("active",U==="all"),p&&p.classList.toggle("active",U==="assigned"),B&&B.classList.toggle("active",U==="created"),Ve(),await de()};L&&(L.onclick=()=>h("all")),p&&(p.onclick=()=>h("assigned")),B&&(B.onclick=()=>h("created"));const T=s.querySelector("#ci-360-clear-filters");T&&(T.onclick=async()=>{E={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},m&&(m.value=""),A&&(A.value="all"),F&&(F.value="all");const U=s.querySelector("#ci-360-filter-job");U&&(U.value="all"),C&&(C.value="all"),z&&z.classList.remove("active"),L&&L.classList.add("active"),p&&p.classList.remove("active"),B&&B.classList.remove("active"),Ve(),await de()})}function Ve(){const e=s.querySelector("#ci-360-clear-filters");if(!e)return;const o=E.search||E.priority!=="all"||E.category!=="all"||E.jobId&&E.jobId!=="all"||E.assigneeId!=="all"||E.myIssuesOnly||E.scope&&E.scope!=="all";e.style.display=o?"inline":"none"}async function de(){await Je(),dt()}async function st(e){const o=s.querySelector("#ci-360-modals-root");if(o){o.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{q=await Le(`/tickets/${e}`)}catch(m){S(m.message||"Could not load ticket",!0),o.innerHTML="";return}ve()}}function ve(){const e=s.querySelector("#ci-360-modals-root");if(!e||!q)return;const o=q,m=Et.find(t=>t.key===o.category)||Et[0];Rt.find(t=>t.key===o.priority)||Rt[2];const y=o.subtasks||[],A=y.filter(t=>t.completed).length,F=y.length>0?Math.round(A/y.length*100):0,j=o.attachments||[],C=o.comments||[],z=(o.history||[]).slice().reverse(),L=o.workLogs||[],p=o.linkedTickets||[],B=g?._id||g?.id,h=o.reporter&&o.reporter.userId&&String(o.reporter.userId)===String(B)||o.userId&&String(o.userId)===String(B),T=a==="superadmin"||g?.role==="superadmin",U=h||T,_=Array.isArray(o.assignees)&&o.assignees.length>0?o.assignees:o.assignee&&o.assignee.userId?[o.assignee]:[];_.some(t=>t&&t.userId&&String(t.userId)===String(B));const d=o.jobId?._id?o.jobId._id.toString():o.jobId?o.jobId.toString():"",i=o.jobTitle||o.jobId&&o.jobId.title||"";e.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${m.slug}">${m.icon} ${m.label}</span>
              <span class="ci-360-ticket-id" style="font-size:13px;color:#38bdf8;">${v(o.ticketId)}</span>
            </div>
            <button class="ci-360-modal-close" id="btn-close-ci-360-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="ci-360-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="ci-360-detail-main">
              <!-- Issue Title Header -->
              <div class="ci-360-issue-header-wrap">
                <input type="text" class="ci-360-editable-title" id="inp-detail-title" value="${v(o.title)}" title="Click to edit title" />
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
                  <textarea id="inp-detail-desc" class="ci-360-desc-editor" rows="6">${v(o.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-ci-360-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="ci-360-desc-wrap" id="view-detail-desc">
                    ${o.description?Sa(o.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>🔗 Reference &amp; External Links (${(o.links||[]).length+(o.linkUrl&&!(o.links||[]).some(t=>t.url===o.linkUrl)?1:0)})</span>
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

                ${o.links&&o.links.length>0||o.linkUrl?`
                  <div class="ci-360-links-list" style="display:flex;flex-direction:column;gap:8px;">
                    ${o.linkUrl&&!(o.links||[]).some(t=>t.url===o.linkUrl)?`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(o.linkUrl)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(o.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${v(o.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(o.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    `:""}
                    ${(o.links||[]).map(t=>`
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
                  <span>Attachments (${j.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${j.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${j.map(t=>{const b=t.type&&t.type.includes("video")||t.name&&t.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||t.url&&t.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="ci-360-att-card ${b?"is-video":""}" style="${b?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${b?"16px":"13px"};">${b?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${v(t.name)}">
                                  ${v(t.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${fa(t.size)} ${b?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${b?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${t.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${t.url}" download="${v(t.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${t.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${b?`
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
                  <span>Subtasks (${A}/${y.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${F}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${F}%"></div>
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
                  <span>Linked Work Items (${p.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${p.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${p.map(t=>`
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
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${v(d)}</div>
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
                      ${Q.map(t=>`
                        <option value="${t._id}" ${d===t._id.toString()?"selected":""}>
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
                    Comments (${C.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${W==="history"?"active":""}" data-act-tab="history">
                    History (${z.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${W==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${L.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${W==="comments"?`
                  <div class="ci-360-comments-feed">
                    ${C.map(t=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(t.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${v(t.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${v(t.userRole)})</span></span>
                            <span class="ci-360-comment-time">${ia(t.createdAt)}</span>
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
                    ${z.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:z.map(t=>`
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
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${o.loggedHours||0} hrs</strong></span>
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

                    ${L.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:L.map(t=>`
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
                  ${ga.map(t=>{let b=o.status||"To Do";return b==="In Progress"?b="Content":b==="Resolved"?b="Under Review":b==="Closed"&&(b="Ready to Leave"),`
                      <option value="${t.key}" ${b===t.key?"selected":""}>
                        ${t.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="ci-360-select-field">
                  ${Rt.map(t=>`
                    <option value="${t.key}" ${o.priority===t.key?"selected":""}>
                      ${t.icon} ${t.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="ci-360-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="ci-360-side-lbl" style="margin-bottom:0;">Assigned Personnel (${_.length})</span>
                  
                    <button type="button" class="ci-360-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="ci-360-assigned-chips-wrap">
                  ${_.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:_.map(t=>`
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
                    ${O.map(t=>{const b=_.some(D=>D&&D.userId&&String(D.userId)===String(t._id));return`
                        <label class="ci-360-emp-check-item ${b?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${t._id}" ${b?"checked":""} />
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
                    ${(o.reporter?.name||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${v(o.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${v(o.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Category</span>
                <select id="sel-detail-category" class="ci-360-select-field">
                  ${Et.map(t=>`
                    <option value="${t.key}" ${o.category===t.key?"selected":""}>
                      ${t.icon} ${t.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="ci-360-date-field" value="${o.dueDate?new Date(o.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="ci-360-select-field">
                  <option value="">None (Workspace General)</option>
                  ${Q.map(t=>`
                    <option value="${t._id}" ${d===t._id.toString()?"selected":""}>
                      📁 ${v(t.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${o.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" class="ci-360-est-input" value="${o.estimatedHours||0}" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(o.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(o.updatedAt).toLocaleString()}</div>
                ${o.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(o.resolvedAt).toLocaleString()}</div>`:""}
              </div>

              <!-- Actions (Delete - Creator or Superadmin) -->
              ${U?`
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
    `,mt()}function mt(){const e=s.querySelector("#ci-360-modals-root");if(!e||!q)return;const o=e.querySelector("#btn-close-ci-360-modal");o&&(o.onclick=ct);const m=e.querySelector("#ci-360-detail-backdrop");m&&(m.onclick=I=>{I.target===m&&ct()});const y=e.querySelector("#inp-detail-title");y&&(y.onchange=async()=>{const I=y.value.trim();if(I)try{q=await tt(`/tickets/${q._id}`,{title:I}),await de()}catch(N){S(N.message||"Failed to update title",!0)}});const A=e.querySelector("#btn-toggle-desc-edit");A&&(A.onclick=()=>{H=!H,ve()});const F=e.querySelector("#btn-cancel-desc");F&&(F.onclick=()=>{H=!1,ve()});const j=e.querySelector("#btn-save-desc");j&&(j.onclick=async()=>{const I=e.querySelector("#inp-detail-desc")?.value;try{q=await tt(`/tickets/${q._id}`,{description:I}),H=!1,ve(),await de(),S("Description saved",!1)}catch(N){S(N.message||"Failed to save description",!0)}});const C=e.querySelector("#sel-detail-status");C&&(C.onchange=async I=>{try{const N=await tt(`/tickets/${q._id}/status`,{status:I.target.value});q=N,ve(),await nt(),lt(),await de();const u=N.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${N.status}`;S(u,!1)}catch(N){S(N.message||"Status change failed",!0)}});const z=e.querySelector("#sel-detail-priority");z&&(z.onchange=async I=>{try{q=await tt(`/tickets/${q._id}`,{priority:I.target.value}),ve(),await de()}catch(N){S(N.message,!0)}});const L=e.querySelector("#btn-toggle-assignee-picker"),p=e.querySelector("#ci-360-detail-assignee-box"),B=e.querySelector("#btn-close-detail-assignee-box"),h=e.querySelector("#btn-save-detail-assignees");L&&p&&(L.onclick=()=>{const I=p.style.display==="none";p.style.display=I?"block":"none"}),B&&p&&(B.onclick=()=>{p.style.display="none"}),e.querySelectorAll(".chk-detail-emp").forEach(I=>{I.onchange=()=>{I.closest(".ci-360-emp-check-item")?.classList.toggle("selected",I.checked)}}),h&&(h.onclick=async()=>{const I=Array.from(e.querySelectorAll(".chk-detail-emp:checked")).map(N=>N.value);try{h.disabled=!0,q=await tt(`/tickets/${q._id}`,{assigneeIds:I}),ve(),await de(),S("Assignees updated!",!1)}catch(N){S(N.message,!0),h.disabled=!1}}),e.querySelectorAll(".btn-remove-assignee").forEach(I=>{I.onclick=async()=>{const N=I.dataset.userId,oe=(Array.isArray(q.assignees)&&q.assignees.length>0?q.assignees:q.assignee?.userId?[q.assignee]:[]).filter(ne=>ne&&ne.userId&&String(ne.userId)!==String(N)).map(ne=>String(ne.userId));try{q=await tt(`/tickets/${q._id}`,{assigneeIds:oe}),ve(),await de(),S("Assignee removed",!1)}catch(ne){S(ne.message,!0)}}});const T=e.querySelector("#sel-detail-category");T&&(T.onchange=async I=>{try{q=await tt(`/tickets/${q._id}`,{category:I.target.value}),ve(),await de()}catch(N){S(N.message,!0)}});const U=e.querySelector("#inp-detail-duedate");U&&(U.onchange=async I=>{try{q=await tt(`/tickets/${q._id}`,{dueDate:I.target.value||null}),ve(),await de()}catch(N){S(N.message,!0)}});const _=e.querySelector("#sel-detail-job");_&&(_.onchange=async I=>{try{q=await tt(`/tickets/${q._id}`,{jobId:I.target.value||null}),ve(),await de(),S(I.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(N){S(N.message,!0)}});const d=e.querySelector("#btn-toggle-job-link"),i=e.querySelector("#ci-360-job-link-box");d&&i&&(d.onclick=()=>{i.style.display=i.style.display==="none"?"block":"none"});const t=e.querySelector("#btn-cancel-job-link");t&&i&&(t.onclick=()=>{i.style.display="none"});const b=e.querySelector("#btn-save-job-link");b&&(b.onclick=async()=>{const I=e.querySelector("#inp-modal-job-select")?.value||null;try{q=await tt(`/tickets/${q._id}`,{jobId:I}),ve(),await de(),S(I?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(N){S(N.message,!0)}});const D=e.querySelector("#btn-unlink-job");D&&(D.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{q=await tt(`/tickets/${q._id}`,{jobId:null}),ve(),await de(),S("Job unlinked",!1)}catch(I){S(I.message,!0)}});const M=e.querySelector("#inp-detail-esthours");M&&(M.onchange=async I=>{try{q=await tt(`/tickets/${q._id}`,{estimatedHours:Number(I.target.value)||0})}catch(N){S(N.message,!0)}}),e.querySelectorAll(".cb-subtask-toggle").forEach(I=>{I.onchange=async()=>{const N=I.dataset.subtaskId;try{q=await tt(`/tickets/${q._id}/subtasks/${N}`,{completed:I.checked}),ve(),await de()}catch(u){S(u.message,!0)}}}),e.querySelectorAll(".btn-del-subtask").forEach(I=>{I.onclick=async()=>{const N=I.dataset.subtaskId;try{q=await at(`/tickets/${q._id}/subtasks/${N}`),ve(),await de()}catch(u){S(u.message,!0)}}});const w=e.querySelector("#inp-new-subtask"),K=e.querySelector("#btn-add-subtask"),X=async()=>{const I=w?.value.trim();if(I)try{q=await xe(`/tickets/${q._id}/subtasks`,{title:I}),ve(),await de()}catch(N){S(N.message,!0)}};K&&(K.onclick=X),w&&(w.onkeydown=I=>{I.key==="Enter"&&(I.preventDefault(),X())});const R=e.querySelector("#btn-toggle-add-link"),P=e.querySelector("#add-link-form"),J=e.querySelector("#btn-cancel-new-link"),ie=e.querySelector("#btn-save-new-link"),Z=e.querySelector("#inp-new-link-url"),ae=e.querySelector("#inp-new-link-title");R&&P&&(R.onclick=()=>{const I=P.style.display==="none";P.style.display=I?"block":"none",I&&Z&&Z.focus()}),J&&P&&(J.onclick=()=>{P.style.display="none",Z&&(Z.value=""),ae&&(ae.value="")}),ie&&Z&&(ie.onclick=async()=>{const I=Z.value.trim(),N=ae?.value.trim()||"";if(!I){S("Please enter a valid URL link",!0);return}try{ie.disabled=!0,ie.textContent="Saving...",q=await xe(`/tickets/${q._id}/links`,{url:I,title:N}),ve(),await de(),S("Reference link added! 🔗",!1)}catch(u){S(u.message||"Failed to save link",!0),ie.disabled=!1,ie.textContent="Save Link 🔗"}}),e.querySelectorAll(".btn-copy-link").forEach(I=>{I.onclick=()=>{const N=I.dataset.url;N&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(N).then(()=>{S("Link copied to clipboard! 📋")}).catch(()=>{S("Link: "+N)}):S("Link: "+N))}}),e.querySelectorAll(".btn-del-link").forEach(I=>{I.onclick=async()=>{const N=I.dataset.linkId;try{q=await at(`/tickets/${q._id}/links/${N}`),ve(),await de(),S("Link removed")}catch(u){S(u.message||"Failed to remove link",!0)}}});const ce=e.querySelector("#btn-trigger-detail-upload"),se=e.querySelector("#inp-detail-att-upload"),he=e.querySelector("#detail-att-upload-progress");ce&&se&&(ce.onclick=I=>{I.preventDefault(),se.click()}),se&&(se.onchange=async()=>{const I=Array.from(se.files||[]);if(se.value="",!!I.length){he&&(he.style.display="block",he.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${I.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const u=(await ha(I,oe=>{const ne=e.querySelector("#att-prog-pct"),Ee=e.querySelector("#att-prog-bar");ne&&(ne.textContent=`${oe}%`),Ee&&(Ee.style.width=`${oe}%`)})).map(oe=>({name:oe.name,url:oe.url,size:oe.size||0,type:oe.type||"application/octet-stream"}));u.length&&(q=await xe(`/tickets/${q._id}/attachments`,{attachments:u}),ve(),S(`Successfully attached ${u.length} file(s)! 📎`,!1))}catch(N){console.error("Upload error:",N),S(`Upload failed: ${N.message}`,!0)}finally{he&&(he.style.display="none")}}}),e.querySelectorAll(".btn-play-att-video").forEach(I=>{I.onclick=()=>{const N=I.dataset.slot,u=e.querySelector("#"+N);if(u){const oe=u.style.display==="none";u.style.display=oe?"block":"none",I.textContent=oe?"⏸ Close Video":"▶ Play Video";const ne=u.querySelector("video");ne&&oe?ne.play().catch(()=>{}):ne&&ne.pause()}}}),e.querySelectorAll(".btn-del-att").forEach(I=>{I.onclick=async()=>{const N=I.dataset.attId;try{q=await at(`/tickets/${q._id}/attachments/${N}`),ve()}catch(u){S(u.message,!0)}}}),e.querySelectorAll(".ci-360-act-tab").forEach(I=>{I.onclick=()=>{W=I.dataset.actTab,ve()}});const qe=e.querySelector("#inp-new-comment"),ee=e.querySelector("#btn-submit-comment");ee&&qe&&(ee.onclick=async()=>{const I=qe.value.trim();if(I)try{ee.disabled=!0,ee.textContent="Saving...",q=await xe(`/tickets/${q._id}/comments`,{content:I}),ve(),S("Comment added",!1)}catch(N){S(N.message||"Failed to add comment",!0)}finally{ee.disabled=!1}});const Fe=e.querySelector("#btn-open-link-dialog"),De=e.querySelector("#ci-360-link-box"),ge=e.querySelector("#btn-cancel-link"),ye=e.querySelector("#btn-submit-link"),ke=e.querySelector("#inp-link-target"),Oe=e.querySelector("#sel-link-rel");Fe&&De&&(Fe.onclick=()=>{De.style.display="block"}),ge&&De&&(ge.onclick=()=>{De.style.display="none"}),ye&&De&&(ye.onclick=async()=>{const I=ke?.value.trim(),N=Oe?.value||"relates to";if(I)try{ye.disabled=!0,q=await xe(`/tickets/${q._id}/links`,{targetTicketId:I,relationship:N}),ve(),S(`Linked with ${I}`,!1)}catch(u){S(u.message||"Failed to link ticket",!0)}finally{ye.disabled=!1}}),e.querySelectorAll(".btn-del-link").forEach(I=>{I.onclick=async()=>{const N=I.dataset.linkId;try{q=await at(`/tickets/${q._id}/links/${N}`),ve()}catch(u){S(u.message,!0)}}});const Ue=e.querySelector("#btn-open-worklog-dialog"),pe=e.querySelector("#ci-360-worklog-box"),je=e.querySelector("#btn-cancel-worklog"),Ne=e.querySelector("#btn-submit-worklog"),_e=e.querySelector("#inp-worklog-time"),Ce=e.querySelector("#inp-worklog-desc");Ue&&pe&&(Ue.onclick=()=>{pe.style.display="block"}),je&&pe&&(je.onclick=()=>{pe.style.display="none"}),Ne&&pe&&(Ne.onclick=async()=>{const I=_e?.value.trim(),N=Ce?.value.trim();if(!I){S("Enter time spent (e.g. 2h 30m)",!0);return}try{Ne.disabled=!0,q=await xe(`/tickets/${q._id}/worklogs`,{timeSpent:I,description:N}),ve(),S("Work logged",!1)}catch(u){S(u.message||"Failed to log work",!0)}finally{Ne.disabled=!1}});const Pe=e.querySelector("#btn-delete-ticket");Pe&&(Pe.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${q.ticketId}?`))try{Pe.disabled=!0,await at(`/tickets/${q._id}`),S(`Ticket ${q.ticketId} deleted`,!1),ct(),await nt(),lt(),await de()}catch(I){S(I.message||"Failed to delete ticket",!0),Pe.disabled=!1}})}function ct(){q=null,H=!1;const e=s.querySelector("#ci-360-modals-root");e&&(e.innerHTML="")}function ft(e=null){const o=s.querySelector("#ci-360-modals-root");if(!o)return;const m=e||(E.jobId&&E.jobId!=="all"?E.jobId:null);o.innerHTML=`
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
                  ${O.map(i=>{const t=g&&String(g._id||g.id)===String(i._id);return`
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
                  ${Q.map(i=>`
                    <option value="${i._id}" ${m&&String(m)===String(i._id)?"selected":""}>
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
    `;const y=()=>{o.querySelectorAll(".ci-360-emp-check-item").forEach(i=>{const t=i.querySelector(".chk-create-emp");i.classList.toggle("selected",!!t?.checked)})};o.querySelectorAll(".chk-create-emp").forEach(i=>{i.onchange=y});const A=o.querySelector("#btn-create-assign-self");A&&g&&(A.onclick=()=>{const i=String(g._id||g.id);o.querySelectorAll(".chk-create-emp").forEach(t=>{t.value===i&&(t.checked=!0)}),y()});const F=o.querySelector("#btn-create-clear-assign");F&&(F.onclick=()=>{o.querySelectorAll(".chk-create-emp").forEach(i=>{i.checked=!1}),y()});const j=[],C=o.querySelector("#inp-create-ticket-att"),z=o.querySelector("#create-att-list"),L=o.querySelector("#create-att-count"),p=o.querySelector("#create-att-progress"),B=()=>{L&&(L.textContent=`${j.length} file(s) attached`),z&&(z.innerHTML=j.map((i,t)=>{const b=i.type&&i.type.includes("video")||i.name&&i.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${b?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${v(i.name)}">${v(i.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${fa(i.size)} ${b?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${t}" title="Remove">&times;</button>
          </div>
        `}).join(""),z.querySelectorAll(".btn-del-pending-att").forEach(i=>{i.onclick=()=>{j.splice(Number(i.dataset.idx),1),B()}}))};C&&(C.onchange=async()=>{const i=Array.from(C.files||[]);if(C.value="",!!i.length){p&&(p.style.display="block",p.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${i.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await ha(i,b=>{const D=o.querySelector("#create-prog-pct"),M=o.querySelector("#create-prog-bar");D&&(D.textContent=`${b}%`),M&&(M.style.width=`${b}%`)})).forEach(b=>{j.push({name:b.name,url:b.url,size:b.size||0,type:b.type||"application/octet-stream"})}),B()}catch(t){S(`Failed to upload files: ${t.message}`,!0)}finally{p&&(p.style.display="none"),C.value=""}}});const h=()=>{o.innerHTML=""},T=o.querySelector("#btn-close-create-modal");T&&(T.onclick=h);const U=o.querySelector("#btn-cancel-create-ticket");U&&(U.onclick=h);const _=o.querySelector("#ci-360-create-backdrop");_&&(_.onclick=i=>{i.target===_&&h()});const d=o.querySelector("#btn-submit-create-ticket");d&&(d.onclick=async()=>{const i=o.querySelector("#create-ticket-title")?.value.trim(),t=o.querySelector("#create-ticket-desc")?.value.trim(),b=o.querySelector("#create-ticket-cat")?.value||"Task",D=o.querySelector("#create-ticket-pri")?.value||"Medium",w=Array.from(o.querySelectorAll(".chk-create-emp:checked")).map(P=>P.value),K=o.querySelector("#create-ticket-duedate")?.value||null,X=o.querySelector("#create-ticket-job")?.value||null,R=o.querySelector("#create-ticket-url")?.value.trim()||"";if(!i){S("Ticket summary / title is required",!0);return}try{d.disabled=!0,d.textContent="Creating...";const P=await xe("/tickets",{title:i,description:t,category:b,priority:D,assigneeIds:w,assigneeId:w[0]||null,dueDate:K,jobId:X,linkUrl:R,attachments:j});S(`Ticket ${P.ticketId} created! 🎫`,!1),h(),await nt(),lt(),await de(),st(P._id)}catch(P){S(P.message||"Could not create ticket",!0),d.disabled=!1,d.textContent="Create Ticket 🚀"}})}s._openCreateTicketModal=ft,s._openTicketDetailModal=st,s._setJobFilter=async e=>{E.jobId=e||"all";const o=s.querySelector("#ci-360-filter-job");o&&(o.value=E.jobId),Ve(),await de()}}export{mn as a,bn as b,un as i};
