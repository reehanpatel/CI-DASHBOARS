import{c as qe,h as $,e as y,n as Ke,j as Ye,o as Ut,k as Vt,g as ke,p as Ht,t as ea,u as ua}from"./api-BBWJCWLb.js";const ga={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function ka(){try{const n=localStorage.getItem("ci360_planner_settings");if(n)return Object.assign({},ga,JSON.parse(n))}catch{}return Object.assign({},ga)}function wa(n){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(n))}catch{}}function at(){const n=new Date,t=n.getFullYear(),e=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${t}-${e}-${l}`}function Gt(n,t){const e=new Date(n+"T00:00:00");e.setDate(e.getDate()+t);const l=e.getFullYear(),d=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${l}-${d}-${r}`}function $t(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function gt(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ba(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function ta(n,t=1){const e=new Date(n+"T00:00:00"),l=e.getDay(),d=(l<t?7:0)+l-t,r=new Date(e);r.setDate(e.getDate()-d);const m=[];for(let o=0;o<7;o++){const L=new Date(r);L.setDate(r.getDate()+o);const B=L.getFullYear(),S=String(L.getMonth()+1).padStart(2,"0"),T=String(L.getDate()).padStart(2,"0");m.push(`${B}-${S}-${T}`)}return m}function $a(){try{const n=window.AudioContext||window.webkitAudioContext;if(!n)return;const t=new n,e=t.currentTime,l=t.createOscillator(),d=t.createGain();l.type="sine",l.frequency.setValueAtTime(523.25,e),l.frequency.exponentialRampToValueAtTime(783.99,e+.15),d.gain.setValueAtTime(.2,e),d.gain.exponentialRampToValueAtTime(.001,e+.35),l.connect(d),d.connect(t.destination),l.start(e),l.stop(e+.35)}catch{}}function Ja(n,t={}){const{userRole:e="employee",currentUser:l=null,onNavigate:d=null}=t,r=e==="superadmin"||e==="admin";let m=ka(),o={selectedDate:at(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Sa(),L();async function L(){o.loading=!0,B();try{const b=[qe("/tasks")];r&&b.push(qe("/personnel").catch(()=>[]));const[_,j]=await Promise.all(b);o.tasks=Array.isArray(_)?_:[],j&&(o.personnelList=Array.isArray(j)?j:[])}catch(b){$("Failed to load planner tasks: "+b.message,!0)}finally{o.loading=!1,N()}}function B(){n.innerHTML=`
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
    `}function S(b){return o.tasks.filter(_=>{if(_.isDeleted===!0)return!1;if(r&&o.selectedPersonnelId!=="all"){const i=_.personnelId?._id||_.personnelId;if(String(i)!==String(o.selectedPersonnelId))return!1}const j=_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):"");return j?j===b:b===at()})}function T(b,_){if(b.status==="Completed")return!1;const j=b.dateStr||(b.dueDate?new Date(b.dueDate).toISOString().slice(0,10):"");return j?j<_:!1}function P(b,_){const j=b.length,i=b.filter(W=>W.status==="Completed").length,s=b.filter(W=>W.status==="In Progress").length,C=b.filter(W=>W.status==="Pending"||W.status==="Todo").length,I=b.filter(W=>T(W,_)).length,K=j>0?Math.round(i/j*100):0;return{total:j,completed:i,inProgress:s,pending:C,overdue:I,percent:K}}function N(){const b=at(),_=o.selectedDate===b,j=S(o.selectedDate),i=P(j,b);n.innerHTML=`
      <div class="ci360-planner-wrap ${m.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${gt(o.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${y(m.displayName||"Daily Planner")}</h1>
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
              <span class="date-text" id="displayDateLabel">${$t(o.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${o.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${_?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${r?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${o.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${o.personnelList.map(s=>`
                  <option value="${s._id}" ${o.selectedPersonnelId===String(s._id)?"selected":""}>
                    ${y(s.name)} (${y(s.department||s.role||"Team")})
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
              <div class="ci360-circular-progress" style="--val: ${i.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${i.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${i.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <span class="kpi-num">${i.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${i.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${i.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${i.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${i.overdue>0?`
                <div class="kpi-box overdue">
                  <span class="kpi-num">${i.overdue}</span>
                  <span class="kpi-label">Overdue</span>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${i.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${ge(j,i)}
        </main>

      </div>
    `,Ce(),lt()}function ge(b,_){return o.viewMode==="weekly"?st():o.viewMode==="report"?ht():xe(b,_)}function xe(b,_){const j=at();let i=b;if(o.filterStatus==="pending"?i=i.filter(s=>s.status==="Pending"||s.status==="Todo"):o.filterStatus==="in_progress"?i=i.filter(s=>s.status==="In Progress"):o.filterStatus==="completed"?i=i.filter(s=>s.status==="Completed"):o.filterStatus==="overdue"&&(i=i.filter(s=>T(s,j))),o.searchQuery){const s=o.searchQuery.toLowerCase();i=i.filter(C=>(C.title||"").toLowerCase().includes(s)||(C.description||"").toLowerCase().includes(s)||(C.category||"").toLowerCase().includes(s))}return i.sort((s,C)=>{if(s.status==="Completed"&&C.status!=="Completed")return 1;if(s.status!=="Completed"&&C.status==="Completed")return-1;const I={Urgent:0,High:1,Medium:2,Low:3};return(I[s.priority]||2)-(I[C.priority]||2)}),`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              Today's Focus
            </h2>
            <span class="ci360-task-count-badge">${i.length} ${i.length===1?"task":"tasks"}</span>
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${o.filterStatus==="all"?"active":""}" data-f="all">All (${_.total})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${_.pending})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${_.inProgress})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${_.completed})</button>
              ${_.overdue>0?`
                <button type="button" class="filter-pill overdue ${o.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${_.overdue})</button>
              `:""}
            </div>

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${y(o.searchQuery)}">
              ${o.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card / Past Date Locked Banner -->
        ${o.selectedDate<j?`
          <div class="ci360-past-date-banner" style="display:flex;align-items:center;gap:10px;padding:12px 18px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.22);border-radius:10px;font-size:12.5px;color:#f87171;margin-bottom:16px;box-sizing:border-box;">
            <span style="font-size:16px;">🔒</span>
            <span><strong>Date Passed:</strong> Tasks cannot be added or edited for <strong>${$t(o.selectedDate)}</strong> because this date has already passed.</span>
          </div>
        `:`
          <div class="ci360-quick-add-bar">
            <div class="ci360-quick-add-input-wrap">
              <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${gt(o.selectedDate)}... (Press Enter to save)">
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
          ${i.length===0?Be():`
            <div class="ci360-task-list">
              ${i.map(s=>Je(s,j)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function Be(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${gt(o.selectedDate)}</h3>
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
    `}function Je(b,_){const j=b.status==="Completed",i=T(b,_),s=b.dateStr||(b.dueDate?new Date(b.dueDate).toISOString().slice(0,10):_),C=!r&&s<_,I=`pri-${(b.priority||"medium").toLowerCase()}`,K=`status-${(b.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${j?"is-completed":""} ${i?"is-overdue":""}" data-id="${b._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${j?"checked":""}" data-action="toggle" data-id="${b._id}" title="${j?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${y(b.title)}</span>
          </div>

          ${b.description?`
            <div class="ci360-task-desc">${y(b.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${I}">
              <span class="badge-dot"></span>
              ${y(b.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${K}">
              ${y(b.status||"Pending")}
            </span>

            <!-- Category -->
            ${b.category?`
              <span class="ci360-badge category-badge">
                #${y(b.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${b.startTime||b.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${b.startTime?y(b.startTime):""}
                   ${b.startTime&&b.dueTime?"–":""}
                   ${b.dueTime?y(b.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${i?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${r&&(b.personnelId?.name||b.userId?.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${y(b.personnelId?.name||b.userId?.name)}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          ${C?`
            <span class="task-action-btn" title="Locked: Tasks cannot be edited after the date has passed" style="opacity:0.45;cursor:not-allowed;display:flex;align-items:center;justify-content:center;font-size:13px;">🔒</span>
          `:`
            <button type="button" class="task-action-btn edit" data-action="edit" data-id="${b._id}" title="Edit task">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button type="button" class="task-action-btn delete" data-action="delete" data-id="${b._id}" title="Delete task">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          `}
        </div>

      </div>
    `}function st(){const b=ta(o.selectedDate,m.weekStartsOn),_=gt(b[0]),j=gt(b[6]),i=at();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${_} – ${j}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${b.map(s=>{const C=s===i,I=s===o.selectedDate,K=S(s),W=P(K,i);return`
              <div class="ci360-day-column ${C?"is-today":""} ${I?"is-selected":""}" data-date="${s}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${s}">
                  <div class="day-name">${ba(s)}</div>
                  <div class="day-number">${new Date(s+"T00:00:00").getDate()}</div>
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
                  ${K.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:K.map(M=>`
                    <div class="ci360-mini-task-card ${M.status==="Completed"?"done":""}" data-id="${M._id}">
                      <button type="button" class="mini-check ${M.status==="Completed"?"checked":""}" data-action="toggle" data-id="${M._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${M._id}">
                        <div class="mini-title">${y(M.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(M.priority||"medium").toLowerCase()}">${M.priority||"Med"}</span>
                          ${M.dueTime?`<span class="mini-time">${y(M.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button -->
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${s}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function ht(){const b=ta(o.selectedDate,m.weekStartsOn),_=$t(b[0]),j=$t(b[6]),i=at(),s=o.tasks.filter(F=>{if(F.isDeleted===!0)return!1;const U=F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):"");return b.includes(U)}),C=s.length,I=s.filter(F=>F.status==="Completed").length,K=s.filter(F=>F.status==="In Progress").length,W=C>0?Math.round(I/C*100):0,M={Urgent:0,High:0,Medium:0,Low:0};return s.forEach(F=>{const U=F.priority||"Medium";M[U]!==void 0&&M[U]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${_} – ${j}</div>
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
            <span class="value" style="font-size:28px;color:var(--amber-500)">${K}</span>
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
                ${b.map(F=>{const U=S(F),v=P(U,i);return`
                    <tr>
                      <td><strong>${ba(F)}</strong></td>
                      <td>${gt(F)}</td>
                      <td>${v.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${v.completed}</td>
                      <td>${v.pending+v.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${v.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${v.percent}%</span>
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
              <div style="font-size:22px;font-weight:700">${M.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${M.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${M.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${M.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function Ce(){const b=document.getElementById("btnViewDaily"),_=document.getElementById("btnViewWeekly"),j=document.getElementById("btnViewReport");b&&(b.onclick=()=>{o.viewMode="daily",N()}),_&&(_.onclick=()=>{o.viewMode="weekly",N()}),j&&(j.onclick=()=>{o.viewMode="report",N()});const i=document.getElementById("btnPrevDay"),s=document.getElementById("btnNextDay"),C=document.getElementById("btnJumpToday"),I=document.getElementById("hiddenDateInput"),K=document.getElementById("datePickerBadge");i&&(i.onclick=()=>{o.selectedDate=Gt(o.selectedDate,-1),N()}),s&&(s.onclick=()=>{o.selectedDate=Gt(o.selectedDate,1),N()}),C&&(C.onclick=()=>{o.selectedDate=at(),N()}),K&&I&&(K.onclick=()=>{try{typeof I.showPicker=="function"?I.showPicker():I.focus()}catch{I.focus()}},I.onchange=c=>{c.target.value&&(o.selectedDate=c.target.value,N())});const W=document.getElementById("admTeamSelect");W&&(W.onchange=c=>{o.selectedPersonnelId=c.target.value,N()});const M=document.getElementById("btnOpenAddTaskModal");M&&(M.onclick=()=>je());const F=document.getElementById("btnPlannerActionsMenu"),U=document.getElementById("plannerActionsDropdown");F&&U&&(F.onclick=c=>{c.stopPropagation(),U.classList.toggle("hidden")},document.addEventListener("click",c=>{!U.contains(c.target)&&c.target!==F&&U.classList.add("hidden")}));const v=document.getElementById("btnActionImport");v&&(v.onclick=()=>{U?.classList.add("hidden"),it()});const G=document.getElementById("btnActionExportPng");G&&(G.onclick=()=>{U?.classList.add("hidden"),nt()});const te=document.getElementById("btnActionExportPdf");te&&(te.onclick=()=>{U?.classList.add("hidden"),ue()});const ae=document.getElementById("btnActionBackup");ae&&(ae.onclick=()=>{U?.classList.add("hidden"),tt()});const p=document.getElementById("btnActionSettings");p&&(p.onclick=()=>{U?.classList.add("hidden"),he()})}function lt(b){if(o.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(M=>{M.onclick=()=>{o.filterStatus=M.dataset.f,N()}});const _=document.getElementById("plannerTaskSearchInp");_&&(_.oninput=M=>{o.searchQuery=M.target.value,N()});const j=document.getElementById("btnClearSearch");j&&(j.onclick=()=>{o.searchQuery="",N()});const i=document.getElementById("quickAddTitleInp"),s=document.getElementById("quickAddPriority"),C=document.getElementById("quickAddCategory"),I=document.getElementById("btnQuickAddSubmit"),K=async()=>{const M=(i?.value||"").trim();if(!M){$("Please enter a task title",!0),i?.focus();return}try{const F={title:M,dateStr:o.selectedDate,priority:s?.value||m.defaultPriority,category:C?.value||"General",status:"Pending"};r&&o.selectedPersonnelId!=="all"&&(F.personnelId=o.selectedPersonnelId);const U=await ke("/tasks",F);o.tasks.unshift(U),$("Task added to today's focus! ✨"),i&&(i.value="",i.focus()),N()}catch(F){$(F.message,!0)}};I&&(I.onclick=K),i&&(i.onkeydown=M=>{M.key==="Enter"&&K()});const W=document.getElementById("btnEmptyStateImport");W&&(W.onclick=()=>it())}if(o.viewMode==="weekly"){const _=document.getElementById("btnPrevWeek"),j=document.getElementById("btnNextWeek"),i=document.getElementById("btnThisWeek");_&&(_.onclick=()=>{o.selectedDate=Gt(o.selectedDate,-7),N()}),j&&(j.onclick=()=>{o.selectedDate=Gt(o.selectedDate,7),N()}),i&&(i.onclick=()=>{o.selectedDate=at(),N()}),document.querySelectorAll(".day-col-header").forEach(s=>{s.onclick=()=>{o.selectedDate=s.dataset.date,o.viewMode="daily",N()}}),document.querySelectorAll('[data-action="add-day"]').forEach(s=>{s.onclick=()=>{je(null,s.dataset.date)}})}if(o.viewMode==="report"){const _=document.getElementById("btnDownloadWeeklyPdf");_&&(_.onclick=ue)}n.querySelectorAll('[data-action="toggle"]').forEach(_=>{_.onclick=async j=>{j.stopPropagation();const i=_.dataset.id;await Ne(i)}}),n.querySelectorAll('[data-action="edit"]').forEach(_=>{_.onclick=j=>{j.stopPropagation();const i=_.dataset.id,s=o.tasks.find(C=>C._id===i);s&&je(s)}}),n.querySelectorAll('[data-action="delete"]').forEach(_=>{_.onclick=async j=>{j.stopPropagation();const i=_.dataset.id;await dt(i)}})}async function Ne(b){const _=o.tasks.find(i=>i._id===b);if(!_)return;const j=_.status!=="Completed";try{const i=await Ke(`/tasks/${b}/toggle`,{}),s=o.tasks.findIndex(C=>C._id===b);s!==-1&&(o.tasks[s]=i),j?(m.soundEnabled&&$a(),$("Task marked as completed! 🎉")):$("Task reopened as pending."),N()}catch(i){$(i.message,!0)}}async function dt(b){const _=o.tasks.find(j=>j._id===b);if(_&&confirm(`Are you sure you want to remove "${_.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Ye(`/tasks/${b}`),o.tasks=o.tasks.filter(j=>j._id!==b),$("Task removed from planner (safely stored in database archive)"),N()}catch(j){$(j.message,!0)}}function je(b=null,_=null){const j=!!b,i=b?b.dateStr||(b.dueDate?new Date(b.dueDate).toISOString().slice(0,10):o.selectedDate):_||o.selectedDate,s=at();if(!r&&i<s){$("Tasks cannot be added or edited after the date is gone.",!0);return}const C=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${j?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${y(b?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${y(b?.description||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${i}" required>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${b?.startTime||""}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${b?.dueTime||""}">
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${b?.priority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!b&&m.defaultPriority==="Medium"||b?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!b&&m.defaultPriority==="High"||b?.priority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${b?.priority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${b?.status==="Pending"||b?.status==="Todo"||!b?"selected":""}>Pending</option>
                <option value="In Progress" ${b?.status==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${b?.status==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${y(b?.category||"General")}">
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
                <option value="all" ${!b||b?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${o.personnelList.map(v=>{const G=b?.personnelId?._id===v._id||b?.personnelId===v._id;return`<option value="${v._id}" ${G?"selected":""}>${y(v.name)} (${y(v.department||v.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${j&&(r||i>=s)?`
                <button type="button" class="btn danger small" id="btnModalDeleteTask" style="padding:6px 12px;background:#ef4444;color:#fff;border-radius:var(--r-sm);border:none;cursor:pointer;font-weight:700;font-size:12px;">🗑️ Delete Task</button>
              `:""}
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
              <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
                ${j?"Save Changes":"Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    `,I=Ut(C),K=I.querySelector("#taskForm"),W=I.querySelector("#btnModalClose"),M=I.querySelector("#btnCancelModal"),F=I.querySelector("#btnModalDeleteTask"),U=()=>I.remove();W&&(W.onclick=U),M&&(M.onclick=U),F&&b&&(F.onclick=async()=>{U(),await dt(b._id)}),K.onsubmit=async v=>{v.preventDefault();const G=I.querySelector("#taskTitle").value.trim(),te=I.querySelector("#taskDesc").value.trim(),ae=I.querySelector("#taskDate").value,p=I.querySelector("#taskStartTime").value.trim(),c=I.querySelector("#taskDueTime").value.trim(),a=I.querySelector("#taskPriority").value,f=I.querySelector("#taskStatus").value,g=I.querySelector("#taskCategory").value.trim()||"General";if(!G){$("Task title is required",!0);return}const A={title:G,description:te,dateStr:ae,startTime:p,dueTime:c,priority:a,status:f,category:g};if(r){const D=I.querySelector("#taskAssignee")?.value;D==="all"?(A.assignAll=!0,A.personnelId="all"):D&&(A.personnelId=D)}const x=I.querySelector("#btnSaveTask");x.disabled=!0,x.textContent="Saving...";try{if(j){const D=await Vt(`/tasks/${b._id}`,A),oe=o.tasks.findIndex(R=>R._id===b._id);oe!==-1&&(o.tasks[oe]=D),$("Task updated successfully! ✍️")}else{const D=await ke("/tasks",A);Array.isArray(D.tasks)?D.tasks.forEach(oe=>o.tasks.unshift(oe)):o.tasks.unshift(D),$("Task created successfully! ✨")}U(),N()}catch(D){$(D.message,!0),x.disabled=!1,x.textContent=j?"Save Changes":"Create Task"}}}function it(){let b=[];const _=`
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
              <input type="date" id="importTargetDate" class="input" value="${o.selectedDate}">
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
    `,j=Ut(_),i=()=>j.remove();j.querySelector("#btnImportClose").onclick=i,j.querySelector("#btnCancelImport").onclick=i;const s=j.querySelector("#importTextarea"),C=j.querySelector("#importFileInput"),I=j.querySelector("#importDropzone"),K=j.querySelector("#previewListArea"),W=j.querySelector("#previewCountLabel"),M=j.querySelector("#btnConfirmImport"),F=j.querySelector("#importFileInfo");function U(G){if(!G)return[];const te=G.split(/\r?\n/),ae=[];for(let p of te)p=p.trim(),p&&(p=p.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),p=p.replace(/^[-*•]\s+/,""),p=p.replace(/^\d+[\.\)]\s+/,""),p=p.trim(),p&&ae.push(p));return ae}function v(){const G=s.value,te=U(G),ae=j.querySelector("#importTargetDate").value,p=S(ae),c=new Set(p.map(a=>(a.title||"").trim().toLowerCase()));b=[];for(const a of te){const f=c.has(a.toLowerCase());b.push({title:a,isDuplicate:f})}if(W.textContent=`Preview (${b.length} ${b.length===1?"task":"tasks"} found)`,M.disabled=b.length===0,M.textContent=`Import ${b.length} ${b.length===1?"Task":"Tasks"}`,b.length===0){K.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}K.innerHTML=b.map((a,f)=>`
        <div class="preview-item ${a.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${f+1}.</span>
          <span class="preview-title">${y(a.title)}</span>
          ${a.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}s.oninput=v,I.onclick=()=>C.click(),C.onchange=G=>{const te=G.target.files[0];if(!te)return;F.textContent=`File selected: ${te.name} (${Math.round(te.size/1024)} KB)`;const ae=new FileReader;ae.onload=p=>{s.value=p.target.result,v()},ae.readAsText(te)},I.ondragover=G=>{G.preventDefault(),I.classList.add("dragover")},I.ondragleave=()=>I.classList.remove("dragover"),I.ondrop=G=>{G.preventDefault(),I.classList.remove("dragover");const te=G.dataTransfer.files[0];if(te&&(te.type==="text/plain"||te.name.endsWith(".txt"))){F.textContent=`File dropped: ${te.name}`;const ae=new FileReader;ae.onload=p=>{s.value=p.target.result,v()},ae.readAsText(te)}else $("Please drop a valid .txt plain-text file",!0)},M.onclick=async()=>{if(b.length===0)return;M.disabled=!0,M.textContent="Importing...";const G=j.querySelector("#importTargetDate").value,te=j.querySelector("#importPriority").value,ae=j.querySelector("#importCategory").value.trim()||"General",p={date:G,tasks:b.map(c=>({title:c.title,priority:te,category:ae,status:"Pending"}))};r&&o.selectedPersonnelId!=="all"&&(p.personnelId=o.selectedPersonnelId);try{const c=await ke("/tasks/bulk-import",p);Array.isArray(c.tasks)&&c.tasks.forEach(a=>o.tasks.unshift(a)),$(`Imported ${c.importedCount} tasks successfully! (${c.skippedCount} skipped duplicates)`),i(),o.selectedDate=G,N()}catch(c){$(c.message,!0),M.disabled=!1,M.textContent="Retry Import"}}}async function nt(){const b=S(o.selectedDate),_=P(b,at()),j=$t(o.selectedDate),i=2,s=800,C=160,I=90,K=65,W=70,M=Math.max(120,b.length*K),F=C+I+M+W,U=document.createElement("canvas");U.width=s*i,U.height=F*i;const v=U.getContext("2d");v.scale(i,i);const G=document.documentElement.getAttribute("data-theme")==="dark",te=G?"#0F172A":"#F8FAFC",ae=G?"#1E293B":"#FFFFFF",p=G?"#334155":"#E2E8F0",c=G?"#F8FAFC":"#0F172A",a=G?"#94A3B8":"#475569",f="#4F46E5",g="#10B981",A="#F59E0B";v.fillStyle=te,v.fillRect(0,0,s,F),v.fillStyle=ae,Pe(v,24,20,s-48,C-30,16),v.fill(),v.strokeStyle=p,v.lineWidth=1,v.stroke(),v.fillStyle=f,v.font="bold 12px Inter, sans-serif",v.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),v.fillStyle=c,v.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',v.fillText(j,44,86),v.fillStyle=a,v.font="13px Inter, sans-serif",v.fillText(`Planned focus list · ${_.completed} of ${_.total} tasks completed (${_.percent}%)`,44,114);const x=C+6;v.fillStyle=ae,Pe(v,24,x,s-48,I-16,12),v.fill(),v.stroke();const D=[{label:"TOTAL TASKS",val:String(_.total),color:c},{label:"COMPLETED",val:String(_.completed),color:g},{label:"IN PROGRESS",val:String(_.inProgress),color:A},{label:"PENDING",val:String(_.pending),color:a},{label:"PROGRESS",val:`${_.percent}%`,color:f}],oe=(s-48)/D.length;D.forEach((ie,Y)=>{const Q=24+Y*oe+20;v.fillStyle=ie.color,v.font="bold 20px Inter, sans-serif",v.fillText(ie.val,Q,x+36),v.fillStyle=a,v.font="10px Inter, sans-serif",v.fillText(ie.label,Q,x+54)});const R=x+I;v.fillStyle=ae,Pe(v,24,R,s-48,M+10,16),v.fill(),v.stroke(),b.length===0?(v.fillStyle=a,v.font="14px Inter, sans-serif",v.textAlign="center",v.fillText("No scheduled tasks recorded for this date.",s/2,R+60),v.textAlign="left"):b.forEach((ie,Y)=>{const Q=R+16+Y*K,Z=ie.status==="Completed";v.beginPath(),v.arc(48,Q+14,10,0,Math.PI*2),Z?(v.fillStyle=g,v.fill(),v.strokeStyle="#FFFFFF",v.lineWidth=2,v.beginPath(),v.moveTo(44,Q+14),v.lineTo(47,Q+17),v.lineTo(52,Q+11),v.stroke()):(v.strokeStyle=p,v.lineWidth=2,v.stroke()),v.fillStyle=Z?a:c,v.font=`${Z?"normal":"500"} 14px Inter, sans-serif`;const V=ie.title.length>55?ie.title.slice(0,52)+"...":ie.title;if(v.fillText(V,70,Q+18),Z){const Me=v.measureText(V);v.strokeStyle=a,v.lineWidth=1.2,v.beginPath(),v.moveTo(70,Q+14),v.lineTo(70+Me.width,Q+14),v.stroke()}const re=ie.priority||"Medium";let se="#E2E8F0",fe="#334155";re==="Urgent"?(se="#FEE2E2",fe="#DC2626"):re==="High"?(se="#FEF3C7",fe="#D97706"):re==="Low"&&(se="#ECFDF5",fe="#059669"),v.fillStyle=se,Pe(v,s-150,Q+4,60,20,10),v.fill(),v.fillStyle=fe,v.font="bold 10px Inter, sans-serif",v.fillText(re,s-138,Q+18);const _e=ie.dueTime?`🕒 ${ie.dueTime}`:ie.category||"General";v.fillStyle=a,v.font="11px Inter, sans-serif",v.fillText(_e,70,Q+34),Y<b.length-1&&(v.strokeStyle=p,v.lineWidth=.6,v.beginPath(),v.moveTo(40,Q+48),v.lineTo(s-40,Q+48),v.stroke())});const q=F-35;v.fillStyle=a,v.font="11px Inter, sans-serif",v.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,q);try{const ie=U.toDataURL("image/png"),Y=document.createElement("a");Y.href=ie,Y.download=`ci360-daily-planner-${o.selectedDate}.png`,document.body.appendChild(Y),Y.click(),Y.remove(),$("Daily Planner image exported! 🖼️")}catch(ie){$("Failed to export image: "+ie.message,!0)}}function Pe(b,_,j,i,s,C){b.beginPath(),b.moveTo(_+C,j),b.lineTo(_+i-C,j),b.quadraticCurveTo(_+i,j,_+i,j+C),b.lineTo(_+i,j+s-C),b.quadraticCurveTo(_+i,j+s,_+i-C,j+s),b.lineTo(_+C,j+s),b.quadraticCurveTo(_,j+s,_,j+s-C),b.lineTo(_,j+C),b.quadraticCurveTo(_,j,_+C,j),b.closePath()}function ue(){const b=ta(o.selectedDate,m.weekStartsOn),_=$t(b[0]),j=$t(b[6]);at();const i=o.tasks.filter(M=>{if(M.isDeleted===!0)return!1;const F=M.dateStr||(M.dueDate?new Date(M.dueDate).toISOString().slice(0,10):"");return b.includes(F)}),s=i.length,C=i.filter(M=>M.status==="Completed").length,I=s>0?Math.round(C/s*100):0,K=window.open("","_blank");if(!K){$("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const W=`
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
            <div class="period">${_} – ${j}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${s}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${C}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${s-C}</div>
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
            ${b.map(M=>{const F=S(M);return F.length===0?`<tr><td><strong>${gt(M)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:F.map(U=>`
                <tr>
                  <td><strong>${gt(M)}</strong></td>
                  <td>${y(U.title)}</td>
                  <td><span class="badge badge-${(U.priority||"medium").toLowerCase().slice(0,3)}">${U.priority||"Medium"}</span></td>
                  <td>${y(U.category||"General")}</td>
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
    `;K.document.write(W),K.document.close(),$("Weekly PDF report generated for printing! 📄")}function tt(){const _=Ut(`
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
    `),j=()=>_.remove();_.querySelector("#btnBackupClose").onclick=j;const i=_.querySelector("#btnDownloadBackupJson");i.onclick=async()=>{i.disabled=!0,i.textContent="Generating backup...";try{const M=await qe("/tasks/backup"),F=new Blob([JSON.stringify(M,null,2)],{type:"application/json"}),U=URL.createObjectURL(F),v=document.createElement("a");v.href=U,v.download=`ci360-planner-backup-${at()}.json`,document.body.appendChild(v),v.click(),v.remove(),$("Planner backup downloaded successfully! 💾")}catch(M){$("Backup export failed: "+M.message,!0)}finally{i.disabled=!1,i.textContent="Download JSON Backup"}};const s=_.querySelector("#restoreFileInput"),C=_.querySelector("#restorePreviewArea"),I=_.querySelector("#restoreCountText"),K=_.querySelector("#btnExecuteRestore");let W=null;s.onchange=M=>{const F=M.target.files[0];if(!F)return;const U=new FileReader;U.onload=v=>{try{const G=JSON.parse(v.target.result),te=Array.isArray(G.tasks)?G.tasks:Array.isArray(G)?G:null;if(!te||te.length===0){$("Invalid backup file: No tasks found",!0);return}W=te,C.style.display="block",I.textContent=`Valid backup: ${te.length} tasks ready to restore.`,K.disabled=!1}catch(G){$("Error parsing JSON backup file: "+G.message,!0),C.style.display="none",K.disabled=!0}},U.readAsText(F)},K.onclick=async()=>{if(!W||W.length===0)return;K.disabled=!0,K.textContent="Restoring...";const M=_.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const F=await ke("/tasks/restore",{tasks:W,mode:M});$(`Restored ${F.restoredCount} tasks! (${F.skippedCount} skipped) ✨`),j(),await L()}catch(F){$("Restore failed: "+F.message,!0),K.disabled=!1,K.textContent="Retry Restore"}}}function he(){const b=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${y(m.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${m.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${m.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${y(m.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${m.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${m.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${m.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${m.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${m.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${m.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${m.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,_=Ut(b),j=()=>_.remove();_.querySelector("#btnSettingsClose").onclick=j,_.querySelector("#btnCancelSettings").onclick=j,_.querySelector("#settingsForm").onsubmit=i=>{i.preventDefault(),m.displayName=_.querySelector("#setDisplayName").value.trim()||"Daily Planner",m.weekStartsOn=Number(_.querySelector("#setWeekStart").value),m.defaultPriority=_.querySelector("#setDefaultPriority").value,m.density=_.querySelector("#setDensity").value,m.soundEnabled=_.querySelector("#setSound").checked,wa(m),$("Planner preferences saved! ⚙️"),j(),N()}}}function Sa(){if(document.getElementById("ci360-planner-styles"))return;const n=document.createElement("style");n.id="ci360-planner-styles",n.textContent=`
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
  `,document.head.appendChild(n)}function Ca(n){return n!==null?{comment:n,variations:[]}:{variations:[]}}function _a(n,t,e,l,d){const r={move:n,variations:d};return t&&(r.suffix=t),e&&(r.nag=e),l!==null&&(r.comment=l),r}function Ta(...n){const[t,...e]=n;let l=t;for(const d of e)d!==null&&(l.variations=[d,...d.variations],d.variations=[],l=d);return t}function ja(n,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const l=e.variations[0];if(!l){e.comment=t.marker.comment;break}e=l}}return{headers:n,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ia(n,t){function e(){this.constructor=n}e.prototype=t.prototype,n.prototype=new e}function Et(n,t,e,l){var d=Error.call(this,n);return Object.setPrototypeOf&&Object.setPrototypeOf(d,Et.prototype),d.expected=t,d.found=e,d.location=l,d.name="SyntaxError",d}Ia(Et,Error);function aa(n,t,e){return e=e||" ",n.length>t?n:(t-=n.length,e+=e.repeat(t),n+e.slice(0,t))}Et.prototype.format=function(n){var t="Error: "+this.message;if(this.location){var e=null,l;for(l=0;l<n.length;l++)if(n[l].source===this.location.source){e=n[l].text.split(/\r\n|\n|\r/g);break}var d=this.location.start,r=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(d):d,m=this.location.source+":"+r.line+":"+r.column;if(e){var o=this.location.end,L=aa("",r.line.toString().length," "),B=e[d.line-1],S=d.line===o.line?o.column:B.length+1,T=S-d.column||1;t+=`
 --> `+m+`
`+L+` |
`+r.line+" | "+B+`
`+L+" | "+aa("",d.column-1," ")+aa("",T,"^")}else t+=`
 at `+m}return t};Et.buildMessage=function(n,t){var e={literal:function(B){return'"'+d(B.text)+'"'},class:function(B){var S=B.parts.map(function(T){return Array.isArray(T)?r(T[0])+"-"+r(T[1]):r(T)});return"["+(B.inverted?"^":"")+S.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(B){return B.description}};function l(B){return B.charCodeAt(0).toString(16).toUpperCase()}function d(B){return B.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(S){return"\\x0"+l(S)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(S){return"\\x"+l(S)})}function r(B){return B.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(S){return"\\x0"+l(S)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(S){return"\\x"+l(S)})}function m(B){return e[B.type](B)}function o(B){var S=B.map(m),T,P;if(S.sort(),S.length>0){for(T=1,P=1;T<S.length;T++)S[T-1]!==S[T]&&(S[P]=S[T],P++);S.length=P}switch(S.length){case 1:return S[0];case 2:return S[0]+" or "+S[1];default:return S.slice(0,-1).join(", ")+", or "+S[S.length-1]}}function L(B){return B?'"'+d(B)+'"':"end of input"}return"Expected "+o(n)+" but "+L(t)+" found."};function Aa(n,t){t=t!==void 0?t:{};var e={},l=t.grammarSource,d={pgn:Nt},r=Nt,m="[",o='"',L="]",B=".",S="O-O-O",T="O-O",P="0-0-0",N="0-0",ge="$",xe="{",Be="}",Je=";",st="(",ht=")",Ce="1-0",lt="0-1",Ne="1/2-1/2",dt="*",je=/^[a-zA-Z]/,it=/^[^"]/,nt=/^[0-9]/,Pe=/^[.]/,ue=/^[a-zA-Z1-8\-=]/,tt=/^[+#]/,he=/^[!?]/,b=/^[^}]/,_=/^[^\r\n]/,j=/^[ \t\r\n]/,i=Ve("tag pair"),s=Ae("[",!1),C=Ae('"',!1),I=Ae("]",!1),K=Ve("tag name"),W=Xe([["a","z"],["A","Z"]],!1,!1),M=Ve("tag value"),F=Xe(['"'],!0,!1),U=Ve("move number"),v=Xe([["0","9"]],!1,!1),G=Ae(".",!1),te=Xe(["."],!1,!1),ae=Ve("standard algebraic notation"),p=Ae("O-O-O",!1),c=Ae("O-O",!1),a=Ae("0-0-0",!1),f=Ae("0-0",!1),g=Xe([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),A=Xe(["+","#"],!1,!1),x=Ve("suffix annotation"),D=Xe(["!","?"],!1,!1),oe=Ve("NAG"),R=Ae("$",!1),q=Ve("brace comment"),ie=Ae("{",!1),Y=Xe(["}"],!0,!1),Q=Ae("}",!1),Z=Ve("rest of line comment"),V=Ae(";",!1),re=Xe(["\r",`
`],!0,!1),se=Ve("variation"),fe=Ae("(",!1),_e=Ae(")",!1),Me=Ve("game termination marker"),pe=Ae("1-0",!1),$e=Ae("0-1",!1),Ie=Ae("1/2-1/2",!1),Oe=Ae("*",!1),Se=Ve("whitespace"),Te=Xe([" ","	","\r",`
`],!1,!1),ye=function(u,k){return ja(u,k)},me=function(u){return Object.fromEntries(u)},E=function(u,k){return[u,k]},H=function(u,k){return{root:u,marker:k}},ce=function(u,k){return Ta(Ca(u),...k.flat())},De=function(u,k,w,J,ne){return _a(u,k,w,J,ne)},we=function(u){return u},Qe=function(u){return u.replace(/[\r\n]+/g," ")},vt=function(u){return u.trim()},Tt=function(u){return u},jt=function(u,k){return{result:u,comment:k}},h=t.peg$currPos|0,ot=[{line:1,column:1}],He=h,xt=t.peg$maxFailExpected||[],O=t.peg$silentFails|0,ct;if(t.startRule){if(!(t.startRule in d))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');r=d[t.startRule]}function Ae(u,k){return{type:"literal",text:u,ignoreCase:k}}function Xe(u,k,w){return{type:"class",parts:u,inverted:k,ignoreCase:w}}function Bt(){return{type:"end"}}function Ve(u){return{type:"other",description:u}}function yt(u){var k=ot[u],w;if(k)return k;if(u>=ot.length)w=ot.length-1;else for(w=u;!ot[--w];);for(k=ot[w],k={line:k.line,column:k.column};w<u;)n.charCodeAt(w)===10?(k.line++,k.column=1):k.column++,w++;return ot[u]=k,k}function Pt(u,k,w){var J=yt(u),ne=yt(k),be={source:l,start:{offset:u,line:J.line,column:J.column},end:{offset:k,line:ne.line,column:ne.column}};return be}function X(u){h<He||(h>He&&(He=h,xt=[]),xt.push(u))}function Xt(u,k,w){return new Et(Et.buildMessage(u,k),u,k,w)}function Nt(){var u,k,w;return u=h,k=Ot(),w=At(),u=ye(k,w),u}function Ot(){var u,k,w;for(u=h,k=[],w=kt();w!==e;)k.push(w),w=kt();return w=Fe(),u=me(k),u}function kt(){var u,k,w,J,ne,be,wt;return O++,u=h,Fe(),n.charCodeAt(h)===91?(k=m,h++):(k=e,O===0&&X(s)),k!==e?(Fe(),w=It(),w!==e?(Fe(),n.charCodeAt(h)===34?(J=o,h++):(J=e,O===0&&X(C)),J!==e?(ne=pt(),n.charCodeAt(h)===34?(be=o,h++):(be=e,O===0&&X(C)),be!==e?(Fe(),n.charCodeAt(h)===93?(wt=L,h++):(wt=e,O===0&&X(I)),wt!==e?u=E(w,ne):(h=u,u=e)):(h=u,u=e)):(h=u,u=e)):(h=u,u=e)):(h=u,u=e),O--,u===e&&O===0&&X(i),u}function It(){var u,k,w;if(O++,u=h,k=[],w=n.charAt(h),je.test(w)?h++:(w=e,O===0&&X(W)),w!==e)for(;w!==e;)k.push(w),w=n.charAt(h),je.test(w)?h++:(w=e,O===0&&X(W));else k=e;return k!==e?u=n.substring(u,h):u=k,O--,u===e&&(k=e,O===0&&X(K)),u}function pt(){var u,k,w;for(O++,u=h,k=[],w=n.charAt(h),it.test(w)?h++:(w=e,O===0&&X(F));w!==e;)k.push(w),w=n.charAt(h),it.test(w)?h++:(w=e,O===0&&X(F));return u=n.substring(u,h),O--,k=e,O===0&&X(M),u}function At(){var u,k,w;return u=h,k=Zt(),Fe(),w=Dt(),w===e&&(w=null),Fe(),u=H(k,w),u}function Zt(){var u,k,w,J;for(u=h,k=We(),k===e&&(k=null),w=[],J=Mt();J!==e;)w.push(J),J=Mt();return u=ce(k,w),u}function Mt(){var u,k,w,J,ne,be,wt,Ft;if(u=h,Fe(),z(),Fe(),k=ee(),k!==e){for(w=ve(),w===e&&(w=null),J=[],ne=ze();ne!==e;)J.push(ne),ne=ze();for(ne=Fe(),be=We(),be===e&&(be=null),wt=[],Ft=Ze();Ft!==e;)wt.push(Ft),Ft=Ze();u=De(k,w,J,be,wt)}else h=u,u=e;return u}function z(){var u,k,w,J,ne,be;for(O++,u=h,k=[],w=n.charAt(h),nt.test(w)?h++:(w=e,O===0&&X(v));w!==e;)k.push(w),w=n.charAt(h),nt.test(w)?h++:(w=e,O===0&&X(v));if(n.charCodeAt(h)===46?(w=B,h++):(w=e,O===0&&X(G)),w!==e){for(J=Fe(),ne=[],be=n.charAt(h),Pe.test(be)?h++:(be=e,O===0&&X(te));be!==e;)ne.push(be),be=n.charAt(h),Pe.test(be)?h++:(be=e,O===0&&X(te));k=[k,w,J,ne],u=k}else h=u,u=e;return O--,u===e&&(k=e,O===0&&X(U)),u}function ee(){var u,k,w,J,ne,be;if(O++,u=h,k=h,n.substr(h,5)===S?(w=S,h+=5):(w=e,O===0&&X(p)),w===e&&(n.substr(h,3)===T?(w=T,h+=3):(w=e,O===0&&X(c)),w===e&&(n.substr(h,5)===P?(w=P,h+=5):(w=e,O===0&&X(a)),w===e&&(n.substr(h,3)===N?(w=N,h+=3):(w=e,O===0&&X(f)),w===e))))if(w=h,J=n.charAt(h),je.test(J)?h++:(J=e,O===0&&X(W)),J!==e){if(ne=[],be=n.charAt(h),ue.test(be)?h++:(be=e,O===0&&X(g)),be!==e)for(;be!==e;)ne.push(be),be=n.charAt(h),ue.test(be)?h++:(be=e,O===0&&X(g));else ne=e;ne!==e?(J=[J,ne],w=J):(h=w,w=e)}else h=w,w=e;return w!==e?(J=n.charAt(h),tt.test(J)?h++:(J=e,O===0&&X(A)),J===e&&(J=null),w=[w,J],k=w):(h=k,k=e),k!==e?u=n.substring(u,h):u=k,O--,u===e&&(k=e,O===0&&X(ae)),u}function ve(){var u,k,w;for(O++,u=h,k=[],w=n.charAt(h),he.test(w)?h++:(w=e,O===0&&X(D));w!==e;)k.push(w),k.length>=2?w=e:(w=n.charAt(h),he.test(w)?h++:(w=e,O===0&&X(D)));return k.length<1?(h=u,u=e):u=k,O--,u===e&&(k=e,O===0&&X(x)),u}function ze(){var u,k,w,J,ne;if(O++,u=h,Fe(),n.charCodeAt(h)===36?(k=ge,h++):(k=e,O===0&&X(R)),k!==e){if(w=h,J=[],ne=n.charAt(h),nt.test(ne)?h++:(ne=e,O===0&&X(v)),ne!==e)for(;ne!==e;)J.push(ne),ne=n.charAt(h),nt.test(ne)?h++:(ne=e,O===0&&X(v));else J=e;J!==e?w=n.substring(w,h):w=J,w!==e?u=we(w):(h=u,u=e)}else h=u,u=e;return O--,u===e&&O===0&&X(oe),u}function We(){var u;return u=rt(),u===e&&(u=ut()),u}function rt(){var u,k,w,J,ne;if(O++,u=h,n.charCodeAt(h)===123?(k=xe,h++):(k=e,O===0&&X(ie)),k!==e){for(w=h,J=[],ne=n.charAt(h),b.test(ne)?h++:(ne=e,O===0&&X(Y));ne!==e;)J.push(ne),ne=n.charAt(h),b.test(ne)?h++:(ne=e,O===0&&X(Y));w=n.substring(w,h),n.charCodeAt(h)===125?(J=Be,h++):(J=e,O===0&&X(Q)),J!==e?u=Qe(w):(h=u,u=e)}else h=u,u=e;return O--,u===e&&(k=e,O===0&&X(q)),u}function ut(){var u,k,w,J,ne;if(O++,u=h,n.charCodeAt(h)===59?(k=Je,h++):(k=e,O===0&&X(V)),k!==e){for(w=h,J=[],ne=n.charAt(h),_.test(ne)?h++:(ne=e,O===0&&X(re));ne!==e;)J.push(ne),ne=n.charAt(h),_.test(ne)?h++:(ne=e,O===0&&X(re));w=n.substring(w,h),u=vt(w)}else h=u,u=e;return O--,u===e&&(k=e,O===0&&X(Z)),u}function Ze(){var u,k,w,J;return O++,u=h,Fe(),n.charCodeAt(h)===40?(k=st,h++):(k=e,O===0&&X(fe)),k!==e?(w=Zt(),w!==e?(Fe(),n.charCodeAt(h)===41?(J=ht,h++):(J=e,O===0&&X(_e)),J!==e?u=Tt(w):(h=u,u=e)):(h=u,u=e)):(h=u,u=e),O--,u===e&&O===0&&X(se),u}function Dt(){var u,k,w;return O++,u=h,n.substr(h,3)===Ce?(k=Ce,h+=3):(k=e,O===0&&X(pe)),k===e&&(n.substr(h,3)===lt?(k=lt,h+=3):(k=e,O===0&&X($e)),k===e&&(n.substr(h,7)===Ne?(k=Ne,h+=7):(k=e,O===0&&X(Ie)),k===e&&(n.charCodeAt(h)===42?(k=dt,h++):(k=e,O===0&&X(Oe))))),k!==e?(Fe(),w=We(),w===e&&(w=null),u=jt(k,w)):(h=u,u=e),O--,u===e&&(k=e,O===0&&X(Me)),u}function Fe(){var u,k;for(O++,u=[],k=n.charAt(h),j.test(k)?h++:(k=e,O===0&&X(Te));k!==e;)u.push(k),k=n.charAt(h),j.test(k)?h++:(k=e,O===0&&X(Te));return O--,k=e,O===0&&X(Se),u}if(ct=r(),t.peg$library)return{peg$result:ct,peg$currPos:h,peg$FAILED:e,peg$maxFailExpected:xt,peg$maxFailPos:He};if(ct!==e&&h===n.length)return ct;throw ct!==e&&h<n.length&&X(Bt()),Xt(xt,He<n.length?n.charAt(He):null,He<n.length?Pt(He,He+1):Pt(He,He))}/**
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
 */const Yt=0xffffffffffffffffn;function ia(n,t){return(n<<t|n>>64n-t)&0xffffffffffffffffn}function fa(n,t){return n*t&Yt}function Da(n){return function(){let t=BigInt(n&Yt),e=BigInt(n>>64n&Yt);const l=fa(ia(fa(t,5n),7n),9n);return e^=t,t=(ia(t,24n)^e^e<<16n)&Yt,e=ia(e,37n),n=e<<64n|t,l}}const Qt=Da(0xa187eb39cdcaed8f31c4b365b102e01en),Ea=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Qt()))),Pa=Array.from({length:8},()=>Qt()),Ma=Array.from({length:16},()=>Qt()),na=Qt(),Ge="w",et="b",Ee="p",ca="n",Jt="b",zt="r",mt="q",Le="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Wt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:l,piece:d,from:r,to:m,flags:o,captured:L,promotion:B}=e,S=Re(r),T=Re(m);this.color=l,this.piece=d,this.from=S,this.to=T,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=S+T,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const P in de)de[P]&o&&(this.flags+=St[P]);L&&(this.captured=L),B&&(this.promotion=B,this.lan+=B)}isCapture(){return this.flags.indexOf(St.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(St.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(St.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(St.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(St.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(St.BIG_PAWN)>-1}}const Ue=-1,St={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},de={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},pa={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},La={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},qa={...pa,...La},le={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},oa={b:[16,32,17,15],w:[-16,-32,-17,-15]},ma={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},za=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ra=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ba={p:1,n:2,b:4,r:8,q:16,k:32},Na="pnbrqkPNBRQK",ha=[ca,Jt,zt,mt],Oa=7,Fa=6,Ua=1,Ha=0,Kt={[Le]:de.KSIDE_CASTLE,[mt]:de.QSIDE_CASTLE},bt={w:[{square:le.a1,flag:de.QSIDE_CASTLE},{square:le.h1,flag:de.KSIDE_CASTLE}],b:[{square:le.a8,flag:de.QSIDE_CASTLE},{square:le.h8,flag:de.KSIDE_CASTLE}]},Ga={b:Ua,w:Fa},sa="--";function _t(n){return n>>4}function Rt(n){return n&15}function ya(n){return"0123456789".indexOf(n)!==-1}function Re(n){const t=Rt(n),e=_t(n);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function Lt(n){return n===Ge?et:Ge}function Wa(n){const t=n.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const l=parseInt(t[4],10);if(isNaN(l)||l<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const d=t[0].split("/");if(d.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let m=0;m<d.length;m++){let o=0,L=!1;for(let B=0;B<d[m].length;B++)if(ya(d[m][B])){if(L)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};o+=parseInt(d[m][B],10),L=!0}else{if(!/^[prnbqkPRNBQK]$/.test(d[m][B]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};o+=1,L=!1}if(o!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const r=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:m,regex:o}of r){if(!o.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${m} king`};if((t[0].match(o)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${m} kings`}}return Array.from(d[0]+d[7]).some(m=>m.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Ka(n,t){const e=n.from,l=n.to,d=n.piece;let r=0,m=0,o=0;for(let L=0,B=t.length;L<B;L++){const S=t[L].from,T=t[L].to,P=t[L].piece;d===P&&e!==S&&l===T&&(r++,_t(e)===_t(S)&&m++,Rt(e)===Rt(S)&&o++)}return r>0?m>0&&o>0?Re(e):o>0?Re(e).charAt(1):Re(e).charAt(0):""}function ft(n,t,e,l,d,r=void 0,m=de.NORMAL){const o=_t(l);if(d===Ee&&(o===Oa||o===Ha))for(let L=0;L<ha.length;L++){const B=ha[L];n.push({color:t,from:e,to:l,piece:d,captured:r,promotion:B,flags:m|de.PROMOTION})}else n.push({color:t,from:e,to:l,piece:d,captured:r,flags:m})}function va(n){let t=n.charAt(0);return t>="a"&&t<="h"?n.match(/[a-h]\d.*[a-h]\d/)?void 0:Ee:(t=t.toLowerCase(),t==="o"?Le:t)}function la(n){return n.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class xa{_board=new Array(128);_turn=Ge;_header={};_kings={w:Ue,b:Ue};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=ra,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Ue,b:Ue},this._turn=Ge,this._castling={w:0,b:0},this._epSquare=Ue,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...qa},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:l=!1}={}){let d=t.split(/\s+/);if(d.length>=2&&d.length<6){const o=["-","-","0","1"];t=d.concat(o.slice(-(6-d.length))).join(" ")}if(d=t.split(/\s+/),!e){const{ok:o,error:L}=Wa(t);if(!o)throw new Error(L)}const r=d[0];let m=0;this.clear({preserveHeaders:l});for(let o=0;o<r.length;o++){const L=r.charAt(o);if(L==="/")m+=8;else if(ya(L))m+=parseInt(L,10);else{const B=L<"a"?Ge:et;this._put({type:L.toLowerCase(),color:B},Re(m)),m++}}this._turn=d[1],d[2].indexOf("K")>-1&&(this._castling.w|=de.KSIDE_CASTLE),d[2].indexOf("Q")>-1&&(this._castling.w|=de.QSIDE_CASTLE),d[2].indexOf("k")>-1&&(this._castling.b|=de.KSIDE_CASTLE),d[2].indexOf("q")>-1&&(this._castling.b|=de.QSIDE_CASTLE),this._epSquare=d[3]==="-"?Ue:le[d[3]],this._halfMoves=parseInt(d[4],10),this._moveNumber=parseInt(d[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,l="";for(let m=le.a8;m<=le.h1;m++){if(this._board[m]){e>0&&(l+=e,e=0);const{color:o,type:L}=this._board[m];l+=o===Ge?L.toUpperCase():L.toLowerCase()}else e++;m+1&136&&(e>0&&(l+=e),m!==le.h1&&(l+="/"),e=0,m+=8)}let d="";this._castling[Ge]&de.KSIDE_CASTLE&&(d+="K"),this._castling[Ge]&de.QSIDE_CASTLE&&(d+="Q"),this._castling[et]&de.KSIDE_CASTLE&&(d+="k"),this._castling[et]&de.QSIDE_CASTLE&&(d+="q"),d=d||"-";let r="-";if(this._epSquare!==Ue)if(t)r=Re(this._epSquare);else{const m=this._epSquare+(this._turn===Ge?16:-16),o=[m+1,m-1];for(const L of o){if(L&136)continue;const B=this._turn;if(this._board[L]?.color===B&&this._board[L]?.type===Ee){this._makeMove({color:B,from:L,to:this._epSquare,piece:Ee,captured:Ee,flags:de.EP_CAPTURE});const S=!this._isKingAttacked(B);if(this._undoMove(),S){r=Re(this._epSquare);break}}}}return[l,this._turn,d,r,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:l}=this._board[t],d={w:0,b:1}[e],r={p:0,n:1,b:2,r:3,q:4,k:5}[l];return Ea[d][r][t]}_epKey(){return this._epSquare===Ue?0n:Pa[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Ma[t]}_computeHash(){let t=0n;for(let e=le.a8;e<=le.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=na),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[le[t]]}findPiece(t){const e=[];for(let l=le.a8;l<=le.h1;l++){if(l&136){l+=7;continue}!this._board[l]||this._board[l]?.color!==t.color||this._board[l].color===t.color&&this._board[l].type===t.type&&e.push(Re(l))}return e}put({type:t,color:e},l){return this._put({type:t,color:e},l)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},l){if(Na.indexOf(t.toLowerCase())===-1||!(l in le))return!1;const d=le[l];if(t==Le&&!(this._kings[e]==Ue||this._kings[e]==d))return!1;const r=this._board[d];return r&&r.type===Le&&(this._kings[r.color]=Ue),this._set(d,{type:t,color:e}),t===Le&&(this._kings[e]=d),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(le[t]),e&&e.type===Le&&(this._kings[e.color]=Ue),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[le.e1]?.type===Le&&this._board[le.e1]?.color===Ge,e=this._board[le.e8]?.type===Le&&this._board[le.e8]?.color===et;(!t||this._board[le.a1]?.type!==zt||this._board[le.a1]?.color!==Ge)&&(this._castling.w&=-65),(!t||this._board[le.h1]?.type!==zt||this._board[le.h1]?.color!==Ge)&&(this._castling.w&=-33),(!e||this._board[le.a8]?.type!==zt||this._board[le.a8]?.color!==et)&&(this._castling.b&=-65),(!e||this._board[le.h8]?.type!==zt||this._board[le.h8]?.color!==et)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Ue)return;const t=this._epSquare+(this._turn===Ge?-16:16),e=this._epSquare+(this._turn===Ge?16:-16),l=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==Lt(this._turn)||this._board[e]?.type!==Ee){this._hash^=this._epKey(),this._epSquare=Ue;return}const d=r=>!(r&136)&&this._board[r]?.color===this._turn&&this._board[r]?.type===Ee;l.some(d)||(this._hash^=this._epKey(),this._epSquare=Ue)}_attacked(t,e,l){const d=[];for(let r=le.a8;r<=le.h1;r++){if(r&136){r+=7;continue}if(this._board[r]===void 0||this._board[r].color!==t)continue;const m=this._board[r],o=r-e;if(o===0)continue;const L=o+119;if(za[L]&Ba[m.type]){if(m.type===Ee){if(o>0&&m.color===Ge||o<=0&&m.color===et)if(l)d.push(Re(r));else return!0;continue}if(m.type==="n"||m.type==="k")if(l){d.push(Re(r));continue}else return!0;const B=Ra[L];let S=r+B,T=!1;for(;S!==e;){if(this._board[S]!=null){T=!0;break}S+=B}if(!T)if(l){d.push(Re(r));continue}else return!0}}return l?d:!1}attackers(t,e){return e?this._attacked(e,le[t],!0):this._attacked(this._turn,le[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(Lt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,le[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let l=0,d=0;for(let r=le.a8;r<=le.h1;r++){if(d=(d+1)%2,r&136){r+=7;continue}const m=this._board[r];m&&(t[m.type]=m.type in t?t[m.type]+1:1,m.type===Jt&&e.push(d),l++)}if(l===2)return!0;if(l===3&&(t[Jt]===1||t[ca]===1))return!0;if(l===t[Jt]+2){let r=0;const m=e.length;for(let o=0;o<m;o++)r+=e[o];if(r===0||r===m)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:l=void 0}={}){const d=this._moves({square:e,piece:l});return t?d.map(r=>new Wt(this,r)):d.map(r=>this._moveToSan(r,d))}_moves({legal:t=!0,piece:e=void 0,square:l=void 0}={}){const d=l?l.toLowerCase():void 0,r=e?.toLowerCase(),m=[],o=this._turn,L=Lt(o);let B=le.a8,S=le.h1,T=!1;if(d)if(d in le)B=S=le[d],T=!0;else return[];for(let N=B;N<=S;N++){if(N&136){N+=7;continue}if(!this._board[N]||this._board[N].color===L)continue;const{type:ge}=this._board[N];let xe;if(ge===Ee){if(r&&r!==ge)continue;xe=N+oa[o][0],this._board[xe]||(ft(m,o,N,xe,Ee),xe=N+oa[o][1],Ga[o]===_t(N)&&!this._board[xe]&&ft(m,o,N,xe,Ee,void 0,de.BIG_PAWN));for(let Be=2;Be<4;Be++)xe=N+oa[o][Be],!(xe&136)&&(this._board[xe]?.color===L?ft(m,o,N,xe,Ee,this._board[xe].type,de.CAPTURE):xe===this._epSquare&&ft(m,o,N,xe,Ee,Ee,de.EP_CAPTURE))}else{if(r&&r!==ge)continue;for(let Be=0,Je=ma[ge].length;Be<Je;Be++){const st=ma[ge][Be];for(xe=N;xe+=st,!(xe&136);){if(!this._board[xe])ft(m,o,N,xe,ge);else{if(this._board[xe].color===o)break;ft(m,o,N,xe,ge,this._board[xe].type,de.CAPTURE);break}if(ge===ca||ge===Le)break}}}}if((r===void 0||r===Le)&&(!T||S===this._kings[o])){if(this._castling[o]&de.KSIDE_CASTLE){const N=this._kings[o],ge=N+2;!this._board[N+1]&&!this._board[ge]&&!this._attacked(L,this._kings[o])&&!this._attacked(L,N+1)&&!this._attacked(L,ge)&&ft(m,o,this._kings[o],ge,Le,void 0,de.KSIDE_CASTLE)}if(this._castling[o]&de.QSIDE_CASTLE){const N=this._kings[o],ge=N-2;!this._board[N-1]&&!this._board[N-2]&&!this._board[N-3]&&!this._attacked(L,this._kings[o])&&!this._attacked(L,N-1)&&!this._attacked(L,ge)&&ft(m,o,this._kings[o],ge,Le,void 0,de.QSIDE_CASTLE)}}if(!t||this._kings[o]===-1)return m;const P=[];for(let N=0,ge=m.length;N<ge;N++)this._makeMove(m[N]),this._isKingAttacked(o)||P.push(m[N]),this._undoMove();return P}move(t,{strict:e=!1}={}){let l=null;if(typeof t=="string")l=this._moveFromSan(t,e);else if(t===null)l=this._moveFromSan(sa,e);else if(typeof t=="object"){const r=this._moves();for(let m=0,o=r.length;m<o;m++)if(t.from===Re(r[m].from)&&t.to===Re(r[m].to)&&(!("promotion"in r[m])||t.promotion===r[m].promotion)){l=r[m];break}}if(!l)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&l.flags&de.NULL_MOVE)throw new Error("Null move not allowed when in check");const d=new Wt(this,l);return this._makeMove(l),this._incPositionCount(),d}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,l=Lt(e);if(this._push(t),t.flags&de.NULL_MOVE){e===et&&this._moveNumber++,this._halfMoves++,this._turn=l,this._epSquare=Ue;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&de.EP_CAPTURE&&(this._turn===et?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Le){if(this._kings[e]=t.to,t.flags&de.KSIDE_CASTLE){const d=t.to-1,r=t.to+1;this._movePiece(r,d)}else if(t.flags&de.QSIDE_CASTLE){const d=t.to+1,r=t.to-2;this._movePiece(r,d)}this._castling[e]=0}if(this._castling[e]){for(let d=0,r=bt[e].length;d<r;d++)if(t.from===bt[e][d].square&&this._castling[e]&bt[e][d].flag){this._castling[e]^=bt[e][d].flag;break}}if(this._castling[l]){for(let d=0,r=bt[l].length;d<r;d++)if(t.to===bt[l][d].square&&this._castling[l]&bt[l][d].flag){this._castling[l]^=bt[l][d].flag;break}}if(this._hash^=this._castlingKey(),t.flags&de.BIG_PAWN){let d;e===et?d=t.to-16:d=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===Ee&&this._board[t.to-1]?.color===l||!(t.to+1&136)&&this._board[t.to+1]?.type===Ee&&this._board[t.to+1]?.color===l?(this._epSquare=d,this._hash^=this._epKey()):this._epSquare=Ue}else this._epSquare=Ue;t.piece===Ee?this._halfMoves=0:t.flags&(de.CAPTURE|de.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===et&&this._moveNumber++,this._turn=l,this._hash^=na}undo(){const t=this._hash,e=this._undoMove();if(e){const l=new Wt(this,e);return this._decPositionCount(t),l}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=na;const l=this._turn,d=Lt(l);if(e.flags&de.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:l})),e.captured)if(e.flags&de.EP_CAPTURE){let r;l===et?r=e.to-16:r=e.to+16,this._set(r,{type:Ee,color:d})}else this._set(e.to,{type:e.captured,color:d});if(e.flags&(de.KSIDE_CASTLE|de.QSIDE_CASTLE)){let r,m;e.flags&de.KSIDE_CASTLE?(r=e.to+1,m=e.to-1):(r=e.to-2,m=e.to+1),this._movePiece(m,r)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const l=[];let d=!1;for(const P in this._header)this._header[P]&&l.push(`[${P} "${this._header[P]}"]`+t),d=!0;d&&this._history.length&&l.push(t);const r=P=>{const N=this._comments[this.fen()];if(typeof N<"u"){const ge=P.length>0?" ":"";P=`${P}${ge}{${N}}`}return P},m=[];for(;this._history.length>0;)m.push(this._undoMove());const o=[];let L="";for(m.length===0&&o.push(r(""));m.length>0;){L=r(L);const P=m.pop();if(!P)break;if(!this._history.length&&P.color==="b"){const N=`${this._moveNumber}. ...`;L=L?`${L} ${N}`:N}else P.color==="w"&&(L.length&&o.push(L),L=this._moveNumber+".");L=L+" "+this._moveToSan(P,this._moves({legal:!0})),this._makeMove(P)}if(L.length&&o.push(r(L)),o.push(this._header.Result||"*"),e===0)return l.join("")+o.join(" ");const B=function(){return l.length>0&&l[l.length-1]===" "?(l.pop(),!0):!1},S=function(P,N){for(const ge of N.split(" "))if(ge){if(P+ge.length>e){for(;B();)P--;l.push(t),P=0}l.push(ge),P+=ge.length,l.push(" "),P++}return B()&&P--,P};let T=0;for(let P=0;P<o.length;P++){if(T+o[P].length>e&&o[P].includes("{")){T=S(T,o[P]);continue}T+o[P].length>e&&P!==0?(l[l.length-1]===" "&&l.pop(),l.push(t),T=0):P!==0&&(l.push(" "),T++),l.push(o[P]),T+=o[P].length}return l.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??pa[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=pa[t]||null,!0):!1}getHeaders(){const t={};for(const[e,l]of Object.entries(this._header))l!==null&&(t[e]=l);return t}loadPgn(t,{strict:e=!1,newlineChar:l=`\r?
`}={}){l!==`\r?
`&&(t=t.replace(new RegExp(l,"g"),`
`));const d=Aa(t);this.reset();const r=d.headers;let m="";for(const B in r)B.toLowerCase()==="fen"&&(m=r[B]),this.header(B,r[B]);if(!e)m&&this.load(m,{preserveHeaders:!0});else if(r.SetUp==="1"){if(!("FEN"in r))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(r.FEN,{preserveHeaders:!0})}let o=d.root;for(;o;){if(o.move){const B=this._moveFromSan(o.move,e);if(B==null)throw new Error(`Invalid move in PGN: ${o.move}`);this._makeMove(B),this._incPositionCount()}o.comment!==void 0&&(this._comments[this.fen()]=o.comment),o=o.variations[0]}const L=d.result;L&&Object.keys(this._header).length&&this._header.Result!==L&&this.setHeader("Result",L)}_moveToSan(t,e){let l="";if(t.flags&de.KSIDE_CASTLE)l="O-O";else if(t.flags&de.QSIDE_CASTLE)l="O-O-O";else{if(t.flags&de.NULL_MOVE)return sa;if(t.piece!==Ee){const d=Ka(t,e);l+=t.piece.toUpperCase()+d}t.flags&(de.CAPTURE|de.EP_CAPTURE)&&(t.piece===Ee&&(l+=Re(t.from)[0]),l+="x"),l+=Re(t.to),t.promotion&&(l+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?l+="#":l+="+"),this._undoMove(),l}_moveFromSan(t,e=!1){let l=la(t);if(e||(l==="0-0"?l="O-O":l==="0-0-0"&&(l="O-O-O")),l==sa)return{color:this._turn,from:0,to:0,piece:"k",flags:de.NULL_MOVE};let d=va(l),r=this._moves({legal:!0,piece:d});for(let P=0,N=r.length;P<N;P++)if(l===la(this._moveToSan(r[P],r)))return r[P];if(e)return null;let m,o,L,B,S,T=!1;if(o=l.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),o?(m=o[1],L=o[2],B=o[3],S=o[4],L.length==1&&(T=!0)):(o=l.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),o&&(m=o[1],L=o[2],B=o[3],S=o[4],L.length==1&&(T=!0))),d=va(l),r=this._moves({legal:!0,piece:m||d}),!B)return null;for(let P=0,N=r.length;P<N;P++)if(L){if((!m||m.toLowerCase()==r[P].piece)&&le[L]==r[P].from&&le[B]==r[P].to&&(!S||S.toLowerCase()==r[P].promotion))return r[P];if(T){const ge=Re(r[P].from);if((!m||m.toLowerCase()==r[P].piece)&&le[B]==r[P].to&&(L==ge[0]||L==ge[1])&&(!S||S.toLowerCase()==r[P].promotion))return r[P]}}else if(l===la(this._moveToSan(r[P],r)).replace("x",""))return r[P];return null}ascii(){let t=`   +------------------------+
`;for(let e=le.a8;e<=le.h1;e++){if(Rt(e)===0&&(t+=" "+"87654321"[_t(e)]+" |"),this._board[e]){const l=this._board[e].type,r=this._board[e].color===Ge?l.toUpperCase():l.toLowerCase();t+=" "+r+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let l=0;const d=this._turn;for(let r=0,m=e.length;r<m;r++)this._makeMove(e[r]),this._isKingAttacked(d)||(t-1>0?l+=this.perft(t-1):l++),this._undoMove();return l}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let l=le.a8;l<=le.h1;l++)this._board[l]==null?e.push(null):e.push({square:Re(l),type:this._board[l].type,color:this._board[l].color}),l+1&136&&(t.push(e),e=[],l+=8);return t}squareColor(t){if(t in le){const e=le[t];return(_t(e)+Rt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],l=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const d=e.pop();if(!d)break;t?l.push(new Wt(this,d)):l.push(this._moveToSan(d,this._moves())),this._makeMove(d)}return l}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},l=d=>{d in this._comments&&(e[d]=this._comments[d])};for(;this._history.length>0;)t.push(this._undoMove());for(l(this.fen());;){const d=t.pop();if(!d)break;this._makeMove(d),l(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const d of[Le,mt])e[d]!==void 0&&(e[d]?this._castling[t]|=Kt[d]:this._castling[t]&=~Kt[d]);this._updateCastlingRights();const l=this.getCastlingRights(t);return(e[Le]===void 0||e[Le]===l[Le])&&(e[mt]===void 0||e[mt]===l[mt])}getCastlingRights(t){return{[Le]:(this._castling[t]&Kt[Le])!==0,[mt]:(this._castling[t]&Kt[mt])!==0}}moveNumber(){return this._moveNumber}}async function Qa(n,t={}){const e=t.currentUser||{};let l="chat",d=[],r=null,m=[],o=[],L=null,B=null,S=!1,T=null,P=null;n.innerHTML=`
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
  `,Va(),await ht(),je();const N=n.querySelector("#tab-nav-chat"),ge=n.querySelector("#tab-nav-lounge"),xe=n.querySelector("#bonding-chat-main-wrap"),Be=n.querySelector("#bonding-lounge-main-wrap");N?.addEventListener("click",()=>{l="chat",N.classList.add("active"),ge.classList.remove("active"),xe.style.display="grid",Be.style.display="none",je()}),ge?.addEventListener("click",async()=>{l="lounge_games",ge.classList.add("active"),N.classList.remove("active"),xe.style.display="none",Be.style.display="block",await s()}),n.querySelector("#btn-top-new-chat")?.addEventListener("click",v),n.querySelector("#btn-top-new-group")?.addEventListener("click",G),n.querySelector("#btn-top-challenge")?.addEventListener("click",()=>I());const Je=n.querySelector("#bonding-search-input");Je&&Je.addEventListener("input",p=>{const c=p.target.value.toLowerCase().trim();n.querySelectorAll(".bonding-channel-item").forEach(f=>{const g=f.textContent.toLowerCase();f.style.display=g.includes(c)?"flex":"none"})}),lt(),new MutationObserver((p,c)=>{document.body.contains(n)||(B&&clearInterval(B),P&&clearInterval(P),c.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function ht(){try{const[p,c]=await Promise.all([qe("/bonding/channels").catch(()=>[]),qe("/bonding/colleagues").catch(()=>[])]);d=p,m=c,!r&&d.length>0&&(r=d.find(a=>a.name.includes("Lounge"))||d[0]),Ne(),r&&await Ce(r._id)}catch(p){console.error("Failed to load bonding data",p)}}async function Ce(p,c=!1){if(p)try{o=await qe(`/bonding/channels/${p}/messages`),c?j():i()}catch(a){console.error("Failed to load messages",a)}}function lt(){B&&clearInterval(B),B=setInterval(async()=>{try{if(!document.body.contains(n)){clearInterval(B);return}l==="chat"&&r?await Ce(r._id,!0):l==="lounge_games"&&await s(!0)}catch{}},3e3)}function Ne(){const p=n.querySelector("#bonding-group-list"),c=n.querySelector("#bonding-direct-list");if(!p||!c)return;const a=d.filter(g=>g.type==="group"),f=d.filter(g=>g.type==="direct");if(a.length===0)p.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const g=e?._id||e?.id,A=userRole==="superadmin"||e?.role==="superadmin";p.innerHTML=a.map(x=>{const D=r&&r._id===x._id,R=x.createdBy&&x.createdBy.userId&&String(x.createdBy.userId)===String(g)||A;return`
          <div class="bonding-channel-item ${D?"active":""}" data-channel-id="${x._id}">
            <div class="bonding-channel-icon">${x.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${y(x.name)}</div>
              <div class="bonding-channel-preview">${y(x.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${R?`
              <button class="bonding-channel-del-btn" data-channel-id="${x._id}" title="Delete Group (Creator only)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            `:`
              <button class="bonding-channel-leave-btn" data-channel-id="${x._id}" title="Leave Group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            `}
          </div>
        `}).join("")}f.length===0?c.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':c.innerHTML=f.map(g=>{const A=r&&r._id===g._id,x=g.displayName||g.name||"Colleague",D=x.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${A?"active":""}" data-channel-id="${g._id}">
            <div class="bonding-channel-avatar">${D}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${y(x)}</div>
              <div class="bonding-channel-preview">${y(g.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${g._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),dt()}function dt(){const p=n.querySelectorAll(".bonding-channel-item");p.forEach(c=>{c.onclick=async a=>{if(a.target.closest(".bonding-channel-del-btn")||a.target.closest(".bonding-channel-leave-btn"))return;const f=c.dataset.channelId,g=d.find(A=>A._id===f);g&&(r=g,p.forEach(A=>A.classList.remove("active")),c.classList.add("active"),je(),await Ce(g._id))}}),n.querySelectorAll(".bonding-channel-leave-btn").forEach(c=>{c.onclick=async a=>{a.stopPropagation();const f=c.dataset.channelId,A=d.find(x=>x._id===f)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${A}"?`))try{c.disabled=!0,await ke(`/bonding/channels/${f}/leave`,{}),$(`You left "${A}"`,"info"),d=d.filter(x=>x._id!==f),r&&r._id===f&&(r=d.find(x=>x.type==="group")||d[0]||null,je(),r&&await Ce(r._id)),Ne()}catch(x){$(x.message||"Failed to leave group","error"),c.disabled=!1}}}),n.querySelectorAll(".bonding-channel-del-btn").forEach(c=>{c.onclick=async a=>{a.stopPropagation();const f=c.dataset.channelId,g=d.find(D=>D._id===f),A=g&&g.type==="direct",x=A?"this 1-on-1 chat":`the group "${g?.name||""}"`;if(confirm(`Are you sure you want to delete ${x}? All messages will be permanently removed.`))try{c.disabled=!0,await Ye(`/bonding/channels/${f}`),$(A?"1-on-1 chat deleted":"Group deleted","success"),d=d.filter(D=>D._id!==f),r&&r._id===f&&(r=d[0]||null,je(),r&&await Ce(r._id)),Ne()}catch(D){$(D.message||"Failed to delete conversation","error"),c.disabled=!1}}}),n.querySelector("#btn-create-group")?.addEventListener("click",G),n.querySelector("#btn-new-direct-chat")?.addEventListener("click",v)}function je(){const p=n.querySelector("#bonding-chat-panel");if(!p)return;if(!r){p.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const c=y(r.displayName||r.name),a=(r.members||[]).length,f=r.type==="group",g=e?._id||e?.id,A=f?null:(r.members||[]).find(R=>R.userId?.toString()!==g?.toString()),x=r.createdBy&&r.createdBy.userId&&String(r.createdBy.userId)===String(g),D=userRole==="superadmin"||e?.role==="superadmin",oe=x||D;p.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${f?r.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${c}</div>
            <div class="bonding-chat-sub">
              ${f?`<span>${a} members</span> · <span>${y(r.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${f?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${a})</span>
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
        ${it()}
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
    `,Pe(A),ue(A),tt(),_()}function it(){if(!o||o.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const p=e?._id||e?.id;return o.map(c=>{const a=c.sender&&c.sender.userId&&p&&c.sender.userId.toString()===p.toString();if(c.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${c._id}">
            <span>ℹ️</span> <span>${y(c.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${c._id}" title="Delete Message">&times;</button>
          </div>
        `;if(c.type==="challenge"&&c.challengeData){const x=c.challengeData;if(x.status==="declined"||x.status==="cancelled")return"";const D=x.gameTitle||"Game Challenge",oe=x.gameType||"chess",R=oe==="chess"?"♟️":oe==="ludo"?"🎲":"❌",q=x.gameState?.invitationId,ie=x.targetUserId?.toString(),Y=c.sender?.userId?.toString(),Q=p&&ie===p.toString(),Z=p&&Y===p.toString();return`
          <div class="bonding-msg-row ${a?"self":"other"}" data-msg-id="${c._id}">
            <div class="bonding-msg-avatar" title="${y(c.sender?.name||"Teammate")}">
              ${(c.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${y(c.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${ae(c.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${c._id}" title="Delete Challenge Message">
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
                    <h4 class="game-bubble-title">${y(D)}</h4>
                    <p class="game-bubble-desc">${y(c.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${x.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':x.status==="active"||x.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${y(x.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${x.status==="pending"&&Q?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${q}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${q}" data-action="decline">
                        Decline
                      </button>
                    `:x.status==="pending"&&Z?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${q}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${q}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${nt(c)}
            </div>
          </div>
        `}const f=y(c.sender?.name||"Teammate"),g=ae(c.createdAt),A=nt(c);return`
        <div class="bonding-msg-row ${a?"self":"other"}" data-msg-id="${c._id}">
          <div class="bonding-msg-avatar" title="${f}">${f.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${f}</span>
              <span class="bonding-msg-time">${g}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${c._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${y(c.content).replace(/\n/g,"<br/>")}
            </div>
            ${A}
          </div>
        </div>
      `}).join("")}function nt(p){return`
      <div class="bonding-reactions-row">
        ${(p.reactions||[]).map(f=>{const g=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(f.users||[]).some(x=>x.toString()===g?.toString())?"active":""}" data-msg-id="${p._id}" data-emoji="${f.emoji}">
          <span>${f.emoji}</span> <span>${f.users?f.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${p._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function Pe(p){const c=n.querySelector("#btn-chat-challenge");c&&(c.onclick=()=>{p?I(null,p.userId||p._id):I()});const a=n.querySelector("#btn-manage-members");a&&(a.onclick=M);const f=n.querySelector("#btn-delete-group");f&&(f.onclick=U);const g=n.querySelector("#btn-leave-group");g&&(g.onclick=F);const A=n.querySelector("#btn-delete-direct");A&&(A.onclick=async()=>{if(r&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{A.disabled=!0,await Ye(`/bonding/channels/${r._id}`),$("1-on-1 chat deleted successfully","success");const D=r._id;d=d.filter(oe=>oe._id!==D),r=d[0]||null,Ne(),je(),r&&await Ce(r._id)}catch(D){$(D.message||"Could not delete 1-on-1 chat","error"),A.disabled=!1}});const x=n.querySelector("#btn-clear-chat");x&&(x.onclick=async()=>{if(r&&confirm("Are you sure you want to clear all messages in this conversation?"))try{x.disabled=!0,await Ye(`/bonding/channels/${r._id}/messages`),$("Chat messages cleared","success"),o=[],i()}catch(D){$(D.message||"Could not clear chat messages","error")}finally{x.disabled=!1}})}function ue(p){const c=n.querySelector("#bonding-message-input"),a=n.querySelector("#btn-send-message"),f=n.querySelector("#btn-quick-emoji"),g=n.querySelector("#btn-input-challenge");c&&c.addEventListener("keydown",A=>{A.key==="Enter"&&!A.shiftKey&&(A.preventDefault(),he())}),a&&(a.onclick=he),g&&(g.onclick=()=>{p?I(null,p.userId||p._id):I()}),f&&(f.onclick=()=>{if(!c)return;const A=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],x=A[Math.floor(Math.random()*A.length)];c.value+=(c.value?" ":"")+x,c.focus()})}function tt(){n.querySelectorAll(".btn-respond-invite").forEach(f=>{f.onclick=async()=>{const g=f.dataset.inviteId,A=f.dataset.action;await K(g,A)}}),n.querySelectorAll(".btn-launch-match-from-card").forEach(f=>{f.onclick=async()=>{const g=f.dataset.inviteId;try{f.disabled=!0;const A=await qe("/bonding/invitations"),x=(A.incoming||[]).concat(A.sent||[]).find(D=>D._id===g);x&&x.matchId?W(x.matchId):$("Match has not started yet or has expired","warning")}catch(A){$(A.message||"Could not load match","error")}finally{f.disabled=!1}}}),n.querySelectorAll(".bonding-msg-del-btn").forEach(f=>{f.onclick=async g=>{g.stopPropagation();const A=f.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{f.disabled=!0,await Ye(`/bonding/messages/${A}`),o=o.filter(x=>x._id!==A),j(),$("Message deleted","success")}catch(x){$(x.message||"Failed to delete message","error"),f.disabled=!1}}}),n.querySelectorAll(".bonding-rxn-tag").forEach(f=>{f.onclick=async()=>{const g=f.dataset.msgId,A=f.dataset.emoji;await b(g,A)}}),n.querySelectorAll(".bonding-add-rxn-btn").forEach(f=>{f.onclick=g=>{const A=f.dataset.msgId;te(g.currentTarget,async x=>{await b(A,x)})}})}async function he(){const p=n.querySelector("#bonding-message-input");if(!p||!r||S)return;const c=p.value.trim();if(c)try{S=!0,p.value="";const a=await ke(`/bonding/channels/${r._id}/messages`,{content:c,type:"text"});o.push(a),i(),_()}catch(a){$(a.message||"Failed to send message","error")}finally{S=!1,p.focus()}}async function b(p,c){try{const a=await ke(`/bonding/messages/${p}/react`,{emoji:c}),f=o.find(g=>g._id===p);f&&(f.reactions=a,j())}catch(a){$(a.message||"Failed to react","error")}}function _(){const p=n.querySelector("#bonding-messages-feed");p&&(p.scrollTop=p.scrollHeight)}function j(){const p=n.querySelector("#bonding-messages-feed");if(!p)return;const c=p.scrollHeight-p.scrollTop<=p.clientHeight+80;p.innerHTML=it(),tt(),c&&_()}function i(){const p=n.querySelector("#bonding-messages-feed");p&&(p.innerHTML=it(),tt())}async function s(p=!1){const c=n.querySelector("#bonding-lounge-main-wrap");if(c){p||(c.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const a=await qe("/bonding/games/overview");L=a;const f=a.myStats||{},g=a.availableGames||[],A=a.incomingChallenges||[],x=a.sentChallenges||[],D=a.activeMatches||[],oe=a.recentMatches||[],R=e?._id||e?.id;c.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${f.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${f.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${f.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${f.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${f.gamesPlayed>0?Math.round((f.wins||0)/f.gamesPlayed*100):0}%</span>
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
              ${g.map(q=>`
                <div class="lounge-game-card" data-game-id="${q.id}">
                  <div class="game-card-icon">${q.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${y(q.name)}</h4>
                    <p class="game-card-desc">${y(q.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${q.duration}</span>
                      ${q.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${q.id}" data-game-title="${y(q.name)}">
                    ${q.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${A.length+x.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${A.length})</h5>
              ${A.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${A.map(q=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(q.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${y(q.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${y(q.sender.name)}</strong> (${y(q.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${q._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${q._id}" data-action="decline">
                            Decline
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

              <!-- Sent -->
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${x.length})</h5>
              ${x.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${x.map(q=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(q.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${y(q.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${y(q.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${q._id}" data-action="cancel">
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
                    ${D.map(q=>{const Y=R&&q.player1.userId.toString()===R.toString()?q.player2:q.player1,Q=R&&q.currentTurnUserId&&q.currentTurnUserId.toString()===R.toString();return`
                        <div class="lounge-active-match-card ${Q?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${q.gameType==="chess"?"♟️":q.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${y(q.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${y(Y.name)}</strong> (${y(Y.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${Q?"my-turn":"wait"}">
                              ${Q?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${q._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${q._id}" title="Delete Match">
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
                  ${oe.map(q=>{const Y=R&&q.player1.userId.toString()===R.toString()?q.player2:q.player1,Q=R&&q.winnerId&&q.winnerId.toString()===R.toString(),Z=q.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${y(q.gameTitle)}</span>
                          <span class="recent-date">${ae(q.completedAt||q.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${q._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${y(Y.name)}</strong></div>
                          <div class="recent-outcome ${Q?"win":Z?"draw":"loss"}">
                            ${Q?"🏆 VICTORY":Z?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${y(q.winningReason||q.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${q._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${q._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,C()}catch(a){c.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${y(a.message)}</p>
        </div>
      `}}}function C(){n.querySelectorAll(".btn-challenge-game").forEach(c=>{c.onclick=()=>{const a=c.dataset.gameId;I(a)}}),n.querySelectorAll(".btn-respond-invite").forEach(c=>{c.onclick=async()=>{const a=c.dataset.inviteId,f=c.dataset.action;await K(a,f),await s()}}),n.querySelectorAll(".btn-resume-match").forEach(c=>{c.onclick=()=>{const a=c.dataset.matchId;W(a)}}),n.querySelectorAll(".btn-recent-rematch").forEach(c=>{c.onclick=async()=>{const a=c.dataset.matchId;try{c.disabled=!0;const f=await ke(`/bonding/matches/${a}/action`,{action:"rematch"});f.match&&($("Rematch created! Opening arena ⚔️","success"),W(f.match._id))}catch(f){$(f.message||"Could not start rematch","error")}finally{c.disabled=!1}}}),n.querySelectorAll(".btn-delete-match").forEach(c=>{c.onclick=async a=>{a.stopPropagation();const f=c.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{c.disabled=!0,await Ye(`/bonding/matches/${f}`),$("Match deleted successfully","success"),await s()}catch(g){$(g.message||"Failed to delete match","error")}finally{c.disabled=!1}}});const p=n.querySelector("#btn-clear-matches");p&&(p.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{p.disabled=!0,await Ye("/bonding/matches?filter=completed"),$("Completed matches history cleared","success"),await s()}catch(c){$(c.message||"Failed to clear matches","error")}finally{p.disabled=!1}})}function I(p=null,c=null){const a=n.querySelector("#bonding-modals-root"),f=e?._id||e?.id,g=new Set(["employee","admin","superadmin"]),A=m.filter(Q=>!Q.isSelf&&Q._id.toString()!==f?.toString()&&g.has(Q.role));let x=p||"chess",D=c?c.toString():null,oe=2,R=D?[D]:[],q="none";function ie(){const Q=A.find(se=>se._id.toString()===D),Z=x==="ludo",V=oe-1,re=R.length===V;a.innerHTML=`
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
                  <button class="game-pill-btn ${x==="chess"?"active":""}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${x==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                  <button class="game-pill-btn ${x==="ludo"?"active":""}" data-game="ludo">
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
                  ${Z?`Step 3 — Select Colleagues to Play With (${R.length}/${V} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${A.map(se=>{const fe=Z?R.includes(se._id.toString()):D===se._id.toString();return`
                      <div class="eligible-emp-item ${fe?"selected":""}" data-user-id="${se._id}">
                        <div class="emp-item-avatar">${se.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${y(se.name)}</span>
                          <span class="emp-item-role">${y(se.role==="superadmin"?"Superadmin":se.role==="admin"?"Admin":"Employee")} · ${y(se.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${fe?"active":""}">
                          ${fe?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Step for Chess timers -->
              ${x==="chess"?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 3 — Time Control Options</div>
                  <div class="timer-opts-row">
                    <label class="timer-radio-lbl ${q==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${q==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${q==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${q==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${q==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${q==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${Z?`🎲 Ludo (${oe} Players · 4 Pawns per base)`:x==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${Z?`
                    <div><strong>Opponents:</strong> ${R.length>0?R.map(se=>{const fe=A.find(_e=>_e._id.toString()===se);return fe?`<strong>${y(fe.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+V+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${Q?`<strong>${y(Q.name)}</strong> (${y(Q.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${x==="chess"?`<div><strong>Time Control:</strong> ${q==="none"?"Untimed":q}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(Z?!re:!D)?"disabled":""}>
                ${Z?`Start ${oe}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,Y()}function Y(){a.querySelector(".bonding-modal-close").onclick=()=>{a.innerHTML=""},a.querySelector("#btn-cancel-challenge-flow").onclick=()=>{a.innerHTML=""},a.querySelectorAll(".game-pill-btn").forEach(V=>{V.onclick=()=>{x=V.dataset.game,ie()}}),a.querySelectorAll(".ludo-mode-btn").forEach(V=>{V.onclick=()=>{oe=Number(V.dataset.count),R=R.slice(0,oe-1),ie()}});const Q=a.querySelector("#flow-emp-search");Q&&(Q.oninput=V=>{const re=V.target.value.toLowerCase().trim();a.querySelectorAll(".eligible-emp-item").forEach(se=>{const fe=se.textContent.toLowerCase();se.style.display=fe.includes(re)?"flex":"none"})}),a.querySelectorAll(".eligible-emp-item").forEach(V=>{V.onclick=()=>{const re=V.dataset.userId;if(x==="ludo"){const se=oe-1;R.includes(re)?R=R.filter(fe=>fe!==re):R.length<se?R.push(re):R[se-1]=re}else D=re;ie()}}),a.querySelectorAll('input[name="timerMode"]').forEach(V=>{V.onchange=re=>{q=re.target.value,ie()}});const Z=a.querySelector("#btn-submit-challenge-flow");Z&&(Z.onclick=async()=>{if(x==="ludo"){const V=oe-1;if(R.length<V){$(`Please select ${V} colleague(s) to play with`,"warning");return}try{Z.disabled=!0,Z.textContent="Launching Match...";const re=await ke("/bonding/matches/instant-ludo",{playerCount:oe,targetUserIds:R});a.innerHTML="",$(`Ludo match started (${oe} Players)! 🎲`,"success"),re&&re._id&&W(re._id)}catch(re){$(re.message||"Failed to start Ludo match","error"),Z.disabled=!1,Z.textContent=`Start ${oe}P Ludo Match 🎲`}return}if(!D){$("Please select an employee to challenge","warning");return}try{Z.disabled=!0,Z.textContent="Sending Challenge...",await ke("/bonding/invitations",{gameType:x,targetUserId:D,matchSettings:{timerMode:q},channelId:r?._id||null}),$("Game challenge delivered! Awaiting acceptance ⚔️","success"),a.innerHTML="",r&&await Ce(r._id),l==="lounge_games"&&await s()}catch(V){$(V.message||"Could not send challenge","error"),Z.disabled=!1,Z.textContent="Send Challenge 🚀"}})}ie()}async function K(p,c){if(!(!p||!c))try{const a=await Vt(`/bonding/invitations/${p}/respond`,{action:c});c==="accept"?($("Challenge accepted! Entering match arena ⚔️","success"),a.match&&W(a.match._id)):c==="decline"?($("Challenge declined","info"),n.querySelectorAll(`[data-invite-id="${p}"]`).forEach(f=>{const g=f.closest(".lounge-invite-item")||f.closest(".bonding-msg-row");g&&g.remove()})):c==="cancel"&&($("Challenge cancelled","info"),n.querySelectorAll(`[data-invite-id="${p}"]`).forEach(f=>{const g=f.closest(".lounge-invite-item")||f.closest(".bonding-msg-row");g&&g.remove()})),r&&await Ce(r._id),l==="lounge_games"&&await s()}catch(a){$(a.message||"Action failed","error")}}async function W(p){if(!p)return;T=p,P&&clearInterval(P);const c=n.querySelector("#bonding-modals-root");let a=null,f=null,g=[];async function A(){try{return a=await qe(`/bonding/matches/${p}`),a}catch(Y){return $(Y.message||"Could not load match","error"),x(),null}}if(a=await A(),!a)return;function x(){P&&clearInterval(P),T=null,c.innerHTML="",l==="lounge_games"&&s(!0),r&&Ce(r._id,!0)}P=setInterval(async()=>{if(!T||T!==p){clearInterval(P);return}const Y=a?.currentTurnUserId?.toString(),Q=a?.status,Z=await A();Z&&(Z.currentTurnUserId?.toString()!==Y||Z.status!==Q||Z.moves?.length!==a.moves?.length)&&D()},1500);function D(){if(!a)return;const Y=e?._id||e?.id,Q=Y&&a.player1.userId.toString()===Y.toString(),Z=Q?a.player1:a.player2,V=Q?a.player2:a.player1,re=Y&&a.currentTurnUserId&&a.currentTurnUserId.toString()===Y.toString(),se=a.status!=="active";c.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${a.gameType==="ludo"?"🎲":a.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${y(a.gameTitle)}</h3>
                  ${a.gameType==="ludo"&&a.gameState?.players?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${a.gameState.players.map(fe=>{const _e=fe.userId&&fe.userId.toString()===Y?.toString(),Me={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[fe.color]||"⚪",pe=(a.gameState?.turnColor||a.turn)===fe.color;return`
                          <span class="player-tag ${_e?"self":"opp"} ${pe?"turn-active":""}">
                            ${Me} <strong>${y(fe.name)}</strong> ${_e?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${y(Z.name)} (You · <strong>${a.gameType==="ludo"?Z.assignedRole==="red"?"🔴 Red":"🟢 Green":a.gameType==="tictactoe"?Z.assignedRole==="X"?"✕":"◯":Z.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${y(V.name)} (<strong>${a.gameType==="ludo"?V.assignedRole==="red"?"🔴 Red":"🟢 Green":a.gameType==="tictactoe"?V.assignedRole==="X"?"✕":"◯":V.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${se?"ended":re?"my-turn":"opp-turn"}">
                ${se?`<span>🏁 Finished (${y(a.winningReason||a.status)})</span>`:re?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${y(V.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${a.gameType==="ludo"?re?a.gameState?.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":a.gameType==="tictactoe"?re?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":re?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
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
            ${a.drawOfferedBy&&a.drawOfferedBy.toString()!==Y?.toString()&&!se?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${y(V.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${a.gameType==="chess"?oe(Q):""}
              ${a.gameType==="tictactoe"?R():""}
              ${a.gameType==="ludo"?q(Q):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${se?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${a.winnerId&&a.winnerId.toString()===Y?.toString()?"🏆":a.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${a.winnerId&&a.winnerId.toString()===Y?.toString()?"VICTORY!":a.status==="draw"?"STALEMATE / DRAW":`${y(a.winnerName)} Wins!`}</h4>
                  <p>Reason: ${y(a.winningReason||"Match concluded")}</p>
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
      `,ie(re,Q,Z)}function oe(Y){const Q=a.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Z=new xa(Q),V=Y?a.player1.assignedRole==="white":a.player2.assignedRole==="white",re={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},se=V?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],fe=V?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let _e='<div class="chess-board-grid">';for(const $e of fe)for(const Ie of se){const Oe=`${Ie}${$e}`,Se=Z.get(Oe),Te=(Ie.charCodeAt(0)-97+$e)%2!==0,ye=f===Oe,me=g.includes(Oe),E=Se?Se.color==="w"?re[Se.type.toUpperCase()]:re[Se.type]:"";_e+=`
            <div class="chess-sq ${Te?"light":"dark"} ${ye?"selected":""} ${me?"legal-dot":""}" data-square="${Oe}">
              ${E?`<span class="chess-piece ${Se.color==="w"?"white-piece":"black-piece"}">${E}</span>`:""}
            </div>
          `}_e+="</div>";const pe=(a.moves||[]).map($e=>`
        <span class="chess-move-token">${$e.moveNum}. ${$e.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${_e}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${pe||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function R(){const Y=a.gameState?.board||Array(9).fill(null),Q=a.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${Y.map((Z,V)=>{const re=Q.includes(V);return`
                <div class="ttt-cell ${Z?"filled":"empty"} ${re?"win-cell":""}" data-cell-idx="${V}">
                  ${Z==="X"?'<span class="ttt-x">✕</span>':Z==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function q(Y,Q,Z){const V=a.gameState||{},re=V.activeColors||["red","green"],se=V.players||[{...a.player1,color:"red",assignedRole:"red",isBot:!1},{...a.player2,color:"green",assignedRole:"green",isBot:!1}],fe=V.tokens||{},_e=z=>{const ee=fe[z]||(z==="red"?V.p1Tokens:z==="green"?V.p2Tokens:[])||[];return Array.from({length:4},(ve,ze)=>ee[ze]||{id:ze,step:-1})},Me=_e("red"),pe=_e("green"),$e=_e("yellow"),Ie=_e("blue"),Oe=e?._id||e?.id,Te=(se.find(z=>z.userId&&z.userId.toString()===Oe?.toString())||se[0])?.color||(Y?"red":"green"),ye=V.turnColor||a.turn||"red",me=Te===ye&&a.status==="active",E=!!V.rolled,H=V.dice,ce=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],De=[[7,1],[7,2],[7,3],[7,4],[7,5]],we=[[1,7],[2,7],[3,7],[4,7],[5,7]],Qe=[[7,13],[7,12],[7,11],[7,10],[7,9]],vt=[[13,7],[12,7],[11,7],[10,7],[9,7]],Tt=[0,8,13,21,26,34,39,47];function jt(z,ee){return ee<0?null:ee>=56?z==="red"?[7,6]:z==="green"?[6,7]:z==="yellow"?[7,8]:[8,7]:z==="red"?ee<=50?ce[ee]:De[ee-51]:z==="green"?ee<=50?ce[(13+ee)%52]:we[ee-51]:z==="yellow"?ee<=50?ce[(26+ee)%52]:Qe[ee-51]:ee<=50?ce[(39+ee)%52]:vt[ee-51]}function h(z,ee){return z!==Te||!me||!E||!H||a.status!=="active"?!1:ee.step===-1?H===6:ee.step>=0&&ee.step+H<=56}const ot={},He=(z,ee)=>{ee.forEach(ve=>{if(ve.step>=0&&ve.step<56){const ze=jt(z,ve.step);if(ze){const We=ze[0]+","+ze[1];(ot[We]=ot[We]||[]).push({color:z,id:ve.id,step:ve.step,movable:h(z,ve)})}}})};re.includes("red")&&He("red",Me),re.includes("green")&&He("green",pe),re.includes("yellow")&&He("yellow",$e),re.includes("blue")&&He("blue",Ie);const xt={};ce.forEach(([z,ee],ve)=>{xt[z+","+ee]=ve});const O={};De.forEach(([z,ee],ve)=>{O[z+","+ee]=ve+1});const ct={};we.forEach(([z,ee],ve)=>{ct[z+","+ee]=ve+1});const Ae={};Qe.forEach(([z,ee],ve)=>{Ae[z+","+ee]=ve+1});const Xe={};vt.forEach(([z,ee],ve)=>{Xe[z+","+ee]=ve+1});const Bt=[];for(let z=0;z<15;z++)for(let ee=0;ee<15;ee++){if(z<6&&ee<6||z<6&&ee>8||z>8&&ee<6||z>8&&ee>8||z>=6&&z<=8&&ee>=6&&ee<=8)continue;const ve=z+","+ee,ze=xt[ve],We=ze!==void 0&&Tt.includes(ze),rt=z===6&&ee===1,ut=z===1&&ee===8,Ze=z===8&&ee===13,Dt=z===13&&ee===6,Fe=O[ve],u=ct[ve],k=Ae[ve],w=Xe[ve];let J="ludo-cell";rt?J+=" cell-red-start":ut?J+=" cell-green-start":Ze?J+=" cell-yellow-start":Dt?J+=" cell-blue-start":Fe?J+=" cell-red-stretch":u?J+=" cell-green-stretch":k?J+=" cell-yellow-stretch":w?J+=" cell-blue-stretch":We&&(J+=" cell-safe-star");const ne=ot[ve]||[];Bt.push(`
            <div class="${J}" style="grid-row:${z+1};grid-column:${ee+1}" data-pos="${ve}">
              ${We?'<span class="cell-star-glyph">⭐</span>':""}
              ${rt||ut||Ze||Dt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${ne.map(be=>`
                <div class="ludo-token token-${be.color} ${be.movable?"movable":""}" data-token-id="${be.id}" data-color="${be.color}" title="${be.color.toUpperCase()} Pawn ${be.id+1}">
                  <span>${be.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function Ve(z){const ee=Math.max(1,Math.min(6,Number(z)||1)),ve={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,7,9,5],6:[1,4,7,3,6,9]},ze=new Set(ve[ee]||[5]);let We="";for(let rt=1;rt<=9;rt++)We+=`<span class="ludo-pip ${ze.has(rt)?"filled":"empty"}"></span>`;return`<div class="ludo-dice-face face-${ee}">${We}</div>`}function yt(z,ee,ve,ze,We){const rt=`${z}-yard`;if(!ve)return`
            <div class="ludo-yard ${rt}">
              <div class="yard-box decorative">
                <div class="yard-title">${ee} (Inactive)</div>
              </div>
            </div>
          `;const ut=We.filter(Ze=>Ze.step===56).length;return`
          <div class="ludo-yard ${rt} ${ye===z?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${ee}</span>
                ${ut>0?`<span class="yard-home-badge" title="${ut} of 4 pawns reached Home!">👑 ${ut}/4 Home</span>`:""}
                ${ze?`<small class="yard-player-lbl">${y(ze.name)}${ze.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${We.map((Ze,Dt)=>`
                  <div class="yard-token-slot">
                    ${Ze.step===-1?`
                      <div class="ludo-token token-${z} ${h(z,Ze)?"movable":""}" data-token-id="${Ze.id}" data-color="${z}" title="${z.toUpperCase()} Pawn ${Ze.id+1}">
                        <span>${Ze.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${Dt+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Pt=se.find(z=>z.color==="red"),X=se.find(z=>z.color==="green"),Xt=se.find(z=>z.color==="yellow"),Nt=se.find(z=>z.color==="blue"),Ot=se.find(z=>z.color===ye)||(ye==="red"?Pt:X),kt=Ot?y(Ot.name):ye.toUpperCase(),It={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[ye]||"🔴",pt=H||V.lastRoll||6,At=me&&!E&&a.status==="active",Mt=_e(Te).filter(z=>h(Te,z));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${yt("red","🔴 Red Base",re.includes("red"),Pt,Me)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${yt("green","🟢 Green Base",re.includes("green"),X,pe)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${yt("blue","🔵 Blue Base",re.includes("blue"),Nt,Ie)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${yt("yellow","🟡 Yellow Base",re.includes("yellow"),Xt,$e)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...Me.filter(z=>z.step===56).map(z=>({col:"red",id:z.id})),...pe.filter(z=>z.step===56).map(z=>({col:"green",id:z.id})),...$e.filter(z=>z.step===56).map(z=>({col:"yellow",id:z.id})),...Ie.filter(z=>z.step===56).map(z=>({col:"blue",id:z.id}))].map(z=>`
                    <div class="tok-home-champion ${z.col}" title="${z.col.toUpperCase()} Pawn ${z.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${z.id+1}</span>
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
                class="ludo-3d-dice ${At?"clickable pulse-roll":""} ${E?"just-rolled":""} border-${ye}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${At?"0":"-1"}"
                title="${At?"Click Dice to Roll!":me?"Choose a pawn to move":`${kt}'s turn`}"
              >
                ${Ve(pt)}
              </div>
              <div class="ludo-dice-action-badge">
                ${At?'<span class="badge-click-roll">🎲 TAP TO ROLL</span>':E?`<span class="badge-rolled-val">${It} Rolled ${pt}</span>`:V.lastRoll?`<span class="badge-last-roll">${It} Rolled ${V.lastRoll}</span>`:'<span class="badge-waiting">Ready</span>'}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${ye}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${It} ${kt}</strong> (${ye.toUpperCase()})
                </span>
                ${me?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${me&&E?"highlight":""}">
                ${me&&!E&&a.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":me&&E&&a.status==="active"?Mt.length>0?Mt.length===1?`🎲 Rolled <strong>${pt}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${pt}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${pt}</strong>. No legal moves possible — turn passing...`:a.status==="active"?E||V.lastRoll?`🎲 ${It} <strong>${kt}</strong> rolled <strong>${pt}</strong>!`:`⏳ Waiting for <strong>${kt}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${y(V.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function ie(Y,Q,Z){c.querySelector("#btn-close-arena").onclick=x;const V=c.querySelector("#btn-arena-resign");V&&(V.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{V.disabled=!0,await ke(`/bonding/matches/${p}/action`,{action:"resign"}),await A(),D()}catch(pe){$(pe.message||"Resign failed","error"),V.disabled=!1}});const re=c.querySelector("#btn-arena-draw");re&&(re.onclick=async()=>{try{await ke(`/bonding/matches/${p}/action`,{action:"offer_draw"}),$("Draw offer sent to opponent","info"),await A(),D()}catch(pe){$(pe.message||"Draw offer failed","error")}});const se=c.querySelector("#btn-confirm-accept-draw");se&&(se.onclick=async()=>{try{await ke(`/bonding/matches/${p}/action`,{action:"accept_draw"}),$("Draw agreed!","info"),await A(),D()}catch(pe){$(pe.message,"error")}});const fe=c.querySelector("#btn-confirm-decline-draw");fe&&(fe.onclick=async()=>{try{await ke(`/bonding/matches/${p}/action`,{action:"decline_draw"}),await A(),D()}catch(pe){$(pe.message,"error")}}),[c.querySelector("#btn-arena-delete-match"),c.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(pe=>{pe.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{pe.disabled=!0,await Ye(`/bonding/matches/${p}`),$("Match deleted","success"),x(),l==="lounge_games"&&await s()}catch($e){$($e.message||"Failed to delete match","error"),pe.disabled=!1}}});const Me=c.querySelector("#btn-arena-rematch-action");if(Me&&(Me.onclick=async()=>{try{Me.disabled=!0,Me.textContent="Creating Rematch...";const pe=await ke(`/bonding/matches/${p}/action`,{action:"rematch"});pe.match&&($("Rematch created! New match live ⚔️","success"),P&&clearInterval(P),W(pe.match._id))}catch(pe){$(pe.message||"Rematch failed","error"),Me.disabled=!1,Me.textContent="🔄 Request Rematch"}}),a.gameType==="chess"&&Y&&a.status==="active"){const pe=a.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",$e=new xa(pe),Ie=Z.assignedRole==="white"?"w":"b";c.querySelectorAll(".chess-sq").forEach(Oe=>{Oe.onclick=async()=>{const Se=Oe.dataset.square;if(f){if(f===Se){f=null,g=[],D();return}if(g.includes(Se)){const ye=$e.get(f);let me;ye&&ye.type==="p"&&(Se.endsWith("8")||Se.endsWith("1"))&&(me=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const E={from:f,to:Se,promotion:me?me.toLowerCase():void 0};f=null,g=[],a=await ke(`/bonding/matches/${p}/move`,{move:E}),D()}catch(E){$(E.message||"Illegal chess move","error"),f=null,g=[],D()}return}}const Te=$e.get(Se);Te&&Te.color===Ie?(f=Se,g=$e.moves({square:Se,verbose:!0}).map(me=>me.to),D()):(f=null,g=[],D())}})}if(a.gameType==="tictactoe"&&Y&&a.status==="active"&&c.querySelectorAll(".ttt-cell.empty").forEach(pe=>{pe.onclick=async()=>{const $e=pe.dataset.cellIdx;try{pe.style.opacity="0.5",a=await ke(`/bonding/matches/${p}/move`,{cellIndex:Number($e)}),D()}catch(Ie){$(Ie.message||"Invalid move","error")}}}),a.gameType==="ludo"&&a.status==="active"){const pe=a.gameState||{},$e=!!pe.rolled,Ie=pe.turnColor||a.turn||"red",Oe=a.player1.userId.toString()===myId?.toString()?a.player1.assignedRole||"red":a.player2.userId.toString()===myId?.toString()?a.player2.assignedRole||"green":(pe.players||[]).find(ye=>ye.userId?.toString()===myId?.toString())?.color||"red",Se=Y&&Ie===Oe,Te=c.querySelector("#btn-interactive-ludo-dice");if(Te&&Se&&!$e){const ye=async()=>{if(Te.dataset.rolling!=="true"){Te.dataset.rolling="true",Te.classList.add("rolling");try{a=await ke(`/bonding/matches/${p}/move`,{action:"roll"}),D()}catch(me){$(me.message||"Failed to roll","error"),Te.classList.remove("rolling"),delete Te.dataset.rolling}}};Te.onclick=ye,Te.onkeydown=me=>{(me.key==="Enter"||me.key===" ")&&(me.preventDefault(),ye())}}if(Se&&$e){const me=(pe.tokens||{})[Oe]||[],E=pe.dice||pe.lastRoll||0,H=me.filter(ce=>ce.step===-1&&E===6||ce.step>=0&&ce.step+E<=56);if(H.length===1&&!window.__ci360LudoAutoMoving){window.__ci360LudoAutoMoving=!0;const ce=H[0];setTimeout(async()=>{try{a=await ke(`/bonding/matches/${p}/move`,{action:"move",tokenId:Number(ce.id)}),window.__ci360LudoAutoMoving=!1,D()}catch(De){window.__ci360LudoAutoMoving=!1,$(De.message||"Auto-move failed","error")}},450)}}Se&&$e&&c.querySelectorAll(".ludo-token.movable").forEach(ye=>{ye.onclick=async me=>{me.stopPropagation();const E=ye.dataset.tokenId;try{ye.style.opacity="0.5",a=await ke(`/bonding/matches/${p}/move`,{action:"move",tokenId:Number(E)}),D()}catch(H){$(H.message||"Invalid token move","error"),ye.style.opacity="1"}}})}}D()}function M(){if(!r||r.type==="direct")return;const p=n.querySelector("#bonding-modals-root"),c=R=>R==="employee"||R==="admin"||R==="superadmin",a=r.members||[],f=new Set(a.map(R=>R.userId?.toString())),g=m.filter(R=>c(R.role)&&!f.has(R._id.toString()));p.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${y(r.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${g.map(R=>`
                    <option value="${R._id}">${y(R.name)} (${y(R.role==="superadmin"?"Superadmin":R.role==="admin"?"Admin":"Employee")})</option>
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
              <label class="bonding-form-label">Current Members (${a.length}):</label>
              <div class="bonding-members-list">
                ${a.map(R=>{const q=e?._id||e?.id,ie=q&&R.userId&&R.userId.toString()===q.toString(),Y=r.createdBy&&r.createdBy.userId&&String(r.createdBy.userId)===String(q),Q=userRole==="superadmin"||e?.role==="superadmin",Z=Y||Q;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(R.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${y(R.name)} ${ie?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${y(R.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${ie?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${R.userId}">
                            🚪 Leave Group
                          </button>
                        `:Z?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${R.userId}" data-name="${y(R.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const R=e?._id||e?.id,q=r.createdBy&&r.createdBy.userId&&String(r.createdBy.userId)===String(R),ie=userRole==="superadmin"||e?.role==="superadmin";return q||ie?`
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""};const A=p.querySelector("#btn-modal-delete-group");A&&(A.onclick=()=>{p.innerHTML="",U()});const x=p.querySelector("#btn-modal-leave-group");x&&(x.onclick=()=>{p.innerHTML="",F()}),p.querySelectorAll(".btn-leave-group-action").forEach(R=>{R.onclick=()=>{p.innerHTML="",F()}});const D=p.querySelector("#btn-submit-add-member");D&&(D.onclick=async()=>{const q=p.querySelector("#sel-add-colleague").value;if(!q){$("Please select a colleague to add","warning");return}try{D.disabled=!0,D.textContent="Adding...";const ie=await Vt(`/bonding/channels/${r._id}/members`,{action:"add",userIds:[q]});$("Colleague added to group! 🎉","success"),r=ie.channel,p.innerHTML="",await Ce(r._id),je()}catch(ie){$(ie.message||"Failed to add member","error"),D.disabled=!1,D.textContent="Add to Group"}}),p.querySelectorAll(".btn-remove-member").forEach(R=>{R.onclick=async()=>{const q=R.dataset.userId,ie=R.dataset.name;if(confirm(`Are you sure you want to remove ${ie} from this group?`))try{R.disabled=!0;const Y=await Vt(`/bonding/channels/${r._id}/members`,{action:"remove",userId:q});$(`${ie} removed from group`,"info"),r=Y.channel,p.innerHTML="",await Ce(r._id),je()}catch(Y){$(Y.message||"Failed to remove member","error"),R.disabled=!1}}})}async function F(){if(!r||r.type==="direct")return;const p=r.name;if(confirm(`Are you sure you want to leave the group "${p}"?`))try{await ke(`/bonding/channels/${r._id}/leave`,{}),$(`You left "${p}"`,"info"),d=await qe("/bonding/channels").catch(()=>[]),r=d.find(a=>a.type==="group")||d[0]||null,Ne(),je(),r&&await Ce(r._id)}catch(a){$(a.message||"Failed to leave group","error")}}async function U(){if(!r||r.type==="direct")return;const p=r.name;if(confirm(`Are you sure you want to delete the group "${p}"?

All messages in this lounge will be deleted.`))try{await Ye(`/bonding/channels/${r._id}`),$(`Group "${p}" deleted successfully`,"success"),d=await qe("/bonding/channels").catch(()=>[]),r=d.find(a=>a.type==="group")||d[0]||null,Ne(),je(),r&&await Ce(r._id)}catch(a){$(a.message||"Failed to delete group","error")}}function v(){const p=n.querySelector("#bonding-modals-root"),c=g=>g==="employee"||g==="admin"||g==="superadmin",a=m.filter(g=>!g.isSelf&&c(g.role));p.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${a.map(g=>`
                <div class="bonding-user-pick-item" data-user-id="${g._id}" data-name="${y(g.name)}">
                  <div class="bonding-member-avatar">${g.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${y(g.name)}</span>
                    <span class="user-pick-role">${y(g.role==="superadmin"?"Superadmin":g.role==="admin"?"Admin":"Employee")} · ${y(g.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelectorAll(".bonding-user-pick-item").forEach(g=>{g.onclick=async()=>{const A=g.dataset.userId;try{const x=await ke("/bonding/channels",{type:"direct",targetUserId:A});p.innerHTML="",d=await qe("/bonding/channels"),r=d.find(D=>D._id===x._id)||x,Ne(),je(),await Ce(r._id)}catch(x){$(x.message||"Failed to open personal chat","error")}}})}function G(){const p=n.querySelector("#bonding-modals-root"),c=x=>x==="employee"||x==="admin"||x==="superadmin",a=m.filter(x=>!x.isSelf&&c(x.role));p.innerHTML=`
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
                ${a.map(x=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${x._id}" />
                    <span>${y(x.name)} (${y(x.role==="superadmin"?"Superadmin":x.role==="admin"?"Admin":"Employee")})</span>
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelector("#btn-cancel-create-grp").onclick=()=>{p.innerHTML=""};let f="👥";const g=p.querySelectorAll(".avatar-opt");g.forEach(x=>{x.onclick=()=>{g.forEach(D=>D.classList.remove("active")),x.classList.add("active"),f=x.textContent.trim()}});const A=p.querySelector("#btn-confirm-create-grp");A.onclick=async()=>{const x=p.querySelector("#new-group-name"),D=p.querySelector("#new-group-desc"),oe=x.value.trim();if(!oe){$("Please enter a group name","warning"),x.focus();return}const R=p.querySelectorAll(".new-group-member-chk:checked"),q=Array.from(R).map(ie=>ie.value);try{A.disabled=!0,A.textContent="Creating...";const ie=await ke("/bonding/channels",{type:"group",name:oe,description:D.value.trim(),avatar:f,memberIds:q});$(`Group "${oe}" created! 🎉`,"success"),p.innerHTML="",d=await qe("/bonding/channels"),r=d.find(Y=>Y._id===ie._id)||ie,Ne(),je(),await Ce(r._id)}catch(ie){$(ie.message||"Failed to create group","error"),A.disabled=!1,A.textContent="Create Group 🎉"}}}function te(p,c){const a=document.querySelector(".bonding-emoji-popup");a&&a.remove();const f=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],g=document.createElement("div");g.className="bonding-emoji-popup",g.innerHTML=f.map(D=>`<button class="emoji-opt-btn" data-e="${D}">${D}</button>`).join("");const A=p.getBoundingClientRect();g.style.top=`${A.bottom+window.scrollY+6}px`,g.style.left=`${A.left+window.scrollX}px`,document.body.appendChild(g),g.querySelectorAll(".emoji-opt-btn").forEach(D=>{D.onclick=oe=>{oe.stopPropagation(),c(D.dataset.e),g.remove()}});const x=D=>{g.contains(D.target)||(g.remove(),document.removeEventListener("click",x))};setTimeout(()=>document.addEventListener("click",x),10)}function ae(p){if(!p)return"";try{return new Date(p).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Va(){const n=document.getElementById("ci360-bonding-styles");n&&n.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}const da=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],Ct=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],qt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function Xa(n,t={}){const{userRole:e="employee",currentUser:l=null,initialTicketId:d=null}=t,r=e==="superadmin"||e==="admin";if(e==="client"||l&&l.role==="client"){n.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let m=[],o={},L=[],B=[],S={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},T=null,P="comments",N=!1;n.innerHTML=`
    <div class="jira-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="jira-header-bar">
        <div class="jira-header-left">
          <div class="jira-breadcrumb">
            <span class="jira-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${r?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="jira-title-row">
            <h2 class="jira-main-title">🎫 ${r?"Support Tickets Board":"Support Tickets"}</h2>
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
            ${Ct.map(i=>`<option value="${i.key}">${i.icon} ${i.label}</option>`).join("")}
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
  `,await Promise.all([Je(),Be(),st(),ht()]),Ce(),Ne(),lt(),nt(),d&&tt(d);const ge=setInterval(()=>{if(!document.contains(n)){clearInterval(ge);return}!(n.querySelector(".dragging")||n.querySelector("input:focus")||n.querySelector("textarea:focus"))&&!T&&ue()},12e3),xe=()=>{document.contains(n)&&!T&&ue()};window.addEventListener("focus",xe);async function Be(){try{const i=new URLSearchParams;S.search&&i.set("search",S.search),S.priority!=="all"&&i.set("priority",S.priority),S.category!=="all"&&i.set("category",S.category),S.assigneeId!=="all"&&i.set("assigneeId",S.assigneeId),S.jobId&&S.jobId!=="all"&&i.set("jobId",S.jobId),S.reporterId&&S.reporterId!=="all"&&i.set("reporterId",S.reporterId),S.scope==="created"&&i.set("reporterId",l?._id||l?.id),S.scope==="assigned"&&i.set("assigneeId",l?._id||l?.id),S.myIssuesOnly&&i.set("myIssuesOnly","true");const s=await qe("/tickets?"+i.toString());m=Array.isArray(s)?s:[]}catch(i){$(i.message||"Failed to load tickets",!0),m=[]}}async function Je(){try{o=await qe("/tickets/stats")}catch(i){console.warn("Could not fetch ticket stats:",i)}}async function st(){try{let i;try{i=await qe("/tickets/staff")}catch{i=await qe("/users")}L=(i||[]).filter(s=>s.active!==!1&&s.role!=="client")}catch(i){console.warn("Could not fetch employees:",i),L=[]}}async function ht(){try{const i=await qe("/jobs?limit=250");B=Array.isArray(i)?i:i?.jobs||[]}catch(i){console.warn("Could not fetch jobs:",i)}}function Ce(){const i=n.querySelector("#jira-stats-root");i&&(i.innerHTML=`
      <div class="jira-stat-card ${S.status==="all"&&!S.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="jira-stat-val">${o.total||0}</span>
        <span class="jira-stat-lbl">Total Tickets</span>
      </div>
      <div class="jira-stat-card ${S.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="jira-stat-val">${o.toDo||0}</span>
        <span class="jira-stat-lbl">To Do</span>
      </div>
      <div class="jira-stat-card content ${S.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="jira-stat-val">${o.content??(o.inProgress||0)}</span>
        <span class="jira-stat-lbl">Content</span>
      </div>
      <div class="jira-stat-card design ${S.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="jira-stat-val">${o.design||0}</span>
        <span class="jira-stat-lbl">Design</span>
      </div>
      <div class="jira-stat-card review ${S.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="jira-stat-val">${o.underReview||0}</span>
        <span class="jira-stat-lbl">Under Review</span>
      </div>
      <div class="jira-stat-card ready ${S.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
        <span class="jira-stat-val">${o.readyToLeave??(o.resolved||o.closed||0)}</span>
        <span class="jira-stat-lbl">Ready to Leave</span>
      </div>
      <div class="jira-stat-card critical" data-stat-filter="critical">
        <span class="jira-stat-val">${o.critical||0}</span>
        <span class="jira-stat-lbl">Critical 🔴</span>
      </div>
      <div class="jira-stat-card overdue" data-stat-filter="overdue">
        <span class="jira-stat-val">${o.overdue||0}</span>
        <span class="jira-stat-lbl">Overdue ⚠️</span>
      </div>
    `,i.querySelectorAll(".jira-stat-card").forEach(s=>{s.onclick=async()=>{const C=s.dataset.statFilter;C==="all"?(S.status="all",S.priority="all"):C==="critical"?(S.priority="Critical",S.status="all"):(S.status=C,S.priority="all"),await ue()}}))}function lt(){const i=n.querySelector("#jira-filter-assignee");i&&(i.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${L.map(C=>`
          <option value="${C._id}" ${S.assigneeId===C._id.toString()?"selected":""}>
            ${y(C.name)} (${y(C.role)})
          </option>
        `).join("")}
      `);const s=n.querySelector("#jira-filter-job");s&&(s.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${B.map(C=>`
          <option value="${C._id}" ${S.jobId===C._id.toString()?"selected":""}>
            📁 ${y(C.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function Ne(){const i=n.querySelector("#jira-board-columns-root");if(!i)return;const s={};da.forEach(C=>{s[C.key]=[]}),m.forEach(C=>{let I=C.status||"To Do";I==="In Progress"?I="Content":I==="Resolved"?I="Under Review":I==="Closed"&&(I="Ready to Leave"),s[I]||(s[I]=[]),s[I].push(C)}),i.innerHTML=da.map(C=>{const I=s[C.key]||[];return`
        <div class="jira-board-column" data-status="${C.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${y(C.label)}</span>
              <span class="jira-col-badge">${I.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${C.key}">
            ${I.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:I.map(K=>dt(K)).join("")}
          </div>
        </div>
      `}).join(""),je(),it()}function dt(i){const s=Ct.find(G=>G.key===i.category)||Ct[0],C=qt.find(G=>G.key===i.priority)||qt[2],I=i.dueDate&&new Date(i.dueDate)<new Date&&i.status!=="Ready to Leave"&&i.status!=="Closed",K=(i.subtasks||[]).filter(G=>G.completed).length,W=(i.subtasks||[]).length,M=Array.isArray(i.assignees)&&i.assignees.length>0?i.assignees:i.assignee&&i.assignee.userId?[i.assignee]:[],F=l?._id||l?.id,U=i.reporter&&i.reporter.userId&&String(i.reporter.userId)===String(F);let v="";if(M.length===0)v='<div class="jira-avatar unassigned" title="Unassigned">?</div>';else{const G=M.slice(0,3),te=M.length-3;v=`
        <div class="jira-avatar-group">
          ${G.map(ae=>`
            <div class="jira-avatar" title="Assignee: ${y(ae.name||"Member")} (${y(ae.role||"")})">
              ${(ae.avatar||ae.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${te>0?`
            <div class="jira-avatar extra-count" title="${te} more assignees: ${y(M.slice(3).map(ae=>ae.name).join(", "))}">
              +${te}
            </div>
          `:""}
        </div>
      `}return`
      <div class="jira-card" draggable="true" data-ticket-id="${i._id}">
        <div class="jira-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="jira-category-pill ${s.slug}">
              ${s.icon} ${s.label}
            </span>
            ${U?`
              <span class="jira-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${i.dueDate?`
              <span class="jira-due-pill ${I?"overdue":""}" title="Due Date">
                ${I?"⚠️ ":"📅 "}
                ${new Date(i.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          <button type="button" class="jira-card-quick-del btn-delete-card-ticket" data-ticket-id="${i._id}" data-ticket-num="${y(i.ticketId)}" title="Delete Ticket">
            🗑️
          </button>
        </div>

        <div class="jira-card-title" title="${y(i.title)}">
          ${y(i.title)}
        </div>

        ${i.jobTitle||i.jobId&&i.jobId.title?`
          <div class="jira-card-job-link" title="Linked Internal Job: ${y(i.jobTitle||i.jobId.title)}">
            📁 ${y(i.jobTitle||i.jobId.title)}
          </div>
        `:""}

        <div class="jira-card-bottom">
          <div class="jira-card-id-row">
            <span class="jira-pri-icon" title="Priority: ${C.label}">${C.icon}</span>
            <span class="jira-ticket-id">${y(i.ticketId)}</span>
          </div>

          <div class="jira-card-assignee-row">
            ${W>0?`
              <span class="jira-subtask-badge" title="${K} of ${W} subtasks completed">
                ☑ ${K}/${W}
              </span>
            `:""}
            ${v}
          </div>
        </div>
      </div>
    `}function je(){const i=n.querySelectorAll(".jira-card"),s=n.querySelectorAll(".jira-board-column");i.forEach(C=>{C.ondragstart=I=>{I.dataTransfer.setData("text/plain",C.dataset.ticketId),C.classList.add("dragging")},C.ondragend=()=>{C.classList.remove("dragging")}}),s.forEach(C=>{C.ondragover=I=>{I.preventDefault(),C.classList.add("drag-over")},C.ondragleave=()=>{C.classList.remove("drag-over")},C.ondrop=async I=>{I.preventDefault(),C.classList.remove("drag-over");const K=I.dataTransfer.getData("text/plain"),W=C.dataset.status;if(!K||!W)return;const M=m.find(U=>U._id.toString()===K);if(!M||M.status===W)return;const F=M.status;M.status=W,Ne();try{const U=await Ke(`/tickets/${K}/status`,{status:W});$(`Moved ${U.ticketId} to ${W}`,!1),await ue()}catch(U){$(U.message||"Status update failed",!0),M.status=F,await ue()}}})}function it(){n.querySelectorAll(".btn-delete-card-ticket").forEach(i=>{i.onclick=async s=>{s.stopPropagation(),s.preventDefault();const C=i.dataset.ticketId,I=i.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${I}?`)){i.disabled=!0;try{await Ye(`/tickets/${C}`),$(`Ticket ${I} deleted`,!1),await ue()}catch(K){$(K.message||"Failed to delete ticket",!0),i.disabled=!1}}}}),n.querySelectorAll(".jira-card").forEach(i=>{i.onclick=s=>{if(s.target.tagName==="A"||s.target.closest(".btn-delete-card-ticket"))return;const C=i.dataset.ticketId;tt(C)}})}function nt(){const i=n.querySelector("#btn-jira-refresh");i&&(i.onclick=async()=>{await ue(),$("Board updated",!1)});const s=n.querySelector("#btn-jira-create-ticket");s&&(s.onclick=()=>{j()});const C=n.querySelector("#jira-search-input");let I=null;C&&(C.oninput=c=>{clearTimeout(I),I=setTimeout(async()=>{S.search=c.target.value.trim(),Pe(),await ue()},300)});const K=n.querySelector("#jira-filter-priority");K&&(K.onchange=async c=>{S.priority=c.target.value,Pe(),await ue()});const W=n.querySelector("#jira-filter-category");W&&(W.onchange=async c=>{S.category=c.target.value,Pe(),await ue()});const M=n.querySelector("#jira-filter-job");M&&(M.onchange=async c=>{S.jobId=c.target.value,Pe(),await ue()});const F=n.querySelector("#jira-filter-assignee");F&&(F.onchange=async c=>{S.assigneeId=c.target.value,Pe(),await ue()});const U=n.querySelector("#jira-pill-my-issues");U&&(U.onclick=async()=>{S.myIssuesOnly=!S.myIssuesOnly,U.classList.toggle("active",S.myIssuesOnly),Pe(),await ue()});const v=n.querySelector("#jira-pill-scope-all"),G=n.querySelector("#jira-pill-scope-assigned"),te=n.querySelector("#jira-pill-scope-created"),ae=async c=>{S.scope=c,v&&v.classList.toggle("active",c==="all"),G&&G.classList.toggle("active",c==="assigned"),te&&te.classList.toggle("active",c==="created"),Pe(),await ue()};v&&(v.onclick=()=>ae("all")),G&&(G.onclick=()=>ae("assigned")),te&&(te.onclick=()=>ae("created"));const p=n.querySelector("#jira-clear-filters");p&&(p.onclick=async()=>{S={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},C&&(C.value=""),K&&(K.value="all"),W&&(W.value="all");const c=n.querySelector("#jira-filter-job");c&&(c.value="all"),F&&(F.value="all"),U&&U.classList.remove("active"),v&&v.classList.add("active"),G&&G.classList.remove("active"),te&&te.classList.remove("active"),Pe(),await ue()})}function Pe(){const i=n.querySelector("#jira-clear-filters");if(!i)return;const s=S.search||S.priority!=="all"||S.category!=="all"||S.jobId&&S.jobId!=="all"||S.assigneeId!=="all"||S.myIssuesOnly||S.scope&&S.scope!=="all";i.style.display=s?"inline":"none"}async function ue(){await Be(),Ne()}async function tt(i){const s=n.querySelector("#jira-modals-root");if(s){s.innerHTML=`
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{T=await qe(`/tickets/${i}`)}catch(C){$(C.message||"Could not load ticket",!0),s.innerHTML="";return}he()}}function he(){const i=n.querySelector("#jira-modals-root");if(!i||!T)return;const s=T,C=Ct.find(a=>a.key===s.category)||Ct[0];qt.find(a=>a.key===s.priority)||qt[2];const I=s.subtasks||[],K=I.filter(a=>a.completed).length,W=I.length>0?Math.round(K/I.length*100):0,M=s.attachments||[],F=s.comments||[],U=(s.history||[]).slice().reverse(),v=s.workLogs||[],G=s.linkedTickets||[],te=l?._id||l?.id;s.reporter&&s.reporter.userId&&String(s.reporter.userId)===String(te)||s.userId&&(String(s.userId),String(te));const ae=Array.isArray(s.assignees)&&s.assignees.length>0?s.assignees:s.assignee&&s.assignee.userId?[s.assignee]:[];ae.some(a=>a&&a.userId&&String(a.userId)===String(te));const p=s.jobId?._id?s.jobId._id.toString():s.jobId?s.jobId.toString():"",c=s.jobTitle||s.jobId&&s.jobId.title||"";i.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${C.slug}">${C.icon} ${C.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${y(s.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${y(s.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Description</span>
                  <button type="button" class="jira-tool-btn" id="btn-toggle-desc-edit">
                    ${N?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${N?`
                  <div class="jira-editor-toolbar">
                    <button type="button" class="jira-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="jira-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="jira-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="jira-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${y(s.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${s.description?y(s.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Attachments Section (MP4 & heavy files up to 1GB supported) -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Attachments (${M.length})</span>
                  <label class="btn-jira-secondary" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / MP4 Video (Up to 1GB)</span>
                    <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                  </label>
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${M.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="jira-attachments-grid">
                    ${M.map(a=>{const f=a.type&&a.type.includes("video")||a.name&&a.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||a.url&&a.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="jira-att-card ${f?"is-video":""}" style="${f?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="jira-att-left">
                              <span style="font-size:${f?"16px":"13px"};">${f?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${a.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${y(a.name)}">
                                  ${y(a.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${Ht(a.size)} ${f?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${f?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${a.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${a.url}" download="${y(a.name)}" class="btn-jira-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="jira-att-del btn-del-att" data-att-id="${a.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${f?`
                            <div class="jira-video-slot" id="video-slot-${a.id}" style="display:none;margin-top:6px;width:100%;">
                              <video controls preload="metadata" style="width:100%;max-height:360px;border-radius:6px;background:#000;">
                                <source src="${a.url}" type="${a.type||"video/mp4"}">
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
                  <span>Subtasks (${K}/${I.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${W}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${W}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${I.map(a=>`
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${a.id}" ${a.completed?"checked":""} />
                        <span class="jira-subtask-title ${a.completed?"done":""}">${y(a.title)}</span>
                      </div>
                      <button type="button" class="jira-att-del btn-del-subtask" data-subtask-id="${a.id}" title="Remove subtask">&times;</button>
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
                    ${G.map(a=>`
                      <div class="jira-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${y(a.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${y(a.ticketId)}</span>
                          <span style="font-size:12.5px;color:#f1f5f9;">${y(a.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${y(a.status||"Open")}</span>
                          <button type="button" class="jira-att-del btn-del-link" data-link-id="${a.id}" title="Remove link">&times;</button>
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
                    ${c?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${c?`
                  <div class="jira-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div style="font-weight:700;color:#f8fafc;font-size:13px;">${y(c)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${y(p)}</div>
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
                      ${B.map(a=>`
                        <option value="${a._id}" ${p===a._id.toString()?"selected":""}>
                          📁 ${y(a.title||"Untitled Job")}
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
                    Work Log (${v.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${P==="comments"?`
                  <div class="jira-comments-feed">
                    ${F.map(a=>`
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(a.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${y(a.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${y(a.userRole)})</span></span>
                            <span class="jira-comment-time">${ea(a.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${y(a.content)}</div>
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
                    `:U.map(a=>`
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(a.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${y(a.userName)}</span>
                            <span class="jira-comment-time">${ea(a.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong style="color:#cbd5e1;">${y(a.field)}</strong>:
                            ${a.from?`<span style="text-decoration:line-through;color:#ef4444;">${y(a.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${y(a.to)}</span>
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

                    ${v.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:v.map(a=>`
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(a.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${y(a.userName)} logged <strong style="color:#38bdf8;">${y(a.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${ea(a.loggedAt)}</span>
                          </div>
                          ${a.description?`<div style="font-size:12px;color:#cbd5e1;">${y(a.description)}</div>`:""}
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
                  ${da.map(a=>{let f=s.status||"To Do";return f==="In Progress"?f="Content":f==="Resolved"?f="Under Review":f==="Closed"&&(f="Ready to Leave"),`
                      <option value="${a.key}" ${f===a.key?"selected":""}>
                        ${a.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${qt.map(a=>`
                    <option value="${a.key}" ${s.priority===a.key?"selected":""}>
                      ${a.icon} ${a.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="jira-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="jira-side-lbl" style="margin-bottom:0;">Assigned Personnel (${ae.length})</span>
                  
                    <button type="button" class="jira-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="jira-assigned-chips-wrap">
                  ${ae.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:ae.map(a=>`
                    <div class="jira-assignee-chip">
                      <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(a.avatar||a.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="jira-assignee-chip-name" title="${y(a.name)}">${y(a.name)}</span>
                      ${`
                        <button type="button" class="jira-assignee-chip-remove btn-remove-assignee" data-user-id="${a.userId}" title="Remove ${y(a.name)}">&times;</button>
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
                    ${L.map(a=>{const f=ae.some(g=>g&&g.userId&&String(g.userId)===String(a._id));return`
                        <label class="jira-emp-check-item ${f?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${a._id}" ${f?"checked":""} />
                          <div class="jira-avatar" style="width:18px;height:18px;font-size:9px;">${(a.name||"U").slice(0,1).toUpperCase()}</div>
                          <span style="font-size:12px;color:#f1f5f9;flex:1;">
                            ${y(a.name)} <span style="font-size:10.5px;color:#94a3b8;">(${y(a.role)})</span>
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
                    ${(s.reporter?.name||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${y(s.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${y(s.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${Ct.map(a=>`
                    <option value="${a.key}" ${s.category===a.key?"selected":""}>
                      ${a.icon} ${a.label}
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
                  ${B.map(a=>`
                    <option value="${a._id}" ${p===a._id.toString()?"selected":""}>
                      📁 ${y(a.title||"Untitled Job")}
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
              
                <div style="padding-top:10px;">
                  <button type="button" class="jira-tool-btn" id="btn-delete-ticket" style="color:#ef4444;border-color:rgba(239,68,68,0.4);width:100%;padding:6px;">
                    🗑️ Delete Ticket
                  </button>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    `,b()}function b(){const i=n.querySelector("#jira-modals-root");if(!i||!T)return;const s=i.querySelector("#btn-close-jira-modal");s&&(s.onclick=_);const C=i.querySelector("#jira-detail-backdrop");C&&(C.onclick=E=>{E.target===C&&_()});const I=i.querySelector("#inp-detail-title");I&&(I.onchange=async()=>{const E=I.value.trim();if(E)try{T=await Ke(`/tickets/${T._id}`,{title:E}),await ue()}catch(H){$(H.message||"Failed to update title",!0)}});const K=i.querySelector("#btn-toggle-desc-edit");K&&(K.onclick=()=>{N=!N,he()});const W=i.querySelector("#btn-cancel-desc");W&&(W.onclick=()=>{N=!1,he()});const M=i.querySelector("#btn-save-desc");M&&(M.onclick=async()=>{const E=i.querySelector("#inp-detail-desc")?.value;try{T=await Ke(`/tickets/${T._id}`,{description:E}),N=!1,he(),await ue(),$("Description saved",!1)}catch(H){$(H.message||"Failed to save description",!0)}});const F=i.querySelector("#sel-detail-status");F&&(F.onchange=async E=>{try{const H=await Ke(`/tickets/${T._id}/status`,{status:E.target.value});T=H,he(),await Je(),Ce(),await ue(),$(`Status changed to ${H.status}`,!1)}catch(H){$(H.message||"Status change failed",!0)}});const U=i.querySelector("#sel-detail-priority");U&&(U.onchange=async E=>{try{T=await Ke(`/tickets/${T._id}`,{priority:E.target.value}),he(),await ue()}catch(H){$(H.message,!0)}});const v=i.querySelector("#btn-toggle-assignee-picker"),G=i.querySelector("#jira-detail-assignee-box"),te=i.querySelector("#btn-close-detail-assignee-box"),ae=i.querySelector("#btn-save-detail-assignees");v&&G&&(v.onclick=()=>{const E=G.style.display==="none";G.style.display=E?"block":"none"}),te&&G&&(te.onclick=()=>{G.style.display="none"}),i.querySelectorAll(".chk-detail-emp").forEach(E=>{E.onchange=()=>{E.closest(".jira-emp-check-item")?.classList.toggle("selected",E.checked)}}),ae&&(ae.onclick=async()=>{const E=Array.from(i.querySelectorAll(".chk-detail-emp:checked")).map(H=>H.value);try{ae.disabled=!0,T=await Ke(`/tickets/${T._id}`,{assigneeIds:E}),he(),await ue(),$("Assignees updated!",!1)}catch(H){$(H.message,!0),ae.disabled=!1}}),i.querySelectorAll(".btn-remove-assignee").forEach(E=>{E.onclick=async()=>{const H=E.dataset.userId,De=(Array.isArray(T.assignees)&&T.assignees.length>0?T.assignees:T.assignee?.userId?[T.assignee]:[]).filter(we=>we&&we.userId&&String(we.userId)!==String(H)).map(we=>String(we.userId));try{T=await Ke(`/tickets/${T._id}`,{assigneeIds:De}),he(),await ue(),$("Assignee removed",!1)}catch(we){$(we.message,!0)}}});const p=i.querySelector("#sel-detail-category");p&&(p.onchange=async E=>{try{T=await Ke(`/tickets/${T._id}`,{category:E.target.value}),he(),await ue()}catch(H){$(H.message,!0)}});const c=i.querySelector("#inp-detail-duedate");c&&(c.onchange=async E=>{try{T=await Ke(`/tickets/${T._id}`,{dueDate:E.target.value||null}),he(),await ue()}catch(H){$(H.message,!0)}});const a=i.querySelector("#sel-detail-job");a&&(a.onchange=async E=>{try{T=await Ke(`/tickets/${T._id}`,{jobId:E.target.value||null}),he(),await ue(),$(E.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(H){$(H.message,!0)}});const f=i.querySelector("#btn-toggle-job-link"),g=i.querySelector("#jira-job-link-box");f&&g&&(f.onclick=()=>{g.style.display=g.style.display==="none"?"block":"none"});const A=i.querySelector("#btn-cancel-job-link");A&&g&&(A.onclick=()=>{g.style.display="none"});const x=i.querySelector("#btn-save-job-link");x&&(x.onclick=async()=>{const E=i.querySelector("#inp-modal-job-select")?.value||null;try{T=await Ke(`/tickets/${T._id}`,{jobId:E}),he(),await ue(),$(E?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(H){$(H.message,!0)}});const D=i.querySelector("#btn-unlink-job");D&&(D.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{T=await Ke(`/tickets/${T._id}`,{jobId:null}),he(),await ue(),$("Job unlinked",!1)}catch(E){$(E.message,!0)}});const oe=i.querySelector("#inp-detail-esthours");oe&&(oe.onchange=async E=>{try{T=await Ke(`/tickets/${T._id}`,{estimatedHours:Number(E.target.value)||0})}catch(H){$(H.message,!0)}}),i.querySelectorAll(".cb-subtask-toggle").forEach(E=>{E.onchange=async()=>{const H=E.dataset.subtaskId;try{T=await Ke(`/tickets/${T._id}/subtasks/${H}`,{completed:E.checked}),he(),await ue()}catch(ce){$(ce.message,!0)}}}),i.querySelectorAll(".btn-del-subtask").forEach(E=>{E.onclick=async()=>{const H=E.dataset.subtaskId;try{T=await Ye(`/tickets/${T._id}/subtasks/${H}`),he(),await ue()}catch(ce){$(ce.message,!0)}}});const R=i.querySelector("#inp-new-subtask"),q=i.querySelector("#btn-add-subtask"),ie=async()=>{const E=R?.value.trim();if(E)try{T=await ke(`/tickets/${T._id}/subtasks`,{title:E}),he(),await ue()}catch(H){$(H.message,!0)}};q&&(q.onclick=ie),R&&(R.onkeydown=E=>{E.key==="Enter"&&(E.preventDefault(),ie())});const Y=i.querySelector("#inp-detail-att-upload"),Q=i.querySelector("#detail-att-upload-progress");Y&&(Y.onchange=async E=>{const H=Array.from(E.target.files);if(!H.length)return;const ce=[];Q&&(Q.style.display="block");for(let De=0;De<H.length;De++){const we=H[De];Q&&(Q.innerHTML=`
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
                <span>Uploading <strong>${y(we.name)}</strong> (${Ht(we.size)})...</span>
                <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
              </div>
              <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
                <div id="att-prog-bar" style="width:0%;height:100%;background:#38bdf8;transition:width 0.15s ease;"></div>
              </div>
            `);try{const Qe=await ua(we,vt=>{const Tt=i.querySelector("#att-prog-pct"),jt=i.querySelector("#att-prog-bar");Tt&&(Tt.textContent=`${vt}%`),jt&&(jt.style.width=`${vt}%`)});Qe&&ce.push({name:Qe.name||we.name,url:Qe.url,size:Qe.size||we.size,type:Qe.type||we.type||"video/mp4"})}catch(Qe){console.error("Upload error for file:",we.name,Qe),$(`Upload failed for ${we.name}: ${Qe.message}`,!0)}}if(Q&&(Q.style.display="none"),ce.length)try{T=await ke(`/tickets/${T._id}/attachments`,{attachments:ce}),he(),$(`Successfully attached ${ce.length} file(s)! 🎥`,!1)}catch(De){$(De.message||"Failed to attach file(s)",!0)}}),i.querySelectorAll(".btn-play-att-video").forEach(E=>{E.onclick=()=>{const H=E.dataset.slot,ce=i.querySelector("#"+H);if(ce){const De=ce.style.display==="none";ce.style.display=De?"block":"none",E.textContent=De?"⏸ Close Video":"▶ Play Video";const we=ce.querySelector("video");we&&De?we.play().catch(()=>{}):we&&we.pause()}}}),i.querySelectorAll(".btn-del-att").forEach(E=>{E.onclick=async()=>{const H=E.dataset.attId;try{T=await Ye(`/tickets/${T._id}/attachments/${H}`),he()}catch(ce){$(ce.message,!0)}}}),i.querySelectorAll(".jira-act-tab").forEach(E=>{E.onclick=()=>{P=E.dataset.actTab,he()}});const Z=i.querySelector("#inp-new-comment"),V=i.querySelector("#btn-submit-comment");V&&Z&&(V.onclick=async()=>{const E=Z.value.trim();if(E)try{V.disabled=!0,V.textContent="Saving...",T=await ke(`/tickets/${T._id}/comments`,{content:E}),he(),$("Comment added",!1)}catch(H){$(H.message||"Failed to add comment",!0)}finally{V.disabled=!1}});const re=i.querySelector("#btn-open-link-dialog"),se=i.querySelector("#jira-link-box"),fe=i.querySelector("#btn-cancel-link"),_e=i.querySelector("#btn-submit-link"),Me=i.querySelector("#inp-link-target"),pe=i.querySelector("#sel-link-rel");re&&se&&(re.onclick=()=>{se.style.display="block"}),fe&&se&&(fe.onclick=()=>{se.style.display="none"}),_e&&se&&(_e.onclick=async()=>{const E=Me?.value.trim(),H=pe?.value||"relates to";if(E)try{_e.disabled=!0,T=await ke(`/tickets/${T._id}/links`,{targetTicketId:E,relationship:H}),he(),$(`Linked with ${E}`,!1)}catch(ce){$(ce.message||"Failed to link ticket",!0)}finally{_e.disabled=!1}}),i.querySelectorAll(".btn-del-link").forEach(E=>{E.onclick=async()=>{const H=E.dataset.linkId;try{T=await Ye(`/tickets/${T._id}/links/${H}`),he()}catch(ce){$(ce.message,!0)}}});const $e=i.querySelector("#btn-open-worklog-dialog"),Ie=i.querySelector("#jira-worklog-box"),Oe=i.querySelector("#btn-cancel-worklog"),Se=i.querySelector("#btn-submit-worklog"),Te=i.querySelector("#inp-worklog-time"),ye=i.querySelector("#inp-worklog-desc");$e&&Ie&&($e.onclick=()=>{Ie.style.display="block"}),Oe&&Ie&&(Oe.onclick=()=>{Ie.style.display="none"}),Se&&Ie&&(Se.onclick=async()=>{const E=Te?.value.trim(),H=ye?.value.trim();if(!E){$("Enter time spent (e.g. 2h 30m)",!0);return}try{Se.disabled=!0,T=await ke(`/tickets/${T._id}/worklogs`,{timeSpent:E,description:H}),he(),$("Work logged",!1)}catch(ce){$(ce.message||"Failed to log work",!0)}finally{Se.disabled=!1}});const me=i.querySelector("#btn-delete-ticket");me&&(me.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${T.ticketId}?`))try{me.disabled=!0,await Ye(`/tickets/${T._id}`),$(`Ticket ${T.ticketId} deleted`,!1),_(),await Je(),Ce(),await ue()}catch(E){$(E.message||"Failed to delete ticket",!0),me.disabled=!1}})}function _(){T=null,N=!1;const i=n.querySelector("#jira-modals-root");i&&(i.innerHTML="")}function j(i=null){const s=n.querySelector("#jira-modals-root");if(!s)return;const C=i||(S.jobId&&S.jobId!=="all"?S.jobId:null);s.innerHTML=`
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
                  ${L.map(g=>{const A=l&&String(l._id||l.id)===String(g._id);return`
                      <label class="jira-emp-check-item ${A?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${g._id}" ${A?"checked":""} />
                        <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(g.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span style="font-size:12px;color:#f1f5f9;flex:1;">
                          ${y(g.name)} <span style="font-size:10.5px;color:#94a3b8;">(${y(g.role)})${A?" — (You)":""}</span>
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
                  ${B.map(g=>`
                    <option value="${g._id}" ${C&&String(C)===String(g._id)?"selected":""}>
                      📁 ${y(g.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>
            </div>

            <!-- Attachments & MP4 Video Uploader (Up to 1GB) -->
            <div class="jira-form-group" style="margin-top:14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="jira-form-label" style="margin:0;">Attachments &amp; MP4 Videos (Up to 1GB)</label>
                <span id="create-att-count" style="font-size:11px;color:#94a3b8;">0 files attached</span>
              </div>
              <label class="jira-att-dropzone" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px;border:1px dashed #334155;border-radius:8px;background:#0b1120;cursor:pointer;transition:border-color 0.2s;">
                <div style="font-size:18px;">🎥 📁</div>
                <div style="font-size:12px;font-weight:600;color:#e2e8f0;">Click or drag &amp; drop MP4 videos, recordings or files here</div>
                <div style="font-size:10.5px;color:#64748b;">Supports MP4, MOV, WebM, screenshots, PDFs, logs (Heavy files up to 1GB supported)</div>
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
    `;const I=()=>{s.querySelectorAll(".jira-emp-check-item").forEach(g=>{const A=g.querySelector(".chk-create-emp");g.classList.toggle("selected",!!A?.checked)})};s.querySelectorAll(".chk-create-emp").forEach(g=>{g.onchange=I});const K=s.querySelector("#btn-create-assign-self");K&&l&&(K.onclick=()=>{const g=String(l._id||l.id);s.querySelectorAll(".chk-create-emp").forEach(A=>{A.value===g&&(A.checked=!0)}),I()});const W=s.querySelector("#btn-create-clear-assign");W&&(W.onclick=()=>{s.querySelectorAll(".chk-create-emp").forEach(g=>{g.checked=!1}),I()});const M=[],F=s.querySelector("#inp-create-ticket-att"),U=s.querySelector("#create-att-list"),v=s.querySelector("#create-att-count"),G=s.querySelector("#create-att-progress"),te=()=>{v&&(v.textContent=`${M.length} file(s) attached`),U&&(U.innerHTML=M.map((g,A)=>{const x=g.type&&g.type.includes("video")||g.name&&g.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="jira-att-card">
            <div class="jira-att-left">
              <span>${x?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="jira-att-name" title="${y(g.name)}">${y(g.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${Ht(g.size)} ${x?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="jira-att-del btn-del-pending-att" data-idx="${A}" title="Remove">&times;</button>
          </div>
        `}).join(""),U.querySelectorAll(".btn-del-pending-att").forEach(g=>{g.onclick=()=>{M.splice(Number(g.dataset.idx),1),te()}}))};F&&(F.onchange=async g=>{const A=Array.from(g.target.files);if(A.length){G&&(G.style.display="block");for(const x of A){G&&(G.innerHTML=`
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
                <span>Uploading <strong>${y(x.name)}</strong> (${Ht(x.size)})...</span>
                <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
              </div>
              <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
                <div id="create-prog-bar" style="width:0%;height:100%;background:#38bdf8;transition:width 0.15s ease;"></div>
              </div>
            `);try{const D=await ua(x,oe=>{const R=s.querySelector("#create-prog-pct"),q=s.querySelector("#create-prog-bar");R&&(R.textContent=`${oe}%`),q&&(q.style.width=`${oe}%`)});D&&(M.push({name:D.name||x.name,url:D.url,size:D.size||x.size,type:D.type||x.type||"video/mp4"}),te())}catch(D){$(`Failed to upload ${x.name}: ${D.message}`,!0)}}G&&(G.style.display="none"),F.value=""}});const ae=()=>{s.innerHTML=""},p=s.querySelector("#btn-close-create-modal");p&&(p.onclick=ae);const c=s.querySelector("#btn-cancel-create-ticket");c&&(c.onclick=ae);const a=s.querySelector("#jira-create-backdrop");a&&(a.onclick=g=>{g.target===a&&ae()});const f=s.querySelector("#btn-submit-create-ticket");f&&(f.onclick=async()=>{const g=s.querySelector("#create-ticket-title")?.value.trim(),A=s.querySelector("#create-ticket-desc")?.value.trim(),x=s.querySelector("#create-ticket-cat")?.value||"Task",D=s.querySelector("#create-ticket-pri")?.value||"Medium",R=Array.from(s.querySelectorAll(".chk-create-emp:checked")).map(Y=>Y.value),q=s.querySelector("#create-ticket-duedate")?.value||null,ie=s.querySelector("#create-ticket-job")?.value||null;if(!g){$("Ticket summary / title is required",!0);return}try{f.disabled=!0,f.textContent="Creating...";const Y=await ke("/tickets",{title:g,description:A,category:x,priority:D,assigneeIds:R,assigneeId:R[0]||null,dueDate:q,jobId:ie,attachments:M});$(`Ticket ${Y.ticketId} created! 🎫`,!1),ae(),await Je(),Ce(),await ue(),tt(Y._id)}catch(Y){$(Y.message||"Could not create ticket",!0),f.disabled=!1,f.textContent="Create Ticket 🚀"}})}n._openCreateTicketModal=j,n._openTicketDetailModal=tt,n._setJobFilter=async i=>{S.jobId=i||"all";const s=n.querySelector("#jira-filter-job");s&&(s.value=S.jobId),Pe(),await ue()}}export{Xa as a,Qa as b,Ja as i};
