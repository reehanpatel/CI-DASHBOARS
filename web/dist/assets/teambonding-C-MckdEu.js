var fa=Object.defineProperty;var ma=(r,t,e)=>t in r?fa(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var he=(r,t,e)=>ma(r,typeof t!="symbol"?t+"":t,e);import{c as je,h as I,e as A,n as ha,j as Ye,o as St,k as Tt,g as we}from"./api-BLZ2PdTU.js";const Yt={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function va(){try{const r=localStorage.getItem("ci360_planner_settings");if(r)return Object.assign({},Yt,JSON.parse(r))}catch{}return Object.assign({},Yt)}function xa(r){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(r))}catch{}}function Ue(){const r=new Date,t=r.getFullYear(),e=String(r.getMonth()+1).padStart(2,"0"),i=String(r.getDate()).padStart(2,"0");return`${t}-${e}-${i}`}function $t(r,t){const e=new Date(r+"T00:00:00");e.setDate(e.getDate()+t);const i=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${i}-${o}-${n}`}function bt(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function Ze(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function Jt(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function Mt(r,t=1){const e=new Date(r+"T00:00:00"),i=e.getDay(),o=(i<t?7:0)+i-t,n=new Date(e);n.setDate(e.getDate()-o);const g=[];for(let a=0;a<7;a++){const h=new Date(n);h.setDate(n.getDate()+a);const _=h.getFullYear(),D=String(h.getMonth()+1).padStart(2,"0"),O=String(h.getDate()).padStart(2,"0");g.push(`${_}-${D}-${O}`)}return g}function ya(){try{const r=window.AudioContext||window.webkitAudioContext;if(!r)return;const t=new r,e=t.currentTime,i=t.createOscillator(),o=t.createGain();i.type="sine",i.frequency.setValueAtTime(523.25,e),i.frequency.exponentialRampToValueAtTime(783.99,e+.15),o.gain.setValueAtTime(.2,e),o.gain.exponentialRampToValueAtTime(.001,e+.35),i.connect(o),o.connect(t.destination),i.start(e),i.stop(e+.35)}catch{}}function Va(r,t={}){const{userRole:e="employee",currentUser:i=null,onNavigate:o=null}=t,n=e==="superadmin"||e==="admin";let g=va(),a={selectedDate:Ue(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};ka(),h();async function h(){a.loading=!0,_();try{const s=[je("/tasks")];n&&s.push(je("/personnel").catch(()=>[]));const[x,S]=await Promise.all(s);a.tasks=Array.isArray(x)?x:[],S&&(a.personnelList=Array.isArray(S)?S:[])}catch(s){I("Failed to load planner tasks: "+s.message,!0)}finally{a.loading=!1,K()}}function _(){r.innerHTML=`
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
    `}function D(s){return a.tasks.filter(x=>{var k;if(x.isDeleted===!0)return!1;if(n&&a.selectedPersonnelId!=="all"){const y=((k=x.personnelId)==null?void 0:k._id)||x.personnelId;if(String(y)!==String(a.selectedPersonnelId))return!1}const S=x.dateStr||(x.dueDate?new Date(x.dueDate).toISOString().slice(0,10):"");return S?S===s:s===Ue()})}function O(s,x){if(s.status==="Completed")return!1;const S=s.dateStr||(s.dueDate?new Date(s.dueDate).toISOString().slice(0,10):"");return S?S<x:!1}function C(s,x){const S=s.length,k=s.filter(J=>J.status==="Completed").length,y=s.filter(J=>J.status==="In Progress").length,M=s.filter(J=>J.status==="Pending"||J.status==="Todo").length,V=s.filter(J=>O(J,x)).length,te=S>0?Math.round(k/S*100):0;return{total:S,completed:k,inProgress:y,pending:M,overdue:V,percent:te}}function K(){const s=Ue(),x=a.selectedDate===s,S=D(a.selectedDate),k=C(S,s);r.innerHTML=`
      <div class="ci360-planner-wrap ${g.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${Ze(a.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${A(g.displayName||"Daily Planner")}</h1>
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
              <span class="date-text" id="displayDateLabel">${bt(a.selectedDate)}</span>
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
                    ${A(y.name)} (${A(y.department||y.role||"Team")})
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
              <div class="ci360-circular-progress" style="--val: ${k.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${k.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${k.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <span class="kpi-num">${k.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${k.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${k.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${k.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${k.overdue>0?`
                <div class="kpi-box overdue">
                  <span class="kpi-num">${k.overdue}</span>
                  <span class="kpi-label">Overdue</span>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${k.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${j(S,k)}
        </main>

      </div>
    `,Se(),pt()}function j(s,x){return a.viewMode==="weekly"?ct():a.viewMode==="report"?nt():be(s,x)}function be(s,x){const S=Ue();let k=s;if(a.filterStatus==="pending"?k=k.filter(y=>y.status==="Pending"||y.status==="Todo"):a.filterStatus==="in_progress"?k=k.filter(y=>y.status==="In Progress"):a.filterStatus==="completed"?k=k.filter(y=>y.status==="Completed"):a.filterStatus==="overdue"&&(k=k.filter(y=>O(y,S))),a.searchQuery){const y=a.searchQuery.toLowerCase();k=k.filter(M=>(M.title||"").toLowerCase().includes(y)||(M.description||"").toLowerCase().includes(y)||(M.category||"").toLowerCase().includes(y))}return k.sort((y,M)=>{if(y.status==="Completed"&&M.status!=="Completed")return 1;if(y.status!=="Completed"&&M.status==="Completed")return-1;const V={Urgent:0,High:1,Medium:2,Low:3};return(V[y.priority]||2)-(V[M.priority]||2)}),`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              Today's Focus
            </h2>
            <span class="ci360-task-count-badge">${k.length} ${k.length===1?"task":"tasks"}</span>
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
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${A(a.searchQuery)}">
              ${a.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card -->
        <div class="ci360-quick-add-bar">
          <div class="ci360-quick-add-input-wrap">
            <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${Ze(a.selectedDate)}... (Press Enter to save)">
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
          ${k.length===0?pe():`
            <div class="ci360-task-list">
              ${k.map(y=>Ie(y,S)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function pe(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${Ze(a.selectedDate)}</h3>
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
    `}function Ie(s,x){var V,te,J,z;const S=s.status==="Completed",k=O(s,x),y=`pri-${(s.priority||"medium").toLowerCase()}`,M=`status-${(s.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${S?"is-completed":""} ${k?"is-overdue":""}" data-id="${s._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${S?"checked":""}" data-action="toggle" data-id="${s._id}" title="${S?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${A(s.title)}</span>
          </div>

          ${s.description?`
            <div class="ci360-task-desc">${A(s.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${y}">
              <span class="badge-dot"></span>
              ${A(s.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${M}">
              ${A(s.status||"Pending")}
            </span>

            <!-- Category -->
            ${s.category?`
              <span class="ci360-badge category-badge">
                #${A(s.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${s.startTime||s.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${s.startTime?A(s.startTime):""}
                   ${s.startTime&&s.dueTime?"–":""}
                   ${s.dueTime?A(s.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${k?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${n&&((V=s.personnelId)!=null&&V.name||(te=s.userId)!=null&&te.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${A(((J=s.personnelId)==null?void 0:J.name)||((z=s.userId)==null?void 0:z.name))}
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
    `}function ct(){const s=Mt(a.selectedDate,g.weekStartsOn),x=Ze(s[0]),S=Ze(s[6]),k=Ue();return`
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
          ${s.map(y=>{const M=y===k,V=y===a.selectedDate,te=D(y),J=C(te,k);return`
              <div class="ci360-day-column ${M?"is-today":""} ${V?"is-selected":""}" data-date="${y}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${y}">
                  <div class="day-name">${Jt(y)}</div>
                  <div class="day-number">${new Date(y+"T00:00:00").getDate()}</div>
                  ${M?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${J.completed}/${J.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${J.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${te.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:te.map(z=>`
                    <div class="ci360-mini-task-card ${z.status==="Completed"?"done":""}" data-id="${z._id}">
                      <button type="button" class="mini-check ${z.status==="Completed"?"checked":""}" data-action="toggle" data-id="${z._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${z._id}">
                        <div class="mini-title">${A(z.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(z.priority||"medium").toLowerCase()}">${z.priority||"Med"}</span>
                          ${z.dueTime?`<span class="mini-time">${A(z.dueTime)}</span>`:""}
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
    `}function nt(){const s=Mt(a.selectedDate,g.weekStartsOn),x=bt(s[0]),S=bt(s[6]),k=Ue(),y=a.tasks.filter(F=>{if(F.isDeleted===!0)return!1;const q=F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):"");return s.includes(q)}),M=y.length,V=y.filter(F=>F.status==="Completed").length,te=y.filter(F=>F.status==="In Progress").length,J=M>0?Math.round(V/M*100):0,z={Urgent:0,High:0,Medium:0,Low:0};return y.forEach(F=>{const q=F.priority||"Medium";z[q]!==void 0&&z[q]++}),`
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
            <span class="value" style="font-size:28px;color:var(--green-500)">${V}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${te}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${J}%</span>
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
                ${s.map(F=>{const q=D(F),v=C(q,k);return`
                    <tr>
                      <td><strong>${Jt(F)}</strong></td>
                      <td>${Ze(F)}</td>
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
    `}function Se(){const s=document.getElementById("btnViewDaily"),x=document.getElementById("btnViewWeekly"),S=document.getElementById("btnViewReport");s&&(s.onclick=()=>{a.viewMode="daily",K()}),x&&(x.onclick=()=>{a.viewMode="weekly",K()}),S&&(S.onclick=()=>{a.viewMode="report",K()});const k=document.getElementById("btnPrevDay"),y=document.getElementById("btnNextDay"),M=document.getElementById("btnJumpToday"),V=document.getElementById("hiddenDateInput"),te=document.getElementById("datePickerBadge");k&&(k.onclick=()=>{a.selectedDate=$t(a.selectedDate,-1),K()}),y&&(y.onclick=()=>{a.selectedDate=$t(a.selectedDate,1),K()}),M&&(M.onclick=()=>{a.selectedDate=Ue(),K()}),te&&V&&(te.onclick=()=>{try{typeof V.showPicker=="function"?V.showPicker():V.focus()}catch{V.focus()}},V.onchange=le=>{le.target.value&&(a.selectedDate=le.target.value,K())});const J=document.getElementById("admTeamSelect");J&&(J.onchange=le=>{a.selectedPersonnelId=le.target.value,K()});const z=document.getElementById("btnOpenAddTaskModal");z&&(z.onclick=()=>$e());const F=document.getElementById("btnPlannerActionsMenu"),q=document.getElementById("plannerActionsDropdown");F&&q&&(F.onclick=le=>{le.stopPropagation(),q.classList.toggle("hidden")},document.addEventListener("click",le=>{!q.contains(le.target)&&le.target!==F&&q.classList.add("hidden")}));const v=document.getElementById("btnActionImport");v&&(v.onclick=()=>{q==null||q.classList.add("hidden"),Ke()});const ie=document.getElementById("btnActionExportPng");ie&&(ie.onclick=()=>{q==null||q.classList.add("hidden"),Ve()});const se=document.getElementById("btnActionExportPdf");se&&(se.onclick=()=>{q==null||q.classList.add("hidden"),rt()});const ue=document.getElementById("btnActionBackup");ue&&(ue.onclick=()=>{q==null||q.classList.add("hidden"),it()});const oe=document.getElementById("btnActionSettings");oe&&(oe.onclick=()=>{q==null||q.classList.add("hidden"),ot()})}function pt(s){if(a.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(z=>{z.onclick=()=>{a.filterStatus=z.dataset.f,K()}});const x=document.getElementById("plannerTaskSearchInp");x&&(x.oninput=z=>{a.searchQuery=z.target.value,K()});const S=document.getElementById("btnClearSearch");S&&(S.onclick=()=>{a.searchQuery="",K()});const k=document.getElementById("quickAddTitleInp"),y=document.getElementById("quickAddPriority"),M=document.getElementById("quickAddCategory"),V=document.getElementById("btnQuickAddSubmit"),te=async()=>{const z=((k==null?void 0:k.value)||"").trim();if(!z){I("Please enter a task title",!0),k==null||k.focus();return}try{const F={title:z,dateStr:a.selectedDate,priority:(y==null?void 0:y.value)||g.defaultPriority,category:(M==null?void 0:M.value)||"General",status:"Pending"};n&&a.selectedPersonnelId!=="all"&&(F.personnelId=a.selectedPersonnelId);const q=await we("/tasks",F);a.tasks.unshift(q),I("Task added to today's focus! ✨"),k&&(k.value="",k.focus()),K()}catch(F){I(F.message,!0)}};V&&(V.onclick=te),k&&(k.onkeydown=z=>{z.key==="Enter"&&te()});const J=document.getElementById("btnEmptyStateImport");J&&(J.onclick=()=>Ke())}if(a.viewMode==="weekly"){const x=document.getElementById("btnPrevWeek"),S=document.getElementById("btnNextWeek"),k=document.getElementById("btnThisWeek");x&&(x.onclick=()=>{a.selectedDate=$t(a.selectedDate,-7),K()}),S&&(S.onclick=()=>{a.selectedDate=$t(a.selectedDate,7),K()}),k&&(k.onclick=()=>{a.selectedDate=Ue(),K()}),document.querySelectorAll(".day-col-header").forEach(y=>{y.onclick=()=>{a.selectedDate=y.dataset.date,a.viewMode="daily",K()}}),document.querySelectorAll('[data-action="add-day"]').forEach(y=>{y.onclick=()=>{$e(null,y.dataset.date)}})}if(a.viewMode==="report"){const x=document.getElementById("btnDownloadWeeklyPdf");x&&(x.onclick=rt)}r.querySelectorAll('[data-action="toggle"]').forEach(x=>{x.onclick=async S=>{S.stopPropagation();const k=x.dataset.id;await He(k)}}),r.querySelectorAll('[data-action="edit"]').forEach(x=>{x.onclick=S=>{S.stopPropagation();const k=x.dataset.id,y=a.tasks.find(M=>M._id===k);y&&$e(y)}}),r.querySelectorAll('[data-action="delete"]').forEach(x=>{x.onclick=async S=>{S.stopPropagation();const k=x.dataset.id;await mt(k)}})}async function He(s){const x=a.tasks.find(k=>k._id===s);if(!x)return;const S=x.status!=="Completed";try{const k=await ha(`/tasks/${s}/toggle`,{}),y=a.tasks.findIndex(M=>M._id===s);y!==-1&&(a.tasks[y]=k),S?(g.soundEnabled&&ya(),I("Task marked as completed! 🎉")):I("Task reopened as pending."),K()}catch(k){I(k.message,!0)}}async function mt(s){const x=a.tasks.find(S=>S._id===s);if(x&&confirm(`Are you sure you want to remove "${x.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Ye(`/tasks/${s}`),a.tasks=a.tasks.filter(S=>S._id!==s),I("Task removed from planner (safely stored in database archive)"),K()}catch(S){I(S.message,!0)}}function $e(s=null,x=null){const S=!!s,k=s?s.dateStr||(s.dueDate?new Date(s.dueDate).toISOString().slice(0,10):a.selectedDate):x||a.selectedDate,y=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${S?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${A((s==null?void 0:s.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${A((s==null?void 0:s.description)||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${k}" required>
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
                <option value="Medium" ${!s&&g.defaultPriority==="Medium"||(s==null?void 0:s.priority)==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!s&&g.defaultPriority==="High"||(s==null?void 0:s.priority)==="High"?"selected":""}>High</option>
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
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${A((s==null?void 0:s.category)||"General")}">
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
                ${a.personnelList.map(F=>{var v;const q=((v=s==null?void 0:s.personnelId)==null?void 0:v._id)===F._id||(s==null?void 0:s.personnelId)===F._id;return`<option value="${F._id}" ${q?"selected":""}>${A(F.name)} (${A(F.department||F.role||"Member")})</option>`}).join("")}
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
    `,M=St(y),V=M.querySelector("#taskForm"),te=M.querySelector("#btnModalClose"),J=M.querySelector("#btnCancelModal"),z=()=>M.remove();te&&(te.onclick=z),J&&(J.onclick=z),V.onsubmit=async F=>{var w;F.preventDefault();const q=M.querySelector("#taskTitle").value.trim(),v=M.querySelector("#taskDesc").value.trim(),ie=M.querySelector("#taskDate").value,se=M.querySelector("#taskStartTime").value.trim(),ue=M.querySelector("#taskDueTime").value.trim(),oe=M.querySelector("#taskPriority").value,le=M.querySelector("#taskStatus").value,p=M.querySelector("#taskCategory").value.trim()||"General";if(!q){I("Task title is required",!0);return}const u={title:q,description:v,dateStr:ie,startTime:se,dueTime:ue,priority:oe,status:le,category:p};if(n){const m=(w=M.querySelector("#taskAssignee"))==null?void 0:w.value;m==="all"?(u.assignAll=!0,u.personnelId="all"):m&&(u.personnelId=m)}const d=M.querySelector("#btnSaveTask");d.disabled=!0,d.textContent="Saving...";try{if(S){const m=await Tt(`/tasks/${s._id}`,u),T=a.tasks.findIndex($=>$._id===s._id);T!==-1&&(a.tasks[T]=m),I("Task updated successfully! ✍️")}else{const m=await we("/tasks",u);Array.isArray(m.tasks)?m.tasks.forEach(T=>a.tasks.unshift(T)):a.tasks.unshift(m),I("Task created successfully! ✨")}z(),K()}catch(m){I(m.message,!0),d.disabled=!1,d.textContent=S?"Save Changes":"Create Task"}}}function Ke(){let s=[];const x=`
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
    `,S=St(x),k=()=>S.remove();S.querySelector("#btnImportClose").onclick=k,S.querySelector("#btnCancelImport").onclick=k;const y=S.querySelector("#importTextarea"),M=S.querySelector("#importFileInput"),V=S.querySelector("#importDropzone"),te=S.querySelector("#previewListArea"),J=S.querySelector("#previewCountLabel"),z=S.querySelector("#btnConfirmImport"),F=S.querySelector("#importFileInfo");function q(ie){if(!ie)return[];const se=ie.split(/\r?\n/),ue=[];for(let oe of se)oe=oe.trim(),oe&&(oe=oe.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),oe=oe.replace(/^[-*•]\s+/,""),oe=oe.replace(/^\d+[\.\)]\s+/,""),oe=oe.trim(),oe&&ue.push(oe));return ue}function v(){const ie=y.value,se=q(ie),ue=S.querySelector("#importTargetDate").value,oe=D(ue),le=new Set(oe.map(p=>(p.title||"").trim().toLowerCase()));s=[];for(const p of se){const u=le.has(p.toLowerCase());s.push({title:p,isDuplicate:u})}if(J.textContent=`Preview (${s.length} ${s.length===1?"task":"tasks"} found)`,z.disabled=s.length===0,z.textContent=`Import ${s.length} ${s.length===1?"Task":"Tasks"}`,s.length===0){te.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}te.innerHTML=s.map((p,u)=>`
        <div class="preview-item ${p.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${u+1}.</span>
          <span class="preview-title">${A(p.title)}</span>
          ${p.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}y.oninput=v,V.onclick=()=>M.click(),M.onchange=ie=>{const se=ie.target.files[0];if(!se)return;F.textContent=`File selected: ${se.name} (${Math.round(se.size/1024)} KB)`;const ue=new FileReader;ue.onload=oe=>{y.value=oe.target.result,v()},ue.readAsText(se)},V.ondragover=ie=>{ie.preventDefault(),V.classList.add("dragover")},V.ondragleave=()=>V.classList.remove("dragover"),V.ondrop=ie=>{ie.preventDefault(),V.classList.remove("dragover");const se=ie.dataTransfer.files[0];if(se&&(se.type==="text/plain"||se.name.endsWith(".txt"))){F.textContent=`File dropped: ${se.name}`;const ue=new FileReader;ue.onload=oe=>{y.value=oe.target.result,v()},ue.readAsText(se)}else I("Please drop a valid .txt plain-text file",!0)},z.onclick=async()=>{if(s.length===0)return;z.disabled=!0,z.textContent="Importing...";const ie=S.querySelector("#importTargetDate").value,se=S.querySelector("#importPriority").value,ue=S.querySelector("#importCategory").value.trim()||"General",oe={date:ie,tasks:s.map(le=>({title:le.title,priority:se,category:ue,status:"Pending"}))};n&&a.selectedPersonnelId!=="all"&&(oe.personnelId=a.selectedPersonnelId);try{const le=await we("/tasks/bulk-import",oe);Array.isArray(le.tasks)&&le.tasks.forEach(p=>a.tasks.unshift(p)),I(`Imported ${le.importedCount} tasks successfully! (${le.skippedCount} skipped duplicates)`),k(),a.selectedDate=ie,K()}catch(le){I(le.message,!0),z.disabled=!1,z.textContent="Retry Import"}}}async function Ve(){const s=D(a.selectedDate),x=C(s,Ue()),S=bt(a.selectedDate),k=2,y=800,M=160,V=90,te=65,J=70,z=Math.max(120,s.length*te),F=M+V+z+J,q=document.createElement("canvas");q.width=y*k,q.height=F*k;const v=q.getContext("2d");v.scale(k,k);const ie=document.documentElement.getAttribute("data-theme")==="dark",se=ie?"#0F172A":"#F8FAFC",ue=ie?"#1E293B":"#FFFFFF",oe=ie?"#334155":"#E2E8F0",le=ie?"#F8FAFC":"#0F172A",p=ie?"#94A3B8":"#475569",u="#4F46E5",d="#10B981",w="#F59E0B";v.fillStyle=se,v.fillRect(0,0,y,F),v.fillStyle=ue,Qe(v,24,20,y-48,M-30,16),v.fill(),v.strokeStyle=oe,v.lineWidth=1,v.stroke(),v.fillStyle=u,v.font="bold 12px Inter, sans-serif",v.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),v.fillStyle=le,v.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',v.fillText(S,44,86),v.fillStyle=p,v.font="13px Inter, sans-serif",v.fillText(`Planned focus list · ${x.completed} of ${x.total} tasks completed (${x.percent}%)`,44,114);const m=M+6;v.fillStyle=ue,Qe(v,24,m,y-48,V-16,12),v.fill(),v.stroke();const T=[{label:"TOTAL TASKS",val:String(x.total),color:le},{label:"COMPLETED",val:String(x.completed),color:d},{label:"IN PROGRESS",val:String(x.inProgress),color:w},{label:"PENDING",val:String(x.pending),color:p},{label:"PROGRESS",val:`${x.percent}%`,color:u}],$=(y-48)/T.length;T.forEach((H,P)=>{const X=24+P*$+20;v.fillStyle=H.color,v.font="bold 20px Inter, sans-serif",v.fillText(H.val,X,m+36),v.fillStyle=p,v.font="10px Inter, sans-serif",v.fillText(H.label,X,m+54)});const L=m+V;v.fillStyle=ue,Qe(v,24,L,y-48,z+10,16),v.fill(),v.stroke(),s.length===0?(v.fillStyle=p,v.font="14px Inter, sans-serif",v.textAlign="center",v.fillText("No scheduled tasks recorded for this date.",y/2,L+60),v.textAlign="left"):s.forEach((H,P)=>{const X=L+16+P*te,N=H.status==="Completed";v.beginPath(),v.arc(48,X+14,10,0,Math.PI*2),N?(v.fillStyle=d,v.fill(),v.strokeStyle="#FFFFFF",v.lineWidth=2,v.beginPath(),v.moveTo(44,X+14),v.lineTo(47,X+17),v.lineTo(52,X+11),v.stroke()):(v.strokeStyle=oe,v.lineWidth=2,v.stroke()),v.fillStyle=N?p:le,v.font=`${N?"normal":"500"} 14px Inter, sans-serif`;const ee=H.title.length>55?H.title.slice(0,52)+"...":H.title;if(v.fillText(ee,70,X+18),N){const fe=v.measureText(ee);v.strokeStyle=p,v.lineWidth=1.2,v.beginPath(),v.moveTo(70,X+14),v.lineTo(70+fe.width,X+14),v.stroke()}const ae=H.priority||"Medium";let Q="#E2E8F0",ne="#334155";ae==="Urgent"?(Q="#FEE2E2",ne="#DC2626"):ae==="High"?(Q="#FEF3C7",ne="#D97706"):ae==="Low"&&(Q="#ECFDF5",ne="#059669"),v.fillStyle=Q,Qe(v,y-150,X+4,60,20,10),v.fill(),v.fillStyle=ne,v.font="bold 10px Inter, sans-serif",v.fillText(ae,y-138,X+18);const de=H.dueTime?`🕒 ${H.dueTime}`:H.category||"General";v.fillStyle=p,v.font="11px Inter, sans-serif",v.fillText(de,70,X+34),P<s.length-1&&(v.strokeStyle=oe,v.lineWidth=.6,v.beginPath(),v.moveTo(40,X+48),v.lineTo(y-40,X+48),v.stroke())});const R=F-35;v.fillStyle=p,v.font="11px Inter, sans-serif",v.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,R);try{const H=q.toDataURL("image/png"),P=document.createElement("a");P.href=H,P.download=`ci360-daily-planner-${a.selectedDate}.png`,document.body.appendChild(P),P.click(),P.remove(),I("Daily Planner image exported! 🖼️")}catch(H){I("Failed to export image: "+H.message,!0)}}function Qe(s,x,S,k,y,M){s.beginPath(),s.moveTo(x+M,S),s.lineTo(x+k-M,S),s.quadraticCurveTo(x+k,S,x+k,S+M),s.lineTo(x+k,S+y-M),s.quadraticCurveTo(x+k,S+y,x+k-M,S+y),s.lineTo(x+M,S+y),s.quadraticCurveTo(x,S+y,x,S+y-M),s.lineTo(x,S+M),s.quadraticCurveTo(x,S,x+M,S),s.closePath()}function rt(){const s=Mt(a.selectedDate,g.weekStartsOn),x=bt(s[0]),S=bt(s[6]);Ue();const k=a.tasks.filter(z=>{if(z.isDeleted===!0)return!1;const F=z.dateStr||(z.dueDate?new Date(z.dueDate).toISOString().slice(0,10):"");return s.includes(F)}),y=k.length,M=k.filter(z=>z.status==="Completed").length,V=y>0?Math.round(M/y*100):0,te=window.open("","_blank");if(!te){I("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const J=`
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
            <div class="kpi-num" style="color:#4f46e5">${V}%</div>
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
            ${s.map(z=>{const F=D(z);return F.length===0?`<tr><td><strong>${Ze(z)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:F.map(q=>`
                <tr>
                  <td><strong>${Ze(z)}</strong></td>
                  <td>${A(q.title)}</td>
                  <td><span class="badge badge-${(q.priority||"medium").toLowerCase().slice(0,3)}">${q.priority||"Medium"}</span></td>
                  <td>${A(q.category||"General")}</td>
                  <td>${q.dueTime||q.startTime||"—"}</td>
                  <td class="${q.status==="Completed"?"done":""}">${q.status||"Pending"}</td>
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
    `;te.document.write(J),te.document.close(),I("Weekly PDF report generated for printing! 📄")}function it(){const x=St(`
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
    `),S=()=>x.remove();x.querySelector("#btnBackupClose").onclick=S;const k=x.querySelector("#btnDownloadBackupJson");k.onclick=async()=>{k.disabled=!0,k.textContent="Generating backup...";try{const z=await je("/tasks/backup"),F=new Blob([JSON.stringify(z,null,2)],{type:"application/json"}),q=URL.createObjectURL(F),v=document.createElement("a");v.href=q,v.download=`ci360-planner-backup-${Ue()}.json`,document.body.appendChild(v),v.click(),v.remove(),I("Planner backup downloaded successfully! 💾")}catch(z){I("Backup export failed: "+z.message,!0)}finally{k.disabled=!1,k.textContent="Download JSON Backup"}};const y=x.querySelector("#restoreFileInput"),M=x.querySelector("#restorePreviewArea"),V=x.querySelector("#restoreCountText"),te=x.querySelector("#btnExecuteRestore");let J=null;y.onchange=z=>{const F=z.target.files[0];if(!F)return;const q=new FileReader;q.onload=v=>{try{const ie=JSON.parse(v.target.result),se=Array.isArray(ie.tasks)?ie.tasks:Array.isArray(ie)?ie:null;if(!se||se.length===0){I("Invalid backup file: No tasks found",!0);return}J=se,M.style.display="block",V.textContent=`Valid backup: ${se.length} tasks ready to restore.`,te.disabled=!1}catch(ie){I("Error parsing JSON backup file: "+ie.message,!0),M.style.display="none",te.disabled=!0}},q.readAsText(F)},te.onclick=async()=>{var F;if(!J||J.length===0)return;te.disabled=!0,te.textContent="Restoring...";const z=((F=x.querySelector('input[name="restoreMode"]:checked'))==null?void 0:F.value)||"merge";try{const q=await we("/tasks/restore",{tasks:J,mode:z});I(`Restored ${q.restoredCount} tasks! (${q.skippedCount} skipped) ✨`),S(),await h()}catch(q){I("Restore failed: "+q.message,!0),te.disabled=!1,te.textContent="Retry Restore"}}}function ot(){const s=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${A(g.displayName||"Daily Planner")}">
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
              <input type="text" id="setTimezone" class="input" value="${A(g.timezone||"Asia/Kolkata")}" readonly>
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
    `,x=St(s),S=()=>x.remove();x.querySelector("#btnSettingsClose").onclick=S,x.querySelector("#btnCancelSettings").onclick=S,x.querySelector("#settingsForm").onsubmit=k=>{k.preventDefault(),g.displayName=x.querySelector("#setDisplayName").value.trim()||"Daily Planner",g.weekStartsOn=Number(x.querySelector("#setWeekStart").value),g.defaultPriority=x.querySelector("#setDefaultPriority").value,g.density=x.querySelector("#setDensity").value,g.soundEnabled=x.querySelector("#setSound").checked,xa(g),I("Planner preferences saved! ⚙️"),S(),K()}}}function ka(){if(document.getElementById("ci360-planner-styles"))return;const r=document.createElement("style");r.id="ci360-planner-styles",r.textContent=`
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
  `,document.head.appendChild(r)}function wa(r){return r!==null?{comment:r,variations:[]}:{variations:[]}}function Sa(r,t,e,i,o){const n={move:r,variations:o};return t&&(n.suffix=t),e&&(n.nag=e),i!==null&&(n.comment=i),n}function $a(...r){const[t,...e]=r;let i=t;for(const o of e)o!==null&&(i.variations=[o,...o.variations],o.variations=[],i=o);return t}function _a(r,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const i=e.variations[0];if(!i){e.comment=t.marker.comment;break}e=i}}return{headers:r,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ca(r,t){function e(){this.constructor=r}e.prototype=t.prototype,r.prototype=new e}function ft(r,t,e,i){var o=Error.call(this,r);return Object.setPrototypeOf&&Object.setPrototypeOf(o,ft.prototype),o.expected=t,o.found=e,o.location=i,o.name="SyntaxError",o}Ca(ft,Error);function zt(r,t,e){return e=e||" ",r.length>t?r:(t-=r.length,e+=e.repeat(t),r+e.slice(0,t))}ft.prototype.format=function(r){var t="Error: "+this.message;if(this.location){var e=null,i;for(i=0;i<r.length;i++)if(r[i].source===this.location.source){e=r[i].text.split(/\r\n|\n|\r/g);break}var o=this.location.start,n=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(o):o,g=this.location.source+":"+n.line+":"+n.column;if(e){var a=this.location.end,h=zt("",n.line.toString().length," "),_=e[o.line-1],D=o.line===a.line?a.column:_.length+1,O=D-o.column||1;t+=`
 --> `+g+`
`+h+` |
`+n.line+" | "+_+`
`+h+" | "+zt("",o.column-1," ")+zt("",O,"^")}else t+=`
 at `+g}return t};ft.buildMessage=function(r,t){var e={literal:function(_){return'"'+o(_.text)+'"'},class:function(_){var D=_.parts.map(function(O){return Array.isArray(O)?n(O[0])+"-"+n(O[1]):n(O)});return"["+(_.inverted?"^":"")+D.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(_){return _.description}};function i(_){return _.charCodeAt(0).toString(16).toUpperCase()}function o(_){return _.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(D){return"\\x0"+i(D)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(D){return"\\x"+i(D)})}function n(_){return _.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(D){return"\\x0"+i(D)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(D){return"\\x"+i(D)})}function g(_){return e[_.type](_)}function a(_){var D=_.map(g),O,C;if(D.sort(),D.length>0){for(O=1,C=1;O<D.length;O++)D[O-1]!==D[O]&&(D[C]=D[O],C++);D.length=C}switch(D.length){case 1:return D[0];case 2:return D[0]+" or "+D[1];default:return D.slice(0,-1).join(", ")+", or "+D[D.length-1]}}function h(_){return _?'"'+o(_)+'"':"end of input"}return"Expected "+a(r)+" but "+h(t)+" found."};function Ta(r,t){t=t!==void 0?t:{};var e={},i=t.grammarSource,o={pgn:Gt},n=Gt,g="[",a='"',h="]",_=".",D="O-O-O",O="O-O",C="0-0-0",K="0-0",j="$",be="{",pe="}",Ie=";",ct="(",nt=")",Se="1-0",pt="0-1",He="1/2-1/2",mt="*",$e=/^[a-zA-Z]/,Ke=/^[^"]/,Ve=/^[0-9]/,Qe=/^[.]/,rt=/^[a-zA-Z1-8\-=]/,it=/^[+#]/,ot=/^[!?]/,s=/^[^}]/,x=/^[^\r\n]/,S=/^[ \t\r\n]/,k=qe("tag pair"),y=xe("[",!1),M=xe('"',!1),V=xe("]",!1),te=qe("tag name"),J=Be([["a","z"],["A","Z"]],!1,!1),z=qe("tag value"),F=Be(['"'],!0,!1),q=qe("move number"),v=Be([["0","9"]],!1,!1),ie=xe(".",!1),se=Be(["."],!1,!1),ue=qe("standard algebraic notation"),oe=xe("O-O-O",!1),le=xe("O-O",!1),p=xe("0-0-0",!1),u=xe("0-0",!1),d=Be([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),w=Be(["+","#"],!1,!1),m=qe("suffix annotation"),T=Be(["!","?"],!1,!1),$=qe("NAG"),L=xe("$",!1),R=qe("brace comment"),H=xe("{",!1),P=Be(["}"],!0,!1),X=xe("}",!1),N=qe("rest of line comment"),ee=xe(";",!1),ae=Be(["\r",`
`],!0,!1),Q=qe("variation"),ne=xe("(",!1),de=xe(")",!1),fe=qe("game termination marker"),Me=xe("1-0",!1),Ee=xe("0-1",!1),Ae=xe("1/2-1/2",!1),re=xe("*",!1),ge=qe("whitespace"),_e=Be([" ","	","\r",`
`],!1,!1),Re=function(c,b){return _a(c,b)},ve=function(c){return Object.fromEntries(c)},ze=function(c,b){return[c,b]},Ne=function(c,b){return{root:c,marker:b}},Oe=function(c,b){return $a(wa(c),...b.flat())},Ge=function(c,b,f,U,W){return Sa(c,b,f,U,W)},ht=function(c){return c},kt=function(c){return c.replace(/[\r\n]+/g," ")},Pt=function(c){return c.trim()},gt=function(c){return c},B=function(c,b){return{result:c,comment:b}},l=t.peg$currPos|0,me=[{line:1,column:1}],Le=l,ut=t.peg$maxFailExpected||[],E=t.peg$silentFails|0,Je;if(t.startRule){if(!(t.startRule in o))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');n=o[t.startRule]}function xe(c,b){return{type:"literal",text:c,ignoreCase:b}}function Be(c,b,f){return{type:"class",parts:c,inverted:b,ignoreCase:f}}function Xe(){return{type:"end"}}function qe(c){return{type:"other",description:c}}function We(c){var b=me[c],f;if(b)return b;if(c>=me.length)f=me.length-1;else for(f=c;!me[--f];);for(b=me[f],b={line:b.line,column:b.column};f<c;)r.charCodeAt(f)===10?(b.line++,b.column=1):b.column++,f++;return me[c]=b,b}function Ht(c,b,f){var U=We(c),W=We(b),ce={source:i,start:{offset:c,line:U.line,column:U.column},end:{offset:b,line:W.line,column:W.column}};return ce}function G(c){l<Le||(l>Le&&(Le=l,ut=[]),ut.push(c))}function ra(c,b,f){return new ft(ft.buildMessage(c,b),c,b,f)}function Gt(){var c,b,f;return c=l,b=ia(),f=la(),c=Re(b,f),c}function ia(){var c,b,f;for(c=l,b=[],f=Ut();f!==e;)b.push(f),f=Ut();return f=Pe(),c=ve(b),c}function Ut(){var c,b,f,U,W,ce,st;return E++,c=l,Pe(),r.charCodeAt(l)===91?(b=g,l++):(b=e,E===0&&G(y)),b!==e?(Pe(),f=oa(),f!==e?(Pe(),r.charCodeAt(l)===34?(U=a,l++):(U=e,E===0&&G(M)),U!==e?(W=sa(),r.charCodeAt(l)===34?(ce=a,l++):(ce=e,E===0&&G(M)),ce!==e?(Pe(),r.charCodeAt(l)===93?(st=h,l++):(st=e,E===0&&G(V)),st!==e?c=ze(f,W):(l=c,c=e)):(l=c,c=e)):(l=c,c=e)):(l=c,c=e)):(l=c,c=e),E--,c===e&&E===0&&G(k),c}function oa(){var c,b,f;if(E++,c=l,b=[],f=r.charAt(l),$e.test(f)?l++:(f=e,E===0&&G(J)),f!==e)for(;f!==e;)b.push(f),f=r.charAt(l),$e.test(f)?l++:(f=e,E===0&&G(J));else b=e;return b!==e?c=r.substring(c,l):c=b,E--,c===e&&(b=e,E===0&&G(te)),c}function sa(){var c,b,f;for(E++,c=l,b=[],f=r.charAt(l),Ke.test(f)?l++:(f=e,E===0&&G(F));f!==e;)b.push(f),f=r.charAt(l),Ke.test(f)?l++:(f=e,E===0&&G(F));return c=r.substring(c,l),E--,b=e,E===0&&G(z),c}function la(){var c,b,f;return c=l,b=Wt(),Pe(),f=ba(),f===e&&(f=null),Pe(),c=Ne(b,f),c}function Wt(){var c,b,f,U;for(c=l,b=It(),b===e&&(b=null),f=[],U=Kt();U!==e;)f.push(U),U=Kt();return c=Oe(b,f),c}function Kt(){var c,b,f,U,W,ce,st,wt;if(c=l,Pe(),da(),Pe(),b=ca(),b!==e){for(f=pa(),f===e&&(f=null),U=[],W=Vt();W!==e;)U.push(W),W=Vt();for(W=Pe(),ce=It(),ce===e&&(ce=null),st=[],wt=Qt();wt!==e;)st.push(wt),wt=Qt();c=Ge(b,f,U,ce,st)}else l=c,c=e;return c}function da(){var c,b,f,U,W,ce;for(E++,c=l,b=[],f=r.charAt(l),Ve.test(f)?l++:(f=e,E===0&&G(v));f!==e;)b.push(f),f=r.charAt(l),Ve.test(f)?l++:(f=e,E===0&&G(v));if(r.charCodeAt(l)===46?(f=_,l++):(f=e,E===0&&G(ie)),f!==e){for(U=Pe(),W=[],ce=r.charAt(l),Qe.test(ce)?l++:(ce=e,E===0&&G(se));ce!==e;)W.push(ce),ce=r.charAt(l),Qe.test(ce)?l++:(ce=e,E===0&&G(se));b=[b,f,U,W],c=b}else l=c,c=e;return E--,c===e&&(b=e,E===0&&G(q)),c}function ca(){var c,b,f,U,W,ce;if(E++,c=l,b=l,r.substr(l,5)===D?(f=D,l+=5):(f=e,E===0&&G(oe)),f===e&&(r.substr(l,3)===O?(f=O,l+=3):(f=e,E===0&&G(le)),f===e&&(r.substr(l,5)===C?(f=C,l+=5):(f=e,E===0&&G(p)),f===e&&(r.substr(l,3)===K?(f=K,l+=3):(f=e,E===0&&G(u)),f===e))))if(f=l,U=r.charAt(l),$e.test(U)?l++:(U=e,E===0&&G(J)),U!==e){if(W=[],ce=r.charAt(l),rt.test(ce)?l++:(ce=e,E===0&&G(d)),ce!==e)for(;ce!==e;)W.push(ce),ce=r.charAt(l),rt.test(ce)?l++:(ce=e,E===0&&G(d));else W=e;W!==e?(U=[U,W],f=U):(l=f,f=e)}else l=f,f=e;return f!==e?(U=r.charAt(l),it.test(U)?l++:(U=e,E===0&&G(w)),U===e&&(U=null),f=[f,U],b=f):(l=b,b=e),b!==e?c=r.substring(c,l):c=b,E--,c===e&&(b=e,E===0&&G(ue)),c}function pa(){var c,b,f;for(E++,c=l,b=[],f=r.charAt(l),ot.test(f)?l++:(f=e,E===0&&G(T));f!==e;)b.push(f),b.length>=2?f=e:(f=r.charAt(l),ot.test(f)?l++:(f=e,E===0&&G(T)));return b.length<1?(l=c,c=e):c=b,E--,c===e&&(b=e,E===0&&G(m)),c}function Vt(){var c,b,f,U,W;if(E++,c=l,Pe(),r.charCodeAt(l)===36?(b=j,l++):(b=e,E===0&&G(L)),b!==e){if(f=l,U=[],W=r.charAt(l),Ve.test(W)?l++:(W=e,E===0&&G(v)),W!==e)for(;W!==e;)U.push(W),W=r.charAt(l),Ve.test(W)?l++:(W=e,E===0&&G(v));else U=e;U!==e?f=r.substring(f,l):f=U,f!==e?c=ht(f):(l=c,c=e)}else l=c,c=e;return E--,c===e&&E===0&&G($),c}function It(){var c;return c=ga(),c===e&&(c=ua()),c}function ga(){var c,b,f,U,W;if(E++,c=l,r.charCodeAt(l)===123?(b=be,l++):(b=e,E===0&&G(H)),b!==e){for(f=l,U=[],W=r.charAt(l),s.test(W)?l++:(W=e,E===0&&G(P));W!==e;)U.push(W),W=r.charAt(l),s.test(W)?l++:(W=e,E===0&&G(P));f=r.substring(f,l),r.charCodeAt(l)===125?(U=pe,l++):(U=e,E===0&&G(X)),U!==e?c=kt(f):(l=c,c=e)}else l=c,c=e;return E--,c===e&&(b=e,E===0&&G(R)),c}function ua(){var c,b,f,U,W;if(E++,c=l,r.charCodeAt(l)===59?(b=Ie,l++):(b=e,E===0&&G(ee)),b!==e){for(f=l,U=[],W=r.charAt(l),x.test(W)?l++:(W=e,E===0&&G(ae));W!==e;)U.push(W),W=r.charAt(l),x.test(W)?l++:(W=e,E===0&&G(ae));f=r.substring(f,l),c=Pt(f)}else l=c,c=e;return E--,c===e&&(b=e,E===0&&G(N)),c}function Qt(){var c,b,f,U;return E++,c=l,Pe(),r.charCodeAt(l)===40?(b=ct,l++):(b=e,E===0&&G(ne)),b!==e?(f=Wt(),f!==e?(Pe(),r.charCodeAt(l)===41?(U=nt,l++):(U=e,E===0&&G(de)),U!==e?c=gt(f):(l=c,c=e)):(l=c,c=e)):(l=c,c=e),E--,c===e&&E===0&&G(Q),c}function ba(){var c,b,f;return E++,c=l,r.substr(l,3)===Se?(b=Se,l+=3):(b=e,E===0&&G(Me)),b===e&&(r.substr(l,3)===pt?(b=pt,l+=3):(b=e,E===0&&G(Ee)),b===e&&(r.substr(l,7)===He?(b=He,l+=7):(b=e,E===0&&G(Ae)),b===e&&(r.charCodeAt(l)===42?(b=mt,l++):(b=e,E===0&&G(re))))),b!==e?(Pe(),f=It(),f===e&&(f=null),c=B(b,f)):(l=c,c=e),E--,c===e&&(b=e,E===0&&G(fe)),c}function Pe(){var c,b;for(E++,c=[],b=r.charAt(l),S.test(b)?l++:(b=e,E===0&&G(_e));b!==e;)c.push(b),b=r.charAt(l),S.test(b)?l++:(b=e,E===0&&G(_e));return E--,b=e,E===0&&G(ge),c}if(Je=n(),t.peg$library)return{peg$result:Je,peg$currPos:l,peg$FAILED:e,peg$maxFailExpected:ut,peg$maxFailPos:Le};if(Je!==e&&l===r.length)return Je;throw Je!==e&&l<r.length&&G(Xe()),ra(ut,Le<r.length?r.charAt(Le):null,Le<r.length?Ht(Le,Le+1):Ht(Le,Le))}/**
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
 */const Et=0xffffffffffffffffn;function Lt(r,t){return(r<<t|r>>64n-t)&0xffffffffffffffffn}function Xt(r,t){return r*t&Et}function Ea(r){return function(){let t=BigInt(r&Et),e=BigInt(r>>64n&Et);const i=Xt(Lt(Xt(t,5n),7n),9n);return e^=t,t=(Lt(t,24n)^e^e<<16n)&Et,e=Lt(e,37n),r=e<<64n|t,i}}const Dt=Ea(0xa187eb39cdcaed8f31c4b365b102e01en),Aa=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Dt()))),Da=Array.from({length:8},()=>Dt()),Pa=Array.from({length:16},()=>Dt()),qt=Dt(),De="w",Fe="b",ye="p",Ot="n",At="b",xt="r",at="q",ke="k",Rt="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class _t{constructor(t,e){he(this,"color");he(this,"from");he(this,"to");he(this,"piece");he(this,"captured");he(this,"promotion");he(this,"flags");he(this,"san");he(this,"lan");he(this,"before");he(this,"after");const{color:i,piece:o,from:n,to:g,flags:a,captured:h,promotion:_}=e,D=Ce(n),O=Ce(g);this.color=i,this.piece=o,this.from=D,this.to=O,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=D+O,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const C in Z)Z[C]&a&&(this.flags+=lt[C]);h&&(this.captured=h),_&&(this.promotion=_,this.lan+=_)}isCapture(){return this.flags.indexOf(lt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(lt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(lt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(lt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(lt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(lt.BIG_PAWN)>-1}}const Te=-1,lt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},Z={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},jt={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Ia={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Ma={...jt,...Ia},Y={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},Nt={b:[16,32,17,15],w:[-16,-32,-17,-15]},Zt={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},za=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],La=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],qa={p:1,n:2,b:4,r:8,q:16,k:32},Ra="pnbrqkPNBRQK",ea=[Ot,At,xt,at],Na=7,Ba=6,Fa=1,Oa=0,Ct={[ke]:Z.KSIDE_CASTLE,[at]:Z.QSIDE_CASTLE},et={w:[{square:Y.a1,flag:Z.QSIDE_CASTLE},{square:Y.h1,flag:Z.KSIDE_CASTLE}],b:[{square:Y.a8,flag:Z.QSIDE_CASTLE},{square:Y.h8,flag:Z.KSIDE_CASTLE}]},ja={b:Fa,w:Ba},Bt="--";function dt(r){return r>>4}function yt(r){return r&15}function na(r){return"0123456789".indexOf(r)!==-1}function Ce(r){const t=yt(r),e=dt(r);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function vt(r){return r===De?Fe:De}function Ha(r){const t=r.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const i=parseInt(t[4],10);if(isNaN(i)||i<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const o=t[0].split("/");if(o.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let g=0;g<o.length;g++){let a=0,h=!1;for(let _=0;_<o[g].length;_++)if(na(o[g][_])){if(h)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};a+=parseInt(o[g][_],10),h=!0}else{if(!/^[prnbqkPRNBQK]$/.test(o[g][_]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};a+=1,h=!1}if(a!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const n=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:g,regex:a}of n){if(!a.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${g} king`};if((t[0].match(a)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${g} kings`}}return Array.from(o[0]+o[7]).some(g=>g.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Ga(r,t){const e=r.from,i=r.to,o=r.piece;let n=0,g=0,a=0;for(let h=0,_=t.length;h<_;h++){const D=t[h].from,O=t[h].to,C=t[h].piece;o===C&&e!==D&&i===O&&(n++,dt(e)===dt(D)&&g++,yt(e)===yt(D)&&a++)}return n>0?g>0&&a>0?Ce(e):a>0?Ce(e).charAt(1):Ce(e).charAt(0):""}function tt(r,t,e,i,o,n=void 0,g=Z.NORMAL){const a=dt(i);if(o===ye&&(a===Na||a===Oa))for(let h=0;h<ea.length;h++){const _=ea[h];r.push({color:t,from:e,to:i,piece:o,captured:n,promotion:_,flags:g|Z.PROMOTION})}else r.push({color:t,from:e,to:i,piece:o,captured:n,flags:g})}function ta(r){let t=r.charAt(0);return t>="a"&&t<="h"?r.match(/[a-h]\d.*[a-h]\d/)?void 0:ye:(t=t.toLowerCase(),t==="o"?ke:t)}function Ft(r){return r.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class aa{constructor(t=Rt,{skipValidation:e=!1}={}){he(this,"_board",new Array(128));he(this,"_turn",De);he(this,"_header",{});he(this,"_kings",{w:Te,b:Te});he(this,"_epSquare",-1);he(this,"_halfMoves",0);he(this,"_moveNumber",0);he(this,"_history",[]);he(this,"_comments",{});he(this,"_castling",{w:0,b:0});he(this,"_hash",0n);he(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Te,b:Te},this._turn=De,this._castling={w:0,b:0},this._epSquare=Te,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Ma},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:i=!1}={}){let o=t.split(/\s+/);if(o.length>=2&&o.length<6){const a=["-","-","0","1"];t=o.concat(a.slice(-(6-o.length))).join(" ")}if(o=t.split(/\s+/),!e){const{ok:a,error:h}=Ha(t);if(!a)throw new Error(h)}const n=o[0];let g=0;this.clear({preserveHeaders:i});for(let a=0;a<n.length;a++){const h=n.charAt(a);if(h==="/")g+=8;else if(na(h))g+=parseInt(h,10);else{const _=h<"a"?De:Fe;this._put({type:h.toLowerCase(),color:_},Ce(g)),g++}}this._turn=o[1],o[2].indexOf("K")>-1&&(this._castling.w|=Z.KSIDE_CASTLE),o[2].indexOf("Q")>-1&&(this._castling.w|=Z.QSIDE_CASTLE),o[2].indexOf("k")>-1&&(this._castling.b|=Z.KSIDE_CASTLE),o[2].indexOf("q")>-1&&(this._castling.b|=Z.QSIDE_CASTLE),this._epSquare=o[3]==="-"?Te:Y[o[3]],this._halfMoves=parseInt(o[4],10),this._moveNumber=parseInt(o[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var g,a;let e=0,i="";for(let h=Y.a8;h<=Y.h1;h++){if(this._board[h]){e>0&&(i+=e,e=0);const{color:_,type:D}=this._board[h];i+=_===De?D.toUpperCase():D.toLowerCase()}else e++;h+1&136&&(e>0&&(i+=e),h!==Y.h1&&(i+="/"),e=0,h+=8)}let o="";this._castling[De]&Z.KSIDE_CASTLE&&(o+="K"),this._castling[De]&Z.QSIDE_CASTLE&&(o+="Q"),this._castling[Fe]&Z.KSIDE_CASTLE&&(o+="k"),this._castling[Fe]&Z.QSIDE_CASTLE&&(o+="q"),o=o||"-";let n="-";if(this._epSquare!==Te)if(t)n=Ce(this._epSquare);else{const h=this._epSquare+(this._turn===De?16:-16),_=[h+1,h-1];for(const D of _){if(D&136)continue;const O=this._turn;if(((g=this._board[D])==null?void 0:g.color)===O&&((a=this._board[D])==null?void 0:a.type)===ye){this._makeMove({color:O,from:D,to:this._epSquare,piece:ye,captured:ye,flags:Z.EP_CAPTURE});const C=!this._isKingAttacked(O);if(this._undoMove(),C){n=Ce(this._epSquare);break}}}}return[i,this._turn,o,n,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:i}=this._board[t],o={w:0,b:1}[e],n={p:0,n:1,b:2,r:3,q:4,k:5}[i];return Aa[o][n][t]}_epKey(){return this._epSquare===Te?0n:Da[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Pa[t]}_computeHash(){let t=0n;for(let e=Y.a8;e<=Y.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=qt),t}_updateSetup(t){this._history.length>0||(t!==Rt?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(Rt)}get(t){return this._board[Y[t]]}findPiece(t){var i;const e=[];for(let o=Y.a8;o<=Y.h1;o++){if(o&136){o+=7;continue}!this._board[o]||((i=this._board[o])==null?void 0:i.color)!==t.color||this._board[o].color===t.color&&this._board[o].type===t.type&&e.push(Ce(o))}return e}put({type:t,color:e},i){return this._put({type:t,color:e},i)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},i){if(Ra.indexOf(t.toLowerCase())===-1||!(i in Y))return!1;const o=Y[i];if(t==ke&&!(this._kings[e]==Te||this._kings[e]==o))return!1;const n=this._board[o];return n&&n.type===ke&&(this._kings[n.color]=Te),this._set(o,{type:t,color:e}),t===ke&&(this._kings[e]=o),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(Y[t]),e&&e.type===ke&&(this._kings[e.color]=Te),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var i,o,n,g,a,h,_,D,O,C,K,j;this._hash^=this._castlingKey();const t=((i=this._board[Y.e1])==null?void 0:i.type)===ke&&((o=this._board[Y.e1])==null?void 0:o.color)===De,e=((n=this._board[Y.e8])==null?void 0:n.type)===ke&&((g=this._board[Y.e8])==null?void 0:g.color)===Fe;(!t||((a=this._board[Y.a1])==null?void 0:a.type)!==xt||((h=this._board[Y.a1])==null?void 0:h.color)!==De)&&(this._castling.w&=-65),(!t||((_=this._board[Y.h1])==null?void 0:_.type)!==xt||((D=this._board[Y.h1])==null?void 0:D.color)!==De)&&(this._castling.w&=-33),(!e||((O=this._board[Y.a8])==null?void 0:O.type)!==xt||((C=this._board[Y.a8])==null?void 0:C.color)!==Fe)&&(this._castling.b&=-65),(!e||((K=this._board[Y.h8])==null?void 0:K.type)!==xt||((j=this._board[Y.h8])==null?void 0:j.color)!==Fe)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var n,g;if(this._epSquare===Te)return;const t=this._epSquare+(this._turn===De?-16:16),e=this._epSquare+(this._turn===De?16:-16),i=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((n=this._board[e])==null?void 0:n.color)!==vt(this._turn)||((g=this._board[e])==null?void 0:g.type)!==ye){this._hash^=this._epKey(),this._epSquare=Te;return}const o=a=>{var h,_;return!(a&136)&&((h=this._board[a])==null?void 0:h.color)===this._turn&&((_=this._board[a])==null?void 0:_.type)===ye};i.some(o)||(this._hash^=this._epKey(),this._epSquare=Te)}_attacked(t,e,i){const o=[];for(let n=Y.a8;n<=Y.h1;n++){if(n&136){n+=7;continue}if(this._board[n]===void 0||this._board[n].color!==t)continue;const g=this._board[n],a=n-e;if(a===0)continue;const h=a+119;if(za[h]&qa[g.type]){if(g.type===ye){if(a>0&&g.color===De||a<=0&&g.color===Fe)if(i)o.push(Ce(n));else return!0;continue}if(g.type==="n"||g.type==="k")if(i){o.push(Ce(n));continue}else return!0;const _=La[h];let D=n+_,O=!1;for(;D!==e;){if(this._board[D]!=null){O=!0;break}D+=_}if(!O)if(i){o.push(Ce(n));continue}else return!0}}return i?o:!1}attackers(t,e){return e?this._attacked(e,Y[t],!0):this._attacked(this._turn,Y[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(vt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,Y[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let i=0,o=0;for(let n=Y.a8;n<=Y.h1;n++){if(o=(o+1)%2,n&136){n+=7;continue}const g=this._board[n];g&&(t[g.type]=g.type in t?t[g.type]+1:1,g.type===At&&e.push(o),i++)}if(i===2)return!0;if(i===3&&(t[At]===1||t[Ot]===1))return!0;if(i===t[At]+2){let n=0;const g=e.length;for(let a=0;a<g;a++)n+=e[a];if(n===0||n===g)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:i=void 0}={}){const o=this._moves({square:e,piece:i});return t?o.map(n=>new _t(this,n)):o.map(n=>this._moveToSan(n,o))}_moves({legal:t=!0,piece:e=void 0,square:i=void 0}={}){var K;const o=i?i.toLowerCase():void 0,n=e==null?void 0:e.toLowerCase(),g=[],a=this._turn,h=vt(a);let _=Y.a8,D=Y.h1,O=!1;if(o)if(o in Y)_=D=Y[o],O=!0;else return[];for(let j=_;j<=D;j++){if(j&136){j+=7;continue}if(!this._board[j]||this._board[j].color===h)continue;const{type:be}=this._board[j];let pe;if(be===ye){if(n&&n!==be)continue;pe=j+Nt[a][0],this._board[pe]||(tt(g,a,j,pe,ye),pe=j+Nt[a][1],ja[a]===dt(j)&&!this._board[pe]&&tt(g,a,j,pe,ye,void 0,Z.BIG_PAWN));for(let Ie=2;Ie<4;Ie++)pe=j+Nt[a][Ie],!(pe&136)&&(((K=this._board[pe])==null?void 0:K.color)===h?tt(g,a,j,pe,ye,this._board[pe].type,Z.CAPTURE):pe===this._epSquare&&tt(g,a,j,pe,ye,ye,Z.EP_CAPTURE))}else{if(n&&n!==be)continue;for(let Ie=0,ct=Zt[be].length;Ie<ct;Ie++){const nt=Zt[be][Ie];for(pe=j;pe+=nt,!(pe&136);){if(!this._board[pe])tt(g,a,j,pe,be);else{if(this._board[pe].color===a)break;tt(g,a,j,pe,be,this._board[pe].type,Z.CAPTURE);break}if(be===Ot||be===ke)break}}}}if((n===void 0||n===ke)&&(!O||D===this._kings[a])){if(this._castling[a]&Z.KSIDE_CASTLE){const j=this._kings[a],be=j+2;!this._board[j+1]&&!this._board[be]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,j+1)&&!this._attacked(h,be)&&tt(g,a,this._kings[a],be,ke,void 0,Z.KSIDE_CASTLE)}if(this._castling[a]&Z.QSIDE_CASTLE){const j=this._kings[a],be=j-2;!this._board[j-1]&&!this._board[j-2]&&!this._board[j-3]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,j-1)&&!this._attacked(h,be)&&tt(g,a,this._kings[a],be,ke,void 0,Z.QSIDE_CASTLE)}}if(!t||this._kings[a]===-1)return g;const C=[];for(let j=0,be=g.length;j<be;j++)this._makeMove(g[j]),this._isKingAttacked(a)||C.push(g[j]),this._undoMove();return C}move(t,{strict:e=!1}={}){let i=null;if(typeof t=="string")i=this._moveFromSan(t,e);else if(t===null)i=this._moveFromSan(Bt,e);else if(typeof t=="object"){const n=this._moves();for(let g=0,a=n.length;g<a;g++)if(t.from===Ce(n[g].from)&&t.to===Ce(n[g].to)&&(!("promotion"in n[g])||t.promotion===n[g].promotion)){i=n[g];break}}if(!i)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&i.flags&Z.NULL_MOVE)throw new Error("Null move not allowed when in check");const o=new _t(this,i);return this._makeMove(i),this._incPositionCount(),o}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var o,n,g,a;const e=this._turn,i=vt(e);if(this._push(t),t.flags&Z.NULL_MOVE){e===Fe&&this._moveNumber++,this._halfMoves++,this._turn=i,this._epSquare=Te;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&Z.EP_CAPTURE&&(this._turn===Fe?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===ke){if(this._kings[e]=t.to,t.flags&Z.KSIDE_CASTLE){const h=t.to-1,_=t.to+1;this._movePiece(_,h)}else if(t.flags&Z.QSIDE_CASTLE){const h=t.to+1,_=t.to-2;this._movePiece(_,h)}this._castling[e]=0}if(this._castling[e]){for(let h=0,_=et[e].length;h<_;h++)if(t.from===et[e][h].square&&this._castling[e]&et[e][h].flag){this._castling[e]^=et[e][h].flag;break}}if(this._castling[i]){for(let h=0,_=et[i].length;h<_;h++)if(t.to===et[i][h].square&&this._castling[i]&et[i][h].flag){this._castling[i]^=et[i][h].flag;break}}if(this._hash^=this._castlingKey(),t.flags&Z.BIG_PAWN){let h;e===Fe?h=t.to-16:h=t.to+16,!(t.to-1&136)&&((o=this._board[t.to-1])==null?void 0:o.type)===ye&&((n=this._board[t.to-1])==null?void 0:n.color)===i||!(t.to+1&136)&&((g=this._board[t.to+1])==null?void 0:g.type)===ye&&((a=this._board[t.to+1])==null?void 0:a.color)===i?(this._epSquare=h,this._hash^=this._epKey()):this._epSquare=Te}else this._epSquare=Te;t.piece===ye?this._halfMoves=0:t.flags&(Z.CAPTURE|Z.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===Fe&&this._moveNumber++,this._turn=i,this._hash^=qt}undo(){const t=this._hash,e=this._undoMove();if(e){const i=new _t(this,e);return this._decPositionCount(t),i}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=qt;const i=this._turn,o=vt(i);if(e.flags&Z.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:i})),e.captured)if(e.flags&Z.EP_CAPTURE){let n;i===Fe?n=e.to-16:n=e.to+16,this._set(n,{type:ye,color:o})}else this._set(e.to,{type:e.captured,color:o});if(e.flags&(Z.KSIDE_CASTLE|Z.QSIDE_CASTLE)){let n,g;e.flags&Z.KSIDE_CASTLE?(n=e.to+1,g=e.to-1):(n=e.to-2,g=e.to+1),this._movePiece(g,n)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const i=[];let o=!1;for(const C in this._header)this._header[C]&&i.push(`[${C} "${this._header[C]}"]`+t),o=!0;o&&this._history.length&&i.push(t);const n=C=>{const K=this._comments[this.fen()];if(typeof K<"u"){const j=C.length>0?" ":"";C=`${C}${j}{${K}}`}return C},g=[];for(;this._history.length>0;)g.push(this._undoMove());const a=[];let h="";for(g.length===0&&a.push(n(""));g.length>0;){h=n(h);const C=g.pop();if(!C)break;if(!this._history.length&&C.color==="b"){const K=`${this._moveNumber}. ...`;h=h?`${h} ${K}`:K}else C.color==="w"&&(h.length&&a.push(h),h=this._moveNumber+".");h=h+" "+this._moveToSan(C,this._moves({legal:!0})),this._makeMove(C)}if(h.length&&a.push(n(h)),a.push(this._header.Result||"*"),e===0)return i.join("")+a.join(" ");const _=function(){return i.length>0&&i[i.length-1]===" "?(i.pop(),!0):!1},D=function(C,K){for(const j of K.split(" "))if(j){if(C+j.length>e){for(;_();)C--;i.push(t),C=0}i.push(j),C+=j.length,i.push(" "),C++}return _()&&C--,C};let O=0;for(let C=0;C<a.length;C++){if(O+a[C].length>e&&a[C].includes("{")){O=D(O,a[C]);continue}O+a[C].length>e&&C!==0?(i[i.length-1]===" "&&i.pop(),i.push(t),O=0):C!==0&&(i.push(" "),O++),i.push(a[C]),O+=a[C].length}return i.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??jt[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=jt[t]||null,!0):!1}getHeaders(){const t={};for(const[e,i]of Object.entries(this._header))i!==null&&(t[e]=i);return t}loadPgn(t,{strict:e=!1,newlineChar:i=`\r?
`}={}){i!==`\r?
`&&(t=t.replace(new RegExp(i,"g"),`
`));const o=Ta(t);this.reset();const n=o.headers;let g="";for(const _ in n)_.toLowerCase()==="fen"&&(g=n[_]),this.header(_,n[_]);if(!e)g&&this.load(g,{preserveHeaders:!0});else if(n.SetUp==="1"){if(!("FEN"in n))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(n.FEN,{preserveHeaders:!0})}let a=o.root;for(;a;){if(a.move){const _=this._moveFromSan(a.move,e);if(_==null)throw new Error(`Invalid move in PGN: ${a.move}`);this._makeMove(_),this._incPositionCount()}a.comment!==void 0&&(this._comments[this.fen()]=a.comment),a=a.variations[0]}const h=o.result;h&&Object.keys(this._header).length&&this._header.Result!==h&&this.setHeader("Result",h)}_moveToSan(t,e){let i="";if(t.flags&Z.KSIDE_CASTLE)i="O-O";else if(t.flags&Z.QSIDE_CASTLE)i="O-O-O";else{if(t.flags&Z.NULL_MOVE)return Bt;if(t.piece!==ye){const o=Ga(t,e);i+=t.piece.toUpperCase()+o}t.flags&(Z.CAPTURE|Z.EP_CAPTURE)&&(t.piece===ye&&(i+=Ce(t.from)[0]),i+="x"),i+=Ce(t.to),t.promotion&&(i+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?i+="#":i+="+"),this._undoMove(),i}_moveFromSan(t,e=!1){let i=Ft(t);if(e||(i==="0-0"?i="O-O":i==="0-0-0"&&(i="O-O-O")),i==Bt)return{color:this._turn,from:0,to:0,piece:"k",flags:Z.NULL_MOVE};let o=ta(i),n=this._moves({legal:!0,piece:o});for(let C=0,K=n.length;C<K;C++)if(i===Ft(this._moveToSan(n[C],n)))return n[C];if(e)return null;let g,a,h,_,D,O=!1;if(a=i.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),a?(g=a[1],h=a[2],_=a[3],D=a[4],h.length==1&&(O=!0)):(a=i.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),a&&(g=a[1],h=a[2],_=a[3],D=a[4],h.length==1&&(O=!0))),o=ta(i),n=this._moves({legal:!0,piece:g||o}),!_)return null;for(let C=0,K=n.length;C<K;C++)if(h){if((!g||g.toLowerCase()==n[C].piece)&&Y[h]==n[C].from&&Y[_]==n[C].to&&(!D||D.toLowerCase()==n[C].promotion))return n[C];if(O){const j=Ce(n[C].from);if((!g||g.toLowerCase()==n[C].piece)&&Y[_]==n[C].to&&(h==j[0]||h==j[1])&&(!D||D.toLowerCase()==n[C].promotion))return n[C]}}else if(i===Ft(this._moveToSan(n[C],n)).replace("x",""))return n[C];return null}ascii(){let t=`   +------------------------+
`;for(let e=Y.a8;e<=Y.h1;e++){if(yt(e)===0&&(t+=" "+"87654321"[dt(e)]+" |"),this._board[e]){const i=this._board[e].type,n=this._board[e].color===De?i.toUpperCase():i.toLowerCase();t+=" "+n+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let i=0;const o=this._turn;for(let n=0,g=e.length;n<g;n++)this._makeMove(e[n]),this._isKingAttacked(o)||(t-1>0?i+=this.perft(t-1):i++),this._undoMove();return i}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let i=Y.a8;i<=Y.h1;i++)this._board[i]==null?e.push(null):e.push({square:Ce(i),type:this._board[i].type,color:this._board[i].color}),i+1&136&&(t.push(e),e=[],i+=8);return t}squareColor(t){if(t in Y){const e=Y[t];return(dt(e)+yt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],i=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const o=e.pop();if(!o)break;t?i.push(new _t(this,o)):i.push(this._moveToSan(o,this._moves())),this._makeMove(o)}return i}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},i=o=>{o in this._comments&&(e[o]=this._comments[o])};for(;this._history.length>0;)t.push(this._undoMove());for(i(this.fen());;){const o=t.pop();if(!o)break;this._makeMove(o),i(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const o of[ke,at])e[o]!==void 0&&(e[o]?this._castling[t]|=Ct[o]:this._castling[t]&=~Ct[o]);this._updateCastlingRights();const i=this.getCastlingRights(t);return(e[ke]===void 0||e[ke]===i[ke])&&(e[at]===void 0||e[at]===i[at])}getCastlingRights(t){return{[ke]:(this._castling[t]&Ct[ke])!==0,[at]:(this._castling[t]&Ct[at])!==0}}moveNumber(){return this._moveNumber}}async function Qa(r,t={}){var ue,oe,le;const e=t.currentUser||{};let i="chat",o=[],n=null,g=[],a=[],h=null,_=null,D=!1,O=null,C=null;r.innerHTML=`
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
  `,Ua(),await nt(),$e();const K=r.querySelector("#tab-nav-chat"),j=r.querySelector("#tab-nav-lounge"),be=r.querySelector("#bonding-chat-main-wrap"),pe=r.querySelector("#bonding-lounge-main-wrap");K==null||K.addEventListener("click",()=>{i="chat",K.classList.add("active"),j.classList.remove("active"),be.style.display="grid",pe.style.display="none",$e()}),j==null||j.addEventListener("click",async()=>{i="lounge_games",j.classList.add("active"),K.classList.remove("active"),be.style.display="none",pe.style.display="block",await y()}),(ue=r.querySelector("#btn-top-new-chat"))==null||ue.addEventListener("click",q),(oe=r.querySelector("#btn-top-new-group"))==null||oe.addEventListener("click",v),(le=r.querySelector("#btn-top-challenge"))==null||le.addEventListener("click",()=>V());const Ie=r.querySelector("#bonding-search-input");Ie&&Ie.addEventListener("input",p=>{const u=p.target.value.toLowerCase().trim();r.querySelectorAll(".bonding-channel-item").forEach(w=>{const m=w.textContent.toLowerCase();w.style.display=m.includes(u)?"flex":"none"})}),pt(),new MutationObserver((p,u)=>{document.body.contains(r)||(_&&clearInterval(_),C&&clearInterval(C),u.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function nt(){try{const[p,u]=await Promise.all([je("/bonding/channels").catch(()=>[]),je("/bonding/colleagues").catch(()=>[])]);o=p,g=u,!n&&o.length>0&&(n=o.find(d=>d.name.includes("Lounge"))||o[0]),He(),n&&await Se(n._id)}catch(p){console.error("Failed to load bonding data",p)}}async function Se(p,u=!1){if(p)try{a=await je(`/bonding/channels/${p}/messages`),u?S():k()}catch(d){console.error("Failed to load messages",d)}}function pt(){_&&clearInterval(_),_=setInterval(async()=>{try{if(!document.body.contains(r)){clearInterval(_);return}i==="chat"&&n?await Se(n._id,!0):i==="lounge_games"&&await y(!0)}catch{}},3e3)}function He(){const p=r.querySelector("#bonding-group-list"),u=r.querySelector("#bonding-direct-list");if(!p||!u)return;const d=o.filter(m=>m.type==="group"),w=o.filter(m=>m.type==="direct");d.length===0?p.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':p.innerHTML=d.map(m=>{var $;return`
          <div class="bonding-channel-item ${n&&n._id===m._id?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-icon">${m.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${A(m.name)}</div>
              <div class="bonding-channel-preview">${A((($=m.lastMessage)==null?void 0:$.content)||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),w.length===0?u.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':u.innerHTML=w.map(m=>{var R;const T=n&&n._id===m._id,$=m.displayName||m.name||"Colleague",L=$.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${T?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-avatar">${L}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${A($)}</div>
              <div class="bonding-channel-preview">${A(((R=m.lastMessage)==null?void 0:R.content)||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),mt()}function mt(){var u,d;const p=r.querySelectorAll(".bonding-channel-item");p.forEach(w=>{w.onclick=async m=>{if(m.target.closest(".bonding-channel-del-btn"))return;const T=w.dataset.channelId,$=o.find(L=>L._id===T);$&&(n=$,p.forEach(L=>L.classList.remove("active")),w.classList.add("active"),$e(),await Se($._id))}}),r.querySelectorAll(".bonding-channel-del-btn").forEach(w=>{w.onclick=async m=>{m.stopPropagation();const T=w.dataset.channelId,$=o.find(H=>H._id===T),L=$&&$.type==="direct",R=L?"this 1-on-1 chat":`the group "${($==null?void 0:$.name)||""}"`;if(confirm(`Are you sure you want to delete ${R}? All messages will be permanently removed.`))try{w.disabled=!0,await Ye(`/bonding/channels/${T}`),I(L?"1-on-1 chat deleted":"Group deleted","success"),o=o.filter(H=>H._id!==T),n&&n._id===T&&(n=o[0]||null,$e(),n&&await Se(n._id)),He()}catch(H){I(H.message||"Failed to delete conversation","error"),w.disabled=!1}}}),(u=r.querySelector("#btn-create-group"))==null||u.addEventListener("click",v),(d=r.querySelector("#btn-new-direct-chat"))==null||d.addEventListener("click",q)}function $e(){const p=r.querySelector("#bonding-chat-panel");if(!p)return;if(!n){p.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const u=A(n.displayName||n.name),d=(n.members||[]).length,w=n.type==="group",m=(e==null?void 0:e._id)||(e==null?void 0:e.id),T=w?null:(n.members||[]).find($=>{var L;return((L=$.userId)==null?void 0:L.toString())!==(m==null?void 0:m.toString())});p.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${w?n.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${u}</div>
            <div class="bonding-chat-sub">
              ${w?`<span>${d} members</span> · <span>${A(n.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${w?`
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
        ${Ke()}
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
    `,Qe(T),rt(T),it(),x()}function Ke(){if(!a||a.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const p=(e==null?void 0:e._id)||(e==null?void 0:e.id);return a.map(u=>{var $,L,R,H,P,X,N,ee,ae;const d=u.sender&&u.sender.userId&&p&&u.sender.userId.toString()===p.toString();if(u.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${u._id}">
            <span>ℹ️</span> <span>${A(u.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${u._id}" title="Delete Message">&times;</button>
          </div>
        `;if(u.type==="challenge"&&u.challengeData){const Q=u.challengeData,ne=Q.gameTitle||"Game Challenge",de=Q.gameType||"chess",fe=de==="chess"?"♟️":de==="ludo"?"🎲":"❌",Me=($=Q.gameState)==null?void 0:$.invitationId,Ee=(L=Q.targetUserId)==null?void 0:L.toString(),Ae=(H=(R=u.sender)==null?void 0:R.userId)==null?void 0:H.toString(),re=p&&Ee===p.toString(),ge=p&&Ae===p.toString();return`
          <div class="bonding-msg-row ${d?"self":"other"}" data-msg-id="${u._id}">
            <div class="bonding-msg-avatar" title="${A(((P=u.sender)==null?void 0:P.name)||"Teammate")}">
              ${(((X=u.sender)==null?void 0:X.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${A(((N=u.sender)==null?void 0:N.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${se(u.createdAt)}</span>
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
                  <div class="game-bubble-icon">${fe}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${A(ne)}</h4>
                    <p class="game-bubble-desc">${A(u.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${Q.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':Q.status==="active"||Q.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${A(((ee=Q.status)==null?void 0:ee.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${Q.status==="pending"&&re?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${Me}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${Me}" data-action="decline">
                        Decline
                      </button>
                    `:Q.status==="pending"&&ge?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${Me}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${Me}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${Ve(u)}
            </div>
          </div>
        `}const w=A(((ae=u.sender)==null?void 0:ae.name)||"Teammate"),m=se(u.createdAt),T=Ve(u);return`
        <div class="bonding-msg-row ${d?"self":"other"}" data-msg-id="${u._id}">
          <div class="bonding-msg-avatar" title="${w}">${w.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${w}</span>
              <span class="bonding-msg-time">${m}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${u._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${A(u.content).replace(/\n/g,"<br/>")}
            </div>
            ${T}
          </div>
        </div>
      `}).join("")}function Ve(p){return`
      <div class="bonding-reactions-row">
        ${(p.reactions||[]).map(w=>{const m=(e==null?void 0:e._id)||(e==null?void 0:e.id);return`
        <button class="bonding-rxn-tag ${(w.users||[]).some($=>$.toString()===(m==null?void 0:m.toString()))?"active":""}" data-msg-id="${p._id}" data-emoji="${w.emoji}">
          <span>${w.emoji}</span> <span>${w.users?w.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${p._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function Qe(p){const u=r.querySelector("#btn-chat-challenge");u&&(u.onclick=()=>{p?V(null,p.userId||p._id):V()});const d=r.querySelector("#btn-manage-members");d&&(d.onclick=z);const w=r.querySelector("#btn-delete-group");w&&(w.onclick=F);const m=r.querySelector("#btn-delete-direct");m&&(m.onclick=async()=>{if(n&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{m.disabled=!0,await Ye(`/bonding/channels/${n._id}`),I("1-on-1 chat deleted successfully","success");const $=n._id;o=o.filter(L=>L._id!==$),n=o[0]||null,He(),$e(),n&&await Se(n._id)}catch($){I($.message||"Could not delete 1-on-1 chat","error"),m.disabled=!1}});const T=r.querySelector("#btn-clear-chat");T&&(T.onclick=async()=>{if(n&&confirm("Are you sure you want to clear all messages in this conversation?"))try{T.disabled=!0,await Ye(`/bonding/channels/${n._id}/messages`),I("Chat messages cleared","success"),a=[],k()}catch($){I($.message||"Could not clear chat messages","error")}finally{T.disabled=!1}})}function rt(p){const u=r.querySelector("#bonding-message-input"),d=r.querySelector("#btn-send-message"),w=r.querySelector("#btn-quick-emoji"),m=r.querySelector("#btn-input-challenge");u&&u.addEventListener("keydown",T=>{T.key==="Enter"&&!T.shiftKey&&(T.preventDefault(),ot())}),d&&(d.onclick=ot),m&&(m.onclick=()=>{p?V(null,p.userId||p._id):V()}),w&&(w.onclick=()=>{if(!u)return;const T=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],$=T[Math.floor(Math.random()*T.length)];u.value+=(u.value?" ":"")+$,u.focus()})}function it(){r.querySelectorAll(".btn-respond-invite").forEach(w=>{w.onclick=async()=>{const m=w.dataset.inviteId,T=w.dataset.action;await te(m,T)}}),r.querySelectorAll(".btn-launch-match-from-card").forEach(w=>{w.onclick=async()=>{const m=w.dataset.inviteId;try{w.disabled=!0;const T=await je("/bonding/invitations"),$=(T.incoming||[]).concat(T.sent||[]).find(L=>L._id===m);$&&$.matchId?J($.matchId):I("Match has not started yet or has expired","warning")}catch(T){I(T.message||"Could not load match","error")}finally{w.disabled=!1}}}),r.querySelectorAll(".bonding-msg-del-btn").forEach(w=>{w.onclick=async m=>{m.stopPropagation();const T=w.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{w.disabled=!0,await Ye(`/bonding/messages/${T}`),a=a.filter($=>$._id!==T),S(),I("Message deleted","success")}catch($){I($.message||"Failed to delete message","error"),w.disabled=!1}}}),r.querySelectorAll(".bonding-rxn-tag").forEach(w=>{w.onclick=async()=>{const m=w.dataset.msgId,T=w.dataset.emoji;await s(m,T)}}),r.querySelectorAll(".bonding-add-rxn-btn").forEach(w=>{w.onclick=m=>{const T=w.dataset.msgId;ie(m.currentTarget,async $=>{await s(T,$)})}})}async function ot(){const p=r.querySelector("#bonding-message-input");if(!p||!n||D)return;const u=p.value.trim();if(u)try{D=!0,p.value="";const d=await we(`/bonding/channels/${n._id}/messages`,{content:u,type:"text"});a.push(d),k(),x()}catch(d){I(d.message||"Failed to send message","error")}finally{D=!1,p.focus()}}async function s(p,u){try{const d=await we(`/bonding/messages/${p}/react`,{emoji:u}),w=a.find(m=>m._id===p);w&&(w.reactions=d,S())}catch(d){I(d.message||"Failed to react","error")}}function x(){const p=r.querySelector("#bonding-messages-feed");p&&(p.scrollTop=p.scrollHeight)}function S(){const p=r.querySelector("#bonding-messages-feed");if(!p)return;const u=p.scrollHeight-p.scrollTop<=p.clientHeight+80;p.innerHTML=Ke(),it(),u&&x()}function k(){const p=r.querySelector("#bonding-messages-feed");p&&(p.innerHTML=Ke(),it())}async function y(p=!1){const u=r.querySelector("#bonding-lounge-main-wrap");if(u){p||(u.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const d=await je("/bonding/games/overview");h=d;const w=d.myStats||{},m=d.availableGames||[],T=d.incomingChallenges||[],$=d.sentChallenges||[],L=d.activeMatches||[],R=d.recentMatches||[],H=(e==null?void 0:e._id)||(e==null?void 0:e.id);u.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${w.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${w.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${w.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${w.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${w.gamesPlayed>0?Math.round((w.wins||0)/w.gamesPlayed*100):0}%</span>
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
              ${m.map(P=>`
                <div class="lounge-game-card" data-game-id="${P.id}">
                  <div class="game-card-icon">${P.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${A(P.name)}</h4>
                    <p class="game-card-desc">${A(P.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${P.duration}</span>
                      <span class="meta-pill">👥 2 Players</span>
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${P.id}" data-game-title="${A(P.name)}">
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
                <span class="badge blue">${T.length+$.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${T.length})</h5>
              ${T.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${T.map(P=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(P.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${A(P.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${A(P.sender.name)}</strong> (${A(P.sender.role)})</span>
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
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${$.length})</h5>
              ${$.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${$.map(P=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(P.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${A(P.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${A(P.recipient.name)}</strong></span>
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
                <span class="badge green">${L.length} Live</span>
              </div>

              ${L.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${L.map(P=>{const N=H&&P.player1.userId.toString()===H.toString()?P.player2:P.player1,ee=H&&P.currentTurnUserId&&P.currentTurnUserId.toString()===H.toString();return`
                        <div class="lounge-active-match-card ${ee?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${P.gameType==="chess"?"♟️":P.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${A(P.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${A(N.name)}</strong> (${A(N.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ee?"my-turn":"wait"}">
                              ${ee?"⚡ Your Turn!":"⏳ Opponent Turn"}
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
              ${R.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${R.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${R.map(P=>{const N=H&&P.player1.userId.toString()===H.toString()?P.player2:P.player1,ee=H&&P.winnerId&&P.winnerId.toString()===H.toString(),ae=P.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${A(P.gameTitle)}</span>
                          <span class="recent-date">${se(P.completedAt||P.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${P._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${A(N.name)}</strong></div>
                          <div class="recent-outcome ${ee?"win":ae?"draw":"loss"}">
                            ${ee?"🏆 VICTORY":ae?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${A(P.winningReason||P.status)})</span>
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
      `,M()}catch(d){u.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${A(d.message)}</p>
        </div>
      `}}}function M(){r.querySelectorAll(".btn-challenge-game").forEach(u=>{u.onclick=()=>{const d=u.dataset.gameId;V(d)}}),r.querySelectorAll(".btn-respond-invite").forEach(u=>{u.onclick=async()=>{const d=u.dataset.inviteId,w=u.dataset.action;await te(d,w),await y()}}),r.querySelectorAll(".btn-resume-match").forEach(u=>{u.onclick=()=>{const d=u.dataset.matchId;J(d)}}),r.querySelectorAll(".btn-recent-rematch").forEach(u=>{u.onclick=async()=>{const d=u.dataset.matchId;try{u.disabled=!0;const w=await we(`/bonding/matches/${d}/action`,{action:"rematch"});w.match&&(I("Rematch created! Opening arena ⚔️","success"),J(w.match._id))}catch(w){I(w.message||"Could not start rematch","error")}finally{u.disabled=!1}}}),r.querySelectorAll(".btn-delete-match").forEach(u=>{u.onclick=async d=>{d.stopPropagation();const w=u.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{u.disabled=!0,await Ye(`/bonding/matches/${w}`),I("Match deleted successfully","success"),await y()}catch(m){I(m.message||"Failed to delete match","error")}finally{u.disabled=!1}}});const p=r.querySelector("#btn-clear-matches");p&&(p.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{p.disabled=!0,await Ye("/bonding/matches?filter=completed"),I("Completed matches history cleared","success"),await y()}catch(u){I(u.message||"Failed to clear matches","error")}finally{p.disabled=!1}})}function V(p=null,u=null){const d=r.querySelector("#bonding-modals-root"),w=(e==null?void 0:e._id)||(e==null?void 0:e.id),m=new Set(["employee","admin","superadmin"]),T=g.filter(X=>!X.isSelf&&X._id.toString()!==(w==null?void 0:w.toString())&&m.has(X.role));let $=p||"chess",L=u?u.toString():null,R="none";function H(){const X=T.find(N=>N._id.toString()===L);d.innerHTML=`
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
                  <button class="game-pill-btn ${$==="chess"?"active":""}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${$==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                  <button class="game-pill-btn ${$==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Duel</span>
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
                  ${T.map(N=>{const ee=L===N._id.toString();return`
                      <div class="eligible-emp-item ${ee?"selected":""}" data-user-id="${N._id}">
                        <div class="emp-item-avatar">${N.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${A(N.name)}</span>
                          <span class="emp-item-role">${A(N.role==="superadmin"?"Superadmin":N.role==="admin"?"Admin":"Employee")} · ${A(N.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${ee?"active":""}">
                          ${ee?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Step 3: Match Settings (for Chess timers) -->
              ${$==="chess"?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 3 — Time Control Options</div>
                  <div class="timer-opts-row">
                    <label class="timer-radio-lbl ${R==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${R==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${R==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${R==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${R==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${R==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Step 4: Confirmation Preview Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Challenge Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${$==="ludo"?"🎲 Ludo Duel":$==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  <div><strong>Opponent:</strong> ${X?`<strong>${A(X.name)}</strong> (${A(X.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  ${$==="chess"?`<div><strong>Time Control:</strong> ${R==="none"?"Untimed":R}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${L?"":"disabled"}>
                Send Challenge 🚀
              </button>
            </div>
          </div>
        </div>
      `,P()}function P(){d.querySelector(".bonding-modal-close").onclick=()=>{d.innerHTML=""},d.querySelector("#btn-cancel-challenge-flow").onclick=()=>{d.innerHTML=""},d.querySelectorAll(".game-pill-btn").forEach(ee=>{ee.onclick=()=>{$=ee.dataset.game,H()}});const X=d.querySelector("#flow-emp-search");X&&(X.oninput=ee=>{const ae=ee.target.value.toLowerCase().trim();d.querySelectorAll(".eligible-emp-item").forEach(Q=>{const ne=Q.textContent.toLowerCase();Q.style.display=ne.includes(ae)?"flex":"none"})}),d.querySelectorAll(".eligible-emp-item").forEach(ee=>{ee.onclick=()=>{L=ee.dataset.userId,H()}}),d.querySelectorAll('input[name="timerMode"]').forEach(ee=>{ee.onchange=ae=>{R=ae.target.value,H()}});const N=d.querySelector("#btn-submit-challenge-flow");N&&(N.onclick=async()=>{if(!L){I("Please select an employee to challenge","warning");return}try{N.disabled=!0,N.textContent="Sending Challenge...",await we("/bonding/invitations",{gameType:$,targetUserId:L,matchSettings:{timerMode:R},channelId:(n==null?void 0:n._id)||null}),I("Game challenge delivered! Awaiting acceptance ⚔️","success"),d.innerHTML="",n&&await Se(n._id),i==="lounge_games"&&await y()}catch(ee){I(ee.message||"Failed to send challenge","error"),N.disabled=!1,N.textContent="Send Challenge 🚀"}})}H()}async function te(p,u){if(!(!p||!u))try{const d=await Tt(`/bonding/invitations/${p}/respond`,{action:u});u==="accept"?(I("Challenge accepted! Entering match arena ⚔️","success"),d.match&&J(d.match._id)):u==="decline"?I("Challenge declined","info"):u==="cancel"&&I("Challenge cancelled","info"),n&&await Se(n._id),i==="lounge_games"&&await y()}catch(d){I(d.message||"Action failed","error")}}async function J(p){if(!p)return;O=p,C&&clearInterval(C);const u=r.querySelector("#bonding-modals-root");let d=null,w=null,m=[];async function T(){try{return d=await je(`/bonding/matches/${p}`),d}catch(N){return I(N.message||"Could not load match","error"),$(),null}}if(d=await T(),!d)return;function $(){C&&clearInterval(C),O=null,u.innerHTML="",i==="lounge_games"&&y(!0),n&&Se(n._id,!0)}C=setInterval(async()=>{var Q,ne,de,fe;if(!O||O!==p){clearInterval(C);return}const N=(Q=d==null?void 0:d.currentTurnUserId)==null?void 0:Q.toString(),ee=d==null?void 0:d.status,ae=await T();ae&&(((ne=ae.currentTurnUserId)==null?void 0:ne.toString())!==N||ae.status!==ee||((de=ae.moves)==null?void 0:de.length)!==((fe=d.moves)==null?void 0:fe.length))&&L()},1500);function L(){var fe;if(!d)return;const N=(e==null?void 0:e._id)||(e==null?void 0:e.id),ee=N&&d.player1.userId.toString()===N.toString(),ae=ee?d.player1:d.player2,Q=ee?d.player2:d.player1,ne=N&&d.currentTurnUserId&&d.currentTurnUserId.toString()===N.toString(),de=d.status!=="active";u.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${d.gameType==="ludo"?"🎲":d.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${A(d.gameTitle)}</h3>
                  <div class="arena-players-vs">
                    <span class="player-tag self">${A(ae.name)} (You · <strong>${d.gameType==="ludo"?ae.assignedRole==="red"?"🔴 Red":"🟢 Green":d.gameType==="tictactoe"?ae.assignedRole==="X"?"✕":"◯":ae.assignedRole}</strong>)</span>
                    <span class="vs-pill">VS</span>
                    <span class="player-tag opp">${A(Q.name)} (<strong>${d.gameType==="ludo"?Q.assignedRole==="red"?"🔴 Red":"🟢 Green":d.gameType==="tictactoe"?Q.assignedRole==="X"?"✕":"◯":Q.assignedRole}</strong>)</span>
                  </div>
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${de?"ended":ne?"my-turn":"opp-turn"}">
                ${de?`<span>🏁 Finished (${A(d.winningReason||d.status)})</span>`:ne?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${A(Q.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${d.gameType==="ludo"?ne?(fe=d.gameState)!=null&&fe.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":d.gameType==="tictactoe"?ne?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":ne?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${de?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${d.drawOfferedBy&&d.drawOfferedBy.toString()!==(N==null?void 0:N.toString())&&!de?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${A(Q.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${d.gameType==="chess"?R(ee):""}
              ${d.gameType==="tictactoe"?H():""}
              ${d.gameType==="ludo"?P(ee,ae,ne):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${de?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${d.winnerId&&d.winnerId.toString()===(N==null?void 0:N.toString())?"🏆":d.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${d.winnerId&&d.winnerId.toString()===(N==null?void 0:N.toString())?"VICTORY!":d.status==="draw"?"STALEMATE / DRAW":`${A(d.winnerName)} Wins!`}</h4>
                  <p>Reason: ${A(d.winningReason||"Match concluded")}</p>
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
      `,X(ne,ee,ae)}function R(N){var re;const ee=((re=d.gameState)==null?void 0:re.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",ae=new aa(ee),Q=N?d.player1.assignedRole==="white":d.player2.assignedRole==="white",ne={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},de=Q?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],fe=Q?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Me='<div class="chess-board-grid">';for(const ge of fe)for(const _e of de){const Re=`${_e}${ge}`,ve=ae.get(Re),ze=(_e.charCodeAt(0)-97+ge)%2!==0,Ne=w===Re,Oe=m.includes(Re),Ge=ve?ve.color==="w"?ne[ve.type.toUpperCase()]:ne[ve.type]:"";Me+=`
            <div class="chess-sq ${ze?"light":"dark"} ${Ne?"selected":""} ${Oe?"legal-dot":""}" data-square="${Re}">
              ${Ge?`<span class="chess-piece ${ve.color==="w"?"white-piece":"black-piece"}">${Ge}</span>`:""}
            </div>
          `}Me+="</div>";const Ae=(d.moves||[]).map(ge=>{var _e;return`
        <span class="chess-move-token">${ge.moveNum}. ${((_e=ge.moveData)==null?void 0:_e.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${Me}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${Ae||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function H(){var ae;const N=((ae=d.gameState)==null?void 0:ae.board)||Array(9).fill(null),ee=d.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${N.map((Q,ne)=>{const de=ee.includes(ne);return`
                <div class="ttt-cell ${Q?"filled":"empty"} ${de?"win-cell":""}" data-cell-idx="${ne}">
                  ${Q==="X"?'<span class="ttt-x">✕</span>':Q==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function P(N,ee,ae){const Q=d.gameState||{},ne=Q.p1Tokens||[{id:0,step:-1},{id:1,step:-1}],de=Q.p2Tokens||[{id:0,step:-1},{id:1,step:-1}],fe=ee.assignedRole,Me=fe==="red"?ne:de,Ee=!!Q.rolled,Ae=Q.dice,re=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],ge=[[7,1],[7,2],[7,3],[7,4],[7,5]],_e=[[1,7],[2,7],[3,7],[4,7],[5,7]],Re=[0,8,13,21,26,34,39,47];function ve(B,l){return l<0?null:l>=56?B==="red"?[7,6]:[6,7]:B==="red"?l<=50?re[l]:ge[l-51]:l<=50?re[(13+l)%52]:_e[l-51]}function ze(B){return!ae||!Ee||!Ae||d.status!=="active"?!1:B.step===-1?Ae===6:B.step>=0&&B.step+Ae<=56}const Ne={};ne.forEach(B=>{if(B.step>=0&&B.step<56){const l=ve("red",B.step);if(l){const me=l[0]+","+l[1];(Ne[me]=Ne[me]||[]).push({color:"red",id:B.id,step:B.step,movable:fe==="red"&&ze(B)})}}}),de.forEach(B=>{if(B.step>=0&&B.step<56){const l=ve("green",B.step);if(l){const me=l[0]+","+l[1];(Ne[me]=Ne[me]||[]).push({color:"green",id:B.id,step:B.step,movable:fe==="green"&&ze(B)})}}});const Oe={};re.forEach(([B,l],me)=>{Oe[B+","+l]=me});const Ge={};ge.forEach(([B,l],me)=>{Ge[B+","+l]=me+1});const ht={};_e.forEach(([B,l],me)=>{ht[B+","+l]=me+1});const kt=[];for(let B=0;B<15;B++)for(let l=0;l<15;l++){if(B<6&&l<6||B<6&&l>8||B>8&&l<6||B>8&&l>8||B>=6&&B<=8&&l>=6&&l<=8)continue;const me=B+","+l,Le=Oe[me],ut=Ge[me],E=ht[me],Je=Le!==void 0&&Re.includes(Le),xe=B===6&&l===1,Be=B===1&&l===8;let Xe="ludo-cell";xe?Xe+=" cell-red-start":Be?Xe+=" cell-green-start":ut?Xe+=" cell-red-stretch":E?Xe+=" cell-green-stretch":Je&&(Xe+=" cell-safe-star");const qe=Ne[me]||[];kt.push(`
            <div class="${Xe}" style="grid-row:${B+1};grid-column:${l+1}" data-pos="${me}">
              ${Je?'<span class="cell-star-glyph">⭐</span>':""}
              ${xe?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Be?'<span class="cell-arrow-glyph">➔</span>':""}
              ${qe.map(We=>`
                <div class="ludo-token token-${We.color} ${We.movable?"movable":""}" data-token-id="${We.id}" data-color="${We.color}" title="${We.color==="red"?"Red":"Green"} Token ${We.id+1}">
                  <span>${We.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}const Pt=["","⚀","⚁","⚂","⚃","⚄","⚅"];function gt(B){return B.step===-1?"In Base":B.step===56?"🏁 Home!":B.step>50?`Stretch ${B.step-50}/5`:`Step ${B.step}/50`}return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            <div class="ludo-yard red-yard">
              <div class="yard-box">
                <div class="yard-title">🔴 Red Base</div>
                <div class="yard-slots">
                  <div class="yard-token-slot">
                    ${ne[0].step===-1?`
                      <div class="ludo-token token-red ${fe==="red"&&ze(ne[0])?"movable":""}" data-token-id="0" data-color="red" title="Red Token 1">
                        <span>1</span>
                      </div>
                    `:'<span class="slot-empty">1</span>'}
                  </div>
                  <div class="yard-token-slot">
                    ${ne[1].step===-1?`
                      <div class="ludo-token token-red ${fe==="red"&&ze(ne[1])?"movable":""}" data-token-id="1" data-color="red" title="Red Token 2">
                        <span>2</span>
                      </div>
                    `:'<span class="slot-empty">2</span>'}
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            <div class="ludo-yard green-yard">
              <div class="yard-box">
                <div class="yard-title">🟢 Green Base</div>
                <div class="yard-slots">
                  <div class="yard-token-slot">
                    ${de[0].step===-1?`
                      <div class="ludo-token token-green ${fe==="green"&&ze(de[0])?"movable":""}" data-token-id="0" data-color="green" title="Green Token 1">
                        <span>1</span>
                      </div>
                    `:'<span class="slot-empty">1</span>'}
                  </div>
                  <div class="yard-token-slot">
                    ${de[1].step===-1?`
                      <div class="ludo-token token-green ${fe==="green"&&ze(de[1])?"movable":""}" data-token-id="1" data-color="green" title="Green Token 2">
                        <span>2</span>
                      </div>
                    `:'<span class="slot-empty">2</span>'}
                  </div>
                </div>
              </div>
            </div>

            <!-- 3. Blue Base Yard (Bottom-Left 6x6, Decorative) -->
            <div class="ludo-yard blue-yard">
              <div class="yard-box decorative">
                <div class="yard-title">🔵 Blue (Inactive)</div>
              </div>
            </div>

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6, Decorative) -->
            <div class="ludo-yard yellow-yard">
              <div class="yard-box decorative">
                <div class="yard-title">🟡 Yellow (Inactive)</div>
              </div>
            </div>

            <!-- 5. Center Home Victory Zone (3x3) -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${ne.filter(B=>B.step===56).map(B=>`<span class="tok-finished red" title="Red Token ${B.id+1} Home">🔴${B.id+1}</span>`).join("")}
                  ${de.filter(B=>B.step===56).map(B=>`<span class="tok-finished green" title="Green Token ${B.id+1} Home">🟢${B.id+1}</span>`).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${kt.join("")}
          </div>

          <!-- Ludo Action & Dice Roller Console -->
          <div class="ludo-console">
            <div class="ludo-dice-box">
              <div class="ludo-dice-visual ${Ee?"rolled":""}">
                ${Ae?`<span class="dice-glyph">${Pt[Ae]}</span>`:"🎲"}
              </div>
              ${Ae?`<span class="dice-num-lbl">Rolled ${Ae}</span>`:'<span class="dice-num-lbl">Ready</span>'}
            </div>

            <div class="ludo-controls-box">
              ${ae&&!Ee&&d.status==="active"?`
                <button class="btn-ludo-roll pulse" id="btn-ludo-roll">🎲 Roll Dice</button>
              `:ae&&Ee&&d.status==="active"?`
                <div class="ludo-prompt-text highlight">
                  ${Me.some(B=>ze(B))?"👉 Tap your <strong>glowing token</strong> to advance!":"No moves possible with this roll. Turn passing..."}
                </div>
              `:`
                <div class="ludo-prompt-text">
                  ${d.status==="active"?"⏳ Waiting for opponent...":"🏁 Match Concluded"}
                </div>
              `}

              <div class="ludo-status-banner">
                ${A(Q.lastActionText||"Match in progress.")}
              </div>
            </div>
          </div>

          <!-- Token Progress Strip -->
          <div class="ludo-progress-strip">
            <div class="progress-pill red">
              <strong>🔴 Red (P1):</strong> T1: ${gt(ne[0])} · T2: ${gt(ne[1])}
            </div>
            <div class="progress-pill green">
              <strong>🟢 Green (P2):</strong> T1: ${gt(de[0])} · T2: ${gt(de[1])}
            </div>
          </div>
        </div>
      `}function X(N,ee,ae){var Ae;u.querySelector("#btn-close-arena").onclick=$;const Q=u.querySelector("#btn-arena-resign");Q&&(Q.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{Q.disabled=!0,await we(`/bonding/matches/${p}/action`,{action:"resign"}),await T(),L()}catch(re){I(re.message||"Resign failed","error"),Q.disabled=!1}});const ne=u.querySelector("#btn-arena-draw");ne&&(ne.onclick=async()=>{try{await we(`/bonding/matches/${p}/action`,{action:"offer_draw"}),I("Draw offer sent to opponent","info"),await T(),L()}catch(re){I(re.message||"Draw offer failed","error")}});const de=u.querySelector("#btn-confirm-accept-draw");de&&(de.onclick=async()=>{try{await we(`/bonding/matches/${p}/action`,{action:"accept_draw"}),I("Draw agreed!","info"),await T(),L()}catch(re){I(re.message,"error")}});const fe=u.querySelector("#btn-confirm-decline-draw");fe&&(fe.onclick=async()=>{try{await we(`/bonding/matches/${p}/action`,{action:"decline_draw"}),await T(),L()}catch(re){I(re.message,"error")}}),[u.querySelector("#btn-arena-delete-match"),u.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(re=>{re.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{re.disabled=!0,await Ye(`/bonding/matches/${p}`),I("Match deleted","success"),$(),i==="lounge_games"&&await y()}catch(ge){I(ge.message||"Failed to delete match","error"),re.disabled=!1}}});const Ee=u.querySelector("#btn-arena-rematch-action");if(Ee&&(Ee.onclick=async()=>{try{Ee.disabled=!0,Ee.textContent="Creating Rematch...";const re=await we(`/bonding/matches/${p}/action`,{action:"rematch"});re.match&&(I("Rematch created! New match live ⚔️","success"),C&&clearInterval(C),J(re.match._id))}catch(re){I(re.message||"Rematch failed","error"),Ee.disabled=!1,Ee.textContent="🔄 Request Rematch"}}),d.gameType==="chess"&&N&&d.status==="active"){const re=((Ae=d.gameState)==null?void 0:Ae.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",ge=new aa(re),_e=ae.assignedRole==="white"?"w":"b";u.querySelectorAll(".chess-sq").forEach(Re=>{Re.onclick=async()=>{const ve=Re.dataset.square;if(w){if(w===ve){w=null,m=[],L();return}if(m.includes(ve)){const Ne=ge.get(w);let Oe;Ne&&Ne.type==="p"&&(ve.endsWith("8")||ve.endsWith("1"))&&(Oe=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const Ge={from:w,to:ve,promotion:Oe?Oe.toLowerCase():void 0};w=null,m=[],d=await we(`/bonding/matches/${p}/move`,{move:Ge}),L()}catch(Ge){I(Ge.message||"Illegal chess move","error"),w=null,m=[],L()}return}}const ze=ge.get(ve);ze&&ze.color===_e?(w=ve,m=ge.moves({square:ve,verbose:!0}).map(Oe=>Oe.to),L()):(w=null,m=[],L())}})}if(d.gameType==="tictactoe"&&N&&d.status==="active"&&u.querySelectorAll(".ttt-cell.empty").forEach(re=>{re.onclick=async()=>{const ge=re.dataset.cellIdx;try{re.style.opacity="0.5",d=await we(`/bonding/matches/${p}/move`,{cellIndex:Number(ge)}),L()}catch(_e){I(_e.message||"Invalid move","error")}}}),d.gameType==="ludo"&&d.status==="active"){const re=u.querySelector("#btn-ludo-roll");re&&N&&(re.onclick=async()=>{try{re.disabled=!0,re.textContent="Rolling 🎲...",d=await we(`/bonding/matches/${p}/move`,{action:"roll"}),L()}catch(ge){I(ge.message||"Failed to roll","error"),re.disabled=!1,re.textContent="🎲 Roll Dice"}}),N&&u.querySelectorAll(".ludo-token.movable").forEach(ge=>{ge.onclick=async _e=>{_e.stopPropagation();const Re=ge.dataset.tokenId;try{ge.style.opacity="0.5",d=await we(`/bonding/matches/${p}/move`,{action:"move",tokenId:Number(Re)}),L()}catch(ve){I(ve.message||"Invalid token move","error"),ge.style.opacity="1"}}})}}L()}function z(){if(!n||n.type==="direct")return;const p=r.querySelector("#bonding-modals-root"),u=R=>R==="employee"||R==="admin"||R==="superadmin",d=n.members||[],w=new Set(d.map(R=>{var H;return(H=R.userId)==null?void 0:H.toString()})),m=g.filter(R=>u(R.role)&&!w.has(R._id.toString()));p.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${A(n.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${m.map(R=>`
                    <option value="${R._id}">${A(R.name)} (${A(R.role==="superadmin"?"Superadmin":R.role==="admin"?"Admin":"Employee")})</option>
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
                ${d.map(R=>{const H=(e==null?void 0:e._id)||(e==null?void 0:e.id),P=H&&R.userId&&R.userId.toString()===H.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(R.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${A(R.name)} ${P?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${A(R.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${R.userId}" data-name="${A(R.name)}">
                          ${P?"Leave Group":"Remove"}
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""};const T=p.querySelector("#btn-modal-delete-group");T&&(T.onclick=()=>{p.innerHTML="",F()});const $=p.querySelector("#btn-submit-add-member");$&&($.onclick=async()=>{const H=p.querySelector("#sel-add-colleague").value;if(!H){I("Please select a colleague to add","warning");return}try{$.disabled=!0,$.textContent="Adding...";const P=await Tt(`/bonding/channels/${n._id}/members`,{action:"add",userIds:[H]});I("Colleague added to group! 🎉","success"),n=P.channel,p.innerHTML="",await Se(n._id),$e()}catch(P){I(P.message||"Failed to add member","error"),$.disabled=!1,$.textContent="Add to Group"}}),p.querySelectorAll(".btn-remove-member").forEach(R=>{R.onclick=async()=>{const H=R.dataset.userId,P=R.dataset.name;if(confirm(`Are you sure you want to remove ${P} from this group?`))try{R.disabled=!0;const X=await Tt(`/bonding/channels/${n._id}/members`,{action:"remove",userId:H});I(`${P} removed from group`,"info"),n=X.channel,p.innerHTML="",await Se(n._id),$e()}catch(X){I(X.message||"Failed to remove member","error"),R.disabled=!1}}})}async function F(){if(!n||n.type==="direct")return;const p=n.name;if(confirm(`Are you sure you want to delete the group "${p}"?

All messages in this lounge will be deleted.`))try{await Ye(`/bonding/channels/${n._id}`),I(`Group "${p}" deleted successfully`,"success"),o=await je("/bonding/channels").catch(()=>[]),n=o.find(d=>d.type==="group")||o[0]||null,He(),$e(),n&&await Se(n._id)}catch(d){I(d.message||"Failed to delete group","error")}}function q(){const p=r.querySelector("#bonding-modals-root"),u=m=>m==="employee"||m==="admin"||m==="superadmin",d=g.filter(m=>!m.isSelf&&u(m.role));p.innerHTML=`
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
                <div class="bonding-user-pick-item" data-user-id="${m._id}" data-name="${A(m.name)}">
                  <div class="bonding-member-avatar">${m.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${A(m.name)}</span>
                    <span class="user-pick-role">${A(m.role==="superadmin"?"Superadmin":m.role==="admin"?"Admin":"Employee")} · ${A(m.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelectorAll(".bonding-user-pick-item").forEach(m=>{m.onclick=async()=>{const T=m.dataset.userId;try{const $=await we("/bonding/channels",{type:"direct",targetUserId:T});p.innerHTML="",o=await je("/bonding/channels"),n=o.find(L=>L._id===$._id)||$,He(),$e(),await Se(n._id)}catch($){I($.message||"Failed to open personal chat","error")}}})}function v(){const p=r.querySelector("#bonding-modals-root"),u=$=>$==="employee"||$==="admin"||$==="superadmin",d=g.filter($=>!$.isSelf&&u($.role));p.innerHTML=`
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
                ${d.map($=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${$._id}" />
                    <span>${A($.name)} (${A($.role==="superadmin"?"Superadmin":$.role==="admin"?"Admin":"Employee")})</span>
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelector("#btn-cancel-create-grp").onclick=()=>{p.innerHTML=""};let w="👥";const m=p.querySelectorAll(".avatar-opt");m.forEach($=>{$.onclick=()=>{m.forEach(L=>L.classList.remove("active")),$.classList.add("active"),w=$.textContent.trim()}});const T=p.querySelector("#btn-confirm-create-grp");T.onclick=async()=>{const $=p.querySelector("#new-group-name"),L=p.querySelector("#new-group-desc"),R=$.value.trim();if(!R){I("Please enter a group name","warning"),$.focus();return}const H=p.querySelectorAll(".new-group-member-chk:checked"),P=Array.from(H).map(X=>X.value);try{T.disabled=!0,T.textContent="Creating...";const X=await we("/bonding/channels",{type:"group",name:R,description:L.value.trim(),avatar:w,memberIds:P});I(`Group "${R}" created! 🎉`,"success"),p.innerHTML="",o=await je("/bonding/channels"),n=o.find(N=>N._id===X._id)||X,He(),$e(),await Se(n._id)}catch(X){I(X.message||"Failed to create group","error"),T.disabled=!1,T.textContent="Create Group 🎉"}}}function ie(p,u){const d=document.querySelector(".bonding-emoji-popup");d&&d.remove();const w=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],m=document.createElement("div");m.className="bonding-emoji-popup",m.innerHTML=w.map(L=>`<button class="emoji-opt-btn" data-e="${L}">${L}</button>`).join("");const T=p.getBoundingClientRect();m.style.top=`${T.bottom+window.scrollY+6}px`,m.style.left=`${T.left+window.scrollX}px`,document.body.appendChild(m),m.querySelectorAll(".emoji-opt-btn").forEach(L=>{L.onclick=R=>{R.stopPropagation(),u(L.dataset.e),m.remove()}});const $=L=>{m.contains(L.target)||(m.remove(),document.removeEventListener("click",$))};setTimeout(()=>document.addEventListener("click",$),10)}function se(p){if(!p)return"";try{return new Date(p).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Ua(){const r=document.getElementById("ci360-bonding-styles");r&&r.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: center;
    }

    .yard-token-slot {
      width: 32px;
      height: 32px;
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
  `,document.head.appendChild(t)}export{Qa as a,Va as i};
