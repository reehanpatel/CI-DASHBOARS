var ya=Object.defineProperty;var ka=(i,t,e)=>t in i?ya(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var _e=(i,t,e)=>ka(i,typeof t!="symbol"?t+"":t,e);import{c as Re,h as S,e as $,n as Je,j as We,o as Ft,k as Wt,g as $e,t as ea}from"./api-BvDdEgqX.js";const ua={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function wa(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},ua,JSON.parse(i))}catch{}return Object.assign({},ua)}function $a(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function it(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),o=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${o}`}function Ht(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const o=e.getFullYear(),d=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${o}-${d}-${r}`}function $t(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function gt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ga(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function ta(i,t=1){const e=new Date(i+"T00:00:00"),o=e.getDay(),d=(o<t?7:0)+o-t,r=new Date(e);r.setDate(e.getDate()-d);const f=[];for(let n=0;n<7;n++){const w=new Date(r);w.setDate(r.getDate()+n);const P=w.getFullYear(),_=String(w.getMonth()+1).padStart(2,"0"),D=String(w.getDate()).padStart(2,"0");f.push(`${P}-${_}-${D}`)}return f}function Sa(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,o=t.createOscillator(),d=t.createGain();o.type="sine",o.frequency.setValueAtTime(523.25,e),o.frequency.exponentialRampToValueAtTime(783.99,e+.15),d.gain.setValueAtTime(.2,e),d.gain.exponentialRampToValueAtTime(.001,e+.35),o.connect(d),d.connect(t.destination),o.start(e),o.stop(e+.35)}catch{}}function Xa(i,t={}){const{userRole:e="employee",currentUser:o=null,onNavigate:d=null}=t,r=e==="superadmin"||e==="admin";let f=wa(),n={selectedDate:it(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ca(),w();async function w(){n.loading=!0,P();try{const c=[Re("/tasks")];r&&c.push(Re("/personnel").catch(()=>[]));const[C,j]=await Promise.all(c);n.tasks=Array.isArray(C)?C:[],j&&(n.personnelList=Array.isArray(j)?j:[])}catch(c){S("Failed to load planner tasks: "+c.message,!0)}finally{n.loading=!1,Y()}}function P(){i.innerHTML=`
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
    `}function _(c){return n.tasks.filter(C=>{var a;if(C.isDeleted===!0)return!1;if(r&&n.selectedPersonnelId!=="all"){const s=((a=C.personnelId)==null?void 0:a._id)||C.personnelId;if(String(s)!==String(n.selectedPersonnelId))return!1}const j=C.dateStr||(C.dueDate?new Date(C.dueDate).toISOString().slice(0,10):"");return j?j===c:c===it()})}function D(c,C){if(c.status==="Completed")return!1;const j=c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):"");return j?j<C:!1}function E(c,C){const j=c.length,a=c.filter(O=>O.status==="Completed").length,s=c.filter(O=>O.status==="In Progress").length,k=c.filter(O=>O.status==="Pending"||O.status==="Todo").length,L=c.filter(O=>D(O,C)).length,K=j>0?Math.round(a/j*100):0;return{total:j,completed:a,inProgress:s,pending:k,overdue:L,percent:K}}function Y(){const c=it(),C=n.selectedDate===c,j=_(n.selectedDate),a=E(j,c);i.innerHTML=`
      <div class="ci360-planner-wrap ${f.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${gt(n.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${$(f.displayName||"Daily Planner")}</h1>
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
          ${r?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${n.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${n.personnelList.map(s=>`
                  <option value="${s._id}" ${n.selectedPersonnelId===String(s._id)?"selected":""}>
                    ${$(s.name)} (${$(s.department||s.role||"Team")})
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
          ${Q(j,a)}
        </main>

      </div>
    `,Te(),st()}function Q(c,C){return n.viewMode==="weekly"?ot():n.viewMode==="report"?nt():ke(c,C)}function ke(c,C){const j=it();let a=c;if(n.filterStatus==="pending"?a=a.filter(s=>s.status==="Pending"||s.status==="Todo"):n.filterStatus==="in_progress"?a=a.filter(s=>s.status==="In Progress"):n.filterStatus==="completed"?a=a.filter(s=>s.status==="Completed"):n.filterStatus==="overdue"&&(a=a.filter(s=>D(s,j))),n.searchQuery){const s=n.searchQuery.toLowerCase();a=a.filter(k=>(k.title||"").toLowerCase().includes(s)||(k.description||"").toLowerCase().includes(s)||(k.category||"").toLowerCase().includes(s))}return a.sort((s,k)=>{if(s.status==="Completed"&&k.status!=="Completed")return 1;if(s.status!=="Completed"&&k.status==="Completed")return-1;const L={Urgent:0,High:1,Medium:2,Low:3};return(L[s.priority]||2)-(L[k.priority]||2)}),`
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
          ${a.length===0?ve():`
            <div class="ci360-task-list">
              ${a.map(s=>Ie(s,j)).join("")}
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
    `}function Ie(c,C){var L,K,O,T;const j=c.status==="Completed",a=D(c,C),s=`pri-${(c.priority||"medium").toLowerCase()}`,k=`status-${(c.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${j?"is-completed":""} ${a?"is-overdue":""}" data-id="${c._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${j?"checked":""}" data-action="toggle" data-id="${c._id}" title="${j?"Reopen task":"Mark as done"}">
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
            <span class="ci360-badge ${s}">
              <span class="badge-dot"></span>
              ${$(c.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${k}">
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
            ${a?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${r&&((L=c.personnelId)!=null&&L.name||(K=c.userId)!=null&&K.name)?`
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
    `}function ot(){const c=ta(n.selectedDate,f.weekStartsOn),C=gt(c[0]),j=gt(c[6]),a=it();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${C} – ${j}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${c.map(s=>{const k=s===a,L=s===n.selectedDate,K=_(s),O=E(K,a);return`
              <div class="ci360-day-column ${k?"is-today":""} ${L?"is-selected":""}" data-date="${s}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${s}">
                  <div class="day-name">${ga(s)}</div>
                  <div class="day-number">${new Date(s+"T00:00:00").getDate()}</div>
                  ${k?'<span class="today-pill">Today</span>':""}
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
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${s}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function nt(){const c=ta(n.selectedDate,f.weekStartsOn),C=$t(c[0]),j=$t(c[6]),a=it(),s=n.tasks.filter(B=>{if(B.isDeleted===!0)return!1;const z=B.dateStr||(B.dueDate?new Date(B.dueDate).toISOString().slice(0,10):"");return c.includes(z)}),k=s.length,L=s.filter(B=>B.status==="Completed").length,K=s.filter(B=>B.status==="In Progress").length,O=k>0?Math.round(L/k*100):0,T={Urgent:0,High:0,Medium:0,Low:0};return s.forEach(B=>{const z=B.priority||"Medium";T[z]!==void 0&&T[z]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${C} – ${j}</div>
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
            <span class="value" style="font-size:28px">${k}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${L}</span>
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
                ${c.map(B=>{const z=_(B),x=E(z,a);return`
                    <tr>
                      <td><strong>${ga(B)}</strong></td>
                      <td>${gt(B)}</td>
                      <td>${x.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${x.completed}</td>
                      <td>${x.pending+x.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${x.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${x.percent}%</span>
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
    `}function Te(){const c=document.getElementById("btnViewDaily"),C=document.getElementById("btnViewWeekly"),j=document.getElementById("btnViewReport");c&&(c.onclick=()=>{n.viewMode="daily",Y()}),C&&(C.onclick=()=>{n.viewMode="weekly",Y()}),j&&(j.onclick=()=>{n.viewMode="report",Y()});const a=document.getElementById("btnPrevDay"),s=document.getElementById("btnNextDay"),k=document.getElementById("btnJumpToday"),L=document.getElementById("hiddenDateInput"),K=document.getElementById("datePickerBadge");a&&(a.onclick=()=>{n.selectedDate=Ht(n.selectedDate,-1),Y()}),s&&(s.onclick=()=>{n.selectedDate=Ht(n.selectedDate,1),Y()}),k&&(k.onclick=()=>{n.selectedDate=it(),Y()}),K&&L&&(K.onclick=()=>{try{typeof L.showPicker=="function"?L.showPicker():L.focus()}catch{L.focus()}},L.onchange=ue=>{ue.target.value&&(n.selectedDate=ue.target.value,Y())});const O=document.getElementById("admTeamSelect");O&&(O.onchange=ue=>{n.selectedPersonnelId=ue.target.value,Y()});const T=document.getElementById("btnOpenAddTaskModal");T&&(T.onclick=()=>je());const B=document.getElementById("btnPlannerActionsMenu"),z=document.getElementById("plannerActionsDropdown");B&&z&&(B.onclick=ue=>{ue.stopPropagation(),z.classList.toggle("hidden")},document.addEventListener("click",ue=>{!z.contains(ue.target)&&ue.target!==B&&z.classList.add("hidden")}));const x=document.getElementById("btnActionImport");x&&(x.onclick=()=>{z==null||z.classList.add("hidden"),Xe()});const de=document.getElementById("btnActionExportPng");de&&(de.onclick=()=>{z==null||z.classList.add("hidden"),Ze()});const oe=document.getElementById("btnActionExportPdf");oe&&(oe.onclick=()=>{z==null||z.classList.add("hidden"),be()});const fe=document.getElementById("btnActionBackup");fe&&(fe.onclick=()=>{z==null||z.classList.add("hidden"),et()});const ce=document.getElementById("btnActionSettings");ce&&(ce.onclick=()=>{z==null||z.classList.add("hidden"),ye()})}function st(c){if(n.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(T=>{T.onclick=()=>{n.filterStatus=T.dataset.f,Y()}});const C=document.getElementById("plannerTaskSearchInp");C&&(C.oninput=T=>{n.searchQuery=T.target.value,Y()});const j=document.getElementById("btnClearSearch");j&&(j.onclick=()=>{n.searchQuery="",Y()});const a=document.getElementById("quickAddTitleInp"),s=document.getElementById("quickAddPriority"),k=document.getElementById("quickAddCategory"),L=document.getElementById("btnQuickAddSubmit"),K=async()=>{const T=((a==null?void 0:a.value)||"").trim();if(!T){S("Please enter a task title",!0),a==null||a.focus();return}try{const B={title:T,dateStr:n.selectedDate,priority:(s==null?void 0:s.value)||f.defaultPriority,category:(k==null?void 0:k.value)||"General",status:"Pending"};r&&n.selectedPersonnelId!=="all"&&(B.personnelId=n.selectedPersonnelId);const z=await $e("/tasks",B);n.tasks.unshift(z),S("Task added to today's focus! ✨"),a&&(a.value="",a.focus()),Y()}catch(B){S(B.message,!0)}};L&&(L.onclick=K),a&&(a.onkeydown=T=>{T.key==="Enter"&&K()});const O=document.getElementById("btnEmptyStateImport");O&&(O.onclick=()=>Xe())}if(n.viewMode==="weekly"){const C=document.getElementById("btnPrevWeek"),j=document.getElementById("btnNextWeek"),a=document.getElementById("btnThisWeek");C&&(C.onclick=()=>{n.selectedDate=Ht(n.selectedDate,-7),Y()}),j&&(j.onclick=()=>{n.selectedDate=Ht(n.selectedDate,7),Y()}),a&&(a.onclick=()=>{n.selectedDate=it(),Y()}),document.querySelectorAll(".day-col-header").forEach(s=>{s.onclick=()=>{n.selectedDate=s.dataset.date,n.viewMode="daily",Y()}}),document.querySelectorAll('[data-action="add-day"]').forEach(s=>{s.onclick=()=>{je(null,s.dataset.date)}})}if(n.viewMode==="report"){const C=document.getElementById("btnDownloadWeeklyPdf");C&&(C.onclick=be)}i.querySelectorAll('[data-action="toggle"]').forEach(C=>{C.onclick=async j=>{j.stopPropagation();const a=C.dataset.id;await Fe(a)}}),i.querySelectorAll('[data-action="edit"]').forEach(C=>{C.onclick=j=>{j.stopPropagation();const a=C.dataset.id,s=n.tasks.find(k=>k._id===a);s&&je(s)}}),i.querySelectorAll('[data-action="delete"]').forEach(C=>{C.onclick=async j=>{j.stopPropagation();const a=C.dataset.id;await ht(a)}})}async function Fe(c){const C=n.tasks.find(a=>a._id===c);if(!C)return;const j=C.status!=="Completed";try{const a=await Je(`/tasks/${c}/toggle`,{}),s=n.tasks.findIndex(k=>k._id===c);s!==-1&&(n.tasks[s]=a),j?(f.soundEnabled&&Sa(),S("Task marked as completed! 🎉")):S("Task reopened as pending."),Y()}catch(a){S(a.message,!0)}}async function ht(c){const C=n.tasks.find(j=>j._id===c);if(C&&confirm(`Are you sure you want to remove "${C.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await We(`/tasks/${c}`),n.tasks=n.tasks.filter(j=>j._id!==c),S("Task removed from planner (safely stored in database archive)"),Y()}catch(j){S(j.message,!0)}}function je(c=null,C=null){const j=!!c,a=c?c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):n.selectedDate):C||n.selectedDate,s=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${j?"Edit Task":"Add New Task"}</h3>
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
              <input type="date" id="taskDate" class="input" value="${a}" required>
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
                <option value="Medium" ${!c&&f.defaultPriority==="Medium"||(c==null?void 0:c.priority)==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!c&&f.defaultPriority==="High"||(c==null?void 0:c.priority)==="High"?"selected":""}>High</option>
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
          ${r?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!c||c!=null&&c.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${n.personnelList.map(B=>{var x;const z=((x=c==null?void 0:c.personnelId)==null?void 0:x._id)===B._id||(c==null?void 0:c.personnelId)===B._id;return`<option value="${B._id}" ${z?"selected":""}>${$(B.name)} (${$(B.department||B.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
            <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
              ${j?"Save Changes":"Create Task"}
            </button>
          </div>
        </form>
      </div>
    `,k=Ft(s),L=k.querySelector("#taskForm"),K=k.querySelector("#btnModalClose"),O=k.querySelector("#btnCancelModal"),T=()=>k.remove();K&&(K.onclick=T),O&&(O.onclick=T),L.onsubmit=async B=>{var p;B.preventDefault();const z=k.querySelector("#taskTitle").value.trim(),x=k.querySelector("#taskDesc").value.trim(),de=k.querySelector("#taskDate").value,oe=k.querySelector("#taskStartTime").value.trim(),fe=k.querySelector("#taskDueTime").value.trim(),ce=k.querySelector("#taskPriority").value,ue=k.querySelector("#taskStatus").value,g=k.querySelector("#taskCategory").value.trim()||"General";if(!z){S("Task title is required",!0);return}const b={title:z,description:x,dateStr:de,startTime:oe,dueTime:fe,priority:ce,status:ue,category:g};if(r){const h=(p=k.querySelector("#taskAssignee"))==null?void 0:p.value;h==="all"?(b.assignAll=!0,b.personnelId="all"):h&&(b.personnelId=h)}const l=k.querySelector("#btnSaveTask");l.disabled=!0,l.textContent="Saving...";try{if(j){const h=await Wt(`/tasks/${c._id}`,b),q=n.tasks.findIndex(A=>A._id===c._id);q!==-1&&(n.tasks[q]=h),S("Task updated successfully! ✍️")}else{const h=await $e("/tasks",b);Array.isArray(h.tasks)?h.tasks.forEach(q=>n.tasks.unshift(q)):n.tasks.unshift(h),S("Task created successfully! ✨")}T(),Y()}catch(h){S(h.message,!0),l.disabled=!1,l.textContent=j?"Save Changes":"Create Task"}}}function Xe(){let c=[];const C=`
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
    `,j=Ft(C),a=()=>j.remove();j.querySelector("#btnImportClose").onclick=a,j.querySelector("#btnCancelImport").onclick=a;const s=j.querySelector("#importTextarea"),k=j.querySelector("#importFileInput"),L=j.querySelector("#importDropzone"),K=j.querySelector("#previewListArea"),O=j.querySelector("#previewCountLabel"),T=j.querySelector("#btnConfirmImport"),B=j.querySelector("#importFileInfo");function z(de){if(!de)return[];const oe=de.split(/\r?\n/),fe=[];for(let ce of oe)ce=ce.trim(),ce&&(ce=ce.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),ce=ce.replace(/^[-*•]\s+/,""),ce=ce.replace(/^\d+[\.\)]\s+/,""),ce=ce.trim(),ce&&fe.push(ce));return fe}function x(){const de=s.value,oe=z(de),fe=j.querySelector("#importTargetDate").value,ce=_(fe),ue=new Set(ce.map(g=>(g.title||"").trim().toLowerCase()));c=[];for(const g of oe){const b=ue.has(g.toLowerCase());c.push({title:g,isDuplicate:b})}if(O.textContent=`Preview (${c.length} ${c.length===1?"task":"tasks"} found)`,T.disabled=c.length===0,T.textContent=`Import ${c.length} ${c.length===1?"Task":"Tasks"}`,c.length===0){K.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}K.innerHTML=c.map((g,b)=>`
        <div class="preview-item ${g.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${b+1}.</span>
          <span class="preview-title">${$(g.title)}</span>
          ${g.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}s.oninput=x,L.onclick=()=>k.click(),k.onchange=de=>{const oe=de.target.files[0];if(!oe)return;B.textContent=`File selected: ${oe.name} (${Math.round(oe.size/1024)} KB)`;const fe=new FileReader;fe.onload=ce=>{s.value=ce.target.result,x()},fe.readAsText(oe)},L.ondragover=de=>{de.preventDefault(),L.classList.add("dragover")},L.ondragleave=()=>L.classList.remove("dragover"),L.ondrop=de=>{de.preventDefault(),L.classList.remove("dragover");const oe=de.dataTransfer.files[0];if(oe&&(oe.type==="text/plain"||oe.name.endsWith(".txt"))){B.textContent=`File dropped: ${oe.name}`;const fe=new FileReader;fe.onload=ce=>{s.value=ce.target.result,x()},fe.readAsText(oe)}else S("Please drop a valid .txt plain-text file",!0)},T.onclick=async()=>{if(c.length===0)return;T.disabled=!0,T.textContent="Importing...";const de=j.querySelector("#importTargetDate").value,oe=j.querySelector("#importPriority").value,fe=j.querySelector("#importCategory").value.trim()||"General",ce={date:de,tasks:c.map(ue=>({title:ue.title,priority:oe,category:fe,status:"Pending"}))};r&&n.selectedPersonnelId!=="all"&&(ce.personnelId=n.selectedPersonnelId);try{const ue=await $e("/tasks/bulk-import",ce);Array.isArray(ue.tasks)&&ue.tasks.forEach(g=>n.tasks.unshift(g)),S(`Imported ${ue.importedCount} tasks successfully! (${ue.skippedCount} skipped duplicates)`),a(),n.selectedDate=de,Y()}catch(ue){S(ue.message,!0),T.disabled=!1,T.textContent="Retry Import"}}}async function Ze(){const c=_(n.selectedDate),C=E(c,it()),j=$t(n.selectedDate),a=2,s=800,k=160,L=90,K=65,O=70,T=Math.max(120,c.length*K),B=k+L+T+O,z=document.createElement("canvas");z.width=s*a,z.height=B*a;const x=z.getContext("2d");x.scale(a,a);const de=document.documentElement.getAttribute("data-theme")==="dark",oe=de?"#0F172A":"#F8FAFC",fe=de?"#1E293B":"#FFFFFF",ce=de?"#334155":"#E2E8F0",ue=de?"#F8FAFC":"#0F172A",g=de?"#94A3B8":"#475569",b="#4F46E5",l="#10B981",p="#F59E0B";x.fillStyle=oe,x.fillRect(0,0,s,B),x.fillStyle=fe,Ne(x,24,20,s-48,k-30,16),x.fill(),x.strokeStyle=ce,x.lineWidth=1,x.stroke(),x.fillStyle=b,x.font="bold 12px Inter, sans-serif",x.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),x.fillStyle=ue,x.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',x.fillText(j,44,86),x.fillStyle=g,x.font="13px Inter, sans-serif",x.fillText(`Planned focus list · ${C.completed} of ${C.total} tasks completed (${C.percent}%)`,44,114);const h=k+6;x.fillStyle=fe,Ne(x,24,h,s-48,L-16,12),x.fill(),x.stroke();const q=[{label:"TOTAL TASKS",val:String(C.total),color:ue},{label:"COMPLETED",val:String(C.completed),color:l},{label:"IN PROGRESS",val:String(C.inProgress),color:p},{label:"PENDING",val:String(C.pending),color:g},{label:"PROGRESS",val:`${C.percent}%`,color:b}],A=(s-48)/q.length;q.forEach((G,M)=>{const pe=24+M*A+20;x.fillStyle=G.color,x.font="bold 20px Inter, sans-serif",x.fillText(G.val,pe,h+36),x.fillStyle=g,x.font="10px Inter, sans-serif",x.fillText(G.label,pe,h+54)});const W=h+L;x.fillStyle=fe,Ne(x,24,W,s-48,T+10,16),x.fill(),x.stroke(),c.length===0?(x.fillStyle=g,x.font="14px Inter, sans-serif",x.textAlign="center",x.fillText("No scheduled tasks recorded for this date.",s/2,W+60),x.textAlign="left"):c.forEach((G,M)=>{const pe=W+16+M*K,X=G.status==="Completed";x.beginPath(),x.arc(48,pe+14,10,0,Math.PI*2),X?(x.fillStyle=l,x.fill(),x.strokeStyle="#FFFFFF",x.lineWidth=2,x.beginPath(),x.moveTo(44,pe+14),x.lineTo(47,pe+17),x.lineTo(52,pe+11),x.stroke()):(x.strokeStyle=ce,x.lineWidth=2,x.stroke()),x.fillStyle=X?g:ue,x.font=`${X?"normal":"500"} 14px Inter, sans-serif`;const ge=G.title.length>55?G.title.slice(0,52)+"...":G.title;if(x.fillText(ge,70,pe+18),X){const R=x.measureText(ge);x.strokeStyle=g,x.lineWidth=1.2,x.beginPath(),x.moveTo(70,pe+14),x.lineTo(70+R.width,pe+14),x.stroke()}const J=G.priority||"Medium";let F="#E2E8F0",V="#334155";J==="Urgent"?(F="#FEE2E2",V="#DC2626"):J==="High"?(F="#FEF3C7",V="#D97706"):J==="Low"&&(F="#ECFDF5",V="#059669"),x.fillStyle=F,Ne(x,s-150,pe+4,60,20,10),x.fill(),x.fillStyle=V,x.font="bold 10px Inter, sans-serif",x.fillText(J,s-138,pe+18);const te=G.dueTime?`🕒 ${G.dueTime}`:G.category||"General";x.fillStyle=g,x.font="11px Inter, sans-serif",x.fillText(te,70,pe+34),M<c.length-1&&(x.strokeStyle=ce,x.lineWidth=.6,x.beginPath(),x.moveTo(40,pe+48),x.lineTo(s-40,pe+48),x.stroke())});const U=B-35;x.fillStyle=g,x.font="11px Inter, sans-serif",x.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,U);try{const G=z.toDataURL("image/png"),M=document.createElement("a");M.href=G,M.download=`ci360-daily-planner-${n.selectedDate}.png`,document.body.appendChild(M),M.click(),M.remove(),S("Daily Planner image exported! 🖼️")}catch(G){S("Failed to export image: "+G.message,!0)}}function Ne(c,C,j,a,s,k){c.beginPath(),c.moveTo(C+k,j),c.lineTo(C+a-k,j),c.quadraticCurveTo(C+a,j,C+a,j+k),c.lineTo(C+a,j+s-k),c.quadraticCurveTo(C+a,j+s,C+a-k,j+s),c.lineTo(C+k,j+s),c.quadraticCurveTo(C,j+s,C,j+s-k),c.lineTo(C,j+k),c.quadraticCurveTo(C,j,C+k,j),c.closePath()}function be(){const c=ta(n.selectedDate,f.weekStartsOn),C=$t(c[0]),j=$t(c[6]);it();const a=n.tasks.filter(T=>{if(T.isDeleted===!0)return!1;const B=T.dateStr||(T.dueDate?new Date(T.dueDate).toISOString().slice(0,10):"");return c.includes(B)}),s=a.length,k=a.filter(T=>T.status==="Completed").length,L=s>0?Math.round(k/s*100):0,K=window.open("","_blank");if(!K){S("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const O=`
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
            <div class="period">${C} – ${j}</div>
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
            <div class="kpi-num" style="color:#10b981">${k}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${s-k}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${L}%</div>
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
    `),j=()=>C.remove();C.querySelector("#btnBackupClose").onclick=j;const a=C.querySelector("#btnDownloadBackupJson");a.onclick=async()=>{a.disabled=!0,a.textContent="Generating backup...";try{const T=await Re("/tasks/backup"),B=new Blob([JSON.stringify(T,null,2)],{type:"application/json"}),z=URL.createObjectURL(B),x=document.createElement("a");x.href=z,x.download=`ci360-planner-backup-${it()}.json`,document.body.appendChild(x),x.click(),x.remove(),S("Planner backup downloaded successfully! 💾")}catch(T){S("Backup export failed: "+T.message,!0)}finally{a.disabled=!1,a.textContent="Download JSON Backup"}};const s=C.querySelector("#restoreFileInput"),k=C.querySelector("#restorePreviewArea"),L=C.querySelector("#restoreCountText"),K=C.querySelector("#btnExecuteRestore");let O=null;s.onchange=T=>{const B=T.target.files[0];if(!B)return;const z=new FileReader;z.onload=x=>{try{const de=JSON.parse(x.target.result),oe=Array.isArray(de.tasks)?de.tasks:Array.isArray(de)?de:null;if(!oe||oe.length===0){S("Invalid backup file: No tasks found",!0);return}O=oe,k.style.display="block",L.textContent=`Valid backup: ${oe.length} tasks ready to restore.`,K.disabled=!1}catch(de){S("Error parsing JSON backup file: "+de.message,!0),k.style.display="none",K.disabled=!0}},z.readAsText(B)},K.onclick=async()=>{var B;if(!O||O.length===0)return;K.disabled=!0,K.textContent="Restoring...";const T=((B=C.querySelector('input[name="restoreMode"]:checked'))==null?void 0:B.value)||"merge";try{const z=await $e("/tasks/restore",{tasks:O,mode:T});S(`Restored ${z.restoredCount} tasks! (${z.skippedCount} skipped) ✨`),j(),await w()}catch(z){S("Restore failed: "+z.message,!0),K.disabled=!1,K.textContent="Retry Restore"}}}function ye(){const c=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${$(f.displayName||"Daily Planner")}">
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
              <input type="text" id="setTimezone" class="input" value="${$(f.timezone||"Asia/Kolkata")}" readonly>
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
    `,C=Ft(c),j=()=>C.remove();C.querySelector("#btnSettingsClose").onclick=j,C.querySelector("#btnCancelSettings").onclick=j,C.querySelector("#settingsForm").onsubmit=a=>{a.preventDefault(),f.displayName=C.querySelector("#setDisplayName").value.trim()||"Daily Planner",f.weekStartsOn=Number(C.querySelector("#setWeekStart").value),f.defaultPriority=C.querySelector("#setDefaultPriority").value,f.density=C.querySelector("#setDensity").value,f.soundEnabled=C.querySelector("#setSound").checked,$a(f),S("Planner preferences saved! ⚙️"),j(),Y()}}}function Ca(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
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
  `,document.head.appendChild(i)}function _a(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function Ta(i,t,e,o,d){const r={move:i,variations:d};return t&&(r.suffix=t),e&&(r.nag=e),o!==null&&(r.comment=o),r}function Aa(...i){const[t,...e]=i;let o=t;for(const d of e)d!==null&&(o.variations=[d,...d.variations],d.variations=[],o=d);return t}function Da(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const o=e.variations[0];if(!o){e.comment=t.marker.comment;break}e=o}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function ja(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function St(i,t,e,o){var d=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(d,St.prototype),d.expected=t,d.found=e,d.location=o,d.name="SyntaxError",d}ja(St,Error);function aa(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}St.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,o;for(o=0;o<i.length;o++)if(i[o].source===this.location.source){e=i[o].text.split(/\r\n|\n|\r/g);break}var d=this.location.start,r=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(d):d,f=this.location.source+":"+r.line+":"+r.column;if(e){var n=this.location.end,w=aa("",r.line.toString().length," "),P=e[d.line-1],_=d.line===n.line?n.column:P.length+1,D=_-d.column||1;t+=`
 --> `+f+`
`+w+` |
`+r.line+" | "+P+`
`+w+" | "+aa("",d.column-1," ")+aa("",D,"^")}else t+=`
 at `+f}return t};St.buildMessage=function(i,t){var e={literal:function(P){return'"'+d(P.text)+'"'},class:function(P){var _=P.parts.map(function(D){return Array.isArray(D)?r(D[0])+"-"+r(D[1]):r(D)});return"["+(P.inverted?"^":"")+_.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(P){return P.description}};function o(P){return P.charCodeAt(0).toString(16).toUpperCase()}function d(P){return P.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(_){return"\\x0"+o(_)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(_){return"\\x"+o(_)})}function r(P){return P.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(_){return"\\x0"+o(_)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(_){return"\\x"+o(_)})}function f(P){return e[P.type](P)}function n(P){var _=P.map(f),D,E;if(_.sort(),_.length>0){for(D=1,E=1;D<_.length;D++)_[D-1]!==_[D]&&(_[E]=_[D],E++);_.length=E}switch(_.length){case 1:return _[0];case 2:return _[0]+" or "+_[1];default:return _.slice(0,-1).join(", ")+", or "+_[_.length-1]}}function w(P){return P?'"'+d(P)+'"':"end of input"}return"Expected "+n(i)+" but "+w(t)+" found."};function Ea(i,t){t=t!==void 0?t:{};var e={},o=t.grammarSource,d={pgn:qt},r=qt,f="[",n='"',w="]",P=".",_="O-O-O",D="O-O",E="0-0-0",Y="0-0",Q="$",ke="{",ve="}",Ie=";",ot="(",nt=")",Te="1-0",st="0-1",Fe="1/2-1/2",ht="*",je=/^[a-zA-Z]/,Xe=/^[^"]/,Ze=/^[0-9]/,Ne=/^[.]/,be=/^[a-zA-Z1-8\-=]/,et=/^[+#]/,ye=/^[!?]/,c=/^[^}]/,C=/^[^\r\n]/,j=/^[ \t\r\n]/,a=Ue("tag pair"),s=De("[",!1),k=De('"',!1),L=De("]",!1),K=Ue("tag name"),O=Ke([["a","z"],["A","Z"]],!1,!1),T=Ue("tag value"),B=Ke(['"'],!0,!1),z=Ue("move number"),x=Ke([["0","9"]],!1,!1),de=De(".",!1),oe=Ke(["."],!1,!1),fe=Ue("standard algebraic notation"),ce=De("O-O-O",!1),ue=De("O-O",!1),g=De("0-0-0",!1),b=De("0-0",!1),l=Ke([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),p=Ke(["+","#"],!1,!1),h=Ue("suffix annotation"),q=Ke(["!","?"],!1,!1),A=Ue("NAG"),W=De("$",!1),U=Ue("brace comment"),G=De("{",!1),M=Ke(["}"],!0,!1),pe=De("}",!1),X=Ue("rest of line comment"),ge=De(";",!1),J=Ke(["\r",`
`],!0,!1),F=Ue("variation"),V=De("(",!1),te=De(")",!1),R=Ue("game termination marker"),H=De("1-0",!1),ie=De("0-1",!1),we=De("1/2-1/2",!1),se=De("*",!1),me=Ue("whitespace"),Se=Ke([" ","	","\r",`
`],!1,!1),Ae=function(u,y){return Da(u,y)},Ce=function(u){return Object.fromEntries(u)},Qe=function(u,y){return[u,y]},tt=function(u,y){return{root:u,marker:y}},Ge=function(u,y){return Aa(_a(u),...y.flat())},Be=function(u,y,m,ae,ne){return Ta(u,y,m,ae,ne)},lt=function(u){return u},jt=function(u){return u.replace(/[\r\n]+/g," ")},Et=function(u){return u.trim()},It=function(u){return u},Pt=function(u,y){return{result:u,comment:y}},v=t.peg$currPos|0,dt=[{line:1,column:1}],He=v,ct=t.peg$maxFailExpected||[],N=t.peg$silentFails|0,pt;if(t.startRule){if(!(t.startRule in d))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');r=d[t.startRule]}function De(u,y){return{type:"literal",text:u,ignoreCase:y}}function Ke(u,y,m){return{type:"class",parts:u,inverted:y,ignoreCase:m}}function Mt(){return{type:"end"}}function Ue(u){return{type:"other",description:u}}function Ct(u){var y=dt[u],m;if(y)return y;if(u>=dt.length)m=dt.length-1;else for(m=u;!dt[--m];);for(y=dt[m],y={line:y.line,column:y.column};m<u;)i.charCodeAt(m)===10?(y.line++,y.column=1):y.column++,m++;return dt[u]=y,y}function Lt(u,y,m){var ae=Ct(u),ne=Ct(y),xe={source:o,start:{offset:u,line:ae.line,column:ae.column},end:{offset:y,line:ne.line,column:ne.column}};return xe}function Z(u){v<He||(v>He&&(He=v,ct=[]),ct.push(u))}function wt(u,y,m){return new St(St.buildMessage(u,y),u,y,m)}function qt(){var u,y,m;return u=v,y=Qt(),m=I(),u=Ae(y,m),u}function Qt(){var u,y,m;for(u=v,y=[],m=zt();m!==e;)y.push(m),m=zt();return m=qe(),u=Ce(y),u}function zt(){var u,y,m,ae,ne,xe,vt;return N++,u=v,qe(),i.charCodeAt(v)===91?(y=f,v++):(y=e,N===0&&Z(s)),y!==e?(qe(),m=Jt(),m!==e?(qe(),i.charCodeAt(v)===34?(ae=n,v++):(ae=e,N===0&&Z(k)),ae!==e?(ne=Rt(),i.charCodeAt(v)===34?(xe=n,v++):(xe=e,N===0&&Z(k)),xe!==e?(qe(),i.charCodeAt(v)===93?(vt=w,v++):(vt=e,N===0&&Z(L)),vt!==e?u=Qe(m,ne):(v=u,u=e)):(v=u,u=e)):(v=u,u=e)):(v=u,u=e)):(v=u,u=e),N--,u===e&&N===0&&Z(a),u}function Jt(){var u,y,m;if(N++,u=v,y=[],m=i.charAt(v),je.test(m)?v++:(m=e,N===0&&Z(O)),m!==e)for(;m!==e;)y.push(m),m=i.charAt(v),je.test(m)?v++:(m=e,N===0&&Z(O));else y=e;return y!==e?u=i.substring(u,v):u=y,N--,u===e&&(y=e,N===0&&Z(K)),u}function Rt(){var u,y,m;for(N++,u=v,y=[],m=i.charAt(v),Xe.test(m)?v++:(m=e,N===0&&Z(B));m!==e;)y.push(m),m=i.charAt(v),Xe.test(m)?v++:(m=e,N===0&&Z(B));return u=i.substring(u,v),N--,y=e,N===0&&Z(T),u}function I(){var u,y,m;return u=v,y=ee(),qe(),m=Zt(),m===e&&(m=null),qe(),u=tt(y,m),u}function ee(){var u,y,m,ae;for(u=v,y=ut(),y===e&&(y=null),m=[],ae=he();ae!==e;)m.push(ae),ae=he();return u=Ge(y,m),u}function he(){var u,y,m,ae,ne,xe,vt,Ot;if(u=v,qe(),Le(),qe(),y=Ve(),y!==e){for(m=rt(),m===e&&(m=null),ae=[],ne=at();ne!==e;)ae.push(ne),ne=at();for(ne=qe(),xe=ut(),xe===e&&(xe=null),vt=[],Ot=Bt();Ot!==e;)vt.push(Ot),Ot=Bt();u=Be(y,m,ae,xe,vt)}else v=u,u=e;return u}function Le(){var u,y,m,ae,ne,xe;for(N++,u=v,y=[],m=i.charAt(v),Ze.test(m)?v++:(m=e,N===0&&Z(x));m!==e;)y.push(m),m=i.charAt(v),Ze.test(m)?v++:(m=e,N===0&&Z(x));if(i.charCodeAt(v)===46?(m=P,v++):(m=e,N===0&&Z(de)),m!==e){for(ae=qe(),ne=[],xe=i.charAt(v),Ne.test(xe)?v++:(xe=e,N===0&&Z(oe));xe!==e;)ne.push(xe),xe=i.charAt(v),Ne.test(xe)?v++:(xe=e,N===0&&Z(oe));y=[y,m,ae,ne],u=y}else v=u,u=e;return N--,u===e&&(y=e,N===0&&Z(z)),u}function Ve(){var u,y,m,ae,ne,xe;if(N++,u=v,y=v,i.substr(v,5)===_?(m=_,v+=5):(m=e,N===0&&Z(ce)),m===e&&(i.substr(v,3)===D?(m=D,v+=3):(m=e,N===0&&Z(ue)),m===e&&(i.substr(v,5)===E?(m=E,v+=5):(m=e,N===0&&Z(g)),m===e&&(i.substr(v,3)===Y?(m=Y,v+=3):(m=e,N===0&&Z(b)),m===e))))if(m=v,ae=i.charAt(v),je.test(ae)?v++:(ae=e,N===0&&Z(O)),ae!==e){if(ne=[],xe=i.charAt(v),be.test(xe)?v++:(xe=e,N===0&&Z(l)),xe!==e)for(;xe!==e;)ne.push(xe),xe=i.charAt(v),be.test(xe)?v++:(xe=e,N===0&&Z(l));else ne=e;ne!==e?(ae=[ae,ne],m=ae):(v=m,m=e)}else v=m,m=e;return m!==e?(ae=i.charAt(v),et.test(ae)?v++:(ae=e,N===0&&Z(p)),ae===e&&(ae=null),m=[m,ae],y=m):(v=y,y=e),y!==e?u=i.substring(u,v):u=y,N--,u===e&&(y=e,N===0&&Z(fe)),u}function rt(){var u,y,m;for(N++,u=v,y=[],m=i.charAt(v),ye.test(m)?v++:(m=e,N===0&&Z(q));m!==e;)y.push(m),y.length>=2?m=e:(m=i.charAt(v),ye.test(m)?v++:(m=e,N===0&&Z(q)));return y.length<1?(v=u,u=e):u=y,N--,u===e&&(y=e,N===0&&Z(h)),u}function at(){var u,y,m,ae,ne;if(N++,u=v,qe(),i.charCodeAt(v)===36?(y=Q,v++):(y=e,N===0&&Z(W)),y!==e){if(m=v,ae=[],ne=i.charAt(v),Ze.test(ne)?v++:(ne=e,N===0&&Z(x)),ne!==e)for(;ne!==e;)ae.push(ne),ne=i.charAt(v),Ze.test(ne)?v++:(ne=e,N===0&&Z(x));else ae=e;ae!==e?m=i.substring(m,v):m=ae,m!==e?u=lt(m):(v=u,u=e)}else v=u,u=e;return N--,u===e&&N===0&&Z(A),u}function ut(){var u;return u=Nt(),u===e&&(u=Xt()),u}function Nt(){var u,y,m,ae,ne;if(N++,u=v,i.charCodeAt(v)===123?(y=ke,v++):(y=e,N===0&&Z(G)),y!==e){for(m=v,ae=[],ne=i.charAt(v),c.test(ne)?v++:(ne=e,N===0&&Z(M));ne!==e;)ae.push(ne),ne=i.charAt(v),c.test(ne)?v++:(ne=e,N===0&&Z(M));m=i.substring(m,v),i.charCodeAt(v)===125?(ae=ve,v++):(ae=e,N===0&&Z(pe)),ae!==e?u=jt(m):(v=u,u=e)}else v=u,u=e;return N--,u===e&&(y=e,N===0&&Z(U)),u}function Xt(){var u,y,m,ae,ne;if(N++,u=v,i.charCodeAt(v)===59?(y=Ie,v++):(y=e,N===0&&Z(ge)),y!==e){for(m=v,ae=[],ne=i.charAt(v),C.test(ne)?v++:(ne=e,N===0&&Z(J));ne!==e;)ae.push(ne),ne=i.charAt(v),C.test(ne)?v++:(ne=e,N===0&&Z(J));m=i.substring(m,v),u=Et(m)}else v=u,u=e;return N--,u===e&&(y=e,N===0&&Z(X)),u}function Bt(){var u,y,m,ae;return N++,u=v,qe(),i.charCodeAt(v)===40?(y=ot,v++):(y=e,N===0&&Z(V)),y!==e?(m=ee(),m!==e?(qe(),i.charCodeAt(v)===41?(ae=nt,v++):(ae=e,N===0&&Z(te)),ae!==e?u=It(m):(v=u,u=e)):(v=u,u=e)):(v=u,u=e),N--,u===e&&N===0&&Z(F),u}function Zt(){var u,y,m;return N++,u=v,i.substr(v,3)===Te?(y=Te,v+=3):(y=e,N===0&&Z(H)),y===e&&(i.substr(v,3)===st?(y=st,v+=3):(y=e,N===0&&Z(ie)),y===e&&(i.substr(v,7)===Fe?(y=Fe,v+=7):(y=e,N===0&&Z(we)),y===e&&(i.charCodeAt(v)===42?(y=ht,v++):(y=e,N===0&&Z(se))))),y!==e?(qe(),m=ut(),m===e&&(m=null),u=Pt(y,m)):(v=u,u=e),N--,u===e&&(y=e,N===0&&Z(R)),u}function qe(){var u,y;for(N++,u=[],y=i.charAt(v),j.test(y)?v++:(y=e,N===0&&Z(Se));y!==e;)u.push(y),y=i.charAt(v),j.test(y)?v++:(y=e,N===0&&Z(Se));return N--,y=e,N===0&&Z(me),u}if(pt=r(),t.peg$library)return{peg$result:pt,peg$currPos:v,peg$FAILED:e,peg$maxFailExpected:ct,peg$maxFailPos:He};if(pt!==e&&v===i.length)return pt;throw pt!==e&&v<i.length&&Z(Mt()),wt(ct,He<i.length?i.charAt(He):null,He<i.length?Lt(He,He+1):Lt(He,He))}/**
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
 */const Kt=0xffffffffffffffffn;function ia(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function ba(i,t){return i*t&Kt}function Ia(i){return function(){let t=BigInt(i&Kt),e=BigInt(i>>64n&Kt);const o=ba(ia(ba(t,5n),7n),9n);return e^=t,t=(ia(t,24n)^e^e<<16n)&Kt,e=ia(e,37n),i=e<<64n|t,o}}const Yt=Ia(0xa187eb39cdcaed8f31c4b365b102e01en),Pa=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Yt()))),Ma=Array.from({length:8},()=>Yt()),La=Array.from({length:16},()=>Yt()),na=Yt(),Oe="w",Ye="b",Ee="p",ca="n",Vt="b",At="r",mt="q",Pe="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Ut{constructor(t,e){_e(this,"color");_e(this,"from");_e(this,"to");_e(this,"piece");_e(this,"captured");_e(this,"promotion");_e(this,"flags");_e(this,"san");_e(this,"lan");_e(this,"before");_e(this,"after");const{color:o,piece:d,from:r,to:f,flags:n,captured:w,promotion:P}=e,_=Me(r),D=Me(f);this.color=o,this.piece=d,this.from=_,this.to=D,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=_+D,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const E in le)le[E]&n&&(this.flags+=xt[E]);w&&(this.captured=w),P&&(this.promotion=P,this.lan+=P)}isCapture(){return this.flags.indexOf(xt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(xt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(xt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(xt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(xt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(xt.BIG_PAWN)>-1}}const ze=-1,xt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},le={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},pa={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},qa={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},za={...pa,...qa},re={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},oa={b:[16,32,17,15],w:[-16,-32,-17,-15]},fa={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ra=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Na=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ba={p:1,n:2,b:4,r:8,q:16,k:32},Oa="pnbrqkPNBRQK",ma=[ca,Vt,At,mt],Fa=7,Ha=6,Ua=1,Ga=0,Gt={[Pe]:le.KSIDE_CASTLE,[mt]:le.QSIDE_CASTLE},bt={w:[{square:re.a1,flag:le.QSIDE_CASTLE},{square:re.h1,flag:le.KSIDE_CASTLE}],b:[{square:re.a8,flag:le.QSIDE_CASTLE},{square:re.h8,flag:le.KSIDE_CASTLE}]},Wa={b:Ua,w:Ha},sa="--";function kt(i){return i>>4}function Dt(i){return i&15}function xa(i){return"0123456789".indexOf(i)!==-1}function Me(i){const t=Dt(i),e=kt(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function _t(i){return i===Oe?Ye:Oe}function Ka(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const o=parseInt(t[4],10);if(isNaN(o)||o<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const d=t[0].split("/");if(d.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let f=0;f<d.length;f++){let n=0,w=!1;for(let P=0;P<d[f].length;P++)if(xa(d[f][P])){if(w)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};n+=parseInt(d[f][P],10),w=!0}else{if(!/^[prnbqkPRNBQK]$/.test(d[f][P]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};n+=1,w=!1}if(n!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const r=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:f,regex:n}of r){if(!n.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${f} king`};if((t[0].match(n)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${f} kings`}}return Array.from(d[0]+d[7]).some(f=>f.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Va(i,t){const e=i.from,o=i.to,d=i.piece;let r=0,f=0,n=0;for(let w=0,P=t.length;w<P;w++){const _=t[w].from,D=t[w].to,E=t[w].piece;d===E&&e!==_&&o===D&&(r++,kt(e)===kt(_)&&f++,Dt(e)===Dt(_)&&n++)}return r>0?f>0&&n>0?Me(e):n>0?Me(e).charAt(1):Me(e).charAt(0):""}function ft(i,t,e,o,d,r=void 0,f=le.NORMAL){const n=kt(o);if(d===Ee&&(n===Fa||n===Ga))for(let w=0;w<ma.length;w++){const P=ma[w];i.push({color:t,from:e,to:o,piece:d,captured:r,promotion:P,flags:f|le.PROMOTION})}else i.push({color:t,from:e,to:o,piece:d,captured:r,flags:f})}function ha(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:Ee:(t=t.toLowerCase(),t==="o"?Pe:t)}function la(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class va{constructor(t=ra,{skipValidation:e=!1}={}){_e(this,"_board",new Array(128));_e(this,"_turn",Oe);_e(this,"_header",{});_e(this,"_kings",{w:ze,b:ze});_e(this,"_epSquare",-1);_e(this,"_halfMoves",0);_e(this,"_moveNumber",0);_e(this,"_history",[]);_e(this,"_comments",{});_e(this,"_castling",{w:0,b:0});_e(this,"_hash",0n);_e(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:ze,b:ze},this._turn=Oe,this._castling={w:0,b:0},this._epSquare=ze,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...za},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:o=!1}={}){let d=t.split(/\s+/);if(d.length>=2&&d.length<6){const n=["-","-","0","1"];t=d.concat(n.slice(-(6-d.length))).join(" ")}if(d=t.split(/\s+/),!e){const{ok:n,error:w}=Ka(t);if(!n)throw new Error(w)}const r=d[0];let f=0;this.clear({preserveHeaders:o});for(let n=0;n<r.length;n++){const w=r.charAt(n);if(w==="/")f+=8;else if(xa(w))f+=parseInt(w,10);else{const P=w<"a"?Oe:Ye;this._put({type:w.toLowerCase(),color:P},Me(f)),f++}}this._turn=d[1],d[2].indexOf("K")>-1&&(this._castling.w|=le.KSIDE_CASTLE),d[2].indexOf("Q")>-1&&(this._castling.w|=le.QSIDE_CASTLE),d[2].indexOf("k")>-1&&(this._castling.b|=le.KSIDE_CASTLE),d[2].indexOf("q")>-1&&(this._castling.b|=le.QSIDE_CASTLE),this._epSquare=d[3]==="-"?ze:re[d[3]],this._halfMoves=parseInt(d[4],10),this._moveNumber=parseInt(d[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var f,n;let e=0,o="";for(let w=re.a8;w<=re.h1;w++){if(this._board[w]){e>0&&(o+=e,e=0);const{color:P,type:_}=this._board[w];o+=P===Oe?_.toUpperCase():_.toLowerCase()}else e++;w+1&136&&(e>0&&(o+=e),w!==re.h1&&(o+="/"),e=0,w+=8)}let d="";this._castling[Oe]&le.KSIDE_CASTLE&&(d+="K"),this._castling[Oe]&le.QSIDE_CASTLE&&(d+="Q"),this._castling[Ye]&le.KSIDE_CASTLE&&(d+="k"),this._castling[Ye]&le.QSIDE_CASTLE&&(d+="q"),d=d||"-";let r="-";if(this._epSquare!==ze)if(t)r=Me(this._epSquare);else{const w=this._epSquare+(this._turn===Oe?16:-16),P=[w+1,w-1];for(const _ of P){if(_&136)continue;const D=this._turn;if(((f=this._board[_])==null?void 0:f.color)===D&&((n=this._board[_])==null?void 0:n.type)===Ee){this._makeMove({color:D,from:_,to:this._epSquare,piece:Ee,captured:Ee,flags:le.EP_CAPTURE});const E=!this._isKingAttacked(D);if(this._undoMove(),E){r=Me(this._epSquare);break}}}}return[o,this._turn,d,r,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:o}=this._board[t],d={w:0,b:1}[e],r={p:0,n:1,b:2,r:3,q:4,k:5}[o];return Pa[d][r][t]}_epKey(){return this._epSquare===ze?0n:Ma[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return La[t]}_computeHash(){let t=0n;for(let e=re.a8;e<=re.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=na),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[re[t]]}findPiece(t){var o;const e=[];for(let d=re.a8;d<=re.h1;d++){if(d&136){d+=7;continue}!this._board[d]||((o=this._board[d])==null?void 0:o.color)!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(Me(d))}return e}put({type:t,color:e},o){return this._put({type:t,color:e},o)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},o){if(Oa.indexOf(t.toLowerCase())===-1||!(o in re))return!1;const d=re[o];if(t==Pe&&!(this._kings[e]==ze||this._kings[e]==d))return!1;const r=this._board[d];return r&&r.type===Pe&&(this._kings[r.color]=ze),this._set(d,{type:t,color:e}),t===Pe&&(this._kings[e]=d),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(re[t]),e&&e.type===Pe&&(this._kings[e.color]=ze),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var o,d,r,f,n,w,P,_,D,E,Y,Q;this._hash^=this._castlingKey();const t=((o=this._board[re.e1])==null?void 0:o.type)===Pe&&((d=this._board[re.e1])==null?void 0:d.color)===Oe,e=((r=this._board[re.e8])==null?void 0:r.type)===Pe&&((f=this._board[re.e8])==null?void 0:f.color)===Ye;(!t||((n=this._board[re.a1])==null?void 0:n.type)!==At||((w=this._board[re.a1])==null?void 0:w.color)!==Oe)&&(this._castling.w&=-65),(!t||((P=this._board[re.h1])==null?void 0:P.type)!==At||((_=this._board[re.h1])==null?void 0:_.color)!==Oe)&&(this._castling.w&=-33),(!e||((D=this._board[re.a8])==null?void 0:D.type)!==At||((E=this._board[re.a8])==null?void 0:E.color)!==Ye)&&(this._castling.b&=-65),(!e||((Y=this._board[re.h8])==null?void 0:Y.type)!==At||((Q=this._board[re.h8])==null?void 0:Q.color)!==Ye)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var r,f;if(this._epSquare===ze)return;const t=this._epSquare+(this._turn===Oe?-16:16),e=this._epSquare+(this._turn===Oe?16:-16),o=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((r=this._board[e])==null?void 0:r.color)!==_t(this._turn)||((f=this._board[e])==null?void 0:f.type)!==Ee){this._hash^=this._epKey(),this._epSquare=ze;return}const d=n=>{var w,P;return!(n&136)&&((w=this._board[n])==null?void 0:w.color)===this._turn&&((P=this._board[n])==null?void 0:P.type)===Ee};o.some(d)||(this._hash^=this._epKey(),this._epSquare=ze)}_attacked(t,e,o){const d=[];for(let r=re.a8;r<=re.h1;r++){if(r&136){r+=7;continue}if(this._board[r]===void 0||this._board[r].color!==t)continue;const f=this._board[r],n=r-e;if(n===0)continue;const w=n+119;if(Ra[w]&Ba[f.type]){if(f.type===Ee){if(n>0&&f.color===Oe||n<=0&&f.color===Ye)if(o)d.push(Me(r));else return!0;continue}if(f.type==="n"||f.type==="k")if(o){d.push(Me(r));continue}else return!0;const P=Na[w];let _=r+P,D=!1;for(;_!==e;){if(this._board[_]!=null){D=!0;break}_+=P}if(!D)if(o){d.push(Me(r));continue}else return!0}}return o?d:!1}attackers(t,e){return e?this._attacked(e,re[t],!0):this._attacked(this._turn,re[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(_t(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,re[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let o=0,d=0;for(let r=re.a8;r<=re.h1;r++){if(d=(d+1)%2,r&136){r+=7;continue}const f=this._board[r];f&&(t[f.type]=f.type in t?t[f.type]+1:1,f.type===Vt&&e.push(d),o++)}if(o===2)return!0;if(o===3&&(t[Vt]===1||t[ca]===1))return!0;if(o===t[Vt]+2){let r=0;const f=e.length;for(let n=0;n<f;n++)r+=e[n];if(r===0||r===f)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:o=void 0}={}){const d=this._moves({square:e,piece:o});return t?d.map(r=>new Ut(this,r)):d.map(r=>this._moveToSan(r,d))}_moves({legal:t=!0,piece:e=void 0,square:o=void 0}={}){var Y;const d=o?o.toLowerCase():void 0,r=e==null?void 0:e.toLowerCase(),f=[],n=this._turn,w=_t(n);let P=re.a8,_=re.h1,D=!1;if(d)if(d in re)P=_=re[d],D=!0;else return[];for(let Q=P;Q<=_;Q++){if(Q&136){Q+=7;continue}if(!this._board[Q]||this._board[Q].color===w)continue;const{type:ke}=this._board[Q];let ve;if(ke===Ee){if(r&&r!==ke)continue;ve=Q+oa[n][0],this._board[ve]||(ft(f,n,Q,ve,Ee),ve=Q+oa[n][1],Wa[n]===kt(Q)&&!this._board[ve]&&ft(f,n,Q,ve,Ee,void 0,le.BIG_PAWN));for(let Ie=2;Ie<4;Ie++)ve=Q+oa[n][Ie],!(ve&136)&&(((Y=this._board[ve])==null?void 0:Y.color)===w?ft(f,n,Q,ve,Ee,this._board[ve].type,le.CAPTURE):ve===this._epSquare&&ft(f,n,Q,ve,Ee,Ee,le.EP_CAPTURE))}else{if(r&&r!==ke)continue;for(let Ie=0,ot=fa[ke].length;Ie<ot;Ie++){const nt=fa[ke][Ie];for(ve=Q;ve+=nt,!(ve&136);){if(!this._board[ve])ft(f,n,Q,ve,ke);else{if(this._board[ve].color===n)break;ft(f,n,Q,ve,ke,this._board[ve].type,le.CAPTURE);break}if(ke===ca||ke===Pe)break}}}}if((r===void 0||r===Pe)&&(!D||_===this._kings[n])){if(this._castling[n]&le.KSIDE_CASTLE){const Q=this._kings[n],ke=Q+2;!this._board[Q+1]&&!this._board[ke]&&!this._attacked(w,this._kings[n])&&!this._attacked(w,Q+1)&&!this._attacked(w,ke)&&ft(f,n,this._kings[n],ke,Pe,void 0,le.KSIDE_CASTLE)}if(this._castling[n]&le.QSIDE_CASTLE){const Q=this._kings[n],ke=Q-2;!this._board[Q-1]&&!this._board[Q-2]&&!this._board[Q-3]&&!this._attacked(w,this._kings[n])&&!this._attacked(w,Q-1)&&!this._attacked(w,ke)&&ft(f,n,this._kings[n],ke,Pe,void 0,le.QSIDE_CASTLE)}}if(!t||this._kings[n]===-1)return f;const E=[];for(let Q=0,ke=f.length;Q<ke;Q++)this._makeMove(f[Q]),this._isKingAttacked(n)||E.push(f[Q]),this._undoMove();return E}move(t,{strict:e=!1}={}){let o=null;if(typeof t=="string")o=this._moveFromSan(t,e);else if(t===null)o=this._moveFromSan(sa,e);else if(typeof t=="object"){const r=this._moves();for(let f=0,n=r.length;f<n;f++)if(t.from===Me(r[f].from)&&t.to===Me(r[f].to)&&(!("promotion"in r[f])||t.promotion===r[f].promotion)){o=r[f];break}}if(!o)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&o.flags&le.NULL_MOVE)throw new Error("Null move not allowed when in check");const d=new Ut(this,o);return this._makeMove(o),this._incPositionCount(),d}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var d,r,f,n;const e=this._turn,o=_t(e);if(this._push(t),t.flags&le.NULL_MOVE){e===Ye&&this._moveNumber++,this._halfMoves++,this._turn=o,this._epSquare=ze;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&le.EP_CAPTURE&&(this._turn===Ye?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Pe){if(this._kings[e]=t.to,t.flags&le.KSIDE_CASTLE){const w=t.to-1,P=t.to+1;this._movePiece(P,w)}else if(t.flags&le.QSIDE_CASTLE){const w=t.to+1,P=t.to-2;this._movePiece(P,w)}this._castling[e]=0}if(this._castling[e]){for(let w=0,P=bt[e].length;w<P;w++)if(t.from===bt[e][w].square&&this._castling[e]&bt[e][w].flag){this._castling[e]^=bt[e][w].flag;break}}if(this._castling[o]){for(let w=0,P=bt[o].length;w<P;w++)if(t.to===bt[o][w].square&&this._castling[o]&bt[o][w].flag){this._castling[o]^=bt[o][w].flag;break}}if(this._hash^=this._castlingKey(),t.flags&le.BIG_PAWN){let w;e===Ye?w=t.to-16:w=t.to+16,!(t.to-1&136)&&((d=this._board[t.to-1])==null?void 0:d.type)===Ee&&((r=this._board[t.to-1])==null?void 0:r.color)===o||!(t.to+1&136)&&((f=this._board[t.to+1])==null?void 0:f.type)===Ee&&((n=this._board[t.to+1])==null?void 0:n.color)===o?(this._epSquare=w,this._hash^=this._epKey()):this._epSquare=ze}else this._epSquare=ze;t.piece===Ee?this._halfMoves=0:t.flags&(le.CAPTURE|le.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===Ye&&this._moveNumber++,this._turn=o,this._hash^=na}undo(){const t=this._hash,e=this._undoMove();if(e){const o=new Ut(this,e);return this._decPositionCount(t),o}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=na;const o=this._turn,d=_t(o);if(e.flags&le.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:o})),e.captured)if(e.flags&le.EP_CAPTURE){let r;o===Ye?r=e.to-16:r=e.to+16,this._set(r,{type:Ee,color:d})}else this._set(e.to,{type:e.captured,color:d});if(e.flags&(le.KSIDE_CASTLE|le.QSIDE_CASTLE)){let r,f;e.flags&le.KSIDE_CASTLE?(r=e.to+1,f=e.to-1):(r=e.to-2,f=e.to+1),this._movePiece(f,r)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const o=[];let d=!1;for(const E in this._header)this._header[E]&&o.push(`[${E} "${this._header[E]}"]`+t),d=!0;d&&this._history.length&&o.push(t);const r=E=>{const Y=this._comments[this.fen()];if(typeof Y<"u"){const Q=E.length>0?" ":"";E=`${E}${Q}{${Y}}`}return E},f=[];for(;this._history.length>0;)f.push(this._undoMove());const n=[];let w="";for(f.length===0&&n.push(r(""));f.length>0;){w=r(w);const E=f.pop();if(!E)break;if(!this._history.length&&E.color==="b"){const Y=`${this._moveNumber}. ...`;w=w?`${w} ${Y}`:Y}else E.color==="w"&&(w.length&&n.push(w),w=this._moveNumber+".");w=w+" "+this._moveToSan(E,this._moves({legal:!0})),this._makeMove(E)}if(w.length&&n.push(r(w)),n.push(this._header.Result||"*"),e===0)return o.join("")+n.join(" ");const P=function(){return o.length>0&&o[o.length-1]===" "?(o.pop(),!0):!1},_=function(E,Y){for(const Q of Y.split(" "))if(Q){if(E+Q.length>e){for(;P();)E--;o.push(t),E=0}o.push(Q),E+=Q.length,o.push(" "),E++}return P()&&E--,E};let D=0;for(let E=0;E<n.length;E++){if(D+n[E].length>e&&n[E].includes("{")){D=_(D,n[E]);continue}D+n[E].length>e&&E!==0?(o[o.length-1]===" "&&o.pop(),o.push(t),D=0):E!==0&&(o.push(" "),D++),o.push(n[E]),D+=n[E].length}return o.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??pa[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=pa[t]||null,!0):!1}getHeaders(){const t={};for(const[e,o]of Object.entries(this._header))o!==null&&(t[e]=o);return t}loadPgn(t,{strict:e=!1,newlineChar:o=`\r?
`}={}){o!==`\r?
`&&(t=t.replace(new RegExp(o,"g"),`
`));const d=Ea(t);this.reset();const r=d.headers;let f="";for(const P in r)P.toLowerCase()==="fen"&&(f=r[P]),this.header(P,r[P]);if(!e)f&&this.load(f,{preserveHeaders:!0});else if(r.SetUp==="1"){if(!("FEN"in r))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(r.FEN,{preserveHeaders:!0})}let n=d.root;for(;n;){if(n.move){const P=this._moveFromSan(n.move,e);if(P==null)throw new Error(`Invalid move in PGN: ${n.move}`);this._makeMove(P),this._incPositionCount()}n.comment!==void 0&&(this._comments[this.fen()]=n.comment),n=n.variations[0]}const w=d.result;w&&Object.keys(this._header).length&&this._header.Result!==w&&this.setHeader("Result",w)}_moveToSan(t,e){let o="";if(t.flags&le.KSIDE_CASTLE)o="O-O";else if(t.flags&le.QSIDE_CASTLE)o="O-O-O";else{if(t.flags&le.NULL_MOVE)return sa;if(t.piece!==Ee){const d=Va(t,e);o+=t.piece.toUpperCase()+d}t.flags&(le.CAPTURE|le.EP_CAPTURE)&&(t.piece===Ee&&(o+=Me(t.from)[0]),o+="x"),o+=Me(t.to),t.promotion&&(o+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?o+="#":o+="+"),this._undoMove(),o}_moveFromSan(t,e=!1){let o=la(t);if(e||(o==="0-0"?o="O-O":o==="0-0-0"&&(o="O-O-O")),o==sa)return{color:this._turn,from:0,to:0,piece:"k",flags:le.NULL_MOVE};let d=ha(o),r=this._moves({legal:!0,piece:d});for(let E=0,Y=r.length;E<Y;E++)if(o===la(this._moveToSan(r[E],r)))return r[E];if(e)return null;let f,n,w,P,_,D=!1;if(n=o.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),n?(f=n[1],w=n[2],P=n[3],_=n[4],w.length==1&&(D=!0)):(n=o.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),n&&(f=n[1],w=n[2],P=n[3],_=n[4],w.length==1&&(D=!0))),d=ha(o),r=this._moves({legal:!0,piece:f||d}),!P)return null;for(let E=0,Y=r.length;E<Y;E++)if(w){if((!f||f.toLowerCase()==r[E].piece)&&re[w]==r[E].from&&re[P]==r[E].to&&(!_||_.toLowerCase()==r[E].promotion))return r[E];if(D){const Q=Me(r[E].from);if((!f||f.toLowerCase()==r[E].piece)&&re[P]==r[E].to&&(w==Q[0]||w==Q[1])&&(!_||_.toLowerCase()==r[E].promotion))return r[E]}}else if(o===la(this._moveToSan(r[E],r)).replace("x",""))return r[E];return null}ascii(){let t=`   +------------------------+
`;for(let e=re.a8;e<=re.h1;e++){if(Dt(e)===0&&(t+=" "+"87654321"[kt(e)]+" |"),this._board[e]){const o=this._board[e].type,r=this._board[e].color===Oe?o.toUpperCase():o.toLowerCase();t+=" "+r+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let o=0;const d=this._turn;for(let r=0,f=e.length;r<f;r++)this._makeMove(e[r]),this._isKingAttacked(d)||(t-1>0?o+=this.perft(t-1):o++),this._undoMove();return o}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let o=re.a8;o<=re.h1;o++)this._board[o]==null?e.push(null):e.push({square:Me(o),type:this._board[o].type,color:this._board[o].color}),o+1&136&&(t.push(e),e=[],o+=8);return t}squareColor(t){if(t in re){const e=re[t];return(kt(e)+Dt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],o=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const d=e.pop();if(!d)break;t?o.push(new Ut(this,d)):o.push(this._moveToSan(d,this._moves())),this._makeMove(d)}return o}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},o=d=>{d in this._comments&&(e[d]=this._comments[d])};for(;this._history.length>0;)t.push(this._undoMove());for(o(this.fen());;){const d=t.pop();if(!d)break;this._makeMove(d),o(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const d of[Pe,mt])e[d]!==void 0&&(e[d]?this._castling[t]|=Gt[d]:this._castling[t]&=~Gt[d]);this._updateCastlingRights();const o=this.getCastlingRights(t);return(e[Pe]===void 0||e[Pe]===o[Pe])&&(e[mt]===void 0||e[mt]===o[mt])}getCastlingRights(t){return{[Pe]:(this._castling[t]&Gt[Pe])!==0,[mt]:(this._castling[t]&Gt[mt])!==0}}moveNumber(){return this._moveNumber}}async function Za(i,t={}){var fe,ce,ue;const e=t.currentUser||{};let o="chat",d=[],r=null,f=[],n=[],w=null,P=null,_=!1,D=null,E=null;i.innerHTML=`
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
  `,Ya(),await nt(),je();const Y=i.querySelector("#tab-nav-chat"),Q=i.querySelector("#tab-nav-lounge"),ke=i.querySelector("#bonding-chat-main-wrap"),ve=i.querySelector("#bonding-lounge-main-wrap");Y==null||Y.addEventListener("click",()=>{o="chat",Y.classList.add("active"),Q.classList.remove("active"),ke.style.display="grid",ve.style.display="none",je()}),Q==null||Q.addEventListener("click",async()=>{o="lounge_games",Q.classList.add("active"),Y.classList.remove("active"),ke.style.display="none",ve.style.display="block",await s()}),(fe=i.querySelector("#btn-top-new-chat"))==null||fe.addEventListener("click",z),(ce=i.querySelector("#btn-top-new-group"))==null||ce.addEventListener("click",x),(ue=i.querySelector("#btn-top-challenge"))==null||ue.addEventListener("click",()=>L());const Ie=i.querySelector("#bonding-search-input");Ie&&Ie.addEventListener("input",g=>{const b=g.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(p=>{const h=p.textContent.toLowerCase();p.style.display=h.includes(b)?"flex":"none"})}),st(),new MutationObserver((g,b)=>{document.body.contains(i)||(P&&clearInterval(P),E&&clearInterval(E),b.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function nt(){try{const[g,b]=await Promise.all([Re("/bonding/channels").catch(()=>[]),Re("/bonding/colleagues").catch(()=>[])]);d=g,f=b,!r&&d.length>0&&(r=d.find(l=>l.name.includes("Lounge"))||d[0]),Fe(),r&&await Te(r._id)}catch(g){console.error("Failed to load bonding data",g)}}async function Te(g,b=!1){if(g)try{n=await Re(`/bonding/channels/${g}/messages`),b?j():a()}catch(l){console.error("Failed to load messages",l)}}function st(){P&&clearInterval(P),P=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval(P);return}o==="chat"&&r?await Te(r._id,!0):o==="lounge_games"&&await s(!0)}catch{}},3e3)}function Fe(){const g=i.querySelector("#bonding-group-list"),b=i.querySelector("#bonding-direct-list");if(!g||!b)return;const l=d.filter(h=>h.type==="group"),p=d.filter(h=>h.type==="direct");l.length===0?g.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':g.innerHTML=l.map(h=>{var A;return`
          <div class="bonding-channel-item ${r&&r._id===h._id?"active":""}" data-channel-id="${h._id}">
            <div class="bonding-channel-icon">${h.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${$(h.name)}</div>
              <div class="bonding-channel-preview">${$(((A=h.lastMessage)==null?void 0:A.content)||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${h._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),p.length===0?b.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':b.innerHTML=p.map(h=>{var U;const q=r&&r._id===h._id,A=h.displayName||h.name||"Colleague",W=A.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${q?"active":""}" data-channel-id="${h._id}">
            <div class="bonding-channel-avatar">${W}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${$(A)}</div>
              <div class="bonding-channel-preview">${$(((U=h.lastMessage)==null?void 0:U.content)||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${h._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),ht()}function ht(){var b,l;const g=i.querySelectorAll(".bonding-channel-item");g.forEach(p=>{p.onclick=async h=>{if(h.target.closest(".bonding-channel-del-btn"))return;const q=p.dataset.channelId,A=d.find(W=>W._id===q);A&&(r=A,g.forEach(W=>W.classList.remove("active")),p.classList.add("active"),je(),await Te(A._id))}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(p=>{p.onclick=async h=>{h.stopPropagation();const q=p.dataset.channelId,A=d.find(G=>G._id===q),W=A&&A.type==="direct",U=W?"this 1-on-1 chat":`the group "${(A==null?void 0:A.name)||""}"`;if(confirm(`Are you sure you want to delete ${U}? All messages will be permanently removed.`))try{p.disabled=!0,await We(`/bonding/channels/${q}`),S(W?"1-on-1 chat deleted":"Group deleted","success"),d=d.filter(G=>G._id!==q),r&&r._id===q&&(r=d[0]||null,je(),r&&await Te(r._id)),Fe()}catch(G){S(G.message||"Failed to delete conversation","error"),p.disabled=!1}}}),(b=i.querySelector("#btn-create-group"))==null||b.addEventListener("click",x),(l=i.querySelector("#btn-new-direct-chat"))==null||l.addEventListener("click",z)}function je(){const g=i.querySelector("#bonding-chat-panel");if(!g)return;if(!r){g.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const b=$(r.displayName||r.name),l=(r.members||[]).length,p=r.type==="group",h=(e==null?void 0:e._id)||(e==null?void 0:e.id),q=p?null:(r.members||[]).find(A=>{var W;return((W=A.userId)==null?void 0:W.toString())!==(h==null?void 0:h.toString())});g.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${p?r.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${b}</div>
            <div class="bonding-chat-sub">
              ${p?`<span>${l} members</span> · <span>${$(r.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${p?`
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
    `,Ne(q),be(q),et(),C()}function Xe(){if(!n||n.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const g=(e==null?void 0:e._id)||(e==null?void 0:e.id);return n.map(b=>{var A,W,U,G,M,pe,X,ge,J;const l=b.sender&&b.sender.userId&&g&&b.sender.userId.toString()===g.toString();if(b.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${b._id}">
            <span>ℹ️</span> <span>${$(b.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${b._id}" title="Delete Message">&times;</button>
          </div>
        `;if(b.type==="challenge"&&b.challengeData){const F=b.challengeData,V=F.gameTitle||"Game Challenge",te=F.gameType||"chess",R=te==="chess"?"♟️":te==="ludo"?"🎲":"❌",H=(A=F.gameState)==null?void 0:A.invitationId,ie=(W=F.targetUserId)==null?void 0:W.toString(),we=(G=(U=b.sender)==null?void 0:U.userId)==null?void 0:G.toString(),se=g&&ie===g.toString(),me=g&&we===g.toString();return`
          <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${b._id}">
            <div class="bonding-msg-avatar" title="${$(((M=b.sender)==null?void 0:M.name)||"Teammate")}">
              ${(((pe=b.sender)==null?void 0:pe.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${$(((X=b.sender)==null?void 0:X.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${oe(b.createdAt)}</span>
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
                  <div class="game-bubble-icon">${R}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${$(V)}</h4>
                    <p class="game-bubble-desc">${$(b.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${F.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':F.status==="active"||F.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${$(((ge=F.status)==null?void 0:ge.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${F.status==="pending"&&se?`
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

              ${Ze(b)}
            </div>
          </div>
        `}const p=$(((J=b.sender)==null?void 0:J.name)||"Teammate"),h=oe(b.createdAt),q=Ze(b);return`
        <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${b._id}">
          <div class="bonding-msg-avatar" title="${p}">${p.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${p}</span>
              <span class="bonding-msg-time">${h}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${b._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${$(b.content).replace(/\n/g,"<br/>")}
            </div>
            ${q}
          </div>
        </div>
      `}).join("")}function Ze(g){return`
      <div class="bonding-reactions-row">
        ${(g.reactions||[]).map(p=>{const h=(e==null?void 0:e._id)||(e==null?void 0:e.id);return`
        <button class="bonding-rxn-tag ${(p.users||[]).some(A=>A.toString()===(h==null?void 0:h.toString()))?"active":""}" data-msg-id="${g._id}" data-emoji="${p.emoji}">
          <span>${p.emoji}</span> <span>${p.users?p.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${g._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function Ne(g){const b=i.querySelector("#btn-chat-challenge");b&&(b.onclick=()=>{g?L(null,g.userId||g._id):L()});const l=i.querySelector("#btn-manage-members");l&&(l.onclick=T);const p=i.querySelector("#btn-delete-group");p&&(p.onclick=B);const h=i.querySelector("#btn-delete-direct");h&&(h.onclick=async()=>{if(r&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{h.disabled=!0,await We(`/bonding/channels/${r._id}`),S("1-on-1 chat deleted successfully","success");const A=r._id;d=d.filter(W=>W._id!==A),r=d[0]||null,Fe(),je(),r&&await Te(r._id)}catch(A){S(A.message||"Could not delete 1-on-1 chat","error"),h.disabled=!1}});const q=i.querySelector("#btn-clear-chat");q&&(q.onclick=async()=>{if(r&&confirm("Are you sure you want to clear all messages in this conversation?"))try{q.disabled=!0,await We(`/bonding/channels/${r._id}/messages`),S("Chat messages cleared","success"),n=[],a()}catch(A){S(A.message||"Could not clear chat messages","error")}finally{q.disabled=!1}})}function be(g){const b=i.querySelector("#bonding-message-input"),l=i.querySelector("#btn-send-message"),p=i.querySelector("#btn-quick-emoji"),h=i.querySelector("#btn-input-challenge");b&&b.addEventListener("keydown",q=>{q.key==="Enter"&&!q.shiftKey&&(q.preventDefault(),ye())}),l&&(l.onclick=ye),h&&(h.onclick=()=>{g?L(null,g.userId||g._id):L()}),p&&(p.onclick=()=>{if(!b)return;const q=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],A=q[Math.floor(Math.random()*q.length)];b.value+=(b.value?" ":"")+A,b.focus()})}function et(){i.querySelectorAll(".btn-respond-invite").forEach(p=>{p.onclick=async()=>{const h=p.dataset.inviteId,q=p.dataset.action;await K(h,q)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(p=>{p.onclick=async()=>{const h=p.dataset.inviteId;try{p.disabled=!0;const q=await Re("/bonding/invitations"),A=(q.incoming||[]).concat(q.sent||[]).find(W=>W._id===h);A&&A.matchId?O(A.matchId):S("Match has not started yet or has expired","warning")}catch(q){S(q.message||"Could not load match","error")}finally{p.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(p=>{p.onclick=async h=>{h.stopPropagation();const q=p.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{p.disabled=!0,await We(`/bonding/messages/${q}`),n=n.filter(A=>A._id!==q),j(),S("Message deleted","success")}catch(A){S(A.message||"Failed to delete message","error"),p.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(p=>{p.onclick=async()=>{const h=p.dataset.msgId,q=p.dataset.emoji;await c(h,q)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(p=>{p.onclick=h=>{const q=p.dataset.msgId;de(h.currentTarget,async A=>{await c(q,A)})}})}async function ye(){const g=i.querySelector("#bonding-message-input");if(!g||!r||_)return;const b=g.value.trim();if(b)try{_=!0,g.value="";const l=await $e(`/bonding/channels/${r._id}/messages`,{content:b,type:"text"});n.push(l),a(),C()}catch(l){S(l.message||"Failed to send message","error")}finally{_=!1,g.focus()}}async function c(g,b){try{const l=await $e(`/bonding/messages/${g}/react`,{emoji:b}),p=n.find(h=>h._id===g);p&&(p.reactions=l,j())}catch(l){S(l.message||"Failed to react","error")}}function C(){const g=i.querySelector("#bonding-messages-feed");g&&(g.scrollTop=g.scrollHeight)}function j(){const g=i.querySelector("#bonding-messages-feed");if(!g)return;const b=g.scrollHeight-g.scrollTop<=g.clientHeight+80;g.innerHTML=Xe(),et(),b&&C()}function a(){const g=i.querySelector("#bonding-messages-feed");g&&(g.innerHTML=Xe(),et())}async function s(g=!1){const b=i.querySelector("#bonding-lounge-main-wrap");if(b){g||(b.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const l=await Re("/bonding/games/overview");w=l;const p=l.myStats||{},h=l.availableGames||[],q=l.incomingChallenges||[],A=l.sentChallenges||[],W=l.activeMatches||[],U=l.recentMatches||[],G=(e==null?void 0:e._id)||(e==null?void 0:e.id);b.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${p.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${p.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${p.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${p.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${p.gamesPlayed>0?Math.round((p.wins||0)/p.gamesPlayed*100):0}%</span>
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
                <span class="badge blue">${q.length+A.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${q.length})</h5>
              ${q.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${q.map(M=>`
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
                          <span class="recent-date">${oe(M.completedAt||M.updatedAt)}</span>
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
      `,k()}catch(l){b.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${$(l.message)}</p>
        </div>
      `}}}function k(){i.querySelectorAll(".btn-challenge-game").forEach(b=>{b.onclick=()=>{const l=b.dataset.gameId;L(l)}}),i.querySelectorAll(".btn-respond-invite").forEach(b=>{b.onclick=async()=>{const l=b.dataset.inviteId,p=b.dataset.action;await K(l,p),await s()}}),i.querySelectorAll(".btn-resume-match").forEach(b=>{b.onclick=()=>{const l=b.dataset.matchId;O(l)}}),i.querySelectorAll(".btn-recent-rematch").forEach(b=>{b.onclick=async()=>{const l=b.dataset.matchId;try{b.disabled=!0;const p=await $e(`/bonding/matches/${l}/action`,{action:"rematch"});p.match&&(S("Rematch created! Opening arena ⚔️","success"),O(p.match._id))}catch(p){S(p.message||"Could not start rematch","error")}finally{b.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(b=>{b.onclick=async l=>{l.stopPropagation();const p=b.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{b.disabled=!0,await We(`/bonding/matches/${p}`),S("Match deleted successfully","success"),await s()}catch(h){S(h.message||"Failed to delete match","error")}finally{b.disabled=!1}}});const g=i.querySelector("#btn-clear-matches");g&&(g.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{g.disabled=!0,await We("/bonding/matches?filter=completed"),S("Completed matches history cleared","success"),await s()}catch(b){S(b.message||"Failed to clear matches","error")}finally{g.disabled=!1}})}function L(g=null,b=null){const l=i.querySelector("#bonding-modals-root"),p=(e==null?void 0:e._id)||(e==null?void 0:e.id),h=new Set(["employee","admin","superadmin"]),q=f.filter(ge=>!ge.isSelf&&ge._id.toString()!==(p==null?void 0:p.toString())&&h.has(ge.role));let A=g||"chess",W=b?b.toString():null,U=2,G=W?[W]:[],M="none";function pe(){const ge=q.find(te=>te._id.toString()===W),J=A==="ludo",F=U-1,V=G.length===F;l.innerHTML=`
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
                  ${q.map(te=>{const R=J?G.includes(te._id.toString()):W===te._id.toString();return`
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
                    <div><strong>Opponents:</strong> ${G.length>0?G.map(te=>{const R=q.find(H=>H._id.toString()===te);return R?`<strong>${$(R.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+F+" colleague(s)</span>"}</div>
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
      `,X()}function X(){l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelector("#btn-cancel-challenge-flow").onclick=()=>{l.innerHTML=""},l.querySelectorAll(".game-pill-btn").forEach(F=>{F.onclick=()=>{A=F.dataset.game,pe()}}),l.querySelectorAll(".ludo-mode-btn").forEach(F=>{F.onclick=()=>{U=Number(F.dataset.count),G=G.slice(0,U-1),pe()}});const ge=l.querySelector("#flow-emp-search");ge&&(ge.oninput=F=>{const V=F.target.value.toLowerCase().trim();l.querySelectorAll(".eligible-emp-item").forEach(te=>{const R=te.textContent.toLowerCase();te.style.display=R.includes(V)?"flex":"none"})}),l.querySelectorAll(".eligible-emp-item").forEach(F=>{F.onclick=()=>{const V=F.dataset.userId;if(A==="ludo"){const te=U-1;G.includes(V)?G=G.filter(R=>R!==V):G.length<te?G.push(V):G[te-1]=V}else W=V;pe()}}),l.querySelectorAll('input[name="timerMode"]').forEach(F=>{F.onchange=V=>{M=V.target.value,pe()}});const J=l.querySelector("#btn-submit-challenge-flow");J&&(J.onclick=async()=>{if(A==="ludo"){const F=U-1;if(G.length<F){S(`Please select ${F} colleague(s) to play with`,"warning");return}try{J.disabled=!0,J.textContent="Launching Match...";const V=await $e("/bonding/matches/instant-ludo",{playerCount:U,targetUserIds:G});l.innerHTML="",S(`Ludo match started (${U} Players)! 🎲`,"success"),V&&V._id&&O(V._id)}catch(V){S(V.message||"Failed to start Ludo match","error"),J.disabled=!1,J.textContent=`Start ${U}P Ludo Match 🎲`}return}if(!W){S("Please select an employee to challenge","warning");return}try{J.disabled=!0,J.textContent="Sending Challenge...",await $e("/bonding/invitations",{gameType:A,targetUserId:W,matchSettings:{timerMode:M},channelId:(r==null?void 0:r._id)||null}),S("Game challenge delivered! Awaiting acceptance ⚔️","success"),l.innerHTML="",r&&await Te(r._id),o==="lounge_games"&&await s()}catch(F){S(F.message||"Could not send challenge","error"),J.disabled=!1,J.textContent="Send Challenge 🚀"}})}pe()}async function K(g,b){if(!(!g||!b))try{const l=await Wt(`/bonding/invitations/${g}/respond`,{action:b});b==="accept"?(S("Challenge accepted! Entering match arena ⚔️","success"),l.match&&O(l.match._id)):b==="decline"?S("Challenge declined","info"):b==="cancel"&&S("Challenge cancelled","info"),r&&await Te(r._id),o==="lounge_games"&&await s()}catch(l){S(l.message||"Action failed","error")}}async function O(g){if(!g)return;D=g,E&&clearInterval(E);const b=i.querySelector("#bonding-modals-root");let l=null,p=null,h=[];async function q(){try{return l=await Re(`/bonding/matches/${g}`),l}catch(X){return S(X.message||"Could not load match","error"),A(),null}}if(l=await q(),!l)return;function A(){E&&clearInterval(E),D=null,b.innerHTML="",o==="lounge_games"&&s(!0),r&&Te(r._id,!0)}E=setInterval(async()=>{var F,V,te,R;if(!D||D!==g){clearInterval(E);return}const X=(F=l==null?void 0:l.currentTurnUserId)==null?void 0:F.toString(),ge=l==null?void 0:l.status,J=await q();J&&(((V=J.currentTurnUserId)==null?void 0:V.toString())!==X||J.status!==ge||((te=J.moves)==null?void 0:te.length)!==((R=l.moves)==null?void 0:R.length))&&W()},1500);function W(){var R,H;if(!l)return;const X=(e==null?void 0:e._id)||(e==null?void 0:e.id),ge=X&&l.player1.userId.toString()===X.toString(),J=ge?l.player1:l.player2,F=ge?l.player2:l.player1,V=X&&l.currentTurnUserId&&l.currentTurnUserId.toString()===X.toString(),te=l.status!=="active";b.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${l.gameType==="ludo"?"🎲":l.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${$(l.gameTitle)}</h3>
                  ${l.gameType==="ludo"&&((R=l.gameState)!=null&&R.players)?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${l.gameState.players.map(ie=>{var Se;const we=ie.userId&&ie.userId.toString()===(X==null?void 0:X.toString()),se={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[ie.color]||"⚪",me=(((Se=l.gameState)==null?void 0:Se.turnColor)||l.turn)===ie.color;return`
                          <span class="player-tag ${we?"self":"opp"} ${me?"turn-active":""}">
                            ${se} <strong>${$(ie.name)}</strong> ${we?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${$(J.name)} (You · <strong>${l.gameType==="ludo"?J.assignedRole==="red"?"🔴 Red":"🟢 Green":l.gameType==="tictactoe"?J.assignedRole==="X"?"✕":"◯":J.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${$(F.name)} (<strong>${l.gameType==="ludo"?F.assignedRole==="red"?"🔴 Red":"🟢 Green":l.gameType==="tictactoe"?F.assignedRole==="X"?"✕":"◯":F.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${te?"ended":V?"my-turn":"opp-turn"}">
                ${te?`<span>🏁 Finished (${$(l.winningReason||l.status)})</span>`:V?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${$(F.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${l.gameType==="ludo"?V?(H=l.gameState)!=null&&H.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":l.gameType==="tictactoe"?V?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":V?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
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
            ${l.drawOfferedBy&&l.drawOfferedBy.toString()!==(X==null?void 0:X.toString())&&!te?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${$(F.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${l.gameType==="chess"?U(ge):""}
              ${l.gameType==="tictactoe"?G():""}
              ${l.gameType==="ludo"?M(ge):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${te?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${l.winnerId&&l.winnerId.toString()===(X==null?void 0:X.toString())?"🏆":l.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${l.winnerId&&l.winnerId.toString()===(X==null?void 0:X.toString())?"VICTORY!":l.status==="draw"?"STALEMATE / DRAW":`${$(l.winnerName)} Wins!`}</h4>
                  <p>Reason: ${$(l.winningReason||"Match concluded")}</p>
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
      `,pe(V,ge,J)}function U(X){var se;const ge=((se=l.gameState)==null?void 0:se.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",J=new va(ge),F=X?l.player1.assignedRole==="white":l.player2.assignedRole==="white",V={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},te=F?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],R=F?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let H='<div class="chess-board-grid">';for(const me of R)for(const Se of te){const Ae=`${Se}${me}`,Ce=J.get(Ae),Qe=(Se.charCodeAt(0)-97+me)%2!==0,tt=p===Ae,Ge=h.includes(Ae),Be=Ce?Ce.color==="w"?V[Ce.type.toUpperCase()]:V[Ce.type]:"";H+=`
            <div class="chess-sq ${Qe?"light":"dark"} ${tt?"selected":""} ${Ge?"legal-dot":""}" data-square="${Ae}">
              ${Be?`<span class="chess-piece ${Ce.color==="w"?"white-piece":"black-piece"}">${Be}</span>`:""}
            </div>
          `}H+="</div>";const we=(l.moves||[]).map(me=>{var Se;return`
        <span class="chess-move-token">${me.moveNum}. ${((Se=me.moveData)==null?void 0:Se.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${H}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${we||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function G(){var J;const X=((J=l.gameState)==null?void 0:J.board)||Array(9).fill(null),ge=l.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${X.map((F,V)=>{const te=ge.includes(V);return`
                <div class="ttt-cell ${F?"filled":"empty"} ${te?"win-cell":""}" data-cell-idx="${V}">
                  ${F==="X"?'<span class="ttt-x">✕</span>':F==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function M(X,ge,J){var Rt;const F=l.gameState||{},V=F.activeColors||["red","green"],te=F.players||[{...l.player1,color:"red",assignedRole:"red",isBot:!1},{...l.player2,color:"green",assignedRole:"green",isBot:!1}],R=F.tokens||{},H=I=>{const ee=R[I]||(I==="red"?F.p1Tokens:I==="green"?F.p2Tokens:[])||[];return Array.from({length:4},(he,Le)=>ee[Le]||{id:Le,step:-1})},ie=H("red"),we=H("green"),se=H("yellow"),me=H("blue"),Se=(e==null?void 0:e._id)||(e==null?void 0:e.id),Ae=te.find(I=>I.userId&&I.userId.toString()===(Se==null?void 0:Se.toString()))||te[0],Ce=(Ae==null?void 0:Ae.color)||(X?"red":"green"),Qe=F.turnColor||l.turn||"red",tt=Ce===Qe&&l.status==="active",Ge=!!F.rolled,Be=F.dice,lt=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],jt=[[7,1],[7,2],[7,3],[7,4],[7,5]],Et=[[1,7],[2,7],[3,7],[4,7],[5,7]],It=[[7,13],[7,12],[7,11],[7,10],[7,9]],Pt=[[13,7],[12,7],[11,7],[10,7],[9,7]],v=[0,8,13,21,26,34,39,47];function dt(I,ee){return ee<0?null:ee>=56?I==="red"?[7,6]:I==="green"?[6,7]:I==="yellow"?[7,8]:[8,7]:I==="red"?ee<=50?lt[ee]:jt[ee-51]:I==="green"?ee<=50?lt[(13+ee)%52]:Et[ee-51]:I==="yellow"?ee<=50?lt[(26+ee)%52]:It[ee-51]:ee<=50?lt[(39+ee)%52]:Pt[ee-51]}function He(I,ee){return I!==Ce||!tt||!Ge||!Be||l.status!=="active"?!1:ee.step===-1?Be===6:ee.step>=0&&ee.step+Be<=56}const ct={},N=(I,ee)=>{ee.forEach(he=>{if(he.step>=0&&he.step<56){const Le=dt(I,he.step);if(Le){const Ve=Le[0]+","+Le[1];(ct[Ve]=ct[Ve]||[]).push({color:I,id:he.id,step:he.step,movable:He(I,he)})}}})};V.includes("red")&&N("red",ie),V.includes("green")&&N("green",we),V.includes("yellow")&&N("yellow",se),V.includes("blue")&&N("blue",me);const pt={};lt.forEach(([I,ee],he)=>{pt[I+","+ee]=he});const De={};jt.forEach(([I,ee],he)=>{De[I+","+ee]=he+1});const Ke={};Et.forEach(([I,ee],he)=>{Ke[I+","+ee]=he+1});const Mt={};It.forEach(([I,ee],he)=>{Mt[I+","+ee]=he+1});const Ue={};Pt.forEach(([I,ee],he)=>{Ue[I+","+ee]=he+1});const Ct=[];for(let I=0;I<15;I++)for(let ee=0;ee<15;ee++){if(I<6&&ee<6||I<6&&ee>8||I>8&&ee<6||I>8&&ee>8||I>=6&&I<=8&&ee>=6&&ee<=8)continue;const he=I+","+ee,Le=pt[he],Ve=Le!==void 0&&v.includes(Le),rt=I===6&&ee===1,at=I===1&&ee===8,ut=I===8&&ee===13,Nt=I===13&&ee===6,Xt=De[he],Bt=Ke[he],Zt=Mt[he],qe=Ue[he];let u="ludo-cell";rt?u+=" cell-red-start":at?u+=" cell-green-start":ut?u+=" cell-yellow-start":Nt?u+=" cell-blue-start":Xt?u+=" cell-red-stretch":Bt?u+=" cell-green-stretch":Zt?u+=" cell-yellow-stretch":qe?u+=" cell-blue-stretch":Ve&&(u+=" cell-safe-star");const y=ct[he]||[];Ct.push(`
            <div class="${u}" style="grid-row:${I+1};grid-column:${ee+1}" data-pos="${he}">
              ${Ve?'<span class="cell-star-glyph">⭐</span>':""}
              ${rt||at||ut||Nt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${y.map(m=>`
                <div class="ludo-token token-${m.color} ${m.movable?"movable":""}" data-token-id="${m.id}" data-color="${m.color}" title="${m.color.toUpperCase()} Pawn ${m.id+1}">
                  <span>${m.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}const Lt=["","⚀","⚁","⚂","⚃","⚄","⚅"];function Z(I){return!I||I.step===-1?"Base":I.step===56?"🏁 Home!":I.step>50?`H${I.step-50}`:`S${I.step}`}function wt(I,ee,he,Le,Ve){const rt=`${I}-yard`;return he?`
          <div class="ludo-yard ${rt} ${Qe===I?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${ee}</span>
                ${Le?`<small class="yard-player-lbl">${$(Le.name)}${Le.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${Ve.map((at,ut)=>`
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
            ${wt("yellow","🟡 Yellow Base",V.includes("yellow"),zt,se)}

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
                  ${se.filter(I=>I.step===56).map(I=>`<span class="tok-finished yellow" title="Yellow Pawn ${I.id+1} Home">🟡${I.id+1}</span>`).join("")}
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
              ${tt&&!Ge&&l.status==="active"?`
                <button class="btn-ludo-roll pulse" id="btn-ludo-roll">🎲 Roll Dice</button>
              `:tt&&Ge&&l.status==="active"?`
                <div class="ludo-prompt-text highlight">
                  ${H(Ce).some(I=>He(Ce,I))?"👉 Tap your <strong>glowing pawn</strong> to advance!":"No moves possible with this roll. Turn passing..."}
                </div>
              `:`
                <div class="ludo-prompt-text">
                  ${l.status==="active"?`⏳ Waiting for ${$(((Rt=te.find(I=>I.color===Qe))==null?void 0:Rt.name)||"opponent")} (${Qe.toUpperCase()})...`:"🏁 Match Concluded"}
                </div>
              `}

              <div class="ludo-status-banner">
                ${$(F.lastActionText||"Match in progress.")}
              </div>
            </div>
          </div>

          <!-- Token Progress Strip for all active players -->
          <div class="ludo-progress-strip">
            ${V.map(I=>{const ee=te.find(Ve=>Ve.color===I),he=H(I),Le={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[I];return`
                <div class="progress-pill ${I} ${Qe===I?"active-turn":""}">
                  <strong>${Le} ${ee?$(ee.name):I.toUpperCase()}:</strong>
                  ${he.map((Ve,rt)=>`P${rt+1}: ${Z(Ve)}`).join(" · ")}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function pe(X,ge,J){var we;b.querySelector("#btn-close-arena").onclick=A;const F=b.querySelector("#btn-arena-resign");F&&(F.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{F.disabled=!0,await $e(`/bonding/matches/${g}/action`,{action:"resign"}),await q(),W()}catch(se){S(se.message||"Resign failed","error"),F.disabled=!1}});const V=b.querySelector("#btn-arena-draw");V&&(V.onclick=async()=>{try{await $e(`/bonding/matches/${g}/action`,{action:"offer_draw"}),S("Draw offer sent to opponent","info"),await q(),W()}catch(se){S(se.message||"Draw offer failed","error")}});const te=b.querySelector("#btn-confirm-accept-draw");te&&(te.onclick=async()=>{try{await $e(`/bonding/matches/${g}/action`,{action:"accept_draw"}),S("Draw agreed!","info"),await q(),W()}catch(se){S(se.message,"error")}});const R=b.querySelector("#btn-confirm-decline-draw");R&&(R.onclick=async()=>{try{await $e(`/bonding/matches/${g}/action`,{action:"decline_draw"}),await q(),W()}catch(se){S(se.message,"error")}}),[b.querySelector("#btn-arena-delete-match"),b.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(se=>{se.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{se.disabled=!0,await We(`/bonding/matches/${g}`),S("Match deleted","success"),A(),o==="lounge_games"&&await s()}catch(me){S(me.message||"Failed to delete match","error"),se.disabled=!1}}});const ie=b.querySelector("#btn-arena-rematch-action");if(ie&&(ie.onclick=async()=>{try{ie.disabled=!0,ie.textContent="Creating Rematch...";const se=await $e(`/bonding/matches/${g}/action`,{action:"rematch"});se.match&&(S("Rematch created! New match live ⚔️","success"),E&&clearInterval(E),O(se.match._id))}catch(se){S(se.message||"Rematch failed","error"),ie.disabled=!1,ie.textContent="🔄 Request Rematch"}}),l.gameType==="chess"&&X&&l.status==="active"){const se=((we=l.gameState)==null?void 0:we.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",me=new va(se),Se=J.assignedRole==="white"?"w":"b";b.querySelectorAll(".chess-sq").forEach(Ae=>{Ae.onclick=async()=>{const Ce=Ae.dataset.square;if(p){if(p===Ce){p=null,h=[],W();return}if(h.includes(Ce)){const tt=me.get(p);let Ge;tt&&tt.type==="p"&&(Ce.endsWith("8")||Ce.endsWith("1"))&&(Ge=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const Be={from:p,to:Ce,promotion:Ge?Ge.toLowerCase():void 0};p=null,h=[],l=await $e(`/bonding/matches/${g}/move`,{move:Be}),W()}catch(Be){S(Be.message||"Illegal chess move","error"),p=null,h=[],W()}return}}const Qe=me.get(Ce);Qe&&Qe.color===Se?(p=Ce,h=me.moves({square:Ce,verbose:!0}).map(Ge=>Ge.to),W()):(p=null,h=[],W())}})}if(l.gameType==="tictactoe"&&X&&l.status==="active"&&b.querySelectorAll(".ttt-cell.empty").forEach(se=>{se.onclick=async()=>{const me=se.dataset.cellIdx;try{se.style.opacity="0.5",l=await $e(`/bonding/matches/${g}/move`,{cellIndex:Number(me)}),W()}catch(Se){S(Se.message||"Invalid move","error")}}}),l.gameType==="ludo"&&l.status==="active"){const se=b.querySelector("#btn-ludo-roll");se&&X&&(se.onclick=async()=>{try{se.disabled=!0,se.textContent="Rolling 🎲...",l=await $e(`/bonding/matches/${g}/move`,{action:"roll"}),W()}catch(me){S(me.message||"Failed to roll","error"),se.disabled=!1,se.textContent="🎲 Roll Dice"}}),X&&b.querySelectorAll(".ludo-token.movable").forEach(me=>{me.onclick=async Se=>{Se.stopPropagation();const Ae=me.dataset.tokenId;try{me.style.opacity="0.5",l=await $e(`/bonding/matches/${g}/move`,{action:"move",tokenId:Number(Ae)}),W()}catch(Ce){S(Ce.message||"Invalid token move","error"),me.style.opacity="1"}}})}}W()}function T(){if(!r||r.type==="direct")return;const g=i.querySelector("#bonding-modals-root"),b=U=>U==="employee"||U==="admin"||U==="superadmin",l=r.members||[],p=new Set(l.map(U=>{var G;return(G=U.userId)==null?void 0:G.toString()})),h=f.filter(U=>b(U.role)&&!p.has(U._id.toString()));g.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${$(r.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${h.map(U=>`
                    <option value="${U._id}">${$(U.name)} (${$(U.role==="superadmin"?"Superadmin":U.role==="admin"?"Admin":"Employee")})</option>
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
              <label class="bonding-form-label">Current Members (${l.length}):</label>
              <div class="bonding-members-list">
                ${l.map(U=>{const G=(e==null?void 0:e._id)||(e==null?void 0:e.id),M=G&&U.userId&&U.userId.toString()===G.toString();return`
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
    `,g.querySelector(".bonding-modal-close").onclick=()=>{g.innerHTML=""};const q=g.querySelector("#btn-modal-delete-group");q&&(q.onclick=()=>{g.innerHTML="",B()});const A=g.querySelector("#btn-submit-add-member");A&&(A.onclick=async()=>{const G=g.querySelector("#sel-add-colleague").value;if(!G){S("Please select a colleague to add","warning");return}try{A.disabled=!0,A.textContent="Adding...";const M=await Wt(`/bonding/channels/${r._id}/members`,{action:"add",userIds:[G]});S("Colleague added to group! 🎉","success"),r=M.channel,g.innerHTML="",await Te(r._id),je()}catch(M){S(M.message||"Failed to add member","error"),A.disabled=!1,A.textContent="Add to Group"}}),g.querySelectorAll(".btn-remove-member").forEach(U=>{U.onclick=async()=>{const G=U.dataset.userId,M=U.dataset.name;if(confirm(`Are you sure you want to remove ${M} from this group?`))try{U.disabled=!0;const pe=await Wt(`/bonding/channels/${r._id}/members`,{action:"remove",userId:G});S(`${M} removed from group`,"info"),r=pe.channel,g.innerHTML="",await Te(r._id),je()}catch(pe){S(pe.message||"Failed to remove member","error"),U.disabled=!1}}})}async function B(){if(!r||r.type==="direct")return;const g=r.name;if(confirm(`Are you sure you want to delete the group "${g}"?

All messages in this lounge will be deleted.`))try{await We(`/bonding/channels/${r._id}`),S(`Group "${g}" deleted successfully`,"success"),d=await Re("/bonding/channels").catch(()=>[]),r=d.find(l=>l.type==="group")||d[0]||null,Fe(),je(),r&&await Te(r._id)}catch(l){S(l.message||"Failed to delete group","error")}}function z(){const g=i.querySelector("#bonding-modals-root"),b=h=>h==="employee"||h==="admin"||h==="superadmin",l=f.filter(h=>!h.isSelf&&b(h.role));g.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${l.map(h=>`
                <div class="bonding-user-pick-item" data-user-id="${h._id}" data-name="${$(h.name)}">
                  <div class="bonding-member-avatar">${h.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${$(h.name)}</span>
                    <span class="user-pick-role">${$(h.role==="superadmin"?"Superadmin":h.role==="admin"?"Admin":"Employee")} · ${$(h.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,g.querySelector(".bonding-modal-close").onclick=()=>{g.innerHTML=""},g.querySelectorAll(".bonding-user-pick-item").forEach(h=>{h.onclick=async()=>{const q=h.dataset.userId;try{const A=await $e("/bonding/channels",{type:"direct",targetUserId:q});g.innerHTML="",d=await Re("/bonding/channels"),r=d.find(W=>W._id===A._id)||A,Fe(),je(),await Te(r._id)}catch(A){S(A.message||"Failed to open personal chat","error")}}})}function x(){const g=i.querySelector("#bonding-modals-root"),b=A=>A==="employee"||A==="admin"||A==="superadmin",l=f.filter(A=>!A.isSelf&&b(A.role));g.innerHTML=`
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
                ${l.map(A=>`
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
    `,g.querySelector(".bonding-modal-close").onclick=()=>{g.innerHTML=""},g.querySelector("#btn-cancel-create-grp").onclick=()=>{g.innerHTML=""};let p="👥";const h=g.querySelectorAll(".avatar-opt");h.forEach(A=>{A.onclick=()=>{h.forEach(W=>W.classList.remove("active")),A.classList.add("active"),p=A.textContent.trim()}});const q=g.querySelector("#btn-confirm-create-grp");q.onclick=async()=>{const A=g.querySelector("#new-group-name"),W=g.querySelector("#new-group-desc"),U=A.value.trim();if(!U){S("Please enter a group name","warning"),A.focus();return}const G=g.querySelectorAll(".new-group-member-chk:checked"),M=Array.from(G).map(pe=>pe.value);try{q.disabled=!0,q.textContent="Creating...";const pe=await $e("/bonding/channels",{type:"group",name:U,description:W.value.trim(),avatar:p,memberIds:M});S(`Group "${U}" created! 🎉`,"success"),g.innerHTML="",d=await Re("/bonding/channels"),r=d.find(X=>X._id===pe._id)||pe,Fe(),je(),await Te(r._id)}catch(pe){S(pe.message||"Failed to create group","error"),q.disabled=!1,q.textContent="Create Group 🎉"}}}function de(g,b){const l=document.querySelector(".bonding-emoji-popup");l&&l.remove();const p=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],h=document.createElement("div");h.className="bonding-emoji-popup",h.innerHTML=p.map(W=>`<button class="emoji-opt-btn" data-e="${W}">${W}</button>`).join("");const q=g.getBoundingClientRect();h.style.top=`${q.bottom+window.scrollY+6}px`,h.style.left=`${q.left+window.scrollX}px`,document.body.appendChild(h),h.querySelectorAll(".emoji-opt-btn").forEach(W=>{W.onclick=U=>{U.stopPropagation(),b(W.dataset.e),h.remove()}});const A=W=>{h.contains(W.target)||(h.remove(),document.removeEventListener("click",A))};setTimeout(()=>document.addEventListener("click",A),10)}function oe(g){if(!g)return"";try{return new Date(g).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Ya(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}const da=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],yt=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Tt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ei(i,t={}){const{userRole:e="employee",currentUser:o=null,initialTicketId:d=null}=t,r=e==="superadmin"||e==="admin";if(e==="client"||o&&o.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let f=[],n={},w=[],P=[],_={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",myIssuesOnly:!1},D=null,E="comments",Y=!1;i.innerHTML=`
    <div class="jira-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="jira-header-bar">
        <div class="jira-header-left">
          <div class="jira-breadcrumb">
            <span class="jira-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${r?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="jira-title-row">
            <h2 class="jira-main-title">🎫 ${r?"Support Tickets Board":"My Support Tickets"}</h2>
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

          ${r?`
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
  `,await Promise.all([Ie(),ve(),ot(),nt()]),Te(),Fe(),st(),Ze(),d&&et(d);const Q=setInterval(()=>{if(!document.contains(i)){clearInterval(Q);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!D&&be()},12e3),ke=()=>{document.contains(i)&&!D&&be()};window.addEventListener("focus",ke);async function ve(){try{const a=new URLSearchParams;_.search&&a.set("search",_.search),_.priority!=="all"&&a.set("priority",_.priority),_.category!=="all"&&a.set("category",_.category),_.assigneeId!=="all"&&a.set("assigneeId",_.assigneeId),_.myIssuesOnly&&a.set("myIssuesOnly","true");const s=await Re("/tickets?"+a.toString());f=Array.isArray(s)?s:[]}catch(a){S(a.message||"Failed to load tickets",!0),f=[]}}async function Ie(){try{n=await Re("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function ot(){try{w=(await Re("/users")||[]).filter(s=>s.active&&s.role!=="client")}catch(a){console.warn("Could not fetch employees:",a)}}async function nt(){try{const a=await Re("/jobs?limit=50");P=Array.isArray(a)?a:(a==null?void 0:a.jobs)||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function Te(){const a=i.querySelector("#jira-stats-root");a&&(a.innerHTML=`
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
    `,a.querySelectorAll(".jira-stat-card").forEach(s=>{s.onclick=async()=>{const k=s.dataset.statFilter;k==="all"?(_.status="all",_.priority="all"):k==="critical"?(_.priority="Critical",_.status="all"):(_.status=k,_.priority="all"),await be()}}))}function st(){const a=i.querySelector("#jira-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${w.map(s=>`
          <option value="${s._id}" ${_.assigneeId===s._id.toString()?"selected":""}>
            ${$(s.name)} (${$(s.role)})
          </option>
        `).join("")}
      `)}function Fe(){const a=i.querySelector("#jira-board-columns-root");if(!a)return;const s={};da.forEach(k=>{s[k.key]=[]}),f.forEach(k=>{let L=k.status||"To Do";L==="In Progress"?L="Content":L==="Resolved"?L="Under Review":L==="Closed"&&(L="Ready to Leave"),s[L]||(s[L]=[]),s[L].push(k)}),a.innerHTML=da.map(k=>{const L=s[k.key]||[];return`
        <div class="jira-board-column" data-status="${k.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${$(k.label)}</span>
              <span class="jira-col-badge">${L.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${k.key}">
            ${L.length===0?`
              <div style="padding:28px 10px;text-align:center;color:#475569;font-size:12px;font-style:italic;">
                No tickets
              </div>
            `:L.map(K=>ht(K)).join("")}
          </div>
        </div>
      `}).join(""),je(),Xe()}function ht(a){var z;const s=yt.find(x=>x.key===a.category)||yt[0],k=Tt.find(x=>x.key===a.priority)||Tt[2],L=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",K=(a.subtasks||[]).filter(x=>x.completed).length,O=(a.subtasks||[]).length,T=((z=a.assignee)==null?void 0:z.name)||"Unassigned",B=(T==="Unassigned"?"?":T.slice(0,1)).toUpperCase();return`
      <div class="jira-card" draggable="true" data-ticket-id="${a._id}">
        <div class="jira-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="jira-category-pill ${s.slug}">
              ${s.icon} ${s.label}
            </span>
            ${a.dueDate?`
              <span class="jira-due-pill ${L?"overdue":""}" title="Due Date">
                ${L?"⚠️ ":"📅 "}
                ${new Date(a.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          <button type="button" class="jira-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${$(a.ticketId)}" title="Delete Ticket">
            🗑️
          </button>
        </div>

        <div class="jira-card-title" title="${$(a.title)}">
          ${$(a.title)}
        </div>

        <div class="jira-card-bottom">
          <div class="jira-card-id-row">
            <span class="jira-pri-icon" title="Priority: ${k.label}">${k.icon}</span>
            <span class="jira-ticket-id">${$(a.ticketId)}</span>
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
    `}function je(){const a=i.querySelectorAll(".jira-card"),s=i.querySelectorAll(".jira-board-column");a.forEach(k=>{k.ondragstart=L=>{L.dataTransfer.setData("text/plain",k.dataset.ticketId),k.classList.add("dragging")},k.ondragend=()=>{k.classList.remove("dragging")}}),s.forEach(k=>{k.ondragover=L=>{L.preventDefault(),k.classList.add("drag-over")},k.ondragleave=()=>{k.classList.remove("drag-over")},k.ondrop=async L=>{L.preventDefault(),k.classList.remove("drag-over");const K=L.dataTransfer.getData("text/plain"),O=k.dataset.status;if(!K||!O)return;const T=f.find(z=>z._id.toString()===K);if(!T||T.status===O)return;const B=T.status;T.status=O,Fe();try{const z=await Je(`/tickets/${K}/status`,{status:O});S(`Moved ${z.ticketId} to ${O}`,!1),await be()}catch(z){S(z.message||"Status update failed",!0),T.status=B,await be()}}})}function Xe(){i.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async s=>{s.stopPropagation(),s.preventDefault();const k=a.dataset.ticketId,L=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${L}?`)){a.disabled=!0;try{await We(`/tickets/${k}`),S(`Ticket ${L} deleted`,!1),await be()}catch(K){S(K.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),i.querySelectorAll(".jira-card").forEach(a=>{a.onclick=s=>{if(s.target.tagName==="A"||s.target.closest(".btn-delete-card-ticket"))return;const k=a.dataset.ticketId;et(k)}})}function Ze(){const a=i.querySelector("#btn-jira-refresh");a&&(a.onclick=async()=>{a.classList.add("pulse"),await be(),S("Board updated",!1),a.classList.remove("pulse")});const s=i.querySelector("#btn-jira-create-ticket");s&&(s.onclick=()=>{j()});const k=i.querySelector("#jira-search-input");let L=null;k&&(k.oninput=x=>{clearTimeout(L),L=setTimeout(async()=>{_.search=x.target.value.trim(),Ne(),await be()},300)});const K=i.querySelector("#jira-filter-priority");K&&(K.onchange=async x=>{_.priority=x.target.value,Ne(),await be()});const O=i.querySelector("#jira-filter-category");O&&(O.onchange=async x=>{_.category=x.target.value,Ne(),await be()});const T=i.querySelector("#jira-filter-assignee");T&&(T.onchange=async x=>{_.assigneeId=x.target.value,Ne(),await be()});const B=i.querySelector("#jira-pill-my-issues");B&&(B.onclick=async()=>{_.myIssuesOnly=!_.myIssuesOnly,B.classList.toggle("active",_.myIssuesOnly),Ne(),await be()});const z=i.querySelector("#jira-clear-filters");z&&(z.onclick=async()=>{_={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",myIssuesOnly:!1},k&&(k.value=""),K&&(K.value="all"),O&&(O.value="all"),T&&(T.value="all"),B&&B.classList.remove("active"),Ne(),await be()})}function Ne(){const a=i.querySelector("#jira-clear-filters");if(!a)return;const s=_.search||_.priority!=="all"||_.category!=="all"||_.assigneeId!=="all"||_.myIssuesOnly;a.style.display=s?"inline":"none"}async function be(){await ve(),Fe()}async function et(a){const s=i.querySelector("#jira-modals-root");if(s){s.innerHTML=`
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{D=await Re(`/tickets/${a}`)}catch(k){S(k.message||"Could not load ticket",!0),s.innerHTML="";return}ye()}}function ye(){var g,b,l;const a=i.querySelector("#jira-modals-root");if(!a||!D)return;const s=D,k=yt.find(p=>p.key===s.category)||yt[0];Tt.find(p=>p.key===s.priority)||Tt[2];const L=s.subtasks||[],K=L.filter(p=>p.completed).length,O=L.length>0?Math.round(K/L.length*100):0,T=s.attachments||[],B=s.comments||[],z=(s.history||[]).slice().reverse(),x=s.workLogs||[],de=s.linkedTickets||[],oe=(o==null?void 0:o._id)||(o==null?void 0:o.id),fe=s.reporter&&s.reporter.userId&&s.reporter.userId.toString()===(oe==null?void 0:oe.toString()),ce=s.assignee&&s.assignee.userId&&s.assignee.userId.toString()===(oe==null?void 0:oe.toString()),ue=e==="superadmin"||e==="admin";a.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${k.slug}">${k.icon} ${k.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${$(s.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${$(s.title)}" title="Click to edit title" />
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
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${$(s.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${s.description?$(s.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
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
                    ${T.map(p=>`
                      <div class="jira-att-card">
                        <div class="jira-att-left">
                          <span>📎</span>
                          <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${$(p.name)}">
                            ${$(p.name)}
                          </a>
                        </div>
                        <button type="button" class="jira-att-del btn-del-att" data-att-id="${p.id}" title="Delete file">&times;</button>
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>

              <!-- Subtasks Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Subtasks (${K}/${L.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${O}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${O}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${L.map(p=>`
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${p.id}" ${p.completed?"checked":""} />
                        <span class="jira-subtask-title ${p.completed?"done":""}">${$(p.title)}</span>
                      </div>
                      <button type="button" class="jira-att-del btn-del-subtask" data-subtask-id="${p.id}" title="Remove subtask">&times;</button>
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
                  <span>Linked Work Items (${de.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${de.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${de.map(p=>`
                      <div class="jira-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${$(p.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${$(p.ticketId)}</span>
                          <span style="font-size:12.5px;color:#f1f5f9;">${$(p.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${$(p.status||"Open")}</span>
                          <button type="button" class="jira-att-del btn-del-link" data-link-id="${p.id}" title="Remove link">&times;</button>
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
                    Work Log (${x.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${E==="comments"?`
                  <div class="jira-comments-feed">
                    ${B.map(p=>`
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(p.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${$(p.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${$(p.userRole)})</span></span>
                            <span class="jira-comment-time">${ea(p.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${$(p.content)}</div>
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
                ${E==="history"?`
                  <div class="jira-history-feed">
                    ${z.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:z.map(p=>`
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(p.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${$(p.userName)}</span>
                            <span class="jira-comment-time">${ea(p.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong style="color:#cbd5e1;">${$(p.field)}</strong>:
                            ${p.from?`<span style="text-decoration:line-through;color:#ef4444;">${$(p.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${$(p.to)}</span>
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

                    ${x.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:x.map(p=>`
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(p.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${$(p.userName)} logged <strong style="color:#38bdf8;">${$(p.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${ea(p.loggedAt)}</span>
                          </div>
                          ${p.description?`<div style="font-size:12px;color:#cbd5e1;">${$(p.description)}</div>`:""}
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
                  ${da.map(p=>{let h=s.status||"To Do";return h==="In Progress"?h="Content":h==="Resolved"?h="Under Review":h==="Closed"&&(h="Ready to Leave"),`
                      <option value="${p.key}" ${h===p.key?"selected":""}>
                        ${p.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${Tt.map(p=>`
                    <option value="${p.key}" ${s.priority===p.key?"selected":""}>
                      ${p.icon} ${p.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignee -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Assignee</span>
                <select id="sel-detail-assignee" class="jira-select-field">
                  <option value="">Unassigned</option>
                  ${w.map(p=>`
                    <option value="${p._id}" ${s.assignee&&s.assignee.userId&&s.assignee.userId.toString()===p._id.toString()?"selected":""}>
                      ${$(p.name)} (${$(p.role)})
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Reporter (Read Only) -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Reporter</span>
                <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                  <div class="jira-avatar" style="background:#2563eb;">
                    ${(((g=s.reporter)==null?void 0:g.name)||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${$(((b=s.reporter)==null?void 0:b.name)||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${$(((l=s.reporter)==null?void 0:l.role)||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${yt.map(p=>`
                    <option value="${p.key}" ${s.category===p.key?"selected":""}>
                      ${p.icon} ${p.label}
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
                  ${P.map(p=>`
                    <option value="${p._id}" ${s.jobId&&s.jobId.toString()===p._id.toString()?"selected":""}>
                      📁 ${$(p.title||"Untitled Job")}
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
              ${ue||fe||ce?`
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
    `,c()}function c(){const a=i.querySelector("#jira-modals-root");if(!a||!D)return;const s=a.querySelector("#btn-close-jira-modal");s&&(s.onclick=C);const k=a.querySelector("#jira-detail-backdrop");k&&(k.onclick=R=>{R.target===k&&C()});const L=a.querySelector("#inp-detail-title");L&&(L.onchange=async()=>{const R=L.value.trim();if(R)try{D=await Je(`/tickets/${D._id}`,{title:R}),await be()}catch(H){S(H.message||"Failed to update title",!0)}});const K=a.querySelector("#btn-toggle-desc-edit");K&&(K.onclick=()=>{Y=!Y,ye()});const O=a.querySelector("#btn-cancel-desc");O&&(O.onclick=()=>{Y=!1,ye()});const T=a.querySelector("#btn-save-desc");T&&(T.onclick=async()=>{var H;const R=(H=a.querySelector("#inp-detail-desc"))==null?void 0:H.value;try{D=await Je(`/tickets/${D._id}`,{description:R}),Y=!1,ye(),await be(),S("Description saved",!1)}catch(ie){S(ie.message||"Failed to save description",!0)}});const B=a.querySelector("#sel-detail-status");B&&(B.onchange=async R=>{try{const H=await Je(`/tickets/${D._id}/status`,{status:R.target.value});D=H,ye(),await Ie(),Te(),await be(),S(`Status changed to ${H.status}`,!1)}catch(H){S(H.message||"Status change failed",!0)}});const z=a.querySelector("#sel-detail-priority");z&&(z.onchange=async R=>{try{D=await Je(`/tickets/${D._id}`,{priority:R.target.value}),ye(),await be()}catch(H){S(H.message,!0)}});const x=a.querySelector("#sel-detail-assignee");x&&(x.onchange=async R=>{var H;try{const ie=await Je(`/tickets/${D._id}`,{assigneeId:R.target.value||null});D=ie,ye(),await be(),S(`Assigned to ${((H=ie.assignee)==null?void 0:H.name)||"Unassigned"}`,!1)}catch(ie){S(ie.message,!0)}});const de=a.querySelector("#sel-detail-category");de&&(de.onchange=async R=>{try{D=await Je(`/tickets/${D._id}`,{category:R.target.value}),ye(),await be()}catch(H){S(H.message,!0)}});const oe=a.querySelector("#inp-detail-duedate");oe&&(oe.onchange=async R=>{try{D=await Je(`/tickets/${D._id}`,{dueDate:R.target.value||null}),ye(),await be()}catch(H){S(H.message,!0)}});const fe=a.querySelector("#sel-detail-job");fe&&(fe.onchange=async R=>{try{D=await Je(`/tickets/${D._id}`,{jobId:R.target.value||null}),ye(),await be()}catch(H){S(H.message,!0)}});const ce=a.querySelector("#inp-detail-esthours");ce&&(ce.onchange=async R=>{try{D=await Je(`/tickets/${D._id}`,{estimatedHours:Number(R.target.value)||0})}catch(H){S(H.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(R=>{R.onchange=async()=>{const H=R.dataset.subtaskId;try{D=await Je(`/tickets/${D._id}/subtasks/${H}`,{completed:R.checked}),ye(),await be()}catch(ie){S(ie.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(R=>{R.onclick=async()=>{const H=R.dataset.subtaskId;try{D=await We(`/tickets/${D._id}/subtasks/${H}`),ye(),await be()}catch(ie){S(ie.message,!0)}}});const ue=a.querySelector("#inp-new-subtask"),g=a.querySelector("#btn-add-subtask"),b=async()=>{const R=ue==null?void 0:ue.value.trim();if(R)try{D=await $e(`/tickets/${D._id}/subtasks`,{title:R}),ye(),await be()}catch(H){S(H.message,!0)}};g&&(g.onclick=b),ue&&(ue.onkeydown=R=>{R.key==="Enter"&&(R.preventDefault(),b())});const l=a.querySelector("#inp-detail-att-upload");l&&(l.onchange=async R=>{const H=Array.from(R.target.files);if(!H.length)return;S("Uploading attachment(s)...",!1);const ie=[];for(const we of H){const se=new FileReader;await new Promise(me=>{se.onload=async()=>{try{const Se=se.result.split(",")[1],Ae=await $e("/upload",{files:[{name:we.name,data:Se,size:we.size,type:we.type}]});Ae&&Ae.files&&Ae.files[0]&&ie.push({name:Ae.files[0].name||we.name,url:Ae.files[0].url,size:we.size,type:we.type})}catch(Se){console.warn("Upload error for file:",we.name,Se)}me()},se.readAsDataURL(we)})}if(ie.length)try{D=await $e(`/tickets/${D._id}/attachments`,{attachments:ie}),ye(),S("File(s) attached successfully",!1)}catch(we){S(we.message||"Failed to attach file(s)",!0)}}),a.querySelectorAll(".btn-del-att").forEach(R=>{R.onclick=async()=>{const H=R.dataset.attId;try{D=await We(`/tickets/${D._id}/attachments/${H}`),ye()}catch(ie){S(ie.message,!0)}}}),a.querySelectorAll(".jira-act-tab").forEach(R=>{R.onclick=()=>{E=R.dataset.actTab,ye()}});const p=a.querySelector("#inp-new-comment"),h=a.querySelector("#btn-submit-comment");h&&p&&(h.onclick=async()=>{const R=p.value.trim();if(R)try{h.disabled=!0,h.textContent="Saving...",D=await $e(`/tickets/${D._id}/comments`,{content:R}),ye(),S("Comment added",!1)}catch(H){S(H.message||"Failed to add comment",!0)}finally{h.disabled=!1}});const q=a.querySelector("#btn-open-link-dialog"),A=a.querySelector("#jira-link-box"),W=a.querySelector("#btn-cancel-link"),U=a.querySelector("#btn-submit-link"),G=a.querySelector("#inp-link-target"),M=a.querySelector("#sel-link-rel");q&&A&&(q.onclick=()=>{A.style.display="block"}),W&&A&&(W.onclick=()=>{A.style.display="none"}),U&&A&&(U.onclick=async()=>{const R=G==null?void 0:G.value.trim(),H=(M==null?void 0:M.value)||"relates to";if(R)try{U.disabled=!0,D=await $e(`/tickets/${D._id}/links`,{targetTicketId:R,relationship:H}),ye(),S(`Linked with ${R}`,!1)}catch(ie){S(ie.message||"Failed to link ticket",!0)}finally{U.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(R=>{R.onclick=async()=>{const H=R.dataset.linkId;try{D=await We(`/tickets/${D._id}/links/${H}`),ye()}catch(ie){S(ie.message,!0)}}});const pe=a.querySelector("#btn-open-worklog-dialog"),X=a.querySelector("#jira-worklog-box"),ge=a.querySelector("#btn-cancel-worklog"),J=a.querySelector("#btn-submit-worklog"),F=a.querySelector("#inp-worklog-time"),V=a.querySelector("#inp-worklog-desc");pe&&X&&(pe.onclick=()=>{X.style.display="block"}),ge&&X&&(ge.onclick=()=>{X.style.display="none"}),J&&X&&(J.onclick=async()=>{const R=F==null?void 0:F.value.trim(),H=V==null?void 0:V.value.trim();if(!R){S("Enter time spent (e.g. 2h 30m)",!0);return}try{J.disabled=!0,D=await $e(`/tickets/${D._id}/worklogs`,{timeSpent:R,description:H}),ye(),S("Work logged",!1)}catch(ie){S(ie.message||"Failed to log work",!0)}finally{J.disabled=!1}});const te=a.querySelector("#btn-delete-ticket");te&&(te.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${D.ticketId}?`))try{te.disabled=!0,await We(`/tickets/${D._id}`),S(`Ticket ${D.ticketId} deleted`,!1),C(),await Ie(),Te(),await be()}catch(R){S(R.message||"Failed to delete ticket",!0),te.disabled=!1}})}function C(){D=null,Y=!1;const a=i.querySelector("#jira-modals-root");a&&(a.innerHTML="")}function j(){const a=i.querySelector("#jira-modals-root");if(!a)return;a.innerHTML=`
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
                  ${r?'<option value="">Unassigned</option>':""}
                  ${w.map(T=>{const B=o&&String(o._id||o.id)===String(T._id),z=!r&&B?"selected":"";return`
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
    `;const s=()=>{a.innerHTML=""},k=a.querySelector("#btn-close-create-modal");k&&(k.onclick=s);const L=a.querySelector("#btn-cancel-create-ticket");L&&(L.onclick=s);const K=a.querySelector("#jira-create-backdrop");K&&(K.onclick=T=>{T.target===K&&s()});const O=a.querySelector("#btn-submit-create-ticket");O&&(O.onclick=async()=>{var ce,ue,g,b,l,p,h;const T=(ce=a.querySelector("#create-ticket-title"))==null?void 0:ce.value.trim(),B=(ue=a.querySelector("#create-ticket-desc"))==null?void 0:ue.value.trim(),z=((g=a.querySelector("#create-ticket-cat"))==null?void 0:g.value)||"Task",x=((b=a.querySelector("#create-ticket-pri"))==null?void 0:b.value)||"Medium",de=((l=a.querySelector("#create-ticket-assignee"))==null?void 0:l.value)||null,oe=((p=a.querySelector("#create-ticket-duedate"))==null?void 0:p.value)||null,fe=((h=a.querySelector("#create-ticket-job"))==null?void 0:h.value)||null;if(!T){S("Ticket summary / title is required",!0);return}try{O.disabled=!0,O.textContent="Creating...";const q=await $e("/tickets",{title:T,description:B,category:z,priority:x,assigneeId:de,dueDate:oe,jobId:fe});S(`Ticket ${q.ticketId} created! 🎫`,!1),s(),await Ie(),Te(),await be(),et(q._id)}catch(q){S(q.message||"Could not create ticket",!0),O.disabled=!1,O.textContent="Create Ticket 🚀"}})}}export{ei as a,Za as b,Xa as i};
