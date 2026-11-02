var ya=Object.defineProperty;var ka=(i,t,e)=>t in i?ya(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Ae=(i,t,e)=>ka(i,typeof t!="symbol"?t+"":t,e);import{c as Ge,h as S,e as w,n as Ye,j as Je,o as Ft,k as Wt,g as _e,t as ea}from"./api-DE9AjBe4.js";const ua={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function wa(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},ua,JSON.parse(i))}catch{}return Object.assign({},ua)}function $a(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function nt(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),o=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${o}`}function Ht(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const o=e.getFullYear(),d=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${o}-${d}-${s}`}function Ct(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function ft(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ga(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function ta(i,t=1){const e=new Date(i+"T00:00:00"),o=e.getDay(),d=(o<t?7:0)+o-t,s=new Date(e);s.setDate(e.getDate()-d);const f=[];for(let n=0;n<7;n++){const C=new Date(s);C.setDate(s.getDate()+n);const E=C.getFullYear(),x=String(C.getMonth()+1).padStart(2,"0"),j=String(C.getDate()).padStart(2,"0");f.push(`${E}-${x}-${j}`)}return f}function Sa(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,o=t.createOscillator(),d=t.createGain();o.type="sine",o.frequency.setValueAtTime(523.25,e),o.frequency.exponentialRampToValueAtTime(783.99,e+.15),d.gain.setValueAtTime(.2,e),d.gain.exponentialRampToValueAtTime(.001,e+.35),o.connect(d),d.connect(t.destination),o.start(e),o.stop(e+.35)}catch{}}function Xa(i,t={}){const{userRole:e="employee",currentUser:o=null,onNavigate:d=null}=t,s=e==="superadmin"||e==="admin";let f=wa(),n={selectedDate:nt(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ca(),C();async function C(){n.loading=!0,E();try{const c=[Ge("/tasks")];s&&c.push(Ge("/personnel").catch(()=>[]));const[_,I]=await Promise.all(c);n.tasks=Array.isArray(_)?_:[],I&&(n.personnelList=Array.isArray(I)?I:[])}catch(c){S("Failed to load planner tasks: "+c.message,!0)}finally{n.loading=!1,Q()}}function E(){i.innerHTML=`
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
    `}function x(c){return n.tasks.filter(_=>{var a;if(_.isDeleted===!0)return!1;if(s&&n.selectedPersonnelId!=="all"){const r=((a=_.personnelId)==null?void 0:a._id)||_.personnelId;if(String(r)!==String(n.selectedPersonnelId))return!1}const I=_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):"");return I?I===c:c===nt()})}function j(c,_){if(c.status==="Completed")return!1;const I=c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):"");return I?I<_:!1}function P(c,_){const I=c.length,a=c.filter(W=>W.status==="Completed").length,r=c.filter(W=>W.status==="In Progress").length,y=c.filter(W=>W.status==="Pending"||W.status==="Todo").length,z=c.filter(W=>j(W,_)).length,Y=I>0?Math.round(a/I*100):0;return{total:I,completed:a,inProgress:r,pending:y,overdue:z,percent:Y}}function Q(){const c=nt(),_=n.selectedDate===c,I=x(n.selectedDate),a=P(I,c);i.innerHTML=`
      <div class="ci360-planner-wrap ${f.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${ft(n.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${w(f.displayName||"Daily Planner")}</h1>
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
              <span class="date-text" id="displayDateLabel">${Ct(n.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${n.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${_?"is-current":""}" id="btnJumpToday">
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
                    ${w(r.name)} (${w(r.department||r.role||"Team")})
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
    `,Te(),dt()}function X(c,_){return n.viewMode==="weekly"?lt():n.viewMode==="report"?rt():$e(c,_)}function $e(c,_){const I=nt();let a=c;if(n.filterStatus==="pending"?a=a.filter(r=>r.status==="Pending"||r.status==="Todo"):n.filterStatus==="in_progress"?a=a.filter(r=>r.status==="In Progress"):n.filterStatus==="completed"?a=a.filter(r=>r.status==="Completed"):n.filterStatus==="overdue"&&(a=a.filter(r=>j(r,I))),n.searchQuery){const r=n.searchQuery.toLowerCase();a=a.filter(y=>(y.title||"").toLowerCase().includes(r)||(y.description||"").toLowerCase().includes(r)||(y.category||"").toLowerCase().includes(r))}return a.sort((r,y)=>{if(r.status==="Completed"&&y.status!=="Completed")return 1;if(r.status!=="Completed"&&y.status==="Completed")return-1;const z={Urgent:0,High:1,Medium:2,Low:3};return(z[r.priority]||2)-(z[y.priority]||2)}),`
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
              <button type="button" class="filter-pill ${n.filterStatus==="all"?"active":""}" data-f="all">All (${_.total})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${_.pending})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${_.inProgress})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${_.completed})</button>
              ${_.overdue>0?`
                <button type="button" class="filter-pill overdue ${n.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${_.overdue})</button>
              `:""}
            </div>

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${w(n.searchQuery)}">
              ${n.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card -->
        <div class="ci360-quick-add-bar">
          <div class="ci360-quick-add-input-wrap">
            <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${ft(n.selectedDate)}... (Press Enter to save)">
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
              ${a.map(r=>Le(r,I)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function xe(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${ft(n.selectedDate)}</h3>
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
    `}function Le(c,_){var z,Y,W,L;const I=c.status==="Completed",a=j(c,_),r=`pri-${(c.priority||"medium").toLowerCase()}`,y=`status-${(c.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
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
            <span class="ci360-task-title">${w(c.title)}</span>
          </div>

          ${c.description?`
            <div class="ci360-task-desc">${w(c.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${r}">
              <span class="badge-dot"></span>
              ${w(c.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${y}">
              ${w(c.status||"Pending")}
            </span>

            <!-- Category -->
            ${c.category?`
              <span class="ci360-badge category-badge">
                #${w(c.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${c.startTime||c.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${c.startTime?w(c.startTime):""}
                   ${c.startTime&&c.dueTime?"–":""}
                   ${c.dueTime?w(c.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${a?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${s&&((z=c.personnelId)!=null&&z.name||(Y=c.userId)!=null&&Y.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${w(((W=c.personnelId)==null?void 0:W.name)||((L=c.userId)==null?void 0:L.name))}
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
    `}function lt(){const c=ta(n.selectedDate,f.weekStartsOn),_=ft(c[0]),I=ft(c[6]),a=nt();return`
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
          ${c.map(r=>{const y=r===a,z=r===n.selectedDate,Y=x(r),W=P(Y,a);return`
              <div class="ci360-day-column ${y?"is-today":""} ${z?"is-selected":""}" data-date="${r}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${r}">
                  <div class="day-name">${ga(r)}</div>
                  <div class="day-number">${new Date(r+"T00:00:00").getDate()}</div>
                  ${y?'<span class="today-pill">Today</span>':""}
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
                        <div class="mini-title">${w(L.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(L.priority||"medium").toLowerCase()}">${L.priority||"Med"}</span>
                          ${L.dueTime?`<span class="mini-time">${w(L.dueTime)}</span>`:""}
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
    `}function rt(){const c=ta(n.selectedDate,f.weekStartsOn),_=Ct(c[0]),I=Ct(c[6]),a=nt(),r=n.tasks.filter(G=>{if(G.isDeleted===!0)return!1;const N=G.dateStr||(G.dueDate?new Date(G.dueDate).toISOString().slice(0,10):"");return c.includes(N)}),y=r.length,z=r.filter(G=>G.status==="Completed").length,Y=r.filter(G=>G.status==="In Progress").length,W=y>0?Math.round(z/y*100):0,L={Urgent:0,High:0,Medium:0,Low:0};return r.forEach(G=>{const N=G.priority||"Medium";L[N]!==void 0&&L[N]++}),`
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
            <span class="value" style="font-size:28px">${y}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${z}</span>
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
                ${c.map(G=>{const N=x(G),v=P(N,a);return`
                    <tr>
                      <td><strong>${ga(G)}</strong></td>
                      <td>${ft(G)}</td>
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
    `}function Te(){const c=document.getElementById("btnViewDaily"),_=document.getElementById("btnViewWeekly"),I=document.getElementById("btnViewReport");c&&(c.onclick=()=>{n.viewMode="daily",Q()}),_&&(_.onclick=()=>{n.viewMode="weekly",Q()}),I&&(I.onclick=()=>{n.viewMode="report",Q()});const a=document.getElementById("btnPrevDay"),r=document.getElementById("btnNextDay"),y=document.getElementById("btnJumpToday"),z=document.getElementById("hiddenDateInput"),Y=document.getElementById("datePickerBadge");a&&(a.onclick=()=>{n.selectedDate=Ht(n.selectedDate,-1),Q()}),r&&(r.onclick=()=>{n.selectedDate=Ht(n.selectedDate,1),Q()}),y&&(y.onclick=()=>{n.selectedDate=nt(),Q()}),Y&&z&&(Y.onclick=()=>{try{typeof z.showPicker=="function"?z.showPicker():z.focus()}catch{z.focus()}},z.onchange=ee=>{ee.target.value&&(n.selectedDate=ee.target.value,Q())});const W=document.getElementById("admTeamSelect");W&&(W.onchange=ee=>{n.selectedPersonnelId=ee.target.value,Q()});const L=document.getElementById("btnOpenAddTaskModal");L&&(L.onclick=()=>Ee());const G=document.getElementById("btnPlannerActionsMenu"),N=document.getElementById("plannerActionsDropdown");G&&N&&(G.onclick=ee=>{ee.stopPropagation(),N.classList.toggle("hidden")},document.addEventListener("click",ee=>{!N.contains(ee.target)&&ee.target!==G&&N.classList.add("hidden")}));const v=document.getElementById("btnActionImport");v&&(v.onclick=()=>{N==null||N.classList.add("hidden"),tt()});const V=document.getElementById("btnActionExportPng");V&&(V.onclick=()=>{N==null||N.classList.add("hidden"),at()});const F=document.getElementById("btnActionExportPdf");F&&(F.onclick=()=>{N==null||N.classList.add("hidden"),be()});const Z=document.getElementById("btnActionBackup");Z&&(Z.onclick=()=>{N==null||N.classList.add("hidden"),et()});const re=document.getElementById("btnActionSettings");re&&(re.onclick=()=>{N==null||N.classList.add("hidden"),ye()})}function dt(c){if(n.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(L=>{L.onclick=()=>{n.filterStatus=L.dataset.f,Q()}});const _=document.getElementById("plannerTaskSearchInp");_&&(_.oninput=L=>{n.searchQuery=L.target.value,Q()});const I=document.getElementById("btnClearSearch");I&&(I.onclick=()=>{n.searchQuery="",Q()});const a=document.getElementById("quickAddTitleInp"),r=document.getElementById("quickAddPriority"),y=document.getElementById("quickAddCategory"),z=document.getElementById("btnQuickAddSubmit"),Y=async()=>{const L=((a==null?void 0:a.value)||"").trim();if(!L){S("Please enter a task title",!0),a==null||a.focus();return}try{const G={title:L,dateStr:n.selectedDate,priority:(r==null?void 0:r.value)||f.defaultPriority,category:(y==null?void 0:y.value)||"General",status:"Pending"};s&&n.selectedPersonnelId!=="all"&&(G.personnelId=n.selectedPersonnelId);const N=await _e("/tasks",G);n.tasks.unshift(N),S("Task added to today's focus! ✨"),a&&(a.value="",a.focus()),Q()}catch(G){S(G.message,!0)}};z&&(z.onclick=Y),a&&(a.onkeydown=L=>{L.key==="Enter"&&Y()});const W=document.getElementById("btnEmptyStateImport");W&&(W.onclick=()=>tt())}if(n.viewMode==="weekly"){const _=document.getElementById("btnPrevWeek"),I=document.getElementById("btnNextWeek"),a=document.getElementById("btnThisWeek");_&&(_.onclick=()=>{n.selectedDate=Ht(n.selectedDate,-7),Q()}),I&&(I.onclick=()=>{n.selectedDate=Ht(n.selectedDate,7),Q()}),a&&(a.onclick=()=>{n.selectedDate=nt(),Q()}),document.querySelectorAll(".day-col-header").forEach(r=>{r.onclick=()=>{n.selectedDate=r.dataset.date,n.viewMode="daily",Q()}}),document.querySelectorAll('[data-action="add-day"]').forEach(r=>{r.onclick=()=>{Ee(null,r.dataset.date)}})}if(n.viewMode==="report"){const _=document.getElementById("btnDownloadWeeklyPdf");_&&(_.onclick=be)}i.querySelectorAll('[data-action="toggle"]').forEach(_=>{_.onclick=async I=>{I.stopPropagation();const a=_.dataset.id;await We(a)}}),i.querySelectorAll('[data-action="edit"]').forEach(_=>{_.onclick=I=>{I.stopPropagation();const a=_.dataset.id,r=n.tasks.find(y=>y._id===a);r&&Ee(r)}}),i.querySelectorAll('[data-action="delete"]').forEach(_=>{_.onclick=async I=>{I.stopPropagation();const a=_.dataset.id;await xt(a)}})}async function We(c){const _=n.tasks.find(a=>a._id===c);if(!_)return;const I=_.status!=="Completed";try{const a=await Ye(`/tasks/${c}/toggle`,{}),r=n.tasks.findIndex(y=>y._id===c);r!==-1&&(n.tasks[r]=a),I?(f.soundEnabled&&Sa(),S("Task marked as completed! 🎉")):S("Task reopened as pending."),Q()}catch(a){S(a.message,!0)}}async function xt(c){const _=n.tasks.find(I=>I._id===c);if(_&&confirm(`Are you sure you want to remove "${_.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Je(`/tasks/${c}`),n.tasks=n.tasks.filter(I=>I._id!==c),S("Task removed from planner (safely stored in database archive)"),Q()}catch(I){S(I.message,!0)}}function Ee(c=null,_=null){const I=!!c,a=c?c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):n.selectedDate):_||n.selectedDate,r=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${I?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${w((c==null?void 0:c.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${w((c==null?void 0:c.description)||"")}</textarea>
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
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${w((c==null?void 0:c.category)||"General")}">
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
                <option value="all" ${!c||c!=null&&c.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${n.personnelList.map(G=>{var v;const N=((v=c==null?void 0:c.personnelId)==null?void 0:v._id)===G._id||(c==null?void 0:c.personnelId)===G._id;return`<option value="${G._id}" ${N?"selected":""}>${w(G.name)} (${w(G.department||G.role||"Member")})</option>`}).join("")}
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
    `,y=Ft(r),z=y.querySelector("#taskForm"),Y=y.querySelector("#btnModalClose"),W=y.querySelector("#btnCancelModal"),L=()=>y.remove();Y&&(Y.onclick=L),W&&(W.onclick=L),z.onsubmit=async G=>{var A;G.preventDefault();const N=y.querySelector("#taskTitle").value.trim(),v=y.querySelector("#taskDesc").value.trim(),V=y.querySelector("#taskDate").value,F=y.querySelector("#taskStartTime").value.trim(),Z=y.querySelector("#taskDueTime").value.trim(),re=y.querySelector("#taskPriority").value,ee=y.querySelector("#taskStatus").value,u=y.querySelector("#taskCategory").value.trim()||"General";if(!N){S("Task title is required",!0);return}const b={title:N,description:v,dateStr:V,startTime:F,dueTime:Z,priority:re,status:ee,category:u};if(s){const $=(A=y.querySelector("#taskAssignee"))==null?void 0:A.value;$==="all"?(b.assignAll=!0,b.personnelId="all"):$&&(b.personnelId=$)}const l=y.querySelector("#btnSaveTask");l.disabled=!0,l.textContent="Saving...";try{if(I){const $=await Wt(`/tasks/${c._id}`,b),R=n.tasks.findIndex(T=>T._id===c._id);R!==-1&&(n.tasks[R]=$),S("Task updated successfully! ✍️")}else{const $=await _e("/tasks",b);Array.isArray($.tasks)?$.tasks.forEach(R=>n.tasks.unshift(R)):n.tasks.unshift($),S("Task created successfully! ✨")}L(),Q()}catch($){S($.message,!0),l.disabled=!1,l.textContent=I?"Save Changes":"Create Task"}}}function tt(){let c=[];const _=`
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
    `,I=Ft(_),a=()=>I.remove();I.querySelector("#btnImportClose").onclick=a,I.querySelector("#btnCancelImport").onclick=a;const r=I.querySelector("#importTextarea"),y=I.querySelector("#importFileInput"),z=I.querySelector("#importDropzone"),Y=I.querySelector("#previewListArea"),W=I.querySelector("#previewCountLabel"),L=I.querySelector("#btnConfirmImport"),G=I.querySelector("#importFileInfo");function N(V){if(!V)return[];const F=V.split(/\r?\n/),Z=[];for(let re of F)re=re.trim(),re&&(re=re.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),re=re.replace(/^[-*•]\s+/,""),re=re.replace(/^\d+[\.\)]\s+/,""),re=re.trim(),re&&Z.push(re));return Z}function v(){const V=r.value,F=N(V),Z=I.querySelector("#importTargetDate").value,re=x(Z),ee=new Set(re.map(u=>(u.title||"").trim().toLowerCase()));c=[];for(const u of F){const b=ee.has(u.toLowerCase());c.push({title:u,isDuplicate:b})}if(W.textContent=`Preview (${c.length} ${c.length===1?"task":"tasks"} found)`,L.disabled=c.length===0,L.textContent=`Import ${c.length} ${c.length===1?"Task":"Tasks"}`,c.length===0){Y.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}Y.innerHTML=c.map((u,b)=>`
        <div class="preview-item ${u.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${b+1}.</span>
          <span class="preview-title">${w(u.title)}</span>
          ${u.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}r.oninput=v,z.onclick=()=>y.click(),y.onchange=V=>{const F=V.target.files[0];if(!F)return;G.textContent=`File selected: ${F.name} (${Math.round(F.size/1024)} KB)`;const Z=new FileReader;Z.onload=re=>{r.value=re.target.result,v()},Z.readAsText(F)},z.ondragover=V=>{V.preventDefault(),z.classList.add("dragover")},z.ondragleave=()=>z.classList.remove("dragover"),z.ondrop=V=>{V.preventDefault(),z.classList.remove("dragover");const F=V.dataTransfer.files[0];if(F&&(F.type==="text/plain"||F.name.endsWith(".txt"))){G.textContent=`File dropped: ${F.name}`;const Z=new FileReader;Z.onload=re=>{r.value=re.target.result,v()},Z.readAsText(F)}else S("Please drop a valid .txt plain-text file",!0)},L.onclick=async()=>{if(c.length===0)return;L.disabled=!0,L.textContent="Importing...";const V=I.querySelector("#importTargetDate").value,F=I.querySelector("#importPriority").value,Z=I.querySelector("#importCategory").value.trim()||"General",re={date:V,tasks:c.map(ee=>({title:ee.title,priority:F,category:Z,status:"Pending"}))};s&&n.selectedPersonnelId!=="all"&&(re.personnelId=n.selectedPersonnelId);try{const ee=await _e("/tasks/bulk-import",re);Array.isArray(ee.tasks)&&ee.tasks.forEach(u=>n.tasks.unshift(u)),S(`Imported ${ee.importedCount} tasks successfully! (${ee.skippedCount} skipped duplicates)`),a(),n.selectedDate=V,Q()}catch(ee){S(ee.message,!0),L.disabled=!1,L.textContent="Retry Import"}}}async function at(){const c=x(n.selectedDate),_=P(c,nt()),I=Ct(n.selectedDate),a=2,r=800,y=160,z=90,Y=65,W=70,L=Math.max(120,c.length*Y),G=y+z+L+W,N=document.createElement("canvas");N.width=r*a,N.height=G*a;const v=N.getContext("2d");v.scale(a,a);const V=document.documentElement.getAttribute("data-theme")==="dark",F=V?"#0F172A":"#F8FAFC",Z=V?"#1E293B":"#FFFFFF",re=V?"#334155":"#E2E8F0",ee=V?"#F8FAFC":"#0F172A",u=V?"#94A3B8":"#475569",b="#4F46E5",l="#10B981",A="#F59E0B";v.fillStyle=F,v.fillRect(0,0,r,G),v.fillStyle=Z,qe(v,24,20,r-48,y-30,16),v.fill(),v.strokeStyle=re,v.lineWidth=1,v.stroke(),v.fillStyle=b,v.font="bold 12px Inter, sans-serif",v.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),v.fillStyle=ee,v.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',v.fillText(I,44,86),v.fillStyle=u,v.font="13px Inter, sans-serif",v.fillText(`Planned focus list · ${_.completed} of ${_.total} tasks completed (${_.percent}%)`,44,114);const $=y+6;v.fillStyle=Z,qe(v,24,$,r-48,z-16,12),v.fill(),v.stroke();const R=[{label:"TOTAL TASKS",val:String(_.total),color:ee},{label:"COMPLETED",val:String(_.completed),color:l},{label:"IN PROGRESS",val:String(_.inProgress),color:A},{label:"PENDING",val:String(_.pending),color:u},{label:"PROGRESS",val:`${_.percent}%`,color:b}],T=(r-48)/R.length;R.forEach((B,D)=>{const ue=24+D*T+20;v.fillStyle=B.color,v.font="bold 20px Inter, sans-serif",v.fillText(B.val,ue,$+36),v.fillStyle=u,v.font="10px Inter, sans-serif",v.fillText(B.label,ue,$+54)});const H=$+z;v.fillStyle=Z,qe(v,24,H,r-48,L+10,16),v.fill(),v.stroke(),c.length===0?(v.fillStyle=u,v.font="14px Inter, sans-serif",v.textAlign="center",v.fillText("No scheduled tasks recorded for this date.",r/2,H+60),v.textAlign="left"):c.forEach((B,D)=>{const ue=H+16+D*Y,ae=B.status==="Completed";v.beginPath(),v.arc(48,ue+14,10,0,Math.PI*2),ae?(v.fillStyle=l,v.fill(),v.strokeStyle="#FFFFFF",v.lineWidth=2,v.beginPath(),v.moveTo(44,ue+14),v.lineTo(47,ue+17),v.lineTo(52,ue+11),v.stroke()):(v.strokeStyle=re,v.lineWidth=2,v.stroke()),v.fillStyle=ae?u:ee,v.font=`${ae?"normal":"500"} 14px Inter, sans-serif`;const ge=B.title.length>55?B.title.slice(0,52)+"...":B.title;if(v.fillText(ge,70,ue+18),ae){const he=v.measureText(ge);v.strokeStyle=u,v.lineWidth=1.2,v.beginPath(),v.moveTo(70,ue+14),v.lineTo(70+he.width,ue+14),v.stroke()}const te=B.priority||"Medium";let U="#E2E8F0",J="#334155";te==="Urgent"?(U="#FEE2E2",J="#DC2626"):te==="High"?(U="#FEF3C7",J="#D97706"):te==="Low"&&(U="#ECFDF5",J="#059669"),v.fillStyle=U,qe(v,r-150,ue+4,60,20,10),v.fill(),v.fillStyle=J,v.font="bold 10px Inter, sans-serif",v.fillText(te,r-138,ue+18);const oe=B.dueTime?`🕒 ${B.dueTime}`:B.category||"General";v.fillStyle=u,v.font="11px Inter, sans-serif",v.fillText(oe,70,ue+34),D<c.length-1&&(v.strokeStyle=re,v.lineWidth=.6,v.beginPath(),v.moveTo(40,ue+48),v.lineTo(r-40,ue+48),v.stroke())});const g=G-35;v.fillStyle=u,v.font="11px Inter, sans-serif",v.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,g);try{const B=N.toDataURL("image/png"),D=document.createElement("a");D.href=B,D.download=`ci360-daily-planner-${n.selectedDate}.png`,document.body.appendChild(D),D.click(),D.remove(),S("Daily Planner image exported! 🖼️")}catch(B){S("Failed to export image: "+B.message,!0)}}function qe(c,_,I,a,r,y){c.beginPath(),c.moveTo(_+y,I),c.lineTo(_+a-y,I),c.quadraticCurveTo(_+a,I,_+a,I+y),c.lineTo(_+a,I+r-y),c.quadraticCurveTo(_+a,I+r,_+a-y,I+r),c.lineTo(_+y,I+r),c.quadraticCurveTo(_,I+r,_,I+r-y),c.lineTo(_,I+y),c.quadraticCurveTo(_,I,_+y,I),c.closePath()}function be(){const c=ta(n.selectedDate,f.weekStartsOn),_=Ct(c[0]),I=Ct(c[6]);nt();const a=n.tasks.filter(L=>{if(L.isDeleted===!0)return!1;const G=L.dateStr||(L.dueDate?new Date(L.dueDate).toISOString().slice(0,10):"");return c.includes(G)}),r=a.length,y=a.filter(L=>L.status==="Completed").length,z=r>0?Math.round(y/r*100):0,Y=window.open("","_blank");if(!Y){S("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const W=`
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
            <div class="kpi-num" style="color:#10b981">${y}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${r-y}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${z}%</div>
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
            ${c.map(L=>{const G=x(L);return G.length===0?`<tr><td><strong>${ft(L)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:G.map(N=>`
                <tr>
                  <td><strong>${ft(L)}</strong></td>
                  <td>${w(N.title)}</td>
                  <td><span class="badge badge-${(N.priority||"medium").toLowerCase().slice(0,3)}">${N.priority||"Medium"}</span></td>
                  <td>${w(N.category||"General")}</td>
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
    `;Y.document.write(W),Y.document.close(),S("Weekly PDF report generated for printing! 📄")}function et(){const _=Ft(`
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
    `),I=()=>_.remove();_.querySelector("#btnBackupClose").onclick=I;const a=_.querySelector("#btnDownloadBackupJson");a.onclick=async()=>{a.disabled=!0,a.textContent="Generating backup...";try{const L=await Ge("/tasks/backup"),G=new Blob([JSON.stringify(L,null,2)],{type:"application/json"}),N=URL.createObjectURL(G),v=document.createElement("a");v.href=N,v.download=`ci360-planner-backup-${nt()}.json`,document.body.appendChild(v),v.click(),v.remove(),S("Planner backup downloaded successfully! 💾")}catch(L){S("Backup export failed: "+L.message,!0)}finally{a.disabled=!1,a.textContent="Download JSON Backup"}};const r=_.querySelector("#restoreFileInput"),y=_.querySelector("#restorePreviewArea"),z=_.querySelector("#restoreCountText"),Y=_.querySelector("#btnExecuteRestore");let W=null;r.onchange=L=>{const G=L.target.files[0];if(!G)return;const N=new FileReader;N.onload=v=>{try{const V=JSON.parse(v.target.result),F=Array.isArray(V.tasks)?V.tasks:Array.isArray(V)?V:null;if(!F||F.length===0){S("Invalid backup file: No tasks found",!0);return}W=F,y.style.display="block",z.textContent=`Valid backup: ${F.length} tasks ready to restore.`,Y.disabled=!1}catch(V){S("Error parsing JSON backup file: "+V.message,!0),y.style.display="none",Y.disabled=!0}},N.readAsText(G)},Y.onclick=async()=>{var G;if(!W||W.length===0)return;Y.disabled=!0,Y.textContent="Restoring...";const L=((G=_.querySelector('input[name="restoreMode"]:checked'))==null?void 0:G.value)||"merge";try{const N=await _e("/tasks/restore",{tasks:W,mode:L});S(`Restored ${N.restoredCount} tasks! (${N.skippedCount} skipped) ✨`),I(),await C()}catch(N){S("Restore failed: "+N.message,!0),Y.disabled=!1,Y.textContent="Retry Restore"}}}function ye(){const c=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${w(f.displayName||"Daily Planner")}">
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
              <input type="text" id="setTimezone" class="input" value="${w(f.timezone||"Asia/Kolkata")}" readonly>
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
    `,_=Ft(c),I=()=>_.remove();_.querySelector("#btnSettingsClose").onclick=I,_.querySelector("#btnCancelSettings").onclick=I,_.querySelector("#settingsForm").onsubmit=a=>{a.preventDefault(),f.displayName=_.querySelector("#setDisplayName").value.trim()||"Daily Planner",f.weekStartsOn=Number(_.querySelector("#setWeekStart").value),f.defaultPriority=_.querySelector("#setDefaultPriority").value,f.density=_.querySelector("#setDensity").value,f.soundEnabled=_.querySelector("#setSound").checked,$a(f),S("Planner preferences saved! ⚙️"),I(),Q()}}}function Ca(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
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
  `,document.head.appendChild(i)}function _a(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function ja(i,t,e,o,d){const s={move:i,variations:d};return t&&(s.suffix=t),e&&(s.nag=e),o!==null&&(s.comment=o),s}function Aa(...i){const[t,...e]=i;let o=t;for(const d of e)d!==null&&(o.variations=[d,...d.variations],d.variations=[],o=d);return t}function Ta(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const o=e.variations[0];if(!o){e.comment=t.marker.comment;break}e=o}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ia(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function _t(i,t,e,o){var d=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(d,_t.prototype),d.expected=t,d.found=e,d.location=o,d.name="SyntaxError",d}Ia(_t,Error);function aa(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}_t.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,o;for(o=0;o<i.length;o++)if(i[o].source===this.location.source){e=i[o].text.split(/\r\n|\n|\r/g);break}var d=this.location.start,s=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(d):d,f=this.location.source+":"+s.line+":"+s.column;if(e){var n=this.location.end,C=aa("",s.line.toString().length," "),E=e[d.line-1],x=d.line===n.line?n.column:E.length+1,j=x-d.column||1;t+=`
 --> `+f+`
`+C+` |
`+s.line+" | "+E+`
`+C+" | "+aa("",d.column-1," ")+aa("",j,"^")}else t+=`
 at `+f}return t};_t.buildMessage=function(i,t){var e={literal:function(E){return'"'+d(E.text)+'"'},class:function(E){var x=E.parts.map(function(j){return Array.isArray(j)?s(j[0])+"-"+s(j[1]):s(j)});return"["+(E.inverted?"^":"")+x.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(E){return E.description}};function o(E){return E.charCodeAt(0).toString(16).toUpperCase()}function d(E){return E.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(x){return"\\x0"+o(x)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(x){return"\\x"+o(x)})}function s(E){return E.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(x){return"\\x0"+o(x)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(x){return"\\x"+o(x)})}function f(E){return e[E.type](E)}function n(E){var x=E.map(f),j,P;if(x.sort(),x.length>0){for(j=1,P=1;j<x.length;j++)x[j-1]!==x[j]&&(x[P]=x[j],P++);x.length=P}switch(x.length){case 1:return x[0];case 2:return x[0]+" or "+x[1];default:return x.slice(0,-1).join(", ")+", or "+x[x.length-1]}}function C(E){return E?'"'+d(E)+'"':"end of input"}return"Expected "+n(i)+" but "+C(t)+" found."};function Da(i,t){t=t!==void 0?t:{};var e={},o=t.grammarSource,d={pgn:qt},s=qt,f="[",n='"',C="]",E=".",x="O-O-O",j="O-O",P="0-0-0",Q="0-0",X="$",$e="{",xe="}",Le=";",lt="(",rt=")",Te="1-0",dt="0-1",We="1/2-1/2",xt="*",Ee=/^[a-zA-Z]/,tt=/^[^"]/,at=/^[0-9]/,qe=/^[.]/,be=/^[a-zA-Z1-8\-=]/,et=/^[+#]/,ye=/^[!?]/,c=/^[^}]/,_=/^[^\r\n]/,I=/^[ \t\r\n]/,a=Ve("tag pair"),r=De("[",!1),y=De('"',!1),z=De("]",!1),Y=Ve("tag name"),W=Qe([["a","z"],["A","Z"]],!1,!1),L=Ve("tag value"),G=Qe(['"'],!0,!1),N=Ve("move number"),v=Qe([["0","9"]],!1,!1),V=De(".",!1),F=Qe(["."],!1,!1),Z=Ve("standard algebraic notation"),re=De("O-O-O",!1),ee=De("O-O",!1),u=De("0-0-0",!1),b=De("0-0",!1),l=Qe([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),A=Qe(["+","#"],!1,!1),$=Ve("suffix annotation"),R=Qe(["!","?"],!1,!1),T=Ve("NAG"),H=De("$",!1),g=Ve("brace comment"),B=De("{",!1),D=Qe(["}"],!0,!1),ue=De("}",!1),ae=Ve("rest of line comment"),ge=De(";",!1),te=Qe(["\r",`
`],!0,!1),U=Ve("variation"),J=De("(",!1),oe=De(")",!1),he=Ve("game termination marker"),Se=De("1-0",!1),Ce=De("0-1",!1),Ne=De("1/2-1/2",!1),ce=De("*",!1),me=Ve("whitespace"),je=Qe([" ","	","\r",`
`],!1,!1),Pe=function(p,k){return Ta(p,k)},q=function(p){return Object.fromEntries(p)},K=function(p,k){return[p,k]},fe=function(p,k){return{root:p,marker:k}},we=function(p,k){return Aa(_a(p),...k.flat())},Ie=function(p,k,m,se,le){return ja(p,k,m,se,le)},ze=function(p){return p},ct=function(p){return p.replace(/[\r\n]+/g," ")},ot=function(p){return p.trim()},Et=function(p){return p},Pt=function(p,k){return{result:p,comment:k}},h=t.peg$currPos|0,pt=[{line:1,column:1}],Ke=h,ut=t.peg$maxFailExpected||[],O=t.peg$silentFails|0,gt;if(t.startRule){if(!(t.startRule in d))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');s=d[t.startRule]}function De(p,k){return{type:"literal",text:p,ignoreCase:k}}function Qe(p,k,m){return{type:"class",parts:p,inverted:k,ignoreCase:m}}function Mt(){return{type:"end"}}function Ve(p){return{type:"other",description:p}}function jt(p){var k=pt[p],m;if(k)return k;if(p>=pt.length)m=pt.length-1;else for(m=p;!pt[--m];);for(k=pt[m],k={line:k.line,column:k.column};m<p;)i.charCodeAt(m)===10?(k.line++,k.column=1):k.column++,m++;return pt[p]=k,k}function Lt(p,k,m){var se=jt(p),le=jt(k),ke={source:o,start:{offset:p,line:se.line,column:se.column},end:{offset:k,line:le.line,column:le.column}};return ke}function ie(p){h<Ke||(h>Ke&&(Ke=h,ut=[]),ut.push(p))}function St(p,k,m){return new _t(_t.buildMessage(p,k),p,k,m)}function qt(){var p,k,m;return p=h,k=Jt(),m=M(),p=Pe(k,m),p}function Jt(){var p,k,m;for(p=h,k=[],m=zt();m!==e;)k.push(m),m=zt();return m=Fe(),p=q(k),p}function zt(){var p,k,m,se,le,ke,yt;return O++,p=h,Fe(),i.charCodeAt(h)===91?(k=f,h++):(k=e,O===0&&ie(r)),k!==e?(Fe(),m=Qt(),m!==e?(Fe(),i.charCodeAt(h)===34?(se=n,h++):(se=e,O===0&&ie(y)),se!==e?(le=Rt(),i.charCodeAt(h)===34?(ke=n,h++):(ke=e,O===0&&ie(y)),ke!==e?(Fe(),i.charCodeAt(h)===93?(yt=C,h++):(yt=e,O===0&&ie(z)),yt!==e?p=K(m,le):(h=p,p=e)):(h=p,p=e)):(h=p,p=e)):(h=p,p=e)):(h=p,p=e),O--,p===e&&O===0&&ie(a),p}function Qt(){var p,k,m;if(O++,p=h,k=[],m=i.charAt(h),Ee.test(m)?h++:(m=e,O===0&&ie(W)),m!==e)for(;m!==e;)k.push(m),m=i.charAt(h),Ee.test(m)?h++:(m=e,O===0&&ie(W));else k=e;return k!==e?p=i.substring(p,h):p=k,O--,p===e&&(k=e,O===0&&ie(Y)),p}function Rt(){var p,k,m;for(O++,p=h,k=[],m=i.charAt(h),tt.test(m)?h++:(m=e,O===0&&ie(G));m!==e;)k.push(m),m=i.charAt(h),tt.test(m)?h++:(m=e,O===0&&ie(G));return p=i.substring(p,h),O--,k=e,O===0&&ie(L),p}function M(){var p,k,m;return p=h,k=ne(),Fe(),m=Zt(),m===e&&(m=null),Fe(),p=fe(k,m),p}function ne(){var p,k,m,se;for(p=h,k=bt(),k===e&&(k=null),m=[],se=ve();se!==e;)m.push(se),se=ve();return p=we(k,m),p}function ve(){var p,k,m,se,le,ke,yt,Ot;if(p=h,Fe(),Oe(),Fe(),k=Xe(),k!==e){for(m=st(),m===e&&(m=null),se=[],le=it();le!==e;)se.push(le),le=it();for(le=Fe(),ke=bt(),ke===e&&(ke=null),yt=[],Ot=Bt();Ot!==e;)yt.push(Ot),Ot=Bt();p=Ie(k,m,se,ke,yt)}else h=p,p=e;return p}function Oe(){var p,k,m,se,le,ke;for(O++,p=h,k=[],m=i.charAt(h),at.test(m)?h++:(m=e,O===0&&ie(v));m!==e;)k.push(m),m=i.charAt(h),at.test(m)?h++:(m=e,O===0&&ie(v));if(i.charCodeAt(h)===46?(m=E,h++):(m=e,O===0&&ie(V)),m!==e){for(se=Fe(),le=[],ke=i.charAt(h),qe.test(ke)?h++:(ke=e,O===0&&ie(F));ke!==e;)le.push(ke),ke=i.charAt(h),qe.test(ke)?h++:(ke=e,O===0&&ie(F));k=[k,m,se,le],p=k}else h=p,p=e;return O--,p===e&&(k=e,O===0&&ie(N)),p}function Xe(){var p,k,m,se,le,ke;if(O++,p=h,k=h,i.substr(h,5)===x?(m=x,h+=5):(m=e,O===0&&ie(re)),m===e&&(i.substr(h,3)===j?(m=j,h+=3):(m=e,O===0&&ie(ee)),m===e&&(i.substr(h,5)===P?(m=P,h+=5):(m=e,O===0&&ie(u)),m===e&&(i.substr(h,3)===Q?(m=Q,h+=3):(m=e,O===0&&ie(b)),m===e))))if(m=h,se=i.charAt(h),Ee.test(se)?h++:(se=e,O===0&&ie(W)),se!==e){if(le=[],ke=i.charAt(h),be.test(ke)?h++:(ke=e,O===0&&ie(l)),ke!==e)for(;ke!==e;)le.push(ke),ke=i.charAt(h),be.test(ke)?h++:(ke=e,O===0&&ie(l));else le=e;le!==e?(se=[se,le],m=se):(h=m,m=e)}else h=m,m=e;return m!==e?(se=i.charAt(h),et.test(se)?h++:(se=e,O===0&&ie(A)),se===e&&(se=null),m=[m,se],k=m):(h=k,k=e),k!==e?p=i.substring(p,h):p=k,O--,p===e&&(k=e,O===0&&ie(Z)),p}function st(){var p,k,m;for(O++,p=h,k=[],m=i.charAt(h),ye.test(m)?h++:(m=e,O===0&&ie(R));m!==e;)k.push(m),k.length>=2?m=e:(m=i.charAt(h),ye.test(m)?h++:(m=e,O===0&&ie(R)));return k.length<1?(h=p,p=e):p=k,O--,p===e&&(k=e,O===0&&ie($)),p}function it(){var p,k,m,se,le;if(O++,p=h,Fe(),i.charCodeAt(h)===36?(k=X,h++):(k=e,O===0&&ie(H)),k!==e){if(m=h,se=[],le=i.charAt(h),at.test(le)?h++:(le=e,O===0&&ie(v)),le!==e)for(;le!==e;)se.push(le),le=i.charAt(h),at.test(le)?h++:(le=e,O===0&&ie(v));else se=e;se!==e?m=i.substring(m,h):m=se,m!==e?p=ze(m):(h=p,p=e)}else h=p,p=e;return O--,p===e&&O===0&&ie(T),p}function bt(){var p;return p=Nt(),p===e&&(p=Xt()),p}function Nt(){var p,k,m,se,le;if(O++,p=h,i.charCodeAt(h)===123?(k=$e,h++):(k=e,O===0&&ie(B)),k!==e){for(m=h,se=[],le=i.charAt(h),c.test(le)?h++:(le=e,O===0&&ie(D));le!==e;)se.push(le),le=i.charAt(h),c.test(le)?h++:(le=e,O===0&&ie(D));m=i.substring(m,h),i.charCodeAt(h)===125?(se=xe,h++):(se=e,O===0&&ie(ue)),se!==e?p=ct(m):(h=p,p=e)}else h=p,p=e;return O--,p===e&&(k=e,O===0&&ie(g)),p}function Xt(){var p,k,m,se,le;if(O++,p=h,i.charCodeAt(h)===59?(k=Le,h++):(k=e,O===0&&ie(ge)),k!==e){for(m=h,se=[],le=i.charAt(h),_.test(le)?h++:(le=e,O===0&&ie(te));le!==e;)se.push(le),le=i.charAt(h),_.test(le)?h++:(le=e,O===0&&ie(te));m=i.substring(m,h),p=ot(m)}else h=p,p=e;return O--,p===e&&(k=e,O===0&&ie(ae)),p}function Bt(){var p,k,m,se;return O++,p=h,Fe(),i.charCodeAt(h)===40?(k=lt,h++):(k=e,O===0&&ie(J)),k!==e?(m=ne(),m!==e?(Fe(),i.charCodeAt(h)===41?(se=rt,h++):(se=e,O===0&&ie(oe)),se!==e?p=Et(m):(h=p,p=e)):(h=p,p=e)):(h=p,p=e),O--,p===e&&O===0&&ie(U),p}function Zt(){var p,k,m;return O++,p=h,i.substr(h,3)===Te?(k=Te,h+=3):(k=e,O===0&&ie(Se)),k===e&&(i.substr(h,3)===dt?(k=dt,h+=3):(k=e,O===0&&ie(Ce)),k===e&&(i.substr(h,7)===We?(k=We,h+=7):(k=e,O===0&&ie(Ne)),k===e&&(i.charCodeAt(h)===42?(k=xt,h++):(k=e,O===0&&ie(ce))))),k!==e?(Fe(),m=bt(),m===e&&(m=null),p=Pt(k,m)):(h=p,p=e),O--,p===e&&(k=e,O===0&&ie(he)),p}function Fe(){var p,k;for(O++,p=[],k=i.charAt(h),I.test(k)?h++:(k=e,O===0&&ie(je));k!==e;)p.push(k),k=i.charAt(h),I.test(k)?h++:(k=e,O===0&&ie(je));return O--,k=e,O===0&&ie(me),p}if(gt=s(),t.peg$library)return{peg$result:gt,peg$currPos:h,peg$FAILED:e,peg$maxFailExpected:ut,peg$maxFailPos:Ke};if(gt!==e&&h===i.length)return gt;throw gt!==e&&h<i.length&&ie(Mt()),St(ut,Ke<i.length?i.charAt(Ke):null,Ke<i.length?Lt(Ke,Ke+1):Lt(Ke,Ke))}/**
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
 */const Kt=0xffffffffffffffffn;function ia(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function ba(i,t){return i*t&Kt}function Ea(i){return function(){let t=BigInt(i&Kt),e=BigInt(i>>64n&Kt);const o=ba(ia(ba(t,5n),7n),9n);return e^=t,t=(ia(t,24n)^e^e<<16n)&Kt,e=ia(e,37n),i=e<<64n|t,o}}const Yt=Ea(0xa187eb39cdcaed8f31c4b365b102e01en),Pa=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Yt()))),Ma=Array.from({length:8},()=>Yt()),La=Array.from({length:16},()=>Yt()),na=Yt(),Ue="w",Ze="b",Me="p",ca="n",Vt="b",It="r",vt="q",Re="k",oa="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Gt{constructor(t,e){Ae(this,"color");Ae(this,"from");Ae(this,"to");Ae(this,"piece");Ae(this,"captured");Ae(this,"promotion");Ae(this,"flags");Ae(this,"san");Ae(this,"lan");Ae(this,"before");Ae(this,"after");const{color:o,piece:d,from:s,to:f,flags:n,captured:C,promotion:E}=e,x=Be(s),j=Be(f);this.color=o,this.piece=d,this.from=x,this.to=j,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=x+j,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const P in pe)pe[P]&n&&(this.flags+=kt[P]);C&&(this.captured=C),E&&(this.promotion=E,this.lan+=E)}isCapture(){return this.flags.indexOf(kt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(kt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(kt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(kt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(kt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(kt.BIG_PAWN)>-1}}const He=-1,kt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},pe={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},pa={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},qa={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},za={...pa,...qa},de={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},ra={b:[16,32,17,15],w:[-16,-32,-17,-15]},fa={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ra=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Na=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ba={p:1,n:2,b:4,r:8,q:16,k:32},Oa="pnbrqkPNBRQK",ma=[ca,Vt,It,vt],Fa=7,Ha=6,Ga=1,Ua=0,Ut={[Re]:pe.KSIDE_CASTLE,[vt]:pe.QSIDE_CASTLE},mt={w:[{square:de.a1,flag:pe.QSIDE_CASTLE},{square:de.h1,flag:pe.KSIDE_CASTLE}],b:[{square:de.a8,flag:pe.QSIDE_CASTLE},{square:de.h8,flag:pe.KSIDE_CASTLE}]},Wa={b:Ga,w:Ha},sa="--";function $t(i){return i>>4}function Dt(i){return i&15}function xa(i){return"0123456789".indexOf(i)!==-1}function Be(i){const t=Dt(i),e=$t(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function At(i){return i===Ue?Ze:Ue}function Ka(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const o=parseInt(t[4],10);if(isNaN(o)||o<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const d=t[0].split("/");if(d.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let f=0;f<d.length;f++){let n=0,C=!1;for(let E=0;E<d[f].length;E++)if(xa(d[f][E])){if(C)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};n+=parseInt(d[f][E],10),C=!0}else{if(!/^[prnbqkPRNBQK]$/.test(d[f][E]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};n+=1,C=!1}if(n!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const s=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:f,regex:n}of s){if(!n.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${f} king`};if((t[0].match(n)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${f} kings`}}return Array.from(d[0]+d[7]).some(f=>f.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Va(i,t){const e=i.from,o=i.to,d=i.piece;let s=0,f=0,n=0;for(let C=0,E=t.length;C<E;C++){const x=t[C].from,j=t[C].to,P=t[C].piece;d===P&&e!==x&&o===j&&(s++,$t(e)===$t(x)&&f++,Dt(e)===Dt(x)&&n++)}return s>0?f>0&&n>0?Be(e):n>0?Be(e).charAt(1):Be(e).charAt(0):""}function ht(i,t,e,o,d,s=void 0,f=pe.NORMAL){const n=$t(o);if(d===Me&&(n===Fa||n===Ua))for(let C=0;C<ma.length;C++){const E=ma[C];i.push({color:t,from:e,to:o,piece:d,captured:s,promotion:E,flags:f|pe.PROMOTION})}else i.push({color:t,from:e,to:o,piece:d,captured:s,flags:f})}function ha(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:Me:(t=t.toLowerCase(),t==="o"?Re:t)}function la(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class va{constructor(t=oa,{skipValidation:e=!1}={}){Ae(this,"_board",new Array(128));Ae(this,"_turn",Ue);Ae(this,"_header",{});Ae(this,"_kings",{w:He,b:He});Ae(this,"_epSquare",-1);Ae(this,"_halfMoves",0);Ae(this,"_moveNumber",0);Ae(this,"_history",[]);Ae(this,"_comments",{});Ae(this,"_castling",{w:0,b:0});Ae(this,"_hash",0n);Ae(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:He,b:He},this._turn=Ue,this._castling={w:0,b:0},this._epSquare=He,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...za},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:o=!1}={}){let d=t.split(/\s+/);if(d.length>=2&&d.length<6){const n=["-","-","0","1"];t=d.concat(n.slice(-(6-d.length))).join(" ")}if(d=t.split(/\s+/),!e){const{ok:n,error:C}=Ka(t);if(!n)throw new Error(C)}const s=d[0];let f=0;this.clear({preserveHeaders:o});for(let n=0;n<s.length;n++){const C=s.charAt(n);if(C==="/")f+=8;else if(xa(C))f+=parseInt(C,10);else{const E=C<"a"?Ue:Ze;this._put({type:C.toLowerCase(),color:E},Be(f)),f++}}this._turn=d[1],d[2].indexOf("K")>-1&&(this._castling.w|=pe.KSIDE_CASTLE),d[2].indexOf("Q")>-1&&(this._castling.w|=pe.QSIDE_CASTLE),d[2].indexOf("k")>-1&&(this._castling.b|=pe.KSIDE_CASTLE),d[2].indexOf("q")>-1&&(this._castling.b|=pe.QSIDE_CASTLE),this._epSquare=d[3]==="-"?He:de[d[3]],this._halfMoves=parseInt(d[4],10),this._moveNumber=parseInt(d[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var f,n;let e=0,o="";for(let C=de.a8;C<=de.h1;C++){if(this._board[C]){e>0&&(o+=e,e=0);const{color:E,type:x}=this._board[C];o+=E===Ue?x.toUpperCase():x.toLowerCase()}else e++;C+1&136&&(e>0&&(o+=e),C!==de.h1&&(o+="/"),e=0,C+=8)}let d="";this._castling[Ue]&pe.KSIDE_CASTLE&&(d+="K"),this._castling[Ue]&pe.QSIDE_CASTLE&&(d+="Q"),this._castling[Ze]&pe.KSIDE_CASTLE&&(d+="k"),this._castling[Ze]&pe.QSIDE_CASTLE&&(d+="q"),d=d||"-";let s="-";if(this._epSquare!==He)if(t)s=Be(this._epSquare);else{const C=this._epSquare+(this._turn===Ue?16:-16),E=[C+1,C-1];for(const x of E){if(x&136)continue;const j=this._turn;if(((f=this._board[x])==null?void 0:f.color)===j&&((n=this._board[x])==null?void 0:n.type)===Me){this._makeMove({color:j,from:x,to:this._epSquare,piece:Me,captured:Me,flags:pe.EP_CAPTURE});const P=!this._isKingAttacked(j);if(this._undoMove(),P){s=Be(this._epSquare);break}}}}return[o,this._turn,d,s,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:o}=this._board[t],d={w:0,b:1}[e],s={p:0,n:1,b:2,r:3,q:4,k:5}[o];return Pa[d][s][t]}_epKey(){return this._epSquare===He?0n:Ma[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return La[t]}_computeHash(){let t=0n;for(let e=de.a8;e<=de.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=na),t}_updateSetup(t){this._history.length>0||(t!==oa?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(oa)}get(t){return this._board[de[t]]}findPiece(t){var o;const e=[];for(let d=de.a8;d<=de.h1;d++){if(d&136){d+=7;continue}!this._board[d]||((o=this._board[d])==null?void 0:o.color)!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(Be(d))}return e}put({type:t,color:e},o){return this._put({type:t,color:e},o)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},o){if(Oa.indexOf(t.toLowerCase())===-1||!(o in de))return!1;const d=de[o];if(t==Re&&!(this._kings[e]==He||this._kings[e]==d))return!1;const s=this._board[d];return s&&s.type===Re&&(this._kings[s.color]=He),this._set(d,{type:t,color:e}),t===Re&&(this._kings[e]=d),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(de[t]),e&&e.type===Re&&(this._kings[e.color]=He),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var o,d,s,f,n,C,E,x,j,P,Q,X;this._hash^=this._castlingKey();const t=((o=this._board[de.e1])==null?void 0:o.type)===Re&&((d=this._board[de.e1])==null?void 0:d.color)===Ue,e=((s=this._board[de.e8])==null?void 0:s.type)===Re&&((f=this._board[de.e8])==null?void 0:f.color)===Ze;(!t||((n=this._board[de.a1])==null?void 0:n.type)!==It||((C=this._board[de.a1])==null?void 0:C.color)!==Ue)&&(this._castling.w&=-65),(!t||((E=this._board[de.h1])==null?void 0:E.type)!==It||((x=this._board[de.h1])==null?void 0:x.color)!==Ue)&&(this._castling.w&=-33),(!e||((j=this._board[de.a8])==null?void 0:j.type)!==It||((P=this._board[de.a8])==null?void 0:P.color)!==Ze)&&(this._castling.b&=-65),(!e||((Q=this._board[de.h8])==null?void 0:Q.type)!==It||((X=this._board[de.h8])==null?void 0:X.color)!==Ze)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var s,f;if(this._epSquare===He)return;const t=this._epSquare+(this._turn===Ue?-16:16),e=this._epSquare+(this._turn===Ue?16:-16),o=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((s=this._board[e])==null?void 0:s.color)!==At(this._turn)||((f=this._board[e])==null?void 0:f.type)!==Me){this._hash^=this._epKey(),this._epSquare=He;return}const d=n=>{var C,E;return!(n&136)&&((C=this._board[n])==null?void 0:C.color)===this._turn&&((E=this._board[n])==null?void 0:E.type)===Me};o.some(d)||(this._hash^=this._epKey(),this._epSquare=He)}_attacked(t,e,o){const d=[];for(let s=de.a8;s<=de.h1;s++){if(s&136){s+=7;continue}if(this._board[s]===void 0||this._board[s].color!==t)continue;const f=this._board[s],n=s-e;if(n===0)continue;const C=n+119;if(Ra[C]&Ba[f.type]){if(f.type===Me){if(n>0&&f.color===Ue||n<=0&&f.color===Ze)if(o)d.push(Be(s));else return!0;continue}if(f.type==="n"||f.type==="k")if(o){d.push(Be(s));continue}else return!0;const E=Na[C];let x=s+E,j=!1;for(;x!==e;){if(this._board[x]!=null){j=!0;break}x+=E}if(!j)if(o){d.push(Be(s));continue}else return!0}}return o?d:!1}attackers(t,e){return e?this._attacked(e,de[t],!0):this._attacked(this._turn,de[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(At(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,de[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let o=0,d=0;for(let s=de.a8;s<=de.h1;s++){if(d=(d+1)%2,s&136){s+=7;continue}const f=this._board[s];f&&(t[f.type]=f.type in t?t[f.type]+1:1,f.type===Vt&&e.push(d),o++)}if(o===2)return!0;if(o===3&&(t[Vt]===1||t[ca]===1))return!0;if(o===t[Vt]+2){let s=0;const f=e.length;for(let n=0;n<f;n++)s+=e[n];if(s===0||s===f)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:o=void 0}={}){const d=this._moves({square:e,piece:o});return t?d.map(s=>new Gt(this,s)):d.map(s=>this._moveToSan(s,d))}_moves({legal:t=!0,piece:e=void 0,square:o=void 0}={}){var Q;const d=o?o.toLowerCase():void 0,s=e==null?void 0:e.toLowerCase(),f=[],n=this._turn,C=At(n);let E=de.a8,x=de.h1,j=!1;if(d)if(d in de)E=x=de[d],j=!0;else return[];for(let X=E;X<=x;X++){if(X&136){X+=7;continue}if(!this._board[X]||this._board[X].color===C)continue;const{type:$e}=this._board[X];let xe;if($e===Me){if(s&&s!==$e)continue;xe=X+ra[n][0],this._board[xe]||(ht(f,n,X,xe,Me),xe=X+ra[n][1],Wa[n]===$t(X)&&!this._board[xe]&&ht(f,n,X,xe,Me,void 0,pe.BIG_PAWN));for(let Le=2;Le<4;Le++)xe=X+ra[n][Le],!(xe&136)&&(((Q=this._board[xe])==null?void 0:Q.color)===C?ht(f,n,X,xe,Me,this._board[xe].type,pe.CAPTURE):xe===this._epSquare&&ht(f,n,X,xe,Me,Me,pe.EP_CAPTURE))}else{if(s&&s!==$e)continue;for(let Le=0,lt=fa[$e].length;Le<lt;Le++){const rt=fa[$e][Le];for(xe=X;xe+=rt,!(xe&136);){if(!this._board[xe])ht(f,n,X,xe,$e);else{if(this._board[xe].color===n)break;ht(f,n,X,xe,$e,this._board[xe].type,pe.CAPTURE);break}if($e===ca||$e===Re)break}}}}if((s===void 0||s===Re)&&(!j||x===this._kings[n])){if(this._castling[n]&pe.KSIDE_CASTLE){const X=this._kings[n],$e=X+2;!this._board[X+1]&&!this._board[$e]&&!this._attacked(C,this._kings[n])&&!this._attacked(C,X+1)&&!this._attacked(C,$e)&&ht(f,n,this._kings[n],$e,Re,void 0,pe.KSIDE_CASTLE)}if(this._castling[n]&pe.QSIDE_CASTLE){const X=this._kings[n],$e=X-2;!this._board[X-1]&&!this._board[X-2]&&!this._board[X-3]&&!this._attacked(C,this._kings[n])&&!this._attacked(C,X-1)&&!this._attacked(C,$e)&&ht(f,n,this._kings[n],$e,Re,void 0,pe.QSIDE_CASTLE)}}if(!t||this._kings[n]===-1)return f;const P=[];for(let X=0,$e=f.length;X<$e;X++)this._makeMove(f[X]),this._isKingAttacked(n)||P.push(f[X]),this._undoMove();return P}move(t,{strict:e=!1}={}){let o=null;if(typeof t=="string")o=this._moveFromSan(t,e);else if(t===null)o=this._moveFromSan(sa,e);else if(typeof t=="object"){const s=this._moves();for(let f=0,n=s.length;f<n;f++)if(t.from===Be(s[f].from)&&t.to===Be(s[f].to)&&(!("promotion"in s[f])||t.promotion===s[f].promotion)){o=s[f];break}}if(!o)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&o.flags&pe.NULL_MOVE)throw new Error("Null move not allowed when in check");const d=new Gt(this,o);return this._makeMove(o),this._incPositionCount(),d}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var d,s,f,n;const e=this._turn,o=At(e);if(this._push(t),t.flags&pe.NULL_MOVE){e===Ze&&this._moveNumber++,this._halfMoves++,this._turn=o,this._epSquare=He;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&pe.EP_CAPTURE&&(this._turn===Ze?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Re){if(this._kings[e]=t.to,t.flags&pe.KSIDE_CASTLE){const C=t.to-1,E=t.to+1;this._movePiece(E,C)}else if(t.flags&pe.QSIDE_CASTLE){const C=t.to+1,E=t.to-2;this._movePiece(E,C)}this._castling[e]=0}if(this._castling[e]){for(let C=0,E=mt[e].length;C<E;C++)if(t.from===mt[e][C].square&&this._castling[e]&mt[e][C].flag){this._castling[e]^=mt[e][C].flag;break}}if(this._castling[o]){for(let C=0,E=mt[o].length;C<E;C++)if(t.to===mt[o][C].square&&this._castling[o]&mt[o][C].flag){this._castling[o]^=mt[o][C].flag;break}}if(this._hash^=this._castlingKey(),t.flags&pe.BIG_PAWN){let C;e===Ze?C=t.to-16:C=t.to+16,!(t.to-1&136)&&((d=this._board[t.to-1])==null?void 0:d.type)===Me&&((s=this._board[t.to-1])==null?void 0:s.color)===o||!(t.to+1&136)&&((f=this._board[t.to+1])==null?void 0:f.type)===Me&&((n=this._board[t.to+1])==null?void 0:n.color)===o?(this._epSquare=C,this._hash^=this._epKey()):this._epSquare=He}else this._epSquare=He;t.piece===Me?this._halfMoves=0:t.flags&(pe.CAPTURE|pe.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===Ze&&this._moveNumber++,this._turn=o,this._hash^=na}undo(){const t=this._hash,e=this._undoMove();if(e){const o=new Gt(this,e);return this._decPositionCount(t),o}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=na;const o=this._turn,d=At(o);if(e.flags&pe.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:o})),e.captured)if(e.flags&pe.EP_CAPTURE){let s;o===Ze?s=e.to-16:s=e.to+16,this._set(s,{type:Me,color:d})}else this._set(e.to,{type:e.captured,color:d});if(e.flags&(pe.KSIDE_CASTLE|pe.QSIDE_CASTLE)){let s,f;e.flags&pe.KSIDE_CASTLE?(s=e.to+1,f=e.to-1):(s=e.to-2,f=e.to+1),this._movePiece(f,s)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const o=[];let d=!1;for(const P in this._header)this._header[P]&&o.push(`[${P} "${this._header[P]}"]`+t),d=!0;d&&this._history.length&&o.push(t);const s=P=>{const Q=this._comments[this.fen()];if(typeof Q<"u"){const X=P.length>0?" ":"";P=`${P}${X}{${Q}}`}return P},f=[];for(;this._history.length>0;)f.push(this._undoMove());const n=[];let C="";for(f.length===0&&n.push(s(""));f.length>0;){C=s(C);const P=f.pop();if(!P)break;if(!this._history.length&&P.color==="b"){const Q=`${this._moveNumber}. ...`;C=C?`${C} ${Q}`:Q}else P.color==="w"&&(C.length&&n.push(C),C=this._moveNumber+".");C=C+" "+this._moveToSan(P,this._moves({legal:!0})),this._makeMove(P)}if(C.length&&n.push(s(C)),n.push(this._header.Result||"*"),e===0)return o.join("")+n.join(" ");const E=function(){return o.length>0&&o[o.length-1]===" "?(o.pop(),!0):!1},x=function(P,Q){for(const X of Q.split(" "))if(X){if(P+X.length>e){for(;E();)P--;o.push(t),P=0}o.push(X),P+=X.length,o.push(" "),P++}return E()&&P--,P};let j=0;for(let P=0;P<n.length;P++){if(j+n[P].length>e&&n[P].includes("{")){j=x(j,n[P]);continue}j+n[P].length>e&&P!==0?(o[o.length-1]===" "&&o.pop(),o.push(t),j=0):P!==0&&(o.push(" "),j++),o.push(n[P]),j+=n[P].length}return o.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??pa[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=pa[t]||null,!0):!1}getHeaders(){const t={};for(const[e,o]of Object.entries(this._header))o!==null&&(t[e]=o);return t}loadPgn(t,{strict:e=!1,newlineChar:o=`\r?
`}={}){o!==`\r?
`&&(t=t.replace(new RegExp(o,"g"),`
`));const d=Da(t);this.reset();const s=d.headers;let f="";for(const E in s)E.toLowerCase()==="fen"&&(f=s[E]),this.header(E,s[E]);if(!e)f&&this.load(f,{preserveHeaders:!0});else if(s.SetUp==="1"){if(!("FEN"in s))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(s.FEN,{preserveHeaders:!0})}let n=d.root;for(;n;){if(n.move){const E=this._moveFromSan(n.move,e);if(E==null)throw new Error(`Invalid move in PGN: ${n.move}`);this._makeMove(E),this._incPositionCount()}n.comment!==void 0&&(this._comments[this.fen()]=n.comment),n=n.variations[0]}const C=d.result;C&&Object.keys(this._header).length&&this._header.Result!==C&&this.setHeader("Result",C)}_moveToSan(t,e){let o="";if(t.flags&pe.KSIDE_CASTLE)o="O-O";else if(t.flags&pe.QSIDE_CASTLE)o="O-O-O";else{if(t.flags&pe.NULL_MOVE)return sa;if(t.piece!==Me){const d=Va(t,e);o+=t.piece.toUpperCase()+d}t.flags&(pe.CAPTURE|pe.EP_CAPTURE)&&(t.piece===Me&&(o+=Be(t.from)[0]),o+="x"),o+=Be(t.to),t.promotion&&(o+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?o+="#":o+="+"),this._undoMove(),o}_moveFromSan(t,e=!1){let o=la(t);if(e||(o==="0-0"?o="O-O":o==="0-0-0"&&(o="O-O-O")),o==sa)return{color:this._turn,from:0,to:0,piece:"k",flags:pe.NULL_MOVE};let d=ha(o),s=this._moves({legal:!0,piece:d});for(let P=0,Q=s.length;P<Q;P++)if(o===la(this._moveToSan(s[P],s)))return s[P];if(e)return null;let f,n,C,E,x,j=!1;if(n=o.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),n?(f=n[1],C=n[2],E=n[3],x=n[4],C.length==1&&(j=!0)):(n=o.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),n&&(f=n[1],C=n[2],E=n[3],x=n[4],C.length==1&&(j=!0))),d=ha(o),s=this._moves({legal:!0,piece:f||d}),!E)return null;for(let P=0,Q=s.length;P<Q;P++)if(C){if((!f||f.toLowerCase()==s[P].piece)&&de[C]==s[P].from&&de[E]==s[P].to&&(!x||x.toLowerCase()==s[P].promotion))return s[P];if(j){const X=Be(s[P].from);if((!f||f.toLowerCase()==s[P].piece)&&de[E]==s[P].to&&(C==X[0]||C==X[1])&&(!x||x.toLowerCase()==s[P].promotion))return s[P]}}else if(o===la(this._moveToSan(s[P],s)).replace("x",""))return s[P];return null}ascii(){let t=`   +------------------------+
`;for(let e=de.a8;e<=de.h1;e++){if(Dt(e)===0&&(t+=" "+"87654321"[$t(e)]+" |"),this._board[e]){const o=this._board[e].type,s=this._board[e].color===Ue?o.toUpperCase():o.toLowerCase();t+=" "+s+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let o=0;const d=this._turn;for(let s=0,f=e.length;s<f;s++)this._makeMove(e[s]),this._isKingAttacked(d)||(t-1>0?o+=this.perft(t-1):o++),this._undoMove();return o}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let o=de.a8;o<=de.h1;o++)this._board[o]==null?e.push(null):e.push({square:Be(o),type:this._board[o].type,color:this._board[o].color}),o+1&136&&(t.push(e),e=[],o+=8);return t}squareColor(t){if(t in de){const e=de[t];return($t(e)+Dt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],o=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const d=e.pop();if(!d)break;t?o.push(new Gt(this,d)):o.push(this._moveToSan(d,this._moves())),this._makeMove(d)}return o}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},o=d=>{d in this._comments&&(e[d]=this._comments[d])};for(;this._history.length>0;)t.push(this._undoMove());for(o(this.fen());;){const d=t.pop();if(!d)break;this._makeMove(d),o(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const d of[Re,vt])e[d]!==void 0&&(e[d]?this._castling[t]|=Ut[d]:this._castling[t]&=~Ut[d]);this._updateCastlingRights();const o=this.getCastlingRights(t);return(e[Re]===void 0||e[Re]===o[Re])&&(e[vt]===void 0||e[vt]===o[vt])}getCastlingRights(t){return{[Re]:(this._castling[t]&Ut[Re])!==0,[vt]:(this._castling[t]&Ut[vt])!==0}}moveNumber(){return this._moveNumber}}async function Za(i,t={}){var Z,re,ee;const e=t.currentUser||{};let o="chat",d=[],s=null,f=[],n=[],C=null,E=null,x=!1,j=null,P=null;i.innerHTML=`
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
  `,Ya(),await rt(),Ee();const Q=i.querySelector("#tab-nav-chat"),X=i.querySelector("#tab-nav-lounge"),$e=i.querySelector("#bonding-chat-main-wrap"),xe=i.querySelector("#bonding-lounge-main-wrap");Q==null||Q.addEventListener("click",()=>{o="chat",Q.classList.add("active"),X.classList.remove("active"),$e.style.display="grid",xe.style.display="none",Ee()}),X==null||X.addEventListener("click",async()=>{o="lounge_games",X.classList.add("active"),Q.classList.remove("active"),$e.style.display="none",xe.style.display="block",await r()}),(Z=i.querySelector("#btn-top-new-chat"))==null||Z.addEventListener("click",N),(re=i.querySelector("#btn-top-new-group"))==null||re.addEventListener("click",v),(ee=i.querySelector("#btn-top-challenge"))==null||ee.addEventListener("click",()=>z());const Le=i.querySelector("#bonding-search-input");Le&&Le.addEventListener("input",u=>{const b=u.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(A=>{const $=A.textContent.toLowerCase();A.style.display=$.includes(b)?"flex":"none"})}),dt(),new MutationObserver((u,b)=>{document.body.contains(i)||(E&&clearInterval(E),P&&clearInterval(P),b.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function rt(){try{const[u,b]=await Promise.all([Ge("/bonding/channels").catch(()=>[]),Ge("/bonding/colleagues").catch(()=>[])]);d=u,f=b,!s&&d.length>0&&(s=d.find(l=>l.name.includes("Lounge"))||d[0]),We(),s&&await Te(s._id)}catch(u){console.error("Failed to load bonding data",u)}}async function Te(u,b=!1){if(u)try{n=await Ge(`/bonding/channels/${u}/messages`),b?I():a()}catch(l){console.error("Failed to load messages",l)}}function dt(){E&&clearInterval(E),E=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval(E);return}o==="chat"&&s?await Te(s._id,!0):o==="lounge_games"&&await r(!0)}catch{}},3e3)}function We(){const u=i.querySelector("#bonding-group-list"),b=i.querySelector("#bonding-direct-list");if(!u||!b)return;const l=d.filter($=>$.type==="group"),A=d.filter($=>$.type==="direct");l.length===0?u.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':u.innerHTML=l.map($=>{var T;return`
          <div class="bonding-channel-item ${s&&s._id===$._id?"active":""}" data-channel-id="${$._id}">
            <div class="bonding-channel-icon">${$.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${w($.name)}</div>
              <div class="bonding-channel-preview">${w(((T=$.lastMessage)==null?void 0:T.content)||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${$._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),A.length===0?b.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':b.innerHTML=A.map($=>{var g;const R=s&&s._id===$._id,T=$.displayName||$.name||"Colleague",H=T.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${R?"active":""}" data-channel-id="${$._id}">
            <div class="bonding-channel-avatar">${H}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${w(T)}</div>
              <div class="bonding-channel-preview">${w(((g=$.lastMessage)==null?void 0:g.content)||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${$._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),xt()}function xt(){var b,l;const u=i.querySelectorAll(".bonding-channel-item");u.forEach(A=>{A.onclick=async $=>{if($.target.closest(".bonding-channel-del-btn"))return;const R=A.dataset.channelId,T=d.find(H=>H._id===R);T&&(s=T,u.forEach(H=>H.classList.remove("active")),A.classList.add("active"),Ee(),await Te(T._id))}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(A=>{A.onclick=async $=>{$.stopPropagation();const R=A.dataset.channelId,T=d.find(B=>B._id===R),H=T&&T.type==="direct",g=H?"this 1-on-1 chat":`the group "${(T==null?void 0:T.name)||""}"`;if(confirm(`Are you sure you want to delete ${g}? All messages will be permanently removed.`))try{A.disabled=!0,await Je(`/bonding/channels/${R}`),S(H?"1-on-1 chat deleted":"Group deleted","success"),d=d.filter(B=>B._id!==R),s&&s._id===R&&(s=d[0]||null,Ee(),s&&await Te(s._id)),We()}catch(B){S(B.message||"Failed to delete conversation","error"),A.disabled=!1}}}),(b=i.querySelector("#btn-create-group"))==null||b.addEventListener("click",v),(l=i.querySelector("#btn-new-direct-chat"))==null||l.addEventListener("click",N)}function Ee(){const u=i.querySelector("#bonding-chat-panel");if(!u)return;if(!s){u.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const b=w(s.displayName||s.name),l=(s.members||[]).length,A=s.type==="group",$=(e==null?void 0:e._id)||(e==null?void 0:e.id),R=A?null:(s.members||[]).find(T=>{var H;return((H=T.userId)==null?void 0:H.toString())!==($==null?void 0:$.toString())});u.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${A?s.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${b}</div>
            <div class="bonding-chat-sub">
              ${A?`<span>${l} members</span> · <span>${w(s.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${A?`
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
        ${tt()}
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
    `,qe(R),be(R),et(),_()}function tt(){if(!n||n.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const u=(e==null?void 0:e._id)||(e==null?void 0:e.id);return n.map(b=>{var T,H,g,B,D,ue,ae,ge,te;const l=b.sender&&b.sender.userId&&u&&b.sender.userId.toString()===u.toString();if(b.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${b._id}">
            <span>ℹ️</span> <span>${w(b.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${b._id}" title="Delete Message">&times;</button>
          </div>
        `;if(b.type==="challenge"&&b.challengeData){const U=b.challengeData,J=U.gameTitle||"Game Challenge",oe=U.gameType||"chess",he=oe==="chess"?"♟️":oe==="ludo"?"🎲":"❌",Se=(T=U.gameState)==null?void 0:T.invitationId,Ce=(H=U.targetUserId)==null?void 0:H.toString(),Ne=(B=(g=b.sender)==null?void 0:g.userId)==null?void 0:B.toString(),ce=u&&Ce===u.toString(),me=u&&Ne===u.toString();return`
          <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${b._id}">
            <div class="bonding-msg-avatar" title="${w(((D=b.sender)==null?void 0:D.name)||"Teammate")}">
              ${(((ue=b.sender)==null?void 0:ue.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${w(((ae=b.sender)==null?void 0:ae.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${F(b.createdAt)}</span>
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
                    <h4 class="game-bubble-title">${w(J)}</h4>
                    <p class="game-bubble-desc">${w(b.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${U.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':U.status==="active"||U.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${w(((ge=U.status)==null?void 0:ge.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${U.status==="pending"&&ce?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${Se}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${Se}" data-action="decline">
                        Decline
                      </button>
                    `:U.status==="pending"&&me?`
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

              ${at(b)}
            </div>
          </div>
        `}const A=w(((te=b.sender)==null?void 0:te.name)||"Teammate"),$=F(b.createdAt),R=at(b);return`
        <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${b._id}">
          <div class="bonding-msg-avatar" title="${A}">${A.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${A}</span>
              <span class="bonding-msg-time">${$}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${b._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${w(b.content).replace(/\n/g,"<br/>")}
            </div>
            ${R}
          </div>
        </div>
      `}).join("")}function at(u){return`
      <div class="bonding-reactions-row">
        ${(u.reactions||[]).map(A=>{const $=(e==null?void 0:e._id)||(e==null?void 0:e.id);return`
        <button class="bonding-rxn-tag ${(A.users||[]).some(T=>T.toString()===($==null?void 0:$.toString()))?"active":""}" data-msg-id="${u._id}" data-emoji="${A.emoji}">
          <span>${A.emoji}</span> <span>${A.users?A.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${u._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function qe(u){const b=i.querySelector("#btn-chat-challenge");b&&(b.onclick=()=>{u?z(null,u.userId||u._id):z()});const l=i.querySelector("#btn-manage-members");l&&(l.onclick=L);const A=i.querySelector("#btn-delete-group");A&&(A.onclick=G);const $=i.querySelector("#btn-delete-direct");$&&($.onclick=async()=>{if(s&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{$.disabled=!0,await Je(`/bonding/channels/${s._id}`),S("1-on-1 chat deleted successfully","success");const T=s._id;d=d.filter(H=>H._id!==T),s=d[0]||null,We(),Ee(),s&&await Te(s._id)}catch(T){S(T.message||"Could not delete 1-on-1 chat","error"),$.disabled=!1}});const R=i.querySelector("#btn-clear-chat");R&&(R.onclick=async()=>{if(s&&confirm("Are you sure you want to clear all messages in this conversation?"))try{R.disabled=!0,await Je(`/bonding/channels/${s._id}/messages`),S("Chat messages cleared","success"),n=[],a()}catch(T){S(T.message||"Could not clear chat messages","error")}finally{R.disabled=!1}})}function be(u){const b=i.querySelector("#bonding-message-input"),l=i.querySelector("#btn-send-message"),A=i.querySelector("#btn-quick-emoji"),$=i.querySelector("#btn-input-challenge");b&&b.addEventListener("keydown",R=>{R.key==="Enter"&&!R.shiftKey&&(R.preventDefault(),ye())}),l&&(l.onclick=ye),$&&($.onclick=()=>{u?z(null,u.userId||u._id):z()}),A&&(A.onclick=()=>{if(!b)return;const R=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],T=R[Math.floor(Math.random()*R.length)];b.value+=(b.value?" ":"")+T,b.focus()})}function et(){i.querySelectorAll(".btn-respond-invite").forEach(A=>{A.onclick=async()=>{const $=A.dataset.inviteId,R=A.dataset.action;await Y($,R)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(A=>{A.onclick=async()=>{const $=A.dataset.inviteId;try{A.disabled=!0;const R=await Ge("/bonding/invitations"),T=(R.incoming||[]).concat(R.sent||[]).find(H=>H._id===$);T&&T.matchId?W(T.matchId):S("Match has not started yet or has expired","warning")}catch(R){S(R.message||"Could not load match","error")}finally{A.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(A=>{A.onclick=async $=>{$.stopPropagation();const R=A.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{A.disabled=!0,await Je(`/bonding/messages/${R}`),n=n.filter(T=>T._id!==R),I(),S("Message deleted","success")}catch(T){S(T.message||"Failed to delete message","error"),A.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(A=>{A.onclick=async()=>{const $=A.dataset.msgId,R=A.dataset.emoji;await c($,R)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(A=>{A.onclick=$=>{const R=A.dataset.msgId;V($.currentTarget,async T=>{await c(R,T)})}})}async function ye(){const u=i.querySelector("#bonding-message-input");if(!u||!s||x)return;const b=u.value.trim();if(b)try{x=!0,u.value="";const l=await _e(`/bonding/channels/${s._id}/messages`,{content:b,type:"text"});n.push(l),a(),_()}catch(l){S(l.message||"Failed to send message","error")}finally{x=!1,u.focus()}}async function c(u,b){try{const l=await _e(`/bonding/messages/${u}/react`,{emoji:b}),A=n.find($=>$._id===u);A&&(A.reactions=l,I())}catch(l){S(l.message||"Failed to react","error")}}function _(){const u=i.querySelector("#bonding-messages-feed");u&&(u.scrollTop=u.scrollHeight)}function I(){const u=i.querySelector("#bonding-messages-feed");if(!u)return;const b=u.scrollHeight-u.scrollTop<=u.clientHeight+80;u.innerHTML=tt(),et(),b&&_()}function a(){const u=i.querySelector("#bonding-messages-feed");u&&(u.innerHTML=tt(),et())}async function r(u=!1){const b=i.querySelector("#bonding-lounge-main-wrap");if(b){u||(b.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const l=await Ge("/bonding/games/overview");C=l;const A=l.myStats||{},$=l.availableGames||[],R=l.incomingChallenges||[],T=l.sentChallenges||[],H=l.activeMatches||[],g=l.recentMatches||[],B=(e==null?void 0:e._id)||(e==null?void 0:e.id);b.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${A.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${A.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${A.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${A.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${A.gamesPlayed>0?Math.round((A.wins||0)/A.gamesPlayed*100):0}%</span>
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
              ${$.map(D=>`
                <div class="lounge-game-card" data-game-id="${D.id}">
                  <div class="game-card-icon">${D.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${w(D.name)}</h4>
                    <p class="game-card-desc">${w(D.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${D.duration}</span>
                      ${D.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${D.id}" data-game-title="${w(D.name)}">
                    ${D.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${R.length+T.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${R.length})</h5>
              ${R.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${R.map(D=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(D.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${w(D.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${w(D.sender.name)}</strong> (${w(D.sender.role)})</span>
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
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${T.length})</h5>
              ${T.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${T.map(D=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(D.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${w(D.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${w(D.recipient.name)}</strong></span>
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
                <span class="badge green">${H.length} Live</span>
              </div>

              ${H.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${H.map(D=>{const ae=B&&D.player1.userId.toString()===B.toString()?D.player2:D.player1,ge=B&&D.currentTurnUserId&&D.currentTurnUserId.toString()===B.toString();return`
                        <div class="lounge-active-match-card ${ge?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${D.gameType==="chess"?"♟️":D.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${w(D.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${w(ae.name)}</strong> (${w(ae.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ge?"my-turn":"wait"}">
                              ${ge?"⚡ Your Turn!":"⏳ Opponent Turn"}
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
              ${g.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${g.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${g.map(D=>{const ae=B&&D.player1.userId.toString()===B.toString()?D.player2:D.player1,ge=B&&D.winnerId&&D.winnerId.toString()===B.toString(),te=D.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${w(D.gameTitle)}</span>
                          <span class="recent-date">${F(D.completedAt||D.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${D._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${w(ae.name)}</strong></div>
                          <div class="recent-outcome ${ge?"win":te?"draw":"loss"}">
                            ${ge?"🏆 VICTORY":te?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${w(D.winningReason||D.status)})</span>
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
      `,y()}catch(l){b.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${w(l.message)}</p>
        </div>
      `}}}function y(){i.querySelectorAll(".btn-challenge-game").forEach(b=>{b.onclick=()=>{const l=b.dataset.gameId;z(l)}}),i.querySelectorAll(".btn-respond-invite").forEach(b=>{b.onclick=async()=>{const l=b.dataset.inviteId,A=b.dataset.action;await Y(l,A),await r()}}),i.querySelectorAll(".btn-resume-match").forEach(b=>{b.onclick=()=>{const l=b.dataset.matchId;W(l)}}),i.querySelectorAll(".btn-recent-rematch").forEach(b=>{b.onclick=async()=>{const l=b.dataset.matchId;try{b.disabled=!0;const A=await _e(`/bonding/matches/${l}/action`,{action:"rematch"});A.match&&(S("Rematch created! Opening arena ⚔️","success"),W(A.match._id))}catch(A){S(A.message||"Could not start rematch","error")}finally{b.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(b=>{b.onclick=async l=>{l.stopPropagation();const A=b.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{b.disabled=!0,await Je(`/bonding/matches/${A}`),S("Match deleted successfully","success"),await r()}catch($){S($.message||"Failed to delete match","error")}finally{b.disabled=!1}}});const u=i.querySelector("#btn-clear-matches");u&&(u.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{u.disabled=!0,await Je("/bonding/matches?filter=completed"),S("Completed matches history cleared","success"),await r()}catch(b){S(b.message||"Failed to clear matches","error")}finally{u.disabled=!1}})}function z(u=null,b=null){const l=i.querySelector("#bonding-modals-root"),A=(e==null?void 0:e._id)||(e==null?void 0:e.id),$=new Set(["employee","admin","superadmin"]),R=f.filter(ge=>!ge.isSelf&&ge._id.toString()!==(A==null?void 0:A.toString())&&$.has(ge.role));let T=u||"chess",H=b?b.toString():null,g=2,B=H?[H]:[],D="none";function ue(){const ge=R.find(oe=>oe._id.toString()===H),te=T==="ludo",U=g-1,J=B.length===U;l.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${te?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
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
              ${te?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${g===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${g===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${g===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${te?`Step 3 — Select Colleagues to Play With (${B.length}/${U} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${R.map(oe=>{const he=te?B.includes(oe._id.toString()):H===oe._id.toString();return`
                      <div class="eligible-emp-item ${he?"selected":""}" data-user-id="${oe._id}">
                        <div class="emp-item-avatar">${oe.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${w(oe.name)}</span>
                          <span class="emp-item-role">${w(oe.role==="superadmin"?"Superadmin":oe.role==="admin"?"Admin":"Employee")} · ${w(oe.email||"")}</span>
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
                    <label class="timer-radio-lbl ${D==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${D==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${D==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${D==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${D==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${D==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${te?`🎲 Ludo (${g} Players · 4 Pawns per base)`:T==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${te?`
                    <div><strong>Opponents:</strong> ${B.length>0?B.map(oe=>{const he=R.find(Se=>Se._id.toString()===oe);return he?`<strong>${w(he.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+U+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${ge?`<strong>${w(ge.name)}</strong> (${w(ge.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${T==="chess"?`<div><strong>Time Control:</strong> ${D==="none"?"Untimed":D}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(te?!J:!H)?"disabled":""}>
                ${te?`Start ${g}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,ae()}function ae(){l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelector("#btn-cancel-challenge-flow").onclick=()=>{l.innerHTML=""},l.querySelectorAll(".game-pill-btn").forEach(U=>{U.onclick=()=>{T=U.dataset.game,ue()}}),l.querySelectorAll(".ludo-mode-btn").forEach(U=>{U.onclick=()=>{g=Number(U.dataset.count),B=B.slice(0,g-1),ue()}});const ge=l.querySelector("#flow-emp-search");ge&&(ge.oninput=U=>{const J=U.target.value.toLowerCase().trim();l.querySelectorAll(".eligible-emp-item").forEach(oe=>{const he=oe.textContent.toLowerCase();oe.style.display=he.includes(J)?"flex":"none"})}),l.querySelectorAll(".eligible-emp-item").forEach(U=>{U.onclick=()=>{const J=U.dataset.userId;if(T==="ludo"){const oe=g-1;B.includes(J)?B=B.filter(he=>he!==J):B.length<oe?B.push(J):B[oe-1]=J}else H=J;ue()}}),l.querySelectorAll('input[name="timerMode"]').forEach(U=>{U.onchange=J=>{D=J.target.value,ue()}});const te=l.querySelector("#btn-submit-challenge-flow");te&&(te.onclick=async()=>{if(T==="ludo"){const U=g-1;if(B.length<U){S(`Please select ${U} colleague(s) to play with`,"warning");return}try{te.disabled=!0,te.textContent="Launching Match...";const J=await _e("/bonding/matches/instant-ludo",{playerCount:g,targetUserIds:B});l.innerHTML="",S(`Ludo match started (${g} Players)! 🎲`,"success"),J&&J._id&&W(J._id)}catch(J){S(J.message||"Failed to start Ludo match","error"),te.disabled=!1,te.textContent=`Start ${g}P Ludo Match 🎲`}return}if(!H){S("Please select an employee to challenge","warning");return}try{te.disabled=!0,te.textContent="Sending Challenge...",await _e("/bonding/invitations",{gameType:T,targetUserId:H,matchSettings:{timerMode:D},channelId:(s==null?void 0:s._id)||null}),S("Game challenge delivered! Awaiting acceptance ⚔️","success"),l.innerHTML="",s&&await Te(s._id),o==="lounge_games"&&await r()}catch(U){S(U.message||"Could not send challenge","error"),te.disabled=!1,te.textContent="Send Challenge 🚀"}})}ue()}async function Y(u,b){if(!(!u||!b))try{const l=await Wt(`/bonding/invitations/${u}/respond`,{action:b});b==="accept"?(S("Challenge accepted! Entering match arena ⚔️","success"),l.match&&W(l.match._id)):b==="decline"?S("Challenge declined","info"):b==="cancel"&&S("Challenge cancelled","info"),s&&await Te(s._id),o==="lounge_games"&&await r()}catch(l){S(l.message||"Action failed","error")}}async function W(u){if(!u)return;j=u,P&&clearInterval(P);const b=i.querySelector("#bonding-modals-root");let l=null,A=null,$=[];async function R(){try{return l=await Ge(`/bonding/matches/${u}`),l}catch(ae){return S(ae.message||"Could not load match","error"),T(),null}}if(l=await R(),!l)return;function T(){P&&clearInterval(P),j=null,b.innerHTML="",o==="lounge_games"&&r(!0),s&&Te(s._id,!0)}P=setInterval(async()=>{var U,J,oe,he;if(!j||j!==u){clearInterval(P);return}const ae=(U=l==null?void 0:l.currentTurnUserId)==null?void 0:U.toString(),ge=l==null?void 0:l.status,te=await R();te&&(((J=te.currentTurnUserId)==null?void 0:J.toString())!==ae||te.status!==ge||((oe=te.moves)==null?void 0:oe.length)!==((he=l.moves)==null?void 0:he.length))&&H()},1500);function H(){var he,Se;if(!l)return;const ae=(e==null?void 0:e._id)||(e==null?void 0:e.id),ge=ae&&l.player1.userId.toString()===ae.toString(),te=ge?l.player1:l.player2,U=ge?l.player2:l.player1,J=ae&&l.currentTurnUserId&&l.currentTurnUserId.toString()===ae.toString(),oe=l.status!=="active";b.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${l.gameType==="ludo"?"🎲":l.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${w(l.gameTitle)}</h3>
                  ${l.gameType==="ludo"&&((he=l.gameState)!=null&&he.players)?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${l.gameState.players.map(Ce=>{var je;const Ne=Ce.userId&&Ce.userId.toString()===(ae==null?void 0:ae.toString()),ce={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Ce.color]||"⚪",me=(((je=l.gameState)==null?void 0:je.turnColor)||l.turn)===Ce.color;return`
                          <span class="player-tag ${Ne?"self":"opp"} ${me?"turn-active":""}">
                            ${ce} <strong>${w(Ce.name)}</strong> ${Ne?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${w(te.name)} (You · <strong>${l.gameType==="ludo"?te.assignedRole==="red"?"🔴 Red":"🟢 Green":l.gameType==="tictactoe"?te.assignedRole==="X"?"✕":"◯":te.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${w(U.name)} (<strong>${l.gameType==="ludo"?U.assignedRole==="red"?"🔴 Red":"🟢 Green":l.gameType==="tictactoe"?U.assignedRole==="X"?"✕":"◯":U.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${oe?"ended":J?"my-turn":"opp-turn"}">
                ${oe?`<span>🏁 Finished (${w(l.winningReason||l.status)})</span>`:J?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${w(U.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${l.gameType==="ludo"?J?(Se=l.gameState)!=null&&Se.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":l.gameType==="tictactoe"?J?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":J?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${oe?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${l.drawOfferedBy&&l.drawOfferedBy.toString()!==(ae==null?void 0:ae.toString())&&!oe?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${w(U.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${l.gameType==="chess"?g(ge):""}
              ${l.gameType==="tictactoe"?B():""}
              ${l.gameType==="ludo"?D(ge):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${oe?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${l.winnerId&&l.winnerId.toString()===(ae==null?void 0:ae.toString())?"🏆":l.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${l.winnerId&&l.winnerId.toString()===(ae==null?void 0:ae.toString())?"VICTORY!":l.status==="draw"?"STALEMATE / DRAW":`${w(l.winnerName)} Wins!`}</h4>
                  <p>Reason: ${w(l.winningReason||"Match concluded")}</p>
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
      `,ue(J,ge,te)}function g(ae){var ce;const ge=((ce=l.gameState)==null?void 0:ce.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",te=new va(ge),U=ae?l.player1.assignedRole==="white":l.player2.assignedRole==="white",J={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},oe=U?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],he=U?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Se='<div class="chess-board-grid">';for(const me of he)for(const je of oe){const Pe=`${je}${me}`,q=te.get(Pe),K=(je.charCodeAt(0)-97+me)%2!==0,fe=A===Pe,we=$.includes(Pe),Ie=q?q.color==="w"?J[q.type.toUpperCase()]:J[q.type]:"";Se+=`
            <div class="chess-sq ${K?"light":"dark"} ${fe?"selected":""} ${we?"legal-dot":""}" data-square="${Pe}">
              ${Ie?`<span class="chess-piece ${q.color==="w"?"white-piece":"black-piece"}">${Ie}</span>`:""}
            </div>
          `}Se+="</div>";const Ne=(l.moves||[]).map(me=>{var je;return`
        <span class="chess-move-token">${me.moveNum}. ${((je=me.moveData)==null?void 0:je.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${Se}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${Ne||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function B(){var te;const ae=((te=l.gameState)==null?void 0:te.board)||Array(9).fill(null),ge=l.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${ae.map((U,J)=>{const oe=ge.includes(J);return`
                <div class="ttt-cell ${U?"filled":"empty"} ${oe?"win-cell":""}" data-cell-idx="${J}">
                  ${U==="X"?'<span class="ttt-x">✕</span>':U==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function D(ae,ge,te){var Rt;const U=l.gameState||{},J=U.activeColors||["red","green"],oe=U.players||[{...l.player1,color:"red",assignedRole:"red",isBot:!1},{...l.player2,color:"green",assignedRole:"green",isBot:!1}],he=U.tokens||{},Se=M=>{const ne=he[M]||(M==="red"?U.p1Tokens:M==="green"?U.p2Tokens:[])||[];return Array.from({length:4},(ve,Oe)=>ne[Oe]||{id:Oe,step:-1})},Ce=Se("red"),Ne=Se("green"),ce=Se("yellow"),me=Se("blue"),je=(e==null?void 0:e._id)||(e==null?void 0:e.id),Pe=oe.find(M=>M.userId&&M.userId.toString()===(je==null?void 0:je.toString()))||oe[0],q=(Pe==null?void 0:Pe.color)||(ae?"red":"green"),K=U.turnColor||l.turn||"red",fe=q===K&&l.status==="active",we=!!U.rolled,Ie=U.dice,ze=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],ct=[[7,1],[7,2],[7,3],[7,4],[7,5]],ot=[[1,7],[2,7],[3,7],[4,7],[5,7]],Et=[[7,13],[7,12],[7,11],[7,10],[7,9]],Pt=[[13,7],[12,7],[11,7],[10,7],[9,7]],h=[0,8,13,21,26,34,39,47];function pt(M,ne){return ne<0?null:ne>=56?M==="red"?[7,6]:M==="green"?[6,7]:M==="yellow"?[7,8]:[8,7]:M==="red"?ne<=50?ze[ne]:ct[ne-51]:M==="green"?ne<=50?ze[(13+ne)%52]:ot[ne-51]:M==="yellow"?ne<=50?ze[(26+ne)%52]:Et[ne-51]:ne<=50?ze[(39+ne)%52]:Pt[ne-51]}function Ke(M,ne){return M!==q||!fe||!we||!Ie||l.status!=="active"?!1:ne.step===-1?Ie===6:ne.step>=0&&ne.step+Ie<=56}const ut={},O=(M,ne)=>{ne.forEach(ve=>{if(ve.step>=0&&ve.step<56){const Oe=pt(M,ve.step);if(Oe){const Xe=Oe[0]+","+Oe[1];(ut[Xe]=ut[Xe]||[]).push({color:M,id:ve.id,step:ve.step,movable:Ke(M,ve)})}}})};J.includes("red")&&O("red",Ce),J.includes("green")&&O("green",Ne),J.includes("yellow")&&O("yellow",ce),J.includes("blue")&&O("blue",me);const gt={};ze.forEach(([M,ne],ve)=>{gt[M+","+ne]=ve});const De={};ct.forEach(([M,ne],ve)=>{De[M+","+ne]=ve+1});const Qe={};ot.forEach(([M,ne],ve)=>{Qe[M+","+ne]=ve+1});const Mt={};Et.forEach(([M,ne],ve)=>{Mt[M+","+ne]=ve+1});const Ve={};Pt.forEach(([M,ne],ve)=>{Ve[M+","+ne]=ve+1});const jt=[];for(let M=0;M<15;M++)for(let ne=0;ne<15;ne++){if(M<6&&ne<6||M<6&&ne>8||M>8&&ne<6||M>8&&ne>8||M>=6&&M<=8&&ne>=6&&ne<=8)continue;const ve=M+","+ne,Oe=gt[ve],Xe=Oe!==void 0&&h.includes(Oe),st=M===6&&ne===1,it=M===1&&ne===8,bt=M===8&&ne===13,Nt=M===13&&ne===6,Xt=De[ve],Bt=Qe[ve],Zt=Mt[ve],Fe=Ve[ve];let p="ludo-cell";st?p+=" cell-red-start":it?p+=" cell-green-start":bt?p+=" cell-yellow-start":Nt?p+=" cell-blue-start":Xt?p+=" cell-red-stretch":Bt?p+=" cell-green-stretch":Zt?p+=" cell-yellow-stretch":Fe?p+=" cell-blue-stretch":Xe&&(p+=" cell-safe-star");const k=ut[ve]||[];jt.push(`
            <div class="${p}" style="grid-row:${M+1};grid-column:${ne+1}" data-pos="${ve}">
              ${Xe?'<span class="cell-star-glyph">⭐</span>':""}
              ${st||it||bt||Nt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${k.map(m=>`
                <div class="ludo-token token-${m.color} ${m.movable?"movable":""}" data-token-id="${m.id}" data-color="${m.color}" title="${m.color.toUpperCase()} Pawn ${m.id+1}">
                  <span>${m.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}const Lt=["","⚀","⚁","⚂","⚃","⚄","⚅"];function ie(M){return!M||M.step===-1?"Base":M.step===56?"🏁 Home!":M.step>50?`H${M.step-50}`:`S${M.step}`}function St(M,ne,ve,Oe,Xe){const st=`${M}-yard`;return ve?`
          <div class="ludo-yard ${st} ${K===M?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${ne}</span>
                ${Oe?`<small class="yard-player-lbl">${w(Oe.name)}${Oe.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${Xe.map((it,bt)=>`
                  <div class="yard-token-slot">
                    ${it.step===-1?`
                      <div class="ludo-token token-${M} ${Ke(M,it)?"movable":""}" data-token-id="${it.id}" data-color="${M}" title="${M.toUpperCase()} Pawn ${it.id+1}">
                        <span>${it.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${bt+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `:`
            <div class="ludo-yard ${st}">
              <div class="yard-box decorative">
                <div class="yard-title">${ne} (Inactive)</div>
              </div>
            </div>
          `}const qt=oe.find(M=>M.color==="red"),Jt=oe.find(M=>M.color==="green"),zt=oe.find(M=>M.color==="yellow"),Qt=oe.find(M=>M.color==="blue");return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${St("red","🔴 Red Base",J.includes("red"),qt,Ce)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${St("green","🟢 Green Base",J.includes("green"),Jt,Ne)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${St("blue","🔵 Blue Base",J.includes("blue"),Qt,me)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${St("yellow","🟡 Yellow Base",J.includes("yellow"),zt,ce)}

            <!-- 5. Center Home Victory Zone (3x3) -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${Ce.filter(M=>M.step===56).map(M=>`<span class="tok-finished red" title="Red Pawn ${M.id+1} Home">🔴${M.id+1}</span>`).join("")}
                  ${Ne.filter(M=>M.step===56).map(M=>`<span class="tok-finished green" title="Green Pawn ${M.id+1} Home">🟢${M.id+1}</span>`).join("")}
                  ${ce.filter(M=>M.step===56).map(M=>`<span class="tok-finished yellow" title="Yellow Pawn ${M.id+1} Home">🟡${M.id+1}</span>`).join("")}
                  ${me.filter(M=>M.step===56).map(M=>`<span class="tok-finished blue" title="Blue Pawn ${M.id+1} Home">🔵${M.id+1}</span>`).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${jt.join("")}
          </div>

          <!-- Ludo Action & Dice Roller Console -->
          <div class="ludo-console">
            <div class="ludo-dice-box">
              <div class="ludo-dice-visual ${we?"rolled":""}">
                ${Ie?`<span class="dice-glyph">${Lt[Ie]}</span>`:"🎲"}
              </div>
              ${Ie?`<span class="dice-num-lbl">Rolled ${Ie}</span>`:'<span class="dice-num-lbl">Ready</span>'}
            </div>

            <div class="ludo-controls-box">
              ${fe&&!we&&l.status==="active"?`
                <button class="btn-ludo-roll pulse" id="btn-ludo-roll">🎲 Roll Dice</button>
              `:fe&&we&&l.status==="active"?`
                <div class="ludo-prompt-text highlight">
                  ${Se(q).some(M=>Ke(q,M))?"👉 Tap your <strong>glowing pawn</strong> to advance!":"No moves possible with this roll. Turn passing..."}
                </div>
              `:`
                <div class="ludo-prompt-text">
                  ${l.status==="active"?`⏳ Waiting for ${w(((Rt=oe.find(M=>M.color===K))==null?void 0:Rt.name)||"opponent")} (${K.toUpperCase()})...`:"🏁 Match Concluded"}
                </div>
              `}

              <div class="ludo-status-banner">
                ${w(U.lastActionText||"Match in progress.")}
              </div>
            </div>
          </div>

          <!-- Token Progress Strip for all active players -->
          <div class="ludo-progress-strip">
            ${J.map(M=>{const ne=oe.find(Xe=>Xe.color===M),ve=Se(M),Oe={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[M];return`
                <div class="progress-pill ${M} ${K===M?"active-turn":""}">
                  <strong>${Oe} ${ne?w(ne.name):M.toUpperCase()}:</strong>
                  ${ve.map((Xe,st)=>`P${st+1}: ${ie(Xe)}`).join(" · ")}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function ue(ae,ge,te){var Ne;b.querySelector("#btn-close-arena").onclick=T;const U=b.querySelector("#btn-arena-resign");U&&(U.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{U.disabled=!0,await _e(`/bonding/matches/${u}/action`,{action:"resign"}),await R(),H()}catch(ce){S(ce.message||"Resign failed","error"),U.disabled=!1}});const J=b.querySelector("#btn-arena-draw");J&&(J.onclick=async()=>{try{await _e(`/bonding/matches/${u}/action`,{action:"offer_draw"}),S("Draw offer sent to opponent","info"),await R(),H()}catch(ce){S(ce.message||"Draw offer failed","error")}});const oe=b.querySelector("#btn-confirm-accept-draw");oe&&(oe.onclick=async()=>{try{await _e(`/bonding/matches/${u}/action`,{action:"accept_draw"}),S("Draw agreed!","info"),await R(),H()}catch(ce){S(ce.message,"error")}});const he=b.querySelector("#btn-confirm-decline-draw");he&&(he.onclick=async()=>{try{await _e(`/bonding/matches/${u}/action`,{action:"decline_draw"}),await R(),H()}catch(ce){S(ce.message,"error")}}),[b.querySelector("#btn-arena-delete-match"),b.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(ce=>{ce.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{ce.disabled=!0,await Je(`/bonding/matches/${u}`),S("Match deleted","success"),T(),o==="lounge_games"&&await r()}catch(me){S(me.message||"Failed to delete match","error"),ce.disabled=!1}}});const Ce=b.querySelector("#btn-arena-rematch-action");if(Ce&&(Ce.onclick=async()=>{try{Ce.disabled=!0,Ce.textContent="Creating Rematch...";const ce=await _e(`/bonding/matches/${u}/action`,{action:"rematch"});ce.match&&(S("Rematch created! New match live ⚔️","success"),P&&clearInterval(P),W(ce.match._id))}catch(ce){S(ce.message||"Rematch failed","error"),Ce.disabled=!1,Ce.textContent="🔄 Request Rematch"}}),l.gameType==="chess"&&ae&&l.status==="active"){const ce=((Ne=l.gameState)==null?void 0:Ne.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",me=new va(ce),je=te.assignedRole==="white"?"w":"b";b.querySelectorAll(".chess-sq").forEach(Pe=>{Pe.onclick=async()=>{const q=Pe.dataset.square;if(A){if(A===q){A=null,$=[],H();return}if($.includes(q)){const fe=me.get(A);let we;fe&&fe.type==="p"&&(q.endsWith("8")||q.endsWith("1"))&&(we=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const Ie={from:A,to:q,promotion:we?we.toLowerCase():void 0};A=null,$=[],l=await _e(`/bonding/matches/${u}/move`,{move:Ie}),H()}catch(Ie){S(Ie.message||"Illegal chess move","error"),A=null,$=[],H()}return}}const K=me.get(q);K&&K.color===je?(A=q,$=me.moves({square:q,verbose:!0}).map(we=>we.to),H()):(A=null,$=[],H())}})}if(l.gameType==="tictactoe"&&ae&&l.status==="active"&&b.querySelectorAll(".ttt-cell.empty").forEach(ce=>{ce.onclick=async()=>{const me=ce.dataset.cellIdx;try{ce.style.opacity="0.5",l=await _e(`/bonding/matches/${u}/move`,{cellIndex:Number(me)}),H()}catch(je){S(je.message||"Invalid move","error")}}}),l.gameType==="ludo"&&l.status==="active"){const ce=b.querySelector("#btn-ludo-roll");ce&&ae&&(ce.onclick=async()=>{try{ce.disabled=!0,ce.textContent="Rolling 🎲...",l=await _e(`/bonding/matches/${u}/move`,{action:"roll"}),H()}catch(me){S(me.message||"Failed to roll","error"),ce.disabled=!1,ce.textContent="🎲 Roll Dice"}}),ae&&b.querySelectorAll(".ludo-token.movable").forEach(me=>{me.onclick=async je=>{je.stopPropagation();const Pe=me.dataset.tokenId;try{me.style.opacity="0.5",l=await _e(`/bonding/matches/${u}/move`,{action:"move",tokenId:Number(Pe)}),H()}catch(q){S(q.message||"Invalid token move","error"),me.style.opacity="1"}}})}}H()}function L(){if(!s||s.type==="direct")return;const u=i.querySelector("#bonding-modals-root"),b=g=>g==="employee"||g==="admin"||g==="superadmin",l=s.members||[],A=new Set(l.map(g=>{var B;return(B=g.userId)==null?void 0:B.toString()})),$=f.filter(g=>b(g.role)&&!A.has(g._id.toString()));u.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${w(s.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${$.map(g=>`
                    <option value="${g._id}">${w(g.name)} (${w(g.role==="superadmin"?"Superadmin":g.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${$.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${$.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${l.length}):</label>
              <div class="bonding-members-list">
                ${l.map(g=>{const B=(e==null?void 0:e._id)||(e==null?void 0:e.id),D=B&&g.userId&&g.userId.toString()===B.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(g.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${w(g.name)} ${D?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${w(g.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${g.userId}" data-name="${w(g.name)}">
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""};const R=u.querySelector("#btn-modal-delete-group");R&&(R.onclick=()=>{u.innerHTML="",G()});const T=u.querySelector("#btn-submit-add-member");T&&(T.onclick=async()=>{const B=u.querySelector("#sel-add-colleague").value;if(!B){S("Please select a colleague to add","warning");return}try{T.disabled=!0,T.textContent="Adding...";const D=await Wt(`/bonding/channels/${s._id}/members`,{action:"add",userIds:[B]});S("Colleague added to group! 🎉","success"),s=D.channel,u.innerHTML="",await Te(s._id),Ee()}catch(D){S(D.message||"Failed to add member","error"),T.disabled=!1,T.textContent="Add to Group"}}),u.querySelectorAll(".btn-remove-member").forEach(g=>{g.onclick=async()=>{const B=g.dataset.userId,D=g.dataset.name;if(confirm(`Are you sure you want to remove ${D} from this group?`))try{g.disabled=!0;const ue=await Wt(`/bonding/channels/${s._id}/members`,{action:"remove",userId:B});S(`${D} removed from group`,"info"),s=ue.channel,u.innerHTML="",await Te(s._id),Ee()}catch(ue){S(ue.message||"Failed to remove member","error"),g.disabled=!1}}})}async function G(){if(!s||s.type==="direct")return;const u=s.name;if(confirm(`Are you sure you want to delete the group "${u}"?

All messages in this lounge will be deleted.`))try{await Je(`/bonding/channels/${s._id}`),S(`Group "${u}" deleted successfully`,"success"),d=await Ge("/bonding/channels").catch(()=>[]),s=d.find(l=>l.type==="group")||d[0]||null,We(),Ee(),s&&await Te(s._id)}catch(l){S(l.message||"Failed to delete group","error")}}function N(){const u=i.querySelector("#bonding-modals-root"),b=$=>$==="employee"||$==="admin"||$==="superadmin",l=f.filter($=>!$.isSelf&&b($.role));u.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${l.map($=>`
                <div class="bonding-user-pick-item" data-user-id="${$._id}" data-name="${w($.name)}">
                  <div class="bonding-member-avatar">${$.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${w($.name)}</span>
                    <span class="user-pick-role">${w($.role==="superadmin"?"Superadmin":$.role==="admin"?"Admin":"Employee")} · ${w($.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelectorAll(".bonding-user-pick-item").forEach($=>{$.onclick=async()=>{const R=$.dataset.userId;try{const T=await _e("/bonding/channels",{type:"direct",targetUserId:R});u.innerHTML="",d=await Ge("/bonding/channels"),s=d.find(H=>H._id===T._id)||T,We(),Ee(),await Te(s._id)}catch(T){S(T.message||"Failed to open personal chat","error")}}})}function v(){const u=i.querySelector("#bonding-modals-root"),b=T=>T==="employee"||T==="admin"||T==="superadmin",l=f.filter(T=>!T.isSelf&&b(T.role));u.innerHTML=`
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
                ${l.map(T=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${T._id}" />
                    <span>${w(T.name)} (${w(T.role==="superadmin"?"Superadmin":T.role==="admin"?"Admin":"Employee")})</span>
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelector("#btn-cancel-create-grp").onclick=()=>{u.innerHTML=""};let A="👥";const $=u.querySelectorAll(".avatar-opt");$.forEach(T=>{T.onclick=()=>{$.forEach(H=>H.classList.remove("active")),T.classList.add("active"),A=T.textContent.trim()}});const R=u.querySelector("#btn-confirm-create-grp");R.onclick=async()=>{const T=u.querySelector("#new-group-name"),H=u.querySelector("#new-group-desc"),g=T.value.trim();if(!g){S("Please enter a group name","warning"),T.focus();return}const B=u.querySelectorAll(".new-group-member-chk:checked"),D=Array.from(B).map(ue=>ue.value);try{R.disabled=!0,R.textContent="Creating...";const ue=await _e("/bonding/channels",{type:"group",name:g,description:H.value.trim(),avatar:A,memberIds:D});S(`Group "${g}" created! 🎉`,"success"),u.innerHTML="",d=await Ge("/bonding/channels"),s=d.find(ae=>ae._id===ue._id)||ue,We(),Ee(),await Te(s._id)}catch(ue){S(ue.message||"Failed to create group","error"),R.disabled=!1,R.textContent="Create Group 🎉"}}}function V(u,b){const l=document.querySelector(".bonding-emoji-popup");l&&l.remove();const A=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],$=document.createElement("div");$.className="bonding-emoji-popup",$.innerHTML=A.map(H=>`<button class="emoji-opt-btn" data-e="${H}">${H}</button>`).join("");const R=u.getBoundingClientRect();$.style.top=`${R.bottom+window.scrollY+6}px`,$.style.left=`${R.left+window.scrollX}px`,document.body.appendChild($),$.querySelectorAll(".emoji-opt-btn").forEach(H=>{H.onclick=g=>{g.stopPropagation(),b(H.dataset.e),$.remove()}});const T=H=>{$.contains(H.target)||($.remove(),document.removeEventListener("click",T))};setTimeout(()=>document.addEventListener("click",T),10)}function F(u){if(!u)return"";try{return new Date(u).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Ya(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}const da=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],wt=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Tt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ei(i,t={}){const{userRole:e="employee",currentUser:o=null,initialTicketId:d=null}=t,s=e==="superadmin"||e==="admin";if(e==="client"||o&&o.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let f=[],n={},C=[],E=[],x={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},j=null,P="comments",Q=!1;i.innerHTML=`
    <div class="jira-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="jira-header-bar">
        <div class="jira-header-left">
          <div class="jira-breadcrumb">
            <span class="jira-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${s?"ALL TICKETS (ADMIN)":"INTERNAL TICKETS (ASSIGNED & CREATED)"}</span>
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
            ${wt.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
          </select>

          <select id="jira-filter-job" class="jira-filter-select">
            <option value="all">Linked Job: All</option>
          </select>

          ${s?`
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
  `,await Promise.all([Le(),xe(),lt(),rt()]),Te(),We(),dt(),at(),d&&et(d);const X=setInterval(()=>{if(!document.contains(i)){clearInterval(X);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!j&&be()},12e3),$e=()=>{document.contains(i)&&!j&&be()};window.addEventListener("focus",$e);async function xe(){try{const a=new URLSearchParams;x.search&&a.set("search",x.search),x.priority!=="all"&&a.set("priority",x.priority),x.category!=="all"&&a.set("category",x.category),x.assigneeId!=="all"&&a.set("assigneeId",x.assigneeId),x.jobId&&x.jobId!=="all"&&a.set("jobId",x.jobId),x.reporterId&&x.reporterId!=="all"&&a.set("reporterId",x.reporterId),x.scope==="created"&&a.set("reporterId",(o==null?void 0:o._id)||(o==null?void 0:o.id)),x.scope==="assigned"&&a.set("assigneeId",(o==null?void 0:o._id)||(o==null?void 0:o.id)),x.myIssuesOnly&&a.set("myIssuesOnly","true");const r=await Ge("/tickets?"+a.toString());f=Array.isArray(r)?r:[]}catch(a){S(a.message||"Failed to load tickets",!0),f=[]}}async function Le(){try{n=await Ge("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function lt(){try{C=(await Ge("/users")||[]).filter(r=>r.active&&r.role!=="client")}catch(a){console.warn("Could not fetch employees:",a)}}async function rt(){try{const a=await Ge("/jobs?limit=250");E=Array.isArray(a)?a:(a==null?void 0:a.jobs)||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function Te(){const a=i.querySelector("#jira-stats-root");a&&(a.innerHTML=`
      <div class="jira-stat-card ${x.status==="all"&&!x.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="jira-stat-val">${n.total||0}</span>
        <span class="jira-stat-lbl">Total Tickets</span>
      </div>
      <div class="jira-stat-card ${x.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="jira-stat-val">${n.toDo||0}</span>
        <span class="jira-stat-lbl">To Do</span>
      </div>
      <div class="jira-stat-card content ${x.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="jira-stat-val">${n.content??(n.inProgress||0)}</span>
        <span class="jira-stat-lbl">Content</span>
      </div>
      <div class="jira-stat-card design ${x.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="jira-stat-val">${n.design||0}</span>
        <span class="jira-stat-lbl">Design</span>
      </div>
      <div class="jira-stat-card review ${x.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="jira-stat-val">${n.underReview||0}</span>
        <span class="jira-stat-lbl">Under Review</span>
      </div>
      <div class="jira-stat-card ready ${x.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
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
    `,a.querySelectorAll(".jira-stat-card").forEach(r=>{r.onclick=async()=>{const y=r.dataset.statFilter;y==="all"?(x.status="all",x.priority="all"):y==="critical"?(x.priority="Critical",x.status="all"):(x.status=y,x.priority="all"),await be()}}))}function dt(){const a=i.querySelector("#jira-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${C.map(y=>`
          <option value="${y._id}" ${x.assigneeId===y._id.toString()?"selected":""}>
            ${w(y.name)} (${w(y.role)})
          </option>
        `).join("")}
      `);const r=i.querySelector("#jira-filter-job");r&&(r.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${E.map(y=>`
          <option value="${y._id}" ${x.jobId===y._id.toString()?"selected":""}>
            📁 ${w(y.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function We(){const a=i.querySelector("#jira-board-columns-root");if(!a)return;const r={};da.forEach(y=>{r[y.key]=[]}),f.forEach(y=>{let z=y.status||"To Do";z==="In Progress"?z="Content":z==="Resolved"?z="Under Review":z==="Closed"&&(z="Ready to Leave"),r[z]||(r[z]=[]),r[z].push(y)}),a.innerHTML=da.map(y=>{const z=r[y.key]||[];return`
        <div class="jira-board-column" data-status="${y.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${w(y.label)}</span>
              <span class="jira-col-badge">${z.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${y.key}">
            ${z.length===0?`
              <div style="padding:28px 10px;text-align:center;color:#475569;font-size:12px;font-style:italic;">
                No tickets
              </div>
            `:z.map(Y=>xt(Y)).join("")}
          </div>
        </div>
      `}).join(""),Ee(),tt()}function xt(a){const r=wt.find(V=>V.key===a.category)||wt[0],y=Tt.find(V=>V.key===a.priority)||Tt[2],z=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",Y=(a.subtasks||[]).filter(V=>V.completed).length,W=(a.subtasks||[]).length,L=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],G=(o==null?void 0:o._id)||(o==null?void 0:o.id),N=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(G);let v="";if(L.length===0)v='<div class="jira-avatar unassigned" title="Unassigned">?</div>';else{const V=L.slice(0,3),F=L.length-3;v=`
        <div class="jira-avatar-group">
          ${V.map(Z=>{var re;return`
            <div class="jira-avatar" title="Assignee: ${w(Z.name||"Member")} (${w(Z.role||"")})">
              ${(Z.avatar||((re=Z.name)==null?void 0:re.slice(0,1))||"U").toUpperCase()}
            </div>
          `}).join("")}
          ${F>0?`
            <div class="jira-avatar extra-count" title="${F} more assignees: ${w(L.slice(3).map(Z=>Z.name).join(", "))}">
              +${F}
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
            ${N?`
              <span class="jira-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${a.dueDate?`
              <span class="jira-due-pill ${z?"overdue":""}" title="Due Date">
                ${z?"⚠️ ":"📅 "}
                ${new Date(a.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          <button type="button" class="jira-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${w(a.ticketId)}" title="Delete Ticket">
            🗑️
          </button>
        </div>

        <div class="jira-card-title" title="${w(a.title)}">
          ${w(a.title)}
        </div>

        ${a.jobTitle||a.jobId&&a.jobId.title?`
          <div class="jira-card-job-link" title="Linked Internal Job: ${w(a.jobTitle||a.jobId.title)}">
            📁 ${w(a.jobTitle||a.jobId.title)}
          </div>
        `:""}

        <div class="jira-card-bottom">
          <div class="jira-card-id-row">
            <span class="jira-pri-icon" title="Priority: ${y.label}">${y.icon}</span>
            <span class="jira-ticket-id">${w(a.ticketId)}</span>
          </div>

          <div class="jira-card-assignee-row">
            ${W>0?`
              <span class="jira-subtask-badge" title="${Y} of ${W} subtasks completed">
                ☑ ${Y}/${W}
              </span>
            `:""}
            ${v}
          </div>
        </div>
      </div>
    `}function Ee(){const a=i.querySelectorAll(".jira-card"),r=i.querySelectorAll(".jira-board-column");a.forEach(y=>{y.ondragstart=z=>{z.dataTransfer.setData("text/plain",y.dataset.ticketId),y.classList.add("dragging")},y.ondragend=()=>{y.classList.remove("dragging")}}),r.forEach(y=>{y.ondragover=z=>{z.preventDefault(),y.classList.add("drag-over")},y.ondragleave=()=>{y.classList.remove("drag-over")},y.ondrop=async z=>{z.preventDefault(),y.classList.remove("drag-over");const Y=z.dataTransfer.getData("text/plain"),W=y.dataset.status;if(!Y||!W)return;const L=f.find(N=>N._id.toString()===Y);if(!L||L.status===W)return;const G=L.status;L.status=W,We();try{const N=await Ye(`/tickets/${Y}/status`,{status:W});S(`Moved ${N.ticketId} to ${W}`,!1),await be()}catch(N){S(N.message||"Status update failed",!0),L.status=G,await be()}}})}function tt(){i.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async r=>{r.stopPropagation(),r.preventDefault();const y=a.dataset.ticketId,z=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${z}?`)){a.disabled=!0;try{await Je(`/tickets/${y}`),S(`Ticket ${z} deleted`,!1),await be()}catch(Y){S(Y.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),i.querySelectorAll(".jira-card").forEach(a=>{a.onclick=r=>{if(r.target.tagName==="A"||r.target.closest(".btn-delete-card-ticket"))return;const y=a.dataset.ticketId;et(y)}})}function at(){const a=i.querySelector("#btn-jira-refresh");a&&(a.onclick=async()=>{a.classList.add("pulse"),await be(),S("Board updated",!1),a.classList.remove("pulse")});const r=i.querySelector("#btn-jira-create-ticket");r&&(r.onclick=()=>{I()});const y=i.querySelector("#jira-search-input");let z=null;y&&(y.oninput=ee=>{clearTimeout(z),z=setTimeout(async()=>{x.search=ee.target.value.trim(),qe(),await be()},300)});const Y=i.querySelector("#jira-filter-priority");Y&&(Y.onchange=async ee=>{x.priority=ee.target.value,qe(),await be()});const W=i.querySelector("#jira-filter-category");W&&(W.onchange=async ee=>{x.category=ee.target.value,qe(),await be()});const L=i.querySelector("#jira-filter-job");L&&(L.onchange=async ee=>{x.jobId=ee.target.value,qe(),await be()});const G=i.querySelector("#jira-filter-assignee");G&&(G.onchange=async ee=>{x.assigneeId=ee.target.value,qe(),await be()});const N=i.querySelector("#jira-pill-my-issues");N&&(N.onclick=async()=>{x.myIssuesOnly=!x.myIssuesOnly,N.classList.toggle("active",x.myIssuesOnly),qe(),await be()});const v=i.querySelector("#jira-pill-scope-all"),V=i.querySelector("#jira-pill-scope-assigned"),F=i.querySelector("#jira-pill-scope-created"),Z=async ee=>{x.scope=ee,v&&v.classList.toggle("active",ee==="all"),V&&V.classList.toggle("active",ee==="assigned"),F&&F.classList.toggle("active",ee==="created"),qe(),await be()};v&&(v.onclick=()=>Z("all")),V&&(V.onclick=()=>Z("assigned")),F&&(F.onclick=()=>Z("created"));const re=i.querySelector("#jira-clear-filters");re&&(re.onclick=async()=>{x={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},y&&(y.value=""),Y&&(Y.value="all"),W&&(W.value="all");const ee=i.querySelector("#jira-filter-job");ee&&(ee.value="all"),G&&(G.value="all"),N&&N.classList.remove("active"),v&&v.classList.add("active"),V&&V.classList.remove("active"),F&&F.classList.remove("active"),qe(),await be()})}function qe(){const a=i.querySelector("#jira-clear-filters");if(!a)return;const r=x.search||x.priority!=="all"||x.category!=="all"||x.jobId&&x.jobId!=="all"||x.assigneeId!=="all"||x.myIssuesOnly||x.scope&&x.scope!=="all";a.style.display=r?"inline":"none"}async function be(){await xe(),We()}async function et(a){const r=i.querySelector("#jira-modals-root");if(r){r.innerHTML=`
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{j=await Ge(`/tickets/${a}`)}catch(y){S(y.message||"Could not load ticket",!0),r.innerHTML="";return}ye()}}function ye(){var $,R,T,H;const a=i.querySelector("#jira-modals-root");if(!a||!j)return;const r=j,y=wt.find(g=>g.key===r.category)||wt[0];Tt.find(g=>g.key===r.priority)||Tt[2];const z=r.subtasks||[],Y=z.filter(g=>g.completed).length,W=z.length>0?Math.round(Y/z.length*100):0,L=r.attachments||[],G=r.comments||[],N=(r.history||[]).slice().reverse(),v=r.workLogs||[],V=r.linkedTickets||[],F=(o==null?void 0:o._id)||(o==null?void 0:o.id),Z=r.reporter&&r.reporter.userId&&String(r.reporter.userId)===String(F)||r.userId&&String(r.userId)===String(F),re=Array.isArray(r.assignees)&&r.assignees.length>0?r.assignees:r.assignee&&r.assignee.userId?[r.assignee]:[],ee=re.some(g=>g&&g.userId&&String(g.userId)===String(F)),u=e==="superadmin"||e==="admin",b=u||Z||ee,l=($=r.jobId)!=null&&$._id?r.jobId._id.toString():r.jobId?r.jobId.toString():"",A=r.jobTitle||r.jobId&&r.jobId.title||"";a.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${y.slug}">${y.icon} ${y.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${w(r.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${w(r.title)}" title="Click to edit title" />
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
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${w(r.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${r.description?w(r.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Attachments Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Attachments (${L.length})</span>
                  <label class="btn-jira-secondary" style="font-size:11px;padding:4px 8px;cursor:pointer;">
                    📎 Upload File
                    <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                  </label>
                </div>

                ${L.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload screenshots, logs, or briefs.</div>
                `:`
                  <div class="jira-attachments-grid">
                    ${L.map(g=>`
                      <div class="jira-att-card">
                        <div class="jira-att-left">
                          <span>📎</span>
                          <a href="${g.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${w(g.name)}">
                            ${w(g.name)}
                          </a>
                        </div>
                        <button type="button" class="jira-att-del btn-del-att" data-att-id="${g.id}" title="Delete file">&times;</button>
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>

              <!-- Subtasks Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Subtasks (${Y}/${z.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${W}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${W}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${z.map(g=>`
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${g.id}" ${g.completed?"checked":""} />
                        <span class="jira-subtask-title ${g.completed?"done":""}">${w(g.title)}</span>
                      </div>
                      <button type="button" class="jira-att-del btn-del-subtask" data-subtask-id="${g.id}" title="Remove subtask">&times;</button>
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
                  <span>Linked Work Items (${V.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${V.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${V.map(g=>`
                      <div class="jira-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${w(g.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${w(g.ticketId)}</span>
                          <span style="font-size:12.5px;color:#f1f5f9;">${w(g.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${w(g.status||"Open")}</span>
                          <button type="button" class="jira-att-del btn-del-link" data-link-id="${g.id}" title="Remove link">&times;</button>
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
                    ${A?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${A?`
                  <div class="jira-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div style="font-weight:700;color:#f8fafc;font-size:13px;">${w(A)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${w(l)}</div>
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
                      ${E.map(g=>`
                        <option value="${g._id}" ${l===g._id.toString()?"selected":""}>
                          📁 ${w(g.title||"Untitled Job")}
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
                    Comments (${G.length})
                  </button>
                  <button type="button" class="jira-act-tab ${P==="history"?"active":""}" data-act-tab="history">
                    History (${N.length})
                  </button>
                  <button type="button" class="jira-act-tab ${P==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${v.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${P==="comments"?`
                  <div class="jira-comments-feed">
                    ${G.map(g=>`
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(g.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${w(g.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${w(g.userRole)})</span></span>
                            <span class="jira-comment-time">${ea(g.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${w(g.content)}</div>
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
                ${P==="history"?`
                  <div class="jira-history-feed">
                    ${N.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:N.map(g=>`
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(g.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${w(g.userName)}</span>
                            <span class="jira-comment-time">${ea(g.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong style="color:#cbd5e1;">${w(g.field)}</strong>:
                            ${g.from?`<span style="text-decoration:line-through;color:#ef4444;">${w(g.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${w(g.to)}</span>
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
                    `:v.map(g=>`
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(g.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${w(g.userName)} logged <strong style="color:#38bdf8;">${w(g.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${ea(g.loggedAt)}</span>
                          </div>
                          ${g.description?`<div style="font-size:12px;color:#cbd5e1;">${w(g.description)}</div>`:""}
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
                  ${da.map(g=>{let B=r.status||"To Do";return B==="In Progress"?B="Content":B==="Resolved"?B="Under Review":B==="Closed"&&(B="Ready to Leave"),`
                      <option value="${g.key}" ${B===g.key?"selected":""}>
                        ${g.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${Tt.map(g=>`
                    <option value="${g.key}" ${r.priority===g.key?"selected":""}>
                      ${g.icon} ${g.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="jira-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="jira-side-lbl" style="margin-bottom:0;">Assigned Personnel (${re.length})</span>
                  ${b?`
                    <button type="button" class="jira-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  `:""}
                </div>

                <div class="jira-assigned-chips-wrap">
                  ${re.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:re.map(g=>{var B;return`
                    <div class="jira-assignee-chip">
                      <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(g.avatar||((B=g.name)==null?void 0:B.slice(0,1))||"U").toUpperCase()}
                      </div>
                      <span class="jira-assignee-chip-name" title="${w(g.name)}">${w(g.name)}</span>
                      ${b?`
                        <button type="button" class="jira-assignee-chip-remove btn-remove-assignee" data-user-id="${g.userId}" title="Remove ${w(g.name)}">&times;</button>
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
                    ${C.map(g=>{const B=re.some(D=>D&&D.userId&&String(D.userId)===String(g._id));return`
                        <label class="jira-emp-check-item ${B?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${g._id}" ${B?"checked":""} />
                          <div class="jira-avatar" style="width:18px;height:18px;font-size:9px;">${(g.name||"U").slice(0,1).toUpperCase()}</div>
                          <span style="font-size:12px;color:#f1f5f9;flex:1;">
                            ${w(g.name)} <span style="font-size:10.5px;color:#94a3b8;">(${w(g.role)})</span>
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
                    ${(((R=r.reporter)==null?void 0:R.name)||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${w(((T=r.reporter)==null?void 0:T.name)||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${w(((H=r.reporter)==null?void 0:H.role)||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${wt.map(g=>`
                    <option value="${g.key}" ${r.category===g.key?"selected":""}>
                      ${g.icon} ${g.label}
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
                  ${E.map(g=>`
                    <option value="${g._id}" ${l===g._id.toString()?"selected":""}>
                      📁 ${w(g.title||"Untitled Job")}
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
              ${u||Z||ee?`
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
    `,c()}function c(){const a=i.querySelector("#jira-modals-root");if(!a||!j)return;const r=a.querySelector("#btn-close-jira-modal");r&&(r.onclick=_);const y=a.querySelector("#jira-detail-backdrop");y&&(y.onclick=q=>{q.target===y&&_()});const z=a.querySelector("#inp-detail-title");z&&(z.onchange=async()=>{const q=z.value.trim();if(q)try{j=await Ye(`/tickets/${j._id}`,{title:q}),await be()}catch(K){S(K.message||"Failed to update title",!0)}});const Y=a.querySelector("#btn-toggle-desc-edit");Y&&(Y.onclick=()=>{Q=!Q,ye()});const W=a.querySelector("#btn-cancel-desc");W&&(W.onclick=()=>{Q=!1,ye()});const L=a.querySelector("#btn-save-desc");L&&(L.onclick=async()=>{var K;const q=(K=a.querySelector("#inp-detail-desc"))==null?void 0:K.value;try{j=await Ye(`/tickets/${j._id}`,{description:q}),Q=!1,ye(),await be(),S("Description saved",!1)}catch(fe){S(fe.message||"Failed to save description",!0)}});const G=a.querySelector("#sel-detail-status");G&&(G.onchange=async q=>{try{const K=await Ye(`/tickets/${j._id}/status`,{status:q.target.value});j=K,ye(),await Le(),Te(),await be(),S(`Status changed to ${K.status}`,!1)}catch(K){S(K.message||"Status change failed",!0)}});const N=a.querySelector("#sel-detail-priority");N&&(N.onchange=async q=>{try{j=await Ye(`/tickets/${j._id}`,{priority:q.target.value}),ye(),await be()}catch(K){S(K.message,!0)}});const v=a.querySelector("#btn-toggle-assignee-picker"),V=a.querySelector("#jira-detail-assignee-box"),F=a.querySelector("#btn-close-detail-assignee-box"),Z=a.querySelector("#btn-save-detail-assignees");v&&V&&(v.onclick=()=>{const q=V.style.display==="none";V.style.display=q?"block":"none"}),F&&V&&(F.onclick=()=>{V.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(q=>{q.onchange=()=>{var K;(K=q.closest(".jira-emp-check-item"))==null||K.classList.toggle("selected",q.checked)}}),Z&&(Z.onclick=async()=>{const q=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(K=>K.value);try{Z.disabled=!0,j=await Ye(`/tickets/${j._id}`,{assigneeIds:q}),ye(),await be(),S("Assignees updated!",!1)}catch(K){S(K.message,!0),Z.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(q=>{q.onclick=async()=>{var Ie;const K=q.dataset.userId,we=(Array.isArray(j.assignees)&&j.assignees.length>0?j.assignees:(Ie=j.assignee)!=null&&Ie.userId?[j.assignee]:[]).filter(ze=>ze&&ze.userId&&String(ze.userId)!==String(K)).map(ze=>String(ze.userId));try{j=await Ye(`/tickets/${j._id}`,{assigneeIds:we}),ye(),await be(),S("Assignee removed",!1)}catch(ze){S(ze.message,!0)}}});const re=a.querySelector("#sel-detail-category");re&&(re.onchange=async q=>{try{j=await Ye(`/tickets/${j._id}`,{category:q.target.value}),ye(),await be()}catch(K){S(K.message,!0)}});const ee=a.querySelector("#inp-detail-duedate");ee&&(ee.onchange=async q=>{try{j=await Ye(`/tickets/${j._id}`,{dueDate:q.target.value||null}),ye(),await be()}catch(K){S(K.message,!0)}});const u=a.querySelector("#sel-detail-job");u&&(u.onchange=async q=>{try{j=await Ye(`/tickets/${j._id}`,{jobId:q.target.value||null}),ye(),await be(),S(q.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(K){S(K.message,!0)}});const b=a.querySelector("#btn-toggle-job-link"),l=a.querySelector("#jira-job-link-box");b&&l&&(b.onclick=()=>{l.style.display=l.style.display==="none"?"block":"none"});const A=a.querySelector("#btn-cancel-job-link");A&&l&&(A.onclick=()=>{l.style.display="none"});const $=a.querySelector("#btn-save-job-link");$&&($.onclick=async()=>{var K;const q=((K=a.querySelector("#inp-modal-job-select"))==null?void 0:K.value)||null;try{j=await Ye(`/tickets/${j._id}`,{jobId:q}),ye(),await be(),S(q?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(fe){S(fe.message,!0)}});const R=a.querySelector("#btn-unlink-job");R&&(R.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{j=await Ye(`/tickets/${j._id}`,{jobId:null}),ye(),await be(),S("Job unlinked",!1)}catch(q){S(q.message,!0)}});const T=a.querySelector("#inp-detail-esthours");T&&(T.onchange=async q=>{try{j=await Ye(`/tickets/${j._id}`,{estimatedHours:Number(q.target.value)||0})}catch(K){S(K.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(q=>{q.onchange=async()=>{const K=q.dataset.subtaskId;try{j=await Ye(`/tickets/${j._id}/subtasks/${K}`,{completed:q.checked}),ye(),await be()}catch(fe){S(fe.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(q=>{q.onclick=async()=>{const K=q.dataset.subtaskId;try{j=await Je(`/tickets/${j._id}/subtasks/${K}`),ye(),await be()}catch(fe){S(fe.message,!0)}}});const H=a.querySelector("#inp-new-subtask"),g=a.querySelector("#btn-add-subtask"),B=async()=>{const q=H==null?void 0:H.value.trim();if(q)try{j=await _e(`/tickets/${j._id}/subtasks`,{title:q}),ye(),await be()}catch(K){S(K.message,!0)}};g&&(g.onclick=B),H&&(H.onkeydown=q=>{q.key==="Enter"&&(q.preventDefault(),B())});const D=a.querySelector("#inp-detail-att-upload");D&&(D.onchange=async q=>{const K=Array.from(q.target.files);if(!K.length)return;S("Uploading attachment(s)...",!1);const fe=[];for(const we of K){const Ie=new FileReader;await new Promise(ze=>{Ie.onload=async()=>{try{const ct=Ie.result.split(",")[1],ot=await _e("/upload",{files:[{name:we.name,data:ct,size:we.size,type:we.type}]});ot&&ot.files&&ot.files[0]&&fe.push({name:ot.files[0].name||we.name,url:ot.files[0].url,size:we.size,type:we.type})}catch(ct){console.warn("Upload error for file:",we.name,ct)}ze()},Ie.readAsDataURL(we)})}if(fe.length)try{j=await _e(`/tickets/${j._id}/attachments`,{attachments:fe}),ye(),S("File(s) attached successfully",!1)}catch(we){S(we.message||"Failed to attach file(s)",!0)}}),a.querySelectorAll(".btn-del-att").forEach(q=>{q.onclick=async()=>{const K=q.dataset.attId;try{j=await Je(`/tickets/${j._id}/attachments/${K}`),ye()}catch(fe){S(fe.message,!0)}}}),a.querySelectorAll(".jira-act-tab").forEach(q=>{q.onclick=()=>{P=q.dataset.actTab,ye()}});const ue=a.querySelector("#inp-new-comment"),ae=a.querySelector("#btn-submit-comment");ae&&ue&&(ae.onclick=async()=>{const q=ue.value.trim();if(q)try{ae.disabled=!0,ae.textContent="Saving...",j=await _e(`/tickets/${j._id}/comments`,{content:q}),ye(),S("Comment added",!1)}catch(K){S(K.message||"Failed to add comment",!0)}finally{ae.disabled=!1}});const ge=a.querySelector("#btn-open-link-dialog"),te=a.querySelector("#jira-link-box"),U=a.querySelector("#btn-cancel-link"),J=a.querySelector("#btn-submit-link"),oe=a.querySelector("#inp-link-target"),he=a.querySelector("#sel-link-rel");ge&&te&&(ge.onclick=()=>{te.style.display="block"}),U&&te&&(U.onclick=()=>{te.style.display="none"}),J&&te&&(J.onclick=async()=>{const q=oe==null?void 0:oe.value.trim(),K=(he==null?void 0:he.value)||"relates to";if(q)try{J.disabled=!0,j=await _e(`/tickets/${j._id}/links`,{targetTicketId:q,relationship:K}),ye(),S(`Linked with ${q}`,!1)}catch(fe){S(fe.message||"Failed to link ticket",!0)}finally{J.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(q=>{q.onclick=async()=>{const K=q.dataset.linkId;try{j=await Je(`/tickets/${j._id}/links/${K}`),ye()}catch(fe){S(fe.message,!0)}}});const Se=a.querySelector("#btn-open-worklog-dialog"),Ce=a.querySelector("#jira-worklog-box"),Ne=a.querySelector("#btn-cancel-worklog"),ce=a.querySelector("#btn-submit-worklog"),me=a.querySelector("#inp-worklog-time"),je=a.querySelector("#inp-worklog-desc");Se&&Ce&&(Se.onclick=()=>{Ce.style.display="block"}),Ne&&Ce&&(Ne.onclick=()=>{Ce.style.display="none"}),ce&&Ce&&(ce.onclick=async()=>{const q=me==null?void 0:me.value.trim(),K=je==null?void 0:je.value.trim();if(!q){S("Enter time spent (e.g. 2h 30m)",!0);return}try{ce.disabled=!0,j=await _e(`/tickets/${j._id}/worklogs`,{timeSpent:q,description:K}),ye(),S("Work logged",!1)}catch(fe){S(fe.message||"Failed to log work",!0)}finally{ce.disabled=!1}});const Pe=a.querySelector("#btn-delete-ticket");Pe&&(Pe.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${j.ticketId}?`))try{Pe.disabled=!0,await Je(`/tickets/${j._id}`),S(`Ticket ${j.ticketId} deleted`,!1),_(),await Le(),Te(),await be()}catch(q){S(q.message||"Failed to delete ticket",!0),Pe.disabled=!1}})}function _(){j=null,Q=!1;const a=i.querySelector("#jira-modals-root");a&&(a.innerHTML="")}function I(a=null){const r=i.querySelector("#jira-modals-root");if(!r)return;const y=a||(x.jobId&&x.jobId!=="all"?x.jobId:null);r.innerHTML=`
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
                  ${wt.map(F=>`<option value="${F.key}">${F.icon} ${F.label}</option>`).join("")}
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
                  ${C.map(F=>{const Z=o&&String(o._id||o.id)===String(F._id);return`
                      <label class="jira-emp-check-item ${Z?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${F._id}" ${Z?"checked":""} />
                        <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(F.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span style="font-size:12px;color:#f1f5f9;flex:1;">
                          ${w(F.name)} <span style="font-size:10.5px;color:#94a3b8;">(${w(F.role)})${Z?" — (You)":""}</span>
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
                  ${E.map(F=>`
                    <option value="${F._id}" ${y&&String(y)===String(F._id)?"selected":""}>
                      📁 ${w(F.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>
            </div>
          </div>

          <div class="jira-modal-footer">
            <button type="button" class="btn-jira-secondary" id="btn-cancel-create-ticket">Cancel</button>
            <button type="button" class="btn-jira-primary" id="btn-submit-create-ticket">Create Ticket 🚀</button>
          </div>
        </div>
      </div>
    `;const z=()=>{r.querySelectorAll(".jira-emp-check-item").forEach(F=>{const Z=F.querySelector(".chk-create-emp");F.classList.toggle("selected",!!(Z!=null&&Z.checked))})};r.querySelectorAll(".chk-create-emp").forEach(F=>{F.onchange=z});const Y=r.querySelector("#btn-create-assign-self");Y&&o&&(Y.onclick=()=>{const F=String(o._id||o.id);r.querySelectorAll(".chk-create-emp").forEach(Z=>{Z.value===F&&(Z.checked=!0)}),z()});const W=r.querySelector("#btn-create-clear-assign");W&&(W.onclick=()=>{r.querySelectorAll(".chk-create-emp").forEach(F=>{F.checked=!1}),z()});const L=()=>{r.innerHTML=""},G=r.querySelector("#btn-close-create-modal");G&&(G.onclick=L);const N=r.querySelector("#btn-cancel-create-ticket");N&&(N.onclick=L);const v=r.querySelector("#jira-create-backdrop");v&&(v.onclick=F=>{F.target===v&&L()});const V=r.querySelector("#btn-submit-create-ticket");V&&(V.onclick=async()=>{var $,R,T,H,g,B;const F=($=r.querySelector("#create-ticket-title"))==null?void 0:$.value.trim(),Z=(R=r.querySelector("#create-ticket-desc"))==null?void 0:R.value.trim(),re=((T=r.querySelector("#create-ticket-cat"))==null?void 0:T.value)||"Task",ee=((H=r.querySelector("#create-ticket-pri"))==null?void 0:H.value)||"Medium",b=Array.from(r.querySelectorAll(".chk-create-emp:checked")).map(D=>D.value),l=((g=r.querySelector("#create-ticket-duedate"))==null?void 0:g.value)||null,A=((B=r.querySelector("#create-ticket-job"))==null?void 0:B.value)||null;if(!F){S("Ticket summary / title is required",!0);return}try{V.disabled=!0,V.textContent="Creating...";const D=await _e("/tickets",{title:F,description:Z,category:re,priority:ee,assigneeIds:b,assigneeId:b[0]||null,dueDate:l,jobId:A});S(`Ticket ${D.ticketId} created! 🎫`,!1),L(),await Le(),Te(),await be(),et(D._id)}catch(D){S(D.message||"Could not create ticket",!0),V.disabled=!1,V.textContent="Create Ticket 🚀"}})}i._openCreateTicketModal=I,i._openTicketDetailModal=et,i._setJobFilter=async a=>{x.jobId=a||"all";const r=i.querySelector("#jira-filter-job");r&&(r.value=x.jobId),qe(),await be()}}export{ei as a,Za as b,Xa as i};
