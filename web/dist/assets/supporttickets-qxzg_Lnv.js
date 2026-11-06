import{c as Ee,k,e as x,x as Xe,l as Ze,p as Lt,m as Yt,j as we,y as ga,z as ta,A as ba}from"./api-Cwe-Rvi5.js";const ma={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function Aa(){try{const l=localStorage.getItem("ci360_planner_settings");if(l)return Object.assign({},ma,JSON.parse(l))}catch{}return Object.assign({},ma)}function Da(l){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(l))}catch{}}function Ne(){const l=new Date,t=l.getFullYear(),e=String(l.getMonth()+1).padStart(2,"0"),u=String(l.getDate()).padStart(2,"0");return`${t}-${e}-${u}`}function Wt(l,t){const e=new Date(l+"T00:00:00");e.setDate(e.getDate()+t);const u=e.getFullYear(),v=String(e.getMonth()+1).padStart(2,"0"),g=String(e.getDate()).padStart(2,"0");return`${u}-${v}-${g}`}function xt(l){return l?new Date(l+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function Pe(l){return l?new Date(l+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function fa(l){return l?new Date(l+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function Mt(l,t=1){const e=new Date(l+"T00:00:00"),u=e.getDay(),v=(u<t?7:0)+u-t,g=new Date(e);g.setDate(e.getDate()-v);const c=[];for(let o=0;o<7;o++){const R=new Date(g);R.setDate(g.getDate()+o);const Y=R.getFullYear(),A=String(R.getMonth()+1).padStart(2,"0"),F=String(R.getDate()).padStart(2,"0");c.push(`${Y}-${A}-${F}`)}return c}function Ea(){try{const l=window.AudioContext||window.webkitAudioContext;if(!l)return;const t=new l,e=t.currentTime,u=t.createOscillator(),v=t.createGain();u.type="sine",u.frequency.setValueAtTime(523.25,e),u.frequency.exponentialRampToValueAtTime(783.99,e+.15),v.gain.setValueAtTime(.2,e),v.gain.exponentialRampToValueAtTime(.001,e+.35),u.connect(v),v.connect(t.destination),u.start(e),u.stop(e+.35)}catch{}}function nn(l,t={}){const{userRole:e="employee",currentUser:u=null,onNavigate:v=null}=t,g=e==="superadmin"||e==="admin";let c=Aa(),o={selectedDate:Ne(),viewMode:"daily",filterStatus:"all",searchQuery:"",groupByEmployee:g,collapsedEmployees:{},selectedCategory:"all",selectedPersonnelId:"all",reportPersonnelId:"all",tasks:[],personnelList:[],clientList:[],loading:!1};Ta(),R();async function R(){o.loading=!0,Y();try{const d=[Ee("/tasks"),Ee("/personnel").catch(()=>[]),Ee("/clients").catch(()=>[])],[a,r,f]=await Promise.all(d);o.tasks=Array.isArray(a)?a:[],r&&(o.personnelList=Array.isArray(r)?r:[]),f&&(o.clientList=Array.isArray(f)?f:[])}catch(d){k("Failed to load planner tasks: "+d.message,!0)}finally{o.loading=!1,O()}}function Y(){l.innerHTML=`
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
    `}function A(d){return o.tasks.filter(a=>{if(a.isDeleted===!0)return!1;if(g&&o.selectedPersonnelId!=="all"){const h=a.personnelId?._id||a.personnelId,T=String(h)===String(o.selectedPersonnelId),B=Array.isArray(a.coOwners)&&a.coOwners.some(w=>{const P=w.personnelId?._id||w.personnelId||w.userId?._id||w.userId;return String(P)===String(o.selectedPersonnelId)});if(!T&&!B)return!1}const r=a.completionDateStr||a.dateStr||(a.dueDate?new Date(a.dueDate).toISOString().slice(0,10):""),f=a.assignedDateStr||(a.assignedDate?new Date(a.assignedDate).toISOString().slice(0,10):"")||(a.createdAt?new Date(a.createdAt).toISOString().slice(0,10):"")||r;if(a.status==="In Progress"){const h=f&&r&&f<=r?f:r||f,T=f&&r&&f<=r?r:f||r;if(h&&T){if(d>=h&&d<=T)return!0}else{if(r&&r===d)return!0;if(f&&f===d)return!0}}return r&&r===d||a.status!=="Completed"&&f&&f===d?!0:!r&&!f?d===Ne():!1})}function F(d,a){if(d.status==="Completed")return!1;const r=d.completionDateStr||d.dateStr||(d.dueDate?new Date(d.dueDate).toISOString().slice(0,10):"");return r?r<a:!1}function H(d,a){const r=d.length,f=d.filter(P=>P.status==="Completed").length,h=d.filter(P=>P.status==="In Progress").length,T=d.filter(P=>P.status==="Pending"||P.status==="Todo").length,B=d.filter(P=>F(P,a)).length,w=r>0?Math.round(f/r*100):0;return{total:r,completed:f,inProgress:h,pending:T,overdue:B,percent:w}}function O(){const d=Ne(),a=o.selectedDate===d,r=A(o.selectedDate),f=H(r,d);l.innerHTML=`
      <div class="ci360-planner-wrap ${c.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${Pe(o.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${x(c.displayName||"Daily Planner")}</h1>
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
            <button type="button" class="ci360-btn-primary ${o.selectedDate<d?"is-locked-past":""}" id="btnOpenAddTaskModal" title="${o.selectedDate<d?"Cannot add tasks on previous dates (switch to today or later)":"Add Task"}">
              ${o.selectedDate<d?`
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
              <span class="date-text" id="displayDateLabel">${xt(o.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${o.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${a?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${g?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${o.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${o.personnelList.map(h=>`
                  <option value="${h._id}" ${o.selectedPersonnelId===String(h._id)?"selected":""}>
                    ${x(h.name)} (${x(h.department||h.role||"Team")})
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
                <span class="kpi-num">${f.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${f.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${f.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${f.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${f.overdue>0?`
                <div class="kpi-box overdue">
                  <span class="kpi-num">${f.overdue}</span>
                  <span class="kpi-label">Overdue</span>
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
          ${ge(r,f)}
        </main>

      </div>
    `,ot(),Ae()}function ge(d,a){return o.viewMode==="weekly"?dt():o.viewMode==="report"?$t():$e(d,a)}function $e(d,a){const r=Ne(),f=o.selectedDate<r;let h=d;if(o.filterStatus==="pending"?h=h.filter(w=>w.status==="Pending"||w.status==="Todo"):o.filterStatus==="in_progress"?h=h.filter(w=>w.status==="In Progress"):o.filterStatus==="completed"?h=h.filter(w=>w.status==="Completed"):o.filterStatus==="overdue"&&(h=h.filter(w=>F(w,r))),o.searchQuery){const w=o.searchQuery.toLowerCase().trim();h=h.filter(P=>{const N=(P.title||"").toLowerCase(),E=(P.description||"").toLowerCase(),j=(P.category||"").toLowerCase(),y=(P.clientName||"").toLowerCase(),D=(P.personnelId?.name||P.userId?.name||"").toLowerCase(),J=(P.createdByName||P.createdBy?.name||(P.createdBy?.email?P.createdBy.email.split("@")[0]:"")).toLowerCase(),S=Array.isArray(P.coOwners)?P.coOwners.map(p=>(p.name||"").toLowerCase()).join(" "):"",s=(P.clientId?.name||P.jobId?.clientId?.name||"").toLowerCase();return N.includes(w)||E.includes(w)||j.includes(w)||y.includes(w)||D.includes(w)||J.includes(w)||S.includes(w)||s.includes(w)})}h.sort((w,P)=>{if(w.status==="Completed"&&P.status!=="Completed")return 1;if(w.status!=="Completed"&&P.status==="Completed")return-1;const N={Urgent:0,High:1,Medium:2,Low:3};return(N[w.priority]||2)-(N[P.priority]||2)});const T=new Map;h.forEach(w=>{let P="unassigned",N="Unassigned / Team",E="",j="";w.personnelId&&typeof w.personnelId=="object"&&w.personnelId._id?(P=String(w.personnelId._id),N=w.personnelId.name||"Team Member",j=w.personnelId.role||"Personnel",E=w.personnelId.department||""):w.userId&&typeof w.userId=="object"&&w.userId._id?(P=String(w.userId._id),N=w.userId.name||"User",j=w.userId.role||"Member"):(w.createdByName||w.createdBy&&w.createdBy.name)&&(N=w.createdByName||w.createdBy.name,P="creator_"+N.toLowerCase().replace(/[^a-z0-9]/g,"_"),j="Creator"),T.has(P)||T.set(P,{key:P,name:N,department:E,role:j,tasks:[]}),T.get(P).tasks.push(w)});const B=Array.from(T.values()).sort((w,P)=>w.key==="unassigned"?1:P.key==="unassigned"?-1:w.name.localeCompare(P.name));return`
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
              <button type="button" class="ci360-btn-primary" id="btnFocusAddTask" style="padding:6px 14px;font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:6px;border-radius:var(--r-md);margin-left:4px;cursor:pointer;box-shadow:0 2px 6px rgba(99,102,241,0.25);">
                <span style="font-size:15px;line-height:1;font-weight:800;">+</span> Add Task
              </button>
            `}
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${o.filterStatus==="all"?"active":""}" data-f="all">All (${a.total})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${a.pending})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${a.inProgress})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${a.completed})</button>
              ${a.overdue>0?`
                <button type="button" class="filter-pill overdue ${o.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${a.overdue})</button>
              `:""}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${g?`
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${o.groupByEmployee?"active":""}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${o.groupByEmployee?"By Employee":"Flat List"}
                </button>
                ${o.groupByEmployee&&B.length>0?`
                  <button type="button" class="filter-pill" id="btnExpandAllEmp" title="Expand all employee tasks">⊞ Expand</button>
                  <button type="button" class="filter-pill" id="btnCollapseAllEmp" title="Collapse all employee tasks">⊟ Collapse</button>
                `:""}
              </div>
            `:""}

            <!-- Search Bar with employee search support -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks, client name, employee or co-owner..." value="${x(o.searchQuery)}">
              ${o.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Past Date Banner (Only for Previous Dates) -->
        ${f?`
          <div class="ci360-past-date-banner">
            <div class="past-banner-icon">🔒</div>
            <div class="past-banner-body">
              <div class="past-banner-title">Previous Date (${Pe(o.selectedDate)})</div>
              <div class="past-banner-desc">
                Adding new tasks on previous dates is restricted. You can edit existing tasks, adjust completion dates, or mark tasks as completed.
              </div>
            </div>
          </div>
        `:""}

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${h.length===0?We(f):g&&o.groupByEmployee?`
              <div class="ci360-emp-groups-container">
                ${B.map(w=>{const P=!!o.collapsedEmployees[w.key],N=w.tasks.filter(D=>D.status==="Completed").length,E=w.tasks.filter(D=>D.status==="In Progress").length,j=w.tasks.filter(D=>D.status==="Pending"||D.status==="Todo").length,y=w.tasks.length>0?Math.round(N/w.tasks.length*100):0;return`
                    <div class="ci360-emp-group-card ${P?"is-collapsed":""}" data-emp-key="${w.key}">
                      <div class="ci360-emp-group-header" data-action="toggle-emp-group" data-emp-key="${w.key}" role="button" tabindex="0">
                        <div class="emp-group-left">
                          <span class="emp-collapse-icon">${P?"▶":"▼"}</span>
                          <div class="emp-avatar">${x((w.name||"U").charAt(0).toUpperCase())}</div>
                          <div class="emp-info">
                            <span class="emp-name">${x(w.name)}</span>
                            ${w.department||w.role?`<span class="emp-subtitle">${x(w.department?w.department+" · "+w.role:w.role)}</span>`:""}
                          </div>
                        </div>

                        <div class="emp-group-right">
                          <span class="emp-stat-pill total">${w.tasks.length} ${w.tasks.length===1?"task":"tasks"}</span>
                          <span class="emp-stat-pill done">${N} done</span>
                          ${E>0?`<span class="emp-stat-pill in-prog">${E} in progress</span>`:""}
                          ${j>0?`<span class="emp-stat-pill pending">${j} pending</span>`:""}
                          <div class="emp-mini-bar-wrap" title="${y}% completed">
                            <div class="emp-mini-bar-fill" style="width:${y}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${P?"":`
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${w.tasks.map(D=>et(D,r)).join("")}
                          </div>
                        </div>
                      `}
                    </div>
                  `}).join("")}
              </div>
            `:`
              <div class="ci360-task-list">
                ${h.map(w=>et(w,r)).join("")}
              </div>
            `}
        </div>

      </div>
    `}function We(d=!1){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">${d?"📜":"✨"}</div>
        <h3>No tasks found for ${Pe(o.selectedDate)}</h3>
        <p>${d?"No scheduled tasks were recorded on this past date.":"Your schedule is clean and ready. Add your first priority task above or import your daily agenda."}</p>
        ${d?"":`
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
    `}function et(d,a){const r=d.status==="Completed",f=F(d,a),h=d.completionDateStr||d.dateStr||(d.dueDate?new Date(d.dueDate).toISOString().slice(0,10):a),T=d.assignedDateStr||(d.assignedDate?new Date(d.assignedDate).toISOString().slice(0,10):"")||(d.createdAt?new Date(d.createdAt).toISOString().slice(0,10):""),B=d.status==="In Progress"&&T&&h&&T!==h,w=`pri-${(d.priority||"medium").toLowerCase()}`,P=`status-${(d.status||"pending").toLowerCase().replace(/\s+/g,"-")}`,N=d.createdByName||d.createdBy?.name||(d.createdBy?.email?d.createdBy.email.split("@")[0]:"")||d.personnelId?.name||d.userId?.name||"";return`
      <div class="ci360-task-card ${r?"is-completed":""} ${f?"is-overdue":""}" data-id="${d._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${r?"checked":""}" data-action="toggle" data-id="${d._id}" title="${r?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${x(d.title)}</span>
          </div>

          ${d.description?`
            <div class="ci360-task-desc">${x(d.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${w}">
              <span class="badge-dot"></span>
              ${x(d.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${P}">
              ${x(d.status||"Pending")}
            </span>

            <!-- Completion Date / Date Span Badge (Always Visible & Prominent) -->
            ${B?`
              <span class="ci360-badge completion-badge" style="background:rgba(59,130,246,0.15);color:#3b82f6;border-color:rgba(59,130,246,0.3);" title="In Progress from ${Pe(T)} to ${Pe(h)}">
                📅 ${Pe(T)} ➔ Due: ${Pe(h)}
              </span>
            `:`
              <span class="ci360-badge completion-badge" title="Target Completion Date: ${h}">
                📅 Due: ${Pe(h)}
              </span>
            `}

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${d.rescheduledFrom&&d.rescheduledFrom!==h?`
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${Pe(d.rescheduledFrom)} to ${Pe(h)} (${d.dateChangeCount||1} change${(d.dateChangeCount||1)>1?"s":""})">
                🔄 Date Changed: ${Pe(d.rescheduledFrom)} ➔ ${Pe(h)}
              </span>
            `:""}

            <!-- Added By Badge (Shows Who Created the Task) -->
            ${N?`
              <span class="ci360-badge creator-badge" title="Created / Added by: ${x(N)}">
                ✍️ Added by: ${x(N)}
              </span>
            `:""}

            <!-- Category -->
            ${d.category?`
              <span class="ci360-badge category-badge">
                #${x(d.category)}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${f?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name (if different from addedByName) -->
            ${g&&(d.personnelId?.name||d.userId?.name)&&(d.personnelId?.name||d.userId?.name)!==N?`
              <span class="ci360-badge personnel-badge" title="Assigned Employee">
                👤 Assigned: ${x(d.personnelId?.name||d.userId?.name)}
              </span>
            `:""}

            <!-- Co-Owners Badge (Multiple People) -->
            ${Array.isArray(d.coOwners)&&d.coOwners.length>0?`
              <span class="ci360-badge coowner-badge" style="background:rgba(99,102,241,0.12);color:var(--accent);border:1px solid rgba(99,102,241,0.25);" title="Co-Owners: ${d.coOwners.map(E=>E.name).filter(Boolean).join(", ")}">
                👥 Co-Owners: ${x(d.coOwners.map(E=>E.name).filter(Boolean).join(", "))}
              </span>
            `:""}

            <!-- Client Badge -->
            ${d.clientName||d.clientId?.name||d.jobId?.clientId?.name||d.category&&d.category!=="General"&&d.category?`
              <span class="ci360-badge client-badge" style="background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.25);" title="Client: ${x(d.clientName||d.clientId?.name||d.jobId?.clientId?.name||d.category)}">
                🏢 ${x(d.clientName||d.clientId?.name||d.jobId?.clientId?.name||d.category)}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu: Previous tasks can be edited, deleted, changed by all -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${d._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${d._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function dt(){const d=Mt(o.selectedDate,c.weekStartsOn),a=Pe(d[0]),r=Pe(d[6]),f=Ne();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${a} – ${r}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${d.map(h=>{const T=h===f,B=h===o.selectedDate,w=A(h),P=H(w,f);return`
              <div class="ci360-day-column ${T?"is-today":""} ${B?"is-selected":""}" data-date="${h}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${h}">
                  <div class="day-name">${fa(h)}</div>
                  <div class="day-number">${new Date(h+"T00:00:00").getDate()}</div>
                  ${T?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${P.completed}/${P.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${P.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${w.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:w.map(N=>`
                    <div class="ci360-mini-task-card ${N.status==="Completed"?"done":""}" data-id="${N._id}">
                      <button type="button" class="mini-check ${N.status==="Completed"?"checked":""}" data-action="toggle" data-id="${N._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${N._id}">
                        <div class="mini-title">${x(N.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(N.priority||"medium").toLowerCase()}">${N.priority||"Med"}</span>
                          ${N.dueTime?`<span class="mini-time">${x(N.dueTime)}</span>`:""}
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
    `}function $t(){const d=Mt(o.selectedDate,c.weekStartsOn),a=xt(d[0]),r=xt(d[6]),f=Ne(),h=o.reportPersonnelId||"all",T=o.personnelList.find(D=>String(D._id)===String(h)),B=T?T.name:"",w=o.tasks.filter(D=>{if(D.isDeleted===!0)return!1;const J=D.completionDateStr||D.dateStr||(D.dueDate?new Date(D.dueDate).toISOString().slice(0,10):""),S=D.assignedDateStr||(D.assignedDate?new Date(D.assignedDate).toISOString().slice(0,10):"")||J;if(!(D.status==="In Progress"&&S&&J?d.some(p=>p>=S&&p<=J):d.includes(J)||d.includes(S)))return!1;if(h!=="all"){const p=String(D.personnelId?._id||D.personnelId||""),n=Array.isArray(D.coOwners)&&D.coOwners.some(i=>String(i.personnelId?._id||i.personnelId||i.userId?._id||i.userId||"")===String(h));return p===String(h)||n}return!0}),P=w.length,N=w.filter(D=>D.status==="Completed").length,E=w.filter(D=>D.status==="In Progress").length,j=P>0?Math.round(N/P*100):0,y={Urgent:0,High:0,Medium:0,Low:0};return w.forEach(D=>{const J=D.priority||"Medium";y[J]!==void 0&&y[J]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3);display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span>Week Period: ${a} – ${r}</span>
              ${h!=="all"&&B?`
                <span class="badge blue" style="font-size:11.5px;padding:2px 8px;font-weight:700;">👤 Employee: ${x(B)}</span>
              `:`
                <span class="badge gray" style="font-size:11.5px;padding:2px 8px;font-weight:600;">👥 All Team Members</span>
              `}
            </div>
          </div>

          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            ${g?`
              <div style="display:inline-flex;align-items:center;gap:6px;">
                <label for="selectWeeklyReportEmployee" style="font-size:12px;font-weight:700;color:var(--text-2);white-space:nowrap;">Whose Report:</label>
                <select id="selectWeeklyReportEmployee" class="input" style="padding:6px 12px;font-size:12.5px;font-weight:600;min-width:180px;height:36px;border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);border:1px solid var(--border-sm);">
                  <option value="all" ${h==="all"?"selected":""}>👥 All Team Members</option>
                  ${o.personnelList.map(D=>`
                    <option value="${D._id}" ${String(D._id)===String(h)?"selected":""}>
                      👤 ${x(D.name)} (${x(D.department||D.role||"Member")})
                    </option>
                  `).join("")}
                </select>
              </div>
            `:""}

            <button type="button" class="ci360-btn-primary" id="btnDownloadWeeklyPdf" title="Download weekly report PDF for the selected employee">
              📄 Download Weekly Report PDF
            </button>
            <button type="button" class="ci360-btn-secondary" id="btnOpenAdminReportModal" style="background:rgba(99,102,241,0.12);color:var(--accent);border:1px solid rgba(99,102,241,0.25);font-weight:700;">
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
            <span class="value" style="font-size:28px;color:var(--green-500)">${N}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${E}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${j}%</span>
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
                ${d.map(D=>{const J=A(D),S=H(J,f);return`
                    <tr>
                      <td><strong>${fa(D)}</strong></td>
                      <td>${Pe(D)}</td>
                      <td>${S.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${S.completed}</td>
                      <td>${S.pending+S.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${S.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${S.percent}%</span>
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
    `}function ot(){const d=document.getElementById("btnViewDaily"),a=document.getElementById("btnViewWeekly"),r=document.getElementById("btnViewReport");d&&(d.onclick=()=>{o.viewMode="daily",O()}),a&&(a.onclick=()=>{o.viewMode="weekly",O()}),r&&(r.onclick=()=>{o.viewMode="report",O()});const f=document.getElementById("btnPrevDay"),h=document.getElementById("btnNextDay"),T=document.getElementById("btnJumpToday"),B=document.getElementById("hiddenDateInput"),w=document.getElementById("datePickerBadge");f&&(f.onclick=()=>{o.selectedDate=Wt(o.selectedDate,-1),O()}),h&&(h.onclick=()=>{o.selectedDate=Wt(o.selectedDate,1),O()}),T&&(T.onclick=()=>{o.selectedDate=Ne(),O()}),w&&B&&(w.onclick=()=>{try{typeof B.showPicker=="function"?B.showPicker():B.focus()}catch{B.focus()}},B.onchange=n=>{n.target.value&&(o.selectedDate=n.target.value,O())});const P=document.getElementById("admTeamSelect");P&&(P.onchange=n=>{o.selectedPersonnelId=n.target.value,O()});const N=document.getElementById("btnOpenAddTaskModal");N&&(N.onclick=()=>{if(o.selectedDate<Ne()){k("Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.",!0);return}Fe()});const E=document.getElementById("btnPlannerActionsMenu"),j=document.getElementById("plannerActionsDropdown");E&&j&&(E.onclick=n=>{n.stopPropagation(),j.classList.toggle("hidden")},document.addEventListener("click",n=>{!j.contains(n.target)&&n.target!==E&&j.classList.add("hidden")}));const y=document.getElementById("btnActionImport");y&&(y.onclick=()=>{j?.classList.add("hidden"),ut()});const D=document.getElementById("btnActionExportPng");D&&(D.onclick=()=>{j?.classList.add("hidden"),Le()});const J=document.getElementById("btnActionExportPdf");J&&(J.onclick=()=>{j?.classList.add("hidden"),de()});const S=document.getElementById("btnActionAdminReport");S&&(S.onclick=()=>{j?.classList.add("hidden"),st()});const s=document.getElementById("btnActionBackup");s&&(s.onclick=()=>{j?.classList.add("hidden"),ct()});const p=document.getElementById("btnActionSettings");p&&(p.onclick=()=>{j?.classList.add("hidden"),lt()})}function Ae(d){if(o.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(S=>{S.onclick=()=>{o.filterStatus=S.dataset.f,O()}});const a=document.getElementById("plannerTaskSearchInp");a&&(a.oninput=S=>{const s=S.target.value;o.searchQuery=s;const p=S.target.selectionStart;O();const n=document.getElementById("plannerTaskSearchInp");if(n&&(n.focus(),p!==null))try{n.setSelectionRange(p,p)}catch{}});const r=document.getElementById("btnClearSearch");r&&(r.onclick=()=>{o.searchQuery="",O()});const f=document.getElementById("btnFocusAddTask");f&&(f.onclick=()=>{Fe(null,o.selectedDate)});const h=document.getElementById("btnEmptyStateAddTask");h&&(h.onclick=()=>{Fe(null,o.selectedDate)});const T=document.getElementById("quickAddTitleInp"),B=document.getElementById("quickAddCompletionDate"),w=document.getElementById("quickAddPriority"),P=document.getElementById("quickAddCategory"),N=document.getElementById("btnQuickAddSubmit"),E=async()=>{const S=Ne();if(o.selectedDate<S){k("Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.",!0);return}const s=(T?.value||"").trim();if(!s){k("Please enter a task title",!0),T?.focus();return}const p=(B?.value||"").trim()||o.selectedDate;if(p<S){k("Cannot set completion date on a previous date.",!0);return}try{const n={title:s,assignedDate:o.selectedDate,assignedDateStr:o.selectedDate,dateStr:p,completionDate:p,completionDateStr:p,dueDate:p,priority:w?.value||c.defaultPriority,category:P?.value||"General",status:"Pending"};if(g){const $=document.getElementById("quickAddAssignee")?.value;$==="all"?(n.assignAll=!0,n.personnelId="all"):$?n.personnelId=$:o.selectedPersonnelId!=="all"&&(n.personnelId=o.selectedPersonnelId)}const i=await we("/tasks",n);o.tasks.unshift(i),k("Task added to today's focus! ✨"),T&&(T.value="",T.focus()),O()}catch(n){k(n.message,!0)}};N&&(N.onclick=E),T&&(T.onkeydown=S=>{S.key==="Enter"&&E()}),document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(S=>{S.onclick=()=>{const s=S.dataset.empKey;o.collapsedEmployees[s]=!o.collapsedEmployees[s],O()}});const j=document.getElementById("btnToggleEmpGrouping");j&&(j.onclick=()=>{o.groupByEmployee=!o.groupByEmployee,O()});const y=document.getElementById("btnExpandAllEmp");y&&(y.onclick=()=>{o.collapsedEmployees={},O()});const D=document.getElementById("btnCollapseAllEmp");D&&(D.onclick=()=>{document.querySelectorAll(".ci360-emp-group-card").forEach(S=>{const s=S.dataset.empKey;s&&(o.collapsedEmployees[s]=!0)}),O()});const J=document.getElementById("btnEmptyStateImport");J&&(J.onclick=()=>ut())}if(o.viewMode==="weekly"){const a=document.getElementById("btnPrevWeek"),r=document.getElementById("btnNextWeek"),f=document.getElementById("btnThisWeek");a&&(a.onclick=()=>{o.selectedDate=Wt(o.selectedDate,-7),O()}),r&&(r.onclick=()=>{o.selectedDate=Wt(o.selectedDate,7),O()}),f&&(f.onclick=()=>{o.selectedDate=Ne(),O()}),document.querySelectorAll(".day-col-header").forEach(h=>{h.onclick=()=>{o.selectedDate=h.dataset.date,o.viewMode="daily",O()}}),document.querySelectorAll('[data-action="add-day"]').forEach(h=>{h.onclick=()=>{Fe(null,h.dataset.date)}})}if(o.viewMode==="report"){const a=document.getElementById("selectWeeklyReportEmployee");a&&(a.onchange=h=>{o.reportPersonnelId=h.target.value,O()});const r=document.getElementById("btnDownloadWeeklyPdf");r&&(r.onclick=()=>de({personnelId:o.reportPersonnelId||"all"}));const f=document.getElementById("btnOpenAdminReportModal");f&&(f.onclick=()=>st())}l.querySelectorAll('[data-action="toggle"]').forEach(a=>{a.onclick=async r=>{r.stopPropagation();const f=a.dataset.id;await rt(f)}}),l.querySelectorAll('[data-action="edit"]').forEach(a=>{a.onclick=r=>{r.stopPropagation();const f=a.dataset.id,h=o.tasks.find(T=>T._id===f);h&&Fe(h)}}),l.querySelectorAll('[data-action="delete"]').forEach(a=>{a.onclick=async r=>{r.stopPropagation();const f=a.dataset.id;await bt(f)}})}async function rt(d){const a=o.tasks.find(f=>f._id===d);if(!a)return;const r=a.status!=="Completed";try{const f=await Xe(`/tasks/${d}/toggle`,{}),h=o.tasks.findIndex(T=>T._id===d);h!==-1&&(o.tasks[h]=f),r?(c.soundEnabled&&Ea(),k("Task marked as completed! 🎉")):k("Task reopened as pending."),O()}catch(f){k(f.message,!0)}}async function bt(d){const a=o.tasks.find(r=>r._id===d);if(a&&confirm(`Are you sure you want to remove "${a.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Ze(`/tasks/${d}`),o.tasks=o.tasks.filter(r=>r._id!==d),k("Task removed from planner (safely stored in database archive)"),O()}catch(r){k(r.message,!0)}}function Fe(d=null,a=null){const r=!!d,f=Ne(),h=d?d.assignedDateStr||(d.assignedDate?new Date(d.assignedDate).toISOString().slice(0,10):"")||d.dateStr||(d.createdAt?new Date(d.createdAt).toISOString().slice(0,10):o.selectedDate):a&&a>=f?a:o.selectedDate>=f?o.selectedDate:f;d?d.completionDateStr||d.dueDate&&new Date(d.dueDate).toISOString().slice(0,10):a&&a>=f||o.selectedDate>=f&&o.selectedDate;const T=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${r?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${x(d?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${x(d?.description||"")}</textarea>
          </div>

          <!-- Date Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${h}" ${r?"":`min="${f}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${d?.completionDateStr||(d?.dueDate?new Date(d.dueDate).toISOString().slice(0,10):"")}" ${r?"":`min="${f}"`} placeholder="Defaults to that day">
              <small style="color:var(--text-3);font-size:11px;">If left blank, will default to that day (${h})</small>
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${d?.priority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!d&&c.defaultPriority==="Medium"||d?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!d&&c.defaultPriority==="High"||d?.priority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${d?.priority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${d?.status==="Pending"||d?.status==="Todo"||!d?"selected":""}>Pending</option>
                <option value="In Progress" ${d?.status==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${d?.status==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskClientName">Client Name</label>
              <input type="text" id="taskClientName" class="input" list="clientOptions" placeholder="Enter or select client name..." value="${x(d?.clientName||(d?.category&&d.category!=="General"?d.category:""))}">
              <datalist id="clientOptions">
                ${(o.clientList||[]).map(s=>`<option value="${x(s.name)}">`).join("")}
                <option value="Internal CI">
                <option value="General">
              </datalist>
            </div>
          </div>

          <!-- Superadmin Assign To -->
          ${g?`
            <div class="form-group">
              <label for="taskAssignee">Primary Assignee / Owner</label>
              <select id="taskAssignee" class="input">
                <option value="me" ${!d||!d?.personnelId&&!d?.assignAll?"selected":""}>Myself (Admin)</option>
                <option value="all" ${d?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${o.personnelList.map(s=>{const p=d?.personnelId?._id===s._id||d?.personnelId===s._id;return`<option value="${s._id}" ${p?"selected":""}>👤 ${x(s.name)} (${x(s.department||s.role||"Member")})</option>`}).join("")}
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
              ${o.personnelList.map(s=>`
                <option value="${s._id}">+ 👤 ${x(s.name)} (${x(s.department||s.role||"Member")})</option>
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
    `,B=Lt(T),w=B.querySelector("#taskForm"),P=B.querySelector("#btnModalClose"),N=B.querySelector("#btnCancelModal"),E=B.querySelector("#btnModalDeleteTask"),j=()=>B.remove();P&&(P.onclick=j),N&&(N.onclick=j),E&&d&&(E.onclick=async()=>{j(),await bt(d._id)});let y=[];d&&Array.isArray(d.coOwners)&&(y=d.coOwners.map(s=>({personnelId:s.personnelId?._id||s.personnelId||null,userId:s.userId?._id||s.userId||null,name:s.name||s.personnelId?.name||"",role:s.role||s.personnelId?.role||"",department:s.department||s.personnelId?.department||""})).filter(s=>s.personnelId||s.name));const D=B.querySelector("#coOwnersSelectedContainer"),J=B.querySelector("#taskCoOwnerSelect"),S=()=>{if(D){if(y.length===0){D.innerHTML='<span style="font-size:11.5px;color:var(--text-4);font-style:italic;">No co-owners added yet</span>';return}D.innerHTML=y.map((s,p)=>`
        <span class="co-owner-chip" style="display:inline-flex;align-items:center;gap:6px;background:rgba(99,102,241,0.12);color:var(--accent);border:1px solid rgba(99,102,241,0.25);border-radius:16px;padding:3px 10px;font-size:12px;font-weight:600;">
          👤 ${x(s.name)}
          <button type="button" class="btn-remove-co" data-idx="${p}" style="background:transparent;border:none;color:var(--accent);cursor:pointer;font-size:14px;line-height:1;padding:0;margin-left:2px;font-weight:bold;" title="Remove co-owner">×</button>
        </span>
      `).join(""),D.querySelectorAll(".btn-remove-co").forEach(s=>{s.onclick=()=>{const p=parseInt(s.dataset.idx,10);y.splice(p,1),S()}})}};S(),J&&(J.onchange=()=>{const s=J.value;if(!s)return;const p=o.personnelList.find(n=>String(n._id)===String(s));p&&(y.some(i=>String(i.personnelId)===String(p._id))||(y.push({personnelId:p._id,name:p.name,role:p.role||"",department:p.department||""}),S())),J.value=""}),w.onsubmit=async s=>{s.preventDefault();const p=B.querySelector("#taskTitle").value.trim(),n=B.querySelector("#taskDesc").value.trim(),i=B.querySelector("#taskDate").value||h,z=B.querySelector("#taskCompletionDate")?.value?.trim()||i||o.selectedDate,C=B.querySelector("#taskPriority").value,V=B.querySelector("#taskStatus").value,ne=(B.querySelector("#taskClientName")?.value||B.querySelector("#taskCategory")?.value||"").trim(),K=ne||"General";if(!p){k("Task title is required",!0);return}if(!r&&(z<f||i<f)){k("Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.",!0);return}const L={title:p,description:n,assignedDate:i,assignedDateStr:i,dateStr:z,completionDate:z,completionDateStr:z,dueDate:z,startTime:"",dueTime:"",priority:C,status:V,category:K,clientName:ne,coOwners:y};if(g){const ie=B.querySelector("#taskAssignee")?.value;ie==="all"?(L.assignAll=!0,L.personnelId="all"):ie==="me"?L.personnelId="me":ie&&(L.personnelId=ie)}const G=B.querySelector("#btnSaveTask");G.disabled=!0,G.textContent="Saving...";try{if(r){const ie=await Yt(`/tasks/${d._id}`,L),Z=o.tasks.findIndex(se=>se._id===d._id);Z!==-1&&(o.tasks[Z]=ie),k("Task updated successfully! ✍️")}else{const ie=await we("/tasks",L);Array.isArray(ie.tasks)?ie.tasks.forEach(Z=>o.tasks.unshift(Z)):o.tasks.unshift(ie),k("Task created successfully! ✨")}j(),O()}catch(ie){k(ie.message,!0),G.disabled=!1,G.textContent=r?"Save Changes":"Create Task"}}}function ut(){let d=[];const a=`
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
              <input type="date" id="importTargetDate" class="input" value="${o.selectedDate<Ne()?Ne():o.selectedDate}" min="${Ne()}">
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
    `,r=Lt(a),f=()=>r.remove();r.querySelector("#btnImportClose").onclick=f,r.querySelector("#btnCancelImport").onclick=f;const h=r.querySelector("#importTextarea"),T=r.querySelector("#importFileInput"),B=r.querySelector("#importDropzone"),w=r.querySelector("#previewListArea"),P=r.querySelector("#previewCountLabel"),N=r.querySelector("#btnConfirmImport"),E=r.querySelector("#importFileInfo");function j(D){if(!D)return[];const J=D.split(/\r?\n/),S=[];for(let s of J)s=s.trim(),s&&(s=s.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),s=s.replace(/^[-*•]\s+/,""),s=s.replace(/^\d+[\.\)]\s+/,""),s=s.trim(),s&&S.push(s));return S}function y(){const D=h.value,J=j(D),S=r.querySelector("#importTargetDate").value,s=A(S),p=new Set(s.map(n=>(n.title||"").trim().toLowerCase()));d=[];for(const n of J){const i=p.has(n.toLowerCase());d.push({title:n,isDuplicate:i})}if(P.textContent=`Preview (${d.length} ${d.length===1?"task":"tasks"} found)`,N.disabled=d.length===0,N.textContent=`Import ${d.length} ${d.length===1?"Task":"Tasks"}`,d.length===0){w.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}w.innerHTML=d.map((n,i)=>`
        <div class="preview-item ${n.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${i+1}.</span>
          <span class="preview-title">${x(n.title)}</span>
          ${n.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}h.oninput=y,B.onclick=()=>T.click(),T.onchange=D=>{const J=D.target.files[0];if(!J)return;E.textContent=`File selected: ${J.name} (${Math.round(J.size/1024)} KB)`;const S=new FileReader;S.onload=s=>{h.value=s.target.result,y()},S.readAsText(J)},B.ondragover=D=>{D.preventDefault(),B.classList.add("dragover")},B.ondragleave=()=>B.classList.remove("dragover"),B.ondrop=D=>{D.preventDefault(),B.classList.remove("dragover");const J=D.dataTransfer.files[0];if(J&&(J.type==="text/plain"||J.name.endsWith(".txt"))){E.textContent=`File dropped: ${J.name}`;const S=new FileReader;S.onload=s=>{h.value=s.target.result,y()},S.readAsText(J)}else k("Please drop a valid .txt plain-text file",!0)},N.onclick=async()=>{if(d.length===0)return;N.disabled=!0,N.textContent="Importing...";const D=r.querySelector("#importTargetDate").value;if(D<Ne()){k("Cannot import tasks for previous dates. Target date must be today or later.",!0),N.disabled=!1,N.textContent=`Import ${d.length} ${d.length===1?"Task":"Tasks"}`;return}const J=r.querySelector("#importPriority").value,S=r.querySelector("#importCategory").value.trim()||"General",s={date:D,tasks:d.map(p=>({title:p.title,priority:J,category:S,status:"Pending"}))};g&&o.selectedPersonnelId!=="all"&&(s.personnelId=o.selectedPersonnelId);try{const p=await we("/tasks/bulk-import",s);Array.isArray(p.tasks)&&p.tasks.forEach(n=>o.tasks.unshift(n)),k(`Imported ${p.importedCount} tasks successfully! (${p.skippedCount} skipped duplicates)`),f(),o.selectedDate=D,O()}catch(p){k(p.message,!0),N.disabled=!1,N.textContent="Retry Import"}}}async function Le(){const d=A(o.selectedDate),a=H(d,Ne()),r=xt(o.selectedDate),f=2,h=800,T=160,B=90,w=74,P=70,N=Math.max(120,d.length*w),E=T+B+N+P,j=document.createElement("canvas");j.width=h*f,j.height=E*f;const y=j.getContext("2d");y.scale(f,f);const D=document.documentElement.getAttribute("data-theme")==="dark",J=D?"#0F172A":"#F8FAFC",S=D?"#1E293B":"#FFFFFF",s=D?"#334155":"#E2E8F0",p=D?"#F8FAFC":"#0F172A",n=D?"#94A3B8":"#475569",i="#4F46E5",$="#10B981",z="#F59E0B";y.fillStyle=J,y.fillRect(0,0,h,E),y.fillStyle=S,Me(y,24,20,h-48,T-30,16),y.fill(),y.strokeStyle=s,y.lineWidth=1,y.stroke(),y.fillStyle=i,y.font="bold 12px Inter, sans-serif",y.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),y.fillStyle=p,y.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',y.fillText(r,44,86),y.fillStyle=n,y.font="13px Inter, sans-serif",y.fillText(`Planned focus list · ${a.completed} of ${a.total} tasks completed (${a.percent}%)`,44,114);const C=T+6;y.fillStyle=S,Me(y,24,C,h-48,B-16,12),y.fill(),y.stroke();const V=[{label:"TOTAL TASKS",val:String(a.total),color:p},{label:"COMPLETED",val:String(a.completed),color:$},{label:"IN PROGRESS",val:String(a.inProgress),color:z},{label:"PENDING",val:String(a.pending),color:n},{label:"PROGRESS",val:`${a.percent}%`,color:i}],ne=(h-48)/V.length;V.forEach((G,ie)=>{const Z=24+ie*ne+20;y.fillStyle=G.color,y.font="bold 20px Inter, sans-serif",y.fillText(G.val,Z,C+36),y.fillStyle=n,y.font="10px Inter, sans-serif",y.fillText(G.label,Z,C+54)});const K=C+B;y.fillStyle=S,Me(y,24,K,h-48,N+10,16),y.fill(),y.stroke(),d.length===0?(y.fillStyle=n,y.font="14px Inter, sans-serif",y.textAlign="center",y.fillText("No scheduled tasks recorded for this date.",h/2,K+60),y.textAlign="left"):d.forEach((G,ie)=>{const Z=K+16+ie*w,se=G.status==="Completed";y.beginPath(),y.arc(48,Z+14,10,0,Math.PI*2),se?(y.fillStyle=$,y.fill(),y.strokeStyle="#FFFFFF",y.lineWidth=2,y.beginPath(),y.moveTo(44,Z+14),y.lineTo(47,Z+17),y.lineTo(52,Z+11),y.stroke()):(y.strokeStyle=s,y.lineWidth=2,y.stroke()),y.fillStyle=se?n:p,y.font=`${se?"normal":"500"} 14px Inter, sans-serif`;const ue=G.title.length>55?G.title.slice(0,52)+"...":G.title;if(y.fillText(ue,70,Z+18),se){const Ie=y.measureText(ue);y.strokeStyle=n,y.lineWidth=1.2,y.beginPath(),y.moveTo(70,Z+14),y.lineTo(70+Ie.width,Z+14),y.stroke()}const be=G.priority||"Medium";let me="#E2E8F0",Q="#334155";be==="Urgent"?(me="#FEE2E2",Q="#DC2626"):be==="High"?(me="#FEF3C7",Q="#D97706"):be==="Low"&&(me="#ECFDF5",Q="#059669"),y.fillStyle=me,Me(y,h-150,Z+4,60,20,10),y.fill(),y.fillStyle=Q,y.font="bold 10px Inter, sans-serif",y.fillText(be,h-138,Z+18);const De=G.createdByName||G.createdBy?.name||(G.createdBy?.email?G.createdBy.email.split("@")[0]:"")||G.personnelId?.name||G.userId?.name||"Member",Ce=G.completionDateStr||G.dateStr||"",pe=[];pe.push(`✍️ Added by: ${De}`),Ce&&pe.push(`📅 Due: ${Pe(Ce)}`),G.dueTime&&pe.push(`🕒 ${G.dueTime}`),G.category&&G.category!=="General"&&pe.push(`#${G.category}`);const ve=pe.join("   ·   ");y.fillStyle=n,y.font="11px Inter, sans-serif",y.fillText(ve,70,Z+36),ie<d.length-1&&(y.strokeStyle=s,y.lineWidth=.6,y.beginPath(),y.moveTo(40,Z+54),y.lineTo(h-40,Z+54),y.stroke())});const L=E-35;y.fillStyle=n,y.font="11px Inter, sans-serif",y.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,L);try{const G=j.toDataURL("image/png"),ie=document.createElement("a");ie.href=G,ie.download=`ci360-daily-planner-${o.selectedDate}.png`,document.body.appendChild(ie),ie.click(),ie.remove(),k("Daily Planner image exported! 🖼️")}catch(G){k("Failed to export image: "+G.message,!0)}}function Me(d,a,r,f,h,T){d.beginPath(),d.moveTo(a+T,r),d.lineTo(a+f-T,r),d.quadraticCurveTo(a+f,r,a+f,r+T),d.lineTo(a+f,r+h-T),d.quadraticCurveTo(a+f,r+h,a+f-T,r+h),d.lineTo(a+T,r+h),d.quadraticCurveTo(a,r+h,a,r+h-T),d.lineTo(a,r+T),d.quadraticCurveTo(a,r,a+T,r),d.closePath()}function de(d={}){const a=Mt(o.selectedDate,c.weekStartsOn),r=xt(a[0]),f=xt(a[6]),h=Ne();let T=o.tasks.filter(S=>{if(S.isDeleted===!0)return!1;const s=S.completionDateStr||S.dateStr||(S.dueDate?new Date(S.dueDate).toISOString().slice(0,10):""),p=S.assignedDateStr||(S.assignedDate?new Date(S.assignedDate).toISOString().slice(0,10):"")||s;return d.scope==="today"?s===h||p===h:d.scope==="all"?!0:S.status==="In Progress"&&p&&s?a.some(n=>n>=p&&n<=s):a.includes(s)||a.includes(p)});d.personnelId&&d.personnelId!=="all"&&(T=T.filter(S=>{const s=String(S.personnelId?._id||S.personnelId||""),p=Array.isArray(S.coOwners)&&S.coOwners.some(n=>String(n.personnelId?._id||n.personnelId||n.userId?._id||n.userId||"")===String(d.personnelId));return s===String(d.personnelId)||p})),d.status&&d.status!=="all"&&(T=T.filter(S=>S.status===d.status));const B=T.length,w=T.filter(S=>S.status==="Completed").length,P=T.filter(S=>S.status==="In Progress").length,N=B>0?Math.round(w/B*100):0,E=window.open("","_blank");if(!E){k("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const j=d.title||(d.isAdminReport?"CI360 Admin Detailed Executive Report":"Weekly Productivity Report"),y=d.scope==="today"?`Date: ${xt(h)}`:d.scope==="all"?"All Active & Historical Tasks":`${r} – ${f}`;let D="";if(d.personnelId&&d.personnelId!=="all"){const S=o.personnelList.find(s=>String(s._id)===String(d.personnelId));S&&(D=`👤 Employee: ${S.name} (${S.department||S.role||"Member"})`)}const J=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${x(j)} — ${y}</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.4; padding: 12px; margin: 0; }
          .header { border-bottom: 2.5px solid #4f46e5; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
          .brand { font-size: 11px; font-weight: 800; color: #4f46e5; letter-spacing: 0.6px; text-transform: uppercase; }
          h1 { margin: 4px 0 2px; font-size: 22px; color: #0f172a; }
          .period { font-size: 13px; color: #475569; font-weight: 500; }
          .filter-tag { display: inline-block; font-size: 11px; color: #4338ca; background: #e0e7ff; padding: 2px 8px; border-radius: 4px; font-weight: 600; margin-left: 8px; }
          
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
          .co-owner-sub { font-size: 10px; color: #6366f1; font-weight: 600; display: block; margin-top: 2px; }
          .desc-text { font-size: 10.5px; color: #475569; white-space: pre-wrap; line-height: 1.35; max-width: 280px; word-break: break-word; }
          
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; }
          .badge-urgent { background: #fee2e2; color: #b91c1c; }
          .badge-high { background: #fef3c7; color: #b45309; }
          .badge-med { background: #e0e7ff; color: #4338ca; }
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
            <h1>${x(j)}</h1>
            <div class="period">
              ${y}
              ${D?`<span class="filter-tag" style="background:#dbeafe;color:#1e40af;font-weight:700;">${x(D)}</span>`:""}
              ${d.filterSummary?`<span class="filter-tag">${x(d.filterSummary)}</span>`:""}
            </div>
          </div>
          <div style="text-align:right" class="no-print">
            <button onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:13px;box-shadow:0 2px 4px rgba(79,70,229,0.3);">🖨️ Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${B}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${w}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">In Progress</div>
            <div class="kpi-num" style="color:#f59e0b">${P}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${N}%</div>
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
            ${T.length===0?`
              <tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;font-weight:600">No scheduled tasks match the selected criteria.</td></tr>
            `:T.map(S=>{const s=S.completionDateStr||S.dateStr||(S.dueDate?new Date(S.dueDate).toISOString().slice(0,10):"—"),p=S.assignedDateStr||(S.assignedDate?new Date(S.assignedDate).toISOString().slice(0,10):""),n=S.status==="In Progress"&&p&&s&&p!==s?`${Pe(p)} ➔ ${Pe(s)}`:Pe(s),i=S.jobId?.preferredPersonName||S.jobId?.assignments&&S.jobId.assignments[0]?.personId?.name||S.personnelId?.name||S.userId?.name||S.createdByName||"—",$=S.clientId?.name||S.jobId?.clientId?.name||S.clientId?.company||""||"—",z=S.description?x(S.description):'<span style="color:#cbd5e1">—</span>',C=Array.isArray(S.coOwners)&&S.coOwners.length>0?S.coOwners.map(L=>L.name).filter(Boolean).join(", "):"",V=(S.priority||"medium").toLowerCase(),ne=V==="urgent"?"badge-urgent":V==="high"?"badge-high":V==="low"?"badge-low":"badge-med",K=(S.status||"pending").toLowerCase().replace(/\s+/g,"-");return`
                <tr>
                  <td><strong>${n}</strong></td>
                  <td><span class="client-tag">${x($)}</span></td>
                  <td>
                    <span class="owner-tag">${x(i)}</span>
                    ${C?`<span class="co-owner-sub">👥 Co: ${x(C)}</span>`:""}
                  </td>
                  <td><strong>${x(S.title)}</strong></td>
                  <td><div class="desc-text">${z}</div></td>
                  <td><span class="badge ${ne}">${x(S.priority||"Medium")}</span></td>
                  <td><span class="status-tag status-${K}">${x(S.status||"Pending")}</span></td>
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
    `;E.document.write(J),E.document.close(),k("Report generated for printing & PDF download! 📄")}function st(){const d=Ne(),a=Mt(o.selectedDate,c.weekStartsOn),r=Pe(a[0]),f=Pe(a[6]),h=`
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
              <option value="today">Today Only (${Pe(d)})</option>
              <option value="all">All Available Tasks</option>
            </select>
          </div>

          <!-- Employee Filter -->
          <div class="form-group">
            <label for="admRepPersonnel">Filter by Employee / Person</label>
            <select id="admRepPersonnel" class="input">
              <option value="all" ${!o.reportPersonnelId||o.reportPersonnelId==="all"?"selected":""}>👥 All Team Members</option>
              ${o.personnelList.map(y=>`
                <option value="${y._id}" ${String(y._id)===String(o.reportPersonnelId)?"selected":""}>👤 ${x(y.name)} (${x(y.department||y.role||"Member")})</option>
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
    `,T=Lt(h),B=T.querySelector("#btnAdminRepClose"),w=T.querySelector("#btnAdminRepCancel"),P=T.querySelector("#btnAdminRepPdf"),N=T.querySelector("#btnAdminRepCsv"),E=()=>T.remove();B&&(B.onclick=E),w&&(w.onclick=E);const j=()=>{const y=T.querySelector("#admRepScope")?.value||"week",D=T.querySelector("#admRepPersonnel")?.value||"all",J=T.querySelector("#admRepStatus")?.value||"all";let S="";if(D!=="all"){const s=o.personnelList.find(p=>String(p._id)===String(D));s&&(S+=`Person: ${s.name} · `)}return J!=="all"&&(S+=`Status: ${J}`),{scope:y,personnelId:D,status:J,filterSummary:S.replace(/\s*·\s*$/,"")}};P&&(P.onclick=()=>{const y=j();E(),de({...y,isAdminReport:!0,title:"CI360 Admin Detailed Executive Task Report"})}),N&&(N.onclick=()=>{const y=j();E(),ye(y)})}function ye(d={}){const a=Mt(o.selectedDate,c.weekStartsOn),r=Ne();let f=o.tasks.filter(E=>{if(E.isDeleted===!0)return!1;const j=E.completionDateStr||E.dateStr||(E.dueDate?new Date(E.dueDate).toISOString().slice(0,10):""),y=E.assignedDateStr||(E.assignedDate?new Date(E.assignedDate).toISOString().slice(0,10):"")||j;return d.scope==="today"?j===r||y===r:d.scope==="all"?!0:E.status==="In Progress"&&y&&j?a.some(D=>D>=y&&D<=j):a.includes(j)||a.includes(y)});d.personnelId&&d.personnelId!=="all"&&(f=f.filter(E=>{const j=String(E.personnelId?._id||E.personnelId||""),y=Array.isArray(E.coOwners)&&E.coOwners.some(D=>String(D.personnelId?._id||D.personnelId||"")===String(d.personnelId));return j===String(d.personnelId)||y})),d.status&&d.status!=="all"&&(f=f.filter(E=>E.status===d.status));const h=["Date","Client Name","Job Owner","Primary Assignee","Co-Owners","Task Title","Description","Priority","Category","Status","Created By"],T=f.map(E=>{const j=E.completionDateStr||E.dateStr||(E.dueDate?new Date(E.dueDate).toISOString().slice(0,10):""),y=E.jobId?.preferredPersonName||E.jobId?.assignments&&E.jobId.assignments[0]?.personId?.name||E.personnelId?.name||E.userId?.name||E.createdByName||"",D=E.clientId?.name||E.jobId?.clientId?.name||E.clientId?.company||"",J=E.personnelId?.name||E.userId?.name||"",S=Array.isArray(E.coOwners)?E.coOwners.map(V=>V.name).filter(Boolean).join("; "):"",s=E.title||"",p=E.description||"",n=E.priority||"Medium",i=E.category||"General",$=E.status||"Pending",z=E.createdByName||E.createdBy?.name||"",C=V=>`"${String(V||"").replace(/"/g,'""').replace(/\r?\n/g," ")}"`;return[C(j),C(D),C(y),C(J),C(S),C(s),C(p),C(n),C(i),C($),C(z)].join(",")}),B="\uFEFF"+[h.join(","),...T].join(`\r
`),w=new Blob([B],{type:"text/csv;charset=utf-8;"}),P=URL.createObjectURL(w),N=document.createElement("a");N.href=P,N.download=`ci360-admin-report-${r}.csv`,document.body.appendChild(N),N.click(),document.body.removeChild(N),URL.revokeObjectURL(P),k("Admin CSV report downloaded! 📊")}function ct(){const a=Lt(`
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
    `),r=()=>a.remove();a.querySelector("#btnBackupClose").onclick=r;const f=a.querySelector("#btnDownloadBackupJson");f.onclick=async()=>{f.disabled=!0,f.textContent="Generating backup...";try{const N=await Ee("/tasks/backup"),E=new Blob([JSON.stringify(N,null,2)],{type:"application/json"}),j=URL.createObjectURL(E),y=document.createElement("a");y.href=j,y.download=`ci360-planner-backup-${Ne()}.json`,document.body.appendChild(y),y.click(),y.remove(),k("Planner backup downloaded successfully! 💾")}catch(N){k("Backup export failed: "+N.message,!0)}finally{f.disabled=!1,f.textContent="Download JSON Backup"}};const h=a.querySelector("#restoreFileInput"),T=a.querySelector("#restorePreviewArea"),B=a.querySelector("#restoreCountText"),w=a.querySelector("#btnExecuteRestore");let P=null;h.onchange=N=>{const E=N.target.files[0];if(!E)return;const j=new FileReader;j.onload=y=>{try{const D=JSON.parse(y.target.result),J=Array.isArray(D.tasks)?D.tasks:Array.isArray(D)?D:null;if(!J||J.length===0){k("Invalid backup file: No tasks found",!0);return}P=J,T.style.display="block",B.textContent=`Valid backup: ${J.length} tasks ready to restore.`,w.disabled=!1}catch(D){k("Error parsing JSON backup file: "+D.message,!0),T.style.display="none",w.disabled=!0}},j.readAsText(E)},w.onclick=async()=>{if(!P||P.length===0)return;w.disabled=!0,w.textContent="Restoring...";const N=a.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const E=await we("/tasks/restore",{tasks:P,mode:N});k(`Restored ${E.restoredCount} tasks! (${E.skippedCount} skipped) ✨`),r(),await R()}catch(E){k("Restore failed: "+E.message,!0),w.disabled=!1,w.textContent="Retry Restore"}}}function lt(){const d=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${x(c.displayName||"Daily Planner")}">
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
              <input type="text" id="setTimezone" class="input" value="${x(c.timezone||"Asia/Kolkata")}" readonly>
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
    `,a=Lt(d),r=()=>a.remove();a.querySelector("#btnSettingsClose").onclick=r,a.querySelector("#btnCancelSettings").onclick=r;const f=a.querySelector("#btnPlannerTestNotif");f&&(f.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await requestNotificationPermission()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):k("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true");const h=a.querySelector("#setNotifEnabled");h&&(h.checked=!0);const T=a.querySelector("#plannerNotifStatusLabel");T&&(T.textContent="🟢 Active on this laptop"),await triggerSystemNotification({title:"CI360 Planner Alert 🔔",message:"Laptop & browser notifications are active and ready!",id:"ci360-planner-test-"+Date.now()}),k("Test notification sent to your laptop/browser! 🔔")}),a.querySelector("#settingsForm").onsubmit=h=>{h.preventDefault(),c.displayName=a.querySelector("#setDisplayName").value.trim()||"Daily Planner",c.weekStartsOn=Number(a.querySelector("#setWeekStart").value),c.defaultPriority=a.querySelector("#setDefaultPriority").value,c.density=a.querySelector("#setDensity").value,c.soundEnabled=a.querySelector("#setSound").checked;const T=a.querySelector("#setNotifEnabled")?.checked;localStorage.setItem("ci360_notif_enabled",T?"true":"false"),T&&"Notification"in window&&Notification.permission==="default"&&requestNotificationPermission(),Da(c),k("Planner preferences saved! ⚙️"),r(),O()}}}function Ta(){if(document.getElementById("ci360-planner-styles"))return;const l=document.createElement("style");l.id="ci360-planner-styles",l.textContent=`
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

    /* Header */
    .ci360-planner-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .ci360-planner-title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .ci360-planner-eyebrow {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .ci360-planner-tag-badge {
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 2px 8px;
      border-radius: var(--r-full);
      background: var(--brand-50);
      color: var(--brand-600);
    }
    [data-theme="dark"] .ci360-planner-tag-badge {
      background: rgba(99, 102, 241, 0.2);
      color: var(--brand-400);
    }
    .ci360-planner-date-indicator {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-3);
    }
    .ci360-planner-heading {
      font-size: 26px;
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
      padding: 6px 12px;
      border-radius: 6px;
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
      background: var(--accent);
      color: #FFFFFF;
      box-shadow: 0 1px 3px rgba(79, 70, 229, 0.3);
    }

    .ci360-btn-primary {
      background: var(--accent);
      color: #FFFFFF;
      border: none;
      padding: 8px 16px;
      border-radius: var(--r-md);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 6px rgba(79, 70, 229, 0.25);
      transition: all var(--t-fast);
    }
    .ci360-btn-primary:hover {
      filter: brightness(1.08);
      transform: translateY(-1px);
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
      padding: 6px 12px;
      border-radius: var(--r-md);
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
      background: var(--brand-50);
      color: var(--brand-600);
      border-color: var(--brand-200);
    }
    [data-theme="dark"] .ci360-today-btn.is-current {
      background: rgba(99, 102, 241, 0.15);
      color: var(--brand-400);
      border-color: rgba(99, 102, 241, 0.3);
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
      border-radius: var(--r-lg);
      padding: 18px 24px;
      margin-bottom: 24px;
      box-shadow: var(--shadow-sm);
    }
    .ci360-summary-main {
      display: flex;
      align-items: center;
      gap: 28px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }
    .ci360-ring-stat {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ci360-circular-progress {
      position: relative;
      width: 72px;
      height: 72px;
    }
    .ci360-circular-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    .ci360-circular-svg .circle-bg {
      fill: none;
      stroke: var(--border-xs);
      stroke-width: 3.5;
    }
    .ci360-circular-svg .circle-fill {
      fill: none;
      stroke: var(--accent);
      stroke-width: 3.5;
      stroke-linecap: round;
      transition: stroke-dasharray 0.4s ease;
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
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-4);
      margin-top: 2px;
    }

    .ci360-summary-kpis {
      display: flex;
      align-items: center;
      gap: 16px;
      flex: 1;
      flex-wrap: wrap;
    }
    .kpi-box {
      display: flex;
      flex-direction: column;
      background: var(--bg-app);
      padding: 10px 16px;
      border-radius: var(--r-md);
      min-width: 100px;
      border: 1px solid var(--border-xs);
    }
    .kpi-box .kpi-num {
      font-size: 20px;
      font-weight: 800;
      color: var(--text-1);
      line-height: 1.1;
    }
    .kpi-box .kpi-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-3);
      margin-top: 2px;
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
      height: 6px;
      background: var(--border-xs);
      border-radius: var(--r-full);
      overflow: hidden;
    }
    .ci360-linear-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--brand-500), var(--green-500));
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
      font-weight: 700;
      color: var(--text-1);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-focus-title .accent-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent);
      display: inline-block;
    }
    .ci360-task-count-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: var(--r-full);
      background: var(--bg-hover);
      color: var(--text-3);
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
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      padding: 3px;
    }
    .filter-pill {
      background: transparent;
      border: none;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
    }
    .filter-pill:hover {
      color: var(--text-1);
    }
    .filter-pill.active {
      background: var(--bg-hover);
      color: var(--accent);
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
      background: var(--accent);
      color: #FFFFFF;
      border: none;
      border-radius: var(--r-sm);
      padding: 6px 14px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--t-fast);
    }
    .ci360-quick-add-btn:hover {
      filter: brightness(1.1);
    }

    /* Task List & Cards */
    .ci360-task-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .ci360-task-card {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      padding: 14px 16px;
      box-shadow: var(--shadow-xs);
      transition: all var(--t-fast);
    }
    .ci360-task-card:hover {
      box-shadow: var(--shadow-sm);
      border-color: var(--border-md);
      transform: translateY(-1px);
    }
    .ci360-task-card.is-completed {
      background: var(--bg-elevated);
      opacity: 0.75;
    }
    .ci360-task-card.is-overdue {
      border-left: 3px solid var(--red-500);
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
      background: rgba(99, 102, 241, 0.12);
      color: var(--brand-600);
      font-weight: 600;
      border: 1px solid rgba(99, 102, 241, 0.25);
    }
    [data-theme="dark"] .ci360-badge.creator-badge {
      background: rgba(99, 102, 241, 0.2);
      color: var(--brand-400);
      border-color: rgba(99, 102, 241, 0.35);
    }
    .ci360-badge.overdue-badge { background: rgba(239, 68, 68, 0.12); color: var(--red-600); }
    .ci360-badge.personnel-badge { background: var(--brand-50); color: var(--brand-600); }
    [data-theme="dark"] .ci360-badge.personnel-badge { background: rgba(99, 102, 241, 0.2); color: var(--brand-400); }

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
      background: rgba(99, 102, 241, 0.1);
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
      background: rgba(99, 102, 241, 0.15);
      color: var(--brand-500);
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
      background: #4F46E5;
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
      background: #EEF2FF;
      color: #4F46E5;
      border-color: #C7D2FE;
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
      background: #EEF2FF;
      color: #4F46E5;
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
      background: #EEF2FF;
      color: #4F46E5;
      border: 1px solid #C7D2FE;
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
      border-color: #4F46E5;
      color: #4F46E5;
      background: #EEF2FF;
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
  `,document.head.appendChild(l)}function Pa(l){return l!==null?{comment:l,variations:[]}:{variations:[]}}function Fa(l,t,e,u,v){const g={move:l,variations:v};return t&&(g.suffix=t),e&&(g.nag=e),u!==null&&(g.comment=u),g}function La(...l){const[t,...e]=l;let u=t;for(const v of e)v!==null&&(u.variations=[v,...v.variations],v.variations=[],u=v);return t}function Ma(l,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const u=e.variations[0];if(!u){e.comment=t.marker.comment;break}e=u}}return{headers:l,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function qa(l,t){function e(){this.constructor=l}e.prototype=t.prototype,l.prototype=new e}function At(l,t,e,u){var v=Error.call(this,l);return Object.setPrototypeOf&&Object.setPrototypeOf(v,At.prototype),v.expected=t,v.found=e,v.location=u,v.name="SyntaxError",v}qa(At,Error);function aa(l,t,e){return e=e||" ",l.length>t?l:(t-=l.length,e+=e.repeat(t),l+e.slice(0,t))}At.prototype.format=function(l){var t="Error: "+this.message;if(this.location){var e=null,u;for(u=0;u<l.length;u++)if(l[u].source===this.location.source){e=l[u].text.split(/\r\n|\n|\r/g);break}var v=this.location.start,g=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(v):v,c=this.location.source+":"+g.line+":"+g.column;if(e){var o=this.location.end,R=aa("",g.line.toString().length," "),Y=e[v.line-1],A=v.line===o.line?o.column:Y.length+1,F=A-v.column||1;t+=`
 --> `+c+`
`+R+` |
`+g.line+" | "+Y+`
`+R+" | "+aa("",v.column-1," ")+aa("",F,"^")}else t+=`
 at `+c}return t};At.buildMessage=function(l,t){var e={literal:function(Y){return'"'+v(Y.text)+'"'},class:function(Y){var A=Y.parts.map(function(F){return Array.isArray(F)?g(F[0])+"-"+g(F[1]):g(F)});return"["+(Y.inverted?"^":"")+A.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(Y){return Y.description}};function u(Y){return Y.charCodeAt(0).toString(16).toUpperCase()}function v(Y){return Y.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(A){return"\\x0"+u(A)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(A){return"\\x"+u(A)})}function g(Y){return Y.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(A){return"\\x0"+u(A)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(A){return"\\x"+u(A)})}function c(Y){return e[Y.type](Y)}function o(Y){var A=Y.map(c),F,H;if(A.sort(),A.length>0){for(F=1,H=1;F<A.length;F++)A[F-1]!==A[F]&&(A[H]=A[F],H++);A.length=H}switch(A.length){case 1:return A[0];case 2:return A[0]+" or "+A[1];default:return A.slice(0,-1).join(", ")+", or "+A[A.length-1]}}function R(Y){return Y?'"'+v(Y)+'"':"end of input"}return"Expected "+o(l)+" but "+R(t)+" found."};function za(l,t){t=t!==void 0?t:{};var e={},u=t.grammarSource,v={pgn:Et},g=Et,c="[",o='"',R="]",Y=".",A="O-O-O",F="O-O",H="0-0-0",O="0-0",ge="$",$e="{",We="}",et=";",dt="(",$t=")",ot="1-0",Ae="0-1",rt="1/2-1/2",bt="*",Fe=/^[a-zA-Z]/,ut=/^[^"]/,Le=/^[0-9]/,Me=/^[.]/,de=/^[a-zA-Z1-8\-=]/,st=/^[+#]/,ye=/^[!?]/,ct=/^[^}]/,lt=/^[^\r\n]/,d=/^[ \t\r\n]/,a=Se("tag pair"),r=xe("[",!1),f=xe('"',!1),h=xe("]",!1),T=Se("tag name"),B=Be([["a","z"],["A","Z"]],!1,!1),w=Se("tag value"),P=Be(['"'],!0,!1),N=Se("move number"),E=Be([["0","9"]],!1,!1),j=xe(".",!1),y=Be(["."],!1,!1),D=Se("standard algebraic notation"),J=xe("O-O-O",!1),S=xe("O-O",!1),s=xe("0-0-0",!1),p=xe("0-0",!1),n=Be([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),i=Be(["+","#"],!1,!1),$=Se("suffix annotation"),z=Be(["!","?"],!1,!1),C=Se("NAG"),V=xe("$",!1),ne=Se("brace comment"),K=xe("{",!1),L=Be(["}"],!0,!1),G=xe("}",!1),ie=Se("rest of line comment"),Z=xe(";",!1),se=Be(["\r",`
`],!0,!1),ue=Se("variation"),be=xe("(",!1),me=xe(")",!1),Q=Se("game termination marker"),De=xe("1-0",!1),Ce=xe("0-1",!1),pe=xe("1/2-1/2",!1),ve=xe("*",!1),Ie=Se("whitespace"),ze=Be([" ","	","\r",`
`],!1,!1),Ke=function(b,I){return Ma(b,I)},He=function(b){return Object.fromEntries(b)},Oe=function(b,I){return[b,I]},qe=function(b,I){return{root:b,marker:I}},oe=function(b,I){return La(Pa(b),...I.flat())},_e=function(b,I,_,ee,te){return Fa(b,I,_,ee,te)},Re=function(b){return b},Ve=function(b){return b.replace(/[\r\n]+/g," ")},ke=function(b){return b.trim()},M=function(b){return b},W=function(b,I){return{result:b,comment:I}},m=t.peg$currPos|0,fe=[{line:1,column:1}],he=m,at=t.peg$maxFailExpected||[],U=t.peg$silentFails|0,Te;if(t.startRule){if(!(t.startRule in v))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');g=v[t.startRule]}function xe(b,I){return{type:"literal",text:b,ignoreCase:I}}function Be(b,I,_){return{type:"class",parts:b,inverted:I,ignoreCase:_}}function Ye(){return{type:"end"}}function Se(b){return{type:"other",description:b}}function nt(b){var I=fe[b],_;if(I)return I;if(b>=fe.length)_=fe.length-1;else for(_=b;!fe[--_];);for(I=fe[_],I={line:I.line,column:I.column};_<b;)l.charCodeAt(_)===10?(I.line++,I.column=1):I.column++,_++;return fe[b]=I,I}function Dt(b,I,_){var ee=nt(b),te=nt(I),ce={source:u,start:{offset:b,line:ee.line,column:ee.column},end:{offset:I,line:te.line,column:te.column}};return ce}function ae(b){m<he||(m>he&&(he=m,at=[]),at.push(b))}function Nt(b,I,_){return new At(At.buildMessage(b,I),b,I,_)}function Et(){var b,I,_;return b=m,I=jt(),_=Ot(),b=Ke(I,_),b}function jt(){var b,I,_;for(b=m,I=[],_=Tt();_!==e;)I.push(_),_=Tt();return _=X(),b=He(I),b}function Tt(){var b,I,_,ee,te,ce,it;return U++,b=m,X(),l.charCodeAt(m)===91?(I=c,m++):(I=e,U===0&&ae(r)),I!==e?(X(),_=Zt(),_!==e?(X(),l.charCodeAt(m)===34?(ee=o,m++):(ee=e,U===0&&ae(f)),ee!==e?(te=St(),l.charCodeAt(m)===34?(ce=o,m++):(ce=e,U===0&&ae(f)),ce!==e?(X(),l.charCodeAt(m)===93?(it=R,m++):(it=e,U===0&&ae(h)),it!==e?b=Oe(_,te):(m=b,b=e)):(m=b,b=e)):(m=b,b=e)):(m=b,b=e)):(m=b,b=e),U--,b===e&&U===0&&ae(a),b}function Zt(){var b,I,_;if(U++,b=m,I=[],_=l.charAt(m),Fe.test(_)?m++:(_=e,U===0&&ae(B)),_!==e)for(;_!==e;)I.push(_),_=l.charAt(m),Fe.test(_)?m++:(_=e,U===0&&ae(B));else I=e;return I!==e?b=l.substring(b,m):b=I,U--,b===e&&(I=e,U===0&&ae(T)),b}function St(){var b,I,_;for(U++,b=m,I=[],_=l.charAt(m),ut.test(_)?m++:(_=e,U===0&&ae(P));_!==e;)I.push(_),_=l.charAt(m),ut.test(_)?m++:(_=e,U===0&&ae(P));return b=l.substring(b,m),U--,I=e,U===0&&ae(w),b}function Ot(){var b,I,_;return b=m,I=Pt(),X(),_=q(),_===e&&(_=null),X(),b=qe(I,_),b}function Pt(){var b,I,_,ee;for(b=m,I=gt(),I===e&&(I=null),_=[],ee=Ut();ee!==e;)_.push(ee),ee=Ut();return b=oe(I,_),b}function Ut(){var b,I,_,ee,te,ce,it,_t;if(b=m,X(),ea(),X(),I=Ht(),I!==e){for(_=Ct(),_===e&&(_=null),ee=[],te=Gt();te!==e;)ee.push(te),te=Gt();for(te=X(),ce=gt(),ce===e&&(ce=null),it=[],_t=Ft();_t!==e;)it.push(_t),_t=Ft();b=_e(I,_,ee,ce,it)}else m=b,b=e;return b}function ea(){var b,I,_,ee,te,ce;for(U++,b=m,I=[],_=l.charAt(m),Le.test(_)?m++:(_=e,U===0&&ae(E));_!==e;)I.push(_),_=l.charAt(m),Le.test(_)?m++:(_=e,U===0&&ae(E));if(l.charCodeAt(m)===46?(_=Y,m++):(_=e,U===0&&ae(j)),_!==e){for(ee=X(),te=[],ce=l.charAt(m),Me.test(ce)?m++:(ce=e,U===0&&ae(y));ce!==e;)te.push(ce),ce=l.charAt(m),Me.test(ce)?m++:(ce=e,U===0&&ae(y));I=[I,_,ee,te],b=I}else m=b,b=e;return U--,b===e&&(I=e,U===0&&ae(N)),b}function Ht(){var b,I,_,ee,te,ce;if(U++,b=m,I=m,l.substr(m,5)===A?(_=A,m+=5):(_=e,U===0&&ae(J)),_===e&&(l.substr(m,3)===F?(_=F,m+=3):(_=e,U===0&&ae(S)),_===e&&(l.substr(m,5)===H?(_=H,m+=5):(_=e,U===0&&ae(s)),_===e&&(l.substr(m,3)===O?(_=O,m+=3):(_=e,U===0&&ae(p)),_===e))))if(_=m,ee=l.charAt(m),Fe.test(ee)?m++:(ee=e,U===0&&ae(B)),ee!==e){if(te=[],ce=l.charAt(m),de.test(ce)?m++:(ce=e,U===0&&ae(n)),ce!==e)for(;ce!==e;)te.push(ce),ce=l.charAt(m),de.test(ce)?m++:(ce=e,U===0&&ae(n));else te=e;te!==e?(ee=[ee,te],_=ee):(m=_,_=e)}else m=_,_=e;return _!==e?(ee=l.charAt(m),st.test(ee)?m++:(ee=e,U===0&&ae(i)),ee===e&&(ee=null),_=[_,ee],I=_):(m=I,I=e),I!==e?b=l.substring(b,m):b=I,U--,b===e&&(I=e,U===0&&ae(D)),b}function Ct(){var b,I,_;for(U++,b=m,I=[],_=l.charAt(m),ye.test(_)?m++:(_=e,U===0&&ae(z));_!==e;)I.push(_),I.length>=2?_=e:(_=l.charAt(m),ye.test(_)?m++:(_=e,U===0&&ae(z)));return I.length<1?(m=b,b=e):b=I,U--,b===e&&(I=e,U===0&&ae($)),b}function Gt(){var b,I,_,ee,te;if(U++,b=m,X(),l.charCodeAt(m)===36?(I=ge,m++):(I=e,U===0&&ae(V)),I!==e){if(_=m,ee=[],te=l.charAt(m),Le.test(te)?m++:(te=e,U===0&&ae(E)),te!==e)for(;te!==e;)ee.push(te),te=l.charAt(m),Le.test(te)?m++:(te=e,U===0&&ae(E));else ee=e;ee!==e?_=l.substring(_,m):_=ee,_!==e?b=Re(_):(m=b,b=e)}else m=b,b=e;return U--,b===e&&U===0&&ae(C),b}function gt(){var b;return b=It(),b===e&&(b=ua()),b}function It(){var b,I,_,ee,te;if(U++,b=m,l.charCodeAt(m)===123?(I=$e,m++):(I=e,U===0&&ae(K)),I!==e){for(_=m,ee=[],te=l.charAt(m),ct.test(te)?m++:(te=e,U===0&&ae(L));te!==e;)ee.push(te),te=l.charAt(m),ct.test(te)?m++:(te=e,U===0&&ae(L));_=l.substring(_,m),l.charCodeAt(m)===125?(ee=We,m++):(ee=e,U===0&&ae(G)),ee!==e?b=Ve(_):(m=b,b=e)}else m=b,b=e;return U--,b===e&&(I=e,U===0&&ae(ne)),b}function ua(){var b,I,_,ee,te;if(U++,b=m,l.charCodeAt(m)===59?(I=et,m++):(I=e,U===0&&ae(Z)),I!==e){for(_=m,ee=[],te=l.charAt(m),lt.test(te)?m++:(te=e,U===0&&ae(se));te!==e;)ee.push(te),te=l.charAt(m),lt.test(te)?m++:(te=e,U===0&&ae(se));_=l.substring(_,m),b=ke(_)}else m=b,b=e;return U--,b===e&&(I=e,U===0&&ae(ie)),b}function Ft(){var b,I,_,ee;return U++,b=m,X(),l.charCodeAt(m)===40?(I=dt,m++):(I=e,U===0&&ae(be)),I!==e?(_=Pt(),_!==e?(X(),l.charCodeAt(m)===41?(ee=$t,m++):(ee=e,U===0&&ae(me)),ee!==e?b=M(_):(m=b,b=e)):(m=b,b=e)):(m=b,b=e),U--,b===e&&U===0&&ae(ue),b}function q(){var b,I,_;return U++,b=m,l.substr(m,3)===ot?(I=ot,m+=3):(I=e,U===0&&ae(De)),I===e&&(l.substr(m,3)===Ae?(I=Ae,m+=3):(I=e,U===0&&ae(Ce)),I===e&&(l.substr(m,7)===rt?(I=rt,m+=7):(I=e,U===0&&ae(pe)),I===e&&(l.charCodeAt(m)===42?(I=bt,m++):(I=e,U===0&&ae(ve))))),I!==e?(X(),_=gt(),_===e&&(_=null),b=W(I,_)):(m=b,b=e),U--,b===e&&(I=e,U===0&&ae(Q)),b}function X(){var b,I;for(U++,b=[],I=l.charAt(m),d.test(I)?m++:(I=e,U===0&&ae(ze));I!==e;)b.push(I),I=l.charAt(m),d.test(I)?m++:(I=e,U===0&&ae(ze));return U--,I=e,U===0&&ae(Ie),b}if(Te=g(),t.peg$library)return{peg$result:Te,peg$currPos:m,peg$FAILED:e,peg$maxFailExpected:at,peg$maxFailPos:he};if(Te!==e&&m===l.length)return Te;throw Te!==e&&m<l.length&&ae(Ye()),Nt(at,he<l.length?l.charAt(he):null,he<l.length?Dt(he,he+1):Dt(he,he))}/**
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
 */const Jt=0xffffffffffffffffn;function na(l,t){return(l<<t|l>>64n-t)&0xffffffffffffffffn}function ha(l,t){return l*t&Jt}function Ra(l){return function(){let t=BigInt(l&Jt),e=BigInt(l>>64n&Jt);const u=ha(na(ha(t,5n),7n),9n);return e^=t,t=(na(t,24n)^e^e<<16n)&Jt,e=na(e,37n),l=e<<64n|t,u}}const Xt=Ra(0xa187eb39cdcaed8f31c4b365b102e01en),Ba=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Xt()))),Na=Array.from({length:8},()=>Xt()),ja=Array.from({length:16},()=>Xt()),ia=Xt(),Qe="w",tt="b",je="p",ca="n",Qt="b",Rt="r",ht="q",Ue="k",oa="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Kt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:u,piece:v,from:g,to:c,flags:o,captured:R,promotion:Y}=e,A=Ge(g),F=Ge(c);this.color=u,this.piece=v,this.from=A,this.to=F,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=A+F,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const H in le)le[H]&o&&(this.flags+=yt[H]);R&&(this.captured=R),Y&&(this.promotion=Y,this.lan+=Y)}isCapture(){return this.flags.indexOf(yt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(yt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(yt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(yt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(yt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(yt.BIG_PAWN)>-1}}const Je=-1,yt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},le={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},pa={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Oa={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Ua={...pa,...Oa},re={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},ra={b:[16,32,17,15],w:[-16,-32,-17,-15]},va={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ha=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ga=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Wa={p:1,n:2,b:4,r:8,q:16,k:32},Ka="pnbrqkPNBRQK",xa=[ca,Qt,Rt,ht],Va=7,Ya=6,Ja=1,Qa=0,Vt={[Ue]:le.KSIDE_CASTLE,[ht]:le.QSIDE_CASTLE},mt={w:[{square:re.a1,flag:le.QSIDE_CASTLE},{square:re.h1,flag:le.KSIDE_CASTLE}],b:[{square:re.a8,flag:le.QSIDE_CASTLE},{square:re.h8,flag:le.KSIDE_CASTLE}]},Xa={b:Ja,w:Ya},sa="--";function wt(l){return l>>4}function Bt(l){return l&15}function $a(l){return"0123456789".indexOf(l)!==-1}function Ge(l){const t=Bt(l),e=wt(l);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function qt(l){return l===Qe?tt:Qe}function Za(l){const t=l.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const u=parseInt(t[4],10);if(isNaN(u)||u<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const v=t[0].split("/");if(v.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let c=0;c<v.length;c++){let o=0,R=!1;for(let Y=0;Y<v[c].length;Y++)if($a(v[c][Y])){if(R)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};o+=parseInt(v[c][Y],10),R=!0}else{if(!/^[prnbqkPRNBQK]$/.test(v[c][Y]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};o+=1,R=!1}if(o!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const g=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:c,regex:o}of g){if(!o.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${c} king`};if((t[0].match(o)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${c} kings`}}return Array.from(v[0]+v[7]).some(c=>c.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function en(l,t){const e=l.from,u=l.to,v=l.piece;let g=0,c=0,o=0;for(let R=0,Y=t.length;R<Y;R++){const A=t[R].from,F=t[R].to,H=t[R].piece;v===H&&e!==A&&u===F&&(g++,wt(e)===wt(A)&&c++,Bt(e)===Bt(A)&&o++)}return g>0?c>0&&o>0?Ge(e):o>0?Ge(e).charAt(1):Ge(e).charAt(0):""}function ft(l,t,e,u,v,g=void 0,c=le.NORMAL){const o=wt(u);if(v===je&&(o===Va||o===Qa))for(let R=0;R<xa.length;R++){const Y=xa[R];l.push({color:t,from:e,to:u,piece:v,captured:g,promotion:Y,flags:c|le.PROMOTION})}else l.push({color:t,from:e,to:u,piece:v,captured:g,flags:c})}function ya(l){let t=l.charAt(0);return t>="a"&&t<="h"?l.match(/[a-h]\d.*[a-h]\d/)?void 0:je:(t=t.toLowerCase(),t==="o"?Ue:t)}function la(l){return l.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ka{_board=new Array(128);_turn=Qe;_header={};_kings={w:Je,b:Je};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=oa,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Je,b:Je},this._turn=Qe,this._castling={w:0,b:0},this._epSquare=Je,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Ua},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:u=!1}={}){let v=t.split(/\s+/);if(v.length>=2&&v.length<6){const o=["-","-","0","1"];t=v.concat(o.slice(-(6-v.length))).join(" ")}if(v=t.split(/\s+/),!e){const{ok:o,error:R}=Za(t);if(!o)throw new Error(R)}const g=v[0];let c=0;this.clear({preserveHeaders:u});for(let o=0;o<g.length;o++){const R=g.charAt(o);if(R==="/")c+=8;else if($a(R))c+=parseInt(R,10);else{const Y=R<"a"?Qe:tt;this._put({type:R.toLowerCase(),color:Y},Ge(c)),c++}}this._turn=v[1],v[2].indexOf("K")>-1&&(this._castling.w|=le.KSIDE_CASTLE),v[2].indexOf("Q")>-1&&(this._castling.w|=le.QSIDE_CASTLE),v[2].indexOf("k")>-1&&(this._castling.b|=le.KSIDE_CASTLE),v[2].indexOf("q")>-1&&(this._castling.b|=le.QSIDE_CASTLE),this._epSquare=v[3]==="-"?Je:re[v[3]],this._halfMoves=parseInt(v[4],10),this._moveNumber=parseInt(v[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,u="";for(let c=re.a8;c<=re.h1;c++){if(this._board[c]){e>0&&(u+=e,e=0);const{color:o,type:R}=this._board[c];u+=o===Qe?R.toUpperCase():R.toLowerCase()}else e++;c+1&136&&(e>0&&(u+=e),c!==re.h1&&(u+="/"),e=0,c+=8)}let v="";this._castling[Qe]&le.KSIDE_CASTLE&&(v+="K"),this._castling[Qe]&le.QSIDE_CASTLE&&(v+="Q"),this._castling[tt]&le.KSIDE_CASTLE&&(v+="k"),this._castling[tt]&le.QSIDE_CASTLE&&(v+="q"),v=v||"-";let g="-";if(this._epSquare!==Je)if(t)g=Ge(this._epSquare);else{const c=this._epSquare+(this._turn===Qe?16:-16),o=[c+1,c-1];for(const R of o){if(R&136)continue;const Y=this._turn;if(this._board[R]?.color===Y&&this._board[R]?.type===je){this._makeMove({color:Y,from:R,to:this._epSquare,piece:je,captured:je,flags:le.EP_CAPTURE});const A=!this._isKingAttacked(Y);if(this._undoMove(),A){g=Ge(this._epSquare);break}}}}return[u,this._turn,v,g,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:u}=this._board[t],v={w:0,b:1}[e],g={p:0,n:1,b:2,r:3,q:4,k:5}[u];return Ba[v][g][t]}_epKey(){return this._epSquare===Je?0n:Na[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return ja[t]}_computeHash(){let t=0n;for(let e=re.a8;e<=re.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=ia),t}_updateSetup(t){this._history.length>0||(t!==oa?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(oa)}get(t){return this._board[re[t]]}findPiece(t){const e=[];for(let u=re.a8;u<=re.h1;u++){if(u&136){u+=7;continue}!this._board[u]||this._board[u]?.color!==t.color||this._board[u].color===t.color&&this._board[u].type===t.type&&e.push(Ge(u))}return e}put({type:t,color:e},u){return this._put({type:t,color:e},u)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},u){if(Ka.indexOf(t.toLowerCase())===-1||!(u in re))return!1;const v=re[u];if(t==Ue&&!(this._kings[e]==Je||this._kings[e]==v))return!1;const g=this._board[v];return g&&g.type===Ue&&(this._kings[g.color]=Je),this._set(v,{type:t,color:e}),t===Ue&&(this._kings[e]=v),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(re[t]),e&&e.type===Ue&&(this._kings[e.color]=Je),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[re.e1]?.type===Ue&&this._board[re.e1]?.color===Qe,e=this._board[re.e8]?.type===Ue&&this._board[re.e8]?.color===tt;(!t||this._board[re.a1]?.type!==Rt||this._board[re.a1]?.color!==Qe)&&(this._castling.w&=-65),(!t||this._board[re.h1]?.type!==Rt||this._board[re.h1]?.color!==Qe)&&(this._castling.w&=-33),(!e||this._board[re.a8]?.type!==Rt||this._board[re.a8]?.color!==tt)&&(this._castling.b&=-65),(!e||this._board[re.h8]?.type!==Rt||this._board[re.h8]?.color!==tt)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Je)return;const t=this._epSquare+(this._turn===Qe?-16:16),e=this._epSquare+(this._turn===Qe?16:-16),u=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==qt(this._turn)||this._board[e]?.type!==je){this._hash^=this._epKey(),this._epSquare=Je;return}const v=g=>!(g&136)&&this._board[g]?.color===this._turn&&this._board[g]?.type===je;u.some(v)||(this._hash^=this._epKey(),this._epSquare=Je)}_attacked(t,e,u){const v=[];for(let g=re.a8;g<=re.h1;g++){if(g&136){g+=7;continue}if(this._board[g]===void 0||this._board[g].color!==t)continue;const c=this._board[g],o=g-e;if(o===0)continue;const R=o+119;if(Ha[R]&Wa[c.type]){if(c.type===je){if(o>0&&c.color===Qe||o<=0&&c.color===tt)if(u)v.push(Ge(g));else return!0;continue}if(c.type==="n"||c.type==="k")if(u){v.push(Ge(g));continue}else return!0;const Y=Ga[R];let A=g+Y,F=!1;for(;A!==e;){if(this._board[A]!=null){F=!0;break}A+=Y}if(!F)if(u){v.push(Ge(g));continue}else return!0}}return u?v:!1}attackers(t,e){return e?this._attacked(e,re[t],!0):this._attacked(this._turn,re[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(qt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,re[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let u=0,v=0;for(let g=re.a8;g<=re.h1;g++){if(v=(v+1)%2,g&136){g+=7;continue}const c=this._board[g];c&&(t[c.type]=c.type in t?t[c.type]+1:1,c.type===Qt&&e.push(v),u++)}if(u===2)return!0;if(u===3&&(t[Qt]===1||t[ca]===1))return!0;if(u===t[Qt]+2){let g=0;const c=e.length;for(let o=0;o<c;o++)g+=e[o];if(g===0||g===c)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:u=void 0}={}){const v=this._moves({square:e,piece:u});return t?v.map(g=>new Kt(this,g)):v.map(g=>this._moveToSan(g,v))}_moves({legal:t=!0,piece:e=void 0,square:u=void 0}={}){const v=u?u.toLowerCase():void 0,g=e?.toLowerCase(),c=[],o=this._turn,R=qt(o);let Y=re.a8,A=re.h1,F=!1;if(v)if(v in re)Y=A=re[v],F=!0;else return[];for(let O=Y;O<=A;O++){if(O&136){O+=7;continue}if(!this._board[O]||this._board[O].color===R)continue;const{type:ge}=this._board[O];let $e;if(ge===je){if(g&&g!==ge)continue;$e=O+ra[o][0],this._board[$e]||(ft(c,o,O,$e,je),$e=O+ra[o][1],Xa[o]===wt(O)&&!this._board[$e]&&ft(c,o,O,$e,je,void 0,le.BIG_PAWN));for(let We=2;We<4;We++)$e=O+ra[o][We],!($e&136)&&(this._board[$e]?.color===R?ft(c,o,O,$e,je,this._board[$e].type,le.CAPTURE):$e===this._epSquare&&ft(c,o,O,$e,je,je,le.EP_CAPTURE))}else{if(g&&g!==ge)continue;for(let We=0,et=va[ge].length;We<et;We++){const dt=va[ge][We];for($e=O;$e+=dt,!($e&136);){if(!this._board[$e])ft(c,o,O,$e,ge);else{if(this._board[$e].color===o)break;ft(c,o,O,$e,ge,this._board[$e].type,le.CAPTURE);break}if(ge===ca||ge===Ue)break}}}}if((g===void 0||g===Ue)&&(!F||A===this._kings[o])){if(this._castling[o]&le.KSIDE_CASTLE){const O=this._kings[o],ge=O+2;!this._board[O+1]&&!this._board[ge]&&!this._attacked(R,this._kings[o])&&!this._attacked(R,O+1)&&!this._attacked(R,ge)&&ft(c,o,this._kings[o],ge,Ue,void 0,le.KSIDE_CASTLE)}if(this._castling[o]&le.QSIDE_CASTLE){const O=this._kings[o],ge=O-2;!this._board[O-1]&&!this._board[O-2]&&!this._board[O-3]&&!this._attacked(R,this._kings[o])&&!this._attacked(R,O-1)&&!this._attacked(R,ge)&&ft(c,o,this._kings[o],ge,Ue,void 0,le.QSIDE_CASTLE)}}if(!t||this._kings[o]===-1)return c;const H=[];for(let O=0,ge=c.length;O<ge;O++)this._makeMove(c[O]),this._isKingAttacked(o)||H.push(c[O]),this._undoMove();return H}move(t,{strict:e=!1}={}){let u=null;if(typeof t=="string")u=this._moveFromSan(t,e);else if(t===null)u=this._moveFromSan(sa,e);else if(typeof t=="object"){const g=this._moves();for(let c=0,o=g.length;c<o;c++)if(t.from===Ge(g[c].from)&&t.to===Ge(g[c].to)&&(!("promotion"in g[c])||t.promotion===g[c].promotion)){u=g[c];break}}if(!u)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&u.flags&le.NULL_MOVE)throw new Error("Null move not allowed when in check");const v=new Kt(this,u);return this._makeMove(u),this._incPositionCount(),v}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,u=qt(e);if(this._push(t),t.flags&le.NULL_MOVE){e===tt&&this._moveNumber++,this._halfMoves++,this._turn=u,this._epSquare=Je;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&le.EP_CAPTURE&&(this._turn===tt?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Ue){if(this._kings[e]=t.to,t.flags&le.KSIDE_CASTLE){const v=t.to-1,g=t.to+1;this._movePiece(g,v)}else if(t.flags&le.QSIDE_CASTLE){const v=t.to+1,g=t.to-2;this._movePiece(g,v)}this._castling[e]=0}if(this._castling[e]){for(let v=0,g=mt[e].length;v<g;v++)if(t.from===mt[e][v].square&&this._castling[e]&mt[e][v].flag){this._castling[e]^=mt[e][v].flag;break}}if(this._castling[u]){for(let v=0,g=mt[u].length;v<g;v++)if(t.to===mt[u][v].square&&this._castling[u]&mt[u][v].flag){this._castling[u]^=mt[u][v].flag;break}}if(this._hash^=this._castlingKey(),t.flags&le.BIG_PAWN){let v;e===tt?v=t.to-16:v=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===je&&this._board[t.to-1]?.color===u||!(t.to+1&136)&&this._board[t.to+1]?.type===je&&this._board[t.to+1]?.color===u?(this._epSquare=v,this._hash^=this._epKey()):this._epSquare=Je}else this._epSquare=Je;t.piece===je?this._halfMoves=0:t.flags&(le.CAPTURE|le.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===tt&&this._moveNumber++,this._turn=u,this._hash^=ia}undo(){const t=this._hash,e=this._undoMove();if(e){const u=new Kt(this,e);return this._decPositionCount(t),u}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=ia;const u=this._turn,v=qt(u);if(e.flags&le.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:u})),e.captured)if(e.flags&le.EP_CAPTURE){let g;u===tt?g=e.to-16:g=e.to+16,this._set(g,{type:je,color:v})}else this._set(e.to,{type:e.captured,color:v});if(e.flags&(le.KSIDE_CASTLE|le.QSIDE_CASTLE)){let g,c;e.flags&le.KSIDE_CASTLE?(g=e.to+1,c=e.to-1):(g=e.to-2,c=e.to+1),this._movePiece(c,g)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const u=[];let v=!1;for(const H in this._header)this._header[H]&&u.push(`[${H} "${this._header[H]}"]`+t),v=!0;v&&this._history.length&&u.push(t);const g=H=>{const O=this._comments[this.fen()];if(typeof O<"u"){const ge=H.length>0?" ":"";H=`${H}${ge}{${O}}`}return H},c=[];for(;this._history.length>0;)c.push(this._undoMove());const o=[];let R="";for(c.length===0&&o.push(g(""));c.length>0;){R=g(R);const H=c.pop();if(!H)break;if(!this._history.length&&H.color==="b"){const O=`${this._moveNumber}. ...`;R=R?`${R} ${O}`:O}else H.color==="w"&&(R.length&&o.push(R),R=this._moveNumber+".");R=R+" "+this._moveToSan(H,this._moves({legal:!0})),this._makeMove(H)}if(R.length&&o.push(g(R)),o.push(this._header.Result||"*"),e===0)return u.join("")+o.join(" ");const Y=function(){return u.length>0&&u[u.length-1]===" "?(u.pop(),!0):!1},A=function(H,O){for(const ge of O.split(" "))if(ge){if(H+ge.length>e){for(;Y();)H--;u.push(t),H=0}u.push(ge),H+=ge.length,u.push(" "),H++}return Y()&&H--,H};let F=0;for(let H=0;H<o.length;H++){if(F+o[H].length>e&&o[H].includes("{")){F=A(F,o[H]);continue}F+o[H].length>e&&H!==0?(u[u.length-1]===" "&&u.pop(),u.push(t),F=0):H!==0&&(u.push(" "),F++),u.push(o[H]),F+=o[H].length}return u.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??pa[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=pa[t]||null,!0):!1}getHeaders(){const t={};for(const[e,u]of Object.entries(this._header))u!==null&&(t[e]=u);return t}loadPgn(t,{strict:e=!1,newlineChar:u=`\r?
`}={}){u!==`\r?
`&&(t=t.replace(new RegExp(u,"g"),`
`));const v=za(t);this.reset();const g=v.headers;let c="";for(const Y in g)Y.toLowerCase()==="fen"&&(c=g[Y]),this.header(Y,g[Y]);if(!e)c&&this.load(c,{preserveHeaders:!0});else if(g.SetUp==="1"){if(!("FEN"in g))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(g.FEN,{preserveHeaders:!0})}let o=v.root;for(;o;){if(o.move){const Y=this._moveFromSan(o.move,e);if(Y==null)throw new Error(`Invalid move in PGN: ${o.move}`);this._makeMove(Y),this._incPositionCount()}o.comment!==void 0&&(this._comments[this.fen()]=o.comment),o=o.variations[0]}const R=v.result;R&&Object.keys(this._header).length&&this._header.Result!==R&&this.setHeader("Result",R)}_moveToSan(t,e){let u="";if(t.flags&le.KSIDE_CASTLE)u="O-O";else if(t.flags&le.QSIDE_CASTLE)u="O-O-O";else{if(t.flags&le.NULL_MOVE)return sa;if(t.piece!==je){const v=en(t,e);u+=t.piece.toUpperCase()+v}t.flags&(le.CAPTURE|le.EP_CAPTURE)&&(t.piece===je&&(u+=Ge(t.from)[0]),u+="x"),u+=Ge(t.to),t.promotion&&(u+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?u+="#":u+="+"),this._undoMove(),u}_moveFromSan(t,e=!1){let u=la(t);if(e||(u==="0-0"?u="O-O":u==="0-0-0"&&(u="O-O-O")),u==sa)return{color:this._turn,from:0,to:0,piece:"k",flags:le.NULL_MOVE};let v=ya(u),g=this._moves({legal:!0,piece:v});for(let H=0,O=g.length;H<O;H++)if(u===la(this._moveToSan(g[H],g)))return g[H];if(e)return null;let c,o,R,Y,A,F=!1;if(o=u.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),o?(c=o[1],R=o[2],Y=o[3],A=o[4],R.length==1&&(F=!0)):(o=u.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),o&&(c=o[1],R=o[2],Y=o[3],A=o[4],R.length==1&&(F=!0))),v=ya(u),g=this._moves({legal:!0,piece:c||v}),!Y)return null;for(let H=0,O=g.length;H<O;H++)if(R){if((!c||c.toLowerCase()==g[H].piece)&&re[R]==g[H].from&&re[Y]==g[H].to&&(!A||A.toLowerCase()==g[H].promotion))return g[H];if(F){const ge=Ge(g[H].from);if((!c||c.toLowerCase()==g[H].piece)&&re[Y]==g[H].to&&(R==ge[0]||R==ge[1])&&(!A||A.toLowerCase()==g[H].promotion))return g[H]}}else if(u===la(this._moveToSan(g[H],g)).replace("x",""))return g[H];return null}ascii(){let t=`   +------------------------+
`;for(let e=re.a8;e<=re.h1;e++){if(Bt(e)===0&&(t+=" "+"87654321"[wt(e)]+" |"),this._board[e]){const u=this._board[e].type,g=this._board[e].color===Qe?u.toUpperCase():u.toLowerCase();t+=" "+g+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let u=0;const v=this._turn;for(let g=0,c=e.length;g<c;g++)this._makeMove(e[g]),this._isKingAttacked(v)||(t-1>0?u+=this.perft(t-1):u++),this._undoMove();return u}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let u=re.a8;u<=re.h1;u++)this._board[u]==null?e.push(null):e.push({square:Ge(u),type:this._board[u].type,color:this._board[u].color}),u+1&136&&(t.push(e),e=[],u+=8);return t}squareColor(t){if(t in re){const e=re[t];return(wt(e)+Bt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],u=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const v=e.pop();if(!v)break;t?u.push(new Kt(this,v)):u.push(this._moveToSan(v,this._moves())),this._makeMove(v)}return u}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},u=v=>{v in this._comments&&(e[v]=this._comments[v])};for(;this._history.length>0;)t.push(this._undoMove());for(u(this.fen());;){const v=t.pop();if(!v)break;this._makeMove(v),u(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const v of[Ue,ht])e[v]!==void 0&&(e[v]?this._castling[t]|=Vt[v]:this._castling[t]&=~Vt[v]);this._updateCastlingRights();const u=this.getCastlingRights(t);return(e[Ue]===void 0||e[Ue]===u[Ue])&&(e[ht]===void 0||e[ht]===u[ht])}getCastlingRights(t){return{[Ue]:(this._castling[t]&Vt[Ue])!==0,[ht]:(this._castling[t]&Vt[ht])!==0}}moveNumber(){return this._moveNumber}}async function on(l,t={}){const e=t.currentUser||{},u=t.userRole||e?.role||"employee";let v="chat",g=[],c=null,o=[],R=[],Y=null,A=null,F=!1,H=null,O=null;l.innerHTML=`
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
  `,tn(),await ot(),Le();const ge=l.querySelector("#tab-nav-chat"),$e=l.querySelector("#tab-nav-lounge"),We=l.querySelector("#bonding-chat-main-wrap"),et=l.querySelector("#bonding-lounge-main-wrap");ge?.addEventListener("click",async()=>{v="chat",ge.classList.add("active"),$e.classList.remove("active"),We.style.display="grid",et.style.display="none",Le(),c&&await Ae(c._id)}),$e?.addEventListener("click",async()=>{v="lounge_games",$e.classList.add("active"),ge.classList.remove("active"),We.style.display="none",et.style.display="block",await h()}),l.querySelector("#btn-top-new-chat")?.addEventListener("click",y),l.querySelector("#btn-top-new-group")?.addEventListener("click",D),l.querySelector("#btn-top-challenge")?.addEventListener("click",()=>B());const dt=l.querySelector("#bonding-search-input");dt&&dt.addEventListener("input",s=>{const p=s.target.value.toLowerCase().trim();l.querySelectorAll(".bonding-channel-item").forEach(i=>{const $=i.textContent.toLowerCase();i.style.display=$.includes(p)?"flex":"none"})}),bt(),new MutationObserver((s,p)=>{document.body.contains(l)||(A&&clearInterval(A),O&&clearInterval(O),p.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function ot(){try{const[s,p]=await Promise.all([Ee("/bonding/channels").catch(()=>[]),Ee("/bonding/colleagues").catch(()=>[])]);if(g=s,o=p,g.length>0){const n=localStorage.getItem("ci360_bonding_active_channel");n&&g.some(i=>i._id===n)?c=g.find(i=>i._id===n):c||(c=g.find(i=>i.name.includes("Lounge"))||g[0])}Fe(),c&&await Ae(c._id)}catch(s){console.error("Failed to load bonding data",s)}}async function Ae(s,p=!1){if(s)try{localStorage.setItem("ci360_bonding_active_channel",s),R=await Ee(`/bonding/channels/${s}/messages`),p?r():f()}catch(n){console.error("Failed to load messages",n)}}let rt=0;function bt(){A&&clearInterval(A),A=setInterval(async()=>{try{if(!document.body.contains(l)){clearInterval(A);return}if(rt++,rt%2===0){const s=await Ee("/bonding/channels").catch(()=>null);s&&JSON.stringify(s.map(p=>p._id+p.lastMessage?.sentAt))!==JSON.stringify(g.map(p=>p._id+p.lastMessage?.sentAt))&&(g=s,Fe())}v==="chat"&&c?await Ae(c._id,!0):v==="lounge_games"&&await h(!0)}catch{}},3e3)}function Fe(){const s=l.querySelector("#bonding-group-list"),p=l.querySelector("#bonding-direct-list");if(!s||!p)return;const n=g.filter($=>$.type==="group"),i=g.filter($=>$.type==="direct");if(n.length===0)s.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const $=e?._id||e?.id,z=u==="superadmin"||e?.role==="superadmin";s.innerHTML=n.map(C=>{const V=c&&c._id===C._id,K=C.createdBy&&C.createdBy.userId&&String(C.createdBy.userId)===String($)||z;return`
          <div class="bonding-channel-item ${V?"active":""}" data-channel-id="${C._id}">
            <div class="bonding-channel-icon">${C.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${x(C.name)}</div>
              <div class="bonding-channel-preview">${x(C.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${K?`
              <button class="bonding-channel-del-btn" data-channel-id="${C._id}" title="Delete Group (Creator only)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            `:`
              <button class="bonding-channel-leave-btn" data-channel-id="${C._id}" title="Leave Group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            `}
          </div>
        `}).join("")}i.length===0?p.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':p.innerHTML=i.map($=>{const z=c&&c._id===$._id,C=$.displayName||$.name||"Colleague",V=C.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${z?"active":""}" data-channel-id="${$._id}">
            <div class="bonding-channel-avatar">${V}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${x(C)}</div>
              <div class="bonding-channel-preview">${x($.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${$._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),ut()}function ut(){const s=l.querySelectorAll(".bonding-channel-item");s.forEach(p=>{p.onclick=async n=>{if(n.target.closest(".bonding-channel-del-btn")||n.target.closest(".bonding-channel-leave-btn"))return;const i=p.dataset.channelId,$=g.find(z=>z._id===i);$&&(c=$,s.forEach(z=>z.classList.remove("active")),p.classList.add("active"),Le(),await Ae($._id))}}),l.querySelectorAll(".bonding-channel-leave-btn").forEach(p=>{p.onclick=async n=>{n.stopPropagation();const i=p.dataset.channelId,z=g.find(C=>C._id===i)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${z}"?`))try{p.disabled=!0,await we(`/bonding/channels/${i}/leave`,{}),k(`You left "${z}"`,"info"),g=g.filter(C=>C._id!==i),c&&c._id===i&&(c=g.find(C=>C.type==="group")||g[0]||null,Le(),c&&await Ae(c._id)),Fe()}catch(C){k(C.message||"Failed to leave group","error"),p.disabled=!1}}}),l.querySelectorAll(".bonding-channel-del-btn").forEach(p=>{p.onclick=async n=>{n.stopPropagation();const i=p.dataset.channelId,$=g.find(V=>V._id===i),z=$&&$.type==="direct",C=z?"this 1-on-1 chat":`the group "${$?.name||""}"`;if(confirm(`Are you sure you want to delete ${C}? All messages will be permanently removed.`))try{p.disabled=!0,await Ze(`/bonding/channels/${i}`),k(z?"1-on-1 chat deleted":"Group deleted","success"),g=g.filter(V=>V._id!==i),c&&c._id===i&&(c=g[0]||null,Le(),c&&await Ae(c._id)),Fe()}catch(V){k(V.message||"Failed to delete conversation","error"),p.disabled=!1}}}),l.querySelector("#btn-create-group")?.addEventListener("click",D),l.querySelector("#btn-new-direct-chat")?.addEventListener("click",y)}function Le(){const s=l.querySelector("#bonding-chat-panel");if(!s)return;if(!c){s.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const p=x(c.displayName||c.name),n=(c.members||[]).length,i=c.type==="group",$=e?._id||e?.id,z=i?null:(c.members||[]).find(K=>K.userId?.toString()!==$?.toString()),C=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String($),V=u==="superadmin"||e?.role==="superadmin",ne=C||V;s.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${i?c.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${p}</div>
            <div class="bonding-chat-sub">
              ${i?`<span>${n} members</span> · <span>${x(c.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${i?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${n})</span>
            </button>
            ${ne?`
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
        ${Me()}
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
    `,st(z),ye(z),ct(),a()}function Me(){if(!R||R.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const s=e?._id||e?.id;return R.map(p=>{const n=p.sender&&p.sender.userId&&s&&p.sender.userId.toString()===s.toString();if(p.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${p._id}">
            <span>ℹ️</span> <span>${x(p.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${p._id}" title="Delete Message">&times;</button>
          </div>
        `;if(p.type==="challenge"&&p.challengeData){const C=p.challengeData,V=C.gameTitle||"Game Challenge",ne=C.gameType||"chess",K=ne==="chess"?"♟️":ne==="ludo"?"🎲":"❌",L=C.gameState?.invitationId,G=C.targetUserId?.toString(),ie=p.sender?.userId?.toString(),Z=s&&G===s.toString(),se=s&&ie===s.toString();return`
          <div class="bonding-msg-row ${n?"self":"other"}" data-msg-id="${p._id}">
            <div class="bonding-msg-avatar" title="${x(p.sender?.name||"Teammate")}">
              ${(p.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${x(p.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${S(p.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${p._id}" title="Delete Challenge Message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${K}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${x(V)}</h4>
                    <p class="game-bubble-desc">${x(p.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${C.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':C.status==="active"||C.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':C.status==="declined"?'<span class="badge red">❌ Challenge Declined</span>':C.status==="cancelled"?'<span class="badge gray">🚫 Challenge Cancelled</span>':`<span class="badge gray">${x(C.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${C.status==="pending"&&Z?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${L}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${L}" data-action="decline">
                        Decline
                      </button>
                    `:C.status==="pending"&&se?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${L}" data-action="cancel">
                          Cancel
                        </button>
                      `:C.status==="declined"||C.status==="cancelled"?`
                        <div class="game-pending-text" style="font-size:11.5px;color:var(--text-3);font-style:italic;">
                          ${C.status==="declined"?"Challenge was declined":"Challenge was cancelled"}
                        </div>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-match-id="${C.gameState?.matchId||""}" data-invite-id="${L||""}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${de(p)}
            </div>
          </div>
        `}const i=x(p.sender?.name||"Teammate"),$=S(p.createdAt),z=de(p);return`
        <div class="bonding-msg-row ${n?"self":"other"}" data-msg-id="${p._id}">
          <div class="bonding-msg-avatar" title="${i}">${i.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${i}</span>
              <span class="bonding-msg-time">${$}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${p._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${x(p.content).replace(/\n/g,"<br/>")}
            </div>
            ${z}
          </div>
        </div>
      `}).join("")}function de(s){return`
      <div class="bonding-reactions-row">
        ${(s.reactions||[]).map(i=>{const $=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(i.users||[]).some(C=>C.toString()===$?.toString())?"active":""}" data-msg-id="${s._id}" data-emoji="${i.emoji}">
          <span>${i.emoji}</span> <span>${i.users?i.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${s._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function st(s){const p=l.querySelector("#btn-chat-challenge");p&&(p.onclick=()=>{s?B(null,s.userId||s._id):B()});const n=l.querySelector("#btn-manage-members");n&&(n.onclick=N);const i=l.querySelector("#btn-delete-group");i&&(i.onclick=j);const $=l.querySelector("#btn-leave-group");$&&($.onclick=E);const z=l.querySelector("#btn-delete-direct");z&&(z.onclick=async()=>{if(c&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{z.disabled=!0,await Ze(`/bonding/channels/${c._id}`),k("1-on-1 chat deleted successfully","success");const V=c._id;g=g.filter(ne=>ne._id!==V),c=g[0]||null,Fe(),Le(),c&&await Ae(c._id)}catch(V){k(V.message||"Could not delete 1-on-1 chat","error"),z.disabled=!1}});const C=l.querySelector("#btn-clear-chat");C&&(C.onclick=async()=>{if(c&&confirm("Are you sure you want to clear all messages in this conversation?"))try{C.disabled=!0,await Ze(`/bonding/channels/${c._id}/messages`),k("Chat messages cleared","success"),R=[],f()}catch(V){k(V.message||"Could not clear chat messages","error")}finally{C.disabled=!1}})}function ye(s){const p=l.querySelector("#bonding-message-input"),n=l.querySelector("#btn-send-message"),i=l.querySelector("#btn-quick-emoji"),$=l.querySelector("#btn-input-challenge");p&&p.addEventListener("keydown",z=>{z.key==="Enter"&&!z.shiftKey&&(z.preventDefault(),lt())}),n&&(n.onclick=lt),$&&($.onclick=()=>{s?B(null,s.userId||s._id):B()}),i&&(i.onclick=()=>{if(!p)return;const z=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],C=z[Math.floor(Math.random()*z.length)];p.value+=(p.value?" ":"")+C,p.focus()})}function ct(){l.querySelectorAll(".btn-respond-invite").forEach(i=>{i.onclick=async()=>{const $=i.dataset.inviteId,z=i.dataset.action;await w($,z)}}),l.querySelectorAll(".btn-launch-match-from-card").forEach(i=>{i.onclick=async()=>{const $=i.dataset.matchId,z=i.dataset.inviteId;if($){P($);return}try{i.disabled=!0;const C=await Ee("/bonding/invitations"),ne=(C.incoming||[]).concat(C.sent||[]).find(G=>G._id===z||G.matchId&&G.matchId.toString()===z);if(ne&&ne.matchId){P(ne.matchId);return}const L=(await Ee("/bonding/matches").catch(()=>[])||[]).find(G=>G.invitationId===z||G._id===z);if(L){P(L._id);return}k("Match has not started yet or has finished","warning")}catch(C){k(C.message||"Could not load match","error")}finally{i.disabled=!1}}}),l.querySelectorAll(".bonding-msg-del-btn").forEach(i=>{i.onclick=async $=>{$.stopPropagation();const z=i.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{i.disabled=!0,await Ze(`/bonding/messages/${z}`),R=R.filter(C=>C._id!==z),r(),k("Message deleted","success")}catch(C){k(C.message||"Failed to delete message","error"),i.disabled=!1}}}),l.querySelectorAll(".bonding-rxn-tag").forEach(i=>{i.onclick=async()=>{const $=i.dataset.msgId,z=i.dataset.emoji;await d($,z)}}),l.querySelectorAll(".bonding-add-rxn-btn").forEach(i=>{i.onclick=$=>{const z=i.dataset.msgId;J($.currentTarget,async C=>{await d(z,C)})}})}async function lt(){const s=l.querySelector("#bonding-message-input");if(!s||!c||F)return;const p=s.value.trim();if(p)try{F=!0,s.value="";const n=await we(`/bonding/channels/${c._id}/messages`,{content:p,type:"text"});R.push(n),f(),a()}catch(n){k(n.message||"Failed to send message","error")}finally{F=!1,s.focus()}}async function d(s,p){try{const n=await we(`/bonding/messages/${s}/react`,{emoji:p}),i=R.find($=>$._id===s);i&&(i.reactions=n,r())}catch(n){k(n.message||"Failed to react","error")}}function a(){const s=l.querySelector("#bonding-messages-feed");s&&(s.scrollTop=s.scrollHeight)}function r(){const s=l.querySelector("#bonding-messages-feed");if(!s)return;const p=s.scrollHeight-s.scrollTop<=s.clientHeight+80;s.innerHTML=Me(),ct(),p&&a()}function f(){const s=l.querySelector("#bonding-messages-feed");s&&(s.innerHTML=Me(),ct())}async function h(s=!1){const p=l.querySelector("#bonding-lounge-main-wrap");if(p){s||(p.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const n=await Ee("/bonding/games/overview");Y=n;const i=n.myStats||{},$=n.availableGames||[],z=n.incomingChallenges||[],C=n.sentChallenges||[],V=n.activeMatches||[],ne=n.recentMatches||[],K=e?._id||e?.id;p.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${i.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${i.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${i.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${i.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${i.gamesPlayed>0?Math.round((i.wins||0)/i.gamesPlayed*100):0}%</span>
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
              ${$.map(L=>`
                <div class="lounge-game-card" data-game-id="${L.id}">
                  <div class="game-card-icon">${L.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${x(L.name)}</h4>
                    <p class="game-card-desc">${x(L.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${L.duration}</span>
                      ${L.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${L.id}" data-game-title="${x(L.name)}">
                    ${L.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${z.length+C.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${z.length})</h5>
              ${z.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${z.map(L=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(L.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${x(L.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${x(L.sender.name)}</strong> (${x(L.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${L._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${L._id}" data-action="decline">
                            Decline
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

              <!-- Sent -->
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${C.length})</h5>
              ${C.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${C.map(L=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(L.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${x(L.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${x(L.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${L._id}" data-action="cancel">
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
                <span class="badge green">${V.length} Live</span>
              </div>

              ${V.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${V.map(L=>{const ie=(L.players||L.gameState?.players||[L.player1,L.player2].filter(Boolean)).filter(be=>be.userId&&be.userId.toString()!==K?.toString()),Z=L.player1?.userId?.toString()===K?.toString()?L.player2:L.player1,se=ie.length>0?ie.map(be=>x(be.name)).join(", "):Z?.name?x(Z.name):"Colleagues",ue=K&&L.currentTurnUserId&&L.currentTurnUserId.toString()===K.toString();return`
                        <div class="lounge-active-match-card ${ue?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${L.gameType==="chess"?"♟️":L.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${x(L.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${se}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ue?"my-turn":"wait"}">
                              ${ue?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${L._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${L._id}" title="Delete Match">
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
              ${ne.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${ne.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${ne.map(L=>{const ie=K&&L.player1.userId.toString()===K.toString()?L.player2:L.player1,Z=K&&L.winnerId&&L.winnerId.toString()===K.toString(),se=L.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${x(L.gameTitle)}</span>
                          <span class="recent-date">${S(L.completedAt||L.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${L._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${x(ie.name)}</strong></div>
                          <div class="recent-outcome ${Z?"win":se?"draw":"loss"}">
                            ${Z?"🏆 VICTORY":se?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${x(L.winningReason||L.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${L._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${L._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,T()}catch(n){p.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${x(n.message)}</p>
        </div>
      `}}}function T(){l.querySelectorAll(".btn-challenge-game").forEach(p=>{p.onclick=()=>{const n=p.dataset.gameId;B(n)}}),l.querySelectorAll(".btn-respond-invite").forEach(p=>{p.onclick=async()=>{const n=p.dataset.inviteId,i=p.dataset.action;await w(n,i),await h()}}),l.querySelectorAll(".btn-resume-match").forEach(p=>{p.onclick=()=>{const n=p.dataset.matchId;P(n)}}),l.querySelectorAll(".btn-recent-rematch").forEach(p=>{p.onclick=async()=>{const n=p.dataset.matchId;try{p.disabled=!0;const i=await we(`/bonding/matches/${n}/action`,{action:"rematch"});i.match&&(k("Rematch created! Opening arena ⚔️","success"),P(i.match._id))}catch(i){k(i.message||"Could not start rematch","error")}finally{p.disabled=!1}}}),l.querySelectorAll(".btn-delete-match").forEach(p=>{p.onclick=async n=>{n.stopPropagation();const i=p.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{p.disabled=!0,await Ze(`/bonding/matches/${i}`),k("Match deleted successfully","success"),await h()}catch($){k($.message||"Failed to delete match","error")}finally{p.disabled=!1}}});const s=l.querySelector("#btn-clear-matches");s&&(s.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{s.disabled=!0,await Ze("/bonding/matches?filter=completed"),k("Completed matches history cleared","success"),await h()}catch(p){k(p.message||"Failed to clear matches","error")}finally{s.disabled=!1}})}function B(s=null,p=null){const n=l.querySelector("#bonding-modals-root"),i=e?._id||e?.id,$=new Set(["employee","admin","superadmin"]),z=o.filter(Z=>!Z.isSelf&&Z._id.toString()!==i?.toString()&&$.has(Z.role));let C=s||"chess",V=p?p.toString():null,ne=2,K=V?[V]:[],L="none";function G(){const Z=z.find(me=>me._id.toString()===V),se=C==="ludo",ue=ne-1,be=K.length===ue;n.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${se?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${C==="chess"?"active":""}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${C==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                  <button class="game-pill-btn ${C==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                </div>
              </div>

              <!-- LUDO SPECIAL: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${se?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${ne===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${ne===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${ne===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${se?`Step 3 — Select Colleagues to Play With (${K.length}/${ue} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${z.map(me=>{const Q=se?K.includes(me._id.toString()):V===me._id.toString();return`
                      <div class="eligible-emp-item ${Q?"selected":""}" data-user-id="${me._id}">
                        <div class="emp-item-avatar">${me.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${x(me.name)}</span>
                          <span class="emp-item-role">${x(me.role==="superadmin"?"Superadmin":me.role==="admin"?"Admin":"Employee")} · ${x(me.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${Q?"active":""}">
                          ${Q?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Step for Chess timers -->
              ${C==="chess"?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 3 — Time Control Options</div>
                  <div class="timer-opts-row">
                    <label class="timer-radio-lbl ${L==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${L==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${L==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${L==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${L==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${L==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${se?`🎲 Ludo (${ne} Players · 4 Pawns per base)`:C==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${se?`
                    <div><strong>Opponents:</strong> ${K.length>0?K.map(me=>{const Q=z.find(De=>De._id.toString()===me);return Q?`<strong>${x(Q.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+ue+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${Z?`<strong>${x(Z.name)}</strong> (${x(Z.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${C==="chess"?`<div><strong>Time Control:</strong> ${L==="none"?"Untimed":L}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(se?!be:!V)?"disabled":""}>
                ${se?`Start ${ne}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,ie()}function ie(){n.querySelector(".bonding-modal-close").onclick=()=>{n.innerHTML=""},n.querySelector("#btn-cancel-challenge-flow").onclick=()=>{n.innerHTML=""},n.querySelectorAll(".game-pill-btn").forEach(ue=>{ue.onclick=()=>{C=ue.dataset.game,G()}}),n.querySelectorAll(".ludo-mode-btn").forEach(ue=>{ue.onclick=()=>{ne=Number(ue.dataset.count),K=K.slice(0,ne-1),G()}});const Z=n.querySelector("#flow-emp-search");Z&&(Z.oninput=ue=>{const be=ue.target.value.toLowerCase().trim();n.querySelectorAll(".eligible-emp-item").forEach(me=>{const Q=me.textContent.toLowerCase();me.style.display=Q.includes(be)?"flex":"none"})}),n.querySelectorAll(".eligible-emp-item").forEach(ue=>{ue.onclick=()=>{const be=ue.dataset.userId;if(C==="ludo"){const me=ne-1;K.includes(be)?K=K.filter(Q=>Q!==be):K.length<me?K.push(be):K[me-1]=be}else V=be;G()}}),n.querySelectorAll('input[name="timerMode"]').forEach(ue=>{ue.onchange=be=>{L=be.target.value,G()}});const se=n.querySelector("#btn-submit-challenge-flow");se&&(se.onclick=async()=>{if(C==="ludo"){const ue=ne-1;if(K.length<ue){k(`Please select ${ue} colleague(s) to play with`,"warning");return}try{se.disabled=!0,se.textContent="Launching Match...";const be=await we("/bonding/matches/instant-ludo",{playerCount:ne,targetUserIds:K});n.innerHTML="",k(`Ludo match started (${ne} Players)! 🎲`,"success"),be&&be._id&&P(be._id)}catch(be){k(be.message||"Failed to start Ludo match","error"),se.disabled=!1,se.textContent=`Start ${ne}P Ludo Match 🎲`}return}if(!V){k("Please select an employee to challenge","warning");return}try{se.disabled=!0,se.textContent="Sending Challenge...",await we("/bonding/invitations",{gameType:C,targetUserId:V,matchSettings:{timerMode:L},channelId:null}),k("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),n.innerHTML="",await loadChannels();const ue=g.find(be=>be.type==="direct"&&be.members?.some(me=>(me.userId||me._id)?.toString()===V));ue?selectChannel(ue):c&&await Ae(c._id),v==="lounge_games"&&await h()}catch(ue){k(ue.message||"Could not send challenge","error"),se.disabled=!1,se.textContent="Send Challenge 🚀"}})}G()}async function w(s,p){if(!(!s||!p))try{const n=await Yt(`/bonding/invitations/${s}/respond`,{action:p});p==="accept"?(k("Challenge accepted! Entering match arena ⚔️","success"),n.match&&P(n.match._id)):p==="decline"?(k("Challenge declined","info"),l.querySelectorAll(`[data-invite-id="${s}"]`).forEach(i=>{const $=i.closest(".lounge-invite-item")||i.closest(".bonding-msg-row");$&&$.remove()})):p==="cancel"&&(k("Challenge cancelled","info"),l.querySelectorAll(`[data-invite-id="${s}"]`).forEach(i=>{const $=i.closest(".lounge-invite-item")||i.closest(".bonding-msg-row");$&&$.remove()})),c&&await Ae(c._id),v==="lounge_games"&&await h()}catch(n){k(n.message||"Action failed","error")}}async function P(s){if(!s)return;H=s,O&&clearInterval(O);const p=l.querySelector("#bonding-modals-root");let n=null,i=null,$=[],z="",C=null,V=!1,ne=!1,K=0;function L(Q){return Q?JSON.stringify({status:Q.status,turn:Q.currentTurnUserId?.toString(),turnColor:Q.turn,movesCount:Q.moves?.length,dice:Q.gameState?.dice,rolled:Q.gameState?.rolled,lastRoll:Q.gameState?.lastRoll,lastRollColor:Q.gameState?.lastRollColor,lastRollBy:Q.gameState?.lastRollBy,lastActionText:Q.gameState?.lastActionText,tokens:Q.gameState?.tokens,board:Q.gameState?.board,grid:Q.gameState?.grid,fen:Q.gameState?.fen,draw:Q.drawOfferedBy?.toString(),rematchOfferedBy:Q.rematchOfferedBy?.toString(),rematchDeclined:!!Q.rematchDeclined}):""}async function G(){try{return n=await Ee(`/bonding/matches/${s}`),n}catch(Q){return k(Q.message||"Could not load match","error"),ie(),null}}if(n=await G(),!n)return;z=L(n);function ie(){O&&clearInterval(O),C&&clearTimeout(C),V=!1,H=null,p.innerHTML="",v==="lounge_games"&&h(!0),c&&Ae(c._id,!0)}O=setInterval(async()=>{if(!H||H!==s){clearInterval(O);return}if(!(ne&&Date.now()-K<2500))try{const Q=await Ee(`/bonding/matches/${s}`);if(!Q)return;const De=L(Q);if(De!==z){if(z=De,n=Q,Q.rematchDeclined){k("Rematch was declined","info"),ie();return}Z()}}catch{}},800);function Z(){if(!n)return;const Q=e?._id||e?.id,De=Q&&n.player1.userId.toString()===Q.toString(),Ce=De?n.player1:n.player2,pe=De?n.player2:n.player1,ve=Q&&n.currentTurnUserId&&n.currentTurnUserId.toString()===Q.toString(),Ie=n.status!=="active";p.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${n.gameType==="ludo"?"🎲":n.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${x(n.gameTitle)}</h3>
                  ${n.gameType==="ludo"&&n.gameState?.players?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${n.gameState.players.map(ze=>{const Ke=ze.userId&&ze.userId.toString()===Q?.toString(),He={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[ze.color]||"⚪",Oe=(n.gameState?.turnColor||n.turn)===ze.color;return`
                          <span class="player-tag ${Ke?"self":"opp"} ${Oe?"turn-active":""}">
                            ${He} <strong>${x(ze.name)}</strong> ${Ke?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${x(Ce.name)} (You · <strong>${n.gameType==="ludo"?Ce.assignedRole==="red"?"🔴 Red":"🟢 Green":n.gameType==="tictactoe"?Ce.assignedRole==="X"?"✕":"◯":Ce.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${x(pe.name)} (<strong>${n.gameType==="ludo"?pe.assignedRole==="red"?"🔴 Red":"🟢 Green":n.gameType==="tictactoe"?pe.assignedRole==="X"?"✕":"◯":pe.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${Ie?"ended":ve?"my-turn":"opp-turn"}">
                ${Ie?`<span>🏁 Finished (${x(n.winningReason||n.status)})</span>`:ve?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${x(pe.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${n.gameType==="ludo"?ve?n.gameState?.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Tap the dice to roll.":"⏳ Opponent is rolling/moving their tokens...":n.gameType==="tictactoe"?ve?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":ve?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${Ie?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${n.drawOfferedBy&&n.drawOfferedBy.toString()!==Q?.toString()&&!Ie?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${x(pe.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${n.gameType==="chess"?se(De):""}
              ${n.gameType==="tictactoe"?ue():""}
              ${n.gameType==="ludo"?be(De):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${Ie?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${n.winnerId&&n.winnerId.toString()===Q?.toString()?"🏆":n.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${n.winnerId&&n.winnerId.toString()===Q?.toString()?"VICTORY!":n.status==="draw"?"STALEMATE / DRAW":`${x(n.winnerName)} Wins!`}</h4>
                  <p>Reason: ${x(n.winningReason||"Match concluded")}</p>
                </div>
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                  ${n.rematchOfferedBy&&n.rematchOfferedBy.toString()===Q?.toString()?`
                    <div class="game-pending-text" style="font-size:12px;color:var(--text-2);padding:6px 12px;background:var(--bg-surface);border-radius:var(--r-md);border:1px solid var(--border-sm);">
                      ⏳ Rematch requested. Waiting for opponent...
                    </div>
                  `:n.rematchOfferedBy?`
                    <button class="btn-arena-rematch" id="btn-arena-accept-rematch" style="background:#10b981;border-color:#10b981;">
                      ✅ Accept Rematch
                    </button>
                    <button class="btn-arena-action" id="btn-arena-decline-rematch" style="border:1px solid var(--border-sm);">
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
          </div>
        </div>
      `,me(ve,De,Ce)}function se(Q){const De=n.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Ce=new ka(De),pe=Q?n.player1.assignedRole==="white":n.player2.assignedRole==="white",ve={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},Ie=pe?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],ze=pe?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Ke='<div class="chess-board-grid">';for(const qe of ze)for(const oe of Ie){const _e=`${oe}${qe}`,Re=Ce.get(_e),Ve=(oe.charCodeAt(0)-97+qe)%2!==0,ke=i===_e,M=$.includes(_e),W=Re?Re.color==="w"?ve[Re.type.toUpperCase()]:ve[Re.type]:"";Ke+=`
            <div class="chess-sq ${Ve?"light":"dark"} ${ke?"selected":""} ${M?"legal-dot":""}" data-square="${_e}">
              ${W?`<span class="chess-piece ${Re.color==="w"?"white-piece":"black-piece"}">${W}</span>`:""}
            </div>
          `}Ke+="</div>";const Oe=(n.moves||[]).map(qe=>`
        <span class="chess-move-token">${qe.moveNum}. ${qe.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${Ke}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${Oe||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function ue(){const Q=n.gameState?.board||Array(9).fill(null),De=n.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${Q.map((Ce,pe)=>{const ve=De.includes(pe);return`
                <div class="ttt-cell ${Ce?"filled":"empty"} ${ve?"win-cell":""}" data-cell-idx="${pe}">
                  ${Ce==="X"?'<span class="ttt-x">✕</span>':Ce==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function be(Q,De,Ce){const pe=n.gameState||{},ve=pe.activeColors||["red","green"],Ie=pe.players||[{...n.player1,color:"red",assignedRole:"red",isBot:!1},{...n.player2,color:"green",assignedRole:"green",isBot:!1}],ze=pe.tokens||{},Ke=q=>{const X=ze[q]||(q==="red"?pe.p1Tokens:q==="green"?pe.p2Tokens:[])||[];return Array.from({length:4},(b,I)=>X[I]||{id:I,step:-1})},He=Ke("red"),Oe=Ke("green"),qe=Ke("yellow"),oe=Ke("blue"),_e=e?._id||e?.id,Ve=(Ie.find(q=>q.userId&&q.userId.toString()===_e?.toString())||Ie[0])?.color||(Q?"red":"green"),ke=pe.turnColor||n.turn||"red",M=Ve===ke&&n.status==="active",W=!!pe.rolled,m=pe.dice,fe=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],he=[[7,1],[7,2],[7,3],[7,4],[7,5]],at=[[1,7],[2,7],[3,7],[4,7],[5,7]],U=[[7,13],[7,12],[7,11],[7,10],[7,9]],Te=[[13,7],[12,7],[11,7],[10,7],[9,7]],xe=[0,8,13,21,26,34,39,47];function Be(q,X){return X<0?null:X>=56?q==="red"?[7,6]:q==="green"?[6,7]:q==="yellow"?[7,8]:[8,7]:q==="red"?X<=50?fe[X]:he[X-51]:q==="green"?X<=50?fe[(13+X)%52]:at[X-51]:q==="yellow"?X<=50?fe[(26+X)%52]:U[X-51]:X<=50?fe[(39+X)%52]:Te[X-51]}function Ye(q,X){return q!==Ve||!M||!W||!m||n.status!=="active"?!1:X.step===-1?m===6:X.step>=0&&X.step+m<=56}const Se={},nt=(q,X)=>{X.forEach(b=>{if(b.step>=0&&b.step<56){const I=Be(q,b.step);if(I){const _=I[0]+","+I[1];(Se[_]=Se[_]||[]).push({color:q,id:b.id,step:b.step,movable:Ye(q,b)})}}})};ve.includes("red")&&nt("red",He),ve.includes("green")&&nt("green",Oe),ve.includes("yellow")&&nt("yellow",qe),ve.includes("blue")&&nt("blue",oe);const Dt={};fe.forEach(([q,X],b)=>{Dt[q+","+X]=b});const ae={};he.forEach(([q,X],b)=>{ae[q+","+X]=b+1});const Nt={};at.forEach(([q,X],b)=>{Nt[q+","+X]=b+1});const Et={};U.forEach(([q,X],b)=>{Et[q+","+X]=b+1});const jt={};Te.forEach(([q,X],b)=>{jt[q+","+X]=b+1});const Tt=[];for(let q=0;q<15;q++)for(let X=0;X<15;X++){if(q<6&&X<6||q<6&&X>8||q>8&&X<6||q>8&&X>8||q>=6&&q<=8&&X>=6&&X<=8)continue;const b=q+","+X,I=Dt[b],_=I!==void 0&&xe.includes(I),ee=q===6&&X===1,te=q===1&&X===8,ce=q===8&&X===13,it=q===13&&X===6,_t=ae[b],Sa=Nt[b],Ca=Et[b],Ia=jt[b];let pt="ludo-cell";ee?pt+=" cell-red-start":te?pt+=" cell-green-start":ce?pt+=" cell-yellow-start":it?pt+=" cell-blue-start":_t?pt+=" cell-red-stretch":Sa?pt+=" cell-green-stretch":Ca?pt+=" cell-yellow-stretch":Ia?pt+=" cell-blue-stretch":_&&(pt+=" cell-safe-star");const _a=Se[b]||[];Tt.push(`
            <div class="${pt}" style="grid-row:${q+1};grid-column:${X+1}" data-pos="${b}">
              ${_?'<span class="cell-star-glyph">⭐</span>':""}
              ${ee||te||ce||it?'<span class="cell-arrow-glyph">➔</span>':""}
              ${_a.map(vt=>`
                <div class="ludo-token token-${vt.color} ${vt.movable?"movable":""}" data-token-id="${vt.id}" data-color="${vt.color}" title="${vt.color.toUpperCase()} Pawn ${vt.id+1}">
                  <span>${vt.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function Zt(q){const X=Math.max(1,Math.min(6,Number(q)||1));return`
          <div class="ludo-direct-number-box num-${X}" role="img" aria-label="Number ${X}">
            <span class="ludo-direct-num">${X}</span>
          </div>
        `}function St(q,X,b,I,_){const ee=`${q}-yard`;if(!b)return`
            <div class="ludo-yard ${ee}">
              <div class="yard-box decorative">
                <div class="yard-title">${X} (Inactive)</div>
              </div>
            </div>
          `;const te=_.filter(ce=>ce.step===56).length;return`
          <div class="ludo-yard ${ee} ${ke===q?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${X}</span>
                ${te>0?`<span class="yard-home-badge" title="${te} of 4 pawns reached Home!">👑 ${te}/4 Home</span>`:""}
                ${I?`<small class="yard-player-lbl">${x(I.name)}${I.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${_.map((ce,it)=>`
                  <div class="yard-token-slot ${ce.step===56?"slot-home":""}">
                    ${ce.step===-1?`
                      <div class="ludo-token token-${q} ${Ye(q,ce)?"movable":""}" data-token-id="${ce.id}" data-color="${q}" title="${q.toUpperCase()} Pawn ${ce.id+1}">
                        <span>${ce.id+1}</span>
                      </div>
                    `:ce.step===56?`
                      <div class="ludo-token token-reached-home token-${q}" title="${q.toUpperCase()} Pawn ${ce.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${ce.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${it+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Ot=Ie.find(q=>q.color==="red"),Pt=Ie.find(q=>q.color==="green"),Ut=Ie.find(q=>q.color==="yellow"),ea=Ie.find(q=>q.color==="blue"),Ht=Ie.find(q=>q.color===ke)||(ke==="red"?Ot:Pt),Ct=Ht?x(Ht.name):ke.toUpperCase(),Gt={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[ke]||"🔴",gt=m||pe.lastRoll||6,It=M&&!W&&n.status==="active",Ft=Ke(Ve).filter(q=>Ye(Ve,q));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${St("red","🔴 Red Base",ve.includes("red"),Ot,He)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${St("green","🟢 Green Base",ve.includes("green"),Pt,Oe)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${St("blue","🔵 Blue Base",ve.includes("blue"),ea,oe)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${St("yellow","🟡 Yellow Base",ve.includes("yellow"),Ut,qe)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${He.filter(q=>q.step===56).map(q=>`<div class="home-tri-pawn red" title="Red Pawn ${q.id+1} Home! 👑">👑${q.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${Oe.filter(q=>q.step===56).map(q=>`<div class="home-tri-pawn green" title="Green Pawn ${q.id+1} Home! 👑">👑${q.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${qe.filter(q=>q.step===56).map(q=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${q.id+1} Home! 👑">👑${q.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${oe.filter(q=>q.step===56).map(q=>`<div class="home-tri-pawn blue" title="Blue Pawn ${q.id+1} Home! 👑">👑${q.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...He.filter(q=>q.step===56).map(q=>({col:"red",id:q.id})),...Oe.filter(q=>q.step===56).map(q=>({col:"green",id:q.id})),...qe.filter(q=>q.step===56).map(q=>({col:"yellow",id:q.id})),...oe.filter(q=>q.step===56).map(q=>({col:"blue",id:q.id}))].map(q=>`
                    <div class="tok-home-champion ${q.col}" title="${q.col.toUpperCase()} Pawn ${q.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${q.id+1}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Tt.join("")}
          </div>

          <!-- Ludo Action & Interactive Dice Console -->
          <div class="ludo-interactive-console">
            <div class="ludo-dice-interactive-box">
              <div 
                class="ludo-3d-dice ${It?"clickable":""} ${W?"just-rolled":""} border-${ke}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${It?"0":"-1"}"
                title="${It?"Tap dice to roll!":M?"Choose a pawn to move":`${Ct}'s turn`}"
                style="${It?"cursor:pointer;touch-action:manipulation;":""}"
              >
                ${Zt(gt)}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${ke}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${Ct}</strong> (${ke.toUpperCase()})
                </span>
                ${M?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${M&&W?"highlight":""}">
                ${M&&!W&&n.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":M&&W&&n.status==="active"?Ft.length>0?Ft.length===1?`🎲 Rolled <strong>${gt}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${gt}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${gt}</strong>. No legal moves possible — turn passing...`:n.status==="active"?W||pe.lastRoll?`🎲 ${Gt} <strong>${Ct}</strong> rolled <strong>${gt}</strong>!`:`⏳ Waiting for <strong>${Ct}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${x(pe.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function me(Q,De,Ce){p.querySelector("#btn-close-arena").onclick=ie;const pe=p.querySelector("#btn-arena-resign");pe&&(pe.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{pe.disabled=!0,await we(`/bonding/matches/${s}/action`,{action:"resign"}),await G(),Z()}catch(oe){k(oe.message||"Resign failed","error"),pe.disabled=!1}});const ve=p.querySelector("#btn-arena-draw");ve&&(ve.onclick=async()=>{try{await we(`/bonding/matches/${s}/action`,{action:"offer_draw"}),k("Draw offer sent to opponent","info"),await G(),Z()}catch(oe){k(oe.message||"Draw offer failed","error")}});const Ie=p.querySelector("#btn-confirm-accept-draw");Ie&&(Ie.onclick=async()=>{try{await we(`/bonding/matches/${s}/action`,{action:"accept_draw"}),k("Draw agreed!","info"),await G(),Z()}catch(oe){k(oe.message,"error")}});const ze=p.querySelector("#btn-confirm-decline-draw");ze&&(ze.onclick=async()=>{try{await we(`/bonding/matches/${s}/action`,{action:"decline_draw"}),await G(),Z()}catch(oe){k(oe.message,"error")}}),[p.querySelector("#btn-arena-delete-match"),p.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(oe=>{oe.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{oe.disabled=!0,await Ze(`/bonding/matches/${s}`),k("Match deleted","success"),ie(),v==="lounge_games"&&await h()}catch(_e){k(_e.message||"Failed to delete match","error"),oe.disabled=!1}}});const He=p.querySelector("#btn-arena-rematch-action");He&&(He.onclick=async()=>{try{He.disabled=!0,He.textContent="Requesting...";const oe=await we(`/bonding/matches/${s}/action`,{action:"rematch_request"});oe.match&&(n=oe.match,z=L(oe.match),Z(),k("Rematch request sent! Waiting for opponent ⚔️","info"))}catch(oe){k(oe.message||"Rematch request failed","error"),He.disabled=!1,He.textContent="🔄 Request Rematch"}});const Oe=p.querySelector("#btn-arena-accept-rematch");Oe&&(Oe.onclick=async()=>{try{Oe.disabled=!0,Oe.textContent="Starting...";const oe=await we(`/bonding/matches/${s}/action`,{action:"rematch_accept"});oe.match&&(n=oe.match,z=L(oe.match),k("Rematch started! Same game is live ⚔️","success"),Z())}catch(oe){k(oe.message||"Could not accept rematch","error"),Oe.disabled=!1}});const qe=p.querySelector("#btn-arena-decline-rematch");if(qe&&(qe.onclick=async()=>{try{await we(`/bonding/matches/${s}/action`,{action:"rematch_decline"}),k("Rematch declined","info"),ie()}catch{ie()}}),n.gameType==="chess"&&Q&&n.status==="active"){const oe=n.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",_e=new ka(oe),Re=Ce.assignedRole==="white"?"w":"b";p.querySelectorAll(".chess-sq").forEach(Ve=>{Ve.onclick=async()=>{const ke=Ve.dataset.square;if(i){if(i===ke){i=null,$=[],Z();return}if($.includes(ke)){const W=_e.get(i);let m;W&&W.type==="p"&&(ke.endsWith("8")||ke.endsWith("1"))&&(m=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const fe={from:i,to:ke,promotion:m?m.toLowerCase():void 0};i=null,$=[],n=await we(`/bonding/matches/${s}/move`,{move:fe}),Z()}catch(fe){k(fe.message||"Illegal chess move","error"),i=null,$=[],Z()}return}}const M=_e.get(ke);M&&M.color===Re?(i=ke,$=_e.moves({square:ke,verbose:!0}).map(m=>m.to),Z()):(i=null,$=[],Z())}})}if(n.gameType==="tictactoe"&&Q&&n.status==="active"&&p.querySelectorAll(".ttt-cell.empty").forEach(oe=>{oe.onclick=async()=>{const _e=oe.dataset.cellIdx;try{oe.style.opacity="0.5",n=await we(`/bonding/matches/${s}/move`,{cellIndex:Number(_e)}),Z()}catch(Re){k(Re.message||"Invalid move","error")}}}),n.gameType==="ludo"&&n.status==="active"){const oe=n.gameState||{},_e=!!oe.rolled,Re=oe.turnColor||n.turn||"red",Ve=e?._id||e?.id,ke=oe.players||[{...n.player1,color:"red",assignedRole:"red",isBot:!1},{...n.player2,color:"green",assignedRole:"green",isBot:!1}],M=Ve&&n.player1.userId.toString()===Ve.toString(),m=(ke.find(Te=>Te.userId&&Te.userId.toString()===Ve?.toString())||(M?ke[0]:ke[1]))?.color||(M?"red":"green"),fe=m===Re&&n.status==="active",he=ke.find(Te=>Te.color===Re)||(Re==="red"?n.player1:n.player2),at=x(he?.name||(Re==="red"?"Player 1":"Player 2")),U=p.querySelector("#btn-interactive-ludo-dice");if(U){const Te=async xe=>{if(xe&&(xe.preventDefault(),xe.stopPropagation()),!fe){k(`${at}'s turn right now`,"info");return}if(_e){k("Dice already rolled! Tap your glowing pawn to move.","info");return}if(n.status!=="active"){k("Match has ended","info");return}if(ne||U.dataset.rolling==="true")return;ne=!0,K=Date.now(),U.dataset.rolling="true",U.classList.add("rolling");let Be=0;const Ye=setInterval(()=>{Be++;const Se=Math.floor(Math.random()*6)+1;U.innerHTML=renderNumberDisplay(Se),Be>=4&&clearInterval(Ye)},50);try{const Se=await we(`/bonding/matches/${s}/move`,{action:"roll"});clearInterval(Ye),n=Se,z=L(Se),Z()}catch(Se){clearInterval(Ye),k(Se.message||"Failed to roll dice","error"),U&&(delete U.dataset.rolling,U.classList.remove("rolling"))}finally{ne=!1}};U.onclick=Te,U.onkeydown=xe=>{(xe.key==="Enter"||xe.key===" ")&&(xe.preventDefault(),Te(xe))}}if(fe&&_e){const xe=(oe.tokens||{})[m]||[],Be=oe.dice||oe.lastRoll||0,Ye=xe.filter(Se=>Se.step===-1&&Be===6||Se.step>=0&&Se.step+Be<=56);if(Ye.length===1&&!V){V=!0;const Se=Ye[0];C&&clearTimeout(C),C=setTimeout(async()=>{try{const nt=await we(`/bonding/matches/${s}/move`,{action:"move",tokenId:Number(Se.id)});n=nt,z=L(nt),V=!1,Z()}catch(nt){V=!1,k(nt.message||"Auto-move failed","error")}},400)}}fe&&_e&&p.querySelectorAll(".ludo-token.movable").forEach(Te=>{Te.onclick=async xe=>{xe.stopPropagation();const Be=Te.dataset.tokenId;try{Te.style.opacity="0.5";const Ye=await we(`/bonding/matches/${s}/move`,{action:"move",tokenId:Number(Be)});n=Ye,z=L(Ye),Z()}catch(Ye){k(Ye.message||"Invalid token move","error"),Te.style.opacity="1"}}})}}Z()}function N(){if(!c||c.type==="direct")return;const s=l.querySelector("#bonding-modals-root"),p=K=>K==="employee"||K==="admin"||K==="superadmin",n=c.members||[],i=new Set(n.map(K=>K.userId?.toString())),$=o.filter(K=>p(K.role)&&!i.has(K._id.toString()));s.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${x(c.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${$.map(K=>`
                    <option value="${K._id}">${x(K.name)} (${x(K.role==="superadmin"?"Superadmin":K.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${$.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${$.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${n.length}):</label>
              <div class="bonding-members-list">
                ${n.map(K=>{const L=e?._id||e?.id,G=L&&K.userId&&K.userId.toString()===L.toString(),ie=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(L),Z=u==="superadmin"||e?.role==="superadmin",se=ie||Z;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(K.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${x(K.name)} ${G?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${x(K.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${G?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${K.userId}">
                            🚪 Leave Group
                          </button>
                        `:se?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${K.userId}" data-name="${x(K.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const K=e?._id||e?.id,L=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(K),G=u==="superadmin"||e?.role==="superadmin";return L||G?`
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
    `,s.querySelector(".bonding-modal-close").onclick=()=>{s.innerHTML=""};const z=s.querySelector("#btn-modal-delete-group");z&&(z.onclick=()=>{s.innerHTML="",j()});const C=s.querySelector("#btn-modal-leave-group");C&&(C.onclick=()=>{s.innerHTML="",E()}),s.querySelectorAll(".btn-leave-group-action").forEach(K=>{K.onclick=()=>{s.innerHTML="",E()}});const V=s.querySelector("#btn-submit-add-member");V&&(V.onclick=async()=>{const L=s.querySelector("#sel-add-colleague").value;if(!L){k("Please select a colleague to add","warning");return}try{V.disabled=!0,V.textContent="Adding...";const G=await Yt(`/bonding/channels/${c._id}/members`,{action:"add",userIds:[L]});k("Colleague added to group! 🎉","success"),c=G.channel,s.innerHTML="",await Ae(c._id),Le()}catch(G){k(G.message||"Failed to add member","error"),V.disabled=!1,V.textContent="Add to Group"}}),s.querySelectorAll(".btn-remove-member").forEach(K=>{K.onclick=async()=>{const L=K.dataset.userId,G=K.dataset.name;if(confirm(`Are you sure you want to remove ${G} from this group?`))try{K.disabled=!0;const ie=await Yt(`/bonding/channels/${c._id}/members`,{action:"remove",userId:L});k(`${G} removed from group`,"info"),c=ie.channel,s.innerHTML="",await Ae(c._id),Le()}catch(ie){k(ie.message||"Failed to remove member","error"),K.disabled=!1}}})}async function E(){if(!c||c.type==="direct")return;const s=c.name;if(confirm(`Are you sure you want to leave the group "${s}"?`))try{await we(`/bonding/channels/${c._id}/leave`,{}),k(`You left "${s}"`,"info"),g=await Ee("/bonding/channels").catch(()=>[]),c=g.find(n=>n.type==="group")||g[0]||null,Fe(),Le(),c&&await Ae(c._id)}catch(n){k(n.message||"Failed to leave group","error")}}async function j(){if(!c||c.type==="direct")return;const s=c.name;if(confirm(`Are you sure you want to delete the group "${s}"?

All messages in this lounge will be deleted.`))try{await Ze(`/bonding/channels/${c._id}`),k(`Group "${s}" deleted successfully`,"success"),g=await Ee("/bonding/channels").catch(()=>[]),c=g.find(n=>n.type==="group")||g[0]||null,Fe(),Le(),c&&await Ae(c._id)}catch(n){k(n.message||"Failed to delete group","error")}}function y(){const s=l.querySelector("#bonding-modals-root"),p=$=>$==="employee"||$==="admin"||$==="superadmin",n=o.filter($=>!$.isSelf&&p($.role));s.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${n.map($=>`
                <div class="bonding-user-pick-item" data-user-id="${$._id}" data-name="${x($.name)}">
                  <div class="bonding-member-avatar">${$.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${x($.name)}</span>
                    <span class="user-pick-role">${x($.role==="superadmin"?"Superadmin":$.role==="admin"?"Admin":"Employee")} · ${x($.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,s.querySelector(".bonding-modal-close").onclick=()=>{s.innerHTML=""},s.querySelectorAll(".bonding-user-pick-item").forEach($=>{$.onclick=async()=>{const z=$.dataset.userId;try{const C=await we("/bonding/channels",{type:"direct",targetUserId:z});s.innerHTML="",g=await Ee("/bonding/channels"),c=g.find(V=>V._id===C._id)||C,Fe(),Le(),await Ae(c._id)}catch(C){k(C.message||"Failed to open personal chat","error")}}})}function D(){const s=l.querySelector("#bonding-modals-root"),p=C=>C==="employee"||C==="admin"||C==="superadmin",n=o.filter(C=>!C.isSelf&&p(C.role));s.innerHTML=`
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
                ${n.map(C=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${C._id}" />
                    <span>${x(C.name)} (${x(C.role==="superadmin"?"Superadmin":C.role==="admin"?"Admin":"Employee")})</span>
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
    `,s.querySelector(".bonding-modal-close").onclick=()=>{s.innerHTML=""},s.querySelector("#btn-cancel-create-grp").onclick=()=>{s.innerHTML=""};let i="👥";const $=s.querySelectorAll(".avatar-opt");$.forEach(C=>{C.onclick=()=>{$.forEach(V=>V.classList.remove("active")),C.classList.add("active"),i=C.textContent.trim()}});const z=s.querySelector("#btn-confirm-create-grp");z.onclick=async()=>{const C=s.querySelector("#new-group-name"),V=s.querySelector("#new-group-desc"),ne=C.value.trim();if(!ne){k("Please enter a group name","warning"),C.focus();return}const K=s.querySelectorAll(".new-group-member-chk:checked"),L=Array.from(K).map(G=>G.value);try{z.disabled=!0,z.textContent="Creating...";const G=await we("/bonding/channels",{type:"group",name:ne,description:V.value.trim(),avatar:i,memberIds:L});k(`Group "${ne}" created! 🎉`,"success"),s.innerHTML="",g=await Ee("/bonding/channels"),c=g.find(ie=>ie._id===G._id)||G,Fe(),Le(),await Ae(c._id)}catch(G){k(G.message||"Failed to create group","error"),z.disabled=!1,z.textContent="Create Group 🎉"}}}function J(s,p){const n=document.querySelector(".bonding-emoji-popup");n&&n.remove();const i=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],$=document.createElement("div");$.className="bonding-emoji-popup",$.innerHTML=i.map(V=>`<button class="emoji-opt-btn" data-e="${V}">${V}</button>`).join("");const z=s.getBoundingClientRect();$.style.top=`${z.bottom+window.scrollY+6}px`,$.style.left=`${z.left+window.scrollX}px`,document.body.appendChild($),$.querySelectorAll(".emoji-opt-btn").forEach(V=>{V.onclick=ne=>{ne.stopPropagation(),p(V.dataset.e),$.remove()}});const C=V=>{$.contains(V.target)||($.remove(),document.removeEventListener("click",C))};setTimeout(()=>document.addEventListener("click",C),10)}function S(s){if(!s)return"";try{return new Date(s).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function tn(){const l=document.getElementById("ci360-bonding-styles");l&&l.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      padding: 14px 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-nav-bar {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
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
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
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
      color: #6366f1;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }

    [data-theme="dark"] .bonding-view-tab.active {
      background: #0f172a;
      color: #818cf8;
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
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      box-shadow: 0 3px 8px rgba(99, 102, 241, 0.3);
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
      color: #6366f1;
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
      background: rgba(99, 102, 241, 0.1);
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
      background: rgba(99, 102, 241, 0.12);
      border-left: 3px solid #6366f1;
    }

    [data-theme="dark"] .bonding-channel-item.active {
      background: rgba(99, 102, 241, 0.22);
      border-left-color: #818cf8;
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
      background: rgba(99, 102, 241, 0.1);
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
      background: rgba(99, 102, 241, 0.12);
      border-color: #818cf8;
      color: #6366f1;
    }

    [data-theme="dark"] .bonding-header-btn.challenge-highlight {
      background: rgba(99, 102, 241, 0.25);
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
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
    }

    .bonding-msg-system {
      align-self: center;
      background: rgba(99, 102, 241, 0.08);
      color: #4f46e5;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin: 4px 0;
    }

    [data-theme="dark"] .bonding-msg-system {
      background: rgba(99, 102, 241, 0.2);
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
      background: rgba(99, 102, 241, 0.12);
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
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
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
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.12);
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
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
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
      border-color: #6366f1;
    }

    .game-card-icon {
      font-size: 34px;
      width: 54px;
      height: 54px;
      border-radius: 14px;
      background: rgba(99, 102, 241, 0.12);
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
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
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
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
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
      border: 1px solid #6366f1;
      background: transparent;
      color: #6366f1;
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
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.12);
      color: #6366f1;
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
      background: rgba(99, 102, 241, 0.12);
      border-left: 3px solid #6366f1;
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
      background: #6366f1;
      color: #ffffff;
      border-color: #6366f1;
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
      background: rgba(99, 102, 241, 0.08);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 10px;
      padding: 12px;
      font-size: 12.5px;
    }

    .confirm-head {
      font-weight: 700;
      margin-bottom: 6px;
      color: #6366f1;
    }

    .confirm-body {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* =========================================================================
       LIVE GAME ARENA MODAL & BOARDS (CHESS, TIC-TAC-TOE, CONNECT FOUR)
       ========================================================================= */
    /* =========================================================================
       LIVE GAME ARENA MODAL & BOARDS (CHESS, TIC-TAC-TOE, CONNECT FOUR)
       ========================================================================= */
    .game-arena-modal {
      width: 660px;
      max-width: 95vw;
      padding: 24px;
      position: relative;
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 20px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.22);
    }

    [data-theme="dark"] .game-arena-modal {
      background: #0f172a;
      border-color: #1e293b;
      box-shadow: 0 25px 60px rgba(0,0,0,0.7);
    }

    /* Dedicated Top-Right Close Button */
    .arena-close-btn {
      position: absolute;
      top: 18px;
      right: 18px;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(0,0,0,0.06);
      border: none;
      color: var(--text-3, #94a3b8);
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

    [data-theme="dark"] .arena-close-btn {
      background: rgba(255,255,255,0.08);
      color: #94a3b8;
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
      background: rgba(99, 102, 241, 0.1);
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
      background: rgba(99, 102, 241, 0.12);
      color: #6366f1;
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
      background: rgba(99, 102, 241, 0.12);
      color: #6366f1;
      border: 1px solid #818cf8;
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
      border-color: #6366f1;
      transform: scale(1.04);
      box-shadow: 0 6px 18px rgba(99, 102, 241, 0.25);
    }

    [data-theme="dark"] .ttt-cell.empty:hover {
      background: #1e2a42;
      border-color: #818cf8;
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
      color: #4f46e5;
      filter: drop-shadow(0 2px 4px rgba(79, 70, 229, 0.3));
    }

    [data-theme="dark"] .ttt-x {
      color: #818cf8;
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
      background: #4f46e5;
      color: #ffffff;
      transform: translateY(3px);
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
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
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
      border: 1px solid #818cf8;
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
      color: #4f46e5;
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
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 3px 10px rgba(99, 102, 241, 0.3);
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
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
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
      color: #6366f1;
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
      background: rgba(99, 102, 241, 0.1);
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
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.12);
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
  `,document.head.appendChild(t)}function wa(l){if(!l)return"";const t=x(l),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return t.replace(e,u=>`<a href="${u}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${u} ↗</a>`)}const da=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],kt=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],zt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function rn(l,t={}){const{userRole:e="employee",currentUser:u=null,initialTicketId:v=null}=t,g=e==="superadmin"||e==="admin";if(e==="client"||u&&u.role==="client"){l.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let c=[],o={},R=[],Y=[],A={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},F=null,H="comments",O=!1;l.innerHTML=`
    <div class="ci-360-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="ci-360-header-bar">
        <div class="ci-360-header-left">
          <div class="ci-360-breadcrumb">
            <span class="ci-360-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${g?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="ci-360-title-row">
            <h2 class="ci-360-main-title">🎫 ${g?"Support Tickets Board":"Support Tickets"}</h2>
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
            ${kt.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
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
  `,await Promise.all([et(),We(),dt(),$t()]),ot(),rt(),Ae(),Le(),v&&st(v);const ge=setInterval(()=>{if(!document.contains(l)){clearInterval(ge);return}!(l.querySelector(".dragging")||l.querySelector("input:focus")||l.querySelector("textarea:focus"))&&!F&&de()},12e3),$e=()=>{document.contains(l)&&!F&&de()};window.addEventListener("focus",$e);async function We(){try{const a=new URLSearchParams;A.search&&a.set("search",A.search),A.priority!=="all"&&a.set("priority",A.priority),A.category!=="all"&&a.set("category",A.category),A.assigneeId!=="all"&&a.set("assigneeId",A.assigneeId),A.jobId&&A.jobId!=="all"&&a.set("jobId",A.jobId),A.reporterId&&A.reporterId!=="all"&&a.set("reporterId",A.reporterId),A.scope==="created"&&a.set("reporterId",u?._id||u?.id),A.scope==="assigned"&&a.set("assigneeId",u?._id||u?.id),A.myIssuesOnly&&a.set("myIssuesOnly","true");const r=await Ee("/tickets?"+a.toString());c=Array.isArray(r)?r:[]}catch(a){k(a.message||"Failed to load tickets",!0),c=[]}}async function et(){try{o=await Ee("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function dt(){try{let a;try{a=await Ee("/tickets/staff")}catch{a=await Ee("/users")}R=(a||[]).filter(r=>r.active!==!1&&r.role!=="client")}catch(a){console.warn("Could not fetch employees:",a),R=[]}}async function $t(){try{const a=await Ee("/jobs?limit=250");Y=Array.isArray(a)?a:a?.jobs||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function ot(){const a=l.querySelector("#ci-360-stats-root");a&&(a.innerHTML=`
      <div class="ci-360-stat-card ${A.status==="all"&&!A.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="ci-360-stat-val">${o.total||0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${A.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${o.toDo||0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${A.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${o.content??(o.inProgress||0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${A.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${o.design||0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${A.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${o.underReview||0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${A.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
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
    `,a.querySelectorAll(".ci-360-stat-card").forEach(r=>{r.onclick=async()=>{const f=r.dataset.statFilter;f==="all"?(A.status="all",A.priority="all"):f==="critical"?(A.priority="Critical",A.status="all"):(A.status=f,A.priority="all"),await de()}}))}function Ae(){const a=l.querySelector("#ci-360-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${R.map(f=>`
          <option value="${f._id}" ${A.assigneeId===f._id.toString()?"selected":""}>
            ${x(f.name)} (${x(f.role)})
          </option>
        `).join("")}
      `);const r=l.querySelector("#ci-360-filter-job");r&&(r.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${Y.map(f=>`
          <option value="${f._id}" ${A.jobId===f._id.toString()?"selected":""}>
            📁 ${x(f.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function rt(){const a=l.querySelector("#ci-360-board-columns-root");if(!a)return;const r={};da.forEach(f=>{r[f.key]=[]}),c.forEach(f=>{let h=f.status||"To Do";h==="In Progress"?h="Content":h==="Resolved"?h="Under Review":h==="Closed"&&(h="Ready to Leave"),r[h]||(r[h]=[]),r[h].push(f)}),a.innerHTML=da.map(f=>{const h=r[f.key]||[];return`
        <div class="ci-360-board-column" data-status="${f.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${x(f.label)}</span>
              <span class="ci-360-col-badge">${h.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${f.key}">
            ${h.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:h.map(T=>bt(T)).join("")}
          </div>
        </div>
      `}).join(""),Fe(),ut()}function bt(a){const r=kt.find(D=>D.key===a.category)||kt[0],f=zt.find(D=>D.key===a.priority)||zt[2],h=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",T=(a.subtasks||[]).filter(D=>D.completed).length,B=(a.subtasks||[]).length,w=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],P=u?._id||u?.id,N=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(P)||a.userId&&String(a.userId)===String(P),E=e==="superadmin"||u?.role==="superadmin",j=N||E;let y="";if(w.length===0)y='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const D=w.slice(0,3),J=w.length-3;y=`
        <div class="ci-360-avatar-group">
          ${D.map(S=>`
            <div class="ci-360-avatar" title="Assignee: ${x(S.name||"Member")} (${x(S.role||"")})">
              ${(S.avatar||S.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${J>0?`
            <div class="ci-360-avatar extra-count" title="${J} more assignees: ${x(w.slice(3).map(S=>S.name).join(", "))}">
              +${J}
            </div>
          `:""}
        </div>
      `}return`
      <div class="ci-360-card" draggable="true" data-ticket-id="${a._id}">
        <div class="ci-360-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="ci-360-category-pill ${r.slug}">
              ${r.icon} ${r.label}
            </span>
            ${N?`
              <span class="ci-360-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${a.dueDate?`
              <span class="ci-360-due-pill ${h?"overdue":""}" title="Due Date">
                ${h?"⚠️ ":"📅 "}
                ${new Date(a.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          ${j?`
            <button type="button" class="ci-360-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${x(a.ticketId)}" title="Delete Ticket (${E?"Superadmin":"Creator"})">
              🗑️
            </button>
          `:""}
        </div>

        <div class="ci-360-card-title" title="${x(a.title)}">
          ${x(a.title)}
        </div>

        ${a.jobTitle||a.jobId&&a.jobId.title?`
          <div class="ci-360-card-job-link" title="Linked Internal Job: ${x(a.jobTitle||a.jobId.title)}">
            📁 ${x(a.jobTitle||a.jobId.title)}
          </div>
        `:""}

        ${a.linkUrl||a.links&&a.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${x(a.linkUrl||a.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${x(a.linkUrl||a.links[0]?.url)}">
              🔗 ${a.links&&a.links[0]?.title?x(a.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="ci-360-card-bottom">
          <div class="ci-360-card-id-row">
            <span class="ci-360-pri-icon" title="Priority: ${f.label}">${f.icon}</span>
            <span class="ci-360-ticket-id">${x(a.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${B>0?`
              <span class="ci-360-subtask-badge" title="${T} of ${B} subtasks completed">
                ☑ ${T}/${B}
              </span>
            `:""}
            ${y}
          </div>
        </div>
      </div>
    `}function Fe(){const a=l.querySelectorAll(".ci-360-card"),r=l.querySelectorAll(".ci-360-board-column");a.forEach(f=>{f.ondragstart=h=>{h.dataTransfer.setData("text/plain",f.dataset.ticketId),f.classList.add("dragging")},f.ondragend=()=>{f.classList.remove("dragging")}}),r.forEach(f=>{f.ondragover=h=>{h.preventDefault(),f.classList.add("drag-over")},f.ondragleave=()=>{f.classList.remove("drag-over")},f.ondrop=async h=>{h.preventDefault(),f.classList.remove("drag-over");const T=h.dataTransfer.getData("text/plain"),B=f.dataset.status;if(!T||!B)return;const w=c.find(j=>j._id.toString()===T);if(!w||w.status===B)return;const P=w.status,N=w.assignees?[...w.assignees]:[],E=w.assignee?{...w.assignee}:null;if(w.status=B,B==="Under Review"){const j={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};w.assignee=j,w.assignees=[j]}rt();try{const j=await Xe(`/tickets/${T}/status`,{status:B}),y=B==="Under Review"?`Moved ${j.ticketId} to Under Review (Default assigned to John)`:`Moved ${j.ticketId} to ${B}`;k(y,!1),await de()}catch(j){k(j.message||"Status update failed",!0),w.status=P,w.assignees=N,w.assignee=E,await de()}}})}function ut(){l.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async r=>{r.stopPropagation(),r.preventDefault();const f=a.dataset.ticketId,h=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${h}?`)){a.disabled=!0;try{await Ze(`/tickets/${f}`),k(`Ticket ${h} deleted`,!1),await de()}catch(T){k(T.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),l.querySelectorAll(".ci-360-card").forEach(a=>{a.onclick=r=>{if(r.target.tagName==="A"||r.target.closest(".btn-delete-card-ticket"))return;const f=a.dataset.ticketId;st(f)}})}function Le(){const a=l.querySelector("#btn-ci-360-refresh");a&&(a.onclick=async()=>{await de(),k("Board updated",!1)});const r=l.querySelector("#btn-ci-360-create-ticket");r&&(r.onclick=()=>{d()});const f=l.querySelector("#ci-360-search-input");let h=null;f&&(f.oninput=S=>{clearTimeout(h),h=setTimeout(async()=>{A.search=S.target.value.trim(),Me(),await de()},300)});const T=l.querySelector("#ci-360-filter-priority");T&&(T.onchange=async S=>{A.priority=S.target.value,Me(),await de()});const B=l.querySelector("#ci-360-filter-category");B&&(B.onchange=async S=>{A.category=S.target.value,Me(),await de()});const w=l.querySelector("#ci-360-filter-job");w&&(w.onchange=async S=>{A.jobId=S.target.value,Me(),await de()});const P=l.querySelector("#ci-360-filter-assignee");P&&(P.onchange=async S=>{A.assigneeId=S.target.value,Me(),await de()});const N=l.querySelector("#ci-360-pill-my-issues");N&&(N.onclick=async()=>{A.myIssuesOnly=!A.myIssuesOnly,N.classList.toggle("active",A.myIssuesOnly),Me(),await de()});const E=l.querySelector("#ci-360-pill-scope-all"),j=l.querySelector("#ci-360-pill-scope-assigned"),y=l.querySelector("#ci-360-pill-scope-created"),D=async S=>{A.scope=S,E&&E.classList.toggle("active",S==="all"),j&&j.classList.toggle("active",S==="assigned"),y&&y.classList.toggle("active",S==="created"),Me(),await de()};E&&(E.onclick=()=>D("all")),j&&(j.onclick=()=>D("assigned")),y&&(y.onclick=()=>D("created"));const J=l.querySelector("#ci-360-clear-filters");J&&(J.onclick=async()=>{A={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},f&&(f.value=""),T&&(T.value="all"),B&&(B.value="all");const S=l.querySelector("#ci-360-filter-job");S&&(S.value="all"),P&&(P.value="all"),N&&N.classList.remove("active"),E&&E.classList.add("active"),j&&j.classList.remove("active"),y&&y.classList.remove("active"),Me(),await de()})}function Me(){const a=l.querySelector("#ci-360-clear-filters");if(!a)return;const r=A.search||A.priority!=="all"||A.category!=="all"||A.jobId&&A.jobId!=="all"||A.assigneeId!=="all"||A.myIssuesOnly||A.scope&&A.scope!=="all";a.style.display=r?"inline":"none"}async function de(){await We(),rt()}async function st(a){const r=l.querySelector("#ci-360-modals-root");if(r){r.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{F=await Ee(`/tickets/${a}`)}catch(f){k(f.message||"Could not load ticket",!0),r.innerHTML="";return}ye()}}function ye(){const a=l.querySelector("#ci-360-modals-root");if(!a||!F)return;const r=F,f=kt.find(i=>i.key===r.category)||kt[0];zt.find(i=>i.key===r.priority)||zt[2];const h=r.subtasks||[],T=h.filter(i=>i.completed).length,B=h.length>0?Math.round(T/h.length*100):0,w=r.attachments||[],P=r.comments||[],N=(r.history||[]).slice().reverse(),E=r.workLogs||[],j=r.linkedTickets||[],y=u?._id||u?.id,D=r.reporter&&r.reporter.userId&&String(r.reporter.userId)===String(y)||r.userId&&String(r.userId)===String(y),J=e==="superadmin"||u?.role==="superadmin",S=D||J,s=Array.isArray(r.assignees)&&r.assignees.length>0?r.assignees:r.assignee&&r.assignee.userId?[r.assignee]:[];s.some(i=>i&&i.userId&&String(i.userId)===String(y));const p=r.jobId?._id?r.jobId._id.toString():r.jobId?r.jobId.toString():"",n=r.jobTitle||r.jobId&&r.jobId.title||"";a.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${f.slug}">${f.icon} ${f.label}</span>
              <span class="ci-360-ticket-id" style="font-size:13px;color:#38bdf8;">${x(r.ticketId)}</span>
            </div>
            <button class="ci-360-modal-close" id="btn-close-ci-360-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="ci-360-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="ci-360-detail-main">
              <!-- Issue Title Header -->
              <div class="ci-360-issue-header-wrap">
                <input type="text" class="ci-360-editable-title" id="inp-detail-title" value="${x(r.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Description</span>
                  <button type="button" class="ci-360-tool-btn" id="btn-toggle-desc-edit">
                    ${O?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${O?`
                  <div class="ci-360-editor-toolbar">
                    <button type="button" class="ci-360-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="ci-360-desc-editor" rows="6">${x(r.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-ci-360-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="ci-360-desc-wrap" id="view-detail-desc">
                    ${r.description?wa(r.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>🔗 Reference &amp; External Links (${(r.links||[]).length+(r.linkUrl&&!(r.links||[]).some(i=>i.url===r.linkUrl)?1:0)})</span>
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
                    ${r.linkUrl&&!(r.links||[]).some(i=>i.url===r.linkUrl)?`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${x(r.linkUrl)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${x(r.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${x(r.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${x(r.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    `:""}
                    ${(r.links||[]).map(i=>`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${x(i.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${x(i.title||i.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${i.title?`<span style="word-break:break-all;">${x(i.url)}</span> · `:""}Added by ${x(i.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${x(i.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${x(i.url)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${i.id}" title="Remove Link">&times;</button>
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
                  <span>Attachments (${w.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${w.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${w.map(i=>{const $=i.type&&i.type.includes("video")||i.name&&i.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||i.url&&i.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="ci-360-att-card ${$?"is-video":""}" style="${$?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${$?"16px":"13px"};">${$?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${i.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${x(i.name)}">
                                  ${x(i.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${ga(i.size)} ${$?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${$?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${i.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${i.url}" download="${x(i.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${i.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${$?`
                            <div class="ci-360-video-slot" id="video-slot-${i.id}" style="display:none;margin-top:6px;width:100%;">
                              <video controls preload="metadata" style="width:100%;max-height:360px;border-radius:6px;background:#000;">
                                <source src="${i.url}" type="${i.type||"video/mp4"}">
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
                  <span>Subtasks (${T}/${h.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${B}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${B}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${h.map(i=>`
                    <div class="ci-360-subtask-item">
                      <div class="ci-360-subtask-left">
                        <input type="checkbox" class="ci-360-subtask-cb cb-subtask-toggle" data-subtask-id="${i.id}" ${i.completed?"checked":""} />
                        <span class="ci-360-subtask-title ${i.completed?"done":""}">${x(i.title)}</span>
                      </div>
                      <button type="button" class="ci-360-att-del btn-del-subtask" data-subtask-id="${i.id}" title="Remove subtask">&times;</button>
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
                  <span>Linked Work Items (${j.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${j.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${j.map(i=>`
                      <div class="ci-360-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${x(i.relationship)}</span>
                          <span class="ci-360-ticket-id" style="color:#38bdf8;">${x(i.ticketId)}</span>
                          <span class="ci-360-linked-title" style="font-size:12.5px;">${x(i.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="ci-360-col-badge">${x(i.status||"Open")}</span>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${i.id}" title="Remove link">&times;</button>
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
                        <div class="ci-360-job-card-title" style="font-weight:700;font-size:13px;">${x(n)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${x(p)}</div>
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
                      ${Y.map(i=>`
                        <option value="${i._id}" ${p===i._id.toString()?"selected":""}>
                          📁 ${x(i.title||"Untitled Job")}
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
                  <button type="button" class="ci-360-act-tab ${H==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${P.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${H==="history"?"active":""}" data-act-tab="history">
                    History (${N.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${H==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${E.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${H==="comments"?`
                  <div class="ci-360-comments-feed">
                    ${P.map(i=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(i.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${x(i.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${x(i.userRole)})</span></span>
                            <span class="ci-360-comment-time">${ta(i.createdAt)}</span>
                          </div>
                          <div class="ci-360-comment-body">${wa(i.content)}</div>
                        </div>
                      </div>
                    `).join("")}

                    <!-- Add Comment Composer -->
                    <div class="ci-360-comment-composer">
                      <div class="ci-360-avatar" style="background:#3b82f6;">
                        ${(u?.name||"U").slice(0,1).toUpperCase()}
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
                ${H==="history"?`
                  <div class="ci-360-history-feed">
                    ${N.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:N.map(i=>`
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(i.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${x(i.userName)}</span>
                            <span class="ci-360-comment-time">${ta(i.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="ci-360-history-field">${x(i.field)}</strong>:
                            ${i.from?`<span style="text-decoration:line-through;color:#ef4444;">${x(i.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${x(i.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${H==="worklog"?`
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

                    ${E.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:E.map(i=>`
                      <div class="ci-360-worklog-item">
                        <div class="ci-360-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(i.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-worklog-main">
                          <div class="ci-360-worklog-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${x(i.userName)} logged <strong style="color:#38bdf8;">${x(i.timeSpent)}</strong></span>
                            <span class="ci-360-comment-time">${ta(i.loggedAt)}</span>
                          </div>
                          ${i.description?`<div class="ci-360-comment-body" style="font-size:12px;">${x(i.description)}</div>`:""}
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
                  ${da.map(i=>{let $=r.status||"To Do";return $==="In Progress"?$="Content":$==="Resolved"?$="Under Review":$==="Closed"&&($="Ready to Leave"),`
                      <option value="${i.key}" ${$===i.key?"selected":""}>
                        ${i.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="ci-360-select-field">
                  ${zt.map(i=>`
                    <option value="${i.key}" ${r.priority===i.key?"selected":""}>
                      ${i.icon} ${i.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="ci-360-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="ci-360-side-lbl" style="margin-bottom:0;">Assigned Personnel (${s.length})</span>
                  
                    <button type="button" class="ci-360-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="ci-360-assigned-chips-wrap">
                  ${s.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:s.map(i=>`
                    <div class="ci-360-assignee-chip">
                      <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(i.avatar||i.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="ci-360-assignee-chip-name" title="${x(i.name)}">${x(i.name)}</span>
                      ${`
                        <button type="button" class="ci-360-assignee-chip-remove btn-remove-assignee" data-user-id="${i.userId}" title="Remove ${x(i.name)}">&times;</button>
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
                    ${R.map(i=>{const $=s.some(z=>z&&z.userId&&String(z.userId)===String(i._id));return`
                        <label class="ci-360-emp-check-item ${$?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${i._id}" ${$?"checked":""} />
                          <div class="ci-360-avatar" style="width:18px;height:18px;font-size:9px;">${(i.name||"U").slice(0,1).toUpperCase()}</div>
                          <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                            ${x(i.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${x(i.role)})</span>
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
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${x(r.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${x(r.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Category</span>
                <select id="sel-detail-category" class="ci-360-select-field">
                  ${kt.map(i=>`
                    <option value="${i.key}" ${r.category===i.key?"selected":""}>
                      ${i.icon} ${i.label}
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
                  ${Y.map(i=>`
                    <option value="${i._id}" ${p===i._id.toString()?"selected":""}>
                      📁 ${x(i.title||"Untitled Job")}
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
              ${S?`
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
    `,ct()}function ct(){const a=l.querySelector("#ci-360-modals-root");if(!a||!F)return;const r=a.querySelector("#btn-close-ci-360-modal");r&&(r.onclick=lt);const f=a.querySelector("#ci-360-detail-backdrop");f&&(f.onclick=M=>{M.target===f&&lt()});const h=a.querySelector("#inp-detail-title");h&&(h.onchange=async()=>{const M=h.value.trim();if(M)try{F=await Xe(`/tickets/${F._id}`,{title:M}),await de()}catch(W){k(W.message||"Failed to update title",!0)}});const T=a.querySelector("#btn-toggle-desc-edit");T&&(T.onclick=()=>{O=!O,ye()});const B=a.querySelector("#btn-cancel-desc");B&&(B.onclick=()=>{O=!1,ye()});const w=a.querySelector("#btn-save-desc");w&&(w.onclick=async()=>{const M=a.querySelector("#inp-detail-desc")?.value;try{F=await Xe(`/tickets/${F._id}`,{description:M}),O=!1,ye(),await de(),k("Description saved",!1)}catch(W){k(W.message||"Failed to save description",!0)}});const P=a.querySelector("#sel-detail-status");P&&(P.onchange=async M=>{try{const W=await Xe(`/tickets/${F._id}/status`,{status:M.target.value});F=W,ye(),await et(),ot(),await de();const m=W.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${W.status}`;k(m,!1)}catch(W){k(W.message||"Status change failed",!0)}});const N=a.querySelector("#sel-detail-priority");N&&(N.onchange=async M=>{try{F=await Xe(`/tickets/${F._id}`,{priority:M.target.value}),ye(),await de()}catch(W){k(W.message,!0)}});const E=a.querySelector("#btn-toggle-assignee-picker"),j=a.querySelector("#ci-360-detail-assignee-box"),y=a.querySelector("#btn-close-detail-assignee-box"),D=a.querySelector("#btn-save-detail-assignees");E&&j&&(E.onclick=()=>{const M=j.style.display==="none";j.style.display=M?"block":"none"}),y&&j&&(y.onclick=()=>{j.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(M=>{M.onchange=()=>{M.closest(".ci-360-emp-check-item")?.classList.toggle("selected",M.checked)}}),D&&(D.onclick=async()=>{const M=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(W=>W.value);try{D.disabled=!0,F=await Xe(`/tickets/${F._id}`,{assigneeIds:M}),ye(),await de(),k("Assignees updated!",!1)}catch(W){k(W.message,!0),D.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(M=>{M.onclick=async()=>{const W=M.dataset.userId,fe=(Array.isArray(F.assignees)&&F.assignees.length>0?F.assignees:F.assignee?.userId?[F.assignee]:[]).filter(he=>he&&he.userId&&String(he.userId)!==String(W)).map(he=>String(he.userId));try{F=await Xe(`/tickets/${F._id}`,{assigneeIds:fe}),ye(),await de(),k("Assignee removed",!1)}catch(he){k(he.message,!0)}}});const J=a.querySelector("#sel-detail-category");J&&(J.onchange=async M=>{try{F=await Xe(`/tickets/${F._id}`,{category:M.target.value}),ye(),await de()}catch(W){k(W.message,!0)}});const S=a.querySelector("#inp-detail-duedate");S&&(S.onchange=async M=>{try{F=await Xe(`/tickets/${F._id}`,{dueDate:M.target.value||null}),ye(),await de()}catch(W){k(W.message,!0)}});const s=a.querySelector("#sel-detail-job");s&&(s.onchange=async M=>{try{F=await Xe(`/tickets/${F._id}`,{jobId:M.target.value||null}),ye(),await de(),k(M.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(W){k(W.message,!0)}});const p=a.querySelector("#btn-toggle-job-link"),n=a.querySelector("#ci-360-job-link-box");p&&n&&(p.onclick=()=>{n.style.display=n.style.display==="none"?"block":"none"});const i=a.querySelector("#btn-cancel-job-link");i&&n&&(i.onclick=()=>{n.style.display="none"});const $=a.querySelector("#btn-save-job-link");$&&($.onclick=async()=>{const M=a.querySelector("#inp-modal-job-select")?.value||null;try{F=await Xe(`/tickets/${F._id}`,{jobId:M}),ye(),await de(),k(M?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(W){k(W.message,!0)}});const z=a.querySelector("#btn-unlink-job");z&&(z.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{F=await Xe(`/tickets/${F._id}`,{jobId:null}),ye(),await de(),k("Job unlinked",!1)}catch(M){k(M.message,!0)}});const C=a.querySelector("#inp-detail-esthours");C&&(C.onchange=async M=>{try{F=await Xe(`/tickets/${F._id}`,{estimatedHours:Number(M.target.value)||0})}catch(W){k(W.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(M=>{M.onchange=async()=>{const W=M.dataset.subtaskId;try{F=await Xe(`/tickets/${F._id}/subtasks/${W}`,{completed:M.checked}),ye(),await de()}catch(m){k(m.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(M=>{M.onclick=async()=>{const W=M.dataset.subtaskId;try{F=await Ze(`/tickets/${F._id}/subtasks/${W}`),ye(),await de()}catch(m){k(m.message,!0)}}});const V=a.querySelector("#inp-new-subtask"),ne=a.querySelector("#btn-add-subtask"),K=async()=>{const M=V?.value.trim();if(M)try{F=await we(`/tickets/${F._id}/subtasks`,{title:M}),ye(),await de()}catch(W){k(W.message,!0)}};ne&&(ne.onclick=K),V&&(V.onkeydown=M=>{M.key==="Enter"&&(M.preventDefault(),K())});const L=a.querySelector("#btn-toggle-add-link"),G=a.querySelector("#add-link-form"),ie=a.querySelector("#btn-cancel-new-link"),Z=a.querySelector("#btn-save-new-link"),se=a.querySelector("#inp-new-link-url"),ue=a.querySelector("#inp-new-link-title");L&&G&&(L.onclick=()=>{const M=G.style.display==="none";G.style.display=M?"block":"none",M&&se&&se.focus()}),ie&&G&&(ie.onclick=()=>{G.style.display="none",se&&(se.value=""),ue&&(ue.value="")}),Z&&se&&(Z.onclick=async()=>{const M=se.value.trim(),W=ue?.value.trim()||"";if(!M){k("Please enter a valid URL link",!0);return}try{Z.disabled=!0,Z.textContent="Saving...",F=await we(`/tickets/${F._id}/links`,{url:M,title:W}),ye(),await de(),k("Reference link added! 🔗",!1)}catch(m){k(m.message||"Failed to save link",!0),Z.disabled=!1,Z.textContent="Save Link 🔗"}}),a.querySelectorAll(".btn-copy-link").forEach(M=>{M.onclick=()=>{const W=M.dataset.url;W&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(W).then(()=>{k("Link copied to clipboard! 📋")}).catch(()=>{k("Link: "+W)}):k("Link: "+W))}}),a.querySelectorAll(".btn-del-link").forEach(M=>{M.onclick=async()=>{const W=M.dataset.linkId;try{F=await Ze(`/tickets/${F._id}/links/${W}`),ye(),await de(),k("Link removed")}catch(m){k(m.message||"Failed to remove link",!0)}}});const be=a.querySelector("#btn-trigger-detail-upload"),me=a.querySelector("#inp-detail-att-upload"),Q=a.querySelector("#detail-att-upload-progress");be&&me&&(be.onclick=M=>{M.preventDefault(),me.click()}),me&&(me.onchange=async()=>{const M=Array.from(me.files||[]);if(me.value="",!!M.length){Q&&(Q.style.display="block",Q.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${M.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const m=(await ba(M,fe=>{const he=a.querySelector("#att-prog-pct"),at=a.querySelector("#att-prog-bar");he&&(he.textContent=`${fe}%`),at&&(at.style.width=`${fe}%`)})).map(fe=>({name:fe.name,url:fe.url,size:fe.size||0,type:fe.type||"application/octet-stream"}));m.length&&(F=await we(`/tickets/${F._id}/attachments`,{attachments:m}),ye(),k(`Successfully attached ${m.length} file(s)! 📎`,!1))}catch(W){console.error("Upload error:",W),k(`Upload failed: ${W.message}`,!0)}finally{Q&&(Q.style.display="none")}}}),a.querySelectorAll(".btn-play-att-video").forEach(M=>{M.onclick=()=>{const W=M.dataset.slot,m=a.querySelector("#"+W);if(m){const fe=m.style.display==="none";m.style.display=fe?"block":"none",M.textContent=fe?"⏸ Close Video":"▶ Play Video";const he=m.querySelector("video");he&&fe?he.play().catch(()=>{}):he&&he.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(M=>{M.onclick=async()=>{const W=M.dataset.attId;try{F=await Ze(`/tickets/${F._id}/attachments/${W}`),ye()}catch(m){k(m.message,!0)}}}),a.querySelectorAll(".ci-360-act-tab").forEach(M=>{M.onclick=()=>{H=M.dataset.actTab,ye()}});const De=a.querySelector("#inp-new-comment"),Ce=a.querySelector("#btn-submit-comment");Ce&&De&&(Ce.onclick=async()=>{const M=De.value.trim();if(M)try{Ce.disabled=!0,Ce.textContent="Saving...",F=await we(`/tickets/${F._id}/comments`,{content:M}),ye(),k("Comment added",!1)}catch(W){k(W.message||"Failed to add comment",!0)}finally{Ce.disabled=!1}});const pe=a.querySelector("#btn-open-link-dialog"),ve=a.querySelector("#ci-360-link-box"),Ie=a.querySelector("#btn-cancel-link"),ze=a.querySelector("#btn-submit-link"),Ke=a.querySelector("#inp-link-target"),He=a.querySelector("#sel-link-rel");pe&&ve&&(pe.onclick=()=>{ve.style.display="block"}),Ie&&ve&&(Ie.onclick=()=>{ve.style.display="none"}),ze&&ve&&(ze.onclick=async()=>{const M=Ke?.value.trim(),W=He?.value||"relates to";if(M)try{ze.disabled=!0,F=await we(`/tickets/${F._id}/links`,{targetTicketId:M,relationship:W}),ye(),k(`Linked with ${M}`,!1)}catch(m){k(m.message||"Failed to link ticket",!0)}finally{ze.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(M=>{M.onclick=async()=>{const W=M.dataset.linkId;try{F=await Ze(`/tickets/${F._id}/links/${W}`),ye()}catch(m){k(m.message,!0)}}});const Oe=a.querySelector("#btn-open-worklog-dialog"),qe=a.querySelector("#ci-360-worklog-box"),oe=a.querySelector("#btn-cancel-worklog"),_e=a.querySelector("#btn-submit-worklog"),Re=a.querySelector("#inp-worklog-time"),Ve=a.querySelector("#inp-worklog-desc");Oe&&qe&&(Oe.onclick=()=>{qe.style.display="block"}),oe&&qe&&(oe.onclick=()=>{qe.style.display="none"}),_e&&qe&&(_e.onclick=async()=>{const M=Re?.value.trim(),W=Ve?.value.trim();if(!M){k("Enter time spent (e.g. 2h 30m)",!0);return}try{_e.disabled=!0,F=await we(`/tickets/${F._id}/worklogs`,{timeSpent:M,description:W}),ye(),k("Work logged",!1)}catch(m){k(m.message||"Failed to log work",!0)}finally{_e.disabled=!1}});const ke=a.querySelector("#btn-delete-ticket");ke&&(ke.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${F.ticketId}?`))try{ke.disabled=!0,await Ze(`/tickets/${F._id}`),k(`Ticket ${F.ticketId} deleted`,!1),lt(),await et(),ot(),await de()}catch(M){k(M.message||"Failed to delete ticket",!0),ke.disabled=!1}})}function lt(){F=null,O=!1;const a=l.querySelector("#ci-360-modals-root");a&&(a.innerHTML="")}function d(a=null){const r=l.querySelector("#ci-360-modals-root");if(!r)return;const f=a||(A.jobId&&A.jobId!=="all"?A.jobId:null);r.innerHTML=`
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
                  ${kt.map(n=>`<option value="${n.key}">${n.icon} ${n.label}</option>`).join("")}
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
                  ${R.map(n=>{const i=u&&String(u._id||u.id)===String(n._id);return`
                      <label class="ci-360-emp-check-item ${i?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${n._id}" ${i?"checked":""} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(n.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${x(n.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${x(n.role)})${i?" — (You)":""}</span>
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
                  ${Y.map(n=>`
                    <option value="${n._id}" ${f&&String(f)===String(n._id)?"selected":""}>
                      📁 ${x(n.title||"Untitled Job")}
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
    `;const h=()=>{r.querySelectorAll(".ci-360-emp-check-item").forEach(n=>{const i=n.querySelector(".chk-create-emp");n.classList.toggle("selected",!!i?.checked)})};r.querySelectorAll(".chk-create-emp").forEach(n=>{n.onchange=h});const T=r.querySelector("#btn-create-assign-self");T&&u&&(T.onclick=()=>{const n=String(u._id||u.id);r.querySelectorAll(".chk-create-emp").forEach(i=>{i.value===n&&(i.checked=!0)}),h()});const B=r.querySelector("#btn-create-clear-assign");B&&(B.onclick=()=>{r.querySelectorAll(".chk-create-emp").forEach(n=>{n.checked=!1}),h()});const w=[],P=r.querySelector("#inp-create-ticket-att"),N=r.querySelector("#create-att-list"),E=r.querySelector("#create-att-count"),j=r.querySelector("#create-att-progress"),y=()=>{E&&(E.textContent=`${w.length} file(s) attached`),N&&(N.innerHTML=w.map((n,i)=>{const $=n.type&&n.type.includes("video")||n.name&&n.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${$?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${x(n.name)}">${x(n.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${ga(n.size)} ${$?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${i}" title="Remove">&times;</button>
          </div>
        `}).join(""),N.querySelectorAll(".btn-del-pending-att").forEach(n=>{n.onclick=()=>{w.splice(Number(n.dataset.idx),1),y()}}))};P&&(P.onchange=async()=>{const n=Array.from(P.files||[]);if(P.value="",!!n.length){j&&(j.style.display="block",j.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${n.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await ba(n,$=>{const z=r.querySelector("#create-prog-pct"),C=r.querySelector("#create-prog-bar");z&&(z.textContent=`${$}%`),C&&(C.style.width=`${$}%`)})).forEach($=>{w.push({name:$.name,url:$.url,size:$.size||0,type:$.type||"application/octet-stream"})}),y()}catch(i){k(`Failed to upload files: ${i.message}`,!0)}finally{j&&(j.style.display="none"),P.value=""}}});const D=()=>{r.innerHTML=""},J=r.querySelector("#btn-close-create-modal");J&&(J.onclick=D);const S=r.querySelector("#btn-cancel-create-ticket");S&&(S.onclick=D);const s=r.querySelector("#ci-360-create-backdrop");s&&(s.onclick=n=>{n.target===s&&D()});const p=r.querySelector("#btn-submit-create-ticket");p&&(p.onclick=async()=>{const n=r.querySelector("#create-ticket-title")?.value.trim(),i=r.querySelector("#create-ticket-desc")?.value.trim(),$=r.querySelector("#create-ticket-cat")?.value||"Task",z=r.querySelector("#create-ticket-pri")?.value||"Medium",V=Array.from(r.querySelectorAll(".chk-create-emp:checked")).map(G=>G.value),ne=r.querySelector("#create-ticket-duedate")?.value||null,K=r.querySelector("#create-ticket-job")?.value||null,L=r.querySelector("#create-ticket-url")?.value.trim()||"";if(!n){k("Ticket summary / title is required",!0);return}try{p.disabled=!0,p.textContent="Creating...";const G=await we("/tickets",{title:n,description:i,category:$,priority:z,assigneeIds:V,assigneeId:V[0]||null,dueDate:ne,jobId:K,linkUrl:L,attachments:w});k(`Ticket ${G.ticketId} created! 🎫`,!1),D(),await et(),ot(),await de(),st(G._id)}catch(G){k(G.message||"Could not create ticket",!0),p.disabled=!1,p.textContent="Create Ticket 🚀"}})}l._openCreateTicketModal=d,l._openTicketDetailModal=st,l._setJobFilter=async a=>{A.jobId=a||"all";const r=l.querySelector("#ci-360-filter-job");r&&(r.value=A.jobId),Me(),await de()}}export{rn as a,on as b,nn as i};
