var ya=Object.defineProperty;var ka=(i,t,e)=>t in i?ya(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var _e=(i,t,e)=>ka(i,typeof t!="symbol"?t+"":t,e);import{c as Re,h as S,e as $,n as Je,j as Ye,o as Ft,k as Wt,g as $e,t as ea}from"./api-7Jxo57iM.js";const ua={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function wa(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},ua,JSON.parse(i))}catch{}return Object.assign({},ua)}function $a(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function it(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),s=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${s}`}function Ht(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const s=e.getFullYear(),d=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${s}-${d}-${o}`}function $t(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function gt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ga(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function ta(i,t=1){const e=new Date(i+"T00:00:00"),s=e.getDay(),d=(s<t?7:0)+s-t,o=new Date(e);o.setDate(e.getDate()-d);const b=[];for(let n=0;n<7;n++){const k=new Date(o);k.setDate(o.getDate()+n);const P=k.getFullYear(),_=String(k.getMonth()+1).padStart(2,"0"),j=String(k.getDate()).padStart(2,"0");b.push(`${P}-${_}-${j}`)}return b}function Sa(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,s=t.createOscillator(),d=t.createGain();s.type="sine",s.frequency.setValueAtTime(523.25,e),s.frequency.exponentialRampToValueAtTime(783.99,e+.15),d.gain.setValueAtTime(.2,e),d.gain.exponentialRampToValueAtTime(.001,e+.35),s.connect(d),d.connect(t.destination),s.start(e),s.stop(e+.35)}catch{}}function Xa(i,t={}){const{userRole:e="employee",currentUser:s=null,onNavigate:d=null}=t,o=e==="superadmin"||e==="admin";let b=wa(),n={selectedDate:it(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ca(),k();async function k(){n.loading=!0,P();try{const c=[Re("/tasks")];o&&c.push(Re("/personnel").catch(()=>[]));const[C,D]=await Promise.all(c);n.tasks=Array.isArray(C)?C:[],D&&(n.personnelList=Array.isArray(D)?D:[])}catch(c){S("Failed to load planner tasks: "+c.message,!0)}finally{n.loading=!1,Y()}}function P(){i.innerHTML=`
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
    `}function _(c){return n.tasks.filter(C=>{var r;if(C.isDeleted===!0)return!1;if(o&&n.selectedPersonnelId!=="all"){const l=((r=C.personnelId)==null?void 0:r._id)||C.personnelId;if(String(l)!==String(n.selectedPersonnelId))return!1}const D=C.dateStr||(C.dueDate?new Date(C.dueDate).toISOString().slice(0,10):"");return D?D===c:c===it()})}function j(c,C){if(c.status==="Completed")return!1;const D=c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):"");return D?D<C:!1}function E(c,C){const D=c.length,r=c.filter(O=>O.status==="Completed").length,l=c.filter(O=>O.status==="In Progress").length,y=c.filter(O=>O.status==="Pending"||O.status==="Todo").length,q=c.filter(O=>j(O,C)).length,K=D>0?Math.round(r/D*100):0;return{total:D,completed:r,inProgress:l,pending:y,overdue:q,percent:K}}function Y(){const c=it(),C=n.selectedDate===c,D=_(n.selectedDate),r=E(D,c);i.innerHTML=`
      <div class="ci360-planner-wrap ${b.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${gt(n.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${$(b.displayName||"Daily Planner")}</h1>
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

            <button type="button" class="ci360-today-btn ${C?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${o?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${n.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${n.personnelList.map(l=>`
                  <option value="${l._id}" ${n.selectedPersonnelId===String(l._id)?"selected":""}>
                    ${$(l.name)} (${$(l.department||l.role||"Team")})
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
              <div class="ci360-circular-progress" style="--val: ${r.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${r.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${r.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <span class="kpi-num">${r.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${r.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${r.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${r.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${r.overdue>0?`
                <div class="kpi-box overdue">
                  <span class="kpi-num">${r.overdue}</span>
                  <span class="kpi-label">Overdue</span>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${r.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${Q(D,r)}
        </main>

      </div>
    `,Te(),st()}function Q(c,C){return n.viewMode==="weekly"?ot():n.viewMode==="report"?nt():ke(c,C)}function ke(c,C){const D=it();let r=c;if(n.filterStatus==="pending"?r=r.filter(l=>l.status==="Pending"||l.status==="Todo"):n.filterStatus==="in_progress"?r=r.filter(l=>l.status==="In Progress"):n.filterStatus==="completed"?r=r.filter(l=>l.status==="Completed"):n.filterStatus==="overdue"&&(r=r.filter(l=>j(l,D))),n.searchQuery){const l=n.searchQuery.toLowerCase();r=r.filter(y=>(y.title||"").toLowerCase().includes(l)||(y.description||"").toLowerCase().includes(l)||(y.category||"").toLowerCase().includes(l))}return r.sort((l,y)=>{if(l.status==="Completed"&&y.status!=="Completed")return 1;if(l.status!=="Completed"&&y.status==="Completed")return-1;const q={Urgent:0,High:1,Medium:2,Low:3};return(q[l.priority]||2)-(q[y.priority]||2)}),`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              Today's Focus
            </h2>
            <span class="ci360-task-count-badge">${r.length} ${r.length===1?"task":"tasks"}</span>
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${n.filterStatus==="all"?"active":""}" data-f="all">All (${C.total})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${C.pending})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${C.inProgress})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${C.completed})</button>
              ${C.overdue>0?`
                <button type="button" class="filter-pill overdue ${n.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${C.overdue})</button>
              `:""}
            </div>

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${$(n.searchQuery)}">
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
          ${r.length===0?ve():`
            <div class="ci360-task-list">
              ${r.map(l=>Ie(l,D)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function ve(){return`
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
    `}function Ie(c,C){var q,K,O,T;const D=c.status==="Completed",r=j(c,C),l=`pri-${(c.priority||"medium").toLowerCase()}`,y=`status-${(c.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${D?"is-completed":""} ${r?"is-overdue":""}" data-id="${c._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${D?"checked":""}" data-action="toggle" data-id="${c._id}" title="${D?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${$(c.title)}</span>
          </div>

          ${c.description?`
            <div class="ci360-task-desc">${$(c.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${l}">
              <span class="badge-dot"></span>
              ${$(c.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${y}">
              ${$(c.status||"Pending")}
            </span>

            <!-- Category -->
            ${c.category?`
              <span class="ci360-badge category-badge">
                #${$(c.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${c.startTime||c.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${c.startTime?$(c.startTime):""}
                   ${c.startTime&&c.dueTime?"–":""}
                   ${c.dueTime?$(c.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${r?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${o&&((q=c.personnelId)!=null&&q.name||(K=c.userId)!=null&&K.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${$(((O=c.personnelId)==null?void 0:O.name)||((T=c.userId)==null?void 0:T.name))}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${c._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${c._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function ot(){const c=ta(n.selectedDate,b.weekStartsOn),C=gt(c[0]),D=gt(c[6]),r=it();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${C} – ${D}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${c.map(l=>{const y=l===r,q=l===n.selectedDate,K=_(l),O=E(K,r);return`
              <div class="ci360-day-column ${y?"is-today":""} ${q?"is-selected":""}" data-date="${l}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${l}">
                  <div class="day-name">${ga(l)}</div>
                  <div class="day-number">${new Date(l+"T00:00:00").getDate()}</div>
                  ${y?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${O.completed}/${O.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${O.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${K.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:K.map(T=>`
                    <div class="ci360-mini-task-card ${T.status==="Completed"?"done":""}" data-id="${T._id}">
                      <button type="button" class="mini-check ${T.status==="Completed"?"checked":""}" data-action="toggle" data-id="${T._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${T._id}">
                        <div class="mini-title">${$(T.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(T.priority||"medium").toLowerCase()}">${T.priority||"Med"}</span>
                          ${T.dueTime?`<span class="mini-time">${$(T.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button -->
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${l}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function nt(){const c=ta(n.selectedDate,b.weekStartsOn),C=$t(c[0]),D=$t(c[6]),r=it(),l=n.tasks.filter(B=>{if(B.isDeleted===!0)return!1;const z=B.dateStr||(B.dueDate?new Date(B.dueDate).toISOString().slice(0,10):"");return c.includes(z)}),y=l.length,q=l.filter(B=>B.status==="Completed").length,K=l.filter(B=>B.status==="In Progress").length,O=y>0?Math.round(q/y*100):0,T={Urgent:0,High:0,Medium:0,Low:0};return l.forEach(B=>{const z=B.priority||"Medium";T[z]!==void 0&&T[z]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${C} – ${D}</div>
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
            <span class="value" style="font-size:28px">${y}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${q}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${K}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${O}%</span>
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
                ${c.map(B=>{const z=_(B),h=E(z,r);return`
                    <tr>
                      <td><strong>${ga(B)}</strong></td>
                      <td>${gt(B)}</td>
                      <td>${h.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${h.completed}</td>
                      <td>${h.pending+h.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${h.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${h.percent}%</span>
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
              <div style="font-size:22px;font-weight:700">${T.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${T.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${T.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${T.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function Te(){const c=document.getElementById("btnViewDaily"),C=document.getElementById("btnViewWeekly"),D=document.getElementById("btnViewReport");c&&(c.onclick=()=>{n.viewMode="daily",Y()}),C&&(C.onclick=()=>{n.viewMode="weekly",Y()}),D&&(D.onclick=()=>{n.viewMode="report",Y()});const r=document.getElementById("btnPrevDay"),l=document.getElementById("btnNextDay"),y=document.getElementById("btnJumpToday"),q=document.getElementById("hiddenDateInput"),K=document.getElementById("datePickerBadge");r&&(r.onclick=()=>{n.selectedDate=Ht(n.selectedDate,-1),Y()}),l&&(l.onclick=()=>{n.selectedDate=Ht(n.selectedDate,1),Y()}),y&&(y.onclick=()=>{n.selectedDate=it(),Y()}),K&&q&&(K.onclick=()=>{try{typeof q.showPicker=="function"?q.showPicker():q.focus()}catch{q.focus()}},q.onchange=pe=>{pe.target.value&&(n.selectedDate=pe.target.value,Y())});const O=document.getElementById("admTeamSelect");O&&(O.onchange=pe=>{n.selectedPersonnelId=pe.target.value,Y()});const T=document.getElementById("btnOpenAddTaskModal");T&&(T.onclick=()=>De());const B=document.getElementById("btnPlannerActionsMenu"),z=document.getElementById("plannerActionsDropdown");B&&z&&(B.onclick=pe=>{pe.stopPropagation(),z.classList.toggle("hidden")},document.addEventListener("click",pe=>{!z.contains(pe.target)&&pe.target!==B&&z.classList.add("hidden")}));const h=document.getElementById("btnActionImport");h&&(h.onclick=()=>{z==null||z.classList.add("hidden"),Xe()});const le=document.getElementById("btnActionExportPng");le&&(le.onclick=()=>{z==null||z.classList.add("hidden"),Ze()});const de=document.getElementById("btnActionExportPdf");de&&(de.onclick=()=>{z==null||z.classList.add("hidden"),be()});const fe=document.getElementById("btnActionBackup");fe&&(fe.onclick=()=>{z==null||z.classList.add("hidden"),et()});const ce=document.getElementById("btnActionSettings");ce&&(ce.onclick=()=>{z==null||z.classList.add("hidden"),ye()})}function st(c){if(n.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(T=>{T.onclick=()=>{n.filterStatus=T.dataset.f,Y()}});const C=document.getElementById("plannerTaskSearchInp");C&&(C.oninput=T=>{n.searchQuery=T.target.value,Y()});const D=document.getElementById("btnClearSearch");D&&(D.onclick=()=>{n.searchQuery="",Y()});const r=document.getElementById("quickAddTitleInp"),l=document.getElementById("quickAddPriority"),y=document.getElementById("quickAddCategory"),q=document.getElementById("btnQuickAddSubmit"),K=async()=>{const T=((r==null?void 0:r.value)||"").trim();if(!T){S("Please enter a task title",!0),r==null||r.focus();return}try{const B={title:T,dateStr:n.selectedDate,priority:(l==null?void 0:l.value)||b.defaultPriority,category:(y==null?void 0:y.value)||"General",status:"Pending"};o&&n.selectedPersonnelId!=="all"&&(B.personnelId=n.selectedPersonnelId);const z=await $e("/tasks",B);n.tasks.unshift(z),S("Task added to today's focus! ✨"),r&&(r.value="",r.focus()),Y()}catch(B){S(B.message,!0)}};q&&(q.onclick=K),r&&(r.onkeydown=T=>{T.key==="Enter"&&K()});const O=document.getElementById("btnEmptyStateImport");O&&(O.onclick=()=>Xe())}if(n.viewMode==="weekly"){const C=document.getElementById("btnPrevWeek"),D=document.getElementById("btnNextWeek"),r=document.getElementById("btnThisWeek");C&&(C.onclick=()=>{n.selectedDate=Ht(n.selectedDate,-7),Y()}),D&&(D.onclick=()=>{n.selectedDate=Ht(n.selectedDate,7),Y()}),r&&(r.onclick=()=>{n.selectedDate=it(),Y()}),document.querySelectorAll(".day-col-header").forEach(l=>{l.onclick=()=>{n.selectedDate=l.dataset.date,n.viewMode="daily",Y()}}),document.querySelectorAll('[data-action="add-day"]').forEach(l=>{l.onclick=()=>{De(null,l.dataset.date)}})}if(n.viewMode==="report"){const C=document.getElementById("btnDownloadWeeklyPdf");C&&(C.onclick=be)}i.querySelectorAll('[data-action="toggle"]').forEach(C=>{C.onclick=async D=>{D.stopPropagation();const r=C.dataset.id;await Fe(r)}}),i.querySelectorAll('[data-action="edit"]').forEach(C=>{C.onclick=D=>{D.stopPropagation();const r=C.dataset.id,l=n.tasks.find(y=>y._id===r);l&&De(l)}}),i.querySelectorAll('[data-action="delete"]').forEach(C=>{C.onclick=async D=>{D.stopPropagation();const r=C.dataset.id;await ht(r)}})}async function Fe(c){const C=n.tasks.find(r=>r._id===c);if(!C)return;const D=C.status!=="Completed";try{const r=await Je(`/tasks/${c}/toggle`,{}),l=n.tasks.findIndex(y=>y._id===c);l!==-1&&(n.tasks[l]=r),D?(b.soundEnabled&&Sa(),S("Task marked as completed! 🎉")):S("Task reopened as pending."),Y()}catch(r){S(r.message,!0)}}async function ht(c){const C=n.tasks.find(D=>D._id===c);if(C&&confirm(`Are you sure you want to remove "${C.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Ye(`/tasks/${c}`),n.tasks=n.tasks.filter(D=>D._id!==c),S("Task removed from planner (safely stored in database archive)"),Y()}catch(D){S(D.message,!0)}}function De(c=null,C=null){const D=!!c,r=c?c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):n.selectedDate):C||n.selectedDate,l=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${D?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${$((c==null?void 0:c.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${$((c==null?void 0:c.description)||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${r}" required>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${(c==null?void 0:c.startTime)||""}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${(c==null?void 0:c.dueTime)||""}">
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${(c==null?void 0:c.priority)==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!c&&b.defaultPriority==="Medium"||(c==null?void 0:c.priority)==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!c&&b.defaultPriority==="High"||(c==null?void 0:c.priority)==="High"?"selected":""}>High</option>
                <option value="Urgent" ${(c==null?void 0:c.priority)==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${(c==null?void 0:c.status)==="Pending"||(c==null?void 0:c.status)==="Todo"||!c?"selected":""}>Pending</option>
                <option value="In Progress" ${(c==null?void 0:c.status)==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${(c==null?void 0:c.status)==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${$((c==null?void 0:c.category)||"General")}">
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
          ${o?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!c||c!=null&&c.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${n.personnelList.map(B=>{var h;const z=((h=c==null?void 0:c.personnelId)==null?void 0:h._id)===B._id||(c==null?void 0:c.personnelId)===B._id;return`<option value="${B._id}" ${z?"selected":""}>${$(B.name)} (${$(B.department||B.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
            <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
              ${D?"Save Changes":"Create Task"}
            </button>
          </div>
        </form>
      </div>
    `,y=Ft(l),q=y.querySelector("#taskForm"),K=y.querySelector("#btnModalClose"),O=y.querySelector("#btnCancelModal"),T=()=>y.remove();K&&(K.onclick=T),O&&(O.onclick=T),q.onsubmit=async B=>{var w;B.preventDefault();const z=y.querySelector("#taskTitle").value.trim(),h=y.querySelector("#taskDesc").value.trim(),le=y.querySelector("#taskDate").value,de=y.querySelector("#taskStartTime").value.trim(),fe=y.querySelector("#taskDueTime").value.trim(),ce=y.querySelector("#taskPriority").value,pe=y.querySelector("#taskStatus").value,u=y.querySelector("#taskCategory").value.trim()||"General";if(!z){S("Task title is required",!0);return}const g={title:z,description:h,dateStr:le,startTime:de,dueTime:fe,priority:ce,status:pe,category:u};if(o){const x=(w=y.querySelector("#taskAssignee"))==null?void 0:w.value;x==="all"?(g.assignAll=!0,g.personnelId="all"):x&&(g.personnelId=x)}const a=y.querySelector("#btnSaveTask");a.disabled=!0,a.textContent="Saving...";try{if(D){const x=await Wt(`/tasks/${c._id}`,g),L=n.tasks.findIndex(A=>A._id===c._id);L!==-1&&(n.tasks[L]=x),S("Task updated successfully! ✍️")}else{const x=await $e("/tasks",g);Array.isArray(x.tasks)?x.tasks.forEach(L=>n.tasks.unshift(L)):n.tasks.unshift(x),S("Task created successfully! ✨")}T(),Y()}catch(x){S(x.message,!0),a.disabled=!1,a.textContent=D?"Save Changes":"Create Task"}}}function Xe(){let c=[];const C=`
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
    `,D=Ft(C),r=()=>D.remove();D.querySelector("#btnImportClose").onclick=r,D.querySelector("#btnCancelImport").onclick=r;const l=D.querySelector("#importTextarea"),y=D.querySelector("#importFileInput"),q=D.querySelector("#importDropzone"),K=D.querySelector("#previewListArea"),O=D.querySelector("#previewCountLabel"),T=D.querySelector("#btnConfirmImport"),B=D.querySelector("#importFileInfo");function z(le){if(!le)return[];const de=le.split(/\r?\n/),fe=[];for(let ce of de)ce=ce.trim(),ce&&(ce=ce.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),ce=ce.replace(/^[-*•]\s+/,""),ce=ce.replace(/^\d+[\.\)]\s+/,""),ce=ce.trim(),ce&&fe.push(ce));return fe}function h(){const le=l.value,de=z(le),fe=D.querySelector("#importTargetDate").value,ce=_(fe),pe=new Set(ce.map(u=>(u.title||"").trim().toLowerCase()));c=[];for(const u of de){const g=pe.has(u.toLowerCase());c.push({title:u,isDuplicate:g})}if(O.textContent=`Preview (${c.length} ${c.length===1?"task":"tasks"} found)`,T.disabled=c.length===0,T.textContent=`Import ${c.length} ${c.length===1?"Task":"Tasks"}`,c.length===0){K.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}K.innerHTML=c.map((u,g)=>`
        <div class="preview-item ${u.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${g+1}.</span>
          <span class="preview-title">${$(u.title)}</span>
          ${u.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}l.oninput=h,q.onclick=()=>y.click(),y.onchange=le=>{const de=le.target.files[0];if(!de)return;B.textContent=`File selected: ${de.name} (${Math.round(de.size/1024)} KB)`;const fe=new FileReader;fe.onload=ce=>{l.value=ce.target.result,h()},fe.readAsText(de)},q.ondragover=le=>{le.preventDefault(),q.classList.add("dragover")},q.ondragleave=()=>q.classList.remove("dragover"),q.ondrop=le=>{le.preventDefault(),q.classList.remove("dragover");const de=le.dataTransfer.files[0];if(de&&(de.type==="text/plain"||de.name.endsWith(".txt"))){B.textContent=`File dropped: ${de.name}`;const fe=new FileReader;fe.onload=ce=>{l.value=ce.target.result,h()},fe.readAsText(de)}else S("Please drop a valid .txt plain-text file",!0)},T.onclick=async()=>{if(c.length===0)return;T.disabled=!0,T.textContent="Importing...";const le=D.querySelector("#importTargetDate").value,de=D.querySelector("#importPriority").value,fe=D.querySelector("#importCategory").value.trim()||"General",ce={date:le,tasks:c.map(pe=>({title:pe.title,priority:de,category:fe,status:"Pending"}))};o&&n.selectedPersonnelId!=="all"&&(ce.personnelId=n.selectedPersonnelId);try{const pe=await $e("/tasks/bulk-import",ce);Array.isArray(pe.tasks)&&pe.tasks.forEach(u=>n.tasks.unshift(u)),S(`Imported ${pe.importedCount} tasks successfully! (${pe.skippedCount} skipped duplicates)`),r(),n.selectedDate=le,Y()}catch(pe){S(pe.message,!0),T.disabled=!1,T.textContent="Retry Import"}}}async function Ze(){const c=_(n.selectedDate),C=E(c,it()),D=$t(n.selectedDate),r=2,l=800,y=160,q=90,K=65,O=70,T=Math.max(120,c.length*K),B=y+q+T+O,z=document.createElement("canvas");z.width=l*r,z.height=B*r;const h=z.getContext("2d");h.scale(r,r);const le=document.documentElement.getAttribute("data-theme")==="dark",de=le?"#0F172A":"#F8FAFC",fe=le?"#1E293B":"#FFFFFF",ce=le?"#334155":"#E2E8F0",pe=le?"#F8FAFC":"#0F172A",u=le?"#94A3B8":"#475569",g="#4F46E5",a="#10B981",w="#F59E0B";h.fillStyle=de,h.fillRect(0,0,l,B),h.fillStyle=fe,Ne(h,24,20,l-48,y-30,16),h.fill(),h.strokeStyle=ce,h.lineWidth=1,h.stroke(),h.fillStyle=g,h.font="bold 12px Inter, sans-serif",h.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),h.fillStyle=pe,h.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',h.fillText(D,44,86),h.fillStyle=u,h.font="13px Inter, sans-serif",h.fillText(`Planned focus list · ${C.completed} of ${C.total} tasks completed (${C.percent}%)`,44,114);const x=y+6;h.fillStyle=fe,Ne(h,24,x,l-48,q-16,12),h.fill(),h.stroke();const L=[{label:"TOTAL TASKS",val:String(C.total),color:pe},{label:"COMPLETED",val:String(C.completed),color:a},{label:"IN PROGRESS",val:String(C.inProgress),color:w},{label:"PENDING",val:String(C.pending),color:u},{label:"PROGRESS",val:`${C.percent}%`,color:g}],A=(l-48)/L.length;L.forEach((G,M)=>{const ue=24+M*A+20;h.fillStyle=G.color,h.font="bold 20px Inter, sans-serif",h.fillText(G.val,ue,x+36),h.fillStyle=u,h.font="10px Inter, sans-serif",h.fillText(G.label,ue,x+54)});const W=x+q;h.fillStyle=fe,Ne(h,24,W,l-48,T+10,16),h.fill(),h.stroke(),c.length===0?(h.fillStyle=u,h.font="14px Inter, sans-serif",h.textAlign="center",h.fillText("No scheduled tasks recorded for this date.",l/2,W+60),h.textAlign="left"):c.forEach((G,M)=>{const ue=W+16+M*K,X=G.status==="Completed";h.beginPath(),h.arc(48,ue+14,10,0,Math.PI*2),X?(h.fillStyle=a,h.fill(),h.strokeStyle="#FFFFFF",h.lineWidth=2,h.beginPath(),h.moveTo(44,ue+14),h.lineTo(47,ue+17),h.lineTo(52,ue+11),h.stroke()):(h.strokeStyle=ce,h.lineWidth=2,h.stroke()),h.fillStyle=X?u:pe,h.font=`${X?"normal":"500"} 14px Inter, sans-serif`;const ge=G.title.length>55?G.title.slice(0,52)+"...":G.title;if(h.fillText(ge,70,ue+18),X){const R=h.measureText(ge);h.strokeStyle=u,h.lineWidth=1.2,h.beginPath(),h.moveTo(70,ue+14),h.lineTo(70+R.width,ue+14),h.stroke()}const J=G.priority||"Medium";let F="#E2E8F0",V="#334155";J==="Urgent"?(F="#FEE2E2",V="#DC2626"):J==="High"?(F="#FEF3C7",V="#D97706"):J==="Low"&&(F="#ECFDF5",V="#059669"),h.fillStyle=F,Ne(h,l-150,ue+4,60,20,10),h.fill(),h.fillStyle=V,h.font="bold 10px Inter, sans-serif",h.fillText(J,l-138,ue+18);const te=G.dueTime?`🕒 ${G.dueTime}`:G.category||"General";h.fillStyle=u,h.font="11px Inter, sans-serif",h.fillText(te,70,ue+34),M<c.length-1&&(h.strokeStyle=ce,h.lineWidth=.6,h.beginPath(),h.moveTo(40,ue+48),h.lineTo(l-40,ue+48),h.stroke())});const U=B-35;h.fillStyle=u,h.font="11px Inter, sans-serif",h.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,U);try{const G=z.toDataURL("image/png"),M=document.createElement("a");M.href=G,M.download=`ci360-daily-planner-${n.selectedDate}.png`,document.body.appendChild(M),M.click(),M.remove(),S("Daily Planner image exported! 🖼️")}catch(G){S("Failed to export image: "+G.message,!0)}}function Ne(c,C,D,r,l,y){c.beginPath(),c.moveTo(C+y,D),c.lineTo(C+r-y,D),c.quadraticCurveTo(C+r,D,C+r,D+y),c.lineTo(C+r,D+l-y),c.quadraticCurveTo(C+r,D+l,C+r-y,D+l),c.lineTo(C+y,D+l),c.quadraticCurveTo(C,D+l,C,D+l-y),c.lineTo(C,D+y),c.quadraticCurveTo(C,D,C+y,D),c.closePath()}function be(){const c=ta(n.selectedDate,b.weekStartsOn),C=$t(c[0]),D=$t(c[6]);it();const r=n.tasks.filter(T=>{if(T.isDeleted===!0)return!1;const B=T.dateStr||(T.dueDate?new Date(T.dueDate).toISOString().slice(0,10):"");return c.includes(B)}),l=r.length,y=r.filter(T=>T.status==="Completed").length,q=l>0?Math.round(y/l*100):0,K=window.open("","_blank");if(!K){S("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const O=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${C}</title>
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
            <div class="period">${C} – ${D}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${l}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${y}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${l-y}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${q}%</div>
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
            ${c.map(T=>{const B=_(T);return B.length===0?`<tr><td><strong>${gt(T)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:B.map(z=>`
                <tr>
                  <td><strong>${gt(T)}</strong></td>
                  <td>${$(z.title)}</td>
                  <td><span class="badge badge-${(z.priority||"medium").toLowerCase().slice(0,3)}">${z.priority||"Medium"}</span></td>
                  <td>${$(z.category||"General")}</td>
                  <td>${z.dueTime||z.startTime||"—"}</td>
                  <td class="${z.status==="Completed"?"done":""}">${z.status||"Pending"}</td>
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
    `;K.document.write(O),K.document.close(),S("Weekly PDF report generated for printing! 📄")}function et(){const C=Ft(`
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
    `),D=()=>C.remove();C.querySelector("#btnBackupClose").onclick=D;const r=C.querySelector("#btnDownloadBackupJson");r.onclick=async()=>{r.disabled=!0,r.textContent="Generating backup...";try{const T=await Re("/tasks/backup"),B=new Blob([JSON.stringify(T,null,2)],{type:"application/json"}),z=URL.createObjectURL(B),h=document.createElement("a");h.href=z,h.download=`ci360-planner-backup-${it()}.json`,document.body.appendChild(h),h.click(),h.remove(),S("Planner backup downloaded successfully! 💾")}catch(T){S("Backup export failed: "+T.message,!0)}finally{r.disabled=!1,r.textContent="Download JSON Backup"}};const l=C.querySelector("#restoreFileInput"),y=C.querySelector("#restorePreviewArea"),q=C.querySelector("#restoreCountText"),K=C.querySelector("#btnExecuteRestore");let O=null;l.onchange=T=>{const B=T.target.files[0];if(!B)return;const z=new FileReader;z.onload=h=>{try{const le=JSON.parse(h.target.result),de=Array.isArray(le.tasks)?le.tasks:Array.isArray(le)?le:null;if(!de||de.length===0){S("Invalid backup file: No tasks found",!0);return}O=de,y.style.display="block",q.textContent=`Valid backup: ${de.length} tasks ready to restore.`,K.disabled=!1}catch(le){S("Error parsing JSON backup file: "+le.message,!0),y.style.display="none",K.disabled=!0}},z.readAsText(B)},K.onclick=async()=>{var B;if(!O||O.length===0)return;K.disabled=!0,K.textContent="Restoring...";const T=((B=C.querySelector('input[name="restoreMode"]:checked'))==null?void 0:B.value)||"merge";try{const z=await $e("/tasks/restore",{tasks:O,mode:T});S(`Restored ${z.restoredCount} tasks! (${z.skippedCount} skipped) ✨`),D(),await k()}catch(z){S("Restore failed: "+z.message,!0),K.disabled=!1,K.textContent="Retry Restore"}}}function ye(){const c=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${$(b.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${b.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${b.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${$(b.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${b.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${b.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${b.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${b.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${b.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${b.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${b.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,C=Ft(c),D=()=>C.remove();C.querySelector("#btnSettingsClose").onclick=D,C.querySelector("#btnCancelSettings").onclick=D,C.querySelector("#settingsForm").onsubmit=r=>{r.preventDefault(),b.displayName=C.querySelector("#setDisplayName").value.trim()||"Daily Planner",b.weekStartsOn=Number(C.querySelector("#setWeekStart").value),b.defaultPriority=C.querySelector("#setDefaultPriority").value,b.density=C.querySelector("#setDensity").value,b.soundEnabled=C.querySelector("#setSound").checked,$a(b),S("Planner preferences saved! ⚙️"),D(),Y()}}}function Ca(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
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
  `,document.head.appendChild(i)}function _a(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function Ta(i,t,e,s,d){const o={move:i,variations:d};return t&&(o.suffix=t),e&&(o.nag=e),s!==null&&(o.comment=s),o}function Aa(...i){const[t,...e]=i;let s=t;for(const d of e)d!==null&&(s.variations=[d,...d.variations],d.variations=[],s=d);return t}function ja(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const s=e.variations[0];if(!s){e.comment=t.marker.comment;break}e=s}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Da(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function St(i,t,e,s){var d=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(d,St.prototype),d.expected=t,d.found=e,d.location=s,d.name="SyntaxError",d}Da(St,Error);function aa(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}St.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,s;for(s=0;s<i.length;s++)if(i[s].source===this.location.source){e=i[s].text.split(/\r\n|\n|\r/g);break}var d=this.location.start,o=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(d):d,b=this.location.source+":"+o.line+":"+o.column;if(e){var n=this.location.end,k=aa("",o.line.toString().length," "),P=e[d.line-1],_=d.line===n.line?n.column:P.length+1,j=_-d.column||1;t+=`
 --> `+b+`
`+k+` |
`+o.line+" | "+P+`
`+k+" | "+aa("",d.column-1," ")+aa("",j,"^")}else t+=`
 at `+b}return t};St.buildMessage=function(i,t){var e={literal:function(P){return'"'+d(P.text)+'"'},class:function(P){var _=P.parts.map(function(j){return Array.isArray(j)?o(j[0])+"-"+o(j[1]):o(j)});return"["+(P.inverted?"^":"")+_.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(P){return P.description}};function s(P){return P.charCodeAt(0).toString(16).toUpperCase()}function d(P){return P.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(_){return"\\x0"+s(_)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(_){return"\\x"+s(_)})}function o(P){return P.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(_){return"\\x0"+s(_)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(_){return"\\x"+s(_)})}function b(P){return e[P.type](P)}function n(P){var _=P.map(b),j,E;if(_.sort(),_.length>0){for(j=1,E=1;j<_.length;j++)_[j-1]!==_[j]&&(_[E]=_[j],E++);_.length=E}switch(_.length){case 1:return _[0];case 2:return _[0]+" or "+_[1];default:return _.slice(0,-1).join(", ")+", or "+_[_.length-1]}}function k(P){return P?'"'+d(P)+'"':"end of input"}return"Expected "+n(i)+" but "+k(t)+" found."};function Ea(i,t){t=t!==void 0?t:{};var e={},s=t.grammarSource,d={pgn:qt},o=qt,b="[",n='"',k="]",P=".",_="O-O-O",j="O-O",E="0-0-0",Y="0-0",Q="$",ke="{",ve="}",Ie=";",ot="(",nt=")",Te="1-0",st="0-1",Fe="1/2-1/2",ht="*",De=/^[a-zA-Z]/,Xe=/^[^"]/,Ze=/^[0-9]/,Ne=/^[.]/,be=/^[a-zA-Z1-8\-=]/,et=/^[+#]/,ye=/^[!?]/,c=/^[^}]/,C=/^[^\r\n]/,D=/^[ \t\r\n]/,r=Ue("tag pair"),l=je("[",!1),y=je('"',!1),q=je("]",!1),K=Ue("tag name"),O=We([["a","z"],["A","Z"]],!1,!1),T=Ue("tag value"),B=We(['"'],!0,!1),z=Ue("move number"),h=We([["0","9"]],!1,!1),le=je(".",!1),de=We(["."],!1,!1),fe=Ue("standard algebraic notation"),ce=je("O-O-O",!1),pe=je("O-O",!1),u=je("0-0-0",!1),g=je("0-0",!1),a=We([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),w=We(["+","#"],!1,!1),x=Ue("suffix annotation"),L=We(["!","?"],!1,!1),A=Ue("NAG"),W=je("$",!1),U=Ue("brace comment"),G=je("{",!1),M=We(["}"],!0,!1),ue=je("}",!1),X=Ue("rest of line comment"),ge=je(";",!1),J=We(["\r",`
`],!0,!1),F=Ue("variation"),V=je("(",!1),te=je(")",!1),R=Ue("game termination marker"),H=je("1-0",!1),ie=je("0-1",!1),we=je("1/2-1/2",!1),oe=je("*",!1),me=Ue("whitespace"),Se=We([" ","	","\r",`
`],!1,!1),Ae=function(p,v){return ja(p,v)},Ce=function(p){return Object.fromEntries(p)},Qe=function(p,v){return[p,v]},tt=function(p,v){return{root:p,marker:v}},Ge=function(p,v){return Aa(_a(p),...v.flat())},Be=function(p,v,f,ae,ne){return Ta(p,v,f,ae,ne)},lt=function(p){return p},Dt=function(p){return p.replace(/[\r\n]+/g," ")},Et=function(p){return p.trim()},It=function(p){return p},Pt=function(p,v){return{result:p,comment:v}},m=t.peg$currPos|0,dt=[{line:1,column:1}],He=m,ct=t.peg$maxFailExpected||[],N=t.peg$silentFails|0,pt;if(t.startRule){if(!(t.startRule in d))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');o=d[t.startRule]}function je(p,v){return{type:"literal",text:p,ignoreCase:v}}function We(p,v,f){return{type:"class",parts:p,inverted:v,ignoreCase:f}}function Mt(){return{type:"end"}}function Ue(p){return{type:"other",description:p}}function Ct(p){var v=dt[p],f;if(v)return v;if(p>=dt.length)f=dt.length-1;else for(f=p;!dt[--f];);for(v=dt[f],v={line:v.line,column:v.column};f<p;)i.charCodeAt(f)===10?(v.line++,v.column=1):v.column++,f++;return dt[p]=v,v}function Lt(p,v,f){var ae=Ct(p),ne=Ct(v),xe={source:s,start:{offset:p,line:ae.line,column:ae.column},end:{offset:v,line:ne.line,column:ne.column}};return xe}function Z(p){m<He||(m>He&&(He=m,ct=[]),ct.push(p))}function wt(p,v,f){return new St(St.buildMessage(p,v),p,v,f)}function qt(){var p,v,f;return p=m,v=Qt(),f=I(),p=Ae(v,f),p}function Qt(){var p,v,f;for(p=m,v=[],f=zt();f!==e;)v.push(f),f=zt();return f=qe(),p=Ce(v),p}function zt(){var p,v,f,ae,ne,xe,vt;return N++,p=m,qe(),i.charCodeAt(m)===91?(v=b,m++):(v=e,N===0&&Z(l)),v!==e?(qe(),f=Jt(),f!==e?(qe(),i.charCodeAt(m)===34?(ae=n,m++):(ae=e,N===0&&Z(y)),ae!==e?(ne=Rt(),i.charCodeAt(m)===34?(xe=n,m++):(xe=e,N===0&&Z(y)),xe!==e?(qe(),i.charCodeAt(m)===93?(vt=k,m++):(vt=e,N===0&&Z(q)),vt!==e?p=Qe(f,ne):(m=p,p=e)):(m=p,p=e)):(m=p,p=e)):(m=p,p=e)):(m=p,p=e),N--,p===e&&N===0&&Z(r),p}function Jt(){var p,v,f;if(N++,p=m,v=[],f=i.charAt(m),De.test(f)?m++:(f=e,N===0&&Z(O)),f!==e)for(;f!==e;)v.push(f),f=i.charAt(m),De.test(f)?m++:(f=e,N===0&&Z(O));else v=e;return v!==e?p=i.substring(p,m):p=v,N--,p===e&&(v=e,N===0&&Z(K)),p}function Rt(){var p,v,f;for(N++,p=m,v=[],f=i.charAt(m),Xe.test(f)?m++:(f=e,N===0&&Z(B));f!==e;)v.push(f),f=i.charAt(m),Xe.test(f)?m++:(f=e,N===0&&Z(B));return p=i.substring(p,m),N--,v=e,N===0&&Z(T),p}function I(){var p,v,f;return p=m,v=ee(),qe(),f=Zt(),f===e&&(f=null),qe(),p=tt(v,f),p}function ee(){var p,v,f,ae;for(p=m,v=ut(),v===e&&(v=null),f=[],ae=he();ae!==e;)f.push(ae),ae=he();return p=Ge(v,f),p}function he(){var p,v,f,ae,ne,xe,vt,Ot;if(p=m,qe(),Le(),qe(),v=Ke(),v!==e){for(f=rt(),f===e&&(f=null),ae=[],ne=at();ne!==e;)ae.push(ne),ne=at();for(ne=qe(),xe=ut(),xe===e&&(xe=null),vt=[],Ot=Bt();Ot!==e;)vt.push(Ot),Ot=Bt();p=Be(v,f,ae,xe,vt)}else m=p,p=e;return p}function Le(){var p,v,f,ae,ne,xe;for(N++,p=m,v=[],f=i.charAt(m),Ze.test(f)?m++:(f=e,N===0&&Z(h));f!==e;)v.push(f),f=i.charAt(m),Ze.test(f)?m++:(f=e,N===0&&Z(h));if(i.charCodeAt(m)===46?(f=P,m++):(f=e,N===0&&Z(le)),f!==e){for(ae=qe(),ne=[],xe=i.charAt(m),Ne.test(xe)?m++:(xe=e,N===0&&Z(de));xe!==e;)ne.push(xe),xe=i.charAt(m),Ne.test(xe)?m++:(xe=e,N===0&&Z(de));v=[v,f,ae,ne],p=v}else m=p,p=e;return N--,p===e&&(v=e,N===0&&Z(z)),p}function Ke(){var p,v,f,ae,ne,xe;if(N++,p=m,v=m,i.substr(m,5)===_?(f=_,m+=5):(f=e,N===0&&Z(ce)),f===e&&(i.substr(m,3)===j?(f=j,m+=3):(f=e,N===0&&Z(pe)),f===e&&(i.substr(m,5)===E?(f=E,m+=5):(f=e,N===0&&Z(u)),f===e&&(i.substr(m,3)===Y?(f=Y,m+=3):(f=e,N===0&&Z(g)),f===e))))if(f=m,ae=i.charAt(m),De.test(ae)?m++:(ae=e,N===0&&Z(O)),ae!==e){if(ne=[],xe=i.charAt(m),be.test(xe)?m++:(xe=e,N===0&&Z(a)),xe!==e)for(;xe!==e;)ne.push(xe),xe=i.charAt(m),be.test(xe)?m++:(xe=e,N===0&&Z(a));else ne=e;ne!==e?(ae=[ae,ne],f=ae):(m=f,f=e)}else m=f,f=e;return f!==e?(ae=i.charAt(m),et.test(ae)?m++:(ae=e,N===0&&Z(w)),ae===e&&(ae=null),f=[f,ae],v=f):(m=v,v=e),v!==e?p=i.substring(p,m):p=v,N--,p===e&&(v=e,N===0&&Z(fe)),p}function rt(){var p,v,f;for(N++,p=m,v=[],f=i.charAt(m),ye.test(f)?m++:(f=e,N===0&&Z(L));f!==e;)v.push(f),v.length>=2?f=e:(f=i.charAt(m),ye.test(f)?m++:(f=e,N===0&&Z(L)));return v.length<1?(m=p,p=e):p=v,N--,p===e&&(v=e,N===0&&Z(x)),p}function at(){var p,v,f,ae,ne;if(N++,p=m,qe(),i.charCodeAt(m)===36?(v=Q,m++):(v=e,N===0&&Z(W)),v!==e){if(f=m,ae=[],ne=i.charAt(m),Ze.test(ne)?m++:(ne=e,N===0&&Z(h)),ne!==e)for(;ne!==e;)ae.push(ne),ne=i.charAt(m),Ze.test(ne)?m++:(ne=e,N===0&&Z(h));else ae=e;ae!==e?f=i.substring(f,m):f=ae,f!==e?p=lt(f):(m=p,p=e)}else m=p,p=e;return N--,p===e&&N===0&&Z(A),p}function ut(){var p;return p=Nt(),p===e&&(p=Xt()),p}function Nt(){var p,v,f,ae,ne;if(N++,p=m,i.charCodeAt(m)===123?(v=ke,m++):(v=e,N===0&&Z(G)),v!==e){for(f=m,ae=[],ne=i.charAt(m),c.test(ne)?m++:(ne=e,N===0&&Z(M));ne!==e;)ae.push(ne),ne=i.charAt(m),c.test(ne)?m++:(ne=e,N===0&&Z(M));f=i.substring(f,m),i.charCodeAt(m)===125?(ae=ve,m++):(ae=e,N===0&&Z(ue)),ae!==e?p=Dt(f):(m=p,p=e)}else m=p,p=e;return N--,p===e&&(v=e,N===0&&Z(U)),p}function Xt(){var p,v,f,ae,ne;if(N++,p=m,i.charCodeAt(m)===59?(v=Ie,m++):(v=e,N===0&&Z(ge)),v!==e){for(f=m,ae=[],ne=i.charAt(m),C.test(ne)?m++:(ne=e,N===0&&Z(J));ne!==e;)ae.push(ne),ne=i.charAt(m),C.test(ne)?m++:(ne=e,N===0&&Z(J));f=i.substring(f,m),p=Et(f)}else m=p,p=e;return N--,p===e&&(v=e,N===0&&Z(X)),p}function Bt(){var p,v,f,ae;return N++,p=m,qe(),i.charCodeAt(m)===40?(v=ot,m++):(v=e,N===0&&Z(V)),v!==e?(f=ee(),f!==e?(qe(),i.charCodeAt(m)===41?(ae=nt,m++):(ae=e,N===0&&Z(te)),ae!==e?p=It(f):(m=p,p=e)):(m=p,p=e)):(m=p,p=e),N--,p===e&&N===0&&Z(F),p}function Zt(){var p,v,f;return N++,p=m,i.substr(m,3)===Te?(v=Te,m+=3):(v=e,N===0&&Z(H)),v===e&&(i.substr(m,3)===st?(v=st,m+=3):(v=e,N===0&&Z(ie)),v===e&&(i.substr(m,7)===Fe?(v=Fe,m+=7):(v=e,N===0&&Z(we)),v===e&&(i.charCodeAt(m)===42?(v=ht,m++):(v=e,N===0&&Z(oe))))),v!==e?(qe(),f=ut(),f===e&&(f=null),p=Pt(v,f)):(m=p,p=e),N--,p===e&&(v=e,N===0&&Z(R)),p}function qe(){var p,v;for(N++,p=[],v=i.charAt(m),D.test(v)?m++:(v=e,N===0&&Z(Se));v!==e;)p.push(v),v=i.charAt(m),D.test(v)?m++:(v=e,N===0&&Z(Se));return N--,v=e,N===0&&Z(me),p}if(pt=o(),t.peg$library)return{peg$result:pt,peg$currPos:m,peg$FAILED:e,peg$maxFailExpected:ct,peg$maxFailPos:He};if(pt!==e&&m===i.length)return pt;throw pt!==e&&m<i.length&&Z(Mt()),wt(ct,He<i.length?i.charAt(He):null,He<i.length?Lt(He,He+1):Lt(He,He))}/**
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
 */const Kt=0xffffffffffffffffn;function ia(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function ba(i,t){return i*t&Kt}function Ia(i){return function(){let t=BigInt(i&Kt),e=BigInt(i>>64n&Kt);const s=ba(ia(ba(t,5n),7n),9n);return e^=t,t=(ia(t,24n)^e^e<<16n)&Kt,e=ia(e,37n),i=e<<64n|t,s}}const Yt=Ia(0xa187eb39cdcaed8f31c4b365b102e01en),Pa=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Yt()))),Ma=Array.from({length:8},()=>Yt()),La=Array.from({length:16},()=>Yt()),na=Yt(),Oe="w",Ve="b",Ee="p",ca="n",Vt="b",At="r",mt="q",Pe="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Ut{constructor(t,e){_e(this,"color");_e(this,"from");_e(this,"to");_e(this,"piece");_e(this,"captured");_e(this,"promotion");_e(this,"flags");_e(this,"san");_e(this,"lan");_e(this,"before");_e(this,"after");const{color:s,piece:d,from:o,to:b,flags:n,captured:k,promotion:P}=e,_=Me(o),j=Me(b);this.color=s,this.piece=d,this.from=_,this.to=j,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=_+j,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const E in se)se[E]&n&&(this.flags+=xt[E]);k&&(this.captured=k),P&&(this.promotion=P,this.lan+=P)}isCapture(){return this.flags.indexOf(xt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(xt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(xt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(xt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(xt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(xt.BIG_PAWN)>-1}}const ze=-1,xt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},se={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},pa={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},qa={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},za={...pa,...qa},re={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},oa={b:[16,32,17,15],w:[-16,-32,-17,-15]},fa={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ra=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Na=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ba={p:1,n:2,b:4,r:8,q:16,k:32},Oa="pnbrqkPNBRQK",ma=[ca,Vt,At,mt],Fa=7,Ha=6,Ua=1,Ga=0,Gt={[Pe]:se.KSIDE_CASTLE,[mt]:se.QSIDE_CASTLE},bt={w:[{square:re.a1,flag:se.QSIDE_CASTLE},{square:re.h1,flag:se.KSIDE_CASTLE}],b:[{square:re.a8,flag:se.QSIDE_CASTLE},{square:re.h8,flag:se.KSIDE_CASTLE}]},Wa={b:Ua,w:Ha},sa="--";function kt(i){return i>>4}function jt(i){return i&15}function xa(i){return"0123456789".indexOf(i)!==-1}function Me(i){const t=jt(i),e=kt(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function _t(i){return i===Oe?Ve:Oe}function Ka(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const s=parseInt(t[4],10);if(isNaN(s)||s<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const d=t[0].split("/");if(d.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let b=0;b<d.length;b++){let n=0,k=!1;for(let P=0;P<d[b].length;P++)if(xa(d[b][P])){if(k)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};n+=parseInt(d[b][P],10),k=!0}else{if(!/^[prnbqkPRNBQK]$/.test(d[b][P]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};n+=1,k=!1}if(n!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const o=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:b,regex:n}of o){if(!n.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${b} king`};if((t[0].match(n)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${b} kings`}}return Array.from(d[0]+d[7]).some(b=>b.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Va(i,t){const e=i.from,s=i.to,d=i.piece;let o=0,b=0,n=0;for(let k=0,P=t.length;k<P;k++){const _=t[k].from,j=t[k].to,E=t[k].piece;d===E&&e!==_&&s===j&&(o++,kt(e)===kt(_)&&b++,jt(e)===jt(_)&&n++)}return o>0?b>0&&n>0?Me(e):n>0?Me(e).charAt(1):Me(e).charAt(0):""}function ft(i,t,e,s,d,o=void 0,b=se.NORMAL){const n=kt(s);if(d===Ee&&(n===Fa||n===Ga))for(let k=0;k<ma.length;k++){const P=ma[k];i.push({color:t,from:e,to:s,piece:d,captured:o,promotion:P,flags:b|se.PROMOTION})}else i.push({color:t,from:e,to:s,piece:d,captured:o,flags:b})}function ha(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:Ee:(t=t.toLowerCase(),t==="o"?Pe:t)}function la(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class va{constructor(t=ra,{skipValidation:e=!1}={}){_e(this,"_board",new Array(128));_e(this,"_turn",Oe);_e(this,"_header",{});_e(this,"_kings",{w:ze,b:ze});_e(this,"_epSquare",-1);_e(this,"_halfMoves",0);_e(this,"_moveNumber",0);_e(this,"_history",[]);_e(this,"_comments",{});_e(this,"_castling",{w:0,b:0});_e(this,"_hash",0n);_e(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:ze,b:ze},this._turn=Oe,this._castling={w:0,b:0},this._epSquare=ze,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...za},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:s=!1}={}){let d=t.split(/\s+/);if(d.length>=2&&d.length<6){const n=["-","-","0","1"];t=d.concat(n.slice(-(6-d.length))).join(" ")}if(d=t.split(/\s+/),!e){const{ok:n,error:k}=Ka(t);if(!n)throw new Error(k)}const o=d[0];let b=0;this.clear({preserveHeaders:s});for(let n=0;n<o.length;n++){const k=o.charAt(n);if(k==="/")b+=8;else if(xa(k))b+=parseInt(k,10);else{const P=k<"a"?Oe:Ve;this._put({type:k.toLowerCase(),color:P},Me(b)),b++}}this._turn=d[1],d[2].indexOf("K")>-1&&(this._castling.w|=se.KSIDE_CASTLE),d[2].indexOf("Q")>-1&&(this._castling.w|=se.QSIDE_CASTLE),d[2].indexOf("k")>-1&&(this._castling.b|=se.KSIDE_CASTLE),d[2].indexOf("q")>-1&&(this._castling.b|=se.QSIDE_CASTLE),this._epSquare=d[3]==="-"?ze:re[d[3]],this._halfMoves=parseInt(d[4],10),this._moveNumber=parseInt(d[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var b,n;let e=0,s="";for(let k=re.a8;k<=re.h1;k++){if(this._board[k]){e>0&&(s+=e,e=0);const{color:P,type:_}=this._board[k];s+=P===Oe?_.toUpperCase():_.toLowerCase()}else e++;k+1&136&&(e>0&&(s+=e),k!==re.h1&&(s+="/"),e=0,k+=8)}let d="";this._castling[Oe]&se.KSIDE_CASTLE&&(d+="K"),this._castling[Oe]&se.QSIDE_CASTLE&&(d+="Q"),this._castling[Ve]&se.KSIDE_CASTLE&&(d+="k"),this._castling[Ve]&se.QSIDE_CASTLE&&(d+="q"),d=d||"-";let o="-";if(this._epSquare!==ze)if(t)o=Me(this._epSquare);else{const k=this._epSquare+(this._turn===Oe?16:-16),P=[k+1,k-1];for(const _ of P){if(_&136)continue;const j=this._turn;if(((b=this._board[_])==null?void 0:b.color)===j&&((n=this._board[_])==null?void 0:n.type)===Ee){this._makeMove({color:j,from:_,to:this._epSquare,piece:Ee,captured:Ee,flags:se.EP_CAPTURE});const E=!this._isKingAttacked(j);if(this._undoMove(),E){o=Me(this._epSquare);break}}}}return[s,this._turn,d,o,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:s}=this._board[t],d={w:0,b:1}[e],o={p:0,n:1,b:2,r:3,q:4,k:5}[s];return Pa[d][o][t]}_epKey(){return this._epSquare===ze?0n:Ma[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return La[t]}_computeHash(){let t=0n;for(let e=re.a8;e<=re.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=na),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[re[t]]}findPiece(t){var s;const e=[];for(let d=re.a8;d<=re.h1;d++){if(d&136){d+=7;continue}!this._board[d]||((s=this._board[d])==null?void 0:s.color)!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(Me(d))}return e}put({type:t,color:e},s){return this._put({type:t,color:e},s)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},s){if(Oa.indexOf(t.toLowerCase())===-1||!(s in re))return!1;const d=re[s];if(t==Pe&&!(this._kings[e]==ze||this._kings[e]==d))return!1;const o=this._board[d];return o&&o.type===Pe&&(this._kings[o.color]=ze),this._set(d,{type:t,color:e}),t===Pe&&(this._kings[e]=d),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(re[t]),e&&e.type===Pe&&(this._kings[e.color]=ze),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var s,d,o,b,n,k,P,_,j,E,Y,Q;this._hash^=this._castlingKey();const t=((s=this._board[re.e1])==null?void 0:s.type)===Pe&&((d=this._board[re.e1])==null?void 0:d.color)===Oe,e=((o=this._board[re.e8])==null?void 0:o.type)===Pe&&((b=this._board[re.e8])==null?void 0:b.color)===Ve;(!t||((n=this._board[re.a1])==null?void 0:n.type)!==At||((k=this._board[re.a1])==null?void 0:k.color)!==Oe)&&(this._castling.w&=-65),(!t||((P=this._board[re.h1])==null?void 0:P.type)!==At||((_=this._board[re.h1])==null?void 0:_.color)!==Oe)&&(this._castling.w&=-33),(!e||((j=this._board[re.a8])==null?void 0:j.type)!==At||((E=this._board[re.a8])==null?void 0:E.color)!==Ve)&&(this._castling.b&=-65),(!e||((Y=this._board[re.h8])==null?void 0:Y.type)!==At||((Q=this._board[re.h8])==null?void 0:Q.color)!==Ve)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var o,b;if(this._epSquare===ze)return;const t=this._epSquare+(this._turn===Oe?-16:16),e=this._epSquare+(this._turn===Oe?16:-16),s=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((o=this._board[e])==null?void 0:o.color)!==_t(this._turn)||((b=this._board[e])==null?void 0:b.type)!==Ee){this._hash^=this._epKey(),this._epSquare=ze;return}const d=n=>{var k,P;return!(n&136)&&((k=this._board[n])==null?void 0:k.color)===this._turn&&((P=this._board[n])==null?void 0:P.type)===Ee};s.some(d)||(this._hash^=this._epKey(),this._epSquare=ze)}_attacked(t,e,s){const d=[];for(let o=re.a8;o<=re.h1;o++){if(o&136){o+=7;continue}if(this._board[o]===void 0||this._board[o].color!==t)continue;const b=this._board[o],n=o-e;if(n===0)continue;const k=n+119;if(Ra[k]&Ba[b.type]){if(b.type===Ee){if(n>0&&b.color===Oe||n<=0&&b.color===Ve)if(s)d.push(Me(o));else return!0;continue}if(b.type==="n"||b.type==="k")if(s){d.push(Me(o));continue}else return!0;const P=Na[k];let _=o+P,j=!1;for(;_!==e;){if(this._board[_]!=null){j=!0;break}_+=P}if(!j)if(s){d.push(Me(o));continue}else return!0}}return s?d:!1}attackers(t,e){return e?this._attacked(e,re[t],!0):this._attacked(this._turn,re[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(_t(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,re[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let s=0,d=0;for(let o=re.a8;o<=re.h1;o++){if(d=(d+1)%2,o&136){o+=7;continue}const b=this._board[o];b&&(t[b.type]=b.type in t?t[b.type]+1:1,b.type===Vt&&e.push(d),s++)}if(s===2)return!0;if(s===3&&(t[Vt]===1||t[ca]===1))return!0;if(s===t[Vt]+2){let o=0;const b=e.length;for(let n=0;n<b;n++)o+=e[n];if(o===0||o===b)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:s=void 0}={}){const d=this._moves({square:e,piece:s});return t?d.map(o=>new Ut(this,o)):d.map(o=>this._moveToSan(o,d))}_moves({legal:t=!0,piece:e=void 0,square:s=void 0}={}){var Y;const d=s?s.toLowerCase():void 0,o=e==null?void 0:e.toLowerCase(),b=[],n=this._turn,k=_t(n);let P=re.a8,_=re.h1,j=!1;if(d)if(d in re)P=_=re[d],j=!0;else return[];for(let Q=P;Q<=_;Q++){if(Q&136){Q+=7;continue}if(!this._board[Q]||this._board[Q].color===k)continue;const{type:ke}=this._board[Q];let ve;if(ke===Ee){if(o&&o!==ke)continue;ve=Q+oa[n][0],this._board[ve]||(ft(b,n,Q,ve,Ee),ve=Q+oa[n][1],Wa[n]===kt(Q)&&!this._board[ve]&&ft(b,n,Q,ve,Ee,void 0,se.BIG_PAWN));for(let Ie=2;Ie<4;Ie++)ve=Q+oa[n][Ie],!(ve&136)&&(((Y=this._board[ve])==null?void 0:Y.color)===k?ft(b,n,Q,ve,Ee,this._board[ve].type,se.CAPTURE):ve===this._epSquare&&ft(b,n,Q,ve,Ee,Ee,se.EP_CAPTURE))}else{if(o&&o!==ke)continue;for(let Ie=0,ot=fa[ke].length;Ie<ot;Ie++){const nt=fa[ke][Ie];for(ve=Q;ve+=nt,!(ve&136);){if(!this._board[ve])ft(b,n,Q,ve,ke);else{if(this._board[ve].color===n)break;ft(b,n,Q,ve,ke,this._board[ve].type,se.CAPTURE);break}if(ke===ca||ke===Pe)break}}}}if((o===void 0||o===Pe)&&(!j||_===this._kings[n])){if(this._castling[n]&se.KSIDE_CASTLE){const Q=this._kings[n],ke=Q+2;!this._board[Q+1]&&!this._board[ke]&&!this._attacked(k,this._kings[n])&&!this._attacked(k,Q+1)&&!this._attacked(k,ke)&&ft(b,n,this._kings[n],ke,Pe,void 0,se.KSIDE_CASTLE)}if(this._castling[n]&se.QSIDE_CASTLE){const Q=this._kings[n],ke=Q-2;!this._board[Q-1]&&!this._board[Q-2]&&!this._board[Q-3]&&!this._attacked(k,this._kings[n])&&!this._attacked(k,Q-1)&&!this._attacked(k,ke)&&ft(b,n,this._kings[n],ke,Pe,void 0,se.QSIDE_CASTLE)}}if(!t||this._kings[n]===-1)return b;const E=[];for(let Q=0,ke=b.length;Q<ke;Q++)this._makeMove(b[Q]),this._isKingAttacked(n)||E.push(b[Q]),this._undoMove();return E}move(t,{strict:e=!1}={}){let s=null;if(typeof t=="string")s=this._moveFromSan(t,e);else if(t===null)s=this._moveFromSan(sa,e);else if(typeof t=="object"){const o=this._moves();for(let b=0,n=o.length;b<n;b++)if(t.from===Me(o[b].from)&&t.to===Me(o[b].to)&&(!("promotion"in o[b])||t.promotion===o[b].promotion)){s=o[b];break}}if(!s)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&s.flags&se.NULL_MOVE)throw new Error("Null move not allowed when in check");const d=new Ut(this,s);return this._makeMove(s),this._incPositionCount(),d}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var d,o,b,n;const e=this._turn,s=_t(e);if(this._push(t),t.flags&se.NULL_MOVE){e===Ve&&this._moveNumber++,this._halfMoves++,this._turn=s,this._epSquare=ze;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&se.EP_CAPTURE&&(this._turn===Ve?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Pe){if(this._kings[e]=t.to,t.flags&se.KSIDE_CASTLE){const k=t.to-1,P=t.to+1;this._movePiece(P,k)}else if(t.flags&se.QSIDE_CASTLE){const k=t.to+1,P=t.to-2;this._movePiece(P,k)}this._castling[e]=0}if(this._castling[e]){for(let k=0,P=bt[e].length;k<P;k++)if(t.from===bt[e][k].square&&this._castling[e]&bt[e][k].flag){this._castling[e]^=bt[e][k].flag;break}}if(this._castling[s]){for(let k=0,P=bt[s].length;k<P;k++)if(t.to===bt[s][k].square&&this._castling[s]&bt[s][k].flag){this._castling[s]^=bt[s][k].flag;break}}if(this._hash^=this._castlingKey(),t.flags&se.BIG_PAWN){let k;e===Ve?k=t.to-16:k=t.to+16,!(t.to-1&136)&&((d=this._board[t.to-1])==null?void 0:d.type)===Ee&&((o=this._board[t.to-1])==null?void 0:o.color)===s||!(t.to+1&136)&&((b=this._board[t.to+1])==null?void 0:b.type)===Ee&&((n=this._board[t.to+1])==null?void 0:n.color)===s?(this._epSquare=k,this._hash^=this._epKey()):this._epSquare=ze}else this._epSquare=ze;t.piece===Ee?this._halfMoves=0:t.flags&(se.CAPTURE|se.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===Ve&&this._moveNumber++,this._turn=s,this._hash^=na}undo(){const t=this._hash,e=this._undoMove();if(e){const s=new Ut(this,e);return this._decPositionCount(t),s}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=na;const s=this._turn,d=_t(s);if(e.flags&se.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:s})),e.captured)if(e.flags&se.EP_CAPTURE){let o;s===Ve?o=e.to-16:o=e.to+16,this._set(o,{type:Ee,color:d})}else this._set(e.to,{type:e.captured,color:d});if(e.flags&(se.KSIDE_CASTLE|se.QSIDE_CASTLE)){let o,b;e.flags&se.KSIDE_CASTLE?(o=e.to+1,b=e.to-1):(o=e.to-2,b=e.to+1),this._movePiece(b,o)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const s=[];let d=!1;for(const E in this._header)this._header[E]&&s.push(`[${E} "${this._header[E]}"]`+t),d=!0;d&&this._history.length&&s.push(t);const o=E=>{const Y=this._comments[this.fen()];if(typeof Y<"u"){const Q=E.length>0?" ":"";E=`${E}${Q}{${Y}}`}return E},b=[];for(;this._history.length>0;)b.push(this._undoMove());const n=[];let k="";for(b.length===0&&n.push(o(""));b.length>0;){k=o(k);const E=b.pop();if(!E)break;if(!this._history.length&&E.color==="b"){const Y=`${this._moveNumber}. ...`;k=k?`${k} ${Y}`:Y}else E.color==="w"&&(k.length&&n.push(k),k=this._moveNumber+".");k=k+" "+this._moveToSan(E,this._moves({legal:!0})),this._makeMove(E)}if(k.length&&n.push(o(k)),n.push(this._header.Result||"*"),e===0)return s.join("")+n.join(" ");const P=function(){return s.length>0&&s[s.length-1]===" "?(s.pop(),!0):!1},_=function(E,Y){for(const Q of Y.split(" "))if(Q){if(E+Q.length>e){for(;P();)E--;s.push(t),E=0}s.push(Q),E+=Q.length,s.push(" "),E++}return P()&&E--,E};let j=0;for(let E=0;E<n.length;E++){if(j+n[E].length>e&&n[E].includes("{")){j=_(j,n[E]);continue}j+n[E].length>e&&E!==0?(s[s.length-1]===" "&&s.pop(),s.push(t),j=0):E!==0&&(s.push(" "),j++),s.push(n[E]),j+=n[E].length}return s.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??pa[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=pa[t]||null,!0):!1}getHeaders(){const t={};for(const[e,s]of Object.entries(this._header))s!==null&&(t[e]=s);return t}loadPgn(t,{strict:e=!1,newlineChar:s=`\r?
`}={}){s!==`\r?
`&&(t=t.replace(new RegExp(s,"g"),`
`));const d=Ea(t);this.reset();const o=d.headers;let b="";for(const P in o)P.toLowerCase()==="fen"&&(b=o[P]),this.header(P,o[P]);if(!e)b&&this.load(b,{preserveHeaders:!0});else if(o.SetUp==="1"){if(!("FEN"in o))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(o.FEN,{preserveHeaders:!0})}let n=d.root;for(;n;){if(n.move){const P=this._moveFromSan(n.move,e);if(P==null)throw new Error(`Invalid move in PGN: ${n.move}`);this._makeMove(P),this._incPositionCount()}n.comment!==void 0&&(this._comments[this.fen()]=n.comment),n=n.variations[0]}const k=d.result;k&&Object.keys(this._header).length&&this._header.Result!==k&&this.setHeader("Result",k)}_moveToSan(t,e){let s="";if(t.flags&se.KSIDE_CASTLE)s="O-O";else if(t.flags&se.QSIDE_CASTLE)s="O-O-O";else{if(t.flags&se.NULL_MOVE)return sa;if(t.piece!==Ee){const d=Va(t,e);s+=t.piece.toUpperCase()+d}t.flags&(se.CAPTURE|se.EP_CAPTURE)&&(t.piece===Ee&&(s+=Me(t.from)[0]),s+="x"),s+=Me(t.to),t.promotion&&(s+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?s+="#":s+="+"),this._undoMove(),s}_moveFromSan(t,e=!1){let s=la(t);if(e||(s==="0-0"?s="O-O":s==="0-0-0"&&(s="O-O-O")),s==sa)return{color:this._turn,from:0,to:0,piece:"k",flags:se.NULL_MOVE};let d=ha(s),o=this._moves({legal:!0,piece:d});for(let E=0,Y=o.length;E<Y;E++)if(s===la(this._moveToSan(o[E],o)))return o[E];if(e)return null;let b,n,k,P,_,j=!1;if(n=s.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),n?(b=n[1],k=n[2],P=n[3],_=n[4],k.length==1&&(j=!0)):(n=s.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),n&&(b=n[1],k=n[2],P=n[3],_=n[4],k.length==1&&(j=!0))),d=ha(s),o=this._moves({legal:!0,piece:b||d}),!P)return null;for(let E=0,Y=o.length;E<Y;E++)if(k){if((!b||b.toLowerCase()==o[E].piece)&&re[k]==o[E].from&&re[P]==o[E].to&&(!_||_.toLowerCase()==o[E].promotion))return o[E];if(j){const Q=Me(o[E].from);if((!b||b.toLowerCase()==o[E].piece)&&re[P]==o[E].to&&(k==Q[0]||k==Q[1])&&(!_||_.toLowerCase()==o[E].promotion))return o[E]}}else if(s===la(this._moveToSan(o[E],o)).replace("x",""))return o[E];return null}ascii(){let t=`   +------------------------+
`;for(let e=re.a8;e<=re.h1;e++){if(jt(e)===0&&(t+=" "+"87654321"[kt(e)]+" |"),this._board[e]){const s=this._board[e].type,o=this._board[e].color===Oe?s.toUpperCase():s.toLowerCase();t+=" "+o+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let s=0;const d=this._turn;for(let o=0,b=e.length;o<b;o++)this._makeMove(e[o]),this._isKingAttacked(d)||(t-1>0?s+=this.perft(t-1):s++),this._undoMove();return s}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let s=re.a8;s<=re.h1;s++)this._board[s]==null?e.push(null):e.push({square:Me(s),type:this._board[s].type,color:this._board[s].color}),s+1&136&&(t.push(e),e=[],s+=8);return t}squareColor(t){if(t in re){const e=re[t];return(kt(e)+jt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],s=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const d=e.pop();if(!d)break;t?s.push(new Ut(this,d)):s.push(this._moveToSan(d,this._moves())),this._makeMove(d)}return s}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},s=d=>{d in this._comments&&(e[d]=this._comments[d])};for(;this._history.length>0;)t.push(this._undoMove());for(s(this.fen());;){const d=t.pop();if(!d)break;this._makeMove(d),s(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const d of[Pe,mt])e[d]!==void 0&&(e[d]?this._castling[t]|=Gt[d]:this._castling[t]&=~Gt[d]);this._updateCastlingRights();const s=this.getCastlingRights(t);return(e[Pe]===void 0||e[Pe]===s[Pe])&&(e[mt]===void 0||e[mt]===s[mt])}getCastlingRights(t){return{[Pe]:(this._castling[t]&Gt[Pe])!==0,[mt]:(this._castling[t]&Gt[mt])!==0}}moveNumber(){return this._moveNumber}}async function Za(i,t={}){var fe,ce,pe;const e=t.currentUser||{};let s="chat",d=[],o=null,b=[],n=[],k=null,P=null,_=!1,j=null,E=null;i.innerHTML=`
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
  `,Ya(),await nt(),De();const Y=i.querySelector("#tab-nav-chat"),Q=i.querySelector("#tab-nav-lounge"),ke=i.querySelector("#bonding-chat-main-wrap"),ve=i.querySelector("#bonding-lounge-main-wrap");Y==null||Y.addEventListener("click",()=>{s="chat",Y.classList.add("active"),Q.classList.remove("active"),ke.style.display="grid",ve.style.display="none",De()}),Q==null||Q.addEventListener("click",async()=>{s="lounge_games",Q.classList.add("active"),Y.classList.remove("active"),ke.style.display="none",ve.style.display="block",await l()}),(fe=i.querySelector("#btn-top-new-chat"))==null||fe.addEventListener("click",z),(ce=i.querySelector("#btn-top-new-group"))==null||ce.addEventListener("click",h),(pe=i.querySelector("#btn-top-challenge"))==null||pe.addEventListener("click",()=>q());const Ie=i.querySelector("#bonding-search-input");Ie&&Ie.addEventListener("input",u=>{const g=u.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(w=>{const x=w.textContent.toLowerCase();w.style.display=x.includes(g)?"flex":"none"})}),st(),new MutationObserver((u,g)=>{document.body.contains(i)||(P&&clearInterval(P),E&&clearInterval(E),g.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function nt(){try{const[u,g]=await Promise.all([Re("/bonding/channels").catch(()=>[]),Re("/bonding/colleagues").catch(()=>[])]);d=u,b=g,!o&&d.length>0&&(o=d.find(a=>a.name.includes("Lounge"))||d[0]),Fe(),o&&await Te(o._id)}catch(u){console.error("Failed to load bonding data",u)}}async function Te(u,g=!1){if(u)try{n=await Re(`/bonding/channels/${u}/messages`),g?D():r()}catch(a){console.error("Failed to load messages",a)}}function st(){P&&clearInterval(P),P=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval(P);return}s==="chat"&&o?await Te(o._id,!0):s==="lounge_games"&&await l(!0)}catch{}},3e3)}function Fe(){const u=i.querySelector("#bonding-group-list"),g=i.querySelector("#bonding-direct-list");if(!u||!g)return;const a=d.filter(x=>x.type==="group"),w=d.filter(x=>x.type==="direct");a.length===0?u.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':u.innerHTML=a.map(x=>{var A;return`
          <div class="bonding-channel-item ${o&&o._id===x._id?"active":""}" data-channel-id="${x._id}">
            <div class="bonding-channel-icon">${x.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${$(x.name)}</div>
              <div class="bonding-channel-preview">${$(((A=x.lastMessage)==null?void 0:A.content)||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${x._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),w.length===0?g.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':g.innerHTML=w.map(x=>{var U;const L=o&&o._id===x._id,A=x.displayName||x.name||"Colleague",W=A.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${L?"active":""}" data-channel-id="${x._id}">
            <div class="bonding-channel-avatar">${W}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${$(A)}</div>
              <div class="bonding-channel-preview">${$(((U=x.lastMessage)==null?void 0:U.content)||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${x._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),ht()}function ht(){var g,a;const u=i.querySelectorAll(".bonding-channel-item");u.forEach(w=>{w.onclick=async x=>{if(x.target.closest(".bonding-channel-del-btn"))return;const L=w.dataset.channelId,A=d.find(W=>W._id===L);A&&(o=A,u.forEach(W=>W.classList.remove("active")),w.classList.add("active"),De(),await Te(A._id))}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(w=>{w.onclick=async x=>{x.stopPropagation();const L=w.dataset.channelId,A=d.find(G=>G._id===L),W=A&&A.type==="direct",U=W?"this 1-on-1 chat":`the group "${(A==null?void 0:A.name)||""}"`;if(confirm(`Are you sure you want to delete ${U}? All messages will be permanently removed.`))try{w.disabled=!0,await Ye(`/bonding/channels/${L}`),S(W?"1-on-1 chat deleted":"Group deleted","success"),d=d.filter(G=>G._id!==L),o&&o._id===L&&(o=d[0]||null,De(),o&&await Te(o._id)),Fe()}catch(G){S(G.message||"Failed to delete conversation","error"),w.disabled=!1}}}),(g=i.querySelector("#btn-create-group"))==null||g.addEventListener("click",h),(a=i.querySelector("#btn-new-direct-chat"))==null||a.addEventListener("click",z)}function De(){const u=i.querySelector("#bonding-chat-panel");if(!u)return;if(!o){u.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const g=$(o.displayName||o.name),a=(o.members||[]).length,w=o.type==="group",x=(e==null?void 0:e._id)||(e==null?void 0:e.id),L=w?null:(o.members||[]).find(A=>{var W;return((W=A.userId)==null?void 0:W.toString())!==(x==null?void 0:x.toString())});u.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${w?o.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${g}</div>
            <div class="bonding-chat-sub">
              ${w?`<span>${a} members</span> · <span>${$(o.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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
              <span>👥</span> <span>Members (${a})</span>
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
        ${Xe()}
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
    `,Ne(L),be(L),et(),C()}function Xe(){if(!n||n.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const u=(e==null?void 0:e._id)||(e==null?void 0:e.id);return n.map(g=>{var A,W,U,G,M,ue,X,ge,J;const a=g.sender&&g.sender.userId&&u&&g.sender.userId.toString()===u.toString();if(g.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${g._id}">
            <span>ℹ️</span> <span>${$(g.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${g._id}" title="Delete Message">&times;</button>
          </div>
        `;if(g.type==="challenge"&&g.challengeData){const F=g.challengeData,V=F.gameTitle||"Game Challenge",te=F.gameType||"chess",R=te==="chess"?"♟️":te==="ludo"?"🎲":"❌",H=(A=F.gameState)==null?void 0:A.invitationId,ie=(W=F.targetUserId)==null?void 0:W.toString(),we=(G=(U=g.sender)==null?void 0:U.userId)==null?void 0:G.toString(),oe=u&&ie===u.toString(),me=u&&we===u.toString();return`
          <div class="bonding-msg-row ${a?"self":"other"}" data-msg-id="${g._id}">
            <div class="bonding-msg-avatar" title="${$(((M=g.sender)==null?void 0:M.name)||"Teammate")}">
              ${(((ue=g.sender)==null?void 0:ue.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${$(((X=g.sender)==null?void 0:X.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${de(g.createdAt)}</span>
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
                  <div class="game-bubble-icon">${R}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${$(V)}</h4>
                    <p class="game-bubble-desc">${$(g.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${F.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':F.status==="active"||F.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${$(((ge=F.status)==null?void 0:ge.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${F.status==="pending"&&oe?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${H}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${H}" data-action="decline">
                        Decline
                      </button>
                    `:F.status==="pending"&&me?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${H}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${H}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${Ze(g)}
            </div>
          </div>
        `}const w=$(((J=g.sender)==null?void 0:J.name)||"Teammate"),x=de(g.createdAt),L=Ze(g);return`
        <div class="bonding-msg-row ${a?"self":"other"}" data-msg-id="${g._id}">
          <div class="bonding-msg-avatar" title="${w}">${w.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${w}</span>
              <span class="bonding-msg-time">${x}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${g._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${$(g.content).replace(/\n/g,"<br/>")}
            </div>
            ${L}
          </div>
        </div>
      `}).join("")}function Ze(u){return`
      <div class="bonding-reactions-row">
        ${(u.reactions||[]).map(w=>{const x=(e==null?void 0:e._id)||(e==null?void 0:e.id);return`
        <button class="bonding-rxn-tag ${(w.users||[]).some(A=>A.toString()===(x==null?void 0:x.toString()))?"active":""}" data-msg-id="${u._id}" data-emoji="${w.emoji}">
          <span>${w.emoji}</span> <span>${w.users?w.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${u._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function Ne(u){const g=i.querySelector("#btn-chat-challenge");g&&(g.onclick=()=>{u?q(null,u.userId||u._id):q()});const a=i.querySelector("#btn-manage-members");a&&(a.onclick=T);const w=i.querySelector("#btn-delete-group");w&&(w.onclick=B);const x=i.querySelector("#btn-delete-direct");x&&(x.onclick=async()=>{if(o&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{x.disabled=!0,await Ye(`/bonding/channels/${o._id}`),S("1-on-1 chat deleted successfully","success");const A=o._id;d=d.filter(W=>W._id!==A),o=d[0]||null,Fe(),De(),o&&await Te(o._id)}catch(A){S(A.message||"Could not delete 1-on-1 chat","error"),x.disabled=!1}});const L=i.querySelector("#btn-clear-chat");L&&(L.onclick=async()=>{if(o&&confirm("Are you sure you want to clear all messages in this conversation?"))try{L.disabled=!0,await Ye(`/bonding/channels/${o._id}/messages`),S("Chat messages cleared","success"),n=[],r()}catch(A){S(A.message||"Could not clear chat messages","error")}finally{L.disabled=!1}})}function be(u){const g=i.querySelector("#bonding-message-input"),a=i.querySelector("#btn-send-message"),w=i.querySelector("#btn-quick-emoji"),x=i.querySelector("#btn-input-challenge");g&&g.addEventListener("keydown",L=>{L.key==="Enter"&&!L.shiftKey&&(L.preventDefault(),ye())}),a&&(a.onclick=ye),x&&(x.onclick=()=>{u?q(null,u.userId||u._id):q()}),w&&(w.onclick=()=>{if(!g)return;const L=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],A=L[Math.floor(Math.random()*L.length)];g.value+=(g.value?" ":"")+A,g.focus()})}function et(){i.querySelectorAll(".btn-respond-invite").forEach(w=>{w.onclick=async()=>{const x=w.dataset.inviteId,L=w.dataset.action;await K(x,L)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(w=>{w.onclick=async()=>{const x=w.dataset.inviteId;try{w.disabled=!0;const L=await Re("/bonding/invitations"),A=(L.incoming||[]).concat(L.sent||[]).find(W=>W._id===x);A&&A.matchId?O(A.matchId):S("Match has not started yet or has expired","warning")}catch(L){S(L.message||"Could not load match","error")}finally{w.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(w=>{w.onclick=async x=>{x.stopPropagation();const L=w.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{w.disabled=!0,await Ye(`/bonding/messages/${L}`),n=n.filter(A=>A._id!==L),D(),S("Message deleted","success")}catch(A){S(A.message||"Failed to delete message","error"),w.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(w=>{w.onclick=async()=>{const x=w.dataset.msgId,L=w.dataset.emoji;await c(x,L)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(w=>{w.onclick=x=>{const L=w.dataset.msgId;le(x.currentTarget,async A=>{await c(L,A)})}})}async function ye(){const u=i.querySelector("#bonding-message-input");if(!u||!o||_)return;const g=u.value.trim();if(g)try{_=!0,u.value="";const a=await $e(`/bonding/channels/${o._id}/messages`,{content:g,type:"text"});n.push(a),r(),C()}catch(a){S(a.message||"Failed to send message","error")}finally{_=!1,u.focus()}}async function c(u,g){try{const a=await $e(`/bonding/messages/${u}/react`,{emoji:g}),w=n.find(x=>x._id===u);w&&(w.reactions=a,D())}catch(a){S(a.message||"Failed to react","error")}}function C(){const u=i.querySelector("#bonding-messages-feed");u&&(u.scrollTop=u.scrollHeight)}function D(){const u=i.querySelector("#bonding-messages-feed");if(!u)return;const g=u.scrollHeight-u.scrollTop<=u.clientHeight+80;u.innerHTML=Xe(),et(),g&&C()}function r(){const u=i.querySelector("#bonding-messages-feed");u&&(u.innerHTML=Xe(),et())}async function l(u=!1){const g=i.querySelector("#bonding-lounge-main-wrap");if(g){u||(g.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const a=await Re("/bonding/games/overview");k=a;const w=a.myStats||{},x=a.availableGames||[],L=a.incomingChallenges||[],A=a.sentChallenges||[],W=a.activeMatches||[],U=a.recentMatches||[],G=(e==null?void 0:e._id)||(e==null?void 0:e.id);g.innerHTML=`
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
              ${x.map(M=>`
                <div class="lounge-game-card" data-game-id="${M.id}">
                  <div class="game-card-icon">${M.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${$(M.name)}</h4>
                    <p class="game-card-desc">${$(M.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${M.duration}</span>
                      ${M.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${M.id}" data-game-title="${$(M.name)}">
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
                <span class="badge blue">${L.length+A.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${L.length})</h5>
              ${L.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${L.map(M=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(M.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${$(M.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${$(M.sender.name)}</strong> (${$(M.sender.role)})</span>
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
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${A.length})</h5>
              ${A.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${A.map(M=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(M.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${$(M.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${$(M.recipient.name)}</strong></span>
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
                <span class="badge green">${W.length} Live</span>
              </div>

              ${W.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${W.map(M=>{const X=G&&M.player1.userId.toString()===G.toString()?M.player2:M.player1,ge=G&&M.currentTurnUserId&&M.currentTurnUserId.toString()===G.toString();return`
                        <div class="lounge-active-match-card ${ge?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${M.gameType==="chess"?"♟️":M.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${$(M.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${$(X.name)}</strong> (${$(X.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ge?"my-turn":"wait"}">
                              ${ge?"⚡ Your Turn!":"⏳ Opponent Turn"}
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
              ${U.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${U.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${U.map(M=>{const X=G&&M.player1.userId.toString()===G.toString()?M.player2:M.player1,ge=G&&M.winnerId&&M.winnerId.toString()===G.toString(),J=M.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${$(M.gameTitle)}</span>
                          <span class="recent-date">${de(M.completedAt||M.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${M._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${$(X.name)}</strong></div>
                          <div class="recent-outcome ${ge?"win":J?"draw":"loss"}">
                            ${ge?"🏆 VICTORY":J?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${$(M.winningReason||M.status)})</span>
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
      `,y()}catch(a){g.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${$(a.message)}</p>
        </div>
      `}}}function y(){i.querySelectorAll(".btn-challenge-game").forEach(g=>{g.onclick=()=>{const a=g.dataset.gameId;q(a)}}),i.querySelectorAll(".btn-respond-invite").forEach(g=>{g.onclick=async()=>{const a=g.dataset.inviteId,w=g.dataset.action;await K(a,w),await l()}}),i.querySelectorAll(".btn-resume-match").forEach(g=>{g.onclick=()=>{const a=g.dataset.matchId;O(a)}}),i.querySelectorAll(".btn-recent-rematch").forEach(g=>{g.onclick=async()=>{const a=g.dataset.matchId;try{g.disabled=!0;const w=await $e(`/bonding/matches/${a}/action`,{action:"rematch"});w.match&&(S("Rematch created! Opening arena ⚔️","success"),O(w.match._id))}catch(w){S(w.message||"Could not start rematch","error")}finally{g.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(g=>{g.onclick=async a=>{a.stopPropagation();const w=g.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{g.disabled=!0,await Ye(`/bonding/matches/${w}`),S("Match deleted successfully","success"),await l()}catch(x){S(x.message||"Failed to delete match","error")}finally{g.disabled=!1}}});const u=i.querySelector("#btn-clear-matches");u&&(u.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{u.disabled=!0,await Ye("/bonding/matches?filter=completed"),S("Completed matches history cleared","success"),await l()}catch(g){S(g.message||"Failed to clear matches","error")}finally{u.disabled=!1}})}function q(u=null,g=null){const a=i.querySelector("#bonding-modals-root"),w=(e==null?void 0:e._id)||(e==null?void 0:e.id),x=new Set(["employee","admin","superadmin"]),L=b.filter(ge=>!ge.isSelf&&ge._id.toString()!==(w==null?void 0:w.toString())&&x.has(ge.role));let A=u||"chess",W=g?g.toString():null,U=2,G=W?[W]:[],M="none";function ue(){const ge=L.find(te=>te._id.toString()===W),J=A==="ludo",F=U-1,V=G.length===F;a.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${J?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${A==="chess"?"active":""}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${A==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                  <button class="game-pill-btn ${A==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                </div>
              </div>

              <!-- LUDO SPECIAL: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${J?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${U===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${U===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${U===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${J?`Step 3 — Select Colleagues to Play With (${G.length}/${F} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${L.map(te=>{const R=J?G.includes(te._id.toString()):W===te._id.toString();return`
                      <div class="eligible-emp-item ${R?"selected":""}" data-user-id="${te._id}">
                        <div class="emp-item-avatar">${te.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${$(te.name)}</span>
                          <span class="emp-item-role">${$(te.role==="superadmin"?"Superadmin":te.role==="admin"?"Admin":"Employee")} · ${$(te.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${R?"active":""}">
                          ${R?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Step for Chess timers -->
              ${A==="chess"?`
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
                  <div><strong>Game:</strong> ${J?`🎲 Ludo (${U} Players · 4 Pawns per base)`:A==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${J?`
                    <div><strong>Opponents:</strong> ${G.length>0?G.map(te=>{const R=L.find(H=>H._id.toString()===te);return R?`<strong>${$(R.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+F+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${ge?`<strong>${$(ge.name)}</strong> (${$(ge.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${A==="chess"?`<div><strong>Time Control:</strong> ${M==="none"?"Untimed":M}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(J?!V:!W)?"disabled":""}>
                ${J?`Start ${U}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,X()}function X(){a.querySelector(".bonding-modal-close").onclick=()=>{a.innerHTML=""},a.querySelector("#btn-cancel-challenge-flow").onclick=()=>{a.innerHTML=""},a.querySelectorAll(".game-pill-btn").forEach(F=>{F.onclick=()=>{A=F.dataset.game,ue()}}),a.querySelectorAll(".ludo-mode-btn").forEach(F=>{F.onclick=()=>{U=Number(F.dataset.count),G=G.slice(0,U-1),ue()}});const ge=a.querySelector("#flow-emp-search");ge&&(ge.oninput=F=>{const V=F.target.value.toLowerCase().trim();a.querySelectorAll(".eligible-emp-item").forEach(te=>{const R=te.textContent.toLowerCase();te.style.display=R.includes(V)?"flex":"none"})}),a.querySelectorAll(".eligible-emp-item").forEach(F=>{F.onclick=()=>{const V=F.dataset.userId;if(A==="ludo"){const te=U-1;G.includes(V)?G=G.filter(R=>R!==V):G.length<te?G.push(V):G[te-1]=V}else W=V;ue()}}),a.querySelectorAll('input[name="timerMode"]').forEach(F=>{F.onchange=V=>{M=V.target.value,ue()}});const J=a.querySelector("#btn-submit-challenge-flow");J&&(J.onclick=async()=>{if(A==="ludo"){const F=U-1;if(G.length<F){S(`Please select ${F} colleague(s) to play with`,"warning");return}try{J.disabled=!0,J.textContent="Launching Match...";const V=await $e("/bonding/matches/instant-ludo",{playerCount:U,targetUserIds:G});a.innerHTML="",S(`Ludo match started (${U} Players)! 🎲`,"success"),V&&V._id&&O(V._id)}catch(V){S(V.message||"Failed to start Ludo match","error"),J.disabled=!1,J.textContent=`Start ${U}P Ludo Match 🎲`}return}if(!W){S("Please select an employee to challenge","warning");return}try{J.disabled=!0,J.textContent="Sending Challenge...",await $e("/bonding/invitations",{gameType:A,targetUserId:W,matchSettings:{timerMode:M},channelId:(o==null?void 0:o._id)||null}),S("Game challenge delivered! Awaiting acceptance ⚔️","success"),a.innerHTML="",o&&await Te(o._id),s==="lounge_games"&&await l()}catch(F){S(F.message||"Could not send challenge","error"),J.disabled=!1,J.textContent="Send Challenge 🚀"}})}ue()}async function K(u,g){if(!(!u||!g))try{const a=await Wt(`/bonding/invitations/${u}/respond`,{action:g});g==="accept"?(S("Challenge accepted! Entering match arena ⚔️","success"),a.match&&O(a.match._id)):g==="decline"?S("Challenge declined","info"):g==="cancel"&&S("Challenge cancelled","info"),o&&await Te(o._id),s==="lounge_games"&&await l()}catch(a){S(a.message||"Action failed","error")}}async function O(u){if(!u)return;j=u,E&&clearInterval(E);const g=i.querySelector("#bonding-modals-root");let a=null,w=null,x=[];async function L(){try{return a=await Re(`/bonding/matches/${u}`),a}catch(X){return S(X.message||"Could not load match","error"),A(),null}}if(a=await L(),!a)return;function A(){E&&clearInterval(E),j=null,g.innerHTML="",s==="lounge_games"&&l(!0),o&&Te(o._id,!0)}E=setInterval(async()=>{var F,V,te,R;if(!j||j!==u){clearInterval(E);return}const X=(F=a==null?void 0:a.currentTurnUserId)==null?void 0:F.toString(),ge=a==null?void 0:a.status,J=await L();J&&(((V=J.currentTurnUserId)==null?void 0:V.toString())!==X||J.status!==ge||((te=J.moves)==null?void 0:te.length)!==((R=a.moves)==null?void 0:R.length))&&W()},1500);function W(){var R,H;if(!a)return;const X=(e==null?void 0:e._id)||(e==null?void 0:e.id),ge=X&&a.player1.userId.toString()===X.toString(),J=ge?a.player1:a.player2,F=ge?a.player2:a.player1,V=X&&a.currentTurnUserId&&a.currentTurnUserId.toString()===X.toString(),te=a.status!=="active";g.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${a.gameType==="ludo"?"🎲":a.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${$(a.gameTitle)}</h3>
                  ${a.gameType==="ludo"&&((R=a.gameState)!=null&&R.players)?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${a.gameState.players.map(ie=>{var Se;const we=ie.userId&&ie.userId.toString()===(X==null?void 0:X.toString()),oe={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[ie.color]||"⚪",me=(((Se=a.gameState)==null?void 0:Se.turnColor)||a.turn)===ie.color;return`
                          <span class="player-tag ${we?"self":"opp"} ${me?"turn-active":""}">
                            ${oe} <strong>${$(ie.name)}</strong> ${we?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${$(J.name)} (You · <strong>${a.gameType==="ludo"?J.assignedRole==="red"?"🔴 Red":"🟢 Green":a.gameType==="tictactoe"?J.assignedRole==="X"?"✕":"◯":J.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${$(F.name)} (<strong>${a.gameType==="ludo"?F.assignedRole==="red"?"🔴 Red":"🟢 Green":a.gameType==="tictactoe"?F.assignedRole==="X"?"✕":"◯":F.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${te?"ended":V?"my-turn":"opp-turn"}">
                ${te?`<span>🏁 Finished (${$(a.winningReason||a.status)})</span>`:V?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${$(F.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${a.gameType==="ludo"?V?(H=a.gameState)!=null&&H.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":a.gameType==="tictactoe"?V?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":V?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${te?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${a.drawOfferedBy&&a.drawOfferedBy.toString()!==(X==null?void 0:X.toString())&&!te?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${$(F.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${a.gameType==="chess"?U(ge):""}
              ${a.gameType==="tictactoe"?G():""}
              ${a.gameType==="ludo"?M(ge):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${te?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${a.winnerId&&a.winnerId.toString()===(X==null?void 0:X.toString())?"🏆":a.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${a.winnerId&&a.winnerId.toString()===(X==null?void 0:X.toString())?"VICTORY!":a.status==="draw"?"STALEMATE / DRAW":`${$(a.winnerName)} Wins!`}</h4>
                  <p>Reason: ${$(a.winningReason||"Match concluded")}</p>
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
      `,ue(V,ge,J)}function U(X){var oe;const ge=((oe=a.gameState)==null?void 0:oe.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",J=new va(ge),F=X?a.player1.assignedRole==="white":a.player2.assignedRole==="white",V={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},te=F?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],R=F?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let H='<div class="chess-board-grid">';for(const me of R)for(const Se of te){const Ae=`${Se}${me}`,Ce=J.get(Ae),Qe=(Se.charCodeAt(0)-97+me)%2!==0,tt=w===Ae,Ge=x.includes(Ae),Be=Ce?Ce.color==="w"?V[Ce.type.toUpperCase()]:V[Ce.type]:"";H+=`
            <div class="chess-sq ${Qe?"light":"dark"} ${tt?"selected":""} ${Ge?"legal-dot":""}" data-square="${Ae}">
              ${Be?`<span class="chess-piece ${Ce.color==="w"?"white-piece":"black-piece"}">${Be}</span>`:""}
            </div>
          `}H+="</div>";const we=(a.moves||[]).map(me=>{var Se;return`
        <span class="chess-move-token">${me.moveNum}. ${((Se=me.moveData)==null?void 0:Se.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${H}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${we||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function G(){var J;const X=((J=a.gameState)==null?void 0:J.board)||Array(9).fill(null),ge=a.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${X.map((F,V)=>{const te=ge.includes(V);return`
                <div class="ttt-cell ${F?"filled":"empty"} ${te?"win-cell":""}" data-cell-idx="${V}">
                  ${F==="X"?'<span class="ttt-x">✕</span>':F==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function M(X,ge,J){var Rt;const F=a.gameState||{},V=F.activeColors||["red","green"],te=F.players||[{...a.player1,color:"red",assignedRole:"red",isBot:!1},{...a.player2,color:"green",assignedRole:"green",isBot:!1}],R=F.tokens||{},H=I=>{const ee=R[I]||(I==="red"?F.p1Tokens:I==="green"?F.p2Tokens:[])||[];return Array.from({length:4},(he,Le)=>ee[Le]||{id:Le,step:-1})},ie=H("red"),we=H("green"),oe=H("yellow"),me=H("blue"),Se=(e==null?void 0:e._id)||(e==null?void 0:e.id),Ae=te.find(I=>I.userId&&I.userId.toString()===(Se==null?void 0:Se.toString()))||te[0],Ce=(Ae==null?void 0:Ae.color)||(X?"red":"green"),Qe=F.turnColor||a.turn||"red",tt=Ce===Qe&&a.status==="active",Ge=!!F.rolled,Be=F.dice,lt=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],Dt=[[7,1],[7,2],[7,3],[7,4],[7,5]],Et=[[1,7],[2,7],[3,7],[4,7],[5,7]],It=[[7,13],[7,12],[7,11],[7,10],[7,9]],Pt=[[13,7],[12,7],[11,7],[10,7],[9,7]],m=[0,8,13,21,26,34,39,47];function dt(I,ee){return ee<0?null:ee>=56?I==="red"?[7,6]:I==="green"?[6,7]:I==="yellow"?[7,8]:[8,7]:I==="red"?ee<=50?lt[ee]:Dt[ee-51]:I==="green"?ee<=50?lt[(13+ee)%52]:Et[ee-51]:I==="yellow"?ee<=50?lt[(26+ee)%52]:It[ee-51]:ee<=50?lt[(39+ee)%52]:Pt[ee-51]}function He(I,ee){return I!==Ce||!tt||!Ge||!Be||a.status!=="active"?!1:ee.step===-1?Be===6:ee.step>=0&&ee.step+Be<=56}const ct={},N=(I,ee)=>{ee.forEach(he=>{if(he.step>=0&&he.step<56){const Le=dt(I,he.step);if(Le){const Ke=Le[0]+","+Le[1];(ct[Ke]=ct[Ke]||[]).push({color:I,id:he.id,step:he.step,movable:He(I,he)})}}})};V.includes("red")&&N("red",ie),V.includes("green")&&N("green",we),V.includes("yellow")&&N("yellow",oe),V.includes("blue")&&N("blue",me);const pt={};lt.forEach(([I,ee],he)=>{pt[I+","+ee]=he});const je={};Dt.forEach(([I,ee],he)=>{je[I+","+ee]=he+1});const We={};Et.forEach(([I,ee],he)=>{We[I+","+ee]=he+1});const Mt={};It.forEach(([I,ee],he)=>{Mt[I+","+ee]=he+1});const Ue={};Pt.forEach(([I,ee],he)=>{Ue[I+","+ee]=he+1});const Ct=[];for(let I=0;I<15;I++)for(let ee=0;ee<15;ee++){if(I<6&&ee<6||I<6&&ee>8||I>8&&ee<6||I>8&&ee>8||I>=6&&I<=8&&ee>=6&&ee<=8)continue;const he=I+","+ee,Le=pt[he],Ke=Le!==void 0&&m.includes(Le),rt=I===6&&ee===1,at=I===1&&ee===8,ut=I===8&&ee===13,Nt=I===13&&ee===6,Xt=je[he],Bt=We[he],Zt=Mt[he],qe=Ue[he];let p="ludo-cell";rt?p+=" cell-red-start":at?p+=" cell-green-start":ut?p+=" cell-yellow-start":Nt?p+=" cell-blue-start":Xt?p+=" cell-red-stretch":Bt?p+=" cell-green-stretch":Zt?p+=" cell-yellow-stretch":qe?p+=" cell-blue-stretch":Ke&&(p+=" cell-safe-star");const v=ct[he]||[];Ct.push(`
            <div class="${p}" style="grid-row:${I+1};grid-column:${ee+1}" data-pos="${he}">
              ${Ke?'<span class="cell-star-glyph">⭐</span>':""}
              ${rt||at||ut||Nt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${v.map(f=>`
                <div class="ludo-token token-${f.color} ${f.movable?"movable":""}" data-token-id="${f.id}" data-color="${f.color}" title="${f.color.toUpperCase()} Pawn ${f.id+1}">
                  <span>${f.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}const Lt=["","⚀","⚁","⚂","⚃","⚄","⚅"];function Z(I){return!I||I.step===-1?"Base":I.step===56?"🏁 Home!":I.step>50?`H${I.step-50}`:`S${I.step}`}function wt(I,ee,he,Le,Ke){const rt=`${I}-yard`;return he?`
          <div class="ludo-yard ${rt} ${Qe===I?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${ee}</span>
                ${Le?`<small class="yard-player-lbl">${$(Le.name)}${Le.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${Ke.map((at,ut)=>`
                  <div class="yard-token-slot">
                    ${at.step===-1?`
                      <div class="ludo-token token-${I} ${He(I,at)?"movable":""}" data-token-id="${at.id}" data-color="${I}" title="${I.toUpperCase()} Pawn ${at.id+1}">
                        <span>${at.id+1}</span>
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
                <div class="yard-title">${ee} (Inactive)</div>
              </div>
            </div>
          `}const qt=te.find(I=>I.color==="red"),Qt=te.find(I=>I.color==="green"),zt=te.find(I=>I.color==="yellow"),Jt=te.find(I=>I.color==="blue");return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${wt("red","🔴 Red Base",V.includes("red"),qt,ie)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${wt("green","🟢 Green Base",V.includes("green"),Qt,we)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${wt("blue","🔵 Blue Base",V.includes("blue"),Jt,me)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${wt("yellow","🟡 Yellow Base",V.includes("yellow"),zt,oe)}

            <!-- 5. Center Home Victory Zone (3x3) -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${ie.filter(I=>I.step===56).map(I=>`<span class="tok-finished red" title="Red Pawn ${I.id+1} Home">🔴${I.id+1}</span>`).join("")}
                  ${we.filter(I=>I.step===56).map(I=>`<span class="tok-finished green" title="Green Pawn ${I.id+1} Home">🟢${I.id+1}</span>`).join("")}
                  ${oe.filter(I=>I.step===56).map(I=>`<span class="tok-finished yellow" title="Yellow Pawn ${I.id+1} Home">🟡${I.id+1}</span>`).join("")}
                  ${me.filter(I=>I.step===56).map(I=>`<span class="tok-finished blue" title="Blue Pawn ${I.id+1} Home">🔵${I.id+1}</span>`).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Ct.join("")}
          </div>

          <!-- Ludo Action & Dice Roller Console -->
          <div class="ludo-console">
            <div class="ludo-dice-box">
              <div class="ludo-dice-visual ${Ge?"rolled":""}">
                ${Be?`<span class="dice-glyph">${Lt[Be]}</span>`:"🎲"}
              </div>
              ${Be?`<span class="dice-num-lbl">Rolled ${Be}</span>`:'<span class="dice-num-lbl">Ready</span>'}
            </div>

            <div class="ludo-controls-box">
              ${tt&&!Ge&&a.status==="active"?`
                <button class="btn-ludo-roll pulse" id="btn-ludo-roll">🎲 Roll Dice</button>
              `:tt&&Ge&&a.status==="active"?`
                <div class="ludo-prompt-text highlight">
                  ${H(Ce).some(I=>He(Ce,I))?"👉 Tap your <strong>glowing pawn</strong> to advance!":"No moves possible with this roll. Turn passing..."}
                </div>
              `:`
                <div class="ludo-prompt-text">
                  ${a.status==="active"?`⏳ Waiting for ${$(((Rt=te.find(I=>I.color===Qe))==null?void 0:Rt.name)||"opponent")} (${Qe.toUpperCase()})...`:"🏁 Match Concluded"}
                </div>
              `}

              <div class="ludo-status-banner">
                ${$(F.lastActionText||"Match in progress.")}
              </div>
            </div>
          </div>

          <!-- Token Progress Strip for all active players -->
          <div class="ludo-progress-strip">
            ${V.map(I=>{const ee=te.find(Ke=>Ke.color===I),he=H(I),Le={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[I];return`
                <div class="progress-pill ${I} ${Qe===I?"active-turn":""}">
                  <strong>${Le} ${ee?$(ee.name):I.toUpperCase()}:</strong>
                  ${he.map((Ke,rt)=>`P${rt+1}: ${Z(Ke)}`).join(" · ")}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function ue(X,ge,J){var we;g.querySelector("#btn-close-arena").onclick=A;const F=g.querySelector("#btn-arena-resign");F&&(F.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{F.disabled=!0,await $e(`/bonding/matches/${u}/action`,{action:"resign"}),await L(),W()}catch(oe){S(oe.message||"Resign failed","error"),F.disabled=!1}});const V=g.querySelector("#btn-arena-draw");V&&(V.onclick=async()=>{try{await $e(`/bonding/matches/${u}/action`,{action:"offer_draw"}),S("Draw offer sent to opponent","info"),await L(),W()}catch(oe){S(oe.message||"Draw offer failed","error")}});const te=g.querySelector("#btn-confirm-accept-draw");te&&(te.onclick=async()=>{try{await $e(`/bonding/matches/${u}/action`,{action:"accept_draw"}),S("Draw agreed!","info"),await L(),W()}catch(oe){S(oe.message,"error")}});const R=g.querySelector("#btn-confirm-decline-draw");R&&(R.onclick=async()=>{try{await $e(`/bonding/matches/${u}/action`,{action:"decline_draw"}),await L(),W()}catch(oe){S(oe.message,"error")}}),[g.querySelector("#btn-arena-delete-match"),g.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(oe=>{oe.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{oe.disabled=!0,await Ye(`/bonding/matches/${u}`),S("Match deleted","success"),A(),s==="lounge_games"&&await l()}catch(me){S(me.message||"Failed to delete match","error"),oe.disabled=!1}}});const ie=g.querySelector("#btn-arena-rematch-action");if(ie&&(ie.onclick=async()=>{try{ie.disabled=!0,ie.textContent="Creating Rematch...";const oe=await $e(`/bonding/matches/${u}/action`,{action:"rematch"});oe.match&&(S("Rematch created! New match live ⚔️","success"),E&&clearInterval(E),O(oe.match._id))}catch(oe){S(oe.message||"Rematch failed","error"),ie.disabled=!1,ie.textContent="🔄 Request Rematch"}}),a.gameType==="chess"&&X&&a.status==="active"){const oe=((we=a.gameState)==null?void 0:we.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",me=new va(oe),Se=J.assignedRole==="white"?"w":"b";g.querySelectorAll(".chess-sq").forEach(Ae=>{Ae.onclick=async()=>{const Ce=Ae.dataset.square;if(w){if(w===Ce){w=null,x=[],W();return}if(x.includes(Ce)){const tt=me.get(w);let Ge;tt&&tt.type==="p"&&(Ce.endsWith("8")||Ce.endsWith("1"))&&(Ge=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const Be={from:w,to:Ce,promotion:Ge?Ge.toLowerCase():void 0};w=null,x=[],a=await $e(`/bonding/matches/${u}/move`,{move:Be}),W()}catch(Be){S(Be.message||"Illegal chess move","error"),w=null,x=[],W()}return}}const Qe=me.get(Ce);Qe&&Qe.color===Se?(w=Ce,x=me.moves({square:Ce,verbose:!0}).map(Ge=>Ge.to),W()):(w=null,x=[],W())}})}if(a.gameType==="tictactoe"&&X&&a.status==="active"&&g.querySelectorAll(".ttt-cell.empty").forEach(oe=>{oe.onclick=async()=>{const me=oe.dataset.cellIdx;try{oe.style.opacity="0.5",a=await $e(`/bonding/matches/${u}/move`,{cellIndex:Number(me)}),W()}catch(Se){S(Se.message||"Invalid move","error")}}}),a.gameType==="ludo"&&a.status==="active"){const oe=g.querySelector("#btn-ludo-roll");oe&&X&&(oe.onclick=async()=>{try{oe.disabled=!0,oe.textContent="Rolling 🎲...",a=await $e(`/bonding/matches/${u}/move`,{action:"roll"}),W()}catch(me){S(me.message||"Failed to roll","error"),oe.disabled=!1,oe.textContent="🎲 Roll Dice"}}),X&&g.querySelectorAll(".ludo-token.movable").forEach(me=>{me.onclick=async Se=>{Se.stopPropagation();const Ae=me.dataset.tokenId;try{me.style.opacity="0.5",a=await $e(`/bonding/matches/${u}/move`,{action:"move",tokenId:Number(Ae)}),W()}catch(Ce){S(Ce.message||"Invalid token move","error"),me.style.opacity="1"}}})}}W()}function T(){if(!o||o.type==="direct")return;const u=i.querySelector("#bonding-modals-root"),g=U=>U==="employee"||U==="admin"||U==="superadmin",a=o.members||[],w=new Set(a.map(U=>{var G;return(G=U.userId)==null?void 0:G.toString()})),x=b.filter(U=>g(U.role)&&!w.has(U._id.toString()));u.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${$(o.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${x.map(U=>`
                    <option value="${U._id}">${$(U.name)} (${$(U.role==="superadmin"?"Superadmin":U.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${x.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${x.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${a.length}):</label>
              <div class="bonding-members-list">
                ${a.map(U=>{const G=(e==null?void 0:e._id)||(e==null?void 0:e.id),M=G&&U.userId&&U.userId.toString()===G.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(U.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${$(U.name)} ${M?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${$(U.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${U.userId}" data-name="${$(U.name)}">
                          ${M?"Leave Group":"Remove"}
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""};const L=u.querySelector("#btn-modal-delete-group");L&&(L.onclick=()=>{u.innerHTML="",B()});const A=u.querySelector("#btn-submit-add-member");A&&(A.onclick=async()=>{const G=u.querySelector("#sel-add-colleague").value;if(!G){S("Please select a colleague to add","warning");return}try{A.disabled=!0,A.textContent="Adding...";const M=await Wt(`/bonding/channels/${o._id}/members`,{action:"add",userIds:[G]});S("Colleague added to group! 🎉","success"),o=M.channel,u.innerHTML="",await Te(o._id),De()}catch(M){S(M.message||"Failed to add member","error"),A.disabled=!1,A.textContent="Add to Group"}}),u.querySelectorAll(".btn-remove-member").forEach(U=>{U.onclick=async()=>{const G=U.dataset.userId,M=U.dataset.name;if(confirm(`Are you sure you want to remove ${M} from this group?`))try{U.disabled=!0;const ue=await Wt(`/bonding/channels/${o._id}/members`,{action:"remove",userId:G});S(`${M} removed from group`,"info"),o=ue.channel,u.innerHTML="",await Te(o._id),De()}catch(ue){S(ue.message||"Failed to remove member","error"),U.disabled=!1}}})}async function B(){if(!o||o.type==="direct")return;const u=o.name;if(confirm(`Are you sure you want to delete the group "${u}"?

All messages in this lounge will be deleted.`))try{await Ye(`/bonding/channels/${o._id}`),S(`Group "${u}" deleted successfully`,"success"),d=await Re("/bonding/channels").catch(()=>[]),o=d.find(a=>a.type==="group")||d[0]||null,Fe(),De(),o&&await Te(o._id)}catch(a){S(a.message||"Failed to delete group","error")}}function z(){const u=i.querySelector("#bonding-modals-root"),g=x=>x==="employee"||x==="admin"||x==="superadmin",a=b.filter(x=>!x.isSelf&&g(x.role));u.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${a.map(x=>`
                <div class="bonding-user-pick-item" data-user-id="${x._id}" data-name="${$(x.name)}">
                  <div class="bonding-member-avatar">${x.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${$(x.name)}</span>
                    <span class="user-pick-role">${$(x.role==="superadmin"?"Superadmin":x.role==="admin"?"Admin":"Employee")} · ${$(x.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelectorAll(".bonding-user-pick-item").forEach(x=>{x.onclick=async()=>{const L=x.dataset.userId;try{const A=await $e("/bonding/channels",{type:"direct",targetUserId:L});u.innerHTML="",d=await Re("/bonding/channels"),o=d.find(W=>W._id===A._id)||A,Fe(),De(),await Te(o._id)}catch(A){S(A.message||"Failed to open personal chat","error")}}})}function h(){const u=i.querySelector("#bonding-modals-root"),g=A=>A==="employee"||A==="admin"||A==="superadmin",a=b.filter(A=>!A.isSelf&&g(A.role));u.innerHTML=`
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
                ${a.map(A=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${A._id}" />
                    <span>${$(A.name)} (${$(A.role==="superadmin"?"Superadmin":A.role==="admin"?"Admin":"Employee")})</span>
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelector("#btn-cancel-create-grp").onclick=()=>{u.innerHTML=""};let w="👥";const x=u.querySelectorAll(".avatar-opt");x.forEach(A=>{A.onclick=()=>{x.forEach(W=>W.classList.remove("active")),A.classList.add("active"),w=A.textContent.trim()}});const L=u.querySelector("#btn-confirm-create-grp");L.onclick=async()=>{const A=u.querySelector("#new-group-name"),W=u.querySelector("#new-group-desc"),U=A.value.trim();if(!U){S("Please enter a group name","warning"),A.focus();return}const G=u.querySelectorAll(".new-group-member-chk:checked"),M=Array.from(G).map(ue=>ue.value);try{L.disabled=!0,L.textContent="Creating...";const ue=await $e("/bonding/channels",{type:"group",name:U,description:W.value.trim(),avatar:w,memberIds:M});S(`Group "${U}" created! 🎉`,"success"),u.innerHTML="",d=await Re("/bonding/channels"),o=d.find(X=>X._id===ue._id)||ue,Fe(),De(),await Te(o._id)}catch(ue){S(ue.message||"Failed to create group","error"),L.disabled=!1,L.textContent="Create Group 🎉"}}}function le(u,g){const a=document.querySelector(".bonding-emoji-popup");a&&a.remove();const w=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],x=document.createElement("div");x.className="bonding-emoji-popup",x.innerHTML=w.map(W=>`<button class="emoji-opt-btn" data-e="${W}">${W}</button>`).join("");const L=u.getBoundingClientRect();x.style.top=`${L.bottom+window.scrollY+6}px`,x.style.left=`${L.left+window.scrollX}px`,document.body.appendChild(x),x.querySelectorAll(".emoji-opt-btn").forEach(W=>{W.onclick=U=>{U.stopPropagation(),g(W.dataset.e),x.remove()}});const A=W=>{x.contains(W.target)||(x.remove(),document.removeEventListener("click",A))};setTimeout(()=>document.addEventListener("click",A),10)}function de(u){if(!u)return"";try{return new Date(u).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Ya(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}const da=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],yt=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Tt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ei(i,t={}){const{userRole:e="employee",currentUser:s=null,initialTicketId:d=null}=t,o=e==="superadmin"||e==="admin";if(e==="client"||s&&s.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let b=[],n={},k=[],P=[],_={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",myIssuesOnly:!1},j=null,E="comments",Y=!1;i.innerHTML=`
    <div class="jira-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="jira-header-bar">
        <div class="jira-header-left">
          <div class="jira-breadcrumb">
            <span class="jira-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${o?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="jira-title-row">
            <h2 class="jira-main-title">🎫 ${o?"Support Tickets Board":"My Support Tickets"}</h2>
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
            ${yt.map(r=>`<option value="${r.key}">${r.icon} ${r.label}</option>`).join("")}
          </select>

          ${o?`
            <select id="jira-filter-assignee" class="jira-filter-select">
              <option value="all">Assignee: All</option>
              <option value="unassigned">Unassigned</option>
            </select>

            <button type="button" class="jira-pill-filter" id="jira-pill-my-issues">
              Only My Issues
            </button>
          `:`
            <span style="font-size:12px;font-weight:600;color:#94a3b8;background:#1e293b;padding:6px 12px;border-radius:6px;border:1px solid #334155;display:inline-flex;align-items:center;gap:6px;">
              👤 Assigned to You
            </span>
          `}

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
  `,await Promise.all([Ie(),ve(),ot(),nt()]),Te(),Fe(),st(),Ze(),d&&et(d);const Q=setInterval(()=>{if(!document.contains(i)){clearInterval(Q);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!j&&be()},12e3),ke=()=>{document.contains(i)&&!j&&be()};window.addEventListener("focus",ke);async function ve(){try{const r=new URLSearchParams;_.search&&r.set("search",_.search),_.priority!=="all"&&r.set("priority",_.priority),_.category!=="all"&&r.set("category",_.category),_.assigneeId!=="all"&&r.set("assigneeId",_.assigneeId),_.myIssuesOnly&&r.set("myIssuesOnly","true");const l=await Re("/tickets?"+r.toString());b=Array.isArray(l)?l:[]}catch(r){S(r.message||"Failed to load tickets",!0),b=[]}}async function Ie(){try{n=await Re("/tickets/stats")}catch(r){console.warn("Could not fetch ticket stats:",r)}}async function ot(){try{k=(await Re("/users")||[]).filter(l=>l.active&&l.role!=="client")}catch(r){console.warn("Could not fetch employees:",r)}}async function nt(){try{const r=await Re("/jobs?limit=50");P=Array.isArray(r)?r:(r==null?void 0:r.jobs)||[]}catch(r){console.warn("Could not fetch jobs:",r)}}function Te(){const r=i.querySelector("#jira-stats-root");r&&(r.innerHTML=`
      <div class="jira-stat-card ${_.status==="all"&&!_.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="jira-stat-val">${n.total||0}</span>
        <span class="jira-stat-lbl">Total Tickets</span>
      </div>
      <div class="jira-stat-card ${_.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="jira-stat-val">${n.toDo||0}</span>
        <span class="jira-stat-lbl">To Do</span>
      </div>
      <div class="jira-stat-card content ${_.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="jira-stat-val">${n.content??(n.inProgress||0)}</span>
        <span class="jira-stat-lbl">Content</span>
      </div>
      <div class="jira-stat-card design ${_.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="jira-stat-val">${n.design||0}</span>
        <span class="jira-stat-lbl">Design</span>
      </div>
      <div class="jira-stat-card review ${_.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="jira-stat-val">${n.underReview||0}</span>
        <span class="jira-stat-lbl">Under Review</span>
      </div>
      <div class="jira-stat-card ready ${_.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
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
    `,r.querySelectorAll(".jira-stat-card").forEach(l=>{l.onclick=async()=>{const y=l.dataset.statFilter;y==="all"?(_.status="all",_.priority="all"):y==="critical"?(_.priority="Critical",_.status="all"):(_.status=y,_.priority="all"),await be()}}))}function st(){const r=i.querySelector("#jira-filter-assignee");r&&(r.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${k.map(l=>`
          <option value="${l._id}" ${_.assigneeId===l._id.toString()?"selected":""}>
            ${$(l.name)} (${$(l.role)})
          </option>
        `).join("")}
      `)}function Fe(){const r=i.querySelector("#jira-board-columns-root");if(!r)return;const l={};da.forEach(y=>{l[y.key]=[]}),b.forEach(y=>{let q=y.status||"To Do";q==="In Progress"?q="Content":q==="Resolved"?q="Under Review":q==="Closed"&&(q="Ready to Leave"),l[q]||(l[q]=[]),l[q].push(y)}),r.innerHTML=da.map(y=>{const q=l[y.key]||[];return`
        <div class="jira-board-column" data-status="${y.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${$(y.label)}</span>
              <span class="jira-col-badge">${q.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${y.key}">
            ${q.length===0?`
              <div style="padding:28px 10px;text-align:center;color:#475569;font-size:12px;font-style:italic;">
                No tickets
              </div>
            `:q.map(K=>ht(K)).join("")}
          </div>
        </div>
      `}).join(""),De(),Xe()}function ht(r){var z;const l=yt.find(h=>h.key===r.category)||yt[0],y=Tt.find(h=>h.key===r.priority)||Tt[2],q=r.dueDate&&new Date(r.dueDate)<new Date&&r.status!=="Ready to Leave"&&r.status!=="Closed",K=(r.subtasks||[]).filter(h=>h.completed).length,O=(r.subtasks||[]).length,T=((z=r.assignee)==null?void 0:z.name)||"Unassigned",B=(T==="Unassigned"?"?":T.slice(0,1)).toUpperCase();return`
      <div class="jira-card" draggable="true" data-ticket-id="${r._id}">
        <div class="jira-card-top">
          <span class="jira-category-pill ${l.slug}">
            ${l.icon} ${l.label}
          </span>
          ${r.dueDate?`
            <span class="jira-due-pill ${q?"overdue":""}" title="Due Date">
              ${q?"⚠️ ":"📅 "}
              ${new Date(r.dueDate).toISOString().slice(0,10)}
            </span>
          `:""}
        </div>

        <div class="jira-card-title" title="${$(r.title)}">
          ${$(r.title)}
        </div>

        <div class="jira-card-bottom">
          <div class="jira-card-id-row">
            <span class="jira-pri-icon" title="Priority: ${y.label}">${y.icon}</span>
            <span class="jira-ticket-id">${$(r.ticketId)}</span>
          </div>

          <div class="jira-card-assignee-row">
            ${O>0?`
              <span class="jira-subtask-badge" title="${K} of ${O} subtasks completed">
                ☑ ${K}/${O}
              </span>
            `:""}
            <div class="jira-avatar ${T==="Unassigned"?"unassigned":""}" title="Assignee: ${$(T)}">
              ${B}
            </div>
          </div>
        </div>
      </div>
    `}function De(){const r=i.querySelectorAll(".jira-card"),l=i.querySelectorAll(".jira-board-column");r.forEach(y=>{y.ondragstart=q=>{q.dataTransfer.setData("text/plain",y.dataset.ticketId),y.classList.add("dragging")},y.ondragend=()=>{y.classList.remove("dragging")}}),l.forEach(y=>{y.ondragover=q=>{q.preventDefault(),y.classList.add("drag-over")},y.ondragleave=()=>{y.classList.remove("drag-over")},y.ondrop=async q=>{q.preventDefault(),y.classList.remove("drag-over");const K=q.dataTransfer.getData("text/plain"),O=y.dataset.status;if(!K||!O)return;const T=b.find(z=>z._id.toString()===K);if(!T||T.status===O)return;const B=T.status;T.status=O,Fe();try{const z=await Je(`/tickets/${K}/status`,{status:O});S(`Moved ${z.ticketId} to ${O}`,!1),await be()}catch(z){S(z.message||"Status update failed",!0),T.status=B,await be()}}})}function Xe(){i.querySelectorAll(".jira-card").forEach(r=>{r.onclick=l=>{if(l.target.tagName==="A")return;const y=r.dataset.ticketId;et(y)}})}function Ze(){const r=i.querySelector("#btn-jira-refresh");r&&(r.onclick=async()=>{r.classList.add("pulse"),await be(),S("Board updated",!1),r.classList.remove("pulse")});const l=i.querySelector("#btn-jira-create-ticket");l&&(l.onclick=()=>{D()});const y=i.querySelector("#jira-search-input");let q=null;y&&(y.oninput=h=>{clearTimeout(q),q=setTimeout(async()=>{_.search=h.target.value.trim(),Ne(),await be()},300)});const K=i.querySelector("#jira-filter-priority");K&&(K.onchange=async h=>{_.priority=h.target.value,Ne(),await be()});const O=i.querySelector("#jira-filter-category");O&&(O.onchange=async h=>{_.category=h.target.value,Ne(),await be()});const T=i.querySelector("#jira-filter-assignee");T&&(T.onchange=async h=>{_.assigneeId=h.target.value,Ne(),await be()});const B=i.querySelector("#jira-pill-my-issues");B&&(B.onclick=async()=>{_.myIssuesOnly=!_.myIssuesOnly,B.classList.toggle("active",_.myIssuesOnly),Ne(),await be()});const z=i.querySelector("#jira-clear-filters");z&&(z.onclick=async()=>{_={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",myIssuesOnly:!1},y&&(y.value=""),K&&(K.value="all"),O&&(O.value="all"),T&&(T.value="all"),B&&B.classList.remove("active"),Ne(),await be()})}function Ne(){const r=i.querySelector("#jira-clear-filters");if(!r)return;const l=_.search||_.priority!=="all"||_.category!=="all"||_.assigneeId!=="all"||_.myIssuesOnly;r.style.display=l?"inline":"none"}async function be(){await ve(),Fe()}async function et(r){const l=i.querySelector("#jira-modals-root");if(l){l.innerHTML=`
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{j=await Re(`/tickets/${r}`)}catch(y){S(y.message||"Could not load ticket",!0),l.innerHTML="";return}ye()}}function ye(){var pe,u,g;const r=i.querySelector("#jira-modals-root");if(!r||!j)return;const l=j,y=yt.find(a=>a.key===l.category)||yt[0];Tt.find(a=>a.key===l.priority)||Tt[2];const q=l.subtasks||[],K=q.filter(a=>a.completed).length,O=q.length>0?Math.round(K/q.length*100):0,T=l.attachments||[],B=l.comments||[],z=(l.history||[]).slice().reverse(),h=l.workLogs||[],le=l.linkedTickets||[],de=(s==null?void 0:s._id)||(s==null?void 0:s.id),fe=l.reporter&&l.reporter.userId&&l.reporter.userId.toString()===(de==null?void 0:de.toString()),ce=e==="superadmin"||e==="admin";r.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${y.slug}">${y.icon} ${y.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${$(l.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${$(l.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Description</span>
                  <button type="button" class="jira-tool-btn" id="btn-toggle-desc-edit">
                    ${Y?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${Y?`
                  <div class="jira-editor-toolbar">
                    <button type="button" class="jira-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="jira-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="jira-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="jira-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${$(l.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${l.description?$(l.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Attachments Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Attachments (${T.length})</span>
                  <label class="btn-jira-secondary" style="font-size:11px;padding:4px 8px;cursor:pointer;">
                    📎 Upload File
                    <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                  </label>
                </div>

                ${T.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload screenshots, logs, or briefs.</div>
                `:`
                  <div class="jira-attachments-grid">
                    ${T.map(a=>`
                      <div class="jira-att-card">
                        <div class="jira-att-left">
                          <span>📎</span>
                          <a href="${a.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${$(a.name)}">
                            ${$(a.name)}
                          </a>
                        </div>
                        <button type="button" class="jira-att-del btn-del-att" data-att-id="${a.id}" title="Delete file">&times;</button>
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>

              <!-- Subtasks Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Subtasks (${K}/${q.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${O}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${O}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${q.map(a=>`
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${a.id}" ${a.completed?"checked":""} />
                        <span class="jira-subtask-title ${a.completed?"done":""}">${$(a.title)}</span>
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
                  <span>Linked Work Items (${le.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${le.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${le.map(a=>`
                      <div class="jira-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${$(a.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${$(a.ticketId)}</span>
                          <span style="font-size:12.5px;color:#f1f5f9;">${$(a.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${$(a.status||"Open")}</span>
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

              <!-- Activity Tabs Section -->
              <div class="jira-section-block" style="margin-top:10px;">
                <div class="jira-sec-title">Activity</div>
                <div class="jira-activity-tabs">
                  <button type="button" class="jira-act-tab ${E==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${B.length})
                  </button>
                  <button type="button" class="jira-act-tab ${E==="history"?"active":""}" data-act-tab="history">
                    History (${z.length})
                  </button>
                  <button type="button" class="jira-act-tab ${E==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${h.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${E==="comments"?`
                  <div class="jira-comments-feed">
                    ${B.map(a=>`
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(a.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${$(a.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${$(a.userRole)})</span></span>
                            <span class="jira-comment-time">${ea(a.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${$(a.content)}</div>
                        </div>
                      </div>
                    `).join("")}

                    <!-- Add Comment Composer -->
                    <div class="jira-comment-composer">
                      <div class="jira-avatar" style="background:#3b82f6;">
                        ${((s==null?void 0:s.name)||"U").slice(0,1).toUpperCase()}
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
                ${E==="history"?`
                  <div class="jira-history-feed">
                    ${z.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:z.map(a=>`
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(a.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${$(a.userName)}</span>
                            <span class="jira-comment-time">${ea(a.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong style="color:#cbd5e1;">${$(a.field)}</strong>:
                            ${a.from?`<span style="text-decoration:line-through;color:#ef4444;">${$(a.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${$(a.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${E==="worklog"?`
                  <div class="jira-worklog-feed">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${l.loggedHours||0} hrs</strong></span>
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

                    ${h.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:h.map(a=>`
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(a.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${$(a.userName)} logged <strong style="color:#38bdf8;">${$(a.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${ea(a.loggedAt)}</span>
                          </div>
                          ${a.description?`<div style="font-size:12px;color:#cbd5e1;">${$(a.description)}</div>`:""}
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
                  ${da.map(a=>{let w=l.status||"To Do";return w==="In Progress"?w="Content":w==="Resolved"?w="Under Review":w==="Closed"&&(w="Ready to Leave"),`
                      <option value="${a.key}" ${w===a.key?"selected":""}>
                        ${a.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${Tt.map(a=>`
                    <option value="${a.key}" ${l.priority===a.key?"selected":""}>
                      ${a.icon} ${a.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignee -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Assignee</span>
                <select id="sel-detail-assignee" class="jira-select-field">
                  <option value="">Unassigned</option>
                  ${k.map(a=>`
                    <option value="${a._id}" ${l.assignee&&l.assignee.userId&&l.assignee.userId.toString()===a._id.toString()?"selected":""}>
                      ${$(a.name)} (${$(a.role)})
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Reporter (Read Only) -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Reporter</span>
                <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                  <div class="jira-avatar" style="background:#2563eb;">
                    ${(((pe=l.reporter)==null?void 0:pe.name)||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${$(((u=l.reporter)==null?void 0:u.name)||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${$(((g=l.reporter)==null?void 0:g.role)||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${yt.map(a=>`
                    <option value="${a.key}" ${l.category===a.key?"selected":""}>
                      ${a.icon} ${a.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="jira-date-field" value="${l.dueDate?new Date(l.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="jira-select-field">
                  <option value="">None (Workspace General)</option>
                  ${P.map(a=>`
                    <option value="${a._id}" ${l.jobId&&l.jobId.toString()===a._id.toString()?"selected":""}>
                      📁 ${$(a.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${l.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" value="${l.estimatedHours||0}" style="width:45px;background:#1e293b;border:1px solid #334155;color:#f8fafc;padding:2px 4px;border-radius:4px;font-size:12px;" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(l.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(l.updatedAt).toLocaleString()}</div>
                ${l.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(l.resolvedAt).toLocaleString()}</div>`:""}
              </div>

              <!-- Actions (Delete) -->
              ${ce||fe?`
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
    `,c()}function c(){const r=i.querySelector("#jira-modals-root");if(!r||!j)return;const l=r.querySelector("#btn-close-jira-modal");l&&(l.onclick=C);const y=r.querySelector("#jira-detail-backdrop");y&&(y.onclick=R=>{R.target===y&&C()});const q=r.querySelector("#inp-detail-title");q&&(q.onchange=async()=>{const R=q.value.trim();if(R)try{j=await Je(`/tickets/${j._id}`,{title:R}),await be()}catch(H){S(H.message||"Failed to update title",!0)}});const K=r.querySelector("#btn-toggle-desc-edit");K&&(K.onclick=()=>{Y=!Y,ye()});const O=r.querySelector("#btn-cancel-desc");O&&(O.onclick=()=>{Y=!1,ye()});const T=r.querySelector("#btn-save-desc");T&&(T.onclick=async()=>{var H;const R=(H=r.querySelector("#inp-detail-desc"))==null?void 0:H.value;try{j=await Je(`/tickets/${j._id}`,{description:R}),Y=!1,ye(),await be(),S("Description saved",!1)}catch(ie){S(ie.message||"Failed to save description",!0)}});const B=r.querySelector("#sel-detail-status");B&&(B.onchange=async R=>{try{const H=await Je(`/tickets/${j._id}/status`,{status:R.target.value});j=H,ye(),await Ie(),Te(),await be(),S(`Status changed to ${H.status}`,!1)}catch(H){S(H.message||"Status change failed",!0)}});const z=r.querySelector("#sel-detail-priority");z&&(z.onchange=async R=>{try{j=await Je(`/tickets/${j._id}`,{priority:R.target.value}),ye(),await be()}catch(H){S(H.message,!0)}});const h=r.querySelector("#sel-detail-assignee");h&&(h.onchange=async R=>{var H;try{const ie=await Je(`/tickets/${j._id}`,{assigneeId:R.target.value||null});j=ie,ye(),await be(),S(`Assigned to ${((H=ie.assignee)==null?void 0:H.name)||"Unassigned"}`,!1)}catch(ie){S(ie.message,!0)}});const le=r.querySelector("#sel-detail-category");le&&(le.onchange=async R=>{try{j=await Je(`/tickets/${j._id}`,{category:R.target.value}),ye(),await be()}catch(H){S(H.message,!0)}});const de=r.querySelector("#inp-detail-duedate");de&&(de.onchange=async R=>{try{j=await Je(`/tickets/${j._id}`,{dueDate:R.target.value||null}),ye(),await be()}catch(H){S(H.message,!0)}});const fe=r.querySelector("#sel-detail-job");fe&&(fe.onchange=async R=>{try{j=await Je(`/tickets/${j._id}`,{jobId:R.target.value||null}),ye(),await be()}catch(H){S(H.message,!0)}});const ce=r.querySelector("#inp-detail-esthours");ce&&(ce.onchange=async R=>{try{j=await Je(`/tickets/${j._id}`,{estimatedHours:Number(R.target.value)||0})}catch(H){S(H.message,!0)}}),r.querySelectorAll(".cb-subtask-toggle").forEach(R=>{R.onchange=async()=>{const H=R.dataset.subtaskId;try{j=await Je(`/tickets/${j._id}/subtasks/${H}`,{completed:R.checked}),ye(),await be()}catch(ie){S(ie.message,!0)}}}),r.querySelectorAll(".btn-del-subtask").forEach(R=>{R.onclick=async()=>{const H=R.dataset.subtaskId;try{j=await Ye(`/tickets/${j._id}/subtasks/${H}`),ye(),await be()}catch(ie){S(ie.message,!0)}}});const pe=r.querySelector("#inp-new-subtask"),u=r.querySelector("#btn-add-subtask"),g=async()=>{const R=pe==null?void 0:pe.value.trim();if(R)try{j=await $e(`/tickets/${j._id}/subtasks`,{title:R}),ye(),await be()}catch(H){S(H.message,!0)}};u&&(u.onclick=g),pe&&(pe.onkeydown=R=>{R.key==="Enter"&&(R.preventDefault(),g())});const a=r.querySelector("#inp-detail-att-upload");a&&(a.onchange=async R=>{const H=Array.from(R.target.files);if(!H.length)return;S("Uploading attachment(s)...",!1);const ie=[];for(const we of H){const oe=new FileReader;await new Promise(me=>{oe.onload=async()=>{try{const Se=oe.result.split(",")[1],Ae=await $e("/upload",{files:[{name:we.name,data:Se,size:we.size,type:we.type}]});Ae&&Ae.files&&Ae.files[0]&&ie.push({name:Ae.files[0].name||we.name,url:Ae.files[0].url,size:we.size,type:we.type})}catch(Se){console.warn("Upload error for file:",we.name,Se)}me()},oe.readAsDataURL(we)})}if(ie.length)try{j=await $e(`/tickets/${j._id}/attachments`,{attachments:ie}),ye(),S("File(s) attached successfully",!1)}catch(we){S(we.message||"Failed to attach file(s)",!0)}}),r.querySelectorAll(".btn-del-att").forEach(R=>{R.onclick=async()=>{const H=R.dataset.attId;try{j=await Ye(`/tickets/${j._id}/attachments/${H}`),ye()}catch(ie){S(ie.message,!0)}}}),r.querySelectorAll(".jira-act-tab").forEach(R=>{R.onclick=()=>{E=R.dataset.actTab,ye()}});const w=r.querySelector("#inp-new-comment"),x=r.querySelector("#btn-submit-comment");x&&w&&(x.onclick=async()=>{const R=w.value.trim();if(R)try{x.disabled=!0,x.textContent="Saving...",j=await $e(`/tickets/${j._id}/comments`,{content:R}),ye(),S("Comment added",!1)}catch(H){S(H.message||"Failed to add comment",!0)}finally{x.disabled=!1}});const L=r.querySelector("#btn-open-link-dialog"),A=r.querySelector("#jira-link-box"),W=r.querySelector("#btn-cancel-link"),U=r.querySelector("#btn-submit-link"),G=r.querySelector("#inp-link-target"),M=r.querySelector("#sel-link-rel");L&&A&&(L.onclick=()=>{A.style.display="block"}),W&&A&&(W.onclick=()=>{A.style.display="none"}),U&&A&&(U.onclick=async()=>{const R=G==null?void 0:G.value.trim(),H=(M==null?void 0:M.value)||"relates to";if(R)try{U.disabled=!0,j=await $e(`/tickets/${j._id}/links`,{targetTicketId:R,relationship:H}),ye(),S(`Linked with ${R}`,!1)}catch(ie){S(ie.message||"Failed to link ticket",!0)}finally{U.disabled=!1}}),r.querySelectorAll(".btn-del-link").forEach(R=>{R.onclick=async()=>{const H=R.dataset.linkId;try{j=await Ye(`/tickets/${j._id}/links/${H}`),ye()}catch(ie){S(ie.message,!0)}}});const ue=r.querySelector("#btn-open-worklog-dialog"),X=r.querySelector("#jira-worklog-box"),ge=r.querySelector("#btn-cancel-worklog"),J=r.querySelector("#btn-submit-worklog"),F=r.querySelector("#inp-worklog-time"),V=r.querySelector("#inp-worklog-desc");ue&&X&&(ue.onclick=()=>{X.style.display="block"}),ge&&X&&(ge.onclick=()=>{X.style.display="none"}),J&&X&&(J.onclick=async()=>{const R=F==null?void 0:F.value.trim(),H=V==null?void 0:V.value.trim();if(!R){S("Enter time spent (e.g. 2h 30m)",!0);return}try{J.disabled=!0,j=await $e(`/tickets/${j._id}/worklogs`,{timeSpent:R,description:H}),ye(),S("Work logged",!1)}catch(ie){S(ie.message||"Failed to log work",!0)}finally{J.disabled=!1}});const te=r.querySelector("#btn-delete-ticket");te&&(te.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${j.ticketId}?`))try{te.disabled=!0,await Ye(`/tickets/${j._id}`),S(`Ticket ${j.ticketId} deleted`,!1),C(),await Ie(),Te(),await be()}catch(R){S(R.message||"Failed to delete ticket",!0),te.disabled=!1}})}function C(){j=null,Y=!1;const r=i.querySelector("#jira-modals-root");r&&(r.innerHTML="")}function D(){const r=i.querySelector("#jira-modals-root");if(!r)return;r.innerHTML=`
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
                  ${yt.map(T=>`<option value="${T.key}">${T.icon} ${T.label}</option>`).join("")}
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
                  ${o?'<option value="">Unassigned</option>':""}
                  ${k.map(T=>{const B=s&&String(s._id||s.id)===String(T._id),z=!o&&B?"selected":"";return`
                      <option value="${T._id}" ${z}>
                        ${$(T.name)} (${$(T.role)})${B?" — (You)":""}
                      </option>
                    `}).join("")}
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
                ${P.map(T=>`
                  <option value="${T._id}">
                    📁 ${$(T.title||"Untitled Job")}
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
    `;const l=()=>{r.innerHTML=""},y=r.querySelector("#btn-close-create-modal");y&&(y.onclick=l);const q=r.querySelector("#btn-cancel-create-ticket");q&&(q.onclick=l);const K=r.querySelector("#jira-create-backdrop");K&&(K.onclick=T=>{T.target===K&&l()});const O=r.querySelector("#btn-submit-create-ticket");O&&(O.onclick=async()=>{var ce,pe,u,g,a,w,x;const T=(ce=r.querySelector("#create-ticket-title"))==null?void 0:ce.value.trim(),B=(pe=r.querySelector("#create-ticket-desc"))==null?void 0:pe.value.trim(),z=((u=r.querySelector("#create-ticket-cat"))==null?void 0:u.value)||"Task",h=((g=r.querySelector("#create-ticket-pri"))==null?void 0:g.value)||"Medium",le=((a=r.querySelector("#create-ticket-assignee"))==null?void 0:a.value)||null,de=((w=r.querySelector("#create-ticket-duedate"))==null?void 0:w.value)||null,fe=((x=r.querySelector("#create-ticket-job"))==null?void 0:x.value)||null;if(!T){S("Ticket summary / title is required",!0);return}try{O.disabled=!0,O.textContent="Creating...";const L=await $e("/tickets",{title:T,description:B,category:z,priority:h,assigneeId:le,dueDate:de,jobId:fe});S(`Ticket ${L.ticketId} created! 🎫`,!1),l(),await Ie(),Te(),await be(),et(L._id)}catch(L){S(L.message||"Could not create ticket",!0),O.disabled=!1,O.textContent="Create Ticket 🚀"}})}}export{ei as a,Za as b,Xa as i};
