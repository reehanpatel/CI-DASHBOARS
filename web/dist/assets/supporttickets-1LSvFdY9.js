var wa=Object.defineProperty;var $a=(i,t,e)=>t in i?wa(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Ie=(i,t,e)=>$a(i,typeof t!="symbol"?t+"":t,e);import{c as Ue,h as S,e as v,n as Je,j as Qe,o as Ft,k as Kt,g as je,p as Ht,t as ta,u as ga}from"./api-B2T0Z1h0.js";const ba={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function Sa(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},ba,JSON.parse(i))}catch{}return Object.assign({},ba)}function Ca(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function at(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),o=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${o}`}function Gt(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const o=e.getFullYear(),d=String(e.getMonth()+1).padStart(2,"0"),l=String(e.getDate()).padStart(2,"0");return`${o}-${d}-${l}`}function $t(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function bt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function fa(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function aa(i,t=1){const e=new Date(i+"T00:00:00"),o=e.getDay(),d=(o<t?7:0)+o-t,l=new Date(e);l.setDate(e.getDate()-d);const f=[];for(let n=0;n<7;n++){const _=new Date(l);_.setDate(l.getDate()+n);const P=_.getFullYear(),x=String(_.getMonth()+1).padStart(2,"0"),A=String(_.getDate()).padStart(2,"0");f.push(`${P}-${x}-${A}`)}return f}function _a(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,o=t.createOscillator(),d=t.createGain();o.type="sine",o.frequency.setValueAtTime(523.25,e),o.frequency.exponentialRampToValueAtTime(783.99,e+.15),d.gain.setValueAtTime(.2,e),d.gain.exponentialRampToValueAtTime(.001,e+.35),o.connect(d),d.connect(t.destination),o.start(e),o.stop(e+.35)}catch{}}function ei(i,t={}){const{userRole:e="employee",currentUser:o=null,onNavigate:d=null}=t,l=e==="superadmin"||e==="admin";let f=Sa(),n={selectedDate:at(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};ja(),_();async function _(){n.loading=!0,P();try{const c=[Ue("/tasks")];l&&c.push(Ue("/personnel").catch(()=>[]));const[j,I]=await Promise.all(c);n.tasks=Array.isArray(j)?j:[],I&&(n.personnelList=Array.isArray(I)?I:[])}catch(c){S("Failed to load planner tasks: "+c.message,!0)}finally{n.loading=!1,Q()}}function P(){i.innerHTML=`
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
    `}function x(c){return n.tasks.filter(j=>{var a;if(j.isDeleted===!0)return!1;if(l&&n.selectedPersonnelId!=="all"){const s=((a=j.personnelId)==null?void 0:a._id)||j.personnelId;if(String(s)!==String(n.selectedPersonnelId))return!1}const I=j.dateStr||(j.dueDate?new Date(j.dueDate).toISOString().slice(0,10):"");return I?I===c:c===at()})}function A(c,j){if(c.status==="Completed")return!1;const I=c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):"");return I?I<j:!1}function M(c,j){const I=c.length,a=c.filter(W=>W.status==="Completed").length,s=c.filter(W=>W.status==="In Progress").length,C=c.filter(W=>W.status==="Pending"||W.status==="Todo").length,D=c.filter(W=>A(W,j)).length,V=I>0?Math.round(a/I*100):0;return{total:I,completed:a,inProgress:s,pending:C,overdue:D,percent:V}}function Q(){const c=at(),j=n.selectedDate===c,I=x(n.selectedDate),a=M(I,c);i.innerHTML=`
      <div class="ci360-planner-wrap ${f.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${bt(n.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${v(f.displayName||"Daily Planner")}</h1>
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
                    ${v(s.name)} (${v(s.department||s.role||"Team")})
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
    `,De(),dt()}function X(c,j){return n.viewMode==="weekly"?lt():n.viewMode==="report"?rt():Ce(c,j)}function Ce(c,j){const I=at();let a=c;if(n.filterStatus==="pending"?a=a.filter(s=>s.status==="Pending"||s.status==="Todo"):n.filterStatus==="in_progress"?a=a.filter(s=>s.status==="In Progress"):n.filterStatus==="completed"?a=a.filter(s=>s.status==="Completed"):n.filterStatus==="overdue"&&(a=a.filter(s=>A(s,I))),n.searchQuery){const s=n.searchQuery.toLowerCase();a=a.filter(C=>(C.title||"").toLowerCase().includes(s)||(C.description||"").toLowerCase().includes(s)||(C.category||"").toLowerCase().includes(s))}return a.sort((s,C)=>{if(s.status==="Completed"&&C.status!=="Completed")return 1;if(s.status!=="Completed"&&C.status==="Completed")return-1;const D={Urgent:0,High:1,Medium:2,Low:3};return(D[s.priority]||2)-(D[C.priority]||2)}),`
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
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${v(n.searchQuery)}">
              ${n.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card / Past Date Locked Banner -->
        ${n.selectedDate<I?`
          <div class="ci360-past-date-banner" style="display:flex;align-items:center;gap:10px;padding:12px 18px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.22);border-radius:10px;font-size:12.5px;color:#f87171;margin-bottom:16px;box-sizing:border-box;">
            <span style="font-size:16px;">🔒</span>
            <span><strong>Date Passed:</strong> Tasks cannot be added or edited for <strong>${$t(n.selectedDate)}</strong> because this date has already passed.</span>
          </div>
        `:`
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
        `}

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
    `}function ze(c,j){var W,z,G,R;const I=c.status==="Completed",a=A(c,j),C=(c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):j))<j,D=`pri-${(c.priority||"medium").toLowerCase()}`,V=`status-${(c.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
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
            <span class="ci360-task-title">${v(c.title)}</span>
          </div>

          ${c.description?`
            <div class="ci360-task-desc">${v(c.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${D}">
              <span class="badge-dot"></span>
              ${v(c.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${V}">
              ${v(c.status||"Pending")}
            </span>

            <!-- Category -->
            ${c.category?`
              <span class="ci360-badge category-badge">
                #${v(c.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${c.startTime||c.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${c.startTime?v(c.startTime):""}
                   ${c.startTime&&c.dueTime?"–":""}
                   ${c.dueTime?v(c.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${a?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${l&&((W=c.personnelId)!=null&&W.name||(z=c.userId)!=null&&z.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${v(((G=c.personnelId)==null?void 0:G.name)||((R=c.userId)==null?void 0:R.name))}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          ${C?`
            <span class="task-action-btn" title="Locked: Tasks cannot be edited after the date has passed" style="opacity:0.45;cursor:not-allowed;display:flex;align-items:center;justify-content:center;font-size:13px;">🔒</span>
          `:`
            <button type="button" class="task-action-btn edit" data-action="edit" data-id="${c._id}" title="Edit task">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button type="button" class="task-action-btn delete" data-action="delete" data-id="${c._id}" title="Delete task">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          `}
        </div>

      </div>
    `}function lt(){const c=aa(n.selectedDate,f.weekStartsOn),j=bt(c[0]),I=bt(c[6]),a=at();return`
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
          ${c.map(s=>{const C=s===a,D=s===n.selectedDate,V=x(s),W=M(V,a);return`
              <div class="ci360-day-column ${C?"is-today":""} ${D?"is-selected":""}" data-date="${s}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${s}">
                  <div class="day-name">${fa(s)}</div>
                  <div class="day-number">${new Date(s+"T00:00:00").getDate()}</div>
                  ${C?'<span class="today-pill">Today</span>':""}
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
                  `:V.map(z=>`
                    <div class="ci360-mini-task-card ${z.status==="Completed"?"done":""}" data-id="${z._id}">
                      <button type="button" class="mini-check ${z.status==="Completed"?"checked":""}" data-action="toggle" data-id="${z._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${z._id}">
                        <div class="mini-title">${v(z.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(z.priority||"medium").toLowerCase()}">${z.priority||"Med"}</span>
                          ${z.dueTime?`<span class="mini-time">${v(z.dueTime)}</span>`:""}
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
    `}function rt(){const c=aa(n.selectedDate,f.weekStartsOn),j=$t(c[0]),I=$t(c[6]),a=at(),s=n.tasks.filter(G=>{if(G.isDeleted===!0)return!1;const R=G.dateStr||(G.dueDate?new Date(G.dueDate).toISOString().slice(0,10):"");return c.includes(R)}),C=s.length,D=s.filter(G=>G.status==="Completed").length,V=s.filter(G=>G.status==="In Progress").length,W=C>0?Math.round(D/C*100):0,z={Urgent:0,High:0,Medium:0,Low:0};return s.forEach(G=>{const R=G.priority||"Medium";z[R]!==void 0&&z[R]++}),`
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
            <span class="value" style="font-size:28px">${C}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${D}</span>
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
                ${c.map(G=>{const R=x(G),y=M(R,a);return`
                    <tr>
                      <td><strong>${fa(G)}</strong></td>
                      <td>${bt(G)}</td>
                      <td>${y.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${y.completed}</td>
                      <td>${y.pending+y.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${y.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${y.percent}%</span>
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
    `}function De(){const c=document.getElementById("btnViewDaily"),j=document.getElementById("btnViewWeekly"),I=document.getElementById("btnViewReport");c&&(c.onclick=()=>{n.viewMode="daily",Q()}),j&&(j.onclick=()=>{n.viewMode="weekly",Q()}),I&&(I.onclick=()=>{n.viewMode="report",Q()});const a=document.getElementById("btnPrevDay"),s=document.getElementById("btnNextDay"),C=document.getElementById("btnJumpToday"),D=document.getElementById("hiddenDateInput"),V=document.getElementById("datePickerBadge");a&&(a.onclick=()=>{n.selectedDate=Gt(n.selectedDate,-1),Q()}),s&&(s.onclick=()=>{n.selectedDate=Gt(n.selectedDate,1),Q()}),C&&(C.onclick=()=>{n.selectedDate=at(),Q()}),V&&D&&(V.onclick=()=>{try{typeof D.showPicker=="function"?D.showPicker():D.focus()}catch{D.focus()}},D.onchange=J=>{J.target.value&&(n.selectedDate=J.target.value,Q())});const W=document.getElementById("admTeamSelect");W&&(W.onchange=J=>{n.selectedPersonnelId=J.target.value,Q()});const z=document.getElementById("btnOpenAddTaskModal");z&&(z.onclick=()=>qe());const G=document.getElementById("btnPlannerActionsMenu"),R=document.getElementById("plannerActionsDropdown");G&&R&&(G.onclick=J=>{J.stopPropagation(),R.classList.toggle("hidden")},document.addEventListener("click",J=>{!R.contains(J.target)&&J.target!==G&&R.classList.add("hidden")}));const y=document.getElementById("btnActionImport");y&&(y.onclick=()=>{R==null||R.classList.add("hidden"),it()});const K=document.getElementById("btnActionExportPng");K&&(K.onclick=()=>{R==null||R.classList.add("hidden"),nt()});const ee=document.getElementById("btnActionExportPdf");ee&&(ee.onclick=()=>{R==null||R.classList.add("hidden"),fe()});const de=document.getElementById("btnActionBackup");de&&(de.onclick=()=>{R==null||R.classList.add("hidden"),tt()});const oe=document.getElementById("btnActionSettings");oe&&(oe.onclick=()=>{R==null||R.classList.add("hidden"),ye()})}function dt(c){if(n.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(z=>{z.onclick=()=>{n.filterStatus=z.dataset.f,Q()}});const j=document.getElementById("plannerTaskSearchInp");j&&(j.oninput=z=>{n.searchQuery=z.target.value,Q()});const I=document.getElementById("btnClearSearch");I&&(I.onclick=()=>{n.searchQuery="",Q()});const a=document.getElementById("quickAddTitleInp"),s=document.getElementById("quickAddPriority"),C=document.getElementById("quickAddCategory"),D=document.getElementById("btnQuickAddSubmit"),V=async()=>{const z=((a==null?void 0:a.value)||"").trim();if(!z){S("Please enter a task title",!0),a==null||a.focus();return}try{const G={title:z,dateStr:n.selectedDate,priority:(s==null?void 0:s.value)||f.defaultPriority,category:(C==null?void 0:C.value)||"General",status:"Pending"};l&&n.selectedPersonnelId!=="all"&&(G.personnelId=n.selectedPersonnelId);const R=await je("/tasks",G);n.tasks.unshift(R),S("Task added to today's focus! ✨"),a&&(a.value="",a.focus()),Q()}catch(G){S(G.message,!0)}};D&&(D.onclick=V),a&&(a.onkeydown=z=>{z.key==="Enter"&&V()});const W=document.getElementById("btnEmptyStateImport");W&&(W.onclick=()=>it())}if(n.viewMode==="weekly"){const j=document.getElementById("btnPrevWeek"),I=document.getElementById("btnNextWeek"),a=document.getElementById("btnThisWeek");j&&(j.onclick=()=>{n.selectedDate=Gt(n.selectedDate,-7),Q()}),I&&(I.onclick=()=>{n.selectedDate=Gt(n.selectedDate,7),Q()}),a&&(a.onclick=()=>{n.selectedDate=at(),Q()}),document.querySelectorAll(".day-col-header").forEach(s=>{s.onclick=()=>{n.selectedDate=s.dataset.date,n.viewMode="daily",Q()}}),document.querySelectorAll('[data-action="add-day"]').forEach(s=>{s.onclick=()=>{qe(null,s.dataset.date)}})}if(n.viewMode==="report"){const j=document.getElementById("btnDownloadWeeklyPdf");j&&(j.onclick=fe)}i.querySelectorAll('[data-action="toggle"]').forEach(j=>{j.onclick=async I=>{I.stopPropagation();const a=j.dataset.id;await Ke(a)}}),i.querySelectorAll('[data-action="edit"]').forEach(j=>{j.onclick=I=>{I.stopPropagation();const a=j.dataset.id,s=n.tasks.find(C=>C._id===a);s&&qe(s)}}),i.querySelectorAll('[data-action="delete"]').forEach(j=>{j.onclick=async I=>{I.stopPropagation();const a=j.dataset.id;await vt(a)}})}async function Ke(c){const j=n.tasks.find(a=>a._id===c);if(!j)return;const I=j.status!=="Completed";try{const a=await Je(`/tasks/${c}/toggle`,{}),s=n.tasks.findIndex(C=>C._id===c);s!==-1&&(n.tasks[s]=a),I?(f.soundEnabled&&_a(),S("Task marked as completed! 🎉")):S("Task reopened as pending."),Q()}catch(a){S(a.message,!0)}}async function vt(c){const j=n.tasks.find(I=>I._id===c);if(j&&confirm(`Are you sure you want to remove "${j.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Qe(`/tasks/${c}`),n.tasks=n.tasks.filter(I=>I._id!==c),S("Task removed from planner (safely stored in database archive)"),Q()}catch(I){S(I.message,!0)}}function qe(c=null,j=null){const I=!!c,a=c?c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):n.selectedDate):j||n.selectedDate,s=at();if(a<s){S("Tasks cannot be added or edited after the date is gone.",!0);return}const C=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${I?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${v((c==null?void 0:c.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${v((c==null?void 0:c.description)||"")}</textarea>
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
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${v((c==null?void 0:c.category)||"General")}">
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
                ${n.personnelList.map(R=>{var K;const y=((K=c==null?void 0:c.personnelId)==null?void 0:K._id)===R._id||(c==null?void 0:c.personnelId)===R._id;return`<option value="${R._id}" ${y?"selected":""}>${v(R.name)} (${v(R.department||R.role||"Member")})</option>`}).join("")}
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
    `,D=Ft(C),V=D.querySelector("#taskForm"),W=D.querySelector("#btnModalClose"),z=D.querySelector("#btnCancelModal"),G=()=>D.remove();W&&(W.onclick=G),z&&(z.onclick=G),V.onsubmit=async R=>{var $;R.preventDefault();const y=D.querySelector("#taskTitle").value.trim(),K=D.querySelector("#taskDesc").value.trim(),ee=D.querySelector("#taskDate").value,de=D.querySelector("#taskStartTime").value.trim(),oe=D.querySelector("#taskDueTime").value.trim(),J=D.querySelector("#taskPriority").value,g=D.querySelector("#taskStatus").value,b=D.querySelector("#taskCategory").value.trim()||"General";if(!y){S("Task title is required",!0);return}const r={title:y,description:K,dateStr:ee,startTime:de,dueTime:oe,priority:J,status:g,category:b};if(l){const E=($=D.querySelector("#taskAssignee"))==null?void 0:$.value;E==="all"?(r.assignAll=!0,r.personnelId="all"):E&&(r.personnelId=E)}const w=D.querySelector("#btnSaveTask");w.disabled=!0,w.textContent="Saving...";try{if(I){const E=await Kt(`/tasks/${c._id}`,r),T=n.tasks.findIndex(O=>O._id===c._id);T!==-1&&(n.tasks[T]=E),S("Task updated successfully! ✍️")}else{const E=await je("/tasks",r);Array.isArray(E.tasks)?E.tasks.forEach(T=>n.tasks.unshift(T)):n.tasks.unshift(E),S("Task created successfully! ✨")}G(),Q()}catch(E){S(E.message,!0),w.disabled=!1,w.textContent=I?"Save Changes":"Create Task"}}}function it(){let c=[];const j=`
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
    `,I=Ft(j),a=()=>I.remove();I.querySelector("#btnImportClose").onclick=a,I.querySelector("#btnCancelImport").onclick=a;const s=I.querySelector("#importTextarea"),C=I.querySelector("#importFileInput"),D=I.querySelector("#importDropzone"),V=I.querySelector("#previewListArea"),W=I.querySelector("#previewCountLabel"),z=I.querySelector("#btnConfirmImport"),G=I.querySelector("#importFileInfo");function R(K){if(!K)return[];const ee=K.split(/\r?\n/),de=[];for(let oe of ee)oe=oe.trim(),oe&&(oe=oe.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),oe=oe.replace(/^[-*•]\s+/,""),oe=oe.replace(/^\d+[\.\)]\s+/,""),oe=oe.trim(),oe&&de.push(oe));return de}function y(){const K=s.value,ee=R(K),de=I.querySelector("#importTargetDate").value,oe=x(de),J=new Set(oe.map(g=>(g.title||"").trim().toLowerCase()));c=[];for(const g of ee){const b=J.has(g.toLowerCase());c.push({title:g,isDuplicate:b})}if(W.textContent=`Preview (${c.length} ${c.length===1?"task":"tasks"} found)`,z.disabled=c.length===0,z.textContent=`Import ${c.length} ${c.length===1?"Task":"Tasks"}`,c.length===0){V.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}V.innerHTML=c.map((g,b)=>`
        <div class="preview-item ${g.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${b+1}.</span>
          <span class="preview-title">${v(g.title)}</span>
          ${g.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}s.oninput=y,D.onclick=()=>C.click(),C.onchange=K=>{const ee=K.target.files[0];if(!ee)return;G.textContent=`File selected: ${ee.name} (${Math.round(ee.size/1024)} KB)`;const de=new FileReader;de.onload=oe=>{s.value=oe.target.result,y()},de.readAsText(ee)},D.ondragover=K=>{K.preventDefault(),D.classList.add("dragover")},D.ondragleave=()=>D.classList.remove("dragover"),D.ondrop=K=>{K.preventDefault(),D.classList.remove("dragover");const ee=K.dataTransfer.files[0];if(ee&&(ee.type==="text/plain"||ee.name.endsWith(".txt"))){G.textContent=`File dropped: ${ee.name}`;const de=new FileReader;de.onload=oe=>{s.value=oe.target.result,y()},de.readAsText(ee)}else S("Please drop a valid .txt plain-text file",!0)},z.onclick=async()=>{if(c.length===0)return;z.disabled=!0,z.textContent="Importing...";const K=I.querySelector("#importTargetDate").value,ee=I.querySelector("#importPriority").value,de=I.querySelector("#importCategory").value.trim()||"General",oe={date:K,tasks:c.map(J=>({title:J.title,priority:ee,category:de,status:"Pending"}))};l&&n.selectedPersonnelId!=="all"&&(oe.personnelId=n.selectedPersonnelId);try{const J=await je("/tasks/bulk-import",oe);Array.isArray(J.tasks)&&J.tasks.forEach(g=>n.tasks.unshift(g)),S(`Imported ${J.importedCount} tasks successfully! (${J.skippedCount} skipped duplicates)`),a(),n.selectedDate=K,Q()}catch(J){S(J.message,!0),z.disabled=!1,z.textContent="Retry Import"}}}async function nt(){const c=x(n.selectedDate),j=M(c,at()),I=$t(n.selectedDate),a=2,s=800,C=160,D=90,V=65,W=70,z=Math.max(120,c.length*V),G=C+D+z+W,R=document.createElement("canvas");R.width=s*a,R.height=G*a;const y=R.getContext("2d");y.scale(a,a);const K=document.documentElement.getAttribute("data-theme")==="dark",ee=K?"#0F172A":"#F8FAFC",de=K?"#1E293B":"#FFFFFF",oe=K?"#334155":"#E2E8F0",J=K?"#F8FAFC":"#0F172A",g=K?"#94A3B8":"#475569",b="#4F46E5",r="#10B981",w="#F59E0B";y.fillStyle=ee,y.fillRect(0,0,s,G),y.fillStyle=de,Re(y,24,20,s-48,C-30,16),y.fill(),y.strokeStyle=oe,y.lineWidth=1,y.stroke(),y.fillStyle=b,y.font="bold 12px Inter, sans-serif",y.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),y.fillStyle=J,y.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',y.fillText(I,44,86),y.fillStyle=g,y.font="13px Inter, sans-serif",y.fillText(`Planned focus list · ${j.completed} of ${j.total} tasks completed (${j.percent}%)`,44,114);const $=C+6;y.fillStyle=de,Re(y,24,$,s-48,D-16,12),y.fill(),y.stroke();const E=[{label:"TOTAL TASKS",val:String(j.total),color:J},{label:"COMPLETED",val:String(j.completed),color:r},{label:"IN PROGRESS",val:String(j.inProgress),color:w},{label:"PENDING",val:String(j.pending),color:g},{label:"PROGRESS",val:`${j.percent}%`,color:b}],T=(s-48)/E.length;E.forEach((B,q)=>{const se=24+q*T+20;y.fillStyle=B.color,y.font="bold 20px Inter, sans-serif",y.fillText(B.val,se,$+36),y.fillStyle=g,y.font="10px Inter, sans-serif",y.fillText(B.label,se,$+54)});const O=$+D;y.fillStyle=de,Re(y,24,O,s-48,z+10,16),y.fill(),y.stroke(),c.length===0?(y.fillStyle=g,y.font="14px Inter, sans-serif",y.textAlign="center",y.fillText("No scheduled tasks recorded for this date.",s/2,O+60),y.textAlign="left"):c.forEach((B,q)=>{const se=O+16+q*V,te=B.status==="Completed";y.beginPath(),y.arc(48,se+14,10,0,Math.PI*2),te?(y.fillStyle=r,y.fill(),y.strokeStyle="#FFFFFF",y.lineWidth=2,y.beginPath(),y.moveTo(44,se+14),y.lineTo(47,se+17),y.lineTo(52,se+11),y.stroke()):(y.strokeStyle=oe,y.lineWidth=2,y.stroke()),y.fillStyle=te?g:J,y.font=`${te?"normal":"500"} 14px Inter, sans-serif`;const pe=B.title.length>55?B.title.slice(0,52)+"...":B.title;if(y.fillText(pe,70,se+18),te){const he=y.measureText(pe);y.strokeStyle=g,y.lineWidth=1.2,y.beginPath(),y.moveTo(70,se+14),y.lineTo(70+he.width,se+14),y.stroke()}const Z=B.priority||"Medium";let H="#E2E8F0",Y="#334155";Z==="Urgent"?(H="#FEE2E2",Y="#DC2626"):Z==="High"?(H="#FEF3C7",Y="#D97706"):Z==="Low"&&(H="#ECFDF5",Y="#059669"),y.fillStyle=H,Re(y,s-150,se+4,60,20,10),y.fill(),y.fillStyle=Y,y.font="bold 10px Inter, sans-serif",y.fillText(Z,s-138,se+18);const ne=B.dueTime?`🕒 ${B.dueTime}`:B.category||"General";y.fillStyle=g,y.font="11px Inter, sans-serif",y.fillText(ne,70,se+34),q<c.length-1&&(y.strokeStyle=oe,y.lineWidth=.6,y.beginPath(),y.moveTo(40,se+48),y.lineTo(s-40,se+48),y.stroke())});const u=G-35;y.fillStyle=g,y.font="11px Inter, sans-serif",y.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,u);try{const B=R.toDataURL("image/png"),q=document.createElement("a");q.href=B,q.download=`ci360-daily-planner-${n.selectedDate}.png`,document.body.appendChild(q),q.click(),q.remove(),S("Daily Planner image exported! 🖼️")}catch(B){S("Failed to export image: "+B.message,!0)}}function Re(c,j,I,a,s,C){c.beginPath(),c.moveTo(j+C,I),c.lineTo(j+a-C,I),c.quadraticCurveTo(j+a,I,j+a,I+C),c.lineTo(j+a,I+s-C),c.quadraticCurveTo(j+a,I+s,j+a-C,I+s),c.lineTo(j+C,I+s),c.quadraticCurveTo(j,I+s,j,I+s-C),c.lineTo(j,I+C),c.quadraticCurveTo(j,I,j+C,I),c.closePath()}function fe(){const c=aa(n.selectedDate,f.weekStartsOn),j=$t(c[0]),I=$t(c[6]);at();const a=n.tasks.filter(z=>{if(z.isDeleted===!0)return!1;const G=z.dateStr||(z.dueDate?new Date(z.dueDate).toISOString().slice(0,10):"");return c.includes(G)}),s=a.length,C=a.filter(z=>z.status==="Completed").length,D=s>0?Math.round(C/s*100):0,V=window.open("","_blank");if(!V){S("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const W=`
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
            <div class="kpi-num" style="color:#10b981">${C}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${s-C}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${D}%</div>
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
            ${c.map(z=>{const G=x(z);return G.length===0?`<tr><td><strong>${bt(z)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:G.map(R=>`
                <tr>
                  <td><strong>${bt(z)}</strong></td>
                  <td>${v(R.title)}</td>
                  <td><span class="badge badge-${(R.priority||"medium").toLowerCase().slice(0,3)}">${R.priority||"Medium"}</span></td>
                  <td>${v(R.category||"General")}</td>
                  <td>${R.dueTime||R.startTime||"—"}</td>
                  <td class="${R.status==="Completed"?"done":""}">${R.status||"Pending"}</td>
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
    `;V.document.write(W),V.document.close(),S("Weekly PDF report generated for printing! 📄")}function tt(){const j=Ft(`
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
    `),I=()=>j.remove();j.querySelector("#btnBackupClose").onclick=I;const a=j.querySelector("#btnDownloadBackupJson");a.onclick=async()=>{a.disabled=!0,a.textContent="Generating backup...";try{const z=await Ue("/tasks/backup"),G=new Blob([JSON.stringify(z,null,2)],{type:"application/json"}),R=URL.createObjectURL(G),y=document.createElement("a");y.href=R,y.download=`ci360-planner-backup-${at()}.json`,document.body.appendChild(y),y.click(),y.remove(),S("Planner backup downloaded successfully! 💾")}catch(z){S("Backup export failed: "+z.message,!0)}finally{a.disabled=!1,a.textContent="Download JSON Backup"}};const s=j.querySelector("#restoreFileInput"),C=j.querySelector("#restorePreviewArea"),D=j.querySelector("#restoreCountText"),V=j.querySelector("#btnExecuteRestore");let W=null;s.onchange=z=>{const G=z.target.files[0];if(!G)return;const R=new FileReader;R.onload=y=>{try{const K=JSON.parse(y.target.result),ee=Array.isArray(K.tasks)?K.tasks:Array.isArray(K)?K:null;if(!ee||ee.length===0){S("Invalid backup file: No tasks found",!0);return}W=ee,C.style.display="block",D.textContent=`Valid backup: ${ee.length} tasks ready to restore.`,V.disabled=!1}catch(K){S("Error parsing JSON backup file: "+K.message,!0),C.style.display="none",V.disabled=!0}},R.readAsText(G)},V.onclick=async()=>{var G;if(!W||W.length===0)return;V.disabled=!0,V.textContent="Restoring...";const z=((G=j.querySelector('input[name="restoreMode"]:checked'))==null?void 0:G.value)||"merge";try{const R=await je("/tasks/restore",{tasks:W,mode:z});S(`Restored ${R.restoredCount} tasks! (${R.skippedCount} skipped) ✨`),I(),await _()}catch(R){S("Restore failed: "+R.message,!0),V.disabled=!1,V.textContent="Retry Restore"}}}function ye(){const c=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${v(f.displayName||"Daily Planner")}">
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
              <input type="text" id="setTimezone" class="input" value="${v(f.timezone||"Asia/Kolkata")}" readonly>
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
    `,j=Ft(c),I=()=>j.remove();j.querySelector("#btnSettingsClose").onclick=I,j.querySelector("#btnCancelSettings").onclick=I,j.querySelector("#settingsForm").onsubmit=a=>{a.preventDefault(),f.displayName=j.querySelector("#setDisplayName").value.trim()||"Daily Planner",f.weekStartsOn=Number(j.querySelector("#setWeekStart").value),f.defaultPriority=j.querySelector("#setDefaultPriority").value,f.density=j.querySelector("#setDensity").value,f.soundEnabled=j.querySelector("#setSound").checked,Ca(f),S("Planner preferences saved! ⚙️"),I(),Q()}}}function ja(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
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
  `,document.head.appendChild(i)}function Aa(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function Ta(i,t,e,o,d){const l={move:i,variations:d};return t&&(l.suffix=t),e&&(l.nag=e),o!==null&&(l.comment=o),l}function Ia(...i){const[t,...e]=i;let o=t;for(const d of e)d!==null&&(o.variations=[d,...d.variations],d.variations=[],o=d);return t}function Da(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const o=e.variations[0];if(!o){e.comment=t.marker.comment;break}e=o}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ea(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function At(i,t,e,o){var d=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(d,At.prototype),d.expected=t,d.found=e,d.location=o,d.name="SyntaxError",d}Ea(At,Error);function ia(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}At.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,o;for(o=0;o<i.length;o++)if(i[o].source===this.location.source){e=i[o].text.split(/\r\n|\n|\r/g);break}var d=this.location.start,l=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(d):d,f=this.location.source+":"+l.line+":"+l.column;if(e){var n=this.location.end,_=ia("",l.line.toString().length," "),P=e[d.line-1],x=d.line===n.line?n.column:P.length+1,A=x-d.column||1;t+=`
 --> `+f+`
`+_+` |
`+l.line+" | "+P+`
`+_+" | "+ia("",d.column-1," ")+ia("",A,"^")}else t+=`
 at `+f}return t};At.buildMessage=function(i,t){var e={literal:function(P){return'"'+d(P.text)+'"'},class:function(P){var x=P.parts.map(function(A){return Array.isArray(A)?l(A[0])+"-"+l(A[1]):l(A)});return"["+(P.inverted?"^":"")+x.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(P){return P.description}};function o(P){return P.charCodeAt(0).toString(16).toUpperCase()}function d(P){return P.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(x){return"\\x0"+o(x)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(x){return"\\x"+o(x)})}function l(P){return P.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(x){return"\\x0"+o(x)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(x){return"\\x"+o(x)})}function f(P){return e[P.type](P)}function n(P){var x=P.map(f),A,M;if(x.sort(),x.length>0){for(A=1,M=1;A<x.length;A++)x[A-1]!==x[A]&&(x[M]=x[A],M++);x.length=M}switch(x.length){case 1:return x[0];case 2:return x[0]+" or "+x[1];default:return x.slice(0,-1).join(", ")+", or "+x[x.length-1]}}function _(P){return P?'"'+d(P)+'"':"end of input"}return"Expected "+n(i)+" but "+_(t)+" found."};function Pa(i,t){t=t!==void 0?t:{};var e={},o=t.grammarSource,d={pgn:Lt},l=Lt,f="[",n='"',_="]",P=".",x="O-O-O",A="O-O",M="0-0-0",Q="0-0",X="$",Ce="{",xe="}",ze=";",lt="(",rt=")",De="1-0",dt="0-1",Ke="1/2-1/2",vt="*",qe=/^[a-zA-Z]/,it=/^[^"]/,nt=/^[0-9]/,Re=/^[.]/,fe=/^[a-zA-Z1-8\-=]/,tt=/^[+#]/,ye=/^[!?]/,c=/^[^}]/,j=/^[^\r\n]/,I=/^[ \t\r\n]/,a=Ye("tag pair"),s=Me("[",!1),C=Me('"',!1),D=Me("]",!1),V=Ye("tag name"),W=Xe([["a","z"],["A","Z"]],!1,!1),z=Ye("tag value"),G=Xe(['"'],!0,!1),R=Ye("move number"),y=Xe([["0","9"]],!1,!1),K=Me(".",!1),ee=Xe(["."],!1,!1),de=Ye("standard algebraic notation"),oe=Me("O-O-O",!1),J=Me("O-O",!1),g=Me("0-0-0",!1),b=Me("0-0",!1),r=Xe([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),w=Xe(["+","#"],!1,!1),$=Ye("suffix annotation"),E=Xe(["!","?"],!1,!1),T=Ye("NAG"),O=Me("$",!1),u=Ye("brace comment"),B=Me("{",!1),q=Xe(["}"],!0,!1),se=Me("}",!1),te=Ye("rest of line comment"),pe=Me(";",!1),Z=Xe(["\r",`
`],!0,!1),H=Ye("variation"),Y=Me("(",!1),ne=Me(")",!1),he=Ye("game termination marker"),Se=Me("1-0",!1),Te=Me("0-1",!1),Pe=Me("1/2-1/2",!1),be=Me("*",!1),me=Ye("whitespace"),_e=Xe([" ","	","\r",`
`],!1,!1),Be=function(p,k){return Da(p,k)},ke=function(p){return Object.fromEntries(p)},N=function(p,k){return[p,k]},U=function(p,k){return{root:p,marker:k}},ce=function(p,k){return Ia(Aa(p),...k.flat())},we=function(p,k,m,re,le){return Ta(p,k,m,re,le)},Ae=function(p){return p},Ee=function(p){return p.replace(/[\r\n]+/g," ")},xt=function(p){return p.trim()},yt=function(p){return p},kt=function(p,k){return{result:p,comment:k}},h=t.peg$currPos|0,ct=[{line:1,column:1}],Ve=h,pt=t.peg$maxFailExpected||[],F=t.peg$silentFails|0,ut;if(t.startRule){if(!(t.startRule in d))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');l=d[t.startRule]}function Me(p,k){return{type:"literal",text:p,ignoreCase:k}}function Xe(p,k,m){return{type:"class",parts:p,inverted:k,ignoreCase:m}}function Mt(){return{type:"end"}}function Ye(p){return{type:"other",description:p}}function Tt(p){var k=ct[p],m;if(k)return k;if(p>=ct.length)m=ct.length-1;else for(m=p;!ct[--m];);for(k=ct[m],k={line:k.line,column:k.column};m<p;)i.charCodeAt(m)===10?(k.line++,k.column=1):k.column++,m++;return ct[p]=k,k}function qt(p,k,m){var re=Tt(p),le=Tt(k),$e={source:o,start:{offset:p,line:re.line,column:re.column},end:{offset:k,line:le.line,column:le.column}};return $e}function ae(p){h<Ve||(h>Ve&&(Ve=h,pt=[]),pt.push(p))}function jt(p,k,m){return new At(At.buildMessage(p,k),p,k,m)}function Lt(){var p,k,m;return p=h,k=Qt(),m=L(),p=Be(k,m),p}function Qt(){var p,k,m;for(p=h,k=[],m=zt();m!==e;)k.push(m),m=zt();return m=He(),p=ke(k),p}function zt(){var p,k,m,re,le,$e,wt;return F++,p=h,He(),i.charCodeAt(h)===91?(k=f,h++):(k=e,F===0&&ae(s)),k!==e?(He(),m=Xt(),m!==e?(He(),i.charCodeAt(h)===34?(re=n,h++):(re=e,F===0&&ae(C)),re!==e?(le=Rt(),i.charCodeAt(h)===34?($e=n,h++):($e=e,F===0&&ae(C)),$e!==e?(He(),i.charCodeAt(h)===93?(wt=_,h++):(wt=e,F===0&&ae(D)),wt!==e?p=N(m,le):(h=p,p=e)):(h=p,p=e)):(h=p,p=e)):(h=p,p=e)):(h=p,p=e),F--,p===e&&F===0&&ae(a),p}function Xt(){var p,k,m;if(F++,p=h,k=[],m=i.charAt(h),qe.test(m)?h++:(m=e,F===0&&ae(W)),m!==e)for(;m!==e;)k.push(m),m=i.charAt(h),qe.test(m)?h++:(m=e,F===0&&ae(W));else k=e;return k!==e?p=i.substring(p,h):p=k,F--,p===e&&(k=e,F===0&&ae(V)),p}function Rt(){var p,k,m;for(F++,p=h,k=[],m=i.charAt(h),it.test(m)?h++:(m=e,F===0&&ae(G));m!==e;)k.push(m),m=i.charAt(h),it.test(m)?h++:(m=e,F===0&&ae(G));return p=i.substring(p,h),F--,k=e,F===0&&ae(z),p}function L(){var p,k,m;return p=h,k=ie(),He(),m=ea(),m===e&&(m=null),He(),p=U(k,m),p}function ie(){var p,k,m,re;for(p=h,k=gt(),k===e&&(k=null),m=[],re=ve();re!==e;)m.push(re),re=ve();return p=ce(k,m),p}function ve(){var p,k,m,re,le,$e,wt,Ot;if(p=h,He(),Fe(),He(),k=Ze(),k!==e){for(m=st(),m===e&&(m=null),re=[],le=ot();le!==e;)re.push(le),le=ot();for(le=He(),$e=gt(),$e===e&&($e=null),wt=[],Ot=Nt();Ot!==e;)wt.push(Ot),Ot=Nt();p=we(k,m,re,$e,wt)}else h=p,p=e;return p}function Fe(){var p,k,m,re,le,$e;for(F++,p=h,k=[],m=i.charAt(h),nt.test(m)?h++:(m=e,F===0&&ae(y));m!==e;)k.push(m),m=i.charAt(h),nt.test(m)?h++:(m=e,F===0&&ae(y));if(i.charCodeAt(h)===46?(m=P,h++):(m=e,F===0&&ae(K)),m!==e){for(re=He(),le=[],$e=i.charAt(h),Re.test($e)?h++:($e=e,F===0&&ae(ee));$e!==e;)le.push($e),$e=i.charAt(h),Re.test($e)?h++:($e=e,F===0&&ae(ee));k=[k,m,re,le],p=k}else h=p,p=e;return F--,p===e&&(k=e,F===0&&ae(R)),p}function Ze(){var p,k,m,re,le,$e;if(F++,p=h,k=h,i.substr(h,5)===x?(m=x,h+=5):(m=e,F===0&&ae(oe)),m===e&&(i.substr(h,3)===A?(m=A,h+=3):(m=e,F===0&&ae(J)),m===e&&(i.substr(h,5)===M?(m=M,h+=5):(m=e,F===0&&ae(g)),m===e&&(i.substr(h,3)===Q?(m=Q,h+=3):(m=e,F===0&&ae(b)),m===e))))if(m=h,re=i.charAt(h),qe.test(re)?h++:(re=e,F===0&&ae(W)),re!==e){if(le=[],$e=i.charAt(h),fe.test($e)?h++:($e=e,F===0&&ae(r)),$e!==e)for(;$e!==e;)le.push($e),$e=i.charAt(h),fe.test($e)?h++:($e=e,F===0&&ae(r));else le=e;le!==e?(re=[re,le],m=re):(h=m,m=e)}else h=m,m=e;return m!==e?(re=i.charAt(h),tt.test(re)?h++:(re=e,F===0&&ae(w)),re===e&&(re=null),m=[m,re],k=m):(h=k,k=e),k!==e?p=i.substring(p,h):p=k,F--,p===e&&(k=e,F===0&&ae(de)),p}function st(){var p,k,m;for(F++,p=h,k=[],m=i.charAt(h),ye.test(m)?h++:(m=e,F===0&&ae(E));m!==e;)k.push(m),k.length>=2?m=e:(m=i.charAt(h),ye.test(m)?h++:(m=e,F===0&&ae(E)));return k.length<1?(h=p,p=e):p=k,F--,p===e&&(k=e,F===0&&ae($)),p}function ot(){var p,k,m,re,le;if(F++,p=h,He(),i.charCodeAt(h)===36?(k=X,h++):(k=e,F===0&&ae(O)),k!==e){if(m=h,re=[],le=i.charAt(h),nt.test(le)?h++:(le=e,F===0&&ae(y)),le!==e)for(;le!==e;)re.push(le),le=i.charAt(h),nt.test(le)?h++:(le=e,F===0&&ae(y));else re=e;re!==e?m=i.substring(m,h):m=re,m!==e?p=Ae(m):(h=p,p=e)}else h=p,p=e;return F--,p===e&&F===0&&ae(T),p}function gt(){var p;return p=Bt(),p===e&&(p=Zt()),p}function Bt(){var p,k,m,re,le;if(F++,p=h,i.charCodeAt(h)===123?(k=Ce,h++):(k=e,F===0&&ae(B)),k!==e){for(m=h,re=[],le=i.charAt(h),c.test(le)?h++:(le=e,F===0&&ae(q));le!==e;)re.push(le),le=i.charAt(h),c.test(le)?h++:(le=e,F===0&&ae(q));m=i.substring(m,h),i.charCodeAt(h)===125?(re=xe,h++):(re=e,F===0&&ae(se)),re!==e?p=Ee(m):(h=p,p=e)}else h=p,p=e;return F--,p===e&&(k=e,F===0&&ae(u)),p}function Zt(){var p,k,m,re,le;if(F++,p=h,i.charCodeAt(h)===59?(k=ze,h++):(k=e,F===0&&ae(pe)),k!==e){for(m=h,re=[],le=i.charAt(h),j.test(le)?h++:(le=e,F===0&&ae(Z));le!==e;)re.push(le),le=i.charAt(h),j.test(le)?h++:(le=e,F===0&&ae(Z));m=i.substring(m,h),p=xt(m)}else h=p,p=e;return F--,p===e&&(k=e,F===0&&ae(te)),p}function Nt(){var p,k,m,re;return F++,p=h,He(),i.charCodeAt(h)===40?(k=lt,h++):(k=e,F===0&&ae(Y)),k!==e?(m=ie(),m!==e?(He(),i.charCodeAt(h)===41?(re=rt,h++):(re=e,F===0&&ae(ne)),re!==e?p=yt(m):(h=p,p=e)):(h=p,p=e)):(h=p,p=e),F--,p===e&&F===0&&ae(H),p}function ea(){var p,k,m;return F++,p=h,i.substr(h,3)===De?(k=De,h+=3):(k=e,F===0&&ae(Se)),k===e&&(i.substr(h,3)===dt?(k=dt,h+=3):(k=e,F===0&&ae(Te)),k===e&&(i.substr(h,7)===Ke?(k=Ke,h+=7):(k=e,F===0&&ae(Pe)),k===e&&(i.charCodeAt(h)===42?(k=vt,h++):(k=e,F===0&&ae(be))))),k!==e?(He(),m=gt(),m===e&&(m=null),p=kt(k,m)):(h=p,p=e),F--,p===e&&(k=e,F===0&&ae(he)),p}function He(){var p,k;for(F++,p=[],k=i.charAt(h),I.test(k)?h++:(k=e,F===0&&ae(_e));k!==e;)p.push(k),k=i.charAt(h),I.test(k)?h++:(k=e,F===0&&ae(_e));return F--,k=e,F===0&&ae(me),p}if(ut=l(),t.peg$library)return{peg$result:ut,peg$currPos:h,peg$FAILED:e,peg$maxFailExpected:pt,peg$maxFailPos:Ve};if(ut!==e&&h===i.length)return ut;throw ut!==e&&h<i.length&&ae(Mt()),jt(pt,Ve<i.length?i.charAt(Ve):null,Ve<i.length?qt(Ve,Ve+1):qt(Ve,Ve))}/**
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
 */const Vt=0xffffffffffffffffn;function na(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function ma(i,t){return i*t&Vt}function Ma(i){return function(){let t=BigInt(i&Vt),e=BigInt(i>>64n&Vt);const o=ma(na(ma(t,5n),7n),9n);return e^=t,t=(na(t,24n)^e^e<<16n)&Vt,e=na(e,37n),i=e<<64n|t,o}}const Jt=Ma(0xa187eb39cdcaed8f31c4b365b102e01en),qa=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Jt()))),La=Array.from({length:8},()=>Jt()),za=Array.from({length:16},()=>Jt()),oa=Jt(),We="w",et="b",Le="p",pa="n",Yt="b",Et="r",ht="q",Ne="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Ut{constructor(t,e){Ie(this,"color");Ie(this,"from");Ie(this,"to");Ie(this,"piece");Ie(this,"captured");Ie(this,"promotion");Ie(this,"flags");Ie(this,"san");Ie(this,"lan");Ie(this,"before");Ie(this,"after");const{color:o,piece:d,from:l,to:f,flags:n,captured:_,promotion:P}=e,x=Oe(l),A=Oe(f);this.color=o,this.piece=d,this.from=x,this.to=A,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=x+A,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const M in ge)ge[M]&n&&(this.flags+=St[M]);_&&(this.captured=_),P&&(this.promotion=P,this.lan+=P)}isCapture(){return this.flags.indexOf(St.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(St.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(St.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(St.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(St.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(St.BIG_PAWN)>-1}}const Ge=-1,St={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},ge={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ua={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Ra={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Ba={...ua,...Ra},ue={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},sa={b:[16,32,17,15],w:[-16,-32,-17,-15]},ha={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Na=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Oa=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Fa={p:1,n:2,b:4,r:8,q:16,k:32},Ha="pnbrqkPNBRQK",va=[pa,Yt,Et,ht],Ga=7,Ua=6,Wa=1,Ka=0,Wt={[Ne]:ge.KSIDE_CASTLE,[ht]:ge.QSIDE_CASTLE},ft={w:[{square:ue.a1,flag:ge.QSIDE_CASTLE},{square:ue.h1,flag:ge.KSIDE_CASTLE}],b:[{square:ue.a8,flag:ge.QSIDE_CASTLE},{square:ue.h8,flag:ge.KSIDE_CASTLE}]},Va={b:Wa,w:Ua},la="--";function _t(i){return i>>4}function Pt(i){return i&15}function ka(i){return"0123456789".indexOf(i)!==-1}function Oe(i){const t=Pt(i),e=_t(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function It(i){return i===We?et:We}function Ya(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const o=parseInt(t[4],10);if(isNaN(o)||o<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const d=t[0].split("/");if(d.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let f=0;f<d.length;f++){let n=0,_=!1;for(let P=0;P<d[f].length;P++)if(ka(d[f][P])){if(_)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};n+=parseInt(d[f][P],10),_=!0}else{if(!/^[prnbqkPRNBQK]$/.test(d[f][P]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};n+=1,_=!1}if(n!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const l=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:f,regex:n}of l){if(!n.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${f} king`};if((t[0].match(n)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${f} kings`}}return Array.from(d[0]+d[7]).some(f=>f.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Ja(i,t){const e=i.from,o=i.to,d=i.piece;let l=0,f=0,n=0;for(let _=0,P=t.length;_<P;_++){const x=t[_].from,A=t[_].to,M=t[_].piece;d===M&&e!==x&&o===A&&(l++,_t(e)===_t(x)&&f++,Pt(e)===Pt(x)&&n++)}return l>0?f>0&&n>0?Oe(e):n>0?Oe(e).charAt(1):Oe(e).charAt(0):""}function mt(i,t,e,o,d,l=void 0,f=ge.NORMAL){const n=_t(o);if(d===Le&&(n===Ga||n===Ka))for(let _=0;_<va.length;_++){const P=va[_];i.push({color:t,from:e,to:o,piece:d,captured:l,promotion:P,flags:f|ge.PROMOTION})}else i.push({color:t,from:e,to:o,piece:d,captured:l,flags:f})}function xa(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:Le:(t=t.toLowerCase(),t==="o"?Ne:t)}function da(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ya{constructor(t=ra,{skipValidation:e=!1}={}){Ie(this,"_board",new Array(128));Ie(this,"_turn",We);Ie(this,"_header",{});Ie(this,"_kings",{w:Ge,b:Ge});Ie(this,"_epSquare",-1);Ie(this,"_halfMoves",0);Ie(this,"_moveNumber",0);Ie(this,"_history",[]);Ie(this,"_comments",{});Ie(this,"_castling",{w:0,b:0});Ie(this,"_hash",0n);Ie(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Ge,b:Ge},this._turn=We,this._castling={w:0,b:0},this._epSquare=Ge,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Ba},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:o=!1}={}){let d=t.split(/\s+/);if(d.length>=2&&d.length<6){const n=["-","-","0","1"];t=d.concat(n.slice(-(6-d.length))).join(" ")}if(d=t.split(/\s+/),!e){const{ok:n,error:_}=Ya(t);if(!n)throw new Error(_)}const l=d[0];let f=0;this.clear({preserveHeaders:o});for(let n=0;n<l.length;n++){const _=l.charAt(n);if(_==="/")f+=8;else if(ka(_))f+=parseInt(_,10);else{const P=_<"a"?We:et;this._put({type:_.toLowerCase(),color:P},Oe(f)),f++}}this._turn=d[1],d[2].indexOf("K")>-1&&(this._castling.w|=ge.KSIDE_CASTLE),d[2].indexOf("Q")>-1&&(this._castling.w|=ge.QSIDE_CASTLE),d[2].indexOf("k")>-1&&(this._castling.b|=ge.KSIDE_CASTLE),d[2].indexOf("q")>-1&&(this._castling.b|=ge.QSIDE_CASTLE),this._epSquare=d[3]==="-"?Ge:ue[d[3]],this._halfMoves=parseInt(d[4],10),this._moveNumber=parseInt(d[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var f,n;let e=0,o="";for(let _=ue.a8;_<=ue.h1;_++){if(this._board[_]){e>0&&(o+=e,e=0);const{color:P,type:x}=this._board[_];o+=P===We?x.toUpperCase():x.toLowerCase()}else e++;_+1&136&&(e>0&&(o+=e),_!==ue.h1&&(o+="/"),e=0,_+=8)}let d="";this._castling[We]&ge.KSIDE_CASTLE&&(d+="K"),this._castling[We]&ge.QSIDE_CASTLE&&(d+="Q"),this._castling[et]&ge.KSIDE_CASTLE&&(d+="k"),this._castling[et]&ge.QSIDE_CASTLE&&(d+="q"),d=d||"-";let l="-";if(this._epSquare!==Ge)if(t)l=Oe(this._epSquare);else{const _=this._epSquare+(this._turn===We?16:-16),P=[_+1,_-1];for(const x of P){if(x&136)continue;const A=this._turn;if(((f=this._board[x])==null?void 0:f.color)===A&&((n=this._board[x])==null?void 0:n.type)===Le){this._makeMove({color:A,from:x,to:this._epSquare,piece:Le,captured:Le,flags:ge.EP_CAPTURE});const M=!this._isKingAttacked(A);if(this._undoMove(),M){l=Oe(this._epSquare);break}}}}return[o,this._turn,d,l,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:o}=this._board[t],d={w:0,b:1}[e],l={p:0,n:1,b:2,r:3,q:4,k:5}[o];return qa[d][l][t]}_epKey(){return this._epSquare===Ge?0n:La[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return za[t]}_computeHash(){let t=0n;for(let e=ue.a8;e<=ue.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=oa),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[ue[t]]}findPiece(t){var o;const e=[];for(let d=ue.a8;d<=ue.h1;d++){if(d&136){d+=7;continue}!this._board[d]||((o=this._board[d])==null?void 0:o.color)!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(Oe(d))}return e}put({type:t,color:e},o){return this._put({type:t,color:e},o)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},o){if(Ha.indexOf(t.toLowerCase())===-1||!(o in ue))return!1;const d=ue[o];if(t==Ne&&!(this._kings[e]==Ge||this._kings[e]==d))return!1;const l=this._board[d];return l&&l.type===Ne&&(this._kings[l.color]=Ge),this._set(d,{type:t,color:e}),t===Ne&&(this._kings[e]=d),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(ue[t]),e&&e.type===Ne&&(this._kings[e.color]=Ge),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var o,d,l,f,n,_,P,x,A,M,Q,X;this._hash^=this._castlingKey();const t=((o=this._board[ue.e1])==null?void 0:o.type)===Ne&&((d=this._board[ue.e1])==null?void 0:d.color)===We,e=((l=this._board[ue.e8])==null?void 0:l.type)===Ne&&((f=this._board[ue.e8])==null?void 0:f.color)===et;(!t||((n=this._board[ue.a1])==null?void 0:n.type)!==Et||((_=this._board[ue.a1])==null?void 0:_.color)!==We)&&(this._castling.w&=-65),(!t||((P=this._board[ue.h1])==null?void 0:P.type)!==Et||((x=this._board[ue.h1])==null?void 0:x.color)!==We)&&(this._castling.w&=-33),(!e||((A=this._board[ue.a8])==null?void 0:A.type)!==Et||((M=this._board[ue.a8])==null?void 0:M.color)!==et)&&(this._castling.b&=-65),(!e||((Q=this._board[ue.h8])==null?void 0:Q.type)!==Et||((X=this._board[ue.h8])==null?void 0:X.color)!==et)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var l,f;if(this._epSquare===Ge)return;const t=this._epSquare+(this._turn===We?-16:16),e=this._epSquare+(this._turn===We?16:-16),o=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((l=this._board[e])==null?void 0:l.color)!==It(this._turn)||((f=this._board[e])==null?void 0:f.type)!==Le){this._hash^=this._epKey(),this._epSquare=Ge;return}const d=n=>{var _,P;return!(n&136)&&((_=this._board[n])==null?void 0:_.color)===this._turn&&((P=this._board[n])==null?void 0:P.type)===Le};o.some(d)||(this._hash^=this._epKey(),this._epSquare=Ge)}_attacked(t,e,o){const d=[];for(let l=ue.a8;l<=ue.h1;l++){if(l&136){l+=7;continue}if(this._board[l]===void 0||this._board[l].color!==t)continue;const f=this._board[l],n=l-e;if(n===0)continue;const _=n+119;if(Na[_]&Fa[f.type]){if(f.type===Le){if(n>0&&f.color===We||n<=0&&f.color===et)if(o)d.push(Oe(l));else return!0;continue}if(f.type==="n"||f.type==="k")if(o){d.push(Oe(l));continue}else return!0;const P=Oa[_];let x=l+P,A=!1;for(;x!==e;){if(this._board[x]!=null){A=!0;break}x+=P}if(!A)if(o){d.push(Oe(l));continue}else return!0}}return o?d:!1}attackers(t,e){return e?this._attacked(e,ue[t],!0):this._attacked(this._turn,ue[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(It(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,ue[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let o=0,d=0;for(let l=ue.a8;l<=ue.h1;l++){if(d=(d+1)%2,l&136){l+=7;continue}const f=this._board[l];f&&(t[f.type]=f.type in t?t[f.type]+1:1,f.type===Yt&&e.push(d),o++)}if(o===2)return!0;if(o===3&&(t[Yt]===1||t[pa]===1))return!0;if(o===t[Yt]+2){let l=0;const f=e.length;for(let n=0;n<f;n++)l+=e[n];if(l===0||l===f)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:o=void 0}={}){const d=this._moves({square:e,piece:o});return t?d.map(l=>new Ut(this,l)):d.map(l=>this._moveToSan(l,d))}_moves({legal:t=!0,piece:e=void 0,square:o=void 0}={}){var Q;const d=o?o.toLowerCase():void 0,l=e==null?void 0:e.toLowerCase(),f=[],n=this._turn,_=It(n);let P=ue.a8,x=ue.h1,A=!1;if(d)if(d in ue)P=x=ue[d],A=!0;else return[];for(let X=P;X<=x;X++){if(X&136){X+=7;continue}if(!this._board[X]||this._board[X].color===_)continue;const{type:Ce}=this._board[X];let xe;if(Ce===Le){if(l&&l!==Ce)continue;xe=X+sa[n][0],this._board[xe]||(mt(f,n,X,xe,Le),xe=X+sa[n][1],Va[n]===_t(X)&&!this._board[xe]&&mt(f,n,X,xe,Le,void 0,ge.BIG_PAWN));for(let ze=2;ze<4;ze++)xe=X+sa[n][ze],!(xe&136)&&(((Q=this._board[xe])==null?void 0:Q.color)===_?mt(f,n,X,xe,Le,this._board[xe].type,ge.CAPTURE):xe===this._epSquare&&mt(f,n,X,xe,Le,Le,ge.EP_CAPTURE))}else{if(l&&l!==Ce)continue;for(let ze=0,lt=ha[Ce].length;ze<lt;ze++){const rt=ha[Ce][ze];for(xe=X;xe+=rt,!(xe&136);){if(!this._board[xe])mt(f,n,X,xe,Ce);else{if(this._board[xe].color===n)break;mt(f,n,X,xe,Ce,this._board[xe].type,ge.CAPTURE);break}if(Ce===pa||Ce===Ne)break}}}}if((l===void 0||l===Ne)&&(!A||x===this._kings[n])){if(this._castling[n]&ge.KSIDE_CASTLE){const X=this._kings[n],Ce=X+2;!this._board[X+1]&&!this._board[Ce]&&!this._attacked(_,this._kings[n])&&!this._attacked(_,X+1)&&!this._attacked(_,Ce)&&mt(f,n,this._kings[n],Ce,Ne,void 0,ge.KSIDE_CASTLE)}if(this._castling[n]&ge.QSIDE_CASTLE){const X=this._kings[n],Ce=X-2;!this._board[X-1]&&!this._board[X-2]&&!this._board[X-3]&&!this._attacked(_,this._kings[n])&&!this._attacked(_,X-1)&&!this._attacked(_,Ce)&&mt(f,n,this._kings[n],Ce,Ne,void 0,ge.QSIDE_CASTLE)}}if(!t||this._kings[n]===-1)return f;const M=[];for(let X=0,Ce=f.length;X<Ce;X++)this._makeMove(f[X]),this._isKingAttacked(n)||M.push(f[X]),this._undoMove();return M}move(t,{strict:e=!1}={}){let o=null;if(typeof t=="string")o=this._moveFromSan(t,e);else if(t===null)o=this._moveFromSan(la,e);else if(typeof t=="object"){const l=this._moves();for(let f=0,n=l.length;f<n;f++)if(t.from===Oe(l[f].from)&&t.to===Oe(l[f].to)&&(!("promotion"in l[f])||t.promotion===l[f].promotion)){o=l[f];break}}if(!o)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&o.flags&ge.NULL_MOVE)throw new Error("Null move not allowed when in check");const d=new Ut(this,o);return this._makeMove(o),this._incPositionCount(),d}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var d,l,f,n;const e=this._turn,o=It(e);if(this._push(t),t.flags&ge.NULL_MOVE){e===et&&this._moveNumber++,this._halfMoves++,this._turn=o,this._epSquare=Ge;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&ge.EP_CAPTURE&&(this._turn===et?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Ne){if(this._kings[e]=t.to,t.flags&ge.KSIDE_CASTLE){const _=t.to-1,P=t.to+1;this._movePiece(P,_)}else if(t.flags&ge.QSIDE_CASTLE){const _=t.to+1,P=t.to-2;this._movePiece(P,_)}this._castling[e]=0}if(this._castling[e]){for(let _=0,P=ft[e].length;_<P;_++)if(t.from===ft[e][_].square&&this._castling[e]&ft[e][_].flag){this._castling[e]^=ft[e][_].flag;break}}if(this._castling[o]){for(let _=0,P=ft[o].length;_<P;_++)if(t.to===ft[o][_].square&&this._castling[o]&ft[o][_].flag){this._castling[o]^=ft[o][_].flag;break}}if(this._hash^=this._castlingKey(),t.flags&ge.BIG_PAWN){let _;e===et?_=t.to-16:_=t.to+16,!(t.to-1&136)&&((d=this._board[t.to-1])==null?void 0:d.type)===Le&&((l=this._board[t.to-1])==null?void 0:l.color)===o||!(t.to+1&136)&&((f=this._board[t.to+1])==null?void 0:f.type)===Le&&((n=this._board[t.to+1])==null?void 0:n.color)===o?(this._epSquare=_,this._hash^=this._epKey()):this._epSquare=Ge}else this._epSquare=Ge;t.piece===Le?this._halfMoves=0:t.flags&(ge.CAPTURE|ge.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===et&&this._moveNumber++,this._turn=o,this._hash^=oa}undo(){const t=this._hash,e=this._undoMove();if(e){const o=new Ut(this,e);return this._decPositionCount(t),o}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=oa;const o=this._turn,d=It(o);if(e.flags&ge.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:o})),e.captured)if(e.flags&ge.EP_CAPTURE){let l;o===et?l=e.to-16:l=e.to+16,this._set(l,{type:Le,color:d})}else this._set(e.to,{type:e.captured,color:d});if(e.flags&(ge.KSIDE_CASTLE|ge.QSIDE_CASTLE)){let l,f;e.flags&ge.KSIDE_CASTLE?(l=e.to+1,f=e.to-1):(l=e.to-2,f=e.to+1),this._movePiece(f,l)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const o=[];let d=!1;for(const M in this._header)this._header[M]&&o.push(`[${M} "${this._header[M]}"]`+t),d=!0;d&&this._history.length&&o.push(t);const l=M=>{const Q=this._comments[this.fen()];if(typeof Q<"u"){const X=M.length>0?" ":"";M=`${M}${X}{${Q}}`}return M},f=[];for(;this._history.length>0;)f.push(this._undoMove());const n=[];let _="";for(f.length===0&&n.push(l(""));f.length>0;){_=l(_);const M=f.pop();if(!M)break;if(!this._history.length&&M.color==="b"){const Q=`${this._moveNumber}. ...`;_=_?`${_} ${Q}`:Q}else M.color==="w"&&(_.length&&n.push(_),_=this._moveNumber+".");_=_+" "+this._moveToSan(M,this._moves({legal:!0})),this._makeMove(M)}if(_.length&&n.push(l(_)),n.push(this._header.Result||"*"),e===0)return o.join("")+n.join(" ");const P=function(){return o.length>0&&o[o.length-1]===" "?(o.pop(),!0):!1},x=function(M,Q){for(const X of Q.split(" "))if(X){if(M+X.length>e){for(;P();)M--;o.push(t),M=0}o.push(X),M+=X.length,o.push(" "),M++}return P()&&M--,M};let A=0;for(let M=0;M<n.length;M++){if(A+n[M].length>e&&n[M].includes("{")){A=x(A,n[M]);continue}A+n[M].length>e&&M!==0?(o[o.length-1]===" "&&o.pop(),o.push(t),A=0):M!==0&&(o.push(" "),A++),o.push(n[M]),A+=n[M].length}return o.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ua[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ua[t]||null,!0):!1}getHeaders(){const t={};for(const[e,o]of Object.entries(this._header))o!==null&&(t[e]=o);return t}loadPgn(t,{strict:e=!1,newlineChar:o=`\r?
`}={}){o!==`\r?
`&&(t=t.replace(new RegExp(o,"g"),`
`));const d=Pa(t);this.reset();const l=d.headers;let f="";for(const P in l)P.toLowerCase()==="fen"&&(f=l[P]),this.header(P,l[P]);if(!e)f&&this.load(f,{preserveHeaders:!0});else if(l.SetUp==="1"){if(!("FEN"in l))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(l.FEN,{preserveHeaders:!0})}let n=d.root;for(;n;){if(n.move){const P=this._moveFromSan(n.move,e);if(P==null)throw new Error(`Invalid move in PGN: ${n.move}`);this._makeMove(P),this._incPositionCount()}n.comment!==void 0&&(this._comments[this.fen()]=n.comment),n=n.variations[0]}const _=d.result;_&&Object.keys(this._header).length&&this._header.Result!==_&&this.setHeader("Result",_)}_moveToSan(t,e){let o="";if(t.flags&ge.KSIDE_CASTLE)o="O-O";else if(t.flags&ge.QSIDE_CASTLE)o="O-O-O";else{if(t.flags&ge.NULL_MOVE)return la;if(t.piece!==Le){const d=Ja(t,e);o+=t.piece.toUpperCase()+d}t.flags&(ge.CAPTURE|ge.EP_CAPTURE)&&(t.piece===Le&&(o+=Oe(t.from)[0]),o+="x"),o+=Oe(t.to),t.promotion&&(o+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?o+="#":o+="+"),this._undoMove(),o}_moveFromSan(t,e=!1){let o=da(t);if(e||(o==="0-0"?o="O-O":o==="0-0-0"&&(o="O-O-O")),o==la)return{color:this._turn,from:0,to:0,piece:"k",flags:ge.NULL_MOVE};let d=xa(o),l=this._moves({legal:!0,piece:d});for(let M=0,Q=l.length;M<Q;M++)if(o===da(this._moveToSan(l[M],l)))return l[M];if(e)return null;let f,n,_,P,x,A=!1;if(n=o.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),n?(f=n[1],_=n[2],P=n[3],x=n[4],_.length==1&&(A=!0)):(n=o.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),n&&(f=n[1],_=n[2],P=n[3],x=n[4],_.length==1&&(A=!0))),d=xa(o),l=this._moves({legal:!0,piece:f||d}),!P)return null;for(let M=0,Q=l.length;M<Q;M++)if(_){if((!f||f.toLowerCase()==l[M].piece)&&ue[_]==l[M].from&&ue[P]==l[M].to&&(!x||x.toLowerCase()==l[M].promotion))return l[M];if(A){const X=Oe(l[M].from);if((!f||f.toLowerCase()==l[M].piece)&&ue[P]==l[M].to&&(_==X[0]||_==X[1])&&(!x||x.toLowerCase()==l[M].promotion))return l[M]}}else if(o===da(this._moveToSan(l[M],l)).replace("x",""))return l[M];return null}ascii(){let t=`   +------------------------+
`;for(let e=ue.a8;e<=ue.h1;e++){if(Pt(e)===0&&(t+=" "+"87654321"[_t(e)]+" |"),this._board[e]){const o=this._board[e].type,l=this._board[e].color===We?o.toUpperCase():o.toLowerCase();t+=" "+l+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let o=0;const d=this._turn;for(let l=0,f=e.length;l<f;l++)this._makeMove(e[l]),this._isKingAttacked(d)||(t-1>0?o+=this.perft(t-1):o++),this._undoMove();return o}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let o=ue.a8;o<=ue.h1;o++)this._board[o]==null?e.push(null):e.push({square:Oe(o),type:this._board[o].type,color:this._board[o].color}),o+1&136&&(t.push(e),e=[],o+=8);return t}squareColor(t){if(t in ue){const e=ue[t];return(_t(e)+Pt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],o=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const d=e.pop();if(!d)break;t?o.push(new Ut(this,d)):o.push(this._moveToSan(d,this._moves())),this._makeMove(d)}return o}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},o=d=>{d in this._comments&&(e[d]=this._comments[d])};for(;this._history.length>0;)t.push(this._undoMove());for(o(this.fen());;){const d=t.pop();if(!d)break;this._makeMove(d),o(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const d of[Ne,ht])e[d]!==void 0&&(e[d]?this._castling[t]|=Wt[d]:this._castling[t]&=~Wt[d]);this._updateCastlingRights();const o=this.getCastlingRights(t);return(e[Ne]===void 0||e[Ne]===o[Ne])&&(e[ht]===void 0||e[ht]===o[ht])}getCastlingRights(t){return{[Ne]:(this._castling[t]&Wt[Ne])!==0,[ht]:(this._castling[t]&Wt[ht])!==0}}moveNumber(){return this._moveNumber}}async function ti(i,t={}){var de,oe,J;const e=t.currentUser||{};let o="chat",d=[],l=null,f=[],n=[],_=null,P=null,x=!1,A=null,M=null;i.innerHTML=`
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
  `,Qa(),await rt(),qe();const Q=i.querySelector("#tab-nav-chat"),X=i.querySelector("#tab-nav-lounge"),Ce=i.querySelector("#bonding-chat-main-wrap"),xe=i.querySelector("#bonding-lounge-main-wrap");Q==null||Q.addEventListener("click",()=>{o="chat",Q.classList.add("active"),X.classList.remove("active"),Ce.style.display="grid",xe.style.display="none",qe()}),X==null||X.addEventListener("click",async()=>{o="lounge_games",X.classList.add("active"),Q.classList.remove("active"),Ce.style.display="none",xe.style.display="block",await s()}),(de=i.querySelector("#btn-top-new-chat"))==null||de.addEventListener("click",R),(oe=i.querySelector("#btn-top-new-group"))==null||oe.addEventListener("click",y),(J=i.querySelector("#btn-top-challenge"))==null||J.addEventListener("click",()=>D());const ze=i.querySelector("#bonding-search-input");ze&&ze.addEventListener("input",g=>{const b=g.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(w=>{const $=w.textContent.toLowerCase();w.style.display=$.includes(b)?"flex":"none"})}),dt(),new MutationObserver((g,b)=>{document.body.contains(i)||(P&&clearInterval(P),M&&clearInterval(M),b.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function rt(){try{const[g,b]=await Promise.all([Ue("/bonding/channels").catch(()=>[]),Ue("/bonding/colleagues").catch(()=>[])]);d=g,f=b,!l&&d.length>0&&(l=d.find(r=>r.name.includes("Lounge"))||d[0]),Ke(),l&&await De(l._id)}catch(g){console.error("Failed to load bonding data",g)}}async function De(g,b=!1){if(g)try{n=await Ue(`/bonding/channels/${g}/messages`),b?I():a()}catch(r){console.error("Failed to load messages",r)}}function dt(){P&&clearInterval(P),P=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval(P);return}o==="chat"&&l?await De(l._id,!0):o==="lounge_games"&&await s(!0)}catch{}},3e3)}function Ke(){const g=i.querySelector("#bonding-group-list"),b=i.querySelector("#bonding-direct-list");if(!g||!b)return;const r=d.filter($=>$.type==="group"),w=d.filter($=>$.type==="direct");r.length===0?g.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':g.innerHTML=r.map($=>{var T;return`
          <div class="bonding-channel-item ${l&&l._id===$._id?"active":""}" data-channel-id="${$._id}">
            <div class="bonding-channel-icon">${$.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v($.name)}</div>
              <div class="bonding-channel-preview">${v(((T=$.lastMessage)==null?void 0:T.content)||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${$._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),w.length===0?b.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':b.innerHTML=w.map($=>{var u;const E=l&&l._id===$._id,T=$.displayName||$.name||"Colleague",O=T.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${E?"active":""}" data-channel-id="${$._id}">
            <div class="bonding-channel-avatar">${O}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(T)}</div>
              <div class="bonding-channel-preview">${v(((u=$.lastMessage)==null?void 0:u.content)||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${$._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),vt()}function vt(){var b,r;const g=i.querySelectorAll(".bonding-channel-item");g.forEach(w=>{w.onclick=async $=>{if($.target.closest(".bonding-channel-del-btn"))return;const E=w.dataset.channelId,T=d.find(O=>O._id===E);T&&(l=T,g.forEach(O=>O.classList.remove("active")),w.classList.add("active"),qe(),await De(T._id))}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(w=>{w.onclick=async $=>{$.stopPropagation();const E=w.dataset.channelId,T=d.find(B=>B._id===E),O=T&&T.type==="direct",u=O?"this 1-on-1 chat":`the group "${(T==null?void 0:T.name)||""}"`;if(confirm(`Are you sure you want to delete ${u}? All messages will be permanently removed.`))try{w.disabled=!0,await Qe(`/bonding/channels/${E}`),S(O?"1-on-1 chat deleted":"Group deleted","success"),d=d.filter(B=>B._id!==E),l&&l._id===E&&(l=d[0]||null,qe(),l&&await De(l._id)),Ke()}catch(B){S(B.message||"Failed to delete conversation","error"),w.disabled=!1}}}),(b=i.querySelector("#btn-create-group"))==null||b.addEventListener("click",y),(r=i.querySelector("#btn-new-direct-chat"))==null||r.addEventListener("click",R)}function qe(){const g=i.querySelector("#bonding-chat-panel");if(!g)return;if(!l){g.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const b=v(l.displayName||l.name),r=(l.members||[]).length,w=l.type==="group",$=(e==null?void 0:e._id)||(e==null?void 0:e.id),E=w?null:(l.members||[]).find(T=>{var O;return((O=T.userId)==null?void 0:O.toString())!==($==null?void 0:$.toString())});g.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${w?l.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${b}</div>
            <div class="bonding-chat-sub">
              ${w?`<span>${r} members</span> · <span>${v(l.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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
        ${it()}
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
    `,Re(E),fe(E),tt(),j()}function it(){if(!n||n.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const g=(e==null?void 0:e._id)||(e==null?void 0:e.id);return n.map(b=>{var T,O,u,B,q,se,te,pe,Z;const r=b.sender&&b.sender.userId&&g&&b.sender.userId.toString()===g.toString();if(b.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${b._id}">
            <span>ℹ️</span> <span>${v(b.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${b._id}" title="Delete Message">&times;</button>
          </div>
        `;if(b.type==="challenge"&&b.challengeData){const H=b.challengeData,Y=H.gameTitle||"Game Challenge",ne=H.gameType||"chess",he=ne==="chess"?"♟️":ne==="ludo"?"🎲":"❌",Se=(T=H.gameState)==null?void 0:T.invitationId,Te=(O=H.targetUserId)==null?void 0:O.toString(),Pe=(B=(u=b.sender)==null?void 0:u.userId)==null?void 0:B.toString(),be=g&&Te===g.toString(),me=g&&Pe===g.toString();return`
          <div class="bonding-msg-row ${r?"self":"other"}" data-msg-id="${b._id}">
            <div class="bonding-msg-avatar" title="${v(((q=b.sender)==null?void 0:q.name)||"Teammate")}">
              ${(((se=b.sender)==null?void 0:se.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${v(((te=b.sender)==null?void 0:te.name)||"Teammate")}</span>
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
                    <h4 class="game-bubble-title">${v(Y)}</h4>
                    <p class="game-bubble-desc">${v(b.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${H.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':H.status==="active"||H.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${v(((pe=H.status)==null?void 0:pe.toUpperCase())||"COMPLETED")}</span>`}
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

              ${nt(b)}
            </div>
          </div>
        `}const w=v(((Z=b.sender)==null?void 0:Z.name)||"Teammate"),$=ee(b.createdAt),E=nt(b);return`
        <div class="bonding-msg-row ${r?"self":"other"}" data-msg-id="${b._id}">
          <div class="bonding-msg-avatar" title="${w}">${w.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${w}</span>
              <span class="bonding-msg-time">${$}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${b._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${v(b.content).replace(/\n/g,"<br/>")}
            </div>
            ${E}
          </div>
        </div>
      `}).join("")}function nt(g){return`
      <div class="bonding-reactions-row">
        ${(g.reactions||[]).map(w=>{const $=(e==null?void 0:e._id)||(e==null?void 0:e.id);return`
        <button class="bonding-rxn-tag ${(w.users||[]).some(T=>T.toString()===($==null?void 0:$.toString()))?"active":""}" data-msg-id="${g._id}" data-emoji="${w.emoji}">
          <span>${w.emoji}</span> <span>${w.users?w.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${g._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function Re(g){const b=i.querySelector("#btn-chat-challenge");b&&(b.onclick=()=>{g?D(null,g.userId||g._id):D()});const r=i.querySelector("#btn-manage-members");r&&(r.onclick=z);const w=i.querySelector("#btn-delete-group");w&&(w.onclick=G);const $=i.querySelector("#btn-delete-direct");$&&($.onclick=async()=>{if(l&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{$.disabled=!0,await Qe(`/bonding/channels/${l._id}`),S("1-on-1 chat deleted successfully","success");const T=l._id;d=d.filter(O=>O._id!==T),l=d[0]||null,Ke(),qe(),l&&await De(l._id)}catch(T){S(T.message||"Could not delete 1-on-1 chat","error"),$.disabled=!1}});const E=i.querySelector("#btn-clear-chat");E&&(E.onclick=async()=>{if(l&&confirm("Are you sure you want to clear all messages in this conversation?"))try{E.disabled=!0,await Qe(`/bonding/channels/${l._id}/messages`),S("Chat messages cleared","success"),n=[],a()}catch(T){S(T.message||"Could not clear chat messages","error")}finally{E.disabled=!1}})}function fe(g){const b=i.querySelector("#bonding-message-input"),r=i.querySelector("#btn-send-message"),w=i.querySelector("#btn-quick-emoji"),$=i.querySelector("#btn-input-challenge");b&&b.addEventListener("keydown",E=>{E.key==="Enter"&&!E.shiftKey&&(E.preventDefault(),ye())}),r&&(r.onclick=ye),$&&($.onclick=()=>{g?D(null,g.userId||g._id):D()}),w&&(w.onclick=()=>{if(!b)return;const E=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],T=E[Math.floor(Math.random()*E.length)];b.value+=(b.value?" ":"")+T,b.focus()})}function tt(){i.querySelectorAll(".btn-respond-invite").forEach(w=>{w.onclick=async()=>{const $=w.dataset.inviteId,E=w.dataset.action;await V($,E)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(w=>{w.onclick=async()=>{const $=w.dataset.inviteId;try{w.disabled=!0;const E=await Ue("/bonding/invitations"),T=(E.incoming||[]).concat(E.sent||[]).find(O=>O._id===$);T&&T.matchId?W(T.matchId):S("Match has not started yet or has expired","warning")}catch(E){S(E.message||"Could not load match","error")}finally{w.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(w=>{w.onclick=async $=>{$.stopPropagation();const E=w.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{w.disabled=!0,await Qe(`/bonding/messages/${E}`),n=n.filter(T=>T._id!==E),I(),S("Message deleted","success")}catch(T){S(T.message||"Failed to delete message","error"),w.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(w=>{w.onclick=async()=>{const $=w.dataset.msgId,E=w.dataset.emoji;await c($,E)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(w=>{w.onclick=$=>{const E=w.dataset.msgId;K($.currentTarget,async T=>{await c(E,T)})}})}async function ye(){const g=i.querySelector("#bonding-message-input");if(!g||!l||x)return;const b=g.value.trim();if(b)try{x=!0,g.value="";const r=await je(`/bonding/channels/${l._id}/messages`,{content:b,type:"text"});n.push(r),a(),j()}catch(r){S(r.message||"Failed to send message","error")}finally{x=!1,g.focus()}}async function c(g,b){try{const r=await je(`/bonding/messages/${g}/react`,{emoji:b}),w=n.find($=>$._id===g);w&&(w.reactions=r,I())}catch(r){S(r.message||"Failed to react","error")}}function j(){const g=i.querySelector("#bonding-messages-feed");g&&(g.scrollTop=g.scrollHeight)}function I(){const g=i.querySelector("#bonding-messages-feed");if(!g)return;const b=g.scrollHeight-g.scrollTop<=g.clientHeight+80;g.innerHTML=it(),tt(),b&&j()}function a(){const g=i.querySelector("#bonding-messages-feed");g&&(g.innerHTML=it(),tt())}async function s(g=!1){const b=i.querySelector("#bonding-lounge-main-wrap");if(b){g||(b.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const r=await Ue("/bonding/games/overview");_=r;const w=r.myStats||{},$=r.availableGames||[],E=r.incomingChallenges||[],T=r.sentChallenges||[],O=r.activeMatches||[],u=r.recentMatches||[],B=(e==null?void 0:e._id)||(e==null?void 0:e.id);b.innerHTML=`
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
              ${$.map(q=>`
                <div class="lounge-game-card" data-game-id="${q.id}">
                  <div class="game-card-icon">${q.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${v(q.name)}</h4>
                    <p class="game-card-desc">${v(q.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${q.duration}</span>
                      ${q.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${q.id}" data-game-title="${v(q.name)}">
                    ${q.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${E.length+T.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${E.length})</h5>
              ${E.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${E.map(q=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(q.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(q.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${v(q.sender.name)}</strong> (${v(q.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${q._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${q._id}" data-action="decline">
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
                    ${T.map(q=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(q.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(q.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${v(q.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${q._id}" data-action="cancel">
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
                    ${O.map(q=>{const te=B&&q.player1.userId.toString()===B.toString()?q.player2:q.player1,pe=B&&q.currentTurnUserId&&q.currentTurnUserId.toString()===B.toString();return`
                        <div class="lounge-active-match-card ${pe?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${q.gameType==="chess"?"♟️":q.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${v(q.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${v(te.name)}</strong> (${v(te.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${pe?"my-turn":"wait"}">
                              ${pe?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${q._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${q._id}" title="Delete Match">
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
                  ${u.map(q=>{const te=B&&q.player1.userId.toString()===B.toString()?q.player2:q.player1,pe=B&&q.winnerId&&q.winnerId.toString()===B.toString(),Z=q.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${v(q.gameTitle)}</span>
                          <span class="recent-date">${ee(q.completedAt||q.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${q._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${v(te.name)}</strong></div>
                          <div class="recent-outcome ${pe?"win":Z?"draw":"loss"}">
                            ${pe?"🏆 VICTORY":Z?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${v(q.winningReason||q.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${q._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${q._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,C()}catch(r){b.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${v(r.message)}</p>
        </div>
      `}}}function C(){i.querySelectorAll(".btn-challenge-game").forEach(b=>{b.onclick=()=>{const r=b.dataset.gameId;D(r)}}),i.querySelectorAll(".btn-respond-invite").forEach(b=>{b.onclick=async()=>{const r=b.dataset.inviteId,w=b.dataset.action;await V(r,w),await s()}}),i.querySelectorAll(".btn-resume-match").forEach(b=>{b.onclick=()=>{const r=b.dataset.matchId;W(r)}}),i.querySelectorAll(".btn-recent-rematch").forEach(b=>{b.onclick=async()=>{const r=b.dataset.matchId;try{b.disabled=!0;const w=await je(`/bonding/matches/${r}/action`,{action:"rematch"});w.match&&(S("Rematch created! Opening arena ⚔️","success"),W(w.match._id))}catch(w){S(w.message||"Could not start rematch","error")}finally{b.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(b=>{b.onclick=async r=>{r.stopPropagation();const w=b.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{b.disabled=!0,await Qe(`/bonding/matches/${w}`),S("Match deleted successfully","success"),await s()}catch($){S($.message||"Failed to delete match","error")}finally{b.disabled=!1}}});const g=i.querySelector("#btn-clear-matches");g&&(g.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{g.disabled=!0,await Qe("/bonding/matches?filter=completed"),S("Completed matches history cleared","success"),await s()}catch(b){S(b.message||"Failed to clear matches","error")}finally{g.disabled=!1}})}function D(g=null,b=null){const r=i.querySelector("#bonding-modals-root"),w=(e==null?void 0:e._id)||(e==null?void 0:e.id),$=new Set(["employee","admin","superadmin"]),E=f.filter(pe=>!pe.isSelf&&pe._id.toString()!==(w==null?void 0:w.toString())&&$.has(pe.role));let T=g||"chess",O=b?b.toString():null,u=2,B=O?[O]:[],q="none";function se(){const pe=E.find(ne=>ne._id.toString()===O),Z=T==="ludo",H=u-1,Y=B.length===H;r.innerHTML=`
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
                  ${Z?`Step 3 — Select Colleagues to Play With (${B.length}/${H} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${E.map(ne=>{const he=Z?B.includes(ne._id.toString()):O===ne._id.toString();return`
                      <div class="eligible-emp-item ${he?"selected":""}" data-user-id="${ne._id}">
                        <div class="emp-item-avatar">${ne.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${v(ne.name)}</span>
                          <span class="emp-item-role">${v(ne.role==="superadmin"?"Superadmin":ne.role==="admin"?"Admin":"Employee")} · ${v(ne.email||"")}</span>
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
                    <label class="timer-radio-lbl ${q==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${q==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${q==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${q==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${q==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${q==="5m"?"checked":""} />
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
                    <div><strong>Opponents:</strong> ${B.length>0?B.map(ne=>{const he=E.find(Se=>Se._id.toString()===ne);return he?`<strong>${v(he.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+H+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${pe?`<strong>${v(pe.name)}</strong> (${v(pe.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${T==="chess"?`<div><strong>Time Control:</strong> ${q==="none"?"Untimed":q}</div>`:""}
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
      `,te()}function te(){r.querySelector(".bonding-modal-close").onclick=()=>{r.innerHTML=""},r.querySelector("#btn-cancel-challenge-flow").onclick=()=>{r.innerHTML=""},r.querySelectorAll(".game-pill-btn").forEach(H=>{H.onclick=()=>{T=H.dataset.game,se()}}),r.querySelectorAll(".ludo-mode-btn").forEach(H=>{H.onclick=()=>{u=Number(H.dataset.count),B=B.slice(0,u-1),se()}});const pe=r.querySelector("#flow-emp-search");pe&&(pe.oninput=H=>{const Y=H.target.value.toLowerCase().trim();r.querySelectorAll(".eligible-emp-item").forEach(ne=>{const he=ne.textContent.toLowerCase();ne.style.display=he.includes(Y)?"flex":"none"})}),r.querySelectorAll(".eligible-emp-item").forEach(H=>{H.onclick=()=>{const Y=H.dataset.userId;if(T==="ludo"){const ne=u-1;B.includes(Y)?B=B.filter(he=>he!==Y):B.length<ne?B.push(Y):B[ne-1]=Y}else O=Y;se()}}),r.querySelectorAll('input[name="timerMode"]').forEach(H=>{H.onchange=Y=>{q=Y.target.value,se()}});const Z=r.querySelector("#btn-submit-challenge-flow");Z&&(Z.onclick=async()=>{if(T==="ludo"){const H=u-1;if(B.length<H){S(`Please select ${H} colleague(s) to play with`,"warning");return}try{Z.disabled=!0,Z.textContent="Launching Match...";const Y=await je("/bonding/matches/instant-ludo",{playerCount:u,targetUserIds:B});r.innerHTML="",S(`Ludo match started (${u} Players)! 🎲`,"success"),Y&&Y._id&&W(Y._id)}catch(Y){S(Y.message||"Failed to start Ludo match","error"),Z.disabled=!1,Z.textContent=`Start ${u}P Ludo Match 🎲`}return}if(!O){S("Please select an employee to challenge","warning");return}try{Z.disabled=!0,Z.textContent="Sending Challenge...",await je("/bonding/invitations",{gameType:T,targetUserId:O,matchSettings:{timerMode:q},channelId:(l==null?void 0:l._id)||null}),S("Game challenge delivered! Awaiting acceptance ⚔️","success"),r.innerHTML="",l&&await De(l._id),o==="lounge_games"&&await s()}catch(H){S(H.message||"Could not send challenge","error"),Z.disabled=!1,Z.textContent="Send Challenge 🚀"}})}se()}async function V(g,b){if(!(!g||!b))try{const r=await Kt(`/bonding/invitations/${g}/respond`,{action:b});b==="accept"?(S("Challenge accepted! Entering match arena ⚔️","success"),r.match&&W(r.match._id)):b==="decline"?S("Challenge declined","info"):b==="cancel"&&S("Challenge cancelled","info"),l&&await De(l._id),o==="lounge_games"&&await s()}catch(r){S(r.message||"Action failed","error")}}async function W(g){if(!g)return;A=g,M&&clearInterval(M);const b=i.querySelector("#bonding-modals-root");let r=null,w=null,$=[];async function E(){try{return r=await Ue(`/bonding/matches/${g}`),r}catch(te){return S(te.message||"Could not load match","error"),T(),null}}if(r=await E(),!r)return;function T(){M&&clearInterval(M),A=null,b.innerHTML="",o==="lounge_games"&&s(!0),l&&De(l._id,!0)}M=setInterval(async()=>{var H,Y,ne,he;if(!A||A!==g){clearInterval(M);return}const te=(H=r==null?void 0:r.currentTurnUserId)==null?void 0:H.toString(),pe=r==null?void 0:r.status,Z=await E();Z&&(((Y=Z.currentTurnUserId)==null?void 0:Y.toString())!==te||Z.status!==pe||((ne=Z.moves)==null?void 0:ne.length)!==((he=r.moves)==null?void 0:he.length))&&O()},1500);function O(){var he,Se;if(!r)return;const te=(e==null?void 0:e._id)||(e==null?void 0:e.id),pe=te&&r.player1.userId.toString()===te.toString(),Z=pe?r.player1:r.player2,H=pe?r.player2:r.player1,Y=te&&r.currentTurnUserId&&r.currentTurnUserId.toString()===te.toString(),ne=r.status!=="active";b.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${r.gameType==="ludo"?"🎲":r.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${v(r.gameTitle)}</h3>
                  ${r.gameType==="ludo"&&((he=r.gameState)!=null&&he.players)?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${r.gameState.players.map(Te=>{var _e;const Pe=Te.userId&&Te.userId.toString()===(te==null?void 0:te.toString()),be={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Te.color]||"⚪",me=(((_e=r.gameState)==null?void 0:_e.turnColor)||r.turn)===Te.color;return`
                          <span class="player-tag ${Pe?"self":"opp"} ${me?"turn-active":""}">
                            ${be} <strong>${v(Te.name)}</strong> ${Pe?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${v(Z.name)} (You · <strong>${r.gameType==="ludo"?Z.assignedRole==="red"?"🔴 Red":"🟢 Green":r.gameType==="tictactoe"?Z.assignedRole==="X"?"✕":"◯":Z.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${v(H.name)} (<strong>${r.gameType==="ludo"?H.assignedRole==="red"?"🔴 Red":"🟢 Green":r.gameType==="tictactoe"?H.assignedRole==="X"?"✕":"◯":H.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${ne?"ended":Y?"my-turn":"opp-turn"}">
                ${ne?`<span>🏁 Finished (${v(r.winningReason||r.status)})</span>`:Y?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${v(H.name)}...</span>`}
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
                <span>🤝 ${v(H.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${r.gameType==="chess"?u(pe):""}
              ${r.gameType==="tictactoe"?B():""}
              ${r.gameType==="ludo"?q(pe):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${ne?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${r.winnerId&&r.winnerId.toString()===(te==null?void 0:te.toString())?"🏆":r.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${r.winnerId&&r.winnerId.toString()===(te==null?void 0:te.toString())?"VICTORY!":r.status==="draw"?"STALEMATE / DRAW":`${v(r.winnerName)} Wins!`}</h4>
                  <p>Reason: ${v(r.winningReason||"Match concluded")}</p>
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
      `,se(Y,pe,Z)}function u(te){var be;const pe=((be=r.gameState)==null?void 0:be.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Z=new ya(pe),H=te?r.player1.assignedRole==="white":r.player2.assignedRole==="white",Y={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},ne=H?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],he=H?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Se='<div class="chess-board-grid">';for(const me of he)for(const _e of ne){const Be=`${_e}${me}`,ke=Z.get(Be),N=(_e.charCodeAt(0)-97+me)%2!==0,U=w===Be,ce=$.includes(Be),we=ke?ke.color==="w"?Y[ke.type.toUpperCase()]:Y[ke.type]:"";Se+=`
            <div class="chess-sq ${N?"light":"dark"} ${U?"selected":""} ${ce?"legal-dot":""}" data-square="${Be}">
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
      `}function B(){var Z;const te=((Z=r.gameState)==null?void 0:Z.board)||Array(9).fill(null),pe=r.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${te.map((H,Y)=>{const ne=pe.includes(Y);return`
                <div class="ttt-cell ${H?"filled":"empty"} ${ne?"win-cell":""}" data-cell-idx="${Y}">
                  ${H==="X"?'<span class="ttt-x">✕</span>':H==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function q(te,pe,Z){var Rt;const H=r.gameState||{},Y=H.activeColors||["red","green"],ne=H.players||[{...r.player1,color:"red",assignedRole:"red",isBot:!1},{...r.player2,color:"green",assignedRole:"green",isBot:!1}],he=H.tokens||{},Se=L=>{const ie=he[L]||(L==="red"?H.p1Tokens:L==="green"?H.p2Tokens:[])||[];return Array.from({length:4},(ve,Fe)=>ie[Fe]||{id:Fe,step:-1})},Te=Se("red"),Pe=Se("green"),be=Se("yellow"),me=Se("blue"),_e=(e==null?void 0:e._id)||(e==null?void 0:e.id),Be=ne.find(L=>L.userId&&L.userId.toString()===(_e==null?void 0:_e.toString()))||ne[0],ke=(Be==null?void 0:Be.color)||(te?"red":"green"),N=H.turnColor||r.turn||"red",U=ke===N&&r.status==="active",ce=!!H.rolled,we=H.dice,Ae=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],Ee=[[7,1],[7,2],[7,3],[7,4],[7,5]],xt=[[1,7],[2,7],[3,7],[4,7],[5,7]],yt=[[7,13],[7,12],[7,11],[7,10],[7,9]],kt=[[13,7],[12,7],[11,7],[10,7],[9,7]],h=[0,8,13,21,26,34,39,47];function ct(L,ie){return ie<0?null:ie>=56?L==="red"?[7,6]:L==="green"?[6,7]:L==="yellow"?[7,8]:[8,7]:L==="red"?ie<=50?Ae[ie]:Ee[ie-51]:L==="green"?ie<=50?Ae[(13+ie)%52]:xt[ie-51]:L==="yellow"?ie<=50?Ae[(26+ie)%52]:yt[ie-51]:ie<=50?Ae[(39+ie)%52]:kt[ie-51]}function Ve(L,ie){return L!==ke||!U||!ce||!we||r.status!=="active"?!1:ie.step===-1?we===6:ie.step>=0&&ie.step+we<=56}const pt={},F=(L,ie)=>{ie.forEach(ve=>{if(ve.step>=0&&ve.step<56){const Fe=ct(L,ve.step);if(Fe){const Ze=Fe[0]+","+Fe[1];(pt[Ze]=pt[Ze]||[]).push({color:L,id:ve.id,step:ve.step,movable:Ve(L,ve)})}}})};Y.includes("red")&&F("red",Te),Y.includes("green")&&F("green",Pe),Y.includes("yellow")&&F("yellow",be),Y.includes("blue")&&F("blue",me);const ut={};Ae.forEach(([L,ie],ve)=>{ut[L+","+ie]=ve});const Me={};Ee.forEach(([L,ie],ve)=>{Me[L+","+ie]=ve+1});const Xe={};xt.forEach(([L,ie],ve)=>{Xe[L+","+ie]=ve+1});const Mt={};yt.forEach(([L,ie],ve)=>{Mt[L+","+ie]=ve+1});const Ye={};kt.forEach(([L,ie],ve)=>{Ye[L+","+ie]=ve+1});const Tt=[];for(let L=0;L<15;L++)for(let ie=0;ie<15;ie++){if(L<6&&ie<6||L<6&&ie>8||L>8&&ie<6||L>8&&ie>8||L>=6&&L<=8&&ie>=6&&ie<=8)continue;const ve=L+","+ie,Fe=ut[ve],Ze=Fe!==void 0&&h.includes(Fe),st=L===6&&ie===1,ot=L===1&&ie===8,gt=L===8&&ie===13,Bt=L===13&&ie===6,Zt=Me[ve],Nt=Xe[ve],ea=Mt[ve],He=Ye[ve];let p="ludo-cell";st?p+=" cell-red-start":ot?p+=" cell-green-start":gt?p+=" cell-yellow-start":Bt?p+=" cell-blue-start":Zt?p+=" cell-red-stretch":Nt?p+=" cell-green-stretch":ea?p+=" cell-yellow-stretch":He?p+=" cell-blue-stretch":Ze&&(p+=" cell-safe-star");const k=pt[ve]||[];Tt.push(`
            <div class="${p}" style="grid-row:${L+1};grid-column:${ie+1}" data-pos="${ve}">
              ${Ze?'<span class="cell-star-glyph">⭐</span>':""}
              ${st||ot||gt||Bt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${k.map(m=>`
                <div class="ludo-token token-${m.color} ${m.movable?"movable":""}" data-token-id="${m.id}" data-color="${m.color}" title="${m.color.toUpperCase()} Pawn ${m.id+1}">
                  <span>${m.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}const qt=["","⚀","⚁","⚂","⚃","⚄","⚅"];function ae(L){return!L||L.step===-1?"Base":L.step===56?"🏁 Home!":L.step>50?`H${L.step-50}`:`S${L.step}`}function jt(L,ie,ve,Fe,Ze){const st=`${L}-yard`;return ve?`
          <div class="ludo-yard ${st} ${N===L?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${ie}</span>
                ${Fe?`<small class="yard-player-lbl">${v(Fe.name)}${Fe.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${Ze.map((ot,gt)=>`
                  <div class="yard-token-slot">
                    ${ot.step===-1?`
                      <div class="ludo-token token-${L} ${Ve(L,ot)?"movable":""}" data-token-id="${ot.id}" data-color="${L}" title="${L.toUpperCase()} Pawn ${ot.id+1}">
                        <span>${ot.id+1}</span>
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
          `}const Lt=ne.find(L=>L.color==="red"),Qt=ne.find(L=>L.color==="green"),zt=ne.find(L=>L.color==="yellow"),Xt=ne.find(L=>L.color==="blue");return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${jt("red","🔴 Red Base",Y.includes("red"),Lt,Te)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${jt("green","🟢 Green Base",Y.includes("green"),Qt,Pe)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${jt("blue","🔵 Blue Base",Y.includes("blue"),Xt,me)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${jt("yellow","🟡 Yellow Base",Y.includes("yellow"),zt,be)}

            <!-- 5. Center Home Victory Zone (3x3) -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${Te.filter(L=>L.step===56).map(L=>`<span class="tok-finished red" title="Red Pawn ${L.id+1} Home">🔴${L.id+1}</span>`).join("")}
                  ${Pe.filter(L=>L.step===56).map(L=>`<span class="tok-finished green" title="Green Pawn ${L.id+1} Home">🟢${L.id+1}</span>`).join("")}
                  ${be.filter(L=>L.step===56).map(L=>`<span class="tok-finished yellow" title="Yellow Pawn ${L.id+1} Home">🟡${L.id+1}</span>`).join("")}
                  ${me.filter(L=>L.step===56).map(L=>`<span class="tok-finished blue" title="Blue Pawn ${L.id+1} Home">🔵${L.id+1}</span>`).join("")}
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
                  ${Se(ke).some(L=>Ve(ke,L))?"👉 Tap your <strong>glowing pawn</strong> to advance!":"No moves possible with this roll. Turn passing..."}
                </div>
              `:`
                <div class="ludo-prompt-text">
                  ${r.status==="active"?`⏳ Waiting for ${v(((Rt=ne.find(L=>L.color===N))==null?void 0:Rt.name)||"opponent")} (${N.toUpperCase()})...`:"🏁 Match Concluded"}
                </div>
              `}

              <div class="ludo-status-banner">
                ${v(H.lastActionText||"Match in progress.")}
              </div>
            </div>
          </div>

          <!-- Token Progress Strip for all active players -->
          <div class="ludo-progress-strip">
            ${Y.map(L=>{const ie=ne.find(Ze=>Ze.color===L),ve=Se(L),Fe={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[L];return`
                <div class="progress-pill ${L} ${N===L?"active-turn":""}">
                  <strong>${Fe} ${ie?v(ie.name):L.toUpperCase()}:</strong>
                  ${ve.map((Ze,st)=>`P${st+1}: ${ae(Ze)}`).join(" · ")}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function se(te,pe,Z){var Pe;b.querySelector("#btn-close-arena").onclick=T;const H=b.querySelector("#btn-arena-resign");H&&(H.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{H.disabled=!0,await je(`/bonding/matches/${g}/action`,{action:"resign"}),await E(),O()}catch(be){S(be.message||"Resign failed","error"),H.disabled=!1}});const Y=b.querySelector("#btn-arena-draw");Y&&(Y.onclick=async()=>{try{await je(`/bonding/matches/${g}/action`,{action:"offer_draw"}),S("Draw offer sent to opponent","info"),await E(),O()}catch(be){S(be.message||"Draw offer failed","error")}});const ne=b.querySelector("#btn-confirm-accept-draw");ne&&(ne.onclick=async()=>{try{await je(`/bonding/matches/${g}/action`,{action:"accept_draw"}),S("Draw agreed!","info"),await E(),O()}catch(be){S(be.message,"error")}});const he=b.querySelector("#btn-confirm-decline-draw");he&&(he.onclick=async()=>{try{await je(`/bonding/matches/${g}/action`,{action:"decline_draw"}),await E(),O()}catch(be){S(be.message,"error")}}),[b.querySelector("#btn-arena-delete-match"),b.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(be=>{be.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{be.disabled=!0,await Qe(`/bonding/matches/${g}`),S("Match deleted","success"),T(),o==="lounge_games"&&await s()}catch(me){S(me.message||"Failed to delete match","error"),be.disabled=!1}}});const Te=b.querySelector("#btn-arena-rematch-action");if(Te&&(Te.onclick=async()=>{try{Te.disabled=!0,Te.textContent="Creating Rematch...";const be=await je(`/bonding/matches/${g}/action`,{action:"rematch"});be.match&&(S("Rematch created! New match live ⚔️","success"),M&&clearInterval(M),W(be.match._id))}catch(be){S(be.message||"Rematch failed","error"),Te.disabled=!1,Te.textContent="🔄 Request Rematch"}}),r.gameType==="chess"&&te&&r.status==="active"){const be=((Pe=r.gameState)==null?void 0:Pe.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",me=new ya(be),_e=Z.assignedRole==="white"?"w":"b";b.querySelectorAll(".chess-sq").forEach(Be=>{Be.onclick=async()=>{const ke=Be.dataset.square;if(w){if(w===ke){w=null,$=[],O();return}if($.includes(ke)){const U=me.get(w);let ce;U&&U.type==="p"&&(ke.endsWith("8")||ke.endsWith("1"))&&(ce=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const we={from:w,to:ke,promotion:ce?ce.toLowerCase():void 0};w=null,$=[],r=await je(`/bonding/matches/${g}/move`,{move:we}),O()}catch(we){S(we.message||"Illegal chess move","error"),w=null,$=[],O()}return}}const N=me.get(ke);N&&N.color===_e?(w=ke,$=me.moves({square:ke,verbose:!0}).map(ce=>ce.to),O()):(w=null,$=[],O())}})}if(r.gameType==="tictactoe"&&te&&r.status==="active"&&b.querySelectorAll(".ttt-cell.empty").forEach(be=>{be.onclick=async()=>{const me=be.dataset.cellIdx;try{be.style.opacity="0.5",r=await je(`/bonding/matches/${g}/move`,{cellIndex:Number(me)}),O()}catch(_e){S(_e.message||"Invalid move","error")}}}),r.gameType==="ludo"&&r.status==="active"){const be=b.querySelector("#btn-ludo-roll");be&&te&&(be.onclick=async()=>{try{be.disabled=!0,be.textContent="Rolling 🎲...",r=await je(`/bonding/matches/${g}/move`,{action:"roll"}),O()}catch(me){S(me.message||"Failed to roll","error"),be.disabled=!1,be.textContent="🎲 Roll Dice"}}),te&&b.querySelectorAll(".ludo-token.movable").forEach(me=>{me.onclick=async _e=>{_e.stopPropagation();const Be=me.dataset.tokenId;try{me.style.opacity="0.5",r=await je(`/bonding/matches/${g}/move`,{action:"move",tokenId:Number(Be)}),O()}catch(ke){S(ke.message||"Invalid token move","error"),me.style.opacity="1"}}})}}O()}function z(){if(!l||l.type==="direct")return;const g=i.querySelector("#bonding-modals-root"),b=u=>u==="employee"||u==="admin"||u==="superadmin",r=l.members||[],w=new Set(r.map(u=>{var B;return(B=u.userId)==null?void 0:B.toString()})),$=f.filter(u=>b(u.role)&&!w.has(u._id.toString()));g.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${v(l.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${$.map(u=>`
                    <option value="${u._id}">${v(u.name)} (${v(u.role==="superadmin"?"Superadmin":u.role==="admin"?"Admin":"Employee")})</option>
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
              <label class="bonding-form-label">Current Members (${r.length}):</label>
              <div class="bonding-members-list">
                ${r.map(u=>{const B=(e==null?void 0:e._id)||(e==null?void 0:e.id),q=B&&u.userId&&u.userId.toString()===B.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(u.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${v(u.name)} ${q?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${v(u.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${u.userId}" data-name="${v(u.name)}">
                          ${q?"Leave Group":"Remove"}
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
    `,g.querySelector(".bonding-modal-close").onclick=()=>{g.innerHTML=""};const E=g.querySelector("#btn-modal-delete-group");E&&(E.onclick=()=>{g.innerHTML="",G()});const T=g.querySelector("#btn-submit-add-member");T&&(T.onclick=async()=>{const B=g.querySelector("#sel-add-colleague").value;if(!B){S("Please select a colleague to add","warning");return}try{T.disabled=!0,T.textContent="Adding...";const q=await Kt(`/bonding/channels/${l._id}/members`,{action:"add",userIds:[B]});S("Colleague added to group! 🎉","success"),l=q.channel,g.innerHTML="",await De(l._id),qe()}catch(q){S(q.message||"Failed to add member","error"),T.disabled=!1,T.textContent="Add to Group"}}),g.querySelectorAll(".btn-remove-member").forEach(u=>{u.onclick=async()=>{const B=u.dataset.userId,q=u.dataset.name;if(confirm(`Are you sure you want to remove ${q} from this group?`))try{u.disabled=!0;const se=await Kt(`/bonding/channels/${l._id}/members`,{action:"remove",userId:B});S(`${q} removed from group`,"info"),l=se.channel,g.innerHTML="",await De(l._id),qe()}catch(se){S(se.message||"Failed to remove member","error"),u.disabled=!1}}})}async function G(){if(!l||l.type==="direct")return;const g=l.name;if(confirm(`Are you sure you want to delete the group "${g}"?

All messages in this lounge will be deleted.`))try{await Qe(`/bonding/channels/${l._id}`),S(`Group "${g}" deleted successfully`,"success"),d=await Ue("/bonding/channels").catch(()=>[]),l=d.find(r=>r.type==="group")||d[0]||null,Ke(),qe(),l&&await De(l._id)}catch(r){S(r.message||"Failed to delete group","error")}}function R(){const g=i.querySelector("#bonding-modals-root"),b=$=>$==="employee"||$==="admin"||$==="superadmin",r=f.filter($=>!$.isSelf&&b($.role));g.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${r.map($=>`
                <div class="bonding-user-pick-item" data-user-id="${$._id}" data-name="${v($.name)}">
                  <div class="bonding-member-avatar">${$.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${v($.name)}</span>
                    <span class="user-pick-role">${v($.role==="superadmin"?"Superadmin":$.role==="admin"?"Admin":"Employee")} · ${v($.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,g.querySelector(".bonding-modal-close").onclick=()=>{g.innerHTML=""},g.querySelectorAll(".bonding-user-pick-item").forEach($=>{$.onclick=async()=>{const E=$.dataset.userId;try{const T=await je("/bonding/channels",{type:"direct",targetUserId:E});g.innerHTML="",d=await Ue("/bonding/channels"),l=d.find(O=>O._id===T._id)||T,Ke(),qe(),await De(l._id)}catch(T){S(T.message||"Failed to open personal chat","error")}}})}function y(){const g=i.querySelector("#bonding-modals-root"),b=T=>T==="employee"||T==="admin"||T==="superadmin",r=f.filter(T=>!T.isSelf&&b(T.role));g.innerHTML=`
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
                    <span>${v(T.name)} (${v(T.role==="superadmin"?"Superadmin":T.role==="admin"?"Admin":"Employee")})</span>
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
    `,g.querySelector(".bonding-modal-close").onclick=()=>{g.innerHTML=""},g.querySelector("#btn-cancel-create-grp").onclick=()=>{g.innerHTML=""};let w="👥";const $=g.querySelectorAll(".avatar-opt");$.forEach(T=>{T.onclick=()=>{$.forEach(O=>O.classList.remove("active")),T.classList.add("active"),w=T.textContent.trim()}});const E=g.querySelector("#btn-confirm-create-grp");E.onclick=async()=>{const T=g.querySelector("#new-group-name"),O=g.querySelector("#new-group-desc"),u=T.value.trim();if(!u){S("Please enter a group name","warning"),T.focus();return}const B=g.querySelectorAll(".new-group-member-chk:checked"),q=Array.from(B).map(se=>se.value);try{E.disabled=!0,E.textContent="Creating...";const se=await je("/bonding/channels",{type:"group",name:u,description:O.value.trim(),avatar:w,memberIds:q});S(`Group "${u}" created! 🎉`,"success"),g.innerHTML="",d=await Ue("/bonding/channels"),l=d.find(te=>te._id===se._id)||se,Ke(),qe(),await De(l._id)}catch(se){S(se.message||"Failed to create group","error"),E.disabled=!1,E.textContent="Create Group 🎉"}}}function K(g,b){const r=document.querySelector(".bonding-emoji-popup");r&&r.remove();const w=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],$=document.createElement("div");$.className="bonding-emoji-popup",$.innerHTML=w.map(O=>`<button class="emoji-opt-btn" data-e="${O}">${O}</button>`).join("");const E=g.getBoundingClientRect();$.style.top=`${E.bottom+window.scrollY+6}px`,$.style.left=`${E.left+window.scrollX}px`,document.body.appendChild($),$.querySelectorAll(".emoji-opt-btn").forEach(O=>{O.onclick=u=>{u.stopPropagation(),b(O.dataset.e),$.remove()}});const T=O=>{$.contains(O.target)||($.remove(),document.removeEventListener("click",T))};setTimeout(()=>document.addEventListener("click",T),10)}function ee(g){if(!g)return"";try{return new Date(g).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Qa(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}const ca=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],Ct=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Dt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ai(i,t={}){const{userRole:e="employee",currentUser:o=null,initialTicketId:d=null}=t,l=e==="superadmin"||e==="admin";if(e==="client"||o&&o.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let f=[],n={},_=[],P=[],x={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},A=null,M="comments",Q=!1;i.innerHTML=`
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
            ${Ct.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
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
  `,await Promise.all([ze(),xe(),lt(),rt()]),De(),Ke(),dt(),nt(),d&&tt(d);const X=setInterval(()=>{if(!document.contains(i)){clearInterval(X);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!A&&fe()},12e3),Ce=()=>{document.contains(i)&&!A&&fe()};window.addEventListener("focus",Ce);async function xe(){try{const a=new URLSearchParams;x.search&&a.set("search",x.search),x.priority!=="all"&&a.set("priority",x.priority),x.category!=="all"&&a.set("category",x.category),x.assigneeId!=="all"&&a.set("assigneeId",x.assigneeId),x.jobId&&x.jobId!=="all"&&a.set("jobId",x.jobId),x.reporterId&&x.reporterId!=="all"&&a.set("reporterId",x.reporterId),x.scope==="created"&&a.set("reporterId",(o==null?void 0:o._id)||(o==null?void 0:o.id)),x.scope==="assigned"&&a.set("assigneeId",(o==null?void 0:o._id)||(o==null?void 0:o.id)),x.myIssuesOnly&&a.set("myIssuesOnly","true");const s=await Ue("/tickets?"+a.toString());f=Array.isArray(s)?s:[]}catch(a){S(a.message||"Failed to load tickets",!0),f=[]}}async function ze(){try{n=await Ue("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function lt(){try{_=(await Ue("/users")||[]).filter(s=>s.active&&s.role!=="client")}catch(a){console.warn("Could not fetch employees:",a)}}async function rt(){try{const a=await Ue("/jobs?limit=250");P=Array.isArray(a)?a:(a==null?void 0:a.jobs)||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function De(){const a=i.querySelector("#jira-stats-root");a&&(a.innerHTML=`
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
    `,a.querySelectorAll(".jira-stat-card").forEach(s=>{s.onclick=async()=>{const C=s.dataset.statFilter;C==="all"?(x.status="all",x.priority="all"):C==="critical"?(x.priority="Critical",x.status="all"):(x.status=C,x.priority="all"),await fe()}}))}function dt(){const a=i.querySelector("#jira-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${_.map(C=>`
          <option value="${C._id}" ${x.assigneeId===C._id.toString()?"selected":""}>
            ${v(C.name)} (${v(C.role)})
          </option>
        `).join("")}
      `);const s=i.querySelector("#jira-filter-job");s&&(s.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${P.map(C=>`
          <option value="${C._id}" ${x.jobId===C._id.toString()?"selected":""}>
            📁 ${v(C.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function Ke(){const a=i.querySelector("#jira-board-columns-root");if(!a)return;const s={};ca.forEach(C=>{s[C.key]=[]}),f.forEach(C=>{let D=C.status||"To Do";D==="In Progress"?D="Content":D==="Resolved"?D="Under Review":D==="Closed"&&(D="Ready to Leave"),s[D]||(s[D]=[]),s[D].push(C)}),a.innerHTML=ca.map(C=>{const D=s[C.key]||[];return`
        <div class="jira-board-column" data-status="${C.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${v(C.label)}</span>
              <span class="jira-col-badge">${D.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${C.key}">
            ${D.length===0?`
              <div style="padding:28px 10px;text-align:center;color:#475569;font-size:12px;font-style:italic;">
                No tickets
              </div>
            `:D.map(V=>vt(V)).join("")}
          </div>
        </div>
      `}).join(""),qe(),it()}function vt(a){const s=Ct.find(K=>K.key===a.category)||Ct[0],C=Dt.find(K=>K.key===a.priority)||Dt[2],D=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",V=(a.subtasks||[]).filter(K=>K.completed).length,W=(a.subtasks||[]).length,z=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],G=(o==null?void 0:o._id)||(o==null?void 0:o.id),R=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(G);let y="";if(z.length===0)y='<div class="jira-avatar unassigned" title="Unassigned">?</div>';else{const K=z.slice(0,3),ee=z.length-3;y=`
        <div class="jira-avatar-group">
          ${K.map(de=>{var oe;return`
            <div class="jira-avatar" title="Assignee: ${v(de.name||"Member")} (${v(de.role||"")})">
              ${(de.avatar||((oe=de.name)==null?void 0:oe.slice(0,1))||"U").toUpperCase()}
            </div>
          `}).join("")}
          ${ee>0?`
            <div class="jira-avatar extra-count" title="${ee} more assignees: ${v(z.slice(3).map(de=>de.name).join(", "))}">
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
            ${R?`
              <span class="jira-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${a.dueDate?`
              <span class="jira-due-pill ${D?"overdue":""}" title="Due Date">
                ${D?"⚠️ ":"📅 "}
                ${new Date(a.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          <button type="button" class="jira-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${v(a.ticketId)}" title="Delete Ticket">
            🗑️
          </button>
        </div>

        <div class="jira-card-title" title="${v(a.title)}">
          ${v(a.title)}
        </div>

        ${a.jobTitle||a.jobId&&a.jobId.title?`
          <div class="jira-card-job-link" title="Linked Internal Job: ${v(a.jobTitle||a.jobId.title)}">
            📁 ${v(a.jobTitle||a.jobId.title)}
          </div>
        `:""}

        <div class="jira-card-bottom">
          <div class="jira-card-id-row">
            <span class="jira-pri-icon" title="Priority: ${C.label}">${C.icon}</span>
            <span class="jira-ticket-id">${v(a.ticketId)}</span>
          </div>

          <div class="jira-card-assignee-row">
            ${W>0?`
              <span class="jira-subtask-badge" title="${V} of ${W} subtasks completed">
                ☑ ${V}/${W}
              </span>
            `:""}
            ${y}
          </div>
        </div>
      </div>
    `}function qe(){const a=i.querySelectorAll(".jira-card"),s=i.querySelectorAll(".jira-board-column");a.forEach(C=>{C.ondragstart=D=>{D.dataTransfer.setData("text/plain",C.dataset.ticketId),C.classList.add("dragging")},C.ondragend=()=>{C.classList.remove("dragging")}}),s.forEach(C=>{C.ondragover=D=>{D.preventDefault(),C.classList.add("drag-over")},C.ondragleave=()=>{C.classList.remove("drag-over")},C.ondrop=async D=>{D.preventDefault(),C.classList.remove("drag-over");const V=D.dataTransfer.getData("text/plain"),W=C.dataset.status;if(!V||!W)return;const z=f.find(R=>R._id.toString()===V);if(!z||z.status===W)return;const G=z.status;z.status=W,Ke();try{const R=await Je(`/tickets/${V}/status`,{status:W});S(`Moved ${R.ticketId} to ${W}`,!1),await fe()}catch(R){S(R.message||"Status update failed",!0),z.status=G,await fe()}}})}function it(){i.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async s=>{s.stopPropagation(),s.preventDefault();const C=a.dataset.ticketId,D=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${D}?`)){a.disabled=!0;try{await Qe(`/tickets/${C}`),S(`Ticket ${D} deleted`,!1),await fe()}catch(V){S(V.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),i.querySelectorAll(".jira-card").forEach(a=>{a.onclick=s=>{if(s.target.tagName==="A"||s.target.closest(".btn-delete-card-ticket"))return;const C=a.dataset.ticketId;tt(C)}})}function nt(){const a=i.querySelector("#btn-jira-refresh");a&&(a.onclick=async()=>{await fe(),S("Board updated",!1)});const s=i.querySelector("#btn-jira-create-ticket");s&&(s.onclick=()=>{I()});const C=i.querySelector("#jira-search-input");let D=null;C&&(C.oninput=J=>{clearTimeout(D),D=setTimeout(async()=>{x.search=J.target.value.trim(),Re(),await fe()},300)});const V=i.querySelector("#jira-filter-priority");V&&(V.onchange=async J=>{x.priority=J.target.value,Re(),await fe()});const W=i.querySelector("#jira-filter-category");W&&(W.onchange=async J=>{x.category=J.target.value,Re(),await fe()});const z=i.querySelector("#jira-filter-job");z&&(z.onchange=async J=>{x.jobId=J.target.value,Re(),await fe()});const G=i.querySelector("#jira-filter-assignee");G&&(G.onchange=async J=>{x.assigneeId=J.target.value,Re(),await fe()});const R=i.querySelector("#jira-pill-my-issues");R&&(R.onclick=async()=>{x.myIssuesOnly=!x.myIssuesOnly,R.classList.toggle("active",x.myIssuesOnly),Re(),await fe()});const y=i.querySelector("#jira-pill-scope-all"),K=i.querySelector("#jira-pill-scope-assigned"),ee=i.querySelector("#jira-pill-scope-created"),de=async J=>{x.scope=J,y&&y.classList.toggle("active",J==="all"),K&&K.classList.toggle("active",J==="assigned"),ee&&ee.classList.toggle("active",J==="created"),Re(),await fe()};y&&(y.onclick=()=>de("all")),K&&(K.onclick=()=>de("assigned")),ee&&(ee.onclick=()=>de("created"));const oe=i.querySelector("#jira-clear-filters");oe&&(oe.onclick=async()=>{x={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},C&&(C.value=""),V&&(V.value="all"),W&&(W.value="all");const J=i.querySelector("#jira-filter-job");J&&(J.value="all"),G&&(G.value="all"),R&&R.classList.remove("active"),y&&y.classList.add("active"),K&&K.classList.remove("active"),ee&&ee.classList.remove("active"),Re(),await fe()})}function Re(){const a=i.querySelector("#jira-clear-filters");if(!a)return;const s=x.search||x.priority!=="all"||x.category!=="all"||x.jobId&&x.jobId!=="all"||x.assigneeId!=="all"||x.myIssuesOnly||x.scope&&x.scope!=="all";a.style.display=s?"inline":"none"}async function fe(){await xe(),Ke()}async function tt(a){const s=i.querySelector("#jira-modals-root");if(s){s.innerHTML=`
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{A=await Ue(`/tickets/${a}`)}catch(C){S(C.message||"Could not load ticket",!0),s.innerHTML="";return}ye()}}function ye(){var $,E,T,O;const a=i.querySelector("#jira-modals-root");if(!a||!A)return;const s=A,C=Ct.find(u=>u.key===s.category)||Ct[0];Dt.find(u=>u.key===s.priority)||Dt[2];const D=s.subtasks||[],V=D.filter(u=>u.completed).length,W=D.length>0?Math.round(V/D.length*100):0,z=s.attachments||[],G=s.comments||[],R=(s.history||[]).slice().reverse(),y=s.workLogs||[],K=s.linkedTickets||[],ee=(o==null?void 0:o._id)||(o==null?void 0:o.id),de=s.reporter&&s.reporter.userId&&String(s.reporter.userId)===String(ee)||s.userId&&String(s.userId)===String(ee),oe=Array.isArray(s.assignees)&&s.assignees.length>0?s.assignees:s.assignee&&s.assignee.userId?[s.assignee]:[],J=oe.some(u=>u&&u.userId&&String(u.userId)===String(ee)),g=e==="superadmin"||e==="admin",b=g||de||J,r=($=s.jobId)!=null&&$._id?s.jobId._id.toString():s.jobId?s.jobId.toString():"",w=s.jobTitle||s.jobId&&s.jobId.title||"";a.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${C.slug}">${C.icon} ${C.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${v(s.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${v(s.title)}" title="Click to edit title" />
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
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${v(s.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${s.description?v(s.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Attachments Section (MP4 & heavy files up to 1GB supported) -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Attachments (${z.length})</span>
                  <label class="btn-jira-secondary" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>🎥 Upload File / MP4 Video (Up to 1GB)</span>
                    <input type="file" id="inp-detail-att-upload" multiple accept="*/*,video/mp4,video/*,.mp4,.mov,.webm,.avi" style="display:none;" />
                  </label>
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${z.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="jira-attachments-grid">
                    ${z.map(u=>{const B=u.type&&u.type.includes("video")||u.name&&u.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||u.url&&u.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="jira-att-card ${B?"is-video":""}" style="${B?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="jira-att-left">
                              <span style="font-size:${B?"16px":"13px"};">${B?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${u.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${v(u.name)}">
                                  ${v(u.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${Ht(u.size)} ${B?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${B?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${u.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${u.url}" download="${v(u.name)}" class="btn-jira-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="jira-att-del btn-del-att" data-att-id="${u.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${B?`
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
                  <span>Subtasks (${V}/${D.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${W}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${W}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${D.map(u=>`
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${u.id}" ${u.completed?"checked":""} />
                        <span class="jira-subtask-title ${u.completed?"done":""}">${v(u.title)}</span>
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
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${v(u.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${v(u.ticketId)}</span>
                          <span style="font-size:12.5px;color:#f1f5f9;">${v(u.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${v(u.status||"Open")}</span>
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
                    ${w?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${w?`
                  <div class="jira-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div style="font-weight:700;color:#f8fafc;font-size:13px;">${v(w)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${v(r)}</div>
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
                      ${P.map(u=>`
                        <option value="${u._id}" ${r===u._id.toString()?"selected":""}>
                          📁 ${v(u.title||"Untitled Job")}
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
                  <button type="button" class="jira-act-tab ${M==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${G.length})
                  </button>
                  <button type="button" class="jira-act-tab ${M==="history"?"active":""}" data-act-tab="history">
                    History (${R.length})
                  </button>
                  <button type="button" class="jira-act-tab ${M==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${y.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${M==="comments"?`
                  <div class="jira-comments-feed">
                    ${G.map(u=>`
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(u.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${v(u.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${v(u.userRole)})</span></span>
                            <span class="jira-comment-time">${ta(u.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${v(u.content)}</div>
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
                ${M==="history"?`
                  <div class="jira-history-feed">
                    ${R.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:R.map(u=>`
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(u.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${v(u.userName)}</span>
                            <span class="jira-comment-time">${ta(u.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong style="color:#cbd5e1;">${v(u.field)}</strong>:
                            ${u.from?`<span style="text-decoration:line-through;color:#ef4444;">${v(u.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${v(u.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${M==="worklog"?`
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

                    ${y.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:y.map(u=>`
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(u.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${v(u.userName)} logged <strong style="color:#38bdf8;">${v(u.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${ta(u.loggedAt)}</span>
                          </div>
                          ${u.description?`<div style="font-size:12px;color:#cbd5e1;">${v(u.description)}</div>`:""}
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
                  ${ca.map(u=>{let B=s.status||"To Do";return B==="In Progress"?B="Content":B==="Resolved"?B="Under Review":B==="Closed"&&(B="Ready to Leave"),`
                      <option value="${u.key}" ${B===u.key?"selected":""}>
                        ${u.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${Dt.map(u=>`
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
                  `:oe.map(u=>{var B;return`
                    <div class="jira-assignee-chip">
                      <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(u.avatar||((B=u.name)==null?void 0:B.slice(0,1))||"U").toUpperCase()}
                      </div>
                      <span class="jira-assignee-chip-name" title="${v(u.name)}">${v(u.name)}</span>
                      ${b?`
                        <button type="button" class="jira-assignee-chip-remove btn-remove-assignee" data-user-id="${u.userId}" title="Remove ${v(u.name)}">&times;</button>
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
                    ${_.map(u=>{const B=oe.some(q=>q&&q.userId&&String(q.userId)===String(u._id));return`
                        <label class="jira-emp-check-item ${B?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${u._id}" ${B?"checked":""} />
                          <div class="jira-avatar" style="width:18px;height:18px;font-size:9px;">${(u.name||"U").slice(0,1).toUpperCase()}</div>
                          <span style="font-size:12px;color:#f1f5f9;flex:1;">
                            ${v(u.name)} <span style="font-size:10.5px;color:#94a3b8;">(${v(u.role)})</span>
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
                    ${(((E=s.reporter)==null?void 0:E.name)||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${v(((T=s.reporter)==null?void 0:T.name)||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${v(((O=s.reporter)==null?void 0:O.role)||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${Ct.map(u=>`
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
                  ${P.map(u=>`
                    <option value="${u._id}" ${r===u._id.toString()?"selected":""}>
                      📁 ${v(u.title||"Untitled Job")}
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
    `,c()}function c(){const a=i.querySelector("#jira-modals-root");if(!a||!A)return;const s=a.querySelector("#btn-close-jira-modal");s&&(s.onclick=j);const C=a.querySelector("#jira-detail-backdrop");C&&(C.onclick=N=>{N.target===C&&j()});const D=a.querySelector("#inp-detail-title");D&&(D.onchange=async()=>{const N=D.value.trim();if(N)try{A=await Je(`/tickets/${A._id}`,{title:N}),await fe()}catch(U){S(U.message||"Failed to update title",!0)}});const V=a.querySelector("#btn-toggle-desc-edit");V&&(V.onclick=()=>{Q=!Q,ye()});const W=a.querySelector("#btn-cancel-desc");W&&(W.onclick=()=>{Q=!1,ye()});const z=a.querySelector("#btn-save-desc");z&&(z.onclick=async()=>{var U;const N=(U=a.querySelector("#inp-detail-desc"))==null?void 0:U.value;try{A=await Je(`/tickets/${A._id}`,{description:N}),Q=!1,ye(),await fe(),S("Description saved",!1)}catch(ce){S(ce.message||"Failed to save description",!0)}});const G=a.querySelector("#sel-detail-status");G&&(G.onchange=async N=>{try{const U=await Je(`/tickets/${A._id}/status`,{status:N.target.value});A=U,ye(),await ze(),De(),await fe(),S(`Status changed to ${U.status}`,!1)}catch(U){S(U.message||"Status change failed",!0)}});const R=a.querySelector("#sel-detail-priority");R&&(R.onchange=async N=>{try{A=await Je(`/tickets/${A._id}`,{priority:N.target.value}),ye(),await fe()}catch(U){S(U.message,!0)}});const y=a.querySelector("#btn-toggle-assignee-picker"),K=a.querySelector("#jira-detail-assignee-box"),ee=a.querySelector("#btn-close-detail-assignee-box"),de=a.querySelector("#btn-save-detail-assignees");y&&K&&(y.onclick=()=>{const N=K.style.display==="none";K.style.display=N?"block":"none"}),ee&&K&&(ee.onclick=()=>{K.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(N=>{N.onchange=()=>{var U;(U=N.closest(".jira-emp-check-item"))==null||U.classList.toggle("selected",N.checked)}}),de&&(de.onclick=async()=>{const N=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(U=>U.value);try{de.disabled=!0,A=await Je(`/tickets/${A._id}`,{assigneeIds:N}),ye(),await fe(),S("Assignees updated!",!1)}catch(U){S(U.message,!0),de.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(N=>{N.onclick=async()=>{var Ae;const U=N.dataset.userId,we=(Array.isArray(A.assignees)&&A.assignees.length>0?A.assignees:(Ae=A.assignee)!=null&&Ae.userId?[A.assignee]:[]).filter(Ee=>Ee&&Ee.userId&&String(Ee.userId)!==String(U)).map(Ee=>String(Ee.userId));try{A=await Je(`/tickets/${A._id}`,{assigneeIds:we}),ye(),await fe(),S("Assignee removed",!1)}catch(Ee){S(Ee.message,!0)}}});const oe=a.querySelector("#sel-detail-category");oe&&(oe.onchange=async N=>{try{A=await Je(`/tickets/${A._id}`,{category:N.target.value}),ye(),await fe()}catch(U){S(U.message,!0)}});const J=a.querySelector("#inp-detail-duedate");J&&(J.onchange=async N=>{try{A=await Je(`/tickets/${A._id}`,{dueDate:N.target.value||null}),ye(),await fe()}catch(U){S(U.message,!0)}});const g=a.querySelector("#sel-detail-job");g&&(g.onchange=async N=>{try{A=await Je(`/tickets/${A._id}`,{jobId:N.target.value||null}),ye(),await fe(),S(N.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(U){S(U.message,!0)}});const b=a.querySelector("#btn-toggle-job-link"),r=a.querySelector("#jira-job-link-box");b&&r&&(b.onclick=()=>{r.style.display=r.style.display==="none"?"block":"none"});const w=a.querySelector("#btn-cancel-job-link");w&&r&&(w.onclick=()=>{r.style.display="none"});const $=a.querySelector("#btn-save-job-link");$&&($.onclick=async()=>{var U;const N=((U=a.querySelector("#inp-modal-job-select"))==null?void 0:U.value)||null;try{A=await Je(`/tickets/${A._id}`,{jobId:N}),ye(),await fe(),S(N?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(ce){S(ce.message,!0)}});const E=a.querySelector("#btn-unlink-job");E&&(E.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{A=await Je(`/tickets/${A._id}`,{jobId:null}),ye(),await fe(),S("Job unlinked",!1)}catch(N){S(N.message,!0)}});const T=a.querySelector("#inp-detail-esthours");T&&(T.onchange=async N=>{try{A=await Je(`/tickets/${A._id}`,{estimatedHours:Number(N.target.value)||0})}catch(U){S(U.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(N=>{N.onchange=async()=>{const U=N.dataset.subtaskId;try{A=await Je(`/tickets/${A._id}/subtasks/${U}`,{completed:N.checked}),ye(),await fe()}catch(ce){S(ce.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(N=>{N.onclick=async()=>{const U=N.dataset.subtaskId;try{A=await Qe(`/tickets/${A._id}/subtasks/${U}`),ye(),await fe()}catch(ce){S(ce.message,!0)}}});const O=a.querySelector("#inp-new-subtask"),u=a.querySelector("#btn-add-subtask"),B=async()=>{const N=O==null?void 0:O.value.trim();if(N)try{A=await je(`/tickets/${A._id}/subtasks`,{title:N}),ye(),await fe()}catch(U){S(U.message,!0)}};u&&(u.onclick=B),O&&(O.onkeydown=N=>{N.key==="Enter"&&(N.preventDefault(),B())});const q=a.querySelector("#inp-detail-att-upload"),se=a.querySelector("#detail-att-upload-progress");q&&(q.onchange=async N=>{const U=Array.from(N.target.files);if(!U.length)return;const ce=[];se&&(se.style.display="block");for(let we=0;we<U.length;we++){const Ae=U[we];se&&(se.innerHTML=`
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
                <span>Uploading <strong>${v(Ae.name)}</strong> (${Ht(Ae.size)})...</span>
                <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
              </div>
              <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
                <div id="att-prog-bar" style="width:0%;height:100%;background:#38bdf8;transition:width 0.15s ease;"></div>
              </div>
            `);try{const Ee=await ga(Ae,xt=>{const yt=a.querySelector("#att-prog-pct"),kt=a.querySelector("#att-prog-bar");yt&&(yt.textContent=`${xt}%`),kt&&(kt.style.width=`${xt}%`)});Ee&&ce.push({name:Ee.name||Ae.name,url:Ee.url,size:Ee.size||Ae.size,type:Ee.type||Ae.type||"video/mp4"})}catch(Ee){console.error("Upload error for file:",Ae.name,Ee),S(`Upload failed for ${Ae.name}: ${Ee.message}`,!0)}}if(se&&(se.style.display="none"),ce.length)try{A=await je(`/tickets/${A._id}/attachments`,{attachments:ce}),ye(),S(`Successfully attached ${ce.length} file(s)! 🎥`,!1)}catch(we){S(we.message||"Failed to attach file(s)",!0)}}),a.querySelectorAll(".btn-play-att-video").forEach(N=>{N.onclick=()=>{const U=N.dataset.slot,ce=a.querySelector("#"+U);if(ce){const we=ce.style.display==="none";ce.style.display=we?"block":"none",N.textContent=we?"⏸ Close Video":"▶ Play Video";const Ae=ce.querySelector("video");Ae&&we?Ae.play().catch(()=>{}):Ae&&Ae.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(N=>{N.onclick=async()=>{const U=N.dataset.attId;try{A=await Qe(`/tickets/${A._id}/attachments/${U}`),ye()}catch(ce){S(ce.message,!0)}}}),a.querySelectorAll(".jira-act-tab").forEach(N=>{N.onclick=()=>{M=N.dataset.actTab,ye()}});const te=a.querySelector("#inp-new-comment"),pe=a.querySelector("#btn-submit-comment");pe&&te&&(pe.onclick=async()=>{const N=te.value.trim();if(N)try{pe.disabled=!0,pe.textContent="Saving...",A=await je(`/tickets/${A._id}/comments`,{content:N}),ye(),S("Comment added",!1)}catch(U){S(U.message||"Failed to add comment",!0)}finally{pe.disabled=!1}});const Z=a.querySelector("#btn-open-link-dialog"),H=a.querySelector("#jira-link-box"),Y=a.querySelector("#btn-cancel-link"),ne=a.querySelector("#btn-submit-link"),he=a.querySelector("#inp-link-target"),Se=a.querySelector("#sel-link-rel");Z&&H&&(Z.onclick=()=>{H.style.display="block"}),Y&&H&&(Y.onclick=()=>{H.style.display="none"}),ne&&H&&(ne.onclick=async()=>{const N=he==null?void 0:he.value.trim(),U=(Se==null?void 0:Se.value)||"relates to";if(N)try{ne.disabled=!0,A=await je(`/tickets/${A._id}/links`,{targetTicketId:N,relationship:U}),ye(),S(`Linked with ${N}`,!1)}catch(ce){S(ce.message||"Failed to link ticket",!0)}finally{ne.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(N=>{N.onclick=async()=>{const U=N.dataset.linkId;try{A=await Qe(`/tickets/${A._id}/links/${U}`),ye()}catch(ce){S(ce.message,!0)}}});const Te=a.querySelector("#btn-open-worklog-dialog"),Pe=a.querySelector("#jira-worklog-box"),be=a.querySelector("#btn-cancel-worklog"),me=a.querySelector("#btn-submit-worklog"),_e=a.querySelector("#inp-worklog-time"),Be=a.querySelector("#inp-worklog-desc");Te&&Pe&&(Te.onclick=()=>{Pe.style.display="block"}),be&&Pe&&(be.onclick=()=>{Pe.style.display="none"}),me&&Pe&&(me.onclick=async()=>{const N=_e==null?void 0:_e.value.trim(),U=Be==null?void 0:Be.value.trim();if(!N){S("Enter time spent (e.g. 2h 30m)",!0);return}try{me.disabled=!0,A=await je(`/tickets/${A._id}/worklogs`,{timeSpent:N,description:U}),ye(),S("Work logged",!1)}catch(ce){S(ce.message||"Failed to log work",!0)}finally{me.disabled=!1}});const ke=a.querySelector("#btn-delete-ticket");ke&&(ke.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${A.ticketId}?`))try{ke.disabled=!0,await Qe(`/tickets/${A._id}`),S(`Ticket ${A.ticketId} deleted`,!1),j(),await ze(),De(),await fe()}catch(N){S(N.message||"Failed to delete ticket",!0),ke.disabled=!1}})}function j(){A=null,Q=!1;const a=i.querySelector("#jira-modals-root");a&&(a.innerHTML="")}function I(a=null){const s=i.querySelector("#jira-modals-root");if(!s)return;const C=a||(x.jobId&&x.jobId!=="all"?x.jobId:null);s.innerHTML=`
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
                  ${Ct.map(r=>`<option value="${r.key}">${r.icon} ${r.label}</option>`).join("")}
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
                  ${_.map(r=>{const w=o&&String(o._id||o.id)===String(r._id);return`
                      <label class="jira-emp-check-item ${w?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${r._id}" ${w?"checked":""} />
                        <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(r.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span style="font-size:12px;color:#f1f5f9;flex:1;">
                          ${v(r.name)} <span style="font-size:10.5px;color:#94a3b8;">(${v(r.role)})${w?" — (You)":""}</span>
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
                  ${P.map(r=>`
                    <option value="${r._id}" ${C&&String(C)===String(r._id)?"selected":""}>
                      📁 ${v(r.title||"Untitled Job")}
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
    `;const D=()=>{s.querySelectorAll(".jira-emp-check-item").forEach(r=>{const w=r.querySelector(".chk-create-emp");r.classList.toggle("selected",!!(w!=null&&w.checked))})};s.querySelectorAll(".chk-create-emp").forEach(r=>{r.onchange=D});const V=s.querySelector("#btn-create-assign-self");V&&o&&(V.onclick=()=>{const r=String(o._id||o.id);s.querySelectorAll(".chk-create-emp").forEach(w=>{w.value===r&&(w.checked=!0)}),D()});const W=s.querySelector("#btn-create-clear-assign");W&&(W.onclick=()=>{s.querySelectorAll(".chk-create-emp").forEach(r=>{r.checked=!1}),D()});const z=[],G=s.querySelector("#inp-create-ticket-att"),R=s.querySelector("#create-att-list"),y=s.querySelector("#create-att-count"),K=s.querySelector("#create-att-progress"),ee=()=>{y&&(y.textContent=`${z.length} file(s) attached`),R&&(R.innerHTML=z.map((r,w)=>{const $=r.type&&r.type.includes("video")||r.name&&r.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="jira-att-card">
            <div class="jira-att-left">
              <span>${$?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="jira-att-name" title="${v(r.name)}">${v(r.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${Ht(r.size)} ${$?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="jira-att-del btn-del-pending-att" data-idx="${w}" title="Remove">&times;</button>
          </div>
        `}).join(""),R.querySelectorAll(".btn-del-pending-att").forEach(r=>{r.onclick=()=>{z.splice(Number(r.dataset.idx),1),ee()}}))};G&&(G.onchange=async r=>{const w=Array.from(r.target.files);if(w.length){K&&(K.style.display="block");for(const $ of w){K&&(K.innerHTML=`
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
                <span>Uploading <strong>${v($.name)}</strong> (${Ht($.size)})...</span>
                <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
              </div>
              <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
                <div id="create-prog-bar" style="width:0%;height:100%;background:#38bdf8;transition:width 0.15s ease;"></div>
              </div>
            `);try{const E=await ga($,T=>{const O=s.querySelector("#create-prog-pct"),u=s.querySelector("#create-prog-bar");O&&(O.textContent=`${T}%`),u&&(u.style.width=`${T}%`)});E&&(z.push({name:E.name||$.name,url:E.url,size:E.size||$.size,type:E.type||$.type||"video/mp4"}),ee())}catch(E){S(`Failed to upload ${$.name}: ${E.message}`,!0)}}K&&(K.style.display="none"),G.value=""}});const de=()=>{s.innerHTML=""},oe=s.querySelector("#btn-close-create-modal");oe&&(oe.onclick=de);const J=s.querySelector("#btn-cancel-create-ticket");J&&(J.onclick=de);const g=s.querySelector("#jira-create-backdrop");g&&(g.onclick=r=>{r.target===g&&de()});const b=s.querySelector("#btn-submit-create-ticket");b&&(b.onclick=async()=>{var q,se,te,pe,Z,H;const r=(q=s.querySelector("#create-ticket-title"))==null?void 0:q.value.trim(),w=(se=s.querySelector("#create-ticket-desc"))==null?void 0:se.value.trim(),$=((te=s.querySelector("#create-ticket-cat"))==null?void 0:te.value)||"Task",E=((pe=s.querySelector("#create-ticket-pri"))==null?void 0:pe.value)||"Medium",O=Array.from(s.querySelectorAll(".chk-create-emp:checked")).map(Y=>Y.value),u=((Z=s.querySelector("#create-ticket-duedate"))==null?void 0:Z.value)||null,B=((H=s.querySelector("#create-ticket-job"))==null?void 0:H.value)||null;if(!r){S("Ticket summary / title is required",!0);return}try{b.disabled=!0,b.textContent="Creating...";const Y=await je("/tickets",{title:r,description:w,category:$,priority:E,assigneeIds:O,assigneeId:O[0]||null,dueDate:u,jobId:B,attachments:z});S(`Ticket ${Y.ticketId} created! 🎫`,!1),de(),await ze(),De(),await fe(),tt(Y._id)}catch(Y){S(Y.message||"Could not create ticket",!0),b.disabled=!1,b.textContent="Create Ticket 🚀"}})}i._openCreateTicketModal=I,i._openTicketDetailModal=tt,i._setJobFilter=async a=>{x.jobId=a||"all";const s=i.querySelector("#jira-filter-job");s&&(s.value=x.jobId),Re(),await fe()}}export{ai as a,ti as b,ei as i};
