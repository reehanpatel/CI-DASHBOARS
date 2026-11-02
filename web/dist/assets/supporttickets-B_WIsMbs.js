var wa=Object.defineProperty;var $a=(i,t,e)=>t in i?wa(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Ie=(i,t,e)=>$a(i,typeof t!="symbol"?t+"":t,e);import{c as Ue,h as C,e as x,n as Je,j as Qe,o as Ft,k as Kt,g as je,p as Ht,t as ta,u as ga}from"./api-Ce9AOSOg.js";const ba={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function Sa(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},ba,JSON.parse(i))}catch{}return Object.assign({},ba)}function Ca(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function ot(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),o=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${o}`}function Gt(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const o=e.getFullYear(),d=String(e.getMonth()+1).padStart(2,"0"),l=String(e.getDate()).padStart(2,"0");return`${o}-${d}-${l}`}function jt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function bt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function fa(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function aa(i,t=1){const e=new Date(i+"T00:00:00"),o=e.getDay(),d=(o<t?7:0)+o-t,l=new Date(e);l.setDate(e.getDate()-d);const f=[];for(let n=0;n<7;n++){const _=new Date(l);_.setDate(l.getDate()+n);const E=_.getFullYear(),y=String(_.getMonth()+1).padStart(2,"0"),A=String(_.getDate()).padStart(2,"0");f.push(`${E}-${y}-${A}`)}return f}function _a(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,o=t.createOscillator(),d=t.createGain();o.type="sine",o.frequency.setValueAtTime(523.25,e),o.frequency.exponentialRampToValueAtTime(783.99,e+.15),d.gain.setValueAtTime(.2,e),d.gain.exponentialRampToValueAtTime(.001,e+.35),o.connect(d),d.connect(t.destination),o.start(e),o.stop(e+.35)}catch{}}function ei(i,t={}){const{userRole:e="employee",currentUser:o=null,onNavigate:d=null}=t,l=e==="superadmin"||e==="admin";let f=Sa(),n={selectedDate:ot(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};ja(),_();async function _(){n.loading=!0,E();try{const c=[Ue("/tasks")];l&&c.push(Ue("/personnel").catch(()=>[]));const[j,I]=await Promise.all(c);n.tasks=Array.isArray(j)?j:[],I&&(n.personnelList=Array.isArray(I)?I:[])}catch(c){C("Failed to load planner tasks: "+c.message,!0)}finally{n.loading=!1,Q()}}function E(){i.innerHTML=`
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
    `}function y(c){return n.tasks.filter(j=>{var a;if(j.isDeleted===!0)return!1;if(l&&n.selectedPersonnelId!=="all"){const s=((a=j.personnelId)==null?void 0:a._id)||j.personnelId;if(String(s)!==String(n.selectedPersonnelId))return!1}const I=j.dateStr||(j.dueDate?new Date(j.dueDate).toISOString().slice(0,10):"");return I?I===c:c===ot()})}function A(c,j){if(c.status==="Completed")return!1;const I=c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):"");return I?I<j:!1}function D(c,j){const I=c.length,a=c.filter(W=>W.status==="Completed").length,s=c.filter(W=>W.status==="In Progress").length,k=c.filter(W=>W.status==="Pending"||W.status==="Todo").length,R=c.filter(W=>A(W,j)).length,V=I>0?Math.round(a/I*100):0;return{total:I,completed:a,inProgress:s,pending:k,overdue:R,percent:V}}function Q(){const c=ot(),j=n.selectedDate===c,I=y(n.selectedDate),a=D(I,c);i.innerHTML=`
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
              <span class="date-text" id="displayDateLabel">${jt(n.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${n.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${j?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${l?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${n.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${n.personnelList.map(s=>`
                  <option value="${s._id}" ${n.selectedPersonnelId===String(s._id)?"selected":""}>
                    ${x(s.name)} (${x(s.department||s.role||"Team")})
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
          ${X(I,a)}
        </main>

      </div>
    `,Ee(),dt()}function X(c,j){return n.viewMode==="weekly"?lt():n.viewMode==="report"?rt():Ce(c,j)}function Ce(c,j){const I=ot();let a=c;if(n.filterStatus==="pending"?a=a.filter(s=>s.status==="Pending"||s.status==="Todo"):n.filterStatus==="in_progress"?a=a.filter(s=>s.status==="In Progress"):n.filterStatus==="completed"?a=a.filter(s=>s.status==="Completed"):n.filterStatus==="overdue"&&(a=a.filter(s=>A(s,I))),n.searchQuery){const s=n.searchQuery.toLowerCase();a=a.filter(k=>(k.title||"").toLowerCase().includes(s)||(k.description||"").toLowerCase().includes(s)||(k.category||"").toLowerCase().includes(s))}return a.sort((s,k)=>{if(s.status==="Completed"&&k.status!=="Completed")return 1;if(s.status!=="Completed"&&k.status==="Completed")return-1;const R={Urgent:0,High:1,Medium:2,Low:3};return(R[s.priority]||2)-(R[k.priority]||2)}),`
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
              <button type="button" class="filter-pill ${n.filterStatus==="all"?"active":""}" data-f="all">All (${j.total})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${j.pending})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${j.inProgress})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${j.completed})</button>
              ${j.overdue>0?`
                <button type="button" class="filter-pill overdue ${n.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${j.overdue})</button>
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

        <!-- Inline Quick-Add Card -->
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

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${a.length===0?xe():`
            <div class="ci360-task-list">
              ${a.map(s=>ze(s,I)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function xe(){return`
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
    `}function ze(c,j){var R,V,W,q;const I=c.status==="Completed",a=A(c,j),s=`pri-${(c.priority||"medium").toLowerCase()}`,k=`status-${(c.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${I?"is-completed":""} ${a?"is-overdue":""}" data-id="${c._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${I?"checked":""}" data-action="toggle" data-id="${c._id}" title="${I?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${x(c.title)}</span>
          </div>

          ${c.description?`
            <div class="ci360-task-desc">${x(c.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${s}">
              <span class="badge-dot"></span>
              ${x(c.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${k}">
              ${x(c.status||"Pending")}
            </span>

            <!-- Category -->
            ${c.category?`
              <span class="ci360-badge category-badge">
                #${x(c.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${c.startTime||c.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${c.startTime?x(c.startTime):""}
                   ${c.startTime&&c.dueTime?"–":""}
                   ${c.dueTime?x(c.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${a?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${l&&((R=c.personnelId)!=null&&R.name||(V=c.userId)!=null&&V.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${x(((W=c.personnelId)==null?void 0:W.name)||((q=c.userId)==null?void 0:q.name))}
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
    `}function lt(){const c=aa(n.selectedDate,f.weekStartsOn),j=bt(c[0]),I=bt(c[6]),a=ot();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${j} – ${I}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${c.map(s=>{const k=s===a,R=s===n.selectedDate,V=y(s),W=D(V,a);return`
              <div class="ci360-day-column ${k?"is-today":""} ${R?"is-selected":""}" data-date="${s}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${s}">
                  <div class="day-name">${fa(s)}</div>
                  <div class="day-number">${new Date(s+"T00:00:00").getDate()}</div>
                  ${k?'<span class="today-pill">Today</span>':""}
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
                  ${V.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:V.map(q=>`
                    <div class="ci360-mini-task-card ${q.status==="Completed"?"done":""}" data-id="${q._id}">
                      <button type="button" class="mini-check ${q.status==="Completed"?"checked":""}" data-action="toggle" data-id="${q._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${q._id}">
                        <div class="mini-title">${x(q.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(q.priority||"medium").toLowerCase()}">${q.priority||"Med"}</span>
                          ${q.dueTime?`<span class="mini-time">${x(q.dueTime)}</span>`:""}
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
    `}function rt(){const c=aa(n.selectedDate,f.weekStartsOn),j=jt(c[0]),I=jt(c[6]),a=ot(),s=n.tasks.filter(G=>{if(G.isDeleted===!0)return!1;const N=G.dateStr||(G.dueDate?new Date(G.dueDate).toISOString().slice(0,10):"");return c.includes(N)}),k=s.length,R=s.filter(G=>G.status==="Completed").length,V=s.filter(G=>G.status==="In Progress").length,W=k>0?Math.round(R/k*100):0,q={Urgent:0,High:0,Medium:0,Low:0};return s.forEach(G=>{const N=G.priority||"Medium";q[N]!==void 0&&q[N]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${j} – ${I}</div>
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
            <span class="value" style="font-size:28px;color:var(--green-500)">${R}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${V}</span>
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
                ${c.map(G=>{const N=y(G),w=D(N,a);return`
                    <tr>
                      <td><strong>${fa(G)}</strong></td>
                      <td>${bt(G)}</td>
                      <td>${w.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${w.completed}</td>
                      <td>${w.pending+w.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${w.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${w.percent}%</span>
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
    `}function Ee(){const c=document.getElementById("btnViewDaily"),j=document.getElementById("btnViewWeekly"),I=document.getElementById("btnViewReport");c&&(c.onclick=()=>{n.viewMode="daily",Q()}),j&&(j.onclick=()=>{n.viewMode="weekly",Q()}),I&&(I.onclick=()=>{n.viewMode="report",Q()});const a=document.getElementById("btnPrevDay"),s=document.getElementById("btnNextDay"),k=document.getElementById("btnJumpToday"),R=document.getElementById("hiddenDateInput"),V=document.getElementById("datePickerBadge");a&&(a.onclick=()=>{n.selectedDate=Gt(n.selectedDate,-1),Q()}),s&&(s.onclick=()=>{n.selectedDate=Gt(n.selectedDate,1),Q()}),k&&(k.onclick=()=>{n.selectedDate=ot(),Q()}),V&&R&&(V.onclick=()=>{try{typeof R.showPicker=="function"?R.showPicker():R.focus()}catch{R.focus()}},R.onchange=J=>{J.target.value&&(n.selectedDate=J.target.value,Q())});const W=document.getElementById("admTeamSelect");W&&(W.onchange=J=>{n.selectedPersonnelId=J.target.value,Q()});const q=document.getElementById("btnOpenAddTaskModal");q&&(q.onclick=()=>qe());const G=document.getElementById("btnPlannerActionsMenu"),N=document.getElementById("plannerActionsDropdown");G&&N&&(G.onclick=J=>{J.stopPropagation(),N.classList.toggle("hidden")},document.addEventListener("click",J=>{!N.contains(J.target)&&J.target!==G&&N.classList.add("hidden")}));const w=document.getElementById("btnActionImport");w&&(w.onclick=()=>{N==null||N.classList.add("hidden"),at()});const K=document.getElementById("btnActionExportPng");K&&(K.onclick=()=>{N==null||N.classList.add("hidden"),it()});const ee=document.getElementById("btnActionExportPdf");ee&&(ee.onclick=()=>{N==null||N.classList.add("hidden"),fe()});const de=document.getElementById("btnActionBackup");de&&(de.onclick=()=>{N==null||N.classList.add("hidden"),tt()});const oe=document.getElementById("btnActionSettings");oe&&(oe.onclick=()=>{N==null||N.classList.add("hidden"),ye()})}function dt(c){if(n.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(q=>{q.onclick=()=>{n.filterStatus=q.dataset.f,Q()}});const j=document.getElementById("plannerTaskSearchInp");j&&(j.oninput=q=>{n.searchQuery=q.target.value,Q()});const I=document.getElementById("btnClearSearch");I&&(I.onclick=()=>{n.searchQuery="",Q()});const a=document.getElementById("quickAddTitleInp"),s=document.getElementById("quickAddPriority"),k=document.getElementById("quickAddCategory"),R=document.getElementById("btnQuickAddSubmit"),V=async()=>{const q=((a==null?void 0:a.value)||"").trim();if(!q){C("Please enter a task title",!0),a==null||a.focus();return}try{const G={title:q,dateStr:n.selectedDate,priority:(s==null?void 0:s.value)||f.defaultPriority,category:(k==null?void 0:k.value)||"General",status:"Pending"};l&&n.selectedPersonnelId!=="all"&&(G.personnelId=n.selectedPersonnelId);const N=await je("/tasks",G);n.tasks.unshift(N),C("Task added to today's focus! ✨"),a&&(a.value="",a.focus()),Q()}catch(G){C(G.message,!0)}};R&&(R.onclick=V),a&&(a.onkeydown=q=>{q.key==="Enter"&&V()});const W=document.getElementById("btnEmptyStateImport");W&&(W.onclick=()=>at())}if(n.viewMode==="weekly"){const j=document.getElementById("btnPrevWeek"),I=document.getElementById("btnNextWeek"),a=document.getElementById("btnThisWeek");j&&(j.onclick=()=>{n.selectedDate=Gt(n.selectedDate,-7),Q()}),I&&(I.onclick=()=>{n.selectedDate=Gt(n.selectedDate,7),Q()}),a&&(a.onclick=()=>{n.selectedDate=ot(),Q()}),document.querySelectorAll(".day-col-header").forEach(s=>{s.onclick=()=>{n.selectedDate=s.dataset.date,n.viewMode="daily",Q()}}),document.querySelectorAll('[data-action="add-day"]').forEach(s=>{s.onclick=()=>{qe(null,s.dataset.date)}})}if(n.viewMode==="report"){const j=document.getElementById("btnDownloadWeeklyPdf");j&&(j.onclick=fe)}i.querySelectorAll('[data-action="toggle"]').forEach(j=>{j.onclick=async I=>{I.stopPropagation();const a=j.dataset.id;await Ke(a)}}),i.querySelectorAll('[data-action="edit"]').forEach(j=>{j.onclick=I=>{I.stopPropagation();const a=j.dataset.id,s=n.tasks.find(k=>k._id===a);s&&qe(s)}}),i.querySelectorAll('[data-action="delete"]').forEach(j=>{j.onclick=async I=>{I.stopPropagation();const a=j.dataset.id;await vt(a)}})}async function Ke(c){const j=n.tasks.find(a=>a._id===c);if(!j)return;const I=j.status!=="Completed";try{const a=await Je(`/tasks/${c}/toggle`,{}),s=n.tasks.findIndex(k=>k._id===c);s!==-1&&(n.tasks[s]=a),I?(f.soundEnabled&&_a(),C("Task marked as completed! 🎉")):C("Task reopened as pending."),Q()}catch(a){C(a.message,!0)}}async function vt(c){const j=n.tasks.find(I=>I._id===c);if(j&&confirm(`Are you sure you want to remove "${j.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Qe(`/tasks/${c}`),n.tasks=n.tasks.filter(I=>I._id!==c),C("Task removed from planner (safely stored in database archive)"),Q()}catch(I){C(I.message,!0)}}function qe(c=null,j=null){const I=!!c,a=c?c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):n.selectedDate):j||n.selectedDate,s=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${I?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${x((c==null?void 0:c.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${x((c==null?void 0:c.description)||"")}</textarea>
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
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${x((c==null?void 0:c.category)||"General")}">
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
          ${l?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!c||c!=null&&c.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${n.personnelList.map(G=>{var w;const N=((w=c==null?void 0:c.personnelId)==null?void 0:w._id)===G._id||(c==null?void 0:c.personnelId)===G._id;return`<option value="${G._id}" ${N?"selected":""}>${x(G.name)} (${x(G.department||G.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
            <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
              ${I?"Save Changes":"Create Task"}
            </button>
          </div>
        </form>
      </div>
    `,k=Ft(s),R=k.querySelector("#taskForm"),V=k.querySelector("#btnModalClose"),W=k.querySelector("#btnCancelModal"),q=()=>k.remove();V&&(V.onclick=q),W&&(W.onclick=q),R.onsubmit=async G=>{var S;G.preventDefault();const N=k.querySelector("#taskTitle").value.trim(),w=k.querySelector("#taskDesc").value.trim(),K=k.querySelector("#taskDate").value,ee=k.querySelector("#taskStartTime").value.trim(),de=k.querySelector("#taskDueTime").value.trim(),oe=k.querySelector("#taskPriority").value,J=k.querySelector("#taskStatus").value,g=k.querySelector("#taskCategory").value.trim()||"General";if(!N){C("Task title is required",!0);return}const b={title:N,description:w,dateStr:K,startTime:ee,dueTime:de,priority:oe,status:J,category:g};if(l){const m=(S=k.querySelector("#taskAssignee"))==null?void 0:S.value;m==="all"?(b.assignAll=!0,b.personnelId="all"):m&&(b.personnelId=m)}const r=k.querySelector("#btnSaveTask");r.disabled=!0,r.textContent="Saving...";try{if(I){const m=await Kt(`/tasks/${c._id}`,b),L=n.tasks.findIndex(T=>T._id===c._id);L!==-1&&(n.tasks[L]=m),C("Task updated successfully! ✍️")}else{const m=await je("/tasks",b);Array.isArray(m.tasks)?m.tasks.forEach(L=>n.tasks.unshift(L)):n.tasks.unshift(m),C("Task created successfully! ✨")}q(),Q()}catch(m){C(m.message,!0),r.disabled=!1,r.textContent=I?"Save Changes":"Create Task"}}}function at(){let c=[];const j=`
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
    `,I=Ft(j),a=()=>I.remove();I.querySelector("#btnImportClose").onclick=a,I.querySelector("#btnCancelImport").onclick=a;const s=I.querySelector("#importTextarea"),k=I.querySelector("#importFileInput"),R=I.querySelector("#importDropzone"),V=I.querySelector("#previewListArea"),W=I.querySelector("#previewCountLabel"),q=I.querySelector("#btnConfirmImport"),G=I.querySelector("#importFileInfo");function N(K){if(!K)return[];const ee=K.split(/\r?\n/),de=[];for(let oe of ee)oe=oe.trim(),oe&&(oe=oe.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),oe=oe.replace(/^[-*•]\s+/,""),oe=oe.replace(/^\d+[\.\)]\s+/,""),oe=oe.trim(),oe&&de.push(oe));return de}function w(){const K=s.value,ee=N(K),de=I.querySelector("#importTargetDate").value,oe=y(de),J=new Set(oe.map(g=>(g.title||"").trim().toLowerCase()));c=[];for(const g of ee){const b=J.has(g.toLowerCase());c.push({title:g,isDuplicate:b})}if(W.textContent=`Preview (${c.length} ${c.length===1?"task":"tasks"} found)`,q.disabled=c.length===0,q.textContent=`Import ${c.length} ${c.length===1?"Task":"Tasks"}`,c.length===0){V.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}V.innerHTML=c.map((g,b)=>`
        <div class="preview-item ${g.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${b+1}.</span>
          <span class="preview-title">${x(g.title)}</span>
          ${g.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}s.oninput=w,R.onclick=()=>k.click(),k.onchange=K=>{const ee=K.target.files[0];if(!ee)return;G.textContent=`File selected: ${ee.name} (${Math.round(ee.size/1024)} KB)`;const de=new FileReader;de.onload=oe=>{s.value=oe.target.result,w()},de.readAsText(ee)},R.ondragover=K=>{K.preventDefault(),R.classList.add("dragover")},R.ondragleave=()=>R.classList.remove("dragover"),R.ondrop=K=>{K.preventDefault(),R.classList.remove("dragover");const ee=K.dataTransfer.files[0];if(ee&&(ee.type==="text/plain"||ee.name.endsWith(".txt"))){G.textContent=`File dropped: ${ee.name}`;const de=new FileReader;de.onload=oe=>{s.value=oe.target.result,w()},de.readAsText(ee)}else C("Please drop a valid .txt plain-text file",!0)},q.onclick=async()=>{if(c.length===0)return;q.disabled=!0,q.textContent="Importing...";const K=I.querySelector("#importTargetDate").value,ee=I.querySelector("#importPriority").value,de=I.querySelector("#importCategory").value.trim()||"General",oe={date:K,tasks:c.map(J=>({title:J.title,priority:ee,category:de,status:"Pending"}))};l&&n.selectedPersonnelId!=="all"&&(oe.personnelId=n.selectedPersonnelId);try{const J=await je("/tasks/bulk-import",oe);Array.isArray(J.tasks)&&J.tasks.forEach(g=>n.tasks.unshift(g)),C(`Imported ${J.importedCount} tasks successfully! (${J.skippedCount} skipped duplicates)`),a(),n.selectedDate=K,Q()}catch(J){C(J.message,!0),q.disabled=!1,q.textContent="Retry Import"}}}async function it(){const c=y(n.selectedDate),j=D(c,ot()),I=jt(n.selectedDate),a=2,s=800,k=160,R=90,V=65,W=70,q=Math.max(120,c.length*V),G=k+R+q+W,N=document.createElement("canvas");N.width=s*a,N.height=G*a;const w=N.getContext("2d");w.scale(a,a);const K=document.documentElement.getAttribute("data-theme")==="dark",ee=K?"#0F172A":"#F8FAFC",de=K?"#1E293B":"#FFFFFF",oe=K?"#334155":"#E2E8F0",J=K?"#F8FAFC":"#0F172A",g=K?"#94A3B8":"#475569",b="#4F46E5",r="#10B981",S="#F59E0B";w.fillStyle=ee,w.fillRect(0,0,s,G),w.fillStyle=de,Re(w,24,20,s-48,k-30,16),w.fill(),w.strokeStyle=oe,w.lineWidth=1,w.stroke(),w.fillStyle=b,w.font="bold 12px Inter, sans-serif",w.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),w.fillStyle=J,w.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',w.fillText(I,44,86),w.fillStyle=g,w.font="13px Inter, sans-serif",w.fillText(`Planned focus list · ${j.completed} of ${j.total} tasks completed (${j.percent}%)`,44,114);const m=k+6;w.fillStyle=de,Re(w,24,m,s-48,R-16,12),w.fill(),w.stroke();const L=[{label:"TOTAL TASKS",val:String(j.total),color:J},{label:"COMPLETED",val:String(j.completed),color:r},{label:"IN PROGRESS",val:String(j.inProgress),color:S},{label:"PENDING",val:String(j.pending),color:g},{label:"PROGRESS",val:`${j.percent}%`,color:b}],T=(s-48)/L.length;L.forEach((z,P)=>{const se=24+P*T+20;w.fillStyle=z.color,w.font="bold 20px Inter, sans-serif",w.fillText(z.val,se,m+36),w.fillStyle=g,w.font="10px Inter, sans-serif",w.fillText(z.label,se,m+54)});const O=m+R;w.fillStyle=de,Re(w,24,O,s-48,q+10,16),w.fill(),w.stroke(),c.length===0?(w.fillStyle=g,w.font="14px Inter, sans-serif",w.textAlign="center",w.fillText("No scheduled tasks recorded for this date.",s/2,O+60),w.textAlign="left"):c.forEach((z,P)=>{const se=O+16+P*V,te=z.status==="Completed";w.beginPath(),w.arc(48,se+14,10,0,Math.PI*2),te?(w.fillStyle=r,w.fill(),w.strokeStyle="#FFFFFF",w.lineWidth=2,w.beginPath(),w.moveTo(44,se+14),w.lineTo(47,se+17),w.lineTo(52,se+11),w.stroke()):(w.strokeStyle=oe,w.lineWidth=2,w.stroke()),w.fillStyle=te?g:J,w.font=`${te?"normal":"500"} 14px Inter, sans-serif`;const pe=z.title.length>55?z.title.slice(0,52)+"...":z.title;if(w.fillText(pe,70,se+18),te){const he=w.measureText(pe);w.strokeStyle=g,w.lineWidth=1.2,w.beginPath(),w.moveTo(70,se+14),w.lineTo(70+he.width,se+14),w.stroke()}const Z=z.priority||"Medium";let H="#E2E8F0",Y="#334155";Z==="Urgent"?(H="#FEE2E2",Y="#DC2626"):Z==="High"?(H="#FEF3C7",Y="#D97706"):Z==="Low"&&(H="#ECFDF5",Y="#059669"),w.fillStyle=H,Re(w,s-150,se+4,60,20,10),w.fill(),w.fillStyle=Y,w.font="bold 10px Inter, sans-serif",w.fillText(Z,s-138,se+18);const ne=z.dueTime?`🕒 ${z.dueTime}`:z.category||"General";w.fillStyle=g,w.font="11px Inter, sans-serif",w.fillText(ne,70,se+34),P<c.length-1&&(w.strokeStyle=oe,w.lineWidth=.6,w.beginPath(),w.moveTo(40,se+48),w.lineTo(s-40,se+48),w.stroke())});const u=G-35;w.fillStyle=g,w.font="11px Inter, sans-serif",w.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,u);try{const z=N.toDataURL("image/png"),P=document.createElement("a");P.href=z,P.download=`ci360-daily-planner-${n.selectedDate}.png`,document.body.appendChild(P),P.click(),P.remove(),C("Daily Planner image exported! 🖼️")}catch(z){C("Failed to export image: "+z.message,!0)}}function Re(c,j,I,a,s,k){c.beginPath(),c.moveTo(j+k,I),c.lineTo(j+a-k,I),c.quadraticCurveTo(j+a,I,j+a,I+k),c.lineTo(j+a,I+s-k),c.quadraticCurveTo(j+a,I+s,j+a-k,I+s),c.lineTo(j+k,I+s),c.quadraticCurveTo(j,I+s,j,I+s-k),c.lineTo(j,I+k),c.quadraticCurveTo(j,I,j+k,I),c.closePath()}function fe(){const c=aa(n.selectedDate,f.weekStartsOn),j=jt(c[0]),I=jt(c[6]);ot();const a=n.tasks.filter(q=>{if(q.isDeleted===!0)return!1;const G=q.dateStr||(q.dueDate?new Date(q.dueDate).toISOString().slice(0,10):"");return c.includes(G)}),s=a.length,k=a.filter(q=>q.status==="Completed").length,R=s>0?Math.round(k/s*100):0,V=window.open("","_blank");if(!V){C("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const W=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${j}</title>
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
            <div class="period">${j} – ${I}</div>
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
            <div class="kpi-num" style="color:#4f46e5">${R}%</div>
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
            ${c.map(q=>{const G=y(q);return G.length===0?`<tr><td><strong>${bt(q)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:G.map(N=>`
                <tr>
                  <td><strong>${bt(q)}</strong></td>
                  <td>${x(N.title)}</td>
                  <td><span class="badge badge-${(N.priority||"medium").toLowerCase().slice(0,3)}">${N.priority||"Medium"}</span></td>
                  <td>${x(N.category||"General")}</td>
                  <td>${N.dueTime||N.startTime||"—"}</td>
                  <td class="${N.status==="Completed"?"done":""}">${N.status||"Pending"}</td>
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
    `;V.document.write(W),V.document.close(),C("Weekly PDF report generated for printing! 📄")}function tt(){const j=Ft(`
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
    `),I=()=>j.remove();j.querySelector("#btnBackupClose").onclick=I;const a=j.querySelector("#btnDownloadBackupJson");a.onclick=async()=>{a.disabled=!0,a.textContent="Generating backup...";try{const q=await Ue("/tasks/backup"),G=new Blob([JSON.stringify(q,null,2)],{type:"application/json"}),N=URL.createObjectURL(G),w=document.createElement("a");w.href=N,w.download=`ci360-planner-backup-${ot()}.json`,document.body.appendChild(w),w.click(),w.remove(),C("Planner backup downloaded successfully! 💾")}catch(q){C("Backup export failed: "+q.message,!0)}finally{a.disabled=!1,a.textContent="Download JSON Backup"}};const s=j.querySelector("#restoreFileInput"),k=j.querySelector("#restorePreviewArea"),R=j.querySelector("#restoreCountText"),V=j.querySelector("#btnExecuteRestore");let W=null;s.onchange=q=>{const G=q.target.files[0];if(!G)return;const N=new FileReader;N.onload=w=>{try{const K=JSON.parse(w.target.result),ee=Array.isArray(K.tasks)?K.tasks:Array.isArray(K)?K:null;if(!ee||ee.length===0){C("Invalid backup file: No tasks found",!0);return}W=ee,k.style.display="block",R.textContent=`Valid backup: ${ee.length} tasks ready to restore.`,V.disabled=!1}catch(K){C("Error parsing JSON backup file: "+K.message,!0),k.style.display="none",V.disabled=!0}},N.readAsText(G)},V.onclick=async()=>{var G;if(!W||W.length===0)return;V.disabled=!0,V.textContent="Restoring...";const q=((G=j.querySelector('input[name="restoreMode"]:checked'))==null?void 0:G.value)||"merge";try{const N=await je("/tasks/restore",{tasks:W,mode:q});C(`Restored ${N.restoredCount} tasks! (${N.skippedCount} skipped) ✨`),I(),await _()}catch(N){C("Restore failed: "+N.message,!0),V.disabled=!1,V.textContent="Retry Restore"}}}function ye(){const c=`
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
    `,j=Ft(c),I=()=>j.remove();j.querySelector("#btnSettingsClose").onclick=I,j.querySelector("#btnCancelSettings").onclick=I,j.querySelector("#settingsForm").onsubmit=a=>{a.preventDefault(),f.displayName=j.querySelector("#setDisplayName").value.trim()||"Daily Planner",f.weekStartsOn=Number(j.querySelector("#setWeekStart").value),f.defaultPriority=j.querySelector("#setDefaultPriority").value,f.density=j.querySelector("#setDensity").value,f.soundEnabled=j.querySelector("#setSound").checked,Ca(f),C("Planner preferences saved! ⚙️"),I(),Q()}}}function ja(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
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
  `,document.head.appendChild(i)}function Aa(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function Ta(i,t,e,o,d){const l={move:i,variations:d};return t&&(l.suffix=t),e&&(l.nag=e),o!==null&&(l.comment=o),l}function Ia(...i){const[t,...e]=i;let o=t;for(const d of e)d!==null&&(o.variations=[d,...d.variations],d.variations=[],o=d);return t}function Ea(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const o=e.variations[0];if(!o){e.comment=t.marker.comment;break}e=o}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Da(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function At(i,t,e,o){var d=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(d,At.prototype),d.expected=t,d.found=e,d.location=o,d.name="SyntaxError",d}Da(At,Error);function ia(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}At.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,o;for(o=0;o<i.length;o++)if(i[o].source===this.location.source){e=i[o].text.split(/\r\n|\n|\r/g);break}var d=this.location.start,l=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(d):d,f=this.location.source+":"+l.line+":"+l.column;if(e){var n=this.location.end,_=ia("",l.line.toString().length," "),E=e[d.line-1],y=d.line===n.line?n.column:E.length+1,A=y-d.column||1;t+=`
 --> `+f+`
`+_+` |
`+l.line+" | "+E+`
`+_+" | "+ia("",d.column-1," ")+ia("",A,"^")}else t+=`
 at `+f}return t};At.buildMessage=function(i,t){var e={literal:function(E){return'"'+d(E.text)+'"'},class:function(E){var y=E.parts.map(function(A){return Array.isArray(A)?l(A[0])+"-"+l(A[1]):l(A)});return"["+(E.inverted?"^":"")+y.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(E){return E.description}};function o(E){return E.charCodeAt(0).toString(16).toUpperCase()}function d(E){return E.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(y){return"\\x0"+o(y)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(y){return"\\x"+o(y)})}function l(E){return E.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(y){return"\\x0"+o(y)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(y){return"\\x"+o(y)})}function f(E){return e[E.type](E)}function n(E){var y=E.map(f),A,D;if(y.sort(),y.length>0){for(A=1,D=1;A<y.length;A++)y[A-1]!==y[A]&&(y[D]=y[A],D++);y.length=D}switch(y.length){case 1:return y[0];case 2:return y[0]+" or "+y[1];default:return y.slice(0,-1).join(", ")+", or "+y[y.length-1]}}function _(E){return E?'"'+d(E)+'"':"end of input"}return"Expected "+n(i)+" but "+_(t)+" found."};function Pa(i,t){t=t!==void 0?t:{};var e={},o=t.grammarSource,d={pgn:Lt},l=Lt,f="[",n='"',_="]",E=".",y="O-O-O",A="O-O",D="0-0-0",Q="0-0",X="$",Ce="{",xe="}",ze=";",lt="(",rt=")",Ee="1-0",dt="0-1",Ke="1/2-1/2",vt="*",qe=/^[a-zA-Z]/,at=/^[^"]/,it=/^[0-9]/,Re=/^[.]/,fe=/^[a-zA-Z1-8\-=]/,tt=/^[+#]/,ye=/^[!?]/,c=/^[^}]/,j=/^[^\r\n]/,I=/^[ \t\r\n]/,a=Ye("tag pair"),s=Me("[",!1),k=Me('"',!1),R=Me("]",!1),V=Ye("tag name"),W=Xe([["a","z"],["A","Z"]],!1,!1),q=Ye("tag value"),G=Xe(['"'],!0,!1),N=Ye("move number"),w=Xe([["0","9"]],!1,!1),K=Me(".",!1),ee=Xe(["."],!1,!1),de=Ye("standard algebraic notation"),oe=Me("O-O-O",!1),J=Me("O-O",!1),g=Me("0-0-0",!1),b=Me("0-0",!1),r=Xe([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),S=Xe(["+","#"],!1,!1),m=Ye("suffix annotation"),L=Xe(["!","?"],!1,!1),T=Ye("NAG"),O=Me("$",!1),u=Ye("brace comment"),z=Me("{",!1),P=Xe(["}"],!0,!1),se=Me("}",!1),te=Ye("rest of line comment"),pe=Me(";",!1),Z=Xe(["\r",`
`],!0,!1),H=Ye("variation"),Y=Me("(",!1),ne=Me(")",!1),he=Ye("game termination marker"),Se=Me("1-0",!1),Te=Me("0-1",!1),Pe=Me("1/2-1/2",!1),be=Me("*",!1),me=Ye("whitespace"),_e=Xe([" ","	","\r",`
`],!1,!1),Ne=function(p,$){return Ea(p,$)},ke=function(p){return Object.fromEntries(p)},B=function(p,$){return[p,$]},U=function(p,$){return{root:p,marker:$}},ce=function(p,$){return Ia(Aa(p),...$.flat())},we=function(p,$,h,re,le){return Ta(p,$,h,re,le)},Ae=function(p){return p},De=function(p){return p.replace(/[\r\n]+/g," ")},xt=function(p){return p.trim()},yt=function(p){return p},kt=function(p,$){return{result:p,comment:$}},v=t.peg$currPos|0,ct=[{line:1,column:1}],Ve=v,pt=t.peg$maxFailExpected||[],F=t.peg$silentFails|0,ut;if(t.startRule){if(!(t.startRule in d))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');l=d[t.startRule]}function Me(p,$){return{type:"literal",text:p,ignoreCase:$}}function Xe(p,$,h){return{type:"class",parts:p,inverted:$,ignoreCase:h}}function Mt(){return{type:"end"}}function Ye(p){return{type:"other",description:p}}function Tt(p){var $=ct[p],h;if($)return $;if(p>=ct.length)h=ct.length-1;else for(h=p;!ct[--h];);for($=ct[h],$={line:$.line,column:$.column};h<p;)i.charCodeAt(h)===10?($.line++,$.column=1):$.column++,h++;return ct[p]=$,$}function qt(p,$,h){var re=Tt(p),le=Tt($),$e={source:o,start:{offset:p,line:re.line,column:re.column},end:{offset:$,line:le.line,column:le.column}};return $e}function ae(p){v<Ve||(v>Ve&&(Ve=v,pt=[]),pt.push(p))}function _t(p,$,h){return new At(At.buildMessage(p,$),p,$,h)}function Lt(){var p,$,h;return p=v,$=Qt(),h=M(),p=Ne($,h),p}function Qt(){var p,$,h;for(p=v,$=[],h=zt();h!==e;)$.push(h),h=zt();return h=He(),p=ke($),p}function zt(){var p,$,h,re,le,$e,wt;return F++,p=v,He(),i.charCodeAt(v)===91?($=f,v++):($=e,F===0&&ae(s)),$!==e?(He(),h=Xt(),h!==e?(He(),i.charCodeAt(v)===34?(re=n,v++):(re=e,F===0&&ae(k)),re!==e?(le=Rt(),i.charCodeAt(v)===34?($e=n,v++):($e=e,F===0&&ae(k)),$e!==e?(He(),i.charCodeAt(v)===93?(wt=_,v++):(wt=e,F===0&&ae(R)),wt!==e?p=B(h,le):(v=p,p=e)):(v=p,p=e)):(v=p,p=e)):(v=p,p=e)):(v=p,p=e),F--,p===e&&F===0&&ae(a),p}function Xt(){var p,$,h;if(F++,p=v,$=[],h=i.charAt(v),qe.test(h)?v++:(h=e,F===0&&ae(W)),h!==e)for(;h!==e;)$.push(h),h=i.charAt(v),qe.test(h)?v++:(h=e,F===0&&ae(W));else $=e;return $!==e?p=i.substring(p,v):p=$,F--,p===e&&($=e,F===0&&ae(V)),p}function Rt(){var p,$,h;for(F++,p=v,$=[],h=i.charAt(v),at.test(h)?v++:(h=e,F===0&&ae(G));h!==e;)$.push(h),h=i.charAt(v),at.test(h)?v++:(h=e,F===0&&ae(G));return p=i.substring(p,v),F--,$=e,F===0&&ae(q),p}function M(){var p,$,h;return p=v,$=ie(),He(),h=ea(),h===e&&(h=null),He(),p=U($,h),p}function ie(){var p,$,h,re;for(p=v,$=gt(),$===e&&($=null),h=[],re=ve();re!==e;)h.push(re),re=ve();return p=ce($,h),p}function ve(){var p,$,h,re,le,$e,wt,Ot;if(p=v,He(),Fe(),He(),$=Ze(),$!==e){for(h=st(),h===e&&(h=null),re=[],le=nt();le!==e;)re.push(le),le=nt();for(le=He(),$e=gt(),$e===e&&($e=null),wt=[],Ot=Bt();Ot!==e;)wt.push(Ot),Ot=Bt();p=we($,h,re,$e,wt)}else v=p,p=e;return p}function Fe(){var p,$,h,re,le,$e;for(F++,p=v,$=[],h=i.charAt(v),it.test(h)?v++:(h=e,F===0&&ae(w));h!==e;)$.push(h),h=i.charAt(v),it.test(h)?v++:(h=e,F===0&&ae(w));if(i.charCodeAt(v)===46?(h=E,v++):(h=e,F===0&&ae(K)),h!==e){for(re=He(),le=[],$e=i.charAt(v),Re.test($e)?v++:($e=e,F===0&&ae(ee));$e!==e;)le.push($e),$e=i.charAt(v),Re.test($e)?v++:($e=e,F===0&&ae(ee));$=[$,h,re,le],p=$}else v=p,p=e;return F--,p===e&&($=e,F===0&&ae(N)),p}function Ze(){var p,$,h,re,le,$e;if(F++,p=v,$=v,i.substr(v,5)===y?(h=y,v+=5):(h=e,F===0&&ae(oe)),h===e&&(i.substr(v,3)===A?(h=A,v+=3):(h=e,F===0&&ae(J)),h===e&&(i.substr(v,5)===D?(h=D,v+=5):(h=e,F===0&&ae(g)),h===e&&(i.substr(v,3)===Q?(h=Q,v+=3):(h=e,F===0&&ae(b)),h===e))))if(h=v,re=i.charAt(v),qe.test(re)?v++:(re=e,F===0&&ae(W)),re!==e){if(le=[],$e=i.charAt(v),fe.test($e)?v++:($e=e,F===0&&ae(r)),$e!==e)for(;$e!==e;)le.push($e),$e=i.charAt(v),fe.test($e)?v++:($e=e,F===0&&ae(r));else le=e;le!==e?(re=[re,le],h=re):(v=h,h=e)}else v=h,h=e;return h!==e?(re=i.charAt(v),tt.test(re)?v++:(re=e,F===0&&ae(S)),re===e&&(re=null),h=[h,re],$=h):(v=$,$=e),$!==e?p=i.substring(p,v):p=$,F--,p===e&&($=e,F===0&&ae(de)),p}function st(){var p,$,h;for(F++,p=v,$=[],h=i.charAt(v),ye.test(h)?v++:(h=e,F===0&&ae(L));h!==e;)$.push(h),$.length>=2?h=e:(h=i.charAt(v),ye.test(h)?v++:(h=e,F===0&&ae(L)));return $.length<1?(v=p,p=e):p=$,F--,p===e&&($=e,F===0&&ae(m)),p}function nt(){var p,$,h,re,le;if(F++,p=v,He(),i.charCodeAt(v)===36?($=X,v++):($=e,F===0&&ae(O)),$!==e){if(h=v,re=[],le=i.charAt(v),it.test(le)?v++:(le=e,F===0&&ae(w)),le!==e)for(;le!==e;)re.push(le),le=i.charAt(v),it.test(le)?v++:(le=e,F===0&&ae(w));else re=e;re!==e?h=i.substring(h,v):h=re,h!==e?p=Ae(h):(v=p,p=e)}else v=p,p=e;return F--,p===e&&F===0&&ae(T),p}function gt(){var p;return p=Nt(),p===e&&(p=Zt()),p}function Nt(){var p,$,h,re,le;if(F++,p=v,i.charCodeAt(v)===123?($=Ce,v++):($=e,F===0&&ae(z)),$!==e){for(h=v,re=[],le=i.charAt(v),c.test(le)?v++:(le=e,F===0&&ae(P));le!==e;)re.push(le),le=i.charAt(v),c.test(le)?v++:(le=e,F===0&&ae(P));h=i.substring(h,v),i.charCodeAt(v)===125?(re=xe,v++):(re=e,F===0&&ae(se)),re!==e?p=De(h):(v=p,p=e)}else v=p,p=e;return F--,p===e&&($=e,F===0&&ae(u)),p}function Zt(){var p,$,h,re,le;if(F++,p=v,i.charCodeAt(v)===59?($=ze,v++):($=e,F===0&&ae(pe)),$!==e){for(h=v,re=[],le=i.charAt(v),j.test(le)?v++:(le=e,F===0&&ae(Z));le!==e;)re.push(le),le=i.charAt(v),j.test(le)?v++:(le=e,F===0&&ae(Z));h=i.substring(h,v),p=xt(h)}else v=p,p=e;return F--,p===e&&($=e,F===0&&ae(te)),p}function Bt(){var p,$,h,re;return F++,p=v,He(),i.charCodeAt(v)===40?($=lt,v++):($=e,F===0&&ae(Y)),$!==e?(h=ie(),h!==e?(He(),i.charCodeAt(v)===41?(re=rt,v++):(re=e,F===0&&ae(ne)),re!==e?p=yt(h):(v=p,p=e)):(v=p,p=e)):(v=p,p=e),F--,p===e&&F===0&&ae(H),p}function ea(){var p,$,h;return F++,p=v,i.substr(v,3)===Ee?($=Ee,v+=3):($=e,F===0&&ae(Se)),$===e&&(i.substr(v,3)===dt?($=dt,v+=3):($=e,F===0&&ae(Te)),$===e&&(i.substr(v,7)===Ke?($=Ke,v+=7):($=e,F===0&&ae(Pe)),$===e&&(i.charCodeAt(v)===42?($=vt,v++):($=e,F===0&&ae(be))))),$!==e?(He(),h=gt(),h===e&&(h=null),p=kt($,h)):(v=p,p=e),F--,p===e&&($=e,F===0&&ae(he)),p}function He(){var p,$;for(F++,p=[],$=i.charAt(v),I.test($)?v++:($=e,F===0&&ae(_e));$!==e;)p.push($),$=i.charAt(v),I.test($)?v++:($=e,F===0&&ae(_e));return F--,$=e,F===0&&ae(me),p}if(ut=l(),t.peg$library)return{peg$result:ut,peg$currPos:v,peg$FAILED:e,peg$maxFailExpected:pt,peg$maxFailPos:Ve};if(ut!==e&&v===i.length)return ut;throw ut!==e&&v<i.length&&ae(Mt()),_t(pt,Ve<i.length?i.charAt(Ve):null,Ve<i.length?qt(Ve,Ve+1):qt(Ve,Ve))}/**
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
 */const Vt=0xffffffffffffffffn;function na(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function ma(i,t){return i*t&Vt}function Ma(i){return function(){let t=BigInt(i&Vt),e=BigInt(i>>64n&Vt);const o=ma(na(ma(t,5n),7n),9n);return e^=t,t=(na(t,24n)^e^e<<16n)&Vt,e=na(e,37n),i=e<<64n|t,o}}const Jt=Ma(0xa187eb39cdcaed8f31c4b365b102e01en),qa=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Jt()))),La=Array.from({length:8},()=>Jt()),za=Array.from({length:16},()=>Jt()),oa=Jt(),We="w",et="b",Le="p",pa="n",Yt="b",Dt="r",ht="q",Be="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Ut{constructor(t,e){Ie(this,"color");Ie(this,"from");Ie(this,"to");Ie(this,"piece");Ie(this,"captured");Ie(this,"promotion");Ie(this,"flags");Ie(this,"san");Ie(this,"lan");Ie(this,"before");Ie(this,"after");const{color:o,piece:d,from:l,to:f,flags:n,captured:_,promotion:E}=e,y=Oe(l),A=Oe(f);this.color=o,this.piece=d,this.from=y,this.to=A,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=y+A,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const D in ge)ge[D]&n&&(this.flags+=$t[D]);_&&(this.captured=_),E&&(this.promotion=E,this.lan+=E)}isCapture(){return this.flags.indexOf($t.CAPTURE)>-1}isPromotion(){return this.flags.indexOf($t.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf($t.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf($t.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf($t.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf($t.BIG_PAWN)>-1}}const Ge=-1,$t={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},ge={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ua={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Ra={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Na={...ua,...Ra},ue={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},sa={b:[16,32,17,15],w:[-16,-32,-17,-15]},ha={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ba=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Oa=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Fa={p:1,n:2,b:4,r:8,q:16,k:32},Ha="pnbrqkPNBRQK",va=[pa,Yt,Dt,ht],Ga=7,Ua=6,Wa=1,Ka=0,Wt={[Be]:ge.KSIDE_CASTLE,[ht]:ge.QSIDE_CASTLE},ft={w:[{square:ue.a1,flag:ge.QSIDE_CASTLE},{square:ue.h1,flag:ge.KSIDE_CASTLE}],b:[{square:ue.a8,flag:ge.QSIDE_CASTLE},{square:ue.h8,flag:ge.KSIDE_CASTLE}]},Va={b:Wa,w:Ua},la="--";function Ct(i){return i>>4}function Pt(i){return i&15}function ka(i){return"0123456789".indexOf(i)!==-1}function Oe(i){const t=Pt(i),e=Ct(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function It(i){return i===We?et:We}function Ya(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const o=parseInt(t[4],10);if(isNaN(o)||o<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const d=t[0].split("/");if(d.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let f=0;f<d.length;f++){let n=0,_=!1;for(let E=0;E<d[f].length;E++)if(ka(d[f][E])){if(_)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};n+=parseInt(d[f][E],10),_=!0}else{if(!/^[prnbqkPRNBQK]$/.test(d[f][E]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};n+=1,_=!1}if(n!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const l=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:f,regex:n}of l){if(!n.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${f} king`};if((t[0].match(n)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${f} kings`}}return Array.from(d[0]+d[7]).some(f=>f.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Ja(i,t){const e=i.from,o=i.to,d=i.piece;let l=0,f=0,n=0;for(let _=0,E=t.length;_<E;_++){const y=t[_].from,A=t[_].to,D=t[_].piece;d===D&&e!==y&&o===A&&(l++,Ct(e)===Ct(y)&&f++,Pt(e)===Pt(y)&&n++)}return l>0?f>0&&n>0?Oe(e):n>0?Oe(e).charAt(1):Oe(e).charAt(0):""}function mt(i,t,e,o,d,l=void 0,f=ge.NORMAL){const n=Ct(o);if(d===Le&&(n===Ga||n===Ka))for(let _=0;_<va.length;_++){const E=va[_];i.push({color:t,from:e,to:o,piece:d,captured:l,promotion:E,flags:f|ge.PROMOTION})}else i.push({color:t,from:e,to:o,piece:d,captured:l,flags:f})}function xa(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:Le:(t=t.toLowerCase(),t==="o"?Be:t)}function da(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ya{constructor(t=ra,{skipValidation:e=!1}={}){Ie(this,"_board",new Array(128));Ie(this,"_turn",We);Ie(this,"_header",{});Ie(this,"_kings",{w:Ge,b:Ge});Ie(this,"_epSquare",-1);Ie(this,"_halfMoves",0);Ie(this,"_moveNumber",0);Ie(this,"_history",[]);Ie(this,"_comments",{});Ie(this,"_castling",{w:0,b:0});Ie(this,"_hash",0n);Ie(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Ge,b:Ge},this._turn=We,this._castling={w:0,b:0},this._epSquare=Ge,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Na},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:o=!1}={}){let d=t.split(/\s+/);if(d.length>=2&&d.length<6){const n=["-","-","0","1"];t=d.concat(n.slice(-(6-d.length))).join(" ")}if(d=t.split(/\s+/),!e){const{ok:n,error:_}=Ya(t);if(!n)throw new Error(_)}const l=d[0];let f=0;this.clear({preserveHeaders:o});for(let n=0;n<l.length;n++){const _=l.charAt(n);if(_==="/")f+=8;else if(ka(_))f+=parseInt(_,10);else{const E=_<"a"?We:et;this._put({type:_.toLowerCase(),color:E},Oe(f)),f++}}this._turn=d[1],d[2].indexOf("K")>-1&&(this._castling.w|=ge.KSIDE_CASTLE),d[2].indexOf("Q")>-1&&(this._castling.w|=ge.QSIDE_CASTLE),d[2].indexOf("k")>-1&&(this._castling.b|=ge.KSIDE_CASTLE),d[2].indexOf("q")>-1&&(this._castling.b|=ge.QSIDE_CASTLE),this._epSquare=d[3]==="-"?Ge:ue[d[3]],this._halfMoves=parseInt(d[4],10),this._moveNumber=parseInt(d[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var f,n;let e=0,o="";for(let _=ue.a8;_<=ue.h1;_++){if(this._board[_]){e>0&&(o+=e,e=0);const{color:E,type:y}=this._board[_];o+=E===We?y.toUpperCase():y.toLowerCase()}else e++;_+1&136&&(e>0&&(o+=e),_!==ue.h1&&(o+="/"),e=0,_+=8)}let d="";this._castling[We]&ge.KSIDE_CASTLE&&(d+="K"),this._castling[We]&ge.QSIDE_CASTLE&&(d+="Q"),this._castling[et]&ge.KSIDE_CASTLE&&(d+="k"),this._castling[et]&ge.QSIDE_CASTLE&&(d+="q"),d=d||"-";let l="-";if(this._epSquare!==Ge)if(t)l=Oe(this._epSquare);else{const _=this._epSquare+(this._turn===We?16:-16),E=[_+1,_-1];for(const y of E){if(y&136)continue;const A=this._turn;if(((f=this._board[y])==null?void 0:f.color)===A&&((n=this._board[y])==null?void 0:n.type)===Le){this._makeMove({color:A,from:y,to:this._epSquare,piece:Le,captured:Le,flags:ge.EP_CAPTURE});const D=!this._isKingAttacked(A);if(this._undoMove(),D){l=Oe(this._epSquare);break}}}}return[o,this._turn,d,l,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:o}=this._board[t],d={w:0,b:1}[e],l={p:0,n:1,b:2,r:3,q:4,k:5}[o];return qa[d][l][t]}_epKey(){return this._epSquare===Ge?0n:La[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return za[t]}_computeHash(){let t=0n;for(let e=ue.a8;e<=ue.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=oa),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[ue[t]]}findPiece(t){var o;const e=[];for(let d=ue.a8;d<=ue.h1;d++){if(d&136){d+=7;continue}!this._board[d]||((o=this._board[d])==null?void 0:o.color)!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(Oe(d))}return e}put({type:t,color:e},o){return this._put({type:t,color:e},o)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},o){if(Ha.indexOf(t.toLowerCase())===-1||!(o in ue))return!1;const d=ue[o];if(t==Be&&!(this._kings[e]==Ge||this._kings[e]==d))return!1;const l=this._board[d];return l&&l.type===Be&&(this._kings[l.color]=Ge),this._set(d,{type:t,color:e}),t===Be&&(this._kings[e]=d),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(ue[t]),e&&e.type===Be&&(this._kings[e.color]=Ge),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var o,d,l,f,n,_,E,y,A,D,Q,X;this._hash^=this._castlingKey();const t=((o=this._board[ue.e1])==null?void 0:o.type)===Be&&((d=this._board[ue.e1])==null?void 0:d.color)===We,e=((l=this._board[ue.e8])==null?void 0:l.type)===Be&&((f=this._board[ue.e8])==null?void 0:f.color)===et;(!t||((n=this._board[ue.a1])==null?void 0:n.type)!==Dt||((_=this._board[ue.a1])==null?void 0:_.color)!==We)&&(this._castling.w&=-65),(!t||((E=this._board[ue.h1])==null?void 0:E.type)!==Dt||((y=this._board[ue.h1])==null?void 0:y.color)!==We)&&(this._castling.w&=-33),(!e||((A=this._board[ue.a8])==null?void 0:A.type)!==Dt||((D=this._board[ue.a8])==null?void 0:D.color)!==et)&&(this._castling.b&=-65),(!e||((Q=this._board[ue.h8])==null?void 0:Q.type)!==Dt||((X=this._board[ue.h8])==null?void 0:X.color)!==et)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var l,f;if(this._epSquare===Ge)return;const t=this._epSquare+(this._turn===We?-16:16),e=this._epSquare+(this._turn===We?16:-16),o=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((l=this._board[e])==null?void 0:l.color)!==It(this._turn)||((f=this._board[e])==null?void 0:f.type)!==Le){this._hash^=this._epKey(),this._epSquare=Ge;return}const d=n=>{var _,E;return!(n&136)&&((_=this._board[n])==null?void 0:_.color)===this._turn&&((E=this._board[n])==null?void 0:E.type)===Le};o.some(d)||(this._hash^=this._epKey(),this._epSquare=Ge)}_attacked(t,e,o){const d=[];for(let l=ue.a8;l<=ue.h1;l++){if(l&136){l+=7;continue}if(this._board[l]===void 0||this._board[l].color!==t)continue;const f=this._board[l],n=l-e;if(n===0)continue;const _=n+119;if(Ba[_]&Fa[f.type]){if(f.type===Le){if(n>0&&f.color===We||n<=0&&f.color===et)if(o)d.push(Oe(l));else return!0;continue}if(f.type==="n"||f.type==="k")if(o){d.push(Oe(l));continue}else return!0;const E=Oa[_];let y=l+E,A=!1;for(;y!==e;){if(this._board[y]!=null){A=!0;break}y+=E}if(!A)if(o){d.push(Oe(l));continue}else return!0}}return o?d:!1}attackers(t,e){return e?this._attacked(e,ue[t],!0):this._attacked(this._turn,ue[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(It(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,ue[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let o=0,d=0;for(let l=ue.a8;l<=ue.h1;l++){if(d=(d+1)%2,l&136){l+=7;continue}const f=this._board[l];f&&(t[f.type]=f.type in t?t[f.type]+1:1,f.type===Yt&&e.push(d),o++)}if(o===2)return!0;if(o===3&&(t[Yt]===1||t[pa]===1))return!0;if(o===t[Yt]+2){let l=0;const f=e.length;for(let n=0;n<f;n++)l+=e[n];if(l===0||l===f)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:o=void 0}={}){const d=this._moves({square:e,piece:o});return t?d.map(l=>new Ut(this,l)):d.map(l=>this._moveToSan(l,d))}_moves({legal:t=!0,piece:e=void 0,square:o=void 0}={}){var Q;const d=o?o.toLowerCase():void 0,l=e==null?void 0:e.toLowerCase(),f=[],n=this._turn,_=It(n);let E=ue.a8,y=ue.h1,A=!1;if(d)if(d in ue)E=y=ue[d],A=!0;else return[];for(let X=E;X<=y;X++){if(X&136){X+=7;continue}if(!this._board[X]||this._board[X].color===_)continue;const{type:Ce}=this._board[X];let xe;if(Ce===Le){if(l&&l!==Ce)continue;xe=X+sa[n][0],this._board[xe]||(mt(f,n,X,xe,Le),xe=X+sa[n][1],Va[n]===Ct(X)&&!this._board[xe]&&mt(f,n,X,xe,Le,void 0,ge.BIG_PAWN));for(let ze=2;ze<4;ze++)xe=X+sa[n][ze],!(xe&136)&&(((Q=this._board[xe])==null?void 0:Q.color)===_?mt(f,n,X,xe,Le,this._board[xe].type,ge.CAPTURE):xe===this._epSquare&&mt(f,n,X,xe,Le,Le,ge.EP_CAPTURE))}else{if(l&&l!==Ce)continue;for(let ze=0,lt=ha[Ce].length;ze<lt;ze++){const rt=ha[Ce][ze];for(xe=X;xe+=rt,!(xe&136);){if(!this._board[xe])mt(f,n,X,xe,Ce);else{if(this._board[xe].color===n)break;mt(f,n,X,xe,Ce,this._board[xe].type,ge.CAPTURE);break}if(Ce===pa||Ce===Be)break}}}}if((l===void 0||l===Be)&&(!A||y===this._kings[n])){if(this._castling[n]&ge.KSIDE_CASTLE){const X=this._kings[n],Ce=X+2;!this._board[X+1]&&!this._board[Ce]&&!this._attacked(_,this._kings[n])&&!this._attacked(_,X+1)&&!this._attacked(_,Ce)&&mt(f,n,this._kings[n],Ce,Be,void 0,ge.KSIDE_CASTLE)}if(this._castling[n]&ge.QSIDE_CASTLE){const X=this._kings[n],Ce=X-2;!this._board[X-1]&&!this._board[X-2]&&!this._board[X-3]&&!this._attacked(_,this._kings[n])&&!this._attacked(_,X-1)&&!this._attacked(_,Ce)&&mt(f,n,this._kings[n],Ce,Be,void 0,ge.QSIDE_CASTLE)}}if(!t||this._kings[n]===-1)return f;const D=[];for(let X=0,Ce=f.length;X<Ce;X++)this._makeMove(f[X]),this._isKingAttacked(n)||D.push(f[X]),this._undoMove();return D}move(t,{strict:e=!1}={}){let o=null;if(typeof t=="string")o=this._moveFromSan(t,e);else if(t===null)o=this._moveFromSan(la,e);else if(typeof t=="object"){const l=this._moves();for(let f=0,n=l.length;f<n;f++)if(t.from===Oe(l[f].from)&&t.to===Oe(l[f].to)&&(!("promotion"in l[f])||t.promotion===l[f].promotion)){o=l[f];break}}if(!o)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&o.flags&ge.NULL_MOVE)throw new Error("Null move not allowed when in check");const d=new Ut(this,o);return this._makeMove(o),this._incPositionCount(),d}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var d,l,f,n;const e=this._turn,o=It(e);if(this._push(t),t.flags&ge.NULL_MOVE){e===et&&this._moveNumber++,this._halfMoves++,this._turn=o,this._epSquare=Ge;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&ge.EP_CAPTURE&&(this._turn===et?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Be){if(this._kings[e]=t.to,t.flags&ge.KSIDE_CASTLE){const _=t.to-1,E=t.to+1;this._movePiece(E,_)}else if(t.flags&ge.QSIDE_CASTLE){const _=t.to+1,E=t.to-2;this._movePiece(E,_)}this._castling[e]=0}if(this._castling[e]){for(let _=0,E=ft[e].length;_<E;_++)if(t.from===ft[e][_].square&&this._castling[e]&ft[e][_].flag){this._castling[e]^=ft[e][_].flag;break}}if(this._castling[o]){for(let _=0,E=ft[o].length;_<E;_++)if(t.to===ft[o][_].square&&this._castling[o]&ft[o][_].flag){this._castling[o]^=ft[o][_].flag;break}}if(this._hash^=this._castlingKey(),t.flags&ge.BIG_PAWN){let _;e===et?_=t.to-16:_=t.to+16,!(t.to-1&136)&&((d=this._board[t.to-1])==null?void 0:d.type)===Le&&((l=this._board[t.to-1])==null?void 0:l.color)===o||!(t.to+1&136)&&((f=this._board[t.to+1])==null?void 0:f.type)===Le&&((n=this._board[t.to+1])==null?void 0:n.color)===o?(this._epSquare=_,this._hash^=this._epKey()):this._epSquare=Ge}else this._epSquare=Ge;t.piece===Le?this._halfMoves=0:t.flags&(ge.CAPTURE|ge.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===et&&this._moveNumber++,this._turn=o,this._hash^=oa}undo(){const t=this._hash,e=this._undoMove();if(e){const o=new Ut(this,e);return this._decPositionCount(t),o}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=oa;const o=this._turn,d=It(o);if(e.flags&ge.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:o})),e.captured)if(e.flags&ge.EP_CAPTURE){let l;o===et?l=e.to-16:l=e.to+16,this._set(l,{type:Le,color:d})}else this._set(e.to,{type:e.captured,color:d});if(e.flags&(ge.KSIDE_CASTLE|ge.QSIDE_CASTLE)){let l,f;e.flags&ge.KSIDE_CASTLE?(l=e.to+1,f=e.to-1):(l=e.to-2,f=e.to+1),this._movePiece(f,l)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const o=[];let d=!1;for(const D in this._header)this._header[D]&&o.push(`[${D} "${this._header[D]}"]`+t),d=!0;d&&this._history.length&&o.push(t);const l=D=>{const Q=this._comments[this.fen()];if(typeof Q<"u"){const X=D.length>0?" ":"";D=`${D}${X}{${Q}}`}return D},f=[];for(;this._history.length>0;)f.push(this._undoMove());const n=[];let _="";for(f.length===0&&n.push(l(""));f.length>0;){_=l(_);const D=f.pop();if(!D)break;if(!this._history.length&&D.color==="b"){const Q=`${this._moveNumber}. ...`;_=_?`${_} ${Q}`:Q}else D.color==="w"&&(_.length&&n.push(_),_=this._moveNumber+".");_=_+" "+this._moveToSan(D,this._moves({legal:!0})),this._makeMove(D)}if(_.length&&n.push(l(_)),n.push(this._header.Result||"*"),e===0)return o.join("")+n.join(" ");const E=function(){return o.length>0&&o[o.length-1]===" "?(o.pop(),!0):!1},y=function(D,Q){for(const X of Q.split(" "))if(X){if(D+X.length>e){for(;E();)D--;o.push(t),D=0}o.push(X),D+=X.length,o.push(" "),D++}return E()&&D--,D};let A=0;for(let D=0;D<n.length;D++){if(A+n[D].length>e&&n[D].includes("{")){A=y(A,n[D]);continue}A+n[D].length>e&&D!==0?(o[o.length-1]===" "&&o.pop(),o.push(t),A=0):D!==0&&(o.push(" "),A++),o.push(n[D]),A+=n[D].length}return o.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ua[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ua[t]||null,!0):!1}getHeaders(){const t={};for(const[e,o]of Object.entries(this._header))o!==null&&(t[e]=o);return t}loadPgn(t,{strict:e=!1,newlineChar:o=`\r?
`}={}){o!==`\r?
`&&(t=t.replace(new RegExp(o,"g"),`
`));const d=Pa(t);this.reset();const l=d.headers;let f="";for(const E in l)E.toLowerCase()==="fen"&&(f=l[E]),this.header(E,l[E]);if(!e)f&&this.load(f,{preserveHeaders:!0});else if(l.SetUp==="1"){if(!("FEN"in l))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(l.FEN,{preserveHeaders:!0})}let n=d.root;for(;n;){if(n.move){const E=this._moveFromSan(n.move,e);if(E==null)throw new Error(`Invalid move in PGN: ${n.move}`);this._makeMove(E),this._incPositionCount()}n.comment!==void 0&&(this._comments[this.fen()]=n.comment),n=n.variations[0]}const _=d.result;_&&Object.keys(this._header).length&&this._header.Result!==_&&this.setHeader("Result",_)}_moveToSan(t,e){let o="";if(t.flags&ge.KSIDE_CASTLE)o="O-O";else if(t.flags&ge.QSIDE_CASTLE)o="O-O-O";else{if(t.flags&ge.NULL_MOVE)return la;if(t.piece!==Le){const d=Ja(t,e);o+=t.piece.toUpperCase()+d}t.flags&(ge.CAPTURE|ge.EP_CAPTURE)&&(t.piece===Le&&(o+=Oe(t.from)[0]),o+="x"),o+=Oe(t.to),t.promotion&&(o+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?o+="#":o+="+"),this._undoMove(),o}_moveFromSan(t,e=!1){let o=da(t);if(e||(o==="0-0"?o="O-O":o==="0-0-0"&&(o="O-O-O")),o==la)return{color:this._turn,from:0,to:0,piece:"k",flags:ge.NULL_MOVE};let d=xa(o),l=this._moves({legal:!0,piece:d});for(let D=0,Q=l.length;D<Q;D++)if(o===da(this._moveToSan(l[D],l)))return l[D];if(e)return null;let f,n,_,E,y,A=!1;if(n=o.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),n?(f=n[1],_=n[2],E=n[3],y=n[4],_.length==1&&(A=!0)):(n=o.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),n&&(f=n[1],_=n[2],E=n[3],y=n[4],_.length==1&&(A=!0))),d=xa(o),l=this._moves({legal:!0,piece:f||d}),!E)return null;for(let D=0,Q=l.length;D<Q;D++)if(_){if((!f||f.toLowerCase()==l[D].piece)&&ue[_]==l[D].from&&ue[E]==l[D].to&&(!y||y.toLowerCase()==l[D].promotion))return l[D];if(A){const X=Oe(l[D].from);if((!f||f.toLowerCase()==l[D].piece)&&ue[E]==l[D].to&&(_==X[0]||_==X[1])&&(!y||y.toLowerCase()==l[D].promotion))return l[D]}}else if(o===da(this._moveToSan(l[D],l)).replace("x",""))return l[D];return null}ascii(){let t=`   +------------------------+
`;for(let e=ue.a8;e<=ue.h1;e++){if(Pt(e)===0&&(t+=" "+"87654321"[Ct(e)]+" |"),this._board[e]){const o=this._board[e].type,l=this._board[e].color===We?o.toUpperCase():o.toLowerCase();t+=" "+l+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let o=0;const d=this._turn;for(let l=0,f=e.length;l<f;l++)this._makeMove(e[l]),this._isKingAttacked(d)||(t-1>0?o+=this.perft(t-1):o++),this._undoMove();return o}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let o=ue.a8;o<=ue.h1;o++)this._board[o]==null?e.push(null):e.push({square:Oe(o),type:this._board[o].type,color:this._board[o].color}),o+1&136&&(t.push(e),e=[],o+=8);return t}squareColor(t){if(t in ue){const e=ue[t];return(Ct(e)+Pt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],o=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const d=e.pop();if(!d)break;t?o.push(new Ut(this,d)):o.push(this._moveToSan(d,this._moves())),this._makeMove(d)}return o}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},o=d=>{d in this._comments&&(e[d]=this._comments[d])};for(;this._history.length>0;)t.push(this._undoMove());for(o(this.fen());;){const d=t.pop();if(!d)break;this._makeMove(d),o(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const d of[Be,ht])e[d]!==void 0&&(e[d]?this._castling[t]|=Wt[d]:this._castling[t]&=~Wt[d]);this._updateCastlingRights();const o=this.getCastlingRights(t);return(e[Be]===void 0||e[Be]===o[Be])&&(e[ht]===void 0||e[ht]===o[ht])}getCastlingRights(t){return{[Be]:(this._castling[t]&Wt[Be])!==0,[ht]:(this._castling[t]&Wt[ht])!==0}}moveNumber(){return this._moveNumber}}async function ti(i,t={}){var de,oe,J;const e=t.currentUser||{};let o="chat",d=[],l=null,f=[],n=[],_=null,E=null,y=!1,A=null,D=null;i.innerHTML=`
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
  `,Qa(),await rt(),qe();const Q=i.querySelector("#tab-nav-chat"),X=i.querySelector("#tab-nav-lounge"),Ce=i.querySelector("#bonding-chat-main-wrap"),xe=i.querySelector("#bonding-lounge-main-wrap");Q==null||Q.addEventListener("click",()=>{o="chat",Q.classList.add("active"),X.classList.remove("active"),Ce.style.display="grid",xe.style.display="none",qe()}),X==null||X.addEventListener("click",async()=>{o="lounge_games",X.classList.add("active"),Q.classList.remove("active"),Ce.style.display="none",xe.style.display="block",await s()}),(de=i.querySelector("#btn-top-new-chat"))==null||de.addEventListener("click",N),(oe=i.querySelector("#btn-top-new-group"))==null||oe.addEventListener("click",w),(J=i.querySelector("#btn-top-challenge"))==null||J.addEventListener("click",()=>R());const ze=i.querySelector("#bonding-search-input");ze&&ze.addEventListener("input",g=>{const b=g.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(S=>{const m=S.textContent.toLowerCase();S.style.display=m.includes(b)?"flex":"none"})}),dt(),new MutationObserver((g,b)=>{document.body.contains(i)||(E&&clearInterval(E),D&&clearInterval(D),b.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function rt(){try{const[g,b]=await Promise.all([Ue("/bonding/channels").catch(()=>[]),Ue("/bonding/colleagues").catch(()=>[])]);d=g,f=b,!l&&d.length>0&&(l=d.find(r=>r.name.includes("Lounge"))||d[0]),Ke(),l&&await Ee(l._id)}catch(g){console.error("Failed to load bonding data",g)}}async function Ee(g,b=!1){if(g)try{n=await Ue(`/bonding/channels/${g}/messages`),b?I():a()}catch(r){console.error("Failed to load messages",r)}}function dt(){E&&clearInterval(E),E=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval(E);return}o==="chat"&&l?await Ee(l._id,!0):o==="lounge_games"&&await s(!0)}catch{}},3e3)}function Ke(){const g=i.querySelector("#bonding-group-list"),b=i.querySelector("#bonding-direct-list");if(!g||!b)return;const r=d.filter(m=>m.type==="group"),S=d.filter(m=>m.type==="direct");r.length===0?g.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':g.innerHTML=r.map(m=>{var T;return`
          <div class="bonding-channel-item ${l&&l._id===m._id?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-icon">${m.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${x(m.name)}</div>
              <div class="bonding-channel-preview">${x(((T=m.lastMessage)==null?void 0:T.content)||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),S.length===0?b.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':b.innerHTML=S.map(m=>{var u;const L=l&&l._id===m._id,T=m.displayName||m.name||"Colleague",O=T.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${L?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-avatar">${O}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${x(T)}</div>
              <div class="bonding-channel-preview">${x(((u=m.lastMessage)==null?void 0:u.content)||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),vt()}function vt(){var b,r;const g=i.querySelectorAll(".bonding-channel-item");g.forEach(S=>{S.onclick=async m=>{if(m.target.closest(".bonding-channel-del-btn"))return;const L=S.dataset.channelId,T=d.find(O=>O._id===L);T&&(l=T,g.forEach(O=>O.classList.remove("active")),S.classList.add("active"),qe(),await Ee(T._id))}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(S=>{S.onclick=async m=>{m.stopPropagation();const L=S.dataset.channelId,T=d.find(z=>z._id===L),O=T&&T.type==="direct",u=O?"this 1-on-1 chat":`the group "${(T==null?void 0:T.name)||""}"`;if(confirm(`Are you sure you want to delete ${u}? All messages will be permanently removed.`))try{S.disabled=!0,await Qe(`/bonding/channels/${L}`),C(O?"1-on-1 chat deleted":"Group deleted","success"),d=d.filter(z=>z._id!==L),l&&l._id===L&&(l=d[0]||null,qe(),l&&await Ee(l._id)),Ke()}catch(z){C(z.message||"Failed to delete conversation","error"),S.disabled=!1}}}),(b=i.querySelector("#btn-create-group"))==null||b.addEventListener("click",w),(r=i.querySelector("#btn-new-direct-chat"))==null||r.addEventListener("click",N)}function qe(){const g=i.querySelector("#bonding-chat-panel");if(!g)return;if(!l){g.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const b=x(l.displayName||l.name),r=(l.members||[]).length,S=l.type==="group",m=(e==null?void 0:e._id)||(e==null?void 0:e.id),L=S?null:(l.members||[]).find(T=>{var O;return((O=T.userId)==null?void 0:O.toString())!==(m==null?void 0:m.toString())});g.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${S?l.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${b}</div>
            <div class="bonding-chat-sub">
              ${S?`<span>${r} members</span> · <span>${x(l.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${S?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${r})</span>
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
        ${at()}
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
    `,Re(L),fe(L),tt(),j()}function at(){if(!n||n.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const g=(e==null?void 0:e._id)||(e==null?void 0:e.id);return n.map(b=>{var T,O,u,z,P,se,te,pe,Z;const r=b.sender&&b.sender.userId&&g&&b.sender.userId.toString()===g.toString();if(b.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${b._id}">
            <span>ℹ️</span> <span>${x(b.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${b._id}" title="Delete Message">&times;</button>
          </div>
        `;if(b.type==="challenge"&&b.challengeData){const H=b.challengeData,Y=H.gameTitle||"Game Challenge",ne=H.gameType||"chess",he=ne==="chess"?"♟️":ne==="ludo"?"🎲":"❌",Se=(T=H.gameState)==null?void 0:T.invitationId,Te=(O=H.targetUserId)==null?void 0:O.toString(),Pe=(z=(u=b.sender)==null?void 0:u.userId)==null?void 0:z.toString(),be=g&&Te===g.toString(),me=g&&Pe===g.toString();return`
          <div class="bonding-msg-row ${r?"self":"other"}" data-msg-id="${b._id}">
            <div class="bonding-msg-avatar" title="${x(((P=b.sender)==null?void 0:P.name)||"Teammate")}">
              ${(((se=b.sender)==null?void 0:se.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${x(((te=b.sender)==null?void 0:te.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${ee(b.createdAt)}</span>
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
                  <div class="game-bubble-icon">${he}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${x(Y)}</h4>
                    <p class="game-bubble-desc">${x(b.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${H.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':H.status==="active"||H.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${x(((pe=H.status)==null?void 0:pe.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${H.status==="pending"&&be?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${Se}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${Se}" data-action="decline">
                        Decline
                      </button>
                    `:H.status==="pending"&&me?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${Se}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${Se}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${it(b)}
            </div>
          </div>
        `}const S=x(((Z=b.sender)==null?void 0:Z.name)||"Teammate"),m=ee(b.createdAt),L=it(b);return`
        <div class="bonding-msg-row ${r?"self":"other"}" data-msg-id="${b._id}">
          <div class="bonding-msg-avatar" title="${S}">${S.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${S}</span>
              <span class="bonding-msg-time">${m}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${b._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${x(b.content).replace(/\n/g,"<br/>")}
            </div>
            ${L}
          </div>
        </div>
      `}).join("")}function it(g){return`
      <div class="bonding-reactions-row">
        ${(g.reactions||[]).map(S=>{const m=(e==null?void 0:e._id)||(e==null?void 0:e.id);return`
        <button class="bonding-rxn-tag ${(S.users||[]).some(T=>T.toString()===(m==null?void 0:m.toString()))?"active":""}" data-msg-id="${g._id}" data-emoji="${S.emoji}">
          <span>${S.emoji}</span> <span>${S.users?S.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${g._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function Re(g){const b=i.querySelector("#btn-chat-challenge");b&&(b.onclick=()=>{g?R(null,g.userId||g._id):R()});const r=i.querySelector("#btn-manage-members");r&&(r.onclick=q);const S=i.querySelector("#btn-delete-group");S&&(S.onclick=G);const m=i.querySelector("#btn-delete-direct");m&&(m.onclick=async()=>{if(l&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{m.disabled=!0,await Qe(`/bonding/channels/${l._id}`),C("1-on-1 chat deleted successfully","success");const T=l._id;d=d.filter(O=>O._id!==T),l=d[0]||null,Ke(),qe(),l&&await Ee(l._id)}catch(T){C(T.message||"Could not delete 1-on-1 chat","error"),m.disabled=!1}});const L=i.querySelector("#btn-clear-chat");L&&(L.onclick=async()=>{if(l&&confirm("Are you sure you want to clear all messages in this conversation?"))try{L.disabled=!0,await Qe(`/bonding/channels/${l._id}/messages`),C("Chat messages cleared","success"),n=[],a()}catch(T){C(T.message||"Could not clear chat messages","error")}finally{L.disabled=!1}})}function fe(g){const b=i.querySelector("#bonding-message-input"),r=i.querySelector("#btn-send-message"),S=i.querySelector("#btn-quick-emoji"),m=i.querySelector("#btn-input-challenge");b&&b.addEventListener("keydown",L=>{L.key==="Enter"&&!L.shiftKey&&(L.preventDefault(),ye())}),r&&(r.onclick=ye),m&&(m.onclick=()=>{g?R(null,g.userId||g._id):R()}),S&&(S.onclick=()=>{if(!b)return;const L=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],T=L[Math.floor(Math.random()*L.length)];b.value+=(b.value?" ":"")+T,b.focus()})}function tt(){i.querySelectorAll(".btn-respond-invite").forEach(S=>{S.onclick=async()=>{const m=S.dataset.inviteId,L=S.dataset.action;await V(m,L)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(S=>{S.onclick=async()=>{const m=S.dataset.inviteId;try{S.disabled=!0;const L=await Ue("/bonding/invitations"),T=(L.incoming||[]).concat(L.sent||[]).find(O=>O._id===m);T&&T.matchId?W(T.matchId):C("Match has not started yet or has expired","warning")}catch(L){C(L.message||"Could not load match","error")}finally{S.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(S=>{S.onclick=async m=>{m.stopPropagation();const L=S.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{S.disabled=!0,await Qe(`/bonding/messages/${L}`),n=n.filter(T=>T._id!==L),I(),C("Message deleted","success")}catch(T){C(T.message||"Failed to delete message","error"),S.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(S=>{S.onclick=async()=>{const m=S.dataset.msgId,L=S.dataset.emoji;await c(m,L)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(S=>{S.onclick=m=>{const L=S.dataset.msgId;K(m.currentTarget,async T=>{await c(L,T)})}})}async function ye(){const g=i.querySelector("#bonding-message-input");if(!g||!l||y)return;const b=g.value.trim();if(b)try{y=!0,g.value="";const r=await je(`/bonding/channels/${l._id}/messages`,{content:b,type:"text"});n.push(r),a(),j()}catch(r){C(r.message||"Failed to send message","error")}finally{y=!1,g.focus()}}async function c(g,b){try{const r=await je(`/bonding/messages/${g}/react`,{emoji:b}),S=n.find(m=>m._id===g);S&&(S.reactions=r,I())}catch(r){C(r.message||"Failed to react","error")}}function j(){const g=i.querySelector("#bonding-messages-feed");g&&(g.scrollTop=g.scrollHeight)}function I(){const g=i.querySelector("#bonding-messages-feed");if(!g)return;const b=g.scrollHeight-g.scrollTop<=g.clientHeight+80;g.innerHTML=at(),tt(),b&&j()}function a(){const g=i.querySelector("#bonding-messages-feed");g&&(g.innerHTML=at(),tt())}async function s(g=!1){const b=i.querySelector("#bonding-lounge-main-wrap");if(b){g||(b.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const r=await Ue("/bonding/games/overview");_=r;const S=r.myStats||{},m=r.availableGames||[],L=r.incomingChallenges||[],T=r.sentChallenges||[],O=r.activeMatches||[],u=r.recentMatches||[],z=(e==null?void 0:e._id)||(e==null?void 0:e.id);b.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${S.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${S.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${S.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${S.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${S.gamesPlayed>0?Math.round((S.wins||0)/S.gamesPlayed*100):0}%</span>
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
                    <h4 class="game-card-title">${x(P.name)}</h4>
                    <p class="game-card-desc">${x(P.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${P.duration}</span>
                      ${P.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${P.id}" data-game-title="${x(P.name)}">
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
                <span class="badge blue">${L.length+T.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${L.length})</h5>
              ${L.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${L.map(P=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(P.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${x(P.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${x(P.sender.name)}</strong> (${x(P.sender.role)})</span>
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
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${T.length})</h5>
              ${T.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${T.map(P=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(P.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${x(P.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${x(P.recipient.name)}</strong></span>
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
                <span class="badge green">${O.length} Live</span>
              </div>

              ${O.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${O.map(P=>{const te=z&&P.player1.userId.toString()===z.toString()?P.player2:P.player1,pe=z&&P.currentTurnUserId&&P.currentTurnUserId.toString()===z.toString();return`
                        <div class="lounge-active-match-card ${pe?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${P.gameType==="chess"?"♟️":P.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${x(P.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${x(te.name)}</strong> (${x(te.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${pe?"my-turn":"wait"}">
                              ${pe?"⚡ Your Turn!":"⏳ Opponent Turn"}
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
              ${u.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${u.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${u.map(P=>{const te=z&&P.player1.userId.toString()===z.toString()?P.player2:P.player1,pe=z&&P.winnerId&&P.winnerId.toString()===z.toString(),Z=P.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${x(P.gameTitle)}</span>
                          <span class="recent-date">${ee(P.completedAt||P.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${P._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${x(te.name)}</strong></div>
                          <div class="recent-outcome ${pe?"win":Z?"draw":"loss"}">
                            ${pe?"🏆 VICTORY":Z?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${x(P.winningReason||P.status)})</span>
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
      `,k()}catch(r){b.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${x(r.message)}</p>
        </div>
      `}}}function k(){i.querySelectorAll(".btn-challenge-game").forEach(b=>{b.onclick=()=>{const r=b.dataset.gameId;R(r)}}),i.querySelectorAll(".btn-respond-invite").forEach(b=>{b.onclick=async()=>{const r=b.dataset.inviteId,S=b.dataset.action;await V(r,S),await s()}}),i.querySelectorAll(".btn-resume-match").forEach(b=>{b.onclick=()=>{const r=b.dataset.matchId;W(r)}}),i.querySelectorAll(".btn-recent-rematch").forEach(b=>{b.onclick=async()=>{const r=b.dataset.matchId;try{b.disabled=!0;const S=await je(`/bonding/matches/${r}/action`,{action:"rematch"});S.match&&(C("Rematch created! Opening arena ⚔️","success"),W(S.match._id))}catch(S){C(S.message||"Could not start rematch","error")}finally{b.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(b=>{b.onclick=async r=>{r.stopPropagation();const S=b.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{b.disabled=!0,await Qe(`/bonding/matches/${S}`),C("Match deleted successfully","success"),await s()}catch(m){C(m.message||"Failed to delete match","error")}finally{b.disabled=!1}}});const g=i.querySelector("#btn-clear-matches");g&&(g.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{g.disabled=!0,await Qe("/bonding/matches?filter=completed"),C("Completed matches history cleared","success"),await s()}catch(b){C(b.message||"Failed to clear matches","error")}finally{g.disabled=!1}})}function R(g=null,b=null){const r=i.querySelector("#bonding-modals-root"),S=(e==null?void 0:e._id)||(e==null?void 0:e.id),m=new Set(["employee","admin","superadmin"]),L=f.filter(pe=>!pe.isSelf&&pe._id.toString()!==(S==null?void 0:S.toString())&&m.has(pe.role));let T=g||"chess",O=b?b.toString():null,u=2,z=O?[O]:[],P="none";function se(){const pe=L.find(ne=>ne._id.toString()===O),Z=T==="ludo",H=u-1,Y=z.length===H;r.innerHTML=`
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
                  <button class="game-pill-btn ${T==="chess"?"active":""}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${T==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                  <button class="game-pill-btn ${T==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                </div>
              </div>

              <!-- LUDO SPECIAL: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${Z?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${u===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${u===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${u===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${Z?`Step 3 — Select Colleagues to Play With (${z.length}/${H} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${L.map(ne=>{const he=Z?z.includes(ne._id.toString()):O===ne._id.toString();return`
                      <div class="eligible-emp-item ${he?"selected":""}" data-user-id="${ne._id}">
                        <div class="emp-item-avatar">${ne.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${x(ne.name)}</span>
                          <span class="emp-item-role">${x(ne.role==="superadmin"?"Superadmin":ne.role==="admin"?"Admin":"Employee")} · ${x(ne.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${he?"active":""}">
                          ${he?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Step for Chess timers -->
              ${T==="chess"?`
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
                  <div><strong>Game:</strong> ${Z?`🎲 Ludo (${u} Players · 4 Pawns per base)`:T==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${Z?`
                    <div><strong>Opponents:</strong> ${z.length>0?z.map(ne=>{const he=L.find(Se=>Se._id.toString()===ne);return he?`<strong>${x(he.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+H+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${pe?`<strong>${x(pe.name)}</strong> (${x(pe.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${T==="chess"?`<div><strong>Time Control:</strong> ${P==="none"?"Untimed":P}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(Z?!Y:!O)?"disabled":""}>
                ${Z?`Start ${u}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,te()}function te(){r.querySelector(".bonding-modal-close").onclick=()=>{r.innerHTML=""},r.querySelector("#btn-cancel-challenge-flow").onclick=()=>{r.innerHTML=""},r.querySelectorAll(".game-pill-btn").forEach(H=>{H.onclick=()=>{T=H.dataset.game,se()}}),r.querySelectorAll(".ludo-mode-btn").forEach(H=>{H.onclick=()=>{u=Number(H.dataset.count),z=z.slice(0,u-1),se()}});const pe=r.querySelector("#flow-emp-search");pe&&(pe.oninput=H=>{const Y=H.target.value.toLowerCase().trim();r.querySelectorAll(".eligible-emp-item").forEach(ne=>{const he=ne.textContent.toLowerCase();ne.style.display=he.includes(Y)?"flex":"none"})}),r.querySelectorAll(".eligible-emp-item").forEach(H=>{H.onclick=()=>{const Y=H.dataset.userId;if(T==="ludo"){const ne=u-1;z.includes(Y)?z=z.filter(he=>he!==Y):z.length<ne?z.push(Y):z[ne-1]=Y}else O=Y;se()}}),r.querySelectorAll('input[name="timerMode"]').forEach(H=>{H.onchange=Y=>{P=Y.target.value,se()}});const Z=r.querySelector("#btn-submit-challenge-flow");Z&&(Z.onclick=async()=>{if(T==="ludo"){const H=u-1;if(z.length<H){C(`Please select ${H} colleague(s) to play with`,"warning");return}try{Z.disabled=!0,Z.textContent="Launching Match...";const Y=await je("/bonding/matches/instant-ludo",{playerCount:u,targetUserIds:z});r.innerHTML="",C(`Ludo match started (${u} Players)! 🎲`,"success"),Y&&Y._id&&W(Y._id)}catch(Y){C(Y.message||"Failed to start Ludo match","error"),Z.disabled=!1,Z.textContent=`Start ${u}P Ludo Match 🎲`}return}if(!O){C("Please select an employee to challenge","warning");return}try{Z.disabled=!0,Z.textContent="Sending Challenge...",await je("/bonding/invitations",{gameType:T,targetUserId:O,matchSettings:{timerMode:P},channelId:(l==null?void 0:l._id)||null}),C("Game challenge delivered! Awaiting acceptance ⚔️","success"),r.innerHTML="",l&&await Ee(l._id),o==="lounge_games"&&await s()}catch(H){C(H.message||"Could not send challenge","error"),Z.disabled=!1,Z.textContent="Send Challenge 🚀"}})}se()}async function V(g,b){if(!(!g||!b))try{const r=await Kt(`/bonding/invitations/${g}/respond`,{action:b});b==="accept"?(C("Challenge accepted! Entering match arena ⚔️","success"),r.match&&W(r.match._id)):b==="decline"?C("Challenge declined","info"):b==="cancel"&&C("Challenge cancelled","info"),l&&await Ee(l._id),o==="lounge_games"&&await s()}catch(r){C(r.message||"Action failed","error")}}async function W(g){if(!g)return;A=g,D&&clearInterval(D);const b=i.querySelector("#bonding-modals-root");let r=null,S=null,m=[];async function L(){try{return r=await Ue(`/bonding/matches/${g}`),r}catch(te){return C(te.message||"Could not load match","error"),T(),null}}if(r=await L(),!r)return;function T(){D&&clearInterval(D),A=null,b.innerHTML="",o==="lounge_games"&&s(!0),l&&Ee(l._id,!0)}D=setInterval(async()=>{var H,Y,ne,he;if(!A||A!==g){clearInterval(D);return}const te=(H=r==null?void 0:r.currentTurnUserId)==null?void 0:H.toString(),pe=r==null?void 0:r.status,Z=await L();Z&&(((Y=Z.currentTurnUserId)==null?void 0:Y.toString())!==te||Z.status!==pe||((ne=Z.moves)==null?void 0:ne.length)!==((he=r.moves)==null?void 0:he.length))&&O()},1500);function O(){var he,Se;if(!r)return;const te=(e==null?void 0:e._id)||(e==null?void 0:e.id),pe=te&&r.player1.userId.toString()===te.toString(),Z=pe?r.player1:r.player2,H=pe?r.player2:r.player1,Y=te&&r.currentTurnUserId&&r.currentTurnUserId.toString()===te.toString(),ne=r.status!=="active";b.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${r.gameType==="ludo"?"🎲":r.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${x(r.gameTitle)}</h3>
                  ${r.gameType==="ludo"&&((he=r.gameState)!=null&&he.players)?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${r.gameState.players.map(Te=>{var _e;const Pe=Te.userId&&Te.userId.toString()===(te==null?void 0:te.toString()),be={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Te.color]||"⚪",me=(((_e=r.gameState)==null?void 0:_e.turnColor)||r.turn)===Te.color;return`
                          <span class="player-tag ${Pe?"self":"opp"} ${me?"turn-active":""}">
                            ${be} <strong>${x(Te.name)}</strong> ${Pe?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${x(Z.name)} (You · <strong>${r.gameType==="ludo"?Z.assignedRole==="red"?"🔴 Red":"🟢 Green":r.gameType==="tictactoe"?Z.assignedRole==="X"?"✕":"◯":Z.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${x(H.name)} (<strong>${r.gameType==="ludo"?H.assignedRole==="red"?"🔴 Red":"🟢 Green":r.gameType==="tictactoe"?H.assignedRole==="X"?"✕":"◯":H.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${ne?"ended":Y?"my-turn":"opp-turn"}">
                ${ne?`<span>🏁 Finished (${x(r.winningReason||r.status)})</span>`:Y?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${x(H.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${r.gameType==="ludo"?Y?(Se=r.gameState)!=null&&Se.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":r.gameType==="tictactoe"?Y?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":Y?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${ne?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${r.drawOfferedBy&&r.drawOfferedBy.toString()!==(te==null?void 0:te.toString())&&!ne?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${x(H.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${r.gameType==="chess"?u(pe):""}
              ${r.gameType==="tictactoe"?z():""}
              ${r.gameType==="ludo"?P(pe):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${ne?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${r.winnerId&&r.winnerId.toString()===(te==null?void 0:te.toString())?"🏆":r.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${r.winnerId&&r.winnerId.toString()===(te==null?void 0:te.toString())?"VICTORY!":r.status==="draw"?"STALEMATE / DRAW":`${x(r.winnerName)} Wins!`}</h4>
                  <p>Reason: ${x(r.winningReason||"Match concluded")}</p>
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
      `,se(Y,pe,Z)}function u(te){var be;const pe=((be=r.gameState)==null?void 0:be.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Z=new ya(pe),H=te?r.player1.assignedRole==="white":r.player2.assignedRole==="white",Y={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},ne=H?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],he=H?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Se='<div class="chess-board-grid">';for(const me of he)for(const _e of ne){const Ne=`${_e}${me}`,ke=Z.get(Ne),B=(_e.charCodeAt(0)-97+me)%2!==0,U=S===Ne,ce=m.includes(Ne),we=ke?ke.color==="w"?Y[ke.type.toUpperCase()]:Y[ke.type]:"";Se+=`
            <div class="chess-sq ${B?"light":"dark"} ${U?"selected":""} ${ce?"legal-dot":""}" data-square="${Ne}">
              ${we?`<span class="chess-piece ${ke.color==="w"?"white-piece":"black-piece"}">${we}</span>`:""}
            </div>
          `}Se+="</div>";const Pe=(r.moves||[]).map(me=>{var _e;return`
        <span class="chess-move-token">${me.moveNum}. ${((_e=me.moveData)==null?void 0:_e.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${Se}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${Pe||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function z(){var Z;const te=((Z=r.gameState)==null?void 0:Z.board)||Array(9).fill(null),pe=r.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${te.map((H,Y)=>{const ne=pe.includes(Y);return`
                <div class="ttt-cell ${H?"filled":"empty"} ${ne?"win-cell":""}" data-cell-idx="${Y}">
                  ${H==="X"?'<span class="ttt-x">✕</span>':H==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function P(te,pe,Z){var Rt;const H=r.gameState||{},Y=H.activeColors||["red","green"],ne=H.players||[{...r.player1,color:"red",assignedRole:"red",isBot:!1},{...r.player2,color:"green",assignedRole:"green",isBot:!1}],he=H.tokens||{},Se=M=>{const ie=he[M]||(M==="red"?H.p1Tokens:M==="green"?H.p2Tokens:[])||[];return Array.from({length:4},(ve,Fe)=>ie[Fe]||{id:Fe,step:-1})},Te=Se("red"),Pe=Se("green"),be=Se("yellow"),me=Se("blue"),_e=(e==null?void 0:e._id)||(e==null?void 0:e.id),Ne=ne.find(M=>M.userId&&M.userId.toString()===(_e==null?void 0:_e.toString()))||ne[0],ke=(Ne==null?void 0:Ne.color)||(te?"red":"green"),B=H.turnColor||r.turn||"red",U=ke===B&&r.status==="active",ce=!!H.rolled,we=H.dice,Ae=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],De=[[7,1],[7,2],[7,3],[7,4],[7,5]],xt=[[1,7],[2,7],[3,7],[4,7],[5,7]],yt=[[7,13],[7,12],[7,11],[7,10],[7,9]],kt=[[13,7],[12,7],[11,7],[10,7],[9,7]],v=[0,8,13,21,26,34,39,47];function ct(M,ie){return ie<0?null:ie>=56?M==="red"?[7,6]:M==="green"?[6,7]:M==="yellow"?[7,8]:[8,7]:M==="red"?ie<=50?Ae[ie]:De[ie-51]:M==="green"?ie<=50?Ae[(13+ie)%52]:xt[ie-51]:M==="yellow"?ie<=50?Ae[(26+ie)%52]:yt[ie-51]:ie<=50?Ae[(39+ie)%52]:kt[ie-51]}function Ve(M,ie){return M!==ke||!U||!ce||!we||r.status!=="active"?!1:ie.step===-1?we===6:ie.step>=0&&ie.step+we<=56}const pt={},F=(M,ie)=>{ie.forEach(ve=>{if(ve.step>=0&&ve.step<56){const Fe=ct(M,ve.step);if(Fe){const Ze=Fe[0]+","+Fe[1];(pt[Ze]=pt[Ze]||[]).push({color:M,id:ve.id,step:ve.step,movable:Ve(M,ve)})}}})};Y.includes("red")&&F("red",Te),Y.includes("green")&&F("green",Pe),Y.includes("yellow")&&F("yellow",be),Y.includes("blue")&&F("blue",me);const ut={};Ae.forEach(([M,ie],ve)=>{ut[M+","+ie]=ve});const Me={};De.forEach(([M,ie],ve)=>{Me[M+","+ie]=ve+1});const Xe={};xt.forEach(([M,ie],ve)=>{Xe[M+","+ie]=ve+1});const Mt={};yt.forEach(([M,ie],ve)=>{Mt[M+","+ie]=ve+1});const Ye={};kt.forEach(([M,ie],ve)=>{Ye[M+","+ie]=ve+1});const Tt=[];for(let M=0;M<15;M++)for(let ie=0;ie<15;ie++){if(M<6&&ie<6||M<6&&ie>8||M>8&&ie<6||M>8&&ie>8||M>=6&&M<=8&&ie>=6&&ie<=8)continue;const ve=M+","+ie,Fe=ut[ve],Ze=Fe!==void 0&&v.includes(Fe),st=M===6&&ie===1,nt=M===1&&ie===8,gt=M===8&&ie===13,Nt=M===13&&ie===6,Zt=Me[ve],Bt=Xe[ve],ea=Mt[ve],He=Ye[ve];let p="ludo-cell";st?p+=" cell-red-start":nt?p+=" cell-green-start":gt?p+=" cell-yellow-start":Nt?p+=" cell-blue-start":Zt?p+=" cell-red-stretch":Bt?p+=" cell-green-stretch":ea?p+=" cell-yellow-stretch":He?p+=" cell-blue-stretch":Ze&&(p+=" cell-safe-star");const $=pt[ve]||[];Tt.push(`
            <div class="${p}" style="grid-row:${M+1};grid-column:${ie+1}" data-pos="${ve}">
              ${Ze?'<span class="cell-star-glyph">⭐</span>':""}
              ${st||nt||gt||Nt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${$.map(h=>`
                <div class="ludo-token token-${h.color} ${h.movable?"movable":""}" data-token-id="${h.id}" data-color="${h.color}" title="${h.color.toUpperCase()} Pawn ${h.id+1}">
                  <span>${h.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}const qt=["","⚀","⚁","⚂","⚃","⚄","⚅"];function ae(M){return!M||M.step===-1?"Base":M.step===56?"🏁 Home!":M.step>50?`H${M.step-50}`:`S${M.step}`}function _t(M,ie,ve,Fe,Ze){const st=`${M}-yard`;return ve?`
          <div class="ludo-yard ${st} ${B===M?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${ie}</span>
                ${Fe?`<small class="yard-player-lbl">${x(Fe.name)}${Fe.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${Ze.map((nt,gt)=>`
                  <div class="yard-token-slot">
                    ${nt.step===-1?`
                      <div class="ludo-token token-${M} ${Ve(M,nt)?"movable":""}" data-token-id="${nt.id}" data-color="${M}" title="${M.toUpperCase()} Pawn ${nt.id+1}">
                        <span>${nt.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${gt+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `:`
            <div class="ludo-yard ${st}">
              <div class="yard-box decorative">
                <div class="yard-title">${ie} (Inactive)</div>
              </div>
            </div>
          `}const Lt=ne.find(M=>M.color==="red"),Qt=ne.find(M=>M.color==="green"),zt=ne.find(M=>M.color==="yellow"),Xt=ne.find(M=>M.color==="blue");return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${_t("red","🔴 Red Base",Y.includes("red"),Lt,Te)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${_t("green","🟢 Green Base",Y.includes("green"),Qt,Pe)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${_t("blue","🔵 Blue Base",Y.includes("blue"),Xt,me)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${_t("yellow","🟡 Yellow Base",Y.includes("yellow"),zt,be)}

            <!-- 5. Center Home Victory Zone (3x3) -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${Te.filter(M=>M.step===56).map(M=>`<span class="tok-finished red" title="Red Pawn ${M.id+1} Home">🔴${M.id+1}</span>`).join("")}
                  ${Pe.filter(M=>M.step===56).map(M=>`<span class="tok-finished green" title="Green Pawn ${M.id+1} Home">🟢${M.id+1}</span>`).join("")}
                  ${be.filter(M=>M.step===56).map(M=>`<span class="tok-finished yellow" title="Yellow Pawn ${M.id+1} Home">🟡${M.id+1}</span>`).join("")}
                  ${me.filter(M=>M.step===56).map(M=>`<span class="tok-finished blue" title="Blue Pawn ${M.id+1} Home">🔵${M.id+1}</span>`).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Tt.join("")}
          </div>

          <!-- Ludo Action & Dice Roller Console -->
          <div class="ludo-console">
            <div class="ludo-dice-box">
              <div class="ludo-dice-visual ${ce?"rolled":""}">
                ${we?`<span class="dice-glyph">${qt[we]}</span>`:"🎲"}
              </div>
              ${we?`<span class="dice-num-lbl">Rolled ${we}</span>`:'<span class="dice-num-lbl">Ready</span>'}
            </div>

            <div class="ludo-controls-box">
              ${U&&!ce&&r.status==="active"?`
                <button class="btn-ludo-roll pulse" id="btn-ludo-roll">🎲 Roll Dice</button>
              `:U&&ce&&r.status==="active"?`
                <div class="ludo-prompt-text highlight">
                  ${Se(ke).some(M=>Ve(ke,M))?"👉 Tap your <strong>glowing pawn</strong> to advance!":"No moves possible with this roll. Turn passing..."}
                </div>
              `:`
                <div class="ludo-prompt-text">
                  ${r.status==="active"?`⏳ Waiting for ${x(((Rt=ne.find(M=>M.color===B))==null?void 0:Rt.name)||"opponent")} (${B.toUpperCase()})...`:"🏁 Match Concluded"}
                </div>
              `}

              <div class="ludo-status-banner">
                ${x(H.lastActionText||"Match in progress.")}
              </div>
            </div>
          </div>

          <!-- Token Progress Strip for all active players -->
          <div class="ludo-progress-strip">
            ${Y.map(M=>{const ie=ne.find(Ze=>Ze.color===M),ve=Se(M),Fe={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[M];return`
                <div class="progress-pill ${M} ${B===M?"active-turn":""}">
                  <strong>${Fe} ${ie?x(ie.name):M.toUpperCase()}:</strong>
                  ${ve.map((Ze,st)=>`P${st+1}: ${ae(Ze)}`).join(" · ")}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function se(te,pe,Z){var Pe;b.querySelector("#btn-close-arena").onclick=T;const H=b.querySelector("#btn-arena-resign");H&&(H.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{H.disabled=!0,await je(`/bonding/matches/${g}/action`,{action:"resign"}),await L(),O()}catch(be){C(be.message||"Resign failed","error"),H.disabled=!1}});const Y=b.querySelector("#btn-arena-draw");Y&&(Y.onclick=async()=>{try{await je(`/bonding/matches/${g}/action`,{action:"offer_draw"}),C("Draw offer sent to opponent","info"),await L(),O()}catch(be){C(be.message||"Draw offer failed","error")}});const ne=b.querySelector("#btn-confirm-accept-draw");ne&&(ne.onclick=async()=>{try{await je(`/bonding/matches/${g}/action`,{action:"accept_draw"}),C("Draw agreed!","info"),await L(),O()}catch(be){C(be.message,"error")}});const he=b.querySelector("#btn-confirm-decline-draw");he&&(he.onclick=async()=>{try{await je(`/bonding/matches/${g}/action`,{action:"decline_draw"}),await L(),O()}catch(be){C(be.message,"error")}}),[b.querySelector("#btn-arena-delete-match"),b.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(be=>{be.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{be.disabled=!0,await Qe(`/bonding/matches/${g}`),C("Match deleted","success"),T(),o==="lounge_games"&&await s()}catch(me){C(me.message||"Failed to delete match","error"),be.disabled=!1}}});const Te=b.querySelector("#btn-arena-rematch-action");if(Te&&(Te.onclick=async()=>{try{Te.disabled=!0,Te.textContent="Creating Rematch...";const be=await je(`/bonding/matches/${g}/action`,{action:"rematch"});be.match&&(C("Rematch created! New match live ⚔️","success"),D&&clearInterval(D),W(be.match._id))}catch(be){C(be.message||"Rematch failed","error"),Te.disabled=!1,Te.textContent="🔄 Request Rematch"}}),r.gameType==="chess"&&te&&r.status==="active"){const be=((Pe=r.gameState)==null?void 0:Pe.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",me=new ya(be),_e=Z.assignedRole==="white"?"w":"b";b.querySelectorAll(".chess-sq").forEach(Ne=>{Ne.onclick=async()=>{const ke=Ne.dataset.square;if(S){if(S===ke){S=null,m=[],O();return}if(m.includes(ke)){const U=me.get(S);let ce;U&&U.type==="p"&&(ke.endsWith("8")||ke.endsWith("1"))&&(ce=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const we={from:S,to:ke,promotion:ce?ce.toLowerCase():void 0};S=null,m=[],r=await je(`/bonding/matches/${g}/move`,{move:we}),O()}catch(we){C(we.message||"Illegal chess move","error"),S=null,m=[],O()}return}}const B=me.get(ke);B&&B.color===_e?(S=ke,m=me.moves({square:ke,verbose:!0}).map(ce=>ce.to),O()):(S=null,m=[],O())}})}if(r.gameType==="tictactoe"&&te&&r.status==="active"&&b.querySelectorAll(".ttt-cell.empty").forEach(be=>{be.onclick=async()=>{const me=be.dataset.cellIdx;try{be.style.opacity="0.5",r=await je(`/bonding/matches/${g}/move`,{cellIndex:Number(me)}),O()}catch(_e){C(_e.message||"Invalid move","error")}}}),r.gameType==="ludo"&&r.status==="active"){const be=b.querySelector("#btn-ludo-roll");be&&te&&(be.onclick=async()=>{try{be.disabled=!0,be.textContent="Rolling 🎲...",r=await je(`/bonding/matches/${g}/move`,{action:"roll"}),O()}catch(me){C(me.message||"Failed to roll","error"),be.disabled=!1,be.textContent="🎲 Roll Dice"}}),te&&b.querySelectorAll(".ludo-token.movable").forEach(me=>{me.onclick=async _e=>{_e.stopPropagation();const Ne=me.dataset.tokenId;try{me.style.opacity="0.5",r=await je(`/bonding/matches/${g}/move`,{action:"move",tokenId:Number(Ne)}),O()}catch(ke){C(ke.message||"Invalid token move","error"),me.style.opacity="1"}}})}}O()}function q(){if(!l||l.type==="direct")return;const g=i.querySelector("#bonding-modals-root"),b=u=>u==="employee"||u==="admin"||u==="superadmin",r=l.members||[],S=new Set(r.map(u=>{var z;return(z=u.userId)==null?void 0:z.toString()})),m=f.filter(u=>b(u.role)&&!S.has(u._id.toString()));g.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${x(l.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${m.map(u=>`
                    <option value="${u._id}">${x(u.name)} (${x(u.role==="superadmin"?"Superadmin":u.role==="admin"?"Admin":"Employee")})</option>
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
              <label class="bonding-form-label">Current Members (${r.length}):</label>
              <div class="bonding-members-list">
                ${r.map(u=>{const z=(e==null?void 0:e._id)||(e==null?void 0:e.id),P=z&&u.userId&&u.userId.toString()===z.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(u.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${x(u.name)} ${P?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${x(u.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${u.userId}" data-name="${x(u.name)}">
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
    `,g.querySelector(".bonding-modal-close").onclick=()=>{g.innerHTML=""};const L=g.querySelector("#btn-modal-delete-group");L&&(L.onclick=()=>{g.innerHTML="",G()});const T=g.querySelector("#btn-submit-add-member");T&&(T.onclick=async()=>{const z=g.querySelector("#sel-add-colleague").value;if(!z){C("Please select a colleague to add","warning");return}try{T.disabled=!0,T.textContent="Adding...";const P=await Kt(`/bonding/channels/${l._id}/members`,{action:"add",userIds:[z]});C("Colleague added to group! 🎉","success"),l=P.channel,g.innerHTML="",await Ee(l._id),qe()}catch(P){C(P.message||"Failed to add member","error"),T.disabled=!1,T.textContent="Add to Group"}}),g.querySelectorAll(".btn-remove-member").forEach(u=>{u.onclick=async()=>{const z=u.dataset.userId,P=u.dataset.name;if(confirm(`Are you sure you want to remove ${P} from this group?`))try{u.disabled=!0;const se=await Kt(`/bonding/channels/${l._id}/members`,{action:"remove",userId:z});C(`${P} removed from group`,"info"),l=se.channel,g.innerHTML="",await Ee(l._id),qe()}catch(se){C(se.message||"Failed to remove member","error"),u.disabled=!1}}})}async function G(){if(!l||l.type==="direct")return;const g=l.name;if(confirm(`Are you sure you want to delete the group "${g}"?

All messages in this lounge will be deleted.`))try{await Qe(`/bonding/channels/${l._id}`),C(`Group "${g}" deleted successfully`,"success"),d=await Ue("/bonding/channels").catch(()=>[]),l=d.find(r=>r.type==="group")||d[0]||null,Ke(),qe(),l&&await Ee(l._id)}catch(r){C(r.message||"Failed to delete group","error")}}function N(){const g=i.querySelector("#bonding-modals-root"),b=m=>m==="employee"||m==="admin"||m==="superadmin",r=f.filter(m=>!m.isSelf&&b(m.role));g.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${r.map(m=>`
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
    `,g.querySelector(".bonding-modal-close").onclick=()=>{g.innerHTML=""},g.querySelectorAll(".bonding-user-pick-item").forEach(m=>{m.onclick=async()=>{const L=m.dataset.userId;try{const T=await je("/bonding/channels",{type:"direct",targetUserId:L});g.innerHTML="",d=await Ue("/bonding/channels"),l=d.find(O=>O._id===T._id)||T,Ke(),qe(),await Ee(l._id)}catch(T){C(T.message||"Failed to open personal chat","error")}}})}function w(){const g=i.querySelector("#bonding-modals-root"),b=T=>T==="employee"||T==="admin"||T==="superadmin",r=f.filter(T=>!T.isSelf&&b(T.role));g.innerHTML=`
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
                ${r.map(T=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${T._id}" />
                    <span>${x(T.name)} (${x(T.role==="superadmin"?"Superadmin":T.role==="admin"?"Admin":"Employee")})</span>
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
    `,g.querySelector(".bonding-modal-close").onclick=()=>{g.innerHTML=""},g.querySelector("#btn-cancel-create-grp").onclick=()=>{g.innerHTML=""};let S="👥";const m=g.querySelectorAll(".avatar-opt");m.forEach(T=>{T.onclick=()=>{m.forEach(O=>O.classList.remove("active")),T.classList.add("active"),S=T.textContent.trim()}});const L=g.querySelector("#btn-confirm-create-grp");L.onclick=async()=>{const T=g.querySelector("#new-group-name"),O=g.querySelector("#new-group-desc"),u=T.value.trim();if(!u){C("Please enter a group name","warning"),T.focus();return}const z=g.querySelectorAll(".new-group-member-chk:checked"),P=Array.from(z).map(se=>se.value);try{L.disabled=!0,L.textContent="Creating...";const se=await je("/bonding/channels",{type:"group",name:u,description:O.value.trim(),avatar:S,memberIds:P});C(`Group "${u}" created! 🎉`,"success"),g.innerHTML="",d=await Ue("/bonding/channels"),l=d.find(te=>te._id===se._id)||se,Ke(),qe(),await Ee(l._id)}catch(se){C(se.message||"Failed to create group","error"),L.disabled=!1,L.textContent="Create Group 🎉"}}}function K(g,b){const r=document.querySelector(".bonding-emoji-popup");r&&r.remove();const S=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],m=document.createElement("div");m.className="bonding-emoji-popup",m.innerHTML=S.map(O=>`<button class="emoji-opt-btn" data-e="${O}">${O}</button>`).join("");const L=g.getBoundingClientRect();m.style.top=`${L.bottom+window.scrollY+6}px`,m.style.left=`${L.left+window.scrollX}px`,document.body.appendChild(m),m.querySelectorAll(".emoji-opt-btn").forEach(O=>{O.onclick=u=>{u.stopPropagation(),b(O.dataset.e),m.remove()}});const T=O=>{m.contains(O.target)||(m.remove(),document.removeEventListener("click",T))};setTimeout(()=>document.addEventListener("click",T),10)}function ee(g){if(!g)return"";try{return new Date(g).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Qa(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}const ca=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],St=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Et=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ai(i,t={}){const{userRole:e="employee",currentUser:o=null,initialTicketId:d=null}=t,l=e==="superadmin"||e==="admin";if(e==="client"||o&&o.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let f=[],n={},_=[],E=[],y={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},A=null,D="comments",Q=!1;i.innerHTML=`
    <div class="jira-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="jira-header-bar">
        <div class="jira-header-left">
          <div class="jira-breadcrumb">
            <span class="jira-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${l?"ALL TICKETS (ADMIN)":"INTERNAL TICKETS (ASSIGNED & CREATED)"}</span>
          </div>
          <div class="jira-title-row">
            <h2 class="jira-main-title">🎫 ${l?"Support Tickets Board":"Support Tickets"}</h2>
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

          ${l?`
            <select id="jira-filter-assignee" class="jira-filter-select">
              <option value="all">Assignee: All</option>
              <option value="unassigned">Unassigned</option>
            </select>

            <button type="button" class="jira-pill-filter" id="jira-pill-my-issues">
              Only My Issues
            </button>
          `:`
            <button type="button" class="jira-pill-filter active" id="jira-pill-scope-all">
              📁 All My Tickets
            </button>
            <button type="button" class="jira-pill-filter" id="jira-pill-scope-assigned">
              👤 Assigned to Me
            </button>
            <button type="button" class="jira-pill-filter" id="jira-pill-scope-created">
              ✍️ Created by Me
            </button>
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
  `,await Promise.all([ze(),xe(),lt(),rt()]),Ee(),Ke(),dt(),it(),d&&tt(d);const X=setInterval(()=>{if(!document.contains(i)){clearInterval(X);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!A&&fe()},12e3),Ce=()=>{document.contains(i)&&!A&&fe()};window.addEventListener("focus",Ce);async function xe(){try{const a=new URLSearchParams;y.search&&a.set("search",y.search),y.priority!=="all"&&a.set("priority",y.priority),y.category!=="all"&&a.set("category",y.category),y.assigneeId!=="all"&&a.set("assigneeId",y.assigneeId),y.jobId&&y.jobId!=="all"&&a.set("jobId",y.jobId),y.reporterId&&y.reporterId!=="all"&&a.set("reporterId",y.reporterId),y.scope==="created"&&a.set("reporterId",(o==null?void 0:o._id)||(o==null?void 0:o.id)),y.scope==="assigned"&&a.set("assigneeId",(o==null?void 0:o._id)||(o==null?void 0:o.id)),y.myIssuesOnly&&a.set("myIssuesOnly","true");const s=await Ue("/tickets?"+a.toString());f=Array.isArray(s)?s:[]}catch(a){C(a.message||"Failed to load tickets",!0),f=[]}}async function ze(){try{n=await Ue("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function lt(){try{_=(await Ue("/users")||[]).filter(s=>s.active&&s.role!=="client")}catch(a){console.warn("Could not fetch employees:",a)}}async function rt(){try{const a=await Ue("/jobs?limit=250");E=Array.isArray(a)?a:(a==null?void 0:a.jobs)||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function Ee(){const a=i.querySelector("#jira-stats-root");a&&(a.innerHTML=`
      <div class="jira-stat-card ${y.status==="all"&&!y.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="jira-stat-val">${n.total||0}</span>
        <span class="jira-stat-lbl">Total Tickets</span>
      </div>
      <div class="jira-stat-card ${y.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="jira-stat-val">${n.toDo||0}</span>
        <span class="jira-stat-lbl">To Do</span>
      </div>
      <div class="jira-stat-card content ${y.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="jira-stat-val">${n.content??(n.inProgress||0)}</span>
        <span class="jira-stat-lbl">Content</span>
      </div>
      <div class="jira-stat-card design ${y.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="jira-stat-val">${n.design||0}</span>
        <span class="jira-stat-lbl">Design</span>
      </div>
      <div class="jira-stat-card review ${y.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="jira-stat-val">${n.underReview||0}</span>
        <span class="jira-stat-lbl">Under Review</span>
      </div>
      <div class="jira-stat-card ready ${y.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
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
    `,a.querySelectorAll(".jira-stat-card").forEach(s=>{s.onclick=async()=>{const k=s.dataset.statFilter;k==="all"?(y.status="all",y.priority="all"):k==="critical"?(y.priority="Critical",y.status="all"):(y.status=k,y.priority="all"),await fe()}}))}function dt(){const a=i.querySelector("#jira-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${_.map(k=>`
          <option value="${k._id}" ${y.assigneeId===k._id.toString()?"selected":""}>
            ${x(k.name)} (${x(k.role)})
          </option>
        `).join("")}
      `);const s=i.querySelector("#jira-filter-job");s&&(s.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${E.map(k=>`
          <option value="${k._id}" ${y.jobId===k._id.toString()?"selected":""}>
            📁 ${x(k.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function Ke(){const a=i.querySelector("#jira-board-columns-root");if(!a)return;const s={};ca.forEach(k=>{s[k.key]=[]}),f.forEach(k=>{let R=k.status||"To Do";R==="In Progress"?R="Content":R==="Resolved"?R="Under Review":R==="Closed"&&(R="Ready to Leave"),s[R]||(s[R]=[]),s[R].push(k)}),a.innerHTML=ca.map(k=>{const R=s[k.key]||[];return`
        <div class="jira-board-column" data-status="${k.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${x(k.label)}</span>
              <span class="jira-col-badge">${R.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${k.key}">
            ${R.length===0?`
              <div style="padding:28px 10px;text-align:center;color:#475569;font-size:12px;font-style:italic;">
                No tickets
              </div>
            `:R.map(V=>vt(V)).join("")}
          </div>
        </div>
      `}).join(""),qe(),at()}function vt(a){const s=St.find(K=>K.key===a.category)||St[0],k=Et.find(K=>K.key===a.priority)||Et[2],R=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",V=(a.subtasks||[]).filter(K=>K.completed).length,W=(a.subtasks||[]).length,q=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],G=(o==null?void 0:o._id)||(o==null?void 0:o.id),N=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(G);let w="";if(q.length===0)w='<div class="jira-avatar unassigned" title="Unassigned">?</div>';else{const K=q.slice(0,3),ee=q.length-3;w=`
        <div class="jira-avatar-group">
          ${K.map(de=>{var oe;return`
            <div class="jira-avatar" title="Assignee: ${x(de.name||"Member")} (${x(de.role||"")})">
              ${(de.avatar||((oe=de.name)==null?void 0:oe.slice(0,1))||"U").toUpperCase()}
            </div>
          `}).join("")}
          ${ee>0?`
            <div class="jira-avatar extra-count" title="${ee} more assignees: ${x(q.slice(3).map(de=>de.name).join(", "))}">
              +${ee}
            </div>
          `:""}
        </div>
      `}return`
      <div class="jira-card" draggable="true" data-ticket-id="${a._id}">
        <div class="jira-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="jira-category-pill ${s.slug}">
              ${s.icon} ${s.label}
            </span>
            ${N?`
              <span class="jira-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${a.dueDate?`
              <span class="jira-due-pill ${R?"overdue":""}" title="Due Date">
                ${R?"⚠️ ":"📅 "}
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
            <span class="jira-pri-icon" title="Priority: ${k.label}">${k.icon}</span>
            <span class="jira-ticket-id">${x(a.ticketId)}</span>
          </div>

          <div class="jira-card-assignee-row">
            ${W>0?`
              <span class="jira-subtask-badge" title="${V} of ${W} subtasks completed">
                ☑ ${V}/${W}
              </span>
            `:""}
            ${w}
          </div>
        </div>
      </div>
    `}function qe(){const a=i.querySelectorAll(".jira-card"),s=i.querySelectorAll(".jira-board-column");a.forEach(k=>{k.ondragstart=R=>{R.dataTransfer.setData("text/plain",k.dataset.ticketId),k.classList.add("dragging")},k.ondragend=()=>{k.classList.remove("dragging")}}),s.forEach(k=>{k.ondragover=R=>{R.preventDefault(),k.classList.add("drag-over")},k.ondragleave=()=>{k.classList.remove("drag-over")},k.ondrop=async R=>{R.preventDefault(),k.classList.remove("drag-over");const V=R.dataTransfer.getData("text/plain"),W=k.dataset.status;if(!V||!W)return;const q=f.find(N=>N._id.toString()===V);if(!q||q.status===W)return;const G=q.status;q.status=W,Ke();try{const N=await Je(`/tickets/${V}/status`,{status:W});C(`Moved ${N.ticketId} to ${W}`,!1),await fe()}catch(N){C(N.message||"Status update failed",!0),q.status=G,await fe()}}})}function at(){i.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async s=>{s.stopPropagation(),s.preventDefault();const k=a.dataset.ticketId,R=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${R}?`)){a.disabled=!0;try{await Qe(`/tickets/${k}`),C(`Ticket ${R} deleted`,!1),await fe()}catch(V){C(V.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),i.querySelectorAll(".jira-card").forEach(a=>{a.onclick=s=>{if(s.target.tagName==="A"||s.target.closest(".btn-delete-card-ticket"))return;const k=a.dataset.ticketId;tt(k)}})}function it(){const a=i.querySelector("#btn-jira-refresh");a&&(a.onclick=async()=>{await fe(),C("Board updated",!1)});const s=i.querySelector("#btn-jira-create-ticket");s&&(s.onclick=()=>{I()});const k=i.querySelector("#jira-search-input");let R=null;k&&(k.oninput=J=>{clearTimeout(R),R=setTimeout(async()=>{y.search=J.target.value.trim(),Re(),await fe()},300)});const V=i.querySelector("#jira-filter-priority");V&&(V.onchange=async J=>{y.priority=J.target.value,Re(),await fe()});const W=i.querySelector("#jira-filter-category");W&&(W.onchange=async J=>{y.category=J.target.value,Re(),await fe()});const q=i.querySelector("#jira-filter-job");q&&(q.onchange=async J=>{y.jobId=J.target.value,Re(),await fe()});const G=i.querySelector("#jira-filter-assignee");G&&(G.onchange=async J=>{y.assigneeId=J.target.value,Re(),await fe()});const N=i.querySelector("#jira-pill-my-issues");N&&(N.onclick=async()=>{y.myIssuesOnly=!y.myIssuesOnly,N.classList.toggle("active",y.myIssuesOnly),Re(),await fe()});const w=i.querySelector("#jira-pill-scope-all"),K=i.querySelector("#jira-pill-scope-assigned"),ee=i.querySelector("#jira-pill-scope-created"),de=async J=>{y.scope=J,w&&w.classList.toggle("active",J==="all"),K&&K.classList.toggle("active",J==="assigned"),ee&&ee.classList.toggle("active",J==="created"),Re(),await fe()};w&&(w.onclick=()=>de("all")),K&&(K.onclick=()=>de("assigned")),ee&&(ee.onclick=()=>de("created"));const oe=i.querySelector("#jira-clear-filters");oe&&(oe.onclick=async()=>{y={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},k&&(k.value=""),V&&(V.value="all"),W&&(W.value="all");const J=i.querySelector("#jira-filter-job");J&&(J.value="all"),G&&(G.value="all"),N&&N.classList.remove("active"),w&&w.classList.add("active"),K&&K.classList.remove("active"),ee&&ee.classList.remove("active"),Re(),await fe()})}function Re(){const a=i.querySelector("#jira-clear-filters");if(!a)return;const s=y.search||y.priority!=="all"||y.category!=="all"||y.jobId&&y.jobId!=="all"||y.assigneeId!=="all"||y.myIssuesOnly||y.scope&&y.scope!=="all";a.style.display=s?"inline":"none"}async function fe(){await xe(),Ke()}async function tt(a){const s=i.querySelector("#jira-modals-root");if(s){s.innerHTML=`
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{A=await Ue(`/tickets/${a}`)}catch(k){C(k.message||"Could not load ticket",!0),s.innerHTML="";return}ye()}}function ye(){var m,L,T,O;const a=i.querySelector("#jira-modals-root");if(!a||!A)return;const s=A,k=St.find(u=>u.key===s.category)||St[0];Et.find(u=>u.key===s.priority)||Et[2];const R=s.subtasks||[],V=R.filter(u=>u.completed).length,W=R.length>0?Math.round(V/R.length*100):0,q=s.attachments||[],G=s.comments||[],N=(s.history||[]).slice().reverse(),w=s.workLogs||[],K=s.linkedTickets||[],ee=(o==null?void 0:o._id)||(o==null?void 0:o.id),de=s.reporter&&s.reporter.userId&&String(s.reporter.userId)===String(ee)||s.userId&&String(s.userId)===String(ee),oe=Array.isArray(s.assignees)&&s.assignees.length>0?s.assignees:s.assignee&&s.assignee.userId?[s.assignee]:[],J=oe.some(u=>u&&u.userId&&String(u.userId)===String(ee)),g=e==="superadmin"||e==="admin",b=g||de||J,r=(m=s.jobId)!=null&&m._id?s.jobId._id.toString():s.jobId?s.jobId.toString():"",S=s.jobTitle||s.jobId&&s.jobId.title||"";a.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${k.slug}">${k.icon} ${k.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${x(s.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${x(s.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Description</span>
                  <button type="button" class="jira-tool-btn" id="btn-toggle-desc-edit">
                    ${Q?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${Q?`
                  <div class="jira-editor-toolbar">
                    <button type="button" class="jira-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="jira-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="jira-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="jira-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${x(s.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${s.description?x(s.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Attachments Section (MP4 & heavy files up to 1GB supported) -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Attachments (${q.length})</span>
                  <label class="btn-jira-secondary" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>🎥 Upload File / MP4 Video (Up to 1GB)</span>
                    <input type="file" id="inp-detail-att-upload" multiple accept="*/*,video/mp4,video/*,.mp4,.mov,.webm,.avi" style="display:none;" />
                  </label>
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${q.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="jira-attachments-grid">
                    ${q.map(u=>{const z=u.type&&u.type.includes("video")||u.name&&u.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||u.url&&u.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="jira-att-card ${z?"is-video":""}" style="${z?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="jira-att-left">
                              <span style="font-size:${z?"16px":"13px"};">${z?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${u.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${x(u.name)}">
                                  ${x(u.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${Ht(u.size)} ${z?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${z?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${u.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${u.url}" download="${x(u.name)}" class="btn-jira-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="jira-att-del btn-del-att" data-att-id="${u.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${z?`
                            <div class="jira-video-slot" id="video-slot-${u.id}" style="display:none;margin-top:6px;width:100%;">
                              <video controls preload="metadata" style="width:100%;max-height:360px;border-radius:6px;background:#000;">
                                <source src="${u.url}" type="${u.type||"video/mp4"}">
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
                  <span>Subtasks (${V}/${R.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${W}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${W}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${R.map(u=>`
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${u.id}" ${u.completed?"checked":""} />
                        <span class="jira-subtask-title ${u.completed?"done":""}">${x(u.title)}</span>
                      </div>
                      <button type="button" class="jira-att-del btn-del-subtask" data-subtask-id="${u.id}" title="Remove subtask">&times;</button>
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
                  <span>Linked Work Items (${K.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${K.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${K.map(u=>`
                      <div class="jira-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${x(u.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${x(u.ticketId)}</span>
                          <span style="font-size:12.5px;color:#f1f5f9;">${x(u.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${x(u.status||"Open")}</span>
                          <button type="button" class="jira-att-del btn-del-link" data-link-id="${u.id}" title="Remove link">&times;</button>
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
                    ${S?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${S?`
                  <div class="jira-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div style="font-weight:700;color:#f8fafc;font-size:13px;">${x(S)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${x(r)}</div>
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
                      ${E.map(u=>`
                        <option value="${u._id}" ${r===u._id.toString()?"selected":""}>
                          📁 ${x(u.title||"Untitled Job")}
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
                  <button type="button" class="jira-act-tab ${D==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${G.length})
                  </button>
                  <button type="button" class="jira-act-tab ${D==="history"?"active":""}" data-act-tab="history">
                    History (${N.length})
                  </button>
                  <button type="button" class="jira-act-tab ${D==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${w.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${D==="comments"?`
                  <div class="jira-comments-feed">
                    ${G.map(u=>`
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(u.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${x(u.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${x(u.userRole)})</span></span>
                            <span class="jira-comment-time">${ta(u.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${x(u.content)}</div>
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
                ${D==="history"?`
                  <div class="jira-history-feed">
                    ${N.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:N.map(u=>`
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(u.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${x(u.userName)}</span>
                            <span class="jira-comment-time">${ta(u.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong style="color:#cbd5e1;">${x(u.field)}</strong>:
                            ${u.from?`<span style="text-decoration:line-through;color:#ef4444;">${x(u.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${x(u.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${D==="worklog"?`
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

                    ${w.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:w.map(u=>`
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(u.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${x(u.userName)} logged <strong style="color:#38bdf8;">${x(u.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${ta(u.loggedAt)}</span>
                          </div>
                          ${u.description?`<div style="font-size:12px;color:#cbd5e1;">${x(u.description)}</div>`:""}
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
                  ${ca.map(u=>{let z=s.status||"To Do";return z==="In Progress"?z="Content":z==="Resolved"?z="Under Review":z==="Closed"&&(z="Ready to Leave"),`
                      <option value="${u.key}" ${z===u.key?"selected":""}>
                        ${u.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${Et.map(u=>`
                    <option value="${u.key}" ${s.priority===u.key?"selected":""}>
                      ${u.icon} ${u.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="jira-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="jira-side-lbl" style="margin-bottom:0;">Assigned Personnel (${oe.length})</span>
                  ${b?`
                    <button type="button" class="jira-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  `:""}
                </div>

                <div class="jira-assigned-chips-wrap">
                  ${oe.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:oe.map(u=>{var z;return`
                    <div class="jira-assignee-chip">
                      <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(u.avatar||((z=u.name)==null?void 0:z.slice(0,1))||"U").toUpperCase()}
                      </div>
                      <span class="jira-assignee-chip-name" title="${x(u.name)}">${x(u.name)}</span>
                      ${b?`
                        <button type="button" class="jira-assignee-chip-remove btn-remove-assignee" data-user-id="${u.userId}" title="Remove ${x(u.name)}">&times;</button>
                      `:""}
                    </div>
                  `}).join("")}
                </div>

                <!-- Interactive Multi-select Assignee Picker -->
                <div id="jira-detail-assignee-box" style="display:none;margin-top:8px;padding:10px;background:#162032;border:1px solid #334155;border-radius:6px;">
                  <div style="font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
                    <span>ASSIGN / REASSIGN EMPLOYEES</span>
                    <button type="button" id="btn-close-detail-assignee-box" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:13px;">✕</button>
                  </div>
                  <div class="jira-emp-checklist" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;">
                    ${_.map(u=>{const z=oe.some(P=>P&&P.userId&&String(P.userId)===String(u._id));return`
                        <label class="jira-emp-check-item ${z?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${u._id}" ${z?"checked":""} />
                          <div class="jira-avatar" style="width:18px;height:18px;font-size:9px;">${(u.name||"U").slice(0,1).toUpperCase()}</div>
                          <span style="font-size:12px;color:#f1f5f9;flex:1;">
                            ${x(u.name)} <span style="font-size:10.5px;color:#94a3b8;">(${x(u.role)})</span>
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
                    ${(((L=s.reporter)==null?void 0:L.name)||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${x(((T=s.reporter)==null?void 0:T.name)||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${x(((O=s.reporter)==null?void 0:O.role)||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${St.map(u=>`
                    <option value="${u.key}" ${s.category===u.key?"selected":""}>
                      ${u.icon} ${u.label}
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
                  ${E.map(u=>`
                    <option value="${u._id}" ${r===u._id.toString()?"selected":""}>
                      📁 ${x(u.title||"Untitled Job")}
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
              ${g||de||J?`
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
    `,c()}function c(){const a=i.querySelector("#jira-modals-root");if(!a||!A)return;const s=a.querySelector("#btn-close-jira-modal");s&&(s.onclick=j);const k=a.querySelector("#jira-detail-backdrop");k&&(k.onclick=B=>{B.target===k&&j()});const R=a.querySelector("#inp-detail-title");R&&(R.onchange=async()=>{const B=R.value.trim();if(B)try{A=await Je(`/tickets/${A._id}`,{title:B}),await fe()}catch(U){C(U.message||"Failed to update title",!0)}});const V=a.querySelector("#btn-toggle-desc-edit");V&&(V.onclick=()=>{Q=!Q,ye()});const W=a.querySelector("#btn-cancel-desc");W&&(W.onclick=()=>{Q=!1,ye()});const q=a.querySelector("#btn-save-desc");q&&(q.onclick=async()=>{var U;const B=(U=a.querySelector("#inp-detail-desc"))==null?void 0:U.value;try{A=await Je(`/tickets/${A._id}`,{description:B}),Q=!1,ye(),await fe(),C("Description saved",!1)}catch(ce){C(ce.message||"Failed to save description",!0)}});const G=a.querySelector("#sel-detail-status");G&&(G.onchange=async B=>{try{const U=await Je(`/tickets/${A._id}/status`,{status:B.target.value});A=U,ye(),await ze(),Ee(),await fe(),C(`Status changed to ${U.status}`,!1)}catch(U){C(U.message||"Status change failed",!0)}});const N=a.querySelector("#sel-detail-priority");N&&(N.onchange=async B=>{try{A=await Je(`/tickets/${A._id}`,{priority:B.target.value}),ye(),await fe()}catch(U){C(U.message,!0)}});const w=a.querySelector("#btn-toggle-assignee-picker"),K=a.querySelector("#jira-detail-assignee-box"),ee=a.querySelector("#btn-close-detail-assignee-box"),de=a.querySelector("#btn-save-detail-assignees");w&&K&&(w.onclick=()=>{const B=K.style.display==="none";K.style.display=B?"block":"none"}),ee&&K&&(ee.onclick=()=>{K.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(B=>{B.onchange=()=>{var U;(U=B.closest(".jira-emp-check-item"))==null||U.classList.toggle("selected",B.checked)}}),de&&(de.onclick=async()=>{const B=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(U=>U.value);try{de.disabled=!0,A=await Je(`/tickets/${A._id}`,{assigneeIds:B}),ye(),await fe(),C("Assignees updated!",!1)}catch(U){C(U.message,!0),de.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(B=>{B.onclick=async()=>{var Ae;const U=B.dataset.userId,we=(Array.isArray(A.assignees)&&A.assignees.length>0?A.assignees:(Ae=A.assignee)!=null&&Ae.userId?[A.assignee]:[]).filter(De=>De&&De.userId&&String(De.userId)!==String(U)).map(De=>String(De.userId));try{A=await Je(`/tickets/${A._id}`,{assigneeIds:we}),ye(),await fe(),C("Assignee removed",!1)}catch(De){C(De.message,!0)}}});const oe=a.querySelector("#sel-detail-category");oe&&(oe.onchange=async B=>{try{A=await Je(`/tickets/${A._id}`,{category:B.target.value}),ye(),await fe()}catch(U){C(U.message,!0)}});const J=a.querySelector("#inp-detail-duedate");J&&(J.onchange=async B=>{try{A=await Je(`/tickets/${A._id}`,{dueDate:B.target.value||null}),ye(),await fe()}catch(U){C(U.message,!0)}});const g=a.querySelector("#sel-detail-job");g&&(g.onchange=async B=>{try{A=await Je(`/tickets/${A._id}`,{jobId:B.target.value||null}),ye(),await fe(),C(B.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(U){C(U.message,!0)}});const b=a.querySelector("#btn-toggle-job-link"),r=a.querySelector("#jira-job-link-box");b&&r&&(b.onclick=()=>{r.style.display=r.style.display==="none"?"block":"none"});const S=a.querySelector("#btn-cancel-job-link");S&&r&&(S.onclick=()=>{r.style.display="none"});const m=a.querySelector("#btn-save-job-link");m&&(m.onclick=async()=>{var U;const B=((U=a.querySelector("#inp-modal-job-select"))==null?void 0:U.value)||null;try{A=await Je(`/tickets/${A._id}`,{jobId:B}),ye(),await fe(),C(B?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(ce){C(ce.message,!0)}});const L=a.querySelector("#btn-unlink-job");L&&(L.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{A=await Je(`/tickets/${A._id}`,{jobId:null}),ye(),await fe(),C("Job unlinked",!1)}catch(B){C(B.message,!0)}});const T=a.querySelector("#inp-detail-esthours");T&&(T.onchange=async B=>{try{A=await Je(`/tickets/${A._id}`,{estimatedHours:Number(B.target.value)||0})}catch(U){C(U.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(B=>{B.onchange=async()=>{const U=B.dataset.subtaskId;try{A=await Je(`/tickets/${A._id}/subtasks/${U}`,{completed:B.checked}),ye(),await fe()}catch(ce){C(ce.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(B=>{B.onclick=async()=>{const U=B.dataset.subtaskId;try{A=await Qe(`/tickets/${A._id}/subtasks/${U}`),ye(),await fe()}catch(ce){C(ce.message,!0)}}});const O=a.querySelector("#inp-new-subtask"),u=a.querySelector("#btn-add-subtask"),z=async()=>{const B=O==null?void 0:O.value.trim();if(B)try{A=await je(`/tickets/${A._id}/subtasks`,{title:B}),ye(),await fe()}catch(U){C(U.message,!0)}};u&&(u.onclick=z),O&&(O.onkeydown=B=>{B.key==="Enter"&&(B.preventDefault(),z())});const P=a.querySelector("#inp-detail-att-upload"),se=a.querySelector("#detail-att-upload-progress");P&&(P.onchange=async B=>{const U=Array.from(B.target.files);if(!U.length)return;const ce=[];se&&(se.style.display="block");for(let we=0;we<U.length;we++){const Ae=U[we];se&&(se.innerHTML=`
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
                <span>Uploading <strong>${x(Ae.name)}</strong> (${Ht(Ae.size)})...</span>
                <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
              </div>
              <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
                <div id="att-prog-bar" style="width:0%;height:100%;background:#38bdf8;transition:width 0.15s ease;"></div>
              </div>
            `);try{const De=await ga(Ae,xt=>{const yt=a.querySelector("#att-prog-pct"),kt=a.querySelector("#att-prog-bar");yt&&(yt.textContent=`${xt}%`),kt&&(kt.style.width=`${xt}%`)});De&&ce.push({name:De.name||Ae.name,url:De.url,size:De.size||Ae.size,type:De.type||Ae.type||"video/mp4"})}catch(De){console.error("Upload error for file:",Ae.name,De),C(`Upload failed for ${Ae.name}: ${De.message}`,!0)}}if(se&&(se.style.display="none"),ce.length)try{A=await je(`/tickets/${A._id}/attachments`,{attachments:ce}),ye(),C(`Successfully attached ${ce.length} file(s)! 🎥`,!1)}catch(we){C(we.message||"Failed to attach file(s)",!0)}}),a.querySelectorAll(".btn-play-att-video").forEach(B=>{B.onclick=()=>{const U=B.dataset.slot,ce=a.querySelector("#"+U);if(ce){const we=ce.style.display==="none";ce.style.display=we?"block":"none",B.textContent=we?"⏸ Close Video":"▶ Play Video";const Ae=ce.querySelector("video");Ae&&we?Ae.play().catch(()=>{}):Ae&&Ae.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(B=>{B.onclick=async()=>{const U=B.dataset.attId;try{A=await Qe(`/tickets/${A._id}/attachments/${U}`),ye()}catch(ce){C(ce.message,!0)}}}),a.querySelectorAll(".jira-act-tab").forEach(B=>{B.onclick=()=>{D=B.dataset.actTab,ye()}});const te=a.querySelector("#inp-new-comment"),pe=a.querySelector("#btn-submit-comment");pe&&te&&(pe.onclick=async()=>{const B=te.value.trim();if(B)try{pe.disabled=!0,pe.textContent="Saving...",A=await je(`/tickets/${A._id}/comments`,{content:B}),ye(),C("Comment added",!1)}catch(U){C(U.message||"Failed to add comment",!0)}finally{pe.disabled=!1}});const Z=a.querySelector("#btn-open-link-dialog"),H=a.querySelector("#jira-link-box"),Y=a.querySelector("#btn-cancel-link"),ne=a.querySelector("#btn-submit-link"),he=a.querySelector("#inp-link-target"),Se=a.querySelector("#sel-link-rel");Z&&H&&(Z.onclick=()=>{H.style.display="block"}),Y&&H&&(Y.onclick=()=>{H.style.display="none"}),ne&&H&&(ne.onclick=async()=>{const B=he==null?void 0:he.value.trim(),U=(Se==null?void 0:Se.value)||"relates to";if(B)try{ne.disabled=!0,A=await je(`/tickets/${A._id}/links`,{targetTicketId:B,relationship:U}),ye(),C(`Linked with ${B}`,!1)}catch(ce){C(ce.message||"Failed to link ticket",!0)}finally{ne.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(B=>{B.onclick=async()=>{const U=B.dataset.linkId;try{A=await Qe(`/tickets/${A._id}/links/${U}`),ye()}catch(ce){C(ce.message,!0)}}});const Te=a.querySelector("#btn-open-worklog-dialog"),Pe=a.querySelector("#jira-worklog-box"),be=a.querySelector("#btn-cancel-worklog"),me=a.querySelector("#btn-submit-worklog"),_e=a.querySelector("#inp-worklog-time"),Ne=a.querySelector("#inp-worklog-desc");Te&&Pe&&(Te.onclick=()=>{Pe.style.display="block"}),be&&Pe&&(be.onclick=()=>{Pe.style.display="none"}),me&&Pe&&(me.onclick=async()=>{const B=_e==null?void 0:_e.value.trim(),U=Ne==null?void 0:Ne.value.trim();if(!B){C("Enter time spent (e.g. 2h 30m)",!0);return}try{me.disabled=!0,A=await je(`/tickets/${A._id}/worklogs`,{timeSpent:B,description:U}),ye(),C("Work logged",!1)}catch(ce){C(ce.message||"Failed to log work",!0)}finally{me.disabled=!1}});const ke=a.querySelector("#btn-delete-ticket");ke&&(ke.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${A.ticketId}?`))try{ke.disabled=!0,await Qe(`/tickets/${A._id}`),C(`Ticket ${A.ticketId} deleted`,!1),j(),await ze(),Ee(),await fe()}catch(B){C(B.message||"Failed to delete ticket",!0),ke.disabled=!1}})}function j(){A=null,Q=!1;const a=i.querySelector("#jira-modals-root");a&&(a.innerHTML="")}function I(a=null){const s=i.querySelector("#jira-modals-root");if(!s)return;const k=a||(y.jobId&&y.jobId!=="all"?y.jobId:null);s.innerHTML=`
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
                  ${St.map(r=>`<option value="${r.key}">${r.icon} ${r.label}</option>`).join("")}
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
                  ${_.map(r=>{const S=o&&String(o._id||o.id)===String(r._id);return`
                      <label class="jira-emp-check-item ${S?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${r._id}" ${S?"checked":""} />
                        <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(r.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span style="font-size:12px;color:#f1f5f9;flex:1;">
                          ${x(r.name)} <span style="font-size:10.5px;color:#94a3b8;">(${x(r.role)})${S?" — (You)":""}</span>
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
                  ${E.map(r=>`
                    <option value="${r._id}" ${k&&String(k)===String(r._id)?"selected":""}>
                      📁 ${x(r.title||"Untitled Job")}
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
                <input type="file" id="inp-create-ticket-att" multiple accept="*/*,video/mp4,video/*,.mp4,.mov,.webm,.avi" style="display:none;" />
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
    `;const R=()=>{s.querySelectorAll(".jira-emp-check-item").forEach(r=>{const S=r.querySelector(".chk-create-emp");r.classList.toggle("selected",!!(S!=null&&S.checked))})};s.querySelectorAll(".chk-create-emp").forEach(r=>{r.onchange=R});const V=s.querySelector("#btn-create-assign-self");V&&o&&(V.onclick=()=>{const r=String(o._id||o.id);s.querySelectorAll(".chk-create-emp").forEach(S=>{S.value===r&&(S.checked=!0)}),R()});const W=s.querySelector("#btn-create-clear-assign");W&&(W.onclick=()=>{s.querySelectorAll(".chk-create-emp").forEach(r=>{r.checked=!1}),R()});const q=[],G=s.querySelector("#inp-create-ticket-att"),N=s.querySelector("#create-att-list"),w=s.querySelector("#create-att-count"),K=s.querySelector("#create-att-progress"),ee=()=>{w&&(w.textContent=`${q.length} file(s) attached`),N&&(N.innerHTML=q.map((r,S)=>{const m=r.type&&r.type.includes("video")||r.name&&r.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="jira-att-card">
            <div class="jira-att-left">
              <span>${m?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="jira-att-name" title="${x(r.name)}">${x(r.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${Ht(r.size)} ${m?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="jira-att-del btn-del-pending-att" data-idx="${S}" title="Remove">&times;</button>
          </div>
        `}).join(""),N.querySelectorAll(".btn-del-pending-att").forEach(r=>{r.onclick=()=>{q.splice(Number(r.dataset.idx),1),ee()}}))};G&&(G.onchange=async r=>{const S=Array.from(r.target.files);if(S.length){K&&(K.style.display="block");for(const m of S){K&&(K.innerHTML=`
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
                <span>Uploading <strong>${x(m.name)}</strong> (${Ht(m.size)})...</span>
                <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
              </div>
              <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
                <div id="create-prog-bar" style="width:0%;height:100%;background:#38bdf8;transition:width 0.15s ease;"></div>
              </div>
            `);try{const L=await ga(m,T=>{const O=s.querySelector("#create-prog-pct"),u=s.querySelector("#create-prog-bar");O&&(O.textContent=`${T}%`),u&&(u.style.width=`${T}%`)});L&&(q.push({name:L.name||m.name,url:L.url,size:L.size||m.size,type:L.type||m.type||"video/mp4"}),ee())}catch(L){C(`Failed to upload ${m.name}: ${L.message}`,!0)}}K&&(K.style.display="none"),G.value=""}});const de=()=>{s.innerHTML=""},oe=s.querySelector("#btn-close-create-modal");oe&&(oe.onclick=de);const J=s.querySelector("#btn-cancel-create-ticket");J&&(J.onclick=de);const g=s.querySelector("#jira-create-backdrop");g&&(g.onclick=r=>{r.target===g&&de()});const b=s.querySelector("#btn-submit-create-ticket");b&&(b.onclick=async()=>{var P,se,te,pe,Z,H;const r=(P=s.querySelector("#create-ticket-title"))==null?void 0:P.value.trim(),S=(se=s.querySelector("#create-ticket-desc"))==null?void 0:se.value.trim(),m=((te=s.querySelector("#create-ticket-cat"))==null?void 0:te.value)||"Task",L=((pe=s.querySelector("#create-ticket-pri"))==null?void 0:pe.value)||"Medium",O=Array.from(s.querySelectorAll(".chk-create-emp:checked")).map(Y=>Y.value),u=((Z=s.querySelector("#create-ticket-duedate"))==null?void 0:Z.value)||null,z=((H=s.querySelector("#create-ticket-job"))==null?void 0:H.value)||null;if(!r){C("Ticket summary / title is required",!0);return}try{b.disabled=!0,b.textContent="Creating...";const Y=await je("/tickets",{title:r,description:S,category:m,priority:L,assigneeIds:O,assigneeId:O[0]||null,dueDate:u,jobId:z,attachments:q});C(`Ticket ${Y.ticketId} created! 🎫`,!1),de(),await ze(),Ee(),await fe(),tt(Y._id)}catch(Y){C(Y.message||"Could not create ticket",!0),b.disabled=!1,b.textContent="Create Ticket 🚀"}})}i._openCreateTicketModal=I,i._openTicketDetailModal=tt,i._setJobFilter=async a=>{y.jobId=a||"all";const s=i.querySelector("#jira-filter-job");s&&(s.value=y.jobId),Re(),await fe()}}export{ai as a,ti as b,ei as i};
