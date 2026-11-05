import{c as je,h as w,e as v,n as Qe,j as Xe,o as Gt,k as Yt,g as Ce,p as ga,t as ta,u as ba}from"./api-DJ1Zya1A.js";const fa={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function _a(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},fa,JSON.parse(i))}catch{}return Object.assign({},fa)}function Ta(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function at(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),d=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${d}`}function Wt(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const d=e.getFullYear(),g=String(e.getMonth()+1).padStart(2,"0"),c=String(e.getDate()).padStart(2,"0");return`${d}-${g}-${c}`}function kt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function gt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ma(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function aa(i,t=1){const e=new Date(i+"T00:00:00"),d=e.getDay(),g=(d<t?7:0)+d-t,c=new Date(e);c.setDate(e.getDate()-g);const l=[];for(let s=0;s<7;s++){const q=new Date(c);q.setDate(c.getDate()+s);const N=q.getFullYear(),$=String(q.getMonth()+1).padStart(2,"0"),T=String(q.getDate()).padStart(2,"0");l.push(`${N}-${$}-${T}`)}return l}function Ia(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,d=t.createOscillator(),g=t.createGain();d.type="sine",d.frequency.setValueAtTime(523.25,e),d.frequency.exponentialRampToValueAtTime(783.99,e+.15),g.gain.setValueAtTime(.2,e),g.gain.exponentialRampToValueAtTime(.001,e+.35),d.connect(g),g.connect(t.destination),d.start(e),d.stop(e+.35)}catch{}}function ti(i,t={}){const{userRole:e="employee",currentUser:d=null,onNavigate:g=null}=t,c=e==="superadmin"||e==="admin";let l=_a(),s={selectedDate:at(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Aa(),q();async function q(){s.loading=!0,N();try{const m=[je("/tasks")];c&&m.push(je("/personnel").catch(()=>[]));const[_,D]=await Promise.all(m);s.tasks=Array.isArray(_)?_:[],D&&(s.personnelList=Array.isArray(D)?D:[])}catch(m){w("Failed to load planner tasks: "+m.message,!0)}finally{s.loading=!1,R()}}function N(){i.innerHTML=`
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
    `}function $(m){return s.tasks.filter(_=>{if(_.isDeleted===!0)return!1;if(c&&s.selectedPersonnelId!=="all"){const a=_.personnelId?._id||_.personnelId;if(String(a)!==String(s.selectedPersonnelId))return!1}const D=_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):"");return D?D===m:m===at()})}function T(m,_){if(m.status==="Completed")return!1;const D=m.dateStr||(m.dueDate?new Date(m.dueDate).toISOString().slice(0,10):"");return D?D<_:!1}function j(m,_){const D=m.length,a=m.filter(V=>V.status==="Completed").length,r=m.filter(V=>V.status==="In Progress").length,C=m.filter(V=>V.status==="Pending"||V.status==="Todo").length,A=m.filter(V=>T(V,_)).length,Q=D>0?Math.round(a/D*100):0;return{total:D,completed:a,inProgress:r,pending:C,overdue:A,percent:Q}}function R(){const m=at(),_=s.selectedDate===m,D=$(s.selectedDate),a=j(D,m);i.innerHTML=`
      <div class="ci360-planner-wrap ${l.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${gt(s.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${v(l.displayName||"Daily Planner")}</h1>
              <p class="ci360-planner-subheading">Plan your day. Track your progress.</p>
            </div>
          </div>

          <div class="ci360-planner-header-actions">
            <!-- View Mode Switcher -->
            <div class="ci360-view-switcher" role="tablist">
              <button type="button" class="ci360-switch-btn ${s.viewMode==="daily"?"active":""}" id="btnViewDaily" title="Daily View">
                <span>📅 Daily</span>
              </button>
              <button type="button" class="ci360-switch-btn ${s.viewMode==="weekly"?"active":""}" id="btnViewWeekly" title="Weekly View">
                <span>🗓️ Weekly</span>
              </button>
              <button type="button" class="ci360-switch-btn ${s.viewMode==="report"?"active":""}" id="btnViewReport" title="Weekly Analytics & Report">
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
              <span class="date-text" id="displayDateLabel">${kt(s.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${s.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${_?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${c?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${s.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${s.personnelList.map(r=>`
                  <option value="${r._id}" ${s.selectedPersonnelId===String(r._id)?"selected":""}>
                    ${v(r.name)} (${v(r.department||r.role||"Team")})
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
              <div class="ci360-circular-progress" style="--val: ${a.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${a.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${a.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <span class="kpi-num">${a.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${a.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${a.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${a.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${a.overdue>0?`
                <div class="kpi-box overdue">
                  <span class="kpi-num">${a.overdue}</span>
                  <span class="kpi-label">Overdue</span>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${a.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${ue(D,a)}
        </main>

      </div>
    `,it(),Le()}function ue(m,_){return s.viewMode==="weekly"?ot():s.viewMode==="report"?Ct():xe(m,_)}function xe(m,_){const D=at();let a=m;if(s.filterStatus==="pending"?a=a.filter(r=>r.status==="Pending"||r.status==="Todo"):s.filterStatus==="in_progress"?a=a.filter(r=>r.status==="In Progress"):s.filterStatus==="completed"?a=a.filter(r=>r.status==="Completed"):s.filterStatus==="overdue"&&(a=a.filter(r=>T(r,D))),s.searchQuery){const r=s.searchQuery.toLowerCase();a=a.filter(C=>(C.title||"").toLowerCase().includes(r)||(C.description||"").toLowerCase().includes(r)||(C.category||"").toLowerCase().includes(r))}return a.sort((r,C)=>{if(r.status==="Completed"&&C.status!=="Completed")return 1;if(r.status!=="Completed"&&C.status==="Completed")return-1;const A={Urgent:0,High:1,Medium:2,Low:3};return(A[r.priority]||2)-(A[C.priority]||2)}),`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              Today's Focus
            </h2>
            <span class="ci360-task-count-badge">${a.length} ${a.length===1?"task":"tasks"}</span>
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${s.filterStatus==="all"?"active":""}" data-f="all">All (${_.total})</button>
              <button type="button" class="filter-pill ${s.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${_.pending})</button>
              <button type="button" class="filter-pill ${s.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${_.inProgress})</button>
              <button type="button" class="filter-pill ${s.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${_.completed})</button>
              ${_.overdue>0?`
                <button type="button" class="filter-pill overdue ${s.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${_.overdue})</button>
              `:""}
            </div>

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${v(s.searchQuery)}">
              ${s.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card / Past Date Locked Banner -->
        ${s.selectedDate<D?`
          <div class="ci360-past-date-banner" style="display:flex;align-items:center;gap:10px;padding:12px 18px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.22);border-radius:10px;font-size:12.5px;color:#f87171;margin-bottom:16px;box-sizing:border-box;">
            <span style="font-size:16px;">🔒</span>
            <span><strong>Date Passed:</strong> Tasks cannot be added or edited for <strong>${kt(s.selectedDate)}</strong> because this date has already passed.</span>
          </div>
        `:`
          <div class="ci360-quick-add-bar">
            <div class="ci360-quick-add-input-wrap">
              <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${gt(s.selectedDate)}... (Press Enter to save)">
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
        `}

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${a.length===0?Ke():`
            <div class="ci360-task-list">
              ${a.map(r=>et(r,D)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function Ke(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${gt(s.selectedDate)}</h3>
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
    `}function et(m,_){const D=m.status==="Completed",a=T(m,_),r=m.dateStr||(m.dueDate?new Date(m.dueDate).toISOString().slice(0,10):_),C=!c&&r<_,A=`pri-${(m.priority||"medium").toLowerCase()}`,Q=`status-${(m.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${D?"is-completed":""} ${a?"is-overdue":""}" data-id="${m._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${D?"checked":""}" data-action="toggle" data-id="${m._id}" title="${D?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${v(m.title)}</span>
          </div>

          ${m.description?`
            <div class="ci360-task-desc">${v(m.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${A}">
              <span class="badge-dot"></span>
              ${v(m.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${Q}">
              ${v(m.status||"Pending")}
            </span>

            <!-- Category -->
            ${m.category?`
              <span class="ci360-badge category-badge">
                #${v(m.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${m.startTime||m.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${m.startTime?v(m.startTime):""}
                   ${m.startTime&&m.dueTime?"–":""}
                   ${m.dueTime?v(m.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${a?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${c&&(m.personnelId?.name||m.userId?.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${v(m.personnelId?.name||m.userId?.name)}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          ${C?`
            <span class="task-action-btn" title="Locked: Tasks cannot be edited after the date has passed" style="opacity:0.45;cursor:not-allowed;display:flex;align-items:center;justify-content:center;font-size:13px;">🔒</span>
          `:`
            <button type="button" class="task-action-btn edit" data-action="edit" data-id="${m._id}" title="Edit task">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button type="button" class="task-action-btn delete" data-action="delete" data-id="${m._id}" title="Delete task">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          `}
        </div>

      </div>
    `}function ot(){const m=aa(s.selectedDate,l.weekStartsOn),_=gt(m[0]),D=gt(m[6]),a=at();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${_} – ${D}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${m.map(r=>{const C=r===a,A=r===s.selectedDate,Q=$(r),V=j(Q,a);return`
              <div class="ci360-day-column ${C?"is-today":""} ${A?"is-selected":""}" data-date="${r}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${r}">
                  <div class="day-name">${ma(r)}</div>
                  <div class="day-number">${new Date(r+"T00:00:00").getDate()}</div>
                  ${C?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${V.completed}/${V.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${V.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${Q.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:Q.map(L=>`
                    <div class="ci360-mini-task-card ${L.status==="Completed"?"done":""}" data-id="${L._id}">
                      <button type="button" class="mini-check ${L.status==="Completed"?"checked":""}" data-action="toggle" data-id="${L._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${L._id}">
                        <div class="mini-title">${v(L.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(L.priority||"medium").toLowerCase()}">${L.priority||"Med"}</span>
                          ${L.dueTime?`<span class="mini-time">${v(L.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button -->
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${r}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function Ct(){const m=aa(s.selectedDate,l.weekStartsOn),_=kt(m[0]),D=kt(m[6]),a=at(),r=s.tasks.filter(O=>{if(O.isDeleted===!0)return!1;const Y=O.dateStr||(O.dueDate?new Date(O.dueDate).toISOString().slice(0,10):"");return m.includes(Y)}),C=r.length,A=r.filter(O=>O.status==="Completed").length,Q=r.filter(O=>O.status==="In Progress").length,V=C>0?Math.round(A/C*100):0,L={Urgent:0,High:0,Medium:0,Low:0};return r.forEach(O=>{const Y=O.priority||"Medium";L[Y]!==void 0&&L[Y]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${_} – ${D}</div>
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
            <span class="value" style="font-size:28px">${C}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${A}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${Q}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${V}%</span>
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
                ${m.map(O=>{const Y=$(O),k=j(Y,a);return`
                    <tr>
                      <td><strong>${ma(O)}</strong></td>
                      <td>${gt(O)}</td>
                      <td>${k.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${k.completed}</td>
                      <td>${k.pending+k.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${k.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${k.percent}%</span>
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
              <div style="font-size:22px;font-weight:700">${L.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${L.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${L.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${L.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function it(){const m=document.getElementById("btnViewDaily"),_=document.getElementById("btnViewWeekly"),D=document.getElementById("btnViewReport");m&&(m.onclick=()=>{s.viewMode="daily",R()}),_&&(_.onclick=()=>{s.viewMode="weekly",R()}),D&&(D.onclick=()=>{s.viewMode="report",R()});const a=document.getElementById("btnPrevDay"),r=document.getElementById("btnNextDay"),C=document.getElementById("btnJumpToday"),A=document.getElementById("hiddenDateInput"),Q=document.getElementById("datePickerBadge");a&&(a.onclick=()=>{s.selectedDate=Wt(s.selectedDate,-1),R()}),r&&(r.onclick=()=>{s.selectedDate=Wt(s.selectedDate,1),R()}),C&&(C.onclick=()=>{s.selectedDate=at(),R()}),Q&&A&&(Q.onclick=()=>{try{typeof A.showPicker=="function"?A.showPicker():A.focus()}catch{A.focus()}},A.onchange=J=>{J.target.value&&(s.selectedDate=J.target.value,R())});const V=document.getElementById("admTeamSelect");V&&(V.onchange=J=>{s.selectedPersonnelId=J.target.value,R()});const L=document.getElementById("btnOpenAddTaskModal");L&&(L.onclick=()=>Fe());const O=document.getElementById("btnPlannerActionsMenu"),Y=document.getElementById("plannerActionsDropdown");O&&Y&&(O.onclick=J=>{J.stopPropagation(),Y.classList.toggle("hidden")},document.addEventListener("click",J=>{!Y.contains(J.target)&&J.target!==O&&Y.classList.add("hidden")}));const k=document.getElementById("btnActionImport");k&&(k.onclick=()=>{Y?.classList.add("hidden"),dt()});const G=document.getElementById("btnActionExportPng");G&&(G.onclick=()=>{Y?.classList.add("hidden"),ze()});const Z=document.getElementById("btnActionExportPdf");Z&&(Z.onclick=()=>{Y?.classList.add("hidden"),de()});const ae=document.getElementById("btnActionBackup");ae&&(ae.onclick=()=>{Y?.classList.add("hidden"),rt()});const ie=document.getElementById("btnActionSettings");ie&&(ie.onclick=()=>{Y?.classList.add("hidden"),he()})}function Le(m){if(s.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(L=>{L.onclick=()=>{s.filterStatus=L.dataset.f,R()}});const _=document.getElementById("plannerTaskSearchInp");_&&(_.oninput=L=>{s.searchQuery=L.target.value,R()});const D=document.getElementById("btnClearSearch");D&&(D.onclick=()=>{s.searchQuery="",R()});const a=document.getElementById("quickAddTitleInp"),r=document.getElementById("quickAddPriority"),C=document.getElementById("quickAddCategory"),A=document.getElementById("btnQuickAddSubmit"),Q=async()=>{const L=(a?.value||"").trim();if(!L){w("Please enter a task title",!0),a?.focus();return}try{const O={title:L,dateStr:s.selectedDate,priority:r?.value||l.defaultPriority,category:C?.value||"General",status:"Pending"};c&&s.selectedPersonnelId!=="all"&&(O.personnelId=s.selectedPersonnelId);const Y=await Ce("/tasks",O);s.tasks.unshift(Y),w("Task added to today's focus! ✨"),a&&(a.value="",a.focus()),R()}catch(O){w(O.message,!0)}};A&&(A.onclick=Q),a&&(a.onkeydown=L=>{L.key==="Enter"&&Q()});const V=document.getElementById("btnEmptyStateImport");V&&(V.onclick=()=>dt())}if(s.viewMode==="weekly"){const _=document.getElementById("btnPrevWeek"),D=document.getElementById("btnNextWeek"),a=document.getElementById("btnThisWeek");_&&(_.onclick=()=>{s.selectedDate=Wt(s.selectedDate,-7),R()}),D&&(D.onclick=()=>{s.selectedDate=Wt(s.selectedDate,7),R()}),a&&(a.onclick=()=>{s.selectedDate=at(),R()}),document.querySelectorAll(".day-col-header").forEach(r=>{r.onclick=()=>{s.selectedDate=r.dataset.date,s.viewMode="daily",R()}}),document.querySelectorAll('[data-action="add-day"]').forEach(r=>{r.onclick=()=>{Fe(null,r.dataset.date)}})}if(s.viewMode==="report"){const _=document.getElementById("btnDownloadWeeklyPdf");_&&(_.onclick=de)}i.querySelectorAll('[data-action="toggle"]').forEach(_=>{_.onclick=async D=>{D.stopPropagation();const a=_.dataset.id;await nt(a)}}),i.querySelectorAll('[data-action="edit"]').forEach(_=>{_.onclick=D=>{D.stopPropagation();const a=_.dataset.id,r=s.tasks.find(C=>C._id===a);r&&Fe(r)}}),i.querySelectorAll('[data-action="delete"]').forEach(_=>{_.onclick=async D=>{D.stopPropagation();const a=_.dataset.id;await pt(a)}})}async function nt(m){const _=s.tasks.find(a=>a._id===m);if(!_)return;const D=_.status!=="Completed";try{const a=await Qe(`/tasks/${m}/toggle`,{}),r=s.tasks.findIndex(C=>C._id===m);r!==-1&&(s.tasks[r]=a),D?(l.soundEnabled&&Ia(),w("Task marked as completed! 🎉")):w("Task reopened as pending."),R()}catch(a){w(a.message,!0)}}async function pt(m){const _=s.tasks.find(D=>D._id===m);if(_&&confirm(`Are you sure you want to remove "${_.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Xe(`/tasks/${m}`),s.tasks=s.tasks.filter(D=>D._id!==m),w("Task removed from planner (safely stored in database archive)"),R()}catch(D){w(D.message,!0)}}function Fe(m=null,_=null){const D=!!m,a=m?m.dateStr||(m.dueDate?new Date(m.dueDate).toISOString().slice(0,10):s.selectedDate):_||s.selectedDate,r=at();if(!c&&a<r){w("Tasks cannot be added or edited after the date is gone.",!0);return}const C=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${D?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${v(m?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${v(m?.description||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${a}" required>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${m?.startTime||""}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${m?.dueTime||""}">
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${m?.priority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!m&&l.defaultPriority==="Medium"||m?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!m&&l.defaultPriority==="High"||m?.priority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${m?.priority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${m?.status==="Pending"||m?.status==="Todo"||!m?"selected":""}>Pending</option>
                <option value="In Progress" ${m?.status==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${m?.status==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${v(m?.category||"General")}">
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
          ${c?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!m||m?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${s.personnelList.map(k=>{const G=m?.personnelId?._id===k._id||m?.personnelId===k._id;return`<option value="${k._id}" ${G?"selected":""}>${v(k.name)} (${v(k.department||k.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${D&&(c||a>=r)?`
                <button type="button" class="btn danger small" id="btnModalDeleteTask" style="padding:6px 12px;background:#ef4444;color:#fff;border-radius:var(--r-sm);border:none;cursor:pointer;font-weight:700;font-size:12px;">🗑️ Delete Task</button>
              `:""}
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
              <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
                ${D?"Save Changes":"Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    `,A=Gt(C),Q=A.querySelector("#taskForm"),V=A.querySelector("#btnModalClose"),L=A.querySelector("#btnCancelModal"),O=A.querySelector("#btnModalDeleteTask"),Y=()=>A.remove();V&&(V.onclick=Y),L&&(L.onclick=Y),O&&m&&(O.onclick=async()=>{Y(),await pt(m._id)}),Q.onsubmit=async k=>{k.preventDefault();const G=A.querySelector("#taskTitle").value.trim(),Z=A.querySelector("#taskDesc").value.trim(),ae=A.querySelector("#taskDate").value,ie=A.querySelector("#taskStartTime").value.trim(),J=A.querySelector("#taskDueTime").value.trim(),u=A.querySelector("#taskPriority").value,f=A.querySelector("#taskStatus").value,o=A.querySelector("#taskCategory").value.trim()||"General";if(!G){w("Task title is required",!0);return}const n={title:G,description:Z,dateStr:ae,startTime:ie,dueTime:J,priority:u,status:f,category:o};if(c){const E=A.querySelector("#taskAssignee")?.value;E==="all"?(n.assignAll=!0,n.personnelId="all"):E&&(n.personnelId=E)}const h=A.querySelector("#btnSaveTask");h.disabled=!0,h.textContent="Saving...";try{if(D){const E=await Yt(`/tasks/${m._id}`,n),S=s.tasks.findIndex(H=>H._id===m._id);S!==-1&&(s.tasks[S]=E),w("Task updated successfully! ✍️")}else{const E=await Ce("/tasks",n);Array.isArray(E.tasks)?E.tasks.forEach(S=>s.tasks.unshift(S)):s.tasks.unshift(E),w("Task created successfully! ✨")}Y(),R()}catch(E){w(E.message,!0),h.disabled=!1,h.textContent=D?"Save Changes":"Create Task"}}}function dt(){let m=[];const _=`
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
              <input type="date" id="importTargetDate" class="input" value="${s.selectedDate}">
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
    `,D=Gt(_),a=()=>D.remove();D.querySelector("#btnImportClose").onclick=a,D.querySelector("#btnCancelImport").onclick=a;const r=D.querySelector("#importTextarea"),C=D.querySelector("#importFileInput"),A=D.querySelector("#importDropzone"),Q=D.querySelector("#previewListArea"),V=D.querySelector("#previewCountLabel"),L=D.querySelector("#btnConfirmImport"),O=D.querySelector("#importFileInfo");function Y(G){if(!G)return[];const Z=G.split(/\r?\n/),ae=[];for(let ie of Z)ie=ie.trim(),ie&&(ie=ie.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),ie=ie.replace(/^[-*•]\s+/,""),ie=ie.replace(/^\d+[\.\)]\s+/,""),ie=ie.trim(),ie&&ae.push(ie));return ae}function k(){const G=r.value,Z=Y(G),ae=D.querySelector("#importTargetDate").value,ie=$(ae),J=new Set(ie.map(u=>(u.title||"").trim().toLowerCase()));m=[];for(const u of Z){const f=J.has(u.toLowerCase());m.push({title:u,isDuplicate:f})}if(V.textContent=`Preview (${m.length} ${m.length===1?"task":"tasks"} found)`,L.disabled=m.length===0,L.textContent=`Import ${m.length} ${m.length===1?"Task":"Tasks"}`,m.length===0){Q.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}Q.innerHTML=m.map((u,f)=>`
        <div class="preview-item ${u.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${f+1}.</span>
          <span class="preview-title">${v(u.title)}</span>
          ${u.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}r.oninput=k,A.onclick=()=>C.click(),C.onchange=G=>{const Z=G.target.files[0];if(!Z)return;O.textContent=`File selected: ${Z.name} (${Math.round(Z.size/1024)} KB)`;const ae=new FileReader;ae.onload=ie=>{r.value=ie.target.result,k()},ae.readAsText(Z)},A.ondragover=G=>{G.preventDefault(),A.classList.add("dragover")},A.ondragleave=()=>A.classList.remove("dragover"),A.ondrop=G=>{G.preventDefault(),A.classList.remove("dragover");const Z=G.dataTransfer.files[0];if(Z&&(Z.type==="text/plain"||Z.name.endsWith(".txt"))){O.textContent=`File dropped: ${Z.name}`;const ae=new FileReader;ae.onload=ie=>{r.value=ie.target.result,k()},ae.readAsText(Z)}else w("Please drop a valid .txt plain-text file",!0)},L.onclick=async()=>{if(m.length===0)return;L.disabled=!0,L.textContent="Importing...";const G=D.querySelector("#importTargetDate").value,Z=D.querySelector("#importPriority").value,ae=D.querySelector("#importCategory").value.trim()||"General",ie={date:G,tasks:m.map(J=>({title:J.title,priority:Z,category:ae,status:"Pending"}))};c&&s.selectedPersonnelId!=="all"&&(ie.personnelId=s.selectedPersonnelId);try{const J=await Ce("/tasks/bulk-import",ie);Array.isArray(J.tasks)&&J.tasks.forEach(u=>s.tasks.unshift(u)),w(`Imported ${J.importedCount} tasks successfully! (${J.skippedCount} skipped duplicates)`),a(),s.selectedDate=G,R()}catch(J){w(J.message,!0),L.disabled=!1,L.textContent="Retry Import"}}}async function ze(){const m=$(s.selectedDate),_=j(m,at()),D=kt(s.selectedDate),a=2,r=800,C=160,A=90,Q=65,V=70,L=Math.max(120,m.length*Q),O=C+A+L+V,Y=document.createElement("canvas");Y.width=r*a,Y.height=O*a;const k=Y.getContext("2d");k.scale(a,a);const G=document.documentElement.getAttribute("data-theme")==="dark",Z=G?"#0F172A":"#F8FAFC",ae=G?"#1E293B":"#FFFFFF",ie=G?"#334155":"#E2E8F0",J=G?"#F8FAFC":"#0F172A",u=G?"#94A3B8":"#475569",f="#4F46E5",o="#10B981",n="#F59E0B";k.fillStyle=Z,k.fillRect(0,0,r,O),k.fillStyle=ae,Re(k,24,20,r-48,C-30,16),k.fill(),k.strokeStyle=ie,k.lineWidth=1,k.stroke(),k.fillStyle=f,k.font="bold 12px Inter, sans-serif",k.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),k.fillStyle=J,k.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',k.fillText(D,44,86),k.fillStyle=u,k.font="13px Inter, sans-serif",k.fillText(`Planned focus list · ${_.completed} of ${_.total} tasks completed (${_.percent}%)`,44,114);const h=C+6;k.fillStyle=ae,Re(k,24,h,r-48,A-16,12),k.fill(),k.stroke();const E=[{label:"TOTAL TASKS",val:String(_.total),color:J},{label:"COMPLETED",val:String(_.completed),color:o},{label:"IN PROGRESS",val:String(_.inProgress),color:n},{label:"PENDING",val:String(_.pending),color:u},{label:"PROGRESS",val:`${_.percent}%`,color:f}],S=(r-48)/E.length;E.forEach((z,M)=>{const W=24+M*S+20;k.fillStyle=z.color,k.font="bold 20px Inter, sans-serif",k.fillText(z.val,W,h+36),k.fillStyle=u,k.font="10px Inter, sans-serif",k.fillText(z.label,W,h+54)});const H=h+A;k.fillStyle=ae,Re(k,24,H,r-48,L+10,16),k.fill(),k.stroke(),m.length===0?(k.fillStyle=u,k.font="14px Inter, sans-serif",k.textAlign="center",k.fillText("No scheduled tasks recorded for this date.",r/2,H+60),k.textAlign="left"):m.forEach((z,M)=>{const W=H+16+M*Q,_e=z.status==="Completed";k.beginPath(),k.arc(48,W+14,10,0,Math.PI*2),_e?(k.fillStyle=o,k.fill(),k.strokeStyle="#FFFFFF",k.lineWidth=2,k.beginPath(),k.moveTo(44,W+14),k.lineTo(47,W+17),k.lineTo(52,W+11),k.stroke()):(k.strokeStyle=ie,k.lineWidth=2,k.stroke()),k.fillStyle=_e?u:J,k.font=`${_e?"normal":"500"} 14px Inter, sans-serif`;const me=z.title.length>55?z.title.slice(0,52)+"...":z.title;if(k.fillText(me,70,W+18),_e){const be=k.measureText(me);k.strokeStyle=u,k.lineWidth=1.2,k.beginPath(),k.moveTo(70,W+14),k.lineTo(70+be.width,W+14),k.stroke()}const le=z.priority||"Medium";let pe="#E2E8F0",F="#334155";le==="Urgent"?(pe="#FEE2E2",F="#DC2626"):le==="High"?(pe="#FEF3C7",F="#D97706"):le==="Low"&&(pe="#ECFDF5",F="#059669"),k.fillStyle=pe,Re(k,r-150,W+4,60,20,10),k.fill(),k.fillStyle=F,k.font="bold 10px Inter, sans-serif",k.fillText(le,r-138,W+18);const re=z.dueTime?`🕒 ${z.dueTime}`:z.category||"General";k.fillStyle=u,k.font="11px Inter, sans-serif",k.fillText(re,70,W+34),M<m.length-1&&(k.strokeStyle=ie,k.lineWidth=.6,k.beginPath(),k.moveTo(40,W+48),k.lineTo(r-40,W+48),k.stroke())});const oe=O-35;k.fillStyle=u,k.font="11px Inter, sans-serif",k.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,oe);try{const z=Y.toDataURL("image/png"),M=document.createElement("a");M.href=z,M.download=`ci360-daily-planner-${s.selectedDate}.png`,document.body.appendChild(M),M.click(),M.remove(),w("Daily Planner image exported! 🖼️")}catch(z){w("Failed to export image: "+z.message,!0)}}function Re(m,_,D,a,r,C){m.beginPath(),m.moveTo(_+C,D),m.lineTo(_+a-C,D),m.quadraticCurveTo(_+a,D,_+a,D+C),m.lineTo(_+a,D+r-C),m.quadraticCurveTo(_+a,D+r,_+a-C,D+r),m.lineTo(_+C,D+r),m.quadraticCurveTo(_,D+r,_,D+r-C),m.lineTo(_,D+C),m.quadraticCurveTo(_,D,_+C,D),m.closePath()}function de(){const m=aa(s.selectedDate,l.weekStartsOn),_=kt(m[0]),D=kt(m[6]);at();const a=s.tasks.filter(L=>{if(L.isDeleted===!0)return!1;const O=L.dateStr||(L.dueDate?new Date(L.dueDate).toISOString().slice(0,10):"");return m.includes(O)}),r=a.length,C=a.filter(L=>L.status==="Completed").length,A=r>0?Math.round(C/r*100):0,Q=window.open("","_blank");if(!Q){w("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const V=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${_}</title>
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
            <div class="period">${_} – ${D}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${r}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${C}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${r-C}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${A}%</div>
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
            ${m.map(L=>{const O=$(L);return O.length===0?`<tr><td><strong>${gt(L)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:O.map(Y=>`
                <tr>
                  <td><strong>${gt(L)}</strong></td>
                  <td>${v(Y.title)}</td>
                  <td><span class="badge badge-${(Y.priority||"medium").toLowerCase().slice(0,3)}">${Y.priority||"Medium"}</span></td>
                  <td>${v(Y.category||"General")}</td>
                  <td>${Y.dueTime||Y.startTime||"—"}</td>
                  <td class="${Y.status==="Completed"?"done":""}">${Y.status||"Pending"}</td>
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
    `;Q.document.write(V),Q.document.close(),w("Weekly PDF report generated for printing! 📄")}function rt(){const _=Gt(`
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
    `),D=()=>_.remove();_.querySelector("#btnBackupClose").onclick=D;const a=_.querySelector("#btnDownloadBackupJson");a.onclick=async()=>{a.disabled=!0,a.textContent="Generating backup...";try{const L=await je("/tasks/backup"),O=new Blob([JSON.stringify(L,null,2)],{type:"application/json"}),Y=URL.createObjectURL(O),k=document.createElement("a");k.href=Y,k.download=`ci360-planner-backup-${at()}.json`,document.body.appendChild(k),k.click(),k.remove(),w("Planner backup downloaded successfully! 💾")}catch(L){w("Backup export failed: "+L.message,!0)}finally{a.disabled=!1,a.textContent="Download JSON Backup"}};const r=_.querySelector("#restoreFileInput"),C=_.querySelector("#restorePreviewArea"),A=_.querySelector("#restoreCountText"),Q=_.querySelector("#btnExecuteRestore");let V=null;r.onchange=L=>{const O=L.target.files[0];if(!O)return;const Y=new FileReader;Y.onload=k=>{try{const G=JSON.parse(k.target.result),Z=Array.isArray(G.tasks)?G.tasks:Array.isArray(G)?G:null;if(!Z||Z.length===0){w("Invalid backup file: No tasks found",!0);return}V=Z,C.style.display="block",A.textContent=`Valid backup: ${Z.length} tasks ready to restore.`,Q.disabled=!1}catch(G){w("Error parsing JSON backup file: "+G.message,!0),C.style.display="none",Q.disabled=!0}},Y.readAsText(O)},Q.onclick=async()=>{if(!V||V.length===0)return;Q.disabled=!0,Q.textContent="Restoring...";const L=_.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const O=await Ce("/tasks/restore",{tasks:V,mode:L});w(`Restored ${O.restoredCount} tasks! (${O.skippedCount} skipped) ✨`),D(),await q()}catch(O){w("Restore failed: "+O.message,!0),Q.disabled=!1,Q.textContent="Retry Restore"}}}function he(){const m=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${v(l.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${l.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${l.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${v(l.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${l.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${l.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${l.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${l.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${l.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${l.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${l.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,_=Gt(m),D=()=>_.remove();_.querySelector("#btnSettingsClose").onclick=D,_.querySelector("#btnCancelSettings").onclick=D,_.querySelector("#settingsForm").onsubmit=a=>{a.preventDefault(),l.displayName=_.querySelector("#setDisplayName").value.trim()||"Daily Planner",l.weekStartsOn=Number(_.querySelector("#setWeekStart").value),l.defaultPriority=_.querySelector("#setDefaultPriority").value,l.density=_.querySelector("#setDensity").value,l.soundEnabled=_.querySelector("#setSound").checked,Ta(l),w("Planner preferences saved! ⚙️"),D(),R()}}}function Aa(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
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
  `,document.head.appendChild(i)}function Da(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function Ea(i,t,e,d,g){const c={move:i,variations:g};return t&&(c.suffix=t),e&&(c.nag=e),d!==null&&(c.comment=d),c}function Pa(...i){const[t,...e]=i;let d=t;for(const g of e)g!==null&&(d.variations=[g,...g.variations],g.variations=[],d=g);return t}function La(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const d=e.variations[0];if(!d){e.comment=t.marker.comment;break}e=d}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ma(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function At(i,t,e,d){var g=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(g,At.prototype),g.expected=t,g.found=e,g.location=d,g.name="SyntaxError",g}Ma(At,Error);function ia(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}At.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,d;for(d=0;d<i.length;d++)if(i[d].source===this.location.source){e=i[d].text.split(/\r\n|\n|\r/g);break}var g=this.location.start,c=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(g):g,l=this.location.source+":"+c.line+":"+c.column;if(e){var s=this.location.end,q=ia("",c.line.toString().length," "),N=e[g.line-1],$=g.line===s.line?s.column:N.length+1,T=$-g.column||1;t+=`
 --> `+l+`
`+q+` |
`+c.line+" | "+N+`
`+q+" | "+ia("",g.column-1," ")+ia("",T,"^")}else t+=`
 at `+l}return t};At.buildMessage=function(i,t){var e={literal:function(N){return'"'+g(N.text)+'"'},class:function(N){var $=N.parts.map(function(T){return Array.isArray(T)?c(T[0])+"-"+c(T[1]):c(T)});return"["+(N.inverted?"^":"")+$.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(N){return N.description}};function d(N){return N.charCodeAt(0).toString(16).toUpperCase()}function g(N){return N.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function($){return"\\x0"+d($)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function($){return"\\x"+d($)})}function c(N){return N.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function($){return"\\x0"+d($)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function($){return"\\x"+d($)})}function l(N){return e[N.type](N)}function s(N){var $=N.map(l),T,j;if($.sort(),$.length>0){for(T=1,j=1;T<$.length;T++)$[T-1]!==$[T]&&($[j]=$[T],j++);$.length=j}switch($.length){case 1:return $[0];case 2:return $[0]+" or "+$[1];default:return $.slice(0,-1).join(", ")+", or "+$[$.length-1]}}function q(N){return N?'"'+g(N)+'"':"end of input"}return"Expected "+s(i)+" but "+q(t)+" found."};function qa(i,t){t=t!==void 0?t:{};var e={},d=t.grammarSource,g={pgn:Pt},c=Pt,l="[",s='"',q="]",N=".",$="O-O-O",T="O-O",j="0-0-0",R="0-0",ue="$",xe="{",Ke="}",et=";",ot="(",Ct=")",it="1-0",Le="0-1",nt="1/2-1/2",pt="*",Fe=/^[a-zA-Z]/,dt=/^[^"]/,ze=/^[0-9]/,Re=/^[.]/,de=/^[a-zA-Z1-8\-=]/,rt=/^[+#]/,he=/^[!?]/,m=/^[^}]/,_=/^[^\r\n]/,D=/^[ \t\r\n]/,a=Je("tag pair"),r=qe("[",!1),C=qe('"',!1),A=qe("]",!1),Q=Je("tag name"),V=Ze([["a","z"],["A","Z"]],!1,!1),L=Je("tag value"),O=Ze(['"'],!0,!1),Y=Je("move number"),k=Ze([["0","9"]],!1,!1),G=qe(".",!1),Z=Ze(["."],!1,!1),ae=Je("standard algebraic notation"),ie=qe("O-O-O",!1),J=qe("O-O",!1),u=qe("0-0-0",!1),f=qe("0-0",!1),o=Ze([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),n=Ze(["+","#"],!1,!1),h=Je("suffix annotation"),E=Ze(["!","?"],!1,!1),S=Je("NAG"),H=qe("$",!1),oe=Je("brace comment"),z=qe("{",!1),M=Ze(["}"],!0,!1),W=qe("}",!1),_e=Je("rest of line comment"),me=qe(";",!1),le=Ze(["\r",`
`],!0,!1),pe=Je("variation"),F=qe("(",!1),re=qe(")",!1),be=Je("game termination marker"),ge=qe("1-0",!1),ye=qe("0-1",!1),Pe=qe("1/2-1/2",!1),Be=qe("*",!1),Ge=Je("whitespace"),Me=Ze([" ","	","\r",`
`],!1,!1),ce=function(b,y){return La(b,y)},Ae=function(b){return Object.fromEntries(b)},Ue=function(b,y){return[b,y]},Ne=function(b,y){return{root:b,marker:y}},Ee=function(b,y){return Pa(Da(b),...y.flat())},Ie=function(b,y,x,K,X){return Ea(b,y,x,K,X)},De=function(b){return b},ke=function(b){return b.replace(/[\r\n]+/g," ")},fe=function(b){return b.trim()},P=function(b){return b},B=function(b,y){return{result:b,comment:y}},p=t.peg$currPos|0,Te=[{line:1,column:1}],we=p,st=t.peg$maxFailExpected||[],U=t.peg$silentFails|0,ht;if(t.startRule){if(!(t.startRule in g))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');c=g[t.startRule]}function qe(b,y){return{type:"literal",text:b,ignoreCase:y}}function Ze(b,y,x){return{type:"class",parts:b,inverted:y,ignoreCase:x}}function _t(){return{type:"end"}}function Je(b){return{type:"other",description:b}}function Dt(b){var y=Te[b],x;if(y)return y;if(b>=Te.length)x=Te.length-1;else for(x=b;!Te[--x];);for(y=Te[x],y={line:y.line,column:y.column};x<b;)i.charCodeAt(x)===10?(y.line++,y.column=1):y.column++,x++;return Te[b]=y,y}function Et(b,y,x){var K=Dt(b),X=Dt(y),$e={source:d,start:{offset:b,line:K.line,column:K.column},end:{offset:y,line:X.line,column:X.column}};return $e}function ee(b){p<we||(p>we&&(we=p,st=[]),st.push(b))}function Bt(b,y,x){return new At(At.buildMessage(b,y),b,y,x)}function Pt(){var b,y,x;return b=p,y=Zt(),x=ea(),b=ce(y,x),b}function Zt(){var b,y,x;for(b=p,y=[],x=vt();x!==e;)y.push(x),x=vt();return x=Se(),b=Ae(y),b}function vt(){var b,y,x,K,X,$e,ct;return U++,b=p,Se(),i.charCodeAt(p)===91?(y=l,p++):(y=e,U===0&&ee(r)),y!==e?(Se(),x=Nt(),x!==e?(Se(),i.charCodeAt(p)===34?(K=s,p++):(K=e,U===0&&ee(C)),K!==e?(X=Ot(),i.charCodeAt(p)===34?($e=s,p++):($e=e,U===0&&ee(C)),$e!==e?(Se(),i.charCodeAt(p)===93?(ct=q,p++):(ct=e,U===0&&ee(A)),ct!==e?b=Ue(x,X):(p=b,b=e)):(p=b,b=e)):(p=b,b=e)):(p=b,b=e)):(p=b,b=e),U--,b===e&&U===0&&ee(a),b}function Nt(){var b,y,x;if(U++,b=p,y=[],x=i.charAt(p),Fe.test(x)?p++:(x=e,U===0&&ee(V)),x!==e)for(;x!==e;)y.push(x),x=i.charAt(p),Fe.test(x)?p++:(x=e,U===0&&ee(V));else y=e;return y!==e?b=i.substring(b,p):b=y,U--,b===e&&(y=e,U===0&&ee(Q)),b}function Ot(){var b,y,x;for(U++,b=p,y=[],x=i.charAt(p),dt.test(x)?p++:(x=e,U===0&&ee(O));x!==e;)y.push(x),x=i.charAt(p),dt.test(x)?p++:(x=e,U===0&&ee(O));return b=i.substring(b,p),U--,y=e,U===0&&ee(L),b}function ea(){var b,y,x;return b=p,y=Ft(),Se(),x=ve(),x===e&&(x=null),Se(),b=Ne(y,x),b}function Ft(){var b,y,x,K;for(b=p,y=Ut(),y===e&&(y=null),x=[],K=Lt();K!==e;)x.push(K),K=Lt();return b=Ee(y,x),b}function Lt(){var b,y,x,K,X,$e,ct,It;if(b=p,Se(),Tt(),Se(),y=Mt(),y!==e){for(x=ut(),x===e&&(x=null),K=[],X=xt();X!==e;)K.push(X),X=xt();for(X=Se(),$e=Ut(),$e===e&&($e=null),ct=[],It=te();It!==e;)ct.push(It),It=te();b=Ie(y,x,K,$e,ct)}else p=b,b=e;return b}function Tt(){var b,y,x,K,X,$e;for(U++,b=p,y=[],x=i.charAt(p),ze.test(x)?p++:(x=e,U===0&&ee(k));x!==e;)y.push(x),x=i.charAt(p),ze.test(x)?p++:(x=e,U===0&&ee(k));if(i.charCodeAt(p)===46?(x=N,p++):(x=e,U===0&&ee(G)),x!==e){for(K=Se(),X=[],$e=i.charAt(p),Re.test($e)?p++:($e=e,U===0&&ee(Z));$e!==e;)X.push($e),$e=i.charAt(p),Re.test($e)?p++:($e=e,U===0&&ee(Z));y=[y,x,K,X],b=y}else p=b,b=e;return U--,b===e&&(y=e,U===0&&ee(Y)),b}function Mt(){var b,y,x,K,X,$e;if(U++,b=p,y=p,i.substr(p,5)===$?(x=$,p+=5):(x=e,U===0&&ee(ie)),x===e&&(i.substr(p,3)===T?(x=T,p+=3):(x=e,U===0&&ee(J)),x===e&&(i.substr(p,5)===j?(x=j,p+=5):(x=e,U===0&&ee(u)),x===e&&(i.substr(p,3)===R?(x=R,p+=3):(x=e,U===0&&ee(f)),x===e))))if(x=p,K=i.charAt(p),Fe.test(K)?p++:(K=e,U===0&&ee(V)),K!==e){if(X=[],$e=i.charAt(p),de.test($e)?p++:($e=e,U===0&&ee(o)),$e!==e)for(;$e!==e;)X.push($e),$e=i.charAt(p),de.test($e)?p++:($e=e,U===0&&ee(o));else X=e;X!==e?(K=[K,X],x=K):(p=x,x=e)}else p=x,x=e;return x!==e?(K=i.charAt(p),rt.test(K)?p++:(K=e,U===0&&ee(n)),K===e&&(K=null),x=[x,K],y=x):(p=y,y=e),y!==e?b=i.substring(b,p):b=y,U--,b===e&&(y=e,U===0&&ee(ae)),b}function ut(){var b,y,x;for(U++,b=p,y=[],x=i.charAt(p),he.test(x)?p++:(x=e,U===0&&ee(E));x!==e;)y.push(x),y.length>=2?x=e:(x=i.charAt(p),he.test(x)?p++:(x=e,U===0&&ee(E)));return y.length<1?(p=b,b=e):b=y,U--,b===e&&(y=e,U===0&&ee(h)),b}function xt(){var b,y,x,K,X;if(U++,b=p,Se(),i.charCodeAt(p)===36?(y=ue,p++):(y=e,U===0&&ee(H)),y!==e){if(x=p,K=[],X=i.charAt(p),ze.test(X)?p++:(X=e,U===0&&ee(k)),X!==e)for(;X!==e;)K.push(X),X=i.charAt(p),ze.test(X)?p++:(X=e,U===0&&ee(k));else K=e;K!==e?x=i.substring(x,p):x=K,x!==e?b=De(x):(p=b,b=e)}else p=b,b=e;return U--,b===e&&U===0&&ee(S),b}function Ut(){var b;return b=Ht(),b===e&&(b=I()),b}function Ht(){var b,y,x,K,X;if(U++,b=p,i.charCodeAt(p)===123?(y=xe,p++):(y=e,U===0&&ee(z)),y!==e){for(x=p,K=[],X=i.charAt(p),m.test(X)?p++:(X=e,U===0&&ee(M));X!==e;)K.push(X),X=i.charAt(p),m.test(X)?p++:(X=e,U===0&&ee(M));x=i.substring(x,p),i.charCodeAt(p)===125?(K=Ke,p++):(K=e,U===0&&ee(W)),K!==e?b=ke(x):(p=b,b=e)}else p=b,b=e;return U--,b===e&&(y=e,U===0&&ee(oe)),b}function I(){var b,y,x,K,X;if(U++,b=p,i.charCodeAt(p)===59?(y=et,p++):(y=e,U===0&&ee(me)),y!==e){for(x=p,K=[],X=i.charAt(p),_.test(X)?p++:(X=e,U===0&&ee(le));X!==e;)K.push(X),X=i.charAt(p),_.test(X)?p++:(X=e,U===0&&ee(le));x=i.substring(x,p),b=fe(x)}else p=b,b=e;return U--,b===e&&(y=e,U===0&&ee(_e)),b}function te(){var b,y,x,K;return U++,b=p,Se(),i.charCodeAt(p)===40?(y=ot,p++):(y=e,U===0&&ee(F)),y!==e?(x=Ft(),x!==e?(Se(),i.charCodeAt(p)===41?(K=Ct,p++):(K=e,U===0&&ee(re)),K!==e?b=P(x):(p=b,b=e)):(p=b,b=e)):(p=b,b=e),U--,b===e&&U===0&&ee(pe),b}function ve(){var b,y,x;return U++,b=p,i.substr(p,3)===it?(y=it,p+=3):(y=e,U===0&&ee(ge)),y===e&&(i.substr(p,3)===Le?(y=Le,p+=3):(y=e,U===0&&ee(ye)),y===e&&(i.substr(p,7)===nt?(y=nt,p+=7):(y=e,U===0&&ee(Pe)),y===e&&(i.charCodeAt(p)===42?(y=pt,p++):(y=e,U===0&&ee(Be))))),y!==e?(Se(),x=Ut(),x===e&&(x=null),b=B(y,x)):(p=b,b=e),U--,b===e&&(y=e,U===0&&ee(be)),b}function Se(){var b,y;for(U++,b=[],y=i.charAt(p),D.test(y)?p++:(y=e,U===0&&ee(Me));y!==e;)b.push(y),y=i.charAt(p),D.test(y)?p++:(y=e,U===0&&ee(Me));return U--,y=e,U===0&&ee(Ge),b}if(ht=c(),t.peg$library)return{peg$result:ht,peg$currPos:p,peg$FAILED:e,peg$maxFailExpected:st,peg$maxFailPos:we};if(ht!==e&&p===i.length)return ht;throw ht!==e&&p<i.length&&ee(_t()),Bt(st,we<i.length?i.charAt(we):null,we<i.length?Et(we,we+1):Et(we,we))}/**
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
 */const Jt=0xffffffffffffffffn;function na(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function ha(i,t){return i*t&Jt}function za(i){return function(){let t=BigInt(i&Jt),e=BigInt(i>>64n&Jt);const d=ha(na(ha(t,5n),7n),9n);return e^=t,t=(na(t,24n)^e^e<<16n)&Jt,e=na(e,37n),i=e<<64n|t,d}}const Xt=za(0xa187eb39cdcaed8f31c4b365b102e01en),Ra=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Xt()))),ja=Array.from({length:8},()=>Xt()),Ba=Array.from({length:16},()=>Xt()),oa=Xt(),Ye="w",tt="b",Oe="p",pa="n",Qt="b",Rt="r",mt="q",He="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Kt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:d,piece:g,from:c,to:l,flags:s,captured:q,promotion:N}=e,$=We(c),T=We(l);this.color=d,this.piece=g,this.from=$,this.to=T,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=$+T,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const j in se)se[j]&s&&(this.flags+=wt[j]);q&&(this.captured=q),N&&(this.promotion=N,this.lan+=N)}isCapture(){return this.flags.indexOf(wt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(wt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(wt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(wt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(wt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(wt.BIG_PAWN)>-1}}const Ve=-1,wt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},se={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ua={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Na={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Oa={...ua,...Na},ne={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},sa={b:[16,32,17,15],w:[-16,-32,-17,-15]},va={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Fa=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ua=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ha={p:1,n:2,b:4,r:8,q:16,k:32},Ga="pnbrqkPNBRQK",xa=[pa,Qt,Rt,mt],Wa=7,Ka=6,Va=1,Ya=0,Vt={[He]:se.KSIDE_CASTLE,[mt]:se.QSIDE_CASTLE},bt={w:[{square:ne.a1,flag:se.QSIDE_CASTLE},{square:ne.h1,flag:se.KSIDE_CASTLE}],b:[{square:ne.a8,flag:se.QSIDE_CASTLE},{square:ne.h8,flag:se.KSIDE_CASTLE}]},Ja={b:Va,w:Ka},la="--";function St(i){return i>>4}function jt(i){return i&15}function $a(i){return"0123456789".indexOf(i)!==-1}function We(i){const t=jt(i),e=St(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function qt(i){return i===Ye?tt:Ye}function Qa(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const d=parseInt(t[4],10);if(isNaN(d)||d<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const g=t[0].split("/");if(g.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let l=0;l<g.length;l++){let s=0,q=!1;for(let N=0;N<g[l].length;N++)if($a(g[l][N])){if(q)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};s+=parseInt(g[l][N],10),q=!0}else{if(!/^[prnbqkPRNBQK]$/.test(g[l][N]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};s+=1,q=!1}if(s!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const c=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:l,regex:s}of c){if(!s.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${l} king`};if((t[0].match(s)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${l} kings`}}return Array.from(g[0]+g[7]).some(l=>l.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Xa(i,t){const e=i.from,d=i.to,g=i.piece;let c=0,l=0,s=0;for(let q=0,N=t.length;q<N;q++){const $=t[q].from,T=t[q].to,j=t[q].piece;g===j&&e!==$&&d===T&&(c++,St(e)===St($)&&l++,jt(e)===jt($)&&s++)}return c>0?l>0&&s>0?We(e):s>0?We(e).charAt(1):We(e).charAt(0):""}function ft(i,t,e,d,g,c=void 0,l=se.NORMAL){const s=St(d);if(g===Oe&&(s===Wa||s===Ya))for(let q=0;q<xa.length;q++){const N=xa[q];i.push({color:t,from:e,to:d,piece:g,captured:c,promotion:N,flags:l|se.PROMOTION})}else i.push({color:t,from:e,to:d,piece:g,captured:c,flags:l})}function ya(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:Oe:(t=t.toLowerCase(),t==="o"?He:t)}function da(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ka{_board=new Array(128);_turn=Ye;_header={};_kings={w:Ve,b:Ve};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=ra,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Ve,b:Ve},this._turn=Ye,this._castling={w:0,b:0},this._epSquare=Ve,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Oa},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:d=!1}={}){let g=t.split(/\s+/);if(g.length>=2&&g.length<6){const s=["-","-","0","1"];t=g.concat(s.slice(-(6-g.length))).join(" ")}if(g=t.split(/\s+/),!e){const{ok:s,error:q}=Qa(t);if(!s)throw new Error(q)}const c=g[0];let l=0;this.clear({preserveHeaders:d});for(let s=0;s<c.length;s++){const q=c.charAt(s);if(q==="/")l+=8;else if($a(q))l+=parseInt(q,10);else{const N=q<"a"?Ye:tt;this._put({type:q.toLowerCase(),color:N},We(l)),l++}}this._turn=g[1],g[2].indexOf("K")>-1&&(this._castling.w|=se.KSIDE_CASTLE),g[2].indexOf("Q")>-1&&(this._castling.w|=se.QSIDE_CASTLE),g[2].indexOf("k")>-1&&(this._castling.b|=se.KSIDE_CASTLE),g[2].indexOf("q")>-1&&(this._castling.b|=se.QSIDE_CASTLE),this._epSquare=g[3]==="-"?Ve:ne[g[3]],this._halfMoves=parseInt(g[4],10),this._moveNumber=parseInt(g[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,d="";for(let l=ne.a8;l<=ne.h1;l++){if(this._board[l]){e>0&&(d+=e,e=0);const{color:s,type:q}=this._board[l];d+=s===Ye?q.toUpperCase():q.toLowerCase()}else e++;l+1&136&&(e>0&&(d+=e),l!==ne.h1&&(d+="/"),e=0,l+=8)}let g="";this._castling[Ye]&se.KSIDE_CASTLE&&(g+="K"),this._castling[Ye]&se.QSIDE_CASTLE&&(g+="Q"),this._castling[tt]&se.KSIDE_CASTLE&&(g+="k"),this._castling[tt]&se.QSIDE_CASTLE&&(g+="q"),g=g||"-";let c="-";if(this._epSquare!==Ve)if(t)c=We(this._epSquare);else{const l=this._epSquare+(this._turn===Ye?16:-16),s=[l+1,l-1];for(const q of s){if(q&136)continue;const N=this._turn;if(this._board[q]?.color===N&&this._board[q]?.type===Oe){this._makeMove({color:N,from:q,to:this._epSquare,piece:Oe,captured:Oe,flags:se.EP_CAPTURE});const $=!this._isKingAttacked(N);if(this._undoMove(),$){c=We(this._epSquare);break}}}}return[d,this._turn,g,c,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:d}=this._board[t],g={w:0,b:1}[e],c={p:0,n:1,b:2,r:3,q:4,k:5}[d];return Ra[g][c][t]}_epKey(){return this._epSquare===Ve?0n:ja[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Ba[t]}_computeHash(){let t=0n;for(let e=ne.a8;e<=ne.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=oa),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[ne[t]]}findPiece(t){const e=[];for(let d=ne.a8;d<=ne.h1;d++){if(d&136){d+=7;continue}!this._board[d]||this._board[d]?.color!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(We(d))}return e}put({type:t,color:e},d){return this._put({type:t,color:e},d)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},d){if(Ga.indexOf(t.toLowerCase())===-1||!(d in ne))return!1;const g=ne[d];if(t==He&&!(this._kings[e]==Ve||this._kings[e]==g))return!1;const c=this._board[g];return c&&c.type===He&&(this._kings[c.color]=Ve),this._set(g,{type:t,color:e}),t===He&&(this._kings[e]=g),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(ne[t]),e&&e.type===He&&(this._kings[e.color]=Ve),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[ne.e1]?.type===He&&this._board[ne.e1]?.color===Ye,e=this._board[ne.e8]?.type===He&&this._board[ne.e8]?.color===tt;(!t||this._board[ne.a1]?.type!==Rt||this._board[ne.a1]?.color!==Ye)&&(this._castling.w&=-65),(!t||this._board[ne.h1]?.type!==Rt||this._board[ne.h1]?.color!==Ye)&&(this._castling.w&=-33),(!e||this._board[ne.a8]?.type!==Rt||this._board[ne.a8]?.color!==tt)&&(this._castling.b&=-65),(!e||this._board[ne.h8]?.type!==Rt||this._board[ne.h8]?.color!==tt)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Ve)return;const t=this._epSquare+(this._turn===Ye?-16:16),e=this._epSquare+(this._turn===Ye?16:-16),d=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==qt(this._turn)||this._board[e]?.type!==Oe){this._hash^=this._epKey(),this._epSquare=Ve;return}const g=c=>!(c&136)&&this._board[c]?.color===this._turn&&this._board[c]?.type===Oe;d.some(g)||(this._hash^=this._epKey(),this._epSquare=Ve)}_attacked(t,e,d){const g=[];for(let c=ne.a8;c<=ne.h1;c++){if(c&136){c+=7;continue}if(this._board[c]===void 0||this._board[c].color!==t)continue;const l=this._board[c],s=c-e;if(s===0)continue;const q=s+119;if(Fa[q]&Ha[l.type]){if(l.type===Oe){if(s>0&&l.color===Ye||s<=0&&l.color===tt)if(d)g.push(We(c));else return!0;continue}if(l.type==="n"||l.type==="k")if(d){g.push(We(c));continue}else return!0;const N=Ua[q];let $=c+N,T=!1;for(;$!==e;){if(this._board[$]!=null){T=!0;break}$+=N}if(!T)if(d){g.push(We(c));continue}else return!0}}return d?g:!1}attackers(t,e){return e?this._attacked(e,ne[t],!0):this._attacked(this._turn,ne[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(qt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,ne[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let d=0,g=0;for(let c=ne.a8;c<=ne.h1;c++){if(g=(g+1)%2,c&136){c+=7;continue}const l=this._board[c];l&&(t[l.type]=l.type in t?t[l.type]+1:1,l.type===Qt&&e.push(g),d++)}if(d===2)return!0;if(d===3&&(t[Qt]===1||t[pa]===1))return!0;if(d===t[Qt]+2){let c=0;const l=e.length;for(let s=0;s<l;s++)c+=e[s];if(c===0||c===l)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:d=void 0}={}){const g=this._moves({square:e,piece:d});return t?g.map(c=>new Kt(this,c)):g.map(c=>this._moveToSan(c,g))}_moves({legal:t=!0,piece:e=void 0,square:d=void 0}={}){const g=d?d.toLowerCase():void 0,c=e?.toLowerCase(),l=[],s=this._turn,q=qt(s);let N=ne.a8,$=ne.h1,T=!1;if(g)if(g in ne)N=$=ne[g],T=!0;else return[];for(let R=N;R<=$;R++){if(R&136){R+=7;continue}if(!this._board[R]||this._board[R].color===q)continue;const{type:ue}=this._board[R];let xe;if(ue===Oe){if(c&&c!==ue)continue;xe=R+sa[s][0],this._board[xe]||(ft(l,s,R,xe,Oe),xe=R+sa[s][1],Ja[s]===St(R)&&!this._board[xe]&&ft(l,s,R,xe,Oe,void 0,se.BIG_PAWN));for(let Ke=2;Ke<4;Ke++)xe=R+sa[s][Ke],!(xe&136)&&(this._board[xe]?.color===q?ft(l,s,R,xe,Oe,this._board[xe].type,se.CAPTURE):xe===this._epSquare&&ft(l,s,R,xe,Oe,Oe,se.EP_CAPTURE))}else{if(c&&c!==ue)continue;for(let Ke=0,et=va[ue].length;Ke<et;Ke++){const ot=va[ue][Ke];for(xe=R;xe+=ot,!(xe&136);){if(!this._board[xe])ft(l,s,R,xe,ue);else{if(this._board[xe].color===s)break;ft(l,s,R,xe,ue,this._board[xe].type,se.CAPTURE);break}if(ue===pa||ue===He)break}}}}if((c===void 0||c===He)&&(!T||$===this._kings[s])){if(this._castling[s]&se.KSIDE_CASTLE){const R=this._kings[s],ue=R+2;!this._board[R+1]&&!this._board[ue]&&!this._attacked(q,this._kings[s])&&!this._attacked(q,R+1)&&!this._attacked(q,ue)&&ft(l,s,this._kings[s],ue,He,void 0,se.KSIDE_CASTLE)}if(this._castling[s]&se.QSIDE_CASTLE){const R=this._kings[s],ue=R-2;!this._board[R-1]&&!this._board[R-2]&&!this._board[R-3]&&!this._attacked(q,this._kings[s])&&!this._attacked(q,R-1)&&!this._attacked(q,ue)&&ft(l,s,this._kings[s],ue,He,void 0,se.QSIDE_CASTLE)}}if(!t||this._kings[s]===-1)return l;const j=[];for(let R=0,ue=l.length;R<ue;R++)this._makeMove(l[R]),this._isKingAttacked(s)||j.push(l[R]),this._undoMove();return j}move(t,{strict:e=!1}={}){let d=null;if(typeof t=="string")d=this._moveFromSan(t,e);else if(t===null)d=this._moveFromSan(la,e);else if(typeof t=="object"){const c=this._moves();for(let l=0,s=c.length;l<s;l++)if(t.from===We(c[l].from)&&t.to===We(c[l].to)&&(!("promotion"in c[l])||t.promotion===c[l].promotion)){d=c[l];break}}if(!d)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&d.flags&se.NULL_MOVE)throw new Error("Null move not allowed when in check");const g=new Kt(this,d);return this._makeMove(d),this._incPositionCount(),g}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,d=qt(e);if(this._push(t),t.flags&se.NULL_MOVE){e===tt&&this._moveNumber++,this._halfMoves++,this._turn=d,this._epSquare=Ve;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&se.EP_CAPTURE&&(this._turn===tt?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===He){if(this._kings[e]=t.to,t.flags&se.KSIDE_CASTLE){const g=t.to-1,c=t.to+1;this._movePiece(c,g)}else if(t.flags&se.QSIDE_CASTLE){const g=t.to+1,c=t.to-2;this._movePiece(c,g)}this._castling[e]=0}if(this._castling[e]){for(let g=0,c=bt[e].length;g<c;g++)if(t.from===bt[e][g].square&&this._castling[e]&bt[e][g].flag){this._castling[e]^=bt[e][g].flag;break}}if(this._castling[d]){for(let g=0,c=bt[d].length;g<c;g++)if(t.to===bt[d][g].square&&this._castling[d]&bt[d][g].flag){this._castling[d]^=bt[d][g].flag;break}}if(this._hash^=this._castlingKey(),t.flags&se.BIG_PAWN){let g;e===tt?g=t.to-16:g=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===Oe&&this._board[t.to-1]?.color===d||!(t.to+1&136)&&this._board[t.to+1]?.type===Oe&&this._board[t.to+1]?.color===d?(this._epSquare=g,this._hash^=this._epKey()):this._epSquare=Ve}else this._epSquare=Ve;t.piece===Oe?this._halfMoves=0:t.flags&(se.CAPTURE|se.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===tt&&this._moveNumber++,this._turn=d,this._hash^=oa}undo(){const t=this._hash,e=this._undoMove();if(e){const d=new Kt(this,e);return this._decPositionCount(t),d}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=oa;const d=this._turn,g=qt(d);if(e.flags&se.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:d})),e.captured)if(e.flags&se.EP_CAPTURE){let c;d===tt?c=e.to-16:c=e.to+16,this._set(c,{type:Oe,color:g})}else this._set(e.to,{type:e.captured,color:g});if(e.flags&(se.KSIDE_CASTLE|se.QSIDE_CASTLE)){let c,l;e.flags&se.KSIDE_CASTLE?(c=e.to+1,l=e.to-1):(c=e.to-2,l=e.to+1),this._movePiece(l,c)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const d=[];let g=!1;for(const j in this._header)this._header[j]&&d.push(`[${j} "${this._header[j]}"]`+t),g=!0;g&&this._history.length&&d.push(t);const c=j=>{const R=this._comments[this.fen()];if(typeof R<"u"){const ue=j.length>0?" ":"";j=`${j}${ue}{${R}}`}return j},l=[];for(;this._history.length>0;)l.push(this._undoMove());const s=[];let q="";for(l.length===0&&s.push(c(""));l.length>0;){q=c(q);const j=l.pop();if(!j)break;if(!this._history.length&&j.color==="b"){const R=`${this._moveNumber}. ...`;q=q?`${q} ${R}`:R}else j.color==="w"&&(q.length&&s.push(q),q=this._moveNumber+".");q=q+" "+this._moveToSan(j,this._moves({legal:!0})),this._makeMove(j)}if(q.length&&s.push(c(q)),s.push(this._header.Result||"*"),e===0)return d.join("")+s.join(" ");const N=function(){return d.length>0&&d[d.length-1]===" "?(d.pop(),!0):!1},$=function(j,R){for(const ue of R.split(" "))if(ue){if(j+ue.length>e){for(;N();)j--;d.push(t),j=0}d.push(ue),j+=ue.length,d.push(" "),j++}return N()&&j--,j};let T=0;for(let j=0;j<s.length;j++){if(T+s[j].length>e&&s[j].includes("{")){T=$(T,s[j]);continue}T+s[j].length>e&&j!==0?(d[d.length-1]===" "&&d.pop(),d.push(t),T=0):j!==0&&(d.push(" "),T++),d.push(s[j]),T+=s[j].length}return d.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ua[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ua[t]||null,!0):!1}getHeaders(){const t={};for(const[e,d]of Object.entries(this._header))d!==null&&(t[e]=d);return t}loadPgn(t,{strict:e=!1,newlineChar:d=`\r?
`}={}){d!==`\r?
`&&(t=t.replace(new RegExp(d,"g"),`
`));const g=qa(t);this.reset();const c=g.headers;let l="";for(const N in c)N.toLowerCase()==="fen"&&(l=c[N]),this.header(N,c[N]);if(!e)l&&this.load(l,{preserveHeaders:!0});else if(c.SetUp==="1"){if(!("FEN"in c))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(c.FEN,{preserveHeaders:!0})}let s=g.root;for(;s;){if(s.move){const N=this._moveFromSan(s.move,e);if(N==null)throw new Error(`Invalid move in PGN: ${s.move}`);this._makeMove(N),this._incPositionCount()}s.comment!==void 0&&(this._comments[this.fen()]=s.comment),s=s.variations[0]}const q=g.result;q&&Object.keys(this._header).length&&this._header.Result!==q&&this.setHeader("Result",q)}_moveToSan(t,e){let d="";if(t.flags&se.KSIDE_CASTLE)d="O-O";else if(t.flags&se.QSIDE_CASTLE)d="O-O-O";else{if(t.flags&se.NULL_MOVE)return la;if(t.piece!==Oe){const g=Xa(t,e);d+=t.piece.toUpperCase()+g}t.flags&(se.CAPTURE|se.EP_CAPTURE)&&(t.piece===Oe&&(d+=We(t.from)[0]),d+="x"),d+=We(t.to),t.promotion&&(d+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?d+="#":d+="+"),this._undoMove(),d}_moveFromSan(t,e=!1){let d=da(t);if(e||(d==="0-0"?d="O-O":d==="0-0-0"&&(d="O-O-O")),d==la)return{color:this._turn,from:0,to:0,piece:"k",flags:se.NULL_MOVE};let g=ya(d),c=this._moves({legal:!0,piece:g});for(let j=0,R=c.length;j<R;j++)if(d===da(this._moveToSan(c[j],c)))return c[j];if(e)return null;let l,s,q,N,$,T=!1;if(s=d.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),s?(l=s[1],q=s[2],N=s[3],$=s[4],q.length==1&&(T=!0)):(s=d.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),s&&(l=s[1],q=s[2],N=s[3],$=s[4],q.length==1&&(T=!0))),g=ya(d),c=this._moves({legal:!0,piece:l||g}),!N)return null;for(let j=0,R=c.length;j<R;j++)if(q){if((!l||l.toLowerCase()==c[j].piece)&&ne[q]==c[j].from&&ne[N]==c[j].to&&(!$||$.toLowerCase()==c[j].promotion))return c[j];if(T){const ue=We(c[j].from);if((!l||l.toLowerCase()==c[j].piece)&&ne[N]==c[j].to&&(q==ue[0]||q==ue[1])&&(!$||$.toLowerCase()==c[j].promotion))return c[j]}}else if(d===da(this._moveToSan(c[j],c)).replace("x",""))return c[j];return null}ascii(){let t=`   +------------------------+
`;for(let e=ne.a8;e<=ne.h1;e++){if(jt(e)===0&&(t+=" "+"87654321"[St(e)]+" |"),this._board[e]){const d=this._board[e].type,c=this._board[e].color===Ye?d.toUpperCase():d.toLowerCase();t+=" "+c+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let d=0;const g=this._turn;for(let c=0,l=e.length;c<l;c++)this._makeMove(e[c]),this._isKingAttacked(g)||(t-1>0?d+=this.perft(t-1):d++),this._undoMove();return d}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let d=ne.a8;d<=ne.h1;d++)this._board[d]==null?e.push(null):e.push({square:We(d),type:this._board[d].type,color:this._board[d].color}),d+1&136&&(t.push(e),e=[],d+=8);return t}squareColor(t){if(t in ne){const e=ne[t];return(St(e)+jt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],d=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const g=e.pop();if(!g)break;t?d.push(new Kt(this,g)):d.push(this._moveToSan(g,this._moves())),this._makeMove(g)}return d}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},d=g=>{g in this._comments&&(e[g]=this._comments[g])};for(;this._history.length>0;)t.push(this._undoMove());for(d(this.fen());;){const g=t.pop();if(!g)break;this._makeMove(g),d(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const g of[He,mt])e[g]!==void 0&&(e[g]?this._castling[t]|=Vt[g]:this._castling[t]&=~Vt[g]);this._updateCastlingRights();const d=this.getCastlingRights(t);return(e[He]===void 0||e[He]===d[He])&&(e[mt]===void 0||e[mt]===d[mt])}getCastlingRights(t){return{[He]:(this._castling[t]&Vt[He])!==0,[mt]:(this._castling[t]&Vt[mt])!==0}}moveNumber(){return this._moveNumber}}async function ai(i,t={}){const e=t.currentUser||{},d=t.userRole||e?.role||"employee";let g="chat",c=[],l=null,s=[],q=[],N=null,$=null,T=!1,j=null,R=null;i.innerHTML=`
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
  `,Za(),await it(),ze();const ue=i.querySelector("#tab-nav-chat"),xe=i.querySelector("#tab-nav-lounge"),Ke=i.querySelector("#bonding-chat-main-wrap"),et=i.querySelector("#bonding-lounge-main-wrap");ue?.addEventListener("click",()=>{g="chat",ue.classList.add("active"),xe.classList.remove("active"),Ke.style.display="grid",et.style.display="none",ze()}),xe?.addEventListener("click",async()=>{g="lounge_games",xe.classList.add("active"),ue.classList.remove("active"),Ke.style.display="none",et.style.display="block",await A()}),i.querySelector("#btn-top-new-chat")?.addEventListener("click",Z),i.querySelector("#btn-top-new-group")?.addEventListener("click",ae),i.querySelector("#btn-top-challenge")?.addEventListener("click",()=>V());const ot=i.querySelector("#bonding-search-input");ot&&ot.addEventListener("input",u=>{const f=u.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(n=>{const h=n.textContent.toLowerCase();n.style.display=h.includes(f)?"flex":"none"})}),pt(),new MutationObserver((u,f)=>{document.body.contains(i)||($&&clearInterval($),R&&clearInterval(R),f.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function it(){try{const[u,f]=await Promise.all([je("/bonding/channels").catch(()=>[]),je("/bonding/colleagues").catch(()=>[])]);c=u,s=f,!l&&c.length>0&&(l=c.find(o=>o.name.includes("Lounge"))||c[0]),Fe(),l&&await Le(l._id)}catch(u){console.error("Failed to load bonding data",u)}}async function Le(u,f=!1){if(u)try{q=await je(`/bonding/channels/${u}/messages`),f?r():C()}catch(o){console.error("Failed to load messages",o)}}let nt=0;function pt(){$&&clearInterval($),$=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval($);return}if(nt++,nt%2===0){const u=await je("/bonding/channels").catch(()=>null);u&&JSON.stringify(u.map(f=>f._id+f.lastMessage?.sentAt))!==JSON.stringify(c.map(f=>f._id+f.lastMessage?.sentAt))&&(c=u,Fe())}g==="chat"&&l?await Le(l._id,!0):g==="lounge_games"&&await A(!0)}catch{}},3e3)}function Fe(){const u=i.querySelector("#bonding-group-list"),f=i.querySelector("#bonding-direct-list");if(!u||!f)return;const o=c.filter(h=>h.type==="group"),n=c.filter(h=>h.type==="direct");if(o.length===0)u.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const h=e?._id||e?.id,E=d==="superadmin"||e?.role==="superadmin";u.innerHTML=o.map(S=>{const H=l&&l._id===S._id,z=S.createdBy&&S.createdBy.userId&&String(S.createdBy.userId)===String(h)||E;return`
          <div class="bonding-channel-item ${H?"active":""}" data-channel-id="${S._id}">
            <div class="bonding-channel-icon">${S.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(S.name)}</div>
              <div class="bonding-channel-preview">${v(S.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${z?`
              <button class="bonding-channel-del-btn" data-channel-id="${S._id}" title="Delete Group (Creator only)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            `:`
              <button class="bonding-channel-leave-btn" data-channel-id="${S._id}" title="Leave Group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            `}
          </div>
        `}).join("")}n.length===0?f.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':f.innerHTML=n.map(h=>{const E=l&&l._id===h._id,S=h.displayName||h.name||"Colleague",H=S.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${E?"active":""}" data-channel-id="${h._id}">
            <div class="bonding-channel-avatar">${H}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(S)}</div>
              <div class="bonding-channel-preview">${v(h.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${h._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),dt()}function dt(){const u=i.querySelectorAll(".bonding-channel-item");u.forEach(f=>{f.onclick=async o=>{if(o.target.closest(".bonding-channel-del-btn")||o.target.closest(".bonding-channel-leave-btn"))return;const n=f.dataset.channelId,h=c.find(E=>E._id===n);h&&(l=h,u.forEach(E=>E.classList.remove("active")),f.classList.add("active"),ze(),await Le(h._id))}}),i.querySelectorAll(".bonding-channel-leave-btn").forEach(f=>{f.onclick=async o=>{o.stopPropagation();const n=f.dataset.channelId,E=c.find(S=>S._id===n)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${E}"?`))try{f.disabled=!0,await Ce(`/bonding/channels/${n}/leave`,{}),w(`You left "${E}"`,"info"),c=c.filter(S=>S._id!==n),l&&l._id===n&&(l=c.find(S=>S.type==="group")||c[0]||null,ze(),l&&await Le(l._id)),Fe()}catch(S){w(S.message||"Failed to leave group","error"),f.disabled=!1}}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(f=>{f.onclick=async o=>{o.stopPropagation();const n=f.dataset.channelId,h=c.find(H=>H._id===n),E=h&&h.type==="direct",S=E?"this 1-on-1 chat":`the group "${h?.name||""}"`;if(confirm(`Are you sure you want to delete ${S}? All messages will be permanently removed.`))try{f.disabled=!0,await Xe(`/bonding/channels/${n}`),w(E?"1-on-1 chat deleted":"Group deleted","success"),c=c.filter(H=>H._id!==n),l&&l._id===n&&(l=c[0]||null,ze(),l&&await Le(l._id)),Fe()}catch(H){w(H.message||"Failed to delete conversation","error"),f.disabled=!1}}}),i.querySelector("#btn-create-group")?.addEventListener("click",ae),i.querySelector("#btn-new-direct-chat")?.addEventListener("click",Z)}function ze(){const u=i.querySelector("#bonding-chat-panel");if(!u)return;if(!l){u.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const f=v(l.displayName||l.name),o=(l.members||[]).length,n=l.type==="group",h=e?._id||e?.id,E=n?null:(l.members||[]).find(z=>z.userId?.toString()!==h?.toString()),S=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(h),H=d==="superadmin"||e?.role==="superadmin",oe=S||H;u.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${n?l.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${f}</div>
            <div class="bonding-chat-sub">
              ${n?`<span>${o} members</span> · <span>${v(l.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${n?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${o})</span>
            </button>
            ${oe?`
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
        ${Re()}
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
    `,rt(E),he(E),m(),a()}function Re(){if(!q||q.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const u=e?._id||e?.id;return q.map(f=>{const o=f.sender&&f.sender.userId&&u&&f.sender.userId.toString()===u.toString();if(f.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${f._id}">
            <span>ℹ️</span> <span>${v(f.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${f._id}" title="Delete Message">&times;</button>
          </div>
        `;if(f.type==="challenge"&&f.challengeData){const S=f.challengeData;if(S.status==="declined"||S.status==="cancelled")return"";const H=S.gameTitle||"Game Challenge",oe=S.gameType||"chess",z=oe==="chess"?"♟️":oe==="ludo"?"🎲":"❌",M=S.gameState?.invitationId,W=S.targetUserId?.toString(),_e=f.sender?.userId?.toString(),me=u&&W===u.toString(),le=u&&_e===u.toString();return`
          <div class="bonding-msg-row ${o?"self":"other"}" data-msg-id="${f._id}">
            <div class="bonding-msg-avatar" title="${v(f.sender?.name||"Teammate")}">
              ${(f.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${v(f.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${J(f.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${f._id}" title="Delete Challenge Message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${z}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${v(H)}</h4>
                    <p class="game-bubble-desc">${v(f.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${S.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':S.status==="active"||S.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${v(S.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${S.status==="pending"&&me?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${M}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${M}" data-action="decline">
                        Decline
                      </button>
                    `:S.status==="pending"&&le?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${M}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${M}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${de(f)}
            </div>
          </div>
        `}const n=v(f.sender?.name||"Teammate"),h=J(f.createdAt),E=de(f);return`
        <div class="bonding-msg-row ${o?"self":"other"}" data-msg-id="${f._id}">
          <div class="bonding-msg-avatar" title="${n}">${n.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${n}</span>
              <span class="bonding-msg-time">${h}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${f._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${v(f.content).replace(/\n/g,"<br/>")}
            </div>
            ${E}
          </div>
        </div>
      `}).join("")}function de(u){return`
      <div class="bonding-reactions-row">
        ${(u.reactions||[]).map(n=>{const h=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(n.users||[]).some(S=>S.toString()===h?.toString())?"active":""}" data-msg-id="${u._id}" data-emoji="${n.emoji}">
          <span>${n.emoji}</span> <span>${n.users?n.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${u._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function rt(u){const f=i.querySelector("#btn-chat-challenge");f&&(f.onclick=()=>{u?V(null,u.userId||u._id):V()});const o=i.querySelector("#btn-manage-members");o&&(o.onclick=Y);const n=i.querySelector("#btn-delete-group");n&&(n.onclick=G);const h=i.querySelector("#btn-leave-group");h&&(h.onclick=k);const E=i.querySelector("#btn-delete-direct");E&&(E.onclick=async()=>{if(l&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{E.disabled=!0,await Xe(`/bonding/channels/${l._id}`),w("1-on-1 chat deleted successfully","success");const H=l._id;c=c.filter(oe=>oe._id!==H),l=c[0]||null,Fe(),ze(),l&&await Le(l._id)}catch(H){w(H.message||"Could not delete 1-on-1 chat","error"),E.disabled=!1}});const S=i.querySelector("#btn-clear-chat");S&&(S.onclick=async()=>{if(l&&confirm("Are you sure you want to clear all messages in this conversation?"))try{S.disabled=!0,await Xe(`/bonding/channels/${l._id}/messages`),w("Chat messages cleared","success"),q=[],C()}catch(H){w(H.message||"Could not clear chat messages","error")}finally{S.disabled=!1}})}function he(u){const f=i.querySelector("#bonding-message-input"),o=i.querySelector("#btn-send-message"),n=i.querySelector("#btn-quick-emoji"),h=i.querySelector("#btn-input-challenge");f&&f.addEventListener("keydown",E=>{E.key==="Enter"&&!E.shiftKey&&(E.preventDefault(),_())}),o&&(o.onclick=_),h&&(h.onclick=()=>{u?V(null,u.userId||u._id):V()}),n&&(n.onclick=()=>{if(!f)return;const E=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],S=E[Math.floor(Math.random()*E.length)];f.value+=(f.value?" ":"")+S,f.focus()})}function m(){i.querySelectorAll(".btn-respond-invite").forEach(n=>{n.onclick=async()=>{const h=n.dataset.inviteId,E=n.dataset.action;await L(h,E)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(n=>{n.onclick=async()=>{const h=n.dataset.inviteId;try{n.disabled=!0;const E=await je("/bonding/invitations"),S=(E.incoming||[]).concat(E.sent||[]).find(H=>H._id===h);S&&S.matchId?O(S.matchId):w("Match has not started yet or has expired","warning")}catch(E){w(E.message||"Could not load match","error")}finally{n.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(n=>{n.onclick=async h=>{h.stopPropagation();const E=n.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{n.disabled=!0,await Xe(`/bonding/messages/${E}`),q=q.filter(S=>S._id!==E),r(),w("Message deleted","success")}catch(S){w(S.message||"Failed to delete message","error"),n.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(n=>{n.onclick=async()=>{const h=n.dataset.msgId,E=n.dataset.emoji;await D(h,E)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(n=>{n.onclick=h=>{const E=n.dataset.msgId;ie(h.currentTarget,async S=>{await D(E,S)})}})}async function _(){const u=i.querySelector("#bonding-message-input");if(!u||!l||T)return;const f=u.value.trim();if(f)try{T=!0,u.value="";const o=await Ce(`/bonding/channels/${l._id}/messages`,{content:f,type:"text"});q.push(o),C(),a()}catch(o){w(o.message||"Failed to send message","error")}finally{T=!1,u.focus()}}async function D(u,f){try{const o=await Ce(`/bonding/messages/${u}/react`,{emoji:f}),n=q.find(h=>h._id===u);n&&(n.reactions=o,r())}catch(o){w(o.message||"Failed to react","error")}}function a(){const u=i.querySelector("#bonding-messages-feed");u&&(u.scrollTop=u.scrollHeight)}function r(){const u=i.querySelector("#bonding-messages-feed");if(!u)return;const f=u.scrollHeight-u.scrollTop<=u.clientHeight+80;u.innerHTML=Re(),m(),f&&a()}function C(){const u=i.querySelector("#bonding-messages-feed");u&&(u.innerHTML=Re(),m())}async function A(u=!1){const f=i.querySelector("#bonding-lounge-main-wrap");if(f){u||(f.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const o=await je("/bonding/games/overview");N=o;const n=o.myStats||{},h=o.availableGames||[],E=o.incomingChallenges||[],S=o.sentChallenges||[],H=o.activeMatches||[],oe=o.recentMatches||[],z=e?._id||e?.id;f.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${n.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${n.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${n.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${n.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${n.gamesPlayed>0?Math.round((n.wins||0)/n.gamesPlayed*100):0}%</span>
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
              ${h.map(M=>`
                <div class="lounge-game-card" data-game-id="${M.id}">
                  <div class="game-card-icon">${M.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${v(M.name)}</h4>
                    <p class="game-card-desc">${v(M.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${M.duration}</span>
                      ${M.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${M.id}" data-game-title="${v(M.name)}">
                    ${M.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${E.length+S.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${E.length})</h5>
              ${E.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${E.map(M=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(M.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(M.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${v(M.sender.name)}</strong> (${v(M.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${M._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${M._id}" data-action="decline">
                            Decline
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

              <!-- Sent -->
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${S.length})</h5>
              ${S.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${S.map(M=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(M.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(M.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${v(M.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${M._id}" data-action="cancel">
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
                    ${H.map(M=>{const _e=(M.players||M.gameState?.players||[M.player1,M.player2].filter(Boolean)).filter(F=>F.userId&&F.userId.toString()!==z?.toString()),me=M.player1?.userId?.toString()===z?.toString()?M.player2:M.player1,le=_e.length>0?_e.map(F=>v(F.name)).join(", "):me?.name?v(me.name):"Colleagues",pe=z&&M.currentTurnUserId&&M.currentTurnUserId.toString()===z.toString();return`
                        <div class="lounge-active-match-card ${pe?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${M.gameType==="chess"?"♟️":M.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${v(M.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${le}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${pe?"my-turn":"wait"}">
                              ${pe?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${M._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${M._id}" title="Delete Match">
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
              ${oe.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${oe.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${oe.map(M=>{const _e=z&&M.player1.userId.toString()===z.toString()?M.player2:M.player1,me=z&&M.winnerId&&M.winnerId.toString()===z.toString(),le=M.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${v(M.gameTitle)}</span>
                          <span class="recent-date">${J(M.completedAt||M.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${M._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${v(_e.name)}</strong></div>
                          <div class="recent-outcome ${me?"win":le?"draw":"loss"}">
                            ${me?"🏆 VICTORY":le?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${v(M.winningReason||M.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${M._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${M._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,Q()}catch(o){f.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${v(o.message)}</p>
        </div>
      `}}}function Q(){i.querySelectorAll(".btn-challenge-game").forEach(f=>{f.onclick=()=>{const o=f.dataset.gameId;V(o)}}),i.querySelectorAll(".btn-respond-invite").forEach(f=>{f.onclick=async()=>{const o=f.dataset.inviteId,n=f.dataset.action;await L(o,n),await A()}}),i.querySelectorAll(".btn-resume-match").forEach(f=>{f.onclick=()=>{const o=f.dataset.matchId;O(o)}}),i.querySelectorAll(".btn-recent-rematch").forEach(f=>{f.onclick=async()=>{const o=f.dataset.matchId;try{f.disabled=!0;const n=await Ce(`/bonding/matches/${o}/action`,{action:"rematch"});n.match&&(w("Rematch created! Opening arena ⚔️","success"),O(n.match._id))}catch(n){w(n.message||"Could not start rematch","error")}finally{f.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(f=>{f.onclick=async o=>{o.stopPropagation();const n=f.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{f.disabled=!0,await Xe(`/bonding/matches/${n}`),w("Match deleted successfully","success"),await A()}catch(h){w(h.message||"Failed to delete match","error")}finally{f.disabled=!1}}});const u=i.querySelector("#btn-clear-matches");u&&(u.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{u.disabled=!0,await Xe("/bonding/matches?filter=completed"),w("Completed matches history cleared","success"),await A()}catch(f){w(f.message||"Failed to clear matches","error")}finally{u.disabled=!1}})}function V(u=null,f=null){const o=i.querySelector("#bonding-modals-root"),n=e?._id||e?.id,h=new Set(["employee","admin","superadmin"]),E=s.filter(me=>!me.isSelf&&me._id.toString()!==n?.toString()&&h.has(me.role));let S=u||"chess",H=f?f.toString():null,oe=2,z=H?[H]:[],M="none";function W(){const me=E.find(re=>re._id.toString()===H),le=S==="ludo",pe=oe-1,F=z.length===pe;o.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${le?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${S==="chess"?"active":""}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${S==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                  <button class="game-pill-btn ${S==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                </div>
              </div>

              <!-- LUDO SPECIAL: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${le?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${oe===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${oe===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${oe===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${le?`Step 3 — Select Colleagues to Play With (${z.length}/${pe} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${E.map(re=>{const be=le?z.includes(re._id.toString()):H===re._id.toString();return`
                      <div class="eligible-emp-item ${be?"selected":""}" data-user-id="${re._id}">
                        <div class="emp-item-avatar">${re.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${v(re.name)}</span>
                          <span class="emp-item-role">${v(re.role==="superadmin"?"Superadmin":re.role==="admin"?"Admin":"Employee")} · ${v(re.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${be?"active":""}">
                          ${be?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Step for Chess timers -->
              ${S==="chess"?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 3 — Time Control Options</div>
                  <div class="timer-opts-row">
                    <label class="timer-radio-lbl ${M==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${M==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${M==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${M==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${M==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${M==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${le?`🎲 Ludo (${oe} Players · 4 Pawns per base)`:S==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${le?`
                    <div><strong>Opponents:</strong> ${z.length>0?z.map(re=>{const be=E.find(ge=>ge._id.toString()===re);return be?`<strong>${v(be.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+pe+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${me?`<strong>${v(me.name)}</strong> (${v(me.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${S==="chess"?`<div><strong>Time Control:</strong> ${M==="none"?"Untimed":M}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(le?!F:!H)?"disabled":""}>
                ${le?`Start ${oe}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,_e()}function _e(){o.querySelector(".bonding-modal-close").onclick=()=>{o.innerHTML=""},o.querySelector("#btn-cancel-challenge-flow").onclick=()=>{o.innerHTML=""},o.querySelectorAll(".game-pill-btn").forEach(pe=>{pe.onclick=()=>{S=pe.dataset.game,W()}}),o.querySelectorAll(".ludo-mode-btn").forEach(pe=>{pe.onclick=()=>{oe=Number(pe.dataset.count),z=z.slice(0,oe-1),W()}});const me=o.querySelector("#flow-emp-search");me&&(me.oninput=pe=>{const F=pe.target.value.toLowerCase().trim();o.querySelectorAll(".eligible-emp-item").forEach(re=>{const be=re.textContent.toLowerCase();re.style.display=be.includes(F)?"flex":"none"})}),o.querySelectorAll(".eligible-emp-item").forEach(pe=>{pe.onclick=()=>{const F=pe.dataset.userId;if(S==="ludo"){const re=oe-1;z.includes(F)?z=z.filter(be=>be!==F):z.length<re?z.push(F):z[re-1]=F}else H=F;W()}}),o.querySelectorAll('input[name="timerMode"]').forEach(pe=>{pe.onchange=F=>{M=F.target.value,W()}});const le=o.querySelector("#btn-submit-challenge-flow");le&&(le.onclick=async()=>{if(S==="ludo"){const pe=oe-1;if(z.length<pe){w(`Please select ${pe} colleague(s) to play with`,"warning");return}try{le.disabled=!0,le.textContent="Launching Match...";const F=await Ce("/bonding/matches/instant-ludo",{playerCount:oe,targetUserIds:z});o.innerHTML="",w(`Ludo match started (${oe} Players)! 🎲`,"success"),F&&F._id&&O(F._id)}catch(F){w(F.message||"Failed to start Ludo match","error"),le.disabled=!1,le.textContent=`Start ${oe}P Ludo Match 🎲`}return}if(!H){w("Please select an employee to challenge","warning");return}try{le.disabled=!0,le.textContent="Sending Challenge...",await Ce("/bonding/invitations",{gameType:S,targetUserId:H,matchSettings:{timerMode:M},channelId:null}),w("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),o.innerHTML="",await loadChannels();const pe=c.find(F=>F.type==="direct"&&F.members?.some(re=>(re.userId||re._id)?.toString()===H));pe?selectChannel(pe):l&&await Le(l._id),g==="lounge_games"&&await A()}catch(pe){w(pe.message||"Could not send challenge","error"),le.disabled=!1,le.textContent="Send Challenge 🚀"}})}W()}async function L(u,f){if(!(!u||!f))try{const o=await Yt(`/bonding/invitations/${u}/respond`,{action:f});f==="accept"?(w("Challenge accepted! Entering match arena ⚔️","success"),o.match&&O(o.match._id)):f==="decline"?(w("Challenge declined","info"),i.querySelectorAll(`[data-invite-id="${u}"]`).forEach(n=>{const h=n.closest(".lounge-invite-item")||n.closest(".bonding-msg-row");h&&h.remove()})):f==="cancel"&&(w("Challenge cancelled","info"),i.querySelectorAll(`[data-invite-id="${u}"]`).forEach(n=>{const h=n.closest(".lounge-invite-item")||n.closest(".bonding-msg-row");h&&h.remove()})),l&&await Le(l._id),g==="lounge_games"&&await A()}catch(o){w(o.message||"Action failed","error")}}async function O(u){if(!u)return;j=u,R&&clearInterval(R);const f=i.querySelector("#bonding-modals-root");let o=null,n=null,h=[],E="",S=null,H=!1;function oe(F){return F?JSON.stringify({status:F.status,turn:F.currentTurnUserId?.toString(),turnColor:F.turn,movesCount:F.moves?.length,dice:F.gameState?.dice,rolled:F.gameState?.rolled,lastRoll:F.gameState?.lastRoll,lastRollColor:F.gameState?.lastRollColor,lastRollBy:F.gameState?.lastRollBy,lastActionText:F.gameState?.lastActionText,tokens:F.gameState?.tokens,board:F.gameState?.board,grid:F.gameState?.grid,fen:F.gameState?.fen,draw:F.drawOfferedBy?.toString()}):""}async function z(){try{return o=await je(`/bonding/matches/${u}`),o}catch(F){return w(F.message||"Could not load match","error"),M(),null}}if(o=await z(),!o)return;E=oe(o);function M(){R&&clearInterval(R),S&&clearTimeout(S),H=!1,j=null,f.innerHTML="",g==="lounge_games"&&A(!0),l&&Le(l._id,!0)}R=setInterval(async()=>{if(!j||j!==u){clearInterval(R);return}try{const F=await je(`/bonding/matches/${u}`);if(!F)return;const re=oe(F);re!==E&&(E=re,o=F,W())}catch{}},1e3);function W(){if(!o)return;const F=e?._id||e?.id,re=F&&o.player1.userId.toString()===F.toString(),be=re?o.player1:o.player2,ge=re?o.player2:o.player1,ye=F&&o.currentTurnUserId&&o.currentTurnUserId.toString()===F.toString(),Pe=o.status!=="active";f.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${o.gameType==="ludo"?"🎲":o.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${v(o.gameTitle)}</h3>
                  ${o.gameType==="ludo"&&o.gameState?.players?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${o.gameState.players.map(Be=>{const Ge=Be.userId&&Be.userId.toString()===F?.toString(),Me={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Be.color]||"⚪",ce=(o.gameState?.turnColor||o.turn)===Be.color;return`
                          <span class="player-tag ${Ge?"self":"opp"} ${ce?"turn-active":""}">
                            ${Me} <strong>${v(Be.name)}</strong> ${Ge?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${v(be.name)} (You · <strong>${o.gameType==="ludo"?be.assignedRole==="red"?"🔴 Red":"🟢 Green":o.gameType==="tictactoe"?be.assignedRole==="X"?"✕":"◯":be.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${v(ge.name)} (<strong>${o.gameType==="ludo"?ge.assignedRole==="red"?"🔴 Red":"🟢 Green":o.gameType==="tictactoe"?ge.assignedRole==="X"?"✕":"◯":ge.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${Pe?"ended":ye?"my-turn":"opp-turn"}">
                ${Pe?`<span>🏁 Finished (${v(o.winningReason||o.status)})</span>`:ye?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${v(ge.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${o.gameType==="ludo"?ye?o.gameState?.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":o.gameType==="tictactoe"?ye?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":ye?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${Pe?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${o.drawOfferedBy&&o.drawOfferedBy.toString()!==F?.toString()&&!Pe?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${v(ge.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${o.gameType==="chess"?_e(re):""}
              ${o.gameType==="tictactoe"?me():""}
              ${o.gameType==="ludo"?le(re):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${Pe?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${o.winnerId&&o.winnerId.toString()===F?.toString()?"🏆":o.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${o.winnerId&&o.winnerId.toString()===F?.toString()?"VICTORY!":o.status==="draw"?"STALEMATE / DRAW":`${v(o.winnerName)} Wins!`}</h4>
                  <p>Reason: ${v(o.winningReason||"Match concluded")}</p>
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
      `,pe(ye,re,be)}function _e(F){const re=o.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",be=new ka(re),ge=F?o.player1.assignedRole==="white":o.player2.assignedRole==="white",ye={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},Pe=ge?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Be=ge?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Ge='<div class="chess-board-grid">';for(const Ae of Be)for(const Ue of Pe){const Ne=`${Ue}${Ae}`,Ee=be.get(Ne),Ie=(Ue.charCodeAt(0)-97+Ae)%2!==0,De=n===Ne,ke=h.includes(Ne),fe=Ee?Ee.color==="w"?ye[Ee.type.toUpperCase()]:ye[Ee.type]:"";Ge+=`
            <div class="chess-sq ${Ie?"light":"dark"} ${De?"selected":""} ${ke?"legal-dot":""}" data-square="${Ne}">
              ${fe?`<span class="chess-piece ${Ee.color==="w"?"white-piece":"black-piece"}">${fe}</span>`:""}
            </div>
          `}Ge+="</div>";const ce=(o.moves||[]).map(Ae=>`
        <span class="chess-move-token">${Ae.moveNum}. ${Ae.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${Ge}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${ce||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function me(){const F=o.gameState?.board||Array(9).fill(null),re=o.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${F.map((be,ge)=>{const ye=re.includes(ge);return`
                <div class="ttt-cell ${be?"filled":"empty"} ${ye?"win-cell":""}" data-cell-idx="${ge}">
                  ${be==="X"?'<span class="ttt-x">✕</span>':be==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function le(F,re,be){const ge=o.gameState||{},ye=ge.activeColors||["red","green"],Pe=ge.players||[{...o.player1,color:"red",assignedRole:"red",isBot:!1},{...o.player2,color:"green",assignedRole:"green",isBot:!1}],Be=ge.tokens||{},Ge=I=>{const te=Be[I]||(I==="red"?ge.p1Tokens:I==="green"?ge.p2Tokens:[])||[];return Array.from({length:4},(ve,Se)=>te[Se]||{id:Se,step:-1})},Me=Ge("red"),ce=Ge("green"),Ae=Ge("yellow"),Ue=Ge("blue"),Ne=e?._id||e?.id,Ie=(Pe.find(I=>I.userId&&I.userId.toString()===Ne?.toString())||Pe[0])?.color||(F?"red":"green"),De=ge.turnColor||o.turn||"red",ke=Ie===De&&o.status==="active",fe=!!ge.rolled,P=ge.dice,B=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],p=[[7,1],[7,2],[7,3],[7,4],[7,5]],Te=[[1,7],[2,7],[3,7],[4,7],[5,7]],we=[[7,13],[7,12],[7,11],[7,10],[7,9]],st=[[13,7],[12,7],[11,7],[10,7],[9,7]],U=[0,8,13,21,26,34,39,47];function ht(I,te){return te<0?null:te>=56?I==="red"?[7,6]:I==="green"?[6,7]:I==="yellow"?[7,8]:[8,7]:I==="red"?te<=50?B[te]:p[te-51]:I==="green"?te<=50?B[(13+te)%52]:Te[te-51]:I==="yellow"?te<=50?B[(26+te)%52]:we[te-51]:te<=50?B[(39+te)%52]:st[te-51]}function qe(I,te){return I!==Ie||!ke||!fe||!P||o.status!=="active"?!1:te.step===-1?P===6:te.step>=0&&te.step+P<=56}const Ze={},_t=(I,te)=>{te.forEach(ve=>{if(ve.step>=0&&ve.step<56){const Se=ht(I,ve.step);if(Se){const b=Se[0]+","+Se[1];(Ze[b]=Ze[b]||[]).push({color:I,id:ve.id,step:ve.step,movable:qe(I,ve)})}}})};ye.includes("red")&&_t("red",Me),ye.includes("green")&&_t("green",ce),ye.includes("yellow")&&_t("yellow",Ae),ye.includes("blue")&&_t("blue",Ue);const Je={};B.forEach(([I,te],ve)=>{Je[I+","+te]=ve});const Dt={};p.forEach(([I,te],ve)=>{Dt[I+","+te]=ve+1});const Et={};Te.forEach(([I,te],ve)=>{Et[I+","+te]=ve+1});const ee={};we.forEach(([I,te],ve)=>{ee[I+","+te]=ve+1});const Bt={};st.forEach(([I,te],ve)=>{Bt[I+","+te]=ve+1});const Pt=[];for(let I=0;I<15;I++)for(let te=0;te<15;te++){if(I<6&&te<6||I<6&&te>8||I>8&&te<6||I>8&&te>8||I>=6&&I<=8&&te>=6&&te<=8)continue;const ve=I+","+te,Se=Je[ve],b=Se!==void 0&&U.includes(Se),y=I===6&&te===1,x=I===1&&te===8,K=I===8&&te===13,X=I===13&&te===6,$e=Dt[ve],ct=Et[ve],It=ee[ve],Sa=Bt[ve];let lt="ludo-cell";y?lt+=" cell-red-start":x?lt+=" cell-green-start":K?lt+=" cell-yellow-start":X?lt+=" cell-blue-start":$e?lt+=" cell-red-stretch":ct?lt+=" cell-green-stretch":It?lt+=" cell-yellow-stretch":Sa?lt+=" cell-blue-stretch":b&&(lt+=" cell-safe-star");const Ca=Ze[ve]||[];Pt.push(`
            <div class="${lt}" style="grid-row:${I+1};grid-column:${te+1}" data-pos="${ve}">
              ${b?'<span class="cell-star-glyph">⭐</span>':""}
              ${y||x||K||X?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Ca.map(yt=>`
                <div class="ludo-token token-${yt.color} ${yt.movable?"movable":""}" data-token-id="${yt.id}" data-color="${yt.color}" title="${yt.color.toUpperCase()} Pawn ${yt.id+1}">
                  <span>${yt.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function Zt(I){const te=Math.max(1,Math.min(6,Number(I)||1)),ve={1:[[30,30,7.5,"#ef4444"]],2:[[16,16,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],3:[[16,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],4:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],5:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],6:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,30,5.5,"#1e293b"],[44,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]]},b=(ve[te]||ve[6]).map(([y,x,K,X])=>`
          <g>
            <circle cx="${y}" cy="${x+1.2}" r="${K}" fill="#94a3b8" opacity="0.5"/>
            <circle cx="${y}" cy="${x}" r="${K}" fill="${X}"/>
            <circle cx="${y-K*.3}" cy="${x-K*.3}" r="${K*.35}" fill="#ffffff" opacity="0.6"/>
          </g>
        `).join("");return`
          <svg viewBox="0 0 60 60" width="52" height="52" class="ludo-dice-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dice face ${te}">
            <g class="die-pips-layer">
              ${b}
            </g>
          </svg>
        `}function vt(I,te,ve,Se,b){const y=`${I}-yard`;if(!ve)return`
            <div class="ludo-yard ${y}">
              <div class="yard-box decorative">
                <div class="yard-title">${te} (Inactive)</div>
              </div>
            </div>
          `;const x=b.filter(K=>K.step===56).length;return`
          <div class="ludo-yard ${y} ${De===I?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${te}</span>
                ${x>0?`<span class="yard-home-badge" title="${x} of 4 pawns reached Home!">👑 ${x}/4 Home</span>`:""}
                ${Se?`<small class="yard-player-lbl">${v(Se.name)}${Se.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${b.map((K,X)=>`
                  <div class="yard-token-slot ${K.step===56?"slot-home":""}">
                    ${K.step===-1?`
                      <div class="ludo-token token-${I} ${qe(I,K)?"movable":""}" data-token-id="${K.id}" data-color="${I}" title="${I.toUpperCase()} Pawn ${K.id+1}">
                        <span>${K.id+1}</span>
                      </div>
                    `:K.step===56?`
                      <div class="ludo-token token-reached-home token-${I}" title="${I.toUpperCase()} Pawn ${K.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${K.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${X+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Nt=Pe.find(I=>I.color==="red"),Ot=Pe.find(I=>I.color==="green"),ea=Pe.find(I=>I.color==="yellow"),Ft=Pe.find(I=>I.color==="blue"),Lt=Pe.find(I=>I.color===De)||(De==="red"?Nt:Ot),Tt=Lt?v(Lt.name):De.toUpperCase(),Mt={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[De]||"🔴",ut=P||ge.lastRoll||6,xt=ke&&!fe&&o.status==="active",Ht=Ge(Ie).filter(I=>qe(Ie,I));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${vt("red","🔴 Red Base",ye.includes("red"),Nt,Me)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${vt("green","🟢 Green Base",ye.includes("green"),Ot,ce)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${vt("blue","🔵 Blue Base",ye.includes("blue"),Ft,Ue)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${vt("yellow","🟡 Yellow Base",ye.includes("yellow"),ea,Ae)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${Me.filter(I=>I.step===56).map(I=>`<div class="home-tri-pawn red" title="Red Pawn ${I.id+1} Home! 👑">👑${I.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${ce.filter(I=>I.step===56).map(I=>`<div class="home-tri-pawn green" title="Green Pawn ${I.id+1} Home! 👑">👑${I.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${Ae.filter(I=>I.step===56).map(I=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${I.id+1} Home! 👑">👑${I.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${Ue.filter(I=>I.step===56).map(I=>`<div class="home-tri-pawn blue" title="Blue Pawn ${I.id+1} Home! 👑">👑${I.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...Me.filter(I=>I.step===56).map(I=>({col:"red",id:I.id})),...ce.filter(I=>I.step===56).map(I=>({col:"green",id:I.id})),...Ae.filter(I=>I.step===56).map(I=>({col:"yellow",id:I.id})),...Ue.filter(I=>I.step===56).map(I=>({col:"blue",id:I.id}))].map(I=>`
                    <div class="tok-home-champion ${I.col}" title="${I.col.toUpperCase()} Pawn ${I.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${I.id+1}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Pt.join("")}
          </div>

          <!-- Ludo Action & 3D Interactive Dice Console (Clickable dice replaces text button, opponent dice visible!) -->
          <div class="ludo-interactive-console">
            <div class="ludo-dice-interactive-box">
              <div 
                class="ludo-3d-dice ${xt?"clickable pulse-roll":""} ${fe?"just-rolled":""} border-${De}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${xt?"0":"-1"}"
                title="${xt?"Click Dice to Roll!":ke?"Choose a pawn to move":`${Tt}'s turn`}"
              >
                ${Zt(ut)}
              </div>
              <div class="ludo-dice-action-badge">
                ${xt?'<button class="badge-click-roll btn-dice-roll-badge" id="btn-interactive-ludo-dice-badge" type="button" title="Tap to Roll">🎲 TAP TO ROLL</button>':fe?`<span class="badge-rolled-val">${Mt} Rolled ${ut}</span>`:ge.lastRoll?`<span class="badge-last-roll">${Mt} Rolled ${ge.lastRoll}</span>`:'<span class="badge-waiting">Ready</span>'}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${De}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${Tt}</strong> (${De.toUpperCase()})
                </span>
                ${ke?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${ke&&fe?"highlight":""}">
                ${ke&&!fe&&o.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":ke&&fe&&o.status==="active"?Ht.length>0?Ht.length===1?`🎲 Rolled <strong>${ut}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${ut}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${ut}</strong>. No legal moves possible — turn passing...`:o.status==="active"?fe||ge.lastRoll?`🎲 ${Mt} <strong>${Tt}</strong> rolled <strong>${ut}</strong>!`:`⏳ Waiting for <strong>${Tt}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${v(ge.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function pe(F,re,be){f.querySelector("#btn-close-arena").onclick=M;const ge=f.querySelector("#btn-arena-resign");ge&&(ge.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{ge.disabled=!0,await Ce(`/bonding/matches/${u}/action`,{action:"resign"}),await z(),W()}catch(ce){w(ce.message||"Resign failed","error"),ge.disabled=!1}});const ye=f.querySelector("#btn-arena-draw");ye&&(ye.onclick=async()=>{try{await Ce(`/bonding/matches/${u}/action`,{action:"offer_draw"}),w("Draw offer sent to opponent","info"),await z(),W()}catch(ce){w(ce.message||"Draw offer failed","error")}});const Pe=f.querySelector("#btn-confirm-accept-draw");Pe&&(Pe.onclick=async()=>{try{await Ce(`/bonding/matches/${u}/action`,{action:"accept_draw"}),w("Draw agreed!","info"),await z(),W()}catch(ce){w(ce.message,"error")}});const Be=f.querySelector("#btn-confirm-decline-draw");Be&&(Be.onclick=async()=>{try{await Ce(`/bonding/matches/${u}/action`,{action:"decline_draw"}),await z(),W()}catch(ce){w(ce.message,"error")}}),[f.querySelector("#btn-arena-delete-match"),f.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(ce=>{ce.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{ce.disabled=!0,await Xe(`/bonding/matches/${u}`),w("Match deleted","success"),M(),g==="lounge_games"&&await A()}catch(Ae){w(Ae.message||"Failed to delete match","error"),ce.disabled=!1}}});const Me=f.querySelector("#btn-arena-rematch-action");if(Me&&(Me.onclick=async()=>{try{Me.disabled=!0,Me.textContent="Creating Rematch...";const ce=await Ce(`/bonding/matches/${u}/action`,{action:"rematch"});ce.match&&(w("Rematch created! New match live ⚔️","success"),R&&clearInterval(R),O(ce.match._id))}catch(ce){w(ce.message||"Rematch failed","error"),Me.disabled=!1,Me.textContent="🔄 Request Rematch"}}),o.gameType==="chess"&&F&&o.status==="active"){const ce=o.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Ae=new ka(ce),Ue=be.assignedRole==="white"?"w":"b";f.querySelectorAll(".chess-sq").forEach(Ne=>{Ne.onclick=async()=>{const Ee=Ne.dataset.square;if(n){if(n===Ee){n=null,h=[],W();return}if(h.includes(Ee)){const De=Ae.get(n);let ke;De&&De.type==="p"&&(Ee.endsWith("8")||Ee.endsWith("1"))&&(ke=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const fe={from:n,to:Ee,promotion:ke?ke.toLowerCase():void 0};n=null,h=[],o=await Ce(`/bonding/matches/${u}/move`,{move:fe}),W()}catch(fe){w(fe.message||"Illegal chess move","error"),n=null,h=[],W()}return}}const Ie=Ae.get(Ee);Ie&&Ie.color===Ue?(n=Ee,h=Ae.moves({square:Ee,verbose:!0}).map(ke=>ke.to),W()):(n=null,h=[],W())}})}if(o.gameType==="tictactoe"&&F&&o.status==="active"&&f.querySelectorAll(".ttt-cell.empty").forEach(ce=>{ce.onclick=async()=>{const Ae=ce.dataset.cellIdx;try{ce.style.opacity="0.5",o=await Ce(`/bonding/matches/${u}/move`,{cellIndex:Number(Ae)}),W()}catch(Ue){w(Ue.message||"Invalid move","error")}}}),o.gameType==="ludo"&&o.status==="active"){const ce=o.gameState||{},Ae=!!ce.rolled,Ue=ce.turnColor||o.turn||"red",Ne=o.player1.userId.toString()===myId?.toString()?o.player1.assignedRole||"red":o.player2.userId.toString()===myId?.toString()?o.player2.assignedRole||"green":(ce.players||[]).find(ke=>ke.userId?.toString()===myId?.toString())?.color||"red",Ee=F&&Ue===Ne,Ie=f.querySelector("#btn-interactive-ludo-dice"),De=f.querySelector("#btn-interactive-ludo-dice-badge");if(Ee&&!Ae){const ke=async()=>{if(!(Ie&&Ie.dataset.rolling==="true")){Ie&&(Ie.dataset.rolling="true",Ie.classList.add("rolling")),De&&(De.disabled=!0);try{const fe=await Ce(`/bonding/matches/${u}/move`,{action:"roll"});o=fe,E=oe(fe),W()}catch(fe){w(fe.message||"Failed to roll","error"),Ie&&(Ie.classList.remove("rolling"),delete Ie.dataset.rolling),De&&(De.disabled=!1)}}};Ie&&(Ie.onclick=ke,Ie.onkeydown=fe=>{(fe.key==="Enter"||fe.key===" ")&&(fe.preventDefault(),ke())}),De&&(De.onclick=ke)}if(Ee&&Ae){const fe=(ce.tokens||{})[Ne]||[],P=ce.dice||ce.lastRoll||0,B=fe.filter(p=>p.step===-1&&P===6||p.step>=0&&p.step+P<=56);if(B.length===1&&!H){H=!0;const p=B[0];S&&clearTimeout(S),S=setTimeout(async()=>{try{const Te=await Ce(`/bonding/matches/${u}/move`,{action:"move",tokenId:Number(p.id)});o=Te,E=oe(Te),H=!1,W()}catch(Te){H=!1,w(Te.message||"Auto-move failed","error")}},400)}}Ee&&Ae&&f.querySelectorAll(".ludo-token.movable").forEach(ke=>{ke.onclick=async fe=>{fe.stopPropagation();const P=ke.dataset.tokenId;try{ke.style.opacity="0.5";const B=await Ce(`/bonding/matches/${u}/move`,{action:"move",tokenId:Number(P)});o=B,E=oe(B),W()}catch(B){w(B.message||"Invalid token move","error"),ke.style.opacity="1"}}})}}W()}function Y(){if(!l||l.type==="direct")return;const u=i.querySelector("#bonding-modals-root"),f=z=>z==="employee"||z==="admin"||z==="superadmin",o=l.members||[],n=new Set(o.map(z=>z.userId?.toString())),h=s.filter(z=>f(z.role)&&!n.has(z._id.toString()));u.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${v(l.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${h.map(z=>`
                    <option value="${z._id}">${v(z.name)} (${v(z.role==="superadmin"?"Superadmin":z.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${h.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${h.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${o.length}):</label>
              <div class="bonding-members-list">
                ${o.map(z=>{const M=e?._id||e?.id,W=M&&z.userId&&z.userId.toString()===M.toString(),_e=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(M),me=d==="superadmin"||e?.role==="superadmin",le=_e||me;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(z.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${v(z.name)} ${W?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${v(z.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${W?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${z.userId}">
                            🚪 Leave Group
                          </button>
                        `:le?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${z.userId}" data-name="${v(z.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const z=e?._id||e?.id,M=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(z),W=d==="superadmin"||e?.role==="superadmin";return M||W?`
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""};const E=u.querySelector("#btn-modal-delete-group");E&&(E.onclick=()=>{u.innerHTML="",G()});const S=u.querySelector("#btn-modal-leave-group");S&&(S.onclick=()=>{u.innerHTML="",k()}),u.querySelectorAll(".btn-leave-group-action").forEach(z=>{z.onclick=()=>{u.innerHTML="",k()}});const H=u.querySelector("#btn-submit-add-member");H&&(H.onclick=async()=>{const M=u.querySelector("#sel-add-colleague").value;if(!M){w("Please select a colleague to add","warning");return}try{H.disabled=!0,H.textContent="Adding...";const W=await Yt(`/bonding/channels/${l._id}/members`,{action:"add",userIds:[M]});w("Colleague added to group! 🎉","success"),l=W.channel,u.innerHTML="",await Le(l._id),ze()}catch(W){w(W.message||"Failed to add member","error"),H.disabled=!1,H.textContent="Add to Group"}}),u.querySelectorAll(".btn-remove-member").forEach(z=>{z.onclick=async()=>{const M=z.dataset.userId,W=z.dataset.name;if(confirm(`Are you sure you want to remove ${W} from this group?`))try{z.disabled=!0;const _e=await Yt(`/bonding/channels/${l._id}/members`,{action:"remove",userId:M});w(`${W} removed from group`,"info"),l=_e.channel,u.innerHTML="",await Le(l._id),ze()}catch(_e){w(_e.message||"Failed to remove member","error"),z.disabled=!1}}})}async function k(){if(!l||l.type==="direct")return;const u=l.name;if(confirm(`Are you sure you want to leave the group "${u}"?`))try{await Ce(`/bonding/channels/${l._id}/leave`,{}),w(`You left "${u}"`,"info"),c=await je("/bonding/channels").catch(()=>[]),l=c.find(o=>o.type==="group")||c[0]||null,Fe(),ze(),l&&await Le(l._id)}catch(o){w(o.message||"Failed to leave group","error")}}async function G(){if(!l||l.type==="direct")return;const u=l.name;if(confirm(`Are you sure you want to delete the group "${u}"?

All messages in this lounge will be deleted.`))try{await Xe(`/bonding/channels/${l._id}`),w(`Group "${u}" deleted successfully`,"success"),c=await je("/bonding/channels").catch(()=>[]),l=c.find(o=>o.type==="group")||c[0]||null,Fe(),ze(),l&&await Le(l._id)}catch(o){w(o.message||"Failed to delete group","error")}}function Z(){const u=i.querySelector("#bonding-modals-root"),f=h=>h==="employee"||h==="admin"||h==="superadmin",o=s.filter(h=>!h.isSelf&&f(h.role));u.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${o.map(h=>`
                <div class="bonding-user-pick-item" data-user-id="${h._id}" data-name="${v(h.name)}">
                  <div class="bonding-member-avatar">${h.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${v(h.name)}</span>
                    <span class="user-pick-role">${v(h.role==="superadmin"?"Superadmin":h.role==="admin"?"Admin":"Employee")} · ${v(h.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelectorAll(".bonding-user-pick-item").forEach(h=>{h.onclick=async()=>{const E=h.dataset.userId;try{const S=await Ce("/bonding/channels",{type:"direct",targetUserId:E});u.innerHTML="",c=await je("/bonding/channels"),l=c.find(H=>H._id===S._id)||S,Fe(),ze(),await Le(l._id)}catch(S){w(S.message||"Failed to open personal chat","error")}}})}function ae(){const u=i.querySelector("#bonding-modals-root"),f=S=>S==="employee"||S==="admin"||S==="superadmin",o=s.filter(S=>!S.isSelf&&f(S.role));u.innerHTML=`
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
                ${o.map(S=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${S._id}" />
                    <span>${v(S.name)} (${v(S.role==="superadmin"?"Superadmin":S.role==="admin"?"Admin":"Employee")})</span>
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelector("#btn-cancel-create-grp").onclick=()=>{u.innerHTML=""};let n="👥";const h=u.querySelectorAll(".avatar-opt");h.forEach(S=>{S.onclick=()=>{h.forEach(H=>H.classList.remove("active")),S.classList.add("active"),n=S.textContent.trim()}});const E=u.querySelector("#btn-confirm-create-grp");E.onclick=async()=>{const S=u.querySelector("#new-group-name"),H=u.querySelector("#new-group-desc"),oe=S.value.trim();if(!oe){w("Please enter a group name","warning"),S.focus();return}const z=u.querySelectorAll(".new-group-member-chk:checked"),M=Array.from(z).map(W=>W.value);try{E.disabled=!0,E.textContent="Creating...";const W=await Ce("/bonding/channels",{type:"group",name:oe,description:H.value.trim(),avatar:n,memberIds:M});w(`Group "${oe}" created! 🎉`,"success"),u.innerHTML="",c=await je("/bonding/channels"),l=c.find(_e=>_e._id===W._id)||W,Fe(),ze(),await Le(l._id)}catch(W){w(W.message||"Failed to create group","error"),E.disabled=!1,E.textContent="Create Group 🎉"}}}function ie(u,f){const o=document.querySelector(".bonding-emoji-popup");o&&o.remove();const n=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],h=document.createElement("div");h.className="bonding-emoji-popup",h.innerHTML=n.map(H=>`<button class="emoji-opt-btn" data-e="${H}">${H}</button>`).join("");const E=u.getBoundingClientRect();h.style.top=`${E.bottom+window.scrollY+6}px`,h.style.left=`${E.left+window.scrollX}px`,document.body.appendChild(h),h.querySelectorAll(".emoji-opt-btn").forEach(H=>{H.onclick=oe=>{oe.stopPropagation(),f(H.dataset.e),h.remove()}});const S=H=>{h.contains(H.target)||(h.remove(),document.removeEventListener("click",S))};setTimeout(()=>document.addEventListener("click",S),10)}function J(u){if(!u)return"";try{return new Date(u).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Za(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
      transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease, border-color 0.2s ease;
      user-select: none;
      box-sizing: border-box !important;
    }

    [data-theme="dark"] .ludo-3d-dice {
      background: linear-gradient(145deg, #ffffff 0%, #f1f5f9 60%, #cbd5e1 100%) !important;
      box-shadow: 0 6px 0 #94a3b8, 0 12px 24px rgba(0, 0, 0, 0.55), inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 4px rgba(0, 0, 0, 0.1) !important;
    }

    .ludo-3d-dice.clickable {
      cursor: pointer !important;
    }

    .ludo-3d-dice.clickable:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 9px 0 #cbd5e1, 0 14px 26px rgba(0, 0, 0, 0.3), inset 0 2px 2px rgba(255, 255, 255, 0.95) !important;
    }

    .ludo-3d-dice.clickable:active {
      transform: translateY(3px) scale(0.97);
      box-shadow: 0 2px 0 #cbd5e1, 0 4px 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.8) !important;
    }

    .ludo-3d-dice.pulse-roll {
      animation: diceGlowPulse 1.1s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ludo-3d-dice.border-red {
      border-color: #ef4444 !important;
      box-shadow: 0 6px 0 #dc2626, 0 10px 22px rgba(239, 68, 68, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.95) !important;
    }
    .ludo-3d-dice.border-green {
      border-color: #10b981 !important;
      box-shadow: 0 6px 0 #059669, 0 10px 22px rgba(16, 185, 129, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.95) !important;
    }
    .ludo-3d-dice.border-yellow {
      border-color: #f59e0b !important;
      box-shadow: 0 6px 0 #d97706, 0 10px 22px rgba(245, 158, 11, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.95) !important;
    }
    .ludo-3d-dice.border-blue {
      border-color: #3b82f6 !important;
      box-shadow: 0 6px 0 #2563eb, 0 10px 22px rgba(59, 130, 246, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.95) !important;
    }

    @keyframes diceGlowPulse {
      0% {
        transform: translateY(0) scale(1);
        filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.3));
      }
      50% {
        transform: translateY(-4px) scale(1.06) rotate(-2deg);
        filter: drop-shadow(0 0 14px rgba(59, 130, 246, 0.8));
      }
      100% {
        transform: translateY(0) scale(1) rotate(2deg);
        filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.3));
      }
    }

    .ludo-3d-dice.rolling {
      animation: diceRollingSpin 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes diceRollingSpin {
      0% { transform: scale(1) rotate(0deg); }
      25% { transform: scale(1.2) rotate(120deg) translateY(-8px); }
      50% { transform: scale(0.88) rotate(240deg) translateY(4px); }
      75% { transform: scale(1.12) rotate(320deg) translateY(-2px); }
      100% { transform: scale(1) rotate(360deg) translateY(0); }
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
  `,document.head.appendChild(t)}function wa(i){if(!i)return"";const t=v(i),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return t.replace(e,d=>`<a href="${d}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${d} ↗</a>`)}const ca=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],$t=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],zt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ii(i,t={}){const{userRole:e="employee",currentUser:d=null,initialTicketId:g=null}=t,c=e==="superadmin"||e==="admin";if(e==="client"||d&&d.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let l=[],s={},q=[],N=[],$={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},T=null,j="comments",R=!1;i.innerHTML=`
    <div class="ci-360-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="ci-360-header-bar">
        <div class="ci-360-header-left">
          <div class="ci-360-breadcrumb">
            <span class="ci-360-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${c?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="ci-360-title-row">
            <h2 class="ci-360-main-title">🎫 ${c?"Support Tickets Board":"Support Tickets"}</h2>
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
            ${$t.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
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
  `,await Promise.all([et(),Ke(),ot(),Ct()]),it(),nt(),Le(),ze(),g&&rt(g);const ue=setInterval(()=>{if(!document.contains(i)){clearInterval(ue);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!T&&de()},12e3),xe=()=>{document.contains(i)&&!T&&de()};window.addEventListener("focus",xe);async function Ke(){try{const a=new URLSearchParams;$.search&&a.set("search",$.search),$.priority!=="all"&&a.set("priority",$.priority),$.category!=="all"&&a.set("category",$.category),$.assigneeId!=="all"&&a.set("assigneeId",$.assigneeId),$.jobId&&$.jobId!=="all"&&a.set("jobId",$.jobId),$.reporterId&&$.reporterId!=="all"&&a.set("reporterId",$.reporterId),$.scope==="created"&&a.set("reporterId",d?._id||d?.id),$.scope==="assigned"&&a.set("assigneeId",d?._id||d?.id),$.myIssuesOnly&&a.set("myIssuesOnly","true");const r=await je("/tickets?"+a.toString());l=Array.isArray(r)?r:[]}catch(a){w(a.message||"Failed to load tickets",!0),l=[]}}async function et(){try{s=await je("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function ot(){try{let a;try{a=await je("/tickets/staff")}catch{a=await je("/users")}q=(a||[]).filter(r=>r.active!==!1&&r.role!=="client")}catch(a){console.warn("Could not fetch employees:",a),q=[]}}async function Ct(){try{const a=await je("/jobs?limit=250");N=Array.isArray(a)?a:a?.jobs||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function it(){const a=i.querySelector("#ci-360-stats-root");a&&(a.innerHTML=`
      <div class="ci-360-stat-card ${$.status==="all"&&!$.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="ci-360-stat-val">${s.total||0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${$.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${s.toDo||0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${$.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${s.content??(s.inProgress||0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${$.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${s.design||0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${$.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${s.underReview||0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${$.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
        <span class="ci-360-stat-val">${s.readyToLeave??(s.resolved||s.closed||0)}</span>
        <span class="ci-360-stat-lbl">Ready to Leave</span>
      </div>
      <div class="ci-360-stat-card critical" data-stat-filter="critical">
        <span class="ci-360-stat-val">${s.critical||0}</span>
        <span class="ci-360-stat-lbl">Critical 🔴</span>
      </div>
      <div class="ci-360-stat-card overdue" data-stat-filter="overdue">
        <span class="ci-360-stat-val">${s.overdue||0}</span>
        <span class="ci-360-stat-lbl">Overdue ⚠️</span>
      </div>
    `,a.querySelectorAll(".ci-360-stat-card").forEach(r=>{r.onclick=async()=>{const C=r.dataset.statFilter;C==="all"?($.status="all",$.priority="all"):C==="critical"?($.priority="Critical",$.status="all"):($.status=C,$.priority="all"),await de()}}))}function Le(){const a=i.querySelector("#ci-360-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${q.map(C=>`
          <option value="${C._id}" ${$.assigneeId===C._id.toString()?"selected":""}>
            ${v(C.name)} (${v(C.role)})
          </option>
        `).join("")}
      `);const r=i.querySelector("#ci-360-filter-job");r&&(r.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${N.map(C=>`
          <option value="${C._id}" ${$.jobId===C._id.toString()?"selected":""}>
            📁 ${v(C.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function nt(){const a=i.querySelector("#ci-360-board-columns-root");if(!a)return;const r={};ca.forEach(C=>{r[C.key]=[]}),l.forEach(C=>{let A=C.status||"To Do";A==="In Progress"?A="Content":A==="Resolved"?A="Under Review":A==="Closed"&&(A="Ready to Leave"),r[A]||(r[A]=[]),r[A].push(C)}),a.innerHTML=ca.map(C=>{const A=r[C.key]||[];return`
        <div class="ci-360-board-column" data-status="${C.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${v(C.label)}</span>
              <span class="ci-360-col-badge">${A.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${C.key}">
            ${A.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:A.map(Q=>pt(Q)).join("")}
          </div>
        </div>
      `}).join(""),Fe(),dt()}function pt(a){const r=$t.find(ae=>ae.key===a.category)||$t[0],C=zt.find(ae=>ae.key===a.priority)||zt[2],A=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",Q=(a.subtasks||[]).filter(ae=>ae.completed).length,V=(a.subtasks||[]).length,L=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],O=d?._id||d?.id,Y=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(O)||a.userId&&String(a.userId)===String(O),k=e==="superadmin"||d?.role==="superadmin",G=Y||k;let Z="";if(L.length===0)Z='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const ae=L.slice(0,3),ie=L.length-3;Z=`
        <div class="ci-360-avatar-group">
          ${ae.map(J=>`
            <div class="ci-360-avatar" title="Assignee: ${v(J.name||"Member")} (${v(J.role||"")})">
              ${(J.avatar||J.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${ie>0?`
            <div class="ci-360-avatar extra-count" title="${ie} more assignees: ${v(L.slice(3).map(J=>J.name).join(", "))}">
              +${ie}
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
            ${Y?`
              <span class="ci-360-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${a.dueDate?`
              <span class="ci-360-due-pill ${A?"overdue":""}" title="Due Date">
                ${A?"⚠️ ":"📅 "}
                ${new Date(a.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          ${G?`
            <button type="button" class="ci-360-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${v(a.ticketId)}" title="Delete Ticket (${k?"Superadmin":"Creator"})">
              🗑️
            </button>
          `:""}
        </div>

        <div class="ci-360-card-title" title="${v(a.title)}">
          ${v(a.title)}
        </div>

        ${a.jobTitle||a.jobId&&a.jobId.title?`
          <div class="ci-360-card-job-link" title="Linked Internal Job: ${v(a.jobTitle||a.jobId.title)}">
            📁 ${v(a.jobTitle||a.jobId.title)}
          </div>
        `:""}

        ${a.linkUrl||a.links&&a.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${v(a.linkUrl||a.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${v(a.linkUrl||a.links[0]?.url)}">
              🔗 ${a.links&&a.links[0]?.title?v(a.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="ci-360-card-bottom">
          <div class="ci-360-card-id-row">
            <span class="ci-360-pri-icon" title="Priority: ${C.label}">${C.icon}</span>
            <span class="ci-360-ticket-id">${v(a.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${V>0?`
              <span class="ci-360-subtask-badge" title="${Q} of ${V} subtasks completed">
                ☑ ${Q}/${V}
              </span>
            `:""}
            ${Z}
          </div>
        </div>
      </div>
    `}function Fe(){const a=i.querySelectorAll(".ci-360-card"),r=i.querySelectorAll(".ci-360-board-column");a.forEach(C=>{C.ondragstart=A=>{A.dataTransfer.setData("text/plain",C.dataset.ticketId),C.classList.add("dragging")},C.ondragend=()=>{C.classList.remove("dragging")}}),r.forEach(C=>{C.ondragover=A=>{A.preventDefault(),C.classList.add("drag-over")},C.ondragleave=()=>{C.classList.remove("drag-over")},C.ondrop=async A=>{A.preventDefault(),C.classList.remove("drag-over");const Q=A.dataTransfer.getData("text/plain"),V=C.dataset.status;if(!Q||!V)return;const L=l.find(G=>G._id.toString()===Q);if(!L||L.status===V)return;const O=L.status,Y=L.assignees?[...L.assignees]:[],k=L.assignee?{...L.assignee}:null;if(L.status=V,V==="Under Review"){const G={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};L.assignee=G,L.assignees=[G]}nt();try{const G=await Qe(`/tickets/${Q}/status`,{status:V}),Z=V==="Under Review"?`Moved ${G.ticketId} to Under Review (Default assigned to John)`:`Moved ${G.ticketId} to ${V}`;w(Z,!1),await de()}catch(G){w(G.message||"Status update failed",!0),L.status=O,L.assignees=Y,L.assignee=k,await de()}}})}function dt(){i.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async r=>{r.stopPropagation(),r.preventDefault();const C=a.dataset.ticketId,A=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${A}?`)){a.disabled=!0;try{await Xe(`/tickets/${C}`),w(`Ticket ${A} deleted`,!1),await de()}catch(Q){w(Q.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),i.querySelectorAll(".ci-360-card").forEach(a=>{a.onclick=r=>{if(r.target.tagName==="A"||r.target.closest(".btn-delete-card-ticket"))return;const C=a.dataset.ticketId;rt(C)}})}function ze(){const a=i.querySelector("#btn-ci-360-refresh");a&&(a.onclick=async()=>{await de(),w("Board updated",!1)});const r=i.querySelector("#btn-ci-360-create-ticket");r&&(r.onclick=()=>{D()});const C=i.querySelector("#ci-360-search-input");let A=null;C&&(C.oninput=J=>{clearTimeout(A),A=setTimeout(async()=>{$.search=J.target.value.trim(),Re(),await de()},300)});const Q=i.querySelector("#ci-360-filter-priority");Q&&(Q.onchange=async J=>{$.priority=J.target.value,Re(),await de()});const V=i.querySelector("#ci-360-filter-category");V&&(V.onchange=async J=>{$.category=J.target.value,Re(),await de()});const L=i.querySelector("#ci-360-filter-job");L&&(L.onchange=async J=>{$.jobId=J.target.value,Re(),await de()});const O=i.querySelector("#ci-360-filter-assignee");O&&(O.onchange=async J=>{$.assigneeId=J.target.value,Re(),await de()});const Y=i.querySelector("#ci-360-pill-my-issues");Y&&(Y.onclick=async()=>{$.myIssuesOnly=!$.myIssuesOnly,Y.classList.toggle("active",$.myIssuesOnly),Re(),await de()});const k=i.querySelector("#ci-360-pill-scope-all"),G=i.querySelector("#ci-360-pill-scope-assigned"),Z=i.querySelector("#ci-360-pill-scope-created"),ae=async J=>{$.scope=J,k&&k.classList.toggle("active",J==="all"),G&&G.classList.toggle("active",J==="assigned"),Z&&Z.classList.toggle("active",J==="created"),Re(),await de()};k&&(k.onclick=()=>ae("all")),G&&(G.onclick=()=>ae("assigned")),Z&&(Z.onclick=()=>ae("created"));const ie=i.querySelector("#ci-360-clear-filters");ie&&(ie.onclick=async()=>{$={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},C&&(C.value=""),Q&&(Q.value="all"),V&&(V.value="all");const J=i.querySelector("#ci-360-filter-job");J&&(J.value="all"),O&&(O.value="all"),Y&&Y.classList.remove("active"),k&&k.classList.add("active"),G&&G.classList.remove("active"),Z&&Z.classList.remove("active"),Re(),await de()})}function Re(){const a=i.querySelector("#ci-360-clear-filters");if(!a)return;const r=$.search||$.priority!=="all"||$.category!=="all"||$.jobId&&$.jobId!=="all"||$.assigneeId!=="all"||$.myIssuesOnly||$.scope&&$.scope!=="all";a.style.display=r?"inline":"none"}async function de(){await Ke(),nt()}async function rt(a){const r=i.querySelector("#ci-360-modals-root");if(r){r.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{T=await je(`/tickets/${a}`)}catch(C){w(C.message||"Could not load ticket",!0),r.innerHTML="";return}he()}}function he(){const a=i.querySelector("#ci-360-modals-root");if(!a||!T)return;const r=T,C=$t.find(n=>n.key===r.category)||$t[0];zt.find(n=>n.key===r.priority)||zt[2];const A=r.subtasks||[],Q=A.filter(n=>n.completed).length,V=A.length>0?Math.round(Q/A.length*100):0,L=r.attachments||[],O=r.comments||[],Y=(r.history||[]).slice().reverse(),k=r.workLogs||[],G=r.linkedTickets||[],Z=d?._id||d?.id,ae=r.reporter&&r.reporter.userId&&String(r.reporter.userId)===String(Z)||r.userId&&String(r.userId)===String(Z),ie=e==="superadmin"||d?.role==="superadmin",J=ae||ie,u=Array.isArray(r.assignees)&&r.assignees.length>0?r.assignees:r.assignee&&r.assignee.userId?[r.assignee]:[];u.some(n=>n&&n.userId&&String(n.userId)===String(Z));const f=r.jobId?._id?r.jobId._id.toString():r.jobId?r.jobId.toString():"",o=r.jobTitle||r.jobId&&r.jobId.title||"";a.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${C.slug}">${C.icon} ${C.label}</span>
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
                    ${R?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${R?`
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
                    ${r.description?wa(r.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>🔗 Reference &amp; External Links (${(r.links||[]).length+(r.linkUrl&&!(r.links||[]).some(n=>n.url===r.linkUrl)?1:0)})</span>
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
                    ${r.linkUrl&&!(r.links||[]).some(n=>n.url===r.linkUrl)?`
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
                    ${(r.links||[]).map(n=>`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(n.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(n.title||n.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${n.title?`<span style="word-break:break-all;">${v(n.url)}</span> · `:""}Added by ${v(n.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${v(n.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(n.url)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${n.id}" title="Remove Link">&times;</button>
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
                  <span>Attachments (${L.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${L.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${L.map(n=>{const h=n.type&&n.type.includes("video")||n.name&&n.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||n.url&&n.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="ci-360-att-card ${h?"is-video":""}" style="${h?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${h?"16px":"13px"};">${h?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${n.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${v(n.name)}">
                                  ${v(n.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${ga(n.size)} ${h?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${h?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${n.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${n.url}" download="${v(n.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${n.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${h?`
                            <div class="ci-360-video-slot" id="video-slot-${n.id}" style="display:none;margin-top:6px;width:100%;">
                              <video controls preload="metadata" style="width:100%;max-height:360px;border-radius:6px;background:#000;">
                                <source src="${n.url}" type="${n.type||"video/mp4"}">
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
                  <span>Subtasks (${Q}/${A.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${V}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${V}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${A.map(n=>`
                    <div class="ci-360-subtask-item">
                      <div class="ci-360-subtask-left">
                        <input type="checkbox" class="ci-360-subtask-cb cb-subtask-toggle" data-subtask-id="${n.id}" ${n.completed?"checked":""} />
                        <span class="ci-360-subtask-title ${n.completed?"done":""}">${v(n.title)}</span>
                      </div>
                      <button type="button" class="ci-360-att-del btn-del-subtask" data-subtask-id="${n.id}" title="Remove subtask">&times;</button>
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
                  <span>Linked Work Items (${G.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${G.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${G.map(n=>`
                      <div class="ci-360-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${v(n.relationship)}</span>
                          <span class="ci-360-ticket-id" style="color:#38bdf8;">${v(n.ticketId)}</span>
                          <span class="ci-360-linked-title" style="font-size:12.5px;">${v(n.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="ci-360-col-badge">${v(n.status||"Open")}</span>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${n.id}" title="Remove link">&times;</button>
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
                    ${o?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${o?`
                  <div class="ci-360-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div class="ci-360-job-card-title" style="font-weight:700;font-size:13px;">${v(o)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${v(f)}</div>
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
                      ${N.map(n=>`
                        <option value="${n._id}" ${f===n._id.toString()?"selected":""}>
                          📁 ${v(n.title||"Untitled Job")}
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
                  <button type="button" class="ci-360-act-tab ${j==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${O.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${j==="history"?"active":""}" data-act-tab="history">
                    History (${Y.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${j==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${k.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${j==="comments"?`
                  <div class="ci-360-comments-feed">
                    ${O.map(n=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(n.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${v(n.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${v(n.userRole)})</span></span>
                            <span class="ci-360-comment-time">${ta(n.createdAt)}</span>
                          </div>
                          <div class="ci-360-comment-body">${wa(n.content)}</div>
                        </div>
                      </div>
                    `).join("")}

                    <!-- Add Comment Composer -->
                    <div class="ci-360-comment-composer">
                      <div class="ci-360-avatar" style="background:#3b82f6;">
                        ${(d?.name||"U").slice(0,1).toUpperCase()}
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
                ${j==="history"?`
                  <div class="ci-360-history-feed">
                    ${Y.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:Y.map(n=>`
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(n.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${v(n.userName)}</span>
                            <span class="ci-360-comment-time">${ta(n.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="ci-360-history-field">${v(n.field)}</strong>:
                            ${n.from?`<span style="text-decoration:line-through;color:#ef4444;">${v(n.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${v(n.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${j==="worklog"?`
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

                    ${k.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:k.map(n=>`
                      <div class="ci-360-worklog-item">
                        <div class="ci-360-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(n.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-worklog-main">
                          <div class="ci-360-worklog-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${v(n.userName)} logged <strong style="color:#38bdf8;">${v(n.timeSpent)}</strong></span>
                            <span class="ci-360-comment-time">${ta(n.loggedAt)}</span>
                          </div>
                          ${n.description?`<div class="ci-360-comment-body" style="font-size:12px;">${v(n.description)}</div>`:""}
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
                  ${ca.map(n=>{let h=r.status||"To Do";return h==="In Progress"?h="Content":h==="Resolved"?h="Under Review":h==="Closed"&&(h="Ready to Leave"),`
                      <option value="${n.key}" ${h===n.key?"selected":""}>
                        ${n.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="ci-360-select-field">
                  ${zt.map(n=>`
                    <option value="${n.key}" ${r.priority===n.key?"selected":""}>
                      ${n.icon} ${n.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="ci-360-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="ci-360-side-lbl" style="margin-bottom:0;">Assigned Personnel (${u.length})</span>
                  
                    <button type="button" class="ci-360-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="ci-360-assigned-chips-wrap">
                  ${u.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:u.map(n=>`
                    <div class="ci-360-assignee-chip">
                      <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(n.avatar||n.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="ci-360-assignee-chip-name" title="${v(n.name)}">${v(n.name)}</span>
                      ${`
                        <button type="button" class="ci-360-assignee-chip-remove btn-remove-assignee" data-user-id="${n.userId}" title="Remove ${v(n.name)}">&times;</button>
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
                    ${q.map(n=>{const h=u.some(E=>E&&E.userId&&String(E.userId)===String(n._id));return`
                        <label class="ci-360-emp-check-item ${h?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${n._id}" ${h?"checked":""} />
                          <div class="ci-360-avatar" style="width:18px;height:18px;font-size:9px;">${(n.name||"U").slice(0,1).toUpperCase()}</div>
                          <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                            ${v(n.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(n.role)})</span>
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
                  ${$t.map(n=>`
                    <option value="${n.key}" ${r.category===n.key?"selected":""}>
                      ${n.icon} ${n.label}
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
                  ${N.map(n=>`
                    <option value="${n._id}" ${f===n._id.toString()?"selected":""}>
                      📁 ${v(n.title||"Untitled Job")}
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
              ${J?`
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
    `,m()}function m(){const a=i.querySelector("#ci-360-modals-root");if(!a||!T)return;const r=a.querySelector("#btn-close-ci-360-modal");r&&(r.onclick=_);const C=a.querySelector("#ci-360-detail-backdrop");C&&(C.onclick=P=>{P.target===C&&_()});const A=a.querySelector("#inp-detail-title");A&&(A.onchange=async()=>{const P=A.value.trim();if(P)try{T=await Qe(`/tickets/${T._id}`,{title:P}),await de()}catch(B){w(B.message||"Failed to update title",!0)}});const Q=a.querySelector("#btn-toggle-desc-edit");Q&&(Q.onclick=()=>{R=!R,he()});const V=a.querySelector("#btn-cancel-desc");V&&(V.onclick=()=>{R=!1,he()});const L=a.querySelector("#btn-save-desc");L&&(L.onclick=async()=>{const P=a.querySelector("#inp-detail-desc")?.value;try{T=await Qe(`/tickets/${T._id}`,{description:P}),R=!1,he(),await de(),w("Description saved",!1)}catch(B){w(B.message||"Failed to save description",!0)}});const O=a.querySelector("#sel-detail-status");O&&(O.onchange=async P=>{try{const B=await Qe(`/tickets/${T._id}/status`,{status:P.target.value});T=B,he(),await et(),it(),await de();const p=B.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${B.status}`;w(p,!1)}catch(B){w(B.message||"Status change failed",!0)}});const Y=a.querySelector("#sel-detail-priority");Y&&(Y.onchange=async P=>{try{T=await Qe(`/tickets/${T._id}`,{priority:P.target.value}),he(),await de()}catch(B){w(B.message,!0)}});const k=a.querySelector("#btn-toggle-assignee-picker"),G=a.querySelector("#ci-360-detail-assignee-box"),Z=a.querySelector("#btn-close-detail-assignee-box"),ae=a.querySelector("#btn-save-detail-assignees");k&&G&&(k.onclick=()=>{const P=G.style.display==="none";G.style.display=P?"block":"none"}),Z&&G&&(Z.onclick=()=>{G.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(P=>{P.onchange=()=>{P.closest(".ci-360-emp-check-item")?.classList.toggle("selected",P.checked)}}),ae&&(ae.onclick=async()=>{const P=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(B=>B.value);try{ae.disabled=!0,T=await Qe(`/tickets/${T._id}`,{assigneeIds:P}),he(),await de(),w("Assignees updated!",!1)}catch(B){w(B.message,!0),ae.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(P=>{P.onclick=async()=>{const B=P.dataset.userId,Te=(Array.isArray(T.assignees)&&T.assignees.length>0?T.assignees:T.assignee?.userId?[T.assignee]:[]).filter(we=>we&&we.userId&&String(we.userId)!==String(B)).map(we=>String(we.userId));try{T=await Qe(`/tickets/${T._id}`,{assigneeIds:Te}),he(),await de(),w("Assignee removed",!1)}catch(we){w(we.message,!0)}}});const ie=a.querySelector("#sel-detail-category");ie&&(ie.onchange=async P=>{try{T=await Qe(`/tickets/${T._id}`,{category:P.target.value}),he(),await de()}catch(B){w(B.message,!0)}});const J=a.querySelector("#inp-detail-duedate");J&&(J.onchange=async P=>{try{T=await Qe(`/tickets/${T._id}`,{dueDate:P.target.value||null}),he(),await de()}catch(B){w(B.message,!0)}});const u=a.querySelector("#sel-detail-job");u&&(u.onchange=async P=>{try{T=await Qe(`/tickets/${T._id}`,{jobId:P.target.value||null}),he(),await de(),w(P.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(B){w(B.message,!0)}});const f=a.querySelector("#btn-toggle-job-link"),o=a.querySelector("#ci-360-job-link-box");f&&o&&(f.onclick=()=>{o.style.display=o.style.display==="none"?"block":"none"});const n=a.querySelector("#btn-cancel-job-link");n&&o&&(n.onclick=()=>{o.style.display="none"});const h=a.querySelector("#btn-save-job-link");h&&(h.onclick=async()=>{const P=a.querySelector("#inp-modal-job-select")?.value||null;try{T=await Qe(`/tickets/${T._id}`,{jobId:P}),he(),await de(),w(P?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(B){w(B.message,!0)}});const E=a.querySelector("#btn-unlink-job");E&&(E.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{T=await Qe(`/tickets/${T._id}`,{jobId:null}),he(),await de(),w("Job unlinked",!1)}catch(P){w(P.message,!0)}});const S=a.querySelector("#inp-detail-esthours");S&&(S.onchange=async P=>{try{T=await Qe(`/tickets/${T._id}`,{estimatedHours:Number(P.target.value)||0})}catch(B){w(B.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(P=>{P.onchange=async()=>{const B=P.dataset.subtaskId;try{T=await Qe(`/tickets/${T._id}/subtasks/${B}`,{completed:P.checked}),he(),await de()}catch(p){w(p.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(P=>{P.onclick=async()=>{const B=P.dataset.subtaskId;try{T=await Xe(`/tickets/${T._id}/subtasks/${B}`),he(),await de()}catch(p){w(p.message,!0)}}});const H=a.querySelector("#inp-new-subtask"),oe=a.querySelector("#btn-add-subtask"),z=async()=>{const P=H?.value.trim();if(P)try{T=await Ce(`/tickets/${T._id}/subtasks`,{title:P}),he(),await de()}catch(B){w(B.message,!0)}};oe&&(oe.onclick=z),H&&(H.onkeydown=P=>{P.key==="Enter"&&(P.preventDefault(),z())});const M=a.querySelector("#btn-toggle-add-link"),W=a.querySelector("#add-link-form"),_e=a.querySelector("#btn-cancel-new-link"),me=a.querySelector("#btn-save-new-link"),le=a.querySelector("#inp-new-link-url"),pe=a.querySelector("#inp-new-link-title");M&&W&&(M.onclick=()=>{const P=W.style.display==="none";W.style.display=P?"block":"none",P&&le&&le.focus()}),_e&&W&&(_e.onclick=()=>{W.style.display="none",le&&(le.value=""),pe&&(pe.value="")}),me&&le&&(me.onclick=async()=>{const P=le.value.trim(),B=pe?.value.trim()||"";if(!P){w("Please enter a valid URL link",!0);return}try{me.disabled=!0,me.textContent="Saving...",T=await Ce(`/tickets/${T._id}/links`,{url:P,title:B}),he(),await de(),w("Reference link added! 🔗",!1)}catch(p){w(p.message||"Failed to save link",!0),me.disabled=!1,me.textContent="Save Link 🔗"}}),a.querySelectorAll(".btn-copy-link").forEach(P=>{P.onclick=()=>{const B=P.dataset.url;B&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(B).then(()=>{w("Link copied to clipboard! 📋")}).catch(()=>{w("Link: "+B)}):w("Link: "+B))}}),a.querySelectorAll(".btn-del-link").forEach(P=>{P.onclick=async()=>{const B=P.dataset.linkId;try{T=await Xe(`/tickets/${T._id}/links/${B}`),he(),await de(),w("Link removed")}catch(p){w(p.message||"Failed to remove link",!0)}}});const F=a.querySelector("#btn-trigger-detail-upload"),re=a.querySelector("#inp-detail-att-upload"),be=a.querySelector("#detail-att-upload-progress");F&&re&&(F.onclick=P=>{P.preventDefault(),re.click()}),re&&(re.onchange=async()=>{const P=Array.from(re.files||[]);if(re.value="",!!P.length){be&&(be.style.display="block",be.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${P.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const p=(await ba(P,Te=>{const we=a.querySelector("#att-prog-pct"),st=a.querySelector("#att-prog-bar");we&&(we.textContent=`${Te}%`),st&&(st.style.width=`${Te}%`)})).map(Te=>({name:Te.name,url:Te.url,size:Te.size||0,type:Te.type||"application/octet-stream"}));p.length&&(T=await Ce(`/tickets/${T._id}/attachments`,{attachments:p}),he(),w(`Successfully attached ${p.length} file(s)! 📎`,!1))}catch(B){console.error("Upload error:",B),w(`Upload failed: ${B.message}`,!0)}finally{be&&(be.style.display="none")}}}),a.querySelectorAll(".btn-play-att-video").forEach(P=>{P.onclick=()=>{const B=P.dataset.slot,p=a.querySelector("#"+B);if(p){const Te=p.style.display==="none";p.style.display=Te?"block":"none",P.textContent=Te?"⏸ Close Video":"▶ Play Video";const we=p.querySelector("video");we&&Te?we.play().catch(()=>{}):we&&we.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(P=>{P.onclick=async()=>{const B=P.dataset.attId;try{T=await Xe(`/tickets/${T._id}/attachments/${B}`),he()}catch(p){w(p.message,!0)}}}),a.querySelectorAll(".ci-360-act-tab").forEach(P=>{P.onclick=()=>{j=P.dataset.actTab,he()}});const ge=a.querySelector("#inp-new-comment"),ye=a.querySelector("#btn-submit-comment");ye&&ge&&(ye.onclick=async()=>{const P=ge.value.trim();if(P)try{ye.disabled=!0,ye.textContent="Saving...",T=await Ce(`/tickets/${T._id}/comments`,{content:P}),he(),w("Comment added",!1)}catch(B){w(B.message||"Failed to add comment",!0)}finally{ye.disabled=!1}});const Pe=a.querySelector("#btn-open-link-dialog"),Be=a.querySelector("#ci-360-link-box"),Ge=a.querySelector("#btn-cancel-link"),Me=a.querySelector("#btn-submit-link"),ce=a.querySelector("#inp-link-target"),Ae=a.querySelector("#sel-link-rel");Pe&&Be&&(Pe.onclick=()=>{Be.style.display="block"}),Ge&&Be&&(Ge.onclick=()=>{Be.style.display="none"}),Me&&Be&&(Me.onclick=async()=>{const P=ce?.value.trim(),B=Ae?.value||"relates to";if(P)try{Me.disabled=!0,T=await Ce(`/tickets/${T._id}/links`,{targetTicketId:P,relationship:B}),he(),w(`Linked with ${P}`,!1)}catch(p){w(p.message||"Failed to link ticket",!0)}finally{Me.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(P=>{P.onclick=async()=>{const B=P.dataset.linkId;try{T=await Xe(`/tickets/${T._id}/links/${B}`),he()}catch(p){w(p.message,!0)}}});const Ue=a.querySelector("#btn-open-worklog-dialog"),Ne=a.querySelector("#ci-360-worklog-box"),Ee=a.querySelector("#btn-cancel-worklog"),Ie=a.querySelector("#btn-submit-worklog"),De=a.querySelector("#inp-worklog-time"),ke=a.querySelector("#inp-worklog-desc");Ue&&Ne&&(Ue.onclick=()=>{Ne.style.display="block"}),Ee&&Ne&&(Ee.onclick=()=>{Ne.style.display="none"}),Ie&&Ne&&(Ie.onclick=async()=>{const P=De?.value.trim(),B=ke?.value.trim();if(!P){w("Enter time spent (e.g. 2h 30m)",!0);return}try{Ie.disabled=!0,T=await Ce(`/tickets/${T._id}/worklogs`,{timeSpent:P,description:B}),he(),w("Work logged",!1)}catch(p){w(p.message||"Failed to log work",!0)}finally{Ie.disabled=!1}});const fe=a.querySelector("#btn-delete-ticket");fe&&(fe.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${T.ticketId}?`))try{fe.disabled=!0,await Xe(`/tickets/${T._id}`),w(`Ticket ${T.ticketId} deleted`,!1),_(),await et(),it(),await de()}catch(P){w(P.message||"Failed to delete ticket",!0),fe.disabled=!1}})}function _(){T=null,R=!1;const a=i.querySelector("#ci-360-modals-root");a&&(a.innerHTML="")}function D(a=null){const r=i.querySelector("#ci-360-modals-root");if(!r)return;const C=a||($.jobId&&$.jobId!=="all"?$.jobId:null);r.innerHTML=`
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
                  ${$t.map(o=>`<option value="${o.key}">${o.icon} ${o.label}</option>`).join("")}
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
                  ${q.map(o=>{const n=d&&String(d._id||d.id)===String(o._id);return`
                      <label class="ci-360-emp-check-item ${n?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${o._id}" ${n?"checked":""} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(o.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${v(o.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(o.role)})${n?" — (You)":""}</span>
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
                  ${N.map(o=>`
                    <option value="${o._id}" ${C&&String(C)===String(o._id)?"selected":""}>
                      📁 ${v(o.title||"Untitled Job")}
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
    `;const A=()=>{r.querySelectorAll(".ci-360-emp-check-item").forEach(o=>{const n=o.querySelector(".chk-create-emp");o.classList.toggle("selected",!!n?.checked)})};r.querySelectorAll(".chk-create-emp").forEach(o=>{o.onchange=A});const Q=r.querySelector("#btn-create-assign-self");Q&&d&&(Q.onclick=()=>{const o=String(d._id||d.id);r.querySelectorAll(".chk-create-emp").forEach(n=>{n.value===o&&(n.checked=!0)}),A()});const V=r.querySelector("#btn-create-clear-assign");V&&(V.onclick=()=>{r.querySelectorAll(".chk-create-emp").forEach(o=>{o.checked=!1}),A()});const L=[],O=r.querySelector("#inp-create-ticket-att"),Y=r.querySelector("#create-att-list"),k=r.querySelector("#create-att-count"),G=r.querySelector("#create-att-progress"),Z=()=>{k&&(k.textContent=`${L.length} file(s) attached`),Y&&(Y.innerHTML=L.map((o,n)=>{const h=o.type&&o.type.includes("video")||o.name&&o.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${h?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${v(o.name)}">${v(o.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${ga(o.size)} ${h?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${n}" title="Remove">&times;</button>
          </div>
        `}).join(""),Y.querySelectorAll(".btn-del-pending-att").forEach(o=>{o.onclick=()=>{L.splice(Number(o.dataset.idx),1),Z()}}))};O&&(O.onchange=async()=>{const o=Array.from(O.files||[]);if(O.value="",!!o.length){G&&(G.style.display="block",G.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${o.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await ba(o,h=>{const E=r.querySelector("#create-prog-pct"),S=r.querySelector("#create-prog-bar");E&&(E.textContent=`${h}%`),S&&(S.style.width=`${h}%`)})).forEach(h=>{L.push({name:h.name,url:h.url,size:h.size||0,type:h.type||"application/octet-stream"})}),Z()}catch(n){w(`Failed to upload files: ${n.message}`,!0)}finally{G&&(G.style.display="none"),O.value=""}}});const ae=()=>{r.innerHTML=""},ie=r.querySelector("#btn-close-create-modal");ie&&(ie.onclick=ae);const J=r.querySelector("#btn-cancel-create-ticket");J&&(J.onclick=ae);const u=r.querySelector("#ci-360-create-backdrop");u&&(u.onclick=o=>{o.target===u&&ae()});const f=r.querySelector("#btn-submit-create-ticket");f&&(f.onclick=async()=>{const o=r.querySelector("#create-ticket-title")?.value.trim(),n=r.querySelector("#create-ticket-desc")?.value.trim(),h=r.querySelector("#create-ticket-cat")?.value||"Task",E=r.querySelector("#create-ticket-pri")?.value||"Medium",H=Array.from(r.querySelectorAll(".chk-create-emp:checked")).map(W=>W.value),oe=r.querySelector("#create-ticket-duedate")?.value||null,z=r.querySelector("#create-ticket-job")?.value||null,M=r.querySelector("#create-ticket-url")?.value.trim()||"";if(!o){w("Ticket summary / title is required",!0);return}try{f.disabled=!0,f.textContent="Creating...";const W=await Ce("/tickets",{title:o,description:n,category:h,priority:E,assigneeIds:H,assigneeId:H[0]||null,dueDate:oe,jobId:z,linkUrl:M,attachments:L});w(`Ticket ${W.ticketId} created! 🎫`,!1),ae(),await et(),it(),await de(),rt(W._id)}catch(W){w(W.message||"Could not create ticket",!0),f.disabled=!1,f.textContent="Create Ticket 🚀"}})}i._openCreateTicketModal=D,i._openTicketDetailModal=rt,i._setJobFilter=async a=>{$.jobId=a||"all";const r=i.querySelector("#ci-360-filter-job");r&&(r.value=$.jobId),Re(),await de()}}export{ii as a,ai as b,ti as i};
