import{c as Me,h as $,e as x,n as Ge,j as Ve,o as Ot,k as Wt,g as ke,p as Ft,t as ea,u as ua}from"./api-D7P-iGMH.js";const ga={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function ka(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},ga,JSON.parse(i))}catch{}return Object.assign({},ga)}function wa(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function at(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),d=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${d}`}function Ut(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const d=e.getFullYear(),c=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${d}-${c}-${s}`}function wt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function bt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ba(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function ta(i,t=1){const e=new Date(i+"T00:00:00"),d=e.getDay(),c=(d<t?7:0)+d-t,s=new Date(e);s.setDate(e.getDate()-c);const f=[];for(let n=0;n<7;n++){const q=new Date(s);q.setDate(s.getDate()+n);const R=q.getFullYear(),S=String(q.getMonth()+1).padStart(2,"0"),j=String(q.getDate()).padStart(2,"0");f.push(`${R}-${S}-${j}`)}return f}function $a(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,d=t.createOscillator(),c=t.createGain();d.type="sine",d.frequency.setValueAtTime(523.25,e),d.frequency.exponentialRampToValueAtTime(783.99,e+.15),c.gain.setValueAtTime(.2,e),c.gain.exponentialRampToValueAtTime(.001,e+.35),d.connect(c),c.connect(t.destination),d.start(e),d.stop(e+.35)}catch{}}function Ja(i,t={}){const{userRole:e="employee",currentUser:d=null,onNavigate:c=null}=t,s=e==="superadmin"||e==="admin";let f=ka(),n={selectedDate:at(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Sa(),q();async function q(){n.loading=!0,R();try{const b=[Me("/tasks")];s&&b.push(Me("/personnel").catch(()=>[]));const[T,I]=await Promise.all(b);n.tasks=Array.isArray(T)?T:[],I&&(n.personnelList=Array.isArray(I)?I:[])}catch(b){$("Failed to load planner tasks: "+b.message,!0)}finally{n.loading=!1,B()}}function R(){i.innerHTML=`
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
    `}function S(b){return n.tasks.filter(T=>{if(T.isDeleted===!0)return!1;if(s&&n.selectedPersonnelId!=="all"){const a=T.personnelId?._id||T.personnelId;if(String(a)!==String(n.selectedPersonnelId))return!1}const I=T.dateStr||(T.dueDate?new Date(T.dueDate).toISOString().slice(0,10):"");return I?I===b:b===at()})}function j(b,T){if(b.status==="Completed")return!1;const I=b.dateStr||(b.dueDate?new Date(b.dueDate).toISOString().slice(0,10):"");return I?I<T:!1}function P(b,T){const I=b.length,a=b.filter(G=>G.status==="Completed").length,r=b.filter(G=>G.status==="In Progress").length,_=b.filter(G=>G.status==="Pending"||G.status==="Todo").length,A=b.filter(G=>j(G,T)).length,V=I>0?Math.round(a/I*100):0;return{total:I,completed:a,inProgress:r,pending:_,overdue:A,percent:V}}function B(){const b=at(),T=n.selectedDate===b,I=S(n.selectedDate),a=P(I,b);i.innerHTML=`
      <div class="ci360-planner-wrap ${f.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${bt(n.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${x(f.displayName||"Daily Planner")}</h1>
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
              <span class="date-text" id="displayDateLabel">${wt(n.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${n.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${T?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${s?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${n.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${n.personnelList.map(r=>`
                  <option value="${r._id}" ${n.selectedPersonnelId===String(r._id)?"selected":""}>
                    ${x(r.name)} (${x(r.department||r.role||"Team")})
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
          ${ce(I,a)}
        </main>

      </div>
    `,we(),ct()}function ce(b,T){return n.viewMode==="weekly"?dt():n.viewMode==="report"?vt():me(b,T)}function me(b,T){const I=at();let a=b;if(n.filterStatus==="pending"?a=a.filter(r=>r.status==="Pending"||r.status==="Todo"):n.filterStatus==="in_progress"?a=a.filter(r=>r.status==="In Progress"):n.filterStatus==="completed"?a=a.filter(r=>r.status==="Completed"):n.filterStatus==="overdue"&&(a=a.filter(r=>j(r,I))),n.searchQuery){const r=n.searchQuery.toLowerCase();a=a.filter(_=>(_.title||"").toLowerCase().includes(r)||(_.description||"").toLowerCase().includes(r)||(_.category||"").toLowerCase().includes(r))}return a.sort((r,_)=>{if(r.status==="Completed"&&_.status!=="Completed")return 1;if(r.status!=="Completed"&&_.status==="Completed")return-1;const A={Urgent:0,High:1,Medium:2,Low:3};return(A[r.priority]||2)-(A[_.priority]||2)}),`
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
              <button type="button" class="filter-pill ${n.filterStatus==="all"?"active":""}" data-f="all">All (${T.total})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${T.pending})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${T.inProgress})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${T.completed})</button>
              ${T.overdue>0?`
                <button type="button" class="filter-pill overdue ${n.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${T.overdue})</button>
              `:""}
            </div>

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${x(n.searchQuery)}">
              ${n.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card / Past Date Locked Banner -->
        ${n.selectedDate<I?`
          <div class="ci360-past-date-banner" style="display:flex;align-items:center;gap:10px;padding:12px 18px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.22);border-radius:10px;font-size:12.5px;color:#f87171;margin-bottom:16px;box-sizing:border-box;">
            <span style="font-size:16px;">🔒</span>
            <span><strong>Date Passed:</strong> Tasks cannot be added or edited for <strong>${wt(n.selectedDate)}</strong> because this date has already passed.</span>
          </div>
        `:`
          <div class="ci360-quick-add-bar">
            <div class="ci360-quick-add-input-wrap">
              <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${bt(n.selectedDate)}... (Press Enter to save)">
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
          ${a.length===0?qe():`
            <div class="ci360-task-list">
              ${a.map(r=>Ye(r,I)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function qe(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${bt(n.selectedDate)}</h3>
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
    `}function Ye(b,T){const I=b.status==="Completed",a=j(b,T),r=b.dateStr||(b.dueDate?new Date(b.dueDate).toISOString().slice(0,10):T),_=!s&&r<T,A=`pri-${(b.priority||"medium").toLowerCase()}`,V=`status-${(b.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${I?"is-completed":""} ${a?"is-overdue":""}" data-id="${b._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${I?"checked":""}" data-action="toggle" data-id="${b._id}" title="${I?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${x(b.title)}</span>
          </div>

          ${b.description?`
            <div class="ci360-task-desc">${x(b.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${A}">
              <span class="badge-dot"></span>
              ${x(b.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${V}">
              ${x(b.status||"Pending")}
            </span>

            <!-- Category -->
            ${b.category?`
              <span class="ci360-badge category-badge">
                #${x(b.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${b.startTime||b.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${b.startTime?x(b.startTime):""}
                   ${b.startTime&&b.dueTime?"–":""}
                   ${b.dueTime?x(b.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${a?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${s&&(b.personnelId?.name||b.userId?.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${x(b.personnelId?.name||b.userId?.name)}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          ${_?`
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
    `}function dt(){const b=ta(n.selectedDate,f.weekStartsOn),T=bt(b[0]),I=bt(b[6]),a=at();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${T} – ${I}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${b.map(r=>{const _=r===a,A=r===n.selectedDate,V=S(r),G=P(V,a);return`
              <div class="ci360-day-column ${_?"is-today":""} ${A?"is-selected":""}" data-date="${r}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${r}">
                  <div class="day-name">${ba(r)}</div>
                  <div class="day-number">${new Date(r+"T00:00:00").getDate()}</div>
                  ${_?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${G.completed}/${G.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${G.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${V.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:V.map(M=>`
                    <div class="ci360-mini-task-card ${M.status==="Completed"?"done":""}" data-id="${M._id}">
                      <button type="button" class="mini-check ${M.status==="Completed"?"checked":""}" data-action="toggle" data-id="${M._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${M._id}">
                        <div class="mini-title">${x(M.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(M.priority||"medium").toLowerCase()}">${M.priority||"Med"}</span>
                          ${M.dueTime?`<span class="mini-time">${x(M.dueTime)}</span>`:""}
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
    `}function vt(){const b=ta(n.selectedDate,f.weekStartsOn),T=wt(b[0]),I=wt(b[6]),a=at(),r=n.tasks.filter(U=>{if(U.isDeleted===!0)return!1;const F=U.dateStr||(U.dueDate?new Date(U.dueDate).toISOString().slice(0,10):"");return b.includes(F)}),_=r.length,A=r.filter(U=>U.status==="Completed").length,V=r.filter(U=>U.status==="In Progress").length,G=_>0?Math.round(A/_*100):0,M={Urgent:0,High:0,Medium:0,Low:0};return r.forEach(U=>{const F=U.priority||"Medium";M[F]!==void 0&&M[F]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${T} – ${I}</div>
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
            <span class="value" style="font-size:28px">${_}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${A}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${V}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${G}%</span>
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
                ${b.map(U=>{const F=S(U),v=P(F,a);return`
                    <tr>
                      <td><strong>${ba(U)}</strong></td>
                      <td>${bt(U)}</td>
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
    `}function we(){const b=document.getElementById("btnViewDaily"),T=document.getElementById("btnViewWeekly"),I=document.getElementById("btnViewReport");b&&(b.onclick=()=>{n.viewMode="daily",B()}),T&&(T.onclick=()=>{n.viewMode="weekly",B()}),I&&(I.onclick=()=>{n.viewMode="report",B()});const a=document.getElementById("btnPrevDay"),r=document.getElementById("btnNextDay"),_=document.getElementById("btnJumpToday"),A=document.getElementById("hiddenDateInput"),V=document.getElementById("datePickerBadge");a&&(a.onclick=()=>{n.selectedDate=Ut(n.selectedDate,-1),B()}),r&&(r.onclick=()=>{n.selectedDate=Ut(n.selectedDate,1),B()}),_&&(_.onclick=()=>{n.selectedDate=at(),B()}),V&&A&&(V.onclick=()=>{try{typeof A.showPicker=="function"?A.showPicker():A.focus()}catch{A.focus()}},A.onchange=l=>{l.target.value&&(n.selectedDate=l.target.value,B())});const G=document.getElementById("admTeamSelect");G&&(G.onchange=l=>{n.selectedPersonnelId=l.target.value,B()});const M=document.getElementById("btnOpenAddTaskModal");M&&(M.onclick=()=>_e());const U=document.getElementById("btnPlannerActionsMenu"),F=document.getElementById("plannerActionsDropdown");U&&F&&(U.onclick=l=>{l.stopPropagation(),F.classList.toggle("hidden")},document.addEventListener("click",l=>{!F.contains(l.target)&&l.target!==U&&F.classList.add("hidden")}));const v=document.getElementById("btnActionImport");v&&(v.onclick=()=>{F?.classList.add("hidden"),it()});const H=document.getElementById("btnActionExportPng");H&&(H.onclick=()=>{F?.classList.add("hidden"),nt()});const X=document.getElementById("btnActionExportPdf");X&&(X.onclick=()=>{F?.classList.add("hidden"),de()});const p=document.getElementById("btnActionBackup");p&&(p.onclick=()=>{F?.classList.add("hidden"),et()});const u=document.getElementById("btnActionSettings");u&&(u.onclick=()=>{F?.classList.add("hidden"),be()})}function ct(b){if(n.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(M=>{M.onclick=()=>{n.filterStatus=M.dataset.f,B()}});const T=document.getElementById("plannerTaskSearchInp");T&&(T.oninput=M=>{n.searchQuery=M.target.value,B()});const I=document.getElementById("btnClearSearch");I&&(I.onclick=()=>{n.searchQuery="",B()});const a=document.getElementById("quickAddTitleInp"),r=document.getElementById("quickAddPriority"),_=document.getElementById("quickAddCategory"),A=document.getElementById("btnQuickAddSubmit"),V=async()=>{const M=(a?.value||"").trim();if(!M){$("Please enter a task title",!0),a?.focus();return}try{const U={title:M,dateStr:n.selectedDate,priority:r?.value||f.defaultPriority,category:_?.value||"General",status:"Pending"};s&&n.selectedPersonnelId!=="all"&&(U.personnelId=n.selectedPersonnelId);const F=await ke("/tasks",U);n.tasks.unshift(F),$("Task added to today's focus! ✨"),a&&(a.value="",a.focus()),B()}catch(U){$(U.message,!0)}};A&&(A.onclick=V),a&&(a.onkeydown=M=>{M.key==="Enter"&&V()});const G=document.getElementById("btnEmptyStateImport");G&&(G.onclick=()=>it())}if(n.viewMode==="weekly"){const T=document.getElementById("btnPrevWeek"),I=document.getElementById("btnNextWeek"),a=document.getElementById("btnThisWeek");T&&(T.onclick=()=>{n.selectedDate=Ut(n.selectedDate,-7),B()}),I&&(I.onclick=()=>{n.selectedDate=Ut(n.selectedDate,7),B()}),a&&(a.onclick=()=>{n.selectedDate=at(),B()}),document.querySelectorAll(".day-col-header").forEach(r=>{r.onclick=()=>{n.selectedDate=r.dataset.date,n.viewMode="daily",B()}}),document.querySelectorAll('[data-action="add-day"]').forEach(r=>{r.onclick=()=>{_e(null,r.dataset.date)}})}if(n.viewMode==="report"){const T=document.getElementById("btnDownloadWeeklyPdf");T&&(T.onclick=de)}i.querySelectorAll('[data-action="toggle"]').forEach(T=>{T.onclick=async I=>{I.stopPropagation();const a=T.dataset.id;await Fe(a)}}),i.querySelectorAll('[data-action="edit"]').forEach(T=>{T.onclick=I=>{I.stopPropagation();const a=T.dataset.id,r=n.tasks.find(_=>_._id===a);r&&_e(r)}}),i.querySelectorAll('[data-action="delete"]').forEach(T=>{T.onclick=async I=>{I.stopPropagation();const a=T.dataset.id;await pt(a)}})}async function Fe(b){const T=n.tasks.find(a=>a._id===b);if(!T)return;const I=T.status!=="Completed";try{const a=await Ge(`/tasks/${b}/toggle`,{}),r=n.tasks.findIndex(_=>_._id===b);r!==-1&&(n.tasks[r]=a),I?(f.soundEnabled&&$a(),$("Task marked as completed! 🎉")):$("Task reopened as pending."),B()}catch(a){$(a.message,!0)}}async function pt(b){const T=n.tasks.find(I=>I._id===b);if(T&&confirm(`Are you sure you want to remove "${T.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Ve(`/tasks/${b}`),n.tasks=n.tasks.filter(I=>I._id!==b),$("Task removed from planner (safely stored in database archive)"),B()}catch(I){$(I.message,!0)}}function _e(b=null,T=null){const I=!!b,a=b?b.dateStr||(b.dueDate?new Date(b.dueDate).toISOString().slice(0,10):n.selectedDate):T||n.selectedDate,r=at();if(!s&&a<r){$("Tasks cannot be added or edited after the date is gone.",!0);return}const _=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${I?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${x(b?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${x(b?.description||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${a}" required>
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
                <option value="Medium" ${!b&&f.defaultPriority==="Medium"||b?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!b&&f.defaultPriority==="High"||b?.priority==="High"?"selected":""}>High</option>
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
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${x(b?.category||"General")}">
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
          ${s?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!b||b?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${n.personnelList.map(v=>{const H=b?.personnelId?._id===v._id||b?.personnelId===v._id;return`<option value="${v._id}" ${H?"selected":""}>${x(v.name)} (${x(v.department||v.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${I&&(s||a>=r)?`
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
    `,A=Ot(_),V=A.querySelector("#taskForm"),G=A.querySelector("#btnModalClose"),M=A.querySelector("#btnCancelModal"),U=A.querySelector("#btnModalDeleteTask"),F=()=>A.remove();G&&(G.onclick=F),M&&(M.onclick=F),U&&b&&(U.onclick=async()=>{F(),await pt(b._id)}),V.onsubmit=async v=>{v.preventDefault();const H=A.querySelector("#taskTitle").value.trim(),X=A.querySelector("#taskDesc").value.trim(),p=A.querySelector("#taskDate").value,u=A.querySelector("#taskStartTime").value.trim(),l=A.querySelector("#taskDueTime").value.trim(),o=A.querySelector("#taskPriority").value,m=A.querySelector("#taskStatus").value,w=A.querySelector("#taskCategory").value.trim()||"General";if(!H){$("Task title is required",!0);return}const C={title:H,description:X,dateStr:p,startTime:u,dueTime:l,priority:o,status:m,category:w};if(s){const L=A.querySelector("#taskAssignee")?.value;L==="all"?(C.assignAll=!0,C.personnelId="all"):L&&(C.personnelId=L)}const N=A.querySelector("#btnSaveTask");N.disabled=!0,N.textContent="Saving...";try{if(I){const L=await Wt(`/tasks/${b._id}`,C),te=n.tasks.findIndex(E=>E._id===b._id);te!==-1&&(n.tasks[te]=L),$("Task updated successfully! ✍️")}else{const L=await ke("/tasks",C);Array.isArray(L.tasks)?L.tasks.forEach(te=>n.tasks.unshift(te)):n.tasks.unshift(L),$("Task created successfully! ✨")}F(),B()}catch(L){$(L.message,!0),N.disabled=!1,N.textContent=I?"Save Changes":"Create Task"}}}function it(){let b=[];const T=`
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
    `,I=Ot(T),a=()=>I.remove();I.querySelector("#btnImportClose").onclick=a,I.querySelector("#btnCancelImport").onclick=a;const r=I.querySelector("#importTextarea"),_=I.querySelector("#importFileInput"),A=I.querySelector("#importDropzone"),V=I.querySelector("#previewListArea"),G=I.querySelector("#previewCountLabel"),M=I.querySelector("#btnConfirmImport"),U=I.querySelector("#importFileInfo");function F(H){if(!H)return[];const X=H.split(/\r?\n/),p=[];for(let u of X)u=u.trim(),u&&(u=u.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),u=u.replace(/^[-*•]\s+/,""),u=u.replace(/^\d+[\.\)]\s+/,""),u=u.trim(),u&&p.push(u));return p}function v(){const H=r.value,X=F(H),p=I.querySelector("#importTargetDate").value,u=S(p),l=new Set(u.map(o=>(o.title||"").trim().toLowerCase()));b=[];for(const o of X){const m=l.has(o.toLowerCase());b.push({title:o,isDuplicate:m})}if(G.textContent=`Preview (${b.length} ${b.length===1?"task":"tasks"} found)`,M.disabled=b.length===0,M.textContent=`Import ${b.length} ${b.length===1?"Task":"Tasks"}`,b.length===0){V.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}V.innerHTML=b.map((o,m)=>`
        <div class="preview-item ${o.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${m+1}.</span>
          <span class="preview-title">${x(o.title)}</span>
          ${o.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}r.oninput=v,A.onclick=()=>_.click(),_.onchange=H=>{const X=H.target.files[0];if(!X)return;U.textContent=`File selected: ${X.name} (${Math.round(X.size/1024)} KB)`;const p=new FileReader;p.onload=u=>{r.value=u.target.result,v()},p.readAsText(X)},A.ondragover=H=>{H.preventDefault(),A.classList.add("dragover")},A.ondragleave=()=>A.classList.remove("dragover"),A.ondrop=H=>{H.preventDefault(),A.classList.remove("dragover");const X=H.dataTransfer.files[0];if(X&&(X.type==="text/plain"||X.name.endsWith(".txt"))){U.textContent=`File dropped: ${X.name}`;const p=new FileReader;p.onload=u=>{r.value=u.target.result,v()},p.readAsText(X)}else $("Please drop a valid .txt plain-text file",!0)},M.onclick=async()=>{if(b.length===0)return;M.disabled=!0,M.textContent="Importing...";const H=I.querySelector("#importTargetDate").value,X=I.querySelector("#importPriority").value,p=I.querySelector("#importCategory").value.trim()||"General",u={date:H,tasks:b.map(l=>({title:l.title,priority:X,category:p,status:"Pending"}))};s&&n.selectedPersonnelId!=="all"&&(u.personnelId=n.selectedPersonnelId);try{const l=await ke("/tasks/bulk-import",u);Array.isArray(l.tasks)&&l.tasks.forEach(o=>n.tasks.unshift(o)),$(`Imported ${l.importedCount} tasks successfully! (${l.skippedCount} skipped duplicates)`),a(),n.selectedDate=H,B()}catch(l){$(l.message,!0),M.disabled=!1,M.textContent="Retry Import"}}}async function nt(){const b=S(n.selectedDate),T=P(b,at()),I=wt(n.selectedDate),a=2,r=800,_=160,A=90,V=65,G=70,M=Math.max(120,b.length*V),U=_+A+M+G,F=document.createElement("canvas");F.width=r*a,F.height=U*a;const v=F.getContext("2d");v.scale(a,a);const H=document.documentElement.getAttribute("data-theme")==="dark",X=H?"#0F172A":"#F8FAFC",p=H?"#1E293B":"#FFFFFF",u=H?"#334155":"#E2E8F0",l=H?"#F8FAFC":"#0F172A",o=H?"#94A3B8":"#475569",m="#4F46E5",w="#10B981",C="#F59E0B";v.fillStyle=X,v.fillRect(0,0,r,U),v.fillStyle=p,je(v,24,20,r-48,_-30,16),v.fill(),v.strokeStyle=u,v.lineWidth=1,v.stroke(),v.fillStyle=m,v.font="bold 12px Inter, sans-serif",v.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),v.fillStyle=l,v.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',v.fillText(I,44,86),v.fillStyle=o,v.font="13px Inter, sans-serif",v.fillText(`Planned focus list · ${T.completed} of ${T.total} tasks completed (${T.percent}%)`,44,114);const N=_+6;v.fillStyle=p,je(v,24,N,r-48,A-16,12),v.fill(),v.stroke();const L=[{label:"TOTAL TASKS",val:String(T.total),color:l},{label:"COMPLETED",val:String(T.completed),color:w},{label:"IN PROGRESS",val:String(T.inProgress),color:C},{label:"PENDING",val:String(T.pending),color:o},{label:"PROGRESS",val:`${T.percent}%`,color:m}],te=(r-48)/L.length;L.forEach((J,Q)=>{const W=24+Q*te+20;v.fillStyle=J.color,v.font="bold 20px Inter, sans-serif",v.fillText(J.val,W,N+36),v.fillStyle=o,v.font="10px Inter, sans-serif",v.fillText(J.label,W,N+54)});const E=N+A;v.fillStyle=p,je(v,24,E,r-48,M+10,16),v.fill(),v.stroke(),b.length===0?(v.fillStyle=o,v.font="14px Inter, sans-serif",v.textAlign="center",v.fillText("No scheduled tasks recorded for this date.",r/2,E+60),v.textAlign="left"):b.forEach((J,Q)=>{const W=E+16+Q*V,Y=J.status==="Completed";v.beginPath(),v.arc(48,W+14,10,0,Math.PI*2),Y?(v.fillStyle=w,v.fill(),v.strokeStyle="#FFFFFF",v.lineWidth=2,v.beginPath(),v.moveTo(44,W+14),v.lineTo(47,W+17),v.lineTo(52,W+11),v.stroke()):(v.strokeStyle=u,v.lineWidth=2,v.stroke()),v.fillStyle=Y?o:l,v.font=`${Y?"normal":"500"} 14px Inter, sans-serif`;const ae=J.title.length>55?J.title.slice(0,52)+"...":J.title;if(v.fillText(ae,70,W+18),Y){const le=v.measureText(ae);v.strokeStyle=o,v.lineWidth=1.2,v.beginPath(),v.moveTo(70,W+14),v.lineTo(70+le.width,W+14),v.stroke()}const re=J.priority||"Medium";let pe="#E2E8F0",ye="#334155";re==="Urgent"?(pe="#FEE2E2",ye="#DC2626"):re==="High"?(pe="#FEF3C7",ye="#D97706"):re==="Low"&&(pe="#ECFDF5",ye="#059669"),v.fillStyle=pe,je(v,r-150,W+4,60,20,10),v.fill(),v.fillStyle=ye,v.font="bold 10px Inter, sans-serif",v.fillText(re,r-138,W+18);const Se=J.dueTime?`🕒 ${J.dueTime}`:J.category||"General";v.fillStyle=o,v.font="11px Inter, sans-serif",v.fillText(Se,70,W+34),Q<b.length-1&&(v.strokeStyle=u,v.lineWidth=.6,v.beginPath(),v.moveTo(40,W+48),v.lineTo(r-40,W+48),v.stroke())});const ue=U-35;v.fillStyle=o,v.font="11px Inter, sans-serif",v.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,ue);try{const J=F.toDataURL("image/png"),Q=document.createElement("a");Q.href=J,Q.download=`ci360-daily-planner-${n.selectedDate}.png`,document.body.appendChild(Q),Q.click(),Q.remove(),$("Daily Planner image exported! 🖼️")}catch(J){$("Failed to export image: "+J.message,!0)}}function je(b,T,I,a,r,_){b.beginPath(),b.moveTo(T+_,I),b.lineTo(T+a-_,I),b.quadraticCurveTo(T+a,I,T+a,I+_),b.lineTo(T+a,I+r-_),b.quadraticCurveTo(T+a,I+r,T+a-_,I+r),b.lineTo(T+_,I+r),b.quadraticCurveTo(T,I+r,T,I+r-_),b.lineTo(T,I+_),b.quadraticCurveTo(T,I,T+_,I),b.closePath()}function de(){const b=ta(n.selectedDate,f.weekStartsOn),T=wt(b[0]),I=wt(b[6]);at();const a=n.tasks.filter(M=>{if(M.isDeleted===!0)return!1;const U=M.dateStr||(M.dueDate?new Date(M.dueDate).toISOString().slice(0,10):"");return b.includes(U)}),r=a.length,_=a.filter(M=>M.status==="Completed").length,A=r>0?Math.round(_/r*100):0,V=window.open("","_blank");if(!V){$("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const G=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${T}</title>
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
            <div class="period">${T} – ${I}</div>
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
            <div class="kpi-num" style="color:#10b981">${_}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${r-_}</div>
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
            ${b.map(M=>{const U=S(M);return U.length===0?`<tr><td><strong>${bt(M)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:U.map(F=>`
                <tr>
                  <td><strong>${bt(M)}</strong></td>
                  <td>${x(F.title)}</td>
                  <td><span class="badge badge-${(F.priority||"medium").toLowerCase().slice(0,3)}">${F.priority||"Medium"}</span></td>
                  <td>${x(F.category||"General")}</td>
                  <td>${F.dueTime||F.startTime||"—"}</td>
                  <td class="${F.status==="Completed"?"done":""}">${F.status||"Pending"}</td>
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
    `;V.document.write(G),V.document.close(),$("Weekly PDF report generated for printing! 📄")}function et(){const T=Ot(`
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
    `),I=()=>T.remove();T.querySelector("#btnBackupClose").onclick=I;const a=T.querySelector("#btnDownloadBackupJson");a.onclick=async()=>{a.disabled=!0,a.textContent="Generating backup...";try{const M=await Me("/tasks/backup"),U=new Blob([JSON.stringify(M,null,2)],{type:"application/json"}),F=URL.createObjectURL(U),v=document.createElement("a");v.href=F,v.download=`ci360-planner-backup-${at()}.json`,document.body.appendChild(v),v.click(),v.remove(),$("Planner backup downloaded successfully! 💾")}catch(M){$("Backup export failed: "+M.message,!0)}finally{a.disabled=!1,a.textContent="Download JSON Backup"}};const r=T.querySelector("#restoreFileInput"),_=T.querySelector("#restorePreviewArea"),A=T.querySelector("#restoreCountText"),V=T.querySelector("#btnExecuteRestore");let G=null;r.onchange=M=>{const U=M.target.files[0];if(!U)return;const F=new FileReader;F.onload=v=>{try{const H=JSON.parse(v.target.result),X=Array.isArray(H.tasks)?H.tasks:Array.isArray(H)?H:null;if(!X||X.length===0){$("Invalid backup file: No tasks found",!0);return}G=X,_.style.display="block",A.textContent=`Valid backup: ${X.length} tasks ready to restore.`,V.disabled=!1}catch(H){$("Error parsing JSON backup file: "+H.message,!0),_.style.display="none",V.disabled=!0}},F.readAsText(U)},V.onclick=async()=>{if(!G||G.length===0)return;V.disabled=!0,V.textContent="Restoring...";const M=T.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const U=await ke("/tasks/restore",{tasks:G,mode:M});$(`Restored ${U.restoredCount} tasks! (${U.skippedCount} skipped) ✨`),I(),await q()}catch(U){$("Restore failed: "+U.message,!0),V.disabled=!1,V.textContent="Retry Restore"}}}function be(){const b=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${x(f.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${f.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${f.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${x(f.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${f.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${f.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${f.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${f.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${f.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${f.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${f.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,T=Ot(b),I=()=>T.remove();T.querySelector("#btnSettingsClose").onclick=I,T.querySelector("#btnCancelSettings").onclick=I,T.querySelector("#settingsForm").onsubmit=a=>{a.preventDefault(),f.displayName=T.querySelector("#setDisplayName").value.trim()||"Daily Planner",f.weekStartsOn=Number(T.querySelector("#setWeekStart").value),f.defaultPriority=T.querySelector("#setDefaultPriority").value,f.density=T.querySelector("#setDensity").value,f.soundEnabled=T.querySelector("#setSound").checked,wa(f),$("Planner preferences saved! ⚙️"),I(),B()}}}function Sa(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
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
  `,document.head.appendChild(i)}function Ca(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function _a(i,t,e,d,c){const s={move:i,variations:c};return t&&(s.suffix=t),e&&(s.nag=e),d!==null&&(s.comment=d),s}function Ta(...i){const[t,...e]=i;let d=t;for(const c of e)c!==null&&(d.variations=[c,...c.variations],c.variations=[],d=c);return t}function ja(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const d=e.variations[0];if(!d){e.comment=t.marker.comment;break}e=d}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ia(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function It(i,t,e,d){var c=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(c,It.prototype),c.expected=t,c.found=e,c.location=d,c.name="SyntaxError",c}Ia(It,Error);function aa(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}It.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,d;for(d=0;d<i.length;d++)if(i[d].source===this.location.source){e=i[d].text.split(/\r\n|\n|\r/g);break}var c=this.location.start,s=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(c):c,f=this.location.source+":"+s.line+":"+s.column;if(e){var n=this.location.end,q=aa("",s.line.toString().length," "),R=e[c.line-1],S=c.line===n.line?n.column:R.length+1,j=S-c.column||1;t+=`
 --> `+f+`
`+q+` |
`+s.line+" | "+R+`
`+q+" | "+aa("",c.column-1," ")+aa("",j,"^")}else t+=`
 at `+f}return t};It.buildMessage=function(i,t){var e={literal:function(R){return'"'+c(R.text)+'"'},class:function(R){var S=R.parts.map(function(j){return Array.isArray(j)?s(j[0])+"-"+s(j[1]):s(j)});return"["+(R.inverted?"^":"")+S.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(R){return R.description}};function d(R){return R.charCodeAt(0).toString(16).toUpperCase()}function c(R){return R.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(S){return"\\x0"+d(S)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(S){return"\\x"+d(S)})}function s(R){return R.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(S){return"\\x0"+d(S)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(S){return"\\x"+d(S)})}function f(R){return e[R.type](R)}function n(R){var S=R.map(f),j,P;if(S.sort(),S.length>0){for(j=1,P=1;j<S.length;j++)S[j-1]!==S[j]&&(S[P]=S[j],P++);S.length=P}switch(S.length){case 1:return S[0];case 2:return S[0]+" or "+S[1];default:return S.slice(0,-1).join(", ")+", or "+S[S.length-1]}}function q(R){return R?'"'+c(R)+'"':"end of input"}return"Expected "+n(i)+" but "+q(t)+" found."};function Aa(i,t){t=t!==void 0?t:{};var e={},d=t.grammarSource,c={pgn:Lt},s=Lt,f="[",n='"',q="]",R=".",S="O-O-O",j="O-O",P="0-0-0",B="0-0",ce="$",me="{",qe="}",Ye=";",dt="(",vt=")",we="1-0",ct="0-1",Fe="1/2-1/2",pt="*",_e=/^[a-zA-Z]/,it=/^[^"]/,nt=/^[0-9]/,je=/^[.]/,de=/^[a-zA-Z1-8\-=]/,et=/^[+#]/,be=/^[!?]/,b=/^[^}]/,T=/^[^\r\n]/,I=/^[ \t\r\n]/,a=Ke("tag pair"),r=Ce("[",!1),_=Ce('"',!1),A=Ce("]",!1),V=Ke("tag name"),G=Qe([["a","z"],["A","Z"]],!1,!1),M=Ke("tag value"),U=Qe(['"'],!0,!1),F=Ke("move number"),v=Qe([["0","9"]],!1,!1),H=Ce(".",!1),X=Qe(["."],!1,!1),p=Ke("standard algebraic notation"),u=Ce("O-O-O",!1),l=Ce("O-O",!1),o=Ce("0-0-0",!1),m=Ce("0-0",!1),w=Qe([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),C=Qe(["+","#"],!1,!1),N=Ke("suffix annotation"),L=Qe(["!","?"],!1,!1),te=Ke("NAG"),E=Ce("$",!1),ue=Ke("brace comment"),J=Ce("{",!1),Q=Qe(["}"],!0,!1),W=Ce("}",!1),Y=Ke("rest of line comment"),ae=Ce(";",!1),re=Qe(["\r",`
`],!0,!1),pe=Ke("variation"),ye=Ce("(",!1),Se=Ce(")",!1),le=Ke("game termination marker"),he=Ce("1-0",!1),De=Ce("0-1",!1),Ie=Ce("1/2-1/2",!1),$e=Ce("*",!1),Be=Ke("whitespace"),Ne=Qe([" ","	","\r",`
`],!1,!1),Ue=function(g,y){return ja(g,y)},Ee=function(g){return Object.fromEntries(g)},z=function(g,y){return[g,y]},K=function(g,y){return{root:g,marker:y}},ge=function(g,y){return Ta(Ca(g),...y.flat())},Le=function(g,y,k,ie,ne){return _a(g,y,k,ie,ne)},xe=function(g){return g},Je=function(g){return g.replace(/[\r\n]+/g," ")},_t=function(g){return g.trim()},Tt=function(g){return g},ut=function(g,y){return{result:g,comment:y}},h=t.peg$currPos|0,rt=[{line:1,column:1}],We=h,xt=t.peg$maxFailExpected||[],O=t.peg$silentFails|0,gt;if(t.startRule){if(!(t.startRule in c))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');s=c[t.startRule]}function Ce(g,y){return{type:"literal",text:g,ignoreCase:y}}function Qe(g,y,k){return{type:"class",parts:g,inverted:y,ignoreCase:k}}function Jt(){return{type:"end"}}function Ke(g){return{type:"other",description:g}}function yt(g){var y=rt[g],k;if(y)return y;if(g>=rt.length)k=rt.length-1;else for(k=g;!rt[--k];);for(y=rt[k],y={line:y.line,column:y.column};k<g;)i.charCodeAt(k)===10?(y.line++,y.column=1):y.column++,k++;return rt[g]=y,y}function qt(g,y,k){var ie=yt(g),ne=yt(y),ve={source:d,start:{offset:g,line:ie.line,column:ie.column},end:{offset:y,line:ne.line,column:ne.column}};return ve}function Z(g){h<We||(h>We&&(We=h,xt=[]),xt.push(g))}function Qt(g,y,k){return new It(It.buildMessage(g,y),g,y,k)}function Lt(){var g,y,k;return g=h,y=D(),k=Xe(),g=Ue(y,k),g}function D(){var g,y,k;for(g=h,y=[],k=ee();k!==e;)y.push(k),k=ee();return k=He(),g=Ee(y),g}function ee(){var g,y,k,ie,ne,ve,kt;return O++,g=h,He(),i.charCodeAt(h)===91?(y=f,h++):(y=e,O===0&&Z(r)),y!==e?(He(),k=fe(),k!==e?(He(),i.charCodeAt(h)===34?(ie=n,h++):(ie=e,O===0&&Z(_)),ie!==e?(ne=ze(),i.charCodeAt(h)===34?(ve=n,h++):(ve=e,O===0&&Z(_)),ve!==e?(He(),i.charCodeAt(h)===93?(kt=q,h++):(kt=e,O===0&&Z(A)),kt!==e?g=z(k,ne):(h=g,g=e)):(h=g,g=e)):(h=g,g=e)):(h=g,g=e)):(h=g,g=e),O--,g===e&&O===0&&Z(a),g}function fe(){var g,y,k;if(O++,g=h,y=[],k=i.charAt(h),_e.test(k)?h++:(k=e,O===0&&Z(G)),k!==e)for(;k!==e;)y.push(k),k=i.charAt(h),_e.test(k)?h++:(k=e,O===0&&Z(G));else y=e;return y!==e?g=i.substring(g,h):g=y,O--,g===e&&(y=e,O===0&&Z(V)),g}function ze(){var g,y,k;for(O++,g=h,y=[],k=i.charAt(h),it.test(k)?h++:(k=e,O===0&&Z(U));k!==e;)y.push(k),k=i.charAt(h),it.test(k)?h++:(k=e,O===0&&Z(U));return g=i.substring(g,h),O--,y=e,O===0&&Z(M),g}function Xe(){var g,y,k;return g=h,y=st(),He(),k=lt(),k===e&&(k=null),He(),g=K(y,k),g}function st(){var g,y,k,ie;for(g=h,y=At(),y===e&&(y=null),k=[],ie=ot();ie!==e;)k.push(ie),ie=ot();return g=ge(y,k),g}function ot(){var g,y,k,ie,ne,ve,kt,Nt;if(g=h,He(),jt(),He(),y=zt(),y!==e){for(k=Xt(),k===e&&(k=null),ie=[],ne=Rt();ne!==e;)ie.push(ne),ne=Rt();for(ne=He(),ve=At(),ve===e&&(ve=null),kt=[],Nt=Bt();Nt!==e;)kt.push(Nt),Nt=Bt();g=Le(y,k,ie,ve,kt)}else h=g,g=e;return g}function jt(){var g,y,k,ie,ne,ve;for(O++,g=h,y=[],k=i.charAt(h),nt.test(k)?h++:(k=e,O===0&&Z(v));k!==e;)y.push(k),k=i.charAt(h),nt.test(k)?h++:(k=e,O===0&&Z(v));if(i.charCodeAt(h)===46?(k=R,h++):(k=e,O===0&&Z(H)),k!==e){for(ie=He(),ne=[],ve=i.charAt(h),je.test(ve)?h++:(ve=e,O===0&&Z(X));ve!==e;)ne.push(ve),ve=i.charAt(h),je.test(ve)?h++:(ve=e,O===0&&Z(X));y=[y,k,ie,ne],g=y}else h=g,g=e;return O--,g===e&&(y=e,O===0&&Z(F)),g}function zt(){var g,y,k,ie,ne,ve;if(O++,g=h,y=h,i.substr(h,5)===S?(k=S,h+=5):(k=e,O===0&&Z(u)),k===e&&(i.substr(h,3)===j?(k=j,h+=3):(k=e,O===0&&Z(l)),k===e&&(i.substr(h,5)===P?(k=P,h+=5):(k=e,O===0&&Z(o)),k===e&&(i.substr(h,3)===B?(k=B,h+=3):(k=e,O===0&&Z(m)),k===e))))if(k=h,ie=i.charAt(h),_e.test(ie)?h++:(ie=e,O===0&&Z(G)),ie!==e){if(ne=[],ve=i.charAt(h),de.test(ve)?h++:(ve=e,O===0&&Z(w)),ve!==e)for(;ve!==e;)ne.push(ve),ve=i.charAt(h),de.test(ve)?h++:(ve=e,O===0&&Z(w));else ne=e;ne!==e?(ie=[ie,ne],k=ie):(h=k,k=e)}else h=k,k=e;return k!==e?(ie=i.charAt(h),et.test(ie)?h++:(ie=e,O===0&&Z(C)),ie===e&&(ie=null),k=[k,ie],y=k):(h=y,y=e),y!==e?g=i.substring(g,h):g=y,O--,g===e&&(y=e,O===0&&Z(p)),g}function Xt(){var g,y,k;for(O++,g=h,y=[],k=i.charAt(h),be.test(k)?h++:(k=e,O===0&&Z(L));k!==e;)y.push(k),y.length>=2?k=e:(k=i.charAt(h),be.test(k)?h++:(k=e,O===0&&Z(L)));return y.length<1?(h=g,g=e):g=y,O--,g===e&&(y=e,O===0&&Z(N)),g}function Rt(){var g,y,k,ie,ne;if(O++,g=h,He(),i.charCodeAt(h)===36?(y=ce,h++):(y=e,O===0&&Z(E)),y!==e){if(k=h,ie=[],ne=i.charAt(h),nt.test(ne)?h++:(ne=e,O===0&&Z(v)),ne!==e)for(;ne!==e;)ie.push(ne),ne=i.charAt(h),nt.test(ne)?h++:(ne=e,O===0&&Z(v));else ie=e;ie!==e?k=i.substring(k,h):k=ie,k!==e?g=xe(k):(h=g,g=e)}else h=g,g=e;return O--,g===e&&O===0&&Z(te),g}function At(){var g;return g=Zt(),g===e&&(g=tt()),g}function Zt(){var g,y,k,ie,ne;if(O++,g=h,i.charCodeAt(h)===123?(y=me,h++):(y=e,O===0&&Z(J)),y!==e){for(k=h,ie=[],ne=i.charAt(h),b.test(ne)?h++:(ne=e,O===0&&Z(Q));ne!==e;)ie.push(ne),ne=i.charAt(h),b.test(ne)?h++:(ne=e,O===0&&Z(Q));k=i.substring(k,h),i.charCodeAt(h)===125?(ie=qe,h++):(ie=e,O===0&&Z(W)),ie!==e?g=Je(k):(h=g,g=e)}else h=g,g=e;return O--,g===e&&(y=e,O===0&&Z(ue)),g}function tt(){var g,y,k,ie,ne;if(O++,g=h,i.charCodeAt(h)===59?(y=Ye,h++):(y=e,O===0&&Z(ae)),y!==e){for(k=h,ie=[],ne=i.charAt(h),T.test(ne)?h++:(ne=e,O===0&&Z(re));ne!==e;)ie.push(ne),ne=i.charAt(h),T.test(ne)?h++:(ne=e,O===0&&Z(re));k=i.substring(k,h),g=_t(k)}else h=g,g=e;return O--,g===e&&(y=e,O===0&&Z(Y)),g}function Bt(){var g,y,k,ie;return O++,g=h,He(),i.charCodeAt(h)===40?(y=dt,h++):(y=e,O===0&&Z(ye)),y!==e?(k=st(),k!==e?(He(),i.charCodeAt(h)===41?(ie=vt,h++):(ie=e,O===0&&Z(Se)),ie!==e?g=Tt(k):(h=g,g=e)):(h=g,g=e)):(h=g,g=e),O--,g===e&&O===0&&Z(pe),g}function lt(){var g,y,k;return O++,g=h,i.substr(h,3)===we?(y=we,h+=3):(y=e,O===0&&Z(he)),y===e&&(i.substr(h,3)===ct?(y=ct,h+=3):(y=e,O===0&&Z(De)),y===e&&(i.substr(h,7)===Fe?(y=Fe,h+=7):(y=e,O===0&&Z(Ie)),y===e&&(i.charCodeAt(h)===42?(y=pt,h++):(y=e,O===0&&Z($e))))),y!==e?(He(),k=At(),k===e&&(k=null),g=ut(y,k)):(h=g,g=e),O--,g===e&&(y=e,O===0&&Z(le)),g}function He(){var g,y;for(O++,g=[],y=i.charAt(h),I.test(y)?h++:(y=e,O===0&&Z(Ne));y!==e;)g.push(y),y=i.charAt(h),I.test(y)?h++:(y=e,O===0&&Z(Ne));return O--,y=e,O===0&&Z(Be),g}if(gt=s(),t.peg$library)return{peg$result:gt,peg$currPos:h,peg$FAILED:e,peg$maxFailExpected:xt,peg$maxFailPos:We};if(gt!==e&&h===i.length)return gt;throw gt!==e&&h<i.length&&Z(Jt()),Qt(xt,We<i.length?i.charAt(We):null,We<i.length?qt(We,We+1):qt(We,We))}/**
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
 */const Kt=0xffffffffffffffffn;function ia(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function fa(i,t){return i*t&Kt}function Da(i){return function(){let t=BigInt(i&Kt),e=BigInt(i>>64n&Kt);const d=fa(ia(fa(t,5n),7n),9n);return e^=t,t=(ia(t,24n)^e^e<<16n)&Kt,e=ia(e,37n),i=e<<64n|t,d}}const Yt=Da(0xa187eb39cdcaed8f31c4b365b102e01en),Ea=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Yt()))),Pa=Array.from({length:8},()=>Yt()),Ma=Array.from({length:16},()=>Yt()),na=Yt(),Oe="w",Ze="b",Te="p",ca="n",Vt="b",Pt="r",ht="q",Ae="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Ht{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:d,piece:c,from:s,to:f,flags:n,captured:q,promotion:R}=e,S=Pe(s),j=Pe(f);this.color=d,this.piece=c,this.from=S,this.to=j,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=S+j,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const P in se)se[P]&n&&(this.flags+=$t[P]);q&&(this.captured=q),R&&(this.promotion=R,this.lan+=R)}isCapture(){return this.flags.indexOf($t.CAPTURE)>-1}isPromotion(){return this.flags.indexOf($t.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf($t.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf($t.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf($t.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf($t.BIG_PAWN)>-1}}const Re=-1,$t={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},se={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},pa={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},qa={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},La={...pa,...qa},oe={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},oa={b:[16,32,17,15],w:[-16,-32,-17,-15]},ma={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},za=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ra=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ba={p:1,n:2,b:4,r:8,q:16,k:32},Na="pnbrqkPNBRQK",ha=[ca,Vt,Pt,ht],Oa=7,Fa=6,Ua=1,Ha=0,Gt={[Ae]:se.KSIDE_CASTLE,[ht]:se.QSIDE_CASTLE},ft={w:[{square:oe.a1,flag:se.QSIDE_CASTLE},{square:oe.h1,flag:se.KSIDE_CASTLE}],b:[{square:oe.a8,flag:se.QSIDE_CASTLE},{square:oe.h8,flag:se.KSIDE_CASTLE}]},Ga={b:Ua,w:Fa},sa="--";function Ct(i){return i>>4}function Mt(i){return i&15}function ya(i){return"0123456789".indexOf(i)!==-1}function Pe(i){const t=Mt(i),e=Ct(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function Dt(i){return i===Oe?Ze:Oe}function Wa(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const d=parseInt(t[4],10);if(isNaN(d)||d<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const c=t[0].split("/");if(c.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let f=0;f<c.length;f++){let n=0,q=!1;for(let R=0;R<c[f].length;R++)if(ya(c[f][R])){if(q)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};n+=parseInt(c[f][R],10),q=!0}else{if(!/^[prnbqkPRNBQK]$/.test(c[f][R]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};n+=1,q=!1}if(n!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const s=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:f,regex:n}of s){if(!n.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${f} king`};if((t[0].match(n)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${f} kings`}}return Array.from(c[0]+c[7]).some(f=>f.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Ka(i,t){const e=i.from,d=i.to,c=i.piece;let s=0,f=0,n=0;for(let q=0,R=t.length;q<R;q++){const S=t[q].from,j=t[q].to,P=t[q].piece;c===P&&e!==S&&d===j&&(s++,Ct(e)===Ct(S)&&f++,Mt(e)===Mt(S)&&n++)}return s>0?f>0&&n>0?Pe(e):n>0?Pe(e).charAt(1):Pe(e).charAt(0):""}function mt(i,t,e,d,c,s=void 0,f=se.NORMAL){const n=Ct(d);if(c===Te&&(n===Oa||n===Ha))for(let q=0;q<ha.length;q++){const R=ha[q];i.push({color:t,from:e,to:d,piece:c,captured:s,promotion:R,flags:f|se.PROMOTION})}else i.push({color:t,from:e,to:d,piece:c,captured:s,flags:f})}function va(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:Te:(t=t.toLowerCase(),t==="o"?Ae:t)}function la(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class xa{_board=new Array(128);_turn=Oe;_header={};_kings={w:Re,b:Re};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=ra,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Re,b:Re},this._turn=Oe,this._castling={w:0,b:0},this._epSquare=Re,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...La},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:d=!1}={}){let c=t.split(/\s+/);if(c.length>=2&&c.length<6){const n=["-","-","0","1"];t=c.concat(n.slice(-(6-c.length))).join(" ")}if(c=t.split(/\s+/),!e){const{ok:n,error:q}=Wa(t);if(!n)throw new Error(q)}const s=c[0];let f=0;this.clear({preserveHeaders:d});for(let n=0;n<s.length;n++){const q=s.charAt(n);if(q==="/")f+=8;else if(ya(q))f+=parseInt(q,10);else{const R=q<"a"?Oe:Ze;this._put({type:q.toLowerCase(),color:R},Pe(f)),f++}}this._turn=c[1],c[2].indexOf("K")>-1&&(this._castling.w|=se.KSIDE_CASTLE),c[2].indexOf("Q")>-1&&(this._castling.w|=se.QSIDE_CASTLE),c[2].indexOf("k")>-1&&(this._castling.b|=se.KSIDE_CASTLE),c[2].indexOf("q")>-1&&(this._castling.b|=se.QSIDE_CASTLE),this._epSquare=c[3]==="-"?Re:oe[c[3]],this._halfMoves=parseInt(c[4],10),this._moveNumber=parseInt(c[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,d="";for(let f=oe.a8;f<=oe.h1;f++){if(this._board[f]){e>0&&(d+=e,e=0);const{color:n,type:q}=this._board[f];d+=n===Oe?q.toUpperCase():q.toLowerCase()}else e++;f+1&136&&(e>0&&(d+=e),f!==oe.h1&&(d+="/"),e=0,f+=8)}let c="";this._castling[Oe]&se.KSIDE_CASTLE&&(c+="K"),this._castling[Oe]&se.QSIDE_CASTLE&&(c+="Q"),this._castling[Ze]&se.KSIDE_CASTLE&&(c+="k"),this._castling[Ze]&se.QSIDE_CASTLE&&(c+="q"),c=c||"-";let s="-";if(this._epSquare!==Re)if(t)s=Pe(this._epSquare);else{const f=this._epSquare+(this._turn===Oe?16:-16),n=[f+1,f-1];for(const q of n){if(q&136)continue;const R=this._turn;if(this._board[q]?.color===R&&this._board[q]?.type===Te){this._makeMove({color:R,from:q,to:this._epSquare,piece:Te,captured:Te,flags:se.EP_CAPTURE});const S=!this._isKingAttacked(R);if(this._undoMove(),S){s=Pe(this._epSquare);break}}}}return[d,this._turn,c,s,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:d}=this._board[t],c={w:0,b:1}[e],s={p:0,n:1,b:2,r:3,q:4,k:5}[d];return Ea[c][s][t]}_epKey(){return this._epSquare===Re?0n:Pa[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Ma[t]}_computeHash(){let t=0n;for(let e=oe.a8;e<=oe.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=na),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[oe[t]]}findPiece(t){const e=[];for(let d=oe.a8;d<=oe.h1;d++){if(d&136){d+=7;continue}!this._board[d]||this._board[d]?.color!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(Pe(d))}return e}put({type:t,color:e},d){return this._put({type:t,color:e},d)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},d){if(Na.indexOf(t.toLowerCase())===-1||!(d in oe))return!1;const c=oe[d];if(t==Ae&&!(this._kings[e]==Re||this._kings[e]==c))return!1;const s=this._board[c];return s&&s.type===Ae&&(this._kings[s.color]=Re),this._set(c,{type:t,color:e}),t===Ae&&(this._kings[e]=c),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(oe[t]),e&&e.type===Ae&&(this._kings[e.color]=Re),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[oe.e1]?.type===Ae&&this._board[oe.e1]?.color===Oe,e=this._board[oe.e8]?.type===Ae&&this._board[oe.e8]?.color===Ze;(!t||this._board[oe.a1]?.type!==Pt||this._board[oe.a1]?.color!==Oe)&&(this._castling.w&=-65),(!t||this._board[oe.h1]?.type!==Pt||this._board[oe.h1]?.color!==Oe)&&(this._castling.w&=-33),(!e||this._board[oe.a8]?.type!==Pt||this._board[oe.a8]?.color!==Ze)&&(this._castling.b&=-65),(!e||this._board[oe.h8]?.type!==Pt||this._board[oe.h8]?.color!==Ze)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Re)return;const t=this._epSquare+(this._turn===Oe?-16:16),e=this._epSquare+(this._turn===Oe?16:-16),d=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==Dt(this._turn)||this._board[e]?.type!==Te){this._hash^=this._epKey(),this._epSquare=Re;return}const c=s=>!(s&136)&&this._board[s]?.color===this._turn&&this._board[s]?.type===Te;d.some(c)||(this._hash^=this._epKey(),this._epSquare=Re)}_attacked(t,e,d){const c=[];for(let s=oe.a8;s<=oe.h1;s++){if(s&136){s+=7;continue}if(this._board[s]===void 0||this._board[s].color!==t)continue;const f=this._board[s],n=s-e;if(n===0)continue;const q=n+119;if(za[q]&Ba[f.type]){if(f.type===Te){if(n>0&&f.color===Oe||n<=0&&f.color===Ze)if(d)c.push(Pe(s));else return!0;continue}if(f.type==="n"||f.type==="k")if(d){c.push(Pe(s));continue}else return!0;const R=Ra[q];let S=s+R,j=!1;for(;S!==e;){if(this._board[S]!=null){j=!0;break}S+=R}if(!j)if(d){c.push(Pe(s));continue}else return!0}}return d?c:!1}attackers(t,e){return e?this._attacked(e,oe[t],!0):this._attacked(this._turn,oe[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(Dt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,oe[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let d=0,c=0;for(let s=oe.a8;s<=oe.h1;s++){if(c=(c+1)%2,s&136){s+=7;continue}const f=this._board[s];f&&(t[f.type]=f.type in t?t[f.type]+1:1,f.type===Vt&&e.push(c),d++)}if(d===2)return!0;if(d===3&&(t[Vt]===1||t[ca]===1))return!0;if(d===t[Vt]+2){let s=0;const f=e.length;for(let n=0;n<f;n++)s+=e[n];if(s===0||s===f)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:d=void 0}={}){const c=this._moves({square:e,piece:d});return t?c.map(s=>new Ht(this,s)):c.map(s=>this._moveToSan(s,c))}_moves({legal:t=!0,piece:e=void 0,square:d=void 0}={}){const c=d?d.toLowerCase():void 0,s=e?.toLowerCase(),f=[],n=this._turn,q=Dt(n);let R=oe.a8,S=oe.h1,j=!1;if(c)if(c in oe)R=S=oe[c],j=!0;else return[];for(let B=R;B<=S;B++){if(B&136){B+=7;continue}if(!this._board[B]||this._board[B].color===q)continue;const{type:ce}=this._board[B];let me;if(ce===Te){if(s&&s!==ce)continue;me=B+oa[n][0],this._board[me]||(mt(f,n,B,me,Te),me=B+oa[n][1],Ga[n]===Ct(B)&&!this._board[me]&&mt(f,n,B,me,Te,void 0,se.BIG_PAWN));for(let qe=2;qe<4;qe++)me=B+oa[n][qe],!(me&136)&&(this._board[me]?.color===q?mt(f,n,B,me,Te,this._board[me].type,se.CAPTURE):me===this._epSquare&&mt(f,n,B,me,Te,Te,se.EP_CAPTURE))}else{if(s&&s!==ce)continue;for(let qe=0,Ye=ma[ce].length;qe<Ye;qe++){const dt=ma[ce][qe];for(me=B;me+=dt,!(me&136);){if(!this._board[me])mt(f,n,B,me,ce);else{if(this._board[me].color===n)break;mt(f,n,B,me,ce,this._board[me].type,se.CAPTURE);break}if(ce===ca||ce===Ae)break}}}}if((s===void 0||s===Ae)&&(!j||S===this._kings[n])){if(this._castling[n]&se.KSIDE_CASTLE){const B=this._kings[n],ce=B+2;!this._board[B+1]&&!this._board[ce]&&!this._attacked(q,this._kings[n])&&!this._attacked(q,B+1)&&!this._attacked(q,ce)&&mt(f,n,this._kings[n],ce,Ae,void 0,se.KSIDE_CASTLE)}if(this._castling[n]&se.QSIDE_CASTLE){const B=this._kings[n],ce=B-2;!this._board[B-1]&&!this._board[B-2]&&!this._board[B-3]&&!this._attacked(q,this._kings[n])&&!this._attacked(q,B-1)&&!this._attacked(q,ce)&&mt(f,n,this._kings[n],ce,Ae,void 0,se.QSIDE_CASTLE)}}if(!t||this._kings[n]===-1)return f;const P=[];for(let B=0,ce=f.length;B<ce;B++)this._makeMove(f[B]),this._isKingAttacked(n)||P.push(f[B]),this._undoMove();return P}move(t,{strict:e=!1}={}){let d=null;if(typeof t=="string")d=this._moveFromSan(t,e);else if(t===null)d=this._moveFromSan(sa,e);else if(typeof t=="object"){const s=this._moves();for(let f=0,n=s.length;f<n;f++)if(t.from===Pe(s[f].from)&&t.to===Pe(s[f].to)&&(!("promotion"in s[f])||t.promotion===s[f].promotion)){d=s[f];break}}if(!d)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&d.flags&se.NULL_MOVE)throw new Error("Null move not allowed when in check");const c=new Ht(this,d);return this._makeMove(d),this._incPositionCount(),c}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,d=Dt(e);if(this._push(t),t.flags&se.NULL_MOVE){e===Ze&&this._moveNumber++,this._halfMoves++,this._turn=d,this._epSquare=Re;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&se.EP_CAPTURE&&(this._turn===Ze?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Ae){if(this._kings[e]=t.to,t.flags&se.KSIDE_CASTLE){const c=t.to-1,s=t.to+1;this._movePiece(s,c)}else if(t.flags&se.QSIDE_CASTLE){const c=t.to+1,s=t.to-2;this._movePiece(s,c)}this._castling[e]=0}if(this._castling[e]){for(let c=0,s=ft[e].length;c<s;c++)if(t.from===ft[e][c].square&&this._castling[e]&ft[e][c].flag){this._castling[e]^=ft[e][c].flag;break}}if(this._castling[d]){for(let c=0,s=ft[d].length;c<s;c++)if(t.to===ft[d][c].square&&this._castling[d]&ft[d][c].flag){this._castling[d]^=ft[d][c].flag;break}}if(this._hash^=this._castlingKey(),t.flags&se.BIG_PAWN){let c;e===Ze?c=t.to-16:c=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===Te&&this._board[t.to-1]?.color===d||!(t.to+1&136)&&this._board[t.to+1]?.type===Te&&this._board[t.to+1]?.color===d?(this._epSquare=c,this._hash^=this._epKey()):this._epSquare=Re}else this._epSquare=Re;t.piece===Te?this._halfMoves=0:t.flags&(se.CAPTURE|se.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===Ze&&this._moveNumber++,this._turn=d,this._hash^=na}undo(){const t=this._hash,e=this._undoMove();if(e){const d=new Ht(this,e);return this._decPositionCount(t),d}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=na;const d=this._turn,c=Dt(d);if(e.flags&se.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:d})),e.captured)if(e.flags&se.EP_CAPTURE){let s;d===Ze?s=e.to-16:s=e.to+16,this._set(s,{type:Te,color:c})}else this._set(e.to,{type:e.captured,color:c});if(e.flags&(se.KSIDE_CASTLE|se.QSIDE_CASTLE)){let s,f;e.flags&se.KSIDE_CASTLE?(s=e.to+1,f=e.to-1):(s=e.to-2,f=e.to+1),this._movePiece(f,s)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const d=[];let c=!1;for(const P in this._header)this._header[P]&&d.push(`[${P} "${this._header[P]}"]`+t),c=!0;c&&this._history.length&&d.push(t);const s=P=>{const B=this._comments[this.fen()];if(typeof B<"u"){const ce=P.length>0?" ":"";P=`${P}${ce}{${B}}`}return P},f=[];for(;this._history.length>0;)f.push(this._undoMove());const n=[];let q="";for(f.length===0&&n.push(s(""));f.length>0;){q=s(q);const P=f.pop();if(!P)break;if(!this._history.length&&P.color==="b"){const B=`${this._moveNumber}. ...`;q=q?`${q} ${B}`:B}else P.color==="w"&&(q.length&&n.push(q),q=this._moveNumber+".");q=q+" "+this._moveToSan(P,this._moves({legal:!0})),this._makeMove(P)}if(q.length&&n.push(s(q)),n.push(this._header.Result||"*"),e===0)return d.join("")+n.join(" ");const R=function(){return d.length>0&&d[d.length-1]===" "?(d.pop(),!0):!1},S=function(P,B){for(const ce of B.split(" "))if(ce){if(P+ce.length>e){for(;R();)P--;d.push(t),P=0}d.push(ce),P+=ce.length,d.push(" "),P++}return R()&&P--,P};let j=0;for(let P=0;P<n.length;P++){if(j+n[P].length>e&&n[P].includes("{")){j=S(j,n[P]);continue}j+n[P].length>e&&P!==0?(d[d.length-1]===" "&&d.pop(),d.push(t),j=0):P!==0&&(d.push(" "),j++),d.push(n[P]),j+=n[P].length}return d.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??pa[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=pa[t]||null,!0):!1}getHeaders(){const t={};for(const[e,d]of Object.entries(this._header))d!==null&&(t[e]=d);return t}loadPgn(t,{strict:e=!1,newlineChar:d=`\r?
`}={}){d!==`\r?
`&&(t=t.replace(new RegExp(d,"g"),`
`));const c=Aa(t);this.reset();const s=c.headers;let f="";for(const R in s)R.toLowerCase()==="fen"&&(f=s[R]),this.header(R,s[R]);if(!e)f&&this.load(f,{preserveHeaders:!0});else if(s.SetUp==="1"){if(!("FEN"in s))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(s.FEN,{preserveHeaders:!0})}let n=c.root;for(;n;){if(n.move){const R=this._moveFromSan(n.move,e);if(R==null)throw new Error(`Invalid move in PGN: ${n.move}`);this._makeMove(R),this._incPositionCount()}n.comment!==void 0&&(this._comments[this.fen()]=n.comment),n=n.variations[0]}const q=c.result;q&&Object.keys(this._header).length&&this._header.Result!==q&&this.setHeader("Result",q)}_moveToSan(t,e){let d="";if(t.flags&se.KSIDE_CASTLE)d="O-O";else if(t.flags&se.QSIDE_CASTLE)d="O-O-O";else{if(t.flags&se.NULL_MOVE)return sa;if(t.piece!==Te){const c=Ka(t,e);d+=t.piece.toUpperCase()+c}t.flags&(se.CAPTURE|se.EP_CAPTURE)&&(t.piece===Te&&(d+=Pe(t.from)[0]),d+="x"),d+=Pe(t.to),t.promotion&&(d+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?d+="#":d+="+"),this._undoMove(),d}_moveFromSan(t,e=!1){let d=la(t);if(e||(d==="0-0"?d="O-O":d==="0-0-0"&&(d="O-O-O")),d==sa)return{color:this._turn,from:0,to:0,piece:"k",flags:se.NULL_MOVE};let c=va(d),s=this._moves({legal:!0,piece:c});for(let P=0,B=s.length;P<B;P++)if(d===la(this._moveToSan(s[P],s)))return s[P];if(e)return null;let f,n,q,R,S,j=!1;if(n=d.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),n?(f=n[1],q=n[2],R=n[3],S=n[4],q.length==1&&(j=!0)):(n=d.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),n&&(f=n[1],q=n[2],R=n[3],S=n[4],q.length==1&&(j=!0))),c=va(d),s=this._moves({legal:!0,piece:f||c}),!R)return null;for(let P=0,B=s.length;P<B;P++)if(q){if((!f||f.toLowerCase()==s[P].piece)&&oe[q]==s[P].from&&oe[R]==s[P].to&&(!S||S.toLowerCase()==s[P].promotion))return s[P];if(j){const ce=Pe(s[P].from);if((!f||f.toLowerCase()==s[P].piece)&&oe[R]==s[P].to&&(q==ce[0]||q==ce[1])&&(!S||S.toLowerCase()==s[P].promotion))return s[P]}}else if(d===la(this._moveToSan(s[P],s)).replace("x",""))return s[P];return null}ascii(){let t=`   +------------------------+
`;for(let e=oe.a8;e<=oe.h1;e++){if(Mt(e)===0&&(t+=" "+"87654321"[Ct(e)]+" |"),this._board[e]){const d=this._board[e].type,s=this._board[e].color===Oe?d.toUpperCase():d.toLowerCase();t+=" "+s+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let d=0;const c=this._turn;for(let s=0,f=e.length;s<f;s++)this._makeMove(e[s]),this._isKingAttacked(c)||(t-1>0?d+=this.perft(t-1):d++),this._undoMove();return d}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let d=oe.a8;d<=oe.h1;d++)this._board[d]==null?e.push(null):e.push({square:Pe(d),type:this._board[d].type,color:this._board[d].color}),d+1&136&&(t.push(e),e=[],d+=8);return t}squareColor(t){if(t in oe){const e=oe[t];return(Ct(e)+Mt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],d=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const c=e.pop();if(!c)break;t?d.push(new Ht(this,c)):d.push(this._moveToSan(c,this._moves())),this._makeMove(c)}return d}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},d=c=>{c in this._comments&&(e[c]=this._comments[c])};for(;this._history.length>0;)t.push(this._undoMove());for(d(this.fen());;){const c=t.pop();if(!c)break;this._makeMove(c),d(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const c of[Ae,ht])e[c]!==void 0&&(e[c]?this._castling[t]|=Gt[c]:this._castling[t]&=~Gt[c]);this._updateCastlingRights();const d=this.getCastlingRights(t);return(e[Ae]===void 0||e[Ae]===d[Ae])&&(e[ht]===void 0||e[ht]===d[ht])}getCastlingRights(t){return{[Ae]:(this._castling[t]&Gt[Ae])!==0,[ht]:(this._castling[t]&Gt[ht])!==0}}moveNumber(){return this._moveNumber}}async function Qa(i,t={}){const e=t.currentUser||{};let d="chat",c=[],s=null,f=[],n=[],q=null,R=null,S=!1,j=null,P=null;i.innerHTML=`
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
  `,Va(),await vt(),_e();const B=i.querySelector("#tab-nav-chat"),ce=i.querySelector("#tab-nav-lounge"),me=i.querySelector("#bonding-chat-main-wrap"),qe=i.querySelector("#bonding-lounge-main-wrap");B?.addEventListener("click",()=>{d="chat",B.classList.add("active"),ce.classList.remove("active"),me.style.display="grid",qe.style.display="none",_e()}),ce?.addEventListener("click",async()=>{d="lounge_games",ce.classList.add("active"),B.classList.remove("active"),me.style.display="none",qe.style.display="block",await r()}),i.querySelector("#btn-top-new-chat")?.addEventListener("click",F),i.querySelector("#btn-top-new-group")?.addEventListener("click",v),i.querySelector("#btn-top-challenge")?.addEventListener("click",()=>A());const Ye=i.querySelector("#bonding-search-input");Ye&&Ye.addEventListener("input",p=>{const u=p.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(o=>{const m=o.textContent.toLowerCase();o.style.display=m.includes(u)?"flex":"none"})}),ct(),new MutationObserver((p,u)=>{document.body.contains(i)||(R&&clearInterval(R),P&&clearInterval(P),u.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function vt(){try{const[p,u]=await Promise.all([Me("/bonding/channels").catch(()=>[]),Me("/bonding/colleagues").catch(()=>[])]);c=p,f=u,!s&&c.length>0&&(s=c.find(l=>l.name.includes("Lounge"))||c[0]),Fe(),s&&await we(s._id)}catch(p){console.error("Failed to load bonding data",p)}}async function we(p,u=!1){if(p)try{n=await Me(`/bonding/channels/${p}/messages`),u?I():a()}catch(l){console.error("Failed to load messages",l)}}function ct(){R&&clearInterval(R),R=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval(R);return}d==="chat"&&s?await we(s._id,!0):d==="lounge_games"&&await r(!0)}catch{}},3e3)}function Fe(){const p=i.querySelector("#bonding-group-list"),u=i.querySelector("#bonding-direct-list");if(!p||!u)return;const l=c.filter(m=>m.type==="group"),o=c.filter(m=>m.type==="direct");l.length===0?p.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':p.innerHTML=l.map(m=>`
          <div class="bonding-channel-item ${s&&s._id===m._id?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-icon">${m.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${x(m.name)}</div>
              <div class="bonding-channel-preview">${x(m.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `).join(""),o.length===0?u.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':u.innerHTML=o.map(m=>{const w=s&&s._id===m._id,C=m.displayName||m.name||"Colleague",N=C.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${w?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-avatar">${N}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${x(C)}</div>
              <div class="bonding-channel-preview">${x(m.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),pt()}function pt(){const p=i.querySelectorAll(".bonding-channel-item");p.forEach(u=>{u.onclick=async l=>{if(l.target.closest(".bonding-channel-del-btn"))return;const o=u.dataset.channelId,m=c.find(w=>w._id===o);m&&(s=m,p.forEach(w=>w.classList.remove("active")),u.classList.add("active"),_e(),await we(m._id))}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(u=>{u.onclick=async l=>{l.stopPropagation();const o=u.dataset.channelId,m=c.find(N=>N._id===o),w=m&&m.type==="direct",C=w?"this 1-on-1 chat":`the group "${m?.name||""}"`;if(confirm(`Are you sure you want to delete ${C}? All messages will be permanently removed.`))try{u.disabled=!0,await Ve(`/bonding/channels/${o}`),$(w?"1-on-1 chat deleted":"Group deleted","success"),c=c.filter(N=>N._id!==o),s&&s._id===o&&(s=c[0]||null,_e(),s&&await we(s._id)),Fe()}catch(N){$(N.message||"Failed to delete conversation","error"),u.disabled=!1}}}),i.querySelector("#btn-create-group")?.addEventListener("click",v),i.querySelector("#btn-new-direct-chat")?.addEventListener("click",F)}function _e(){const p=i.querySelector("#bonding-chat-panel");if(!p)return;if(!s){p.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const u=x(s.displayName||s.name),l=(s.members||[]).length,o=s.type==="group",m=e?._id||e?.id,w=o?null:(s.members||[]).find(C=>C.userId?.toString()!==m?.toString());p.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${o?s.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${u}</div>
            <div class="bonding-chat-sub">
              ${o?`<span>${l} members</span> · <span>${x(s.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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
    `,je(w),de(w),et(),T()}function it(){if(!n||n.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const p=e?._id||e?.id;return n.map(u=>{const l=u.sender&&u.sender.userId&&p&&u.sender.userId.toString()===p.toString();if(u.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${u._id}">
            <span>ℹ️</span> <span>${x(u.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${u._id}" title="Delete Message">&times;</button>
          </div>
        `;if(u.type==="challenge"&&u.challengeData){const C=u.challengeData,N=C.gameTitle||"Game Challenge",L=C.gameType||"chess",te=L==="chess"?"♟️":L==="ludo"?"🎲":"❌",E=C.gameState?.invitationId,ue=C.targetUserId?.toString(),J=u.sender?.userId?.toString(),Q=p&&ue===p.toString(),W=p&&J===p.toString();return`
          <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${u._id}">
            <div class="bonding-msg-avatar" title="${x(u.sender?.name||"Teammate")}">
              ${(u.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${x(u.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${X(u.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${u._id}" title="Delete Challenge Message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${te}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${x(N)}</h4>
                    <p class="game-bubble-desc">${x(u.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${C.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':C.status==="active"||C.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${x(C.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${C.status==="pending"&&Q?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${E}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${E}" data-action="decline">
                        Decline
                      </button>
                    `:C.status==="pending"&&W?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${E}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${E}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${nt(u)}
            </div>
          </div>
        `}const o=x(u.sender?.name||"Teammate"),m=X(u.createdAt),w=nt(u);return`
        <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${u._id}">
          <div class="bonding-msg-avatar" title="${o}">${o.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${o}</span>
              <span class="bonding-msg-time">${m}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${u._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${x(u.content).replace(/\n/g,"<br/>")}
            </div>
            ${w}
          </div>
        </div>
      `}).join("")}function nt(p){return`
      <div class="bonding-reactions-row">
        ${(p.reactions||[]).map(o=>{const m=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(o.users||[]).some(C=>C.toString()===m?.toString())?"active":""}" data-msg-id="${p._id}" data-emoji="${o.emoji}">
          <span>${o.emoji}</span> <span>${o.users?o.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${p._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function je(p){const u=i.querySelector("#btn-chat-challenge");u&&(u.onclick=()=>{p?A(null,p.userId||p._id):A()});const l=i.querySelector("#btn-manage-members");l&&(l.onclick=M);const o=i.querySelector("#btn-delete-group");o&&(o.onclick=U);const m=i.querySelector("#btn-delete-direct");m&&(m.onclick=async()=>{if(s&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{m.disabled=!0,await Ve(`/bonding/channels/${s._id}`),$("1-on-1 chat deleted successfully","success");const C=s._id;c=c.filter(N=>N._id!==C),s=c[0]||null,Fe(),_e(),s&&await we(s._id)}catch(C){$(C.message||"Could not delete 1-on-1 chat","error"),m.disabled=!1}});const w=i.querySelector("#btn-clear-chat");w&&(w.onclick=async()=>{if(s&&confirm("Are you sure you want to clear all messages in this conversation?"))try{w.disabled=!0,await Ve(`/bonding/channels/${s._id}/messages`),$("Chat messages cleared","success"),n=[],a()}catch(C){$(C.message||"Could not clear chat messages","error")}finally{w.disabled=!1}})}function de(p){const u=i.querySelector("#bonding-message-input"),l=i.querySelector("#btn-send-message"),o=i.querySelector("#btn-quick-emoji"),m=i.querySelector("#btn-input-challenge");u&&u.addEventListener("keydown",w=>{w.key==="Enter"&&!w.shiftKey&&(w.preventDefault(),be())}),l&&(l.onclick=be),m&&(m.onclick=()=>{p?A(null,p.userId||p._id):A()}),o&&(o.onclick=()=>{if(!u)return;const w=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],C=w[Math.floor(Math.random()*w.length)];u.value+=(u.value?" ":"")+C,u.focus()})}function et(){i.querySelectorAll(".btn-respond-invite").forEach(o=>{o.onclick=async()=>{const m=o.dataset.inviteId,w=o.dataset.action;await V(m,w)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(o=>{o.onclick=async()=>{const m=o.dataset.inviteId;try{o.disabled=!0;const w=await Me("/bonding/invitations"),C=(w.incoming||[]).concat(w.sent||[]).find(N=>N._id===m);C&&C.matchId?G(C.matchId):$("Match has not started yet or has expired","warning")}catch(w){$(w.message||"Could not load match","error")}finally{o.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(o=>{o.onclick=async m=>{m.stopPropagation();const w=o.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{o.disabled=!0,await Ve(`/bonding/messages/${w}`),n=n.filter(C=>C._id!==w),I(),$("Message deleted","success")}catch(C){$(C.message||"Failed to delete message","error"),o.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(o=>{o.onclick=async()=>{const m=o.dataset.msgId,w=o.dataset.emoji;await b(m,w)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(o=>{o.onclick=m=>{const w=o.dataset.msgId;H(m.currentTarget,async C=>{await b(w,C)})}})}async function be(){const p=i.querySelector("#bonding-message-input");if(!p||!s||S)return;const u=p.value.trim();if(u)try{S=!0,p.value="";const l=await ke(`/bonding/channels/${s._id}/messages`,{content:u,type:"text"});n.push(l),a(),T()}catch(l){$(l.message||"Failed to send message","error")}finally{S=!1,p.focus()}}async function b(p,u){try{const l=await ke(`/bonding/messages/${p}/react`,{emoji:u}),o=n.find(m=>m._id===p);o&&(o.reactions=l,I())}catch(l){$(l.message||"Failed to react","error")}}function T(){const p=i.querySelector("#bonding-messages-feed");p&&(p.scrollTop=p.scrollHeight)}function I(){const p=i.querySelector("#bonding-messages-feed");if(!p)return;const u=p.scrollHeight-p.scrollTop<=p.clientHeight+80;p.innerHTML=it(),et(),u&&T()}function a(){const p=i.querySelector("#bonding-messages-feed");p&&(p.innerHTML=it(),et())}async function r(p=!1){const u=i.querySelector("#bonding-lounge-main-wrap");if(u){p||(u.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const l=await Me("/bonding/games/overview");q=l;const o=l.myStats||{},m=l.availableGames||[],w=l.incomingChallenges||[],C=l.sentChallenges||[],N=l.activeMatches||[],L=l.recentMatches||[],te=e?._id||e?.id;u.innerHTML=`
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
              ${m.map(E=>`
                <div class="lounge-game-card" data-game-id="${E.id}">
                  <div class="game-card-icon">${E.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${x(E.name)}</h4>
                    <p class="game-card-desc">${x(E.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${E.duration}</span>
                      ${E.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${E.id}" data-game-title="${x(E.name)}">
                    ${E.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${w.length+C.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${w.length})</h5>
              ${w.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${w.map(E=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(E.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${x(E.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${x(E.sender.name)}</strong> (${x(E.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${E._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${E._id}" data-action="decline">
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
                    ${C.map(E=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(E.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${x(E.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${x(E.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${E._id}" data-action="cancel">
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
                <span class="badge green">${N.length} Live</span>
              </div>

              ${N.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${N.map(E=>{const J=te&&E.player1.userId.toString()===te.toString()?E.player2:E.player1,Q=te&&E.currentTurnUserId&&E.currentTurnUserId.toString()===te.toString();return`
                        <div class="lounge-active-match-card ${Q?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${E.gameType==="chess"?"♟️":E.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${x(E.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${x(J.name)}</strong> (${x(J.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${Q?"my-turn":"wait"}">
                              ${Q?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${E._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${E._id}" title="Delete Match">
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
              ${L.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${L.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${L.map(E=>{const J=te&&E.player1.userId.toString()===te.toString()?E.player2:E.player1,Q=te&&E.winnerId&&E.winnerId.toString()===te.toString(),W=E.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${x(E.gameTitle)}</span>
                          <span class="recent-date">${X(E.completedAt||E.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${E._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${x(J.name)}</strong></div>
                          <div class="recent-outcome ${Q?"win":W?"draw":"loss"}">
                            ${Q?"🏆 VICTORY":W?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${x(E.winningReason||E.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${E._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${E._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,_()}catch(l){u.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${x(l.message)}</p>
        </div>
      `}}}function _(){i.querySelectorAll(".btn-challenge-game").forEach(u=>{u.onclick=()=>{const l=u.dataset.gameId;A(l)}}),i.querySelectorAll(".btn-respond-invite").forEach(u=>{u.onclick=async()=>{const l=u.dataset.inviteId,o=u.dataset.action;await V(l,o),await r()}}),i.querySelectorAll(".btn-resume-match").forEach(u=>{u.onclick=()=>{const l=u.dataset.matchId;G(l)}}),i.querySelectorAll(".btn-recent-rematch").forEach(u=>{u.onclick=async()=>{const l=u.dataset.matchId;try{u.disabled=!0;const o=await ke(`/bonding/matches/${l}/action`,{action:"rematch"});o.match&&($("Rematch created! Opening arena ⚔️","success"),G(o.match._id))}catch(o){$(o.message||"Could not start rematch","error")}finally{u.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(u=>{u.onclick=async l=>{l.stopPropagation();const o=u.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{u.disabled=!0,await Ve(`/bonding/matches/${o}`),$("Match deleted successfully","success"),await r()}catch(m){$(m.message||"Failed to delete match","error")}finally{u.disabled=!1}}});const p=i.querySelector("#btn-clear-matches");p&&(p.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{p.disabled=!0,await Ve("/bonding/matches?filter=completed"),$("Completed matches history cleared","success"),await r()}catch(u){$(u.message||"Failed to clear matches","error")}finally{p.disabled=!1}})}function A(p=null,u=null){const l=i.querySelector("#bonding-modals-root"),o=e?._id||e?.id,m=new Set(["employee","admin","superadmin"]),w=f.filter(Q=>!Q.isSelf&&Q._id.toString()!==o?.toString()&&m.has(Q.role));let C=p||"chess",N=u?u.toString():null,L=2,te=N?[N]:[],E="none";function ue(){const Q=w.find(re=>re._id.toString()===N),W=C==="ludo",Y=L-1,ae=te.length===Y;l.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${W?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
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
              ${W?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${L===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${L===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${L===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${W?`Step 3 — Select Colleagues to Play With (${te.length}/${Y} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${w.map(re=>{const pe=W?te.includes(re._id.toString()):N===re._id.toString();return`
                      <div class="eligible-emp-item ${pe?"selected":""}" data-user-id="${re._id}">
                        <div class="emp-item-avatar">${re.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${x(re.name)}</span>
                          <span class="emp-item-role">${x(re.role==="superadmin"?"Superadmin":re.role==="admin"?"Admin":"Employee")} · ${x(re.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${pe?"active":""}">
                          ${pe?"Selected ✓":"Select"}
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
                    <label class="timer-radio-lbl ${E==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${E==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${E==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${E==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${E==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${E==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${W?`🎲 Ludo (${L} Players · 4 Pawns per base)`:C==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${W?`
                    <div><strong>Opponents:</strong> ${te.length>0?te.map(re=>{const pe=w.find(ye=>ye._id.toString()===re);return pe?`<strong>${x(pe.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+Y+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${Q?`<strong>${x(Q.name)}</strong> (${x(Q.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${C==="chess"?`<div><strong>Time Control:</strong> ${E==="none"?"Untimed":E}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(W?!ae:!N)?"disabled":""}>
                ${W?`Start ${L}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,J()}function J(){l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelector("#btn-cancel-challenge-flow").onclick=()=>{l.innerHTML=""},l.querySelectorAll(".game-pill-btn").forEach(Y=>{Y.onclick=()=>{C=Y.dataset.game,ue()}}),l.querySelectorAll(".ludo-mode-btn").forEach(Y=>{Y.onclick=()=>{L=Number(Y.dataset.count),te=te.slice(0,L-1),ue()}});const Q=l.querySelector("#flow-emp-search");Q&&(Q.oninput=Y=>{const ae=Y.target.value.toLowerCase().trim();l.querySelectorAll(".eligible-emp-item").forEach(re=>{const pe=re.textContent.toLowerCase();re.style.display=pe.includes(ae)?"flex":"none"})}),l.querySelectorAll(".eligible-emp-item").forEach(Y=>{Y.onclick=()=>{const ae=Y.dataset.userId;if(C==="ludo"){const re=L-1;te.includes(ae)?te=te.filter(pe=>pe!==ae):te.length<re?te.push(ae):te[re-1]=ae}else N=ae;ue()}}),l.querySelectorAll('input[name="timerMode"]').forEach(Y=>{Y.onchange=ae=>{E=ae.target.value,ue()}});const W=l.querySelector("#btn-submit-challenge-flow");W&&(W.onclick=async()=>{if(C==="ludo"){const Y=L-1;if(te.length<Y){$(`Please select ${Y} colleague(s) to play with`,"warning");return}try{W.disabled=!0,W.textContent="Launching Match...";const ae=await ke("/bonding/matches/instant-ludo",{playerCount:L,targetUserIds:te});l.innerHTML="",$(`Ludo match started (${L} Players)! 🎲`,"success"),ae&&ae._id&&G(ae._id)}catch(ae){$(ae.message||"Failed to start Ludo match","error"),W.disabled=!1,W.textContent=`Start ${L}P Ludo Match 🎲`}return}if(!N){$("Please select an employee to challenge","warning");return}try{W.disabled=!0,W.textContent="Sending Challenge...",await ke("/bonding/invitations",{gameType:C,targetUserId:N,matchSettings:{timerMode:E},channelId:s?._id||null}),$("Game challenge delivered! Awaiting acceptance ⚔️","success"),l.innerHTML="",s&&await we(s._id),d==="lounge_games"&&await r()}catch(Y){$(Y.message||"Could not send challenge","error"),W.disabled=!1,W.textContent="Send Challenge 🚀"}})}ue()}async function V(p,u){if(!(!p||!u))try{const l=await Wt(`/bonding/invitations/${p}/respond`,{action:u});u==="accept"?($("Challenge accepted! Entering match arena ⚔️","success"),l.match&&G(l.match._id)):u==="decline"?$("Challenge declined","info"):u==="cancel"&&$("Challenge cancelled","info"),s&&await we(s._id),d==="lounge_games"&&await r()}catch(l){$(l.message||"Action failed","error")}}async function G(p){if(!p)return;j=p,P&&clearInterval(P);const u=i.querySelector("#bonding-modals-root");let l=null,o=null,m=[];async function w(){try{return l=await Me(`/bonding/matches/${p}`),l}catch(J){return $(J.message||"Could not load match","error"),C(),null}}if(l=await w(),!l)return;function C(){P&&clearInterval(P),j=null,u.innerHTML="",d==="lounge_games"&&r(!0),s&&we(s._id,!0)}P=setInterval(async()=>{if(!j||j!==p){clearInterval(P);return}const J=l?.currentTurnUserId?.toString(),Q=l?.status,W=await w();W&&(W.currentTurnUserId?.toString()!==J||W.status!==Q||W.moves?.length!==l.moves?.length)&&N()},1500);function N(){if(!l)return;const J=e?._id||e?.id,Q=J&&l.player1.userId.toString()===J.toString(),W=Q?l.player1:l.player2,Y=Q?l.player2:l.player1,ae=J&&l.currentTurnUserId&&l.currentTurnUserId.toString()===J.toString(),re=l.status!=="active";u.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${l.gameType==="ludo"?"🎲":l.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${x(l.gameTitle)}</h3>
                  ${l.gameType==="ludo"&&l.gameState?.players?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${l.gameState.players.map(pe=>{const ye=pe.userId&&pe.userId.toString()===J?.toString(),Se={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[pe.color]||"⚪",le=(l.gameState?.turnColor||l.turn)===pe.color;return`
                          <span class="player-tag ${ye?"self":"opp"} ${le?"turn-active":""}">
                            ${Se} <strong>${x(pe.name)}</strong> ${ye?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${x(W.name)} (You · <strong>${l.gameType==="ludo"?W.assignedRole==="red"?"🔴 Red":"🟢 Green":l.gameType==="tictactoe"?W.assignedRole==="X"?"✕":"◯":W.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${x(Y.name)} (<strong>${l.gameType==="ludo"?Y.assignedRole==="red"?"🔴 Red":"🟢 Green":l.gameType==="tictactoe"?Y.assignedRole==="X"?"✕":"◯":Y.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${re?"ended":ae?"my-turn":"opp-turn"}">
                ${re?`<span>🏁 Finished (${x(l.winningReason||l.status)})</span>`:ae?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${x(Y.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${l.gameType==="ludo"?ae?l.gameState?.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":l.gameType==="tictactoe"?ae?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":ae?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${re?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${l.drawOfferedBy&&l.drawOfferedBy.toString()!==J?.toString()&&!re?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${x(Y.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${l.gameType==="chess"?L(Q):""}
              ${l.gameType==="tictactoe"?te():""}
              ${l.gameType==="ludo"?E(Q):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${re?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${l.winnerId&&l.winnerId.toString()===J?.toString()?"🏆":l.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${l.winnerId&&l.winnerId.toString()===J?.toString()?"VICTORY!":l.status==="draw"?"STALEMATE / DRAW":`${x(l.winnerName)} Wins!`}</h4>
                  <p>Reason: ${x(l.winningReason||"Match concluded")}</p>
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
      `,ue(ae,Q,W)}function L(J){const Q=l.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",W=new xa(Q),Y=J?l.player1.assignedRole==="white":l.player2.assignedRole==="white",ae={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},re=Y?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],pe=Y?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let ye='<div class="chess-board-grid">';for(const he of pe)for(const De of re){const Ie=`${De}${he}`,$e=W.get(Ie),Be=(De.charCodeAt(0)-97+he)%2!==0,Ne=o===Ie,Ue=m.includes(Ie),Ee=$e?$e.color==="w"?ae[$e.type.toUpperCase()]:ae[$e.type]:"";ye+=`
            <div class="chess-sq ${Be?"light":"dark"} ${Ne?"selected":""} ${Ue?"legal-dot":""}" data-square="${Ie}">
              ${Ee?`<span class="chess-piece ${$e.color==="w"?"white-piece":"black-piece"}">${Ee}</span>`:""}
            </div>
          `}ye+="</div>";const le=(l.moves||[]).map(he=>`
        <span class="chess-move-token">${he.moveNum}. ${he.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${ye}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${le||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function te(){const J=l.gameState?.board||Array(9).fill(null),Q=l.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${J.map((W,Y)=>{const ae=Q.includes(Y);return`
                <div class="ttt-cell ${W?"filled":"empty"} ${ae?"win-cell":""}" data-cell-idx="${Y}">
                  ${W==="X"?'<span class="ttt-x">✕</span>':W==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function E(J,Q,W){const Y=l.gameState||{},ae=Y.activeColors||["red","green"],re=Y.players||[{...l.player1,color:"red",assignedRole:"red",isBot:!1},{...l.player2,color:"green",assignedRole:"green",isBot:!1}],pe=Y.tokens||{},ye=D=>{const ee=pe[D]||(D==="red"?Y.p1Tokens:D==="green"?Y.p2Tokens:[])||[];return Array.from({length:4},(fe,ze)=>ee[ze]||{id:ze,step:-1})},Se=ye("red"),le=ye("green"),he=ye("yellow"),De=ye("blue"),Ie=e?._id||e?.id,Be=(re.find(D=>D.userId&&D.userId.toString()===Ie?.toString())||re[0])?.color||(J?"red":"green"),Ne=Y.turnColor||l.turn||"red",Ue=Be===Ne&&l.status==="active",Ee=!!Y.rolled,z=Y.dice,K=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],ge=[[7,1],[7,2],[7,3],[7,4],[7,5]],Le=[[1,7],[2,7],[3,7],[4,7],[5,7]],xe=[[7,13],[7,12],[7,11],[7,10],[7,9]],Je=[[13,7],[12,7],[11,7],[10,7],[9,7]],_t=[0,8,13,21,26,34,39,47];function Tt(D,ee){return ee<0?null:ee>=56?D==="red"?[7,6]:D==="green"?[6,7]:D==="yellow"?[7,8]:[8,7]:D==="red"?ee<=50?K[ee]:ge[ee-51]:D==="green"?ee<=50?K[(13+ee)%52]:Le[ee-51]:D==="yellow"?ee<=50?K[(26+ee)%52]:xe[ee-51]:ee<=50?K[(39+ee)%52]:Je[ee-51]}function ut(D,ee){return D!==Be||!Ue||!Ee||!z||l.status!=="active"?!1:ee.step===-1?z===6:ee.step>=0&&ee.step+z<=56}const h={},rt=(D,ee)=>{ee.forEach(fe=>{if(fe.step>=0&&fe.step<56){const ze=Tt(D,fe.step);if(ze){const Xe=ze[0]+","+ze[1];(h[Xe]=h[Xe]||[]).push({color:D,id:fe.id,step:fe.step,movable:ut(D,fe)})}}})};ae.includes("red")&&rt("red",Se),ae.includes("green")&&rt("green",le),ae.includes("yellow")&&rt("yellow",he),ae.includes("blue")&&rt("blue",De);const We={};K.forEach(([D,ee],fe)=>{We[D+","+ee]=fe});const xt={};ge.forEach(([D,ee],fe)=>{xt[D+","+ee]=fe+1});const O={};Le.forEach(([D,ee],fe)=>{O[D+","+ee]=fe+1});const gt={};xe.forEach(([D,ee],fe)=>{gt[D+","+ee]=fe+1});const Ce={};Je.forEach(([D,ee],fe)=>{Ce[D+","+ee]=fe+1});const Qe=[];for(let D=0;D<15;D++)for(let ee=0;ee<15;ee++){if(D<6&&ee<6||D<6&&ee>8||D>8&&ee<6||D>8&&ee>8||D>=6&&D<=8&&ee>=6&&ee<=8)continue;const fe=D+","+ee,ze=We[fe],Xe=ze!==void 0&&_t.includes(ze),st=D===6&&ee===1,ot=D===1&&ee===8,jt=D===8&&ee===13,zt=D===13&&ee===6,Xt=xt[fe],Rt=O[fe],At=gt[fe],Zt=Ce[fe];let tt="ludo-cell";st?tt+=" cell-red-start":ot?tt+=" cell-green-start":jt?tt+=" cell-yellow-start":zt?tt+=" cell-blue-start":Xt?tt+=" cell-red-stretch":Rt?tt+=" cell-green-stretch":At?tt+=" cell-yellow-stretch":Zt?tt+=" cell-blue-stretch":Xe&&(tt+=" cell-safe-star");const Bt=h[fe]||[];Qe.push(`
            <div class="${tt}" style="grid-row:${D+1};grid-column:${ee+1}" data-pos="${fe}">
              ${Xe?'<span class="cell-star-glyph">⭐</span>':""}
              ${st||ot||jt||zt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Bt.map(lt=>`
                <div class="ludo-token token-${lt.color} ${lt.movable?"movable":""}" data-token-id="${lt.id}" data-color="${lt.color}" title="${lt.color.toUpperCase()} Pawn ${lt.id+1}">
                  <span>${lt.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}const Jt=["","⚀","⚁","⚂","⚃","⚄","⚅"];function Ke(D){return!D||D.step===-1?"Base":D.step===56?"🏁 Home!":D.step>50?`H${D.step-50}`:`S${D.step}`}function yt(D,ee,fe,ze,Xe){const st=`${D}-yard`;return fe?`
          <div class="ludo-yard ${st} ${Ne===D?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${ee}</span>
                ${ze?`<small class="yard-player-lbl">${x(ze.name)}${ze.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${Xe.map((ot,jt)=>`
                  <div class="yard-token-slot">
                    ${ot.step===-1?`
                      <div class="ludo-token token-${D} ${ut(D,ot)?"movable":""}" data-token-id="${ot.id}" data-color="${D}" title="${D.toUpperCase()} Pawn ${ot.id+1}">
                        <span>${ot.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${jt+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `:`
            <div class="ludo-yard ${st}">
              <div class="yard-box decorative">
                <div class="yard-title">${ee} (Inactive)</div>
              </div>
            </div>
          `}const qt=re.find(D=>D.color==="red"),Z=re.find(D=>D.color==="green"),Qt=re.find(D=>D.color==="yellow"),Lt=re.find(D=>D.color==="blue");return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${yt("red","🔴 Red Base",ae.includes("red"),qt,Se)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${yt("green","🟢 Green Base",ae.includes("green"),Z,le)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${yt("blue","🔵 Blue Base",ae.includes("blue"),Lt,De)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${yt("yellow","🟡 Yellow Base",ae.includes("yellow"),Qt,he)}

            <!-- 5. Center Home Victory Zone (3x3) -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${Se.filter(D=>D.step===56).map(D=>`<span class="tok-finished red" title="Red Pawn ${D.id+1} Home">🔴${D.id+1}</span>`).join("")}
                  ${le.filter(D=>D.step===56).map(D=>`<span class="tok-finished green" title="Green Pawn ${D.id+1} Home">🟢${D.id+1}</span>`).join("")}
                  ${he.filter(D=>D.step===56).map(D=>`<span class="tok-finished yellow" title="Yellow Pawn ${D.id+1} Home">🟡${D.id+1}</span>`).join("")}
                  ${De.filter(D=>D.step===56).map(D=>`<span class="tok-finished blue" title="Blue Pawn ${D.id+1} Home">🔵${D.id+1}</span>`).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Qe.join("")}
          </div>

          <!-- Ludo Action & Dice Roller Console -->
          <div class="ludo-console">
            <div class="ludo-dice-box">
              <div class="ludo-dice-visual ${Ee?"rolled":""}">
                ${z?`<span class="dice-glyph">${Jt[z]}</span>`:"🎲"}
              </div>
              ${z?`<span class="dice-num-lbl">Rolled ${z}</span>`:'<span class="dice-num-lbl">Ready</span>'}
            </div>

            <div class="ludo-controls-box">
              ${Ue&&!Ee&&l.status==="active"?`
                <button class="btn-ludo-roll pulse" id="btn-ludo-roll">🎲 Roll Dice</button>
              `:Ue&&Ee&&l.status==="active"?`
                <div class="ludo-prompt-text highlight">
                  ${ye(Be).some(D=>ut(Be,D))?"👉 Tap your <strong>glowing pawn</strong> to advance!":"No moves possible with this roll. Turn passing..."}
                </div>
              `:`
                <div class="ludo-prompt-text">
                  ${l.status==="active"?`⏳ Waiting for ${x(re.find(D=>D.color===Ne)?.name||"opponent")} (${Ne.toUpperCase()})...`:"🏁 Match Concluded"}
                </div>
              `}

              <div class="ludo-status-banner">
                ${x(Y.lastActionText||"Match in progress.")}
              </div>
            </div>
          </div>

          <!-- Token Progress Strip for all active players -->
          <div class="ludo-progress-strip">
            ${ae.map(D=>{const ee=re.find(Xe=>Xe.color===D),fe=ye(D),ze={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[D];return`
                <div class="progress-pill ${D} ${Ne===D?"active-turn":""}">
                  <strong>${ze} ${ee?x(ee.name):D.toUpperCase()}:</strong>
                  ${fe.map((Xe,st)=>`P${st+1}: ${Ke(Xe)}`).join(" · ")}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function ue(J,Q,W){u.querySelector("#btn-close-arena").onclick=C;const Y=u.querySelector("#btn-arena-resign");Y&&(Y.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{Y.disabled=!0,await ke(`/bonding/matches/${p}/action`,{action:"resign"}),await w(),N()}catch(le){$(le.message||"Resign failed","error"),Y.disabled=!1}});const ae=u.querySelector("#btn-arena-draw");ae&&(ae.onclick=async()=>{try{await ke(`/bonding/matches/${p}/action`,{action:"offer_draw"}),$("Draw offer sent to opponent","info"),await w(),N()}catch(le){$(le.message||"Draw offer failed","error")}});const re=u.querySelector("#btn-confirm-accept-draw");re&&(re.onclick=async()=>{try{await ke(`/bonding/matches/${p}/action`,{action:"accept_draw"}),$("Draw agreed!","info"),await w(),N()}catch(le){$(le.message,"error")}});const pe=u.querySelector("#btn-confirm-decline-draw");pe&&(pe.onclick=async()=>{try{await ke(`/bonding/matches/${p}/action`,{action:"decline_draw"}),await w(),N()}catch(le){$(le.message,"error")}}),[u.querySelector("#btn-arena-delete-match"),u.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(le=>{le.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{le.disabled=!0,await Ve(`/bonding/matches/${p}`),$("Match deleted","success"),C(),d==="lounge_games"&&await r()}catch(he){$(he.message||"Failed to delete match","error"),le.disabled=!1}}});const Se=u.querySelector("#btn-arena-rematch-action");if(Se&&(Se.onclick=async()=>{try{Se.disabled=!0,Se.textContent="Creating Rematch...";const le=await ke(`/bonding/matches/${p}/action`,{action:"rematch"});le.match&&($("Rematch created! New match live ⚔️","success"),P&&clearInterval(P),G(le.match._id))}catch(le){$(le.message||"Rematch failed","error"),Se.disabled=!1,Se.textContent="🔄 Request Rematch"}}),l.gameType==="chess"&&J&&l.status==="active"){const le=l.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",he=new xa(le),De=W.assignedRole==="white"?"w":"b";u.querySelectorAll(".chess-sq").forEach(Ie=>{Ie.onclick=async()=>{const $e=Ie.dataset.square;if(o){if(o===$e){o=null,m=[],N();return}if(m.includes($e)){const Ne=he.get(o);let Ue;Ne&&Ne.type==="p"&&($e.endsWith("8")||$e.endsWith("1"))&&(Ue=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const Ee={from:o,to:$e,promotion:Ue?Ue.toLowerCase():void 0};o=null,m=[],l=await ke(`/bonding/matches/${p}/move`,{move:Ee}),N()}catch(Ee){$(Ee.message||"Illegal chess move","error"),o=null,m=[],N()}return}}const Be=he.get($e);Be&&Be.color===De?(o=$e,m=he.moves({square:$e,verbose:!0}).map(Ue=>Ue.to),N()):(o=null,m=[],N())}})}if(l.gameType==="tictactoe"&&J&&l.status==="active"&&u.querySelectorAll(".ttt-cell.empty").forEach(le=>{le.onclick=async()=>{const he=le.dataset.cellIdx;try{le.style.opacity="0.5",l=await ke(`/bonding/matches/${p}/move`,{cellIndex:Number(he)}),N()}catch(De){$(De.message||"Invalid move","error")}}}),l.gameType==="ludo"&&l.status==="active"){const le=u.querySelector("#btn-ludo-roll");le&&J&&(le.onclick=async()=>{try{le.disabled=!0,le.textContent="Rolling 🎲...",l=await ke(`/bonding/matches/${p}/move`,{action:"roll"}),N()}catch(he){$(he.message||"Failed to roll","error"),le.disabled=!1,le.textContent="🎲 Roll Dice"}}),J&&u.querySelectorAll(".ludo-token.movable").forEach(he=>{he.onclick=async De=>{De.stopPropagation();const Ie=he.dataset.tokenId;try{he.style.opacity="0.5",l=await ke(`/bonding/matches/${p}/move`,{action:"move",tokenId:Number(Ie)}),N()}catch($e){$($e.message||"Invalid token move","error"),he.style.opacity="1"}}})}}N()}function M(){if(!s||s.type==="direct")return;const p=i.querySelector("#bonding-modals-root"),u=L=>L==="employee"||L==="admin"||L==="superadmin",l=s.members||[],o=new Set(l.map(L=>L.userId?.toString())),m=f.filter(L=>u(L.role)&&!o.has(L._id.toString()));p.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${x(s.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${m.map(L=>`
                    <option value="${L._id}">${x(L.name)} (${x(L.role==="superadmin"?"Superadmin":L.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${m.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${m.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${l.length}):</label>
              <div class="bonding-members-list">
                ${l.map(L=>{const te=e?._id||e?.id,E=te&&L.userId&&L.userId.toString()===te.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(L.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${x(L.name)} ${E?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${x(L.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${L.userId}" data-name="${x(L.name)}">
                          ${E?"Leave Group":"Remove"}
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""};const w=p.querySelector("#btn-modal-delete-group");w&&(w.onclick=()=>{p.innerHTML="",U()});const C=p.querySelector("#btn-submit-add-member");C&&(C.onclick=async()=>{const te=p.querySelector("#sel-add-colleague").value;if(!te){$("Please select a colleague to add","warning");return}try{C.disabled=!0,C.textContent="Adding...";const E=await Wt(`/bonding/channels/${s._id}/members`,{action:"add",userIds:[te]});$("Colleague added to group! 🎉","success"),s=E.channel,p.innerHTML="",await we(s._id),_e()}catch(E){$(E.message||"Failed to add member","error"),C.disabled=!1,C.textContent="Add to Group"}}),p.querySelectorAll(".btn-remove-member").forEach(L=>{L.onclick=async()=>{const te=L.dataset.userId,E=L.dataset.name;if(confirm(`Are you sure you want to remove ${E} from this group?`))try{L.disabled=!0;const ue=await Wt(`/bonding/channels/${s._id}/members`,{action:"remove",userId:te});$(`${E} removed from group`,"info"),s=ue.channel,p.innerHTML="",await we(s._id),_e()}catch(ue){$(ue.message||"Failed to remove member","error"),L.disabled=!1}}})}async function U(){if(!s||s.type==="direct")return;const p=s.name;if(confirm(`Are you sure you want to delete the group "${p}"?

All messages in this lounge will be deleted.`))try{await Ve(`/bonding/channels/${s._id}`),$(`Group "${p}" deleted successfully`,"success"),c=await Me("/bonding/channels").catch(()=>[]),s=c.find(l=>l.type==="group")||c[0]||null,Fe(),_e(),s&&await we(s._id)}catch(l){$(l.message||"Failed to delete group","error")}}function F(){const p=i.querySelector("#bonding-modals-root"),u=m=>m==="employee"||m==="admin"||m==="superadmin",l=f.filter(m=>!m.isSelf&&u(m.role));p.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${l.map(m=>`
                <div class="bonding-user-pick-item" data-user-id="${m._id}" data-name="${x(m.name)}">
                  <div class="bonding-member-avatar">${m.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${x(m.name)}</span>
                    <span class="user-pick-role">${x(m.role==="superadmin"?"Superadmin":m.role==="admin"?"Admin":"Employee")} · ${x(m.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelectorAll(".bonding-user-pick-item").forEach(m=>{m.onclick=async()=>{const w=m.dataset.userId;try{const C=await ke("/bonding/channels",{type:"direct",targetUserId:w});p.innerHTML="",c=await Me("/bonding/channels"),s=c.find(N=>N._id===C._id)||C,Fe(),_e(),await we(s._id)}catch(C){$(C.message||"Failed to open personal chat","error")}}})}function v(){const p=i.querySelector("#bonding-modals-root"),u=C=>C==="employee"||C==="admin"||C==="superadmin",l=f.filter(C=>!C.isSelf&&u(C.role));p.innerHTML=`
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
                ${l.map(C=>`
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelector("#btn-cancel-create-grp").onclick=()=>{p.innerHTML=""};let o="👥";const m=p.querySelectorAll(".avatar-opt");m.forEach(C=>{C.onclick=()=>{m.forEach(N=>N.classList.remove("active")),C.classList.add("active"),o=C.textContent.trim()}});const w=p.querySelector("#btn-confirm-create-grp");w.onclick=async()=>{const C=p.querySelector("#new-group-name"),N=p.querySelector("#new-group-desc"),L=C.value.trim();if(!L){$("Please enter a group name","warning"),C.focus();return}const te=p.querySelectorAll(".new-group-member-chk:checked"),E=Array.from(te).map(ue=>ue.value);try{w.disabled=!0,w.textContent="Creating...";const ue=await ke("/bonding/channels",{type:"group",name:L,description:N.value.trim(),avatar:o,memberIds:E});$(`Group "${L}" created! 🎉`,"success"),p.innerHTML="",c=await Me("/bonding/channels"),s=c.find(J=>J._id===ue._id)||ue,Fe(),_e(),await we(s._id)}catch(ue){$(ue.message||"Failed to create group","error"),w.disabled=!1,w.textContent="Create Group 🎉"}}}function H(p,u){const l=document.querySelector(".bonding-emoji-popup");l&&l.remove();const o=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],m=document.createElement("div");m.className="bonding-emoji-popup",m.innerHTML=o.map(N=>`<button class="emoji-opt-btn" data-e="${N}">${N}</button>`).join("");const w=p.getBoundingClientRect();m.style.top=`${w.bottom+window.scrollY+6}px`,m.style.left=`${w.left+window.scrollX}px`,document.body.appendChild(m),m.querySelectorAll(".emoji-opt-btn").forEach(N=>{N.onclick=L=>{L.stopPropagation(),u(N.dataset.e),m.remove()}});const C=N=>{m.contains(N.target)||(m.remove(),document.removeEventListener("click",C))};setTimeout(()=>document.addEventListener("click",C),10)}function X(p){if(!p)return"";try{return new Date(p).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Va(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}const da=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],St=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Et=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function Xa(i,t={}){const{userRole:e="employee",currentUser:d=null,initialTicketId:c=null}=t,s=e==="superadmin"||e==="admin";if(e==="client"||d&&d.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let f=[],n={},q=[],R=[],S={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},j=null,P="comments",B=!1;i.innerHTML=`
    <div class="jira-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="jira-header-bar">
        <div class="jira-header-left">
          <div class="jira-breadcrumb">
            <span class="jira-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${s?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="jira-title-row">
            <h2 class="jira-main-title">🎫 ${s?"Support Tickets Board":"Support Tickets"}</h2>
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
            ${St.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
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
  `,await Promise.all([Ye(),qe(),dt(),vt()]),we(),Fe(),ct(),nt(),c&&et(c);const ce=setInterval(()=>{if(!document.contains(i)){clearInterval(ce);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!j&&de()},12e3),me=()=>{document.contains(i)&&!j&&de()};window.addEventListener("focus",me);async function qe(){try{const a=new URLSearchParams;S.search&&a.set("search",S.search),S.priority!=="all"&&a.set("priority",S.priority),S.category!=="all"&&a.set("category",S.category),S.assigneeId!=="all"&&a.set("assigneeId",S.assigneeId),S.jobId&&S.jobId!=="all"&&a.set("jobId",S.jobId),S.reporterId&&S.reporterId!=="all"&&a.set("reporterId",S.reporterId),S.scope==="created"&&a.set("reporterId",d?._id||d?.id),S.scope==="assigned"&&a.set("assigneeId",d?._id||d?.id),S.myIssuesOnly&&a.set("myIssuesOnly","true");const r=await Me("/tickets?"+a.toString());f=Array.isArray(r)?r:[]}catch(a){$(a.message||"Failed to load tickets",!0),f=[]}}async function Ye(){try{n=await Me("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function dt(){try{let a;try{a=await Me("/tickets/staff")}catch{a=await Me("/users")}q=(a||[]).filter(r=>r.active!==!1&&r.role!=="client")}catch(a){console.warn("Could not fetch employees:",a),q=[]}}async function vt(){try{const a=await Me("/jobs?limit=250");R=Array.isArray(a)?a:a?.jobs||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function we(){const a=i.querySelector("#jira-stats-root");a&&(a.innerHTML=`
      <div class="jira-stat-card ${S.status==="all"&&!S.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="jira-stat-val">${n.total||0}</span>
        <span class="jira-stat-lbl">Total Tickets</span>
      </div>
      <div class="jira-stat-card ${S.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="jira-stat-val">${n.toDo||0}</span>
        <span class="jira-stat-lbl">To Do</span>
      </div>
      <div class="jira-stat-card content ${S.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="jira-stat-val">${n.content??(n.inProgress||0)}</span>
        <span class="jira-stat-lbl">Content</span>
      </div>
      <div class="jira-stat-card design ${S.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="jira-stat-val">${n.design||0}</span>
        <span class="jira-stat-lbl">Design</span>
      </div>
      <div class="jira-stat-card review ${S.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="jira-stat-val">${n.underReview||0}</span>
        <span class="jira-stat-lbl">Under Review</span>
      </div>
      <div class="jira-stat-card ready ${S.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
        <span class="jira-stat-val">${n.readyToLeave??(n.resolved||n.closed||0)}</span>
        <span class="jira-stat-lbl">Ready to Leave</span>
      </div>
      <div class="jira-stat-card critical" data-stat-filter="critical">
        <span class="jira-stat-val">${n.critical||0}</span>
        <span class="jira-stat-lbl">Critical 🔴</span>
      </div>
      <div class="jira-stat-card overdue" data-stat-filter="overdue">
        <span class="jira-stat-val">${n.overdue||0}</span>
        <span class="jira-stat-lbl">Overdue ⚠️</span>
      </div>
    `,a.querySelectorAll(".jira-stat-card").forEach(r=>{r.onclick=async()=>{const _=r.dataset.statFilter;_==="all"?(S.status="all",S.priority="all"):_==="critical"?(S.priority="Critical",S.status="all"):(S.status=_,S.priority="all"),await de()}}))}function ct(){const a=i.querySelector("#jira-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${q.map(_=>`
          <option value="${_._id}" ${S.assigneeId===_._id.toString()?"selected":""}>
            ${x(_.name)} (${x(_.role)})
          </option>
        `).join("")}
      `);const r=i.querySelector("#jira-filter-job");r&&(r.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${R.map(_=>`
          <option value="${_._id}" ${S.jobId===_._id.toString()?"selected":""}>
            📁 ${x(_.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function Fe(){const a=i.querySelector("#jira-board-columns-root");if(!a)return;const r={};da.forEach(_=>{r[_.key]=[]}),f.forEach(_=>{let A=_.status||"To Do";A==="In Progress"?A="Content":A==="Resolved"?A="Under Review":A==="Closed"&&(A="Ready to Leave"),r[A]||(r[A]=[]),r[A].push(_)}),a.innerHTML=da.map(_=>{const A=r[_.key]||[];return`
        <div class="jira-board-column" data-status="${_.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${x(_.label)}</span>
              <span class="jira-col-badge">${A.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${_.key}">
            ${A.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:A.map(V=>pt(V)).join("")}
          </div>
        </div>
      `}).join(""),_e(),it()}function pt(a){const r=St.find(H=>H.key===a.category)||St[0],_=Et.find(H=>H.key===a.priority)||Et[2],A=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",V=(a.subtasks||[]).filter(H=>H.completed).length,G=(a.subtasks||[]).length,M=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],U=d?._id||d?.id,F=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(U);let v="";if(M.length===0)v='<div class="jira-avatar unassigned" title="Unassigned">?</div>';else{const H=M.slice(0,3),X=M.length-3;v=`
        <div class="jira-avatar-group">
          ${H.map(p=>`
            <div class="jira-avatar" title="Assignee: ${x(p.name||"Member")} (${x(p.role||"")})">
              ${(p.avatar||p.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${X>0?`
            <div class="jira-avatar extra-count" title="${X} more assignees: ${x(M.slice(3).map(p=>p.name).join(", "))}">
              +${X}
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
            ${F?`
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
          <button type="button" class="jira-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${x(a.ticketId)}" title="Delete Ticket">
            🗑️
          </button>
        </div>

        <div class="jira-card-title" title="${x(a.title)}">
          ${x(a.title)}
        </div>

        ${a.jobTitle||a.jobId&&a.jobId.title?`
          <div class="jira-card-job-link" title="Linked Internal Job: ${x(a.jobTitle||a.jobId.title)}">
            📁 ${x(a.jobTitle||a.jobId.title)}
          </div>
        `:""}

        <div class="jira-card-bottom">
          <div class="jira-card-id-row">
            <span class="jira-pri-icon" title="Priority: ${_.label}">${_.icon}</span>
            <span class="jira-ticket-id">${x(a.ticketId)}</span>
          </div>

          <div class="jira-card-assignee-row">
            ${G>0?`
              <span class="jira-subtask-badge" title="${V} of ${G} subtasks completed">
                ☑ ${V}/${G}
              </span>
            `:""}
            ${v}
          </div>
        </div>
      </div>
    `}function _e(){const a=i.querySelectorAll(".jira-card"),r=i.querySelectorAll(".jira-board-column");a.forEach(_=>{_.ondragstart=A=>{A.dataTransfer.setData("text/plain",_.dataset.ticketId),_.classList.add("dragging")},_.ondragend=()=>{_.classList.remove("dragging")}}),r.forEach(_=>{_.ondragover=A=>{A.preventDefault(),_.classList.add("drag-over")},_.ondragleave=()=>{_.classList.remove("drag-over")},_.ondrop=async A=>{A.preventDefault(),_.classList.remove("drag-over");const V=A.dataTransfer.getData("text/plain"),G=_.dataset.status;if(!V||!G)return;const M=f.find(F=>F._id.toString()===V);if(!M||M.status===G)return;const U=M.status;M.status=G,Fe();try{const F=await Ge(`/tickets/${V}/status`,{status:G});$(`Moved ${F.ticketId} to ${G}`,!1),await de()}catch(F){$(F.message||"Status update failed",!0),M.status=U,await de()}}})}function it(){i.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async r=>{r.stopPropagation(),r.preventDefault();const _=a.dataset.ticketId,A=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${A}?`)){a.disabled=!0;try{await Ve(`/tickets/${_}`),$(`Ticket ${A} deleted`,!1),await de()}catch(V){$(V.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),i.querySelectorAll(".jira-card").forEach(a=>{a.onclick=r=>{if(r.target.tagName==="A"||r.target.closest(".btn-delete-card-ticket"))return;const _=a.dataset.ticketId;et(_)}})}function nt(){const a=i.querySelector("#btn-jira-refresh");a&&(a.onclick=async()=>{await de(),$("Board updated",!1)});const r=i.querySelector("#btn-jira-create-ticket");r&&(r.onclick=()=>{I()});const _=i.querySelector("#jira-search-input");let A=null;_&&(_.oninput=l=>{clearTimeout(A),A=setTimeout(async()=>{S.search=l.target.value.trim(),je(),await de()},300)});const V=i.querySelector("#jira-filter-priority");V&&(V.onchange=async l=>{S.priority=l.target.value,je(),await de()});const G=i.querySelector("#jira-filter-category");G&&(G.onchange=async l=>{S.category=l.target.value,je(),await de()});const M=i.querySelector("#jira-filter-job");M&&(M.onchange=async l=>{S.jobId=l.target.value,je(),await de()});const U=i.querySelector("#jira-filter-assignee");U&&(U.onchange=async l=>{S.assigneeId=l.target.value,je(),await de()});const F=i.querySelector("#jira-pill-my-issues");F&&(F.onclick=async()=>{S.myIssuesOnly=!S.myIssuesOnly,F.classList.toggle("active",S.myIssuesOnly),je(),await de()});const v=i.querySelector("#jira-pill-scope-all"),H=i.querySelector("#jira-pill-scope-assigned"),X=i.querySelector("#jira-pill-scope-created"),p=async l=>{S.scope=l,v&&v.classList.toggle("active",l==="all"),H&&H.classList.toggle("active",l==="assigned"),X&&X.classList.toggle("active",l==="created"),je(),await de()};v&&(v.onclick=()=>p("all")),H&&(H.onclick=()=>p("assigned")),X&&(X.onclick=()=>p("created"));const u=i.querySelector("#jira-clear-filters");u&&(u.onclick=async()=>{S={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},_&&(_.value=""),V&&(V.value="all"),G&&(G.value="all");const l=i.querySelector("#jira-filter-job");l&&(l.value="all"),U&&(U.value="all"),F&&F.classList.remove("active"),v&&v.classList.add("active"),H&&H.classList.remove("active"),X&&X.classList.remove("active"),je(),await de()})}function je(){const a=i.querySelector("#jira-clear-filters");if(!a)return;const r=S.search||S.priority!=="all"||S.category!=="all"||S.jobId&&S.jobId!=="all"||S.assigneeId!=="all"||S.myIssuesOnly||S.scope&&S.scope!=="all";a.style.display=r?"inline":"none"}async function de(){await qe(),Fe()}async function et(a){const r=i.querySelector("#jira-modals-root");if(r){r.innerHTML=`
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{j=await Me(`/tickets/${a}`)}catch(_){$(_.message||"Could not load ticket",!0),r.innerHTML="";return}be()}}function be(){const a=i.querySelector("#jira-modals-root");if(!a||!j)return;const r=j,_=St.find(o=>o.key===r.category)||St[0];Et.find(o=>o.key===r.priority)||Et[2];const A=r.subtasks||[],V=A.filter(o=>o.completed).length,G=A.length>0?Math.round(V/A.length*100):0,M=r.attachments||[],U=r.comments||[],F=(r.history||[]).slice().reverse(),v=r.workLogs||[],H=r.linkedTickets||[],X=d?._id||d?.id;r.reporter&&r.reporter.userId&&String(r.reporter.userId)===String(X)||r.userId&&(String(r.userId),String(X));const p=Array.isArray(r.assignees)&&r.assignees.length>0?r.assignees:r.assignee&&r.assignee.userId?[r.assignee]:[];p.some(o=>o&&o.userId&&String(o.userId)===String(X));const u=r.jobId?._id?r.jobId._id.toString():r.jobId?r.jobId.toString():"",l=r.jobTitle||r.jobId&&r.jobId.title||"";a.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${_.slug}">${_.icon} ${_.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${x(r.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${x(r.title)}" title="Click to edit title" />
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
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${x(r.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${r.description?x(r.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
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
                    ${M.map(o=>{const m=o.type&&o.type.includes("video")||o.name&&o.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||o.url&&o.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="jira-att-card ${m?"is-video":""}" style="${m?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="jira-att-left">
                              <span style="font-size:${m?"16px":"13px"};">${m?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${o.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${x(o.name)}">
                                  ${x(o.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${Ft(o.size)} ${m?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${m?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${o.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${o.url}" download="${x(o.name)}" class="btn-jira-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="jira-att-del btn-del-att" data-att-id="${o.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${m?`
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
                  <span>Subtasks (${V}/${A.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${G}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${G}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${A.map(o=>`
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${o.id}" ${o.completed?"checked":""} />
                        <span class="jira-subtask-title ${o.completed?"done":""}">${x(o.title)}</span>
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
                  <span>Linked Work Items (${H.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${H.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${H.map(o=>`
                      <div class="jira-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${x(o.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${x(o.ticketId)}</span>
                          <span style="font-size:12.5px;color:#f1f5f9;">${x(o.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${x(o.status||"Open")}</span>
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
                    ${l?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${l?`
                  <div class="jira-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div style="font-weight:700;color:#f8fafc;font-size:13px;">${x(l)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${x(u)}</div>
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
                        <option value="${o._id}" ${u===o._id.toString()?"selected":""}>
                          📁 ${x(o.title||"Untitled Job")}
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
                    Comments (${U.length})
                  </button>
                  <button type="button" class="jira-act-tab ${P==="history"?"active":""}" data-act-tab="history">
                    History (${F.length})
                  </button>
                  <button type="button" class="jira-act-tab ${P==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${v.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${P==="comments"?`
                  <div class="jira-comments-feed">
                    ${U.map(o=>`
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(o.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${x(o.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${x(o.userRole)})</span></span>
                            <span class="jira-comment-time">${ea(o.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${x(o.content)}</div>
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
                ${P==="history"?`
                  <div class="jira-history-feed">
                    ${F.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:F.map(o=>`
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(o.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${x(o.userName)}</span>
                            <span class="jira-comment-time">${ea(o.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong style="color:#cbd5e1;">${x(o.field)}</strong>:
                            ${o.from?`<span style="text-decoration:line-through;color:#ef4444;">${x(o.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${x(o.to)}</span>
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

                    ${v.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:v.map(o=>`
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(o.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${x(o.userName)} logged <strong style="color:#38bdf8;">${x(o.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${ea(o.loggedAt)}</span>
                          </div>
                          ${o.description?`<div style="font-size:12px;color:#cbd5e1;">${x(o.description)}</div>`:""}
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
                  ${da.map(o=>{let m=r.status||"To Do";return m==="In Progress"?m="Content":m==="Resolved"?m="Under Review":m==="Closed"&&(m="Ready to Leave"),`
                      <option value="${o.key}" ${m===o.key?"selected":""}>
                        ${o.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${Et.map(o=>`
                    <option value="${o.key}" ${r.priority===o.key?"selected":""}>
                      ${o.icon} ${o.label}
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
                  `:p.map(o=>`
                    <div class="jira-assignee-chip">
                      <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(o.avatar||o.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="jira-assignee-chip-name" title="${x(o.name)}">${x(o.name)}</span>
                      ${`
                        <button type="button" class="jira-assignee-chip-remove btn-remove-assignee" data-user-id="${o.userId}" title="Remove ${x(o.name)}">&times;</button>
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
                    ${q.map(o=>{const m=p.some(w=>w&&w.userId&&String(w.userId)===String(o._id));return`
                        <label class="jira-emp-check-item ${m?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${o._id}" ${m?"checked":""} />
                          <div class="jira-avatar" style="width:18px;height:18px;font-size:9px;">${(o.name||"U").slice(0,1).toUpperCase()}</div>
                          <span style="font-size:12px;color:#f1f5f9;flex:1;">
                            ${x(o.name)} <span style="font-size:10.5px;color:#94a3b8;">(${x(o.role)})</span>
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
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${x(r.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${x(r.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${St.map(o=>`
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
                    <option value="${o._id}" ${u===o._id.toString()?"selected":""}>
                      📁 ${x(o.title||"Untitled Job")}
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
    `,b()}function b(){const a=i.querySelector("#jira-modals-root");if(!a||!j)return;const r=a.querySelector("#btn-close-jira-modal");r&&(r.onclick=T);const _=a.querySelector("#jira-detail-backdrop");_&&(_.onclick=z=>{z.target===_&&T()});const A=a.querySelector("#inp-detail-title");A&&(A.onchange=async()=>{const z=A.value.trim();if(z)try{j=await Ge(`/tickets/${j._id}`,{title:z}),await de()}catch(K){$(K.message||"Failed to update title",!0)}});const V=a.querySelector("#btn-toggle-desc-edit");V&&(V.onclick=()=>{B=!B,be()});const G=a.querySelector("#btn-cancel-desc");G&&(G.onclick=()=>{B=!1,be()});const M=a.querySelector("#btn-save-desc");M&&(M.onclick=async()=>{const z=a.querySelector("#inp-detail-desc")?.value;try{j=await Ge(`/tickets/${j._id}`,{description:z}),B=!1,be(),await de(),$("Description saved",!1)}catch(K){$(K.message||"Failed to save description",!0)}});const U=a.querySelector("#sel-detail-status");U&&(U.onchange=async z=>{try{const K=await Ge(`/tickets/${j._id}/status`,{status:z.target.value});j=K,be(),await Ye(),we(),await de(),$(`Status changed to ${K.status}`,!1)}catch(K){$(K.message||"Status change failed",!0)}});const F=a.querySelector("#sel-detail-priority");F&&(F.onchange=async z=>{try{j=await Ge(`/tickets/${j._id}`,{priority:z.target.value}),be(),await de()}catch(K){$(K.message,!0)}});const v=a.querySelector("#btn-toggle-assignee-picker"),H=a.querySelector("#jira-detail-assignee-box"),X=a.querySelector("#btn-close-detail-assignee-box"),p=a.querySelector("#btn-save-detail-assignees");v&&H&&(v.onclick=()=>{const z=H.style.display==="none";H.style.display=z?"block":"none"}),X&&H&&(X.onclick=()=>{H.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(z=>{z.onchange=()=>{z.closest(".jira-emp-check-item")?.classList.toggle("selected",z.checked)}}),p&&(p.onclick=async()=>{const z=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(K=>K.value);try{p.disabled=!0,j=await Ge(`/tickets/${j._id}`,{assigneeIds:z}),be(),await de(),$("Assignees updated!",!1)}catch(K){$(K.message,!0),p.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(z=>{z.onclick=async()=>{const K=z.dataset.userId,Le=(Array.isArray(j.assignees)&&j.assignees.length>0?j.assignees:j.assignee?.userId?[j.assignee]:[]).filter(xe=>xe&&xe.userId&&String(xe.userId)!==String(K)).map(xe=>String(xe.userId));try{j=await Ge(`/tickets/${j._id}`,{assigneeIds:Le}),be(),await de(),$("Assignee removed",!1)}catch(xe){$(xe.message,!0)}}});const u=a.querySelector("#sel-detail-category");u&&(u.onchange=async z=>{try{j=await Ge(`/tickets/${j._id}`,{category:z.target.value}),be(),await de()}catch(K){$(K.message,!0)}});const l=a.querySelector("#inp-detail-duedate");l&&(l.onchange=async z=>{try{j=await Ge(`/tickets/${j._id}`,{dueDate:z.target.value||null}),be(),await de()}catch(K){$(K.message,!0)}});const o=a.querySelector("#sel-detail-job");o&&(o.onchange=async z=>{try{j=await Ge(`/tickets/${j._id}`,{jobId:z.target.value||null}),be(),await de(),$(z.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(K){$(K.message,!0)}});const m=a.querySelector("#btn-toggle-job-link"),w=a.querySelector("#jira-job-link-box");m&&w&&(m.onclick=()=>{w.style.display=w.style.display==="none"?"block":"none"});const C=a.querySelector("#btn-cancel-job-link");C&&w&&(C.onclick=()=>{w.style.display="none"});const N=a.querySelector("#btn-save-job-link");N&&(N.onclick=async()=>{const z=a.querySelector("#inp-modal-job-select")?.value||null;try{j=await Ge(`/tickets/${j._id}`,{jobId:z}),be(),await de(),$(z?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(K){$(K.message,!0)}});const L=a.querySelector("#btn-unlink-job");L&&(L.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{j=await Ge(`/tickets/${j._id}`,{jobId:null}),be(),await de(),$("Job unlinked",!1)}catch(z){$(z.message,!0)}});const te=a.querySelector("#inp-detail-esthours");te&&(te.onchange=async z=>{try{j=await Ge(`/tickets/${j._id}`,{estimatedHours:Number(z.target.value)||0})}catch(K){$(K.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(z=>{z.onchange=async()=>{const K=z.dataset.subtaskId;try{j=await Ge(`/tickets/${j._id}/subtasks/${K}`,{completed:z.checked}),be(),await de()}catch(ge){$(ge.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(z=>{z.onclick=async()=>{const K=z.dataset.subtaskId;try{j=await Ve(`/tickets/${j._id}/subtasks/${K}`),be(),await de()}catch(ge){$(ge.message,!0)}}});const E=a.querySelector("#inp-new-subtask"),ue=a.querySelector("#btn-add-subtask"),J=async()=>{const z=E?.value.trim();if(z)try{j=await ke(`/tickets/${j._id}/subtasks`,{title:z}),be(),await de()}catch(K){$(K.message,!0)}};ue&&(ue.onclick=J),E&&(E.onkeydown=z=>{z.key==="Enter"&&(z.preventDefault(),J())});const Q=a.querySelector("#inp-detail-att-upload"),W=a.querySelector("#detail-att-upload-progress");Q&&(Q.onchange=async z=>{const K=Array.from(z.target.files);if(!K.length)return;const ge=[];W&&(W.style.display="block");for(let Le=0;Le<K.length;Le++){const xe=K[Le];W&&(W.innerHTML=`
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
                <span>Uploading <strong>${x(xe.name)}</strong> (${Ft(xe.size)})...</span>
                <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
              </div>
              <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
                <div id="att-prog-bar" style="width:0%;height:100%;background:#38bdf8;transition:width 0.15s ease;"></div>
              </div>
            `);try{const Je=await ua(xe,_t=>{const Tt=a.querySelector("#att-prog-pct"),ut=a.querySelector("#att-prog-bar");Tt&&(Tt.textContent=`${_t}%`),ut&&(ut.style.width=`${_t}%`)});Je&&ge.push({name:Je.name||xe.name,url:Je.url,size:Je.size||xe.size,type:Je.type||xe.type||"video/mp4"})}catch(Je){console.error("Upload error for file:",xe.name,Je),$(`Upload failed for ${xe.name}: ${Je.message}`,!0)}}if(W&&(W.style.display="none"),ge.length)try{j=await ke(`/tickets/${j._id}/attachments`,{attachments:ge}),be(),$(`Successfully attached ${ge.length} file(s)! 🎥`,!1)}catch(Le){$(Le.message||"Failed to attach file(s)",!0)}}),a.querySelectorAll(".btn-play-att-video").forEach(z=>{z.onclick=()=>{const K=z.dataset.slot,ge=a.querySelector("#"+K);if(ge){const Le=ge.style.display==="none";ge.style.display=Le?"block":"none",z.textContent=Le?"⏸ Close Video":"▶ Play Video";const xe=ge.querySelector("video");xe&&Le?xe.play().catch(()=>{}):xe&&xe.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(z=>{z.onclick=async()=>{const K=z.dataset.attId;try{j=await Ve(`/tickets/${j._id}/attachments/${K}`),be()}catch(ge){$(ge.message,!0)}}}),a.querySelectorAll(".jira-act-tab").forEach(z=>{z.onclick=()=>{P=z.dataset.actTab,be()}});const Y=a.querySelector("#inp-new-comment"),ae=a.querySelector("#btn-submit-comment");ae&&Y&&(ae.onclick=async()=>{const z=Y.value.trim();if(z)try{ae.disabled=!0,ae.textContent="Saving...",j=await ke(`/tickets/${j._id}/comments`,{content:z}),be(),$("Comment added",!1)}catch(K){$(K.message||"Failed to add comment",!0)}finally{ae.disabled=!1}});const re=a.querySelector("#btn-open-link-dialog"),pe=a.querySelector("#jira-link-box"),ye=a.querySelector("#btn-cancel-link"),Se=a.querySelector("#btn-submit-link"),le=a.querySelector("#inp-link-target"),he=a.querySelector("#sel-link-rel");re&&pe&&(re.onclick=()=>{pe.style.display="block"}),ye&&pe&&(ye.onclick=()=>{pe.style.display="none"}),Se&&pe&&(Se.onclick=async()=>{const z=le?.value.trim(),K=he?.value||"relates to";if(z)try{Se.disabled=!0,j=await ke(`/tickets/${j._id}/links`,{targetTicketId:z,relationship:K}),be(),$(`Linked with ${z}`,!1)}catch(ge){$(ge.message||"Failed to link ticket",!0)}finally{Se.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(z=>{z.onclick=async()=>{const K=z.dataset.linkId;try{j=await Ve(`/tickets/${j._id}/links/${K}`),be()}catch(ge){$(ge.message,!0)}}});const De=a.querySelector("#btn-open-worklog-dialog"),Ie=a.querySelector("#jira-worklog-box"),$e=a.querySelector("#btn-cancel-worklog"),Be=a.querySelector("#btn-submit-worklog"),Ne=a.querySelector("#inp-worklog-time"),Ue=a.querySelector("#inp-worklog-desc");De&&Ie&&(De.onclick=()=>{Ie.style.display="block"}),$e&&Ie&&($e.onclick=()=>{Ie.style.display="none"}),Be&&Ie&&(Be.onclick=async()=>{const z=Ne?.value.trim(),K=Ue?.value.trim();if(!z){$("Enter time spent (e.g. 2h 30m)",!0);return}try{Be.disabled=!0,j=await ke(`/tickets/${j._id}/worklogs`,{timeSpent:z,description:K}),be(),$("Work logged",!1)}catch(ge){$(ge.message||"Failed to log work",!0)}finally{Be.disabled=!1}});const Ee=a.querySelector("#btn-delete-ticket");Ee&&(Ee.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${j.ticketId}?`))try{Ee.disabled=!0,await Ve(`/tickets/${j._id}`),$(`Ticket ${j.ticketId} deleted`,!1),T(),await Ye(),we(),await de()}catch(z){$(z.message||"Failed to delete ticket",!0),Ee.disabled=!1}})}function T(){j=null,B=!1;const a=i.querySelector("#jira-modals-root");a&&(a.innerHTML="")}function I(a=null){const r=i.querySelector("#jira-modals-root");if(!r)return;const _=a||(S.jobId&&S.jobId!=="all"?S.jobId:null);r.innerHTML=`
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
                  ${St.map(w=>`<option value="${w.key}">${w.icon} ${w.label}</option>`).join("")}
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
                  ${q.map(w=>{const C=d&&String(d._id||d.id)===String(w._id);return`
                      <label class="jira-emp-check-item ${C?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${w._id}" ${C?"checked":""} />
                        <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(w.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span style="font-size:12px;color:#f1f5f9;flex:1;">
                          ${x(w.name)} <span style="font-size:10.5px;color:#94a3b8;">(${x(w.role)})${C?" — (You)":""}</span>
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
                  ${R.map(w=>`
                    <option value="${w._id}" ${_&&String(_)===String(w._id)?"selected":""}>
                      📁 ${x(w.title||"Untitled Job")}
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
    `;const A=()=>{r.querySelectorAll(".jira-emp-check-item").forEach(w=>{const C=w.querySelector(".chk-create-emp");w.classList.toggle("selected",!!C?.checked)})};r.querySelectorAll(".chk-create-emp").forEach(w=>{w.onchange=A});const V=r.querySelector("#btn-create-assign-self");V&&d&&(V.onclick=()=>{const w=String(d._id||d.id);r.querySelectorAll(".chk-create-emp").forEach(C=>{C.value===w&&(C.checked=!0)}),A()});const G=r.querySelector("#btn-create-clear-assign");G&&(G.onclick=()=>{r.querySelectorAll(".chk-create-emp").forEach(w=>{w.checked=!1}),A()});const M=[],U=r.querySelector("#inp-create-ticket-att"),F=r.querySelector("#create-att-list"),v=r.querySelector("#create-att-count"),H=r.querySelector("#create-att-progress"),X=()=>{v&&(v.textContent=`${M.length} file(s) attached`),F&&(F.innerHTML=M.map((w,C)=>{const N=w.type&&w.type.includes("video")||w.name&&w.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="jira-att-card">
            <div class="jira-att-left">
              <span>${N?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="jira-att-name" title="${x(w.name)}">${x(w.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${Ft(w.size)} ${N?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="jira-att-del btn-del-pending-att" data-idx="${C}" title="Remove">&times;</button>
          </div>
        `}).join(""),F.querySelectorAll(".btn-del-pending-att").forEach(w=>{w.onclick=()=>{M.splice(Number(w.dataset.idx),1),X()}}))};U&&(U.onchange=async w=>{const C=Array.from(w.target.files);if(C.length){H&&(H.style.display="block");for(const N of C){H&&(H.innerHTML=`
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
                <span>Uploading <strong>${x(N.name)}</strong> (${Ft(N.size)})...</span>
                <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
              </div>
              <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
                <div id="create-prog-bar" style="width:0%;height:100%;background:#38bdf8;transition:width 0.15s ease;"></div>
              </div>
            `);try{const L=await ua(N,te=>{const E=r.querySelector("#create-prog-pct"),ue=r.querySelector("#create-prog-bar");E&&(E.textContent=`${te}%`),ue&&(ue.style.width=`${te}%`)});L&&(M.push({name:L.name||N.name,url:L.url,size:L.size||N.size,type:L.type||N.type||"video/mp4"}),X())}catch(L){$(`Failed to upload ${N.name}: ${L.message}`,!0)}}H&&(H.style.display="none"),U.value=""}});const p=()=>{r.innerHTML=""},u=r.querySelector("#btn-close-create-modal");u&&(u.onclick=p);const l=r.querySelector("#btn-cancel-create-ticket");l&&(l.onclick=p);const o=r.querySelector("#jira-create-backdrop");o&&(o.onclick=w=>{w.target===o&&p()});const m=r.querySelector("#btn-submit-create-ticket");m&&(m.onclick=async()=>{const w=r.querySelector("#create-ticket-title")?.value.trim(),C=r.querySelector("#create-ticket-desc")?.value.trim(),N=r.querySelector("#create-ticket-cat")?.value||"Task",L=r.querySelector("#create-ticket-pri")?.value||"Medium",E=Array.from(r.querySelectorAll(".chk-create-emp:checked")).map(Q=>Q.value),ue=r.querySelector("#create-ticket-duedate")?.value||null,J=r.querySelector("#create-ticket-job")?.value||null;if(!w){$("Ticket summary / title is required",!0);return}try{m.disabled=!0,m.textContent="Creating...";const Q=await ke("/tickets",{title:w,description:C,category:N,priority:L,assigneeIds:E,assigneeId:E[0]||null,dueDate:ue,jobId:J,attachments:M});$(`Ticket ${Q.ticketId} created! 🎫`,!1),p(),await Ye(),we(),await de(),et(Q._id)}catch(Q){$(Q.message||"Could not create ticket",!0),m.disabled=!1,m.textContent="Create Ticket 🚀"}})}i._openCreateTicketModal=I,i._openTicketDetailModal=et,i._setJobFilter=async a=>{S.jobId=a||"all";const r=i.querySelector("#jira-filter-job");r&&(r.value=S.jobId),je(),await de()}}export{Xa as a,Qa as b,Ja as i};
