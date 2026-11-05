import{c as Re,k as y,e as v,v as Ze,l as et,p as Gt,m as Yt,j as Ce,w as ga,x as ta,y as ba}from"./api-FGezNYCI.js";const fa={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function _a(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},fa,JSON.parse(i))}catch{}return Object.assign({},fa)}function Aa(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function We(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),d=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${d}`}function Wt(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const d=e.getFullYear(),g=String(e.getMonth()+1).padStart(2,"0"),c=String(e.getDate()).padStart(2,"0");return`${d}-${g}-${c}`}function Tt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function Xe(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ma(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function aa(i,t=1){const e=new Date(i+"T00:00:00"),d=e.getDay(),g=(d<t?7:0)+d-t,c=new Date(e);c.setDate(e.getDate()-g);const l=[];for(let n=0;n<7;n++){const R=new Date(c);R.setDate(c.getDate()+n);const G=R.getFullYear(),S=String(R.getMonth()+1).padStart(2,"0"),E=String(R.getDate()).padStart(2,"0");l.push(`${G}-${S}-${E}`)}return l}function Ta(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,d=t.createOscillator(),g=t.createGain();d.type="sine",d.frequency.setValueAtTime(523.25,e),d.frequency.exponentialRampToValueAtTime(783.99,e+.15),g.gain.setValueAtTime(.2,e),g.gain.exponentialRampToValueAtTime(.001,e+.35),d.connect(g),g.connect(t.destination),d.start(e),d.stop(e+.35)}catch{}}function ti(i,t={}){const{userRole:e="employee",currentUser:d=null,onNavigate:g=null}=t,c=e==="superadmin"||e==="admin";let l=_a(),n={selectedDate:We(),viewMode:"daily",filterStatus:"all",searchQuery:"",groupByEmployee:c,collapsedEmployees:{},selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ea(),R();async function R(){n.loading=!0,G();try{const b=[Re("/tasks")];c&&b.push(Re("/personnel").catch(()=>[]));const[A,I]=await Promise.all(b);n.tasks=Array.isArray(A)?A:[],I&&(n.personnelList=Array.isArray(I)?I:[])}catch(b){y("Failed to load planner tasks: "+b.message,!0)}finally{n.loading=!1,N()}}function G(){i.innerHTML=`
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
    `}function S(b){return n.tasks.filter(A=>{if(A.isDeleted===!0)return!1;if(c&&n.selectedPersonnelId!=="all"){const a=A.personnelId?._id||A.personnelId;if(String(a)!==String(n.selectedPersonnelId))return!1}const I=A.completionDateStr||A.dateStr||(A.dueDate?new Date(A.dueDate).toISOString().slice(0,10):"");return I?I===b:b===We()})}function E(b,A){if(b.status==="Completed")return!1;const I=b.completionDateStr||b.dateStr||(b.dueDate?new Date(b.dueDate).toISOString().slice(0,10):"");return I?I<A:!1}function j(b,A){const I=b.length,a=b.filter(B=>B.status==="Completed").length,r=b.filter(B=>B.status==="In Progress").length,_=b.filter(B=>B.status==="Pending"||B.status==="Todo").length,P=b.filter(B=>E(B,A)).length,$=I>0?Math.round(a/I*100):0;return{total:I,completed:a,inProgress:r,pending:_,overdue:P,percent:$}}function N(){const b=We(),A=n.selectedDate===b,I=S(n.selectedDate),a=j(I,b);i.innerHTML=`
      <div class="ci360-planner-wrap ${l.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${Xe(n.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${v(l.displayName||"Daily Planner")}</h1>
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
            <button type="button" class="ci360-btn-primary ${n.selectedDate<b?"is-locked-past":""}" id="btnOpenAddTaskModal" title="${n.selectedDate<b?"Cannot add tasks on previous dates (switch to today or later)":"Add Task"}">
              ${n.selectedDate<b?`
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
              <span class="date-text" id="displayDateLabel">${Tt(n.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${n.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${A?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${c?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${n.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${n.personnelList.map(r=>`
                  <option value="${r._id}" ${n.selectedPersonnelId===String(r._id)?"selected":""}>
                    ${v(r.name)} (${v(r.department||r.role||"Team")})
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
    `,nt(),Fe()}function ge(b,A){return n.viewMode==="weekly"?rt():n.viewMode==="report"?St():ye(b,A)}function ye(b,A){const I=We(),a=n.selectedDate<I;let r=b;if(n.filterStatus==="pending"?r=r.filter($=>$.status==="Pending"||$.status==="Todo"):n.filterStatus==="in_progress"?r=r.filter($=>$.status==="In Progress"):n.filterStatus==="completed"?r=r.filter($=>$.status==="Completed"):n.filterStatus==="overdue"&&(r=r.filter($=>E($,I))),n.searchQuery){const $=n.searchQuery.toLowerCase().trim();r=r.filter(B=>{const T=(B.title||"").toLowerCase(),O=(B.description||"").toLowerCase(),H=(B.category||"").toLowerCase(),x=(B.personnelId?.name||B.userId?.name||"").toLowerCase(),z=(B.createdByName||B.createdBy?.name||(B.createdBy?.email?B.createdBy.email.split("@")[0]:"")).toLowerCase();return T.includes($)||O.includes($)||H.includes($)||x.includes($)||z.includes($)})}r.sort(($,B)=>{if($.status==="Completed"&&B.status!=="Completed")return 1;if($.status!=="Completed"&&B.status==="Completed")return-1;const T={Urgent:0,High:1,Medium:2,Low:3};return(T[$.priority]||2)-(T[B.priority]||2)});const _=new Map;r.forEach($=>{let B="unassigned",T="Unassigned / Team",O="",H="";$.personnelId&&typeof $.personnelId=="object"&&$.personnelId._id?(B=String($.personnelId._id),T=$.personnelId.name||"Team Member",H=$.personnelId.role||"Personnel",O=$.personnelId.department||""):$.userId&&typeof $.userId=="object"&&$.userId._id?(B=String($.userId._id),T=$.userId.name||"User",H=$.userId.role||"Member"):($.createdByName||$.createdBy&&$.createdBy.name)&&(T=$.createdByName||$.createdBy.name,B="creator_"+T.toLowerCase().replace(/[^a-z0-9]/g,"_"),H="Creator"),_.has(B)||_.set(B,{key:B,name:T,department:O,role:H,tasks:[]}),_.get(B).tasks.push($)});const P=Array.from(_.values()).sort(($,B)=>$.key==="unassigned"?1:B.key==="unassigned"?-1:$.name.localeCompare(B.name));return`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              ${a?"Focus Archive":"Today's Focus"}
            </h2>
            <span class="ci360-task-count-badge">${r.length} ${r.length===1?"task":"tasks"}</span>
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${n.filterStatus==="all"?"active":""}" data-f="all">All (${A.total})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${A.pending})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${A.inProgress})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${A.completed})</button>
              ${A.overdue>0?`
                <button type="button" class="filter-pill overdue ${n.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${A.overdue})</button>
              `:""}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${c?`
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${n.groupByEmployee?"active":""}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${n.groupByEmployee?"By Employee":"Flat List"}
                </button>
                ${n.groupByEmployee&&P.length>0?`
                  <button type="button" class="filter-pill" id="btnExpandAllEmp" title="Expand all employee tasks">⊞ Expand</button>
                  <button type="button" class="filter-pill" id="btnCollapseAllEmp" title="Collapse all employee tasks">⊟ Collapse</button>
                `:""}
              </div>
            `:""}

            <!-- Search Bar with employee search support -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks, category or employee..." value="${v(n.searchQuery)}">
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
                    <option value="${$._id}" ${n.selectedPersonnelId===String($._id)?"selected":""}>👤 ${v($.name)}</option>
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
          ${r.length===0?Ve(a):c&&n.groupByEmployee?`
              <div class="ci360-emp-groups-container">
                ${P.map($=>{const B=!!n.collapsedEmployees[$.key],T=$.tasks.filter(z=>z.status==="Completed").length,O=$.tasks.filter(z=>z.status==="In Progress").length,H=$.tasks.filter(z=>z.status==="Pending"||z.status==="Todo").length,x=$.tasks.length>0?Math.round(T/$.tasks.length*100):0;return`
                    <div class="ci360-emp-group-card ${B?"is-collapsed":""}" data-emp-key="${$.key}">
                      <div class="ci360-emp-group-header" data-action="toggle-emp-group" data-emp-key="${$.key}" role="button" tabindex="0">
                        <div class="emp-group-left">
                          <span class="emp-collapse-icon">${B?"▶":"▼"}</span>
                          <div class="emp-avatar">${v(($.name||"U").charAt(0).toUpperCase())}</div>
                          <div class="emp-info">
                            <span class="emp-name">${v($.name)}</span>
                            ${$.department||$.role?`<span class="emp-subtitle">${v($.department?$.department+" · "+$.role:$.role)}</span>`:""}
                          </div>
                        </div>

                        <div class="emp-group-right">
                          <span class="emp-stat-pill total">${$.tasks.length} ${$.tasks.length===1?"task":"tasks"}</span>
                          <span class="emp-stat-pill done">${T} done</span>
                          ${O>0?`<span class="emp-stat-pill in-prog">${O} in progress</span>`:""}
                          ${H>0?`<span class="emp-stat-pill pending">${H} pending</span>`:""}
                          <div class="emp-mini-bar-wrap" title="${x}% completed">
                            <div class="emp-mini-bar-fill" style="width:${x}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${B?"":`
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${$.tasks.map(z=>tt(z,I)).join("")}
                          </div>
                        </div>
                      `}
                    </div>
                  `}).join("")}
              </div>
            `:`
              <div class="ci360-task-list">
                ${r.map($=>tt($,I)).join("")}
              </div>
            `}
        </div>

      </div>
    `}function Ve(b=!1){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">${b?"📜":"✨"}</div>
        <h3>No tasks found for ${Xe(n.selectedDate)}</h3>
        <p>${b?"No scheduled tasks were recorded on this past date.":"Your schedule is clean and ready. Add your first priority task above or import your daily agenda."}</p>
        ${b?"":`
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
    `}function tt(b,A){const I=b.status==="Completed",a=E(b,A),r=b.completionDateStr||b.dateStr||(b.dueDate?new Date(b.dueDate).toISOString().slice(0,10):A),_=`pri-${(b.priority||"medium").toLowerCase()}`,P=`status-${(b.status||"pending").toLowerCase().replace(/\s+/g,"-")}`,$=b.createdByName||b.createdBy?.name||(b.createdBy?.email?b.createdBy.email.split("@")[0]:"")||b.personnelId?.name||b.userId?.name||"";return`
      <div class="ci360-task-card ${I?"is-completed":""} ${a?"is-overdue":""}" data-id="${b._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${I?"checked":""}" data-action="toggle" data-id="${b._id}" title="${I?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${v(b.title)}</span>
          </div>

          ${b.description?`
            <div class="ci360-task-desc">${v(b.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${_}">
              <span class="badge-dot"></span>
              ${v(b.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${P}">
              ${v(b.status||"Pending")}
            </span>

            <!-- Completion Date Badge (Always Visible & Prominent) -->
            <span class="ci360-badge completion-badge" title="Target Completion Date: ${r}">
              📅 Due: ${Xe(r)}
            </span>

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${b.rescheduledFrom&&b.rescheduledFrom!==r?`
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${Xe(b.rescheduledFrom)} to ${Xe(r)} (${b.dateChangeCount||1} change${(b.dateChangeCount||1)>1?"s":""})">
                🔄 Date Changed: ${Xe(b.rescheduledFrom)} ➔ ${Xe(r)}
              </span>
            `:""}

            <!-- Added By Badge (Shows Who Created the Task) -->
            ${$?`
              <span class="ci360-badge creator-badge" title="Created / Added by: ${v($)}">
                ✍️ Added by: ${v($)}
              </span>
            `:""}

            <!-- Category -->
            ${b.category?`
              <span class="ci360-badge category-badge">
                #${v(b.category)}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${a?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name (if different from addedByName) -->
            ${c&&(b.personnelId?.name||b.userId?.name)&&(b.personnelId?.name||b.userId?.name)!==$?`
              <span class="ci360-badge personnel-badge" title="Assigned Employee">
                👤 Assigned: ${v(b.personnelId?.name||b.userId?.name)}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu: Previous tasks can be edited, deleted, changed by all -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${b._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${b._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function rt(){const b=aa(n.selectedDate,l.weekStartsOn),A=Xe(b[0]),I=Xe(b[6]),a=We();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${A} – ${I}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${b.map(r=>{const _=r===a,P=r===n.selectedDate,$=S(r),B=j($,a);return`
              <div class="ci360-day-column ${_?"is-today":""} ${P?"is-selected":""}" data-date="${r}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${r}">
                  <div class="day-name">${ma(r)}</div>
                  <div class="day-number">${new Date(r+"T00:00:00").getDate()}</div>
                  ${_?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${B.completed}/${B.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${B.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${$.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:$.map(T=>`
                    <div class="ci360-mini-task-card ${T.status==="Completed"?"done":""}" data-id="${T._id}">
                      <button type="button" class="mini-check ${T.status==="Completed"?"checked":""}" data-action="toggle" data-id="${T._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${T._id}">
                        <div class="mini-title">${v(T.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(T.priority||"medium").toLowerCase()}">${T.priority||"Med"}</span>
                          ${T.dueTime?`<span class="mini-time">${v(T.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button (Locked on past dates) -->
                ${r<a?`
                  <div class="day-col-locked-note" title="Cannot add tasks on previous dates">
                    <span>🔒 Past Date</span>
                  </div>
                `:`
                  <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${r}">
                    + Add Task
                  </button>
                `}

              </div>
            `}).join("")}
        </div>

      </div>
    `}function St(){const b=aa(n.selectedDate,l.weekStartsOn),A=Tt(b[0]),I=Tt(b[6]),a=We(),r=n.tasks.filter(O=>{if(O.isDeleted===!0)return!1;const H=O.dateStr||(O.dueDate?new Date(O.dueDate).toISOString().slice(0,10):"");return b.includes(H)}),_=r.length,P=r.filter(O=>O.status==="Completed").length,$=r.filter(O=>O.status==="In Progress").length,B=_>0?Math.round(P/_*100):0,T={Urgent:0,High:0,Medium:0,Low:0};return r.forEach(O=>{const H=O.priority||"Medium";T[H]!==void 0&&T[H]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${A} – ${I}</div>
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
            <span class="value" style="font-size:28px;color:var(--green-500)">${P}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${$}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${B}%</span>
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
                ${b.map(O=>{const H=S(O),x=j(H,a);return`
                    <tr>
                      <td><strong>${ma(O)}</strong></td>
                      <td>${Xe(O)}</td>
                      <td>${x.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${x.completed}</td>
                      <td>${x.pending+x.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${x.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${x.percent}%</span>
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
              <div style="font-size:22px;font-weight:700">${T.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${T.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${T.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${T.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function nt(){const b=document.getElementById("btnViewDaily"),A=document.getElementById("btnViewWeekly"),I=document.getElementById("btnViewReport");b&&(b.onclick=()=>{n.viewMode="daily",N()}),A&&(A.onclick=()=>{n.viewMode="weekly",N()}),I&&(I.onclick=()=>{n.viewMode="report",N()});const a=document.getElementById("btnPrevDay"),r=document.getElementById("btnNextDay"),_=document.getElementById("btnJumpToday"),P=document.getElementById("hiddenDateInput"),$=document.getElementById("datePickerBadge");a&&(a.onclick=()=>{n.selectedDate=Wt(n.selectedDate,-1),N()}),r&&(r.onclick=()=>{n.selectedDate=Wt(n.selectedDate,1),N()}),_&&(_.onclick=()=>{n.selectedDate=We(),N()}),$&&P&&($.onclick=()=>{try{typeof P.showPicker=="function"?P.showPicker():P.focus()}catch{P.focus()}},P.onchange=Q=>{Q.target.value&&(n.selectedDate=Q.target.value,N())});const B=document.getElementById("admTeamSelect");B&&(B.onchange=Q=>{n.selectedPersonnelId=Q.target.value,N()});const T=document.getElementById("btnOpenAddTaskModal");T&&(T.onclick=()=>{if(n.selectedDate<We()){y("Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.",!0);return}Oe()});const O=document.getElementById("btnPlannerActionsMenu"),H=document.getElementById("plannerActionsDropdown");O&&H&&(O.onclick=Q=>{Q.stopPropagation(),H.classList.toggle("hidden")},document.addEventListener("click",Q=>{!H.contains(Q.target)&&Q.target!==O&&H.classList.add("hidden")}));const x=document.getElementById("btnActionImport");x&&(x.onclick=()=>{H?.classList.add("hidden"),ct()});const z=document.getElementById("btnActionExportPng");z&&(z.onclick=()=>{H?.classList.add("hidden"),Me()});const X=document.getElementById("btnActionExportPdf");X&&(X.onclick=()=>{H?.classList.add("hidden"),ce()});const ee=document.getElementById("btnActionBackup");ee&&(ee.onclick=()=>{H?.classList.add("hidden"),st()});const te=document.getElementById("btnActionSettings");te&&(te.onclick=()=>{H?.classList.add("hidden"),ve()})}function Fe(b){if(n.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(z=>{z.onclick=()=>{n.filterStatus=z.dataset.f,N()}});const A=document.getElementById("plannerTaskSearchInp");A&&(A.oninput=z=>{n.searchQuery=z.target.value,N()});const I=document.getElementById("btnClearSearch");I&&(I.onclick=()=>{n.searchQuery="",N()});const a=document.getElementById("quickAddTitleInp"),r=document.getElementById("quickAddCompletionDate"),_=document.getElementById("quickAddPriority"),P=document.getElementById("quickAddCategory"),$=document.getElementById("btnQuickAddSubmit"),B=async()=>{const z=We();if(n.selectedDate<z){y("Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.",!0);return}const X=(a?.value||"").trim();if(!X){y("Please enter a task title",!0),a?.focus();return}const ee=(r?.value||"").trim()||n.selectedDate;if(ee<z){y("Cannot set completion date on a previous date.",!0);return}try{const te={title:X,dateStr:ee,completionDate:ee,completionDateStr:ee,dueDate:ee,priority:_?.value||l.defaultPriority,category:P?.value||"General",status:"Pending"};if(c){const p=document.getElementById("quickAddAssignee")?.value;p==="all"?(te.assignAll=!0,te.personnelId="all"):p?te.personnelId=p:n.selectedPersonnelId!=="all"&&(te.personnelId=n.selectedPersonnelId)}const Q=await Ce("/tasks",te);n.tasks.unshift(Q),y("Task added to today's focus! ✨"),a&&(a.value="",a.focus()),N()}catch(te){y(te.message,!0)}};$&&($.onclick=B),a&&(a.onkeydown=z=>{z.key==="Enter"&&B()}),document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(z=>{z.onclick=()=>{const X=z.dataset.empKey;n.collapsedEmployees[X]=!n.collapsedEmployees[X],N()}});const T=document.getElementById("btnToggleEmpGrouping");T&&(T.onclick=()=>{n.groupByEmployee=!n.groupByEmployee,N()});const O=document.getElementById("btnExpandAllEmp");O&&(O.onclick=()=>{n.collapsedEmployees={},N()});const H=document.getElementById("btnCollapseAllEmp");H&&(H.onclick=()=>{document.querySelectorAll(".ci360-emp-group-card").forEach(z=>{const X=z.dataset.empKey;X&&(n.collapsedEmployees[X]=!0)}),N()});const x=document.getElementById("btnEmptyStateImport");x&&(x.onclick=()=>ct())}if(n.viewMode==="weekly"){const A=document.getElementById("btnPrevWeek"),I=document.getElementById("btnNextWeek"),a=document.getElementById("btnThisWeek");A&&(A.onclick=()=>{n.selectedDate=Wt(n.selectedDate,-7),N()}),I&&(I.onclick=()=>{n.selectedDate=Wt(n.selectedDate,7),N()}),a&&(a.onclick=()=>{n.selectedDate=We(),N()}),document.querySelectorAll(".day-col-header").forEach(r=>{r.onclick=()=>{n.selectedDate=r.dataset.date,n.viewMode="daily",N()}}),document.querySelectorAll('[data-action="add-day"]').forEach(r=>{r.onclick=()=>{Oe(null,r.dataset.date)}})}if(n.viewMode==="report"){const A=document.getElementById("btnDownloadWeeklyPdf");A&&(A.onclick=ce)}i.querySelectorAll('[data-action="toggle"]').forEach(A=>{A.onclick=async I=>{I.stopPropagation();const a=A.dataset.id;await ot(a)}}),i.querySelectorAll('[data-action="edit"]').forEach(A=>{A.onclick=I=>{I.stopPropagation();const a=A.dataset.id,r=n.tasks.find(_=>_._id===a);r&&Oe(r)}}),i.querySelectorAll('[data-action="delete"]').forEach(A=>{A.onclick=async I=>{I.stopPropagation();const a=A.dataset.id;await ut(a)}})}async function ot(b){const A=n.tasks.find(a=>a._id===b);if(!A)return;const I=A.status!=="Completed";try{const a=await Ze(`/tasks/${b}/toggle`,{}),r=n.tasks.findIndex(_=>_._id===b);r!==-1&&(n.tasks[r]=a),I?(l.soundEnabled&&Ta(),y("Task marked as completed! 🎉")):y("Task reopened as pending."),N()}catch(a){y(a.message,!0)}}async function ut(b){const A=n.tasks.find(I=>I._id===b);if(A&&confirm(`Are you sure you want to remove "${A.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await et(`/tasks/${b}`),n.tasks=n.tasks.filter(I=>I._id!==b),y("Task removed from planner (safely stored in database archive)"),N()}catch(I){y(I.message,!0)}}function Oe(b=null,A=null){const I=!!b,a=We(),r=b?b.completionDateStr||b.dateStr||(b.dueDate?new Date(b.dueDate).toISOString().slice(0,10):n.selectedDate):A&&A>=a?A:n.selectedDate>=a?n.selectedDate:a,_=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${I?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${v(b?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${v(b?.description||"")}</textarea>
          </div>

          <!-- Date Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${r}" ${I?"":`min="${a}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${b?.completionDateStr||b?.dateStr||""}" ${I?"":`min="${a}"`} placeholder="Defaults to that day">
              <small style="color:var(--text-3);font-size:11px;">If left blank, will default to that day (${r})</small>
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${b?.priority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!b&&l.defaultPriority==="Medium"||b?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!b&&l.defaultPriority==="High"||b?.priority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${b?.priority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${b?.status==="Pending"||b?.status==="Todo"||!b?"selected":""}>Pending</option>
                <option value="In Progress" ${b?.status==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${b?.status==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${v(b?.category||"General")}">
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
                <option value="me" ${!b||!b?.personnelId&&!b?.assignAll?"selected":""}>Myself (Admin)</option>
                <option value="all" ${b?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${n.personnelList.map(x=>{const z=b?.personnelId?._id===x._id||b?.personnelId===x._id;return`<option value="${x._id}" ${z?"selected":""}>👤 ${v(x.name)} (${v(x.department||x.role||"Member")})</option>`}).join("")}
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
    `,P=Gt(_),$=P.querySelector("#taskForm"),B=P.querySelector("#btnModalClose"),T=P.querySelector("#btnCancelModal"),O=P.querySelector("#btnModalDeleteTask"),H=()=>P.remove();B&&(B.onclick=H),T&&(T.onclick=H),O&&b&&(O.onclick=async()=>{H(),await ut(b._id)}),$.onsubmit=async x=>{x.preventDefault();const z=P.querySelector("#taskTitle").value.trim(),X=P.querySelector("#taskDesc").value.trim(),ee=P.querySelector("#taskDate").value||r,Q=P.querySelector("#taskCompletionDate")?.value?.trim()||ee||n.selectedDate,p=P.querySelector("#taskPriority").value,m=P.querySelector("#taskStatus").value,s=P.querySelector("#taskCategory").value.trim()||"General";if(!z){y("Task title is required",!0);return}if(!I&&(Q<a||ee<a)){y("Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.",!0);return}const o={title:z,description:X,dateStr:Q,completionDate:Q,completionDateStr:Q,dueDate:Q,startTime:"",dueTime:"",priority:p,status:m,category:s};if(c){const F=P.querySelector("#taskAssignee")?.value;F==="all"?(o.assignAll=!0,o.personnelId="all"):F==="me"?o.personnelId="me":F&&(o.personnelId=F)}const h=P.querySelector("#btnSaveTask");h.disabled=!0,h.textContent="Saving...";try{if(I){const F=await Yt(`/tasks/${b._id}`,o),C=n.tasks.findIndex(V=>V._id===b._id);C!==-1&&(n.tasks[C]=F),y("Task updated successfully! ✍️")}else{const F=await Ce("/tasks",o);Array.isArray(F.tasks)?F.tasks.forEach(C=>n.tasks.unshift(C)):n.tasks.unshift(F),y("Task created successfully! ✨")}H(),N()}catch(F){y(F.message,!0),h.disabled=!1,h.textContent=I?"Save Changes":"Create Task"}}}function ct(){let b=[];const A=`
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
    `,I=Gt(A),a=()=>I.remove();I.querySelector("#btnImportClose").onclick=a,I.querySelector("#btnCancelImport").onclick=a;const r=I.querySelector("#importTextarea"),_=I.querySelector("#importFileInput"),P=I.querySelector("#importDropzone"),$=I.querySelector("#previewListArea"),B=I.querySelector("#previewCountLabel"),T=I.querySelector("#btnConfirmImport"),O=I.querySelector("#importFileInfo");function H(z){if(!z)return[];const X=z.split(/\r?\n/),ee=[];for(let te of X)te=te.trim(),te&&(te=te.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),te=te.replace(/^[-*•]\s+/,""),te=te.replace(/^\d+[\.\)]\s+/,""),te=te.trim(),te&&ee.push(te));return ee}function x(){const z=r.value,X=H(z),ee=I.querySelector("#importTargetDate").value,te=S(ee),Q=new Set(te.map(p=>(p.title||"").trim().toLowerCase()));b=[];for(const p of X){const m=Q.has(p.toLowerCase());b.push({title:p,isDuplicate:m})}if(B.textContent=`Preview (${b.length} ${b.length===1?"task":"tasks"} found)`,T.disabled=b.length===0,T.textContent=`Import ${b.length} ${b.length===1?"Task":"Tasks"}`,b.length===0){$.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}$.innerHTML=b.map((p,m)=>`
        <div class="preview-item ${p.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${m+1}.</span>
          <span class="preview-title">${v(p.title)}</span>
          ${p.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}r.oninput=x,P.onclick=()=>_.click(),_.onchange=z=>{const X=z.target.files[0];if(!X)return;O.textContent=`File selected: ${X.name} (${Math.round(X.size/1024)} KB)`;const ee=new FileReader;ee.onload=te=>{r.value=te.target.result,x()},ee.readAsText(X)},P.ondragover=z=>{z.preventDefault(),P.classList.add("dragover")},P.ondragleave=()=>P.classList.remove("dragover"),P.ondrop=z=>{z.preventDefault(),P.classList.remove("dragover");const X=z.dataTransfer.files[0];if(X&&(X.type==="text/plain"||X.name.endsWith(".txt"))){O.textContent=`File dropped: ${X.name}`;const ee=new FileReader;ee.onload=te=>{r.value=te.target.result,x()},ee.readAsText(X)}else y("Please drop a valid .txt plain-text file",!0)},T.onclick=async()=>{if(b.length===0)return;T.disabled=!0,T.textContent="Importing...";const z=I.querySelector("#importTargetDate").value;if(z<We()){y("Cannot import tasks for previous dates. Target date must be today or later.",!0),T.disabled=!1,T.textContent=`Import ${b.length} ${b.length===1?"Task":"Tasks"}`;return}const X=I.querySelector("#importPriority").value,ee=I.querySelector("#importCategory").value.trim()||"General",te={date:z,tasks:b.map(Q=>({title:Q.title,priority:X,category:ee,status:"Pending"}))};c&&n.selectedPersonnelId!=="all"&&(te.personnelId=n.selectedPersonnelId);try{const Q=await Ce("/tasks/bulk-import",te);Array.isArray(Q.tasks)&&Q.tasks.forEach(p=>n.tasks.unshift(p)),y(`Imported ${Q.importedCount} tasks successfully! (${Q.skippedCount} skipped duplicates)`),a(),n.selectedDate=z,N()}catch(Q){y(Q.message,!0),T.disabled=!1,T.textContent="Retry Import"}}}async function Me(){const b=S(n.selectedDate),A=j(b,We()),I=Tt(n.selectedDate),a=2,r=800,_=160,P=90,$=74,B=70,T=Math.max(120,b.length*$),O=_+P+T+B,H=document.createElement("canvas");H.width=r*a,H.height=O*a;const x=H.getContext("2d");x.scale(a,a);const z=document.documentElement.getAttribute("data-theme")==="dark",X=z?"#0F172A":"#F8FAFC",ee=z?"#1E293B":"#FFFFFF",te=z?"#334155":"#E2E8F0",Q=z?"#F8FAFC":"#0F172A",p=z?"#94A3B8":"#475569",m="#4F46E5",s="#10B981",o="#F59E0B";x.fillStyle=X,x.fillRect(0,0,r,O),x.fillStyle=ee,ze(x,24,20,r-48,_-30,16),x.fill(),x.strokeStyle=te,x.lineWidth=1,x.stroke(),x.fillStyle=m,x.font="bold 12px Inter, sans-serif",x.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),x.fillStyle=Q,x.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',x.fillText(I,44,86),x.fillStyle=p,x.font="13px Inter, sans-serif",x.fillText(`Planned focus list · ${A.completed} of ${A.total} tasks completed (${A.percent}%)`,44,114);const h=_+6;x.fillStyle=ee,ze(x,24,h,r-48,P-16,12),x.fill(),x.stroke();const F=[{label:"TOTAL TASKS",val:String(A.total),color:Q},{label:"COMPLETED",val:String(A.completed),color:s},{label:"IN PROGRESS",val:String(A.inProgress),color:o},{label:"PENDING",val:String(A.pending),color:p},{label:"PROGRESS",val:`${A.percent}%`,color:m}],C=(r-48)/F.length;F.forEach((L,M)=>{const Y=24+M*C+20;x.fillStyle=L.color,x.font="bold 20px Inter, sans-serif",x.fillText(L.val,Y,h+36),x.fillStyle=p,x.font="10px Inter, sans-serif",x.fillText(L.label,Y,h+54)});const V=h+P;x.fillStyle=ee,ze(x,24,V,r-48,T+10,16),x.fill(),x.stroke(),b.length===0?(x.fillStyle=p,x.font="14px Inter, sans-serif",x.textAlign="center",x.fillText("No scheduled tasks recorded for this date.",r/2,V+60),x.textAlign="left"):b.forEach((L,M)=>{const Y=V+16+M*$,_e=L.status==="Completed";x.beginPath(),x.arc(48,Y+14,10,0,Math.PI*2),_e?(x.fillStyle=s,x.fill(),x.strokeStyle="#FFFFFF",x.lineWidth=2,x.beginPath(),x.moveTo(44,Y+14),x.lineTo(47,Y+17),x.lineTo(52,Y+11),x.stroke()):(x.strokeStyle=te,x.lineWidth=2,x.stroke()),x.fillStyle=_e?p:Q,x.font=`${_e?"normal":"500"} 14px Inter, sans-serif`;const me=L.title.length>55?L.title.slice(0,52)+"...":L.title;if(x.fillText(me,70,Y+18),_e){const De=x.measureText(me);x.strokeStyle=p,x.lineWidth=1.2,x.beginPath(),x.moveTo(70,Y+14),x.lineTo(70+De.width,Y+14),x.stroke()}const le=L.priority||"Medium";let ue="#E2E8F0",W="#334155";le==="Urgent"?(ue="#FEE2E2",W="#DC2626"):le==="High"?(ue="#FEF3C7",W="#D97706"):le==="Low"&&(ue="#ECFDF5",W="#059669"),x.fillStyle=ue,ze(x,r-150,Y+4,60,20,10),x.fill(),x.fillStyle=W,x.font="bold 10px Inter, sans-serif",x.fillText(le,r-138,Y+18);const re=L.createdByName||L.createdBy?.name||(L.createdBy?.email?L.createdBy.email.split("@")[0]:"")||L.personnelId?.name||L.userId?.name||"Member",be=L.completionDateStr||L.dateStr||"",de=[];de.push(`✍️ Added by: ${re}`),be&&de.push(`📅 Due: ${Xe(be)}`),L.dueTime&&de.push(`🕒 ${L.dueTime}`),L.category&&L.category!=="General"&&de.push(`#${L.category}`);const he=de.join("   ·   ");x.fillStyle=p,x.font="11px Inter, sans-serif",x.fillText(he,70,Y+36),M<b.length-1&&(x.strokeStyle=te,x.lineWidth=.6,x.beginPath(),x.moveTo(40,Y+54),x.lineTo(r-40,Y+54),x.stroke())});const oe=O-35;x.fillStyle=p,x.font="11px Inter, sans-serif",x.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,oe);try{const L=H.toDataURL("image/png"),M=document.createElement("a");M.href=L,M.download=`ci360-daily-planner-${n.selectedDate}.png`,document.body.appendChild(M),M.click(),M.remove(),y("Daily Planner image exported! 🖼️")}catch(L){y("Failed to export image: "+L.message,!0)}}function ze(b,A,I,a,r,_){b.beginPath(),b.moveTo(A+_,I),b.lineTo(A+a-_,I),b.quadraticCurveTo(A+a,I,A+a,I+_),b.lineTo(A+a,I+r-_),b.quadraticCurveTo(A+a,I+r,A+a-_,I+r),b.lineTo(A+_,I+r),b.quadraticCurveTo(A,I+r,A,I+r-_),b.lineTo(A,I+_),b.quadraticCurveTo(A,I,A+_,I),b.closePath()}function ce(){const b=aa(n.selectedDate,l.weekStartsOn),A=Tt(b[0]),I=Tt(b[6]);We();const a=n.tasks.filter(T=>{if(T.isDeleted===!0)return!1;const O=T.dateStr||(T.dueDate?new Date(T.dueDate).toISOString().slice(0,10):"");return b.includes(O)}),r=a.length,_=a.filter(T=>T.status==="Completed").length,P=r>0?Math.round(_/r*100):0,$=window.open("","_blank");if(!$){y("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const B=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${A}</title>
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
            <div class="period">${A} – ${I}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${r}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${_}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${r-_}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${P}%</div>
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
            ${b.map(T=>{const O=S(T);return O.length===0?`<tr><td><strong>${Xe(T)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:O.map(H=>`
                <tr>
                  <td><strong>${Xe(T)}</strong></td>
                  <td>${v(H.title)}</td>
                  <td><span class="badge badge-${(H.priority||"medium").toLowerCase().slice(0,3)}">${H.priority||"Medium"}</span></td>
                  <td>${v(H.category||"General")}</td>
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
    `;$.document.write(B),$.document.close(),y("Weekly PDF report generated for printing! 📄")}function st(){const A=Gt(`
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
    `),I=()=>A.remove();A.querySelector("#btnBackupClose").onclick=I;const a=A.querySelector("#btnDownloadBackupJson");a.onclick=async()=>{a.disabled=!0,a.textContent="Generating backup...";try{const T=await Re("/tasks/backup"),O=new Blob([JSON.stringify(T,null,2)],{type:"application/json"}),H=URL.createObjectURL(O),x=document.createElement("a");x.href=H,x.download=`ci360-planner-backup-${We()}.json`,document.body.appendChild(x),x.click(),x.remove(),y("Planner backup downloaded successfully! 💾")}catch(T){y("Backup export failed: "+T.message,!0)}finally{a.disabled=!1,a.textContent="Download JSON Backup"}};const r=A.querySelector("#restoreFileInput"),_=A.querySelector("#restorePreviewArea"),P=A.querySelector("#restoreCountText"),$=A.querySelector("#btnExecuteRestore");let B=null;r.onchange=T=>{const O=T.target.files[0];if(!O)return;const H=new FileReader;H.onload=x=>{try{const z=JSON.parse(x.target.result),X=Array.isArray(z.tasks)?z.tasks:Array.isArray(z)?z:null;if(!X||X.length===0){y("Invalid backup file: No tasks found",!0);return}B=X,_.style.display="block",P.textContent=`Valid backup: ${X.length} tasks ready to restore.`,$.disabled=!1}catch(z){y("Error parsing JSON backup file: "+z.message,!0),_.style.display="none",$.disabled=!0}},H.readAsText(O)},$.onclick=async()=>{if(!B||B.length===0)return;$.disabled=!0,$.textContent="Restoring...";const T=A.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const O=await Ce("/tasks/restore",{tasks:B,mode:T});y(`Restored ${O.restoredCount} tasks! (${O.skippedCount} skipped) ✨`),I(),await R()}catch(O){y("Restore failed: "+O.message,!0),$.disabled=!1,$.textContent="Retry Restore"}}}function ve(){const b=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${v(l.displayName||"Daily Planner")}">
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
              <input type="text" id="setTimezone" class="input" value="${v(l.timezone||"Asia/Kolkata")}" readonly>
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
    `,A=Gt(b),I=()=>A.remove();A.querySelector("#btnSettingsClose").onclick=I,A.querySelector("#btnCancelSettings").onclick=I;const a=A.querySelector("#btnPlannerTestNotif");a&&(a.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await requestNotificationPermission()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):y("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true");const r=A.querySelector("#setNotifEnabled");r&&(r.checked=!0);const _=A.querySelector("#plannerNotifStatusLabel");_&&(_.textContent="🟢 Active on this laptop"),await triggerSystemNotification({title:"CI360 Planner Alert 🔔",message:"Laptop & browser notifications are active and ready!",id:"ci360-planner-test-"+Date.now()}),y("Test notification sent to your laptop/browser! 🔔")}),A.querySelector("#settingsForm").onsubmit=r=>{r.preventDefault(),l.displayName=A.querySelector("#setDisplayName").value.trim()||"Daily Planner",l.weekStartsOn=Number(A.querySelector("#setWeekStart").value),l.defaultPriority=A.querySelector("#setDefaultPriority").value,l.density=A.querySelector("#setDensity").value,l.soundEnabled=A.querySelector("#setSound").checked;const _=A.querySelector("#setNotifEnabled")?.checked;localStorage.setItem("ci360_notif_enabled",_?"true":"false"),_&&"Notification"in window&&Notification.permission==="default"&&requestNotificationPermission(),Aa(l),y("Planner preferences saved! ⚙️"),I(),N()}}}function Ea(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
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
  `,document.head.appendChild(i)}function Ia(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function Da(i,t,e,d,g){const c={move:i,variations:g};return t&&(c.suffix=t),e&&(c.nag=e),d!==null&&(c.comment=d),c}function Pa(...i){const[t,...e]=i;let d=t;for(const g of e)g!==null&&(d.variations=[g,...g.variations],g.variations=[],d=g);return t}function Fa(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const d=e.variations[0];if(!d){e.comment=t.marker.comment;break}e=d}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function La(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function Et(i,t,e,d){var g=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(g,Et.prototype),g.expected=t,g.found=e,g.location=d,g.name="SyntaxError",g}La(Et,Error);function ia(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}Et.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,d;for(d=0;d<i.length;d++)if(i[d].source===this.location.source){e=i[d].text.split(/\r\n|\n|\r/g);break}var g=this.location.start,c=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(g):g,l=this.location.source+":"+c.line+":"+c.column;if(e){var n=this.location.end,R=ia("",c.line.toString().length," "),G=e[g.line-1],S=g.line===n.line?n.column:G.length+1,E=S-g.column||1;t+=`
 --> `+l+`
`+R+` |
`+c.line+" | "+G+`
`+R+" | "+ia("",g.column-1," ")+ia("",E,"^")}else t+=`
 at `+l}return t};Et.buildMessage=function(i,t){var e={literal:function(G){return'"'+g(G.text)+'"'},class:function(G){var S=G.parts.map(function(E){return Array.isArray(E)?c(E[0])+"-"+c(E[1]):c(E)});return"["+(G.inverted?"^":"")+S.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(G){return G.description}};function d(G){return G.charCodeAt(0).toString(16).toUpperCase()}function g(G){return G.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(S){return"\\x0"+d(S)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(S){return"\\x"+d(S)})}function c(G){return G.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(S){return"\\x0"+d(S)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(S){return"\\x"+d(S)})}function l(G){return e[G.type](G)}function n(G){var S=G.map(l),E,j;if(S.sort(),S.length>0){for(E=1,j=1;E<S.length;E++)S[E-1]!==S[E]&&(S[j]=S[E],j++);S.length=j}switch(S.length){case 1:return S[0];case 2:return S[0]+" or "+S[1];default:return S.slice(0,-1).join(", ")+", or "+S[S.length-1]}}function R(G){return G?'"'+g(G)+'"':"end of input"}return"Expected "+n(i)+" but "+R(t)+" found."};function qa(i,t){t=t!==void 0?t:{};var e={},d=t.grammarSource,g={pgn:Pt},c=Pt,l="[",n='"',R="]",G=".",S="O-O-O",E="O-O",j="0-0-0",N="0-0",ge="$",ye="{",Ve="}",tt=";",rt="(",St=")",nt="1-0",Fe="0-1",ot="1/2-1/2",ut="*",Oe=/^[a-zA-Z]/,ct=/^[^"]/,Me=/^[0-9]/,ze=/^[.]/,ce=/^[a-zA-Z1-8\-=]/,st=/^[+#]/,ve=/^[!?]/,b=/^[^}]/,A=/^[^\r\n]/,I=/^[ \t\r\n]/,a=Qe("tag pair"),r=qe("[",!1),_=qe('"',!1),P=qe("]",!1),$=Qe("tag name"),B=at([["a","z"],["A","Z"]],!1,!1),T=Qe("tag value"),O=at(['"'],!0,!1),H=Qe("move number"),x=at([["0","9"]],!1,!1),z=qe(".",!1),X=at(["."],!1,!1),ee=Qe("standard algebraic notation"),te=qe("O-O-O",!1),Q=qe("O-O",!1),p=qe("0-0-0",!1),m=qe("0-0",!1),s=at([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),o=at(["+","#"],!1,!1),h=Qe("suffix annotation"),F=at(["!","?"],!1,!1),C=Qe("NAG"),V=qe("$",!1),oe=Qe("brace comment"),L=qe("{",!1),M=at(["}"],!0,!1),Y=qe("}",!1),_e=Qe("rest of line comment"),me=qe(";",!1),le=at(["\r",`
`],!0,!1),ue=Qe("variation"),W=qe("(",!1),re=qe(")",!1),be=Qe("game termination marker"),de=qe("1-0",!1),he=qe("0-1",!1),De=qe("1/2-1/2",!1),Be=qe("*",!1),Ge=Qe("whitespace"),Le=at([" ","	","\r",`
`],!1,!1),pe=function(f,w){return Fa(f,w)},Ee=function(f){return Object.fromEntries(f)},Ue=function(f,w){return[f,w]},Ne=function(f,w){return{root:f,marker:w}},Pe=function(f,w){return Pa(Ia(f),...w.flat())},Te=function(f,w,k,J,Z){return Da(f,w,k,J,Z)},Ie=function(f){return f},ke=function(f){return f.replace(/[\r\n]+/g," ")},fe=function(f){return f.trim()},q=function(f){return f},U=function(f,w){return{result:f,comment:w}},u=t.peg$currPos|0,Ae=[{line:1,column:1}],we=u,lt=t.peg$maxFailExpected||[],K=t.peg$silentFails|0,ht;if(t.startRule){if(!(t.startRule in g))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');c=g[t.startRule]}function qe(f,w){return{type:"literal",text:f,ignoreCase:w}}function at(f,w,k){return{type:"class",parts:f,inverted:w,ignoreCase:k}}function Ct(){return{type:"end"}}function Qe(f){return{type:"other",description:f}}function It(f){var w=Ae[f],k;if(w)return w;if(f>=Ae.length)k=Ae.length-1;else for(k=f;!Ae[--k];);for(w=Ae[k],w={line:w.line,column:w.column};k<f;)i.charCodeAt(k)===10?(w.line++,w.column=1):w.column++,k++;return Ae[f]=w,w}function Dt(f,w,k){var J=It(f),Z=It(w),$e={source:d,start:{offset:f,line:J.line,column:J.column},end:{offset:w,line:Z.line,column:Z.column}};return $e}function ae(f){u<we||(u>we&&(we=u,lt=[]),lt.push(f))}function Bt(f,w,k){return new Et(Et.buildMessage(f,w),f,w,k)}function Pt(){var f,w,k;return f=u,w=Zt(),k=ea(),f=pe(w,k),f}function Zt(){var f,w,k;for(f=u,w=[],k=vt();k!==e;)w.push(k),k=vt();return k=Se(),f=Ee(w),f}function vt(){var f,w,k,J,Z,$e,pt;return K++,f=u,Se(),i.charCodeAt(u)===91?(w=l,u++):(w=e,K===0&&ae(r)),w!==e?(Se(),k=Nt(),k!==e?(Se(),i.charCodeAt(u)===34?(J=n,u++):(J=e,K===0&&ae(_)),J!==e?(Z=jt(),i.charCodeAt(u)===34?($e=n,u++):($e=e,K===0&&ae(_)),$e!==e?(Se(),i.charCodeAt(u)===93?(pt=R,u++):(pt=e,K===0&&ae(P)),pt!==e?f=Ue(k,Z):(u=f,f=e)):(u=f,f=e)):(u=f,f=e)):(u=f,f=e)):(u=f,f=e),K--,f===e&&K===0&&ae(a),f}function Nt(){var f,w,k;if(K++,f=u,w=[],k=i.charAt(u),Oe.test(k)?u++:(k=e,K===0&&ae(B)),k!==e)for(;k!==e;)w.push(k),k=i.charAt(u),Oe.test(k)?u++:(k=e,K===0&&ae(B));else w=e;return w!==e?f=i.substring(f,u):f=w,K--,f===e&&(w=e,K===0&&ae($)),f}function jt(){var f,w,k;for(K++,f=u,w=[],k=i.charAt(u),ct.test(k)?u++:(k=e,K===0&&ae(O));k!==e;)w.push(k),k=i.charAt(u),ct.test(k)?u++:(k=e,K===0&&ae(O));return f=i.substring(f,u),K--,w=e,K===0&&ae(T),f}function ea(){var f,w,k;return f=u,w=Ot(),Se(),k=xe(),k===e&&(k=null),Se(),f=Ne(w,k),f}function Ot(){var f,w,k,J;for(f=u,w=Ut(),w===e&&(w=null),k=[],J=Ft();J!==e;)k.push(J),J=Ft();return f=Pe(w,k),f}function Ft(){var f,w,k,J,Z,$e,pt,At;if(f=u,Se(),_t(),Se(),w=Lt(),w!==e){for(k=gt(),k===e&&(k=null),J=[],Z=xt();Z!==e;)J.push(Z),Z=xt();for(Z=Se(),$e=Ut(),$e===e&&($e=null),pt=[],At=ie();At!==e;)pt.push(At),At=ie();f=Te(w,k,J,$e,pt)}else u=f,f=e;return f}function _t(){var f,w,k,J,Z,$e;for(K++,f=u,w=[],k=i.charAt(u),Me.test(k)?u++:(k=e,K===0&&ae(x));k!==e;)w.push(k),k=i.charAt(u),Me.test(k)?u++:(k=e,K===0&&ae(x));if(i.charCodeAt(u)===46?(k=G,u++):(k=e,K===0&&ae(z)),k!==e){for(J=Se(),Z=[],$e=i.charAt(u),ze.test($e)?u++:($e=e,K===0&&ae(X));$e!==e;)Z.push($e),$e=i.charAt(u),ze.test($e)?u++:($e=e,K===0&&ae(X));w=[w,k,J,Z],f=w}else u=f,f=e;return K--,f===e&&(w=e,K===0&&ae(H)),f}function Lt(){var f,w,k,J,Z,$e;if(K++,f=u,w=u,i.substr(u,5)===S?(k=S,u+=5):(k=e,K===0&&ae(te)),k===e&&(i.substr(u,3)===E?(k=E,u+=3):(k=e,K===0&&ae(Q)),k===e&&(i.substr(u,5)===j?(k=j,u+=5):(k=e,K===0&&ae(p)),k===e&&(i.substr(u,3)===N?(k=N,u+=3):(k=e,K===0&&ae(m)),k===e))))if(k=u,J=i.charAt(u),Oe.test(J)?u++:(J=e,K===0&&ae(B)),J!==e){if(Z=[],$e=i.charAt(u),ce.test($e)?u++:($e=e,K===0&&ae(s)),$e!==e)for(;$e!==e;)Z.push($e),$e=i.charAt(u),ce.test($e)?u++:($e=e,K===0&&ae(s));else Z=e;Z!==e?(J=[J,Z],k=J):(u=k,k=e)}else u=k,k=e;return k!==e?(J=i.charAt(u),st.test(J)?u++:(J=e,K===0&&ae(o)),J===e&&(J=null),k=[k,J],w=k):(u=w,w=e),w!==e?f=i.substring(f,u):f=w,K--,f===e&&(w=e,K===0&&ae(ee)),f}function gt(){var f,w,k;for(K++,f=u,w=[],k=i.charAt(u),ve.test(k)?u++:(k=e,K===0&&ae(F));k!==e;)w.push(k),w.length>=2?k=e:(k=i.charAt(u),ve.test(k)?u++:(k=e,K===0&&ae(F)));return w.length<1?(u=f,f=e):f=w,K--,f===e&&(w=e,K===0&&ae(h)),f}function xt(){var f,w,k,J,Z;if(K++,f=u,Se(),i.charCodeAt(u)===36?(w=ge,u++):(w=e,K===0&&ae(V)),w!==e){if(k=u,J=[],Z=i.charAt(u),Me.test(Z)?u++:(Z=e,K===0&&ae(x)),Z!==e)for(;Z!==e;)J.push(Z),Z=i.charAt(u),Me.test(Z)?u++:(Z=e,K===0&&ae(x));else J=e;J!==e?k=i.substring(k,u):k=J,k!==e?f=Ie(k):(u=f,f=e)}else u=f,f=e;return K--,f===e&&K===0&&ae(C),f}function Ut(){var f;return f=Ht(),f===e&&(f=D()),f}function Ht(){var f,w,k,J,Z;if(K++,f=u,i.charCodeAt(u)===123?(w=ye,u++):(w=e,K===0&&ae(L)),w!==e){for(k=u,J=[],Z=i.charAt(u),b.test(Z)?u++:(Z=e,K===0&&ae(M));Z!==e;)J.push(Z),Z=i.charAt(u),b.test(Z)?u++:(Z=e,K===0&&ae(M));k=i.substring(k,u),i.charCodeAt(u)===125?(J=Ve,u++):(J=e,K===0&&ae(Y)),J!==e?f=ke(k):(u=f,f=e)}else u=f,f=e;return K--,f===e&&(w=e,K===0&&ae(oe)),f}function D(){var f,w,k,J,Z;if(K++,f=u,i.charCodeAt(u)===59?(w=tt,u++):(w=e,K===0&&ae(me)),w!==e){for(k=u,J=[],Z=i.charAt(u),A.test(Z)?u++:(Z=e,K===0&&ae(le));Z!==e;)J.push(Z),Z=i.charAt(u),A.test(Z)?u++:(Z=e,K===0&&ae(le));k=i.substring(k,u),f=fe(k)}else u=f,f=e;return K--,f===e&&(w=e,K===0&&ae(_e)),f}function ie(){var f,w,k,J;return K++,f=u,Se(),i.charCodeAt(u)===40?(w=rt,u++):(w=e,K===0&&ae(W)),w!==e?(k=Ot(),k!==e?(Se(),i.charCodeAt(u)===41?(J=St,u++):(J=e,K===0&&ae(re)),J!==e?f=q(k):(u=f,f=e)):(u=f,f=e)):(u=f,f=e),K--,f===e&&K===0&&ae(ue),f}function xe(){var f,w,k;return K++,f=u,i.substr(u,3)===nt?(w=nt,u+=3):(w=e,K===0&&ae(de)),w===e&&(i.substr(u,3)===Fe?(w=Fe,u+=3):(w=e,K===0&&ae(he)),w===e&&(i.substr(u,7)===ot?(w=ot,u+=7):(w=e,K===0&&ae(De)),w===e&&(i.charCodeAt(u)===42?(w=ut,u++):(w=e,K===0&&ae(Be))))),w!==e?(Se(),k=Ut(),k===e&&(k=null),f=U(w,k)):(u=f,f=e),K--,f===e&&(w=e,K===0&&ae(be)),f}function Se(){var f,w;for(K++,f=[],w=i.charAt(u),I.test(w)?u++:(w=e,K===0&&ae(Le));w!==e;)f.push(w),w=i.charAt(u),I.test(w)?u++:(w=e,K===0&&ae(Le));return K--,w=e,K===0&&ae(Ge),f}if(ht=c(),t.peg$library)return{peg$result:ht,peg$currPos:u,peg$FAILED:e,peg$maxFailExpected:lt,peg$maxFailPos:we};if(ht!==e&&u===i.length)return ht;throw ht!==e&&u<i.length&&ae(Ct()),Bt(lt,we<i.length?i.charAt(we):null,we<i.length?Dt(we,we+1):Dt(we,we))}/**
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
 */const Jt=0xffffffffffffffffn;function na(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function ha(i,t){return i*t&Jt}function Ma(i){return function(){let t=BigInt(i&Jt),e=BigInt(i>>64n&Jt);const d=ha(na(ha(t,5n),7n),9n);return e^=t,t=(na(t,24n)^e^e<<16n)&Jt,e=na(e,37n),i=e<<64n|t,d}}const Xt=Ma(0xa187eb39cdcaed8f31c4b365b102e01en),za=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Xt()))),Ra=Array.from({length:8},()=>Xt()),Ba=Array.from({length:16},()=>Xt()),oa=Xt(),Je="w",it="b",je="p",pa="n",Qt="b",zt="r",mt="q",He="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Kt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:d,piece:g,from:c,to:l,flags:n,captured:R,promotion:G}=e,S=Ke(c),E=Ke(l);this.color=d,this.piece=g,this.from=S,this.to=E,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=S+E,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const j in se)se[j]&n&&(this.flags+=kt[j]);R&&(this.captured=R),G&&(this.promotion=G,this.lan+=G)}isCapture(){return this.flags.indexOf(kt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(kt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(kt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(kt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(kt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(kt.BIG_PAWN)>-1}}const Ye=-1,kt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},se={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ua={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Na={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},ja={...ua,...Na},ne={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},sa={b:[16,32,17,15],w:[-16,-32,-17,-15]},va={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Oa=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ua=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ha={p:1,n:2,b:4,r:8,q:16,k:32},Ga="pnbrqkPNBRQK",xa=[pa,Qt,zt,mt],Wa=7,Ka=6,Va=1,Ya=0,Vt={[He]:se.KSIDE_CASTLE,[mt]:se.QSIDE_CASTLE},bt={w:[{square:ne.a1,flag:se.QSIDE_CASTLE},{square:ne.h1,flag:se.KSIDE_CASTLE}],b:[{square:ne.a8,flag:se.QSIDE_CASTLE},{square:ne.h8,flag:se.KSIDE_CASTLE}]},Ja={b:Va,w:Ka},la="--";function $t(i){return i>>4}function Rt(i){return i&15}function $a(i){return"0123456789".indexOf(i)!==-1}function Ke(i){const t=Rt(i),e=$t(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function qt(i){return i===Je?it:Je}function Qa(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const d=parseInt(t[4],10);if(isNaN(d)||d<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const g=t[0].split("/");if(g.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let l=0;l<g.length;l++){let n=0,R=!1;for(let G=0;G<g[l].length;G++)if($a(g[l][G])){if(R)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};n+=parseInt(g[l][G],10),R=!0}else{if(!/^[prnbqkPRNBQK]$/.test(g[l][G]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};n+=1,R=!1}if(n!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const c=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:l,regex:n}of c){if(!n.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${l} king`};if((t[0].match(n)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${l} kings`}}return Array.from(g[0]+g[7]).some(l=>l.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Xa(i,t){const e=i.from,d=i.to,g=i.piece;let c=0,l=0,n=0;for(let R=0,G=t.length;R<G;R++){const S=t[R].from,E=t[R].to,j=t[R].piece;g===j&&e!==S&&d===E&&(c++,$t(e)===$t(S)&&l++,Rt(e)===Rt(S)&&n++)}return c>0?l>0&&n>0?Ke(e):n>0?Ke(e).charAt(1):Ke(e).charAt(0):""}function ft(i,t,e,d,g,c=void 0,l=se.NORMAL){const n=$t(d);if(g===je&&(n===Wa||n===Ya))for(let R=0;R<xa.length;R++){const G=xa[R];i.push({color:t,from:e,to:d,piece:g,captured:c,promotion:G,flags:l|se.PROMOTION})}else i.push({color:t,from:e,to:d,piece:g,captured:c,flags:l})}function ya(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:je:(t=t.toLowerCase(),t==="o"?He:t)}function da(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ka{_board=new Array(128);_turn=Je;_header={};_kings={w:Ye,b:Ye};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=ra,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Ye,b:Ye},this._turn=Je,this._castling={w:0,b:0},this._epSquare=Ye,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...ja},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:d=!1}={}){let g=t.split(/\s+/);if(g.length>=2&&g.length<6){const n=["-","-","0","1"];t=g.concat(n.slice(-(6-g.length))).join(" ")}if(g=t.split(/\s+/),!e){const{ok:n,error:R}=Qa(t);if(!n)throw new Error(R)}const c=g[0];let l=0;this.clear({preserveHeaders:d});for(let n=0;n<c.length;n++){const R=c.charAt(n);if(R==="/")l+=8;else if($a(R))l+=parseInt(R,10);else{const G=R<"a"?Je:it;this._put({type:R.toLowerCase(),color:G},Ke(l)),l++}}this._turn=g[1],g[2].indexOf("K")>-1&&(this._castling.w|=se.KSIDE_CASTLE),g[2].indexOf("Q")>-1&&(this._castling.w|=se.QSIDE_CASTLE),g[2].indexOf("k")>-1&&(this._castling.b|=se.KSIDE_CASTLE),g[2].indexOf("q")>-1&&(this._castling.b|=se.QSIDE_CASTLE),this._epSquare=g[3]==="-"?Ye:ne[g[3]],this._halfMoves=parseInt(g[4],10),this._moveNumber=parseInt(g[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,d="";for(let l=ne.a8;l<=ne.h1;l++){if(this._board[l]){e>0&&(d+=e,e=0);const{color:n,type:R}=this._board[l];d+=n===Je?R.toUpperCase():R.toLowerCase()}else e++;l+1&136&&(e>0&&(d+=e),l!==ne.h1&&(d+="/"),e=0,l+=8)}let g="";this._castling[Je]&se.KSIDE_CASTLE&&(g+="K"),this._castling[Je]&se.QSIDE_CASTLE&&(g+="Q"),this._castling[it]&se.KSIDE_CASTLE&&(g+="k"),this._castling[it]&se.QSIDE_CASTLE&&(g+="q"),g=g||"-";let c="-";if(this._epSquare!==Ye)if(t)c=Ke(this._epSquare);else{const l=this._epSquare+(this._turn===Je?16:-16),n=[l+1,l-1];for(const R of n){if(R&136)continue;const G=this._turn;if(this._board[R]?.color===G&&this._board[R]?.type===je){this._makeMove({color:G,from:R,to:this._epSquare,piece:je,captured:je,flags:se.EP_CAPTURE});const S=!this._isKingAttacked(G);if(this._undoMove(),S){c=Ke(this._epSquare);break}}}}return[d,this._turn,g,c,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:d}=this._board[t],g={w:0,b:1}[e],c={p:0,n:1,b:2,r:3,q:4,k:5}[d];return za[g][c][t]}_epKey(){return this._epSquare===Ye?0n:Ra[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Ba[t]}_computeHash(){let t=0n;for(let e=ne.a8;e<=ne.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=oa),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[ne[t]]}findPiece(t){const e=[];for(let d=ne.a8;d<=ne.h1;d++){if(d&136){d+=7;continue}!this._board[d]||this._board[d]?.color!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(Ke(d))}return e}put({type:t,color:e},d){return this._put({type:t,color:e},d)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},d){if(Ga.indexOf(t.toLowerCase())===-1||!(d in ne))return!1;const g=ne[d];if(t==He&&!(this._kings[e]==Ye||this._kings[e]==g))return!1;const c=this._board[g];return c&&c.type===He&&(this._kings[c.color]=Ye),this._set(g,{type:t,color:e}),t===He&&(this._kings[e]=g),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(ne[t]),e&&e.type===He&&(this._kings[e.color]=Ye),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[ne.e1]?.type===He&&this._board[ne.e1]?.color===Je,e=this._board[ne.e8]?.type===He&&this._board[ne.e8]?.color===it;(!t||this._board[ne.a1]?.type!==zt||this._board[ne.a1]?.color!==Je)&&(this._castling.w&=-65),(!t||this._board[ne.h1]?.type!==zt||this._board[ne.h1]?.color!==Je)&&(this._castling.w&=-33),(!e||this._board[ne.a8]?.type!==zt||this._board[ne.a8]?.color!==it)&&(this._castling.b&=-65),(!e||this._board[ne.h8]?.type!==zt||this._board[ne.h8]?.color!==it)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Ye)return;const t=this._epSquare+(this._turn===Je?-16:16),e=this._epSquare+(this._turn===Je?16:-16),d=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==qt(this._turn)||this._board[e]?.type!==je){this._hash^=this._epKey(),this._epSquare=Ye;return}const g=c=>!(c&136)&&this._board[c]?.color===this._turn&&this._board[c]?.type===je;d.some(g)||(this._hash^=this._epKey(),this._epSquare=Ye)}_attacked(t,e,d){const g=[];for(let c=ne.a8;c<=ne.h1;c++){if(c&136){c+=7;continue}if(this._board[c]===void 0||this._board[c].color!==t)continue;const l=this._board[c],n=c-e;if(n===0)continue;const R=n+119;if(Oa[R]&Ha[l.type]){if(l.type===je){if(n>0&&l.color===Je||n<=0&&l.color===it)if(d)g.push(Ke(c));else return!0;continue}if(l.type==="n"||l.type==="k")if(d){g.push(Ke(c));continue}else return!0;const G=Ua[R];let S=c+G,E=!1;for(;S!==e;){if(this._board[S]!=null){E=!0;break}S+=G}if(!E)if(d){g.push(Ke(c));continue}else return!0}}return d?g:!1}attackers(t,e){return e?this._attacked(e,ne[t],!0):this._attacked(this._turn,ne[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(qt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,ne[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let d=0,g=0;for(let c=ne.a8;c<=ne.h1;c++){if(g=(g+1)%2,c&136){c+=7;continue}const l=this._board[c];l&&(t[l.type]=l.type in t?t[l.type]+1:1,l.type===Qt&&e.push(g),d++)}if(d===2)return!0;if(d===3&&(t[Qt]===1||t[pa]===1))return!0;if(d===t[Qt]+2){let c=0;const l=e.length;for(let n=0;n<l;n++)c+=e[n];if(c===0||c===l)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:d=void 0}={}){const g=this._moves({square:e,piece:d});return t?g.map(c=>new Kt(this,c)):g.map(c=>this._moveToSan(c,g))}_moves({legal:t=!0,piece:e=void 0,square:d=void 0}={}){const g=d?d.toLowerCase():void 0,c=e?.toLowerCase(),l=[],n=this._turn,R=qt(n);let G=ne.a8,S=ne.h1,E=!1;if(g)if(g in ne)G=S=ne[g],E=!0;else return[];for(let N=G;N<=S;N++){if(N&136){N+=7;continue}if(!this._board[N]||this._board[N].color===R)continue;const{type:ge}=this._board[N];let ye;if(ge===je){if(c&&c!==ge)continue;ye=N+sa[n][0],this._board[ye]||(ft(l,n,N,ye,je),ye=N+sa[n][1],Ja[n]===$t(N)&&!this._board[ye]&&ft(l,n,N,ye,je,void 0,se.BIG_PAWN));for(let Ve=2;Ve<4;Ve++)ye=N+sa[n][Ve],!(ye&136)&&(this._board[ye]?.color===R?ft(l,n,N,ye,je,this._board[ye].type,se.CAPTURE):ye===this._epSquare&&ft(l,n,N,ye,je,je,se.EP_CAPTURE))}else{if(c&&c!==ge)continue;for(let Ve=0,tt=va[ge].length;Ve<tt;Ve++){const rt=va[ge][Ve];for(ye=N;ye+=rt,!(ye&136);){if(!this._board[ye])ft(l,n,N,ye,ge);else{if(this._board[ye].color===n)break;ft(l,n,N,ye,ge,this._board[ye].type,se.CAPTURE);break}if(ge===pa||ge===He)break}}}}if((c===void 0||c===He)&&(!E||S===this._kings[n])){if(this._castling[n]&se.KSIDE_CASTLE){const N=this._kings[n],ge=N+2;!this._board[N+1]&&!this._board[ge]&&!this._attacked(R,this._kings[n])&&!this._attacked(R,N+1)&&!this._attacked(R,ge)&&ft(l,n,this._kings[n],ge,He,void 0,se.KSIDE_CASTLE)}if(this._castling[n]&se.QSIDE_CASTLE){const N=this._kings[n],ge=N-2;!this._board[N-1]&&!this._board[N-2]&&!this._board[N-3]&&!this._attacked(R,this._kings[n])&&!this._attacked(R,N-1)&&!this._attacked(R,ge)&&ft(l,n,this._kings[n],ge,He,void 0,se.QSIDE_CASTLE)}}if(!t||this._kings[n]===-1)return l;const j=[];for(let N=0,ge=l.length;N<ge;N++)this._makeMove(l[N]),this._isKingAttacked(n)||j.push(l[N]),this._undoMove();return j}move(t,{strict:e=!1}={}){let d=null;if(typeof t=="string")d=this._moveFromSan(t,e);else if(t===null)d=this._moveFromSan(la,e);else if(typeof t=="object"){const c=this._moves();for(let l=0,n=c.length;l<n;l++)if(t.from===Ke(c[l].from)&&t.to===Ke(c[l].to)&&(!("promotion"in c[l])||t.promotion===c[l].promotion)){d=c[l];break}}if(!d)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&d.flags&se.NULL_MOVE)throw new Error("Null move not allowed when in check");const g=new Kt(this,d);return this._makeMove(d),this._incPositionCount(),g}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,d=qt(e);if(this._push(t),t.flags&se.NULL_MOVE){e===it&&this._moveNumber++,this._halfMoves++,this._turn=d,this._epSquare=Ye;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&se.EP_CAPTURE&&(this._turn===it?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===He){if(this._kings[e]=t.to,t.flags&se.KSIDE_CASTLE){const g=t.to-1,c=t.to+1;this._movePiece(c,g)}else if(t.flags&se.QSIDE_CASTLE){const g=t.to+1,c=t.to-2;this._movePiece(c,g)}this._castling[e]=0}if(this._castling[e]){for(let g=0,c=bt[e].length;g<c;g++)if(t.from===bt[e][g].square&&this._castling[e]&bt[e][g].flag){this._castling[e]^=bt[e][g].flag;break}}if(this._castling[d]){for(let g=0,c=bt[d].length;g<c;g++)if(t.to===bt[d][g].square&&this._castling[d]&bt[d][g].flag){this._castling[d]^=bt[d][g].flag;break}}if(this._hash^=this._castlingKey(),t.flags&se.BIG_PAWN){let g;e===it?g=t.to-16:g=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===je&&this._board[t.to-1]?.color===d||!(t.to+1&136)&&this._board[t.to+1]?.type===je&&this._board[t.to+1]?.color===d?(this._epSquare=g,this._hash^=this._epKey()):this._epSquare=Ye}else this._epSquare=Ye;t.piece===je?this._halfMoves=0:t.flags&(se.CAPTURE|se.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===it&&this._moveNumber++,this._turn=d,this._hash^=oa}undo(){const t=this._hash,e=this._undoMove();if(e){const d=new Kt(this,e);return this._decPositionCount(t),d}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=oa;const d=this._turn,g=qt(d);if(e.flags&se.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:d})),e.captured)if(e.flags&se.EP_CAPTURE){let c;d===it?c=e.to-16:c=e.to+16,this._set(c,{type:je,color:g})}else this._set(e.to,{type:e.captured,color:g});if(e.flags&(se.KSIDE_CASTLE|se.QSIDE_CASTLE)){let c,l;e.flags&se.KSIDE_CASTLE?(c=e.to+1,l=e.to-1):(c=e.to-2,l=e.to+1),this._movePiece(l,c)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const d=[];let g=!1;for(const j in this._header)this._header[j]&&d.push(`[${j} "${this._header[j]}"]`+t),g=!0;g&&this._history.length&&d.push(t);const c=j=>{const N=this._comments[this.fen()];if(typeof N<"u"){const ge=j.length>0?" ":"";j=`${j}${ge}{${N}}`}return j},l=[];for(;this._history.length>0;)l.push(this._undoMove());const n=[];let R="";for(l.length===0&&n.push(c(""));l.length>0;){R=c(R);const j=l.pop();if(!j)break;if(!this._history.length&&j.color==="b"){const N=`${this._moveNumber}. ...`;R=R?`${R} ${N}`:N}else j.color==="w"&&(R.length&&n.push(R),R=this._moveNumber+".");R=R+" "+this._moveToSan(j,this._moves({legal:!0})),this._makeMove(j)}if(R.length&&n.push(c(R)),n.push(this._header.Result||"*"),e===0)return d.join("")+n.join(" ");const G=function(){return d.length>0&&d[d.length-1]===" "?(d.pop(),!0):!1},S=function(j,N){for(const ge of N.split(" "))if(ge){if(j+ge.length>e){for(;G();)j--;d.push(t),j=0}d.push(ge),j+=ge.length,d.push(" "),j++}return G()&&j--,j};let E=0;for(let j=0;j<n.length;j++){if(E+n[j].length>e&&n[j].includes("{")){E=S(E,n[j]);continue}E+n[j].length>e&&j!==0?(d[d.length-1]===" "&&d.pop(),d.push(t),E=0):j!==0&&(d.push(" "),E++),d.push(n[j]),E+=n[j].length}return d.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ua[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ua[t]||null,!0):!1}getHeaders(){const t={};for(const[e,d]of Object.entries(this._header))d!==null&&(t[e]=d);return t}loadPgn(t,{strict:e=!1,newlineChar:d=`\r?
`}={}){d!==`\r?
`&&(t=t.replace(new RegExp(d,"g"),`
`));const g=qa(t);this.reset();const c=g.headers;let l="";for(const G in c)G.toLowerCase()==="fen"&&(l=c[G]),this.header(G,c[G]);if(!e)l&&this.load(l,{preserveHeaders:!0});else if(c.SetUp==="1"){if(!("FEN"in c))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(c.FEN,{preserveHeaders:!0})}let n=g.root;for(;n;){if(n.move){const G=this._moveFromSan(n.move,e);if(G==null)throw new Error(`Invalid move in PGN: ${n.move}`);this._makeMove(G),this._incPositionCount()}n.comment!==void 0&&(this._comments[this.fen()]=n.comment),n=n.variations[0]}const R=g.result;R&&Object.keys(this._header).length&&this._header.Result!==R&&this.setHeader("Result",R)}_moveToSan(t,e){let d="";if(t.flags&se.KSIDE_CASTLE)d="O-O";else if(t.flags&se.QSIDE_CASTLE)d="O-O-O";else{if(t.flags&se.NULL_MOVE)return la;if(t.piece!==je){const g=Xa(t,e);d+=t.piece.toUpperCase()+g}t.flags&(se.CAPTURE|se.EP_CAPTURE)&&(t.piece===je&&(d+=Ke(t.from)[0]),d+="x"),d+=Ke(t.to),t.promotion&&(d+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?d+="#":d+="+"),this._undoMove(),d}_moveFromSan(t,e=!1){let d=da(t);if(e||(d==="0-0"?d="O-O":d==="0-0-0"&&(d="O-O-O")),d==la)return{color:this._turn,from:0,to:0,piece:"k",flags:se.NULL_MOVE};let g=ya(d),c=this._moves({legal:!0,piece:g});for(let j=0,N=c.length;j<N;j++)if(d===da(this._moveToSan(c[j],c)))return c[j];if(e)return null;let l,n,R,G,S,E=!1;if(n=d.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),n?(l=n[1],R=n[2],G=n[3],S=n[4],R.length==1&&(E=!0)):(n=d.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),n&&(l=n[1],R=n[2],G=n[3],S=n[4],R.length==1&&(E=!0))),g=ya(d),c=this._moves({legal:!0,piece:l||g}),!G)return null;for(let j=0,N=c.length;j<N;j++)if(R){if((!l||l.toLowerCase()==c[j].piece)&&ne[R]==c[j].from&&ne[G]==c[j].to&&(!S||S.toLowerCase()==c[j].promotion))return c[j];if(E){const ge=Ke(c[j].from);if((!l||l.toLowerCase()==c[j].piece)&&ne[G]==c[j].to&&(R==ge[0]||R==ge[1])&&(!S||S.toLowerCase()==c[j].promotion))return c[j]}}else if(d===da(this._moveToSan(c[j],c)).replace("x",""))return c[j];return null}ascii(){let t=`   +------------------------+
`;for(let e=ne.a8;e<=ne.h1;e++){if(Rt(e)===0&&(t+=" "+"87654321"[$t(e)]+" |"),this._board[e]){const d=this._board[e].type,c=this._board[e].color===Je?d.toUpperCase():d.toLowerCase();t+=" "+c+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let d=0;const g=this._turn;for(let c=0,l=e.length;c<l;c++)this._makeMove(e[c]),this._isKingAttacked(g)||(t-1>0?d+=this.perft(t-1):d++),this._undoMove();return d}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let d=ne.a8;d<=ne.h1;d++)this._board[d]==null?e.push(null):e.push({square:Ke(d),type:this._board[d].type,color:this._board[d].color}),d+1&136&&(t.push(e),e=[],d+=8);return t}squareColor(t){if(t in ne){const e=ne[t];return($t(e)+Rt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],d=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const g=e.pop();if(!g)break;t?d.push(new Kt(this,g)):d.push(this._moveToSan(g,this._moves())),this._makeMove(g)}return d}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},d=g=>{g in this._comments&&(e[g]=this._comments[g])};for(;this._history.length>0;)t.push(this._undoMove());for(d(this.fen());;){const g=t.pop();if(!g)break;this._makeMove(g),d(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const g of[He,mt])e[g]!==void 0&&(e[g]?this._castling[t]|=Vt[g]:this._castling[t]&=~Vt[g]);this._updateCastlingRights();const d=this.getCastlingRights(t);return(e[He]===void 0||e[He]===d[He])&&(e[mt]===void 0||e[mt]===d[mt])}getCastlingRights(t){return{[He]:(this._castling[t]&Vt[He])!==0,[mt]:(this._castling[t]&Vt[mt])!==0}}moveNumber(){return this._moveNumber}}async function ai(i,t={}){const e=t.currentUser||{},d=t.userRole||e?.role||"employee";let g="chat",c=[],l=null,n=[],R=[],G=null,S=null,E=!1,j=null,N=null;i.innerHTML=`
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
  `,Za(),await nt(),Me();const ge=i.querySelector("#tab-nav-chat"),ye=i.querySelector("#tab-nav-lounge"),Ve=i.querySelector("#bonding-chat-main-wrap"),tt=i.querySelector("#bonding-lounge-main-wrap");ge?.addEventListener("click",()=>{g="chat",ge.classList.add("active"),ye.classList.remove("active"),Ve.style.display="grid",tt.style.display="none",Me()}),ye?.addEventListener("click",async()=>{g="lounge_games",ye.classList.add("active"),ge.classList.remove("active"),Ve.style.display="none",tt.style.display="block",await P()}),i.querySelector("#btn-top-new-chat")?.addEventListener("click",X),i.querySelector("#btn-top-new-group")?.addEventListener("click",ee),i.querySelector("#btn-top-challenge")?.addEventListener("click",()=>B());const rt=i.querySelector("#bonding-search-input");rt&&rt.addEventListener("input",p=>{const m=p.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(o=>{const h=o.textContent.toLowerCase();o.style.display=h.includes(m)?"flex":"none"})}),ut(),new MutationObserver((p,m)=>{document.body.contains(i)||(S&&clearInterval(S),N&&clearInterval(N),m.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function nt(){try{const[p,m]=await Promise.all([Re("/bonding/channels").catch(()=>[]),Re("/bonding/colleagues").catch(()=>[])]);c=p,n=m,!l&&c.length>0&&(l=c.find(s=>s.name.includes("Lounge"))||c[0]),Oe(),l&&await Fe(l._id)}catch(p){console.error("Failed to load bonding data",p)}}async function Fe(p,m=!1){if(p)try{R=await Re(`/bonding/channels/${p}/messages`),m?r():_()}catch(s){console.error("Failed to load messages",s)}}let ot=0;function ut(){S&&clearInterval(S),S=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval(S);return}if(ot++,ot%2===0){const p=await Re("/bonding/channels").catch(()=>null);p&&JSON.stringify(p.map(m=>m._id+m.lastMessage?.sentAt))!==JSON.stringify(c.map(m=>m._id+m.lastMessage?.sentAt))&&(c=p,Oe())}g==="chat"&&l?await Fe(l._id,!0):g==="lounge_games"&&await P(!0)}catch{}},3e3)}function Oe(){const p=i.querySelector("#bonding-group-list"),m=i.querySelector("#bonding-direct-list");if(!p||!m)return;const s=c.filter(h=>h.type==="group"),o=c.filter(h=>h.type==="direct");if(s.length===0)p.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const h=e?._id||e?.id,F=d==="superadmin"||e?.role==="superadmin";p.innerHTML=s.map(C=>{const V=l&&l._id===C._id,L=C.createdBy&&C.createdBy.userId&&String(C.createdBy.userId)===String(h)||F;return`
          <div class="bonding-channel-item ${V?"active":""}" data-channel-id="${C._id}">
            <div class="bonding-channel-icon">${C.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(C.name)}</div>
              <div class="bonding-channel-preview">${v(C.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${L?`
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
        `}).join("")}o.length===0?m.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':m.innerHTML=o.map(h=>{const F=l&&l._id===h._id,C=h.displayName||h.name||"Colleague",V=C.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${F?"active":""}" data-channel-id="${h._id}">
            <div class="bonding-channel-avatar">${V}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(C)}</div>
              <div class="bonding-channel-preview">${v(h.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${h._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),ct()}function ct(){const p=i.querySelectorAll(".bonding-channel-item");p.forEach(m=>{m.onclick=async s=>{if(s.target.closest(".bonding-channel-del-btn")||s.target.closest(".bonding-channel-leave-btn"))return;const o=m.dataset.channelId,h=c.find(F=>F._id===o);h&&(l=h,p.forEach(F=>F.classList.remove("active")),m.classList.add("active"),Me(),await Fe(h._id))}}),i.querySelectorAll(".bonding-channel-leave-btn").forEach(m=>{m.onclick=async s=>{s.stopPropagation();const o=m.dataset.channelId,F=c.find(C=>C._id===o)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${F}"?`))try{m.disabled=!0,await Ce(`/bonding/channels/${o}/leave`,{}),y(`You left "${F}"`,"info"),c=c.filter(C=>C._id!==o),l&&l._id===o&&(l=c.find(C=>C.type==="group")||c[0]||null,Me(),l&&await Fe(l._id)),Oe()}catch(C){y(C.message||"Failed to leave group","error"),m.disabled=!1}}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(m=>{m.onclick=async s=>{s.stopPropagation();const o=m.dataset.channelId,h=c.find(V=>V._id===o),F=h&&h.type==="direct",C=F?"this 1-on-1 chat":`the group "${h?.name||""}"`;if(confirm(`Are you sure you want to delete ${C}? All messages will be permanently removed.`))try{m.disabled=!0,await et(`/bonding/channels/${o}`),y(F?"1-on-1 chat deleted":"Group deleted","success"),c=c.filter(V=>V._id!==o),l&&l._id===o&&(l=c[0]||null,Me(),l&&await Fe(l._id)),Oe()}catch(V){y(V.message||"Failed to delete conversation","error"),m.disabled=!1}}}),i.querySelector("#btn-create-group")?.addEventListener("click",ee),i.querySelector("#btn-new-direct-chat")?.addEventListener("click",X)}function Me(){const p=i.querySelector("#bonding-chat-panel");if(!p)return;if(!l){p.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const m=v(l.displayName||l.name),s=(l.members||[]).length,o=l.type==="group",h=e?._id||e?.id,F=o?null:(l.members||[]).find(L=>L.userId?.toString()!==h?.toString()),C=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(h),V=d==="superadmin"||e?.role==="superadmin",oe=C||V;p.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${o?l.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${m}</div>
            <div class="bonding-chat-sub">
              ${o?`<span>${s} members</span> · <span>${v(l.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${o?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${s})</span>
            </button>
            ${oe?`
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
    `,st(F),ve(F),b(),a()}function ze(){if(!R||R.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const p=e?._id||e?.id;return R.map(m=>{const s=m.sender&&m.sender.userId&&p&&m.sender.userId.toString()===p.toString();if(m.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${m._id}">
            <span>ℹ️</span> <span>${v(m.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${m._id}" title="Delete Message">&times;</button>
          </div>
        `;if(m.type==="challenge"&&m.challengeData){const C=m.challengeData;if(C.status==="declined"||C.status==="cancelled")return"";const V=C.gameTitle||"Game Challenge",oe=C.gameType||"chess",L=oe==="chess"?"♟️":oe==="ludo"?"🎲":"❌",M=C.gameState?.invitationId,Y=C.targetUserId?.toString(),_e=m.sender?.userId?.toString(),me=p&&Y===p.toString(),le=p&&_e===p.toString();return`
          <div class="bonding-msg-row ${s?"self":"other"}" data-msg-id="${m._id}">
            <div class="bonding-msg-avatar" title="${v(m.sender?.name||"Teammate")}">
              ${(m.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${v(m.sender?.name||"Teammate")}</span>
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
                  <div class="game-bubble-icon">${L}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${v(V)}</h4>
                    <p class="game-bubble-desc">${v(m.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${C.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':C.status==="active"||C.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${v(C.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${C.status==="pending"&&me?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${M}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${M}" data-action="decline">
                        Decline
                      </button>
                    `:C.status==="pending"&&le?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${M}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${M}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${ce(m)}
            </div>
          </div>
        `}const o=v(m.sender?.name||"Teammate"),h=Q(m.createdAt),F=ce(m);return`
        <div class="bonding-msg-row ${s?"self":"other"}" data-msg-id="${m._id}">
          <div class="bonding-msg-avatar" title="${o}">${o.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${o}</span>
              <span class="bonding-msg-time">${h}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${m._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${v(m.content).replace(/\n/g,"<br/>")}
            </div>
            ${F}
          </div>
        </div>
      `}).join("")}function ce(p){return`
      <div class="bonding-reactions-row">
        ${(p.reactions||[]).map(o=>{const h=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(o.users||[]).some(C=>C.toString()===h?.toString())?"active":""}" data-msg-id="${p._id}" data-emoji="${o.emoji}">
          <span>${o.emoji}</span> <span>${o.users?o.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${p._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function st(p){const m=i.querySelector("#btn-chat-challenge");m&&(m.onclick=()=>{p?B(null,p.userId||p._id):B()});const s=i.querySelector("#btn-manage-members");s&&(s.onclick=H);const o=i.querySelector("#btn-delete-group");o&&(o.onclick=z);const h=i.querySelector("#btn-leave-group");h&&(h.onclick=x);const F=i.querySelector("#btn-delete-direct");F&&(F.onclick=async()=>{if(l&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{F.disabled=!0,await et(`/bonding/channels/${l._id}`),y("1-on-1 chat deleted successfully","success");const V=l._id;c=c.filter(oe=>oe._id!==V),l=c[0]||null,Oe(),Me(),l&&await Fe(l._id)}catch(V){y(V.message||"Could not delete 1-on-1 chat","error"),F.disabled=!1}});const C=i.querySelector("#btn-clear-chat");C&&(C.onclick=async()=>{if(l&&confirm("Are you sure you want to clear all messages in this conversation?"))try{C.disabled=!0,await et(`/bonding/channels/${l._id}/messages`),y("Chat messages cleared","success"),R=[],_()}catch(V){y(V.message||"Could not clear chat messages","error")}finally{C.disabled=!1}})}function ve(p){const m=i.querySelector("#bonding-message-input"),s=i.querySelector("#btn-send-message"),o=i.querySelector("#btn-quick-emoji"),h=i.querySelector("#btn-input-challenge");m&&m.addEventListener("keydown",F=>{F.key==="Enter"&&!F.shiftKey&&(F.preventDefault(),A())}),s&&(s.onclick=A),h&&(h.onclick=()=>{p?B(null,p.userId||p._id):B()}),o&&(o.onclick=()=>{if(!m)return;const F=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],C=F[Math.floor(Math.random()*F.length)];m.value+=(m.value?" ":"")+C,m.focus()})}function b(){i.querySelectorAll(".btn-respond-invite").forEach(o=>{o.onclick=async()=>{const h=o.dataset.inviteId,F=o.dataset.action;await T(h,F)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(o=>{o.onclick=async()=>{const h=o.dataset.inviteId;try{o.disabled=!0;const F=await Re("/bonding/invitations"),C=(F.incoming||[]).concat(F.sent||[]).find(V=>V._id===h);C&&C.matchId?O(C.matchId):y("Match has not started yet or has expired","warning")}catch(F){y(F.message||"Could not load match","error")}finally{o.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(o=>{o.onclick=async h=>{h.stopPropagation();const F=o.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{o.disabled=!0,await et(`/bonding/messages/${F}`),R=R.filter(C=>C._id!==F),r(),y("Message deleted","success")}catch(C){y(C.message||"Failed to delete message","error"),o.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(o=>{o.onclick=async()=>{const h=o.dataset.msgId,F=o.dataset.emoji;await I(h,F)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(o=>{o.onclick=h=>{const F=o.dataset.msgId;te(h.currentTarget,async C=>{await I(F,C)})}})}async function A(){const p=i.querySelector("#bonding-message-input");if(!p||!l||E)return;const m=p.value.trim();if(m)try{E=!0,p.value="";const s=await Ce(`/bonding/channels/${l._id}/messages`,{content:m,type:"text"});R.push(s),_(),a()}catch(s){y(s.message||"Failed to send message","error")}finally{E=!1,p.focus()}}async function I(p,m){try{const s=await Ce(`/bonding/messages/${p}/react`,{emoji:m}),o=R.find(h=>h._id===p);o&&(o.reactions=s,r())}catch(s){y(s.message||"Failed to react","error")}}function a(){const p=i.querySelector("#bonding-messages-feed");p&&(p.scrollTop=p.scrollHeight)}function r(){const p=i.querySelector("#bonding-messages-feed");if(!p)return;const m=p.scrollHeight-p.scrollTop<=p.clientHeight+80;p.innerHTML=ze(),b(),m&&a()}function _(){const p=i.querySelector("#bonding-messages-feed");p&&(p.innerHTML=ze(),b())}async function P(p=!1){const m=i.querySelector("#bonding-lounge-main-wrap");if(m){p||(m.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const s=await Re("/bonding/games/overview");G=s;const o=s.myStats||{},h=s.availableGames||[],F=s.incomingChallenges||[],C=s.sentChallenges||[],V=s.activeMatches||[],oe=s.recentMatches||[],L=e?._id||e?.id;m.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${o.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${o.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${o.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${o.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${o.gamesPlayed>0?Math.round((o.wins||0)/o.gamesPlayed*100):0}%</span>
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
              ${h.map(M=>`
                <div class="lounge-game-card" data-game-id="${M.id}">
                  <div class="game-card-icon">${M.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${v(M.name)}</h4>
                    <p class="game-card-desc">${v(M.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${M.duration}</span>
                      ${M.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${M.id}" data-game-title="${v(M.name)}">
                    ${M.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${F.length+C.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${F.length})</h5>
              ${F.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${F.map(M=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(M.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(M.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${v(M.sender.name)}</strong> (${v(M.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${M._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${M._id}" data-action="decline">
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
                    ${C.map(M=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(M.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(M.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${v(M.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${M._id}" data-action="cancel">
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
                <span class="badge green">${V.length} Live</span>
              </div>

              ${V.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${V.map(M=>{const _e=(M.players||M.gameState?.players||[M.player1,M.player2].filter(Boolean)).filter(W=>W.userId&&W.userId.toString()!==L?.toString()),me=M.player1?.userId?.toString()===L?.toString()?M.player2:M.player1,le=_e.length>0?_e.map(W=>v(W.name)).join(", "):me?.name?v(me.name):"Colleagues",ue=L&&M.currentTurnUserId&&M.currentTurnUserId.toString()===L.toString();return`
                        <div class="lounge-active-match-card ${ue?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${M.gameType==="chess"?"♟️":M.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${v(M.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${le}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ue?"my-turn":"wait"}">
                              ${ue?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${M._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${M._id}" title="Delete Match">
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
              ${oe.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${oe.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${oe.map(M=>{const _e=L&&M.player1.userId.toString()===L.toString()?M.player2:M.player1,me=L&&M.winnerId&&M.winnerId.toString()===L.toString(),le=M.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${v(M.gameTitle)}</span>
                          <span class="recent-date">${Q(M.completedAt||M.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${M._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${v(_e.name)}</strong></div>
                          <div class="recent-outcome ${me?"win":le?"draw":"loss"}">
                            ${me?"🏆 VICTORY":le?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${v(M.winningReason||M.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${M._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${M._id}" title="Delete Match Record">
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
          <p>${v(s.message)}</p>
        </div>
      `}}}function $(){i.querySelectorAll(".btn-challenge-game").forEach(m=>{m.onclick=()=>{const s=m.dataset.gameId;B(s)}}),i.querySelectorAll(".btn-respond-invite").forEach(m=>{m.onclick=async()=>{const s=m.dataset.inviteId,o=m.dataset.action;await T(s,o),await P()}}),i.querySelectorAll(".btn-resume-match").forEach(m=>{m.onclick=()=>{const s=m.dataset.matchId;O(s)}}),i.querySelectorAll(".btn-recent-rematch").forEach(m=>{m.onclick=async()=>{const s=m.dataset.matchId;try{m.disabled=!0;const o=await Ce(`/bonding/matches/${s}/action`,{action:"rematch"});o.match&&(y("Rematch created! Opening arena ⚔️","success"),O(o.match._id))}catch(o){y(o.message||"Could not start rematch","error")}finally{m.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(m=>{m.onclick=async s=>{s.stopPropagation();const o=m.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{m.disabled=!0,await et(`/bonding/matches/${o}`),y("Match deleted successfully","success"),await P()}catch(h){y(h.message||"Failed to delete match","error")}finally{m.disabled=!1}}});const p=i.querySelector("#btn-clear-matches");p&&(p.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{p.disabled=!0,await et("/bonding/matches?filter=completed"),y("Completed matches history cleared","success"),await P()}catch(m){y(m.message||"Failed to clear matches","error")}finally{p.disabled=!1}})}function B(p=null,m=null){const s=i.querySelector("#bonding-modals-root"),o=e?._id||e?.id,h=new Set(["employee","admin","superadmin"]),F=n.filter(me=>!me.isSelf&&me._id.toString()!==o?.toString()&&h.has(me.role));let C=p||"chess",V=m?m.toString():null,oe=2,L=V?[V]:[],M="none";function Y(){const me=F.find(re=>re._id.toString()===V),le=C==="ludo",ue=oe-1,W=L.length===ue;s.innerHTML=`
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
                    <button class="ludo-mode-btn ${oe===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${oe===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${oe===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${le?`Step 3 — Select Colleagues to Play With (${L.length}/${ue} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${F.map(re=>{const be=le?L.includes(re._id.toString()):V===re._id.toString();return`
                      <div class="eligible-emp-item ${be?"selected":""}" data-user-id="${re._id}">
                        <div class="emp-item-avatar">${re.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${v(re.name)}</span>
                          <span class="emp-item-role">${v(re.role==="superadmin"?"Superadmin":re.role==="admin"?"Admin":"Employee")} · ${v(re.email||"")}</span>
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
                    <label class="timer-radio-lbl ${M==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${M==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${M==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${M==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${M==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${M==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${le?`🎲 Ludo (${oe} Players · 4 Pawns per base)`:C==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${le?`
                    <div><strong>Opponents:</strong> ${L.length>0?L.map(re=>{const be=F.find(de=>de._id.toString()===re);return be?`<strong>${v(be.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+ue+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${me?`<strong>${v(me.name)}</strong> (${v(me.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${C==="chess"?`<div><strong>Time Control:</strong> ${M==="none"?"Untimed":M}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(le?!W:!V)?"disabled":""}>
                ${le?`Start ${oe}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,_e()}function _e(){s.querySelector(".bonding-modal-close").onclick=()=>{s.innerHTML=""},s.querySelector("#btn-cancel-challenge-flow").onclick=()=>{s.innerHTML=""},s.querySelectorAll(".game-pill-btn").forEach(ue=>{ue.onclick=()=>{C=ue.dataset.game,Y()}}),s.querySelectorAll(".ludo-mode-btn").forEach(ue=>{ue.onclick=()=>{oe=Number(ue.dataset.count),L=L.slice(0,oe-1),Y()}});const me=s.querySelector("#flow-emp-search");me&&(me.oninput=ue=>{const W=ue.target.value.toLowerCase().trim();s.querySelectorAll(".eligible-emp-item").forEach(re=>{const be=re.textContent.toLowerCase();re.style.display=be.includes(W)?"flex":"none"})}),s.querySelectorAll(".eligible-emp-item").forEach(ue=>{ue.onclick=()=>{const W=ue.dataset.userId;if(C==="ludo"){const re=oe-1;L.includes(W)?L=L.filter(be=>be!==W):L.length<re?L.push(W):L[re-1]=W}else V=W;Y()}}),s.querySelectorAll('input[name="timerMode"]').forEach(ue=>{ue.onchange=W=>{M=W.target.value,Y()}});const le=s.querySelector("#btn-submit-challenge-flow");le&&(le.onclick=async()=>{if(C==="ludo"){const ue=oe-1;if(L.length<ue){y(`Please select ${ue} colleague(s) to play with`,"warning");return}try{le.disabled=!0,le.textContent="Launching Match...";const W=await Ce("/bonding/matches/instant-ludo",{playerCount:oe,targetUserIds:L});s.innerHTML="",y(`Ludo match started (${oe} Players)! 🎲`,"success"),W&&W._id&&O(W._id)}catch(W){y(W.message||"Failed to start Ludo match","error"),le.disabled=!1,le.textContent=`Start ${oe}P Ludo Match 🎲`}return}if(!V){y("Please select an employee to challenge","warning");return}try{le.disabled=!0,le.textContent="Sending Challenge...",await Ce("/bonding/invitations",{gameType:C,targetUserId:V,matchSettings:{timerMode:M},channelId:null}),y("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),s.innerHTML="",await loadChannels();const ue=c.find(W=>W.type==="direct"&&W.members?.some(re=>(re.userId||re._id)?.toString()===V));ue?selectChannel(ue):l&&await Fe(l._id),g==="lounge_games"&&await P()}catch(ue){y(ue.message||"Could not send challenge","error"),le.disabled=!1,le.textContent="Send Challenge 🚀"}})}Y()}async function T(p,m){if(!(!p||!m))try{const s=await Yt(`/bonding/invitations/${p}/respond`,{action:m});m==="accept"?(y("Challenge accepted! Entering match arena ⚔️","success"),s.match&&O(s.match._id)):m==="decline"?(y("Challenge declined","info"),i.querySelectorAll(`[data-invite-id="${p}"]`).forEach(o=>{const h=o.closest(".lounge-invite-item")||o.closest(".bonding-msg-row");h&&h.remove()})):m==="cancel"&&(y("Challenge cancelled","info"),i.querySelectorAll(`[data-invite-id="${p}"]`).forEach(o=>{const h=o.closest(".lounge-invite-item")||o.closest(".bonding-msg-row");h&&h.remove()})),l&&await Fe(l._id),g==="lounge_games"&&await P()}catch(s){y(s.message||"Action failed","error")}}async function O(p){if(!p)return;j=p,N&&clearInterval(N);const m=i.querySelector("#bonding-modals-root");let s=null,o=null,h=[],F="",C=null,V=!1;function oe(W){return W?JSON.stringify({status:W.status,turn:W.currentTurnUserId?.toString(),turnColor:W.turn,movesCount:W.moves?.length,dice:W.gameState?.dice,rolled:W.gameState?.rolled,lastRoll:W.gameState?.lastRoll,lastRollColor:W.gameState?.lastRollColor,lastRollBy:W.gameState?.lastRollBy,lastActionText:W.gameState?.lastActionText,tokens:W.gameState?.tokens,board:W.gameState?.board,grid:W.gameState?.grid,fen:W.gameState?.fen,draw:W.drawOfferedBy?.toString()}):""}async function L(){try{return s=await Re(`/bonding/matches/${p}`),s}catch(W){return y(W.message||"Could not load match","error"),M(),null}}if(s=await L(),!s)return;F=oe(s);function M(){N&&clearInterval(N),C&&clearTimeout(C),V=!1,j=null,m.innerHTML="",g==="lounge_games"&&P(!0),l&&Fe(l._id,!0)}N=setInterval(async()=>{if(!j||j!==p){clearInterval(N);return}try{const W=await Re(`/bonding/matches/${p}`);if(!W)return;const re=oe(W);re!==F&&(F=re,s=W,Y())}catch{}},1e3);function Y(){if(!s)return;const W=e?._id||e?.id,re=W&&s.player1.userId.toString()===W.toString(),be=re?s.player1:s.player2,de=re?s.player2:s.player1,he=W&&s.currentTurnUserId&&s.currentTurnUserId.toString()===W.toString(),De=s.status!=="active";m.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${s.gameType==="ludo"?"🎲":s.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${v(s.gameTitle)}</h3>
                  ${s.gameType==="ludo"&&s.gameState?.players?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${s.gameState.players.map(Be=>{const Ge=Be.userId&&Be.userId.toString()===W?.toString(),Le={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Be.color]||"⚪",pe=(s.gameState?.turnColor||s.turn)===Be.color;return`
                          <span class="player-tag ${Ge?"self":"opp"} ${pe?"turn-active":""}">
                            ${Le} <strong>${v(Be.name)}</strong> ${Ge?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${v(be.name)} (You · <strong>${s.gameType==="ludo"?be.assignedRole==="red"?"🔴 Red":"🟢 Green":s.gameType==="tictactoe"?be.assignedRole==="X"?"✕":"◯":be.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${v(de.name)} (<strong>${s.gameType==="ludo"?de.assignedRole==="red"?"🔴 Red":"🟢 Green":s.gameType==="tictactoe"?de.assignedRole==="X"?"✕":"◯":de.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${De?"ended":he?"my-turn":"opp-turn"}">
                ${De?`<span>🏁 Finished (${v(s.winningReason||s.status)})</span>`:he?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${v(de.name)}...</span>`}
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
            ${s.drawOfferedBy&&s.drawOfferedBy.toString()!==W?.toString()&&!De?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${v(de.name)} has offered a draw. Accept?</span>
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
                <div class="game-over-icon">${s.winnerId&&s.winnerId.toString()===W?.toString()?"🏆":s.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${s.winnerId&&s.winnerId.toString()===W?.toString()?"VICTORY!":s.status==="draw"?"STALEMATE / DRAW":`${v(s.winnerName)} Wins!`}</h4>
                  <p>Reason: ${v(s.winningReason||"Match concluded")}</p>
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
      `,ue(he,re,be)}function _e(W){const re=s.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",be=new ka(re),de=W?s.player1.assignedRole==="white":s.player2.assignedRole==="white",he={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},De=de?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Be=de?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Ge='<div class="chess-board-grid">';for(const Ee of Be)for(const Ue of De){const Ne=`${Ue}${Ee}`,Pe=be.get(Ne),Te=(Ue.charCodeAt(0)-97+Ee)%2!==0,Ie=o===Ne,ke=h.includes(Ne),fe=Pe?Pe.color==="w"?he[Pe.type.toUpperCase()]:he[Pe.type]:"";Ge+=`
            <div class="chess-sq ${Te?"light":"dark"} ${Ie?"selected":""} ${ke?"legal-dot":""}" data-square="${Ne}">
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
      `}function me(){const W=s.gameState?.board||Array(9).fill(null),re=s.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${W.map((be,de)=>{const he=re.includes(de);return`
                <div class="ttt-cell ${be?"filled":"empty"} ${he?"win-cell":""}" data-cell-idx="${de}">
                  ${be==="X"?'<span class="ttt-x">✕</span>':be==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function le(W,re,be){const de=s.gameState||{},he=de.activeColors||["red","green"],De=de.players||[{...s.player1,color:"red",assignedRole:"red",isBot:!1},{...s.player2,color:"green",assignedRole:"green",isBot:!1}],Be=de.tokens||{},Ge=D=>{const ie=Be[D]||(D==="red"?de.p1Tokens:D==="green"?de.p2Tokens:[])||[];return Array.from({length:4},(xe,Se)=>ie[Se]||{id:Se,step:-1})},Le=Ge("red"),pe=Ge("green"),Ee=Ge("yellow"),Ue=Ge("blue"),Ne=e?._id||e?.id,Te=(De.find(D=>D.userId&&D.userId.toString()===Ne?.toString())||De[0])?.color||(W?"red":"green"),Ie=de.turnColor||s.turn||"red",ke=Te===Ie&&s.status==="active",fe=!!de.rolled,q=de.dice,U=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],u=[[7,1],[7,2],[7,3],[7,4],[7,5]],Ae=[[1,7],[2,7],[3,7],[4,7],[5,7]],we=[[7,13],[7,12],[7,11],[7,10],[7,9]],lt=[[13,7],[12,7],[11,7],[10,7],[9,7]],K=[0,8,13,21,26,34,39,47];function ht(D,ie){return ie<0?null:ie>=56?D==="red"?[7,6]:D==="green"?[6,7]:D==="yellow"?[7,8]:[8,7]:D==="red"?ie<=50?U[ie]:u[ie-51]:D==="green"?ie<=50?U[(13+ie)%52]:Ae[ie-51]:D==="yellow"?ie<=50?U[(26+ie)%52]:we[ie-51]:ie<=50?U[(39+ie)%52]:lt[ie-51]}function qe(D,ie){return D!==Te||!ke||!fe||!q||s.status!=="active"?!1:ie.step===-1?q===6:ie.step>=0&&ie.step+q<=56}const at={},Ct=(D,ie)=>{ie.forEach(xe=>{if(xe.step>=0&&xe.step<56){const Se=ht(D,xe.step);if(Se){const f=Se[0]+","+Se[1];(at[f]=at[f]||[]).push({color:D,id:xe.id,step:xe.step,movable:qe(D,xe)})}}})};he.includes("red")&&Ct("red",Le),he.includes("green")&&Ct("green",pe),he.includes("yellow")&&Ct("yellow",Ee),he.includes("blue")&&Ct("blue",Ue);const Qe={};U.forEach(([D,ie],xe)=>{Qe[D+","+ie]=xe});const It={};u.forEach(([D,ie],xe)=>{It[D+","+ie]=xe+1});const Dt={};Ae.forEach(([D,ie],xe)=>{Dt[D+","+ie]=xe+1});const ae={};we.forEach(([D,ie],xe)=>{ae[D+","+ie]=xe+1});const Bt={};lt.forEach(([D,ie],xe)=>{Bt[D+","+ie]=xe+1});const Pt=[];for(let D=0;D<15;D++)for(let ie=0;ie<15;ie++){if(D<6&&ie<6||D<6&&ie>8||D>8&&ie<6||D>8&&ie>8||D>=6&&D<=8&&ie>=6&&ie<=8)continue;const xe=D+","+ie,Se=Qe[xe],f=Se!==void 0&&K.includes(Se),w=D===6&&ie===1,k=D===1&&ie===8,J=D===8&&ie===13,Z=D===13&&ie===6,$e=It[xe],pt=Dt[xe],At=ae[xe],Sa=Bt[xe];let dt="ludo-cell";w?dt+=" cell-red-start":k?dt+=" cell-green-start":J?dt+=" cell-yellow-start":Z?dt+=" cell-blue-start":$e?dt+=" cell-red-stretch":pt?dt+=" cell-green-stretch":At?dt+=" cell-yellow-stretch":Sa?dt+=" cell-blue-stretch":f&&(dt+=" cell-safe-star");const Ca=at[xe]||[];Pt.push(`
            <div class="${dt}" style="grid-row:${D+1};grid-column:${ie+1}" data-pos="${xe}">
              ${f?'<span class="cell-star-glyph">⭐</span>':""}
              ${w||k||J||Z?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Ca.map(yt=>`
                <div class="ludo-token token-${yt.color} ${yt.movable?"movable":""}" data-token-id="${yt.id}" data-color="${yt.color}" title="${yt.color.toUpperCase()} Pawn ${yt.id+1}">
                  <span>${yt.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function Zt(D){const ie=Math.max(1,Math.min(6,Number(D)||1)),xe={1:[[30,30,7.5,"#ef4444"]],2:[[16,16,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],3:[[16,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],4:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],5:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],6:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,30,5.5,"#1e293b"],[44,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]]},f=(xe[ie]||xe[6]).map(([w,k,J,Z])=>`
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
        `}function vt(D,ie,xe,Se,f){const w=`${D}-yard`;if(!xe)return`
            <div class="ludo-yard ${w}">
              <div class="yard-box decorative">
                <div class="yard-title">${ie} (Inactive)</div>
              </div>
            </div>
          `;const k=f.filter(J=>J.step===56).length;return`
          <div class="ludo-yard ${w} ${Ie===D?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${ie}</span>
                ${k>0?`<span class="yard-home-badge" title="${k} of 4 pawns reached Home!">👑 ${k}/4 Home</span>`:""}
                ${Se?`<small class="yard-player-lbl">${v(Se.name)}${Se.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${f.map((J,Z)=>`
                  <div class="yard-token-slot ${J.step===56?"slot-home":""}">
                    ${J.step===-1?`
                      <div class="ludo-token token-${D} ${qe(D,J)?"movable":""}" data-token-id="${J.id}" data-color="${D}" title="${D.toUpperCase()} Pawn ${J.id+1}">
                        <span>${J.id+1}</span>
                      </div>
                    `:J.step===56?`
                      <div class="ludo-token token-reached-home token-${D}" title="${D.toUpperCase()} Pawn ${J.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${J.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${Z+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Nt=De.find(D=>D.color==="red"),jt=De.find(D=>D.color==="green"),ea=De.find(D=>D.color==="yellow"),Ot=De.find(D=>D.color==="blue"),Ft=De.find(D=>D.color===Ie)||(Ie==="red"?Nt:jt),_t=Ft?v(Ft.name):Ie.toUpperCase(),Lt={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Ie]||"🔴",gt=q||de.lastRoll||6,xt=ke&&!fe&&s.status==="active",Ht=Ge(Te).filter(D=>qe(Te,D));return`
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
                ${Le.filter(D=>D.step===56).map(D=>`<div class="home-tri-pawn red" title="Red Pawn ${D.id+1} Home! 👑">👑${D.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${pe.filter(D=>D.step===56).map(D=>`<div class="home-tri-pawn green" title="Green Pawn ${D.id+1} Home! 👑">👑${D.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${Ee.filter(D=>D.step===56).map(D=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${D.id+1} Home! 👑">👑${D.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${Ue.filter(D=>D.step===56).map(D=>`<div class="home-tri-pawn blue" title="Blue Pawn ${D.id+1} Home! 👑">👑${D.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...Le.filter(D=>D.step===56).map(D=>({col:"red",id:D.id})),...pe.filter(D=>D.step===56).map(D=>({col:"green",id:D.id})),...Ee.filter(D=>D.step===56).map(D=>({col:"yellow",id:D.id})),...Ue.filter(D=>D.step===56).map(D=>({col:"blue",id:D.id}))].map(D=>`
                    <div class="tok-home-champion ${D.col}" title="${D.col.toUpperCase()} Pawn ${D.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${D.id+1}</span>
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
                ${v(de.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function ue(W,re,be){m.querySelector("#btn-close-arena").onclick=M;const de=m.querySelector("#btn-arena-resign");de&&(de.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{de.disabled=!0,await Ce(`/bonding/matches/${p}/action`,{action:"resign"}),await L(),Y()}catch(pe){y(pe.message||"Resign failed","error"),de.disabled=!1}});const he=m.querySelector("#btn-arena-draw");he&&(he.onclick=async()=>{try{await Ce(`/bonding/matches/${p}/action`,{action:"offer_draw"}),y("Draw offer sent to opponent","info"),await L(),Y()}catch(pe){y(pe.message||"Draw offer failed","error")}});const De=m.querySelector("#btn-confirm-accept-draw");De&&(De.onclick=async()=>{try{await Ce(`/bonding/matches/${p}/action`,{action:"accept_draw"}),y("Draw agreed!","info"),await L(),Y()}catch(pe){y(pe.message,"error")}});const Be=m.querySelector("#btn-confirm-decline-draw");Be&&(Be.onclick=async()=>{try{await Ce(`/bonding/matches/${p}/action`,{action:"decline_draw"}),await L(),Y()}catch(pe){y(pe.message,"error")}}),[m.querySelector("#btn-arena-delete-match"),m.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(pe=>{pe.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{pe.disabled=!0,await et(`/bonding/matches/${p}`),y("Match deleted","success"),M(),g==="lounge_games"&&await P()}catch(Ee){y(Ee.message||"Failed to delete match","error"),pe.disabled=!1}}});const Le=m.querySelector("#btn-arena-rematch-action");if(Le&&(Le.onclick=async()=>{try{Le.disabled=!0,Le.textContent="Creating Rematch...";const pe=await Ce(`/bonding/matches/${p}/action`,{action:"rematch"});pe.match&&(y("Rematch created! New match live ⚔️","success"),N&&clearInterval(N),O(pe.match._id))}catch(pe){y(pe.message||"Rematch failed","error"),Le.disabled=!1,Le.textContent="🔄 Request Rematch"}}),s.gameType==="chess"&&W&&s.status==="active"){const pe=s.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Ee=new ka(pe),Ue=be.assignedRole==="white"?"w":"b";m.querySelectorAll(".chess-sq").forEach(Ne=>{Ne.onclick=async()=>{const Pe=Ne.dataset.square;if(o){if(o===Pe){o=null,h=[],Y();return}if(h.includes(Pe)){const Ie=Ee.get(o);let ke;Ie&&Ie.type==="p"&&(Pe.endsWith("8")||Pe.endsWith("1"))&&(ke=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const fe={from:o,to:Pe,promotion:ke?ke.toLowerCase():void 0};o=null,h=[],s=await Ce(`/bonding/matches/${p}/move`,{move:fe}),Y()}catch(fe){y(fe.message||"Illegal chess move","error"),o=null,h=[],Y()}return}}const Te=Ee.get(Pe);Te&&Te.color===Ue?(o=Pe,h=Ee.moves({square:Pe,verbose:!0}).map(ke=>ke.to),Y()):(o=null,h=[],Y())}})}if(s.gameType==="tictactoe"&&W&&s.status==="active"&&m.querySelectorAll(".ttt-cell.empty").forEach(pe=>{pe.onclick=async()=>{const Ee=pe.dataset.cellIdx;try{pe.style.opacity="0.5",s=await Ce(`/bonding/matches/${p}/move`,{cellIndex:Number(Ee)}),Y()}catch(Ue){y(Ue.message||"Invalid move","error")}}}),s.gameType==="ludo"&&s.status==="active"){const pe=s.gameState||{},Ee=!!pe.rolled,Ue=pe.turnColor||s.turn||"red",Ne=s.player1.userId.toString()===myId?.toString()?s.player1.assignedRole||"red":s.player2.userId.toString()===myId?.toString()?s.player2.assignedRole||"green":(pe.players||[]).find(ke=>ke.userId?.toString()===myId?.toString())?.color||"red",Pe=W&&Ue===Ne,Te=m.querySelector("#btn-interactive-ludo-dice"),Ie=m.querySelector("#btn-interactive-ludo-dice-badge");if(Pe&&!Ee){const ke=async()=>{if(!(Te&&Te.dataset.rolling==="true")){Te&&(Te.dataset.rolling="true",Te.classList.add("rolling")),Ie&&(Ie.disabled=!0);try{const fe=await Ce(`/bonding/matches/${p}/move`,{action:"roll"});s=fe,F=oe(fe),Y()}catch(fe){y(fe.message||"Failed to roll","error"),Te&&(Te.classList.remove("rolling"),delete Te.dataset.rolling),Ie&&(Ie.disabled=!1)}}};Te&&(Te.onclick=ke,Te.onkeydown=fe=>{(fe.key==="Enter"||fe.key===" ")&&(fe.preventDefault(),ke())}),Ie&&(Ie.onclick=ke)}if(Pe&&Ee){const fe=(pe.tokens||{})[Ne]||[],q=pe.dice||pe.lastRoll||0,U=fe.filter(u=>u.step===-1&&q===6||u.step>=0&&u.step+q<=56);if(U.length===1&&!V){V=!0;const u=U[0];C&&clearTimeout(C),C=setTimeout(async()=>{try{const Ae=await Ce(`/bonding/matches/${p}/move`,{action:"move",tokenId:Number(u.id)});s=Ae,F=oe(Ae),V=!1,Y()}catch(Ae){V=!1,y(Ae.message||"Auto-move failed","error")}},400)}}Pe&&Ee&&m.querySelectorAll(".ludo-token.movable").forEach(ke=>{ke.onclick=async fe=>{fe.stopPropagation();const q=ke.dataset.tokenId;try{ke.style.opacity="0.5";const U=await Ce(`/bonding/matches/${p}/move`,{action:"move",tokenId:Number(q)});s=U,F=oe(U),Y()}catch(U){y(U.message||"Invalid token move","error"),ke.style.opacity="1"}}})}}Y()}function H(){if(!l||l.type==="direct")return;const p=i.querySelector("#bonding-modals-root"),m=L=>L==="employee"||L==="admin"||L==="superadmin",s=l.members||[],o=new Set(s.map(L=>L.userId?.toString())),h=n.filter(L=>m(L.role)&&!o.has(L._id.toString()));p.innerHTML=`
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
                  ${h.map(L=>`
                    <option value="${L._id}">${v(L.name)} (${v(L.role==="superadmin"?"Superadmin":L.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${h.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${h.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${s.length}):</label>
              <div class="bonding-members-list">
                ${s.map(L=>{const M=e?._id||e?.id,Y=M&&L.userId&&L.userId.toString()===M.toString(),_e=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(M),me=d==="superadmin"||e?.role==="superadmin",le=_e||me;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(L.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${v(L.name)} ${Y?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${v(L.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${Y?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${L.userId}">
                            🚪 Leave Group
                          </button>
                        `:le?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${L.userId}" data-name="${v(L.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const L=e?._id||e?.id,M=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(L),Y=d==="superadmin"||e?.role==="superadmin";return M||Y?`
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""};const F=p.querySelector("#btn-modal-delete-group");F&&(F.onclick=()=>{p.innerHTML="",z()});const C=p.querySelector("#btn-modal-leave-group");C&&(C.onclick=()=>{p.innerHTML="",x()}),p.querySelectorAll(".btn-leave-group-action").forEach(L=>{L.onclick=()=>{p.innerHTML="",x()}});const V=p.querySelector("#btn-submit-add-member");V&&(V.onclick=async()=>{const M=p.querySelector("#sel-add-colleague").value;if(!M){y("Please select a colleague to add","warning");return}try{V.disabled=!0,V.textContent="Adding...";const Y=await Yt(`/bonding/channels/${l._id}/members`,{action:"add",userIds:[M]});y("Colleague added to group! 🎉","success"),l=Y.channel,p.innerHTML="",await Fe(l._id),Me()}catch(Y){y(Y.message||"Failed to add member","error"),V.disabled=!1,V.textContent="Add to Group"}}),p.querySelectorAll(".btn-remove-member").forEach(L=>{L.onclick=async()=>{const M=L.dataset.userId,Y=L.dataset.name;if(confirm(`Are you sure you want to remove ${Y} from this group?`))try{L.disabled=!0;const _e=await Yt(`/bonding/channels/${l._id}/members`,{action:"remove",userId:M});y(`${Y} removed from group`,"info"),l=_e.channel,p.innerHTML="",await Fe(l._id),Me()}catch(_e){y(_e.message||"Failed to remove member","error"),L.disabled=!1}}})}async function x(){if(!l||l.type==="direct")return;const p=l.name;if(confirm(`Are you sure you want to leave the group "${p}"?`))try{await Ce(`/bonding/channels/${l._id}/leave`,{}),y(`You left "${p}"`,"info"),c=await Re("/bonding/channels").catch(()=>[]),l=c.find(s=>s.type==="group")||c[0]||null,Oe(),Me(),l&&await Fe(l._id)}catch(s){y(s.message||"Failed to leave group","error")}}async function z(){if(!l||l.type==="direct")return;const p=l.name;if(confirm(`Are you sure you want to delete the group "${p}"?

All messages in this lounge will be deleted.`))try{await et(`/bonding/channels/${l._id}`),y(`Group "${p}" deleted successfully`,"success"),c=await Re("/bonding/channels").catch(()=>[]),l=c.find(s=>s.type==="group")||c[0]||null,Oe(),Me(),l&&await Fe(l._id)}catch(s){y(s.message||"Failed to delete group","error")}}function X(){const p=i.querySelector("#bonding-modals-root"),m=h=>h==="employee"||h==="admin"||h==="superadmin",s=n.filter(h=>!h.isSelf&&m(h.role));p.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${s.map(h=>`
                <div class="bonding-user-pick-item" data-user-id="${h._id}" data-name="${v(h.name)}">
                  <div class="bonding-member-avatar">${h.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${v(h.name)}</span>
                    <span class="user-pick-role">${v(h.role==="superadmin"?"Superadmin":h.role==="admin"?"Admin":"Employee")} · ${v(h.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelectorAll(".bonding-user-pick-item").forEach(h=>{h.onclick=async()=>{const F=h.dataset.userId;try{const C=await Ce("/bonding/channels",{type:"direct",targetUserId:F});p.innerHTML="",c=await Re("/bonding/channels"),l=c.find(V=>V._id===C._id)||C,Oe(),Me(),await Fe(l._id)}catch(C){y(C.message||"Failed to open personal chat","error")}}})}function ee(){const p=i.querySelector("#bonding-modals-root"),m=C=>C==="employee"||C==="admin"||C==="superadmin",s=n.filter(C=>!C.isSelf&&m(C.role));p.innerHTML=`
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
                    <span>${v(C.name)} (${v(C.role==="superadmin"?"Superadmin":C.role==="admin"?"Admin":"Employee")})</span>
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
    `,p.querySelector(".bonding-modal-close").onclick=()=>{p.innerHTML=""},p.querySelector("#btn-cancel-create-grp").onclick=()=>{p.innerHTML=""};let o="👥";const h=p.querySelectorAll(".avatar-opt");h.forEach(C=>{C.onclick=()=>{h.forEach(V=>V.classList.remove("active")),C.classList.add("active"),o=C.textContent.trim()}});const F=p.querySelector("#btn-confirm-create-grp");F.onclick=async()=>{const C=p.querySelector("#new-group-name"),V=p.querySelector("#new-group-desc"),oe=C.value.trim();if(!oe){y("Please enter a group name","warning"),C.focus();return}const L=p.querySelectorAll(".new-group-member-chk:checked"),M=Array.from(L).map(Y=>Y.value);try{F.disabled=!0,F.textContent="Creating...";const Y=await Ce("/bonding/channels",{type:"group",name:oe,description:V.value.trim(),avatar:o,memberIds:M});y(`Group "${oe}" created! 🎉`,"success"),p.innerHTML="",c=await Re("/bonding/channels"),l=c.find(_e=>_e._id===Y._id)||Y,Oe(),Me(),await Fe(l._id)}catch(Y){y(Y.message||"Failed to create group","error"),F.disabled=!1,F.textContent="Create Group 🎉"}}}function te(p,m){const s=document.querySelector(".bonding-emoji-popup");s&&s.remove();const o=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],h=document.createElement("div");h.className="bonding-emoji-popup",h.innerHTML=o.map(V=>`<button class="emoji-opt-btn" data-e="${V}">${V}</button>`).join("");const F=p.getBoundingClientRect();h.style.top=`${F.bottom+window.scrollY+6}px`,h.style.left=`${F.left+window.scrollX}px`,document.body.appendChild(h),h.querySelectorAll(".emoji-opt-btn").forEach(V=>{V.onclick=oe=>{oe.stopPropagation(),m(V.dataset.e),h.remove()}});const C=V=>{h.contains(V.target)||(h.remove(),document.removeEventListener("click",C))};setTimeout(()=>document.addEventListener("click",C),10)}function Q(p){if(!p)return"";try{return new Date(p).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Za(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}function wa(i){if(!i)return"";const t=v(i),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return t.replace(e,d=>`<a href="${d}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${d} ↗</a>`)}const ca=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],wt=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Mt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ii(i,t={}){const{userRole:e="employee",currentUser:d=null,initialTicketId:g=null}=t,c=e==="superadmin"||e==="admin";if(e==="client"||d&&d.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let l=[],n={},R=[],G=[],S={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},E=null,j="comments",N=!1;i.innerHTML=`
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
  `,await Promise.all([tt(),Ve(),rt(),St()]),nt(),ot(),Fe(),Me(),g&&st(g);const ge=setInterval(()=>{if(!document.contains(i)){clearInterval(ge);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!E&&ce()},12e3),ye=()=>{document.contains(i)&&!E&&ce()};window.addEventListener("focus",ye);async function Ve(){try{const a=new URLSearchParams;S.search&&a.set("search",S.search),S.priority!=="all"&&a.set("priority",S.priority),S.category!=="all"&&a.set("category",S.category),S.assigneeId!=="all"&&a.set("assigneeId",S.assigneeId),S.jobId&&S.jobId!=="all"&&a.set("jobId",S.jobId),S.reporterId&&S.reporterId!=="all"&&a.set("reporterId",S.reporterId),S.scope==="created"&&a.set("reporterId",d?._id||d?.id),S.scope==="assigned"&&a.set("assigneeId",d?._id||d?.id),S.myIssuesOnly&&a.set("myIssuesOnly","true");const r=await Re("/tickets?"+a.toString());l=Array.isArray(r)?r:[]}catch(a){y(a.message||"Failed to load tickets",!0),l=[]}}async function tt(){try{n=await Re("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function rt(){try{let a;try{a=await Re("/tickets/staff")}catch{a=await Re("/users")}R=(a||[]).filter(r=>r.active!==!1&&r.role!=="client")}catch(a){console.warn("Could not fetch employees:",a),R=[]}}async function St(){try{const a=await Re("/jobs?limit=250");G=Array.isArray(a)?a:a?.jobs||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function nt(){const a=i.querySelector("#ci-360-stats-root");a&&(a.innerHTML=`
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
    `,a.querySelectorAll(".ci-360-stat-card").forEach(r=>{r.onclick=async()=>{const _=r.dataset.statFilter;_==="all"?(S.status="all",S.priority="all"):_==="critical"?(S.priority="Critical",S.status="all"):(S.status=_,S.priority="all"),await ce()}}))}function Fe(){const a=i.querySelector("#ci-360-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${R.map(_=>`
          <option value="${_._id}" ${S.assigneeId===_._id.toString()?"selected":""}>
            ${v(_.name)} (${v(_.role)})
          </option>
        `).join("")}
      `);const r=i.querySelector("#ci-360-filter-job");r&&(r.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${G.map(_=>`
          <option value="${_._id}" ${S.jobId===_._id.toString()?"selected":""}>
            📁 ${v(_.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function ot(){const a=i.querySelector("#ci-360-board-columns-root");if(!a)return;const r={};ca.forEach(_=>{r[_.key]=[]}),l.forEach(_=>{let P=_.status||"To Do";P==="In Progress"?P="Content":P==="Resolved"?P="Under Review":P==="Closed"&&(P="Ready to Leave"),r[P]||(r[P]=[]),r[P].push(_)}),a.innerHTML=ca.map(_=>{const P=r[_.key]||[];return`
        <div class="ci-360-board-column" data-status="${_.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${v(_.label)}</span>
              <span class="ci-360-col-badge">${P.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${_.key}">
            ${P.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:P.map($=>ut($)).join("")}
          </div>
        </div>
      `}).join(""),Oe(),ct()}function ut(a){const r=wt.find(ee=>ee.key===a.category)||wt[0],_=Mt.find(ee=>ee.key===a.priority)||Mt[2],P=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",$=(a.subtasks||[]).filter(ee=>ee.completed).length,B=(a.subtasks||[]).length,T=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],O=d?._id||d?.id,H=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(O)||a.userId&&String(a.userId)===String(O),x=e==="superadmin"||d?.role==="superadmin",z=H||x;let X="";if(T.length===0)X='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const ee=T.slice(0,3),te=T.length-3;X=`
        <div class="ci-360-avatar-group">
          ${ee.map(Q=>`
            <div class="ci-360-avatar" title="Assignee: ${v(Q.name||"Member")} (${v(Q.role||"")})">
              ${(Q.avatar||Q.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${te>0?`
            <div class="ci-360-avatar extra-count" title="${te} more assignees: ${v(T.slice(3).map(Q=>Q.name).join(", "))}">
              +${te}
            </div>
          `:""}
        </div>
      `}return`
      <div class="ci-360-card" draggable="true" data-ticket-id="${a._id}">
        <div class="ci-360-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="ci-360-category-pill ${r.slug}">
              ${r.icon} ${r.label}
            </span>
            ${H?`
              <span class="ci-360-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${a.dueDate?`
              <span class="ci-360-due-pill ${P?"overdue":""}" title="Due Date">
                ${P?"⚠️ ":"📅 "}
                ${new Date(a.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          ${z?`
            <button type="button" class="ci-360-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${v(a.ticketId)}" title="Delete Ticket (${x?"Superadmin":"Creator"})">
              🗑️
            </button>
          `:""}
        </div>

        <div class="ci-360-card-title" title="${v(a.title)}">
          ${v(a.title)}
        </div>

        ${a.jobTitle||a.jobId&&a.jobId.title?`
          <div class="ci-360-card-job-link" title="Linked Internal Job: ${v(a.jobTitle||a.jobId.title)}">
            📁 ${v(a.jobTitle||a.jobId.title)}
          </div>
        `:""}

        ${a.linkUrl||a.links&&a.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${v(a.linkUrl||a.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${v(a.linkUrl||a.links[0]?.url)}">
              🔗 ${a.links&&a.links[0]?.title?v(a.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="ci-360-card-bottom">
          <div class="ci-360-card-id-row">
            <span class="ci-360-pri-icon" title="Priority: ${_.label}">${_.icon}</span>
            <span class="ci-360-ticket-id">${v(a.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${B>0?`
              <span class="ci-360-subtask-badge" title="${$} of ${B} subtasks completed">
                ☑ ${$}/${B}
              </span>
            `:""}
            ${X}
          </div>
        </div>
      </div>
    `}function Oe(){const a=i.querySelectorAll(".ci-360-card"),r=i.querySelectorAll(".ci-360-board-column");a.forEach(_=>{_.ondragstart=P=>{P.dataTransfer.setData("text/plain",_.dataset.ticketId),_.classList.add("dragging")},_.ondragend=()=>{_.classList.remove("dragging")}}),r.forEach(_=>{_.ondragover=P=>{P.preventDefault(),_.classList.add("drag-over")},_.ondragleave=()=>{_.classList.remove("drag-over")},_.ondrop=async P=>{P.preventDefault(),_.classList.remove("drag-over");const $=P.dataTransfer.getData("text/plain"),B=_.dataset.status;if(!$||!B)return;const T=l.find(z=>z._id.toString()===$);if(!T||T.status===B)return;const O=T.status,H=T.assignees?[...T.assignees]:[],x=T.assignee?{...T.assignee}:null;if(T.status=B,B==="Under Review"){const z={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};T.assignee=z,T.assignees=[z]}ot();try{const z=await Ze(`/tickets/${$}/status`,{status:B}),X=B==="Under Review"?`Moved ${z.ticketId} to Under Review (Default assigned to John)`:`Moved ${z.ticketId} to ${B}`;y(X,!1),await ce()}catch(z){y(z.message||"Status update failed",!0),T.status=O,T.assignees=H,T.assignee=x,await ce()}}})}function ct(){i.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async r=>{r.stopPropagation(),r.preventDefault();const _=a.dataset.ticketId,P=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${P}?`)){a.disabled=!0;try{await et(`/tickets/${_}`),y(`Ticket ${P} deleted`,!1),await ce()}catch($){y($.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),i.querySelectorAll(".ci-360-card").forEach(a=>{a.onclick=r=>{if(r.target.tagName==="A"||r.target.closest(".btn-delete-card-ticket"))return;const _=a.dataset.ticketId;st(_)}})}function Me(){const a=i.querySelector("#btn-ci-360-refresh");a&&(a.onclick=async()=>{await ce(),y("Board updated",!1)});const r=i.querySelector("#btn-ci-360-create-ticket");r&&(r.onclick=()=>{I()});const _=i.querySelector("#ci-360-search-input");let P=null;_&&(_.oninput=Q=>{clearTimeout(P),P=setTimeout(async()=>{S.search=Q.target.value.trim(),ze(),await ce()},300)});const $=i.querySelector("#ci-360-filter-priority");$&&($.onchange=async Q=>{S.priority=Q.target.value,ze(),await ce()});const B=i.querySelector("#ci-360-filter-category");B&&(B.onchange=async Q=>{S.category=Q.target.value,ze(),await ce()});const T=i.querySelector("#ci-360-filter-job");T&&(T.onchange=async Q=>{S.jobId=Q.target.value,ze(),await ce()});const O=i.querySelector("#ci-360-filter-assignee");O&&(O.onchange=async Q=>{S.assigneeId=Q.target.value,ze(),await ce()});const H=i.querySelector("#ci-360-pill-my-issues");H&&(H.onclick=async()=>{S.myIssuesOnly=!S.myIssuesOnly,H.classList.toggle("active",S.myIssuesOnly),ze(),await ce()});const x=i.querySelector("#ci-360-pill-scope-all"),z=i.querySelector("#ci-360-pill-scope-assigned"),X=i.querySelector("#ci-360-pill-scope-created"),ee=async Q=>{S.scope=Q,x&&x.classList.toggle("active",Q==="all"),z&&z.classList.toggle("active",Q==="assigned"),X&&X.classList.toggle("active",Q==="created"),ze(),await ce()};x&&(x.onclick=()=>ee("all")),z&&(z.onclick=()=>ee("assigned")),X&&(X.onclick=()=>ee("created"));const te=i.querySelector("#ci-360-clear-filters");te&&(te.onclick=async()=>{S={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},_&&(_.value=""),$&&($.value="all"),B&&(B.value="all");const Q=i.querySelector("#ci-360-filter-job");Q&&(Q.value="all"),O&&(O.value="all"),H&&H.classList.remove("active"),x&&x.classList.add("active"),z&&z.classList.remove("active"),X&&X.classList.remove("active"),ze(),await ce()})}function ze(){const a=i.querySelector("#ci-360-clear-filters");if(!a)return;const r=S.search||S.priority!=="all"||S.category!=="all"||S.jobId&&S.jobId!=="all"||S.assigneeId!=="all"||S.myIssuesOnly||S.scope&&S.scope!=="all";a.style.display=r?"inline":"none"}async function ce(){await Ve(),ot()}async function st(a){const r=i.querySelector("#ci-360-modals-root");if(r){r.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{E=await Re(`/tickets/${a}`)}catch(_){y(_.message||"Could not load ticket",!0),r.innerHTML="";return}ve()}}function ve(){const a=i.querySelector("#ci-360-modals-root");if(!a||!E)return;const r=E,_=wt.find(o=>o.key===r.category)||wt[0];Mt.find(o=>o.key===r.priority)||Mt[2];const P=r.subtasks||[],$=P.filter(o=>o.completed).length,B=P.length>0?Math.round($/P.length*100):0,T=r.attachments||[],O=r.comments||[],H=(r.history||[]).slice().reverse(),x=r.workLogs||[],z=r.linkedTickets||[],X=d?._id||d?.id,ee=r.reporter&&r.reporter.userId&&String(r.reporter.userId)===String(X)||r.userId&&String(r.userId)===String(X),te=e==="superadmin"||d?.role==="superadmin",Q=ee||te,p=Array.isArray(r.assignees)&&r.assignees.length>0?r.assignees:r.assignee&&r.assignee.userId?[r.assignee]:[];p.some(o=>o&&o.userId&&String(o.userId)===String(X));const m=r.jobId?._id?r.jobId._id.toString():r.jobId?r.jobId.toString():"",s=r.jobTitle||r.jobId&&r.jobId.title||"";a.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${_.slug}">${_.icon} ${_.label}</span>
              <span class="ci-360-ticket-id" style="font-size:13px;color:#38bdf8;">${v(r.ticketId)}</span>
            </div>
            <button class="ci-360-modal-close" id="btn-close-ci-360-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="ci-360-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="ci-360-detail-main">
              <!-- Issue Title Header -->
              <div class="ci-360-issue-header-wrap">
                <input type="text" class="ci-360-editable-title" id="inp-detail-title" value="${v(r.title)}" title="Click to edit title" />
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
                  <textarea id="inp-detail-desc" class="ci-360-desc-editor" rows="6">${v(r.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-ci-360-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="ci-360-desc-wrap" id="view-detail-desc">
                    ${r.description?wa(r.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>🔗 Reference &amp; External Links (${(r.links||[]).length+(r.linkUrl&&!(r.links||[]).some(o=>o.url===r.linkUrl)?1:0)})</span>
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

                ${r.links&&r.links.length>0||r.linkUrl?`
                  <div class="ci-360-links-list" style="display:flex;flex-direction:column;gap:8px;">
                    ${r.linkUrl&&!(r.links||[]).some(o=>o.url===r.linkUrl)?`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(r.linkUrl)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(r.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${v(r.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(r.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    `:""}
                    ${(r.links||[]).map(o=>`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(o.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(o.title||o.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${o.title?`<span style="word-break:break-all;">${v(o.url)}</span> · `:""}Added by ${v(o.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${v(o.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(o.url)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${o.id}" title="Remove Link">&times;</button>
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
                  <span>Attachments (${T.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${T.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${T.map(o=>{const h=o.type&&o.type.includes("video")||o.name&&o.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||o.url&&o.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="ci-360-att-card ${h?"is-video":""}" style="${h?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${h?"16px":"13px"};">${h?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${o.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${v(o.name)}">
                                  ${v(o.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${ga(o.size)} ${h?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${h?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${o.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${o.url}" download="${v(o.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${o.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${h?`
                            <div class="ci-360-video-slot" id="video-slot-${o.id}" style="display:none;margin-top:6px;width:100%;">
                              <video controls preload="metadata" style="width:100%;max-height:360px;border-radius:6px;background:#000;">
                                <source src="${o.url}" type="${o.type||"video/mp4"}">
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
                  <span>Subtasks (${$}/${P.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${B}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${B}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${P.map(o=>`
                    <div class="ci-360-subtask-item">
                      <div class="ci-360-subtask-left">
                        <input type="checkbox" class="ci-360-subtask-cb cb-subtask-toggle" data-subtask-id="${o.id}" ${o.completed?"checked":""} />
                        <span class="ci-360-subtask-title ${o.completed?"done":""}">${v(o.title)}</span>
                      </div>
                      <button type="button" class="ci-360-att-del btn-del-subtask" data-subtask-id="${o.id}" title="Remove subtask">&times;</button>
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
                  <span>Linked Work Items (${z.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${z.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${z.map(o=>`
                      <div class="ci-360-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${v(o.relationship)}</span>
                          <span class="ci-360-ticket-id" style="color:#38bdf8;">${v(o.ticketId)}</span>
                          <span class="ci-360-linked-title" style="font-size:12.5px;">${v(o.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="ci-360-col-badge">${v(o.status||"Open")}</span>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${o.id}" title="Remove link">&times;</button>
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
                        <div class="ci-360-job-card-title" style="font-weight:700;font-size:13px;">${v(s)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${v(m)}</div>
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
                      ${G.map(o=>`
                        <option value="${o._id}" ${m===o._id.toString()?"selected":""}>
                          📁 ${v(o.title||"Untitled Job")}
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
                    Comments (${O.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${j==="history"?"active":""}" data-act-tab="history">
                    History (${H.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${j==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${x.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${j==="comments"?`
                  <div class="ci-360-comments-feed">
                    ${O.map(o=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(o.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${v(o.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${v(o.userRole)})</span></span>
                            <span class="ci-360-comment-time">${ta(o.createdAt)}</span>
                          </div>
                          <div class="ci-360-comment-body">${wa(o.content)}</div>
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
                    ${H.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:H.map(o=>`
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(o.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${v(o.userName)}</span>
                            <span class="ci-360-comment-time">${ta(o.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="ci-360-history-field">${v(o.field)}</strong>:
                            ${o.from?`<span style="text-decoration:line-through;color:#ef4444;">${v(o.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${v(o.to)}</span>
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
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${r.loggedHours||0} hrs</strong></span>
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

                    ${x.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:x.map(o=>`
                      <div class="ci-360-worklog-item">
                        <div class="ci-360-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(o.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-worklog-main">
                          <div class="ci-360-worklog-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${v(o.userName)} logged <strong style="color:#38bdf8;">${v(o.timeSpent)}</strong></span>
                            <span class="ci-360-comment-time">${ta(o.loggedAt)}</span>
                          </div>
                          ${o.description?`<div class="ci-360-comment-body" style="font-size:12px;">${v(o.description)}</div>`:""}
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
                  ${ca.map(o=>{let h=r.status||"To Do";return h==="In Progress"?h="Content":h==="Resolved"?h="Under Review":h==="Closed"&&(h="Ready to Leave"),`
                      <option value="${o.key}" ${h===o.key?"selected":""}>
                        ${o.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="ci-360-select-field">
                  ${Mt.map(o=>`
                    <option value="${o.key}" ${r.priority===o.key?"selected":""}>
                      ${o.icon} ${o.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="ci-360-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="ci-360-side-lbl" style="margin-bottom:0;">Assigned Personnel (${p.length})</span>
                  
                    <button type="button" class="ci-360-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="ci-360-assigned-chips-wrap">
                  ${p.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:p.map(o=>`
                    <div class="ci-360-assignee-chip">
                      <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(o.avatar||o.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="ci-360-assignee-chip-name" title="${v(o.name)}">${v(o.name)}</span>
                      ${`
                        <button type="button" class="ci-360-assignee-chip-remove btn-remove-assignee" data-user-id="${o.userId}" title="Remove ${v(o.name)}">&times;</button>
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
                    ${R.map(o=>{const h=p.some(F=>F&&F.userId&&String(F.userId)===String(o._id));return`
                        <label class="ci-360-emp-check-item ${h?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${o._id}" ${h?"checked":""} />
                          <div class="ci-360-avatar" style="width:18px;height:18px;font-size:9px;">${(o.name||"U").slice(0,1).toUpperCase()}</div>
                          <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                            ${v(o.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(o.role)})</span>
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
                    ${(r.reporter?.name||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${v(r.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${v(r.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Category</span>
                <select id="sel-detail-category" class="ci-360-select-field">
                  ${wt.map(o=>`
                    <option value="${o.key}" ${r.category===o.key?"selected":""}>
                      ${o.icon} ${o.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="ci-360-date-field" value="${r.dueDate?new Date(r.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="ci-360-select-field">
                  <option value="">None (Workspace General)</option>
                  ${G.map(o=>`
                    <option value="${o._id}" ${m===o._id.toString()?"selected":""}>
                      📁 ${v(o.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${r.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" class="ci-360-est-input" value="${r.estimatedHours||0}" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(r.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(r.updatedAt).toLocaleString()}</div>
                ${r.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(r.resolvedAt).toLocaleString()}</div>`:""}
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
    `,b()}function b(){const a=i.querySelector("#ci-360-modals-root");if(!a||!E)return;const r=a.querySelector("#btn-close-ci-360-modal");r&&(r.onclick=A);const _=a.querySelector("#ci-360-detail-backdrop");_&&(_.onclick=q=>{q.target===_&&A()});const P=a.querySelector("#inp-detail-title");P&&(P.onchange=async()=>{const q=P.value.trim();if(q)try{E=await Ze(`/tickets/${E._id}`,{title:q}),await ce()}catch(U){y(U.message||"Failed to update title",!0)}});const $=a.querySelector("#btn-toggle-desc-edit");$&&($.onclick=()=>{N=!N,ve()});const B=a.querySelector("#btn-cancel-desc");B&&(B.onclick=()=>{N=!1,ve()});const T=a.querySelector("#btn-save-desc");T&&(T.onclick=async()=>{const q=a.querySelector("#inp-detail-desc")?.value;try{E=await Ze(`/tickets/${E._id}`,{description:q}),N=!1,ve(),await ce(),y("Description saved",!1)}catch(U){y(U.message||"Failed to save description",!0)}});const O=a.querySelector("#sel-detail-status");O&&(O.onchange=async q=>{try{const U=await Ze(`/tickets/${E._id}/status`,{status:q.target.value});E=U,ve(),await tt(),nt(),await ce();const u=U.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${U.status}`;y(u,!1)}catch(U){y(U.message||"Status change failed",!0)}});const H=a.querySelector("#sel-detail-priority");H&&(H.onchange=async q=>{try{E=await Ze(`/tickets/${E._id}`,{priority:q.target.value}),ve(),await ce()}catch(U){y(U.message,!0)}});const x=a.querySelector("#btn-toggle-assignee-picker"),z=a.querySelector("#ci-360-detail-assignee-box"),X=a.querySelector("#btn-close-detail-assignee-box"),ee=a.querySelector("#btn-save-detail-assignees");x&&z&&(x.onclick=()=>{const q=z.style.display==="none";z.style.display=q?"block":"none"}),X&&z&&(X.onclick=()=>{z.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(q=>{q.onchange=()=>{q.closest(".ci-360-emp-check-item")?.classList.toggle("selected",q.checked)}}),ee&&(ee.onclick=async()=>{const q=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(U=>U.value);try{ee.disabled=!0,E=await Ze(`/tickets/${E._id}`,{assigneeIds:q}),ve(),await ce(),y("Assignees updated!",!1)}catch(U){y(U.message,!0),ee.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(q=>{q.onclick=async()=>{const U=q.dataset.userId,Ae=(Array.isArray(E.assignees)&&E.assignees.length>0?E.assignees:E.assignee?.userId?[E.assignee]:[]).filter(we=>we&&we.userId&&String(we.userId)!==String(U)).map(we=>String(we.userId));try{E=await Ze(`/tickets/${E._id}`,{assigneeIds:Ae}),ve(),await ce(),y("Assignee removed",!1)}catch(we){y(we.message,!0)}}});const te=a.querySelector("#sel-detail-category");te&&(te.onchange=async q=>{try{E=await Ze(`/tickets/${E._id}`,{category:q.target.value}),ve(),await ce()}catch(U){y(U.message,!0)}});const Q=a.querySelector("#inp-detail-duedate");Q&&(Q.onchange=async q=>{try{E=await Ze(`/tickets/${E._id}`,{dueDate:q.target.value||null}),ve(),await ce()}catch(U){y(U.message,!0)}});const p=a.querySelector("#sel-detail-job");p&&(p.onchange=async q=>{try{E=await Ze(`/tickets/${E._id}`,{jobId:q.target.value||null}),ve(),await ce(),y(q.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(U){y(U.message,!0)}});const m=a.querySelector("#btn-toggle-job-link"),s=a.querySelector("#ci-360-job-link-box");m&&s&&(m.onclick=()=>{s.style.display=s.style.display==="none"?"block":"none"});const o=a.querySelector("#btn-cancel-job-link");o&&s&&(o.onclick=()=>{s.style.display="none"});const h=a.querySelector("#btn-save-job-link");h&&(h.onclick=async()=>{const q=a.querySelector("#inp-modal-job-select")?.value||null;try{E=await Ze(`/tickets/${E._id}`,{jobId:q}),ve(),await ce(),y(q?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(U){y(U.message,!0)}});const F=a.querySelector("#btn-unlink-job");F&&(F.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{E=await Ze(`/tickets/${E._id}`,{jobId:null}),ve(),await ce(),y("Job unlinked",!1)}catch(q){y(q.message,!0)}});const C=a.querySelector("#inp-detail-esthours");C&&(C.onchange=async q=>{try{E=await Ze(`/tickets/${E._id}`,{estimatedHours:Number(q.target.value)||0})}catch(U){y(U.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(q=>{q.onchange=async()=>{const U=q.dataset.subtaskId;try{E=await Ze(`/tickets/${E._id}/subtasks/${U}`,{completed:q.checked}),ve(),await ce()}catch(u){y(u.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(q=>{q.onclick=async()=>{const U=q.dataset.subtaskId;try{E=await et(`/tickets/${E._id}/subtasks/${U}`),ve(),await ce()}catch(u){y(u.message,!0)}}});const V=a.querySelector("#inp-new-subtask"),oe=a.querySelector("#btn-add-subtask"),L=async()=>{const q=V?.value.trim();if(q)try{E=await Ce(`/tickets/${E._id}/subtasks`,{title:q}),ve(),await ce()}catch(U){y(U.message,!0)}};oe&&(oe.onclick=L),V&&(V.onkeydown=q=>{q.key==="Enter"&&(q.preventDefault(),L())});const M=a.querySelector("#btn-toggle-add-link"),Y=a.querySelector("#add-link-form"),_e=a.querySelector("#btn-cancel-new-link"),me=a.querySelector("#btn-save-new-link"),le=a.querySelector("#inp-new-link-url"),ue=a.querySelector("#inp-new-link-title");M&&Y&&(M.onclick=()=>{const q=Y.style.display==="none";Y.style.display=q?"block":"none",q&&le&&le.focus()}),_e&&Y&&(_e.onclick=()=>{Y.style.display="none",le&&(le.value=""),ue&&(ue.value="")}),me&&le&&(me.onclick=async()=>{const q=le.value.trim(),U=ue?.value.trim()||"";if(!q){y("Please enter a valid URL link",!0);return}try{me.disabled=!0,me.textContent="Saving...",E=await Ce(`/tickets/${E._id}/links`,{url:q,title:U}),ve(),await ce(),y("Reference link added! 🔗",!1)}catch(u){y(u.message||"Failed to save link",!0),me.disabled=!1,me.textContent="Save Link 🔗"}}),a.querySelectorAll(".btn-copy-link").forEach(q=>{q.onclick=()=>{const U=q.dataset.url;U&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(U).then(()=>{y("Link copied to clipboard! 📋")}).catch(()=>{y("Link: "+U)}):y("Link: "+U))}}),a.querySelectorAll(".btn-del-link").forEach(q=>{q.onclick=async()=>{const U=q.dataset.linkId;try{E=await et(`/tickets/${E._id}/links/${U}`),ve(),await ce(),y("Link removed")}catch(u){y(u.message||"Failed to remove link",!0)}}});const W=a.querySelector("#btn-trigger-detail-upload"),re=a.querySelector("#inp-detail-att-upload"),be=a.querySelector("#detail-att-upload-progress");W&&re&&(W.onclick=q=>{q.preventDefault(),re.click()}),re&&(re.onchange=async()=>{const q=Array.from(re.files||[]);if(re.value="",!!q.length){be&&(be.style.display="block",be.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${q.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const u=(await ba(q,Ae=>{const we=a.querySelector("#att-prog-pct"),lt=a.querySelector("#att-prog-bar");we&&(we.textContent=`${Ae}%`),lt&&(lt.style.width=`${Ae}%`)})).map(Ae=>({name:Ae.name,url:Ae.url,size:Ae.size||0,type:Ae.type||"application/octet-stream"}));u.length&&(E=await Ce(`/tickets/${E._id}/attachments`,{attachments:u}),ve(),y(`Successfully attached ${u.length} file(s)! 📎`,!1))}catch(U){console.error("Upload error:",U),y(`Upload failed: ${U.message}`,!0)}finally{be&&(be.style.display="none")}}}),a.querySelectorAll(".btn-play-att-video").forEach(q=>{q.onclick=()=>{const U=q.dataset.slot,u=a.querySelector("#"+U);if(u){const Ae=u.style.display==="none";u.style.display=Ae?"block":"none",q.textContent=Ae?"⏸ Close Video":"▶ Play Video";const we=u.querySelector("video");we&&Ae?we.play().catch(()=>{}):we&&we.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(q=>{q.onclick=async()=>{const U=q.dataset.attId;try{E=await et(`/tickets/${E._id}/attachments/${U}`),ve()}catch(u){y(u.message,!0)}}}),a.querySelectorAll(".ci-360-act-tab").forEach(q=>{q.onclick=()=>{j=q.dataset.actTab,ve()}});const de=a.querySelector("#inp-new-comment"),he=a.querySelector("#btn-submit-comment");he&&de&&(he.onclick=async()=>{const q=de.value.trim();if(q)try{he.disabled=!0,he.textContent="Saving...",E=await Ce(`/tickets/${E._id}/comments`,{content:q}),ve(),y("Comment added",!1)}catch(U){y(U.message||"Failed to add comment",!0)}finally{he.disabled=!1}});const De=a.querySelector("#btn-open-link-dialog"),Be=a.querySelector("#ci-360-link-box"),Ge=a.querySelector("#btn-cancel-link"),Le=a.querySelector("#btn-submit-link"),pe=a.querySelector("#inp-link-target"),Ee=a.querySelector("#sel-link-rel");De&&Be&&(De.onclick=()=>{Be.style.display="block"}),Ge&&Be&&(Ge.onclick=()=>{Be.style.display="none"}),Le&&Be&&(Le.onclick=async()=>{const q=pe?.value.trim(),U=Ee?.value||"relates to";if(q)try{Le.disabled=!0,E=await Ce(`/tickets/${E._id}/links`,{targetTicketId:q,relationship:U}),ve(),y(`Linked with ${q}`,!1)}catch(u){y(u.message||"Failed to link ticket",!0)}finally{Le.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(q=>{q.onclick=async()=>{const U=q.dataset.linkId;try{E=await et(`/tickets/${E._id}/links/${U}`),ve()}catch(u){y(u.message,!0)}}});const Ue=a.querySelector("#btn-open-worklog-dialog"),Ne=a.querySelector("#ci-360-worklog-box"),Pe=a.querySelector("#btn-cancel-worklog"),Te=a.querySelector("#btn-submit-worklog"),Ie=a.querySelector("#inp-worklog-time"),ke=a.querySelector("#inp-worklog-desc");Ue&&Ne&&(Ue.onclick=()=>{Ne.style.display="block"}),Pe&&Ne&&(Pe.onclick=()=>{Ne.style.display="none"}),Te&&Ne&&(Te.onclick=async()=>{const q=Ie?.value.trim(),U=ke?.value.trim();if(!q){y("Enter time spent (e.g. 2h 30m)",!0);return}try{Te.disabled=!0,E=await Ce(`/tickets/${E._id}/worklogs`,{timeSpent:q,description:U}),ve(),y("Work logged",!1)}catch(u){y(u.message||"Failed to log work",!0)}finally{Te.disabled=!1}});const fe=a.querySelector("#btn-delete-ticket");fe&&(fe.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${E.ticketId}?`))try{fe.disabled=!0,await et(`/tickets/${E._id}`),y(`Ticket ${E.ticketId} deleted`,!1),A(),await tt(),nt(),await ce()}catch(q){y(q.message||"Failed to delete ticket",!0),fe.disabled=!1}})}function A(){E=null,N=!1;const a=i.querySelector("#ci-360-modals-root");a&&(a.innerHTML="")}function I(a=null){const r=i.querySelector("#ci-360-modals-root");if(!r)return;const _=a||(S.jobId&&S.jobId!=="all"?S.jobId:null);r.innerHTML=`
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
                  ${R.map(s=>{const o=d&&String(d._id||d.id)===String(s._id);return`
                      <label class="ci-360-emp-check-item ${o?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${s._id}" ${o?"checked":""} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(s.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${v(s.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(s.role)})${o?" — (You)":""}</span>
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
                  ${G.map(s=>`
                    <option value="${s._id}" ${_&&String(_)===String(s._id)?"selected":""}>
                      📁 ${v(s.title||"Untitled Job")}
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
    `;const P=()=>{r.querySelectorAll(".ci-360-emp-check-item").forEach(s=>{const o=s.querySelector(".chk-create-emp");s.classList.toggle("selected",!!o?.checked)})};r.querySelectorAll(".chk-create-emp").forEach(s=>{s.onchange=P});const $=r.querySelector("#btn-create-assign-self");$&&d&&($.onclick=()=>{const s=String(d._id||d.id);r.querySelectorAll(".chk-create-emp").forEach(o=>{o.value===s&&(o.checked=!0)}),P()});const B=r.querySelector("#btn-create-clear-assign");B&&(B.onclick=()=>{r.querySelectorAll(".chk-create-emp").forEach(s=>{s.checked=!1}),P()});const T=[],O=r.querySelector("#inp-create-ticket-att"),H=r.querySelector("#create-att-list"),x=r.querySelector("#create-att-count"),z=r.querySelector("#create-att-progress"),X=()=>{x&&(x.textContent=`${T.length} file(s) attached`),H&&(H.innerHTML=T.map((s,o)=>{const h=s.type&&s.type.includes("video")||s.name&&s.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${h?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${v(s.name)}">${v(s.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${ga(s.size)} ${h?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${o}" title="Remove">&times;</button>
          </div>
        `}).join(""),H.querySelectorAll(".btn-del-pending-att").forEach(s=>{s.onclick=()=>{T.splice(Number(s.dataset.idx),1),X()}}))};O&&(O.onchange=async()=>{const s=Array.from(O.files||[]);if(O.value="",!!s.length){z&&(z.style.display="block",z.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${s.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await ba(s,h=>{const F=r.querySelector("#create-prog-pct"),C=r.querySelector("#create-prog-bar");F&&(F.textContent=`${h}%`),C&&(C.style.width=`${h}%`)})).forEach(h=>{T.push({name:h.name,url:h.url,size:h.size||0,type:h.type||"application/octet-stream"})}),X()}catch(o){y(`Failed to upload files: ${o.message}`,!0)}finally{z&&(z.style.display="none"),O.value=""}}});const ee=()=>{r.innerHTML=""},te=r.querySelector("#btn-close-create-modal");te&&(te.onclick=ee);const Q=r.querySelector("#btn-cancel-create-ticket");Q&&(Q.onclick=ee);const p=r.querySelector("#ci-360-create-backdrop");p&&(p.onclick=s=>{s.target===p&&ee()});const m=r.querySelector("#btn-submit-create-ticket");m&&(m.onclick=async()=>{const s=r.querySelector("#create-ticket-title")?.value.trim(),o=r.querySelector("#create-ticket-desc")?.value.trim(),h=r.querySelector("#create-ticket-cat")?.value||"Task",F=r.querySelector("#create-ticket-pri")?.value||"Medium",V=Array.from(r.querySelectorAll(".chk-create-emp:checked")).map(Y=>Y.value),oe=r.querySelector("#create-ticket-duedate")?.value||null,L=r.querySelector("#create-ticket-job")?.value||null,M=r.querySelector("#create-ticket-url")?.value.trim()||"";if(!s){y("Ticket summary / title is required",!0);return}try{m.disabled=!0,m.textContent="Creating...";const Y=await Ce("/tickets",{title:s,description:o,category:h,priority:F,assigneeIds:V,assigneeId:V[0]||null,dueDate:oe,jobId:L,linkUrl:M,attachments:T});y(`Ticket ${Y.ticketId} created! 🎫`,!1),ee(),await tt(),nt(),await ce(),st(Y._id)}catch(Y){y(Y.message||"Could not create ticket",!0),m.disabled=!1,m.textContent="Create Ticket 🚀"}})}i._openCreateTicketModal=I,i._openTicketDetailModal=st,i._setJobFilter=async a=>{S.jobId=a||"all";const r=i.querySelector("#ci-360-filter-job");r&&(r.value=S.jobId),ze(),await ce()}}export{ii as a,ai as b,ti as i};
