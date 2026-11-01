var fa=Object.defineProperty;var ma=(r,t,e)=>t in r?fa(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var ye=(r,t,e)=>ma(r,typeof t!="symbol"?t+"":t,e);import{c as Ue,h as I,e as T,n as ha,j as et,o as Bt,k as Ht,g as _e}from"./api-BLZ2PdTU.js";const sa={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function va(){try{const r=localStorage.getItem("ci360_planner_settings");if(r)return Object.assign({},sa,JSON.parse(r))}catch{}return Object.assign({},sa)}function xa(r){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(r))}catch{}}function Ye(){const r=new Date,t=r.getFullYear(),e=String(r.getMonth()+1).padStart(2,"0"),o=String(r.getDate()).padStart(2,"0");return`${t}-${e}-${o}`}function Ft(r,t){const e=new Date(r+"T00:00:00");e.setDate(e.getDate()+t);const o=e.getFullYear(),i=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${o}-${i}-${n}`}function yt(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function it(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function la(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function Jt(r,t=1){const e=new Date(r+"T00:00:00"),o=e.getDay(),i=(o<t?7:0)+o-t,n=new Date(e);n.setDate(e.getDate()-i);const p=[];for(let a=0;a<7;a++){const h=new Date(n);h.setDate(n.getDate()+a);const C=h.getFullYear(),M=String(h.getMonth()+1).padStart(2,"0"),j=String(h.getDate()).padStart(2,"0");p.push(`${C}-${M}-${j}`)}return p}function ya(){try{const r=window.AudioContext||window.webkitAudioContext;if(!r)return;const t=new r,e=t.currentTime,o=t.createOscillator(),i=t.createGain();o.type="sine",o.frequency.setValueAtTime(523.25,e),o.frequency.exponentialRampToValueAtTime(783.99,e+.15),i.gain.setValueAtTime(.2,e),i.gain.exponentialRampToValueAtTime(.001,e+.35),o.connect(i),i.connect(t.destination),o.start(e),o.stop(e+.35)}catch{}}function Va(r,t={}){const{userRole:e="employee",currentUser:o=null,onNavigate:i=null}=t,n=e==="superadmin"||e==="admin";let p=va(),a={selectedDate:Ye(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};wa(),h();async function h(){a.loading=!0,C();try{const s=[Ue("/tasks")];n&&s.push(Ue("/personnel").catch(()=>[]));const[x,$]=await Promise.all(s);a.tasks=Array.isArray(x)?x:[],$&&(a.personnelList=Array.isArray($)?$:[])}catch(s){I("Failed to load planner tasks: "+s.message,!0)}finally{a.loading=!1,Q()}}function C(){r.innerHTML=`
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
    `}function M(s){return a.tasks.filter(x=>{var w;if(x.isDeleted===!0)return!1;if(n&&a.selectedPersonnelId!=="all"){const y=((w=x.personnelId)==null?void 0:w._id)||x.personnelId;if(String(y)!==String(a.selectedPersonnelId))return!1}const $=x.dateStr||(x.dueDate?new Date(x.dueDate).toISOString().slice(0,10):"");return $?$===s:s===Ye()})}function j(s,x){if(s.status==="Completed")return!1;const $=s.dateStr||(s.dueDate?new Date(s.dueDate).toISOString().slice(0,10):"");return $?$<x:!1}function E(s,x){const $=s.length,w=s.filter(ee=>ee.status==="Completed").length,y=s.filter(ee=>ee.status==="In Progress").length,z=s.filter(ee=>ee.status==="Pending"||ee.status==="Todo").length,Z=s.filter(ee=>j(ee,x)).length,ne=$>0?Math.round(w/$*100):0;return{total:$,completed:w,inProgress:y,pending:z,overdue:Z,percent:ne}}function Q(){const s=Ye(),x=a.selectedDate===s,$=M(a.selectedDate),w=E($,s);r.innerHTML=`
      <div class="ci360-planner-wrap ${p.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${it(a.selectedDate)}</span>
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
              <span class="date-text" id="displayDateLabel">${yt(a.selectedDate)}</span>
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
          ${H($,w)}
        </main>

      </div>
    `,Ee(),vt()}function H(s,x){return a.viewMode==="weekly"?ht():a.viewMode==="report"?ct():he(s,x)}function he(s,x){const $=Ye();let w=s;if(a.filterStatus==="pending"?w=w.filter(y=>y.status==="Pending"||y.status==="Todo"):a.filterStatus==="in_progress"?w=w.filter(y=>y.status==="In Progress"):a.filterStatus==="completed"?w=w.filter(y=>y.status==="Completed"):a.filterStatus==="overdue"&&(w=w.filter(y=>j(y,$))),a.searchQuery){const y=a.searchQuery.toLowerCase();w=w.filter(z=>(z.title||"").toLowerCase().includes(y)||(z.description||"").toLowerCase().includes(y)||(z.category||"").toLowerCase().includes(y))}return w.sort((y,z)=>{if(y.status==="Completed"&&z.status!=="Completed")return 1;if(y.status!=="Completed"&&z.status==="Completed")return-1;const Z={Urgent:0,High:1,Medium:2,Low:3};return(Z[y.priority]||2)-(Z[z.priority]||2)}),`
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
            <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${it(a.selectedDate)}... (Press Enter to save)">
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
          ${w.length===0?fe():`
            <div class="ci360-task-list">
              ${w.map(y=>Be(y,$)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function fe(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${it(a.selectedDate)}</h3>
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
    `}function Be(s,x){var Z,ne,ee,L;const $=s.status==="Completed",w=j(s,x),y=`pri-${(s.priority||"medium").toLowerCase()}`,z=`status-${(s.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${$?"is-completed":""} ${w?"is-overdue":""}" data-id="${s._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${$?"checked":""}" data-action="toggle" data-id="${s._id}" title="${$?"Reopen task":"Mark as done"}">
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
            <span class="ci360-badge ${z}">
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
            ${n&&((Z=s.personnelId)!=null&&Z.name||(ne=s.userId)!=null&&ne.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${T(((ee=s.personnelId)==null?void 0:ee.name)||((L=s.userId)==null?void 0:L.name))}
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
    `}function ht(){const s=Jt(a.selectedDate,p.weekStartsOn),x=it(s[0]),$=it(s[6]),w=Ye();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${x} – ${$}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${s.map(y=>{const z=y===w,Z=y===a.selectedDate,ne=M(y),ee=E(ne,w);return`
              <div class="ci360-day-column ${z?"is-today":""} ${Z?"is-selected":""}" data-date="${y}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${y}">
                  <div class="day-name">${la(y)}</div>
                  <div class="day-number">${new Date(y+"T00:00:00").getDate()}</div>
                  ${z?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${ee.completed}/${ee.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${ee.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${ne.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:ne.map(L=>`
                    <div class="ci360-mini-task-card ${L.status==="Completed"?"done":""}" data-id="${L._id}">
                      <button type="button" class="mini-check ${L.status==="Completed"?"checked":""}" data-action="toggle" data-id="${L._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${L._id}">
                        <div class="mini-title">${T(L.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(L.priority||"medium").toLowerCase()}">${L.priority||"Med"}</span>
                          ${L.dueTime?`<span class="mini-time">${T(L.dueTime)}</span>`:""}
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
    `}function ct(){const s=Jt(a.selectedDate,p.weekStartsOn),x=yt(s[0]),$=yt(s[6]),w=Ye(),y=a.tasks.filter(O=>{if(O.isDeleted===!0)return!1;const F=O.dateStr||(O.dueDate?new Date(O.dueDate).toISOString().slice(0,10):"");return s.includes(F)}),z=y.length,Z=y.filter(O=>O.status==="Completed").length,ne=y.filter(O=>O.status==="In Progress").length,ee=z>0?Math.round(Z/z*100):0,L={Urgent:0,High:0,Medium:0,Low:0};return y.forEach(O=>{const F=O.priority||"Medium";L[F]!==void 0&&L[F]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${x} – ${$}</div>
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
            <span class="value" style="font-size:28px">${z}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${Z}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${ne}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${ee}%</span>
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
                ${s.map(O=>{const F=M(O),v=E(F,w);return`
                    <tr>
                      <td><strong>${la(O)}</strong></td>
                      <td>${it(O)}</td>
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
    `}function Ee(){const s=document.getElementById("btnViewDaily"),x=document.getElementById("btnViewWeekly"),$=document.getElementById("btnViewReport");s&&(s.onclick=()=>{a.viewMode="daily",Q()}),x&&(x.onclick=()=>{a.viewMode="weekly",Q()}),$&&($.onclick=()=>{a.viewMode="report",Q()});const w=document.getElementById("btnPrevDay"),y=document.getElementById("btnNextDay"),z=document.getElementById("btnJumpToday"),Z=document.getElementById("hiddenDateInput"),ne=document.getElementById("datePickerBadge");w&&(w.onclick=()=>{a.selectedDate=Ft(a.selectedDate,-1),Q()}),y&&(y.onclick=()=>{a.selectedDate=Ft(a.selectedDate,1),Q()}),z&&(z.onclick=()=>{a.selectedDate=Ye(),Q()}),ne&&Z&&(ne.onclick=()=>{try{typeof Z.showPicker=="function"?Z.showPicker():Z.focus()}catch{Z.focus()}},Z.onchange=ce=>{ce.target.value&&(a.selectedDate=ce.target.value,Q())});const ee=document.getElementById("admTeamSelect");ee&&(ee.onchange=ce=>{a.selectedPersonnelId=ce.target.value,Q()});const L=document.getElementById("btnOpenAddTaskModal");L&&(L.onclick=()=>Ae());const O=document.getElementById("btnPlannerActionsMenu"),F=document.getElementById("plannerActionsDropdown");O&&F&&(O.onclick=ce=>{ce.stopPropagation(),F.classList.toggle("hidden")},document.addEventListener("click",ce=>{!F.contains(ce.target)&&ce.target!==O&&F.classList.add("hidden")}));const v=document.getElementById("btnActionImport");v&&(v.onclick=()=>{F==null||F.classList.add("hidden"),Qe()});const se=document.getElementById("btnActionExportPng");se&&(se.onclick=()=>{F==null||F.classList.add("hidden"),Je()});const de=document.getElementById("btnActionExportPdf");de&&(de.onclick=()=>{F==null||F.classList.add("hidden"),pt()});const me=document.getElementById("btnActionBackup");me&&(me.onclick=()=>{F==null||F.classList.add("hidden"),gt()});const le=document.getElementById("btnActionSettings");le&&(le.onclick=()=>{F==null||F.classList.add("hidden"),ut()})}function vt(s){if(a.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(L=>{L.onclick=()=>{a.filterStatus=L.dataset.f,Q()}});const x=document.getElementById("plannerTaskSearchInp");x&&(x.oninput=L=>{a.searchQuery=L.target.value,Q()});const $=document.getElementById("btnClearSearch");$&&($.onclick=()=>{a.searchQuery="",Q()});const w=document.getElementById("quickAddTitleInp"),y=document.getElementById("quickAddPriority"),z=document.getElementById("quickAddCategory"),Z=document.getElementById("btnQuickAddSubmit"),ne=async()=>{const L=((w==null?void 0:w.value)||"").trim();if(!L){I("Please enter a task title",!0),w==null||w.focus();return}try{const O={title:L,dateStr:a.selectedDate,priority:(y==null?void 0:y.value)||p.defaultPriority,category:(z==null?void 0:z.value)||"General",status:"Pending"};n&&a.selectedPersonnelId!=="all"&&(O.personnelId=a.selectedPersonnelId);const F=await _e("/tasks",O);a.tasks.unshift(F),I("Task added to today's focus! ✨"),w&&(w.value="",w.focus()),Q()}catch(O){I(O.message,!0)}};Z&&(Z.onclick=ne),w&&(w.onkeydown=L=>{L.key==="Enter"&&ne()});const ee=document.getElementById("btnEmptyStateImport");ee&&(ee.onclick=()=>Qe())}if(a.viewMode==="weekly"){const x=document.getElementById("btnPrevWeek"),$=document.getElementById("btnNextWeek"),w=document.getElementById("btnThisWeek");x&&(x.onclick=()=>{a.selectedDate=Ft(a.selectedDate,-7),Q()}),$&&($.onclick=()=>{a.selectedDate=Ft(a.selectedDate,7),Q()}),w&&(w.onclick=()=>{a.selectedDate=Ye(),Q()}),document.querySelectorAll(".day-col-header").forEach(y=>{y.onclick=()=>{a.selectedDate=y.dataset.date,a.viewMode="daily",Q()}}),document.querySelectorAll('[data-action="add-day"]').forEach(y=>{y.onclick=()=>{Ae(null,y.dataset.date)}})}if(a.viewMode==="report"){const x=document.getElementById("btnDownloadWeeklyPdf");x&&(x.onclick=pt)}r.querySelectorAll('[data-action="toggle"]').forEach(x=>{x.onclick=async $=>{$.stopPropagation();const w=x.dataset.id;await We(w)}}),r.querySelectorAll('[data-action="edit"]').forEach(x=>{x.onclick=$=>{$.stopPropagation();const w=x.dataset.id,y=a.tasks.find(z=>z._id===w);y&&Ae(y)}}),r.querySelectorAll('[data-action="delete"]').forEach(x=>{x.onclick=async $=>{$.stopPropagation();const w=x.dataset.id;await kt(w)}})}async function We(s){const x=a.tasks.find(w=>w._id===s);if(!x)return;const $=x.status!=="Completed";try{const w=await ha(`/tasks/${s}/toggle`,{}),y=a.tasks.findIndex(z=>z._id===s);y!==-1&&(a.tasks[y]=w),$?(p.soundEnabled&&ya(),I("Task marked as completed! 🎉")):I("Task reopened as pending."),Q()}catch(w){I(w.message,!0)}}async function kt(s){const x=a.tasks.find($=>$._id===s);if(x&&confirm(`Are you sure you want to remove "${x.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await et(`/tasks/${s}`),a.tasks=a.tasks.filter($=>$._id!==s),I("Task removed from planner (safely stored in database archive)"),Q()}catch($){I($.message,!0)}}function Ae(s=null,x=null){const $=!!s,w=s?s.dateStr||(s.dueDate?new Date(s.dueDate).toISOString().slice(0,10):a.selectedDate):x||a.selectedDate,y=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${$?"Edit Task":"Add New Task"}</h3>
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
                ${a.personnelList.map(O=>{var v;const F=((v=s==null?void 0:s.personnelId)==null?void 0:v._id)===O._id||(s==null?void 0:s.personnelId)===O._id;return`<option value="${O._id}" ${F?"selected":""}>${T(O.name)} (${T(O.department||O.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
            <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
              ${$?"Save Changes":"Create Task"}
            </button>
          </div>
        </form>
      </div>
    `,z=Bt(y),Z=z.querySelector("#taskForm"),ne=z.querySelector("#btnModalClose"),ee=z.querySelector("#btnCancelModal"),L=()=>z.remove();ne&&(ne.onclick=L),ee&&(ee.onclick=L),Z.onsubmit=async O=>{var k;O.preventDefault();const F=z.querySelector("#taskTitle").value.trim(),v=z.querySelector("#taskDesc").value.trim(),se=z.querySelector("#taskDate").value,de=z.querySelector("#taskStartTime").value.trim(),me=z.querySelector("#taskDueTime").value.trim(),le=z.querySelector("#taskPriority").value,ce=z.querySelector("#taskStatus").value,c=z.querySelector("#taskCategory").value.trim()||"General";if(!F){I("Task title is required",!0);return}const u={title:F,description:v,dateStr:se,startTime:de,dueTime:me,priority:le,status:ce,category:c};if(n){const m=(k=z.querySelector("#taskAssignee"))==null?void 0:k.value;m==="all"?(u.assignAll=!0,u.personnelId="all"):m&&(u.personnelId=m)}const l=z.querySelector("#btnSaveTask");l.disabled=!0,l.textContent="Saving...";try{if($){const m=await Ht(`/tasks/${s._id}`,u),P=a.tasks.findIndex(S=>S._id===s._id);P!==-1&&(a.tasks[P]=m),I("Task updated successfully! ✍️")}else{const m=await _e("/tasks",u);Array.isArray(m.tasks)?m.tasks.forEach(P=>a.tasks.unshift(P)):a.tasks.unshift(m),I("Task created successfully! ✨")}L(),Q()}catch(m){I(m.message,!0),l.disabled=!1,l.textContent=$?"Save Changes":"Create Task"}}}function Qe(){let s=[];const x=`
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
    `,$=Bt(x),w=()=>$.remove();$.querySelector("#btnImportClose").onclick=w,$.querySelector("#btnCancelImport").onclick=w;const y=$.querySelector("#importTextarea"),z=$.querySelector("#importFileInput"),Z=$.querySelector("#importDropzone"),ne=$.querySelector("#previewListArea"),ee=$.querySelector("#previewCountLabel"),L=$.querySelector("#btnConfirmImport"),O=$.querySelector("#importFileInfo");function F(se){if(!se)return[];const de=se.split(/\r?\n/),me=[];for(let le of de)le=le.trim(),le&&(le=le.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),le=le.replace(/^[-*•]\s+/,""),le=le.replace(/^\d+[\.\)]\s+/,""),le=le.trim(),le&&me.push(le));return me}function v(){const se=y.value,de=F(se),me=$.querySelector("#importTargetDate").value,le=M(me),ce=new Set(le.map(c=>(c.title||"").trim().toLowerCase()));s=[];for(const c of de){const u=ce.has(c.toLowerCase());s.push({title:c,isDuplicate:u})}if(ee.textContent=`Preview (${s.length} ${s.length===1?"task":"tasks"} found)`,L.disabled=s.length===0,L.textContent=`Import ${s.length} ${s.length===1?"Task":"Tasks"}`,s.length===0){ne.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}ne.innerHTML=s.map((c,u)=>`
        <div class="preview-item ${c.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${u+1}.</span>
          <span class="preview-title">${T(c.title)}</span>
          ${c.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}y.oninput=v,Z.onclick=()=>z.click(),z.onchange=se=>{const de=se.target.files[0];if(!de)return;O.textContent=`File selected: ${de.name} (${Math.round(de.size/1024)} KB)`;const me=new FileReader;me.onload=le=>{y.value=le.target.result,v()},me.readAsText(de)},Z.ondragover=se=>{se.preventDefault(),Z.classList.add("dragover")},Z.ondragleave=()=>Z.classList.remove("dragover"),Z.ondrop=se=>{se.preventDefault(),Z.classList.remove("dragover");const de=se.dataTransfer.files[0];if(de&&(de.type==="text/plain"||de.name.endsWith(".txt"))){O.textContent=`File dropped: ${de.name}`;const me=new FileReader;me.onload=le=>{y.value=le.target.result,v()},me.readAsText(de)}else I("Please drop a valid .txt plain-text file",!0)},L.onclick=async()=>{if(s.length===0)return;L.disabled=!0,L.textContent="Importing...";const se=$.querySelector("#importTargetDate").value,de=$.querySelector("#importPriority").value,me=$.querySelector("#importCategory").value.trim()||"General",le={date:se,tasks:s.map(ce=>({title:ce.title,priority:de,category:me,status:"Pending"}))};n&&a.selectedPersonnelId!=="all"&&(le.personnelId=a.selectedPersonnelId);try{const ce=await _e("/tasks/bulk-import",le);Array.isArray(ce.tasks)&&ce.tasks.forEach(c=>a.tasks.unshift(c)),I(`Imported ${ce.importedCount} tasks successfully! (${ce.skippedCount} skipped duplicates)`),w(),a.selectedDate=se,Q()}catch(ce){I(ce.message,!0),L.disabled=!1,L.textContent="Retry Import"}}}async function Je(){const s=M(a.selectedDate),x=E(s,Ye()),$=yt(a.selectedDate),w=2,y=800,z=160,Z=90,ne=65,ee=70,L=Math.max(120,s.length*ne),O=z+Z+L+ee,F=document.createElement("canvas");F.width=y*w,F.height=O*w;const v=F.getContext("2d");v.scale(w,w);const se=document.documentElement.getAttribute("data-theme")==="dark",de=se?"#0F172A":"#F8FAFC",me=se?"#1E293B":"#FFFFFF",le=se?"#334155":"#E2E8F0",ce=se?"#F8FAFC":"#0F172A",c=se?"#94A3B8":"#475569",u="#4F46E5",l="#10B981",k="#F59E0B";v.fillStyle=de,v.fillRect(0,0,y,O),v.fillStyle=me,Xe(v,24,20,y-48,z-30,16),v.fill(),v.strokeStyle=le,v.lineWidth=1,v.stroke(),v.fillStyle=u,v.font="bold 12px Inter, sans-serif",v.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),v.fillStyle=ce,v.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',v.fillText($,44,86),v.fillStyle=c,v.font="13px Inter, sans-serif",v.fillText(`Planned focus list · ${x.completed} of ${x.total} tasks completed (${x.percent}%)`,44,114);const m=z+6;v.fillStyle=me,Xe(v,24,m,y-48,Z-16,12),v.fill(),v.stroke();const P=[{label:"TOTAL TASKS",val:String(x.total),color:ce},{label:"COMPLETED",val:String(x.completed),color:l},{label:"IN PROGRESS",val:String(x.inProgress),color:k},{label:"PENDING",val:String(x.pending),color:c},{label:"PROGRESS",val:`${x.percent}%`,color:u}],S=(y-48)/P.length;P.forEach((N,A)=>{const oe=24+A*S+20;v.fillStyle=N.color,v.font="bold 20px Inter, sans-serif",v.fillText(N.val,oe,m+36),v.fillStyle=c,v.font="10px Inter, sans-serif",v.fillText(N.label,oe,m+54)});const R=m+Z;v.fillStyle=me,Xe(v,24,R,y-48,L+10,16),v.fill(),v.stroke(),s.length===0?(v.fillStyle=c,v.font="14px Inter, sans-serif",v.textAlign="center",v.fillText("No scheduled tasks recorded for this date.",y/2,R+60),v.textAlign="left"):s.forEach((N,A)=>{const oe=R+16+A*ne,J=N.status==="Completed";v.beginPath(),v.arc(48,oe+14,10,0,Math.PI*2),J?(v.fillStyle=l,v.fill(),v.strokeStyle="#FFFFFF",v.lineWidth=2,v.beginPath(),v.moveTo(44,oe+14),v.lineTo(47,oe+17),v.lineTo(52,oe+11),v.stroke()):(v.strokeStyle=le,v.lineWidth=2,v.stroke()),v.fillStyle=J?c:ce,v.font=`${J?"normal":"500"} 14px Inter, sans-serif`;const ie=N.title.length>55?N.title.slice(0,52)+"...":N.title;if(v.fillText(ie,70,oe+18),J){const ue=v.measureText(ie);v.strokeStyle=c,v.lineWidth=1.2,v.beginPath(),v.moveTo(70,oe+14),v.lineTo(70+ue.width,oe+14),v.stroke()}const V=N.priority||"Medium";let q="#E2E8F0",W="#334155";V==="Urgent"?(q="#FEE2E2",W="#DC2626"):V==="High"?(q="#FEF3C7",W="#D97706"):V==="Low"&&(q="#ECFDF5",W="#059669"),v.fillStyle=q,Xe(v,y-150,oe+4,60,20,10),v.fill(),v.fillStyle=W,v.font="bold 10px Inter, sans-serif",v.fillText(V,y-138,oe+18);const X=N.dueTime?`🕒 ${N.dueTime}`:N.category||"General";v.fillStyle=c,v.font="11px Inter, sans-serif",v.fillText(X,70,oe+34),A<s.length-1&&(v.strokeStyle=le,v.lineWidth=.6,v.beginPath(),v.moveTo(40,oe+48),v.lineTo(y-40,oe+48),v.stroke())});const B=O-35;v.fillStyle=c,v.font="11px Inter, sans-serif",v.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,B);try{const N=F.toDataURL("image/png"),A=document.createElement("a");A.href=N,A.download=`ci360-daily-planner-${a.selectedDate}.png`,document.body.appendChild(A),A.click(),A.remove(),I("Daily Planner image exported! 🖼️")}catch(N){I("Failed to export image: "+N.message,!0)}}function Xe(s,x,$,w,y,z){s.beginPath(),s.moveTo(x+z,$),s.lineTo(x+w-z,$),s.quadraticCurveTo(x+w,$,x+w,$+z),s.lineTo(x+w,$+y-z),s.quadraticCurveTo(x+w,$+y,x+w-z,$+y),s.lineTo(x+z,$+y),s.quadraticCurveTo(x,$+y,x,$+y-z),s.lineTo(x,$+z),s.quadraticCurveTo(x,$,x+z,$),s.closePath()}function pt(){const s=Jt(a.selectedDate,p.weekStartsOn),x=yt(s[0]),$=yt(s[6]);Ye();const w=a.tasks.filter(L=>{if(L.isDeleted===!0)return!1;const O=L.dateStr||(L.dueDate?new Date(L.dueDate).toISOString().slice(0,10):"");return s.includes(O)}),y=w.length,z=w.filter(L=>L.status==="Completed").length,Z=y>0?Math.round(z/y*100):0,ne=window.open("","_blank");if(!ne){I("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const ee=`
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
            <div class="period">${x} – ${$}</div>
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
            <div class="kpi-num" style="color:#10b981">${z}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${y-z}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${Z}%</div>
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
            ${s.map(L=>{const O=M(L);return O.length===0?`<tr><td><strong>${it(L)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:O.map(F=>`
                <tr>
                  <td><strong>${it(L)}</strong></td>
                  <td>${T(F.title)}</td>
                  <td><span class="badge badge-${(F.priority||"medium").toLowerCase().slice(0,3)}">${F.priority||"Medium"}</span></td>
                  <td>${T(F.category||"General")}</td>
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
    `;ne.document.write(ee),ne.document.close(),I("Weekly PDF report generated for printing! 📄")}function gt(){const x=Bt(`
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
    `),$=()=>x.remove();x.querySelector("#btnBackupClose").onclick=$;const w=x.querySelector("#btnDownloadBackupJson");w.onclick=async()=>{w.disabled=!0,w.textContent="Generating backup...";try{const L=await Ue("/tasks/backup"),O=new Blob([JSON.stringify(L,null,2)],{type:"application/json"}),F=URL.createObjectURL(O),v=document.createElement("a");v.href=F,v.download=`ci360-planner-backup-${Ye()}.json`,document.body.appendChild(v),v.click(),v.remove(),I("Planner backup downloaded successfully! 💾")}catch(L){I("Backup export failed: "+L.message,!0)}finally{w.disabled=!1,w.textContent="Download JSON Backup"}};const y=x.querySelector("#restoreFileInput"),z=x.querySelector("#restorePreviewArea"),Z=x.querySelector("#restoreCountText"),ne=x.querySelector("#btnExecuteRestore");let ee=null;y.onchange=L=>{const O=L.target.files[0];if(!O)return;const F=new FileReader;F.onload=v=>{try{const se=JSON.parse(v.target.result),de=Array.isArray(se.tasks)?se.tasks:Array.isArray(se)?se:null;if(!de||de.length===0){I("Invalid backup file: No tasks found",!0);return}ee=de,z.style.display="block",Z.textContent=`Valid backup: ${de.length} tasks ready to restore.`,ne.disabled=!1}catch(se){I("Error parsing JSON backup file: "+se.message,!0),z.style.display="none",ne.disabled=!0}},F.readAsText(O)},ne.onclick=async()=>{var O;if(!ee||ee.length===0)return;ne.disabled=!0,ne.textContent="Restoring...";const L=((O=x.querySelector('input[name="restoreMode"]:checked'))==null?void 0:O.value)||"merge";try{const F=await _e("/tasks/restore",{tasks:ee,mode:L});I(`Restored ${F.restoredCount} tasks! (${F.skippedCount} skipped) ✨`),$(),await h()}catch(F){I("Restore failed: "+F.message,!0),ne.disabled=!1,ne.textContent="Retry Restore"}}}function ut(){const s=`
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
    `,x=Bt(s),$=()=>x.remove();x.querySelector("#btnSettingsClose").onclick=$,x.querySelector("#btnCancelSettings").onclick=$,x.querySelector("#settingsForm").onsubmit=w=>{w.preventDefault(),p.displayName=x.querySelector("#setDisplayName").value.trim()||"Daily Planner",p.weekStartsOn=Number(x.querySelector("#setWeekStart").value),p.defaultPriority=x.querySelector("#setDefaultPriority").value,p.density=x.querySelector("#setDensity").value,p.soundEnabled=x.querySelector("#setSound").checked,xa(p),I("Planner preferences saved! ⚙️"),$(),Q()}}}function wa(){if(document.getElementById("ci360-planner-styles"))return;const r=document.createElement("style");r.id="ci360-planner-styles",r.textContent=`
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
  `,document.head.appendChild(r)}function ka(r){return r!==null?{comment:r,variations:[]}:{variations:[]}}function $a(r,t,e,o,i){const n={move:r,variations:i};return t&&(n.suffix=t),e&&(n.nag=e),o!==null&&(n.comment=o),n}function Sa(...r){const[t,...e]=r;let o=t;for(const i of e)i!==null&&(o.variations=[i,...i.variations],i.variations=[],o=i);return t}function _a(r,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const o=e.variations[0];if(!o){e.comment=t.marker.comment;break}e=o}}return{headers:r,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ca(r,t){function e(){this.constructor=r}e.prototype=t.prototype,r.prototype=new e}function wt(r,t,e,o){var i=Error.call(this,r);return Object.setPrototypeOf&&Object.setPrototypeOf(i,wt.prototype),i.expected=t,i.found=e,i.location=o,i.name="SyntaxError",i}Ca(wt,Error);function Xt(r,t,e){return e=e||" ",r.length>t?r:(t-=r.length,e+=e.repeat(t),r+e.slice(0,t))}wt.prototype.format=function(r){var t="Error: "+this.message;if(this.location){var e=null,o;for(o=0;o<r.length;o++)if(r[o].source===this.location.source){e=r[o].text.split(/\r\n|\n|\r/g);break}var i=this.location.start,n=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(i):i,p=this.location.source+":"+n.line+":"+n.column;if(e){var a=this.location.end,h=Xt("",n.line.toString().length," "),C=e[i.line-1],M=i.line===a.line?a.column:C.length+1,j=M-i.column||1;t+=`
 --> `+p+`
`+h+` |
`+n.line+" | "+C+`
`+h+" | "+Xt("",i.column-1," ")+Xt("",j,"^")}else t+=`
 at `+p}return t};wt.buildMessage=function(r,t){var e={literal:function(C){return'"'+i(C.text)+'"'},class:function(C){var M=C.parts.map(function(j){return Array.isArray(j)?n(j[0])+"-"+n(j[1]):n(j)});return"["+(C.inverted?"^":"")+M.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(C){return C.description}};function o(C){return C.charCodeAt(0).toString(16).toUpperCase()}function i(C){return C.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(M){return"\\x0"+o(M)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(M){return"\\x"+o(M)})}function n(C){return C.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(M){return"\\x0"+o(M)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(M){return"\\x"+o(M)})}function p(C){return e[C.type](C)}function a(C){var M=C.map(p),j,E;if(M.sort(),M.length>0){for(j=1,E=1;j<M.length;j++)M[j-1]!==M[j]&&(M[E]=M[j],E++);M.length=E}switch(M.length){case 1:return M[0];case 2:return M[0]+" or "+M[1];default:return M.slice(0,-1).join(", ")+", or "+M[M.length-1]}}function h(C){return C?'"'+i(C)+'"':"end of input"}return"Expected "+a(r)+" but "+h(t)+" found."};function Ea(r,t){t=t!==void 0?t:{};var e={},o=t.grammarSource,i={pgn:Mt},n=Mt,p="[",a='"',h="]",C=".",M="O-O-O",j="O-O",E="0-0-0",Q="0-0",H="$",he="{",fe="}",Be=";",ht="(",ct=")",Ee="1-0",vt="0-1",We="1/2-1/2",kt="*",Ae=/^[a-zA-Z]/,Qe=/^[^"]/,Je=/^[0-9]/,Xe=/^[.]/,pt=/^[a-zA-Z1-8\-=]/,gt=/^[+#]/,ut=/^[!?]/,s=/^[^}]/,x=/^[^\r\n]/,$=/^[ \t\r\n]/,w=Ne("tag pair"),y=$e("[",!1),z=$e('"',!1),Z=$e("]",!1),ne=Ne("tag name"),ee=Oe([["a","z"],["A","Z"]],!1,!1),L=Ne("tag value"),O=Oe(['"'],!0,!1),F=Ne("move number"),v=Oe([["0","9"]],!1,!1),se=$e(".",!1),de=Oe(["."],!1,!1),me=Ne("standard algebraic notation"),le=$e("O-O-O",!1),ce=$e("O-O",!1),c=$e("0-0-0",!1),u=$e("0-0",!1),l=Oe([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),k=Oe(["+","#"],!1,!1),m=Ne("suffix annotation"),P=Oe(["!","?"],!1,!1),S=Ne("NAG"),R=$e("$",!1),B=Ne("brace comment"),N=$e("{",!1),A=Oe(["}"],!0,!1),oe=$e("}",!1),J=Ne("rest of line comment"),ie=$e(";",!1),V=Oe(["\r",`
`],!0,!1),q=Ne("variation"),W=$e("(",!1),X=$e(")",!1),ue=Ne("game termination marker"),ve=$e("1-0",!1),ke=$e("0-1",!1),Le=$e("1/2-1/2",!1),re=$e("*",!1),ge=Ne("whitespace"),we=Oe([" ","	","\r",`
`],!1,!1),qe=function(d,f){return _a(d,f)},xe=function(d){return Object.fromEntries(d)},Ge=function(d,f){return[d,f]},Ke=function(d,f){return{root:d,marker:f}},Fe=function(d,f){return Sa(ka(d),...f.flat())},Me=function(d,f,g,K,Y){return $a(d,f,g,K,Y)},tt=function(d){return d},Et=function(d){return d.replace(/[\r\n]+/g," ")},At=function(d){return d.trim()},Tt=function(d){return d},Pt=function(d,f){return{result:d,comment:f}},b=t.peg$currPos|0,at=[{line:1,column:1}],Re=b,nt=t.peg$maxFailExpected||[],D=t.peg$silentFails|0,rt;if(t.startRule){if(!(t.startRule in i))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');n=i[t.startRule]}function $e(d,f){return{type:"literal",text:d,ignoreCase:f}}function Oe(d,f,g){return{type:"class",parts:d,inverted:f,ignoreCase:g}}function Dt(){return{type:"end"}}function Ne(d){return{type:"other",description:d}}function $t(d){var f=at[d],g;if(f)return f;if(d>=at.length)g=at.length-1;else for(g=d;!at[--g];);for(f=at[g],f={line:f.line,column:f.column};g<d;)r.charCodeAt(g)===10?(f.line++,f.column=1):f.column++,g++;return at[d]=f,f}function It(d,f,g){var K=$t(d),Y=$t(f),be={source:o,start:{offset:d,line:K.line,column:K.column},end:{offset:f,line:Y.line,column:Y.column}};return be}function G(d){b<Re||(b>Re&&(Re=b,nt=[]),nt.push(d))}function xt(d,f,g){return new wt(wt.buildMessage(d,f),d,f,g)}function Mt(){var d,f,g;return d=b,f=Kt(),g=_(),d=qe(f,g),d}function Kt(){var d,f,g;for(d=b,f=[],g=zt();g!==e;)f.push(g),g=zt();return g=De(),d=xe(f),d}function zt(){var d,f,g,K,Y,be,bt;return D++,d=b,De(),r.charCodeAt(b)===91?(f=p,b++):(f=e,D===0&&G(y)),f!==e?(De(),g=Vt(),g!==e?(De(),r.charCodeAt(b)===34?(K=a,b++):(K=e,D===0&&G(z)),K!==e?(Y=Lt(),r.charCodeAt(b)===34?(be=a,b++):(be=e,D===0&&G(z)),be!==e?(De(),r.charCodeAt(b)===93?(bt=h,b++):(bt=e,D===0&&G(Z)),bt!==e?d=Ge(g,Y):(b=d,d=e)):(b=d,d=e)):(b=d,d=e)):(b=d,d=e)):(b=d,d=e),D--,d===e&&D===0&&G(w),d}function Vt(){var d,f,g;if(D++,d=b,f=[],g=r.charAt(b),Ae.test(g)?b++:(g=e,D===0&&G(ee)),g!==e)for(;g!==e;)f.push(g),g=r.charAt(b),Ae.test(g)?b++:(g=e,D===0&&G(ee));else f=e;return f!==e?d=r.substring(d,b):d=f,D--,d===e&&(f=e,D===0&&G(ne)),d}function Lt(){var d,f,g;for(D++,d=b,f=[],g=r.charAt(b),Qe.test(g)?b++:(g=e,D===0&&G(O));g!==e;)f.push(g),g=r.charAt(b),Qe.test(g)?b++:(g=e,D===0&&G(O));return d=r.substring(d,b),D--,f=e,D===0&&G(L),d}function _(){var d,f,g;return d=b,f=U(),De(),g=Qt(),g===e&&(g=null),De(),d=Ke(f,g),d}function U(){var d,f,g,K;for(d=b,f=ot(),f===e&&(f=null),g=[],K=pe();K!==e;)g.push(K),K=pe();return d=Fe(f,g),d}function pe(){var d,f,g,K,Y,be,bt,Nt;if(d=b,De(),Pe(),De(),f=je(),f!==e){for(g=Ze(),g===e&&(g=null),K=[],Y=Ve();Y!==e;)K.push(Y),Y=Ve();for(Y=De(),be=ot(),be===e&&(be=null),bt=[],Nt=Rt();Nt!==e;)bt.push(Nt),Nt=Rt();d=Me(f,g,K,be,bt)}else b=d,d=e;return d}function Pe(){var d,f,g,K,Y,be;for(D++,d=b,f=[],g=r.charAt(b),Je.test(g)?b++:(g=e,D===0&&G(v));g!==e;)f.push(g),g=r.charAt(b),Je.test(g)?b++:(g=e,D===0&&G(v));if(r.charCodeAt(b)===46?(g=C,b++):(g=e,D===0&&G(se)),g!==e){for(K=De(),Y=[],be=r.charAt(b),Xe.test(be)?b++:(be=e,D===0&&G(de));be!==e;)Y.push(be),be=r.charAt(b),Xe.test(be)?b++:(be=e,D===0&&G(de));f=[f,g,K,Y],d=f}else b=d,d=e;return D--,d===e&&(f=e,D===0&&G(F)),d}function je(){var d,f,g,K,Y,be;if(D++,d=b,f=b,r.substr(b,5)===M?(g=M,b+=5):(g=e,D===0&&G(le)),g===e&&(r.substr(b,3)===j?(g=j,b+=3):(g=e,D===0&&G(ce)),g===e&&(r.substr(b,5)===E?(g=E,b+=5):(g=e,D===0&&G(c)),g===e&&(r.substr(b,3)===Q?(g=Q,b+=3):(g=e,D===0&&G(u)),g===e))))if(g=b,K=r.charAt(b),Ae.test(K)?b++:(K=e,D===0&&G(ee)),K!==e){if(Y=[],be=r.charAt(b),pt.test(be)?b++:(be=e,D===0&&G(l)),be!==e)for(;be!==e;)Y.push(be),be=r.charAt(b),pt.test(be)?b++:(be=e,D===0&&G(l));else Y=e;Y!==e?(K=[K,Y],g=K):(b=g,g=e)}else b=g,g=e;return g!==e?(K=r.charAt(b),gt.test(K)?b++:(K=e,D===0&&G(k)),K===e&&(K=null),g=[g,K],f=g):(b=f,f=e),f!==e?d=r.substring(d,b):d=f,D--,d===e&&(f=e,D===0&&G(me)),d}function Ze(){var d,f,g;for(D++,d=b,f=[],g=r.charAt(b),ut.test(g)?b++:(g=e,D===0&&G(P));g!==e;)f.push(g),f.length>=2?g=e:(g=r.charAt(b),ut.test(g)?b++:(g=e,D===0&&G(P)));return f.length<1?(b=d,d=e):d=f,D--,d===e&&(f=e,D===0&&G(m)),d}function Ve(){var d,f,g,K,Y;if(D++,d=b,De(),r.charCodeAt(b)===36?(f=H,b++):(f=e,D===0&&G(R)),f!==e){if(g=b,K=[],Y=r.charAt(b),Je.test(Y)?b++:(Y=e,D===0&&G(v)),Y!==e)for(;Y!==e;)K.push(Y),Y=r.charAt(b),Je.test(Y)?b++:(Y=e,D===0&&G(v));else K=e;K!==e?g=r.substring(g,b):g=K,g!==e?d=tt(g):(b=d,d=e)}else b=d,d=e;return D--,d===e&&D===0&&G(S),d}function ot(){var d;return d=qt(),d===e&&(d=Yt()),d}function qt(){var d,f,g,K,Y;if(D++,d=b,r.charCodeAt(b)===123?(f=he,b++):(f=e,D===0&&G(N)),f!==e){for(g=b,K=[],Y=r.charAt(b),s.test(Y)?b++:(Y=e,D===0&&G(A));Y!==e;)K.push(Y),Y=r.charAt(b),s.test(Y)?b++:(Y=e,D===0&&G(A));g=r.substring(g,b),r.charCodeAt(b)===125?(K=fe,b++):(K=e,D===0&&G(oe)),K!==e?d=Et(g):(b=d,d=e)}else b=d,d=e;return D--,d===e&&(f=e,D===0&&G(B)),d}function Yt(){var d,f,g,K,Y;if(D++,d=b,r.charCodeAt(b)===59?(f=Be,b++):(f=e,D===0&&G(ie)),f!==e){for(g=b,K=[],Y=r.charAt(b),x.test(Y)?b++:(Y=e,D===0&&G(V));Y!==e;)K.push(Y),Y=r.charAt(b),x.test(Y)?b++:(Y=e,D===0&&G(V));g=r.substring(g,b),d=At(g)}else b=d,d=e;return D--,d===e&&(f=e,D===0&&G(J)),d}function Rt(){var d,f,g,K;return D++,d=b,De(),r.charCodeAt(b)===40?(f=ht,b++):(f=e,D===0&&G(W)),f!==e?(g=U(),g!==e?(De(),r.charCodeAt(b)===41?(K=ct,b++):(K=e,D===0&&G(X)),K!==e?d=Tt(g):(b=d,d=e)):(b=d,d=e)):(b=d,d=e),D--,d===e&&D===0&&G(q),d}function Qt(){var d,f,g;return D++,d=b,r.substr(b,3)===Ee?(f=Ee,b+=3):(f=e,D===0&&G(ve)),f===e&&(r.substr(b,3)===vt?(f=vt,b+=3):(f=e,D===0&&G(ke)),f===e&&(r.substr(b,7)===We?(f=We,b+=7):(f=e,D===0&&G(Le)),f===e&&(r.charCodeAt(b)===42?(f=kt,b++):(f=e,D===0&&G(re))))),f!==e?(De(),g=ot(),g===e&&(g=null),d=Pt(f,g)):(b=d,d=e),D--,d===e&&(f=e,D===0&&G(ue)),d}function De(){var d,f;for(D++,d=[],f=r.charAt(b),$.test(f)?b++:(f=e,D===0&&G(we));f!==e;)d.push(f),f=r.charAt(b),$.test(f)?b++:(f=e,D===0&&G(we));return D--,f=e,D===0&&G(ge),d}if(rt=n(),t.peg$library)return{peg$result:rt,peg$currPos:b,peg$FAILED:e,peg$maxFailExpected:nt,peg$maxFailPos:Re};if(rt!==e&&b===r.length)return rt;throw rt!==e&&b<r.length&&G(Dt()),xt(nt,Re<r.length?r.charAt(Re):null,Re<r.length?It(Re,Re+1):It(Re,Re))}/**
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
 */const Gt=0xffffffffffffffffn;function Zt(r,t){return(r<<t|r>>64n-t)&0xffffffffffffffffn}function da(r,t){return r*t&Gt}function Aa(r){return function(){let t=BigInt(r&Gt),e=BigInt(r>>64n&Gt);const o=da(Zt(da(t,5n),7n),9n);return e^=t,t=(Zt(t,24n)^e^e<<16n)&Gt,e=Zt(e,37n),r=e<<64n|t,o}}const Wt=Aa(0xa187eb39cdcaed8f31c4b365b102e01en),Ta=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Wt()))),Pa=Array.from({length:8},()=>Wt()),Da=Array.from({length:16},()=>Wt()),ea=Wt(),ze="w",He="b",Se="p",oa="n",Ut="b",_t="r",dt="q",Ce="k",ta="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Ot{constructor(t,e){ye(this,"color");ye(this,"from");ye(this,"to");ye(this,"piece");ye(this,"captured");ye(this,"promotion");ye(this,"flags");ye(this,"san");ye(this,"lan");ye(this,"before");ye(this,"after");const{color:o,piece:i,from:n,to:p,flags:a,captured:h,promotion:C}=e,M=Te(n),j=Te(p);this.color=o,this.piece=i,this.from=M,this.to=j,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=M+j,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const E in ae)ae[E]&a&&(this.flags+=ft[E]);h&&(this.captured=h),C&&(this.promotion=C,this.lan+=C)}isCapture(){return this.flags.indexOf(ft.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(ft.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(ft.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(ft.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(ft.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(ft.BIG_PAWN)>-1}}const Ie=-1,ft={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},ae={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ia={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Ia={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Ma={...ia,...Ia},te={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},aa={b:[16,32,17,15],w:[-16,-32,-17,-15]},ca={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},za=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],La=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],qa={p:1,n:2,b:4,r:8,q:16,k:32},Ra="pnbrqkPNBRQK",pa=[oa,Ut,_t,dt],Na=7,Ba=6,Fa=1,Oa=0,jt={[Ce]:ae.KSIDE_CASTLE,[dt]:ae.QSIDE_CASTLE},st={w:[{square:te.a1,flag:ae.QSIDE_CASTLE},{square:te.h1,flag:ae.KSIDE_CASTLE}],b:[{square:te.a8,flag:ae.QSIDE_CASTLE},{square:te.h8,flag:ae.KSIDE_CASTLE}]},ja={b:Fa,w:Ba},na="--";function mt(r){return r>>4}function Ct(r){return r&15}function ba(r){return"0123456789".indexOf(r)!==-1}function Te(r){const t=Ct(r),e=mt(r);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function St(r){return r===ze?He:ze}function Ha(r){const t=r.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const o=parseInt(t[4],10);if(isNaN(o)||o<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const i=t[0].split("/");if(i.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let p=0;p<i.length;p++){let a=0,h=!1;for(let C=0;C<i[p].length;C++)if(ba(i[p][C])){if(h)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};a+=parseInt(i[p][C],10),h=!0}else{if(!/^[prnbqkPRNBQK]$/.test(i[p][C]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};a+=1,h=!1}if(a!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const n=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:p,regex:a}of n){if(!a.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${p} king`};if((t[0].match(a)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${p} kings`}}return Array.from(i[0]+i[7]).some(p=>p.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Ga(r,t){const e=r.from,o=r.to,i=r.piece;let n=0,p=0,a=0;for(let h=0,C=t.length;h<C;h++){const M=t[h].from,j=t[h].to,E=t[h].piece;i===E&&e!==M&&o===j&&(n++,mt(e)===mt(M)&&p++,Ct(e)===Ct(M)&&a++)}return n>0?p>0&&a>0?Te(e):a>0?Te(e).charAt(1):Te(e).charAt(0):""}function lt(r,t,e,o,i,n=void 0,p=ae.NORMAL){const a=mt(o);if(i===Se&&(a===Na||a===Oa))for(let h=0;h<pa.length;h++){const C=pa[h];r.push({color:t,from:e,to:o,piece:i,captured:n,promotion:C,flags:p|ae.PROMOTION})}else r.push({color:t,from:e,to:o,piece:i,captured:n,flags:p})}function ga(r){let t=r.charAt(0);return t>="a"&&t<="h"?r.match(/[a-h]\d.*[a-h]\d/)?void 0:Se:(t=t.toLowerCase(),t==="o"?Ce:t)}function ra(r){return r.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ua{constructor(t=ta,{skipValidation:e=!1}={}){ye(this,"_board",new Array(128));ye(this,"_turn",ze);ye(this,"_header",{});ye(this,"_kings",{w:Ie,b:Ie});ye(this,"_epSquare",-1);ye(this,"_halfMoves",0);ye(this,"_moveNumber",0);ye(this,"_history",[]);ye(this,"_comments",{});ye(this,"_castling",{w:0,b:0});ye(this,"_hash",0n);ye(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Ie,b:Ie},this._turn=ze,this._castling={w:0,b:0},this._epSquare=Ie,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Ma},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:o=!1}={}){let i=t.split(/\s+/);if(i.length>=2&&i.length<6){const a=["-","-","0","1"];t=i.concat(a.slice(-(6-i.length))).join(" ")}if(i=t.split(/\s+/),!e){const{ok:a,error:h}=Ha(t);if(!a)throw new Error(h)}const n=i[0];let p=0;this.clear({preserveHeaders:o});for(let a=0;a<n.length;a++){const h=n.charAt(a);if(h==="/")p+=8;else if(ba(h))p+=parseInt(h,10);else{const C=h<"a"?ze:He;this._put({type:h.toLowerCase(),color:C},Te(p)),p++}}this._turn=i[1],i[2].indexOf("K")>-1&&(this._castling.w|=ae.KSIDE_CASTLE),i[2].indexOf("Q")>-1&&(this._castling.w|=ae.QSIDE_CASTLE),i[2].indexOf("k")>-1&&(this._castling.b|=ae.KSIDE_CASTLE),i[2].indexOf("q")>-1&&(this._castling.b|=ae.QSIDE_CASTLE),this._epSquare=i[3]==="-"?Ie:te[i[3]],this._halfMoves=parseInt(i[4],10),this._moveNumber=parseInt(i[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var p,a;let e=0,o="";for(let h=te.a8;h<=te.h1;h++){if(this._board[h]){e>0&&(o+=e,e=0);const{color:C,type:M}=this._board[h];o+=C===ze?M.toUpperCase():M.toLowerCase()}else e++;h+1&136&&(e>0&&(o+=e),h!==te.h1&&(o+="/"),e=0,h+=8)}let i="";this._castling[ze]&ae.KSIDE_CASTLE&&(i+="K"),this._castling[ze]&ae.QSIDE_CASTLE&&(i+="Q"),this._castling[He]&ae.KSIDE_CASTLE&&(i+="k"),this._castling[He]&ae.QSIDE_CASTLE&&(i+="q"),i=i||"-";let n="-";if(this._epSquare!==Ie)if(t)n=Te(this._epSquare);else{const h=this._epSquare+(this._turn===ze?16:-16),C=[h+1,h-1];for(const M of C){if(M&136)continue;const j=this._turn;if(((p=this._board[M])==null?void 0:p.color)===j&&((a=this._board[M])==null?void 0:a.type)===Se){this._makeMove({color:j,from:M,to:this._epSquare,piece:Se,captured:Se,flags:ae.EP_CAPTURE});const E=!this._isKingAttacked(j);if(this._undoMove(),E){n=Te(this._epSquare);break}}}}return[o,this._turn,i,n,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:o}=this._board[t],i={w:0,b:1}[e],n={p:0,n:1,b:2,r:3,q:4,k:5}[o];return Ta[i][n][t]}_epKey(){return this._epSquare===Ie?0n:Pa[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Da[t]}_computeHash(){let t=0n;for(let e=te.a8;e<=te.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=ea),t}_updateSetup(t){this._history.length>0||(t!==ta?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ta)}get(t){return this._board[te[t]]}findPiece(t){var o;const e=[];for(let i=te.a8;i<=te.h1;i++){if(i&136){i+=7;continue}!this._board[i]||((o=this._board[i])==null?void 0:o.color)!==t.color||this._board[i].color===t.color&&this._board[i].type===t.type&&e.push(Te(i))}return e}put({type:t,color:e},o){return this._put({type:t,color:e},o)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},o){if(Ra.indexOf(t.toLowerCase())===-1||!(o in te))return!1;const i=te[o];if(t==Ce&&!(this._kings[e]==Ie||this._kings[e]==i))return!1;const n=this._board[i];return n&&n.type===Ce&&(this._kings[n.color]=Ie),this._set(i,{type:t,color:e}),t===Ce&&(this._kings[e]=i),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(te[t]),e&&e.type===Ce&&(this._kings[e.color]=Ie),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var o,i,n,p,a,h,C,M,j,E,Q,H;this._hash^=this._castlingKey();const t=((o=this._board[te.e1])==null?void 0:o.type)===Ce&&((i=this._board[te.e1])==null?void 0:i.color)===ze,e=((n=this._board[te.e8])==null?void 0:n.type)===Ce&&((p=this._board[te.e8])==null?void 0:p.color)===He;(!t||((a=this._board[te.a1])==null?void 0:a.type)!==_t||((h=this._board[te.a1])==null?void 0:h.color)!==ze)&&(this._castling.w&=-65),(!t||((C=this._board[te.h1])==null?void 0:C.type)!==_t||((M=this._board[te.h1])==null?void 0:M.color)!==ze)&&(this._castling.w&=-33),(!e||((j=this._board[te.a8])==null?void 0:j.type)!==_t||((E=this._board[te.a8])==null?void 0:E.color)!==He)&&(this._castling.b&=-65),(!e||((Q=this._board[te.h8])==null?void 0:Q.type)!==_t||((H=this._board[te.h8])==null?void 0:H.color)!==He)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var n,p;if(this._epSquare===Ie)return;const t=this._epSquare+(this._turn===ze?-16:16),e=this._epSquare+(this._turn===ze?16:-16),o=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((n=this._board[e])==null?void 0:n.color)!==St(this._turn)||((p=this._board[e])==null?void 0:p.type)!==Se){this._hash^=this._epKey(),this._epSquare=Ie;return}const i=a=>{var h,C;return!(a&136)&&((h=this._board[a])==null?void 0:h.color)===this._turn&&((C=this._board[a])==null?void 0:C.type)===Se};o.some(i)||(this._hash^=this._epKey(),this._epSquare=Ie)}_attacked(t,e,o){const i=[];for(let n=te.a8;n<=te.h1;n++){if(n&136){n+=7;continue}if(this._board[n]===void 0||this._board[n].color!==t)continue;const p=this._board[n],a=n-e;if(a===0)continue;const h=a+119;if(za[h]&qa[p.type]){if(p.type===Se){if(a>0&&p.color===ze||a<=0&&p.color===He)if(o)i.push(Te(n));else return!0;continue}if(p.type==="n"||p.type==="k")if(o){i.push(Te(n));continue}else return!0;const C=La[h];let M=n+C,j=!1;for(;M!==e;){if(this._board[M]!=null){j=!0;break}M+=C}if(!j)if(o){i.push(Te(n));continue}else return!0}}return o?i:!1}attackers(t,e){return e?this._attacked(e,te[t],!0):this._attacked(this._turn,te[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(St(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,te[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let o=0,i=0;for(let n=te.a8;n<=te.h1;n++){if(i=(i+1)%2,n&136){n+=7;continue}const p=this._board[n];p&&(t[p.type]=p.type in t?t[p.type]+1:1,p.type===Ut&&e.push(i),o++)}if(o===2)return!0;if(o===3&&(t[Ut]===1||t[oa]===1))return!0;if(o===t[Ut]+2){let n=0;const p=e.length;for(let a=0;a<p;a++)n+=e[a];if(n===0||n===p)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:o=void 0}={}){const i=this._moves({square:e,piece:o});return t?i.map(n=>new Ot(this,n)):i.map(n=>this._moveToSan(n,i))}_moves({legal:t=!0,piece:e=void 0,square:o=void 0}={}){var Q;const i=o?o.toLowerCase():void 0,n=e==null?void 0:e.toLowerCase(),p=[],a=this._turn,h=St(a);let C=te.a8,M=te.h1,j=!1;if(i)if(i in te)C=M=te[i],j=!0;else return[];for(let H=C;H<=M;H++){if(H&136){H+=7;continue}if(!this._board[H]||this._board[H].color===h)continue;const{type:he}=this._board[H];let fe;if(he===Se){if(n&&n!==he)continue;fe=H+aa[a][0],this._board[fe]||(lt(p,a,H,fe,Se),fe=H+aa[a][1],ja[a]===mt(H)&&!this._board[fe]&&lt(p,a,H,fe,Se,void 0,ae.BIG_PAWN));for(let Be=2;Be<4;Be++)fe=H+aa[a][Be],!(fe&136)&&(((Q=this._board[fe])==null?void 0:Q.color)===h?lt(p,a,H,fe,Se,this._board[fe].type,ae.CAPTURE):fe===this._epSquare&&lt(p,a,H,fe,Se,Se,ae.EP_CAPTURE))}else{if(n&&n!==he)continue;for(let Be=0,ht=ca[he].length;Be<ht;Be++){const ct=ca[he][Be];for(fe=H;fe+=ct,!(fe&136);){if(!this._board[fe])lt(p,a,H,fe,he);else{if(this._board[fe].color===a)break;lt(p,a,H,fe,he,this._board[fe].type,ae.CAPTURE);break}if(he===oa||he===Ce)break}}}}if((n===void 0||n===Ce)&&(!j||M===this._kings[a])){if(this._castling[a]&ae.KSIDE_CASTLE){const H=this._kings[a],he=H+2;!this._board[H+1]&&!this._board[he]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,H+1)&&!this._attacked(h,he)&&lt(p,a,this._kings[a],he,Ce,void 0,ae.KSIDE_CASTLE)}if(this._castling[a]&ae.QSIDE_CASTLE){const H=this._kings[a],he=H-2;!this._board[H-1]&&!this._board[H-2]&&!this._board[H-3]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,H-1)&&!this._attacked(h,he)&&lt(p,a,this._kings[a],he,Ce,void 0,ae.QSIDE_CASTLE)}}if(!t||this._kings[a]===-1)return p;const E=[];for(let H=0,he=p.length;H<he;H++)this._makeMove(p[H]),this._isKingAttacked(a)||E.push(p[H]),this._undoMove();return E}move(t,{strict:e=!1}={}){let o=null;if(typeof t=="string")o=this._moveFromSan(t,e);else if(t===null)o=this._moveFromSan(na,e);else if(typeof t=="object"){const n=this._moves();for(let p=0,a=n.length;p<a;p++)if(t.from===Te(n[p].from)&&t.to===Te(n[p].to)&&(!("promotion"in n[p])||t.promotion===n[p].promotion)){o=n[p];break}}if(!o)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&o.flags&ae.NULL_MOVE)throw new Error("Null move not allowed when in check");const i=new Ot(this,o);return this._makeMove(o),this._incPositionCount(),i}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var i,n,p,a;const e=this._turn,o=St(e);if(this._push(t),t.flags&ae.NULL_MOVE){e===He&&this._moveNumber++,this._halfMoves++,this._turn=o,this._epSquare=Ie;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&ae.EP_CAPTURE&&(this._turn===He?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Ce){if(this._kings[e]=t.to,t.flags&ae.KSIDE_CASTLE){const h=t.to-1,C=t.to+1;this._movePiece(C,h)}else if(t.flags&ae.QSIDE_CASTLE){const h=t.to+1,C=t.to-2;this._movePiece(C,h)}this._castling[e]=0}if(this._castling[e]){for(let h=0,C=st[e].length;h<C;h++)if(t.from===st[e][h].square&&this._castling[e]&st[e][h].flag){this._castling[e]^=st[e][h].flag;break}}if(this._castling[o]){for(let h=0,C=st[o].length;h<C;h++)if(t.to===st[o][h].square&&this._castling[o]&st[o][h].flag){this._castling[o]^=st[o][h].flag;break}}if(this._hash^=this._castlingKey(),t.flags&ae.BIG_PAWN){let h;e===He?h=t.to-16:h=t.to+16,!(t.to-1&136)&&((i=this._board[t.to-1])==null?void 0:i.type)===Se&&((n=this._board[t.to-1])==null?void 0:n.color)===o||!(t.to+1&136)&&((p=this._board[t.to+1])==null?void 0:p.type)===Se&&((a=this._board[t.to+1])==null?void 0:a.color)===o?(this._epSquare=h,this._hash^=this._epKey()):this._epSquare=Ie}else this._epSquare=Ie;t.piece===Se?this._halfMoves=0:t.flags&(ae.CAPTURE|ae.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===He&&this._moveNumber++,this._turn=o,this._hash^=ea}undo(){const t=this._hash,e=this._undoMove();if(e){const o=new Ot(this,e);return this._decPositionCount(t),o}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=ea;const o=this._turn,i=St(o);if(e.flags&ae.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:o})),e.captured)if(e.flags&ae.EP_CAPTURE){let n;o===He?n=e.to-16:n=e.to+16,this._set(n,{type:Se,color:i})}else this._set(e.to,{type:e.captured,color:i});if(e.flags&(ae.KSIDE_CASTLE|ae.QSIDE_CASTLE)){let n,p;e.flags&ae.KSIDE_CASTLE?(n=e.to+1,p=e.to-1):(n=e.to-2,p=e.to+1),this._movePiece(p,n)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const o=[];let i=!1;for(const E in this._header)this._header[E]&&o.push(`[${E} "${this._header[E]}"]`+t),i=!0;i&&this._history.length&&o.push(t);const n=E=>{const Q=this._comments[this.fen()];if(typeof Q<"u"){const H=E.length>0?" ":"";E=`${E}${H}{${Q}}`}return E},p=[];for(;this._history.length>0;)p.push(this._undoMove());const a=[];let h="";for(p.length===0&&a.push(n(""));p.length>0;){h=n(h);const E=p.pop();if(!E)break;if(!this._history.length&&E.color==="b"){const Q=`${this._moveNumber}. ...`;h=h?`${h} ${Q}`:Q}else E.color==="w"&&(h.length&&a.push(h),h=this._moveNumber+".");h=h+" "+this._moveToSan(E,this._moves({legal:!0})),this._makeMove(E)}if(h.length&&a.push(n(h)),a.push(this._header.Result||"*"),e===0)return o.join("")+a.join(" ");const C=function(){return o.length>0&&o[o.length-1]===" "?(o.pop(),!0):!1},M=function(E,Q){for(const H of Q.split(" "))if(H){if(E+H.length>e){for(;C();)E--;o.push(t),E=0}o.push(H),E+=H.length,o.push(" "),E++}return C()&&E--,E};let j=0;for(let E=0;E<a.length;E++){if(j+a[E].length>e&&a[E].includes("{")){j=M(j,a[E]);continue}j+a[E].length>e&&E!==0?(o[o.length-1]===" "&&o.pop(),o.push(t),j=0):E!==0&&(o.push(" "),j++),o.push(a[E]),j+=a[E].length}return o.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ia[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ia[t]||null,!0):!1}getHeaders(){const t={};for(const[e,o]of Object.entries(this._header))o!==null&&(t[e]=o);return t}loadPgn(t,{strict:e=!1,newlineChar:o=`\r?
`}={}){o!==`\r?
`&&(t=t.replace(new RegExp(o,"g"),`
`));const i=Ea(t);this.reset();const n=i.headers;let p="";for(const C in n)C.toLowerCase()==="fen"&&(p=n[C]),this.header(C,n[C]);if(!e)p&&this.load(p,{preserveHeaders:!0});else if(n.SetUp==="1"){if(!("FEN"in n))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(n.FEN,{preserveHeaders:!0})}let a=i.root;for(;a;){if(a.move){const C=this._moveFromSan(a.move,e);if(C==null)throw new Error(`Invalid move in PGN: ${a.move}`);this._makeMove(C),this._incPositionCount()}a.comment!==void 0&&(this._comments[this.fen()]=a.comment),a=a.variations[0]}const h=i.result;h&&Object.keys(this._header).length&&this._header.Result!==h&&this.setHeader("Result",h)}_moveToSan(t,e){let o="";if(t.flags&ae.KSIDE_CASTLE)o="O-O";else if(t.flags&ae.QSIDE_CASTLE)o="O-O-O";else{if(t.flags&ae.NULL_MOVE)return na;if(t.piece!==Se){const i=Ga(t,e);o+=t.piece.toUpperCase()+i}t.flags&(ae.CAPTURE|ae.EP_CAPTURE)&&(t.piece===Se&&(o+=Te(t.from)[0]),o+="x"),o+=Te(t.to),t.promotion&&(o+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?o+="#":o+="+"),this._undoMove(),o}_moveFromSan(t,e=!1){let o=ra(t);if(e||(o==="0-0"?o="O-O":o==="0-0-0"&&(o="O-O-O")),o==na)return{color:this._turn,from:0,to:0,piece:"k",flags:ae.NULL_MOVE};let i=ga(o),n=this._moves({legal:!0,piece:i});for(let E=0,Q=n.length;E<Q;E++)if(o===ra(this._moveToSan(n[E],n)))return n[E];if(e)return null;let p,a,h,C,M,j=!1;if(a=o.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),a?(p=a[1],h=a[2],C=a[3],M=a[4],h.length==1&&(j=!0)):(a=o.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),a&&(p=a[1],h=a[2],C=a[3],M=a[4],h.length==1&&(j=!0))),i=ga(o),n=this._moves({legal:!0,piece:p||i}),!C)return null;for(let E=0,Q=n.length;E<Q;E++)if(h){if((!p||p.toLowerCase()==n[E].piece)&&te[h]==n[E].from&&te[C]==n[E].to&&(!M||M.toLowerCase()==n[E].promotion))return n[E];if(j){const H=Te(n[E].from);if((!p||p.toLowerCase()==n[E].piece)&&te[C]==n[E].to&&(h==H[0]||h==H[1])&&(!M||M.toLowerCase()==n[E].promotion))return n[E]}}else if(o===ra(this._moveToSan(n[E],n)).replace("x",""))return n[E];return null}ascii(){let t=`   +------------------------+
`;for(let e=te.a8;e<=te.h1;e++){if(Ct(e)===0&&(t+=" "+"87654321"[mt(e)]+" |"),this._board[e]){const o=this._board[e].type,n=this._board[e].color===ze?o.toUpperCase():o.toLowerCase();t+=" "+n+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let o=0;const i=this._turn;for(let n=0,p=e.length;n<p;n++)this._makeMove(e[n]),this._isKingAttacked(i)||(t-1>0?o+=this.perft(t-1):o++),this._undoMove();return o}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let o=te.a8;o<=te.h1;o++)this._board[o]==null?e.push(null):e.push({square:Te(o),type:this._board[o].type,color:this._board[o].color}),o+1&136&&(t.push(e),e=[],o+=8);return t}squareColor(t){if(t in te){const e=te[t];return(mt(e)+Ct(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],o=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const i=e.pop();if(!i)break;t?o.push(new Ot(this,i)):o.push(this._moveToSan(i,this._moves())),this._makeMove(i)}return o}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},o=i=>{i in this._comments&&(e[i]=this._comments[i])};for(;this._history.length>0;)t.push(this._undoMove());for(o(this.fen());;){const i=t.pop();if(!i)break;this._makeMove(i),o(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const i of[Ce,dt])e[i]!==void 0&&(e[i]?this._castling[t]|=jt[i]:this._castling[t]&=~jt[i]);this._updateCastlingRights();const o=this.getCastlingRights(t);return(e[Ce]===void 0||e[Ce]===o[Ce])&&(e[dt]===void 0||e[dt]===o[dt])}getCastlingRights(t){return{[Ce]:(this._castling[t]&jt[Ce])!==0,[dt]:(this._castling[t]&jt[dt])!==0}}moveNumber(){return this._moveNumber}}async function Ya(r,t={}){var me,le,ce;const e=t.currentUser||{};let o="chat",i=[],n=null,p=[],a=[],h=null,C=null,M=!1,j=null,E=null;r.innerHTML=`
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
  `,Ua(),await ct(),Ae();const Q=r.querySelector("#tab-nav-chat"),H=r.querySelector("#tab-nav-lounge"),he=r.querySelector("#bonding-chat-main-wrap"),fe=r.querySelector("#bonding-lounge-main-wrap");Q==null||Q.addEventListener("click",()=>{o="chat",Q.classList.add("active"),H.classList.remove("active"),he.style.display="grid",fe.style.display="none",Ae()}),H==null||H.addEventListener("click",async()=>{o="lounge_games",H.classList.add("active"),Q.classList.remove("active"),he.style.display="none",fe.style.display="block",await y()}),(me=r.querySelector("#btn-top-new-chat"))==null||me.addEventListener("click",F),(le=r.querySelector("#btn-top-new-group"))==null||le.addEventListener("click",v),(ce=r.querySelector("#btn-top-challenge"))==null||ce.addEventListener("click",()=>Z());const Be=r.querySelector("#bonding-search-input");Be&&Be.addEventListener("input",c=>{const u=c.target.value.toLowerCase().trim();r.querySelectorAll(".bonding-channel-item").forEach(k=>{const m=k.textContent.toLowerCase();k.style.display=m.includes(u)?"flex":"none"})}),vt(),new MutationObserver((c,u)=>{document.body.contains(r)||(C&&clearInterval(C),E&&clearInterval(E),u.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function ct(){try{const[c,u]=await Promise.all([Ue("/bonding/channels").catch(()=>[]),Ue("/bonding/colleagues").catch(()=>[])]);i=c,p=u,!n&&i.length>0&&(n=i.find(l=>l.name.includes("Lounge"))||i[0]),We(),n&&await Ee(n._id)}catch(c){console.error("Failed to load bonding data",c)}}async function Ee(c,u=!1){if(c)try{a=await Ue(`/bonding/channels/${c}/messages`),u?$():w()}catch(l){console.error("Failed to load messages",l)}}function vt(){C&&clearInterval(C),C=setInterval(async()=>{try{if(!document.body.contains(r)){clearInterval(C);return}o==="chat"&&n?await Ee(n._id,!0):o==="lounge_games"&&await y(!0)}catch{}},3e3)}function We(){const c=r.querySelector("#bonding-group-list"),u=r.querySelector("#bonding-direct-list");if(!c||!u)return;const l=i.filter(m=>m.type==="group"),k=i.filter(m=>m.type==="direct");l.length===0?c.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':c.innerHTML=l.map(m=>{var S;return`
          <div class="bonding-channel-item ${n&&n._id===m._id?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-icon">${m.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${T(m.name)}</div>
              <div class="bonding-channel-preview">${T(((S=m.lastMessage)==null?void 0:S.content)||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),k.length===0?u.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':u.innerHTML=k.map(m=>{var B;const P=n&&n._id===m._id,S=m.displayName||m.name||"Colleague",R=S.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${P?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-avatar">${R}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${T(S)}</div>
              <div class="bonding-channel-preview">${T(((B=m.lastMessage)==null?void 0:B.content)||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),kt()}function kt(){var u,l;const c=r.querySelectorAll(".bonding-channel-item");c.forEach(k=>{k.onclick=async m=>{if(m.target.closest(".bonding-channel-del-btn"))return;const P=k.dataset.channelId,S=i.find(R=>R._id===P);S&&(n=S,c.forEach(R=>R.classList.remove("active")),k.classList.add("active"),Ae(),await Ee(S._id))}}),r.querySelectorAll(".bonding-channel-del-btn").forEach(k=>{k.onclick=async m=>{m.stopPropagation();const P=k.dataset.channelId,S=i.find(N=>N._id===P),R=S&&S.type==="direct",B=R?"this 1-on-1 chat":`the group "${(S==null?void 0:S.name)||""}"`;if(confirm(`Are you sure you want to delete ${B}? All messages will be permanently removed.`))try{k.disabled=!0,await et(`/bonding/channels/${P}`),I(R?"1-on-1 chat deleted":"Group deleted","success"),i=i.filter(N=>N._id!==P),n&&n._id===P&&(n=i[0]||null,Ae(),n&&await Ee(n._id)),We()}catch(N){I(N.message||"Failed to delete conversation","error"),k.disabled=!1}}}),(u=r.querySelector("#btn-create-group"))==null||u.addEventListener("click",v),(l=r.querySelector("#btn-new-direct-chat"))==null||l.addEventListener("click",F)}function Ae(){const c=r.querySelector("#bonding-chat-panel");if(!c)return;if(!n){c.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const u=T(n.displayName||n.name),l=(n.members||[]).length,k=n.type==="group",m=(e==null?void 0:e._id)||(e==null?void 0:e.id),P=k?null:(n.members||[]).find(S=>{var R;return((R=S.userId)==null?void 0:R.toString())!==(m==null?void 0:m.toString())});c.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${k?n.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${u}</div>
            <div class="bonding-chat-sub">
              ${k?`<span>${l} members</span> · <span>${T(n.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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
        ${Qe()}
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
    `,Xe(P),pt(P),gt(),x()}function Qe(){if(!a||a.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const c=(e==null?void 0:e._id)||(e==null?void 0:e.id);return a.map(u=>{var S,R,B,N,A,oe,J,ie,V;const l=u.sender&&u.sender.userId&&c&&u.sender.userId.toString()===c.toString();if(u.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${u._id}">
            <span>ℹ️</span> <span>${T(u.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${u._id}" title="Delete Message">&times;</button>
          </div>
        `;if(u.type==="challenge"&&u.challengeData){const q=u.challengeData,W=q.gameTitle||"Game Challenge",X=q.gameType||"chess",ue=X==="chess"?"♟️":X==="ludo"?"🎲":"❌",ve=(S=q.gameState)==null?void 0:S.invitationId,ke=(R=q.targetUserId)==null?void 0:R.toString(),Le=(N=(B=u.sender)==null?void 0:B.userId)==null?void 0:N.toString(),re=c&&ke===c.toString(),ge=c&&Le===c.toString();return`
          <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${u._id}">
            <div class="bonding-msg-avatar" title="${T(((A=u.sender)==null?void 0:A.name)||"Teammate")}">
              ${(((oe=u.sender)==null?void 0:oe.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${T(((J=u.sender)==null?void 0:J.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${de(u.createdAt)}</span>
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
                  <div class="game-bubble-icon">${ue}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${T(W)}</h4>
                    <p class="game-bubble-desc">${T(u.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${q.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':q.status==="active"||q.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${T(((ie=q.status)==null?void 0:ie.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${q.status==="pending"&&re?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${ve}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${ve}" data-action="decline">
                        Decline
                      </button>
                    `:q.status==="pending"&&ge?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${ve}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${ve}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${Je(u)}
            </div>
          </div>
        `}const k=T(((V=u.sender)==null?void 0:V.name)||"Teammate"),m=de(u.createdAt),P=Je(u);return`
        <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${u._id}">
          <div class="bonding-msg-avatar" title="${k}">${k.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${k}</span>
              <span class="bonding-msg-time">${m}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${u._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${T(u.content).replace(/\n/g,"<br/>")}
            </div>
            ${P}
          </div>
        </div>
      `}).join("")}function Je(c){return`
      <div class="bonding-reactions-row">
        ${(c.reactions||[]).map(k=>{const m=(e==null?void 0:e._id)||(e==null?void 0:e.id);return`
        <button class="bonding-rxn-tag ${(k.users||[]).some(S=>S.toString()===(m==null?void 0:m.toString()))?"active":""}" data-msg-id="${c._id}" data-emoji="${k.emoji}">
          <span>${k.emoji}</span> <span>${k.users?k.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${c._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function Xe(c){const u=r.querySelector("#btn-chat-challenge");u&&(u.onclick=()=>{c?Z(null,c.userId||c._id):Z()});const l=r.querySelector("#btn-manage-members");l&&(l.onclick=L);const k=r.querySelector("#btn-delete-group");k&&(k.onclick=O);const m=r.querySelector("#btn-delete-direct");m&&(m.onclick=async()=>{if(n&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{m.disabled=!0,await et(`/bonding/channels/${n._id}`),I("1-on-1 chat deleted successfully","success");const S=n._id;i=i.filter(R=>R._id!==S),n=i[0]||null,We(),Ae(),n&&await Ee(n._id)}catch(S){I(S.message||"Could not delete 1-on-1 chat","error"),m.disabled=!1}});const P=r.querySelector("#btn-clear-chat");P&&(P.onclick=async()=>{if(n&&confirm("Are you sure you want to clear all messages in this conversation?"))try{P.disabled=!0,await et(`/bonding/channels/${n._id}/messages`),I("Chat messages cleared","success"),a=[],w()}catch(S){I(S.message||"Could not clear chat messages","error")}finally{P.disabled=!1}})}function pt(c){const u=r.querySelector("#bonding-message-input"),l=r.querySelector("#btn-send-message"),k=r.querySelector("#btn-quick-emoji"),m=r.querySelector("#btn-input-challenge");u&&u.addEventListener("keydown",P=>{P.key==="Enter"&&!P.shiftKey&&(P.preventDefault(),ut())}),l&&(l.onclick=ut),m&&(m.onclick=()=>{c?Z(null,c.userId||c._id):Z()}),k&&(k.onclick=()=>{if(!u)return;const P=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],S=P[Math.floor(Math.random()*P.length)];u.value+=(u.value?" ":"")+S,u.focus()})}function gt(){r.querySelectorAll(".btn-respond-invite").forEach(k=>{k.onclick=async()=>{const m=k.dataset.inviteId,P=k.dataset.action;await ne(m,P)}}),r.querySelectorAll(".btn-launch-match-from-card").forEach(k=>{k.onclick=async()=>{const m=k.dataset.inviteId;try{k.disabled=!0;const P=await Ue("/bonding/invitations"),S=(P.incoming||[]).concat(P.sent||[]).find(R=>R._id===m);S&&S.matchId?ee(S.matchId):I("Match has not started yet or has expired","warning")}catch(P){I(P.message||"Could not load match","error")}finally{k.disabled=!1}}}),r.querySelectorAll(".bonding-msg-del-btn").forEach(k=>{k.onclick=async m=>{m.stopPropagation();const P=k.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{k.disabled=!0,await et(`/bonding/messages/${P}`),a=a.filter(S=>S._id!==P),$(),I("Message deleted","success")}catch(S){I(S.message||"Failed to delete message","error"),k.disabled=!1}}}),r.querySelectorAll(".bonding-rxn-tag").forEach(k=>{k.onclick=async()=>{const m=k.dataset.msgId,P=k.dataset.emoji;await s(m,P)}}),r.querySelectorAll(".bonding-add-rxn-btn").forEach(k=>{k.onclick=m=>{const P=k.dataset.msgId;se(m.currentTarget,async S=>{await s(P,S)})}})}async function ut(){const c=r.querySelector("#bonding-message-input");if(!c||!n||M)return;const u=c.value.trim();if(u)try{M=!0,c.value="";const l=await _e(`/bonding/channels/${n._id}/messages`,{content:u,type:"text"});a.push(l),w(),x()}catch(l){I(l.message||"Failed to send message","error")}finally{M=!1,c.focus()}}async function s(c,u){try{const l=await _e(`/bonding/messages/${c}/react`,{emoji:u}),k=a.find(m=>m._id===c);k&&(k.reactions=l,$())}catch(l){I(l.message||"Failed to react","error")}}function x(){const c=r.querySelector("#bonding-messages-feed");c&&(c.scrollTop=c.scrollHeight)}function $(){const c=r.querySelector("#bonding-messages-feed");if(!c)return;const u=c.scrollHeight-c.scrollTop<=c.clientHeight+80;c.innerHTML=Qe(),gt(),u&&x()}function w(){const c=r.querySelector("#bonding-messages-feed");c&&(c.innerHTML=Qe(),gt())}async function y(c=!1){const u=r.querySelector("#bonding-lounge-main-wrap");if(u){c||(u.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const l=await Ue("/bonding/games/overview");h=l;const k=l.myStats||{},m=l.availableGames||[],P=l.incomingChallenges||[],S=l.sentChallenges||[],R=l.activeMatches||[],B=l.recentMatches||[],N=(e==null?void 0:e._id)||(e==null?void 0:e.id);u.innerHTML=`
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
              ${m.map(A=>`
                <div class="lounge-game-card" data-game-id="${A.id}">
                  <div class="game-card-icon">${A.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${T(A.name)}</h4>
                    <p class="game-card-desc">${T(A.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${A.duration}</span>
                      ${A.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${A.id}" data-game-title="${T(A.name)}">
                    ${A.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${P.length+S.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${P.length})</h5>
              ${P.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${P.map(A=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(A.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${T(A.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${T(A.sender.name)}</strong> (${T(A.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${A._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${A._id}" data-action="decline">
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
                    ${S.map(A=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(A.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${T(A.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${T(A.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${A._id}" data-action="cancel">
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
                    ${R.map(A=>{const J=N&&A.player1.userId.toString()===N.toString()?A.player2:A.player1,ie=N&&A.currentTurnUserId&&A.currentTurnUserId.toString()===N.toString();return`
                        <div class="lounge-active-match-card ${ie?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${A.gameType==="chess"?"♟️":A.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${T(A.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${T(J.name)}</strong> (${T(J.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ie?"my-turn":"wait"}">
                              ${ie?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${A._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${A._id}" title="Delete Match">
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
              ${B.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${B.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${B.map(A=>{const J=N&&A.player1.userId.toString()===N.toString()?A.player2:A.player1,ie=N&&A.winnerId&&A.winnerId.toString()===N.toString(),V=A.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${T(A.gameTitle)}</span>
                          <span class="recent-date">${de(A.completedAt||A.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${A._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${T(J.name)}</strong></div>
                          <div class="recent-outcome ${ie?"win":V?"draw":"loss"}">
                            ${ie?"🏆 VICTORY":V?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${T(A.winningReason||A.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${A._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${A._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,z()}catch(l){u.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${T(l.message)}</p>
        </div>
      `}}}function z(){r.querySelectorAll(".btn-challenge-game").forEach(u=>{u.onclick=()=>{const l=u.dataset.gameId;Z(l)}}),r.querySelectorAll(".btn-respond-invite").forEach(u=>{u.onclick=async()=>{const l=u.dataset.inviteId,k=u.dataset.action;await ne(l,k),await y()}}),r.querySelectorAll(".btn-resume-match").forEach(u=>{u.onclick=()=>{const l=u.dataset.matchId;ee(l)}}),r.querySelectorAll(".btn-recent-rematch").forEach(u=>{u.onclick=async()=>{const l=u.dataset.matchId;try{u.disabled=!0;const k=await _e(`/bonding/matches/${l}/action`,{action:"rematch"});k.match&&(I("Rematch created! Opening arena ⚔️","success"),ee(k.match._id))}catch(k){I(k.message||"Could not start rematch","error")}finally{u.disabled=!1}}}),r.querySelectorAll(".btn-delete-match").forEach(u=>{u.onclick=async l=>{l.stopPropagation();const k=u.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{u.disabled=!0,await et(`/bonding/matches/${k}`),I("Match deleted successfully","success"),await y()}catch(m){I(m.message||"Failed to delete match","error")}finally{u.disabled=!1}}});const c=r.querySelector("#btn-clear-matches");c&&(c.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{c.disabled=!0,await et("/bonding/matches?filter=completed"),I("Completed matches history cleared","success"),await y()}catch(u){I(u.message||"Failed to clear matches","error")}finally{c.disabled=!1}})}function Z(c=null,u=null){const l=r.querySelector("#bonding-modals-root"),k=(e==null?void 0:e._id)||(e==null?void 0:e.id),m=new Set(["employee","admin","superadmin"]),P=p.filter(ie=>!ie.isSelf&&ie._id.toString()!==(k==null?void 0:k.toString())&&m.has(ie.role));let S=c||"chess",R=u?u.toString():null,B=2,N=R?[R]:[],A="none";function oe(){const ie=P.find(X=>X._id.toString()===R),V=S==="ludo",q=B-1,W=N.length===q;l.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${V?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
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
              ${V?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${B===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${B===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${B===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${V?`Step 3 — Select Colleagues to Play With (${N.length}/${q} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${P.map(X=>{const ue=V?N.includes(X._id.toString()):R===X._id.toString();return`
                      <div class="eligible-emp-item ${ue?"selected":""}" data-user-id="${X._id}">
                        <div class="emp-item-avatar">${X.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${T(X.name)}</span>
                          <span class="emp-item-role">${T(X.role==="superadmin"?"Superadmin":X.role==="admin"?"Admin":"Employee")} · ${T(X.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${ue?"active":""}">
                          ${ue?"Selected ✓":"Select"}
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
                    <label class="timer-radio-lbl ${A==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${A==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${A==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${A==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${A==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${A==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${V?`🎲 Ludo (${B} Players · 4 Pawns per base)`:S==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${V?`
                    <div><strong>Opponents:</strong> ${N.length>0?N.map(X=>{const ue=P.find(ve=>ve._id.toString()===X);return ue?`<strong>${T(ue.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+q+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${ie?`<strong>${T(ie.name)}</strong> (${T(ie.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${S==="chess"?`<div><strong>Time Control:</strong> ${A==="none"?"Untimed":A}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(V?!W:!R)?"disabled":""}>
                ${V?`Start ${B}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,J()}function J(){l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelector("#btn-cancel-challenge-flow").onclick=()=>{l.innerHTML=""},l.querySelectorAll(".game-pill-btn").forEach(q=>{q.onclick=()=>{S=q.dataset.game,oe()}}),l.querySelectorAll(".ludo-mode-btn").forEach(q=>{q.onclick=()=>{B=Number(q.dataset.count),N=N.slice(0,B-1),oe()}});const ie=l.querySelector("#flow-emp-search");ie&&(ie.oninput=q=>{const W=q.target.value.toLowerCase().trim();l.querySelectorAll(".eligible-emp-item").forEach(X=>{const ue=X.textContent.toLowerCase();X.style.display=ue.includes(W)?"flex":"none"})}),l.querySelectorAll(".eligible-emp-item").forEach(q=>{q.onclick=()=>{const W=q.dataset.userId;if(S==="ludo"){const X=B-1;N.includes(W)?N=N.filter(ue=>ue!==W):N.length<X?N.push(W):N[X-1]=W}else R=W;oe()}}),l.querySelectorAll('input[name="timerMode"]').forEach(q=>{q.onchange=W=>{A=W.target.value,oe()}});const V=l.querySelector("#btn-submit-challenge-flow");V&&(V.onclick=async()=>{if(S==="ludo"){const q=B-1;if(N.length<q){I(`Please select ${q} colleague(s) to play with`,"warning");return}try{V.disabled=!0,V.textContent="Launching Match...";const W=await _e("/bonding/matches/instant-ludo",{playerCount:B,targetUserIds:N});l.innerHTML="",I(`Ludo match started (${B} Players)! 🎲`,"success"),W&&W._id&&ee(W._id)}catch(W){I(W.message||"Failed to start Ludo match","error"),V.disabled=!1,V.textContent=`Start ${B}P Ludo Match 🎲`}return}if(!R){I("Please select an employee to challenge","warning");return}try{V.disabled=!0,V.textContent="Sending Challenge...",await _e("/bonding/invitations",{gameType:S,targetUserId:R,matchSettings:{timerMode:A},channelId:(n==null?void 0:n._id)||null}),I("Game challenge delivered! Awaiting acceptance ⚔️","success"),l.innerHTML="",n&&await Ee(n._id),o==="lounge_games"&&await y()}catch(q){I(q.message||"Could not send challenge","error"),V.disabled=!1,V.textContent="Send Challenge 🚀"}})}oe()}async function ne(c,u){if(!(!c||!u))try{const l=await Ht(`/bonding/invitations/${c}/respond`,{action:u});u==="accept"?(I("Challenge accepted! Entering match arena ⚔️","success"),l.match&&ee(l.match._id)):u==="decline"?I("Challenge declined","info"):u==="cancel"&&I("Challenge cancelled","info"),n&&await Ee(n._id),o==="lounge_games"&&await y()}catch(l){I(l.message||"Action failed","error")}}async function ee(c){if(!c)return;j=c,E&&clearInterval(E);const u=r.querySelector("#bonding-modals-root");let l=null,k=null,m=[];async function P(){try{return l=await Ue(`/bonding/matches/${c}`),l}catch(J){return I(J.message||"Could not load match","error"),S(),null}}if(l=await P(),!l)return;function S(){E&&clearInterval(E),j=null,u.innerHTML="",o==="lounge_games"&&y(!0),n&&Ee(n._id,!0)}E=setInterval(async()=>{var q,W,X,ue;if(!j||j!==c){clearInterval(E);return}const J=(q=l==null?void 0:l.currentTurnUserId)==null?void 0:q.toString(),ie=l==null?void 0:l.status,V=await P();V&&(((W=V.currentTurnUserId)==null?void 0:W.toString())!==J||V.status!==ie||((X=V.moves)==null?void 0:X.length)!==((ue=l.moves)==null?void 0:ue.length))&&R()},1500);function R(){var ue,ve;if(!l)return;const J=(e==null?void 0:e._id)||(e==null?void 0:e.id),ie=J&&l.player1.userId.toString()===J.toString(),V=ie?l.player1:l.player2,q=ie?l.player2:l.player1,W=J&&l.currentTurnUserId&&l.currentTurnUserId.toString()===J.toString(),X=l.status!=="active";u.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${l.gameType==="ludo"?"🎲":l.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${T(l.gameTitle)}</h3>
                  ${l.gameType==="ludo"&&((ue=l.gameState)!=null&&ue.players)?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${l.gameState.players.map(ke=>{var we;const Le=ke.userId&&ke.userId.toString()===(J==null?void 0:J.toString()),re={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[ke.color]||"⚪",ge=(((we=l.gameState)==null?void 0:we.turnColor)||l.turn)===ke.color;return`
                          <span class="player-tag ${Le?"self":"opp"} ${ge?"turn-active":""}">
                            ${re} <strong>${T(ke.name)}</strong> ${Le?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${T(V.name)} (You · <strong>${l.gameType==="ludo"?V.assignedRole==="red"?"🔴 Red":"🟢 Green":l.gameType==="tictactoe"?V.assignedRole==="X"?"✕":"◯":V.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${T(q.name)} (<strong>${l.gameType==="ludo"?q.assignedRole==="red"?"🔴 Red":"🟢 Green":l.gameType==="tictactoe"?q.assignedRole==="X"?"✕":"◯":q.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${X?"ended":W?"my-turn":"opp-turn"}">
                ${X?`<span>🏁 Finished (${T(l.winningReason||l.status)})</span>`:W?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${T(q.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${l.gameType==="ludo"?W?(ve=l.gameState)!=null&&ve.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":l.gameType==="tictactoe"?W?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":W?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${X?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${l.drawOfferedBy&&l.drawOfferedBy.toString()!==(J==null?void 0:J.toString())&&!X?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${T(q.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${l.gameType==="chess"?B(ie):""}
              ${l.gameType==="tictactoe"?N():""}
              ${l.gameType==="ludo"?A(ie):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${X?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${l.winnerId&&l.winnerId.toString()===(J==null?void 0:J.toString())?"🏆":l.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${l.winnerId&&l.winnerId.toString()===(J==null?void 0:J.toString())?"VICTORY!":l.status==="draw"?"STALEMATE / DRAW":`${T(l.winnerName)} Wins!`}</h4>
                  <p>Reason: ${T(l.winningReason||"Match concluded")}</p>
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
      `,oe(W,ie,V)}function B(J){var re;const ie=((re=l.gameState)==null?void 0:re.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",V=new ua(ie),q=J?l.player1.assignedRole==="white":l.player2.assignedRole==="white",W={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},X=q?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],ue=q?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let ve='<div class="chess-board-grid">';for(const ge of ue)for(const we of X){const qe=`${we}${ge}`,xe=V.get(qe),Ge=(we.charCodeAt(0)-97+ge)%2!==0,Ke=k===qe,Fe=m.includes(qe),Me=xe?xe.color==="w"?W[xe.type.toUpperCase()]:W[xe.type]:"";ve+=`
            <div class="chess-sq ${Ge?"light":"dark"} ${Ke?"selected":""} ${Fe?"legal-dot":""}" data-square="${qe}">
              ${Me?`<span class="chess-piece ${xe.color==="w"?"white-piece":"black-piece"}">${Me}</span>`:""}
            </div>
          `}ve+="</div>";const Le=(l.moves||[]).map(ge=>{var we;return`
        <span class="chess-move-token">${ge.moveNum}. ${((we=ge.moveData)==null?void 0:we.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${ve}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${Le||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function N(){var V;const J=((V=l.gameState)==null?void 0:V.board)||Array(9).fill(null),ie=l.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${J.map((q,W)=>{const X=ie.includes(W);return`
                <div class="ttt-cell ${q?"filled":"empty"} ${X?"win-cell":""}" data-cell-idx="${W}">
                  ${q==="X"?'<span class="ttt-x">✕</span>':q==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function A(J,ie,V){var Lt;const q=l.gameState||{},W=q.activeColors||["red","green"],X=q.players||[{...l.player1,color:"red",assignedRole:"red",isBot:!1},{...l.player2,color:"green",assignedRole:"green",isBot:!1}],ue=q.tokens||{},ve=_=>{const U=ue[_]||(_==="red"?q.p1Tokens:_==="green"?q.p2Tokens:[])||[];return Array.from({length:4},(pe,Pe)=>U[Pe]||{id:Pe,step:-1})},ke=ve("red"),Le=ve("green"),re=ve("yellow"),ge=ve("blue"),we=(e==null?void 0:e._id)||(e==null?void 0:e.id),qe=X.find(_=>_.userId&&_.userId.toString()===(we==null?void 0:we.toString()))||X[0],xe=(qe==null?void 0:qe.color)||(J?"red":"green"),Ge=q.turnColor||l.turn||"red",Ke=xe===Ge&&l.status==="active",Fe=!!q.rolled,Me=q.dice,tt=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],Et=[[7,1],[7,2],[7,3],[7,4],[7,5]],At=[[1,7],[2,7],[3,7],[4,7],[5,7]],Tt=[[7,13],[7,12],[7,11],[7,10],[7,9]],Pt=[[13,7],[12,7],[11,7],[10,7],[9,7]],b=[0,8,13,21,26,34,39,47];function at(_,U){return U<0?null:U>=56?_==="red"?[7,6]:_==="green"?[6,7]:_==="yellow"?[7,8]:[8,7]:_==="red"?U<=50?tt[U]:Et[U-51]:_==="green"?U<=50?tt[(13+U)%52]:At[U-51]:_==="yellow"?U<=50?tt[(26+U)%52]:Tt[U-51]:U<=50?tt[(39+U)%52]:Pt[U-51]}function Re(_,U){return _!==xe||!Ke||!Fe||!Me||l.status!=="active"?!1:U.step===-1?Me===6:U.step>=0&&U.step+Me<=56}const nt={},D=(_,U)=>{U.forEach(pe=>{if(pe.step>=0&&pe.step<56){const Pe=at(_,pe.step);if(Pe){const je=Pe[0]+","+Pe[1];(nt[je]=nt[je]||[]).push({color:_,id:pe.id,step:pe.step,movable:Re(_,pe)})}}})};W.includes("red")&&D("red",ke),W.includes("green")&&D("green",Le),W.includes("yellow")&&D("yellow",re),W.includes("blue")&&D("blue",ge);const rt={};tt.forEach(([_,U],pe)=>{rt[_+","+U]=pe});const $e={};Et.forEach(([_,U],pe)=>{$e[_+","+U]=pe+1});const Oe={};At.forEach(([_,U],pe)=>{Oe[_+","+U]=pe+1});const Dt={};Tt.forEach(([_,U],pe)=>{Dt[_+","+U]=pe+1});const Ne={};Pt.forEach(([_,U],pe)=>{Ne[_+","+U]=pe+1});const $t=[];for(let _=0;_<15;_++)for(let U=0;U<15;U++){if(_<6&&U<6||_<6&&U>8||_>8&&U<6||_>8&&U>8||_>=6&&_<=8&&U>=6&&U<=8)continue;const pe=_+","+U,Pe=rt[pe],je=Pe!==void 0&&b.includes(Pe),Ze=_===6&&U===1,Ve=_===1&&U===8,ot=_===8&&U===13,qt=_===13&&U===6,Yt=$e[pe],Rt=Oe[pe],Qt=Dt[pe],De=Ne[pe];let d="ludo-cell";Ze?d+=" cell-red-start":Ve?d+=" cell-green-start":ot?d+=" cell-yellow-start":qt?d+=" cell-blue-start":Yt?d+=" cell-red-stretch":Rt?d+=" cell-green-stretch":Qt?d+=" cell-yellow-stretch":De?d+=" cell-blue-stretch":je&&(d+=" cell-safe-star");const f=nt[pe]||[];$t.push(`
            <div class="${d}" style="grid-row:${_+1};grid-column:${U+1}" data-pos="${pe}">
              ${je?'<span class="cell-star-glyph">⭐</span>':""}
              ${Ze||Ve||ot||qt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${f.map(g=>`
                <div class="ludo-token token-${g.color} ${g.movable?"movable":""}" data-token-id="${g.id}" data-color="${g.color}" title="${g.color.toUpperCase()} Pawn ${g.id+1}">
                  <span>${g.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}const It=["","⚀","⚁","⚂","⚃","⚄","⚅"];function G(_){return!_||_.step===-1?"Base":_.step===56?"🏁 Home!":_.step>50?`H${_.step-50}`:`S${_.step}`}function xt(_,U,pe,Pe,je){const Ze=`${_}-yard`;return pe?`
          <div class="ludo-yard ${Ze} ${Ge===_?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${U}</span>
                ${Pe?`<small class="yard-player-lbl">${T(Pe.name)}${Pe.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${je.map((Ve,ot)=>`
                  <div class="yard-token-slot">
                    ${Ve.step===-1?`
                      <div class="ludo-token token-${_} ${Re(_,Ve)?"movable":""}" data-token-id="${Ve.id}" data-color="${_}" title="${_.toUpperCase()} Pawn ${Ve.id+1}">
                        <span>${Ve.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${ot+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `:`
            <div class="ludo-yard ${Ze}">
              <div class="yard-box decorative">
                <div class="yard-title">${U} (Inactive)</div>
              </div>
            </div>
          `}const Mt=X.find(_=>_.color==="red"),Kt=X.find(_=>_.color==="green"),zt=X.find(_=>_.color==="yellow"),Vt=X.find(_=>_.color==="blue");return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${xt("red","🔴 Red Base",W.includes("red"),Mt,ke)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${xt("green","🟢 Green Base",W.includes("green"),Kt,Le)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${xt("blue","🔵 Blue Base",W.includes("blue"),Vt,ge)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${xt("yellow","🟡 Yellow Base",W.includes("yellow"),zt,re)}

            <!-- 5. Center Home Victory Zone (3x3) -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${ke.filter(_=>_.step===56).map(_=>`<span class="tok-finished red" title="Red Pawn ${_.id+1} Home">🔴${_.id+1}</span>`).join("")}
                  ${Le.filter(_=>_.step===56).map(_=>`<span class="tok-finished green" title="Green Pawn ${_.id+1} Home">🟢${_.id+1}</span>`).join("")}
                  ${re.filter(_=>_.step===56).map(_=>`<span class="tok-finished yellow" title="Yellow Pawn ${_.id+1} Home">🟡${_.id+1}</span>`).join("")}
                  ${ge.filter(_=>_.step===56).map(_=>`<span class="tok-finished blue" title="Blue Pawn ${_.id+1} Home">🔵${_.id+1}</span>`).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${$t.join("")}
          </div>

          <!-- Ludo Action & Dice Roller Console -->
          <div class="ludo-console">
            <div class="ludo-dice-box">
              <div class="ludo-dice-visual ${Fe?"rolled":""}">
                ${Me?`<span class="dice-glyph">${It[Me]}</span>`:"🎲"}
              </div>
              ${Me?`<span class="dice-num-lbl">Rolled ${Me}</span>`:'<span class="dice-num-lbl">Ready</span>'}
            </div>

            <div class="ludo-controls-box">
              ${Ke&&!Fe&&l.status==="active"?`
                <button class="btn-ludo-roll pulse" id="btn-ludo-roll">🎲 Roll Dice</button>
              `:Ke&&Fe&&l.status==="active"?`
                <div class="ludo-prompt-text highlight">
                  ${ve(xe).some(_=>Re(xe,_))?"👉 Tap your <strong>glowing pawn</strong> to advance!":"No moves possible with this roll. Turn passing..."}
                </div>
              `:`
                <div class="ludo-prompt-text">
                  ${l.status==="active"?`⏳ Waiting for ${T(((Lt=X.find(_=>_.color===Ge))==null?void 0:Lt.name)||"opponent")} (${Ge.toUpperCase()})...`:"🏁 Match Concluded"}
                </div>
              `}

              <div class="ludo-status-banner">
                ${T(q.lastActionText||"Match in progress.")}
              </div>
            </div>
          </div>

          <!-- Token Progress Strip for all active players -->
          <div class="ludo-progress-strip">
            ${W.map(_=>{const U=X.find(je=>je.color===_),pe=ve(_),Pe={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[_];return`
                <div class="progress-pill ${_} ${Ge===_?"active-turn":""}">
                  <strong>${Pe} ${U?T(U.name):_.toUpperCase()}:</strong>
                  ${pe.map((je,Ze)=>`P${Ze+1}: ${G(je)}`).join(" · ")}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function oe(J,ie,V){var Le;u.querySelector("#btn-close-arena").onclick=S;const q=u.querySelector("#btn-arena-resign");q&&(q.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{q.disabled=!0,await _e(`/bonding/matches/${c}/action`,{action:"resign"}),await P(),R()}catch(re){I(re.message||"Resign failed","error"),q.disabled=!1}});const W=u.querySelector("#btn-arena-draw");W&&(W.onclick=async()=>{try{await _e(`/bonding/matches/${c}/action`,{action:"offer_draw"}),I("Draw offer sent to opponent","info"),await P(),R()}catch(re){I(re.message||"Draw offer failed","error")}});const X=u.querySelector("#btn-confirm-accept-draw");X&&(X.onclick=async()=>{try{await _e(`/bonding/matches/${c}/action`,{action:"accept_draw"}),I("Draw agreed!","info"),await P(),R()}catch(re){I(re.message,"error")}});const ue=u.querySelector("#btn-confirm-decline-draw");ue&&(ue.onclick=async()=>{try{await _e(`/bonding/matches/${c}/action`,{action:"decline_draw"}),await P(),R()}catch(re){I(re.message,"error")}}),[u.querySelector("#btn-arena-delete-match"),u.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(re=>{re.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{re.disabled=!0,await et(`/bonding/matches/${c}`),I("Match deleted","success"),S(),o==="lounge_games"&&await y()}catch(ge){I(ge.message||"Failed to delete match","error"),re.disabled=!1}}});const ke=u.querySelector("#btn-arena-rematch-action");if(ke&&(ke.onclick=async()=>{try{ke.disabled=!0,ke.textContent="Creating Rematch...";const re=await _e(`/bonding/matches/${c}/action`,{action:"rematch"});re.match&&(I("Rematch created! New match live ⚔️","success"),E&&clearInterval(E),ee(re.match._id))}catch(re){I(re.message||"Rematch failed","error"),ke.disabled=!1,ke.textContent="🔄 Request Rematch"}}),l.gameType==="chess"&&J&&l.status==="active"){const re=((Le=l.gameState)==null?void 0:Le.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",ge=new ua(re),we=V.assignedRole==="white"?"w":"b";u.querySelectorAll(".chess-sq").forEach(qe=>{qe.onclick=async()=>{const xe=qe.dataset.square;if(k){if(k===xe){k=null,m=[],R();return}if(m.includes(xe)){const Ke=ge.get(k);let Fe;Ke&&Ke.type==="p"&&(xe.endsWith("8")||xe.endsWith("1"))&&(Fe=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const Me={from:k,to:xe,promotion:Fe?Fe.toLowerCase():void 0};k=null,m=[],l=await _e(`/bonding/matches/${c}/move`,{move:Me}),R()}catch(Me){I(Me.message||"Illegal chess move","error"),k=null,m=[],R()}return}}const Ge=ge.get(xe);Ge&&Ge.color===we?(k=xe,m=ge.moves({square:xe,verbose:!0}).map(Fe=>Fe.to),R()):(k=null,m=[],R())}})}if(l.gameType==="tictactoe"&&J&&l.status==="active"&&u.querySelectorAll(".ttt-cell.empty").forEach(re=>{re.onclick=async()=>{const ge=re.dataset.cellIdx;try{re.style.opacity="0.5",l=await _e(`/bonding/matches/${c}/move`,{cellIndex:Number(ge)}),R()}catch(we){I(we.message||"Invalid move","error")}}}),l.gameType==="ludo"&&l.status==="active"){const re=u.querySelector("#btn-ludo-roll");re&&J&&(re.onclick=async()=>{try{re.disabled=!0,re.textContent="Rolling 🎲...",l=await _e(`/bonding/matches/${c}/move`,{action:"roll"}),R()}catch(ge){I(ge.message||"Failed to roll","error"),re.disabled=!1,re.textContent="🎲 Roll Dice"}}),J&&u.querySelectorAll(".ludo-token.movable").forEach(ge=>{ge.onclick=async we=>{we.stopPropagation();const qe=ge.dataset.tokenId;try{ge.style.opacity="0.5",l=await _e(`/bonding/matches/${c}/move`,{action:"move",tokenId:Number(qe)}),R()}catch(xe){I(xe.message||"Invalid token move","error"),ge.style.opacity="1"}}})}}R()}function L(){if(!n||n.type==="direct")return;const c=r.querySelector("#bonding-modals-root"),u=B=>B==="employee"||B==="admin"||B==="superadmin",l=n.members||[],k=new Set(l.map(B=>{var N;return(N=B.userId)==null?void 0:N.toString()})),m=p.filter(B=>u(B.role)&&!k.has(B._id.toString()));c.innerHTML=`
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
                  ${m.map(B=>`
                    <option value="${B._id}">${T(B.name)} (${T(B.role==="superadmin"?"Superadmin":B.role==="admin"?"Admin":"Employee")})</option>
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
                ${l.map(B=>{const N=(e==null?void 0:e._id)||(e==null?void 0:e.id),A=N&&B.userId&&B.userId.toString()===N.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(B.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${T(B.name)} ${A?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${T(B.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${B.userId}" data-name="${T(B.name)}">
                          ${A?"Leave Group":"Remove"}
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""};const P=c.querySelector("#btn-modal-delete-group");P&&(P.onclick=()=>{c.innerHTML="",O()});const S=c.querySelector("#btn-submit-add-member");S&&(S.onclick=async()=>{const N=c.querySelector("#sel-add-colleague").value;if(!N){I("Please select a colleague to add","warning");return}try{S.disabled=!0,S.textContent="Adding...";const A=await Ht(`/bonding/channels/${n._id}/members`,{action:"add",userIds:[N]});I("Colleague added to group! 🎉","success"),n=A.channel,c.innerHTML="",await Ee(n._id),Ae()}catch(A){I(A.message||"Failed to add member","error"),S.disabled=!1,S.textContent="Add to Group"}}),c.querySelectorAll(".btn-remove-member").forEach(B=>{B.onclick=async()=>{const N=B.dataset.userId,A=B.dataset.name;if(confirm(`Are you sure you want to remove ${A} from this group?`))try{B.disabled=!0;const oe=await Ht(`/bonding/channels/${n._id}/members`,{action:"remove",userId:N});I(`${A} removed from group`,"info"),n=oe.channel,c.innerHTML="",await Ee(n._id),Ae()}catch(oe){I(oe.message||"Failed to remove member","error"),B.disabled=!1}}})}async function O(){if(!n||n.type==="direct")return;const c=n.name;if(confirm(`Are you sure you want to delete the group "${c}"?

All messages in this lounge will be deleted.`))try{await et(`/bonding/channels/${n._id}`),I(`Group "${c}" deleted successfully`,"success"),i=await Ue("/bonding/channels").catch(()=>[]),n=i.find(l=>l.type==="group")||i[0]||null,We(),Ae(),n&&await Ee(n._id)}catch(l){I(l.message||"Failed to delete group","error")}}function F(){const c=r.querySelector("#bonding-modals-root"),u=m=>m==="employee"||m==="admin"||m==="superadmin",l=p.filter(m=>!m.isSelf&&u(m.role));c.innerHTML=`
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelectorAll(".bonding-user-pick-item").forEach(m=>{m.onclick=async()=>{const P=m.dataset.userId;try{const S=await _e("/bonding/channels",{type:"direct",targetUserId:P});c.innerHTML="",i=await Ue("/bonding/channels"),n=i.find(R=>R._id===S._id)||S,We(),Ae(),await Ee(n._id)}catch(S){I(S.message||"Failed to open personal chat","error")}}})}function v(){const c=r.querySelector("#bonding-modals-root"),u=S=>S==="employee"||S==="admin"||S==="superadmin",l=p.filter(S=>!S.isSelf&&u(S.role));c.innerHTML=`
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
                ${l.map(S=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${S._id}" />
                    <span>${T(S.name)} (${T(S.role==="superadmin"?"Superadmin":S.role==="admin"?"Admin":"Employee")})</span>
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelector("#btn-cancel-create-grp").onclick=()=>{c.innerHTML=""};let k="👥";const m=c.querySelectorAll(".avatar-opt");m.forEach(S=>{S.onclick=()=>{m.forEach(R=>R.classList.remove("active")),S.classList.add("active"),k=S.textContent.trim()}});const P=c.querySelector("#btn-confirm-create-grp");P.onclick=async()=>{const S=c.querySelector("#new-group-name"),R=c.querySelector("#new-group-desc"),B=S.value.trim();if(!B){I("Please enter a group name","warning"),S.focus();return}const N=c.querySelectorAll(".new-group-member-chk:checked"),A=Array.from(N).map(oe=>oe.value);try{P.disabled=!0,P.textContent="Creating...";const oe=await _e("/bonding/channels",{type:"group",name:B,description:R.value.trim(),avatar:k,memberIds:A});I(`Group "${B}" created! 🎉`,"success"),c.innerHTML="",i=await Ue("/bonding/channels"),n=i.find(J=>J._id===oe._id)||oe,We(),Ae(),await Ee(n._id)}catch(oe){I(oe.message||"Failed to create group","error"),P.disabled=!1,P.textContent="Create Group 🎉"}}}function se(c,u){const l=document.querySelector(".bonding-emoji-popup");l&&l.remove();const k=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],m=document.createElement("div");m.className="bonding-emoji-popup",m.innerHTML=k.map(R=>`<button class="emoji-opt-btn" data-e="${R}">${R}</button>`).join("");const P=c.getBoundingClientRect();m.style.top=`${P.bottom+window.scrollY+6}px`,m.style.left=`${P.left+window.scrollX}px`,document.body.appendChild(m),m.querySelectorAll(".emoji-opt-btn").forEach(R=>{R.onclick=B=>{B.stopPropagation(),u(R.dataset.e),m.remove()}});const S=R=>{m.contains(R.target)||(m.remove(),document.removeEventListener("click",S))};setTimeout(()=>document.addEventListener("click",S),10)}function de(c){if(!c)return"";try{return new Date(c).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Ua(){const r=document.getElementById("ci360-bonding-styles");r&&r.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}export{Ya as a,Va as i};
