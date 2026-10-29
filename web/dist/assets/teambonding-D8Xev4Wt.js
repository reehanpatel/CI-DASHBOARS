var ba=Object.defineProperty;var ma=(n,t,e)=>t in n?ba(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var ge=(n,t,e)=>ma(n,typeof t!="symbol"?t+"":t,e);import{c as De,h as q,e as C,n as ha,j as Yt,o as mt,k as yt,g as ye}from"./api-Chk_3u1-.js";const Ht={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function va(){try{const n=localStorage.getItem("ci360_planner_settings");if(n)return Object.assign({},Ht,JSON.parse(n))}catch{}return Object.assign({},Ht)}function xa(n){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(n))}catch{}}function qe(){const n=new Date,t=n.getFullYear(),e=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${t}-${e}-${r}`}function ht(n,t){const e=new Date(n+"T00:00:00");e.setDate(e.getDate()+t);const r=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${r}-${s}-${i}`}function ot(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function He(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function Gt(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function _t(n,t=1){const e=new Date(n+"T00:00:00"),r=e.getDay(),s=(r<t?7:0)+r-t,i=new Date(e);i.setDate(e.getDate()-s);const p=[];for(let a=0;a<7;a++){const h=new Date(i);h.setDate(i.getDate()+a);const $=h.getFullYear(),E=String(h.getMonth()+1).padStart(2,"0"),F=String(h.getDate()).padStart(2,"0");p.push(`${$}-${E}-${F}`)}return p}function ya(){try{const n=window.AudioContext||window.webkitAudioContext;if(!n)return;const t=new n,e=t.currentTime,r=t.createOscillator(),s=t.createGain();r.type="sine",r.frequency.setValueAtTime(523.25,e),r.frequency.exponentialRampToValueAtTime(783.99,e+.15),s.gain.setValueAtTime(.2,e),s.gain.exponentialRampToValueAtTime(.001,e+.35),r.connect(s),s.connect(t.destination),r.start(e),r.stop(e+.35)}catch{}}function Qa(n,t={}){const{userRole:e="employee",currentUser:r=null,onNavigate:s=null}=t,i=e==="superadmin"||e==="admin";let p=va(),a={selectedDate:qe(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};ka(),h();async function h(){a.loading=!0,$();try{const o=[De("/tasks")];i&&o.push(De("/personnel").catch(()=>[]));const[x,w]=await Promise.all(o);a.tasks=Array.isArray(x)?x:[],w&&(a.personnelList=Array.isArray(w)?w:[])}catch(o){q("Failed to load planner tasks: "+o.message,!0)}finally{a.loading=!1,K()}}function $(){n.innerHTML=`
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
    `}function E(o){return a.tasks.filter(x=>{var y;if(x.isDeleted===!0)return!1;if(i&&a.selectedPersonnelId!=="all"){const k=((y=x.personnelId)==null?void 0:y._id)||x.personnelId;if(String(k)!==String(a.selectedPersonnelId))return!1}const w=x.dateStr||(x.dueDate?new Date(x.dueDate).toISOString().slice(0,10):"");return w?w===o:o===qe()})}function F(o,x){if(o.status==="Completed")return!1;const w=o.dateStr||(o.dueDate?new Date(o.dueDate).toISOString().slice(0,10):"");return w?w<x:!1}function _(o,x){const w=o.length,y=o.filter(Q=>Q.status==="Completed").length,k=o.filter(Q=>Q.status==="In Progress").length,D=o.filter(Q=>Q.status==="Pending"||Q.status==="Todo").length,W=o.filter(Q=>F(Q,x)).length,X=w>0?Math.round(y/w*100):0;return{total:w,completed:y,inProgress:k,pending:D,overdue:W,percent:X}}function K(){const o=qe(),x=a.selectedDate===o,w=E(a.selectedDate),y=_(w,o);n.innerHTML=`
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
          ${i?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${a.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${a.personnelList.map(k=>`
                  <option value="${k._id}" ${a.selectedPersonnelId===String(k._id)?"selected":""}>
                    ${C(k.name)} (${C(k.department||k.role||"Team")})
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
          ${O(w,y)}
        </main>

      </div>
    `,$e(),it()}function O(o,x){return a.viewMode==="weekly"?nt():a.viewMode==="report"?Ue():ue(o,x)}function ue(o,x){const w=qe();let y=o;if(a.filterStatus==="pending"?y=y.filter(k=>k.status==="Pending"||k.status==="Todo"):a.filterStatus==="in_progress"?y=y.filter(k=>k.status==="In Progress"):a.filterStatus==="completed"?y=y.filter(k=>k.status==="Completed"):a.filterStatus==="overdue"&&(y=y.filter(k=>F(k,w))),a.searchQuery){const k=a.searchQuery.toLowerCase();y=y.filter(D=>(D.title||"").toLowerCase().includes(k)||(D.description||"").toLowerCase().includes(k)||(D.category||"").toLowerCase().includes(k))}return y.sort((k,D)=>{if(k.status==="Completed"&&D.status!=="Completed")return 1;if(k.status!=="Completed"&&D.status==="Completed")return-1;const W={Urgent:0,High:1,Medium:2,Low:3};return(W[k.priority]||2)-(W[D.priority]||2)}),`
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
              ${y.map(k=>Te(k,w)).join("")}
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
    `}function Te(o,x){var W,X,Q,I;const w=o.status==="Completed",y=F(o,x),k=`pri-${(o.priority||"medium").toLowerCase()}`,D=`status-${(o.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${w?"is-completed":""} ${y?"is-overdue":""}" data-id="${o._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${w?"checked":""}" data-action="toggle" data-id="${o._id}" title="${w?"Reopen task":"Mark as done"}">
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
            <span class="ci360-badge ${k}">
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
            ${i&&((W=o.personnelId)!=null&&W.name||(X=o.userId)!=null&&X.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${C(((Q=o.personnelId)==null?void 0:Q.name)||((I=o.userId)==null?void 0:I.name))}
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
    `}function nt(){const o=_t(a.selectedDate,p.weekStartsOn),x=He(o[0]),w=He(o[6]),y=qe();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${x} – ${w}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${o.map(k=>{const D=k===y,W=k===a.selectedDate,X=E(k),Q=_(X,y);return`
              <div class="ci360-day-column ${D?"is-today":""} ${W?"is-selected":""}" data-date="${k}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${k}">
                  <div class="day-name">${Gt(k)}</div>
                  <div class="day-number">${new Date(k+"T00:00:00").getDate()}</div>
                  ${D?'<span class="today-pill">Today</span>':""}
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
                  ${X.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:X.map(I=>`
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
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${k}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function Ue(){const o=_t(a.selectedDate,p.weekStartsOn),x=ot(o[0]),w=ot(o[6]),y=qe(),k=a.tasks.filter(N=>{if(N.isDeleted===!0)return!1;const L=N.dateStr||(N.dueDate?new Date(N.dueDate).toISOString().slice(0,10):"");return o.includes(L)}),D=k.length,W=k.filter(N=>N.status==="Completed").length,X=k.filter(N=>N.status==="In Progress").length,Q=D>0?Math.round(W/D*100):0,I={Urgent:0,High:0,Medium:0,Low:0};return k.forEach(N=>{const L=N.priority||"Medium";I[L]!==void 0&&I[L]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${x} – ${w}</div>
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
            <span class="value" style="font-size:28px;color:var(--green-500)">${W}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${X}</span>
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
    `}function $e(){const o=document.getElementById("btnViewDaily"),x=document.getElementById("btnViewWeekly"),w=document.getElementById("btnViewReport");o&&(o.onclick=()=>{a.viewMode="daily",K()}),x&&(x.onclick=()=>{a.viewMode="weekly",K()}),w&&(w.onclick=()=>{a.viewMode="report",K()});const y=document.getElementById("btnPrevDay"),k=document.getElementById("btnNextDay"),D=document.getElementById("btnJumpToday"),W=document.getElementById("hiddenDateInput"),X=document.getElementById("datePickerBadge");y&&(y.onclick=()=>{a.selectedDate=ht(a.selectedDate,-1),K()}),k&&(k.onclick=()=>{a.selectedDate=ht(a.selectedDate,1),K()}),D&&(D.onclick=()=>{a.selectedDate=qe(),K()}),X&&W&&(X.onclick=()=>{try{typeof W.showPicker=="function"?W.showPicker():W.focus()}catch{W.focus()}},W.onchange=oe=>{oe.target.value&&(a.selectedDate=oe.target.value,K())});const Q=document.getElementById("admTeamSelect");Q&&(Q.onchange=oe=>{a.selectedPersonnelId=oe.target.value,K()});const I=document.getElementById("btnOpenAddTaskModal");I&&(I.onclick=()=>_e());const N=document.getElementById("btnPlannerActionsMenu"),L=document.getElementById("plannerActionsDropdown");N&&L&&(N.onclick=oe=>{oe.stopPropagation(),L.classList.toggle("hidden")},document.addEventListener("click",oe=>{!L.contains(oe.target)&&oe.target!==N&&L.classList.add("hidden")}));const v=document.getElementById("btnActionImport");v&&(v.onclick=()=>{L==null||L.classList.add("hidden"),Fe()});const ne=document.getElementById("btnActionExportPng");ne&&(ne.onclick=()=>{L==null||L.classList.add("hidden"),Oe()});const re=document.getElementById("btnActionExportPdf");re&&(re.onclick=()=>{L==null||L.classList.add("hidden"),Qe()});const pe=document.getElementById("btnActionBackup");pe&&(pe.onclick=()=>{L==null||L.classList.add("hidden"),Ve()});const ie=document.getElementById("btnActionSettings");ie&&(ie.onclick=()=>{L==null||L.classList.add("hidden"),Ye()})}function it(o){if(a.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(I=>{I.onclick=()=>{a.filterStatus=I.dataset.f,K()}});const x=document.getElementById("plannerTaskSearchInp");x&&(x.oninput=I=>{a.searchQuery=I.target.value,K()});const w=document.getElementById("btnClearSearch");w&&(w.onclick=()=>{a.searchQuery="",K()});const y=document.getElementById("quickAddTitleInp"),k=document.getElementById("quickAddPriority"),D=document.getElementById("quickAddCategory"),W=document.getElementById("btnQuickAddSubmit"),X=async()=>{const I=((y==null?void 0:y.value)||"").trim();if(!I){q("Please enter a task title",!0),y==null||y.focus();return}try{const N={title:I,dateStr:a.selectedDate,priority:(k==null?void 0:k.value)||p.defaultPriority,category:(D==null?void 0:D.value)||"General",status:"Pending"};i&&a.selectedPersonnelId!=="all"&&(N.personnelId=a.selectedPersonnelId);const L=await ye("/tasks",N);a.tasks.unshift(L),q("Task added to today's focus! ✨"),y&&(y.value="",y.focus()),K()}catch(N){q(N.message,!0)}};W&&(W.onclick=X),y&&(y.onkeydown=I=>{I.key==="Enter"&&X()});const Q=document.getElementById("btnEmptyStateImport");Q&&(Q.onclick=()=>Fe())}if(a.viewMode==="weekly"){const x=document.getElementById("btnPrevWeek"),w=document.getElementById("btnNextWeek"),y=document.getElementById("btnThisWeek");x&&(x.onclick=()=>{a.selectedDate=ht(a.selectedDate,-7),K()}),w&&(w.onclick=()=>{a.selectedDate=ht(a.selectedDate,7),K()}),y&&(y.onclick=()=>{a.selectedDate=qe(),K()}),document.querySelectorAll(".day-col-header").forEach(k=>{k.onclick=()=>{a.selectedDate=k.dataset.date,a.viewMode="daily",K()}}),document.querySelectorAll('[data-action="add-day"]').forEach(k=>{k.onclick=()=>{_e(null,k.dataset.date)}})}if(a.viewMode==="report"){const x=document.getElementById("btnDownloadWeeklyPdf");x&&(x.onclick=Qe)}n.querySelectorAll('[data-action="toggle"]').forEach(x=>{x.onclick=async w=>{w.stopPropagation();const y=x.dataset.id;await Ne(y)}}),n.querySelectorAll('[data-action="edit"]').forEach(x=>{x.onclick=w=>{w.stopPropagation();const y=x.dataset.id,k=a.tasks.find(D=>D._id===y);k&&_e(k)}}),n.querySelectorAll('[data-action="delete"]').forEach(x=>{x.onclick=async w=>{w.stopPropagation();const y=x.dataset.id;await lt(y)}})}async function Ne(o){const x=a.tasks.find(y=>y._id===o);if(!x)return;const w=x.status!=="Completed";try{const y=await ha(`/tasks/${o}/toggle`,{}),k=a.tasks.findIndex(D=>D._id===o);k!==-1&&(a.tasks[k]=y),w?(p.soundEnabled&&ya(),q("Task marked as completed! 🎉")):q("Task reopened as pending."),K()}catch(y){q(y.message,!0)}}async function lt(o){const x=a.tasks.find(w=>w._id===o);if(x&&confirm(`Are you sure you want to remove "${x.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Yt(`/tasks/${o}`),a.tasks=a.tasks.filter(w=>w._id!==o),q("Task removed from planner (safely stored in database archive)"),K()}catch(w){q(w.message,!0)}}function _e(o=null,x=null){const w=!!o,y=o?o.dateStr||(o.dueDate?new Date(o.dueDate).toISOString().slice(0,10):a.selectedDate):x||a.selectedDate,k=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${w?"Edit Task":"Add New Task"}</h3>
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
          ${i?`
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
              ${w?"Save Changes":"Create Task"}
            </button>
          </div>
        </form>
      </div>
    `,D=mt(k),W=D.querySelector("#taskForm"),X=D.querySelector("#btnModalClose"),Q=D.querySelector("#btnCancelModal"),I=()=>D.remove();X&&(X.onclick=I),Q&&(Q.onclick=I),W.onsubmit=async N=>{var P;N.preventDefault();const L=D.querySelector("#taskTitle").value.trim(),v=D.querySelector("#taskDesc").value.trim(),ne=D.querySelector("#taskDate").value,re=D.querySelector("#taskStartTime").value.trim(),pe=D.querySelector("#taskDueTime").value.trim(),ie=D.querySelector("#taskPriority").value,oe=D.querySelector("#taskStatus").value,c=D.querySelector("#taskCategory").value.trim()||"General";if(!L){q("Task title is required",!0);return}const b={title:L,description:v,dateStr:ne,startTime:re,dueTime:pe,priority:ie,status:oe,category:c};if(i){const m=(P=D.querySelector("#taskAssignee"))==null?void 0:P.value;m==="all"?(b.assignAll=!0,b.personnelId="all"):m&&(b.personnelId=m)}const l=D.querySelector("#btnSaveTask");l.disabled=!0,l.textContent="Saving...";try{if(w){const m=await yt(`/tasks/${o._id}`,b),z=a.tasks.findIndex(A=>A._id===o._id);z!==-1&&(a.tasks[z]=m),q("Task updated successfully! ✍️")}else{const m=await ye("/tasks",b);Array.isArray(m.tasks)?m.tasks.forEach(z=>a.tasks.unshift(z)):a.tasks.unshift(m),q("Task created successfully! ✨")}I(),K()}catch(m){q(m.message,!0),l.disabled=!1,l.textContent=w?"Save Changes":"Create Task"}}}function Fe(){let o=[];const x=`
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
    `,w=mt(x),y=()=>w.remove();w.querySelector("#btnImportClose").onclick=y,w.querySelector("#btnCancelImport").onclick=y;const k=w.querySelector("#importTextarea"),D=w.querySelector("#importFileInput"),W=w.querySelector("#importDropzone"),X=w.querySelector("#previewListArea"),Q=w.querySelector("#previewCountLabel"),I=w.querySelector("#btnConfirmImport"),N=w.querySelector("#importFileInfo");function L(ne){if(!ne)return[];const re=ne.split(/\r?\n/),pe=[];for(let ie of re)ie=ie.trim(),ie&&(ie=ie.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),ie=ie.replace(/^[-*•]\s+/,""),ie=ie.replace(/^\d+[\.\)]\s+/,""),ie=ie.trim(),ie&&pe.push(ie));return pe}function v(){const ne=k.value,re=L(ne),pe=w.querySelector("#importTargetDate").value,ie=E(pe),oe=new Set(ie.map(c=>(c.title||"").trim().toLowerCase()));o=[];for(const c of re){const b=oe.has(c.toLowerCase());o.push({title:c,isDuplicate:b})}if(Q.textContent=`Preview (${o.length} ${o.length===1?"task":"tasks"} found)`,I.disabled=o.length===0,I.textContent=`Import ${o.length} ${o.length===1?"Task":"Tasks"}`,o.length===0){X.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}X.innerHTML=o.map((c,b)=>`
        <div class="preview-item ${c.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${b+1}.</span>
          <span class="preview-title">${C(c.title)}</span>
          ${c.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}k.oninput=v,W.onclick=()=>D.click(),D.onchange=ne=>{const re=ne.target.files[0];if(!re)return;N.textContent=`File selected: ${re.name} (${Math.round(re.size/1024)} KB)`;const pe=new FileReader;pe.onload=ie=>{k.value=ie.target.result,v()},pe.readAsText(re)},W.ondragover=ne=>{ne.preventDefault(),W.classList.add("dragover")},W.ondragleave=()=>W.classList.remove("dragover"),W.ondrop=ne=>{ne.preventDefault(),W.classList.remove("dragover");const re=ne.dataTransfer.files[0];if(re&&(re.type==="text/plain"||re.name.endsWith(".txt"))){N.textContent=`File dropped: ${re.name}`;const pe=new FileReader;pe.onload=ie=>{k.value=ie.target.result,v()},pe.readAsText(re)}else q("Please drop a valid .txt plain-text file",!0)},I.onclick=async()=>{if(o.length===0)return;I.disabled=!0,I.textContent="Importing...";const ne=w.querySelector("#importTargetDate").value,re=w.querySelector("#importPriority").value,pe=w.querySelector("#importCategory").value.trim()||"General",ie={date:ne,tasks:o.map(oe=>({title:oe.title,priority:re,category:pe,status:"Pending"}))};i&&a.selectedPersonnelId!=="all"&&(ie.personnelId=a.selectedPersonnelId);try{const oe=await ye("/tasks/bulk-import",ie);Array.isArray(oe.tasks)&&oe.tasks.forEach(c=>a.tasks.unshift(c)),q(`Imported ${oe.importedCount} tasks successfully! (${oe.skippedCount} skipped duplicates)`),y(),a.selectedDate=ne,K()}catch(oe){q(oe.message,!0),I.disabled=!1,I.textContent="Retry Import"}}}async function Oe(){const o=E(a.selectedDate),x=_(o,qe()),w=ot(a.selectedDate),y=2,k=800,D=160,W=90,X=65,Q=70,I=Math.max(120,o.length*X),N=D+W+I+Q,L=document.createElement("canvas");L.width=k*y,L.height=N*y;const v=L.getContext("2d");v.scale(y,y);const ne=document.documentElement.getAttribute("data-theme")==="dark",re=ne?"#0F172A":"#F8FAFC",pe=ne?"#1E293B":"#FFFFFF",ie=ne?"#334155":"#E2E8F0",oe=ne?"#F8FAFC":"#0F172A",c=ne?"#94A3B8":"#475569",b="#4F46E5",l="#10B981",P="#F59E0B";v.fillStyle=re,v.fillRect(0,0,k,N),v.fillStyle=pe,Be(v,24,20,k-48,D-30,16),v.fill(),v.strokeStyle=ie,v.lineWidth=1,v.stroke(),v.fillStyle=b,v.font="bold 12px Inter, sans-serif",v.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),v.fillStyle=oe,v.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',v.fillText(w,44,86),v.fillStyle=c,v.font="13px Inter, sans-serif",v.fillText(`Planned focus list · ${x.completed} of ${x.total} tasks completed (${x.percent}%)`,44,114);const m=D+6;v.fillStyle=pe,Be(v,24,m,k-48,W-16,12),v.fill(),v.stroke();const z=[{label:"TOTAL TASKS",val:String(x.total),color:oe},{label:"COMPLETED",val:String(x.completed),color:l},{label:"IN PROGRESS",val:String(x.inProgress),color:P},{label:"PENDING",val:String(x.pending),color:c},{label:"PROGRESS",val:`${x.percent}%`,color:b}],A=(k-48)/z.length;z.forEach((Z,te)=>{const S=24+te*A+20;v.fillStyle=Z.color,v.font="bold 20px Inter, sans-serif",v.fillText(Z.val,S,m+36),v.fillStyle=c,v.font="10px Inter, sans-serif",v.fillText(Z.label,S,m+54)});const B=m+W;v.fillStyle=pe,Be(v,24,B,k-48,I+10,16),v.fill(),v.stroke(),o.length===0?(v.fillStyle=c,v.font="14px Inter, sans-serif",v.textAlign="center",v.fillText("No scheduled tasks recorded for this date.",k/2,B+60),v.textAlign="left"):o.forEach((Z,te)=>{const S=B+16+te*X,M=Z.status==="Completed";v.beginPath(),v.arc(48,S+14,10,0,Math.PI*2),M?(v.fillStyle=l,v.fill(),v.strokeStyle="#FFFFFF",v.lineWidth=2,v.beginPath(),v.moveTo(44,S+14),v.lineTo(47,S+17),v.lineTo(52,S+11),v.stroke()):(v.strokeStyle=ie,v.lineWidth=2,v.stroke()),v.fillStyle=M?c:oe,v.font=`${M?"normal":"500"} 14px Inter, sans-serif`;const ee=Z.title.length>55?Z.title.slice(0,52)+"...":Z.title;if(v.fillText(ee,70,S+18),M){const ve=v.measureText(ee);v.strokeStyle=c,v.lineWidth=1.2,v.beginPath(),v.moveTo(70,S+14),v.lineTo(70+ve.width,S+14),v.stroke()}const V=Z.priority||"Medium";let Y="#E2E8F0",ae="#334155";V==="Urgent"?(Y="#FEE2E2",ae="#DC2626"):V==="High"?(Y="#FEF3C7",ae="#D97706"):V==="Low"&&(Y="#ECFDF5",ae="#059669"),v.fillStyle=Y,Be(v,k-150,S+4,60,20,10),v.fill(),v.fillStyle=ae,v.font="bold 10px Inter, sans-serif",v.fillText(V,k-138,S+18);const de=Z.dueTime?`🕒 ${Z.dueTime}`:Z.category||"General";v.fillStyle=c,v.font="11px Inter, sans-serif",v.fillText(de,70,S+34),te<o.length-1&&(v.strokeStyle=ie,v.lineWidth=.6,v.beginPath(),v.moveTo(40,S+48),v.lineTo(k-40,S+48),v.stroke())});const R=N-35;v.fillStyle=c,v.font="11px Inter, sans-serif",v.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,R);try{const Z=L.toDataURL("image/png"),te=document.createElement("a");te.href=Z,te.download=`ci360-daily-planner-${a.selectedDate}.png`,document.body.appendChild(te),te.click(),te.remove(),q("Daily Planner image exported! 🖼️")}catch(Z){q("Failed to export image: "+Z.message,!0)}}function Be(o,x,w,y,k,D){o.beginPath(),o.moveTo(x+D,w),o.lineTo(x+y-D,w),o.quadraticCurveTo(x+y,w,x+y,w+D),o.lineTo(x+y,w+k-D),o.quadraticCurveTo(x+y,w+k,x+y-D,w+k),o.lineTo(x+D,w+k),o.quadraticCurveTo(x,w+k,x,w+k-D),o.lineTo(x,w+D),o.quadraticCurveTo(x,w,x+D,w),o.closePath()}function Qe(){const o=_t(a.selectedDate,p.weekStartsOn),x=ot(o[0]),w=ot(o[6]);qe();const y=a.tasks.filter(I=>{if(I.isDeleted===!0)return!1;const N=I.dateStr||(I.dueDate?new Date(I.dueDate).toISOString().slice(0,10):"");return o.includes(N)}),k=y.length,D=y.filter(I=>I.status==="Completed").length,W=k>0?Math.round(D/k*100):0,X=window.open("","_blank");if(!X){q("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const Q=`
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
            <div class="period">${x} – ${w}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${k}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${D}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${k-D}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${W}%</div>
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
    `;X.document.write(Q),X.document.close(),q("Weekly PDF report generated for printing! 📄")}function Ve(){const x=mt(`
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
    `),w=()=>x.remove();x.querySelector("#btnBackupClose").onclick=w;const y=x.querySelector("#btnDownloadBackupJson");y.onclick=async()=>{y.disabled=!0,y.textContent="Generating backup...";try{const I=await De("/tasks/backup"),N=new Blob([JSON.stringify(I,null,2)],{type:"application/json"}),L=URL.createObjectURL(N),v=document.createElement("a");v.href=L,v.download=`ci360-planner-backup-${qe()}.json`,document.body.appendChild(v),v.click(),v.remove(),q("Planner backup downloaded successfully! 💾")}catch(I){q("Backup export failed: "+I.message,!0)}finally{y.disabled=!1,y.textContent="Download JSON Backup"}};const k=x.querySelector("#restoreFileInput"),D=x.querySelector("#restorePreviewArea"),W=x.querySelector("#restoreCountText"),X=x.querySelector("#btnExecuteRestore");let Q=null;k.onchange=I=>{const N=I.target.files[0];if(!N)return;const L=new FileReader;L.onload=v=>{try{const ne=JSON.parse(v.target.result),re=Array.isArray(ne.tasks)?ne.tasks:Array.isArray(ne)?ne:null;if(!re||re.length===0){q("Invalid backup file: No tasks found",!0);return}Q=re,D.style.display="block",W.textContent=`Valid backup: ${re.length} tasks ready to restore.`,X.disabled=!1}catch(ne){q("Error parsing JSON backup file: "+ne.message,!0),D.style.display="none",X.disabled=!0}},L.readAsText(N)},X.onclick=async()=>{var N;if(!Q||Q.length===0)return;X.disabled=!0,X.textContent="Restoring...";const I=((N=x.querySelector('input[name="restoreMode"]:checked'))==null?void 0:N.value)||"merge";try{const L=await ye("/tasks/restore",{tasks:Q,mode:I});q(`Restored ${L.restoredCount} tasks! (${L.skippedCount} skipped) ✨`),w(),await h()}catch(L){q("Restore failed: "+L.message,!0),X.disabled=!1,X.textContent="Retry Restore"}}}function Ye(){const o=`
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
    `,x=mt(o),w=()=>x.remove();x.querySelector("#btnSettingsClose").onclick=w,x.querySelector("#btnCancelSettings").onclick=w,x.querySelector("#settingsForm").onsubmit=y=>{y.preventDefault(),p.displayName=x.querySelector("#setDisplayName").value.trim()||"Daily Planner",p.weekStartsOn=Number(x.querySelector("#setWeekStart").value),p.defaultPriority=x.querySelector("#setDefaultPriority").value,p.density=x.querySelector("#setDensity").value,p.soundEnabled=x.querySelector("#setSound").checked,xa(p),q("Planner preferences saved! ⚙️"),w(),K()}}}function ka(){if(document.getElementById("ci360-planner-styles"))return;const n=document.createElement("style");n.id="ci360-planner-styles",n.textContent=`
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
  `,document.head.appendChild(n)}function wa(n){return n!==null?{comment:n,variations:[]}:{variations:[]}}function Sa(n,t,e,r,s){const i={move:n,variations:s};return t&&(i.suffix=t),e&&(i.nag=e),r!==null&&(i.comment=r),i}function $a(...n){const[t,...e]=n;let r=t;for(const s of e)s!==null&&(r.variations=[s,...s.variations],s.variations=[],r=s);return t}function _a(n,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const r=e.variations[0];if(!r){e.comment=t.marker.comment;break}e=r}}return{headers:n,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ca(n,t){function e(){this.constructor=n}e.prototype=t.prototype,n.prototype=new e}function st(n,t,e,r){var s=Error.call(this,n);return Object.setPrototypeOf&&Object.setPrototypeOf(s,st.prototype),s.expected=t,s.found=e,s.location=r,s.name="SyntaxError",s}Ca(st,Error);function Ct(n,t,e){return e=e||" ",n.length>t?n:(t-=n.length,e+=e.repeat(t),n+e.slice(0,t))}st.prototype.format=function(n){var t="Error: "+this.message;if(this.location){var e=null,r;for(r=0;r<n.length;r++)if(n[r].source===this.location.source){e=n[r].text.split(/\r\n|\n|\r/g);break}var s=this.location.start,i=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(s):s,p=this.location.source+":"+i.line+":"+i.column;if(e){var a=this.location.end,h=Ct("",i.line.toString().length," "),$=e[s.line-1],E=s.line===a.line?a.column:$.length+1,F=E-s.column||1;t+=`
 --> `+p+`
`+h+` |
`+i.line+" | "+$+`
`+h+" | "+Ct("",s.column-1," ")+Ct("",F,"^")}else t+=`
 at `+p}return t};st.buildMessage=function(n,t){var e={literal:function($){return'"'+s($.text)+'"'},class:function($){var E=$.parts.map(function(F){return Array.isArray(F)?i(F[0])+"-"+i(F[1]):i(F)});return"["+($.inverted?"^":"")+E.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function($){return $.description}};function r($){return $.charCodeAt(0).toString(16).toUpperCase()}function s($){return $.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(E){return"\\x0"+r(E)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(E){return"\\x"+r(E)})}function i($){return $.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(E){return"\\x0"+r(E)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(E){return"\\x"+r(E)})}function p($){return e[$.type]($)}function a($){var E=$.map(p),F,_;if(E.sort(),E.length>0){for(F=1,_=1;F<E.length;F++)E[F-1]!==E[F]&&(E[_]=E[F],_++);E.length=_}switch(E.length){case 1:return E[0];case 2:return E[0]+" or "+E[1];default:return E.slice(0,-1).join(", ")+", or "+E[E.length-1]}}function h($){return $?'"'+s($)+'"':"end of input"}return"Expected "+a(n)+" but "+h(t)+" found."};function Ea(n,t){t=t!==void 0?t:{};var e={},r=t.grammarSource,s={pgn:Rt},i=Rt,p="[",a='"',h="]",$=".",E="O-O-O",F="O-O",_="0-0-0",K="0-0",O="$",ue="{",le="}",Te=";",nt="(",Ue=")",$e="1-0",it="0-1",Ne="1/2-1/2",lt="*",_e=/^[a-zA-Z]/,Fe=/^[^"]/,Oe=/^[0-9]/,Be=/^[.]/,Qe=/^[a-zA-Z1-8\-=]/,Ve=/^[+#]/,Ye=/^[!?]/,o=/^[^}]/,x=/^[^\r\n]/,w=/^[ \t\r\n]/,y=Ie("tag pair"),k=xe("[",!1),D=xe('"',!1),W=xe("]",!1),X=Ie("tag name"),Q=Re([["a","z"],["A","Z"]],!1,!1),I=Ie("tag value"),N=Re(['"'],!0,!1),L=Ie("move number"),v=Re([["0","9"]],!1,!1),ne=xe(".",!1),re=Re(["."],!1,!1),pe=Ie("standard algebraic notation"),ie=xe("O-O-O",!1),oe=xe("O-O",!1),c=xe("0-0-0",!1),b=xe("0-0",!1),l=Re([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),P=Re(["+","#"],!1,!1),m=Ie("suffix annotation"),z=Re(["!","?"],!1,!1),A=Ie("NAG"),B=xe("$",!1),R=Ie("brace comment"),Z=xe("{",!1),te=Re(["}"],!0,!1),S=xe("}",!1),M=Ie("rest of line comment"),ee=xe(";",!1),V=Re(["\r",`
`],!0,!1),Y=Ie("variation"),ae=xe("(",!1),de=xe(")",!1),ve=Ie("game termination marker"),fe=xe("1-0",!1),Je=xe("0-1",!1),ce=xe("1/2-1/2",!1),be=xe("*",!1),we=Ie("whitespace"),Me=Re([" ","	","\r",`
`],!1,!1),Ee=function(d,g){return _a(d,g)},ze=function(d){return Object.fromEntries(d)},Ze=function(d,g){return[d,g]},je=function(d,g){return{root:d,marker:g}},Xe=function(d,g){return $a(wa(d),...g.flat())},dt=function(d,g,f,H,G){return Sa(d,g,f,H,G)},Zt=function(d){return d},Xt=function(d){return d.replace(/[\r\n]+/g," ")},ea=function(d){return d.trim()},ta=function(d){return d},aa=function(d,g){return{result:d,comment:g}},u=t.peg$currPos|0,rt=[{line:1,column:1}],Le=u,ft=t.peg$maxFailExpected||[],T=t.peg$silentFails|0,ct;if(t.startRule){if(!(t.startRule in s))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');i=s[t.startRule]}function xe(d,g){return{type:"literal",text:d,ignoreCase:g}}function Re(d,g,f){return{type:"class",parts:d,inverted:g,ignoreCase:f}}function na(){return{type:"end"}}function Ie(d){return{type:"other",description:d}}function qt(d){var g=rt[d],f;if(g)return g;if(d>=rt.length)f=rt.length-1;else for(f=d;!rt[--f];);for(g=rt[f],g={line:g.line,column:g.column};f<d;)n.charCodeAt(f)===10?(g.line++,g.column=1):g.column++,f++;return rt[d]=g,g}function zt(d,g,f){var H=qt(d),G=qt(g),se={source:r,start:{offset:d,line:H.line,column:H.column},end:{offset:g,line:G.line,column:G.column}};return se}function j(d){u<Le||(u>Le&&(Le=u,ft=[]),ft.push(d))}function ia(d,g,f){return new st(st.buildMessage(d,g),d,g,f)}function Rt(){var d,g,f;return d=u,g=ra(),f=la(),d=Ee(g,f),d}function ra(){var d,g,f;for(d=u,g=[],f=Nt();f!==e;)g.push(f),f=Nt();return f=Ae(),d=ze(g),d}function Nt(){var d,g,f,H,G,se,et;return T++,d=u,Ae(),n.charCodeAt(u)===91?(g=p,u++):(g=e,T===0&&j(k)),g!==e?(Ae(),f=oa(),f!==e?(Ae(),n.charCodeAt(u)===34?(H=a,u++):(H=e,T===0&&j(D)),H!==e?(G=sa(),n.charCodeAt(u)===34?(se=a,u++):(se=e,T===0&&j(D)),se!==e?(Ae(),n.charCodeAt(u)===93?(et=h,u++):(et=e,T===0&&j(W)),et!==e?d=Ze(f,G):(u=d,d=e)):(u=d,d=e)):(u=d,d=e)):(u=d,d=e)):(u=d,d=e),T--,d===e&&T===0&&j(y),d}function oa(){var d,g,f;if(T++,d=u,g=[],f=n.charAt(u),_e.test(f)?u++:(f=e,T===0&&j(Q)),f!==e)for(;f!==e;)g.push(f),f=n.charAt(u),_e.test(f)?u++:(f=e,T===0&&j(Q));else g=e;return g!==e?d=n.substring(d,u):d=g,T--,d===e&&(g=e,T===0&&j(X)),d}function sa(){var d,g,f;for(T++,d=u,g=[],f=n.charAt(u),Fe.test(f)?u++:(f=e,T===0&&j(N));f!==e;)g.push(f),f=n.charAt(u),Fe.test(f)?u++:(f=e,T===0&&j(N));return d=n.substring(d,u),T--,g=e,T===0&&j(I),d}function la(){var d,g,f;return d=u,g=Ft(),Ae(),f=fa(),f===e&&(f=null),Ae(),d=je(g,f),d}function Ft(){var d,g,f,H;for(d=u,g=$t(),g===e&&(g=null),f=[],H=Ot();H!==e;)f.push(H),H=Ot();return d=Xe(g,f),d}function Ot(){var d,g,f,H,G,se,et,bt;if(d=u,Ae(),da(),Ae(),g=ca(),g!==e){for(f=pa(),f===e&&(f=null),H=[],G=Bt();G!==e;)H.push(G),G=Bt();for(G=Ae(),se=$t(),se===e&&(se=null),et=[],bt=jt();bt!==e;)et.push(bt),bt=jt();d=dt(g,f,H,se,et)}else u=d,d=e;return d}function da(){var d,g,f,H,G,se;for(T++,d=u,g=[],f=n.charAt(u),Oe.test(f)?u++:(f=e,T===0&&j(v));f!==e;)g.push(f),f=n.charAt(u),Oe.test(f)?u++:(f=e,T===0&&j(v));if(n.charCodeAt(u)===46?(f=$,u++):(f=e,T===0&&j(ne)),f!==e){for(H=Ae(),G=[],se=n.charAt(u),Be.test(se)?u++:(se=e,T===0&&j(re));se!==e;)G.push(se),se=n.charAt(u),Be.test(se)?u++:(se=e,T===0&&j(re));g=[g,f,H,G],d=g}else u=d,d=e;return T--,d===e&&(g=e,T===0&&j(L)),d}function ca(){var d,g,f,H,G,se;if(T++,d=u,g=u,n.substr(u,5)===E?(f=E,u+=5):(f=e,T===0&&j(ie)),f===e&&(n.substr(u,3)===F?(f=F,u+=3):(f=e,T===0&&j(oe)),f===e&&(n.substr(u,5)===_?(f=_,u+=5):(f=e,T===0&&j(c)),f===e&&(n.substr(u,3)===K?(f=K,u+=3):(f=e,T===0&&j(b)),f===e))))if(f=u,H=n.charAt(u),_e.test(H)?u++:(H=e,T===0&&j(Q)),H!==e){if(G=[],se=n.charAt(u),Qe.test(se)?u++:(se=e,T===0&&j(l)),se!==e)for(;se!==e;)G.push(se),se=n.charAt(u),Qe.test(se)?u++:(se=e,T===0&&j(l));else G=e;G!==e?(H=[H,G],f=H):(u=f,f=e)}else u=f,f=e;return f!==e?(H=n.charAt(u),Ve.test(H)?u++:(H=e,T===0&&j(P)),H===e&&(H=null),f=[f,H],g=f):(u=g,g=e),g!==e?d=n.substring(d,u):d=g,T--,d===e&&(g=e,T===0&&j(pe)),d}function pa(){var d,g,f;for(T++,d=u,g=[],f=n.charAt(u),Ye.test(f)?u++:(f=e,T===0&&j(z));f!==e;)g.push(f),g.length>=2?f=e:(f=n.charAt(u),Ye.test(f)?u++:(f=e,T===0&&j(z)));return g.length<1?(u=d,d=e):d=g,T--,d===e&&(g=e,T===0&&j(m)),d}function Bt(){var d,g,f,H,G;if(T++,d=u,Ae(),n.charCodeAt(u)===36?(g=O,u++):(g=e,T===0&&j(B)),g!==e){if(f=u,H=[],G=n.charAt(u),Oe.test(G)?u++:(G=e,T===0&&j(v)),G!==e)for(;G!==e;)H.push(G),G=n.charAt(u),Oe.test(G)?u++:(G=e,T===0&&j(v));else H=e;H!==e?f=n.substring(f,u):f=H,f!==e?d=Zt(f):(u=d,d=e)}else u=d,d=e;return T--,d===e&&T===0&&j(A),d}function $t(){var d;return d=ua(),d===e&&(d=ga()),d}function ua(){var d,g,f,H,G;if(T++,d=u,n.charCodeAt(u)===123?(g=ue,u++):(g=e,T===0&&j(Z)),g!==e){for(f=u,H=[],G=n.charAt(u),o.test(G)?u++:(G=e,T===0&&j(te));G!==e;)H.push(G),G=n.charAt(u),o.test(G)?u++:(G=e,T===0&&j(te));f=n.substring(f,u),n.charCodeAt(u)===125?(H=le,u++):(H=e,T===0&&j(S)),H!==e?d=Xt(f):(u=d,d=e)}else u=d,d=e;return T--,d===e&&(g=e,T===0&&j(R)),d}function ga(){var d,g,f,H,G;if(T++,d=u,n.charCodeAt(u)===59?(g=Te,u++):(g=e,T===0&&j(ee)),g!==e){for(f=u,H=[],G=n.charAt(u),x.test(G)?u++:(G=e,T===0&&j(V));G!==e;)H.push(G),G=n.charAt(u),x.test(G)?u++:(G=e,T===0&&j(V));f=n.substring(f,u),d=ea(f)}else u=d,d=e;return T--,d===e&&(g=e,T===0&&j(M)),d}function jt(){var d,g,f,H;return T++,d=u,Ae(),n.charCodeAt(u)===40?(g=nt,u++):(g=e,T===0&&j(ae)),g!==e?(f=Ft(),f!==e?(Ae(),n.charCodeAt(u)===41?(H=Ue,u++):(H=e,T===0&&j(de)),H!==e?d=ta(f):(u=d,d=e)):(u=d,d=e)):(u=d,d=e),T--,d===e&&T===0&&j(Y),d}function fa(){var d,g,f;return T++,d=u,n.substr(u,3)===$e?(g=$e,u+=3):(g=e,T===0&&j(fe)),g===e&&(n.substr(u,3)===it?(g=it,u+=3):(g=e,T===0&&j(Je)),g===e&&(n.substr(u,7)===Ne?(g=Ne,u+=7):(g=e,T===0&&j(ce)),g===e&&(n.charCodeAt(u)===42?(g=lt,u++):(g=e,T===0&&j(be))))),g!==e?(Ae(),f=$t(),f===e&&(f=null),d=aa(g,f)):(u=d,d=e),T--,d===e&&(g=e,T===0&&j(ve)),d}function Ae(){var d,g;for(T++,d=[],g=n.charAt(u),w.test(g)?u++:(g=e,T===0&&j(Me));g!==e;)d.push(g),g=n.charAt(u),w.test(g)?u++:(g=e,T===0&&j(Me));return T--,g=e,T===0&&j(we),d}if(ct=i(),t.peg$library)return{peg$result:ct,peg$currPos:u,peg$FAILED:e,peg$maxFailExpected:ft,peg$maxFailPos:Le};if(ct!==e&&u===n.length)return ct;throw ct!==e&&u<n.length&&j(na()),ia(ft,Le<n.length?n.charAt(Le):null,Le<n.length?zt(Le,Le+1):zt(Le,Le))}/**
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
 */const kt=0xffffffffffffffffn;function Et(n,t){return(n<<t|n>>64n-t)&0xffffffffffffffffn}function Kt(n,t){return n*t&kt}function Aa(n){return function(){let t=BigInt(n&kt),e=BigInt(n>>64n&kt);const r=Kt(Et(Kt(t,5n),7n),9n);return e^=t,t=(Et(t,24n)^e^e<<16n)&kt,e=Et(e,37n),n=e<<64n|t,r}}const St=Aa(0xa187eb39cdcaed8f31c4b365b102e01en),Ta=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>St()))),Pa=Array.from({length:8},()=>St()),Da=Array.from({length:16},()=>St()),At=St(),Ce="w",Pe="b",me="p",Mt="n",wt="b",ut="r",We="q",he="k",Tt="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class vt{constructor(t,e){ge(this,"color");ge(this,"from");ge(this,"to");ge(this,"piece");ge(this,"captured");ge(this,"promotion");ge(this,"flags");ge(this,"san");ge(this,"lan");ge(this,"before");ge(this,"after");const{color:r,piece:s,from:i,to:p,flags:a,captured:h,promotion:$}=e,E=ke(i),F=ke(p);this.color=r,this.piece=s,this.from=E,this.to=F,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=E+F,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const _ in J)J[_]&a&&(this.flags+=tt[_]);h&&(this.captured=h),$&&(this.promotion=$,this.lan+=$)}isCapture(){return this.flags.indexOf(tt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(tt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(tt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(tt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(tt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(tt.BIG_PAWN)>-1}}const Se=-1,tt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},J={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},Lt={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Ia={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Ma={...Lt,...Ia},U={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},Pt={b:[16,32,17,15],w:[-16,-32,-17,-15]},Wt={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},La=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],qa=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],za={p:1,n:2,b:4,r:8,q:16,k:32},Ra="pnbrqkPNBRQK",Ut=[Mt,wt,ut,We],Na=7,Fa=6,Oa=1,Ba=0,xt={[he]:J.KSIDE_CASTLE,[We]:J.QSIDE_CASTLE},Ge={w:[{square:U.a1,flag:J.QSIDE_CASTLE},{square:U.h1,flag:J.KSIDE_CASTLE}],b:[{square:U.a8,flag:J.QSIDE_CASTLE},{square:U.h8,flag:J.KSIDE_CASTLE}]},ja={b:Oa,w:Fa},Dt="--";function at(n){return n>>4}function gt(n){return n&15}function Jt(n){return"0123456789".indexOf(n)!==-1}function ke(n){const t=gt(n),e=at(n);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function pt(n){return n===Ce?Pe:Ce}function Ha(n){const t=n.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const r=parseInt(t[4],10);if(isNaN(r)||r<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const s=t[0].split("/");if(s.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let p=0;p<s.length;p++){let a=0,h=!1;for(let $=0;$<s[p].length;$++)if(Jt(s[p][$])){if(h)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};a+=parseInt(s[p][$],10),h=!0}else{if(!/^[prnbqkPRNBQK]$/.test(s[p][$]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};a+=1,h=!1}if(a!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const i=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:p,regex:a}of i){if(!a.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${p} king`};if((t[0].match(a)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${p} kings`}}return Array.from(s[0]+s[7]).some(p=>p.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Ga(n,t){const e=n.from,r=n.to,s=n.piece;let i=0,p=0,a=0;for(let h=0,$=t.length;h<$;h++){const E=t[h].from,F=t[h].to,_=t[h].piece;s===_&&e!==E&&r===F&&(i++,at(e)===at(E)&&p++,gt(e)===gt(E)&&a++)}return i>0?p>0&&a>0?ke(e):a>0?ke(e).charAt(1):ke(e).charAt(0):""}function Ke(n,t,e,r,s,i=void 0,p=J.NORMAL){const a=at(r);if(s===me&&(a===Na||a===Ba))for(let h=0;h<Ut.length;h++){const $=Ut[h];n.push({color:t,from:e,to:r,piece:s,captured:i,promotion:$,flags:p|J.PROMOTION})}else n.push({color:t,from:e,to:r,piece:s,captured:i,flags:p})}function Qt(n){let t=n.charAt(0);return t>="a"&&t<="h"?n.match(/[a-h]\d.*[a-h]\d/)?void 0:me:(t=t.toLowerCase(),t==="o"?he:t)}function It(n){return n.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class Vt{constructor(t=Tt,{skipValidation:e=!1}={}){ge(this,"_board",new Array(128));ge(this,"_turn",Ce);ge(this,"_header",{});ge(this,"_kings",{w:Se,b:Se});ge(this,"_epSquare",-1);ge(this,"_halfMoves",0);ge(this,"_moveNumber",0);ge(this,"_history",[]);ge(this,"_comments",{});ge(this,"_castling",{w:0,b:0});ge(this,"_hash",0n);ge(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Se,b:Se},this._turn=Ce,this._castling={w:0,b:0},this._epSquare=Se,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Ma},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:r=!1}={}){let s=t.split(/\s+/);if(s.length>=2&&s.length<6){const a=["-","-","0","1"];t=s.concat(a.slice(-(6-s.length))).join(" ")}if(s=t.split(/\s+/),!e){const{ok:a,error:h}=Ha(t);if(!a)throw new Error(h)}const i=s[0];let p=0;this.clear({preserveHeaders:r});for(let a=0;a<i.length;a++){const h=i.charAt(a);if(h==="/")p+=8;else if(Jt(h))p+=parseInt(h,10);else{const $=h<"a"?Ce:Pe;this._put({type:h.toLowerCase(),color:$},ke(p)),p++}}this._turn=s[1],s[2].indexOf("K")>-1&&(this._castling.w|=J.KSIDE_CASTLE),s[2].indexOf("Q")>-1&&(this._castling.w|=J.QSIDE_CASTLE),s[2].indexOf("k")>-1&&(this._castling.b|=J.KSIDE_CASTLE),s[2].indexOf("q")>-1&&(this._castling.b|=J.QSIDE_CASTLE),this._epSquare=s[3]==="-"?Se:U[s[3]],this._halfMoves=parseInt(s[4],10),this._moveNumber=parseInt(s[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var p,a;let e=0,r="";for(let h=U.a8;h<=U.h1;h++){if(this._board[h]){e>0&&(r+=e,e=0);const{color:$,type:E}=this._board[h];r+=$===Ce?E.toUpperCase():E.toLowerCase()}else e++;h+1&136&&(e>0&&(r+=e),h!==U.h1&&(r+="/"),e=0,h+=8)}let s="";this._castling[Ce]&J.KSIDE_CASTLE&&(s+="K"),this._castling[Ce]&J.QSIDE_CASTLE&&(s+="Q"),this._castling[Pe]&J.KSIDE_CASTLE&&(s+="k"),this._castling[Pe]&J.QSIDE_CASTLE&&(s+="q"),s=s||"-";let i="-";if(this._epSquare!==Se)if(t)i=ke(this._epSquare);else{const h=this._epSquare+(this._turn===Ce?16:-16),$=[h+1,h-1];for(const E of $){if(E&136)continue;const F=this._turn;if(((p=this._board[E])==null?void 0:p.color)===F&&((a=this._board[E])==null?void 0:a.type)===me){this._makeMove({color:F,from:E,to:this._epSquare,piece:me,captured:me,flags:J.EP_CAPTURE});const _=!this._isKingAttacked(F);if(this._undoMove(),_){i=ke(this._epSquare);break}}}}return[r,this._turn,s,i,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:r}=this._board[t],s={w:0,b:1}[e],i={p:0,n:1,b:2,r:3,q:4,k:5}[r];return Ta[s][i][t]}_epKey(){return this._epSquare===Se?0n:Pa[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Da[t]}_computeHash(){let t=0n;for(let e=U.a8;e<=U.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=At),t}_updateSetup(t){this._history.length>0||(t!==Tt?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(Tt)}get(t){return this._board[U[t]]}findPiece(t){var r;const e=[];for(let s=U.a8;s<=U.h1;s++){if(s&136){s+=7;continue}!this._board[s]||((r=this._board[s])==null?void 0:r.color)!==t.color||this._board[s].color===t.color&&this._board[s].type===t.type&&e.push(ke(s))}return e}put({type:t,color:e},r){return this._put({type:t,color:e},r)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},r){if(Ra.indexOf(t.toLowerCase())===-1||!(r in U))return!1;const s=U[r];if(t==he&&!(this._kings[e]==Se||this._kings[e]==s))return!1;const i=this._board[s];return i&&i.type===he&&(this._kings[i.color]=Se),this._set(s,{type:t,color:e}),t===he&&(this._kings[e]=s),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(U[t]),e&&e.type===he&&(this._kings[e.color]=Se),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var r,s,i,p,a,h,$,E,F,_,K,O;this._hash^=this._castlingKey();const t=((r=this._board[U.e1])==null?void 0:r.type)===he&&((s=this._board[U.e1])==null?void 0:s.color)===Ce,e=((i=this._board[U.e8])==null?void 0:i.type)===he&&((p=this._board[U.e8])==null?void 0:p.color)===Pe;(!t||((a=this._board[U.a1])==null?void 0:a.type)!==ut||((h=this._board[U.a1])==null?void 0:h.color)!==Ce)&&(this._castling.w&=-65),(!t||(($=this._board[U.h1])==null?void 0:$.type)!==ut||((E=this._board[U.h1])==null?void 0:E.color)!==Ce)&&(this._castling.w&=-33),(!e||((F=this._board[U.a8])==null?void 0:F.type)!==ut||((_=this._board[U.a8])==null?void 0:_.color)!==Pe)&&(this._castling.b&=-65),(!e||((K=this._board[U.h8])==null?void 0:K.type)!==ut||((O=this._board[U.h8])==null?void 0:O.color)!==Pe)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var i,p;if(this._epSquare===Se)return;const t=this._epSquare+(this._turn===Ce?-16:16),e=this._epSquare+(this._turn===Ce?16:-16),r=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((i=this._board[e])==null?void 0:i.color)!==pt(this._turn)||((p=this._board[e])==null?void 0:p.type)!==me){this._hash^=this._epKey(),this._epSquare=Se;return}const s=a=>{var h,$;return!(a&136)&&((h=this._board[a])==null?void 0:h.color)===this._turn&&(($=this._board[a])==null?void 0:$.type)===me};r.some(s)||(this._hash^=this._epKey(),this._epSquare=Se)}_attacked(t,e,r){const s=[];for(let i=U.a8;i<=U.h1;i++){if(i&136){i+=7;continue}if(this._board[i]===void 0||this._board[i].color!==t)continue;const p=this._board[i],a=i-e;if(a===0)continue;const h=a+119;if(La[h]&za[p.type]){if(p.type===me){if(a>0&&p.color===Ce||a<=0&&p.color===Pe)if(r)s.push(ke(i));else return!0;continue}if(p.type==="n"||p.type==="k")if(r){s.push(ke(i));continue}else return!0;const $=qa[h];let E=i+$,F=!1;for(;E!==e;){if(this._board[E]!=null){F=!0;break}E+=$}if(!F)if(r){s.push(ke(i));continue}else return!0}}return r?s:!1}attackers(t,e){return e?this._attacked(e,U[t],!0):this._attacked(this._turn,U[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(pt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,U[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let r=0,s=0;for(let i=U.a8;i<=U.h1;i++){if(s=(s+1)%2,i&136){i+=7;continue}const p=this._board[i];p&&(t[p.type]=p.type in t?t[p.type]+1:1,p.type===wt&&e.push(s),r++)}if(r===2)return!0;if(r===3&&(t[wt]===1||t[Mt]===1))return!0;if(r===t[wt]+2){let i=0;const p=e.length;for(let a=0;a<p;a++)i+=e[a];if(i===0||i===p)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:r=void 0}={}){const s=this._moves({square:e,piece:r});return t?s.map(i=>new vt(this,i)):s.map(i=>this._moveToSan(i,s))}_moves({legal:t=!0,piece:e=void 0,square:r=void 0}={}){var K;const s=r?r.toLowerCase():void 0,i=e==null?void 0:e.toLowerCase(),p=[],a=this._turn,h=pt(a);let $=U.a8,E=U.h1,F=!1;if(s)if(s in U)$=E=U[s],F=!0;else return[];for(let O=$;O<=E;O++){if(O&136){O+=7;continue}if(!this._board[O]||this._board[O].color===h)continue;const{type:ue}=this._board[O];let le;if(ue===me){if(i&&i!==ue)continue;le=O+Pt[a][0],this._board[le]||(Ke(p,a,O,le,me),le=O+Pt[a][1],ja[a]===at(O)&&!this._board[le]&&Ke(p,a,O,le,me,void 0,J.BIG_PAWN));for(let Te=2;Te<4;Te++)le=O+Pt[a][Te],!(le&136)&&(((K=this._board[le])==null?void 0:K.color)===h?Ke(p,a,O,le,me,this._board[le].type,J.CAPTURE):le===this._epSquare&&Ke(p,a,O,le,me,me,J.EP_CAPTURE))}else{if(i&&i!==ue)continue;for(let Te=0,nt=Wt[ue].length;Te<nt;Te++){const Ue=Wt[ue][Te];for(le=O;le+=Ue,!(le&136);){if(!this._board[le])Ke(p,a,O,le,ue);else{if(this._board[le].color===a)break;Ke(p,a,O,le,ue,this._board[le].type,J.CAPTURE);break}if(ue===Mt||ue===he)break}}}}if((i===void 0||i===he)&&(!F||E===this._kings[a])){if(this._castling[a]&J.KSIDE_CASTLE){const O=this._kings[a],ue=O+2;!this._board[O+1]&&!this._board[ue]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,O+1)&&!this._attacked(h,ue)&&Ke(p,a,this._kings[a],ue,he,void 0,J.KSIDE_CASTLE)}if(this._castling[a]&J.QSIDE_CASTLE){const O=this._kings[a],ue=O-2;!this._board[O-1]&&!this._board[O-2]&&!this._board[O-3]&&!this._attacked(h,this._kings[a])&&!this._attacked(h,O-1)&&!this._attacked(h,ue)&&Ke(p,a,this._kings[a],ue,he,void 0,J.QSIDE_CASTLE)}}if(!t||this._kings[a]===-1)return p;const _=[];for(let O=0,ue=p.length;O<ue;O++)this._makeMove(p[O]),this._isKingAttacked(a)||_.push(p[O]),this._undoMove();return _}move(t,{strict:e=!1}={}){let r=null;if(typeof t=="string")r=this._moveFromSan(t,e);else if(t===null)r=this._moveFromSan(Dt,e);else if(typeof t=="object"){const i=this._moves();for(let p=0,a=i.length;p<a;p++)if(t.from===ke(i[p].from)&&t.to===ke(i[p].to)&&(!("promotion"in i[p])||t.promotion===i[p].promotion)){r=i[p];break}}if(!r)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&r.flags&J.NULL_MOVE)throw new Error("Null move not allowed when in check");const s=new vt(this,r);return this._makeMove(r),this._incPositionCount(),s}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var s,i,p,a;const e=this._turn,r=pt(e);if(this._push(t),t.flags&J.NULL_MOVE){e===Pe&&this._moveNumber++,this._halfMoves++,this._turn=r,this._epSquare=Se;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&J.EP_CAPTURE&&(this._turn===Pe?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===he){if(this._kings[e]=t.to,t.flags&J.KSIDE_CASTLE){const h=t.to-1,$=t.to+1;this._movePiece($,h)}else if(t.flags&J.QSIDE_CASTLE){const h=t.to+1,$=t.to-2;this._movePiece($,h)}this._castling[e]=0}if(this._castling[e]){for(let h=0,$=Ge[e].length;h<$;h++)if(t.from===Ge[e][h].square&&this._castling[e]&Ge[e][h].flag){this._castling[e]^=Ge[e][h].flag;break}}if(this._castling[r]){for(let h=0,$=Ge[r].length;h<$;h++)if(t.to===Ge[r][h].square&&this._castling[r]&Ge[r][h].flag){this._castling[r]^=Ge[r][h].flag;break}}if(this._hash^=this._castlingKey(),t.flags&J.BIG_PAWN){let h;e===Pe?h=t.to-16:h=t.to+16,!(t.to-1&136)&&((s=this._board[t.to-1])==null?void 0:s.type)===me&&((i=this._board[t.to-1])==null?void 0:i.color)===r||!(t.to+1&136)&&((p=this._board[t.to+1])==null?void 0:p.type)===me&&((a=this._board[t.to+1])==null?void 0:a.color)===r?(this._epSquare=h,this._hash^=this._epKey()):this._epSquare=Se}else this._epSquare=Se;t.piece===me?this._halfMoves=0:t.flags&(J.CAPTURE|J.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===Pe&&this._moveNumber++,this._turn=r,this._hash^=At}undo(){const t=this._hash,e=this._undoMove();if(e){const r=new vt(this,e);return this._decPositionCount(t),r}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=At;const r=this._turn,s=pt(r);if(e.flags&J.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:r})),e.captured)if(e.flags&J.EP_CAPTURE){let i;r===Pe?i=e.to-16:i=e.to+16,this._set(i,{type:me,color:s})}else this._set(e.to,{type:e.captured,color:s});if(e.flags&(J.KSIDE_CASTLE|J.QSIDE_CASTLE)){let i,p;e.flags&J.KSIDE_CASTLE?(i=e.to+1,p=e.to-1):(i=e.to-2,p=e.to+1),this._movePiece(p,i)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const r=[];let s=!1;for(const _ in this._header)this._header[_]&&r.push(`[${_} "${this._header[_]}"]`+t),s=!0;s&&this._history.length&&r.push(t);const i=_=>{const K=this._comments[this.fen()];if(typeof K<"u"){const O=_.length>0?" ":"";_=`${_}${O}{${K}}`}return _},p=[];for(;this._history.length>0;)p.push(this._undoMove());const a=[];let h="";for(p.length===0&&a.push(i(""));p.length>0;){h=i(h);const _=p.pop();if(!_)break;if(!this._history.length&&_.color==="b"){const K=`${this._moveNumber}. ...`;h=h?`${h} ${K}`:K}else _.color==="w"&&(h.length&&a.push(h),h=this._moveNumber+".");h=h+" "+this._moveToSan(_,this._moves({legal:!0})),this._makeMove(_)}if(h.length&&a.push(i(h)),a.push(this._header.Result||"*"),e===0)return r.join("")+a.join(" ");const $=function(){return r.length>0&&r[r.length-1]===" "?(r.pop(),!0):!1},E=function(_,K){for(const O of K.split(" "))if(O){if(_+O.length>e){for(;$();)_--;r.push(t),_=0}r.push(O),_+=O.length,r.push(" "),_++}return $()&&_--,_};let F=0;for(let _=0;_<a.length;_++){if(F+a[_].length>e&&a[_].includes("{")){F=E(F,a[_]);continue}F+a[_].length>e&&_!==0?(r[r.length-1]===" "&&r.pop(),r.push(t),F=0):_!==0&&(r.push(" "),F++),r.push(a[_]),F+=a[_].length}return r.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??Lt[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=Lt[t]||null,!0):!1}getHeaders(){const t={};for(const[e,r]of Object.entries(this._header))r!==null&&(t[e]=r);return t}loadPgn(t,{strict:e=!1,newlineChar:r=`\r?
`}={}){r!==`\r?
`&&(t=t.replace(new RegExp(r,"g"),`
`));const s=Ea(t);this.reset();const i=s.headers;let p="";for(const $ in i)$.toLowerCase()==="fen"&&(p=i[$]),this.header($,i[$]);if(!e)p&&this.load(p,{preserveHeaders:!0});else if(i.SetUp==="1"){if(!("FEN"in i))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(i.FEN,{preserveHeaders:!0})}let a=s.root;for(;a;){if(a.move){const $=this._moveFromSan(a.move,e);if($==null)throw new Error(`Invalid move in PGN: ${a.move}`);this._makeMove($),this._incPositionCount()}a.comment!==void 0&&(this._comments[this.fen()]=a.comment),a=a.variations[0]}const h=s.result;h&&Object.keys(this._header).length&&this._header.Result!==h&&this.setHeader("Result",h)}_moveToSan(t,e){let r="";if(t.flags&J.KSIDE_CASTLE)r="O-O";else if(t.flags&J.QSIDE_CASTLE)r="O-O-O";else{if(t.flags&J.NULL_MOVE)return Dt;if(t.piece!==me){const s=Ga(t,e);r+=t.piece.toUpperCase()+s}t.flags&(J.CAPTURE|J.EP_CAPTURE)&&(t.piece===me&&(r+=ke(t.from)[0]),r+="x"),r+=ke(t.to),t.promotion&&(r+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?r+="#":r+="+"),this._undoMove(),r}_moveFromSan(t,e=!1){let r=It(t);if(e||(r==="0-0"?r="O-O":r==="0-0-0"&&(r="O-O-O")),r==Dt)return{color:this._turn,from:0,to:0,piece:"k",flags:J.NULL_MOVE};let s=Qt(r),i=this._moves({legal:!0,piece:s});for(let _=0,K=i.length;_<K;_++)if(r===It(this._moveToSan(i[_],i)))return i[_];if(e)return null;let p,a,h,$,E,F=!1;if(a=r.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),a?(p=a[1],h=a[2],$=a[3],E=a[4],h.length==1&&(F=!0)):(a=r.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),a&&(p=a[1],h=a[2],$=a[3],E=a[4],h.length==1&&(F=!0))),s=Qt(r),i=this._moves({legal:!0,piece:p||s}),!$)return null;for(let _=0,K=i.length;_<K;_++)if(h){if((!p||p.toLowerCase()==i[_].piece)&&U[h]==i[_].from&&U[$]==i[_].to&&(!E||E.toLowerCase()==i[_].promotion))return i[_];if(F){const O=ke(i[_].from);if((!p||p.toLowerCase()==i[_].piece)&&U[$]==i[_].to&&(h==O[0]||h==O[1])&&(!E||E.toLowerCase()==i[_].promotion))return i[_]}}else if(r===It(this._moveToSan(i[_],i)).replace("x",""))return i[_];return null}ascii(){let t=`   +------------------------+
`;for(let e=U.a8;e<=U.h1;e++){if(gt(e)===0&&(t+=" "+"87654321"[at(e)]+" |"),this._board[e]){const r=this._board[e].type,i=this._board[e].color===Ce?r.toUpperCase():r.toLowerCase();t+=" "+i+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let r=0;const s=this._turn;for(let i=0,p=e.length;i<p;i++)this._makeMove(e[i]),this._isKingAttacked(s)||(t-1>0?r+=this.perft(t-1):r++),this._undoMove();return r}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let r=U.a8;r<=U.h1;r++)this._board[r]==null?e.push(null):e.push({square:ke(r),type:this._board[r].type,color:this._board[r].color}),r+1&136&&(t.push(e),e=[],r+=8);return t}squareColor(t){if(t in U){const e=U[t];return(at(e)+gt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],r=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const s=e.pop();if(!s)break;t?r.push(new vt(this,s)):r.push(this._moveToSan(s,this._moves())),this._makeMove(s)}return r}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},r=s=>{s in this._comments&&(e[s]=this._comments[s])};for(;this._history.length>0;)t.push(this._undoMove());for(r(this.fen());;){const s=t.pop();if(!s)break;this._makeMove(s),r(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const s of[he,We])e[s]!==void 0&&(e[s]?this._castling[t]|=xt[s]:this._castling[t]&=~xt[s]);this._updateCastlingRights();const r=this.getCastlingRights(t);return(e[he]===void 0||e[he]===r[he])&&(e[We]===void 0||e[We]===r[We])}getCastlingRights(t){return{[he]:(this._castling[t]&xt[he])!==0,[We]:(this._castling[t]&xt[We])!==0}}moveNumber(){return this._moveNumber}}async function Va(n,t={}){var pe,ie,oe;const e=t.currentUser||{};let r="chat",s=[],i=null,p=[],a=[],h=null,$=null,E=!1,F=null,_=null;n.innerHTML=`
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
  `,Ka(),await Ue(),_e();const K=n.querySelector("#tab-nav-chat"),O=n.querySelector("#tab-nav-lounge"),ue=n.querySelector("#bonding-chat-main-wrap"),le=n.querySelector("#bonding-lounge-main-wrap");K==null||K.addEventListener("click",()=>{r="chat",K.classList.add("active"),O.classList.remove("active"),ue.style.display="grid",le.style.display="none",_e()}),O==null||O.addEventListener("click",async()=>{r="lounge_games",O.classList.add("active"),K.classList.remove("active"),ue.style.display="none",le.style.display="block",await k()}),(pe=n.querySelector("#btn-top-new-chat"))==null||pe.addEventListener("click",L),(ie=n.querySelector("#btn-top-new-group"))==null||ie.addEventListener("click",v),(oe=n.querySelector("#btn-top-challenge"))==null||oe.addEventListener("click",()=>W());const Te=n.querySelector("#bonding-search-input");Te&&Te.addEventListener("input",c=>{const b=c.target.value.toLowerCase().trim();n.querySelectorAll(".bonding-channel-item").forEach(P=>{const m=P.textContent.toLowerCase();P.style.display=m.includes(b)?"flex":"none"})}),it(),new MutationObserver((c,b)=>{document.body.contains(n)||($&&clearInterval($),_&&clearInterval(_),b.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function Ue(){try{const[c,b]=await Promise.all([De("/bonding/channels").catch(()=>[]),De("/bonding/colleagues").catch(()=>[])]);s=c,p=b,!i&&s.length>0&&(i=s.find(l=>l.name.includes("Lounge"))||s[0]),Ne(),i&&await $e(i._id)}catch(c){console.error("Failed to load bonding data",c)}}async function $e(c,b=!1){if(c)try{a=await De(`/bonding/channels/${c}/messages`),b?w():y()}catch(l){console.error("Failed to load messages",l)}}function it(){$&&clearInterval($),$=setInterval(async()=>{try{if(!document.body.contains(n)){clearInterval($);return}r==="chat"&&i?await $e(i._id,!0):r==="lounge_games"&&await k(!0)}catch{}},3e3)}function Ne(){const c=n.querySelector("#bonding-group-list"),b=n.querySelector("#bonding-direct-list");if(!c||!b)return;const l=s.filter(m=>m.type==="group"),P=s.filter(m=>m.type==="direct");l.length===0?c.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':c.innerHTML=l.map(m=>{var A;return`
          <div class="bonding-channel-item ${i&&i._id===m._id?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-icon">${m.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${C(m.name)}</div>
              <div class="bonding-channel-preview">${C(((A=m.lastMessage)==null?void 0:A.content)||"No messages yet")}</div>
            </div>
            
          </div>
        `}).join(""),P.length===0?b.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to connect!</div>':b.innerHTML=P.map(m=>{var R;const z=i&&i._id===m._id,A=m.displayName||m.name||"Colleague",B=A.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${z?"active":""}" data-channel-id="${m._id}">
            <div class="bonding-channel-avatar">${B}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${C(A)}</div>
              <div class="bonding-channel-preview">${C(((R=m.lastMessage)==null?void 0:R.content)||"Say hello...")}</div>
            </div>
          </div>
        `}).join(""),lt()}function lt(){var b,l;const c=n.querySelectorAll(".bonding-channel-item");c.forEach(P=>{P.onclick=async()=>{const m=P.dataset.channelId,z=s.find(A=>A._id===m);z&&(i=z,c.forEach(A=>A.classList.remove("active")),P.classList.add("active"),_e(),await $e(z._id))}}),(b=n.querySelector("#btn-create-group"))==null||b.addEventListener("click",v),(l=n.querySelector("#btn-new-direct-chat"))==null||l.addEventListener("click",L)}function _e(){const c=n.querySelector("#bonding-chat-panel");if(!c)return;if(!i){c.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const b=C(i.displayName||i.name),l=(i.members||[]).length,P=i.type==="group",m=(e==null?void 0:e._id)||(e==null?void 0:e.id),z=P?null:(i.members||[]).find(A=>{var B;return((B=A.userId)==null?void 0:B.toString())!==(m==null?void 0:m.toString())});c.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${P?i.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${b}</div>
            <div class="bonding-chat-sub">
              ${P?`<span>${l} members</span> · <span>${C(i.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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
    `,Be(z),Qe(z),Ve(),x()}function Fe(){if(!a||a.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const c=(e==null?void 0:e._id)||(e==null?void 0:e.id);return a.map(b=>{var A,B,R,Z,te,S,M,ee,V;const l=b.sender&&b.sender.userId&&c&&b.sender.userId.toString()===c.toString();if(b.type==="system")return`
          <div class="bonding-msg-system">
            <span>ℹ️</span> <span>${C(b.content)}</span>
          </div>
        `;if(b.type==="challenge"&&b.challengeData){const Y=b.challengeData,ae=Y.gameTitle||"Game Challenge",de=Y.gameType||"chess",ve=de==="chess"?"♟️":de==="connectfour"?"🔴":"❌",fe=(A=Y.gameState)==null?void 0:A.invitationId,Je=(B=Y.targetUserId)==null?void 0:B.toString(),ce=(Z=(R=b.sender)==null?void 0:R.userId)==null?void 0:Z.toString(),be=c&&Je===c.toString(),we=c&&ce===c.toString();return`
          <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${b._id}">
            <div class="bonding-msg-avatar" title="${C(((te=b.sender)==null?void 0:te.name)||"Teammate")}">
              ${(((S=b.sender)==null?void 0:S.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${C(((M=b.sender)==null?void 0:M.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${re(b.createdAt)}</span>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${ve}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${C(ae)}</h4>
                    <p class="game-bubble-desc">${C(b.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${Y.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':Y.status==="active"||Y.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${C(((ee=Y.status)==null?void 0:ee.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${Y.status==="pending"&&be?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${fe}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${fe}" data-action="decline">
                        Decline
                      </button>
                    `:Y.status==="pending"&&we?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${fe}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${fe}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${Oe(b)}
            </div>
          </div>
        `}const P=C(((V=b.sender)==null?void 0:V.name)||"Teammate"),m=re(b.createdAt),z=Oe(b);return`
        <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${b._id}">
          <div class="bonding-msg-avatar" title="${P}">${P.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${P}</span>
              <span class="bonding-msg-time">${m}</span>
            </div>
            <div class="bonding-msg-bubble">
              ${C(b.content).replace(/\n/g,"<br/>")}
            </div>
            ${z}
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
    `}function Be(c){const b=n.querySelector("#btn-chat-challenge");b&&(b.onclick=()=>{c?W(null,c.userId||c._id):W()});const l=n.querySelector("#btn-manage-members");l&&(l.onclick=I);const P=n.querySelector("#btn-delete-group");P&&(P.onclick=N)}function Qe(c){const b=n.querySelector("#bonding-message-input"),l=n.querySelector("#btn-send-message"),P=n.querySelector("#btn-quick-emoji"),m=n.querySelector("#btn-input-challenge");b&&b.addEventListener("keydown",z=>{z.key==="Enter"&&!z.shiftKey&&(z.preventDefault(),Ye())}),l&&(l.onclick=Ye),m&&(m.onclick=()=>{c?W(null,c.userId||c._id):W()}),P&&(P.onclick=()=>{if(!b)return;const z=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],A=z[Math.floor(Math.random()*z.length)];b.value+=(b.value?" ":"")+A,b.focus()})}function Ve(){n.querySelectorAll(".btn-respond-invite").forEach(l=>{l.onclick=async()=>{const P=l.dataset.inviteId,m=l.dataset.action;await X(P,m)}}),n.querySelectorAll(".btn-launch-match-from-card").forEach(l=>{l.onclick=async()=>{const P=l.dataset.inviteId;try{l.disabled=!0;const m=await De("/bonding/invitations"),z=(m.incoming||[]).concat(m.sent||[]).find(A=>A._id===P);z&&z.matchId?Q(z.matchId):q("Match has not started yet or has expired","warning")}catch(m){q(m.message||"Could not load match","error")}finally{l.disabled=!1}}}),n.querySelectorAll(".bonding-rxn-tag").forEach(l=>{l.onclick=async()=>{const P=l.dataset.msgId,m=l.dataset.emoji;await o(P,m)}}),n.querySelectorAll(".bonding-add-rxn-btn").forEach(l=>{l.onclick=P=>{const m=l.dataset.msgId;ne(P.currentTarget,async z=>{await o(m,z)})}})}async function Ye(){const c=n.querySelector("#bonding-message-input");if(!c||!i||E)return;const b=c.value.trim();if(b)try{E=!0,c.value="";const l=await ye(`/bonding/channels/${i._id}/messages`,{content:b,type:"text"});a.push(l),y(),x()}catch(l){q(l.message||"Failed to send message","error")}finally{E=!1,c.focus()}}async function o(c,b){try{const l=await ye(`/bonding/messages/${c}/react`,{emoji:b}),P=a.find(m=>m._id===c);P&&(P.reactions=l,w())}catch(l){q(l.message||"Failed to react","error")}}function x(){const c=n.querySelector("#bonding-messages-feed");c&&(c.scrollTop=c.scrollHeight)}function w(){const c=n.querySelector("#bonding-messages-feed");if(!c)return;const b=c.scrollHeight-c.scrollTop<=c.clientHeight+80;c.innerHTML=Fe(),Ve(),b&&x()}function y(){const c=n.querySelector("#bonding-messages-feed");c&&(c.innerHTML=Fe(),Ve())}async function k(c=!1){const b=n.querySelector("#bonding-lounge-main-wrap");if(b){c||(b.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const[l,P]=await Promise.all([De("/bonding/games/overview"),De("/bonding/leaderboard")]);h=l;const m=l.myStats||{},z=l.availableGames||[],A=l.incomingChallenges||[],B=l.sentChallenges||[],R=l.activeMatches||[],Z=l.recentMatches||[],te=(e==null?void 0:e._id)||(e==null?void 0:e.id);b.innerHTML=`
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
              ${z.map(S=>`
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
                    ${R.map(S=>{const ee=te&&S.player1.userId.toString()===te.toString()?S.player2:S.player1,V=te&&S.currentTurnUserId&&S.currentTurnUserId.toString()===te.toString();return`
                        <div class="lounge-active-match-card ${V?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${S.gameType==="chess"?"♟️":S.gameType==="connectfour"?"🔴":"❌"}</span>
                            <div>
                              <div class="match-game-title">${C(S.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${C(ee.name)}</strong> (${C(ee.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${V?"my-turn":"wait"}">
                              ${V?"⚡ Your Turn!":"⏳ Opponent Turn"}
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

            ${Z.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${Z.map(S=>{const ee=te&&S.player1.userId.toString()===te.toString()?S.player2:S.player1,V=te&&S.winnerId&&S.winnerId.toString()===te.toString(),Y=S.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${C(S.gameTitle)}</span>
                          <span class="recent-date">${re(S.completedAt||S.updatedAt)}</span>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${C(ee.name)}</strong></div>
                          <div class="recent-outcome ${V?"win":Y?"draw":"loss"}">
                            ${V?"🏆 VICTORY":Y?"🤝 DRAW":"DEFEAT"}
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
      `,D()}catch(l){b.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${C(l.message)}</p>
        </div>
      `}}}function D(){n.querySelectorAll(".btn-challenge-game").forEach(c=>{c.onclick=()=>{const b=c.dataset.gameId;W(b)}}),n.querySelectorAll(".btn-respond-invite").forEach(c=>{c.onclick=async()=>{const b=c.dataset.inviteId,l=c.dataset.action;await X(b,l),await k()}}),n.querySelectorAll(".btn-resume-match").forEach(c=>{c.onclick=()=>{const b=c.dataset.matchId;Q(b)}}),n.querySelectorAll(".btn-recent-rematch").forEach(c=>{c.onclick=async()=>{const b=c.dataset.matchId;try{c.disabled=!0;const l=await ye(`/bonding/matches/${b}/action`,{action:"rematch"});l.match&&(q("Rematch created! Opening arena ⚔️","success"),Q(l.match._id))}catch(l){q(l.message||"Could not start rematch","error")}finally{c.disabled=!1}}})}function W(c=null,b=null){const l=n.querySelector("#bonding-modals-root"),P=(e==null?void 0:e._id)||(e==null?void 0:e.id),m=new Set(["employee","admin","superadmin"]),z=p.filter(S=>!S.isSelf&&S._id.toString()!==(P==null?void 0:P.toString())&&m.has(S.role));let A=c||"chess",B=b?b.toString():null,R="none";function Z(){const S=z.find(M=>M._id.toString()===B);l.innerHTML=`
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
                  ${z.map(M=>{const ee=B===M._id.toString();return`
                      <div class="eligible-emp-item ${ee?"selected":""}" data-user-id="${M._id}">
                        <div class="emp-item-avatar">${M.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${C(M.name)}</span>
                          <span class="emp-item-role">${C(M.role==="superadmin"?"Superadmin":M.role==="admin"?"Admin":"Employee")} · ${C(M.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${ee?"active":""}">
                          ${ee?"Selected ✓":"Select"}
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
      `,te()}function te(){l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelector("#btn-cancel-challenge-flow").onclick=()=>{l.innerHTML=""},l.querySelectorAll(".game-pill-btn").forEach(ee=>{ee.onclick=()=>{A=ee.dataset.game,Z()}});const S=l.querySelector("#flow-emp-search");S&&(S.oninput=ee=>{const V=ee.target.value.toLowerCase().trim();l.querySelectorAll(".eligible-emp-item").forEach(Y=>{const ae=Y.textContent.toLowerCase();Y.style.display=ae.includes(V)?"flex":"none"})}),l.querySelectorAll(".eligible-emp-item").forEach(ee=>{ee.onclick=()=>{B=ee.dataset.userId,Z()}}),l.querySelectorAll('input[name="timerMode"]').forEach(ee=>{ee.onchange=V=>{R=V.target.value,Z()}});const M=l.querySelector("#btn-submit-challenge-flow");M&&(M.onclick=async()=>{if(!B){q("Please select an employee to challenge","warning");return}try{M.disabled=!0,M.textContent="Sending Challenge...",await ye("/bonding/invitations",{gameType:A,targetUserId:B,matchSettings:{timerMode:R},channelId:(i==null?void 0:i._id)||null}),q("Game challenge delivered! Awaiting acceptance ⚔️","success"),l.innerHTML="",i&&await $e(i._id),r==="lounge_games"&&await k()}catch(ee){q(ee.message||"Failed to send challenge","error"),M.disabled=!1,M.textContent="Send Challenge 🚀"}})}Z()}async function X(c,b){if(!(!c||!b))try{const l=await yt(`/bonding/invitations/${c}/respond`,{action:b});b==="accept"?(q("Challenge accepted! Entering match arena ⚔️","success"),l.match&&Q(l.match._id)):b==="decline"?q("Challenge declined","info"):b==="cancel"&&q("Challenge cancelled","info"),i&&await $e(i._id),r==="lounge_games"&&await k()}catch(l){q(l.message||"Action failed","error")}}async function Q(c){if(!c)return;F=c,_&&clearInterval(_);const b=n.querySelector("#bonding-modals-root");let l=null,P=null,m=[];async function z(){try{return l=await De(`/bonding/matches/${c}`),l}catch(M){return q(M.message||"Could not load match","error"),A(),null}}if(l=await z(),!l)return;function A(){_&&clearInterval(_),F=null,b.innerHTML="",r==="lounge_games"&&k(!0),i&&$e(i._id,!0)}_=setInterval(async()=>{var Y,ae,de,ve;if(!F||F!==c){clearInterval(_);return}const M=(Y=l==null?void 0:l.currentTurnUserId)==null?void 0:Y.toString(),ee=l==null?void 0:l.status,V=await z();V&&(((ae=V.currentTurnUserId)==null?void 0:ae.toString())!==M||V.status!==ee||((de=V.moves)==null?void 0:de.length)!==((ve=l.moves)==null?void 0:ve.length))&&B()},1500);function B(){if(!l)return;const M=(e==null?void 0:e._id)||(e==null?void 0:e.id),ee=M&&l.player1.userId.toString()===M.toString(),V=ee?l.player1:l.player2,Y=ee?l.player2:l.player1,ae=M&&l.currentTurnUserId&&l.currentTurnUserId.toString()===M.toString(),de=l.status!=="active";b.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${l.gameType==="chess"?"♟️":l.gameType==="connectfour"?"🔴":"❌"}</span>
                <div>
                  <h3 class="arena-title">${C(l.gameTitle)}</h3>
                  <div class="arena-players-vs">
                    <span>${C(V.name)} (You · ${V.assignedRole})</span>
                    <span class="vs-pill">VS</span>
                    <span>${C(Y.name)} (${Y.assignedRole})</span>
                  </div>
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${de?"ended":ae?"my-turn":"opp-turn"}">
                ${de?`<span>Match Finished (${C(l.winningReason||l.status)})</span>`:ae?`<span>⚡ YOUR TURN (${V.assignedRole.toUpperCase()})</span>`:`<span>⏳ Waiting for ${C(Y.name)}...</span>`}
              </div>

              <div class="arena-top-actions">
                ${de?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="bonding-modal-close" id="btn-close-arena">&times;</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${l.drawOfferedBy&&l.drawOfferedBy.toString()!==(M==null?void 0:M.toString())&&!de?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${C(Y.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${l.gameType==="chess"?R(ee):""}
              ${l.gameType==="tictactoe"?Z():""}
              ${l.gameType==="connectfour"?te():""}
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
      `,S(ae,ee,V)}function R(M){var be;const ee=((be=l.gameState)==null?void 0:be.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",V=new Vt(ee),Y=M?l.player1.assignedRole==="white":l.player2.assignedRole==="white",ae={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},de=Y?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],ve=Y?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let fe='<div class="chess-board-grid">';for(const we of ve)for(const Me of de){const Ee=`${Me}${we}`,ze=V.get(Ee),Ze=(Me.charCodeAt(0)-97+we)%2!==0,je=P===Ee,Xe=m.includes(Ee),dt=ze?ze.color==="w"?ae[ze.type.toUpperCase()]:ae[ze.type]:"";fe+=`
            <div class="chess-sq ${Ze?"light":"dark"} ${je?"selected":""} ${Xe?"legal-dot":""}" data-square="${Ee}">
              ${dt?`<span class="chess-piece ${ze.color==="w"?"white-piece":"black-piece"}">${dt}</span>`:""}
            </div>
          `}fe+="</div>";const ce=(l.moves||[]).map(we=>{var Me;return`
        <span class="chess-move-token">${we.moveNum}. ${((Me=we.moveData)==null?void 0:Me.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${fe}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${ce||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function Z(){var V;const M=((V=l.gameState)==null?void 0:V.board)||Array(9).fill(null),ee=l.winningCells||[];return`
        <div class="ttt-board-grid">
          ${M.map((Y,ae)=>{const de=ee.includes(ae);return`
              <div class="ttt-cell ${Y?"filled":"empty"} ${de?"win-cell":""}" data-cell-idx="${ae}">
                ${Y==="X"?'<span class="ttt-x">✕</span>':Y==="O"?'<span class="ttt-o">◯</span>':""}
              </div>
            `}).join("")}
        </div>
      `}function te(){var Y;const M=((Y=l.gameState)==null?void 0:Y.grid)||Array(6).fill(null).map(()=>Array(7).fill(null)),ee=(l.winningCells||[]).map(ae=>Array.isArray(ae)?`${ae[0]},${ae[1]}`:"");let V='<div class="c4-board-rack">';V+='<div class="c4-drop-arrows-row">';for(let ae=0;ae<7;ae++)V+=`<button class="c4-drop-col-btn" data-col="${ae}" title="Drop Disc in Column ${ae+1}">⬇</button>`;V+="</div>",V+='<div class="c4-grid-slots">';for(let ae=0;ae<6;ae++)for(let de=0;de<7;de++){const ve=M[ae][de],fe=ee.includes(`${ae},${de}`);V+=`
            <div class="c4-slot ${ve?`disc-${ve}`:"empty"} ${fe?"win-disc":""}" data-col="${de}" data-row="${ae}">
              ${ve?`<div class="c4-disc ${ve}"></div>`:'<div class="c4-hole"></div>'}
            </div>
          `}return V+="</div></div>",V}function S(M,ee,V){var Je;b.querySelector("#btn-close-arena").onclick=A;const Y=b.querySelector("#btn-arena-resign");Y&&(Y.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{Y.disabled=!0,await ye(`/bonding/matches/${c}/action`,{action:"resign"}),await z(),B()}catch(ce){q(ce.message||"Resign failed","error"),Y.disabled=!1}});const ae=b.querySelector("#btn-arena-draw");ae&&(ae.onclick=async()=>{try{await ye(`/bonding/matches/${c}/action`,{action:"offer_draw"}),q("Draw offer sent to opponent","info"),await z(),B()}catch(ce){q(ce.message||"Draw offer failed","error")}});const de=b.querySelector("#btn-confirm-accept-draw");de&&(de.onclick=async()=>{try{await ye(`/bonding/matches/${c}/action`,{action:"accept_draw"}),q("Draw agreed!","info"),await z(),B()}catch(ce){q(ce.message,"error")}});const ve=b.querySelector("#btn-confirm-decline-draw");ve&&(ve.onclick=async()=>{try{await ye(`/bonding/matches/${c}/action`,{action:"decline_draw"}),await z(),B()}catch(ce){q(ce.message,"error")}});const fe=b.querySelector("#btn-arena-rematch-action");if(fe&&(fe.onclick=async()=>{try{fe.disabled=!0,fe.textContent="Creating Rematch...";const ce=await ye(`/bonding/matches/${c}/action`,{action:"rematch"});ce.match&&(q("Rematch created! New match live ⚔️","success"),_&&clearInterval(_),Q(ce.match._id))}catch(ce){q(ce.message||"Rematch failed","error"),fe.disabled=!1,fe.textContent="🔄 Request Rematch"}}),l.gameType==="chess"&&M&&l.status==="active"){const ce=((Je=l.gameState)==null?void 0:Je.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",be=new Vt(ce),we=V.assignedRole==="white"?"w":"b";b.querySelectorAll(".chess-sq").forEach(Me=>{Me.onclick=async()=>{const Ee=Me.dataset.square;if(P){if(P===Ee){P=null,m=[],B();return}if(m.includes(Ee)){const Ze=be.get(P);let je;Ze&&Ze.type==="p"&&(Ee.endsWith("8")||Ee.endsWith("1"))&&(je=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const Xe={from:P,to:Ee,promotion:je?je.toLowerCase():void 0};P=null,m=[],l=await ye(`/bonding/matches/${c}/move`,{move:Xe}),B()}catch(Xe){q(Xe.message||"Illegal chess move","error"),P=null,m=[],B()}return}}const ze=be.get(Ee);ze&&ze.color===we?(P=Ee,m=be.moves({square:Ee,verbose:!0}).map(je=>je.to),B()):(P=null,m=[],B())}})}if(l.gameType==="tictactoe"&&M&&l.status==="active"&&b.querySelectorAll(".ttt-cell.empty").forEach(ce=>{ce.onclick=async()=>{const be=ce.dataset.cellIdx;try{ce.style.opacity="0.5",l=await ye(`/bonding/matches/${c}/move`,{cellIndex:Number(be)}),B()}catch(we){q(we.message||"Invalid move","error")}}}),l.gameType==="connectfour"&&M&&l.status==="active"){const ce=async be=>{try{l=await ye(`/bonding/matches/${c}/move`,{col:Number(be)}),B()}catch(we){q(we.message||"Column full or invalid","error")}};b.querySelectorAll(".c4-drop-col-btn").forEach(be=>{be.onclick=()=>ce(be.dataset.col)}),b.querySelectorAll(".c4-slot").forEach(be=>{be.onclick=()=>ce(be.dataset.col)})}}B()}function I(){if(!i||i.type==="direct")return;const c=n.querySelector("#bonding-modals-root"),b=R=>R==="employee"||R==="admin"||R==="superadmin",l=i.members||[],P=new Set(l.map(R=>{var Z;return(Z=R.userId)==null?void 0:Z.toString()})),m=p.filter(R=>b(R.role)&&!P.has(R._id.toString()));c.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${C(i.name)}</h3>
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
                ${l.map(R=>{const Z=(e==null?void 0:e._id)||(e==null?void 0:e.id),te=Z&&R.userId&&R.userId.toString()===Z.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(R.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${C(R.name)} ${te?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${C(R.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${R.userId}" data-name="${C(R.name)}">
                          ${te?"Leave Group":"Remove"}
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""};const z=c.querySelector("#btn-modal-delete-group");z&&(z.onclick=()=>{c.innerHTML="",N()});const A=c.querySelector("#btn-submit-add-member");A&&(A.onclick=async()=>{const Z=c.querySelector("#sel-add-colleague").value;if(!Z){q("Please select a colleague to add","warning");return}try{A.disabled=!0,A.textContent="Adding...";const te=await yt(`/bonding/channels/${i._id}/members`,{action:"add",userIds:[Z]});q("Colleague added to group! 🎉","success"),i=te.channel,c.innerHTML="",await $e(i._id),_e()}catch(te){q(te.message||"Failed to add member","error"),A.disabled=!1,A.textContent="Add to Group"}}),c.querySelectorAll(".btn-remove-member").forEach(R=>{R.onclick=async()=>{const Z=R.dataset.userId,te=R.dataset.name;if(confirm(`Are you sure you want to remove ${te} from this group?`))try{R.disabled=!0;const S=await yt(`/bonding/channels/${i._id}/members`,{action:"remove",userId:Z});q(`${te} removed from group`,"info"),i=S.channel,c.innerHTML="",await $e(i._id),_e()}catch(S){q(S.message||"Failed to remove member","error"),R.disabled=!1}}})}async function N(){if(!i||i.type==="direct")return;const c=i.name;if(confirm(`Are you sure you want to delete the group "${c}"?

All messages in this lounge will be deleted.`))try{await Yt(`/bonding/channels/${i._id}`),q(`Group "${c}" deleted successfully`,"success"),s=await De("/bonding/channels").catch(()=>[]),i=s.find(l=>l.type==="group")||s[0]||null,Ne(),_e(),i&&await $e(i._id)}catch(l){q(l.message||"Failed to delete group","error")}}function L(){const c=n.querySelector("#bonding-modals-root"),b=m=>m==="employee"||m==="admin"||m==="superadmin",l=p.filter(m=>!m.isSelf&&b(m.role));c.innerHTML=`
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelectorAll(".bonding-user-pick-item").forEach(m=>{m.onclick=async()=>{const z=m.dataset.userId;try{const A=await ye("/bonding/channels",{type:"direct",targetUserId:z});c.innerHTML="",s=await De("/bonding/channels"),i=s.find(B=>B._id===A._id)||A,Ne(),_e(),await $e(i._id)}catch(A){q(A.message||"Failed to open personal chat","error")}}})}function v(){const c=n.querySelector("#bonding-modals-root"),b=A=>A==="employee"||A==="admin"||A==="superadmin",l=p.filter(A=>!A.isSelf&&b(A.role));c.innerHTML=`
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelector("#btn-cancel-create-grp").onclick=()=>{c.innerHTML=""};let P="👥";const m=c.querySelectorAll(".avatar-opt");m.forEach(A=>{A.onclick=()=>{m.forEach(B=>B.classList.remove("active")),A.classList.add("active"),P=A.textContent.trim()}});const z=c.querySelector("#btn-confirm-create-grp");z.onclick=async()=>{const A=c.querySelector("#new-group-name"),B=c.querySelector("#new-group-desc"),R=A.value.trim();if(!R){q("Please enter a group name","warning"),A.focus();return}const Z=c.querySelectorAll(".new-group-member-chk:checked"),te=Array.from(Z).map(S=>S.value);try{z.disabled=!0,z.textContent="Creating...";const S=await ye("/bonding/channels",{type:"group",name:R,description:B.value.trim(),avatar:P,memberIds:te});q(`Group "${R}" created! 🎉`,"success"),c.innerHTML="",s=await De("/bonding/channels"),i=s.find(M=>M._id===S._id)||S,Ne(),_e(),await $e(i._id)}catch(S){q(S.message||"Failed to create group","error"),z.disabled=!1,z.textContent="Create Group 🎉"}}}function ne(c,b){const l=document.querySelector(".bonding-emoji-popup");l&&l.remove();const P=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],m=document.createElement("div");m.className="bonding-emoji-popup",m.innerHTML=P.map(B=>`<button class="emoji-opt-btn" data-e="${B}">${B}</button>`).join("");const z=c.getBoundingClientRect();m.style.top=`${z.bottom+window.scrollY+6}px`,m.style.left=`${z.left+window.scrollX}px`,document.body.appendChild(m),m.querySelectorAll(".emoji-opt-btn").forEach(B=>{B.onclick=R=>{R.stopPropagation(),b(B.dataset.e),m.remove()}});const A=B=>{m.contains(B.target)||(m.remove(),document.removeEventListener("click",A))};setTimeout(()=>document.addEventListener("click",A),10)}function re(c){if(!c)return"";try{return new Date(c).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Ka(){const n=document.getElementById("ci360-bonding-styles");n&&n.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
    .game-arena-modal {
      width: 640px;
      max-width: 95vw;
      padding: 20px;
    }

    .arena-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
      flex-wrap: wrap;
    }

    [data-theme="dark"] .arena-header {
      border-color: #1f2937;
    }

    .arena-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .arena-icon {
      font-size: 32px;
    }

    .arena-title {
      font-size: 18px;
      font-weight: 800;
      margin: 0;
    }

    .arena-players-vs {
      font-size: 12.5px;
      color: var(--text-3, #64748b);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .vs-pill {
      font-weight: 800;
      color: #6366f1;
    }

    .arena-turn-banner {
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 800;
    }

    .arena-turn-banner.my-turn {
      background: #10b981;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
      animation: pulseGlow 1.5s infinite;
    }

    @keyframes pulseGlow {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }

    .arena-turn-banner.opp-turn {
      background: var(--bg-muted, #f1f5f9);
      color: var(--text-2, #64748b);
    }

    [data-theme="dark"] .arena-turn-banner.opp-turn {
      background: #1e293b;
      color: #94a3b8;
    }

    .arena-top-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-arena-action {
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      background: transparent;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-arena-action.danger {
      color: #ef4444;
      border-color: #ef4444;
    }

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

    .arena-board-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
    }

    /* ── CHESS DUEL BOARD ── */
    .chess-arena-layout {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      flex-wrap: wrap;
      justify-content: center;
    }

    .chess-board-grid {
      display: grid;
      grid-template-columns: repeat(8, 44px);
      grid-template-rows: repeat(8, 44px);
      border: 3px solid #334155;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.18);
    }

    @media (max-width: 480px) {
      .chess-board-grid {
        grid-template-columns: repeat(8, 36px);
        grid-template-rows: repeat(8, 36px);
      }
    }

    .chess-sq {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      position: relative;
    }

    .chess-sq.light {
      background: #f0d9b5;
    }

    .chess-sq.dark {
      background: #b58863;
    }

    .chess-sq.selected {
      background: #7dd3fc !important;
    }

    .chess-sq.legal-dot::after {
      content: '';
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.7);
      position: absolute;
    }

    .chess-piece {
      font-size: 32px;
      line-height: 1;
      text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    }

    .chess-piece.white-piece {
      color: #ffffff;
      filter: drop-shadow(0 1px 2px #000000);
    }

    .chess-piece.black-piece {
      color: #1e293b;
    }

    .chess-sidebar-notation {
      width: 160px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 10px;
      padding: 10px;
      height: 350px;
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

    /* ── TIC-TAC-TOE BOARD ── */
    .ttt-board-grid {
      display: grid;
      grid-template-columns: repeat(3, 90px);
      grid-template-rows: repeat(3, 90px);
      gap: 8px;
    }

    .ttt-cell {
      background: var(--bg-muted, #f8fafc);
      border: 2px solid var(--border-sm, #cbd5e1);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 44px;
      font-weight: 900;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .ttt-cell {
      background: #1e293b;
      border-color: #334155;
    }

    .ttt-cell.empty:hover {
      background: rgba(99, 102, 241, 0.15);
      border-color: #818cf8;
      transform: scale(1.03);
    }

    .ttt-cell.win-cell {
      background: rgba(16, 185, 129, 0.25) !important;
      border-color: #10b981 !important;
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.4);
    }

    .ttt-x {
      color: #6366f1;
      text-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
    }

    .ttt-o {
      color: #f59e0b;
      text-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
    }

    /* ── CONNECT FOUR BOARD ── */
    .c4-board-rack {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .c4-drop-arrows-row {
      display: grid;
      grid-template-columns: repeat(7, 44px);
      gap: 6px;
    }

    .c4-drop-col-btn {
      width: 44px;
      height: 32px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      background: rgba(99, 102, 241, 0.12);
      color: #4f46e5;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .c4-drop-col-btn:hover {
      background: #6366f1;
      color: #ffffff;
      transform: translateY(-2px);
    }

    .c4-grid-slots {
      display: grid;
      grid-template-columns: repeat(7, 44px);
      grid-template-rows: repeat(6, 44px);
      gap: 6px;
      background: #2563eb;
      padding: 12px;
      border-radius: 18px;
      box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
    }

    .c4-slot {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .c4-disc {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      box-shadow: inset 0 -3px 4px rgba(0,0,0,0.3);
      animation: dropDisc 0.25s ease-out;
    }

    @keyframes dropDisc {
      0% { transform: translateY(-50px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }

    .c4-disc.red {
      background: radial-gradient(circle at 35% 35%, #ef4444 0%, #b91c1c 100%);
    }

    .c4-disc.yellow {
      background: radial-gradient(circle at 35% 35%, #facc15 0%, #ca8a04 100%);
    }

    .c4-slot.win-disc .c4-disc {
      box-shadow: 0 0 18px #ffffff, 0 0 25px #10b981;
      animation: winGlow 1s infinite alternate;
    }

    @keyframes winGlow {
      from { transform: scale(1); }
      to { transform: scale(1.08); }
    }

    .c4-hole {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--bg-card, #ffffff);
    }

    [data-theme="dark"] .c4-hole {
      background: #111827;
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
