import{c as re,h,e as k,n as Pe,j as Ce,o as Y,k as Ie,g as K}from"./api-DyayiLLk.js";const le={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function Te(){try{const v=localStorage.getItem("ci360_planner_settings");if(v)return Object.assign({},le,JSON.parse(v))}catch{}return Object.assign({},le)}function ze(v){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(v))}catch{}}function F(){const v=new Date,P=v.getFullYear(),S=String(v.getMonth()+1).padStart(2,"0"),z=String(v.getDate()).padStart(2,"0");return`${P}-${S}-${z}`}function X(v,P){const S=new Date(v+"T00:00:00");S.setDate(S.getDate()+P);const z=S.getFullYear(),M=String(S.getMonth()+1).padStart(2,"0"),A=String(S.getDate()).padStart(2,"0");return`${z}-${M}-${A}`}function H(v){return v?new Date(v+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function L(v){return v?new Date(v+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function de(v){return v?new Date(v+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function oe(v,P=1){const S=new Date(v+"T00:00:00"),z=S.getDay(),M=(z<P?7:0)+z-P,A=new Date(S);A.setDate(S.getDate()-M);const f=[];for(let n=0;n<7;n++){const R=new Date(A);R.setDate(A.getDate()+n);const Z=R.getFullYear(),q=String(R.getMonth()+1).padStart(2,"0"),O=String(R.getDate()).padStart(2,"0");f.push(`${Z}-${q}-${O}`)}return f}function Ae(){try{const v=window.AudioContext||window.webkitAudioContext;if(!v)return;const P=new v,S=P.currentTime,z=P.createOscillator(),M=P.createGain();z.type="sine",z.frequency.setValueAtTime(523.25,S),z.frequency.exponentialRampToValueAtTime(783.99,S+.15),M.gain.setValueAtTime(.2,S),M.gain.exponentialRampToValueAtTime(.001,S+.35),z.connect(M),M.connect(P.destination),z.start(S),z.stop(S+.35)}catch{}}function Be(v,P={}){const{userRole:S="employee",currentUser:z=null,onNavigate:M=null}=P,A=S==="superadmin"||S==="admin";let f=Te(),n={selectedDate:F(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ee(),R();async function R(){n.loading=!0,Z();try{const e=[re("/tasks")];A&&e.push(re("/personnel").catch(()=>[]));const[t,o]=await Promise.all(e);n.tasks=Array.isArray(t)?t:[],o&&(n.personnelList=Array.isArray(o)?o:[])}catch(e){h("Failed to load planner tasks: "+e.message,!0)}finally{n.loading=!1,w()}}function Z(){v.innerHTML=`
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
    `}function q(e){return n.tasks.filter(t=>{var r;if(t.isDeleted===!0)return!1;if(A&&n.selectedPersonnelId!=="all"){const i=((r=t.personnelId)==null?void 0:r._id)||t.personnelId;if(String(i)!==String(n.selectedPersonnelId))return!1}const o=t.dateStr||(t.dueDate?new Date(t.dueDate).toISOString().slice(0,10):"");return o?o===e:e===F()})}function O(e,t){if(e.status==="Completed")return!1;const o=e.dateStr||(e.dueDate?new Date(e.dueDate).toISOString().slice(0,10):"");return o?o<t:!1}function j(e,t){const o=e.length,r=e.filter(g=>g.status==="Completed").length,i=e.filter(g=>g.status==="In Progress").length,s=e.filter(g=>g.status==="Pending"||g.status==="Todo").length,p=e.filter(g=>O(g,t)).length,u=o>0?Math.round(r/o*100):0;return{total:o,completed:r,inProgress:i,pending:s,overdue:p,percent:u}}function w(){const e=F(),t=n.selectedDate===e,o=q(n.selectedDate),r=j(o,e);v.innerHTML=`
      <div class="ci360-planner-wrap ${f.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${L(n.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${k(f.displayName||"Daily Planner")}</h1>
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
              <span class="date-text" id="displayDateLabel">${H(n.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${n.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${t?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${A?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${n.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${n.personnelList.map(i=>`
                  <option value="${i._id}" ${n.selectedPersonnelId===String(i._id)?"selected":""}>
                    ${k(i.name)} (${k(i.department||i.role||"Team")})
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
          ${ce(o,r)}
        </main>

      </div>
    `,me(),fe()}function ce(e,t){return n.viewMode==="weekly"?ve():n.viewMode==="report"?be():pe(e,t)}function pe(e,t){const o=F();let r=e;if(n.filterStatus==="pending"?r=r.filter(i=>i.status==="Pending"||i.status==="Todo"):n.filterStatus==="in_progress"?r=r.filter(i=>i.status==="In Progress"):n.filterStatus==="completed"?r=r.filter(i=>i.status==="Completed"):n.filterStatus==="overdue"&&(r=r.filter(i=>O(i,o))),n.searchQuery){const i=n.searchQuery.toLowerCase();r=r.filter(s=>(s.title||"").toLowerCase().includes(i)||(s.description||"").toLowerCase().includes(i)||(s.category||"").toLowerCase().includes(i))}return r.sort((i,s)=>{if(i.status==="Completed"&&s.status!=="Completed")return 1;if(i.status!=="Completed"&&s.status==="Completed")return-1;const p={Urgent:0,High:1,Medium:2,Low:3};return(p[i.priority]||2)-(p[s.priority]||2)}),`
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
              <button type="button" class="filter-pill ${n.filterStatus==="all"?"active":""}" data-f="all">All (${t.total})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${t.pending})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${t.inProgress})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${t.completed})</button>
              ${t.overdue>0?`
                <button type="button" class="filter-pill overdue ${n.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${t.overdue})</button>
              `:""}
            </div>

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${k(n.searchQuery)}">
              ${n.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card -->
        <div class="ci360-quick-add-bar">
          <div class="ci360-quick-add-input-wrap">
            <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${L(n.selectedDate)}... (Press Enter to save)">
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
          ${r.length===0?ue():`
            <div class="ci360-task-list">
              ${r.map(i=>ge(i,o)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function ue(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${L(n.selectedDate)}</h3>
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
    `}function ge(e,t){var p,u,g,l;const o=e.status==="Completed",r=O(e,t),i=`pri-${(e.priority||"medium").toLowerCase()}`,s=`status-${(e.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${o?"is-completed":""} ${r?"is-overdue":""}" data-id="${e._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${o?"checked":""}" data-action="toggle" data-id="${e._id}" title="${o?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${k(e.title)}</span>
          </div>

          ${e.description?`
            <div class="ci360-task-desc">${k(e.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${i}">
              <span class="badge-dot"></span>
              ${k(e.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${s}">
              ${k(e.status||"Pending")}
            </span>

            <!-- Category -->
            ${e.category?`
              <span class="ci360-badge category-badge">
                #${k(e.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${e.startTime||e.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${e.startTime?k(e.startTime):""}
                   ${e.startTime&&e.dueTime?"–":""}
                   ${e.dueTime?k(e.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${r?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${A&&((p=e.personnelId)!=null&&p.name||(u=e.userId)!=null&&u.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${k(((g=e.personnelId)==null?void 0:g.name)||((l=e.userId)==null?void 0:l.name))}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${e._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${e._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function ve(){const e=oe(n.selectedDate,f.weekStartsOn),t=L(e[0]),o=L(e[6]),r=F();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${t} – ${o}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${e.map(i=>{const s=i===r,p=i===n.selectedDate,u=q(i),g=j(u,r);return`
              <div class="ci360-day-column ${s?"is-today":""} ${p?"is-selected":""}" data-date="${i}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${i}">
                  <div class="day-name">${de(i)}</div>
                  <div class="day-number">${new Date(i+"T00:00:00").getDate()}</div>
                  ${s?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${g.completed}/${g.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${g.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${u.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:u.map(l=>`
                    <div class="ci360-mini-task-card ${l.status==="Completed"?"done":""}" data-id="${l._id}">
                      <button type="button" class="mini-check ${l.status==="Completed"?"checked":""}" data-action="toggle" data-id="${l._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${l._id}">
                        <div class="mini-title">${k(l.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(l.priority||"medium").toLowerCase()}">${l.priority||"Med"}</span>
                          ${l.dueTime?`<span class="mini-time">${k(l.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button -->
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${i}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function be(){const e=oe(n.selectedDate,f.weekStartsOn),t=H(e[0]),o=H(e[6]),r=F(),i=n.tasks.filter(c=>{if(c.isDeleted===!0)return!1;const d=c.dateStr||(c.dueDate?new Date(c.dueDate).toISOString().slice(0,10):"");return e.includes(d)}),s=i.length,p=i.filter(c=>c.status==="Completed").length,u=i.filter(c=>c.status==="In Progress").length,g=s>0?Math.round(p/s*100):0,l={Urgent:0,High:0,Medium:0,Low:0};return i.forEach(c=>{const d=c.priority||"Medium";l[d]!==void 0&&l[d]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${t} – ${o}</div>
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
            <span class="value" style="font-size:28px">${s}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${p}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${u}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${g}%</span>
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
                ${e.map(c=>{const d=q(c),a=j(d,r);return`
                    <tr>
                      <td><strong>${de(c)}</strong></td>
                      <td>${L(c)}</td>
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
              <div style="font-size:22px;font-weight:700">${l.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${l.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${l.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${l.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function me(){const e=document.getElementById("btnViewDaily"),t=document.getElementById("btnViewWeekly"),o=document.getElementById("btnViewReport");e&&(e.onclick=()=>{n.viewMode="daily",w()}),t&&(t.onclick=()=>{n.viewMode="weekly",w()}),o&&(o.onclick=()=>{n.viewMode="report",w()});const r=document.getElementById("btnPrevDay"),i=document.getElementById("btnNextDay"),s=document.getElementById("btnJumpToday"),p=document.getElementById("hiddenDateInput"),u=document.getElementById("datePickerBadge");r&&(r.onclick=()=>{n.selectedDate=X(n.selectedDate,-1),w()}),i&&(i.onclick=()=>{n.selectedDate=X(n.selectedDate,1),w()}),s&&(s.onclick=()=>{n.selectedDate=F(),w()}),u&&p&&(u.onclick=()=>{try{typeof p.showPicker=="function"?p.showPicker():p.focus()}catch{p.focus()}},p.onchange=x=>{x.target.value&&(n.selectedDate=x.target.value,w())});const g=document.getElementById("admTeamSelect");g&&(g.onchange=x=>{n.selectedPersonnelId=x.target.value,w()});const l=document.getElementById("btnOpenAddTaskModal");l&&(l.onclick=()=>ee());const c=document.getElementById("btnPlannerActionsMenu"),d=document.getElementById("plannerActionsDropdown");c&&d&&(c.onclick=x=>{x.stopPropagation(),d.classList.toggle("hidden")},document.addEventListener("click",x=>{!d.contains(x.target)&&x.target!==c&&d.classList.add("hidden")}));const a=document.getElementById("btnActionImport");a&&(a.onclick=()=>{d==null||d.classList.add("hidden"),ie()});const b=document.getElementById("btnActionExportPng");b&&(b.onclick=()=>{d==null||d.classList.add("hidden"),he()});const y=document.getElementById("btnActionExportPdf");y&&(y.onclick=()=>{d==null||d.classList.add("hidden"),ne()});const D=document.getElementById("btnActionBackup");D&&(D.onclick=()=>{d==null||d.classList.add("hidden"),ke()});const m=document.getElementById("btnActionSettings");m&&(m.onclick=()=>{d==null||d.classList.add("hidden"),we()})}function fe(e){if(n.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(l=>{l.onclick=()=>{n.filterStatus=l.dataset.f,w()}});const t=document.getElementById("plannerTaskSearchInp");t&&(t.oninput=l=>{n.searchQuery=l.target.value,w()});const o=document.getElementById("btnClearSearch");o&&(o.onclick=()=>{n.searchQuery="",w()});const r=document.getElementById("quickAddTitleInp"),i=document.getElementById("quickAddPriority"),s=document.getElementById("quickAddCategory"),p=document.getElementById("btnQuickAddSubmit"),u=async()=>{const l=((r==null?void 0:r.value)||"").trim();if(!l){h("Please enter a task title",!0),r==null||r.focus();return}try{const c={title:l,dateStr:n.selectedDate,priority:(i==null?void 0:i.value)||f.defaultPriority,category:(s==null?void 0:s.value)||"General",status:"Pending"};A&&n.selectedPersonnelId!=="all"&&(c.personnelId=n.selectedPersonnelId);const d=await K("/tasks",c);n.tasks.unshift(d),h("Task added to today's focus! ✨"),r&&(r.value="",r.focus()),w()}catch(c){h(c.message,!0)}};p&&(p.onclick=u),r&&(r.onkeydown=l=>{l.key==="Enter"&&u()});const g=document.getElementById("btnEmptyStateImport");g&&(g.onclick=()=>ie())}if(n.viewMode==="weekly"){const t=document.getElementById("btnPrevWeek"),o=document.getElementById("btnNextWeek"),r=document.getElementById("btnThisWeek");t&&(t.onclick=()=>{n.selectedDate=X(n.selectedDate,-7),w()}),o&&(o.onclick=()=>{n.selectedDate=X(n.selectedDate,7),w()}),r&&(r.onclick=()=>{n.selectedDate=F(),w()}),document.querySelectorAll(".day-col-header").forEach(i=>{i.onclick=()=>{n.selectedDate=i.dataset.date,n.viewMode="daily",w()}}),document.querySelectorAll('[data-action="add-day"]').forEach(i=>{i.onclick=()=>{ee(null,i.dataset.date)}})}if(n.viewMode==="report"){const t=document.getElementById("btnDownloadWeeklyPdf");t&&(t.onclick=ne)}v.querySelectorAll('[data-action="toggle"]').forEach(t=>{t.onclick=async o=>{o.stopPropagation();const r=t.dataset.id;await ye(r)}}),v.querySelectorAll('[data-action="edit"]').forEach(t=>{t.onclick=o=>{o.stopPropagation();const r=t.dataset.id,i=n.tasks.find(s=>s._id===r);i&&ee(i)}}),v.querySelectorAll('[data-action="delete"]').forEach(t=>{t.onclick=async o=>{o.stopPropagation();const r=t.dataset.id;await xe(r)}})}async function ye(e){const t=n.tasks.find(r=>r._id===e);if(!t)return;const o=t.status!=="Completed";try{const r=await Pe(`/tasks/${e}/toggle`,{}),i=n.tasks.findIndex(s=>s._id===e);i!==-1&&(n.tasks[i]=r),o?(f.soundEnabled&&Ae(),h("Task marked as completed! 🎉")):h("Task reopened as pending."),w()}catch(r){h(r.message,!0)}}async function xe(e){const t=n.tasks.find(o=>o._id===e);if(t&&confirm(`Are you sure you want to remove "${t.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Ce(`/tasks/${e}`),n.tasks=n.tasks.filter(o=>o._id!==e),h("Task removed from planner (safely stored in database archive)"),w()}catch(o){h(o.message,!0)}}function ee(e=null,t=null){const o=!!e,r=e?e.dateStr||(e.dueDate?new Date(e.dueDate).toISOString().slice(0,10):n.selectedDate):t||n.selectedDate,i=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${o?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${k((e==null?void 0:e.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${k((e==null?void 0:e.description)||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${r}" required>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${(e==null?void 0:e.startTime)||""}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${(e==null?void 0:e.dueTime)||""}">
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${(e==null?void 0:e.priority)==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!e&&f.defaultPriority==="Medium"||(e==null?void 0:e.priority)==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!e&&f.defaultPriority==="High"||(e==null?void 0:e.priority)==="High"?"selected":""}>High</option>
                <option value="Urgent" ${(e==null?void 0:e.priority)==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${(e==null?void 0:e.status)==="Pending"||(e==null?void 0:e.status)==="Todo"||!e?"selected":""}>Pending</option>
                <option value="In Progress" ${(e==null?void 0:e.status)==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${(e==null?void 0:e.status)==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${k((e==null?void 0:e.category)||"General")}">
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
          ${A?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!e||e!=null&&e.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${n.personnelList.map(c=>{var a;const d=((a=e==null?void 0:e.personnelId)==null?void 0:a._id)===c._id||(e==null?void 0:e.personnelId)===c._id;return`<option value="${c._id}" ${d?"selected":""}>${k(c.name)} (${k(c.department||c.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
            <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
              ${o?"Save Changes":"Create Task"}
            </button>
          </div>
        </form>
      </div>
    `,s=Y(i),p=s.querySelector("#taskForm"),u=s.querySelector("#btnModalClose"),g=s.querySelector("#btnCancelModal"),l=()=>s.remove();u&&(u.onclick=l),g&&(g.onclick=l),p.onsubmit=async c=>{var U;c.preventDefault();const d=s.querySelector("#taskTitle").value.trim(),a=s.querySelector("#taskDesc").value.trim(),b=s.querySelector("#taskDate").value,y=s.querySelector("#taskStartTime").value.trim(),D=s.querySelector("#taskDueTime").value.trim(),m=s.querySelector("#taskPriority").value,x=s.querySelector("#taskStatus").value,$=s.querySelector("#taskCategory").value.trim()||"General";if(!d){h("Task title is required",!0);return}const E={title:d,description:a,dateStr:b,startTime:y,dueTime:D,priority:m,status:x,category:$};if(A){const C=(U=s.querySelector("#taskAssignee"))==null?void 0:U.value;C==="all"?(E.assignAll=!0,E.personnelId="all"):C&&(E.personnelId=C)}const W=s.querySelector("#btnSaveTask");W.disabled=!0,W.textContent="Saving...";try{if(o){const C=await Ie(`/tasks/${e._id}`,E),N=n.tasks.findIndex(te=>te._id===e._id);N!==-1&&(n.tasks[N]=C),h("Task updated successfully! ✍️")}else{const C=await K("/tasks",E);Array.isArray(C.tasks)?C.tasks.forEach(N=>n.tasks.unshift(N)):n.tasks.unshift(C),h("Task created successfully! ✨")}l(),w()}catch(C){h(C.message,!0),W.disabled=!1,W.textContent=o?"Save Changes":"Create Task"}}}function ie(){let e=[];const t=`
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
    `,o=Y(t),r=()=>o.remove();o.querySelector("#btnImportClose").onclick=r,o.querySelector("#btnCancelImport").onclick=r;const i=o.querySelector("#importTextarea"),s=o.querySelector("#importFileInput"),p=o.querySelector("#importDropzone"),u=o.querySelector("#previewListArea"),g=o.querySelector("#previewCountLabel"),l=o.querySelector("#btnConfirmImport"),c=o.querySelector("#importFileInfo");function d(b){if(!b)return[];const y=b.split(/\r?\n/),D=[];for(let m of y)m=m.trim(),m&&(m=m.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),m=m.replace(/^[-*•]\s+/,""),m=m.replace(/^\d+[\.\)]\s+/,""),m=m.trim(),m&&D.push(m));return D}function a(){const b=i.value,y=d(b),D=o.querySelector("#importTargetDate").value,m=q(D),x=new Set(m.map($=>($.title||"").trim().toLowerCase()));e=[];for(const $ of y){const E=x.has($.toLowerCase());e.push({title:$,isDuplicate:E})}if(g.textContent=`Preview (${e.length} ${e.length===1?"task":"tasks"} found)`,l.disabled=e.length===0,l.textContent=`Import ${e.length} ${e.length===1?"Task":"Tasks"}`,e.length===0){u.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}u.innerHTML=e.map(($,E)=>`
        <div class="preview-item ${$.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${E+1}.</span>
          <span class="preview-title">${k($.title)}</span>
          ${$.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}i.oninput=a,p.onclick=()=>s.click(),s.onchange=b=>{const y=b.target.files[0];if(!y)return;c.textContent=`File selected: ${y.name} (${Math.round(y.size/1024)} KB)`;const D=new FileReader;D.onload=m=>{i.value=m.target.result,a()},D.readAsText(y)},p.ondragover=b=>{b.preventDefault(),p.classList.add("dragover")},p.ondragleave=()=>p.classList.remove("dragover"),p.ondrop=b=>{b.preventDefault(),p.classList.remove("dragover");const y=b.dataTransfer.files[0];if(y&&(y.type==="text/plain"||y.name.endsWith(".txt"))){c.textContent=`File dropped: ${y.name}`;const D=new FileReader;D.onload=m=>{i.value=m.target.result,a()},D.readAsText(y)}else h("Please drop a valid .txt plain-text file",!0)},l.onclick=async()=>{if(e.length===0)return;l.disabled=!0,l.textContent="Importing...";const b=o.querySelector("#importTargetDate").value,y=o.querySelector("#importPriority").value,D=o.querySelector("#importCategory").value.trim()||"General",m={date:b,tasks:e.map(x=>({title:x.title,priority:y,category:D,status:"Pending"}))};A&&n.selectedPersonnelId!=="all"&&(m.personnelId=n.selectedPersonnelId);try{const x=await K("/tasks/bulk-import",m);Array.isArray(x.tasks)&&x.tasks.forEach($=>n.tasks.unshift($)),h(`Imported ${x.importedCount} tasks successfully! (${x.skippedCount} skipped duplicates)`),r(),n.selectedDate=b,w()}catch(x){h(x.message,!0),l.disabled=!1,l.textContent="Retry Import"}}}async function he(){const e=q(n.selectedDate),t=j(e,F()),o=H(n.selectedDate),r=2,i=800,s=160,p=90,u=65,g=70,l=Math.max(120,e.length*u),c=s+p+l+g,d=document.createElement("canvas");d.width=i*r,d.height=c*r;const a=d.getContext("2d");a.scale(r,r);const b=document.documentElement.getAttribute("data-theme")==="dark",y=b?"#0F172A":"#F8FAFC",D=b?"#1E293B":"#FFFFFF",m=b?"#334155":"#E2E8F0",x=b?"#F8FAFC":"#0F172A",$=b?"#94A3B8":"#475569",E="#4F46E5",W="#10B981",U="#F59E0B";a.fillStyle=y,a.fillRect(0,0,i,c),a.fillStyle=D,_(a,24,20,i-48,s-30,16),a.fill(),a.strokeStyle=m,a.lineWidth=1,a.stroke(),a.fillStyle=E,a.font="bold 12px Inter, sans-serif",a.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),a.fillStyle=x,a.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',a.fillText(o,44,86),a.fillStyle=$,a.font="13px Inter, sans-serif",a.fillText(`Planned focus list · ${t.completed} of ${t.total} tasks completed (${t.percent}%)`,44,114);const C=s+6;a.fillStyle=D,_(a,24,C,i-48,p-16,12),a.fill(),a.stroke();const N=[{label:"TOTAL TASKS",val:String(t.total),color:x},{label:"COMPLETED",val:String(t.completed),color:W},{label:"IN PROGRESS",val:String(t.inProgress),color:U},{label:"PENDING",val:String(t.pending),color:$},{label:"PROGRESS",val:`${t.percent}%`,color:E}],te=(i-48)/N.length;N.forEach((I,B)=>{const T=24+B*te+20;a.fillStyle=I.color,a.font="bold 20px Inter, sans-serif",a.fillText(I.val,T,C+36),a.fillStyle=$,a.font="10px Inter, sans-serif",a.fillText(I.label,T,C+54)});const ae=C+p;a.fillStyle=D,_(a,24,ae,i-48,l+10,16),a.fill(),a.stroke(),e.length===0?(a.fillStyle=$,a.font="14px Inter, sans-serif",a.textAlign="center",a.fillText("No scheduled tasks recorded for this date.",i/2,ae+60),a.textAlign="left"):e.forEach((I,B)=>{const T=ae+16+B*u,G=I.status==="Completed";a.beginPath(),a.arc(48,T+14,10,0,Math.PI*2),G?(a.fillStyle=W,a.fill(),a.strokeStyle="#FFFFFF",a.lineWidth=2,a.beginPath(),a.moveTo(44,T+14),a.lineTo(47,T+17),a.lineTo(52,T+11),a.stroke()):(a.strokeStyle=m,a.lineWidth=2,a.stroke()),a.fillStyle=G?$:x,a.font=`${G?"normal":"500"} 14px Inter, sans-serif`;const se=I.title.length>55?I.title.slice(0,52)+"...":I.title;if(a.fillText(se,70,T+18),G){const $e=a.measureText(se);a.strokeStyle=$,a.lineWidth=1.2,a.beginPath(),a.moveTo(70,T+14),a.lineTo(70+$e.width,T+14),a.stroke()}const V=I.priority||"Medium";let J="#E2E8F0",Q="#334155";V==="Urgent"?(J="#FEE2E2",Q="#DC2626"):V==="High"?(J="#FEF3C7",Q="#D97706"):V==="Low"&&(J="#ECFDF5",Q="#059669"),a.fillStyle=J,_(a,i-150,T+4,60,20,10),a.fill(),a.fillStyle=Q,a.font="bold 10px Inter, sans-serif",a.fillText(V,i-138,T+18);const De=I.dueTime?`🕒 ${I.dueTime}`:I.category||"General";a.fillStyle=$,a.font="11px Inter, sans-serif",a.fillText(De,70,T+34),B<e.length-1&&(a.strokeStyle=m,a.lineWidth=.6,a.beginPath(),a.moveTo(40,T+48),a.lineTo(i-40,T+48),a.stroke())});const Se=c-35;a.fillStyle=$,a.font="11px Inter, sans-serif",a.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,Se);try{const I=d.toDataURL("image/png"),B=document.createElement("a");B.href=I,B.download=`ci360-daily-planner-${n.selectedDate}.png`,document.body.appendChild(B),B.click(),B.remove(),h("Daily Planner image exported! 🖼️")}catch(I){h("Failed to export image: "+I.message,!0)}}function _(e,t,o,r,i,s){e.beginPath(),e.moveTo(t+s,o),e.lineTo(t+r-s,o),e.quadraticCurveTo(t+r,o,t+r,o+s),e.lineTo(t+r,o+i-s),e.quadraticCurveTo(t+r,o+i,t+r-s,o+i),e.lineTo(t+s,o+i),e.quadraticCurveTo(t,o+i,t,o+i-s),e.lineTo(t,o+s),e.quadraticCurveTo(t,o,t+s,o),e.closePath()}function ne(){const e=oe(n.selectedDate,f.weekStartsOn),t=H(e[0]),o=H(e[6]);F();const r=n.tasks.filter(l=>{if(l.isDeleted===!0)return!1;const c=l.dateStr||(l.dueDate?new Date(l.dueDate).toISOString().slice(0,10):"");return e.includes(c)}),i=r.length,s=r.filter(l=>l.status==="Completed").length,p=i>0?Math.round(s/i*100):0,u=window.open("","_blank");if(!u){h("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const g=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${t}</title>
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
            <div class="period">${t} – ${o}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${i}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${s}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${i-s}</div>
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
            ${e.map(l=>{const c=q(l);return c.length===0?`<tr><td><strong>${L(l)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:c.map(d=>`
                <tr>
                  <td><strong>${L(l)}</strong></td>
                  <td>${k(d.title)}</td>
                  <td><span class="badge badge-${(d.priority||"medium").toLowerCase().slice(0,3)}">${d.priority||"Medium"}</span></td>
                  <td>${k(d.category||"General")}</td>
                  <td>${d.dueTime||d.startTime||"—"}</td>
                  <td class="${d.status==="Completed"?"done":""}">${d.status||"Pending"}</td>
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
    `;u.document.write(g),u.document.close(),h("Weekly PDF report generated for printing! 📄")}function ke(){const t=Y(`
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
    `),o=()=>t.remove();t.querySelector("#btnBackupClose").onclick=o;const r=t.querySelector("#btnDownloadBackupJson");r.onclick=async()=>{r.disabled=!0,r.textContent="Generating backup...";try{const l=await re("/tasks/backup"),c=new Blob([JSON.stringify(l,null,2)],{type:"application/json"}),d=URL.createObjectURL(c),a=document.createElement("a");a.href=d,a.download=`ci360-planner-backup-${F()}.json`,document.body.appendChild(a),a.click(),a.remove(),h("Planner backup downloaded successfully! 💾")}catch(l){h("Backup export failed: "+l.message,!0)}finally{r.disabled=!1,r.textContent="Download JSON Backup"}};const i=t.querySelector("#restoreFileInput"),s=t.querySelector("#restorePreviewArea"),p=t.querySelector("#restoreCountText"),u=t.querySelector("#btnExecuteRestore");let g=null;i.onchange=l=>{const c=l.target.files[0];if(!c)return;const d=new FileReader;d.onload=a=>{try{const b=JSON.parse(a.target.result),y=Array.isArray(b.tasks)?b.tasks:Array.isArray(b)?b:null;if(!y||y.length===0){h("Invalid backup file: No tasks found",!0);return}g=y,s.style.display="block",p.textContent=`Valid backup: ${y.length} tasks ready to restore.`,u.disabled=!1}catch(b){h("Error parsing JSON backup file: "+b.message,!0),s.style.display="none",u.disabled=!0}},d.readAsText(c)},u.onclick=async()=>{var c;if(!g||g.length===0)return;u.disabled=!0,u.textContent="Restoring...";const l=((c=t.querySelector('input[name="restoreMode"]:checked'))==null?void 0:c.value)||"merge";try{const d=await K("/tasks/restore",{tasks:g,mode:l});h(`Restored ${d.restoredCount} tasks! (${d.skippedCount} skipped) ✨`),o(),await R()}catch(d){h("Restore failed: "+d.message,!0),u.disabled=!1,u.textContent="Retry Restore"}}}function we(){const e=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${k(f.displayName||"Daily Planner")}">
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
              <input type="text" id="setTimezone" class="input" value="${k(f.timezone||"Asia/Kolkata")}" readonly>
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
    `,t=Y(e),o=()=>t.remove();t.querySelector("#btnSettingsClose").onclick=o,t.querySelector("#btnCancelSettings").onclick=o,t.querySelector("#settingsForm").onsubmit=r=>{r.preventDefault(),f.displayName=t.querySelector("#setDisplayName").value.trim()||"Daily Planner",f.weekStartsOn=Number(t.querySelector("#setWeekStart").value),f.defaultPriority=t.querySelector("#setDefaultPriority").value,f.density=t.querySelector("#setDensity").value,f.soundEnabled=t.querySelector("#setSound").checked,ze(f),h("Planner preferences saved! ⚙️"),o(),w()}}}function Ee(){if(document.getElementById("ci360-planner-styles"))return;const v=document.createElement("style");v.id="ci360-planner-styles",v.textContent=`
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
  `,document.head.appendChild(v)}export{Be as i};
