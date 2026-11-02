var ya=Object.defineProperty;var ka=(i,t,e)=>t in i?ya(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Se=(i,t,e)=>ka(i,typeof t!="symbol"?t+"":t,e);import{c as ze,h as T,e as _,n as Xe,j as Ye,o as Ft,k as Wt,g as ke,t as ea}from"./api-Co-cmybg.js";const ua={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function wa(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},ua,JSON.parse(i))}catch{}return Object.assign({},ua)}function $a(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function at(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),o=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${o}`}function Ht(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const o=e.getFullYear(),d=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${o}-${d}-${r}`}function $t(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function gt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ga(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function ta(i,t=1){const e=new Date(i+"T00:00:00"),o=e.getDay(),d=(o<t?7:0)+o-t,r=new Date(e);r.setDate(e.getDate()-d);const g=[];for(let n=0;n<7;n++){const C=new Date(r);C.setDate(r.getDate()+n);const y=C.getFullYear(),$=String(C.getMonth()+1).padStart(2,"0"),K=String(C.getDate()).padStart(2,"0");g.push(`${y}-${$}-${K}`)}return g}function Sa(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,o=t.createOscillator(),d=t.createGain();o.type="sine",o.frequency.setValueAtTime(523.25,e),o.frequency.exponentialRampToValueAtTime(783.99,e+.15),d.gain.setValueAtTime(.2,e),d.gain.exponentialRampToValueAtTime(.001,e+.35),o.connect(d),d.connect(t.destination),o.start(e),o.stop(e+.35)}catch{}}function Xa(i,t={}){const{userRole:e="employee",currentUser:o=null,onNavigate:d=null}=t,r=e==="superadmin"||e==="admin";let g=wa(),n={selectedDate:at(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ca(),C();async function C(){n.loading=!0,y();try{const a=[ze("/tasks")];r&&a.push(ze("/personnel").catch(()=>[]));const[s,u]=await Promise.all(a);n.tasks=Array.isArray(s)?s:[],u&&(n.personnelList=Array.isArray(u)?u:[])}catch(a){T("Failed to load planner tasks: "+a.message,!0)}finally{n.loading=!1,ee()}}function y(){i.innerHTML=`
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
    `}function $(a){return n.tasks.filter(s=>{var f;if(s.isDeleted===!0)return!1;if(r&&n.selectedPersonnelId!=="all"){const x=((f=s.personnelId)==null?void 0:f._id)||s.personnelId;if(String(x)!==String(n.selectedPersonnelId))return!1}const u=s.dateStr||(s.dueDate?new Date(s.dueDate).toISOString().slice(0,10):"");return u?u===a:a===at()})}function K(a,s){if(a.status==="Completed")return!1;const u=a.dateStr||(a.dueDate?new Date(a.dueDate).toISOString().slice(0,10):"");return u?u<s:!1}function P(a,s){const u=a.length,f=a.filter(U=>U.status==="Completed").length,x=a.filter(U=>U.status==="In Progress").length,I=a.filter(U=>U.status==="Pending"||U.status==="Todo").length,z=a.filter(U=>K(U,s)).length,Y=u>0?Math.round(f/u*100):0;return{total:u,completed:f,inProgress:x,pending:I,overdue:z,percent:Y}}function ee(){const a=at(),s=n.selectedDate===a,u=$(n.selectedDate),f=P(u,a);i.innerHTML=`
      <div class="ci360-planner-wrap ${g.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${gt(n.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${_(g.displayName||"Daily Planner")}</h1>
              <p class="ci360-planner-subheading">Plan your day. Track your progress.</p>
            </div>
          </div>

          <div class="ci360-planner-header-actions">
            <!-- View Mode Switcher -->
            <div class="ci360-view-switcher" role="tablist">
              <button type="button" class="ci360-switch-btn ${n.viewMode==="daily"?"active":""}" id="btnViewDaily" title="Daily View">
                <span>📅 Daily</span>
              </button>
              <button type="button" class="ci360-switch-btn ${n.viewMode==="weekly"?"active":""}" id="btnViewWeekly" title="Weekly View">
                <span>🗓️ Weekly</span>
              </button>
              <button type="button" class="ci360-switch-btn ${n.viewMode==="report"?"active":""}" id="btnViewReport" title="Weekly Analytics & Report">
                <span>📊 Report</span>
              </button>
            </div>

            <!-- Primary Add Task Button -->
            <button type="button" class="ci360-btn-primary" id="btnOpenAddTaskModal">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Add Task</span>
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
                    <small>Formatted summary report</small>
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
              <span class="date-text" id="displayDateLabel">${$t(n.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${n.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${s?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${r?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${n.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${n.personnelList.map(x=>`
                  <option value="${x._id}" ${n.selectedPersonnelId===String(x._id)?"selected":""}>
                    ${_(x.name)} (${_(x.department||x.role||"Team")})
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
          ${V(u,f)}
        </main>

      </div>
    `,je(),st()}function V(a,s){return n.viewMode==="weekly"?ot():n.viewMode==="report"?Qe():ye(a,s)}function ye(a,s){const u=at();let f=a;if(n.filterStatus==="pending"?f=f.filter(x=>x.status==="Pending"||x.status==="Todo"):n.filterStatus==="in_progress"?f=f.filter(x=>x.status==="In Progress"):n.filterStatus==="completed"?f=f.filter(x=>x.status==="Completed"):n.filterStatus==="overdue"&&(f=f.filter(x=>K(x,u))),n.searchQuery){const x=n.searchQuery.toLowerCase();f=f.filter(I=>(I.title||"").toLowerCase().includes(x)||(I.description||"").toLowerCase().includes(x)||(I.category||"").toLowerCase().includes(x))}return f.sort((x,I)=>{if(x.status==="Completed"&&I.status!=="Completed")return 1;if(x.status!=="Completed"&&I.status==="Completed")return-1;const z={Urgent:0,High:1,Medium:2,Low:3};return(z[x.priority]||2)-(z[I.priority]||2)}),`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              Today's Focus
            </h2>
            <span class="ci360-task-count-badge">${f.length} ${f.length===1?"task":"tasks"}</span>
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${n.filterStatus==="all"?"active":""}" data-f="all">All (${s.total})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${s.pending})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${s.inProgress})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${s.completed})</button>
              ${s.overdue>0?`
                <button type="button" class="filter-pill overdue ${n.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${s.overdue})</button>
              `:""}
            </div>

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${_(n.searchQuery)}">
              ${n.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card -->
        <div class="ci360-quick-add-bar">
          <div class="ci360-quick-add-input-wrap">
            <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${gt(n.selectedDate)}... (Press Enter to save)">
          </div>

          <div class="ci360-quick-add-meta">
            <select id="quickAddPriority" class="ci360-quick-select" title="Priority">
              <option value="Low">Priority: Low</option>
              <option value="Medium" selected>Priority: Medium</option>
              <option value="High">Priority: High</option>
              <option value="Urgent">Priority: Urgent</option>
            </select>

            <select id="quickAddCategory" class="ci360-quick-select" title="Category">
              <option value="General" selected>General</option>
              <option value="Client Work">Client Work</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Meeting">Meeting</option>
              <option value="Follow-up">Follow-up</option>
            </select>

            <button type="button" class="ci360-quick-add-btn" id="btnQuickAddSubmit">
              <span>+ Add</span>
            </button>
          </div>
        </div>

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${f.length===0?me():`
            <div class="ci360-task-list">
              ${f.map(x=>Ae(x,u)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function me(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${gt(n.selectedDate)}</h3>
        <p>Your schedule is clean and ready. Add your first priority task above or import your daily agenda.</p>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
          <button type="button" class="ci360-btn-primary" onclick="document.getElementById('quickAddTitleInp')?.focus()">
            + Quick Add Task
          </button>
          <button type="button" class="ci360-btn-secondary" id="btnEmptyStateImport">
            📥 Import List
          </button>
        </div>
      </div>
    `}function Ae(a,s){var z,Y,U,q;const u=a.status==="Completed",f=K(a,s),x=`pri-${(a.priority||"medium").toLowerCase()}`,I=`status-${(a.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${u?"is-completed":""} ${f?"is-overdue":""}" data-id="${a._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${u?"checked":""}" data-action="toggle" data-id="${a._id}" title="${u?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${_(a.title)}</span>
          </div>

          ${a.description?`
            <div class="ci360-task-desc">${_(a.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${x}">
              <span class="badge-dot"></span>
              ${_(a.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${I}">
              ${_(a.status||"Pending")}
            </span>

            <!-- Category -->
            ${a.category?`
              <span class="ci360-badge category-badge">
                #${_(a.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${a.startTime||a.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${a.startTime?_(a.startTime):""}
                   ${a.startTime&&a.dueTime?"–":""}
                   ${a.dueTime?_(a.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${f?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${r&&((z=a.personnelId)!=null&&z.name||(Y=a.userId)!=null&&Y.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${_(((U=a.personnelId)==null?void 0:U.name)||((q=a.userId)==null?void 0:q.name))}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${a._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${a._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function ot(){const a=ta(n.selectedDate,g.weekStartsOn),s=gt(a[0]),u=gt(a[6]),f=at();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${s} – ${u}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${a.map(x=>{const I=x===f,z=x===n.selectedDate,Y=$(x),U=P(Y,f);return`
              <div class="ci360-day-column ${I?"is-today":""} ${z?"is-selected":""}" data-date="${x}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${x}">
                  <div class="day-name">${ga(x)}</div>
                  <div class="day-number">${new Date(x+"T00:00:00").getDate()}</div>
                  ${I?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${U.completed}/${U.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${U.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${Y.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:Y.map(q=>`
                    <div class="ci360-mini-task-card ${q.status==="Completed"?"done":""}" data-id="${q._id}">
                      <button type="button" class="mini-check ${q.status==="Completed"?"checked":""}" data-action="toggle" data-id="${q._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${q._id}">
                        <div class="mini-title">${_(q.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(q.priority||"medium").toLowerCase()}">${q.priority||"Med"}</span>
                          ${q.dueTime?`<span class="mini-time">${_(q.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button -->
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${x}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function Qe(){const a=ta(n.selectedDate,g.weekStartsOn),s=$t(a[0]),u=$t(a[6]),f=at(),x=n.tasks.filter(W=>{if(W.isDeleted===!0)return!1;const O=W.dateStr||(W.dueDate?new Date(W.dueDate).toISOString().slice(0,10):"");return a.includes(O)}),I=x.length,z=x.filter(W=>W.status==="Completed").length,Y=x.filter(W=>W.status==="In Progress").length,U=I>0?Math.round(z/I*100):0,q={Urgent:0,High:0,Medium:0,Low:0};return x.forEach(W=>{const O=W.priority||"Medium";q[O]!==void 0&&q[O]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${s} – ${u}</div>
          </div>

          <div style="display:flex;gap:10px">
            <button type="button" class="ci360-btn-primary" id="btnDownloadWeeklyPdf">
              📄 Download Weekly Report PDF
            </button>
          </div>
        </div>

        <!-- KPI Grid -->
        <div class="ci360-report-kpis">
          <div class="card kpi">
            <span class="label">Total Weekly Tasks</span>
            <span class="value" style="font-size:28px">${I}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${z}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${Y}</span>
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
                ${a.map(W=>{const O=$(W),S=P(O,f);return`
                    <tr>
                      <td><strong>${ga(W)}</strong></td>
                      <td>${gt(W)}</td>
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
              <div style="font-size:22px;font-weight:700">${q.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${q.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${q.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${q.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function je(){const a=document.getElementById("btnViewDaily"),s=document.getElementById("btnViewWeekly"),u=document.getElementById("btnViewReport");a&&(a.onclick=()=>{n.viewMode="daily",ee()}),s&&(s.onclick=()=>{n.viewMode="weekly",ee()}),u&&(u.onclick=()=>{n.viewMode="report",ee()});const f=document.getElementById("btnPrevDay"),x=document.getElementById("btnNextDay"),I=document.getElementById("btnJumpToday"),z=document.getElementById("hiddenDateInput"),Y=document.getElementById("datePickerBadge");f&&(f.onclick=()=>{n.selectedDate=Ht(n.selectedDate,-1),ee()}),x&&(x.onclick=()=>{n.selectedDate=Ht(n.selectedDate,1),ee()}),I&&(I.onclick=()=>{n.selectedDate=at(),ee()}),Y&&z&&(Y.onclick=()=>{try{typeof z.showPicker=="function"?z.showPicker():z.focus()}catch{z.focus()}},z.onchange=j=>{j.target.value&&(n.selectedDate=j.target.value,ee())});const U=document.getElementById("admTeamSelect");U&&(U.onchange=j=>{n.selectedPersonnelId=j.target.value,ee()});const q=document.getElementById("btnOpenAddTaskModal");q&&(q.onclick=()=>we());const W=document.getElementById("btnPlannerActionsMenu"),O=document.getElementById("plannerActionsDropdown");W&&O&&(W.onclick=j=>{j.stopPropagation(),O.classList.toggle("hidden")},document.addEventListener("click",j=>{!O.contains(j.target)&&j.target!==W&&O.classList.add("hidden")}));const S=document.getElementById("btnActionImport");S&&(S.onclick=()=>{O==null||O.classList.add("hidden"),be()});const de=document.getElementById("btnActionExportPng");de&&(de.onclick=()=>{O==null||O.classList.add("hidden"),Ge()});const re=document.getElementById("btnActionExportPdf");re&&(re.onclick=()=>{O==null||O.classList.add("hidden"),it()});const ue=document.getElementById("btnActionBackup");ue&&(ue.onclick=()=>{O==null||O.classList.add("hidden"),Ze()});const le=document.getElementById("btnActionSettings");le&&(le.onclick=()=>{O==null||O.classList.add("hidden"),nt()})}function st(a){if(n.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(q=>{q.onclick=()=>{n.filterStatus=q.dataset.f,ee()}});const s=document.getElementById("plannerTaskSearchInp");s&&(s.oninput=q=>{n.searchQuery=q.target.value,ee()});const u=document.getElementById("btnClearSearch");u&&(u.onclick=()=>{n.searchQuery="",ee()});const f=document.getElementById("quickAddTitleInp"),x=document.getElementById("quickAddPriority"),I=document.getElementById("quickAddCategory"),z=document.getElementById("btnQuickAddSubmit"),Y=async()=>{const q=((f==null?void 0:f.value)||"").trim();if(!q){T("Please enter a task title",!0),f==null||f.focus();return}try{const W={title:q,dateStr:n.selectedDate,priority:(x==null?void 0:x.value)||g.defaultPriority,category:(I==null?void 0:I.value)||"General",status:"Pending"};r&&n.selectedPersonnelId!=="all"&&(W.personnelId=n.selectedPersonnelId);const O=await ke("/tasks",W);n.tasks.unshift(O),T("Task added to today's focus! ✨"),f&&(f.value="",f.focus()),ee()}catch(W){T(W.message,!0)}};z&&(z.onclick=Y),f&&(f.onkeydown=q=>{q.key==="Enter"&&Y()});const U=document.getElementById("btnEmptyStateImport");U&&(U.onclick=()=>be())}if(n.viewMode==="weekly"){const s=document.getElementById("btnPrevWeek"),u=document.getElementById("btnNextWeek"),f=document.getElementById("btnThisWeek");s&&(s.onclick=()=>{n.selectedDate=Ht(n.selectedDate,-7),ee()}),u&&(u.onclick=()=>{n.selectedDate=Ht(n.selectedDate,7),ee()}),f&&(f.onclick=()=>{n.selectedDate=at(),ee()}),document.querySelectorAll(".day-col-header").forEach(x=>{x.onclick=()=>{n.selectedDate=x.dataset.date,n.viewMode="daily",ee()}}),document.querySelectorAll('[data-action="add-day"]').forEach(x=>{x.onclick=()=>{we(null,x.dataset.date)}})}if(n.viewMode==="report"){const s=document.getElementById("btnDownloadWeeklyPdf");s&&(s.onclick=it)}i.querySelectorAll('[data-action="toggle"]').forEach(s=>{s.onclick=async u=>{u.stopPropagation();const f=s.dataset.id;await Ue(f)}}),i.querySelectorAll('[data-action="edit"]').forEach(s=>{s.onclick=u=>{u.stopPropagation();const f=s.dataset.id,x=n.tasks.find(I=>I._id===f);x&&we(x)}}),i.querySelectorAll('[data-action="delete"]').forEach(s=>{s.onclick=async u=>{u.stopPropagation();const f=s.dataset.id;await ht(f)}})}async function Ue(a){const s=n.tasks.find(f=>f._id===a);if(!s)return;const u=s.status!=="Completed";try{const f=await Xe(`/tasks/${a}/toggle`,{}),x=n.tasks.findIndex(I=>I._id===a);x!==-1&&(n.tasks[x]=f),u?(g.soundEnabled&&Sa(),T("Task marked as completed! 🎉")):T("Task reopened as pending."),ee()}catch(f){T(f.message,!0)}}async function ht(a){const s=n.tasks.find(u=>u._id===a);if(s&&confirm(`Are you sure you want to remove "${s.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Ye(`/tasks/${a}`),n.tasks=n.tasks.filter(u=>u._id!==a),T("Task removed from planner (safely stored in database archive)"),ee()}catch(u){T(u.message,!0)}}function we(a=null,s=null){const u=!!a,f=a?a.dateStr||(a.dueDate?new Date(a.dueDate).toISOString().slice(0,10):n.selectedDate):s||n.selectedDate,x=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${u?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${_((a==null?void 0:a.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${_((a==null?void 0:a.description)||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${f}" required>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${(a==null?void 0:a.startTime)||""}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${(a==null?void 0:a.dueTime)||""}">
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${(a==null?void 0:a.priority)==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!a&&g.defaultPriority==="Medium"||(a==null?void 0:a.priority)==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!a&&g.defaultPriority==="High"||(a==null?void 0:a.priority)==="High"?"selected":""}>High</option>
                <option value="Urgent" ${(a==null?void 0:a.priority)==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${(a==null?void 0:a.status)==="Pending"||(a==null?void 0:a.status)==="Todo"||!a?"selected":""}>Pending</option>
                <option value="In Progress" ${(a==null?void 0:a.status)==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${(a==null?void 0:a.status)==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${_((a==null?void 0:a.category)||"General")}">
              <datalist id="categoryOptions">
                <option value="General">
                <option value="Client Work">
                <option value="Development">
                <option value="Design">
                <option value="Meeting">
                <option value="Review">
                <option value="Urgent">
              </datalist>
            </div>
          </div>

          <!-- Superadmin Assign To -->
          ${r?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!a||a!=null&&a.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${n.personnelList.map(W=>{var S;const O=((S=a==null?void 0:a.personnelId)==null?void 0:S._id)===W._id||(a==null?void 0:a.personnelId)===W._id;return`<option value="${W._id}" ${O?"selected":""}>${_(W.name)} (${_(W.department||W.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
            <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
              ${u?"Save Changes":"Create Task"}
            </button>
          </div>
        </form>
      </div>
    `,I=Ft(x),z=I.querySelector("#taskForm"),Y=I.querySelector("#btnModalClose"),U=I.querySelector("#btnCancelModal"),q=()=>I.remove();Y&&(Y.onclick=q),U&&(U.onclick=q),z.onsubmit=async W=>{var A;W.preventDefault();const O=I.querySelector("#taskTitle").value.trim(),S=I.querySelector("#taskDesc").value.trim(),de=I.querySelector("#taskDate").value,re=I.querySelector("#taskStartTime").value.trim(),ue=I.querySelector("#taskDueTime").value.trim(),le=I.querySelector("#taskPriority").value,j=I.querySelector("#taskStatus").value,p=I.querySelector("#taskCategory").value.trim()||"General";if(!O){T("Task title is required",!0);return}const b={title:O,description:S,dateStr:de,startTime:re,dueTime:ue,priority:le,status:j,category:p};if(r){const w=(A=I.querySelector("#taskAssignee"))==null?void 0:A.value;w==="all"?(b.assignAll=!0,b.personnelId="all"):w&&(b.personnelId=w)}const l=I.querySelector("#btnSaveTask");l.disabled=!0,l.textContent="Saving...";try{if(u){const w=await Wt(`/tasks/${a._id}`,b),R=n.tasks.findIndex(D=>D._id===a._id);R!==-1&&(n.tasks[R]=w),T("Task updated successfully! ✍️")}else{const w=await ke("/tasks",b);Array.isArray(w.tasks)?w.tasks.forEach(R=>n.tasks.unshift(R)):n.tasks.unshift(w),T("Task created successfully! ✨")}q(),ee()}catch(w){T(w.message,!0),l.disabled=!1,l.textContent=u?"Save Changes":"Create Task"}}}function be(){let a=[];const s=`
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
              <input type="date" id="importTargetDate" class="input" value="${n.selectedDate}">
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
    `,u=Ft(s),f=()=>u.remove();u.querySelector("#btnImportClose").onclick=f,u.querySelector("#btnCancelImport").onclick=f;const x=u.querySelector("#importTextarea"),I=u.querySelector("#importFileInput"),z=u.querySelector("#importDropzone"),Y=u.querySelector("#previewListArea"),U=u.querySelector("#previewCountLabel"),q=u.querySelector("#btnConfirmImport"),W=u.querySelector("#importFileInfo");function O(de){if(!de)return[];const re=de.split(/\r?\n/),ue=[];for(let le of re)le=le.trim(),le&&(le=le.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),le=le.replace(/^[-*•]\s+/,""),le=le.replace(/^\d+[\.\)]\s+/,""),le=le.trim(),le&&ue.push(le));return ue}function S(){const de=x.value,re=O(de),ue=u.querySelector("#importTargetDate").value,le=$(ue),j=new Set(le.map(p=>(p.title||"").trim().toLowerCase()));a=[];for(const p of re){const b=j.has(p.toLowerCase());a.push({title:p,isDuplicate:b})}if(U.textContent=`Preview (${a.length} ${a.length===1?"task":"tasks"} found)`,q.disabled=a.length===0,q.textContent=`Import ${a.length} ${a.length===1?"Task":"Tasks"}`,a.length===0){Y.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}Y.innerHTML=a.map((p,b)=>`
        <div class="preview-item ${p.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${b+1}.</span>
          <span class="preview-title">${_(p.title)}</span>
          ${p.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}x.oninput=S,z.onclick=()=>I.click(),I.onchange=de=>{const re=de.target.files[0];if(!re)return;W.textContent=`File selected: ${re.name} (${Math.round(re.size/1024)} KB)`;const ue=new FileReader;ue.onload=le=>{x.value=le.target.result,S()},ue.readAsText(re)},z.ondragover=de=>{de.preventDefault(),z.classList.add("dragover")},z.ondragleave=()=>z.classList.remove("dragover"),z.ondrop=de=>{de.preventDefault(),z.classList.remove("dragover");const re=de.dataTransfer.files[0];if(re&&(re.type==="text/plain"||re.name.endsWith(".txt"))){W.textContent=`File dropped: ${re.name}`;const ue=new FileReader;ue.onload=le=>{x.value=le.target.result,S()},ue.readAsText(re)}else T("Please drop a valid .txt plain-text file",!0)},q.onclick=async()=>{if(a.length===0)return;q.disabled=!0,q.textContent="Importing...";const de=u.querySelector("#importTargetDate").value,re=u.querySelector("#importPriority").value,ue=u.querySelector("#importCategory").value.trim()||"General",le={date:de,tasks:a.map(j=>({title:j.title,priority:re,category:ue,status:"Pending"}))};r&&n.selectedPersonnelId!=="all"&&(le.personnelId=n.selectedPersonnelId);try{const j=await ke("/tasks/bulk-import",le);Array.isArray(j.tasks)&&j.tasks.forEach(p=>n.tasks.unshift(p)),T(`Imported ${j.importedCount} tasks successfully! (${j.skippedCount} skipped duplicates)`),f(),n.selectedDate=de,ee()}catch(j){T(j.message,!0),q.disabled=!1,q.textContent="Retry Import"}}}async function Ge(){const a=$(n.selectedDate),s=P(a,at()),u=$t(n.selectedDate),f=2,x=800,I=160,z=90,Y=65,U=70,q=Math.max(120,a.length*Y),W=I+z+q+U,O=document.createElement("canvas");O.width=x*f,O.height=W*f;const S=O.getContext("2d");S.scale(f,f);const de=document.documentElement.getAttribute("data-theme")==="dark",re=de?"#0F172A":"#F8FAFC",ue=de?"#1E293B":"#FFFFFF",le=de?"#334155":"#E2E8F0",j=de?"#F8FAFC":"#0F172A",p=de?"#94A3B8":"#475569",b="#4F46E5",l="#10B981",A="#F59E0B";S.fillStyle=re,S.fillRect(0,0,x,W),S.fillStyle=ue,he(S,24,20,x-48,I-30,16),S.fill(),S.strokeStyle=le,S.lineWidth=1,S.stroke(),S.fillStyle=b,S.font="bold 12px Inter, sans-serif",S.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),S.fillStyle=j,S.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',S.fillText(u,44,86),S.fillStyle=p,S.font="13px Inter, sans-serif",S.fillText(`Planned focus list · ${s.completed} of ${s.total} tasks completed (${s.percent}%)`,44,114);const w=I+6;S.fillStyle=ue,he(S,24,w,x-48,z-16,12),S.fill(),S.stroke();const R=[{label:"TOTAL TASKS",val:String(s.total),color:j},{label:"COMPLETED",val:String(s.completed),color:l},{label:"IN PROGRESS",val:String(s.inProgress),color:A},{label:"PENDING",val:String(s.pending),color:p},{label:"PROGRESS",val:`${s.percent}%`,color:b}],D=(x-48)/R.length;R.forEach((F,L)=>{const oe=24+L*D+20;S.fillStyle=F.color,S.font="bold 20px Inter, sans-serif",S.fillText(F.val,oe,w+36),S.fillStyle=p,S.font="10px Inter, sans-serif",S.fillText(F.label,oe,w+54)});const H=w+z;S.fillStyle=ue,he(S,24,H,x-48,q+10,16),S.fill(),S.stroke(),a.length===0?(S.fillStyle=p,S.font="14px Inter, sans-serif",S.textAlign="center",S.fillText("No scheduled tasks recorded for this date.",x/2,H+60),S.textAlign="left"):a.forEach((F,L)=>{const oe=H+16+L*Y,Z=F.status==="Completed";S.beginPath(),S.arc(48,oe+14,10,0,Math.PI*2),Z?(S.fillStyle=l,S.fill(),S.strokeStyle="#FFFFFF",S.lineWidth=2,S.beginPath(),S.moveTo(44,oe+14),S.lineTo(47,oe+17),S.lineTo(52,oe+11),S.stroke()):(S.strokeStyle=le,S.lineWidth=2,S.stroke()),S.fillStyle=Z?p:j,S.font=`${Z?"normal":"500"} 14px Inter, sans-serif`;const ce=F.title.length>55?F.title.slice(0,52)+"...":F.title;if(S.fillText(ce,70,oe+18),Z){const pe=S.measureText(ce);S.strokeStyle=p,S.lineWidth=1.2,S.beginPath(),S.moveTo(70,oe+14),S.lineTo(70+pe.width,oe+14),S.stroke()}const Q=F.priority||"Medium";let k="#E2E8F0",E="#334155";Q==="Urgent"?(k="#FEE2E2",E="#DC2626"):Q==="High"?(k="#FEF3C7",E="#D97706"):Q==="Low"&&(k="#ECFDF5",E="#059669"),S.fillStyle=k,he(S,x-150,oe+4,60,20,10),S.fill(),S.fillStyle=E,S.font="bold 10px Inter, sans-serif",S.fillText(Q,x-138,oe+18);const B=F.dueTime?`🕒 ${F.dueTime}`:F.category||"General";S.fillStyle=p,S.font="11px Inter, sans-serif",S.fillText(B,70,oe+34),L<a.length-1&&(S.strokeStyle=le,S.lineWidth=.6,S.beginPath(),S.moveTo(40,oe+48),S.lineTo(x-40,oe+48),S.stroke())});const G=W-35;S.fillStyle=p,S.font="11px Inter, sans-serif",S.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,G);try{const F=O.toDataURL("image/png"),L=document.createElement("a");L.href=F,L.download=`ci360-daily-planner-${n.selectedDate}.png`,document.body.appendChild(L),L.click(),L.remove(),T("Daily Planner image exported! 🖼️")}catch(F){T("Failed to export image: "+F.message,!0)}}function he(a,s,u,f,x,I){a.beginPath(),a.moveTo(s+I,u),a.lineTo(s+f-I,u),a.quadraticCurveTo(s+f,u,s+f,u+I),a.lineTo(s+f,u+x-I),a.quadraticCurveTo(s+f,u+x,s+f-I,u+x),a.lineTo(s+I,u+x),a.quadraticCurveTo(s,u+x,s,u+x-I),a.lineTo(s,u+I),a.quadraticCurveTo(s,u,s+I,u),a.closePath()}function it(){const a=ta(n.selectedDate,g.weekStartsOn),s=$t(a[0]),u=$t(a[6]);at();const f=n.tasks.filter(q=>{if(q.isDeleted===!0)return!1;const W=q.dateStr||(q.dueDate?new Date(q.dueDate).toISOString().slice(0,10):"");return a.includes(W)}),x=f.length,I=f.filter(q=>q.status==="Completed").length,z=x>0?Math.round(I/x*100):0,Y=window.open("","_blank");if(!Y){T("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const U=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${s}</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.4; padding: 10px; }
          .header { border-bottom: 2px solid #4f46e5; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
          .brand { font-size: 11px; font-weight: bold; color: #4f46e5; letter-spacing: 0.5px; text-transform: uppercase; }
          h1 { margin: 4px 0 0; font-size: 22px; color: #0f172a; }
          .period { font-size: 13px; color: #64748b; }
          .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
          .kpi { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
          .kpi-num { font-size: 22px; font-weight: bold; color: #0f172a; margin-top: 4px; }
          .kpi-label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600; }
          table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 12px; }
          th { text-align: left; background: #f1f5f9; padding: 8px 10px; border-bottom: 1px solid #cbd5e1; font-weight: 600; }
          td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
          .done { color: #10b981; font-weight: bold; }
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600; }
          .badge-urgent { background: #fee2e2; color: #dc2626; }
          .badge-high { background: #fef3c7; color: #d97706; }
          .badge-med { background: #e0e7ff; color: #4338ca; }
          .badge-low { background: #ecfdf5; color: #059669; }
          .footer { margin-top: 30px; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 8px; text-align: center; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">CI360 Intelligence Suite · Productivity Report</div>
            <h1>Weekly Planner Report</h1>
            <div class="period">${s} – ${u}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${x}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${I}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${x-I}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${z}%</div>
          </div>
        </div>

        <h3 style="font-size:14px;margin:18px 0 8px">Daily Tasks Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Task Title</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${a.map(q=>{const W=$(q);return W.length===0?`<tr><td><strong>${gt(q)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:W.map(O=>`
                <tr>
                  <td><strong>${gt(q)}</strong></td>
                  <td>${_(O.title)}</td>
                  <td><span class="badge badge-${(O.priority||"medium").toLowerCase().slice(0,3)}">${O.priority||"Medium"}</span></td>
                  <td>${_(O.category||"General")}</td>
                  <td>${O.dueTime||O.startTime||"—"}</td>
                  <td class="${O.status==="Completed"?"done":""}">${O.status||"Pending"}</td>
                </tr>
              `).join("")}).join("")}
          </tbody>
        </table>

        <div class="footer">
          Generated automatically by CI360 Daily Planner on ${new Date().toLocaleString()}
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
          };
        <\/script>
      </body>
      </html>
    `;Y.document.write(U),Y.document.close(),T("Weekly PDF report generated for printing! 📄")}function Ze(){const s=Ft(`
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
    `),u=()=>s.remove();s.querySelector("#btnBackupClose").onclick=u;const f=s.querySelector("#btnDownloadBackupJson");f.onclick=async()=>{f.disabled=!0,f.textContent="Generating backup...";try{const q=await ze("/tasks/backup"),W=new Blob([JSON.stringify(q,null,2)],{type:"application/json"}),O=URL.createObjectURL(W),S=document.createElement("a");S.href=O,S.download=`ci360-planner-backup-${at()}.json`,document.body.appendChild(S),S.click(),S.remove(),T("Planner backup downloaded successfully! 💾")}catch(q){T("Backup export failed: "+q.message,!0)}finally{f.disabled=!1,f.textContent="Download JSON Backup"}};const x=s.querySelector("#restoreFileInput"),I=s.querySelector("#restorePreviewArea"),z=s.querySelector("#restoreCountText"),Y=s.querySelector("#btnExecuteRestore");let U=null;x.onchange=q=>{const W=q.target.files[0];if(!W)return;const O=new FileReader;O.onload=S=>{try{const de=JSON.parse(S.target.result),re=Array.isArray(de.tasks)?de.tasks:Array.isArray(de)?de:null;if(!re||re.length===0){T("Invalid backup file: No tasks found",!0);return}U=re,I.style.display="block",z.textContent=`Valid backup: ${re.length} tasks ready to restore.`,Y.disabled=!1}catch(de){T("Error parsing JSON backup file: "+de.message,!0),I.style.display="none",Y.disabled=!0}},O.readAsText(W)},Y.onclick=async()=>{var W;if(!U||U.length===0)return;Y.disabled=!0,Y.textContent="Restoring...";const q=((W=s.querySelector('input[name="restoreMode"]:checked'))==null?void 0:W.value)||"merge";try{const O=await ke("/tasks/restore",{tasks:U,mode:q});T(`Restored ${O.restoredCount} tasks! (${O.skippedCount} skipped) ✨`),u(),await C()}catch(O){T("Restore failed: "+O.message,!0),Y.disabled=!1,Y.textContent="Retry Restore"}}}function nt(){const a=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${_(g.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${g.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${g.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${_(g.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${g.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${g.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${g.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${g.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${g.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${g.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${g.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,s=Ft(a),u=()=>s.remove();s.querySelector("#btnSettingsClose").onclick=u,s.querySelector("#btnCancelSettings").onclick=u,s.querySelector("#settingsForm").onsubmit=f=>{f.preventDefault(),g.displayName=s.querySelector("#setDisplayName").value.trim()||"Daily Planner",g.weekStartsOn=Number(s.querySelector("#setWeekStart").value),g.defaultPriority=s.querySelector("#setDefaultPriority").value,g.density=s.querySelector("#setDensity").value,g.soundEnabled=s.querySelector("#setSound").checked,$a(g),T("Planner preferences saved! ⚙️"),u(),ee()}}}function Ca(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
    /* CI360 Dayfolio Planner Module Styles */
    .ci360-planner-wrap {
      max-width: 1040px;
      margin: 0 auto;
      padding: 0 4px 60px;
      font-family: var(--font-sans);
      color: var(--text-1);
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
      border: 1px dashed var(--border-md);
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
    .ci360-badge.overdue-badge { background: rgba(239, 68, 68, 0.12); color: var(--red-600); }
    .ci360-badge.personnel-badge { background: var(--brand-50); color: var(--brand-600); }
    [data-theme="dark"] .ci360-badge.personnel-badge { background: rgba(99, 102, 241, 0.2); color: var(--brand-400); }

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
  `,document.head.appendChild(i)}function _a(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function Ta(i,t,e,o,d){const r={move:i,variations:d};return t&&(r.suffix=t),e&&(r.nag=e),o!==null&&(r.comment=o),r}function Aa(...i){const[t,...e]=i;let o=t;for(const d of e)d!==null&&(o.variations=[d,...d.variations],d.variations=[],o=d);return t}function ja(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const o=e.variations[0];if(!o){e.comment=t.marker.comment;break}e=o}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Da(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function St(i,t,e,o){var d=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(d,St.prototype),d.expected=t,d.found=e,d.location=o,d.name="SyntaxError",d}Da(St,Error);function aa(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}St.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,o;for(o=0;o<i.length;o++)if(i[o].source===this.location.source){e=i[o].text.split(/\r\n|\n|\r/g);break}var d=this.location.start,r=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(d):d,g=this.location.source+":"+r.line+":"+r.column;if(e){var n=this.location.end,C=aa("",r.line.toString().length," "),y=e[d.line-1],$=d.line===n.line?n.column:y.length+1,K=$-d.column||1;t+=`
 --> `+g+`
`+C+` |
`+r.line+" | "+y+`
`+C+" | "+aa("",d.column-1," ")+aa("",K,"^")}else t+=`
 at `+g}return t};St.buildMessage=function(i,t){var e={literal:function(y){return'"'+d(y.text)+'"'},class:function(y){var $=y.parts.map(function(K){return Array.isArray(K)?r(K[0])+"-"+r(K[1]):r(K)});return"["+(y.inverted?"^":"")+$.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(y){return y.description}};function o(y){return y.charCodeAt(0).toString(16).toUpperCase()}function d(y){return y.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function($){return"\\x0"+o($)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function($){return"\\x"+o($)})}function r(y){return y.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function($){return"\\x0"+o($)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function($){return"\\x"+o($)})}function g(y){return e[y.type](y)}function n(y){var $=y.map(g),K,P;if($.sort(),$.length>0){for(K=1,P=1;K<$.length;K++)$[K-1]!==$[K]&&($[P]=$[K],P++);$.length=P}switch($.length){case 1:return $[0];case 2:return $[0]+" or "+$[1];default:return $.slice(0,-1).join(", ")+", or "+$[$.length-1]}}function C(y){return y?'"'+d(y)+'"':"end of input"}return"Expected "+n(i)+" but "+C(t)+" found."};function Ea(i,t){t=t!==void 0?t:{};var e={},o=t.grammarSource,d={pgn:Lt},r=Lt,g="[",n='"',C="]",y=".",$="O-O-O",K="O-O",P="0-0-0",ee="0-0",V="$",ye="{",me="}",Ae=";",ot="(",Qe=")",je="1-0",st="0-1",Ue="1/2-1/2",ht="*",we=/^[a-zA-Z]/,be=/^[^"]/,Ge=/^[0-9]/,he=/^[.]/,it=/^[a-zA-Z1-8\-=]/,Ze=/^[+#]/,nt=/^[!?]/,a=/^[^}]/,s=/^[^\r\n]/,u=/^[ \t\r\n]/,f=Fe("tag pair"),x=Te("[",!1),I=Te('"',!1),z=Te("]",!1),Y=Fe("tag name"),U=We([["a","z"],["A","Z"]],!1,!1),q=Fe("tag value"),W=We(['"'],!0,!1),O=Fe("move number"),S=We([["0","9"]],!1,!1),de=Te(".",!1),re=We(["."],!1,!1),ue=Fe("standard algebraic notation"),le=Te("O-O-O",!1),j=Te("O-O",!1),p=Te("0-0-0",!1),b=Te("0-0",!1),l=We([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),A=We(["+","#"],!1,!1),w=Fe("suffix annotation"),R=We(["!","?"],!1,!1),D=Fe("NAG"),H=Te("$",!1),G=Fe("brace comment"),F=Te("{",!1),L=We(["}"],!0,!1),oe=Te("}",!1),Z=Fe("rest of line comment"),ce=Te(";",!1),Q=We(["\r",`
`],!0,!1),k=Fe("variation"),E=Te("(",!1),B=Te(")",!1),pe=Fe("game termination marker"),xe=Te("1-0",!1),Ce=Te("0-1",!1),Ee=Te("1/2-1/2",!1),ie=Te("*",!1),fe=Fe("whitespace"),_e=We([" ","	","\r",`
`],!1,!1),Be=function(c,v){return ja(c,v)},$e=function(c){return Object.fromEntries(c)},Je=function(c,v){return[c,v]},et=function(c,v){return{root:c,marker:v}},He=function(c,v){return Aa(_a(c),...v.flat())},Re=function(c,v,m,te,ae){return Ta(c,v,m,te,ae)},lt=function(c){return c},Dt=function(c){return c.replace(/[\r\n]+/g," ")},Et=function(c){return c.trim()},It=function(c){return c},Pt=function(c,v){return{result:c,comment:v}},h=t.peg$currPos|0,dt=[{line:1,column:1}],Oe=h,ct=t.peg$maxFailExpected||[],N=t.peg$silentFails|0,pt;if(t.startRule){if(!(t.startRule in d))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');r=d[t.startRule]}function Te(c,v){return{type:"literal",text:c,ignoreCase:v}}function We(c,v,m){return{type:"class",parts:c,inverted:v,ignoreCase:m}}function Mt(){return{type:"end"}}function Fe(c){return{type:"other",description:c}}function Ct(c){var v=dt[c],m;if(v)return v;if(c>=dt.length)m=dt.length-1;else for(m=c;!dt[--m];);for(v=dt[m],v={line:v.line,column:v.column};m<c;)i.charCodeAt(m)===10?(v.line++,v.column=1):v.column++,m++;return dt[c]=v,v}function qt(c,v,m){var te=Ct(c),ae=Ct(v),ve={source:o,start:{offset:c,line:te.line,column:te.column},end:{offset:v,line:ae.line,column:ae.column}};return ve}function J(c){h<Oe||(h>Oe&&(Oe=h,ct=[]),ct.push(c))}function wt(c,v,m){return new St(St.buildMessage(c,v),c,v,m)}function Lt(){var c,v,m;return c=h,v=Qt(),m=M(),c=Be(v,m),c}function Qt(){var c,v,m;for(c=h,v=[],m=zt();m!==e;)v.push(m),m=zt();return m=qe(),c=$e(v),c}function zt(){var c,v,m,te,ae,ve,vt;return N++,c=h,qe(),i.charCodeAt(h)===91?(v=g,h++):(v=e,N===0&&J(x)),v!==e?(qe(),m=Jt(),m!==e?(qe(),i.charCodeAt(h)===34?(te=n,h++):(te=e,N===0&&J(I)),te!==e?(ae=Rt(),i.charCodeAt(h)===34?(ve=n,h++):(ve=e,N===0&&J(I)),ve!==e?(qe(),i.charCodeAt(h)===93?(vt=C,h++):(vt=e,N===0&&J(z)),vt!==e?c=Je(m,ae):(h=c,c=e)):(h=c,c=e)):(h=c,c=e)):(h=c,c=e)):(h=c,c=e),N--,c===e&&N===0&&J(f),c}function Jt(){var c,v,m;if(N++,c=h,v=[],m=i.charAt(h),we.test(m)?h++:(m=e,N===0&&J(U)),m!==e)for(;m!==e;)v.push(m),m=i.charAt(h),we.test(m)?h++:(m=e,N===0&&J(U));else v=e;return v!==e?c=i.substring(c,h):c=v,N--,c===e&&(v=e,N===0&&J(Y)),c}function Rt(){var c,v,m;for(N++,c=h,v=[],m=i.charAt(h),be.test(m)?h++:(m=e,N===0&&J(W));m!==e;)v.push(m),m=i.charAt(h),be.test(m)?h++:(m=e,N===0&&J(W));return c=i.substring(c,h),N--,v=e,N===0&&J(q),c}function M(){var c,v,m;return c=h,v=X(),qe(),m=Zt(),m===e&&(m=null),qe(),c=et(v,m),c}function X(){var c,v,m,te;for(c=h,v=ut(),v===e&&(v=null),m=[],te=ge();te!==e;)m.push(te),te=ge();return c=He(v,m),c}function ge(){var c,v,m,te,ae,ve,vt,Ot;if(c=h,qe(),Me(),qe(),v=Ke(),v!==e){for(m=rt(),m===e&&(m=null),te=[],ae=tt();ae!==e;)te.push(ae),ae=tt();for(ae=qe(),ve=ut(),ve===e&&(ve=null),vt=[],Ot=Bt();Ot!==e;)vt.push(Ot),Ot=Bt();c=Re(v,m,te,ve,vt)}else h=c,c=e;return c}function Me(){var c,v,m,te,ae,ve;for(N++,c=h,v=[],m=i.charAt(h),Ge.test(m)?h++:(m=e,N===0&&J(S));m!==e;)v.push(m),m=i.charAt(h),Ge.test(m)?h++:(m=e,N===0&&J(S));if(i.charCodeAt(h)===46?(m=y,h++):(m=e,N===0&&J(de)),m!==e){for(te=qe(),ae=[],ve=i.charAt(h),he.test(ve)?h++:(ve=e,N===0&&J(re));ve!==e;)ae.push(ve),ve=i.charAt(h),he.test(ve)?h++:(ve=e,N===0&&J(re));v=[v,m,te,ae],c=v}else h=c,c=e;return N--,c===e&&(v=e,N===0&&J(O)),c}function Ke(){var c,v,m,te,ae,ve;if(N++,c=h,v=h,i.substr(h,5)===$?(m=$,h+=5):(m=e,N===0&&J(le)),m===e&&(i.substr(h,3)===K?(m=K,h+=3):(m=e,N===0&&J(j)),m===e&&(i.substr(h,5)===P?(m=P,h+=5):(m=e,N===0&&J(p)),m===e&&(i.substr(h,3)===ee?(m=ee,h+=3):(m=e,N===0&&J(b)),m===e))))if(m=h,te=i.charAt(h),we.test(te)?h++:(te=e,N===0&&J(U)),te!==e){if(ae=[],ve=i.charAt(h),it.test(ve)?h++:(ve=e,N===0&&J(l)),ve!==e)for(;ve!==e;)ae.push(ve),ve=i.charAt(h),it.test(ve)?h++:(ve=e,N===0&&J(l));else ae=e;ae!==e?(te=[te,ae],m=te):(h=m,m=e)}else h=m,m=e;return m!==e?(te=i.charAt(h),Ze.test(te)?h++:(te=e,N===0&&J(A)),te===e&&(te=null),m=[m,te],v=m):(h=v,v=e),v!==e?c=i.substring(c,h):c=v,N--,c===e&&(v=e,N===0&&J(ue)),c}function rt(){var c,v,m;for(N++,c=h,v=[],m=i.charAt(h),nt.test(m)?h++:(m=e,N===0&&J(R));m!==e;)v.push(m),v.length>=2?m=e:(m=i.charAt(h),nt.test(m)?h++:(m=e,N===0&&J(R)));return v.length<1?(h=c,c=e):c=v,N--,c===e&&(v=e,N===0&&J(w)),c}function tt(){var c,v,m,te,ae;if(N++,c=h,qe(),i.charCodeAt(h)===36?(v=V,h++):(v=e,N===0&&J(H)),v!==e){if(m=h,te=[],ae=i.charAt(h),Ge.test(ae)?h++:(ae=e,N===0&&J(S)),ae!==e)for(;ae!==e;)te.push(ae),ae=i.charAt(h),Ge.test(ae)?h++:(ae=e,N===0&&J(S));else te=e;te!==e?m=i.substring(m,h):m=te,m!==e?c=lt(m):(h=c,c=e)}else h=c,c=e;return N--,c===e&&N===0&&J(D),c}function ut(){var c;return c=Nt(),c===e&&(c=Xt()),c}function Nt(){var c,v,m,te,ae;if(N++,c=h,i.charCodeAt(h)===123?(v=ye,h++):(v=e,N===0&&J(F)),v!==e){for(m=h,te=[],ae=i.charAt(h),a.test(ae)?h++:(ae=e,N===0&&J(L));ae!==e;)te.push(ae),ae=i.charAt(h),a.test(ae)?h++:(ae=e,N===0&&J(L));m=i.substring(m,h),i.charCodeAt(h)===125?(te=me,h++):(te=e,N===0&&J(oe)),te!==e?c=Dt(m):(h=c,c=e)}else h=c,c=e;return N--,c===e&&(v=e,N===0&&J(G)),c}function Xt(){var c,v,m,te,ae;if(N++,c=h,i.charCodeAt(h)===59?(v=Ae,h++):(v=e,N===0&&J(ce)),v!==e){for(m=h,te=[],ae=i.charAt(h),s.test(ae)?h++:(ae=e,N===0&&J(Q));ae!==e;)te.push(ae),ae=i.charAt(h),s.test(ae)?h++:(ae=e,N===0&&J(Q));m=i.substring(m,h),c=Et(m)}else h=c,c=e;return N--,c===e&&(v=e,N===0&&J(Z)),c}function Bt(){var c,v,m,te;return N++,c=h,qe(),i.charCodeAt(h)===40?(v=ot,h++):(v=e,N===0&&J(E)),v!==e?(m=X(),m!==e?(qe(),i.charCodeAt(h)===41?(te=Qe,h++):(te=e,N===0&&J(B)),te!==e?c=It(m):(h=c,c=e)):(h=c,c=e)):(h=c,c=e),N--,c===e&&N===0&&J(k),c}function Zt(){var c,v,m;return N++,c=h,i.substr(h,3)===je?(v=je,h+=3):(v=e,N===0&&J(xe)),v===e&&(i.substr(h,3)===st?(v=st,h+=3):(v=e,N===0&&J(Ce)),v===e&&(i.substr(h,7)===Ue?(v=Ue,h+=7):(v=e,N===0&&J(Ee)),v===e&&(i.charCodeAt(h)===42?(v=ht,h++):(v=e,N===0&&J(ie))))),v!==e?(qe(),m=ut(),m===e&&(m=null),c=Pt(v,m)):(h=c,c=e),N--,c===e&&(v=e,N===0&&J(pe)),c}function qe(){var c,v;for(N++,c=[],v=i.charAt(h),u.test(v)?h++:(v=e,N===0&&J(_e));v!==e;)c.push(v),v=i.charAt(h),u.test(v)?h++:(v=e,N===0&&J(_e));return N--,v=e,N===0&&J(fe),c}if(pt=r(),t.peg$library)return{peg$result:pt,peg$currPos:h,peg$FAILED:e,peg$maxFailExpected:ct,peg$maxFailPos:Oe};if(pt!==e&&h===i.length)return pt;throw pt!==e&&h<i.length&&J(Mt()),wt(ct,Oe<i.length?i.charAt(Oe):null,Oe<i.length?qt(Oe,Oe+1):qt(Oe,Oe))}/**
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
 */const Kt=0xffffffffffffffffn;function ia(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function ba(i,t){return i*t&Kt}function Ia(i){return function(){let t=BigInt(i&Kt),e=BigInt(i>>64n&Kt);const o=ba(ia(ba(t,5n),7n),9n);return e^=t,t=(ia(t,24n)^e^e<<16n)&Kt,e=ia(e,37n),i=e<<64n|t,o}}const Yt=Ia(0xa187eb39cdcaed8f31c4b365b102e01en),Pa=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Yt()))),Ma=Array.from({length:8},()=>Yt()),qa=Array.from({length:16},()=>Yt()),na=Yt(),Ne="w",Ve="b",De="p",ca="n",Vt="b",At="r",mt="q",Ie="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Ut{constructor(t,e){Se(this,"color");Se(this,"from");Se(this,"to");Se(this,"piece");Se(this,"captured");Se(this,"promotion");Se(this,"flags");Se(this,"san");Se(this,"lan");Se(this,"before");Se(this,"after");const{color:o,piece:d,from:r,to:g,flags:n,captured:C,promotion:y}=e,$=Pe(r),K=Pe(g);this.color=o,this.piece=d,this.from=$,this.to=K,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=$+K,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const P in se)se[P]&n&&(this.flags+=xt[P]);C&&(this.captured=C),y&&(this.promotion=y,this.lan+=y)}isCapture(){return this.flags.indexOf(xt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(xt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(xt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(xt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(xt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(xt.BIG_PAWN)>-1}}const Le=-1,xt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},se={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},pa={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},La={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},za={...pa,...La},ne={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},oa={b:[16,32,17,15],w:[-16,-32,-17,-15]},fa={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ra=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Na=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ba={p:1,n:2,b:4,r:8,q:16,k:32},Oa="pnbrqkPNBRQK",ma=[ca,Vt,At,mt],Fa=7,Ha=6,Ua=1,Ga=0,Gt={[Ie]:se.KSIDE_CASTLE,[mt]:se.QSIDE_CASTLE},bt={w:[{square:ne.a1,flag:se.QSIDE_CASTLE},{square:ne.h1,flag:se.KSIDE_CASTLE}],b:[{square:ne.a8,flag:se.QSIDE_CASTLE},{square:ne.h8,flag:se.KSIDE_CASTLE}]},Wa={b:Ua,w:Ha},sa="--";function kt(i){return i>>4}function jt(i){return i&15}function xa(i){return"0123456789".indexOf(i)!==-1}function Pe(i){const t=jt(i),e=kt(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function _t(i){return i===Ne?Ve:Ne}function Ka(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const o=parseInt(t[4],10);if(isNaN(o)||o<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const d=t[0].split("/");if(d.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let g=0;g<d.length;g++){let n=0,C=!1;for(let y=0;y<d[g].length;y++)if(xa(d[g][y])){if(C)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};n+=parseInt(d[g][y],10),C=!0}else{if(!/^[prnbqkPRNBQK]$/.test(d[g][y]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};n+=1,C=!1}if(n!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const r=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:g,regex:n}of r){if(!n.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${g} king`};if((t[0].match(n)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${g} kings`}}return Array.from(d[0]+d[7]).some(g=>g.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Va(i,t){const e=i.from,o=i.to,d=i.piece;let r=0,g=0,n=0;for(let C=0,y=t.length;C<y;C++){const $=t[C].from,K=t[C].to,P=t[C].piece;d===P&&e!==$&&o===K&&(r++,kt(e)===kt($)&&g++,jt(e)===jt($)&&n++)}return r>0?g>0&&n>0?Pe(e):n>0?Pe(e).charAt(1):Pe(e).charAt(0):""}function ft(i,t,e,o,d,r=void 0,g=se.NORMAL){const n=kt(o);if(d===De&&(n===Fa||n===Ga))for(let C=0;C<ma.length;C++){const y=ma[C];i.push({color:t,from:e,to:o,piece:d,captured:r,promotion:y,flags:g|se.PROMOTION})}else i.push({color:t,from:e,to:o,piece:d,captured:r,flags:g})}function ha(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:De:(t=t.toLowerCase(),t==="o"?Ie:t)}function la(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class va{constructor(t=ra,{skipValidation:e=!1}={}){Se(this,"_board",new Array(128));Se(this,"_turn",Ne);Se(this,"_header",{});Se(this,"_kings",{w:Le,b:Le});Se(this,"_epSquare",-1);Se(this,"_halfMoves",0);Se(this,"_moveNumber",0);Se(this,"_history",[]);Se(this,"_comments",{});Se(this,"_castling",{w:0,b:0});Se(this,"_hash",0n);Se(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Le,b:Le},this._turn=Ne,this._castling={w:0,b:0},this._epSquare=Le,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...za},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:o=!1}={}){let d=t.split(/\s+/);if(d.length>=2&&d.length<6){const n=["-","-","0","1"];t=d.concat(n.slice(-(6-d.length))).join(" ")}if(d=t.split(/\s+/),!e){const{ok:n,error:C}=Ka(t);if(!n)throw new Error(C)}const r=d[0];let g=0;this.clear({preserveHeaders:o});for(let n=0;n<r.length;n++){const C=r.charAt(n);if(C==="/")g+=8;else if(xa(C))g+=parseInt(C,10);else{const y=C<"a"?Ne:Ve;this._put({type:C.toLowerCase(),color:y},Pe(g)),g++}}this._turn=d[1],d[2].indexOf("K")>-1&&(this._castling.w|=se.KSIDE_CASTLE),d[2].indexOf("Q")>-1&&(this._castling.w|=se.QSIDE_CASTLE),d[2].indexOf("k")>-1&&(this._castling.b|=se.KSIDE_CASTLE),d[2].indexOf("q")>-1&&(this._castling.b|=se.QSIDE_CASTLE),this._epSquare=d[3]==="-"?Le:ne[d[3]],this._halfMoves=parseInt(d[4],10),this._moveNumber=parseInt(d[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var g,n;let e=0,o="";for(let C=ne.a8;C<=ne.h1;C++){if(this._board[C]){e>0&&(o+=e,e=0);const{color:y,type:$}=this._board[C];o+=y===Ne?$.toUpperCase():$.toLowerCase()}else e++;C+1&136&&(e>0&&(o+=e),C!==ne.h1&&(o+="/"),e=0,C+=8)}let d="";this._castling[Ne]&se.KSIDE_CASTLE&&(d+="K"),this._castling[Ne]&se.QSIDE_CASTLE&&(d+="Q"),this._castling[Ve]&se.KSIDE_CASTLE&&(d+="k"),this._castling[Ve]&se.QSIDE_CASTLE&&(d+="q"),d=d||"-";let r="-";if(this._epSquare!==Le)if(t)r=Pe(this._epSquare);else{const C=this._epSquare+(this._turn===Ne?16:-16),y=[C+1,C-1];for(const $ of y){if($&136)continue;const K=this._turn;if(((g=this._board[$])==null?void 0:g.color)===K&&((n=this._board[$])==null?void 0:n.type)===De){this._makeMove({color:K,from:$,to:this._epSquare,piece:De,captured:De,flags:se.EP_CAPTURE});const P=!this._isKingAttacked(K);if(this._undoMove(),P){r=Pe(this._epSquare);break}}}}return[o,this._turn,d,r,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:o}=this._board[t],d={w:0,b:1}[e],r={p:0,n:1,b:2,r:3,q:4,k:5}[o];return Pa[d][r][t]}_epKey(){return this._epSquare===Le?0n:Ma[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return qa[t]}_computeHash(){let t=0n;for(let e=ne.a8;e<=ne.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=na),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[ne[t]]}findPiece(t){var o;const e=[];for(let d=ne.a8;d<=ne.h1;d++){if(d&136){d+=7;continue}!this._board[d]||((o=this._board[d])==null?void 0:o.color)!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(Pe(d))}return e}put({type:t,color:e},o){return this._put({type:t,color:e},o)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},o){if(Oa.indexOf(t.toLowerCase())===-1||!(o in ne))return!1;const d=ne[o];if(t==Ie&&!(this._kings[e]==Le||this._kings[e]==d))return!1;const r=this._board[d];return r&&r.type===Ie&&(this._kings[r.color]=Le),this._set(d,{type:t,color:e}),t===Ie&&(this._kings[e]=d),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(ne[t]),e&&e.type===Ie&&(this._kings[e.color]=Le),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var o,d,r,g,n,C,y,$,K,P,ee,V;this._hash^=this._castlingKey();const t=((o=this._board[ne.e1])==null?void 0:o.type)===Ie&&((d=this._board[ne.e1])==null?void 0:d.color)===Ne,e=((r=this._board[ne.e8])==null?void 0:r.type)===Ie&&((g=this._board[ne.e8])==null?void 0:g.color)===Ve;(!t||((n=this._board[ne.a1])==null?void 0:n.type)!==At||((C=this._board[ne.a1])==null?void 0:C.color)!==Ne)&&(this._castling.w&=-65),(!t||((y=this._board[ne.h1])==null?void 0:y.type)!==At||(($=this._board[ne.h1])==null?void 0:$.color)!==Ne)&&(this._castling.w&=-33),(!e||((K=this._board[ne.a8])==null?void 0:K.type)!==At||((P=this._board[ne.a8])==null?void 0:P.color)!==Ve)&&(this._castling.b&=-65),(!e||((ee=this._board[ne.h8])==null?void 0:ee.type)!==At||((V=this._board[ne.h8])==null?void 0:V.color)!==Ve)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var r,g;if(this._epSquare===Le)return;const t=this._epSquare+(this._turn===Ne?-16:16),e=this._epSquare+(this._turn===Ne?16:-16),o=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((r=this._board[e])==null?void 0:r.color)!==_t(this._turn)||((g=this._board[e])==null?void 0:g.type)!==De){this._hash^=this._epKey(),this._epSquare=Le;return}const d=n=>{var C,y;return!(n&136)&&((C=this._board[n])==null?void 0:C.color)===this._turn&&((y=this._board[n])==null?void 0:y.type)===De};o.some(d)||(this._hash^=this._epKey(),this._epSquare=Le)}_attacked(t,e,o){const d=[];for(let r=ne.a8;r<=ne.h1;r++){if(r&136){r+=7;continue}if(this._board[r]===void 0||this._board[r].color!==t)continue;const g=this._board[r],n=r-e;if(n===0)continue;const C=n+119;if(Ra[C]&Ba[g.type]){if(g.type===De){if(n>0&&g.color===Ne||n<=0&&g.color===Ve)if(o)d.push(Pe(r));else return!0;continue}if(g.type==="n"||g.type==="k")if(o){d.push(Pe(r));continue}else return!0;const y=Na[C];let $=r+y,K=!1;for(;$!==e;){if(this._board[$]!=null){K=!0;break}$+=y}if(!K)if(o){d.push(Pe(r));continue}else return!0}}return o?d:!1}attackers(t,e){return e?this._attacked(e,ne[t],!0):this._attacked(this._turn,ne[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(_t(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,ne[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let o=0,d=0;for(let r=ne.a8;r<=ne.h1;r++){if(d=(d+1)%2,r&136){r+=7;continue}const g=this._board[r];g&&(t[g.type]=g.type in t?t[g.type]+1:1,g.type===Vt&&e.push(d),o++)}if(o===2)return!0;if(o===3&&(t[Vt]===1||t[ca]===1))return!0;if(o===t[Vt]+2){let r=0;const g=e.length;for(let n=0;n<g;n++)r+=e[n];if(r===0||r===g)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:o=void 0}={}){const d=this._moves({square:e,piece:o});return t?d.map(r=>new Ut(this,r)):d.map(r=>this._moveToSan(r,d))}_moves({legal:t=!0,piece:e=void 0,square:o=void 0}={}){var ee;const d=o?o.toLowerCase():void 0,r=e==null?void 0:e.toLowerCase(),g=[],n=this._turn,C=_t(n);let y=ne.a8,$=ne.h1,K=!1;if(d)if(d in ne)y=$=ne[d],K=!0;else return[];for(let V=y;V<=$;V++){if(V&136){V+=7;continue}if(!this._board[V]||this._board[V].color===C)continue;const{type:ye}=this._board[V];let me;if(ye===De){if(r&&r!==ye)continue;me=V+oa[n][0],this._board[me]||(ft(g,n,V,me,De),me=V+oa[n][1],Wa[n]===kt(V)&&!this._board[me]&&ft(g,n,V,me,De,void 0,se.BIG_PAWN));for(let Ae=2;Ae<4;Ae++)me=V+oa[n][Ae],!(me&136)&&(((ee=this._board[me])==null?void 0:ee.color)===C?ft(g,n,V,me,De,this._board[me].type,se.CAPTURE):me===this._epSquare&&ft(g,n,V,me,De,De,se.EP_CAPTURE))}else{if(r&&r!==ye)continue;for(let Ae=0,ot=fa[ye].length;Ae<ot;Ae++){const Qe=fa[ye][Ae];for(me=V;me+=Qe,!(me&136);){if(!this._board[me])ft(g,n,V,me,ye);else{if(this._board[me].color===n)break;ft(g,n,V,me,ye,this._board[me].type,se.CAPTURE);break}if(ye===ca||ye===Ie)break}}}}if((r===void 0||r===Ie)&&(!K||$===this._kings[n])){if(this._castling[n]&se.KSIDE_CASTLE){const V=this._kings[n],ye=V+2;!this._board[V+1]&&!this._board[ye]&&!this._attacked(C,this._kings[n])&&!this._attacked(C,V+1)&&!this._attacked(C,ye)&&ft(g,n,this._kings[n],ye,Ie,void 0,se.KSIDE_CASTLE)}if(this._castling[n]&se.QSIDE_CASTLE){const V=this._kings[n],ye=V-2;!this._board[V-1]&&!this._board[V-2]&&!this._board[V-3]&&!this._attacked(C,this._kings[n])&&!this._attacked(C,V-1)&&!this._attacked(C,ye)&&ft(g,n,this._kings[n],ye,Ie,void 0,se.QSIDE_CASTLE)}}if(!t||this._kings[n]===-1)return g;const P=[];for(let V=0,ye=g.length;V<ye;V++)this._makeMove(g[V]),this._isKingAttacked(n)||P.push(g[V]),this._undoMove();return P}move(t,{strict:e=!1}={}){let o=null;if(typeof t=="string")o=this._moveFromSan(t,e);else if(t===null)o=this._moveFromSan(sa,e);else if(typeof t=="object"){const r=this._moves();for(let g=0,n=r.length;g<n;g++)if(t.from===Pe(r[g].from)&&t.to===Pe(r[g].to)&&(!("promotion"in r[g])||t.promotion===r[g].promotion)){o=r[g];break}}if(!o)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&o.flags&se.NULL_MOVE)throw new Error("Null move not allowed when in check");const d=new Ut(this,o);return this._makeMove(o),this._incPositionCount(),d}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var d,r,g,n;const e=this._turn,o=_t(e);if(this._push(t),t.flags&se.NULL_MOVE){e===Ve&&this._moveNumber++,this._halfMoves++,this._turn=o,this._epSquare=Le;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&se.EP_CAPTURE&&(this._turn===Ve?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Ie){if(this._kings[e]=t.to,t.flags&se.KSIDE_CASTLE){const C=t.to-1,y=t.to+1;this._movePiece(y,C)}else if(t.flags&se.QSIDE_CASTLE){const C=t.to+1,y=t.to-2;this._movePiece(y,C)}this._castling[e]=0}if(this._castling[e]){for(let C=0,y=bt[e].length;C<y;C++)if(t.from===bt[e][C].square&&this._castling[e]&bt[e][C].flag){this._castling[e]^=bt[e][C].flag;break}}if(this._castling[o]){for(let C=0,y=bt[o].length;C<y;C++)if(t.to===bt[o][C].square&&this._castling[o]&bt[o][C].flag){this._castling[o]^=bt[o][C].flag;break}}if(this._hash^=this._castlingKey(),t.flags&se.BIG_PAWN){let C;e===Ve?C=t.to-16:C=t.to+16,!(t.to-1&136)&&((d=this._board[t.to-1])==null?void 0:d.type)===De&&((r=this._board[t.to-1])==null?void 0:r.color)===o||!(t.to+1&136)&&((g=this._board[t.to+1])==null?void 0:g.type)===De&&((n=this._board[t.to+1])==null?void 0:n.color)===o?(this._epSquare=C,this._hash^=this._epKey()):this._epSquare=Le}else this._epSquare=Le;t.piece===De?this._halfMoves=0:t.flags&(se.CAPTURE|se.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===Ve&&this._moveNumber++,this._turn=o,this._hash^=na}undo(){const t=this._hash,e=this._undoMove();if(e){const o=new Ut(this,e);return this._decPositionCount(t),o}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=na;const o=this._turn,d=_t(o);if(e.flags&se.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:o})),e.captured)if(e.flags&se.EP_CAPTURE){let r;o===Ve?r=e.to-16:r=e.to+16,this._set(r,{type:De,color:d})}else this._set(e.to,{type:e.captured,color:d});if(e.flags&(se.KSIDE_CASTLE|se.QSIDE_CASTLE)){let r,g;e.flags&se.KSIDE_CASTLE?(r=e.to+1,g=e.to-1):(r=e.to-2,g=e.to+1),this._movePiece(g,r)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const o=[];let d=!1;for(const P in this._header)this._header[P]&&o.push(`[${P} "${this._header[P]}"]`+t),d=!0;d&&this._history.length&&o.push(t);const r=P=>{const ee=this._comments[this.fen()];if(typeof ee<"u"){const V=P.length>0?" ":"";P=`${P}${V}{${ee}}`}return P},g=[];for(;this._history.length>0;)g.push(this._undoMove());const n=[];let C="";for(g.length===0&&n.push(r(""));g.length>0;){C=r(C);const P=g.pop();if(!P)break;if(!this._history.length&&P.color==="b"){const ee=`${this._moveNumber}. ...`;C=C?`${C} ${ee}`:ee}else P.color==="w"&&(C.length&&n.push(C),C=this._moveNumber+".");C=C+" "+this._moveToSan(P,this._moves({legal:!0})),this._makeMove(P)}if(C.length&&n.push(r(C)),n.push(this._header.Result||"*"),e===0)return o.join("")+n.join(" ");const y=function(){return o.length>0&&o[o.length-1]===" "?(o.pop(),!0):!1},$=function(P,ee){for(const V of ee.split(" "))if(V){if(P+V.length>e){for(;y();)P--;o.push(t),P=0}o.push(V),P+=V.length,o.push(" "),P++}return y()&&P--,P};let K=0;for(let P=0;P<n.length;P++){if(K+n[P].length>e&&n[P].includes("{")){K=$(K,n[P]);continue}K+n[P].length>e&&P!==0?(o[o.length-1]===" "&&o.pop(),o.push(t),K=0):P!==0&&(o.push(" "),K++),o.push(n[P]),K+=n[P].length}return o.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??pa[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=pa[t]||null,!0):!1}getHeaders(){const t={};for(const[e,o]of Object.entries(this._header))o!==null&&(t[e]=o);return t}loadPgn(t,{strict:e=!1,newlineChar:o=`\r?
`}={}){o!==`\r?
`&&(t=t.replace(new RegExp(o,"g"),`
`));const d=Ea(t);this.reset();const r=d.headers;let g="";for(const y in r)y.toLowerCase()==="fen"&&(g=r[y]),this.header(y,r[y]);if(!e)g&&this.load(g,{preserveHeaders:!0});else if(r.SetUp==="1"){if(!("FEN"in r))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(r.FEN,{preserveHeaders:!0})}let n=d.root;for(;n;){if(n.move){const y=this._moveFromSan(n.move,e);if(y==null)throw new Error(`Invalid move in PGN: ${n.move}`);this._makeMove(y),this._incPositionCount()}n.comment!==void 0&&(this._comments[this.fen()]=n.comment),n=n.variations[0]}const C=d.result;C&&Object.keys(this._header).length&&this._header.Result!==C&&this.setHeader("Result",C)}_moveToSan(t,e){let o="";if(t.flags&se.KSIDE_CASTLE)o="O-O";else if(t.flags&se.QSIDE_CASTLE)o="O-O-O";else{if(t.flags&se.NULL_MOVE)return sa;if(t.piece!==De){const d=Va(t,e);o+=t.piece.toUpperCase()+d}t.flags&(se.CAPTURE|se.EP_CAPTURE)&&(t.piece===De&&(o+=Pe(t.from)[0]),o+="x"),o+=Pe(t.to),t.promotion&&(o+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?o+="#":o+="+"),this._undoMove(),o}_moveFromSan(t,e=!1){let o=la(t);if(e||(o==="0-0"?o="O-O":o==="0-0-0"&&(o="O-O-O")),o==sa)return{color:this._turn,from:0,to:0,piece:"k",flags:se.NULL_MOVE};let d=ha(o),r=this._moves({legal:!0,piece:d});for(let P=0,ee=r.length;P<ee;P++)if(o===la(this._moveToSan(r[P],r)))return r[P];if(e)return null;let g,n,C,y,$,K=!1;if(n=o.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),n?(g=n[1],C=n[2],y=n[3],$=n[4],C.length==1&&(K=!0)):(n=o.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),n&&(g=n[1],C=n[2],y=n[3],$=n[4],C.length==1&&(K=!0))),d=ha(o),r=this._moves({legal:!0,piece:g||d}),!y)return null;for(let P=0,ee=r.length;P<ee;P++)if(C){if((!g||g.toLowerCase()==r[P].piece)&&ne[C]==r[P].from&&ne[y]==r[P].to&&(!$||$.toLowerCase()==r[P].promotion))return r[P];if(K){const V=Pe(r[P].from);if((!g||g.toLowerCase()==r[P].piece)&&ne[y]==r[P].to&&(C==V[0]||C==V[1])&&(!$||$.toLowerCase()==r[P].promotion))return r[P]}}else if(o===la(this._moveToSan(r[P],r)).replace("x",""))return r[P];return null}ascii(){let t=`   +------------------------+
`;for(let e=ne.a8;e<=ne.h1;e++){if(jt(e)===0&&(t+=" "+"87654321"[kt(e)]+" |"),this._board[e]){const o=this._board[e].type,r=this._board[e].color===Ne?o.toUpperCase():o.toLowerCase();t+=" "+r+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let o=0;const d=this._turn;for(let r=0,g=e.length;r<g;r++)this._makeMove(e[r]),this._isKingAttacked(d)||(t-1>0?o+=this.perft(t-1):o++),this._undoMove();return o}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let o=ne.a8;o<=ne.h1;o++)this._board[o]==null?e.push(null):e.push({square:Pe(o),type:this._board[o].type,color:this._board[o].color}),o+1&136&&(t.push(e),e=[],o+=8);return t}squareColor(t){if(t in ne){const e=ne[t];return(kt(e)+jt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],o=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const d=e.pop();if(!d)break;t?o.push(new Ut(this,d)):o.push(this._moveToSan(d,this._moves())),this._makeMove(d)}return o}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},o=d=>{d in this._comments&&(e[d]=this._comments[d])};for(;this._history.length>0;)t.push(this._undoMove());for(o(this.fen());;){const d=t.pop();if(!d)break;this._makeMove(d),o(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const d of[Ie,mt])e[d]!==void 0&&(e[d]?this._castling[t]|=Gt[d]:this._castling[t]&=~Gt[d]);this._updateCastlingRights();const o=this.getCastlingRights(t);return(e[Ie]===void 0||e[Ie]===o[Ie])&&(e[mt]===void 0||e[mt]===o[mt])}getCastlingRights(t){return{[Ie]:(this._castling[t]&Gt[Ie])!==0,[mt]:(this._castling[t]&Gt[mt])!==0}}moveNumber(){return this._moveNumber}}async function Za(i,t={}){var ue,le,j;const e=t.currentUser||{};let o="chat",d=[],r=null,g=[],n=[],C=null,y=null,$=!1,K=null,P=null;i.innerHTML=`
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
  `,Ya(),await Qe(),we();const ee=i.querySelector("#tab-nav-chat"),V=i.querySelector("#tab-nav-lounge"),ye=i.querySelector("#bonding-chat-main-wrap"),me=i.querySelector("#bonding-lounge-main-wrap");ee==null||ee.addEventListener("click",()=>{o="chat",ee.classList.add("active"),V.classList.remove("active"),ye.style.display="grid",me.style.display="none",we()}),V==null||V.addEventListener("click",async()=>{o="lounge_games",V.classList.add("active"),ee.classList.remove("active"),ye.style.display="none",me.style.display="block",await x()}),(ue=i.querySelector("#btn-top-new-chat"))==null||ue.addEventListener("click",O),(le=i.querySelector("#btn-top-new-group"))==null||le.addEventListener("click",S),(j=i.querySelector("#btn-top-challenge"))==null||j.addEventListener("click",()=>z());const Ae=i.querySelector("#bonding-search-input");Ae&&Ae.addEventListener("input",p=>{const b=p.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(A=>{const w=A.textContent.toLowerCase();A.style.display=w.includes(b)?"flex":"none"})}),st(),new MutationObserver((p,b)=>{document.body.contains(i)||(y&&clearInterval(y),P&&clearInterval(P),b.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function Qe(){try{const[p,b]=await Promise.all([ze("/bonding/channels").catch(()=>[]),ze("/bonding/colleagues").catch(()=>[])]);d=p,g=b,!r&&d.length>0&&(r=d.find(l=>l.name.includes("Lounge"))||d[0]),Ue(),r&&await je(r._id)}catch(p){console.error("Failed to load bonding data",p)}}async function je(p,b=!1){if(p)try{n=await ze(`/bonding/channels/${p}/messages`),b?u():f()}catch(l){console.error("Failed to load messages",l)}}function st(){y&&clearInterval(y),y=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval(y);return}o==="chat"&&r?await je(r._id,!0):o==="lounge_games"&&await x(!0)}catch{}},3e3)}function Ue(){const p=i.querySelector("#bonding-group-list"),b=i.querySelector("#bonding-direct-list");if(!p||!b)return;const l=d.filter(w=>w.type==="group"),A=d.filter(w=>w.type==="direct");l.length===0?p.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':p.innerHTML=l.map(w=>{var D;return`
          <div class="bonding-channel-item ${r&&r._id===w._id?"active":""}" data-channel-id="${w._id}">
            <div class="bonding-channel-icon">${w.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${_(w.name)}</div>
              <div class="bonding-channel-preview">${_(((D=w.lastMessage)==null?void 0:D.content)||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${w._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),A.length===0?b.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':b.innerHTML=A.map(w=>{var G;const R=r&&r._id===w._id,D=w.displayName||w.name||"Colleague",H=D.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${R?"active":""}" data-channel-id="${w._id}">
            <div class="bonding-channel-avatar">${H}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${_(D)}</div>
              <div class="bonding-channel-preview">${_(((G=w.lastMessage)==null?void 0:G.content)||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${w._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),ht()}function ht(){var b,l;const p=i.querySelectorAll(".bonding-channel-item");p.forEach(A=>{A.onclick=async w=>{if(w.target.closest(".bonding-channel-del-btn"))return;const R=A.dataset.channelId,D=d.find(H=>H._id===R);D&&(r=D,p.forEach(H=>H.classList.remove("active")),A.classList.add("active"),we(),await je(D._id))}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(A=>{A.onclick=async w=>{w.stopPropagation();const R=A.dataset.channelId,D=d.find(F=>F._id===R),H=D&&D.type==="direct",G=H?"this 1-on-1 chat":`the group "${(D==null?void 0:D.name)||""}"`;if(confirm(`Are you sure you want to delete ${G}? All messages will be permanently removed.`))try{A.disabled=!0,await Ye(`/bonding/channels/${R}`),T(H?"1-on-1 chat deleted":"Group deleted","success"),d=d.filter(F=>F._id!==R),r&&r._id===R&&(r=d[0]||null,we(),r&&await je(r._id)),Ue()}catch(F){T(F.message||"Failed to delete conversation","error"),A.disabled=!1}}}),(b=i.querySelector("#btn-create-group"))==null||b.addEventListener("click",S),(l=i.querySelector("#btn-new-direct-chat"))==null||l.addEventListener("click",O)}function we(){const p=i.querySelector("#bonding-chat-panel");if(!p)return;if(!r){p.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const b=_(r.displayName||r.name),l=(r.members||[]).length,A=r.type==="group",w=(e==null?void 0:e._id)||(e==null?void 0:e.id),R=A?null:(r.members||[]).find(D=>{var H;return((H=D.userId)==null?void 0:H.toString())!==(w==null?void 0:w.toString())});p.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${A?r.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${b}</div>
            <div class="bonding-chat-sub">
              ${A?`<span>${l} members</span> · <span>${_(r.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${A?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${l})</span>
            </button>
            <button class="bonding-header-btn danger" id="btn-delete-group" title="Delete this group">
              <span>🗑️</span> <span>Delete Group</span>
            </button>
          `:`
            <button class="bonding-header-btn danger" id="btn-delete-direct" title="Delete 1-on-1 Chat">
              <span>🗑️</span> <span>Delete Chat</span>
            </button>
          `}
        </div>
      </div>

      <div class="bonding-messages-container" id="bonding-messages-feed">
        ${be()}
      </div>

      <div class="bonding-chat-input-bar">
        <button class="bonding-input-action-btn" id="btn-quick-emoji" title="Insert Emoji">
          <span>😀</span>
        </button>
        <button class="bonding-input-action-btn" id="btn-input-challenge" title="Send Multiplayer Challenge">
          <span>🎮</span>
        </button>
        <textarea
          id="bonding-message-input"
          class="bonding-input-field"
          placeholder="Type a message or challenge to a game... (Press Enter to send)"
          rows="1"
        ></textarea>
        <button class="bonding-send-btn" id="btn-send-message">
          <span>Send</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `,he(R),it(R),Ze(),s()}function be(){if(!n||n.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const p=(e==null?void 0:e._id)||(e==null?void 0:e.id);return n.map(b=>{var D,H,G,F,L,oe,Z,ce,Q;const l=b.sender&&b.sender.userId&&p&&b.sender.userId.toString()===p.toString();if(b.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${b._id}">
            <span>ℹ️</span> <span>${_(b.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${b._id}" title="Delete Message">&times;</button>
          </div>
        `;if(b.type==="challenge"&&b.challengeData){const k=b.challengeData,E=k.gameTitle||"Game Challenge",B=k.gameType||"chess",pe=B==="chess"?"♟️":B==="ludo"?"🎲":"❌",xe=(D=k.gameState)==null?void 0:D.invitationId,Ce=(H=k.targetUserId)==null?void 0:H.toString(),Ee=(F=(G=b.sender)==null?void 0:G.userId)==null?void 0:F.toString(),ie=p&&Ce===p.toString(),fe=p&&Ee===p.toString();return`
          <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${b._id}">
            <div class="bonding-msg-avatar" title="${_(((L=b.sender)==null?void 0:L.name)||"Teammate")}">
              ${(((oe=b.sender)==null?void 0:oe.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${_(((Z=b.sender)==null?void 0:Z.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${re(b.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${b._id}" title="Delete Challenge Message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${pe}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${_(E)}</h4>
                    <p class="game-bubble-desc">${_(b.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${k.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':k.status==="active"||k.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${_(((ce=k.status)==null?void 0:ce.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${k.status==="pending"&&ie?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${xe}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${xe}" data-action="decline">
                        Decline
                      </button>
                    `:k.status==="pending"&&fe?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${xe}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${xe}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${Ge(b)}
            </div>
          </div>
        `}const A=_(((Q=b.sender)==null?void 0:Q.name)||"Teammate"),w=re(b.createdAt),R=Ge(b);return`
        <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${b._id}">
          <div class="bonding-msg-avatar" title="${A}">${A.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${A}</span>
              <span class="bonding-msg-time">${w}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${b._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${_(b.content).replace(/\n/g,"<br/>")}
            </div>
            ${R}
          </div>
        </div>
      `}).join("")}function Ge(p){return`
      <div class="bonding-reactions-row">
        ${(p.reactions||[]).map(A=>{const w=(e==null?void 0:e._id)||(e==null?void 0:e.id);return`
        <button class="bonding-rxn-tag ${(A.users||[]).some(D=>D.toString()===(w==null?void 0:w.toString()))?"active":""}" data-msg-id="${p._id}" data-emoji="${A.emoji}">
          <span>${A.emoji}</span> <span>${A.users?A.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${p._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function he(p){const b=i.querySelector("#btn-chat-challenge");b&&(b.onclick=()=>{p?z(null,p.userId||p._id):z()});const l=i.querySelector("#btn-manage-members");l&&(l.onclick=q);const A=i.querySelector("#btn-delete-group");A&&(A.onclick=W);const w=i.querySelector("#btn-delete-direct");w&&(w.onclick=async()=>{if(r&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{w.disabled=!0,await Ye(`/bonding/channels/${r._id}`),T("1-on-1 chat deleted successfully","success");const D=r._id;d=d.filter(H=>H._id!==D),r=d[0]||null,Ue(),we(),r&&await je(r._id)}catch(D){T(D.message||"Could not delete 1-on-1 chat","error"),w.disabled=!1}});const R=i.querySelector("#btn-clear-chat");R&&(R.onclick=async()=>{if(r&&confirm("Are you sure you want to clear all messages in this conversation?"))try{R.disabled=!0,await Ye(`/bonding/channels/${r._id}/messages`),T("Chat messages cleared","success"),n=[],f()}catch(D){T(D.message||"Could not clear chat messages","error")}finally{R.disabled=!1}})}function it(p){const b=i.querySelector("#bonding-message-input"),l=i.querySelector("#btn-send-message"),A=i.querySelector("#btn-quick-emoji"),w=i.querySelector("#btn-input-challenge");b&&b.addEventListener("keydown",R=>{R.key==="Enter"&&!R.shiftKey&&(R.preventDefault(),nt())}),l&&(l.onclick=nt),w&&(w.onclick=()=>{p?z(null,p.userId||p._id):z()}),A&&(A.onclick=()=>{if(!b)return;const R=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],D=R[Math.floor(Math.random()*R.length)];b.value+=(b.value?" ":"")+D,b.focus()})}function Ze(){i.querySelectorAll(".btn-respond-invite").forEach(A=>{A.onclick=async()=>{const w=A.dataset.inviteId,R=A.dataset.action;await Y(w,R)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(A=>{A.onclick=async()=>{const w=A.dataset.inviteId;try{A.disabled=!0;const R=await ze("/bonding/invitations"),D=(R.incoming||[]).concat(R.sent||[]).find(H=>H._id===w);D&&D.matchId?U(D.matchId):T("Match has not started yet or has expired","warning")}catch(R){T(R.message||"Could not load match","error")}finally{A.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(A=>{A.onclick=async w=>{w.stopPropagation();const R=A.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{A.disabled=!0,await Ye(`/bonding/messages/${R}`),n=n.filter(D=>D._id!==R),u(),T("Message deleted","success")}catch(D){T(D.message||"Failed to delete message","error"),A.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(A=>{A.onclick=async()=>{const w=A.dataset.msgId,R=A.dataset.emoji;await a(w,R)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(A=>{A.onclick=w=>{const R=A.dataset.msgId;de(w.currentTarget,async D=>{await a(R,D)})}})}async function nt(){const p=i.querySelector("#bonding-message-input");if(!p||!r||$)return;const b=p.value.trim();if(b)try{$=!0,p.value="";const l=await ke(`/bonding/channels/${r._id}/messages`,{content:b,type:"text"});n.push(l),f(),s()}catch(l){T(l.message||"Failed to send message","error")}finally{$=!1,p.focus()}}async function a(p,b){try{const l=await ke(`/bonding/messages/${p}/react`,{emoji:b}),A=n.find(w=>w._id===p);A&&(A.reactions=l,u())}catch(l){T(l.message||"Failed to react","error")}}function s(){const p=i.querySelector("#bonding-messages-feed");p&&(p.scrollTop=p.scrollHeight)}function u(){const p=i.querySelector("#bonding-messages-feed");if(!p)return;const b=p.scrollHeight-p.scrollTop<=p.clientHeight+80;p.innerHTML=be(),Ze(),b&&s()}function f(){const p=i.querySelector("#bonding-messages-feed");p&&(p.innerHTML=be(),Ze())}async function x(p=!1){const b=i.querySelector("#bonding-lounge-main-wrap");if(b){p||(b.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const l=await ze("/bonding/games/overview");C=l;const A=l.myStats||{},w=l.availableGames||[],R=l.incomingChallenges||[],D=l.sentChallenges||[],H=l.activeMatches||[],G=l.recentMatches||[],F=(e==null?void 0:e._id)||(e==null?void 0:e.id);b.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${A.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${A.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${A.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${A.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${A.gamesPlayed>0?Math.round((A.wins||0)/A.gamesPlayed*100):0}%</span>
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
              ${w.map(L=>`
                <div class="lounge-game-card" data-game-id="${L.id}">
                  <div class="game-card-icon">${L.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${_(L.name)}</h4>
                    <p class="game-card-desc">${_(L.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${L.duration}</span>
                      ${L.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${L.id}" data-game-title="${_(L.name)}">
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
                <span class="badge blue">${R.length+D.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${R.length})</h5>
              ${R.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${R.map(L=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(L.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${_(L.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${_(L.sender.name)}</strong> (${_(L.sender.role)})</span>
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
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${D.length})</h5>
              ${D.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${D.map(L=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(L.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${_(L.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${_(L.recipient.name)}</strong></span>
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
                <span class="badge green">${H.length} Live</span>
              </div>

              ${H.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${H.map(L=>{const Z=F&&L.player1.userId.toString()===F.toString()?L.player2:L.player1,ce=F&&L.currentTurnUserId&&L.currentTurnUserId.toString()===F.toString();return`
                        <div class="lounge-active-match-card ${ce?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${L.gameType==="chess"?"♟️":L.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${_(L.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${_(Z.name)}</strong> (${_(Z.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ce?"my-turn":"wait"}">
                              ${ce?"⚡ Your Turn!":"⏳ Opponent Turn"}
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
              ${G.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${G.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${G.map(L=>{const Z=F&&L.player1.userId.toString()===F.toString()?L.player2:L.player1,ce=F&&L.winnerId&&L.winnerId.toString()===F.toString(),Q=L.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${_(L.gameTitle)}</span>
                          <span class="recent-date">${re(L.completedAt||L.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${L._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${_(Z.name)}</strong></div>
                          <div class="recent-outcome ${ce?"win":Q?"draw":"loss"}">
                            ${ce?"🏆 VICTORY":Q?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${_(L.winningReason||L.status)})</span>
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
      `,I()}catch(l){b.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${_(l.message)}</p>
        </div>
      `}}}function I(){i.querySelectorAll(".btn-challenge-game").forEach(b=>{b.onclick=()=>{const l=b.dataset.gameId;z(l)}}),i.querySelectorAll(".btn-respond-invite").forEach(b=>{b.onclick=async()=>{const l=b.dataset.inviteId,A=b.dataset.action;await Y(l,A),await x()}}),i.querySelectorAll(".btn-resume-match").forEach(b=>{b.onclick=()=>{const l=b.dataset.matchId;U(l)}}),i.querySelectorAll(".btn-recent-rematch").forEach(b=>{b.onclick=async()=>{const l=b.dataset.matchId;try{b.disabled=!0;const A=await ke(`/bonding/matches/${l}/action`,{action:"rematch"});A.match&&(T("Rematch created! Opening arena ⚔️","success"),U(A.match._id))}catch(A){T(A.message||"Could not start rematch","error")}finally{b.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(b=>{b.onclick=async l=>{l.stopPropagation();const A=b.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{b.disabled=!0,await Ye(`/bonding/matches/${A}`),T("Match deleted successfully","success"),await x()}catch(w){T(w.message||"Failed to delete match","error")}finally{b.disabled=!1}}});const p=i.querySelector("#btn-clear-matches");p&&(p.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{p.disabled=!0,await Ye("/bonding/matches?filter=completed"),T("Completed matches history cleared","success"),await x()}catch(b){T(b.message||"Failed to clear matches","error")}finally{p.disabled=!1}})}function z(p=null,b=null){const l=i.querySelector("#bonding-modals-root"),A=(e==null?void 0:e._id)||(e==null?void 0:e.id),w=new Set(["employee","admin","superadmin"]),R=g.filter(ce=>!ce.isSelf&&ce._id.toString()!==(A==null?void 0:A.toString())&&w.has(ce.role));let D=p||"chess",H=b?b.toString():null,G=2,F=H?[H]:[],L="none";function oe(){const ce=R.find(B=>B._id.toString()===H),Q=D==="ludo",k=G-1,E=F.length===k;l.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${Q?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${D==="chess"?"active":""}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${D==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                  <button class="game-pill-btn ${D==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                </div>
              </div>

              <!-- LUDO SPECIAL: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${Q?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${G===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${G===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${G===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${Q?`Step 3 — Select Colleagues to Play With (${F.length}/${k} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${R.map(B=>{const pe=Q?F.includes(B._id.toString()):H===B._id.toString();return`
                      <div class="eligible-emp-item ${pe?"selected":""}" data-user-id="${B._id}">
                        <div class="emp-item-avatar">${B.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${_(B.name)}</span>
                          <span class="emp-item-role">${_(B.role==="superadmin"?"Superadmin":B.role==="admin"?"Admin":"Employee")} · ${_(B.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${pe?"active":""}">
                          ${pe?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Step for Chess timers -->
              ${D==="chess"?`
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
                  <div><strong>Game:</strong> ${Q?`🎲 Ludo (${G} Players · 4 Pawns per base)`:D==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${Q?`
                    <div><strong>Opponents:</strong> ${F.length>0?F.map(B=>{const pe=R.find(xe=>xe._id.toString()===B);return pe?`<strong>${_(pe.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+k+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${ce?`<strong>${_(ce.name)}</strong> (${_(ce.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${D==="chess"?`<div><strong>Time Control:</strong> ${L==="none"?"Untimed":L}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(Q?!E:!H)?"disabled":""}>
                ${Q?`Start ${G}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,Z()}function Z(){l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelector("#btn-cancel-challenge-flow").onclick=()=>{l.innerHTML=""},l.querySelectorAll(".game-pill-btn").forEach(k=>{k.onclick=()=>{D=k.dataset.game,oe()}}),l.querySelectorAll(".ludo-mode-btn").forEach(k=>{k.onclick=()=>{G=Number(k.dataset.count),F=F.slice(0,G-1),oe()}});const ce=l.querySelector("#flow-emp-search");ce&&(ce.oninput=k=>{const E=k.target.value.toLowerCase().trim();l.querySelectorAll(".eligible-emp-item").forEach(B=>{const pe=B.textContent.toLowerCase();B.style.display=pe.includes(E)?"flex":"none"})}),l.querySelectorAll(".eligible-emp-item").forEach(k=>{k.onclick=()=>{const E=k.dataset.userId;if(D==="ludo"){const B=G-1;F.includes(E)?F=F.filter(pe=>pe!==E):F.length<B?F.push(E):F[B-1]=E}else H=E;oe()}}),l.querySelectorAll('input[name="timerMode"]').forEach(k=>{k.onchange=E=>{L=E.target.value,oe()}});const Q=l.querySelector("#btn-submit-challenge-flow");Q&&(Q.onclick=async()=>{if(D==="ludo"){const k=G-1;if(F.length<k){T(`Please select ${k} colleague(s) to play with`,"warning");return}try{Q.disabled=!0,Q.textContent="Launching Match...";const E=await ke("/bonding/matches/instant-ludo",{playerCount:G,targetUserIds:F});l.innerHTML="",T(`Ludo match started (${G} Players)! 🎲`,"success"),E&&E._id&&U(E._id)}catch(E){T(E.message||"Failed to start Ludo match","error"),Q.disabled=!1,Q.textContent=`Start ${G}P Ludo Match 🎲`}return}if(!H){T("Please select an employee to challenge","warning");return}try{Q.disabled=!0,Q.textContent="Sending Challenge...",await ke("/bonding/invitations",{gameType:D,targetUserId:H,matchSettings:{timerMode:L},channelId:(r==null?void 0:r._id)||null}),T("Game challenge delivered! Awaiting acceptance ⚔️","success"),l.innerHTML="",r&&await je(r._id),o==="lounge_games"&&await x()}catch(k){T(k.message||"Could not send challenge","error"),Q.disabled=!1,Q.textContent="Send Challenge 🚀"}})}oe()}async function Y(p,b){if(!(!p||!b))try{const l=await Wt(`/bonding/invitations/${p}/respond`,{action:b});b==="accept"?(T("Challenge accepted! Entering match arena ⚔️","success"),l.match&&U(l.match._id)):b==="decline"?T("Challenge declined","info"):b==="cancel"&&T("Challenge cancelled","info"),r&&await je(r._id),o==="lounge_games"&&await x()}catch(l){T(l.message||"Action failed","error")}}async function U(p){if(!p)return;K=p,P&&clearInterval(P);const b=i.querySelector("#bonding-modals-root");let l=null,A=null,w=[];async function R(){try{return l=await ze(`/bonding/matches/${p}`),l}catch(Z){return T(Z.message||"Could not load match","error"),D(),null}}if(l=await R(),!l)return;function D(){P&&clearInterval(P),K=null,b.innerHTML="",o==="lounge_games"&&x(!0),r&&je(r._id,!0)}P=setInterval(async()=>{var k,E,B,pe;if(!K||K!==p){clearInterval(P);return}const Z=(k=l==null?void 0:l.currentTurnUserId)==null?void 0:k.toString(),ce=l==null?void 0:l.status,Q=await R();Q&&(((E=Q.currentTurnUserId)==null?void 0:E.toString())!==Z||Q.status!==ce||((B=Q.moves)==null?void 0:B.length)!==((pe=l.moves)==null?void 0:pe.length))&&H()},1500);function H(){var pe,xe;if(!l)return;const Z=(e==null?void 0:e._id)||(e==null?void 0:e.id),ce=Z&&l.player1.userId.toString()===Z.toString(),Q=ce?l.player1:l.player2,k=ce?l.player2:l.player1,E=Z&&l.currentTurnUserId&&l.currentTurnUserId.toString()===Z.toString(),B=l.status!=="active";b.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${l.gameType==="ludo"?"🎲":l.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${_(l.gameTitle)}</h3>
                  ${l.gameType==="ludo"&&((pe=l.gameState)!=null&&pe.players)?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${l.gameState.players.map(Ce=>{var _e;const Ee=Ce.userId&&Ce.userId.toString()===(Z==null?void 0:Z.toString()),ie={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Ce.color]||"⚪",fe=(((_e=l.gameState)==null?void 0:_e.turnColor)||l.turn)===Ce.color;return`
                          <span class="player-tag ${Ee?"self":"opp"} ${fe?"turn-active":""}">
                            ${ie} <strong>${_(Ce.name)}</strong> ${Ee?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${_(Q.name)} (You · <strong>${l.gameType==="ludo"?Q.assignedRole==="red"?"🔴 Red":"🟢 Green":l.gameType==="tictactoe"?Q.assignedRole==="X"?"✕":"◯":Q.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${_(k.name)} (<strong>${l.gameType==="ludo"?k.assignedRole==="red"?"🔴 Red":"🟢 Green":l.gameType==="tictactoe"?k.assignedRole==="X"?"✕":"◯":k.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${B?"ended":E?"my-turn":"opp-turn"}">
                ${B?`<span>🏁 Finished (${_(l.winningReason||l.status)})</span>`:E?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${_(k.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${l.gameType==="ludo"?E?(xe=l.gameState)!=null&&xe.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":l.gameType==="tictactoe"?E?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":E?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${B?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${l.drawOfferedBy&&l.drawOfferedBy.toString()!==(Z==null?void 0:Z.toString())&&!B?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${_(k.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${l.gameType==="chess"?G(ce):""}
              ${l.gameType==="tictactoe"?F():""}
              ${l.gameType==="ludo"?L(ce):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${B?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${l.winnerId&&l.winnerId.toString()===(Z==null?void 0:Z.toString())?"🏆":l.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${l.winnerId&&l.winnerId.toString()===(Z==null?void 0:Z.toString())?"VICTORY!":l.status==="draw"?"STALEMATE / DRAW":`${_(l.winnerName)} Wins!`}</h4>
                  <p>Reason: ${_(l.winningReason||"Match concluded")}</p>
                </div>
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                  <button class="btn-arena-rematch" id="btn-arena-rematch-action">
                    🔄 Request Rematch
                  </button>
                  <button class="btn-arena-action danger" id="btn-arena-delete-match-ended">
                    🗑️ Delete Match
                  </button>
                </div>
              </div>
            `:""}
          </div>
        </div>
      `,oe(E,ce,Q)}function G(Z){var ie;const ce=((ie=l.gameState)==null?void 0:ie.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Q=new va(ce),k=Z?l.player1.assignedRole==="white":l.player2.assignedRole==="white",E={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},B=k?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],pe=k?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let xe='<div class="chess-board-grid">';for(const fe of pe)for(const _e of B){const Be=`${_e}${fe}`,$e=Q.get(Be),Je=(_e.charCodeAt(0)-97+fe)%2!==0,et=A===Be,He=w.includes(Be),Re=$e?$e.color==="w"?E[$e.type.toUpperCase()]:E[$e.type]:"";xe+=`
            <div class="chess-sq ${Je?"light":"dark"} ${et?"selected":""} ${He?"legal-dot":""}" data-square="${Be}">
              ${Re?`<span class="chess-piece ${$e.color==="w"?"white-piece":"black-piece"}">${Re}</span>`:""}
            </div>
          `}xe+="</div>";const Ee=(l.moves||[]).map(fe=>{var _e;return`
        <span class="chess-move-token">${fe.moveNum}. ${((_e=fe.moveData)==null?void 0:_e.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${xe}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${Ee||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function F(){var Q;const Z=((Q=l.gameState)==null?void 0:Q.board)||Array(9).fill(null),ce=l.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${Z.map((k,E)=>{const B=ce.includes(E);return`
                <div class="ttt-cell ${k?"filled":"empty"} ${B?"win-cell":""}" data-cell-idx="${E}">
                  ${k==="X"?'<span class="ttt-x">✕</span>':k==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function L(Z,ce,Q){var Rt;const k=l.gameState||{},E=k.activeColors||["red","green"],B=k.players||[{...l.player1,color:"red",assignedRole:"red",isBot:!1},{...l.player2,color:"green",assignedRole:"green",isBot:!1}],pe=k.tokens||{},xe=M=>{const X=pe[M]||(M==="red"?k.p1Tokens:M==="green"?k.p2Tokens:[])||[];return Array.from({length:4},(ge,Me)=>X[Me]||{id:Me,step:-1})},Ce=xe("red"),Ee=xe("green"),ie=xe("yellow"),fe=xe("blue"),_e=(e==null?void 0:e._id)||(e==null?void 0:e.id),Be=B.find(M=>M.userId&&M.userId.toString()===(_e==null?void 0:_e.toString()))||B[0],$e=(Be==null?void 0:Be.color)||(Z?"red":"green"),Je=k.turnColor||l.turn||"red",et=$e===Je&&l.status==="active",He=!!k.rolled,Re=k.dice,lt=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],Dt=[[7,1],[7,2],[7,3],[7,4],[7,5]],Et=[[1,7],[2,7],[3,7],[4,7],[5,7]],It=[[7,13],[7,12],[7,11],[7,10],[7,9]],Pt=[[13,7],[12,7],[11,7],[10,7],[9,7]],h=[0,8,13,21,26,34,39,47];function dt(M,X){return X<0?null:X>=56?M==="red"?[7,6]:M==="green"?[6,7]:M==="yellow"?[7,8]:[8,7]:M==="red"?X<=50?lt[X]:Dt[X-51]:M==="green"?X<=50?lt[(13+X)%52]:Et[X-51]:M==="yellow"?X<=50?lt[(26+X)%52]:It[X-51]:X<=50?lt[(39+X)%52]:Pt[X-51]}function Oe(M,X){return M!==$e||!et||!He||!Re||l.status!=="active"?!1:X.step===-1?Re===6:X.step>=0&&X.step+Re<=56}const ct={},N=(M,X)=>{X.forEach(ge=>{if(ge.step>=0&&ge.step<56){const Me=dt(M,ge.step);if(Me){const Ke=Me[0]+","+Me[1];(ct[Ke]=ct[Ke]||[]).push({color:M,id:ge.id,step:ge.step,movable:Oe(M,ge)})}}})};E.includes("red")&&N("red",Ce),E.includes("green")&&N("green",Ee),E.includes("yellow")&&N("yellow",ie),E.includes("blue")&&N("blue",fe);const pt={};lt.forEach(([M,X],ge)=>{pt[M+","+X]=ge});const Te={};Dt.forEach(([M,X],ge)=>{Te[M+","+X]=ge+1});const We={};Et.forEach(([M,X],ge)=>{We[M+","+X]=ge+1});const Mt={};It.forEach(([M,X],ge)=>{Mt[M+","+X]=ge+1});const Fe={};Pt.forEach(([M,X],ge)=>{Fe[M+","+X]=ge+1});const Ct=[];for(let M=0;M<15;M++)for(let X=0;X<15;X++){if(M<6&&X<6||M<6&&X>8||M>8&&X<6||M>8&&X>8||M>=6&&M<=8&&X>=6&&X<=8)continue;const ge=M+","+X,Me=pt[ge],Ke=Me!==void 0&&h.includes(Me),rt=M===6&&X===1,tt=M===1&&X===8,ut=M===8&&X===13,Nt=M===13&&X===6,Xt=Te[ge],Bt=We[ge],Zt=Mt[ge],qe=Fe[ge];let c="ludo-cell";rt?c+=" cell-red-start":tt?c+=" cell-green-start":ut?c+=" cell-yellow-start":Nt?c+=" cell-blue-start":Xt?c+=" cell-red-stretch":Bt?c+=" cell-green-stretch":Zt?c+=" cell-yellow-stretch":qe?c+=" cell-blue-stretch":Ke&&(c+=" cell-safe-star");const v=ct[ge]||[];Ct.push(`
            <div class="${c}" style="grid-row:${M+1};grid-column:${X+1}" data-pos="${ge}">
              ${Ke?'<span class="cell-star-glyph">⭐</span>':""}
              ${rt||tt||ut||Nt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${v.map(m=>`
                <div class="ludo-token token-${m.color} ${m.movable?"movable":""}" data-token-id="${m.id}" data-color="${m.color}" title="${m.color.toUpperCase()} Pawn ${m.id+1}">
                  <span>${m.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}const qt=["","⚀","⚁","⚂","⚃","⚄","⚅"];function J(M){return!M||M.step===-1?"Base":M.step===56?"🏁 Home!":M.step>50?`H${M.step-50}`:`S${M.step}`}function wt(M,X,ge,Me,Ke){const rt=`${M}-yard`;return ge?`
          <div class="ludo-yard ${rt} ${Je===M?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${X}</span>
                ${Me?`<small class="yard-player-lbl">${_(Me.name)}${Me.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${Ke.map((tt,ut)=>`
                  <div class="yard-token-slot">
                    ${tt.step===-1?`
                      <div class="ludo-token token-${M} ${Oe(M,tt)?"movable":""}" data-token-id="${tt.id}" data-color="${M}" title="${M.toUpperCase()} Pawn ${tt.id+1}">
                        <span>${tt.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${ut+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `:`
            <div class="ludo-yard ${rt}">
              <div class="yard-box decorative">
                <div class="yard-title">${X} (Inactive)</div>
              </div>
            </div>
          `}const Lt=B.find(M=>M.color==="red"),Qt=B.find(M=>M.color==="green"),zt=B.find(M=>M.color==="yellow"),Jt=B.find(M=>M.color==="blue");return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${wt("red","🔴 Red Base",E.includes("red"),Lt,Ce)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${wt("green","🟢 Green Base",E.includes("green"),Qt,Ee)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${wt("blue","🔵 Blue Base",E.includes("blue"),Jt,fe)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${wt("yellow","🟡 Yellow Base",E.includes("yellow"),zt,ie)}

            <!-- 5. Center Home Victory Zone (3x3) -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${Ce.filter(M=>M.step===56).map(M=>`<span class="tok-finished red" title="Red Pawn ${M.id+1} Home">🔴${M.id+1}</span>`).join("")}
                  ${Ee.filter(M=>M.step===56).map(M=>`<span class="tok-finished green" title="Green Pawn ${M.id+1} Home">🟢${M.id+1}</span>`).join("")}
                  ${ie.filter(M=>M.step===56).map(M=>`<span class="tok-finished yellow" title="Yellow Pawn ${M.id+1} Home">🟡${M.id+1}</span>`).join("")}
                  ${fe.filter(M=>M.step===56).map(M=>`<span class="tok-finished blue" title="Blue Pawn ${M.id+1} Home">🔵${M.id+1}</span>`).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Ct.join("")}
          </div>

          <!-- Ludo Action & Dice Roller Console -->
          <div class="ludo-console">
            <div class="ludo-dice-box">
              <div class="ludo-dice-visual ${He?"rolled":""}">
                ${Re?`<span class="dice-glyph">${qt[Re]}</span>`:"🎲"}
              </div>
              ${Re?`<span class="dice-num-lbl">Rolled ${Re}</span>`:'<span class="dice-num-lbl">Ready</span>'}
            </div>

            <div class="ludo-controls-box">
              ${et&&!He&&l.status==="active"?`
                <button class="btn-ludo-roll pulse" id="btn-ludo-roll">🎲 Roll Dice</button>
              `:et&&He&&l.status==="active"?`
                <div class="ludo-prompt-text highlight">
                  ${xe($e).some(M=>Oe($e,M))?"👉 Tap your <strong>glowing pawn</strong> to advance!":"No moves possible with this roll. Turn passing..."}
                </div>
              `:`
                <div class="ludo-prompt-text">
                  ${l.status==="active"?`⏳ Waiting for ${_(((Rt=B.find(M=>M.color===Je))==null?void 0:Rt.name)||"opponent")} (${Je.toUpperCase()})...`:"🏁 Match Concluded"}
                </div>
              `}

              <div class="ludo-status-banner">
                ${_(k.lastActionText||"Match in progress.")}
              </div>
            </div>
          </div>

          <!-- Token Progress Strip for all active players -->
          <div class="ludo-progress-strip">
            ${E.map(M=>{const X=B.find(Ke=>Ke.color===M),ge=xe(M),Me={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[M];return`
                <div class="progress-pill ${M} ${Je===M?"active-turn":""}">
                  <strong>${Me} ${X?_(X.name):M.toUpperCase()}:</strong>
                  ${ge.map((Ke,rt)=>`P${rt+1}: ${J(Ke)}`).join(" · ")}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function oe(Z,ce,Q){var Ee;b.querySelector("#btn-close-arena").onclick=D;const k=b.querySelector("#btn-arena-resign");k&&(k.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{k.disabled=!0,await ke(`/bonding/matches/${p}/action`,{action:"resign"}),await R(),H()}catch(ie){T(ie.message||"Resign failed","error"),k.disabled=!1}});const E=b.querySelector("#btn-arena-draw");E&&(E.onclick=async()=>{try{await ke(`/bonding/matches/${p}/action`,{action:"offer_draw"}),T("Draw offer sent to opponent","info"),await R(),H()}catch(ie){T(ie.message||"Draw offer failed","error")}});const B=b.querySelector("#btn-confirm-accept-draw");B&&(B.onclick=async()=>{try{await ke(`/bonding/matches/${p}/action`,{action:"accept_draw"}),T("Draw agreed!","info"),await R(),H()}catch(ie){T(ie.message,"error")}});const pe=b.querySelector("#btn-confirm-decline-draw");pe&&(pe.onclick=async()=>{try{await ke(`/bonding/matches/${p}/action`,{action:"decline_draw"}),await R(),H()}catch(ie){T(ie.message,"error")}}),[b.querySelector("#btn-arena-delete-match"),b.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(ie=>{ie.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{ie.disabled=!0,await Ye(`/bonding/matches/${p}`),T("Match deleted","success"),D(),o==="lounge_games"&&await x()}catch(fe){T(fe.message||"Failed to delete match","error"),ie.disabled=!1}}});const Ce=b.querySelector("#btn-arena-rematch-action");if(Ce&&(Ce.onclick=async()=>{try{Ce.disabled=!0,Ce.textContent="Creating Rematch...";const ie=await ke(`/bonding/matches/${p}/action`,{action:"rematch"});ie.match&&(T("Rematch created! New match live ⚔️","success"),P&&clearInterval(P),U(ie.match._id))}catch(ie){T(ie.message||"Rematch failed","error"),Ce.disabled=!1,Ce.textContent="🔄 Request Rematch"}}),l.gameType==="chess"&&Z&&l.status==="active"){const ie=((Ee=l.gameState)==null?void 0:Ee.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",fe=new va(ie),_e=Q.assignedRole==="white"?"w":"b";b.querySelectorAll(".chess-sq").forEach(Be=>{Be.onclick=async()=>{const $e=Be.dataset.square;if(A){if(A===$e){A=null,w=[],H();return}if(w.includes($e)){const et=fe.get(A);let He;et&&et.type==="p"&&($e.endsWith("8")||$e.endsWith("1"))&&(He=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const Re={from:A,to:$e,promotion:He?He.toLowerCase():void 0};A=null,w=[],l=await ke(`/bonding/matches/${p}/move`,{move:Re}),H()}catch(Re){T(Re.message||"Illegal chess move","error"),A=null,w=[],H()}return}}const Je=fe.get($e);Je&&Je.color===_e?(A=$e,w=fe.moves({square:$e,verbose:!0}).map(He=>He.to),H()):(A=null,w=[],H())}})}if(l.gameType==="tictactoe"&&Z&&l.status==="active"&&b.querySelectorAll(".ttt-cell.empty").forEach(ie=>{ie.onclick=async()=>{const fe=ie.dataset.cellIdx;try{ie.style.opacity="0.5",l=await ke(`/bonding/matches/${p}/move`,{cellIndex:Number(fe)}),H()}catch(_e){T(_e.message||"Invalid move","error")}}}),l.gameType==="ludo"&&l.status==="active"){const ie=b.querySelector("#btn-ludo-roll");ie&&Z&&(ie.onclick=async()=>{try{ie.disabled=!0,ie.textContent="Rolling 🎲...",l=await ke(`/bonding/matches/${p}/move`,{action:"roll"}),H()}catch(fe){T(fe.message||"Failed to roll","error"),ie.disabled=!1,ie.textContent="🎲 Roll Dice"}}),Z&&b.querySelectorAll(".ludo-token.movable").forEach(fe=>{fe.onclick=async _e=>{_e.stopPropagation();const Be=fe.dataset.tokenId;try{fe.style.opacity="0.5",l=await ke(`/bonding/matches/${p}/move`,{action:"move",tokenId:Number(Be)}),H()}catch($e){T($e.message||"Invalid token move","error"),fe.style.opacity="1"}}})}}H()}function q(){if(!r||r.type==="direct")return;const p=i.querySelector("#bonding-modals-root"),b=G=>G==="employee"||G==="admin"||G==="superadmin",l=r.members||[],A=new Set(l.map(G=>{var F;return(F=G.userId)==null?void 0:F.toString()})),w=g.filter(G=>b(G.role)&&!A.has(G._id.toString()));p.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${_(r.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${w.map(G=>`
                    <option value="${G._id}">${_(G.name)} (${_(G.role==="superadmin"?"Superadmin":G.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${w.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${w.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${l.length}):</label>
              <div class="bonding-members-list">
                ${l.map(G=>{const F=(e==null?void 0:e._id)||(e==null?void 0:e.id),L=F&&G.userId&&G.userId.toString()===F.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(G.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${_(G.name)} ${L?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${_(G.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${G.userId}" data-name="${_(G.name)}">
                          ${L?"Leave Group":"Remove"}
                        </button>
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            <!-- Delete Group Option in Modal -->
            <div class="bonding-danger-zone">
              <div class="danger-zone-text">
                <strong>Delete Group</strong>
                <span>Permanently delete this group lounge and remove all its messages.</span>
              </div>
              <button class="bonding-btn-danger" id="btn-modal-delete-group">
                Delete Group
              </button>
            </div>
          </div>
        </div>
      </div>
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""};const R=p.querySelector("#btn-modal-delete-group");R&&(R.onclick=()=>{p.innerHTML="",W()});const D=p.querySelector("#btn-submit-add-member");D&&(D.onclick=async()=>{const F=p.querySelector("#sel-add-colleague").value;if(!F){T("Please select a colleague to add","warning");return}try{D.disabled=!0,D.textContent="Adding...";const L=await Wt(`/bonding/channels/${r._id}/members`,{action:"add",userIds:[F]});T("Colleague added to group! 🎉","success"),r=L.channel,p.innerHTML="",await je(r._id),we()}catch(L){T(L.message||"Failed to add member","error"),D.disabled=!1,D.textContent="Add to Group"}}),p.querySelectorAll(".btn-remove-member").forEach(G=>{G.onclick=async()=>{const F=G.dataset.userId,L=G.dataset.name;if(confirm(`Are you sure you want to remove ${L} from this group?`))try{G.disabled=!0;const oe=await Wt(`/bonding/channels/${r._id}/members`,{action:"remove",userId:F});T(`${L} removed from group`,"info"),r=oe.channel,p.innerHTML="",await je(r._id),we()}catch(oe){T(oe.message||"Failed to remove member","error"),G.disabled=!1}}})}async function W(){if(!r||r.type==="direct")return;const p=r.name;if(confirm(`Are you sure you want to delete the group "${p}"?

All messages in this lounge will be deleted.`))try{await Ye(`/bonding/channels/${r._id}`),T(`Group "${p}" deleted successfully`,"success"),d=await ze("/bonding/channels").catch(()=>[]),r=d.find(l=>l.type==="group")||d[0]||null,Ue(),we(),r&&await je(r._id)}catch(l){T(l.message||"Failed to delete group","error")}}function O(){const p=i.querySelector("#bonding-modals-root"),b=w=>w==="employee"||w==="admin"||w==="superadmin",l=g.filter(w=>!w.isSelf&&b(w.role));p.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${l.map(w=>`
                <div class="bonding-user-pick-item" data-user-id="${w._id}" data-name="${_(w.name)}">
                  <div class="bonding-member-avatar">${w.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${_(w.name)}</span>
                    <span class="user-pick-role">${_(w.role==="superadmin"?"Superadmin":w.role==="admin"?"Admin":"Employee")} · ${_(w.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelectorAll(".bonding-user-pick-item").forEach(w=>{w.onclick=async()=>{const R=w.dataset.userId;try{const D=await ke("/bonding/channels",{type:"direct",targetUserId:R});p.innerHTML="",d=await ze("/bonding/channels"),r=d.find(H=>H._id===D._id)||D,Ue(),we(),await je(r._id)}catch(D){T(D.message||"Failed to open personal chat","error")}}})}function S(){const p=i.querySelector("#bonding-modals-root"),b=D=>D==="employee"||D==="admin"||D==="superadmin",l=g.filter(D=>!D.isSelf&&b(D.role));p.innerHTML=`
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
                ${l.map(D=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${D._id}" />
                    <span>${_(D.name)} (${_(D.role==="superadmin"?"Superadmin":D.role==="admin"?"Admin":"Employee")})</span>
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelector("#btn-cancel-create-grp").onclick=()=>{p.innerHTML=""};let A="👥";const w=p.querySelectorAll(".avatar-opt");w.forEach(D=>{D.onclick=()=>{w.forEach(H=>H.classList.remove("active")),D.classList.add("active"),A=D.textContent.trim()}});const R=p.querySelector("#btn-confirm-create-grp");R.onclick=async()=>{const D=p.querySelector("#new-group-name"),H=p.querySelector("#new-group-desc"),G=D.value.trim();if(!G){T("Please enter a group name","warning"),D.focus();return}const F=p.querySelectorAll(".new-group-member-chk:checked"),L=Array.from(F).map(oe=>oe.value);try{R.disabled=!0,R.textContent="Creating...";const oe=await ke("/bonding/channels",{type:"group",name:G,description:H.value.trim(),avatar:A,memberIds:L});T(`Group "${G}" created! 🎉`,"success"),p.innerHTML="",d=await ze("/bonding/channels"),r=d.find(Z=>Z._id===oe._id)||oe,Ue(),we(),await je(r._id)}catch(oe){T(oe.message||"Failed to create group","error"),R.disabled=!1,R.textContent="Create Group 🎉"}}}function de(p,b){const l=document.querySelector(".bonding-emoji-popup");l&&l.remove();const A=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],w=document.createElement("div");w.className="bonding-emoji-popup",w.innerHTML=A.map(H=>`<button class="emoji-opt-btn" data-e="${H}">${H}</button>`).join("");const R=p.getBoundingClientRect();w.style.top=`${R.bottom+window.scrollY+6}px`,w.style.left=`${R.left+window.scrollX}px`,document.body.appendChild(w),w.querySelectorAll(".emoji-opt-btn").forEach(H=>{H.onclick=G=>{G.stopPropagation(),b(H.dataset.e),w.remove()}});const D=H=>{w.contains(H.target)||(w.remove(),document.removeEventListener("click",D))};setTimeout(()=>document.addEventListener("click",D),10)}function re(p){if(!p)return"";try{return new Date(p).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Ya(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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

    /* Input bar */
    .bonding-chat-input-bar {
      padding: 12px 18px;
      border-top: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-card, #ffffff);
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
    }

    .bonding-input-action-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-input-action-btn:hover {
      background: #1e293b;
    }

    .bonding-input-field {
      flex: 1;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 13.5px;
      color: inherit;
      outline: none;
      resize: none;
      font-family: inherit;
    }

    [data-theme="dark"] .bonding-input-field {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-send-btn {
      padding: 10px 16px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
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

    /* Ludo Console & Dice */
    .ludo-console {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      max-width: 440px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 12px;
      padding: 12px 16px;
      box-sizing: border-box;
    }

    [data-theme="dark"] .ludo-console {
      background: #182234;
      border-color: #2b3952;
    }

    .ludo-dice-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    .ludo-dice-visual {
      width: 44px;
      height: 44px;
      background: #ffffff;
      color: #0f172a;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      border: 2px solid #cbd5e1;
      transition: transform 0.25s ease;
    }

    .dice-glyph {
      font-size: 30px;
      line-height: 1;
    }

    .dice-num-lbl {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-2, #64748B);
    }

    .ludo-controls-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .btn-ludo-roll {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: #ffffff;
      font-weight: 700;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
      transition: all 0.15s ease;
      align-self: flex-start;
    }

    .btn-ludo-roll:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(37, 99, 235, 0.45);
    }

    .btn-ludo-roll.pulse {
      animation: ludoRollPulse 1s infinite alternate;
    }

    @keyframes ludoRollPulse {
      from { box-shadow: 0 0 4px rgba(37, 99, 235, 0.4); }
      to { box-shadow: 0 0 16px rgba(37, 99, 235, 0.8); }
    }

    .ludo-prompt-text {
      font-size: 12px;
      color: var(--text-2, #64748B);
    }

    .ludo-prompt-text.highlight {
      color: #0284c7;
      font-weight: 600;
    }

    [data-theme="dark"] .ludo-prompt-text.highlight {
      color: #38bdf8;
    }

    .ludo-status-banner {
      font-size: 11.5px;
      color: var(--text-1, #1e293b);
      background: var(--bg-card, #ffffff);
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .ludo-status-banner {
      background: #111827;
      border-color: #374151;
      color: #f3f4f6;
    }

    .ludo-progress-strip {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      max-width: 440px;
    }

    .progress-pill {
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 12px;
      border: 1px solid;
    }

    .progress-pill.red {
      background: #fef2f2;
      border-color: #fecaca;
      color: #b91c1c;
    }

    [data-theme="dark"] .progress-pill.red {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.4);
      color: #fca5a5;
    }

    .progress-pill.green {
      background: #f0fdf4;
      border-color: #bbf7d0;
      color: #15803d;
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
  `,document.head.appendChild(t)}const da=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"In Progress",label:"In Progress",badgeClass:"in-progress"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Resolved",label:"Resolved",badgeClass:"resolved"},{key:"Closed",label:"Closed",badgeClass:"closed"}],yt=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Tt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ei(i,t={}){const{userRole:e="employee",currentUser:o=null,initialTicketId:d=null}=t;if(e==="client"||o&&o.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let r=[],g={},n=[],C=[],y={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",myIssuesOnly:!1},$=null,K="comments",P=!1;i.innerHTML=`
    <div class="jira-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="jira-header-bar">
        <div class="jira-header-left">
          <div class="jira-breadcrumb">
            <span class="jira-project-icon">CI</span>
            <span>CI360 / SUPPORT / SCRUM BOARD</span>
          </div>
          <div class="jira-title-row">
            <h2 class="jira-main-title">🎫 Support Tickets Board</h2>
          </div>
        </div>
        <div class="jira-header-actions">
          <button class="btn-jira-secondary" id="btn-jira-refresh" title="Refresh Board">
            🔄 Refresh
          </button>
          <button class="btn-jira-primary" id="btn-jira-create-ticket">
            + Create Ticket
          </button>
        </div>
      </div>

      <!-- Stats Overview Ribbon -->
      <div class="jira-stats-ribbon" id="jira-stats-root">
        <div class="jira-stat-card"><span class="jira-stat-val">—</span><span class="jira-stat-lbl">Loading Stats...</span></div>
      </div>

      <!-- Filter Toolbar -->
      <div class="jira-filter-bar">
        <div class="jira-filter-left">
          <div class="jira-search-wrap">
            <span class="jira-search-icon">🔍</span>
            <input type="text" id="jira-search-input" class="jira-search-input" placeholder="Search ticket (ID, title, description)..." />
          </div>

          <select id="jira-filter-priority" class="jira-filter-select">
            <option value="all">Priority: All</option>
            <option value="Critical">🔴 Critical</option>
            <option value="High">🟠 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <select id="jira-filter-category" class="jira-filter-select">
            <option value="all">Category: All</option>
            ${yt.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
          </select>

          <select id="jira-filter-assignee" class="jira-filter-select">
            <option value="all">Assignee: All</option>
            <option value="unassigned">Unassigned</option>
          </select>

          <button type="button" class="jira-pill-filter" id="jira-pill-my-issues">
            Only My Issues
          </button>

          <span class="jira-clear-filters" id="jira-clear-filters" style="display:none;">Clear Filters</span>
        </div>
      </div>

      <!-- Scrum Board Columns Container -->
      <div class="jira-board-columns" id="jira-board-columns-root">
        <div style="padding:40px;color:#94a3b8;font-size:14px;font-weight:600;">
          Loading Scrum Board...
        </div>
      </div>

      <!-- Modal Injection Root -->
      <div id="jira-modals-root"></div>
    </div>
  `,await Promise.all([V(),ee(),ye(),me()]),Ae(),Qe(),ot(),ht(),d&&Ge(d);async function ee(){try{const a=new URLSearchParams;y.search&&a.set("search",y.search),y.priority!=="all"&&a.set("priority",y.priority),y.category!=="all"&&a.set("category",y.category),y.assigneeId!=="all"&&a.set("assigneeId",y.assigneeId),y.myIssuesOnly&&a.set("myIssuesOnly","true");const s=await ze("/tickets?"+a.toString());r=Array.isArray(s)?s:[]}catch(a){T(a.message||"Failed to load tickets",!0),r=[]}}async function V(){try{g=await ze("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function ye(){try{n=(await ze("/users")||[]).filter(s=>s.active&&s.role!=="client")}catch(a){console.warn("Could not fetch employees:",a)}}async function me(){try{const a=await ze("/jobs?limit=50");C=Array.isArray(a)?a:(a==null?void 0:a.jobs)||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function Ae(){const a=i.querySelector("#jira-stats-root");a&&(a.innerHTML=`
      <div class="jira-stat-card ${y.status==="all"&&!y.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="jira-stat-val">${g.total||0}</span>
        <span class="jira-stat-lbl">Total Tickets</span>
      </div>
      <div class="jira-stat-card ${y.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="jira-stat-val">${g.toDo||0}</span>
        <span class="jira-stat-lbl">To Do</span>
      </div>
      <div class="jira-stat-card in-progress ${y.status==="In Progress"?"active":""}" data-stat-filter="In Progress">
        <span class="jira-stat-val">${g.inProgress||0}</span>
        <span class="jira-stat-lbl">In Progress</span>
      </div>
      <div class="jira-stat-card ${y.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="jira-stat-val">${g.underReview||0}</span>
        <span class="jira-stat-lbl">Under Review</span>
      </div>
      <div class="jira-stat-card resolved ${y.status==="Resolved"?"active":""}" data-stat-filter="Resolved">
        <span class="jira-stat-val">${g.resolved||0}</span>
        <span class="jira-stat-lbl">Resolved</span>
      </div>
      <div class="jira-stat-card critical" data-stat-filter="critical">
        <span class="jira-stat-val">${g.critical||0}</span>
        <span class="jira-stat-lbl">Critical 🔴</span>
      </div>
      <div class="jira-stat-card overdue" data-stat-filter="overdue">
        <span class="jira-stat-val">${g.overdue||0}</span>
        <span class="jira-stat-lbl">Overdue ⚠️</span>
      </div>
    `,a.querySelectorAll(".jira-stat-card").forEach(s=>{s.onclick=async()=>{const u=s.dataset.statFilter;u==="all"?(y.status="all",y.priority="all"):u==="critical"?(y.priority="Critical",y.status="all"):(y.status=u,y.priority="all"),await be()}}))}function ot(){const a=i.querySelector("#jira-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${n.map(s=>`
          <option value="${s._id}" ${y.assigneeId===s._id.toString()?"selected":""}>
            ${_(s.name)} (${_(s.role)})
          </option>
        `).join("")}
      `)}function Qe(){const a=i.querySelector("#jira-board-columns-root");if(!a)return;const s={};da.forEach(u=>{s[u.key]=[]}),r.forEach(u=>{const f=u.status||"To Do";s[f]||(s[f]=[]),s[f].push(u)}),a.innerHTML=da.map(u=>{const f=s[u.key]||[];return`
        <div class="jira-board-column" data-status="${u.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${_(u.label)}</span>
              <span class="jira-col-badge">${f.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${u.key}">
            ${f.length===0?`
              <div style="padding:28px 10px;text-align:center;color:#475569;font-size:12px;font-style:italic;">
                No tickets
              </div>
            `:f.map(x=>je(x)).join("")}
          </div>
        </div>
      `}).join(""),st(),Ue()}function je(a){var U;const s=yt.find(q=>q.key===a.category)||yt[0],u=Tt.find(q=>q.key===a.priority)||Tt[2],f=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Resolved"&&a.status!=="Closed",x=(a.subtasks||[]).filter(q=>q.completed).length,I=(a.subtasks||[]).length,z=((U=a.assignee)==null?void 0:U.name)||"Unassigned",Y=(z==="Unassigned"?"?":z.slice(0,1)).toUpperCase();return`
      <div class="jira-card" draggable="true" data-ticket-id="${a._id}">
        <div class="jira-card-top">
          <span class="jira-category-pill ${s.slug}">
            ${s.icon} ${s.label}
          </span>
          ${a.dueDate?`
            <span class="jira-due-pill ${f?"overdue":""}" title="Due Date">
              ${f?"⚠️ ":"📅 "}
              ${new Date(a.dueDate).toISOString().slice(0,10)}
            </span>
          `:""}
        </div>

        <div class="jira-card-title" title="${_(a.title)}">
          ${_(a.title)}
        </div>

        <div class="jira-card-bottom">
          <div class="jira-card-id-row">
            <span class="jira-pri-icon" title="Priority: ${u.label}">${u.icon}</span>
            <span class="jira-ticket-id">${_(a.ticketId)}</span>
          </div>

          <div class="jira-card-assignee-row">
            ${I>0?`
              <span class="jira-subtask-badge" title="${x} of ${I} subtasks completed">
                ☑ ${x}/${I}
              </span>
            `:""}
            <div class="jira-avatar ${z==="Unassigned"?"unassigned":""}" title="Assignee: ${_(z)}">
              ${Y}
            </div>
          </div>
        </div>
      </div>
    `}function st(){const a=i.querySelectorAll(".jira-card"),s=i.querySelectorAll(".jira-board-column");a.forEach(u=>{u.ondragstart=f=>{f.dataTransfer.setData("text/plain",u.dataset.ticketId),u.classList.add("dragging")},u.ondragend=()=>{u.classList.remove("dragging")}}),s.forEach(u=>{u.ondragover=f=>{f.preventDefault(),u.classList.add("drag-over")},u.ondragleave=()=>{u.classList.remove("drag-over")},u.ondrop=async f=>{f.preventDefault(),u.classList.remove("drag-over");const x=f.dataTransfer.getData("text/plain"),I=u.dataset.status;if(!x||!I)return;const z=r.find(U=>U._id.toString()===x);if(!z||z.status===I)return;const Y=z.status;z.status=I,Qe();try{const U=await Xe(`/tickets/${x}/status`,{status:I});T(`Moved ${U.ticketId} to ${I}`,!1),await V(),Ae()}catch(U){T(U.message||"Status update failed",!0),z.status=Y,Qe()}}})}function Ue(){i.querySelectorAll(".jira-card").forEach(a=>{a.onclick=s=>{if(s.target.tagName==="A")return;const u=a.dataset.ticketId;Ge(u)}})}function ht(){const a=i.querySelector("#btn-jira-refresh");a&&(a.onclick=async()=>{a.classList.add("pulse"),await be(),T("Board updated",!1),a.classList.remove("pulse")});const s=i.querySelector("#btn-jira-create-ticket");s&&(s.onclick=()=>{nt()});const u=i.querySelector("#jira-search-input");let f=null;u&&(u.oninput=q=>{clearTimeout(f),f=setTimeout(async()=>{y.search=q.target.value.trim(),we(),await be()},300)});const x=i.querySelector("#jira-filter-priority");x&&(x.onchange=async q=>{y.priority=q.target.value,we(),await be()});const I=i.querySelector("#jira-filter-category");I&&(I.onchange=async q=>{y.category=q.target.value,we(),await be()});const z=i.querySelector("#jira-filter-assignee");z&&(z.onchange=async q=>{y.assigneeId=q.target.value,we(),await be()});const Y=i.querySelector("#jira-pill-my-issues");Y&&(Y.onclick=async()=>{y.myIssuesOnly=!y.myIssuesOnly,Y.classList.toggle("active",y.myIssuesOnly),we(),await be()});const U=i.querySelector("#jira-clear-filters");U&&(U.onclick=async()=>{y={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",myIssuesOnly:!1},u&&(u.value=""),x&&(x.value="all"),I&&(I.value="all"),z&&(z.value="all"),Y&&Y.classList.remove("active"),we(),await be()})}function we(){const a=i.querySelector("#jira-clear-filters");if(!a)return;const s=y.search||y.priority!=="all"||y.category!=="all"||y.assigneeId!=="all"||y.myIssuesOnly;a.style.display=s?"inline":"none"}async function be(){await ee(),Qe()}async function Ge(a){const s=i.querySelector("#jira-modals-root");if(s){s.innerHTML=`
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{$=await ze(`/tickets/${a}`)}catch(u){T(u.message||"Could not load ticket",!0),s.innerHTML="";return}he()}}function he(){var re,ue,le;const a=i.querySelector("#jira-modals-root");if(!a||!$)return;const s=$,u=yt.find(j=>j.key===s.category)||yt[0];Tt.find(j=>j.key===s.priority)||Tt[2];const f=s.subtasks||[],x=f.filter(j=>j.completed).length,I=f.length>0?Math.round(x/f.length*100):0,z=s.attachments||[],Y=s.comments||[],U=(s.history||[]).slice().reverse(),q=s.workLogs||[],W=s.linkedTickets||[],O=(o==null?void 0:o._id)||(o==null?void 0:o.id),S=s.reporter&&s.reporter.userId&&s.reporter.userId.toString()===(O==null?void 0:O.toString()),de=e==="superadmin"||e==="admin";a.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${u.slug}">${u.icon} ${u.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${_(s.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${_(s.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Description</span>
                  <button type="button" class="jira-tool-btn" id="btn-toggle-desc-edit">
                    ${P?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${P?`
                  <div class="jira-editor-toolbar">
                    <button type="button" class="jira-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="jira-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="jira-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="jira-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${_(s.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${s.description?_(s.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Attachments Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Attachments (${z.length})</span>
                  <label class="btn-jira-secondary" style="font-size:11px;padding:4px 8px;cursor:pointer;">
                    📎 Upload File
                    <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                  </label>
                </div>

                ${z.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload screenshots, logs, or briefs.</div>
                `:`
                  <div class="jira-attachments-grid">
                    ${z.map(j=>`
                      <div class="jira-att-card">
                        <div class="jira-att-left">
                          <span>📎</span>
                          <a href="${j.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${_(j.name)}">
                            ${_(j.name)}
                          </a>
                        </div>
                        <button type="button" class="jira-att-del btn-del-att" data-att-id="${j.id}" title="Delete file">&times;</button>
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>

              <!-- Subtasks Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Subtasks (${x}/${f.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${I}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${I}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${f.map(j=>`
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${j.id}" ${j.completed?"checked":""} />
                        <span class="jira-subtask-title ${j.completed?"done":""}">${_(j.title)}</span>
                      </div>
                      <button type="button" class="jira-att-del btn-del-subtask" data-subtask-id="${j.id}" title="Remove subtask">&times;</button>
                    </div>
                  `).join("")}
                </div>

                <div class="jira-subtask-add-row">
                  <input type="text" id="inp-new-subtask" class="jira-subtask-input" placeholder="+ Add a subtask (press Enter)..." />
                  <button type="button" class="btn-jira-secondary" id="btn-add-subtask">Add</button>
                </div>
              </div>

              <!-- Linked Work Items Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Linked Work Items (${W.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${W.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${W.map(j=>`
                      <div class="jira-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${_(j.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${_(j.ticketId)}</span>
                          <span style="font-size:12.5px;color:#f1f5f9;">${_(j.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${_(j.status||"Open")}</span>
                          <button type="button" class="jira-att-del btn-del-link" data-link-id="${j.id}" title="Remove link">&times;</button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

                <div id="jira-link-box" style="display:none;padding:10px;background:#162032;border:1px solid #334155;border-radius:6px;margin-top:6px;">
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="sel-link-rel" class="jira-select-field" style="width:140px;">
                      <option value="relates to">relates to</option>
                      <option value="blocks">blocks</option>
                      <option value="is blocked by">is blocked by</option>
                      <option value="duplicates">duplicates</option>
                    </select>
                    <input type="text" id="inp-link-target" class="jira-subtask-input" placeholder="Ticket ID (e.g. SUP-002)..." style="flex:1;" />
                    <button class="btn-jira-primary" id="btn-submit-link">Link</button>
                    <button class="btn-jira-secondary" id="btn-cancel-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Activity Tabs Section -->
              <div class="jira-section-block" style="margin-top:10px;">
                <div class="jira-sec-title">Activity</div>
                <div class="jira-activity-tabs">
                  <button type="button" class="jira-act-tab ${K==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${Y.length})
                  </button>
                  <button type="button" class="jira-act-tab ${K==="history"?"active":""}" data-act-tab="history">
                    History (${U.length})
                  </button>
                  <button type="button" class="jira-act-tab ${K==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${q.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${K==="comments"?`
                  <div class="jira-comments-feed">
                    ${Y.map(j=>`
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(j.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${_(j.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${_(j.userRole)})</span></span>
                            <span class="jira-comment-time">${ea(j.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${_(j.content)}</div>
                        </div>
                      </div>
                    `).join("")}

                    <!-- Add Comment Composer -->
                    <div class="jira-comment-composer">
                      <div class="jira-avatar" style="background:#3b82f6;">
                        ${((o==null?void 0:o.name)||"U").slice(0,1).toUpperCase()}
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
                        <textarea id="inp-new-comment" class="jira-comment-textarea" rows="2" placeholder="Add an internal comment..."></textarea>
                        <div style="display:flex;justify-content:flex-end;">
                          <button class="btn-jira-primary" id="btn-submit-comment">Save Comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                `:""}

                <!-- B. History Tab -->
                ${K==="history"?`
                  <div class="jira-history-feed">
                    ${U.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:U.map(j=>`
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(j.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${_(j.userName)}</span>
                            <span class="jira-comment-time">${ea(j.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong style="color:#cbd5e1;">${_(j.field)}</strong>:
                            ${j.from?`<span style="text-decoration:line-through;color:#ef4444;">${_(j.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${_(j.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${K==="worklog"?`
                  <div class="jira-worklog-feed">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${s.loggedHours||0} hrs</strong></span>
                      <button class="btn-jira-secondary" id="btn-open-worklog-dialog" style="font-size:11px;padding:4px 8px;">
                        ⏱️ Log Work
                      </button>
                    </div>

                    <div id="jira-worklog-box" style="display:none;padding:10px;background:#162032;border:1px solid #334155;border-radius:6px;margin:6px 0;">
                      <div style="display:flex;flex-direction:column;gap:8px;">
                        <input type="text" id="inp-worklog-time" class="jira-subtask-input" placeholder="Time spent (e.g. 2h 30m, 45m)..." />
                        <input type="text" id="inp-worklog-desc" class="jira-subtask-input" placeholder="Description of work performed..." />
                        <div style="display:flex;justify-content:flex-end;gap:6px;">
                          <button class="btn-jira-primary" id="btn-submit-worklog">Log</button>
                          <button class="btn-jira-secondary" id="btn-cancel-worklog">Cancel</button>
                        </div>
                      </div>
                    </div>

                    ${q.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:q.map(j=>`
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(j.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${_(j.userName)} logged <strong style="color:#38bdf8;">${_(j.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${ea(j.loggedAt)}</span>
                          </div>
                          ${j.description?`<div style="font-size:12px;color:#cbd5e1;">${_(j.description)}</div>`:""}
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}
              </div>
            </div>

            <!-- Right Sidebar Panel (32%) -->
            <div class="jira-detail-sidebar">
              <!-- Status -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Status</span>
                <select id="sel-detail-status" class="jira-select-field">
                  ${da.map(j=>`
                    <option value="${j.key}" ${s.status===j.key?"selected":""}>
                      ${j.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${Tt.map(j=>`
                    <option value="${j.key}" ${s.priority===j.key?"selected":""}>
                      ${j.icon} ${j.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignee -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Assignee</span>
                <select id="sel-detail-assignee" class="jira-select-field">
                  <option value="">Unassigned</option>
                  ${n.map(j=>`
                    <option value="${j._id}" ${s.assignee&&s.assignee.userId&&s.assignee.userId.toString()===j._id.toString()?"selected":""}>
                      ${_(j.name)} (${_(j.role)})
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Reporter (Read Only) -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Reporter</span>
                <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                  <div class="jira-avatar" style="background:#2563eb;">
                    ${(((re=s.reporter)==null?void 0:re.name)||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${_(((ue=s.reporter)==null?void 0:ue.name)||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${_(((le=s.reporter)==null?void 0:le.role)||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${yt.map(j=>`
                    <option value="${j.key}" ${s.category===j.key?"selected":""}>
                      ${j.icon} ${j.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="jira-date-field" value="${s.dueDate?new Date(s.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="jira-select-field">
                  <option value="">None (Workspace General)</option>
                  ${C.map(j=>`
                    <option value="${j._id}" ${s.jobId&&s.jobId.toString()===j._id.toString()?"selected":""}>
                      📁 ${_(j.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${s.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" value="${s.estimatedHours||0}" style="width:45px;background:#1e293b;border:1px solid #334155;color:#f8fafc;padding:2px 4px;border-radius:4px;font-size:12px;" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(s.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(s.updatedAt).toLocaleString()}</div>
                ${s.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(s.resolvedAt).toLocaleString()}</div>`:""}
              </div>

              <!-- Actions (Delete) -->
              ${de||S?`
                <div style="padding-top:10px;">
                  <button type="button" class="jira-tool-btn" id="btn-delete-ticket" style="color:#ef4444;border-color:rgba(239,68,68,0.4);width:100%;padding:6px;">
                    🗑️ Delete Ticket
                  </button>
                </div>
              `:""}
            </div>
          </div>
        </div>
      </div>
    `,it()}function it(){const a=i.querySelector("#jira-modals-root");if(!a||!$)return;const s=a.querySelector("#btn-close-jira-modal");s&&(s.onclick=Ze);const u=a.querySelector("#jira-detail-backdrop");u&&(u.onclick=k=>{k.target===u&&Ze()});const f=a.querySelector("#inp-detail-title");f&&(f.onchange=async()=>{const k=f.value.trim();if(k)try{$=await Xe(`/tickets/${$._id}`,{title:k}),await be()}catch(E){T(E.message||"Failed to update title",!0)}});const x=a.querySelector("#btn-toggle-desc-edit");x&&(x.onclick=()=>{P=!P,he()});const I=a.querySelector("#btn-cancel-desc");I&&(I.onclick=()=>{P=!1,he()});const z=a.querySelector("#btn-save-desc");z&&(z.onclick=async()=>{var E;const k=(E=a.querySelector("#inp-detail-desc"))==null?void 0:E.value;try{$=await Xe(`/tickets/${$._id}`,{description:k}),P=!1,he(),await be(),T("Description saved",!1)}catch(B){T(B.message||"Failed to save description",!0)}});const Y=a.querySelector("#sel-detail-status");Y&&(Y.onchange=async k=>{try{const E=await Xe(`/tickets/${$._id}/status`,{status:k.target.value});$=E,he(),await V(),Ae(),await be(),T(`Status changed to ${E.status}`,!1)}catch(E){T(E.message||"Status change failed",!0)}});const U=a.querySelector("#sel-detail-priority");U&&(U.onchange=async k=>{try{$=await Xe(`/tickets/${$._id}`,{priority:k.target.value}),he(),await be()}catch(E){T(E.message,!0)}});const q=a.querySelector("#sel-detail-assignee");q&&(q.onchange=async k=>{var E;try{const B=await Xe(`/tickets/${$._id}`,{assigneeId:k.target.value||null});$=B,he(),await be(),T(`Assigned to ${((E=B.assignee)==null?void 0:E.name)||"Unassigned"}`,!1)}catch(B){T(B.message,!0)}});const W=a.querySelector("#sel-detail-category");W&&(W.onchange=async k=>{try{$=await Xe(`/tickets/${$._id}`,{category:k.target.value}),he(),await be()}catch(E){T(E.message,!0)}});const O=a.querySelector("#inp-detail-duedate");O&&(O.onchange=async k=>{try{$=await Xe(`/tickets/${$._id}`,{dueDate:k.target.value||null}),he(),await be()}catch(E){T(E.message,!0)}});const S=a.querySelector("#sel-detail-job");S&&(S.onchange=async k=>{try{$=await Xe(`/tickets/${$._id}`,{jobId:k.target.value||null}),he(),await be()}catch(E){T(E.message,!0)}});const de=a.querySelector("#inp-detail-esthours");de&&(de.onchange=async k=>{try{$=await Xe(`/tickets/${$._id}`,{estimatedHours:Number(k.target.value)||0})}catch(E){T(E.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(k=>{k.onchange=async()=>{const E=k.dataset.subtaskId;try{$=await Xe(`/tickets/${$._id}/subtasks/${E}`,{completed:k.checked}),he(),await be()}catch(B){T(B.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(k=>{k.onclick=async()=>{const E=k.dataset.subtaskId;try{$=await Ye(`/tickets/${$._id}/subtasks/${E}`),he(),await be()}catch(B){T(B.message,!0)}}});const re=a.querySelector("#inp-new-subtask"),ue=a.querySelector("#btn-add-subtask"),le=async()=>{const k=re==null?void 0:re.value.trim();if(k)try{$=await ke(`/tickets/${$._id}/subtasks`,{title:k}),he(),await be()}catch(E){T(E.message,!0)}};ue&&(ue.onclick=le),re&&(re.onkeydown=k=>{k.key==="Enter"&&(k.preventDefault(),le())});const j=a.querySelector("#inp-detail-att-upload");j&&(j.onchange=async k=>{const E=Array.from(k.target.files);if(!E.length)return;T("Uploading attachment(s)...",!1);const B=[];for(const pe of E){const xe=new FileReader;await new Promise(Ce=>{xe.onload=async()=>{try{const Ee=xe.result.split(",")[1],ie=await ke("/upload",{files:[{name:pe.name,data:Ee,size:pe.size,type:pe.type}]});ie&&ie.files&&ie.files[0]&&B.push({name:ie.files[0].name||pe.name,url:ie.files[0].url,size:pe.size,type:pe.type})}catch(Ee){console.warn("Upload error for file:",pe.name,Ee)}Ce()},xe.readAsDataURL(pe)})}if(B.length)try{$=await ke(`/tickets/${$._id}/attachments`,{attachments:B}),he(),T("File(s) attached successfully",!1)}catch(pe){T(pe.message||"Failed to attach file(s)",!0)}}),a.querySelectorAll(".btn-del-att").forEach(k=>{k.onclick=async()=>{const E=k.dataset.attId;try{$=await Ye(`/tickets/${$._id}/attachments/${E}`),he()}catch(B){T(B.message,!0)}}}),a.querySelectorAll(".jira-act-tab").forEach(k=>{k.onclick=()=>{K=k.dataset.actTab,he()}});const p=a.querySelector("#inp-new-comment"),b=a.querySelector("#btn-submit-comment");b&&p&&(b.onclick=async()=>{const k=p.value.trim();if(k)try{b.disabled=!0,b.textContent="Saving...",$=await ke(`/tickets/${$._id}/comments`,{content:k}),he(),T("Comment added",!1)}catch(E){T(E.message||"Failed to add comment",!0)}finally{b.disabled=!1}});const l=a.querySelector("#btn-open-link-dialog"),A=a.querySelector("#jira-link-box"),w=a.querySelector("#btn-cancel-link"),R=a.querySelector("#btn-submit-link"),D=a.querySelector("#inp-link-target"),H=a.querySelector("#sel-link-rel");l&&A&&(l.onclick=()=>{A.style.display="block"}),w&&A&&(w.onclick=()=>{A.style.display="none"}),R&&A&&(R.onclick=async()=>{const k=D==null?void 0:D.value.trim(),E=(H==null?void 0:H.value)||"relates to";if(k)try{R.disabled=!0,$=await ke(`/tickets/${$._id}/links`,{targetTicketId:k,relationship:E}),he(),T(`Linked with ${k}`,!1)}catch(B){T(B.message||"Failed to link ticket",!0)}finally{R.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(k=>{k.onclick=async()=>{const E=k.dataset.linkId;try{$=await Ye(`/tickets/${$._id}/links/${E}`),he()}catch(B){T(B.message,!0)}}});const G=a.querySelector("#btn-open-worklog-dialog"),F=a.querySelector("#jira-worklog-box"),L=a.querySelector("#btn-cancel-worklog"),oe=a.querySelector("#btn-submit-worklog"),Z=a.querySelector("#inp-worklog-time"),ce=a.querySelector("#inp-worklog-desc");G&&F&&(G.onclick=()=>{F.style.display="block"}),L&&F&&(L.onclick=()=>{F.style.display="none"}),oe&&F&&(oe.onclick=async()=>{const k=Z==null?void 0:Z.value.trim(),E=ce==null?void 0:ce.value.trim();if(!k){T("Enter time spent (e.g. 2h 30m)",!0);return}try{oe.disabled=!0,$=await ke(`/tickets/${$._id}/worklogs`,{timeSpent:k,description:E}),he(),T("Work logged",!1)}catch(B){T(B.message||"Failed to log work",!0)}finally{oe.disabled=!1}});const Q=a.querySelector("#btn-delete-ticket");Q&&(Q.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${$.ticketId}?`))try{Q.disabled=!0,await Ye(`/tickets/${$._id}`),T(`Ticket ${$.ticketId} deleted`,!1),Ze(),await V(),Ae(),await be()}catch(k){T(k.message||"Failed to delete ticket",!0),Q.disabled=!1}})}function Ze(){$=null,P=!1;const a=i.querySelector("#jira-modals-root");a&&(a.innerHTML="")}function nt(){const a=i.querySelector("#jira-modals-root");if(!a)return;a.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-create-backdrop">
        <div class="jira-modal-card" style="max-width:680px;height:auto;max-height:92vh;">
          <div class="jira-modal-header">
            <h3 style="margin:0;font-size:16px;font-weight:700;color:#f8fafc;">
              🎫 Create Support Ticket
            </h3>
            <button class="jira-modal-close" id="btn-close-create-modal">&times;</button>
          </div>

          <div style="padding:22px;overflow-y:auto;flex:1;">
            <div class="jira-form-grid-2">
              <div class="jira-form-group">
                <label class="jira-form-label">Issue Type / Category *</label>
                <select id="create-ticket-cat" class="jira-select-field">
                  ${yt.map(z=>`<option value="${z.key}">${z.icon} ${z.label}</option>`).join("")}
                </select>
              </div>

              <div class="jira-form-group">
                <label class="jira-form-label">Priority *</label>
                <select id="create-ticket-pri" class="jira-select-field">
                  <option value="Medium" selected>🟡 Medium</option>
                  <option value="Low">🟢 Low</option>
                  <option value="High">🟠 High</option>
                  <option value="Critical">🔴 Critical</option>
                </select>
              </div>
            </div>

            <div class="jira-form-group">
              <label class="jira-form-label">Summary / Title *</label>
              <input type="text" id="create-ticket-title" class="jira-form-input" placeholder="e.g. Navigation dropdown glitch on Safari mobile" required />
            </div>

            <div class="jira-form-group">
              <label class="jira-form-label">Description (Provide details, steps, or context)</label>
              <textarea id="create-ticket-desc" class="jira-form-textarea" rows="4" placeholder="Describe the issue, requirements, or internal request..."></textarea>
            </div>

            <div class="jira-form-grid-2">
              <div class="jira-form-group">
                <label class="jira-form-label">Assignee</label>
                <select id="create-ticket-assignee" class="jira-select-field">
                  <option value="">Unassigned</option>
                  ${n.map(z=>`
                    <option value="${z._id}">
                      ${_(z.name)} (${_(z.role)})
                    </option>
                  `).join("")}
                </select>
              </div>

              <div class="jira-form-group">
                <label class="jira-form-label">Due Date (Optional)</label>
                <input type="date" id="create-ticket-duedate" class="jira-date-field" />
              </div>
            </div>

            <div class="jira-form-group">
              <label class="jira-form-label">Related Job / Internal Project (Optional)</label>
              <select id="create-ticket-job" class="jira-select-field">
                <option value="">None (General Workspace Issue)</option>
                ${C.map(z=>`
                  <option value="${z._id}">
                    📁 ${_(z.title||"Untitled Job")}
                  </option>
                `).join("")}
              </select>
            </div>
          </div>

          <div class="jira-modal-footer">
            <button type="button" class="btn-jira-secondary" id="btn-cancel-create-ticket">Cancel</button>
            <button type="button" class="btn-jira-primary" id="btn-submit-create-ticket">Create Ticket 🚀</button>
          </div>
        </div>
      </div>
    `;const s=()=>{a.innerHTML=""},u=a.querySelector("#btn-close-create-modal");u&&(u.onclick=s);const f=a.querySelector("#btn-cancel-create-ticket");f&&(f.onclick=s);const x=a.querySelector("#jira-create-backdrop");x&&(x.onclick=z=>{z.target===x&&s()});const I=a.querySelector("#btn-submit-create-ticket");I&&(I.onclick=async()=>{var de,re,ue,le,j,p,b;const z=(de=a.querySelector("#create-ticket-title"))==null?void 0:de.value.trim(),Y=(re=a.querySelector("#create-ticket-desc"))==null?void 0:re.value.trim(),U=((ue=a.querySelector("#create-ticket-cat"))==null?void 0:ue.value)||"Task",q=((le=a.querySelector("#create-ticket-pri"))==null?void 0:le.value)||"Medium",W=((j=a.querySelector("#create-ticket-assignee"))==null?void 0:j.value)||null,O=((p=a.querySelector("#create-ticket-duedate"))==null?void 0:p.value)||null,S=((b=a.querySelector("#create-ticket-job"))==null?void 0:b.value)||null;if(!z){T("Ticket summary / title is required",!0);return}try{I.disabled=!0,I.textContent="Creating...";const l=await ke("/tickets",{title:z,description:Y,category:U,priority:q,assigneeId:W,dueDate:O,jobId:S});T(`Ticket ${l.ticketId} created! 🎫`,!1),s(),await V(),Ae(),await be(),Ge(l._id)}catch(l){T(l.message||"Could not create ticket",!0),I.disabled=!1,I.textContent="Create Ticket 🚀"}})}}export{ei as a,Za as b,Xa as i};
