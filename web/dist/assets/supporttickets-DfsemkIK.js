import{c as Re,k as y,e as h,v as Ze,l as et,p as Gt,m as Yt,j as Ce,w as ga,x as ta,y as ba}from"./api-CYyIIDiS.js";const fa={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function _a(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},fa,JSON.parse(i))}catch{}return Object.assign({},fa)}function Ta(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function We(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),d=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${d}`}function Wt(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const d=e.getFullYear(),b=String(e.getMonth()+1).padStart(2,"0"),c=String(e.getDate()).padStart(2,"0");return`${d}-${b}-${c}`}function At(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function Xe(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ma(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function aa(i,t=1){const e=new Date(i+"T00:00:00"),d=e.getDay(),b=(d<t?7:0)+d-t,c=new Date(e);c.setDate(e.getDate()-b);const l=[];for(let n=0;n<7;n++){const z=new Date(c);z.setDate(c.getDate()+n);const W=z.getFullYear(),S=String(z.getMonth()+1).padStart(2,"0"),E=String(z.getDate()).padStart(2,"0");l.push(`${W}-${S}-${E}`)}return l}function Aa(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,d=t.createOscillator(),b=t.createGain();d.type="sine",d.frequency.setValueAtTime(523.25,e),d.frequency.exponentialRampToValueAtTime(783.99,e+.15),b.gain.setValueAtTime(.2,e),b.gain.exponentialRampToValueAtTime(.001,e+.35),d.connect(b),b.connect(t.destination),d.start(e),d.stop(e+.35)}catch{}}function ti(i,t={}){const{userRole:e="employee",currentUser:d=null,onNavigate:b=null}=t,c=e==="superadmin"||e==="admin";let l=_a(),n={selectedDate:We(),viewMode:"daily",filterStatus:"all",searchQuery:"",groupByEmployee:c,collapsedEmployees:{},selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ea(),z();async function z(){n.loading=!0,W();try{const p=[Re("/tasks")];c&&p.push(Re("/personnel").catch(()=>[]));const[T,I]=await Promise.all(p);n.tasks=Array.isArray(T)?T:[],I&&(n.personnelList=Array.isArray(I)?I:[])}catch(p){y("Failed to load planner tasks: "+p.message,!0)}finally{n.loading=!1,N()}}function W(){i.innerHTML=`
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
    `}function S(p){return n.tasks.filter(T=>{if(T.isDeleted===!0)return!1;if(c&&n.selectedPersonnelId!=="all"){const a=T.personnelId?._id||T.personnelId;if(String(a)!==String(n.selectedPersonnelId))return!1}const I=T.completionDateStr||T.dateStr||(T.dueDate?new Date(T.dueDate).toISOString().slice(0,10):"");return I?I===p:p===We()})}function E(p,T){if(p.status==="Completed")return!1;const I=p.completionDateStr||p.dateStr||(p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):"");return I?I<T:!1}function j(p,T){const I=p.length,a=p.filter(R=>R.status==="Completed").length,o=p.filter(R=>R.status==="In Progress").length,_=p.filter(R=>R.status==="Pending"||R.status==="Todo").length,D=p.filter(R=>E(R,T)).length,$=I>0?Math.round(a/I*100):0;return{total:I,completed:a,inProgress:o,pending:_,overdue:D,percent:$}}function N(){const p=We(),T=n.selectedDate===p,I=S(n.selectedDate),a=j(I,p);i.innerHTML=`
      <div class="ci360-planner-wrap ${l.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${Xe(n.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${h(l.displayName||"Daily Planner")}</h1>
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
            <button type="button" class="ci360-btn-primary ${n.selectedDate<p?"is-locked-past":""}" id="btnOpenAddTaskModal" title="${n.selectedDate<p?"Cannot add tasks on previous dates (switch to today or later)":"Add Task"}">
              ${n.selectedDate<p?`
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Add Task (Past Date)</span>
              `:`
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Add Task</span>
              `}
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
              <span class="date-text" id="displayDateLabel">${At(n.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${n.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${T?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${c?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${n.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${n.personnelList.map(o=>`
                  <option value="${o._id}" ${n.selectedPersonnelId===String(o._id)?"selected":""}>
                    ${h(o.name)} (${h(o.department||o.role||"Team")})
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
          ${ge(I,a)}
        </main>

      </div>
    `,nt(),Fe()}function ge(p,T){return n.viewMode==="weekly"?rt():n.viewMode==="report"?St():ye(p,T)}function ye(p,T){const I=We(),a=n.selectedDate<I;let o=p;if(n.filterStatus==="pending"?o=o.filter($=>$.status==="Pending"||$.status==="Todo"):n.filterStatus==="in_progress"?o=o.filter($=>$.status==="In Progress"):n.filterStatus==="completed"?o=o.filter($=>$.status==="Completed"):n.filterStatus==="overdue"&&(o=o.filter($=>E($,I))),n.searchQuery){const $=n.searchQuery.toLowerCase().trim();o=o.filter(R=>{const A=(R.title||"").toLowerCase(),U=(R.description||"").toLowerCase(),G=(R.category||"").toLowerCase(),v=(R.personnelId?.name||R.userId?.name||"").toLowerCase(),M=(R.createdByName||R.createdBy?.name||(R.createdBy?.email?R.createdBy.email.split("@")[0]:"")).toLowerCase();return A.includes($)||U.includes($)||G.includes($)||v.includes($)||M.includes($)})}o.sort(($,R)=>{if($.status==="Completed"&&R.status!=="Completed")return 1;if($.status!=="Completed"&&R.status==="Completed")return-1;const A={Urgent:0,High:1,Medium:2,Low:3};return(A[$.priority]||2)-(A[R.priority]||2)});const _=new Map;o.forEach($=>{let R="unassigned",A="Unassigned / Team",U="",G="";$.personnelId&&typeof $.personnelId=="object"&&$.personnelId._id?(R=String($.personnelId._id),A=$.personnelId.name||"Team Member",G=$.personnelId.role||"Personnel",U=$.personnelId.department||""):$.userId&&typeof $.userId=="object"&&$.userId._id?(R=String($.userId._id),A=$.userId.name||"User",G=$.userId.role||"Member"):($.createdByName||$.createdBy&&$.createdBy.name)&&(A=$.createdByName||$.createdBy.name,R="creator_"+A.toLowerCase().replace(/[^a-z0-9]/g,"_"),G="Creator"),_.has(R)||_.set(R,{key:R,name:A,department:U,role:G,tasks:[]}),_.get(R).tasks.push($)});const D=Array.from(_.values()).sort(($,R)=>$.key==="unassigned"?1:R.key==="unassigned"?-1:$.name.localeCompare(R.name));return`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              ${a?"Focus Archive":"Today's Focus"}
            </h2>
            <span class="ci360-task-count-badge">${o.length} ${o.length===1?"task":"tasks"}</span>
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${n.filterStatus==="all"?"active":""}" data-f="all">All (${T.total})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${T.pending})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${T.inProgress})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${T.completed})</button>
              ${T.overdue>0?`
                <button type="button" class="filter-pill overdue ${n.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${T.overdue})</button>
              `:""}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${c?`
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${n.groupByEmployee?"active":""}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${n.groupByEmployee?"By Employee":"Flat List"}
                </button>
                ${n.groupByEmployee&&D.length>0?`
                  <button type="button" class="filter-pill" id="btnExpandAllEmp" title="Expand all employee tasks">⊞ Expand</button>
                  <button type="button" class="filter-pill" id="btnCollapseAllEmp" title="Collapse all employee tasks">⊟ Collapse</button>
                `:""}
              </div>
            `:""}

            <!-- Search Bar with employee search support -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks, category or employee..." value="${h(n.searchQuery)}">
              ${n.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card (Only for Today or Future Dates) / Past Date Banner -->
        ${a?`
          <div class="ci360-past-date-banner">
            <div class="past-banner-icon">🔒</div>
            <div class="past-banner-body">
              <div class="past-banner-title">Previous Date (${Xe(n.selectedDate)})</div>
              <div class="past-banner-desc">
                Adding new tasks on previous dates is restricted. You can edit existing tasks, adjust completion dates, or mark tasks as completed.
              </div>
            </div>
          </div>
        `:`
          <div class="ci360-quick-add-bar">
            <div class="ci360-quick-add-input-wrap">
              <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${Xe(n.selectedDate)}... (Press Enter to save)">
            </div>

            <div class="ci360-quick-add-meta">
              <div class="ci360-quick-date-group" title="Completion Date (defaults to that day if left blank)" style="display:inline-flex;align-items:center;gap:4px;">
                <span style="font-size:11.5px;color:var(--text-3);font-weight:600;">Due:</span>
                <input type="date" id="quickAddCompletionDate" class="ci360-quick-select" value="${n.selectedDate}" min="${I}" title="Completion Date (defaults to that day if left blank)">
              </div>

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

              ${c?`
                <select id="quickAddAssignee" class="ci360-quick-select" title="Assign To Employee" style="max-width:140px;">
                  <option value="" ${n.selectedPersonnelId==="all"?"selected":""}>👤 Myself</option>
                  <option value="all">👥 All Team</option>
                  ${n.personnelList.map($=>`
                    <option value="${$._id}" ${n.selectedPersonnelId===String($._id)?"selected":""}>👤 ${h($.name)}</option>
                  `).join("")}
                </select>
              `:""}

              <button type="button" class="ci360-quick-add-btn" id="btnQuickAddSubmit">
                <span>+ Add</span>
              </button>
            </div>
          </div>
        `}

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${o.length===0?Ve(a):c&&n.groupByEmployee?`
              <div class="ci360-emp-groups-container">
                ${D.map($=>{const R=!!n.collapsedEmployees[$.key],A=$.tasks.filter(M=>M.status==="Completed").length,U=$.tasks.filter(M=>M.status==="In Progress").length,G=$.tasks.filter(M=>M.status==="Pending"||M.status==="Todo").length,v=$.tasks.length>0?Math.round(A/$.tasks.length*100):0;return`
                    <div class="ci360-emp-group-card ${R?"is-collapsed":""}" data-emp-key="${$.key}">
                      <div class="ci360-emp-group-header" data-action="toggle-emp-group" data-emp-key="${$.key}" role="button" tabindex="0">
                        <div class="emp-group-left">
                          <span class="emp-collapse-icon">${R?"▶":"▼"}</span>
                          <div class="emp-avatar">${h(($.name||"U").charAt(0).toUpperCase())}</div>
                          <div class="emp-info">
                            <span class="emp-name">${h($.name)}</span>
                            ${$.department||$.role?`<span class="emp-subtitle">${h($.department?$.department+" · "+$.role:$.role)}</span>`:""}
                          </div>
                        </div>

                        <div class="emp-group-right">
                          <span class="emp-stat-pill total">${$.tasks.length} ${$.tasks.length===1?"task":"tasks"}</span>
                          <span class="emp-stat-pill done">${A} done</span>
                          ${U>0?`<span class="emp-stat-pill in-prog">${U} in progress</span>`:""}
                          ${G>0?`<span class="emp-stat-pill pending">${G} pending</span>`:""}
                          <div class="emp-mini-bar-wrap" title="${v}% completed">
                            <div class="emp-mini-bar-fill" style="width:${v}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${R?"":`
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${$.tasks.map(M=>tt(M,I)).join("")}
                          </div>
                        </div>
                      `}
                    </div>
                  `}).join("")}
              </div>
            `:`
              <div class="ci360-task-list">
                ${o.map($=>tt($,I)).join("")}
              </div>
            `}
        </div>

      </div>
    `}function Ve(p=!1){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">${p?"📜":"✨"}</div>
        <h3>No tasks found for ${Xe(n.selectedDate)}</h3>
        <p>${p?"No scheduled tasks were recorded on this past date.":"Your schedule is clean and ready. Add your first priority task above or import your daily agenda."}</p>
        ${p?"":`
          <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
            <button type="button" class="ci360-btn-primary" onclick="document.getElementById('quickAddTitleInp')?.focus()">
              + Quick Add Task
            </button>
            <button type="button" class="ci360-btn-secondary" id="btnEmptyStateImport">
              📥 Import List
            </button>
          </div>
        `}
      </div>
    `}function tt(p,T){const I=p.status==="Completed",a=E(p,T),o=p.completionDateStr||p.dateStr||(p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):T),_=`pri-${(p.priority||"medium").toLowerCase()}`,D=`status-${(p.status||"pending").toLowerCase().replace(/\s+/g,"-")}`,$=p.createdByName||p.createdBy?.name||(p.createdBy?.email?p.createdBy.email.split("@")[0]:"")||p.personnelId?.name||p.userId?.name||"";return`
      <div class="ci360-task-card ${I?"is-completed":""} ${a?"is-overdue":""}" data-id="${p._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${I?"checked":""}" data-action="toggle" data-id="${p._id}" title="${I?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${h(p.title)}</span>
          </div>

          ${p.description?`
            <div class="ci360-task-desc">${h(p.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${_}">
              <span class="badge-dot"></span>
              ${h(p.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${D}">
              ${h(p.status||"Pending")}
            </span>

            <!-- Completion Date Badge (Always Visible & Prominent) -->
            <span class="ci360-badge completion-badge" title="Target Completion Date: ${o}">
              📅 Due: ${Xe(o)}
            </span>

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${p.rescheduledFrom&&p.rescheduledFrom!==o?`
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${Xe(p.rescheduledFrom)} to ${Xe(o)} (${p.dateChangeCount||1} change${(p.dateChangeCount||1)>1?"s":""})">
                🔄 Date Changed: ${Xe(p.rescheduledFrom)} ➔ ${Xe(o)}
              </span>
            `:""}

            <!-- Added By Badge (Shows Who Created the Task) -->
            ${$?`
              <span class="ci360-badge creator-badge" title="Created / Added by: ${h($)}">
                ✍️ Added by: ${h($)}
              </span>
            `:""}

            <!-- Category -->
            ${p.category?`
              <span class="ci360-badge category-badge">
                #${h(p.category)}
              </span>
            `:""}

            <!-- Time Display -->
            ${p.startTime||p.dueTime?`
              <span class="ci360-badge time-badge">
                🕒 ${p.startTime?h(p.startTime):""}
                   ${p.startTime&&p.dueTime?"–":""}
                   ${p.dueTime?h(p.dueTime):""}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${a?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name (if different from addedByName) -->
            ${c&&(p.personnelId?.name||p.userId?.name)&&(p.personnelId?.name||p.userId?.name)!==$?`
              <span class="ci360-badge personnel-badge" title="Assigned Employee">
                👤 Assigned: ${h(p.personnelId?.name||p.userId?.name)}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu: Previous tasks can be edited, deleted, changed by all -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${p._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${p._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function rt(){const p=aa(n.selectedDate,l.weekStartsOn),T=Xe(p[0]),I=Xe(p[6]),a=We();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${T} – ${I}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${p.map(o=>{const _=o===a,D=o===n.selectedDate,$=S(o),R=j($,a);return`
              <div class="ci360-day-column ${_?"is-today":""} ${D?"is-selected":""}" data-date="${o}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${o}">
                  <div class="day-name">${ma(o)}</div>
                  <div class="day-number">${new Date(o+"T00:00:00").getDate()}</div>
                  ${_?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${R.completed}/${R.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${R.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${$.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:$.map(A=>`
                    <div class="ci360-mini-task-card ${A.status==="Completed"?"done":""}" data-id="${A._id}">
                      <button type="button" class="mini-check ${A.status==="Completed"?"checked":""}" data-action="toggle" data-id="${A._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${A._id}">
                        <div class="mini-title">${h(A.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(A.priority||"medium").toLowerCase()}">${A.priority||"Med"}</span>
                          ${A.dueTime?`<span class="mini-time">${h(A.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button (Locked on past dates) -->
                ${o<a?`
                  <div class="day-col-locked-note" title="Cannot add tasks on previous dates">
                    <span>🔒 Past Date</span>
                  </div>
                `:`
                  <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${o}">
                    + Add Task
                  </button>
                `}

              </div>
            `}).join("")}
        </div>

      </div>
    `}function St(){const p=aa(n.selectedDate,l.weekStartsOn),T=At(p[0]),I=At(p[6]),a=We(),o=n.tasks.filter(U=>{if(U.isDeleted===!0)return!1;const G=U.dateStr||(U.dueDate?new Date(U.dueDate).toISOString().slice(0,10):"");return p.includes(G)}),_=o.length,D=o.filter(U=>U.status==="Completed").length,$=o.filter(U=>U.status==="In Progress").length,R=_>0?Math.round(D/_*100):0,A={Urgent:0,High:0,Medium:0,Low:0};return o.forEach(U=>{const G=U.priority||"Medium";A[G]!==void 0&&A[G]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${T} – ${I}</div>
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
            <span class="value" style="font-size:28px">${_}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${D}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${$}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${R}%</span>
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
                ${p.map(U=>{const G=S(U),v=j(G,a);return`
                    <tr>
                      <td><strong>${ma(U)}</strong></td>
                      <td>${Xe(U)}</td>
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
              <div style="font-size:22px;font-weight:700">${A.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${A.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${A.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${A.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function nt(){const p=document.getElementById("btnViewDaily"),T=document.getElementById("btnViewWeekly"),I=document.getElementById("btnViewReport");p&&(p.onclick=()=>{n.viewMode="daily",N()}),T&&(T.onclick=()=>{n.viewMode="weekly",N()}),I&&(I.onclick=()=>{n.viewMode="report",N()});const a=document.getElementById("btnPrevDay"),o=document.getElementById("btnNextDay"),_=document.getElementById("btnJumpToday"),D=document.getElementById("hiddenDateInput"),$=document.getElementById("datePickerBadge");a&&(a.onclick=()=>{n.selectedDate=Wt(n.selectedDate,-1),N()}),o&&(o.onclick=()=>{n.selectedDate=Wt(n.selectedDate,1),N()}),_&&(_.onclick=()=>{n.selectedDate=We(),N()}),$&&D&&($.onclick=()=>{try{typeof D.showPicker=="function"?D.showPicker():D.focus()}catch{D.focus()}},D.onchange=Q=>{Q.target.value&&(n.selectedDate=Q.target.value,N())});const R=document.getElementById("admTeamSelect");R&&(R.onchange=Q=>{n.selectedPersonnelId=Q.target.value,N()});const A=document.getElementById("btnOpenAddTaskModal");A&&(A.onclick=()=>{if(n.selectedDate<We()){y("Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.",!0);return}Oe()});const U=document.getElementById("btnPlannerActionsMenu"),G=document.getElementById("plannerActionsDropdown");U&&G&&(U.onclick=Q=>{Q.stopPropagation(),G.classList.toggle("hidden")},document.addEventListener("click",Q=>{!G.contains(Q.target)&&Q.target!==U&&G.classList.add("hidden")}));const v=document.getElementById("btnActionImport");v&&(v.onclick=()=>{G?.classList.add("hidden"),ct()});const M=document.getElementById("btnActionExportPng");M&&(M.onclick=()=>{G?.classList.add("hidden"),Me()});const X=document.getElementById("btnActionExportPdf");X&&(X.onclick=()=>{G?.classList.add("hidden"),ce()});const ee=document.getElementById("btnActionBackup");ee&&(ee.onclick=()=>{G?.classList.add("hidden"),st()});const te=document.getElementById("btnActionSettings");te&&(te.onclick=()=>{G?.classList.add("hidden"),ve()})}function Fe(p){if(n.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(M=>{M.onclick=()=>{n.filterStatus=M.dataset.f,N()}});const T=document.getElementById("plannerTaskSearchInp");T&&(T.oninput=M=>{n.searchQuery=M.target.value,N()});const I=document.getElementById("btnClearSearch");I&&(I.onclick=()=>{n.searchQuery="",N()});const a=document.getElementById("quickAddTitleInp"),o=document.getElementById("quickAddCompletionDate"),_=document.getElementById("quickAddPriority"),D=document.getElementById("quickAddCategory"),$=document.getElementById("btnQuickAddSubmit"),R=async()=>{const M=We();if(n.selectedDate<M){y("Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.",!0);return}const X=(a?.value||"").trim();if(!X){y("Please enter a task title",!0),a?.focus();return}const ee=(o?.value||"").trim()||n.selectedDate;if(ee<M){y("Cannot set completion date on a previous date.",!0);return}try{const te={title:X,dateStr:ee,completionDate:ee,completionDateStr:ee,dueDate:ee,priority:_?.value||l.defaultPriority,category:D?.value||"General",status:"Pending"};if(c){const u=document.getElementById("quickAddAssignee")?.value;u==="all"?(te.assignAll=!0,te.personnelId="all"):u?te.personnelId=u:n.selectedPersonnelId!=="all"&&(te.personnelId=n.selectedPersonnelId)}const Q=await Ce("/tasks",te);n.tasks.unshift(Q),y("Task added to today's focus! ✨"),a&&(a.value="",a.focus()),N()}catch(te){y(te.message,!0)}};$&&($.onclick=R),a&&(a.onkeydown=M=>{M.key==="Enter"&&R()}),document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(M=>{M.onclick=()=>{const X=M.dataset.empKey;n.collapsedEmployees[X]=!n.collapsedEmployees[X],N()}});const A=document.getElementById("btnToggleEmpGrouping");A&&(A.onclick=()=>{n.groupByEmployee=!n.groupByEmployee,N()});const U=document.getElementById("btnExpandAllEmp");U&&(U.onclick=()=>{n.collapsedEmployees={},N()});const G=document.getElementById("btnCollapseAllEmp");G&&(G.onclick=()=>{document.querySelectorAll(".ci360-emp-group-card").forEach(M=>{const X=M.dataset.empKey;X&&(n.collapsedEmployees[X]=!0)}),N()});const v=document.getElementById("btnEmptyStateImport");v&&(v.onclick=()=>ct())}if(n.viewMode==="weekly"){const T=document.getElementById("btnPrevWeek"),I=document.getElementById("btnNextWeek"),a=document.getElementById("btnThisWeek");T&&(T.onclick=()=>{n.selectedDate=Wt(n.selectedDate,-7),N()}),I&&(I.onclick=()=>{n.selectedDate=Wt(n.selectedDate,7),N()}),a&&(a.onclick=()=>{n.selectedDate=We(),N()}),document.querySelectorAll(".day-col-header").forEach(o=>{o.onclick=()=>{n.selectedDate=o.dataset.date,n.viewMode="daily",N()}}),document.querySelectorAll('[data-action="add-day"]').forEach(o=>{o.onclick=()=>{Oe(null,o.dataset.date)}})}if(n.viewMode==="report"){const T=document.getElementById("btnDownloadWeeklyPdf");T&&(T.onclick=ce)}i.querySelectorAll('[data-action="toggle"]').forEach(T=>{T.onclick=async I=>{I.stopPropagation();const a=T.dataset.id;await ot(a)}}),i.querySelectorAll('[data-action="edit"]').forEach(T=>{T.onclick=I=>{I.stopPropagation();const a=T.dataset.id,o=n.tasks.find(_=>_._id===a);o&&Oe(o)}}),i.querySelectorAll('[data-action="delete"]').forEach(T=>{T.onclick=async I=>{I.stopPropagation();const a=T.dataset.id;await ut(a)}})}async function ot(p){const T=n.tasks.find(a=>a._id===p);if(!T)return;const I=T.status!=="Completed";try{const a=await Ze(`/tasks/${p}/toggle`,{}),o=n.tasks.findIndex(_=>_._id===p);o!==-1&&(n.tasks[o]=a),I?(l.soundEnabled&&Aa(),y("Task marked as completed! 🎉")):y("Task reopened as pending."),N()}catch(a){y(a.message,!0)}}async function ut(p){const T=n.tasks.find(I=>I._id===p);if(T&&confirm(`Are you sure you want to remove "${T.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await et(`/tasks/${p}`),n.tasks=n.tasks.filter(I=>I._id!==p),y("Task removed from planner (safely stored in database archive)"),N()}catch(I){y(I.message,!0)}}function Oe(p=null,T=null){const I=!!p,a=We(),o=p?p.completionDateStr||p.dateStr||(p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):n.selectedDate):T&&T>=a?T:n.selectedDate>=a?n.selectedDate:a,_=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${I?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${h(p?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${h(p?.description||"")}</textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${o}" ${I?"":`min="${a}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${p?.completionDateStr||p?.dateStr||""}" ${I?"":`min="${a}"`} placeholder="Defaults to that day">
              <small style="color:var(--text-3);font-size:11px;">If left blank, will default to that day (${o})</small>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${p?.startTime||""}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${p?.dueTime||""}">
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${p?.priority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!p&&l.defaultPriority==="Medium"||p?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!p&&l.defaultPriority==="High"||p?.priority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${p?.priority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${p?.status==="Pending"||p?.status==="Todo"||!p?"selected":""}>Pending</option>
                <option value="In Progress" ${p?.status==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${p?.status==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${h(p?.category||"General")}">
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
          ${c?`
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="me" ${!p||!p?.personnelId&&!p?.assignAll?"selected":""}>Myself (Admin)</option>
                <option value="all" ${p?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${n.personnelList.map(v=>{const M=p?.personnelId?._id===v._id||p?.personnelId===v._id;return`<option value="${v._id}" ${M?"selected":""}>👤 ${h(v.name)} (${h(v.department||v.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${I?`
                <button type="button" class="btn danger small" id="btnModalDeleteTask" style="padding:6px 12px;background:#ef4444;color:#fff;border-radius:var(--r-sm);border:none;cursor:pointer;font-weight:700;font-size:12px;">🗑️ Delete Task</button>
              `:""}
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
              <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
                ${I?"Save Changes":"Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    `,D=Gt(_),$=D.querySelector("#taskForm"),R=D.querySelector("#btnModalClose"),A=D.querySelector("#btnCancelModal"),U=D.querySelector("#btnModalDeleteTask"),G=()=>D.remove();R&&(R.onclick=G),A&&(A.onclick=G),U&&p&&(U.onclick=async()=>{G(),await ut(p._id)}),$.onsubmit=async v=>{v.preventDefault();const M=D.querySelector("#taskTitle").value.trim(),X=D.querySelector("#taskDesc").value.trim(),ee=D.querySelector("#taskDate").value||o,Q=D.querySelector("#taskCompletionDate")?.value?.trim()||ee||n.selectedDate,u=D.querySelector("#taskStartTime").value.trim(),m=D.querySelector("#taskDueTime").value.trim(),s=D.querySelector("#taskPriority").value,r=D.querySelector("#taskStatus").value,x=D.querySelector("#taskCategory").value.trim()||"General";if(!M){y("Task title is required",!0);return}if(!I&&(Q<a||ee<a)){y("Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.",!0);return}const B={title:M,description:X,dateStr:Q,completionDate:Q,completionDateStr:Q,dueDate:Q,startTime:u,dueTime:m,priority:s,status:r,category:x};if(c){const O=D.querySelector("#taskAssignee")?.value;O==="all"?(B.assignAll=!0,B.personnelId="all"):O==="me"?B.personnelId="me":O&&(B.personnelId=O)}const C=D.querySelector("#btnSaveTask");C.disabled=!0,C.textContent="Saving...";try{if(I){const O=await Yt(`/tasks/${p._id}`,B),ne=n.tasks.findIndex(F=>F._id===p._id);ne!==-1&&(n.tasks[ne]=O),y("Task updated successfully! ✍️")}else{const O=await Ce("/tasks",B);Array.isArray(O.tasks)?O.tasks.forEach(ne=>n.tasks.unshift(ne)):n.tasks.unshift(O),y("Task created successfully! ✨")}G(),N()}catch(O){y(O.message,!0),C.disabled=!1,C.textContent=I?"Save Changes":"Create Task"}}}function ct(){let p=[];const T=`
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
              <input type="date" id="importTargetDate" class="input" value="${n.selectedDate<We()?We():n.selectedDate}" min="${We()}">
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
    `,I=Gt(T),a=()=>I.remove();I.querySelector("#btnImportClose").onclick=a,I.querySelector("#btnCancelImport").onclick=a;const o=I.querySelector("#importTextarea"),_=I.querySelector("#importFileInput"),D=I.querySelector("#importDropzone"),$=I.querySelector("#previewListArea"),R=I.querySelector("#previewCountLabel"),A=I.querySelector("#btnConfirmImport"),U=I.querySelector("#importFileInfo");function G(M){if(!M)return[];const X=M.split(/\r?\n/),ee=[];for(let te of X)te=te.trim(),te&&(te=te.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),te=te.replace(/^[-*•]\s+/,""),te=te.replace(/^\d+[\.\)]\s+/,""),te=te.trim(),te&&ee.push(te));return ee}function v(){const M=o.value,X=G(M),ee=I.querySelector("#importTargetDate").value,te=S(ee),Q=new Set(te.map(u=>(u.title||"").trim().toLowerCase()));p=[];for(const u of X){const m=Q.has(u.toLowerCase());p.push({title:u,isDuplicate:m})}if(R.textContent=`Preview (${p.length} ${p.length===1?"task":"tasks"} found)`,A.disabled=p.length===0,A.textContent=`Import ${p.length} ${p.length===1?"Task":"Tasks"}`,p.length===0){$.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}$.innerHTML=p.map((u,m)=>`
        <div class="preview-item ${u.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${m+1}.</span>
          <span class="preview-title">${h(u.title)}</span>
          ${u.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}o.oninput=v,D.onclick=()=>_.click(),_.onchange=M=>{const X=M.target.files[0];if(!X)return;U.textContent=`File selected: ${X.name} (${Math.round(X.size/1024)} KB)`;const ee=new FileReader;ee.onload=te=>{o.value=te.target.result,v()},ee.readAsText(X)},D.ondragover=M=>{M.preventDefault(),D.classList.add("dragover")},D.ondragleave=()=>D.classList.remove("dragover"),D.ondrop=M=>{M.preventDefault(),D.classList.remove("dragover");const X=M.dataTransfer.files[0];if(X&&(X.type==="text/plain"||X.name.endsWith(".txt"))){U.textContent=`File dropped: ${X.name}`;const ee=new FileReader;ee.onload=te=>{o.value=te.target.result,v()},ee.readAsText(X)}else y("Please drop a valid .txt plain-text file",!0)},A.onclick=async()=>{if(p.length===0)return;A.disabled=!0,A.textContent="Importing...";const M=I.querySelector("#importTargetDate").value;if(M<We()){y("Cannot import tasks for previous dates. Target date must be today or later.",!0),A.disabled=!1,A.textContent=`Import ${p.length} ${p.length===1?"Task":"Tasks"}`;return}const X=I.querySelector("#importPriority").value,ee=I.querySelector("#importCategory").value.trim()||"General",te={date:M,tasks:p.map(Q=>({title:Q.title,priority:X,category:ee,status:"Pending"}))};c&&n.selectedPersonnelId!=="all"&&(te.personnelId=n.selectedPersonnelId);try{const Q=await Ce("/tasks/bulk-import",te);Array.isArray(Q.tasks)&&Q.tasks.forEach(u=>n.tasks.unshift(u)),y(`Imported ${Q.importedCount} tasks successfully! (${Q.skippedCount} skipped duplicates)`),a(),n.selectedDate=M,N()}catch(Q){y(Q.message,!0),A.disabled=!1,A.textContent="Retry Import"}}}async function Me(){const p=S(n.selectedDate),T=j(p,We()),I=At(n.selectedDate),a=2,o=800,_=160,D=90,$=74,R=70,A=Math.max(120,p.length*$),U=_+D+A+R,G=document.createElement("canvas");G.width=o*a,G.height=U*a;const v=G.getContext("2d");v.scale(a,a);const M=document.documentElement.getAttribute("data-theme")==="dark",X=M?"#0F172A":"#F8FAFC",ee=M?"#1E293B":"#FFFFFF",te=M?"#334155":"#E2E8F0",Q=M?"#F8FAFC":"#0F172A",u=M?"#94A3B8":"#475569",m="#4F46E5",s="#10B981",r="#F59E0B";v.fillStyle=X,v.fillRect(0,0,o,U),v.fillStyle=ee,ze(v,24,20,o-48,_-30,16),v.fill(),v.strokeStyle=te,v.lineWidth=1,v.stroke(),v.fillStyle=m,v.font="bold 12px Inter, sans-serif",v.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),v.fillStyle=Q,v.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',v.fillText(I,44,86),v.fillStyle=u,v.font="13px Inter, sans-serif",v.fillText(`Planned focus list · ${T.completed} of ${T.total} tasks completed (${T.percent}%)`,44,114);const x=_+6;v.fillStyle=ee,ze(v,24,x,o-48,D-16,12),v.fill(),v.stroke();const B=[{label:"TOTAL TASKS",val:String(T.total),color:Q},{label:"COMPLETED",val:String(T.completed),color:s},{label:"IN PROGRESS",val:String(T.inProgress),color:r},{label:"PENDING",val:String(T.pending),color:u},{label:"PROGRESS",val:`${T.percent}%`,color:m}],C=(o-48)/B.length;B.forEach((F,q)=>{const Y=24+q*C+20;v.fillStyle=F.color,v.font="bold 20px Inter, sans-serif",v.fillText(F.val,Y,x+36),v.fillStyle=u,v.font="10px Inter, sans-serif",v.fillText(F.label,Y,x+54)});const O=x+D;v.fillStyle=ee,ze(v,24,O,o-48,A+10,16),v.fill(),v.stroke(),p.length===0?(v.fillStyle=u,v.font="14px Inter, sans-serif",v.textAlign="center",v.fillText("No scheduled tasks recorded for this date.",o/2,O+60),v.textAlign="left"):p.forEach((F,q)=>{const Y=O+16+q*$,_e=F.status==="Completed";v.beginPath(),v.arc(48,Y+14,10,0,Math.PI*2),_e?(v.fillStyle=s,v.fill(),v.strokeStyle="#FFFFFF",v.lineWidth=2,v.beginPath(),v.moveTo(44,Y+14),v.lineTo(47,Y+17),v.lineTo(52,Y+11),v.stroke()):(v.strokeStyle=te,v.lineWidth=2,v.stroke()),v.fillStyle=_e?u:Q,v.font=`${_e?"normal":"500"} 14px Inter, sans-serif`;const me=F.title.length>55?F.title.slice(0,52)+"...":F.title;if(v.fillText(me,70,Y+18),_e){const De=v.measureText(me);v.strokeStyle=u,v.lineWidth=1.2,v.beginPath(),v.moveTo(70,Y+14),v.lineTo(70+De.width,Y+14),v.stroke()}const le=F.priority||"Medium";let ue="#E2E8F0",K="#334155";le==="Urgent"?(ue="#FEE2E2",K="#DC2626"):le==="High"?(ue="#FEF3C7",K="#D97706"):le==="Low"&&(ue="#ECFDF5",K="#059669"),v.fillStyle=ue,ze(v,o-150,Y+4,60,20,10),v.fill(),v.fillStyle=K,v.font="bold 10px Inter, sans-serif",v.fillText(le,o-138,Y+18);const re=F.createdByName||F.createdBy?.name||(F.createdBy?.email?F.createdBy.email.split("@")[0]:"")||F.personnelId?.name||F.userId?.name||"Member",be=F.completionDateStr||F.dateStr||"",de=[];de.push(`✍️ Added by: ${re}`),be&&de.push(`📅 Due: ${Xe(be)}`),F.dueTime&&de.push(`🕒 ${F.dueTime}`),F.category&&F.category!=="General"&&de.push(`#${F.category}`);const he=de.join("   ·   ");v.fillStyle=u,v.font="11px Inter, sans-serif",v.fillText(he,70,Y+36),q<p.length-1&&(v.strokeStyle=te,v.lineWidth=.6,v.beginPath(),v.moveTo(40,Y+54),v.lineTo(o-40,Y+54),v.stroke())});const ne=U-35;v.fillStyle=u,v.font="11px Inter, sans-serif",v.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,ne);try{const F=G.toDataURL("image/png"),q=document.createElement("a");q.href=F,q.download=`ci360-daily-planner-${n.selectedDate}.png`,document.body.appendChild(q),q.click(),q.remove(),y("Daily Planner image exported! 🖼️")}catch(F){y("Failed to export image: "+F.message,!0)}}function ze(p,T,I,a,o,_){p.beginPath(),p.moveTo(T+_,I),p.lineTo(T+a-_,I),p.quadraticCurveTo(T+a,I,T+a,I+_),p.lineTo(T+a,I+o-_),p.quadraticCurveTo(T+a,I+o,T+a-_,I+o),p.lineTo(T+_,I+o),p.quadraticCurveTo(T,I+o,T,I+o-_),p.lineTo(T,I+_),p.quadraticCurveTo(T,I,T+_,I),p.closePath()}function ce(){const p=aa(n.selectedDate,l.weekStartsOn),T=At(p[0]),I=At(p[6]);We();const a=n.tasks.filter(A=>{if(A.isDeleted===!0)return!1;const U=A.dateStr||(A.dueDate?new Date(A.dueDate).toISOString().slice(0,10):"");return p.includes(U)}),o=a.length,_=a.filter(A=>A.status==="Completed").length,D=o>0?Math.round(_/o*100):0,$=window.open("","_blank");if(!$){y("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const R=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${T}</title>
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
            <div class="period">${T} – ${I}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${o}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${_}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${o-_}</div>
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
            ${p.map(A=>{const U=S(A);return U.length===0?`<tr><td><strong>${Xe(A)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:U.map(G=>`
                <tr>
                  <td><strong>${Xe(A)}</strong></td>
                  <td>${h(G.title)}</td>
                  <td><span class="badge badge-${(G.priority||"medium").toLowerCase().slice(0,3)}">${G.priority||"Medium"}</span></td>
                  <td>${h(G.category||"General")}</td>
                  <td>${G.dueTime||G.startTime||"—"}</td>
                  <td class="${G.status==="Completed"?"done":""}">${G.status||"Pending"}</td>
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
    `;$.document.write(R),$.document.close(),y("Weekly PDF report generated for printing! 📄")}function st(){const T=Gt(`
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
    `),I=()=>T.remove();T.querySelector("#btnBackupClose").onclick=I;const a=T.querySelector("#btnDownloadBackupJson");a.onclick=async()=>{a.disabled=!0,a.textContent="Generating backup...";try{const A=await Re("/tasks/backup"),U=new Blob([JSON.stringify(A,null,2)],{type:"application/json"}),G=URL.createObjectURL(U),v=document.createElement("a");v.href=G,v.download=`ci360-planner-backup-${We()}.json`,document.body.appendChild(v),v.click(),v.remove(),y("Planner backup downloaded successfully! 💾")}catch(A){y("Backup export failed: "+A.message,!0)}finally{a.disabled=!1,a.textContent="Download JSON Backup"}};const o=T.querySelector("#restoreFileInput"),_=T.querySelector("#restorePreviewArea"),D=T.querySelector("#restoreCountText"),$=T.querySelector("#btnExecuteRestore");let R=null;o.onchange=A=>{const U=A.target.files[0];if(!U)return;const G=new FileReader;G.onload=v=>{try{const M=JSON.parse(v.target.result),X=Array.isArray(M.tasks)?M.tasks:Array.isArray(M)?M:null;if(!X||X.length===0){y("Invalid backup file: No tasks found",!0);return}R=X,_.style.display="block",D.textContent=`Valid backup: ${X.length} tasks ready to restore.`,$.disabled=!1}catch(M){y("Error parsing JSON backup file: "+M.message,!0),_.style.display="none",$.disabled=!0}},G.readAsText(U)},$.onclick=async()=>{if(!R||R.length===0)return;$.disabled=!0,$.textContent="Restoring...";const A=T.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const U=await Ce("/tasks/restore",{tasks:R,mode:A});y(`Restored ${U.restoredCount} tasks! (${U.skippedCount} skipped) ✨`),I(),await z()}catch(U){y("Restore failed: "+U.message,!0),$.disabled=!1,$.textContent="Retry Restore"}}}function ve(){const p=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${h(l.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${l.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${l.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${h(l.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${l.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${l.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${l.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${l.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${l.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${l.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${l.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <!-- Desktop & Laptop Notifications -->
          <div class="form-group" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);">
            <div style="font-weight:600;font-size:13px;margin-bottom:4px;color:var(--text-1);">🔔 Desktop & Laptop Notifications (Brave & All Browsers)</div>
            <div style="font-size:12px;color:var(--text-3);margin-bottom:8px;">Receive real-time popups on your laptop and browser when tasks are assigned, dates change, and due alerts arrive.</div>
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setNotifEnabled" ${typeof window<"u"&&localStorage.getItem("ci360_notif_enabled")!=="false"&&typeof Notification<"u"&&Notification.permission==="granted"?"checked":""}>
              <span>Enable Browser & Laptop Notifications</span>
            </label>
            <div style="margin-top:8px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <button type="button" class="btn ghost small" id="btnPlannerTestNotif" style="padding:4px 10px;font-size:11.5px;">🔔 Send Test Notification</button>
              <span style="font-size:11px;color:var(--text-3);" id="plannerNotifStatusLabel">${typeof Notification<"u"&&Notification.permission==="granted"?"🟢 Active on this laptop":typeof Notification<"u"&&Notification.permission==="denied"?"🔴 Blocked in browser":"⚪ Ready to enable"}</span>
            </div>
            <div style="margin-top:6px;font-size:11px;color:var(--text-3);">
              💡 <strong>Brave, Chrome & Edge Tip:</strong> Notifications show in Windows Action Center. In Brave, ensure notifications are allowed under the site shield/lock icon in the URL bar.
            </div>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,T=Gt(p),I=()=>T.remove();T.querySelector("#btnSettingsClose").onclick=I,T.querySelector("#btnCancelSettings").onclick=I;const a=T.querySelector("#btnPlannerTestNotif");a&&(a.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await requestNotificationPermission()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):y("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true");const o=T.querySelector("#setNotifEnabled");o&&(o.checked=!0);const _=T.querySelector("#plannerNotifStatusLabel");_&&(_.textContent="🟢 Active on this laptop"),await triggerSystemNotification({title:"CI360 Planner Alert 🔔",message:"Laptop & browser notifications are active and ready!",id:"ci360-planner-test-"+Date.now()}),y("Test notification sent to your laptop/browser! 🔔")}),T.querySelector("#settingsForm").onsubmit=o=>{o.preventDefault(),l.displayName=T.querySelector("#setDisplayName").value.trim()||"Daily Planner",l.weekStartsOn=Number(T.querySelector("#setWeekStart").value),l.defaultPriority=T.querySelector("#setDefaultPriority").value,l.density=T.querySelector("#setDensity").value,l.soundEnabled=T.querySelector("#setSound").checked;const _=T.querySelector("#setNotifEnabled")?.checked;localStorage.setItem("ci360_notif_enabled",_?"true":"false"),_&&"Notification"in window&&Notification.permission==="default"&&requestNotificationPermission(),Ta(l),y("Planner preferences saved! ⚙️"),I(),N()}}}function Ea(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
    /* CI360 Dayfolio Planner Module Styles */
    .ci360-planner-wrap,
    .ci360-planner-wrap * {
      box-sizing: border-box !important;
    }

    .ci360-planner-wrap {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 0 60px !important;
      box-sizing: border-box !important;
      font-family: var(--font-sans);
      color: var(--text-1);
    }

    .ci360-planner-content,
    .ci360-today-focus-section,
    .ci360-tasks-container,
    .ci360-task-list,
    .ci360-quick-add-bar,
    .ci360-progress-summary-card,
    .ci360-planner-nav-strip,
    .ci360-planner-header {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
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
    .ci360-badge.completion-badge {
      background: rgba(37, 99, 235, 0.12);
      color: #2563EB;
      font-weight: 700;
      border: 1px solid rgba(37, 99, 235, 0.25);
    }
    [data-theme="dark"] .ci360-badge.completion-badge {
      background: rgba(59, 130, 246, 0.2);
      color: #93C5FD;
      border-color: rgba(59, 130, 246, 0.35);
    }
    .ci360-badge.creator-badge {
      background: rgba(99, 102, 241, 0.12);
      color: var(--brand-600);
      font-weight: 600;
      border: 1px solid rgba(99, 102, 241, 0.25);
    }
    [data-theme="dark"] .ci360-badge.creator-badge {
      background: rgba(99, 102, 241, 0.2);
      color: var(--brand-400);
      border-color: rgba(99, 102, 241, 0.35);
    }
    .ci360-badge.overdue-badge { background: rgba(239, 68, 68, 0.12); color: var(--red-600); }
    .ci360-badge.personnel-badge { background: var(--brand-50); color: var(--brand-600); }
    [data-theme="dark"] .ci360-badge.personnel-badge { background: rgba(99, 102, 241, 0.2); color: var(--brand-400); }

    .ci360-badge.date-changed-badge {
      background: rgba(245, 158, 11, 0.14);
      color: #D97706;
      font-weight: 700;
      border: 1px solid rgba(245, 158, 11, 0.35);
    }
    [data-theme="dark"] .ci360-badge.date-changed-badge {
      background: rgba(245, 158, 11, 0.22);
      color: #FBBF24;
      border-color: rgba(245, 158, 11, 0.45);
    }

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

    /* Past Date Banner */
    .ci360-past-date-banner {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      border-radius: var(--r-lg);
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.25);
      margin-bottom: 8px;
    }
    .past-banner-icon {
      font-size: 22px;
      flex-shrink: 0;
    }
    .past-banner-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .past-banner-title {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-1);
    }
    .past-banner-desc {
      font-size: 12.5px;
      color: var(--text-3);
      line-height: 1.4;
    }
    .day-col-locked-note {
      text-align: center;
      padding: 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-4);
      background: var(--bg-hover);
      border-radius: var(--r-sm);
      margin-top: 8px;
    }
    .ci360-btn-primary.is-locked-past {
      opacity: 0.75;
      background: var(--text-4);
      cursor: not-allowed;
    }

    /* Admin Employee Grouping & Collapsible Cards */
    .ci360-emp-groups-container {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .ci360-emp-group-card {
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      overflow: hidden;
      box-shadow: var(--shadow-xs);
      transition: all var(--t-fast);
    }
    .ci360-emp-group-card:hover {
      border-color: var(--border-md);
    }
    .ci360-emp-group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 18px;
      background: var(--bg-elevated);
      cursor: pointer;
      user-select: none;
      transition: background var(--t-fast);
    }
    .ci360-emp-group-header:hover {
      background: var(--bg-hover);
    }
    .emp-group-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
    }
    .emp-collapse-icon {
      font-size: 11px;
      color: var(--text-3);
      width: 14px;
      text-align: center;
      transition: transform var(--t-fast);
    }
    .emp-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(99, 102, 241, 0.15);
      color: var(--brand-500);
      font-weight: 800;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .emp-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .emp-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-1);
    }
    .emp-subtitle {
      font-size: 11.5px;
      color: var(--text-3);
    }
    .emp-group-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .emp-stat-pill {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--r-full);
      background: var(--bg-card);
      border: 1px solid var(--border-xs);
      color: var(--text-2);
    }
    .emp-stat-pill.done {
      color: var(--green-600);
      background: rgba(16, 185, 129, 0.1);
      border-color: rgba(16, 185, 129, 0.2);
    }
    .emp-stat-pill.in-prog {
      color: var(--amber-600);
      background: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.2);
    }
    .emp-stat-pill.pending {
      color: var(--text-3);
      background: var(--bg-hover);
    }
    .emp-mini-bar-wrap {
      width: 50px;
      height: 6px;
      border-radius: var(--r-full);
      background: var(--border-xs);
      overflow: hidden;
    }
    .emp-mini-bar-fill {
      height: 100%;
      background: var(--green-500);
      border-radius: var(--r-full);
      transition: width 0.3s ease;
    }
    .ci360-emp-group-body {
      padding: 12px 16px;
      border-top: 1px solid var(--border-xs);
    }

    /* ── COMPREHENSIVE LIGHT THEME ENHANCEMENTS FOR DAILY PLANNER ── */
    [data-theme="light"] .ci360-planner-wrap,
    html:not([data-theme="dark"]) .ci360-planner-wrap {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-planner-heading,
    html:not([data-theme="dark"]) .ci360-planner-heading {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-planner-subheading,
    html:not([data-theme="dark"]) .ci360-planner-subheading {
      color: #64748B;
    }
    [data-theme="light"] .ci360-view-switcher,
    html:not([data-theme="dark"]) .ci360-view-switcher {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .ci360-switch-btn,
    html:not([data-theme="dark"]) .ci360-switch-btn {
      color: #64748B;
    }
    [data-theme="light"] .ci360-switch-btn:hover,
    html:not([data-theme="dark"]) .ci360-switch-btn:hover {
      background: #F1F5F9;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-switch-btn.active,
    html:not([data-theme="dark"]) .ci360-switch-btn.active {
      background: #4F46E5;
      color: #FFFFFF;
    }
    [data-theme="light"] .ci360-btn-secondary,
    html:not([data-theme="dark"]) .ci360-btn-secondary {
      background: #FFFFFF;
      color: #334155;
      border-color: #CBD5E1;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-btn-secondary:hover,
    html:not([data-theme="dark"]) .ci360-btn-secondary:hover {
      background: #F8FAFC;
      color: #0F172A;
      border-color: #94A3B8;
    }
    [data-theme="light"] .ci360-dropdown-menu,
    html:not([data-theme="dark"]) .ci360-dropdown-menu {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
    }
    [data-theme="light"] .ci360-menu-item,
    html:not([data-theme="dark"]) .ci360-menu-item {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-menu-item:hover,
    html:not([data-theme="dark"]) .ci360-menu-item:hover {
      background: #F1F5F9;
    }
    [data-theme="light"] .ci360-menu-item .meta small,
    html:not([data-theme="dark"]) .ci360-menu-item .meta small {
      color: #64748B;
    }
    [data-theme="light"] .ci360-planner-nav-strip,
    html:not([data-theme="dark"]) .ci360-planner-nav-strip {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .ci360-nav-arrow,
    html:not([data-theme="dark"]) .ci360-nav-arrow {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #334155;
    }
    [data-theme="light"] .ci360-date-picker-badge,
    html:not([data-theme="dark"]) .ci360-date-picker-badge {
      background: #F8FAFC;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .ci360-date-picker-badge .date-text,
    html:not([data-theme="dark"]) .ci360-date-picker-badge .date-text {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-today-btn,
    html:not([data-theme="dark"]) .ci360-today-btn {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #475569;
    }
    [data-theme="light"] .ci360-today-btn.is-current,
    html:not([data-theme="dark"]) .ci360-today-btn.is-current {
      background: #EEF2FF;
      color: #4F46E5;
      border-color: #C7D2FE;
    }
    [data-theme="light"] .ci360-select-inline,
    html:not([data-theme="dark"]) .ci360-select-inline {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-progress-summary-card,
    html:not([data-theme="dark"]) .ci360-progress-summary-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .kpi-box,
    html:not([data-theme="dark"]) .kpi-box {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .kpi-box .kpi-num,
    html:not([data-theme="dark"]) .kpi-box .kpi-num {
      color: #0F172A;
    }
    [data-theme="light"] .kpi-box .kpi-label,
    html:not([data-theme="dark"]) .kpi-box .kpi-label {
      color: #64748B;
    }
    [data-theme="light"] .ring-num,
    html:not([data-theme="dark"]) .ring-num {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-circular-svg .circle-bg,
    html:not([data-theme="dark"]) .ci360-circular-svg .circle-bg {
      stroke: #E2E8F0;
    }
    [data-theme="light"] .ci360-focus-title,
    html:not([data-theme="dark"]) .ci360-focus-title {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-filter-pills,
    html:not([data-theme="dark"]) .ci360-filter-pills {
      background: #FFFFFF;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .filter-pill,
    html:not([data-theme="dark"]) .filter-pill {
      color: #64748B;
    }
    [data-theme="light"] .filter-pill:hover,
    html:not([data-theme="dark"]) .filter-pill:hover {
      background: #F1F5F9;
      color: #0F172A;
    }
    [data-theme="light"] .filter-pill.active,
    html:not([data-theme="dark"]) .filter-pill.active {
      background: #EEF2FF;
      color: #4F46E5;
    }
    [data-theme="light"] .ci360-search-box,
    html:not([data-theme="dark"]) .ci360-search-box {
      background: #FFFFFF;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .ci360-search-box input,
    html:not([data-theme="dark"]) .ci360-search-box input {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-search-box input::placeholder,
    html:not([data-theme="dark"]) .ci360-search-box input::placeholder {
      color: #94A3B8;
    }
    [data-theme="light"] .ci360-quick-add-bar,
    html:not([data-theme="dark"]) .ci360-quick-add-bar {
      background: #FFFFFF;
      border: 1.5px dashed #CBD5E1;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    [data-theme="light"] .ci360-quick-input,
    html:not([data-theme="dark"]) .ci360-quick-input {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-quick-input::placeholder,
    html:not([data-theme="dark"]) .ci360-quick-input::placeholder {
      color: #94A3B8;
    }
    [data-theme="light"] .ci360-quick-select,
    html:not([data-theme="dark"]) .ci360-quick-select {
      background: #F8FAFC;
      border-color: #CBD5E1;
      color: #334155;
    }
    [data-theme="light"] .ci360-task-card,
    html:not([data-theme="dark"]) .ci360-task-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-task-card:hover,
    html:not([data-theme="dark"]) .ci360-task-card:hover {
      border-color: #CBD5E1;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    [data-theme="light"] .ci360-task-card.is-completed,
    html:not([data-theme="dark"]) .ci360-task-card.is-completed {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-task-title,
    html:not([data-theme="dark"]) .ci360-task-title {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-task-desc,
    html:not([data-theme="dark"]) .ci360-task-desc {
      color: #475569;
    }
    [data-theme="light"] .ci360-task-check,
    html:not([data-theme="dark"]) .ci360-task-check {
      border-color: #CBD5E1;
    }
    [data-theme="light"] .task-action-btn,
    html:not([data-theme="dark"]) .task-action-btn {
      color: #64748B;
    }
    [data-theme="light"] .task-action-btn:hover,
    html:not([data-theme="dark"]) .task-action-btn:hover {
      background: #F1F5F9;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-past-date-banner,
    html:not([data-theme="dark"]) .ci360-past-date-banner {
      background: #FFFBEB;
      border-color: #FDE68A;
    }
    [data-theme="light"] .past-banner-title,
    html:not([data-theme="dark"]) .past-banner-title {
      color: #92400E;
    }
    [data-theme="light"] .past-banner-desc,
    html:not([data-theme="dark"]) .past-banner-desc {
      color: #B45309;
    }
    [data-theme="light"] .ci360-emp-group-card,
    html:not([data-theme="dark"]) .ci360-emp-group-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-emp-group-header,
    html:not([data-theme="dark"]) .ci360-emp-group-header {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-emp-group-header:hover,
    html:not([data-theme="dark"]) .ci360-emp-group-header:hover {
      background: #F1F5F9;
    }
    [data-theme="light"] .emp-avatar,
    html:not([data-theme="dark"]) .emp-avatar {
      background: #EEF2FF;
      color: #4F46E5;
      border: 1px solid #C7D2FE;
    }
    [data-theme="light"] .emp-name,
    html:not([data-theme="dark"]) .emp-name {
      color: #0F172A;
    }
    [data-theme="light"] .emp-subtitle,
    html:not([data-theme="dark"]) .emp-subtitle {
      color: #64748B;
    }
    [data-theme="light"] .emp-stat-pill,
    html:not([data-theme="dark"]) .emp-stat-pill {
      background: #FFFFFF;
      border-color: #E2E8F0;
      color: #475569;
    }
    [data-theme="light"] .ci360-day-column,
    html:not([data-theme="dark"]) .ci360-day-column {
      background: #FFFFFF;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .day-col-header .day-name,
    html:not([data-theme="dark"]) .day-col-header .day-name {
      color: #64748B;
    }
    [data-theme="light"] .day-col-header .day-number,
    html:not([data-theme="dark"]) .day-col-header .day-number {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-mini-task-card,
    html:not([data-theme="dark"]) .ci360-mini-task-card {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-mini-task-card:hover,
    html:not([data-theme="dark"]) .ci360-mini-task-card:hover {
      background: #FFFFFF;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .mini-title,
    html:not([data-theme="dark"]) .mini-title {
      color: #0F172A;
    }
    [data-theme="light"] .day-col-add-btn,
    html:not([data-theme="dark"]) .day-col-add-btn {
      border: 1px dashed #CBD5E1;
      color: #64748B;
    }
    [data-theme="light"] .day-col-add-btn:hover,
    html:not([data-theme="dark"]) .day-col-add-btn:hover {
      border-color: #4F46E5;
      color: #4F46E5;
      background: #EEF2FF;
    }
    [data-theme="light"] .ci360-planner-modal,
    html:not([data-theme="dark"]) .ci360-planner-modal {
      background: #FFFFFF;
      color: #0F172A;
      border: 1px solid #E2E8F0;
      box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    }
    [data-theme="light"] .ci360-modal-header h3,
    html:not([data-theme="dark"]) .ci360-modal-header h3 {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-modal-form label,
    html:not([data-theme="dark"]) .ci360-modal-form label {
      color: #334155;
    }
    [data-theme="light"] .ci360-modal-form .input,
    html:not([data-theme="dark"]) .ci360-modal-form .input {
      background: #FFFFFF;
      color: #0F172A;
      border: 1px solid #CBD5E1;
    }
    [data-theme="light"] .ci360-badge.creator-badge,
    html:not([data-theme="dark"]) .ci360-badge.creator-badge {
      background: #F5F3FF;
      color: #6D28D9;
      border-color: #DDD6FE;
    }
    [data-theme="light"] .ci360-badge.completion-badge,
    html:not([data-theme="dark"]) .ci360-badge.completion-badge {
      background: #EFF6FF;
      color: #1D4ED8;
      border-color: #BFDBFE;
    }
    [data-theme="light"] .ci360-badge.date-changed-badge,
    html:not([data-theme="dark"]) .ci360-badge.date-changed-badge {
      background: #FFFBEB;
      color: #B45309;
      border-color: #FDE68A;
    }
  `,document.head.appendChild(i)}function Ia(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function Da(i,t,e,d,b){const c={move:i,variations:b};return t&&(c.suffix=t),e&&(c.nag=e),d!==null&&(c.comment=d),c}function Pa(...i){const[t,...e]=i;let d=t;for(const b of e)b!==null&&(d.variations=[b,...b.variations],b.variations=[],d=b);return t}function Fa(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const d=e.variations[0];if(!d){e.comment=t.marker.comment;break}e=d}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function La(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function Et(i,t,e,d){var b=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(b,Et.prototype),b.expected=t,b.found=e,b.location=d,b.name="SyntaxError",b}La(Et,Error);function ia(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}Et.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,d;for(d=0;d<i.length;d++)if(i[d].source===this.location.source){e=i[d].text.split(/\r\n|\n|\r/g);break}var b=this.location.start,c=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(b):b,l=this.location.source+":"+c.line+":"+c.column;if(e){var n=this.location.end,z=ia("",c.line.toString().length," "),W=e[b.line-1],S=b.line===n.line?n.column:W.length+1,E=S-b.column||1;t+=`
 --> `+l+`
`+z+` |
`+c.line+" | "+W+`
`+z+" | "+ia("",b.column-1," ")+ia("",E,"^")}else t+=`
 at `+l}return t};Et.buildMessage=function(i,t){var e={literal:function(W){return'"'+b(W.text)+'"'},class:function(W){var S=W.parts.map(function(E){return Array.isArray(E)?c(E[0])+"-"+c(E[1]):c(E)});return"["+(W.inverted?"^":"")+S.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(W){return W.description}};function d(W){return W.charCodeAt(0).toString(16).toUpperCase()}function b(W){return W.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(S){return"\\x0"+d(S)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(S){return"\\x"+d(S)})}function c(W){return W.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(S){return"\\x0"+d(S)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(S){return"\\x"+d(S)})}function l(W){return e[W.type](W)}function n(W){var S=W.map(l),E,j;if(S.sort(),S.length>0){for(E=1,j=1;E<S.length;E++)S[E-1]!==S[E]&&(S[j]=S[E],j++);S.length=j}switch(S.length){case 1:return S[0];case 2:return S[0]+" or "+S[1];default:return S.slice(0,-1).join(", ")+", or "+S[S.length-1]}}function z(W){return W?'"'+b(W)+'"':"end of input"}return"Expected "+n(i)+" but "+z(t)+" found."};function qa(i,t){t=t!==void 0?t:{};var e={},d=t.grammarSource,b={pgn:Pt},c=Pt,l="[",n='"',z="]",W=".",S="O-O-O",E="O-O",j="0-0-0",N="0-0",ge="$",ye="{",Ve="}",tt=";",rt="(",St=")",nt="1-0",Fe="0-1",ot="1/2-1/2",ut="*",Oe=/^[a-zA-Z]/,ct=/^[^"]/,Me=/^[0-9]/,ze=/^[.]/,ce=/^[a-zA-Z1-8\-=]/,st=/^[+#]/,ve=/^[!?]/,p=/^[^}]/,T=/^[^\r\n]/,I=/^[ \t\r\n]/,a=Qe("tag pair"),o=qe("[",!1),_=qe('"',!1),D=qe("]",!1),$=Qe("tag name"),R=at([["a","z"],["A","Z"]],!1,!1),A=Qe("tag value"),U=at(['"'],!0,!1),G=Qe("move number"),v=at([["0","9"]],!1,!1),M=qe(".",!1),X=at(["."],!1,!1),ee=Qe("standard algebraic notation"),te=qe("O-O-O",!1),Q=qe("O-O",!1),u=qe("0-0-0",!1),m=qe("0-0",!1),s=at([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),r=at(["+","#"],!1,!1),x=Qe("suffix annotation"),B=at(["!","?"],!1,!1),C=Qe("NAG"),O=qe("$",!1),ne=Qe("brace comment"),F=qe("{",!1),q=at(["}"],!0,!1),Y=qe("}",!1),_e=Qe("rest of line comment"),me=qe(";",!1),le=at(["\r",`
`],!0,!1),ue=Qe("variation"),K=qe("(",!1),re=qe(")",!1),be=Qe("game termination marker"),de=qe("1-0",!1),he=qe("0-1",!1),De=qe("1/2-1/2",!1),Be=qe("*",!1),Ge=Qe("whitespace"),Le=at([" ","	","\r",`
`],!1,!1),pe=function(f,w){return Fa(f,w)},Ee=function(f){return Object.fromEntries(f)},Ue=function(f,w){return[f,w]},Ne=function(f,w){return{root:f,marker:w}},Pe=function(f,w){return Pa(Ia(f),...w.flat())},Ae=function(f,w,k,J,Z){return Da(f,w,k,J,Z)},Ie=function(f){return f},ke=function(f){return f.replace(/[\r\n]+/g," ")},fe=function(f){return f.trim()},L=function(f){return f},H=function(f,w){return{result:f,comment:w}},g=t.peg$currPos|0,Te=[{line:1,column:1}],we=g,lt=t.peg$maxFailExpected||[],V=t.peg$silentFails|0,ht;if(t.startRule){if(!(t.startRule in b))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');c=b[t.startRule]}function qe(f,w){return{type:"literal",text:f,ignoreCase:w}}function at(f,w,k){return{type:"class",parts:f,inverted:w,ignoreCase:k}}function Ct(){return{type:"end"}}function Qe(f){return{type:"other",description:f}}function It(f){var w=Te[f],k;if(w)return w;if(f>=Te.length)k=Te.length-1;else for(k=f;!Te[--k];);for(w=Te[k],w={line:w.line,column:w.column};k<f;)i.charCodeAt(k)===10?(w.line++,w.column=1):w.column++,k++;return Te[f]=w,w}function Dt(f,w,k){var J=It(f),Z=It(w),$e={source:d,start:{offset:f,line:J.line,column:J.column},end:{offset:w,line:Z.line,column:Z.column}};return $e}function ae(f){g<we||(g>we&&(we=g,lt=[]),lt.push(f))}function Bt(f,w,k){return new Et(Et.buildMessage(f,w),f,w,k)}function Pt(){var f,w,k;return f=g,w=Zt(),k=ea(),f=pe(w,k),f}function Zt(){var f,w,k;for(f=g,w=[],k=vt();k!==e;)w.push(k),k=vt();return k=Se(),f=Ee(w),f}function vt(){var f,w,k,J,Z,$e,pt;return V++,f=g,Se(),i.charCodeAt(g)===91?(w=l,g++):(w=e,V===0&&ae(o)),w!==e?(Se(),k=Nt(),k!==e?(Se(),i.charCodeAt(g)===34?(J=n,g++):(J=e,V===0&&ae(_)),J!==e?(Z=jt(),i.charCodeAt(g)===34?($e=n,g++):($e=e,V===0&&ae(_)),$e!==e?(Se(),i.charCodeAt(g)===93?(pt=z,g++):(pt=e,V===0&&ae(D)),pt!==e?f=Ue(k,Z):(g=f,f=e)):(g=f,f=e)):(g=f,f=e)):(g=f,f=e)):(g=f,f=e),V--,f===e&&V===0&&ae(a),f}function Nt(){var f,w,k;if(V++,f=g,w=[],k=i.charAt(g),Oe.test(k)?g++:(k=e,V===0&&ae(R)),k!==e)for(;k!==e;)w.push(k),k=i.charAt(g),Oe.test(k)?g++:(k=e,V===0&&ae(R));else w=e;return w!==e?f=i.substring(f,g):f=w,V--,f===e&&(w=e,V===0&&ae($)),f}function jt(){var f,w,k;for(V++,f=g,w=[],k=i.charAt(g),ct.test(k)?g++:(k=e,V===0&&ae(U));k!==e;)w.push(k),k=i.charAt(g),ct.test(k)?g++:(k=e,V===0&&ae(U));return f=i.substring(f,g),V--,w=e,V===0&&ae(A),f}function ea(){var f,w,k;return f=g,w=Ot(),Se(),k=xe(),k===e&&(k=null),Se(),f=Ne(w,k),f}function Ot(){var f,w,k,J;for(f=g,w=Ut(),w===e&&(w=null),k=[],J=Ft();J!==e;)k.push(J),J=Ft();return f=Pe(w,k),f}function Ft(){var f,w,k,J,Z,$e,pt,Tt;if(f=g,Se(),_t(),Se(),w=Lt(),w!==e){for(k=gt(),k===e&&(k=null),J=[],Z=xt();Z!==e;)J.push(Z),Z=xt();for(Z=Se(),$e=Ut(),$e===e&&($e=null),pt=[],Tt=ie();Tt!==e;)pt.push(Tt),Tt=ie();f=Ae(w,k,J,$e,pt)}else g=f,f=e;return f}function _t(){var f,w,k,J,Z,$e;for(V++,f=g,w=[],k=i.charAt(g),Me.test(k)?g++:(k=e,V===0&&ae(v));k!==e;)w.push(k),k=i.charAt(g),Me.test(k)?g++:(k=e,V===0&&ae(v));if(i.charCodeAt(g)===46?(k=W,g++):(k=e,V===0&&ae(M)),k!==e){for(J=Se(),Z=[],$e=i.charAt(g),ze.test($e)?g++:($e=e,V===0&&ae(X));$e!==e;)Z.push($e),$e=i.charAt(g),ze.test($e)?g++:($e=e,V===0&&ae(X));w=[w,k,J,Z],f=w}else g=f,f=e;return V--,f===e&&(w=e,V===0&&ae(G)),f}function Lt(){var f,w,k,J,Z,$e;if(V++,f=g,w=g,i.substr(g,5)===S?(k=S,g+=5):(k=e,V===0&&ae(te)),k===e&&(i.substr(g,3)===E?(k=E,g+=3):(k=e,V===0&&ae(Q)),k===e&&(i.substr(g,5)===j?(k=j,g+=5):(k=e,V===0&&ae(u)),k===e&&(i.substr(g,3)===N?(k=N,g+=3):(k=e,V===0&&ae(m)),k===e))))if(k=g,J=i.charAt(g),Oe.test(J)?g++:(J=e,V===0&&ae(R)),J!==e){if(Z=[],$e=i.charAt(g),ce.test($e)?g++:($e=e,V===0&&ae(s)),$e!==e)for(;$e!==e;)Z.push($e),$e=i.charAt(g),ce.test($e)?g++:($e=e,V===0&&ae(s));else Z=e;Z!==e?(J=[J,Z],k=J):(g=k,k=e)}else g=k,k=e;return k!==e?(J=i.charAt(g),st.test(J)?g++:(J=e,V===0&&ae(r)),J===e&&(J=null),k=[k,J],w=k):(g=w,w=e),w!==e?f=i.substring(f,g):f=w,V--,f===e&&(w=e,V===0&&ae(ee)),f}function gt(){var f,w,k;for(V++,f=g,w=[],k=i.charAt(g),ve.test(k)?g++:(k=e,V===0&&ae(B));k!==e;)w.push(k),w.length>=2?k=e:(k=i.charAt(g),ve.test(k)?g++:(k=e,V===0&&ae(B)));return w.length<1?(g=f,f=e):f=w,V--,f===e&&(w=e,V===0&&ae(x)),f}function xt(){var f,w,k,J,Z;if(V++,f=g,Se(),i.charCodeAt(g)===36?(w=ge,g++):(w=e,V===0&&ae(O)),w!==e){if(k=g,J=[],Z=i.charAt(g),Me.test(Z)?g++:(Z=e,V===0&&ae(v)),Z!==e)for(;Z!==e;)J.push(Z),Z=i.charAt(g),Me.test(Z)?g++:(Z=e,V===0&&ae(v));else J=e;J!==e?k=i.substring(k,g):k=J,k!==e?f=Ie(k):(g=f,f=e)}else g=f,f=e;return V--,f===e&&V===0&&ae(C),f}function Ut(){var f;return f=Ht(),f===e&&(f=P()),f}function Ht(){var f,w,k,J,Z;if(V++,f=g,i.charCodeAt(g)===123?(w=ye,g++):(w=e,V===0&&ae(F)),w!==e){for(k=g,J=[],Z=i.charAt(g),p.test(Z)?g++:(Z=e,V===0&&ae(q));Z!==e;)J.push(Z),Z=i.charAt(g),p.test(Z)?g++:(Z=e,V===0&&ae(q));k=i.substring(k,g),i.charCodeAt(g)===125?(J=Ve,g++):(J=e,V===0&&ae(Y)),J!==e?f=ke(k):(g=f,f=e)}else g=f,f=e;return V--,f===e&&(w=e,V===0&&ae(ne)),f}function P(){var f,w,k,J,Z;if(V++,f=g,i.charCodeAt(g)===59?(w=tt,g++):(w=e,V===0&&ae(me)),w!==e){for(k=g,J=[],Z=i.charAt(g),T.test(Z)?g++:(Z=e,V===0&&ae(le));Z!==e;)J.push(Z),Z=i.charAt(g),T.test(Z)?g++:(Z=e,V===0&&ae(le));k=i.substring(k,g),f=fe(k)}else g=f,f=e;return V--,f===e&&(w=e,V===0&&ae(_e)),f}function ie(){var f,w,k,J;return V++,f=g,Se(),i.charCodeAt(g)===40?(w=rt,g++):(w=e,V===0&&ae(K)),w!==e?(k=Ot(),k!==e?(Se(),i.charCodeAt(g)===41?(J=St,g++):(J=e,V===0&&ae(re)),J!==e?f=L(k):(g=f,f=e)):(g=f,f=e)):(g=f,f=e),V--,f===e&&V===0&&ae(ue),f}function xe(){var f,w,k;return V++,f=g,i.substr(g,3)===nt?(w=nt,g+=3):(w=e,V===0&&ae(de)),w===e&&(i.substr(g,3)===Fe?(w=Fe,g+=3):(w=e,V===0&&ae(he)),w===e&&(i.substr(g,7)===ot?(w=ot,g+=7):(w=e,V===0&&ae(De)),w===e&&(i.charCodeAt(g)===42?(w=ut,g++):(w=e,V===0&&ae(Be))))),w!==e?(Se(),k=Ut(),k===e&&(k=null),f=H(w,k)):(g=f,f=e),V--,f===e&&(w=e,V===0&&ae(be)),f}function Se(){var f,w;for(V++,f=[],w=i.charAt(g),I.test(w)?g++:(w=e,V===0&&ae(Le));w!==e;)f.push(w),w=i.charAt(g),I.test(w)?g++:(w=e,V===0&&ae(Le));return V--,w=e,V===0&&ae(Ge),f}if(ht=c(),t.peg$library)return{peg$result:ht,peg$currPos:g,peg$FAILED:e,peg$maxFailExpected:lt,peg$maxFailPos:we};if(ht!==e&&g===i.length)return ht;throw ht!==e&&g<i.length&&ae(Ct()),Bt(lt,we<i.length?i.charAt(we):null,we<i.length?Dt(we,we+1):Dt(we,we))}/**
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
 */const Jt=0xffffffffffffffffn;function na(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function ha(i,t){return i*t&Jt}function Ma(i){return function(){let t=BigInt(i&Jt),e=BigInt(i>>64n&Jt);const d=ha(na(ha(t,5n),7n),9n);return e^=t,t=(na(t,24n)^e^e<<16n)&Jt,e=na(e,37n),i=e<<64n|t,d}}const Xt=Ma(0xa187eb39cdcaed8f31c4b365b102e01en),za=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Xt()))),Ra=Array.from({length:8},()=>Xt()),Ba=Array.from({length:16},()=>Xt()),oa=Xt(),Je="w",it="b",je="p",pa="n",Qt="b",zt="r",mt="q",He="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Kt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:d,piece:b,from:c,to:l,flags:n,captured:z,promotion:W}=e,S=Ke(c),E=Ke(l);this.color=d,this.piece=b,this.from=S,this.to=E,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=S+E,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const j in se)se[j]&n&&(this.flags+=kt[j]);z&&(this.captured=z),W&&(this.promotion=W,this.lan+=W)}isCapture(){return this.flags.indexOf(kt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(kt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(kt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(kt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(kt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(kt.BIG_PAWN)>-1}}const Ye=-1,kt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},se={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ua={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Na={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},ja={...ua,...Na},oe={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},sa={b:[16,32,17,15],w:[-16,-32,-17,-15]},va={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Oa=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ua=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ha={p:1,n:2,b:4,r:8,q:16,k:32},Ga="pnbrqkPNBRQK",xa=[pa,Qt,zt,mt],Wa=7,Ka=6,Va=1,Ya=0,Vt={[He]:se.KSIDE_CASTLE,[mt]:se.QSIDE_CASTLE},bt={w:[{square:oe.a1,flag:se.QSIDE_CASTLE},{square:oe.h1,flag:se.KSIDE_CASTLE}],b:[{square:oe.a8,flag:se.QSIDE_CASTLE},{square:oe.h8,flag:se.KSIDE_CASTLE}]},Ja={b:Va,w:Ka},la="--";function $t(i){return i>>4}function Rt(i){return i&15}function $a(i){return"0123456789".indexOf(i)!==-1}function Ke(i){const t=Rt(i),e=$t(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function qt(i){return i===Je?it:Je}function Qa(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const d=parseInt(t[4],10);if(isNaN(d)||d<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const b=t[0].split("/");if(b.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let l=0;l<b.length;l++){let n=0,z=!1;for(let W=0;W<b[l].length;W++)if($a(b[l][W])){if(z)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};n+=parseInt(b[l][W],10),z=!0}else{if(!/^[prnbqkPRNBQK]$/.test(b[l][W]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};n+=1,z=!1}if(n!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const c=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:l,regex:n}of c){if(!n.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${l} king`};if((t[0].match(n)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${l} kings`}}return Array.from(b[0]+b[7]).some(l=>l.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Xa(i,t){const e=i.from,d=i.to,b=i.piece;let c=0,l=0,n=0;for(let z=0,W=t.length;z<W;z++){const S=t[z].from,E=t[z].to,j=t[z].piece;b===j&&e!==S&&d===E&&(c++,$t(e)===$t(S)&&l++,Rt(e)===Rt(S)&&n++)}return c>0?l>0&&n>0?Ke(e):n>0?Ke(e).charAt(1):Ke(e).charAt(0):""}function ft(i,t,e,d,b,c=void 0,l=se.NORMAL){const n=$t(d);if(b===je&&(n===Wa||n===Ya))for(let z=0;z<xa.length;z++){const W=xa[z];i.push({color:t,from:e,to:d,piece:b,captured:c,promotion:W,flags:l|se.PROMOTION})}else i.push({color:t,from:e,to:d,piece:b,captured:c,flags:l})}function ya(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:je:(t=t.toLowerCase(),t==="o"?He:t)}function da(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ka{_board=new Array(128);_turn=Je;_header={};_kings={w:Ye,b:Ye};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=ra,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Ye,b:Ye},this._turn=Je,this._castling={w:0,b:0},this._epSquare=Ye,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...ja},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:d=!1}={}){let b=t.split(/\s+/);if(b.length>=2&&b.length<6){const n=["-","-","0","1"];t=b.concat(n.slice(-(6-b.length))).join(" ")}if(b=t.split(/\s+/),!e){const{ok:n,error:z}=Qa(t);if(!n)throw new Error(z)}const c=b[0];let l=0;this.clear({preserveHeaders:d});for(let n=0;n<c.length;n++){const z=c.charAt(n);if(z==="/")l+=8;else if($a(z))l+=parseInt(z,10);else{const W=z<"a"?Je:it;this._put({type:z.toLowerCase(),color:W},Ke(l)),l++}}this._turn=b[1],b[2].indexOf("K")>-1&&(this._castling.w|=se.KSIDE_CASTLE),b[2].indexOf("Q")>-1&&(this._castling.w|=se.QSIDE_CASTLE),b[2].indexOf("k")>-1&&(this._castling.b|=se.KSIDE_CASTLE),b[2].indexOf("q")>-1&&(this._castling.b|=se.QSIDE_CASTLE),this._epSquare=b[3]==="-"?Ye:oe[b[3]],this._halfMoves=parseInt(b[4],10),this._moveNumber=parseInt(b[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,d="";for(let l=oe.a8;l<=oe.h1;l++){if(this._board[l]){e>0&&(d+=e,e=0);const{color:n,type:z}=this._board[l];d+=n===Je?z.toUpperCase():z.toLowerCase()}else e++;l+1&136&&(e>0&&(d+=e),l!==oe.h1&&(d+="/"),e=0,l+=8)}let b="";this._castling[Je]&se.KSIDE_CASTLE&&(b+="K"),this._castling[Je]&se.QSIDE_CASTLE&&(b+="Q"),this._castling[it]&se.KSIDE_CASTLE&&(b+="k"),this._castling[it]&se.QSIDE_CASTLE&&(b+="q"),b=b||"-";let c="-";if(this._epSquare!==Ye)if(t)c=Ke(this._epSquare);else{const l=this._epSquare+(this._turn===Je?16:-16),n=[l+1,l-1];for(const z of n){if(z&136)continue;const W=this._turn;if(this._board[z]?.color===W&&this._board[z]?.type===je){this._makeMove({color:W,from:z,to:this._epSquare,piece:je,captured:je,flags:se.EP_CAPTURE});const S=!this._isKingAttacked(W);if(this._undoMove(),S){c=Ke(this._epSquare);break}}}}return[d,this._turn,b,c,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:d}=this._board[t],b={w:0,b:1}[e],c={p:0,n:1,b:2,r:3,q:4,k:5}[d];return za[b][c][t]}_epKey(){return this._epSquare===Ye?0n:Ra[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Ba[t]}_computeHash(){let t=0n;for(let e=oe.a8;e<=oe.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=oa),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[oe[t]]}findPiece(t){const e=[];for(let d=oe.a8;d<=oe.h1;d++){if(d&136){d+=7;continue}!this._board[d]||this._board[d]?.color!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(Ke(d))}return e}put({type:t,color:e},d){return this._put({type:t,color:e},d)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},d){if(Ga.indexOf(t.toLowerCase())===-1||!(d in oe))return!1;const b=oe[d];if(t==He&&!(this._kings[e]==Ye||this._kings[e]==b))return!1;const c=this._board[b];return c&&c.type===He&&(this._kings[c.color]=Ye),this._set(b,{type:t,color:e}),t===He&&(this._kings[e]=b),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(oe[t]),e&&e.type===He&&(this._kings[e.color]=Ye),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[oe.e1]?.type===He&&this._board[oe.e1]?.color===Je,e=this._board[oe.e8]?.type===He&&this._board[oe.e8]?.color===it;(!t||this._board[oe.a1]?.type!==zt||this._board[oe.a1]?.color!==Je)&&(this._castling.w&=-65),(!t||this._board[oe.h1]?.type!==zt||this._board[oe.h1]?.color!==Je)&&(this._castling.w&=-33),(!e||this._board[oe.a8]?.type!==zt||this._board[oe.a8]?.color!==it)&&(this._castling.b&=-65),(!e||this._board[oe.h8]?.type!==zt||this._board[oe.h8]?.color!==it)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Ye)return;const t=this._epSquare+(this._turn===Je?-16:16),e=this._epSquare+(this._turn===Je?16:-16),d=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==qt(this._turn)||this._board[e]?.type!==je){this._hash^=this._epKey(),this._epSquare=Ye;return}const b=c=>!(c&136)&&this._board[c]?.color===this._turn&&this._board[c]?.type===je;d.some(b)||(this._hash^=this._epKey(),this._epSquare=Ye)}_attacked(t,e,d){const b=[];for(let c=oe.a8;c<=oe.h1;c++){if(c&136){c+=7;continue}if(this._board[c]===void 0||this._board[c].color!==t)continue;const l=this._board[c],n=c-e;if(n===0)continue;const z=n+119;if(Oa[z]&Ha[l.type]){if(l.type===je){if(n>0&&l.color===Je||n<=0&&l.color===it)if(d)b.push(Ke(c));else return!0;continue}if(l.type==="n"||l.type==="k")if(d){b.push(Ke(c));continue}else return!0;const W=Ua[z];let S=c+W,E=!1;for(;S!==e;){if(this._board[S]!=null){E=!0;break}S+=W}if(!E)if(d){b.push(Ke(c));continue}else return!0}}return d?b:!1}attackers(t,e){return e?this._attacked(e,oe[t],!0):this._attacked(this._turn,oe[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(qt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,oe[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let d=0,b=0;for(let c=oe.a8;c<=oe.h1;c++){if(b=(b+1)%2,c&136){c+=7;continue}const l=this._board[c];l&&(t[l.type]=l.type in t?t[l.type]+1:1,l.type===Qt&&e.push(b),d++)}if(d===2)return!0;if(d===3&&(t[Qt]===1||t[pa]===1))return!0;if(d===t[Qt]+2){let c=0;const l=e.length;for(let n=0;n<l;n++)c+=e[n];if(c===0||c===l)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:d=void 0}={}){const b=this._moves({square:e,piece:d});return t?b.map(c=>new Kt(this,c)):b.map(c=>this._moveToSan(c,b))}_moves({legal:t=!0,piece:e=void 0,square:d=void 0}={}){const b=d?d.toLowerCase():void 0,c=e?.toLowerCase(),l=[],n=this._turn,z=qt(n);let W=oe.a8,S=oe.h1,E=!1;if(b)if(b in oe)W=S=oe[b],E=!0;else return[];for(let N=W;N<=S;N++){if(N&136){N+=7;continue}if(!this._board[N]||this._board[N].color===z)continue;const{type:ge}=this._board[N];let ye;if(ge===je){if(c&&c!==ge)continue;ye=N+sa[n][0],this._board[ye]||(ft(l,n,N,ye,je),ye=N+sa[n][1],Ja[n]===$t(N)&&!this._board[ye]&&ft(l,n,N,ye,je,void 0,se.BIG_PAWN));for(let Ve=2;Ve<4;Ve++)ye=N+sa[n][Ve],!(ye&136)&&(this._board[ye]?.color===z?ft(l,n,N,ye,je,this._board[ye].type,se.CAPTURE):ye===this._epSquare&&ft(l,n,N,ye,je,je,se.EP_CAPTURE))}else{if(c&&c!==ge)continue;for(let Ve=0,tt=va[ge].length;Ve<tt;Ve++){const rt=va[ge][Ve];for(ye=N;ye+=rt,!(ye&136);){if(!this._board[ye])ft(l,n,N,ye,ge);else{if(this._board[ye].color===n)break;ft(l,n,N,ye,ge,this._board[ye].type,se.CAPTURE);break}if(ge===pa||ge===He)break}}}}if((c===void 0||c===He)&&(!E||S===this._kings[n])){if(this._castling[n]&se.KSIDE_CASTLE){const N=this._kings[n],ge=N+2;!this._board[N+1]&&!this._board[ge]&&!this._attacked(z,this._kings[n])&&!this._attacked(z,N+1)&&!this._attacked(z,ge)&&ft(l,n,this._kings[n],ge,He,void 0,se.KSIDE_CASTLE)}if(this._castling[n]&se.QSIDE_CASTLE){const N=this._kings[n],ge=N-2;!this._board[N-1]&&!this._board[N-2]&&!this._board[N-3]&&!this._attacked(z,this._kings[n])&&!this._attacked(z,N-1)&&!this._attacked(z,ge)&&ft(l,n,this._kings[n],ge,He,void 0,se.QSIDE_CASTLE)}}if(!t||this._kings[n]===-1)return l;const j=[];for(let N=0,ge=l.length;N<ge;N++)this._makeMove(l[N]),this._isKingAttacked(n)||j.push(l[N]),this._undoMove();return j}move(t,{strict:e=!1}={}){let d=null;if(typeof t=="string")d=this._moveFromSan(t,e);else if(t===null)d=this._moveFromSan(la,e);else if(typeof t=="object"){const c=this._moves();for(let l=0,n=c.length;l<n;l++)if(t.from===Ke(c[l].from)&&t.to===Ke(c[l].to)&&(!("promotion"in c[l])||t.promotion===c[l].promotion)){d=c[l];break}}if(!d)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&d.flags&se.NULL_MOVE)throw new Error("Null move not allowed when in check");const b=new Kt(this,d);return this._makeMove(d),this._incPositionCount(),b}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,d=qt(e);if(this._push(t),t.flags&se.NULL_MOVE){e===it&&this._moveNumber++,this._halfMoves++,this._turn=d,this._epSquare=Ye;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&se.EP_CAPTURE&&(this._turn===it?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===He){if(this._kings[e]=t.to,t.flags&se.KSIDE_CASTLE){const b=t.to-1,c=t.to+1;this._movePiece(c,b)}else if(t.flags&se.QSIDE_CASTLE){const b=t.to+1,c=t.to-2;this._movePiece(c,b)}this._castling[e]=0}if(this._castling[e]){for(let b=0,c=bt[e].length;b<c;b++)if(t.from===bt[e][b].square&&this._castling[e]&bt[e][b].flag){this._castling[e]^=bt[e][b].flag;break}}if(this._castling[d]){for(let b=0,c=bt[d].length;b<c;b++)if(t.to===bt[d][b].square&&this._castling[d]&bt[d][b].flag){this._castling[d]^=bt[d][b].flag;break}}if(this._hash^=this._castlingKey(),t.flags&se.BIG_PAWN){let b;e===it?b=t.to-16:b=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===je&&this._board[t.to-1]?.color===d||!(t.to+1&136)&&this._board[t.to+1]?.type===je&&this._board[t.to+1]?.color===d?(this._epSquare=b,this._hash^=this._epKey()):this._epSquare=Ye}else this._epSquare=Ye;t.piece===je?this._halfMoves=0:t.flags&(se.CAPTURE|se.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===it&&this._moveNumber++,this._turn=d,this._hash^=oa}undo(){const t=this._hash,e=this._undoMove();if(e){const d=new Kt(this,e);return this._decPositionCount(t),d}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=oa;const d=this._turn,b=qt(d);if(e.flags&se.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:d})),e.captured)if(e.flags&se.EP_CAPTURE){let c;d===it?c=e.to-16:c=e.to+16,this._set(c,{type:je,color:b})}else this._set(e.to,{type:e.captured,color:b});if(e.flags&(se.KSIDE_CASTLE|se.QSIDE_CASTLE)){let c,l;e.flags&se.KSIDE_CASTLE?(c=e.to+1,l=e.to-1):(c=e.to-2,l=e.to+1),this._movePiece(l,c)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const d=[];let b=!1;for(const j in this._header)this._header[j]&&d.push(`[${j} "${this._header[j]}"]`+t),b=!0;b&&this._history.length&&d.push(t);const c=j=>{const N=this._comments[this.fen()];if(typeof N<"u"){const ge=j.length>0?" ":"";j=`${j}${ge}{${N}}`}return j},l=[];for(;this._history.length>0;)l.push(this._undoMove());const n=[];let z="";for(l.length===0&&n.push(c(""));l.length>0;){z=c(z);const j=l.pop();if(!j)break;if(!this._history.length&&j.color==="b"){const N=`${this._moveNumber}. ...`;z=z?`${z} ${N}`:N}else j.color==="w"&&(z.length&&n.push(z),z=this._moveNumber+".");z=z+" "+this._moveToSan(j,this._moves({legal:!0})),this._makeMove(j)}if(z.length&&n.push(c(z)),n.push(this._header.Result||"*"),e===0)return d.join("")+n.join(" ");const W=function(){return d.length>0&&d[d.length-1]===" "?(d.pop(),!0):!1},S=function(j,N){for(const ge of N.split(" "))if(ge){if(j+ge.length>e){for(;W();)j--;d.push(t),j=0}d.push(ge),j+=ge.length,d.push(" "),j++}return W()&&j--,j};let E=0;for(let j=0;j<n.length;j++){if(E+n[j].length>e&&n[j].includes("{")){E=S(E,n[j]);continue}E+n[j].length>e&&j!==0?(d[d.length-1]===" "&&d.pop(),d.push(t),E=0):j!==0&&(d.push(" "),E++),d.push(n[j]),E+=n[j].length}return d.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ua[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ua[t]||null,!0):!1}getHeaders(){const t={};for(const[e,d]of Object.entries(this._header))d!==null&&(t[e]=d);return t}loadPgn(t,{strict:e=!1,newlineChar:d=`\r?
`}={}){d!==`\r?
`&&(t=t.replace(new RegExp(d,"g"),`
`));const b=qa(t);this.reset();const c=b.headers;let l="";for(const W in c)W.toLowerCase()==="fen"&&(l=c[W]),this.header(W,c[W]);if(!e)l&&this.load(l,{preserveHeaders:!0});else if(c.SetUp==="1"){if(!("FEN"in c))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(c.FEN,{preserveHeaders:!0})}let n=b.root;for(;n;){if(n.move){const W=this._moveFromSan(n.move,e);if(W==null)throw new Error(`Invalid move in PGN: ${n.move}`);this._makeMove(W),this._incPositionCount()}n.comment!==void 0&&(this._comments[this.fen()]=n.comment),n=n.variations[0]}const z=b.result;z&&Object.keys(this._header).length&&this._header.Result!==z&&this.setHeader("Result",z)}_moveToSan(t,e){let d="";if(t.flags&se.KSIDE_CASTLE)d="O-O";else if(t.flags&se.QSIDE_CASTLE)d="O-O-O";else{if(t.flags&se.NULL_MOVE)return la;if(t.piece!==je){const b=Xa(t,e);d+=t.piece.toUpperCase()+b}t.flags&(se.CAPTURE|se.EP_CAPTURE)&&(t.piece===je&&(d+=Ke(t.from)[0]),d+="x"),d+=Ke(t.to),t.promotion&&(d+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?d+="#":d+="+"),this._undoMove(),d}_moveFromSan(t,e=!1){let d=da(t);if(e||(d==="0-0"?d="O-O":d==="0-0-0"&&(d="O-O-O")),d==la)return{color:this._turn,from:0,to:0,piece:"k",flags:se.NULL_MOVE};let b=ya(d),c=this._moves({legal:!0,piece:b});for(let j=0,N=c.length;j<N;j++)if(d===da(this._moveToSan(c[j],c)))return c[j];if(e)return null;let l,n,z,W,S,E=!1;if(n=d.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),n?(l=n[1],z=n[2],W=n[3],S=n[4],z.length==1&&(E=!0)):(n=d.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),n&&(l=n[1],z=n[2],W=n[3],S=n[4],z.length==1&&(E=!0))),b=ya(d),c=this._moves({legal:!0,piece:l||b}),!W)return null;for(let j=0,N=c.length;j<N;j++)if(z){if((!l||l.toLowerCase()==c[j].piece)&&oe[z]==c[j].from&&oe[W]==c[j].to&&(!S||S.toLowerCase()==c[j].promotion))return c[j];if(E){const ge=Ke(c[j].from);if((!l||l.toLowerCase()==c[j].piece)&&oe[W]==c[j].to&&(z==ge[0]||z==ge[1])&&(!S||S.toLowerCase()==c[j].promotion))return c[j]}}else if(d===da(this._moveToSan(c[j],c)).replace("x",""))return c[j];return null}ascii(){let t=`   +------------------------+
`;for(let e=oe.a8;e<=oe.h1;e++){if(Rt(e)===0&&(t+=" "+"87654321"[$t(e)]+" |"),this._board[e]){const d=this._board[e].type,c=this._board[e].color===Je?d.toUpperCase():d.toLowerCase();t+=" "+c+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let d=0;const b=this._turn;for(let c=0,l=e.length;c<l;c++)this._makeMove(e[c]),this._isKingAttacked(b)||(t-1>0?d+=this.perft(t-1):d++),this._undoMove();return d}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let d=oe.a8;d<=oe.h1;d++)this._board[d]==null?e.push(null):e.push({square:Ke(d),type:this._board[d].type,color:this._board[d].color}),d+1&136&&(t.push(e),e=[],d+=8);return t}squareColor(t){if(t in oe){const e=oe[t];return($t(e)+Rt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],d=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const b=e.pop();if(!b)break;t?d.push(new Kt(this,b)):d.push(this._moveToSan(b,this._moves())),this._makeMove(b)}return d}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},d=b=>{b in this._comments&&(e[b]=this._comments[b])};for(;this._history.length>0;)t.push(this._undoMove());for(d(this.fen());;){const b=t.pop();if(!b)break;this._makeMove(b),d(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const b of[He,mt])e[b]!==void 0&&(e[b]?this._castling[t]|=Vt[b]:this._castling[t]&=~Vt[b]);this._updateCastlingRights();const d=this.getCastlingRights(t);return(e[He]===void 0||e[He]===d[He])&&(e[mt]===void 0||e[mt]===d[mt])}getCastlingRights(t){return{[He]:(this._castling[t]&Vt[He])!==0,[mt]:(this._castling[t]&Vt[mt])!==0}}moveNumber(){return this._moveNumber}}async function ai(i,t={}){const e=t.currentUser||{},d=t.userRole||e?.role||"employee";let b="chat",c=[],l=null,n=[],z=[],W=null,S=null,E=!1,j=null,N=null;i.innerHTML=`
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
  `,Za(),await nt(),Me();const ge=i.querySelector("#tab-nav-chat"),ye=i.querySelector("#tab-nav-lounge"),Ve=i.querySelector("#bonding-chat-main-wrap"),tt=i.querySelector("#bonding-lounge-main-wrap");ge?.addEventListener("click",()=>{b="chat",ge.classList.add("active"),ye.classList.remove("active"),Ve.style.display="grid",tt.style.display="none",Me()}),ye?.addEventListener("click",async()=>{b="lounge_games",ye.classList.add("active"),ge.classList.remove("active"),Ve.style.display="none",tt.style.display="block",await D()}),i.querySelector("#btn-top-new-chat")?.addEventListener("click",X),i.querySelector("#btn-top-new-group")?.addEventListener("click",ee),i.querySelector("#btn-top-challenge")?.addEventListener("click",()=>R());const rt=i.querySelector("#bonding-search-input");rt&&rt.addEventListener("input",u=>{const m=u.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(r=>{const x=r.textContent.toLowerCase();r.style.display=x.includes(m)?"flex":"none"})}),ut(),new MutationObserver((u,m)=>{document.body.contains(i)||(S&&clearInterval(S),N&&clearInterval(N),m.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function nt(){try{const[u,m]=await Promise.all([Re("/bonding/channels").catch(()=>[]),Re("/bonding/colleagues").catch(()=>[])]);c=u,n=m,!l&&c.length>0&&(l=c.find(s=>s.name.includes("Lounge"))||c[0]),Oe(),l&&await Fe(l._id)}catch(u){console.error("Failed to load bonding data",u)}}async function Fe(u,m=!1){if(u)try{z=await Re(`/bonding/channels/${u}/messages`),m?o():_()}catch(s){console.error("Failed to load messages",s)}}let ot=0;function ut(){S&&clearInterval(S),S=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval(S);return}if(ot++,ot%2===0){const u=await Re("/bonding/channels").catch(()=>null);u&&JSON.stringify(u.map(m=>m._id+m.lastMessage?.sentAt))!==JSON.stringify(c.map(m=>m._id+m.lastMessage?.sentAt))&&(c=u,Oe())}b==="chat"&&l?await Fe(l._id,!0):b==="lounge_games"&&await D(!0)}catch{}},3e3)}function Oe(){const u=i.querySelector("#bonding-group-list"),m=i.querySelector("#bonding-direct-list");if(!u||!m)return;const s=c.filter(x=>x.type==="group"),r=c.filter(x=>x.type==="direct");if(s.length===0)u.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const x=e?._id||e?.id,B=d==="superadmin"||e?.role==="superadmin";u.innerHTML=s.map(C=>{const O=l&&l._id===C._id,F=C.createdBy&&C.createdBy.userId&&String(C.createdBy.userId)===String(x)||B;return`
          <div class="bonding-channel-item ${O?"active":""}" data-channel-id="${C._id}">
            <div class="bonding-channel-icon">${C.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${h(C.name)}</div>
              <div class="bonding-channel-preview">${h(C.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${F?`
              <button class="bonding-channel-del-btn" data-channel-id="${C._id}" title="Delete Group (Creator only)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            `:`
              <button class="bonding-channel-leave-btn" data-channel-id="${C._id}" title="Leave Group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            `}
          </div>
        `}).join("")}r.length===0?m.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':m.innerHTML=r.map(x=>{const B=l&&l._id===x._id,C=x.displayName||x.name||"Colleague",O=C.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${B?"active":""}" data-channel-id="${x._id}">
            <div class="bonding-channel-avatar">${O}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${h(C)}</div>
              <div class="bonding-channel-preview">${h(x.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${x._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),ct()}function ct(){const u=i.querySelectorAll(".bonding-channel-item");u.forEach(m=>{m.onclick=async s=>{if(s.target.closest(".bonding-channel-del-btn")||s.target.closest(".bonding-channel-leave-btn"))return;const r=m.dataset.channelId,x=c.find(B=>B._id===r);x&&(l=x,u.forEach(B=>B.classList.remove("active")),m.classList.add("active"),Me(),await Fe(x._id))}}),i.querySelectorAll(".bonding-channel-leave-btn").forEach(m=>{m.onclick=async s=>{s.stopPropagation();const r=m.dataset.channelId,B=c.find(C=>C._id===r)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${B}"?`))try{m.disabled=!0,await Ce(`/bonding/channels/${r}/leave`,{}),y(`You left "${B}"`,"info"),c=c.filter(C=>C._id!==r),l&&l._id===r&&(l=c.find(C=>C.type==="group")||c[0]||null,Me(),l&&await Fe(l._id)),Oe()}catch(C){y(C.message||"Failed to leave group","error"),m.disabled=!1}}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(m=>{m.onclick=async s=>{s.stopPropagation();const r=m.dataset.channelId,x=c.find(O=>O._id===r),B=x&&x.type==="direct",C=B?"this 1-on-1 chat":`the group "${x?.name||""}"`;if(confirm(`Are you sure you want to delete ${C}? All messages will be permanently removed.`))try{m.disabled=!0,await et(`/bonding/channels/${r}`),y(B?"1-on-1 chat deleted":"Group deleted","success"),c=c.filter(O=>O._id!==r),l&&l._id===r&&(l=c[0]||null,Me(),l&&await Fe(l._id)),Oe()}catch(O){y(O.message||"Failed to delete conversation","error"),m.disabled=!1}}}),i.querySelector("#btn-create-group")?.addEventListener("click",ee),i.querySelector("#btn-new-direct-chat")?.addEventListener("click",X)}function Me(){const u=i.querySelector("#bonding-chat-panel");if(!u)return;if(!l){u.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const m=h(l.displayName||l.name),s=(l.members||[]).length,r=l.type==="group",x=e?._id||e?.id,B=r?null:(l.members||[]).find(F=>F.userId?.toString()!==x?.toString()),C=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(x),O=d==="superadmin"||e?.role==="superadmin",ne=C||O;u.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${r?l.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${m}</div>
            <div class="bonding-chat-sub">
              ${r?`<span>${s} members</span> · <span>${h(l.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${r?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${s})</span>
            </button>
            ${ne?`
              <button class="bonding-header-btn danger" id="btn-delete-group" title="Delete this group (Creator only)">
                <span>🗑️</span> <span>Delete Group</span>
              </button>
            `:`
              <button class="bonding-header-btn danger" id="btn-leave-group" title="Leave this group">
                <span>🚪</span> <span>Leave Group</span>
              </button>
            `}
          `:`
            <button class="bonding-header-btn danger" id="btn-delete-direct" title="Delete 1-on-1 Chat">
              <span>🗑️</span> <span>Delete Chat</span>
            </button>
          `}
        </div>
      </div>

      <div class="bonding-messages-container" id="bonding-messages-feed">
        ${ze()}
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
    `,st(B),ve(B),p(),a()}function ze(){if(!z||z.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const u=e?._id||e?.id;return z.map(m=>{const s=m.sender&&m.sender.userId&&u&&m.sender.userId.toString()===u.toString();if(m.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${m._id}">
            <span>ℹ️</span> <span>${h(m.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${m._id}" title="Delete Message">&times;</button>
          </div>
        `;if(m.type==="challenge"&&m.challengeData){const C=m.challengeData;if(C.status==="declined"||C.status==="cancelled")return"";const O=C.gameTitle||"Game Challenge",ne=C.gameType||"chess",F=ne==="chess"?"♟️":ne==="ludo"?"🎲":"❌",q=C.gameState?.invitationId,Y=C.targetUserId?.toString(),_e=m.sender?.userId?.toString(),me=u&&Y===u.toString(),le=u&&_e===u.toString();return`
          <div class="bonding-msg-row ${s?"self":"other"}" data-msg-id="${m._id}">
            <div class="bonding-msg-avatar" title="${h(m.sender?.name||"Teammate")}">
              ${(m.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${h(m.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${Q(m.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${m._id}" title="Delete Challenge Message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${F}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${h(O)}</h4>
                    <p class="game-bubble-desc">${h(m.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${C.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':C.status==="active"||C.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${h(C.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${C.status==="pending"&&me?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${q}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${q}" data-action="decline">
                        Decline
                      </button>
                    `:C.status==="pending"&&le?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${q}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${q}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${ce(m)}
            </div>
          </div>
        `}const r=h(m.sender?.name||"Teammate"),x=Q(m.createdAt),B=ce(m);return`
        <div class="bonding-msg-row ${s?"self":"other"}" data-msg-id="${m._id}">
          <div class="bonding-msg-avatar" title="${r}">${r.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${r}</span>
              <span class="bonding-msg-time">${x}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${m._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${h(m.content).replace(/\n/g,"<br/>")}
            </div>
            ${B}
          </div>
        </div>
      `}).join("")}function ce(u){return`
      <div class="bonding-reactions-row">
        ${(u.reactions||[]).map(r=>{const x=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(r.users||[]).some(C=>C.toString()===x?.toString())?"active":""}" data-msg-id="${u._id}" data-emoji="${r.emoji}">
          <span>${r.emoji}</span> <span>${r.users?r.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${u._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function st(u){const m=i.querySelector("#btn-chat-challenge");m&&(m.onclick=()=>{u?R(null,u.userId||u._id):R()});const s=i.querySelector("#btn-manage-members");s&&(s.onclick=G);const r=i.querySelector("#btn-delete-group");r&&(r.onclick=M);const x=i.querySelector("#btn-leave-group");x&&(x.onclick=v);const B=i.querySelector("#btn-delete-direct");B&&(B.onclick=async()=>{if(l&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{B.disabled=!0,await et(`/bonding/channels/${l._id}`),y("1-on-1 chat deleted successfully","success");const O=l._id;c=c.filter(ne=>ne._id!==O),l=c[0]||null,Oe(),Me(),l&&await Fe(l._id)}catch(O){y(O.message||"Could not delete 1-on-1 chat","error"),B.disabled=!1}});const C=i.querySelector("#btn-clear-chat");C&&(C.onclick=async()=>{if(l&&confirm("Are you sure you want to clear all messages in this conversation?"))try{C.disabled=!0,await et(`/bonding/channels/${l._id}/messages`),y("Chat messages cleared","success"),z=[],_()}catch(O){y(O.message||"Could not clear chat messages","error")}finally{C.disabled=!1}})}function ve(u){const m=i.querySelector("#bonding-message-input"),s=i.querySelector("#btn-send-message"),r=i.querySelector("#btn-quick-emoji"),x=i.querySelector("#btn-input-challenge");m&&m.addEventListener("keydown",B=>{B.key==="Enter"&&!B.shiftKey&&(B.preventDefault(),T())}),s&&(s.onclick=T),x&&(x.onclick=()=>{u?R(null,u.userId||u._id):R()}),r&&(r.onclick=()=>{if(!m)return;const B=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],C=B[Math.floor(Math.random()*B.length)];m.value+=(m.value?" ":"")+C,m.focus()})}function p(){i.querySelectorAll(".btn-respond-invite").forEach(r=>{r.onclick=async()=>{const x=r.dataset.inviteId,B=r.dataset.action;await A(x,B)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(r=>{r.onclick=async()=>{const x=r.dataset.inviteId;try{r.disabled=!0;const B=await Re("/bonding/invitations"),C=(B.incoming||[]).concat(B.sent||[]).find(O=>O._id===x);C&&C.matchId?U(C.matchId):y("Match has not started yet or has expired","warning")}catch(B){y(B.message||"Could not load match","error")}finally{r.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(r=>{r.onclick=async x=>{x.stopPropagation();const B=r.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{r.disabled=!0,await et(`/bonding/messages/${B}`),z=z.filter(C=>C._id!==B),o(),y("Message deleted","success")}catch(C){y(C.message||"Failed to delete message","error"),r.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(r=>{r.onclick=async()=>{const x=r.dataset.msgId,B=r.dataset.emoji;await I(x,B)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(r=>{r.onclick=x=>{const B=r.dataset.msgId;te(x.currentTarget,async C=>{await I(B,C)})}})}async function T(){const u=i.querySelector("#bonding-message-input");if(!u||!l||E)return;const m=u.value.trim();if(m)try{E=!0,u.value="";const s=await Ce(`/bonding/channels/${l._id}/messages`,{content:m,type:"text"});z.push(s),_(),a()}catch(s){y(s.message||"Failed to send message","error")}finally{E=!1,u.focus()}}async function I(u,m){try{const s=await Ce(`/bonding/messages/${u}/react`,{emoji:m}),r=z.find(x=>x._id===u);r&&(r.reactions=s,o())}catch(s){y(s.message||"Failed to react","error")}}function a(){const u=i.querySelector("#bonding-messages-feed");u&&(u.scrollTop=u.scrollHeight)}function o(){const u=i.querySelector("#bonding-messages-feed");if(!u)return;const m=u.scrollHeight-u.scrollTop<=u.clientHeight+80;u.innerHTML=ze(),p(),m&&a()}function _(){const u=i.querySelector("#bonding-messages-feed");u&&(u.innerHTML=ze(),p())}async function D(u=!1){const m=i.querySelector("#bonding-lounge-main-wrap");if(m){u||(m.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const s=await Re("/bonding/games/overview");W=s;const r=s.myStats||{},x=s.availableGames||[],B=s.incomingChallenges||[],C=s.sentChallenges||[],O=s.activeMatches||[],ne=s.recentMatches||[],F=e?._id||e?.id;m.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${r.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${r.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${r.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${r.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${r.gamesPlayed>0?Math.round((r.wins||0)/r.gamesPlayed*100):0}%</span>
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
              ${x.map(q=>`
                <div class="lounge-game-card" data-game-id="${q.id}">
                  <div class="game-card-icon">${q.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${h(q.name)}</h4>
                    <p class="game-card-desc">${h(q.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${q.duration}</span>
                      ${q.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${q.id}" data-game-title="${h(q.name)}">
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
                <span class="badge blue">${B.length+C.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${B.length})</h5>
              ${B.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${B.map(q=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(q.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${h(q.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${h(q.sender.name)}</strong> (${h(q.sender.role)})</span>
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
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${C.length})</h5>
              ${C.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${C.map(q=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(q.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${h(q.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${h(q.recipient.name)}</strong></span>
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
                    ${O.map(q=>{const _e=(q.players||q.gameState?.players||[q.player1,q.player2].filter(Boolean)).filter(K=>K.userId&&K.userId.toString()!==F?.toString()),me=q.player1?.userId?.toString()===F?.toString()?q.player2:q.player1,le=_e.length>0?_e.map(K=>h(K.name)).join(", "):me?.name?h(me.name):"Colleagues",ue=F&&q.currentTurnUserId&&q.currentTurnUserId.toString()===F.toString();return`
                        <div class="lounge-active-match-card ${ue?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${q.gameType==="chess"?"♟️":q.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${h(q.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${le}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ue?"my-turn":"wait"}">
                              ${ue?"⚡ Your Turn!":"⏳ Opponent Turn"}
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
              ${ne.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${ne.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${ne.map(q=>{const _e=F&&q.player1.userId.toString()===F.toString()?q.player2:q.player1,me=F&&q.winnerId&&q.winnerId.toString()===F.toString(),le=q.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${h(q.gameTitle)}</span>
                          <span class="recent-date">${Q(q.completedAt||q.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${q._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${h(_e.name)}</strong></div>
                          <div class="recent-outcome ${me?"win":le?"draw":"loss"}">
                            ${me?"🏆 VICTORY":le?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${h(q.winningReason||q.status)})</span>
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
      `,$()}catch(s){m.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${h(s.message)}</p>
        </div>
      `}}}function $(){i.querySelectorAll(".btn-challenge-game").forEach(m=>{m.onclick=()=>{const s=m.dataset.gameId;R(s)}}),i.querySelectorAll(".btn-respond-invite").forEach(m=>{m.onclick=async()=>{const s=m.dataset.inviteId,r=m.dataset.action;await A(s,r),await D()}}),i.querySelectorAll(".btn-resume-match").forEach(m=>{m.onclick=()=>{const s=m.dataset.matchId;U(s)}}),i.querySelectorAll(".btn-recent-rematch").forEach(m=>{m.onclick=async()=>{const s=m.dataset.matchId;try{m.disabled=!0;const r=await Ce(`/bonding/matches/${s}/action`,{action:"rematch"});r.match&&(y("Rematch created! Opening arena ⚔️","success"),U(r.match._id))}catch(r){y(r.message||"Could not start rematch","error")}finally{m.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(m=>{m.onclick=async s=>{s.stopPropagation();const r=m.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{m.disabled=!0,await et(`/bonding/matches/${r}`),y("Match deleted successfully","success"),await D()}catch(x){y(x.message||"Failed to delete match","error")}finally{m.disabled=!1}}});const u=i.querySelector("#btn-clear-matches");u&&(u.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{u.disabled=!0,await et("/bonding/matches?filter=completed"),y("Completed matches history cleared","success"),await D()}catch(m){y(m.message||"Failed to clear matches","error")}finally{u.disabled=!1}})}function R(u=null,m=null){const s=i.querySelector("#bonding-modals-root"),r=e?._id||e?.id,x=new Set(["employee","admin","superadmin"]),B=n.filter(me=>!me.isSelf&&me._id.toString()!==r?.toString()&&x.has(me.role));let C=u||"chess",O=m?m.toString():null,ne=2,F=O?[O]:[],q="none";function Y(){const me=B.find(re=>re._id.toString()===O),le=C==="ludo",ue=ne-1,K=F.length===ue;s.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${le?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${C==="chess"?"active":""}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${C==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                  <button class="game-pill-btn ${C==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                </div>
              </div>

              <!-- LUDO SPECIAL: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${le?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${ne===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${ne===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${ne===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${le?`Step 3 — Select Colleagues to Play With (${F.length}/${ue} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${B.map(re=>{const be=le?F.includes(re._id.toString()):O===re._id.toString();return`
                      <div class="eligible-emp-item ${be?"selected":""}" data-user-id="${re._id}">
                        <div class="emp-item-avatar">${re.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${h(re.name)}</span>
                          <span class="emp-item-role">${h(re.role==="superadmin"?"Superadmin":re.role==="admin"?"Admin":"Employee")} · ${h(re.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${be?"active":""}">
                          ${be?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Step for Chess timers -->
              ${C==="chess"?`
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
                  <div><strong>Game:</strong> ${le?`🎲 Ludo (${ne} Players · 4 Pawns per base)`:C==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${le?`
                    <div><strong>Opponents:</strong> ${F.length>0?F.map(re=>{const be=B.find(de=>de._id.toString()===re);return be?`<strong>${h(be.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+ue+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${me?`<strong>${h(me.name)}</strong> (${h(me.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${C==="chess"?`<div><strong>Time Control:</strong> ${q==="none"?"Untimed":q}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(le?!K:!O)?"disabled":""}>
                ${le?`Start ${ne}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,_e()}function _e(){s.querySelector(".bonding-modal-close").onclick=()=>{s.innerHTML=""},s.querySelector("#btn-cancel-challenge-flow").onclick=()=>{s.innerHTML=""},s.querySelectorAll(".game-pill-btn").forEach(ue=>{ue.onclick=()=>{C=ue.dataset.game,Y()}}),s.querySelectorAll(".ludo-mode-btn").forEach(ue=>{ue.onclick=()=>{ne=Number(ue.dataset.count),F=F.slice(0,ne-1),Y()}});const me=s.querySelector("#flow-emp-search");me&&(me.oninput=ue=>{const K=ue.target.value.toLowerCase().trim();s.querySelectorAll(".eligible-emp-item").forEach(re=>{const be=re.textContent.toLowerCase();re.style.display=be.includes(K)?"flex":"none"})}),s.querySelectorAll(".eligible-emp-item").forEach(ue=>{ue.onclick=()=>{const K=ue.dataset.userId;if(C==="ludo"){const re=ne-1;F.includes(K)?F=F.filter(be=>be!==K):F.length<re?F.push(K):F[re-1]=K}else O=K;Y()}}),s.querySelectorAll('input[name="timerMode"]').forEach(ue=>{ue.onchange=K=>{q=K.target.value,Y()}});const le=s.querySelector("#btn-submit-challenge-flow");le&&(le.onclick=async()=>{if(C==="ludo"){const ue=ne-1;if(F.length<ue){y(`Please select ${ue} colleague(s) to play with`,"warning");return}try{le.disabled=!0,le.textContent="Launching Match...";const K=await Ce("/bonding/matches/instant-ludo",{playerCount:ne,targetUserIds:F});s.innerHTML="",y(`Ludo match started (${ne} Players)! 🎲`,"success"),K&&K._id&&U(K._id)}catch(K){y(K.message||"Failed to start Ludo match","error"),le.disabled=!1,le.textContent=`Start ${ne}P Ludo Match 🎲`}return}if(!O){y("Please select an employee to challenge","warning");return}try{le.disabled=!0,le.textContent="Sending Challenge...",await Ce("/bonding/invitations",{gameType:C,targetUserId:O,matchSettings:{timerMode:q},channelId:null}),y("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),s.innerHTML="",await loadChannels();const ue=c.find(K=>K.type==="direct"&&K.members?.some(re=>(re.userId||re._id)?.toString()===O));ue?selectChannel(ue):l&&await Fe(l._id),b==="lounge_games"&&await D()}catch(ue){y(ue.message||"Could not send challenge","error"),le.disabled=!1,le.textContent="Send Challenge 🚀"}})}Y()}async function A(u,m){if(!(!u||!m))try{const s=await Yt(`/bonding/invitations/${u}/respond`,{action:m});m==="accept"?(y("Challenge accepted! Entering match arena ⚔️","success"),s.match&&U(s.match._id)):m==="decline"?(y("Challenge declined","info"),i.querySelectorAll(`[data-invite-id="${u}"]`).forEach(r=>{const x=r.closest(".lounge-invite-item")||r.closest(".bonding-msg-row");x&&x.remove()})):m==="cancel"&&(y("Challenge cancelled","info"),i.querySelectorAll(`[data-invite-id="${u}"]`).forEach(r=>{const x=r.closest(".lounge-invite-item")||r.closest(".bonding-msg-row");x&&x.remove()})),l&&await Fe(l._id),b==="lounge_games"&&await D()}catch(s){y(s.message||"Action failed","error")}}async function U(u){if(!u)return;j=u,N&&clearInterval(N);const m=i.querySelector("#bonding-modals-root");let s=null,r=null,x=[],B="",C=null,O=!1;function ne(K){return K?JSON.stringify({status:K.status,turn:K.currentTurnUserId?.toString(),turnColor:K.turn,movesCount:K.moves?.length,dice:K.gameState?.dice,rolled:K.gameState?.rolled,lastRoll:K.gameState?.lastRoll,lastRollColor:K.gameState?.lastRollColor,lastRollBy:K.gameState?.lastRollBy,lastActionText:K.gameState?.lastActionText,tokens:K.gameState?.tokens,board:K.gameState?.board,grid:K.gameState?.grid,fen:K.gameState?.fen,draw:K.drawOfferedBy?.toString()}):""}async function F(){try{return s=await Re(`/bonding/matches/${u}`),s}catch(K){return y(K.message||"Could not load match","error"),q(),null}}if(s=await F(),!s)return;B=ne(s);function q(){N&&clearInterval(N),C&&clearTimeout(C),O=!1,j=null,m.innerHTML="",b==="lounge_games"&&D(!0),l&&Fe(l._id,!0)}N=setInterval(async()=>{if(!j||j!==u){clearInterval(N);return}try{const K=await Re(`/bonding/matches/${u}`);if(!K)return;const re=ne(K);re!==B&&(B=re,s=K,Y())}catch{}},1e3);function Y(){if(!s)return;const K=e?._id||e?.id,re=K&&s.player1.userId.toString()===K.toString(),be=re?s.player1:s.player2,de=re?s.player2:s.player1,he=K&&s.currentTurnUserId&&s.currentTurnUserId.toString()===K.toString(),De=s.status!=="active";m.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${s.gameType==="ludo"?"🎲":s.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${h(s.gameTitle)}</h3>
                  ${s.gameType==="ludo"&&s.gameState?.players?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${s.gameState.players.map(Be=>{const Ge=Be.userId&&Be.userId.toString()===K?.toString(),Le={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Be.color]||"⚪",pe=(s.gameState?.turnColor||s.turn)===Be.color;return`
                          <span class="player-tag ${Ge?"self":"opp"} ${pe?"turn-active":""}">
                            ${Le} <strong>${h(Be.name)}</strong> ${Ge?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${h(be.name)} (You · <strong>${s.gameType==="ludo"?be.assignedRole==="red"?"🔴 Red":"🟢 Green":s.gameType==="tictactoe"?be.assignedRole==="X"?"✕":"◯":be.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${h(de.name)} (<strong>${s.gameType==="ludo"?de.assignedRole==="red"?"🔴 Red":"🟢 Green":s.gameType==="tictactoe"?de.assignedRole==="X"?"✕":"◯":de.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${De?"ended":he?"my-turn":"opp-turn"}">
                ${De?`<span>🏁 Finished (${h(s.winningReason||s.status)})</span>`:he?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${h(de.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${s.gameType==="ludo"?he?s.gameState?.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":s.gameType==="tictactoe"?he?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":he?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${De?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${s.drawOfferedBy&&s.drawOfferedBy.toString()!==K?.toString()&&!De?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${h(de.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${s.gameType==="chess"?_e(re):""}
              ${s.gameType==="tictactoe"?me():""}
              ${s.gameType==="ludo"?le(re):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${De?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${s.winnerId&&s.winnerId.toString()===K?.toString()?"🏆":s.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${s.winnerId&&s.winnerId.toString()===K?.toString()?"VICTORY!":s.status==="draw"?"STALEMATE / DRAW":`${h(s.winnerName)} Wins!`}</h4>
                  <p>Reason: ${h(s.winningReason||"Match concluded")}</p>
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
      `,ue(he,re,be)}function _e(K){const re=s.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",be=new ka(re),de=K?s.player1.assignedRole==="white":s.player2.assignedRole==="white",he={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},De=de?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Be=de?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Ge='<div class="chess-board-grid">';for(const Ee of Be)for(const Ue of De){const Ne=`${Ue}${Ee}`,Pe=be.get(Ne),Ae=(Ue.charCodeAt(0)-97+Ee)%2!==0,Ie=r===Ne,ke=x.includes(Ne),fe=Pe?Pe.color==="w"?he[Pe.type.toUpperCase()]:he[Pe.type]:"";Ge+=`
            <div class="chess-sq ${Ae?"light":"dark"} ${Ie?"selected":""} ${ke?"legal-dot":""}" data-square="${Ne}">
              ${fe?`<span class="chess-piece ${Pe.color==="w"?"white-piece":"black-piece"}">${fe}</span>`:""}
            </div>
          `}Ge+="</div>";const pe=(s.moves||[]).map(Ee=>`
        <span class="chess-move-token">${Ee.moveNum}. ${Ee.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${Ge}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${pe||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function me(){const K=s.gameState?.board||Array(9).fill(null),re=s.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${K.map((be,de)=>{const he=re.includes(de);return`
                <div class="ttt-cell ${be?"filled":"empty"} ${he?"win-cell":""}" data-cell-idx="${de}">
                  ${be==="X"?'<span class="ttt-x">✕</span>':be==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function le(K,re,be){const de=s.gameState||{},he=de.activeColors||["red","green"],De=de.players||[{...s.player1,color:"red",assignedRole:"red",isBot:!1},{...s.player2,color:"green",assignedRole:"green",isBot:!1}],Be=de.tokens||{},Ge=P=>{const ie=Be[P]||(P==="red"?de.p1Tokens:P==="green"?de.p2Tokens:[])||[];return Array.from({length:4},(xe,Se)=>ie[Se]||{id:Se,step:-1})},Le=Ge("red"),pe=Ge("green"),Ee=Ge("yellow"),Ue=Ge("blue"),Ne=e?._id||e?.id,Ae=(De.find(P=>P.userId&&P.userId.toString()===Ne?.toString())||De[0])?.color||(K?"red":"green"),Ie=de.turnColor||s.turn||"red",ke=Ae===Ie&&s.status==="active",fe=!!de.rolled,L=de.dice,H=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],g=[[7,1],[7,2],[7,3],[7,4],[7,5]],Te=[[1,7],[2,7],[3,7],[4,7],[5,7]],we=[[7,13],[7,12],[7,11],[7,10],[7,9]],lt=[[13,7],[12,7],[11,7],[10,7],[9,7]],V=[0,8,13,21,26,34,39,47];function ht(P,ie){return ie<0?null:ie>=56?P==="red"?[7,6]:P==="green"?[6,7]:P==="yellow"?[7,8]:[8,7]:P==="red"?ie<=50?H[ie]:g[ie-51]:P==="green"?ie<=50?H[(13+ie)%52]:Te[ie-51]:P==="yellow"?ie<=50?H[(26+ie)%52]:we[ie-51]:ie<=50?H[(39+ie)%52]:lt[ie-51]}function qe(P,ie){return P!==Ae||!ke||!fe||!L||s.status!=="active"?!1:ie.step===-1?L===6:ie.step>=0&&ie.step+L<=56}const at={},Ct=(P,ie)=>{ie.forEach(xe=>{if(xe.step>=0&&xe.step<56){const Se=ht(P,xe.step);if(Se){const f=Se[0]+","+Se[1];(at[f]=at[f]||[]).push({color:P,id:xe.id,step:xe.step,movable:qe(P,xe)})}}})};he.includes("red")&&Ct("red",Le),he.includes("green")&&Ct("green",pe),he.includes("yellow")&&Ct("yellow",Ee),he.includes("blue")&&Ct("blue",Ue);const Qe={};H.forEach(([P,ie],xe)=>{Qe[P+","+ie]=xe});const It={};g.forEach(([P,ie],xe)=>{It[P+","+ie]=xe+1});const Dt={};Te.forEach(([P,ie],xe)=>{Dt[P+","+ie]=xe+1});const ae={};we.forEach(([P,ie],xe)=>{ae[P+","+ie]=xe+1});const Bt={};lt.forEach(([P,ie],xe)=>{Bt[P+","+ie]=xe+1});const Pt=[];for(let P=0;P<15;P++)for(let ie=0;ie<15;ie++){if(P<6&&ie<6||P<6&&ie>8||P>8&&ie<6||P>8&&ie>8||P>=6&&P<=8&&ie>=6&&ie<=8)continue;const xe=P+","+ie,Se=Qe[xe],f=Se!==void 0&&V.includes(Se),w=P===6&&ie===1,k=P===1&&ie===8,J=P===8&&ie===13,Z=P===13&&ie===6,$e=It[xe],pt=Dt[xe],Tt=ae[xe],Sa=Bt[xe];let dt="ludo-cell";w?dt+=" cell-red-start":k?dt+=" cell-green-start":J?dt+=" cell-yellow-start":Z?dt+=" cell-blue-start":$e?dt+=" cell-red-stretch":pt?dt+=" cell-green-stretch":Tt?dt+=" cell-yellow-stretch":Sa?dt+=" cell-blue-stretch":f&&(dt+=" cell-safe-star");const Ca=at[xe]||[];Pt.push(`
            <div class="${dt}" style="grid-row:${P+1};grid-column:${ie+1}" data-pos="${xe}">
              ${f?'<span class="cell-star-glyph">⭐</span>':""}
              ${w||k||J||Z?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Ca.map(yt=>`
                <div class="ludo-token token-${yt.color} ${yt.movable?"movable":""}" data-token-id="${yt.id}" data-color="${yt.color}" title="${yt.color.toUpperCase()} Pawn ${yt.id+1}">
                  <span>${yt.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function Zt(P){const ie=Math.max(1,Math.min(6,Number(P)||1)),xe={1:[[30,30,7.5,"#ef4444"]],2:[[16,16,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],3:[[16,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],4:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],5:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],6:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,30,5.5,"#1e293b"],[44,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]]},f=(xe[ie]||xe[6]).map(([w,k,J,Z])=>`
          <g>
            <circle cx="${w}" cy="${k+1.2}" r="${J}" fill="#94a3b8" opacity="0.5"/>
            <circle cx="${w}" cy="${k}" r="${J}" fill="${Z}"/>
            <circle cx="${w-J*.3}" cy="${k-J*.3}" r="${J*.35}" fill="#ffffff" opacity="0.6"/>
          </g>
        `).join("");return`
          <svg viewBox="0 0 60 60" width="52" height="52" class="ludo-dice-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dice face ${ie}">
            <g class="die-pips-layer">
              ${f}
            </g>
          </svg>
        `}function vt(P,ie,xe,Se,f){const w=`${P}-yard`;if(!xe)return`
            <div class="ludo-yard ${w}">
              <div class="yard-box decorative">
                <div class="yard-title">${ie} (Inactive)</div>
              </div>
            </div>
          `;const k=f.filter(J=>J.step===56).length;return`
          <div class="ludo-yard ${w} ${Ie===P?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${ie}</span>
                ${k>0?`<span class="yard-home-badge" title="${k} of 4 pawns reached Home!">👑 ${k}/4 Home</span>`:""}
                ${Se?`<small class="yard-player-lbl">${h(Se.name)}${Se.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${f.map((J,Z)=>`
                  <div class="yard-token-slot ${J.step===56?"slot-home":""}">
                    ${J.step===-1?`
                      <div class="ludo-token token-${P} ${qe(P,J)?"movable":""}" data-token-id="${J.id}" data-color="${P}" title="${P.toUpperCase()} Pawn ${J.id+1}">
                        <span>${J.id+1}</span>
                      </div>
                    `:J.step===56?`
                      <div class="ludo-token token-reached-home token-${P}" title="${P.toUpperCase()} Pawn ${J.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${J.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${Z+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Nt=De.find(P=>P.color==="red"),jt=De.find(P=>P.color==="green"),ea=De.find(P=>P.color==="yellow"),Ot=De.find(P=>P.color==="blue"),Ft=De.find(P=>P.color===Ie)||(Ie==="red"?Nt:jt),_t=Ft?h(Ft.name):Ie.toUpperCase(),Lt={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Ie]||"🔴",gt=L||de.lastRoll||6,xt=ke&&!fe&&s.status==="active",Ht=Ge(Ae).filter(P=>qe(Ae,P));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${vt("red","🔴 Red Base",he.includes("red"),Nt,Le)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${vt("green","🟢 Green Base",he.includes("green"),jt,pe)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${vt("blue","🔵 Blue Base",he.includes("blue"),Ot,Ue)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${vt("yellow","🟡 Yellow Base",he.includes("yellow"),ea,Ee)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${Le.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn red" title="Red Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${pe.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn green" title="Green Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${Ee.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${Ue.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn blue" title="Blue Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...Le.filter(P=>P.step===56).map(P=>({col:"red",id:P.id})),...pe.filter(P=>P.step===56).map(P=>({col:"green",id:P.id})),...Ee.filter(P=>P.step===56).map(P=>({col:"yellow",id:P.id})),...Ue.filter(P=>P.step===56).map(P=>({col:"blue",id:P.id}))].map(P=>`
                    <div class="tok-home-champion ${P.col}" title="${P.col.toUpperCase()} Pawn ${P.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${P.id+1}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Pt.join("")}
          </div>

          <!-- Ludo Action & 3D Interactive Dice Console (Clickable dice replaces text button, opponent dice visible!) -->
          <div class="ludo-interactive-console">
            <div class="ludo-dice-interactive-box">
              <div 
                class="ludo-3d-dice ${xt?"clickable pulse-roll":""} ${fe?"just-rolled":""} border-${Ie}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${xt?"0":"-1"}"
                title="${xt?"Click Dice to Roll!":ke?"Choose a pawn to move":`${_t}'s turn`}"
              >
                ${Zt(gt)}
              </div>
              <div class="ludo-dice-action-badge">
                ${xt?'<button class="badge-click-roll btn-dice-roll-badge" id="btn-interactive-ludo-dice-badge" type="button" title="Tap to Roll">🎲 TAP TO ROLL</button>':fe?`<span class="badge-rolled-val">${Lt} Rolled ${gt}</span>`:de.lastRoll?`<span class="badge-last-roll">${Lt} Rolled ${de.lastRoll}</span>`:'<span class="badge-waiting">Ready</span>'}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${Ie}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${_t}</strong> (${Ie.toUpperCase()})
                </span>
                ${ke?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${ke&&fe?"highlight":""}">
                ${ke&&!fe&&s.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":ke&&fe&&s.status==="active"?Ht.length>0?Ht.length===1?`🎲 Rolled <strong>${gt}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${gt}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${gt}</strong>. No legal moves possible — turn passing...`:s.status==="active"?fe||de.lastRoll?`🎲 ${Lt} <strong>${_t}</strong> rolled <strong>${gt}</strong>!`:`⏳ Waiting for <strong>${_t}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${h(de.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function ue(K,re,be){m.querySelector("#btn-close-arena").onclick=q;const de=m.querySelector("#btn-arena-resign");de&&(de.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{de.disabled=!0,await Ce(`/bonding/matches/${u}/action`,{action:"resign"}),await F(),Y()}catch(pe){y(pe.message||"Resign failed","error"),de.disabled=!1}});const he=m.querySelector("#btn-arena-draw");he&&(he.onclick=async()=>{try{await Ce(`/bonding/matches/${u}/action`,{action:"offer_draw"}),y("Draw offer sent to opponent","info"),await F(),Y()}catch(pe){y(pe.message||"Draw offer failed","error")}});const De=m.querySelector("#btn-confirm-accept-draw");De&&(De.onclick=async()=>{try{await Ce(`/bonding/matches/${u}/action`,{action:"accept_draw"}),y("Draw agreed!","info"),await F(),Y()}catch(pe){y(pe.message,"error")}});const Be=m.querySelector("#btn-confirm-decline-draw");Be&&(Be.onclick=async()=>{try{await Ce(`/bonding/matches/${u}/action`,{action:"decline_draw"}),await F(),Y()}catch(pe){y(pe.message,"error")}}),[m.querySelector("#btn-arena-delete-match"),m.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(pe=>{pe.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{pe.disabled=!0,await et(`/bonding/matches/${u}`),y("Match deleted","success"),q(),b==="lounge_games"&&await D()}catch(Ee){y(Ee.message||"Failed to delete match","error"),pe.disabled=!1}}});const Le=m.querySelector("#btn-arena-rematch-action");if(Le&&(Le.onclick=async()=>{try{Le.disabled=!0,Le.textContent="Creating Rematch...";const pe=await Ce(`/bonding/matches/${u}/action`,{action:"rematch"});pe.match&&(y("Rematch created! New match live ⚔️","success"),N&&clearInterval(N),U(pe.match._id))}catch(pe){y(pe.message||"Rematch failed","error"),Le.disabled=!1,Le.textContent="🔄 Request Rematch"}}),s.gameType==="chess"&&K&&s.status==="active"){const pe=s.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Ee=new ka(pe),Ue=be.assignedRole==="white"?"w":"b";m.querySelectorAll(".chess-sq").forEach(Ne=>{Ne.onclick=async()=>{const Pe=Ne.dataset.square;if(r){if(r===Pe){r=null,x=[],Y();return}if(x.includes(Pe)){const Ie=Ee.get(r);let ke;Ie&&Ie.type==="p"&&(Pe.endsWith("8")||Pe.endsWith("1"))&&(ke=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const fe={from:r,to:Pe,promotion:ke?ke.toLowerCase():void 0};r=null,x=[],s=await Ce(`/bonding/matches/${u}/move`,{move:fe}),Y()}catch(fe){y(fe.message||"Illegal chess move","error"),r=null,x=[],Y()}return}}const Ae=Ee.get(Pe);Ae&&Ae.color===Ue?(r=Pe,x=Ee.moves({square:Pe,verbose:!0}).map(ke=>ke.to),Y()):(r=null,x=[],Y())}})}if(s.gameType==="tictactoe"&&K&&s.status==="active"&&m.querySelectorAll(".ttt-cell.empty").forEach(pe=>{pe.onclick=async()=>{const Ee=pe.dataset.cellIdx;try{pe.style.opacity="0.5",s=await Ce(`/bonding/matches/${u}/move`,{cellIndex:Number(Ee)}),Y()}catch(Ue){y(Ue.message||"Invalid move","error")}}}),s.gameType==="ludo"&&s.status==="active"){const pe=s.gameState||{},Ee=!!pe.rolled,Ue=pe.turnColor||s.turn||"red",Ne=s.player1.userId.toString()===myId?.toString()?s.player1.assignedRole||"red":s.player2.userId.toString()===myId?.toString()?s.player2.assignedRole||"green":(pe.players||[]).find(ke=>ke.userId?.toString()===myId?.toString())?.color||"red",Pe=K&&Ue===Ne,Ae=m.querySelector("#btn-interactive-ludo-dice"),Ie=m.querySelector("#btn-interactive-ludo-dice-badge");if(Pe&&!Ee){const ke=async()=>{if(!(Ae&&Ae.dataset.rolling==="true")){Ae&&(Ae.dataset.rolling="true",Ae.classList.add("rolling")),Ie&&(Ie.disabled=!0);try{const fe=await Ce(`/bonding/matches/${u}/move`,{action:"roll"});s=fe,B=ne(fe),Y()}catch(fe){y(fe.message||"Failed to roll","error"),Ae&&(Ae.classList.remove("rolling"),delete Ae.dataset.rolling),Ie&&(Ie.disabled=!1)}}};Ae&&(Ae.onclick=ke,Ae.onkeydown=fe=>{(fe.key==="Enter"||fe.key===" ")&&(fe.preventDefault(),ke())}),Ie&&(Ie.onclick=ke)}if(Pe&&Ee){const fe=(pe.tokens||{})[Ne]||[],L=pe.dice||pe.lastRoll||0,H=fe.filter(g=>g.step===-1&&L===6||g.step>=0&&g.step+L<=56);if(H.length===1&&!O){O=!0;const g=H[0];C&&clearTimeout(C),C=setTimeout(async()=>{try{const Te=await Ce(`/bonding/matches/${u}/move`,{action:"move",tokenId:Number(g.id)});s=Te,B=ne(Te),O=!1,Y()}catch(Te){O=!1,y(Te.message||"Auto-move failed","error")}},400)}}Pe&&Ee&&m.querySelectorAll(".ludo-token.movable").forEach(ke=>{ke.onclick=async fe=>{fe.stopPropagation();const L=ke.dataset.tokenId;try{ke.style.opacity="0.5";const H=await Ce(`/bonding/matches/${u}/move`,{action:"move",tokenId:Number(L)});s=H,B=ne(H),Y()}catch(H){y(H.message||"Invalid token move","error"),ke.style.opacity="1"}}})}}Y()}function G(){if(!l||l.type==="direct")return;const u=i.querySelector("#bonding-modals-root"),m=F=>F==="employee"||F==="admin"||F==="superadmin",s=l.members||[],r=new Set(s.map(F=>F.userId?.toString())),x=n.filter(F=>m(F.role)&&!r.has(F._id.toString()));u.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${h(l.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${x.map(F=>`
                    <option value="${F._id}">${h(F.name)} (${h(F.role==="superadmin"?"Superadmin":F.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${x.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${x.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${s.length}):</label>
              <div class="bonding-members-list">
                ${s.map(F=>{const q=e?._id||e?.id,Y=q&&F.userId&&F.userId.toString()===q.toString(),_e=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(q),me=d==="superadmin"||e?.role==="superadmin",le=_e||me;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(F.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${h(F.name)} ${Y?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${h(F.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${Y?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${F.userId}">
                            🚪 Leave Group
                          </button>
                        `:le?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${F.userId}" data-name="${h(F.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const F=e?._id||e?.id,q=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(F),Y=d==="superadmin"||e?.role==="superadmin";return q||Y?`
                <!-- Delete Group Option in Modal (Creator only) -->
                <div class="bonding-danger-zone">
                  <div class="danger-zone-text">
                    <strong>Delete Group</strong>
                    <span>Permanently delete this group lounge and remove all its messages.</span>
                  </div>
                  <button class="bonding-btn-danger" id="btn-modal-delete-group">
                    Delete Group
                  </button>
                </div>
              `:`
                <!-- Leave Group Option in Modal (Members) -->
                <div class="bonding-danger-zone">
                  <div class="danger-zone-text">
                    <strong>Leave Group</strong>
                    <span>Exit this group lounge. You can rejoin if invited again.</span>
                  </div>
                  <button class="bonding-btn-danger" id="btn-modal-leave-group">
                    🚪 Leave Group
                  </button>
                </div>
              `})()}
          </div>
        </div>
      </div>
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""};const B=u.querySelector("#btn-modal-delete-group");B&&(B.onclick=()=>{u.innerHTML="",M()});const C=u.querySelector("#btn-modal-leave-group");C&&(C.onclick=()=>{u.innerHTML="",v()}),u.querySelectorAll(".btn-leave-group-action").forEach(F=>{F.onclick=()=>{u.innerHTML="",v()}});const O=u.querySelector("#btn-submit-add-member");O&&(O.onclick=async()=>{const q=u.querySelector("#sel-add-colleague").value;if(!q){y("Please select a colleague to add","warning");return}try{O.disabled=!0,O.textContent="Adding...";const Y=await Yt(`/bonding/channels/${l._id}/members`,{action:"add",userIds:[q]});y("Colleague added to group! 🎉","success"),l=Y.channel,u.innerHTML="",await Fe(l._id),Me()}catch(Y){y(Y.message||"Failed to add member","error"),O.disabled=!1,O.textContent="Add to Group"}}),u.querySelectorAll(".btn-remove-member").forEach(F=>{F.onclick=async()=>{const q=F.dataset.userId,Y=F.dataset.name;if(confirm(`Are you sure you want to remove ${Y} from this group?`))try{F.disabled=!0;const _e=await Yt(`/bonding/channels/${l._id}/members`,{action:"remove",userId:q});y(`${Y} removed from group`,"info"),l=_e.channel,u.innerHTML="",await Fe(l._id),Me()}catch(_e){y(_e.message||"Failed to remove member","error"),F.disabled=!1}}})}async function v(){if(!l||l.type==="direct")return;const u=l.name;if(confirm(`Are you sure you want to leave the group "${u}"?`))try{await Ce(`/bonding/channels/${l._id}/leave`,{}),y(`You left "${u}"`,"info"),c=await Re("/bonding/channels").catch(()=>[]),l=c.find(s=>s.type==="group")||c[0]||null,Oe(),Me(),l&&await Fe(l._id)}catch(s){y(s.message||"Failed to leave group","error")}}async function M(){if(!l||l.type==="direct")return;const u=l.name;if(confirm(`Are you sure you want to delete the group "${u}"?

All messages in this lounge will be deleted.`))try{await et(`/bonding/channels/${l._id}`),y(`Group "${u}" deleted successfully`,"success"),c=await Re("/bonding/channels").catch(()=>[]),l=c.find(s=>s.type==="group")||c[0]||null,Oe(),Me(),l&&await Fe(l._id)}catch(s){y(s.message||"Failed to delete group","error")}}function X(){const u=i.querySelector("#bonding-modals-root"),m=x=>x==="employee"||x==="admin"||x==="superadmin",s=n.filter(x=>!x.isSelf&&m(x.role));u.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${s.map(x=>`
                <div class="bonding-user-pick-item" data-user-id="${x._id}" data-name="${h(x.name)}">
                  <div class="bonding-member-avatar">${x.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${h(x.name)}</span>
                    <span class="user-pick-role">${h(x.role==="superadmin"?"Superadmin":x.role==="admin"?"Admin":"Employee")} · ${h(x.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelectorAll(".bonding-user-pick-item").forEach(x=>{x.onclick=async()=>{const B=x.dataset.userId;try{const C=await Ce("/bonding/channels",{type:"direct",targetUserId:B});u.innerHTML="",c=await Re("/bonding/channels"),l=c.find(O=>O._id===C._id)||C,Oe(),Me(),await Fe(l._id)}catch(C){y(C.message||"Failed to open personal chat","error")}}})}function ee(){const u=i.querySelector("#bonding-modals-root"),m=C=>C==="employee"||C==="admin"||C==="superadmin",s=n.filter(C=>!C.isSelf&&m(C.role));u.innerHTML=`
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
                ${s.map(C=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${C._id}" />
                    <span>${h(C.name)} (${h(C.role==="superadmin"?"Superadmin":C.role==="admin"?"Admin":"Employee")})</span>
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelector("#btn-cancel-create-grp").onclick=()=>{u.innerHTML=""};let r="👥";const x=u.querySelectorAll(".avatar-opt");x.forEach(C=>{C.onclick=()=>{x.forEach(O=>O.classList.remove("active")),C.classList.add("active"),r=C.textContent.trim()}});const B=u.querySelector("#btn-confirm-create-grp");B.onclick=async()=>{const C=u.querySelector("#new-group-name"),O=u.querySelector("#new-group-desc"),ne=C.value.trim();if(!ne){y("Please enter a group name","warning"),C.focus();return}const F=u.querySelectorAll(".new-group-member-chk:checked"),q=Array.from(F).map(Y=>Y.value);try{B.disabled=!0,B.textContent="Creating...";const Y=await Ce("/bonding/channels",{type:"group",name:ne,description:O.value.trim(),avatar:r,memberIds:q});y(`Group "${ne}" created! 🎉`,"success"),u.innerHTML="",c=await Re("/bonding/channels"),l=c.find(_e=>_e._id===Y._id)||Y,Oe(),Me(),await Fe(l._id)}catch(Y){y(Y.message||"Failed to create group","error"),B.disabled=!1,B.textContent="Create Group 🎉"}}}function te(u,m){const s=document.querySelector(".bonding-emoji-popup");s&&s.remove();const r=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],x=document.createElement("div");x.className="bonding-emoji-popup",x.innerHTML=r.map(O=>`<button class="emoji-opt-btn" data-e="${O}">${O}</button>`).join("");const B=u.getBoundingClientRect();x.style.top=`${B.bottom+window.scrollY+6}px`,x.style.left=`${B.left+window.scrollX}px`,document.body.appendChild(x),x.querySelectorAll(".emoji-opt-btn").forEach(O=>{O.onclick=ne=>{ne.stopPropagation(),m(O.dataset.e),x.remove()}});const C=O=>{x.contains(O.target)||(x.remove(),document.removeEventListener("click",C))};setTimeout(()=>document.addEventListener("click",C),10)}function Q(u){if(!u)return"";try{return new Date(u).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Za(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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

    /* ── Ludo Interactive 3D Dice Console ── */
    .ludo-interactive-console {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      max-width: 440px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 14px;
      padding: 12px 16px;
      box-sizing: border-box;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }

    [data-theme="dark"] .ludo-interactive-console {
      background: #151f32;
      border-color: #2b3952;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }

    .ludo-dice-interactive-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .ludo-3d-dice {
      position: relative;
      width: 64px;
      height: 64px;
      background: linear-gradient(145deg, #ffffff 0%, #f8fafc 55%, #e2e8f0 100%) !important;
      border-radius: 14px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 6px 0 #cbd5e1, 0 10px 20px rgba(0, 0, 0, 0.25), inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 4px rgba(0, 0, 0, 0.08) !important;
      border: 3px solid #cbd5e1 !important;
      cursor: default;
      transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease, border-color 0.2s ease;
      user-select: none;
      box-sizing: border-box !important;
    }

    [data-theme="dark"] .ludo-3d-dice {
      background: linear-gradient(145deg, #ffffff 0%, #f1f5f9 60%, #cbd5e1 100%) !important;
      box-shadow: 0 6px 0 #94a3b8, 0 12px 24px rgba(0, 0, 0, 0.55), inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 4px rgba(0, 0, 0, 0.1) !important;
    }

    .ludo-3d-dice.clickable {
      cursor: pointer !important;
    }

    .ludo-3d-dice.clickable:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 9px 0 #cbd5e1, 0 14px 26px rgba(0, 0, 0, 0.3), inset 0 2px 2px rgba(255, 255, 255, 0.95) !important;
    }

    .ludo-3d-dice.clickable:active {
      transform: translateY(3px) scale(0.97);
      box-shadow: 0 2px 0 #cbd5e1, 0 4px 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.8) !important;
    }

    .ludo-3d-dice.pulse-roll {
      animation: diceGlowPulse 1.1s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ludo-3d-dice.border-red {
      border-color: #ef4444 !important;
      box-shadow: 0 6px 0 #dc2626, 0 10px 22px rgba(239, 68, 68, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.95) !important;
    }
    .ludo-3d-dice.border-green {
      border-color: #10b981 !important;
      box-shadow: 0 6px 0 #059669, 0 10px 22px rgba(16, 185, 129, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.95) !important;
    }
    .ludo-3d-dice.border-yellow {
      border-color: #f59e0b !important;
      box-shadow: 0 6px 0 #d97706, 0 10px 22px rgba(245, 158, 11, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.95) !important;
    }
    .ludo-3d-dice.border-blue {
      border-color: #3b82f6 !important;
      box-shadow: 0 6px 0 #2563eb, 0 10px 22px rgba(59, 130, 246, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.95) !important;
    }

    @keyframes diceGlowPulse {
      0% {
        transform: translateY(0) scale(1);
        filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.3));
      }
      50% {
        transform: translateY(-4px) scale(1.06) rotate(-2deg);
        filter: drop-shadow(0 0 14px rgba(59, 130, 246, 0.8));
      }
      100% {
        transform: translateY(0) scale(1) rotate(2deg);
        filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.3));
      }
    }

    .ludo-3d-dice.rolling {
      animation: diceRollingSpin 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes diceRollingSpin {
      0% { transform: scale(1) rotate(0deg); }
      25% { transform: scale(1.2) rotate(120deg) translateY(-8px); }
      50% { transform: scale(0.88) rotate(240deg) translateY(4px); }
      75% { transform: scale(1.12) rotate(320deg) translateY(-2px); }
      100% { transform: scale(1) rotate(360deg) translateY(0); }
    }

    .ludo-dice-svg {
      display: block !important;
      width: 52px !important;
      height: 52px !important;
      pointer-events: none !important;
      user-select: none !important;
      filter: drop-shadow(0 1px 1px rgba(0,0,0,0.08));
    }

    .ludo-dice-face {
      width: 48px !important;
      height: 48px !important;
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      grid-template-rows: repeat(3, 1fr) !important;
      gap: 3px !important;
      padding: 3px !important;
      box-sizing: border-box !important;
    }

    .ludo-pip {
      display: block !important;
      width: 10px !important;
      height: 10px !important;
      border-radius: 50% !important;
      margin: auto !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      line-height: 0 !important;
      font-size: 0 !important;
    }

    .ludo-pip.ludo-pip-empty {
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      background: transparent !important;
      box-shadow: none !important;
      padding: 0 !important;
      margin: auto !important;
      width: 10px !important;
      height: 10px !important;
    }

    .ludo-pip.ludo-pip-filled {
      visibility: visible !important;
      opacity: 1 !important;
      background: radial-gradient(circle at 35% 35%, #334155, #0f172a) !important;
      box-shadow: inset 0 2px 3px rgba(0,0,0,0.85), 0 1px 1px rgba(255,255,255,0.9) !important;
    }

    .ludo-dice-face.face-1 .ludo-pip.ludo-pip-filled {
      background: radial-gradient(circle at 35% 35%, #ef4444, #b91c1c) !important;
      width: 16px !important;
      height: 16px !important;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(255,255,255,0.8), 0 0 8px rgba(239, 68, 68, 0.45) !important;
    }

    .ludo-dice-action-badge {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      text-align: center;
      white-space: nowrap;
    }

    .badge-click-roll {
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      color: #ffffff !important;
      background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
      padding: 4px 11px !important;
      border-radius: 8px !important;
      border: 1px solid rgba(255, 255, 255, 0.25) !important;
      box-shadow: 0 3px 8px rgba(37, 99, 235, 0.35) !important;
      cursor: pointer !important;
      font-size: 10.5px !important;
      font-weight: 800 !important;
      animation: badgePulse 1.2s infinite alternate !important;
      transition: transform 0.15s ease, box-shadow 0.15s ease !important;
    }

    .badge-click-roll:hover {
      transform: translateY(-1px) scale(1.05) !important;
      box-shadow: 0 5px 12px rgba(37, 99, 235, 0.5) !important;
    }

    .badge-click-roll:active {
      transform: translateY(1px) scale(0.97) !important;
    }

    @keyframes badgePulse {
      from { transform: scale(0.98); opacity: 0.92; }
      to { transform: scale(1.03); opacity: 1; }
    }

    .badge-rolled-val {
      color: #047857 !important;
      background: rgba(16, 185, 129, 0.16) !important;
      padding: 4px 10px !important;
      border-radius: 8px !important;
      border: 1px solid rgba(16, 185, 129, 0.35) !important;
      font-weight: 800 !important;
    }

    [data-theme="dark"] .badge-rolled-val {
      color: #34d399 !important;
      background: rgba(16, 185, 129, 0.2) !important;
    }

    .badge-last-roll {
      color: var(--text-2, #64748b) !important;
      background: var(--bg-card, #e2e8f0) !important;
      padding: 3px 8px !important;
      border-radius: 6px !important;
      border: 1px solid rgba(100, 116, 139, 0.25) !important;
    }

    .badge-waiting {
      color: var(--text-3, #94a3b8);
      font-size: 10px;
    }

    .ludo-console-status-pane {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .ludo-turn-indicator-bar {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
    }

    .ludo-turn-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .ludo-turn-dot.red { background: #ef4444; box-shadow: 0 0 6px #ef4444; }
    .ludo-turn-dot.green { background: #10b981; box-shadow: 0 0 6px #10b981; }
    .ludo-turn-dot.yellow { background: #f59e0b; box-shadow: 0 0 6px #f59e0b; }
    .ludo-turn-dot.blue { background: #3b82f6; box-shadow: 0 0 6px #3b82f6; }

    .ludo-turn-player-tag {
      font-size: 12.5px;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .ludo-turn-player-tag {
      color: #f1f5f9;
    }

    .ludo-guidance-message {
      font-size: 12px;
      color: var(--text-2, #64748b);
      line-height: 1.4;
    }

    .ludo-guidance-message.highlight {
      color: #0284c7;
      font-weight: 700;
    }

    [data-theme="dark"] .ludo-guidance-message.highlight {
      color: #38bdf8;
    }

    .ludo-last-action-caption {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
      background: var(--bg-card, #ffffff);
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid var(--border-sm, #e2e8f0);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-theme="dark"] .ludo-last-action-caption {
      background: #0f172a;
      border-color: #334155;
      color: #94a3b8;
    }

    /* ── Home Finished Celebratory Pawns & Badges ── */
    .yard-home-badge {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 10px;
      font-weight: 800;
      color: #b45309;
      background: #fef3c7;
      border: 1px solid #fde68a;
      padding: 2px 6px;
      border-radius: 10px;
      margin-left: 5px;
    }

    [data-theme="dark"] .yard-home-badge {
      color: #fde047;
      background: rgba(245, 158, 11, 0.2);
      border-color: rgba(245, 158, 11, 0.4);
    }

    .tok-home-champion {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 2px 5px;
      border-radius: 10px;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      border: 1.5px solid #fef08a;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.8), 0 2px 4px rgba(0,0,0,0.3);
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      animation: homePawnGlow 1.5s infinite alternate;
    }

    .home-tri-pawn {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      font-weight: 800;
      padding: 1px 3px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.7);
      color: #fef08a;
      box-shadow: 0 0 6px rgba(245, 158, 11, 0.9);
      z-index: 6;
    }
    .home-triangle.red-tri .home-tri-pawn { left: 4px; top: 35%; }
    .home-triangle.green-tri .home-tri-pawn { top: 4px; left: 35%; }
    .home-triangle.yellow-tri .home-tri-pawn { right: 4px; top: 35%; }
    .home-triangle.blue-tri .home-tri-pawn { bottom: 4px; left: 35%; }

    .ludo-token.token-reached-home {
      background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%) !important;
      border: 2px solid #fef08a !important;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.9), 0 2px 4px rgba(0,0,0,0.4) !important;
      color: #ffffff !important;
      position: relative;
      animation: homePawnGlow 1.4s infinite alternate;
    }
    .home-crown-mini {
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.8));
    }
    .yard-token-slot.slot-home {
      border-color: rgba(245, 158, 11, 0.7) !important;
      background: rgba(245, 158, 11, 0.1) !important;
    }

    @keyframes homePawnGlow {
      from { box-shadow: 0 0 6px #f59e0b; }
      to { box-shadow: 0 0 14px #fbbf24; transform: scale(1.05); }
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
  `,document.head.appendChild(t)}function wa(i){if(!i)return"";const t=h(i),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return t.replace(e,d=>`<a href="${d}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${d} ↗</a>`)}const ca=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],wt=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Mt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ii(i,t={}){const{userRole:e="employee",currentUser:d=null,initialTicketId:b=null}=t,c=e==="superadmin"||e==="admin";if(e==="client"||d&&d.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let l=[],n={},z=[],W=[],S={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},E=null,j="comments",N=!1;i.innerHTML=`
    <div class="ci-360-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="ci-360-header-bar">
        <div class="ci-360-header-left">
          <div class="ci-360-breadcrumb">
            <span class="ci-360-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${c?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="ci-360-title-row">
            <h2 class="ci-360-main-title">🎫 ${c?"Support Tickets Board":"Support Tickets"}</h2>
          </div>
        </div>
        <div class="ci-360-header-actions">
          <button class="btn-ci-360-secondary" id="btn-ci-360-refresh" title="Refresh Board">
            🔄 Refresh
          </button>
          <button class="btn-ci-360-primary" id="btn-ci-360-create-ticket">
            + Create Ticket
          </button>
        </div>
      </div>

      <!-- Stats Overview Ribbon -->
      <div class="ci-360-stats-ribbon" id="ci-360-stats-root">
        <div class="ci-360-stat-card"><span class="ci-360-stat-val">—</span><span class="ci-360-stat-lbl">Loading Stats...</span></div>
      </div>

      <!-- Filter Toolbar -->
      <div class="ci-360-filter-bar">
        <div class="ci-360-filter-left">
          <div class="ci-360-search-wrap">
            <span class="ci-360-search-icon">🔍</span>
            <input type="text" id="ci-360-search-input" class="ci-360-search-input" placeholder="Search ticket (ID, title, description)..." />
          </div>

          <select id="ci-360-filter-priority" class="ci-360-filter-select">
            <option value="all">Priority: All</option>
            <option value="Critical">🔴 Critical</option>
            <option value="High">🟠 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <select id="ci-360-filter-category" class="ci-360-filter-select">
            <option value="all">Category: All</option>
            ${wt.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
          </select>

          <select id="ci-360-filter-job" class="ci-360-filter-select">
            <option value="all">Linked Job: All</option>
          </select>

          <select id="ci-360-filter-assignee" class="ci-360-filter-select">
            <option value="all">Assignee: All</option>
            <option value="unassigned">Unassigned</option>
          </select>

          <button type="button" class="ci-360-pill-filter" id="ci-360-pill-my-issues">
            Only My Issues
          </button>

          <span class="ci-360-clear-filters" id="ci-360-clear-filters" style="display:none;">Clear Filters</span>
        </div>
      </div>

      <!-- Scrum Board Columns Container -->
      <div class="ci-360-board-columns" id="ci-360-board-columns-root">
        <div style="padding:40px;color:#94a3b8;font-size:14px;font-weight:600;">
          Loading Scrum Board...
        </div>
      </div>

      <!-- Modal Injection Root -->
      <div id="ci-360-modals-root"></div>
    </div>
  `,await Promise.all([tt(),Ve(),rt(),St()]),nt(),ot(),Fe(),Me(),b&&st(b);const ge=setInterval(()=>{if(!document.contains(i)){clearInterval(ge);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!E&&ce()},12e3),ye=()=>{document.contains(i)&&!E&&ce()};window.addEventListener("focus",ye);async function Ve(){try{const a=new URLSearchParams;S.search&&a.set("search",S.search),S.priority!=="all"&&a.set("priority",S.priority),S.category!=="all"&&a.set("category",S.category),S.assigneeId!=="all"&&a.set("assigneeId",S.assigneeId),S.jobId&&S.jobId!=="all"&&a.set("jobId",S.jobId),S.reporterId&&S.reporterId!=="all"&&a.set("reporterId",S.reporterId),S.scope==="created"&&a.set("reporterId",d?._id||d?.id),S.scope==="assigned"&&a.set("assigneeId",d?._id||d?.id),S.myIssuesOnly&&a.set("myIssuesOnly","true");const o=await Re("/tickets?"+a.toString());l=Array.isArray(o)?o:[]}catch(a){y(a.message||"Failed to load tickets",!0),l=[]}}async function tt(){try{n=await Re("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function rt(){try{let a;try{a=await Re("/tickets/staff")}catch{a=await Re("/users")}z=(a||[]).filter(o=>o.active!==!1&&o.role!=="client")}catch(a){console.warn("Could not fetch employees:",a),z=[]}}async function St(){try{const a=await Re("/jobs?limit=250");W=Array.isArray(a)?a:a?.jobs||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function nt(){const a=i.querySelector("#ci-360-stats-root");a&&(a.innerHTML=`
      <div class="ci-360-stat-card ${S.status==="all"&&!S.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="ci-360-stat-val">${n.total||0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${S.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${n.toDo||0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${S.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${n.content??(n.inProgress||0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${S.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${n.design||0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${S.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${n.underReview||0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${S.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
        <span class="ci-360-stat-val">${n.readyToLeave??(n.resolved||n.closed||0)}</span>
        <span class="ci-360-stat-lbl">Ready to Leave</span>
      </div>
      <div class="ci-360-stat-card critical" data-stat-filter="critical">
        <span class="ci-360-stat-val">${n.critical||0}</span>
        <span class="ci-360-stat-lbl">Critical 🔴</span>
      </div>
      <div class="ci-360-stat-card overdue" data-stat-filter="overdue">
        <span class="ci-360-stat-val">${n.overdue||0}</span>
        <span class="ci-360-stat-lbl">Overdue ⚠️</span>
      </div>
    `,a.querySelectorAll(".ci-360-stat-card").forEach(o=>{o.onclick=async()=>{const _=o.dataset.statFilter;_==="all"?(S.status="all",S.priority="all"):_==="critical"?(S.priority="Critical",S.status="all"):(S.status=_,S.priority="all"),await ce()}}))}function Fe(){const a=i.querySelector("#ci-360-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${z.map(_=>`
          <option value="${_._id}" ${S.assigneeId===_._id.toString()?"selected":""}>
            ${h(_.name)} (${h(_.role)})
          </option>
        `).join("")}
      `);const o=i.querySelector("#ci-360-filter-job");o&&(o.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${W.map(_=>`
          <option value="${_._id}" ${S.jobId===_._id.toString()?"selected":""}>
            📁 ${h(_.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function ot(){const a=i.querySelector("#ci-360-board-columns-root");if(!a)return;const o={};ca.forEach(_=>{o[_.key]=[]}),l.forEach(_=>{let D=_.status||"To Do";D==="In Progress"?D="Content":D==="Resolved"?D="Under Review":D==="Closed"&&(D="Ready to Leave"),o[D]||(o[D]=[]),o[D].push(_)}),a.innerHTML=ca.map(_=>{const D=o[_.key]||[];return`
        <div class="ci-360-board-column" data-status="${_.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${h(_.label)}</span>
              <span class="ci-360-col-badge">${D.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${_.key}">
            ${D.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:D.map($=>ut($)).join("")}
          </div>
        </div>
      `}).join(""),Oe(),ct()}function ut(a){const o=wt.find(ee=>ee.key===a.category)||wt[0],_=Mt.find(ee=>ee.key===a.priority)||Mt[2],D=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",$=(a.subtasks||[]).filter(ee=>ee.completed).length,R=(a.subtasks||[]).length,A=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],U=d?._id||d?.id,G=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(U)||a.userId&&String(a.userId)===String(U),v=e==="superadmin"||d?.role==="superadmin",M=G||v;let X="";if(A.length===0)X='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const ee=A.slice(0,3),te=A.length-3;X=`
        <div class="ci-360-avatar-group">
          ${ee.map(Q=>`
            <div class="ci-360-avatar" title="Assignee: ${h(Q.name||"Member")} (${h(Q.role||"")})">
              ${(Q.avatar||Q.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${te>0?`
            <div class="ci-360-avatar extra-count" title="${te} more assignees: ${h(A.slice(3).map(Q=>Q.name).join(", "))}">
              +${te}
            </div>
          `:""}
        </div>
      `}return`
      <div class="ci-360-card" draggable="true" data-ticket-id="${a._id}">
        <div class="ci-360-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="ci-360-category-pill ${o.slug}">
              ${o.icon} ${o.label}
            </span>
            ${G?`
              <span class="ci-360-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${a.dueDate?`
              <span class="ci-360-due-pill ${D?"overdue":""}" title="Due Date">
                ${D?"⚠️ ":"📅 "}
                ${new Date(a.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          ${M?`
            <button type="button" class="ci-360-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${h(a.ticketId)}" title="Delete Ticket (${v?"Superadmin":"Creator"})">
              🗑️
            </button>
          `:""}
        </div>

        <div class="ci-360-card-title" title="${h(a.title)}">
          ${h(a.title)}
        </div>

        ${a.jobTitle||a.jobId&&a.jobId.title?`
          <div class="ci-360-card-job-link" title="Linked Internal Job: ${h(a.jobTitle||a.jobId.title)}">
            📁 ${h(a.jobTitle||a.jobId.title)}
          </div>
        `:""}

        ${a.linkUrl||a.links&&a.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${h(a.linkUrl||a.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${h(a.linkUrl||a.links[0]?.url)}">
              🔗 ${a.links&&a.links[0]?.title?h(a.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="ci-360-card-bottom">
          <div class="ci-360-card-id-row">
            <span class="ci-360-pri-icon" title="Priority: ${_.label}">${_.icon}</span>
            <span class="ci-360-ticket-id">${h(a.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${R>0?`
              <span class="ci-360-subtask-badge" title="${$} of ${R} subtasks completed">
                ☑ ${$}/${R}
              </span>
            `:""}
            ${X}
          </div>
        </div>
      </div>
    `}function Oe(){const a=i.querySelectorAll(".ci-360-card"),o=i.querySelectorAll(".ci-360-board-column");a.forEach(_=>{_.ondragstart=D=>{D.dataTransfer.setData("text/plain",_.dataset.ticketId),_.classList.add("dragging")},_.ondragend=()=>{_.classList.remove("dragging")}}),o.forEach(_=>{_.ondragover=D=>{D.preventDefault(),_.classList.add("drag-over")},_.ondragleave=()=>{_.classList.remove("drag-over")},_.ondrop=async D=>{D.preventDefault(),_.classList.remove("drag-over");const $=D.dataTransfer.getData("text/plain"),R=_.dataset.status;if(!$||!R)return;const A=l.find(M=>M._id.toString()===$);if(!A||A.status===R)return;const U=A.status,G=A.assignees?[...A.assignees]:[],v=A.assignee?{...A.assignee}:null;if(A.status=R,R==="Under Review"){const M={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};A.assignee=M,A.assignees=[M]}ot();try{const M=await Ze(`/tickets/${$}/status`,{status:R}),X=R==="Under Review"?`Moved ${M.ticketId} to Under Review (Default assigned to John)`:`Moved ${M.ticketId} to ${R}`;y(X,!1),await ce()}catch(M){y(M.message||"Status update failed",!0),A.status=U,A.assignees=G,A.assignee=v,await ce()}}})}function ct(){i.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async o=>{o.stopPropagation(),o.preventDefault();const _=a.dataset.ticketId,D=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${D}?`)){a.disabled=!0;try{await et(`/tickets/${_}`),y(`Ticket ${D} deleted`,!1),await ce()}catch($){y($.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),i.querySelectorAll(".ci-360-card").forEach(a=>{a.onclick=o=>{if(o.target.tagName==="A"||o.target.closest(".btn-delete-card-ticket"))return;const _=a.dataset.ticketId;st(_)}})}function Me(){const a=i.querySelector("#btn-ci-360-refresh");a&&(a.onclick=async()=>{await ce(),y("Board updated",!1)});const o=i.querySelector("#btn-ci-360-create-ticket");o&&(o.onclick=()=>{I()});const _=i.querySelector("#ci-360-search-input");let D=null;_&&(_.oninput=Q=>{clearTimeout(D),D=setTimeout(async()=>{S.search=Q.target.value.trim(),ze(),await ce()},300)});const $=i.querySelector("#ci-360-filter-priority");$&&($.onchange=async Q=>{S.priority=Q.target.value,ze(),await ce()});const R=i.querySelector("#ci-360-filter-category");R&&(R.onchange=async Q=>{S.category=Q.target.value,ze(),await ce()});const A=i.querySelector("#ci-360-filter-job");A&&(A.onchange=async Q=>{S.jobId=Q.target.value,ze(),await ce()});const U=i.querySelector("#ci-360-filter-assignee");U&&(U.onchange=async Q=>{S.assigneeId=Q.target.value,ze(),await ce()});const G=i.querySelector("#ci-360-pill-my-issues");G&&(G.onclick=async()=>{S.myIssuesOnly=!S.myIssuesOnly,G.classList.toggle("active",S.myIssuesOnly),ze(),await ce()});const v=i.querySelector("#ci-360-pill-scope-all"),M=i.querySelector("#ci-360-pill-scope-assigned"),X=i.querySelector("#ci-360-pill-scope-created"),ee=async Q=>{S.scope=Q,v&&v.classList.toggle("active",Q==="all"),M&&M.classList.toggle("active",Q==="assigned"),X&&X.classList.toggle("active",Q==="created"),ze(),await ce()};v&&(v.onclick=()=>ee("all")),M&&(M.onclick=()=>ee("assigned")),X&&(X.onclick=()=>ee("created"));const te=i.querySelector("#ci-360-clear-filters");te&&(te.onclick=async()=>{S={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},_&&(_.value=""),$&&($.value="all"),R&&(R.value="all");const Q=i.querySelector("#ci-360-filter-job");Q&&(Q.value="all"),U&&(U.value="all"),G&&G.classList.remove("active"),v&&v.classList.add("active"),M&&M.classList.remove("active"),X&&X.classList.remove("active"),ze(),await ce()})}function ze(){const a=i.querySelector("#ci-360-clear-filters");if(!a)return;const o=S.search||S.priority!=="all"||S.category!=="all"||S.jobId&&S.jobId!=="all"||S.assigneeId!=="all"||S.myIssuesOnly||S.scope&&S.scope!=="all";a.style.display=o?"inline":"none"}async function ce(){await Ve(),ot()}async function st(a){const o=i.querySelector("#ci-360-modals-root");if(o){o.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{E=await Re(`/tickets/${a}`)}catch(_){y(_.message||"Could not load ticket",!0),o.innerHTML="";return}ve()}}function ve(){const a=i.querySelector("#ci-360-modals-root");if(!a||!E)return;const o=E,_=wt.find(r=>r.key===o.category)||wt[0];Mt.find(r=>r.key===o.priority)||Mt[2];const D=o.subtasks||[],$=D.filter(r=>r.completed).length,R=D.length>0?Math.round($/D.length*100):0,A=o.attachments||[],U=o.comments||[],G=(o.history||[]).slice().reverse(),v=o.workLogs||[],M=o.linkedTickets||[],X=d?._id||d?.id,ee=o.reporter&&o.reporter.userId&&String(o.reporter.userId)===String(X)||o.userId&&String(o.userId)===String(X),te=e==="superadmin"||d?.role==="superadmin",Q=ee||te,u=Array.isArray(o.assignees)&&o.assignees.length>0?o.assignees:o.assignee&&o.assignee.userId?[o.assignee]:[];u.some(r=>r&&r.userId&&String(r.userId)===String(X));const m=o.jobId?._id?o.jobId._id.toString():o.jobId?o.jobId.toString():"",s=o.jobTitle||o.jobId&&o.jobId.title||"";a.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${_.slug}">${_.icon} ${_.label}</span>
              <span class="ci-360-ticket-id" style="font-size:13px;color:#38bdf8;">${h(o.ticketId)}</span>
            </div>
            <button class="ci-360-modal-close" id="btn-close-ci-360-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="ci-360-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="ci-360-detail-main">
              <!-- Issue Title Header -->
              <div class="ci-360-issue-header-wrap">
                <input type="text" class="ci-360-editable-title" id="inp-detail-title" value="${h(o.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Description</span>
                  <button type="button" class="ci-360-tool-btn" id="btn-toggle-desc-edit">
                    ${N?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${N?`
                  <div class="ci-360-editor-toolbar">
                    <button type="button" class="ci-360-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="ci-360-desc-editor" rows="6">${h(o.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-ci-360-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="ci-360-desc-wrap" id="view-detail-desc">
                    ${o.description?wa(o.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>🔗 Reference &amp; External Links (${(o.links||[]).length+(o.linkUrl&&!(o.links||[]).some(r=>r.url===o.linkUrl)?1:0)})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-toggle-add-link" style="font-size:11px;padding:4px 9px;">
                    + Add Link
                  </button>
                </div>

                <div id="add-link-form" class="ci-360-form-box" style="display:none;padding:12px;margin-bottom:10px;">
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <input type="url" id="inp-new-link-url" class="ci-360-form-input" placeholder="Paste link URL (e.g. https://figma.com/..., https://loom.com/..., live website)..." />
                    <input type="text" id="inp-new-link-title" class="ci-360-form-input" placeholder="Link label / description (Optional, e.g. Figma UI, Loom Video, Live App)..." />
                    <div style="display:flex;gap:8px;justify-content:flex-end;">
                      <button type="button" class="btn-ci-360-secondary" id="btn-cancel-new-link" style="font-size:12px;padding:6px 12px;">Cancel</button>
                      <button type="button" class="btn-ci-360-primary" id="btn-save-new-link" style="font-size:12px;padding:6px 12px;">Save Link 🔗</button>
                    </div>
                  </div>
                </div>

                ${o.links&&o.links.length>0||o.linkUrl?`
                  <div class="ci-360-links-list" style="display:flex;flex-direction:column;gap:8px;">
                    ${o.linkUrl&&!(o.links||[]).some(r=>r.url===o.linkUrl)?`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${h(o.linkUrl)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${h(o.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${h(o.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${h(o.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    `:""}
                    ${(o.links||[]).map(r=>`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${h(r.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${h(r.title||r.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${r.title?`<span style="word-break:break-all;">${h(r.url)}</span> · `:""}Added by ${h(r.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${h(r.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${h(r.url)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${r.id}" title="Remove Link">&times;</button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No reference links added yet. Click "+ Add Link" to attach Figma, Loom, Live App, or Drive links.</div>
                `}
              </div>

              <!-- Attachments Section (Fast streaming - any file format up to 1GB) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Attachments (${A.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${A.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${A.map(r=>{const x=r.type&&r.type.includes("video")||r.name&&r.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||r.url&&r.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="ci-360-att-card ${x?"is-video":""}" style="${x?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${x?"16px":"13px"};">${x?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${h(r.name)}">
                                  ${h(r.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${ga(r.size)} ${x?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${x?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${r.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${r.url}" download="${h(r.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${r.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${x?`
                            <div class="ci-360-video-slot" id="video-slot-${r.id}" style="display:none;margin-top:6px;width:100%;">
                              <video controls preload="metadata" style="width:100%;max-height:360px;border-radius:6px;background:#000;">
                                <source src="${r.url}" type="${r.type||"video/mp4"}">
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
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Subtasks (${$}/${D.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${R}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${R}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${D.map(r=>`
                    <div class="ci-360-subtask-item">
                      <div class="ci-360-subtask-left">
                        <input type="checkbox" class="ci-360-subtask-cb cb-subtask-toggle" data-subtask-id="${r.id}" ${r.completed?"checked":""} />
                        <span class="ci-360-subtask-title ${r.completed?"done":""}">${h(r.title)}</span>
                      </div>
                      <button type="button" class="ci-360-att-del btn-del-subtask" data-subtask-id="${r.id}" title="Remove subtask">&times;</button>
                    </div>
                  `).join("")}
                </div>

                <div class="ci-360-subtask-add-row">
                  <input type="text" id="inp-new-subtask" class="ci-360-subtask-input" placeholder="+ Add a subtask (press Enter)..." />
                  <button type="button" class="btn-ci-360-secondary" id="btn-add-subtask">Add</button>
                </div>
              </div>

              <!-- Linked Work Items Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Linked Work Items (${M.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${M.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${M.map(r=>`
                      <div class="ci-360-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${h(r.relationship)}</span>
                          <span class="ci-360-ticket-id" style="color:#38bdf8;">${h(r.ticketId)}</span>
                          <span class="ci-360-linked-title" style="font-size:12.5px;">${h(r.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="ci-360-col-badge">${h(r.status||"Open")}</span>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${r.id}" title="Remove link">&times;</button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

                <div id="ci-360-link-box" class="ci-360-form-box" style="display:none;padding:10px;border-radius:6px;margin-top:6px;">
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="sel-link-rel" class="ci-360-select-field" style="width:140px;">
                      <option value="relates to">relates to</option>
                      <option value="blocks">blocks</option>
                      <option value="is blocked by">is blocked by</option>
                      <option value="duplicates">duplicates</option>
                    </select>
                    <input type="text" id="inp-link-target" class="ci-360-subtask-input" placeholder="Ticket ID (e.g. SUP-002)..." style="flex:1;" />
                    <button class="btn-ci-360-primary" id="btn-submit-link">Link</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Dedicated Linked Internal Job Block -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span style="display:flex;align-items:center;gap:6px;">📁 Linked Internal Job</span>
                  <button type="button" class="ci-360-tool-btn" id="btn-toggle-job-link">
                    ${s?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${s?`
                  <div class="ci-360-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div class="ci-360-job-card-title" style="font-weight:700;font-size:13px;">${h(s)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${h(m)}</div>
                      </div>
                    </div>
                    <button type="button" class="ci-360-tool-btn" id="btn-unlink-job" style="color:#ef4444;border-color:rgba(239,68,68,0.3);" title="Remove job link">
                      ✕ Unlink
                    </button>
                  </div>
                `:`
                  <div style="color:#64748b;font-size:12.5px;font-style:italic;padding:4px 0;">
                    No job linked yet. Click "+ Link a Job" to associate this ticket with a client deliverable or project.
                  </div>
                `}

                <div id="ci-360-job-link-box" class="ci-360-form-box" style="display:none;padding:12px;border-radius:6px;margin-top:8px;">
                  <label class="ci-360-form-label" style="font-size:11.5px;font-weight:700;display:block;margin-bottom:6px;">Choose Job to Link:</label>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="inp-modal-job-select" class="ci-360-select-field" style="flex:1;min-width:220px;">
                      <option value="">-- Select a Job --</option>
                      ${W.map(r=>`
                        <option value="${r._id}" ${m===r._id.toString()?"selected":""}>
                          📁 ${h(r.title||"Untitled Job")}
                        </option>
                      `).join("")}
                    </select>
                    <button class="btn-ci-360-primary" id="btn-save-job-link">Link Job</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-job-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Activity Tabs Section -->
              <div class="ci-360-section-block" style="margin-top:10px;">
                <div class="ci-360-sec-title">Activity</div>
                <div class="ci-360-activity-tabs">
                  <button type="button" class="ci-360-act-tab ${j==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${U.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${j==="history"?"active":""}" data-act-tab="history">
                    History (${G.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${j==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${v.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${j==="comments"?`
                  <div class="ci-360-comments-feed">
                    ${U.map(r=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(r.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${h(r.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${h(r.userRole)})</span></span>
                            <span class="ci-360-comment-time">${ta(r.createdAt)}</span>
                          </div>
                          <div class="ci-360-comment-body">${wa(r.content)}</div>
                        </div>
                      </div>
                    `).join("")}

                    <!-- Add Comment Composer -->
                    <div class="ci-360-comment-composer">
                      <div class="ci-360-avatar" style="background:#3b82f6;">
                        ${(d?.name||"U").slice(0,1).toUpperCase()}
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
                        <textarea id="inp-new-comment" class="ci-360-comment-textarea" rows="2" placeholder="Add an internal comment..."></textarea>
                        <div style="display:flex;justify-content:flex-end;">
                          <button class="btn-ci-360-primary" id="btn-submit-comment">Save Comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                `:""}

                <!-- B. History Tab -->
                ${j==="history"?`
                  <div class="ci-360-history-feed">
                    ${G.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:G.map(r=>`
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(r.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${h(r.userName)}</span>
                            <span class="ci-360-comment-time">${ta(r.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="ci-360-history-field">${h(r.field)}</strong>:
                            ${r.from?`<span style="text-decoration:line-through;color:#ef4444;">${h(r.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${h(r.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${j==="worklog"?`
                  <div class="ci-360-worklog-feed">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${o.loggedHours||0} hrs</strong></span>
                      <button class="btn-ci-360-secondary" id="btn-open-worklog-dialog" style="font-size:11px;padding:4px 8px;">
                        ⏱️ Log Work
                      </button>
                    </div>

                    <div id="ci-360-worklog-box" class="ci-360-form-box" style="display:none;padding:10px;border-radius:6px;margin:6px 0;">
                      <div style="display:flex;flex-direction:column;gap:8px;">
                        <input type="text" id="inp-worklog-time" class="ci-360-subtask-input" placeholder="Time spent (e.g. 2h 30m, 45m)..." />
                        <input type="text" id="inp-worklog-desc" class="ci-360-subtask-input" placeholder="Description of work performed..." />
                        <div style="display:flex;justify-content:flex-end;gap:6px;">
                          <button class="btn-ci-360-primary" id="btn-submit-worklog">Log</button>
                          <button class="btn-ci-360-secondary" id="btn-cancel-worklog">Cancel</button>
                        </div>
                      </div>
                    </div>

                    ${v.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:v.map(r=>`
                      <div class="ci-360-worklog-item">
                        <div class="ci-360-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(r.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-worklog-main">
                          <div class="ci-360-worklog-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${h(r.userName)} logged <strong style="color:#38bdf8;">${h(r.timeSpent)}</strong></span>
                            <span class="ci-360-comment-time">${ta(r.loggedAt)}</span>
                          </div>
                          ${r.description?`<div class="ci-360-comment-body" style="font-size:12px;">${h(r.description)}</div>`:""}
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}
              </div>
            </div>

            <!-- Right Sidebar Panel (32%) -->
            <div class="ci-360-detail-sidebar">
              <!-- Status -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Status</span>
                <select id="sel-detail-status" class="ci-360-select-field">
                  ${ca.map(r=>{let x=o.status||"To Do";return x==="In Progress"?x="Content":x==="Resolved"?x="Under Review":x==="Closed"&&(x="Ready to Leave"),`
                      <option value="${r.key}" ${x===r.key?"selected":""}>
                        ${r.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="ci-360-select-field">
                  ${Mt.map(r=>`
                    <option value="${r.key}" ${o.priority===r.key?"selected":""}>
                      ${r.icon} ${r.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="ci-360-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="ci-360-side-lbl" style="margin-bottom:0;">Assigned Personnel (${u.length})</span>
                  
                    <button type="button" class="ci-360-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="ci-360-assigned-chips-wrap">
                  ${u.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:u.map(r=>`
                    <div class="ci-360-assignee-chip">
                      <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(r.avatar||r.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="ci-360-assignee-chip-name" title="${h(r.name)}">${h(r.name)}</span>
                      ${`
                        <button type="button" class="ci-360-assignee-chip-remove btn-remove-assignee" data-user-id="${r.userId}" title="Remove ${h(r.name)}">&times;</button>
                      `}
                    </div>
                  `).join("")}
                </div>

                <!-- Interactive Multi-select Assignee Picker -->
                <div id="ci-360-detail-assignee-box" class="ci-360-form-box" style="display:none;margin-top:8px;padding:10px;border-radius:6px;">
                  <div class="ci-360-assignee-header" style="font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
                    <span>ASSIGN / REASSIGN EMPLOYEES</span>
                    <button type="button" id="btn-close-detail-assignee-box" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:13px;">✕</button>
                  </div>
                  <div class="ci-360-emp-checklist" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;">
                    ${z.map(r=>{const x=u.some(B=>B&&B.userId&&String(B.userId)===String(r._id));return`
                        <label class="ci-360-emp-check-item ${x?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${r._id}" ${x?"checked":""} />
                          <div class="ci-360-avatar" style="width:18px;height:18px;font-size:9px;">${(r.name||"U").slice(0,1).toUpperCase()}</div>
                          <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                            ${h(r.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${h(r.role)})</span>
                          </span>
                        </label>
                      `}).join("")}
                  </div>
                  <div style="margin-top:8px;display:flex;justify-content:flex-end;gap:6px;">
                    <button type="button" class="btn-ci-360-primary" id="btn-save-detail-assignees" style="font-size:11px;padding:4px 10px;">
                      Save Assignees
                    </button>
                  </div>
                </div>
              </div>

              <!-- Reporter (Read Only) -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Reporter</span>
                <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                  <div class="ci-360-avatar" style="background:#2563eb;">
                    ${(o.reporter?.name||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${h(o.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${h(o.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Category</span>
                <select id="sel-detail-category" class="ci-360-select-field">
                  ${wt.map(r=>`
                    <option value="${r.key}" ${o.category===r.key?"selected":""}>
                      ${r.icon} ${r.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="ci-360-date-field" value="${o.dueDate?new Date(o.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="ci-360-select-field">
                  <option value="">None (Workspace General)</option>
                  ${W.map(r=>`
                    <option value="${r._id}" ${m===r._id.toString()?"selected":""}>
                      📁 ${h(r.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${o.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" class="ci-360-est-input" value="${o.estimatedHours||0}" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(o.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(o.updatedAt).toLocaleString()}</div>
                ${o.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(o.resolvedAt).toLocaleString()}</div>`:""}
              </div>

              <!-- Actions (Delete - Creator or Superadmin) -->
              ${Q?`
                <div style="padding-top:10px;">
                  <button type="button" class="ci-360-tool-btn" id="btn-delete-ticket" style="color:#ef4444;border-color:rgba(239,68,68,0.4);width:100%;padding:6px;">
                    🗑️ Delete Ticket
                  </button>
                </div>
              `:""}
            </div>
          </div>
        </div>
      </div>
    `,p()}function p(){const a=i.querySelector("#ci-360-modals-root");if(!a||!E)return;const o=a.querySelector("#btn-close-ci-360-modal");o&&(o.onclick=T);const _=a.querySelector("#ci-360-detail-backdrop");_&&(_.onclick=L=>{L.target===_&&T()});const D=a.querySelector("#inp-detail-title");D&&(D.onchange=async()=>{const L=D.value.trim();if(L)try{E=await Ze(`/tickets/${E._id}`,{title:L}),await ce()}catch(H){y(H.message||"Failed to update title",!0)}});const $=a.querySelector("#btn-toggle-desc-edit");$&&($.onclick=()=>{N=!N,ve()});const R=a.querySelector("#btn-cancel-desc");R&&(R.onclick=()=>{N=!1,ve()});const A=a.querySelector("#btn-save-desc");A&&(A.onclick=async()=>{const L=a.querySelector("#inp-detail-desc")?.value;try{E=await Ze(`/tickets/${E._id}`,{description:L}),N=!1,ve(),await ce(),y("Description saved",!1)}catch(H){y(H.message||"Failed to save description",!0)}});const U=a.querySelector("#sel-detail-status");U&&(U.onchange=async L=>{try{const H=await Ze(`/tickets/${E._id}/status`,{status:L.target.value});E=H,ve(),await tt(),nt(),await ce();const g=H.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${H.status}`;y(g,!1)}catch(H){y(H.message||"Status change failed",!0)}});const G=a.querySelector("#sel-detail-priority");G&&(G.onchange=async L=>{try{E=await Ze(`/tickets/${E._id}`,{priority:L.target.value}),ve(),await ce()}catch(H){y(H.message,!0)}});const v=a.querySelector("#btn-toggle-assignee-picker"),M=a.querySelector("#ci-360-detail-assignee-box"),X=a.querySelector("#btn-close-detail-assignee-box"),ee=a.querySelector("#btn-save-detail-assignees");v&&M&&(v.onclick=()=>{const L=M.style.display==="none";M.style.display=L?"block":"none"}),X&&M&&(X.onclick=()=>{M.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(L=>{L.onchange=()=>{L.closest(".ci-360-emp-check-item")?.classList.toggle("selected",L.checked)}}),ee&&(ee.onclick=async()=>{const L=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(H=>H.value);try{ee.disabled=!0,E=await Ze(`/tickets/${E._id}`,{assigneeIds:L}),ve(),await ce(),y("Assignees updated!",!1)}catch(H){y(H.message,!0),ee.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(L=>{L.onclick=async()=>{const H=L.dataset.userId,Te=(Array.isArray(E.assignees)&&E.assignees.length>0?E.assignees:E.assignee?.userId?[E.assignee]:[]).filter(we=>we&&we.userId&&String(we.userId)!==String(H)).map(we=>String(we.userId));try{E=await Ze(`/tickets/${E._id}`,{assigneeIds:Te}),ve(),await ce(),y("Assignee removed",!1)}catch(we){y(we.message,!0)}}});const te=a.querySelector("#sel-detail-category");te&&(te.onchange=async L=>{try{E=await Ze(`/tickets/${E._id}`,{category:L.target.value}),ve(),await ce()}catch(H){y(H.message,!0)}});const Q=a.querySelector("#inp-detail-duedate");Q&&(Q.onchange=async L=>{try{E=await Ze(`/tickets/${E._id}`,{dueDate:L.target.value||null}),ve(),await ce()}catch(H){y(H.message,!0)}});const u=a.querySelector("#sel-detail-job");u&&(u.onchange=async L=>{try{E=await Ze(`/tickets/${E._id}`,{jobId:L.target.value||null}),ve(),await ce(),y(L.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(H){y(H.message,!0)}});const m=a.querySelector("#btn-toggle-job-link"),s=a.querySelector("#ci-360-job-link-box");m&&s&&(m.onclick=()=>{s.style.display=s.style.display==="none"?"block":"none"});const r=a.querySelector("#btn-cancel-job-link");r&&s&&(r.onclick=()=>{s.style.display="none"});const x=a.querySelector("#btn-save-job-link");x&&(x.onclick=async()=>{const L=a.querySelector("#inp-modal-job-select")?.value||null;try{E=await Ze(`/tickets/${E._id}`,{jobId:L}),ve(),await ce(),y(L?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(H){y(H.message,!0)}});const B=a.querySelector("#btn-unlink-job");B&&(B.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{E=await Ze(`/tickets/${E._id}`,{jobId:null}),ve(),await ce(),y("Job unlinked",!1)}catch(L){y(L.message,!0)}});const C=a.querySelector("#inp-detail-esthours");C&&(C.onchange=async L=>{try{E=await Ze(`/tickets/${E._id}`,{estimatedHours:Number(L.target.value)||0})}catch(H){y(H.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(L=>{L.onchange=async()=>{const H=L.dataset.subtaskId;try{E=await Ze(`/tickets/${E._id}/subtasks/${H}`,{completed:L.checked}),ve(),await ce()}catch(g){y(g.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(L=>{L.onclick=async()=>{const H=L.dataset.subtaskId;try{E=await et(`/tickets/${E._id}/subtasks/${H}`),ve(),await ce()}catch(g){y(g.message,!0)}}});const O=a.querySelector("#inp-new-subtask"),ne=a.querySelector("#btn-add-subtask"),F=async()=>{const L=O?.value.trim();if(L)try{E=await Ce(`/tickets/${E._id}/subtasks`,{title:L}),ve(),await ce()}catch(H){y(H.message,!0)}};ne&&(ne.onclick=F),O&&(O.onkeydown=L=>{L.key==="Enter"&&(L.preventDefault(),F())});const q=a.querySelector("#btn-toggle-add-link"),Y=a.querySelector("#add-link-form"),_e=a.querySelector("#btn-cancel-new-link"),me=a.querySelector("#btn-save-new-link"),le=a.querySelector("#inp-new-link-url"),ue=a.querySelector("#inp-new-link-title");q&&Y&&(q.onclick=()=>{const L=Y.style.display==="none";Y.style.display=L?"block":"none",L&&le&&le.focus()}),_e&&Y&&(_e.onclick=()=>{Y.style.display="none",le&&(le.value=""),ue&&(ue.value="")}),me&&le&&(me.onclick=async()=>{const L=le.value.trim(),H=ue?.value.trim()||"";if(!L){y("Please enter a valid URL link",!0);return}try{me.disabled=!0,me.textContent="Saving...",E=await Ce(`/tickets/${E._id}/links`,{url:L,title:H}),ve(),await ce(),y("Reference link added! 🔗",!1)}catch(g){y(g.message||"Failed to save link",!0),me.disabled=!1,me.textContent="Save Link 🔗"}}),a.querySelectorAll(".btn-copy-link").forEach(L=>{L.onclick=()=>{const H=L.dataset.url;H&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(H).then(()=>{y("Link copied to clipboard! 📋")}).catch(()=>{y("Link: "+H)}):y("Link: "+H))}}),a.querySelectorAll(".btn-del-link").forEach(L=>{L.onclick=async()=>{const H=L.dataset.linkId;try{E=await et(`/tickets/${E._id}/links/${H}`),ve(),await ce(),y("Link removed")}catch(g){y(g.message||"Failed to remove link",!0)}}});const K=a.querySelector("#btn-trigger-detail-upload"),re=a.querySelector("#inp-detail-att-upload"),be=a.querySelector("#detail-att-upload-progress");K&&re&&(K.onclick=L=>{L.preventDefault(),re.click()}),re&&(re.onchange=async()=>{const L=Array.from(re.files||[]);if(re.value="",!!L.length){be&&(be.style.display="block",be.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${L.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const g=(await ba(L,Te=>{const we=a.querySelector("#att-prog-pct"),lt=a.querySelector("#att-prog-bar");we&&(we.textContent=`${Te}%`),lt&&(lt.style.width=`${Te}%`)})).map(Te=>({name:Te.name,url:Te.url,size:Te.size||0,type:Te.type||"application/octet-stream"}));g.length&&(E=await Ce(`/tickets/${E._id}/attachments`,{attachments:g}),ve(),y(`Successfully attached ${g.length} file(s)! 📎`,!1))}catch(H){console.error("Upload error:",H),y(`Upload failed: ${H.message}`,!0)}finally{be&&(be.style.display="none")}}}),a.querySelectorAll(".btn-play-att-video").forEach(L=>{L.onclick=()=>{const H=L.dataset.slot,g=a.querySelector("#"+H);if(g){const Te=g.style.display==="none";g.style.display=Te?"block":"none",L.textContent=Te?"⏸ Close Video":"▶ Play Video";const we=g.querySelector("video");we&&Te?we.play().catch(()=>{}):we&&we.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(L=>{L.onclick=async()=>{const H=L.dataset.attId;try{E=await et(`/tickets/${E._id}/attachments/${H}`),ve()}catch(g){y(g.message,!0)}}}),a.querySelectorAll(".ci-360-act-tab").forEach(L=>{L.onclick=()=>{j=L.dataset.actTab,ve()}});const de=a.querySelector("#inp-new-comment"),he=a.querySelector("#btn-submit-comment");he&&de&&(he.onclick=async()=>{const L=de.value.trim();if(L)try{he.disabled=!0,he.textContent="Saving...",E=await Ce(`/tickets/${E._id}/comments`,{content:L}),ve(),y("Comment added",!1)}catch(H){y(H.message||"Failed to add comment",!0)}finally{he.disabled=!1}});const De=a.querySelector("#btn-open-link-dialog"),Be=a.querySelector("#ci-360-link-box"),Ge=a.querySelector("#btn-cancel-link"),Le=a.querySelector("#btn-submit-link"),pe=a.querySelector("#inp-link-target"),Ee=a.querySelector("#sel-link-rel");De&&Be&&(De.onclick=()=>{Be.style.display="block"}),Ge&&Be&&(Ge.onclick=()=>{Be.style.display="none"}),Le&&Be&&(Le.onclick=async()=>{const L=pe?.value.trim(),H=Ee?.value||"relates to";if(L)try{Le.disabled=!0,E=await Ce(`/tickets/${E._id}/links`,{targetTicketId:L,relationship:H}),ve(),y(`Linked with ${L}`,!1)}catch(g){y(g.message||"Failed to link ticket",!0)}finally{Le.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(L=>{L.onclick=async()=>{const H=L.dataset.linkId;try{E=await et(`/tickets/${E._id}/links/${H}`),ve()}catch(g){y(g.message,!0)}}});const Ue=a.querySelector("#btn-open-worklog-dialog"),Ne=a.querySelector("#ci-360-worklog-box"),Pe=a.querySelector("#btn-cancel-worklog"),Ae=a.querySelector("#btn-submit-worklog"),Ie=a.querySelector("#inp-worklog-time"),ke=a.querySelector("#inp-worklog-desc");Ue&&Ne&&(Ue.onclick=()=>{Ne.style.display="block"}),Pe&&Ne&&(Pe.onclick=()=>{Ne.style.display="none"}),Ae&&Ne&&(Ae.onclick=async()=>{const L=Ie?.value.trim(),H=ke?.value.trim();if(!L){y("Enter time spent (e.g. 2h 30m)",!0);return}try{Ae.disabled=!0,E=await Ce(`/tickets/${E._id}/worklogs`,{timeSpent:L,description:H}),ve(),y("Work logged",!1)}catch(g){y(g.message||"Failed to log work",!0)}finally{Ae.disabled=!1}});const fe=a.querySelector("#btn-delete-ticket");fe&&(fe.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${E.ticketId}?`))try{fe.disabled=!0,await et(`/tickets/${E._id}`),y(`Ticket ${E.ticketId} deleted`,!1),T(),await tt(),nt(),await ce()}catch(L){y(L.message||"Failed to delete ticket",!0),fe.disabled=!1}})}function T(){E=null,N=!1;const a=i.querySelector("#ci-360-modals-root");a&&(a.innerHTML="")}function I(a=null){const o=i.querySelector("#ci-360-modals-root");if(!o)return;const _=a||(S.jobId&&S.jobId!=="all"?S.jobId:null);o.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-create-backdrop">
        <div class="ci-360-modal-card" style="max-width:680px;height:auto;max-height:92vh;">
          <div class="ci-360-modal-header">
            <h3 style="margin:0;font-size:16px;font-weight:700;color:#f8fafc;">
              🎫 Create Support Ticket
            </h3>
            <button class="ci-360-modal-close" id="btn-close-create-modal">&times;</button>
          </div>

          <div style="padding:22px;overflow-y:auto;flex:1;">
            <div class="ci-360-form-grid-2">
              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Issue Type / Category *</label>
                <select id="create-ticket-cat" class="ci-360-select-field">
                  ${wt.map(s=>`<option value="${s.key}">${s.icon} ${s.label}</option>`).join("")}
                </select>
              </div>

              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Priority *</label>
                <select id="create-ticket-pri" class="ci-360-select-field">
                  <option value="Medium" selected>🟡 Medium</option>
                  <option value="Low">🟢 Low</option>
                  <option value="High">🟠 High</option>
                  <option value="Critical">🔴 Critical</option>
                </select>
              </div>
            </div>

            <div class="ci-360-form-group">
              <label class="ci-360-form-label">Summary / Title *</label>
              <input type="text" id="create-ticket-title" class="ci-360-form-input" placeholder="e.g. Navigation dropdown glitch on Safari mobile" required />
            </div>

            <div class="ci-360-form-group">
              <label class="ci-360-form-label">Description (Provide details, steps, or context)</label>
              <textarea id="create-ticket-desc" class="ci-360-form-textarea" rows="4" placeholder="Describe the issue, requirements, or internal request..."></textarea>
            </div>

            <div class="ci-360-form-group">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="ci-360-form-label" style="margin-bottom:0;">Assign Employees (Choose one or multiple)</label>
                <div style="display:flex;gap:8px;">
                  <button type="button" id="btn-create-assign-self" style="background:none;border:none;color:#38bdf8;font-size:11px;font-weight:600;cursor:pointer;text-decoration:underline;">
                    + Select Myself
                  </button>
                  <button type="button" id="btn-create-clear-assign" style="background:none;border:none;color:#94a3b8;font-size:11px;cursor:pointer;">
                    Clear All
                  </button>
                </div>
              </div>

              <div class="ci-360-emp-checklist-box">
                <div class="ci-360-emp-checklist" id="create-emp-checklist">
                  ${z.map(s=>{const r=d&&String(d._id||d.id)===String(s._id);return`
                      <label class="ci-360-emp-check-item ${r?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${s._id}" ${r?"checked":""} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(s.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${h(s.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${h(s.role)})${r?" — (You)":""}</span>
                        </span>
                      </label>
                    `}).join("")}
                </div>
              </div>
              <div id="create-assignee-hint" style="font-size:11px;color:#94a3b8;margin-top:4px;">
                Check all employees you want to assign to this ticket.
              </div>
            </div>

            <div class="ci-360-form-grid-2">
              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Due Date (Optional)</label>
                <input type="date" id="create-ticket-duedate" class="ci-360-date-field" />
              </div>

              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Related Job / Internal Project (Optional)</label>
                <select id="create-ticket-job" class="ci-360-select-field">
                  <option value="">None (General Workspace Issue)</option>
                  ${W.map(s=>`
                    <option value="${s._id}" ${_&&String(_)===String(s._id)?"selected":""}>
                      📁 ${h(s.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>
            </div>

            <!-- External Reference URL / Link -->
            <div class="ci-360-form-group">
              <label class="ci-360-form-label">🔗 External Reference Link / URL (Optional)</label>
              <input type="url" id="create-ticket-url" class="ci-360-form-input" placeholder="e.g. https://figma.com/..., https://loom.com/..., live website URL, Google Drive..." />
            </div>

            <!-- Attachments & Fast File Uploader (Up to 1GB) -->
            <div class="ci-360-form-group" style="margin-top:14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="ci-360-form-label" style="margin:0;">Attachments &amp; Files (All formats up to 1GB)</label>
                <span id="create-att-count" style="font-size:11px;color:#94a3b8;">0 files attached</span>
              </div>
              <label class="ci-360-att-dropzone" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px;border-radius:8px;cursor:pointer;transition:border-color 0.2s;">
                <div style="font-size:18px;">📁 ⚡</div>
                <div style="font-size:12px;font-weight:600;color:#e2e8f0;">Click or drag &amp; drop files or videos here</div>
                <div style="font-size:10.5px;color:#64748b;">Fast parallel uploading: MP4, MOV, WebM, images, PDFs, archives (Up to 1GB supported)</div>
                <input type="file" id="inp-create-ticket-att" multiple style="display:none;" />
              </label>
              <div id="create-att-progress" style="display:none;margin-top:8px;"></div>
              <div id="create-att-list" class="ci-360-attachments-grid" style="margin-top:8px;"></div>
            </div>
          </div>

          <div class="ci-360-modal-footer">
            <button type="button" class="btn-ci-360-secondary" id="btn-cancel-create-ticket">Cancel</button>
            <button type="button" class="btn-ci-360-primary" id="btn-submit-create-ticket">Create Ticket 🚀</button>
          </div>
        </div>
      </div>
    `;const D=()=>{o.querySelectorAll(".ci-360-emp-check-item").forEach(s=>{const r=s.querySelector(".chk-create-emp");s.classList.toggle("selected",!!r?.checked)})};o.querySelectorAll(".chk-create-emp").forEach(s=>{s.onchange=D});const $=o.querySelector("#btn-create-assign-self");$&&d&&($.onclick=()=>{const s=String(d._id||d.id);o.querySelectorAll(".chk-create-emp").forEach(r=>{r.value===s&&(r.checked=!0)}),D()});const R=o.querySelector("#btn-create-clear-assign");R&&(R.onclick=()=>{o.querySelectorAll(".chk-create-emp").forEach(s=>{s.checked=!1}),D()});const A=[],U=o.querySelector("#inp-create-ticket-att"),G=o.querySelector("#create-att-list"),v=o.querySelector("#create-att-count"),M=o.querySelector("#create-att-progress"),X=()=>{v&&(v.textContent=`${A.length} file(s) attached`),G&&(G.innerHTML=A.map((s,r)=>{const x=s.type&&s.type.includes("video")||s.name&&s.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${x?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${h(s.name)}">${h(s.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${ga(s.size)} ${x?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${r}" title="Remove">&times;</button>
          </div>
        `}).join(""),G.querySelectorAll(".btn-del-pending-att").forEach(s=>{s.onclick=()=>{A.splice(Number(s.dataset.idx),1),X()}}))};U&&(U.onchange=async()=>{const s=Array.from(U.files||[]);if(U.value="",!!s.length){M&&(M.style.display="block",M.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${s.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await ba(s,x=>{const B=o.querySelector("#create-prog-pct"),C=o.querySelector("#create-prog-bar");B&&(B.textContent=`${x}%`),C&&(C.style.width=`${x}%`)})).forEach(x=>{A.push({name:x.name,url:x.url,size:x.size||0,type:x.type||"application/octet-stream"})}),X()}catch(r){y(`Failed to upload files: ${r.message}`,!0)}finally{M&&(M.style.display="none"),U.value=""}}});const ee=()=>{o.innerHTML=""},te=o.querySelector("#btn-close-create-modal");te&&(te.onclick=ee);const Q=o.querySelector("#btn-cancel-create-ticket");Q&&(Q.onclick=ee);const u=o.querySelector("#ci-360-create-backdrop");u&&(u.onclick=s=>{s.target===u&&ee()});const m=o.querySelector("#btn-submit-create-ticket");m&&(m.onclick=async()=>{const s=o.querySelector("#create-ticket-title")?.value.trim(),r=o.querySelector("#create-ticket-desc")?.value.trim(),x=o.querySelector("#create-ticket-cat")?.value||"Task",B=o.querySelector("#create-ticket-pri")?.value||"Medium",O=Array.from(o.querySelectorAll(".chk-create-emp:checked")).map(Y=>Y.value),ne=o.querySelector("#create-ticket-duedate")?.value||null,F=o.querySelector("#create-ticket-job")?.value||null,q=o.querySelector("#create-ticket-url")?.value.trim()||"";if(!s){y("Ticket summary / title is required",!0);return}try{m.disabled=!0,m.textContent="Creating...";const Y=await Ce("/tickets",{title:s,description:r,category:x,priority:B,assigneeIds:O,assigneeId:O[0]||null,dueDate:ne,jobId:F,linkUrl:q,attachments:A});y(`Ticket ${Y.ticketId} created! 🎫`,!1),ee(),await tt(),nt(),await ce(),st(Y._id)}catch(Y){y(Y.message||"Could not create ticket",!0),m.disabled=!1,m.textContent="Create Ticket 🚀"}})}i._openCreateTicketModal=I,i._openTicketDetailModal=st,i._setJobFilter=async a=>{S.jobId=a||"all";const o=i.querySelector("#ci-360-filter-job");o&&(o.value=S.jobId),ze(),await ce()}}export{ii as a,ai as b,ti as i};
