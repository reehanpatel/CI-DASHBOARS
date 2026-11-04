import{c as ze,h as x,e as h,n as Ve,j as Ye,o as Ut,k as Kt,g as ke,p as pa,t as Zt,u as ua}from"./api-CM-riqyf.js";const ga={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function wa(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},ga,JSON.parse(i))}catch{}return Object.assign({},ga)}function $a(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function it(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),l=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${l}`}function Ht(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const l=e.getFullYear(),c=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${l}-${c}-${n}`}function $t(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function ft(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ba(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function ea(i,t=1){const e=new Date(i+"T00:00:00"),l=e.getDay(),c=(l<t?7:0)+l-t,n=new Date(e);n.setDate(e.getDate()-c);const v=[];for(let s=0;s<7;s++){const M=new Date(n);M.setDate(n.getDate()+s);const R=M.getFullYear(),S=String(M.getMonth()+1).padStart(2,"0"),T=String(M.getDate()).padStart(2,"0");v.push(`${R}-${S}-${T}`)}return v}function Sa(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,l=t.createOscillator(),c=t.createGain();l.type="sine",l.frequency.setValueAtTime(523.25,e),l.frequency.exponentialRampToValueAtTime(783.99,e+.15),c.gain.setValueAtTime(.2,e),c.gain.exponentialRampToValueAtTime(.001,e+.35),l.connect(c),c.connect(t.destination),l.start(e),l.stop(e+.35)}catch{}}function Qa(i,t={}){const{userRole:e="employee",currentUser:l=null,onNavigate:c=null}=t,n=e==="superadmin"||e==="admin";let v=wa(),s={selectedDate:it(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ca(),M();async function M(){s.loading=!0,R();try{const m=[ze("/tasks")];n&&m.push(ze("/personnel").catch(()=>[]));const[_,I]=await Promise.all(m);s.tasks=Array.isArray(_)?_:[],I&&(s.personnelList=Array.isArray(I)?I:[])}catch(m){x("Failed to load planner tasks: "+m.message,!0)}finally{s.loading=!1,B()}}function R(){i.innerHTML=`
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
    `}function S(m){return s.tasks.filter(_=>{if(_.isDeleted===!0)return!1;if(n&&s.selectedPersonnelId!=="all"){const a=_.personnelId?._id||_.personnelId;if(String(a)!==String(s.selectedPersonnelId))return!1}const I=_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):"");return I?I===m:m===it()})}function T(m,_){if(m.status==="Completed")return!1;const I=m.dateStr||(m.dueDate?new Date(m.dueDate).toISOString().slice(0,10):"");return I?I<_:!1}function P(m,_){const I=m.length,a=m.filter(W=>W.status==="Completed").length,r=m.filter(W=>W.status==="In Progress").length,C=m.filter(W=>W.status==="Pending"||W.status==="Todo").length,A=m.filter(W=>T(W,_)).length,Y=I>0?Math.round(a/I*100):0;return{total:I,completed:a,inProgress:r,pending:C,overdue:A,percent:Y}}function B(){const m=it(),_=s.selectedDate===m,I=S(s.selectedDate),a=P(I,m);i.innerHTML=`
      <div class="ci360-planner-wrap ${v.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${ft(s.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${h(v.displayName||"Daily Planner")}</h1>
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
              <span class="date-text" id="displayDateLabel">${$t(s.selectedDate)}</span>
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
          ${n?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${s.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${s.personnelList.map(r=>`
                  <option value="${r._id}" ${s.selectedPersonnelId===String(r._id)?"selected":""}>
                    ${h(r.name)} (${h(r.department||r.role||"Team")})
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
          ${ue(I,a)}
        </main>

      </div>
    `,Ce(),ct()}function ue(m,_){return s.viewMode==="weekly"?dt():s.viewMode==="report"?xt():ve(m,_)}function ve(m,_){const I=it();let a=m;if(s.filterStatus==="pending"?a=a.filter(r=>r.status==="Pending"||r.status==="Todo"):s.filterStatus==="in_progress"?a=a.filter(r=>r.status==="In Progress"):s.filterStatus==="completed"?a=a.filter(r=>r.status==="Completed"):s.filterStatus==="overdue"&&(a=a.filter(r=>T(r,I))),s.searchQuery){const r=s.searchQuery.toLowerCase();a=a.filter(C=>(C.title||"").toLowerCase().includes(r)||(C.description||"").toLowerCase().includes(r)||(C.category||"").toLowerCase().includes(r))}return a.sort((r,C)=>{if(r.status==="Completed"&&C.status!=="Completed")return 1;if(r.status!=="Completed"&&C.status==="Completed")return-1;const A={Urgent:0,High:1,Medium:2,Low:3};return(A[r.priority]||2)-(A[C.priority]||2)}),`
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
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${h(s.searchQuery)}">
              ${s.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card / Past Date Locked Banner -->
        ${s.selectedDate<I?`
          <div class="ci360-past-date-banner" style="display:flex;align-items:center;gap:10px;padding:12px 18px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.22);border-radius:10px;font-size:12.5px;color:#f87171;margin-bottom:16px;box-sizing:border-box;">
            <span style="font-size:16px;">🔒</span>
            <span><strong>Date Passed:</strong> Tasks cannot be added or edited for <strong>${$t(s.selectedDate)}</strong> because this date has already passed.</span>
          </div>
        `:`
          <div class="ci360-quick-add-bar">
            <div class="ci360-quick-add-input-wrap">
              <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${ft(s.selectedDate)}... (Press Enter to save)">
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
          ${a.length===0?Oe():`
            <div class="ci360-task-list">
              ${a.map(r=>Qe(r,I)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function Oe(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${ft(s.selectedDate)}</h3>
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
    `}function Qe(m,_){const I=m.status==="Completed",a=T(m,_),r=m.dateStr||(m.dueDate?new Date(m.dueDate).toISOString().slice(0,10):_),C=!n&&r<_,A=`pri-${(m.priority||"medium").toLowerCase()}`,Y=`status-${(m.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${I?"is-completed":""} ${a?"is-overdue":""}" data-id="${m._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${I?"checked":""}" data-action="toggle" data-id="${m._id}" title="${I?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${h(m.title)}</span>
          </div>

          ${m.description?`
            <div class="ci360-task-desc">${h(m.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${A}">
              <span class="badge-dot"></span>
              ${h(m.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${Y}">
              ${h(m.status||"Pending")}
            </span>

            <!-- Category -->
            ${m.category?`
              <span class="ci360-badge category-badge">
                #${h(m.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${m.startTime||m.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${m.startTime?h(m.startTime):""}
                   ${m.startTime&&m.dueTime?"–":""}
                   ${m.dueTime?h(m.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${a?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${n&&(m.personnelId?.name||m.userId?.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${h(m.personnelId?.name||m.userId?.name)}
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
    `}function dt(){const m=ea(s.selectedDate,v.weekStartsOn),_=ft(m[0]),I=ft(m[6]),a=it();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${_} – ${I}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${m.map(r=>{const C=r===a,A=r===s.selectedDate,Y=S(r),W=P(Y,a);return`
              <div class="ci360-day-column ${C?"is-today":""} ${A?"is-selected":""}" data-date="${r}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${r}">
                  <div class="day-name">${ba(r)}</div>
                  <div class="day-number">${new Date(r+"T00:00:00").getDate()}</div>
                  ${C?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${W.completed}/${W.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${W.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${Y.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:Y.map(L=>`
                    <div class="ci360-mini-task-card ${L.status==="Completed"?"done":""}" data-id="${L._id}">
                      <button type="button" class="mini-check ${L.status==="Completed"?"checked":""}" data-action="toggle" data-id="${L._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${L._id}">
                        <div class="mini-title">${h(L.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(L.priority||"medium").toLowerCase()}">${L.priority||"Med"}</span>
                          ${L.dueTime?`<span class="mini-time">${h(L.dueTime)}</span>`:""}
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
    `}function xt(){const m=ea(s.selectedDate,v.weekStartsOn),_=$t(m[0]),I=$t(m[6]),a=it(),r=s.tasks.filter(F=>{if(F.isDeleted===!0)return!1;const U=F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):"");return m.includes(U)}),C=r.length,A=r.filter(F=>F.status==="Completed").length,Y=r.filter(F=>F.status==="In Progress").length,W=C>0?Math.round(A/C*100):0,L={Urgent:0,High:0,Medium:0,Low:0};return r.forEach(F=>{const U=F.priority||"Medium";L[U]!==void 0&&L[U]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${_} – ${I}</div>
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
            <span class="value" style="font-size:28px;color:var(--amber-500)">${Y}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${W}%</span>
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
                ${m.map(F=>{const U=S(F),y=P(U,a);return`
                    <tr>
                      <td><strong>${ba(F)}</strong></td>
                      <td>${ft(F)}</td>
                      <td>${y.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${y.completed}</td>
                      <td>${y.pending+y.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${y.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${y.percent}%</span>
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
    `}function Ce(){const m=document.getElementById("btnViewDaily"),_=document.getElementById("btnViewWeekly"),I=document.getElementById("btnViewReport");m&&(m.onclick=()=>{s.viewMode="daily",B()}),_&&(_.onclick=()=>{s.viewMode="weekly",B()}),I&&(I.onclick=()=>{s.viewMode="report",B()});const a=document.getElementById("btnPrevDay"),r=document.getElementById("btnNextDay"),C=document.getElementById("btnJumpToday"),A=document.getElementById("hiddenDateInput"),Y=document.getElementById("datePickerBadge");a&&(a.onclick=()=>{s.selectedDate=Ht(s.selectedDate,-1),B()}),r&&(r.onclick=()=>{s.selectedDate=Ht(s.selectedDate,1),B()}),C&&(C.onclick=()=>{s.selectedDate=it(),B()}),Y&&A&&(Y.onclick=()=>{try{typeof A.showPicker=="function"?A.showPicker():A.focus()}catch{A.focus()}},A.onchange=p=>{p.target.value&&(s.selectedDate=p.target.value,B())});const W=document.getElementById("admTeamSelect");W&&(W.onchange=p=>{s.selectedPersonnelId=p.target.value,B()});const L=document.getElementById("btnOpenAddTaskModal");L&&(L.onclick=()=>Ae());const F=document.getElementById("btnPlannerActionsMenu"),U=document.getElementById("plannerActionsDropdown");F&&U&&(F.onclick=p=>{p.stopPropagation(),U.classList.toggle("hidden")},document.addEventListener("click",p=>{!U.contains(p.target)&&p.target!==F&&U.classList.add("hidden")}));const y=document.getElementById("btnActionImport");y&&(y.onclick=()=>{U?.classList.add("hidden"),nt()});const G=document.getElementById("btnActionExportPng");G&&(G.onclick=()=>{U?.classList.add("hidden"),rt()});const ae=document.getElementById("btnActionExportPdf");ae&&(ae.onclick=()=>{U?.classList.add("hidden"),ce()});const re=document.getElementById("btnActionBackup");re&&(re.onclick=()=>{U?.classList.add("hidden"),tt()});const u=document.getElementById("btnActionSettings");u&&(u.onclick=()=>{U?.classList.add("hidden"),be()})}function ct(m){if(s.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(L=>{L.onclick=()=>{s.filterStatus=L.dataset.f,B()}});const _=document.getElementById("plannerTaskSearchInp");_&&(_.oninput=L=>{s.searchQuery=L.target.value,B()});const I=document.getElementById("btnClearSearch");I&&(I.onclick=()=>{s.searchQuery="",B()});const a=document.getElementById("quickAddTitleInp"),r=document.getElementById("quickAddPriority"),C=document.getElementById("quickAddCategory"),A=document.getElementById("btnQuickAddSubmit"),Y=async()=>{const L=(a?.value||"").trim();if(!L){x("Please enter a task title",!0),a?.focus();return}try{const F={title:L,dateStr:s.selectedDate,priority:r?.value||v.defaultPriority,category:C?.value||"General",status:"Pending"};n&&s.selectedPersonnelId!=="all"&&(F.personnelId=s.selectedPersonnelId);const U=await ke("/tasks",F);s.tasks.unshift(U),x("Task added to today's focus! ✨"),a&&(a.value="",a.focus()),B()}catch(F){x(F.message,!0)}};A&&(A.onclick=Y),a&&(a.onkeydown=L=>{L.key==="Enter"&&Y()});const W=document.getElementById("btnEmptyStateImport");W&&(W.onclick=()=>nt())}if(s.viewMode==="weekly"){const _=document.getElementById("btnPrevWeek"),I=document.getElementById("btnNextWeek"),a=document.getElementById("btnThisWeek");_&&(_.onclick=()=>{s.selectedDate=Ht(s.selectedDate,-7),B()}),I&&(I.onclick=()=>{s.selectedDate=Ht(s.selectedDate,7),B()}),a&&(a.onclick=()=>{s.selectedDate=it(),B()}),document.querySelectorAll(".day-col-header").forEach(r=>{r.onclick=()=>{s.selectedDate=r.dataset.date,s.viewMode="daily",B()}}),document.querySelectorAll('[data-action="add-day"]').forEach(r=>{r.onclick=()=>{Ae(null,r.dataset.date)}})}if(s.viewMode==="report"){const _=document.getElementById("btnDownloadWeeklyPdf");_&&(_.onclick=ce)}i.querySelectorAll('[data-action="toggle"]').forEach(_=>{_.onclick=async I=>{I.stopPropagation();const a=_.dataset.id;await Fe(a)}}),i.querySelectorAll('[data-action="edit"]').forEach(_=>{_.onclick=I=>{I.stopPropagation();const a=_.dataset.id,r=s.tasks.find(C=>C._id===a);r&&Ae(r)}}),i.querySelectorAll('[data-action="delete"]').forEach(_=>{_.onclick=async I=>{I.stopPropagation();const a=_.dataset.id;await pt(a)}})}async function Fe(m){const _=s.tasks.find(a=>a._id===m);if(!_)return;const I=_.status!=="Completed";try{const a=await Ve(`/tasks/${m}/toggle`,{}),r=s.tasks.findIndex(C=>C._id===m);r!==-1&&(s.tasks[r]=a),I?(v.soundEnabled&&Sa(),x("Task marked as completed! 🎉")):x("Task reopened as pending."),B()}catch(a){x(a.message,!0)}}async function pt(m){const _=s.tasks.find(I=>I._id===m);if(_&&confirm(`Are you sure you want to remove "${_.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Ye(`/tasks/${m}`),s.tasks=s.tasks.filter(I=>I._id!==m),x("Task removed from planner (safely stored in database archive)"),B()}catch(I){x(I.message,!0)}}function Ae(m=null,_=null){const I=!!m,a=m?m.dateStr||(m.dueDate?new Date(m.dueDate).toISOString().slice(0,10):s.selectedDate):_||s.selectedDate,r=it();if(!n&&a<r){x("Tasks cannot be added or edited after the date is gone.",!0);return}const C=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${I?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${h(m?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${h(m?.description||"")}</textarea>
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
                <option value="Medium" ${!m&&v.defaultPriority==="Medium"||m?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!m&&v.defaultPriority==="High"||m?.priority==="High"?"selected":""}>High</option>
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
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${h(m?.category||"General")}">
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
          ${n?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!m||m?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${s.personnelList.map(y=>{const G=m?.personnelId?._id===y._id||m?.personnelId===y._id;return`<option value="${y._id}" ${G?"selected":""}>${h(y.name)} (${h(y.department||y.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${I&&(n||a>=r)?`
                <button type="button" class="btn danger small" id="btnModalDeleteTask" style="padding:6px 12px;background:#ef4444;color:#fff;border-radius:var(--r-sm);border:none;cursor:pointer;font-weight:700;font-size:12px;">🗑️ Delete Task</button>
              `:""}
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
              <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
                ${I?"Save Changes":"Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    `,A=Ut(C),Y=A.querySelector("#taskForm"),W=A.querySelector("#btnModalClose"),L=A.querySelector("#btnCancelModal"),F=A.querySelector("#btnModalDeleteTask"),U=()=>A.remove();W&&(W.onclick=U),L&&(L.onclick=U),F&&m&&(F.onclick=async()=>{U(),await pt(m._id)}),Y.onsubmit=async y=>{y.preventDefault();const G=A.querySelector("#taskTitle").value.trim(),ae=A.querySelector("#taskDesc").value.trim(),re=A.querySelector("#taskDate").value,u=A.querySelector("#taskStartTime").value.trim(),p=A.querySelector("#taskDueTime").value.trim(),d=A.querySelector("#taskPriority").value,o=A.querySelector("#taskStatus").value,g=A.querySelector("#taskCategory").value.trim()||"General";if(!G){x("Task title is required",!0);return}const j={title:G,description:ae,dateStr:re,startTime:u,dueTime:p,priority:d,status:o,category:g};if(n){const D=A.querySelector("#taskAssignee")?.value;D==="all"?(j.assignAll=!0,j.personnelId="all"):D&&(j.personnelId=D)}const k=A.querySelector("#btnSaveTask");k.disabled=!0,k.textContent="Saving...";try{if(I){const D=await Kt(`/tasks/${m._id}`,j),oe=s.tasks.findIndex(N=>N._id===m._id);oe!==-1&&(s.tasks[oe]=D),x("Task updated successfully! ✍️")}else{const D=await ke("/tasks",j);Array.isArray(D.tasks)?D.tasks.forEach(oe=>s.tasks.unshift(oe)):s.tasks.unshift(D),x("Task created successfully! ✨")}U(),B()}catch(D){x(D.message,!0),k.disabled=!1,k.textContent=I?"Save Changes":"Create Task"}}}function nt(){let m=[];const _=`
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
    `,I=Ut(_),a=()=>I.remove();I.querySelector("#btnImportClose").onclick=a,I.querySelector("#btnCancelImport").onclick=a;const r=I.querySelector("#importTextarea"),C=I.querySelector("#importFileInput"),A=I.querySelector("#importDropzone"),Y=I.querySelector("#previewListArea"),W=I.querySelector("#previewCountLabel"),L=I.querySelector("#btnConfirmImport"),F=I.querySelector("#importFileInfo");function U(G){if(!G)return[];const ae=G.split(/\r?\n/),re=[];for(let u of ae)u=u.trim(),u&&(u=u.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),u=u.replace(/^[-*•]\s+/,""),u=u.replace(/^\d+[\.\)]\s+/,""),u=u.trim(),u&&re.push(u));return re}function y(){const G=r.value,ae=U(G),re=I.querySelector("#importTargetDate").value,u=S(re),p=new Set(u.map(d=>(d.title||"").trim().toLowerCase()));m=[];for(const d of ae){const o=p.has(d.toLowerCase());m.push({title:d,isDuplicate:o})}if(W.textContent=`Preview (${m.length} ${m.length===1?"task":"tasks"} found)`,L.disabled=m.length===0,L.textContent=`Import ${m.length} ${m.length===1?"Task":"Tasks"}`,m.length===0){Y.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}Y.innerHTML=m.map((d,o)=>`
        <div class="preview-item ${d.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${o+1}.</span>
          <span class="preview-title">${h(d.title)}</span>
          ${d.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}r.oninput=y,A.onclick=()=>C.click(),C.onchange=G=>{const ae=G.target.files[0];if(!ae)return;F.textContent=`File selected: ${ae.name} (${Math.round(ae.size/1024)} KB)`;const re=new FileReader;re.onload=u=>{r.value=u.target.result,y()},re.readAsText(ae)},A.ondragover=G=>{G.preventDefault(),A.classList.add("dragover")},A.ondragleave=()=>A.classList.remove("dragover"),A.ondrop=G=>{G.preventDefault(),A.classList.remove("dragover");const ae=G.dataTransfer.files[0];if(ae&&(ae.type==="text/plain"||ae.name.endsWith(".txt"))){F.textContent=`File dropped: ${ae.name}`;const re=new FileReader;re.onload=u=>{r.value=u.target.result,y()},re.readAsText(ae)}else x("Please drop a valid .txt plain-text file",!0)},L.onclick=async()=>{if(m.length===0)return;L.disabled=!0,L.textContent="Importing...";const G=I.querySelector("#importTargetDate").value,ae=I.querySelector("#importPriority").value,re=I.querySelector("#importCategory").value.trim()||"General",u={date:G,tasks:m.map(p=>({title:p.title,priority:ae,category:re,status:"Pending"}))};n&&s.selectedPersonnelId!=="all"&&(u.personnelId=s.selectedPersonnelId);try{const p=await ke("/tasks/bulk-import",u);Array.isArray(p.tasks)&&p.tasks.forEach(d=>s.tasks.unshift(d)),x(`Imported ${p.importedCount} tasks successfully! (${p.skippedCount} skipped duplicates)`),a(),s.selectedDate=G,B()}catch(p){x(p.message,!0),L.disabled=!1,L.textContent="Retry Import"}}}async function rt(){const m=S(s.selectedDate),_=P(m,it()),I=$t(s.selectedDate),a=2,r=800,C=160,A=90,Y=65,W=70,L=Math.max(120,m.length*Y),F=C+A+L+W,U=document.createElement("canvas");U.width=r*a,U.height=F*a;const y=U.getContext("2d");y.scale(a,a);const G=document.documentElement.getAttribute("data-theme")==="dark",ae=G?"#0F172A":"#F8FAFC",re=G?"#1E293B":"#FFFFFF",u=G?"#334155":"#E2E8F0",p=G?"#F8FAFC":"#0F172A",d=G?"#94A3B8":"#475569",o="#4F46E5",g="#10B981",j="#F59E0B";y.fillStyle=ae,y.fillRect(0,0,r,F),y.fillStyle=re,Le(y,24,20,r-48,C-30,16),y.fill(),y.strokeStyle=u,y.lineWidth=1,y.stroke(),y.fillStyle=o,y.font="bold 12px Inter, sans-serif",y.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),y.fillStyle=p,y.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',y.fillText(I,44,86),y.fillStyle=d,y.font="13px Inter, sans-serif",y.fillText(`Planned focus list · ${_.completed} of ${_.total} tasks completed (${_.percent}%)`,44,114);const k=C+6;y.fillStyle=re,Le(y,24,k,r-48,A-16,12),y.fill(),y.stroke();const D=[{label:"TOTAL TASKS",val:String(_.total),color:p},{label:"COMPLETED",val:String(_.completed),color:g},{label:"IN PROGRESS",val:String(_.inProgress),color:j},{label:"PENDING",val:String(_.pending),color:d},{label:"PROGRESS",val:`${_.percent}%`,color:o}],oe=(r-48)/D.length;D.forEach((ie,Q)=>{const K=24+Q*oe+20;y.fillStyle=ie.color,y.font="bold 20px Inter, sans-serif",y.fillText(ie.val,K,k+36),y.fillStyle=d,y.font="10px Inter, sans-serif",y.fillText(ie.label,K,k+54)});const N=k+A;y.fillStyle=re,Le(y,24,N,r-48,L+10,16),y.fill(),y.stroke(),m.length===0?(y.fillStyle=d,y.font="14px Inter, sans-serif",y.textAlign="center",y.fillText("No scheduled tasks recorded for this date.",r/2,N+60),y.textAlign="left"):m.forEach((ie,Q)=>{const K=N+16+Q*Y,Z=ie.status==="Completed";y.beginPath(),y.arc(48,K+14,10,0,Math.PI*2),Z?(y.fillStyle=g,y.fill(),y.strokeStyle="#FFFFFF",y.lineWidth=2,y.beginPath(),y.moveTo(44,K+14),y.lineTo(47,K+17),y.lineTo(52,K+11),y.stroke()):(y.strokeStyle=u,y.lineWidth=2,y.stroke()),y.fillStyle=Z?d:p,y.font=`${Z?"normal":"500"} 14px Inter, sans-serif`;const V=ie.title.length>55?ie.title.slice(0,52)+"...":ie.title;if(y.fillText(V,70,K+18),Z){const Ie=y.measureText(V);y.strokeStyle=d,y.lineWidth=1.2,y.beginPath(),y.moveTo(70,K+14),y.lineTo(70+Ie.width,K+14),y.stroke()}const ee=ie.priority||"Medium";let se="#E2E8F0",fe="#334155";ee==="Urgent"?(se="#FEE2E2",fe="#DC2626"):ee==="High"?(se="#FEF3C7",fe="#D97706"):ee==="Low"&&(se="#ECFDF5",fe="#059669"),y.fillStyle=se,Le(y,r-150,K+4,60,20,10),y.fill(),y.fillStyle=fe,y.font="bold 10px Inter, sans-serif",y.fillText(ee,r-138,K+18);const $e=ie.dueTime?`🕒 ${ie.dueTime}`:ie.category||"General";y.fillStyle=d,y.font="11px Inter, sans-serif",y.fillText($e,70,K+34),Q<m.length-1&&(y.strokeStyle=u,y.lineWidth=.6,y.beginPath(),y.moveTo(40,K+48),y.lineTo(r-40,K+48),y.stroke())});const z=F-35;y.fillStyle=d,y.font="11px Inter, sans-serif",y.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,z);try{const ie=U.toDataURL("image/png"),Q=document.createElement("a");Q.href=ie,Q.download=`ci360-daily-planner-${s.selectedDate}.png`,document.body.appendChild(Q),Q.click(),Q.remove(),x("Daily Planner image exported! 🖼️")}catch(ie){x("Failed to export image: "+ie.message,!0)}}function Le(m,_,I,a,r,C){m.beginPath(),m.moveTo(_+C,I),m.lineTo(_+a-C,I),m.quadraticCurveTo(_+a,I,_+a,I+C),m.lineTo(_+a,I+r-C),m.quadraticCurveTo(_+a,I+r,_+a-C,I+r),m.lineTo(_+C,I+r),m.quadraticCurveTo(_,I+r,_,I+r-C),m.lineTo(_,I+C),m.quadraticCurveTo(_,I,_+C,I),m.closePath()}function ce(){const m=ea(s.selectedDate,v.weekStartsOn),_=$t(m[0]),I=$t(m[6]);it();const a=s.tasks.filter(L=>{if(L.isDeleted===!0)return!1;const F=L.dateStr||(L.dueDate?new Date(L.dueDate).toISOString().slice(0,10):"");return m.includes(F)}),r=a.length,C=a.filter(L=>L.status==="Completed").length,A=r>0?Math.round(C/r*100):0,Y=window.open("","_blank");if(!Y){x("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const W=`
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
            <div class="period">${_} – ${I}</div>
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
            ${m.map(L=>{const F=S(L);return F.length===0?`<tr><td><strong>${ft(L)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:F.map(U=>`
                <tr>
                  <td><strong>${ft(L)}</strong></td>
                  <td>${h(U.title)}</td>
                  <td><span class="badge badge-${(U.priority||"medium").toLowerCase().slice(0,3)}">${U.priority||"Medium"}</span></td>
                  <td>${h(U.category||"General")}</td>
                  <td>${U.dueTime||U.startTime||"—"}</td>
                  <td class="${U.status==="Completed"?"done":""}">${U.status||"Pending"}</td>
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
    `;Y.document.write(W),Y.document.close(),x("Weekly PDF report generated for printing! 📄")}function tt(){const _=Ut(`
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
    `),I=()=>_.remove();_.querySelector("#btnBackupClose").onclick=I;const a=_.querySelector("#btnDownloadBackupJson");a.onclick=async()=>{a.disabled=!0,a.textContent="Generating backup...";try{const L=await ze("/tasks/backup"),F=new Blob([JSON.stringify(L,null,2)],{type:"application/json"}),U=URL.createObjectURL(F),y=document.createElement("a");y.href=U,y.download=`ci360-planner-backup-${it()}.json`,document.body.appendChild(y),y.click(),y.remove(),x("Planner backup downloaded successfully! 💾")}catch(L){x("Backup export failed: "+L.message,!0)}finally{a.disabled=!1,a.textContent="Download JSON Backup"}};const r=_.querySelector("#restoreFileInput"),C=_.querySelector("#restorePreviewArea"),A=_.querySelector("#restoreCountText"),Y=_.querySelector("#btnExecuteRestore");let W=null;r.onchange=L=>{const F=L.target.files[0];if(!F)return;const U=new FileReader;U.onload=y=>{try{const G=JSON.parse(y.target.result),ae=Array.isArray(G.tasks)?G.tasks:Array.isArray(G)?G:null;if(!ae||ae.length===0){x("Invalid backup file: No tasks found",!0);return}W=ae,C.style.display="block",A.textContent=`Valid backup: ${ae.length} tasks ready to restore.`,Y.disabled=!1}catch(G){x("Error parsing JSON backup file: "+G.message,!0),C.style.display="none",Y.disabled=!0}},U.readAsText(F)},Y.onclick=async()=>{if(!W||W.length===0)return;Y.disabled=!0,Y.textContent="Restoring...";const L=_.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const F=await ke("/tasks/restore",{tasks:W,mode:L});x(`Restored ${F.restoredCount} tasks! (${F.skippedCount} skipped) ✨`),I(),await M()}catch(F){x("Restore failed: "+F.message,!0),Y.disabled=!1,Y.textContent="Retry Restore"}}}function be(){const m=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${h(v.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${v.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${v.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${h(v.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${v.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${v.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${v.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${v.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${v.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${v.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${v.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,_=Ut(m),I=()=>_.remove();_.querySelector("#btnSettingsClose").onclick=I,_.querySelector("#btnCancelSettings").onclick=I,_.querySelector("#settingsForm").onsubmit=a=>{a.preventDefault(),v.displayName=_.querySelector("#setDisplayName").value.trim()||"Daily Planner",v.weekStartsOn=Number(_.querySelector("#setWeekStart").value),v.defaultPriority=_.querySelector("#setDefaultPriority").value,v.density=_.querySelector("#setDensity").value,v.soundEnabled=_.querySelector("#setSound").checked,$a(v),x("Planner preferences saved! ⚙️"),I(),B()}}}function Ca(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
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
  `,document.head.appendChild(i)}function _a(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function Ta(i,t,e,l,c){const n={move:i,variations:c};return t&&(n.suffix=t),e&&(n.nag=e),l!==null&&(n.comment=l),n}function ja(...i){const[t,...e]=i;let l=t;for(const c of e)c!==null&&(l.variations=[c,...c.variations],c.variations=[],l=c);return t}function Ia(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const l=e.variations[0];if(!l){e.comment=t.marker.comment;break}e=l}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Aa(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function Et(i,t,e,l){var c=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(c,Et.prototype),c.expected=t,c.found=e,c.location=l,c.name="SyntaxError",c}Aa(Et,Error);function ta(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}Et.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,l;for(l=0;l<i.length;l++)if(i[l].source===this.location.source){e=i[l].text.split(/\r\n|\n|\r/g);break}var c=this.location.start,n=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(c):c,v=this.location.source+":"+n.line+":"+n.column;if(e){var s=this.location.end,M=ta("",n.line.toString().length," "),R=e[c.line-1],S=c.line===s.line?s.column:R.length+1,T=S-c.column||1;t+=`
 --> `+v+`
`+M+` |
`+n.line+" | "+R+`
`+M+" | "+ta("",c.column-1," ")+ta("",T,"^")}else t+=`
 at `+v}return t};Et.buildMessage=function(i,t){var e={literal:function(R){return'"'+c(R.text)+'"'},class:function(R){var S=R.parts.map(function(T){return Array.isArray(T)?n(T[0])+"-"+n(T[1]):n(T)});return"["+(R.inverted?"^":"")+S.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(R){return R.description}};function l(R){return R.charCodeAt(0).toString(16).toUpperCase()}function c(R){return R.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(S){return"\\x0"+l(S)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(S){return"\\x"+l(S)})}function n(R){return R.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(S){return"\\x0"+l(S)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(S){return"\\x"+l(S)})}function v(R){return e[R.type](R)}function s(R){var S=R.map(v),T,P;if(S.sort(),S.length>0){for(T=1,P=1;T<S.length;T++)S[T-1]!==S[T]&&(S[P]=S[T],P++);S.length=P}switch(S.length){case 1:return S[0];case 2:return S[0]+" or "+S[1];default:return S.slice(0,-1).join(", ")+", or "+S[S.length-1]}}function M(R){return R?'"'+c(R)+'"':"end of input"}return"Expected "+s(i)+" but "+M(t)+" found."};function Da(i,t){t=t!==void 0?t:{};var e={},l=t.grammarSource,c={pgn:Nt},n=Nt,v="[",s='"',M="]",R=".",S="O-O-O",T="O-O",P="0-0-0",B="0-0",ue="$",ve="{",Oe="}",Qe=";",dt="(",xt=")",Ce="1-0",ct="0-1",Fe="1/2-1/2",pt="*",Ae=/^[a-zA-Z]/,nt=/^[^"]/,rt=/^[0-9]/,Le=/^[.]/,ce=/^[a-zA-Z1-8\-=]/,tt=/^[+#]/,be=/^[!?]/,m=/^[^}]/,_=/^[^\r\n]/,I=/^[ \t\r\n]/,a=Je("tag pair"),r=De("[",!1),C=De('"',!1),A=De("]",!1),Y=Je("tag name"),W=Xe([["a","z"],["A","Z"]],!1,!1),L=Je("tag value"),F=Xe(['"'],!0,!1),U=Je("move number"),y=Xe([["0","9"]],!1,!1),G=De(".",!1),ae=Xe(["."],!1,!1),re=Je("standard algebraic notation"),u=De("O-O-O",!1),p=De("O-O",!1),d=De("0-0-0",!1),o=De("0-0",!1),g=Xe([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),j=Xe(["+","#"],!1,!1),k=Je("suffix annotation"),D=Xe(["!","?"],!1,!1),oe=Je("NAG"),N=De("$",!1),z=Je("brace comment"),ie=De("{",!1),Q=Xe(["}"],!0,!1),K=De("}",!1),Z=Je("rest of line comment"),V=De(";",!1),ee=Xe(["\r",`
`],!0,!1),se=Je("variation"),fe=De("(",!1),$e=De(")",!1),Ie=Je("game termination marker"),pe=De("1-0",!1),we=De("0-1",!1),Re=De("1/2-1/2",!1),Ee=De("*",!1),je=Je("whitespace"),Se=Xe([" ","	","\r",`
`],!1,!1),xe=function(f,w){return Ia(f,w)},ye=function(f){return Object.fromEntries(f)},_e=function(f,w){return[f,w]},Me=function(f,w){return{root:f,marker:w}},Ge=function(f,w){return ja(_a(f),...w.flat())},at=function(f,w,$,J,ne){return Ta(f,w,$,J,ne)},Tt=function(f){return f},jt=function(f){return f.replace(/[\r\n]+/g," ")},lt=function(f){return f.trim()},E=function(f){return f},H=function(f,w){return{result:f,comment:w}},b=t.peg$currPos|0,Te=[{line:1,column:1}],me=b,st=t.peg$maxFailExpected||[],O=t.peg$silentFails|0,ut;if(t.startRule){if(!(t.startRule in c))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');n=c[t.startRule]}function De(f,w){return{type:"literal",text:f,ignoreCase:w}}function Xe(f,w,$){return{type:"class",parts:f,inverted:w,ignoreCase:$}}function Bt(){return{type:"end"}}function Je(f){return{type:"other",description:f}}function yt(f){var w=Te[f],$;if(w)return w;if(f>=Te.length)$=Te.length-1;else for($=f;!Te[--$];);for(w=Te[$],w={line:w.line,column:w.column};$<f;)i.charCodeAt($)===10?(w.line++,w.column=1):w.column++,$++;return Te[f]=w,w}function Pt(f,w,$){var J=yt(f),ne=yt(w),ge={source:l,start:{offset:f,line:J.line,column:J.column},end:{offset:w,line:ne.line,column:ne.column}};return ge}function X(f){b<me||(b>me&&(me=b,st=[]),st.push(f))}function Qt(f,w,$){return new Et(Et.buildMessage(f,w),f,w,$)}function Nt(){var f,w,$;return f=b,w=Ot(),$=At(),f=xe(w,$),f}function Ot(){var f,w,$;for(f=b,w=[],$=kt();$!==e;)w.push($),$=kt();return $=Ue(),f=ye(w),f}function kt(){var f,w,$,J,ne,ge,wt;return O++,f=b,Ue(),i.charCodeAt(b)===91?(w=v,b++):(w=e,O===0&&X(r)),w!==e?(Ue(),$=It(),$!==e?(Ue(),i.charCodeAt(b)===34?(J=s,b++):(J=e,O===0&&X(C)),J!==e?(ne=gt(),i.charCodeAt(b)===34?(ge=s,b++):(ge=e,O===0&&X(C)),ge!==e?(Ue(),i.charCodeAt(b)===93?(wt=M,b++):(wt=e,O===0&&X(A)),wt!==e?f=_e($,ne):(b=f,f=e)):(b=f,f=e)):(b=f,f=e)):(b=f,f=e)):(b=f,f=e),O--,f===e&&O===0&&X(a),f}function It(){var f,w,$;if(O++,f=b,w=[],$=i.charAt(b),Ae.test($)?b++:($=e,O===0&&X(W)),$!==e)for(;$!==e;)w.push($),$=i.charAt(b),Ae.test($)?b++:($=e,O===0&&X(W));else w=e;return w!==e?f=i.substring(f,b):f=w,O--,f===e&&(w=e,O===0&&X(Y)),f}function gt(){var f,w,$;for(O++,f=b,w=[],$=i.charAt(b),nt.test($)?b++:($=e,O===0&&X(F));$!==e;)w.push($),$=i.charAt(b),nt.test($)?b++:($=e,O===0&&X(F));return f=i.substring(f,b),O--,w=e,O===0&&X(L),f}function At(){var f,w,$;return f=b,w=Xt(),Ue(),$=Dt(),$===e&&($=null),Ue(),f=Me(w,$),f}function Xt(){var f,w,$,J;for(f=b,w=Ke(),w===e&&(w=null),$=[],J=Lt();J!==e;)$.push(J),J=Lt();return f=Ge(w,$),f}function Lt(){var f,w,$,J,ne,ge,wt,Ft;if(f=b,Ue(),q(),Ue(),w=te(),w!==e){for($=he(),$===e&&($=null),J=[],ne=Be();ne!==e;)J.push(ne),ne=Be();for(ne=Ue(),ge=Ke(),ge===e&&(ge=null),wt=[],Ft=Ze();Ft!==e;)wt.push(Ft),Ft=Ze();f=at(w,$,J,ge,wt)}else b=f,f=e;return f}function q(){var f,w,$,J,ne,ge;for(O++,f=b,w=[],$=i.charAt(b),rt.test($)?b++:($=e,O===0&&X(y));$!==e;)w.push($),$=i.charAt(b),rt.test($)?b++:($=e,O===0&&X(y));if(i.charCodeAt(b)===46?($=R,b++):($=e,O===0&&X(G)),$!==e){for(J=Ue(),ne=[],ge=i.charAt(b),Le.test(ge)?b++:(ge=e,O===0&&X(ae));ge!==e;)ne.push(ge),ge=i.charAt(b),Le.test(ge)?b++:(ge=e,O===0&&X(ae));w=[w,$,J,ne],f=w}else b=f,f=e;return O--,f===e&&(w=e,O===0&&X(U)),f}function te(){var f,w,$,J,ne,ge;if(O++,f=b,w=b,i.substr(b,5)===S?($=S,b+=5):($=e,O===0&&X(u)),$===e&&(i.substr(b,3)===T?($=T,b+=3):($=e,O===0&&X(p)),$===e&&(i.substr(b,5)===P?($=P,b+=5):($=e,O===0&&X(d)),$===e&&(i.substr(b,3)===B?($=B,b+=3):($=e,O===0&&X(o)),$===e))))if($=b,J=i.charAt(b),Ae.test(J)?b++:(J=e,O===0&&X(W)),J!==e){if(ne=[],ge=i.charAt(b),ce.test(ge)?b++:(ge=e,O===0&&X(g)),ge!==e)for(;ge!==e;)ne.push(ge),ge=i.charAt(b),ce.test(ge)?b++:(ge=e,O===0&&X(g));else ne=e;ne!==e?(J=[J,ne],$=J):(b=$,$=e)}else b=$,$=e;return $!==e?(J=i.charAt(b),tt.test(J)?b++:(J=e,O===0&&X(j)),J===e&&(J=null),$=[$,J],w=$):(b=w,w=e),w!==e?f=i.substring(f,b):f=w,O--,f===e&&(w=e,O===0&&X(re)),f}function he(){var f,w,$;for(O++,f=b,w=[],$=i.charAt(b),be.test($)?b++:($=e,O===0&&X(D));$!==e;)w.push($),w.length>=2?$=e:($=i.charAt(b),be.test($)?b++:($=e,O===0&&X(D)));return w.length<1?(b=f,f=e):f=w,O--,f===e&&(w=e,O===0&&X(k)),f}function Be(){var f,w,$,J,ne;if(O++,f=b,Ue(),i.charCodeAt(b)===36?(w=ue,b++):(w=e,O===0&&X(N)),w!==e){if($=b,J=[],ne=i.charAt(b),rt.test(ne)?b++:(ne=e,O===0&&X(y)),ne!==e)for(;ne!==e;)J.push(ne),ne=i.charAt(b),rt.test(ne)?b++:(ne=e,O===0&&X(y));else J=e;J!==e?$=i.substring($,b):$=J,$!==e?f=Tt($):(b=f,f=e)}else b=f,f=e;return O--,f===e&&O===0&&X(oe),f}function Ke(){var f;return f=ot(),f===e&&(f=bt()),f}function ot(){var f,w,$,J,ne;if(O++,f=b,i.charCodeAt(b)===123?(w=ve,b++):(w=e,O===0&&X(ie)),w!==e){for($=b,J=[],ne=i.charAt(b),m.test(ne)?b++:(ne=e,O===0&&X(Q));ne!==e;)J.push(ne),ne=i.charAt(b),m.test(ne)?b++:(ne=e,O===0&&X(Q));$=i.substring($,b),i.charCodeAt(b)===125?(J=Oe,b++):(J=e,O===0&&X(K)),J!==e?f=jt($):(b=f,f=e)}else b=f,f=e;return O--,f===e&&(w=e,O===0&&X(z)),f}function bt(){var f,w,$,J,ne;if(O++,f=b,i.charCodeAt(b)===59?(w=Qe,b++):(w=e,O===0&&X(V)),w!==e){for($=b,J=[],ne=i.charAt(b),_.test(ne)?b++:(ne=e,O===0&&X(ee));ne!==e;)J.push(ne),ne=i.charAt(b),_.test(ne)?b++:(ne=e,O===0&&X(ee));$=i.substring($,b),f=lt($)}else b=f,f=e;return O--,f===e&&(w=e,O===0&&X(Z)),f}function Ze(){var f,w,$,J;return O++,f=b,Ue(),i.charCodeAt(b)===40?(w=dt,b++):(w=e,O===0&&X(fe)),w!==e?($=Xt(),$!==e?(Ue(),i.charCodeAt(b)===41?(J=xt,b++):(J=e,O===0&&X($e)),J!==e?f=E($):(b=f,f=e)):(b=f,f=e)):(b=f,f=e),O--,f===e&&O===0&&X(se),f}function Dt(){var f,w,$;return O++,f=b,i.substr(b,3)===Ce?(w=Ce,b+=3):(w=e,O===0&&X(pe)),w===e&&(i.substr(b,3)===ct?(w=ct,b+=3):(w=e,O===0&&X(we)),w===e&&(i.substr(b,7)===Fe?(w=Fe,b+=7):(w=e,O===0&&X(Re)),w===e&&(i.charCodeAt(b)===42?(w=pt,b++):(w=e,O===0&&X(Ee))))),w!==e?(Ue(),$=Ke(),$===e&&($=null),f=H(w,$)):(b=f,f=e),O--,f===e&&(w=e,O===0&&X(Ie)),f}function Ue(){var f,w;for(O++,f=[],w=i.charAt(b),I.test(w)?b++:(w=e,O===0&&X(Se));w!==e;)f.push(w),w=i.charAt(b),I.test(w)?b++:(w=e,O===0&&X(Se));return O--,w=e,O===0&&X(je),f}if(ut=n(),t.peg$library)return{peg$result:ut,peg$currPos:b,peg$FAILED:e,peg$maxFailExpected:st,peg$maxFailPos:me};if(ut!==e&&b===i.length)return ut;throw ut!==e&&b<i.length&&X(Bt()),Qt(st,me<i.length?i.charAt(me):null,me<i.length?Pt(me,me+1):Pt(me,me))}/**
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
 */const Vt=0xffffffffffffffffn;function aa(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function fa(i,t){return i*t&Vt}function Ea(i){return function(){let t=BigInt(i&Vt),e=BigInt(i>>64n&Vt);const l=fa(aa(fa(t,5n),7n),9n);return e^=t,t=(aa(t,24n)^e^e<<16n)&Vt,e=aa(e,37n),i=e<<64n|t,l}}const Jt=Ea(0xa187eb39cdcaed8f31c4b365b102e01en),Pa=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Jt()))),La=Array.from({length:8},()=>Jt()),Ma=Array.from({length:16},()=>Jt()),ia=Jt(),We="w",et="b",Pe="p",da="n",Yt="b",zt="r",vt="q",qe="k",na="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Gt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:l,piece:c,from:n,to:v,flags:s,captured:M,promotion:R}=e,S=Ne(n),T=Ne(v);this.color=l,this.piece=c,this.from=S,this.to=T,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=S+T,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const P in de)de[P]&s&&(this.flags+=St[P]);M&&(this.captured=M),R&&(this.promotion=R,this.lan+=R)}isCapture(){return this.flags.indexOf(St.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(St.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(St.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(St.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(St.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(St.BIG_PAWN)>-1}}const He=-1,St={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},de={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ca={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},qa={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},za={...ca,...qa},le={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},ra={b:[16,32,17,15],w:[-16,-32,-17,-15]},ma={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ra=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ba=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Na={p:1,n:2,b:4,r:8,q:16,k:32},Oa="pnbrqkPNBRQK",ha=[da,Yt,zt,vt],Fa=7,Ua=6,Ha=1,Ga=0,Wt={[qe]:de.KSIDE_CASTLE,[vt]:de.QSIDE_CASTLE},mt={w:[{square:le.a1,flag:de.QSIDE_CASTLE},{square:le.h1,flag:de.KSIDE_CASTLE}],b:[{square:le.a8,flag:de.QSIDE_CASTLE},{square:le.h8,flag:de.KSIDE_CASTLE}]},Wa={b:Ha,w:Ua},oa="--";function _t(i){return i>>4}function Rt(i){return i&15}function ka(i){return"0123456789".indexOf(i)!==-1}function Ne(i){const t=Rt(i),e=_t(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function Mt(i){return i===We?et:We}function Ka(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const l=parseInt(t[4],10);if(isNaN(l)||l<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const c=t[0].split("/");if(c.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let v=0;v<c.length;v++){let s=0,M=!1;for(let R=0;R<c[v].length;R++)if(ka(c[v][R])){if(M)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};s+=parseInt(c[v][R],10),M=!0}else{if(!/^[prnbqkPRNBQK]$/.test(c[v][R]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};s+=1,M=!1}if(s!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const n=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:v,regex:s}of n){if(!s.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${v} king`};if((t[0].match(s)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${v} kings`}}return Array.from(c[0]+c[7]).some(v=>v.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Va(i,t){const e=i.from,l=i.to,c=i.piece;let n=0,v=0,s=0;for(let M=0,R=t.length;M<R;M++){const S=t[M].from,T=t[M].to,P=t[M].piece;c===P&&e!==S&&l===T&&(n++,_t(e)===_t(S)&&v++,Rt(e)===Rt(S)&&s++)}return n>0?v>0&&s>0?Ne(e):s>0?Ne(e).charAt(1):Ne(e).charAt(0):""}function ht(i,t,e,l,c,n=void 0,v=de.NORMAL){const s=_t(l);if(c===Pe&&(s===Fa||s===Ga))for(let M=0;M<ha.length;M++){const R=ha[M];i.push({color:t,from:e,to:l,piece:c,captured:n,promotion:R,flags:v|de.PROMOTION})}else i.push({color:t,from:e,to:l,piece:c,captured:n,flags:v})}function va(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:Pe:(t=t.toLowerCase(),t==="o"?qe:t)}function sa(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class xa{_board=new Array(128);_turn=We;_header={};_kings={w:He,b:He};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=na,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:He,b:He},this._turn=We,this._castling={w:0,b:0},this._epSquare=He,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...za},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:l=!1}={}){let c=t.split(/\s+/);if(c.length>=2&&c.length<6){const s=["-","-","0","1"];t=c.concat(s.slice(-(6-c.length))).join(" ")}if(c=t.split(/\s+/),!e){const{ok:s,error:M}=Ka(t);if(!s)throw new Error(M)}const n=c[0];let v=0;this.clear({preserveHeaders:l});for(let s=0;s<n.length;s++){const M=n.charAt(s);if(M==="/")v+=8;else if(ka(M))v+=parseInt(M,10);else{const R=M<"a"?We:et;this._put({type:M.toLowerCase(),color:R},Ne(v)),v++}}this._turn=c[1],c[2].indexOf("K")>-1&&(this._castling.w|=de.KSIDE_CASTLE),c[2].indexOf("Q")>-1&&(this._castling.w|=de.QSIDE_CASTLE),c[2].indexOf("k")>-1&&(this._castling.b|=de.KSIDE_CASTLE),c[2].indexOf("q")>-1&&(this._castling.b|=de.QSIDE_CASTLE),this._epSquare=c[3]==="-"?He:le[c[3]],this._halfMoves=parseInt(c[4],10),this._moveNumber=parseInt(c[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,l="";for(let v=le.a8;v<=le.h1;v++){if(this._board[v]){e>0&&(l+=e,e=0);const{color:s,type:M}=this._board[v];l+=s===We?M.toUpperCase():M.toLowerCase()}else e++;v+1&136&&(e>0&&(l+=e),v!==le.h1&&(l+="/"),e=0,v+=8)}let c="";this._castling[We]&de.KSIDE_CASTLE&&(c+="K"),this._castling[We]&de.QSIDE_CASTLE&&(c+="Q"),this._castling[et]&de.KSIDE_CASTLE&&(c+="k"),this._castling[et]&de.QSIDE_CASTLE&&(c+="q"),c=c||"-";let n="-";if(this._epSquare!==He)if(t)n=Ne(this._epSquare);else{const v=this._epSquare+(this._turn===We?16:-16),s=[v+1,v-1];for(const M of s){if(M&136)continue;const R=this._turn;if(this._board[M]?.color===R&&this._board[M]?.type===Pe){this._makeMove({color:R,from:M,to:this._epSquare,piece:Pe,captured:Pe,flags:de.EP_CAPTURE});const S=!this._isKingAttacked(R);if(this._undoMove(),S){n=Ne(this._epSquare);break}}}}return[l,this._turn,c,n,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:l}=this._board[t],c={w:0,b:1}[e],n={p:0,n:1,b:2,r:3,q:4,k:5}[l];return Pa[c][n][t]}_epKey(){return this._epSquare===He?0n:La[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Ma[t]}_computeHash(){let t=0n;for(let e=le.a8;e<=le.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=ia),t}_updateSetup(t){this._history.length>0||(t!==na?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(na)}get(t){return this._board[le[t]]}findPiece(t){const e=[];for(let l=le.a8;l<=le.h1;l++){if(l&136){l+=7;continue}!this._board[l]||this._board[l]?.color!==t.color||this._board[l].color===t.color&&this._board[l].type===t.type&&e.push(Ne(l))}return e}put({type:t,color:e},l){return this._put({type:t,color:e},l)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},l){if(Oa.indexOf(t.toLowerCase())===-1||!(l in le))return!1;const c=le[l];if(t==qe&&!(this._kings[e]==He||this._kings[e]==c))return!1;const n=this._board[c];return n&&n.type===qe&&(this._kings[n.color]=He),this._set(c,{type:t,color:e}),t===qe&&(this._kings[e]=c),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(le[t]),e&&e.type===qe&&(this._kings[e.color]=He),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[le.e1]?.type===qe&&this._board[le.e1]?.color===We,e=this._board[le.e8]?.type===qe&&this._board[le.e8]?.color===et;(!t||this._board[le.a1]?.type!==zt||this._board[le.a1]?.color!==We)&&(this._castling.w&=-65),(!t||this._board[le.h1]?.type!==zt||this._board[le.h1]?.color!==We)&&(this._castling.w&=-33),(!e||this._board[le.a8]?.type!==zt||this._board[le.a8]?.color!==et)&&(this._castling.b&=-65),(!e||this._board[le.h8]?.type!==zt||this._board[le.h8]?.color!==et)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===He)return;const t=this._epSquare+(this._turn===We?-16:16),e=this._epSquare+(this._turn===We?16:-16),l=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==Mt(this._turn)||this._board[e]?.type!==Pe){this._hash^=this._epKey(),this._epSquare=He;return}const c=n=>!(n&136)&&this._board[n]?.color===this._turn&&this._board[n]?.type===Pe;l.some(c)||(this._hash^=this._epKey(),this._epSquare=He)}_attacked(t,e,l){const c=[];for(let n=le.a8;n<=le.h1;n++){if(n&136){n+=7;continue}if(this._board[n]===void 0||this._board[n].color!==t)continue;const v=this._board[n],s=n-e;if(s===0)continue;const M=s+119;if(Ra[M]&Na[v.type]){if(v.type===Pe){if(s>0&&v.color===We||s<=0&&v.color===et)if(l)c.push(Ne(n));else return!0;continue}if(v.type==="n"||v.type==="k")if(l){c.push(Ne(n));continue}else return!0;const R=Ba[M];let S=n+R,T=!1;for(;S!==e;){if(this._board[S]!=null){T=!0;break}S+=R}if(!T)if(l){c.push(Ne(n));continue}else return!0}}return l?c:!1}attackers(t,e){return e?this._attacked(e,le[t],!0):this._attacked(this._turn,le[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(Mt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,le[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let l=0,c=0;for(let n=le.a8;n<=le.h1;n++){if(c=(c+1)%2,n&136){n+=7;continue}const v=this._board[n];v&&(t[v.type]=v.type in t?t[v.type]+1:1,v.type===Yt&&e.push(c),l++)}if(l===2)return!0;if(l===3&&(t[Yt]===1||t[da]===1))return!0;if(l===t[Yt]+2){let n=0;const v=e.length;for(let s=0;s<v;s++)n+=e[s];if(n===0||n===v)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:l=void 0}={}){const c=this._moves({square:e,piece:l});return t?c.map(n=>new Gt(this,n)):c.map(n=>this._moveToSan(n,c))}_moves({legal:t=!0,piece:e=void 0,square:l=void 0}={}){const c=l?l.toLowerCase():void 0,n=e?.toLowerCase(),v=[],s=this._turn,M=Mt(s);let R=le.a8,S=le.h1,T=!1;if(c)if(c in le)R=S=le[c],T=!0;else return[];for(let B=R;B<=S;B++){if(B&136){B+=7;continue}if(!this._board[B]||this._board[B].color===M)continue;const{type:ue}=this._board[B];let ve;if(ue===Pe){if(n&&n!==ue)continue;ve=B+ra[s][0],this._board[ve]||(ht(v,s,B,ve,Pe),ve=B+ra[s][1],Wa[s]===_t(B)&&!this._board[ve]&&ht(v,s,B,ve,Pe,void 0,de.BIG_PAWN));for(let Oe=2;Oe<4;Oe++)ve=B+ra[s][Oe],!(ve&136)&&(this._board[ve]?.color===M?ht(v,s,B,ve,Pe,this._board[ve].type,de.CAPTURE):ve===this._epSquare&&ht(v,s,B,ve,Pe,Pe,de.EP_CAPTURE))}else{if(n&&n!==ue)continue;for(let Oe=0,Qe=ma[ue].length;Oe<Qe;Oe++){const dt=ma[ue][Oe];for(ve=B;ve+=dt,!(ve&136);){if(!this._board[ve])ht(v,s,B,ve,ue);else{if(this._board[ve].color===s)break;ht(v,s,B,ve,ue,this._board[ve].type,de.CAPTURE);break}if(ue===da||ue===qe)break}}}}if((n===void 0||n===qe)&&(!T||S===this._kings[s])){if(this._castling[s]&de.KSIDE_CASTLE){const B=this._kings[s],ue=B+2;!this._board[B+1]&&!this._board[ue]&&!this._attacked(M,this._kings[s])&&!this._attacked(M,B+1)&&!this._attacked(M,ue)&&ht(v,s,this._kings[s],ue,qe,void 0,de.KSIDE_CASTLE)}if(this._castling[s]&de.QSIDE_CASTLE){const B=this._kings[s],ue=B-2;!this._board[B-1]&&!this._board[B-2]&&!this._board[B-3]&&!this._attacked(M,this._kings[s])&&!this._attacked(M,B-1)&&!this._attacked(M,ue)&&ht(v,s,this._kings[s],ue,qe,void 0,de.QSIDE_CASTLE)}}if(!t||this._kings[s]===-1)return v;const P=[];for(let B=0,ue=v.length;B<ue;B++)this._makeMove(v[B]),this._isKingAttacked(s)||P.push(v[B]),this._undoMove();return P}move(t,{strict:e=!1}={}){let l=null;if(typeof t=="string")l=this._moveFromSan(t,e);else if(t===null)l=this._moveFromSan(oa,e);else if(typeof t=="object"){const n=this._moves();for(let v=0,s=n.length;v<s;v++)if(t.from===Ne(n[v].from)&&t.to===Ne(n[v].to)&&(!("promotion"in n[v])||t.promotion===n[v].promotion)){l=n[v];break}}if(!l)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&l.flags&de.NULL_MOVE)throw new Error("Null move not allowed when in check");const c=new Gt(this,l);return this._makeMove(l),this._incPositionCount(),c}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,l=Mt(e);if(this._push(t),t.flags&de.NULL_MOVE){e===et&&this._moveNumber++,this._halfMoves++,this._turn=l,this._epSquare=He;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&de.EP_CAPTURE&&(this._turn===et?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===qe){if(this._kings[e]=t.to,t.flags&de.KSIDE_CASTLE){const c=t.to-1,n=t.to+1;this._movePiece(n,c)}else if(t.flags&de.QSIDE_CASTLE){const c=t.to+1,n=t.to-2;this._movePiece(n,c)}this._castling[e]=0}if(this._castling[e]){for(let c=0,n=mt[e].length;c<n;c++)if(t.from===mt[e][c].square&&this._castling[e]&mt[e][c].flag){this._castling[e]^=mt[e][c].flag;break}}if(this._castling[l]){for(let c=0,n=mt[l].length;c<n;c++)if(t.to===mt[l][c].square&&this._castling[l]&mt[l][c].flag){this._castling[l]^=mt[l][c].flag;break}}if(this._hash^=this._castlingKey(),t.flags&de.BIG_PAWN){let c;e===et?c=t.to-16:c=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===Pe&&this._board[t.to-1]?.color===l||!(t.to+1&136)&&this._board[t.to+1]?.type===Pe&&this._board[t.to+1]?.color===l?(this._epSquare=c,this._hash^=this._epKey()):this._epSquare=He}else this._epSquare=He;t.piece===Pe?this._halfMoves=0:t.flags&(de.CAPTURE|de.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===et&&this._moveNumber++,this._turn=l,this._hash^=ia}undo(){const t=this._hash,e=this._undoMove();if(e){const l=new Gt(this,e);return this._decPositionCount(t),l}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=ia;const l=this._turn,c=Mt(l);if(e.flags&de.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:l})),e.captured)if(e.flags&de.EP_CAPTURE){let n;l===et?n=e.to-16:n=e.to+16,this._set(n,{type:Pe,color:c})}else this._set(e.to,{type:e.captured,color:c});if(e.flags&(de.KSIDE_CASTLE|de.QSIDE_CASTLE)){let n,v;e.flags&de.KSIDE_CASTLE?(n=e.to+1,v=e.to-1):(n=e.to-2,v=e.to+1),this._movePiece(v,n)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const l=[];let c=!1;for(const P in this._header)this._header[P]&&l.push(`[${P} "${this._header[P]}"]`+t),c=!0;c&&this._history.length&&l.push(t);const n=P=>{const B=this._comments[this.fen()];if(typeof B<"u"){const ue=P.length>0?" ":"";P=`${P}${ue}{${B}}`}return P},v=[];for(;this._history.length>0;)v.push(this._undoMove());const s=[];let M="";for(v.length===0&&s.push(n(""));v.length>0;){M=n(M);const P=v.pop();if(!P)break;if(!this._history.length&&P.color==="b"){const B=`${this._moveNumber}. ...`;M=M?`${M} ${B}`:B}else P.color==="w"&&(M.length&&s.push(M),M=this._moveNumber+".");M=M+" "+this._moveToSan(P,this._moves({legal:!0})),this._makeMove(P)}if(M.length&&s.push(n(M)),s.push(this._header.Result||"*"),e===0)return l.join("")+s.join(" ");const R=function(){return l.length>0&&l[l.length-1]===" "?(l.pop(),!0):!1},S=function(P,B){for(const ue of B.split(" "))if(ue){if(P+ue.length>e){for(;R();)P--;l.push(t),P=0}l.push(ue),P+=ue.length,l.push(" "),P++}return R()&&P--,P};let T=0;for(let P=0;P<s.length;P++){if(T+s[P].length>e&&s[P].includes("{")){T=S(T,s[P]);continue}T+s[P].length>e&&P!==0?(l[l.length-1]===" "&&l.pop(),l.push(t),T=0):P!==0&&(l.push(" "),T++),l.push(s[P]),T+=s[P].length}return l.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ca[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ca[t]||null,!0):!1}getHeaders(){const t={};for(const[e,l]of Object.entries(this._header))l!==null&&(t[e]=l);return t}loadPgn(t,{strict:e=!1,newlineChar:l=`\r?
`}={}){l!==`\r?
`&&(t=t.replace(new RegExp(l,"g"),`
`));const c=Da(t);this.reset();const n=c.headers;let v="";for(const R in n)R.toLowerCase()==="fen"&&(v=n[R]),this.header(R,n[R]);if(!e)v&&this.load(v,{preserveHeaders:!0});else if(n.SetUp==="1"){if(!("FEN"in n))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(n.FEN,{preserveHeaders:!0})}let s=c.root;for(;s;){if(s.move){const R=this._moveFromSan(s.move,e);if(R==null)throw new Error(`Invalid move in PGN: ${s.move}`);this._makeMove(R),this._incPositionCount()}s.comment!==void 0&&(this._comments[this.fen()]=s.comment),s=s.variations[0]}const M=c.result;M&&Object.keys(this._header).length&&this._header.Result!==M&&this.setHeader("Result",M)}_moveToSan(t,e){let l="";if(t.flags&de.KSIDE_CASTLE)l="O-O";else if(t.flags&de.QSIDE_CASTLE)l="O-O-O";else{if(t.flags&de.NULL_MOVE)return oa;if(t.piece!==Pe){const c=Va(t,e);l+=t.piece.toUpperCase()+c}t.flags&(de.CAPTURE|de.EP_CAPTURE)&&(t.piece===Pe&&(l+=Ne(t.from)[0]),l+="x"),l+=Ne(t.to),t.promotion&&(l+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?l+="#":l+="+"),this._undoMove(),l}_moveFromSan(t,e=!1){let l=sa(t);if(e||(l==="0-0"?l="O-O":l==="0-0-0"&&(l="O-O-O")),l==oa)return{color:this._turn,from:0,to:0,piece:"k",flags:de.NULL_MOVE};let c=va(l),n=this._moves({legal:!0,piece:c});for(let P=0,B=n.length;P<B;P++)if(l===sa(this._moveToSan(n[P],n)))return n[P];if(e)return null;let v,s,M,R,S,T=!1;if(s=l.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),s?(v=s[1],M=s[2],R=s[3],S=s[4],M.length==1&&(T=!0)):(s=l.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),s&&(v=s[1],M=s[2],R=s[3],S=s[4],M.length==1&&(T=!0))),c=va(l),n=this._moves({legal:!0,piece:v||c}),!R)return null;for(let P=0,B=n.length;P<B;P++)if(M){if((!v||v.toLowerCase()==n[P].piece)&&le[M]==n[P].from&&le[R]==n[P].to&&(!S||S.toLowerCase()==n[P].promotion))return n[P];if(T){const ue=Ne(n[P].from);if((!v||v.toLowerCase()==n[P].piece)&&le[R]==n[P].to&&(M==ue[0]||M==ue[1])&&(!S||S.toLowerCase()==n[P].promotion))return n[P]}}else if(l===sa(this._moveToSan(n[P],n)).replace("x",""))return n[P];return null}ascii(){let t=`   +------------------------+
`;for(let e=le.a8;e<=le.h1;e++){if(Rt(e)===0&&(t+=" "+"87654321"[_t(e)]+" |"),this._board[e]){const l=this._board[e].type,n=this._board[e].color===We?l.toUpperCase():l.toLowerCase();t+=" "+n+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let l=0;const c=this._turn;for(let n=0,v=e.length;n<v;n++)this._makeMove(e[n]),this._isKingAttacked(c)||(t-1>0?l+=this.perft(t-1):l++),this._undoMove();return l}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let l=le.a8;l<=le.h1;l++)this._board[l]==null?e.push(null):e.push({square:Ne(l),type:this._board[l].type,color:this._board[l].color}),l+1&136&&(t.push(e),e=[],l+=8);return t}squareColor(t){if(t in le){const e=le[t];return(_t(e)+Rt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],l=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const c=e.pop();if(!c)break;t?l.push(new Gt(this,c)):l.push(this._moveToSan(c,this._moves())),this._makeMove(c)}return l}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},l=c=>{c in this._comments&&(e[c]=this._comments[c])};for(;this._history.length>0;)t.push(this._undoMove());for(l(this.fen());;){const c=t.pop();if(!c)break;this._makeMove(c),l(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const c of[qe,vt])e[c]!==void 0&&(e[c]?this._castling[t]|=Wt[c]:this._castling[t]&=~Wt[c]);this._updateCastlingRights();const l=this.getCastlingRights(t);return(e[qe]===void 0||e[qe]===l[qe])&&(e[vt]===void 0||e[vt]===l[vt])}getCastlingRights(t){return{[qe]:(this._castling[t]&Wt[qe])!==0,[vt]:(this._castling[t]&Wt[vt])!==0}}moveNumber(){return this._moveNumber}}async function Xa(i,t={}){const e=t.currentUser||{};let l="chat",c=[],n=null,v=[],s=[],M=null,R=null,S=!1,T=null,P=null;i.innerHTML=`
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
  `,Ya(),await xt(),Ae();const B=i.querySelector("#tab-nav-chat"),ue=i.querySelector("#tab-nav-lounge"),ve=i.querySelector("#bonding-chat-main-wrap"),Oe=i.querySelector("#bonding-lounge-main-wrap");B?.addEventListener("click",()=>{l="chat",B.classList.add("active"),ue.classList.remove("active"),ve.style.display="grid",Oe.style.display="none",Ae()}),ue?.addEventListener("click",async()=>{l="lounge_games",ue.classList.add("active"),B.classList.remove("active"),ve.style.display="none",Oe.style.display="block",await r()}),i.querySelector("#btn-top-new-chat")?.addEventListener("click",y),i.querySelector("#btn-top-new-group")?.addEventListener("click",G),i.querySelector("#btn-top-challenge")?.addEventListener("click",()=>A());const Qe=i.querySelector("#bonding-search-input");Qe&&Qe.addEventListener("input",u=>{const p=u.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(o=>{const g=o.textContent.toLowerCase();o.style.display=g.includes(p)?"flex":"none"})}),ct(),new MutationObserver((u,p)=>{document.body.contains(i)||(R&&clearInterval(R),P&&clearInterval(P),p.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function xt(){try{const[u,p]=await Promise.all([ze("/bonding/channels").catch(()=>[]),ze("/bonding/colleagues").catch(()=>[])]);c=u,v=p,!n&&c.length>0&&(n=c.find(d=>d.name.includes("Lounge"))||c[0]),Fe(),n&&await Ce(n._id)}catch(u){console.error("Failed to load bonding data",u)}}async function Ce(u,p=!1){if(u)try{s=await ze(`/bonding/channels/${u}/messages`),p?I():a()}catch(d){console.error("Failed to load messages",d)}}function ct(){R&&clearInterval(R),R=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval(R);return}l==="chat"&&n?await Ce(n._id,!0):l==="lounge_games"&&await r(!0)}catch{}},3e3)}function Fe(){const u=i.querySelector("#bonding-group-list"),p=i.querySelector("#bonding-direct-list");if(!u||!p)return;const d=c.filter(g=>g.type==="group"),o=c.filter(g=>g.type==="direct");if(d.length===0)u.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const g=e?._id||e?.id,j=userRole==="superadmin"||e?.role==="superadmin";u.innerHTML=d.map(k=>{const D=n&&n._id===k._id,N=k.createdBy&&k.createdBy.userId&&String(k.createdBy.userId)===String(g)||j;return`
          <div class="bonding-channel-item ${D?"active":""}" data-channel-id="${k._id}">
            <div class="bonding-channel-icon">${k.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${h(k.name)}</div>
              <div class="bonding-channel-preview">${h(k.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${N?`
              <button class="bonding-channel-del-btn" data-channel-id="${k._id}" title="Delete Group (Creator only)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            `:`
              <button class="bonding-channel-leave-btn" data-channel-id="${k._id}" title="Leave Group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            `}
          </div>
        `}).join("")}o.length===0?p.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':p.innerHTML=o.map(g=>{const j=n&&n._id===g._id,k=g.displayName||g.name||"Colleague",D=k.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${j?"active":""}" data-channel-id="${g._id}">
            <div class="bonding-channel-avatar">${D}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${h(k)}</div>
              <div class="bonding-channel-preview">${h(g.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${g._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),pt()}function pt(){const u=i.querySelectorAll(".bonding-channel-item");u.forEach(p=>{p.onclick=async d=>{if(d.target.closest(".bonding-channel-del-btn")||d.target.closest(".bonding-channel-leave-btn"))return;const o=p.dataset.channelId,g=c.find(j=>j._id===o);g&&(n=g,u.forEach(j=>j.classList.remove("active")),p.classList.add("active"),Ae(),await Ce(g._id))}}),i.querySelectorAll(".bonding-channel-leave-btn").forEach(p=>{p.onclick=async d=>{d.stopPropagation();const o=p.dataset.channelId,j=c.find(k=>k._id===o)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${j}"?`))try{p.disabled=!0,await ke(`/bonding/channels/${o}/leave`,{}),x(`You left "${j}"`,"info"),c=c.filter(k=>k._id!==o),n&&n._id===o&&(n=c.find(k=>k.type==="group")||c[0]||null,Ae(),n&&await Ce(n._id)),Fe()}catch(k){x(k.message||"Failed to leave group","error"),p.disabled=!1}}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(p=>{p.onclick=async d=>{d.stopPropagation();const o=p.dataset.channelId,g=c.find(D=>D._id===o),j=g&&g.type==="direct",k=j?"this 1-on-1 chat":`the group "${g?.name||""}"`;if(confirm(`Are you sure you want to delete ${k}? All messages will be permanently removed.`))try{p.disabled=!0,await Ye(`/bonding/channels/${o}`),x(j?"1-on-1 chat deleted":"Group deleted","success"),c=c.filter(D=>D._id!==o),n&&n._id===o&&(n=c[0]||null,Ae(),n&&await Ce(n._id)),Fe()}catch(D){x(D.message||"Failed to delete conversation","error"),p.disabled=!1}}}),i.querySelector("#btn-create-group")?.addEventListener("click",G),i.querySelector("#btn-new-direct-chat")?.addEventListener("click",y)}function Ae(){const u=i.querySelector("#bonding-chat-panel");if(!u)return;if(!n){u.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const p=h(n.displayName||n.name),d=(n.members||[]).length,o=n.type==="group",g=e?._id||e?.id,j=o?null:(n.members||[]).find(N=>N.userId?.toString()!==g?.toString()),k=n.createdBy&&n.createdBy.userId&&String(n.createdBy.userId)===String(g),D=userRole==="superadmin"||e?.role==="superadmin",oe=k||D;u.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${o?n.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${p}</div>
            <div class="bonding-chat-sub">
              ${o?`<span>${d} members</span> · <span>${h(n.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${o?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${d})</span>
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
        ${nt()}
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
    `,Le(j),ce(j),tt(),_()}function nt(){if(!s||s.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const u=e?._id||e?.id;return s.map(p=>{const d=p.sender&&p.sender.userId&&u&&p.sender.userId.toString()===u.toString();if(p.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${p._id}">
            <span>ℹ️</span> <span>${h(p.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${p._id}" title="Delete Message">&times;</button>
          </div>
        `;if(p.type==="challenge"&&p.challengeData){const k=p.challengeData;if(k.status==="declined"||k.status==="cancelled")return"";const D=k.gameTitle||"Game Challenge",oe=k.gameType||"chess",N=oe==="chess"?"♟️":oe==="ludo"?"🎲":"❌",z=k.gameState?.invitationId,ie=k.targetUserId?.toString(),Q=p.sender?.userId?.toString(),K=u&&ie===u.toString(),Z=u&&Q===u.toString();return`
          <div class="bonding-msg-row ${d?"self":"other"}" data-msg-id="${p._id}">
            <div class="bonding-msg-avatar" title="${h(p.sender?.name||"Teammate")}">
              ${(p.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${h(p.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${re(p.createdAt)}</span>
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
                  <div class="game-bubble-icon">${N}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${h(D)}</h4>
                    <p class="game-bubble-desc">${h(p.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${k.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':k.status==="active"||k.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${h(k.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${k.status==="pending"&&K?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${z}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${z}" data-action="decline">
                        Decline
                      </button>
                    `:k.status==="pending"&&Z?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${z}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${z}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${rt(p)}
            </div>
          </div>
        `}const o=h(p.sender?.name||"Teammate"),g=re(p.createdAt),j=rt(p);return`
        <div class="bonding-msg-row ${d?"self":"other"}" data-msg-id="${p._id}">
          <div class="bonding-msg-avatar" title="${o}">${o.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${o}</span>
              <span class="bonding-msg-time">${g}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${p._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${h(p.content).replace(/\n/g,"<br/>")}
            </div>
            ${j}
          </div>
        </div>
      `}).join("")}function rt(u){return`
      <div class="bonding-reactions-row">
        ${(u.reactions||[]).map(o=>{const g=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(o.users||[]).some(k=>k.toString()===g?.toString())?"active":""}" data-msg-id="${u._id}" data-emoji="${o.emoji}">
          <span>${o.emoji}</span> <span>${o.users?o.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${u._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function Le(u){const p=i.querySelector("#btn-chat-challenge");p&&(p.onclick=()=>{u?A(null,u.userId||u._id):A()});const d=i.querySelector("#btn-manage-members");d&&(d.onclick=L);const o=i.querySelector("#btn-delete-group");o&&(o.onclick=U);const g=i.querySelector("#btn-leave-group");g&&(g.onclick=F);const j=i.querySelector("#btn-delete-direct");j&&(j.onclick=async()=>{if(n&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{j.disabled=!0,await Ye(`/bonding/channels/${n._id}`),x("1-on-1 chat deleted successfully","success");const D=n._id;c=c.filter(oe=>oe._id!==D),n=c[0]||null,Fe(),Ae(),n&&await Ce(n._id)}catch(D){x(D.message||"Could not delete 1-on-1 chat","error"),j.disabled=!1}});const k=i.querySelector("#btn-clear-chat");k&&(k.onclick=async()=>{if(n&&confirm("Are you sure you want to clear all messages in this conversation?"))try{k.disabled=!0,await Ye(`/bonding/channels/${n._id}/messages`),x("Chat messages cleared","success"),s=[],a()}catch(D){x(D.message||"Could not clear chat messages","error")}finally{k.disabled=!1}})}function ce(u){const p=i.querySelector("#bonding-message-input"),d=i.querySelector("#btn-send-message"),o=i.querySelector("#btn-quick-emoji"),g=i.querySelector("#btn-input-challenge");p&&p.addEventListener("keydown",j=>{j.key==="Enter"&&!j.shiftKey&&(j.preventDefault(),be())}),d&&(d.onclick=be),g&&(g.onclick=()=>{u?A(null,u.userId||u._id):A()}),o&&(o.onclick=()=>{if(!p)return;const j=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],k=j[Math.floor(Math.random()*j.length)];p.value+=(p.value?" ":"")+k,p.focus()})}function tt(){i.querySelectorAll(".btn-respond-invite").forEach(o=>{o.onclick=async()=>{const g=o.dataset.inviteId,j=o.dataset.action;await Y(g,j)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(o=>{o.onclick=async()=>{const g=o.dataset.inviteId;try{o.disabled=!0;const j=await ze("/bonding/invitations"),k=(j.incoming||[]).concat(j.sent||[]).find(D=>D._id===g);k&&k.matchId?W(k.matchId):x("Match has not started yet or has expired","warning")}catch(j){x(j.message||"Could not load match","error")}finally{o.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(o=>{o.onclick=async g=>{g.stopPropagation();const j=o.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{o.disabled=!0,await Ye(`/bonding/messages/${j}`),s=s.filter(k=>k._id!==j),I(),x("Message deleted","success")}catch(k){x(k.message||"Failed to delete message","error"),o.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(o=>{o.onclick=async()=>{const g=o.dataset.msgId,j=o.dataset.emoji;await m(g,j)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(o=>{o.onclick=g=>{const j=o.dataset.msgId;ae(g.currentTarget,async k=>{await m(j,k)})}})}async function be(){const u=i.querySelector("#bonding-message-input");if(!u||!n||S)return;const p=u.value.trim();if(p)try{S=!0,u.value="";const d=await ke(`/bonding/channels/${n._id}/messages`,{content:p,type:"text"});s.push(d),a(),_()}catch(d){x(d.message||"Failed to send message","error")}finally{S=!1,u.focus()}}async function m(u,p){try{const d=await ke(`/bonding/messages/${u}/react`,{emoji:p}),o=s.find(g=>g._id===u);o&&(o.reactions=d,I())}catch(d){x(d.message||"Failed to react","error")}}function _(){const u=i.querySelector("#bonding-messages-feed");u&&(u.scrollTop=u.scrollHeight)}function I(){const u=i.querySelector("#bonding-messages-feed");if(!u)return;const p=u.scrollHeight-u.scrollTop<=u.clientHeight+80;u.innerHTML=nt(),tt(),p&&_()}function a(){const u=i.querySelector("#bonding-messages-feed");u&&(u.innerHTML=nt(),tt())}async function r(u=!1){const p=i.querySelector("#bonding-lounge-main-wrap");if(p){u||(p.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const d=await ze("/bonding/games/overview");M=d;const o=d.myStats||{},g=d.availableGames||[],j=d.incomingChallenges||[],k=d.sentChallenges||[],D=d.activeMatches||[],oe=d.recentMatches||[],N=e?._id||e?.id;p.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${o.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${o.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${o.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${o.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${o.gamesPlayed>0?Math.round((o.wins||0)/o.gamesPlayed*100):0}%</span>
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
              ${g.map(z=>`
                <div class="lounge-game-card" data-game-id="${z.id}">
                  <div class="game-card-icon">${z.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${h(z.name)}</h4>
                    <p class="game-card-desc">${h(z.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${z.duration}</span>
                      ${z.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${z.id}" data-game-title="${h(z.name)}">
                    ${z.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${j.length+k.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${j.length})</h5>
              ${j.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${j.map(z=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(z.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${h(z.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${h(z.sender.name)}</strong> (${h(z.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${z._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${z._id}" data-action="decline">
                            Decline
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

              <!-- Sent -->
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${k.length})</h5>
              ${k.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${k.map(z=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(z.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${h(z.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${h(z.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${z._id}" data-action="cancel">
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
                <span class="badge green">${D.length} Live</span>
              </div>

              ${D.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${D.map(z=>{const Q=N&&z.player1.userId.toString()===N.toString()?z.player2:z.player1,K=N&&z.currentTurnUserId&&z.currentTurnUserId.toString()===N.toString();return`
                        <div class="lounge-active-match-card ${K?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${z.gameType==="chess"?"♟️":z.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${h(z.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${h(Q.name)}</strong> (${h(Q.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${K?"my-turn":"wait"}">
                              ${K?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${z._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${z._id}" title="Delete Match">
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
                  ${oe.map(z=>{const Q=N&&z.player1.userId.toString()===N.toString()?z.player2:z.player1,K=N&&z.winnerId&&z.winnerId.toString()===N.toString(),Z=z.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${h(z.gameTitle)}</span>
                          <span class="recent-date">${re(z.completedAt||z.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${z._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${h(Q.name)}</strong></div>
                          <div class="recent-outcome ${K?"win":Z?"draw":"loss"}">
                            ${K?"🏆 VICTORY":Z?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${h(z.winningReason||z.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${z._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${z._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,C()}catch(d){p.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${h(d.message)}</p>
        </div>
      `}}}function C(){i.querySelectorAll(".btn-challenge-game").forEach(p=>{p.onclick=()=>{const d=p.dataset.gameId;A(d)}}),i.querySelectorAll(".btn-respond-invite").forEach(p=>{p.onclick=async()=>{const d=p.dataset.inviteId,o=p.dataset.action;await Y(d,o),await r()}}),i.querySelectorAll(".btn-resume-match").forEach(p=>{p.onclick=()=>{const d=p.dataset.matchId;W(d)}}),i.querySelectorAll(".btn-recent-rematch").forEach(p=>{p.onclick=async()=>{const d=p.dataset.matchId;try{p.disabled=!0;const o=await ke(`/bonding/matches/${d}/action`,{action:"rematch"});o.match&&(x("Rematch created! Opening arena ⚔️","success"),W(o.match._id))}catch(o){x(o.message||"Could not start rematch","error")}finally{p.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(p=>{p.onclick=async d=>{d.stopPropagation();const o=p.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{p.disabled=!0,await Ye(`/bonding/matches/${o}`),x("Match deleted successfully","success"),await r()}catch(g){x(g.message||"Failed to delete match","error")}finally{p.disabled=!1}}});const u=i.querySelector("#btn-clear-matches");u&&(u.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{u.disabled=!0,await Ye("/bonding/matches?filter=completed"),x("Completed matches history cleared","success"),await r()}catch(p){x(p.message||"Failed to clear matches","error")}finally{u.disabled=!1}})}function A(u=null,p=null){const d=i.querySelector("#bonding-modals-root"),o=e?._id||e?.id,g=new Set(["employee","admin","superadmin"]),j=v.filter(K=>!K.isSelf&&K._id.toString()!==o?.toString()&&g.has(K.role));let k=u||"chess",D=p?p.toString():null,oe=2,N=D?[D]:[],z="none";function ie(){const K=j.find(se=>se._id.toString()===D),Z=k==="ludo",V=oe-1,ee=N.length===V;d.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${Z?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${k==="chess"?"active":""}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${k==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                  <button class="game-pill-btn ${k==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                </div>
              </div>

              <!-- LUDO SPECIAL: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${Z?`
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
                  ${Z?`Step 3 — Select Colleagues to Play With (${N.length}/${V} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${j.map(se=>{const fe=Z?N.includes(se._id.toString()):D===se._id.toString();return`
                      <div class="eligible-emp-item ${fe?"selected":""}" data-user-id="${se._id}">
                        <div class="emp-item-avatar">${se.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${h(se.name)}</span>
                          <span class="emp-item-role">${h(se.role==="superadmin"?"Superadmin":se.role==="admin"?"Admin":"Employee")} · ${h(se.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${fe?"active":""}">
                          ${fe?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Step for Chess timers -->
              ${k==="chess"?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 3 — Time Control Options</div>
                  <div class="timer-opts-row">
                    <label class="timer-radio-lbl ${z==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${z==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${z==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${z==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${z==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${z==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${Z?`🎲 Ludo (${oe} Players · 4 Pawns per base)`:k==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${Z?`
                    <div><strong>Opponents:</strong> ${N.length>0?N.map(se=>{const fe=j.find($e=>$e._id.toString()===se);return fe?`<strong>${h(fe.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+V+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${K?`<strong>${h(K.name)}</strong> (${h(K.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${k==="chess"?`<div><strong>Time Control:</strong> ${z==="none"?"Untimed":z}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(Z?!ee:!D)?"disabled":""}>
                ${Z?`Start ${oe}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,Q()}function Q(){d.querySelector(".bonding-modal-close").onclick=()=>{d.innerHTML=""},d.querySelector("#btn-cancel-challenge-flow").onclick=()=>{d.innerHTML=""},d.querySelectorAll(".game-pill-btn").forEach(V=>{V.onclick=()=>{k=V.dataset.game,ie()}}),d.querySelectorAll(".ludo-mode-btn").forEach(V=>{V.onclick=()=>{oe=Number(V.dataset.count),N=N.slice(0,oe-1),ie()}});const K=d.querySelector("#flow-emp-search");K&&(K.oninput=V=>{const ee=V.target.value.toLowerCase().trim();d.querySelectorAll(".eligible-emp-item").forEach(se=>{const fe=se.textContent.toLowerCase();se.style.display=fe.includes(ee)?"flex":"none"})}),d.querySelectorAll(".eligible-emp-item").forEach(V=>{V.onclick=()=>{const ee=V.dataset.userId;if(k==="ludo"){const se=oe-1;N.includes(ee)?N=N.filter(fe=>fe!==ee):N.length<se?N.push(ee):N[se-1]=ee}else D=ee;ie()}}),d.querySelectorAll('input[name="timerMode"]').forEach(V=>{V.onchange=ee=>{z=ee.target.value,ie()}});const Z=d.querySelector("#btn-submit-challenge-flow");Z&&(Z.onclick=async()=>{if(k==="ludo"){const V=oe-1;if(N.length<V){x(`Please select ${V} colleague(s) to play with`,"warning");return}try{Z.disabled=!0,Z.textContent="Launching Match...";const ee=await ke("/bonding/matches/instant-ludo",{playerCount:oe,targetUserIds:N});d.innerHTML="",x(`Ludo match started (${oe} Players)! 🎲`,"success"),ee&&ee._id&&W(ee._id)}catch(ee){x(ee.message||"Failed to start Ludo match","error"),Z.disabled=!1,Z.textContent=`Start ${oe}P Ludo Match 🎲`}return}if(!D){x("Please select an employee to challenge","warning");return}try{Z.disabled=!0,Z.textContent="Sending Challenge...",await ke("/bonding/invitations",{gameType:k,targetUserId:D,matchSettings:{timerMode:z},channelId:n?._id||null}),x("Game challenge delivered! Awaiting acceptance ⚔️","success"),d.innerHTML="",n&&await Ce(n._id),l==="lounge_games"&&await r()}catch(V){x(V.message||"Could not send challenge","error"),Z.disabled=!1,Z.textContent="Send Challenge 🚀"}})}ie()}async function Y(u,p){if(!(!u||!p))try{const d=await Kt(`/bonding/invitations/${u}/respond`,{action:p});p==="accept"?(x("Challenge accepted! Entering match arena ⚔️","success"),d.match&&W(d.match._id)):p==="decline"?(x("Challenge declined","info"),i.querySelectorAll(`[data-invite-id="${u}"]`).forEach(o=>{const g=o.closest(".lounge-invite-item")||o.closest(".bonding-msg-row");g&&g.remove()})):p==="cancel"&&(x("Challenge cancelled","info"),i.querySelectorAll(`[data-invite-id="${u}"]`).forEach(o=>{const g=o.closest(".lounge-invite-item")||o.closest(".bonding-msg-row");g&&g.remove()})),n&&await Ce(n._id),l==="lounge_games"&&await r()}catch(d){x(d.message||"Action failed","error")}}async function W(u){if(!u)return;T=u,P&&clearInterval(P);const p=i.querySelector("#bonding-modals-root");let d=null,o=null,g=[];async function j(){try{return d=await ze(`/bonding/matches/${u}`),d}catch(Q){return x(Q.message||"Could not load match","error"),k(),null}}if(d=await j(),!d)return;function k(){P&&clearInterval(P),T=null,p.innerHTML="",l==="lounge_games"&&r(!0),n&&Ce(n._id,!0)}P=setInterval(async()=>{if(!T||T!==u){clearInterval(P);return}const Q=d?.currentTurnUserId?.toString(),K=d?.status,Z=await j();Z&&(Z.currentTurnUserId?.toString()!==Q||Z.status!==K||Z.moves?.length!==d.moves?.length)&&D()},1500);function D(){if(!d)return;const Q=e?._id||e?.id,K=Q&&d.player1.userId.toString()===Q.toString(),Z=K?d.player1:d.player2,V=K?d.player2:d.player1,ee=Q&&d.currentTurnUserId&&d.currentTurnUserId.toString()===Q.toString(),se=d.status!=="active";p.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${d.gameType==="ludo"?"🎲":d.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${h(d.gameTitle)}</h3>
                  ${d.gameType==="ludo"&&d.gameState?.players?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${d.gameState.players.map(fe=>{const $e=fe.userId&&fe.userId.toString()===Q?.toString(),Ie={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[fe.color]||"⚪",pe=(d.gameState?.turnColor||d.turn)===fe.color;return`
                          <span class="player-tag ${$e?"self":"opp"} ${pe?"turn-active":""}">
                            ${Ie} <strong>${h(fe.name)}</strong> ${$e?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${h(Z.name)} (You · <strong>${d.gameType==="ludo"?Z.assignedRole==="red"?"🔴 Red":"🟢 Green":d.gameType==="tictactoe"?Z.assignedRole==="X"?"✕":"◯":Z.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${h(V.name)} (<strong>${d.gameType==="ludo"?V.assignedRole==="red"?"🔴 Red":"🟢 Green":d.gameType==="tictactoe"?V.assignedRole==="X"?"✕":"◯":V.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${se?"ended":ee?"my-turn":"opp-turn"}">
                ${se?`<span>🏁 Finished (${h(d.winningReason||d.status)})</span>`:ee?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${h(V.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${d.gameType==="ludo"?ee?d.gameState?.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":d.gameType==="tictactoe"?ee?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":ee?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${se?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${d.drawOfferedBy&&d.drawOfferedBy.toString()!==Q?.toString()&&!se?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${h(V.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${d.gameType==="chess"?oe(K):""}
              ${d.gameType==="tictactoe"?N():""}
              ${d.gameType==="ludo"?z(K):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${se?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${d.winnerId&&d.winnerId.toString()===Q?.toString()?"🏆":d.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${d.winnerId&&d.winnerId.toString()===Q?.toString()?"VICTORY!":d.status==="draw"?"STALEMATE / DRAW":`${h(d.winnerName)} Wins!`}</h4>
                  <p>Reason: ${h(d.winningReason||"Match concluded")}</p>
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
      `,ie(ee,K,Z)}function oe(Q){const K=d.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Z=new xa(K),V=Q?d.player1.assignedRole==="white":d.player2.assignedRole==="white",ee={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},se=V?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],fe=V?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let $e='<div class="chess-board-grid">';for(const we of fe)for(const Re of se){const Ee=`${Re}${we}`,je=Z.get(Ee),Se=(Re.charCodeAt(0)-97+we)%2!==0,xe=o===Ee,ye=g.includes(Ee),_e=je?je.color==="w"?ee[je.type.toUpperCase()]:ee[je.type]:"";$e+=`
            <div class="chess-sq ${Se?"light":"dark"} ${xe?"selected":""} ${ye?"legal-dot":""}" data-square="${Ee}">
              ${_e?`<span class="chess-piece ${je.color==="w"?"white-piece":"black-piece"}">${_e}</span>`:""}
            </div>
          `}$e+="</div>";const pe=(d.moves||[]).map(we=>`
        <span class="chess-move-token">${we.moveNum}. ${we.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${$e}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${pe||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function N(){const Q=d.gameState?.board||Array(9).fill(null),K=d.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${Q.map((Z,V)=>{const ee=K.includes(V);return`
                <div class="ttt-cell ${Z?"filled":"empty"} ${ee?"win-cell":""}" data-cell-idx="${V}">
                  ${Z==="X"?'<span class="ttt-x">✕</span>':Z==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function z(Q,K,Z){const V=d.gameState||{},ee=V.activeColors||["red","green"],se=V.players||[{...d.player1,color:"red",assignedRole:"red",isBot:!1},{...d.player2,color:"green",assignedRole:"green",isBot:!1}],fe=V.tokens||{},$e=q=>{const te=fe[q]||(q==="red"?V.p1Tokens:q==="green"?V.p2Tokens:[])||[];return Array.from({length:4},(he,Be)=>te[Be]||{id:Be,step:-1})},Ie=$e("red"),pe=$e("green"),we=$e("yellow"),Re=$e("blue"),Ee=e?._id||e?.id,Se=(se.find(q=>q.userId&&q.userId.toString()===Ee?.toString())||se[0])?.color||(Q?"red":"green"),xe=V.turnColor||d.turn||"red",ye=Se===xe&&d.status==="active",_e=!!V.rolled,Me=V.dice,Ge=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],at=[[7,1],[7,2],[7,3],[7,4],[7,5]],Tt=[[1,7],[2,7],[3,7],[4,7],[5,7]],jt=[[7,13],[7,12],[7,11],[7,10],[7,9]],lt=[[13,7],[12,7],[11,7],[10,7],[9,7]],E=[0,8,13,21,26,34,39,47];function H(q,te){return te<0?null:te>=56?q==="red"?[7,6]:q==="green"?[6,7]:q==="yellow"?[7,8]:[8,7]:q==="red"?te<=50?Ge[te]:at[te-51]:q==="green"?te<=50?Ge[(13+te)%52]:Tt[te-51]:q==="yellow"?te<=50?Ge[(26+te)%52]:jt[te-51]:te<=50?Ge[(39+te)%52]:lt[te-51]}function b(q,te){return q!==Se||!ye||!_e||!Me||d.status!=="active"?!1:te.step===-1?Me===6:te.step>=0&&te.step+Me<=56}const Te={},me=(q,te)=>{te.forEach(he=>{if(he.step>=0&&he.step<56){const Be=H(q,he.step);if(Be){const Ke=Be[0]+","+Be[1];(Te[Ke]=Te[Ke]||[]).push({color:q,id:he.id,step:he.step,movable:b(q,he)})}}})};ee.includes("red")&&me("red",Ie),ee.includes("green")&&me("green",pe),ee.includes("yellow")&&me("yellow",we),ee.includes("blue")&&me("blue",Re);const st={};Ge.forEach(([q,te],he)=>{st[q+","+te]=he});const O={};at.forEach(([q,te],he)=>{O[q+","+te]=he+1});const ut={};Tt.forEach(([q,te],he)=>{ut[q+","+te]=he+1});const De={};jt.forEach(([q,te],he)=>{De[q+","+te]=he+1});const Xe={};lt.forEach(([q,te],he)=>{Xe[q+","+te]=he+1});const Bt=[];for(let q=0;q<15;q++)for(let te=0;te<15;te++){if(q<6&&te<6||q<6&&te>8||q>8&&te<6||q>8&&te>8||q>=6&&q<=8&&te>=6&&te<=8)continue;const he=q+","+te,Be=st[he],Ke=Be!==void 0&&E.includes(Be),ot=q===6&&te===1,bt=q===1&&te===8,Ze=q===8&&te===13,Dt=q===13&&te===6,Ue=O[he],f=ut[he],w=De[he],$=Xe[he];let J="ludo-cell";ot?J+=" cell-red-start":bt?J+=" cell-green-start":Ze?J+=" cell-yellow-start":Dt?J+=" cell-blue-start":Ue?J+=" cell-red-stretch":f?J+=" cell-green-stretch":w?J+=" cell-yellow-stretch":$?J+=" cell-blue-stretch":Ke&&(J+=" cell-safe-star");const ne=Te[he]||[];Bt.push(`
            <div class="${J}" style="grid-row:${q+1};grid-column:${te+1}" data-pos="${he}">
              ${Ke?'<span class="cell-star-glyph">⭐</span>':""}
              ${ot||bt||Ze||Dt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${ne.map(ge=>`
                <div class="ludo-token token-${ge.color} ${ge.movable?"movable":""}" data-token-id="${ge.id}" data-color="${ge.color}" title="${ge.color.toUpperCase()} Pawn ${ge.id+1}">
                  <span>${ge.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function Je(q){const te=Math.max(1,Math.min(6,Number(q)||1)),he={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,7,9,5],6:[1,4,7,3,6,9]},Be=new Set(he[te]||[5]);let Ke="";for(let ot=1;ot<=9;ot++)Ke+=`<span class="ludo-pip ${Be.has(ot)?"filled":"empty"}"></span>`;return`<div class="ludo-dice-face face-${te}">${Ke}</div>`}function yt(q,te,he,Be,Ke){const ot=`${q}-yard`;if(!he)return`
            <div class="ludo-yard ${ot}">
              <div class="yard-box decorative">
                <div class="yard-title">${te} (Inactive)</div>
              </div>
            </div>
          `;const bt=Ke.filter(Ze=>Ze.step===56).length;return`
          <div class="ludo-yard ${ot} ${xe===q?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${te}</span>
                ${bt>0?`<span class="yard-home-badge" title="${bt} of 4 pawns reached Home!">👑 ${bt}/4 Home</span>`:""}
                ${Be?`<small class="yard-player-lbl">${h(Be.name)}${Be.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${Ke.map((Ze,Dt)=>`
                  <div class="yard-token-slot">
                    ${Ze.step===-1?`
                      <div class="ludo-token token-${q} ${b(q,Ze)?"movable":""}" data-token-id="${Ze.id}" data-color="${q}" title="${q.toUpperCase()} Pawn ${Ze.id+1}">
                        <span>${Ze.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${Dt+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Pt=se.find(q=>q.color==="red"),X=se.find(q=>q.color==="green"),Qt=se.find(q=>q.color==="yellow"),Nt=se.find(q=>q.color==="blue"),Ot=se.find(q=>q.color===xe)||(xe==="red"?Pt:X),kt=Ot?h(Ot.name):xe.toUpperCase(),It={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[xe]||"🔴",gt=Me||V.lastRoll||6,At=ye&&!_e&&d.status==="active",Lt=$e(Se).filter(q=>b(Se,q));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${yt("red","🔴 Red Base",ee.includes("red"),Pt,Ie)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${yt("green","🟢 Green Base",ee.includes("green"),X,pe)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${yt("blue","🔵 Blue Base",ee.includes("blue"),Nt,Re)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${yt("yellow","🟡 Yellow Base",ee.includes("yellow"),Qt,we)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...Ie.filter(q=>q.step===56).map(q=>({col:"red",id:q.id})),...pe.filter(q=>q.step===56).map(q=>({col:"green",id:q.id})),...we.filter(q=>q.step===56).map(q=>({col:"yellow",id:q.id})),...Re.filter(q=>q.step===56).map(q=>({col:"blue",id:q.id}))].map(q=>`
                    <div class="tok-home-champion ${q.col}" title="${q.col.toUpperCase()} Pawn ${q.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${q.id+1}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Bt.join("")}
          </div>

          <!-- Ludo Action & 3D Interactive Dice Console (Clickable dice replaces text button, opponent dice visible!) -->
          <div class="ludo-interactive-console">
            <div class="ludo-dice-interactive-box">
              <div 
                class="ludo-3d-dice ${At?"clickable pulse-roll":""} ${_e?"just-rolled":""} border-${xe}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${At?"0":"-1"}"
                title="${At?"Click Dice to Roll!":ye?"Choose a pawn to move":`${kt}'s turn`}"
              >
                ${Je(gt)}
              </div>
              <div class="ludo-dice-action-badge">
                ${At?'<span class="badge-click-roll">🎲 TAP TO ROLL</span>':_e?`<span class="badge-rolled-val">${It} Rolled ${gt}</span>`:V.lastRoll?`<span class="badge-last-roll">${It} Rolled ${V.lastRoll}</span>`:'<span class="badge-waiting">Ready</span>'}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${xe}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${It} ${kt}</strong> (${xe.toUpperCase()})
                </span>
                ${ye?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${ye&&_e?"highlight":""}">
                ${ye&&!_e&&d.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":ye&&_e&&d.status==="active"?Lt.length>0?Lt.length===1?`🎲 Rolled <strong>${gt}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${gt}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${gt}</strong>. No legal moves possible — turn passing...`:d.status==="active"?_e||V.lastRoll?`🎲 ${It} <strong>${kt}</strong> rolled <strong>${gt}</strong>!`:`⏳ Waiting for <strong>${kt}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${h(V.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function ie(Q,K,Z){p.querySelector("#btn-close-arena").onclick=k;const V=p.querySelector("#btn-arena-resign");V&&(V.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{V.disabled=!0,await ke(`/bonding/matches/${u}/action`,{action:"resign"}),await j(),D()}catch(pe){x(pe.message||"Resign failed","error"),V.disabled=!1}});const ee=p.querySelector("#btn-arena-draw");ee&&(ee.onclick=async()=>{try{await ke(`/bonding/matches/${u}/action`,{action:"offer_draw"}),x("Draw offer sent to opponent","info"),await j(),D()}catch(pe){x(pe.message||"Draw offer failed","error")}});const se=p.querySelector("#btn-confirm-accept-draw");se&&(se.onclick=async()=>{try{await ke(`/bonding/matches/${u}/action`,{action:"accept_draw"}),x("Draw agreed!","info"),await j(),D()}catch(pe){x(pe.message,"error")}});const fe=p.querySelector("#btn-confirm-decline-draw");fe&&(fe.onclick=async()=>{try{await ke(`/bonding/matches/${u}/action`,{action:"decline_draw"}),await j(),D()}catch(pe){x(pe.message,"error")}}),[p.querySelector("#btn-arena-delete-match"),p.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(pe=>{pe.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{pe.disabled=!0,await Ye(`/bonding/matches/${u}`),x("Match deleted","success"),k(),l==="lounge_games"&&await r()}catch(we){x(we.message||"Failed to delete match","error"),pe.disabled=!1}}});const Ie=p.querySelector("#btn-arena-rematch-action");if(Ie&&(Ie.onclick=async()=>{try{Ie.disabled=!0,Ie.textContent="Creating Rematch...";const pe=await ke(`/bonding/matches/${u}/action`,{action:"rematch"});pe.match&&(x("Rematch created! New match live ⚔️","success"),P&&clearInterval(P),W(pe.match._id))}catch(pe){x(pe.message||"Rematch failed","error"),Ie.disabled=!1,Ie.textContent="🔄 Request Rematch"}}),d.gameType==="chess"&&Q&&d.status==="active"){const pe=d.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",we=new xa(pe),Re=Z.assignedRole==="white"?"w":"b";p.querySelectorAll(".chess-sq").forEach(Ee=>{Ee.onclick=async()=>{const je=Ee.dataset.square;if(o){if(o===je){o=null,g=[],D();return}if(g.includes(je)){const xe=we.get(o);let ye;xe&&xe.type==="p"&&(je.endsWith("8")||je.endsWith("1"))&&(ye=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const _e={from:o,to:je,promotion:ye?ye.toLowerCase():void 0};o=null,g=[],d=await ke(`/bonding/matches/${u}/move`,{move:_e}),D()}catch(_e){x(_e.message||"Illegal chess move","error"),o=null,g=[],D()}return}}const Se=we.get(je);Se&&Se.color===Re?(o=je,g=we.moves({square:je,verbose:!0}).map(ye=>ye.to),D()):(o=null,g=[],D())}})}if(d.gameType==="tictactoe"&&Q&&d.status==="active"&&p.querySelectorAll(".ttt-cell.empty").forEach(pe=>{pe.onclick=async()=>{const we=pe.dataset.cellIdx;try{pe.style.opacity="0.5",d=await ke(`/bonding/matches/${u}/move`,{cellIndex:Number(we)}),D()}catch(Re){x(Re.message||"Invalid move","error")}}}),d.gameType==="ludo"&&d.status==="active"){const pe=d.gameState||{},we=!!pe.rolled,Re=pe.turnColor||d.turn||"red",Ee=d.player1.userId.toString()===myId?.toString()?d.player1.assignedRole||"red":d.player2.userId.toString()===myId?.toString()?d.player2.assignedRole||"green":(pe.players||[]).find(xe=>xe.userId?.toString()===myId?.toString())?.color||"red",je=Q&&Re===Ee,Se=p.querySelector("#btn-interactive-ludo-dice");if(Se&&je&&!we){const xe=async()=>{if(Se.dataset.rolling!=="true"){Se.dataset.rolling="true",Se.classList.add("rolling");try{d=await ke(`/bonding/matches/${u}/move`,{action:"roll"}),D()}catch(ye){x(ye.message||"Failed to roll","error"),Se.classList.remove("rolling"),delete Se.dataset.rolling}}};Se.onclick=xe,Se.onkeydown=ye=>{(ye.key==="Enter"||ye.key===" ")&&(ye.preventDefault(),xe())}}if(je&&we){const ye=(pe.tokens||{})[Ee]||[],_e=pe.dice||pe.lastRoll||0,Me=ye.filter(Ge=>Ge.step===-1&&_e===6||Ge.step>=0&&Ge.step+_e<=56);if(Me.length===1&&!window.__ci360LudoAutoMoving){window.__ci360LudoAutoMoving=!0;const Ge=Me[0];setTimeout(async()=>{try{d=await ke(`/bonding/matches/${u}/move`,{action:"move",tokenId:Number(Ge.id)}),window.__ci360LudoAutoMoving=!1,D()}catch(at){window.__ci360LudoAutoMoving=!1,x(at.message||"Auto-move failed","error")}},450)}}je&&we&&p.querySelectorAll(".ludo-token.movable").forEach(xe=>{xe.onclick=async ye=>{ye.stopPropagation();const _e=xe.dataset.tokenId;try{xe.style.opacity="0.5",d=await ke(`/bonding/matches/${u}/move`,{action:"move",tokenId:Number(_e)}),D()}catch(Me){x(Me.message||"Invalid token move","error"),xe.style.opacity="1"}}})}}D()}function L(){if(!n||n.type==="direct")return;const u=i.querySelector("#bonding-modals-root"),p=N=>N==="employee"||N==="admin"||N==="superadmin",d=n.members||[],o=new Set(d.map(N=>N.userId?.toString())),g=v.filter(N=>p(N.role)&&!o.has(N._id.toString()));u.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${h(n.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${g.map(N=>`
                    <option value="${N._id}">${h(N.name)} (${h(N.role==="superadmin"?"Superadmin":N.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${g.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${g.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${d.length}):</label>
              <div class="bonding-members-list">
                ${d.map(N=>{const z=e?._id||e?.id,ie=z&&N.userId&&N.userId.toString()===z.toString(),Q=n.createdBy&&n.createdBy.userId&&String(n.createdBy.userId)===String(z),K=userRole==="superadmin"||e?.role==="superadmin",Z=Q||K;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(N.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${h(N.name)} ${ie?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${h(N.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${ie?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${N.userId}">
                            🚪 Leave Group
                          </button>
                        `:Z?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${N.userId}" data-name="${h(N.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const N=e?._id||e?.id,z=n.createdBy&&n.createdBy.userId&&String(n.createdBy.userId)===String(N),ie=userRole==="superadmin"||e?.role==="superadmin";return z||ie?`
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""};const j=u.querySelector("#btn-modal-delete-group");j&&(j.onclick=()=>{u.innerHTML="",U()});const k=u.querySelector("#btn-modal-leave-group");k&&(k.onclick=()=>{u.innerHTML="",F()}),u.querySelectorAll(".btn-leave-group-action").forEach(N=>{N.onclick=()=>{u.innerHTML="",F()}});const D=u.querySelector("#btn-submit-add-member");D&&(D.onclick=async()=>{const z=u.querySelector("#sel-add-colleague").value;if(!z){x("Please select a colleague to add","warning");return}try{D.disabled=!0,D.textContent="Adding...";const ie=await Kt(`/bonding/channels/${n._id}/members`,{action:"add",userIds:[z]});x("Colleague added to group! 🎉","success"),n=ie.channel,u.innerHTML="",await Ce(n._id),Ae()}catch(ie){x(ie.message||"Failed to add member","error"),D.disabled=!1,D.textContent="Add to Group"}}),u.querySelectorAll(".btn-remove-member").forEach(N=>{N.onclick=async()=>{const z=N.dataset.userId,ie=N.dataset.name;if(confirm(`Are you sure you want to remove ${ie} from this group?`))try{N.disabled=!0;const Q=await Kt(`/bonding/channels/${n._id}/members`,{action:"remove",userId:z});x(`${ie} removed from group`,"info"),n=Q.channel,u.innerHTML="",await Ce(n._id),Ae()}catch(Q){x(Q.message||"Failed to remove member","error"),N.disabled=!1}}})}async function F(){if(!n||n.type==="direct")return;const u=n.name;if(confirm(`Are you sure you want to leave the group "${u}"?`))try{await ke(`/bonding/channels/${n._id}/leave`,{}),x(`You left "${u}"`,"info"),c=await ze("/bonding/channels").catch(()=>[]),n=c.find(d=>d.type==="group")||c[0]||null,Fe(),Ae(),n&&await Ce(n._id)}catch(d){x(d.message||"Failed to leave group","error")}}async function U(){if(!n||n.type==="direct")return;const u=n.name;if(confirm(`Are you sure you want to delete the group "${u}"?

All messages in this lounge will be deleted.`))try{await Ye(`/bonding/channels/${n._id}`),x(`Group "${u}" deleted successfully`,"success"),c=await ze("/bonding/channels").catch(()=>[]),n=c.find(d=>d.type==="group")||c[0]||null,Fe(),Ae(),n&&await Ce(n._id)}catch(d){x(d.message||"Failed to delete group","error")}}function y(){const u=i.querySelector("#bonding-modals-root"),p=g=>g==="employee"||g==="admin"||g==="superadmin",d=v.filter(g=>!g.isSelf&&p(g.role));u.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${d.map(g=>`
                <div class="bonding-user-pick-item" data-user-id="${g._id}" data-name="${h(g.name)}">
                  <div class="bonding-member-avatar">${g.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${h(g.name)}</span>
                    <span class="user-pick-role">${h(g.role==="superadmin"?"Superadmin":g.role==="admin"?"Admin":"Employee")} · ${h(g.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelectorAll(".bonding-user-pick-item").forEach(g=>{g.onclick=async()=>{const j=g.dataset.userId;try{const k=await ke("/bonding/channels",{type:"direct",targetUserId:j});u.innerHTML="",c=await ze("/bonding/channels"),n=c.find(D=>D._id===k._id)||k,Fe(),Ae(),await Ce(n._id)}catch(k){x(k.message||"Failed to open personal chat","error")}}})}function G(){const u=i.querySelector("#bonding-modals-root"),p=k=>k==="employee"||k==="admin"||k==="superadmin",d=v.filter(k=>!k.isSelf&&p(k.role));u.innerHTML=`
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
                ${d.map(k=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${k._id}" />
                    <span>${h(k.name)} (${h(k.role==="superadmin"?"Superadmin":k.role==="admin"?"Admin":"Employee")})</span>
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelector("#btn-cancel-create-grp").onclick=()=>{u.innerHTML=""};let o="👥";const g=u.querySelectorAll(".avatar-opt");g.forEach(k=>{k.onclick=()=>{g.forEach(D=>D.classList.remove("active")),k.classList.add("active"),o=k.textContent.trim()}});const j=u.querySelector("#btn-confirm-create-grp");j.onclick=async()=>{const k=u.querySelector("#new-group-name"),D=u.querySelector("#new-group-desc"),oe=k.value.trim();if(!oe){x("Please enter a group name","warning"),k.focus();return}const N=u.querySelectorAll(".new-group-member-chk:checked"),z=Array.from(N).map(ie=>ie.value);try{j.disabled=!0,j.textContent="Creating...";const ie=await ke("/bonding/channels",{type:"group",name:oe,description:D.value.trim(),avatar:o,memberIds:z});x(`Group "${oe}" created! 🎉`,"success"),u.innerHTML="",c=await ze("/bonding/channels"),n=c.find(Q=>Q._id===ie._id)||ie,Fe(),Ae(),await Ce(n._id)}catch(ie){x(ie.message||"Failed to create group","error"),j.disabled=!1,j.textContent="Create Group 🎉"}}}function ae(u,p){const d=document.querySelector(".bonding-emoji-popup");d&&d.remove();const o=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],g=document.createElement("div");g.className="bonding-emoji-popup",g.innerHTML=o.map(D=>`<button class="emoji-opt-btn" data-e="${D}">${D}</button>`).join("");const j=u.getBoundingClientRect();g.style.top=`${j.bottom+window.scrollY+6}px`,g.style.left=`${j.left+window.scrollX}px`,document.body.appendChild(g),g.querySelectorAll(".emoji-opt-btn").forEach(D=>{D.onclick=oe=>{oe.stopPropagation(),p(D.dataset.e),g.remove()}});const k=D=>{g.contains(D.target)||(g.remove(),document.removeEventListener("click",k))};setTimeout(()=>document.addEventListener("click",k),10)}function re(u){if(!u)return"";try{return new Date(u).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Ya(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}function ya(i){if(!i)return"";const t=h(i),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return t.replace(e,l=>`<a href="${l}" target="_blank" rel="noopener noreferrer" class="jira-inline-link">${l} ↗</a>`)}const la=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],Ct=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],qt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function Za(i,t={}){const{userRole:e="employee",currentUser:l=null,initialTicketId:c=null}=t,n=e==="superadmin"||e==="admin";if(e==="client"||l&&l.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let v=[],s={},M=[],R=[],S={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},T=null,P="comments",B=!1;i.innerHTML=`
    <div class="jira-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="jira-header-bar">
        <div class="jira-header-left">
          <div class="jira-breadcrumb">
            <span class="jira-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${n?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="jira-title-row">
            <h2 class="jira-main-title">🎫 ${n?"Support Tickets Board":"Support Tickets"}</h2>
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
            ${Ct.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
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
  `,await Promise.all([Qe(),Oe(),dt(),xt()]),Ce(),Fe(),ct(),rt(),c&&tt(c);const ue=setInterval(()=>{if(!document.contains(i)){clearInterval(ue);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!T&&ce()},12e3),ve=()=>{document.contains(i)&&!T&&ce()};window.addEventListener("focus",ve);async function Oe(){try{const a=new URLSearchParams;S.search&&a.set("search",S.search),S.priority!=="all"&&a.set("priority",S.priority),S.category!=="all"&&a.set("category",S.category),S.assigneeId!=="all"&&a.set("assigneeId",S.assigneeId),S.jobId&&S.jobId!=="all"&&a.set("jobId",S.jobId),S.reporterId&&S.reporterId!=="all"&&a.set("reporterId",S.reporterId),S.scope==="created"&&a.set("reporterId",l?._id||l?.id),S.scope==="assigned"&&a.set("assigneeId",l?._id||l?.id),S.myIssuesOnly&&a.set("myIssuesOnly","true");const r=await ze("/tickets?"+a.toString());v=Array.isArray(r)?r:[]}catch(a){x(a.message||"Failed to load tickets",!0),v=[]}}async function Qe(){try{s=await ze("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function dt(){try{let a;try{a=await ze("/tickets/staff")}catch{a=await ze("/users")}M=(a||[]).filter(r=>r.active!==!1&&r.role!=="client")}catch(a){console.warn("Could not fetch employees:",a),M=[]}}async function xt(){try{const a=await ze("/jobs?limit=250");R=Array.isArray(a)?a:a?.jobs||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function Ce(){const a=i.querySelector("#jira-stats-root");a&&(a.innerHTML=`
      <div class="jira-stat-card ${S.status==="all"&&!S.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="jira-stat-val">${s.total||0}</span>
        <span class="jira-stat-lbl">Total Tickets</span>
      </div>
      <div class="jira-stat-card ${S.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="jira-stat-val">${s.toDo||0}</span>
        <span class="jira-stat-lbl">To Do</span>
      </div>
      <div class="jira-stat-card content ${S.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="jira-stat-val">${s.content??(s.inProgress||0)}</span>
        <span class="jira-stat-lbl">Content</span>
      </div>
      <div class="jira-stat-card design ${S.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="jira-stat-val">${s.design||0}</span>
        <span class="jira-stat-lbl">Design</span>
      </div>
      <div class="jira-stat-card review ${S.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="jira-stat-val">${s.underReview||0}</span>
        <span class="jira-stat-lbl">Under Review</span>
      </div>
      <div class="jira-stat-card ready ${S.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
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
    `,a.querySelectorAll(".jira-stat-card").forEach(r=>{r.onclick=async()=>{const C=r.dataset.statFilter;C==="all"?(S.status="all",S.priority="all"):C==="critical"?(S.priority="Critical",S.status="all"):(S.status=C,S.priority="all"),await ce()}}))}function ct(){const a=i.querySelector("#jira-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${M.map(C=>`
          <option value="${C._id}" ${S.assigneeId===C._id.toString()?"selected":""}>
            ${h(C.name)} (${h(C.role)})
          </option>
        `).join("")}
      `);const r=i.querySelector("#jira-filter-job");r&&(r.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${R.map(C=>`
          <option value="${C._id}" ${S.jobId===C._id.toString()?"selected":""}>
            📁 ${h(C.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function Fe(){const a=i.querySelector("#jira-board-columns-root");if(!a)return;const r={};la.forEach(C=>{r[C.key]=[]}),v.forEach(C=>{let A=C.status||"To Do";A==="In Progress"?A="Content":A==="Resolved"?A="Under Review":A==="Closed"&&(A="Ready to Leave"),r[A]||(r[A]=[]),r[A].push(C)}),a.innerHTML=la.map(C=>{const A=r[C.key]||[];return`
        <div class="jira-board-column" data-status="${C.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${h(C.label)}</span>
              <span class="jira-col-badge">${A.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${C.key}">
            ${A.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:A.map(Y=>pt(Y)).join("")}
          </div>
        </div>
      `}).join(""),Ae(),nt()}function pt(a){const r=Ct.find(G=>G.key===a.category)||Ct[0],C=qt.find(G=>G.key===a.priority)||qt[2],A=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",Y=(a.subtasks||[]).filter(G=>G.completed).length,W=(a.subtasks||[]).length,L=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],F=l?._id||l?.id,U=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(F);let y="";if(L.length===0)y='<div class="jira-avatar unassigned" title="Unassigned">?</div>';else{const G=L.slice(0,3),ae=L.length-3;y=`
        <div class="jira-avatar-group">
          ${G.map(re=>`
            <div class="jira-avatar" title="Assignee: ${h(re.name||"Member")} (${h(re.role||"")})">
              ${(re.avatar||re.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${ae>0?`
            <div class="jira-avatar extra-count" title="${ae} more assignees: ${h(L.slice(3).map(re=>re.name).join(", "))}">
              +${ae}
            </div>
          `:""}
        </div>
      `}return`
      <div class="jira-card" draggable="true" data-ticket-id="${a._id}">
        <div class="jira-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="jira-category-pill ${r.slug}">
              ${r.icon} ${r.label}
            </span>
            ${U?`
              <span class="jira-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${a.dueDate?`
              <span class="jira-due-pill ${A?"overdue":""}" title="Due Date">
                ${A?"⚠️ ":"📅 "}
                ${new Date(a.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          ${U?`
            <button type="button" class="jira-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${h(a.ticketId)}" title="Delete Ticket (Creator Only)">
              🗑️
            </button>
          `:""}
        </div>

        <div class="jira-card-title" title="${h(a.title)}">
          ${h(a.title)}
        </div>

        ${a.jobTitle||a.jobId&&a.jobId.title?`
          <div class="jira-card-job-link" title="Linked Internal Job: ${h(a.jobTitle||a.jobId.title)}">
            📁 ${h(a.jobTitle||a.jobId.title)}
          </div>
        `:""}

        ${a.linkUrl||a.links&&a.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${h(a.linkUrl||a.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="jira-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${h(a.linkUrl||a.links[0]?.url)}">
              🔗 ${a.links&&a.links[0]?.title?h(a.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="jira-card-bottom">
          <div class="jira-card-id-row">
            <span class="jira-pri-icon" title="Priority: ${C.label}">${C.icon}</span>
            <span class="jira-ticket-id">${h(a.ticketId)}</span>
          </div>

          <div class="jira-card-assignee-row">
            ${W>0?`
              <span class="jira-subtask-badge" title="${Y} of ${W} subtasks completed">
                ☑ ${Y}/${W}
              </span>
            `:""}
            ${y}
          </div>
        </div>
      </div>
    `}function Ae(){const a=i.querySelectorAll(".jira-card"),r=i.querySelectorAll(".jira-board-column");a.forEach(C=>{C.ondragstart=A=>{A.dataTransfer.setData("text/plain",C.dataset.ticketId),C.classList.add("dragging")},C.ondragend=()=>{C.classList.remove("dragging")}}),r.forEach(C=>{C.ondragover=A=>{A.preventDefault(),C.classList.add("drag-over")},C.ondragleave=()=>{C.classList.remove("drag-over")},C.ondrop=async A=>{A.preventDefault(),C.classList.remove("drag-over");const Y=A.dataTransfer.getData("text/plain"),W=C.dataset.status;if(!Y||!W)return;const L=v.find(U=>U._id.toString()===Y);if(!L||L.status===W)return;const F=L.status;L.status=W,Fe();try{const U=await Ve(`/tickets/${Y}/status`,{status:W});x(`Moved ${U.ticketId} to ${W}`,!1),await ce()}catch(U){x(U.message||"Status update failed",!0),L.status=F,await ce()}}})}function nt(){i.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async r=>{r.stopPropagation(),r.preventDefault();const C=a.dataset.ticketId,A=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${A}?`)){a.disabled=!0;try{await Ye(`/tickets/${C}`),x(`Ticket ${A} deleted`,!1),await ce()}catch(Y){x(Y.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),i.querySelectorAll(".jira-card").forEach(a=>{a.onclick=r=>{if(r.target.tagName==="A"||r.target.closest(".btn-delete-card-ticket"))return;const C=a.dataset.ticketId;tt(C)}})}function rt(){const a=i.querySelector("#btn-jira-refresh");a&&(a.onclick=async()=>{await ce(),x("Board updated",!1)});const r=i.querySelector("#btn-jira-create-ticket");r&&(r.onclick=()=>{I()});const C=i.querySelector("#jira-search-input");let A=null;C&&(C.oninput=p=>{clearTimeout(A),A=setTimeout(async()=>{S.search=p.target.value.trim(),Le(),await ce()},300)});const Y=i.querySelector("#jira-filter-priority");Y&&(Y.onchange=async p=>{S.priority=p.target.value,Le(),await ce()});const W=i.querySelector("#jira-filter-category");W&&(W.onchange=async p=>{S.category=p.target.value,Le(),await ce()});const L=i.querySelector("#jira-filter-job");L&&(L.onchange=async p=>{S.jobId=p.target.value,Le(),await ce()});const F=i.querySelector("#jira-filter-assignee");F&&(F.onchange=async p=>{S.assigneeId=p.target.value,Le(),await ce()});const U=i.querySelector("#jira-pill-my-issues");U&&(U.onclick=async()=>{S.myIssuesOnly=!S.myIssuesOnly,U.classList.toggle("active",S.myIssuesOnly),Le(),await ce()});const y=i.querySelector("#jira-pill-scope-all"),G=i.querySelector("#jira-pill-scope-assigned"),ae=i.querySelector("#jira-pill-scope-created"),re=async p=>{S.scope=p,y&&y.classList.toggle("active",p==="all"),G&&G.classList.toggle("active",p==="assigned"),ae&&ae.classList.toggle("active",p==="created"),Le(),await ce()};y&&(y.onclick=()=>re("all")),G&&(G.onclick=()=>re("assigned")),ae&&(ae.onclick=()=>re("created"));const u=i.querySelector("#jira-clear-filters");u&&(u.onclick=async()=>{S={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},C&&(C.value=""),Y&&(Y.value="all"),W&&(W.value="all");const p=i.querySelector("#jira-filter-job");p&&(p.value="all"),F&&(F.value="all"),U&&U.classList.remove("active"),y&&y.classList.add("active"),G&&G.classList.remove("active"),ae&&ae.classList.remove("active"),Le(),await ce()})}function Le(){const a=i.querySelector("#jira-clear-filters");if(!a)return;const r=S.search||S.priority!=="all"||S.category!=="all"||S.jobId&&S.jobId!=="all"||S.assigneeId!=="all"||S.myIssuesOnly||S.scope&&S.scope!=="all";a.style.display=r?"inline":"none"}async function ce(){await Oe(),Fe()}async function tt(a){const r=i.querySelector("#jira-modals-root");if(r){r.innerHTML=`
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{T=await ze(`/tickets/${a}`)}catch(C){x(C.message||"Could not load ticket",!0),r.innerHTML="";return}be()}}function be(){const a=i.querySelector("#jira-modals-root");if(!a||!T)return;const r=T,C=Ct.find(o=>o.key===r.category)||Ct[0];qt.find(o=>o.key===r.priority)||qt[2];const A=r.subtasks||[],Y=A.filter(o=>o.completed).length,W=A.length>0?Math.round(Y/A.length*100):0,L=r.attachments||[],F=r.comments||[],U=(r.history||[]).slice().reverse(),y=r.workLogs||[],G=r.linkedTickets||[],ae=l?._id||l?.id,re=r.reporter&&r.reporter.userId&&String(r.reporter.userId)===String(ae)||r.userId&&String(r.userId)===String(ae),u=Array.isArray(r.assignees)&&r.assignees.length>0?r.assignees:r.assignee&&r.assignee.userId?[r.assignee]:[];u.some(o=>o&&o.userId&&String(o.userId)===String(ae));const p=r.jobId?._id?r.jobId._id.toString():r.jobId?r.jobId.toString():"",d=r.jobTitle||r.jobId&&r.jobId.title||"";a.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${C.slug}">${C.icon} ${C.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${h(r.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${h(r.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Description</span>
                  <button type="button" class="jira-tool-btn" id="btn-toggle-desc-edit">
                    ${B?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${B?`
                  <div class="jira-editor-toolbar">
                    <button type="button" class="jira-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="jira-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="jira-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="jira-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${h(r.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${r.description?ya(r.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>🔗 Reference &amp; External Links (${(r.links||[]).length+(r.linkUrl&&!(r.links||[]).some(o=>o.url===r.linkUrl)?1:0)})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-toggle-add-link" style="font-size:11px;padding:4px 9px;">
                    + Add Link
                  </button>
                </div>

                <div id="add-link-form" style="display:none;background:#162032;border:1px solid #293952;border-radius:8px;padding:12px;margin-bottom:10px;">
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <input type="url" id="inp-new-link-url" class="jira-form-input" placeholder="Paste link URL (e.g. https://figma.com/..., https://loom.com/..., live website)..." />
                    <input type="text" id="inp-new-link-title" class="jira-form-input" placeholder="Link label / description (Optional, e.g. Figma UI, Loom Video, Live App)..." />
                    <div style="display:flex;gap:8px;justify-content:flex-end;">
                      <button type="button" class="btn-jira-secondary" id="btn-cancel-new-link" style="font-size:12px;padding:6px 12px;">Cancel</button>
                      <button type="button" class="btn-jira-primary" id="btn-save-new-link" style="font-size:12px;padding:6px 12px;">Save Link 🔗</button>
                    </div>
                  </div>
                </div>

                ${r.links&&r.links.length>0||r.linkUrl?`
                  <div class="jira-links-list" style="display:flex;flex-direction:column;gap:8px;">
                    ${r.linkUrl&&!(r.links||[]).some(o=>o.url===r.linkUrl)?`
                      <div class="jira-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;background:#162032;border:1px solid #223048;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${h(r.linkUrl)}" target="_blank" rel="noopener noreferrer" class="jira-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${h(r.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-jira-secondary btn-copy-link" data-url="${h(r.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${h(r.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-jira-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    `:""}
                    ${(r.links||[]).map(o=>`
                      <div class="jira-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;background:#162032;border:1px solid #223048;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${h(o.url)}" target="_blank" rel="noopener noreferrer" class="jira-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${h(o.title||o.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${o.title?`<span style="word-break:break-all;">${h(o.url)}</span> · `:""}Added by ${h(o.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-jira-secondary btn-copy-link" data-url="${h(o.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${h(o.url)}" target="_blank" rel="noopener noreferrer" class="btn-jira-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                          <button type="button" class="jira-att-del btn-del-link" data-link-id="${o.id}" title="Remove Link">&times;</button>
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
                  <span>Attachments (${L.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${L.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="jira-attachments-grid">
                    ${L.map(o=>{const g=o.type&&o.type.includes("video")||o.name&&o.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||o.url&&o.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="jira-att-card ${g?"is-video":""}" style="${g?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="jira-att-left">
                              <span style="font-size:${g?"16px":"13px"};">${g?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${o.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${h(o.name)}">
                                  ${h(o.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${pa(o.size)} ${g?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${g?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${o.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${o.url}" download="${h(o.name)}" class="btn-jira-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="jira-att-del btn-del-att" data-att-id="${o.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${g?`
                            <div class="jira-video-slot" id="video-slot-${o.id}" style="display:none;margin-top:6px;width:100%;">
                              <video controls preload="metadata" style="width:100%;max-height:360px;border-radius:6px;background:#000;">
                                <source src="${o.url}" type="${o.type||"video/mp4"}">
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
                  <span>Subtasks (${Y}/${A.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${W}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${W}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${A.map(o=>`
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${o.id}" ${o.completed?"checked":""} />
                        <span class="jira-subtask-title ${o.completed?"done":""}">${h(o.title)}</span>
                      </div>
                      <button type="button" class="jira-att-del btn-del-subtask" data-subtask-id="${o.id}" title="Remove subtask">&times;</button>
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
                  <span>Linked Work Items (${G.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${G.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${G.map(o=>`
                      <div class="jira-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${h(o.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${h(o.ticketId)}</span>
                          <span style="font-size:12.5px;color:#f1f5f9;">${h(o.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${h(o.status||"Open")}</span>
                          <button type="button" class="jira-att-del btn-del-link" data-link-id="${o.id}" title="Remove link">&times;</button>
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

              <!-- Dedicated Linked Internal Job Block -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span style="display:flex;align-items:center;gap:6px;">📁 Linked Internal Job</span>
                  <button type="button" class="jira-tool-btn" id="btn-toggle-job-link">
                    ${d?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${d?`
                  <div class="jira-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div style="font-weight:700;color:#f8fafc;font-size:13px;">${h(d)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${h(p)}</div>
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

                <div id="jira-job-link-box" style="display:none;padding:12px;background:#162032;border:1px solid #334155;border-radius:6px;margin-top:8px;">
                  <label style="font-size:11.5px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:6px;">Choose Job to Link:</label>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="inp-modal-job-select" class="jira-select-field" style="flex:1;min-width:220px;">
                      <option value="">-- Select a Job --</option>
                      ${R.map(o=>`
                        <option value="${o._id}" ${p===o._id.toString()?"selected":""}>
                          📁 ${h(o.title||"Untitled Job")}
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
                  <button type="button" class="jira-act-tab ${P==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${F.length})
                  </button>
                  <button type="button" class="jira-act-tab ${P==="history"?"active":""}" data-act-tab="history">
                    History (${U.length})
                  </button>
                  <button type="button" class="jira-act-tab ${P==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${y.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${P==="comments"?`
                  <div class="jira-comments-feed">
                    ${F.map(o=>`
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(o.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${h(o.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${h(o.userRole)})</span></span>
                            <span class="jira-comment-time">${Zt(o.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${ya(o.content)}</div>
                        </div>
                      </div>
                    `).join("")}

                    <!-- Add Comment Composer -->
                    <div class="jira-comment-composer">
                      <div class="jira-avatar" style="background:#3b82f6;">
                        ${(l?.name||"U").slice(0,1).toUpperCase()}
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
                ${P==="history"?`
                  <div class="jira-history-feed">
                    ${U.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:U.map(o=>`
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(o.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${h(o.userName)}</span>
                            <span class="jira-comment-time">${Zt(o.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong style="color:#cbd5e1;">${h(o.field)}</strong>:
                            ${o.from?`<span style="text-decoration:line-through;color:#ef4444;">${h(o.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${h(o.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${P==="worklog"?`
                  <div class="jira-worklog-feed">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${r.loggedHours||0} hrs</strong></span>
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

                    ${y.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:y.map(o=>`
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(o.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${h(o.userName)} logged <strong style="color:#38bdf8;">${h(o.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${Zt(o.loggedAt)}</span>
                          </div>
                          ${o.description?`<div style="font-size:12px;color:#cbd5e1;">${h(o.description)}</div>`:""}
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
                  ${la.map(o=>{let g=r.status||"To Do";return g==="In Progress"?g="Content":g==="Resolved"?g="Under Review":g==="Closed"&&(g="Ready to Leave"),`
                      <option value="${o.key}" ${g===o.key?"selected":""}>
                        ${o.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${qt.map(o=>`
                    <option value="${o.key}" ${r.priority===o.key?"selected":""}>
                      ${o.icon} ${o.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="jira-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="jira-side-lbl" style="margin-bottom:0;">Assigned Personnel (${u.length})</span>
                  
                    <button type="button" class="jira-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="jira-assigned-chips-wrap">
                  ${u.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:u.map(o=>`
                    <div class="jira-assignee-chip">
                      <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(o.avatar||o.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="jira-assignee-chip-name" title="${h(o.name)}">${h(o.name)}</span>
                      ${`
                        <button type="button" class="jira-assignee-chip-remove btn-remove-assignee" data-user-id="${o.userId}" title="Remove ${h(o.name)}">&times;</button>
                      `}
                    </div>
                  `).join("")}
                </div>

                <!-- Interactive Multi-select Assignee Picker -->
                <div id="jira-detail-assignee-box" style="display:none;margin-top:8px;padding:10px;background:#162032;border:1px solid #334155;border-radius:6px;">
                  <div style="font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
                    <span>ASSIGN / REASSIGN EMPLOYEES</span>
                    <button type="button" id="btn-close-detail-assignee-box" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:13px;">✕</button>
                  </div>
                  <div class="jira-emp-checklist" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;">
                    ${M.map(o=>{const g=u.some(j=>j&&j.userId&&String(j.userId)===String(o._id));return`
                        <label class="jira-emp-check-item ${g?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${o._id}" ${g?"checked":""} />
                          <div class="jira-avatar" style="width:18px;height:18px;font-size:9px;">${(o.name||"U").slice(0,1).toUpperCase()}</div>
                          <span style="font-size:12px;color:#f1f5f9;flex:1;">
                            ${h(o.name)} <span style="font-size:10.5px;color:#94a3b8;">(${h(o.role)})</span>
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
                    ${(r.reporter?.name||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${h(r.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${h(r.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${Ct.map(o=>`
                    <option value="${o.key}" ${r.category===o.key?"selected":""}>
                      ${o.icon} ${o.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="jira-date-field" value="${r.dueDate?new Date(r.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="jira-select-field">
                  <option value="">None (Workspace General)</option>
                  ${R.map(o=>`
                    <option value="${o._id}" ${p===o._id.toString()?"selected":""}>
                      📁 ${h(o.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${r.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" value="${r.estimatedHours||0}" style="width:45px;background:#1e293b;border:1px solid #334155;color:#f8fafc;padding:2px 4px;border-radius:4px;font-size:12px;" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(r.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(r.updatedAt).toLocaleString()}</div>
                ${r.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(r.resolvedAt).toLocaleString()}</div>`:""}
              </div>

              <!-- Actions (Delete - ONLY original creator / reporter) -->
              ${re?`
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
    `,m()}function m(){const a=i.querySelector("#jira-modals-root");if(!a||!T)return;const r=a.querySelector("#btn-close-jira-modal");r&&(r.onclick=_);const C=a.querySelector("#jira-detail-backdrop");C&&(C.onclick=E=>{E.target===C&&_()});const A=a.querySelector("#inp-detail-title");A&&(A.onchange=async()=>{const E=A.value.trim();if(E)try{T=await Ve(`/tickets/${T._id}`,{title:E}),await ce()}catch(H){x(H.message||"Failed to update title",!0)}});const Y=a.querySelector("#btn-toggle-desc-edit");Y&&(Y.onclick=()=>{B=!B,be()});const W=a.querySelector("#btn-cancel-desc");W&&(W.onclick=()=>{B=!1,be()});const L=a.querySelector("#btn-save-desc");L&&(L.onclick=async()=>{const E=a.querySelector("#inp-detail-desc")?.value;try{T=await Ve(`/tickets/${T._id}`,{description:E}),B=!1,be(),await ce(),x("Description saved",!1)}catch(H){x(H.message||"Failed to save description",!0)}});const F=a.querySelector("#sel-detail-status");F&&(F.onchange=async E=>{try{const H=await Ve(`/tickets/${T._id}/status`,{status:E.target.value});T=H,be(),await Qe(),Ce(),await ce(),x(`Status changed to ${H.status}`,!1)}catch(H){x(H.message||"Status change failed",!0)}});const U=a.querySelector("#sel-detail-priority");U&&(U.onchange=async E=>{try{T=await Ve(`/tickets/${T._id}`,{priority:E.target.value}),be(),await ce()}catch(H){x(H.message,!0)}});const y=a.querySelector("#btn-toggle-assignee-picker"),G=a.querySelector("#jira-detail-assignee-box"),ae=a.querySelector("#btn-close-detail-assignee-box"),re=a.querySelector("#btn-save-detail-assignees");y&&G&&(y.onclick=()=>{const E=G.style.display==="none";G.style.display=E?"block":"none"}),ae&&G&&(ae.onclick=()=>{G.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(E=>{E.onchange=()=>{E.closest(".jira-emp-check-item")?.classList.toggle("selected",E.checked)}}),re&&(re.onclick=async()=>{const E=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(H=>H.value);try{re.disabled=!0,T=await Ve(`/tickets/${T._id}`,{assigneeIds:E}),be(),await ce(),x("Assignees updated!",!1)}catch(H){x(H.message,!0),re.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(E=>{E.onclick=async()=>{const H=E.dataset.userId,Te=(Array.isArray(T.assignees)&&T.assignees.length>0?T.assignees:T.assignee?.userId?[T.assignee]:[]).filter(me=>me&&me.userId&&String(me.userId)!==String(H)).map(me=>String(me.userId));try{T=await Ve(`/tickets/${T._id}`,{assigneeIds:Te}),be(),await ce(),x("Assignee removed",!1)}catch(me){x(me.message,!0)}}});const u=a.querySelector("#sel-detail-category");u&&(u.onchange=async E=>{try{T=await Ve(`/tickets/${T._id}`,{category:E.target.value}),be(),await ce()}catch(H){x(H.message,!0)}});const p=a.querySelector("#inp-detail-duedate");p&&(p.onchange=async E=>{try{T=await Ve(`/tickets/${T._id}`,{dueDate:E.target.value||null}),be(),await ce()}catch(H){x(H.message,!0)}});const d=a.querySelector("#sel-detail-job");d&&(d.onchange=async E=>{try{T=await Ve(`/tickets/${T._id}`,{jobId:E.target.value||null}),be(),await ce(),x(E.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(H){x(H.message,!0)}});const o=a.querySelector("#btn-toggle-job-link"),g=a.querySelector("#jira-job-link-box");o&&g&&(o.onclick=()=>{g.style.display=g.style.display==="none"?"block":"none"});const j=a.querySelector("#btn-cancel-job-link");j&&g&&(j.onclick=()=>{g.style.display="none"});const k=a.querySelector("#btn-save-job-link");k&&(k.onclick=async()=>{const E=a.querySelector("#inp-modal-job-select")?.value||null;try{T=await Ve(`/tickets/${T._id}`,{jobId:E}),be(),await ce(),x(E?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(H){x(H.message,!0)}});const D=a.querySelector("#btn-unlink-job");D&&(D.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{T=await Ve(`/tickets/${T._id}`,{jobId:null}),be(),await ce(),x("Job unlinked",!1)}catch(E){x(E.message,!0)}});const oe=a.querySelector("#inp-detail-esthours");oe&&(oe.onchange=async E=>{try{T=await Ve(`/tickets/${T._id}`,{estimatedHours:Number(E.target.value)||0})}catch(H){x(H.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(E=>{E.onchange=async()=>{const H=E.dataset.subtaskId;try{T=await Ve(`/tickets/${T._id}/subtasks/${H}`,{completed:E.checked}),be(),await ce()}catch(b){x(b.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(E=>{E.onclick=async()=>{const H=E.dataset.subtaskId;try{T=await Ye(`/tickets/${T._id}/subtasks/${H}`),be(),await ce()}catch(b){x(b.message,!0)}}});const N=a.querySelector("#inp-new-subtask"),z=a.querySelector("#btn-add-subtask"),ie=async()=>{const E=N?.value.trim();if(E)try{T=await ke(`/tickets/${T._id}/subtasks`,{title:E}),be(),await ce()}catch(H){x(H.message,!0)}};z&&(z.onclick=ie),N&&(N.onkeydown=E=>{E.key==="Enter"&&(E.preventDefault(),ie())});const Q=a.querySelector("#btn-toggle-add-link"),K=a.querySelector("#add-link-form"),Z=a.querySelector("#btn-cancel-new-link"),V=a.querySelector("#btn-save-new-link"),ee=a.querySelector("#inp-new-link-url"),se=a.querySelector("#inp-new-link-title");Q&&K&&(Q.onclick=()=>{const E=K.style.display==="none";K.style.display=E?"block":"none",E&&ee&&ee.focus()}),Z&&K&&(Z.onclick=()=>{K.style.display="none",ee&&(ee.value=""),se&&(se.value="")}),V&&ee&&(V.onclick=async()=>{const E=ee.value.trim(),H=se?.value.trim()||"";if(!E){x("Please enter a valid URL link",!0);return}try{V.disabled=!0,V.textContent="Saving...",T=await ke(`/tickets/${T._id}/links`,{url:E,title:H}),be(),await ce(),x("Reference link added! 🔗",!1)}catch(b){x(b.message||"Failed to save link",!0),V.disabled=!1,V.textContent="Save Link 🔗"}}),a.querySelectorAll(".btn-copy-link").forEach(E=>{E.onclick=()=>{const H=E.dataset.url;H&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(H).then(()=>{x("Link copied to clipboard! 📋")}).catch(()=>{x("Link: "+H)}):x("Link: "+H))}}),a.querySelectorAll(".btn-del-link").forEach(E=>{E.onclick=async()=>{const H=E.dataset.linkId;try{T=await Ye(`/tickets/${T._id}/links/${H}`),be(),await ce(),x("Link removed")}catch(b){x(b.message||"Failed to remove link",!0)}}});const fe=a.querySelector("#btn-trigger-detail-upload"),$e=a.querySelector("#inp-detail-att-upload"),Ie=a.querySelector("#detail-att-upload-progress");fe&&$e&&(fe.onclick=E=>{E.preventDefault(),$e.click()}),$e&&($e.onchange=async()=>{const E=Array.from($e.files||[]);if($e.value="",!!E.length){Ie&&(Ie.style.display="block",Ie.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${E.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const b=(await ua(E,Te=>{const me=a.querySelector("#att-prog-pct"),st=a.querySelector("#att-prog-bar");me&&(me.textContent=`${Te}%`),st&&(st.style.width=`${Te}%`)})).map(Te=>({name:Te.name,url:Te.url,size:Te.size||0,type:Te.type||"application/octet-stream"}));b.length&&(T=await ke(`/tickets/${T._id}/attachments`,{attachments:b}),be(),x(`Successfully attached ${b.length} file(s)! 📎`,!1))}catch(H){console.error("Upload error:",H),x(`Upload failed: ${H.message}`,!0)}finally{Ie&&(Ie.style.display="none")}}}),a.querySelectorAll(".btn-play-att-video").forEach(E=>{E.onclick=()=>{const H=E.dataset.slot,b=a.querySelector("#"+H);if(b){const Te=b.style.display==="none";b.style.display=Te?"block":"none",E.textContent=Te?"⏸ Close Video":"▶ Play Video";const me=b.querySelector("video");me&&Te?me.play().catch(()=>{}):me&&me.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(E=>{E.onclick=async()=>{const H=E.dataset.attId;try{T=await Ye(`/tickets/${T._id}/attachments/${H}`),be()}catch(b){x(b.message,!0)}}}),a.querySelectorAll(".jira-act-tab").forEach(E=>{E.onclick=()=>{P=E.dataset.actTab,be()}});const pe=a.querySelector("#inp-new-comment"),we=a.querySelector("#btn-submit-comment");we&&pe&&(we.onclick=async()=>{const E=pe.value.trim();if(E)try{we.disabled=!0,we.textContent="Saving...",T=await ke(`/tickets/${T._id}/comments`,{content:E}),be(),x("Comment added",!1)}catch(H){x(H.message||"Failed to add comment",!0)}finally{we.disabled=!1}});const Re=a.querySelector("#btn-open-link-dialog"),Ee=a.querySelector("#jira-link-box"),je=a.querySelector("#btn-cancel-link"),Se=a.querySelector("#btn-submit-link"),xe=a.querySelector("#inp-link-target"),ye=a.querySelector("#sel-link-rel");Re&&Ee&&(Re.onclick=()=>{Ee.style.display="block"}),je&&Ee&&(je.onclick=()=>{Ee.style.display="none"}),Se&&Ee&&(Se.onclick=async()=>{const E=xe?.value.trim(),H=ye?.value||"relates to";if(E)try{Se.disabled=!0,T=await ke(`/tickets/${T._id}/links`,{targetTicketId:E,relationship:H}),be(),x(`Linked with ${E}`,!1)}catch(b){x(b.message||"Failed to link ticket",!0)}finally{Se.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(E=>{E.onclick=async()=>{const H=E.dataset.linkId;try{T=await Ye(`/tickets/${T._id}/links/${H}`),be()}catch(b){x(b.message,!0)}}});const _e=a.querySelector("#btn-open-worklog-dialog"),Me=a.querySelector("#jira-worklog-box"),Ge=a.querySelector("#btn-cancel-worklog"),at=a.querySelector("#btn-submit-worklog"),Tt=a.querySelector("#inp-worklog-time"),jt=a.querySelector("#inp-worklog-desc");_e&&Me&&(_e.onclick=()=>{Me.style.display="block"}),Ge&&Me&&(Ge.onclick=()=>{Me.style.display="none"}),at&&Me&&(at.onclick=async()=>{const E=Tt?.value.trim(),H=jt?.value.trim();if(!E){x("Enter time spent (e.g. 2h 30m)",!0);return}try{at.disabled=!0,T=await ke(`/tickets/${T._id}/worklogs`,{timeSpent:E,description:H}),be(),x("Work logged",!1)}catch(b){x(b.message||"Failed to log work",!0)}finally{at.disabled=!1}});const lt=a.querySelector("#btn-delete-ticket");lt&&(lt.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${T.ticketId}?`))try{lt.disabled=!0,await Ye(`/tickets/${T._id}`),x(`Ticket ${T.ticketId} deleted`,!1),_(),await Qe(),Ce(),await ce()}catch(E){x(E.message||"Failed to delete ticket",!0),lt.disabled=!1}})}function _(){T=null,B=!1;const a=i.querySelector("#jira-modals-root");a&&(a.innerHTML="")}function I(a=null){const r=i.querySelector("#jira-modals-root");if(!r)return;const C=a||(S.jobId&&S.jobId!=="all"?S.jobId:null);r.innerHTML=`
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
                  ${Ct.map(g=>`<option value="${g.key}">${g.icon} ${g.label}</option>`).join("")}
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
                  ${M.map(g=>{const j=l&&String(l._id||l.id)===String(g._id);return`
                      <label class="jira-emp-check-item ${j?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${g._id}" ${j?"checked":""} />
                        <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(g.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span style="font-size:12px;color:#f1f5f9;flex:1;">
                          ${h(g.name)} <span style="font-size:10.5px;color:#94a3b8;">(${h(g.role)})${j?" — (You)":""}</span>
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
                  ${R.map(g=>`
                    <option value="${g._id}" ${C&&String(C)===String(g._id)?"selected":""}>
                      📁 ${h(g.title||"Untitled Job")}
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
              <label class="jira-att-dropzone" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px;border:1px dashed #334155;border-radius:8px;background:#0b1120;cursor:pointer;transition:border-color 0.2s;">
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
    `;const A=()=>{r.querySelectorAll(".jira-emp-check-item").forEach(g=>{const j=g.querySelector(".chk-create-emp");g.classList.toggle("selected",!!j?.checked)})};r.querySelectorAll(".chk-create-emp").forEach(g=>{g.onchange=A});const Y=r.querySelector("#btn-create-assign-self");Y&&l&&(Y.onclick=()=>{const g=String(l._id||l.id);r.querySelectorAll(".chk-create-emp").forEach(j=>{j.value===g&&(j.checked=!0)}),A()});const W=r.querySelector("#btn-create-clear-assign");W&&(W.onclick=()=>{r.querySelectorAll(".chk-create-emp").forEach(g=>{g.checked=!1}),A()});const L=[],F=r.querySelector("#inp-create-ticket-att"),U=r.querySelector("#create-att-list"),y=r.querySelector("#create-att-count"),G=r.querySelector("#create-att-progress"),ae=()=>{y&&(y.textContent=`${L.length} file(s) attached`),U&&(U.innerHTML=L.map((g,j)=>{const k=g.type&&g.type.includes("video")||g.name&&g.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="jira-att-card">
            <div class="jira-att-left">
              <span>${k?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="jira-att-name" title="${h(g.name)}">${h(g.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${pa(g.size)} ${k?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="jira-att-del btn-del-pending-att" data-idx="${j}" title="Remove">&times;</button>
          </div>
        `}).join(""),U.querySelectorAll(".btn-del-pending-att").forEach(g=>{g.onclick=()=>{L.splice(Number(g.dataset.idx),1),ae()}}))};F&&(F.onchange=async()=>{const g=Array.from(F.files||[]);if(F.value="",!!g.length){G&&(G.style.display="block",G.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${g.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await ua(g,k=>{const D=r.querySelector("#create-prog-pct"),oe=r.querySelector("#create-prog-bar");D&&(D.textContent=`${k}%`),oe&&(oe.style.width=`${k}%`)})).forEach(k=>{L.push({name:k.name,url:k.url,size:k.size||0,type:k.type||"application/octet-stream"})}),ae()}catch(j){x(`Failed to upload files: ${j.message}`,!0)}finally{G&&(G.style.display="none"),F.value=""}}});const re=()=>{r.innerHTML=""},u=r.querySelector("#btn-close-create-modal");u&&(u.onclick=re);const p=r.querySelector("#btn-cancel-create-ticket");p&&(p.onclick=re);const d=r.querySelector("#jira-create-backdrop");d&&(d.onclick=g=>{g.target===d&&re()});const o=r.querySelector("#btn-submit-create-ticket");o&&(o.onclick=async()=>{const g=r.querySelector("#create-ticket-title")?.value.trim(),j=r.querySelector("#create-ticket-desc")?.value.trim(),k=r.querySelector("#create-ticket-cat")?.value||"Task",D=r.querySelector("#create-ticket-pri")?.value||"Medium",N=Array.from(r.querySelectorAll(".chk-create-emp:checked")).map(K=>K.value),z=r.querySelector("#create-ticket-duedate")?.value||null,ie=r.querySelector("#create-ticket-job")?.value||null,Q=r.querySelector("#create-ticket-url")?.value.trim()||"";if(!g){x("Ticket summary / title is required",!0);return}try{o.disabled=!0,o.textContent="Creating...";const K=await ke("/tickets",{title:g,description:j,category:k,priority:D,assigneeIds:N,assigneeId:N[0]||null,dueDate:z,jobId:ie,linkUrl:Q,attachments:L});x(`Ticket ${K.ticketId} created! 🎫`,!1),re(),await Qe(),Ce(),await ce(),tt(K._id)}catch(K){x(K.message||"Could not create ticket",!0),o.disabled=!1,o.textContent="Create Ticket 🚀"}})}i._openCreateTicketModal=I,i._openTicketDetailModal=tt,i._setJobFilter=async a=>{S.jobId=a||"all";const r=i.querySelector("#jira-filter-job");r&&(r.value=S.jobId),Le(),await ce()}}export{Za as a,Xa as b,Qa as i};
