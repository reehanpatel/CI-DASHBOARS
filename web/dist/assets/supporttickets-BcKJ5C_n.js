import{c as Re,h as y,e as v,n as Qe,j as Xe,o as Gt,k as Yt,g as Ce,p as ga,t as ta,u as ba}from"./api-oR0ut9pM.js";const fa={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function _a(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},fa,JSON.parse(i))}catch{}return Object.assign({},fa)}function ja(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function at(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),d=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${d}`}function Wt(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const d=e.getFullYear(),b=String(e.getMonth()+1).padStart(2,"0"),c=String(e.getDate()).padStart(2,"0");return`${d}-${b}-${c}`}function kt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function gt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ma(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function aa(i,t=1){const e=new Date(i+"T00:00:00"),d=e.getDay(),b=(d<t?7:0)+d-t,c=new Date(e);c.setDate(e.getDate()-b);const l=[];for(let s=0;s<7;s++){const L=new Date(c);L.setDate(c.getDate()+s);const N=L.getFullYear(),$=String(L.getMonth()+1).padStart(2,"0"),j=String(L.getDate()).padStart(2,"0");l.push(`${N}-${$}-${j}`)}return l}function Ta(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,d=t.createOscillator(),b=t.createGain();d.type="sine",d.frequency.setValueAtTime(523.25,e),d.frequency.exponentialRampToValueAtTime(783.99,e+.15),b.gain.setValueAtTime(.2,e),b.gain.exponentialRampToValueAtTime(.001,e+.35),d.connect(b),b.connect(t.destination),d.start(e),d.stop(e+.35)}catch{}}function ti(i,t={}){const{userRole:e="employee",currentUser:d=null,onNavigate:b=null}=t,c=e==="superadmin"||e==="admin";let l=_a(),s={selectedDate:at(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ia(),L();async function L(){s.loading=!0,N();try{const m=[Re("/tasks")];c&&m.push(Re("/personnel").catch(()=>[]));const[_,D]=await Promise.all(m);s.tasks=Array.isArray(_)?_:[],D&&(s.personnelList=Array.isArray(D)?D:[])}catch(m){y("Failed to load planner tasks: "+m.message,!0)}finally{s.loading=!1,z()}}function N(){i.innerHTML=`
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
    `}function $(m){return s.tasks.filter(_=>{if(_.isDeleted===!0)return!1;if(c&&s.selectedPersonnelId!=="all"){const a=_.personnelId?._id||_.personnelId;if(String(a)!==String(s.selectedPersonnelId))return!1}const D=_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):"");return D?D===m:m===at()})}function j(m,_){if(m.status==="Completed")return!1;const D=m.dateStr||(m.dueDate?new Date(m.dueDate).toISOString().slice(0,10):"");return D?D<_:!1}function R(m,_){const D=m.length,a=m.filter(K=>K.status==="Completed").length,o=m.filter(K=>K.status==="In Progress").length,C=m.filter(K=>K.status==="Pending"||K.status==="Todo").length,I=m.filter(K=>j(K,_)).length,Q=D>0?Math.round(a/D*100):0;return{total:D,completed:a,inProgress:o,pending:C,overdue:I,percent:Q}}function z(){const m=at(),_=s.selectedDate===m,D=$(s.selectedDate),a=R(D,m);i.innerHTML=`
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
                ${s.personnelList.map(o=>`
                  <option value="${o._id}" ${s.selectedPersonnelId===String(o._id)?"selected":""}>
                    ${v(o.name)} (${v(o.department||o.role||"Team")})
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
          ${pe(D,a)}
        </main>

      </div>
    `,it(),Pe()}function pe(m,_){return s.viewMode==="weekly"?rt():s.viewMode==="report"?Ct():ve(m,_)}function ve(m,_){const D=at();let a=m;if(s.filterStatus==="pending"?a=a.filter(o=>o.status==="Pending"||o.status==="Todo"):s.filterStatus==="in_progress"?a=a.filter(o=>o.status==="In Progress"):s.filterStatus==="completed"?a=a.filter(o=>o.status==="Completed"):s.filterStatus==="overdue"&&(a=a.filter(o=>j(o,D))),s.searchQuery){const o=s.searchQuery.toLowerCase();a=a.filter(C=>(C.title||"").toLowerCase().includes(o)||(C.description||"").toLowerCase().includes(o)||(C.category||"").toLowerCase().includes(o))}return a.sort((o,C)=>{if(o.status==="Completed"&&C.status!=="Completed")return 1;if(o.status!=="Completed"&&C.status==="Completed")return-1;const I={Urgent:0,High:1,Medium:2,Low:3};return(I[o.priority]||2)-(I[C.priority]||2)}),`
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
              ${a.map(o=>et(o,D)).join("")}
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
    `}function et(m,_){const D=m.status==="Completed",a=j(m,_),o=m.dateStr||(m.dueDate?new Date(m.dueDate).toISOString().slice(0,10):_),C=!c&&o<_,I=`pri-${(m.priority||"medium").toLowerCase()}`,Q=`status-${(m.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
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
            <span class="ci360-badge ${I}">
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
    `}function rt(){const m=aa(s.selectedDate,l.weekStartsOn),_=gt(m[0]),D=gt(m[6]),a=at();return`
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
          ${m.map(o=>{const C=o===a,I=o===s.selectedDate,Q=$(o),K=R(Q,a);return`
              <div class="ci360-day-column ${C?"is-today":""} ${I?"is-selected":""}" data-date="${o}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${o}">
                  <div class="day-name">${ma(o)}</div>
                  <div class="day-number">${new Date(o+"T00:00:00").getDate()}</div>
                  ${C?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${K.completed}/${K.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${K.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${Q.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:Q.map(q=>`
                    <div class="ci360-mini-task-card ${q.status==="Completed"?"done":""}" data-id="${q._id}">
                      <button type="button" class="mini-check ${q.status==="Completed"?"checked":""}" data-action="toggle" data-id="${q._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${q._id}">
                        <div class="mini-title">${v(q.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(q.priority||"medium").toLowerCase()}">${q.priority||"Med"}</span>
                          ${q.dueTime?`<span class="mini-time">${v(q.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button -->
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${o}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function Ct(){const m=aa(s.selectedDate,l.weekStartsOn),_=kt(m[0]),D=kt(m[6]),a=at(),o=s.tasks.filter(F=>{if(F.isDeleted===!0)return!1;const W=F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):"");return m.includes(W)}),C=o.length,I=o.filter(F=>F.status==="Completed").length,Q=o.filter(F=>F.status==="In Progress").length,K=C>0?Math.round(I/C*100):0,q={Urgent:0,High:0,Medium:0,Low:0};return o.forEach(F=>{const W=F.priority||"Medium";q[W]!==void 0&&q[W]++}),`
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
            <span class="value" style="font-size:28px;color:var(--green-500)">${I}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${Q}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${K}%</span>
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
                ${m.map(F=>{const W=$(F),k=R(W,a);return`
                    <tr>
                      <td><strong>${ma(F)}</strong></td>
                      <td>${gt(F)}</td>
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
    `}function it(){const m=document.getElementById("btnViewDaily"),_=document.getElementById("btnViewWeekly"),D=document.getElementById("btnViewReport");m&&(m.onclick=()=>{s.viewMode="daily",z()}),_&&(_.onclick=()=>{s.viewMode="weekly",z()}),D&&(D.onclick=()=>{s.viewMode="report",z()});const a=document.getElementById("btnPrevDay"),o=document.getElementById("btnNextDay"),C=document.getElementById("btnJumpToday"),I=document.getElementById("hiddenDateInput"),Q=document.getElementById("datePickerBadge");a&&(a.onclick=()=>{s.selectedDate=Wt(s.selectedDate,-1),z()}),o&&(o.onclick=()=>{s.selectedDate=Wt(s.selectedDate,1),z()}),C&&(C.onclick=()=>{s.selectedDate=at(),z()}),Q&&I&&(Q.onclick=()=>{try{typeof I.showPicker=="function"?I.showPicker():I.focus()}catch{I.focus()}},I.onchange=Y=>{Y.target.value&&(s.selectedDate=Y.target.value,z())});const K=document.getElementById("admTeamSelect");K&&(K.onchange=Y=>{s.selectedPersonnelId=Y.target.value,z()});const q=document.getElementById("btnOpenAddTaskModal");q&&(q.onclick=()=>Oe());const F=document.getElementById("btnPlannerActionsMenu"),W=document.getElementById("plannerActionsDropdown");F&&W&&(F.onclick=Y=>{Y.stopPropagation(),W.classList.toggle("hidden")},document.addEventListener("click",Y=>{!W.contains(Y.target)&&Y.target!==F&&W.classList.add("hidden")}));const k=document.getElementById("btnActionImport");k&&(k.onclick=()=>{W?.classList.add("hidden"),dt()});const J=document.getElementById("btnActionExportPng");J&&(J.onclick=()=>{W?.classList.add("hidden"),qe()});const te=document.getElementById("btnActionExportPdf");te&&(te.onclick=()=>{W?.classList.add("hidden"),de()});const ae=document.getElementById("btnActionBackup");ae&&(ae.onclick=()=>{W?.classList.add("hidden"),ot()});const ie=document.getElementById("btnActionSettings");ie&&(ie.onclick=()=>{W?.classList.add("hidden"),me()})}function Pe(m){if(s.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(q=>{q.onclick=()=>{s.filterStatus=q.dataset.f,z()}});const _=document.getElementById("plannerTaskSearchInp");_&&(_.oninput=q=>{s.searchQuery=q.target.value,z()});const D=document.getElementById("btnClearSearch");D&&(D.onclick=()=>{s.searchQuery="",z()});const a=document.getElementById("quickAddTitleInp"),o=document.getElementById("quickAddPriority"),C=document.getElementById("quickAddCategory"),I=document.getElementById("btnQuickAddSubmit"),Q=async()=>{const q=(a?.value||"").trim();if(!q){y("Please enter a task title",!0),a?.focus();return}try{const F={title:q,dateStr:s.selectedDate,priority:o?.value||l.defaultPriority,category:C?.value||"General",status:"Pending"};c&&s.selectedPersonnelId!=="all"&&(F.personnelId=s.selectedPersonnelId);const W=await Ce("/tasks",F);s.tasks.unshift(W),y("Task added to today's focus! ✨"),a&&(a.value="",a.focus()),z()}catch(F){y(F.message,!0)}};I&&(I.onclick=Q),a&&(a.onkeydown=q=>{q.key==="Enter"&&Q()});const K=document.getElementById("btnEmptyStateImport");K&&(K.onclick=()=>dt())}if(s.viewMode==="weekly"){const _=document.getElementById("btnPrevWeek"),D=document.getElementById("btnNextWeek"),a=document.getElementById("btnThisWeek");_&&(_.onclick=()=>{s.selectedDate=Wt(s.selectedDate,-7),z()}),D&&(D.onclick=()=>{s.selectedDate=Wt(s.selectedDate,7),z()}),a&&(a.onclick=()=>{s.selectedDate=at(),z()}),document.querySelectorAll(".day-col-header").forEach(o=>{o.onclick=()=>{s.selectedDate=o.dataset.date,s.viewMode="daily",z()}}),document.querySelectorAll('[data-action="add-day"]').forEach(o=>{o.onclick=()=>{Oe(null,o.dataset.date)}})}if(s.viewMode==="report"){const _=document.getElementById("btnDownloadWeeklyPdf");_&&(_.onclick=de)}i.querySelectorAll('[data-action="toggle"]').forEach(_=>{_.onclick=async D=>{D.stopPropagation();const a=_.dataset.id;await nt(a)}}),i.querySelectorAll('[data-action="edit"]').forEach(_=>{_.onclick=D=>{D.stopPropagation();const a=_.dataset.id,o=s.tasks.find(C=>C._id===a);o&&Oe(o)}}),i.querySelectorAll('[data-action="delete"]').forEach(_=>{_.onclick=async D=>{D.stopPropagation();const a=_.dataset.id;await pt(a)}})}async function nt(m){const _=s.tasks.find(a=>a._id===m);if(!_)return;const D=_.status!=="Completed";try{const a=await Qe(`/tasks/${m}/toggle`,{}),o=s.tasks.findIndex(C=>C._id===m);o!==-1&&(s.tasks[o]=a),D?(l.soundEnabled&&Ta(),y("Task marked as completed! 🎉")):y("Task reopened as pending."),z()}catch(a){y(a.message,!0)}}async function pt(m){const _=s.tasks.find(D=>D._id===m);if(_&&confirm(`Are you sure you want to remove "${_.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Xe(`/tasks/${m}`),s.tasks=s.tasks.filter(D=>D._id!==m),y("Task removed from planner (safely stored in database archive)"),z()}catch(D){y(D.message,!0)}}function Oe(m=null,_=null){const D=!!m,a=m?m.dateStr||(m.dueDate?new Date(m.dueDate).toISOString().slice(0,10):s.selectedDate):_||s.selectedDate,o=at();if(!c&&a<o){y("Tasks cannot be added or edited after the date is gone.",!0);return}const C=`
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
                ${s.personnelList.map(k=>{const J=m?.personnelId?._id===k._id||m?.personnelId===k._id;return`<option value="${k._id}" ${J?"selected":""}>${v(k.name)} (${v(k.department||k.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${D&&(c||a>=o)?`
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
    `,I=Gt(C),Q=I.querySelector("#taskForm"),K=I.querySelector("#btnModalClose"),q=I.querySelector("#btnCancelModal"),F=I.querySelector("#btnModalDeleteTask"),W=()=>I.remove();K&&(K.onclick=W),q&&(q.onclick=W),F&&m&&(F.onclick=async()=>{W(),await pt(m._id)}),Q.onsubmit=async k=>{k.preventDefault();const J=I.querySelector("#taskTitle").value.trim(),te=I.querySelector("#taskDesc").value.trim(),ae=I.querySelector("#taskDate").value,ie=I.querySelector("#taskStartTime").value.trim(),Y=I.querySelector("#taskDueTime").value.trim(),p=I.querySelector("#taskPriority").value,f=I.querySelector("#taskStatus").value,r=I.querySelector("#taskCategory").value.trim()||"General";if(!J){y("Task title is required",!0);return}const n={title:J,description:te,dateStr:ae,startTime:ie,dueTime:Y,priority:p,status:f,category:r};if(c){const E=I.querySelector("#taskAssignee")?.value;E==="all"?(n.assignAll=!0,n.personnelId="all"):E&&(n.personnelId=E)}const h=I.querySelector("#btnSaveTask");h.disabled=!0,h.textContent="Saving...";try{if(D){const E=await Yt(`/tasks/${m._id}`,n),S=s.tasks.findIndex(U=>U._id===m._id);S!==-1&&(s.tasks[S]=E),y("Task updated successfully! ✍️")}else{const E=await Ce("/tasks",n);Array.isArray(E.tasks)?E.tasks.forEach(S=>s.tasks.unshift(S)):s.tasks.unshift(E),y("Task created successfully! ✨")}W(),z()}catch(E){y(E.message,!0),h.disabled=!1,h.textContent=D?"Save Changes":"Create Task"}}}function dt(){let m=[];const _=`
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
    `,D=Gt(_),a=()=>D.remove();D.querySelector("#btnImportClose").onclick=a,D.querySelector("#btnCancelImport").onclick=a;const o=D.querySelector("#importTextarea"),C=D.querySelector("#importFileInput"),I=D.querySelector("#importDropzone"),Q=D.querySelector("#previewListArea"),K=D.querySelector("#previewCountLabel"),q=D.querySelector("#btnConfirmImport"),F=D.querySelector("#importFileInfo");function W(J){if(!J)return[];const te=J.split(/\r?\n/),ae=[];for(let ie of te)ie=ie.trim(),ie&&(ie=ie.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),ie=ie.replace(/^[-*•]\s+/,""),ie=ie.replace(/^\d+[\.\)]\s+/,""),ie=ie.trim(),ie&&ae.push(ie));return ae}function k(){const J=o.value,te=W(J),ae=D.querySelector("#importTargetDate").value,ie=$(ae),Y=new Set(ie.map(p=>(p.title||"").trim().toLowerCase()));m=[];for(const p of te){const f=Y.has(p.toLowerCase());m.push({title:p,isDuplicate:f})}if(K.textContent=`Preview (${m.length} ${m.length===1?"task":"tasks"} found)`,q.disabled=m.length===0,q.textContent=`Import ${m.length} ${m.length===1?"Task":"Tasks"}`,m.length===0){Q.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}Q.innerHTML=m.map((p,f)=>`
        <div class="preview-item ${p.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${f+1}.</span>
          <span class="preview-title">${v(p.title)}</span>
          ${p.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}o.oninput=k,I.onclick=()=>C.click(),C.onchange=J=>{const te=J.target.files[0];if(!te)return;F.textContent=`File selected: ${te.name} (${Math.round(te.size/1024)} KB)`;const ae=new FileReader;ae.onload=ie=>{o.value=ie.target.result,k()},ae.readAsText(te)},I.ondragover=J=>{J.preventDefault(),I.classList.add("dragover")},I.ondragleave=()=>I.classList.remove("dragover"),I.ondrop=J=>{J.preventDefault(),I.classList.remove("dragover");const te=J.dataTransfer.files[0];if(te&&(te.type==="text/plain"||te.name.endsWith(".txt"))){F.textContent=`File dropped: ${te.name}`;const ae=new FileReader;ae.onload=ie=>{o.value=ie.target.result,k()},ae.readAsText(te)}else y("Please drop a valid .txt plain-text file",!0)},q.onclick=async()=>{if(m.length===0)return;q.disabled=!0,q.textContent="Importing...";const J=D.querySelector("#importTargetDate").value,te=D.querySelector("#importPriority").value,ae=D.querySelector("#importCategory").value.trim()||"General",ie={date:J,tasks:m.map(Y=>({title:Y.title,priority:te,category:ae,status:"Pending"}))};c&&s.selectedPersonnelId!=="all"&&(ie.personnelId=s.selectedPersonnelId);try{const Y=await Ce("/tasks/bulk-import",ie);Array.isArray(Y.tasks)&&Y.tasks.forEach(p=>s.tasks.unshift(p)),y(`Imported ${Y.importedCount} tasks successfully! (${Y.skippedCount} skipped duplicates)`),a(),s.selectedDate=J,z()}catch(Y){y(Y.message,!0),q.disabled=!1,q.textContent="Retry Import"}}}async function qe(){const m=$(s.selectedDate),_=R(m,at()),D=kt(s.selectedDate),a=2,o=800,C=160,I=90,Q=65,K=70,q=Math.max(120,m.length*Q),F=C+I+q+K,W=document.createElement("canvas");W.width=o*a,W.height=F*a;const k=W.getContext("2d");k.scale(a,a);const J=document.documentElement.getAttribute("data-theme")==="dark",te=J?"#0F172A":"#F8FAFC",ae=J?"#1E293B":"#FFFFFF",ie=J?"#334155":"#E2E8F0",Y=J?"#F8FAFC":"#0F172A",p=J?"#94A3B8":"#475569",f="#4F46E5",r="#10B981",n="#F59E0B";k.fillStyle=te,k.fillRect(0,0,o,F),k.fillStyle=ae,ze(k,24,20,o-48,C-30,16),k.fill(),k.strokeStyle=ie,k.lineWidth=1,k.stroke(),k.fillStyle=f,k.font="bold 12px Inter, sans-serif",k.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),k.fillStyle=Y,k.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',k.fillText(D,44,86),k.fillStyle=p,k.font="13px Inter, sans-serif",k.fillText(`Planned focus list · ${_.completed} of ${_.total} tasks completed (${_.percent}%)`,44,114);const h=C+6;k.fillStyle=ae,ze(k,24,h,o-48,I-16,12),k.fill(),k.stroke();const E=[{label:"TOTAL TASKS",val:String(_.total),color:Y},{label:"COMPLETED",val:String(_.completed),color:r},{label:"IN PROGRESS",val:String(_.inProgress),color:n},{label:"PENDING",val:String(_.pending),color:p},{label:"PROGRESS",val:`${_.percent}%`,color:f}],S=(o-48)/E.length;E.forEach((M,P)=>{const G=24+P*S+20;k.fillStyle=M.color,k.font="bold 20px Inter, sans-serif",k.fillText(M.val,G,h+36),k.fillStyle=p,k.font="10px Inter, sans-serif",k.fillText(M.label,G,h+54)});const U=h+I;k.fillStyle=ae,ze(k,24,U,o-48,q+10,16),k.fill(),k.stroke(),m.length===0?(k.fillStyle=p,k.font="14px Inter, sans-serif",k.textAlign="center",k.fillText("No scheduled tasks recorded for this date.",o/2,U+60),k.textAlign="left"):m.forEach((M,P)=>{const G=U+16+P*Q,_e=M.status==="Completed";k.beginPath(),k.arc(48,G+14,10,0,Math.PI*2),_e?(k.fillStyle=r,k.fill(),k.strokeStyle="#FFFFFF",k.lineWidth=2,k.beginPath(),k.moveTo(44,G+14),k.lineTo(47,G+17),k.lineTo(52,G+11),k.stroke()):(k.strokeStyle=ie,k.lineWidth=2,k.stroke()),k.fillStyle=_e?p:Y,k.font=`${_e?"normal":"500"} 14px Inter, sans-serif`;const fe=M.title.length>55?M.title.slice(0,52)+"...":M.title;if(k.fillText(fe,70,G+18),_e){const be=k.measureText(fe);k.strokeStyle=p,k.lineWidth=1.2,k.beginPath(),k.moveTo(70,G+14),k.lineTo(70+be.width,G+14),k.stroke()}const se=M.priority||"Medium";let ue="#E2E8F0",H="#334155";se==="Urgent"?(ue="#FEE2E2",H="#DC2626"):se==="High"?(ue="#FEF3C7",H="#D97706"):se==="Low"&&(ue="#ECFDF5",H="#059669"),k.fillStyle=ue,ze(k,o-150,G+4,60,20,10),k.fill(),k.fillStyle=H,k.font="bold 10px Inter, sans-serif",k.fillText(se,o-138,G+18);const le=M.dueTime?`🕒 ${M.dueTime}`:M.category||"General";k.fillStyle=p,k.font="11px Inter, sans-serif",k.fillText(le,70,G+34),P<m.length-1&&(k.strokeStyle=ie,k.lineWidth=.6,k.beginPath(),k.moveTo(40,G+48),k.lineTo(o-40,G+48),k.stroke())});const re=F-35;k.fillStyle=p,k.font="11px Inter, sans-serif",k.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,re);try{const M=W.toDataURL("image/png"),P=document.createElement("a");P.href=M,P.download=`ci360-daily-planner-${s.selectedDate}.png`,document.body.appendChild(P),P.click(),P.remove(),y("Daily Planner image exported! 🖼️")}catch(M){y("Failed to export image: "+M.message,!0)}}function ze(m,_,D,a,o,C){m.beginPath(),m.moveTo(_+C,D),m.lineTo(_+a-C,D),m.quadraticCurveTo(_+a,D,_+a,D+C),m.lineTo(_+a,D+o-C),m.quadraticCurveTo(_+a,D+o,_+a-C,D+o),m.lineTo(_+C,D+o),m.quadraticCurveTo(_,D+o,_,D+o-C),m.lineTo(_,D+C),m.quadraticCurveTo(_,D,_+C,D),m.closePath()}function de(){const m=aa(s.selectedDate,l.weekStartsOn),_=kt(m[0]),D=kt(m[6]);at();const a=s.tasks.filter(q=>{if(q.isDeleted===!0)return!1;const F=q.dateStr||(q.dueDate?new Date(q.dueDate).toISOString().slice(0,10):"");return m.includes(F)}),o=a.length,C=a.filter(q=>q.status==="Completed").length,I=o>0?Math.round(C/o*100):0,Q=window.open("","_blank");if(!Q){y("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const K=`
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
            <div class="kpi-num">${o}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${C}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${o-C}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${I}%</div>
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
            ${m.map(q=>{const F=$(q);return F.length===0?`<tr><td><strong>${gt(q)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:F.map(W=>`
                <tr>
                  <td><strong>${gt(q)}</strong></td>
                  <td>${v(W.title)}</td>
                  <td><span class="badge badge-${(W.priority||"medium").toLowerCase().slice(0,3)}">${W.priority||"Medium"}</span></td>
                  <td>${v(W.category||"General")}</td>
                  <td>${W.dueTime||W.startTime||"—"}</td>
                  <td class="${W.status==="Completed"?"done":""}">${W.status||"Pending"}</td>
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
    `;Q.document.write(K),Q.document.close(),y("Weekly PDF report generated for printing! 📄")}function ot(){const _=Gt(`
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
    `),D=()=>_.remove();_.querySelector("#btnBackupClose").onclick=D;const a=_.querySelector("#btnDownloadBackupJson");a.onclick=async()=>{a.disabled=!0,a.textContent="Generating backup...";try{const q=await Re("/tasks/backup"),F=new Blob([JSON.stringify(q,null,2)],{type:"application/json"}),W=URL.createObjectURL(F),k=document.createElement("a");k.href=W,k.download=`ci360-planner-backup-${at()}.json`,document.body.appendChild(k),k.click(),k.remove(),y("Planner backup downloaded successfully! 💾")}catch(q){y("Backup export failed: "+q.message,!0)}finally{a.disabled=!1,a.textContent="Download JSON Backup"}};const o=_.querySelector("#restoreFileInput"),C=_.querySelector("#restorePreviewArea"),I=_.querySelector("#restoreCountText"),Q=_.querySelector("#btnExecuteRestore");let K=null;o.onchange=q=>{const F=q.target.files[0];if(!F)return;const W=new FileReader;W.onload=k=>{try{const J=JSON.parse(k.target.result),te=Array.isArray(J.tasks)?J.tasks:Array.isArray(J)?J:null;if(!te||te.length===0){y("Invalid backup file: No tasks found",!0);return}K=te,C.style.display="block",I.textContent=`Valid backup: ${te.length} tasks ready to restore.`,Q.disabled=!1}catch(J){y("Error parsing JSON backup file: "+J.message,!0),C.style.display="none",Q.disabled=!0}},W.readAsText(F)},Q.onclick=async()=>{if(!K||K.length===0)return;Q.disabled=!0,Q.textContent="Restoring...";const q=_.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const F=await Ce("/tasks/restore",{tasks:K,mode:q});y(`Restored ${F.restoredCount} tasks! (${F.skippedCount} skipped) ✨`),D(),await L()}catch(F){y("Restore failed: "+F.message,!0),Q.disabled=!1,Q.textContent="Retry Restore"}}}function me(){const m=`
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
    `,_=Gt(m),D=()=>_.remove();_.querySelector("#btnSettingsClose").onclick=D,_.querySelector("#btnCancelSettings").onclick=D,_.querySelector("#settingsForm").onsubmit=a=>{a.preventDefault(),l.displayName=_.querySelector("#setDisplayName").value.trim()||"Daily Planner",l.weekStartsOn=Number(_.querySelector("#setWeekStart").value),l.defaultPriority=_.querySelector("#setDefaultPriority").value,l.density=_.querySelector("#setDensity").value,l.soundEnabled=_.querySelector("#setSound").checked,ja(l),y("Planner preferences saved! ⚙️"),D(),z()}}}function Ia(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
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
  `,document.head.appendChild(i)}function Aa(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function Da(i,t,e,d,b){const c={move:i,variations:b};return t&&(c.suffix=t),e&&(c.nag=e),d!==null&&(c.comment=d),c}function Ea(...i){const[t,...e]=i;let d=t;for(const b of e)b!==null&&(d.variations=[b,...b.variations],b.variations=[],d=b);return t}function Pa(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const d=e.variations[0];if(!d){e.comment=t.marker.comment;break}e=d}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function La(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function At(i,t,e,d){var b=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(b,At.prototype),b.expected=t,b.found=e,b.location=d,b.name="SyntaxError",b}La(At,Error);function ia(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}At.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,d;for(d=0;d<i.length;d++)if(i[d].source===this.location.source){e=i[d].text.split(/\r\n|\n|\r/g);break}var b=this.location.start,c=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(b):b,l=this.location.source+":"+c.line+":"+c.column;if(e){var s=this.location.end,L=ia("",c.line.toString().length," "),N=e[b.line-1],$=b.line===s.line?s.column:N.length+1,j=$-b.column||1;t+=`
 --> `+l+`
`+L+` |
`+c.line+" | "+N+`
`+L+" | "+ia("",b.column-1," ")+ia("",j,"^")}else t+=`
 at `+l}return t};At.buildMessage=function(i,t){var e={literal:function(N){return'"'+b(N.text)+'"'},class:function(N){var $=N.parts.map(function(j){return Array.isArray(j)?c(j[0])+"-"+c(j[1]):c(j)});return"["+(N.inverted?"^":"")+$.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(N){return N.description}};function d(N){return N.charCodeAt(0).toString(16).toUpperCase()}function b(N){return N.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function($){return"\\x0"+d($)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function($){return"\\x"+d($)})}function c(N){return N.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function($){return"\\x0"+d($)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function($){return"\\x"+d($)})}function l(N){return e[N.type](N)}function s(N){var $=N.map(l),j,R;if($.sort(),$.length>0){for(j=1,R=1;j<$.length;j++)$[j-1]!==$[j]&&($[R]=$[j],R++);$.length=R}switch($.length){case 1:return $[0];case 2:return $[0]+" or "+$[1];default:return $.slice(0,-1).join(", ")+", or "+$[$.length-1]}}function L(N){return N?'"'+b(N)+'"':"end of input"}return"Expected "+s(i)+" but "+L(t)+" found."};function Ma(i,t){t=t!==void 0?t:{};var e={},d=t.grammarSource,b={pgn:Pt},c=Pt,l="[",s='"',L="]",N=".",$="O-O-O",j="O-O",R="0-0-0",z="0-0",pe="$",ve="{",Ke="}",et=";",rt="(",Ct=")",it="1-0",Pe="0-1",nt="1/2-1/2",pt="*",Oe=/^[a-zA-Z]/,dt=/^[^"]/,qe=/^[0-9]/,ze=/^[.]/,de=/^[a-zA-Z1-8\-=]/,ot=/^[+#]/,me=/^[!?]/,m=/^[^}]/,_=/^[^\r\n]/,D=/^[ \t\r\n]/,a=Je("tag pair"),o=Me("[",!1),C=Me('"',!1),I=Me("]",!1),Q=Je("tag name"),K=Ze([["a","z"],["A","Z"]],!1,!1),q=Je("tag value"),F=Ze(['"'],!0,!1),W=Je("move number"),k=Ze([["0","9"]],!1,!1),J=Me(".",!1),te=Ze(["."],!1,!1),ae=Je("standard algebraic notation"),ie=Me("O-O-O",!1),Y=Me("O-O",!1),p=Me("0-0-0",!1),f=Me("0-0",!1),r=Ze([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),n=Ze(["+","#"],!1,!1),h=Je("suffix annotation"),E=Ze(["!","?"],!1,!1),S=Je("NAG"),U=Me("$",!1),re=Je("brace comment"),M=Me("{",!1),P=Ze(["}"],!0,!1),G=Me("}",!1),_e=Je("rest of line comment"),fe=Me(";",!1),se=Ze(["\r",`
`],!0,!1),ue=Je("variation"),H=Me("(",!1),le=Me(")",!1),be=Je("game termination marker"),ge=Me("1-0",!1),xe=Me("0-1",!1),Ee=Me("1/2-1/2",!1),Be=Me("*",!1),Ge=Je("whitespace"),Le=Ze([" ","	","\r",`
`],!1,!1),ce=function(g,x){return Pa(g,x)},Te=function(g){return Object.fromEntries(g)},Ue=function(g,x){return[g,x]},Ne=function(g,x){return{root:g,marker:x}},Ae=function(g,x){return Ea(Aa(g),...x.flat())},Ie=function(g,x,w,V,ee){return Da(g,x,w,V,ee)},Se=function(g){return g},he=function(g){return g.replace(/[\r\n]+/g," ")},je=function(g){return g.trim()},A=function(g){return g},B=function(g,x){return{result:g,comment:x}},u=t.peg$currPos|0,De=[{line:1,column:1}],ye=u,st=t.peg$maxFailExpected||[],O=t.peg$silentFails|0,ht;if(t.startRule){if(!(t.startRule in b))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');c=b[t.startRule]}function Me(g,x){return{type:"literal",text:g,ignoreCase:x}}function Ze(g,x,w){return{type:"class",parts:g,inverted:x,ignoreCase:w}}function _t(){return{type:"end"}}function Je(g){return{type:"other",description:g}}function Dt(g){var x=De[g],w;if(x)return x;if(g>=De.length)w=De.length-1;else for(w=g;!De[--w];);for(x=De[w],x={line:x.line,column:x.column};w<g;)i.charCodeAt(w)===10?(x.line++,x.column=1):x.column++,w++;return De[g]=x,x}function Et(g,x,w){var V=Dt(g),ee=Dt(x),$e={source:d,start:{offset:g,line:V.line,column:V.column},end:{offset:x,line:ee.line,column:ee.column}};return $e}function X(g){u<ye||(u>ye&&(ye=u,st=[]),st.push(g))}function Bt(g,x,w){return new At(At.buildMessage(g,x),g,x,w)}function Pt(){var g,x,w;return g=u,x=Zt(),w=ea(),g=ce(x,w),g}function Zt(){var g,x,w;for(g=u,x=[],w=vt();w!==e;)x.push(w),w=vt();return w=we(),g=Te(x),g}function vt(){var g,x,w,V,ee,$e,ct;return O++,g=u,we(),i.charCodeAt(u)===91?(x=l,u++):(x=e,O===0&&X(o)),x!==e?(we(),w=Nt(),w!==e?(we(),i.charCodeAt(u)===34?(V=s,u++):(V=e,O===0&&X(C)),V!==e?(ee=Ft(),i.charCodeAt(u)===34?($e=s,u++):($e=e,O===0&&X(C)),$e!==e?(we(),i.charCodeAt(u)===93?(ct=L,u++):(ct=e,O===0&&X(I)),ct!==e?g=Ue(w,ee):(u=g,g=e)):(u=g,g=e)):(u=g,g=e)):(u=g,g=e)):(u=g,g=e),O--,g===e&&O===0&&X(a),g}function Nt(){var g,x,w;if(O++,g=u,x=[],w=i.charAt(u),Oe.test(w)?u++:(w=e,O===0&&X(K)),w!==e)for(;w!==e;)x.push(w),w=i.charAt(u),Oe.test(w)?u++:(w=e,O===0&&X(K));else x=e;return x!==e?g=i.substring(g,u):g=x,O--,g===e&&(x=e,O===0&&X(Q)),g}function Ft(){var g,x,w;for(O++,g=u,x=[],w=i.charAt(u),dt.test(w)?u++:(w=e,O===0&&X(F));w!==e;)x.push(w),w=i.charAt(u),dt.test(w)?u++:(w=e,O===0&&X(F));return g=i.substring(g,u),O--,x=e,O===0&&X(q),g}function ea(){var g,x,w;return g=u,x=Ot(),we(),w=ke(),w===e&&(w=null),we(),g=Ne(x,w),g}function Ot(){var g,x,w,V;for(g=u,x=Ut(),x===e&&(x=null),w=[],V=Lt();V!==e;)w.push(V),V=Lt();return g=Ae(x,w),g}function Lt(){var g,x,w,V,ee,$e,ct,It;if(g=u,we(),jt(),we(),x=Tt(),x!==e){for(w=ut(),w===e&&(w=null),V=[],ee=xt();ee!==e;)V.push(ee),ee=xt();for(ee=we(),$e=Ut(),$e===e&&($e=null),ct=[],It=Z();It!==e;)ct.push(It),It=Z();g=Ie(x,w,V,$e,ct)}else u=g,g=e;return g}function jt(){var g,x,w,V,ee,$e;for(O++,g=u,x=[],w=i.charAt(u),qe.test(w)?u++:(w=e,O===0&&X(k));w!==e;)x.push(w),w=i.charAt(u),qe.test(w)?u++:(w=e,O===0&&X(k));if(i.charCodeAt(u)===46?(w=N,u++):(w=e,O===0&&X(J)),w!==e){for(V=we(),ee=[],$e=i.charAt(u),ze.test($e)?u++:($e=e,O===0&&X(te));$e!==e;)ee.push($e),$e=i.charAt(u),ze.test($e)?u++:($e=e,O===0&&X(te));x=[x,w,V,ee],g=x}else u=g,g=e;return O--,g===e&&(x=e,O===0&&X(W)),g}function Tt(){var g,x,w,V,ee,$e;if(O++,g=u,x=u,i.substr(u,5)===$?(w=$,u+=5):(w=e,O===0&&X(ie)),w===e&&(i.substr(u,3)===j?(w=j,u+=3):(w=e,O===0&&X(Y)),w===e&&(i.substr(u,5)===R?(w=R,u+=5):(w=e,O===0&&X(p)),w===e&&(i.substr(u,3)===z?(w=z,u+=3):(w=e,O===0&&X(f)),w===e))))if(w=u,V=i.charAt(u),Oe.test(V)?u++:(V=e,O===0&&X(K)),V!==e){if(ee=[],$e=i.charAt(u),de.test($e)?u++:($e=e,O===0&&X(r)),$e!==e)for(;$e!==e;)ee.push($e),$e=i.charAt(u),de.test($e)?u++:($e=e,O===0&&X(r));else ee=e;ee!==e?(V=[V,ee],w=V):(u=w,w=e)}else u=w,w=e;return w!==e?(V=i.charAt(u),ot.test(V)?u++:(V=e,O===0&&X(n)),V===e&&(V=null),w=[w,V],x=w):(u=x,x=e),x!==e?g=i.substring(g,u):g=x,O--,g===e&&(x=e,O===0&&X(ae)),g}function ut(){var g,x,w;for(O++,g=u,x=[],w=i.charAt(u),me.test(w)?u++:(w=e,O===0&&X(E));w!==e;)x.push(w),x.length>=2?w=e:(w=i.charAt(u),me.test(w)?u++:(w=e,O===0&&X(E)));return x.length<1?(u=g,g=e):g=x,O--,g===e&&(x=e,O===0&&X(h)),g}function xt(){var g,x,w,V,ee;if(O++,g=u,we(),i.charCodeAt(u)===36?(x=pe,u++):(x=e,O===0&&X(U)),x!==e){if(w=u,V=[],ee=i.charAt(u),qe.test(ee)?u++:(ee=e,O===0&&X(k)),ee!==e)for(;ee!==e;)V.push(ee),ee=i.charAt(u),qe.test(ee)?u++:(ee=e,O===0&&X(k));else V=e;V!==e?w=i.substring(w,u):w=V,w!==e?g=Se(w):(u=g,g=e)}else u=g,g=e;return O--,g===e&&O===0&&X(S),g}function Ut(){var g;return g=Ht(),g===e&&(g=T()),g}function Ht(){var g,x,w,V,ee;if(O++,g=u,i.charCodeAt(u)===123?(x=ve,u++):(x=e,O===0&&X(M)),x!==e){for(w=u,V=[],ee=i.charAt(u),m.test(ee)?u++:(ee=e,O===0&&X(P));ee!==e;)V.push(ee),ee=i.charAt(u),m.test(ee)?u++:(ee=e,O===0&&X(P));w=i.substring(w,u),i.charCodeAt(u)===125?(V=Ke,u++):(V=e,O===0&&X(G)),V!==e?g=he(w):(u=g,g=e)}else u=g,g=e;return O--,g===e&&(x=e,O===0&&X(re)),g}function T(){var g,x,w,V,ee;if(O++,g=u,i.charCodeAt(u)===59?(x=et,u++):(x=e,O===0&&X(fe)),x!==e){for(w=u,V=[],ee=i.charAt(u),_.test(ee)?u++:(ee=e,O===0&&X(se));ee!==e;)V.push(ee),ee=i.charAt(u),_.test(ee)?u++:(ee=e,O===0&&X(se));w=i.substring(w,u),g=je(w)}else u=g,g=e;return O--,g===e&&(x=e,O===0&&X(_e)),g}function Z(){var g,x,w,V;return O++,g=u,we(),i.charCodeAt(u)===40?(x=rt,u++):(x=e,O===0&&X(H)),x!==e?(w=Ot(),w!==e?(we(),i.charCodeAt(u)===41?(V=Ct,u++):(V=e,O===0&&X(le)),V!==e?g=A(w):(u=g,g=e)):(u=g,g=e)):(u=g,g=e),O--,g===e&&O===0&&X(ue),g}function ke(){var g,x,w;return O++,g=u,i.substr(u,3)===it?(x=it,u+=3):(x=e,O===0&&X(ge)),x===e&&(i.substr(u,3)===Pe?(x=Pe,u+=3):(x=e,O===0&&X(xe)),x===e&&(i.substr(u,7)===nt?(x=nt,u+=7):(x=e,O===0&&X(Ee)),x===e&&(i.charCodeAt(u)===42?(x=pt,u++):(x=e,O===0&&X(Be))))),x!==e?(we(),w=Ut(),w===e&&(w=null),g=B(x,w)):(u=g,g=e),O--,g===e&&(x=e,O===0&&X(be)),g}function we(){var g,x;for(O++,g=[],x=i.charAt(u),D.test(x)?u++:(x=e,O===0&&X(Le));x!==e;)g.push(x),x=i.charAt(u),D.test(x)?u++:(x=e,O===0&&X(Le));return O--,x=e,O===0&&X(Ge),g}if(ht=c(),t.peg$library)return{peg$result:ht,peg$currPos:u,peg$FAILED:e,peg$maxFailExpected:st,peg$maxFailPos:ye};if(ht!==e&&u===i.length)return ht;throw ht!==e&&u<i.length&&X(_t()),Bt(st,ye<i.length?i.charAt(ye):null,ye<i.length?Et(ye,ye+1):Et(ye,ye))}/**
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
 */const Jt=0xffffffffffffffffn;function na(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function ha(i,t){return i*t&Jt}function qa(i){return function(){let t=BigInt(i&Jt),e=BigInt(i>>64n&Jt);const d=ha(na(ha(t,5n),7n),9n);return e^=t,t=(na(t,24n)^e^e<<16n)&Jt,e=na(e,37n),i=e<<64n|t,d}}const Xt=qa(0xa187eb39cdcaed8f31c4b365b102e01en),za=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Xt()))),Ra=Array.from({length:8},()=>Xt()),Ba=Array.from({length:16},()=>Xt()),ra=Xt(),Ye="w",tt="b",Fe="p",pa="n",Qt="b",zt="r",mt="q",He="k",oa="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Kt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:d,piece:b,from:c,to:l,flags:s,captured:L,promotion:N}=e,$=We(c),j=We(l);this.color=d,this.piece=b,this.from=$,this.to=j,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=$+j,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const R in oe)oe[R]&s&&(this.flags+=wt[R]);L&&(this.captured=L),N&&(this.promotion=N,this.lan+=N)}isCapture(){return this.flags.indexOf(wt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(wt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(wt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(wt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(wt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(wt.BIG_PAWN)>-1}}const Ve=-1,wt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},oe={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ua={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Na={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Fa={...ua,...Na},ne={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},sa={b:[16,32,17,15],w:[-16,-32,-17,-15]},va={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Oa=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ua=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ha={p:1,n:2,b:4,r:8,q:16,k:32},Ga="pnbrqkPNBRQK",xa=[pa,Qt,zt,mt],Wa=7,Ka=6,Va=1,Ya=0,Vt={[He]:oe.KSIDE_CASTLE,[mt]:oe.QSIDE_CASTLE},bt={w:[{square:ne.a1,flag:oe.QSIDE_CASTLE},{square:ne.h1,flag:oe.KSIDE_CASTLE}],b:[{square:ne.a8,flag:oe.QSIDE_CASTLE},{square:ne.h8,flag:oe.KSIDE_CASTLE}]},Ja={b:Va,w:Ka},la="--";function St(i){return i>>4}function Rt(i){return i&15}function $a(i){return"0123456789".indexOf(i)!==-1}function We(i){const t=Rt(i),e=St(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function Mt(i){return i===Ye?tt:Ye}function Qa(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const d=parseInt(t[4],10);if(isNaN(d)||d<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const b=t[0].split("/");if(b.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let l=0;l<b.length;l++){let s=0,L=!1;for(let N=0;N<b[l].length;N++)if($a(b[l][N])){if(L)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};s+=parseInt(b[l][N],10),L=!0}else{if(!/^[prnbqkPRNBQK]$/.test(b[l][N]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};s+=1,L=!1}if(s!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const c=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:l,regex:s}of c){if(!s.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${l} king`};if((t[0].match(s)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${l} kings`}}return Array.from(b[0]+b[7]).some(l=>l.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Xa(i,t){const e=i.from,d=i.to,b=i.piece;let c=0,l=0,s=0;for(let L=0,N=t.length;L<N;L++){const $=t[L].from,j=t[L].to,R=t[L].piece;b===R&&e!==$&&d===j&&(c++,St(e)===St($)&&l++,Rt(e)===Rt($)&&s++)}return c>0?l>0&&s>0?We(e):s>0?We(e).charAt(1):We(e).charAt(0):""}function ft(i,t,e,d,b,c=void 0,l=oe.NORMAL){const s=St(d);if(b===Fe&&(s===Wa||s===Ya))for(let L=0;L<xa.length;L++){const N=xa[L];i.push({color:t,from:e,to:d,piece:b,captured:c,promotion:N,flags:l|oe.PROMOTION})}else i.push({color:t,from:e,to:d,piece:b,captured:c,flags:l})}function ya(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:Fe:(t=t.toLowerCase(),t==="o"?He:t)}function da(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ka{_board=new Array(128);_turn=Ye;_header={};_kings={w:Ve,b:Ve};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=oa,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Ve,b:Ve},this._turn=Ye,this._castling={w:0,b:0},this._epSquare=Ve,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Fa},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:d=!1}={}){let b=t.split(/\s+/);if(b.length>=2&&b.length<6){const s=["-","-","0","1"];t=b.concat(s.slice(-(6-b.length))).join(" ")}if(b=t.split(/\s+/),!e){const{ok:s,error:L}=Qa(t);if(!s)throw new Error(L)}const c=b[0];let l=0;this.clear({preserveHeaders:d});for(let s=0;s<c.length;s++){const L=c.charAt(s);if(L==="/")l+=8;else if($a(L))l+=parseInt(L,10);else{const N=L<"a"?Ye:tt;this._put({type:L.toLowerCase(),color:N},We(l)),l++}}this._turn=b[1],b[2].indexOf("K")>-1&&(this._castling.w|=oe.KSIDE_CASTLE),b[2].indexOf("Q")>-1&&(this._castling.w|=oe.QSIDE_CASTLE),b[2].indexOf("k")>-1&&(this._castling.b|=oe.KSIDE_CASTLE),b[2].indexOf("q")>-1&&(this._castling.b|=oe.QSIDE_CASTLE),this._epSquare=b[3]==="-"?Ve:ne[b[3]],this._halfMoves=parseInt(b[4],10),this._moveNumber=parseInt(b[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,d="";for(let l=ne.a8;l<=ne.h1;l++){if(this._board[l]){e>0&&(d+=e,e=0);const{color:s,type:L}=this._board[l];d+=s===Ye?L.toUpperCase():L.toLowerCase()}else e++;l+1&136&&(e>0&&(d+=e),l!==ne.h1&&(d+="/"),e=0,l+=8)}let b="";this._castling[Ye]&oe.KSIDE_CASTLE&&(b+="K"),this._castling[Ye]&oe.QSIDE_CASTLE&&(b+="Q"),this._castling[tt]&oe.KSIDE_CASTLE&&(b+="k"),this._castling[tt]&oe.QSIDE_CASTLE&&(b+="q"),b=b||"-";let c="-";if(this._epSquare!==Ve)if(t)c=We(this._epSquare);else{const l=this._epSquare+(this._turn===Ye?16:-16),s=[l+1,l-1];for(const L of s){if(L&136)continue;const N=this._turn;if(this._board[L]?.color===N&&this._board[L]?.type===Fe){this._makeMove({color:N,from:L,to:this._epSquare,piece:Fe,captured:Fe,flags:oe.EP_CAPTURE});const $=!this._isKingAttacked(N);if(this._undoMove(),$){c=We(this._epSquare);break}}}}return[d,this._turn,b,c,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:d}=this._board[t],b={w:0,b:1}[e],c={p:0,n:1,b:2,r:3,q:4,k:5}[d];return za[b][c][t]}_epKey(){return this._epSquare===Ve?0n:Ra[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Ba[t]}_computeHash(){let t=0n;for(let e=ne.a8;e<=ne.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=ra),t}_updateSetup(t){this._history.length>0||(t!==oa?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(oa)}get(t){return this._board[ne[t]]}findPiece(t){const e=[];for(let d=ne.a8;d<=ne.h1;d++){if(d&136){d+=7;continue}!this._board[d]||this._board[d]?.color!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(We(d))}return e}put({type:t,color:e},d){return this._put({type:t,color:e},d)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},d){if(Ga.indexOf(t.toLowerCase())===-1||!(d in ne))return!1;const b=ne[d];if(t==He&&!(this._kings[e]==Ve||this._kings[e]==b))return!1;const c=this._board[b];return c&&c.type===He&&(this._kings[c.color]=Ve),this._set(b,{type:t,color:e}),t===He&&(this._kings[e]=b),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(ne[t]),e&&e.type===He&&(this._kings[e.color]=Ve),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[ne.e1]?.type===He&&this._board[ne.e1]?.color===Ye,e=this._board[ne.e8]?.type===He&&this._board[ne.e8]?.color===tt;(!t||this._board[ne.a1]?.type!==zt||this._board[ne.a1]?.color!==Ye)&&(this._castling.w&=-65),(!t||this._board[ne.h1]?.type!==zt||this._board[ne.h1]?.color!==Ye)&&(this._castling.w&=-33),(!e||this._board[ne.a8]?.type!==zt||this._board[ne.a8]?.color!==tt)&&(this._castling.b&=-65),(!e||this._board[ne.h8]?.type!==zt||this._board[ne.h8]?.color!==tt)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Ve)return;const t=this._epSquare+(this._turn===Ye?-16:16),e=this._epSquare+(this._turn===Ye?16:-16),d=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==Mt(this._turn)||this._board[e]?.type!==Fe){this._hash^=this._epKey(),this._epSquare=Ve;return}const b=c=>!(c&136)&&this._board[c]?.color===this._turn&&this._board[c]?.type===Fe;d.some(b)||(this._hash^=this._epKey(),this._epSquare=Ve)}_attacked(t,e,d){const b=[];for(let c=ne.a8;c<=ne.h1;c++){if(c&136){c+=7;continue}if(this._board[c]===void 0||this._board[c].color!==t)continue;const l=this._board[c],s=c-e;if(s===0)continue;const L=s+119;if(Oa[L]&Ha[l.type]){if(l.type===Fe){if(s>0&&l.color===Ye||s<=0&&l.color===tt)if(d)b.push(We(c));else return!0;continue}if(l.type==="n"||l.type==="k")if(d){b.push(We(c));continue}else return!0;const N=Ua[L];let $=c+N,j=!1;for(;$!==e;){if(this._board[$]!=null){j=!0;break}$+=N}if(!j)if(d){b.push(We(c));continue}else return!0}}return d?b:!1}attackers(t,e){return e?this._attacked(e,ne[t],!0):this._attacked(this._turn,ne[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(Mt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,ne[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let d=0,b=0;for(let c=ne.a8;c<=ne.h1;c++){if(b=(b+1)%2,c&136){c+=7;continue}const l=this._board[c];l&&(t[l.type]=l.type in t?t[l.type]+1:1,l.type===Qt&&e.push(b),d++)}if(d===2)return!0;if(d===3&&(t[Qt]===1||t[pa]===1))return!0;if(d===t[Qt]+2){let c=0;const l=e.length;for(let s=0;s<l;s++)c+=e[s];if(c===0||c===l)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:d=void 0}={}){const b=this._moves({square:e,piece:d});return t?b.map(c=>new Kt(this,c)):b.map(c=>this._moveToSan(c,b))}_moves({legal:t=!0,piece:e=void 0,square:d=void 0}={}){const b=d?d.toLowerCase():void 0,c=e?.toLowerCase(),l=[],s=this._turn,L=Mt(s);let N=ne.a8,$=ne.h1,j=!1;if(b)if(b in ne)N=$=ne[b],j=!0;else return[];for(let z=N;z<=$;z++){if(z&136){z+=7;continue}if(!this._board[z]||this._board[z].color===L)continue;const{type:pe}=this._board[z];let ve;if(pe===Fe){if(c&&c!==pe)continue;ve=z+sa[s][0],this._board[ve]||(ft(l,s,z,ve,Fe),ve=z+sa[s][1],Ja[s]===St(z)&&!this._board[ve]&&ft(l,s,z,ve,Fe,void 0,oe.BIG_PAWN));for(let Ke=2;Ke<4;Ke++)ve=z+sa[s][Ke],!(ve&136)&&(this._board[ve]?.color===L?ft(l,s,z,ve,Fe,this._board[ve].type,oe.CAPTURE):ve===this._epSquare&&ft(l,s,z,ve,Fe,Fe,oe.EP_CAPTURE))}else{if(c&&c!==pe)continue;for(let Ke=0,et=va[pe].length;Ke<et;Ke++){const rt=va[pe][Ke];for(ve=z;ve+=rt,!(ve&136);){if(!this._board[ve])ft(l,s,z,ve,pe);else{if(this._board[ve].color===s)break;ft(l,s,z,ve,pe,this._board[ve].type,oe.CAPTURE);break}if(pe===pa||pe===He)break}}}}if((c===void 0||c===He)&&(!j||$===this._kings[s])){if(this._castling[s]&oe.KSIDE_CASTLE){const z=this._kings[s],pe=z+2;!this._board[z+1]&&!this._board[pe]&&!this._attacked(L,this._kings[s])&&!this._attacked(L,z+1)&&!this._attacked(L,pe)&&ft(l,s,this._kings[s],pe,He,void 0,oe.KSIDE_CASTLE)}if(this._castling[s]&oe.QSIDE_CASTLE){const z=this._kings[s],pe=z-2;!this._board[z-1]&&!this._board[z-2]&&!this._board[z-3]&&!this._attacked(L,this._kings[s])&&!this._attacked(L,z-1)&&!this._attacked(L,pe)&&ft(l,s,this._kings[s],pe,He,void 0,oe.QSIDE_CASTLE)}}if(!t||this._kings[s]===-1)return l;const R=[];for(let z=0,pe=l.length;z<pe;z++)this._makeMove(l[z]),this._isKingAttacked(s)||R.push(l[z]),this._undoMove();return R}move(t,{strict:e=!1}={}){let d=null;if(typeof t=="string")d=this._moveFromSan(t,e);else if(t===null)d=this._moveFromSan(la,e);else if(typeof t=="object"){const c=this._moves();for(let l=0,s=c.length;l<s;l++)if(t.from===We(c[l].from)&&t.to===We(c[l].to)&&(!("promotion"in c[l])||t.promotion===c[l].promotion)){d=c[l];break}}if(!d)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&d.flags&oe.NULL_MOVE)throw new Error("Null move not allowed when in check");const b=new Kt(this,d);return this._makeMove(d),this._incPositionCount(),b}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,d=Mt(e);if(this._push(t),t.flags&oe.NULL_MOVE){e===tt&&this._moveNumber++,this._halfMoves++,this._turn=d,this._epSquare=Ve;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&oe.EP_CAPTURE&&(this._turn===tt?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===He){if(this._kings[e]=t.to,t.flags&oe.KSIDE_CASTLE){const b=t.to-1,c=t.to+1;this._movePiece(c,b)}else if(t.flags&oe.QSIDE_CASTLE){const b=t.to+1,c=t.to-2;this._movePiece(c,b)}this._castling[e]=0}if(this._castling[e]){for(let b=0,c=bt[e].length;b<c;b++)if(t.from===bt[e][b].square&&this._castling[e]&bt[e][b].flag){this._castling[e]^=bt[e][b].flag;break}}if(this._castling[d]){for(let b=0,c=bt[d].length;b<c;b++)if(t.to===bt[d][b].square&&this._castling[d]&bt[d][b].flag){this._castling[d]^=bt[d][b].flag;break}}if(this._hash^=this._castlingKey(),t.flags&oe.BIG_PAWN){let b;e===tt?b=t.to-16:b=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===Fe&&this._board[t.to-1]?.color===d||!(t.to+1&136)&&this._board[t.to+1]?.type===Fe&&this._board[t.to+1]?.color===d?(this._epSquare=b,this._hash^=this._epKey()):this._epSquare=Ve}else this._epSquare=Ve;t.piece===Fe?this._halfMoves=0:t.flags&(oe.CAPTURE|oe.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===tt&&this._moveNumber++,this._turn=d,this._hash^=ra}undo(){const t=this._hash,e=this._undoMove();if(e){const d=new Kt(this,e);return this._decPositionCount(t),d}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=ra;const d=this._turn,b=Mt(d);if(e.flags&oe.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:d})),e.captured)if(e.flags&oe.EP_CAPTURE){let c;d===tt?c=e.to-16:c=e.to+16,this._set(c,{type:Fe,color:b})}else this._set(e.to,{type:e.captured,color:b});if(e.flags&(oe.KSIDE_CASTLE|oe.QSIDE_CASTLE)){let c,l;e.flags&oe.KSIDE_CASTLE?(c=e.to+1,l=e.to-1):(c=e.to-2,l=e.to+1),this._movePiece(l,c)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const d=[];let b=!1;for(const R in this._header)this._header[R]&&d.push(`[${R} "${this._header[R]}"]`+t),b=!0;b&&this._history.length&&d.push(t);const c=R=>{const z=this._comments[this.fen()];if(typeof z<"u"){const pe=R.length>0?" ":"";R=`${R}${pe}{${z}}`}return R},l=[];for(;this._history.length>0;)l.push(this._undoMove());const s=[];let L="";for(l.length===0&&s.push(c(""));l.length>0;){L=c(L);const R=l.pop();if(!R)break;if(!this._history.length&&R.color==="b"){const z=`${this._moveNumber}. ...`;L=L?`${L} ${z}`:z}else R.color==="w"&&(L.length&&s.push(L),L=this._moveNumber+".");L=L+" "+this._moveToSan(R,this._moves({legal:!0})),this._makeMove(R)}if(L.length&&s.push(c(L)),s.push(this._header.Result||"*"),e===0)return d.join("")+s.join(" ");const N=function(){return d.length>0&&d[d.length-1]===" "?(d.pop(),!0):!1},$=function(R,z){for(const pe of z.split(" "))if(pe){if(R+pe.length>e){for(;N();)R--;d.push(t),R=0}d.push(pe),R+=pe.length,d.push(" "),R++}return N()&&R--,R};let j=0;for(let R=0;R<s.length;R++){if(j+s[R].length>e&&s[R].includes("{")){j=$(j,s[R]);continue}j+s[R].length>e&&R!==0?(d[d.length-1]===" "&&d.pop(),d.push(t),j=0):R!==0&&(d.push(" "),j++),d.push(s[R]),j+=s[R].length}return d.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ua[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ua[t]||null,!0):!1}getHeaders(){const t={};for(const[e,d]of Object.entries(this._header))d!==null&&(t[e]=d);return t}loadPgn(t,{strict:e=!1,newlineChar:d=`\r?
`}={}){d!==`\r?
`&&(t=t.replace(new RegExp(d,"g"),`
`));const b=Ma(t);this.reset();const c=b.headers;let l="";for(const N in c)N.toLowerCase()==="fen"&&(l=c[N]),this.header(N,c[N]);if(!e)l&&this.load(l,{preserveHeaders:!0});else if(c.SetUp==="1"){if(!("FEN"in c))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(c.FEN,{preserveHeaders:!0})}let s=b.root;for(;s;){if(s.move){const N=this._moveFromSan(s.move,e);if(N==null)throw new Error(`Invalid move in PGN: ${s.move}`);this._makeMove(N),this._incPositionCount()}s.comment!==void 0&&(this._comments[this.fen()]=s.comment),s=s.variations[0]}const L=b.result;L&&Object.keys(this._header).length&&this._header.Result!==L&&this.setHeader("Result",L)}_moveToSan(t,e){let d="";if(t.flags&oe.KSIDE_CASTLE)d="O-O";else if(t.flags&oe.QSIDE_CASTLE)d="O-O-O";else{if(t.flags&oe.NULL_MOVE)return la;if(t.piece!==Fe){const b=Xa(t,e);d+=t.piece.toUpperCase()+b}t.flags&(oe.CAPTURE|oe.EP_CAPTURE)&&(t.piece===Fe&&(d+=We(t.from)[0]),d+="x"),d+=We(t.to),t.promotion&&(d+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?d+="#":d+="+"),this._undoMove(),d}_moveFromSan(t,e=!1){let d=da(t);if(e||(d==="0-0"?d="O-O":d==="0-0-0"&&(d="O-O-O")),d==la)return{color:this._turn,from:0,to:0,piece:"k",flags:oe.NULL_MOVE};let b=ya(d),c=this._moves({legal:!0,piece:b});for(let R=0,z=c.length;R<z;R++)if(d===da(this._moveToSan(c[R],c)))return c[R];if(e)return null;let l,s,L,N,$,j=!1;if(s=d.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),s?(l=s[1],L=s[2],N=s[3],$=s[4],L.length==1&&(j=!0)):(s=d.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),s&&(l=s[1],L=s[2],N=s[3],$=s[4],L.length==1&&(j=!0))),b=ya(d),c=this._moves({legal:!0,piece:l||b}),!N)return null;for(let R=0,z=c.length;R<z;R++)if(L){if((!l||l.toLowerCase()==c[R].piece)&&ne[L]==c[R].from&&ne[N]==c[R].to&&(!$||$.toLowerCase()==c[R].promotion))return c[R];if(j){const pe=We(c[R].from);if((!l||l.toLowerCase()==c[R].piece)&&ne[N]==c[R].to&&(L==pe[0]||L==pe[1])&&(!$||$.toLowerCase()==c[R].promotion))return c[R]}}else if(d===da(this._moveToSan(c[R],c)).replace("x",""))return c[R];return null}ascii(){let t=`   +------------------------+
`;for(let e=ne.a8;e<=ne.h1;e++){if(Rt(e)===0&&(t+=" "+"87654321"[St(e)]+" |"),this._board[e]){const d=this._board[e].type,c=this._board[e].color===Ye?d.toUpperCase():d.toLowerCase();t+=" "+c+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let d=0;const b=this._turn;for(let c=0,l=e.length;c<l;c++)this._makeMove(e[c]),this._isKingAttacked(b)||(t-1>0?d+=this.perft(t-1):d++),this._undoMove();return d}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let d=ne.a8;d<=ne.h1;d++)this._board[d]==null?e.push(null):e.push({square:We(d),type:this._board[d].type,color:this._board[d].color}),d+1&136&&(t.push(e),e=[],d+=8);return t}squareColor(t){if(t in ne){const e=ne[t];return(St(e)+Rt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],d=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const b=e.pop();if(!b)break;t?d.push(new Kt(this,b)):d.push(this._moveToSan(b,this._moves())),this._makeMove(b)}return d}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},d=b=>{b in this._comments&&(e[b]=this._comments[b])};for(;this._history.length>0;)t.push(this._undoMove());for(d(this.fen());;){const b=t.pop();if(!b)break;this._makeMove(b),d(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const b of[He,mt])e[b]!==void 0&&(e[b]?this._castling[t]|=Vt[b]:this._castling[t]&=~Vt[b]);this._updateCastlingRights();const d=this.getCastlingRights(t);return(e[He]===void 0||e[He]===d[He])&&(e[mt]===void 0||e[mt]===d[mt])}getCastlingRights(t){return{[He]:(this._castling[t]&Vt[He])!==0,[mt]:(this._castling[t]&Vt[mt])!==0}}moveNumber(){return this._moveNumber}}async function ai(i,t={}){const e=t.currentUser||{},d=t.userRole||e?.role||"employee";let b="chat",c=[],l=null,s=[],L=[],N=null,$=null,j=!1,R=null,z=null;i.innerHTML=`
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
  `,Za(),await it(),qe();const pe=i.querySelector("#tab-nav-chat"),ve=i.querySelector("#tab-nav-lounge"),Ke=i.querySelector("#bonding-chat-main-wrap"),et=i.querySelector("#bonding-lounge-main-wrap");pe?.addEventListener("click",()=>{b="chat",pe.classList.add("active"),ve.classList.remove("active"),Ke.style.display="grid",et.style.display="none",qe()}),ve?.addEventListener("click",async()=>{b="lounge_games",ve.classList.add("active"),pe.classList.remove("active"),Ke.style.display="none",et.style.display="block",await I()}),i.querySelector("#btn-top-new-chat")?.addEventListener("click",te),i.querySelector("#btn-top-new-group")?.addEventListener("click",ae),i.querySelector("#btn-top-challenge")?.addEventListener("click",()=>K());const rt=i.querySelector("#bonding-search-input");rt&&rt.addEventListener("input",p=>{const f=p.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(n=>{const h=n.textContent.toLowerCase();n.style.display=h.includes(f)?"flex":"none"})}),pt(),new MutationObserver((p,f)=>{document.body.contains(i)||($&&clearInterval($),z&&clearInterval(z),f.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function it(){try{const[p,f]=await Promise.all([Re("/bonding/channels").catch(()=>[]),Re("/bonding/colleagues").catch(()=>[])]);c=p,s=f,!l&&c.length>0&&(l=c.find(r=>r.name.includes("Lounge"))||c[0]),Oe(),l&&await Pe(l._id)}catch(p){console.error("Failed to load bonding data",p)}}async function Pe(p,f=!1){if(p)try{L=await Re(`/bonding/channels/${p}/messages`),f?o():C()}catch(r){console.error("Failed to load messages",r)}}let nt=0;function pt(){$&&clearInterval($),$=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval($);return}if(nt++,nt%2===0){const p=await Re("/bonding/channels").catch(()=>null);p&&JSON.stringify(p.map(f=>f._id+f.lastMessage?.sentAt))!==JSON.stringify(c.map(f=>f._id+f.lastMessage?.sentAt))&&(c=p,Oe())}b==="chat"&&l?await Pe(l._id,!0):b==="lounge_games"&&await I(!0)}catch{}},3e3)}function Oe(){const p=i.querySelector("#bonding-group-list"),f=i.querySelector("#bonding-direct-list");if(!p||!f)return;const r=c.filter(h=>h.type==="group"),n=c.filter(h=>h.type==="direct");if(r.length===0)p.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const h=e?._id||e?.id,E=d==="superadmin"||e?.role==="superadmin";p.innerHTML=r.map(S=>{const U=l&&l._id===S._id,M=S.createdBy&&S.createdBy.userId&&String(S.createdBy.userId)===String(h)||E;return`
          <div class="bonding-channel-item ${U?"active":""}" data-channel-id="${S._id}">
            <div class="bonding-channel-icon">${S.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(S.name)}</div>
              <div class="bonding-channel-preview">${v(S.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${M?`
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
        `}).join("")}n.length===0?f.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':f.innerHTML=n.map(h=>{const E=l&&l._id===h._id,S=h.displayName||h.name||"Colleague",U=S.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${E?"active":""}" data-channel-id="${h._id}">
            <div class="bonding-channel-avatar">${U}</div>
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
        `}).join(""),dt()}function dt(){const p=i.querySelectorAll(".bonding-channel-item");p.forEach(f=>{f.onclick=async r=>{if(r.target.closest(".bonding-channel-del-btn")||r.target.closest(".bonding-channel-leave-btn"))return;const n=f.dataset.channelId,h=c.find(E=>E._id===n);h&&(l=h,p.forEach(E=>E.classList.remove("active")),f.classList.add("active"),qe(),await Pe(h._id))}}),i.querySelectorAll(".bonding-channel-leave-btn").forEach(f=>{f.onclick=async r=>{r.stopPropagation();const n=f.dataset.channelId,E=c.find(S=>S._id===n)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${E}"?`))try{f.disabled=!0,await Ce(`/bonding/channels/${n}/leave`,{}),y(`You left "${E}"`,"info"),c=c.filter(S=>S._id!==n),l&&l._id===n&&(l=c.find(S=>S.type==="group")||c[0]||null,qe(),l&&await Pe(l._id)),Oe()}catch(S){y(S.message||"Failed to leave group","error"),f.disabled=!1}}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(f=>{f.onclick=async r=>{r.stopPropagation();const n=f.dataset.channelId,h=c.find(U=>U._id===n),E=h&&h.type==="direct",S=E?"this 1-on-1 chat":`the group "${h?.name||""}"`;if(confirm(`Are you sure you want to delete ${S}? All messages will be permanently removed.`))try{f.disabled=!0,await Xe(`/bonding/channels/${n}`),y(E?"1-on-1 chat deleted":"Group deleted","success"),c=c.filter(U=>U._id!==n),l&&l._id===n&&(l=c[0]||null,qe(),l&&await Pe(l._id)),Oe()}catch(U){y(U.message||"Failed to delete conversation","error"),f.disabled=!1}}}),i.querySelector("#btn-create-group")?.addEventListener("click",ae),i.querySelector("#btn-new-direct-chat")?.addEventListener("click",te)}function qe(){const p=i.querySelector("#bonding-chat-panel");if(!p)return;if(!l){p.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const f=v(l.displayName||l.name),r=(l.members||[]).length,n=l.type==="group",h=e?._id||e?.id,E=n?null:(l.members||[]).find(M=>M.userId?.toString()!==h?.toString()),S=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(h),U=d==="superadmin"||e?.role==="superadmin",re=S||U;p.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${n?l.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${f}</div>
            <div class="bonding-chat-sub">
              ${n?`<span>${r} members</span> · <span>${v(l.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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
              <span>👥</span> <span>Members (${r})</span>
            </button>
            ${re?`
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
        ${ze()}
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
    `,ot(E),me(E),m(),a()}function ze(){if(!L||L.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const p=e?._id||e?.id;return L.map(f=>{const r=f.sender&&f.sender.userId&&p&&f.sender.userId.toString()===p.toString();if(f.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${f._id}">
            <span>ℹ️</span> <span>${v(f.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${f._id}" title="Delete Message">&times;</button>
          </div>
        `;if(f.type==="challenge"&&f.challengeData){const S=f.challengeData;if(S.status==="declined"||S.status==="cancelled")return"";const U=S.gameTitle||"Game Challenge",re=S.gameType||"chess",M=re==="chess"?"♟️":re==="ludo"?"🎲":"❌",P=S.gameState?.invitationId,G=S.targetUserId?.toString(),_e=f.sender?.userId?.toString(),fe=p&&G===p.toString(),se=p&&_e===p.toString();return`
          <div class="bonding-msg-row ${r?"self":"other"}" data-msg-id="${f._id}">
            <div class="bonding-msg-avatar" title="${v(f.sender?.name||"Teammate")}">
              ${(f.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${v(f.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${Y(f.createdAt)}</span>
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
                  <div class="game-bubble-icon">${M}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${v(U)}</h4>
                    <p class="game-bubble-desc">${v(f.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${S.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':S.status==="active"||S.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${v(S.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${S.status==="pending"&&fe?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${P}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${P}" data-action="decline">
                        Decline
                      </button>
                    `:S.status==="pending"&&se?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${P}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${P}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${de(f)}
            </div>
          </div>
        `}const n=v(f.sender?.name||"Teammate"),h=Y(f.createdAt),E=de(f);return`
        <div class="bonding-msg-row ${r?"self":"other"}" data-msg-id="${f._id}">
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
      `}).join("")}function de(p){return`
      <div class="bonding-reactions-row">
        ${(p.reactions||[]).map(n=>{const h=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(n.users||[]).some(S=>S.toString()===h?.toString())?"active":""}" data-msg-id="${p._id}" data-emoji="${n.emoji}">
          <span>${n.emoji}</span> <span>${n.users?n.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${p._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function ot(p){const f=i.querySelector("#btn-chat-challenge");f&&(f.onclick=()=>{p?K(null,p.userId||p._id):K()});const r=i.querySelector("#btn-manage-members");r&&(r.onclick=W);const n=i.querySelector("#btn-delete-group");n&&(n.onclick=J);const h=i.querySelector("#btn-leave-group");h&&(h.onclick=k);const E=i.querySelector("#btn-delete-direct");E&&(E.onclick=async()=>{if(l&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{E.disabled=!0,await Xe(`/bonding/channels/${l._id}`),y("1-on-1 chat deleted successfully","success");const U=l._id;c=c.filter(re=>re._id!==U),l=c[0]||null,Oe(),qe(),l&&await Pe(l._id)}catch(U){y(U.message||"Could not delete 1-on-1 chat","error"),E.disabled=!1}});const S=i.querySelector("#btn-clear-chat");S&&(S.onclick=async()=>{if(l&&confirm("Are you sure you want to clear all messages in this conversation?"))try{S.disabled=!0,await Xe(`/bonding/channels/${l._id}/messages`),y("Chat messages cleared","success"),L=[],C()}catch(U){y(U.message||"Could not clear chat messages","error")}finally{S.disabled=!1}})}function me(p){const f=i.querySelector("#bonding-message-input"),r=i.querySelector("#btn-send-message"),n=i.querySelector("#btn-quick-emoji"),h=i.querySelector("#btn-input-challenge");f&&f.addEventListener("keydown",E=>{E.key==="Enter"&&!E.shiftKey&&(E.preventDefault(),_())}),r&&(r.onclick=_),h&&(h.onclick=()=>{p?K(null,p.userId||p._id):K()}),n&&(n.onclick=()=>{if(!f)return;const E=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],S=E[Math.floor(Math.random()*E.length)];f.value+=(f.value?" ":"")+S,f.focus()})}function m(){i.querySelectorAll(".btn-respond-invite").forEach(n=>{n.onclick=async()=>{const h=n.dataset.inviteId,E=n.dataset.action;await q(h,E)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(n=>{n.onclick=async()=>{const h=n.dataset.inviteId;try{n.disabled=!0;const E=await Re("/bonding/invitations"),S=(E.incoming||[]).concat(E.sent||[]).find(U=>U._id===h);S&&S.matchId?F(S.matchId):y("Match has not started yet or has expired","warning")}catch(E){y(E.message||"Could not load match","error")}finally{n.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(n=>{n.onclick=async h=>{h.stopPropagation();const E=n.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{n.disabled=!0,await Xe(`/bonding/messages/${E}`),L=L.filter(S=>S._id!==E),o(),y("Message deleted","success")}catch(S){y(S.message||"Failed to delete message","error"),n.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(n=>{n.onclick=async()=>{const h=n.dataset.msgId,E=n.dataset.emoji;await D(h,E)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(n=>{n.onclick=h=>{const E=n.dataset.msgId;ie(h.currentTarget,async S=>{await D(E,S)})}})}async function _(){const p=i.querySelector("#bonding-message-input");if(!p||!l||j)return;const f=p.value.trim();if(f)try{j=!0,p.value="";const r=await Ce(`/bonding/channels/${l._id}/messages`,{content:f,type:"text"});L.push(r),C(),a()}catch(r){y(r.message||"Failed to send message","error")}finally{j=!1,p.focus()}}async function D(p,f){try{const r=await Ce(`/bonding/messages/${p}/react`,{emoji:f}),n=L.find(h=>h._id===p);n&&(n.reactions=r,o())}catch(r){y(r.message||"Failed to react","error")}}function a(){const p=i.querySelector("#bonding-messages-feed");p&&(p.scrollTop=p.scrollHeight)}function o(){const p=i.querySelector("#bonding-messages-feed");if(!p)return;const f=p.scrollHeight-p.scrollTop<=p.clientHeight+80;p.innerHTML=ze(),m(),f&&a()}function C(){const p=i.querySelector("#bonding-messages-feed");p&&(p.innerHTML=ze(),m())}async function I(p=!1){const f=i.querySelector("#bonding-lounge-main-wrap");if(f){p||(f.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const r=await Re("/bonding/games/overview");N=r;const n=r.myStats||{},h=r.availableGames||[],E=r.incomingChallenges||[],S=r.sentChallenges||[],U=r.activeMatches||[],re=r.recentMatches||[],M=e?._id||e?.id;f.innerHTML=`
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
              ${h.map(P=>`
                <div class="lounge-game-card" data-game-id="${P.id}">
                  <div class="game-card-icon">${P.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${v(P.name)}</h4>
                    <p class="game-card-desc">${v(P.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${P.duration}</span>
                      ${P.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${P.id}" data-game-title="${v(P.name)}">
                    ${P.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                    ${E.map(P=>`
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
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${S.length})</h5>
              ${S.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${S.map(P=>`
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
                <span class="badge green">${U.length} Live</span>
              </div>

              ${U.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${U.map(P=>{const _e=(P.players||P.gameState?.players||[P.player1,P.player2].filter(Boolean)).filter(H=>H.userId&&H.userId.toString()!==M?.toString()),fe=P.player1?.userId?.toString()===M?.toString()?P.player2:P.player1,se=_e.length>0?_e.map(H=>v(H.name)).join(", "):fe?.name?v(fe.name):"Colleagues",ue=M&&P.currentTurnUserId&&P.currentTurnUserId.toString()===M.toString();return`
                        <div class="lounge-active-match-card ${ue?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${P.gameType==="chess"?"♟️":P.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${v(P.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${se}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ue?"my-turn":"wait"}">
                              ${ue?"⚡ Your Turn!":"⏳ Opponent Turn"}
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
              ${re.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${re.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${re.map(P=>{const _e=M&&P.player1.userId.toString()===M.toString()?P.player2:P.player1,fe=M&&P.winnerId&&P.winnerId.toString()===M.toString(),se=P.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${v(P.gameTitle)}</span>
                          <span class="recent-date">${Y(P.completedAt||P.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${P._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${v(_e.name)}</strong></div>
                          <div class="recent-outcome ${fe?"win":se?"draw":"loss"}">
                            ${fe?"🏆 VICTORY":se?"🤝 DRAW":"DEFEAT"}
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
      `,Q()}catch(r){f.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${v(r.message)}</p>
        </div>
      `}}}function Q(){i.querySelectorAll(".btn-challenge-game").forEach(f=>{f.onclick=()=>{const r=f.dataset.gameId;K(r)}}),i.querySelectorAll(".btn-respond-invite").forEach(f=>{f.onclick=async()=>{const r=f.dataset.inviteId,n=f.dataset.action;await q(r,n),await I()}}),i.querySelectorAll(".btn-resume-match").forEach(f=>{f.onclick=()=>{const r=f.dataset.matchId;F(r)}}),i.querySelectorAll(".btn-recent-rematch").forEach(f=>{f.onclick=async()=>{const r=f.dataset.matchId;try{f.disabled=!0;const n=await Ce(`/bonding/matches/${r}/action`,{action:"rematch"});n.match&&(y("Rematch created! Opening arena ⚔️","success"),F(n.match._id))}catch(n){y(n.message||"Could not start rematch","error")}finally{f.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(f=>{f.onclick=async r=>{r.stopPropagation();const n=f.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{f.disabled=!0,await Xe(`/bonding/matches/${n}`),y("Match deleted successfully","success"),await I()}catch(h){y(h.message||"Failed to delete match","error")}finally{f.disabled=!1}}});const p=i.querySelector("#btn-clear-matches");p&&(p.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{p.disabled=!0,await Xe("/bonding/matches?filter=completed"),y("Completed matches history cleared","success"),await I()}catch(f){y(f.message||"Failed to clear matches","error")}finally{p.disabled=!1}})}function K(p=null,f=null){const r=i.querySelector("#bonding-modals-root"),n=e?._id||e?.id,h=new Set(["employee","admin","superadmin"]),E=s.filter(fe=>!fe.isSelf&&fe._id.toString()!==n?.toString()&&h.has(fe.role));let S=p||"chess",U=f?f.toString():null,re=2,M=U?[U]:[],P="none";function G(){const fe=E.find(le=>le._id.toString()===U),se=S==="ludo",ue=re-1,H=M.length===ue;r.innerHTML=`
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
              ${se?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${re===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${re===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${re===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${se?`Step 3 — Select Colleagues to Play With (${M.length}/${ue} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${E.map(le=>{const be=se?M.includes(le._id.toString()):U===le._id.toString();return`
                      <div class="eligible-emp-item ${be?"selected":""}" data-user-id="${le._id}">
                        <div class="emp-item-avatar">${le.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${v(le.name)}</span>
                          <span class="emp-item-role">${v(le.role==="superadmin"?"Superadmin":le.role==="admin"?"Admin":"Employee")} · ${v(le.email||"")}</span>
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
                    <label class="timer-radio-lbl ${P==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${P==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${P==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${P==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${P==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${P==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${se?`🎲 Ludo (${re} Players · 4 Pawns per base)`:S==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${se?`
                    <div><strong>Opponents:</strong> ${M.length>0?M.map(le=>{const be=E.find(ge=>ge._id.toString()===le);return be?`<strong>${v(be.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+ue+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${fe?`<strong>${v(fe.name)}</strong> (${v(fe.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${S==="chess"?`<div><strong>Time Control:</strong> ${P==="none"?"Untimed":P}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(se?!H:!U)?"disabled":""}>
                ${se?`Start ${re}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,_e()}function _e(){r.querySelector(".bonding-modal-close").onclick=()=>{r.innerHTML=""},r.querySelector("#btn-cancel-challenge-flow").onclick=()=>{r.innerHTML=""},r.querySelectorAll(".game-pill-btn").forEach(ue=>{ue.onclick=()=>{S=ue.dataset.game,G()}}),r.querySelectorAll(".ludo-mode-btn").forEach(ue=>{ue.onclick=()=>{re=Number(ue.dataset.count),M=M.slice(0,re-1),G()}});const fe=r.querySelector("#flow-emp-search");fe&&(fe.oninput=ue=>{const H=ue.target.value.toLowerCase().trim();r.querySelectorAll(".eligible-emp-item").forEach(le=>{const be=le.textContent.toLowerCase();le.style.display=be.includes(H)?"flex":"none"})}),r.querySelectorAll(".eligible-emp-item").forEach(ue=>{ue.onclick=()=>{const H=ue.dataset.userId;if(S==="ludo"){const le=re-1;M.includes(H)?M=M.filter(be=>be!==H):M.length<le?M.push(H):M[le-1]=H}else U=H;G()}}),r.querySelectorAll('input[name="timerMode"]').forEach(ue=>{ue.onchange=H=>{P=H.target.value,G()}});const se=r.querySelector("#btn-submit-challenge-flow");se&&(se.onclick=async()=>{if(S==="ludo"){const ue=re-1;if(M.length<ue){y(`Please select ${ue} colleague(s) to play with`,"warning");return}try{se.disabled=!0,se.textContent="Launching Match...";const H=await Ce("/bonding/matches/instant-ludo",{playerCount:re,targetUserIds:M});r.innerHTML="",y(`Ludo match started (${re} Players)! 🎲`,"success"),H&&H._id&&F(H._id)}catch(H){y(H.message||"Failed to start Ludo match","error"),se.disabled=!1,se.textContent=`Start ${re}P Ludo Match 🎲`}return}if(!U){y("Please select an employee to challenge","warning");return}try{se.disabled=!0,se.textContent="Sending Challenge...",await Ce("/bonding/invitations",{gameType:S,targetUserId:U,matchSettings:{timerMode:P},channelId:l?._id||null}),y("Game challenge delivered! Awaiting acceptance ⚔️","success"),r.innerHTML="",l&&await Pe(l._id),b==="lounge_games"&&await I()}catch(ue){y(ue.message||"Could not send challenge","error"),se.disabled=!1,se.textContent="Send Challenge 🚀"}})}G()}async function q(p,f){if(!(!p||!f))try{const r=await Yt(`/bonding/invitations/${p}/respond`,{action:f});f==="accept"?(y("Challenge accepted! Entering match arena ⚔️","success"),r.match&&F(r.match._id)):f==="decline"?(y("Challenge declined","info"),i.querySelectorAll(`[data-invite-id="${p}"]`).forEach(n=>{const h=n.closest(".lounge-invite-item")||n.closest(".bonding-msg-row");h&&h.remove()})):f==="cancel"&&(y("Challenge cancelled","info"),i.querySelectorAll(`[data-invite-id="${p}"]`).forEach(n=>{const h=n.closest(".lounge-invite-item")||n.closest(".bonding-msg-row");h&&h.remove()})),l&&await Pe(l._id),b==="lounge_games"&&await I()}catch(r){y(r.message||"Action failed","error")}}async function F(p){if(!p)return;R=p,z&&clearInterval(z);const f=i.querySelector("#bonding-modals-root");let r=null,n=null,h=[],E="",S=null,U=!1;function re(H){return H?JSON.stringify({status:H.status,turn:H.currentTurnUserId?.toString(),turnColor:H.turn,movesCount:H.moves?.length,dice:H.gameState?.dice,rolled:H.gameState?.rolled,lastRoll:H.gameState?.lastRoll,lastRollColor:H.gameState?.lastRollColor,lastRollBy:H.gameState?.lastRollBy,lastActionText:H.gameState?.lastActionText,tokens:H.gameState?.tokens,board:H.gameState?.board,grid:H.gameState?.grid,fen:H.gameState?.fen,draw:H.drawOfferedBy?.toString()}):""}async function M(){try{return r=await Re(`/bonding/matches/${p}`),r}catch(H){return y(H.message||"Could not load match","error"),P(),null}}if(r=await M(),!r)return;E=re(r);function P(){z&&clearInterval(z),S&&clearTimeout(S),U=!1,R=null,f.innerHTML="",b==="lounge_games"&&I(!0),l&&Pe(l._id,!0)}z=setInterval(async()=>{if(!R||R!==p){clearInterval(z);return}try{const H=await Re(`/bonding/matches/${p}`);if(!H)return;const le=re(H);le!==E&&(E=le,r=H,G())}catch{}},1e3);function G(){if(!r)return;const H=e?._id||e?.id,le=H&&r.player1.userId.toString()===H.toString(),be=le?r.player1:r.player2,ge=le?r.player2:r.player1,xe=H&&r.currentTurnUserId&&r.currentTurnUserId.toString()===H.toString(),Ee=r.status!=="active";f.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${r.gameType==="ludo"?"🎲":r.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${v(r.gameTitle)}</h3>
                  ${r.gameType==="ludo"&&r.gameState?.players?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${r.gameState.players.map(Be=>{const Ge=Be.userId&&Be.userId.toString()===H?.toString(),Le={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Be.color]||"⚪",ce=(r.gameState?.turnColor||r.turn)===Be.color;return`
                          <span class="player-tag ${Ge?"self":"opp"} ${ce?"turn-active":""}">
                            ${Le} <strong>${v(Be.name)}</strong> ${Ge?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${v(be.name)} (You · <strong>${r.gameType==="ludo"?be.assignedRole==="red"?"🔴 Red":"🟢 Green":r.gameType==="tictactoe"?be.assignedRole==="X"?"✕":"◯":be.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${v(ge.name)} (<strong>${r.gameType==="ludo"?ge.assignedRole==="red"?"🔴 Red":"🟢 Green":r.gameType==="tictactoe"?ge.assignedRole==="X"?"✕":"◯":ge.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${Ee?"ended":xe?"my-turn":"opp-turn"}">
                ${Ee?`<span>🏁 Finished (${v(r.winningReason||r.status)})</span>`:xe?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${v(ge.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${r.gameType==="ludo"?xe?r.gameState?.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":r.gameType==="tictactoe"?xe?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":xe?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${Ee?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${r.drawOfferedBy&&r.drawOfferedBy.toString()!==H?.toString()&&!Ee?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${v(ge.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${r.gameType==="chess"?_e(le):""}
              ${r.gameType==="tictactoe"?fe():""}
              ${r.gameType==="ludo"?se(le):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${Ee?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${r.winnerId&&r.winnerId.toString()===H?.toString()?"🏆":r.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${r.winnerId&&r.winnerId.toString()===H?.toString()?"VICTORY!":r.status==="draw"?"STALEMATE / DRAW":`${v(r.winnerName)} Wins!`}</h4>
                  <p>Reason: ${v(r.winningReason||"Match concluded")}</p>
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
      `,ue(xe,le,be)}function _e(H){const le=r.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",be=new ka(le),ge=H?r.player1.assignedRole==="white":r.player2.assignedRole==="white",xe={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},Ee=ge?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Be=ge?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Ge='<div class="chess-board-grid">';for(const Te of Be)for(const Ue of Ee){const Ne=`${Ue}${Te}`,Ae=be.get(Ne),Ie=(Ue.charCodeAt(0)-97+Te)%2!==0,Se=n===Ne,he=h.includes(Ne),je=Ae?Ae.color==="w"?xe[Ae.type.toUpperCase()]:xe[Ae.type]:"";Ge+=`
            <div class="chess-sq ${Ie?"light":"dark"} ${Se?"selected":""} ${he?"legal-dot":""}" data-square="${Ne}">
              ${je?`<span class="chess-piece ${Ae.color==="w"?"white-piece":"black-piece"}">${je}</span>`:""}
            </div>
          `}Ge+="</div>";const ce=(r.moves||[]).map(Te=>`
        <span class="chess-move-token">${Te.moveNum}. ${Te.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${Ge}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${ce||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function fe(){const H=r.gameState?.board||Array(9).fill(null),le=r.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${H.map((be,ge)=>{const xe=le.includes(ge);return`
                <div class="ttt-cell ${be?"filled":"empty"} ${xe?"win-cell":""}" data-cell-idx="${ge}">
                  ${be==="X"?'<span class="ttt-x">✕</span>':be==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function se(H,le,be){const ge=r.gameState||{},xe=ge.activeColors||["red","green"],Ee=ge.players||[{...r.player1,color:"red",assignedRole:"red",isBot:!1},{...r.player2,color:"green",assignedRole:"green",isBot:!1}],Be=ge.tokens||{},Ge=T=>{const Z=Be[T]||(T==="red"?ge.p1Tokens:T==="green"?ge.p2Tokens:[])||[];return Array.from({length:4},(ke,we)=>Z[we]||{id:we,step:-1})},Le=Ge("red"),ce=Ge("green"),Te=Ge("yellow"),Ue=Ge("blue"),Ne=e?._id||e?.id,Ie=(Ee.find(T=>T.userId&&T.userId.toString()===Ne?.toString())||Ee[0])?.color||(H?"red":"green"),Se=ge.turnColor||r.turn||"red",he=Ie===Se&&r.status==="active",je=!!ge.rolled,A=ge.dice,B=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],u=[[7,1],[7,2],[7,3],[7,4],[7,5]],De=[[1,7],[2,7],[3,7],[4,7],[5,7]],ye=[[7,13],[7,12],[7,11],[7,10],[7,9]],st=[[13,7],[12,7],[11,7],[10,7],[9,7]],O=[0,8,13,21,26,34,39,47];function ht(T,Z){return Z<0?null:Z>=56?T==="red"?[7,6]:T==="green"?[6,7]:T==="yellow"?[7,8]:[8,7]:T==="red"?Z<=50?B[Z]:u[Z-51]:T==="green"?Z<=50?B[(13+Z)%52]:De[Z-51]:T==="yellow"?Z<=50?B[(26+Z)%52]:ye[Z-51]:Z<=50?B[(39+Z)%52]:st[Z-51]}function Me(T,Z){return T!==Ie||!he||!je||!A||r.status!=="active"?!1:Z.step===-1?A===6:Z.step>=0&&Z.step+A<=56}const Ze={},_t=(T,Z)=>{Z.forEach(ke=>{if(ke.step>=0&&ke.step<56){const we=ht(T,ke.step);if(we){const g=we[0]+","+we[1];(Ze[g]=Ze[g]||[]).push({color:T,id:ke.id,step:ke.step,movable:Me(T,ke)})}}})};xe.includes("red")&&_t("red",Le),xe.includes("green")&&_t("green",ce),xe.includes("yellow")&&_t("yellow",Te),xe.includes("blue")&&_t("blue",Ue);const Je={};B.forEach(([T,Z],ke)=>{Je[T+","+Z]=ke});const Dt={};u.forEach(([T,Z],ke)=>{Dt[T+","+Z]=ke+1});const Et={};De.forEach(([T,Z],ke)=>{Et[T+","+Z]=ke+1});const X={};ye.forEach(([T,Z],ke)=>{X[T+","+Z]=ke+1});const Bt={};st.forEach(([T,Z],ke)=>{Bt[T+","+Z]=ke+1});const Pt=[];for(let T=0;T<15;T++)for(let Z=0;Z<15;Z++){if(T<6&&Z<6||T<6&&Z>8||T>8&&Z<6||T>8&&Z>8||T>=6&&T<=8&&Z>=6&&Z<=8)continue;const ke=T+","+Z,we=Je[ke],g=we!==void 0&&O.includes(we),x=T===6&&Z===1,w=T===1&&Z===8,V=T===8&&Z===13,ee=T===13&&Z===6,$e=Dt[ke],ct=Et[ke],It=X[ke],Sa=Bt[ke];let lt="ludo-cell";x?lt+=" cell-red-start":w?lt+=" cell-green-start":V?lt+=" cell-yellow-start":ee?lt+=" cell-blue-start":$e?lt+=" cell-red-stretch":ct?lt+=" cell-green-stretch":It?lt+=" cell-yellow-stretch":Sa?lt+=" cell-blue-stretch":g&&(lt+=" cell-safe-star");const Ca=Ze[ke]||[];Pt.push(`
            <div class="${lt}" style="grid-row:${T+1};grid-column:${Z+1}" data-pos="${ke}">
              ${g?'<span class="cell-star-glyph">⭐</span>':""}
              ${x||w||V||ee?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Ca.map(yt=>`
                <div class="ludo-token token-${yt.color} ${yt.movable?"movable":""}" data-token-id="${yt.id}" data-color="${yt.color}" title="${yt.color.toUpperCase()} Pawn ${yt.id+1}">
                  <span>${yt.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function Zt(T){const Z=Math.max(1,Math.min(6,Number(T)||1)),ke={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,7,9,5],6:[1,4,7,3,6,9]},we=new Set(ke[Z]||[5]);let g="";for(let x=1;x<=9;x++)g+=`<span class="ludo-pip ${we.has(x)?"filled":"empty"}"></span>`;return`<div class="ludo-dice-face face-${Z}">${g}</div>`}function vt(T,Z,ke,we,g){const x=`${T}-yard`;if(!ke)return`
            <div class="ludo-yard ${x}">
              <div class="yard-box decorative">
                <div class="yard-title">${Z} (Inactive)</div>
              </div>
            </div>
          `;const w=g.filter(V=>V.step===56).length;return`
          <div class="ludo-yard ${x} ${Se===T?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${Z}</span>
                ${w>0?`<span class="yard-home-badge" title="${w} of 4 pawns reached Home!">👑 ${w}/4 Home</span>`:""}
                ${we?`<small class="yard-player-lbl">${v(we.name)}${we.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${g.map((V,ee)=>`
                  <div class="yard-token-slot ${V.step===56?"slot-home":""}">
                    ${V.step===-1?`
                      <div class="ludo-token token-${T} ${Me(T,V)?"movable":""}" data-token-id="${V.id}" data-color="${T}" title="${T.toUpperCase()} Pawn ${V.id+1}">
                        <span>${V.id+1}</span>
                      </div>
                    `:V.step===56?`
                      <div class="ludo-token token-reached-home token-${T}" title="${T.toUpperCase()} Pawn ${V.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${V.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${ee+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Nt=Ee.find(T=>T.color==="red"),Ft=Ee.find(T=>T.color==="green"),ea=Ee.find(T=>T.color==="yellow"),Ot=Ee.find(T=>T.color==="blue"),Lt=Ee.find(T=>T.color===Se)||(Se==="red"?Nt:Ft),jt=Lt?v(Lt.name):Se.toUpperCase(),Tt={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Se]||"🔴",ut=A||ge.lastRoll||6,xt=he&&!je&&r.status==="active",Ht=Ge(Ie).filter(T=>Me(Ie,T));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${vt("red","🔴 Red Base",xe.includes("red"),Nt,Le)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${vt("green","🟢 Green Base",xe.includes("green"),Ft,ce)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${vt("blue","🔵 Blue Base",xe.includes("blue"),Ot,Ue)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${vt("yellow","🟡 Yellow Base",xe.includes("yellow"),ea,Te)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${Le.filter(T=>T.step===56).map(T=>`<div class="home-tri-pawn red" title="Red Pawn ${T.id+1} Home! 👑">👑${T.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${ce.filter(T=>T.step===56).map(T=>`<div class="home-tri-pawn green" title="Green Pawn ${T.id+1} Home! 👑">👑${T.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${Te.filter(T=>T.step===56).map(T=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${T.id+1} Home! 👑">👑${T.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${Ue.filter(T=>T.step===56).map(T=>`<div class="home-tri-pawn blue" title="Blue Pawn ${T.id+1} Home! 👑">👑${T.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...Le.filter(T=>T.step===56).map(T=>({col:"red",id:T.id})),...ce.filter(T=>T.step===56).map(T=>({col:"green",id:T.id})),...Te.filter(T=>T.step===56).map(T=>({col:"yellow",id:T.id})),...Ue.filter(T=>T.step===56).map(T=>({col:"blue",id:T.id}))].map(T=>`
                    <div class="tok-home-champion ${T.col}" title="${T.col.toUpperCase()} Pawn ${T.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${T.id+1}</span>
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
                class="ludo-3d-dice ${xt?"clickable pulse-roll":""} ${je?"just-rolled":""} border-${Se}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${xt?"0":"-1"}"
                title="${xt?"Click Dice to Roll!":he?"Choose a pawn to move":`${jt}'s turn`}"
              >
                ${Zt(ut)}
              </div>
              <div class="ludo-dice-action-badge">
                ${xt?'<span class="badge-click-roll">🎲 TAP TO ROLL</span>':je?`<span class="badge-rolled-val">${Tt} Rolled ${ut}</span>`:ge.lastRoll?`<span class="badge-last-roll">${Tt} Rolled ${ge.lastRoll}</span>`:'<span class="badge-waiting">Ready</span>'}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${Se}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${Tt} ${jt}</strong> (${Se.toUpperCase()})
                </span>
                ${he?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${he&&je?"highlight":""}">
                ${he&&!je&&r.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":he&&je&&r.status==="active"?Ht.length>0?Ht.length===1?`🎲 Rolled <strong>${ut}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${ut}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${ut}</strong>. No legal moves possible — turn passing...`:r.status==="active"?je||ge.lastRoll?`🎲 ${Tt} <strong>${jt}</strong> rolled <strong>${ut}</strong>!`:`⏳ Waiting for <strong>${jt}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${v(ge.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function ue(H,le,be){f.querySelector("#btn-close-arena").onclick=P;const ge=f.querySelector("#btn-arena-resign");ge&&(ge.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{ge.disabled=!0,await Ce(`/bonding/matches/${p}/action`,{action:"resign"}),await M(),G()}catch(ce){y(ce.message||"Resign failed","error"),ge.disabled=!1}});const xe=f.querySelector("#btn-arena-draw");xe&&(xe.onclick=async()=>{try{await Ce(`/bonding/matches/${p}/action`,{action:"offer_draw"}),y("Draw offer sent to opponent","info"),await M(),G()}catch(ce){y(ce.message||"Draw offer failed","error")}});const Ee=f.querySelector("#btn-confirm-accept-draw");Ee&&(Ee.onclick=async()=>{try{await Ce(`/bonding/matches/${p}/action`,{action:"accept_draw"}),y("Draw agreed!","info"),await M(),G()}catch(ce){y(ce.message,"error")}});const Be=f.querySelector("#btn-confirm-decline-draw");Be&&(Be.onclick=async()=>{try{await Ce(`/bonding/matches/${p}/action`,{action:"decline_draw"}),await M(),G()}catch(ce){y(ce.message,"error")}}),[f.querySelector("#btn-arena-delete-match"),f.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(ce=>{ce.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{ce.disabled=!0,await Xe(`/bonding/matches/${p}`),y("Match deleted","success"),P(),b==="lounge_games"&&await I()}catch(Te){y(Te.message||"Failed to delete match","error"),ce.disabled=!1}}});const Le=f.querySelector("#btn-arena-rematch-action");if(Le&&(Le.onclick=async()=>{try{Le.disabled=!0,Le.textContent="Creating Rematch...";const ce=await Ce(`/bonding/matches/${p}/action`,{action:"rematch"});ce.match&&(y("Rematch created! New match live ⚔️","success"),z&&clearInterval(z),F(ce.match._id))}catch(ce){y(ce.message||"Rematch failed","error"),Le.disabled=!1,Le.textContent="🔄 Request Rematch"}}),r.gameType==="chess"&&H&&r.status==="active"){const ce=r.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Te=new ka(ce),Ue=be.assignedRole==="white"?"w":"b";f.querySelectorAll(".chess-sq").forEach(Ne=>{Ne.onclick=async()=>{const Ae=Ne.dataset.square;if(n){if(n===Ae){n=null,h=[],G();return}if(h.includes(Ae)){const Se=Te.get(n);let he;Se&&Se.type==="p"&&(Ae.endsWith("8")||Ae.endsWith("1"))&&(he=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const je={from:n,to:Ae,promotion:he?he.toLowerCase():void 0};n=null,h=[],r=await Ce(`/bonding/matches/${p}/move`,{move:je}),G()}catch(je){y(je.message||"Illegal chess move","error"),n=null,h=[],G()}return}}const Ie=Te.get(Ae);Ie&&Ie.color===Ue?(n=Ae,h=Te.moves({square:Ae,verbose:!0}).map(he=>he.to),G()):(n=null,h=[],G())}})}if(r.gameType==="tictactoe"&&H&&r.status==="active"&&f.querySelectorAll(".ttt-cell.empty").forEach(ce=>{ce.onclick=async()=>{const Te=ce.dataset.cellIdx;try{ce.style.opacity="0.5",r=await Ce(`/bonding/matches/${p}/move`,{cellIndex:Number(Te)}),G()}catch(Ue){y(Ue.message||"Invalid move","error")}}}),r.gameType==="ludo"&&r.status==="active"){const ce=r.gameState||{},Te=!!ce.rolled,Ue=ce.turnColor||r.turn||"red",Ne=r.player1.userId.toString()===myId?.toString()?r.player1.assignedRole||"red":r.player2.userId.toString()===myId?.toString()?r.player2.assignedRole||"green":(ce.players||[]).find(Se=>Se.userId?.toString()===myId?.toString())?.color||"red",Ae=H&&Ue===Ne,Ie=f.querySelector("#btn-interactive-ludo-dice");if(Ie&&Ae&&!Te){const Se=async()=>{if(Ie.dataset.rolling!=="true"){Ie.dataset.rolling="true",Ie.classList.add("rolling");try{const he=await Ce(`/bonding/matches/${p}/move`,{action:"roll"});r=he,E=re(he),G()}catch(he){y(he.message||"Failed to roll","error"),Ie.classList.remove("rolling"),delete Ie.dataset.rolling}}};Ie.onclick=Se,Ie.onkeydown=he=>{(he.key==="Enter"||he.key===" ")&&(he.preventDefault(),Se())}}if(Ae&&Te){const he=(ce.tokens||{})[Ne]||[],je=ce.dice||ce.lastRoll||0,A=he.filter(B=>B.step===-1&&je===6||B.step>=0&&B.step+je<=56);if(A.length===1&&!U){U=!0;const B=A[0];S&&clearTimeout(S),S=setTimeout(async()=>{try{const u=await Ce(`/bonding/matches/${p}/move`,{action:"move",tokenId:Number(B.id)});r=u,E=re(u),U=!1,G()}catch(u){U=!1,y(u.message||"Auto-move failed","error")}},400)}}Ae&&Te&&f.querySelectorAll(".ludo-token.movable").forEach(Se=>{Se.onclick=async he=>{he.stopPropagation();const je=Se.dataset.tokenId;try{Se.style.opacity="0.5";const A=await Ce(`/bonding/matches/${p}/move`,{action:"move",tokenId:Number(je)});r=A,E=re(A),G()}catch(A){y(A.message||"Invalid token move","error"),Se.style.opacity="1"}}})}}G()}function W(){if(!l||l.type==="direct")return;const p=i.querySelector("#bonding-modals-root"),f=M=>M==="employee"||M==="admin"||M==="superadmin",r=l.members||[],n=new Set(r.map(M=>M.userId?.toString())),h=s.filter(M=>f(M.role)&&!n.has(M._id.toString()));p.innerHTML=`
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
                  ${h.map(M=>`
                    <option value="${M._id}">${v(M.name)} (${v(M.role==="superadmin"?"Superadmin":M.role==="admin"?"Admin":"Employee")})</option>
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
              <label class="bonding-form-label">Current Members (${r.length}):</label>
              <div class="bonding-members-list">
                ${r.map(M=>{const P=e?._id||e?.id,G=P&&M.userId&&M.userId.toString()===P.toString(),_e=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(P),fe=d==="superadmin"||e?.role==="superadmin",se=_e||fe;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(M.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${v(M.name)} ${G?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${v(M.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${G?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${M.userId}">
                            🚪 Leave Group
                          </button>
                        `:se?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${M.userId}" data-name="${v(M.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const M=e?._id||e?.id,P=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(M),G=d==="superadmin"||e?.role==="superadmin";return P||G?`
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""};const E=p.querySelector("#btn-modal-delete-group");E&&(E.onclick=()=>{p.innerHTML="",J()});const S=p.querySelector("#btn-modal-leave-group");S&&(S.onclick=()=>{p.innerHTML="",k()}),p.querySelectorAll(".btn-leave-group-action").forEach(M=>{M.onclick=()=>{p.innerHTML="",k()}});const U=p.querySelector("#btn-submit-add-member");U&&(U.onclick=async()=>{const P=p.querySelector("#sel-add-colleague").value;if(!P){y("Please select a colleague to add","warning");return}try{U.disabled=!0,U.textContent="Adding...";const G=await Yt(`/bonding/channels/${l._id}/members`,{action:"add",userIds:[P]});y("Colleague added to group! 🎉","success"),l=G.channel,p.innerHTML="",await Pe(l._id),qe()}catch(G){y(G.message||"Failed to add member","error"),U.disabled=!1,U.textContent="Add to Group"}}),p.querySelectorAll(".btn-remove-member").forEach(M=>{M.onclick=async()=>{const P=M.dataset.userId,G=M.dataset.name;if(confirm(`Are you sure you want to remove ${G} from this group?`))try{M.disabled=!0;const _e=await Yt(`/bonding/channels/${l._id}/members`,{action:"remove",userId:P});y(`${G} removed from group`,"info"),l=_e.channel,p.innerHTML="",await Pe(l._id),qe()}catch(_e){y(_e.message||"Failed to remove member","error"),M.disabled=!1}}})}async function k(){if(!l||l.type==="direct")return;const p=l.name;if(confirm(`Are you sure you want to leave the group "${p}"?`))try{await Ce(`/bonding/channels/${l._id}/leave`,{}),y(`You left "${p}"`,"info"),c=await Re("/bonding/channels").catch(()=>[]),l=c.find(r=>r.type==="group")||c[0]||null,Oe(),qe(),l&&await Pe(l._id)}catch(r){y(r.message||"Failed to leave group","error")}}async function J(){if(!l||l.type==="direct")return;const p=l.name;if(confirm(`Are you sure you want to delete the group "${p}"?

All messages in this lounge will be deleted.`))try{await Xe(`/bonding/channels/${l._id}`),y(`Group "${p}" deleted successfully`,"success"),c=await Re("/bonding/channels").catch(()=>[]),l=c.find(r=>r.type==="group")||c[0]||null,Oe(),qe(),l&&await Pe(l._id)}catch(r){y(r.message||"Failed to delete group","error")}}function te(){const p=i.querySelector("#bonding-modals-root"),f=h=>h==="employee"||h==="admin"||h==="superadmin",r=s.filter(h=>!h.isSelf&&f(h.role));p.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${r.map(h=>`
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelectorAll(".bonding-user-pick-item").forEach(h=>{h.onclick=async()=>{const E=h.dataset.userId;try{const S=await Ce("/bonding/channels",{type:"direct",targetUserId:E});p.innerHTML="",c=await Re("/bonding/channels"),l=c.find(U=>U._id===S._id)||S,Oe(),qe(),await Pe(l._id)}catch(S){y(S.message||"Failed to open personal chat","error")}}})}function ae(){const p=i.querySelector("#bonding-modals-root"),f=S=>S==="employee"||S==="admin"||S==="superadmin",r=s.filter(S=>!S.isSelf&&f(S.role));p.innerHTML=`
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
                ${r.map(S=>`
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelector("#btn-cancel-create-grp").onclick=()=>{p.innerHTML=""};let n="👥";const h=p.querySelectorAll(".avatar-opt");h.forEach(S=>{S.onclick=()=>{h.forEach(U=>U.classList.remove("active")),S.classList.add("active"),n=S.textContent.trim()}});const E=p.querySelector("#btn-confirm-create-grp");E.onclick=async()=>{const S=p.querySelector("#new-group-name"),U=p.querySelector("#new-group-desc"),re=S.value.trim();if(!re){y("Please enter a group name","warning"),S.focus();return}const M=p.querySelectorAll(".new-group-member-chk:checked"),P=Array.from(M).map(G=>G.value);try{E.disabled=!0,E.textContent="Creating...";const G=await Ce("/bonding/channels",{type:"group",name:re,description:U.value.trim(),avatar:n,memberIds:P});y(`Group "${re}" created! 🎉`,"success"),p.innerHTML="",c=await Re("/bonding/channels"),l=c.find(_e=>_e._id===G._id)||G,Oe(),qe(),await Pe(l._id)}catch(G){y(G.message||"Failed to create group","error"),E.disabled=!1,E.textContent="Create Group 🎉"}}}function ie(p,f){const r=document.querySelector(".bonding-emoji-popup");r&&r.remove();const n=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],h=document.createElement("div");h.className="bonding-emoji-popup",h.innerHTML=n.map(U=>`<button class="emoji-opt-btn" data-e="${U}">${U}</button>`).join("");const E=p.getBoundingClientRect();h.style.top=`${E.bottom+window.scrollY+6}px`,h.style.left=`${E.left+window.scrollX}px`,document.body.appendChild(h),h.querySelectorAll(".emoji-opt-btn").forEach(U=>{U.onclick=re=>{re.stopPropagation(),f(U.dataset.e),h.remove()}});const S=U=>{h.contains(U.target)||(h.remove(),document.removeEventListener("click",S))};setTimeout(()=>document.addEventListener("click",S),10)}function Y(p){if(!p)return"";try{return new Date(p).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Za(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
      gap: 6px;
      flex-shrink: 0;
    }

    .ludo-3d-dice {
      width: 58px;
      height: 58px;
      background: #ffffff;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25), inset 0 -3px 0 #cbd5e1;
      border: 2.5px solid #cbd5e1;
      cursor: default;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.2s ease;
      user-select: none;
    }

    .ludo-3d-dice.clickable {
      cursor: pointer;
    }

    .ludo-3d-dice.clickable:hover {
      transform: translateY(-2px) scale(1.06);
    }

    .ludo-3d-dice.clickable:active {
      transform: translateY(1px) scale(0.96);
    }

    .ludo-3d-dice.pulse-roll {
      animation: diceGlowPulse 1.2s infinite alternate;
    }

    .ludo-3d-dice.border-red { border-color: #ef4444; }
    .ludo-3d-dice.border-green { border-color: #10b981; }
    .ludo-3d-dice.border-yellow { border-color: #f59e0b; }
    .ludo-3d-dice.border-blue { border-color: #3b82f6; }

    @keyframes diceGlowPulse {
      0% { box-shadow: 0 4px 12px rgba(0,0,0,0.25), 0 0 4px rgba(59, 130, 246, 0.4); }
      100% { box-shadow: 0 6px 20px rgba(0,0,0,0.35), 0 0 16px rgba(59, 130, 246, 0.85); transform: scale(1.04); }
    }

    .ludo-3d-dice.rolling {
      animation: diceRollingSpin 0.45s cubic-bezier(0.25, 1, 0.5, 1);
    }

    @keyframes diceRollingSpin {
      0% { transform: rotate(0deg) scale(0.9); }
      50% { transform: rotate(180deg) scale(1.15); }
      100% { transform: rotate(360deg) scale(1); }
    }

    .ludo-dice-face {
      width: 44px;
      height: 44px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 3px;
      padding: 3px;
      box-sizing: border-box;
    }

    .ludo-pip {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      margin: auto;
    }

    .ludo-pip.filled {
      background: #1e293b;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
    }

    .ludo-pip.empty {
      visibility: hidden;
    }

    .ludo-dice-face.face-1 .ludo-pip.filled {
      background: #dc2626;
      width: 14px;
      height: 14px;
    }

    .ludo-dice-action-badge {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      text-align: center;
      white-space: nowrap;
    }

    .badge-click-roll {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.12);
      padding: 2px 7px;
      border-radius: 6px;
      border: 1px solid rgba(59, 130, 246, 0.3);
      animation: badgePulse 1.2s infinite alternate;
    }

    @keyframes badgePulse {
      from { opacity: 0.85; }
      to { opacity: 1; transform: scale(1.03); }
    }

    .badge-rolled-val {
      color: #10b981;
      background: rgba(16, 185, 129, 0.12);
      padding: 2px 7px;
      border-radius: 6px;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .badge-last-roll {
      color: var(--text-2, #64748b);
      background: var(--bg-card, #e2e8f0);
      padding: 2px 7px;
      border-radius: 6px;
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
  `,document.head.appendChild(t)}function wa(i){if(!i)return"";const t=v(i),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return t.replace(e,d=>`<a href="${d}" target="_blank" rel="noopener noreferrer" class="jira-inline-link">${d} ↗</a>`)}const ca=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],$t=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],qt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ii(i,t={}){const{userRole:e="employee",currentUser:d=null,initialTicketId:b=null}=t,c=e==="superadmin"||e==="admin";if(e==="client"||d&&d.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let l=[],s={},L=[],N=[],$={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},j=null,R="comments",z=!1;i.innerHTML=`
    <div class="jira-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="jira-header-bar">
        <div class="jira-header-left">
          <div class="jira-breadcrumb">
            <span class="jira-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${c?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="jira-title-row">
            <h2 class="jira-main-title">🎫 ${c?"Support Tickets Board":"Support Tickets"}</h2>
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
            ${$t.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
          </select>

          <select id="jira-filter-job" class="jira-filter-select">
            <option value="all">Linked Job: All</option>
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
  `,await Promise.all([et(),Ke(),rt(),Ct()]),it(),nt(),Pe(),qe(),b&&ot(b);const pe=setInterval(()=>{if(!document.contains(i)){clearInterval(pe);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!j&&de()},12e3),ve=()=>{document.contains(i)&&!j&&de()};window.addEventListener("focus",ve);async function Ke(){try{const a=new URLSearchParams;$.search&&a.set("search",$.search),$.priority!=="all"&&a.set("priority",$.priority),$.category!=="all"&&a.set("category",$.category),$.assigneeId!=="all"&&a.set("assigneeId",$.assigneeId),$.jobId&&$.jobId!=="all"&&a.set("jobId",$.jobId),$.reporterId&&$.reporterId!=="all"&&a.set("reporterId",$.reporterId),$.scope==="created"&&a.set("reporterId",d?._id||d?.id),$.scope==="assigned"&&a.set("assigneeId",d?._id||d?.id),$.myIssuesOnly&&a.set("myIssuesOnly","true");const o=await Re("/tickets?"+a.toString());l=Array.isArray(o)?o:[]}catch(a){y(a.message||"Failed to load tickets",!0),l=[]}}async function et(){try{s=await Re("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function rt(){try{let a;try{a=await Re("/tickets/staff")}catch{a=await Re("/users")}L=(a||[]).filter(o=>o.active!==!1&&o.role!=="client")}catch(a){console.warn("Could not fetch employees:",a),L=[]}}async function Ct(){try{const a=await Re("/jobs?limit=250");N=Array.isArray(a)?a:a?.jobs||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function it(){const a=i.querySelector("#jira-stats-root");a&&(a.innerHTML=`
      <div class="jira-stat-card ${$.status==="all"&&!$.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="jira-stat-val">${s.total||0}</span>
        <span class="jira-stat-lbl">Total Tickets</span>
      </div>
      <div class="jira-stat-card ${$.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="jira-stat-val">${s.toDo||0}</span>
        <span class="jira-stat-lbl">To Do</span>
      </div>
      <div class="jira-stat-card content ${$.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="jira-stat-val">${s.content??(s.inProgress||0)}</span>
        <span class="jira-stat-lbl">Content</span>
      </div>
      <div class="jira-stat-card design ${$.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="jira-stat-val">${s.design||0}</span>
        <span class="jira-stat-lbl">Design</span>
      </div>
      <div class="jira-stat-card review ${$.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="jira-stat-val">${s.underReview||0}</span>
        <span class="jira-stat-lbl">Under Review</span>
      </div>
      <div class="jira-stat-card ready ${$.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
        <span class="jira-stat-val">${s.readyToLeave??(s.resolved||s.closed||0)}</span>
        <span class="jira-stat-lbl">Ready to Leave</span>
      </div>
      <div class="jira-stat-card critical" data-stat-filter="critical">
        <span class="jira-stat-val">${s.critical||0}</span>
        <span class="jira-stat-lbl">Critical 🔴</span>
      </div>
      <div class="jira-stat-card overdue" data-stat-filter="overdue">
        <span class="jira-stat-val">${s.overdue||0}</span>
        <span class="jira-stat-lbl">Overdue ⚠️</span>
      </div>
    `,a.querySelectorAll(".jira-stat-card").forEach(o=>{o.onclick=async()=>{const C=o.dataset.statFilter;C==="all"?($.status="all",$.priority="all"):C==="critical"?($.priority="Critical",$.status="all"):($.status=C,$.priority="all"),await de()}}))}function Pe(){const a=i.querySelector("#jira-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${L.map(C=>`
          <option value="${C._id}" ${$.assigneeId===C._id.toString()?"selected":""}>
            ${v(C.name)} (${v(C.role)})
          </option>
        `).join("")}
      `);const o=i.querySelector("#jira-filter-job");o&&(o.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${N.map(C=>`
          <option value="${C._id}" ${$.jobId===C._id.toString()?"selected":""}>
            📁 ${v(C.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function nt(){const a=i.querySelector("#jira-board-columns-root");if(!a)return;const o={};ca.forEach(C=>{o[C.key]=[]}),l.forEach(C=>{let I=C.status||"To Do";I==="In Progress"?I="Content":I==="Resolved"?I="Under Review":I==="Closed"&&(I="Ready to Leave"),o[I]||(o[I]=[]),o[I].push(C)}),a.innerHTML=ca.map(C=>{const I=o[C.key]||[];return`
        <div class="jira-board-column" data-status="${C.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${v(C.label)}</span>
              <span class="jira-col-badge">${I.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${C.key}">
            ${I.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:I.map(Q=>pt(Q)).join("")}
          </div>
        </div>
      `}).join(""),Oe(),dt()}function pt(a){const o=$t.find(ae=>ae.key===a.category)||$t[0],C=qt.find(ae=>ae.key===a.priority)||qt[2],I=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",Q=(a.subtasks||[]).filter(ae=>ae.completed).length,K=(a.subtasks||[]).length,q=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],F=d?._id||d?.id,W=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(F)||a.userId&&String(a.userId)===String(F),k=e==="superadmin"||d?.role==="superadmin",J=W||k;let te="";if(q.length===0)te='<div class="jira-avatar unassigned" title="Unassigned">?</div>';else{const ae=q.slice(0,3),ie=q.length-3;te=`
        <div class="jira-avatar-group">
          ${ae.map(Y=>`
            <div class="jira-avatar" title="Assignee: ${v(Y.name||"Member")} (${v(Y.role||"")})">
              ${(Y.avatar||Y.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${ie>0?`
            <div class="jira-avatar extra-count" title="${ie} more assignees: ${v(q.slice(3).map(Y=>Y.name).join(", "))}">
              +${ie}
            </div>
          `:""}
        </div>
      `}return`
      <div class="jira-card" draggable="true" data-ticket-id="${a._id}">
        <div class="jira-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="jira-category-pill ${o.slug}">
              ${o.icon} ${o.label}
            </span>
            ${W?`
              <span class="jira-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${a.dueDate?`
              <span class="jira-due-pill ${I?"overdue":""}" title="Due Date">
                ${I?"⚠️ ":"📅 "}
                ${new Date(a.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          ${J?`
            <button type="button" class="jira-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${v(a.ticketId)}" title="Delete Ticket (${k?"Superadmin":"Creator"})">
              🗑️
            </button>
          `:""}
        </div>

        <div class="jira-card-title" title="${v(a.title)}">
          ${v(a.title)}
        </div>

        ${a.jobTitle||a.jobId&&a.jobId.title?`
          <div class="jira-card-job-link" title="Linked Internal Job: ${v(a.jobTitle||a.jobId.title)}">
            📁 ${v(a.jobTitle||a.jobId.title)}
          </div>
        `:""}

        ${a.linkUrl||a.links&&a.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${v(a.linkUrl||a.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="jira-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${v(a.linkUrl||a.links[0]?.url)}">
              🔗 ${a.links&&a.links[0]?.title?v(a.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="jira-card-bottom">
          <div class="jira-card-id-row">
            <span class="jira-pri-icon" title="Priority: ${C.label}">${C.icon}</span>
            <span class="jira-ticket-id">${v(a.ticketId)}</span>
          </div>

          <div class="jira-card-assignee-row">
            ${K>0?`
              <span class="jira-subtask-badge" title="${Q} of ${K} subtasks completed">
                ☑ ${Q}/${K}
              </span>
            `:""}
            ${te}
          </div>
        </div>
      </div>
    `}function Oe(){const a=i.querySelectorAll(".jira-card"),o=i.querySelectorAll(".jira-board-column");a.forEach(C=>{C.ondragstart=I=>{I.dataTransfer.setData("text/plain",C.dataset.ticketId),C.classList.add("dragging")},C.ondragend=()=>{C.classList.remove("dragging")}}),o.forEach(C=>{C.ondragover=I=>{I.preventDefault(),C.classList.add("drag-over")},C.ondragleave=()=>{C.classList.remove("drag-over")},C.ondrop=async I=>{I.preventDefault(),C.classList.remove("drag-over");const Q=I.dataTransfer.getData("text/plain"),K=C.dataset.status;if(!Q||!K)return;const q=l.find(W=>W._id.toString()===Q);if(!q||q.status===K)return;const F=q.status;q.status=K,nt();try{const W=await Qe(`/tickets/${Q}/status`,{status:K});y(`Moved ${W.ticketId} to ${K}`,!1),await de()}catch(W){y(W.message||"Status update failed",!0),q.status=F,await de()}}})}function dt(){i.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async o=>{o.stopPropagation(),o.preventDefault();const C=a.dataset.ticketId,I=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${I}?`)){a.disabled=!0;try{await Xe(`/tickets/${C}`),y(`Ticket ${I} deleted`,!1),await de()}catch(Q){y(Q.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),i.querySelectorAll(".jira-card").forEach(a=>{a.onclick=o=>{if(o.target.tagName==="A"||o.target.closest(".btn-delete-card-ticket"))return;const C=a.dataset.ticketId;ot(C)}})}function qe(){const a=i.querySelector("#btn-jira-refresh");a&&(a.onclick=async()=>{await de(),y("Board updated",!1)});const o=i.querySelector("#btn-jira-create-ticket");o&&(o.onclick=()=>{D()});const C=i.querySelector("#jira-search-input");let I=null;C&&(C.oninput=Y=>{clearTimeout(I),I=setTimeout(async()=>{$.search=Y.target.value.trim(),ze(),await de()},300)});const Q=i.querySelector("#jira-filter-priority");Q&&(Q.onchange=async Y=>{$.priority=Y.target.value,ze(),await de()});const K=i.querySelector("#jira-filter-category");K&&(K.onchange=async Y=>{$.category=Y.target.value,ze(),await de()});const q=i.querySelector("#jira-filter-job");q&&(q.onchange=async Y=>{$.jobId=Y.target.value,ze(),await de()});const F=i.querySelector("#jira-filter-assignee");F&&(F.onchange=async Y=>{$.assigneeId=Y.target.value,ze(),await de()});const W=i.querySelector("#jira-pill-my-issues");W&&(W.onclick=async()=>{$.myIssuesOnly=!$.myIssuesOnly,W.classList.toggle("active",$.myIssuesOnly),ze(),await de()});const k=i.querySelector("#jira-pill-scope-all"),J=i.querySelector("#jira-pill-scope-assigned"),te=i.querySelector("#jira-pill-scope-created"),ae=async Y=>{$.scope=Y,k&&k.classList.toggle("active",Y==="all"),J&&J.classList.toggle("active",Y==="assigned"),te&&te.classList.toggle("active",Y==="created"),ze(),await de()};k&&(k.onclick=()=>ae("all")),J&&(J.onclick=()=>ae("assigned")),te&&(te.onclick=()=>ae("created"));const ie=i.querySelector("#jira-clear-filters");ie&&(ie.onclick=async()=>{$={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},C&&(C.value=""),Q&&(Q.value="all"),K&&(K.value="all");const Y=i.querySelector("#jira-filter-job");Y&&(Y.value="all"),F&&(F.value="all"),W&&W.classList.remove("active"),k&&k.classList.add("active"),J&&J.classList.remove("active"),te&&te.classList.remove("active"),ze(),await de()})}function ze(){const a=i.querySelector("#jira-clear-filters");if(!a)return;const o=$.search||$.priority!=="all"||$.category!=="all"||$.jobId&&$.jobId!=="all"||$.assigneeId!=="all"||$.myIssuesOnly||$.scope&&$.scope!=="all";a.style.display=o?"inline":"none"}async function de(){await Ke(),nt()}async function ot(a){const o=i.querySelector("#jira-modals-root");if(o){o.innerHTML=`
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{j=await Re(`/tickets/${a}`)}catch(C){y(C.message||"Could not load ticket",!0),o.innerHTML="";return}me()}}function me(){const a=i.querySelector("#jira-modals-root");if(!a||!j)return;const o=j,C=$t.find(n=>n.key===o.category)||$t[0];qt.find(n=>n.key===o.priority)||qt[2];const I=o.subtasks||[],Q=I.filter(n=>n.completed).length,K=I.length>0?Math.round(Q/I.length*100):0,q=o.attachments||[],F=o.comments||[],W=(o.history||[]).slice().reverse(),k=o.workLogs||[],J=o.linkedTickets||[],te=d?._id||d?.id,ae=o.reporter&&o.reporter.userId&&String(o.reporter.userId)===String(te)||o.userId&&String(o.userId)===String(te),ie=e==="superadmin"||d?.role==="superadmin",Y=ae||ie,p=Array.isArray(o.assignees)&&o.assignees.length>0?o.assignees:o.assignee&&o.assignee.userId?[o.assignee]:[];p.some(n=>n&&n.userId&&String(n.userId)===String(te));const f=o.jobId?._id?o.jobId._id.toString():o.jobId?o.jobId.toString():"",r=o.jobTitle||o.jobId&&o.jobId.title||"";a.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${C.slug}">${C.icon} ${C.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${v(o.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${v(o.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Description</span>
                  <button type="button" class="jira-tool-btn" id="btn-toggle-desc-edit">
                    ${z?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${z?`
                  <div class="jira-editor-toolbar">
                    <button type="button" class="jira-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="jira-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="jira-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="jira-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${v(o.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${o.description?wa(o.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>🔗 Reference &amp; External Links (${(o.links||[]).length+(o.linkUrl&&!(o.links||[]).some(n=>n.url===o.linkUrl)?1:0)})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-toggle-add-link" style="font-size:11px;padding:4px 9px;">
                    + Add Link
                  </button>
                </div>

                <div id="add-link-form" class="jira-form-box" style="display:none;padding:12px;margin-bottom:10px;">
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <input type="url" id="inp-new-link-url" class="jira-form-input" placeholder="Paste link URL (e.g. https://figma.com/..., https://loom.com/..., live website)..." />
                    <input type="text" id="inp-new-link-title" class="jira-form-input" placeholder="Link label / description (Optional, e.g. Figma UI, Loom Video, Live App)..." />
                    <div style="display:flex;gap:8px;justify-content:flex-end;">
                      <button type="button" class="btn-jira-secondary" id="btn-cancel-new-link" style="font-size:12px;padding:6px 12px;">Cancel</button>
                      <button type="button" class="btn-jira-primary" id="btn-save-new-link" style="font-size:12px;padding:6px 12px;">Save Link 🔗</button>
                    </div>
                  </div>
                </div>

                ${o.links&&o.links.length>0||o.linkUrl?`
                  <div class="jira-links-list" style="display:flex;flex-direction:column;gap:8px;">
                    ${o.linkUrl&&!(o.links||[]).some(n=>n.url===o.linkUrl)?`
                      <div class="jira-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(o.linkUrl)}" target="_blank" rel="noopener noreferrer" class="jira-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(o.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-jira-secondary btn-copy-link" data-url="${v(o.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(o.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-jira-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    `:""}
                    ${(o.links||[]).map(n=>`
                      <div class="jira-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(n.url)}" target="_blank" rel="noopener noreferrer" class="jira-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(n.title||n.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${n.title?`<span style="word-break:break-all;">${v(n.url)}</span> · `:""}Added by ${v(n.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-jira-secondary btn-copy-link" data-url="${v(n.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(n.url)}" target="_blank" rel="noopener noreferrer" class="btn-jira-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                          <button type="button" class="jira-att-del btn-del-link" data-link-id="${n.id}" title="Remove Link">&times;</button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No reference links added yet. Click "+ Add Link" to attach Figma, Loom, Live App, or Drive links.</div>
                `}
              </div>

              <!-- Attachments Section (Fast streaming - any file format up to 1GB) -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Attachments (${q.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${q.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="jira-attachments-grid">
                    ${q.map(n=>{const h=n.type&&n.type.includes("video")||n.name&&n.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||n.url&&n.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="jira-att-card ${h?"is-video":""}" style="${h?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="jira-att-left">
                              <span style="font-size:${h?"16px":"13px"};">${h?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${n.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${v(n.name)}">
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
                              <a href="${n.url}" download="${v(n.name)}" class="btn-jira-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="jira-att-del btn-del-att" data-att-id="${n.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${h?`
                            <div class="jira-video-slot" id="video-slot-${n.id}" style="display:none;margin-top:6px;width:100%;">
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
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Subtasks (${Q}/${I.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${K}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${K}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${I.map(n=>`
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${n.id}" ${n.completed?"checked":""} />
                        <span class="jira-subtask-title ${n.completed?"done":""}">${v(n.title)}</span>
                      </div>
                      <button type="button" class="jira-att-del btn-del-subtask" data-subtask-id="${n.id}" title="Remove subtask">&times;</button>
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
                  <span>Linked Work Items (${J.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${J.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${J.map(n=>`
                      <div class="jira-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${v(n.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${v(n.ticketId)}</span>
                          <span class="jira-linked-title" style="font-size:12.5px;">${v(n.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${v(n.status||"Open")}</span>
                          <button type="button" class="jira-att-del btn-del-link" data-link-id="${n.id}" title="Remove link">&times;</button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

                <div id="jira-link-box" class="jira-form-box" style="display:none;padding:10px;border-radius:6px;margin-top:6px;">
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

              <!-- Dedicated Linked Internal Job Block -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span style="display:flex;align-items:center;gap:6px;">📁 Linked Internal Job</span>
                  <button type="button" class="jira-tool-btn" id="btn-toggle-job-link">
                    ${r?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${r?`
                  <div class="jira-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div class="jira-job-card-title" style="font-weight:700;font-size:13px;">${v(r)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${v(f)}</div>
                      </div>
                    </div>
                    <button type="button" class="jira-tool-btn" id="btn-unlink-job" style="color:#ef4444;border-color:rgba(239,68,68,0.3);" title="Remove job link">
                      ✕ Unlink
                    </button>
                  </div>
                `:`
                  <div style="color:#64748b;font-size:12.5px;font-style:italic;padding:4px 0;">
                    No job linked yet. Click "+ Link a Job" to associate this ticket with a client deliverable or project.
                  </div>
                `}

                <div id="jira-job-link-box" class="jira-form-box" style="display:none;padding:12px;border-radius:6px;margin-top:8px;">
                  <label class="jira-form-label" style="font-size:11.5px;font-weight:700;display:block;margin-bottom:6px;">Choose Job to Link:</label>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="inp-modal-job-select" class="jira-select-field" style="flex:1;min-width:220px;">
                      <option value="">-- Select a Job --</option>
                      ${N.map(n=>`
                        <option value="${n._id}" ${f===n._id.toString()?"selected":""}>
                          📁 ${v(n.title||"Untitled Job")}
                        </option>
                      `).join("")}
                    </select>
                    <button class="btn-jira-primary" id="btn-save-job-link">Link Job</button>
                    <button class="btn-jira-secondary" id="btn-cancel-job-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Activity Tabs Section -->
              <div class="jira-section-block" style="margin-top:10px;">
                <div class="jira-sec-title">Activity</div>
                <div class="jira-activity-tabs">
                  <button type="button" class="jira-act-tab ${R==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${F.length})
                  </button>
                  <button type="button" class="jira-act-tab ${R==="history"?"active":""}" data-act-tab="history">
                    History (${W.length})
                  </button>
                  <button type="button" class="jira-act-tab ${R==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${k.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${R==="comments"?`
                  <div class="jira-comments-feed">
                    ${F.map(n=>`
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(n.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${v(n.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${v(n.userRole)})</span></span>
                            <span class="jira-comment-time">${ta(n.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${wa(n.content)}</div>
                        </div>
                      </div>
                    `).join("")}

                    <!-- Add Comment Composer -->
                    <div class="jira-comment-composer">
                      <div class="jira-avatar" style="background:#3b82f6;">
                        ${(d?.name||"U").slice(0,1).toUpperCase()}
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
                ${R==="history"?`
                  <div class="jira-history-feed">
                    ${W.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:W.map(n=>`
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(n.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span class="jira-comment-author" style="font-size:12px;">${v(n.userName)}</span>
                            <span class="jira-comment-time">${ta(n.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="jira-history-field">${v(n.field)}</strong>:
                            ${n.from?`<span style="text-decoration:line-through;color:#ef4444;">${v(n.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${v(n.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${R==="worklog"?`
                  <div class="jira-worklog-feed">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${o.loggedHours||0} hrs</strong></span>
                      <button class="btn-jira-secondary" id="btn-open-worklog-dialog" style="font-size:11px;padding:4px 8px;">
                        ⏱️ Log Work
                      </button>
                    </div>

                    <div id="jira-worklog-box" class="jira-form-box" style="display:none;padding:10px;border-radius:6px;margin:6px 0;">
                      <div style="display:flex;flex-direction:column;gap:8px;">
                        <input type="text" id="inp-worklog-time" class="jira-subtask-input" placeholder="Time spent (e.g. 2h 30m, 45m)..." />
                        <input type="text" id="inp-worklog-desc" class="jira-subtask-input" placeholder="Description of work performed..." />
                        <div style="display:flex;justify-content:flex-end;gap:6px;">
                          <button class="btn-jira-primary" id="btn-submit-worklog">Log</button>
                          <button class="btn-jira-secondary" id="btn-cancel-worklog">Cancel</button>
                        </div>
                      </div>
                    </div>

                    ${k.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:k.map(n=>`
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(n.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span class="jira-comment-author" style="font-size:12px;">${v(n.userName)} logged <strong style="color:#38bdf8;">${v(n.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${ta(n.loggedAt)}</span>
                          </div>
                          ${n.description?`<div class="jira-comment-body" style="font-size:12px;">${v(n.description)}</div>`:""}
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
                  ${ca.map(n=>{let h=o.status||"To Do";return h==="In Progress"?h="Content":h==="Resolved"?h="Under Review":h==="Closed"&&(h="Ready to Leave"),`
                      <option value="${n.key}" ${h===n.key?"selected":""}>
                        ${n.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${qt.map(n=>`
                    <option value="${n.key}" ${o.priority===n.key?"selected":""}>
                      ${n.icon} ${n.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="jira-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="jira-side-lbl" style="margin-bottom:0;">Assigned Personnel (${p.length})</span>
                  
                    <button type="button" class="jira-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="jira-assigned-chips-wrap">
                  ${p.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:p.map(n=>`
                    <div class="jira-assignee-chip">
                      <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(n.avatar||n.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="jira-assignee-chip-name" title="${v(n.name)}">${v(n.name)}</span>
                      ${`
                        <button type="button" class="jira-assignee-chip-remove btn-remove-assignee" data-user-id="${n.userId}" title="Remove ${v(n.name)}">&times;</button>
                      `}
                    </div>
                  `).join("")}
                </div>

                <!-- Interactive Multi-select Assignee Picker -->
                <div id="jira-detail-assignee-box" class="jira-form-box" style="display:none;margin-top:8px;padding:10px;border-radius:6px;">
                  <div class="jira-assignee-header" style="font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
                    <span>ASSIGN / REASSIGN EMPLOYEES</span>
                    <button type="button" id="btn-close-detail-assignee-box" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:13px;">✕</button>
                  </div>
                  <div class="jira-emp-checklist" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;">
                    ${L.map(n=>{const h=p.some(E=>E&&E.userId&&String(E.userId)===String(n._id));return`
                        <label class="jira-emp-check-item ${h?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${n._id}" ${h?"checked":""} />
                          <div class="jira-avatar" style="width:18px;height:18px;font-size:9px;">${(n.name||"U").slice(0,1).toUpperCase()}</div>
                          <span class="jira-emp-name" style="font-size:12px;flex:1;">
                            ${v(n.name)} <span class="jira-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(n.role)})</span>
                          </span>
                        </label>
                      `}).join("")}
                  </div>
                  <div style="margin-top:8px;display:flex;justify-content:flex-end;gap:6px;">
                    <button type="button" class="btn-jira-primary" id="btn-save-detail-assignees" style="font-size:11px;padding:4px 10px;">
                      Save Assignees
                    </button>
                  </div>
                </div>
              </div>

              <!-- Reporter (Read Only) -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Reporter</span>
                <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                  <div class="jira-avatar" style="background:#2563eb;">
                    ${(o.reporter?.name||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${v(o.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${v(o.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${$t.map(n=>`
                    <option value="${n.key}" ${o.category===n.key?"selected":""}>
                      ${n.icon} ${n.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="jira-date-field" value="${o.dueDate?new Date(o.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="jira-select-field">
                  <option value="">None (Workspace General)</option>
                  ${N.map(n=>`
                    <option value="${n._id}" ${f===n._id.toString()?"selected":""}>
                      📁 ${v(n.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${o.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" class="jira-est-input" value="${o.estimatedHours||0}" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(o.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(o.updatedAt).toLocaleString()}</div>
                ${o.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(o.resolvedAt).toLocaleString()}</div>`:""}
              </div>

              <!-- Actions (Delete - Creator or Superadmin) -->
              ${Y?`
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
    `,m()}function m(){const a=i.querySelector("#jira-modals-root");if(!a||!j)return;const o=a.querySelector("#btn-close-jira-modal");o&&(o.onclick=_);const C=a.querySelector("#jira-detail-backdrop");C&&(C.onclick=A=>{A.target===C&&_()});const I=a.querySelector("#inp-detail-title");I&&(I.onchange=async()=>{const A=I.value.trim();if(A)try{j=await Qe(`/tickets/${j._id}`,{title:A}),await de()}catch(B){y(B.message||"Failed to update title",!0)}});const Q=a.querySelector("#btn-toggle-desc-edit");Q&&(Q.onclick=()=>{z=!z,me()});const K=a.querySelector("#btn-cancel-desc");K&&(K.onclick=()=>{z=!1,me()});const q=a.querySelector("#btn-save-desc");q&&(q.onclick=async()=>{const A=a.querySelector("#inp-detail-desc")?.value;try{j=await Qe(`/tickets/${j._id}`,{description:A}),z=!1,me(),await de(),y("Description saved",!1)}catch(B){y(B.message||"Failed to save description",!0)}});const F=a.querySelector("#sel-detail-status");F&&(F.onchange=async A=>{try{const B=await Qe(`/tickets/${j._id}/status`,{status:A.target.value});j=B,me(),await et(),it(),await de(),y(`Status changed to ${B.status}`,!1)}catch(B){y(B.message||"Status change failed",!0)}});const W=a.querySelector("#sel-detail-priority");W&&(W.onchange=async A=>{try{j=await Qe(`/tickets/${j._id}`,{priority:A.target.value}),me(),await de()}catch(B){y(B.message,!0)}});const k=a.querySelector("#btn-toggle-assignee-picker"),J=a.querySelector("#jira-detail-assignee-box"),te=a.querySelector("#btn-close-detail-assignee-box"),ae=a.querySelector("#btn-save-detail-assignees");k&&J&&(k.onclick=()=>{const A=J.style.display==="none";J.style.display=A?"block":"none"}),te&&J&&(te.onclick=()=>{J.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(A=>{A.onchange=()=>{A.closest(".jira-emp-check-item")?.classList.toggle("selected",A.checked)}}),ae&&(ae.onclick=async()=>{const A=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(B=>B.value);try{ae.disabled=!0,j=await Qe(`/tickets/${j._id}`,{assigneeIds:A}),me(),await de(),y("Assignees updated!",!1)}catch(B){y(B.message,!0),ae.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(A=>{A.onclick=async()=>{const B=A.dataset.userId,De=(Array.isArray(j.assignees)&&j.assignees.length>0?j.assignees:j.assignee?.userId?[j.assignee]:[]).filter(ye=>ye&&ye.userId&&String(ye.userId)!==String(B)).map(ye=>String(ye.userId));try{j=await Qe(`/tickets/${j._id}`,{assigneeIds:De}),me(),await de(),y("Assignee removed",!1)}catch(ye){y(ye.message,!0)}}});const ie=a.querySelector("#sel-detail-category");ie&&(ie.onchange=async A=>{try{j=await Qe(`/tickets/${j._id}`,{category:A.target.value}),me(),await de()}catch(B){y(B.message,!0)}});const Y=a.querySelector("#inp-detail-duedate");Y&&(Y.onchange=async A=>{try{j=await Qe(`/tickets/${j._id}`,{dueDate:A.target.value||null}),me(),await de()}catch(B){y(B.message,!0)}});const p=a.querySelector("#sel-detail-job");p&&(p.onchange=async A=>{try{j=await Qe(`/tickets/${j._id}`,{jobId:A.target.value||null}),me(),await de(),y(A.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(B){y(B.message,!0)}});const f=a.querySelector("#btn-toggle-job-link"),r=a.querySelector("#jira-job-link-box");f&&r&&(f.onclick=()=>{r.style.display=r.style.display==="none"?"block":"none"});const n=a.querySelector("#btn-cancel-job-link");n&&r&&(n.onclick=()=>{r.style.display="none"});const h=a.querySelector("#btn-save-job-link");h&&(h.onclick=async()=>{const A=a.querySelector("#inp-modal-job-select")?.value||null;try{j=await Qe(`/tickets/${j._id}`,{jobId:A}),me(),await de(),y(A?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(B){y(B.message,!0)}});const E=a.querySelector("#btn-unlink-job");E&&(E.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{j=await Qe(`/tickets/${j._id}`,{jobId:null}),me(),await de(),y("Job unlinked",!1)}catch(A){y(A.message,!0)}});const S=a.querySelector("#inp-detail-esthours");S&&(S.onchange=async A=>{try{j=await Qe(`/tickets/${j._id}`,{estimatedHours:Number(A.target.value)||0})}catch(B){y(B.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(A=>{A.onchange=async()=>{const B=A.dataset.subtaskId;try{j=await Qe(`/tickets/${j._id}/subtasks/${B}`,{completed:A.checked}),me(),await de()}catch(u){y(u.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(A=>{A.onclick=async()=>{const B=A.dataset.subtaskId;try{j=await Xe(`/tickets/${j._id}/subtasks/${B}`),me(),await de()}catch(u){y(u.message,!0)}}});const U=a.querySelector("#inp-new-subtask"),re=a.querySelector("#btn-add-subtask"),M=async()=>{const A=U?.value.trim();if(A)try{j=await Ce(`/tickets/${j._id}/subtasks`,{title:A}),me(),await de()}catch(B){y(B.message,!0)}};re&&(re.onclick=M),U&&(U.onkeydown=A=>{A.key==="Enter"&&(A.preventDefault(),M())});const P=a.querySelector("#btn-toggle-add-link"),G=a.querySelector("#add-link-form"),_e=a.querySelector("#btn-cancel-new-link"),fe=a.querySelector("#btn-save-new-link"),se=a.querySelector("#inp-new-link-url"),ue=a.querySelector("#inp-new-link-title");P&&G&&(P.onclick=()=>{const A=G.style.display==="none";G.style.display=A?"block":"none",A&&se&&se.focus()}),_e&&G&&(_e.onclick=()=>{G.style.display="none",se&&(se.value=""),ue&&(ue.value="")}),fe&&se&&(fe.onclick=async()=>{const A=se.value.trim(),B=ue?.value.trim()||"";if(!A){y("Please enter a valid URL link",!0);return}try{fe.disabled=!0,fe.textContent="Saving...",j=await Ce(`/tickets/${j._id}/links`,{url:A,title:B}),me(),await de(),y("Reference link added! 🔗",!1)}catch(u){y(u.message||"Failed to save link",!0),fe.disabled=!1,fe.textContent="Save Link 🔗"}}),a.querySelectorAll(".btn-copy-link").forEach(A=>{A.onclick=()=>{const B=A.dataset.url;B&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(B).then(()=>{y("Link copied to clipboard! 📋")}).catch(()=>{y("Link: "+B)}):y("Link: "+B))}}),a.querySelectorAll(".btn-del-link").forEach(A=>{A.onclick=async()=>{const B=A.dataset.linkId;try{j=await Xe(`/tickets/${j._id}/links/${B}`),me(),await de(),y("Link removed")}catch(u){y(u.message||"Failed to remove link",!0)}}});const H=a.querySelector("#btn-trigger-detail-upload"),le=a.querySelector("#inp-detail-att-upload"),be=a.querySelector("#detail-att-upload-progress");H&&le&&(H.onclick=A=>{A.preventDefault(),le.click()}),le&&(le.onchange=async()=>{const A=Array.from(le.files||[]);if(le.value="",!!A.length){be&&(be.style.display="block",be.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${A.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const u=(await ba(A,De=>{const ye=a.querySelector("#att-prog-pct"),st=a.querySelector("#att-prog-bar");ye&&(ye.textContent=`${De}%`),st&&(st.style.width=`${De}%`)})).map(De=>({name:De.name,url:De.url,size:De.size||0,type:De.type||"application/octet-stream"}));u.length&&(j=await Ce(`/tickets/${j._id}/attachments`,{attachments:u}),me(),y(`Successfully attached ${u.length} file(s)! 📎`,!1))}catch(B){console.error("Upload error:",B),y(`Upload failed: ${B.message}`,!0)}finally{be&&(be.style.display="none")}}}),a.querySelectorAll(".btn-play-att-video").forEach(A=>{A.onclick=()=>{const B=A.dataset.slot,u=a.querySelector("#"+B);if(u){const De=u.style.display==="none";u.style.display=De?"block":"none",A.textContent=De?"⏸ Close Video":"▶ Play Video";const ye=u.querySelector("video");ye&&De?ye.play().catch(()=>{}):ye&&ye.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(A=>{A.onclick=async()=>{const B=A.dataset.attId;try{j=await Xe(`/tickets/${j._id}/attachments/${B}`),me()}catch(u){y(u.message,!0)}}}),a.querySelectorAll(".jira-act-tab").forEach(A=>{A.onclick=()=>{R=A.dataset.actTab,me()}});const ge=a.querySelector("#inp-new-comment"),xe=a.querySelector("#btn-submit-comment");xe&&ge&&(xe.onclick=async()=>{const A=ge.value.trim();if(A)try{xe.disabled=!0,xe.textContent="Saving...",j=await Ce(`/tickets/${j._id}/comments`,{content:A}),me(),y("Comment added",!1)}catch(B){y(B.message||"Failed to add comment",!0)}finally{xe.disabled=!1}});const Ee=a.querySelector("#btn-open-link-dialog"),Be=a.querySelector("#jira-link-box"),Ge=a.querySelector("#btn-cancel-link"),Le=a.querySelector("#btn-submit-link"),ce=a.querySelector("#inp-link-target"),Te=a.querySelector("#sel-link-rel");Ee&&Be&&(Ee.onclick=()=>{Be.style.display="block"}),Ge&&Be&&(Ge.onclick=()=>{Be.style.display="none"}),Le&&Be&&(Le.onclick=async()=>{const A=ce?.value.trim(),B=Te?.value||"relates to";if(A)try{Le.disabled=!0,j=await Ce(`/tickets/${j._id}/links`,{targetTicketId:A,relationship:B}),me(),y(`Linked with ${A}`,!1)}catch(u){y(u.message||"Failed to link ticket",!0)}finally{Le.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(A=>{A.onclick=async()=>{const B=A.dataset.linkId;try{j=await Xe(`/tickets/${j._id}/links/${B}`),me()}catch(u){y(u.message,!0)}}});const Ue=a.querySelector("#btn-open-worklog-dialog"),Ne=a.querySelector("#jira-worklog-box"),Ae=a.querySelector("#btn-cancel-worklog"),Ie=a.querySelector("#btn-submit-worklog"),Se=a.querySelector("#inp-worklog-time"),he=a.querySelector("#inp-worklog-desc");Ue&&Ne&&(Ue.onclick=()=>{Ne.style.display="block"}),Ae&&Ne&&(Ae.onclick=()=>{Ne.style.display="none"}),Ie&&Ne&&(Ie.onclick=async()=>{const A=Se?.value.trim(),B=he?.value.trim();if(!A){y("Enter time spent (e.g. 2h 30m)",!0);return}try{Ie.disabled=!0,j=await Ce(`/tickets/${j._id}/worklogs`,{timeSpent:A,description:B}),me(),y("Work logged",!1)}catch(u){y(u.message||"Failed to log work",!0)}finally{Ie.disabled=!1}});const je=a.querySelector("#btn-delete-ticket");je&&(je.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${j.ticketId}?`))try{je.disabled=!0,await Xe(`/tickets/${j._id}`),y(`Ticket ${j.ticketId} deleted`,!1),_(),await et(),it(),await de()}catch(A){y(A.message||"Failed to delete ticket",!0),je.disabled=!1}})}function _(){j=null,z=!1;const a=i.querySelector("#jira-modals-root");a&&(a.innerHTML="")}function D(a=null){const o=i.querySelector("#jira-modals-root");if(!o)return;const C=a||($.jobId&&$.jobId!=="all"?$.jobId:null);o.innerHTML=`
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
                  ${$t.map(r=>`<option value="${r.key}">${r.icon} ${r.label}</option>`).join("")}
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

            <div class="jira-form-group">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="jira-form-label" style="margin-bottom:0;">Assign Employees (Choose one or multiple)</label>
                <div style="display:flex;gap:8px;">
                  <button type="button" id="btn-create-assign-self" style="background:none;border:none;color:#38bdf8;font-size:11px;font-weight:600;cursor:pointer;text-decoration:underline;">
                    + Select Myself
                  </button>
                  <button type="button" id="btn-create-clear-assign" style="background:none;border:none;color:#94a3b8;font-size:11px;cursor:pointer;">
                    Clear All
                  </button>
                </div>
              </div>

              <div class="jira-emp-checklist-box">
                <div class="jira-emp-checklist" id="create-emp-checklist">
                  ${L.map(r=>{const n=d&&String(d._id||d.id)===String(r._id);return`
                      <label class="jira-emp-check-item ${n?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${r._id}" ${n?"checked":""} />
                        <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(r.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="jira-emp-name" style="font-size:12px;flex:1;">
                          ${v(r.name)} <span class="jira-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(r.role)})${n?" — (You)":""}</span>
                        </span>
                      </label>
                    `}).join("")}
                </div>
              </div>
              <div id="create-assignee-hint" style="font-size:11px;color:#94a3b8;margin-top:4px;">
                Check all employees you want to assign to this ticket.
              </div>
            </div>

            <div class="jira-form-grid-2">
              <div class="jira-form-group">
                <label class="jira-form-label">Due Date (Optional)</label>
                <input type="date" id="create-ticket-duedate" class="jira-date-field" />
              </div>

              <div class="jira-form-group">
                <label class="jira-form-label">Related Job / Internal Project (Optional)</label>
                <select id="create-ticket-job" class="jira-select-field">
                  <option value="">None (General Workspace Issue)</option>
                  ${N.map(r=>`
                    <option value="${r._id}" ${C&&String(C)===String(r._id)?"selected":""}>
                      📁 ${v(r.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>
            </div>

            <!-- External Reference URL / Link -->
            <div class="jira-form-group">
              <label class="jira-form-label">🔗 External Reference Link / URL (Optional)</label>
              <input type="url" id="create-ticket-url" class="jira-form-input" placeholder="e.g. https://figma.com/..., https://loom.com/..., live website URL, Google Drive..." />
            </div>

            <!-- Attachments & Fast File Uploader (Up to 1GB) -->
            <div class="jira-form-group" style="margin-top:14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="jira-form-label" style="margin:0;">Attachments &amp; Files (All formats up to 1GB)</label>
                <span id="create-att-count" style="font-size:11px;color:#94a3b8;">0 files attached</span>
              </div>
              <label class="jira-att-dropzone" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px;border-radius:8px;cursor:pointer;transition:border-color 0.2s;">
                <div style="font-size:18px;">📁 ⚡</div>
                <div style="font-size:12px;font-weight:600;color:#e2e8f0;">Click or drag &amp; drop files or videos here</div>
                <div style="font-size:10.5px;color:#64748b;">Fast parallel uploading: MP4, MOV, WebM, images, PDFs, archives (Up to 1GB supported)</div>
                <input type="file" id="inp-create-ticket-att" multiple style="display:none;" />
              </label>
              <div id="create-att-progress" style="display:none;margin-top:8px;"></div>
              <div id="create-att-list" class="jira-attachments-grid" style="margin-top:8px;"></div>
            </div>
          </div>

          <div class="jira-modal-footer">
            <button type="button" class="btn-jira-secondary" id="btn-cancel-create-ticket">Cancel</button>
            <button type="button" class="btn-jira-primary" id="btn-submit-create-ticket">Create Ticket 🚀</button>
          </div>
        </div>
      </div>
    `;const I=()=>{o.querySelectorAll(".jira-emp-check-item").forEach(r=>{const n=r.querySelector(".chk-create-emp");r.classList.toggle("selected",!!n?.checked)})};o.querySelectorAll(".chk-create-emp").forEach(r=>{r.onchange=I});const Q=o.querySelector("#btn-create-assign-self");Q&&d&&(Q.onclick=()=>{const r=String(d._id||d.id);o.querySelectorAll(".chk-create-emp").forEach(n=>{n.value===r&&(n.checked=!0)}),I()});const K=o.querySelector("#btn-create-clear-assign");K&&(K.onclick=()=>{o.querySelectorAll(".chk-create-emp").forEach(r=>{r.checked=!1}),I()});const q=[],F=o.querySelector("#inp-create-ticket-att"),W=o.querySelector("#create-att-list"),k=o.querySelector("#create-att-count"),J=o.querySelector("#create-att-progress"),te=()=>{k&&(k.textContent=`${q.length} file(s) attached`),W&&(W.innerHTML=q.map((r,n)=>{const h=r.type&&r.type.includes("video")||r.name&&r.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="jira-att-card">
            <div class="jira-att-left">
              <span>${h?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="jira-att-name" title="${v(r.name)}">${v(r.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${ga(r.size)} ${h?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="jira-att-del btn-del-pending-att" data-idx="${n}" title="Remove">&times;</button>
          </div>
        `}).join(""),W.querySelectorAll(".btn-del-pending-att").forEach(r=>{r.onclick=()=>{q.splice(Number(r.dataset.idx),1),te()}}))};F&&(F.onchange=async()=>{const r=Array.from(F.files||[]);if(F.value="",!!r.length){J&&(J.style.display="block",J.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${r.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await ba(r,h=>{const E=o.querySelector("#create-prog-pct"),S=o.querySelector("#create-prog-bar");E&&(E.textContent=`${h}%`),S&&(S.style.width=`${h}%`)})).forEach(h=>{q.push({name:h.name,url:h.url,size:h.size||0,type:h.type||"application/octet-stream"})}),te()}catch(n){y(`Failed to upload files: ${n.message}`,!0)}finally{J&&(J.style.display="none"),F.value=""}}});const ae=()=>{o.innerHTML=""},ie=o.querySelector("#btn-close-create-modal");ie&&(ie.onclick=ae);const Y=o.querySelector("#btn-cancel-create-ticket");Y&&(Y.onclick=ae);const p=o.querySelector("#jira-create-backdrop");p&&(p.onclick=r=>{r.target===p&&ae()});const f=o.querySelector("#btn-submit-create-ticket");f&&(f.onclick=async()=>{const r=o.querySelector("#create-ticket-title")?.value.trim(),n=o.querySelector("#create-ticket-desc")?.value.trim(),h=o.querySelector("#create-ticket-cat")?.value||"Task",E=o.querySelector("#create-ticket-pri")?.value||"Medium",U=Array.from(o.querySelectorAll(".chk-create-emp:checked")).map(G=>G.value),re=o.querySelector("#create-ticket-duedate")?.value||null,M=o.querySelector("#create-ticket-job")?.value||null,P=o.querySelector("#create-ticket-url")?.value.trim()||"";if(!r){y("Ticket summary / title is required",!0);return}try{f.disabled=!0,f.textContent="Creating...";const G=await Ce("/tickets",{title:r,description:n,category:h,priority:E,assigneeIds:U,assigneeId:U[0]||null,dueDate:re,jobId:M,linkUrl:P,attachments:q});y(`Ticket ${G.ticketId} created! 🎫`,!1),ae(),await et(),it(),await de(),ot(G._id)}catch(G){y(G.message||"Could not create ticket",!0),f.disabled=!1,f.textContent="Create Ticket 🚀"}})}i._openCreateTicketModal=D,i._openTicketDetailModal=ot,i._setJobFilter=async a=>{$.jobId=a||"all";const o=i.querySelector("#jira-filter-job");o&&(o.value=$.jobId),ze(),await de()}}export{ii as a,ai as b,ti as i};
