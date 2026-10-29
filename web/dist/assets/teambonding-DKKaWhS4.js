import{c as Q,h as $,e as v,n as ze,j as Me,o as me,k as $e,g as V}from"./api-DyayiLLk.js";const Te={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function Ae(){try{const b=localStorage.getItem("ci360_planner_settings");if(b)return Object.assign({},Te,JSON.parse(b))}catch{}return Object.assign({},Te)}function qe(b){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(b))}catch{}}function J(){const b=new Date,G=b.getFullYear(),T=String(b.getMonth()+1).padStart(2,"0"),_=String(b.getDate()).padStart(2,"0");return`${G}-${T}-${_}`}function fe(b,G){const T=new Date(b+"T00:00:00");T.setDate(T.getDate()+G);const _=T.getFullYear(),j=String(T.getMonth()+1).padStart(2,"0"),w=String(T.getDate()).padStart(2,"0");return`${_}-${j}-${w}`}function de(b){return b?new Date(b+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function X(b){return b?new Date(b+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function De(b){return b?new Date(b+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function Se(b,G=1){const T=new Date(b+"T00:00:00"),_=T.getDay(),j=(_<G?7:0)+_-G,w=new Date(T);w.setDate(T.getDate()-j);const A=[];for(let o=0;o<7;o++){const U=new Date(w);U.setDate(w.getDate()+o);const Z=U.getFullYear(),Y=String(U.getMonth()+1).padStart(2,"0"),ne=String(U.getDate()).padStart(2,"0");A.push(`${Z}-${Y}-${ne}`)}return A}function Le(){try{const b=window.AudioContext||window.webkitAudioContext;if(!b)return;const G=new b,T=G.currentTime,_=G.createOscillator(),j=G.createGain();_.type="sine",_.frequency.setValueAtTime(523.25,T),_.frequency.exponentialRampToValueAtTime(783.99,T+.15),j.gain.setValueAtTime(.2,T),j.gain.exponentialRampToValueAtTime(.001,T+.35),_.connect(j),j.connect(G.destination),_.start(T),_.stop(T+.35)}catch{}}function Ne(b,G={}){const{userRole:T="employee",currentUser:_=null,onNavigate:j=null}=G,w=T==="superadmin"||T==="admin";let A=Ae(),o={selectedDate:J(),viewMode:"daily",filterStatus:"all",searchQuery:"",selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ee(),U();async function U(){o.loading=!0,Z();try{const t=[Q("/tasks")];w&&t.push(Q("/personnel").catch(()=>[]));const[i,d]=await Promise.all(t);o.tasks=Array.isArray(i)?i:[],d&&(o.personnelList=Array.isArray(d)?d:[])}catch(t){$("Failed to load planner tasks: "+t.message,!0)}finally{o.loading=!1,L()}}function Z(){b.innerHTML=`
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
    `}function Y(t){return o.tasks.filter(i=>{var l;if(i.isDeleted===!0)return!1;if(w&&o.selectedPersonnelId!=="all"){const c=((l=i.personnelId)==null?void 0:l._id)||i.personnelId;if(String(c)!==String(o.selectedPersonnelId))return!1}const d=i.dateStr||(i.dueDate?new Date(i.dueDate).toISOString().slice(0,10):"");return d?d===t:t===J()})}function ne(t,i){if(t.status==="Completed")return!1;const d=t.dateStr||(t.dueDate?new Date(t.dueDate).toISOString().slice(0,10):"");return d?d<i:!1}function ie(t,i){const d=t.length,l=t.filter(P=>P.status==="Completed").length,c=t.filter(P=>P.status==="In Progress").length,u=t.filter(P=>P.status==="Pending"||P.status==="Todo").length,C=t.filter(P=>ne(P,i)).length,I=d>0?Math.round(l/d*100):0;return{total:d,completed:l,inProgress:c,pending:u,overdue:C,percent:I}}function L(){const t=J(),i=o.selectedDate===t,d=Y(o.selectedDate),l=ie(d,t);b.innerHTML=`
      <div class="ci360-planner-wrap ${A.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${X(o.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${v(A.displayName||"Daily Planner")}</h1>
              <p class="ci360-planner-subheading">Plan your day. Track your progress.</p>
            </div>
          </div>

          <div class="ci360-planner-header-actions">
            <!-- View Mode Switcher -->
            <div class="ci360-view-switcher" role="tablist">
              <button type="button" class="ci360-switch-btn ${o.viewMode==="daily"?"active":""}" id="btnViewDaily" title="Daily View">
                <span>📅 Daily</span>
              </button>
              <button type="button" class="ci360-switch-btn ${o.viewMode==="weekly"?"active":""}" id="btnViewWeekly" title="Weekly View">
                <span>🗓️ Weekly</span>
              </button>
              <button type="button" class="ci360-switch-btn ${o.viewMode==="report"?"active":""}" id="btnViewReport" title="Weekly Analytics & Report">
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
              <span class="date-text" id="displayDateLabel">${de(o.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${o.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${i?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${w?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${o.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${o.personnelList.map(c=>`
                  <option value="${c._id}" ${o.selectedPersonnelId===String(c._id)?"selected":""}>
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
              <div class="ci360-circular-progress" style="--val: ${l.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${l.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${l.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <span class="kpi-num">${l.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${l.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${l.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${l.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${l.overdue>0?`
                <div class="kpi-box overdue">
                  <span class="kpi-num">${l.overdue}</span>
                  <span class="kpi-label">Overdue</span>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${l.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${ve(d,l)}
        </main>

      </div>
    `,be(),he()}function ve(t,i){return o.viewMode==="weekly"?xe():o.viewMode==="report"?le():ge(t,i)}function ge(t,i){const d=J();let l=t;if(o.filterStatus==="pending"?l=l.filter(c=>c.status==="Pending"||c.status==="Todo"):o.filterStatus==="in_progress"?l=l.filter(c=>c.status==="In Progress"):o.filterStatus==="completed"?l=l.filter(c=>c.status==="Completed"):o.filterStatus==="overdue"&&(l=l.filter(c=>ne(c,d))),o.searchQuery){const c=o.searchQuery.toLowerCase();l=l.filter(u=>(u.title||"").toLowerCase().includes(c)||(u.description||"").toLowerCase().includes(c)||(u.category||"").toLowerCase().includes(c))}return l.sort((c,u)=>{if(c.status==="Completed"&&u.status!=="Completed")return 1;if(c.status!=="Completed"&&u.status==="Completed")return-1;const C={Urgent:0,High:1,Medium:2,Low:3};return(C[c.priority]||2)-(C[u.priority]||2)}),`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              Today's Focus
            </h2>
            <span class="ci360-task-count-badge">${l.length} ${l.length===1?"task":"tasks"}</span>
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${o.filterStatus==="all"?"active":""}" data-f="all">All (${i.total})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${i.pending})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${i.inProgress})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${i.completed})</button>
              ${i.overdue>0?`
                <button type="button" class="filter-pill overdue ${o.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${i.overdue})</button>
              `:""}
            </div>

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${v(o.searchQuery)}">
              ${o.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card -->
        <div class="ci360-quick-add-bar">
          <div class="ci360-quick-add-input-wrap">
            <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${X(o.selectedDate)}... (Press Enter to save)">
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
          ${l.length===0?K():`
            <div class="ci360-task-list">
              ${l.map(c=>oe(c,d)).join("")}
            </div>
          `}
        </div>

      </div>
    `}function K(){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${X(o.selectedDate)}</h3>
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
    `}function oe(t,i){var C,I,P,m;const d=t.status==="Completed",l=ne(t,i),c=`pri-${(t.priority||"medium").toLowerCase()}`,u=`status-${(t.status||"pending").toLowerCase().replace(/\s+/g,"-")}`;return`
      <div class="ci360-task-card ${d?"is-completed":""} ${l?"is-overdue":""}" data-id="${t._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${d?"checked":""}" data-action="toggle" data-id="${t._id}" title="${d?"Reopen task":"Mark as done"}">
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
            <span class="ci360-badge ${u}">
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
            ${l?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name -->
            ${w&&((C=t.personnelId)!=null&&C.name||(I=t.userId)!=null&&I.name)?`
              <span class="ci360-badge personnel-badge">
                👤 ${v(((P=t.personnelId)==null?void 0:P.name)||((m=t.userId)==null?void 0:m.name))}
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
    `}function xe(){const t=Se(o.selectedDate,A.weekStartsOn),i=X(t[0]),d=X(t[6]),l=J();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${i} – ${d}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${t.map(c=>{const u=c===l,C=c===o.selectedDate,I=Y(c),P=ie(I,l);return`
              <div class="ci360-day-column ${u?"is-today":""} ${C?"is-selected":""}" data-date="${c}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${c}">
                  <div class="day-name">${De(c)}</div>
                  <div class="day-number">${new Date(c+"T00:00:00").getDate()}</div>
                  ${u?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${P.completed}/${P.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${P.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${I.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:I.map(m=>`
                    <div class="ci360-mini-task-card ${m.status==="Completed"?"done":""}" data-id="${m._id}">
                      <button type="button" class="mini-check ${m.status==="Completed"?"checked":""}" data-action="toggle" data-id="${m._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${m._id}">
                        <div class="mini-title">${v(m.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(m.priority||"medium").toLowerCase()}">${m.priority||"Med"}</span>
                          ${m.dueTime?`<span class="mini-time">${v(m.dueTime)}</span>`:""}
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
    `}function le(){const t=Se(o.selectedDate,A.weekStartsOn),i=de(t[0]),d=de(t[6]),l=J(),c=o.tasks.filter(h=>{if(h.isDeleted===!0)return!1;const f=h.dateStr||(h.dueDate?new Date(h.dueDate).toISOString().slice(0,10):"");return t.includes(f)}),u=c.length,C=c.filter(h=>h.status==="Completed").length,I=c.filter(h=>h.status==="In Progress").length,P=u>0?Math.round(C/u*100):0,m={Urgent:0,High:0,Medium:0,Low:0};return c.forEach(h=>{const f=h.priority||"Medium";m[f]!==void 0&&m[f]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${i} – ${d}</div>
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
            <span class="value" style="font-size:28px">${u}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${C}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${I}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${P}%</span>
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
                ${t.map(h=>{const f=Y(h),r=ie(f,l);return`
                    <tr>
                      <td><strong>${De(h)}</strong></td>
                      <td>${X(h)}</td>
                      <td>${r.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${r.completed}</td>
                      <td>${r.pending+r.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${r.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${r.percent}%</span>
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
              <div style="font-size:22px;font-weight:700">${m.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${m.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${m.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${m.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function be(){const t=document.getElementById("btnViewDaily"),i=document.getElementById("btnViewWeekly"),d=document.getElementById("btnViewReport");t&&(t.onclick=()=>{o.viewMode="daily",L()}),i&&(i.onclick=()=>{o.viewMode="weekly",L()}),d&&(d.onclick=()=>{o.viewMode="report",L()});const l=document.getElementById("btnPrevDay"),c=document.getElementById("btnNextDay"),u=document.getElementById("btnJumpToday"),C=document.getElementById("hiddenDateInput"),I=document.getElementById("datePickerBadge");l&&(l.onclick=()=>{o.selectedDate=fe(o.selectedDate,-1),L()}),c&&(c.onclick=()=>{o.selectedDate=fe(o.selectedDate,1),L()}),u&&(u.onclick=()=>{o.selectedDate=J(),L()}),I&&C&&(I.onclick=()=>{try{typeof C.showPicker=="function"?C.showPicker():C.focus()}catch{C.focus()}},C.onchange=B=>{B.target.value&&(o.selectedDate=B.target.value,L())});const P=document.getElementById("admTeamSelect");P&&(P.onchange=B=>{o.selectedPersonnelId=B.target.value,L()});const m=document.getElementById("btnOpenAddTaskModal");m&&(m.onclick=()=>re());const h=document.getElementById("btnPlannerActionsMenu"),f=document.getElementById("plannerActionsDropdown");h&&f&&(h.onclick=B=>{B.stopPropagation(),f.classList.toggle("hidden")},document.addEventListener("click",B=>{!f.contains(B.target)&&B.target!==h&&f.classList.add("hidden")}));const r=document.getElementById("btnActionImport");r&&(r.onclick=()=>{f==null||f.classList.add("hidden"),ce()});const q=document.getElementById("btnActionExportPng");q&&(q.onclick=()=>{f==null||f.classList.add("hidden"),we()});const E=document.getElementById("btnActionExportPdf");E&&(E.onclick=()=>{f==null||f.classList.add("hidden"),ue()});const H=document.getElementById("btnActionBackup");H&&(H.onclick=()=>{f==null||f.classList.add("hidden"),ke()});const M=document.getElementById("btnActionSettings");M&&(M.onclick=()=>{f==null||f.classList.add("hidden"),pe()})}function he(t){if(o.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(m=>{m.onclick=()=>{o.filterStatus=m.dataset.f,L()}});const i=document.getElementById("plannerTaskSearchInp");i&&(i.oninput=m=>{o.searchQuery=m.target.value,L()});const d=document.getElementById("btnClearSearch");d&&(d.onclick=()=>{o.searchQuery="",L()});const l=document.getElementById("quickAddTitleInp"),c=document.getElementById("quickAddPriority"),u=document.getElementById("quickAddCategory"),C=document.getElementById("btnQuickAddSubmit"),I=async()=>{const m=((l==null?void 0:l.value)||"").trim();if(!m){$("Please enter a task title",!0),l==null||l.focus();return}try{const h={title:m,dateStr:o.selectedDate,priority:(c==null?void 0:c.value)||A.defaultPriority,category:(u==null?void 0:u.value)||"General",status:"Pending"};w&&o.selectedPersonnelId!=="all"&&(h.personnelId=o.selectedPersonnelId);const f=await V("/tasks",h);o.tasks.unshift(f),$("Task added to today's focus! ✨"),l&&(l.value="",l.focus()),L()}catch(h){$(h.message,!0)}};C&&(C.onclick=I),l&&(l.onkeydown=m=>{m.key==="Enter"&&I()});const P=document.getElementById("btnEmptyStateImport");P&&(P.onclick=()=>ce())}if(o.viewMode==="weekly"){const i=document.getElementById("btnPrevWeek"),d=document.getElementById("btnNextWeek"),l=document.getElementById("btnThisWeek");i&&(i.onclick=()=>{o.selectedDate=fe(o.selectedDate,-7),L()}),d&&(d.onclick=()=>{o.selectedDate=fe(o.selectedDate,7),L()}),l&&(l.onclick=()=>{o.selectedDate=J(),L()}),document.querySelectorAll(".day-col-header").forEach(c=>{c.onclick=()=>{o.selectedDate=c.dataset.date,o.viewMode="daily",L()}}),document.querySelectorAll('[data-action="add-day"]').forEach(c=>{c.onclick=()=>{re(null,c.dataset.date)}})}if(o.viewMode==="report"){const i=document.getElementById("btnDownloadWeeklyPdf");i&&(i.onclick=ue)}b.querySelectorAll('[data-action="toggle"]').forEach(i=>{i.onclick=async d=>{d.stopPropagation();const l=i.dataset.id;await ye(l)}}),b.querySelectorAll('[data-action="edit"]').forEach(i=>{i.onclick=d=>{d.stopPropagation();const l=i.dataset.id,c=o.tasks.find(u=>u._id===l);c&&re(c)}}),b.querySelectorAll('[data-action="delete"]').forEach(i=>{i.onclick=async d=>{d.stopPropagation();const l=i.dataset.id;await ee(l)}})}async function ye(t){const i=o.tasks.find(l=>l._id===t);if(!i)return;const d=i.status!=="Completed";try{const l=await ze(`/tasks/${t}/toggle`,{}),c=o.tasks.findIndex(u=>u._id===t);c!==-1&&(o.tasks[c]=l),d?(A.soundEnabled&&Le(),$("Task marked as completed! 🎉")):$("Task reopened as pending."),L()}catch(l){$(l.message,!0)}}async function ee(t){const i=o.tasks.find(d=>d._id===t);if(i&&confirm(`Are you sure you want to remove "${i.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Me(`/tasks/${t}`),o.tasks=o.tasks.filter(d=>d._id!==t),$("Task removed from planner (safely stored in database archive)"),L()}catch(d){$(d.message,!0)}}function re(t=null,i=null){const d=!!t,l=t?t.dateStr||(t.dueDate?new Date(t.dueDate).toISOString().slice(0,10):o.selectedDate):i||o.selectedDate,c=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${d?"Edit Task":"Add New Task"}</h3>
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
              <input type="date" id="taskDate" class="input" value="${l}" required>
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
                <option value="Medium" ${!t&&A.defaultPriority==="Medium"||(t==null?void 0:t.priority)==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!t&&A.defaultPriority==="High"||(t==null?void 0:t.priority)==="High"?"selected":""}>High</option>
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
          ${w?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!t||t!=null&&t.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${o.personnelList.map(h=>{var r;const f=((r=t==null?void 0:t.personnelId)==null?void 0:r._id)===h._id||(t==null?void 0:t.personnelId)===h._id;return`<option value="${h._id}" ${f?"selected":""}>${v(h.name)} (${v(h.department||h.role||"Member")})</option>`}).join("")}
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
    `,u=me(c),C=u.querySelector("#taskForm"),I=u.querySelector("#btnModalClose"),P=u.querySelector("#btnCancelModal"),m=()=>u.remove();I&&(I.onclick=m),P&&(P.onclick=m),C.onsubmit=async h=>{var s;h.preventDefault();const f=u.querySelector("#taskTitle").value.trim(),r=u.querySelector("#taskDesc").value.trim(),q=u.querySelector("#taskDate").value,E=u.querySelector("#taskStartTime").value.trim(),H=u.querySelector("#taskDueTime").value.trim(),M=u.querySelector("#taskPriority").value,B=u.querySelector("#taskStatus").value,F=u.querySelector("#taskCategory").value.trim()||"General";if(!f){$("Task title is required",!0);return}const e={title:f,description:r,dateStr:q,startTime:E,dueTime:H,priority:M,status:B,category:F};if(w){const n=(s=u.querySelector("#taskAssignee"))==null?void 0:s.value;n==="all"?(e.assignAll=!0,e.personnelId="all"):n&&(e.personnelId=n)}const a=u.querySelector("#btnSaveTask");a.disabled=!0,a.textContent="Saving...";try{if(d){const n=await $e(`/tasks/${t._id}`,e),p=o.tasks.findIndex(g=>g._id===t._id);p!==-1&&(o.tasks[p]=n),$("Task updated successfully! ✍️")}else{const n=await V("/tasks",e);Array.isArray(n.tasks)?n.tasks.forEach(p=>o.tasks.unshift(p)):o.tasks.unshift(n),$("Task created successfully! ✨")}m(),L()}catch(n){$(n.message,!0),a.disabled=!1,a.textContent=d?"Save Changes":"Create Task"}}}function ce(){let t=[];const i=`
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
              <input type="date" id="importTargetDate" class="input" value="${o.selectedDate}">
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
    `,d=me(i),l=()=>d.remove();d.querySelector("#btnImportClose").onclick=l,d.querySelector("#btnCancelImport").onclick=l;const c=d.querySelector("#importTextarea"),u=d.querySelector("#importFileInput"),C=d.querySelector("#importDropzone"),I=d.querySelector("#previewListArea"),P=d.querySelector("#previewCountLabel"),m=d.querySelector("#btnConfirmImport"),h=d.querySelector("#importFileInfo");function f(q){if(!q)return[];const E=q.split(/\r?\n/),H=[];for(let M of E)M=M.trim(),M&&(M=M.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),M=M.replace(/^[-*•]\s+/,""),M=M.replace(/^\d+[\.\)]\s+/,""),M=M.trim(),M&&H.push(M));return H}function r(){const q=c.value,E=f(q),H=d.querySelector("#importTargetDate").value,M=Y(H),B=new Set(M.map(F=>(F.title||"").trim().toLowerCase()));t=[];for(const F of E){const e=B.has(F.toLowerCase());t.push({title:F,isDuplicate:e})}if(P.textContent=`Preview (${t.length} ${t.length===1?"task":"tasks"} found)`,m.disabled=t.length===0,m.textContent=`Import ${t.length} ${t.length===1?"Task":"Tasks"}`,t.length===0){I.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}I.innerHTML=t.map((F,e)=>`
        <div class="preview-item ${F.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${e+1}.</span>
          <span class="preview-title">${v(F.title)}</span>
          ${F.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}c.oninput=r,C.onclick=()=>u.click(),u.onchange=q=>{const E=q.target.files[0];if(!E)return;h.textContent=`File selected: ${E.name} (${Math.round(E.size/1024)} KB)`;const H=new FileReader;H.onload=M=>{c.value=M.target.result,r()},H.readAsText(E)},C.ondragover=q=>{q.preventDefault(),C.classList.add("dragover")},C.ondragleave=()=>C.classList.remove("dragover"),C.ondrop=q=>{q.preventDefault(),C.classList.remove("dragover");const E=q.dataTransfer.files[0];if(E&&(E.type==="text/plain"||E.name.endsWith(".txt"))){h.textContent=`File dropped: ${E.name}`;const H=new FileReader;H.onload=M=>{c.value=M.target.result,r()},H.readAsText(E)}else $("Please drop a valid .txt plain-text file",!0)},m.onclick=async()=>{if(t.length===0)return;m.disabled=!0,m.textContent="Importing...";const q=d.querySelector("#importTargetDate").value,E=d.querySelector("#importPriority").value,H=d.querySelector("#importCategory").value.trim()||"General",M={date:q,tasks:t.map(B=>({title:B.title,priority:E,category:H,status:"Pending"}))};w&&o.selectedPersonnelId!=="all"&&(M.personnelId=o.selectedPersonnelId);try{const B=await V("/tasks/bulk-import",M);Array.isArray(B.tasks)&&B.tasks.forEach(F=>o.tasks.unshift(F)),$(`Imported ${B.importedCount} tasks successfully! (${B.skippedCount} skipped duplicates)`),l(),o.selectedDate=q,L()}catch(B){$(B.message,!0),m.disabled=!1,m.textContent="Retry Import"}}}async function we(){const t=Y(o.selectedDate),i=ie(t,J()),d=de(o.selectedDate),l=2,c=800,u=160,C=90,I=65,P=70,m=Math.max(120,t.length*I),h=u+C+m+P,f=document.createElement("canvas");f.width=c*l,f.height=h*l;const r=f.getContext("2d");r.scale(l,l);const q=document.documentElement.getAttribute("data-theme")==="dark",E=q?"#0F172A":"#F8FAFC",H=q?"#1E293B":"#FFFFFF",M=q?"#334155":"#E2E8F0",B=q?"#F8FAFC":"#0F172A",F=q?"#94A3B8":"#475569",e="#4F46E5",a="#10B981",s="#F59E0B";r.fillStyle=E,r.fillRect(0,0,c,h),r.fillStyle=H,te(r,24,20,c-48,u-30,16),r.fill(),r.strokeStyle=M,r.lineWidth=1,r.stroke(),r.fillStyle=e,r.font="bold 12px Inter, sans-serif",r.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),r.fillStyle=B,r.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',r.fillText(d,44,86),r.fillStyle=F,r.font="13px Inter, sans-serif",r.fillText(`Planned focus list · ${i.completed} of ${i.total} tasks completed (${i.percent}%)`,44,114);const n=u+6;r.fillStyle=H,te(r,24,n,c-48,C-16,12),r.fill(),r.stroke();const p=[{label:"TOTAL TASKS",val:String(i.total),color:B},{label:"COMPLETED",val:String(i.completed),color:a},{label:"IN PROGRESS",val:String(i.inProgress),color:s},{label:"PENDING",val:String(i.pending),color:F},{label:"PROGRESS",val:`${i.percent}%`,color:e}],g=(c-48)/p.length;p.forEach((S,k)=>{const D=24+k*g+20;r.fillStyle=S.color,r.font="bold 20px Inter, sans-serif",r.fillText(S.val,D,n+36),r.fillStyle=F,r.font="10px Inter, sans-serif",r.fillText(S.label,D,n+54)});const y=n+C;r.fillStyle=H,te(r,24,y,c-48,m+10,16),r.fill(),r.stroke(),t.length===0?(r.fillStyle=F,r.font="14px Inter, sans-serif",r.textAlign="center",r.fillText("No scheduled tasks recorded for this date.",c/2,y+60),r.textAlign="left"):t.forEach((S,k)=>{const D=y+16+k*I,z=S.status==="Completed";r.beginPath(),r.arc(48,D+14,10,0,Math.PI*2),z?(r.fillStyle=a,r.fill(),r.strokeStyle="#FFFFFF",r.lineWidth=2,r.beginPath(),r.moveTo(44,D+14),r.lineTo(47,D+17),r.lineTo(52,D+11),r.stroke()):(r.strokeStyle=M,r.lineWidth=2,r.stroke()),r.fillStyle=z?F:B,r.font=`${z?"normal":"500"} 14px Inter, sans-serif`;const R=S.title.length>55?S.title.slice(0,52)+"...":S.title;if(r.fillText(R,70,D+18),z){const se=r.measureText(R);r.strokeStyle=F,r.lineWidth=1.2,r.beginPath(),r.moveTo(70,D+14),r.lineTo(70+se.width,D+14),r.stroke()}const O=S.priority||"Medium";let N="#E2E8F0",W="#334155";O==="Urgent"?(N="#FEE2E2",W="#DC2626"):O==="High"?(N="#FEF3C7",W="#D97706"):O==="Low"&&(N="#ECFDF5",W="#059669"),r.fillStyle=N,te(r,c-150,D+4,60,20,10),r.fill(),r.fillStyle=W,r.font="bold 10px Inter, sans-serif",r.fillText(O,c-138,D+18);const ae=S.dueTime?`🕒 ${S.dueTime}`:S.category||"General";r.fillStyle=F,r.font="11px Inter, sans-serif",r.fillText(ae,70,D+34),k<t.length-1&&(r.strokeStyle=M,r.lineWidth=.6,r.beginPath(),r.moveTo(40,D+48),r.lineTo(c-40,D+48),r.stroke())});const x=h-35;r.fillStyle=F,r.font="11px Inter, sans-serif",r.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,x);try{const S=f.toDataURL("image/png"),k=document.createElement("a");k.href=S,k.download=`ci360-daily-planner-${o.selectedDate}.png`,document.body.appendChild(k),k.click(),k.remove(),$("Daily Planner image exported! 🖼️")}catch(S){$("Failed to export image: "+S.message,!0)}}function te(t,i,d,l,c,u){t.beginPath(),t.moveTo(i+u,d),t.lineTo(i+l-u,d),t.quadraticCurveTo(i+l,d,i+l,d+u),t.lineTo(i+l,d+c-u),t.quadraticCurveTo(i+l,d+c,i+l-u,d+c),t.lineTo(i+u,d+c),t.quadraticCurveTo(i,d+c,i,d+c-u),t.lineTo(i,d+u),t.quadraticCurveTo(i,d,i+u,d),t.closePath()}function ue(){const t=Se(o.selectedDate,A.weekStartsOn),i=de(t[0]),d=de(t[6]);J();const l=o.tasks.filter(m=>{if(m.isDeleted===!0)return!1;const h=m.dateStr||(m.dueDate?new Date(m.dueDate).toISOString().slice(0,10):"");return t.includes(h)}),c=l.length,u=l.filter(m=>m.status==="Completed").length,C=c>0?Math.round(u/c*100):0,I=window.open("","_blank");if(!I){$("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const P=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${i}</title>
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
            <div class="period">${i} – ${d}</div>
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
            <div class="kpi-num" style="color:#10b981">${u}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${c-u}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${C}%</div>
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
            ${t.map(m=>{const h=Y(m);return h.length===0?`<tr><td><strong>${X(m)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:h.map(f=>`
                <tr>
                  <td><strong>${X(m)}</strong></td>
                  <td>${v(f.title)}</td>
                  <td><span class="badge badge-${(f.priority||"medium").toLowerCase().slice(0,3)}">${f.priority||"Medium"}</span></td>
                  <td>${v(f.category||"General")}</td>
                  <td>${f.dueTime||f.startTime||"—"}</td>
                  <td class="${f.status==="Completed"?"done":""}">${f.status||"Pending"}</td>
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
    `;I.document.write(P),I.document.close(),$("Weekly PDF report generated for printing! 📄")}function ke(){const i=me(`
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
    `),d=()=>i.remove();i.querySelector("#btnBackupClose").onclick=d;const l=i.querySelector("#btnDownloadBackupJson");l.onclick=async()=>{l.disabled=!0,l.textContent="Generating backup...";try{const m=await Q("/tasks/backup"),h=new Blob([JSON.stringify(m,null,2)],{type:"application/json"}),f=URL.createObjectURL(h),r=document.createElement("a");r.href=f,r.download=`ci360-planner-backup-${J()}.json`,document.body.appendChild(r),r.click(),r.remove(),$("Planner backup downloaded successfully! 💾")}catch(m){$("Backup export failed: "+m.message,!0)}finally{l.disabled=!1,l.textContent="Download JSON Backup"}};const c=i.querySelector("#restoreFileInput"),u=i.querySelector("#restorePreviewArea"),C=i.querySelector("#restoreCountText"),I=i.querySelector("#btnExecuteRestore");let P=null;c.onchange=m=>{const h=m.target.files[0];if(!h)return;const f=new FileReader;f.onload=r=>{try{const q=JSON.parse(r.target.result),E=Array.isArray(q.tasks)?q.tasks:Array.isArray(q)?q:null;if(!E||E.length===0){$("Invalid backup file: No tasks found",!0);return}P=E,u.style.display="block",C.textContent=`Valid backup: ${E.length} tasks ready to restore.`,I.disabled=!1}catch(q){$("Error parsing JSON backup file: "+q.message,!0),u.style.display="none",I.disabled=!0}},f.readAsText(h)},I.onclick=async()=>{var h;if(!P||P.length===0)return;I.disabled=!0,I.textContent="Restoring...";const m=((h=i.querySelector('input[name="restoreMode"]:checked'))==null?void 0:h.value)||"merge";try{const f=await V("/tasks/restore",{tasks:P,mode:m});$(`Restored ${f.restoredCount} tasks! (${f.skippedCount} skipped) ✨`),d(),await U()}catch(f){$("Restore failed: "+f.message,!0),I.disabled=!1,I.textContent="Retry Restore"}}}function pe(){const t=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${v(A.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${A.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${A.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${v(A.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${A.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${A.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${A.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${A.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${A.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${A.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${A.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,i=me(t),d=()=>i.remove();i.querySelector("#btnSettingsClose").onclick=d,i.querySelector("#btnCancelSettings").onclick=d,i.querySelector("#settingsForm").onsubmit=l=>{l.preventDefault(),A.displayName=i.querySelector("#setDisplayName").value.trim()||"Daily Planner",A.weekStartsOn=Number(i.querySelector("#setWeekStart").value),A.defaultPriority=i.querySelector("#setDefaultPriority").value,A.density=i.querySelector("#setDensity").value,A.soundEnabled=i.querySelector("#setSound").checked,qe(A),$("Planner preferences saved! ⚙️"),d(),L()}}}function Ee(){if(document.getElementById("ci360-planner-styles"))return;const b=document.createElement("style");b.id="ci360-planner-styles",b.textContent=`
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
  `,document.head.appendChild(b)}const Be=[{q:"Which planet in our solar system is known for its prominent rings?",options:["Mars","Jupiter","Saturn","Neptune"],correct:2},{q:"In computer science, what does 'API' stand for?",options:["Application Programming Interface","Automated Program Integration","Advanced Process Interaction","Applied Protocol Identifier"],correct:0},{q:"Who is known as the inventor of the World Wide Web?",options:["Bill Gates","Tim Berners-Lee","Steve Jobs","Alan Turing"],correct:1},{q:"Which element has the chemical symbol 'Au'?",options:["Silver","Gold","Copper","Platinum"],correct:1},{q:"What is the capital city of Australia?",options:["Sydney","Melbourne","Canberra","Brisbane"],correct:2},{q:"How many bits are in a single byte?",options:["4","8","16","32"],correct:1},{q:"Which company originally created the JavaScript programming language in 1995?",options:["Microsoft","Netscape","Sun Microsystems","Oracle"],correct:1},{q:"What is the speed of light in vacuum approximately?",options:["300,000 km/s","150,000 km/s","450,000 km/s","100,000 km/s"],correct:0},{q:"Which mammal is known to have the most powerful bite force relative to size?",options:["Lion","Hippopotamus","Hyena","Grizzly Bear"],correct:1},{q:"In typography and design, what does 'UI' stand for?",options:["User Interface","Universal Input","Unified Identifier","User Interaction"],correct:0}],Ce=["FOCUS","SMART","BRAIN","POWER","LOGIC","SWIFT","CLOUD","REACT","BUILD","DREAM","PIVOT","LEADER"],Pe=["Creativity is intelligence having fun. Great teams build great products through seamless collaboration and trust.","Simplicity is prerequisite for reliability. Stay curious, keep learning, and celebrate every team milestone.","Coming together is a beginning, staying together is progress, and working together is success."];async function je(b,G={}){const T=G.currentUser||{};let _="chat",j=[],w=null,A=[],o=[],U=null,Z=!1;b.innerHTML=`
    <div class="bonding-wrap" id="bonding-app-root">
      <div class="bonding-nav-bar">
        <div class="bonding-nav-left">
          <div class="bonding-logo-badge">🎮</div>
          <div>
            <h2 class="bonding-title">Team Bonding & Arcade</h2>
            <p class="bonding-subtitle">Direct Chat · Team Lounges · Friendly Game Challenges & Leaderboard</p>
          </div>
        </div>
        <div class="bonding-nav-tabs">
          <button class="bonding-nav-tab active" data-tab="chat">
            <span>💬</span> <span>Messages & Lounges</span>
          </button>
          <button class="bonding-nav-tab" data-tab="arcade">
            <span>🕹️</span> <span>Games Arcade</span>
          </button>
          <button class="bonding-nav-tab" data-tab="leaderboard">
            <span>🏆</span> <span>Leaderboard</span>
          </button>
        </div>
      </div>

      <div class="bonding-content" id="bonding-tab-content">
        <div class="bonding-loading-skeleton">Loading Team Bonding...</div>
      </div>
    </div>

    <!-- Modals container -->
    <div id="bonding-modals-root"></div>
  `,Fe();const Y=b.querySelectorAll(".bonding-nav-tab");Y.forEach(e=>{e.addEventListener("click",()=>{Y.forEach(a=>a.classList.remove("active")),e.classList.add("active"),_=e.dataset.tab,ge()})}),await ie(),ge(),ve(),new MutationObserver((e,a)=>{document.body.contains(b)||(U&&clearInterval(U),a.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function ie(){try{const[e,a]=await Promise.all([Q("/bonding/channels").catch(()=>[]),Q("/bonding/colleagues").catch(()=>[])]);j=e,A=a,!w&&j.length>0&&(w=j.find(s=>s.name.includes("Lounge"))||j[0]),w&&await L(w._id)}catch(e){console.error("Failed to load bonding data",e)}}async function L(e,a=!1){if(e)try{o=await Q(`/bonding/channels/${e}/messages`),a?re():d()}catch(s){console.error("Failed to load messages",s)}}function ve(){U&&clearInterval(U),U=setInterval(async()=>{if(_==="chat"&&w){await L(w._id,!0);const e=await Q("/bonding/channels").catch(()=>[]);e&&e.length&&(j=e,ce())}},3500)}function ge(){const e=b.querySelector("#bonding-tab-content");e&&(_==="chat"?K(e):_==="arcade"?E(e):_==="leaderboard"&&H(e))}function K(e){e.innerHTML=`
      <div class="bonding-chat-layout">
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
            ${oe("group")}
          </div>

          <!-- Direct 1-on-1 Messages Section -->
          <div class="bonding-section-header" style="margin-top: 18px;">
            <span class="bonding-section-title">DIRECT MESSAGES</span>
            <button class="bonding-mini-btn" id="btn-new-direct-chat" title="New Direct Message">
              <span>+</span> New Chat
            </button>
          </div>
          <div class="bonding-channel-list" id="bonding-direct-list">
            ${oe("direct")}
          </div>
        </aside>

        <!-- Main Chat Area -->
        <main class="bonding-chat-main">
          ${xe()}
          <div class="bonding-messages-container" id="bonding-messages-feed">
            ${le()}
          </div>
          ${ye()}
        </main>
      </div>
    `,we(),ee()}function oe(e){const a=j.filter(s=>s.type===e);return a.length===0?e==="group"?'<div class="bonding-empty-channels">No groups yet. Click <b>+ New Group</b>!</div>':'<div class="bonding-empty-channels">No personal chats yet. Click <b>+ New Chat</b> to message any colleague!</div>':a.map(s=>{const n=w&&w._id===s._id,p=s.type==="direct"?"👤":s.avatar||"👥",g=v(s.displayName||s.name),y=s.lastMessage&&s.lastMessage.content?v(s.lastMessage.content):"No messages yet",x=s.lastMessage&&s.lastMessage.sentAt?F(s.lastMessage.sentAt):"";return`
        <div class="bonding-channel-item ${n?"active":""}" data-chan-id="${s._id}">
          <div class="bonding-channel-avatar">${p}</div>
          <div class="bonding-channel-info">
            <div class="bonding-channel-top">
              <span class="bonding-channel-name">${g}</span>
              <span class="bonding-channel-time">${x}</span>
            </div>
            <div class="bonding-channel-preview">${y}</div>
          </div>
        </div>
      `}).join("")}function xe(){if(!w)return`
        <div class="bonding-chat-header">
          <div class="bonding-chat-title-wrap">
            <h3 class="bonding-chat-title">Select a conversation</h3>
          </div>
        </div>
      `;const e=v(w.displayName||w.name),a=(w.members||[]).length,s=w.type==="group";return`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${s?w.avatar||"👥":"💬"}</div>
          <div>
            <div class="bonding-chat-title">${e}</div>
            <div class="bonding-chat-sub">
              ${s?`<span>${a} member${a!==1?"s":""}</span> · <span>${v(w.description||"Public Lounge")}</span>`:"<span>Direct 1-on-1 Personal Chat</span>"}
            </div>
          </div>
        </div>

        <div class="bonding-chat-header-actions">
          ${s?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> Members (${a})
            </button>
          `:""}
          <button class="bonding-header-btn bonding-challenge-btn" id="btn-quick-challenge">
            <span>⚡</span> Challenge
          </button>
        </div>
      </div>
    `}function le(){return!o||o.length===0?`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello, share an update, or launch a friendly game challenge!</p>
        </div>
      `:o.map(e=>{var g;const a=e.sender&&e.sender.userId&&T&&e.sender.userId.toString()===(T._id||T.id);if(e.type==="system")return`
          <div class="bonding-msg-system">
            <span>ℹ️</span> <span>${v(e.content)}</span>
          </div>
        `;if(e.type==="challenge")return he(e,a);const s=v(((g=e.sender)==null?void 0:g.name)||"Teammate"),n=F(e.createdAt),p=be(e);return`
        <div class="bonding-msg-row ${a?"self":"other"}" data-msg-id="${e._id}">
          <div class="bonding-msg-avatar" title="${s}">${s.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${s}</span>
              <span class="bonding-msg-time">${n}</span>
            </div>
            <div class="bonding-msg-bubble">
              ${v(e.content).replace(/\n/g,"<br/>")}
            </div>
            ${p}
          </div>
        </div>
      `}).join("")}function be(e){const a=e.reactions||[];return a.length>0,`
      <div class="bonding-reactions-row">
        ${a.map(n=>{const p=(T==null?void 0:T._id)||(T==null?void 0:T.id);return`
        <button class="bonding-rxn-tag ${(n.users||[]).some(y=>y.toString()===p)?"active":""}" data-msg-id="${e._id}" data-emoji="${n.emoji}">
          <span>${n.emoji}</span> <span>${n.users?n.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${e._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function he(e,a){var O;const s=e.challengeData||{},n=s.gameType||"trivia",g=(s.status||"active")==="completed",y=v(((O=e.sender)==null?void 0:O.name)||"Teammate"),x=F(e.createdAt);let S="🎮",k=s.gameTitle||"Game Showdown";n==="trivia"?S="🧠":n==="tictactoe"?S="❌⭕":n==="wordle"?S="🔤":n==="speedtyper"&&(S="⚡");const D=s.participants||[];let z="";D.length>0&&(z=`
        <div class="bonding-challenge-participants">
          <div class="bonding-part-title">Participants & Scores:</div>
          <div class="bonding-part-chips">
            ${D.map((N,W)=>`
              <div class="bonding-part-chip ${W===0&&g?"winner":""}">
                <span class="part-rank">${W===0?"👑":`#${W+1}`}</span>
                <span class="part-name">${v(N.name)}</span>:
                <strong class="part-score">${N.score} pts</strong>
              </div>
            `).join("")}
          </div>
        </div>
      `);let R="";if(n==="tictactoe"){const N=s.gameState||{},W=(T==null?void 0:T._id)||(T==null?void 0:T.id),ae=N.currentTurn&&N.currentTurn.toString()===W;R=`
        <button class="bonding-btn-play-duel" data-msg-id="${e._id}" data-game="tictactoe">
          ${g?"View Board 🏆":ae?"Your Turn! Play Now 🎮":"Open Tic-Tac-Toe Arena 🕹️"}
        </button>
      `}else R=`
        <button class="bonding-btn-play-duel" data-msg-id="${e._id}" data-game="${n}">
          ${g?"View Results & Play Again 🏆":"Accept Challenge & Play! 🚀"}
        </button>
      `;return`
      <div class="bonding-msg-row ${a?"self":"other"} challenge-row" data-msg-id="${e._id}">
        <div class="bonding-msg-avatar" title="${y}">${y.slice(0,1).toUpperCase()}</div>
        <div class="bonding-msg-bubble-wrap">
          <div class="bonding-msg-meta">
            <span class="bonding-msg-sender">${y}</span>
            <span class="bonding-msg-time">${x}</span>
          </div>

          <div class="bonding-challenge-card">
            <div class="bonding-challenge-header">
              <div class="bonding-challenge-icon">${S}</div>
              <div class="bonding-challenge-meta">
                <div class="bonding-challenge-title">${v(k)}</div>
                <div class="bonding-challenge-sub">
                  ${g?'<span class="status-badge done">Challenge Completed</span>':'<span class="status-badge live">Live Challenge</span>'}
                  · Issued by ${y}
                </div>
              </div>
            </div>

            ${e.content?`<div class="bonding-challenge-text">${v(e.content)}</div>`:""}

            ${z}

            <div class="bonding-challenge-footer">
              ${R}
            </div>
          </div>

          ${be(e)}
        </div>
      </div>
    `}function ye(){return w?`
      <div class="bonding-chat-input-bar">
        <button class="bonding-input-action-btn" id="btn-input-challenge" title="Launch a Challenge">
          <span>⚡ Challenge</span>
        </button>
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `:""}function ee(){const e=b.querySelector("#bonding-messages-feed");e&&(e.scrollTop=e.scrollHeight)}function re(){const e=b.querySelector("#bonding-messages-feed");if(!e)return;const a=e.scrollHeight-e.scrollTop<=e.clientHeight+80;e.innerHTML=le(),pe(),a&&ee()}function ce(){const e=b.querySelector("#bonding-group-list"),a=b.querySelector("#bonding-direct-list");e&&(e.innerHTML=oe("group")),a&&(a.innerHTML=oe("direct")),te()}function we(){te(),ue(),pe(),ke();const e=b.querySelector("#bonding-search-input");e&&e.addEventListener("input",a=>{const s=a.target.value.toLowerCase().trim();b.querySelectorAll(".bonding-channel-item").forEach(p=>{const g=p.textContent.toLowerCase();p.style.display=g.includes(s)?"flex":"none"})})}function te(){const e=b.querySelectorAll(".bonding-channel-item");e.forEach(n=>{n.addEventListener("click",async()=>{const p=n.dataset.chanId,g=j.find(y=>y._id===p);g&&(w=g,e.forEach(y=>y.classList.remove("active")),n.classList.add("active"),await L(w._id),K(b.querySelector("#bonding-tab-content")))})});const a=b.querySelector("#btn-create-group");a&&a.addEventListener("click",u);const s=b.querySelector("#btn-new-direct-chat");s&&s.addEventListener("click",c)}function ue(){const e=b.querySelector("#btn-manage-members");e&&e.addEventListener("click",l);const a=b.querySelector("#btn-quick-challenge");a&&a.addEventListener("click",()=>C(w))}function ke(){const e=b.querySelector("#bonding-message-input"),a=b.querySelector("#btn-send-message"),s=b.querySelector("#btn-input-challenge"),n=b.querySelector("#btn-quick-emoji");e&&e.addEventListener("keydown",p=>{p.key==="Enter"&&!p.shiftKey&&(p.preventDefault(),t())}),a&&a.addEventListener("click",t),s&&s.addEventListener("click",()=>C(w)),n&&n.addEventListener("click",()=>{if(!e)return;const p=["👍","🎉","🔥","💪","🚀","❤️","😂","🏆"],g=p[Math.floor(Math.random()*p.length)];e.value+=(e.value?" ":"")+g,e.focus()})}function pe(){b.querySelectorAll(".bonding-btn-play-duel").forEach(n=>{n.addEventListener("click",()=>{const p=n.dataset.msgId,g=n.dataset.game,y=o.find(x=>x._id===p);y&&P(y,g)})}),b.querySelectorAll(".bonding-rxn-tag").forEach(n=>{n.addEventListener("click",async()=>{const p=n.dataset.msgId,g=n.dataset.emoji;await i(p,g)})}),b.querySelectorAll(".bonding-add-rxn-btn").forEach(n=>{n.addEventListener("click",p=>{const g=n.dataset.msgId;B(p.currentTarget,async y=>{await i(g,y)})})})}async function t(){const e=b.querySelector("#bonding-message-input");if(!e||!w)return;const a=e.value.trim();if(!(!a||Z)){Z=!0;try{e.value="";const s=await V(`/bonding/channels/${w._id}/messages`,{type:"text",content:a});o.push(s),d(),ee();const n=await Q("/bonding/channels").catch(()=>[]);n&&n.length&&(j=n,ce())}catch(s){$(s.message||"Failed to send message","error")}finally{Z=!1,e.focus()}}}async function i(e,a){try{const s=await V(`/bonding/messages/${e}/react`,{emoji:a}),n=o.find(p=>p._id===e);n&&(n.reactions=s,re())}catch(s){$(s.message||"Failed to react","error")}}function d(){const e=b.querySelector("#bonding-messages-feed");e&&(e.innerHTML=le(),pe())}function l(){if(!w||w.type==="direct")return;const e=b.querySelector("#bonding-modals-root"),a=w.members||[],s=new Set(a.map(x=>{var S;return(S=x.userId)==null?void 0:S.toString()})),n=A.filter(x=>!s.has(x._id.toString()));e.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${v(w.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group:</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select a teammate to add...</option>
                  ${n.map(x=>`
                    <option value="${x._id}">${v(x.name)} (${v(x.role)})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${n.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${n.length===0?'<div class="bonding-hint-text">All active colleagues are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${a.length}):</label>
              <div class="bonding-members-list">
                ${a.map(x=>{const S=T&&x.userId&&x.userId.toString()===(T._id||T.id);return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(x.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${v(x.name)} ${S?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${v(x.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${x.userId}" data-name="${v(x.name)}">
                          ${S?"Leave Group":"Remove"}
                        </button>
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;const p=e.querySelector(".bonding-modal-close");p.onclick=()=>{e.innerHTML=""};const g=e.querySelector("#btn-submit-add-member");g&&(g.onclick=async()=>{const S=e.querySelector("#sel-add-colleague").value;if(!S){$("Please select a colleague to add","warning");return}try{g.disabled=!0,g.textContent="Adding...";const k=await $e(`/bonding/channels/${w._id}/members`,{action:"add",userIds:[S]});$("Colleague added to group! 🎉","success"),w=k.channel,e.innerHTML="",await L(w._id),K(b.querySelector("#bonding-tab-content"))}catch(k){$(k.message||"Failed to add member","error"),g.disabled=!1,g.textContent="Add to Group"}}),e.querySelectorAll(".btn-remove-member").forEach(x=>{x.onclick=async()=>{const S=x.dataset.userId,k=x.dataset.name;if(confirm(`Are you sure you want to remove ${k} from this group?`))try{x.disabled=!0;const D=await $e(`/bonding/channels/${w._id}/members`,{action:"remove",userId:S});$(`${k} removed from group`,"info"),w=D.channel,e.innerHTML="",await L(w._id),K(b.querySelector("#bonding-tab-content"))}catch(D){$(D.message||"Failed to remove member","error"),x.disabled=!1}}})}function c(){const e=b.querySelector("#bonding-modals-root"),a=A.filter(n=>!n.isSelf);e.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any team member to start a 1-on-1 private conversation and game challenge.</p>
            <div class="bonding-user-pick-list">
              ${a.map(n=>`
                <div class="bonding-user-pick-item" data-user-id="${n._id}" data-name="${v(n.name)}">
                  <div class="bonding-member-avatar">${n.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${v(n.name)}</span>
                    <span class="user-pick-role">${v(n.role)} · ${v(n.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,e.querySelector(".bonding-modal-close").onclick=()=>{e.innerHTML=""},e.querySelectorAll(".bonding-user-pick-item").forEach(n=>{n.onclick=async()=>{const p=n.dataset.userId;try{const g=await V("/bonding/channels",{type:"direct",targetUserId:p});e.innerHTML="",j=await Q("/bonding/channels"),w=j.find(y=>y._id===g._id)||g,await L(w._id),K(b.querySelector("#bonding-tab-content"))}catch(g){$(g.message||"Failed to open personal chat","error")}}})}function u(){const e=b.querySelector("#bonding-modals-root"),a=A.filter(g=>!g.isSelf);e.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Create a New Group Lounge</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <div class="bonding-form-section">
              <label class="bonding-form-label">Group Name *</label>
              <input type="text" id="new-group-name" class="bonding-input" placeholder="e.g. Creative Minds, Friday Gaming, Dev Lounge..." />
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
                <span class="avatar-opt">🎮</span>
                <span class="avatar-opt">🚀</span>
                <span class="avatar-opt">💡</span>
                <span class="avatar-opt">🍕</span>
                <span class="avatar-opt">🏆</span>
                <span class="avatar-opt">🎯</span>
              </div>
            </div>

            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Initial Members</label>
              <div class="bonding-member-checkboxes">
                ${a.map(g=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${g._id}" />
                    <span>${v(g.name)} (${v(g.role)})</span>
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
    `,e.querySelector(".bonding-modal-close").onclick=()=>{e.innerHTML=""},e.querySelector("#btn-cancel-create-grp").onclick=()=>{e.innerHTML=""};let s="👥";const n=e.querySelectorAll(".avatar-opt");n.forEach(g=>{g.onclick=()=>{n.forEach(y=>y.classList.remove("active")),g.classList.add("active"),s=g.textContent.trim()}});const p=e.querySelector("#btn-confirm-create-grp");p.onclick=async()=>{const g=e.querySelector("#new-group-name"),y=e.querySelector("#new-group-desc"),x=g.value.trim();if(!x){$("Please enter a group name","warning"),g.focus();return}const S=e.querySelectorAll(".new-group-member-chk:checked"),k=Array.from(S).map(D=>D.value);try{p.disabled=!0,p.textContent="Creating...";const D=await V("/bonding/channels",{type:"group",name:x,description:y.value.trim(),avatar:s,memberIds:k});$(`Group "${x}" created! 🎉`,"success"),e.innerHTML="",j=await Q("/bonding/channels"),w=j.find(z=>z._id===D._id)||D,await L(w._id),K(b.querySelector("#bonding-tab-content"))}catch(D){$(D.message||"Failed to create group","error"),p.disabled=!1,p.textContent="Create Group 🎉"}}}function C(e){const a=b.querySelector("#bonding-modals-root"),n=e&&e.type==="direct"?e.displayName||"your colleague":e.name||"the group";a.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card" style="max-width: 580px;">
          <div class="bonding-modal-header">
            <h3>⚡ Launch a Challenge to ${v(n)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Pick a mini-game to play and challenge your team! Win points and climb the company leaderboard.</p>

            <div class="bonding-game-pick-grid">
              <!-- Game 1: Trivia Blitz -->
              <div class="bonding-game-card-pick" data-game="trivia">
                <div class="game-pick-icon">🧠</div>
                <div class="game-pick-title">Trivia Blitz</div>
                <div class="game-pick-desc">5 fast-paced multiple choice questions. Best score and speed wins!</div>
                <button class="bonding-btn-primary btn-launch-specific-game">Play & Challenge</button>
              </div>

              <!-- Game 2: Tic-Tac-Toe Clash -->
              <div class="bonding-game-card-pick" data-game="tictactoe">
                <div class="game-pick-icon">❌⭕</div>
                <div class="game-pick-title">Tic-Tac-Toe Clash</div>
                <div class="game-pick-desc">Classic turn-based duel. Take turns on the 3x3 grid right inside the chat!</div>
                <button class="bonding-btn-primary btn-launch-specific-game">Start Duel</button>
              </div>

              <!-- Game 3: Wordle Duel -->
              <div class="bonding-game-card-pick" data-game="wordle">
                <div class="game-pick-icon">🔤</div>
                <div class="game-pick-title">Wordle Duel</div>
                <div class="game-pick-desc">Guess the 5-letter secret word in 6 attempts. Lowest attempts wins!</div>
                <button class="bonding-btn-primary btn-launch-specific-game">Play & Challenge</button>
              </div>

              <!-- Game 4: Speed Typist -->
              <div class="bonding-game-card-pick" data-game="speedtyper">
                <div class="game-pick-icon">⚡</div>
                <div class="game-pick-title">Speed Typist Sprint</div>
                <div class="game-pick-desc">30-second rapid typing challenge. Challenge your teammates to beat your WPM!</div>
                <button class="bonding-btn-primary btn-launch-specific-game">Start Sprint</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,a.querySelector(".bonding-modal-close").onclick=()=>{a.innerHTML=""},a.querySelectorAll(".btn-launch-specific-game").forEach(g=>{g.onclick=y=>{const S=y.currentTarget.closest(".bonding-game-card-pick").dataset.game;a.innerHTML="",I(S,e)}})}async function I(e,a){if(e==="tictactoe"){try{const s=a.type==="direct"?a.otherUserId:null,n=a.type==="direct"?a.displayName:"",p=await V(`/bonding/channels/${a._id}/messages`,{type:"challenge",content:"I've initiated a Tic-Tac-Toe duel! Click below to make your move! ❌⭕",challengeData:{gameType:"tictactoe",gameTitle:"Tic-Tac-Toe Showdown",targetUserId:s,targetUserName:n}});o.push(p),d(),ee(),$("Tic-Tac-Toe challenge posted to chat! 🎮","success"),P(p,"tictactoe")}catch(s){$(s.message||"Failed to start Tic-Tac-Toe","error")}return}h(e,async s=>{try{const n=a.type==="direct"?a.otherUserId:null,p=a.type==="direct"?a.displayName:"";let g="Friendly Game Showdown";e==="trivia"?g="Trivia Blitz Challenge":e==="wordle"?g="Wordle Mystery Duel":e==="speedtyper"&&(g="Speed Typist Showdown");const y=await V(`/bonding/channels/${a._id}/messages`,{type:"challenge",content:`I scored ${s.score} pts in ${g}! Can you beat my score? 🚀`,challengeData:{gameType:e,gameTitle:g,targetUserId:n,targetUserName:p,challengerScore:s.score,challengerTime:s.timeSpent,details:s.details}});o.push(y),d(),ee(),$("Challenge posted! You earned +10 bonding points! 🏆","success")}catch(n){$(n.message||"Failed to post challenge","error")}})}function P(e,a){if(a==="tictactoe"){m(e);return}h(a,async s=>{try{const n=await V(`/bonding/challenges/${e._id}/action`,{action:"submit_score",score:s.score,timeSpent:s.timeSpent,details:s.details}),p=o.findIndex(g=>g._id===e._id);p>-1&&(o[p]=n),d(),$("Score submitted! You earned bonding points! 🌟","success")}catch(n){$(n.message||"Failed to submit score","error")}})}function m(e){const a=b.querySelector("#bonding-modals-root"),s=e.challengeData||{},n=s.gameState||{},p=n.board||Array(9).fill(null),g=(T==null?void 0:T._id)||(T==null?void 0:T.id),y=s.status==="completed";let x="";y?n.winner==="Draw"?x="🤝 Game ended in a Draw!":x=`🏆 Winner: ${v(n.winningPlayer||"Winner")} (${n.winner})!`:x=n.currentTurn&&n.currentTurn.toString()===g?"🎮 It is YOUR turn! Click a tile.":`⏳ Waiting for ${v(n.currentTurn===n.playerX?n.playerXName:n.playerOName||"opponent")} to move...`,a.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card" style="max-width: 420px; text-align: center;">
          <div class="bonding-modal-header">
            <h3>❌⭕ Tic-Tac-Toe Duel</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <div class="ttt-players-bar">
              <span class="ttt-player x">❌ ${v(n.playerXName||"Player 1")}</span>
              <span class="vs">vs</span>
              <span class="ttt-player o">⭕ ${v(n.playerOName||"Player 2")}</span>
            </div>

            <div class="ttt-status-banner">${x}</div>

            <div class="ttt-grid" id="ttt-board">
              ${p.map((k,D)=>`
                <button class="ttt-cell ${k?k.toLowerCase():""}" data-idx="${D}" ${k||y?"disabled":""}>
                  ${k?k==="X"?"❌":"⭕":""}
                </button>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,a.querySelector(".bonding-modal-close").onclick=()=>{a.innerHTML=""},a.querySelectorAll(".ttt-cell").forEach(k=>{k.onclick=async()=>{const D=parseInt(k.dataset.idx,10);try{k.disabled=!0;const z=await V(`/bonding/challenges/${e._id}/action`,{action:"play_tictactoe",cellIndex:D}),R=o.findIndex(O=>O._id===e._id);R>-1&&(o[R]=z),d(),m(z)}catch(z){$(z.message||"Cannot place move","warning"),k.disabled=!1}}})}function h(e,a){e==="trivia"?f(a):e==="wordle"?r(a):e==="speedtyper"&&q(a)}function f(e){const a=b.querySelector("#bonding-modals-root"),s=Be.slice(0,5);let n=0,p=0,g=Date.now(),y=null,x=15;function S(){const z=s[n];x=15,a.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card" style="max-width: 480px;">
            <div class="bonding-modal-header">
              <h3>🧠 Trivia Blitz (${n+1}/5)</h3>
              <div class="trivia-timer-badge" id="trivia-timer">⏱️ 15s</div>
            </div>
            <div class="bonding-modal-body">
              <div class="trivia-question-text">${v(z.q)}</div>
              <div class="trivia-options-grid">
                ${z.options.map((N,W)=>`
                  <button class="trivia-option-btn" data-opt="${W}">
                    <span class="opt-letter">${String.fromCharCode(65+W)}</span>
                    <span class="opt-label">${v(N)}</span>
                  </button>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      `;const R=a.querySelector("#trivia-timer");y&&clearInterval(y),y=setInterval(()=>{x--,R&&(R.textContent=`⏱️ ${x}s`),x<=0&&(clearInterval(y),k(-1))},1e3),a.querySelectorAll(".trivia-option-btn").forEach(N=>{N.onclick=()=>{clearInterval(y);const W=parseInt(N.dataset.opt,10);k(W)}})}function k(z){const R=s[n];a.querySelectorAll(".trivia-option-btn").forEach(N=>{const W=parseInt(N.dataset.opt,10);W===R.correct?N.classList.add("correct"):W===z&&N.classList.add("wrong"),N.disabled=!0}),z===R.correct&&(p+=20),setTimeout(()=>{n++,n<s.length?S():D()},1e3)}function D(){y&&clearInterval(y);const z=Math.round((Date.now()-g)/1e3);a.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card" style="max-width: 420px; text-align: center;">
            <div class="bonding-modal-header">
              <h3>🎉 Trivia Complete!</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>
            <div class="bonding-modal-body">
              <div style="font-size: 52px; margin: 10px 0;">🏆</div>
              <div style="font-size: 24px; font-weight: 700; color: var(--navy-900);">Your Score: ${p} / 100</div>
              <p style="color: var(--text-3); font-size: 14px; margin-top: 6px;">Completed 5 questions in ${z} seconds.</p>

              <button class="bonding-btn-primary" id="btn-submit-trivia-res" style="margin-top: 20px; width: 100%;">
                Submit & Record Points 🚀
              </button>
            </div>
          </div>
        </div>
      `,a.querySelector(".bonding-modal-close").onclick=()=>{a.innerHTML=""},a.querySelector("#btn-submit-trivia-res").onclick=()=>{a.innerHTML="",typeof e=="function"&&e({score:p,timeSpent:z,details:{correct:p/20,total:5}})}}S()}function r(e){const a=b.querySelector("#bonding-modals-root"),s=Ce[Math.floor(Math.random()*Ce.length)],n=6;let p=[],g="",y=Date.now();function x(){a.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card" style="max-width: 420px; text-align: center;">
            <div class="bonding-modal-header">
              <h3>🔤 Wordle Mystery Duel</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>
            <div class="bonding-modal-body">
              <div class="wordle-grid">
                ${Array(n).fill(0).map((z,R)=>{const O=p[R]||(R===p.length?g.padEnd(5," "):"     ");return`
                    <div class="wordle-row">
                      ${Array(5).fill(0).map((N,W)=>{const ae=O[W]||"";let se="";if(R<p.length){const Ie=s[W];ae===Ie?se="green":s.includes(ae)?se="yellow":se="gray"}return`<div class="wordle-cell ${se}">${ae.trim()}</div>`}).join("")}
                    </div>
                  `}).join("")}
              </div>

              <!-- Input row -->
              <div class="wordle-input-controls">
                <input type="text" id="wordle-input-box" class="bonding-input" maxlength="5" placeholder="Type 5-letter word..." autofocus />
                <button class="bonding-btn-primary" id="btn-submit-wordle-guess">Enter</button>
              </div>
            </div>
          </div>
        </div>
      `,a.querySelector(".bonding-modal-close").onclick=()=>{a.innerHTML=""};const k=a.querySelector("#wordle-input-box"),D=a.querySelector("#btn-submit-wordle-guess");k&&(k.focus(),k.oninput=z=>{g=z.target.value.toUpperCase().replace(/[^A-Z]/g,""),z.target.value=g},k.onkeydown=z=>{z.key==="Enter"&&S()}),D&&(D.onclick=S)}function S(){if(g.length!==5){$("Word must be 5 letters!","warning");return}p.push(g);const k=g===s;if(g="",k||p.length>=n){const D=Math.round((Date.now()-y)/1e3),z=k?110-p.length*15:20;setTimeout(()=>{a.innerHTML=`
            <div class="bonding-modal-backdrop">
              <div class="bonding-modal-card" style="max-width: 400px; text-align: center;">
                <div class="bonding-modal-header">
                  <h3>${k?"🎉 Brilliant Word Solve!":"Game Over"}</h3>
                  <button class="bonding-modal-close">&times;</button>
                </div>
                <div class="bonding-modal-body">
                  <div style="font-size: 48px; margin: 10px 0;">${k?"🔤":"💡"}</div>
                  <div style="font-size: 22px; font-weight: 700; color: var(--navy-900);">Secret Word: ${s}</div>
                  <p style="color: var(--text-3); font-size: 14px; margin-top: 6px;">
                    ${k?`Solved in ${p.length} guesses (${D}s)`:"Better luck next time!"}
                  </p>
                  <button class="bonding-btn-primary" id="btn-submit-wordle-res" style="margin-top: 18px; width: 100%;">
                    Submit Score (${z} pts) 🚀
                  </button>
                </div>
              </div>
            </div>
          `,a.querySelector(".bonding-modal-close").onclick=()=>{a.innerHTML=""},a.querySelector("#btn-submit-wordle-res").onclick=()=>{a.innerHTML="",typeof e=="function"&&e({score:Math.max(z,10),timeSpent:D,details:{guesses:p.length,won:k}})}},500);return}x()}x()}function q(e){const a=b.querySelector("#bonding-modals-root"),s=Pe[Math.floor(Math.random()*Pe.length)];let n=null,p=null,g=30;a.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card" style="max-width: 520px;">
          <div class="bonding-modal-header">
            <h3>⚡ Speed Typist Sprint</h3>
            <div class="trivia-timer-badge" id="typer-timer">⏱️ 30s</div>
          </div>
          <div class="bonding-modal-body">
            <p style="color: var(--text-3); font-size: 13px;">Type the passage as quickly and accurately as you can:</p>
            <div class="typer-passage-box">${s}</div>
            <textarea id="typer-input-area" class="bonding-input" rows="3" placeholder="Start typing here to begin timer..."></textarea>
            <div class="typer-stats-bar" id="typer-live-stats">
              <span>WPM: <strong id="live-wpm">0</strong></span>
              <span>Accuracy: <strong id="live-acc">100%</strong></span>
            </div>
          </div>
        </div>
      </div>
    `;const y=a.querySelector("#typer-input-area"),x=a.querySelector("#typer-timer"),S=a.querySelector("#live-wpm");a.querySelector("#live-acc"),a.querySelector(".bonding-modal-header").insertAdjacentHTML("beforeend",'<button class="bonding-modal-close">&times;</button>'),a.querySelector(".bonding-modal-close").onclick=()=>{p&&clearInterval(p),a.innerHTML=""},y.focus(),y.oninput=()=>{n||(n=Date.now(),p=setInterval(()=>{g--,x&&(x.textContent=`⏱️ ${g}s`),g<=0&&(clearInterval(p),k())},1e3));const D=y.value,z=D.trim().split(/\s+/).filter(Boolean).length,R=(Date.now()-n)/6e4,O=Math.round(z/(R||.01));S&&(S.textContent=O),D.trim()===s.trim()&&(clearInterval(p),k())};function k(){p&&clearInterval(p);const z=y.value.trim().split(/\s+/).filter(Boolean).length,R=Math.max((Date.now()-(n||Date.now()))/6e4,.1),O=Math.min(Math.round(z/R),160),N=Math.max(Math.round(O*1.5),20);a.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card" style="max-width: 400px; text-align: center;">
            <div class="bonding-modal-header">
              <h3>⚡ Sprint Finished!</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>
            <div class="bonding-modal-body">
              <div style="font-size: 48px; margin: 10px 0;">⚡</div>
              <div style="font-size: 24px; font-weight: 700; color: var(--navy-900);">${O} WPM</div>
              <p style="color: var(--text-3); font-size: 14px; margin-top: 6px;">Earned ${N} points!</p>

              <button class="bonding-btn-primary" id="btn-submit-typer-res" style="margin-top: 18px; width: 100%;">
                Submit Challenge Score 🚀
              </button>
            </div>
          </div>
        </div>
      `,a.querySelector(".bonding-modal-close").onclick=()=>{a.innerHTML=""},a.querySelector("#btn-submit-typer-res").onclick=()=>{a.innerHTML="",typeof e=="function"&&e({score:N,timeSpent:30-g,details:{wpm:O}})}}}function E(e){e.innerHTML=`
      <div class="bonding-arcade-wrap">
        <div class="arcade-hero">
          <h1>🕹️ CI360 Team Games Arcade</h1>
          <p>Challenge colleagues, hone your skills, and earn badges on the company leaderboard!</p>
        </div>

        <div class="arcade-cards-grid">
          <div class="arcade-card">
            <div class="arcade-card-icon">🧠</div>
            <h3 class="arcade-card-title">Trivia Blitz</h3>
            <p class="arcade-card-desc">Rapid 5-question trivia quiz with science, tech, pop culture, and brain teasers. Timed multiple choice!</p>
            <div class="arcade-card-tags">
              <span>5 Questions</span> <span>15s Timer</span> <span>Solo or Challenge</span>
            </div>
            <button class="bonding-btn-primary arcade-play-btn" data-game="trivia">Play Trivia Blitz 🚀</button>
          </div>

          <div class="arcade-card">
            <div class="arcade-card-icon">❌⭕</div>
            <h3 class="arcade-card-title">Tic-Tac-Toe Clash</h3>
            <p class="arcade-card-desc">Classic 3x3 strategic battle. Challenge an employee or take turns live right inside your chat channels!</p>
            <div class="arcade-card-tags">
              <span>Turn Based</span> <span>Live Duel</span> <span>Points & Medals</span>
            </div>
            <button class="bonding-btn-primary arcade-challenge-btn" data-game="tictactoe">Challenge Teammate ⚡</button>
          </div>

          <div class="arcade-card">
            <div class="arcade-card-icon">🔤</div>
            <h3 class="arcade-card-title">Wordle Mystery Duel</h3>
            <p class="arcade-card-desc">Crack the 5-letter hidden word in 6 guesses or fewer with color-coded feedback hints.</p>
            <div class="arcade-card-tags">
              <span>Word Puzzle</span> <span>6 Attempts</span> <span>Score Duel</span>
            </div>
            <button class="bonding-btn-primary arcade-play-btn" data-game="wordle">Play Wordle 🎯</button>
          </div>

          <div class="arcade-card">
            <div class="arcade-card-icon">⚡</div>
            <h3 class="arcade-card-title">Speed Typist Sprint</h3>
            <p class="arcade-card-desc">Put your typing speed and accuracy to the test in a 30-second sprint. Set a high WPM record!</p>
            <div class="arcade-card-tags">
              <span>30 Seconds</span> <span>WPM Tracker</span> <span>Fast Action</span>
            </div>
            <button class="bonding-btn-primary arcade-play-btn" data-game="speedtyper">Start Sprint ⌨️</button>
          </div>
        </div>
      </div>
    `,e.querySelectorAll(".arcade-play-btn").forEach(n=>{n.onclick=()=>{const p=n.dataset.game;h(p,g=>{$(`Great game! Scored ${g.score} pts! 🌟`,"success")})}}),e.querySelectorAll(".arcade-challenge-btn").forEach(n=>{n.onclick=()=>{C(w||j[0])}})}async function H(e){e.innerHTML='<div class="bonding-loading-skeleton">Loading Leaderboard & Badges...</div>';try{const a=await Q("/bonding/leaderboard").catch(()=>[]);e.innerHTML=`
        <div class="bonding-leaderboard-wrap">
          <div class="lb-header">
            <div>
              <h2>🏆 Team Bonding Leaderboard</h2>
              <p>Top teammates, challenges won, and achievement badges</p>
            </div>
            <button class="bonding-btn-primary" id="btn-refresh-lb">Refresh Ranks</button>
          </div>

          <!-- Podium Top 3 -->
          <div class="lb-podium">
            ${M(a[1],2,"🥈")}
            ${M(a[0],1,"🥇")}
            ${M(a[2],3,"🥉")}
          </div>

          <!-- Table of Rankings -->
          <div class="lb-table-card">
            <table class="lb-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Teammate</th>
                  <th>Role</th>
                  <th>Points</th>
                  <th>Wins</th>
                  <th>Games Played</th>
                  <th>Badges Earned</th>
                </tr>
              </thead>
              <tbody>
                ${a.length===0?'<tr><td colspan="7" style="text-align:center; padding: 24px;">No games recorded yet. Be the first to play in Arcade!</td></tr>':""}
                ${a.map((s,n)=>`
                  <tr>
                    <td><strong>#${n+1}</strong></td>
                    <td>
                      <div class="lb-user-cell">
                        <span class="lb-avatar">${(s.userName||"U").slice(0,1).toUpperCase()}</span>
                        <span>${v(s.userName)}</span>
                      </div>
                    </td>
                    <td><span class="role-badge">${v(s.userRole||"employee")}</span></td>
                    <td><strong class="points-text">${s.points||0} pts</strong></td>
                    <td>${s.wins||0} wins</td>
                    <td>${s.gamesPlayed||0}</td>
                    <td>
                      <div class="lb-badge-list">
                        ${(s.badges||["Team Player"]).map(p=>`<span class="achieve-badge">${v(p)}</span>`).join("")}
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `,e.querySelector("#btn-refresh-lb").onclick=()=>H(e)}catch(a){e.innerHTML=`<div class="bonding-error-box">Failed to load leaderboard: ${v(a.message)}</div>`}}function M(e,a,s){return e?`
      <div class="lb-podium-card rank-${a}">
        <div class="podium-medal">${s}</div>
        <div class="podium-avatar">${(e.userName||"U").slice(0,1).toUpperCase()}</div>
        <div class="podium-name">${v(e.userName)}</div>
        <div class="podium-role">${v(e.userRole||"employee")}</div>
        <div class="podium-pts">${e.points||0} pts</div>
        <div class="podium-wins">${e.wins||0} Wins · ${e.gamesPlayed||0} Games</div>
      </div>
    `:`
        <div class="lb-podium-card rank-${a} empty">
          <div class="podium-rank">${s} #${a}</div>
          <div class="podium-name">—</div>
          <div class="podium-pts">0 pts</div>
        </div>
      `}function B(e,a){const s=document.querySelector(".bonding-emoji-popup");s&&s.remove();const n=["👍","❤️","🔥","😂","🎉","👏","🎯","⚡","🏆","🙌","💯","🚀"],p=document.createElement("div");p.className="bonding-emoji-popup",p.innerHTML=n.map(x=>`<button class="emoji-opt-btn" data-e="${x}">${x}</button>`).join("");const g=e.getBoundingClientRect();p.style.top=`${g.bottom+window.scrollY+6}px`,p.style.left=`${g.left+window.scrollX}px`,document.body.appendChild(p),p.querySelectorAll(".emoji-opt-btn").forEach(x=>{x.onclick=S=>{S.stopPropagation(),a(x.dataset.e),p.remove()}});const y=x=>{p.contains(x.target)||(p.remove(),document.removeEventListener("click",y))};setTimeout(()=>document.addEventListener("click",y),10)}function F(e){if(!e)return"";try{return new Date(e).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Fe(){if(document.getElementById("ci360-bonding-styles"))return;const b=document.createElement("style");b.id="ci360-bonding-styles",b.textContent=`
    .bonding-wrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 0 4px;
      font-family: inherit;
    }

    .bonding-nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 16px;
      padding: 16px 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }

    .bonding-nav-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .bonding-logo-badge {
      font-size: 28px;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
    }

    .bonding-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
      margin: 0 0 2px 0;
    }

    .bonding-subtitle {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    .bonding-nav-tabs {
      display: flex;
      gap: 8px;
      background: var(--bg-hover, #f1f5f9);
      padding: 5px;
      border-radius: 12px;
    }

    .bonding-nav-tab {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 9px;
      border: none;
      background: transparent;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-2, #475569);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .bonding-nav-tab:hover {
      color: var(--navy-900, #0f172a);
    }

    .bonding-nav-tab.active {
      background: var(--surface, #ffffff);
      color: #6366f1;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }

    /* Chat Layout */
    .bonding-chat-layout {
      display: grid;
      grid-template-columns: 310px 1fr;
      height: 720px;
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    }

    @media (max-width: 900px) {
      .bonding-chat-layout {
        grid-template-columns: 1fr;
        height: auto;
      }
      .bonding-sidebar {
        max-height: 280px;
        border-right: none !important;
        border-bottom: 1px solid var(--border, #e2e8f0);
      }
    }

    .bonding-sidebar {
      border-right: 1px solid var(--border, #e2e8f0);
      background: var(--bg-card, #fafafa);
      padding: 16px 14px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .bonding-search-box input {
      width: 100%;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid var(--border, #e2e8f0);
      background: var(--surface, #ffffff);
      font-size: 13px;
      color: var(--text-1, #0f172a);
      outline: none;
      box-sizing: border-box;
    }

    .bonding-search-box input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
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

    .bonding-mini-btn {
      background: transparent;
      border: none;
      color: #6366f1;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 6px;
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

    .bonding-channel-item.active {
      background: rgba(99, 102, 241, 0.1);
    }

    .bonding-channel-avatar {
      font-size: 18px;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
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

    .bonding-channel-time {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
      flex-shrink: 0;
    }

    .bonding-channel-preview {
      font-size: 12px;
      color: var(--text-3, #64748b);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }

    .bonding-empty-channels {
      font-size: 12px;
      color: var(--text-3, #94a3b8);
      padding: 10px 4px;
      line-height: 1.4;
    }

    /* Main Chat Section */
    .bonding-chat-main {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--surface, #ffffff);
    }

    .bonding-chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border, #e2e8f0);
      background: var(--surface, #ffffff);
    }

    .bonding-chat-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bonding-chat-header-avatar {
      font-size: 24px;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-chat-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
    }

    .bonding-chat-sub {
      font-size: 12px;
      color: var(--text-3, #64748b);
      margin-top: 2px;
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
      border: 1px solid var(--border, #cbd5e1);
      background: var(--surface, #ffffff);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-2, #334155);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .bonding-header-btn:hover {
      background: var(--bg-hover, #f8fafc);
      border-color: #94a3b8;
    }

    .bonding-challenge-btn {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff !important;
      border: none;
    }

    .bonding-challenge-btn:hover {
      opacity: 0.92;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    /* Message Feed */
    .bonding-messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: var(--bg-card, #f8fafc);
    }

    .bonding-empty-feed {
      text-align: center;
      margin: auto;
      max-width: 340px;
    }

    .bonding-empty-icon {
      font-size: 44px;
      margin-bottom: 8px;
    }

    .bonding-empty-feed h4 {
      font-size: 16px;
      color: var(--navy-900, #0f172a);
      margin: 0 0 6px 0;
    }

    .bonding-empty-feed p {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0;
      line-height: 1.5;
    }

    .bonding-msg-system {
      align-self: center;
      background: rgba(148, 163, 184, 0.14);
      color: var(--text-2, #475569);
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 6px;
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
      font-size: 13px;
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

    .bonding-msg-sender {
      font-weight: 600;
      color: var(--text-2, #475569);
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
      background: var(--surface, #ffffff);
      color: var(--text-1, #0f172a);
      border: 1px solid var(--border, #e2e8f0);
      border-top-left-radius: 4px;
    }

    .bonding-msg-row.self .bonding-msg-bubble {
      background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
      color: #ffffff;
      border-top-right-radius: 4px;
    }

    /* Challenge Message Card */
    .bonding-challenge-card {
      background: var(--surface, #ffffff);
      border: 2px solid #6366f1;
      border-radius: 16px;
      padding: 16px;
      min-width: 290px;
      max-width: 380px;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.12);
    }

    .bonding-challenge-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }

    .bonding-challenge-icon {
      font-size: 26px;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-challenge-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
    }

    .bonding-challenge-sub {
      font-size: 11px;
      color: var(--text-3, #64748b);
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-badge {
      display: inline-block;
      padding: 1px 6px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 10px;
    }

    .status-badge.live {
      background: #dcfce7;
      color: #15803d;
    }

    .status-badge.done {
      background: #f1f5f9;
      color: #475569;
    }

    .bonding-challenge-text {
      font-size: 13px;
      color: var(--text-2, #334155);
      margin-bottom: 10px;
      line-height: 1.4;
    }

    .bonding-challenge-participants {
      background: var(--bg-hover, #f8fafc);
      padding: 10px 12px;
      border-radius: 10px;
      margin-bottom: 12px;
      font-size: 12px;
    }

    .bonding-part-title {
      font-weight: 600;
      color: var(--text-2, #475569);
      margin-bottom: 6px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .bonding-part-chips {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bonding-part-chip {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 3px 6px;
      border-radius: 6px;
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
    }

    .bonding-part-chip.winner {
      border-color: #f59e0b;
      background: #fffbeb;
    }

    .part-score {
      color: #6366f1;
    }

    .bonding-btn-play-duel {
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      border: none;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .bonding-btn-play-duel:hover {
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
      transform: translateY(-1px);
    }

    /* Reactions Row */
    .bonding-reactions-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
    }

    .bonding-rxn-tag {
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 100px;
      padding: 2px 7px;
      font-size: 11px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      cursor: pointer;
      color: var(--text-2, #475569);
    }

    .bonding-rxn-tag.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.08);
      color: #6366f1;
    }

    .bonding-add-rxn-btn {
      background: transparent;
      border: none;
      font-size: 12px;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 2px 5px;
      border-radius: 6px;
    }

    .bonding-add-rxn-btn:hover {
      background: var(--bg-hover, #f1f5f9);
      color: var(--text-2, #475569);
    }

    /* Chat Input Bar */
    .bonding-chat-input-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      border-top: 1px solid var(--border, #e2e8f0);
      background: var(--surface, #ffffff);
    }

    .bonding-input-action-btn {
      background: var(--bg-hover, #f1f5f9);
      border: 1px solid var(--border, #e2e8f0);
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

    .bonding-input-action-btn:hover {
      background: var(--border, #e2e8f0);
    }

    .bonding-input-field {
      flex: 1;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--border, #cbd5e1);
      background: var(--surface, #ffffff);
      font-size: 13.5px;
      color: var(--text-1, #0f172a);
      outline: none;
      resize: none;
      font-family: inherit;
    }

    .bonding-input-field:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
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

    /* Modal Styles */
    .bonding-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    }

    .bonding-modal-card {
      background: var(--surface, #ffffff);
      border-radius: 20px;
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      border: 1px solid var(--border, #e2e8f0);
    }

    .bonding-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 22px;
      border-bottom: 1px solid var(--border, #e2e8f0);
    }

    .bonding-modal-header h3 {
      font-size: 17px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
      margin: 0;
    }

    .bonding-modal-close {
      background: transparent;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: var(--text-3, #94a3b8);
      line-height: 1;
    }

    .bonding-modal-body {
      padding: 20px 22px;
    }

    .bonding-form-section {
      margin-bottom: 16px;
    }

    .bonding-form-label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-2, #334155);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .bonding-input, .bonding-select {
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--border, #cbd5e1);
      background: var(--surface, #ffffff);
      font-size: 13.5px;
      color: var(--text-1, #0f172a);
      box-sizing: border-box;
      outline: none;
    }

    .bonding-input:focus, .bonding-select:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
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
      background: var(--bg-hover, #f8fafc);
      border: 1px solid var(--border, #e2e8f0);
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

    .you-badge {
      font-size: 10px;
      background: #dbeafe;
      color: #1e40af;
      padding: 1px 5px;
      border-radius: 4px;
      margin-left: 4px;
    }

    .bonding-member-role {
      font-size: 11px;
      color: var(--text-3, #64748b);
      display: block;
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
    }

    .bonding-btn-danger:hover {
      background: #fee2e2;
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
    }

    .bonding-btn-primary:hover {
      opacity: 0.95;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    .bonding-btn-secondary {
      padding: 9px 16px;
      border-radius: 9px;
      border: 1px solid var(--border, #cbd5e1);
      background: var(--surface, #ffffff);
      color: var(--text-2, #334155);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
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
      background: var(--bg-hover, #f8fafc);
      border: 1px solid var(--border, #e2e8f0);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .bonding-user-pick-item:hover {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.04);
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

    .user-pick-role {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      display: block;
    }

    /* Game Picker Cards */
    .bonding-game-pick-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    @media (max-width: 600px) {
      .bonding-game-pick-grid {
        grid-template-columns: 1fr;
      }
    }

    .bonding-game-card-pick {
      background: var(--bg-hover, #f8fafc);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 14px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
    }

    .game-pick-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }

    .game-pick-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
      margin-bottom: 4px;
    }

    .game-pick-desc {
      font-size: 12px;
      color: var(--text-3, #64748b);
      line-height: 1.4;
      margin-bottom: 12px;
      flex: 1;
    }

    /* Tic Tac Toe Grid */
    .ttt-players-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 600;
    }

    .ttt-status-banner {
      background: var(--bg-hover, #f1f5f9);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 600;
      color: var(--navy-900, #0f172a);
      margin-bottom: 16px;
    }

    .ttt-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      max-width: 270px;
      margin: 0 auto;
    }

    .ttt-cell {
      width: 82px;
      height: 82px;
      background: var(--bg-card, #f8fafc);
      border: 2px solid var(--border, #cbd5e1);
      border-radius: 14px;
      font-size: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .ttt-cell:not(:disabled):hover {
      background: rgba(99, 102, 241, 0.08);
      border-color: #6366f1;
      transform: scale(1.03);
    }

    /* Trivia Questions */
    .trivia-timer-badge {
      font-size: 12px;
      font-weight: 700;
      background: #fee2e2;
      color: #b91c1c;
      padding: 3px 8px;
      border-radius: 6px;
    }

    .trivia-question-text {
      font-size: 15px;
      font-weight: 600;
      color: var(--navy-900, #0f172a);
      line-height: 1.45;
      margin-bottom: 18px;
    }

    .trivia-options-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .trivia-option-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid var(--border, #cbd5e1);
      background: var(--surface, #ffffff);
      cursor: pointer;
      text-align: left;
      font-size: 13.5px;
      color: var(--text-1, #0f172a);
      transition: all 0.15s ease;
    }

    .trivia-option-btn:hover:not(:disabled) {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.04);
    }

    .trivia-option-btn.correct {
      background: #dcfce7 !important;
      border-color: #22c55e !important;
      color: #15803d !important;
      font-weight: 700;
    }

    .trivia-option-btn.wrong {
      background: #fee2e2 !important;
      border-color: #ef4444 !important;
      color: #b91c1c !important;
    }

    .opt-letter {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: var(--bg-hover, #f1f5f9);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 11px;
    }

    /* Wordle Styles */
    .wordle-grid {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 0 auto 18px auto;
      max-width: 260px;
    }

    .wordle-row {
      display: flex;
      gap: 6px;
      justify-content: center;
    }

    .wordle-cell {
      width: 44px;
      height: 44px;
      border: 2px solid var(--border, #cbd5e1);
      border-radius: 8px;
      font-size: 20px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      background: var(--surface, #ffffff);
    }

    .wordle-cell.green {
      background: #22c55e;
      color: #ffffff;
      border-color: #22c55e;
    }

    .wordle-cell.yellow {
      background: #eab308;
      color: #ffffff;
      border-color: #eab308;
    }

    .wordle-cell.gray {
      background: #64748b;
      color: #ffffff;
      border-color: #64748b;
    }

    .wordle-input-controls {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    /* Speed Typer Styles */
    .typer-passage-box {
      background: var(--bg-hover, #f8fafc);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 12px;
      padding: 14px;
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--text-1, #0f172a);
      margin-bottom: 14px;
      user-select: none;
    }

    .typer-stats-bar {
      display: flex;
      gap: 16px;
      font-size: 13px;
      color: var(--text-2, #334155);
      margin-top: 10px;
    }

    /* Arcade View */
    .bonding-arcade-wrap {
      padding: 8px 4px;
    }

    .arcade-hero {
      text-align: center;
      padding: 30px 20px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
      border-radius: 20px;
      margin-bottom: 24px;
      border: 1px solid rgba(99, 102, 241, 0.2);
    }

    .arcade-hero h1 {
      font-size: 26px;
      font-weight: 800;
      color: var(--navy-900, #0f172a);
      margin: 0 0 6px 0;
    }

    .arcade-hero p {
      font-size: 14px;
      color: var(--text-2, #475569);
      margin: 0;
    }

    .arcade-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .arcade-card {
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 18px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 14px rgba(0,0,0,0.03);
      transition: all 0.2s ease;
    }

    .arcade-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.12);
      border-color: #6366f1;
    }

    .arcade-card-icon {
      font-size: 38px;
      margin-bottom: 12px;
    }

    .arcade-card-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
      margin: 0 0 8px 0;
    }

    .arcade-card-desc {
      font-size: 13px;
      color: var(--text-3, #64748b);
      line-height: 1.5;
      margin: 0 0 16px 0;
      flex: 1;
    }

    .arcade-card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 18px;
    }

    .arcade-card-tags span {
      background: var(--bg-hover, #f1f5f9);
      color: var(--text-2, #475569);
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }

    /* Leaderboard Styles */
    .bonding-leaderboard-wrap {
      padding: 8px 4px;
    }

    .lb-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .lb-header h2 {
      font-size: 22px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
      margin: 0 0 4px 0;
    }

    .lb-header p {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    .lb-podium {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 16px;
      margin-bottom: 30px;
    }

    @media (max-width: 640px) {
      .lb-podium {
        flex-direction: column;
        align-items: stretch;
      }
    }

    .lb-podium-card {
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 18px;
      padding: 20px;
      text-align: center;
      flex: 1;
      max-width: 220px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.03);
    }

    .lb-podium-card.rank-1 {
      border: 2px solid #f59e0b;
      padding: 26px 20px;
      background: linear-gradient(180deg, #fffbeb 0%, #ffffff 100%);
    }

    .podium-medal {
      font-size: 32px;
      margin-bottom: 6px;
    }

    .podium-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #6366f1;
      color: #ffffff;
      font-size: 18px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 8px auto;
    }

    .podium-name {
      font-size: 15px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
    }

    .podium-role {
      font-size: 11px;
      color: var(--text-3, #64748b);
      margin-bottom: 6px;
      text-transform: capitalize;
    }

    .podium-pts {
      font-size: 18px;
      font-weight: 800;
      color: #6366f1;
      margin-bottom: 2px;
    }

    .podium-wins {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
    }

    .lb-table-card {
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 16px;
      overflow-x: auto;
      box-shadow: 0 4px 14px rgba(0,0,0,0.02);
    }

    .lb-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13.5px;
    }

    .lb-table th {
      padding: 14px 18px;
      background: var(--bg-hover, #f8fafc);
      color: var(--text-3, #64748b);
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid var(--border, #e2e8f0);
    }

    .lb-table td {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border, #f1f5f9);
      color: var(--text-1, #0f172a);
    }

    .lb-user-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .lb-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #6366f1;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .achieve-badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 6px;
      background: #ede9fe;
      color: #6d28d9;
      font-size: 11px;
      font-weight: 600;
      margin-right: 4px;
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
      border: 1px solid var(--border, #e2e8f0);
      cursor: pointer;
      background: var(--surface, #ffffff);
    }

    .avatar-opt.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.1);
    }

    .bonding-member-checkboxes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      max-height: 180px;
      overflow-y: auto;
      border: 1px solid var(--border, #e2e8f0);
      padding: 10px;
      border-radius: 10px;
    }

    .bonding-check-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: var(--text-2, #334155);
      cursor: pointer;
    }

    .bonding-emoji-popup {
      position: absolute;
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #cbd5e1);
      border-radius: 12px;
      padding: 6px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      z-index: 10001;
    }

    .emoji-opt-btn {
      font-size: 20px;
      padding: 6px;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
    }

    .emoji-opt-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }
  `,document.head.appendChild(b)}export{je as a,Ne as i};
