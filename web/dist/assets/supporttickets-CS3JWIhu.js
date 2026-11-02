var ya=Object.defineProperty;var ka=(n,t,e)=>t in n?ya(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Se=(n,t,e)=>ka(n,typeof t!="symbol"?t+"":t,e);import{c as qe,h as S,e as $,n as Ze,j as Qe,o as Ft,k as Wt,g as ke,t as ea}from"./api-7Jxo57iM.js";const ua={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function wa(){try{const n=localStorage.getItem("ci360_planner_settings");if(n)return Object.assign({},ua,JSON.parse(n))}catch{}return Object.assign({},ua)}function $a(n){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(n))}catch{}}function it(){const n=new Date,t=n.getFullYear(),e=String(n.getMonth()+1).padStart(2,"0"),s=String(n.getDate()).padStart(2,"0");return`${t}-${e}-${s}`}function Ht(n,t){const e=new Date(n+"T00:00:00");e.setDate(e.getDate()+t);const s=e.getFullYear(),c=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${s}-${c}-${o}`}function $t(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function gt(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ga(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function ta(n,t=1){const e=new Date(n+"T00:00:00"),s=e.getDay(),c=(s<t?7:0)+s-t,o=new Date(e);o.setDate(e.getDate()-c);const m=[];for(let i=0;i<7;i++){const w=new Date(o);w.setDate(o.getDate()+i);const P=w.getFullYear(),C=String(w.getMonth()+1).padStart(2,"0"),j=String(w.getDate()).padStart(2,"0");m.push(`${P}-${C}-${j}`)}return m}function Sa(){try{const n=window.AudioContext||window.webkitAudioContext;if(!n)return;const t=new n,e=t.currentTime,s=t.createOscillator(),c=t.createGain();s.type="sine",s.frequency.setValueAtTime(523.25,e),s.frequency.exponentialRampToValueAtTime(783.99,e+.15),c.gain.setValueAtTime(.2,e),c.gain.exponentialRampToValueAtTime(.001,e+.35),s.connect(c),c.connect(t.destination),s.start(e),s.stop(e+.35)}catch{}}function Xa(n,t={}){const{userRole:e="employee",currentUser:s=null,onNavigate:c=null}=t,o=e==="superadmin"||e==="admin";let m=wa(),i={selectedDate:it(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ca(),w();async function w(){i.loading=!0,P();try{const p=[qe("/tasks")];o&&p.push(qe("/personnel").catch(()=>[]));const[a,d]=await Promise.all(p);i.tasks=Array.isArray(a)?a:[],d&&(i.personnelList=Array.isArray(d)?d:[])}catch(p){S("Failed to load planner tasks: "+p.message,!0)}finally{i.loading=!1,Q()}}function P(){n.innerHTML=`
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
    `}function C(p){return i.tasks.filter(a=>{var g;if(a.isDeleted===!0)return!1;if(o&&i.selectedPersonnelId!=="all"){const f=((g=a.personnelId)==null?void 0:g._id)||a.personnelId;if(String(f)!==String(i.selectedPersonnelId))return!1}const d=a.dateStr||(a.dueDate?new Date(a.dueDate).toISOString().slice(0,10):"");return d?d===p:p===it()})}function j(p,a){if(p.status==="Completed")return!1;const d=p.dateStr||(p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):"");return d?d<a:!1}function E(p,a){const d=p.length,g=p.filter(K=>K.status==="Completed").length,f=p.filter(K=>K.status==="In Progress").length,M=p.filter(K=>K.status==="Pending"||K.status==="Todo").length,O=p.filter(K=>j(K,a)).length,R=d>0?Math.round(g/d*100):0;return{total:d,completed:g,inProgress:f,pending:M,overdue:O,percent:R}}function Q(){const p=it(),a=i.selectedDate===p,d=C(i.selectedDate),g=E(d,p);n.innerHTML=`
      <div class="ci360-planner-wrap ${m.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${gt(i.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${$(m.displayName||"Daily Planner")}</h1>
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
              <span class="date-text" id="displayDateLabel">${$t(i.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${i.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${a?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${o?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${i.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${i.personnelList.map(f=>`
                  <option value="${f._id}" ${i.selectedPersonnelId===String(f._id)?"selected":""}>
                    ${$(f.name)} (${$(f.department||f.role||"Team")})
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
              <div class="ci360-circular-progress" style="--val: ${g.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${g.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${g.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <span class="kpi-num">${g.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${g.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${g.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${g.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${g.overdue>0?`
                <div class="kpi-box overdue">
                  <span class="kpi-num">${g.overdue}</span>
                  <span class="kpi-label">Overdue</span>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${g.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${V(d,g)}
        </main>

      </div>
    `,Ce(),st()}function V(p,a){return i.viewMode==="weekly"?Je():i.viewMode==="report"?nt():me(p,a)}function me(p,a){const d=it();let g=p;if(i.filterStatus==="pending"?g=g.filter(f=>f.status==="Pending"||f.status==="Todo"):i.filterStatus==="in_progress"?g=g.filter(f=>f.status==="In Progress"):i.filterStatus==="completed"?g=g.filter(f=>f.status==="Completed"):i.filterStatus==="overdue"&&(g=g.filter(f=>j(f,d))),i.searchQuery){const f=i.searchQuery.toLowerCase();g=g.filter(M=>(M.title||"").toLowerCase().includes(f)||(M.description||"").toLowerCase().includes(f)||(M.category||"").toLowerCase().includes(f))}return g.sort((f,M)=>{if(f.status==="Completed"&&M.status!=="Completed")return 1;if(f.status!=="Completed"&&M.status==="Completed")return-1;const O={Urgent:0,High:1,Medium:2,Low:3};return(O[f.priority]||2)-(O[M.priority]||2)}),`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              Today's Focus
            </h2>
            <span class="ci360-task-count-badge">${g.length} ${g.length===1?"task":"tasks"}</span>
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${i.filterStatus==="all"?"active":""}" data-f="all">All (${a.total})</button>
              <button type="button" class="filter-pill ${i.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${a.pending})</button>
              <button type="button" class="filter-pill ${i.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${a.inProgress})</button>
              <button type="button" class="filter-pill ${i.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${a.completed})</button>
              ${a.overdue>0?`
                <button type="button" class="filter-pill overdue ${i.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${a.overdue})</button>
              `:""}
            </div>

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${$(i.searchQuery)}">
              ${i.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card -->
        <div class="ci360-quick-add-bar">
          <div class="ci360-quick-add-input-wrap">
            <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${gt(i.selectedDate)}... (Press Enter to save)">
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
          ${g.length===0?ve():`
            <div class="ci360-task-list">
              ${g.map(f=>ze(f,d)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function ve(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${gt(i.selectedDate)}</h3>
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
    `}function ze(p,a){var O,R,K,q;const d=p.status==="Completed",g=j(p,a),f=`pri-${(p.priority||"medium").toLowerCase()}`,M=`status-${(p.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${d?"is-completed":""} ${g?"is-overdue":""}" data-id="${p._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${d?"checked":""}" data-action="toggle" data-id="${p._id}" title="${d?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${$(p.title)}</span>
          </div>

          ${p.description?`
            <div class="ci360-task-desc">${$(p.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${f}">
              <span class="badge-dot"></span>
              ${$(p.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${M}">
              ${$(p.status||"Pending")}
            </span>

            <!-- Category -->
            ${p.category?`
              <span class="ci360-badge category-badge">
                #${$(p.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${p.startTime||p.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${p.startTime?$(p.startTime):""}
                   ${p.startTime&&p.dueTime?"–":""}
                   ${p.dueTime?$(p.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${g?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${o&&((O=p.personnelId)!=null&&O.name||(R=p.userId)!=null&&R.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${$(((K=p.personnelId)==null?void 0:K.name)||((q=p.userId)==null?void 0:q.name))}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${p._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${p._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function Je(){const p=ta(i.selectedDate,m.weekStartsOn),a=gt(p[0]),d=gt(p[6]),g=it();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${a} – ${d}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${p.map(f=>{const M=f===g,O=f===i.selectedDate,R=C(f),K=E(R,g);return`
              <div class="ci360-day-column ${M?"is-today":""} ${O?"is-selected":""}" data-date="${f}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${f}">
                  <div class="day-name">${ga(f)}</div>
                  <div class="day-number">${new Date(f+"T00:00:00").getDate()}</div>
                  ${M?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${K.completed}/${K.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${K.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${R.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:R.map(q=>`
                    <div class="ci360-mini-task-card ${q.status==="Completed"?"done":""}" data-id="${q._id}">
                      <button type="button" class="mini-check ${q.status==="Completed"?"checked":""}" data-action="toggle" data-id="${q._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${q._id}">
                        <div class="mini-title">${$(q.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(q.priority||"medium").toLowerCase()}">${q.priority||"Med"}</span>
                          ${q.dueTime?`<span class="mini-time">${$(q.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button -->
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${f}">
                  + Add Task
                </button>

              </div>
            `}).join("")}
        </div>

      </div>
    `}function nt(){const p=ta(i.selectedDate,m.weekStartsOn),a=$t(p[0]),d=$t(p[6]),g=it(),f=i.tasks.filter(B=>{if(B.isDeleted===!0)return!1;const H=B.dateStr||(B.dueDate?new Date(B.dueDate).toISOString().slice(0,10):"");return p.includes(H)}),M=f.length,O=f.filter(B=>B.status==="Completed").length,R=f.filter(B=>B.status==="In Progress").length,K=M>0?Math.round(O/M*100):0,q={Urgent:0,High:0,Medium:0,Low:0};return f.forEach(B=>{const H=B.priority||"Medium";q[H]!==void 0&&q[H]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${a} – ${d}</div>
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
            <span class="value" style="font-size:28px">${M}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${O}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${R}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${K}%</span>
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
                ${p.map(B=>{const H=C(B),k=E(H,g);return`
                    <tr>
                      <td><strong>${ga(B)}</strong></td>
                      <td>${gt(B)}</td>
                      <td>${k.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${k.completed}</td>
                      <td>${k.pending+k.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${k.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${k.percent}%</span>
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
    `}function Ce(){const p=document.getElementById("btnViewDaily"),a=document.getElementById("btnViewWeekly"),d=document.getElementById("btnViewReport");p&&(p.onclick=()=>{i.viewMode="daily",Q()}),a&&(a.onclick=()=>{i.viewMode="weekly",Q()}),d&&(d.onclick=()=>{i.viewMode="report",Q()});const g=document.getElementById("btnPrevDay"),f=document.getElementById("btnNextDay"),M=document.getElementById("btnJumpToday"),O=document.getElementById("hiddenDateInput"),R=document.getElementById("datePickerBadge");g&&(g.onclick=()=>{i.selectedDate=Ht(i.selectedDate,-1),Q()}),f&&(f.onclick=()=>{i.selectedDate=Ht(i.selectedDate,1),Q()}),M&&(M.onclick=()=>{i.selectedDate=it(),Q()}),R&&O&&(R.onclick=()=>{try{typeof O.showPicker=="function"?O.showPicker():O.focus()}catch{O.focus()}},O.onchange=pe=>{pe.target.value&&(i.selectedDate=pe.target.value,Q())});const K=document.getElementById("admTeamSelect");K&&(K.onchange=pe=>{i.selectedPersonnelId=pe.target.value,Q()});const q=document.getElementById("btnOpenAddTaskModal");q&&(q.onclick=()=>Ae());const B=document.getElementById("btnPlannerActionsMenu"),H=document.getElementById("plannerActionsDropdown");B&&H&&(B.onclick=pe=>{pe.stopPropagation(),H.classList.toggle("hidden")},document.addEventListener("click",pe=>{!H.contains(pe.target)&&pe.target!==B&&H.classList.add("hidden")}));const k=document.getElementById("btnActionImport");k&&(k.onclick=()=>{H==null||H.classList.add("hidden"),Re()});const le=document.getElementById("btnActionExportPng");le&&(le.onclick=()=>{H==null||H.classList.add("hidden"),he()});const de=document.getElementById("btnActionExportPdf");de&&(de.onclick=()=>{H==null||H.classList.add("hidden"),ye()});const ue=document.getElementById("btnActionBackup");ue&&(ue.onclick=()=>{H==null||H.classList.add("hidden"),rt()});const oe=document.getElementById("btnActionSettings");oe&&(oe.onclick=()=>{H==null||H.classList.add("hidden"),et()})}function st(p){if(i.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(q=>{q.onclick=()=>{i.filterStatus=q.dataset.f,Q()}});const a=document.getElementById("plannerTaskSearchInp");a&&(a.oninput=q=>{i.searchQuery=q.target.value,Q()});const d=document.getElementById("btnClearSearch");d&&(d.onclick=()=>{i.searchQuery="",Q()});const g=document.getElementById("quickAddTitleInp"),f=document.getElementById("quickAddPriority"),M=document.getElementById("quickAddCategory"),O=document.getElementById("btnQuickAddSubmit"),R=async()=>{const q=((g==null?void 0:g.value)||"").trim();if(!q){S("Please enter a task title",!0),g==null||g.focus();return}try{const B={title:q,dateStr:i.selectedDate,priority:(f==null?void 0:f.value)||m.defaultPriority,category:(M==null?void 0:M.value)||"General",status:"Pending"};o&&i.selectedPersonnelId!=="all"&&(B.personnelId=i.selectedPersonnelId);const H=await ke("/tasks",B);i.tasks.unshift(H),S("Task added to today's focus! ✨"),g&&(g.value="",g.focus()),Q()}catch(B){S(B.message,!0)}};O&&(O.onclick=R),g&&(g.onkeydown=q=>{q.key==="Enter"&&R()});const K=document.getElementById("btnEmptyStateImport");K&&(K.onclick=()=>Re())}if(i.viewMode==="weekly"){const a=document.getElementById("btnPrevWeek"),d=document.getElementById("btnNextWeek"),g=document.getElementById("btnThisWeek");a&&(a.onclick=()=>{i.selectedDate=Ht(i.selectedDate,-7),Q()}),d&&(d.onclick=()=>{i.selectedDate=Ht(i.selectedDate,7),Q()}),g&&(g.onclick=()=>{i.selectedDate=it(),Q()}),document.querySelectorAll(".day-col-header").forEach(f=>{f.onclick=()=>{i.selectedDate=f.dataset.date,i.viewMode="daily",Q()}}),document.querySelectorAll('[data-action="add-day"]').forEach(f=>{f.onclick=()=>{Ae(null,f.dataset.date)}})}if(i.viewMode==="report"){const a=document.getElementById("btnDownloadWeeklyPdf");a&&(a.onclick=ye)}n.querySelectorAll('[data-action="toggle"]').forEach(a=>{a.onclick=async d=>{d.stopPropagation();const g=a.dataset.id;await Ge(g)}}),n.querySelectorAll('[data-action="edit"]').forEach(a=>{a.onclick=d=>{d.stopPropagation();const g=a.dataset.id,f=i.tasks.find(M=>M._id===g);f&&Ae(f)}}),n.querySelectorAll('[data-action="delete"]').forEach(a=>{a.onclick=async d=>{d.stopPropagation();const g=a.dataset.id;await ht(g)}})}async function Ge(p){const a=i.tasks.find(g=>g._id===p);if(!a)return;const d=a.status!=="Completed";try{const g=await Ze(`/tasks/${p}/toggle`,{}),f=i.tasks.findIndex(M=>M._id===p);f!==-1&&(i.tasks[f]=g),d?(m.soundEnabled&&Sa(),S("Task marked as completed! 🎉")):S("Task reopened as pending."),Q()}catch(g){S(g.message,!0)}}async function ht(p){const a=i.tasks.find(d=>d._id===p);if(a&&confirm(`Are you sure you want to remove "${a.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Qe(`/tasks/${p}`),i.tasks=i.tasks.filter(d=>d._id!==p),S("Task removed from planner (safely stored in database archive)"),Q()}catch(d){S(d.message,!0)}}function Ae(p=null,a=null){const d=!!p,g=p?p.dateStr||(p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):i.selectedDate):a||i.selectedDate,f=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${d?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${$((p==null?void 0:p.title)||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${$((p==null?void 0:p.description)||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${g}" required>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${(p==null?void 0:p.startTime)||""}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${(p==null?void 0:p.dueTime)||""}">
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${(p==null?void 0:p.priority)==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!p&&m.defaultPriority==="Medium"||(p==null?void 0:p.priority)==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!p&&m.defaultPriority==="High"||(p==null?void 0:p.priority)==="High"?"selected":""}>High</option>
                <option value="Urgent" ${(p==null?void 0:p.priority)==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${(p==null?void 0:p.status)==="Pending"||(p==null?void 0:p.status)==="Todo"||!p?"selected":""}>Pending</option>
                <option value="In Progress" ${(p==null?void 0:p.status)==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${(p==null?void 0:p.status)==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${$((p==null?void 0:p.category)||"General")}">
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
          ${o?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!p||p!=null&&p.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${i.personnelList.map(B=>{var k;const H=((k=p==null?void 0:p.personnelId)==null?void 0:k._id)===B._id||(p==null?void 0:p.personnelId)===B._id;return`<option value="${B._id}" ${H?"selected":""}>${$(B.name)} (${$(B.department||B.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
            <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
              ${d?"Save Changes":"Create Task"}
            </button>
          </div>
        </form>
      </div>
    `,M=Ft(f),O=M.querySelector("#taskForm"),R=M.querySelector("#btnModalClose"),K=M.querySelector("#btnCancelModal"),q=()=>M.remove();R&&(R.onclick=q),K&&(K.onclick=q),O.onsubmit=async B=>{var _;B.preventDefault();const H=M.querySelector("#taskTitle").value.trim(),k=M.querySelector("#taskDesc").value.trim(),le=M.querySelector("#taskDate").value,de=M.querySelector("#taskStartTime").value.trim(),ue=M.querySelector("#taskDueTime").value.trim(),oe=M.querySelector("#taskPriority").value,pe=M.querySelector("#taskStatus").value,r=M.querySelector("#taskCategory").value.trim()||"General";if(!H){S("Task title is required",!0);return}const b={title:H,description:k,dateStr:le,startTime:de,dueTime:ue,priority:oe,status:pe,category:r};if(o){const y=(_=M.querySelector("#taskAssignee"))==null?void 0:_.value;y==="all"?(b.assignAll=!0,b.personnelId="all"):y&&(b.personnelId=y)}const l=M.querySelector("#btnSaveTask");l.disabled=!0,l.textContent="Saving...";try{if(d){const y=await Wt(`/tasks/${p._id}`,b),z=i.tasks.findIndex(A=>A._id===p._id);z!==-1&&(i.tasks[z]=y),S("Task updated successfully! ✍️")}else{const y=await ke("/tasks",b);Array.isArray(y.tasks)?y.tasks.forEach(z=>i.tasks.unshift(z)):i.tasks.unshift(y),S("Task created successfully! ✨")}q(),Q()}catch(y){S(y.message,!0),l.disabled=!1,l.textContent=d?"Save Changes":"Create Task"}}}function Re(){let p=[];const a=`
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
    `,d=Ft(a),g=()=>d.remove();d.querySelector("#btnImportClose").onclick=g,d.querySelector("#btnCancelImport").onclick=g;const f=d.querySelector("#importTextarea"),M=d.querySelector("#importFileInput"),O=d.querySelector("#importDropzone"),R=d.querySelector("#previewListArea"),K=d.querySelector("#previewCountLabel"),q=d.querySelector("#btnConfirmImport"),B=d.querySelector("#importFileInfo");function H(le){if(!le)return[];const de=le.split(/\r?\n/),ue=[];for(let oe of de)oe=oe.trim(),oe&&(oe=oe.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),oe=oe.replace(/^[-*•]\s+/,""),oe=oe.replace(/^\d+[\.\)]\s+/,""),oe=oe.trim(),oe&&ue.push(oe));return ue}function k(){const le=f.value,de=H(le),ue=d.querySelector("#importTargetDate").value,oe=C(ue),pe=new Set(oe.map(r=>(r.title||"").trim().toLowerCase()));p=[];for(const r of de){const b=pe.has(r.toLowerCase());p.push({title:r,isDuplicate:b})}if(K.textContent=`Preview (${p.length} ${p.length===1?"task":"tasks"} found)`,q.disabled=p.length===0,q.textContent=`Import ${p.length} ${p.length===1?"Task":"Tasks"}`,p.length===0){R.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}R.innerHTML=p.map((r,b)=>`
        <div class="preview-item ${r.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${b+1}.</span>
          <span class="preview-title">${$(r.title)}</span>
          ${r.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}f.oninput=k,O.onclick=()=>M.click(),M.onchange=le=>{const de=le.target.files[0];if(!de)return;B.textContent=`File selected: ${de.name} (${Math.round(de.size/1024)} KB)`;const ue=new FileReader;ue.onload=oe=>{f.value=oe.target.result,k()},ue.readAsText(de)},O.ondragover=le=>{le.preventDefault(),O.classList.add("dragover")},O.ondragleave=()=>O.classList.remove("dragover"),O.ondrop=le=>{le.preventDefault(),O.classList.remove("dragover");const de=le.dataTransfer.files[0];if(de&&(de.type==="text/plain"||de.name.endsWith(".txt"))){B.textContent=`File dropped: ${de.name}`;const ue=new FileReader;ue.onload=oe=>{f.value=oe.target.result,k()},ue.readAsText(de)}else S("Please drop a valid .txt plain-text file",!0)},q.onclick=async()=>{if(p.length===0)return;q.disabled=!0,q.textContent="Importing...";const le=d.querySelector("#importTargetDate").value,de=d.querySelector("#importPriority").value,ue=d.querySelector("#importCategory").value.trim()||"General",oe={date:le,tasks:p.map(pe=>({title:pe.title,priority:de,category:ue,status:"Pending"}))};o&&i.selectedPersonnelId!=="all"&&(oe.personnelId=i.selectedPersonnelId);try{const pe=await ke("/tasks/bulk-import",oe);Array.isArray(pe.tasks)&&pe.tasks.forEach(r=>i.tasks.unshift(r)),S(`Imported ${pe.importedCount} tasks successfully! (${pe.skippedCount} skipped duplicates)`),g(),i.selectedDate=le,Q()}catch(pe){S(pe.message,!0),q.disabled=!1,q.textContent="Retry Import"}}}async function he(){const p=C(i.selectedDate),a=E(p,it()),d=$t(i.selectedDate),g=2,f=800,M=160,O=90,R=65,K=70,q=Math.max(120,p.length*R),B=M+O+q+K,H=document.createElement("canvas");H.width=f*g,H.height=B*g;const k=H.getContext("2d");k.scale(g,g);const le=document.documentElement.getAttribute("data-theme")==="dark",de=le?"#0F172A":"#F8FAFC",ue=le?"#1E293B":"#FFFFFF",oe=le?"#334155":"#E2E8F0",pe=le?"#F8FAFC":"#0F172A",r=le?"#94A3B8":"#475569",b="#4F46E5",l="#10B981",_="#F59E0B";k.fillStyle=de,k.fillRect(0,0,f,B),k.fillStyle=ue,We(k,24,20,f-48,M-30,16),k.fill(),k.strokeStyle=oe,k.lineWidth=1,k.stroke(),k.fillStyle=b,k.font="bold 12px Inter, sans-serif",k.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),k.fillStyle=pe,k.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',k.fillText(d,44,86),k.fillStyle=r,k.font="13px Inter, sans-serif",k.fillText(`Planned focus list · ${a.completed} of ${a.total} tasks completed (${a.percent}%)`,44,114);const y=M+6;k.fillStyle=ue,We(k,24,y,f-48,O-16,12),k.fill(),k.stroke();const z=[{label:"TOTAL TASKS",val:String(a.total),color:pe},{label:"COMPLETED",val:String(a.completed),color:l},{label:"IN PROGRESS",val:String(a.inProgress),color:_},{label:"PENDING",val:String(a.pending),color:r},{label:"PROGRESS",val:`${a.percent}%`,color:b}],A=(f-48)/z.length;z.forEach((W,L)=>{const se=24+L*A+20;k.fillStyle=W.color,k.font="bold 20px Inter, sans-serif",k.fillText(W.val,se,y+36),k.fillStyle=r,k.font="10px Inter, sans-serif",k.fillText(W.label,se,y+54)});const U=y+O;k.fillStyle=ue,We(k,24,U,f-48,q+10,16),k.fill(),k.stroke(),p.length===0?(k.fillStyle=r,k.font="14px Inter, sans-serif",k.textAlign="center",k.fillText("No scheduled tasks recorded for this date.",f/2,U+60),k.textAlign="left"):p.forEach((W,L)=>{const se=U+16+L*R,ee=W.status==="Completed";k.beginPath(),k.arc(48,se+14,10,0,Math.PI*2),ee?(k.fillStyle=l,k.fill(),k.strokeStyle="#FFFFFF",k.lineWidth=2,k.beginPath(),k.moveTo(44,se+14),k.lineTo(47,se+17),k.lineTo(52,se+11),k.stroke()):(k.strokeStyle=oe,k.lineWidth=2,k.stroke()),k.fillStyle=ee?r:pe,k.font=`${ee?"normal":"500"} 14px Inter, sans-serif`;const ce=W.title.length>55?W.title.slice(0,52)+"...":W.title;if(k.fillText(ce,70,se+18),ee){const Y=k.measureText(ce);k.strokeStyle=r,k.lineWidth=1.2,k.beginPath(),k.moveTo(70,se+14),k.lineTo(70+Y.width,se+14),k.stroke()}const J=W.priority||"Medium";let F="#E2E8F0",T="#334155";J==="Urgent"?(F="#FEE2E2",T="#DC2626"):J==="High"?(F="#FEF3C7",T="#D97706"):J==="Low"&&(F="#ECFDF5",T="#059669"),k.fillStyle=F,We(k,f-150,se+4,60,20,10),k.fill(),k.fillStyle=T,k.font="bold 10px Inter, sans-serif",k.fillText(J,f-138,se+18);const D=W.dueTime?`🕒 ${W.dueTime}`:W.category||"General";k.fillStyle=r,k.font="11px Inter, sans-serif",k.fillText(D,70,se+34),L<p.length-1&&(k.strokeStyle=oe,k.lineWidth=.6,k.beginPath(),k.moveTo(40,se+48),k.lineTo(f-40,se+48),k.stroke())});const G=B-35;k.fillStyle=r,k.font="11px Inter, sans-serif",k.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,G);try{const W=H.toDataURL("image/png"),L=document.createElement("a");L.href=W,L.download=`ci360-daily-planner-${i.selectedDate}.png`,document.body.appendChild(L),L.click(),L.remove(),S("Daily Planner image exported! 🖼️")}catch(W){S("Failed to export image: "+W.message,!0)}}function We(p,a,d,g,f,M){p.beginPath(),p.moveTo(a+M,d),p.lineTo(a+g-M,d),p.quadraticCurveTo(a+g,d,a+g,d+M),p.lineTo(a+g,d+f-M),p.quadraticCurveTo(a+g,d+f,a+g-M,d+f),p.lineTo(a+M,d+f),p.quadraticCurveTo(a,d+f,a,d+f-M),p.lineTo(a,d+M),p.quadraticCurveTo(a,d,a+M,d),p.closePath()}function ye(){const p=ta(i.selectedDate,m.weekStartsOn),a=$t(p[0]),d=$t(p[6]);it();const g=i.tasks.filter(q=>{if(q.isDeleted===!0)return!1;const B=q.dateStr||(q.dueDate?new Date(q.dueDate).toISOString().slice(0,10):"");return p.includes(B)}),f=g.length,M=g.filter(q=>q.status==="Completed").length,O=f>0?Math.round(M/f*100):0,R=window.open("","_blank");if(!R){S("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const K=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${a}</title>
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
            <div class="period">${a} – ${d}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${f}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${M}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${f-M}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${O}%</div>
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
            ${p.map(q=>{const B=C(q);return B.length===0?`<tr><td><strong>${gt(q)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:B.map(H=>`
                <tr>
                  <td><strong>${gt(q)}</strong></td>
                  <td>${$(H.title)}</td>
                  <td><span class="badge badge-${(H.priority||"medium").toLowerCase().slice(0,3)}">${H.priority||"Medium"}</span></td>
                  <td>${$(H.category||"General")}</td>
                  <td>${H.dueTime||H.startTime||"—"}</td>
                  <td class="${H.status==="Completed"?"done":""}">${H.status||"Pending"}</td>
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
    `;R.document.write(K),R.document.close(),S("Weekly PDF report generated for printing! 📄")}function rt(){const a=Ft(`
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
    `),d=()=>a.remove();a.querySelector("#btnBackupClose").onclick=d;const g=a.querySelector("#btnDownloadBackupJson");g.onclick=async()=>{g.disabled=!0,g.textContent="Generating backup...";try{const q=await qe("/tasks/backup"),B=new Blob([JSON.stringify(q,null,2)],{type:"application/json"}),H=URL.createObjectURL(B),k=document.createElement("a");k.href=H,k.download=`ci360-planner-backup-${it()}.json`,document.body.appendChild(k),k.click(),k.remove(),S("Planner backup downloaded successfully! 💾")}catch(q){S("Backup export failed: "+q.message,!0)}finally{g.disabled=!1,g.textContent="Download JSON Backup"}};const f=a.querySelector("#restoreFileInput"),M=a.querySelector("#restorePreviewArea"),O=a.querySelector("#restoreCountText"),R=a.querySelector("#btnExecuteRestore");let K=null;f.onchange=q=>{const B=q.target.files[0];if(!B)return;const H=new FileReader;H.onload=k=>{try{const le=JSON.parse(k.target.result),de=Array.isArray(le.tasks)?le.tasks:Array.isArray(le)?le:null;if(!de||de.length===0){S("Invalid backup file: No tasks found",!0);return}K=de,M.style.display="block",O.textContent=`Valid backup: ${de.length} tasks ready to restore.`,R.disabled=!1}catch(le){S("Error parsing JSON backup file: "+le.message,!0),M.style.display="none",R.disabled=!0}},H.readAsText(B)},R.onclick=async()=>{var B;if(!K||K.length===0)return;R.disabled=!0,R.textContent="Restoring...";const q=((B=a.querySelector('input[name="restoreMode"]:checked'))==null?void 0:B.value)||"merge";try{const H=await ke("/tasks/restore",{tasks:K,mode:q});S(`Restored ${H.restoredCount} tasks! (${H.skippedCount} skipped) ✨`),d(),await w()}catch(H){S("Restore failed: "+H.message,!0),R.disabled=!1,R.textContent="Retry Restore"}}}function et(){const p=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${$(m.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${m.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${m.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${$(m.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${m.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${m.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${m.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${m.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${m.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${m.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${m.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,a=Ft(p),d=()=>a.remove();a.querySelector("#btnSettingsClose").onclick=d,a.querySelector("#btnCancelSettings").onclick=d,a.querySelector("#settingsForm").onsubmit=g=>{g.preventDefault(),m.displayName=a.querySelector("#setDisplayName").value.trim()||"Daily Planner",m.weekStartsOn=Number(a.querySelector("#setWeekStart").value),m.defaultPriority=a.querySelector("#setDefaultPriority").value,m.density=a.querySelector("#setDensity").value,m.soundEnabled=a.querySelector("#setSound").checked,$a(m),S("Planner preferences saved! ⚙️"),d(),Q()}}}function Ca(){if(document.getElementById("ci360-planner-styles"))return;const n=document.createElement("style");n.id="ci360-planner-styles",n.textContent=`
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
  `,document.head.appendChild(n)}function _a(n){return n!==null?{comment:n,variations:[]}:{variations:[]}}function Ta(n,t,e,s,c){const o={move:n,variations:c};return t&&(o.suffix=t),e&&(o.nag=e),s!==null&&(o.comment=s),o}function Aa(...n){const[t,...e]=n;let s=t;for(const c of e)c!==null&&(s.variations=[c,...c.variations],c.variations=[],s=c);return t}function ja(n,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const s=e.variations[0];if(!s){e.comment=t.marker.comment;break}e=s}}return{headers:n,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Da(n,t){function e(){this.constructor=n}e.prototype=t.prototype,n.prototype=new e}function St(n,t,e,s){var c=Error.call(this,n);return Object.setPrototypeOf&&Object.setPrototypeOf(c,St.prototype),c.expected=t,c.found=e,c.location=s,c.name="SyntaxError",c}Da(St,Error);function aa(n,t,e){return e=e||" ",n.length>t?n:(t-=n.length,e+=e.repeat(t),n+e.slice(0,t))}St.prototype.format=function(n){var t="Error: "+this.message;if(this.location){var e=null,s;for(s=0;s<n.length;s++)if(n[s].source===this.location.source){e=n[s].text.split(/\r\n|\n|\r/g);break}var c=this.location.start,o=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(c):c,m=this.location.source+":"+o.line+":"+o.column;if(e){var i=this.location.end,w=aa("",o.line.toString().length," "),P=e[c.line-1],C=c.line===i.line?i.column:P.length+1,j=C-c.column||1;t+=`
 --> `+m+`
`+w+` |
`+o.line+" | "+P+`
`+w+" | "+aa("",c.column-1," ")+aa("",j,"^")}else t+=`
 at `+m}return t};St.buildMessage=function(n,t){var e={literal:function(P){return'"'+c(P.text)+'"'},class:function(P){var C=P.parts.map(function(j){return Array.isArray(j)?o(j[0])+"-"+o(j[1]):o(j)});return"["+(P.inverted?"^":"")+C.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(P){return P.description}};function s(P){return P.charCodeAt(0).toString(16).toUpperCase()}function c(P){return P.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(C){return"\\x0"+s(C)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(C){return"\\x"+s(C)})}function o(P){return P.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(C){return"\\x0"+s(C)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(C){return"\\x"+s(C)})}function m(P){return e[P.type](P)}function i(P){var C=P.map(m),j,E;if(C.sort(),C.length>0){for(j=1,E=1;j<C.length;j++)C[j-1]!==C[j]&&(C[E]=C[j],E++);C.length=E}switch(C.length){case 1:return C[0];case 2:return C[0]+" or "+C[1];default:return C.slice(0,-1).join(", ")+", or "+C[C.length-1]}}function w(P){return P?'"'+c(P)+'"':"end of input"}return"Expected "+i(n)+" but "+w(t)+" found."};function Ea(n,t){t=t!==void 0?t:{};var e={},s=t.grammarSource,c={pgn:qt},o=qt,m="[",i='"',w="]",P=".",C="O-O-O",j="O-O",E="0-0-0",Q="0-0",V="$",me="{",ve="}",ze=";",Je="(",nt=")",Ce="1-0",st="0-1",Ge="1/2-1/2",ht="*",Ae=/^[a-zA-Z]/,Re=/^[^"]/,he=/^[0-9]/,We=/^[.]/,ye=/^[a-zA-Z1-8\-=]/,rt=/^[+#]/,et=/^[!?]/,p=/^[^}]/,a=/^[^\r\n]/,d=/^[ \t\r\n]/,g=He("tag pair"),f=Te("[",!1),M=Te('"',!1),O=Te("]",!1),R=He("tag name"),K=Ke([["a","z"],["A","Z"]],!1,!1),q=He("tag value"),B=Ke(['"'],!0,!1),H=He("move number"),k=Ke([["0","9"]],!1,!1),le=Te(".",!1),de=Ke(["."],!1,!1),ue=He("standard algebraic notation"),oe=Te("O-O-O",!1),pe=Te("O-O",!1),r=Te("0-0-0",!1),b=Te("0-0",!1),l=Ke([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),_=Ke(["+","#"],!1,!1),y=He("suffix annotation"),z=Ke(["!","?"],!1,!1),A=He("NAG"),U=Te("$",!1),G=He("brace comment"),W=Te("{",!1),L=Ke(["}"],!0,!1),se=Te("}",!1),ee=He("rest of line comment"),ce=Te(";",!1),J=Ke(["\r",`
`],!0,!1),F=He("variation"),T=Te("(",!1),D=Te(")",!1),Y=He("game termination marker"),be=Te("1-0",!1),we=Te("0-1",!1),Ie=Te("1/2-1/2",!1),ne=Te("*",!1),ge=He("whitespace"),_e=Ke([" ","	","\r",`
`],!1,!1),Oe=function(u,x){return ja(u,x)},$e=function(u){return Object.fromEntries(u)},Xe=function(u,x){return[u,x]},tt=function(u,x){return{root:u,marker:x}},Ue=function(u,x){return Aa(_a(u),...x.flat())},Ne=function(u,x,h,te,ae){return Ta(u,x,h,te,ae)},lt=function(u){return u},Dt=function(u){return u.replace(/[\r\n]+/g," ")},Et=function(u){return u.trim()},It=function(u){return u},Pt=function(u,x){return{result:u,comment:x}},v=t.peg$currPos|0,dt=[{line:1,column:1}],Fe=v,ct=t.peg$maxFailExpected||[],N=t.peg$silentFails|0,pt;if(t.startRule){if(!(t.startRule in c))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');o=c[t.startRule]}function Te(u,x){return{type:"literal",text:u,ignoreCase:x}}function Ke(u,x,h){return{type:"class",parts:u,inverted:x,ignoreCase:h}}function Mt(){return{type:"end"}}function He(u){return{type:"other",description:u}}function Ct(u){var x=dt[u],h;if(x)return x;if(u>=dt.length)h=dt.length-1;else for(h=u;!dt[--h];);for(x=dt[h],x={line:x.line,column:x.column};h<u;)n.charCodeAt(h)===10?(x.line++,x.column=1):x.column++,h++;return dt[u]=x,x}function Lt(u,x,h){var te=Ct(u),ae=Ct(x),xe={source:s,start:{offset:u,line:te.line,column:te.column},end:{offset:x,line:ae.line,column:ae.column}};return xe}function X(u){v<Fe||(v>Fe&&(Fe=v,ct=[]),ct.push(u))}function wt(u,x,h){return new St(St.buildMessage(u,x),u,x,h)}function qt(){var u,x,h;return u=v,x=Qt(),h=I(),u=Oe(x,h),u}function Qt(){var u,x,h;for(u=v,x=[],h=zt();h!==e;)x.push(h),h=zt();return h=Me(),u=$e(x),u}function zt(){var u,x,h,te,ae,xe,vt;return N++,u=v,Me(),n.charCodeAt(v)===91?(x=m,v++):(x=e,N===0&&X(f)),x!==e?(Me(),h=Jt(),h!==e?(Me(),n.charCodeAt(v)===34?(te=i,v++):(te=e,N===0&&X(M)),te!==e?(ae=Rt(),n.charCodeAt(v)===34?(xe=i,v++):(xe=e,N===0&&X(M)),xe!==e?(Me(),n.charCodeAt(v)===93?(vt=w,v++):(vt=e,N===0&&X(O)),vt!==e?u=Xe(h,ae):(v=u,u=e)):(v=u,u=e)):(v=u,u=e)):(v=u,u=e)):(v=u,u=e),N--,u===e&&N===0&&X(g),u}function Jt(){var u,x,h;if(N++,u=v,x=[],h=n.charAt(v),Ae.test(h)?v++:(h=e,N===0&&X(K)),h!==e)for(;h!==e;)x.push(h),h=n.charAt(v),Ae.test(h)?v++:(h=e,N===0&&X(K));else x=e;return x!==e?u=n.substring(u,v):u=x,N--,u===e&&(x=e,N===0&&X(R)),u}function Rt(){var u,x,h;for(N++,u=v,x=[],h=n.charAt(v),Re.test(h)?v++:(h=e,N===0&&X(B));h!==e;)x.push(h),h=n.charAt(v),Re.test(h)?v++:(h=e,N===0&&X(B));return u=n.substring(u,v),N--,x=e,N===0&&X(q),u}function I(){var u,x,h;return u=v,x=Z(),Me(),h=Zt(),h===e&&(h=null),Me(),u=tt(x,h),u}function Z(){var u,x,h,te;for(u=v,x=ut(),x===e&&(x=null),h=[],te=fe();te!==e;)h.push(te),te=fe();return u=Ue(x,h),u}function fe(){var u,x,h,te,ae,xe,vt,Ot;if(u=v,Me(),Pe(),Me(),x=Ve(),x!==e){for(h=ot(),h===e&&(h=null),te=[],ae=at();ae!==e;)te.push(ae),ae=at();for(ae=Me(),xe=ut(),xe===e&&(xe=null),vt=[],Ot=Bt();Ot!==e;)vt.push(Ot),Ot=Bt();u=Ne(x,h,te,xe,vt)}else v=u,u=e;return u}function Pe(){var u,x,h,te,ae,xe;for(N++,u=v,x=[],h=n.charAt(v),he.test(h)?v++:(h=e,N===0&&X(k));h!==e;)x.push(h),h=n.charAt(v),he.test(h)?v++:(h=e,N===0&&X(k));if(n.charCodeAt(v)===46?(h=P,v++):(h=e,N===0&&X(le)),h!==e){for(te=Me(),ae=[],xe=n.charAt(v),We.test(xe)?v++:(xe=e,N===0&&X(de));xe!==e;)ae.push(xe),xe=n.charAt(v),We.test(xe)?v++:(xe=e,N===0&&X(de));x=[x,h,te,ae],u=x}else v=u,u=e;return N--,u===e&&(x=e,N===0&&X(H)),u}function Ve(){var u,x,h,te,ae,xe;if(N++,u=v,x=v,n.substr(v,5)===C?(h=C,v+=5):(h=e,N===0&&X(oe)),h===e&&(n.substr(v,3)===j?(h=j,v+=3):(h=e,N===0&&X(pe)),h===e&&(n.substr(v,5)===E?(h=E,v+=5):(h=e,N===0&&X(r)),h===e&&(n.substr(v,3)===Q?(h=Q,v+=3):(h=e,N===0&&X(b)),h===e))))if(h=v,te=n.charAt(v),Ae.test(te)?v++:(te=e,N===0&&X(K)),te!==e){if(ae=[],xe=n.charAt(v),ye.test(xe)?v++:(xe=e,N===0&&X(l)),xe!==e)for(;xe!==e;)ae.push(xe),xe=n.charAt(v),ye.test(xe)?v++:(xe=e,N===0&&X(l));else ae=e;ae!==e?(te=[te,ae],h=te):(v=h,h=e)}else v=h,h=e;return h!==e?(te=n.charAt(v),rt.test(te)?v++:(te=e,N===0&&X(_)),te===e&&(te=null),h=[h,te],x=h):(v=x,x=e),x!==e?u=n.substring(u,v):u=x,N--,u===e&&(x=e,N===0&&X(ue)),u}function ot(){var u,x,h;for(N++,u=v,x=[],h=n.charAt(v),et.test(h)?v++:(h=e,N===0&&X(z));h!==e;)x.push(h),x.length>=2?h=e:(h=n.charAt(v),et.test(h)?v++:(h=e,N===0&&X(z)));return x.length<1?(v=u,u=e):u=x,N--,u===e&&(x=e,N===0&&X(y)),u}function at(){var u,x,h,te,ae;if(N++,u=v,Me(),n.charCodeAt(v)===36?(x=V,v++):(x=e,N===0&&X(U)),x!==e){if(h=v,te=[],ae=n.charAt(v),he.test(ae)?v++:(ae=e,N===0&&X(k)),ae!==e)for(;ae!==e;)te.push(ae),ae=n.charAt(v),he.test(ae)?v++:(ae=e,N===0&&X(k));else te=e;te!==e?h=n.substring(h,v):h=te,h!==e?u=lt(h):(v=u,u=e)}else v=u,u=e;return N--,u===e&&N===0&&X(A),u}function ut(){var u;return u=Nt(),u===e&&(u=Xt()),u}function Nt(){var u,x,h,te,ae;if(N++,u=v,n.charCodeAt(v)===123?(x=me,v++):(x=e,N===0&&X(W)),x!==e){for(h=v,te=[],ae=n.charAt(v),p.test(ae)?v++:(ae=e,N===0&&X(L));ae!==e;)te.push(ae),ae=n.charAt(v),p.test(ae)?v++:(ae=e,N===0&&X(L));h=n.substring(h,v),n.charCodeAt(v)===125?(te=ve,v++):(te=e,N===0&&X(se)),te!==e?u=Dt(h):(v=u,u=e)}else v=u,u=e;return N--,u===e&&(x=e,N===0&&X(G)),u}function Xt(){var u,x,h,te,ae;if(N++,u=v,n.charCodeAt(v)===59?(x=ze,v++):(x=e,N===0&&X(ce)),x!==e){for(h=v,te=[],ae=n.charAt(v),a.test(ae)?v++:(ae=e,N===0&&X(J));ae!==e;)te.push(ae),ae=n.charAt(v),a.test(ae)?v++:(ae=e,N===0&&X(J));h=n.substring(h,v),u=Et(h)}else v=u,u=e;return N--,u===e&&(x=e,N===0&&X(ee)),u}function Bt(){var u,x,h,te;return N++,u=v,Me(),n.charCodeAt(v)===40?(x=Je,v++):(x=e,N===0&&X(T)),x!==e?(h=Z(),h!==e?(Me(),n.charCodeAt(v)===41?(te=nt,v++):(te=e,N===0&&X(D)),te!==e?u=It(h):(v=u,u=e)):(v=u,u=e)):(v=u,u=e),N--,u===e&&N===0&&X(F),u}function Zt(){var u,x,h;return N++,u=v,n.substr(v,3)===Ce?(x=Ce,v+=3):(x=e,N===0&&X(be)),x===e&&(n.substr(v,3)===st?(x=st,v+=3):(x=e,N===0&&X(we)),x===e&&(n.substr(v,7)===Ge?(x=Ge,v+=7):(x=e,N===0&&X(Ie)),x===e&&(n.charCodeAt(v)===42?(x=ht,v++):(x=e,N===0&&X(ne))))),x!==e?(Me(),h=ut(),h===e&&(h=null),u=Pt(x,h)):(v=u,u=e),N--,u===e&&(x=e,N===0&&X(Y)),u}function Me(){var u,x;for(N++,u=[],x=n.charAt(v),d.test(x)?v++:(x=e,N===0&&X(_e));x!==e;)u.push(x),x=n.charAt(v),d.test(x)?v++:(x=e,N===0&&X(_e));return N--,x=e,N===0&&X(ge),u}if(pt=o(),t.peg$library)return{peg$result:pt,peg$currPos:v,peg$FAILED:e,peg$maxFailExpected:ct,peg$maxFailPos:Fe};if(pt!==e&&v===n.length)return pt;throw pt!==e&&v<n.length&&X(Mt()),wt(ct,Fe<n.length?n.charAt(Fe):null,Fe<n.length?Lt(Fe,Fe+1):Lt(Fe,Fe))}/**
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
 */const Kt=0xffffffffffffffffn;function ia(n,t){return(n<<t|n>>64n-t)&0xffffffffffffffffn}function ba(n,t){return n*t&Kt}function Ia(n){return function(){let t=BigInt(n&Kt),e=BigInt(n>>64n&Kt);const s=ba(ia(ba(t,5n),7n),9n);return e^=t,t=(ia(t,24n)^e^e<<16n)&Kt,e=ia(e,37n),n=e<<64n|t,s}}const Yt=Ia(0xa187eb39cdcaed8f31c4b365b102e01en),Pa=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Yt()))),Ma=Array.from({length:8},()=>Yt()),La=Array.from({length:16},()=>Yt()),na=Yt(),Be="w",Ye="b",je="p",ca="n",Vt="b",At="r",mt="q",De="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Ut{constructor(t,e){Se(this,"color");Se(this,"from");Se(this,"to");Se(this,"piece");Se(this,"captured");Se(this,"promotion");Se(this,"flags");Se(this,"san");Se(this,"lan");Se(this,"before");Se(this,"after");const{color:s,piece:c,from:o,to:m,flags:i,captured:w,promotion:P}=e,C=Ee(o),j=Ee(m);this.color=s,this.piece=c,this.from=C,this.to=j,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=C+j,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const E in re)re[E]&i&&(this.flags+=xt[E]);w&&(this.captured=w),P&&(this.promotion=P,this.lan+=P)}isCapture(){return this.flags.indexOf(xt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(xt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(xt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(xt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(xt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(xt.BIG_PAWN)>-1}}const Le=-1,xt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},re={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},pa={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},qa={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},za={...pa,...qa},ie={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},oa={b:[16,32,17,15],w:[-16,-32,-17,-15]},fa={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ra=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Na=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ba={p:1,n:2,b:4,r:8,q:16,k:32},Oa="pnbrqkPNBRQK",ma=[ca,Vt,At,mt],Fa=7,Ha=6,Ua=1,Ga=0,Gt={[De]:re.KSIDE_CASTLE,[mt]:re.QSIDE_CASTLE},bt={w:[{square:ie.a1,flag:re.QSIDE_CASTLE},{square:ie.h1,flag:re.KSIDE_CASTLE}],b:[{square:ie.a8,flag:re.QSIDE_CASTLE},{square:ie.h8,flag:re.KSIDE_CASTLE}]},Wa={b:Ua,w:Ha},sa="--";function kt(n){return n>>4}function jt(n){return n&15}function xa(n){return"0123456789".indexOf(n)!==-1}function Ee(n){const t=jt(n),e=kt(n);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function _t(n){return n===Be?Ye:Be}function Ka(n){const t=n.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const s=parseInt(t[4],10);if(isNaN(s)||s<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const c=t[0].split("/");if(c.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let m=0;m<c.length;m++){let i=0,w=!1;for(let P=0;P<c[m].length;P++)if(xa(c[m][P])){if(w)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};i+=parseInt(c[m][P],10),w=!0}else{if(!/^[prnbqkPRNBQK]$/.test(c[m][P]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};i+=1,w=!1}if(i!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const o=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:m,regex:i}of o){if(!i.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${m} king`};if((t[0].match(i)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${m} kings`}}return Array.from(c[0]+c[7]).some(m=>m.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Va(n,t){const e=n.from,s=n.to,c=n.piece;let o=0,m=0,i=0;for(let w=0,P=t.length;w<P;w++){const C=t[w].from,j=t[w].to,E=t[w].piece;c===E&&e!==C&&s===j&&(o++,kt(e)===kt(C)&&m++,jt(e)===jt(C)&&i++)}return o>0?m>0&&i>0?Ee(e):i>0?Ee(e).charAt(1):Ee(e).charAt(0):""}function ft(n,t,e,s,c,o=void 0,m=re.NORMAL){const i=kt(s);if(c===je&&(i===Fa||i===Ga))for(let w=0;w<ma.length;w++){const P=ma[w];n.push({color:t,from:e,to:s,piece:c,captured:o,promotion:P,flags:m|re.PROMOTION})}else n.push({color:t,from:e,to:s,piece:c,captured:o,flags:m})}function ha(n){let t=n.charAt(0);return t>="a"&&t<="h"?n.match(/[a-h]\d.*[a-h]\d/)?void 0:je:(t=t.toLowerCase(),t==="o"?De:t)}function la(n){return n.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class va{constructor(t=ra,{skipValidation:e=!1}={}){Se(this,"_board",new Array(128));Se(this,"_turn",Be);Se(this,"_header",{});Se(this,"_kings",{w:Le,b:Le});Se(this,"_epSquare",-1);Se(this,"_halfMoves",0);Se(this,"_moveNumber",0);Se(this,"_history",[]);Se(this,"_comments",{});Se(this,"_castling",{w:0,b:0});Se(this,"_hash",0n);Se(this,"_positionCount",new Map);this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Le,b:Le},this._turn=Be,this._castling={w:0,b:0},this._epSquare=Le,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...za},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:s=!1}={}){let c=t.split(/\s+/);if(c.length>=2&&c.length<6){const i=["-","-","0","1"];t=c.concat(i.slice(-(6-c.length))).join(" ")}if(c=t.split(/\s+/),!e){const{ok:i,error:w}=Ka(t);if(!i)throw new Error(w)}const o=c[0];let m=0;this.clear({preserveHeaders:s});for(let i=0;i<o.length;i++){const w=o.charAt(i);if(w==="/")m+=8;else if(xa(w))m+=parseInt(w,10);else{const P=w<"a"?Be:Ye;this._put({type:w.toLowerCase(),color:P},Ee(m)),m++}}this._turn=c[1],c[2].indexOf("K")>-1&&(this._castling.w|=re.KSIDE_CASTLE),c[2].indexOf("Q")>-1&&(this._castling.w|=re.QSIDE_CASTLE),c[2].indexOf("k")>-1&&(this._castling.b|=re.KSIDE_CASTLE),c[2].indexOf("q")>-1&&(this._castling.b|=re.QSIDE_CASTLE),this._epSquare=c[3]==="-"?Le:ie[c[3]],this._halfMoves=parseInt(c[4],10),this._moveNumber=parseInt(c[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){var m,i;let e=0,s="";for(let w=ie.a8;w<=ie.h1;w++){if(this._board[w]){e>0&&(s+=e,e=0);const{color:P,type:C}=this._board[w];s+=P===Be?C.toUpperCase():C.toLowerCase()}else e++;w+1&136&&(e>0&&(s+=e),w!==ie.h1&&(s+="/"),e=0,w+=8)}let c="";this._castling[Be]&re.KSIDE_CASTLE&&(c+="K"),this._castling[Be]&re.QSIDE_CASTLE&&(c+="Q"),this._castling[Ye]&re.KSIDE_CASTLE&&(c+="k"),this._castling[Ye]&re.QSIDE_CASTLE&&(c+="q"),c=c||"-";let o="-";if(this._epSquare!==Le)if(t)o=Ee(this._epSquare);else{const w=this._epSquare+(this._turn===Be?16:-16),P=[w+1,w-1];for(const C of P){if(C&136)continue;const j=this._turn;if(((m=this._board[C])==null?void 0:m.color)===j&&((i=this._board[C])==null?void 0:i.type)===je){this._makeMove({color:j,from:C,to:this._epSquare,piece:je,captured:je,flags:re.EP_CAPTURE});const E=!this._isKingAttacked(j);if(this._undoMove(),E){o=Ee(this._epSquare);break}}}}return[s,this._turn,c,o,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:s}=this._board[t],c={w:0,b:1}[e],o={p:0,n:1,b:2,r:3,q:4,k:5}[s];return Pa[c][o][t]}_epKey(){return this._epSquare===Le?0n:Ma[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return La[t]}_computeHash(){let t=0n;for(let e=ie.a8;e<=ie.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=na),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[ie[t]]}findPiece(t){var s;const e=[];for(let c=ie.a8;c<=ie.h1;c++){if(c&136){c+=7;continue}!this._board[c]||((s=this._board[c])==null?void 0:s.color)!==t.color||this._board[c].color===t.color&&this._board[c].type===t.type&&e.push(Ee(c))}return e}put({type:t,color:e},s){return this._put({type:t,color:e},s)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},s){if(Oa.indexOf(t.toLowerCase())===-1||!(s in ie))return!1;const c=ie[s];if(t==De&&!(this._kings[e]==Le||this._kings[e]==c))return!1;const o=this._board[c];return o&&o.type===De&&(this._kings[o.color]=Le),this._set(c,{type:t,color:e}),t===De&&(this._kings[e]=c),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(ie[t]),e&&e.type===De&&(this._kings[e.color]=Le),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){var s,c,o,m,i,w,P,C,j,E,Q,V;this._hash^=this._castlingKey();const t=((s=this._board[ie.e1])==null?void 0:s.type)===De&&((c=this._board[ie.e1])==null?void 0:c.color)===Be,e=((o=this._board[ie.e8])==null?void 0:o.type)===De&&((m=this._board[ie.e8])==null?void 0:m.color)===Ye;(!t||((i=this._board[ie.a1])==null?void 0:i.type)!==At||((w=this._board[ie.a1])==null?void 0:w.color)!==Be)&&(this._castling.w&=-65),(!t||((P=this._board[ie.h1])==null?void 0:P.type)!==At||((C=this._board[ie.h1])==null?void 0:C.color)!==Be)&&(this._castling.w&=-33),(!e||((j=this._board[ie.a8])==null?void 0:j.type)!==At||((E=this._board[ie.a8])==null?void 0:E.color)!==Ye)&&(this._castling.b&=-65),(!e||((Q=this._board[ie.h8])==null?void 0:Q.type)!==At||((V=this._board[ie.h8])==null?void 0:V.color)!==Ye)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){var o,m;if(this._epSquare===Le)return;const t=this._epSquare+(this._turn===Be?-16:16),e=this._epSquare+(this._turn===Be?16:-16),s=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||((o=this._board[e])==null?void 0:o.color)!==_t(this._turn)||((m=this._board[e])==null?void 0:m.type)!==je){this._hash^=this._epKey(),this._epSquare=Le;return}const c=i=>{var w,P;return!(i&136)&&((w=this._board[i])==null?void 0:w.color)===this._turn&&((P=this._board[i])==null?void 0:P.type)===je};s.some(c)||(this._hash^=this._epKey(),this._epSquare=Le)}_attacked(t,e,s){const c=[];for(let o=ie.a8;o<=ie.h1;o++){if(o&136){o+=7;continue}if(this._board[o]===void 0||this._board[o].color!==t)continue;const m=this._board[o],i=o-e;if(i===0)continue;const w=i+119;if(Ra[w]&Ba[m.type]){if(m.type===je){if(i>0&&m.color===Be||i<=0&&m.color===Ye)if(s)c.push(Ee(o));else return!0;continue}if(m.type==="n"||m.type==="k")if(s){c.push(Ee(o));continue}else return!0;const P=Na[w];let C=o+P,j=!1;for(;C!==e;){if(this._board[C]!=null){j=!0;break}C+=P}if(!j)if(s){c.push(Ee(o));continue}else return!0}}return s?c:!1}attackers(t,e){return e?this._attacked(e,ie[t],!0):this._attacked(this._turn,ie[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(_t(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,ie[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let s=0,c=0;for(let o=ie.a8;o<=ie.h1;o++){if(c=(c+1)%2,o&136){o+=7;continue}const m=this._board[o];m&&(t[m.type]=m.type in t?t[m.type]+1:1,m.type===Vt&&e.push(c),s++)}if(s===2)return!0;if(s===3&&(t[Vt]===1||t[ca]===1))return!0;if(s===t[Vt]+2){let o=0;const m=e.length;for(let i=0;i<m;i++)o+=e[i];if(o===0||o===m)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:s=void 0}={}){const c=this._moves({square:e,piece:s});return t?c.map(o=>new Ut(this,o)):c.map(o=>this._moveToSan(o,c))}_moves({legal:t=!0,piece:e=void 0,square:s=void 0}={}){var Q;const c=s?s.toLowerCase():void 0,o=e==null?void 0:e.toLowerCase(),m=[],i=this._turn,w=_t(i);let P=ie.a8,C=ie.h1,j=!1;if(c)if(c in ie)P=C=ie[c],j=!0;else return[];for(let V=P;V<=C;V++){if(V&136){V+=7;continue}if(!this._board[V]||this._board[V].color===w)continue;const{type:me}=this._board[V];let ve;if(me===je){if(o&&o!==me)continue;ve=V+oa[i][0],this._board[ve]||(ft(m,i,V,ve,je),ve=V+oa[i][1],Wa[i]===kt(V)&&!this._board[ve]&&ft(m,i,V,ve,je,void 0,re.BIG_PAWN));for(let ze=2;ze<4;ze++)ve=V+oa[i][ze],!(ve&136)&&(((Q=this._board[ve])==null?void 0:Q.color)===w?ft(m,i,V,ve,je,this._board[ve].type,re.CAPTURE):ve===this._epSquare&&ft(m,i,V,ve,je,je,re.EP_CAPTURE))}else{if(o&&o!==me)continue;for(let ze=0,Je=fa[me].length;ze<Je;ze++){const nt=fa[me][ze];for(ve=V;ve+=nt,!(ve&136);){if(!this._board[ve])ft(m,i,V,ve,me);else{if(this._board[ve].color===i)break;ft(m,i,V,ve,me,this._board[ve].type,re.CAPTURE);break}if(me===ca||me===De)break}}}}if((o===void 0||o===De)&&(!j||C===this._kings[i])){if(this._castling[i]&re.KSIDE_CASTLE){const V=this._kings[i],me=V+2;!this._board[V+1]&&!this._board[me]&&!this._attacked(w,this._kings[i])&&!this._attacked(w,V+1)&&!this._attacked(w,me)&&ft(m,i,this._kings[i],me,De,void 0,re.KSIDE_CASTLE)}if(this._castling[i]&re.QSIDE_CASTLE){const V=this._kings[i],me=V-2;!this._board[V-1]&&!this._board[V-2]&&!this._board[V-3]&&!this._attacked(w,this._kings[i])&&!this._attacked(w,V-1)&&!this._attacked(w,me)&&ft(m,i,this._kings[i],me,De,void 0,re.QSIDE_CASTLE)}}if(!t||this._kings[i]===-1)return m;const E=[];for(let V=0,me=m.length;V<me;V++)this._makeMove(m[V]),this._isKingAttacked(i)||E.push(m[V]),this._undoMove();return E}move(t,{strict:e=!1}={}){let s=null;if(typeof t=="string")s=this._moveFromSan(t,e);else if(t===null)s=this._moveFromSan(sa,e);else if(typeof t=="object"){const o=this._moves();for(let m=0,i=o.length;m<i;m++)if(t.from===Ee(o[m].from)&&t.to===Ee(o[m].to)&&(!("promotion"in o[m])||t.promotion===o[m].promotion)){s=o[m];break}}if(!s)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&s.flags&re.NULL_MOVE)throw new Error("Null move not allowed when in check");const c=new Ut(this,s);return this._makeMove(s),this._incPositionCount(),c}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){var c,o,m,i;const e=this._turn,s=_t(e);if(this._push(t),t.flags&re.NULL_MOVE){e===Ye&&this._moveNumber++,this._halfMoves++,this._turn=s,this._epSquare=Le;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&re.EP_CAPTURE&&(this._turn===Ye?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===De){if(this._kings[e]=t.to,t.flags&re.KSIDE_CASTLE){const w=t.to-1,P=t.to+1;this._movePiece(P,w)}else if(t.flags&re.QSIDE_CASTLE){const w=t.to+1,P=t.to-2;this._movePiece(P,w)}this._castling[e]=0}if(this._castling[e]){for(let w=0,P=bt[e].length;w<P;w++)if(t.from===bt[e][w].square&&this._castling[e]&bt[e][w].flag){this._castling[e]^=bt[e][w].flag;break}}if(this._castling[s]){for(let w=0,P=bt[s].length;w<P;w++)if(t.to===bt[s][w].square&&this._castling[s]&bt[s][w].flag){this._castling[s]^=bt[s][w].flag;break}}if(this._hash^=this._castlingKey(),t.flags&re.BIG_PAWN){let w;e===Ye?w=t.to-16:w=t.to+16,!(t.to-1&136)&&((c=this._board[t.to-1])==null?void 0:c.type)===je&&((o=this._board[t.to-1])==null?void 0:o.color)===s||!(t.to+1&136)&&((m=this._board[t.to+1])==null?void 0:m.type)===je&&((i=this._board[t.to+1])==null?void 0:i.color)===s?(this._epSquare=w,this._hash^=this._epKey()):this._epSquare=Le}else this._epSquare=Le;t.piece===je?this._halfMoves=0:t.flags&(re.CAPTURE|re.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===Ye&&this._moveNumber++,this._turn=s,this._hash^=na}undo(){const t=this._hash,e=this._undoMove();if(e){const s=new Ut(this,e);return this._decPositionCount(t),s}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=na;const s=this._turn,c=_t(s);if(e.flags&re.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:s})),e.captured)if(e.flags&re.EP_CAPTURE){let o;s===Ye?o=e.to-16:o=e.to+16,this._set(o,{type:je,color:c})}else this._set(e.to,{type:e.captured,color:c});if(e.flags&(re.KSIDE_CASTLE|re.QSIDE_CASTLE)){let o,m;e.flags&re.KSIDE_CASTLE?(o=e.to+1,m=e.to-1):(o=e.to-2,m=e.to+1),this._movePiece(m,o)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const s=[];let c=!1;for(const E in this._header)this._header[E]&&s.push(`[${E} "${this._header[E]}"]`+t),c=!0;c&&this._history.length&&s.push(t);const o=E=>{const Q=this._comments[this.fen()];if(typeof Q<"u"){const V=E.length>0?" ":"";E=`${E}${V}{${Q}}`}return E},m=[];for(;this._history.length>0;)m.push(this._undoMove());const i=[];let w="";for(m.length===0&&i.push(o(""));m.length>0;){w=o(w);const E=m.pop();if(!E)break;if(!this._history.length&&E.color==="b"){const Q=`${this._moveNumber}. ...`;w=w?`${w} ${Q}`:Q}else E.color==="w"&&(w.length&&i.push(w),w=this._moveNumber+".");w=w+" "+this._moveToSan(E,this._moves({legal:!0})),this._makeMove(E)}if(w.length&&i.push(o(w)),i.push(this._header.Result||"*"),e===0)return s.join("")+i.join(" ");const P=function(){return s.length>0&&s[s.length-1]===" "?(s.pop(),!0):!1},C=function(E,Q){for(const V of Q.split(" "))if(V){if(E+V.length>e){for(;P();)E--;s.push(t),E=0}s.push(V),E+=V.length,s.push(" "),E++}return P()&&E--,E};let j=0;for(let E=0;E<i.length;E++){if(j+i[E].length>e&&i[E].includes("{")){j=C(j,i[E]);continue}j+i[E].length>e&&E!==0?(s[s.length-1]===" "&&s.pop(),s.push(t),j=0):E!==0&&(s.push(" "),j++),s.push(i[E]),j+=i[E].length}return s.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??pa[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=pa[t]||null,!0):!1}getHeaders(){const t={};for(const[e,s]of Object.entries(this._header))s!==null&&(t[e]=s);return t}loadPgn(t,{strict:e=!1,newlineChar:s=`\r?
`}={}){s!==`\r?
`&&(t=t.replace(new RegExp(s,"g"),`
`));const c=Ea(t);this.reset();const o=c.headers;let m="";for(const P in o)P.toLowerCase()==="fen"&&(m=o[P]),this.header(P,o[P]);if(!e)m&&this.load(m,{preserveHeaders:!0});else if(o.SetUp==="1"){if(!("FEN"in o))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(o.FEN,{preserveHeaders:!0})}let i=c.root;for(;i;){if(i.move){const P=this._moveFromSan(i.move,e);if(P==null)throw new Error(`Invalid move in PGN: ${i.move}`);this._makeMove(P),this._incPositionCount()}i.comment!==void 0&&(this._comments[this.fen()]=i.comment),i=i.variations[0]}const w=c.result;w&&Object.keys(this._header).length&&this._header.Result!==w&&this.setHeader("Result",w)}_moveToSan(t,e){let s="";if(t.flags&re.KSIDE_CASTLE)s="O-O";else if(t.flags&re.QSIDE_CASTLE)s="O-O-O";else{if(t.flags&re.NULL_MOVE)return sa;if(t.piece!==je){const c=Va(t,e);s+=t.piece.toUpperCase()+c}t.flags&(re.CAPTURE|re.EP_CAPTURE)&&(t.piece===je&&(s+=Ee(t.from)[0]),s+="x"),s+=Ee(t.to),t.promotion&&(s+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?s+="#":s+="+"),this._undoMove(),s}_moveFromSan(t,e=!1){let s=la(t);if(e||(s==="0-0"?s="O-O":s==="0-0-0"&&(s="O-O-O")),s==sa)return{color:this._turn,from:0,to:0,piece:"k",flags:re.NULL_MOVE};let c=ha(s),o=this._moves({legal:!0,piece:c});for(let E=0,Q=o.length;E<Q;E++)if(s===la(this._moveToSan(o[E],o)))return o[E];if(e)return null;let m,i,w,P,C,j=!1;if(i=s.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),i?(m=i[1],w=i[2],P=i[3],C=i[4],w.length==1&&(j=!0)):(i=s.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),i&&(m=i[1],w=i[2],P=i[3],C=i[4],w.length==1&&(j=!0))),c=ha(s),o=this._moves({legal:!0,piece:m||c}),!P)return null;for(let E=0,Q=o.length;E<Q;E++)if(w){if((!m||m.toLowerCase()==o[E].piece)&&ie[w]==o[E].from&&ie[P]==o[E].to&&(!C||C.toLowerCase()==o[E].promotion))return o[E];if(j){const V=Ee(o[E].from);if((!m||m.toLowerCase()==o[E].piece)&&ie[P]==o[E].to&&(w==V[0]||w==V[1])&&(!C||C.toLowerCase()==o[E].promotion))return o[E]}}else if(s===la(this._moveToSan(o[E],o)).replace("x",""))return o[E];return null}ascii(){let t=`   +------------------------+
`;for(let e=ie.a8;e<=ie.h1;e++){if(jt(e)===0&&(t+=" "+"87654321"[kt(e)]+" |"),this._board[e]){const s=this._board[e].type,o=this._board[e].color===Be?s.toUpperCase():s.toLowerCase();t+=" "+o+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let s=0;const c=this._turn;for(let o=0,m=e.length;o<m;o++)this._makeMove(e[o]),this._isKingAttacked(c)||(t-1>0?s+=this.perft(t-1):s++),this._undoMove();return s}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let s=ie.a8;s<=ie.h1;s++)this._board[s]==null?e.push(null):e.push({square:Ee(s),type:this._board[s].type,color:this._board[s].color}),s+1&136&&(t.push(e),e=[],s+=8);return t}squareColor(t){if(t in ie){const e=ie[t];return(kt(e)+jt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],s=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const c=e.pop();if(!c)break;t?s.push(new Ut(this,c)):s.push(this._moveToSan(c,this._moves())),this._makeMove(c)}return s}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},s=c=>{c in this._comments&&(e[c]=this._comments[c])};for(;this._history.length>0;)t.push(this._undoMove());for(s(this.fen());;){const c=t.pop();if(!c)break;this._makeMove(c),s(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const c of[De,mt])e[c]!==void 0&&(e[c]?this._castling[t]|=Gt[c]:this._castling[t]&=~Gt[c]);this._updateCastlingRights();const s=this.getCastlingRights(t);return(e[De]===void 0||e[De]===s[De])&&(e[mt]===void 0||e[mt]===s[mt])}getCastlingRights(t){return{[De]:(this._castling[t]&Gt[De])!==0,[mt]:(this._castling[t]&Gt[mt])!==0}}moveNumber(){return this._moveNumber}}async function Za(n,t={}){var ue,oe,pe;const e=t.currentUser||{};let s="chat",c=[],o=null,m=[],i=[],w=null,P=null,C=!1,j=null,E=null;n.innerHTML=`
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
  `,Ya(),await nt(),Ae();const Q=n.querySelector("#tab-nav-chat"),V=n.querySelector("#tab-nav-lounge"),me=n.querySelector("#bonding-chat-main-wrap"),ve=n.querySelector("#bonding-lounge-main-wrap");Q==null||Q.addEventListener("click",()=>{s="chat",Q.classList.add("active"),V.classList.remove("active"),me.style.display="grid",ve.style.display="none",Ae()}),V==null||V.addEventListener("click",async()=>{s="lounge_games",V.classList.add("active"),Q.classList.remove("active"),me.style.display="none",ve.style.display="block",await f()}),(ue=n.querySelector("#btn-top-new-chat"))==null||ue.addEventListener("click",H),(oe=n.querySelector("#btn-top-new-group"))==null||oe.addEventListener("click",k),(pe=n.querySelector("#btn-top-challenge"))==null||pe.addEventListener("click",()=>O());const ze=n.querySelector("#bonding-search-input");ze&&ze.addEventListener("input",r=>{const b=r.target.value.toLowerCase().trim();n.querySelectorAll(".bonding-channel-item").forEach(_=>{const y=_.textContent.toLowerCase();_.style.display=y.includes(b)?"flex":"none"})}),st(),new MutationObserver((r,b)=>{document.body.contains(n)||(P&&clearInterval(P),E&&clearInterval(E),b.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function nt(){try{const[r,b]=await Promise.all([qe("/bonding/channels").catch(()=>[]),qe("/bonding/colleagues").catch(()=>[])]);c=r,m=b,!o&&c.length>0&&(o=c.find(l=>l.name.includes("Lounge"))||c[0]),Ge(),o&&await Ce(o._id)}catch(r){console.error("Failed to load bonding data",r)}}async function Ce(r,b=!1){if(r)try{i=await qe(`/bonding/channels/${r}/messages`),b?d():g()}catch(l){console.error("Failed to load messages",l)}}function st(){P&&clearInterval(P),P=setInterval(async()=>{try{if(!document.body.contains(n)){clearInterval(P);return}s==="chat"&&o?await Ce(o._id,!0):s==="lounge_games"&&await f(!0)}catch{}},3e3)}function Ge(){const r=n.querySelector("#bonding-group-list"),b=n.querySelector("#bonding-direct-list");if(!r||!b)return;const l=c.filter(y=>y.type==="group"),_=c.filter(y=>y.type==="direct");l.length===0?r.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>':r.innerHTML=l.map(y=>{var A;return`
          <div class="bonding-channel-item ${o&&o._id===y._id?"active":""}" data-channel-id="${y._id}">
            <div class="bonding-channel-icon">${y.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${$(y.name)}</div>
              <div class="bonding-channel-preview">${$(((A=y.lastMessage)==null?void 0:A.content)||"No messages yet")}</div>
            </div>
            
            <button class="bonding-channel-del-btn" data-channel-id="${y._id}" title="Delete Group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),_.length===0?b.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':b.innerHTML=_.map(y=>{var G;const z=o&&o._id===y._id,A=y.displayName||y.name||"Colleague",U=A.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${z?"active":""}" data-channel-id="${y._id}">
            <div class="bonding-channel-avatar">${U}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${$(A)}</div>
              <div class="bonding-channel-preview">${$(((G=y.lastMessage)==null?void 0:G.content)||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${y._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),ht()}function ht(){var b,l;const r=n.querySelectorAll(".bonding-channel-item");r.forEach(_=>{_.onclick=async y=>{if(y.target.closest(".bonding-channel-del-btn"))return;const z=_.dataset.channelId,A=c.find(U=>U._id===z);A&&(o=A,r.forEach(U=>U.classList.remove("active")),_.classList.add("active"),Ae(),await Ce(A._id))}}),n.querySelectorAll(".bonding-channel-del-btn").forEach(_=>{_.onclick=async y=>{y.stopPropagation();const z=_.dataset.channelId,A=c.find(W=>W._id===z),U=A&&A.type==="direct",G=U?"this 1-on-1 chat":`the group "${(A==null?void 0:A.name)||""}"`;if(confirm(`Are you sure you want to delete ${G}? All messages will be permanently removed.`))try{_.disabled=!0,await Qe(`/bonding/channels/${z}`),S(U?"1-on-1 chat deleted":"Group deleted","success"),c=c.filter(W=>W._id!==z),o&&o._id===z&&(o=c[0]||null,Ae(),o&&await Ce(o._id)),Ge()}catch(W){S(W.message||"Failed to delete conversation","error"),_.disabled=!1}}}),(b=n.querySelector("#btn-create-group"))==null||b.addEventListener("click",k),(l=n.querySelector("#btn-new-direct-chat"))==null||l.addEventListener("click",H)}function Ae(){const r=n.querySelector("#bonding-chat-panel");if(!r)return;if(!o){r.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const b=$(o.displayName||o.name),l=(o.members||[]).length,_=o.type==="group",y=(e==null?void 0:e._id)||(e==null?void 0:e.id),z=_?null:(o.members||[]).find(A=>{var U;return((U=A.userId)==null?void 0:U.toString())!==(y==null?void 0:y.toString())});r.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${_?o.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${b}</div>
            <div class="bonding-chat-sub">
              ${_?`<span>${l} members</span> · <span>${$(o.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${_?`
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
        ${Re()}
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
    `,We(z),ye(z),rt(),a()}function Re(){if(!i||i.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const r=(e==null?void 0:e._id)||(e==null?void 0:e.id);return i.map(b=>{var A,U,G,W,L,se,ee,ce,J;const l=b.sender&&b.sender.userId&&r&&b.sender.userId.toString()===r.toString();if(b.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${b._id}">
            <span>ℹ️</span> <span>${$(b.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${b._id}" title="Delete Message">&times;</button>
          </div>
        `;if(b.type==="challenge"&&b.challengeData){const F=b.challengeData,T=F.gameTitle||"Game Challenge",D=F.gameType||"chess",Y=D==="chess"?"♟️":D==="ludo"?"🎲":"❌",be=(A=F.gameState)==null?void 0:A.invitationId,we=(U=F.targetUserId)==null?void 0:U.toString(),Ie=(W=(G=b.sender)==null?void 0:G.userId)==null?void 0:W.toString(),ne=r&&we===r.toString(),ge=r&&Ie===r.toString();return`
          <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${b._id}">
            <div class="bonding-msg-avatar" title="${$(((L=b.sender)==null?void 0:L.name)||"Teammate")}">
              ${(((se=b.sender)==null?void 0:se.name)||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${$(((ee=b.sender)==null?void 0:ee.name)||"Teammate")}</span>
                <span class="bonding-msg-time">${de(b.createdAt)}</span>
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
                  <div class="game-bubble-icon">${Y}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${$(T)}</h4>
                    <p class="game-bubble-desc">${$(b.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${F.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':F.status==="active"||F.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${$(((ce=F.status)==null?void 0:ce.toUpperCase())||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${F.status==="pending"&&ne?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${be}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${be}" data-action="decline">
                        Decline
                      </button>
                    `:F.status==="pending"&&ge?`
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

              ${he(b)}
            </div>
          </div>
        `}const _=$(((J=b.sender)==null?void 0:J.name)||"Teammate"),y=de(b.createdAt),z=he(b);return`
        <div class="bonding-msg-row ${l?"self":"other"}" data-msg-id="${b._id}">
          <div class="bonding-msg-avatar" title="${_}">${_.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${_}</span>
              <span class="bonding-msg-time">${y}</span>
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
            ${z}
          </div>
        </div>
      `}).join("")}function he(r){return`
      <div class="bonding-reactions-row">
        ${(r.reactions||[]).map(_=>{const y=(e==null?void 0:e._id)||(e==null?void 0:e.id);return`
        <button class="bonding-rxn-tag ${(_.users||[]).some(A=>A.toString()===(y==null?void 0:y.toString()))?"active":""}" data-msg-id="${r._id}" data-emoji="${_.emoji}">
          <span>${_.emoji}</span> <span>${_.users?_.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${r._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function We(r){const b=n.querySelector("#btn-chat-challenge");b&&(b.onclick=()=>{r?O(null,r.userId||r._id):O()});const l=n.querySelector("#btn-manage-members");l&&(l.onclick=q);const _=n.querySelector("#btn-delete-group");_&&(_.onclick=B);const y=n.querySelector("#btn-delete-direct");y&&(y.onclick=async()=>{if(o&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{y.disabled=!0,await Qe(`/bonding/channels/${o._id}`),S("1-on-1 chat deleted successfully","success");const A=o._id;c=c.filter(U=>U._id!==A),o=c[0]||null,Ge(),Ae(),o&&await Ce(o._id)}catch(A){S(A.message||"Could not delete 1-on-1 chat","error"),y.disabled=!1}});const z=n.querySelector("#btn-clear-chat");z&&(z.onclick=async()=>{if(o&&confirm("Are you sure you want to clear all messages in this conversation?"))try{z.disabled=!0,await Qe(`/bonding/channels/${o._id}/messages`),S("Chat messages cleared","success"),i=[],g()}catch(A){S(A.message||"Could not clear chat messages","error")}finally{z.disabled=!1}})}function ye(r){const b=n.querySelector("#bonding-message-input"),l=n.querySelector("#btn-send-message"),_=n.querySelector("#btn-quick-emoji"),y=n.querySelector("#btn-input-challenge");b&&b.addEventListener("keydown",z=>{z.key==="Enter"&&!z.shiftKey&&(z.preventDefault(),et())}),l&&(l.onclick=et),y&&(y.onclick=()=>{r?O(null,r.userId||r._id):O()}),_&&(_.onclick=()=>{if(!b)return;const z=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],A=z[Math.floor(Math.random()*z.length)];b.value+=(b.value?" ":"")+A,b.focus()})}function rt(){n.querySelectorAll(".btn-respond-invite").forEach(_=>{_.onclick=async()=>{const y=_.dataset.inviteId,z=_.dataset.action;await R(y,z)}}),n.querySelectorAll(".btn-launch-match-from-card").forEach(_=>{_.onclick=async()=>{const y=_.dataset.inviteId;try{_.disabled=!0;const z=await qe("/bonding/invitations"),A=(z.incoming||[]).concat(z.sent||[]).find(U=>U._id===y);A&&A.matchId?K(A.matchId):S("Match has not started yet or has expired","warning")}catch(z){S(z.message||"Could not load match","error")}finally{_.disabled=!1}}}),n.querySelectorAll(".bonding-msg-del-btn").forEach(_=>{_.onclick=async y=>{y.stopPropagation();const z=_.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{_.disabled=!0,await Qe(`/bonding/messages/${z}`),i=i.filter(A=>A._id!==z),d(),S("Message deleted","success")}catch(A){S(A.message||"Failed to delete message","error"),_.disabled=!1}}}),n.querySelectorAll(".bonding-rxn-tag").forEach(_=>{_.onclick=async()=>{const y=_.dataset.msgId,z=_.dataset.emoji;await p(y,z)}}),n.querySelectorAll(".bonding-add-rxn-btn").forEach(_=>{_.onclick=y=>{const z=_.dataset.msgId;le(y.currentTarget,async A=>{await p(z,A)})}})}async function et(){const r=n.querySelector("#bonding-message-input");if(!r||!o||C)return;const b=r.value.trim();if(b)try{C=!0,r.value="";const l=await ke(`/bonding/channels/${o._id}/messages`,{content:b,type:"text"});i.push(l),g(),a()}catch(l){S(l.message||"Failed to send message","error")}finally{C=!1,r.focus()}}async function p(r,b){try{const l=await ke(`/bonding/messages/${r}/react`,{emoji:b}),_=i.find(y=>y._id===r);_&&(_.reactions=l,d())}catch(l){S(l.message||"Failed to react","error")}}function a(){const r=n.querySelector("#bonding-messages-feed");r&&(r.scrollTop=r.scrollHeight)}function d(){const r=n.querySelector("#bonding-messages-feed");if(!r)return;const b=r.scrollHeight-r.scrollTop<=r.clientHeight+80;r.innerHTML=Re(),rt(),b&&a()}function g(){const r=n.querySelector("#bonding-messages-feed");r&&(r.innerHTML=Re(),rt())}async function f(r=!1){const b=n.querySelector("#bonding-lounge-main-wrap");if(b){r||(b.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const l=await qe("/bonding/games/overview");w=l;const _=l.myStats||{},y=l.availableGames||[],z=l.incomingChallenges||[],A=l.sentChallenges||[],U=l.activeMatches||[],G=l.recentMatches||[],W=(e==null?void 0:e._id)||(e==null?void 0:e.id);b.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${_.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${_.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${_.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${_.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${_.gamesPlayed>0?Math.round((_.wins||0)/_.gamesPlayed*100):0}%</span>
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
              ${y.map(L=>`
                <div class="lounge-game-card" data-game-id="${L.id}">
                  <div class="game-card-icon">${L.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${$(L.name)}</h4>
                    <p class="game-card-desc">${$(L.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${L.duration}</span>
                      ${L.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${L.id}" data-game-title="${$(L.name)}">
                    ${L.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${z.length+A.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${z.length})</h5>
              ${z.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${z.map(L=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(L.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${$(L.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${$(L.sender.name)}</strong> (${$(L.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${L._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${L._id}" data-action="decline">
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
                    ${A.map(L=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(L.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${$(L.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${$(L.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${L._id}" data-action="cancel">
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
                <span class="badge green">${U.length} Live</span>
              </div>

              ${U.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${U.map(L=>{const ee=W&&L.player1.userId.toString()===W.toString()?L.player2:L.player1,ce=W&&L.currentTurnUserId&&L.currentTurnUserId.toString()===W.toString();return`
                        <div class="lounge-active-match-card ${ce?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${L.gameType==="chess"?"♟️":L.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${$(L.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${$(ee.name)}</strong> (${$(ee.role)})</div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ce?"my-turn":"wait"}">
                              ${ce?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${L._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${L._id}" title="Delete Match">
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
              ${G.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${G.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${G.map(L=>{const ee=W&&L.player1.userId.toString()===W.toString()?L.player2:L.player1,ce=W&&L.winnerId&&L.winnerId.toString()===W.toString(),J=L.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${$(L.gameTitle)}</span>
                          <span class="recent-date">${de(L.completedAt||L.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${L._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${$(ee.name)}</strong></div>
                          <div class="recent-outcome ${ce?"win":J?"draw":"loss"}">
                            ${ce?"🏆 VICTORY":J?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${$(L.winningReason||L.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${L._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${L._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,M()}catch(l){b.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${$(l.message)}</p>
        </div>
      `}}}function M(){n.querySelectorAll(".btn-challenge-game").forEach(b=>{b.onclick=()=>{const l=b.dataset.gameId;O(l)}}),n.querySelectorAll(".btn-respond-invite").forEach(b=>{b.onclick=async()=>{const l=b.dataset.inviteId,_=b.dataset.action;await R(l,_),await f()}}),n.querySelectorAll(".btn-resume-match").forEach(b=>{b.onclick=()=>{const l=b.dataset.matchId;K(l)}}),n.querySelectorAll(".btn-recent-rematch").forEach(b=>{b.onclick=async()=>{const l=b.dataset.matchId;try{b.disabled=!0;const _=await ke(`/bonding/matches/${l}/action`,{action:"rematch"});_.match&&(S("Rematch created! Opening arena ⚔️","success"),K(_.match._id))}catch(_){S(_.message||"Could not start rematch","error")}finally{b.disabled=!1}}}),n.querySelectorAll(".btn-delete-match").forEach(b=>{b.onclick=async l=>{l.stopPropagation();const _=b.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{b.disabled=!0,await Qe(`/bonding/matches/${_}`),S("Match deleted successfully","success"),await f()}catch(y){S(y.message||"Failed to delete match","error")}finally{b.disabled=!1}}});const r=n.querySelector("#btn-clear-matches");r&&(r.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{r.disabled=!0,await Qe("/bonding/matches?filter=completed"),S("Completed matches history cleared","success"),await f()}catch(b){S(b.message||"Failed to clear matches","error")}finally{r.disabled=!1}})}function O(r=null,b=null){const l=n.querySelector("#bonding-modals-root"),_=(e==null?void 0:e._id)||(e==null?void 0:e.id),y=new Set(["employee","admin","superadmin"]),z=m.filter(ce=>!ce.isSelf&&ce._id.toString()!==(_==null?void 0:_.toString())&&y.has(ce.role));let A=r||"chess",U=b?b.toString():null,G=2,W=U?[U]:[],L="none";function se(){const ce=z.find(D=>D._id.toString()===U),J=A==="ludo",F=G-1,T=W.length===F;l.innerHTML=`
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
                    <button class="ludo-mode-btn ${G===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${G===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${G===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${J?`Step 3 — Select Colleagues to Play With (${W.length}/${F} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${z.map(D=>{const Y=J?W.includes(D._id.toString()):U===D._id.toString();return`
                      <div class="eligible-emp-item ${Y?"selected":""}" data-user-id="${D._id}">
                        <div class="emp-item-avatar">${D.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${$(D.name)}</span>
                          <span class="emp-item-role">${$(D.role==="superadmin"?"Superadmin":D.role==="admin"?"Admin":"Employee")} · ${$(D.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${Y?"active":""}">
                          ${Y?"Selected ✓":"Select"}
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
                    <label class="timer-radio-lbl ${L==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${L==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${L==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${L==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${L==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${L==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${J?`🎲 Ludo (${G} Players · 4 Pawns per base)`:A==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${J?`
                    <div><strong>Opponents:</strong> ${W.length>0?W.map(D=>{const Y=z.find(be=>be._id.toString()===D);return Y?`<strong>${$(Y.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+F+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${ce?`<strong>${$(ce.name)}</strong> (${$(ce.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${A==="chess"?`<div><strong>Time Control:</strong> ${L==="none"?"Untimed":L}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(J?!T:!U)?"disabled":""}>
                ${J?`Start ${G}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,ee()}function ee(){l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelector("#btn-cancel-challenge-flow").onclick=()=>{l.innerHTML=""},l.querySelectorAll(".game-pill-btn").forEach(F=>{F.onclick=()=>{A=F.dataset.game,se()}}),l.querySelectorAll(".ludo-mode-btn").forEach(F=>{F.onclick=()=>{G=Number(F.dataset.count),W=W.slice(0,G-1),se()}});const ce=l.querySelector("#flow-emp-search");ce&&(ce.oninput=F=>{const T=F.target.value.toLowerCase().trim();l.querySelectorAll(".eligible-emp-item").forEach(D=>{const Y=D.textContent.toLowerCase();D.style.display=Y.includes(T)?"flex":"none"})}),l.querySelectorAll(".eligible-emp-item").forEach(F=>{F.onclick=()=>{const T=F.dataset.userId;if(A==="ludo"){const D=G-1;W.includes(T)?W=W.filter(Y=>Y!==T):W.length<D?W.push(T):W[D-1]=T}else U=T;se()}}),l.querySelectorAll('input[name="timerMode"]').forEach(F=>{F.onchange=T=>{L=T.target.value,se()}});const J=l.querySelector("#btn-submit-challenge-flow");J&&(J.onclick=async()=>{if(A==="ludo"){const F=G-1;if(W.length<F){S(`Please select ${F} colleague(s) to play with`,"warning");return}try{J.disabled=!0,J.textContent="Launching Match...";const T=await ke("/bonding/matches/instant-ludo",{playerCount:G,targetUserIds:W});l.innerHTML="",S(`Ludo match started (${G} Players)! 🎲`,"success"),T&&T._id&&K(T._id)}catch(T){S(T.message||"Failed to start Ludo match","error"),J.disabled=!1,J.textContent=`Start ${G}P Ludo Match 🎲`}return}if(!U){S("Please select an employee to challenge","warning");return}try{J.disabled=!0,J.textContent="Sending Challenge...",await ke("/bonding/invitations",{gameType:A,targetUserId:U,matchSettings:{timerMode:L},channelId:(o==null?void 0:o._id)||null}),S("Game challenge delivered! Awaiting acceptance ⚔️","success"),l.innerHTML="",o&&await Ce(o._id),s==="lounge_games"&&await f()}catch(F){S(F.message||"Could not send challenge","error"),J.disabled=!1,J.textContent="Send Challenge 🚀"}})}se()}async function R(r,b){if(!(!r||!b))try{const l=await Wt(`/bonding/invitations/${r}/respond`,{action:b});b==="accept"?(S("Challenge accepted! Entering match arena ⚔️","success"),l.match&&K(l.match._id)):b==="decline"?S("Challenge declined","info"):b==="cancel"&&S("Challenge cancelled","info"),o&&await Ce(o._id),s==="lounge_games"&&await f()}catch(l){S(l.message||"Action failed","error")}}async function K(r){if(!r)return;j=r,E&&clearInterval(E);const b=n.querySelector("#bonding-modals-root");let l=null,_=null,y=[];async function z(){try{return l=await qe(`/bonding/matches/${r}`),l}catch(ee){return S(ee.message||"Could not load match","error"),A(),null}}if(l=await z(),!l)return;function A(){E&&clearInterval(E),j=null,b.innerHTML="",s==="lounge_games"&&f(!0),o&&Ce(o._id,!0)}E=setInterval(async()=>{var F,T,D,Y;if(!j||j!==r){clearInterval(E);return}const ee=(F=l==null?void 0:l.currentTurnUserId)==null?void 0:F.toString(),ce=l==null?void 0:l.status,J=await z();J&&(((T=J.currentTurnUserId)==null?void 0:T.toString())!==ee||J.status!==ce||((D=J.moves)==null?void 0:D.length)!==((Y=l.moves)==null?void 0:Y.length))&&U()},1500);function U(){var Y,be;if(!l)return;const ee=(e==null?void 0:e._id)||(e==null?void 0:e.id),ce=ee&&l.player1.userId.toString()===ee.toString(),J=ce?l.player1:l.player2,F=ce?l.player2:l.player1,T=ee&&l.currentTurnUserId&&l.currentTurnUserId.toString()===ee.toString(),D=l.status!=="active";b.innerHTML=`
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
                  ${l.gameType==="ludo"&&((Y=l.gameState)!=null&&Y.players)?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${l.gameState.players.map(we=>{var _e;const Ie=we.userId&&we.userId.toString()===(ee==null?void 0:ee.toString()),ne={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[we.color]||"⚪",ge=(((_e=l.gameState)==null?void 0:_e.turnColor)||l.turn)===we.color;return`
                          <span class="player-tag ${Ie?"self":"opp"} ${ge?"turn-active":""}">
                            ${ne} <strong>${$(we.name)}</strong> ${Ie?"(You)":""}
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
              <div class="arena-turn-banner ${D?"ended":T?"my-turn":"opp-turn"}">
                ${D?`<span>🏁 Finished (${$(l.winningReason||l.status)})</span>`:T?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${$(F.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${l.gameType==="ludo"?T?(be=l.gameState)!=null&&be.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":l.gameType==="tictactoe"?T?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":T?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${D?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${l.drawOfferedBy&&l.drawOfferedBy.toString()!==(ee==null?void 0:ee.toString())&&!D?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${$(F.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${l.gameType==="chess"?G(ce):""}
              ${l.gameType==="tictactoe"?W():""}
              ${l.gameType==="ludo"?L(ce):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${D?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${l.winnerId&&l.winnerId.toString()===(ee==null?void 0:ee.toString())?"🏆":l.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${l.winnerId&&l.winnerId.toString()===(ee==null?void 0:ee.toString())?"VICTORY!":l.status==="draw"?"STALEMATE / DRAW":`${$(l.winnerName)} Wins!`}</h4>
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
      `,se(T,ce,J)}function G(ee){var ne;const ce=((ne=l.gameState)==null?void 0:ne.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",J=new va(ce),F=ee?l.player1.assignedRole==="white":l.player2.assignedRole==="white",T={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},D=F?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Y=F?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let be='<div class="chess-board-grid">';for(const ge of Y)for(const _e of D){const Oe=`${_e}${ge}`,$e=J.get(Oe),Xe=(_e.charCodeAt(0)-97+ge)%2!==0,tt=_===Oe,Ue=y.includes(Oe),Ne=$e?$e.color==="w"?T[$e.type.toUpperCase()]:T[$e.type]:"";be+=`
            <div class="chess-sq ${Xe?"light":"dark"} ${tt?"selected":""} ${Ue?"legal-dot":""}" data-square="${Oe}">
              ${Ne?`<span class="chess-piece ${$e.color==="w"?"white-piece":"black-piece"}">${Ne}</span>`:""}
            </div>
          `}be+="</div>";const Ie=(l.moves||[]).map(ge=>{var _e;return`
        <span class="chess-move-token">${ge.moveNum}. ${((_e=ge.moveData)==null?void 0:_e.san)||""}</span>
      `}).join(" ");return`
        <div class="chess-arena-layout">
          ${be}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${Ie||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function W(){var J;const ee=((J=l.gameState)==null?void 0:J.board)||Array(9).fill(null),ce=l.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${ee.map((F,T)=>{const D=ce.includes(T);return`
                <div class="ttt-cell ${F?"filled":"empty"} ${D?"win-cell":""}" data-cell-idx="${T}">
                  ${F==="X"?'<span class="ttt-x">✕</span>':F==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function L(ee,ce,J){var Rt;const F=l.gameState||{},T=F.activeColors||["red","green"],D=F.players||[{...l.player1,color:"red",assignedRole:"red",isBot:!1},{...l.player2,color:"green",assignedRole:"green",isBot:!1}],Y=F.tokens||{},be=I=>{const Z=Y[I]||(I==="red"?F.p1Tokens:I==="green"?F.p2Tokens:[])||[];return Array.from({length:4},(fe,Pe)=>Z[Pe]||{id:Pe,step:-1})},we=be("red"),Ie=be("green"),ne=be("yellow"),ge=be("blue"),_e=(e==null?void 0:e._id)||(e==null?void 0:e.id),Oe=D.find(I=>I.userId&&I.userId.toString()===(_e==null?void 0:_e.toString()))||D[0],$e=(Oe==null?void 0:Oe.color)||(ee?"red":"green"),Xe=F.turnColor||l.turn||"red",tt=$e===Xe&&l.status==="active",Ue=!!F.rolled,Ne=F.dice,lt=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],Dt=[[7,1],[7,2],[7,3],[7,4],[7,5]],Et=[[1,7],[2,7],[3,7],[4,7],[5,7]],It=[[7,13],[7,12],[7,11],[7,10],[7,9]],Pt=[[13,7],[12,7],[11,7],[10,7],[9,7]],v=[0,8,13,21,26,34,39,47];function dt(I,Z){return Z<0?null:Z>=56?I==="red"?[7,6]:I==="green"?[6,7]:I==="yellow"?[7,8]:[8,7]:I==="red"?Z<=50?lt[Z]:Dt[Z-51]:I==="green"?Z<=50?lt[(13+Z)%52]:Et[Z-51]:I==="yellow"?Z<=50?lt[(26+Z)%52]:It[Z-51]:Z<=50?lt[(39+Z)%52]:Pt[Z-51]}function Fe(I,Z){return I!==$e||!tt||!Ue||!Ne||l.status!=="active"?!1:Z.step===-1?Ne===6:Z.step>=0&&Z.step+Ne<=56}const ct={},N=(I,Z)=>{Z.forEach(fe=>{if(fe.step>=0&&fe.step<56){const Pe=dt(I,fe.step);if(Pe){const Ve=Pe[0]+","+Pe[1];(ct[Ve]=ct[Ve]||[]).push({color:I,id:fe.id,step:fe.step,movable:Fe(I,fe)})}}})};T.includes("red")&&N("red",we),T.includes("green")&&N("green",Ie),T.includes("yellow")&&N("yellow",ne),T.includes("blue")&&N("blue",ge);const pt={};lt.forEach(([I,Z],fe)=>{pt[I+","+Z]=fe});const Te={};Dt.forEach(([I,Z],fe)=>{Te[I+","+Z]=fe+1});const Ke={};Et.forEach(([I,Z],fe)=>{Ke[I+","+Z]=fe+1});const Mt={};It.forEach(([I,Z],fe)=>{Mt[I+","+Z]=fe+1});const He={};Pt.forEach(([I,Z],fe)=>{He[I+","+Z]=fe+1});const Ct=[];for(let I=0;I<15;I++)for(let Z=0;Z<15;Z++){if(I<6&&Z<6||I<6&&Z>8||I>8&&Z<6||I>8&&Z>8||I>=6&&I<=8&&Z>=6&&Z<=8)continue;const fe=I+","+Z,Pe=pt[fe],Ve=Pe!==void 0&&v.includes(Pe),ot=I===6&&Z===1,at=I===1&&Z===8,ut=I===8&&Z===13,Nt=I===13&&Z===6,Xt=Te[fe],Bt=Ke[fe],Zt=Mt[fe],Me=He[fe];let u="ludo-cell";ot?u+=" cell-red-start":at?u+=" cell-green-start":ut?u+=" cell-yellow-start":Nt?u+=" cell-blue-start":Xt?u+=" cell-red-stretch":Bt?u+=" cell-green-stretch":Zt?u+=" cell-yellow-stretch":Me?u+=" cell-blue-stretch":Ve&&(u+=" cell-safe-star");const x=ct[fe]||[];Ct.push(`
            <div class="${u}" style="grid-row:${I+1};grid-column:${Z+1}" data-pos="${fe}">
              ${Ve?'<span class="cell-star-glyph">⭐</span>':""}
              ${ot||at||ut||Nt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${x.map(h=>`
                <div class="ludo-token token-${h.color} ${h.movable?"movable":""}" data-token-id="${h.id}" data-color="${h.color}" title="${h.color.toUpperCase()} Pawn ${h.id+1}">
                  <span>${h.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}const Lt=["","⚀","⚁","⚂","⚃","⚄","⚅"];function X(I){return!I||I.step===-1?"Base":I.step===56?"🏁 Home!":I.step>50?`H${I.step-50}`:`S${I.step}`}function wt(I,Z,fe,Pe,Ve){const ot=`${I}-yard`;return fe?`
          <div class="ludo-yard ${ot} ${Xe===I?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${Z}</span>
                ${Pe?`<small class="yard-player-lbl">${$(Pe.name)}${Pe.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${Ve.map((at,ut)=>`
                  <div class="yard-token-slot">
                    ${at.step===-1?`
                      <div class="ludo-token token-${I} ${Fe(I,at)?"movable":""}" data-token-id="${at.id}" data-color="${I}" title="${I.toUpperCase()} Pawn ${at.id+1}">
                        <span>${at.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${ut+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `:`
            <div class="ludo-yard ${ot}">
              <div class="yard-box decorative">
                <div class="yard-title">${Z} (Inactive)</div>
              </div>
            </div>
          `}const qt=D.find(I=>I.color==="red"),Qt=D.find(I=>I.color==="green"),zt=D.find(I=>I.color==="yellow"),Jt=D.find(I=>I.color==="blue");return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${wt("red","🔴 Red Base",T.includes("red"),qt,we)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${wt("green","🟢 Green Base",T.includes("green"),Qt,Ie)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${wt("blue","🔵 Blue Base",T.includes("blue"),Jt,ge)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${wt("yellow","🟡 Yellow Base",T.includes("yellow"),zt,ne)}

            <!-- 5. Center Home Victory Zone (3x3) -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${we.filter(I=>I.step===56).map(I=>`<span class="tok-finished red" title="Red Pawn ${I.id+1} Home">🔴${I.id+1}</span>`).join("")}
                  ${Ie.filter(I=>I.step===56).map(I=>`<span class="tok-finished green" title="Green Pawn ${I.id+1} Home">🟢${I.id+1}</span>`).join("")}
                  ${ne.filter(I=>I.step===56).map(I=>`<span class="tok-finished yellow" title="Yellow Pawn ${I.id+1} Home">🟡${I.id+1}</span>`).join("")}
                  ${ge.filter(I=>I.step===56).map(I=>`<span class="tok-finished blue" title="Blue Pawn ${I.id+1} Home">🔵${I.id+1}</span>`).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Ct.join("")}
          </div>

          <!-- Ludo Action & Dice Roller Console -->
          <div class="ludo-console">
            <div class="ludo-dice-box">
              <div class="ludo-dice-visual ${Ue?"rolled":""}">
                ${Ne?`<span class="dice-glyph">${Lt[Ne]}</span>`:"🎲"}
              </div>
              ${Ne?`<span class="dice-num-lbl">Rolled ${Ne}</span>`:'<span class="dice-num-lbl">Ready</span>'}
            </div>

            <div class="ludo-controls-box">
              ${tt&&!Ue&&l.status==="active"?`
                <button class="btn-ludo-roll pulse" id="btn-ludo-roll">🎲 Roll Dice</button>
              `:tt&&Ue&&l.status==="active"?`
                <div class="ludo-prompt-text highlight">
                  ${be($e).some(I=>Fe($e,I))?"👉 Tap your <strong>glowing pawn</strong> to advance!":"No moves possible with this roll. Turn passing..."}
                </div>
              `:`
                <div class="ludo-prompt-text">
                  ${l.status==="active"?`⏳ Waiting for ${$(((Rt=D.find(I=>I.color===Xe))==null?void 0:Rt.name)||"opponent")} (${Xe.toUpperCase()})...`:"🏁 Match Concluded"}
                </div>
              `}

              <div class="ludo-status-banner">
                ${$(F.lastActionText||"Match in progress.")}
              </div>
            </div>
          </div>

          <!-- Token Progress Strip for all active players -->
          <div class="ludo-progress-strip">
            ${T.map(I=>{const Z=D.find(Ve=>Ve.color===I),fe=be(I),Pe={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[I];return`
                <div class="progress-pill ${I} ${Xe===I?"active-turn":""}">
                  <strong>${Pe} ${Z?$(Z.name):I.toUpperCase()}:</strong>
                  ${fe.map((Ve,ot)=>`P${ot+1}: ${X(Ve)}`).join(" · ")}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function se(ee,ce,J){var Ie;b.querySelector("#btn-close-arena").onclick=A;const F=b.querySelector("#btn-arena-resign");F&&(F.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{F.disabled=!0,await ke(`/bonding/matches/${r}/action`,{action:"resign"}),await z(),U()}catch(ne){S(ne.message||"Resign failed","error"),F.disabled=!1}});const T=b.querySelector("#btn-arena-draw");T&&(T.onclick=async()=>{try{await ke(`/bonding/matches/${r}/action`,{action:"offer_draw"}),S("Draw offer sent to opponent","info"),await z(),U()}catch(ne){S(ne.message||"Draw offer failed","error")}});const D=b.querySelector("#btn-confirm-accept-draw");D&&(D.onclick=async()=>{try{await ke(`/bonding/matches/${r}/action`,{action:"accept_draw"}),S("Draw agreed!","info"),await z(),U()}catch(ne){S(ne.message,"error")}});const Y=b.querySelector("#btn-confirm-decline-draw");Y&&(Y.onclick=async()=>{try{await ke(`/bonding/matches/${r}/action`,{action:"decline_draw"}),await z(),U()}catch(ne){S(ne.message,"error")}}),[b.querySelector("#btn-arena-delete-match"),b.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(ne=>{ne.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{ne.disabled=!0,await Qe(`/bonding/matches/${r}`),S("Match deleted","success"),A(),s==="lounge_games"&&await f()}catch(ge){S(ge.message||"Failed to delete match","error"),ne.disabled=!1}}});const we=b.querySelector("#btn-arena-rematch-action");if(we&&(we.onclick=async()=>{try{we.disabled=!0,we.textContent="Creating Rematch...";const ne=await ke(`/bonding/matches/${r}/action`,{action:"rematch"});ne.match&&(S("Rematch created! New match live ⚔️","success"),E&&clearInterval(E),K(ne.match._id))}catch(ne){S(ne.message||"Rematch failed","error"),we.disabled=!1,we.textContent="🔄 Request Rematch"}}),l.gameType==="chess"&&ee&&l.status==="active"){const ne=((Ie=l.gameState)==null?void 0:Ie.fen)||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",ge=new va(ne),_e=J.assignedRole==="white"?"w":"b";b.querySelectorAll(".chess-sq").forEach(Oe=>{Oe.onclick=async()=>{const $e=Oe.dataset.square;if(_){if(_===$e){_=null,y=[],U();return}if(y.includes($e)){const tt=ge.get(_);let Ue;tt&&tt.type==="p"&&($e.endsWith("8")||$e.endsWith("1"))&&(Ue=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const Ne={from:_,to:$e,promotion:Ue?Ue.toLowerCase():void 0};_=null,y=[],l=await ke(`/bonding/matches/${r}/move`,{move:Ne}),U()}catch(Ne){S(Ne.message||"Illegal chess move","error"),_=null,y=[],U()}return}}const Xe=ge.get($e);Xe&&Xe.color===_e?(_=$e,y=ge.moves({square:$e,verbose:!0}).map(Ue=>Ue.to),U()):(_=null,y=[],U())}})}if(l.gameType==="tictactoe"&&ee&&l.status==="active"&&b.querySelectorAll(".ttt-cell.empty").forEach(ne=>{ne.onclick=async()=>{const ge=ne.dataset.cellIdx;try{ne.style.opacity="0.5",l=await ke(`/bonding/matches/${r}/move`,{cellIndex:Number(ge)}),U()}catch(_e){S(_e.message||"Invalid move","error")}}}),l.gameType==="ludo"&&l.status==="active"){const ne=b.querySelector("#btn-ludo-roll");ne&&ee&&(ne.onclick=async()=>{try{ne.disabled=!0,ne.textContent="Rolling 🎲...",l=await ke(`/bonding/matches/${r}/move`,{action:"roll"}),U()}catch(ge){S(ge.message||"Failed to roll","error"),ne.disabled=!1,ne.textContent="🎲 Roll Dice"}}),ee&&b.querySelectorAll(".ludo-token.movable").forEach(ge=>{ge.onclick=async _e=>{_e.stopPropagation();const Oe=ge.dataset.tokenId;try{ge.style.opacity="0.5",l=await ke(`/bonding/matches/${r}/move`,{action:"move",tokenId:Number(Oe)}),U()}catch($e){S($e.message||"Invalid token move","error"),ge.style.opacity="1"}}})}}U()}function q(){if(!o||o.type==="direct")return;const r=n.querySelector("#bonding-modals-root"),b=G=>G==="employee"||G==="admin"||G==="superadmin",l=o.members||[],_=new Set(l.map(G=>{var W;return(W=G.userId)==null?void 0:W.toString()})),y=m.filter(G=>b(G.role)&&!_.has(G._id.toString()));r.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${$(o.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${y.map(G=>`
                    <option value="${G._id}">${$(G.name)} (${$(G.role==="superadmin"?"Superadmin":G.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${y.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${y.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${l.length}):</label>
              <div class="bonding-members-list">
                ${l.map(G=>{const W=(e==null?void 0:e._id)||(e==null?void 0:e.id),L=W&&G.userId&&G.userId.toString()===W.toString();return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(G.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${$(G.name)} ${L?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${$(G.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${G.userId}" data-name="${$(G.name)}">
                          ${L?"Leave Group":"Remove"}
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
    `,r.querySelector(".bonding-modal-close").onclick=()=>{r.innerHTML=""};const z=r.querySelector("#btn-modal-delete-group");z&&(z.onclick=()=>{r.innerHTML="",B()});const A=r.querySelector("#btn-submit-add-member");A&&(A.onclick=async()=>{const W=r.querySelector("#sel-add-colleague").value;if(!W){S("Please select a colleague to add","warning");return}try{A.disabled=!0,A.textContent="Adding...";const L=await Wt(`/bonding/channels/${o._id}/members`,{action:"add",userIds:[W]});S("Colleague added to group! 🎉","success"),o=L.channel,r.innerHTML="",await Ce(o._id),Ae()}catch(L){S(L.message||"Failed to add member","error"),A.disabled=!1,A.textContent="Add to Group"}}),r.querySelectorAll(".btn-remove-member").forEach(G=>{G.onclick=async()=>{const W=G.dataset.userId,L=G.dataset.name;if(confirm(`Are you sure you want to remove ${L} from this group?`))try{G.disabled=!0;const se=await Wt(`/bonding/channels/${o._id}/members`,{action:"remove",userId:W});S(`${L} removed from group`,"info"),o=se.channel,r.innerHTML="",await Ce(o._id),Ae()}catch(se){S(se.message||"Failed to remove member","error"),G.disabled=!1}}})}async function B(){if(!o||o.type==="direct")return;const r=o.name;if(confirm(`Are you sure you want to delete the group "${r}"?

All messages in this lounge will be deleted.`))try{await Qe(`/bonding/channels/${o._id}`),S(`Group "${r}" deleted successfully`,"success"),c=await qe("/bonding/channels").catch(()=>[]),o=c.find(l=>l.type==="group")||c[0]||null,Ge(),Ae(),o&&await Ce(o._id)}catch(l){S(l.message||"Failed to delete group","error")}}function H(){const r=n.querySelector("#bonding-modals-root"),b=y=>y==="employee"||y==="admin"||y==="superadmin",l=m.filter(y=>!y.isSelf&&b(y.role));r.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${l.map(y=>`
                <div class="bonding-user-pick-item" data-user-id="${y._id}" data-name="${$(y.name)}">
                  <div class="bonding-member-avatar">${y.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${$(y.name)}</span>
                    <span class="user-pick-role">${$(y.role==="superadmin"?"Superadmin":y.role==="admin"?"Admin":"Employee")} · ${$(y.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,r.querySelector(".bonding-modal-close").onclick=()=>{r.innerHTML=""},r.querySelectorAll(".bonding-user-pick-item").forEach(y=>{y.onclick=async()=>{const z=y.dataset.userId;try{const A=await ke("/bonding/channels",{type:"direct",targetUserId:z});r.innerHTML="",c=await qe("/bonding/channels"),o=c.find(U=>U._id===A._id)||A,Ge(),Ae(),await Ce(o._id)}catch(A){S(A.message||"Failed to open personal chat","error")}}})}function k(){const r=n.querySelector("#bonding-modals-root"),b=A=>A==="employee"||A==="admin"||A==="superadmin",l=m.filter(A=>!A.isSelf&&b(A.role));r.innerHTML=`
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
    `,r.querySelector(".bonding-modal-close").onclick=()=>{r.innerHTML=""},r.querySelector("#btn-cancel-create-grp").onclick=()=>{r.innerHTML=""};let _="👥";const y=r.querySelectorAll(".avatar-opt");y.forEach(A=>{A.onclick=()=>{y.forEach(U=>U.classList.remove("active")),A.classList.add("active"),_=A.textContent.trim()}});const z=r.querySelector("#btn-confirm-create-grp");z.onclick=async()=>{const A=r.querySelector("#new-group-name"),U=r.querySelector("#new-group-desc"),G=A.value.trim();if(!G){S("Please enter a group name","warning"),A.focus();return}const W=r.querySelectorAll(".new-group-member-chk:checked"),L=Array.from(W).map(se=>se.value);try{z.disabled=!0,z.textContent="Creating...";const se=await ke("/bonding/channels",{type:"group",name:G,description:U.value.trim(),avatar:_,memberIds:L});S(`Group "${G}" created! 🎉`,"success"),r.innerHTML="",c=await qe("/bonding/channels"),o=c.find(ee=>ee._id===se._id)||se,Ge(),Ae(),await Ce(o._id)}catch(se){S(se.message||"Failed to create group","error"),z.disabled=!1,z.textContent="Create Group 🎉"}}}function le(r,b){const l=document.querySelector(".bonding-emoji-popup");l&&l.remove();const _=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],y=document.createElement("div");y.className="bonding-emoji-popup",y.innerHTML=_.map(U=>`<button class="emoji-opt-btn" data-e="${U}">${U}</button>`).join("");const z=r.getBoundingClientRect();y.style.top=`${z.bottom+window.scrollY+6}px`,y.style.left=`${z.left+window.scrollX}px`,document.body.appendChild(y),y.querySelectorAll(".emoji-opt-btn").forEach(U=>{U.onclick=G=>{G.stopPropagation(),b(U.dataset.e),y.remove()}});const A=U=>{y.contains(U.target)||(y.remove(),document.removeEventListener("click",A))};setTimeout(()=>document.addEventListener("click",A),10)}function de(r){if(!r)return"";try{return new Date(r).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Ya(){const n=document.getElementById("ci360-bonding-styles");n&&n.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}const da=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],yt=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Tt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ei(n,t={}){const{userRole:e="employee",currentUser:s=null,initialTicketId:c=null}=t,o=e==="superadmin"||e==="admin";if(e==="client"||s&&s.role==="client"){n.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let m=[],i={},w=[],P=[],C={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",myIssuesOnly:!1},j=null,E="comments",Q=!1;n.innerHTML=`
    <div class="jira-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="jira-header-bar">
        <div class="jira-header-left">
          <div class="jira-breadcrumb">
            <span class="jira-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${o?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="jira-title-row">
            <h2 class="jira-main-title">🎫 ${o?"Support Tickets Board":"My Support Tickets"}</h2>
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

          ${o?`
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
  `,await Promise.all([me(),V(),ve(),ze()]),Je(),Ce(),nt(),Ae(),c&&We(c);async function V(){try{const a=new URLSearchParams;C.search&&a.set("search",C.search),C.priority!=="all"&&a.set("priority",C.priority),C.category!=="all"&&a.set("category",C.category),C.assigneeId!=="all"&&a.set("assigneeId",C.assigneeId),C.myIssuesOnly&&a.set("myIssuesOnly","true");const d=await qe("/tickets?"+a.toString());m=Array.isArray(d)?d:[]}catch(a){S(a.message||"Failed to load tickets",!0),m=[]}}async function me(){try{i=await qe("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function ve(){try{w=(await qe("/users")||[]).filter(d=>d.active&&d.role!=="client")}catch(a){console.warn("Could not fetch employees:",a)}}async function ze(){try{const a=await qe("/jobs?limit=50");P=Array.isArray(a)?a:(a==null?void 0:a.jobs)||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function Je(){const a=n.querySelector("#jira-stats-root");a&&(a.innerHTML=`
      <div class="jira-stat-card ${C.status==="all"&&!C.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="jira-stat-val">${i.total||0}</span>
        <span class="jira-stat-lbl">Total Tickets</span>
      </div>
      <div class="jira-stat-card ${C.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="jira-stat-val">${i.toDo||0}</span>
        <span class="jira-stat-lbl">To Do</span>
      </div>
      <div class="jira-stat-card content ${C.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="jira-stat-val">${i.content??(i.inProgress||0)}</span>
        <span class="jira-stat-lbl">Content</span>
      </div>
      <div class="jira-stat-card design ${C.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="jira-stat-val">${i.design||0}</span>
        <span class="jira-stat-lbl">Design</span>
      </div>
      <div class="jira-stat-card review ${C.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="jira-stat-val">${i.underReview||0}</span>
        <span class="jira-stat-lbl">Under Review</span>
      </div>
      <div class="jira-stat-card ready ${C.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
        <span class="jira-stat-val">${i.readyToLeave??(i.resolved||i.closed||0)}</span>
        <span class="jira-stat-lbl">Ready to Leave</span>
      </div>
      <div class="jira-stat-card critical" data-stat-filter="critical">
        <span class="jira-stat-val">${i.critical||0}</span>
        <span class="jira-stat-lbl">Critical 🔴</span>
      </div>
      <div class="jira-stat-card overdue" data-stat-filter="overdue">
        <span class="jira-stat-val">${i.overdue||0}</span>
        <span class="jira-stat-lbl">Overdue ⚠️</span>
      </div>
    `,a.querySelectorAll(".jira-stat-card").forEach(d=>{d.onclick=async()=>{const g=d.dataset.statFilter;g==="all"?(C.status="all",C.priority="all"):g==="critical"?(C.priority="Critical",C.status="all"):(C.status=g,C.priority="all"),await he()}}))}function nt(){const a=n.querySelector("#jira-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${w.map(d=>`
          <option value="${d._id}" ${C.assigneeId===d._id.toString()?"selected":""}>
            ${$(d.name)} (${$(d.role)})
          </option>
        `).join("")}
      `)}function Ce(){const a=n.querySelector("#jira-board-columns-root");if(!a)return;const d={};da.forEach(g=>{d[g.key]=[]}),m.forEach(g=>{let f=g.status||"To Do";f==="In Progress"?f="Content":f==="Resolved"?f="Under Review":f==="Closed"&&(f="Ready to Leave"),d[f]||(d[f]=[]),d[f].push(g)}),a.innerHTML=da.map(g=>{const f=d[g.key]||[];return`
        <div class="jira-board-column" data-status="${g.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${$(g.label)}</span>
              <span class="jira-col-badge">${f.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${g.key}">
            ${f.length===0?`
              <div style="padding:28px 10px;text-align:center;color:#475569;font-size:12px;font-style:italic;">
                No tickets
              </div>
            `:f.map(M=>st(M)).join("")}
          </div>
        </div>
      `}).join(""),Ge(),ht()}function st(a){var q;const d=yt.find(B=>B.key===a.category)||yt[0],g=Tt.find(B=>B.key===a.priority)||Tt[2],f=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",M=(a.subtasks||[]).filter(B=>B.completed).length,O=(a.subtasks||[]).length,R=((q=a.assignee)==null?void 0:q.name)||"Unassigned",K=(R==="Unassigned"?"?":R.slice(0,1)).toUpperCase();return`
      <div class="jira-card" draggable="true" data-ticket-id="${a._id}">
        <div class="jira-card-top">
          <span class="jira-category-pill ${d.slug}">
            ${d.icon} ${d.label}
          </span>
          ${a.dueDate?`
            <span class="jira-due-pill ${f?"overdue":""}" title="Due Date">
              ${f?"⚠️ ":"📅 "}
              ${new Date(a.dueDate).toISOString().slice(0,10)}
            </span>
          `:""}
        </div>

        <div class="jira-card-title" title="${$(a.title)}">
          ${$(a.title)}
        </div>

        <div class="jira-card-bottom">
          <div class="jira-card-id-row">
            <span class="jira-pri-icon" title="Priority: ${g.label}">${g.icon}</span>
            <span class="jira-ticket-id">${$(a.ticketId)}</span>
          </div>

          <div class="jira-card-assignee-row">
            ${O>0?`
              <span class="jira-subtask-badge" title="${M} of ${O} subtasks completed">
                ☑ ${M}/${O}
              </span>
            `:""}
            <div class="jira-avatar ${R==="Unassigned"?"unassigned":""}" title="Assignee: ${$(R)}">
              ${K}
            </div>
          </div>
        </div>
      </div>
    `}function Ge(){const a=n.querySelectorAll(".jira-card"),d=n.querySelectorAll(".jira-board-column");a.forEach(g=>{g.ondragstart=f=>{f.dataTransfer.setData("text/plain",g.dataset.ticketId),g.classList.add("dragging")},g.ondragend=()=>{g.classList.remove("dragging")}}),d.forEach(g=>{g.ondragover=f=>{f.preventDefault(),g.classList.add("drag-over")},g.ondragleave=()=>{g.classList.remove("drag-over")},g.ondrop=async f=>{f.preventDefault(),g.classList.remove("drag-over");const M=f.dataTransfer.getData("text/plain"),O=g.dataset.status;if(!M||!O)return;const R=m.find(q=>q._id.toString()===M);if(!R||R.status===O)return;const K=R.status;R.status=O,Ce();try{const q=await Ze(`/tickets/${M}/status`,{status:O});S(`Moved ${q.ticketId} to ${O}`,!1),await me(),Je()}catch(q){S(q.message||"Status update failed",!0),R.status=K,Ce()}}})}function ht(){n.querySelectorAll(".jira-card").forEach(a=>{a.onclick=d=>{if(d.target.tagName==="A")return;const g=a.dataset.ticketId;We(g)}})}function Ae(){const a=n.querySelector("#btn-jira-refresh");a&&(a.onclick=async()=>{a.classList.add("pulse"),await he(),S("Board updated",!1),a.classList.remove("pulse")});const d=n.querySelector("#btn-jira-create-ticket");d&&(d.onclick=()=>{p()});const g=n.querySelector("#jira-search-input");let f=null;g&&(g.oninput=B=>{clearTimeout(f),f=setTimeout(async()=>{C.search=B.target.value.trim(),Re(),await he()},300)});const M=n.querySelector("#jira-filter-priority");M&&(M.onchange=async B=>{C.priority=B.target.value,Re(),await he()});const O=n.querySelector("#jira-filter-category");O&&(O.onchange=async B=>{C.category=B.target.value,Re(),await he()});const R=n.querySelector("#jira-filter-assignee");R&&(R.onchange=async B=>{C.assigneeId=B.target.value,Re(),await he()});const K=n.querySelector("#jira-pill-my-issues");K&&(K.onclick=async()=>{C.myIssuesOnly=!C.myIssuesOnly,K.classList.toggle("active",C.myIssuesOnly),Re(),await he()});const q=n.querySelector("#jira-clear-filters");q&&(q.onclick=async()=>{C={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",myIssuesOnly:!1},g&&(g.value=""),M&&(M.value="all"),O&&(O.value="all"),R&&(R.value="all"),K&&K.classList.remove("active"),Re(),await he()})}function Re(){const a=n.querySelector("#jira-clear-filters");if(!a)return;const d=C.search||C.priority!=="all"||C.category!=="all"||C.assigneeId!=="all"||C.myIssuesOnly;a.style.display=d?"inline":"none"}async function he(){await V(),Ce()}async function We(a){const d=n.querySelector("#jira-modals-root");if(d){d.innerHTML=`
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{j=await qe(`/tickets/${a}`)}catch(g){S(g.message||"Could not load ticket",!0),d.innerHTML="";return}ye()}}function ye(){var ue,oe,pe;const a=n.querySelector("#jira-modals-root");if(!a||!j)return;const d=j,g=yt.find(r=>r.key===d.category)||yt[0];Tt.find(r=>r.key===d.priority)||Tt[2];const f=d.subtasks||[],M=f.filter(r=>r.completed).length,O=f.length>0?Math.round(M/f.length*100):0,R=d.attachments||[],K=d.comments||[],q=(d.history||[]).slice().reverse(),B=d.workLogs||[],H=d.linkedTickets||[],k=(s==null?void 0:s._id)||(s==null?void 0:s.id),le=d.reporter&&d.reporter.userId&&d.reporter.userId.toString()===(k==null?void 0:k.toString()),de=e==="superadmin"||e==="admin";a.innerHTML=`
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${g.slug}">${g.icon} ${g.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${$(d.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${$(d.title)}" title="Click to edit title" />
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
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${$(d.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${d.description?$(d.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Attachments Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Attachments (${R.length})</span>
                  <label class="btn-jira-secondary" style="font-size:11px;padding:4px 8px;cursor:pointer;">
                    📎 Upload File
                    <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                  </label>
                </div>

                ${R.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload screenshots, logs, or briefs.</div>
                `:`
                  <div class="jira-attachments-grid">
                    ${R.map(r=>`
                      <div class="jira-att-card">
                        <div class="jira-att-left">
                          <span>📎</span>
                          <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${$(r.name)}">
                            ${$(r.name)}
                          </a>
                        </div>
                        <button type="button" class="jira-att-del btn-del-att" data-att-id="${r.id}" title="Delete file">&times;</button>
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>

              <!-- Subtasks Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Subtasks (${M}/${f.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${O}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${O}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${f.map(r=>`
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${r.id}" ${r.completed?"checked":""} />
                        <span class="jira-subtask-title ${r.completed?"done":""}">${$(r.title)}</span>
                      </div>
                      <button type="button" class="jira-att-del btn-del-subtask" data-subtask-id="${r.id}" title="Remove subtask">&times;</button>
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
                  <span>Linked Work Items (${H.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${H.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${H.map(r=>`
                      <div class="jira-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${$(r.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${$(r.ticketId)}</span>
                          <span style="font-size:12.5px;color:#f1f5f9;">${$(r.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${$(r.status||"Open")}</span>
                          <button type="button" class="jira-att-del btn-del-link" data-link-id="${r.id}" title="Remove link">&times;</button>
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
                    Comments (${K.length})
                  </button>
                  <button type="button" class="jira-act-tab ${E==="history"?"active":""}" data-act-tab="history">
                    History (${q.length})
                  </button>
                  <button type="button" class="jira-act-tab ${E==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${B.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${E==="comments"?`
                  <div class="jira-comments-feed">
                    ${K.map(r=>`
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(r.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${$(r.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${$(r.userRole)})</span></span>
                            <span class="jira-comment-time">${ea(r.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${$(r.content)}</div>
                        </div>
                      </div>
                    `).join("")}

                    <!-- Add Comment Composer -->
                    <div class="jira-comment-composer">
                      <div class="jira-avatar" style="background:#3b82f6;">
                        ${((s==null?void 0:s.name)||"U").slice(0,1).toUpperCase()}
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
                    ${q.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:q.map(r=>`
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(r.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${$(r.userName)}</span>
                            <span class="jira-comment-time">${ea(r.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong style="color:#cbd5e1;">${$(r.field)}</strong>:
                            ${r.from?`<span style="text-decoration:line-through;color:#ef4444;">${$(r.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${$(r.to)}</span>
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
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${d.loggedHours||0} hrs</strong></span>
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

                    ${B.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:B.map(r=>`
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(r.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${$(r.userName)} logged <strong style="color:#38bdf8;">${$(r.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${ea(r.loggedAt)}</span>
                          </div>
                          ${r.description?`<div style="font-size:12px;color:#cbd5e1;">${$(r.description)}</div>`:""}
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
                  ${da.map(r=>{let b=d.status||"To Do";return b==="In Progress"?b="Content":b==="Resolved"?b="Under Review":b==="Closed"&&(b="Ready to Leave"),`
                      <option value="${r.key}" ${b===r.key?"selected":""}>
                        ${r.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${Tt.map(r=>`
                    <option value="${r.key}" ${d.priority===r.key?"selected":""}>
                      ${r.icon} ${r.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignee -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Assignee</span>
                <select id="sel-detail-assignee" class="jira-select-field">
                  <option value="">Unassigned</option>
                  ${w.map(r=>`
                    <option value="${r._id}" ${d.assignee&&d.assignee.userId&&d.assignee.userId.toString()===r._id.toString()?"selected":""}>
                      ${$(r.name)} (${$(r.role)})
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Reporter (Read Only) -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Reporter</span>
                <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                  <div class="jira-avatar" style="background:#2563eb;">
                    ${(((ue=d.reporter)==null?void 0:ue.name)||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${$(((oe=d.reporter)==null?void 0:oe.name)||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${$(((pe=d.reporter)==null?void 0:pe.role)||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${yt.map(r=>`
                    <option value="${r.key}" ${d.category===r.key?"selected":""}>
                      ${r.icon} ${r.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="jira-date-field" value="${d.dueDate?new Date(d.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="jira-select-field">
                  <option value="">None (Workspace General)</option>
                  ${P.map(r=>`
                    <option value="${r._id}" ${d.jobId&&d.jobId.toString()===r._id.toString()?"selected":""}>
                      📁 ${$(r.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${d.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" value="${d.estimatedHours||0}" style="width:45px;background:#1e293b;border:1px solid #334155;color:#f8fafc;padding:2px 4px;border-radius:4px;font-size:12px;" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(d.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(d.updatedAt).toLocaleString()}</div>
                ${d.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(d.resolvedAt).toLocaleString()}</div>`:""}
              </div>

              <!-- Actions (Delete) -->
              ${de||le?`
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
    `,rt()}function rt(){const a=n.querySelector("#jira-modals-root");if(!a||!j)return;const d=a.querySelector("#btn-close-jira-modal");d&&(d.onclick=et);const g=a.querySelector("#jira-detail-backdrop");g&&(g.onclick=T=>{T.target===g&&et()});const f=a.querySelector("#inp-detail-title");f&&(f.onchange=async()=>{const T=f.value.trim();if(T)try{j=await Ze(`/tickets/${j._id}`,{title:T}),await he()}catch(D){S(D.message||"Failed to update title",!0)}});const M=a.querySelector("#btn-toggle-desc-edit");M&&(M.onclick=()=>{Q=!Q,ye()});const O=a.querySelector("#btn-cancel-desc");O&&(O.onclick=()=>{Q=!1,ye()});const R=a.querySelector("#btn-save-desc");R&&(R.onclick=async()=>{var D;const T=(D=a.querySelector("#inp-detail-desc"))==null?void 0:D.value;try{j=await Ze(`/tickets/${j._id}`,{description:T}),Q=!1,ye(),await he(),S("Description saved",!1)}catch(Y){S(Y.message||"Failed to save description",!0)}});const K=a.querySelector("#sel-detail-status");K&&(K.onchange=async T=>{try{const D=await Ze(`/tickets/${j._id}/status`,{status:T.target.value});j=D,ye(),await me(),Je(),await he(),S(`Status changed to ${D.status}`,!1)}catch(D){S(D.message||"Status change failed",!0)}});const q=a.querySelector("#sel-detail-priority");q&&(q.onchange=async T=>{try{j=await Ze(`/tickets/${j._id}`,{priority:T.target.value}),ye(),await he()}catch(D){S(D.message,!0)}});const B=a.querySelector("#sel-detail-assignee");B&&(B.onchange=async T=>{var D;try{const Y=await Ze(`/tickets/${j._id}`,{assigneeId:T.target.value||null});j=Y,ye(),await he(),S(`Assigned to ${((D=Y.assignee)==null?void 0:D.name)||"Unassigned"}`,!1)}catch(Y){S(Y.message,!0)}});const H=a.querySelector("#sel-detail-category");H&&(H.onchange=async T=>{try{j=await Ze(`/tickets/${j._id}`,{category:T.target.value}),ye(),await he()}catch(D){S(D.message,!0)}});const k=a.querySelector("#inp-detail-duedate");k&&(k.onchange=async T=>{try{j=await Ze(`/tickets/${j._id}`,{dueDate:T.target.value||null}),ye(),await he()}catch(D){S(D.message,!0)}});const le=a.querySelector("#sel-detail-job");le&&(le.onchange=async T=>{try{j=await Ze(`/tickets/${j._id}`,{jobId:T.target.value||null}),ye(),await he()}catch(D){S(D.message,!0)}});const de=a.querySelector("#inp-detail-esthours");de&&(de.onchange=async T=>{try{j=await Ze(`/tickets/${j._id}`,{estimatedHours:Number(T.target.value)||0})}catch(D){S(D.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(T=>{T.onchange=async()=>{const D=T.dataset.subtaskId;try{j=await Ze(`/tickets/${j._id}/subtasks/${D}`,{completed:T.checked}),ye(),await he()}catch(Y){S(Y.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(T=>{T.onclick=async()=>{const D=T.dataset.subtaskId;try{j=await Qe(`/tickets/${j._id}/subtasks/${D}`),ye(),await he()}catch(Y){S(Y.message,!0)}}});const ue=a.querySelector("#inp-new-subtask"),oe=a.querySelector("#btn-add-subtask"),pe=async()=>{const T=ue==null?void 0:ue.value.trim();if(T)try{j=await ke(`/tickets/${j._id}/subtasks`,{title:T}),ye(),await he()}catch(D){S(D.message,!0)}};oe&&(oe.onclick=pe),ue&&(ue.onkeydown=T=>{T.key==="Enter"&&(T.preventDefault(),pe())});const r=a.querySelector("#inp-detail-att-upload");r&&(r.onchange=async T=>{const D=Array.from(T.target.files);if(!D.length)return;S("Uploading attachment(s)...",!1);const Y=[];for(const be of D){const we=new FileReader;await new Promise(Ie=>{we.onload=async()=>{try{const ne=we.result.split(",")[1],ge=await ke("/upload",{files:[{name:be.name,data:ne,size:be.size,type:be.type}]});ge&&ge.files&&ge.files[0]&&Y.push({name:ge.files[0].name||be.name,url:ge.files[0].url,size:be.size,type:be.type})}catch(ne){console.warn("Upload error for file:",be.name,ne)}Ie()},we.readAsDataURL(be)})}if(Y.length)try{j=await ke(`/tickets/${j._id}/attachments`,{attachments:Y}),ye(),S("File(s) attached successfully",!1)}catch(be){S(be.message||"Failed to attach file(s)",!0)}}),a.querySelectorAll(".btn-del-att").forEach(T=>{T.onclick=async()=>{const D=T.dataset.attId;try{j=await Qe(`/tickets/${j._id}/attachments/${D}`),ye()}catch(Y){S(Y.message,!0)}}}),a.querySelectorAll(".jira-act-tab").forEach(T=>{T.onclick=()=>{E=T.dataset.actTab,ye()}});const b=a.querySelector("#inp-new-comment"),l=a.querySelector("#btn-submit-comment");l&&b&&(l.onclick=async()=>{const T=b.value.trim();if(T)try{l.disabled=!0,l.textContent="Saving...",j=await ke(`/tickets/${j._id}/comments`,{content:T}),ye(),S("Comment added",!1)}catch(D){S(D.message||"Failed to add comment",!0)}finally{l.disabled=!1}});const _=a.querySelector("#btn-open-link-dialog"),y=a.querySelector("#jira-link-box"),z=a.querySelector("#btn-cancel-link"),A=a.querySelector("#btn-submit-link"),U=a.querySelector("#inp-link-target"),G=a.querySelector("#sel-link-rel");_&&y&&(_.onclick=()=>{y.style.display="block"}),z&&y&&(z.onclick=()=>{y.style.display="none"}),A&&y&&(A.onclick=async()=>{const T=U==null?void 0:U.value.trim(),D=(G==null?void 0:G.value)||"relates to";if(T)try{A.disabled=!0,j=await ke(`/tickets/${j._id}/links`,{targetTicketId:T,relationship:D}),ye(),S(`Linked with ${T}`,!1)}catch(Y){S(Y.message||"Failed to link ticket",!0)}finally{A.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(T=>{T.onclick=async()=>{const D=T.dataset.linkId;try{j=await Qe(`/tickets/${j._id}/links/${D}`),ye()}catch(Y){S(Y.message,!0)}}});const W=a.querySelector("#btn-open-worklog-dialog"),L=a.querySelector("#jira-worklog-box"),se=a.querySelector("#btn-cancel-worklog"),ee=a.querySelector("#btn-submit-worklog"),ce=a.querySelector("#inp-worklog-time"),J=a.querySelector("#inp-worklog-desc");W&&L&&(W.onclick=()=>{L.style.display="block"}),se&&L&&(se.onclick=()=>{L.style.display="none"}),ee&&L&&(ee.onclick=async()=>{const T=ce==null?void 0:ce.value.trim(),D=J==null?void 0:J.value.trim();if(!T){S("Enter time spent (e.g. 2h 30m)",!0);return}try{ee.disabled=!0,j=await ke(`/tickets/${j._id}/worklogs`,{timeSpent:T,description:D}),ye(),S("Work logged",!1)}catch(Y){S(Y.message||"Failed to log work",!0)}finally{ee.disabled=!1}});const F=a.querySelector("#btn-delete-ticket");F&&(F.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${j.ticketId}?`))try{F.disabled=!0,await Qe(`/tickets/${j._id}`),S(`Ticket ${j.ticketId} deleted`,!1),et(),await me(),Je(),await he()}catch(T){S(T.message||"Failed to delete ticket",!0),F.disabled=!1}})}function et(){j=null,Q=!1;const a=n.querySelector("#jira-modals-root");a&&(a.innerHTML="")}function p(){const a=n.querySelector("#jira-modals-root");if(!a)return;a.innerHTML=`
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
                  ${yt.map(R=>`<option value="${R.key}">${R.icon} ${R.label}</option>`).join("")}
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
                  ${o?'<option value="">Unassigned</option>':""}
                  ${w.map(R=>{const K=s&&String(s._id||s.id)===String(R._id),q=!o&&K?"selected":"";return`
                      <option value="${R._id}" ${q}>
                        ${$(R.name)} (${$(R.role)})${K?" — (You)":""}
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
                ${P.map(R=>`
                  <option value="${R._id}">
                    📁 ${$(R.title||"Untitled Job")}
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
    `;const d=()=>{a.innerHTML=""},g=a.querySelector("#btn-close-create-modal");g&&(g.onclick=d);const f=a.querySelector("#btn-cancel-create-ticket");f&&(f.onclick=d);const M=a.querySelector("#jira-create-backdrop");M&&(M.onclick=R=>{R.target===M&&d()});const O=a.querySelector("#btn-submit-create-ticket");O&&(O.onclick=async()=>{var de,ue,oe,pe,r,b,l;const R=(de=a.querySelector("#create-ticket-title"))==null?void 0:de.value.trim(),K=(ue=a.querySelector("#create-ticket-desc"))==null?void 0:ue.value.trim(),q=((oe=a.querySelector("#create-ticket-cat"))==null?void 0:oe.value)||"Task",B=((pe=a.querySelector("#create-ticket-pri"))==null?void 0:pe.value)||"Medium",H=((r=a.querySelector("#create-ticket-assignee"))==null?void 0:r.value)||null,k=((b=a.querySelector("#create-ticket-duedate"))==null?void 0:b.value)||null,le=((l=a.querySelector("#create-ticket-job"))==null?void 0:l.value)||null;if(!R){S("Ticket summary / title is required",!0);return}try{O.disabled=!0,O.textContent="Creating...";const _=await ke("/tickets",{title:R,description:K,category:q,priority:B,assigneeId:H,dueDate:k,jobId:le});S(`Ticket ${_.ticketId} created! 🎫`,!1),d(),await me(),Je(),await he(),We(_._id)}catch(_){S(_.message||"Could not create ticket",!0),O.disabled=!1,O.textContent="Create Ticket 🚀"}})}}export{ei as a,Za as b,Xa as i};
