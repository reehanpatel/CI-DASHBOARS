var fa=Object.defineProperty;var ma=(r,t,e)=>t in r?fa(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var ve=(r,t,e)=>ma(r,typeof t!="symbol"?t+"":t,e);import{c as Ke,h as P,e as E,n as ha,j as at,o as Bt,k as jt,g as we}from"./api-BLZ2PdTU.js";const sa={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function va(){try{const r=localStorage.getItem("ci360_planner_settings");if(r)return Object.assign({},sa,JSON.parse(r))}catch{}return Object.assign({},sa)}function xa(r){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(r))}catch{}}function Qe(){const r=new Date,t=r.getFullYear(),e=String(r.getMonth()+1).padStart(2,"0"),o=String(r.getDate()).padStart(2,"0");return`${t}-${e}-${o}`}function Nt(r,t){const e=new Date(r+"T00:00:00");e.setDate(e.getDate()+t);const o=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${o}-${s}-${n}`}function wt(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function it(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function la(r){return r?new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function Jt(r,t=1){const e=new Date(r+"T00:00:00"),o=e.getDay(),s=(o<t?7:0)+o-t,n=new Date(e);n.setDate(e.getDate()-s);const u=[];for(let a=0;a<7;a++){const h=new Date(n);h.setDate(n.getDate()+a);const C=h.getFullYear(),M=String(h.getMonth()+1).padStart(2,"0"),H=String(h.getDate()).padStart(2,"0");u.push(`${C}-${M}-${H}`)}return u}function ya(){try{const r=window.AudioContext||window.webkitAudioContext;if(!r)return;const t=new r,e=t.currentTime,o=t.createOscillator(),s=t.createGain();o.type="sine",o.frequency.setValueAtTime(523.25,e),o.frequency.exponentialRampToValueAtTime(783.99,e+.15),s.gain.setValueAtTime(.2,e),s.gain.exponentialRampToValueAtTime(.001,e+.35),o.connect(s),s.connect(t.destination),o.start(e),o.stop(e+.35)}catch{}}function Va(r,t={}){const{userRole:e="employee",currentUser:o=null,onNavigate:s=null}=t,n=e==="superadmin"||e==="admin";let u=va(),a={selectedDate:Qe(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};wa(),h();async function h(){a.loading=!0,C();try{const l=[Ke("/tasks")];n&&l.push(Ke("/personnel").catch(()=>[]));const[x,$]=await Promise.all(l);a.tasks=Array.isArray(x)?x:[],$&&(a.personnelList=Array.isArray($)?$:[])}catch(l){P("Failed to load planner tasks: "+l.message,!0)}finally{a.loading=!1,J()}}function C(){r.innerHTML=`
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
    `}function M(l){return a.tasks.filter(x=>{var w;if(x.isDeleted===!0)return!1;if(n&&a.selectedPersonnelId!=="all"){const y=((w=x.personnelId)==null?void 0:w._id)||x.personnelId;if(String(y)!==String(a.selectedPersonnelId))return!1}const $=x.dateStr||(x.dueDate?new Date(x.dueDate).toISOString().slice(0,10):"");return $?$===l:l===Qe()})}function H(l,x){if(l.status==="Completed")return!1;const $=l.dateStr||(l.dueDate?new Date(l.dueDate).toISOString().slice(0,10):"");return $?$<x:!1}function A(l,x){const $=l.length,w=l.filter(Z=>Z.status==="Completed").length,y=l.filter(Z=>Z.status==="In Progress").length,z=l.filter(Z=>Z.status==="Pending"||Z.status==="Todo").length,X=l.filter(Z=>H(Z,x)).length,ne=$>0?Math.round(w/$*100):0;return{total:$,completed:w,inProgress:y,pending:z,overdue:X,percent:ne}}function J(){const l=Qe(),x=a.selectedDate===l,$=M(a.selectedDate),w=A($,l);r.innerHTML=`
      <div class="ci360-planner-wrap ${u.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${it(a.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${E(u.displayName||"Daily Planner")}</h1>
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
              <span class="date-text" id="displayDateLabel">${wt(a.selectedDate)}</span>
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
                    ${E(y.name)} (${E(y.department||y.role||"Team")})
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
          ${K($,w)}
        </main>

      </div>
    `,Te(),xt()}function K(l,x){return a.viewMode==="weekly"?vt():a.viewMode==="report"?ct():me(l,x)}function me(l,x){const $=Qe();let w=l;if(a.filterStatus==="pending"?w=w.filter(y=>y.status==="Pending"||y.status==="Todo"):a.filterStatus==="in_progress"?w=w.filter(y=>y.status==="In Progress"):a.filterStatus==="completed"?w=w.filter(y=>y.status==="Completed"):a.filterStatus==="overdue"&&(w=w.filter(y=>H(y,$))),a.searchQuery){const y=a.searchQuery.toLowerCase();w=w.filter(z=>(z.title||"").toLowerCase().includes(y)||(z.description||"").toLowerCase().includes(y)||(z.category||"").toLowerCase().includes(y))}return w.sort((y,z)=>{if(y.status==="Completed"&&z.status!=="Completed")return 1;if(y.status!=="Completed"&&z.status==="Completed")return-1;const X={Urgent:0,High:1,Medium:2,Low:3};return(X[y.priority]||2)-(X[z.priority]||2)}),`
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
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${E(a.searchQuery)}">
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
          ${w.length===0?be():`
            <div class="ci360-task-list">
              ${w.map(y=>Ne(y,$)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function be(){return`
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
    `}function Ne(l,x){var X,ne,Z,L;const $=l.status==="Completed",w=H(l,x),y=`pri-${(l.priority||"medium").toLowerCase()}`,z=`status-${(l.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${$?"is-completed":""} ${w?"is-overdue":""}" data-id="${l._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${$?"checked":""}" data-action="toggle" data-id="${l._id}" title="${$?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${E(l.title)}</span>
          </div>

          ${l.description?`
            <div class="ci360-task-desc">${E(l.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${y}">
              <span class="badge-dot"></span>
              ${E(l.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${z}">
              ${E(l.status||"Pending")}
            </span>

            <!-- Category -->
            ${l.category?`
              <span class="ci360-badge category-badge">
                #${E(l.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${l.startTime||l.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${l.startTime?E(l.startTime):""}
                   ${l.startTime&&l.dueTime?"–":""}
                   ${l.dueTime?E(l.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${w?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${n&&((X=l.personnelId)!=null&&X.name||(ne=l.userId)!=null&&ne.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${E(((Z=l.personnelId)==null?void 0:Z.name)||((L=l.userId)==null?void 0:L.name))}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${l._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${l._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function vt(){const l=Jt(a.selectedDate,u.weekStartsOn),x=it(l[0]),$=it(l[6]),w=Qe();return`
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
          ${l.map(y=>{const z=y===w,X=y===a.selectedDate,ne=M(y),Z=A(ne,w);return`
              <div class="ci360-day-column ${z?"is-today":""} ${X?"is-selected":""}" data-date="${y}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${y}">
                  <div class="day-name">${la(y)}</div>
                  <div class="day-number">${new Date(y+"T00:00:00").getDate()}</div>
                  ${z?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${Z.completed}/${Z.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${Z.percent}%"></div>
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
                        <div class="mini-title">${E(L.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(L.priority||"medium").toLowerCase()}">${L.priority||"Med"}</span>
                          ${L.dueTime?`<span class="mini-time">${E(L.dueTime)}</span>`:""}
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
    `}function ct(){const l=Jt(a.selectedDate,u.weekStartsOn),x=wt(l[0]),$=wt(l[6]),w=Qe(),y=a.tasks.filter(U=>{if(U.isDeleted===!0)return!1;const F=U.dateStr||(U.dueDate?new Date(U.dueDate).toISOString().slice(0,10):"");return l.includes(F)}),z=y.length,X=y.filter(U=>U.status==="Completed").length,ne=y.filter(U=>U.status==="In Progress").length,Z=z>0?Math.round(X/z*100):0,L={Urgent:0,High:0,Medium:0,Low:0};return y.forEach(U=>{const F=U.priority||"Medium";L[F]!==void 0&&L[F]++}),`
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
            <span class="value" style="font-size:28px;color:var(--green-500)">${X}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${ne}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${Z}%</span>
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
                ${l.map(U=>{const F=M(U),v=A(F,w);return`
                    <tr>
                      <td><strong>${la(U)}</strong></td>
                      <td>${it(U)}</td>
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
    `}function Te(){const l=document.getElementById("btnViewDaily"),x=document.getElementById("btnViewWeekly"),$=document.getElementById("btnViewReport");l&&(l.onclick=()=>{a.viewMode="daily",J()}),x&&(x.onclick=()=>{a.viewMode="weekly",J()}),$&&($.onclick=()=>{a.viewMode="report",J()});const w=document.getElementById("btnPrevDay"),y=document.getElementById("btnNextDay"),z=document.getElementById("btnJumpToday"),X=document.getElementById("hiddenDateInput"),ne=document.getElementById("datePickerBadge");w&&(w.onclick=()=>{a.selectedDate=Nt(a.selectedDate,-1),J()}),y&&(y.onclick=()=>{a.selectedDate=Nt(a.selectedDate,1),J()}),z&&(z.onclick=()=>{a.selectedDate=Qe(),J()}),ne&&X&&(ne.onclick=()=>{try{typeof X.showPicker=="function"?X.showPicker():X.focus()}catch{X.focus()}},X.onchange=ce=>{ce.target.value&&(a.selectedDate=ce.target.value,J())});const Z=document.getElementById("admTeamSelect");Z&&(Z.onchange=ce=>{a.selectedPersonnelId=ce.target.value,J()});const L=document.getElementById("btnOpenAddTaskModal");L&&(L.onclick=()=>Ee());const U=document.getElementById("btnPlannerActionsMenu"),F=document.getElementById("plannerActionsDropdown");U&&F&&(U.onclick=ce=>{ce.stopPropagation(),F.classList.toggle("hidden")},document.addEventListener("click",ce=>{!F.contains(ce.target)&&ce.target!==U&&F.classList.add("hidden")}));const v=document.getElementById("btnActionImport");v&&(v.onclick=()=>{F==null||F.classList.add("hidden"),Ze()});const ie=document.getElementById("btnActionExportPng");ie&&(ie.onclick=()=>{F==null||F.classList.add("hidden"),et()});const le=document.getElementById("btnActionExportPdf");le&&(le.onclick=()=>{F==null||F.classList.add("hidden"),pt()});const fe=document.getElementById("btnActionBackup");fe&&(fe.onclick=()=>{F==null||F.classList.add("hidden"),gt()});const se=document.getElementById("btnActionSettings");se&&(se.onclick=()=>{F==null||F.classList.add("hidden"),ut()})}function xt(l){if(a.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(L=>{L.onclick=()=>{a.filterStatus=L.dataset.f,J()}});const x=document.getElementById("plannerTaskSearchInp");x&&(x.oninput=L=>{a.searchQuery=L.target.value,J()});const $=document.getElementById("btnClearSearch");$&&($.onclick=()=>{a.searchQuery="",J()});const w=document.getElementById("quickAddTitleInp"),y=document.getElementById("quickAddPriority"),z=document.getElementById("quickAddCategory"),X=document.getElementById("btnQuickAddSubmit"),ne=async()=>{const L=((w==null?void 0:w.value)||"").trim();if(!L){P("Please enter a task title",!0),w==null||w.focus();return}try{const U={title:L,dateStr:a.selectedDate,priority:(y==null?void 0:y.value)||u.defaultPriority,category:(z==null?void 0:z.value)||"General",status:"Pending"};n&&a.selectedPersonnelId!=="all"&&(U.personnelId=a.selectedPersonnelId);const F=await we("/tasks",U);a.tasks.unshift(F),P("Task added to today's focus! ✨"),w&&(w.value="",w.focus()),J()}catch(U){P(U.message,!0)}};X&&(X.onclick=ne),w&&(w.onkeydown=L=>{L.key==="Enter"&&ne()});const Z=document.getElementById("btnEmptyStateImport");Z&&(Z.onclick=()=>Ze())}if(a.viewMode==="weekly"){const x=document.getElementById("btnPrevWeek"),$=document.getElementById("btnNextWeek"),w=document.getElementById("btnThisWeek");x&&(x.onclick=()=>{a.selectedDate=Nt(a.selectedDate,-7),J()}),$&&($.onclick=()=>{a.selectedDate=Nt(a.selectedDate,7),J()}),w&&(w.onclick=()=>{a.selectedDate=Qe(),J()}),document.querySelectorAll(".day-col-header").forEach(y=>{y.onclick=()=>{a.selectedDate=y.dataset.date,a.viewMode="daily",J()}}),document.querySelectorAll('[data-action="add-day"]').forEach(y=>{y.onclick=()=>{Ee(null,y.dataset.date)}})}if(a.viewMode==="report"){const x=document.getElementById("btnDownloadWeeklyPdf");x&&(x.onclick=pt)}r.querySelectorAll('[data-action="toggle"]').forEach(x=>{x.onclick=async $=>{$.stopPropagation();const w=x.dataset.id;await Ve(w)}}),r.querySelectorAll('[data-action="edit"]').forEach(x=>{x.onclick=$=>{$.stopPropagation();const w=x.dataset.id,y=a.tasks.find(z=>z._id===w);y&&Ee(y)}}),r.querySelectorAll('[data-action="delete"]').forEach(x=>{x.onclick=async $=>{$.stopPropagation();const w=x.dataset.id;await $t(w)}})}async function Ve(l){const x=a.tasks.find(w=>w._id===l);if(!x)return;const $=x.status!=="Completed";try{const w=await ha(`/tasks/${l}/toggle`,{}),y=a.tasks.findIndex(z=>z._id===l);y!==-1&&(a.tasks[y]=w),$?(u.soundEnabled&&ya(),P("Task marked as completed! 🎉")):P("Task reopened as pending."),J()}catch(w){P(w.message,!0)}}async function $t(l){const x=a.tasks.find($=>$._id===l);if(x&&confirm(`Are you sure you want to remove "${x.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await at(`/tasks/${l}`),a.tasks=a.tasks.filter($=>$._id!==l),P("Task removed from planner (safely stored in database archive)"),J()}catch($){P($.message,!0)}}function Ee(l=null,x=null){const $=!!l,w=l?l.dateStr||(l.dueDate?new Date(l.dueDate).toISOString().slice(0,10):a.selectedDate):x||a.selectedDate,y=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${$?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${E((l==null?void 0:l.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${E((l==null?void 0:l.description)||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${w}" required>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${(l==null?void 0:l.startTime)||""}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${(l==null?void 0:l.dueTime)||""}">
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${(l==null?void 0:l.priority)==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!l&&u.defaultPriority==="Medium"||(l==null?void 0:l.priority)==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!l&&u.defaultPriority==="High"||(l==null?void 0:l.priority)==="High"?"selected":""}>High</option>
                <option value="Urgent" ${(l==null?void 0:l.priority)==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${(l==null?void 0:l.status)==="Pending"||(l==null?void 0:l.status)==="Todo"||!l?"selected":""}>Pending</option>
                <option value="In Progress" ${(l==null?void 0:l.status)==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${(l==null?void 0:l.status)==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${E((l==null?void 0:l.category)||"General")}">
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
                <option value="all" ${!l||l!=null&&l.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${a.personnelList.map(U=>{var v;const F=((v=l==null?void 0:l.personnelId)==null?void 0:v._id)===U._id||(l==null?void 0:l.personnelId)===U._id;return`<option value="${U._id}" ${F?"selected":""}>${E(U.name)} (${E(U.department||U.role||"Member")})</option>`}).join("")}
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
    `,z=Bt(y),X=z.querySelector("#taskForm"),ne=z.querySelector("#btnModalClose"),Z=z.querySelector("#btnCancelModal"),L=()=>z.remove();ne&&(ne.onclick=L),Z&&(Z.onclick=L),X.onsubmit=async U=>{var k;U.preventDefault();const F=z.querySelector("#taskTitle").value.trim(),v=z.querySelector("#taskDesc").value.trim(),ie=z.querySelector("#taskDate").value,le=z.querySelector("#taskStartTime").value.trim(),fe=z.querySelector("#taskDueTime").value.trim(),se=z.querySelector("#taskPriority").value,ce=z.querySelector("#taskStatus").value,c=z.querySelector("#taskCategory").value.trim()||"General";if(!F){P("Task title is required",!0);return}const p={title:F,description:v,dateStr:ie,startTime:le,dueTime:fe,priority:se,status:ce,category:c};if(n){const m=(k=z.querySelector("#taskAssignee"))==null?void 0:k.value;m==="all"?(p.assignAll=!0,p.personnelId="all"):m&&(p.personnelId=m)}const i=z.querySelector("#btnSaveTask");i.disabled=!0,i.textContent="Saving...";try{if($){const m=await jt(`/tasks/${l._id}`,p),D=a.tasks.findIndex(S=>S._id===l._id);D!==-1&&(a.tasks[D]=m),P("Task updated successfully! ✍️")}else{const m=await we("/tasks",p);Array.isArray(m.tasks)?m.tasks.forEach(D=>a.tasks.unshift(D)):a.tasks.unshift(m),P("Task created successfully! ✨")}L(),J()}catch(m){P(m.message,!0),i.disabled=!1,i.textContent=$?"Save Changes":"Create Task"}}}function Ze(){let l=[];const x=`
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
    `,$=Bt(x),w=()=>$.remove();$.querySelector("#btnImportClose").onclick=w,$.querySelector("#btnCancelImport").onclick=w;const y=$.querySelector("#importTextarea"),z=$.querySelector("#importFileInput"),X=$.querySelector("#importDropzone"),ne=$.querySelector("#previewListArea"),Z=$.querySelector("#previewCountLabel"),L=$.querySelector("#btnConfirmImport"),U=$.querySelector("#importFileInfo");function F(ie){if(!ie)return[];const le=ie.split(/\r?\n/),fe=[];for(let se of le)se=se.trim(),se&&(se=se.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),se=se.replace(/^[-*•]\s+/,""),se=se.replace(/^\d+[\.\)]\s+/,""),se=se.trim(),se&&fe.push(se));return fe}function v(){const ie=y.value,le=F(ie),fe=$.querySelector("#importTargetDate").value,se=M(fe),ce=new Set(se.map(c=>(c.title||"").trim().toLowerCase()));l=[];for(const c of le){const p=ce.has(c.toLowerCase());l.push({title:c,isDuplicate:p})}if(Z.textContent=`Preview (${l.length} ${l.length===1?"task":"tasks"} found)`,L.disabled=l.length===0,L.textContent=`Import ${l.length} ${l.length===1?"Task":"Tasks"}`,l.length===0){ne.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}ne.innerHTML=l.map((c,p)=>`
        <div class="preview-item ${c.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${p+1}.</span>
          <span class="preview-title">${E(c.title)}</span>
          ${c.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}y.oninput=v,X.onclick=()=>z.click(),z.onchange=ie=>{const le=ie.target.files[0];if(!le)return;U.textContent=`File selected: ${le.name} (${Math.round(le.size/1024)} KB)`;const fe=new FileReader;fe.onload=se=>{y.value=se.target.result,v()},fe.readAsText(le)},X.ondragover=ie=>{ie.preventDefault(),X.classList.add("dragover")},X.ondragleave=()=>X.classList.remove("dragover"),X.ondrop=ie=>{ie.preventDefault(),X.classList.remove("dragover");const le=ie.dataTransfer.files[0];if(le&&(le.type==="text/plain"||le.name.endsWith(".txt"))){U.textContent=`File dropped: ${le.name}`;const fe=new FileReader;fe.onload=se=>{y.value=se.target.result,v()},fe.readAsText(le)}else P("Please drop a valid .txt plain-text file",!0)},L.onclick=async()=>{if(l.length===0)return;L.disabled=!0,L.textContent="Importing...";const ie=$.querySelector("#importTargetDate").value,le=$.querySelector("#importPriority").value,fe=$.querySelector("#importCategory").value.trim()||"General",se={date:ie,tasks:l.map(ce=>({title:ce.title,priority:le,category:fe,status:"Pending"}))};n&&a.selectedPersonnelId!=="all"&&(se.personnelId=a.selectedPersonnelId);try{const ce=await we("/tasks/bulk-import",se);Array.isArray(ce.tasks)&&ce.tasks.forEach(c=>a.tasks.unshift(c)),P(`Imported ${ce.importedCount} tasks successfully! (${ce.skippedCount} skipped duplicates)`),w(),a.selectedDate=ie,J()}catch(ce){P(ce.message,!0),L.disabled=!1,L.textContent="Retry Import"}}}async function et(){const l=M(a.selectedDate),x=A(l,Qe()),$=wt(a.selectedDate),w=2,y=800,z=160,X=90,ne=65,Z=70,L=Math.max(120,l.length*ne),U=z+X+L+Z,F=document.createElement("canvas");F.width=y*w,F.height=U*w;const v=F.getContext("2d");v.scale(w,w);const ie=document.documentElement.getAttribute("data-theme")==="dark",le=ie?"#0F172A":"#F8FAFC",fe=ie?"#1E293B":"#FFFFFF",se=ie?"#334155":"#E2E8F0",ce=ie?"#F8FAFC":"#0F172A",c=ie?"#94A3B8":"#475569",p="#4F46E5",i="#10B981",k="#F59E0B";v.fillStyle=le,v.fillRect(0,0,y,U),v.fillStyle=fe,tt(v,24,20,y-48,z-30,16),v.fill(),v.strokeStyle=se,v.lineWidth=1,v.stroke(),v.fillStyle=p,v.font="bold 12px Inter, sans-serif",v.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),v.fillStyle=ce,v.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',v.fillText($,44,86),v.fillStyle=c,v.font="13px Inter, sans-serif",v.fillText(`Planned focus list · ${x.completed} of ${x.total} tasks completed (${x.percent}%)`,44,114);const m=z+6;v.fillStyle=fe,tt(v,24,m,y-48,X-16,12),v.fill(),v.stroke();const D=[{label:"TOTAL TASKS",val:String(x.total),color:ce},{label:"COMPLETED",val:String(x.completed),color:i},{label:"IN PROGRESS",val:String(x.inProgress),color:k},{label:"PENDING",val:String(x.pending),color:c},{label:"PROGRESS",val:`${x.percent}%`,color:p}],S=(y-48)/D.length;D.forEach((N,T)=>{const oe=24+T*S+20;v.fillStyle=N.color,v.font="bold 20px Inter, sans-serif",v.fillText(N.val,oe,m+36),v.fillStyle=c,v.font="10px Inter, sans-serif",v.fillText(N.label,oe,m+54)});const B=m+X;v.fillStyle=fe,tt(v,24,B,y-48,L+10,16),v.fill(),v.stroke(),l.length===0?(v.fillStyle=c,v.font="14px Inter, sans-serif",v.textAlign="center",v.fillText("No scheduled tasks recorded for this date.",y/2,B+60),v.textAlign="left"):l.forEach((N,T)=>{const oe=B+16+T*ne,xe=N.status==="Completed";v.beginPath(),v.arc(48,oe+14,10,0,Math.PI*2),xe?(v.fillStyle=i,v.fill(),v.strokeStyle="#FFFFFF",v.lineWidth=2,v.beginPath(),v.moveTo(44,oe+14),v.lineTo(47,oe+17),v.lineTo(52,oe+11),v.stroke()):(v.strokeStyle=se,v.lineWidth=2,v.stroke()),v.fillStyle=xe?c:ce,v.font=`${xe?"normal":"500"} 14px Inter, sans-serif`;const j=N.title.length>55?N.title.slice(0,52)+"...":N.title;if(v.fillText(j,70,oe+18),xe){const de=v.measureText(j);v.strokeStyle=c,v.lineWidth=1.2,v.beginPath(),v.moveTo(70,oe+14),v.lineTo(70+de.width,oe+14),v.stroke()}const Y=N.priority||"Medium";let q="#E2E8F0",W="#334155";Y==="Urgent"?(q="#FEE2E2",W="#DC2626"):Y==="High"?(q="#FEF3C7",W="#D97706"):Y==="Low"&&(q="#ECFDF5",W="#059669"),v.fillStyle=q,tt(v,y-150,oe+4,60,20,10),v.fill(),v.fillStyle=W,v.font="bold 10px Inter, sans-serif",v.fillText(Y,y-138,oe+18);const te=N.dueTime?`🕒 ${N.dueTime}`:N.category||"General";v.fillStyle=c,v.font="11px Inter, sans-serif",v.fillText(te,70,oe+34),T<l.length-1&&(v.strokeStyle=se,v.lineWidth=.6,v.beginPath(),v.moveTo(40,oe+48),v.lineTo(y-40,oe+48),v.stroke())});const R=U-35;v.fillStyle=c,v.font="11px Inter, sans-serif",v.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,R);try{const N=F.toDataURL("image/png"),T=document.createElement("a");T.href=N,T.download=`ci360-daily-planner-${a.selectedDate}.png`,document.body.appendChild(T),T.click(),T.remove(),P("Daily Planner image exported! 🖼️")}catch(N){P("Failed to export image: "+N.message,!0)}}function tt(l,x,$,w,y,z){l.beginPath(),l.moveTo(x+z,$),l.lineTo(x+w-z,$),l.quadraticCurveTo(x+w,$,x+w,$+z),l.lineTo(x+w,$+y-z),l.quadraticCurveTo(x+w,$+y,x+w-z,$+y),l.lineTo(x+z,$+y),l.quadraticCurveTo(x,$+y,x,$+y-z),l.lineTo(x,$+z),l.quadraticCurveTo(x,$,x+z,$),l.closePath()}function pt(){const l=Jt(a.selectedDate,u.weekStartsOn),x=wt(l[0]),$=wt(l[6]);Qe();const w=a.tasks.filter(L=>{if(L.isDeleted===!0)return!1;const U=L.dateStr||(L.dueDate?new Date(L.dueDate).toISOString().slice(0,10):"");return l.includes(U)}),y=w.length,z=w.filter(L=>L.status==="Completed").length,X=y>0?Math.round(z/y*100):0,ne=window.open("","_blank");if(!ne){P("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const Z=`
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
            <div class="kpi-num" style="color:#4f46e5">${X}%</div>
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
            ${l.map(L=>{const U=M(L);return U.length===0?`<tr><td><strong>${it(L)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:U.map(F=>`
                <tr>
                  <td><strong>${it(L)}</strong></td>
                  <td>${E(F.title)}</td>
                  <td><span class="badge badge-${(F.priority||"medium").toLowerCase().slice(0,3)}">${F.priority||"Medium"}</span></td>
                  <td>${E(F.category||"General")}</td>
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
    `;ne.document.write(Z),ne.document.close(),P("Weekly PDF report generated for printing! 📄")}function gt(){const x=Bt(`
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
    `),$=()=>x.remove();x.querySelector("#btnBackupClose").onclick=$;const w=x.querySelector("#btnDownloadBackupJson");w.onclick=async()=>{w.disabled=!0,w.textContent="Generating backup...";try{const L=await Ke("/tasks/backup"),U=new Blob([JSON.stringify(L,null,2)],{type:"application/json"}),F=URL.createObjectURL(U),v=document.createElement("a");v.href=F,v.download=`ci360-planner-backup-${Qe()}.json`,document.body.appendChild(v),v.click(),v.remove(),P("Planner backup downloaded successfully! 💾")}catch(L){P("Backup export failed: "+L.message,!0)}finally{w.disabled=!1,w.textContent="Download JSON Backup"}};const y=x.querySelector("#restoreFileInput"),z=x.querySelector("#restorePreviewArea"),X=x.querySelector("#restoreCountText"),ne=x.querySelector("#btnExecuteRestore");let Z=null;y.onchange=L=>{const U=L.target.files[0];if(!U)return;const F=new FileReader;F.onload=v=>{try{const ie=JSON.parse(v.target.result),le=Array.isArray(ie.tasks)?ie.tasks:Array.isArray(ie)?ie:null;if(!le||le.length===0){P("Invalid backup file: No tasks found",!0);return}Z=le,z.style.display="block",X.textContent=`Valid backup: ${le.length} tasks ready to restore.`,ne.disabled=!1}catch(ie){P("Error parsing JSON backup file: "+ie.message,!0),z.style.display="none",ne.disabled=!0}},F.readAsText(U)},ne.onclick=async()=>{var U;if(!Z||Z.length===0)return;ne.disabled=!0,ne.textContent="Restoring...";const L=((U=x.querySelector('input[name="restoreMode"]:checked'))==null?void 0:U.value)||"merge";try{const F=await we("/tasks/restore",{tasks:Z,mode:L});P(`Restored ${F.restoredCount} tasks! (${F.skippedCount} skipped) ✨`),$(),await h()}catch(F){P("Restore failed: "+F.message,!0),ne.disabled=!1,ne.textContent="Retry Restore"}}}function ut(){const l=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${E(u.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${u.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${u.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${E(u.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${u.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${u.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${u.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${u.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${u.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${u.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${u.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,x=Bt(l),$=()=>x.remove();x.querySelector("#btnSettingsClose").onclick=$,x.querySelector("#btnCancelSettings").onclick=$,x.querySelector("#settingsForm").onsubmit=w=>{w.preventDefault(),u.displayName=x.querySelector("#setDisplayName").value.trim()||"Daily Planner",u.weekStartsOn=Number(x.querySelector("#setWeekStart").value),u.defaultPriority=x.querySelector("#setDefaultPriority").value,u.density=x.querySelector("#setDensity").value,u.soundEnabled=x.querySelector("#setSound").checked,xa(u),P("Planner preferences saved! ⚙️"),$(),J()}}}function wa(){if(document.getElementById("ci360-planner-styles"))return;const r=document.createElement("style");r.id="ci360-planner-styles",r.textContent=`
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
  `,document.head.appendChild(r)}function ka(r){return r!==null?{comment:r,variations:[]}:{variations:[]}}function $a(r,t,e,o,s){const n={move:r,variations:s};return t&&(n.suffix=t),e&&(n.nag=e),o!==null&&(n.comment=o),n}function Sa(...r){const[t,...e]=r;let o=t;for(const s of e)s!==null&&(o.variations=[s,...s.variations],s.variations=[],o=s);return t}function _a(r,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const o=e.variations[0];if(!o){e.comment=t.marker.comment;break}e=o}}return{headers:r,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ca(r,t){function e(){this.constructor=r}e.prototype=t.prototype,r.prototype=new e}function kt(r,t,e,o){var s=Error.call(this,r);return Object.setPrototypeOf&&Object.setPrototypeOf(s,kt.prototype),s.expected=t,s.found=e,s.location=o,s.name="SyntaxError",s}Ca(kt,Error);function Xt(r,t,e){return e=e||" ",r.length>t?r:(t-=r.length,e+=e.repeat(t),r+e.slice(0,t))}kt.prototype.format=function(r){var t="Error: "+this.message;if(this.location){var e=null,o;for(o=0;o<r.length;o++)if(r[o].source===this.location.source){e=r[o].text.split(/\r\n|\n|\r/g);break}var s=this.location.start,n=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(s):s,u=this.location.source+":"+n.line+":"+n.column;if(e){var a=this.location.end,h=Xt("",n.line.toString().length," "),C=e[s.line-1],M=s.line===a.line?a.column:C.length+1,H=M-s.column||1;t+=`
 --> `+u+`
`+h+` |
`+n.line+" | "+C+`
`+h+" | "+Xt("",s.column-1," ")+Xt("",H,"^")}else t+=`
 at `+u}return t};kt.buildMessage=function(r,t){var e={literal:function(C){return'"'+s(C.text)+'"'},class:function(C){var M=C.parts.map(function(H){return Array.isArray(H)?n(H[0])+"-"+n(H[1]):n(H)});return"["+(C.inverted?"^":"")+M.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(C){return C.description}};function o(C){return C.charCodeAt(0).toString(16).toUpperCase()}function s(C){return C.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(M){return"\\x0"+o(M)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(M){return"\\x"+o(M)})}function n(C){return C.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(M){return"\\x0"+o(M)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(M){return"\\x"+o(M)})}function u(C){return e[C.type](C)}function a(C){var M=C.map(u),H,A;if(M.sort(),M.length>0){for(H=1,A=1;H<M.length;H++)M[H-1]!==M[H]&&(M[A]=M[H],A++);M.length=A}switch(M.length){case 1:return M[0];case 2:return M[0]+" or "+M[1];default:return M.slice(0,-1).join(", ")+", or "+M[M.length-1]}}function h(C){return C?'"'+s(C)+'"':"end of input"}return"Expected "+a(r)+" but "+h(t)+" found."};function Aa(r,t){t=t!==void 0?t:{};var e={},o=t.grammarSource,s={pgn:bt},n=bt,u="[",a='"',h="]",C=".",M="O-O-O",H="O-O",A="0-0-0",J="0-0",K="$",me="{",be="}",Ne=";",vt="(",ct=")",Te="1-0",xt="0-1",Ve="1/2-1/2",$t="*",Ee=/^[a-zA-Z]/,Ze=/^[^"]/,et=/^[0-9]/,tt=/^[.]/,pt=/^[a-zA-Z1-8\-=]/,gt=/^[+#]/,ut=/^[!?]/,l=/^[^}]/,x=/^[^\r\n]/,$=/^[ \t\r\n]/,w=Be("tag pair"),y=$e("[",!1),z=$e('"',!1),X=$e("]",!1),ne=Be("tag name"),Z=je([["a","z"],["A","Z"]],!1,!1),L=Be("tag value"),U=je(['"'],!0,!1),F=Be("move number"),v=je([["0","9"]],!1,!1),ie=$e(".",!1),le=je(["."],!1,!1),fe=Be("standard algebraic notation"),se=$e("O-O-O",!1),ce=$e("O-O",!1),c=$e("0-0-0",!1),p=$e("0-0",!1),i=je([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),k=je(["+","#"],!1,!1),m=Be("suffix annotation"),D=je(["!","?"],!1,!1),S=Be("NAG"),B=$e("$",!1),R=Be("brace comment"),N=$e("{",!1),T=je(["}"],!0,!1),oe=$e("}",!1),xe=Be("rest of line comment"),j=$e(";",!1),Y=je(["\r",`
`],!0,!1),q=Be("variation"),W=$e("(",!1),te=$e(")",!1),de=Be("game termination marker"),_e=$e("1-0",!1),Ce=$e("0-1",!1),ye=$e("1/2-1/2",!1),qe=$e("*",!1),re=Be("whitespace"),ge=je([" ","	","\r",`
`],!1,!1),ke=function(d,g){return _a(d,g)},Re=function(d){return Object.fromEntries(d)},he=function(d,g){return[d,g]},Ue=function(d,g){return{root:d,marker:g}},Ye=function(d,g){return Sa(ka(d),...g.flat())},Fe=function(d,g,f,O,Q){return $a(d,g,f,O,Q)},ze=function(d){return d},nt=function(d){return d.replace(/[\r\n]+/g," ")},Et=function(d){return d.trim()},Pt=function(d){return d},Dt=function(d,g){return{result:d,comment:g}},b=t.peg$currPos|0,rt=[{line:1,column:1}],Oe=b,ot=t.peg$maxFailExpected||[],I=t.peg$silentFails|0,Je;if(t.startRule){if(!(t.startRule in s))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');n=s[t.startRule]}function $e(d,g){return{type:"literal",text:d,ignoreCase:g}}function je(d,g,f){return{type:"class",parts:d,inverted:g,ignoreCase:f}}function It(){return{type:"end"}}function Be(d){return{type:"other",description:d}}function St(d){var g=rt[d],f;if(g)return g;if(d>=rt.length)f=rt.length-1;else for(f=d;!rt[--f];);for(g=rt[f],g={line:g.line,column:g.column};f<d;)r.charCodeAt(f)===10?(g.line++,g.column=1):g.column++,f++;return rt[d]=g,g}function _t(d,g,f){var O=St(d),Q=St(g),ue={source:o,start:{offset:d,line:O.line,column:O.column},end:{offset:g,line:Q.line,column:Q.column}};return ue}function V(d){b<Oe||(b>Oe&&(Oe=b,ot=[]),ot.push(d))}function Wt(d,g,f){return new kt(kt.buildMessage(d,g),d,g,f)}function bt(){var d,g,f;return d=b,g=Kt(),f=zt(),d=ke(g,f),d}function Kt(){var d,g,f;for(d=b,g=[],f=Mt();f!==e;)g.push(f),f=Mt();return f=Ie(),d=Re(g),d}function Mt(){var d,g,f,O,Q,ue,ft;return I++,d=b,Ie(),r.charCodeAt(b)===91?(g=u,b++):(g=e,I===0&&V(y)),g!==e?(Ie(),f=Vt(),f!==e?(Ie(),r.charCodeAt(b)===34?(O=a,b++):(O=e,I===0&&V(z)),O!==e?(Q=Yt(),r.charCodeAt(b)===34?(ue=a,b++):(ue=e,I===0&&V(z)),ue!==e?(Ie(),r.charCodeAt(b)===93?(ft=h,b++):(ft=e,I===0&&V(X)),ft!==e?d=he(f,Q):(b=d,d=e)):(b=d,d=e)):(b=d,d=e)):(b=d,d=e)):(b=d,d=e),I--,d===e&&I===0&&V(w),d}function Vt(){var d,g,f;if(I++,d=b,g=[],f=r.charAt(b),Ee.test(f)?b++:(f=e,I===0&&V(Z)),f!==e)for(;f!==e;)g.push(f),f=r.charAt(b),Ee.test(f)?b++:(f=e,I===0&&V(Z));else g=e;return g!==e?d=r.substring(d,b):d=g,I--,d===e&&(g=e,I===0&&V(ne)),d}function Yt(){var d,g,f;for(I++,d=b,g=[],f=r.charAt(b),Ze.test(f)?b++:(f=e,I===0&&V(U));f!==e;)g.push(f),f=r.charAt(b),Ze.test(f)?b++:(f=e,I===0&&V(U));return d=r.substring(d,b),I--,g=e,I===0&&V(L),d}function zt(){var d,g,f;return d=b,g=_(),Ie(),f=Qt(),f===e&&(f=null),Ie(),d=Ue(g,f),d}function _(){var d,g,f,O;for(d=b,g=We(),g===e&&(g=null),f=[],O=G();O!==e;)f.push(O),O=G();return d=Ye(g,f),d}function G(){var d,g,f,O,Q,ue,ft,Rt;if(d=b,Ie(),pe(),Ie(),g=De(),g!==e){for(f=He(),f===e&&(f=null),O=[],Q=Xe();Q!==e;)O.push(Q),Q=Xe();for(Q=Ie(),ue=We(),ue===e&&(ue=null),ft=[],Rt=qt();Rt!==e;)ft.push(Rt),Rt=qt();d=Fe(g,f,O,ue,ft)}else b=d,d=e;return d}function pe(){var d,g,f,O,Q,ue;for(I++,d=b,g=[],f=r.charAt(b),et.test(f)?b++:(f=e,I===0&&V(v));f!==e;)g.push(f),f=r.charAt(b),et.test(f)?b++:(f=e,I===0&&V(v));if(r.charCodeAt(b)===46?(f=C,b++):(f=e,I===0&&V(ie)),f!==e){for(O=Ie(),Q=[],ue=r.charAt(b),tt.test(ue)?b++:(ue=e,I===0&&V(le));ue!==e;)Q.push(ue),ue=r.charAt(b),tt.test(ue)?b++:(ue=e,I===0&&V(le));g=[g,f,O,Q],d=g}else b=d,d=e;return I--,d===e&&(g=e,I===0&&V(F)),d}function De(){var d,g,f,O,Q,ue;if(I++,d=b,g=b,r.substr(b,5)===M?(f=M,b+=5):(f=e,I===0&&V(se)),f===e&&(r.substr(b,3)===H?(f=H,b+=3):(f=e,I===0&&V(ce)),f===e&&(r.substr(b,5)===A?(f=A,b+=5):(f=e,I===0&&V(c)),f===e&&(r.substr(b,3)===J?(f=J,b+=3):(f=e,I===0&&V(p)),f===e))))if(f=b,O=r.charAt(b),Ee.test(O)?b++:(O=e,I===0&&V(Z)),O!==e){if(Q=[],ue=r.charAt(b),pt.test(ue)?b++:(ue=e,I===0&&V(i)),ue!==e)for(;ue!==e;)Q.push(ue),ue=r.charAt(b),pt.test(ue)?b++:(ue=e,I===0&&V(i));else Q=e;Q!==e?(O=[O,Q],f=O):(b=f,f=e)}else b=f,f=e;return f!==e?(O=r.charAt(b),gt.test(O)?b++:(O=e,I===0&&V(k)),O===e&&(O=null),f=[f,O],g=f):(b=g,g=e),g!==e?d=r.substring(d,b):d=g,I--,d===e&&(g=e,I===0&&V(fe)),d}function He(){var d,g,f;for(I++,d=b,g=[],f=r.charAt(b),ut.test(f)?b++:(f=e,I===0&&V(D));f!==e;)g.push(f),g.length>=2?f=e:(f=r.charAt(b),ut.test(f)?b++:(f=e,I===0&&V(D)));return g.length<1?(b=d,d=e):d=g,I--,d===e&&(g=e,I===0&&V(m)),d}function Xe(){var d,g,f,O,Q;if(I++,d=b,Ie(),r.charCodeAt(b)===36?(g=K,b++):(g=e,I===0&&V(B)),g!==e){if(f=b,O=[],Q=r.charAt(b),et.test(Q)?b++:(Q=e,I===0&&V(v)),Q!==e)for(;Q!==e;)O.push(Q),Q=r.charAt(b),et.test(Q)?b++:(Q=e,I===0&&V(v));else O=e;O!==e?f=r.substring(f,b):f=O,f!==e?d=ze(f):(b=d,d=e)}else b=d,d=e;return I--,d===e&&I===0&&V(S),d}function We(){var d;return d=yt(),d===e&&(d=Lt()),d}function yt(){var d,g,f,O,Q;if(I++,d=b,r.charCodeAt(b)===123?(g=me,b++):(g=e,I===0&&V(N)),g!==e){for(f=b,O=[],Q=r.charAt(b),l.test(Q)?b++:(Q=e,I===0&&V(T));Q!==e;)O.push(Q),Q=r.charAt(b),l.test(Q)?b++:(Q=e,I===0&&V(T));f=r.substring(f,b),r.charCodeAt(b)===125?(O=be,b++):(O=e,I===0&&V(oe)),O!==e?d=nt(f):(b=d,d=e)}else b=d,d=e;return I--,d===e&&(g=e,I===0&&V(R)),d}function Lt(){var d,g,f,O,Q;if(I++,d=b,r.charCodeAt(b)===59?(g=Ne,b++):(g=e,I===0&&V(j)),g!==e){for(f=b,O=[],Q=r.charAt(b),x.test(Q)?b++:(Q=e,I===0&&V(Y));Q!==e;)O.push(Q),Q=r.charAt(b),x.test(Q)?b++:(Q=e,I===0&&V(Y));f=r.substring(f,b),d=Et(f)}else b=d,d=e;return I--,d===e&&(g=e,I===0&&V(xe)),d}function qt(){var d,g,f,O;return I++,d=b,Ie(),r.charCodeAt(b)===40?(g=vt,b++):(g=e,I===0&&V(W)),g!==e?(f=_(),f!==e?(Ie(),r.charCodeAt(b)===41?(O=ct,b++):(O=e,I===0&&V(te)),O!==e?d=Pt(f):(b=d,d=e)):(b=d,d=e)):(b=d,d=e),I--,d===e&&I===0&&V(q),d}function Qt(){var d,g,f;return I++,d=b,r.substr(b,3)===Te?(g=Te,b+=3):(g=e,I===0&&V(_e)),g===e&&(r.substr(b,3)===xt?(g=xt,b+=3):(g=e,I===0&&V(Ce)),g===e&&(r.substr(b,7)===Ve?(g=Ve,b+=7):(g=e,I===0&&V(ye)),g===e&&(r.charCodeAt(b)===42?(g=$t,b++):(g=e,I===0&&V(qe))))),g!==e?(Ie(),f=We(),f===e&&(f=null),d=Dt(g,f)):(b=d,d=e),I--,d===e&&(g=e,I===0&&V(de)),d}function Ie(){var d,g;for(I++,d=[],g=r.charAt(b),$.test(g)?b++:(g=e,I===0&&V(ge));g!==e;)d.push(g),g=r.charAt(b),$.test(g)?b++:(g=e,I===0&&V(ge));return I--,g=e,I===0&&V(re),d}if(Je=n(),t.peg$library)return{peg$result:Je,peg$currPos:b,peg$FAILED:e,peg$maxFailExpected:ot,peg$maxFailPos:Oe};if(Je!==e&&b===r.length)return Je;throw Je!==e&&b<r.length&&V(It()),Wt(ot,Oe<r.length?r.charAt(Oe):null,Oe<r.length?_t(Oe,Oe+1):_t(Oe,Oe))}/**
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
 */const Ht=0xffffffffffffffffn;function Zt(r,t){return(r<<t|r>>64n-t)&0xffffffffffffffffn}function da(r,t){return r*t&Ht}function Ta(r){return function(){let t=BigInt(r&Ht),e=BigInt(r>>64n&Ht);const o=da(Zt(da(t,5n),7n),9n);return e^=t,t=(Zt(t,24n)^e^e<<16n)&Ht,e=Zt(e,37n),r=e<<64n|t,o}}const Ut=Ta(0xa187eb39cdcaed8f31c4b365b102e01en),Ea=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Ut()))),Pa=Array.from({length:8},()=>Ut()),Da=Array.from({length:16},()=>Ut()),ea=Ut(),Le="w",Ge="b",Se="p",oa="n",Gt="b",At="r",dt="q",Ae="k",ta="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Ft{constructor(t,e){ve(this,"color");ve(this,"from");ve(this,"to");ve(this,"piece");ve(this,"captured");ve(this,"promotion");ve(this,"flags");ve(this,"san");ve(this,"lan");ve(this,"before");ve(this,"after");const{color:o,piece:s,from:n,to:u,flags:a,captured:h,promotion:C}=e,M=Pe(n),H=Pe(u);this.color=o,this.piece=s,this.from=M,this.to=H,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=M+H,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const A in ae)ae[A]&a&&(this.flags+=mt[A]);h&&(this.captured=h),C&&(this.promotion=C,this.lan+=C)}isCapture(){return this.flags.indexOf(mt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(mt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(mt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(mt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(mt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(mt.BIG_PAWN)>-1}}const Me=-1,mt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},ae={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ia={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Ia={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Ma={...ia,...Ia},ee={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},aa={b:[16,32,17,15],w:[-16,-32,-17,-15]},ca={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},za=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],La=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],qa={p:1,n:2,b:4,r:8,q:16,k:32},Ra="pnbrqkPNBRQK",pa=[oa,Gt,At,dt],Ba=7,Na=6,Fa=1,Oa=0,Ot={[Ae]:ae.KSIDE_CASTLE,[dt]:ae.QSIDE_CASTLE},st={w:[{square:ee.a1,flag:ae.QSIDE_CASTLE},{square:ee.h1,flag:ae.KSIDE_CASTLE}],b:[{square:ee.a8,flag:ae.QSIDE_CASTLE},{square:ee.h8,flag:ae.KSIDE_CASTLE}]},ja={b:Fa,w:Na},na="--";function ht(r){return r>>4}function Tt(r){return r&15}function ba(r){return"0123456789".indexOf(r)!==-1}function Pe(r){const t=Tt(r),e=ht(r);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function Ct(r){return r===Le?Ge:Le}function Ha(r){const t=r.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const o=parseInt(t[4],10);if(isNaN(o)||o<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const s=t[0].split("/");if(s.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let u=0;u<s.length;u++){let a=0,h=!1;for(let C=0;C<s[u].length;C++)if(ba(s[u][C])){if(h)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};a+=parseInt(s[u][C],10),h=!0}else{if(!/^[prnbqkPRNBQK]$/.test(s[u][C]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};a+=1,h=!1}if(a!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const n=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:u,regex:a}of n){if(!a.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${u} king`};if((t[0].match(a)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${u} kings`}}return Array.from(s[0]+s[7]).some(u=>u.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Ga(r,t){const e=r.from,o=r.to,s=r.piece;let n=0,u=0,a=0;for(let h=0,C=t.length;h<C;h++){const M=t[h].from,H=t[h].to,A=t[h].piece;s===A&&e!==M&&o===H&&(n++,ht(e)===ht(M)&&u++,Tt(e)===Tt(M)&&a++)}return n>0?u>0&&a>0?Pe(e):a>0?Pe(e).charAt(1):Pe(e).charAt(0):""}function lt(r,t,e,o,s,n=void 0,u=ae.NORMAL){const a=ht(o);if(s===Se&&(a===Ba||a===Oa))for(let h=0;h<pa.length;h++){const C=pa[h];r.push({color:t,from:e,to:o,piece:s,captured:n,promotion:C,flags:u|ae.PROMOTION})}else r.push({color:t,from:e,to:o,piece:s,captured:n,flags:u})}function ga(r){let t=r.charAt(0);return t>="a"&&t<="h"?r.match(/[a-h]\d.*[a-h]\d/)?void 0:Se:(t=t.toLowerCase(),t==="o"?Ae:t)}function ra(r){return r.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ua{constructor(t=ta,{skipValidation:e=!1}={}){ve(this,"_board",new Array(128));ve(this,"_turn",Le);ve(this,"_header",{});ve(this,"_kings",{w:Me,b:Me});ve(this,"_epSquare",-1);ve(this,"_halfMoves",0);ve(this,"_moveNumber",0);ve(this,"_history",[]);ve(this,"_comments",{});ve(this,"_castling",{w:0,b:0});ve(this,"_hash",0n);ve(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Me,b:Me},this._turn=Le,this._castling={w:0,b:0},this._epSquare=Me,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Ma},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:o=!1}={}){let s=t.split(/\s+/);if(s.length>=2&&s.length<6){const a=["-","-","0","1"];t=s.concat(a.slice(-(6-s.length))).join(" ")}if(s=t.split(/\s+/),!e){const{ok:a,error:h}=Ha(t);if(!a)throw new Error(h)}const n=s[0];let u=0;this.clear({preserveHeaders:o});for(let a=0;a<n.length;a++){const h=n.charAt(a);if(h==="/")u+=8;else if(ba(h))u+=parseInt(h,10);else{const C=h<"a"?Le:Ge;this._put({type:h.toLowerCase(),color:C},Pe(u)),u++}}this._turn=s[1],s[2].indexOf("K")>-1&&(this._castling.w|=ae.KSIDE_CASTLE),s[2].indexOf("Q")>-1&&(this._castling.w|=ae.QSIDE_CASTLE),s[2].indexOf("k")>-1&&(this._castling.b|=ae.KSIDE_CASTLE),s[2].indexOf("q")>-1&&(this._castling.b|=ae.QSIDE_CASTLE),this._epSquare=s[3]==="-"?Me:ee[s[3]],this._halfMoves=parseInt(s[4],10),this._moveNumber=parseInt(s[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var u,a;let e=0,o="";for(let h=ee.a8;h<=ee.h1;h++){if(this._board[h]){e>0&&(o+=e,e=0);const{color:C,type:M}=this._board[h];o+=C===Le?M.toUpperCase():M.toLowerCase()}else e++;h+1&136&&(e>0&&(o+=e),h!==ee.h1&&(o+="/"),e=0,h+=8)}let s="";this._castling[Le]&ae.KSIDE_CASTLE&&(s+="K"),this._castling[Le]&ae.QSIDE_CASTLE&&(s+="Q"),this._castling[Ge]&ae.KSIDE_CASTLE&&(s+="k"),this._castling[Ge]&ae.QSIDE_CASTLE&&(s+="q"),s=s||"-";let n="-";if(this._epSquare!==Me)if(t)n=Pe(this._epSquare);else{const h=this._epSquare+(this._turn===Le?16:-16),C=[h+1,h-1];for(const M of C){if(M&136)continue;const H=this._turn;if(((u=this._board[M])==null?void 0:u.color)===H&&((a=this._board[M])==null?void 0:a.type)===Se){this._makeMove({color:H,from:M,to:this._epSquare,piece:Se,captured:Se,flags:ae.EP_CAPTURE});const A=!this._isKingAttacked(H);if(this._undoMove(),A){n=Pe(this._epSquare);break}}}}return[o,this._turn,s,n,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:o}=this._board[t],s={w:0,b:1}[e],n={p:0,n:1,b:2,r:3,q:4,k:5}[o];return Ea[s][n][t]}_epKey(){return this._epSquare===Me?0n:Pa[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Da[t]}_computeHash(){let t=0n;for(let e=ee.a8;e<=ee.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=ea),t}_updateSetup(t){this._history.length>0||(t!==ta?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ta)}get(t){return this._board[ee[t]]}findPiece(t){var o;const e=[];for(let s=ee.a8;s<=ee.h1;s++){if(s&136){s+=7;continue}!this._board[s]||((o=this._board[s])==null?void 0:o.color)!==t.color||this._board[s].color===t.color&&this._board[s].type===t.type&&e.push(Pe(s))}return e}put({type:t,color:e},o){return this._put({type:t,color:e},o)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},o){if(Ra.indexOf(t.toLowerCase())===-1||!(o in ee))return!1;const s=ee[o];if(t==Ae&&!(this._kings[e]==Me||this._kings[e]==s))return!1;const n=this._board[s];return n&&n.type===Ae&&(this._kings[n.color]=Me),this._set(s,{type:t,color:e}),t===Ae&&(this._kings[e]=s),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(ee[t]),e&&e.type===Ae&&(this._kings[e.color]=Me),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var o,s,n,u,a,h,C,M,H,A,J,K;this._hash^=this._castlingKey();const t=((o=this._board[ee.e1])==null?void 0:o.type)===Ae&&((s=this._board[ee.e1])==null?void 0:s.color)===Le,e=((n=this._board[ee.e8])==null?void 0:n.type)===Ae&&((u=this._board[ee.e8])==null?void 0:u.color)===Ge;(!t||((a=this._board[ee.a1])==null?void 0:a.type)!==At||((h=this._board[ee.a1])==null?void 0:h.color)!==Le)&&(this._castling.w&=-65),(!t||((C=this._board[ee.h1])==null?void 0:C.type)!==At||((M=this._board[ee.h1])==null?void 0:M.color)!==Le)&&(this._castling.w&=-33),(!e||((H=this._board[ee.a8])==null?void 0:H.type)!==At||((A=this._board[ee.a8])==null?void 0:A.color)!==Ge)&&(this._castling.b&=-65),(!e||((J=this._board[ee.h8])==null?void 0:J.type)!==At||((K=this._board[ee.h8])==null?void 0:K.color)!==Ge)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var n,u;if(this._epSquare===Me)return;const t=this._epSquare+(this._turn===Le?-16:16),e=this._epSquare+(this._turn===Le?16:-16),o=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((n=this._board[e])==null?void 0:n.color)!==Ct(this._turn)||((u=this._board[e])==null?void 0:u.type)!==Se){this._hash^=this._epKey(),this._epSquare=Me;return}const s=a=>{var h,C;return!(a&136)&&((h=this._board[a])==null?void 0:h.color)===this._turn&&((C=this._board[a])==null?void 0:C.type)===Se};o.some(s)||(this._hash^=this._epKey(),this._epSquare=Me)}_attacked(t,e,o){const s=[];for(let n=ee.a8;n<=ee.h1;n++){if(n&136){n+=7;continue}if(this._board[n]===void 0||this._board[n].color!==t)continue;const u=this._board[n],a=n-e;if(a===0)continue;const h=a+119;if(za[h]&qa[u.type]){if(u.type===Se){if(a>0&&u.color===Le||a<=0&&u.color===Ge)if(o)s.push(Pe(n));else return!0;continue}if(u.type==="n"||u.type==="k")if(o){s.push(Pe(n));continue}else return!0;const C=La[h];let M=n+C,H=!1;for(;M!==e;){if(this._board[M]!=null){H=!0;break}M+=C}if(!H)if(o){s.push(Pe(n));continue}else return!0}}return o?s:!1}attackers(t,e){return e?this._attacked(e,ee[t],!0):this._attacked(this._turn,ee[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(Ct(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,ee[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let o=0,s=0;for(let n=ee.a8;n<=ee.h1;n++){if(s=(s+1)%2,n&136){n+=7;continue}const u=this._board[n];u&&(t[u.type]=u.type in t?t[u.type]+1:1,u.type===Gt&&e.push(s),o++)}if(o===2)return!0;if(o===3&&(t[Gt]===1||t[oa]===1))return!0;if(o===t[Gt]+2){let n=0;const u=e.length;for(let a=0;a<u;a++)n+=e[a];if(n===0||n===u)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:o=void 0}={}){const s=this._moves({square:e,piece:o});return t?s.map(n=>new Ft(this,n)):s.map(n=>this._moveToSan(n,s))}_moves({legal:t=!0,piece:e=void 0,square:o=void 0}={}){var J;const s=o?o.toLowerCase():void 0,n=e==null?void 0:e.toLowerCase(),u=[],a=this._turn,h=Ct(a);let C=ee.a8,M=ee.h1,H=!1;if(s)if(s in ee)C=M=ee[s],H=!0;else return[];for(let K=C;K<=M;K++){if(K&136){K+=7;continue}if(!this._board[K]||this._board[K].color===h)continue;const{type:me}=this._board[K];let be;if(me===Se){if(n&&n!==me)continue;be=K+aa[a][0],this._board[be]||(lt(u,a,K,be,Se),be=K+aa[a][1],ja[a]===ht(K)&&!this._board[be]&&lt(u,a,K,be,Se,void 0,ae.BIG_PAWN));for(let Ne=2;Ne<4;Ne++)be=K+aa[a][Ne],!(be&136)&&(((J=this._board[be])==null?void 0:J.color)===h?lt(u,a,K,be,Se,this._board[be].type,ae.CAPTURE):be===this._epSquare&&lt(u,a,K,be,Se,Se,ae.EP_CAPTURE))}else{if(n&&n!==me)continue;for(let Ne=0,vt=ca[me].length;Ne<vt;Ne++){const ct=ca[me][Ne];for(be=K;be+=ct,!(be&136);){if(!this._board[be])lt(u,a,K,be,me);else{if(this._board[be].color===a)break;lt(u,a,K,be,me,this._board[be].type,ae.CAPTURE);break}if(me===oa||me===Ae)break}}}}if((n===void 0||n===Ae)&&(!H||M===this._kings[a])){if(this._castling[a]&ae.KSIDE_CASTLE){const K=this._kings[a],me=K+2;!this._board[K+1]&&!this._board[me]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,K+1)&&!this._attacked(h,me)&&lt(u,a,this._kings[a],me,Ae,void 0,ae.KSIDE_CASTLE)}if(this._castling[a]&ae.QSIDE_CASTLE){const K=this._kings[a],me=K-2;!this._board[K-1]&&!this._board[K-2]&&!this._board[K-3]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,K-1)&&!this._attacked(h,me)&&lt(u,a,this._kings[a],me,Ae,void 0,ae.QSIDE_CASTLE)}}if(!t||this._kings[a]===-1)return u;const A=[];for(let K=0,me=u.length;K<me;K++)this._makeMove(u[K]),this._isKingAttacked(a)||A.push(u[K]),this._undoMove();return A}move(t,{strict:e=!1}={}){let o=null;if(typeof t=="string")o=this._moveFromSan(t,e);else if(t===null)o=this._moveFromSan(na,e);else if(typeof t=="object"){const n=this._moves();for(let u=0,a=n.length;u<a;u++)if(t.from===Pe(n[u].from)&&t.to===Pe(n[u].to)&&(!("promotion"in n[u])||t.promotion===n[u].promotion)){o=n[u];break}}if(!o)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&o.flags&ae.NULL_MOVE)throw new Error("Null move not allowed when in check");const s=new Ft(this,o);return this._makeMove(o),this._incPositionCount(),s}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var s,n,u,a;const e=this._turn,o=Ct(e);if(this._push(t),t.flags&ae.NULL_MOVE){e===Ge&&this._moveNumber++,this._halfMoves++,this._turn=o,this._epSquare=Me;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&ae.EP_CAPTURE&&(this._turn===Ge?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Ae){if(this._kings[e]=t.to,t.flags&ae.KSIDE_CASTLE){const h=t.to-1,C=t.to+1;this._movePiece(C,h)}else if(t.flags&ae.QSIDE_CASTLE){const h=t.to+1,C=t.to-2;this._movePiece(C,h)}this._castling[e]=0}if(this._castling[e]){for(let h=0,C=st[e].length;h<C;h++)if(t.from===st[e][h].square&&this._castling[e]&st[e][h].flag){this._castling[e]^=st[e][h].flag;break}}if(this._castling[o]){for(let h=0,C=st[o].length;h<C;h++)if(t.to===st[o][h].square&&this._castling[o]&st[o][h].flag){this._castling[o]^=st[o][h].flag;break}}if(this._hash^=this._castlingKey(),t.flags&ae.BIG_PAWN){let h;e===Ge?h=t.to-16:h=t.to+16,!(t.to-1&136)&&((s=this._board[t.to-1])==null?void 0:s.type)===Se&&((n=this._board[t.to-1])==null?void 0:n.color)===o||!(t.to+1&136)&&((u=this._board[t.to+1])==null?void 0:u.type)===Se&&((a=this._board[t.to+1])==null?void 0:a.color)===o?(this._epSquare=h,this._hash^=this._epKey()):this._epSquare=Me}else this._epSquare=Me;t.piece===Se?this._halfMoves=0:t.flags&(ae.CAPTURE|ae.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===Ge&&this._moveNumber++,this._turn=o,this._hash^=ea}undo(){const t=this._hash,e=this._undoMove();if(e){const o=new Ft(this,e);return this._decPositionCount(t),o}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=ea;const o=this._turn,s=Ct(o);if(e.flags&ae.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:o})),e.captured)if(e.flags&ae.EP_CAPTURE){let n;o===Ge?n=e.to-16:n=e.to+16,this._set(n,{type:Se,color:s})}else this._set(e.to,{type:e.captured,color:s});if(e.flags&(ae.KSIDE_CASTLE|ae.QSIDE_CASTLE)){let n,u;e.flags&ae.KSIDE_CASTLE?(n=e.to+1,u=e.to-1):(n=e.to-2,u=e.to+1),this._movePiece(u,n)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const o=[];let s=!1;for(const A in this._header)this._header[A]&&o.push(`[${A} "${this._header[A]}"]`+t),s=!0;s&&this._history.length&&o.push(t);const n=A=>{const J=this._comments[this.fen()];if(typeof J<"u"){const K=A.length>0?" ":"";A=`${A}${K}{${J}}`}return A},u=[];for(;this._history.length>0;)u.push(this._undoMove());const a=[];let h="";for(u.length===0&&a.push(n(""));u.length>0;){h=n(h);const A=u.pop();if(!A)break;if(!this._history.length&&A.color==="b"){const J=`${this._moveNumber}. ...`;h=h?`${h} ${J}`:J}else A.color==="w"&&(h.length&&a.push(h),h=this._moveNumber+".");h=h+" "+this._moveToSan(A,this._moves({legal:!0})),this._makeMove(A)}if(h.length&&a.push(n(h)),a.push(this._header.Result||"*"),e===0)return o.join("")+a.join(" ");const C=function(){return o.length>0&&o[o.length-1]===" "?(o.pop(),!0):!1},M=function(A,J){for(const K of J.split(" "))if(K){if(A+K.length>e){for(;C();)A--;o.push(t),A=0}o.push(K),A+=K.length,o.push(" "),A++}return C()&&A--,A};let H=0;for(let A=0;A<a.length;A++){if(H+a[A].length>e&&a[A].includes("{")){H=M(H,a[A]);continue}H+a[A].length>e&&A!==0?(o[o.length-1]===" "&&o.pop(),o.push(t),H=0):A!==0&&(o.push(" "),H++),o.push(a[A]),H+=a[A].length}return o.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ia[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ia[t]||null,!0):!1}getHeaders(){const t={};for(const[e,o]of Object.entries(this._header))o!==null&&(t[e]=o);return t}loadPgn(t,{strict:e=!1,newlineChar:o=`\r?
`}={}){o!==`\r?
`&&(t=t.replace(new RegExp(o,"g"),`
`));const s=Aa(t);this.reset();const n=s.headers;let u="";for(const C in n)C.toLowerCase()==="fen"&&(u=n[C]),this.header(C,n[C]);if(!e)u&&this.load(u,{preserveHeaders:!0});else if(n.SetUp==="1"){if(!("FEN"in n))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(n.FEN,{preserveHeaders:!0})}let a=s.root;for(;a;){if(a.move){const C=this._moveFromSan(a.move,e);if(C==null)throw new Error(`Invalid move in PGN: ${a.move}`);this._makeMove(C),this._incPositionCount()}a.comment!==void 0&&(this._comments[this.fen()]=a.comment),a=a.variations[0]}const h=s.result;h&&Object.keys(this._header).length&&this._header.Result!==h&&this.setHeader("Result",h)}_moveToSan(t,e){let o="";if(t.flags&ae.KSIDE_CASTLE)o="O-O";else if(t.flags&ae.QSIDE_CASTLE)o="O-O-O";else{if(t.flags&ae.NULL_MOVE)return na;if(t.piece!==Se){const s=Ga(t,e);o+=t.piece.toUpperCase()+s}t.flags&(ae.CAPTURE|ae.EP_CAPTURE)&&(t.piece===Se&&(o+=Pe(t.from)[0]),o+="x"),o+=Pe(t.to),t.promotion&&(o+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?o+="#":o+="+"),this._undoMove(),o}_moveFromSan(t,e=!1){let o=ra(t);if(e||(o==="0-0"?o="O-O":o==="0-0-0"&&(o="O-O-O")),o==na)return{color:this._turn,from:0,to:0,piece:"k",flags:ae.NULL_MOVE};let s=ga(o),n=this._moves({legal:!0,piece:s});for(let A=0,J=n.length;A<J;A++)if(o===ra(this._moveToSan(n[A],n)))return n[A];if(e)return null;let u,a,h,C,M,H=!1;if(a=o.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),a?(u=a[1],h=a[2],C=a[3],M=a[4],h.length==1&&(H=!0)):(a=o.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),a&&(u=a[1],h=a[2],C=a[3],M=a[4],h.length==1&&(H=!0))),s=ga(o),n=this._moves({legal:!0,piece:u||s}),!C)return null;for(let A=0,J=n.length;A<J;A++)if(h){if((!u||u.toLowerCase()==n[A].piece)&&ee[h]==n[A].from&&ee[C]==n[A].to&&(!M||M.toLowerCase()==n[A].promotion))return n[A];if(H){const K=Pe(n[A].from);if((!u||u.toLowerCase()==n[A].piece)&&ee[C]==n[A].to&&(h==K[0]||h==K[1])&&(!M||M.toLowerCase()==n[A].promotion))return n[A]}}else if(o===ra(this._moveToSan(n[A],n)).replace("x",""))return n[A];return null}ascii(){let t=`   +------------------------+
`;for(let e=ee.a8;e<=ee.h1;e++){if(Tt(e)===0&&(t+=" "+"87654321"[ht(e)]+" |"),this._board[e]){const o=this._board[e].type,n=this._board[e].color===Le?o.toUpperCase():o.toLowerCase();t+=" "+n+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let o=0;const s=this._turn;for(let n=0,u=e.length;n<u;n++)this._makeMove(e[n]),this._isKingAttacked(s)||(t-1>0?o+=this.perft(t-1):o++),this._undoMove();return o}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let o=ee.a8;o<=ee.h1;o++)this._board[o]==null?e.push(null):e.push({square:Pe(o),type:this._board[o].type,color:this._board[o].color}),o+1&136&&(t.push(e),e=[],o+=8);return t}squareColor(t){if(t in ee){const e=ee[t];return(ht(e)+Tt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],o=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const s=e.pop();if(!s)break;t?o.push(new Ft(this,s)):o.push(this._moveToSan(s,this._moves())),this._makeMove(s)}return o}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},o=s=>{s in this._comments&&(e[s]=this._comments[s])};for(;this._history.length>0;)t.push(this._undoMove());for(o(this.fen());;){const s=t.pop();if(!s)break;this._makeMove(s),o(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const s of[Ae,dt])e[s]!==void 0&&(e[s]?this._castling[t]|=Ot[s]:this._castling[t]&=~Ot[s]);this._updateCastlingRights();const o=this.getCastlingRights(t);return(e[Ae]===void 0||e[Ae]===o[Ae])&&(e[dt]===void 0||e[dt]===o[dt])}getCastlingRights(t){return{[Ae]:(this._castling[t]&Ot[Ae])!==0,[dt]:(this._castling[t]&Ot[dt])!==0}}moveNumber(){return this._moveNumber}}async function Ya(r,t={}){var fe,se,ce;const e=t.currentUser||{};let o="chat",s=[],n=null,u=[],a=[],h=null,C=null,M=!1,H=null,A=null;r.innerHTML=`
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
  `,Ua(),await ct(),Ee();const J=r.querySelector("#tab-nav-chat"),K=r.querySelector("#tab-nav-lounge"),me=r.querySelector("#bonding-chat-main-wrap"),be=r.querySelector("#bonding-lounge-main-wrap");J==null||J.addEventListener("click",()=>{o="chat",J.classList.add("active"),K.classList.remove("active"),me.style.display="grid",be.style.display="none",Ee()}),K==null||K.addEventListener("click",async()=>{o="lounge_games",K.classList.add("active"),J.classList.remove("active"),me.style.display="none",be.style.display="block",await y()}),(fe=r.querySelector("#btn-top-new-chat"))==null||fe.addEventListener("click",F),(se=r.querySelector("#btn-top-new-group"))==null||se.addEventListener("click",v),(ce=r.querySelector("#btn-top-challenge"))==null||ce.addEventListener("click",()=>X());const Ne=r.querySelector("#bonding-search-input");Ne&&Ne.addEventListener("input",c=>{const p=c.target.value.toLowerCase().trim();r.querySelectorAll(".bonding-channel-item").forEach(k=>{const m=k.textContent.toLowerCase();k.style.display=m.includes(p)?"flex":"none"})}),xt(),new MutationObserver((c,p)=>{document.body.contains(r)||(C&&clearInterval(C),A&&clearInterval(A),p.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function ct(){try{const[c,p]=await Promise.all([Ke("/bonding/channels").catch(()=>[]),Ke("/bonding/colleagues").catch(()=>[])]);s=c,u=p,!n&&s.length>0&&(n=s.find(i=>i.name.includes("Lounge"))||s[0]),Ve(),n&&await Te(n._id)}catch(c){console.error("Failed to load bonding data",c)}}async function Te(c,p=!1){if(c)try{a=await Ke(`/bonding/channels/${c}/messages`),p?$():w()}catch(i){console.error("Failed to load messages",i)}}function xt(){C&&clearInterval(C),C=setInterval(async()=>{try{if(!document.body.contains(r)){clearInterval(C);return}o==="chat"&&n?await Te(n._id,!0):o==="lounge_games"&&await y(!0)}catch{}},3e3)}function Ve(){const c=r.querySelector("#bonding-group-list"),p=r.querySelector("#bonding-direct-list");if(!c||!p)return;const i=s.filter(m=>m.type==="group"),k=s.filter(m=>m.type==="direct");i.length===0?c.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':c.innerHTML=i.map(m=>{var S;return`
          <div class="bonding-channel-item ${n&&n._id===m._id?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-icon">${m.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${E(m.name)}</div>
              <div class="bonding-channel-preview">${E(((S=m.lastMessage)==null?void 0:S.content)||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),k.length===0?p.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':p.innerHTML=k.map(m=>{var R;const D=n&&n._id===m._id,S=m.displayName||m.name||"Colleague",B=S.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${D?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-avatar">${B}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${E(S)}</div>
              <div class="bonding-channel-preview">${E(((R=m.lastMessage)==null?void 0:R.content)||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${m._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),$t()}function $t(){var p,i;const c=r.querySelectorAll(".bonding-channel-item");c.forEach(k=>{k.onclick=async m=>{if(m.target.closest(".bonding-channel-del-btn"))return;const D=k.dataset.channelId,S=s.find(B=>B._id===D);S&&(n=S,c.forEach(B=>B.classList.remove("active")),k.classList.add("active"),Ee(),await Te(S._id))}}),r.querySelectorAll(".bonding-channel-del-btn").forEach(k=>{k.onclick=async m=>{m.stopPropagation();const D=k.dataset.channelId,S=s.find(N=>N._id===D),B=S&&S.type==="direct",R=B?"this 1-on-1 chat":`the group "${(S==null?void 0:S.name)||""}"`;if(confirm(`Are you sure you want to delete ${R}? All messages will be permanently removed.`))try{k.disabled=!0,await at(`/bonding/channels/${D}`),P(B?"1-on-1 chat deleted":"Group deleted","success"),s=s.filter(N=>N._id!==D),n&&n._id===D&&(n=s[0]||null,Ee(),n&&await Te(n._id)),Ve()}catch(N){P(N.message||"Failed to delete conversation","error"),k.disabled=!1}}}),(p=r.querySelector("#btn-create-group"))==null||p.addEventListener("click",v),(i=r.querySelector("#btn-new-direct-chat"))==null||i.addEventListener("click",F)}function Ee(){const c=r.querySelector("#bonding-chat-panel");if(!c)return;if(!n){c.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const p=E(n.displayName||n.name),i=(n.members||[]).length,k=n.type==="group",m=(e==null?void 0:e._id)||(e==null?void 0:e.id),D=k?null:(n.members||[]).find(S=>{var B;return((B=S.userId)==null?void 0:B.toString())!==(m==null?void 0:m.toString())});c.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${k?n.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${p}</div>
            <div class="bonding-chat-sub">
              ${k?`<span>${i} members</span> · <span>${E(n.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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
              <span>👥</span> <span>Members (${i})</span>
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
        ${Ze()}
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
    `,tt(D),pt(D),gt(),x()}function Ze(){if(!a||a.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const c=(e==null?void 0:e._id)||(e==null?void 0:e.id);return a.map(p=>{var S,B,R,N,T,oe,xe,j,Y;const i=p.sender&&p.sender.userId&&c&&p.sender.userId.toString()===c.toString();if(p.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${p._id}">
            <span>ℹ️</span> <span>${E(p.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${p._id}" title="Delete Message">&times;</button>
          </div>
        `;if(p.type==="challenge"&&p.challengeData){const q=p.challengeData,W=q.gameTitle||"Game Challenge",te=q.gameType||"chess",de=te==="chess"?"♟️":te==="ludo"?"🎲":"❌",_e=(S=q.gameState)==null?void 0:S.invitationId,Ce=(B=q.targetUserId)==null?void 0:B.toString(),ye=(N=(R=p.sender)==null?void 0:R.userId)==null?void 0:N.toString(),qe=c&&Ce===c.toString(),re=c&&ye===c.toString();return`
          <div class="bonding-msg-row ${i?"self":"other"}" data-msg-id="${p._id}">
            <div class="bonding-msg-avatar" title="${E(((T=p.sender)==null?void 0:T.name)||"Teammate")}">
              ${(((oe=p.sender)==null?void 0:oe.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${E(((xe=p.sender)==null?void 0:xe.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${le(p.createdAt)}</span>
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
                  <div class="game-bubble-icon">${de}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${E(W)}</h4>
                    <p class="game-bubble-desc">${E(p.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${q.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':q.status==="active"||q.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${E(((j=q.status)==null?void 0:j.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${q.status==="pending"&&qe?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${_e}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${_e}" data-action="decline">
                        Decline
                      </button>
                    `:q.status==="pending"&&re?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${_e}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${_e}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${et(p)}
            </div>
          </div>
        `}const k=E(((Y=p.sender)==null?void 0:Y.name)||"Teammate"),m=le(p.createdAt),D=et(p);return`
        <div class="bonding-msg-row ${i?"self":"other"}" data-msg-id="${p._id}">
          <div class="bonding-msg-avatar" title="${k}">${k.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${k}</span>
              <span class="bonding-msg-time">${m}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${p._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${E(p.content).replace(/\n/g,"<br/>")}
            </div>
            ${D}
          </div>
        </div>
      `}).join("")}function et(c){return`
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
    `}function tt(c){const p=r.querySelector("#btn-chat-challenge");p&&(p.onclick=()=>{c?X(null,c.userId||c._id):X()});const i=r.querySelector("#btn-manage-members");i&&(i.onclick=L);const k=r.querySelector("#btn-delete-group");k&&(k.onclick=U);const m=r.querySelector("#btn-delete-direct");m&&(m.onclick=async()=>{if(n&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{m.disabled=!0,await at(`/bonding/channels/${n._id}`),P("1-on-1 chat deleted successfully","success");const S=n._id;s=s.filter(B=>B._id!==S),n=s[0]||null,Ve(),Ee(),n&&await Te(n._id)}catch(S){P(S.message||"Could not delete 1-on-1 chat","error"),m.disabled=!1}});const D=r.querySelector("#btn-clear-chat");D&&(D.onclick=async()=>{if(n&&confirm("Are you sure you want to clear all messages in this conversation?"))try{D.disabled=!0,await at(`/bonding/channels/${n._id}/messages`),P("Chat messages cleared","success"),a=[],w()}catch(S){P(S.message||"Could not clear chat messages","error")}finally{D.disabled=!1}})}function pt(c){const p=r.querySelector("#bonding-message-input"),i=r.querySelector("#btn-send-message"),k=r.querySelector("#btn-quick-emoji"),m=r.querySelector("#btn-input-challenge");p&&p.addEventListener("keydown",D=>{D.key==="Enter"&&!D.shiftKey&&(D.preventDefault(),ut())}),i&&(i.onclick=ut),m&&(m.onclick=()=>{c?X(null,c.userId||c._id):X()}),k&&(k.onclick=()=>{if(!p)return;const D=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],S=D[Math.floor(Math.random()*D.length)];p.value+=(p.value?" ":"")+S,p.focus()})}function gt(){r.querySelectorAll(".btn-respond-invite").forEach(k=>{k.onclick=async()=>{const m=k.dataset.inviteId,D=k.dataset.action;await ne(m,D)}}),r.querySelectorAll(".btn-launch-match-from-card").forEach(k=>{k.onclick=async()=>{const m=k.dataset.inviteId;try{k.disabled=!0;const D=await Ke("/bonding/invitations"),S=(D.incoming||[]).concat(D.sent||[]).find(B=>B._id===m);S&&S.matchId?Z(S.matchId):P("Match has not started yet or has expired","warning")}catch(D){P(D.message||"Could not load match","error")}finally{k.disabled=!1}}}),r.querySelectorAll(".bonding-msg-del-btn").forEach(k=>{k.onclick=async m=>{m.stopPropagation();const D=k.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{k.disabled=!0,await at(`/bonding/messages/${D}`),a=a.filter(S=>S._id!==D),$(),P("Message deleted","success")}catch(S){P(S.message||"Failed to delete message","error"),k.disabled=!1}}}),r.querySelectorAll(".bonding-rxn-tag").forEach(k=>{k.onclick=async()=>{const m=k.dataset.msgId,D=k.dataset.emoji;await l(m,D)}}),r.querySelectorAll(".bonding-add-rxn-btn").forEach(k=>{k.onclick=m=>{const D=k.dataset.msgId;ie(m.currentTarget,async S=>{await l(D,S)})}})}async function ut(){const c=r.querySelector("#bonding-message-input");if(!c||!n||M)return;const p=c.value.trim();if(p)try{M=!0,c.value="";const i=await we(`/bonding/channels/${n._id}/messages`,{content:p,type:"text"});a.push(i),w(),x()}catch(i){P(i.message||"Failed to send message","error")}finally{M=!1,c.focus()}}async function l(c,p){try{const i=await we(`/bonding/messages/${c}/react`,{emoji:p}),k=a.find(m=>m._id===c);k&&(k.reactions=i,$())}catch(i){P(i.message||"Failed to react","error")}}function x(){const c=r.querySelector("#bonding-messages-feed");c&&(c.scrollTop=c.scrollHeight)}function $(){const c=r.querySelector("#bonding-messages-feed");if(!c)return;const p=c.scrollHeight-c.scrollTop<=c.clientHeight+80;c.innerHTML=Ze(),gt(),p&&x()}function w(){const c=r.querySelector("#bonding-messages-feed");c&&(c.innerHTML=Ze(),gt())}async function y(c=!1){const p=r.querySelector("#bonding-lounge-main-wrap");if(p){c||(p.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const i=await Ke("/bonding/games/overview");h=i;const k=i.myStats||{},m=i.availableGames||[],D=i.incomingChallenges||[],S=i.sentChallenges||[],B=i.activeMatches||[],R=i.recentMatches||[],N=(e==null?void 0:e._id)||(e==null?void 0:e.id);p.innerHTML=`
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
              ${m.map(T=>`
                <div class="lounge-game-card" data-game-id="${T.id}">
                  <div class="game-card-icon">${T.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${E(T.name)}</h4>
                    <p class="game-card-desc">${E(T.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${T.duration}</span>
                      ${T.id==="ludo"?'<span class="meta-pill">👥 1P, 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  ${T.id==="ludo"?`
                    <div style="display:flex;gap:6px;width:100%;margin-top:auto;">
                      <button class="lounge-card-challenge-btn btn-ludo-quick-solo" style="flex:1;background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;">
                        ▶️ Solo (1P vs AI)
                      </button>
                      <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${T.id}" data-game-title="${E(T.name)}" style="flex:1;">
                        ⚔️ Play (1P-4P)
                      </button>
                    </div>
                  `:`
                    <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${T.id}" data-game-title="${E(T.name)}">
                      ⚔️ Challenge Employee
                    </button>
                  `}
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
                <span class="badge blue">${D.length+S.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${D.length})</h5>
              ${D.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${D.map(T=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(T.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${E(T.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${E(T.sender.name)}</strong> (${E(T.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${T._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${T._id}" data-action="decline">
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
                    ${S.map(T=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(T.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${E(T.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${E(T.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${T._id}" data-action="cancel">
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
                <span class="badge green">${B.length} Live</span>
              </div>

              ${B.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${B.map(T=>{const xe=N&&T.player1.userId.toString()===N.toString()?T.player2:T.player1,j=N&&T.currentTurnUserId&&T.currentTurnUserId.toString()===N.toString();return`
                        <div class="lounge-active-match-card ${j?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${T.gameType==="chess"?"♟️":T.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${E(T.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${E(xe.name)}</strong> (${E(xe.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${j?"my-turn":"wait"}">
                              ${j?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${T._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${T._id}" title="Delete Match">
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
                  ${R.map(T=>{const xe=N&&T.player1.userId.toString()===N.toString()?T.player2:T.player1,j=N&&T.winnerId&&T.winnerId.toString()===N.toString(),Y=T.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${E(T.gameTitle)}</span>
                          <span class="recent-date">${le(T.completedAt||T.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${T._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${E(xe.name)}</strong></div>
                          <div class="recent-outcome ${j?"win":Y?"draw":"loss"}">
                            ${j?"🏆 VICTORY":Y?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${E(T.winningReason||T.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${T._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${T._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,z()}catch(i){p.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${E(i.message)}</p>
        </div>
      `}}}function z(){r.querySelectorAll(".btn-ludo-quick-solo").forEach(p=>{p.onclick=async()=>{try{p.disabled=!0,p.textContent="Launching...";const i=await we("/bonding/matches/instant-ludo",{playerCount:1});i&&i._id&&(P("1P Solo Ludo match launched! 🎲","success"),Z(i._id))}catch(i){P(i.message||"Could not launch Solo Ludo","error")}finally{p.disabled=!1,p.textContent="▶️ Solo (1P vs AI)"}}}),r.querySelectorAll(".btn-challenge-game").forEach(p=>{p.onclick=()=>{const i=p.dataset.gameId;X(i)}}),r.querySelectorAll(".btn-respond-invite").forEach(p=>{p.onclick=async()=>{const i=p.dataset.inviteId,k=p.dataset.action;await ne(i,k),await y()}}),r.querySelectorAll(".btn-resume-match").forEach(p=>{p.onclick=()=>{const i=p.dataset.matchId;Z(i)}}),r.querySelectorAll(".btn-recent-rematch").forEach(p=>{p.onclick=async()=>{const i=p.dataset.matchId;try{p.disabled=!0;const k=await we(`/bonding/matches/${i}/action`,{action:"rematch"});k.match&&(P("Rematch created! Opening arena ⚔️","success"),Z(k.match._id))}catch(k){P(k.message||"Could not start rematch","error")}finally{p.disabled=!1}}}),r.querySelectorAll(".btn-delete-match").forEach(p=>{p.onclick=async i=>{i.stopPropagation();const k=p.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{p.disabled=!0,await at(`/bonding/matches/${k}`),P("Match deleted successfully","success"),await y()}catch(m){P(m.message||"Failed to delete match","error")}finally{p.disabled=!1}}});const c=r.querySelector("#btn-clear-matches");c&&(c.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{c.disabled=!0,await at("/bonding/matches?filter=completed"),P("Completed matches history cleared","success"),await y()}catch(p){P(p.message||"Failed to clear matches","error")}finally{c.disabled=!1}})}function X(c=null,p=null){const i=r.querySelector("#bonding-modals-root"),k=(e==null?void 0:e._id)||(e==null?void 0:e.id),m=new Set(["employee","admin","superadmin"]),D=u.filter(j=>!j.isSelf&&j._id.toString()!==(k==null?void 0:k.toString())&&m.has(j.role));let S=c||"chess",B=p?p.toString():null,R=1,N=[],T="none";function oe(){const j=D.find(q=>q._id.toString()===B),Y=S==="ludo";i.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${Y?"Play Ludo (1P, 2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
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

              <!-- LUDO SPECIAL: Step 2 Player Count Selector -->
              ${Y?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${R===1?"active":""}" data-count="1">
                      👤 1P Solo (vs AI)
                    </button>
                    <button class="ludo-mode-btn ${R===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${R===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle
                    </button>
                    <button class="ludo-mode-btn ${R===4?"active":""}" data-count="4">
                      👑 4P Royale
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step 3 / 2: Opponent Selection -->
              ${Y&&R===1?`
                <div class="flow-step-box" style="background:rgba(16,185,129,0.08);border:1px solid #10b981;padding:14px;border-radius:10px;">
                  <div style="font-weight:700;color:#10b981;font-size:13px;display:flex;align-items:center;gap:6px;">
                    <span>🤖</span> <span>Solo vs AI Bot Mode Active</span>
                  </div>
                  <p style="font-size:12px;color:var(--text-2);margin-top:6px;">
                    Play immediately with 4 pawns in base against an intelligent AI bot! No waiting or employee availability required.
                  </p>
                </div>
              `:`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">
                    ${Y?`Step 3 — Select Colleagues (${N.length}/${R-1} Selected · Any unfilled seats will be played by AI bots)`:"Step 2 — Select Employee to Challenge *"}
                  </div>
                  <div class="emp-search-wrap">
                    <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                  </div>

                  <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                    ${D.map(q=>{const W=Y?N.includes(q._id.toString()):B===q._id.toString();return`
                        <div class="eligible-emp-item ${W?"selected":""}" data-user-id="${q._id}">
                          <div class="emp-item-avatar">${q.name.slice(0,1).toUpperCase()}</div>
                          <div class="emp-item-info">
                            <span class="emp-item-name">${E(q.name)}</span>
                            <span class="emp-item-role">${E(q.role==="superadmin"?"Superadmin":q.role==="admin"?"Admin":"Employee")} · ${E(q.email||"")}</span>
                          </div>
                          <button class="btn-select-opponent ${W?"active":""}">
                            ${W?"Selected ✓":"Select"}
                          </button>
                        </div>
                      `}).join("")}
                  </div>
                </div>
              `}

              <!-- Step for Chess timers -->
              ${S==="chess"?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 3 — Time Control Options</div>
                  <div class="timer-opts-row">
                    <label class="timer-radio-lbl ${T==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${T==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${T==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${T==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${T==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${T==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${Y?`🎲 Ludo (${R}P · 4 Pawns per base)`:S==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${Y?`
                    <div><strong>Mode:</strong> ${R===1?"1P Solo vs AI":`${R} Players (${N.length} Human + ${R-1-N.length} AI Bot)`}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${j?`<strong>${E(j.name)}</strong> (${E(j.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${S==="chess"?`<div><strong>Time Control:</strong> ${T==="none"?"Untimed":T}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${!Y&&!B?"disabled":""}>
                ${Y?"Launch Match Now 🎲":"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,xe()}function xe(){i.querySelector(".bonding-modal-close").onclick=()=>{i.innerHTML=""},i.querySelector("#btn-cancel-challenge-flow").onclick=()=>{i.innerHTML=""},i.querySelectorAll(".game-pill-btn").forEach(q=>{q.onclick=()=>{S=q.dataset.game,oe()}}),i.querySelectorAll(".ludo-mode-btn").forEach(q=>{q.onclick=()=>{R=Number(q.dataset.count),N=N.slice(0,R-1),oe()}});const j=i.querySelector("#flow-emp-search");j&&(j.oninput=q=>{const W=q.target.value.toLowerCase().trim();i.querySelectorAll(".eligible-emp-item").forEach(te=>{const de=te.textContent.toLowerCase();te.style.display=de.includes(W)?"flex":"none"})}),i.querySelectorAll(".eligible-emp-item").forEach(q=>{q.onclick=()=>{const W=q.dataset.userId;if(S==="ludo"){const te=R-1;N.includes(W)?N=N.filter(de=>de!==W):N.length<te?N.push(W):N[te-1]=W}else B=W;oe()}}),i.querySelectorAll('input[name="timerMode"]').forEach(q=>{q.onchange=W=>{T=W.target.value,oe()}});const Y=i.querySelector("#btn-submit-challenge-flow");Y&&(Y.onclick=async()=>{if(S==="ludo"){try{Y.disabled=!0,Y.textContent="Launching Match...";const q=await we("/bonding/matches/instant-ludo",{playerCount:R,targetUserIds:N});i.innerHTML="",P(`Ludo match started (${R}P)! 🎲`,"success"),q&&q._id&&Z(q._id)}catch(q){P(q.message||"Failed to start Ludo match","error"),Y.disabled=!1,Y.textContent="Launch Match Now 🎲"}return}if(!B){P("Please select an employee to challenge","warning");return}try{Y.disabled=!0,Y.textContent="Sending Challenge...",await we("/bonding/invitations",{gameType:S,targetUserId:B,matchSettings:{timerMode:T},channelId:(n==null?void 0:n._id)||null}),P("Game challenge delivered! Awaiting acceptance ⚔️","success"),i.innerHTML="",n&&await Te(n._id),o==="lounge_games"&&await y()}catch(q){P(q.message||"Could not send challenge","error"),Y.disabled=!1,Y.textContent="Send Challenge 🚀"}})}oe()}async function ne(c,p){if(!(!c||!p))try{const i=await jt(`/bonding/invitations/${c}/respond`,{action:p});p==="accept"?(P("Challenge accepted! Entering match arena ⚔️","success"),i.match&&Z(i.match._id)):p==="decline"?P("Challenge declined","info"):p==="cancel"&&P("Challenge cancelled","info"),n&&await Te(n._id),o==="lounge_games"&&await y()}catch(i){P(i.message||"Action failed","error")}}async function Z(c){if(!c)return;H=c,A&&clearInterval(A);const p=r.querySelector("#bonding-modals-root");let i=null,k=null,m=[];async function D(){try{return i=await Ke(`/bonding/matches/${c}`),i}catch(j){return P(j.message||"Could not load match","error"),S(),null}}if(i=await D(),!i)return;function S(){A&&clearInterval(A),window._ludoBotTimer&&clearTimeout(window._ludoBotTimer),H=null,p.innerHTML="",o==="lounge_games"&&y(!0),n&&Te(n._id,!0)}A=setInterval(async()=>{var W,te,de,_e;if(!H||H!==c){clearInterval(A);return}const j=(W=i==null?void 0:i.currentTurnUserId)==null?void 0:W.toString(),Y=i==null?void 0:i.status,q=await D();q&&(((te=q.currentTurnUserId)==null?void 0:te.toString())!==j||q.status!==Y||((de=q.moves)==null?void 0:de.length)!==((_e=i.moves)==null?void 0:_e.length))&&(B(),xe())},1500);function B(){var _e,Ce;if(!i)return;const j=(e==null?void 0:e._id)||(e==null?void 0:e.id),Y=j&&i.player1.userId.toString()===j.toString(),q=Y?i.player1:i.player2,W=Y?i.player2:i.player1,te=j&&i.currentTurnUserId&&i.currentTurnUserId.toString()===j.toString(),de=i.status!=="active";p.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${i.gameType==="ludo"?"🎲":i.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${E(i.gameTitle)}</h3>
                  ${i.gameType==="ludo"&&((_e=i.gameState)!=null&&_e.players)?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${i.gameState.players.map(ye=>{var ke;const qe=ye.userId&&ye.userId.toString()===(j==null?void 0:j.toString()),re={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[ye.color]||"⚪",ge=(((ke=i.gameState)==null?void 0:ke.turnColor)||i.turn)===ye.color;return`
                          <span class="player-tag ${qe?"self":"opp"} ${ge?"turn-active":""}">
                            ${re} <strong>${E(ye.name)}</strong>${ye.isBot?" 🤖":""} ${qe?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${E(q.name)} (You · <strong>${i.gameType==="ludo"?q.assignedRole==="red"?"🔴 Red":"🟢 Green":i.gameType==="tictactoe"?q.assignedRole==="X"?"✕":"◯":q.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${E(W.name)} (<strong>${i.gameType==="ludo"?W.assignedRole==="red"?"🔴 Red":"🟢 Green":i.gameType==="tictactoe"?W.assignedRole==="X"?"✕":"◯":W.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${de?"ended":te?"my-turn":"opp-turn"}">
                ${de?`<span>🏁 Finished (${E(i.winningReason||i.status)})</span>`:te?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${E(W.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${i.gameType==="ludo"?te?(Ce=i.gameState)!=null&&Ce.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":i.gameType==="tictactoe"?te?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":te?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
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
            ${i.drawOfferedBy&&i.drawOfferedBy.toString()!==(j==null?void 0:j.toString())&&!de?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${E(W.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${i.gameType==="chess"?R(Y):""}
              ${i.gameType==="tictactoe"?N():""}
              ${i.gameType==="ludo"?T(Y):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${de?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${i.winnerId&&i.winnerId.toString()===(j==null?void 0:j.toString())?"🏆":i.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${i.winnerId&&i.winnerId.toString()===(j==null?void 0:j.toString())?"VICTORY!":i.status==="draw"?"STALEMATE / DRAW":`${E(i.winnerName)} Wins!`}</h4>
                  <p>Reason: ${E(i.winningReason||"Match concluded")}</p>
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
      `,oe(te,Y,q)}function R(j){var re;const Y=((re=i.gameState)==null?void 0:re.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",q=new ua(Y),W=j?i.player1.assignedRole==="white":i.player2.assignedRole==="white",te={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},de=W?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],_e=W?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Ce='<div class="chess-board-grid">';for(const ge of _e)for(const ke of de){const Re=`${ke}${ge}`,he=q.get(Re),Ue=(ke.charCodeAt(0)-97+ge)%2!==0,Ye=k===Re,Fe=m.includes(Re),ze=he?he.color==="w"?te[he.type.toUpperCase()]:te[he.type]:"";Ce+=`
            <div class="chess-sq ${Ue?"light":"dark"} ${Ye?"selected":""} ${Fe?"legal-dot":""}" data-square="${Re}">
              ${ze?`<span class="chess-piece ${he.color==="w"?"white-piece":"black-piece"}">${ze}</span>`:""}
            </div>
          `}Ce+="</div>";const qe=(i.moves||[]).map(ge=>{var ke;return`
        <span class="chess-move-token">${ge.moveNum}. ${((ke=ge.moveData)==null?void 0:ke.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${Ce}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${qe||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function N(){var q;const j=((q=i.gameState)==null?void 0:q.board)||Array(9).fill(null),Y=i.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${j.map((W,te)=>{const de=Y.includes(te);return`
                <div class="ttt-cell ${W?"filled":"empty"} ${de?"win-cell":""}" data-cell-idx="${te}">
                  ${W==="X"?'<span class="ttt-x">✕</span>':W==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function T(j,Y,q){var zt;const W=i.gameState||{},te=W.activeColors||["red","green"],de=W.players||[{...i.player1,color:"red",assignedRole:"red",isBot:!1},{...i.player2,color:"green",assignedRole:"green",isBot:!1}],_e=W.tokens||{},Ce=_=>{const G=_e[_]||(_==="red"?W.p1Tokens:_==="green"?W.p2Tokens:[])||[];return Array.from({length:4},(pe,De)=>G[De]||{id:De,step:-1})},ye=Ce("red"),qe=Ce("green"),re=Ce("yellow"),ge=Ce("blue"),ke=(e==null?void 0:e._id)||(e==null?void 0:e.id),Re=de.find(_=>_.userId&&_.userId.toString()===(ke==null?void 0:ke.toString()))||de[0],he=(Re==null?void 0:Re.color)||(j?"red":"green"),Ue=W.turnColor||i.turn||"red",Ye=he===Ue&&i.status==="active",Fe=!!W.rolled,ze=W.dice,nt=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],Et=[[7,1],[7,2],[7,3],[7,4],[7,5]],Pt=[[1,7],[2,7],[3,7],[4,7],[5,7]],Dt=[[7,13],[7,12],[7,11],[7,10],[7,9]],b=[[13,7],[12,7],[11,7],[10,7],[9,7]],rt=[0,8,13,21,26,34,39,47];function Oe(_,G){return G<0?null:G>=56?_==="red"?[7,6]:_==="green"?[6,7]:_==="yellow"?[7,8]:[8,7]:_==="red"?G<=50?nt[G]:Et[G-51]:_==="green"?G<=50?nt[(13+G)%52]:Pt[G-51]:_==="yellow"?G<=50?nt[(26+G)%52]:Dt[G-51]:G<=50?nt[(39+G)%52]:b[G-51]}function ot(_,G){return _!==he||!Ye||!Fe||!ze||i.status!=="active"?!1:G.step===-1?ze===6:G.step>=0&&G.step+ze<=56}const I={},Je=(_,G)=>{G.forEach(pe=>{if(pe.step>=0&&pe.step<56){const De=Oe(_,pe.step);if(De){const He=De[0]+","+De[1];(I[He]=I[He]||[]).push({color:_,id:pe.id,step:pe.step,movable:ot(_,pe)})}}})};te.includes("red")&&Je("red",ye),te.includes("green")&&Je("green",qe),te.includes("yellow")&&Je("yellow",re),te.includes("blue")&&Je("blue",ge);const $e={};nt.forEach(([_,G],pe)=>{$e[_+","+G]=pe});const je={};Et.forEach(([_,G],pe)=>{je[_+","+G]=pe+1});const It={};Pt.forEach(([_,G],pe)=>{It[_+","+G]=pe+1});const Be={};Dt.forEach(([_,G],pe)=>{Be[_+","+G]=pe+1});const St={};b.forEach(([_,G],pe)=>{St[_+","+G]=pe+1});const _t=[];for(let _=0;_<15;_++)for(let G=0;G<15;G++){if(_<6&&G<6||_<6&&G>8||_>8&&G<6||_>8&&G>8||_>=6&&_<=8&&G>=6&&G<=8)continue;const pe=_+","+G,De=$e[pe],He=De!==void 0&&rt.includes(De),Xe=_===6&&G===1,We=_===1&&G===8,yt=_===8&&G===13,Lt=_===13&&G===6,qt=je[pe],Qt=It[pe],Ie=Be[pe],d=St[pe];let g="ludo-cell";Xe?g+=" cell-red-start":We?g+=" cell-green-start":yt?g+=" cell-yellow-start":Lt?g+=" cell-blue-start":qt?g+=" cell-red-stretch":Qt?g+=" cell-green-stretch":Ie?g+=" cell-yellow-stretch":d?g+=" cell-blue-stretch":He&&(g+=" cell-safe-star");const f=I[pe]||[];_t.push(`
            <div class="${g}" style="grid-row:${_+1};grid-column:${G+1}" data-pos="${pe}">
              ${He?'<span class="cell-star-glyph">⭐</span>':""}
              ${Xe||We||yt||Lt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${f.map(O=>`
                <div class="ludo-token token-${O.color} ${O.movable?"movable":""}" data-token-id="${O.id}" data-color="${O.color}" title="${O.color.toUpperCase()} Pawn ${O.id+1}">
                  <span>${O.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}const V=["","⚀","⚁","⚂","⚃","⚄","⚅"];function Wt(_){return!_||_.step===-1?"Base":_.step===56?"🏁 Home!":_.step>50?`H${_.step-50}`:`S${_.step}`}function bt(_,G,pe,De,He){const Xe=`${_}-yard`;return pe?`
          <div class="ludo-yard ${Xe} ${Ue===_?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${G}</span>
                ${De?`<small class="yard-player-lbl">${E(De.name)}${De.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${He.map((We,yt)=>`
                  <div class="yard-token-slot">
                    ${We.step===-1?`
                      <div class="ludo-token token-${_} ${ot(_,We)?"movable":""}" data-token-id="${We.id}" data-color="${_}" title="${_.toUpperCase()} Pawn ${We.id+1}">
                        <span>${We.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${yt+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `:`
            <div class="ludo-yard ${Xe}">
              <div class="yard-box decorative">
                <div class="yard-title">${G} (Inactive)</div>
              </div>
            </div>
          `}const Kt=de.find(_=>_.color==="red"),Mt=de.find(_=>_.color==="green"),Vt=de.find(_=>_.color==="yellow"),Yt=de.find(_=>_.color==="blue");return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${bt("red","🔴 Red Base",te.includes("red"),Kt,ye)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${bt("green","🟢 Green Base",te.includes("green"),Mt,qe)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${bt("blue","🔵 Blue Base",te.includes("blue"),Yt,ge)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${bt("yellow","🟡 Yellow Base",te.includes("yellow"),Vt,re)}

            <!-- 5. Center Home Victory Zone (3x3) -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${ye.filter(_=>_.step===56).map(_=>`<span class="tok-finished red" title="Red Pawn ${_.id+1} Home">🔴${_.id+1}</span>`).join("")}
                  ${qe.filter(_=>_.step===56).map(_=>`<span class="tok-finished green" title="Green Pawn ${_.id+1} Home">🟢${_.id+1}</span>`).join("")}
                  ${re.filter(_=>_.step===56).map(_=>`<span class="tok-finished yellow" title="Yellow Pawn ${_.id+1} Home">🟡${_.id+1}</span>`).join("")}
                  ${ge.filter(_=>_.step===56).map(_=>`<span class="tok-finished blue" title="Blue Pawn ${_.id+1} Home">🔵${_.id+1}</span>`).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${_t.join("")}
          </div>

          <!-- Ludo Action & Dice Roller Console -->
          <div class="ludo-console">
            <div class="ludo-dice-box">
              <div class="ludo-dice-visual ${Fe?"rolled":""}">
                ${ze?`<span class="dice-glyph">${V[ze]}</span>`:"🎲"}
              </div>
              ${ze?`<span class="dice-num-lbl">Rolled ${ze}</span>`:'<span class="dice-num-lbl">Ready</span>'}
            </div>

            <div class="ludo-controls-box">
              ${Ye&&!Fe&&i.status==="active"?`
                <button class="btn-ludo-roll pulse" id="btn-ludo-roll">🎲 Roll Dice</button>
              `:Ye&&Fe&&i.status==="active"?`
                <div class="ludo-prompt-text highlight">
                  ${Ce(he).some(_=>ot(he,_))?"👉 Tap your <strong>glowing pawn</strong> to advance!":"No moves possible with this roll. Turn passing..."}
                </div>
              `:`
                <div class="ludo-prompt-text">
                  ${i.status==="active"?`⏳ Waiting for ${E(((zt=de.find(_=>_.color===Ue))==null?void 0:zt.name)||"opponent")} (${Ue.toUpperCase()})...`:"🏁 Match Concluded"}
                </div>
              `}

              <div class="ludo-status-banner">
                ${E(W.lastActionText||"Match in progress.")}
              </div>
            </div>
          </div>

          <!-- Token Progress Strip for all active players -->
          <div class="ludo-progress-strip">
            ${te.map(_=>{const G=de.find(He=>He.color===_),pe=Ce(_),De={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[_];return`
                <div class="progress-pill ${_} ${Ue===_?"active-turn":""}">
                  <strong>${De} ${G?E(G.name):_.toUpperCase()}${G!=null&&G.isBot?" 🤖":""}:</strong>
                  ${pe.map((He,Xe)=>`P${Xe+1}: ${Wt(He)}`).join(" · ")}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function oe(j,Y,q){var qe;p.querySelector("#btn-close-arena").onclick=S;const W=p.querySelector("#btn-arena-resign");W&&(W.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{W.disabled=!0,await we(`/bonding/matches/${c}/action`,{action:"resign"}),await D(),B()}catch(re){P(re.message||"Resign failed","error"),W.disabled=!1}});const te=p.querySelector("#btn-arena-draw");te&&(te.onclick=async()=>{try{await we(`/bonding/matches/${c}/action`,{action:"offer_draw"}),P("Draw offer sent to opponent","info"),await D(),B()}catch(re){P(re.message||"Draw offer failed","error")}});const de=p.querySelector("#btn-confirm-accept-draw");de&&(de.onclick=async()=>{try{await we(`/bonding/matches/${c}/action`,{action:"accept_draw"}),P("Draw agreed!","info"),await D(),B()}catch(re){P(re.message,"error")}});const _e=p.querySelector("#btn-confirm-decline-draw");_e&&(_e.onclick=async()=>{try{await we(`/bonding/matches/${c}/action`,{action:"decline_draw"}),await D(),B()}catch(re){P(re.message,"error")}}),[p.querySelector("#btn-arena-delete-match"),p.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(re=>{re.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{re.disabled=!0,await at(`/bonding/matches/${c}`),P("Match deleted","success"),S(),o==="lounge_games"&&await y()}catch(ge){P(ge.message||"Failed to delete match","error"),re.disabled=!1}}});const ye=p.querySelector("#btn-arena-rematch-action");if(ye&&(ye.onclick=async()=>{try{ye.disabled=!0,ye.textContent="Creating Rematch...";const re=await we(`/bonding/matches/${c}/action`,{action:"rematch"});re.match&&(P("Rematch created! New match live ⚔️","success"),A&&clearInterval(A),Z(re.match._id))}catch(re){P(re.message||"Rematch failed","error"),ye.disabled=!1,ye.textContent="🔄 Request Rematch"}}),i.gameType==="chess"&&j&&i.status==="active"){const re=((qe=i.gameState)==null?void 0:qe.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",ge=new ua(re),ke=q.assignedRole==="white"?"w":"b";p.querySelectorAll(".chess-sq").forEach(Re=>{Re.onclick=async()=>{const he=Re.dataset.square;if(k){if(k===he){k=null,m=[],B();return}if(m.includes(he)){const Ye=ge.get(k);let Fe;Ye&&Ye.type==="p"&&(he.endsWith("8")||he.endsWith("1"))&&(Fe=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const ze={from:k,to:he,promotion:Fe?Fe.toLowerCase():void 0};k=null,m=[],i=await we(`/bonding/matches/${c}/move`,{move:ze}),B()}catch(ze){P(ze.message||"Illegal chess move","error"),k=null,m=[],B()}return}}const Ue=ge.get(he);Ue&&Ue.color===ke?(k=he,m=ge.moves({square:he,verbose:!0}).map(Fe=>Fe.to),B()):(k=null,m=[],B())}})}if(i.gameType==="tictactoe"&&j&&i.status==="active"&&p.querySelectorAll(".ttt-cell.empty").forEach(re=>{re.onclick=async()=>{const ge=re.dataset.cellIdx;try{re.style.opacity="0.5",i=await we(`/bonding/matches/${c}/move`,{cellIndex:Number(ge)}),B()}catch(ke){P(ke.message||"Invalid move","error")}}}),i.gameType==="ludo"&&i.status==="active"){const re=p.querySelector("#btn-ludo-roll");re&&j&&(re.onclick=async()=>{try{re.disabled=!0,re.textContent="Rolling 🎲...",i=await we(`/bonding/matches/${c}/move`,{action:"roll"}),B()}catch(ge){P(ge.message||"Failed to roll","error"),re.disabled=!1,re.textContent="🎲 Roll Dice"}}),j&&p.querySelectorAll(".ludo-token.movable").forEach(ge=>{ge.onclick=async ke=>{ke.stopPropagation();const Re=ge.dataset.tokenId;try{ge.style.opacity="0.5",i=await we(`/bonding/matches/${c}/move`,{action:"move",tokenId:Number(Re)}),B()}catch(he){P(he.message||"Invalid token move","error"),ge.style.opacity="1"}}})}}B();function xe(){var j,Y;if(i&&i.gameType==="ludo"&&i.status==="active"){const q=((j=i.gameState)==null?void 0:j.turnColor)||i.turn||"red",W=(((Y=i.gameState)==null?void 0:Y.players)||[]).find(te=>te.color===q);W&&W.isBot&&(window._ludoBotTimer&&clearTimeout(window._ludoBotTimer),window._ludoBotTimer=setTimeout(async()=>{if(!(!H||H!==c))try{i=await we(`/bonding/matches/${c}/bot-move`),B(),xe()}catch(te){console.error("Bot turn failed:",te)}},850))}}xe()}function L(){if(!n||n.type==="direct")return;const c=r.querySelector("#bonding-modals-root"),p=R=>R==="employee"||R==="admin"||R==="superadmin",i=n.members||[],k=new Set(i.map(R=>{var N;return(N=R.userId)==null?void 0:N.toString()})),m=u.filter(R=>p(R.role)&&!k.has(R._id.toString()));c.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${E(n.name)}</h3>
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
                    <option value="${R._id}">${E(R.name)} (${E(R.role==="superadmin"?"Superadmin":R.role==="admin"?"Admin":"Employee")})</option>
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
              <label class="bonding-form-label">Current Members (${i.length}):</label>
              <div class="bonding-members-list">
                ${i.map(R=>{const N=(e==null?void 0:e._id)||(e==null?void 0:e.id),T=N&&R.userId&&R.userId.toString()===N.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(R.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${E(R.name)} ${T?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${E(R.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${R.userId}" data-name="${E(R.name)}">
                          ${T?"Leave Group":"Remove"}
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""};const D=c.querySelector("#btn-modal-delete-group");D&&(D.onclick=()=>{c.innerHTML="",U()});const S=c.querySelector("#btn-submit-add-member");S&&(S.onclick=async()=>{const N=c.querySelector("#sel-add-colleague").value;if(!N){P("Please select a colleague to add","warning");return}try{S.disabled=!0,S.textContent="Adding...";const T=await jt(`/bonding/channels/${n._id}/members`,{action:"add",userIds:[N]});P("Colleague added to group! 🎉","success"),n=T.channel,c.innerHTML="",await Te(n._id),Ee()}catch(T){P(T.message||"Failed to add member","error"),S.disabled=!1,S.textContent="Add to Group"}}),c.querySelectorAll(".btn-remove-member").forEach(R=>{R.onclick=async()=>{const N=R.dataset.userId,T=R.dataset.name;if(confirm(`Are you sure you want to remove ${T} from this group?`))try{R.disabled=!0;const oe=await jt(`/bonding/channels/${n._id}/members`,{action:"remove",userId:N});P(`${T} removed from group`,"info"),n=oe.channel,c.innerHTML="",await Te(n._id),Ee()}catch(oe){P(oe.message||"Failed to remove member","error"),R.disabled=!1}}})}async function U(){if(!n||n.type==="direct")return;const c=n.name;if(confirm(`Are you sure you want to delete the group "${c}"?

All messages in this lounge will be deleted.`))try{await at(`/bonding/channels/${n._id}`),P(`Group "${c}" deleted successfully`,"success"),s=await Ke("/bonding/channels").catch(()=>[]),n=s.find(i=>i.type==="group")||s[0]||null,Ve(),Ee(),n&&await Te(n._id)}catch(i){P(i.message||"Failed to delete group","error")}}function F(){const c=r.querySelector("#bonding-modals-root"),p=m=>m==="employee"||m==="admin"||m==="superadmin",i=u.filter(m=>!m.isSelf&&p(m.role));c.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${i.map(m=>`
                <div class="bonding-user-pick-item" data-user-id="${m._id}" data-name="${E(m.name)}">
                  <div class="bonding-member-avatar">${m.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${E(m.name)}</span>
                    <span class="user-pick-role">${E(m.role==="superadmin"?"Superadmin":m.role==="admin"?"Admin":"Employee")} · ${E(m.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelectorAll(".bonding-user-pick-item").forEach(m=>{m.onclick=async()=>{const D=m.dataset.userId;try{const S=await we("/bonding/channels",{type:"direct",targetUserId:D});c.innerHTML="",s=await Ke("/bonding/channels"),n=s.find(B=>B._id===S._id)||S,Ve(),Ee(),await Te(n._id)}catch(S){P(S.message||"Failed to open personal chat","error")}}})}function v(){const c=r.querySelector("#bonding-modals-root"),p=S=>S==="employee"||S==="admin"||S==="superadmin",i=u.filter(S=>!S.isSelf&&p(S.role));c.innerHTML=`
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
                ${i.map(S=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${S._id}" />
                    <span>${E(S.name)} (${E(S.role==="superadmin"?"Superadmin":S.role==="admin"?"Admin":"Employee")})</span>
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelector("#btn-cancel-create-grp").onclick=()=>{c.innerHTML=""};let k="👥";const m=c.querySelectorAll(".avatar-opt");m.forEach(S=>{S.onclick=()=>{m.forEach(B=>B.classList.remove("active")),S.classList.add("active"),k=S.textContent.trim()}});const D=c.querySelector("#btn-confirm-create-grp");D.onclick=async()=>{const S=c.querySelector("#new-group-name"),B=c.querySelector("#new-group-desc"),R=S.value.trim();if(!R){P("Please enter a group name","warning"),S.focus();return}const N=c.querySelectorAll(".new-group-member-chk:checked"),T=Array.from(N).map(oe=>oe.value);try{D.disabled=!0,D.textContent="Creating...";const oe=await we("/bonding/channels",{type:"group",name:R,description:B.value.trim(),avatar:k,memberIds:T});P(`Group "${R}" created! 🎉`,"success"),c.innerHTML="",s=await Ke("/bonding/channels"),n=s.find(xe=>xe._id===oe._id)||oe,Ve(),Ee(),await Te(n._id)}catch(oe){P(oe.message||"Failed to create group","error"),D.disabled=!1,D.textContent="Create Group 🎉"}}}function ie(c,p){const i=document.querySelector(".bonding-emoji-popup");i&&i.remove();const k=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],m=document.createElement("div");m.className="bonding-emoji-popup",m.innerHTML=k.map(B=>`<button class="emoji-opt-btn" data-e="${B}">${B}</button>`).join("");const D=c.getBoundingClientRect();m.style.top=`${D.bottom+window.scrollY+6}px`,m.style.left=`${D.left+window.scrollX}px`,document.body.appendChild(m),m.querySelectorAll(".emoji-opt-btn").forEach(B=>{B.onclick=R=>{R.stopPropagation(),p(B.dataset.e),m.remove()}});const S=B=>{m.contains(B.target)||(m.remove(),document.removeEventListener("click",S))};setTimeout(()=>document.addEventListener("click",S),10)}function le(c){if(!c)return"";try{return new Date(c).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Ua(){const r=document.getElementById("ci360-bonding-styles");r&&r.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
