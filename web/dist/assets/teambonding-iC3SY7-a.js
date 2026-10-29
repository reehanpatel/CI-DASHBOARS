import{c as F,h as y,e as v,n as Ie,j as $e,o as ce,k as ye,g as G}from"./api-Chk_3u1-.js";const we={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function ze(){try{const u=localStorage.getItem("ci360_planner_settings");if(u)return Object.assign({},we,JSON.parse(u))}catch{}return Object.assign({},we)}function Te(u){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(u))}catch{}}function B(){const u=new Date,P=u.getFullYear(),x=String(u.getMonth()+1).padStart(2,"0"),$=String(u.getDate()).padStart(2,"0");return`${P}-${x}-${$}`}function pe(u,P){const x=new Date(u+"T00:00:00");x.setDate(x.getDate()+P);const $=x.getFullYear(),m=String(x.getMonth()+1).padStart(2,"0"),z=String(x.getDate()).padStart(2,"0");return`${$}-${m}-${z}`}function K(u){return u?new Date(u+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function _(u){return u?new Date(u+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function Se(u){return u?new Date(u+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function he(u,P=1){const x=new Date(u+"T00:00:00"),$=x.getDay(),m=($<P?7:0)+$-P,z=new Date(x);z.setDate(x.getDate()-m);const k=[];for(let i=0;i<7;i++){const L=new Date(z);L.setDate(z.getDate()+i);const J=L.getFullYear(),N=String(L.getMonth()+1).padStart(2,"0"),W=String(L.getDate()).padStart(2,"0");k.push(`${J}-${N}-${W}`)}return k}function Me(){try{const u=window.AudioContext||window.webkitAudioContext;if(!u)return;const P=new u,x=P.currentTime,$=P.createOscillator(),m=P.createGain();$.type="sine",$.frequency.setValueAtTime(523.25,x),$.frequency.exponentialRampToValueAtTime(783.99,x+.15),m.gain.setValueAtTime(.2,x),m.gain.exponentialRampToValueAtTime(.001,x+.35),$.connect(m),m.connect(P.destination),$.start(x),$.stop(x+.35)}catch{}}function Le(u,P={}){const{userRole:x="employee",currentUser:$=null,onNavigate:m=null}=P,z=x==="superadmin"||x==="admin";let k=ze(),i={selectedDate:B(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ae(),L();async function L(){i.loading=!0,J();try{const t=[F("/tasks")];z&&t.push(F("/personnel").catch(()=>[]));const[o,l]=await Promise.all(t);i.tasks=Array.isArray(o)?o:[],l&&(i.personnelList=Array.isArray(l)?l:[])}catch(t){y("Failed to load planner tasks: "+t.message,!0)}finally{i.loading=!1,C()}}function J(){u.innerHTML=`
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
    `}function N(t){return i.tasks.filter(o=>{var r;if(o.isDeleted===!0)return!1;if(z&&i.selectedPersonnelId!=="all"){const c=((r=o.personnelId)==null?void 0:r._id)||o.personnelId;if(String(c)!==String(i.selectedPersonnelId))return!1}const l=o.dateStr||(o.dueDate?new Date(o.dueDate).toISOString().slice(0,10):"");return l?l===t:t===B()})}function W(t,o){if(t.status==="Completed")return!1;const l=t.dateStr||(t.dueDate?new Date(t.dueDate).toISOString().slice(0,10):"");return l?l<o:!1}function E(t,o){const l=t.length,r=t.filter(d=>d.status==="Completed").length,c=t.filter(d=>d.status==="In Progress").length,e=t.filter(d=>d.status==="Pending"||d.status==="Todo").length,p=t.filter(d=>W(d,o)).length,s=l>0?Math.round(r/l*100):0;return{total:l,completed:r,inProgress:c,pending:e,overdue:p,percent:s}}function C(){const t=B(),o=i.selectedDate===t,l=N(i.selectedDate),r=E(l,t);u.innerHTML=`
      <div class="ci360-planner-wrap ${k.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${_(i.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${v(k.displayName||"Daily Planner")}</h1>
              <p class="ci360-planner-subheading">Plan your day. Track your progress.</p>
            </div>
          </div>

          <div class="ci360-planner-header-actions">
            <!-- View Mode Switcher -->
            <div class="ci360-view-switcher" role="tablist">
              <button type="button" class="ci360-switch-btn ${i.viewMode==="daily"?"active":""}" id="btnViewDaily" title="Daily View">
                <span>📅 Daily</span>
              </button>
              <button type="button" class="ci360-switch-btn ${i.viewMode==="weekly"?"active":""}" id="btnViewWeekly" title="Weekly View">
                <span>🗓️ Weekly</span>
              </button>
              <button type="button" class="ci360-switch-btn ${i.viewMode==="report"?"active":""}" id="btnViewReport" title="Weekly Analytics & Report">
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
              <span class="date-text" id="displayDateLabel">${K(i.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${i.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${o?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${z?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${i.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${i.personnelList.map(c=>`
                  <option value="${c._id}" ${i.selectedPersonnelId===String(c._id)?"selected":""}>
                    ${v(c.name)} (${v(c.department||c.role||"Team")})
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
          ${H(l,r)}
        </main>

      </div>
    `,ue(),me()}function H(t,o){return i.viewMode==="weekly"?X():i.viewMode==="report"?ge():te(t,o)}function te(t,o){const l=B();let r=t;if(i.filterStatus==="pending"?r=r.filter(c=>c.status==="Pending"||c.status==="Todo"):i.filterStatus==="in_progress"?r=r.filter(c=>c.status==="In Progress"):i.filterStatus==="completed"?r=r.filter(c=>c.status==="Completed"):i.filterStatus==="overdue"&&(r=r.filter(c=>W(c,l))),i.searchQuery){const c=i.searchQuery.toLowerCase();r=r.filter(e=>(e.title||"").toLowerCase().includes(c)||(e.description||"").toLowerCase().includes(c)||(e.category||"").toLowerCase().includes(c))}return r.sort((c,e)=>{if(c.status==="Completed"&&e.status!=="Completed")return 1;if(c.status!=="Completed"&&e.status==="Completed")return-1;const p={Urgent:0,High:1,Medium:2,Low:3};return(p[c.priority]||2)-(p[e.priority]||2)}),`
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
              <button type="button" class="filter-pill ${i.filterStatus==="all"?"active":""}" data-f="all">All (${o.total})</button>
              <button type="button" class="filter-pill ${i.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${o.pending})</button>
              <button type="button" class="filter-pill ${i.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${o.inProgress})</button>
              <button type="button" class="filter-pill ${i.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${o.completed})</button>
              ${o.overdue>0?`
                <button type="button" class="filter-pill overdue ${i.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${o.overdue})</button>
              `:""}
            </div>

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${v(i.searchQuery)}">
              ${i.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card -->
        <div class="ci360-quick-add-bar">
          <div class="ci360-quick-add-input-wrap">
            <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${_(i.selectedDate)}... (Press Enter to save)">
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
          ${r.length===0?be():`
            <div class="ci360-task-list">
              ${r.map(c=>R(c,l)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function be(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${_(i.selectedDate)}</h3>
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
    `}function R(t,o){var p,s,d,n;const l=t.status==="Completed",r=W(t,o),c=`pri-${(t.priority||"medium").toLowerCase()}`,e=`status-${(t.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${l?"is-completed":""} ${r?"is-overdue":""}" data-id="${t._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${l?"checked":""}" data-action="toggle" data-id="${t._id}" title="${l?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${v(t.title)}</span>
          </div>

          ${t.description?`
            <div class="ci360-task-desc">${v(t.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${c}">
              <span class="badge-dot"></span>
              ${v(t.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${e}">
              ${v(t.status||"Pending")}
            </span>

            <!-- Category -->
            ${t.category?`
              <span class="ci360-badge category-badge">
                #${v(t.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${t.startTime||t.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${t.startTime?v(t.startTime):""}
                   ${t.startTime&&t.dueTime?"–":""}
                   ${t.dueTime?v(t.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${r?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${z&&((p=t.personnelId)!=null&&p.name||(s=t.userId)!=null&&s.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${v(((d=t.personnelId)==null?void 0:d.name)||((n=t.userId)==null?void 0:n.name))}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${t._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${t._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function X(){const t=he(i.selectedDate,k.weekStartsOn),o=_(t[0]),l=_(t[6]),r=B();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${o} – ${l}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${t.map(c=>{const e=c===r,p=c===i.selectedDate,s=N(c),d=E(s,r);return`
              <div class="ci360-day-column ${e?"is-today":""} ${p?"is-selected":""}" data-date="${c}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${c}">
                  <div class="day-name">${Se(c)}</div>
                  <div class="day-number">${new Date(c+"T00:00:00").getDate()}</div>
                  ${e?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${d.completed}/${d.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${d.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${s.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:s.map(n=>`
                    <div class="ci360-mini-task-card ${n.status==="Completed"?"done":""}" data-id="${n._id}">
                      <button type="button" class="mini-check ${n.status==="Completed"?"checked":""}" data-action="toggle" data-id="${n._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${n._id}">
                        <div class="mini-title">${v(n.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(n.priority||"medium").toLowerCase()}">${n.priority||"Med"}</span>
                          ${n.dueTime?`<span class="mini-time">${v(n.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button -->
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${c}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function ge(){const t=he(i.selectedDate,k.weekStartsOn),o=K(t[0]),l=K(t[6]),r=B(),c=i.tasks.filter(b=>{if(b.isDeleted===!0)return!1;const g=b.dateStr||(b.dueDate?new Date(b.dueDate).toISOString().slice(0,10):"");return t.includes(g)}),e=c.length,p=c.filter(b=>b.status==="Completed").length,s=c.filter(b=>b.status==="In Progress").length,d=e>0?Math.round(p/e*100):0,n={Urgent:0,High:0,Medium:0,Low:0};return c.forEach(b=>{const g=b.priority||"Medium";n[g]!==void 0&&n[g]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${o} – ${l}</div>
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
            <span class="value" style="font-size:28px">${e}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${p}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${s}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${d}%</span>
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
                ${t.map(b=>{const g=N(b),a=E(g,r);return`
                    <tr>
                      <td><strong>${Se(b)}</strong></td>
                      <td>${_(b)}</td>
                      <td>${a.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${a.completed}</td>
                      <td>${a.pending+a.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${a.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${a.percent}%</span>
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
              <div style="font-size:22px;font-weight:700">${n.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${n.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${n.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${n.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function ue(){const t=document.getElementById("btnViewDaily"),o=document.getElementById("btnViewWeekly"),l=document.getElementById("btnViewReport");t&&(t.onclick=()=>{i.viewMode="daily",C()}),o&&(o.onclick=()=>{i.viewMode="weekly",C()}),l&&(l.onclick=()=>{i.viewMode="report",C()});const r=document.getElementById("btnPrevDay"),c=document.getElementById("btnNextDay"),e=document.getElementById("btnJumpToday"),p=document.getElementById("hiddenDateInput"),s=document.getElementById("datePickerBadge");r&&(r.onclick=()=>{i.selectedDate=pe(i.selectedDate,-1),C()}),c&&(c.onclick=()=>{i.selectedDate=pe(i.selectedDate,1),C()}),e&&(e.onclick=()=>{i.selectedDate=B(),C()}),s&&p&&(s.onclick=()=>{try{typeof p.showPicker=="function"?p.showPicker():p.focus()}catch{p.focus()}},p.onchange=D=>{D.target.value&&(i.selectedDate=D.target.value,C())});const d=document.getElementById("admTeamSelect");d&&(d.onchange=D=>{i.selectedPersonnelId=D.target.value,C()});const n=document.getElementById("btnOpenAddTaskModal");n&&(n.onclick=()=>Q());const b=document.getElementById("btnPlannerActionsMenu"),g=document.getElementById("plannerActionsDropdown");b&&g&&(b.onclick=D=>{D.stopPropagation(),g.classList.toggle("hidden")},document.addEventListener("click",D=>{!g.contains(D.target)&&D.target!==b&&g.classList.add("hidden")}));const a=document.getElementById("btnActionImport");a&&(a.onclick=()=>{g==null||g.classList.add("hidden"),Y()});const f=document.getElementById("btnActionExportPng");f&&(f.onclick=()=>{g==null||g.classList.add("hidden"),oe()});const h=document.getElementById("btnActionExportPdf");h&&(h.onclick=()=>{g==null||g.classList.add("hidden"),ee()});const S=document.getElementById("btnActionBackup");S&&(S.onclick=()=>{g==null||g.classList.add("hidden"),fe()});const w=document.getElementById("btnActionSettings");w&&(w.onclick=()=>{g==null||g.classList.add("hidden"),ne()})}function me(t){if(i.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(n=>{n.onclick=()=>{i.filterStatus=n.dataset.f,C()}});const o=document.getElementById("plannerTaskSearchInp");o&&(o.oninput=n=>{i.searchQuery=n.target.value,C()});const l=document.getElementById("btnClearSearch");l&&(l.onclick=()=>{i.searchQuery="",C()});const r=document.getElementById("quickAddTitleInp"),c=document.getElementById("quickAddPriority"),e=document.getElementById("quickAddCategory"),p=document.getElementById("btnQuickAddSubmit"),s=async()=>{const n=((r==null?void 0:r.value)||"").trim();if(!n){y("Please enter a task title",!0),r==null||r.focus();return}try{const b={title:n,dateStr:i.selectedDate,priority:(c==null?void 0:c.value)||k.defaultPriority,category:(e==null?void 0:e.value)||"General",status:"Pending"};z&&i.selectedPersonnelId!=="all"&&(b.personnelId=i.selectedPersonnelId);const g=await G("/tasks",b);i.tasks.unshift(g),y("Task added to today's focus! ✨"),r&&(r.value="",r.focus()),C()}catch(b){y(b.message,!0)}};p&&(p.onclick=s),r&&(r.onkeydown=n=>{n.key==="Enter"&&s()});const d=document.getElementById("btnEmptyStateImport");d&&(d.onclick=()=>Y())}if(i.viewMode==="weekly"){const o=document.getElementById("btnPrevWeek"),l=document.getElementById("btnNextWeek"),r=document.getElementById("btnThisWeek");o&&(o.onclick=()=>{i.selectedDate=pe(i.selectedDate,-7),C()}),l&&(l.onclick=()=>{i.selectedDate=pe(i.selectedDate,7),C()}),r&&(r.onclick=()=>{i.selectedDate=B(),C()}),document.querySelectorAll(".day-col-header").forEach(c=>{c.onclick=()=>{i.selectedDate=c.dataset.date,i.viewMode="daily",C()}}),document.querySelectorAll('[data-action="add-day"]').forEach(c=>{c.onclick=()=>{Q(null,c.dataset.date)}})}if(i.viewMode==="report"){const o=document.getElementById("btnDownloadWeeklyPdf");o&&(o.onclick=ee)}u.querySelectorAll('[data-action="toggle"]').forEach(o=>{o.onclick=async l=>{l.stopPropagation();const r=o.dataset.id;await Z(r)}}),u.querySelectorAll('[data-action="edit"]').forEach(o=>{o.onclick=l=>{l.stopPropagation();const r=o.dataset.id,c=i.tasks.find(e=>e._id===r);c&&Q(c)}}),u.querySelectorAll('[data-action="delete"]').forEach(o=>{o.onclick=async l=>{l.stopPropagation();const r=o.dataset.id;await ae(r)}})}async function Z(t){const o=i.tasks.find(r=>r._id===t);if(!o)return;const l=o.status!=="Completed";try{const r=await Ie(`/tasks/${t}/toggle`,{}),c=i.tasks.findIndex(e=>e._id===t);c!==-1&&(i.tasks[c]=r),l?(k.soundEnabled&&Me(),y("Task marked as completed! 🎉")):y("Task reopened as pending."),C()}catch(r){y(r.message,!0)}}async function ae(t){const o=i.tasks.find(l=>l._id===t);if(o&&confirm(`Are you sure you want to remove "${o.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await $e(`/tasks/${t}`),i.tasks=i.tasks.filter(l=>l._id!==t),y("Task removed from planner (safely stored in database archive)"),C()}catch(l){y(l.message,!0)}}function Q(t=null,o=null){const l=!!t,r=t?t.dateStr||(t.dueDate?new Date(t.dueDate).toISOString().slice(0,10):i.selectedDate):o||i.selectedDate,c=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${l?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${v((t==null?void 0:t.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${v((t==null?void 0:t.description)||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${r}" required>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${(t==null?void 0:t.startTime)||""}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${(t==null?void 0:t.dueTime)||""}">
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${(t==null?void 0:t.priority)==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!t&&k.defaultPriority==="Medium"||(t==null?void 0:t.priority)==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!t&&k.defaultPriority==="High"||(t==null?void 0:t.priority)==="High"?"selected":""}>High</option>
                <option value="Urgent" ${(t==null?void 0:t.priority)==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${(t==null?void 0:t.status)==="Pending"||(t==null?void 0:t.status)==="Todo"||!t?"selected":""}>Pending</option>
                <option value="In Progress" ${(t==null?void 0:t.status)==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${(t==null?void 0:t.status)==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${v((t==null?void 0:t.category)||"General")}">
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
          ${z?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!t||t!=null&&t.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${i.personnelList.map(b=>{var a;const g=((a=t==null?void 0:t.personnelId)==null?void 0:a._id)===b._id||(t==null?void 0:t.personnelId)===b._id;return`<option value="${b._id}" ${g?"selected":""}>${v(b.name)} (${v(b.department||b.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
            <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
              ${l?"Save Changes":"Create Task"}
            </button>
          </div>
        </form>
      </div>
    `,e=ce(c),p=e.querySelector("#taskForm"),s=e.querySelector("#btnModalClose"),d=e.querySelector("#btnCancelModal"),n=()=>e.remove();s&&(s.onclick=n),d&&(d.onclick=n),p.onsubmit=async b=>{var re;b.preventDefault();const g=e.querySelector("#taskTitle").value.trim(),a=e.querySelector("#taskDesc").value.trim(),f=e.querySelector("#taskDate").value,h=e.querySelector("#taskStartTime").value.trim(),S=e.querySelector("#taskDueTime").value.trim(),w=e.querySelector("#taskPriority").value,D=e.querySelector("#taskStatus").value,I=e.querySelector("#taskCategory").value.trim()||"General";if(!g){y("Task title is required",!0);return}const q={title:g,description:a,dateStr:f,startTime:h,dueTime:S,priority:w,status:D,category:I};if(z){const T=(re=e.querySelector("#taskAssignee"))==null?void 0:re.value;T==="all"?(q.assignAll=!0,q.personnelId="all"):T&&(q.personnelId=T)}const U=e.querySelector("#btnSaveTask");U.disabled=!0,U.textContent="Saving...";try{if(l){const T=await ye(`/tasks/${t._id}`,q),V=i.tasks.findIndex(ve=>ve._id===t._id);V!==-1&&(i.tasks[V]=T),y("Task updated successfully! ✍️")}else{const T=await G("/tasks",q);Array.isArray(T.tasks)?T.tasks.forEach(V=>i.tasks.unshift(V)):i.tasks.unshift(T),y("Task created successfully! ✨")}n(),C()}catch(T){y(T.message,!0),U.disabled=!1,U.textContent=l?"Save Changes":"Create Task"}}}function Y(){let t=[];const o=`
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
              <input type="date" id="importTargetDate" class="input" value="${i.selectedDate}">
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
    `,l=ce(o),r=()=>l.remove();l.querySelector("#btnImportClose").onclick=r,l.querySelector("#btnCancelImport").onclick=r;const c=l.querySelector("#importTextarea"),e=l.querySelector("#importFileInput"),p=l.querySelector("#importDropzone"),s=l.querySelector("#previewListArea"),d=l.querySelector("#previewCountLabel"),n=l.querySelector("#btnConfirmImport"),b=l.querySelector("#importFileInfo");function g(f){if(!f)return[];const h=f.split(/\r?\n/),S=[];for(let w of h)w=w.trim(),w&&(w=w.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),w=w.replace(/^[-*•]\s+/,""),w=w.replace(/^\d+[\.\)]\s+/,""),w=w.trim(),w&&S.push(w));return S}function a(){const f=c.value,h=g(f),S=l.querySelector("#importTargetDate").value,w=N(S),D=new Set(w.map(I=>(I.title||"").trim().toLowerCase()));t=[];for(const I of h){const q=D.has(I.toLowerCase());t.push({title:I,isDuplicate:q})}if(d.textContent=`Preview (${t.length} ${t.length===1?"task":"tasks"} found)`,n.disabled=t.length===0,n.textContent=`Import ${t.length} ${t.length===1?"Task":"Tasks"}`,t.length===0){s.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}s.innerHTML=t.map((I,q)=>`
        <div class="preview-item ${I.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${q+1}.</span>
          <span class="preview-title">${v(I.title)}</span>
          ${I.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}c.oninput=a,p.onclick=()=>e.click(),e.onchange=f=>{const h=f.target.files[0];if(!h)return;b.textContent=`File selected: ${h.name} (${Math.round(h.size/1024)} KB)`;const S=new FileReader;S.onload=w=>{c.value=w.target.result,a()},S.readAsText(h)},p.ondragover=f=>{f.preventDefault(),p.classList.add("dragover")},p.ondragleave=()=>p.classList.remove("dragover"),p.ondrop=f=>{f.preventDefault(),p.classList.remove("dragover");const h=f.dataTransfer.files[0];if(h&&(h.type==="text/plain"||h.name.endsWith(".txt"))){b.textContent=`File dropped: ${h.name}`;const S=new FileReader;S.onload=w=>{c.value=w.target.result,a()},S.readAsText(h)}else y("Please drop a valid .txt plain-text file",!0)},n.onclick=async()=>{if(t.length===0)return;n.disabled=!0,n.textContent="Importing...";const f=l.querySelector("#importTargetDate").value,h=l.querySelector("#importPriority").value,S=l.querySelector("#importCategory").value.trim()||"General",w={date:f,tasks:t.map(D=>({title:D.title,priority:h,category:S,status:"Pending"}))};z&&i.selectedPersonnelId!=="all"&&(w.personnelId=i.selectedPersonnelId);try{const D=await G("/tasks/bulk-import",w);Array.isArray(D.tasks)&&D.tasks.forEach(I=>i.tasks.unshift(I)),y(`Imported ${D.importedCount} tasks successfully! (${D.skippedCount} skipped duplicates)`),r(),i.selectedDate=f,C()}catch(D){y(D.message,!0),n.disabled=!1,n.textContent="Retry Import"}}}async function oe(){const t=N(i.selectedDate),o=E(t,B()),l=K(i.selectedDate),r=2,c=800,e=160,p=90,s=65,d=70,n=Math.max(120,t.length*s),b=e+p+n+d,g=document.createElement("canvas");g.width=c*r,g.height=b*r;const a=g.getContext("2d");a.scale(r,r);const f=document.documentElement.getAttribute("data-theme")==="dark",h=f?"#0F172A":"#F8FAFC",S=f?"#1E293B":"#FFFFFF",w=f?"#334155":"#E2E8F0",D=f?"#F8FAFC":"#0F172A",I=f?"#94A3B8":"#475569",q="#4F46E5",U="#10B981",re="#F59E0B";a.fillStyle=h,a.fillRect(0,0,c,b),a.fillStyle=S,O(a,24,20,c-48,e-30,16),a.fill(),a.strokeStyle=w,a.lineWidth=1,a.stroke(),a.fillStyle=q,a.font="bold 12px Inter, sans-serif",a.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),a.fillStyle=D,a.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',a.fillText(l,44,86),a.fillStyle=I,a.font="13px Inter, sans-serif",a.fillText(`Planned focus list · ${o.completed} of ${o.total} tasks completed (${o.percent}%)`,44,114);const T=e+6;a.fillStyle=S,O(a,24,T,c-48,p-16,12),a.fill(),a.stroke();const V=[{label:"TOTAL TASKS",val:String(o.total),color:D},{label:"COMPLETED",val:String(o.completed),color:U},{label:"IN PROGRESS",val:String(o.inProgress),color:re},{label:"PENDING",val:String(o.pending),color:I},{label:"PROGRESS",val:`${o.percent}%`,color:q}],ve=(c-48)/V.length;V.forEach((M,j)=>{const A=24+j*ve+20;a.fillStyle=M.color,a.font="bold 20px Inter, sans-serif",a.fillText(M.val,A,T+36),a.fillStyle=I,a.font="10px Inter, sans-serif",a.fillText(M.label,A,T+54)});const xe=T+p;a.fillStyle=S,O(a,24,xe,c-48,n+10,16),a.fill(),a.stroke(),t.length===0?(a.fillStyle=I,a.font="14px Inter, sans-serif",a.textAlign="center",a.fillText("No scheduled tasks recorded for this date.",c/2,xe+60),a.textAlign="left"):t.forEach((M,j)=>{const A=xe+16+j*s,ie=M.status==="Completed";a.beginPath(),a.arc(48,A+14,10,0,Math.PI*2),ie?(a.fillStyle=U,a.fill(),a.strokeStyle="#FFFFFF",a.lineWidth=2,a.beginPath(),a.moveTo(44,A+14),a.lineTo(47,A+17),a.lineTo(52,A+11),a.stroke()):(a.strokeStyle=w,a.lineWidth=2,a.stroke()),a.fillStyle=ie?I:D,a.font=`${ie?"normal":"500"} 14px Inter, sans-serif`;const ke=M.title.length>55?M.title.slice(0,52)+"...":M.title;if(a.fillText(ke,70,A+18),ie){const Pe=a.measureText(ke);a.strokeStyle=I,a.lineWidth=1.2,a.beginPath(),a.moveTo(70,A+14),a.lineTo(70+Pe.width,A+14),a.stroke()}const se=M.priority||"Medium";let de="#E2E8F0",le="#334155";se==="Urgent"?(de="#FEE2E2",le="#DC2626"):se==="High"?(de="#FEF3C7",le="#D97706"):se==="Low"&&(de="#ECFDF5",le="#059669"),a.fillStyle=de,O(a,c-150,A+4,60,20,10),a.fill(),a.fillStyle=le,a.font="bold 10px Inter, sans-serif",a.fillText(se,c-138,A+18);const Ce=M.dueTime?`🕒 ${M.dueTime}`:M.category||"General";a.fillStyle=I,a.font="11px Inter, sans-serif",a.fillText(Ce,70,A+34),j<t.length-1&&(a.strokeStyle=w,a.lineWidth=.6,a.beginPath(),a.moveTo(40,A+48),a.lineTo(c-40,A+48),a.stroke())});const De=b-35;a.fillStyle=I,a.font="11px Inter, sans-serif",a.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,De);try{const M=g.toDataURL("image/png"),j=document.createElement("a");j.href=M,j.download=`ci360-daily-planner-${i.selectedDate}.png`,document.body.appendChild(j),j.click(),j.remove(),y("Daily Planner image exported! 🖼️")}catch(M){y("Failed to export image: "+M.message,!0)}}function O(t,o,l,r,c,e){t.beginPath(),t.moveTo(o+e,l),t.lineTo(o+r-e,l),t.quadraticCurveTo(o+r,l,o+r,l+e),t.lineTo(o+r,l+c-e),t.quadraticCurveTo(o+r,l+c,o+r-e,l+c),t.lineTo(o+e,l+c),t.quadraticCurveTo(o,l+c,o,l+c-e),t.lineTo(o,l+e),t.quadraticCurveTo(o,l,o+e,l),t.closePath()}function ee(){const t=he(i.selectedDate,k.weekStartsOn),o=K(t[0]),l=K(t[6]);B();const r=i.tasks.filter(n=>{if(n.isDeleted===!0)return!1;const b=n.dateStr||(n.dueDate?new Date(n.dueDate).toISOString().slice(0,10):"");return t.includes(b)}),c=r.length,e=r.filter(n=>n.status==="Completed").length,p=c>0?Math.round(e/c*100):0,s=window.open("","_blank");if(!s){y("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const d=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${o}</title>
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
            <div class="period">${o} – ${l}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${c}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${e}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${c-e}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${p}%</div>
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
            ${t.map(n=>{const b=N(n);return b.length===0?`<tr><td><strong>${_(n)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:b.map(g=>`
                <tr>
                  <td><strong>${_(n)}</strong></td>
                  <td>${v(g.title)}</td>
                  <td><span class="badge badge-${(g.priority||"medium").toLowerCase().slice(0,3)}">${g.priority||"Medium"}</span></td>
                  <td>${v(g.category||"General")}</td>
                  <td>${g.dueTime||g.startTime||"—"}</td>
                  <td class="${g.status==="Completed"?"done":""}">${g.status||"Pending"}</td>
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
    `;s.document.write(d),s.document.close(),y("Weekly PDF report generated for printing! 📄")}function fe(){const o=ce(`
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
    `),l=()=>o.remove();o.querySelector("#btnBackupClose").onclick=l;const r=o.querySelector("#btnDownloadBackupJson");r.onclick=async()=>{r.disabled=!0,r.textContent="Generating backup...";try{const n=await F("/tasks/backup"),b=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),g=URL.createObjectURL(b),a=document.createElement("a");a.href=g,a.download=`ci360-planner-backup-${B()}.json`,document.body.appendChild(a),a.click(),a.remove(),y("Planner backup downloaded successfully! 💾")}catch(n){y("Backup export failed: "+n.message,!0)}finally{r.disabled=!1,r.textContent="Download JSON Backup"}};const c=o.querySelector("#restoreFileInput"),e=o.querySelector("#restorePreviewArea"),p=o.querySelector("#restoreCountText"),s=o.querySelector("#btnExecuteRestore");let d=null;c.onchange=n=>{const b=n.target.files[0];if(!b)return;const g=new FileReader;g.onload=a=>{try{const f=JSON.parse(a.target.result),h=Array.isArray(f.tasks)?f.tasks:Array.isArray(f)?f:null;if(!h||h.length===0){y("Invalid backup file: No tasks found",!0);return}d=h,e.style.display="block",p.textContent=`Valid backup: ${h.length} tasks ready to restore.`,s.disabled=!1}catch(f){y("Error parsing JSON backup file: "+f.message,!0),e.style.display="none",s.disabled=!0}},g.readAsText(b)},s.onclick=async()=>{var b;if(!d||d.length===0)return;s.disabled=!0,s.textContent="Restoring...";const n=((b=o.querySelector('input[name="restoreMode"]:checked'))==null?void 0:b.value)||"merge";try{const g=await G("/tasks/restore",{tasks:d,mode:n});y(`Restored ${g.restoredCount} tasks! (${g.skippedCount} skipped) ✨`),l(),await L()}catch(g){y("Restore failed: "+g.message,!0),s.disabled=!1,s.textContent="Retry Restore"}}}function ne(){const t=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${v(k.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${k.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${k.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${v(k.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${k.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${k.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${k.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${k.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${k.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${k.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${k.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,o=ce(t),l=()=>o.remove();o.querySelector("#btnSettingsClose").onclick=l,o.querySelector("#btnCancelSettings").onclick=l,o.querySelector("#settingsForm").onsubmit=r=>{r.preventDefault(),k.displayName=o.querySelector("#setDisplayName").value.trim()||"Daily Planner",k.weekStartsOn=Number(o.querySelector("#setWeekStart").value),k.defaultPriority=o.querySelector("#setDefaultPriority").value,k.density=o.querySelector("#setDensity").value,k.soundEnabled=o.querySelector("#setSound").checked,Te(k),y("Planner preferences saved! ⚙️"),l(),C()}}}function Ae(){if(document.getElementById("ci360-planner-styles"))return;const u=document.createElement("style");u.id="ci360-planner-styles",u.textContent=`
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
  `,document.head.appendChild(u)}async function Be(u,P={}){var r,c;const x=P.currentUser||{};let $=[],m=null,z=[],k=[],i=null,L=!1;u.innerHTML=`
    <div class="bonding-wrap" id="bonding-app-root">
      <!-- Top Header Bar -->
      <div class="bonding-nav-bar">
        <div class="bonding-nav-left">
          <div class="bonding-logo-badge">💬</div>
          <div>
            <h2 class="bonding-title">Team Chat & Lounges</h2>
            <p class="bonding-subtitle">Direct 1-on-1 Messages · Group Lounges · Stay Connected with Colleagues</p>
          </div>
        </div>
        <div class="bonding-nav-right">
          <button class="bonding-top-action-btn" id="btn-top-new-chat" title="Start a Personal Chat">
            <span>👤</span> <span>New Chat</span>
          </button>
          <button class="bonding-top-action-btn primary" id="btn-top-new-group" title="Create a Group Lounge">
            <span>👥</span> <span>+ New Group</span>
          </button>
        </div>
      </div>

      <!-- Main Chat Layout -->
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
    </div>

    <!-- Modals container -->
    <div id="bonding-modals-root"></div>
  `,Ee(),await W(),R(),(r=u.querySelector("#btn-top-new-chat"))==null||r.addEventListener("click",ne),(c=u.querySelector("#btn-top-new-group"))==null||c.addEventListener("click",t);const J=u.querySelector("#bonding-search-input");J&&J.addEventListener("input",e=>{const p=e.target.value.toLowerCase().trim();u.querySelectorAll(".bonding-channel-item").forEach(d=>{const n=d.textContent.toLowerCase();d.style.display=n.includes(p)?"flex":"none"})}),C(),new MutationObserver((e,p)=>{document.body.contains(u)||(i&&clearInterval(i),p.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function W(){try{const[e,p]=await Promise.all([F("/bonding/channels").catch(()=>[]),F("/bonding/colleagues").catch(()=>[])]);$=e,z=p,!m&&$.length>0&&(m=$.find(s=>s.name.includes("Lounge"))||$[0]),H(),m&&await E(m._id)}catch(e){console.error("Failed to load bonding data",e)}}async function E(e,p=!1){if(e)try{k=await F(`/bonding/channels/${e}/messages`),p?oe():O()}catch(s){console.error("Failed to load messages",s)}}function C(){i&&clearInterval(i),i=setInterval(async()=>{if(m){await E(m._id,!0);const e=await F("/bonding/channels").catch(()=>[]);e&&e.length&&($=e,H())}},3500)}function H(){const e=u.querySelector("#bonding-group-list"),p=u.querySelector("#bonding-direct-list");e&&(e.innerHTML=te("group")),p&&(p.innerHTML=te("direct")),be()}function te(e){const p=$.filter(s=>s.type===e);return p.length===0?e==="group"?'<div class="bonding-empty-channels">No groups yet. Click <b>+ New Group</b>!</div>':'<div class="bonding-empty-channels">No personal chats yet. Click <b>+ New Chat</b> to message any colleague!</div>':p.map(s=>{const d=m&&m._id===s._id,n=s.type==="direct"?"👤":s.avatar||"👥",b=v(s.displayName||s.name),g=s.lastMessage&&s.lastMessage.content?v(s.lastMessage.content):"No messages yet",a=s.lastMessage&&s.lastMessage.sentAt?l(s.lastMessage.sentAt):"";return`
        <div class="bonding-channel-item ${d?"active":""}" data-chan-id="${s._id}">
          <div class="bonding-channel-avatar">${n}</div>
          <div class="bonding-channel-info">
            <div class="bonding-channel-top">
              <span class="bonding-channel-name">${b}</span>
              <span class="bonding-channel-time">${a}</span>
            </div>
            <div class="bonding-channel-preview">${g}</div>
          </div>
        </div>
      `}).join("")}function be(){const e=u.querySelectorAll(".bonding-channel-item");e.forEach(d=>{d.onclick=async()=>{const n=d.dataset.chanId,b=$.find(g=>g._id===n);b&&(m=b,e.forEach(g=>g.classList.remove("active")),d.classList.add("active"),R(),await E(m._id))}});const p=u.querySelector("#btn-create-group");p&&(p.onclick=t);const s=u.querySelector("#btn-new-direct-chat");s&&(s.onclick=ne)}function R(){const e=u.querySelector("#bonding-chat-panel");if(!e)return;if(!m){e.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const p=v(m.displayName||m.name),s=(m.members||[]).length,d=m.type==="group";e.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${d?m.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${p}</div>
            <div class="bonding-chat-sub">
              ${d?`<span>${s} member${s!==1?"s":""}</span> · <span>${v(m.description||"Public Lounge")}</span>`:"<span>Direct 1-on-1 Personal Chat</span>"}
            </div>
          </div>
        </div>

        <div class="bonding-chat-header-actions">
          ${d?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${s})</span>
            </button>
            <button class="bonding-header-btn danger" id="btn-delete-group" title="Delete this group">
              <span>🗑️</span> <span>Delete Group</span>
            </button>
          `:""}
        </div>
      </div>

      <div class="bonding-messages-container" id="bonding-messages-feed">
        ${X()}
      </div>

      <div class="bonding-chat-input-bar">
        <button class="bonding-input-action-btn" id="btn-quick-emoji" title="Insert Emoji">
          <span>😀</span>
        </button>
        <textarea
          id="bonding-message-input"
          class="bonding-input-field"
          placeholder="Type a message or press Enter to send..."
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
    `,ue(),me(),Z(),Y()}function X(){return!k||k.length===0?`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or share an update with the team!</p>
        </div>
      `:k.map(e=>{var g;const p=(x==null?void 0:x._id)||(x==null?void 0:x.id),s=e.sender&&e.sender.userId&&p&&e.sender.userId.toString()===p.toString();if(e.type==="system")return`
          <div class="bonding-msg-system">
            <span>ℹ️</span> <span>${v(e.content)}</span>
          </div>
        `;const d=v(((g=e.sender)==null?void 0:g.name)||"Teammate"),n=l(e.createdAt),b=ge(e);return`
        <div class="bonding-msg-row ${s?"self":"other"}" data-msg-id="${e._id}">
          <div class="bonding-msg-avatar" title="${d}">${d.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${d}</span>
              <span class="bonding-msg-time">${n}</span>
            </div>
            <div class="bonding-msg-bubble">
              ${v(e.content).replace(/\n/g,"<br/>")}
            </div>
            ${b}
          </div>
        </div>
      `}).join("")}function ge(e){return`
      <div class="bonding-reactions-row">
        ${(e.reactions||[]).map(d=>{const n=(x==null?void 0:x._id)||(x==null?void 0:x.id);return`
        <button class="bonding-rxn-tag ${(d.users||[]).some(g=>g.toString()===(n==null?void 0:n.toString()))?"active":""}" data-msg-id="${e._id}" data-emoji="${d.emoji}">
          <span>${d.emoji}</span> <span>${d.users?d.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${e._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function ue(){const e=u.querySelector("#btn-manage-members");e&&(e.onclick=fe);const p=u.querySelector("#btn-delete-group");p&&(p.onclick=ee)}function me(){const e=u.querySelector("#bonding-message-input"),p=u.querySelector("#btn-send-message"),s=u.querySelector("#btn-quick-emoji");e&&e.addEventListener("keydown",d=>{d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),ae())}),p&&(p.onclick=ae),s&&(s.onclick=()=>{if(!e)return;const d=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],n=d[Math.floor(Math.random()*d.length)];e.value+=(e.value?" ":"")+n,e.focus()})}function Z(){u.querySelectorAll(".bonding-rxn-tag").forEach(s=>{s.onclick=async()=>{const d=s.dataset.msgId,n=s.dataset.emoji;await Q(d,n)}}),u.querySelectorAll(".bonding-add-rxn-btn").forEach(s=>{s.onclick=d=>{const n=s.dataset.msgId;o(d.currentTarget,async b=>{await Q(n,b)})}})}async function ae(){const e=u.querySelector("#bonding-message-input");if(!e||!m)return;const p=e.value.trim();if(!(!p||L)){L=!0;try{e.value="";const s=await G(`/bonding/channels/${m._id}/messages`,{type:"text",content:p});k.push(s),O(),Y();const d=await F("/bonding/channels").catch(()=>[]);d&&d.length&&($=d,H())}catch(s){y(s.message||"Failed to send message","error")}finally{L=!1,e.focus()}}}async function Q(e,p){try{const s=await G(`/bonding/messages/${e}/react`,{emoji:p}),d=k.find(n=>n._id===e);d&&(d.reactions=s,oe())}catch(s){y(s.message||"Failed to react","error")}}function Y(){const e=u.querySelector("#bonding-messages-feed");e&&(e.scrollTop=e.scrollHeight)}function oe(){const e=u.querySelector("#bonding-messages-feed");if(!e)return;const p=e.scrollHeight-e.scrollTop<=e.clientHeight+80;e.innerHTML=X(),Z(),p&&Y()}function O(){const e=u.querySelector("#bonding-messages-feed");e&&(e.innerHTML=X(),Z())}async function ee(){if(!m||m.type==="direct")return;const e=m.name;if(confirm(`Are you sure you want to delete the group "${e}"?

All messages in this lounge will be deleted.`))try{await $e(`/bonding/channels/${m._id}`),y(`Group "${e}" deleted successfully`,"success"),$=await F("/bonding/channels").catch(()=>[]),m=$.find(s=>s.type==="group")||$[0]||null,H(),R(),m&&await E(m._id)}catch(s){y(s.message||"Failed to delete group","error")}}function fe(){if(!m||m.type==="direct")return;const e=u.querySelector("#bonding-modals-root"),p=m.members||[],s=new Set(p.map(a=>{var f;return(f=a.userId)==null?void 0:f.toString()})),d=z.filter(a=>!s.has(a._id.toString()));e.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${v(m.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group:</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select a teammate to add...</option>
                  ${d.map(a=>`
                    <option value="${a._id}">${v(a.name)} (${v(a.role)})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${d.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${d.length===0?'<div class="bonding-hint-text">All active colleagues are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${p.length}):</label>
              <div class="bonding-members-list">
                ${p.map(a=>{const f=(x==null?void 0:x._id)||(x==null?void 0:x.id),h=f&&a.userId&&a.userId.toString()===f.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(a.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${v(a.name)} ${h?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${v(a.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${a.userId}" data-name="${v(a.name)}">
                          ${h?"Leave Group":"Remove"}
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
    `,e.querySelector(".bonding-modal-close").onclick=()=>{e.innerHTML=""};const n=e.querySelector("#btn-modal-delete-group");n&&(n.onclick=()=>{e.innerHTML="",ee()});const b=e.querySelector("#btn-submit-add-member");b&&(b.onclick=async()=>{const f=e.querySelector("#sel-add-colleague").value;if(!f){y("Please select a colleague to add","warning");return}try{b.disabled=!0,b.textContent="Adding...";const h=await ye(`/bonding/channels/${m._id}/members`,{action:"add",userIds:[f]});y("Colleague added to group! 🎉","success"),m=h.channel,e.innerHTML="",await E(m._id),R()}catch(h){y(h.message||"Failed to add member","error"),b.disabled=!1,b.textContent="Add to Group"}}),e.querySelectorAll(".btn-remove-member").forEach(a=>{a.onclick=async()=>{const f=a.dataset.userId,h=a.dataset.name;if(confirm(`Are you sure you want to remove ${h} from this group?`))try{a.disabled=!0;const S=await ye(`/bonding/channels/${m._id}/members`,{action:"remove",userId:f});y(`${h} removed from group`,"info"),m=S.channel,e.innerHTML="",await E(m._id),R()}catch(S){y(S.message||"Failed to remove member","error"),a.disabled=!1}}})}function ne(){const e=u.querySelector("#bonding-modals-root"),p=z.filter(d=>!d.isSelf);e.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any team member to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${p.map(d=>`
                <div class="bonding-user-pick-item" data-user-id="${d._id}" data-name="${v(d.name)}">
                  <div class="bonding-member-avatar">${d.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${v(d.name)}</span>
                    <span class="user-pick-role">${v(d.role)} · ${v(d.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,e.querySelector(".bonding-modal-close").onclick=()=>{e.innerHTML=""},e.querySelectorAll(".bonding-user-pick-item").forEach(d=>{d.onclick=async()=>{const n=d.dataset.userId;try{const b=await G("/bonding/channels",{type:"direct",targetUserId:n});e.innerHTML="",$=await F("/bonding/channels"),m=$.find(g=>g._id===b._id)||b,H(),R(),await E(m._id)}catch(b){y(b.message||"Failed to open personal chat","error")}}})}function t(){const e=u.querySelector("#bonding-modals-root"),p=z.filter(b=>!b.isSelf);e.innerHTML=`
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
              <label class="bonding-form-label">Add Initial Members</label>
              <div class="bonding-member-checkboxes">
                ${p.map(b=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${b._id}" />
                    <span>${v(b.name)} (${v(b.role)})</span>
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
    `,e.querySelector(".bonding-modal-close").onclick=()=>{e.innerHTML=""},e.querySelector("#btn-cancel-create-grp").onclick=()=>{e.innerHTML=""};let s="👥";const d=e.querySelectorAll(".avatar-opt");d.forEach(b=>{b.onclick=()=>{d.forEach(g=>g.classList.remove("active")),b.classList.add("active"),s=b.textContent.trim()}});const n=e.querySelector("#btn-confirm-create-grp");n.onclick=async()=>{const b=e.querySelector("#new-group-name"),g=e.querySelector("#new-group-desc"),a=b.value.trim();if(!a){y("Please enter a group name","warning"),b.focus();return}const f=e.querySelectorAll(".new-group-member-chk:checked"),h=Array.from(f).map(S=>S.value);try{n.disabled=!0,n.textContent="Creating...";const S=await G("/bonding/channels",{type:"group",name:a,description:g.value.trim(),avatar:s,memberIds:h});y(`Group "${a}" created! 🎉`,"success"),e.innerHTML="",$=await F("/bonding/channels"),m=$.find(w=>w._id===S._id)||S,H(),R(),await E(m._id)}catch(S){y(S.message||"Failed to create group","error"),n.disabled=!1,n.textContent="Create Group 🎉"}}}function o(e,p){const s=document.querySelector(".bonding-emoji-popup");s&&s.remove();const d=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],n=document.createElement("div");n.className="bonding-emoji-popup",n.innerHTML=d.map(a=>`<button class="emoji-opt-btn" data-e="${a}">${a}</button>`).join("");const b=e.getBoundingClientRect();n.style.top=`${b.bottom+window.scrollY+6}px`,n.style.left=`${b.left+window.scrollX}px`,document.body.appendChild(n),n.querySelectorAll(".emoji-opt-btn").forEach(a=>{a.onclick=f=>{f.stopPropagation(),p(a.dataset.e),n.remove()}});const g=a=>{n.contains(a.target)||(n.remove(),document.removeEventListener("click",g))};setTimeout(()=>document.addEventListener("click",g),10)}function l(e){if(!e)return"";try{return new Date(e).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Ee(){const u=document.getElementById("ci360-bonding-styles");u&&u.remove();const P=document.createElement("style");P.id="ci360-bonding-styles",P.textContent=`
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
      padding: 16px 22px;
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
      font-size: 26px;
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
      color: #ffffff;
      flex-shrink: 0;
    }

    .bonding-title {
      font-size: 19px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0 0 2px 0;
    }

    [data-theme="dark"] .bonding-title {
      color: #f9fafb !important;
    }

    .bonding-subtitle {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    [data-theme="dark"] .bonding-subtitle {
      color: #9ca3af !important;
    }

    .bonding-nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .bonding-top-action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 9px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-hover, #f1f5f9);
      color: var(--text-2, #334155);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-top-action-btn {
      background: var(--bg-hover, #1f2937);
      border-color: var(--border-strong, #374151);
      color: #e5e7eb;
    }

    .bonding-top-action-btn:hover {
      background: var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .bonding-top-action-btn:hover {
      background: #374151;
      border-color: #4b5563;
    }

    .bonding-top-action-btn.primary {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff !important;
      border: none;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
    }

    .bonding-top-action-btn.primary:hover {
      opacity: 0.94;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
    }

    /* Main Chat Layout */
    .bonding-chat-layout {
      display: grid;
      grid-template-columns: 310px 1fr;
      height: 720px;
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04);
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-chat-layout {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
      box-shadow: 0 6px 24px rgba(0,0,0,0.4);
    }

    @media (max-width: 900px) {
      .bonding-chat-layout {
        grid-template-columns: 1fr;
        height: auto;
      }
      .bonding-sidebar {
        max-height: 280px;
        border-right: none !important;
        border-bottom: 1px solid var(--border-sm, #e2e8f0);
      }
      [data-theme="dark"] .bonding-sidebar {
        border-bottom-color: var(--border-subtle, #1f2937) !important;
      }
    }

    /* Sidebar */
    .bonding-sidebar {
      border-right: 1px solid var(--border-sm, #e2e8f0);
      background: #f8fafc;
      padding: 16px 14px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-sidebar {
      background: #0d131f;
      border-right-color: var(--border-subtle, #1f2937);
    }

    .bonding-search-box input {
      width: 100%;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: #ffffff;
      font-size: 13px;
      color: var(--text-1, #0f172a);
      outline: none;
      box-sizing: border-box;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-search-box input {
      background: #151d2a;
      border-color: #2a374f;
      color: #f9fafb;
    }

    .bonding-search-box input:focus {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }

    .bonding-section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 14px 4px 8px 4px;
    }

    .bonding-section-title {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-3, #94a3b8);
      letter-spacing: 0.6px;
    }

    [data-theme="dark"] .bonding-section-title {
      color: #6b7280;
    }

    .bonding-mini-btn {
      background: transparent;
      border: none;
      color: #6366f1;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 6px;
      transition: background 0.15s ease;
    }

    .bonding-mini-btn:hover {
      background: rgba(99, 102, 241, 0.08);
    }

    .bonding-channel-list {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .bonding-channel-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.15s ease;
      background: transparent;
    }

    .bonding-channel-item:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-channel-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .bonding-channel-item.active {
      background: rgba(99, 102, 241, 0.1);
    }

    [data-theme="dark"] .bonding-channel-item.active {
      background: rgba(99, 102, 241, 0.22);
    }

    .bonding-channel-avatar {
      font-size: 17px;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: #ffffff;
      border: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    [data-theme="dark"] .bonding-channel-avatar {
      background: #1f2937;
      border-color: #374151;
      color: #f9fafb;
    }

    .bonding-channel-info {
      flex: 1;
      min-width: 0;
    }

    .bonding-channel-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
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
      color: #f9fafb;
    }

    .bonding-channel-time {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
      flex-shrink: 0;
    }

    [data-theme="dark"] .bonding-channel-time {
      color: #6b7280;
    }

    .bonding-channel-preview {
      font-size: 12px;
      color: var(--text-3, #64748b);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }

    [data-theme="dark"] .bonding-channel-preview {
      color: #9ca3af;
    }

    .bonding-empty-channels, .bonding-loading-text {
      font-size: 12px;
      color: var(--text-3, #94a3b8);
      padding: 10px 4px;
      line-height: 1.4;
    }

    /* Main Chat Panel */
    .bonding-chat-main {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--bg-card, #ffffff);
      transition: background 0.2s ease;
    }

    [data-theme="dark"] .bonding-chat-main {
      background: var(--bg-surface, #111827);
    }

    .bonding-chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
      background: var(--bg-card, #ffffff);
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-chat-header {
      background: var(--bg-surface, #111827);
      border-bottom-color: var(--border-subtle, #1f2937);
    }

    .bonding-chat-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bonding-chat-header-avatar {
      font-size: 22px;
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    [data-theme="dark"] .bonding-chat-header-avatar {
      background: rgba(99, 102, 241, 0.2);
      color: #f9fafb;
    }

    .bonding-chat-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-chat-title {
      color: #f9fafb !important;
    }

    .bonding-chat-sub {
      font-size: 12px;
      color: var(--text-3, #64748b);
      margin-top: 2px;
    }

    [data-theme="dark"] .bonding-chat-sub {
      color: #9ca3af !important;
    }

    .bonding-chat-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bonding-header-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-hover, #f8fafc);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-2, #334155);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-header-btn {
      background: var(--bg-hover, #1f2937);
      border-color: var(--border-strong, #374151);
      color: #e5e7eb;
    }

    .bonding-header-btn:hover {
      background: var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .bonding-header-btn:hover {
      background: #374151;
    }

    .bonding-header-btn.danger {
      color: #dc2626;
      border-color: #fecaca;
      background: #fef2f2;
    }

    [data-theme="dark"] .bonding-header-btn.danger {
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.3);
      background: rgba(220, 38, 38, 0.12);
    }

    .bonding-header-btn.danger:hover {
      background: #fee2e2;
    }

    [data-theme="dark"] .bonding-header-btn.danger:hover {
      background: rgba(220, 38, 38, 0.22);
    }

    /* Message Feed */
    .bonding-messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: #f8fafc;
      transition: background 0.2s ease;
    }

    [data-theme="dark"] .bonding-messages-container {
      background: #090d16;
    }

    .bonding-empty-feed {
      text-align: center;
      margin: auto;
      max-width: 360px;
      padding: 20px;
    }

    .bonding-empty-icon {
      font-size: 42px;
      margin-bottom: 8px;
    }

    .bonding-empty-feed h4 {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0 0 6px 0;
    }

    [data-theme="dark"] .bonding-empty-feed h4 {
      color: #f9fafb !important;
    }

    .bonding-empty-feed p {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0;
      line-height: 1.5;
    }

    [data-theme="dark"] .bonding-empty-feed p {
      color: #9ca3af !important;
    }

    .bonding-msg-system {
      align-self: center;
      background: rgba(148, 163, 184, 0.15);
      color: var(--text-2, #475569);
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    [data-theme="dark"] .bonding-msg-system {
      background: rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
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
      border-radius: 50%;
      background: #6366f1;
      color: #ffffff;
      font-size: 12.5px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .bonding-msg-row.self .bonding-msg-avatar {
      background: #8b5cf6;
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
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--text-3, #94a3b8);
      padding: 0 4px;
    }

    [data-theme="dark"] .bonding-msg-meta {
      color: #6b7280;
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
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .bonding-msg-row.other .bonding-msg-bubble {
      background: #ffffff;
      color: var(--text-1, #0f172a);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-top-left-radius: 4px;
    }

    [data-theme="dark"] .bonding-msg-row.other .bonding-msg-bubble {
      background: #161f30;
      border-color: #25334c;
      color: #f9fafb;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }

    .bonding-msg-row.self .bonding-msg-bubble {
      background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
      color: #ffffff;
      border-top-right-radius: 4px;
    }

    /* Reactions Row */
    .bonding-reactions-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
    }

    .bonding-rxn-tag {
      background: #ffffff;
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 100px;
      padding: 2px 7px;
      font-size: 11px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      cursor: pointer;
      color: var(--text-2, #475569);
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-rxn-tag {
      background: #1f2937;
      border-color: #374151;
      color: #d1d5db;
    }

    .bonding-rxn-tag.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.08);
      color: #6366f1;
    }

    [data-theme="dark"] .bonding-rxn-tag.active {
      background: rgba(99, 102, 241, 0.22);
      color: #a5b4fc;
      border-color: #818cf8;
    }

    .bonding-add-rxn-btn {
      background: transparent;
      border: none;
      font-size: 12px;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 2px 5px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .bonding-add-rxn-btn:hover {
      background: var(--bg-hover, #f1f5f9);
      color: var(--text-2, #475569);
    }

    [data-theme="dark"] .bonding-add-rxn-btn:hover {
      background: #1f2937;
      color: #f3f4f6;
    }

    /* Chat Input Bar */
    .bonding-chat-input-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      border-top: 1px solid var(--border-sm, #e2e8f0);
      background: var(--bg-card, #ffffff);
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-chat-input-bar {
      background: var(--bg-surface, #111827);
      border-top-color: var(--border-subtle, #1f2937);
    }

    .bonding-input-action-btn {
      background: var(--bg-hover, #f1f5f9);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-2, #334155);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    [data-theme="dark"] .bonding-input-action-btn {
      background: #1f2937;
      border-color: #374151;
      color: #e5e7eb;
    }

    .bonding-input-action-btn:hover {
      background: var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .bonding-input-action-btn:hover {
      background: #374151;
    }

    .bonding-input-field {
      flex: 1;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: #ffffff;
      font-size: 13.5px;
      color: var(--text-1, #0f172a);
      outline: none;
      resize: none;
      font-family: inherit;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-input-field {
      background: #182234;
      border-color: #2d3d5a;
      color: #f9fafb;
    }

    .bonding-input-field:focus {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }

    .bonding-send-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 18px;
      border-radius: 10px;
      border: none;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .bonding-send-btn:hover {
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
      opacity: 0.95;
    }

    /* Modal Backdrop & Card */
    .bonding-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    }

    .bonding-modal-card {
      background: #ffffff;
      border-radius: 20px;
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 45px rgba(0,0,0,0.2);
      border: 1px solid var(--border-sm, #e2e8f0);
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-modal-card {
      background: #151d2a;
      border-color: #2a374f;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      color: #f9fafb;
    }

    .bonding-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 22px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .bonding-modal-header {
      border-bottom-color: #2a374f;
    }

    .bonding-modal-header h3 {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0;
    }

    [data-theme="dark"] .bonding-modal-header h3 {
      color: #f9fafb;
    }

    .bonding-modal-close {
      background: transparent;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: var(--text-3, #94a3b8);
      line-height: 1;
    }

    [data-theme="dark"] .bonding-modal-close {
      color: #9ca3af;
    }

    .bonding-modal-body {
      padding: 20px 22px;
    }

    .bonding-form-section {
      margin-bottom: 16px;
    }

    .bonding-form-label {
      display: block;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--text-2, #334155);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    [data-theme="dark"] .bonding-form-label {
      color: #9ca3af;
    }

    .bonding-input, .bonding-select {
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: #ffffff;
      font-size: 13.5px;
      color: var(--text-1, #0f172a);
      box-sizing: border-box;
      outline: none;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-input,
    [data-theme="dark"] .bonding-select {
      background: #1c2638;
      border-color: #334361;
      color: #f9fafb;
    }

    .bonding-input:focus, .bonding-select:focus {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }

    .bonding-add-member-row {
      display: flex;
      gap: 10px;
    }

    .bonding-members-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 250px;
      overflow-y: auto;
    }

    .bonding-member-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-radius: 10px;
      background: #f8fafc;
      border: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .bonding-member-item {
      background: #1a2436;
      border-color: #283852;
    }

    .bonding-member-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .bonding-member-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #6366f1;
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-member-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-member-name {
      color: #f9fafb;
    }

    .you-badge {
      font-size: 10px;
      background: #dbeafe;
      color: #1e40af;
      padding: 1px 5px;
      border-radius: 4px;
      margin-left: 4px;
    }

    [data-theme="dark"] .you-badge {
      background: rgba(59, 130, 246, 0.2);
      color: #93c5fd;
    }

    .bonding-member-role {
      font-size: 11px;
      color: var(--text-3, #64748b);
      display: block;
    }

    [data-theme="dark"] .bonding-member-role {
      color: #9ca3af;
    }

    .bonding-btn-danger {
      padding: 6px 12px;
      border-radius: 7px;
      border: 1px solid #fecaca;
      background: #fef2f2;
      color: #dc2626;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-btn-danger {
      background: rgba(220, 38, 38, 0.14);
      border-color: rgba(239, 68, 68, 0.3);
      color: #f87171;
    }

    .bonding-btn-danger:hover {
      background: #fee2e2;
    }

    [data-theme="dark"] .bonding-btn-danger:hover {
      background: rgba(220, 38, 38, 0.25);
    }

    .bonding-danger-zone {
      margin-top: 22px;
      padding: 14px;
      border-radius: 12px;
      border: 1px dashed rgba(239, 68, 68, 0.4);
      background: rgba(239, 68, 68, 0.05);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .danger-zone-text strong {
      display: block;
      font-size: 13px;
      color: #dc2626;
      margin-bottom: 2px;
    }

    [data-theme="dark"] .danger-zone-text strong {
      color: #f87171;
    }

    .danger-zone-text span {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
    }

    [data-theme="dark"] .danger-zone-text span {
      color: #9ca3af;
    }

    .bonding-btn-primary {
      padding: 9px 16px;
      border-radius: 9px;
      border: none;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .bonding-btn-primary:hover {
      opacity: 0.95;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    .bonding-btn-secondary {
      padding: 9px 16px;
      border-radius: 9px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: #ffffff;
      color: var(--text-2, #334155);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-btn-secondary {
      background: #1f2937;
      border-color: #374151;
      color: #e5e7eb;
    }

    .bonding-btn-secondary:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    .bonding-modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    .bonding-hint-text {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0 0 14px 0;
      line-height: 1.45;
    }

    [data-theme="dark"] .bonding-hint-text {
      color: #9ca3af;
    }

    .bonding-user-pick-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 380px;
      overflow-y: auto;
    }

    .bonding-user-pick-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      border-radius: 12px;
      background: #f8fafc;
      border: 1px solid var(--border-sm, #e2e8f0);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-user-pick-item {
      background: #1a2436;
      border-color: #283852;
    }

    .bonding-user-pick-item:hover {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.05);
    }

    .bonding-user-pick-info {
      flex: 1;
      margin-left: 12px;
    }

    .user-pick-name {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--text-1, #0f172a);
      display: block;
    }

    [data-theme="dark"] .user-pick-name {
      color: #f9fafb;
    }

    .user-pick-role {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      display: block;
    }

    [data-theme="dark"] .user-pick-role {
      color: #9ca3af;
    }

    .bonding-avatar-picker {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .avatar-opt {
      font-size: 22px;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--border-sm, #e2e8f0);
      cursor: pointer;
      background: #ffffff;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .avatar-opt {
      background: #1f2937;
      border-color: #374151;
      color: #f9fafb;
    }

    .avatar-opt.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.12);
    }

    .bonding-member-checkboxes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      max-height: 180px;
      overflow-y: auto;
      border: 1px solid var(--border-sm, #e2e8f0);
      padding: 10px;
      border-radius: 10px;
    }

    [data-theme="dark"] .bonding-member-checkboxes {
      border-color: #283852;
      background: #1a2436;
    }

    .bonding-check-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: var(--text-2, #334155);
      cursor: pointer;
    }

    [data-theme="dark"] .bonding-check-label {
      color: #e5e7eb;
    }

    .bonding-emoji-popup {
      position: absolute;
      background: #ffffff;
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 12px;
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
  `,document.head.appendChild(P)}export{Be as a,Le as i};
