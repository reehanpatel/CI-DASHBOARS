var fa=Object.defineProperty;var ma=(r,t,e)=>t in r?fa(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var ge=(r,t,e)=>ma(r,typeof t!="symbol"?t+"":t,e);import{c as Pe,h as I,e as T,n as ha,j as je,o as mt,k as yt,g as we}from"./api-Chk_3u1-.js";const Gt={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function va(){try{const r=localStorage.getItem("ci360_planner_settings");if(r)return Object.assign({},Gt,JSON.parse(r))}catch{}return Object.assign({},Gt)}function xa(r){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(r))}catch{}}function qe(){const r=new Date,t=r.getFullYear(),e=String(r.getMonth()+1).padStart(2,"0"),i=String(r.getDate()).padStart(2,"0");return`${t}-${e}-${i}`}function ht(r,t){const e=new Date(r+"T00:00:00");e.setDate(e.getDate()+t);const i=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${i}-${o}-${n}`}function st(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function We(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function Wt(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function $t(r,t=1){const e=new Date(r+"T00:00:00"),i=e.getDay(),o=(i<t?7:0)+i-t,n=new Date(e);n.setDate(e.getDate()-o);const p=[];for(let a=0;a<7;a++){const h=new Date(n);h.setDate(n.getDate()+a);const $=h.getFullYear(),A=String(h.getMonth()+1).padStart(2,"0"),B=String(h.getDate()).padStart(2,"0");p.push(`${$}-${A}-${B}`)}return p}function ya(){try{const r=window.AudioContext||window.webkitAudioContext;if(!r)return;const t=new r,e=t.currentTime,i=t.createOscillator(),o=t.createGain();i.type="sine",i.frequency.setValueAtTime(523.25,e),i.frequency.exponentialRampToValueAtTime(783.99,e+.15),o.gain.setValueAtTime(.2,e),o.gain.exponentialRampToValueAtTime(.001,e+.35),i.connect(o),o.connect(t.destination),i.start(e),i.stop(e+.35)}catch{}}function Va(r,t={}){const{userRole:e="employee",currentUser:i=null,onNavigate:o=null}=t,n=e==="superadmin"||e==="admin";let p=va(),a={selectedDate:qe(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};wa(),h();async function h(){a.loading=!0,$();try{const s=[Pe("/tasks")];n&&s.push(Pe("/personnel").catch(()=>[]));const[x,S]=await Promise.all(s);a.tasks=Array.isArray(x)?x:[],S&&(a.personnelList=Array.isArray(S)?S:[])}catch(s){I("Failed to load planner tasks: "+s.message,!0)}finally{a.loading=!1,K()}}function $(){r.innerHTML=`
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
    `}function A(s){return a.tasks.filter(x=>{var w;if(x.isDeleted===!0)return!1;if(n&&a.selectedPersonnelId!=="all"){const y=((w=x.personnelId)==null?void 0:w._id)||x.personnelId;if(String(y)!==String(a.selectedPersonnelId))return!1}const S=x.dateStr||(x.dueDate?new Date(x.dueDate).toISOString().slice(0,10):"");return S?S===s:s===qe()})}function B(s,x){if(s.status==="Completed")return!1;const S=s.dateStr||(s.dueDate?new Date(s.dueDate).toISOString().slice(0,10):"");return S?S<x:!1}function C(s,x){const S=s.length,w=s.filter(Q=>Q.status==="Completed").length,y=s.filter(Q=>Q.status==="In Progress").length,M=s.filter(Q=>Q.status==="Pending"||Q.status==="Todo").length,U=s.filter(Q=>B(Q,x)).length,Z=S>0?Math.round(w/S*100):0;return{total:S,completed:w,inProgress:y,pending:M,overdue:U,percent:Z}}function K(){const s=qe(),x=a.selectedDate===s,S=A(a.selectedDate),w=C(S,s);r.innerHTML=`
      <div class="ci360-planner-wrap ${p.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${We(a.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${T(p.displayName||"Daily Planner")}</h1>
              <p class="ci360-planner-subheading">Plan your day. Track your progress.</p>
            </div>
          </div>

          <div class="ci360-planner-header-actions">
            <!-- View Mode Switcher -->
            <div class="ci360-view-switcher" role="tablist">
              <button type="button" class="ci360-switch-btn ${a.viewMode==="daily"?"active":""}" id="btnViewDaily" title="Daily View">
                <span>📅 Daily</span>
              </button>
              <button type="button" class="ci360-switch-btn ${a.viewMode==="weekly"?"active":""}" id="btnViewWeekly" title="Weekly View">
                <span>🗓️ Weekly</span>
              </button>
              <button type="button" class="ci360-switch-btn ${a.viewMode==="report"?"active":""}" id="btnViewReport" title="Weekly Analytics & Report">
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
              <span class="date-text" id="displayDateLabel">${st(a.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${a.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${x?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${n?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${a.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${a.personnelList.map(y=>`
                  <option value="${y._id}" ${a.selectedPersonnelId===String(y._id)?"selected":""}>
                    ${T(y.name)} (${T(y.department||y.role||"Team")})
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
              <div class="ci360-circular-progress" style="--val: ${w.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${w.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${w.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <span class="kpi-num">${w.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${w.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${w.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${w.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${w.overdue>0?`
                <div class="kpi-box overdue">
                  <span class="kpi-num">${w.overdue}</span>
                  <span class="kpi-label">Overdue</span>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${w.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${O(S,w)}
        </main>

      </div>
    `,fe(),rt()}function O(s,x){return a.viewMode==="weekly"?nt():a.viewMode==="report"?Qe():pe(s,x)}function pe(s,x){const S=qe();let w=s;if(a.filterStatus==="pending"?w=w.filter(y=>y.status==="Pending"||y.status==="Todo"):a.filterStatus==="in_progress"?w=w.filter(y=>y.status==="In Progress"):a.filterStatus==="completed"?w=w.filter(y=>y.status==="Completed"):a.filterStatus==="overdue"&&(w=w.filter(y=>B(y,S))),a.searchQuery){const y=a.searchQuery.toLowerCase();w=w.filter(M=>(M.title||"").toLowerCase().includes(y)||(M.description||"").toLowerCase().includes(y)||(M.category||"").toLowerCase().includes(y))}return w.sort((y,M)=>{if(y.status==="Completed"&&M.status!=="Completed")return 1;if(y.status!=="Completed"&&M.status==="Completed")return-1;const U={Urgent:0,High:1,Medium:2,Low:3};return(U[y.priority]||2)-(U[M.priority]||2)}),`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              Today's Focus
            </h2>
            <span class="ci360-task-count-badge">${w.length} ${w.length===1?"task":"tasks"}</span>
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${a.filterStatus==="all"?"active":""}" data-f="all">All (${x.total})</button>
              <button type="button" class="filter-pill ${a.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${x.pending})</button>
              <button type="button" class="filter-pill ${a.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${x.inProgress})</button>
              <button type="button" class="filter-pill ${a.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${x.completed})</button>
              ${x.overdue>0?`
                <button type="button" class="filter-pill overdue ${a.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${x.overdue})</button>
              `:""}
            </div>

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${T(a.searchQuery)}">
              ${a.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card -->
        <div class="ci360-quick-add-bar">
          <div class="ci360-quick-add-input-wrap">
            <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${We(a.selectedDate)}... (Press Enter to save)">
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
          ${w.length===0?le():`
            <div class="ci360-task-list">
              ${w.map(y=>$e(y,S)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function le(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${We(a.selectedDate)}</h3>
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
    `}function $e(s,x){var U,Z,Q,z;const S=s.status==="Completed",w=B(s,x),y=`pri-${(s.priority||"medium").toLowerCase()}`,M=`status-${(s.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${S?"is-completed":""} ${w?"is-overdue":""}" data-id="${s._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${S?"checked":""}" data-action="toggle" data-id="${s._id}" title="${S?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${T(s.title)}</span>
          </div>

          ${s.description?`
            <div class="ci360-task-desc">${T(s.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${y}">
              <span class="badge-dot"></span>
              ${T(s.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${M}">
              ${T(s.status||"Pending")}
            </span>

            <!-- Category -->
            ${s.category?`
              <span class="ci360-badge category-badge">
                #${T(s.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${s.startTime||s.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${s.startTime?T(s.startTime):""}
                   ${s.startTime&&s.dueTime?"–":""}
                   ${s.dueTime?T(s.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${w?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${n&&((U=s.personnelId)!=null&&U.name||(Z=s.userId)!=null&&Z.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${T(((Q=s.personnelId)==null?void 0:Q.name)||((z=s.userId)==null?void 0:z.name))}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${s._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${s._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function nt(){const s=$t(a.selectedDate,p.weekStartsOn),x=We(s[0]),S=We(s[6]),w=qe();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${x} – ${S}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${s.map(y=>{const M=y===w,U=y===a.selectedDate,Z=A(y),Q=C(Z,w);return`
              <div class="ci360-day-column ${M?"is-today":""} ${U?"is-selected":""}" data-date="${y}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${y}">
                  <div class="day-name">${Wt(y)}</div>
                  <div class="day-number">${new Date(y+"T00:00:00").getDate()}</div>
                  ${M?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${Q.completed}/${Q.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${Q.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${Z.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:Z.map(z=>`
                    <div class="ci360-mini-task-card ${z.status==="Completed"?"done":""}" data-id="${z._id}">
                      <button type="button" class="mini-check ${z.status==="Completed"?"checked":""}" data-action="toggle" data-id="${z._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${z._id}">
                        <div class="mini-title">${T(z.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(z.priority||"medium").toLowerCase()}">${z.priority||"Med"}</span>
                          ${z.dueTime?`<span class="mini-time">${T(z.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button -->
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${y}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function Qe(){const s=$t(a.selectedDate,p.weekStartsOn),x=st(s[0]),S=st(s[6]),w=qe(),y=a.tasks.filter(F=>{if(F.isDeleted===!0)return!1;const L=F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):"");return s.includes(L)}),M=y.length,U=y.filter(F=>F.status==="Completed").length,Z=y.filter(F=>F.status==="In Progress").length,Q=M>0?Math.round(U/M*100):0,z={Urgent:0,High:0,Medium:0,Low:0};return y.forEach(F=>{const L=F.priority||"Medium";z[L]!==void 0&&z[L]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${x} – ${S}</div>
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
            <span class="value" style="font-size:28px">${M}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${U}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${Z}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${Q}%</span>
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
                ${s.map(F=>{const L=A(F),v=C(L,w);return`
                    <tr>
                      <td><strong>${Wt(F)}</strong></td>
                      <td>${We(F)}</td>
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
              <div style="font-size:22px;font-weight:700">${z.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${z.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${z.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${z.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function fe(){const s=document.getElementById("btnViewDaily"),x=document.getElementById("btnViewWeekly"),S=document.getElementById("btnViewReport");s&&(s.onclick=()=>{a.viewMode="daily",K()}),x&&(x.onclick=()=>{a.viewMode="weekly",K()}),S&&(S.onclick=()=>{a.viewMode="report",K()});const w=document.getElementById("btnPrevDay"),y=document.getElementById("btnNextDay"),M=document.getElementById("btnJumpToday"),U=document.getElementById("hiddenDateInput"),Z=document.getElementById("datePickerBadge");w&&(w.onclick=()=>{a.selectedDate=ht(a.selectedDate,-1),K()}),y&&(y.onclick=()=>{a.selectedDate=ht(a.selectedDate,1),K()}),M&&(M.onclick=()=>{a.selectedDate=qe(),K()}),Z&&U&&(Z.onclick=()=>{try{typeof U.showPicker=="function"?U.showPicker():U.focus()}catch{U.focus()}},U.onchange=ie=>{ie.target.value&&(a.selectedDate=ie.target.value,K())});const Q=document.getElementById("admTeamSelect");Q&&(Q.onchange=ie=>{a.selectedPersonnelId=ie.target.value,K()});const z=document.getElementById("btnOpenAddTaskModal");z&&(z.onclick=()=>me());const F=document.getElementById("btnPlannerActionsMenu"),L=document.getElementById("plannerActionsDropdown");F&&L&&(F.onclick=ie=>{ie.stopPropagation(),L.classList.toggle("hidden")},document.addEventListener("click",ie=>{!L.contains(ie.target)&&ie.target!==F&&L.classList.add("hidden")}));const v=document.getElementById("btnActionImport");v&&(v.onclick=()=>{L==null||L.classList.add("hidden"),Ne()});const ae=document.getElementById("btnActionExportPng");ae&&(ae.onclick=()=>{L==null||L.classList.add("hidden"),Fe()});const re=document.getElementById("btnActionExportPdf");re&&(re.onclick=()=>{L==null||L.classList.add("hidden"),Ye()});const de=document.getElementById("btnActionBackup");de&&(de.onclick=()=>{L==null||L.classList.add("hidden"),Je()});const ne=document.getElementById("btnActionSettings");ne&&(ne.onclick=()=>{L==null||L.classList.add("hidden"),Xe()})}function rt(s){if(a.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(z=>{z.onclick=()=>{a.filterStatus=z.dataset.f,K()}});const x=document.getElementById("plannerTaskSearchInp");x&&(x.oninput=z=>{a.searchQuery=z.target.value,K()});const S=document.getElementById("btnClearSearch");S&&(S.onclick=()=>{a.searchQuery="",K()});const w=document.getElementById("quickAddTitleInp"),y=document.getElementById("quickAddPriority"),M=document.getElementById("quickAddCategory"),U=document.getElementById("btnQuickAddSubmit"),Z=async()=>{const z=((w==null?void 0:w.value)||"").trim();if(!z){I("Please enter a task title",!0),w==null||w.focus();return}try{const F={title:z,dateStr:a.selectedDate,priority:(y==null?void 0:y.value)||p.defaultPriority,category:(M==null?void 0:M.value)||"General",status:"Pending"};n&&a.selectedPersonnelId!=="all"&&(F.personnelId=a.selectedPersonnelId);const L=await we("/tasks",F);a.tasks.unshift(L),I("Task added to today's focus! ✨"),w&&(w.value="",w.focus()),K()}catch(F){I(F.message,!0)}};U&&(U.onclick=Z),w&&(w.onkeydown=z=>{z.key==="Enter"&&Z()});const Q=document.getElementById("btnEmptyStateImport");Q&&(Q.onclick=()=>Ne())}if(a.viewMode==="weekly"){const x=document.getElementById("btnPrevWeek"),S=document.getElementById("btnNextWeek"),w=document.getElementById("btnThisWeek");x&&(x.onclick=()=>{a.selectedDate=ht(a.selectedDate,-7),K()}),S&&(S.onclick=()=>{a.selectedDate=ht(a.selectedDate,7),K()}),w&&(w.onclick=()=>{a.selectedDate=qe(),K()}),document.querySelectorAll(".day-col-header").forEach(y=>{y.onclick=()=>{a.selectedDate=y.dataset.date,a.viewMode="daily",K()}}),document.querySelectorAll('[data-action="add-day"]').forEach(y=>{y.onclick=()=>{me(null,y.dataset.date)}})}if(a.viewMode==="report"){const x=document.getElementById("btnDownloadWeeklyPdf");x&&(x.onclick=Ye)}r.querySelectorAll('[data-action="toggle"]').forEach(x=>{x.onclick=async S=>{S.stopPropagation();const w=x.dataset.id;await Ie(w)}}),r.querySelectorAll('[data-action="edit"]').forEach(x=>{x.onclick=S=>{S.stopPropagation();const w=x.dataset.id,y=a.tasks.find(M=>M._id===w);y&&me(y)}}),r.querySelectorAll('[data-action="delete"]').forEach(x=>{x.onclick=async S=>{S.stopPropagation();const w=x.dataset.id;await dt(w)}})}async function Ie(s){const x=a.tasks.find(w=>w._id===s);if(!x)return;const S=x.status!=="Completed";try{const w=await ha(`/tasks/${s}/toggle`,{}),y=a.tasks.findIndex(M=>M._id===s);y!==-1&&(a.tasks[y]=w),S?(p.soundEnabled&&ya(),I("Task marked as completed! 🎉")):I("Task reopened as pending."),K()}catch(w){I(w.message,!0)}}async function dt(s){const x=a.tasks.find(S=>S._id===s);if(x&&confirm(`Are you sure you want to remove "${x.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await je(`/tasks/${s}`),a.tasks=a.tasks.filter(S=>S._id!==s),I("Task removed from planner (safely stored in database archive)"),K()}catch(S){I(S.message,!0)}}function me(s=null,x=null){const S=!!s,w=s?s.dateStr||(s.dueDate?new Date(s.dueDate).toISOString().slice(0,10):a.selectedDate):x||a.selectedDate,y=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${S?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${T((s==null?void 0:s.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${T((s==null?void 0:s.description)||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${w}" required>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${(s==null?void 0:s.startTime)||""}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${(s==null?void 0:s.dueTime)||""}">
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${(s==null?void 0:s.priority)==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!s&&p.defaultPriority==="Medium"||(s==null?void 0:s.priority)==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!s&&p.defaultPriority==="High"||(s==null?void 0:s.priority)==="High"?"selected":""}>High</option>
                <option value="Urgent" ${(s==null?void 0:s.priority)==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${(s==null?void 0:s.status)==="Pending"||(s==null?void 0:s.status)==="Todo"||!s?"selected":""}>Pending</option>
                <option value="In Progress" ${(s==null?void 0:s.status)==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${(s==null?void 0:s.status)==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${T((s==null?void 0:s.category)||"General")}">
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
                <option value="all" ${!s||s!=null&&s.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${a.personnelList.map(F=>{var v;const L=((v=s==null?void 0:s.personnelId)==null?void 0:v._id)===F._id||(s==null?void 0:s.personnelId)===F._id;return`<option value="${F._id}" ${L?"selected":""}>${T(F.name)} (${T(F.department||F.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
            <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
              ${S?"Save Changes":"Create Task"}
            </button>
          </div>
        </form>
      </div>
    `,M=mt(y),U=M.querySelector("#taskForm"),Z=M.querySelector("#btnModalClose"),Q=M.querySelector("#btnCancelModal"),z=()=>M.remove();Z&&(Z.onclick=z),Q&&(Q.onclick=z),U.onsubmit=async F=>{var k;F.preventDefault();const L=M.querySelector("#taskTitle").value.trim(),v=M.querySelector("#taskDesc").value.trim(),ae=M.querySelector("#taskDate").value,re=M.querySelector("#taskStartTime").value.trim(),de=M.querySelector("#taskDueTime").value.trim(),ne=M.querySelector("#taskPriority").value,ie=M.querySelector("#taskStatus").value,c=M.querySelector("#taskCategory").value.trim()||"General";if(!L){I("Task title is required",!0);return}const g={title:L,description:v,dateStr:ae,startTime:re,dueTime:de,priority:ne,status:ie,category:c};if(n){const m=(k=M.querySelector("#taskAssignee"))==null?void 0:k.value;m==="all"?(g.assignAll=!0,g.personnelId="all"):m&&(g.personnelId=m)}const d=M.querySelector("#btnSaveTask");d.disabled=!0,d.textContent="Saving...";try{if(S){const m=await yt(`/tasks/${s._id}`,g),E=a.tasks.findIndex(_=>_._id===s._id);E!==-1&&(a.tasks[E]=m),I("Task updated successfully! ✍️")}else{const m=await we("/tasks",g);Array.isArray(m.tasks)?m.tasks.forEach(E=>a.tasks.unshift(E)):a.tasks.unshift(m),I("Task created successfully! ✨")}z(),K()}catch(m){I(m.message,!0),d.disabled=!1,d.textContent=S?"Save Changes":"Create Task"}}}function Ne(){let s=[];const x=`
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
              <input type="date" id="importTargetDate" class="input" value="${a.selectedDate}">
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
    `,S=mt(x),w=()=>S.remove();S.querySelector("#btnImportClose").onclick=w,S.querySelector("#btnCancelImport").onclick=w;const y=S.querySelector("#importTextarea"),M=S.querySelector("#importFileInput"),U=S.querySelector("#importDropzone"),Z=S.querySelector("#previewListArea"),Q=S.querySelector("#previewCountLabel"),z=S.querySelector("#btnConfirmImport"),F=S.querySelector("#importFileInfo");function L(ae){if(!ae)return[];const re=ae.split(/\r?\n/),de=[];for(let ne of re)ne=ne.trim(),ne&&(ne=ne.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),ne=ne.replace(/^[-*•]\s+/,""),ne=ne.replace(/^\d+[\.\)]\s+/,""),ne=ne.trim(),ne&&de.push(ne));return de}function v(){const ae=y.value,re=L(ae),de=S.querySelector("#importTargetDate").value,ne=A(de),ie=new Set(ne.map(c=>(c.title||"").trim().toLowerCase()));s=[];for(const c of re){const g=ie.has(c.toLowerCase());s.push({title:c,isDuplicate:g})}if(Q.textContent=`Preview (${s.length} ${s.length===1?"task":"tasks"} found)`,z.disabled=s.length===0,z.textContent=`Import ${s.length} ${s.length===1?"Task":"Tasks"}`,s.length===0){Z.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}Z.innerHTML=s.map((c,g)=>`
        <div class="preview-item ${c.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${g+1}.</span>
          <span class="preview-title">${T(c.title)}</span>
          ${c.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}y.oninput=v,U.onclick=()=>M.click(),M.onchange=ae=>{const re=ae.target.files[0];if(!re)return;F.textContent=`File selected: ${re.name} (${Math.round(re.size/1024)} KB)`;const de=new FileReader;de.onload=ne=>{y.value=ne.target.result,v()},de.readAsText(re)},U.ondragover=ae=>{ae.preventDefault(),U.classList.add("dragover")},U.ondragleave=()=>U.classList.remove("dragover"),U.ondrop=ae=>{ae.preventDefault(),U.classList.remove("dragover");const re=ae.dataTransfer.files[0];if(re&&(re.type==="text/plain"||re.name.endsWith(".txt"))){F.textContent=`File dropped: ${re.name}`;const de=new FileReader;de.onload=ne=>{y.value=ne.target.result,v()},de.readAsText(re)}else I("Please drop a valid .txt plain-text file",!0)},z.onclick=async()=>{if(s.length===0)return;z.disabled=!0,z.textContent="Importing...";const ae=S.querySelector("#importTargetDate").value,re=S.querySelector("#importPriority").value,de=S.querySelector("#importCategory").value.trim()||"General",ne={date:ae,tasks:s.map(ie=>({title:ie.title,priority:re,category:de,status:"Pending"}))};n&&a.selectedPersonnelId!=="all"&&(ne.personnelId=a.selectedPersonnelId);try{const ie=await we("/tasks/bulk-import",ne);Array.isArray(ie.tasks)&&ie.tasks.forEach(c=>a.tasks.unshift(c)),I(`Imported ${ie.importedCount} tasks successfully! (${ie.skippedCount} skipped duplicates)`),w(),a.selectedDate=ae,K()}catch(ie){I(ie.message,!0),z.disabled=!1,z.textContent="Retry Import"}}}async function Fe(){const s=A(a.selectedDate),x=C(s,qe()),S=st(a.selectedDate),w=2,y=800,M=160,U=90,Z=65,Q=70,z=Math.max(120,s.length*Z),F=M+U+z+Q,L=document.createElement("canvas");L.width=y*w,L.height=F*w;const v=L.getContext("2d");v.scale(w,w);const ae=document.documentElement.getAttribute("data-theme")==="dark",re=ae?"#0F172A":"#F8FAFC",de=ae?"#1E293B":"#FFFFFF",ne=ae?"#334155":"#E2E8F0",ie=ae?"#F8FAFC":"#0F172A",c=ae?"#94A3B8":"#475569",g="#4F46E5",d="#10B981",k="#F59E0B";v.fillStyle=re,v.fillRect(0,0,y,F),v.fillStyle=de,Be(v,24,20,y-48,M-30,16),v.fill(),v.strokeStyle=ne,v.lineWidth=1,v.stroke(),v.fillStyle=g,v.font="bold 12px Inter, sans-serif",v.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),v.fillStyle=ie,v.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',v.fillText(S,44,86),v.fillStyle=c,v.font="13px Inter, sans-serif",v.fillText(`Planned focus list · ${x.completed} of ${x.total} tasks completed (${x.percent}%)`,44,114);const m=M+6;v.fillStyle=de,Be(v,24,m,y-48,U-16,12),v.fill(),v.stroke();const E=[{label:"TOTAL TASKS",val:String(x.total),color:ie},{label:"COMPLETED",val:String(x.completed),color:d},{label:"IN PROGRESS",val:String(x.inProgress),color:k},{label:"PENDING",val:String(x.pending),color:c},{label:"PROGRESS",val:`${x.percent}%`,color:g}],_=(y-48)/E.length;E.forEach((j,D)=>{const q=24+D*_+20;v.fillStyle=j.color,v.font="bold 20px Inter, sans-serif",v.fillText(j.val,q,m+36),v.fillStyle=c,v.font="10px Inter, sans-serif",v.fillText(j.label,q,m+54)});const R=m+U;v.fillStyle=de,Be(v,24,R,y-48,z+10,16),v.fill(),v.stroke(),s.length===0?(v.fillStyle=c,v.font="14px Inter, sans-serif",v.textAlign="center",v.fillText("No scheduled tasks recorded for this date.",y/2,R+60),v.textAlign="left"):s.forEach((j,D)=>{const q=R+16+D*Z,X=j.status==="Completed";v.beginPath(),v.arc(48,q+14,10,0,Math.PI*2),X?(v.fillStyle=d,v.fill(),v.strokeStyle="#FFFFFF",v.lineWidth=2,v.beginPath(),v.moveTo(44,q+14),v.lineTo(47,q+17),v.lineTo(52,q+11),v.stroke()):(v.strokeStyle=ne,v.lineWidth=2,v.stroke()),v.fillStyle=X?c:ie,v.font=`${X?"normal":"500"} 14px Inter, sans-serif`;const Y=j.title.length>55?j.title.slice(0,52)+"...":j.title;if(v.fillText(Y,70,q+18),X){const Me=v.measureText(Y);v.strokeStyle=c,v.lineWidth=1.2,v.beginPath(),v.moveTo(70,q+14),v.lineTo(70+Me.width,q+14),v.stroke()}const ee=j.priority||"Medium";let te="#E2E8F0",ce="#334155";ee==="Urgent"?(te="#FEE2E2",ce="#DC2626"):ee==="High"?(te="#FEF3C7",ce="#D97706"):ee==="Low"&&(te="#ECFDF5",ce="#059669"),v.fillStyle=te,Be(v,y-150,q+4,60,20,10),v.fill(),v.fillStyle=ce,v.font="bold 10px Inter, sans-serif",v.fillText(ee,y-138,q+18);const Te=j.dueTime?`🕒 ${j.dueTime}`:j.category||"General";v.fillStyle=c,v.font="11px Inter, sans-serif",v.fillText(Te,70,q+34),D<s.length-1&&(v.strokeStyle=ne,v.lineWidth=.6,v.beginPath(),v.moveTo(40,q+48),v.lineTo(y-40,q+48),v.stroke())});const N=F-35;v.fillStyle=c,v.font="11px Inter, sans-serif",v.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,N);try{const j=L.toDataURL("image/png"),D=document.createElement("a");D.href=j,D.download=`ci360-daily-planner-${a.selectedDate}.png`,document.body.appendChild(D),D.click(),D.remove(),I("Daily Planner image exported! 🖼️")}catch(j){I("Failed to export image: "+j.message,!0)}}function Be(s,x,S,w,y,M){s.beginPath(),s.moveTo(x+M,S),s.lineTo(x+w-M,S),s.quadraticCurveTo(x+w,S,x+w,S+M),s.lineTo(x+w,S+y-M),s.quadraticCurveTo(x+w,S+y,x+w-M,S+y),s.lineTo(x+M,S+y),s.quadraticCurveTo(x,S+y,x,S+y-M),s.lineTo(x,S+M),s.quadraticCurveTo(x,S,x+M,S),s.closePath()}function Ye(){const s=$t(a.selectedDate,p.weekStartsOn),x=st(s[0]),S=st(s[6]);qe();const w=a.tasks.filter(z=>{if(z.isDeleted===!0)return!1;const F=z.dateStr||(z.dueDate?new Date(z.dueDate).toISOString().slice(0,10):"");return s.includes(F)}),y=w.length,M=w.filter(z=>z.status==="Completed").length,U=y>0?Math.round(M/y*100):0,Z=window.open("","_blank");if(!Z){I("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const Q=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${x}</title>
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
            <div class="period">${x} – ${S}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${y}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${M}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${y-M}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${U}%</div>
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
            ${s.map(z=>{const F=A(z);return F.length===0?`<tr><td><strong>${We(z)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:F.map(L=>`
                <tr>
                  <td><strong>${We(z)}</strong></td>
                  <td>${T(L.title)}</td>
                  <td><span class="badge badge-${(L.priority||"medium").toLowerCase().slice(0,3)}">${L.priority||"Medium"}</span></td>
                  <td>${T(L.category||"General")}</td>
                  <td>${L.dueTime||L.startTime||"—"}</td>
                  <td class="${L.status==="Completed"?"done":""}">${L.status||"Pending"}</td>
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
    `;Z.document.write(Q),Z.document.close(),I("Weekly PDF report generated for printing! 📄")}function Je(){const x=mt(`
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
    `),S=()=>x.remove();x.querySelector("#btnBackupClose").onclick=S;const w=x.querySelector("#btnDownloadBackupJson");w.onclick=async()=>{w.disabled=!0,w.textContent="Generating backup...";try{const z=await Pe("/tasks/backup"),F=new Blob([JSON.stringify(z,null,2)],{type:"application/json"}),L=URL.createObjectURL(F),v=document.createElement("a");v.href=L,v.download=`ci360-planner-backup-${qe()}.json`,document.body.appendChild(v),v.click(),v.remove(),I("Planner backup downloaded successfully! 💾")}catch(z){I("Backup export failed: "+z.message,!0)}finally{w.disabled=!1,w.textContent="Download JSON Backup"}};const y=x.querySelector("#restoreFileInput"),M=x.querySelector("#restorePreviewArea"),U=x.querySelector("#restoreCountText"),Z=x.querySelector("#btnExecuteRestore");let Q=null;y.onchange=z=>{const F=z.target.files[0];if(!F)return;const L=new FileReader;L.onload=v=>{try{const ae=JSON.parse(v.target.result),re=Array.isArray(ae.tasks)?ae.tasks:Array.isArray(ae)?ae:null;if(!re||re.length===0){I("Invalid backup file: No tasks found",!0);return}Q=re,M.style.display="block",U.textContent=`Valid backup: ${re.length} tasks ready to restore.`,Z.disabled=!1}catch(ae){I("Error parsing JSON backup file: "+ae.message,!0),M.style.display="none",Z.disabled=!0}},L.readAsText(F)},Z.onclick=async()=>{var F;if(!Q||Q.length===0)return;Z.disabled=!0,Z.textContent="Restoring...";const z=((F=x.querySelector('input[name="restoreMode"]:checked'))==null?void 0:F.value)||"merge";try{const L=await we("/tasks/restore",{tasks:Q,mode:z});I(`Restored ${L.restoredCount} tasks! (${L.skippedCount} skipped) ✨`),S(),await h()}catch(L){I("Restore failed: "+L.message,!0),Z.disabled=!1,Z.textContent="Retry Restore"}}}function Xe(){const s=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${T(p.displayName||"Daily Planner")}">
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
              <input type="text" id="setTimezone" class="input" value="${T(p.timezone||"Asia/Kolkata")}" readonly>
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

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,x=mt(s),S=()=>x.remove();x.querySelector("#btnSettingsClose").onclick=S,x.querySelector("#btnCancelSettings").onclick=S,x.querySelector("#settingsForm").onsubmit=w=>{w.preventDefault(),p.displayName=x.querySelector("#setDisplayName").value.trim()||"Daily Planner",p.weekStartsOn=Number(x.querySelector("#setWeekStart").value),p.defaultPriority=x.querySelector("#setDefaultPriority").value,p.density=x.querySelector("#setDensity").value,p.soundEnabled=x.querySelector("#setSound").checked,xa(p),I("Planner preferences saved! ⚙️"),S(),K()}}}function wa(){if(document.getElementById("ci360-planner-styles"))return;const r=document.createElement("style");r.id="ci360-planner-styles",r.textContent=`
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
  `,document.head.appendChild(r)}function ka(r){return r!==null?{comment:r,variations:[]}:{variations:[]}}function Sa(r,t,e,i,o){const n={move:r,variations:o};return t&&(n.suffix=t),e&&(n.nag=e),i!==null&&(n.comment=i),n}function _a(...r){const[t,...e]=r;let i=t;for(const o of e)o!==null&&(i.variations=[o,...o.variations],o.variations=[],i=o);return t}function $a(r,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const i=e.variations[0];if(!i){e.comment=t.marker.comment;break}e=i}}return{headers:r,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ca(r,t){function e(){this.constructor=r}e.prototype=t.prototype,r.prototype=new e}function lt(r,t,e,i){var o=Error.call(this,r);return Object.setPrototypeOf&&Object.setPrototypeOf(o,lt.prototype),o.expected=t,o.found=e,o.location=i,o.name="SyntaxError",o}Ca(lt,Error);function Ct(r,t,e){return e=e||" ",r.length>t?r:(t-=r.length,e+=e.repeat(t),r+e.slice(0,t))}lt.prototype.format=function(r){var t="Error: "+this.message;if(this.location){var e=null,i;for(i=0;i<r.length;i++)if(r[i].source===this.location.source){e=r[i].text.split(/\r\n|\n|\r/g);break}var o=this.location.start,n=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(o):o,p=this.location.source+":"+n.line+":"+n.column;if(e){var a=this.location.end,h=Ct("",n.line.toString().length," "),$=e[o.line-1],A=o.line===a.line?a.column:$.length+1,B=A-o.column||1;t+=`
 --> `+p+`
`+h+` |
`+n.line+" | "+$+`
`+h+" | "+Ct("",o.column-1," ")+Ct("",B,"^")}else t+=`
 at `+p}return t};lt.buildMessage=function(r,t){var e={literal:function($){return'"'+o($.text)+'"'},class:function($){var A=$.parts.map(function(B){return Array.isArray(B)?n(B[0])+"-"+n(B[1]):n(B)});return"["+($.inverted?"^":"")+A.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function($){return $.description}};function i($){return $.charCodeAt(0).toString(16).toUpperCase()}function o($){return $.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(A){return"\\x0"+i(A)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(A){return"\\x"+i(A)})}function n($){return $.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(A){return"\\x0"+i(A)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(A){return"\\x"+i(A)})}function p($){return e[$.type]($)}function a($){var A=$.map(p),B,C;if(A.sort(),A.length>0){for(B=1,C=1;B<A.length;B++)A[B-1]!==A[B]&&(A[C]=A[B],C++);A.length=C}switch(A.length){case 1:return A[0];case 2:return A[0]+" or "+A[1];default:return A.slice(0,-1).join(", ")+", or "+A[A.length-1]}}function h($){return $?'"'+o($)+'"':"end of input"}return"Expected "+a(r)+" but "+h(t)+" found."};function Ea(r,t){t=t!==void 0?t:{};var e={},i=t.grammarSource,o={pgn:Nt},n=Nt,p="[",a='"',h="]",$=".",A="O-O-O",B="O-O",C="0-0-0",K="0-0",O="$",pe="{",le="}",$e=";",nt="(",Qe=")",fe="1-0",rt="0-1",Ie="1/2-1/2",dt="*",me=/^[a-zA-Z]/,Ne=/^[^"]/,Fe=/^[0-9]/,Be=/^[.]/,Ye=/^[a-zA-Z1-8\-=]/,Je=/^[+#]/,Xe=/^[!?]/,s=/^[^}]/,x=/^[^\r\n]/,S=/^[ \t\r\n]/,w=De("tag pair"),y=he("[",!1),M=he('"',!1),U=he("]",!1),Z=De("tag name"),Q=Re([["a","z"],["A","Z"]],!1,!1),z=De("tag value"),F=Re(['"'],!0,!1),L=De("move number"),v=Re([["0","9"]],!1,!1),ae=he(".",!1),re=Re(["."],!1,!1),de=De("standard algebraic notation"),ne=he("O-O-O",!1),ie=he("O-O",!1),c=he("0-0-0",!1),g=he("0-0",!1),d=Re([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),k=Re(["+","#"],!1,!1),m=De("suffix annotation"),E=Re(["!","?"],!1,!1),_=De("NAG"),R=he("$",!1),N=De("brace comment"),j=he("{",!1),D=Re(["}"],!0,!1),q=he("}",!1),X=De("rest of line comment"),Y=he(";",!1),ee=Re(["\r",`
`],!0,!1),te=De("variation"),ce=he("(",!1),Te=he(")",!1),Me=De("game termination marker"),Ce=he("1-0",!1),He=he("0-1",!1),oe=he("1/2-1/2",!1),xe=he("*",!1),Ee=De("whitespace"),Le=Re([" ","	","\r",`
`],!1,!1),ke=function(l,b){return $a(l,b)},it=function(l){return Object.fromEntries(l)},Ze=function(l,b){return[l,b]},Oe=function(l,b){return{root:l,marker:b}},Ge=function(l,b){return _a(ka(l),...b.flat())},qt=function(l,b,f,G,W){return Sa(l,b,f,G,W)},Xt=function(l){return l},Zt=function(l){return l.replace(/[\r\n]+/g," ")},ea=function(l){return l.trim()},ta=function(l){return l},aa=function(l,b){return{result:l,comment:b}},u=t.peg$currPos|0,ot=[{line:1,column:1}],ze=u,bt=t.peg$maxFailExpected||[],P=t.peg$silentFails|0,ct;if(t.startRule){if(!(t.startRule in o))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');n=o[t.startRule]}function he(l,b){return{type:"literal",text:l,ignoreCase:b}}function Re(l,b,f){return{type:"class",parts:l,inverted:b,ignoreCase:f}}function na(){return{type:"end"}}function De(l){return{type:"other",description:l}}function Lt(l){var b=ot[l],f;if(b)return b;if(l>=ot.length)f=ot.length-1;else for(f=l;!ot[--f];);for(b=ot[f],b={line:b.line,column:b.column};f<l;)r.charCodeAt(f)===10?(b.line++,b.column=1):b.column++,f++;return ot[l]=b,b}function Rt(l,b,f){var G=Lt(l),W=Lt(b),se={source:i,start:{offset:l,line:G.line,column:G.column},end:{offset:b,line:W.line,column:W.column}};return se}function H(l){u<ze||(u>ze&&(ze=u,bt=[]),bt.push(l))}function ra(l,b,f){return new lt(lt.buildMessage(l,b),l,b,f)}function Nt(){var l,b,f;return l=u,b=ia(),f=la(),l=ke(b,f),l}function ia(){var l,b,f;for(l=u,b=[],f=Ft();f!==e;)b.push(f),f=Ft();return f=_e(),l=it(b),l}function Ft(){var l,b,f,G,W,se,et;return P++,l=u,_e(),r.charCodeAt(u)===91?(b=p,u++):(b=e,P===0&&H(y)),b!==e?(_e(),f=oa(),f!==e?(_e(),r.charCodeAt(u)===34?(G=a,u++):(G=e,P===0&&H(M)),G!==e?(W=sa(),r.charCodeAt(u)===34?(se=a,u++):(se=e,P===0&&H(M)),se!==e?(_e(),r.charCodeAt(u)===93?(et=h,u++):(et=e,P===0&&H(U)),et!==e?l=Ze(f,W):(u=l,l=e)):(u=l,l=e)):(u=l,l=e)):(u=l,l=e)):(u=l,l=e),P--,l===e&&P===0&&H(w),l}function oa(){var l,b,f;if(P++,l=u,b=[],f=r.charAt(u),me.test(f)?u++:(f=e,P===0&&H(Q)),f!==e)for(;f!==e;)b.push(f),f=r.charAt(u),me.test(f)?u++:(f=e,P===0&&H(Q));else b=e;return b!==e?l=r.substring(l,u):l=b,P--,l===e&&(b=e,P===0&&H(Z)),l}function sa(){var l,b,f;for(P++,l=u,b=[],f=r.charAt(u),Ne.test(f)?u++:(f=e,P===0&&H(F));f!==e;)b.push(f),f=r.charAt(u),Ne.test(f)?u++:(f=e,P===0&&H(F));return l=r.substring(l,u),P--,b=e,P===0&&H(z),l}function la(){var l,b,f;return l=u,b=Bt(),_e(),f=ba(),f===e&&(f=null),_e(),l=Oe(b,f),l}function Bt(){var l,b,f,G;for(l=u,b=_t(),b===e&&(b=null),f=[],G=Ot();G!==e;)f.push(G),G=Ot();return l=Ge(b,f),l}function Ot(){var l,b,f,G,W,se,et,ft;if(l=u,_e(),da(),_e(),b=ca(),b!==e){for(f=pa(),f===e&&(f=null),G=[],W=jt();W!==e;)G.push(W),W=jt();for(W=_e(),se=_t(),se===e&&(se=null),et=[],ft=Ht();ft!==e;)et.push(ft),ft=Ht();l=qt(b,f,G,se,et)}else u=l,l=e;return l}function da(){var l,b,f,G,W,se;for(P++,l=u,b=[],f=r.charAt(u),Fe.test(f)?u++:(f=e,P===0&&H(v));f!==e;)b.push(f),f=r.charAt(u),Fe.test(f)?u++:(f=e,P===0&&H(v));if(r.charCodeAt(u)===46?(f=$,u++):(f=e,P===0&&H(ae)),f!==e){for(G=_e(),W=[],se=r.charAt(u),Be.test(se)?u++:(se=e,P===0&&H(re));se!==e;)W.push(se),se=r.charAt(u),Be.test(se)?u++:(se=e,P===0&&H(re));b=[b,f,G,W],l=b}else u=l,l=e;return P--,l===e&&(b=e,P===0&&H(L)),l}function ca(){var l,b,f,G,W,se;if(P++,l=u,b=u,r.substr(u,5)===A?(f=A,u+=5):(f=e,P===0&&H(ne)),f===e&&(r.substr(u,3)===B?(f=B,u+=3):(f=e,P===0&&H(ie)),f===e&&(r.substr(u,5)===C?(f=C,u+=5):(f=e,P===0&&H(c)),f===e&&(r.substr(u,3)===K?(f=K,u+=3):(f=e,P===0&&H(g)),f===e))))if(f=u,G=r.charAt(u),me.test(G)?u++:(G=e,P===0&&H(Q)),G!==e){if(W=[],se=r.charAt(u),Ye.test(se)?u++:(se=e,P===0&&H(d)),se!==e)for(;se!==e;)W.push(se),se=r.charAt(u),Ye.test(se)?u++:(se=e,P===0&&H(d));else W=e;W!==e?(G=[G,W],f=G):(u=f,f=e)}else u=f,f=e;return f!==e?(G=r.charAt(u),Je.test(G)?u++:(G=e,P===0&&H(k)),G===e&&(G=null),f=[f,G],b=f):(u=b,b=e),b!==e?l=r.substring(l,u):l=b,P--,l===e&&(b=e,P===0&&H(de)),l}function pa(){var l,b,f;for(P++,l=u,b=[],f=r.charAt(u),Xe.test(f)?u++:(f=e,P===0&&H(E));f!==e;)b.push(f),b.length>=2?f=e:(f=r.charAt(u),Xe.test(f)?u++:(f=e,P===0&&H(E)));return b.length<1?(u=l,l=e):l=b,P--,l===e&&(b=e,P===0&&H(m)),l}function jt(){var l,b,f,G,W;if(P++,l=u,_e(),r.charCodeAt(u)===36?(b=O,u++):(b=e,P===0&&H(R)),b!==e){if(f=u,G=[],W=r.charAt(u),Fe.test(W)?u++:(W=e,P===0&&H(v)),W!==e)for(;W!==e;)G.push(W),W=r.charAt(u),Fe.test(W)?u++:(W=e,P===0&&H(v));else G=e;G!==e?f=r.substring(f,u):f=G,f!==e?l=Xt(f):(u=l,l=e)}else u=l,l=e;return P--,l===e&&P===0&&H(_),l}function _t(){var l;return l=ga(),l===e&&(l=ua()),l}function ga(){var l,b,f,G,W;if(P++,l=u,r.charCodeAt(u)===123?(b=pe,u++):(b=e,P===0&&H(j)),b!==e){for(f=u,G=[],W=r.charAt(u),s.test(W)?u++:(W=e,P===0&&H(D));W!==e;)G.push(W),W=r.charAt(u),s.test(W)?u++:(W=e,P===0&&H(D));f=r.substring(f,u),r.charCodeAt(u)===125?(G=le,u++):(G=e,P===0&&H(q)),G!==e?l=Zt(f):(u=l,l=e)}else u=l,l=e;return P--,l===e&&(b=e,P===0&&H(N)),l}function ua(){var l,b,f,G,W;if(P++,l=u,r.charCodeAt(u)===59?(b=$e,u++):(b=e,P===0&&H(Y)),b!==e){for(f=u,G=[],W=r.charAt(u),x.test(W)?u++:(W=e,P===0&&H(ee));W!==e;)G.push(W),W=r.charAt(u),x.test(W)?u++:(W=e,P===0&&H(ee));f=r.substring(f,u),l=ea(f)}else u=l,l=e;return P--,l===e&&(b=e,P===0&&H(X)),l}function Ht(){var l,b,f,G;return P++,l=u,_e(),r.charCodeAt(u)===40?(b=nt,u++):(b=e,P===0&&H(ce)),b!==e?(f=Bt(),f!==e?(_e(),r.charCodeAt(u)===41?(G=Qe,u++):(G=e,P===0&&H(Te)),G!==e?l=ta(f):(u=l,l=e)):(u=l,l=e)):(u=l,l=e),P--,l===e&&P===0&&H(te),l}function ba(){var l,b,f;return P++,l=u,r.substr(u,3)===fe?(b=fe,u+=3):(b=e,P===0&&H(Ce)),b===e&&(r.substr(u,3)===rt?(b=rt,u+=3):(b=e,P===0&&H(He)),b===e&&(r.substr(u,7)===Ie?(b=Ie,u+=7):(b=e,P===0&&H(oe)),b===e&&(r.charCodeAt(u)===42?(b=dt,u++):(b=e,P===0&&H(xe))))),b!==e?(_e(),f=_t(),f===e&&(f=null),l=aa(b,f)):(u=l,l=e),P--,l===e&&(b=e,P===0&&H(Me)),l}function _e(){var l,b;for(P++,l=[],b=r.charAt(u),S.test(b)?u++:(b=e,P===0&&H(Le));b!==e;)l.push(b),b=r.charAt(u),S.test(b)?u++:(b=e,P===0&&H(Le));return P--,b=e,P===0&&H(Ee),l}if(ct=n(),t.peg$library)return{peg$result:ct,peg$currPos:u,peg$FAILED:e,peg$maxFailExpected:bt,peg$maxFailPos:ze};if(ct!==e&&u===r.length)return ct;throw ct!==e&&u<r.length&&H(na()),ra(bt,ze<r.length?r.charAt(ze):null,ze<r.length?Rt(ze,ze+1):Rt(ze,ze))}/**
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
 */const wt=0xffffffffffffffffn;function Et(r,t){return(r<<t|r>>64n-t)&0xffffffffffffffffn}function Kt(r,t){return r*t&wt}function Aa(r){return function(){let t=BigInt(r&wt),e=BigInt(r>>64n&wt);const i=Kt(Et(Kt(t,5n),7n),9n);return e^=t,t=(Et(t,24n)^e^e<<16n)&wt,e=Et(e,37n),r=e<<64n|t,i}}const St=Aa(0xa187eb39cdcaed8f31c4b365b102e01en),Ta=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>St()))),Da=Array.from({length:8},()=>St()),Pa=Array.from({length:16},()=>St()),At=St(),Se="w",Ae="b",ue="p",Mt="n",kt="b",gt="r",Ve="q",be="k",Tt="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class vt{constructor(t,e){ge(this,"color");ge(this,"from");ge(this,"to");ge(this,"piece");ge(this,"captured");ge(this,"promotion");ge(this,"flags");ge(this,"san");ge(this,"lan");ge(this,"before");ge(this,"after");const{color:i,piece:o,from:n,to:p,flags:a,captured:h,promotion:$}=e,A=ve(n),B=ve(p);this.color=i,this.piece=o,this.from=A,this.to=B,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=A+B,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const C in J)J[C]&a&&(this.flags+=tt[C]);h&&(this.captured=h),$&&(this.promotion=$,this.lan+=$)}isCapture(){return this.flags.indexOf(tt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(tt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(tt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(tt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(tt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(tt.BIG_PAWN)>-1}}const ye=-1,tt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},J={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},zt={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Ia={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Ma={...zt,...Ia},V={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},Dt={b:[16,32,17,15],w:[-16,-32,-17,-15]},Ut={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},za=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],qa=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],La={p:1,n:2,b:4,r:8,q:16,k:32},Ra="pnbrqkPNBRQK",Vt=[Mt,kt,gt,Ve],Na=7,Fa=6,Ba=1,Oa=0,xt={[be]:J.KSIDE_CASTLE,[Ve]:J.QSIDE_CASTLE},Ke={w:[{square:V.a1,flag:J.QSIDE_CASTLE},{square:V.h1,flag:J.KSIDE_CASTLE}],b:[{square:V.a8,flag:J.QSIDE_CASTLE},{square:V.h8,flag:J.KSIDE_CASTLE}]},ja={b:Ba,w:Fa},Pt="--";function at(r){return r>>4}function ut(r){return r&15}function Jt(r){return"0123456789".indexOf(r)!==-1}function ve(r){const t=ut(r),e=at(r);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function pt(r){return r===Se?Ae:Se}function Ha(r){const t=r.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const i=parseInt(t[4],10);if(isNaN(i)||i<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const o=t[0].split("/");if(o.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let p=0;p<o.length;p++){let a=0,h=!1;for(let $=0;$<o[p].length;$++)if(Jt(o[p][$])){if(h)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};a+=parseInt(o[p][$],10),h=!0}else{if(!/^[prnbqkPRNBQK]$/.test(o[p][$]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};a+=1,h=!1}if(a!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const n=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:p,regex:a}of n){if(!a.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${p} king`};if((t[0].match(a)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${p} kings`}}return Array.from(o[0]+o[7]).some(p=>p.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Ga(r,t){const e=r.from,i=r.to,o=r.piece;let n=0,p=0,a=0;for(let h=0,$=t.length;h<$;h++){const A=t[h].from,B=t[h].to,C=t[h].piece;o===C&&e!==A&&i===B&&(n++,at(e)===at(A)&&p++,ut(e)===ut(A)&&a++)}return n>0?p>0&&a>0?ve(e):a>0?ve(e).charAt(1):ve(e).charAt(0):""}function Ue(r,t,e,i,o,n=void 0,p=J.NORMAL){const a=at(i);if(o===ue&&(a===Na||a===Oa))for(let h=0;h<Vt.length;h++){const $=Vt[h];r.push({color:t,from:e,to:i,piece:o,captured:n,promotion:$,flags:p|J.PROMOTION})}else r.push({color:t,from:e,to:i,piece:o,captured:n,flags:p})}function Qt(r){let t=r.charAt(0);return t>="a"&&t<="h"?r.match(/[a-h]\d.*[a-h]\d/)?void 0:ue:(t=t.toLowerCase(),t==="o"?be:t)}function It(r){return r.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class Yt{constructor(t=Tt,{skipValidation:e=!1}={}){ge(this,"_board",new Array(128));ge(this,"_turn",Se);ge(this,"_header",{});ge(this,"_kings",{w:ye,b:ye});ge(this,"_epSquare",-1);ge(this,"_halfMoves",0);ge(this,"_moveNumber",0);ge(this,"_history",[]);ge(this,"_comments",{});ge(this,"_castling",{w:0,b:0});ge(this,"_hash",0n);ge(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:ye,b:ye},this._turn=Se,this._castling={w:0,b:0},this._epSquare=ye,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Ma},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:i=!1}={}){let o=t.split(/\s+/);if(o.length>=2&&o.length<6){const a=["-","-","0","1"];t=o.concat(a.slice(-(6-o.length))).join(" ")}if(o=t.split(/\s+/),!e){const{ok:a,error:h}=Ha(t);if(!a)throw new Error(h)}const n=o[0];let p=0;this.clear({preserveHeaders:i});for(let a=0;a<n.length;a++){const h=n.charAt(a);if(h==="/")p+=8;else if(Jt(h))p+=parseInt(h,10);else{const $=h<"a"?Se:Ae;this._put({type:h.toLowerCase(),color:$},ve(p)),p++}}this._turn=o[1],o[2].indexOf("K")>-1&&(this._castling.w|=J.KSIDE_CASTLE),o[2].indexOf("Q")>-1&&(this._castling.w|=J.QSIDE_CASTLE),o[2].indexOf("k")>-1&&(this._castling.b|=J.KSIDE_CASTLE),o[2].indexOf("q")>-1&&(this._castling.b|=J.QSIDE_CASTLE),this._epSquare=o[3]==="-"?ye:V[o[3]],this._halfMoves=parseInt(o[4],10),this._moveNumber=parseInt(o[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var p,a;let e=0,i="";for(let h=V.a8;h<=V.h1;h++){if(this._board[h]){e>0&&(i+=e,e=0);const{color:$,type:A}=this._board[h];i+=$===Se?A.toUpperCase():A.toLowerCase()}else e++;h+1&136&&(e>0&&(i+=e),h!==V.h1&&(i+="/"),e=0,h+=8)}let o="";this._castling[Se]&J.KSIDE_CASTLE&&(o+="K"),this._castling[Se]&J.QSIDE_CASTLE&&(o+="Q"),this._castling[Ae]&J.KSIDE_CASTLE&&(o+="k"),this._castling[Ae]&J.QSIDE_CASTLE&&(o+="q"),o=o||"-";let n="-";if(this._epSquare!==ye)if(t)n=ve(this._epSquare);else{const h=this._epSquare+(this._turn===Se?16:-16),$=[h+1,h-1];for(const A of $){if(A&136)continue;const B=this._turn;if(((p=this._board[A])==null?void 0:p.color)===B&&((a=this._board[A])==null?void 0:a.type)===ue){this._makeMove({color:B,from:A,to:this._epSquare,piece:ue,captured:ue,flags:J.EP_CAPTURE});const C=!this._isKingAttacked(B);if(this._undoMove(),C){n=ve(this._epSquare);break}}}}return[i,this._turn,o,n,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:i}=this._board[t],o={w:0,b:1}[e],n={p:0,n:1,b:2,r:3,q:4,k:5}[i];return Ta[o][n][t]}_epKey(){return this._epSquare===ye?0n:Da[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Pa[t]}_computeHash(){let t=0n;for(let e=V.a8;e<=V.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=At),t}_updateSetup(t){this._history.length>0||(t!==Tt?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(Tt)}get(t){return this._board[V[t]]}findPiece(t){var i;const e=[];for(let o=V.a8;o<=V.h1;o++){if(o&136){o+=7;continue}!this._board[o]||((i=this._board[o])==null?void 0:i.color)!==t.color||this._board[o].color===t.color&&this._board[o].type===t.type&&e.push(ve(o))}return e}put({type:t,color:e},i){return this._put({type:t,color:e},i)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},i){if(Ra.indexOf(t.toLowerCase())===-1||!(i in V))return!1;const o=V[i];if(t==be&&!(this._kings[e]==ye||this._kings[e]==o))return!1;const n=this._board[o];return n&&n.type===be&&(this._kings[n.color]=ye),this._set(o,{type:t,color:e}),t===be&&(this._kings[e]=o),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(V[t]),e&&e.type===be&&(this._kings[e.color]=ye),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var i,o,n,p,a,h,$,A,B,C,K,O;this._hash^=this._castlingKey();const t=((i=this._board[V.e1])==null?void 0:i.type)===be&&((o=this._board[V.e1])==null?void 0:o.color)===Se,e=((n=this._board[V.e8])==null?void 0:n.type)===be&&((p=this._board[V.e8])==null?void 0:p.color)===Ae;(!t||((a=this._board[V.a1])==null?void 0:a.type)!==gt||((h=this._board[V.a1])==null?void 0:h.color)!==Se)&&(this._castling.w&=-65),(!t||(($=this._board[V.h1])==null?void 0:$.type)!==gt||((A=this._board[V.h1])==null?void 0:A.color)!==Se)&&(this._castling.w&=-33),(!e||((B=this._board[V.a8])==null?void 0:B.type)!==gt||((C=this._board[V.a8])==null?void 0:C.color)!==Ae)&&(this._castling.b&=-65),(!e||((K=this._board[V.h8])==null?void 0:K.type)!==gt||((O=this._board[V.h8])==null?void 0:O.color)!==Ae)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var n,p;if(this._epSquare===ye)return;const t=this._epSquare+(this._turn===Se?-16:16),e=this._epSquare+(this._turn===Se?16:-16),i=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((n=this._board[e])==null?void 0:n.color)!==pt(this._turn)||((p=this._board[e])==null?void 0:p.type)!==ue){this._hash^=this._epKey(),this._epSquare=ye;return}const o=a=>{var h,$;return!(a&136)&&((h=this._board[a])==null?void 0:h.color)===this._turn&&(($=this._board[a])==null?void 0:$.type)===ue};i.some(o)||(this._hash^=this._epKey(),this._epSquare=ye)}_attacked(t,e,i){const o=[];for(let n=V.a8;n<=V.h1;n++){if(n&136){n+=7;continue}if(this._board[n]===void 0||this._board[n].color!==t)continue;const p=this._board[n],a=n-e;if(a===0)continue;const h=a+119;if(za[h]&La[p.type]){if(p.type===ue){if(a>0&&p.color===Se||a<=0&&p.color===Ae)if(i)o.push(ve(n));else return!0;continue}if(p.type==="n"||p.type==="k")if(i){o.push(ve(n));continue}else return!0;const $=qa[h];let A=n+$,B=!1;for(;A!==e;){if(this._board[A]!=null){B=!0;break}A+=$}if(!B)if(i){o.push(ve(n));continue}else return!0}}return i?o:!1}attackers(t,e){return e?this._attacked(e,V[t],!0):this._attacked(this._turn,V[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(pt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,V[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let i=0,o=0;for(let n=V.a8;n<=V.h1;n++){if(o=(o+1)%2,n&136){n+=7;continue}const p=this._board[n];p&&(t[p.type]=p.type in t?t[p.type]+1:1,p.type===kt&&e.push(o),i++)}if(i===2)return!0;if(i===3&&(t[kt]===1||t[Mt]===1))return!0;if(i===t[kt]+2){let n=0;const p=e.length;for(let a=0;a<p;a++)n+=e[a];if(n===0||n===p)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:i=void 0}={}){const o=this._moves({square:e,piece:i});return t?o.map(n=>new vt(this,n)):o.map(n=>this._moveToSan(n,o))}_moves({legal:t=!0,piece:e=void 0,square:i=void 0}={}){var K;const o=i?i.toLowerCase():void 0,n=e==null?void 0:e.toLowerCase(),p=[],a=this._turn,h=pt(a);let $=V.a8,A=V.h1,B=!1;if(o)if(o in V)$=A=V[o],B=!0;else return[];for(let O=$;O<=A;O++){if(O&136){O+=7;continue}if(!this._board[O]||this._board[O].color===h)continue;const{type:pe}=this._board[O];let le;if(pe===ue){if(n&&n!==pe)continue;le=O+Dt[a][0],this._board[le]||(Ue(p,a,O,le,ue),le=O+Dt[a][1],ja[a]===at(O)&&!this._board[le]&&Ue(p,a,O,le,ue,void 0,J.BIG_PAWN));for(let $e=2;$e<4;$e++)le=O+Dt[a][$e],!(le&136)&&(((K=this._board[le])==null?void 0:K.color)===h?Ue(p,a,O,le,ue,this._board[le].type,J.CAPTURE):le===this._epSquare&&Ue(p,a,O,le,ue,ue,J.EP_CAPTURE))}else{if(n&&n!==pe)continue;for(let $e=0,nt=Ut[pe].length;$e<nt;$e++){const Qe=Ut[pe][$e];for(le=O;le+=Qe,!(le&136);){if(!this._board[le])Ue(p,a,O,le,pe);else{if(this._board[le].color===a)break;Ue(p,a,O,le,pe,this._board[le].type,J.CAPTURE);break}if(pe===Mt||pe===be)break}}}}if((n===void 0||n===be)&&(!B||A===this._kings[a])){if(this._castling[a]&J.KSIDE_CASTLE){const O=this._kings[a],pe=O+2;!this._board[O+1]&&!this._board[pe]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,O+1)&&!this._attacked(h,pe)&&Ue(p,a,this._kings[a],pe,be,void 0,J.KSIDE_CASTLE)}if(this._castling[a]&J.QSIDE_CASTLE){const O=this._kings[a],pe=O-2;!this._board[O-1]&&!this._board[O-2]&&!this._board[O-3]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,O-1)&&!this._attacked(h,pe)&&Ue(p,a,this._kings[a],pe,be,void 0,J.QSIDE_CASTLE)}}if(!t||this._kings[a]===-1)return p;const C=[];for(let O=0,pe=p.length;O<pe;O++)this._makeMove(p[O]),this._isKingAttacked(a)||C.push(p[O]),this._undoMove();return C}move(t,{strict:e=!1}={}){let i=null;if(typeof t=="string")i=this._moveFromSan(t,e);else if(t===null)i=this._moveFromSan(Pt,e);else if(typeof t=="object"){const n=this._moves();for(let p=0,a=n.length;p<a;p++)if(t.from===ve(n[p].from)&&t.to===ve(n[p].to)&&(!("promotion"in n[p])||t.promotion===n[p].promotion)){i=n[p];break}}if(!i)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&i.flags&J.NULL_MOVE)throw new Error("Null move not allowed when in check");const o=new vt(this,i);return this._makeMove(i),this._incPositionCount(),o}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var o,n,p,a;const e=this._turn,i=pt(e);if(this._push(t),t.flags&J.NULL_MOVE){e===Ae&&this._moveNumber++,this._halfMoves++,this._turn=i,this._epSquare=ye;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&J.EP_CAPTURE&&(this._turn===Ae?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===be){if(this._kings[e]=t.to,t.flags&J.KSIDE_CASTLE){const h=t.to-1,$=t.to+1;this._movePiece($,h)}else if(t.flags&J.QSIDE_CASTLE){const h=t.to+1,$=t.to-2;this._movePiece($,h)}this._castling[e]=0}if(this._castling[e]){for(let h=0,$=Ke[e].length;h<$;h++)if(t.from===Ke[e][h].square&&this._castling[e]&Ke[e][h].flag){this._castling[e]^=Ke[e][h].flag;break}}if(this._castling[i]){for(let h=0,$=Ke[i].length;h<$;h++)if(t.to===Ke[i][h].square&&this._castling[i]&Ke[i][h].flag){this._castling[i]^=Ke[i][h].flag;break}}if(this._hash^=this._castlingKey(),t.flags&J.BIG_PAWN){let h;e===Ae?h=t.to-16:h=t.to+16,!(t.to-1&136)&&((o=this._board[t.to-1])==null?void 0:o.type)===ue&&((n=this._board[t.to-1])==null?void 0:n.color)===i||!(t.to+1&136)&&((p=this._board[t.to+1])==null?void 0:p.type)===ue&&((a=this._board[t.to+1])==null?void 0:a.color)===i?(this._epSquare=h,this._hash^=this._epKey()):this._epSquare=ye}else this._epSquare=ye;t.piece===ue?this._halfMoves=0:t.flags&(J.CAPTURE|J.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===Ae&&this._moveNumber++,this._turn=i,this._hash^=At}undo(){const t=this._hash,e=this._undoMove();if(e){const i=new vt(this,e);return this._decPositionCount(t),i}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=At;const i=this._turn,o=pt(i);if(e.flags&J.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:i})),e.captured)if(e.flags&J.EP_CAPTURE){let n;i===Ae?n=e.to-16:n=e.to+16,this._set(n,{type:ue,color:o})}else this._set(e.to,{type:e.captured,color:o});if(e.flags&(J.KSIDE_CASTLE|J.QSIDE_CASTLE)){let n,p;e.flags&J.KSIDE_CASTLE?(n=e.to+1,p=e.to-1):(n=e.to-2,p=e.to+1),this._movePiece(p,n)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const i=[];let o=!1;for(const C in this._header)this._header[C]&&i.push(`[${C} "${this._header[C]}"]`+t),o=!0;o&&this._history.length&&i.push(t);const n=C=>{const K=this._comments[this.fen()];if(typeof K<"u"){const O=C.length>0?" ":"";C=`${C}${O}{${K}}`}return C},p=[];for(;this._history.length>0;)p.push(this._undoMove());const a=[];let h="";for(p.length===0&&a.push(n(""));p.length>0;){h=n(h);const C=p.pop();if(!C)break;if(!this._history.length&&C.color==="b"){const K=`${this._moveNumber}. ...`;h=h?`${h} ${K}`:K}else C.color==="w"&&(h.length&&a.push(h),h=this._moveNumber+".");h=h+" "+this._moveToSan(C,this._moves({legal:!0})),this._makeMove(C)}if(h.length&&a.push(n(h)),a.push(this._header.Result||"*"),e===0)return i.join("")+a.join(" ");const $=function(){return i.length>0&&i[i.length-1]===" "?(i.pop(),!0):!1},A=function(C,K){for(const O of K.split(" "))if(O){if(C+O.length>e){for(;$();)C--;i.push(t),C=0}i.push(O),C+=O.length,i.push(" "),C++}return $()&&C--,C};let B=0;for(let C=0;C<a.length;C++){if(B+a[C].length>e&&a[C].includes("{")){B=A(B,a[C]);continue}B+a[C].length>e&&C!==0?(i[i.length-1]===" "&&i.pop(),i.push(t),B=0):C!==0&&(i.push(" "),B++),i.push(a[C]),B+=a[C].length}return i.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??zt[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=zt[t]||null,!0):!1}getHeaders(){const t={};for(const[e,i]of Object.entries(this._header))i!==null&&(t[e]=i);return t}loadPgn(t,{strict:e=!1,newlineChar:i=`\r?
`}={}){i!==`\r?
`&&(t=t.replace(new RegExp(i,"g"),`
`));const o=Ea(t);this.reset();const n=o.headers;let p="";for(const $ in n)$.toLowerCase()==="fen"&&(p=n[$]),this.header($,n[$]);if(!e)p&&this.load(p,{preserveHeaders:!0});else if(n.SetUp==="1"){if(!("FEN"in n))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(n.FEN,{preserveHeaders:!0})}let a=o.root;for(;a;){if(a.move){const $=this._moveFromSan(a.move,e);if($==null)throw new Error(`Invalid move in PGN: ${a.move}`);this._makeMove($),this._incPositionCount()}a.comment!==void 0&&(this._comments[this.fen()]=a.comment),a=a.variations[0]}const h=o.result;h&&Object.keys(this._header).length&&this._header.Result!==h&&this.setHeader("Result",h)}_moveToSan(t,e){let i="";if(t.flags&J.KSIDE_CASTLE)i="O-O";else if(t.flags&J.QSIDE_CASTLE)i="O-O-O";else{if(t.flags&J.NULL_MOVE)return Pt;if(t.piece!==ue){const o=Ga(t,e);i+=t.piece.toUpperCase()+o}t.flags&(J.CAPTURE|J.EP_CAPTURE)&&(t.piece===ue&&(i+=ve(t.from)[0]),i+="x"),i+=ve(t.to),t.promotion&&(i+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?i+="#":i+="+"),this._undoMove(),i}_moveFromSan(t,e=!1){let i=It(t);if(e||(i==="0-0"?i="O-O":i==="0-0-0"&&(i="O-O-O")),i==Pt)return{color:this._turn,from:0,to:0,piece:"k",flags:J.NULL_MOVE};let o=Qt(i),n=this._moves({legal:!0,piece:o});for(let C=0,K=n.length;C<K;C++)if(i===It(this._moveToSan(n[C],n)))return n[C];if(e)return null;let p,a,h,$,A,B=!1;if(a=i.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),a?(p=a[1],h=a[2],$=a[3],A=a[4],h.length==1&&(B=!0)):(a=i.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),a&&(p=a[1],h=a[2],$=a[3],A=a[4],h.length==1&&(B=!0))),o=Qt(i),n=this._moves({legal:!0,piece:p||o}),!$)return null;for(let C=0,K=n.length;C<K;C++)if(h){if((!p||p.toLowerCase()==n[C].piece)&&V[h]==n[C].from&&V[$]==n[C].to&&(!A||A.toLowerCase()==n[C].promotion))return n[C];if(B){const O=ve(n[C].from);if((!p||p.toLowerCase()==n[C].piece)&&V[$]==n[C].to&&(h==O[0]||h==O[1])&&(!A||A.toLowerCase()==n[C].promotion))return n[C]}}else if(i===It(this._moveToSan(n[C],n)).replace("x",""))return n[C];return null}ascii(){let t=`   +------------------------+
`;for(let e=V.a8;e<=V.h1;e++){if(ut(e)===0&&(t+=" "+"87654321"[at(e)]+" |"),this._board[e]){const i=this._board[e].type,n=this._board[e].color===Se?i.toUpperCase():i.toLowerCase();t+=" "+n+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let i=0;const o=this._turn;for(let n=0,p=e.length;n<p;n++)this._makeMove(e[n]),this._isKingAttacked(o)||(t-1>0?i+=this.perft(t-1):i++),this._undoMove();return i}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let i=V.a8;i<=V.h1;i++)this._board[i]==null?e.push(null):e.push({square:ve(i),type:this._board[i].type,color:this._board[i].color}),i+1&136&&(t.push(e),e=[],i+=8);return t}squareColor(t){if(t in V){const e=V[t];return(at(e)+ut(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],i=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const o=e.pop();if(!o)break;t?i.push(new vt(this,o)):i.push(this._moveToSan(o,this._moves())),this._makeMove(o)}return i}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},i=o=>{o in this._comments&&(e[o]=this._comments[o])};for(;this._history.length>0;)t.push(this._undoMove());for(i(this.fen());;){const o=t.pop();if(!o)break;this._makeMove(o),i(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const o of[be,Ve])e[o]!==void 0&&(e[o]?this._castling[t]|=xt[o]:this._castling[t]&=~xt[o]);this._updateCastlingRights();const i=this.getCastlingRights(t);return(e[be]===void 0||e[be]===i[be])&&(e[Ve]===void 0||e[Ve]===i[Ve])}getCastlingRights(t){return{[be]:(this._castling[t]&xt[be])!==0,[Ve]:(this._castling[t]&xt[Ve])!==0}}moveNumber(){return this._moveNumber}}async function Qa(r,t={}){var de,ne,ie;const e=t.currentUser||{};let i="chat",o=[],n=null,p=[],a=[],h=null,$=null,A=!1,B=null,C=null;r.innerHTML=`
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
  `,Wa(),await Qe(),me();const K=r.querySelector("#tab-nav-chat"),O=r.querySelector("#tab-nav-lounge"),pe=r.querySelector("#bonding-chat-main-wrap"),le=r.querySelector("#bonding-lounge-main-wrap");K==null||K.addEventListener("click",()=>{i="chat",K.classList.add("active"),O.classList.remove("active"),pe.style.display="grid",le.style.display="none",me()}),O==null||O.addEventListener("click",async()=>{i="lounge_games",O.classList.add("active"),K.classList.remove("active"),pe.style.display="none",le.style.display="block",await y()}),(de=r.querySelector("#btn-top-new-chat"))==null||de.addEventListener("click",L),(ne=r.querySelector("#btn-top-new-group"))==null||ne.addEventListener("click",v),(ie=r.querySelector("#btn-top-challenge"))==null||ie.addEventListener("click",()=>U());const $e=r.querySelector("#bonding-search-input");$e&&$e.addEventListener("input",c=>{const g=c.target.value.toLowerCase().trim();r.querySelectorAll(".bonding-channel-item").forEach(k=>{const m=k.textContent.toLowerCase();k.style.display=m.includes(g)?"flex":"none"})}),rt(),new MutationObserver((c,g)=>{document.body.contains(r)||($&&clearInterval($),C&&clearInterval(C),g.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function Qe(){try{const[c,g]=await Promise.all([Pe("/bonding/channels").catch(()=>[]),Pe("/bonding/colleagues").catch(()=>[])]);o=c,p=g,!n&&o.length>0&&(n=o.find(d=>d.name.includes("Lounge"))||o[0]),Ie(),n&&await fe(n._id)}catch(c){console.error("Failed to load bonding data",c)}}async function fe(c,g=!1){if(c)try{a=await Pe(`/bonding/channels/${c}/messages`),g?S():w()}catch(d){console.error("Failed to load messages",d)}}function rt(){$&&clearInterval($),$=setInterval(async()=>{try{if(!document.body.contains(r)){clearInterval($);return}i==="chat"&&n?await fe(n._id,!0):i==="lounge_games"&&await y(!0)}catch{}},3e3)}function Ie(){const c=r.querySelector("#bonding-group-list"),g=r.querySelector("#bonding-direct-list");if(!c||!g)return;const d=o.filter(m=>m.type==="group"),k=o.filter(m=>m.type==="direct");d.length===0?c.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':c.innerHTML=d.map(m=>{var _;return`
          <div class="bonding-channel-item ${n&&n._id===m._id?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-icon">${m.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${T(m.name)}</div>
              <div class="bonding-channel-preview">${T(((_=m.lastMessage)==null?void 0:_.content)||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),k.length===0?g.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':g.innerHTML=k.map(m=>{var N;const E=n&&n._id===m._id,_=m.displayName||m.name||"Colleague",R=_.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${E?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-avatar">${R}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${T(_)}</div>
              <div class="bonding-channel-preview">${T(((N=m.lastMessage)==null?void 0:N.content)||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),dt()}function dt(){var g,d;const c=r.querySelectorAll(".bonding-channel-item");c.forEach(k=>{k.onclick=async m=>{if(m.target.closest(".bonding-channel-del-btn"))return;const E=k.dataset.channelId,_=o.find(R=>R._id===E);_&&(n=_,c.forEach(R=>R.classList.remove("active")),k.classList.add("active"),me(),await fe(_._id))}}),r.querySelectorAll(".bonding-channel-del-btn").forEach(k=>{k.onclick=async m=>{m.stopPropagation();const E=k.dataset.channelId,_=o.find(j=>j._id===E),R=_&&_.type==="direct",N=R?"this 1-on-1 chat":`the group "${(_==null?void 0:_.name)||""}"`;if(confirm(`Are you sure you want to delete ${N}? All messages will be permanently removed.`))try{k.disabled=!0,await je(`/bonding/channels/${E}`),I(R?"1-on-1 chat deleted":"Group deleted","success"),o=o.filter(j=>j._id!==E),n&&n._id===E&&(n=o[0]||null,me(),n&&await fe(n._id)),Ie()}catch(j){I(j.message||"Failed to delete conversation","error"),k.disabled=!1}}}),(g=r.querySelector("#btn-create-group"))==null||g.addEventListener("click",v),(d=r.querySelector("#btn-new-direct-chat"))==null||d.addEventListener("click",L)}function me(){const c=r.querySelector("#bonding-chat-panel");if(!c)return;if(!n){c.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const g=T(n.displayName||n.name),d=(n.members||[]).length,k=n.type==="group",m=(e==null?void 0:e._id)||(e==null?void 0:e.id),E=k?null:(n.members||[]).find(_=>{var R;return((R=_.userId)==null?void 0:R.toString())!==(m==null?void 0:m.toString())});c.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${k?n.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${g}</div>
            <div class="bonding-chat-sub">
              ${k?`<span>${d} members</span> · <span>${T(n.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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
              <span>👥</span> <span>Members (${d})</span>
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
        ${Ne()}
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
    `,Be(E),Ye(E),Je(),x()}function Ne(){if(!a||a.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const c=(e==null?void 0:e._id)||(e==null?void 0:e.id);return a.map(g=>{var _,R,N,j,D,q,X,Y,ee;const d=g.sender&&g.sender.userId&&c&&g.sender.userId.toString()===c.toString();if(g.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${g._id}">
            <span>ℹ️</span> <span>${T(g.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${g._id}" title="Delete Message">&times;</button>
          </div>
        `;if(g.type==="challenge"&&g.challengeData){const te=g.challengeData,ce=te.gameTitle||"Game Challenge",Me=(te.gameType||"chess")==="chess"?"♟️":"❌",Ce=(_=te.gameState)==null?void 0:_.invitationId,He=(R=te.targetUserId)==null?void 0:R.toString(),oe=(j=(N=g.sender)==null?void 0:N.userId)==null?void 0:j.toString(),xe=c&&He===c.toString(),Ee=c&&oe===c.toString();return`
          <div class="bonding-msg-row ${d?"self":"other"}" data-msg-id="${g._id}">
            <div class="bonding-msg-avatar" title="${T(((D=g.sender)==null?void 0:D.name)||"Teammate")}">
              ${(((q=g.sender)==null?void 0:q.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${T(((X=g.sender)==null?void 0:X.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${re(g.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${g._id}" title="Delete Challenge Message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${Me}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${T(ce)}</h4>
                    <p class="game-bubble-desc">${T(g.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${te.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':te.status==="active"||te.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${T(((Y=te.status)==null?void 0:Y.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${te.status==="pending"&&xe?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${Ce}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${Ce}" data-action="decline">
                        Decline
                      </button>
                    `:te.status==="pending"&&Ee?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${Ce}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${Ce}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${Fe(g)}
            </div>
          </div>
        `}const k=T(((ee=g.sender)==null?void 0:ee.name)||"Teammate"),m=re(g.createdAt),E=Fe(g);return`
        <div class="bonding-msg-row ${d?"self":"other"}" data-msg-id="${g._id}">
          <div class="bonding-msg-avatar" title="${k}">${k.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${k}</span>
              <span class="bonding-msg-time">${m}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${g._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${T(g.content).replace(/\n/g,"<br/>")}
            </div>
            ${E}
          </div>
        </div>
      `}).join("")}function Fe(c){return`
      <div class="bonding-reactions-row">
        ${(c.reactions||[]).map(k=>{const m=(e==null?void 0:e._id)||(e==null?void 0:e.id);return`
        <button class="bonding-rxn-tag ${(k.users||[]).some(_=>_.toString()===(m==null?void 0:m.toString()))?"active":""}" data-msg-id="${c._id}" data-emoji="${k.emoji}">
          <span>${k.emoji}</span> <span>${k.users?k.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${c._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function Be(c){const g=r.querySelector("#btn-chat-challenge");g&&(g.onclick=()=>{c?U(null,c.userId||c._id):U()});const d=r.querySelector("#btn-manage-members");d&&(d.onclick=z);const k=r.querySelector("#btn-delete-group");k&&(k.onclick=F);const m=r.querySelector("#btn-delete-direct");m&&(m.onclick=async()=>{if(n&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{m.disabled=!0,await je(`/bonding/channels/${n._id}`),I("1-on-1 chat deleted successfully","success");const _=n._id;o=o.filter(R=>R._id!==_),n=o[0]||null,Ie(),me(),n&&await fe(n._id)}catch(_){I(_.message||"Could not delete 1-on-1 chat","error"),m.disabled=!1}});const E=r.querySelector("#btn-clear-chat");E&&(E.onclick=async()=>{if(n&&confirm("Are you sure you want to clear all messages in this conversation?"))try{E.disabled=!0,await je(`/bonding/channels/${n._id}/messages`),I("Chat messages cleared","success"),a=[],w()}catch(_){I(_.message||"Could not clear chat messages","error")}finally{E.disabled=!1}})}function Ye(c){const g=r.querySelector("#bonding-message-input"),d=r.querySelector("#btn-send-message"),k=r.querySelector("#btn-quick-emoji"),m=r.querySelector("#btn-input-challenge");g&&g.addEventListener("keydown",E=>{E.key==="Enter"&&!E.shiftKey&&(E.preventDefault(),Xe())}),d&&(d.onclick=Xe),m&&(m.onclick=()=>{c?U(null,c.userId||c._id):U()}),k&&(k.onclick=()=>{if(!g)return;const E=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],_=E[Math.floor(Math.random()*E.length)];g.value+=(g.value?" ":"")+_,g.focus()})}function Je(){r.querySelectorAll(".btn-respond-invite").forEach(k=>{k.onclick=async()=>{const m=k.dataset.inviteId,E=k.dataset.action;await Z(m,E)}}),r.querySelectorAll(".btn-launch-match-from-card").forEach(k=>{k.onclick=async()=>{const m=k.dataset.inviteId;try{k.disabled=!0;const E=await Pe("/bonding/invitations"),_=(E.incoming||[]).concat(E.sent||[]).find(R=>R._id===m);_&&_.matchId?Q(_.matchId):I("Match has not started yet or has expired","warning")}catch(E){I(E.message||"Could not load match","error")}finally{k.disabled=!1}}}),r.querySelectorAll(".bonding-msg-del-btn").forEach(k=>{k.onclick=async m=>{m.stopPropagation();const E=k.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{k.disabled=!0,await je(`/bonding/messages/${E}`),a=a.filter(_=>_._id!==E),S(),I("Message deleted","success")}catch(_){I(_.message||"Failed to delete message","error"),k.disabled=!1}}}),r.querySelectorAll(".bonding-rxn-tag").forEach(k=>{k.onclick=async()=>{const m=k.dataset.msgId,E=k.dataset.emoji;await s(m,E)}}),r.querySelectorAll(".bonding-add-rxn-btn").forEach(k=>{k.onclick=m=>{const E=k.dataset.msgId;ae(m.currentTarget,async _=>{await s(E,_)})}})}async function Xe(){const c=r.querySelector("#bonding-message-input");if(!c||!n||A)return;const g=c.value.trim();if(g)try{A=!0,c.value="";const d=await we(`/bonding/channels/${n._id}/messages`,{content:g,type:"text"});a.push(d),w(),x()}catch(d){I(d.message||"Failed to send message","error")}finally{A=!1,c.focus()}}async function s(c,g){try{const d=await we(`/bonding/messages/${c}/react`,{emoji:g}),k=a.find(m=>m._id===c);k&&(k.reactions=d,S())}catch(d){I(d.message||"Failed to react","error")}}function x(){const c=r.querySelector("#bonding-messages-feed");c&&(c.scrollTop=c.scrollHeight)}function S(){const c=r.querySelector("#bonding-messages-feed");if(!c)return;const g=c.scrollHeight-c.scrollTop<=c.clientHeight+80;c.innerHTML=Ne(),Je(),g&&x()}function w(){const c=r.querySelector("#bonding-messages-feed");c&&(c.innerHTML=Ne(),Je())}async function y(c=!1){const g=r.querySelector("#bonding-lounge-main-wrap");if(g){c||(g.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const d=await Pe("/bonding/games/overview");h=d;const k=d.myStats||{},m=d.availableGames||[],E=d.incomingChallenges||[],_=d.sentChallenges||[],R=d.activeMatches||[],N=d.recentMatches||[],j=(e==null?void 0:e._id)||(e==null?void 0:e.id);g.innerHTML=`
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
              ${m.map(D=>`
                <div class="lounge-game-card" data-game-id="${D.id}">
                  <div class="game-card-icon">${D.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${T(D.name)}</h4>
                    <p class="game-card-desc">${T(D.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${D.duration}</span>
                      <span class="meta-pill">👥 2 Players</span>
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${D.id}" data-game-title="${T(D.name)}">
                    ⚔️ Challenge Employee
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
                <span class="badge blue">${E.length+_.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${E.length})</h5>
              ${E.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${E.map(D=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(D.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${T(D.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${T(D.sender.name)}</strong> (${T(D.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${D._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${D._id}" data-action="decline">
                            Decline
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

              <!-- Sent -->
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${_.length})</h5>
              ${_.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${_.map(D=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(D.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${T(D.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${T(D.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${D._id}" data-action="cancel">
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
                <span class="badge green">${R.length} Live</span>
              </div>

              ${R.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${R.map(D=>{const X=j&&D.player1.userId.toString()===j.toString()?D.player2:D.player1,Y=j&&D.currentTurnUserId&&D.currentTurnUserId.toString()===j.toString();return`
                        <div class="lounge-active-match-card ${Y?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${D.gameType==="chess"?"♟️":"❌"}</span>
                            <div>
                              <div class="match-game-title">${T(D.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${T(X.name)}</strong> (${T(X.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${Y?"my-turn":"wait"}">
                              ${Y?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${D._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${D._id}" title="Delete Match">
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
              ${N.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${N.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${N.map(D=>{const X=j&&D.player1.userId.toString()===j.toString()?D.player2:D.player1,Y=j&&D.winnerId&&D.winnerId.toString()===j.toString(),ee=D.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${T(D.gameTitle)}</span>
                          <span class="recent-date">${re(D.completedAt||D.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${D._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${T(X.name)}</strong></div>
                          <div class="recent-outcome ${Y?"win":ee?"draw":"loss"}">
                            ${Y?"🏆 VICTORY":ee?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${T(D.winningReason||D.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${D._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${D._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,M()}catch(d){g.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${T(d.message)}</p>
        </div>
      `}}}function M(){r.querySelectorAll(".btn-challenge-game").forEach(g=>{g.onclick=()=>{const d=g.dataset.gameId;U(d)}}),r.querySelectorAll(".btn-respond-invite").forEach(g=>{g.onclick=async()=>{const d=g.dataset.inviteId,k=g.dataset.action;await Z(d,k),await y()}}),r.querySelectorAll(".btn-resume-match").forEach(g=>{g.onclick=()=>{const d=g.dataset.matchId;Q(d)}}),r.querySelectorAll(".btn-recent-rematch").forEach(g=>{g.onclick=async()=>{const d=g.dataset.matchId;try{g.disabled=!0;const k=await we(`/bonding/matches/${d}/action`,{action:"rematch"});k.match&&(I("Rematch created! Opening arena ⚔️","success"),Q(k.match._id))}catch(k){I(k.message||"Could not start rematch","error")}finally{g.disabled=!1}}}),r.querySelectorAll(".btn-delete-match").forEach(g=>{g.onclick=async d=>{d.stopPropagation();const k=g.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{g.disabled=!0,await je(`/bonding/matches/${k}`),I("Match deleted successfully","success"),await y()}catch(m){I(m.message||"Failed to delete match","error")}finally{g.disabled=!1}}});const c=r.querySelector("#btn-clear-matches");c&&(c.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{c.disabled=!0,await je("/bonding/matches?filter=completed"),I("Completed matches history cleared","success"),await y()}catch(g){I(g.message||"Failed to clear matches","error")}finally{c.disabled=!1}})}function U(c=null,g=null){const d=r.querySelector("#bonding-modals-root"),k=(e==null?void 0:e._id)||(e==null?void 0:e.id),m=new Set(["employee","admin","superadmin"]),E=p.filter(q=>!q.isSelf&&q._id.toString()!==(k==null?void 0:k.toString())&&m.has(q.role));let _=c||"chess",R=g?g.toString():null,N="none";function j(){const q=E.find(X=>X._id.toString()===R);d.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ Send a Multiplayer Game Challenge</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Multiplayer Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${_==="chess"?"active":""}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${_==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                </div>
              </div>

              <!-- Step 2: Mandatory Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 2 — Select Employee to Challenge *</div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${E.map(X=>{const Y=R===X._id.toString();return`
                      <div class="eligible-emp-item ${Y?"selected":""}" data-user-id="${X._id}">
                        <div class="emp-item-avatar">${X.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${T(X.name)}</span>
                          <span class="emp-item-role">${T(X.role==="superadmin"?"Superadmin":X.role==="admin"?"Admin":"Employee")} · ${T(X.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${Y?"active":""}">
                          ${Y?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Step 3: Match Settings (for Chess timers) -->
              ${_==="chess"?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 3 — Time Control Options</div>
                  <div class="timer-opts-row">
                    <label class="timer-radio-lbl ${N==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${N==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${N==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${N==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${N==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${N==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Step 4: Confirmation Preview Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Challenge Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${_==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  <div><strong>Opponent:</strong> ${q?`<strong>${T(q.name)}</strong> (${T(q.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  ${_==="chess"?`<div><strong>Time Control:</strong> ${N==="none"?"Untimed":N}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${R?"":"disabled"}>
                Send Challenge 🚀
              </button>
            </div>
          </div>
        </div>
      `,D()}function D(){d.querySelector(".bonding-modal-close").onclick=()=>{d.innerHTML=""},d.querySelector("#btn-cancel-challenge-flow").onclick=()=>{d.innerHTML=""},d.querySelectorAll(".game-pill-btn").forEach(Y=>{Y.onclick=()=>{_=Y.dataset.game,j()}});const q=d.querySelector("#flow-emp-search");q&&(q.oninput=Y=>{const ee=Y.target.value.toLowerCase().trim();d.querySelectorAll(".eligible-emp-item").forEach(te=>{const ce=te.textContent.toLowerCase();te.style.display=ce.includes(ee)?"flex":"none"})}),d.querySelectorAll(".eligible-emp-item").forEach(Y=>{Y.onclick=()=>{R=Y.dataset.userId,j()}}),d.querySelectorAll('input[name="timerMode"]').forEach(Y=>{Y.onchange=ee=>{N=ee.target.value,j()}});const X=d.querySelector("#btn-submit-challenge-flow");X&&(X.onclick=async()=>{if(!R){I("Please select an employee to challenge","warning");return}try{X.disabled=!0,X.textContent="Sending Challenge...",await we("/bonding/invitations",{gameType:_,targetUserId:R,matchSettings:{timerMode:N},channelId:(n==null?void 0:n._id)||null}),I("Game challenge delivered! Awaiting acceptance ⚔️","success"),d.innerHTML="",n&&await fe(n._id),i==="lounge_games"&&await y()}catch(Y){I(Y.message||"Failed to send challenge","error"),X.disabled=!1,X.textContent="Send Challenge 🚀"}})}j()}async function Z(c,g){if(!(!c||!g))try{const d=await yt(`/bonding/invitations/${c}/respond`,{action:g});g==="accept"?(I("Challenge accepted! Entering match arena ⚔️","success"),d.match&&Q(d.match._id)):g==="decline"?I("Challenge declined","info"):g==="cancel"&&I("Challenge cancelled","info"),n&&await fe(n._id),i==="lounge_games"&&await y()}catch(d){I(d.message||"Action failed","error")}}async function Q(c){if(!c)return;B=c,C&&clearInterval(C);const g=r.querySelector("#bonding-modals-root");let d=null,k=null,m=[];async function E(){try{return d=await Pe(`/bonding/matches/${c}`),d}catch(q){return I(q.message||"Could not load match","error"),_(),null}}if(d=await E(),!d)return;function _(){C&&clearInterval(C),B=null,g.innerHTML="",i==="lounge_games"&&y(!0),n&&fe(n._id,!0)}C=setInterval(async()=>{var ee,te,ce,Te;if(!B||B!==c){clearInterval(C);return}const q=(ee=d==null?void 0:d.currentTurnUserId)==null?void 0:ee.toString(),X=d==null?void 0:d.status,Y=await E();Y&&(((te=Y.currentTurnUserId)==null?void 0:te.toString())!==q||Y.status!==X||((ce=Y.moves)==null?void 0:ce.length)!==((Te=d.moves)==null?void 0:Te.length))&&R()},1500);function R(){if(!d)return;const q=(e==null?void 0:e._id)||(e==null?void 0:e.id),X=q&&d.player1.userId.toString()===q.toString(),Y=X?d.player1:d.player2,ee=X?d.player2:d.player1,te=q&&d.currentTurnUserId&&d.currentTurnUserId.toString()===q.toString(),ce=d.status!=="active";g.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${d.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${T(d.gameTitle)}</h3>
                  <div class="arena-players-vs">
                    <span class="player-tag self">${T(Y.name)} (You · <strong>${d.gameType==="tictactoe"?Y.assignedRole==="X"?"✕":"◯":Y.assignedRole}</strong>)</span>
                    <span class="vs-pill">VS</span>
                    <span class="player-tag opp">${T(ee.name)} (<strong>${d.gameType==="tictactoe"?ee.assignedRole==="X"?"✕":"◯":ee.assignedRole}</strong>)</span>
                  </div>
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${ce?"ended":te?"my-turn":"opp-turn"}">
                ${ce?`<span>🏁 Finished (${T(d.winningReason||d.status)})</span>`:te?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${T(ee.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${d.gameType==="tictactoe"?te?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":te?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${ce?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${d.drawOfferedBy&&d.drawOfferedBy.toString()!==(q==null?void 0:q.toString())&&!ce?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${T(ee.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${d.gameType==="chess"?N(X):""}
              ${d.gameType==="tictactoe"?j():""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${ce?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${d.winnerId&&d.winnerId.toString()===(q==null?void 0:q.toString())?"🏆":d.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${d.winnerId&&d.winnerId.toString()===(q==null?void 0:q.toString())?"VICTORY!":d.status==="draw"?"STALEMATE / DRAW":`${T(d.winnerName)} Wins!`}</h4>
                  <p>Reason: ${T(d.winningReason||"Match concluded")}</p>
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
      `,D(te,X,Y)}function N(q){var oe;const X=((oe=d.gameState)==null?void 0:oe.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Y=new Yt(X),ee=q?d.player1.assignedRole==="white":d.player2.assignedRole==="white",te={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},ce=ee?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Te=ee?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Me='<div class="chess-board-grid">';for(const xe of Te)for(const Ee of ce){const Le=`${Ee}${xe}`,ke=Y.get(Le),it=(Ee.charCodeAt(0)-97+xe)%2!==0,Ze=k===Le,Oe=m.includes(Le),Ge=ke?ke.color==="w"?te[ke.type.toUpperCase()]:te[ke.type]:"";Me+=`
            <div class="chess-sq ${it?"light":"dark"} ${Ze?"selected":""} ${Oe?"legal-dot":""}" data-square="${Le}">
              ${Ge?`<span class="chess-piece ${ke.color==="w"?"white-piece":"black-piece"}">${Ge}</span>`:""}
            </div>
          `}Me+="</div>";const He=(d.moves||[]).map(xe=>{var Ee;return`
        <span class="chess-move-token">${xe.moveNum}. ${((Ee=xe.moveData)==null?void 0:Ee.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${Me}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${He||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function j(){var Y;const q=((Y=d.gameState)==null?void 0:Y.board)||Array(9).fill(null),X=d.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${q.map((ee,te)=>{const ce=X.includes(te);return`
                <div class="ttt-cell ${ee?"filled":"empty"} ${ce?"win-cell":""}" data-cell-idx="${te}">
                  ${ee==="X"?'<span class="ttt-x">✕</span>':ee==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function D(q,X,Y){var He;g.querySelector("#btn-close-arena").onclick=_;const ee=g.querySelector("#btn-arena-resign");ee&&(ee.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{ee.disabled=!0,await we(`/bonding/matches/${c}/action`,{action:"resign"}),await E(),R()}catch(oe){I(oe.message||"Resign failed","error"),ee.disabled=!1}});const te=g.querySelector("#btn-arena-draw");te&&(te.onclick=async()=>{try{await we(`/bonding/matches/${c}/action`,{action:"offer_draw"}),I("Draw offer sent to opponent","info"),await E(),R()}catch(oe){I(oe.message||"Draw offer failed","error")}});const ce=g.querySelector("#btn-confirm-accept-draw");ce&&(ce.onclick=async()=>{try{await we(`/bonding/matches/${c}/action`,{action:"accept_draw"}),I("Draw agreed!","info"),await E(),R()}catch(oe){I(oe.message,"error")}});const Te=g.querySelector("#btn-confirm-decline-draw");Te&&(Te.onclick=async()=>{try{await we(`/bonding/matches/${c}/action`,{action:"decline_draw"}),await E(),R()}catch(oe){I(oe.message,"error")}}),[g.querySelector("#btn-arena-delete-match"),g.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(oe=>{oe.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{oe.disabled=!0,await je(`/bonding/matches/${c}`),I("Match deleted","success"),_(),i==="lounge_games"&&await y()}catch(xe){I(xe.message||"Failed to delete match","error"),oe.disabled=!1}}});const Ce=g.querySelector("#btn-arena-rematch-action");if(Ce&&(Ce.onclick=async()=>{try{Ce.disabled=!0,Ce.textContent="Creating Rematch...";const oe=await we(`/bonding/matches/${c}/action`,{action:"rematch"});oe.match&&(I("Rematch created! New match live ⚔️","success"),C&&clearInterval(C),Q(oe.match._id))}catch(oe){I(oe.message||"Rematch failed","error"),Ce.disabled=!1,Ce.textContent="🔄 Request Rematch"}}),d.gameType==="chess"&&q&&d.status==="active"){const oe=((He=d.gameState)==null?void 0:He.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",xe=new Yt(oe),Ee=Y.assignedRole==="white"?"w":"b";g.querySelectorAll(".chess-sq").forEach(Le=>{Le.onclick=async()=>{const ke=Le.dataset.square;if(k){if(k===ke){k=null,m=[],R();return}if(m.includes(ke)){const Ze=xe.get(k);let Oe;Ze&&Ze.type==="p"&&(ke.endsWith("8")||ke.endsWith("1"))&&(Oe=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const Ge={from:k,to:ke,promotion:Oe?Oe.toLowerCase():void 0};k=null,m=[],d=await we(`/bonding/matches/${c}/move`,{move:Ge}),R()}catch(Ge){I(Ge.message||"Illegal chess move","error"),k=null,m=[],R()}return}}const it=xe.get(ke);it&&it.color===Ee?(k=ke,m=xe.moves({square:ke,verbose:!0}).map(Oe=>Oe.to),R()):(k=null,m=[],R())}})}d.gameType==="tictactoe"&&q&&d.status==="active"&&g.querySelectorAll(".ttt-cell.empty").forEach(oe=>{oe.onclick=async()=>{const xe=oe.dataset.cellIdx;try{oe.style.opacity="0.5",d=await we(`/bonding/matches/${c}/move`,{cellIndex:Number(xe)}),R()}catch(Ee){I(Ee.message||"Invalid move","error")}}})}R()}function z(){if(!n||n.type==="direct")return;const c=r.querySelector("#bonding-modals-root"),g=N=>N==="employee"||N==="admin"||N==="superadmin",d=n.members||[],k=new Set(d.map(N=>{var j;return(j=N.userId)==null?void 0:j.toString()})),m=p.filter(N=>g(N.role)&&!k.has(N._id.toString()));c.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${T(n.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${m.map(N=>`
                    <option value="${N._id}">${T(N.name)} (${T(N.role==="superadmin"?"Superadmin":N.role==="admin"?"Admin":"Employee")})</option>
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
              <label class="bonding-form-label">Current Members (${d.length}):</label>
              <div class="bonding-members-list">
                ${d.map(N=>{const j=(e==null?void 0:e._id)||(e==null?void 0:e.id),D=j&&N.userId&&N.userId.toString()===j.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(N.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${T(N.name)} ${D?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${T(N.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${N.userId}" data-name="${T(N.name)}">
                          ${D?"Leave Group":"Remove"}
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""};const E=c.querySelector("#btn-modal-delete-group");E&&(E.onclick=()=>{c.innerHTML="",F()});const _=c.querySelector("#btn-submit-add-member");_&&(_.onclick=async()=>{const j=c.querySelector("#sel-add-colleague").value;if(!j){I("Please select a colleague to add","warning");return}try{_.disabled=!0,_.textContent="Adding...";const D=await yt(`/bonding/channels/${n._id}/members`,{action:"add",userIds:[j]});I("Colleague added to group! 🎉","success"),n=D.channel,c.innerHTML="",await fe(n._id),me()}catch(D){I(D.message||"Failed to add member","error"),_.disabled=!1,_.textContent="Add to Group"}}),c.querySelectorAll(".btn-remove-member").forEach(N=>{N.onclick=async()=>{const j=N.dataset.userId,D=N.dataset.name;if(confirm(`Are you sure you want to remove ${D} from this group?`))try{N.disabled=!0;const q=await yt(`/bonding/channels/${n._id}/members`,{action:"remove",userId:j});I(`${D} removed from group`,"info"),n=q.channel,c.innerHTML="",await fe(n._id),me()}catch(q){I(q.message||"Failed to remove member","error"),N.disabled=!1}}})}async function F(){if(!n||n.type==="direct")return;const c=n.name;if(confirm(`Are you sure you want to delete the group "${c}"?

All messages in this lounge will be deleted.`))try{await je(`/bonding/channels/${n._id}`),I(`Group "${c}" deleted successfully`,"success"),o=await Pe("/bonding/channels").catch(()=>[]),n=o.find(d=>d.type==="group")||o[0]||null,Ie(),me(),n&&await fe(n._id)}catch(d){I(d.message||"Failed to delete group","error")}}function L(){const c=r.querySelector("#bonding-modals-root"),g=m=>m==="employee"||m==="admin"||m==="superadmin",d=p.filter(m=>!m.isSelf&&g(m.role));c.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${d.map(m=>`
                <div class="bonding-user-pick-item" data-user-id="${m._id}" data-name="${T(m.name)}">
                  <div class="bonding-member-avatar">${m.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${T(m.name)}</span>
                    <span class="user-pick-role">${T(m.role==="superadmin"?"Superadmin":m.role==="admin"?"Admin":"Employee")} · ${T(m.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelectorAll(".bonding-user-pick-item").forEach(m=>{m.onclick=async()=>{const E=m.dataset.userId;try{const _=await we("/bonding/channels",{type:"direct",targetUserId:E});c.innerHTML="",o=await Pe("/bonding/channels"),n=o.find(R=>R._id===_._id)||_,Ie(),me(),await fe(n._id)}catch(_){I(_.message||"Failed to open personal chat","error")}}})}function v(){const c=r.querySelector("#bonding-modals-root"),g=_=>_==="employee"||_==="admin"||_==="superadmin",d=p.filter(_=>!_.isSelf&&g(_.role));c.innerHTML=`
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
                ${d.map(_=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${_._id}" />
                    <span>${T(_.name)} (${T(_.role==="superadmin"?"Superadmin":_.role==="admin"?"Admin":"Employee")})</span>
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelector("#btn-cancel-create-grp").onclick=()=>{c.innerHTML=""};let k="👥";const m=c.querySelectorAll(".avatar-opt");m.forEach(_=>{_.onclick=()=>{m.forEach(R=>R.classList.remove("active")),_.classList.add("active"),k=_.textContent.trim()}});const E=c.querySelector("#btn-confirm-create-grp");E.onclick=async()=>{const _=c.querySelector("#new-group-name"),R=c.querySelector("#new-group-desc"),N=_.value.trim();if(!N){I("Please enter a group name","warning"),_.focus();return}const j=c.querySelectorAll(".new-group-member-chk:checked"),D=Array.from(j).map(q=>q.value);try{E.disabled=!0,E.textContent="Creating...";const q=await we("/bonding/channels",{type:"group",name:N,description:R.value.trim(),avatar:k,memberIds:D});I(`Group "${N}" created! 🎉`,"success"),c.innerHTML="",o=await Pe("/bonding/channels"),n=o.find(X=>X._id===q._id)||q,Ie(),me(),await fe(n._id)}catch(q){I(q.message||"Failed to create group","error"),E.disabled=!1,E.textContent="Create Group 🎉"}}}function ae(c,g){const d=document.querySelector(".bonding-emoji-popup");d&&d.remove();const k=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],m=document.createElement("div");m.className="bonding-emoji-popup",m.innerHTML=k.map(R=>`<button class="emoji-opt-btn" data-e="${R}">${R}</button>`).join("");const E=c.getBoundingClientRect();m.style.top=`${E.bottom+window.scrollY+6}px`,m.style.left=`${E.left+window.scrollX}px`,document.body.appendChild(m),m.querySelectorAll(".emoji-opt-btn").forEach(R=>{R.onclick=N=>{N.stopPropagation(),g(R.dataset.e),m.remove()}});const _=R=>{m.contains(R.target)||(m.remove(),document.removeEventListener("click",_))};setTimeout(()=>document.addEventListener("click",_),10)}function re(c){if(!c)return"";try{return new Date(c).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Wa(){const r=document.getElementById("ci360-bonding-styles");r&&r.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}export{Qa as a,Va as i};
