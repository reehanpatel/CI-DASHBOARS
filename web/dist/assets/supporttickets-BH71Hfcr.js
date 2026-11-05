import{c as Re,k as y,e as v,v as Ze,l as et,p as Gt,m as Yt,j as Ce,w as ga,x as ta,y as ba}from"./api-FGezNYCI.js";const fa={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function _a(){try{const n=localStorage.getItem("ci360_planner_settings");if(n)return Object.assign({},fa,JSON.parse(n))}catch{}return Object.assign({},fa)}function Aa(n){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(n))}catch{}}function Ke(){const n=new Date,t=n.getFullYear(),e=String(n.getMonth()+1).padStart(2,"0"),d=String(n.getDate()).padStart(2,"0");return`${t}-${e}-${d}`}function Wt(n,t){const e=new Date(n+"T00:00:00");e.setDate(e.getDate()+t);const d=e.getFullYear(),b=String(e.getMonth()+1).padStart(2,"0"),c=String(e.getDate()).padStart(2,"0");return`${d}-${b}-${c}`}function It(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function He(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function ma(n){return n?new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function aa(n,t=1){const e=new Date(n+"T00:00:00"),d=e.getDay(),b=(d<t?7:0)+d-t,c=new Date(e);c.setDate(e.getDate()-b);const l=[];for(let o=0;o<7;o++){const B=new Date(c);B.setDate(c.getDate()+o);const G=B.getFullYear(),_=String(B.getMonth()+1).padStart(2,"0"),E=String(B.getDate()).padStart(2,"0");l.push(`${G}-${_}-${E}`)}return l}function Ia(){try{const n=window.AudioContext||window.webkitAudioContext;if(!n)return;const t=new n,e=t.currentTime,d=t.createOscillator(),b=t.createGain();d.type="sine",d.frequency.setValueAtTime(523.25,e),d.frequency.exponentialRampToValueAtTime(783.99,e+.15),b.gain.setValueAtTime(.2,e),b.gain.exponentialRampToValueAtTime(.001,e+.35),d.connect(b),b.connect(t.destination),d.start(e),d.stop(e+.35)}catch{}}function ti(n,t={}){const{userRole:e="employee",currentUser:d=null,onNavigate:b=null}=t,c=e==="superadmin"||e==="admin";let l=_a(),o={selectedDate:Ke(),viewMode:"daily",filterStatus:"all",searchQuery:"",groupByEmployee:c,collapsedEmployees:{},selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Da(),B();async function B(){o.loading=!0,G();try{const p=[Re("/tasks")];c&&p.push(Re("/personnel").catch(()=>[]));const[$,I]=await Promise.all(p);o.tasks=Array.isArray($)?$:[],I&&(o.personnelList=Array.isArray(I)?I:[])}catch(p){y("Failed to load planner tasks: "+p.message,!0)}finally{o.loading=!1,N()}}function G(){n.innerHTML=`
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
    `}function _(p){return o.tasks.filter($=>{if($.isDeleted===!0)return!1;if(c&&o.selectedPersonnelId!=="all"){const i=$.personnelId?._id||$.personnelId;if(String(i)!==String(o.selectedPersonnelId))return!1}const I=$.completionDateStr||$.dateStr||($.dueDate?new Date($.dueDate).toISOString().slice(0,10):""),a=$.assignedDateStr||($.assignedDate?new Date($.assignedDate).toISOString().slice(0,10):"")||($.createdAt?new Date($.createdAt).toISOString().slice(0,10):"")||I;if($.status==="In Progress"){const i=a&&I&&a<=I?a:I||a,C=a&&I&&a<=I?I:a||I;if(i&&C){if(p>=i&&p<=C)return!0}else{if(I&&I===p)return!0;if(a&&a===p)return!0}}return I&&I===p||$.status!=="Completed"&&a&&a===p?!0:!I&&!a?p===Ke():!1})}function E(p,$){if(p.status==="Completed")return!1;const I=p.completionDateStr||p.dateStr||(p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):"");return I?I<$:!1}function j(p,$){const I=p.length,a=p.filter(z=>z.status==="Completed").length,i=p.filter(z=>z.status==="In Progress").length,C=p.filter(z=>z.status==="Pending"||z.status==="Todo").length,P=p.filter(z=>E(z,$)).length,S=I>0?Math.round(a/I*100):0;return{total:I,completed:a,inProgress:i,pending:C,overdue:P,percent:S}}function N(){const p=Ke(),$=o.selectedDate===p,I=_(o.selectedDate),a=j(I,p);n.innerHTML=`
      <div class="ci360-planner-wrap ${l.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${He(o.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${v(l.displayName||"Daily Planner")}</h1>
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
            <button type="button" class="ci360-btn-primary ${o.selectedDate<p?"is-locked-past":""}" id="btnOpenAddTaskModal" title="${o.selectedDate<p?"Cannot add tasks on previous dates (switch to today or later)":"Add Task"}">
              ${o.selectedDate<p?`
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
              <span class="date-text" id="displayDateLabel">${It(o.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${o.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${$?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${c?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${o.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${o.personnelList.map(i=>`
                  <option value="${i._id}" ${o.selectedPersonnelId===String(i._id)?"selected":""}>
                    ${v(i.name)} (${v(i.department||i.role||"Team")})
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
    `,nt(),Fe()}function ge(p,$){return o.viewMode==="weekly"?rt():o.viewMode==="report"?St():ye(p,$)}function ye(p,$){const I=Ke(),a=o.selectedDate<I;let i=p;if(o.filterStatus==="pending"?i=i.filter(S=>S.status==="Pending"||S.status==="Todo"):o.filterStatus==="in_progress"?i=i.filter(S=>S.status==="In Progress"):o.filterStatus==="completed"?i=i.filter(S=>S.status==="Completed"):o.filterStatus==="overdue"&&(i=i.filter(S=>E(S,I))),o.searchQuery){const S=o.searchQuery.toLowerCase().trim();i=i.filter(z=>{const D=(z.title||"").toLowerCase(),O=(z.description||"").toLowerCase(),H=(z.category||"").toLowerCase(),x=(z.personnelId?.name||z.userId?.name||"").toLowerCase(),R=(z.createdByName||z.createdBy?.name||(z.createdBy?.email?z.createdBy.email.split("@")[0]:"")).toLowerCase();return D.includes(S)||O.includes(S)||H.includes(S)||x.includes(S)||R.includes(S)})}i.sort((S,z)=>{if(S.status==="Completed"&&z.status!=="Completed")return 1;if(S.status!=="Completed"&&z.status==="Completed")return-1;const D={Urgent:0,High:1,Medium:2,Low:3};return(D[S.priority]||2)-(D[z.priority]||2)});const C=new Map;i.forEach(S=>{let z="unassigned",D="Unassigned / Team",O="",H="";S.personnelId&&typeof S.personnelId=="object"&&S.personnelId._id?(z=String(S.personnelId._id),D=S.personnelId.name||"Team Member",H=S.personnelId.role||"Personnel",O=S.personnelId.department||""):S.userId&&typeof S.userId=="object"&&S.userId._id?(z=String(S.userId._id),D=S.userId.name||"User",H=S.userId.role||"Member"):(S.createdByName||S.createdBy&&S.createdBy.name)&&(D=S.createdByName||S.createdBy.name,z="creator_"+D.toLowerCase().replace(/[^a-z0-9]/g,"_"),H="Creator"),C.has(z)||C.set(z,{key:z,name:D,department:O,role:H,tasks:[]}),C.get(z).tasks.push(S)});const P=Array.from(C.values()).sort((S,z)=>S.key==="unassigned"?1:z.key==="unassigned"?-1:S.name.localeCompare(z.name));return`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              ${a?"Focus Archive":"Today's Focus"}
            </h2>
            <span class="ci360-task-count-badge">${i.length} ${i.length===1?"task":"tasks"}</span>
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${o.filterStatus==="all"?"active":""}" data-f="all">All (${$.total})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${$.pending})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${$.inProgress})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${$.completed})</button>
              ${$.overdue>0?`
                <button type="button" class="filter-pill overdue ${o.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${$.overdue})</button>
              `:""}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${c?`
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${o.groupByEmployee?"active":""}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${o.groupByEmployee?"By Employee":"Flat List"}
                </button>
                ${o.groupByEmployee&&P.length>0?`
                  <button type="button" class="filter-pill" id="btnExpandAllEmp" title="Expand all employee tasks">⊞ Expand</button>
                  <button type="button" class="filter-pill" id="btnCollapseAllEmp" title="Collapse all employee tasks">⊟ Collapse</button>
                `:""}
              </div>
            `:""}

            <!-- Search Bar with employee search support -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks, category or employee..." value="${v(o.searchQuery)}">
              ${o.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card (Only for Today or Future Dates) / Past Date Banner -->
        ${a?`
          <div class="ci360-past-date-banner">
            <div class="past-banner-icon">🔒</div>
            <div class="past-banner-body">
              <div class="past-banner-title">Previous Date (${He(o.selectedDate)})</div>
              <div class="past-banner-desc">
                Adding new tasks on previous dates is restricted. You can edit existing tasks, adjust completion dates, or mark tasks as completed.
              </div>
            </div>
          </div>
        `:`
          <div class="ci360-quick-add-bar">
            <div class="ci360-quick-add-input-wrap">
              <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${He(o.selectedDate)}... (Press Enter to save)">
            </div>

            <div class="ci360-quick-add-meta">
              <div class="ci360-quick-date-group" title="Completion Date (defaults to that day if left blank)" style="display:inline-flex;align-items:center;gap:4px;">
                <span style="font-size:11.5px;color:var(--text-3);font-weight:600;">Due:</span>
                <input type="date" id="quickAddCompletionDate" class="ci360-quick-select" value="${o.selectedDate}" min="${I}" title="Completion Date (defaults to that day if left blank)">
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
                  <option value="" ${o.selectedPersonnelId==="all"?"selected":""}>👤 Myself</option>
                  <option value="all">👥 All Team</option>
                  ${o.personnelList.map(S=>`
                    <option value="${S._id}" ${o.selectedPersonnelId===String(S._id)?"selected":""}>👤 ${v(S.name)}</option>
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
          ${i.length===0?Ye(a):c&&o.groupByEmployee?`
              <div class="ci360-emp-groups-container">
                ${P.map(S=>{const z=!!o.collapsedEmployees[S.key],D=S.tasks.filter(R=>R.status==="Completed").length,O=S.tasks.filter(R=>R.status==="In Progress").length,H=S.tasks.filter(R=>R.status==="Pending"||R.status==="Todo").length,x=S.tasks.length>0?Math.round(D/S.tasks.length*100):0;return`
                    <div class="ci360-emp-group-card ${z?"is-collapsed":""}" data-emp-key="${S.key}">
                      <div class="ci360-emp-group-header" data-action="toggle-emp-group" data-emp-key="${S.key}" role="button" tabindex="0">
                        <div class="emp-group-left">
                          <span class="emp-collapse-icon">${z?"▶":"▼"}</span>
                          <div class="emp-avatar">${v((S.name||"U").charAt(0).toUpperCase())}</div>
                          <div class="emp-info">
                            <span class="emp-name">${v(S.name)}</span>
                            ${S.department||S.role?`<span class="emp-subtitle">${v(S.department?S.department+" · "+S.role:S.role)}</span>`:""}
                          </div>
                        </div>

                        <div class="emp-group-right">
                          <span class="emp-stat-pill total">${S.tasks.length} ${S.tasks.length===1?"task":"tasks"}</span>
                          <span class="emp-stat-pill done">${D} done</span>
                          ${O>0?`<span class="emp-stat-pill in-prog">${O} in progress</span>`:""}
                          ${H>0?`<span class="emp-stat-pill pending">${H} pending</span>`:""}
                          <div class="emp-mini-bar-wrap" title="${x}% completed">
                            <div class="emp-mini-bar-fill" style="width:${x}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${z?"":`
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${S.tasks.map(R=>tt(R,I)).join("")}
                          </div>
                        </div>
                      `}
                    </div>
                  `}).join("")}
              </div>
            `:`
              <div class="ci360-task-list">
                ${i.map(S=>tt(S,I)).join("")}
              </div>
            `}
        </div>

      </div>
    `}function Ye(p=!1){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">${p?"📜":"✨"}</div>
        <h3>No tasks found for ${He(o.selectedDate)}</h3>
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
    `}function tt(p,$){const I=p.status==="Completed",a=E(p,$),i=p.completionDateStr||p.dateStr||(p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):$),C=p.assignedDateStr||(p.assignedDate?new Date(p.assignedDate).toISOString().slice(0,10):"")||(p.createdAt?new Date(p.createdAt).toISOString().slice(0,10):""),P=p.status==="In Progress"&&C&&i&&C!==i,S=`pri-${(p.priority||"medium").toLowerCase()}`,z=`status-${(p.status||"pending").toLowerCase().replace(/\s+/g,"-")}`,D=p.createdByName||p.createdBy?.name||(p.createdBy?.email?p.createdBy.email.split("@")[0]:"")||p.personnelId?.name||p.userId?.name||"";return`
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
            <span class="ci360-task-title">${v(p.title)}</span>
          </div>

          ${p.description?`
            <div class="ci360-task-desc">${v(p.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${S}">
              <span class="badge-dot"></span>
              ${v(p.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${z}">
              ${v(p.status||"Pending")}
            </span>

            <!-- Completion Date / Date Span Badge (Always Visible & Prominent) -->
            ${P?`
              <span class="ci360-badge completion-badge" style="background:rgba(59,130,246,0.15);color:#3b82f6;border-color:rgba(59,130,246,0.3);" title="In Progress from ${He(C)} to ${He(i)}">
                📅 ${He(C)} ➔ Due: ${He(i)}
              </span>
            `:`
              <span class="ci360-badge completion-badge" title="Target Completion Date: ${i}">
                📅 Due: ${He(i)}
              </span>
            `}

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${p.rescheduledFrom&&p.rescheduledFrom!==i?`
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${He(p.rescheduledFrom)} to ${He(i)} (${p.dateChangeCount||1} change${(p.dateChangeCount||1)>1?"s":""})">
                🔄 Date Changed: ${He(p.rescheduledFrom)} ➔ ${He(i)}
              </span>
            `:""}

            <!-- Added By Badge (Shows Who Created the Task) -->
            ${D?`
              <span class="ci360-badge creator-badge" title="Created / Added by: ${v(D)}">
                ✍️ Added by: ${v(D)}
              </span>
            `:""}

            <!-- Category -->
            ${p.category?`
              <span class="ci360-badge category-badge">
                #${v(p.category)}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${a?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name (if different from addedByName) -->
            ${c&&(p.personnelId?.name||p.userId?.name)&&(p.personnelId?.name||p.userId?.name)!==D?`
              <span class="ci360-badge personnel-badge" title="Assigned Employee">
                👤 Assigned: ${v(p.personnelId?.name||p.userId?.name)}
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
    `}function rt(){const p=aa(o.selectedDate,l.weekStartsOn),$=He(p[0]),I=He(p[6]),a=Ke();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${$} – ${I}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${p.map(i=>{const C=i===a,P=i===o.selectedDate,S=_(i),z=j(S,a);return`
              <div class="ci360-day-column ${C?"is-today":""} ${P?"is-selected":""}" data-date="${i}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${i}">
                  <div class="day-name">${ma(i)}</div>
                  <div class="day-number">${new Date(i+"T00:00:00").getDate()}</div>
                  ${C?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${z.completed}/${z.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${z.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${S.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:S.map(D=>`
                    <div class="ci360-mini-task-card ${D.status==="Completed"?"done":""}" data-id="${D._id}">
                      <button type="button" class="mini-check ${D.status==="Completed"?"checked":""}" data-action="toggle" data-id="${D._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${D._id}">
                        <div class="mini-title">${v(D.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(D.priority||"medium").toLowerCase()}">${D.priority||"Med"}</span>
                          ${D.dueTime?`<span class="mini-time">${v(D.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button (Locked on past dates) -->
                ${i<a?`
                  <div class="day-col-locked-note" title="Cannot add tasks on previous dates">
                    <span>🔒 Past Date</span>
                  </div>
                `:`
                  <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${i}">
                    + Add Task
                  </button>
                `}

              </div>
            `}).join("")}
        </div>

      </div>
    `}function St(){const p=aa(o.selectedDate,l.weekStartsOn),$=It(p[0]),I=It(p[6]),a=Ke(),i=o.tasks.filter(O=>{if(O.isDeleted===!0)return!1;const H=O.dateStr||(O.dueDate?new Date(O.dueDate).toISOString().slice(0,10):"");return p.includes(H)}),C=i.length,P=i.filter(O=>O.status==="Completed").length,S=i.filter(O=>O.status==="In Progress").length,z=C>0?Math.round(P/C*100):0,D={Urgent:0,High:0,Medium:0,Low:0};return i.forEach(O=>{const H=O.priority||"Medium";D[H]!==void 0&&D[H]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${$} – ${I}</div>
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
            <span class="value" style="font-size:28px;color:var(--green-500)">${P}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${S}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${z}%</span>
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
                ${p.map(O=>{const H=_(O),x=j(H,a);return`
                    <tr>
                      <td><strong>${ma(O)}</strong></td>
                      <td>${He(O)}</td>
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
              <div style="font-size:22px;font-weight:700">${D.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${D.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${D.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${D.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function nt(){const p=document.getElementById("btnViewDaily"),$=document.getElementById("btnViewWeekly"),I=document.getElementById("btnViewReport");p&&(p.onclick=()=>{o.viewMode="daily",N()}),$&&($.onclick=()=>{o.viewMode="weekly",N()}),I&&(I.onclick=()=>{o.viewMode="report",N()});const a=document.getElementById("btnPrevDay"),i=document.getElementById("btnNextDay"),C=document.getElementById("btnJumpToday"),P=document.getElementById("hiddenDateInput"),S=document.getElementById("datePickerBadge");a&&(a.onclick=()=>{o.selectedDate=Wt(o.selectedDate,-1),N()}),i&&(i.onclick=()=>{o.selectedDate=Wt(o.selectedDate,1),N()}),C&&(C.onclick=()=>{o.selectedDate=Ke(),N()}),S&&P&&(S.onclick=()=>{try{typeof P.showPicker=="function"?P.showPicker():P.focus()}catch{P.focus()}},P.onchange=Q=>{Q.target.value&&(o.selectedDate=Q.target.value,N())});const z=document.getElementById("admTeamSelect");z&&(z.onchange=Q=>{o.selectedPersonnelId=Q.target.value,N()});const D=document.getElementById("btnOpenAddTaskModal");D&&(D.onclick=()=>{if(o.selectedDate<Ke()){y("Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.",!0);return}Oe()});const O=document.getElementById("btnPlannerActionsMenu"),H=document.getElementById("plannerActionsDropdown");O&&H&&(O.onclick=Q=>{Q.stopPropagation(),H.classList.toggle("hidden")},document.addEventListener("click",Q=>{!H.contains(Q.target)&&Q.target!==O&&H.classList.add("hidden")}));const x=document.getElementById("btnActionImport");x&&(x.onclick=()=>{H?.classList.add("hidden"),ct()});const R=document.getElementById("btnActionExportPng");R&&(R.onclick=()=>{H?.classList.add("hidden"),Me()});const X=document.getElementById("btnActionExportPdf");X&&(X.onclick=()=>{H?.classList.add("hidden"),ce()});const Z=document.getElementById("btnActionBackup");Z&&(Z.onclick=()=>{H?.classList.add("hidden"),st()});const te=document.getElementById("btnActionSettings");te&&(te.onclick=()=>{H?.classList.add("hidden"),ve()})}function Fe(p){if(o.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(R=>{R.onclick=()=>{o.filterStatus=R.dataset.f,N()}});const $=document.getElementById("plannerTaskSearchInp");$&&($.oninput=R=>{o.searchQuery=R.target.value,N()});const I=document.getElementById("btnClearSearch");I&&(I.onclick=()=>{o.searchQuery="",N()});const a=document.getElementById("quickAddTitleInp"),i=document.getElementById("quickAddCompletionDate"),C=document.getElementById("quickAddPriority"),P=document.getElementById("quickAddCategory"),S=document.getElementById("btnQuickAddSubmit"),z=async()=>{const R=Ke();if(o.selectedDate<R){y("Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.",!0);return}const X=(a?.value||"").trim();if(!X){y("Please enter a task title",!0),a?.focus();return}const Z=(i?.value||"").trim()||o.selectedDate;if(Z<R){y("Cannot set completion date on a previous date.",!0);return}try{const te={title:X,assignedDate:o.selectedDate,assignedDateStr:o.selectedDate,dateStr:Z,completionDate:Z,completionDateStr:Z,dueDate:Z,priority:C?.value||l.defaultPriority,category:P?.value||"General",status:"Pending"};if(c){const u=document.getElementById("quickAddAssignee")?.value;u==="all"?(te.assignAll=!0,te.personnelId="all"):u?te.personnelId=u:o.selectedPersonnelId!=="all"&&(te.personnelId=o.selectedPersonnelId)}const Q=await Ce("/tasks",te);o.tasks.unshift(Q),y("Task added to today's focus! ✨"),a&&(a.value="",a.focus()),N()}catch(te){y(te.message,!0)}};S&&(S.onclick=z),a&&(a.onkeydown=R=>{R.key==="Enter"&&z()}),document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(R=>{R.onclick=()=>{const X=R.dataset.empKey;o.collapsedEmployees[X]=!o.collapsedEmployees[X],N()}});const D=document.getElementById("btnToggleEmpGrouping");D&&(D.onclick=()=>{o.groupByEmployee=!o.groupByEmployee,N()});const O=document.getElementById("btnExpandAllEmp");O&&(O.onclick=()=>{o.collapsedEmployees={},N()});const H=document.getElementById("btnCollapseAllEmp");H&&(H.onclick=()=>{document.querySelectorAll(".ci360-emp-group-card").forEach(R=>{const X=R.dataset.empKey;X&&(o.collapsedEmployees[X]=!0)}),N()});const x=document.getElementById("btnEmptyStateImport");x&&(x.onclick=()=>ct())}if(o.viewMode==="weekly"){const $=document.getElementById("btnPrevWeek"),I=document.getElementById("btnNextWeek"),a=document.getElementById("btnThisWeek");$&&($.onclick=()=>{o.selectedDate=Wt(o.selectedDate,-7),N()}),I&&(I.onclick=()=>{o.selectedDate=Wt(o.selectedDate,7),N()}),a&&(a.onclick=()=>{o.selectedDate=Ke(),N()}),document.querySelectorAll(".day-col-header").forEach(i=>{i.onclick=()=>{o.selectedDate=i.dataset.date,o.viewMode="daily",N()}}),document.querySelectorAll('[data-action="add-day"]').forEach(i=>{i.onclick=()=>{Oe(null,i.dataset.date)}})}if(o.viewMode==="report"){const $=document.getElementById("btnDownloadWeeklyPdf");$&&($.onclick=ce)}n.querySelectorAll('[data-action="toggle"]').forEach($=>{$.onclick=async I=>{I.stopPropagation();const a=$.dataset.id;await ot(a)}}),n.querySelectorAll('[data-action="edit"]').forEach($=>{$.onclick=I=>{I.stopPropagation();const a=$.dataset.id,i=o.tasks.find(C=>C._id===a);i&&Oe(i)}}),n.querySelectorAll('[data-action="delete"]').forEach($=>{$.onclick=async I=>{I.stopPropagation();const a=$.dataset.id;await ut(a)}})}async function ot(p){const $=o.tasks.find(a=>a._id===p);if(!$)return;const I=$.status!=="Completed";try{const a=await Ze(`/tasks/${p}/toggle`,{}),i=o.tasks.findIndex(C=>C._id===p);i!==-1&&(o.tasks[i]=a),I?(l.soundEnabled&&Ia(),y("Task marked as completed! 🎉")):y("Task reopened as pending."),N()}catch(a){y(a.message,!0)}}async function ut(p){const $=o.tasks.find(I=>I._id===p);if($&&confirm(`Are you sure you want to remove "${$.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await et(`/tasks/${p}`),o.tasks=o.tasks.filter(I=>I._id!==p),y("Task removed from planner (safely stored in database archive)"),N()}catch(I){y(I.message,!0)}}function Oe(p=null,$=null){const I=!!p,a=Ke(),i=p?p.assignedDateStr||(p.assignedDate?new Date(p.assignedDate).toISOString().slice(0,10):"")||p.dateStr||(p.createdAt?new Date(p.createdAt).toISOString().slice(0,10):o.selectedDate):$&&$>=a?$:o.selectedDate>=a?o.selectedDate:a;p?p.completionDateStr||p.dueDate&&new Date(p.dueDate).toISOString().slice(0,10):$&&$>=a||o.selectedDate>=a&&o.selectedDate;const C=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${I?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${v(p?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${v(p?.description||"")}</textarea>
          </div>

          <!-- Date Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${i}" ${I?"":`min="${a}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${p?.completionDateStr||(p?.dueDate?new Date(p.dueDate).toISOString().slice(0,10):"")}" ${I?"":`min="${a}"`} placeholder="Defaults to that day">
              <small style="color:var(--text-3);font-size:11px;">If left blank, will default to that day (${i})</small>
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
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${v(p?.category||"General")}">
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
                ${o.personnelList.map(x=>{const R=p?.personnelId?._id===x._id||p?.personnelId===x._id;return`<option value="${x._id}" ${R?"selected":""}>👤 ${v(x.name)} (${v(x.department||x.role||"Member")})</option>`}).join("")}
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
    `,P=Gt(C),S=P.querySelector("#taskForm"),z=P.querySelector("#btnModalClose"),D=P.querySelector("#btnCancelModal"),O=P.querySelector("#btnModalDeleteTask"),H=()=>P.remove();z&&(z.onclick=H),D&&(D.onclick=H),O&&p&&(O.onclick=async()=>{H(),await ut(p._id)}),S.onsubmit=async x=>{x.preventDefault();const R=P.querySelector("#taskTitle").value.trim(),X=P.querySelector("#taskDesc").value.trim(),Z=P.querySelector("#taskDate").value||i,Q=P.querySelector("#taskCompletionDate")?.value?.trim()||Z||o.selectedDate,u=P.querySelector("#taskPriority").value,m=P.querySelector("#taskStatus").value,s=P.querySelector("#taskCategory").value.trim()||"General";if(!R){y("Task title is required",!0);return}if(!I&&(Q<a||Z<a)){y("Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.",!0);return}const r={title:R,description:X,assignedDate:Z,assignedDateStr:Z,dateStr:Q,completionDate:Q,completionDateStr:Q,dueDate:Q,startTime:"",dueTime:"",priority:u,status:m,category:s};if(c){const F=P.querySelector("#taskAssignee")?.value;F==="all"?(r.assignAll=!0,r.personnelId="all"):F==="me"?r.personnelId="me":F&&(r.personnelId=F)}const h=P.querySelector("#btnSaveTask");h.disabled=!0,h.textContent="Saving...";try{if(I){const F=await Yt(`/tasks/${p._id}`,r),A=o.tasks.findIndex(V=>V._id===p._id);A!==-1&&(o.tasks[A]=F),y("Task updated successfully! ✍️")}else{const F=await Ce("/tasks",r);Array.isArray(F.tasks)?F.tasks.forEach(A=>o.tasks.unshift(A)):o.tasks.unshift(F),y("Task created successfully! ✨")}H(),N()}catch(F){y(F.message,!0),h.disabled=!1,h.textContent=I?"Save Changes":"Create Task"}}}function ct(){let p=[];const $=`
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
              <input type="date" id="importTargetDate" class="input" value="${o.selectedDate<Ke()?Ke():o.selectedDate}" min="${Ke()}">
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
    `,I=Gt($),a=()=>I.remove();I.querySelector("#btnImportClose").onclick=a,I.querySelector("#btnCancelImport").onclick=a;const i=I.querySelector("#importTextarea"),C=I.querySelector("#importFileInput"),P=I.querySelector("#importDropzone"),S=I.querySelector("#previewListArea"),z=I.querySelector("#previewCountLabel"),D=I.querySelector("#btnConfirmImport"),O=I.querySelector("#importFileInfo");function H(R){if(!R)return[];const X=R.split(/\r?\n/),Z=[];for(let te of X)te=te.trim(),te&&(te=te.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),te=te.replace(/^[-*•]\s+/,""),te=te.replace(/^\d+[\.\)]\s+/,""),te=te.trim(),te&&Z.push(te));return Z}function x(){const R=i.value,X=H(R),Z=I.querySelector("#importTargetDate").value,te=_(Z),Q=new Set(te.map(u=>(u.title||"").trim().toLowerCase()));p=[];for(const u of X){const m=Q.has(u.toLowerCase());p.push({title:u,isDuplicate:m})}if(z.textContent=`Preview (${p.length} ${p.length===1?"task":"tasks"} found)`,D.disabled=p.length===0,D.textContent=`Import ${p.length} ${p.length===1?"Task":"Tasks"}`,p.length===0){S.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}S.innerHTML=p.map((u,m)=>`
        <div class="preview-item ${u.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${m+1}.</span>
          <span class="preview-title">${v(u.title)}</span>
          ${u.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}i.oninput=x,P.onclick=()=>C.click(),C.onchange=R=>{const X=R.target.files[0];if(!X)return;O.textContent=`File selected: ${X.name} (${Math.round(X.size/1024)} KB)`;const Z=new FileReader;Z.onload=te=>{i.value=te.target.result,x()},Z.readAsText(X)},P.ondragover=R=>{R.preventDefault(),P.classList.add("dragover")},P.ondragleave=()=>P.classList.remove("dragover"),P.ondrop=R=>{R.preventDefault(),P.classList.remove("dragover");const X=R.dataTransfer.files[0];if(X&&(X.type==="text/plain"||X.name.endsWith(".txt"))){O.textContent=`File dropped: ${X.name}`;const Z=new FileReader;Z.onload=te=>{i.value=te.target.result,x()},Z.readAsText(X)}else y("Please drop a valid .txt plain-text file",!0)},D.onclick=async()=>{if(p.length===0)return;D.disabled=!0,D.textContent="Importing...";const R=I.querySelector("#importTargetDate").value;if(R<Ke()){y("Cannot import tasks for previous dates. Target date must be today or later.",!0),D.disabled=!1,D.textContent=`Import ${p.length} ${p.length===1?"Task":"Tasks"}`;return}const X=I.querySelector("#importPriority").value,Z=I.querySelector("#importCategory").value.trim()||"General",te={date:R,tasks:p.map(Q=>({title:Q.title,priority:X,category:Z,status:"Pending"}))};c&&o.selectedPersonnelId!=="all"&&(te.personnelId=o.selectedPersonnelId);try{const Q=await Ce("/tasks/bulk-import",te);Array.isArray(Q.tasks)&&Q.tasks.forEach(u=>o.tasks.unshift(u)),y(`Imported ${Q.importedCount} tasks successfully! (${Q.skippedCount} skipped duplicates)`),a(),o.selectedDate=R,N()}catch(Q){y(Q.message,!0),D.disabled=!1,D.textContent="Retry Import"}}}async function Me(){const p=_(o.selectedDate),$=j(p,Ke()),I=It(o.selectedDate),a=2,i=800,C=160,P=90,S=74,z=70,D=Math.max(120,p.length*S),O=C+P+D+z,H=document.createElement("canvas");H.width=i*a,H.height=O*a;const x=H.getContext("2d");x.scale(a,a);const R=document.documentElement.getAttribute("data-theme")==="dark",X=R?"#0F172A":"#F8FAFC",Z=R?"#1E293B":"#FFFFFF",te=R?"#334155":"#E2E8F0",Q=R?"#F8FAFC":"#0F172A",u=R?"#94A3B8":"#475569",m="#4F46E5",s="#10B981",r="#F59E0B";x.fillStyle=X,x.fillRect(0,0,i,O),x.fillStyle=Z,ze(x,24,20,i-48,C-30,16),x.fill(),x.strokeStyle=te,x.lineWidth=1,x.stroke(),x.fillStyle=m,x.font="bold 12px Inter, sans-serif",x.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),x.fillStyle=Q,x.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',x.fillText(I,44,86),x.fillStyle=u,x.font="13px Inter, sans-serif",x.fillText(`Planned focus list · ${$.completed} of ${$.total} tasks completed (${$.percent}%)`,44,114);const h=C+6;x.fillStyle=Z,ze(x,24,h,i-48,P-16,12),x.fill(),x.stroke();const F=[{label:"TOTAL TASKS",val:String($.total),color:Q},{label:"COMPLETED",val:String($.completed),color:s},{label:"IN PROGRESS",val:String($.inProgress),color:r},{label:"PENDING",val:String($.pending),color:u},{label:"PROGRESS",val:`${$.percent}%`,color:m}],A=(i-48)/F.length;F.forEach((L,M)=>{const Y=24+M*A+20;x.fillStyle=L.color,x.font="bold 20px Inter, sans-serif",x.fillText(L.val,Y,h+36),x.fillStyle=u,x.font="10px Inter, sans-serif",x.fillText(L.label,Y,h+54)});const V=h+P;x.fillStyle=Z,ze(x,24,V,i-48,D+10,16),x.fill(),x.stroke(),p.length===0?(x.fillStyle=u,x.font="14px Inter, sans-serif",x.textAlign="center",x.fillText("No scheduled tasks recorded for this date.",i/2,V+60),x.textAlign="left"):p.forEach((L,M)=>{const Y=V+16+M*S,_e=L.status==="Completed";x.beginPath(),x.arc(48,Y+14,10,0,Math.PI*2),_e?(x.fillStyle=s,x.fill(),x.strokeStyle="#FFFFFF",x.lineWidth=2,x.beginPath(),x.moveTo(44,Y+14),x.lineTo(47,Y+17),x.lineTo(52,Y+11),x.stroke()):(x.strokeStyle=te,x.lineWidth=2,x.stroke()),x.fillStyle=_e?u:Q,x.font=`${_e?"normal":"500"} 14px Inter, sans-serif`;const me=L.title.length>55?L.title.slice(0,52)+"...":L.title;if(x.fillText(me,70,Y+18),_e){const Te=x.measureText(me);x.strokeStyle=u,x.lineWidth=1.2,x.beginPath(),x.moveTo(70,Y+14),x.lineTo(70+Te.width,Y+14),x.stroke()}const le=L.priority||"Medium";let ue="#E2E8F0",W="#334155";le==="Urgent"?(ue="#FEE2E2",W="#DC2626"):le==="High"?(ue="#FEF3C7",W="#D97706"):le==="Low"&&(ue="#ECFDF5",W="#059669"),x.fillStyle=ue,ze(x,i-150,Y+4,60,20,10),x.fill(),x.fillStyle=W,x.font="bold 10px Inter, sans-serif",x.fillText(le,i-138,Y+18);const re=L.createdByName||L.createdBy?.name||(L.createdBy?.email?L.createdBy.email.split("@")[0]:"")||L.personnelId?.name||L.userId?.name||"Member",be=L.completionDateStr||L.dateStr||"",de=[];de.push(`✍️ Added by: ${re}`),be&&de.push(`📅 Due: ${He(be)}`),L.dueTime&&de.push(`🕒 ${L.dueTime}`),L.category&&L.category!=="General"&&de.push(`#${L.category}`);const he=de.join("   ·   ");x.fillStyle=u,x.font="11px Inter, sans-serif",x.fillText(he,70,Y+36),M<p.length-1&&(x.strokeStyle=te,x.lineWidth=.6,x.beginPath(),x.moveTo(40,Y+54),x.lineTo(i-40,Y+54),x.stroke())});const oe=O-35;x.fillStyle=u,x.font="11px Inter, sans-serif",x.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,oe);try{const L=H.toDataURL("image/png"),M=document.createElement("a");M.href=L,M.download=`ci360-daily-planner-${o.selectedDate}.png`,document.body.appendChild(M),M.click(),M.remove(),y("Daily Planner image exported! 🖼️")}catch(L){y("Failed to export image: "+L.message,!0)}}function ze(p,$,I,a,i,C){p.beginPath(),p.moveTo($+C,I),p.lineTo($+a-C,I),p.quadraticCurveTo($+a,I,$+a,I+C),p.lineTo($+a,I+i-C),p.quadraticCurveTo($+a,I+i,$+a-C,I+i),p.lineTo($+C,I+i),p.quadraticCurveTo($,I+i,$,I+i-C),p.lineTo($,I+C),p.quadraticCurveTo($,I,$+C,I),p.closePath()}function ce(){const p=aa(o.selectedDate,l.weekStartsOn),$=It(p[0]),I=It(p[6]);Ke();const a=o.tasks.filter(D=>{if(D.isDeleted===!0)return!1;const O=D.dateStr||(D.dueDate?new Date(D.dueDate).toISOString().slice(0,10):"");return p.includes(O)}),i=a.length,C=a.filter(D=>D.status==="Completed").length,P=i>0?Math.round(C/i*100):0,S=window.open("","_blank");if(!S){y("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const z=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${$}</title>
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
            <div class="period">${$} – ${I}</div>
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
            <div class="kpi-num" style="color:#10b981">${C}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${i-C}</div>
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
            ${p.map(D=>{const O=_(D);return O.length===0?`<tr><td><strong>${He(D)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`:O.map(H=>`
                <tr>
                  <td><strong>${He(D)}</strong></td>
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
    `;S.document.write(z),S.document.close(),y("Weekly PDF report generated for printing! 📄")}function st(){const $=Gt(`
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
    `),I=()=>$.remove();$.querySelector("#btnBackupClose").onclick=I;const a=$.querySelector("#btnDownloadBackupJson");a.onclick=async()=>{a.disabled=!0,a.textContent="Generating backup...";try{const D=await Re("/tasks/backup"),O=new Blob([JSON.stringify(D,null,2)],{type:"application/json"}),H=URL.createObjectURL(O),x=document.createElement("a");x.href=H,x.download=`ci360-planner-backup-${Ke()}.json`,document.body.appendChild(x),x.click(),x.remove(),y("Planner backup downloaded successfully! 💾")}catch(D){y("Backup export failed: "+D.message,!0)}finally{a.disabled=!1,a.textContent="Download JSON Backup"}};const i=$.querySelector("#restoreFileInput"),C=$.querySelector("#restorePreviewArea"),P=$.querySelector("#restoreCountText"),S=$.querySelector("#btnExecuteRestore");let z=null;i.onchange=D=>{const O=D.target.files[0];if(!O)return;const H=new FileReader;H.onload=x=>{try{const R=JSON.parse(x.target.result),X=Array.isArray(R.tasks)?R.tasks:Array.isArray(R)?R:null;if(!X||X.length===0){y("Invalid backup file: No tasks found",!0);return}z=X,C.style.display="block",P.textContent=`Valid backup: ${X.length} tasks ready to restore.`,S.disabled=!1}catch(R){y("Error parsing JSON backup file: "+R.message,!0),C.style.display="none",S.disabled=!0}},H.readAsText(O)},S.onclick=async()=>{if(!z||z.length===0)return;S.disabled=!0,S.textContent="Restoring...";const D=$.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const O=await Ce("/tasks/restore",{tasks:z,mode:D});y(`Restored ${O.restoredCount} tasks! (${O.skippedCount} skipped) ✨`),I(),await B()}catch(O){y("Restore failed: "+O.message,!0),S.disabled=!1,S.textContent="Retry Restore"}}}function ve(){const p=`
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
    `,$=Gt(p),I=()=>$.remove();$.querySelector("#btnSettingsClose").onclick=I,$.querySelector("#btnCancelSettings").onclick=I;const a=$.querySelector("#btnPlannerTestNotif");a&&(a.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await requestNotificationPermission()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):y("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true");const i=$.querySelector("#setNotifEnabled");i&&(i.checked=!0);const C=$.querySelector("#plannerNotifStatusLabel");C&&(C.textContent="🟢 Active on this laptop"),await triggerSystemNotification({title:"CI360 Planner Alert 🔔",message:"Laptop & browser notifications are active and ready!",id:"ci360-planner-test-"+Date.now()}),y("Test notification sent to your laptop/browser! 🔔")}),$.querySelector("#settingsForm").onsubmit=i=>{i.preventDefault(),l.displayName=$.querySelector("#setDisplayName").value.trim()||"Daily Planner",l.weekStartsOn=Number($.querySelector("#setWeekStart").value),l.defaultPriority=$.querySelector("#setDefaultPriority").value,l.density=$.querySelector("#setDensity").value,l.soundEnabled=$.querySelector("#setSound").checked;const C=$.querySelector("#setNotifEnabled")?.checked;localStorage.setItem("ci360_notif_enabled",C?"true":"false"),C&&"Notification"in window&&Notification.permission==="default"&&requestNotificationPermission(),Aa(l),y("Planner preferences saved! ⚙️"),I(),N()}}}function Da(){if(document.getElementById("ci360-planner-styles"))return;const n=document.createElement("style");n.id="ci360-planner-styles",n.textContent=`
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
  `,document.head.appendChild(n)}function Ea(n){return n!==null?{comment:n,variations:[]}:{variations:[]}}function Ta(n,t,e,d,b){const c={move:n,variations:b};return t&&(c.suffix=t),e&&(c.nag=e),d!==null&&(c.comment=d),c}function Pa(...n){const[t,...e]=n;let d=t;for(const b of e)b!==null&&(d.variations=[b,...b.variations],b.variations=[],d=b);return t}function Fa(n,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const d=e.variations[0];if(!d){e.comment=t.marker.comment;break}e=d}}return{headers:n,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function La(n,t){function e(){this.constructor=n}e.prototype=t.prototype,n.prototype=new e}function Dt(n,t,e,d){var b=Error.call(this,n);return Object.setPrototypeOf&&Object.setPrototypeOf(b,Dt.prototype),b.expected=t,b.found=e,b.location=d,b.name="SyntaxError",b}La(Dt,Error);function ia(n,t,e){return e=e||" ",n.length>t?n:(t-=n.length,e+=e.repeat(t),n+e.slice(0,t))}Dt.prototype.format=function(n){var t="Error: "+this.message;if(this.location){var e=null,d;for(d=0;d<n.length;d++)if(n[d].source===this.location.source){e=n[d].text.split(/\r\n|\n|\r/g);break}var b=this.location.start,c=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(b):b,l=this.location.source+":"+c.line+":"+c.column;if(e){var o=this.location.end,B=ia("",c.line.toString().length," "),G=e[b.line-1],_=b.line===o.line?o.column:G.length+1,E=_-b.column||1;t+=`
 --> `+l+`
`+B+` |
`+c.line+" | "+G+`
`+B+" | "+ia("",b.column-1," ")+ia("",E,"^")}else t+=`
 at `+l}return t};Dt.buildMessage=function(n,t){var e={literal:function(G){return'"'+b(G.text)+'"'},class:function(G){var _=G.parts.map(function(E){return Array.isArray(E)?c(E[0])+"-"+c(E[1]):c(E)});return"["+(G.inverted?"^":"")+_.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(G){return G.description}};function d(G){return G.charCodeAt(0).toString(16).toUpperCase()}function b(G){return G.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(_){return"\\x0"+d(_)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(_){return"\\x"+d(_)})}function c(G){return G.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(_){return"\\x0"+d(_)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(_){return"\\x"+d(_)})}function l(G){return e[G.type](G)}function o(G){var _=G.map(l),E,j;if(_.sort(),_.length>0){for(E=1,j=1;E<_.length;E++)_[E-1]!==_[E]&&(_[j]=_[E],j++);_.length=j}switch(_.length){case 1:return _[0];case 2:return _[0]+" or "+_[1];default:return _.slice(0,-1).join(", ")+", or "+_[_.length-1]}}function B(G){return G?'"'+b(G)+'"':"end of input"}return"Expected "+o(n)+" but "+B(t)+" found."};function qa(n,t){t=t!==void 0?t:{};var e={},d=t.grammarSource,b={pgn:Pt},c=Pt,l="[",o='"',B="]",G=".",_="O-O-O",E="O-O",j="0-0-0",N="0-0",ge="$",ye="{",Ye="}",tt=";",rt="(",St=")",nt="1-0",Fe="0-1",ot="1/2-1/2",ut="*",Oe=/^[a-zA-Z]/,ct=/^[^"]/,Me=/^[0-9]/,ze=/^[.]/,ce=/^[a-zA-Z1-8\-=]/,st=/^[+#]/,ve=/^[!?]/,p=/^[^}]/,$=/^[^\r\n]/,I=/^[ \t\r\n]/,a=Xe("tag pair"),i=qe("[",!1),C=qe('"',!1),P=qe("]",!1),S=Xe("tag name"),z=at([["a","z"],["A","Z"]],!1,!1),D=Xe("tag value"),O=at(['"'],!0,!1),H=Xe("move number"),x=at([["0","9"]],!1,!1),R=qe(".",!1),X=at(["."],!1,!1),Z=Xe("standard algebraic notation"),te=qe("O-O-O",!1),Q=qe("O-O",!1),u=qe("0-0-0",!1),m=qe("0-0",!1),s=at([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),r=at(["+","#"],!1,!1),h=Xe("suffix annotation"),F=at(["!","?"],!1,!1),A=Xe("NAG"),V=qe("$",!1),oe=Xe("brace comment"),L=qe("{",!1),M=at(["}"],!0,!1),Y=qe("}",!1),_e=Xe("rest of line comment"),me=qe(";",!1),le=at(["\r",`
`],!0,!1),ue=Xe("variation"),W=qe("(",!1),re=qe(")",!1),be=Xe("game termination marker"),de=qe("1-0",!1),he=qe("0-1",!1),Te=qe("1/2-1/2",!1),Be=qe("*",!1),We=Xe("whitespace"),Le=at([" ","	","\r",`
`],!1,!1),pe=function(f,w){return Fa(f,w)},De=function(f){return Object.fromEntries(f)},Ue=function(f,w){return[f,w]},Ne=function(f,w){return{root:f,marker:w}},Pe=function(f,w){return Pa(Ea(f),...w.flat())},Ie=function(f,w,k,J,ee){return Ta(f,w,k,J,ee)},Ee=function(f){return f},ke=function(f){return f.replace(/[\r\n]+/g," ")},fe=function(f){return f.trim()},q=function(f){return f},U=function(f,w){return{result:f,comment:w}},g=t.peg$currPos|0,Ae=[{line:1,column:1}],we=g,lt=t.peg$maxFailExpected||[],K=t.peg$silentFails|0,ht;if(t.startRule){if(!(t.startRule in b))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');c=b[t.startRule]}function qe(f,w){return{type:"literal",text:f,ignoreCase:w}}function at(f,w,k){return{type:"class",parts:f,inverted:w,ignoreCase:k}}function Ct(){return{type:"end"}}function Xe(f){return{type:"other",description:f}}function Et(f){var w=Ae[f],k;if(w)return w;if(f>=Ae.length)k=Ae.length-1;else for(k=f;!Ae[--k];);for(w=Ae[k],w={line:w.line,column:w.column};k<f;)n.charCodeAt(k)===10?(w.line++,w.column=1):w.column++,k++;return Ae[f]=w,w}function Tt(f,w,k){var J=Et(f),ee=Et(w),$e={source:d,start:{offset:f,line:J.line,column:J.column},end:{offset:w,line:ee.line,column:ee.column}};return $e}function ae(f){g<we||(g>we&&(we=g,lt=[]),lt.push(f))}function Bt(f,w,k){return new Dt(Dt.buildMessage(f,w),f,w,k)}function Pt(){var f,w,k;return f=g,w=Zt(),k=ea(),f=pe(w,k),f}function Zt(){var f,w,k;for(f=g,w=[],k=vt();k!==e;)w.push(k),k=vt();return k=Se(),f=De(w),f}function vt(){var f,w,k,J,ee,$e,pt;return K++,f=g,Se(),n.charCodeAt(g)===91?(w=l,g++):(w=e,K===0&&ae(i)),w!==e?(Se(),k=Nt(),k!==e?(Se(),n.charCodeAt(g)===34?(J=o,g++):(J=e,K===0&&ae(C)),J!==e?(ee=jt(),n.charCodeAt(g)===34?($e=o,g++):($e=e,K===0&&ae(C)),$e!==e?(Se(),n.charCodeAt(g)===93?(pt=B,g++):(pt=e,K===0&&ae(P)),pt!==e?f=Ue(k,ee):(g=f,f=e)):(g=f,f=e)):(g=f,f=e)):(g=f,f=e)):(g=f,f=e),K--,f===e&&K===0&&ae(a),f}function Nt(){var f,w,k;if(K++,f=g,w=[],k=n.charAt(g),Oe.test(k)?g++:(k=e,K===0&&ae(z)),k!==e)for(;k!==e;)w.push(k),k=n.charAt(g),Oe.test(k)?g++:(k=e,K===0&&ae(z));else w=e;return w!==e?f=n.substring(f,g):f=w,K--,f===e&&(w=e,K===0&&ae(S)),f}function jt(){var f,w,k;for(K++,f=g,w=[],k=n.charAt(g),ct.test(k)?g++:(k=e,K===0&&ae(O));k!==e;)w.push(k),k=n.charAt(g),ct.test(k)?g++:(k=e,K===0&&ae(O));return f=n.substring(f,g),K--,w=e,K===0&&ae(D),f}function ea(){var f,w,k;return f=g,w=Ot(),Se(),k=xe(),k===e&&(k=null),Se(),f=Ne(w,k),f}function Ot(){var f,w,k,J;for(f=g,w=Ut(),w===e&&(w=null),k=[],J=Ft();J!==e;)k.push(J),J=Ft();return f=Pe(w,k),f}function Ft(){var f,w,k,J,ee,$e,pt,At;if(f=g,Se(),_t(),Se(),w=Lt(),w!==e){for(k=gt(),k===e&&(k=null),J=[],ee=xt();ee!==e;)J.push(ee),ee=xt();for(ee=Se(),$e=Ut(),$e===e&&($e=null),pt=[],At=ie();At!==e;)pt.push(At),At=ie();f=Ie(w,k,J,$e,pt)}else g=f,f=e;return f}function _t(){var f,w,k,J,ee,$e;for(K++,f=g,w=[],k=n.charAt(g),Me.test(k)?g++:(k=e,K===0&&ae(x));k!==e;)w.push(k),k=n.charAt(g),Me.test(k)?g++:(k=e,K===0&&ae(x));if(n.charCodeAt(g)===46?(k=G,g++):(k=e,K===0&&ae(R)),k!==e){for(J=Se(),ee=[],$e=n.charAt(g),ze.test($e)?g++:($e=e,K===0&&ae(X));$e!==e;)ee.push($e),$e=n.charAt(g),ze.test($e)?g++:($e=e,K===0&&ae(X));w=[w,k,J,ee],f=w}else g=f,f=e;return K--,f===e&&(w=e,K===0&&ae(H)),f}function Lt(){var f,w,k,J,ee,$e;if(K++,f=g,w=g,n.substr(g,5)===_?(k=_,g+=5):(k=e,K===0&&ae(te)),k===e&&(n.substr(g,3)===E?(k=E,g+=3):(k=e,K===0&&ae(Q)),k===e&&(n.substr(g,5)===j?(k=j,g+=5):(k=e,K===0&&ae(u)),k===e&&(n.substr(g,3)===N?(k=N,g+=3):(k=e,K===0&&ae(m)),k===e))))if(k=g,J=n.charAt(g),Oe.test(J)?g++:(J=e,K===0&&ae(z)),J!==e){if(ee=[],$e=n.charAt(g),ce.test($e)?g++:($e=e,K===0&&ae(s)),$e!==e)for(;$e!==e;)ee.push($e),$e=n.charAt(g),ce.test($e)?g++:($e=e,K===0&&ae(s));else ee=e;ee!==e?(J=[J,ee],k=J):(g=k,k=e)}else g=k,k=e;return k!==e?(J=n.charAt(g),st.test(J)?g++:(J=e,K===0&&ae(r)),J===e&&(J=null),k=[k,J],w=k):(g=w,w=e),w!==e?f=n.substring(f,g):f=w,K--,f===e&&(w=e,K===0&&ae(Z)),f}function gt(){var f,w,k;for(K++,f=g,w=[],k=n.charAt(g),ve.test(k)?g++:(k=e,K===0&&ae(F));k!==e;)w.push(k),w.length>=2?k=e:(k=n.charAt(g),ve.test(k)?g++:(k=e,K===0&&ae(F)));return w.length<1?(g=f,f=e):f=w,K--,f===e&&(w=e,K===0&&ae(h)),f}function xt(){var f,w,k,J,ee;if(K++,f=g,Se(),n.charCodeAt(g)===36?(w=ge,g++):(w=e,K===0&&ae(V)),w!==e){if(k=g,J=[],ee=n.charAt(g),Me.test(ee)?g++:(ee=e,K===0&&ae(x)),ee!==e)for(;ee!==e;)J.push(ee),ee=n.charAt(g),Me.test(ee)?g++:(ee=e,K===0&&ae(x));else J=e;J!==e?k=n.substring(k,g):k=J,k!==e?f=Ee(k):(g=f,f=e)}else g=f,f=e;return K--,f===e&&K===0&&ae(A),f}function Ut(){var f;return f=Ht(),f===e&&(f=T()),f}function Ht(){var f,w,k,J,ee;if(K++,f=g,n.charCodeAt(g)===123?(w=ye,g++):(w=e,K===0&&ae(L)),w!==e){for(k=g,J=[],ee=n.charAt(g),p.test(ee)?g++:(ee=e,K===0&&ae(M));ee!==e;)J.push(ee),ee=n.charAt(g),p.test(ee)?g++:(ee=e,K===0&&ae(M));k=n.substring(k,g),n.charCodeAt(g)===125?(J=Ye,g++):(J=e,K===0&&ae(Y)),J!==e?f=ke(k):(g=f,f=e)}else g=f,f=e;return K--,f===e&&(w=e,K===0&&ae(oe)),f}function T(){var f,w,k,J,ee;if(K++,f=g,n.charCodeAt(g)===59?(w=tt,g++):(w=e,K===0&&ae(me)),w!==e){for(k=g,J=[],ee=n.charAt(g),$.test(ee)?g++:(ee=e,K===0&&ae(le));ee!==e;)J.push(ee),ee=n.charAt(g),$.test(ee)?g++:(ee=e,K===0&&ae(le));k=n.substring(k,g),f=fe(k)}else g=f,f=e;return K--,f===e&&(w=e,K===0&&ae(_e)),f}function ie(){var f,w,k,J;return K++,f=g,Se(),n.charCodeAt(g)===40?(w=rt,g++):(w=e,K===0&&ae(W)),w!==e?(k=Ot(),k!==e?(Se(),n.charCodeAt(g)===41?(J=St,g++):(J=e,K===0&&ae(re)),J!==e?f=q(k):(g=f,f=e)):(g=f,f=e)):(g=f,f=e),K--,f===e&&K===0&&ae(ue),f}function xe(){var f,w,k;return K++,f=g,n.substr(g,3)===nt?(w=nt,g+=3):(w=e,K===0&&ae(de)),w===e&&(n.substr(g,3)===Fe?(w=Fe,g+=3):(w=e,K===0&&ae(he)),w===e&&(n.substr(g,7)===ot?(w=ot,g+=7):(w=e,K===0&&ae(Te)),w===e&&(n.charCodeAt(g)===42?(w=ut,g++):(w=e,K===0&&ae(Be))))),w!==e?(Se(),k=Ut(),k===e&&(k=null),f=U(w,k)):(g=f,f=e),K--,f===e&&(w=e,K===0&&ae(be)),f}function Se(){var f,w;for(K++,f=[],w=n.charAt(g),I.test(w)?g++:(w=e,K===0&&ae(Le));w!==e;)f.push(w),w=n.charAt(g),I.test(w)?g++:(w=e,K===0&&ae(Le));return K--,w=e,K===0&&ae(We),f}if(ht=c(),t.peg$library)return{peg$result:ht,peg$currPos:g,peg$FAILED:e,peg$maxFailExpected:lt,peg$maxFailPos:we};if(ht!==e&&g===n.length)return ht;throw ht!==e&&g<n.length&&ae(Ct()),Bt(lt,we<n.length?n.charAt(we):null,we<n.length?Tt(we,we+1):Tt(we,we))}/**
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
 */const Jt=0xffffffffffffffffn;function na(n,t){return(n<<t|n>>64n-t)&0xffffffffffffffffn}function ha(n,t){return n*t&Jt}function Ma(n){return function(){let t=BigInt(n&Jt),e=BigInt(n>>64n&Jt);const d=ha(na(ha(t,5n),7n),9n);return e^=t,t=(na(t,24n)^e^e<<16n)&Jt,e=na(e,37n),n=e<<64n|t,d}}const Xt=Ma(0xa187eb39cdcaed8f31c4b365b102e01en),za=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Xt()))),Ra=Array.from({length:8},()=>Xt()),Ba=Array.from({length:16},()=>Xt()),oa=Xt(),Qe="w",it="b",je="p",pa="n",Qt="b",zt="r",mt="q",Ge="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Kt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:d,piece:b,from:c,to:l,flags:o,captured:B,promotion:G}=e,_=Ve(c),E=Ve(l);this.color=d,this.piece=b,this.from=_,this.to=E,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=_+E,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const j in se)se[j]&o&&(this.flags+=kt[j]);B&&(this.captured=B),G&&(this.promotion=G,this.lan+=G)}isCapture(){return this.flags.indexOf(kt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(kt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(kt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(kt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(kt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(kt.BIG_PAWN)>-1}}const Je=-1,kt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},se={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ua={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Na={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},ja={...ua,...Na},ne={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},sa={b:[16,32,17,15],w:[-16,-32,-17,-15]},va={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Oa=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ua=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ha={p:1,n:2,b:4,r:8,q:16,k:32},Ga="pnbrqkPNBRQK",xa=[pa,Qt,zt,mt],Wa=7,Ka=6,Va=1,Ya=0,Vt={[Ge]:se.KSIDE_CASTLE,[mt]:se.QSIDE_CASTLE},bt={w:[{square:ne.a1,flag:se.QSIDE_CASTLE},{square:ne.h1,flag:se.KSIDE_CASTLE}],b:[{square:ne.a8,flag:se.QSIDE_CASTLE},{square:ne.h8,flag:se.KSIDE_CASTLE}]},Ja={b:Va,w:Ka},la="--";function $t(n){return n>>4}function Rt(n){return n&15}function $a(n){return"0123456789".indexOf(n)!==-1}function Ve(n){const t=Rt(n),e=$t(n);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function qt(n){return n===Qe?it:Qe}function Qa(n){const t=n.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const d=parseInt(t[4],10);if(isNaN(d)||d<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const b=t[0].split("/");if(b.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let l=0;l<b.length;l++){let o=0,B=!1;for(let G=0;G<b[l].length;G++)if($a(b[l][G])){if(B)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};o+=parseInt(b[l][G],10),B=!0}else{if(!/^[prnbqkPRNBQK]$/.test(b[l][G]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};o+=1,B=!1}if(o!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const c=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:l,regex:o}of c){if(!o.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${l} king`};if((t[0].match(o)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${l} kings`}}return Array.from(b[0]+b[7]).some(l=>l.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Xa(n,t){const e=n.from,d=n.to,b=n.piece;let c=0,l=0,o=0;for(let B=0,G=t.length;B<G;B++){const _=t[B].from,E=t[B].to,j=t[B].piece;b===j&&e!==_&&d===E&&(c++,$t(e)===$t(_)&&l++,Rt(e)===Rt(_)&&o++)}return c>0?l>0&&o>0?Ve(e):o>0?Ve(e).charAt(1):Ve(e).charAt(0):""}function ft(n,t,e,d,b,c=void 0,l=se.NORMAL){const o=$t(d);if(b===je&&(o===Wa||o===Ya))for(let B=0;B<xa.length;B++){const G=xa[B];n.push({color:t,from:e,to:d,piece:b,captured:c,promotion:G,flags:l|se.PROMOTION})}else n.push({color:t,from:e,to:d,piece:b,captured:c,flags:l})}function ya(n){let t=n.charAt(0);return t>="a"&&t<="h"?n.match(/[a-h]\d.*[a-h]\d/)?void 0:je:(t=t.toLowerCase(),t==="o"?Ge:t)}function da(n){return n.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ka{_board=new Array(128);_turn=Qe;_header={};_kings={w:Je,b:Je};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=ra,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Je,b:Je},this._turn=Qe,this._castling={w:0,b:0},this._epSquare=Je,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...ja},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:d=!1}={}){let b=t.split(/\s+/);if(b.length>=2&&b.length<6){const o=["-","-","0","1"];t=b.concat(o.slice(-(6-b.length))).join(" ")}if(b=t.split(/\s+/),!e){const{ok:o,error:B}=Qa(t);if(!o)throw new Error(B)}const c=b[0];let l=0;this.clear({preserveHeaders:d});for(let o=0;o<c.length;o++){const B=c.charAt(o);if(B==="/")l+=8;else if($a(B))l+=parseInt(B,10);else{const G=B<"a"?Qe:it;this._put({type:B.toLowerCase(),color:G},Ve(l)),l++}}this._turn=b[1],b[2].indexOf("K")>-1&&(this._castling.w|=se.KSIDE_CASTLE),b[2].indexOf("Q")>-1&&(this._castling.w|=se.QSIDE_CASTLE),b[2].indexOf("k")>-1&&(this._castling.b|=se.KSIDE_CASTLE),b[2].indexOf("q")>-1&&(this._castling.b|=se.QSIDE_CASTLE),this._epSquare=b[3]==="-"?Je:ne[b[3]],this._halfMoves=parseInt(b[4],10),this._moveNumber=parseInt(b[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,d="";for(let l=ne.a8;l<=ne.h1;l++){if(this._board[l]){e>0&&(d+=e,e=0);const{color:o,type:B}=this._board[l];d+=o===Qe?B.toUpperCase():B.toLowerCase()}else e++;l+1&136&&(e>0&&(d+=e),l!==ne.h1&&(d+="/"),e=0,l+=8)}let b="";this._castling[Qe]&se.KSIDE_CASTLE&&(b+="K"),this._castling[Qe]&se.QSIDE_CASTLE&&(b+="Q"),this._castling[it]&se.KSIDE_CASTLE&&(b+="k"),this._castling[it]&se.QSIDE_CASTLE&&(b+="q"),b=b||"-";let c="-";if(this._epSquare!==Je)if(t)c=Ve(this._epSquare);else{const l=this._epSquare+(this._turn===Qe?16:-16),o=[l+1,l-1];for(const B of o){if(B&136)continue;const G=this._turn;if(this._board[B]?.color===G&&this._board[B]?.type===je){this._makeMove({color:G,from:B,to:this._epSquare,piece:je,captured:je,flags:se.EP_CAPTURE});const _=!this._isKingAttacked(G);if(this._undoMove(),_){c=Ve(this._epSquare);break}}}}return[d,this._turn,b,c,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:d}=this._board[t],b={w:0,b:1}[e],c={p:0,n:1,b:2,r:3,q:4,k:5}[d];return za[b][c][t]}_epKey(){return this._epSquare===Je?0n:Ra[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Ba[t]}_computeHash(){let t=0n;for(let e=ne.a8;e<=ne.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=oa),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[ne[t]]}findPiece(t){const e=[];for(let d=ne.a8;d<=ne.h1;d++){if(d&136){d+=7;continue}!this._board[d]||this._board[d]?.color!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(Ve(d))}return e}put({type:t,color:e},d){return this._put({type:t,color:e},d)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},d){if(Ga.indexOf(t.toLowerCase())===-1||!(d in ne))return!1;const b=ne[d];if(t==Ge&&!(this._kings[e]==Je||this._kings[e]==b))return!1;const c=this._board[b];return c&&c.type===Ge&&(this._kings[c.color]=Je),this._set(b,{type:t,color:e}),t===Ge&&(this._kings[e]=b),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(ne[t]),e&&e.type===Ge&&(this._kings[e.color]=Je),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[ne.e1]?.type===Ge&&this._board[ne.e1]?.color===Qe,e=this._board[ne.e8]?.type===Ge&&this._board[ne.e8]?.color===it;(!t||this._board[ne.a1]?.type!==zt||this._board[ne.a1]?.color!==Qe)&&(this._castling.w&=-65),(!t||this._board[ne.h1]?.type!==zt||this._board[ne.h1]?.color!==Qe)&&(this._castling.w&=-33),(!e||this._board[ne.a8]?.type!==zt||this._board[ne.a8]?.color!==it)&&(this._castling.b&=-65),(!e||this._board[ne.h8]?.type!==zt||this._board[ne.h8]?.color!==it)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Je)return;const t=this._epSquare+(this._turn===Qe?-16:16),e=this._epSquare+(this._turn===Qe?16:-16),d=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==qt(this._turn)||this._board[e]?.type!==je){this._hash^=this._epKey(),this._epSquare=Je;return}const b=c=>!(c&136)&&this._board[c]?.color===this._turn&&this._board[c]?.type===je;d.some(b)||(this._hash^=this._epKey(),this._epSquare=Je)}_attacked(t,e,d){const b=[];for(let c=ne.a8;c<=ne.h1;c++){if(c&136){c+=7;continue}if(this._board[c]===void 0||this._board[c].color!==t)continue;const l=this._board[c],o=c-e;if(o===0)continue;const B=o+119;if(Oa[B]&Ha[l.type]){if(l.type===je){if(o>0&&l.color===Qe||o<=0&&l.color===it)if(d)b.push(Ve(c));else return!0;continue}if(l.type==="n"||l.type==="k")if(d){b.push(Ve(c));continue}else return!0;const G=Ua[B];let _=c+G,E=!1;for(;_!==e;){if(this._board[_]!=null){E=!0;break}_+=G}if(!E)if(d){b.push(Ve(c));continue}else return!0}}return d?b:!1}attackers(t,e){return e?this._attacked(e,ne[t],!0):this._attacked(this._turn,ne[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(qt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,ne[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let d=0,b=0;for(let c=ne.a8;c<=ne.h1;c++){if(b=(b+1)%2,c&136){c+=7;continue}const l=this._board[c];l&&(t[l.type]=l.type in t?t[l.type]+1:1,l.type===Qt&&e.push(b),d++)}if(d===2)return!0;if(d===3&&(t[Qt]===1||t[pa]===1))return!0;if(d===t[Qt]+2){let c=0;const l=e.length;for(let o=0;o<l;o++)c+=e[o];if(c===0||c===l)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:d=void 0}={}){const b=this._moves({square:e,piece:d});return t?b.map(c=>new Kt(this,c)):b.map(c=>this._moveToSan(c,b))}_moves({legal:t=!0,piece:e=void 0,square:d=void 0}={}){const b=d?d.toLowerCase():void 0,c=e?.toLowerCase(),l=[],o=this._turn,B=qt(o);let G=ne.a8,_=ne.h1,E=!1;if(b)if(b in ne)G=_=ne[b],E=!0;else return[];for(let N=G;N<=_;N++){if(N&136){N+=7;continue}if(!this._board[N]||this._board[N].color===B)continue;const{type:ge}=this._board[N];let ye;if(ge===je){if(c&&c!==ge)continue;ye=N+sa[o][0],this._board[ye]||(ft(l,o,N,ye,je),ye=N+sa[o][1],Ja[o]===$t(N)&&!this._board[ye]&&ft(l,o,N,ye,je,void 0,se.BIG_PAWN));for(let Ye=2;Ye<4;Ye++)ye=N+sa[o][Ye],!(ye&136)&&(this._board[ye]?.color===B?ft(l,o,N,ye,je,this._board[ye].type,se.CAPTURE):ye===this._epSquare&&ft(l,o,N,ye,je,je,se.EP_CAPTURE))}else{if(c&&c!==ge)continue;for(let Ye=0,tt=va[ge].length;Ye<tt;Ye++){const rt=va[ge][Ye];for(ye=N;ye+=rt,!(ye&136);){if(!this._board[ye])ft(l,o,N,ye,ge);else{if(this._board[ye].color===o)break;ft(l,o,N,ye,ge,this._board[ye].type,se.CAPTURE);break}if(ge===pa||ge===Ge)break}}}}if((c===void 0||c===Ge)&&(!E||_===this._kings[o])){if(this._castling[o]&se.KSIDE_CASTLE){const N=this._kings[o],ge=N+2;!this._board[N+1]&&!this._board[ge]&&!this._attacked(B,this._kings[o])&&!this._attacked(B,N+1)&&!this._attacked(B,ge)&&ft(l,o,this._kings[o],ge,Ge,void 0,se.KSIDE_CASTLE)}if(this._castling[o]&se.QSIDE_CASTLE){const N=this._kings[o],ge=N-2;!this._board[N-1]&&!this._board[N-2]&&!this._board[N-3]&&!this._attacked(B,this._kings[o])&&!this._attacked(B,N-1)&&!this._attacked(B,ge)&&ft(l,o,this._kings[o],ge,Ge,void 0,se.QSIDE_CASTLE)}}if(!t||this._kings[o]===-1)return l;const j=[];for(let N=0,ge=l.length;N<ge;N++)this._makeMove(l[N]),this._isKingAttacked(o)||j.push(l[N]),this._undoMove();return j}move(t,{strict:e=!1}={}){let d=null;if(typeof t=="string")d=this._moveFromSan(t,e);else if(t===null)d=this._moveFromSan(la,e);else if(typeof t=="object"){const c=this._moves();for(let l=0,o=c.length;l<o;l++)if(t.from===Ve(c[l].from)&&t.to===Ve(c[l].to)&&(!("promotion"in c[l])||t.promotion===c[l].promotion)){d=c[l];break}}if(!d)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&d.flags&se.NULL_MOVE)throw new Error("Null move not allowed when in check");const b=new Kt(this,d);return this._makeMove(d),this._incPositionCount(),b}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,d=qt(e);if(this._push(t),t.flags&se.NULL_MOVE){e===it&&this._moveNumber++,this._halfMoves++,this._turn=d,this._epSquare=Je;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&se.EP_CAPTURE&&(this._turn===it?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Ge){if(this._kings[e]=t.to,t.flags&se.KSIDE_CASTLE){const b=t.to-1,c=t.to+1;this._movePiece(c,b)}else if(t.flags&se.QSIDE_CASTLE){const b=t.to+1,c=t.to-2;this._movePiece(c,b)}this._castling[e]=0}if(this._castling[e]){for(let b=0,c=bt[e].length;b<c;b++)if(t.from===bt[e][b].square&&this._castling[e]&bt[e][b].flag){this._castling[e]^=bt[e][b].flag;break}}if(this._castling[d]){for(let b=0,c=bt[d].length;b<c;b++)if(t.to===bt[d][b].square&&this._castling[d]&bt[d][b].flag){this._castling[d]^=bt[d][b].flag;break}}if(this._hash^=this._castlingKey(),t.flags&se.BIG_PAWN){let b;e===it?b=t.to-16:b=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===je&&this._board[t.to-1]?.color===d||!(t.to+1&136)&&this._board[t.to+1]?.type===je&&this._board[t.to+1]?.color===d?(this._epSquare=b,this._hash^=this._epKey()):this._epSquare=Je}else this._epSquare=Je;t.piece===je?this._halfMoves=0:t.flags&(se.CAPTURE|se.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===it&&this._moveNumber++,this._turn=d,this._hash^=oa}undo(){const t=this._hash,e=this._undoMove();if(e){const d=new Kt(this,e);return this._decPositionCount(t),d}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=oa;const d=this._turn,b=qt(d);if(e.flags&se.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:d})),e.captured)if(e.flags&se.EP_CAPTURE){let c;d===it?c=e.to-16:c=e.to+16,this._set(c,{type:je,color:b})}else this._set(e.to,{type:e.captured,color:b});if(e.flags&(se.KSIDE_CASTLE|se.QSIDE_CASTLE)){let c,l;e.flags&se.KSIDE_CASTLE?(c=e.to+1,l=e.to-1):(c=e.to-2,l=e.to+1),this._movePiece(l,c)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const d=[];let b=!1;for(const j in this._header)this._header[j]&&d.push(`[${j} "${this._header[j]}"]`+t),b=!0;b&&this._history.length&&d.push(t);const c=j=>{const N=this._comments[this.fen()];if(typeof N<"u"){const ge=j.length>0?" ":"";j=`${j}${ge}{${N}}`}return j},l=[];for(;this._history.length>0;)l.push(this._undoMove());const o=[];let B="";for(l.length===0&&o.push(c(""));l.length>0;){B=c(B);const j=l.pop();if(!j)break;if(!this._history.length&&j.color==="b"){const N=`${this._moveNumber}. ...`;B=B?`${B} ${N}`:N}else j.color==="w"&&(B.length&&o.push(B),B=this._moveNumber+".");B=B+" "+this._moveToSan(j,this._moves({legal:!0})),this._makeMove(j)}if(B.length&&o.push(c(B)),o.push(this._header.Result||"*"),e===0)return d.join("")+o.join(" ");const G=function(){return d.length>0&&d[d.length-1]===" "?(d.pop(),!0):!1},_=function(j,N){for(const ge of N.split(" "))if(ge){if(j+ge.length>e){for(;G();)j--;d.push(t),j=0}d.push(ge),j+=ge.length,d.push(" "),j++}return G()&&j--,j};let E=0;for(let j=0;j<o.length;j++){if(E+o[j].length>e&&o[j].includes("{")){E=_(E,o[j]);continue}E+o[j].length>e&&j!==0?(d[d.length-1]===" "&&d.pop(),d.push(t),E=0):j!==0&&(d.push(" "),E++),d.push(o[j]),E+=o[j].length}return d.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ua[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ua[t]||null,!0):!1}getHeaders(){const t={};for(const[e,d]of Object.entries(this._header))d!==null&&(t[e]=d);return t}loadPgn(t,{strict:e=!1,newlineChar:d=`\r?
`}={}){d!==`\r?
`&&(t=t.replace(new RegExp(d,"g"),`
`));const b=qa(t);this.reset();const c=b.headers;let l="";for(const G in c)G.toLowerCase()==="fen"&&(l=c[G]),this.header(G,c[G]);if(!e)l&&this.load(l,{preserveHeaders:!0});else if(c.SetUp==="1"){if(!("FEN"in c))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(c.FEN,{preserveHeaders:!0})}let o=b.root;for(;o;){if(o.move){const G=this._moveFromSan(o.move,e);if(G==null)throw new Error(`Invalid move in PGN: ${o.move}`);this._makeMove(G),this._incPositionCount()}o.comment!==void 0&&(this._comments[this.fen()]=o.comment),o=o.variations[0]}const B=b.result;B&&Object.keys(this._header).length&&this._header.Result!==B&&this.setHeader("Result",B)}_moveToSan(t,e){let d="";if(t.flags&se.KSIDE_CASTLE)d="O-O";else if(t.flags&se.QSIDE_CASTLE)d="O-O-O";else{if(t.flags&se.NULL_MOVE)return la;if(t.piece!==je){const b=Xa(t,e);d+=t.piece.toUpperCase()+b}t.flags&(se.CAPTURE|se.EP_CAPTURE)&&(t.piece===je&&(d+=Ve(t.from)[0]),d+="x"),d+=Ve(t.to),t.promotion&&(d+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?d+="#":d+="+"),this._undoMove(),d}_moveFromSan(t,e=!1){let d=da(t);if(e||(d==="0-0"?d="O-O":d==="0-0-0"&&(d="O-O-O")),d==la)return{color:this._turn,from:0,to:0,piece:"k",flags:se.NULL_MOVE};let b=ya(d),c=this._moves({legal:!0,piece:b});for(let j=0,N=c.length;j<N;j++)if(d===da(this._moveToSan(c[j],c)))return c[j];if(e)return null;let l,o,B,G,_,E=!1;if(o=d.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),o?(l=o[1],B=o[2],G=o[3],_=o[4],B.length==1&&(E=!0)):(o=d.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),o&&(l=o[1],B=o[2],G=o[3],_=o[4],B.length==1&&(E=!0))),b=ya(d),c=this._moves({legal:!0,piece:l||b}),!G)return null;for(let j=0,N=c.length;j<N;j++)if(B){if((!l||l.toLowerCase()==c[j].piece)&&ne[B]==c[j].from&&ne[G]==c[j].to&&(!_||_.toLowerCase()==c[j].promotion))return c[j];if(E){const ge=Ve(c[j].from);if((!l||l.toLowerCase()==c[j].piece)&&ne[G]==c[j].to&&(B==ge[0]||B==ge[1])&&(!_||_.toLowerCase()==c[j].promotion))return c[j]}}else if(d===da(this._moveToSan(c[j],c)).replace("x",""))return c[j];return null}ascii(){let t=`   +------------------------+
`;for(let e=ne.a8;e<=ne.h1;e++){if(Rt(e)===0&&(t+=" "+"87654321"[$t(e)]+" |"),this._board[e]){const d=this._board[e].type,c=this._board[e].color===Qe?d.toUpperCase():d.toLowerCase();t+=" "+c+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let d=0;const b=this._turn;for(let c=0,l=e.length;c<l;c++)this._makeMove(e[c]),this._isKingAttacked(b)||(t-1>0?d+=this.perft(t-1):d++),this._undoMove();return d}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let d=ne.a8;d<=ne.h1;d++)this._board[d]==null?e.push(null):e.push({square:Ve(d),type:this._board[d].type,color:this._board[d].color}),d+1&136&&(t.push(e),e=[],d+=8);return t}squareColor(t){if(t in ne){const e=ne[t];return($t(e)+Rt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],d=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const b=e.pop();if(!b)break;t?d.push(new Kt(this,b)):d.push(this._moveToSan(b,this._moves())),this._makeMove(b)}return d}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},d=b=>{b in this._comments&&(e[b]=this._comments[b])};for(;this._history.length>0;)t.push(this._undoMove());for(d(this.fen());;){const b=t.pop();if(!b)break;this._makeMove(b),d(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const b of[Ge,mt])e[b]!==void 0&&(e[b]?this._castling[t]|=Vt[b]:this._castling[t]&=~Vt[b]);this._updateCastlingRights();const d=this.getCastlingRights(t);return(e[Ge]===void 0||e[Ge]===d[Ge])&&(e[mt]===void 0||e[mt]===d[mt])}getCastlingRights(t){return{[Ge]:(this._castling[t]&Vt[Ge])!==0,[mt]:(this._castling[t]&Vt[mt])!==0}}moveNumber(){return this._moveNumber}}async function ai(n,t={}){const e=t.currentUser||{},d=t.userRole||e?.role||"employee";let b="chat",c=[],l=null,o=[],B=[],G=null,_=null,E=!1,j=null,N=null;n.innerHTML=`
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
  `,Za(),await nt(),Me();const ge=n.querySelector("#tab-nav-chat"),ye=n.querySelector("#tab-nav-lounge"),Ye=n.querySelector("#bonding-chat-main-wrap"),tt=n.querySelector("#bonding-lounge-main-wrap");ge?.addEventListener("click",()=>{b="chat",ge.classList.add("active"),ye.classList.remove("active"),Ye.style.display="grid",tt.style.display="none",Me()}),ye?.addEventListener("click",async()=>{b="lounge_games",ye.classList.add("active"),ge.classList.remove("active"),Ye.style.display="none",tt.style.display="block",await P()}),n.querySelector("#btn-top-new-chat")?.addEventListener("click",X),n.querySelector("#btn-top-new-group")?.addEventListener("click",Z),n.querySelector("#btn-top-challenge")?.addEventListener("click",()=>z());const rt=n.querySelector("#bonding-search-input");rt&&rt.addEventListener("input",u=>{const m=u.target.value.toLowerCase().trim();n.querySelectorAll(".bonding-channel-item").forEach(r=>{const h=r.textContent.toLowerCase();r.style.display=h.includes(m)?"flex":"none"})}),ut(),new MutationObserver((u,m)=>{document.body.contains(n)||(_&&clearInterval(_),N&&clearInterval(N),m.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function nt(){try{const[u,m]=await Promise.all([Re("/bonding/channels").catch(()=>[]),Re("/bonding/colleagues").catch(()=>[])]);c=u,o=m,!l&&c.length>0&&(l=c.find(s=>s.name.includes("Lounge"))||c[0]),Oe(),l&&await Fe(l._id)}catch(u){console.error("Failed to load bonding data",u)}}async function Fe(u,m=!1){if(u)try{B=await Re(`/bonding/channels/${u}/messages`),m?i():C()}catch(s){console.error("Failed to load messages",s)}}let ot=0;function ut(){_&&clearInterval(_),_=setInterval(async()=>{try{if(!document.body.contains(n)){clearInterval(_);return}if(ot++,ot%2===0){const u=await Re("/bonding/channels").catch(()=>null);u&&JSON.stringify(u.map(m=>m._id+m.lastMessage?.sentAt))!==JSON.stringify(c.map(m=>m._id+m.lastMessage?.sentAt))&&(c=u,Oe())}b==="chat"&&l?await Fe(l._id,!0):b==="lounge_games"&&await P(!0)}catch{}},3e3)}function Oe(){const u=n.querySelector("#bonding-group-list"),m=n.querySelector("#bonding-direct-list");if(!u||!m)return;const s=c.filter(h=>h.type==="group"),r=c.filter(h=>h.type==="direct");if(s.length===0)u.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const h=e?._id||e?.id,F=d==="superadmin"||e?.role==="superadmin";u.innerHTML=s.map(A=>{const V=l&&l._id===A._id,L=A.createdBy&&A.createdBy.userId&&String(A.createdBy.userId)===String(h)||F;return`
          <div class="bonding-channel-item ${V?"active":""}" data-channel-id="${A._id}">
            <div class="bonding-channel-icon">${A.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(A.name)}</div>
              <div class="bonding-channel-preview">${v(A.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${L?`
              <button class="bonding-channel-del-btn" data-channel-id="${A._id}" title="Delete Group (Creator only)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            `:`
              <button class="bonding-channel-leave-btn" data-channel-id="${A._id}" title="Leave Group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            `}
          </div>
        `}).join("")}r.length===0?m.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':m.innerHTML=r.map(h=>{const F=l&&l._id===h._id,A=h.displayName||h.name||"Colleague",V=A.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${F?"active":""}" data-channel-id="${h._id}">
            <div class="bonding-channel-avatar">${V}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(A)}</div>
              <div class="bonding-channel-preview">${v(h.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${h._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),ct()}function ct(){const u=n.querySelectorAll(".bonding-channel-item");u.forEach(m=>{m.onclick=async s=>{if(s.target.closest(".bonding-channel-del-btn")||s.target.closest(".bonding-channel-leave-btn"))return;const r=m.dataset.channelId,h=c.find(F=>F._id===r);h&&(l=h,u.forEach(F=>F.classList.remove("active")),m.classList.add("active"),Me(),await Fe(h._id))}}),n.querySelectorAll(".bonding-channel-leave-btn").forEach(m=>{m.onclick=async s=>{s.stopPropagation();const r=m.dataset.channelId,F=c.find(A=>A._id===r)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${F}"?`))try{m.disabled=!0,await Ce(`/bonding/channels/${r}/leave`,{}),y(`You left "${F}"`,"info"),c=c.filter(A=>A._id!==r),l&&l._id===r&&(l=c.find(A=>A.type==="group")||c[0]||null,Me(),l&&await Fe(l._id)),Oe()}catch(A){y(A.message||"Failed to leave group","error"),m.disabled=!1}}}),n.querySelectorAll(".bonding-channel-del-btn").forEach(m=>{m.onclick=async s=>{s.stopPropagation();const r=m.dataset.channelId,h=c.find(V=>V._id===r),F=h&&h.type==="direct",A=F?"this 1-on-1 chat":`the group "${h?.name||""}"`;if(confirm(`Are you sure you want to delete ${A}? All messages will be permanently removed.`))try{m.disabled=!0,await et(`/bonding/channels/${r}`),y(F?"1-on-1 chat deleted":"Group deleted","success"),c=c.filter(V=>V._id!==r),l&&l._id===r&&(l=c[0]||null,Me(),l&&await Fe(l._id)),Oe()}catch(V){y(V.message||"Failed to delete conversation","error"),m.disabled=!1}}}),n.querySelector("#btn-create-group")?.addEventListener("click",Z),n.querySelector("#btn-new-direct-chat")?.addEventListener("click",X)}function Me(){const u=n.querySelector("#bonding-chat-panel");if(!u)return;if(!l){u.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const m=v(l.displayName||l.name),s=(l.members||[]).length,r=l.type==="group",h=e?._id||e?.id,F=r?null:(l.members||[]).find(L=>L.userId?.toString()!==h?.toString()),A=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(h),V=d==="superadmin"||e?.role==="superadmin",oe=A||V;u.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${r?l.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${m}</div>
            <div class="bonding-chat-sub">
              ${r?`<span>${s} members</span> · <span>${v(l.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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
    `,st(F),ve(F),p(),a()}function ze(){if(!B||B.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const u=e?._id||e?.id;return B.map(m=>{const s=m.sender&&m.sender.userId&&u&&m.sender.userId.toString()===u.toString();if(m.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${m._id}">
            <span>ℹ️</span> <span>${v(m.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${m._id}" title="Delete Message">&times;</button>
          </div>
        `;if(m.type==="challenge"&&m.challengeData){const A=m.challengeData;if(A.status==="declined"||A.status==="cancelled")return"";const V=A.gameTitle||"Game Challenge",oe=A.gameType||"chess",L=oe==="chess"?"♟️":oe==="ludo"?"🎲":"❌",M=A.gameState?.invitationId,Y=A.targetUserId?.toString(),_e=m.sender?.userId?.toString(),me=u&&Y===u.toString(),le=u&&_e===u.toString();return`
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
                  ${A.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':A.status==="active"||A.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${v(A.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${A.status==="pending"&&me?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${M}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${M}" data-action="decline">
                        Decline
                      </button>
                    `:A.status==="pending"&&le?`
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
        `}const r=v(m.sender?.name||"Teammate"),h=Q(m.createdAt),F=ce(m);return`
        <div class="bonding-msg-row ${s?"self":"other"}" data-msg-id="${m._id}">
          <div class="bonding-msg-avatar" title="${r}">${r.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${r}</span>
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
      `}).join("")}function ce(u){return`
      <div class="bonding-reactions-row">
        ${(u.reactions||[]).map(r=>{const h=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(r.users||[]).some(A=>A.toString()===h?.toString())?"active":""}" data-msg-id="${u._id}" data-emoji="${r.emoji}">
          <span>${r.emoji}</span> <span>${r.users?r.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${u._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function st(u){const m=n.querySelector("#btn-chat-challenge");m&&(m.onclick=()=>{u?z(null,u.userId||u._id):z()});const s=n.querySelector("#btn-manage-members");s&&(s.onclick=H);const r=n.querySelector("#btn-delete-group");r&&(r.onclick=R);const h=n.querySelector("#btn-leave-group");h&&(h.onclick=x);const F=n.querySelector("#btn-delete-direct");F&&(F.onclick=async()=>{if(l&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{F.disabled=!0,await et(`/bonding/channels/${l._id}`),y("1-on-1 chat deleted successfully","success");const V=l._id;c=c.filter(oe=>oe._id!==V),l=c[0]||null,Oe(),Me(),l&&await Fe(l._id)}catch(V){y(V.message||"Could not delete 1-on-1 chat","error"),F.disabled=!1}});const A=n.querySelector("#btn-clear-chat");A&&(A.onclick=async()=>{if(l&&confirm("Are you sure you want to clear all messages in this conversation?"))try{A.disabled=!0,await et(`/bonding/channels/${l._id}/messages`),y("Chat messages cleared","success"),B=[],C()}catch(V){y(V.message||"Could not clear chat messages","error")}finally{A.disabled=!1}})}function ve(u){const m=n.querySelector("#bonding-message-input"),s=n.querySelector("#btn-send-message"),r=n.querySelector("#btn-quick-emoji"),h=n.querySelector("#btn-input-challenge");m&&m.addEventListener("keydown",F=>{F.key==="Enter"&&!F.shiftKey&&(F.preventDefault(),$())}),s&&(s.onclick=$),h&&(h.onclick=()=>{u?z(null,u.userId||u._id):z()}),r&&(r.onclick=()=>{if(!m)return;const F=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],A=F[Math.floor(Math.random()*F.length)];m.value+=(m.value?" ":"")+A,m.focus()})}function p(){n.querySelectorAll(".btn-respond-invite").forEach(r=>{r.onclick=async()=>{const h=r.dataset.inviteId,F=r.dataset.action;await D(h,F)}}),n.querySelectorAll(".btn-launch-match-from-card").forEach(r=>{r.onclick=async()=>{const h=r.dataset.inviteId;try{r.disabled=!0;const F=await Re("/bonding/invitations"),A=(F.incoming||[]).concat(F.sent||[]).find(V=>V._id===h);A&&A.matchId?O(A.matchId):y("Match has not started yet or has expired","warning")}catch(F){y(F.message||"Could not load match","error")}finally{r.disabled=!1}}}),n.querySelectorAll(".bonding-msg-del-btn").forEach(r=>{r.onclick=async h=>{h.stopPropagation();const F=r.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{r.disabled=!0,await et(`/bonding/messages/${F}`),B=B.filter(A=>A._id!==F),i(),y("Message deleted","success")}catch(A){y(A.message||"Failed to delete message","error"),r.disabled=!1}}}),n.querySelectorAll(".bonding-rxn-tag").forEach(r=>{r.onclick=async()=>{const h=r.dataset.msgId,F=r.dataset.emoji;await I(h,F)}}),n.querySelectorAll(".bonding-add-rxn-btn").forEach(r=>{r.onclick=h=>{const F=r.dataset.msgId;te(h.currentTarget,async A=>{await I(F,A)})}})}async function $(){const u=n.querySelector("#bonding-message-input");if(!u||!l||E)return;const m=u.value.trim();if(m)try{E=!0,u.value="";const s=await Ce(`/bonding/channels/${l._id}/messages`,{content:m,type:"text"});B.push(s),C(),a()}catch(s){y(s.message||"Failed to send message","error")}finally{E=!1,u.focus()}}async function I(u,m){try{const s=await Ce(`/bonding/messages/${u}/react`,{emoji:m}),r=B.find(h=>h._id===u);r&&(r.reactions=s,i())}catch(s){y(s.message||"Failed to react","error")}}function a(){const u=n.querySelector("#bonding-messages-feed");u&&(u.scrollTop=u.scrollHeight)}function i(){const u=n.querySelector("#bonding-messages-feed");if(!u)return;const m=u.scrollHeight-u.scrollTop<=u.clientHeight+80;u.innerHTML=ze(),p(),m&&a()}function C(){const u=n.querySelector("#bonding-messages-feed");u&&(u.innerHTML=ze(),p())}async function P(u=!1){const m=n.querySelector("#bonding-lounge-main-wrap");if(m){u||(m.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const s=await Re("/bonding/games/overview");G=s;const r=s.myStats||{},h=s.availableGames||[],F=s.incomingChallenges||[],A=s.sentChallenges||[],V=s.activeMatches||[],oe=s.recentMatches||[],L=e?._id||e?.id;m.innerHTML=`
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
                <span class="badge blue">${F.length+A.length} Total</span>
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
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${A.length})</h5>
              ${A.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${A.map(M=>`
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
      `,S()}catch(s){m.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${v(s.message)}</p>
        </div>
      `}}}function S(){n.querySelectorAll(".btn-challenge-game").forEach(m=>{m.onclick=()=>{const s=m.dataset.gameId;z(s)}}),n.querySelectorAll(".btn-respond-invite").forEach(m=>{m.onclick=async()=>{const s=m.dataset.inviteId,r=m.dataset.action;await D(s,r),await P()}}),n.querySelectorAll(".btn-resume-match").forEach(m=>{m.onclick=()=>{const s=m.dataset.matchId;O(s)}}),n.querySelectorAll(".btn-recent-rematch").forEach(m=>{m.onclick=async()=>{const s=m.dataset.matchId;try{m.disabled=!0;const r=await Ce(`/bonding/matches/${s}/action`,{action:"rematch"});r.match&&(y("Rematch created! Opening arena ⚔️","success"),O(r.match._id))}catch(r){y(r.message||"Could not start rematch","error")}finally{m.disabled=!1}}}),n.querySelectorAll(".btn-delete-match").forEach(m=>{m.onclick=async s=>{s.stopPropagation();const r=m.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{m.disabled=!0,await et(`/bonding/matches/${r}`),y("Match deleted successfully","success"),await P()}catch(h){y(h.message||"Failed to delete match","error")}finally{m.disabled=!1}}});const u=n.querySelector("#btn-clear-matches");u&&(u.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{u.disabled=!0,await et("/bonding/matches?filter=completed"),y("Completed matches history cleared","success"),await P()}catch(m){y(m.message||"Failed to clear matches","error")}finally{u.disabled=!1}})}function z(u=null,m=null){const s=n.querySelector("#bonding-modals-root"),r=e?._id||e?.id,h=new Set(["employee","admin","superadmin"]),F=o.filter(me=>!me.isSelf&&me._id.toString()!==r?.toString()&&h.has(me.role));let A=u||"chess",V=m?m.toString():null,oe=2,L=V?[V]:[],M="none";function Y(){const me=F.find(re=>re._id.toString()===V),le=A==="ludo",ue=oe-1,W=L.length===ue;s.innerHTML=`
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
              ${A==="chess"?`
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
                  <div><strong>Game:</strong> ${le?`🎲 Ludo (${oe} Players · 4 Pawns per base)`:A==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${le?`
                    <div><strong>Opponents:</strong> ${L.length>0?L.map(re=>{const be=F.find(de=>de._id.toString()===re);return be?`<strong>${v(be.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+ue+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${me?`<strong>${v(me.name)}</strong> (${v(me.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${A==="chess"?`<div><strong>Time Control:</strong> ${M==="none"?"Untimed":M}</div>`:""}
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
      `,_e()}function _e(){s.querySelector(".bonding-modal-close").onclick=()=>{s.innerHTML=""},s.querySelector("#btn-cancel-challenge-flow").onclick=()=>{s.innerHTML=""},s.querySelectorAll(".game-pill-btn").forEach(ue=>{ue.onclick=()=>{A=ue.dataset.game,Y()}}),s.querySelectorAll(".ludo-mode-btn").forEach(ue=>{ue.onclick=()=>{oe=Number(ue.dataset.count),L=L.slice(0,oe-1),Y()}});const me=s.querySelector("#flow-emp-search");me&&(me.oninput=ue=>{const W=ue.target.value.toLowerCase().trim();s.querySelectorAll(".eligible-emp-item").forEach(re=>{const be=re.textContent.toLowerCase();re.style.display=be.includes(W)?"flex":"none"})}),s.querySelectorAll(".eligible-emp-item").forEach(ue=>{ue.onclick=()=>{const W=ue.dataset.userId;if(A==="ludo"){const re=oe-1;L.includes(W)?L=L.filter(be=>be!==W):L.length<re?L.push(W):L[re-1]=W}else V=W;Y()}}),s.querySelectorAll('input[name="timerMode"]').forEach(ue=>{ue.onchange=W=>{M=W.target.value,Y()}});const le=s.querySelector("#btn-submit-challenge-flow");le&&(le.onclick=async()=>{if(A==="ludo"){const ue=oe-1;if(L.length<ue){y(`Please select ${ue} colleague(s) to play with`,"warning");return}try{le.disabled=!0,le.textContent="Launching Match...";const W=await Ce("/bonding/matches/instant-ludo",{playerCount:oe,targetUserIds:L});s.innerHTML="",y(`Ludo match started (${oe} Players)! 🎲`,"success"),W&&W._id&&O(W._id)}catch(W){y(W.message||"Failed to start Ludo match","error"),le.disabled=!1,le.textContent=`Start ${oe}P Ludo Match 🎲`}return}if(!V){y("Please select an employee to challenge","warning");return}try{le.disabled=!0,le.textContent="Sending Challenge...",await Ce("/bonding/invitations",{gameType:A,targetUserId:V,matchSettings:{timerMode:M},channelId:null}),y("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),s.innerHTML="",await loadChannels();const ue=c.find(W=>W.type==="direct"&&W.members?.some(re=>(re.userId||re._id)?.toString()===V));ue?selectChannel(ue):l&&await Fe(l._id),b==="lounge_games"&&await P()}catch(ue){y(ue.message||"Could not send challenge","error"),le.disabled=!1,le.textContent="Send Challenge 🚀"}})}Y()}async function D(u,m){if(!(!u||!m))try{const s=await Yt(`/bonding/invitations/${u}/respond`,{action:m});m==="accept"?(y("Challenge accepted! Entering match arena ⚔️","success"),s.match&&O(s.match._id)):m==="decline"?(y("Challenge declined","info"),n.querySelectorAll(`[data-invite-id="${u}"]`).forEach(r=>{const h=r.closest(".lounge-invite-item")||r.closest(".bonding-msg-row");h&&h.remove()})):m==="cancel"&&(y("Challenge cancelled","info"),n.querySelectorAll(`[data-invite-id="${u}"]`).forEach(r=>{const h=r.closest(".lounge-invite-item")||r.closest(".bonding-msg-row");h&&h.remove()})),l&&await Fe(l._id),b==="lounge_games"&&await P()}catch(s){y(s.message||"Action failed","error")}}async function O(u){if(!u)return;j=u,N&&clearInterval(N);const m=n.querySelector("#bonding-modals-root");let s=null,r=null,h=[],F="",A=null,V=!1;function oe(W){return W?JSON.stringify({status:W.status,turn:W.currentTurnUserId?.toString(),turnColor:W.turn,movesCount:W.moves?.length,dice:W.gameState?.dice,rolled:W.gameState?.rolled,lastRoll:W.gameState?.lastRoll,lastRollColor:W.gameState?.lastRollColor,lastRollBy:W.gameState?.lastRollBy,lastActionText:W.gameState?.lastActionText,tokens:W.gameState?.tokens,board:W.gameState?.board,grid:W.gameState?.grid,fen:W.gameState?.fen,draw:W.drawOfferedBy?.toString()}):""}async function L(){try{return s=await Re(`/bonding/matches/${u}`),s}catch(W){return y(W.message||"Could not load match","error"),M(),null}}if(s=await L(),!s)return;F=oe(s);function M(){N&&clearInterval(N),A&&clearTimeout(A),V=!1,j=null,m.innerHTML="",b==="lounge_games"&&P(!0),l&&Fe(l._id,!0)}N=setInterval(async()=>{if(!j||j!==u){clearInterval(N);return}try{const W=await Re(`/bonding/matches/${u}`);if(!W)return;const re=oe(W);re!==F&&(F=re,s=W,Y())}catch{}},1e3);function Y(){if(!s)return;const W=e?._id||e?.id,re=W&&s.player1.userId.toString()===W.toString(),be=re?s.player1:s.player2,de=re?s.player2:s.player1,he=W&&s.currentTurnUserId&&s.currentTurnUserId.toString()===W.toString(),Te=s.status!=="active";m.innerHTML=`
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
                      ${s.gameState.players.map(Be=>{const We=Be.userId&&Be.userId.toString()===W?.toString(),Le={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Be.color]||"⚪",pe=(s.gameState?.turnColor||s.turn)===Be.color;return`
                          <span class="player-tag ${We?"self":"opp"} ${pe?"turn-active":""}">
                            ${Le} <strong>${v(Be.name)}</strong> ${We?"(You)":""}
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
              <div class="arena-turn-banner ${Te?"ended":he?"my-turn":"opp-turn"}">
                ${Te?`<span>🏁 Finished (${v(s.winningReason||s.status)})</span>`:he?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${v(de.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${s.gameType==="ludo"?he?s.gameState?.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":s.gameType==="tictactoe"?he?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":he?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${Te?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${s.drawOfferedBy&&s.drawOfferedBy.toString()!==W?.toString()&&!Te?`
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
            ${Te?`
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
      `,ue(he,re,be)}function _e(W){const re=s.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",be=new ka(re),de=W?s.player1.assignedRole==="white":s.player2.assignedRole==="white",he={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},Te=de?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Be=de?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let We='<div class="chess-board-grid">';for(const De of Be)for(const Ue of Te){const Ne=`${Ue}${De}`,Pe=be.get(Ne),Ie=(Ue.charCodeAt(0)-97+De)%2!==0,Ee=r===Ne,ke=h.includes(Ne),fe=Pe?Pe.color==="w"?he[Pe.type.toUpperCase()]:he[Pe.type]:"";We+=`
            <div class="chess-sq ${Ie?"light":"dark"} ${Ee?"selected":""} ${ke?"legal-dot":""}" data-square="${Ne}">
              ${fe?`<span class="chess-piece ${Pe.color==="w"?"white-piece":"black-piece"}">${fe}</span>`:""}
            </div>
          `}We+="</div>";const pe=(s.moves||[]).map(De=>`
        <span class="chess-move-token">${De.moveNum}. ${De.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${We}
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
      `}function le(W,re,be){const de=s.gameState||{},he=de.activeColors||["red","green"],Te=de.players||[{...s.player1,color:"red",assignedRole:"red",isBot:!1},{...s.player2,color:"green",assignedRole:"green",isBot:!1}],Be=de.tokens||{},We=T=>{const ie=Be[T]||(T==="red"?de.p1Tokens:T==="green"?de.p2Tokens:[])||[];return Array.from({length:4},(xe,Se)=>ie[Se]||{id:Se,step:-1})},Le=We("red"),pe=We("green"),De=We("yellow"),Ue=We("blue"),Ne=e?._id||e?.id,Ie=(Te.find(T=>T.userId&&T.userId.toString()===Ne?.toString())||Te[0])?.color||(W?"red":"green"),Ee=de.turnColor||s.turn||"red",ke=Ie===Ee&&s.status==="active",fe=!!de.rolled,q=de.dice,U=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],g=[[7,1],[7,2],[7,3],[7,4],[7,5]],Ae=[[1,7],[2,7],[3,7],[4,7],[5,7]],we=[[7,13],[7,12],[7,11],[7,10],[7,9]],lt=[[13,7],[12,7],[11,7],[10,7],[9,7]],K=[0,8,13,21,26,34,39,47];function ht(T,ie){return ie<0?null:ie>=56?T==="red"?[7,6]:T==="green"?[6,7]:T==="yellow"?[7,8]:[8,7]:T==="red"?ie<=50?U[ie]:g[ie-51]:T==="green"?ie<=50?U[(13+ie)%52]:Ae[ie-51]:T==="yellow"?ie<=50?U[(26+ie)%52]:we[ie-51]:ie<=50?U[(39+ie)%52]:lt[ie-51]}function qe(T,ie){return T!==Ie||!ke||!fe||!q||s.status!=="active"?!1:ie.step===-1?q===6:ie.step>=0&&ie.step+q<=56}const at={},Ct=(T,ie)=>{ie.forEach(xe=>{if(xe.step>=0&&xe.step<56){const Se=ht(T,xe.step);if(Se){const f=Se[0]+","+Se[1];(at[f]=at[f]||[]).push({color:T,id:xe.id,step:xe.step,movable:qe(T,xe)})}}})};he.includes("red")&&Ct("red",Le),he.includes("green")&&Ct("green",pe),he.includes("yellow")&&Ct("yellow",De),he.includes("blue")&&Ct("blue",Ue);const Xe={};U.forEach(([T,ie],xe)=>{Xe[T+","+ie]=xe});const Et={};g.forEach(([T,ie],xe)=>{Et[T+","+ie]=xe+1});const Tt={};Ae.forEach(([T,ie],xe)=>{Tt[T+","+ie]=xe+1});const ae={};we.forEach(([T,ie],xe)=>{ae[T+","+ie]=xe+1});const Bt={};lt.forEach(([T,ie],xe)=>{Bt[T+","+ie]=xe+1});const Pt=[];for(let T=0;T<15;T++)for(let ie=0;ie<15;ie++){if(T<6&&ie<6||T<6&&ie>8||T>8&&ie<6||T>8&&ie>8||T>=6&&T<=8&&ie>=6&&ie<=8)continue;const xe=T+","+ie,Se=Xe[xe],f=Se!==void 0&&K.includes(Se),w=T===6&&ie===1,k=T===1&&ie===8,J=T===8&&ie===13,ee=T===13&&ie===6,$e=Et[xe],pt=Tt[xe],At=ae[xe],Sa=Bt[xe];let dt="ludo-cell";w?dt+=" cell-red-start":k?dt+=" cell-green-start":J?dt+=" cell-yellow-start":ee?dt+=" cell-blue-start":$e?dt+=" cell-red-stretch":pt?dt+=" cell-green-stretch":At?dt+=" cell-yellow-stretch":Sa?dt+=" cell-blue-stretch":f&&(dt+=" cell-safe-star");const Ca=at[xe]||[];Pt.push(`
            <div class="${dt}" style="grid-row:${T+1};grid-column:${ie+1}" data-pos="${xe}">
              ${f?'<span class="cell-star-glyph">⭐</span>':""}
              ${w||k||J||ee?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Ca.map(yt=>`
                <div class="ludo-token token-${yt.color} ${yt.movable?"movable":""}" data-token-id="${yt.id}" data-color="${yt.color}" title="${yt.color.toUpperCase()} Pawn ${yt.id+1}">
                  <span>${yt.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function Zt(T){const ie=Math.max(1,Math.min(6,Number(T)||1)),xe={1:[[30,30,7.5,"#ef4444"]],2:[[16,16,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],3:[[16,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],4:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],5:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],6:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,30,5.5,"#1e293b"],[44,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]]},f=(xe[ie]||xe[6]).map(([w,k,J,ee])=>`
          <g>
            <circle cx="${w}" cy="${k+1.2}" r="${J}" fill="#94a3b8" opacity="0.5"/>
            <circle cx="${w}" cy="${k}" r="${J}" fill="${ee}"/>
            <circle cx="${w-J*.3}" cy="${k-J*.3}" r="${J*.35}" fill="#ffffff" opacity="0.6"/>
          </g>
        `).join("");return`
          <svg viewBox="0 0 60 60" width="52" height="52" class="ludo-dice-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dice face ${ie}">
            <g class="die-pips-layer">
              ${f}
            </g>
          </svg>
        `}function vt(T,ie,xe,Se,f){const w=`${T}-yard`;if(!xe)return`
            <div class="ludo-yard ${w}">
              <div class="yard-box decorative">
                <div class="yard-title">${ie} (Inactive)</div>
              </div>
            </div>
          `;const k=f.filter(J=>J.step===56).length;return`
          <div class="ludo-yard ${w} ${Ee===T?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${ie}</span>
                ${k>0?`<span class="yard-home-badge" title="${k} of 4 pawns reached Home!">👑 ${k}/4 Home</span>`:""}
                ${Se?`<small class="yard-player-lbl">${v(Se.name)}${Se.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${f.map((J,ee)=>`
                  <div class="yard-token-slot ${J.step===56?"slot-home":""}">
                    ${J.step===-1?`
                      <div class="ludo-token token-${T} ${qe(T,J)?"movable":""}" data-token-id="${J.id}" data-color="${T}" title="${T.toUpperCase()} Pawn ${J.id+1}">
                        <span>${J.id+1}</span>
                      </div>
                    `:J.step===56?`
                      <div class="ludo-token token-reached-home token-${T}" title="${T.toUpperCase()} Pawn ${J.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${J.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${ee+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Nt=Te.find(T=>T.color==="red"),jt=Te.find(T=>T.color==="green"),ea=Te.find(T=>T.color==="yellow"),Ot=Te.find(T=>T.color==="blue"),Ft=Te.find(T=>T.color===Ee)||(Ee==="red"?Nt:jt),_t=Ft?v(Ft.name):Ee.toUpperCase(),Lt={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Ee]||"🔴",gt=q||de.lastRoll||6,xt=ke&&!fe&&s.status==="active",Ht=We(Ie).filter(T=>qe(Ie,T));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${vt("red","🔴 Red Base",he.includes("red"),Nt,Le)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${vt("green","🟢 Green Base",he.includes("green"),jt,pe)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${vt("blue","🔵 Blue Base",he.includes("blue"),Ot,Ue)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${vt("yellow","🟡 Yellow Base",he.includes("yellow"),ea,De)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${Le.filter(T=>T.step===56).map(T=>`<div class="home-tri-pawn red" title="Red Pawn ${T.id+1} Home! 👑">👑${T.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${pe.filter(T=>T.step===56).map(T=>`<div class="home-tri-pawn green" title="Green Pawn ${T.id+1} Home! 👑">👑${T.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${De.filter(T=>T.step===56).map(T=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${T.id+1} Home! 👑">👑${T.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${Ue.filter(T=>T.step===56).map(T=>`<div class="home-tri-pawn blue" title="Blue Pawn ${T.id+1} Home! 👑">👑${T.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...Le.filter(T=>T.step===56).map(T=>({col:"red",id:T.id})),...pe.filter(T=>T.step===56).map(T=>({col:"green",id:T.id})),...De.filter(T=>T.step===56).map(T=>({col:"yellow",id:T.id})),...Ue.filter(T=>T.step===56).map(T=>({col:"blue",id:T.id}))].map(T=>`
                    <div class="tok-home-champion ${T.col}" title="${T.col.toUpperCase()} Pawn ${T.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${T.id+1}</span>
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
                class="ludo-3d-dice ${xt?"clickable pulse-roll":""} ${fe?"just-rolled":""} border-${Ee}"
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
                <span class="ludo-turn-dot ${Ee}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${_t}</strong> (${Ee.toUpperCase()})
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
      `}function ue(W,re,be){m.querySelector("#btn-close-arena").onclick=M;const de=m.querySelector("#btn-arena-resign");de&&(de.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{de.disabled=!0,await Ce(`/bonding/matches/${u}/action`,{action:"resign"}),await L(),Y()}catch(pe){y(pe.message||"Resign failed","error"),de.disabled=!1}});const he=m.querySelector("#btn-arena-draw");he&&(he.onclick=async()=>{try{await Ce(`/bonding/matches/${u}/action`,{action:"offer_draw"}),y("Draw offer sent to opponent","info"),await L(),Y()}catch(pe){y(pe.message||"Draw offer failed","error")}});const Te=m.querySelector("#btn-confirm-accept-draw");Te&&(Te.onclick=async()=>{try{await Ce(`/bonding/matches/${u}/action`,{action:"accept_draw"}),y("Draw agreed!","info"),await L(),Y()}catch(pe){y(pe.message,"error")}});const Be=m.querySelector("#btn-confirm-decline-draw");Be&&(Be.onclick=async()=>{try{await Ce(`/bonding/matches/${u}/action`,{action:"decline_draw"}),await L(),Y()}catch(pe){y(pe.message,"error")}}),[m.querySelector("#btn-arena-delete-match"),m.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(pe=>{pe.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{pe.disabled=!0,await et(`/bonding/matches/${u}`),y("Match deleted","success"),M(),b==="lounge_games"&&await P()}catch(De){y(De.message||"Failed to delete match","error"),pe.disabled=!1}}});const Le=m.querySelector("#btn-arena-rematch-action");if(Le&&(Le.onclick=async()=>{try{Le.disabled=!0,Le.textContent="Creating Rematch...";const pe=await Ce(`/bonding/matches/${u}/action`,{action:"rematch"});pe.match&&(y("Rematch created! New match live ⚔️","success"),N&&clearInterval(N),O(pe.match._id))}catch(pe){y(pe.message||"Rematch failed","error"),Le.disabled=!1,Le.textContent="🔄 Request Rematch"}}),s.gameType==="chess"&&W&&s.status==="active"){const pe=s.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",De=new ka(pe),Ue=be.assignedRole==="white"?"w":"b";m.querySelectorAll(".chess-sq").forEach(Ne=>{Ne.onclick=async()=>{const Pe=Ne.dataset.square;if(r){if(r===Pe){r=null,h=[],Y();return}if(h.includes(Pe)){const Ee=De.get(r);let ke;Ee&&Ee.type==="p"&&(Pe.endsWith("8")||Pe.endsWith("1"))&&(ke=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const fe={from:r,to:Pe,promotion:ke?ke.toLowerCase():void 0};r=null,h=[],s=await Ce(`/bonding/matches/${u}/move`,{move:fe}),Y()}catch(fe){y(fe.message||"Illegal chess move","error"),r=null,h=[],Y()}return}}const Ie=De.get(Pe);Ie&&Ie.color===Ue?(r=Pe,h=De.moves({square:Pe,verbose:!0}).map(ke=>ke.to),Y()):(r=null,h=[],Y())}})}if(s.gameType==="tictactoe"&&W&&s.status==="active"&&m.querySelectorAll(".ttt-cell.empty").forEach(pe=>{pe.onclick=async()=>{const De=pe.dataset.cellIdx;try{pe.style.opacity="0.5",s=await Ce(`/bonding/matches/${u}/move`,{cellIndex:Number(De)}),Y()}catch(Ue){y(Ue.message||"Invalid move","error")}}}),s.gameType==="ludo"&&s.status==="active"){const pe=s.gameState||{},De=!!pe.rolled,Ue=pe.turnColor||s.turn||"red",Ne=s.player1.userId.toString()===myId?.toString()?s.player1.assignedRole||"red":s.player2.userId.toString()===myId?.toString()?s.player2.assignedRole||"green":(pe.players||[]).find(ke=>ke.userId?.toString()===myId?.toString())?.color||"red",Pe=W&&Ue===Ne,Ie=m.querySelector("#btn-interactive-ludo-dice"),Ee=m.querySelector("#btn-interactive-ludo-dice-badge");if(Pe&&!De){const ke=async()=>{if(!(Ie&&Ie.dataset.rolling==="true")){Ie&&(Ie.dataset.rolling="true",Ie.classList.add("rolling")),Ee&&(Ee.disabled=!0);try{const fe=await Ce(`/bonding/matches/${u}/move`,{action:"roll"});s=fe,F=oe(fe),Y()}catch(fe){y(fe.message||"Failed to roll","error"),Ie&&(Ie.classList.remove("rolling"),delete Ie.dataset.rolling),Ee&&(Ee.disabled=!1)}}};Ie&&(Ie.onclick=ke,Ie.onkeydown=fe=>{(fe.key==="Enter"||fe.key===" ")&&(fe.preventDefault(),ke())}),Ee&&(Ee.onclick=ke)}if(Pe&&De){const fe=(pe.tokens||{})[Ne]||[],q=pe.dice||pe.lastRoll||0,U=fe.filter(g=>g.step===-1&&q===6||g.step>=0&&g.step+q<=56);if(U.length===1&&!V){V=!0;const g=U[0];A&&clearTimeout(A),A=setTimeout(async()=>{try{const Ae=await Ce(`/bonding/matches/${u}/move`,{action:"move",tokenId:Number(g.id)});s=Ae,F=oe(Ae),V=!1,Y()}catch(Ae){V=!1,y(Ae.message||"Auto-move failed","error")}},400)}}Pe&&De&&m.querySelectorAll(".ludo-token.movable").forEach(ke=>{ke.onclick=async fe=>{fe.stopPropagation();const q=ke.dataset.tokenId;try{ke.style.opacity="0.5";const U=await Ce(`/bonding/matches/${u}/move`,{action:"move",tokenId:Number(q)});s=U,F=oe(U),Y()}catch(U){y(U.message||"Invalid token move","error"),ke.style.opacity="1"}}})}}Y()}function H(){if(!l||l.type==="direct")return;const u=n.querySelector("#bonding-modals-root"),m=L=>L==="employee"||L==="admin"||L==="superadmin",s=l.members||[],r=new Set(s.map(L=>L.userId?.toString())),h=o.filter(L=>m(L.role)&&!r.has(L._id.toString()));u.innerHTML=`
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""};const F=u.querySelector("#btn-modal-delete-group");F&&(F.onclick=()=>{u.innerHTML="",R()});const A=u.querySelector("#btn-modal-leave-group");A&&(A.onclick=()=>{u.innerHTML="",x()}),u.querySelectorAll(".btn-leave-group-action").forEach(L=>{L.onclick=()=>{u.innerHTML="",x()}});const V=u.querySelector("#btn-submit-add-member");V&&(V.onclick=async()=>{const M=u.querySelector("#sel-add-colleague").value;if(!M){y("Please select a colleague to add","warning");return}try{V.disabled=!0,V.textContent="Adding...";const Y=await Yt(`/bonding/channels/${l._id}/members`,{action:"add",userIds:[M]});y("Colleague added to group! 🎉","success"),l=Y.channel,u.innerHTML="",await Fe(l._id),Me()}catch(Y){y(Y.message||"Failed to add member","error"),V.disabled=!1,V.textContent="Add to Group"}}),u.querySelectorAll(".btn-remove-member").forEach(L=>{L.onclick=async()=>{const M=L.dataset.userId,Y=L.dataset.name;if(confirm(`Are you sure you want to remove ${Y} from this group?`))try{L.disabled=!0;const _e=await Yt(`/bonding/channels/${l._id}/members`,{action:"remove",userId:M});y(`${Y} removed from group`,"info"),l=_e.channel,u.innerHTML="",await Fe(l._id),Me()}catch(_e){y(_e.message||"Failed to remove member","error"),L.disabled=!1}}})}async function x(){if(!l||l.type==="direct")return;const u=l.name;if(confirm(`Are you sure you want to leave the group "${u}"?`))try{await Ce(`/bonding/channels/${l._id}/leave`,{}),y(`You left "${u}"`,"info"),c=await Re("/bonding/channels").catch(()=>[]),l=c.find(s=>s.type==="group")||c[0]||null,Oe(),Me(),l&&await Fe(l._id)}catch(s){y(s.message||"Failed to leave group","error")}}async function R(){if(!l||l.type==="direct")return;const u=l.name;if(confirm(`Are you sure you want to delete the group "${u}"?

All messages in this lounge will be deleted.`))try{await et(`/bonding/channels/${l._id}`),y(`Group "${u}" deleted successfully`,"success"),c=await Re("/bonding/channels").catch(()=>[]),l=c.find(s=>s.type==="group")||c[0]||null,Oe(),Me(),l&&await Fe(l._id)}catch(s){y(s.message||"Failed to delete group","error")}}function X(){const u=n.querySelector("#bonding-modals-root"),m=h=>h==="employee"||h==="admin"||h==="superadmin",s=o.filter(h=>!h.isSelf&&m(h.role));u.innerHTML=`
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelectorAll(".bonding-user-pick-item").forEach(h=>{h.onclick=async()=>{const F=h.dataset.userId;try{const A=await Ce("/bonding/channels",{type:"direct",targetUserId:F});u.innerHTML="",c=await Re("/bonding/channels"),l=c.find(V=>V._id===A._id)||A,Oe(),Me(),await Fe(l._id)}catch(A){y(A.message||"Failed to open personal chat","error")}}})}function Z(){const u=n.querySelector("#bonding-modals-root"),m=A=>A==="employee"||A==="admin"||A==="superadmin",s=o.filter(A=>!A.isSelf&&m(A.role));u.innerHTML=`
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
                ${s.map(A=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${A._id}" />
                    <span>${v(A.name)} (${v(A.role==="superadmin"?"Superadmin":A.role==="admin"?"Admin":"Employee")})</span>
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
    `,u.querySelector(".bonding-modal-close").onclick=()=>{u.innerHTML=""},u.querySelector("#btn-cancel-create-grp").onclick=()=>{u.innerHTML=""};let r="👥";const h=u.querySelectorAll(".avatar-opt");h.forEach(A=>{A.onclick=()=>{h.forEach(V=>V.classList.remove("active")),A.classList.add("active"),r=A.textContent.trim()}});const F=u.querySelector("#btn-confirm-create-grp");F.onclick=async()=>{const A=u.querySelector("#new-group-name"),V=u.querySelector("#new-group-desc"),oe=A.value.trim();if(!oe){y("Please enter a group name","warning"),A.focus();return}const L=u.querySelectorAll(".new-group-member-chk:checked"),M=Array.from(L).map(Y=>Y.value);try{F.disabled=!0,F.textContent="Creating...";const Y=await Ce("/bonding/channels",{type:"group",name:oe,description:V.value.trim(),avatar:r,memberIds:M});y(`Group "${oe}" created! 🎉`,"success"),u.innerHTML="",c=await Re("/bonding/channels"),l=c.find(_e=>_e._id===Y._id)||Y,Oe(),Me(),await Fe(l._id)}catch(Y){y(Y.message||"Failed to create group","error"),F.disabled=!1,F.textContent="Create Group 🎉"}}}function te(u,m){const s=document.querySelector(".bonding-emoji-popup");s&&s.remove();const r=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],h=document.createElement("div");h.className="bonding-emoji-popup",h.innerHTML=r.map(V=>`<button class="emoji-opt-btn" data-e="${V}">${V}</button>`).join("");const F=u.getBoundingClientRect();h.style.top=`${F.bottom+window.scrollY+6}px`,h.style.left=`${F.left+window.scrollX}px`,document.body.appendChild(h),h.querySelectorAll(".emoji-opt-btn").forEach(V=>{V.onclick=oe=>{oe.stopPropagation(),m(V.dataset.e),h.remove()}});const A=V=>{h.contains(V.target)||(h.remove(),document.removeEventListener("click",A))};setTimeout(()=>document.addEventListener("click",A),10)}function Q(u){if(!u)return"";try{return new Date(u).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Za(){const n=document.getElementById("ci360-bonding-styles");n&&n.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
  `,document.head.appendChild(t)}function wa(n){if(!n)return"";const t=v(n),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return t.replace(e,d=>`<a href="${d}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${d} ↗</a>`)}const ca=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],wt=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Mt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ii(n,t={}){const{userRole:e="employee",currentUser:d=null,initialTicketId:b=null}=t,c=e==="superadmin"||e==="admin";if(e==="client"||d&&d.role==="client"){n.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let l=[],o={},B=[],G=[],_={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},E=null,j="comments",N=!1;n.innerHTML=`
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
  `,await Promise.all([tt(),Ye(),rt(),St()]),nt(),ot(),Fe(),Me(),b&&st(b);const ge=setInterval(()=>{if(!document.contains(n)){clearInterval(ge);return}!(n.querySelector(".dragging")||n.querySelector("input:focus")||n.querySelector("textarea:focus"))&&!E&&ce()},12e3),ye=()=>{document.contains(n)&&!E&&ce()};window.addEventListener("focus",ye);async function Ye(){try{const a=new URLSearchParams;_.search&&a.set("search",_.search),_.priority!=="all"&&a.set("priority",_.priority),_.category!=="all"&&a.set("category",_.category),_.assigneeId!=="all"&&a.set("assigneeId",_.assigneeId),_.jobId&&_.jobId!=="all"&&a.set("jobId",_.jobId),_.reporterId&&_.reporterId!=="all"&&a.set("reporterId",_.reporterId),_.scope==="created"&&a.set("reporterId",d?._id||d?.id),_.scope==="assigned"&&a.set("assigneeId",d?._id||d?.id),_.myIssuesOnly&&a.set("myIssuesOnly","true");const i=await Re("/tickets?"+a.toString());l=Array.isArray(i)?i:[]}catch(a){y(a.message||"Failed to load tickets",!0),l=[]}}async function tt(){try{o=await Re("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function rt(){try{let a;try{a=await Re("/tickets/staff")}catch{a=await Re("/users")}B=(a||[]).filter(i=>i.active!==!1&&i.role!=="client")}catch(a){console.warn("Could not fetch employees:",a),B=[]}}async function St(){try{const a=await Re("/jobs?limit=250");G=Array.isArray(a)?a:a?.jobs||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function nt(){const a=n.querySelector("#ci-360-stats-root");a&&(a.innerHTML=`
      <div class="ci-360-stat-card ${_.status==="all"&&!_.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="ci-360-stat-val">${o.total||0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${_.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${o.toDo||0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${_.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${o.content??(o.inProgress||0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${_.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${o.design||0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${_.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${o.underReview||0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${_.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
        <span class="ci-360-stat-val">${o.readyToLeave??(o.resolved||o.closed||0)}</span>
        <span class="ci-360-stat-lbl">Ready to Leave</span>
      </div>
      <div class="ci-360-stat-card critical" data-stat-filter="critical">
        <span class="ci-360-stat-val">${o.critical||0}</span>
        <span class="ci-360-stat-lbl">Critical 🔴</span>
      </div>
      <div class="ci-360-stat-card overdue" data-stat-filter="overdue">
        <span class="ci-360-stat-val">${o.overdue||0}</span>
        <span class="ci-360-stat-lbl">Overdue ⚠️</span>
      </div>
    `,a.querySelectorAll(".ci-360-stat-card").forEach(i=>{i.onclick=async()=>{const C=i.dataset.statFilter;C==="all"?(_.status="all",_.priority="all"):C==="critical"?(_.priority="Critical",_.status="all"):(_.status=C,_.priority="all"),await ce()}}))}function Fe(){const a=n.querySelector("#ci-360-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${B.map(C=>`
          <option value="${C._id}" ${_.assigneeId===C._id.toString()?"selected":""}>
            ${v(C.name)} (${v(C.role)})
          </option>
        `).join("")}
      `);const i=n.querySelector("#ci-360-filter-job");i&&(i.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${G.map(C=>`
          <option value="${C._id}" ${_.jobId===C._id.toString()?"selected":""}>
            📁 ${v(C.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function ot(){const a=n.querySelector("#ci-360-board-columns-root");if(!a)return;const i={};ca.forEach(C=>{i[C.key]=[]}),l.forEach(C=>{let P=C.status||"To Do";P==="In Progress"?P="Content":P==="Resolved"?P="Under Review":P==="Closed"&&(P="Ready to Leave"),i[P]||(i[P]=[]),i[P].push(C)}),a.innerHTML=ca.map(C=>{const P=i[C.key]||[];return`
        <div class="ci-360-board-column" data-status="${C.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${v(C.label)}</span>
              <span class="ci-360-col-badge">${P.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${C.key}">
            ${P.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:P.map(S=>ut(S)).join("")}
          </div>
        </div>
      `}).join(""),Oe(),ct()}function ut(a){const i=wt.find(Z=>Z.key===a.category)||wt[0],C=Mt.find(Z=>Z.key===a.priority)||Mt[2],P=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",S=(a.subtasks||[]).filter(Z=>Z.completed).length,z=(a.subtasks||[]).length,D=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],O=d?._id||d?.id,H=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(O)||a.userId&&String(a.userId)===String(O),x=e==="superadmin"||d?.role==="superadmin",R=H||x;let X="";if(D.length===0)X='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const Z=D.slice(0,3),te=D.length-3;X=`
        <div class="ci-360-avatar-group">
          ${Z.map(Q=>`
            <div class="ci-360-avatar" title="Assignee: ${v(Q.name||"Member")} (${v(Q.role||"")})">
              ${(Q.avatar||Q.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${te>0?`
            <div class="ci-360-avatar extra-count" title="${te} more assignees: ${v(D.slice(3).map(Q=>Q.name).join(", "))}">
              +${te}
            </div>
          `:""}
        </div>
      `}return`
      <div class="ci-360-card" draggable="true" data-ticket-id="${a._id}">
        <div class="ci-360-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="ci-360-category-pill ${i.slug}">
              ${i.icon} ${i.label}
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
          ${R?`
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
            <span class="ci-360-pri-icon" title="Priority: ${C.label}">${C.icon}</span>
            <span class="ci-360-ticket-id">${v(a.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${z>0?`
              <span class="ci-360-subtask-badge" title="${S} of ${z} subtasks completed">
                ☑ ${S}/${z}
              </span>
            `:""}
            ${X}
          </div>
        </div>
      </div>
    `}function Oe(){const a=n.querySelectorAll(".ci-360-card"),i=n.querySelectorAll(".ci-360-board-column");a.forEach(C=>{C.ondragstart=P=>{P.dataTransfer.setData("text/plain",C.dataset.ticketId),C.classList.add("dragging")},C.ondragend=()=>{C.classList.remove("dragging")}}),i.forEach(C=>{C.ondragover=P=>{P.preventDefault(),C.classList.add("drag-over")},C.ondragleave=()=>{C.classList.remove("drag-over")},C.ondrop=async P=>{P.preventDefault(),C.classList.remove("drag-over");const S=P.dataTransfer.getData("text/plain"),z=C.dataset.status;if(!S||!z)return;const D=l.find(R=>R._id.toString()===S);if(!D||D.status===z)return;const O=D.status,H=D.assignees?[...D.assignees]:[],x=D.assignee?{...D.assignee}:null;if(D.status=z,z==="Under Review"){const R={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};D.assignee=R,D.assignees=[R]}ot();try{const R=await Ze(`/tickets/${S}/status`,{status:z}),X=z==="Under Review"?`Moved ${R.ticketId} to Under Review (Default assigned to John)`:`Moved ${R.ticketId} to ${z}`;y(X,!1),await ce()}catch(R){y(R.message||"Status update failed",!0),D.status=O,D.assignees=H,D.assignee=x,await ce()}}})}function ct(){n.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async i=>{i.stopPropagation(),i.preventDefault();const C=a.dataset.ticketId,P=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${P}?`)){a.disabled=!0;try{await et(`/tickets/${C}`),y(`Ticket ${P} deleted`,!1),await ce()}catch(S){y(S.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),n.querySelectorAll(".ci-360-card").forEach(a=>{a.onclick=i=>{if(i.target.tagName==="A"||i.target.closest(".btn-delete-card-ticket"))return;const C=a.dataset.ticketId;st(C)}})}function Me(){const a=n.querySelector("#btn-ci-360-refresh");a&&(a.onclick=async()=>{await ce(),y("Board updated",!1)});const i=n.querySelector("#btn-ci-360-create-ticket");i&&(i.onclick=()=>{I()});const C=n.querySelector("#ci-360-search-input");let P=null;C&&(C.oninput=Q=>{clearTimeout(P),P=setTimeout(async()=>{_.search=Q.target.value.trim(),ze(),await ce()},300)});const S=n.querySelector("#ci-360-filter-priority");S&&(S.onchange=async Q=>{_.priority=Q.target.value,ze(),await ce()});const z=n.querySelector("#ci-360-filter-category");z&&(z.onchange=async Q=>{_.category=Q.target.value,ze(),await ce()});const D=n.querySelector("#ci-360-filter-job");D&&(D.onchange=async Q=>{_.jobId=Q.target.value,ze(),await ce()});const O=n.querySelector("#ci-360-filter-assignee");O&&(O.onchange=async Q=>{_.assigneeId=Q.target.value,ze(),await ce()});const H=n.querySelector("#ci-360-pill-my-issues");H&&(H.onclick=async()=>{_.myIssuesOnly=!_.myIssuesOnly,H.classList.toggle("active",_.myIssuesOnly),ze(),await ce()});const x=n.querySelector("#ci-360-pill-scope-all"),R=n.querySelector("#ci-360-pill-scope-assigned"),X=n.querySelector("#ci-360-pill-scope-created"),Z=async Q=>{_.scope=Q,x&&x.classList.toggle("active",Q==="all"),R&&R.classList.toggle("active",Q==="assigned"),X&&X.classList.toggle("active",Q==="created"),ze(),await ce()};x&&(x.onclick=()=>Z("all")),R&&(R.onclick=()=>Z("assigned")),X&&(X.onclick=()=>Z("created"));const te=n.querySelector("#ci-360-clear-filters");te&&(te.onclick=async()=>{_={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},C&&(C.value=""),S&&(S.value="all"),z&&(z.value="all");const Q=n.querySelector("#ci-360-filter-job");Q&&(Q.value="all"),O&&(O.value="all"),H&&H.classList.remove("active"),x&&x.classList.add("active"),R&&R.classList.remove("active"),X&&X.classList.remove("active"),ze(),await ce()})}function ze(){const a=n.querySelector("#ci-360-clear-filters");if(!a)return;const i=_.search||_.priority!=="all"||_.category!=="all"||_.jobId&&_.jobId!=="all"||_.assigneeId!=="all"||_.myIssuesOnly||_.scope&&_.scope!=="all";a.style.display=i?"inline":"none"}async function ce(){await Ye(),ot()}async function st(a){const i=n.querySelector("#ci-360-modals-root");if(i){i.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{E=await Re(`/tickets/${a}`)}catch(C){y(C.message||"Could not load ticket",!0),i.innerHTML="";return}ve()}}function ve(){const a=n.querySelector("#ci-360-modals-root");if(!a||!E)return;const i=E,C=wt.find(r=>r.key===i.category)||wt[0];Mt.find(r=>r.key===i.priority)||Mt[2];const P=i.subtasks||[],S=P.filter(r=>r.completed).length,z=P.length>0?Math.round(S/P.length*100):0,D=i.attachments||[],O=i.comments||[],H=(i.history||[]).slice().reverse(),x=i.workLogs||[],R=i.linkedTickets||[],X=d?._id||d?.id,Z=i.reporter&&i.reporter.userId&&String(i.reporter.userId)===String(X)||i.userId&&String(i.userId)===String(X),te=e==="superadmin"||d?.role==="superadmin",Q=Z||te,u=Array.isArray(i.assignees)&&i.assignees.length>0?i.assignees:i.assignee&&i.assignee.userId?[i.assignee]:[];u.some(r=>r&&r.userId&&String(r.userId)===String(X));const m=i.jobId?._id?i.jobId._id.toString():i.jobId?i.jobId.toString():"",s=i.jobTitle||i.jobId&&i.jobId.title||"";a.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${C.slug}">${C.icon} ${C.label}</span>
              <span class="ci-360-ticket-id" style="font-size:13px;color:#38bdf8;">${v(i.ticketId)}</span>
            </div>
            <button class="ci-360-modal-close" id="btn-close-ci-360-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="ci-360-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="ci-360-detail-main">
              <!-- Issue Title Header -->
              <div class="ci-360-issue-header-wrap">
                <input type="text" class="ci-360-editable-title" id="inp-detail-title" value="${v(i.title)}" title="Click to edit title" />
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
                  <textarea id="inp-detail-desc" class="ci-360-desc-editor" rows="6">${v(i.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-ci-360-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="ci-360-desc-wrap" id="view-detail-desc">
                    ${i.description?wa(i.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>🔗 Reference &amp; External Links (${(i.links||[]).length+(i.linkUrl&&!(i.links||[]).some(r=>r.url===i.linkUrl)?1:0)})</span>
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

                ${i.links&&i.links.length>0||i.linkUrl?`
                  <div class="ci-360-links-list" style="display:flex;flex-direction:column;gap:8px;">
                    ${i.linkUrl&&!(i.links||[]).some(r=>r.url===i.linkUrl)?`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(i.linkUrl)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(i.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${v(i.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(i.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    `:""}
                    ${(i.links||[]).map(r=>`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(r.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(r.title||r.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${r.title?`<span style="word-break:break-all;">${v(r.url)}</span> · `:""}Added by ${v(r.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${v(r.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(r.url)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
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
                  <span>Attachments (${D.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${D.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${D.map(r=>{const h=r.type&&r.type.includes("video")||r.name&&r.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||r.url&&r.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="ci-360-att-card ${h?"is-video":""}" style="${h?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${h?"16px":"13px"};">${h?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${v(r.name)}">
                                  ${v(r.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${ga(r.size)} ${h?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${h?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${r.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${r.url}" download="${v(r.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${r.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${h?`
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
                  <span>Subtasks (${S}/${P.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${z}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${z}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${P.map(r=>`
                    <div class="ci-360-subtask-item">
                      <div class="ci-360-subtask-left">
                        <input type="checkbox" class="ci-360-subtask-cb cb-subtask-toggle" data-subtask-id="${r.id}" ${r.completed?"checked":""} />
                        <span class="ci-360-subtask-title ${r.completed?"done":""}">${v(r.title)}</span>
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
                  <span>Linked Work Items (${R.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${R.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${R.map(r=>`
                      <div class="ci-360-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${v(r.relationship)}</span>
                          <span class="ci-360-ticket-id" style="color:#38bdf8;">${v(r.ticketId)}</span>
                          <span class="ci-360-linked-title" style="font-size:12.5px;">${v(r.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="ci-360-col-badge">${v(r.status||"Open")}</span>
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
                      ${G.map(r=>`
                        <option value="${r._id}" ${m===r._id.toString()?"selected":""}>
                          📁 ${v(r.title||"Untitled Job")}
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
                    ${O.map(r=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(r.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${v(r.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${v(r.userRole)})</span></span>
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
                    ${H.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:H.map(r=>`
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(r.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${v(r.userName)}</span>
                            <span class="ci-360-comment-time">${ta(r.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="ci-360-history-field">${v(r.field)}</strong>:
                            ${r.from?`<span style="text-decoration:line-through;color:#ef4444;">${v(r.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${v(r.to)}</span>
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
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${i.loggedHours||0} hrs</strong></span>
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
                    `:x.map(r=>`
                      <div class="ci-360-worklog-item">
                        <div class="ci-360-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(r.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-worklog-main">
                          <div class="ci-360-worklog-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${v(r.userName)} logged <strong style="color:#38bdf8;">${v(r.timeSpent)}</strong></span>
                            <span class="ci-360-comment-time">${ta(r.loggedAt)}</span>
                          </div>
                          ${r.description?`<div class="ci-360-comment-body" style="font-size:12px;">${v(r.description)}</div>`:""}
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
                  ${ca.map(r=>{let h=i.status||"To Do";return h==="In Progress"?h="Content":h==="Resolved"?h="Under Review":h==="Closed"&&(h="Ready to Leave"),`
                      <option value="${r.key}" ${h===r.key?"selected":""}>
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
                    <option value="${r.key}" ${i.priority===r.key?"selected":""}>
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
                      <span class="ci-360-assignee-chip-name" title="${v(r.name)}">${v(r.name)}</span>
                      ${`
                        <button type="button" class="ci-360-assignee-chip-remove btn-remove-assignee" data-user-id="${r.userId}" title="Remove ${v(r.name)}">&times;</button>
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
                    ${B.map(r=>{const h=u.some(F=>F&&F.userId&&String(F.userId)===String(r._id));return`
                        <label class="ci-360-emp-check-item ${h?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${r._id}" ${h?"checked":""} />
                          <div class="ci-360-avatar" style="width:18px;height:18px;font-size:9px;">${(r.name||"U").slice(0,1).toUpperCase()}</div>
                          <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                            ${v(r.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(r.role)})</span>
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
                    ${(i.reporter?.name||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${v(i.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${v(i.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Category</span>
                <select id="sel-detail-category" class="ci-360-select-field">
                  ${wt.map(r=>`
                    <option value="${r.key}" ${i.category===r.key?"selected":""}>
                      ${r.icon} ${r.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="ci-360-date-field" value="${i.dueDate?new Date(i.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="ci-360-select-field">
                  <option value="">None (Workspace General)</option>
                  ${G.map(r=>`
                    <option value="${r._id}" ${m===r._id.toString()?"selected":""}>
                      📁 ${v(r.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${i.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" class="ci-360-est-input" value="${i.estimatedHours||0}" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(i.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(i.updatedAt).toLocaleString()}</div>
                ${i.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(i.resolvedAt).toLocaleString()}</div>`:""}
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
    `,p()}function p(){const a=n.querySelector("#ci-360-modals-root");if(!a||!E)return;const i=a.querySelector("#btn-close-ci-360-modal");i&&(i.onclick=$);const C=a.querySelector("#ci-360-detail-backdrop");C&&(C.onclick=q=>{q.target===C&&$()});const P=a.querySelector("#inp-detail-title");P&&(P.onchange=async()=>{const q=P.value.trim();if(q)try{E=await Ze(`/tickets/${E._id}`,{title:q}),await ce()}catch(U){y(U.message||"Failed to update title",!0)}});const S=a.querySelector("#btn-toggle-desc-edit");S&&(S.onclick=()=>{N=!N,ve()});const z=a.querySelector("#btn-cancel-desc");z&&(z.onclick=()=>{N=!1,ve()});const D=a.querySelector("#btn-save-desc");D&&(D.onclick=async()=>{const q=a.querySelector("#inp-detail-desc")?.value;try{E=await Ze(`/tickets/${E._id}`,{description:q}),N=!1,ve(),await ce(),y("Description saved",!1)}catch(U){y(U.message||"Failed to save description",!0)}});const O=a.querySelector("#sel-detail-status");O&&(O.onchange=async q=>{try{const U=await Ze(`/tickets/${E._id}/status`,{status:q.target.value});E=U,ve(),await tt(),nt(),await ce();const g=U.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${U.status}`;y(g,!1)}catch(U){y(U.message||"Status change failed",!0)}});const H=a.querySelector("#sel-detail-priority");H&&(H.onchange=async q=>{try{E=await Ze(`/tickets/${E._id}`,{priority:q.target.value}),ve(),await ce()}catch(U){y(U.message,!0)}});const x=a.querySelector("#btn-toggle-assignee-picker"),R=a.querySelector("#ci-360-detail-assignee-box"),X=a.querySelector("#btn-close-detail-assignee-box"),Z=a.querySelector("#btn-save-detail-assignees");x&&R&&(x.onclick=()=>{const q=R.style.display==="none";R.style.display=q?"block":"none"}),X&&R&&(X.onclick=()=>{R.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(q=>{q.onchange=()=>{q.closest(".ci-360-emp-check-item")?.classList.toggle("selected",q.checked)}}),Z&&(Z.onclick=async()=>{const q=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(U=>U.value);try{Z.disabled=!0,E=await Ze(`/tickets/${E._id}`,{assigneeIds:q}),ve(),await ce(),y("Assignees updated!",!1)}catch(U){y(U.message,!0),Z.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(q=>{q.onclick=async()=>{const U=q.dataset.userId,Ae=(Array.isArray(E.assignees)&&E.assignees.length>0?E.assignees:E.assignee?.userId?[E.assignee]:[]).filter(we=>we&&we.userId&&String(we.userId)!==String(U)).map(we=>String(we.userId));try{E=await Ze(`/tickets/${E._id}`,{assigneeIds:Ae}),ve(),await ce(),y("Assignee removed",!1)}catch(we){y(we.message,!0)}}});const te=a.querySelector("#sel-detail-category");te&&(te.onchange=async q=>{try{E=await Ze(`/tickets/${E._id}`,{category:q.target.value}),ve(),await ce()}catch(U){y(U.message,!0)}});const Q=a.querySelector("#inp-detail-duedate");Q&&(Q.onchange=async q=>{try{E=await Ze(`/tickets/${E._id}`,{dueDate:q.target.value||null}),ve(),await ce()}catch(U){y(U.message,!0)}});const u=a.querySelector("#sel-detail-job");u&&(u.onchange=async q=>{try{E=await Ze(`/tickets/${E._id}`,{jobId:q.target.value||null}),ve(),await ce(),y(q.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(U){y(U.message,!0)}});const m=a.querySelector("#btn-toggle-job-link"),s=a.querySelector("#ci-360-job-link-box");m&&s&&(m.onclick=()=>{s.style.display=s.style.display==="none"?"block":"none"});const r=a.querySelector("#btn-cancel-job-link");r&&s&&(r.onclick=()=>{s.style.display="none"});const h=a.querySelector("#btn-save-job-link");h&&(h.onclick=async()=>{const q=a.querySelector("#inp-modal-job-select")?.value||null;try{E=await Ze(`/tickets/${E._id}`,{jobId:q}),ve(),await ce(),y(q?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(U){y(U.message,!0)}});const F=a.querySelector("#btn-unlink-job");F&&(F.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{E=await Ze(`/tickets/${E._id}`,{jobId:null}),ve(),await ce(),y("Job unlinked",!1)}catch(q){y(q.message,!0)}});const A=a.querySelector("#inp-detail-esthours");A&&(A.onchange=async q=>{try{E=await Ze(`/tickets/${E._id}`,{estimatedHours:Number(q.target.value)||0})}catch(U){y(U.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(q=>{q.onchange=async()=>{const U=q.dataset.subtaskId;try{E=await Ze(`/tickets/${E._id}/subtasks/${U}`,{completed:q.checked}),ve(),await ce()}catch(g){y(g.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(q=>{q.onclick=async()=>{const U=q.dataset.subtaskId;try{E=await et(`/tickets/${E._id}/subtasks/${U}`),ve(),await ce()}catch(g){y(g.message,!0)}}});const V=a.querySelector("#inp-new-subtask"),oe=a.querySelector("#btn-add-subtask"),L=async()=>{const q=V?.value.trim();if(q)try{E=await Ce(`/tickets/${E._id}/subtasks`,{title:q}),ve(),await ce()}catch(U){y(U.message,!0)}};oe&&(oe.onclick=L),V&&(V.onkeydown=q=>{q.key==="Enter"&&(q.preventDefault(),L())});const M=a.querySelector("#btn-toggle-add-link"),Y=a.querySelector("#add-link-form"),_e=a.querySelector("#btn-cancel-new-link"),me=a.querySelector("#btn-save-new-link"),le=a.querySelector("#inp-new-link-url"),ue=a.querySelector("#inp-new-link-title");M&&Y&&(M.onclick=()=>{const q=Y.style.display==="none";Y.style.display=q?"block":"none",q&&le&&le.focus()}),_e&&Y&&(_e.onclick=()=>{Y.style.display="none",le&&(le.value=""),ue&&(ue.value="")}),me&&le&&(me.onclick=async()=>{const q=le.value.trim(),U=ue?.value.trim()||"";if(!q){y("Please enter a valid URL link",!0);return}try{me.disabled=!0,me.textContent="Saving...",E=await Ce(`/tickets/${E._id}/links`,{url:q,title:U}),ve(),await ce(),y("Reference link added! 🔗",!1)}catch(g){y(g.message||"Failed to save link",!0),me.disabled=!1,me.textContent="Save Link 🔗"}}),a.querySelectorAll(".btn-copy-link").forEach(q=>{q.onclick=()=>{const U=q.dataset.url;U&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(U).then(()=>{y("Link copied to clipboard! 📋")}).catch(()=>{y("Link: "+U)}):y("Link: "+U))}}),a.querySelectorAll(".btn-del-link").forEach(q=>{q.onclick=async()=>{const U=q.dataset.linkId;try{E=await et(`/tickets/${E._id}/links/${U}`),ve(),await ce(),y("Link removed")}catch(g){y(g.message||"Failed to remove link",!0)}}});const W=a.querySelector("#btn-trigger-detail-upload"),re=a.querySelector("#inp-detail-att-upload"),be=a.querySelector("#detail-att-upload-progress");W&&re&&(W.onclick=q=>{q.preventDefault(),re.click()}),re&&(re.onchange=async()=>{const q=Array.from(re.files||[]);if(re.value="",!!q.length){be&&(be.style.display="block",be.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${q.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const g=(await ba(q,Ae=>{const we=a.querySelector("#att-prog-pct"),lt=a.querySelector("#att-prog-bar");we&&(we.textContent=`${Ae}%`),lt&&(lt.style.width=`${Ae}%`)})).map(Ae=>({name:Ae.name,url:Ae.url,size:Ae.size||0,type:Ae.type||"application/octet-stream"}));g.length&&(E=await Ce(`/tickets/${E._id}/attachments`,{attachments:g}),ve(),y(`Successfully attached ${g.length} file(s)! 📎`,!1))}catch(U){console.error("Upload error:",U),y(`Upload failed: ${U.message}`,!0)}finally{be&&(be.style.display="none")}}}),a.querySelectorAll(".btn-play-att-video").forEach(q=>{q.onclick=()=>{const U=q.dataset.slot,g=a.querySelector("#"+U);if(g){const Ae=g.style.display==="none";g.style.display=Ae?"block":"none",q.textContent=Ae?"⏸ Close Video":"▶ Play Video";const we=g.querySelector("video");we&&Ae?we.play().catch(()=>{}):we&&we.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(q=>{q.onclick=async()=>{const U=q.dataset.attId;try{E=await et(`/tickets/${E._id}/attachments/${U}`),ve()}catch(g){y(g.message,!0)}}}),a.querySelectorAll(".ci-360-act-tab").forEach(q=>{q.onclick=()=>{j=q.dataset.actTab,ve()}});const de=a.querySelector("#inp-new-comment"),he=a.querySelector("#btn-submit-comment");he&&de&&(he.onclick=async()=>{const q=de.value.trim();if(q)try{he.disabled=!0,he.textContent="Saving...",E=await Ce(`/tickets/${E._id}/comments`,{content:q}),ve(),y("Comment added",!1)}catch(U){y(U.message||"Failed to add comment",!0)}finally{he.disabled=!1}});const Te=a.querySelector("#btn-open-link-dialog"),Be=a.querySelector("#ci-360-link-box"),We=a.querySelector("#btn-cancel-link"),Le=a.querySelector("#btn-submit-link"),pe=a.querySelector("#inp-link-target"),De=a.querySelector("#sel-link-rel");Te&&Be&&(Te.onclick=()=>{Be.style.display="block"}),We&&Be&&(We.onclick=()=>{Be.style.display="none"}),Le&&Be&&(Le.onclick=async()=>{const q=pe?.value.trim(),U=De?.value||"relates to";if(q)try{Le.disabled=!0,E=await Ce(`/tickets/${E._id}/links`,{targetTicketId:q,relationship:U}),ve(),y(`Linked with ${q}`,!1)}catch(g){y(g.message||"Failed to link ticket",!0)}finally{Le.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(q=>{q.onclick=async()=>{const U=q.dataset.linkId;try{E=await et(`/tickets/${E._id}/links/${U}`),ve()}catch(g){y(g.message,!0)}}});const Ue=a.querySelector("#btn-open-worklog-dialog"),Ne=a.querySelector("#ci-360-worklog-box"),Pe=a.querySelector("#btn-cancel-worklog"),Ie=a.querySelector("#btn-submit-worklog"),Ee=a.querySelector("#inp-worklog-time"),ke=a.querySelector("#inp-worklog-desc");Ue&&Ne&&(Ue.onclick=()=>{Ne.style.display="block"}),Pe&&Ne&&(Pe.onclick=()=>{Ne.style.display="none"}),Ie&&Ne&&(Ie.onclick=async()=>{const q=Ee?.value.trim(),U=ke?.value.trim();if(!q){y("Enter time spent (e.g. 2h 30m)",!0);return}try{Ie.disabled=!0,E=await Ce(`/tickets/${E._id}/worklogs`,{timeSpent:q,description:U}),ve(),y("Work logged",!1)}catch(g){y(g.message||"Failed to log work",!0)}finally{Ie.disabled=!1}});const fe=a.querySelector("#btn-delete-ticket");fe&&(fe.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${E.ticketId}?`))try{fe.disabled=!0,await et(`/tickets/${E._id}`),y(`Ticket ${E.ticketId} deleted`,!1),$(),await tt(),nt(),await ce()}catch(q){y(q.message||"Failed to delete ticket",!0),fe.disabled=!1}})}function $(){E=null,N=!1;const a=n.querySelector("#ci-360-modals-root");a&&(a.innerHTML="")}function I(a=null){const i=n.querySelector("#ci-360-modals-root");if(!i)return;const C=a||(_.jobId&&_.jobId!=="all"?_.jobId:null);i.innerHTML=`
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
                  ${B.map(s=>{const r=d&&String(d._id||d.id)===String(s._id);return`
                      <label class="ci-360-emp-check-item ${r?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${s._id}" ${r?"checked":""} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(s.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${v(s.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(s.role)})${r?" — (You)":""}</span>
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
                    <option value="${s._id}" ${C&&String(C)===String(s._id)?"selected":""}>
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
    `;const P=()=>{i.querySelectorAll(".ci-360-emp-check-item").forEach(s=>{const r=s.querySelector(".chk-create-emp");s.classList.toggle("selected",!!r?.checked)})};i.querySelectorAll(".chk-create-emp").forEach(s=>{s.onchange=P});const S=i.querySelector("#btn-create-assign-self");S&&d&&(S.onclick=()=>{const s=String(d._id||d.id);i.querySelectorAll(".chk-create-emp").forEach(r=>{r.value===s&&(r.checked=!0)}),P()});const z=i.querySelector("#btn-create-clear-assign");z&&(z.onclick=()=>{i.querySelectorAll(".chk-create-emp").forEach(s=>{s.checked=!1}),P()});const D=[],O=i.querySelector("#inp-create-ticket-att"),H=i.querySelector("#create-att-list"),x=i.querySelector("#create-att-count"),R=i.querySelector("#create-att-progress"),X=()=>{x&&(x.textContent=`${D.length} file(s) attached`),H&&(H.innerHTML=D.map((s,r)=>{const h=s.type&&s.type.includes("video")||s.name&&s.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${h?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${v(s.name)}">${v(s.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${ga(s.size)} ${h?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${r}" title="Remove">&times;</button>
          </div>
        `}).join(""),H.querySelectorAll(".btn-del-pending-att").forEach(s=>{s.onclick=()=>{D.splice(Number(s.dataset.idx),1),X()}}))};O&&(O.onchange=async()=>{const s=Array.from(O.files||[]);if(O.value="",!!s.length){R&&(R.style.display="block",R.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${s.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await ba(s,h=>{const F=i.querySelector("#create-prog-pct"),A=i.querySelector("#create-prog-bar");F&&(F.textContent=`${h}%`),A&&(A.style.width=`${h}%`)})).forEach(h=>{D.push({name:h.name,url:h.url,size:h.size||0,type:h.type||"application/octet-stream"})}),X()}catch(r){y(`Failed to upload files: ${r.message}`,!0)}finally{R&&(R.style.display="none"),O.value=""}}});const Z=()=>{i.innerHTML=""},te=i.querySelector("#btn-close-create-modal");te&&(te.onclick=Z);const Q=i.querySelector("#btn-cancel-create-ticket");Q&&(Q.onclick=Z);const u=i.querySelector("#ci-360-create-backdrop");u&&(u.onclick=s=>{s.target===u&&Z()});const m=i.querySelector("#btn-submit-create-ticket");m&&(m.onclick=async()=>{const s=i.querySelector("#create-ticket-title")?.value.trim(),r=i.querySelector("#create-ticket-desc")?.value.trim(),h=i.querySelector("#create-ticket-cat")?.value||"Task",F=i.querySelector("#create-ticket-pri")?.value||"Medium",V=Array.from(i.querySelectorAll(".chk-create-emp:checked")).map(Y=>Y.value),oe=i.querySelector("#create-ticket-duedate")?.value||null,L=i.querySelector("#create-ticket-job")?.value||null,M=i.querySelector("#create-ticket-url")?.value.trim()||"";if(!s){y("Ticket summary / title is required",!0);return}try{m.disabled=!0,m.textContent="Creating...";const Y=await Ce("/tickets",{title:s,description:r,category:h,priority:F,assigneeIds:V,assigneeId:V[0]||null,dueDate:oe,jobId:L,linkUrl:M,attachments:D});y(`Ticket ${Y.ticketId} created! 🎫`,!1),Z(),await tt(),nt(),await ce(),st(Y._id)}catch(Y){y(Y.message||"Could not create ticket",!0),m.disabled=!1,m.textContent="Create Ticket 🚀"}})}n._openCreateTicketModal=I,n._openTicketDetailModal=st,n._setJobFilter=async a=>{_.jobId=a||"all";const i=n.querySelector("#ci-360-filter-job");i&&(i.value=_.jobId),ze(),await ce()}}export{ii as a,ai as b,ti as i};
