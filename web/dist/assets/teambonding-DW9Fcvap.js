var fa=Object.defineProperty;var ma=(n,t,e)=>t in n?fa(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var ue=(n,t,e)=>ma(n,typeof t!="symbol"?t+"":t,e);import{c as De,h as z,e as C,n as ha,j as Yt,o as mt,k as yt,g as ye}from"./api-Chk_3u1-.js";const Ht={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function va(){try{const n=localStorage.getItem("ci360_planner_settings");if(n)return Object.assign({},Ht,JSON.parse(n))}catch{}return Object.assign({},Ht)}function xa(n){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(n))}catch{}}function ze(){const n=new Date,t=n.getFullYear(),e=String(n.getMonth()+1).padStart(2,"0"),i=String(n.getDate()).padStart(2,"0");return`${t}-${e}-${i}`}function ht(n,t){const e=new Date(n+"T00:00:00");e.setDate(e.getDate()+t);const i=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${i}-${s}-${r}`}function ot(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function He(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function Gt(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function _t(n,t=1){const e=new Date(n+"T00:00:00"),i=e.getDay(),s=(i<t?7:0)+i-t,r=new Date(e);r.setDate(e.getDate()-s);const p=[];for(let a=0;a<7;a++){const h=new Date(r);h.setDate(r.getDate()+a);const $=h.getFullYear(),E=String(h.getMonth()+1).padStart(2,"0"),F=String(h.getDate()).padStart(2,"0");p.push(`${$}-${E}-${F}`)}return p}function ya(){try{const n=window.AudioContext||window.webkitAudioContext;if(!n)return;const t=new n,e=t.currentTime,i=t.createOscillator(),s=t.createGain();i.type="sine",i.frequency.setValueAtTime(523.25,e),i.frequency.exponentialRampToValueAtTime(783.99,e+.15),s.gain.setValueAtTime(.2,e),s.gain.exponentialRampToValueAtTime(.001,e+.35),i.connect(s),s.connect(t.destination),i.start(e),i.stop(e+.35)}catch{}}function Qa(n,t={}){const{userRole:e="employee",currentUser:i=null,onNavigate:s=null}=t,r=e==="superadmin"||e==="admin";let p=va(),a={selectedDate:ze(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};wa(),h();async function h(){a.loading=!0,$();try{const o=[De("/tasks")];r&&o.push(De("/personnel").catch(()=>[]));const[x,k]=await Promise.all(o);a.tasks=Array.isArray(x)?x:[],k&&(a.personnelList=Array.isArray(k)?k:[])}catch(o){z("Failed to load planner tasks: "+o.message,!0)}finally{a.loading=!1,W()}}function $(){n.innerHTML=`
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
    `}function E(o){return a.tasks.filter(x=>{var y;if(x.isDeleted===!0)return!1;if(r&&a.selectedPersonnelId!=="all"){const w=((y=x.personnelId)==null?void 0:y._id)||x.personnelId;if(String(w)!==String(a.selectedPersonnelId))return!1}const k=x.dateStr||(x.dueDate?new Date(x.dueDate).toISOString().slice(0,10):"");return k?k===o:o===ze()})}function F(o,x){if(o.status==="Completed")return!1;const k=o.dateStr||(o.dueDate?new Date(o.dueDate).toISOString().slice(0,10):"");return k?k<x:!1}function _(o,x){const k=o.length,y=o.filter(Y=>Y.status==="Completed").length,w=o.filter(Y=>Y.status==="In Progress").length,D=o.filter(Y=>Y.status==="Pending"||Y.status==="Todo").length,K=o.filter(Y=>F(Y,x)).length,ee=k>0?Math.round(y/k*100):0;return{total:k,completed:y,inProgress:w,pending:D,overdue:K,percent:ee}}function W(){const o=ze(),x=a.selectedDate===o,k=E(a.selectedDate),y=_(k,o);n.innerHTML=`
      <div class="ci360-planner-wrap ${p.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${He(a.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${C(p.displayName||"Daily Planner")}</h1>
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
              <span class="date-text" id="displayDateLabel">${ot(a.selectedDate)}</span>
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
          ${r?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${a.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${a.personnelList.map(w=>`
                  <option value="${w._id}" ${a.selectedPersonnelId===String(w._id)?"selected":""}>
                    ${C(w.name)} (${C(w.department||w.role||"Team")})
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
              <div class="ci360-circular-progress" style="--val: ${y.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${y.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${y.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <span class="kpi-num">${y.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${y.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${y.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${y.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${y.overdue>0?`
                <div class="kpi-box overdue">
                  <span class="kpi-num">${y.overdue}</span>
                  <span class="kpi-label">Overdue</span>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${y.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${O(k,y)}
        </main>

      </div>
    `,$e(),rt()}function O(o,x){return a.viewMode==="weekly"?nt():a.viewMode==="report"?Ue():ge(o,x)}function ge(o,x){const k=ze();let y=o;if(a.filterStatus==="pending"?y=y.filter(w=>w.status==="Pending"||w.status==="Todo"):a.filterStatus==="in_progress"?y=y.filter(w=>w.status==="In Progress"):a.filterStatus==="completed"?y=y.filter(w=>w.status==="Completed"):a.filterStatus==="overdue"&&(y=y.filter(w=>F(w,k))),a.searchQuery){const w=a.searchQuery.toLowerCase();y=y.filter(D=>(D.title||"").toLowerCase().includes(w)||(D.description||"").toLowerCase().includes(w)||(D.category||"").toLowerCase().includes(w))}return y.sort((w,D)=>{if(w.status==="Completed"&&D.status!=="Completed")return 1;if(w.status!=="Completed"&&D.status==="Completed")return-1;const K={Urgent:0,High:1,Medium:2,Low:3};return(K[w.priority]||2)-(K[D.priority]||2)}),`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              Today's Focus
            </h2>
            <span class="ci360-task-count-badge">${y.length} ${y.length===1?"task":"tasks"}</span>
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
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${C(a.searchQuery)}">
              ${a.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card -->
        <div class="ci360-quick-add-bar">
          <div class="ci360-quick-add-input-wrap">
            <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${He(a.selectedDate)}... (Press Enter to save)">
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
          ${y.length===0?le():`
            <div class="ci360-task-list">
              ${y.map(w=>Te(w,k)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function le(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${He(a.selectedDate)}</h3>
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
    `}function Te(o,x){var K,ee,Y,I;const k=o.status==="Completed",y=F(o,x),w=`pri-${(o.priority||"medium").toLowerCase()}`,D=`status-${(o.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${k?"is-completed":""} ${y?"is-overdue":""}" data-id="${o._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${k?"checked":""}" data-action="toggle" data-id="${o._id}" title="${k?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${C(o.title)}</span>
          </div>

          ${o.description?`
            <div class="ci360-task-desc">${C(o.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${w}">
              <span class="badge-dot"></span>
              ${C(o.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${D}">
              ${C(o.status||"Pending")}
            </span>

            <!-- Category -->
            ${o.category?`
              <span class="ci360-badge category-badge">
                #${C(o.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${o.startTime||o.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${o.startTime?C(o.startTime):""}
                   ${o.startTime&&o.dueTime?"–":""}
                   ${o.dueTime?C(o.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${y?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${r&&((K=o.personnelId)!=null&&K.name||(ee=o.userId)!=null&&ee.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${C(((Y=o.personnelId)==null?void 0:Y.name)||((I=o.userId)==null?void 0:I.name))}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${o._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${o._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function nt(){const o=_t(a.selectedDate,p.weekStartsOn),x=He(o[0]),k=He(o[6]),y=ze();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${x} – ${k}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${o.map(w=>{const D=w===y,K=w===a.selectedDate,ee=E(w),Y=_(ee,y);return`
              <div class="ci360-day-column ${D?"is-today":""} ${K?"is-selected":""}" data-date="${w}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${w}">
                  <div class="day-name">${Gt(w)}</div>
                  <div class="day-number">${new Date(w+"T00:00:00").getDate()}</div>
                  ${D?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${Y.completed}/${Y.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${Y.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${ee.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:ee.map(I=>`
                    <div class="ci360-mini-task-card ${I.status==="Completed"?"done":""}" data-id="${I._id}">
                      <button type="button" class="mini-check ${I.status==="Completed"?"checked":""}" data-action="toggle" data-id="${I._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${I._id}">
                        <div class="mini-title">${C(I.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(I.priority||"medium").toLowerCase()}">${I.priority||"Med"}</span>
                          ${I.dueTime?`<span class="mini-time">${C(I.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button -->
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${w}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function Ue(){const o=_t(a.selectedDate,p.weekStartsOn),x=ot(o[0]),k=ot(o[6]),y=ze(),w=a.tasks.filter(N=>{if(N.isDeleted===!0)return!1;const L=N.dateStr||(N.dueDate?new Date(N.dueDate).toISOString().slice(0,10):"");return o.includes(L)}),D=w.length,K=w.filter(N=>N.status==="Completed").length,ee=w.filter(N=>N.status==="In Progress").length,Y=D>0?Math.round(K/D*100):0,I={Urgent:0,High:0,Medium:0,Low:0};return w.forEach(N=>{const L=N.priority||"Medium";I[L]!==void 0&&I[L]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${x} – ${k}</div>
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
            <span class="value" style="font-size:28px">${D}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${K}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${ee}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${Y}%</span>
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
                ${o.map(N=>{const L=E(N),v=_(L,y);return`
                    <tr>
                      <td><strong>${Gt(N)}</strong></td>
                      <td>${He(N)}</td>
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
              <div style="font-size:22px;font-weight:700">${I.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${I.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${I.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${I.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function $e(){const o=document.getElementById("btnViewDaily"),x=document.getElementById("btnViewWeekly"),k=document.getElementById("btnViewReport");o&&(o.onclick=()=>{a.viewMode="daily",W()}),x&&(x.onclick=()=>{a.viewMode="weekly",W()}),k&&(k.onclick=()=>{a.viewMode="report",W()});const y=document.getElementById("btnPrevDay"),w=document.getElementById("btnNextDay"),D=document.getElementById("btnJumpToday"),K=document.getElementById("hiddenDateInput"),ee=document.getElementById("datePickerBadge");y&&(y.onclick=()=>{a.selectedDate=ht(a.selectedDate,-1),W()}),w&&(w.onclick=()=>{a.selectedDate=ht(a.selectedDate,1),W()}),D&&(D.onclick=()=>{a.selectedDate=ze(),W()}),ee&&K&&(ee.onclick=()=>{try{typeof K.showPicker=="function"?K.showPicker():K.focus()}catch{K.focus()}},K.onchange=oe=>{oe.target.value&&(a.selectedDate=oe.target.value,W())});const Y=document.getElementById("admTeamSelect");Y&&(Y.onchange=oe=>{a.selectedPersonnelId=oe.target.value,W()});const I=document.getElementById("btnOpenAddTaskModal");I&&(I.onclick=()=>_e());const N=document.getElementById("btnPlannerActionsMenu"),L=document.getElementById("plannerActionsDropdown");N&&L&&(N.onclick=oe=>{oe.stopPropagation(),L.classList.toggle("hidden")},document.addEventListener("click",oe=>{!L.contains(oe.target)&&oe.target!==N&&L.classList.add("hidden")}));const v=document.getElementById("btnActionImport");v&&(v.onclick=()=>{L==null||L.classList.add("hidden"),Fe()});const ne=document.getElementById("btnActionExportPng");ne&&(ne.onclick=()=>{L==null||L.classList.add("hidden"),Oe()});const ie=document.getElementById("btnActionExportPdf");ie&&(ie.onclick=()=>{L==null||L.classList.add("hidden"),Qe()});const pe=document.getElementById("btnActionBackup");pe&&(pe.onclick=()=>{L==null||L.classList.add("hidden"),Ve()});const re=document.getElementById("btnActionSettings");re&&(re.onclick=()=>{L==null||L.classList.add("hidden"),Ye()})}function rt(o){if(a.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(I=>{I.onclick=()=>{a.filterStatus=I.dataset.f,W()}});const x=document.getElementById("plannerTaskSearchInp");x&&(x.oninput=I=>{a.searchQuery=I.target.value,W()});const k=document.getElementById("btnClearSearch");k&&(k.onclick=()=>{a.searchQuery="",W()});const y=document.getElementById("quickAddTitleInp"),w=document.getElementById("quickAddPriority"),D=document.getElementById("quickAddCategory"),K=document.getElementById("btnQuickAddSubmit"),ee=async()=>{const I=((y==null?void 0:y.value)||"").trim();if(!I){z("Please enter a task title",!0),y==null||y.focus();return}try{const N={title:I,dateStr:a.selectedDate,priority:(w==null?void 0:w.value)||p.defaultPriority,category:(D==null?void 0:D.value)||"General",status:"Pending"};r&&a.selectedPersonnelId!=="all"&&(N.personnelId=a.selectedPersonnelId);const L=await ye("/tasks",N);a.tasks.unshift(L),z("Task added to today's focus! ✨"),y&&(y.value="",y.focus()),W()}catch(N){z(N.message,!0)}};K&&(K.onclick=ee),y&&(y.onkeydown=I=>{I.key==="Enter"&&ee()});const Y=document.getElementById("btnEmptyStateImport");Y&&(Y.onclick=()=>Fe())}if(a.viewMode==="weekly"){const x=document.getElementById("btnPrevWeek"),k=document.getElementById("btnNextWeek"),y=document.getElementById("btnThisWeek");x&&(x.onclick=()=>{a.selectedDate=ht(a.selectedDate,-7),W()}),k&&(k.onclick=()=>{a.selectedDate=ht(a.selectedDate,7),W()}),y&&(y.onclick=()=>{a.selectedDate=ze(),W()}),document.querySelectorAll(".day-col-header").forEach(w=>{w.onclick=()=>{a.selectedDate=w.dataset.date,a.viewMode="daily",W()}}),document.querySelectorAll('[data-action="add-day"]').forEach(w=>{w.onclick=()=>{_e(null,w.dataset.date)}})}if(a.viewMode==="report"){const x=document.getElementById("btnDownloadWeeklyPdf");x&&(x.onclick=Qe)}n.querySelectorAll('[data-action="toggle"]').forEach(x=>{x.onclick=async k=>{k.stopPropagation();const y=x.dataset.id;await Ne(y)}}),n.querySelectorAll('[data-action="edit"]').forEach(x=>{x.onclick=k=>{k.stopPropagation();const y=x.dataset.id,w=a.tasks.find(D=>D._id===y);w&&_e(w)}}),n.querySelectorAll('[data-action="delete"]').forEach(x=>{x.onclick=async k=>{k.stopPropagation();const y=x.dataset.id;await lt(y)}})}async function Ne(o){const x=a.tasks.find(y=>y._id===o);if(!x)return;const k=x.status!=="Completed";try{const y=await ha(`/tasks/${o}/toggle`,{}),w=a.tasks.findIndex(D=>D._id===o);w!==-1&&(a.tasks[w]=y),k?(p.soundEnabled&&ya(),z("Task marked as completed! 🎉")):z("Task reopened as pending."),W()}catch(y){z(y.message,!0)}}async function lt(o){const x=a.tasks.find(k=>k._id===o);if(x&&confirm(`Are you sure you want to remove "${x.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Yt(`/tasks/${o}`),a.tasks=a.tasks.filter(k=>k._id!==o),z("Task removed from planner (safely stored in database archive)"),W()}catch(k){z(k.message,!0)}}function _e(o=null,x=null){const k=!!o,y=o?o.dateStr||(o.dueDate?new Date(o.dueDate).toISOString().slice(0,10):a.selectedDate):x||a.selectedDate,w=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${k?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${C((o==null?void 0:o.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${C((o==null?void 0:o.description)||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${y}" required>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${(o==null?void 0:o.startTime)||""}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${(o==null?void 0:o.dueTime)||""}">
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${(o==null?void 0:o.priority)==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!o&&p.defaultPriority==="Medium"||(o==null?void 0:o.priority)==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!o&&p.defaultPriority==="High"||(o==null?void 0:o.priority)==="High"?"selected":""}>High</option>
                <option value="Urgent" ${(o==null?void 0:o.priority)==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${(o==null?void 0:o.status)==="Pending"||(o==null?void 0:o.status)==="Todo"||!o?"selected":""}>Pending</option>
                <option value="In Progress" ${(o==null?void 0:o.status)==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${(o==null?void 0:o.status)==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${C((o==null?void 0:o.category)||"General")}">
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
                <option value="all" ${!o||o!=null&&o.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${a.personnelList.map(N=>{var v;const L=((v=o==null?void 0:o.personnelId)==null?void 0:v._id)===N._id||(o==null?void 0:o.personnelId)===N._id;return`<option value="${N._id}" ${L?"selected":""}>${C(N.name)} (${C(N.department||N.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
            <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
              ${k?"Save Changes":"Create Task"}
            </button>
          </div>
        </form>
      </div>
    `,D=mt(w),K=D.querySelector("#taskForm"),ee=D.querySelector("#btnModalClose"),Y=D.querySelector("#btnCancelModal"),I=()=>D.remove();ee&&(ee.onclick=I),Y&&(Y.onclick=I),K.onsubmit=async N=>{var P;N.preventDefault();const L=D.querySelector("#taskTitle").value.trim(),v=D.querySelector("#taskDesc").value.trim(),ne=D.querySelector("#taskDate").value,ie=D.querySelector("#taskStartTime").value.trim(),pe=D.querySelector("#taskDueTime").value.trim(),re=D.querySelector("#taskPriority").value,oe=D.querySelector("#taskStatus").value,c=D.querySelector("#taskCategory").value.trim()||"General";if(!L){z("Task title is required",!0);return}const f={title:L,description:v,dateStr:ne,startTime:ie,dueTime:pe,priority:re,status:oe,category:c};if(r){const m=(P=D.querySelector("#taskAssignee"))==null?void 0:P.value;m==="all"?(f.assignAll=!0,f.personnelId="all"):m&&(f.personnelId=m)}const l=D.querySelector("#btnSaveTask");l.disabled=!0,l.textContent="Saving...";try{if(k){const m=await yt(`/tasks/${o._id}`,f),q=a.tasks.findIndex(A=>A._id===o._id);q!==-1&&(a.tasks[q]=m),z("Task updated successfully! ✍️")}else{const m=await ye("/tasks",f);Array.isArray(m.tasks)?m.tasks.forEach(q=>a.tasks.unshift(q)):a.tasks.unshift(m),z("Task created successfully! ✨")}I(),W()}catch(m){z(m.message,!0),l.disabled=!1,l.textContent=k?"Save Changes":"Create Task"}}}function Fe(){let o=[];const x=`
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
    `,k=mt(x),y=()=>k.remove();k.querySelector("#btnImportClose").onclick=y,k.querySelector("#btnCancelImport").onclick=y;const w=k.querySelector("#importTextarea"),D=k.querySelector("#importFileInput"),K=k.querySelector("#importDropzone"),ee=k.querySelector("#previewListArea"),Y=k.querySelector("#previewCountLabel"),I=k.querySelector("#btnConfirmImport"),N=k.querySelector("#importFileInfo");function L(ne){if(!ne)return[];const ie=ne.split(/\r?\n/),pe=[];for(let re of ie)re=re.trim(),re&&(re=re.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),re=re.replace(/^[-*•]\s+/,""),re=re.replace(/^\d+[\.\)]\s+/,""),re=re.trim(),re&&pe.push(re));return pe}function v(){const ne=w.value,ie=L(ne),pe=k.querySelector("#importTargetDate").value,re=E(pe),oe=new Set(re.map(c=>(c.title||"").trim().toLowerCase()));o=[];for(const c of ie){const f=oe.has(c.toLowerCase());o.push({title:c,isDuplicate:f})}if(Y.textContent=`Preview (${o.length} ${o.length===1?"task":"tasks"} found)`,I.disabled=o.length===0,I.textContent=`Import ${o.length} ${o.length===1?"Task":"Tasks"}`,o.length===0){ee.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}ee.innerHTML=o.map((c,f)=>`
        <div class="preview-item ${c.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${f+1}.</span>
          <span class="preview-title">${C(c.title)}</span>
          ${c.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}w.oninput=v,K.onclick=()=>D.click(),D.onchange=ne=>{const ie=ne.target.files[0];if(!ie)return;N.textContent=`File selected: ${ie.name} (${Math.round(ie.size/1024)} KB)`;const pe=new FileReader;pe.onload=re=>{w.value=re.target.result,v()},pe.readAsText(ie)},K.ondragover=ne=>{ne.preventDefault(),K.classList.add("dragover")},K.ondragleave=()=>K.classList.remove("dragover"),K.ondrop=ne=>{ne.preventDefault(),K.classList.remove("dragover");const ie=ne.dataTransfer.files[0];if(ie&&(ie.type==="text/plain"||ie.name.endsWith(".txt"))){N.textContent=`File dropped: ${ie.name}`;const pe=new FileReader;pe.onload=re=>{w.value=re.target.result,v()},pe.readAsText(ie)}else z("Please drop a valid .txt plain-text file",!0)},I.onclick=async()=>{if(o.length===0)return;I.disabled=!0,I.textContent="Importing...";const ne=k.querySelector("#importTargetDate").value,ie=k.querySelector("#importPriority").value,pe=k.querySelector("#importCategory").value.trim()||"General",re={date:ne,tasks:o.map(oe=>({title:oe.title,priority:ie,category:pe,status:"Pending"}))};r&&a.selectedPersonnelId!=="all"&&(re.personnelId=a.selectedPersonnelId);try{const oe=await ye("/tasks/bulk-import",re);Array.isArray(oe.tasks)&&oe.tasks.forEach(c=>a.tasks.unshift(c)),z(`Imported ${oe.importedCount} tasks successfully! (${oe.skippedCount} skipped duplicates)`),y(),a.selectedDate=ne,W()}catch(oe){z(oe.message,!0),I.disabled=!1,I.textContent="Retry Import"}}}async function Oe(){const o=E(a.selectedDate),x=_(o,ze()),k=ot(a.selectedDate),y=2,w=800,D=160,K=90,ee=65,Y=70,I=Math.max(120,o.length*ee),N=D+K+I+Y,L=document.createElement("canvas");L.width=w*y,L.height=N*y;const v=L.getContext("2d");v.scale(y,y);const ne=document.documentElement.getAttribute("data-theme")==="dark",ie=ne?"#0F172A":"#F8FAFC",pe=ne?"#1E293B":"#FFFFFF",re=ne?"#334155":"#E2E8F0",oe=ne?"#F8FAFC":"#0F172A",c=ne?"#94A3B8":"#475569",f="#4F46E5",l="#10B981",P="#F59E0B";v.fillStyle=ie,v.fillRect(0,0,w,N),v.fillStyle=pe,Be(v,24,20,w-48,D-30,16),v.fill(),v.strokeStyle=re,v.lineWidth=1,v.stroke(),v.fillStyle=f,v.font="bold 12px Inter, sans-serif",v.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),v.fillStyle=oe,v.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',v.fillText(k,44,86),v.fillStyle=c,v.font="13px Inter, sans-serif",v.fillText(`Planned focus list · ${x.completed} of ${x.total} tasks completed (${x.percent}%)`,44,114);const m=D+6;v.fillStyle=pe,Be(v,24,m,w-48,K-16,12),v.fill(),v.stroke();const q=[{label:"TOTAL TASKS",val:String(x.total),color:oe},{label:"COMPLETED",val:String(x.completed),color:l},{label:"IN PROGRESS",val:String(x.inProgress),color:P},{label:"PENDING",val:String(x.pending),color:c},{label:"PROGRESS",val:`${x.percent}%`,color:f}],A=(w-48)/q.length;q.forEach((X,ae)=>{const S=24+ae*A+20;v.fillStyle=X.color,v.font="bold 20px Inter, sans-serif",v.fillText(X.val,S,m+36),v.fillStyle=c,v.font="10px Inter, sans-serif",v.fillText(X.label,S,m+54)});const B=m+K;v.fillStyle=pe,Be(v,24,B,w-48,I+10,16),v.fill(),v.stroke(),o.length===0?(v.fillStyle=c,v.font="14px Inter, sans-serif",v.textAlign="center",v.fillText("No scheduled tasks recorded for this date.",w/2,B+60),v.textAlign="left"):o.forEach((X,ae)=>{const S=B+16+ae*ee,M=X.status==="Completed";v.beginPath(),v.arc(48,S+14,10,0,Math.PI*2),M?(v.fillStyle=l,v.fill(),v.strokeStyle="#FFFFFF",v.lineWidth=2,v.beginPath(),v.moveTo(44,S+14),v.lineTo(47,S+17),v.lineTo(52,S+11),v.stroke()):(v.strokeStyle=re,v.lineWidth=2,v.stroke()),v.fillStyle=M?c:oe,v.font=`${M?"normal":"500"} 14px Inter, sans-serif`;const te=X.title.length>55?X.title.slice(0,52)+"...":X.title;if(v.fillText(te,70,S+18),M){const ve=v.measureText(te);v.strokeStyle=c,v.lineWidth=1.2,v.beginPath(),v.moveTo(70,S+14),v.lineTo(70+ve.width,S+14),v.stroke()}const U=X.priority||"Medium";let Q="#E2E8F0",Z="#334155";U==="Urgent"?(Q="#FEE2E2",Z="#DC2626"):U==="High"?(Q="#FEF3C7",Z="#D97706"):U==="Low"&&(Q="#ECFDF5",Z="#059669"),v.fillStyle=Q,Be(v,w-150,S+4,60,20,10),v.fill(),v.fillStyle=Z,v.font="bold 10px Inter, sans-serif",v.fillText(U,w-138,S+18);const de=X.dueTime?`🕒 ${X.dueTime}`:X.category||"General";v.fillStyle=c,v.font="11px Inter, sans-serif",v.fillText(de,70,S+34),ae<o.length-1&&(v.strokeStyle=re,v.lineWidth=.6,v.beginPath(),v.moveTo(40,S+48),v.lineTo(w-40,S+48),v.stroke())});const R=N-35;v.fillStyle=c,v.font="11px Inter, sans-serif",v.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,R);try{const X=L.toDataURL("image/png"),ae=document.createElement("a");ae.href=X,ae.download=`ci360-daily-planner-${a.selectedDate}.png`,document.body.appendChild(ae),ae.click(),ae.remove(),z("Daily Planner image exported! 🖼️")}catch(X){z("Failed to export image: "+X.message,!0)}}function Be(o,x,k,y,w,D){o.beginPath(),o.moveTo(x+D,k),o.lineTo(x+y-D,k),o.quadraticCurveTo(x+y,k,x+y,k+D),o.lineTo(x+y,k+w-D),o.quadraticCurveTo(x+y,k+w,x+y-D,k+w),o.lineTo(x+D,k+w),o.quadraticCurveTo(x,k+w,x,k+w-D),o.lineTo(x,k+D),o.quadraticCurveTo(x,k,x+D,k),o.closePath()}function Qe(){const o=_t(a.selectedDate,p.weekStartsOn),x=ot(o[0]),k=ot(o[6]);ze();const y=a.tasks.filter(I=>{if(I.isDeleted===!0)return!1;const N=I.dateStr||(I.dueDate?new Date(I.dueDate).toISOString().slice(0,10):"");return o.includes(N)}),w=y.length,D=y.filter(I=>I.status==="Completed").length,K=w>0?Math.round(D/w*100):0,ee=window.open("","_blank");if(!ee){z("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const Y=`
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
            <div class="period">${x} – ${k}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${w}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${D}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${w-D}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${K}%</div>
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
            ${o.map(I=>{const N=E(I);return N.length===0?`<tr><td><strong>${He(I)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:N.map(L=>`
                <tr>
                  <td><strong>${He(I)}</strong></td>
                  <td>${C(L.title)}</td>
                  <td><span class="badge badge-${(L.priority||"medium").toLowerCase().slice(0,3)}">${L.priority||"Medium"}</span></td>
                  <td>${C(L.category||"General")}</td>
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
    `;ee.document.write(Y),ee.document.close(),z("Weekly PDF report generated for printing! 📄")}function Ve(){const x=mt(`
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
    `),k=()=>x.remove();x.querySelector("#btnBackupClose").onclick=k;const y=x.querySelector("#btnDownloadBackupJson");y.onclick=async()=>{y.disabled=!0,y.textContent="Generating backup...";try{const I=await De("/tasks/backup"),N=new Blob([JSON.stringify(I,null,2)],{type:"application/json"}),L=URL.createObjectURL(N),v=document.createElement("a");v.href=L,v.download=`ci360-planner-backup-${ze()}.json`,document.body.appendChild(v),v.click(),v.remove(),z("Planner backup downloaded successfully! 💾")}catch(I){z("Backup export failed: "+I.message,!0)}finally{y.disabled=!1,y.textContent="Download JSON Backup"}};const w=x.querySelector("#restoreFileInput"),D=x.querySelector("#restorePreviewArea"),K=x.querySelector("#restoreCountText"),ee=x.querySelector("#btnExecuteRestore");let Y=null;w.onchange=I=>{const N=I.target.files[0];if(!N)return;const L=new FileReader;L.onload=v=>{try{const ne=JSON.parse(v.target.result),ie=Array.isArray(ne.tasks)?ne.tasks:Array.isArray(ne)?ne:null;if(!ie||ie.length===0){z("Invalid backup file: No tasks found",!0);return}Y=ie,D.style.display="block",K.textContent=`Valid backup: ${ie.length} tasks ready to restore.`,ee.disabled=!1}catch(ne){z("Error parsing JSON backup file: "+ne.message,!0),D.style.display="none",ee.disabled=!0}},L.readAsText(N)},ee.onclick=async()=>{var N;if(!Y||Y.length===0)return;ee.disabled=!0,ee.textContent="Restoring...";const I=((N=x.querySelector('input[name="restoreMode"]:checked'))==null?void 0:N.value)||"merge";try{const L=await ye("/tasks/restore",{tasks:Y,mode:I});z(`Restored ${L.restoredCount} tasks! (${L.skippedCount} skipped) ✨`),k(),await h()}catch(L){z("Restore failed: "+L.message,!0),ee.disabled=!1,ee.textContent="Retry Restore"}}}function Ye(){const o=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${C(p.displayName||"Daily Planner")}">
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
              <input type="text" id="setTimezone" class="input" value="${C(p.timezone||"Asia/Kolkata")}" readonly>
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
    `,x=mt(o),k=()=>x.remove();x.querySelector("#btnSettingsClose").onclick=k,x.querySelector("#btnCancelSettings").onclick=k,x.querySelector("#settingsForm").onsubmit=y=>{y.preventDefault(),p.displayName=x.querySelector("#setDisplayName").value.trim()||"Daily Planner",p.weekStartsOn=Number(x.querySelector("#setWeekStart").value),p.defaultPriority=x.querySelector("#setDefaultPriority").value,p.density=x.querySelector("#setDensity").value,p.soundEnabled=x.querySelector("#setSound").checked,xa(p),z("Planner preferences saved! ⚙️"),k(),W()}}}function wa(){if(document.getElementById("ci360-planner-styles"))return;const n=document.createElement("style");n.id="ci360-planner-styles",n.textContent=`
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
  `,document.head.appendChild(n)}function ka(n){return n!==null?{comment:n,variations:[]}:{variations:[]}}function Sa(n,t,e,i,s){const r={move:n,variations:s};return t&&(r.suffix=t),e&&(r.nag=e),i!==null&&(r.comment=i),r}function $a(...n){const[t,...e]=n;let i=t;for(const s of e)s!==null&&(i.variations=[s,...s.variations],s.variations=[],i=s);return t}function _a(n,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const i=e.variations[0];if(!i){e.comment=t.marker.comment;break}e=i}}return{headers:n,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ca(n,t){function e(){this.constructor=n}e.prototype=t.prototype,n.prototype=new e}function st(n,t,e,i){var s=Error.call(this,n);return Object.setPrototypeOf&&Object.setPrototypeOf(s,st.prototype),s.expected=t,s.found=e,s.location=i,s.name="SyntaxError",s}Ca(st,Error);function Ct(n,t,e){return e=e||" ",n.length>t?n:(t-=n.length,e+=e.repeat(t),n+e.slice(0,t))}st.prototype.format=function(n){var t="Error: "+this.message;if(this.location){var e=null,i;for(i=0;i<n.length;i++)if(n[i].source===this.location.source){e=n[i].text.split(/\r\n|\n|\r/g);break}var s=this.location.start,r=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(s):s,p=this.location.source+":"+r.line+":"+r.column;if(e){var a=this.location.end,h=Ct("",r.line.toString().length," "),$=e[s.line-1],E=s.line===a.line?a.column:$.length+1,F=E-s.column||1;t+=`
 --> `+p+`
`+h+` |
`+r.line+" | "+$+`
`+h+" | "+Ct("",s.column-1," ")+Ct("",F,"^")}else t+=`
 at `+p}return t};st.buildMessage=function(n,t){var e={literal:function($){return'"'+s($.text)+'"'},class:function($){var E=$.parts.map(function(F){return Array.isArray(F)?r(F[0])+"-"+r(F[1]):r(F)});return"["+($.inverted?"^":"")+E.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function($){return $.description}};function i($){return $.charCodeAt(0).toString(16).toUpperCase()}function s($){return $.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(E){return"\\x0"+i(E)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(E){return"\\x"+i(E)})}function r($){return $.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(E){return"\\x0"+i(E)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(E){return"\\x"+i(E)})}function p($){return e[$.type]($)}function a($){var E=$.map(p),F,_;if(E.sort(),E.length>0){for(F=1,_=1;F<E.length;F++)E[F-1]!==E[F]&&(E[_]=E[F],_++);E.length=_}switch(E.length){case 1:return E[0];case 2:return E[0]+" or "+E[1];default:return E.slice(0,-1).join(", ")+", or "+E[E.length-1]}}function h($){return $?'"'+s($)+'"':"end of input"}return"Expected "+a(n)+" but "+h(t)+" found."};function Ea(n,t){t=t!==void 0?t:{};var e={},i=t.grammarSource,s={pgn:Rt},r=Rt,p="[",a='"',h="]",$=".",E="O-O-O",F="O-O",_="0-0-0",W="0-0",O="$",ge="{",le="}",Te=";",nt="(",Ue=")",$e="1-0",rt="0-1",Ne="1/2-1/2",lt="*",_e=/^[a-zA-Z]/,Fe=/^[^"]/,Oe=/^[0-9]/,Be=/^[.]/,Qe=/^[a-zA-Z1-8\-=]/,Ve=/^[+#]/,Ye=/^[!?]/,o=/^[^}]/,x=/^[^\r\n]/,k=/^[ \t\r\n]/,y=Ie("tag pair"),w=xe("[",!1),D=xe('"',!1),K=xe("]",!1),ee=Ie("tag name"),Y=Re([["a","z"],["A","Z"]],!1,!1),I=Ie("tag value"),N=Re(['"'],!0,!1),L=Ie("move number"),v=Re([["0","9"]],!1,!1),ne=xe(".",!1),ie=Re(["."],!1,!1),pe=Ie("standard algebraic notation"),re=xe("O-O-O",!1),oe=xe("O-O",!1),c=xe("0-0-0",!1),f=xe("0-0",!1),l=Re([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),P=Re(["+","#"],!1,!1),m=Ie("suffix annotation"),q=Re(["!","?"],!1,!1),A=Ie("NAG"),B=xe("$",!1),R=Ie("brace comment"),X=xe("{",!1),ae=Re(["}"],!0,!1),S=xe("}",!1),M=Ie("rest of line comment"),te=xe(";",!1),U=Re(["\r",`
`],!0,!1),Q=Ie("variation"),Z=xe("(",!1),de=xe(")",!1),ve=Ie("game termination marker"),be=xe("1-0",!1),Je=xe("0-1",!1),ce=xe("1/2-1/2",!1),fe=xe("*",!1),ke=Ie("whitespace"),Me=Re([" ","	","\r",`
`],!1,!1),Ee=function(d,u){return _a(d,u)},qe=function(d){return Object.fromEntries(d)},Xe=function(d,u){return[d,u]},je=function(d,u){return{root:d,marker:u}},Ze=function(d,u){return $a(ka(d),...u.flat())},dt=function(d,u,b,H,G){return Sa(d,u,b,H,G)},Xt=function(d){return d},Zt=function(d){return d.replace(/[\r\n]+/g," ")},ea=function(d){return d.trim()},ta=function(d){return d},aa=function(d,u){return{result:d,comment:u}},g=t.peg$currPos|0,it=[{line:1,column:1}],Le=g,bt=t.peg$maxFailExpected||[],T=t.peg$silentFails|0,ct;if(t.startRule){if(!(t.startRule in s))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');r=s[t.startRule]}function xe(d,u){return{type:"literal",text:d,ignoreCase:u}}function Re(d,u,b){return{type:"class",parts:d,inverted:u,ignoreCase:b}}function na(){return{type:"end"}}function Ie(d){return{type:"other",description:d}}function zt(d){var u=it[d],b;if(u)return u;if(d>=it.length)b=it.length-1;else for(b=d;!it[--b];);for(u=it[b],u={line:u.line,column:u.column};b<d;)n.charCodeAt(b)===10?(u.line++,u.column=1):u.column++,b++;return it[d]=u,u}function qt(d,u,b){var H=zt(d),G=zt(u),se={source:i,start:{offset:d,line:H.line,column:H.column},end:{offset:u,line:G.line,column:G.column}};return se}function j(d){g<Le||(g>Le&&(Le=g,bt=[]),bt.push(d))}function ra(d,u,b){return new st(st.buildMessage(d,u),d,u,b)}function Rt(){var d,u,b;return d=g,u=ia(),b=la(),d=Ee(u,b),d}function ia(){var d,u,b;for(d=g,u=[],b=Nt();b!==e;)u.push(b),b=Nt();return b=Ae(),d=qe(u),d}function Nt(){var d,u,b,H,G,se,et;return T++,d=g,Ae(),n.charCodeAt(g)===91?(u=p,g++):(u=e,T===0&&j(w)),u!==e?(Ae(),b=oa(),b!==e?(Ae(),n.charCodeAt(g)===34?(H=a,g++):(H=e,T===0&&j(D)),H!==e?(G=sa(),n.charCodeAt(g)===34?(se=a,g++):(se=e,T===0&&j(D)),se!==e?(Ae(),n.charCodeAt(g)===93?(et=h,g++):(et=e,T===0&&j(K)),et!==e?d=Xe(b,G):(g=d,d=e)):(g=d,d=e)):(g=d,d=e)):(g=d,d=e)):(g=d,d=e),T--,d===e&&T===0&&j(y),d}function oa(){var d,u,b;if(T++,d=g,u=[],b=n.charAt(g),_e.test(b)?g++:(b=e,T===0&&j(Y)),b!==e)for(;b!==e;)u.push(b),b=n.charAt(g),_e.test(b)?g++:(b=e,T===0&&j(Y));else u=e;return u!==e?d=n.substring(d,g):d=u,T--,d===e&&(u=e,T===0&&j(ee)),d}function sa(){var d,u,b;for(T++,d=g,u=[],b=n.charAt(g),Fe.test(b)?g++:(b=e,T===0&&j(N));b!==e;)u.push(b),b=n.charAt(g),Fe.test(b)?g++:(b=e,T===0&&j(N));return d=n.substring(d,g),T--,u=e,T===0&&j(I),d}function la(){var d,u,b;return d=g,u=Ft(),Ae(),b=ba(),b===e&&(b=null),Ae(),d=je(u,b),d}function Ft(){var d,u,b,H;for(d=g,u=$t(),u===e&&(u=null),b=[],H=Ot();H!==e;)b.push(H),H=Ot();return d=Ze(u,b),d}function Ot(){var d,u,b,H,G,se,et,ft;if(d=g,Ae(),da(),Ae(),u=ca(),u!==e){for(b=pa(),b===e&&(b=null),H=[],G=Bt();G!==e;)H.push(G),G=Bt();for(G=Ae(),se=$t(),se===e&&(se=null),et=[],ft=jt();ft!==e;)et.push(ft),ft=jt();d=dt(u,b,H,se,et)}else g=d,d=e;return d}function da(){var d,u,b,H,G,se;for(T++,d=g,u=[],b=n.charAt(g),Oe.test(b)?g++:(b=e,T===0&&j(v));b!==e;)u.push(b),b=n.charAt(g),Oe.test(b)?g++:(b=e,T===0&&j(v));if(n.charCodeAt(g)===46?(b=$,g++):(b=e,T===0&&j(ne)),b!==e){for(H=Ae(),G=[],se=n.charAt(g),Be.test(se)?g++:(se=e,T===0&&j(ie));se!==e;)G.push(se),se=n.charAt(g),Be.test(se)?g++:(se=e,T===0&&j(ie));u=[u,b,H,G],d=u}else g=d,d=e;return T--,d===e&&(u=e,T===0&&j(L)),d}function ca(){var d,u,b,H,G,se;if(T++,d=g,u=g,n.substr(g,5)===E?(b=E,g+=5):(b=e,T===0&&j(re)),b===e&&(n.substr(g,3)===F?(b=F,g+=3):(b=e,T===0&&j(oe)),b===e&&(n.substr(g,5)===_?(b=_,g+=5):(b=e,T===0&&j(c)),b===e&&(n.substr(g,3)===W?(b=W,g+=3):(b=e,T===0&&j(f)),b===e))))if(b=g,H=n.charAt(g),_e.test(H)?g++:(H=e,T===0&&j(Y)),H!==e){if(G=[],se=n.charAt(g),Qe.test(se)?g++:(se=e,T===0&&j(l)),se!==e)for(;se!==e;)G.push(se),se=n.charAt(g),Qe.test(se)?g++:(se=e,T===0&&j(l));else G=e;G!==e?(H=[H,G],b=H):(g=b,b=e)}else g=b,b=e;return b!==e?(H=n.charAt(g),Ve.test(H)?g++:(H=e,T===0&&j(P)),H===e&&(H=null),b=[b,H],u=b):(g=u,u=e),u!==e?d=n.substring(d,g):d=u,T--,d===e&&(u=e,T===0&&j(pe)),d}function pa(){var d,u,b;for(T++,d=g,u=[],b=n.charAt(g),Ye.test(b)?g++:(b=e,T===0&&j(q));b!==e;)u.push(b),u.length>=2?b=e:(b=n.charAt(g),Ye.test(b)?g++:(b=e,T===0&&j(q)));return u.length<1?(g=d,d=e):d=u,T--,d===e&&(u=e,T===0&&j(m)),d}function Bt(){var d,u,b,H,G;if(T++,d=g,Ae(),n.charCodeAt(g)===36?(u=O,g++):(u=e,T===0&&j(B)),u!==e){if(b=g,H=[],G=n.charAt(g),Oe.test(G)?g++:(G=e,T===0&&j(v)),G!==e)for(;G!==e;)H.push(G),G=n.charAt(g),Oe.test(G)?g++:(G=e,T===0&&j(v));else H=e;H!==e?b=n.substring(b,g):b=H,b!==e?d=Xt(b):(g=d,d=e)}else g=d,d=e;return T--,d===e&&T===0&&j(A),d}function $t(){var d;return d=ga(),d===e&&(d=ua()),d}function ga(){var d,u,b,H,G;if(T++,d=g,n.charCodeAt(g)===123?(u=ge,g++):(u=e,T===0&&j(X)),u!==e){for(b=g,H=[],G=n.charAt(g),o.test(G)?g++:(G=e,T===0&&j(ae));G!==e;)H.push(G),G=n.charAt(g),o.test(G)?g++:(G=e,T===0&&j(ae));b=n.substring(b,g),n.charCodeAt(g)===125?(H=le,g++):(H=e,T===0&&j(S)),H!==e?d=Zt(b):(g=d,d=e)}else g=d,d=e;return T--,d===e&&(u=e,T===0&&j(R)),d}function ua(){var d,u,b,H,G;if(T++,d=g,n.charCodeAt(g)===59?(u=Te,g++):(u=e,T===0&&j(te)),u!==e){for(b=g,H=[],G=n.charAt(g),x.test(G)?g++:(G=e,T===0&&j(U));G!==e;)H.push(G),G=n.charAt(g),x.test(G)?g++:(G=e,T===0&&j(U));b=n.substring(b,g),d=ea(b)}else g=d,d=e;return T--,d===e&&(u=e,T===0&&j(M)),d}function jt(){var d,u,b,H;return T++,d=g,Ae(),n.charCodeAt(g)===40?(u=nt,g++):(u=e,T===0&&j(Z)),u!==e?(b=Ft(),b!==e?(Ae(),n.charCodeAt(g)===41?(H=Ue,g++):(H=e,T===0&&j(de)),H!==e?d=ta(b):(g=d,d=e)):(g=d,d=e)):(g=d,d=e),T--,d===e&&T===0&&j(Q),d}function ba(){var d,u,b;return T++,d=g,n.substr(g,3)===$e?(u=$e,g+=3):(u=e,T===0&&j(be)),u===e&&(n.substr(g,3)===rt?(u=rt,g+=3):(u=e,T===0&&j(Je)),u===e&&(n.substr(g,7)===Ne?(u=Ne,g+=7):(u=e,T===0&&j(ce)),u===e&&(n.charCodeAt(g)===42?(u=lt,g++):(u=e,T===0&&j(fe))))),u!==e?(Ae(),b=$t(),b===e&&(b=null),d=aa(u,b)):(g=d,d=e),T--,d===e&&(u=e,T===0&&j(ve)),d}function Ae(){var d,u;for(T++,d=[],u=n.charAt(g),k.test(u)?g++:(u=e,T===0&&j(Me));u!==e;)d.push(u),u=n.charAt(g),k.test(u)?g++:(u=e,T===0&&j(Me));return T--,u=e,T===0&&j(ke),d}if(ct=r(),t.peg$library)return{peg$result:ct,peg$currPos:g,peg$FAILED:e,peg$maxFailExpected:bt,peg$maxFailPos:Le};if(ct!==e&&g===n.length)return ct;throw ct!==e&&g<n.length&&j(na()),ra(bt,Le<n.length?n.charAt(Le):null,Le<n.length?qt(Le,Le+1):qt(Le,Le))}/**
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
 */const wt=0xffffffffffffffffn;function Et(n,t){return(n<<t|n>>64n-t)&0xffffffffffffffffn}function Wt(n,t){return n*t&wt}function Aa(n){return function(){let t=BigInt(n&wt),e=BigInt(n>>64n&wt);const i=Wt(Et(Wt(t,5n),7n),9n);return e^=t,t=(Et(t,24n)^e^e<<16n)&wt,e=Et(e,37n),n=e<<64n|t,i}}const St=Aa(0xa187eb39cdcaed8f31c4b365b102e01en),Ta=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>St()))),Pa=Array.from({length:8},()=>St()),Da=Array.from({length:16},()=>St()),At=St(),Ce="w",Pe="b",me="p",Mt="n",kt="b",gt="r",Ke="q",he="k",Tt="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class vt{constructor(t,e){ue(this,"color");ue(this,"from");ue(this,"to");ue(this,"piece");ue(this,"captured");ue(this,"promotion");ue(this,"flags");ue(this,"san");ue(this,"lan");ue(this,"before");ue(this,"after");const{color:i,piece:s,from:r,to:p,flags:a,captured:h,promotion:$}=e,E=we(r),F=we(p);this.color=i,this.piece=s,this.from=E,this.to=F,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=E+F,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const _ in J)J[_]&a&&(this.flags+=tt[_]);h&&(this.captured=h),$&&(this.promotion=$,this.lan+=$)}isCapture(){return this.flags.indexOf(tt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(tt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(tt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(tt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(tt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(tt.BIG_PAWN)>-1}}const Se=-1,tt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},J={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},Lt={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Ia={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Ma={...Lt,...Ia},V={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},Pt={b:[16,32,17,15],w:[-16,-32,-17,-15]},Kt={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},La=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],za=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],qa={p:1,n:2,b:4,r:8,q:16,k:32},Ra="pnbrqkPNBRQK",Ut=[Mt,kt,gt,Ke],Na=7,Fa=6,Oa=1,Ba=0,xt={[he]:J.KSIDE_CASTLE,[Ke]:J.QSIDE_CASTLE},Ge={w:[{square:V.a1,flag:J.QSIDE_CASTLE},{square:V.h1,flag:J.KSIDE_CASTLE}],b:[{square:V.a8,flag:J.QSIDE_CASTLE},{square:V.h8,flag:J.KSIDE_CASTLE}]},ja={b:Oa,w:Fa},Dt="--";function at(n){return n>>4}function ut(n){return n&15}function Jt(n){return"0123456789".indexOf(n)!==-1}function we(n){const t=ut(n),e=at(n);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function pt(n){return n===Ce?Pe:Ce}function Ha(n){const t=n.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const i=parseInt(t[4],10);if(isNaN(i)||i<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const s=t[0].split("/");if(s.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let p=0;p<s.length;p++){let a=0,h=!1;for(let $=0;$<s[p].length;$++)if(Jt(s[p][$])){if(h)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};a+=parseInt(s[p][$],10),h=!0}else{if(!/^[prnbqkPRNBQK]$/.test(s[p][$]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};a+=1,h=!1}if(a!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const r=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:p,regex:a}of r){if(!a.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${p} king`};if((t[0].match(a)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${p} kings`}}return Array.from(s[0]+s[7]).some(p=>p.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Ga(n,t){const e=n.from,i=n.to,s=n.piece;let r=0,p=0,a=0;for(let h=0,$=t.length;h<$;h++){const E=t[h].from,F=t[h].to,_=t[h].piece;s===_&&e!==E&&i===F&&(r++,at(e)===at(E)&&p++,ut(e)===ut(E)&&a++)}return r>0?p>0&&a>0?we(e):a>0?we(e).charAt(1):we(e).charAt(0):""}function We(n,t,e,i,s,r=void 0,p=J.NORMAL){const a=at(i);if(s===me&&(a===Na||a===Ba))for(let h=0;h<Ut.length;h++){const $=Ut[h];n.push({color:t,from:e,to:i,piece:s,captured:r,promotion:$,flags:p|J.PROMOTION})}else n.push({color:t,from:e,to:i,piece:s,captured:r,flags:p})}function Qt(n){let t=n.charAt(0);return t>="a"&&t<="h"?n.match(/[a-h]\d.*[a-h]\d/)?void 0:me:(t=t.toLowerCase(),t==="o"?he:t)}function It(n){return n.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class Vt{constructor(t=Tt,{skipValidation:e=!1}={}){ue(this,"_board",new Array(128));ue(this,"_turn",Ce);ue(this,"_header",{});ue(this,"_kings",{w:Se,b:Se});ue(this,"_epSquare",-1);ue(this,"_halfMoves",0);ue(this,"_moveNumber",0);ue(this,"_history",[]);ue(this,"_comments",{});ue(this,"_castling",{w:0,b:0});ue(this,"_hash",0n);ue(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Se,b:Se},this._turn=Ce,this._castling={w:0,b:0},this._epSquare=Se,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Ma},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:i=!1}={}){let s=t.split(/\s+/);if(s.length>=2&&s.length<6){const a=["-","-","0","1"];t=s.concat(a.slice(-(6-s.length))).join(" ")}if(s=t.split(/\s+/),!e){const{ok:a,error:h}=Ha(t);if(!a)throw new Error(h)}const r=s[0];let p=0;this.clear({preserveHeaders:i});for(let a=0;a<r.length;a++){const h=r.charAt(a);if(h==="/")p+=8;else if(Jt(h))p+=parseInt(h,10);else{const $=h<"a"?Ce:Pe;this._put({type:h.toLowerCase(),color:$},we(p)),p++}}this._turn=s[1],s[2].indexOf("K")>-1&&(this._castling.w|=J.KSIDE_CASTLE),s[2].indexOf("Q")>-1&&(this._castling.w|=J.QSIDE_CASTLE),s[2].indexOf("k")>-1&&(this._castling.b|=J.KSIDE_CASTLE),s[2].indexOf("q")>-1&&(this._castling.b|=J.QSIDE_CASTLE),this._epSquare=s[3]==="-"?Se:V[s[3]],this._halfMoves=parseInt(s[4],10),this._moveNumber=parseInt(s[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var p,a;let e=0,i="";for(let h=V.a8;h<=V.h1;h++){if(this._board[h]){e>0&&(i+=e,e=0);const{color:$,type:E}=this._board[h];i+=$===Ce?E.toUpperCase():E.toLowerCase()}else e++;h+1&136&&(e>0&&(i+=e),h!==V.h1&&(i+="/"),e=0,h+=8)}let s="";this._castling[Ce]&J.KSIDE_CASTLE&&(s+="K"),this._castling[Ce]&J.QSIDE_CASTLE&&(s+="Q"),this._castling[Pe]&J.KSIDE_CASTLE&&(s+="k"),this._castling[Pe]&J.QSIDE_CASTLE&&(s+="q"),s=s||"-";let r="-";if(this._epSquare!==Se)if(t)r=we(this._epSquare);else{const h=this._epSquare+(this._turn===Ce?16:-16),$=[h+1,h-1];for(const E of $){if(E&136)continue;const F=this._turn;if(((p=this._board[E])==null?void 0:p.color)===F&&((a=this._board[E])==null?void 0:a.type)===me){this._makeMove({color:F,from:E,to:this._epSquare,piece:me,captured:me,flags:J.EP_CAPTURE});const _=!this._isKingAttacked(F);if(this._undoMove(),_){r=we(this._epSquare);break}}}}return[i,this._turn,s,r,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:i}=this._board[t],s={w:0,b:1}[e],r={p:0,n:1,b:2,r:3,q:4,k:5}[i];return Ta[s][r][t]}_epKey(){return this._epSquare===Se?0n:Pa[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Da[t]}_computeHash(){let t=0n;for(let e=V.a8;e<=V.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=At),t}_updateSetup(t){this._history.length>0||(t!==Tt?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(Tt)}get(t){return this._board[V[t]]}findPiece(t){var i;const e=[];for(let s=V.a8;s<=V.h1;s++){if(s&136){s+=7;continue}!this._board[s]||((i=this._board[s])==null?void 0:i.color)!==t.color||this._board[s].color===t.color&&this._board[s].type===t.type&&e.push(we(s))}return e}put({type:t,color:e},i){return this._put({type:t,color:e},i)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},i){if(Ra.indexOf(t.toLowerCase())===-1||!(i in V))return!1;const s=V[i];if(t==he&&!(this._kings[e]==Se||this._kings[e]==s))return!1;const r=this._board[s];return r&&r.type===he&&(this._kings[r.color]=Se),this._set(s,{type:t,color:e}),t===he&&(this._kings[e]=s),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(V[t]),e&&e.type===he&&(this._kings[e.color]=Se),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var i,s,r,p,a,h,$,E,F,_,W,O;this._hash^=this._castlingKey();const t=((i=this._board[V.e1])==null?void 0:i.type)===he&&((s=this._board[V.e1])==null?void 0:s.color)===Ce,e=((r=this._board[V.e8])==null?void 0:r.type)===he&&((p=this._board[V.e8])==null?void 0:p.color)===Pe;(!t||((a=this._board[V.a1])==null?void 0:a.type)!==gt||((h=this._board[V.a1])==null?void 0:h.color)!==Ce)&&(this._castling.w&=-65),(!t||(($=this._board[V.h1])==null?void 0:$.type)!==gt||((E=this._board[V.h1])==null?void 0:E.color)!==Ce)&&(this._castling.w&=-33),(!e||((F=this._board[V.a8])==null?void 0:F.type)!==gt||((_=this._board[V.a8])==null?void 0:_.color)!==Pe)&&(this._castling.b&=-65),(!e||((W=this._board[V.h8])==null?void 0:W.type)!==gt||((O=this._board[V.h8])==null?void 0:O.color)!==Pe)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var r,p;if(this._epSquare===Se)return;const t=this._epSquare+(this._turn===Ce?-16:16),e=this._epSquare+(this._turn===Ce?16:-16),i=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((r=this._board[e])==null?void 0:r.color)!==pt(this._turn)||((p=this._board[e])==null?void 0:p.type)!==me){this._hash^=this._epKey(),this._epSquare=Se;return}const s=a=>{var h,$;return!(a&136)&&((h=this._board[a])==null?void 0:h.color)===this._turn&&(($=this._board[a])==null?void 0:$.type)===me};i.some(s)||(this._hash^=this._epKey(),this._epSquare=Se)}_attacked(t,e,i){const s=[];for(let r=V.a8;r<=V.h1;r++){if(r&136){r+=7;continue}if(this._board[r]===void 0||this._board[r].color!==t)continue;const p=this._board[r],a=r-e;if(a===0)continue;const h=a+119;if(La[h]&qa[p.type]){if(p.type===me){if(a>0&&p.color===Ce||a<=0&&p.color===Pe)if(i)s.push(we(r));else return!0;continue}if(p.type==="n"||p.type==="k")if(i){s.push(we(r));continue}else return!0;const $=za[h];let E=r+$,F=!1;for(;E!==e;){if(this._board[E]!=null){F=!0;break}E+=$}if(!F)if(i){s.push(we(r));continue}else return!0}}return i?s:!1}attackers(t,e){return e?this._attacked(e,V[t],!0):this._attacked(this._turn,V[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(pt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,V[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let i=0,s=0;for(let r=V.a8;r<=V.h1;r++){if(s=(s+1)%2,r&136){r+=7;continue}const p=this._board[r];p&&(t[p.type]=p.type in t?t[p.type]+1:1,p.type===kt&&e.push(s),i++)}if(i===2)return!0;if(i===3&&(t[kt]===1||t[Mt]===1))return!0;if(i===t[kt]+2){let r=0;const p=e.length;for(let a=0;a<p;a++)r+=e[a];if(r===0||r===p)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:i=void 0}={}){const s=this._moves({square:e,piece:i});return t?s.map(r=>new vt(this,r)):s.map(r=>this._moveToSan(r,s))}_moves({legal:t=!0,piece:e=void 0,square:i=void 0}={}){var W;const s=i?i.toLowerCase():void 0,r=e==null?void 0:e.toLowerCase(),p=[],a=this._turn,h=pt(a);let $=V.a8,E=V.h1,F=!1;if(s)if(s in V)$=E=V[s],F=!0;else return[];for(let O=$;O<=E;O++){if(O&136){O+=7;continue}if(!this._board[O]||this._board[O].color===h)continue;const{type:ge}=this._board[O];let le;if(ge===me){if(r&&r!==ge)continue;le=O+Pt[a][0],this._board[le]||(We(p,a,O,le,me),le=O+Pt[a][1],ja[a]===at(O)&&!this._board[le]&&We(p,a,O,le,me,void 0,J.BIG_PAWN));for(let Te=2;Te<4;Te++)le=O+Pt[a][Te],!(le&136)&&(((W=this._board[le])==null?void 0:W.color)===h?We(p,a,O,le,me,this._board[le].type,J.CAPTURE):le===this._epSquare&&We(p,a,O,le,me,me,J.EP_CAPTURE))}else{if(r&&r!==ge)continue;for(let Te=0,nt=Kt[ge].length;Te<nt;Te++){const Ue=Kt[ge][Te];for(le=O;le+=Ue,!(le&136);){if(!this._board[le])We(p,a,O,le,ge);else{if(this._board[le].color===a)break;We(p,a,O,le,ge,this._board[le].type,J.CAPTURE);break}if(ge===Mt||ge===he)break}}}}if((r===void 0||r===he)&&(!F||E===this._kings[a])){if(this._castling[a]&J.KSIDE_CASTLE){const O=this._kings[a],ge=O+2;!this._board[O+1]&&!this._board[ge]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,O+1)&&!this._attacked(h,ge)&&We(p,a,this._kings[a],ge,he,void 0,J.KSIDE_CASTLE)}if(this._castling[a]&J.QSIDE_CASTLE){const O=this._kings[a],ge=O-2;!this._board[O-1]&&!this._board[O-2]&&!this._board[O-3]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,O-1)&&!this._attacked(h,ge)&&We(p,a,this._kings[a],ge,he,void 0,J.QSIDE_CASTLE)}}if(!t||this._kings[a]===-1)return p;const _=[];for(let O=0,ge=p.length;O<ge;O++)this._makeMove(p[O]),this._isKingAttacked(a)||_.push(p[O]),this._undoMove();return _}move(t,{strict:e=!1}={}){let i=null;if(typeof t=="string")i=this._moveFromSan(t,e);else if(t===null)i=this._moveFromSan(Dt,e);else if(typeof t=="object"){const r=this._moves();for(let p=0,a=r.length;p<a;p++)if(t.from===we(r[p].from)&&t.to===we(r[p].to)&&(!("promotion"in r[p])||t.promotion===r[p].promotion)){i=r[p];break}}if(!i)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&i.flags&J.NULL_MOVE)throw new Error("Null move not allowed when in check");const s=new vt(this,i);return this._makeMove(i),this._incPositionCount(),s}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var s,r,p,a;const e=this._turn,i=pt(e);if(this._push(t),t.flags&J.NULL_MOVE){e===Pe&&this._moveNumber++,this._halfMoves++,this._turn=i,this._epSquare=Se;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&J.EP_CAPTURE&&(this._turn===Pe?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===he){if(this._kings[e]=t.to,t.flags&J.KSIDE_CASTLE){const h=t.to-1,$=t.to+1;this._movePiece($,h)}else if(t.flags&J.QSIDE_CASTLE){const h=t.to+1,$=t.to-2;this._movePiece($,h)}this._castling[e]=0}if(this._castling[e]){for(let h=0,$=Ge[e].length;h<$;h++)if(t.from===Ge[e][h].square&&this._castling[e]&Ge[e][h].flag){this._castling[e]^=Ge[e][h].flag;break}}if(this._castling[i]){for(let h=0,$=Ge[i].length;h<$;h++)if(t.to===Ge[i][h].square&&this._castling[i]&Ge[i][h].flag){this._castling[i]^=Ge[i][h].flag;break}}if(this._hash^=this._castlingKey(),t.flags&J.BIG_PAWN){let h;e===Pe?h=t.to-16:h=t.to+16,!(t.to-1&136)&&((s=this._board[t.to-1])==null?void 0:s.type)===me&&((r=this._board[t.to-1])==null?void 0:r.color)===i||!(t.to+1&136)&&((p=this._board[t.to+1])==null?void 0:p.type)===me&&((a=this._board[t.to+1])==null?void 0:a.color)===i?(this._epSquare=h,this._hash^=this._epKey()):this._epSquare=Se}else this._epSquare=Se;t.piece===me?this._halfMoves=0:t.flags&(J.CAPTURE|J.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===Pe&&this._moveNumber++,this._turn=i,this._hash^=At}undo(){const t=this._hash,e=this._undoMove();if(e){const i=new vt(this,e);return this._decPositionCount(t),i}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=At;const i=this._turn,s=pt(i);if(e.flags&J.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:i})),e.captured)if(e.flags&J.EP_CAPTURE){let r;i===Pe?r=e.to-16:r=e.to+16,this._set(r,{type:me,color:s})}else this._set(e.to,{type:e.captured,color:s});if(e.flags&(J.KSIDE_CASTLE|J.QSIDE_CASTLE)){let r,p;e.flags&J.KSIDE_CASTLE?(r=e.to+1,p=e.to-1):(r=e.to-2,p=e.to+1),this._movePiece(p,r)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const i=[];let s=!1;for(const _ in this._header)this._header[_]&&i.push(`[${_} "${this._header[_]}"]`+t),s=!0;s&&this._history.length&&i.push(t);const r=_=>{const W=this._comments[this.fen()];if(typeof W<"u"){const O=_.length>0?" ":"";_=`${_}${O}{${W}}`}return _},p=[];for(;this._history.length>0;)p.push(this._undoMove());const a=[];let h="";for(p.length===0&&a.push(r(""));p.length>0;){h=r(h);const _=p.pop();if(!_)break;if(!this._history.length&&_.color==="b"){const W=`${this._moveNumber}. ...`;h=h?`${h} ${W}`:W}else _.color==="w"&&(h.length&&a.push(h),h=this._moveNumber+".");h=h+" "+this._moveToSan(_,this._moves({legal:!0})),this._makeMove(_)}if(h.length&&a.push(r(h)),a.push(this._header.Result||"*"),e===0)return i.join("")+a.join(" ");const $=function(){return i.length>0&&i[i.length-1]===" "?(i.pop(),!0):!1},E=function(_,W){for(const O of W.split(" "))if(O){if(_+O.length>e){for(;$();)_--;i.push(t),_=0}i.push(O),_+=O.length,i.push(" "),_++}return $()&&_--,_};let F=0;for(let _=0;_<a.length;_++){if(F+a[_].length>e&&a[_].includes("{")){F=E(F,a[_]);continue}F+a[_].length>e&&_!==0?(i[i.length-1]===" "&&i.pop(),i.push(t),F=0):_!==0&&(i.push(" "),F++),i.push(a[_]),F+=a[_].length}return i.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??Lt[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=Lt[t]||null,!0):!1}getHeaders(){const t={};for(const[e,i]of Object.entries(this._header))i!==null&&(t[e]=i);return t}loadPgn(t,{strict:e=!1,newlineChar:i=`\r?
`}={}){i!==`\r?
`&&(t=t.replace(new RegExp(i,"g"),`
`));const s=Ea(t);this.reset();const r=s.headers;let p="";for(const $ in r)$.toLowerCase()==="fen"&&(p=r[$]),this.header($,r[$]);if(!e)p&&this.load(p,{preserveHeaders:!0});else if(r.SetUp==="1"){if(!("FEN"in r))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(r.FEN,{preserveHeaders:!0})}let a=s.root;for(;a;){if(a.move){const $=this._moveFromSan(a.move,e);if($==null)throw new Error(`Invalid move in PGN: ${a.move}`);this._makeMove($),this._incPositionCount()}a.comment!==void 0&&(this._comments[this.fen()]=a.comment),a=a.variations[0]}const h=s.result;h&&Object.keys(this._header).length&&this._header.Result!==h&&this.setHeader("Result",h)}_moveToSan(t,e){let i="";if(t.flags&J.KSIDE_CASTLE)i="O-O";else if(t.flags&J.QSIDE_CASTLE)i="O-O-O";else{if(t.flags&J.NULL_MOVE)return Dt;if(t.piece!==me){const s=Ga(t,e);i+=t.piece.toUpperCase()+s}t.flags&(J.CAPTURE|J.EP_CAPTURE)&&(t.piece===me&&(i+=we(t.from)[0]),i+="x"),i+=we(t.to),t.promotion&&(i+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?i+="#":i+="+"),this._undoMove(),i}_moveFromSan(t,e=!1){let i=It(t);if(e||(i==="0-0"?i="O-O":i==="0-0-0"&&(i="O-O-O")),i==Dt)return{color:this._turn,from:0,to:0,piece:"k",flags:J.NULL_MOVE};let s=Qt(i),r=this._moves({legal:!0,piece:s});for(let _=0,W=r.length;_<W;_++)if(i===It(this._moveToSan(r[_],r)))return r[_];if(e)return null;let p,a,h,$,E,F=!1;if(a=i.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),a?(p=a[1],h=a[2],$=a[3],E=a[4],h.length==1&&(F=!0)):(a=i.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),a&&(p=a[1],h=a[2],$=a[3],E=a[4],h.length==1&&(F=!0))),s=Qt(i),r=this._moves({legal:!0,piece:p||s}),!$)return null;for(let _=0,W=r.length;_<W;_++)if(h){if((!p||p.toLowerCase()==r[_].piece)&&V[h]==r[_].from&&V[$]==r[_].to&&(!E||E.toLowerCase()==r[_].promotion))return r[_];if(F){const O=we(r[_].from);if((!p||p.toLowerCase()==r[_].piece)&&V[$]==r[_].to&&(h==O[0]||h==O[1])&&(!E||E.toLowerCase()==r[_].promotion))return r[_]}}else if(i===It(this._moveToSan(r[_],r)).replace("x",""))return r[_];return null}ascii(){let t=`   +------------------------+
`;for(let e=V.a8;e<=V.h1;e++){if(ut(e)===0&&(t+=" "+"87654321"[at(e)]+" |"),this._board[e]){const i=this._board[e].type,r=this._board[e].color===Ce?i.toUpperCase():i.toLowerCase();t+=" "+r+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let i=0;const s=this._turn;for(let r=0,p=e.length;r<p;r++)this._makeMove(e[r]),this._isKingAttacked(s)||(t-1>0?i+=this.perft(t-1):i++),this._undoMove();return i}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let i=V.a8;i<=V.h1;i++)this._board[i]==null?e.push(null):e.push({square:we(i),type:this._board[i].type,color:this._board[i].color}),i+1&136&&(t.push(e),e=[],i+=8);return t}squareColor(t){if(t in V){const e=V[t];return(at(e)+ut(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],i=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const s=e.pop();if(!s)break;t?i.push(new vt(this,s)):i.push(this._moveToSan(s,this._moves())),this._makeMove(s)}return i}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},i=s=>{s in this._comments&&(e[s]=this._comments[s])};for(;this._history.length>0;)t.push(this._undoMove());for(i(this.fen());;){const s=t.pop();if(!s)break;this._makeMove(s),i(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const s of[he,Ke])e[s]!==void 0&&(e[s]?this._castling[t]|=xt[s]:this._castling[t]&=~xt[s]);this._updateCastlingRights();const i=this.getCastlingRights(t);return(e[he]===void 0||e[he]===i[he])&&(e[Ke]===void 0||e[Ke]===i[Ke])}getCastlingRights(t){return{[he]:(this._castling[t]&xt[he])!==0,[Ke]:(this._castling[t]&xt[Ke])!==0}}moveNumber(){return this._moveNumber}}async function Va(n,t={}){var pe,re,oe;const e=t.currentUser||{};let i="chat",s=[],r=null,p=[],a=[],h=null,$=null,E=!1,F=null,_=null;n.innerHTML=`
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
  `,Wa(),await Ue(),_e();const W=n.querySelector("#tab-nav-chat"),O=n.querySelector("#tab-nav-lounge"),ge=n.querySelector("#bonding-chat-main-wrap"),le=n.querySelector("#bonding-lounge-main-wrap");W==null||W.addEventListener("click",()=>{i="chat",W.classList.add("active"),O.classList.remove("active"),ge.style.display="grid",le.style.display="none",_e()}),O==null||O.addEventListener("click",async()=>{i="lounge_games",O.classList.add("active"),W.classList.remove("active"),ge.style.display="none",le.style.display="block",await w()}),(pe=n.querySelector("#btn-top-new-chat"))==null||pe.addEventListener("click",L),(re=n.querySelector("#btn-top-new-group"))==null||re.addEventListener("click",v),(oe=n.querySelector("#btn-top-challenge"))==null||oe.addEventListener("click",()=>K());const Te=n.querySelector("#bonding-search-input");Te&&Te.addEventListener("input",c=>{const f=c.target.value.toLowerCase().trim();n.querySelectorAll(".bonding-channel-item").forEach(P=>{const m=P.textContent.toLowerCase();P.style.display=m.includes(f)?"flex":"none"})}),rt(),new MutationObserver((c,f)=>{document.body.contains(n)||($&&clearInterval($),_&&clearInterval(_),f.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function Ue(){try{const[c,f]=await Promise.all([De("/bonding/channels").catch(()=>[]),De("/bonding/colleagues").catch(()=>[])]);s=c,p=f,!r&&s.length>0&&(r=s.find(l=>l.name.includes("Lounge"))||s[0]),Ne(),r&&await $e(r._id)}catch(c){console.error("Failed to load bonding data",c)}}async function $e(c,f=!1){if(c)try{a=await De(`/bonding/channels/${c}/messages`),f?k():y()}catch(l){console.error("Failed to load messages",l)}}function rt(){$&&clearInterval($),$=setInterval(async()=>{try{if(!document.body.contains(n)){clearInterval($);return}i==="chat"&&r?await $e(r._id,!0):i==="lounge_games"&&await w(!0)}catch{}},3e3)}function Ne(){const c=n.querySelector("#bonding-group-list"),f=n.querySelector("#bonding-direct-list");if(!c||!f)return;const l=s.filter(m=>m.type==="group"),P=s.filter(m=>m.type==="direct");l.length===0?c.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':c.innerHTML=l.map(m=>{var A;return`
          <div class="bonding-channel-item ${r&&r._id===m._id?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-icon">${m.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${C(m.name)}</div>
              <div class="bonding-channel-preview">${C(((A=m.lastMessage)==null?void 0:A.content)||"No messages yet")}</div>
            </div>
            
          </div>
        `}).join(""),P.length===0?f.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to connect!</div>':f.innerHTML=P.map(m=>{var R;const q=r&&r._id===m._id,A=m.displayName||m.name||"Colleague",B=A.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${q?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-avatar">${B}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${C(A)}</div>
              <div class="bonding-channel-preview">${C(((R=m.lastMessage)==null?void 0:R.content)||"Say hello...")}</div>
            </div>
          </div>
        `}).join(""),lt()}function lt(){var f,l;const c=n.querySelectorAll(".bonding-channel-item");c.forEach(P=>{P.onclick=async()=>{const m=P.dataset.channelId,q=s.find(A=>A._id===m);q&&(r=q,c.forEach(A=>A.classList.remove("active")),P.classList.add("active"),_e(),await $e(q._id))}}),(f=n.querySelector("#btn-create-group"))==null||f.addEventListener("click",v),(l=n.querySelector("#btn-new-direct-chat"))==null||l.addEventListener("click",L)}function _e(){const c=n.querySelector("#bonding-chat-panel");if(!c)return;if(!r){c.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const f=C(r.displayName||r.name),l=(r.members||[]).length,P=r.type==="group",m=(e==null?void 0:e._id)||(e==null?void 0:e.id),q=P?null:(r.members||[]).find(A=>{var B;return((B=A.userId)==null?void 0:B.toString())!==(m==null?void 0:m.toString())});c.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${P?r.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${f}</div>
            <div class="bonding-chat-sub">
              ${P?`<span>${l} members</span> · <span>${C(r.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
            </div>
          </div>
        </div>

        <div class="bonding-chat-header-actions">
          <!-- Quick Challenge Button -->
          <button class="bonding-header-btn challenge-highlight" id="btn-chat-challenge" title="Challenge to Multiplayer Game">
            <span>⚔️</span> <span>Challenge Game</span>
          </button>

          ${P?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${l})</span>
            </button>
            <button class="bonding-header-btn danger" id="btn-delete-group" title="Delete this group">
              <span>🗑️</span> <span>Delete Group</span>
            </button>
          `:""}
        </div>
      </div>

      <div class="bonding-messages-container" id="bonding-messages-feed">
        ${Fe()}
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
    `,Be(q),Qe(q),Ve(),x()}function Fe(){if(!a||a.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const c=(e==null?void 0:e._id)||(e==null?void 0:e.id);return a.map(f=>{var A,B,R,X,ae,S,M,te,U;const l=f.sender&&f.sender.userId&&c&&f.sender.userId.toString()===c.toString();if(f.type==="system")return`
          <div class="bonding-msg-system">
            <span>ℹ️</span> <span>${C(f.content)}</span>
          </div>
        `;if(f.type==="challenge"&&f.challengeData){const Q=f.challengeData,Z=Q.gameTitle||"Game Challenge",de=Q.gameType||"chess",ve=de==="chess"?"♟️":de==="connectfour"?"🔴":"❌",be=(A=Q.gameState)==null?void 0:A.invitationId,Je=(B=Q.targetUserId)==null?void 0:B.toString(),ce=(X=(R=f.sender)==null?void 0:R.userId)==null?void 0:X.toString(),fe=c&&Je===c.toString(),ke=c&&ce===c.toString();return`
          <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${f._id}">
            <div class="bonding-msg-avatar" title="${C(((ae=f.sender)==null?void 0:ae.name)||"Teammate")}">
              ${(((S=f.sender)==null?void 0:S.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${C(((M=f.sender)==null?void 0:M.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${ie(f.createdAt)}</span>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${ve}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${C(Z)}</h4>
                    <p class="game-bubble-desc">${C(f.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${Q.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':Q.status==="active"||Q.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${C(((te=Q.status)==null?void 0:te.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${Q.status==="pending"&&fe?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${be}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${be}" data-action="decline">
                        Decline
                      </button>
                    `:Q.status==="pending"&&ke?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${be}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${be}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${Oe(f)}
            </div>
          </div>
        `}const P=C(((U=f.sender)==null?void 0:U.name)||"Teammate"),m=ie(f.createdAt),q=Oe(f);return`
        <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${f._id}">
          <div class="bonding-msg-avatar" title="${P}">${P.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${P}</span>
              <span class="bonding-msg-time">${m}</span>
            </div>
            <div class="bonding-msg-bubble">
              ${C(f.content).replace(/\n/g,"<br/>")}
            </div>
            ${q}
          </div>
        </div>
      `}).join("")}function Oe(c){return`
      <div class="bonding-reactions-row">
        ${(c.reactions||[]).map(P=>{const m=(e==null?void 0:e._id)||(e==null?void 0:e.id);return`
        <button class="bonding-rxn-tag ${(P.users||[]).some(A=>A.toString()===(m==null?void 0:m.toString()))?"active":""}" data-msg-id="${c._id}" data-emoji="${P.emoji}">
          <span>${P.emoji}</span> <span>${P.users?P.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${c._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function Be(c){const f=n.querySelector("#btn-chat-challenge");f&&(f.onclick=()=>{c?K(null,c.userId||c._id):K()});const l=n.querySelector("#btn-manage-members");l&&(l.onclick=I);const P=n.querySelector("#btn-delete-group");P&&(P.onclick=N)}function Qe(c){const f=n.querySelector("#bonding-message-input"),l=n.querySelector("#btn-send-message"),P=n.querySelector("#btn-quick-emoji"),m=n.querySelector("#btn-input-challenge");f&&f.addEventListener("keydown",q=>{q.key==="Enter"&&!q.shiftKey&&(q.preventDefault(),Ye())}),l&&(l.onclick=Ye),m&&(m.onclick=()=>{c?K(null,c.userId||c._id):K()}),P&&(P.onclick=()=>{if(!f)return;const q=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],A=q[Math.floor(Math.random()*q.length)];f.value+=(f.value?" ":"")+A,f.focus()})}function Ve(){n.querySelectorAll(".btn-respond-invite").forEach(l=>{l.onclick=async()=>{const P=l.dataset.inviteId,m=l.dataset.action;await ee(P,m)}}),n.querySelectorAll(".btn-launch-match-from-card").forEach(l=>{l.onclick=async()=>{const P=l.dataset.inviteId;try{l.disabled=!0;const m=await De("/bonding/invitations"),q=(m.incoming||[]).concat(m.sent||[]).find(A=>A._id===P);q&&q.matchId?Y(q.matchId):z("Match has not started yet or has expired","warning")}catch(m){z(m.message||"Could not load match","error")}finally{l.disabled=!1}}}),n.querySelectorAll(".bonding-rxn-tag").forEach(l=>{l.onclick=async()=>{const P=l.dataset.msgId,m=l.dataset.emoji;await o(P,m)}}),n.querySelectorAll(".bonding-add-rxn-btn").forEach(l=>{l.onclick=P=>{const m=l.dataset.msgId;ne(P.currentTarget,async q=>{await o(m,q)})}})}async function Ye(){const c=n.querySelector("#bonding-message-input");if(!c||!r||E)return;const f=c.value.trim();if(f)try{E=!0,c.value="";const l=await ye(`/bonding/channels/${r._id}/messages`,{content:f,type:"text"});a.push(l),y(),x()}catch(l){z(l.message||"Failed to send message","error")}finally{E=!1,c.focus()}}async function o(c,f){try{const l=await ye(`/bonding/messages/${c}/react`,{emoji:f}),P=a.find(m=>m._id===c);P&&(P.reactions=l,k())}catch(l){z(l.message||"Failed to react","error")}}function x(){const c=n.querySelector("#bonding-messages-feed");c&&(c.scrollTop=c.scrollHeight)}function k(){const c=n.querySelector("#bonding-messages-feed");if(!c)return;const f=c.scrollHeight-c.scrollTop<=c.clientHeight+80;c.innerHTML=Fe(),Ve(),f&&x()}function y(){const c=n.querySelector("#bonding-messages-feed");c&&(c.innerHTML=Fe(),Ve())}async function w(c=!1){const f=n.querySelector("#bonding-lounge-main-wrap");if(f){c||(f.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const[l,P]=await Promise.all([De("/bonding/games/overview"),De("/bonding/leaderboard")]);h=l;const m=l.myStats||{},q=l.availableGames||[],A=l.incomingChallenges||[],B=l.sentChallenges||[],R=l.activeMatches||[],X=l.recentMatches||[],ae=(e==null?void 0:e._id)||(e==null?void 0:e.id);f.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${m.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${m.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${m.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${m.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${m.gamesPlayed>0?Math.round((m.wins||0)/m.gamesPlayed*100):0}%</span>
              <span class="stat-lbl">Win Rate</span>
            </div>
            <div class="lounge-stat-card chess-stat">
              <span class="stat-num">${m.chessRating||1200}</span>
              <span class="stat-lbl">Chess Elo Rating ♟️</span>
            </div>
          </div>

          <!-- Section 1: Available Games Cards -->
          <div class="lounge-section">
            <div class="lounge-section-head">
              <h3>🎮 Available Multiplayer Games</h3>
              <p>Voluntary casual competition with colleagues during breaks. Pick a game and challenge any employee!</p>
            </div>

            <div class="lounge-games-grid">
              ${q.map(S=>`
                <div class="lounge-game-card" data-game-id="${S.id}">
                  <div class="game-card-icon">${S.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${C(S.name)}</h4>
                    <p class="game-card-desc">${C(S.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${S.duration}</span>
                      <span class="meta-pill">👥 2 Players</span>
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${S.id}" data-game-title="${C(S.name)}">
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
                <span class="badge blue">${A.length+B.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${A.length})</h5>
              ${A.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${A.map(S=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(S.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${C(S.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${C(S.sender.name)}</strong> (${C(S.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${S._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${S._id}" data-action="decline">
                            Decline
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

              <!-- Sent -->
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${B.length})</h5>
              ${B.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${B.map(S=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(S.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${C(S.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${C(S.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${S._id}" data-action="cancel">
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
                    ${R.map(S=>{const te=ae&&S.player1.userId.toString()===ae.toString()?S.player2:S.player1,U=ae&&S.currentTurnUserId&&S.currentTurnUserId.toString()===ae.toString();return`
                        <div class="lounge-active-match-card ${U?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${S.gameType==="chess"?"♟️":S.gameType==="connectfour"?"🔴":"❌"}</span>
                            <div>
                              <div class="match-game-title">${C(S.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${C(te.name)}</strong> (${C(te.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${U?"my-turn":"wait"}">
                              ${U?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${S._id}">
                              Resume Match 🎮
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
            <div class="lounge-section-head">
              <h3>📜 Recent Completed Matches</h3>
              <p>Audit results, rematch recent opponents, or review match outcomes.</p>
            </div>

            ${X.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${X.map(S=>{const te=ae&&S.player1.userId.toString()===ae.toString()?S.player2:S.player1,U=ae&&S.winnerId&&S.winnerId.toString()===ae.toString(),Q=S.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${C(S.gameTitle)}</span>
                          <span class="recent-date">${ie(S.completedAt||S.updatedAt)}</span>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${C(te.name)}</strong></div>
                          <div class="recent-outcome ${U?"win":Q?"draw":"loss"}">
                            ${U?"🏆 VICTORY":Q?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${C(S.winningReason||S.status)})</span>
                          </div>
                        </div>
                        <button class="btn-recent-rematch" data-match-id="${S._id}">
                          🔄 Request Rematch
                        </button>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>

          <!-- Section 4: Company Leaderboard -->
          <div class="lounge-section" style="margin-top: 24px;">
            <div class="lounge-section-head">
              <h3>🏆 Team Bonding & Games Leaderboard</h3>
              <p>Genuine completed match records. Friendly competition across CI360 team members.</p>
            </div>

            <div class="lounge-leaderboard-card">
              <div class="table-responsive">
                <table class="lounge-lb-table">
                  <thead>
                    <tr>
                      <th style="width: 50px;">Rank</th>
                      <th>Player</th>
                      <th>Role</th>
                      <th>Played</th>
                      <th>Wins</th>
                      <th>Losses</th>
                      <th>Draws</th>
                      <th>Win Rate</th>
                      <th>Chess Elo</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${P.length===0?'<tr><td colspan="10" style="text-align:center;padding:24px">No match records yet. Be the first to play!</td></tr>':P.map((S,M)=>`
                        <tr class="${M===0?"rank-1":M===1?"rank-2":M===2?"rank-3":""}">
                          <td class="lb-rank">${M===0?"🥇":M===1?"🥈":M===2?"🥉":`#${M+1}`}</td>
                          <td>
                            <div class="lb-player-cell">
                              <div class="lb-avatar">${C(S.userName.slice(0,1).toUpperCase())}</div>
                              <span class="lb-name">${C(S.userName)}</span>
                            </div>
                          </td>
                          <td><span class="badge gray">${C(S.userRole||"employee")}</span></td>
                          <td><strong>${S.gamesPlayed||0}</strong></td>
                          <td style="color:#10b981;font-weight:700">${S.wins||0}</td>
                          <td style="color:#ef4444">${S.losses||0}</td>
                          <td style="color:#f59e0b">${S.draws||0}</td>
                          <td><strong>${S.winRate||0}%</strong></td>
                          <td><span class="badge blue">♟️ ${S.chessRating||1200}</span></td>
                          <td><span class="badge gold">⭐ ${S.points||0} pts</span></td>
                        </tr>
                      `).join("")}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      `,D()}catch(l){f.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${C(l.message)}</p>
        </div>
      `}}}function D(){n.querySelectorAll(".btn-challenge-game").forEach(c=>{c.onclick=()=>{const f=c.dataset.gameId;K(f)}}),n.querySelectorAll(".btn-respond-invite").forEach(c=>{c.onclick=async()=>{const f=c.dataset.inviteId,l=c.dataset.action;await ee(f,l),await w()}}),n.querySelectorAll(".btn-resume-match").forEach(c=>{c.onclick=()=>{const f=c.dataset.matchId;Y(f)}}),n.querySelectorAll(".btn-recent-rematch").forEach(c=>{c.onclick=async()=>{const f=c.dataset.matchId;try{c.disabled=!0;const l=await ye(`/bonding/matches/${f}/action`,{action:"rematch"});l.match&&(z("Rematch created! Opening arena ⚔️","success"),Y(l.match._id))}catch(l){z(l.message||"Could not start rematch","error")}finally{c.disabled=!1}}})}function K(c=null,f=null){const l=n.querySelector("#bonding-modals-root"),P=(e==null?void 0:e._id)||(e==null?void 0:e.id),m=new Set(["employee","admin","superadmin"]),q=p.filter(S=>!S.isSelf&&S._id.toString()!==(P==null?void 0:P.toString())&&m.has(S.role));let A=c||"chess",B=f?f.toString():null,R="none";function X(){const S=q.find(M=>M._id.toString()===B);l.innerHTML=`
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
                  <button class="game-pill-btn ${A==="chess"?"active":""}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${A==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                  <button class="game-pill-btn ${A==="connectfour"?"active":""}" data-game="connectfour">
                    <span>🔴</span> <span>Connect Four</span>
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
                  ${q.map(M=>{const te=B===M._id.toString();return`
                      <div class="eligible-emp-item ${te?"selected":""}" data-user-id="${M._id}">
                        <div class="emp-item-avatar">${M.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${C(M.name)}</span>
                          <span class="emp-item-role">${C(M.role==="superadmin"?"Superadmin":M.role==="admin"?"Admin":"Employee")} · ${C(M.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${te?"active":""}">
                          ${te?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Step 3: Match Settings (for Chess timers) -->
              ${A==="chess"?`
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
                  <div><strong>Game:</strong> ${A==="chess"?"♟️ Chess Duel":A==="connectfour"?"🔴 Connect Four":"❌ Tic-Tac-Toe Challenge"}</div>
                  <div><strong>Opponent:</strong> ${S?`<strong>${C(S.name)}</strong> (${C(S.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  ${A==="chess"?`<div><strong>Time Control:</strong> ${R==="none"?"Untimed":R}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${B?"":"disabled"}>
                Send Challenge 🚀
              </button>
            </div>
          </div>
        </div>
      `,ae()}function ae(){l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelector("#btn-cancel-challenge-flow").onclick=()=>{l.innerHTML=""},l.querySelectorAll(".game-pill-btn").forEach(te=>{te.onclick=()=>{A=te.dataset.game,X()}});const S=l.querySelector("#flow-emp-search");S&&(S.oninput=te=>{const U=te.target.value.toLowerCase().trim();l.querySelectorAll(".eligible-emp-item").forEach(Q=>{const Z=Q.textContent.toLowerCase();Q.style.display=Z.includes(U)?"flex":"none"})}),l.querySelectorAll(".eligible-emp-item").forEach(te=>{te.onclick=()=>{B=te.dataset.userId,X()}}),l.querySelectorAll('input[name="timerMode"]').forEach(te=>{te.onchange=U=>{R=U.target.value,X()}});const M=l.querySelector("#btn-submit-challenge-flow");M&&(M.onclick=async()=>{if(!B){z("Please select an employee to challenge","warning");return}try{M.disabled=!0,M.textContent="Sending Challenge...",await ye("/bonding/invitations",{gameType:A,targetUserId:B,matchSettings:{timerMode:R},channelId:(r==null?void 0:r._id)||null}),z("Game challenge delivered! Awaiting acceptance ⚔️","success"),l.innerHTML="",r&&await $e(r._id),i==="lounge_games"&&await w()}catch(te){z(te.message||"Failed to send challenge","error"),M.disabled=!1,M.textContent="Send Challenge 🚀"}})}X()}async function ee(c,f){if(!(!c||!f))try{const l=await yt(`/bonding/invitations/${c}/respond`,{action:f});f==="accept"?(z("Challenge accepted! Entering match arena ⚔️","success"),l.match&&Y(l.match._id)):f==="decline"?z("Challenge declined","info"):f==="cancel"&&z("Challenge cancelled","info"),r&&await $e(r._id),i==="lounge_games"&&await w()}catch(l){z(l.message||"Action failed","error")}}async function Y(c){if(!c)return;F=c,_&&clearInterval(_);const f=n.querySelector("#bonding-modals-root");let l=null,P=null,m=[];async function q(){try{return l=await De(`/bonding/matches/${c}`),l}catch(M){return z(M.message||"Could not load match","error"),A(),null}}if(l=await q(),!l)return;function A(){_&&clearInterval(_),F=null,f.innerHTML="",i==="lounge_games"&&w(!0),r&&$e(r._id,!0)}_=setInterval(async()=>{var Q,Z,de,ve;if(!F||F!==c){clearInterval(_);return}const M=(Q=l==null?void 0:l.currentTurnUserId)==null?void 0:Q.toString(),te=l==null?void 0:l.status,U=await q();U&&(((Z=U.currentTurnUserId)==null?void 0:Z.toString())!==M||U.status!==te||((de=U.moves)==null?void 0:de.length)!==((ve=l.moves)==null?void 0:ve.length))&&B()},1500);function B(){if(!l)return;const M=(e==null?void 0:e._id)||(e==null?void 0:e.id),te=M&&l.player1.userId.toString()===M.toString(),U=te?l.player1:l.player2,Q=te?l.player2:l.player1,Z=M&&l.currentTurnUserId&&l.currentTurnUserId.toString()===M.toString(),de=l.status!=="active";f.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${l.gameType==="chess"?"♟️":l.gameType==="connectfour"?"🔴":"❌"}</span>
                <div>
                  <h3 class="arena-title">${C(l.gameTitle)}</h3>
                  <div class="arena-players-vs">
                    <span class="player-tag self">${C(U.name)} (You · <strong>${l.gameType==="connectfour"?U.assignedRole==="red"?"🔴 Red":"🟡 Yellow":l.gameType==="tictactoe"?U.assignedRole==="X"?"✕":"◯":U.assignedRole}</strong>)</span>
                    <span class="vs-pill">VS</span>
                    <span class="player-tag opp">${C(Q.name)} (<strong>${l.gameType==="connectfour"?Q.assignedRole==="red"?"🔴 Red":"🟡 Yellow":l.gameType==="tictactoe"?Q.assignedRole==="X"?"✕":"◯":Q.assignedRole}</strong>)</span>
                  </div>
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${de?"ended":Z?"my-turn":"opp-turn"}">
                ${de?`<span>🏁 Finished (${C(l.winningReason||l.status)})</span>`:Z?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${C(Q.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${l.gameType==="connectfour"?Z?"👉 Click any column arrow to drop your disc!":"⏳ Opponent is deciding their move...":l.gameType==="tictactoe"?Z?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":Z?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              ${de?"":`
                <div class="arena-action-btns">
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                </div>
              `}
            </div>

            <!-- Draw Offer Notification -->
            ${l.drawOfferedBy&&l.drawOfferedBy.toString()!==(M==null?void 0:M.toString())&&!de?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${C(Q.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${l.gameType==="chess"?R(te):""}
              ${l.gameType==="tictactoe"?X():""}
              ${l.gameType==="connectfour"?ae():""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${de?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${l.winnerId&&l.winnerId.toString()===(M==null?void 0:M.toString())?"🏆":l.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${l.winnerId&&l.winnerId.toString()===(M==null?void 0:M.toString())?"VICTORY!":l.status==="draw"?"STALEMATE / DRAW":`${C(l.winnerName)} Wins!`}</h4>
                  <p>Reason: ${C(l.winningReason||"Match concluded")}</p>
                </div>
                <button class="btn-arena-rematch" id="btn-arena-rematch-action">
                  🔄 Request Rematch
                </button>
              </div>
            `:""}
          </div>
        </div>
      `,S(Z,te,U)}function R(M){var fe;const te=((fe=l.gameState)==null?void 0:fe.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",U=new Vt(te),Q=M?l.player1.assignedRole==="white":l.player2.assignedRole==="white",Z={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},de=Q?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],ve=Q?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let be='<div class="chess-board-grid">';for(const ke of ve)for(const Me of de){const Ee=`${Me}${ke}`,qe=U.get(Ee),Xe=(Me.charCodeAt(0)-97+ke)%2!==0,je=P===Ee,Ze=m.includes(Ee),dt=qe?qe.color==="w"?Z[qe.type.toUpperCase()]:Z[qe.type]:"";be+=`
            <div class="chess-sq ${Xe?"light":"dark"} ${je?"selected":""} ${Ze?"legal-dot":""}" data-square="${Ee}">
              ${dt?`<span class="chess-piece ${qe.color==="w"?"white-piece":"black-piece"}">${dt}</span>`:""}
            </div>
          `}be+="</div>";const ce=(l.moves||[]).map(ke=>{var Me;return`
        <span class="chess-move-token">${ke.moveNum}. ${((Me=ke.moveData)==null?void 0:Me.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${be}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${ce||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function X(){var U;const M=((U=l.gameState)==null?void 0:U.board)||Array(9).fill(null),te=l.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${M.map((Q,Z)=>{const de=te.includes(Z);return`
                <div class="ttt-cell ${Q?"filled":"empty"} ${de?"win-cell":""}" data-cell-idx="${Z}">
                  ${Q==="X"?'<span class="ttt-x">✕</span>':Q==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function ae(){var Q;const M=((Q=l.gameState)==null?void 0:Q.grid)||Array(6).fill(null).map(()=>Array(7).fill(null)),te=(l.winningCells||[]).map(Z=>Array.isArray(Z)?`${Z[0]},${Z[1]}`:"");let U='<div class="c4-board-rack">';U+='<div class="c4-drop-arrows-row">';for(let Z=0;Z<7;Z++)U+=`<button class="c4-drop-col-btn" data-col="${Z}" title="Drop Disc in Column ${Z+1}">⬇</button>`;U+="</div>",U+='<div class="c4-grid-slots">';for(let Z=0;Z<6;Z++)for(let de=0;de<7;de++){const ve=M[Z][de],be=te.includes(`${Z},${de}`);U+=`
            <div class="c4-slot ${ve?`disc-${ve}`:"empty"} ${be?"win-disc":""}" data-col="${de}" data-row="${Z}">
              ${ve?`<div class="c4-disc ${ve}"></div>`:'<div class="c4-hole"></div>'}
            </div>
          `}return U+="</div>",U+='<div class="c4-rack-stand"><div class="c4-stand-leg left"></div><div class="c4-stand-leg right"></div></div>',U+="</div>",U}function S(M,te,U){var Je;f.querySelector("#btn-close-arena").onclick=A;const Q=f.querySelector("#btn-arena-resign");Q&&(Q.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{Q.disabled=!0,await ye(`/bonding/matches/${c}/action`,{action:"resign"}),await q(),B()}catch(ce){z(ce.message||"Resign failed","error"),Q.disabled=!1}});const Z=f.querySelector("#btn-arena-draw");Z&&(Z.onclick=async()=>{try{await ye(`/bonding/matches/${c}/action`,{action:"offer_draw"}),z("Draw offer sent to opponent","info"),await q(),B()}catch(ce){z(ce.message||"Draw offer failed","error")}});const de=f.querySelector("#btn-confirm-accept-draw");de&&(de.onclick=async()=>{try{await ye(`/bonding/matches/${c}/action`,{action:"accept_draw"}),z("Draw agreed!","info"),await q(),B()}catch(ce){z(ce.message,"error")}});const ve=f.querySelector("#btn-confirm-decline-draw");ve&&(ve.onclick=async()=>{try{await ye(`/bonding/matches/${c}/action`,{action:"decline_draw"}),await q(),B()}catch(ce){z(ce.message,"error")}});const be=f.querySelector("#btn-arena-rematch-action");if(be&&(be.onclick=async()=>{try{be.disabled=!0,be.textContent="Creating Rematch...";const ce=await ye(`/bonding/matches/${c}/action`,{action:"rematch"});ce.match&&(z("Rematch created! New match live ⚔️","success"),_&&clearInterval(_),Y(ce.match._id))}catch(ce){z(ce.message||"Rematch failed","error"),be.disabled=!1,be.textContent="🔄 Request Rematch"}}),l.gameType==="chess"&&M&&l.status==="active"){const ce=((Je=l.gameState)==null?void 0:Je.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",fe=new Vt(ce),ke=U.assignedRole==="white"?"w":"b";f.querySelectorAll(".chess-sq").forEach(Me=>{Me.onclick=async()=>{const Ee=Me.dataset.square;if(P){if(P===Ee){P=null,m=[],B();return}if(m.includes(Ee)){const Xe=fe.get(P);let je;Xe&&Xe.type==="p"&&(Ee.endsWith("8")||Ee.endsWith("1"))&&(je=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const Ze={from:P,to:Ee,promotion:je?je.toLowerCase():void 0};P=null,m=[],l=await ye(`/bonding/matches/${c}/move`,{move:Ze}),B()}catch(Ze){z(Ze.message||"Illegal chess move","error"),P=null,m=[],B()}return}}const qe=fe.get(Ee);qe&&qe.color===ke?(P=Ee,m=fe.moves({square:Ee,verbose:!0}).map(je=>je.to),B()):(P=null,m=[],B())}})}if(l.gameType==="tictactoe"&&M&&l.status==="active"&&f.querySelectorAll(".ttt-cell.empty").forEach(ce=>{ce.onclick=async()=>{const fe=ce.dataset.cellIdx;try{ce.style.opacity="0.5",l=await ye(`/bonding/matches/${c}/move`,{cellIndex:Number(fe)}),B()}catch(ke){z(ke.message||"Invalid move","error")}}}),l.gameType==="connectfour"&&M&&l.status==="active"){const ce=async fe=>{try{l=await ye(`/bonding/matches/${c}/move`,{col:Number(fe)}),B()}catch(ke){z(ke.message||"Column full or invalid","error")}};f.querySelectorAll(".c4-drop-col-btn").forEach(fe=>{fe.onclick=()=>ce(fe.dataset.col)}),f.querySelectorAll(".c4-slot").forEach(fe=>{fe.onclick=()=>ce(fe.dataset.col)})}}B()}function I(){if(!r||r.type==="direct")return;const c=n.querySelector("#bonding-modals-root"),f=R=>R==="employee"||R==="admin"||R==="superadmin",l=r.members||[],P=new Set(l.map(R=>{var X;return(X=R.userId)==null?void 0:X.toString()})),m=p.filter(R=>f(R.role)&&!P.has(R._id.toString()));c.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${C(r.name)}</h3>
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
                    <option value="${R._id}">${C(R.name)} (${C(R.role==="superadmin"?"Superadmin":R.role==="admin"?"Admin":"Employee")})</option>
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
                ${l.map(R=>{const X=(e==null?void 0:e._id)||(e==null?void 0:e.id),ae=X&&R.userId&&R.userId.toString()===X.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(R.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${C(R.name)} ${ae?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${C(R.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${R.userId}" data-name="${C(R.name)}">
                          ${ae?"Leave Group":"Remove"}
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""};const q=c.querySelector("#btn-modal-delete-group");q&&(q.onclick=()=>{c.innerHTML="",N()});const A=c.querySelector("#btn-submit-add-member");A&&(A.onclick=async()=>{const X=c.querySelector("#sel-add-colleague").value;if(!X){z("Please select a colleague to add","warning");return}try{A.disabled=!0,A.textContent="Adding...";const ae=await yt(`/bonding/channels/${r._id}/members`,{action:"add",userIds:[X]});z("Colleague added to group! 🎉","success"),r=ae.channel,c.innerHTML="",await $e(r._id),_e()}catch(ae){z(ae.message||"Failed to add member","error"),A.disabled=!1,A.textContent="Add to Group"}}),c.querySelectorAll(".btn-remove-member").forEach(R=>{R.onclick=async()=>{const X=R.dataset.userId,ae=R.dataset.name;if(confirm(`Are you sure you want to remove ${ae} from this group?`))try{R.disabled=!0;const S=await yt(`/bonding/channels/${r._id}/members`,{action:"remove",userId:X});z(`${ae} removed from group`,"info"),r=S.channel,c.innerHTML="",await $e(r._id),_e()}catch(S){z(S.message||"Failed to remove member","error"),R.disabled=!1}}})}async function N(){if(!r||r.type==="direct")return;const c=r.name;if(confirm(`Are you sure you want to delete the group "${c}"?

All messages in this lounge will be deleted.`))try{await Yt(`/bonding/channels/${r._id}`),z(`Group "${c}" deleted successfully`,"success"),s=await De("/bonding/channels").catch(()=>[]),r=s.find(l=>l.type==="group")||s[0]||null,Ne(),_e(),r&&await $e(r._id)}catch(l){z(l.message||"Failed to delete group","error")}}function L(){const c=n.querySelector("#bonding-modals-root"),f=m=>m==="employee"||m==="admin"||m==="superadmin",l=p.filter(m=>!m.isSelf&&f(m.role));c.innerHTML=`
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
                <div class="bonding-user-pick-item" data-user-id="${m._id}" data-name="${C(m.name)}">
                  <div class="bonding-member-avatar">${m.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${C(m.name)}</span>
                    <span class="user-pick-role">${C(m.role==="superadmin"?"Superadmin":m.role==="admin"?"Admin":"Employee")} · ${C(m.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelectorAll(".bonding-user-pick-item").forEach(m=>{m.onclick=async()=>{const q=m.dataset.userId;try{const A=await ye("/bonding/channels",{type:"direct",targetUserId:q});c.innerHTML="",s=await De("/bonding/channels"),r=s.find(B=>B._id===A._id)||A,Ne(),_e(),await $e(r._id)}catch(A){z(A.message||"Failed to open personal chat","error")}}})}function v(){const c=n.querySelector("#bonding-modals-root"),f=A=>A==="employee"||A==="admin"||A==="superadmin",l=p.filter(A=>!A.isSelf&&f(A.role));c.innerHTML=`
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
                    <span>${C(A.name)} (${C(A.role==="superadmin"?"Superadmin":A.role==="admin"?"Admin":"Employee")})</span>
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelector("#btn-cancel-create-grp").onclick=()=>{c.innerHTML=""};let P="👥";const m=c.querySelectorAll(".avatar-opt");m.forEach(A=>{A.onclick=()=>{m.forEach(B=>B.classList.remove("active")),A.classList.add("active"),P=A.textContent.trim()}});const q=c.querySelector("#btn-confirm-create-grp");q.onclick=async()=>{const A=c.querySelector("#new-group-name"),B=c.querySelector("#new-group-desc"),R=A.value.trim();if(!R){z("Please enter a group name","warning"),A.focus();return}const X=c.querySelectorAll(".new-group-member-chk:checked"),ae=Array.from(X).map(S=>S.value);try{q.disabled=!0,q.textContent="Creating...";const S=await ye("/bonding/channels",{type:"group",name:R,description:B.value.trim(),avatar:P,memberIds:ae});z(`Group "${R}" created! 🎉`,"success"),c.innerHTML="",s=await De("/bonding/channels"),r=s.find(M=>M._id===S._id)||S,Ne(),_e(),await $e(r._id)}catch(S){z(S.message||"Failed to create group","error"),q.disabled=!1,q.textContent="Create Group 🎉"}}}function ne(c,f){const l=document.querySelector(".bonding-emoji-popup");l&&l.remove();const P=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],m=document.createElement("div");m.className="bonding-emoji-popup",m.innerHTML=P.map(B=>`<button class="emoji-opt-btn" data-e="${B}">${B}</button>`).join("");const q=c.getBoundingClientRect();m.style.top=`${q.bottom+window.scrollY+6}px`,m.style.left=`${q.left+window.scrollX}px`,document.body.appendChild(m),m.querySelectorAll(".emoji-opt-btn").forEach(B=>{B.onclick=R=>{R.stopPropagation(),f(B.dataset.e),m.remove()}});const A=B=>{m.contains(B.target)||(m.remove(),document.removeEventListener("click",A))};setTimeout(()=>document.addEventListener("click",A),10)}function ie(c){if(!c)return"";try{return new Date(c).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Wa(){const n=document.getElementById("ci360-bonding-styles");n&&n.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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

    .lounge-stat-card.chess-stat .stat-num {
      color: #6366f1;
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
  `,document.head.appendChild(t)}export{Va as a,Qa as i};
