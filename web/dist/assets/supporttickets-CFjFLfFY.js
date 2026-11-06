import{c as Re,k as $,e as y,v as Qe,l as Xe,p as qt,m as Jt,j as Ie,w as ga,x as aa,y as ba}from"./api-FGezNYCI.js";const ma={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function Ia(){try{const s=localStorage.getItem("ci360_planner_settings");if(s)return Object.assign({},ma,JSON.parse(s))}catch{}return Object.assign({},ma)}function _a(s){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(s))}catch{}}function je(){const s=new Date,t=s.getFullYear(),e=String(s.getMonth()+1).padStart(2,"0"),p=String(s.getDate()).padStart(2,"0");return`${t}-${e}-${p}`}function Kt(s,t){const e=new Date(s+"T00:00:00");e.setDate(e.getDate()+t);const p=e.getFullYear(),f=String(e.getMonth()+1).padStart(2,"0"),g=String(e.getDate()).padStart(2,"0");return`${p}-${f}-${g}`}function kt(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function Te(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function fa(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function Mt(s,t=1){const e=new Date(s+"T00:00:00"),p=e.getDay(),f=(p<t?7:0)+p-t,g=new Date(e);g.setDate(e.getDate()-f);const c=[];for(let o=0;o<7;o++){const B=new Date(g);B.setDate(g.getDate()+o);const Y=B.getFullYear(),A=String(B.getMonth()+1).padStart(2,"0"),E=String(B.getDate()).padStart(2,"0");c.push(`${Y}-${A}-${E}`)}return c}function Aa(){try{const s=window.AudioContext||window.webkitAudioContext;if(!s)return;const t=new s,e=t.currentTime,p=t.createOscillator(),f=t.createGain();p.type="sine",p.frequency.setValueAtTime(523.25,e),p.frequency.exponentialRampToValueAtTime(783.99,e+.15),f.gain.setValueAtTime(.2,e),f.gain.exponentialRampToValueAtTime(.001,e+.35),p.connect(f),f.connect(t.destination),p.start(e),p.stop(e+.35)}catch{}}function ti(s,t={}){const{userRole:e="employee",currentUser:p=null,onNavigate:f=null}=t,g=e==="superadmin"||e==="admin";let c=Ia(),o={selectedDate:je(),viewMode:"daily",filterStatus:"all",searchQuery:"",groupByEmployee:g,collapsedEmployees:{},selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Da(),B();async function B(){o.loading=!0,Y();try{const d=[Re("/tasks")];g&&d.push(Re("/personnel").catch(()=>[]));const[a,n]=await Promise.all(d);o.tasks=Array.isArray(a)?a:[],n&&(o.personnelList=Array.isArray(n)?n:[])}catch(d){$("Failed to load planner tasks: "+d.message,!0)}finally{o.loading=!1,U()}}function Y(){s.innerHTML=`
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
    `}function A(d){return o.tasks.filter(a=>{if(a.isDeleted===!0)return!1;if(g&&o.selectedPersonnelId!=="all"){const v=a.personnelId?._id||a.personnelId,T=String(v)===String(o.selectedPersonnelId),N=Array.isArray(a.coOwners)&&a.coOwners.some(k=>{const F=k.personnelId?._id||k.personnelId||k.userId?._id||k.userId;return String(F)===String(o.selectedPersonnelId)});if(!T&&!N)return!1}const n=a.completionDateStr||a.dateStr||(a.dueDate?new Date(a.dueDate).toISOString().slice(0,10):""),m=a.assignedDateStr||(a.assignedDate?new Date(a.assignedDate).toISOString().slice(0,10):"")||(a.createdAt?new Date(a.createdAt).toISOString().slice(0,10):"")||n;if(a.status==="In Progress"){const v=m&&n&&m<=n?m:n||m,T=m&&n&&m<=n?n:m||n;if(v&&T){if(d>=v&&d<=T)return!0}else{if(n&&n===d)return!0;if(m&&m===d)return!0}}return n&&n===d||a.status!=="Completed"&&m&&m===d?!0:!n&&!m?d===je():!1})}function E(d,a){if(d.status==="Completed")return!1;const n=d.completionDateStr||d.dateStr||(d.dueDate?new Date(d.dueDate).toISOString().slice(0,10):"");return n?n<a:!1}function W(d,a){const n=d.length,m=d.filter(F=>F.status==="Completed").length,v=d.filter(F=>F.status==="In Progress").length,T=d.filter(F=>F.status==="Pending"||F.status==="Todo").length,N=d.filter(F=>E(F,a)).length,k=n>0?Math.round(m/n*100):0;return{total:n,completed:m,inProgress:v,pending:T,overdue:N,percent:k}}function U(){const d=je(),a=o.selectedDate===d,n=A(o.selectedDate),m=W(n,d);s.innerHTML=`
      <div class="ci360-planner-wrap ${c.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${Te(o.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${y(c.displayName||"Daily Planner")}</h1>
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
            <button type="button" class="ci360-btn-primary ${o.selectedDate<d?"is-locked-past":""}" id="btnOpenAddTaskModal" title="${o.selectedDate<d?"Cannot add tasks on previous dates (switch to today or later)":"Add Task"}">
              ${o.selectedDate<d?`
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
                    <small>Summary report with job owner</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionAdminReport">
                  <span class="icon">📊</span>
                  <div class="meta">
                    <strong>Admin Detailed Report (PDF & CSV)</strong>
                    <small>With Client Name & Description</small>
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
              <span class="date-text" id="displayDateLabel">${kt(o.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${o.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${a?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${g?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${o.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${o.personnelList.map(v=>`
                  <option value="${v._id}" ${o.selectedPersonnelId===String(v._id)?"selected":""}>
                    ${y(v.name)} (${y(v.department||v.role||"Team")})
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
              <div class="ci360-circular-progress" style="--val: ${m.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${m.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${m.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <span class="kpi-num">${m.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${m.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${m.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${m.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${m.overdue>0?`
                <div class="kpi-box overdue">
                  <span class="kpi-num">${m.overdue}</span>
                  <span class="kpi-label">Overdue</span>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${m.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${ge(n,m)}
        </main>

      </div>
    `,at(),Pe()}function ge(d,a){return o.viewMode==="weekly"?rt():o.viewMode==="report"?Ct():xe(d,a)}function xe(d,a){const n=je(),m=o.selectedDate<n;let v=d;if(o.filterStatus==="pending"?v=v.filter(k=>k.status==="Pending"||k.status==="Todo"):o.filterStatus==="in_progress"?v=v.filter(k=>k.status==="In Progress"):o.filterStatus==="completed"?v=v.filter(k=>k.status==="Completed"):o.filterStatus==="overdue"&&(v=v.filter(k=>E(k,n))),o.searchQuery){const k=o.searchQuery.toLowerCase().trim();v=v.filter(F=>{const M=(F.title||"").toLowerCase(),_=(F.description||"").toLowerCase(),z=(F.category||"").toLowerCase(),x=(F.personnelId?.name||F.userId?.name||"").toLowerCase(),q=(F.createdByName||F.createdBy?.name||(F.createdBy?.email?F.createdBy.email.split("@")[0]:"")).toLowerCase(),D=Array.isArray(F.coOwners)?F.coOwners.map(l=>(l.name||"").toLowerCase()).join(" "):"",G=(F.clientId?.name||F.jobId?.clientId?.name||"").toLowerCase();return M.includes(k)||_.includes(k)||z.includes(k)||x.includes(k)||q.includes(k)||D.includes(k)||G.includes(k)})}v.sort((k,F)=>{if(k.status==="Completed"&&F.status!=="Completed")return 1;if(k.status!=="Completed"&&F.status==="Completed")return-1;const M={Urgent:0,High:1,Medium:2,Low:3};return(M[k.priority]||2)-(M[F.priority]||2)});const T=new Map;v.forEach(k=>{let F="unassigned",M="Unassigned / Team",_="",z="";k.personnelId&&typeof k.personnelId=="object"&&k.personnelId._id?(F=String(k.personnelId._id),M=k.personnelId.name||"Team Member",z=k.personnelId.role||"Personnel",_=k.personnelId.department||""):k.userId&&typeof k.userId=="object"&&k.userId._id?(F=String(k.userId._id),M=k.userId.name||"User",z=k.userId.role||"Member"):(k.createdByName||k.createdBy&&k.createdBy.name)&&(M=k.createdByName||k.createdBy.name,F="creator_"+M.toLowerCase().replace(/[^a-z0-9]/g,"_"),z="Creator"),T.has(F)||T.set(F,{key:F,name:M,department:_,role:z,tasks:[]}),T.get(F).tasks.push(k)});const N=Array.from(T.values()).sort((k,F)=>k.key==="unassigned"?1:F.key==="unassigned"?-1:k.name.localeCompare(F.name));return`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              ${m?"Focus Archive":"Today's Focus"}
            </h2>
            <span class="ci360-task-count-badge">${v.length} ${v.length===1?"task":"tasks"}</span>
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${o.filterStatus==="all"?"active":""}" data-f="all">All (${a.total})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${a.pending})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${a.inProgress})</button>
              <button type="button" class="filter-pill ${o.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${a.completed})</button>
              ${a.overdue>0?`
                <button type="button" class="filter-pill overdue ${o.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${a.overdue})</button>
              `:""}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${g?`
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${o.groupByEmployee?"active":""}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${o.groupByEmployee?"By Employee":"Flat List"}
                </button>
                ${o.groupByEmployee&&N.length>0?`
                  <button type="button" class="filter-pill" id="btnExpandAllEmp" title="Expand all employee tasks">⊞ Expand</button>
                  <button type="button" class="filter-pill" id="btnCollapseAllEmp" title="Collapse all employee tasks">⊟ Collapse</button>
                `:""}
              </div>
            `:""}

            <!-- Search Bar with employee search support -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks, category or employee..." value="${y(o.searchQuery)}">
              ${o.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card (Only for Today or Future Dates) / Past Date Banner -->
        ${m?`
          <div class="ci360-past-date-banner">
            <div class="past-banner-icon">🔒</div>
            <div class="past-banner-body">
              <div class="past-banner-title">Previous Date (${Te(o.selectedDate)})</div>
              <div class="past-banner-desc">
                Adding new tasks on previous dates is restricted. You can edit existing tasks, adjust completion dates, or mark tasks as completed.
              </div>
            </div>
          </div>
        `:`
          <div class="ci360-quick-add-bar">
            <div class="ci360-quick-add-input-wrap">
              <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${Te(o.selectedDate)}... (Press Enter to save)">
            </div>

            <div class="ci360-quick-add-meta">
              <div class="ci360-quick-date-group" title="Completion Date (defaults to that day if left blank)" style="display:inline-flex;align-items:center;gap:4px;">
                <span style="font-size:11.5px;color:var(--text-3);font-weight:600;">Due:</span>
                <input type="date" id="quickAddCompletionDate" class="ci360-quick-select" value="${o.selectedDate}" min="${n}" title="Completion Date (defaults to that day if left blank)">
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

              ${g?`
                <select id="quickAddAssignee" class="ci360-quick-select" title="Assign To Employee" style="max-width:140px;">
                  <option value="" ${o.selectedPersonnelId==="all"?"selected":""}>👤 Myself</option>
                  <option value="all">👥 All Team</option>
                  ${o.personnelList.map(k=>`
                    <option value="${k._id}" ${o.selectedPersonnelId===String(k._id)?"selected":""}>👤 ${y(k.name)}</option>
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
          ${v.length===0?Ke(m):g&&o.groupByEmployee?`
              <div class="ci360-emp-groups-container">
                ${N.map(k=>{const F=!!o.collapsedEmployees[k.key],M=k.tasks.filter(q=>q.status==="Completed").length,_=k.tasks.filter(q=>q.status==="In Progress").length,z=k.tasks.filter(q=>q.status==="Pending"||q.status==="Todo").length,x=k.tasks.length>0?Math.round(M/k.tasks.length*100):0;return`
                    <div class="ci360-emp-group-card ${F?"is-collapsed":""}" data-emp-key="${k.key}">
                      <div class="ci360-emp-group-header" data-action="toggle-emp-group" data-emp-key="${k.key}" role="button" tabindex="0">
                        <div class="emp-group-left">
                          <span class="emp-collapse-icon">${F?"▶":"▼"}</span>
                          <div class="emp-avatar">${y((k.name||"U").charAt(0).toUpperCase())}</div>
                          <div class="emp-info">
                            <span class="emp-name">${y(k.name)}</span>
                            ${k.department||k.role?`<span class="emp-subtitle">${y(k.department?k.department+" · "+k.role:k.role)}</span>`:""}
                          </div>
                        </div>

                        <div class="emp-group-right">
                          <span class="emp-stat-pill total">${k.tasks.length} ${k.tasks.length===1?"task":"tasks"}</span>
                          <span class="emp-stat-pill done">${M} done</span>
                          ${_>0?`<span class="emp-stat-pill in-prog">${_} in progress</span>`:""}
                          ${z>0?`<span class="emp-stat-pill pending">${z} pending</span>`:""}
                          <div class="emp-mini-bar-wrap" title="${x}% completed">
                            <div class="emp-mini-bar-fill" style="width:${x}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${F?"":`
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${k.tasks.map(q=>Ze(q,n)).join("")}
                          </div>
                        </div>
                      `}
                    </div>
                  `}).join("")}
              </div>
            `:`
              <div class="ci360-task-list">
                ${v.map(k=>Ze(k,n)).join("")}
              </div>
            `}
        </div>

      </div>
    `}function Ke(d=!1){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">${d?"📜":"✨"}</div>
        <h3>No tasks found for ${Te(o.selectedDate)}</h3>
        <p>${d?"No scheduled tasks were recorded on this past date.":"Your schedule is clean and ready. Add your first priority task above or import your daily agenda."}</p>
        ${d?"":`
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
    `}function Ze(d,a){const n=d.status==="Completed",m=E(d,a),v=d.completionDateStr||d.dateStr||(d.dueDate?new Date(d.dueDate).toISOString().slice(0,10):a),T=d.assignedDateStr||(d.assignedDate?new Date(d.assignedDate).toISOString().slice(0,10):"")||(d.createdAt?new Date(d.createdAt).toISOString().slice(0,10):""),N=d.status==="In Progress"&&T&&v&&T!==v,k=`pri-${(d.priority||"medium").toLowerCase()}`,F=`status-${(d.status||"pending").toLowerCase().replace(/\s+/g,"-")}`,M=d.createdByName||d.createdBy?.name||(d.createdBy?.email?d.createdBy.email.split("@")[0]:"")||d.personnelId?.name||d.userId?.name||"";return`
      <div class="ci360-task-card ${n?"is-completed":""} ${m?"is-overdue":""}" data-id="${d._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${n?"checked":""}" data-action="toggle" data-id="${d._id}" title="${n?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${y(d.title)}</span>
          </div>

          ${d.description?`
            <div class="ci360-task-desc">${y(d.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${k}">
              <span class="badge-dot"></span>
              ${y(d.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${F}">
              ${y(d.status||"Pending")}
            </span>

            <!-- Completion Date / Date Span Badge (Always Visible & Prominent) -->
            ${N?`
              <span class="ci360-badge completion-badge" style="background:rgba(59,130,246,0.15);color:#3b82f6;border-color:rgba(59,130,246,0.3);" title="In Progress from ${Te(T)} to ${Te(v)}">
                📅 ${Te(T)} ➔ Due: ${Te(v)}
              </span>
            `:`
              <span class="ci360-badge completion-badge" title="Target Completion Date: ${v}">
                📅 Due: ${Te(v)}
              </span>
            `}

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${d.rescheduledFrom&&d.rescheduledFrom!==v?`
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${Te(d.rescheduledFrom)} to ${Te(v)} (${d.dateChangeCount||1} change${(d.dateChangeCount||1)>1?"s":""})">
                🔄 Date Changed: ${Te(d.rescheduledFrom)} ➔ ${Te(v)}
              </span>
            `:""}

            <!-- Added By Badge (Shows Who Created the Task) -->
            ${M?`
              <span class="ci360-badge creator-badge" title="Created / Added by: ${y(M)}">
                ✍️ Added by: ${y(M)}
              </span>
            `:""}

            <!-- Category -->
            ${d.category?`
              <span class="ci360-badge category-badge">
                #${y(d.category)}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${m?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name (if different from addedByName) -->
            ${g&&(d.personnelId?.name||d.userId?.name)&&(d.personnelId?.name||d.userId?.name)!==M?`
              <span class="ci360-badge personnel-badge" title="Assigned Employee">
                👤 Assigned: ${y(d.personnelId?.name||d.userId?.name)}
              </span>
            `:""}

            <!-- Co-Owners Badge (Multiple People) -->
            ${Array.isArray(d.coOwners)&&d.coOwners.length>0?`
              <span class="ci360-badge coowner-badge" style="background:rgba(99,102,241,0.12);color:var(--accent);border:1px solid rgba(99,102,241,0.25);" title="Co-Owners: ${d.coOwners.map(_=>_.name).filter(Boolean).join(", ")}">
                👥 Co-Owners: ${y(d.coOwners.map(_=>_.name).filter(Boolean).join(", "))}
              </span>
            `:""}

            <!-- Client Badge -->
            ${d.clientId?.name||d.jobId?.clientId?.name?`
              <span class="ci360-badge client-badge" style="background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.25);" title="Client: ${y(d.clientId?.name||d.jobId?.clientId?.name)}">
                🏢 ${y(d.clientId?.name||d.jobId?.clientId?.name)}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu: Previous tasks can be edited, deleted, changed by all -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${d._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${d._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function rt(){const d=Mt(o.selectedDate,c.weekStartsOn),a=Te(d[0]),n=Te(d[6]),m=je();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${a} – ${n}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${d.map(v=>{const T=v===m,N=v===o.selectedDate,k=A(v),F=W(k,m);return`
              <div class="ci360-day-column ${T?"is-today":""} ${N?"is-selected":""}" data-date="${v}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${v}">
                  <div class="day-name">${fa(v)}</div>
                  <div class="day-number">${new Date(v+"T00:00:00").getDate()}</div>
                  ${T?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${F.completed}/${F.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${F.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${k.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:k.map(M=>`
                    <div class="ci360-mini-task-card ${M.status==="Completed"?"done":""}" data-id="${M._id}">
                      <button type="button" class="mini-check ${M.status==="Completed"?"checked":""}" data-action="toggle" data-id="${M._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${M._id}">
                        <div class="mini-title">${y(M.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(M.priority||"medium").toLowerCase()}">${M.priority||"Med"}</span>
                          ${M.dueTime?`<span class="mini-time">${y(M.dueTime)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Add for Day Button (Locked on past dates) -->
                ${v<m?`
                  <div class="day-col-locked-note" title="Cannot add tasks on previous dates">
                    <span>🔒 Past Date</span>
                  </div>
                `:`
                  <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${v}">
                    + Add Task
                  </button>
                `}

              </div>
            `}).join("")}
        </div>

      </div>
    `}function Ct(){const d=Mt(o.selectedDate,c.weekStartsOn),a=kt(d[0]),n=kt(d[6]),m=je(),v=o.tasks.filter(_=>{if(_.isDeleted===!0)return!1;const z=_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):"");return d.includes(z)}),T=v.length,N=v.filter(_=>_.status==="Completed").length,k=v.filter(_=>_.status==="In Progress").length,F=T>0?Math.round(N/T*100):0,M={Urgent:0,High:0,Medium:0,Low:0};return v.forEach(_=>{const z=_.priority||"Medium";M[z]!==void 0&&M[z]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${a} – ${n}</div>
          </div>

          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button type="button" class="ci360-btn-primary" id="btnDownloadWeeklyPdf">
              📄 Download Weekly Report PDF
            </button>
            <button type="button" class="ci360-btn-secondary" id="btnOpenAdminReportModal" style="background:rgba(99,102,241,0.12);color:var(--accent);border:1px solid rgba(99,102,241,0.25);font-weight:700;">
              📊 Specific Admin Report (with Description & Client)
            </button>
          </div>
        </div>

        <!-- KPI Grid -->
        <div class="ci360-report-kpis">
          <div class="card kpi">
            <span class="label">Total Weekly Tasks</span>
            <span class="value" style="font-size:28px">${T}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${N}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${k}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${F}%</span>
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
                ${d.map(_=>{const z=A(_),x=W(z,m);return`
                    <tr>
                      <td><strong>${fa(_)}</strong></td>
                      <td>${Te(_)}</td>
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
              <div style="font-size:22px;font-weight:700">${M.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${M.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${M.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${M.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function at(){const d=document.getElementById("btnViewDaily"),a=document.getElementById("btnViewWeekly"),n=document.getElementById("btnViewReport");d&&(d.onclick=()=>{o.viewMode="daily",U()}),a&&(a.onclick=()=>{o.viewMode="weekly",U()}),n&&(n.onclick=()=>{o.viewMode="report",U()});const m=document.getElementById("btnPrevDay"),v=document.getElementById("btnNextDay"),T=document.getElementById("btnJumpToday"),N=document.getElementById("hiddenDateInput"),k=document.getElementById("datePickerBadge");m&&(m.onclick=()=>{o.selectedDate=Kt(o.selectedDate,-1),U()}),v&&(v.onclick=()=>{o.selectedDate=Kt(o.selectedDate,1),U()}),T&&(T.onclick=()=>{o.selectedDate=je(),U()}),k&&N&&(k.onclick=()=>{try{typeof N.showPicker=="function"?N.showPicker():N.focus()}catch{N.focus()}},N.onchange=i=>{i.target.value&&(o.selectedDate=i.target.value,U())});const F=document.getElementById("admTeamSelect");F&&(F.onchange=i=>{o.selectedPersonnelId=i.target.value,U()});const M=document.getElementById("btnOpenAddTaskModal");M&&(M.onclick=()=>{if(o.selectedDate<je()){$("Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.",!0);return}Ue()});const _=document.getElementById("btnPlannerActionsMenu"),z=document.getElementById("plannerActionsDropdown");_&&z&&(_.onclick=i=>{i.stopPropagation(),z.classList.toggle("hidden")},document.addEventListener("click",i=>{!z.contains(i.target)&&i.target!==_&&z.classList.add("hidden")}));const x=document.getElementById("btnActionImport");x&&(x.onclick=()=>{z?.classList.add("hidden"),ct()});const q=document.getElementById("btnActionExportPng");q&&(q.onclick=()=>{z?.classList.add("hidden"),Me()});const D=document.getElementById("btnActionExportPdf");D&&(D.onclick=()=>{z?.classList.add("hidden"),le()});const G=document.getElementById("btnActionAdminReport");G&&(G.onclick=()=>{z?.classList.add("hidden"),nt()});const l=document.getElementById("btnActionBackup");l&&(l.onclick=()=>{z?.classList.add("hidden"),st()});const u=document.getElementById("btnActionSettings");u&&(u.onclick=()=>{z?.classList.add("hidden"),ot()})}function Pe(d){if(o.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(q=>{q.onclick=()=>{o.filterStatus=q.dataset.f,U()}});const a=document.getElementById("plannerTaskSearchInp");a&&(a.oninput=q=>{o.searchQuery=q.target.value,U()});const n=document.getElementById("btnClearSearch");n&&(n.onclick=()=>{o.searchQuery="",U()});const m=document.getElementById("quickAddTitleInp"),v=document.getElementById("quickAddCompletionDate"),T=document.getElementById("quickAddPriority"),N=document.getElementById("quickAddCategory"),k=document.getElementById("btnQuickAddSubmit"),F=async()=>{const q=je();if(o.selectedDate<q){$("Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.",!0);return}const D=(m?.value||"").trim();if(!D){$("Please enter a task title",!0),m?.focus();return}const G=(v?.value||"").trim()||o.selectedDate;if(G<q){$("Cannot set completion date on a previous date.",!0);return}try{const l={title:D,assignedDate:o.selectedDate,assignedDateStr:o.selectedDate,dateStr:G,completionDate:G,completionDateStr:G,dueDate:G,priority:T?.value||c.defaultPriority,category:N?.value||"General",status:"Pending"};if(g){const i=document.getElementById("quickAddAssignee")?.value;i==="all"?(l.assignAll=!0,l.personnelId="all"):i?l.personnelId=i:o.selectedPersonnelId!=="all"&&(l.personnelId=o.selectedPersonnelId)}const u=await Ie("/tasks",l);o.tasks.unshift(u),$("Task added to today's focus! ✨"),m&&(m.value="",m.focus()),U()}catch(l){$(l.message,!0)}};k&&(k.onclick=F),m&&(m.onkeydown=q=>{q.key==="Enter"&&F()}),document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(q=>{q.onclick=()=>{const D=q.dataset.empKey;o.collapsedEmployees[D]=!o.collapsedEmployees[D],U()}});const M=document.getElementById("btnToggleEmpGrouping");M&&(M.onclick=()=>{o.groupByEmployee=!o.groupByEmployee,U()});const _=document.getElementById("btnExpandAllEmp");_&&(_.onclick=()=>{o.collapsedEmployees={},U()});const z=document.getElementById("btnCollapseAllEmp");z&&(z.onclick=()=>{document.querySelectorAll(".ci360-emp-group-card").forEach(q=>{const D=q.dataset.empKey;D&&(o.collapsedEmployees[D]=!0)}),U()});const x=document.getElementById("btnEmptyStateImport");x&&(x.onclick=()=>ct())}if(o.viewMode==="weekly"){const a=document.getElementById("btnPrevWeek"),n=document.getElementById("btnNextWeek"),m=document.getElementById("btnThisWeek");a&&(a.onclick=()=>{o.selectedDate=Kt(o.selectedDate,-7),U()}),n&&(n.onclick=()=>{o.selectedDate=Kt(o.selectedDate,7),U()}),m&&(m.onclick=()=>{o.selectedDate=je(),U()}),document.querySelectorAll(".day-col-header").forEach(v=>{v.onclick=()=>{o.selectedDate=v.dataset.date,o.viewMode="daily",U()}}),document.querySelectorAll('[data-action="add-day"]').forEach(v=>{v.onclick=()=>{Ue(null,v.dataset.date)}})}if(o.viewMode==="report"){const a=document.getElementById("btnDownloadWeeklyPdf");a&&(a.onclick=()=>le());const n=document.getElementById("btnOpenAdminReportModal");n&&(n.onclick=()=>nt())}s.querySelectorAll('[data-action="toggle"]').forEach(a=>{a.onclick=async n=>{n.stopPropagation();const m=a.dataset.id;await it(m)}}),s.querySelectorAll('[data-action="edit"]').forEach(a=>{a.onclick=n=>{n.stopPropagation();const m=a.dataset.id,v=o.tasks.find(T=>T._id===m);v&&Ue(v)}}),s.querySelectorAll('[data-action="delete"]').forEach(a=>{a.onclick=async n=>{n.stopPropagation();const m=a.dataset.id;await ut(m)}})}async function it(d){const a=o.tasks.find(m=>m._id===d);if(!a)return;const n=a.status!=="Completed";try{const m=await Qe(`/tasks/${d}/toggle`,{}),v=o.tasks.findIndex(T=>T._id===d);v!==-1&&(o.tasks[v]=m),n?(c.soundEnabled&&Aa(),$("Task marked as completed! 🎉")):$("Task reopened as pending."),U()}catch(m){$(m.message,!0)}}async function ut(d){const a=o.tasks.find(n=>n._id===d);if(a&&confirm(`Are you sure you want to remove "${a.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Xe(`/tasks/${d}`),o.tasks=o.tasks.filter(n=>n._id!==d),$("Task removed from planner (safely stored in database archive)"),U()}catch(n){$(n.message,!0)}}function Ue(d=null,a=null){const n=!!d,m=je(),v=d?d.assignedDateStr||(d.assignedDate?new Date(d.assignedDate).toISOString().slice(0,10):"")||d.dateStr||(d.createdAt?new Date(d.createdAt).toISOString().slice(0,10):o.selectedDate):a&&a>=m?a:o.selectedDate>=m?o.selectedDate:m;d?d.completionDateStr||d.dueDate&&new Date(d.dueDate).toISOString().slice(0,10):a&&a>=m||o.selectedDate>=m&&o.selectedDate;const T=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${n?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${y(d?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${y(d?.description||"")}</textarea>
          </div>

          <!-- Date Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${v}" ${n?"":`min="${m}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${d?.completionDateStr||(d?.dueDate?new Date(d.dueDate).toISOString().slice(0,10):"")}" ${n?"":`min="${m}"`} placeholder="Defaults to that day">
              <small style="color:var(--text-3);font-size:11px;">If left blank, will default to that day (${v})</small>
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${d?.priority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!d&&c.defaultPriority==="Medium"||d?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!d&&c.defaultPriority==="High"||d?.priority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${d?.priority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${d?.status==="Pending"||d?.status==="Todo"||!d?"selected":""}>Pending</option>
                <option value="In Progress" ${d?.status==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${d?.status==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${y(d?.category||"General")}">
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
          ${g?`
            <div class="form-group">
              <label for="taskAssignee">Primary Assignee / Owner</label>
              <select id="taskAssignee" class="input">
                <option value="me" ${!d||!d?.personnelId&&!d?.assignAll?"selected":""}>Myself (Admin)</option>
                <option value="all" ${d?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${o.personnelList.map(l=>{const u=d?.personnelId?._id===l._id||d?.personnelId===l._id;return`<option value="${l._id}" ${u?"selected":""}>👤 ${y(l.name)} (${y(l.department||l.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <!-- Co-Owners / Multiple Collaborators -->
          <div class="form-group" style="margin-top:10px;">
            <label style="display:flex;justify-content:space-between;align-items:center;">
              <span>Co-Owners / Additional People</span>
              <small style="color:var(--text-3);font-size:11px;">Add multiple collaborators for this task</small>
            </label>
            <div id="coOwnersSelectedContainer" style="display:flex;flex-wrap:wrap;gap:6px;min-height:28px;margin:4px 0 8px;"></div>
            <select id="taskCoOwnerSelect" class="input">
              <option value="">+ Add Co-Owner / Collaborator...</option>
              ${o.personnelList.map(l=>`
                <option value="${l._id}">+ 👤 ${y(l.name)} (${y(l.department||l.role||"Member")})</option>
              `).join("")}
            </select>
          </div>

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${n?`
                <button type="button" class="btn danger small" id="btnModalDeleteTask" style="padding:6px 12px;background:#ef4444;color:#fff;border-radius:var(--r-sm);border:none;cursor:pointer;font-weight:700;font-size:12px;">🗑️ Delete Task</button>
              `:""}
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
              <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
                ${n?"Save Changes":"Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    `,N=qt(T),k=N.querySelector("#taskForm"),F=N.querySelector("#btnModalClose"),M=N.querySelector("#btnCancelModal"),_=N.querySelector("#btnModalDeleteTask"),z=()=>N.remove();F&&(F.onclick=z),M&&(M.onclick=z),_&&d&&(_.onclick=async()=>{z(),await ut(d._id)});let x=[];d&&Array.isArray(d.coOwners)&&(x=d.coOwners.map(l=>({personnelId:l.personnelId?._id||l.personnelId||null,userId:l.userId?._id||l.userId||null,name:l.name||l.personnelId?.name||"",role:l.role||l.personnelId?.role||"",department:l.department||l.personnelId?.department||""})).filter(l=>l.personnelId||l.name));const q=N.querySelector("#coOwnersSelectedContainer"),D=N.querySelector("#taskCoOwnerSelect"),G=()=>{if(q){if(x.length===0){q.innerHTML='<span style="font-size:11.5px;color:var(--text-4);font-style:italic;">No co-owners added yet</span>';return}q.innerHTML=x.map((l,u)=>`
        <span class="co-owner-chip" style="display:inline-flex;align-items:center;gap:6px;background:rgba(99,102,241,0.12);color:var(--accent);border:1px solid rgba(99,102,241,0.25);border-radius:16px;padding:3px 10px;font-size:12px;font-weight:600;">
          👤 ${y(l.name)}
          <button type="button" class="btn-remove-co" data-idx="${u}" style="background:transparent;border:none;color:var(--accent);cursor:pointer;font-size:14px;line-height:1;padding:0;margin-left:2px;font-weight:bold;" title="Remove co-owner">×</button>
        </span>
      `).join(""),q.querySelectorAll(".btn-remove-co").forEach(l=>{l.onclick=()=>{const u=parseInt(l.dataset.idx,10);x.splice(u,1),G()}})}};G(),D&&(D.onchange=()=>{const l=D.value;if(!l)return;const u=o.personnelList.find(i=>String(i._id)===String(l));u&&(x.some(r=>String(r.personnelId)===String(u._id))||(x.push({personnelId:u._id,name:u.name,role:u.role||"",department:u.department||""}),G())),D.value=""}),k.onsubmit=async l=>{l.preventDefault();const u=N.querySelector("#taskTitle").value.trim(),i=N.querySelector("#taskDesc").value.trim(),r=N.querySelector("#taskDate").value||v,R=N.querySelector("#taskCompletionDate")?.value?.trim()||r||o.selectedDate,C=N.querySelector("#taskPriority").value,V=N.querySelector("#taskStatus").value,ae=N.querySelector("#taskCategory").value.trim()||"General";if(!u){$("Task title is required",!0);return}if(!n&&(R<m||r<m)){$("Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.",!0);return}const H={title:u,description:i,assignedDate:r,assignedDateStr:r,dateStr:R,completionDate:R,completionDateStr:R,dueDate:R,startTime:"",dueTime:"",priority:C,status:V,category:ae,coOwners:x};if(g){const O=N.querySelector("#taskAssignee")?.value;O==="all"?(H.assignAll=!0,H.personnelId="all"):O==="me"?H.personnelId="me":O&&(H.personnelId=O)}const j=N.querySelector("#btnSaveTask");j.disabled=!0,j.textContent="Saving...";try{if(n){const O=await Jt(`/tasks/${d._id}`,H),ce=o.tasks.findIndex(ne=>ne._id===d._id);ce!==-1&&(o.tasks[ce]=O),$("Task updated successfully! ✍️")}else{const O=await Ie("/tasks",H);Array.isArray(O.tasks)?O.tasks.forEach(ce=>o.tasks.unshift(ce)):o.tasks.unshift(O),$("Task created successfully! ✨")}z(),U()}catch(O){$(O.message,!0),j.disabled=!1,j.textContent=n?"Save Changes":"Create Task"}}}function ct(){let d=[];const a=`
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
              <input type="date" id="importTargetDate" class="input" value="${o.selectedDate<je()?je():o.selectedDate}" min="${je()}">
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
    `,n=qt(a),m=()=>n.remove();n.querySelector("#btnImportClose").onclick=m,n.querySelector("#btnCancelImport").onclick=m;const v=n.querySelector("#importTextarea"),T=n.querySelector("#importFileInput"),N=n.querySelector("#importDropzone"),k=n.querySelector("#previewListArea"),F=n.querySelector("#previewCountLabel"),M=n.querySelector("#btnConfirmImport"),_=n.querySelector("#importFileInfo");function z(q){if(!q)return[];const D=q.split(/\r?\n/),G=[];for(let l of D)l=l.trim(),l&&(l=l.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),l=l.replace(/^[-*•]\s+/,""),l=l.replace(/^\d+[\.\)]\s+/,""),l=l.trim(),l&&G.push(l));return G}function x(){const q=v.value,D=z(q),G=n.querySelector("#importTargetDate").value,l=A(G),u=new Set(l.map(i=>(i.title||"").trim().toLowerCase()));d=[];for(const i of D){const r=u.has(i.toLowerCase());d.push({title:i,isDuplicate:r})}if(F.textContent=`Preview (${d.length} ${d.length===1?"task":"tasks"} found)`,M.disabled=d.length===0,M.textContent=`Import ${d.length} ${d.length===1?"Task":"Tasks"}`,d.length===0){k.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}k.innerHTML=d.map((i,r)=>`
        <div class="preview-item ${i.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${r+1}.</span>
          <span class="preview-title">${y(i.title)}</span>
          ${i.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}v.oninput=x,N.onclick=()=>T.click(),T.onchange=q=>{const D=q.target.files[0];if(!D)return;_.textContent=`File selected: ${D.name} (${Math.round(D.size/1024)} KB)`;const G=new FileReader;G.onload=l=>{v.value=l.target.result,x()},G.readAsText(D)},N.ondragover=q=>{q.preventDefault(),N.classList.add("dragover")},N.ondragleave=()=>N.classList.remove("dragover"),N.ondrop=q=>{q.preventDefault(),N.classList.remove("dragover");const D=q.dataTransfer.files[0];if(D&&(D.type==="text/plain"||D.name.endsWith(".txt"))){_.textContent=`File dropped: ${D.name}`;const G=new FileReader;G.onload=l=>{v.value=l.target.result,x()},G.readAsText(D)}else $("Please drop a valid .txt plain-text file",!0)},M.onclick=async()=>{if(d.length===0)return;M.disabled=!0,M.textContent="Importing...";const q=n.querySelector("#importTargetDate").value;if(q<je()){$("Cannot import tasks for previous dates. Target date must be today or later.",!0),M.disabled=!1,M.textContent=`Import ${d.length} ${d.length===1?"Task":"Tasks"}`;return}const D=n.querySelector("#importPriority").value,G=n.querySelector("#importCategory").value.trim()||"General",l={date:q,tasks:d.map(u=>({title:u.title,priority:D,category:G,status:"Pending"}))};g&&o.selectedPersonnelId!=="all"&&(l.personnelId=o.selectedPersonnelId);try{const u=await Ie("/tasks/bulk-import",l);Array.isArray(u.tasks)&&u.tasks.forEach(i=>o.tasks.unshift(i)),$(`Imported ${u.importedCount} tasks successfully! (${u.skippedCount} skipped duplicates)`),m(),o.selectedDate=q,U()}catch(u){$(u.message,!0),M.disabled=!1,M.textContent="Retry Import"}}}async function Me(){const d=A(o.selectedDate),a=W(d,je()),n=kt(o.selectedDate),m=2,v=800,T=160,N=90,k=74,F=70,M=Math.max(120,d.length*k),_=T+N+M+F,z=document.createElement("canvas");z.width=v*m,z.height=_*m;const x=z.getContext("2d");x.scale(m,m);const q=document.documentElement.getAttribute("data-theme")==="dark",D=q?"#0F172A":"#F8FAFC",G=q?"#1E293B":"#FFFFFF",l=q?"#334155":"#E2E8F0",u=q?"#F8FAFC":"#0F172A",i=q?"#94A3B8":"#475569",r="#4F46E5",w="#10B981",R="#F59E0B";x.fillStyle=D,x.fillRect(0,0,v,_),x.fillStyle=G,ze(x,24,20,v-48,T-30,16),x.fill(),x.strokeStyle=l,x.lineWidth=1,x.stroke(),x.fillStyle=r,x.font="bold 12px Inter, sans-serif",x.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),x.fillStyle=u,x.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',x.fillText(n,44,86),x.fillStyle=i,x.font="13px Inter, sans-serif",x.fillText(`Planned focus list · ${a.completed} of ${a.total} tasks completed (${a.percent}%)`,44,114);const C=T+6;x.fillStyle=G,ze(x,24,C,v-48,N-16,12),x.fill(),x.stroke();const V=[{label:"TOTAL TASKS",val:String(a.total),color:u},{label:"COMPLETED",val:String(a.completed),color:w},{label:"IN PROGRESS",val:String(a.inProgress),color:R},{label:"PENDING",val:String(a.pending),color:i},{label:"PROGRESS",val:`${a.percent}%`,color:r}],ae=(v-48)/V.length;V.forEach((O,ce)=>{const ne=24+ce*ae+20;x.fillStyle=O.color,x.font="bold 20px Inter, sans-serif",x.fillText(O.val,ne,C+36),x.fillStyle=i,x.font="10px Inter, sans-serif",x.fillText(O.label,ne,C+54)});const H=C+N;x.fillStyle=G,ze(x,24,H,v-48,M+10,16),x.fill(),x.stroke(),d.length===0?(x.fillStyle=i,x.font="14px Inter, sans-serif",x.textAlign="center",x.fillText("No scheduled tasks recorded for this date.",v/2,H+60),x.textAlign="left"):d.forEach((O,ce)=>{const ne=H+16+ce*k,se=O.status==="Completed";x.beginPath(),x.arc(48,ne+14,10,0,Math.PI*2),se?(x.fillStyle=w,x.fill(),x.strokeStyle="#FFFFFF",x.lineWidth=2,x.beginPath(),x.moveTo(44,ne+14),x.lineTo(47,ne+17),x.lineTo(52,ne+11),x.stroke()):(x.strokeStyle=l,x.lineWidth=2,x.stroke()),x.fillStyle=se?i:u,x.font=`${se?"normal":"500"} 14px Inter, sans-serif`;const ue=O.title.length>55?O.title.slice(0,52)+"...":O.title;if(x.fillText(ue,70,ne+18),se){const Be=x.measureText(ue);x.strokeStyle=i,x.lineWidth=1.2,x.beginPath(),x.moveTo(70,ne+14),x.lineTo(70+Be.width,ne+14),x.stroke()}const J=O.priority||"Medium";let ie="#E2E8F0",be="#334155";J==="Urgent"?(ie="#FEE2E2",be="#DC2626"):J==="High"?(ie="#FEF3C7",be="#D97706"):J==="Low"&&(ie="#ECFDF5",be="#059669"),x.fillStyle=ie,ze(x,v-150,ne+4,60,20,10),x.fill(),x.fillStyle=be,x.font="bold 10px Inter, sans-serif",x.fillText(J,v-138,ne+18);const pe=O.createdByName||O.createdBy?.name||(O.createdBy?.email?O.createdBy.email.split("@")[0]:"")||O.personnelId?.name||O.userId?.name||"Member",me=O.completionDateStr||O.dateStr||"",_e=[];_e.push(`✍️ Added by: ${pe}`),me&&_e.push(`📅 Due: ${Te(me)}`),O.dueTime&&_e.push(`🕒 ${O.dueTime}`),O.category&&O.category!=="General"&&_e.push(`#${O.category}`);const Fe=_e.join("   ·   ");x.fillStyle=i,x.font="11px Inter, sans-serif",x.fillText(Fe,70,ne+36),ce<d.length-1&&(x.strokeStyle=l,x.lineWidth=.6,x.beginPath(),x.moveTo(40,ne+54),x.lineTo(v-40,ne+54),x.stroke())});const j=_-35;x.fillStyle=i,x.font="11px Inter, sans-serif",x.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,j);try{const O=z.toDataURL("image/png"),ce=document.createElement("a");ce.href=O,ce.download=`ci360-daily-planner-${o.selectedDate}.png`,document.body.appendChild(ce),ce.click(),ce.remove(),$("Daily Planner image exported! 🖼️")}catch(O){$("Failed to export image: "+O.message,!0)}}function ze(d,a,n,m,v,T){d.beginPath(),d.moveTo(a+T,n),d.lineTo(a+m-T,n),d.quadraticCurveTo(a+m,n,a+m,n+T),d.lineTo(a+m,n+v-T),d.quadraticCurveTo(a+m,n+v,a+m-T,n+v),d.lineTo(a+T,n+v),d.quadraticCurveTo(a,n+v,a,n+v-T),d.lineTo(a,n+T),d.quadraticCurveTo(a,n,a+T,n),d.closePath()}function le(d={}){const a=Mt(o.selectedDate,c.weekStartsOn),n=kt(a[0]),m=kt(a[6]),v=je();let T=o.tasks.filter(D=>{if(D.isDeleted===!0)return!1;const G=D.completionDateStr||D.dateStr||(D.dueDate?new Date(D.dueDate).toISOString().slice(0,10):""),l=D.assignedDateStr||(D.assignedDate?new Date(D.assignedDate).toISOString().slice(0,10):"")||G;return d.scope==="today"?G===v||l===v:d.scope==="all"?!0:D.status==="In Progress"&&l&&G?a.some(u=>u>=l&&u<=G):a.includes(G)||a.includes(l)});d.personnelId&&d.personnelId!=="all"&&(T=T.filter(D=>{const G=String(D.personnelId?._id||D.personnelId||""),l=Array.isArray(D.coOwners)&&D.coOwners.some(u=>String(u.personnelId?._id||u.personnelId||u.userId?._id||u.userId||"")===String(d.personnelId));return G===String(d.personnelId)||l})),d.status&&d.status!=="all"&&(T=T.filter(D=>D.status===d.status));const N=T.length,k=T.filter(D=>D.status==="Completed").length,F=T.filter(D=>D.status==="In Progress").length,M=N>0?Math.round(k/N*100):0,_=window.open("","_blank");if(!_){$("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const z=d.title||(d.isAdminReport?"CI360 Admin Detailed Executive Report":"Weekly Productivity Report"),x=d.scope==="today"?`Date: ${kt(v)}`:d.scope==="all"?"All Active & Historical Tasks":`${n} – ${m}`,q=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${y(z)} — ${x}</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.4; padding: 12px; margin: 0; }
          .header { border-bottom: 2.5px solid #4f46e5; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
          .brand { font-size: 11px; font-weight: 800; color: #4f46e5; letter-spacing: 0.6px; text-transform: uppercase; }
          h1 { margin: 4px 0 2px; font-size: 22px; color: #0f172a; }
          .period { font-size: 13px; color: #475569; font-weight: 500; }
          .filter-tag { display: inline-block; font-size: 11px; color: #4338ca; background: #e0e7ff; padding: 2px 8px; border-radius: 4px; font-weight: 600; margin-left: 8px; }
          
          .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 18px; }
          .kpi { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; }
          .kpi-num { font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 3px; }
          .kpi-label { font-size: 10.5px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.3px; }
          
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11.5px; }
          th { text-align: left; background: #f1f5f9; padding: 8px 10px; border: 1px solid #cbd5e1; font-weight: 700; color: #334155; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3px; }
          td { padding: 8px 10px; border: 1px solid #e2e8f0; vertical-align: top; }
          tr:nth-child(even) td { background: #fbfcfe; }
          
          .client-tag { display: inline-block; background: #ecfdf5; color: #047857; font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 10.5px; border: 1px solid #a7f3d0; }
          .owner-tag { font-weight: 700; color: #1e293b; }
          .co-owner-sub { font-size: 10px; color: #6366f1; font-weight: 600; display: block; margin-top: 2px; }
          .desc-text { font-size: 10.5px; color: #475569; white-space: pre-wrap; line-height: 1.35; max-width: 280px; word-break: break-word; }
          
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; }
          .badge-urgent { background: #fee2e2; color: #b91c1c; }
          .badge-high { background: #fef3c7; color: #b45309; }
          .badge-med { background: #e0e7ff; color: #4338ca; }
          .badge-low { background: #ecfdf5; color: #047857; }
          
          .status-tag { display: inline-block; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; font-weight: 700; }
          .status-completed { background: #dcfce7; color: #15803d; }
          .status-in-progress { background: #fef3c7; color: #b45309; }
          .status-pending { background: #f1f5f9; color: #475569; }
          
          .footer { margin-top: 24px; font-size: 10.5px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 8px; display: flex; justify-content: space-between; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">CI360 Intelligence Productivity Suite · Official Report</div>
            <h1>${y(z)}</h1>
            <div class="period">
              ${x}
              ${d.filterSummary?`<span class="filter-tag">${y(d.filterSummary)}</span>`:""}
            </div>
          </div>
          <div style="text-align:right" class="no-print">
            <button onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:13px;box-shadow:0 2px 4px rgba(79,70,229,0.3);">🖨️ Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${N}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${k}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">In Progress</div>
            <div class="kpi-num" style="color:#f59e0b">${F}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${M}%</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width:11%">Date</th>
              <th style="width:13%">Client Name</th>
              <th style="width:15%">Job Owner / Assignee</th>
              <th style="width:18%">Task Title</th>
              <th style="width:23%">Description / Deliverables</th>
              <th style="width:8%">Priority</th>
              <th style="width:12%">Status</th>
            </tr>
          </thead>
          <tbody>
            ${T.length===0?`
              <tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;font-weight:600">No scheduled tasks match the selected criteria.</td></tr>
            `:T.map(D=>{const G=D.completionDateStr||D.dateStr||(D.dueDate?new Date(D.dueDate).toISOString().slice(0,10):"—"),l=D.assignedDateStr||(D.assignedDate?new Date(D.assignedDate).toISOString().slice(0,10):""),u=D.status==="In Progress"&&l&&G&&l!==G?`${Te(l)} ➔ ${Te(G)}`:Te(G),i=D.jobId?.preferredPersonName||D.jobId?.assignments&&D.jobId.assignments[0]?.personId?.name||D.personnelId?.name||D.userId?.name||D.createdByName||"—",r=D.clientId?.name||D.jobId?.clientId?.name||D.clientId?.company||""||"—",w=D.description?y(D.description):'<span style="color:#cbd5e1">—</span>',R=Array.isArray(D.coOwners)&&D.coOwners.length>0?D.coOwners.map(H=>H.name).filter(Boolean).join(", "):"",C=(D.priority||"medium").toLowerCase(),V=C==="urgent"?"badge-urgent":C==="high"?"badge-high":C==="low"?"badge-low":"badge-med",ae=(D.status||"pending").toLowerCase().replace(/\s+/g,"-");return`
                <tr>
                  <td><strong>${u}</strong></td>
                  <td><span class="client-tag">${y(r)}</span></td>
                  <td>
                    <span class="owner-tag">${y(i)}</span>
                    ${R?`<span class="co-owner-sub">👥 Co: ${y(R)}</span>`:""}
                  </td>
                  <td><strong>${y(D.title)}</strong></td>
                  <td><div class="desc-text">${w}</div></td>
                  <td><span class="badge ${V}">${y(D.priority||"Medium")}</span></td>
                  <td><span class="status-tag status-${ae}">${y(D.status||"Pending")}</span></td>
                </tr>
              `}).join("")}
          </tbody>
        </table>

        <div class="footer">
          <span>Generated automatically by CI360 Daily Planner & Task Manager</span>
          <span>Printed on: ${new Date().toLocaleString()}</span>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
          };
        <\/script>
      </body>
      </html>
    `;_.document.write(q),_.document.close(),$("Report generated for printing & PDF download! 📄")}function nt(){const d=je(),a=Mt(o.selectedDate,c.weekStartsOn),n=Te(a[0]),m=Te(a[6]),v=`
      <div class="ci360-planner-modal" style="max-width:540px;">
        <div class="ci360-modal-header">
          <h3>📊 Download Specific Admin Report</h3>
          <button type="button" class="ci360-modal-close" id="btnAdminRepClose">×</button>
        </div>

        <div class="ci360-modal-form">
          <p style="font-size:12.5px;color:var(--text-3);margin:0 0 16px;">
            Export a comprehensive administrative report containing full <strong>Task Descriptions</strong>, <strong>Client Names</strong>, <strong>Job Owners</strong>, and <strong>Co-Owners</strong>.
          </p>

          <!-- Report Scope -->
          <div class="form-group">
            <label for="admRepScope">Date Range / Scope</label>
            <select id="admRepScope" class="input">
              <option value="week" selected>Current Week (${n} – ${m})</option>
              <option value="today">Today Only (${Te(d)})</option>
              <option value="all">All Available Tasks</option>
            </select>
          </div>

          <!-- Employee Filter -->
          <div class="form-group">
            <label for="admRepPersonnel">Filter by Employee / Person</label>
            <select id="admRepPersonnel" class="input">
              <option value="all">👥 All Team Members</option>
              ${o.personnelList.map(x=>`
                <option value="${x._id}">👤 ${y(x.name)} (${y(x.department||x.role||"Member")})</option>
              `).join("")}
            </select>
          </div>

          <!-- Status Filter -->
          <div class="form-group">
            <label for="admRepStatus">Filter by Status</label>
            <select id="admRepStatus" class="input">
              <option value="all" selected>All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <!-- Feature Highlights Checklist -->
          <div style="background:var(--bg-hover);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:10px 14px;margin-bottom:18px;font-size:12px;color:var(--text-2);">
            <div style="font-weight:700;margin-bottom:4px;color:var(--text-1);">Included in this export:</div>
            <div>✓ <strong>Job Owner Name</strong> & Primary Assignee</div>
            <div>✓ <strong>Client Name</strong> & Account association</div>
            <div>✓ Full <strong>Task Description / Notes</strong></div>
            <div>✓ Multiple <strong>Co-Owners & Collaborators</strong></div>
            <div>✓ Priority, Category, and Real-time Status</div>
          </div>

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <button type="button" class="ci360-btn-secondary" id="btnAdminRepCancel">Cancel</button>
            <div style="display:flex;gap:8px;">
              <button type="button" class="btn small" id="btnAdminRepCsv" style="background:#059669;color:#fff;font-weight:700;border:none;border-radius:var(--r-sm);padding:8px 14px;cursor:pointer;">
                📊 Export CSV / Excel
              </button>
              <button type="button" class="ci360-btn-primary" id="btnAdminRepPdf" style="font-weight:700;padding:8px 16px;">
                📄 Download Admin PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    `,T=qt(v),N=T.querySelector("#btnAdminRepClose"),k=T.querySelector("#btnAdminRepCancel"),F=T.querySelector("#btnAdminRepPdf"),M=T.querySelector("#btnAdminRepCsv"),_=()=>T.remove();N&&(N.onclick=_),k&&(k.onclick=_);const z=()=>{const x=T.querySelector("#admRepScope")?.value||"week",q=T.querySelector("#admRepPersonnel")?.value||"all",D=T.querySelector("#admRepStatus")?.value||"all";let G="";if(q!=="all"){const l=o.personnelList.find(u=>String(u._id)===String(q));l&&(G+=`Person: ${l.name} · `)}return D!=="all"&&(G+=`Status: ${D}`),{scope:x,personnelId:q,status:D,filterSummary:G.replace(/\s*·\s*$/,"")}};F&&(F.onclick=()=>{const x=z();_(),le({...x,isAdminReport:!0,title:"CI360 Admin Detailed Executive Task Report"})}),M&&(M.onclick=()=>{const x=z();_(),he(x)})}function he(d={}){const a=Mt(o.selectedDate,c.weekStartsOn),n=je();let m=o.tasks.filter(_=>{if(_.isDeleted===!0)return!1;const z=_.completionDateStr||_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):""),x=_.assignedDateStr||(_.assignedDate?new Date(_.assignedDate).toISOString().slice(0,10):"")||z;return d.scope==="today"?z===n||x===n:d.scope==="all"?!0:_.status==="In Progress"&&x&&z?a.some(q=>q>=x&&q<=z):a.includes(z)||a.includes(x)});d.personnelId&&d.personnelId!=="all"&&(m=m.filter(_=>{const z=String(_.personnelId?._id||_.personnelId||""),x=Array.isArray(_.coOwners)&&_.coOwners.some(q=>String(q.personnelId?._id||q.personnelId||"")===String(d.personnelId));return z===String(d.personnelId)||x})),d.status&&d.status!=="all"&&(m=m.filter(_=>_.status===d.status));const v=["Date","Client Name","Job Owner","Primary Assignee","Co-Owners","Task Title","Description","Priority","Category","Status","Created By"],T=m.map(_=>{const z=_.completionDateStr||_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):""),x=_.jobId?.preferredPersonName||_.jobId?.assignments&&_.jobId.assignments[0]?.personId?.name||_.personnelId?.name||_.userId?.name||_.createdByName||"",q=_.clientId?.name||_.jobId?.clientId?.name||_.clientId?.company||"",D=_.personnelId?.name||_.userId?.name||"",G=Array.isArray(_.coOwners)?_.coOwners.map(V=>V.name).filter(Boolean).join("; "):"",l=_.title||"",u=_.description||"",i=_.priority||"Medium",r=_.category||"General",w=_.status||"Pending",R=_.createdByName||_.createdBy?.name||"",C=V=>`"${String(V||"").replace(/"/g,'""').replace(/\r?\n/g," ")}"`;return[C(z),C(q),C(x),C(D),C(G),C(l),C(u),C(i),C(r),C(w),C(R)].join(",")}),N="\uFEFF"+[v.join(","),...T].join(`\r
`),k=new Blob([N],{type:"text/csv;charset=utf-8;"}),F=URL.createObjectURL(k),M=document.createElement("a");M.href=F,M.download=`ci360-admin-report-${n}.csv`,document.body.appendChild(M),M.click(),document.body.removeChild(M),URL.revokeObjectURL(F),$("Admin CSV report downloaded! 📊")}function st(){const a=qt(`
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
    `),n=()=>a.remove();a.querySelector("#btnBackupClose").onclick=n;const m=a.querySelector("#btnDownloadBackupJson");m.onclick=async()=>{m.disabled=!0,m.textContent="Generating backup...";try{const M=await Re("/tasks/backup"),_=new Blob([JSON.stringify(M,null,2)],{type:"application/json"}),z=URL.createObjectURL(_),x=document.createElement("a");x.href=z,x.download=`ci360-planner-backup-${je()}.json`,document.body.appendChild(x),x.click(),x.remove(),$("Planner backup downloaded successfully! 💾")}catch(M){$("Backup export failed: "+M.message,!0)}finally{m.disabled=!1,m.textContent="Download JSON Backup"}};const v=a.querySelector("#restoreFileInput"),T=a.querySelector("#restorePreviewArea"),N=a.querySelector("#restoreCountText"),k=a.querySelector("#btnExecuteRestore");let F=null;v.onchange=M=>{const _=M.target.files[0];if(!_)return;const z=new FileReader;z.onload=x=>{try{const q=JSON.parse(x.target.result),D=Array.isArray(q.tasks)?q.tasks:Array.isArray(q)?q:null;if(!D||D.length===0){$("Invalid backup file: No tasks found",!0);return}F=D,T.style.display="block",N.textContent=`Valid backup: ${D.length} tasks ready to restore.`,k.disabled=!1}catch(q){$("Error parsing JSON backup file: "+q.message,!0),T.style.display="none",k.disabled=!0}},z.readAsText(_)},k.onclick=async()=>{if(!F||F.length===0)return;k.disabled=!0,k.textContent="Restoring...";const M=a.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const _=await Ie("/tasks/restore",{tasks:F,mode:M});$(`Restored ${_.restoredCount} tasks! (${_.skippedCount} skipped) ✨`),n(),await B()}catch(_){$("Restore failed: "+_.message,!0),k.disabled=!1,k.textContent="Retry Restore"}}}function ot(){const d=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${y(c.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${c.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${c.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${y(c.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${c.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${c.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${c.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${c.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${c.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${c.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${c.soundEnabled?"checked":""}>
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
    `,a=qt(d),n=()=>a.remove();a.querySelector("#btnSettingsClose").onclick=n,a.querySelector("#btnCancelSettings").onclick=n;const m=a.querySelector("#btnPlannerTestNotif");m&&(m.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await requestNotificationPermission()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):$("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true");const v=a.querySelector("#setNotifEnabled");v&&(v.checked=!0);const T=a.querySelector("#plannerNotifStatusLabel");T&&(T.textContent="🟢 Active on this laptop"),await triggerSystemNotification({title:"CI360 Planner Alert 🔔",message:"Laptop & browser notifications are active and ready!",id:"ci360-planner-test-"+Date.now()}),$("Test notification sent to your laptop/browser! 🔔")}),a.querySelector("#settingsForm").onsubmit=v=>{v.preventDefault(),c.displayName=a.querySelector("#setDisplayName").value.trim()||"Daily Planner",c.weekStartsOn=Number(a.querySelector("#setWeekStart").value),c.defaultPriority=a.querySelector("#setDefaultPriority").value,c.density=a.querySelector("#setDensity").value,c.soundEnabled=a.querySelector("#setSound").checked;const T=a.querySelector("#setNotifEnabled")?.checked;localStorage.setItem("ci360_notif_enabled",T?"true":"false"),T&&"Notification"in window&&Notification.permission==="default"&&requestNotificationPermission(),_a(c),$("Planner preferences saved! ⚙️"),n(),U()}}}function Da(){if(document.getElementById("ci360-planner-styles"))return;const s=document.createElement("style");s.id="ci360-planner-styles",s.textContent=`
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
      border: 1px solid var(--border-sm);
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
      border: 1px solid #E2E8F0;
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
  `,document.head.appendChild(s)}function Ea(s){return s!==null?{comment:s,variations:[]}:{variations:[]}}function Ta(s,t,e,p,f){const g={move:s,variations:f};return t&&(g.suffix=t),e&&(g.nag=e),p!==null&&(g.comment=p),g}function Pa(...s){const[t,...e]=s;let p=t;for(const f of e)f!==null&&(p.variations=[f,...f.variations],f.variations=[],p=f);return t}function Fa(s,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const p=e.variations[0];if(!p){e.comment=t.marker.comment;break}e=p}}return{headers:s,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function La(s,t){function e(){this.constructor=s}e.prototype=t.prototype,s.prototype=new e}function Dt(s,t,e,p){var f=Error.call(this,s);return Object.setPrototypeOf&&Object.setPrototypeOf(f,Dt.prototype),f.expected=t,f.found=e,f.location=p,f.name="SyntaxError",f}La(Dt,Error);function ia(s,t,e){return e=e||" ",s.length>t?s:(t-=s.length,e+=e.repeat(t),s+e.slice(0,t))}Dt.prototype.format=function(s){var t="Error: "+this.message;if(this.location){var e=null,p;for(p=0;p<s.length;p++)if(s[p].source===this.location.source){e=s[p].text.split(/\r\n|\n|\r/g);break}var f=this.location.start,g=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(f):f,c=this.location.source+":"+g.line+":"+g.column;if(e){var o=this.location.end,B=ia("",g.line.toString().length," "),Y=e[f.line-1],A=f.line===o.line?o.column:Y.length+1,E=A-f.column||1;t+=`
 --> `+c+`
`+B+` |
`+g.line+" | "+Y+`
`+B+" | "+ia("",f.column-1," ")+ia("",E,"^")}else t+=`
 at `+c}return t};Dt.buildMessage=function(s,t){var e={literal:function(Y){return'"'+f(Y.text)+'"'},class:function(Y){var A=Y.parts.map(function(E){return Array.isArray(E)?g(E[0])+"-"+g(E[1]):g(E)});return"["+(Y.inverted?"^":"")+A.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(Y){return Y.description}};function p(Y){return Y.charCodeAt(0).toString(16).toUpperCase()}function f(Y){return Y.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(A){return"\\x0"+p(A)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(A){return"\\x"+p(A)})}function g(Y){return Y.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(A){return"\\x0"+p(A)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(A){return"\\x"+p(A)})}function c(Y){return e[Y.type](Y)}function o(Y){var A=Y.map(c),E,W;if(A.sort(),A.length>0){for(E=1,W=1;E<A.length;E++)A[E-1]!==A[E]&&(A[W]=A[E],W++);A.length=W}switch(A.length){case 1:return A[0];case 2:return A[0]+" or "+A[1];default:return A.slice(0,-1).join(", ")+", or "+A[A.length-1]}}function B(Y){return Y?'"'+f(Y)+'"':"end of input"}return"Expected "+o(s)+" but "+B(t)+" found."};function qa(s,t){t=t!==void 0?t:{};var e={},p=t.grammarSource,f={pgn:Pt},g=Pt,c="[",o='"',B="]",Y=".",A="O-O-O",E="O-O",W="0-0-0",U="0-0",ge="$",xe="{",Ke="}",Ze=";",rt="(",Ct=")",at="1-0",Pe="0-1",it="1/2-1/2",ut="*",Ue=/^[a-zA-Z]/,ct=/^[^"]/,Me=/^[0-9]/,ze=/^[.]/,le=/^[a-zA-Z1-8\-=]/,nt=/^[+#]/,he=/^[!?]/,st=/^[^}]/,ot=/^[^\r\n]/,d=/^[ \t\r\n]/,a=Je("tag pair"),n=qe("[",!1),m=qe('"',!1),v=qe("]",!1),T=Je("tag name"),N=et([["a","z"],["A","Z"]],!1,!1),k=Je("tag value"),F=et(['"'],!0,!1),M=Je("move number"),_=et([["0","9"]],!1,!1),z=qe(".",!1),x=et(["."],!1,!1),q=Je("standard algebraic notation"),D=qe("O-O-O",!1),G=qe("O-O",!1),l=qe("0-0-0",!1),u=qe("0-0",!1),i=et([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),r=et(["+","#"],!1,!1),w=Je("suffix annotation"),R=et(["!","?"],!1,!1),C=Je("NAG"),V=qe("$",!1),ae=Je("brace comment"),H=qe("{",!1),j=et(["}"],!0,!1),O=qe("}",!1),ce=Je("rest of line comment"),ne=qe(";",!1),se=et(["\r",`
`],!0,!1),ue=Je("variation"),J=qe("(",!1),ie=qe(")",!1),be=Je("game termination marker"),pe=qe("1-0",!1),me=qe("0-1",!1),_e=qe("1/2-1/2",!1),Fe=qe("*",!1),Be=Je("whitespace"),Le=et([" ","	","\r",`
`],!1,!1),de=function(h,I){return Fa(h,I)},De=function(h){return Object.fromEntries(h)},He=function(h,I){return[h,I]},Ne=function(h,I){return{root:h,marker:I}},Ee=function(h,I){return Pa(Ea(h),...I.flat())},ye=function(h,I,S,X,Z){return Ta(h,I,S,X,Z)},Ae=function(h){return h},ke=function(h){return h.replace(/[\r\n]+/g," ")},fe=function(h){return h.trim()},L=function(h){return h},K=function(h,I){return{result:h,comment:I}},b=t.peg$currPos|0,we=[{line:1,column:1}],$e=b,lt=t.peg$maxFailExpected||[],Q=t.peg$silentFails|0,ht;if(t.startRule){if(!(t.startRule in f))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');g=f[t.startRule]}function qe(h,I){return{type:"literal",text:h,ignoreCase:I}}function et(h,I,S){return{type:"class",parts:h,inverted:I,ignoreCase:S}}function It(){return{type:"end"}}function Je(h){return{type:"other",description:h}}function Et(h){var I=we[h],S;if(I)return I;if(h>=we.length)S=we.length-1;else for(S=h;!we[--S];);for(I=we[S],I={line:I.line,column:I.column};S<h;)s.charCodeAt(S)===10?(I.line++,I.column=1):I.column++,S++;return we[h]=I,I}function Tt(h,I,S){var X=Et(h),Z=Et(I),Se={source:p,start:{offset:h,line:X.line,column:X.column},end:{offset:I,line:Z.line,column:Z.column}};return Se}function ee(h){b<$e||(b>$e&&($e=b,lt=[]),lt.push(h))}function jt(h,I,S){return new Dt(Dt.buildMessage(h,I),h,I,S)}function Pt(){var h,I,S;return h=b,I=ea(),S=ta(),h=de(I,S),h}function ea(){var h,I,S;for(h=b,I=[],S=vt();S!==e;)I.push(S),S=vt();return S=Ce(),h=De(I),h}function vt(){var h,I,S,X,Z,Se,pt;return Q++,h=b,Ce(),s.charCodeAt(b)===91?(I=c,b++):(I=e,Q===0&&ee(n)),I!==e?(Ce(),S=Ot(),S!==e?(Ce(),s.charCodeAt(b)===34?(X=o,b++):(X=e,Q===0&&ee(m)),X!==e?(Z=Ut(),s.charCodeAt(b)===34?(Se=o,b++):(Se=e,Q===0&&ee(m)),Se!==e?(Ce(),s.charCodeAt(b)===93?(pt=B,b++):(pt=e,Q===0&&ee(v)),pt!==e?h=He(S,Z):(b=h,h=e)):(b=h,h=e)):(b=h,h=e)):(b=h,h=e)):(b=h,h=e),Q--,h===e&&Q===0&&ee(a),h}function Ot(){var h,I,S;if(Q++,h=b,I=[],S=s.charAt(b),Ue.test(S)?b++:(S=e,Q===0&&ee(N)),S!==e)for(;S!==e;)I.push(S),S=s.charAt(b),Ue.test(S)?b++:(S=e,Q===0&&ee(N));else I=e;return I!==e?h=s.substring(h,b):h=I,Q--,h===e&&(I=e,Q===0&&ee(T)),h}function Ut(){var h,I,S;for(Q++,h=b,I=[],S=s.charAt(b),ct.test(S)?b++:(S=e,Q===0&&ee(F));S!==e;)I.push(S),S=s.charAt(b),ct.test(S)?b++:(S=e,Q===0&&ee(F));return h=s.substring(h,b),Q--,I=e,Q===0&&ee(k),h}function ta(){var h,I,S;return h=b,I=Ht(),Ce(),S=ve(),S===e&&(S=null),Ce(),h=Ne(I,S),h}function Ht(){var h,I,S,X;for(h=b,I=Gt(),I===e&&(I=null),S=[],X=Ft();X!==e;)S.push(X),X=Ft();return h=Ee(I,S),h}function Ft(){var h,I,S,X,Z,Se,pt,At;if(h=b,Ce(),_t(),Ce(),I=Lt(),I!==e){for(S=gt(),S===e&&(S=null),X=[],Z=xt();Z!==e;)X.push(Z),Z=xt();for(Z=Ce(),Se=Gt(),Se===e&&(Se=null),pt=[],At=te();At!==e;)pt.push(At),At=te();h=ye(I,S,X,Se,pt)}else b=h,h=e;return h}function _t(){var h,I,S,X,Z,Se;for(Q++,h=b,I=[],S=s.charAt(b),Me.test(S)?b++:(S=e,Q===0&&ee(_));S!==e;)I.push(S),S=s.charAt(b),Me.test(S)?b++:(S=e,Q===0&&ee(_));if(s.charCodeAt(b)===46?(S=Y,b++):(S=e,Q===0&&ee(z)),S!==e){for(X=Ce(),Z=[],Se=s.charAt(b),ze.test(Se)?b++:(Se=e,Q===0&&ee(x));Se!==e;)Z.push(Se),Se=s.charAt(b),ze.test(Se)?b++:(Se=e,Q===0&&ee(x));I=[I,S,X,Z],h=I}else b=h,h=e;return Q--,h===e&&(I=e,Q===0&&ee(M)),h}function Lt(){var h,I,S,X,Z,Se;if(Q++,h=b,I=b,s.substr(b,5)===A?(S=A,b+=5):(S=e,Q===0&&ee(D)),S===e&&(s.substr(b,3)===E?(S=E,b+=3):(S=e,Q===0&&ee(G)),S===e&&(s.substr(b,5)===W?(S=W,b+=5):(S=e,Q===0&&ee(l)),S===e&&(s.substr(b,3)===U?(S=U,b+=3):(S=e,Q===0&&ee(u)),S===e))))if(S=b,X=s.charAt(b),Ue.test(X)?b++:(X=e,Q===0&&ee(N)),X!==e){if(Z=[],Se=s.charAt(b),le.test(Se)?b++:(Se=e,Q===0&&ee(i)),Se!==e)for(;Se!==e;)Z.push(Se),Se=s.charAt(b),le.test(Se)?b++:(Se=e,Q===0&&ee(i));else Z=e;Z!==e?(X=[X,Z],S=X):(b=S,S=e)}else b=S,S=e;return S!==e?(X=s.charAt(b),nt.test(X)?b++:(X=e,Q===0&&ee(r)),X===e&&(X=null),S=[S,X],I=S):(b=I,I=e),I!==e?h=s.substring(h,b):h=I,Q--,h===e&&(I=e,Q===0&&ee(q)),h}function gt(){var h,I,S;for(Q++,h=b,I=[],S=s.charAt(b),he.test(S)?b++:(S=e,Q===0&&ee(R));S!==e;)I.push(S),I.length>=2?S=e:(S=s.charAt(b),he.test(S)?b++:(S=e,Q===0&&ee(R)));return I.length<1?(b=h,h=e):h=I,Q--,h===e&&(I=e,Q===0&&ee(w)),h}function xt(){var h,I,S,X,Z;if(Q++,h=b,Ce(),s.charCodeAt(b)===36?(I=ge,b++):(I=e,Q===0&&ee(V)),I!==e){if(S=b,X=[],Z=s.charAt(b),Me.test(Z)?b++:(Z=e,Q===0&&ee(_)),Z!==e)for(;Z!==e;)X.push(Z),Z=s.charAt(b),Me.test(Z)?b++:(Z=e,Q===0&&ee(_));else X=e;X!==e?S=s.substring(S,b):S=X,S!==e?h=Ae(S):(b=h,h=e)}else b=h,h=e;return Q--,h===e&&Q===0&&ee(C),h}function Gt(){var h;return h=Wt(),h===e&&(h=P()),h}function Wt(){var h,I,S,X,Z;if(Q++,h=b,s.charCodeAt(b)===123?(I=xe,b++):(I=e,Q===0&&ee(H)),I!==e){for(S=b,X=[],Z=s.charAt(b),st.test(Z)?b++:(Z=e,Q===0&&ee(j));Z!==e;)X.push(Z),Z=s.charAt(b),st.test(Z)?b++:(Z=e,Q===0&&ee(j));S=s.substring(S,b),s.charCodeAt(b)===125?(X=Ke,b++):(X=e,Q===0&&ee(O)),X!==e?h=ke(S):(b=h,h=e)}else b=h,h=e;return Q--,h===e&&(I=e,Q===0&&ee(ae)),h}function P(){var h,I,S,X,Z;if(Q++,h=b,s.charCodeAt(b)===59?(I=Ze,b++):(I=e,Q===0&&ee(ne)),I!==e){for(S=b,X=[],Z=s.charAt(b),ot.test(Z)?b++:(Z=e,Q===0&&ee(se));Z!==e;)X.push(Z),Z=s.charAt(b),ot.test(Z)?b++:(Z=e,Q===0&&ee(se));S=s.substring(S,b),h=fe(S)}else b=h,h=e;return Q--,h===e&&(I=e,Q===0&&ee(ce)),h}function te(){var h,I,S,X;return Q++,h=b,Ce(),s.charCodeAt(b)===40?(I=rt,b++):(I=e,Q===0&&ee(J)),I!==e?(S=Ht(),S!==e?(Ce(),s.charCodeAt(b)===41?(X=Ct,b++):(X=e,Q===0&&ee(ie)),X!==e?h=L(S):(b=h,h=e)):(b=h,h=e)):(b=h,h=e),Q--,h===e&&Q===0&&ee(ue),h}function ve(){var h,I,S;return Q++,h=b,s.substr(b,3)===at?(I=at,b+=3):(I=e,Q===0&&ee(pe)),I===e&&(s.substr(b,3)===Pe?(I=Pe,b+=3):(I=e,Q===0&&ee(me)),I===e&&(s.substr(b,7)===it?(I=it,b+=7):(I=e,Q===0&&ee(_e)),I===e&&(s.charCodeAt(b)===42?(I=ut,b++):(I=e,Q===0&&ee(Fe))))),I!==e?(Ce(),S=Gt(),S===e&&(S=null),h=K(I,S)):(b=h,h=e),Q--,h===e&&(I=e,Q===0&&ee(be)),h}function Ce(){var h,I;for(Q++,h=[],I=s.charAt(b),d.test(I)?b++:(I=e,Q===0&&ee(Le));I!==e;)h.push(I),I=s.charAt(b),d.test(I)?b++:(I=e,Q===0&&ee(Le));return Q--,I=e,Q===0&&ee(Be),h}if(ht=g(),t.peg$library)return{peg$result:ht,peg$currPos:b,peg$FAILED:e,peg$maxFailExpected:lt,peg$maxFailPos:$e};if(ht!==e&&b===s.length)return ht;throw ht!==e&&b<s.length&&ee(It()),jt(lt,$e<s.length?s.charAt($e):null,$e<s.length?Tt($e,$e+1):Tt($e,$e))}/**
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
 */const Qt=0xffffffffffffffffn;function na(s,t){return(s<<t|s>>64n-t)&0xffffffffffffffffn}function ha(s,t){return s*t&Qt}function Ma(s){return function(){let t=BigInt(s&Qt),e=BigInt(s>>64n&Qt);const p=ha(na(ha(t,5n),7n),9n);return e^=t,t=(na(t,24n)^e^e<<16n)&Qt,e=na(e,37n),s=e<<64n|t,p}}const Zt=Ma(0xa187eb39cdcaed8f31c4b365b102e01en),za=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Zt()))),Ra=Array.from({length:8},()=>Zt()),Ba=Array.from({length:16},()=>Zt()),oa=Zt(),Ye="w",tt="b",Oe="p",pa="n",Xt="b",Bt="r",ft="q",Ge="k",ra="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Vt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:p,piece:f,from:g,to:c,flags:o,captured:B,promotion:Y}=e,A=We(g),E=We(c);this.color=p,this.piece=f,this.from=A,this.to=E,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=A+E,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const W in re)re[W]&o&&(this.flags+=wt[W]);B&&(this.captured=B),Y&&(this.promotion=Y,this.lan+=Y)}isCapture(){return this.flags.indexOf(wt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(wt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(wt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(wt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(wt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(wt.BIG_PAWN)>-1}}const Ve=-1,wt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},re={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ua={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Na={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},ja={...ua,...Na},oe={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},sa={b:[16,32,17,15],w:[-16,-32,-17,-15]},va={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Oa=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ua=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ha={p:1,n:2,b:4,r:8,q:16,k:32},Ga="pnbrqkPNBRQK",xa=[pa,Xt,Bt,ft],Wa=7,Ka=6,Va=1,Ya=0,Yt={[Ge]:re.KSIDE_CASTLE,[ft]:re.QSIDE_CASTLE},bt={w:[{square:oe.a1,flag:re.QSIDE_CASTLE},{square:oe.h1,flag:re.KSIDE_CASTLE}],b:[{square:oe.a8,flag:re.QSIDE_CASTLE},{square:oe.h8,flag:re.KSIDE_CASTLE}]},Ja={b:Va,w:Ka},la="--";function St(s){return s>>4}function Nt(s){return s&15}function $a(s){return"0123456789".indexOf(s)!==-1}function We(s){const t=Nt(s),e=St(s);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function zt(s){return s===Ye?tt:Ye}function Qa(s){const t=s.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const p=parseInt(t[4],10);if(isNaN(p)||p<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const f=t[0].split("/");if(f.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let c=0;c<f.length;c++){let o=0,B=!1;for(let Y=0;Y<f[c].length;Y++)if($a(f[c][Y])){if(B)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};o+=parseInt(f[c][Y],10),B=!0}else{if(!/^[prnbqkPRNBQK]$/.test(f[c][Y]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};o+=1,B=!1}if(o!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const g=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:c,regex:o}of g){if(!o.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${c} king`};if((t[0].match(o)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${c} kings`}}return Array.from(f[0]+f[7]).some(c=>c.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Xa(s,t){const e=s.from,p=s.to,f=s.piece;let g=0,c=0,o=0;for(let B=0,Y=t.length;B<Y;B++){const A=t[B].from,E=t[B].to,W=t[B].piece;f===W&&e!==A&&p===E&&(g++,St(e)===St(A)&&c++,Nt(e)===Nt(A)&&o++)}return g>0?c>0&&o>0?We(e):o>0?We(e).charAt(1):We(e).charAt(0):""}function mt(s,t,e,p,f,g=void 0,c=re.NORMAL){const o=St(p);if(f===Oe&&(o===Wa||o===Ya))for(let B=0;B<xa.length;B++){const Y=xa[B];s.push({color:t,from:e,to:p,piece:f,captured:g,promotion:Y,flags:c|re.PROMOTION})}else s.push({color:t,from:e,to:p,piece:f,captured:g,flags:c})}function ya(s){let t=s.charAt(0);return t>="a"&&t<="h"?s.match(/[a-h]\d.*[a-h]\d/)?void 0:Oe:(t=t.toLowerCase(),t==="o"?Ge:t)}function da(s){return s.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ka{_board=new Array(128);_turn=Ye;_header={};_kings={w:Ve,b:Ve};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=ra,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Ve,b:Ve},this._turn=Ye,this._castling={w:0,b:0},this._epSquare=Ve,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...ja},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:p=!1}={}){let f=t.split(/\s+/);if(f.length>=2&&f.length<6){const o=["-","-","0","1"];t=f.concat(o.slice(-(6-f.length))).join(" ")}if(f=t.split(/\s+/),!e){const{ok:o,error:B}=Qa(t);if(!o)throw new Error(B)}const g=f[0];let c=0;this.clear({preserveHeaders:p});for(let o=0;o<g.length;o++){const B=g.charAt(o);if(B==="/")c+=8;else if($a(B))c+=parseInt(B,10);else{const Y=B<"a"?Ye:tt;this._put({type:B.toLowerCase(),color:Y},We(c)),c++}}this._turn=f[1],f[2].indexOf("K")>-1&&(this._castling.w|=re.KSIDE_CASTLE),f[2].indexOf("Q")>-1&&(this._castling.w|=re.QSIDE_CASTLE),f[2].indexOf("k")>-1&&(this._castling.b|=re.KSIDE_CASTLE),f[2].indexOf("q")>-1&&(this._castling.b|=re.QSIDE_CASTLE),this._epSquare=f[3]==="-"?Ve:oe[f[3]],this._halfMoves=parseInt(f[4],10),this._moveNumber=parseInt(f[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,p="";for(let c=oe.a8;c<=oe.h1;c++){if(this._board[c]){e>0&&(p+=e,e=0);const{color:o,type:B}=this._board[c];p+=o===Ye?B.toUpperCase():B.toLowerCase()}else e++;c+1&136&&(e>0&&(p+=e),c!==oe.h1&&(p+="/"),e=0,c+=8)}let f="";this._castling[Ye]&re.KSIDE_CASTLE&&(f+="K"),this._castling[Ye]&re.QSIDE_CASTLE&&(f+="Q"),this._castling[tt]&re.KSIDE_CASTLE&&(f+="k"),this._castling[tt]&re.QSIDE_CASTLE&&(f+="q"),f=f||"-";let g="-";if(this._epSquare!==Ve)if(t)g=We(this._epSquare);else{const c=this._epSquare+(this._turn===Ye?16:-16),o=[c+1,c-1];for(const B of o){if(B&136)continue;const Y=this._turn;if(this._board[B]?.color===Y&&this._board[B]?.type===Oe){this._makeMove({color:Y,from:B,to:this._epSquare,piece:Oe,captured:Oe,flags:re.EP_CAPTURE});const A=!this._isKingAttacked(Y);if(this._undoMove(),A){g=We(this._epSquare);break}}}}return[p,this._turn,f,g,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:p}=this._board[t],f={w:0,b:1}[e],g={p:0,n:1,b:2,r:3,q:4,k:5}[p];return za[f][g][t]}_epKey(){return this._epSquare===Ve?0n:Ra[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Ba[t]}_computeHash(){let t=0n;for(let e=oe.a8;e<=oe.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=oa),t}_updateSetup(t){this._history.length>0||(t!==ra?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ra)}get(t){return this._board[oe[t]]}findPiece(t){const e=[];for(let p=oe.a8;p<=oe.h1;p++){if(p&136){p+=7;continue}!this._board[p]||this._board[p]?.color!==t.color||this._board[p].color===t.color&&this._board[p].type===t.type&&e.push(We(p))}return e}put({type:t,color:e},p){return this._put({type:t,color:e},p)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},p){if(Ga.indexOf(t.toLowerCase())===-1||!(p in oe))return!1;const f=oe[p];if(t==Ge&&!(this._kings[e]==Ve||this._kings[e]==f))return!1;const g=this._board[f];return g&&g.type===Ge&&(this._kings[g.color]=Ve),this._set(f,{type:t,color:e}),t===Ge&&(this._kings[e]=f),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(oe[t]),e&&e.type===Ge&&(this._kings[e.color]=Ve),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[oe.e1]?.type===Ge&&this._board[oe.e1]?.color===Ye,e=this._board[oe.e8]?.type===Ge&&this._board[oe.e8]?.color===tt;(!t||this._board[oe.a1]?.type!==Bt||this._board[oe.a1]?.color!==Ye)&&(this._castling.w&=-65),(!t||this._board[oe.h1]?.type!==Bt||this._board[oe.h1]?.color!==Ye)&&(this._castling.w&=-33),(!e||this._board[oe.a8]?.type!==Bt||this._board[oe.a8]?.color!==tt)&&(this._castling.b&=-65),(!e||this._board[oe.h8]?.type!==Bt||this._board[oe.h8]?.color!==tt)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Ve)return;const t=this._epSquare+(this._turn===Ye?-16:16),e=this._epSquare+(this._turn===Ye?16:-16),p=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==zt(this._turn)||this._board[e]?.type!==Oe){this._hash^=this._epKey(),this._epSquare=Ve;return}const f=g=>!(g&136)&&this._board[g]?.color===this._turn&&this._board[g]?.type===Oe;p.some(f)||(this._hash^=this._epKey(),this._epSquare=Ve)}_attacked(t,e,p){const f=[];for(let g=oe.a8;g<=oe.h1;g++){if(g&136){g+=7;continue}if(this._board[g]===void 0||this._board[g].color!==t)continue;const c=this._board[g],o=g-e;if(o===0)continue;const B=o+119;if(Oa[B]&Ha[c.type]){if(c.type===Oe){if(o>0&&c.color===Ye||o<=0&&c.color===tt)if(p)f.push(We(g));else return!0;continue}if(c.type==="n"||c.type==="k")if(p){f.push(We(g));continue}else return!0;const Y=Ua[B];let A=g+Y,E=!1;for(;A!==e;){if(this._board[A]!=null){E=!0;break}A+=Y}if(!E)if(p){f.push(We(g));continue}else return!0}}return p?f:!1}attackers(t,e){return e?this._attacked(e,oe[t],!0):this._attacked(this._turn,oe[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(zt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,oe[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let p=0,f=0;for(let g=oe.a8;g<=oe.h1;g++){if(f=(f+1)%2,g&136){g+=7;continue}const c=this._board[g];c&&(t[c.type]=c.type in t?t[c.type]+1:1,c.type===Xt&&e.push(f),p++)}if(p===2)return!0;if(p===3&&(t[Xt]===1||t[pa]===1))return!0;if(p===t[Xt]+2){let g=0;const c=e.length;for(let o=0;o<c;o++)g+=e[o];if(g===0||g===c)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:p=void 0}={}){const f=this._moves({square:e,piece:p});return t?f.map(g=>new Vt(this,g)):f.map(g=>this._moveToSan(g,f))}_moves({legal:t=!0,piece:e=void 0,square:p=void 0}={}){const f=p?p.toLowerCase():void 0,g=e?.toLowerCase(),c=[],o=this._turn,B=zt(o);let Y=oe.a8,A=oe.h1,E=!1;if(f)if(f in oe)Y=A=oe[f],E=!0;else return[];for(let U=Y;U<=A;U++){if(U&136){U+=7;continue}if(!this._board[U]||this._board[U].color===B)continue;const{type:ge}=this._board[U];let xe;if(ge===Oe){if(g&&g!==ge)continue;xe=U+sa[o][0],this._board[xe]||(mt(c,o,U,xe,Oe),xe=U+sa[o][1],Ja[o]===St(U)&&!this._board[xe]&&mt(c,o,U,xe,Oe,void 0,re.BIG_PAWN));for(let Ke=2;Ke<4;Ke++)xe=U+sa[o][Ke],!(xe&136)&&(this._board[xe]?.color===B?mt(c,o,U,xe,Oe,this._board[xe].type,re.CAPTURE):xe===this._epSquare&&mt(c,o,U,xe,Oe,Oe,re.EP_CAPTURE))}else{if(g&&g!==ge)continue;for(let Ke=0,Ze=va[ge].length;Ke<Ze;Ke++){const rt=va[ge][Ke];for(xe=U;xe+=rt,!(xe&136);){if(!this._board[xe])mt(c,o,U,xe,ge);else{if(this._board[xe].color===o)break;mt(c,o,U,xe,ge,this._board[xe].type,re.CAPTURE);break}if(ge===pa||ge===Ge)break}}}}if((g===void 0||g===Ge)&&(!E||A===this._kings[o])){if(this._castling[o]&re.KSIDE_CASTLE){const U=this._kings[o],ge=U+2;!this._board[U+1]&&!this._board[ge]&&!this._attacked(B,this._kings[o])&&!this._attacked(B,U+1)&&!this._attacked(B,ge)&&mt(c,o,this._kings[o],ge,Ge,void 0,re.KSIDE_CASTLE)}if(this._castling[o]&re.QSIDE_CASTLE){const U=this._kings[o],ge=U-2;!this._board[U-1]&&!this._board[U-2]&&!this._board[U-3]&&!this._attacked(B,this._kings[o])&&!this._attacked(B,U-1)&&!this._attacked(B,ge)&&mt(c,o,this._kings[o],ge,Ge,void 0,re.QSIDE_CASTLE)}}if(!t||this._kings[o]===-1)return c;const W=[];for(let U=0,ge=c.length;U<ge;U++)this._makeMove(c[U]),this._isKingAttacked(o)||W.push(c[U]),this._undoMove();return W}move(t,{strict:e=!1}={}){let p=null;if(typeof t=="string")p=this._moveFromSan(t,e);else if(t===null)p=this._moveFromSan(la,e);else if(typeof t=="object"){const g=this._moves();for(let c=0,o=g.length;c<o;c++)if(t.from===We(g[c].from)&&t.to===We(g[c].to)&&(!("promotion"in g[c])||t.promotion===g[c].promotion)){p=g[c];break}}if(!p)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&p.flags&re.NULL_MOVE)throw new Error("Null move not allowed when in check");const f=new Vt(this,p);return this._makeMove(p),this._incPositionCount(),f}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,p=zt(e);if(this._push(t),t.flags&re.NULL_MOVE){e===tt&&this._moveNumber++,this._halfMoves++,this._turn=p,this._epSquare=Ve;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&re.EP_CAPTURE&&(this._turn===tt?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Ge){if(this._kings[e]=t.to,t.flags&re.KSIDE_CASTLE){const f=t.to-1,g=t.to+1;this._movePiece(g,f)}else if(t.flags&re.QSIDE_CASTLE){const f=t.to+1,g=t.to-2;this._movePiece(g,f)}this._castling[e]=0}if(this._castling[e]){for(let f=0,g=bt[e].length;f<g;f++)if(t.from===bt[e][f].square&&this._castling[e]&bt[e][f].flag){this._castling[e]^=bt[e][f].flag;break}}if(this._castling[p]){for(let f=0,g=bt[p].length;f<g;f++)if(t.to===bt[p][f].square&&this._castling[p]&bt[p][f].flag){this._castling[p]^=bt[p][f].flag;break}}if(this._hash^=this._castlingKey(),t.flags&re.BIG_PAWN){let f;e===tt?f=t.to-16:f=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===Oe&&this._board[t.to-1]?.color===p||!(t.to+1&136)&&this._board[t.to+1]?.type===Oe&&this._board[t.to+1]?.color===p?(this._epSquare=f,this._hash^=this._epKey()):this._epSquare=Ve}else this._epSquare=Ve;t.piece===Oe?this._halfMoves=0:t.flags&(re.CAPTURE|re.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===tt&&this._moveNumber++,this._turn=p,this._hash^=oa}undo(){const t=this._hash,e=this._undoMove();if(e){const p=new Vt(this,e);return this._decPositionCount(t),p}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=oa;const p=this._turn,f=zt(p);if(e.flags&re.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:p})),e.captured)if(e.flags&re.EP_CAPTURE){let g;p===tt?g=e.to-16:g=e.to+16,this._set(g,{type:Oe,color:f})}else this._set(e.to,{type:e.captured,color:f});if(e.flags&(re.KSIDE_CASTLE|re.QSIDE_CASTLE)){let g,c;e.flags&re.KSIDE_CASTLE?(g=e.to+1,c=e.to-1):(g=e.to-2,c=e.to+1),this._movePiece(c,g)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const p=[];let f=!1;for(const W in this._header)this._header[W]&&p.push(`[${W} "${this._header[W]}"]`+t),f=!0;f&&this._history.length&&p.push(t);const g=W=>{const U=this._comments[this.fen()];if(typeof U<"u"){const ge=W.length>0?" ":"";W=`${W}${ge}{${U}}`}return W},c=[];for(;this._history.length>0;)c.push(this._undoMove());const o=[];let B="";for(c.length===0&&o.push(g(""));c.length>0;){B=g(B);const W=c.pop();if(!W)break;if(!this._history.length&&W.color==="b"){const U=`${this._moveNumber}. ...`;B=B?`${B} ${U}`:U}else W.color==="w"&&(B.length&&o.push(B),B=this._moveNumber+".");B=B+" "+this._moveToSan(W,this._moves({legal:!0})),this._makeMove(W)}if(B.length&&o.push(g(B)),o.push(this._header.Result||"*"),e===0)return p.join("")+o.join(" ");const Y=function(){return p.length>0&&p[p.length-1]===" "?(p.pop(),!0):!1},A=function(W,U){for(const ge of U.split(" "))if(ge){if(W+ge.length>e){for(;Y();)W--;p.push(t),W=0}p.push(ge),W+=ge.length,p.push(" "),W++}return Y()&&W--,W};let E=0;for(let W=0;W<o.length;W++){if(E+o[W].length>e&&o[W].includes("{")){E=A(E,o[W]);continue}E+o[W].length>e&&W!==0?(p[p.length-1]===" "&&p.pop(),p.push(t),E=0):W!==0&&(p.push(" "),E++),p.push(o[W]),E+=o[W].length}return p.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ua[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ua[t]||null,!0):!1}getHeaders(){const t={};for(const[e,p]of Object.entries(this._header))p!==null&&(t[e]=p);return t}loadPgn(t,{strict:e=!1,newlineChar:p=`\r?
`}={}){p!==`\r?
`&&(t=t.replace(new RegExp(p,"g"),`
`));const f=qa(t);this.reset();const g=f.headers;let c="";for(const Y in g)Y.toLowerCase()==="fen"&&(c=g[Y]),this.header(Y,g[Y]);if(!e)c&&this.load(c,{preserveHeaders:!0});else if(g.SetUp==="1"){if(!("FEN"in g))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(g.FEN,{preserveHeaders:!0})}let o=f.root;for(;o;){if(o.move){const Y=this._moveFromSan(o.move,e);if(Y==null)throw new Error(`Invalid move in PGN: ${o.move}`);this._makeMove(Y),this._incPositionCount()}o.comment!==void 0&&(this._comments[this.fen()]=o.comment),o=o.variations[0]}const B=f.result;B&&Object.keys(this._header).length&&this._header.Result!==B&&this.setHeader("Result",B)}_moveToSan(t,e){let p="";if(t.flags&re.KSIDE_CASTLE)p="O-O";else if(t.flags&re.QSIDE_CASTLE)p="O-O-O";else{if(t.flags&re.NULL_MOVE)return la;if(t.piece!==Oe){const f=Xa(t,e);p+=t.piece.toUpperCase()+f}t.flags&(re.CAPTURE|re.EP_CAPTURE)&&(t.piece===Oe&&(p+=We(t.from)[0]),p+="x"),p+=We(t.to),t.promotion&&(p+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?p+="#":p+="+"),this._undoMove(),p}_moveFromSan(t,e=!1){let p=da(t);if(e||(p==="0-0"?p="O-O":p==="0-0-0"&&(p="O-O-O")),p==la)return{color:this._turn,from:0,to:0,piece:"k",flags:re.NULL_MOVE};let f=ya(p),g=this._moves({legal:!0,piece:f});for(let W=0,U=g.length;W<U;W++)if(p===da(this._moveToSan(g[W],g)))return g[W];if(e)return null;let c,o,B,Y,A,E=!1;if(o=p.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),o?(c=o[1],B=o[2],Y=o[3],A=o[4],B.length==1&&(E=!0)):(o=p.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),o&&(c=o[1],B=o[2],Y=o[3],A=o[4],B.length==1&&(E=!0))),f=ya(p),g=this._moves({legal:!0,piece:c||f}),!Y)return null;for(let W=0,U=g.length;W<U;W++)if(B){if((!c||c.toLowerCase()==g[W].piece)&&oe[B]==g[W].from&&oe[Y]==g[W].to&&(!A||A.toLowerCase()==g[W].promotion))return g[W];if(E){const ge=We(g[W].from);if((!c||c.toLowerCase()==g[W].piece)&&oe[Y]==g[W].to&&(B==ge[0]||B==ge[1])&&(!A||A.toLowerCase()==g[W].promotion))return g[W]}}else if(p===da(this._moveToSan(g[W],g)).replace("x",""))return g[W];return null}ascii(){let t=`   +------------------------+
`;for(let e=oe.a8;e<=oe.h1;e++){if(Nt(e)===0&&(t+=" "+"87654321"[St(e)]+" |"),this._board[e]){const p=this._board[e].type,g=this._board[e].color===Ye?p.toUpperCase():p.toLowerCase();t+=" "+g+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let p=0;const f=this._turn;for(let g=0,c=e.length;g<c;g++)this._makeMove(e[g]),this._isKingAttacked(f)||(t-1>0?p+=this.perft(t-1):p++),this._undoMove();return p}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let p=oe.a8;p<=oe.h1;p++)this._board[p]==null?e.push(null):e.push({square:We(p),type:this._board[p].type,color:this._board[p].color}),p+1&136&&(t.push(e),e=[],p+=8);return t}squareColor(t){if(t in oe){const e=oe[t];return(St(e)+Nt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],p=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const f=e.pop();if(!f)break;t?p.push(new Vt(this,f)):p.push(this._moveToSan(f,this._moves())),this._makeMove(f)}return p}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},p=f=>{f in this._comments&&(e[f]=this._comments[f])};for(;this._history.length>0;)t.push(this._undoMove());for(p(this.fen());;){const f=t.pop();if(!f)break;this._makeMove(f),p(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const f of[Ge,ft])e[f]!==void 0&&(e[f]?this._castling[t]|=Yt[f]:this._castling[t]&=~Yt[f]);this._updateCastlingRights();const p=this.getCastlingRights(t);return(e[Ge]===void 0||e[Ge]===p[Ge])&&(e[ft]===void 0||e[ft]===p[ft])}getCastlingRights(t){return{[Ge]:(this._castling[t]&Yt[Ge])!==0,[ft]:(this._castling[t]&Yt[ft])!==0}}moveNumber(){return this._moveNumber}}async function ai(s,t={}){const e=t.currentUser||{},p=t.userRole||e?.role||"employee";let f="chat",g=[],c=null,o=[],B=[],Y=null,A=null,E=!1,W=null,U=null;s.innerHTML=`
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
  `,Za(),await at(),Me();const ge=s.querySelector("#tab-nav-chat"),xe=s.querySelector("#tab-nav-lounge"),Ke=s.querySelector("#bonding-chat-main-wrap"),Ze=s.querySelector("#bonding-lounge-main-wrap");ge?.addEventListener("click",()=>{f="chat",ge.classList.add("active"),xe.classList.remove("active"),Ke.style.display="grid",Ze.style.display="none",Me()}),xe?.addEventListener("click",async()=>{f="lounge_games",xe.classList.add("active"),ge.classList.remove("active"),Ke.style.display="none",Ze.style.display="block",await v()}),s.querySelector("#btn-top-new-chat")?.addEventListener("click",x),s.querySelector("#btn-top-new-group")?.addEventListener("click",q),s.querySelector("#btn-top-challenge")?.addEventListener("click",()=>N());const rt=s.querySelector("#bonding-search-input");rt&&rt.addEventListener("input",l=>{const u=l.target.value.toLowerCase().trim();s.querySelectorAll(".bonding-channel-item").forEach(r=>{const w=r.textContent.toLowerCase();r.style.display=w.includes(u)?"flex":"none"})}),ut(),new MutationObserver((l,u)=>{document.body.contains(s)||(A&&clearInterval(A),U&&clearInterval(U),u.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function at(){try{const[l,u]=await Promise.all([Re("/bonding/channels").catch(()=>[]),Re("/bonding/colleagues").catch(()=>[])]);g=l,o=u,!c&&g.length>0&&(c=g.find(i=>i.name.includes("Lounge"))||g[0]),Ue(),c&&await Pe(c._id)}catch(l){console.error("Failed to load bonding data",l)}}async function Pe(l,u=!1){if(l)try{B=await Re(`/bonding/channels/${l}/messages`),u?n():m()}catch(i){console.error("Failed to load messages",i)}}let it=0;function ut(){A&&clearInterval(A),A=setInterval(async()=>{try{if(!document.body.contains(s)){clearInterval(A);return}if(it++,it%2===0){const l=await Re("/bonding/channels").catch(()=>null);l&&JSON.stringify(l.map(u=>u._id+u.lastMessage?.sentAt))!==JSON.stringify(g.map(u=>u._id+u.lastMessage?.sentAt))&&(g=l,Ue())}f==="chat"&&c?await Pe(c._id,!0):f==="lounge_games"&&await v(!0)}catch{}},3e3)}function Ue(){const l=s.querySelector("#bonding-group-list"),u=s.querySelector("#bonding-direct-list");if(!l||!u)return;const i=g.filter(w=>w.type==="group"),r=g.filter(w=>w.type==="direct");if(i.length===0)l.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const w=e?._id||e?.id,R=p==="superadmin"||e?.role==="superadmin";l.innerHTML=i.map(C=>{const V=c&&c._id===C._id,H=C.createdBy&&C.createdBy.userId&&String(C.createdBy.userId)===String(w)||R;return`
          <div class="bonding-channel-item ${V?"active":""}" data-channel-id="${C._id}">
            <div class="bonding-channel-icon">${C.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${y(C.name)}</div>
              <div class="bonding-channel-preview">${y(C.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${H?`
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
        `}).join("")}r.length===0?u.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':u.innerHTML=r.map(w=>{const R=c&&c._id===w._id,C=w.displayName||w.name||"Colleague",V=C.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${R?"active":""}" data-channel-id="${w._id}">
            <div class="bonding-channel-avatar">${V}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${y(C)}</div>
              <div class="bonding-channel-preview">${y(w.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${w._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),ct()}function ct(){const l=s.querySelectorAll(".bonding-channel-item");l.forEach(u=>{u.onclick=async i=>{if(i.target.closest(".bonding-channel-del-btn")||i.target.closest(".bonding-channel-leave-btn"))return;const r=u.dataset.channelId,w=g.find(R=>R._id===r);w&&(c=w,l.forEach(R=>R.classList.remove("active")),u.classList.add("active"),Me(),await Pe(w._id))}}),s.querySelectorAll(".bonding-channel-leave-btn").forEach(u=>{u.onclick=async i=>{i.stopPropagation();const r=u.dataset.channelId,R=g.find(C=>C._id===r)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${R}"?`))try{u.disabled=!0,await Ie(`/bonding/channels/${r}/leave`,{}),$(`You left "${R}"`,"info"),g=g.filter(C=>C._id!==r),c&&c._id===r&&(c=g.find(C=>C.type==="group")||g[0]||null,Me(),c&&await Pe(c._id)),Ue()}catch(C){$(C.message||"Failed to leave group","error"),u.disabled=!1}}}),s.querySelectorAll(".bonding-channel-del-btn").forEach(u=>{u.onclick=async i=>{i.stopPropagation();const r=u.dataset.channelId,w=g.find(V=>V._id===r),R=w&&w.type==="direct",C=R?"this 1-on-1 chat":`the group "${w?.name||""}"`;if(confirm(`Are you sure you want to delete ${C}? All messages will be permanently removed.`))try{u.disabled=!0,await Xe(`/bonding/channels/${r}`),$(R?"1-on-1 chat deleted":"Group deleted","success"),g=g.filter(V=>V._id!==r),c&&c._id===r&&(c=g[0]||null,Me(),c&&await Pe(c._id)),Ue()}catch(V){$(V.message||"Failed to delete conversation","error"),u.disabled=!1}}}),s.querySelector("#btn-create-group")?.addEventListener("click",q),s.querySelector("#btn-new-direct-chat")?.addEventListener("click",x)}function Me(){const l=s.querySelector("#bonding-chat-panel");if(!l)return;if(!c){l.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const u=y(c.displayName||c.name),i=(c.members||[]).length,r=c.type==="group",w=e?._id||e?.id,R=r?null:(c.members||[]).find(H=>H.userId?.toString()!==w?.toString()),C=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(w),V=p==="superadmin"||e?.role==="superadmin",ae=C||V;l.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${r?c.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${u}</div>
            <div class="bonding-chat-sub">
              ${r?`<span>${i} members</span> · <span>${y(c.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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
              <span>👥</span> <span>Members (${i})</span>
            </button>
            ${ae?`
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
    `,nt(R),he(R),st(),a()}function ze(){if(!B||B.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const l=e?._id||e?.id;return B.map(u=>{const i=u.sender&&u.sender.userId&&l&&u.sender.userId.toString()===l.toString();if(u.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${u._id}">
            <span>ℹ️</span> <span>${y(u.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${u._id}" title="Delete Message">&times;</button>
          </div>
        `;if(u.type==="challenge"&&u.challengeData){const C=u.challengeData;if(C.status==="declined"||C.status==="cancelled")return"";const V=C.gameTitle||"Game Challenge",ae=C.gameType||"chess",H=ae==="chess"?"♟️":ae==="ludo"?"🎲":"❌",j=C.gameState?.invitationId,O=C.targetUserId?.toString(),ce=u.sender?.userId?.toString(),ne=l&&O===l.toString(),se=l&&ce===l.toString();return`
          <div class="bonding-msg-row ${i?"self":"other"}" data-msg-id="${u._id}">
            <div class="bonding-msg-avatar" title="${y(u.sender?.name||"Teammate")}">
              ${(u.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${y(u.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${G(u.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${u._id}" title="Delete Challenge Message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${H}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${y(V)}</h4>
                    <p class="game-bubble-desc">${y(u.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${C.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':C.status==="active"||C.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':`<span class="badge gray">${y(C.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${C.status==="pending"&&ne?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${j}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${j}" data-action="decline">
                        Decline
                      </button>
                    `:C.status==="pending"&&se?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${j}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${j}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${le(u)}
            </div>
          </div>
        `}const r=y(u.sender?.name||"Teammate"),w=G(u.createdAt),R=le(u);return`
        <div class="bonding-msg-row ${i?"self":"other"}" data-msg-id="${u._id}">
          <div class="bonding-msg-avatar" title="${r}">${r.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${r}</span>
              <span class="bonding-msg-time">${w}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${u._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${y(u.content).replace(/\n/g,"<br/>")}
            </div>
            ${R}
          </div>
        </div>
      `}).join("")}function le(l){return`
      <div class="bonding-reactions-row">
        ${(l.reactions||[]).map(r=>{const w=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(r.users||[]).some(C=>C.toString()===w?.toString())?"active":""}" data-msg-id="${l._id}" data-emoji="${r.emoji}">
          <span>${r.emoji}</span> <span>${r.users?r.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${l._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function nt(l){const u=s.querySelector("#btn-chat-challenge");u&&(u.onclick=()=>{l?N(null,l.userId||l._id):N()});const i=s.querySelector("#btn-manage-members");i&&(i.onclick=M);const r=s.querySelector("#btn-delete-group");r&&(r.onclick=z);const w=s.querySelector("#btn-leave-group");w&&(w.onclick=_);const R=s.querySelector("#btn-delete-direct");R&&(R.onclick=async()=>{if(c&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{R.disabled=!0,await Xe(`/bonding/channels/${c._id}`),$("1-on-1 chat deleted successfully","success");const V=c._id;g=g.filter(ae=>ae._id!==V),c=g[0]||null,Ue(),Me(),c&&await Pe(c._id)}catch(V){$(V.message||"Could not delete 1-on-1 chat","error"),R.disabled=!1}});const C=s.querySelector("#btn-clear-chat");C&&(C.onclick=async()=>{if(c&&confirm("Are you sure you want to clear all messages in this conversation?"))try{C.disabled=!0,await Xe(`/bonding/channels/${c._id}/messages`),$("Chat messages cleared","success"),B=[],m()}catch(V){$(V.message||"Could not clear chat messages","error")}finally{C.disabled=!1}})}function he(l){const u=s.querySelector("#bonding-message-input"),i=s.querySelector("#btn-send-message"),r=s.querySelector("#btn-quick-emoji"),w=s.querySelector("#btn-input-challenge");u&&u.addEventListener("keydown",R=>{R.key==="Enter"&&!R.shiftKey&&(R.preventDefault(),ot())}),i&&(i.onclick=ot),w&&(w.onclick=()=>{l?N(null,l.userId||l._id):N()}),r&&(r.onclick=()=>{if(!u)return;const R=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],C=R[Math.floor(Math.random()*R.length)];u.value+=(u.value?" ":"")+C,u.focus()})}function st(){s.querySelectorAll(".btn-respond-invite").forEach(r=>{r.onclick=async()=>{const w=r.dataset.inviteId,R=r.dataset.action;await k(w,R)}}),s.querySelectorAll(".btn-launch-match-from-card").forEach(r=>{r.onclick=async()=>{const w=r.dataset.inviteId;try{r.disabled=!0;const R=await Re("/bonding/invitations"),C=(R.incoming||[]).concat(R.sent||[]).find(V=>V._id===w);C&&C.matchId?F(C.matchId):$("Match has not started yet or has expired","warning")}catch(R){$(R.message||"Could not load match","error")}finally{r.disabled=!1}}}),s.querySelectorAll(".bonding-msg-del-btn").forEach(r=>{r.onclick=async w=>{w.stopPropagation();const R=r.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{r.disabled=!0,await Xe(`/bonding/messages/${R}`),B=B.filter(C=>C._id!==R),n(),$("Message deleted","success")}catch(C){$(C.message||"Failed to delete message","error"),r.disabled=!1}}}),s.querySelectorAll(".bonding-rxn-tag").forEach(r=>{r.onclick=async()=>{const w=r.dataset.msgId,R=r.dataset.emoji;await d(w,R)}}),s.querySelectorAll(".bonding-add-rxn-btn").forEach(r=>{r.onclick=w=>{const R=r.dataset.msgId;D(w.currentTarget,async C=>{await d(R,C)})}})}async function ot(){const l=s.querySelector("#bonding-message-input");if(!l||!c||E)return;const u=l.value.trim();if(u)try{E=!0,l.value="";const i=await Ie(`/bonding/channels/${c._id}/messages`,{content:u,type:"text"});B.push(i),m(),a()}catch(i){$(i.message||"Failed to send message","error")}finally{E=!1,l.focus()}}async function d(l,u){try{const i=await Ie(`/bonding/messages/${l}/react`,{emoji:u}),r=B.find(w=>w._id===l);r&&(r.reactions=i,n())}catch(i){$(i.message||"Failed to react","error")}}function a(){const l=s.querySelector("#bonding-messages-feed");l&&(l.scrollTop=l.scrollHeight)}function n(){const l=s.querySelector("#bonding-messages-feed");if(!l)return;const u=l.scrollHeight-l.scrollTop<=l.clientHeight+80;l.innerHTML=ze(),st(),u&&a()}function m(){const l=s.querySelector("#bonding-messages-feed");l&&(l.innerHTML=ze(),st())}async function v(l=!1){const u=s.querySelector("#bonding-lounge-main-wrap");if(u){l||(u.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const i=await Re("/bonding/games/overview");Y=i;const r=i.myStats||{},w=i.availableGames||[],R=i.incomingChallenges||[],C=i.sentChallenges||[],V=i.activeMatches||[],ae=i.recentMatches||[],H=e?._id||e?.id;u.innerHTML=`
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
              ${w.map(j=>`
                <div class="lounge-game-card" data-game-id="${j.id}">
                  <div class="game-card-icon">${j.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${y(j.name)}</h4>
                    <p class="game-card-desc">${y(j.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${j.duration}</span>
                      ${j.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${j.id}" data-game-title="${y(j.name)}">
                    ${j.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${R.length+C.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${R.length})</h5>
              ${R.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${R.map(j=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(j.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${y(j.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${y(j.sender.name)}</strong> (${y(j.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${j._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${j._id}" data-action="decline">
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
                    ${C.map(j=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(j.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${y(j.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${y(j.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${j._id}" data-action="cancel">
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
                    ${V.map(j=>{const ce=(j.players||j.gameState?.players||[j.player1,j.player2].filter(Boolean)).filter(J=>J.userId&&J.userId.toString()!==H?.toString()),ne=j.player1?.userId?.toString()===H?.toString()?j.player2:j.player1,se=ce.length>0?ce.map(J=>y(J.name)).join(", "):ne?.name?y(ne.name):"Colleagues",ue=H&&j.currentTurnUserId&&j.currentTurnUserId.toString()===H.toString();return`
                        <div class="lounge-active-match-card ${ue?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${j.gameType==="chess"?"♟️":j.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${y(j.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${se}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ue?"my-turn":"wait"}">
                              ${ue?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${j._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${j._id}" title="Delete Match">
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
              ${ae.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${ae.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${ae.map(j=>{const ce=H&&j.player1.userId.toString()===H.toString()?j.player2:j.player1,ne=H&&j.winnerId&&j.winnerId.toString()===H.toString(),se=j.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${y(j.gameTitle)}</span>
                          <span class="recent-date">${G(j.completedAt||j.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${j._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${y(ce.name)}</strong></div>
                          <div class="recent-outcome ${ne?"win":se?"draw":"loss"}">
                            ${ne?"🏆 VICTORY":se?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${y(j.winningReason||j.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${j._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${j._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,T()}catch(i){u.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${y(i.message)}</p>
        </div>
      `}}}function T(){s.querySelectorAll(".btn-challenge-game").forEach(u=>{u.onclick=()=>{const i=u.dataset.gameId;N(i)}}),s.querySelectorAll(".btn-respond-invite").forEach(u=>{u.onclick=async()=>{const i=u.dataset.inviteId,r=u.dataset.action;await k(i,r),await v()}}),s.querySelectorAll(".btn-resume-match").forEach(u=>{u.onclick=()=>{const i=u.dataset.matchId;F(i)}}),s.querySelectorAll(".btn-recent-rematch").forEach(u=>{u.onclick=async()=>{const i=u.dataset.matchId;try{u.disabled=!0;const r=await Ie(`/bonding/matches/${i}/action`,{action:"rematch"});r.match&&($("Rematch created! Opening arena ⚔️","success"),F(r.match._id))}catch(r){$(r.message||"Could not start rematch","error")}finally{u.disabled=!1}}}),s.querySelectorAll(".btn-delete-match").forEach(u=>{u.onclick=async i=>{i.stopPropagation();const r=u.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{u.disabled=!0,await Xe(`/bonding/matches/${r}`),$("Match deleted successfully","success"),await v()}catch(w){$(w.message||"Failed to delete match","error")}finally{u.disabled=!1}}});const l=s.querySelector("#btn-clear-matches");l&&(l.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{l.disabled=!0,await Xe("/bonding/matches?filter=completed"),$("Completed matches history cleared","success"),await v()}catch(u){$(u.message||"Failed to clear matches","error")}finally{l.disabled=!1}})}function N(l=null,u=null){const i=s.querySelector("#bonding-modals-root"),r=e?._id||e?.id,w=new Set(["employee","admin","superadmin"]),R=o.filter(ne=>!ne.isSelf&&ne._id.toString()!==r?.toString()&&w.has(ne.role));let C=l||"chess",V=u?u.toString():null,ae=2,H=V?[V]:[],j="none";function O(){const ne=R.find(ie=>ie._id.toString()===V),se=C==="ludo",ue=ae-1,J=H.length===ue;i.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${se?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
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
              ${se?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${ae===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${ae===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${ae===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${se?`Step 3 — Select Colleagues to Play With (${H.length}/${ue} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${R.map(ie=>{const be=se?H.includes(ie._id.toString()):V===ie._id.toString();return`
                      <div class="eligible-emp-item ${be?"selected":""}" data-user-id="${ie._id}">
                        <div class="emp-item-avatar">${ie.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${y(ie.name)}</span>
                          <span class="emp-item-role">${y(ie.role==="superadmin"?"Superadmin":ie.role==="admin"?"Admin":"Employee")} · ${y(ie.email||"")}</span>
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
                    <label class="timer-radio-lbl ${j==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${j==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${j==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${j==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${j==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${j==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${se?`🎲 Ludo (${ae} Players · 4 Pawns per base)`:C==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${se?`
                    <div><strong>Opponents:</strong> ${H.length>0?H.map(ie=>{const be=R.find(pe=>pe._id.toString()===ie);return be?`<strong>${y(be.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+ue+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${ne?`<strong>${y(ne.name)}</strong> (${y(ne.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${C==="chess"?`<div><strong>Time Control:</strong> ${j==="none"?"Untimed":j}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(se?!J:!V)?"disabled":""}>
                ${se?`Start ${ae}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,ce()}function ce(){i.querySelector(".bonding-modal-close").onclick=()=>{i.innerHTML=""},i.querySelector("#btn-cancel-challenge-flow").onclick=()=>{i.innerHTML=""},i.querySelectorAll(".game-pill-btn").forEach(ue=>{ue.onclick=()=>{C=ue.dataset.game,O()}}),i.querySelectorAll(".ludo-mode-btn").forEach(ue=>{ue.onclick=()=>{ae=Number(ue.dataset.count),H=H.slice(0,ae-1),O()}});const ne=i.querySelector("#flow-emp-search");ne&&(ne.oninput=ue=>{const J=ue.target.value.toLowerCase().trim();i.querySelectorAll(".eligible-emp-item").forEach(ie=>{const be=ie.textContent.toLowerCase();ie.style.display=be.includes(J)?"flex":"none"})}),i.querySelectorAll(".eligible-emp-item").forEach(ue=>{ue.onclick=()=>{const J=ue.dataset.userId;if(C==="ludo"){const ie=ae-1;H.includes(J)?H=H.filter(be=>be!==J):H.length<ie?H.push(J):H[ie-1]=J}else V=J;O()}}),i.querySelectorAll('input[name="timerMode"]').forEach(ue=>{ue.onchange=J=>{j=J.target.value,O()}});const se=i.querySelector("#btn-submit-challenge-flow");se&&(se.onclick=async()=>{if(C==="ludo"){const ue=ae-1;if(H.length<ue){$(`Please select ${ue} colleague(s) to play with`,"warning");return}try{se.disabled=!0,se.textContent="Launching Match...";const J=await Ie("/bonding/matches/instant-ludo",{playerCount:ae,targetUserIds:H});i.innerHTML="",$(`Ludo match started (${ae} Players)! 🎲`,"success"),J&&J._id&&F(J._id)}catch(J){$(J.message||"Failed to start Ludo match","error"),se.disabled=!1,se.textContent=`Start ${ae}P Ludo Match 🎲`}return}if(!V){$("Please select an employee to challenge","warning");return}try{se.disabled=!0,se.textContent="Sending Challenge...",await Ie("/bonding/invitations",{gameType:C,targetUserId:V,matchSettings:{timerMode:j},channelId:null}),$("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),i.innerHTML="",await loadChannels();const ue=g.find(J=>J.type==="direct"&&J.members?.some(ie=>(ie.userId||ie._id)?.toString()===V));ue?selectChannel(ue):c&&await Pe(c._id),f==="lounge_games"&&await v()}catch(ue){$(ue.message||"Could not send challenge","error"),se.disabled=!1,se.textContent="Send Challenge 🚀"}})}O()}async function k(l,u){if(!(!l||!u))try{const i=await Jt(`/bonding/invitations/${l}/respond`,{action:u});u==="accept"?($("Challenge accepted! Entering match arena ⚔️","success"),i.match&&F(i.match._id)):u==="decline"?($("Challenge declined","info"),s.querySelectorAll(`[data-invite-id="${l}"]`).forEach(r=>{const w=r.closest(".lounge-invite-item")||r.closest(".bonding-msg-row");w&&w.remove()})):u==="cancel"&&($("Challenge cancelled","info"),s.querySelectorAll(`[data-invite-id="${l}"]`).forEach(r=>{const w=r.closest(".lounge-invite-item")||r.closest(".bonding-msg-row");w&&w.remove()})),c&&await Pe(c._id),f==="lounge_games"&&await v()}catch(i){$(i.message||"Action failed","error")}}async function F(l){if(!l)return;W=l,U&&clearInterval(U);const u=s.querySelector("#bonding-modals-root");let i=null,r=null,w=[],R="",C=null,V=!1;function ae(J){return J?JSON.stringify({status:J.status,turn:J.currentTurnUserId?.toString(),turnColor:J.turn,movesCount:J.moves?.length,dice:J.gameState?.dice,rolled:J.gameState?.rolled,lastRoll:J.gameState?.lastRoll,lastRollColor:J.gameState?.lastRollColor,lastRollBy:J.gameState?.lastRollBy,lastActionText:J.gameState?.lastActionText,tokens:J.gameState?.tokens,board:J.gameState?.board,grid:J.gameState?.grid,fen:J.gameState?.fen,draw:J.drawOfferedBy?.toString()}):""}async function H(){try{return i=await Re(`/bonding/matches/${l}`),i}catch(J){return $(J.message||"Could not load match","error"),j(),null}}if(i=await H(),!i)return;R=ae(i);function j(){U&&clearInterval(U),C&&clearTimeout(C),V=!1,W=null,u.innerHTML="",f==="lounge_games"&&v(!0),c&&Pe(c._id,!0)}U=setInterval(async()=>{if(!W||W!==l){clearInterval(U);return}try{const J=await Re(`/bonding/matches/${l}`);if(!J)return;const ie=ae(J);ie!==R&&(R=ie,i=J,O())}catch{}},1e3);function O(){if(!i)return;const J=e?._id||e?.id,ie=J&&i.player1.userId.toString()===J.toString(),be=ie?i.player1:i.player2,pe=ie?i.player2:i.player1,me=J&&i.currentTurnUserId&&i.currentTurnUserId.toString()===J.toString(),_e=i.status!=="active";u.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${i.gameType==="ludo"?"🎲":i.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${y(i.gameTitle)}</h3>
                  ${i.gameType==="ludo"&&i.gameState?.players?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${i.gameState.players.map(Fe=>{const Be=Fe.userId&&Fe.userId.toString()===J?.toString(),Le={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Fe.color]||"⚪",de=(i.gameState?.turnColor||i.turn)===Fe.color;return`
                          <span class="player-tag ${Be?"self":"opp"} ${de?"turn-active":""}">
                            ${Le} <strong>${y(Fe.name)}</strong> ${Be?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${y(be.name)} (You · <strong>${i.gameType==="ludo"?be.assignedRole==="red"?"🔴 Red":"🟢 Green":i.gameType==="tictactoe"?be.assignedRole==="X"?"✕":"◯":be.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${y(pe.name)} (<strong>${i.gameType==="ludo"?pe.assignedRole==="red"?"🔴 Red":"🟢 Green":i.gameType==="tictactoe"?pe.assignedRole==="X"?"✕":"◯":pe.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${_e?"ended":me?"my-turn":"opp-turn"}">
                ${_e?`<span>🏁 Finished (${y(i.winningReason||i.status)})</span>`:me?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${y(pe.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${i.gameType==="ludo"?me?i.gameState?.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":i.gameType==="tictactoe"?me?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":me?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${_e?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${i.drawOfferedBy&&i.drawOfferedBy.toString()!==J?.toString()&&!_e?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${y(pe.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${i.gameType==="chess"?ce(ie):""}
              ${i.gameType==="tictactoe"?ne():""}
              ${i.gameType==="ludo"?se(ie):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${_e?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${i.winnerId&&i.winnerId.toString()===J?.toString()?"🏆":i.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${i.winnerId&&i.winnerId.toString()===J?.toString()?"VICTORY!":i.status==="draw"?"STALEMATE / DRAW":`${y(i.winnerName)} Wins!`}</h4>
                  <p>Reason: ${y(i.winningReason||"Match concluded")}</p>
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
      `,ue(me,ie,be)}function ce(J){const ie=i.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",be=new ka(ie),pe=J?i.player1.assignedRole==="white":i.player2.assignedRole==="white",me={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},_e=pe?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Fe=pe?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Be='<div class="chess-board-grid">';for(const De of Fe)for(const He of _e){const Ne=`${He}${De}`,Ee=be.get(Ne),ye=(He.charCodeAt(0)-97+De)%2!==0,Ae=r===Ne,ke=w.includes(Ne),fe=Ee?Ee.color==="w"?me[Ee.type.toUpperCase()]:me[Ee.type]:"";Be+=`
            <div class="chess-sq ${ye?"light":"dark"} ${Ae?"selected":""} ${ke?"legal-dot":""}" data-square="${Ne}">
              ${fe?`<span class="chess-piece ${Ee.color==="w"?"white-piece":"black-piece"}">${fe}</span>`:""}
            </div>
          `}Be+="</div>";const de=(i.moves||[]).map(De=>`
        <span class="chess-move-token">${De.moveNum}. ${De.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${Be}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${de||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function ne(){const J=i.gameState?.board||Array(9).fill(null),ie=i.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${J.map((be,pe)=>{const me=ie.includes(pe);return`
                <div class="ttt-cell ${be?"filled":"empty"} ${me?"win-cell":""}" data-cell-idx="${pe}">
                  ${be==="X"?'<span class="ttt-x">✕</span>':be==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function se(J,ie,be){const pe=i.gameState||{},me=pe.activeColors||["red","green"],_e=pe.players||[{...i.player1,color:"red",assignedRole:"red",isBot:!1},{...i.player2,color:"green",assignedRole:"green",isBot:!1}],Fe=pe.tokens||{},Be=P=>{const te=Fe[P]||(P==="red"?pe.p1Tokens:P==="green"?pe.p2Tokens:[])||[];return Array.from({length:4},(ve,Ce)=>te[Ce]||{id:Ce,step:-1})},Le=Be("red"),de=Be("green"),De=Be("yellow"),He=Be("blue"),Ne=e?._id||e?.id,ye=(_e.find(P=>P.userId&&P.userId.toString()===Ne?.toString())||_e[0])?.color||(J?"red":"green"),Ae=pe.turnColor||i.turn||"red",ke=ye===Ae&&i.status==="active",fe=!!pe.rolled,L=pe.dice,K=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],b=[[7,1],[7,2],[7,3],[7,4],[7,5]],we=[[1,7],[2,7],[3,7],[4,7],[5,7]],$e=[[7,13],[7,12],[7,11],[7,10],[7,9]],lt=[[13,7],[12,7],[11,7],[10,7],[9,7]],Q=[0,8,13,21,26,34,39,47];function ht(P,te){return te<0?null:te>=56?P==="red"?[7,6]:P==="green"?[6,7]:P==="yellow"?[7,8]:[8,7]:P==="red"?te<=50?K[te]:b[te-51]:P==="green"?te<=50?K[(13+te)%52]:we[te-51]:P==="yellow"?te<=50?K[(26+te)%52]:$e[te-51]:te<=50?K[(39+te)%52]:lt[te-51]}function qe(P,te){return P!==ye||!ke||!fe||!L||i.status!=="active"?!1:te.step===-1?L===6:te.step>=0&&te.step+L<=56}const et={},It=(P,te)=>{te.forEach(ve=>{if(ve.step>=0&&ve.step<56){const Ce=ht(P,ve.step);if(Ce){const h=Ce[0]+","+Ce[1];(et[h]=et[h]||[]).push({color:P,id:ve.id,step:ve.step,movable:qe(P,ve)})}}})};me.includes("red")&&It("red",Le),me.includes("green")&&It("green",de),me.includes("yellow")&&It("yellow",De),me.includes("blue")&&It("blue",He);const Je={};K.forEach(([P,te],ve)=>{Je[P+","+te]=ve});const Et={};b.forEach(([P,te],ve)=>{Et[P+","+te]=ve+1});const Tt={};we.forEach(([P,te],ve)=>{Tt[P+","+te]=ve+1});const ee={};$e.forEach(([P,te],ve)=>{ee[P+","+te]=ve+1});const jt={};lt.forEach(([P,te],ve)=>{jt[P+","+te]=ve+1});const Pt=[];for(let P=0;P<15;P++)for(let te=0;te<15;te++){if(P<6&&te<6||P<6&&te>8||P>8&&te<6||P>8&&te>8||P>=6&&P<=8&&te>=6&&te<=8)continue;const ve=P+","+te,Ce=Je[ve],h=Ce!==void 0&&Q.includes(Ce),I=P===6&&te===1,S=P===1&&te===8,X=P===8&&te===13,Z=P===13&&te===6,Se=Et[ve],pt=Tt[ve],At=ee[ve],Sa=jt[ve];let dt="ludo-cell";I?dt+=" cell-red-start":S?dt+=" cell-green-start":X?dt+=" cell-yellow-start":Z?dt+=" cell-blue-start":Se?dt+=" cell-red-stretch":pt?dt+=" cell-green-stretch":At?dt+=" cell-yellow-stretch":Sa?dt+=" cell-blue-stretch":h&&(dt+=" cell-safe-star");const Ca=et[ve]||[];Pt.push(`
            <div class="${dt}" style="grid-row:${P+1};grid-column:${te+1}" data-pos="${ve}">
              ${h?'<span class="cell-star-glyph">⭐</span>':""}
              ${I||S||X||Z?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Ca.map(yt=>`
                <div class="ludo-token token-${yt.color} ${yt.movable?"movable":""}" data-token-id="${yt.id}" data-color="${yt.color}" title="${yt.color.toUpperCase()} Pawn ${yt.id+1}">
                  <span>${yt.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function ea(P){const te=Math.max(1,Math.min(6,Number(P)||1)),ve={1:[[30,30,7.5,"#ef4444"]],2:[[16,16,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],3:[[16,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],4:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],5:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],6:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,30,5.5,"#1e293b"],[44,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]]},h=(ve[te]||ve[6]).map(([I,S,X,Z])=>`
          <g>
            <circle cx="${I}" cy="${S+1.2}" r="${X}" fill="#94a3b8" opacity="0.5"/>
            <circle cx="${I}" cy="${S}" r="${X}" fill="${Z}"/>
            <circle cx="${I-X*.3}" cy="${S-X*.3}" r="${X*.35}" fill="#ffffff" opacity="0.6"/>
          </g>
        `).join("");return`
          <svg viewBox="0 0 60 60" width="52" height="52" class="ludo-dice-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dice face ${te}">
            <g class="die-pips-layer">
              ${h}
            </g>
          </svg>
        `}function vt(P,te,ve,Ce,h){const I=`${P}-yard`;if(!ve)return`
            <div class="ludo-yard ${I}">
              <div class="yard-box decorative">
                <div class="yard-title">${te} (Inactive)</div>
              </div>
            </div>
          `;const S=h.filter(X=>X.step===56).length;return`
          <div class="ludo-yard ${I} ${Ae===P?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${te}</span>
                ${S>0?`<span class="yard-home-badge" title="${S} of 4 pawns reached Home!">👑 ${S}/4 Home</span>`:""}
                ${Ce?`<small class="yard-player-lbl">${y(Ce.name)}${Ce.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${h.map((X,Z)=>`
                  <div class="yard-token-slot ${X.step===56?"slot-home":""}">
                    ${X.step===-1?`
                      <div class="ludo-token token-${P} ${qe(P,X)?"movable":""}" data-token-id="${X.id}" data-color="${P}" title="${P.toUpperCase()} Pawn ${X.id+1}">
                        <span>${X.id+1}</span>
                      </div>
                    `:X.step===56?`
                      <div class="ludo-token token-reached-home token-${P}" title="${P.toUpperCase()} Pawn ${X.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${X.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${Z+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Ot=_e.find(P=>P.color==="red"),Ut=_e.find(P=>P.color==="green"),ta=_e.find(P=>P.color==="yellow"),Ht=_e.find(P=>P.color==="blue"),Ft=_e.find(P=>P.color===Ae)||(Ae==="red"?Ot:Ut),_t=Ft?y(Ft.name):Ae.toUpperCase(),Lt={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Ae]||"🔴",gt=L||pe.lastRoll||6,xt=ke&&!fe&&i.status==="active",Wt=Be(ye).filter(P=>qe(ye,P));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${vt("red","🔴 Red Base",me.includes("red"),Ot,Le)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${vt("green","🟢 Green Base",me.includes("green"),Ut,de)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${vt("blue","🔵 Blue Base",me.includes("blue"),Ht,He)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${vt("yellow","🟡 Yellow Base",me.includes("yellow"),ta,De)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${Le.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn red" title="Red Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${de.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn green" title="Green Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${De.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${He.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn blue" title="Blue Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...Le.filter(P=>P.step===56).map(P=>({col:"red",id:P.id})),...de.filter(P=>P.step===56).map(P=>({col:"green",id:P.id})),...De.filter(P=>P.step===56).map(P=>({col:"yellow",id:P.id})),...He.filter(P=>P.step===56).map(P=>({col:"blue",id:P.id}))].map(P=>`
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
                class="ludo-3d-dice ${xt?"clickable pulse-roll":""} ${fe?"just-rolled":""} border-${Ae}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${xt?"0":"-1"}"
                title="${xt?"Click Dice to Roll!":ke?"Choose a pawn to move":`${_t}'s turn`}"
              >
                ${ea(gt)}
              </div>
              <div class="ludo-dice-action-badge">
                ${xt?'<button class="badge-click-roll btn-dice-roll-badge" id="btn-interactive-ludo-dice-badge" type="button" title="Tap to Roll">🎲 TAP TO ROLL</button>':fe?`<span class="badge-rolled-val">${Lt} Rolled ${gt}</span>`:pe.lastRoll?`<span class="badge-last-roll">${Lt} Rolled ${pe.lastRoll}</span>`:'<span class="badge-waiting">Ready</span>'}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${Ae}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${_t}</strong> (${Ae.toUpperCase()})
                </span>
                ${ke?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${ke&&fe?"highlight":""}">
                ${ke&&!fe&&i.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":ke&&fe&&i.status==="active"?Wt.length>0?Wt.length===1?`🎲 Rolled <strong>${gt}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${gt}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${gt}</strong>. No legal moves possible — turn passing...`:i.status==="active"?fe||pe.lastRoll?`🎲 ${Lt} <strong>${_t}</strong> rolled <strong>${gt}</strong>!`:`⏳ Waiting for <strong>${_t}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${y(pe.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function ue(J,ie,be){u.querySelector("#btn-close-arena").onclick=j;const pe=u.querySelector("#btn-arena-resign");pe&&(pe.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{pe.disabled=!0,await Ie(`/bonding/matches/${l}/action`,{action:"resign"}),await H(),O()}catch(de){$(de.message||"Resign failed","error"),pe.disabled=!1}});const me=u.querySelector("#btn-arena-draw");me&&(me.onclick=async()=>{try{await Ie(`/bonding/matches/${l}/action`,{action:"offer_draw"}),$("Draw offer sent to opponent","info"),await H(),O()}catch(de){$(de.message||"Draw offer failed","error")}});const _e=u.querySelector("#btn-confirm-accept-draw");_e&&(_e.onclick=async()=>{try{await Ie(`/bonding/matches/${l}/action`,{action:"accept_draw"}),$("Draw agreed!","info"),await H(),O()}catch(de){$(de.message,"error")}});const Fe=u.querySelector("#btn-confirm-decline-draw");Fe&&(Fe.onclick=async()=>{try{await Ie(`/bonding/matches/${l}/action`,{action:"decline_draw"}),await H(),O()}catch(de){$(de.message,"error")}}),[u.querySelector("#btn-arena-delete-match"),u.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(de=>{de.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{de.disabled=!0,await Xe(`/bonding/matches/${l}`),$("Match deleted","success"),j(),f==="lounge_games"&&await v()}catch(De){$(De.message||"Failed to delete match","error"),de.disabled=!1}}});const Le=u.querySelector("#btn-arena-rematch-action");if(Le&&(Le.onclick=async()=>{try{Le.disabled=!0,Le.textContent="Creating Rematch...";const de=await Ie(`/bonding/matches/${l}/action`,{action:"rematch"});de.match&&($("Rematch created! New match live ⚔️","success"),U&&clearInterval(U),F(de.match._id))}catch(de){$(de.message||"Rematch failed","error"),Le.disabled=!1,Le.textContent="🔄 Request Rematch"}}),i.gameType==="chess"&&J&&i.status==="active"){const de=i.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",De=new ka(de),He=be.assignedRole==="white"?"w":"b";u.querySelectorAll(".chess-sq").forEach(Ne=>{Ne.onclick=async()=>{const Ee=Ne.dataset.square;if(r){if(r===Ee){r=null,w=[],O();return}if(w.includes(Ee)){const Ae=De.get(r);let ke;Ae&&Ae.type==="p"&&(Ee.endsWith("8")||Ee.endsWith("1"))&&(ke=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const fe={from:r,to:Ee,promotion:ke?ke.toLowerCase():void 0};r=null,w=[],i=await Ie(`/bonding/matches/${l}/move`,{move:fe}),O()}catch(fe){$(fe.message||"Illegal chess move","error"),r=null,w=[],O()}return}}const ye=De.get(Ee);ye&&ye.color===He?(r=Ee,w=De.moves({square:Ee,verbose:!0}).map(ke=>ke.to),O()):(r=null,w=[],O())}})}if(i.gameType==="tictactoe"&&J&&i.status==="active"&&u.querySelectorAll(".ttt-cell.empty").forEach(de=>{de.onclick=async()=>{const De=de.dataset.cellIdx;try{de.style.opacity="0.5",i=await Ie(`/bonding/matches/${l}/move`,{cellIndex:Number(De)}),O()}catch(He){$(He.message||"Invalid move","error")}}}),i.gameType==="ludo"&&i.status==="active"){const de=i.gameState||{},De=!!de.rolled,He=de.turnColor||i.turn||"red",Ne=i.player1.userId.toString()===myId?.toString()?i.player1.assignedRole||"red":i.player2.userId.toString()===myId?.toString()?i.player2.assignedRole||"green":(de.players||[]).find(ke=>ke.userId?.toString()===myId?.toString())?.color||"red",Ee=J&&He===Ne,ye=u.querySelector("#btn-interactive-ludo-dice"),Ae=u.querySelector("#btn-interactive-ludo-dice-badge");if(Ee&&!De){const ke=async()=>{if(ye&&ye.dataset.rolling==="true")return;ye&&(ye.dataset.rolling="true",ye.classList.add("rolling")),Ae&&(Ae.disabled=!0);const fe=setTimeout(()=>{ye&&(ye.classList.remove("rolling"),delete ye.dataset.rolling),Ae&&(Ae.disabled=!1)},2e3);try{const L=Ie(`/bonding/matches/${l}/move`,{action:"roll"}),K=new Promise(we=>setTimeout(we,350)),[b]=await Promise.all([L,K]);clearTimeout(fe),i=b,R=ae(b),O()}catch(L){clearTimeout(fe),$(L.message||"Failed to roll","error"),ye&&(ye.classList.remove("rolling"),delete ye.dataset.rolling),Ae&&(Ae.disabled=!1)}};ye&&(ye.onclick=ke,ye.onkeydown=fe=>{(fe.key==="Enter"||fe.key===" ")&&(fe.preventDefault(),ke())}),Ae&&(Ae.onclick=ke)}if(Ee&&De){const fe=(de.tokens||{})[Ne]||[],L=de.dice||de.lastRoll||0,K=fe.filter(b=>b.step===-1&&L===6||b.step>=0&&b.step+L<=56);if(K.length===1&&!V){V=!0;const b=K[0];C&&clearTimeout(C),C=setTimeout(async()=>{try{const we=await Ie(`/bonding/matches/${l}/move`,{action:"move",tokenId:Number(b.id)});i=we,R=ae(we),V=!1,O()}catch(we){V=!1,$(we.message||"Auto-move failed","error")}},400)}}Ee&&De&&u.querySelectorAll(".ludo-token.movable").forEach(ke=>{ke.onclick=async fe=>{fe.stopPropagation();const L=ke.dataset.tokenId;try{ke.style.opacity="0.5";const K=await Ie(`/bonding/matches/${l}/move`,{action:"move",tokenId:Number(L)});i=K,R=ae(K),O()}catch(K){$(K.message||"Invalid token move","error"),ke.style.opacity="1"}}})}}O()}function M(){if(!c||c.type==="direct")return;const l=s.querySelector("#bonding-modals-root"),u=H=>H==="employee"||H==="admin"||H==="superadmin",i=c.members||[],r=new Set(i.map(H=>H.userId?.toString())),w=o.filter(H=>u(H.role)&&!r.has(H._id.toString()));l.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${y(c.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${w.map(H=>`
                    <option value="${H._id}">${y(H.name)} (${y(H.role==="superadmin"?"Superadmin":H.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${w.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${w.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${i.length}):</label>
              <div class="bonding-members-list">
                ${i.map(H=>{const j=e?._id||e?.id,O=j&&H.userId&&H.userId.toString()===j.toString(),ce=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(j),ne=p==="superadmin"||e?.role==="superadmin",se=ce||ne;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(H.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${y(H.name)} ${O?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${y(H.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${O?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${H.userId}">
                            🚪 Leave Group
                          </button>
                        `:se?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${H.userId}" data-name="${y(H.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const H=e?._id||e?.id,j=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(H),O=p==="superadmin"||e?.role==="superadmin";return j||O?`
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
    `,l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""};const R=l.querySelector("#btn-modal-delete-group");R&&(R.onclick=()=>{l.innerHTML="",z()});const C=l.querySelector("#btn-modal-leave-group");C&&(C.onclick=()=>{l.innerHTML="",_()}),l.querySelectorAll(".btn-leave-group-action").forEach(H=>{H.onclick=()=>{l.innerHTML="",_()}});const V=l.querySelector("#btn-submit-add-member");V&&(V.onclick=async()=>{const j=l.querySelector("#sel-add-colleague").value;if(!j){$("Please select a colleague to add","warning");return}try{V.disabled=!0,V.textContent="Adding...";const O=await Jt(`/bonding/channels/${c._id}/members`,{action:"add",userIds:[j]});$("Colleague added to group! 🎉","success"),c=O.channel,l.innerHTML="",await Pe(c._id),Me()}catch(O){$(O.message||"Failed to add member","error"),V.disabled=!1,V.textContent="Add to Group"}}),l.querySelectorAll(".btn-remove-member").forEach(H=>{H.onclick=async()=>{const j=H.dataset.userId,O=H.dataset.name;if(confirm(`Are you sure you want to remove ${O} from this group?`))try{H.disabled=!0;const ce=await Jt(`/bonding/channels/${c._id}/members`,{action:"remove",userId:j});$(`${O} removed from group`,"info"),c=ce.channel,l.innerHTML="",await Pe(c._id),Me()}catch(ce){$(ce.message||"Failed to remove member","error"),H.disabled=!1}}})}async function _(){if(!c||c.type==="direct")return;const l=c.name;if(confirm(`Are you sure you want to leave the group "${l}"?`))try{await Ie(`/bonding/channels/${c._id}/leave`,{}),$(`You left "${l}"`,"info"),g=await Re("/bonding/channels").catch(()=>[]),c=g.find(i=>i.type==="group")||g[0]||null,Ue(),Me(),c&&await Pe(c._id)}catch(i){$(i.message||"Failed to leave group","error")}}async function z(){if(!c||c.type==="direct")return;const l=c.name;if(confirm(`Are you sure you want to delete the group "${l}"?

All messages in this lounge will be deleted.`))try{await Xe(`/bonding/channels/${c._id}`),$(`Group "${l}" deleted successfully`,"success"),g=await Re("/bonding/channels").catch(()=>[]),c=g.find(i=>i.type==="group")||g[0]||null,Ue(),Me(),c&&await Pe(c._id)}catch(i){$(i.message||"Failed to delete group","error")}}function x(){const l=s.querySelector("#bonding-modals-root"),u=w=>w==="employee"||w==="admin"||w==="superadmin",i=o.filter(w=>!w.isSelf&&u(w.role));l.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${i.map(w=>`
                <div class="bonding-user-pick-item" data-user-id="${w._id}" data-name="${y(w.name)}">
                  <div class="bonding-member-avatar">${w.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${y(w.name)}</span>
                    <span class="user-pick-role">${y(w.role==="superadmin"?"Superadmin":w.role==="admin"?"Admin":"Employee")} · ${y(w.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelectorAll(".bonding-user-pick-item").forEach(w=>{w.onclick=async()=>{const R=w.dataset.userId;try{const C=await Ie("/bonding/channels",{type:"direct",targetUserId:R});l.innerHTML="",g=await Re("/bonding/channels"),c=g.find(V=>V._id===C._id)||C,Ue(),Me(),await Pe(c._id)}catch(C){$(C.message||"Failed to open personal chat","error")}}})}function q(){const l=s.querySelector("#bonding-modals-root"),u=C=>C==="employee"||C==="admin"||C==="superadmin",i=o.filter(C=>!C.isSelf&&u(C.role));l.innerHTML=`
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
                ${i.map(C=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${C._id}" />
                    <span>${y(C.name)} (${y(C.role==="superadmin"?"Superadmin":C.role==="admin"?"Admin":"Employee")})</span>
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
    `,l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelector("#btn-cancel-create-grp").onclick=()=>{l.innerHTML=""};let r="👥";const w=l.querySelectorAll(".avatar-opt");w.forEach(C=>{C.onclick=()=>{w.forEach(V=>V.classList.remove("active")),C.classList.add("active"),r=C.textContent.trim()}});const R=l.querySelector("#btn-confirm-create-grp");R.onclick=async()=>{const C=l.querySelector("#new-group-name"),V=l.querySelector("#new-group-desc"),ae=C.value.trim();if(!ae){$("Please enter a group name","warning"),C.focus();return}const H=l.querySelectorAll(".new-group-member-chk:checked"),j=Array.from(H).map(O=>O.value);try{R.disabled=!0,R.textContent="Creating...";const O=await Ie("/bonding/channels",{type:"group",name:ae,description:V.value.trim(),avatar:r,memberIds:j});$(`Group "${ae}" created! 🎉`,"success"),l.innerHTML="",g=await Re("/bonding/channels"),c=g.find(ce=>ce._id===O._id)||O,Ue(),Me(),await Pe(c._id)}catch(O){$(O.message||"Failed to create group","error"),R.disabled=!1,R.textContent="Create Group 🎉"}}}function D(l,u){const i=document.querySelector(".bonding-emoji-popup");i&&i.remove();const r=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],w=document.createElement("div");w.className="bonding-emoji-popup",w.innerHTML=r.map(V=>`<button class="emoji-opt-btn" data-e="${V}">${V}</button>`).join("");const R=l.getBoundingClientRect();w.style.top=`${R.bottom+window.scrollY+6}px`,w.style.left=`${R.left+window.scrollX}px`,document.body.appendChild(w),w.querySelectorAll(".emoji-opt-btn").forEach(V=>{V.onclick=ae=>{ae.stopPropagation(),u(V.dataset.e),w.remove()}});const C=V=>{w.contains(V.target)||(w.remove(),document.removeEventListener("click",C))};setTimeout(()=>document.addEventListener("click",C),10)}function G(l){if(!l)return"";try{return new Date(l).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function Za(){const s=document.getElementById("ci360-bonding-styles");s&&s.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
      animation: diceGlowPulse 1s infinite alternate ease-in-out;
    }

    .ludo-3d-dice.border-red {
      border-color: #ef4444 !important;
      box-shadow: 0 4px 0 #dc2626, 0 8px 18px rgba(239, 68, 68, 0.35) !important;
    }
    .ludo-3d-dice.border-green {
      border-color: #10b981 !important;
      box-shadow: 0 4px 0 #059669, 0 8px 18px rgba(16, 185, 129, 0.35) !important;
    }
    .ludo-3d-dice.border-yellow {
      border-color: #f59e0b !important;
      box-shadow: 0 4px 0 #d97706, 0 8px 18px rgba(245, 158, 11, 0.35) !important;
    }
    .ludo-3d-dice.border-blue {
      border-color: #3b82f6 !important;
      box-shadow: 0 4px 0 #2563eb, 0 8px 18px rgba(59, 130, 246, 0.35) !important;
    }

    @keyframes diceGlowPulse {
      0% {
        transform: scale(1);
        filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
      }
      100% {
        transform: scale(1.06);
        filter: drop-shadow(0 4px 14px rgba(59, 130, 246, 0.65));
      }
    }

    .ludo-3d-dice.rolling {
      animation: diceSimpleRoll 0.35s ease-in-out;
    }

    @keyframes diceSimpleRoll {
      0% { transform: scale(0.92) rotate(0deg); }
      35% { transform: scale(1.15) rotate(140deg); }
      70% { transform: scale(0.96) rotate(260deg); }
      100% { transform: scale(1) rotate(360deg); }
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
  `,document.head.appendChild(t)}function wa(s){if(!s)return"";const t=y(s),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return t.replace(e,p=>`<a href="${p}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${p} ↗</a>`)}const ca=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],$t=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Rt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ii(s,t={}){const{userRole:e="employee",currentUser:p=null,initialTicketId:f=null}=t,g=e==="superadmin"||e==="admin";if(e==="client"||p&&p.role==="client"){s.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let c=[],o={},B=[],Y=[],A={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},E=null,W="comments",U=!1;s.innerHTML=`
    <div class="ci-360-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="ci-360-header-bar">
        <div class="ci-360-header-left">
          <div class="ci-360-breadcrumb">
            <span class="ci-360-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${g?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="ci-360-title-row">
            <h2 class="ci-360-main-title">🎫 ${g?"Support Tickets Board":"Support Tickets"}</h2>
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
            ${$t.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
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
  `,await Promise.all([Ze(),Ke(),rt(),Ct()]),at(),it(),Pe(),Me(),f&&nt(f);const ge=setInterval(()=>{if(!document.contains(s)){clearInterval(ge);return}!(s.querySelector(".dragging")||s.querySelector("input:focus")||s.querySelector("textarea:focus"))&&!E&&le()},12e3),xe=()=>{document.contains(s)&&!E&&le()};window.addEventListener("focus",xe);async function Ke(){try{const a=new URLSearchParams;A.search&&a.set("search",A.search),A.priority!=="all"&&a.set("priority",A.priority),A.category!=="all"&&a.set("category",A.category),A.assigneeId!=="all"&&a.set("assigneeId",A.assigneeId),A.jobId&&A.jobId!=="all"&&a.set("jobId",A.jobId),A.reporterId&&A.reporterId!=="all"&&a.set("reporterId",A.reporterId),A.scope==="created"&&a.set("reporterId",p?._id||p?.id),A.scope==="assigned"&&a.set("assigneeId",p?._id||p?.id),A.myIssuesOnly&&a.set("myIssuesOnly","true");const n=await Re("/tickets?"+a.toString());c=Array.isArray(n)?n:[]}catch(a){$(a.message||"Failed to load tickets",!0),c=[]}}async function Ze(){try{o=await Re("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function rt(){try{let a;try{a=await Re("/tickets/staff")}catch{a=await Re("/users")}B=(a||[]).filter(n=>n.active!==!1&&n.role!=="client")}catch(a){console.warn("Could not fetch employees:",a),B=[]}}async function Ct(){try{const a=await Re("/jobs?limit=250");Y=Array.isArray(a)?a:a?.jobs||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function at(){const a=s.querySelector("#ci-360-stats-root");a&&(a.innerHTML=`
      <div class="ci-360-stat-card ${A.status==="all"&&!A.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="ci-360-stat-val">${o.total||0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${A.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${o.toDo||0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${A.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${o.content??(o.inProgress||0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${A.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${o.design||0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${A.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${o.underReview||0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${A.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
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
    `,a.querySelectorAll(".ci-360-stat-card").forEach(n=>{n.onclick=async()=>{const m=n.dataset.statFilter;m==="all"?(A.status="all",A.priority="all"):m==="critical"?(A.priority="Critical",A.status="all"):(A.status=m,A.priority="all"),await le()}}))}function Pe(){const a=s.querySelector("#ci-360-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${B.map(m=>`
          <option value="${m._id}" ${A.assigneeId===m._id.toString()?"selected":""}>
            ${y(m.name)} (${y(m.role)})
          </option>
        `).join("")}
      `);const n=s.querySelector("#ci-360-filter-job");n&&(n.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${Y.map(m=>`
          <option value="${m._id}" ${A.jobId===m._id.toString()?"selected":""}>
            📁 ${y(m.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function it(){const a=s.querySelector("#ci-360-board-columns-root");if(!a)return;const n={};ca.forEach(m=>{n[m.key]=[]}),c.forEach(m=>{let v=m.status||"To Do";v==="In Progress"?v="Content":v==="Resolved"?v="Under Review":v==="Closed"&&(v="Ready to Leave"),n[v]||(n[v]=[]),n[v].push(m)}),a.innerHTML=ca.map(m=>{const v=n[m.key]||[];return`
        <div class="ci-360-board-column" data-status="${m.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${y(m.label)}</span>
              <span class="ci-360-col-badge">${v.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${m.key}">
            ${v.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:v.map(T=>ut(T)).join("")}
          </div>
        </div>
      `}).join(""),Ue(),ct()}function ut(a){const n=$t.find(q=>q.key===a.category)||$t[0],m=Rt.find(q=>q.key===a.priority)||Rt[2],v=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",T=(a.subtasks||[]).filter(q=>q.completed).length,N=(a.subtasks||[]).length,k=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],F=p?._id||p?.id,M=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(F)||a.userId&&String(a.userId)===String(F),_=e==="superadmin"||p?.role==="superadmin",z=M||_;let x="";if(k.length===0)x='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const q=k.slice(0,3),D=k.length-3;x=`
        <div class="ci-360-avatar-group">
          ${q.map(G=>`
            <div class="ci-360-avatar" title="Assignee: ${y(G.name||"Member")} (${y(G.role||"")})">
              ${(G.avatar||G.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${D>0?`
            <div class="ci-360-avatar extra-count" title="${D} more assignees: ${y(k.slice(3).map(G=>G.name).join(", "))}">
              +${D}
            </div>
          `:""}
        </div>
      `}return`
      <div class="ci-360-card" draggable="true" data-ticket-id="${a._id}">
        <div class="ci-360-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="ci-360-category-pill ${n.slug}">
              ${n.icon} ${n.label}
            </span>
            ${M?`
              <span class="ci-360-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${a.dueDate?`
              <span class="ci-360-due-pill ${v?"overdue":""}" title="Due Date">
                ${v?"⚠️ ":"📅 "}
                ${new Date(a.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          ${z?`
            <button type="button" class="ci-360-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${y(a.ticketId)}" title="Delete Ticket (${_?"Superadmin":"Creator"})">
              🗑️
            </button>
          `:""}
        </div>

        <div class="ci-360-card-title" title="${y(a.title)}">
          ${y(a.title)}
        </div>

        ${a.jobTitle||a.jobId&&a.jobId.title?`
          <div class="ci-360-card-job-link" title="Linked Internal Job: ${y(a.jobTitle||a.jobId.title)}">
            📁 ${y(a.jobTitle||a.jobId.title)}
          </div>
        `:""}

        ${a.linkUrl||a.links&&a.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${y(a.linkUrl||a.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${y(a.linkUrl||a.links[0]?.url)}">
              🔗 ${a.links&&a.links[0]?.title?y(a.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="ci-360-card-bottom">
          <div class="ci-360-card-id-row">
            <span class="ci-360-pri-icon" title="Priority: ${m.label}">${m.icon}</span>
            <span class="ci-360-ticket-id">${y(a.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${N>0?`
              <span class="ci-360-subtask-badge" title="${T} of ${N} subtasks completed">
                ☑ ${T}/${N}
              </span>
            `:""}
            ${x}
          </div>
        </div>
      </div>
    `}function Ue(){const a=s.querySelectorAll(".ci-360-card"),n=s.querySelectorAll(".ci-360-board-column");a.forEach(m=>{m.ondragstart=v=>{v.dataTransfer.setData("text/plain",m.dataset.ticketId),m.classList.add("dragging")},m.ondragend=()=>{m.classList.remove("dragging")}}),n.forEach(m=>{m.ondragover=v=>{v.preventDefault(),m.classList.add("drag-over")},m.ondragleave=()=>{m.classList.remove("drag-over")},m.ondrop=async v=>{v.preventDefault(),m.classList.remove("drag-over");const T=v.dataTransfer.getData("text/plain"),N=m.dataset.status;if(!T||!N)return;const k=c.find(z=>z._id.toString()===T);if(!k||k.status===N)return;const F=k.status,M=k.assignees?[...k.assignees]:[],_=k.assignee?{...k.assignee}:null;if(k.status=N,N==="Under Review"){const z={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};k.assignee=z,k.assignees=[z]}it();try{const z=await Qe(`/tickets/${T}/status`,{status:N}),x=N==="Under Review"?`Moved ${z.ticketId} to Under Review (Default assigned to John)`:`Moved ${z.ticketId} to ${N}`;$(x,!1),await le()}catch(z){$(z.message||"Status update failed",!0),k.status=F,k.assignees=M,k.assignee=_,await le()}}})}function ct(){s.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async n=>{n.stopPropagation(),n.preventDefault();const m=a.dataset.ticketId,v=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${v}?`)){a.disabled=!0;try{await Xe(`/tickets/${m}`),$(`Ticket ${v} deleted`,!1),await le()}catch(T){$(T.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),s.querySelectorAll(".ci-360-card").forEach(a=>{a.onclick=n=>{if(n.target.tagName==="A"||n.target.closest(".btn-delete-card-ticket"))return;const m=a.dataset.ticketId;nt(m)}})}function Me(){const a=s.querySelector("#btn-ci-360-refresh");a&&(a.onclick=async()=>{await le(),$("Board updated",!1)});const n=s.querySelector("#btn-ci-360-create-ticket");n&&(n.onclick=()=>{d()});const m=s.querySelector("#ci-360-search-input");let v=null;m&&(m.oninput=G=>{clearTimeout(v),v=setTimeout(async()=>{A.search=G.target.value.trim(),ze(),await le()},300)});const T=s.querySelector("#ci-360-filter-priority");T&&(T.onchange=async G=>{A.priority=G.target.value,ze(),await le()});const N=s.querySelector("#ci-360-filter-category");N&&(N.onchange=async G=>{A.category=G.target.value,ze(),await le()});const k=s.querySelector("#ci-360-filter-job");k&&(k.onchange=async G=>{A.jobId=G.target.value,ze(),await le()});const F=s.querySelector("#ci-360-filter-assignee");F&&(F.onchange=async G=>{A.assigneeId=G.target.value,ze(),await le()});const M=s.querySelector("#ci-360-pill-my-issues");M&&(M.onclick=async()=>{A.myIssuesOnly=!A.myIssuesOnly,M.classList.toggle("active",A.myIssuesOnly),ze(),await le()});const _=s.querySelector("#ci-360-pill-scope-all"),z=s.querySelector("#ci-360-pill-scope-assigned"),x=s.querySelector("#ci-360-pill-scope-created"),q=async G=>{A.scope=G,_&&_.classList.toggle("active",G==="all"),z&&z.classList.toggle("active",G==="assigned"),x&&x.classList.toggle("active",G==="created"),ze(),await le()};_&&(_.onclick=()=>q("all")),z&&(z.onclick=()=>q("assigned")),x&&(x.onclick=()=>q("created"));const D=s.querySelector("#ci-360-clear-filters");D&&(D.onclick=async()=>{A={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},m&&(m.value=""),T&&(T.value="all"),N&&(N.value="all");const G=s.querySelector("#ci-360-filter-job");G&&(G.value="all"),F&&(F.value="all"),M&&M.classList.remove("active"),_&&_.classList.add("active"),z&&z.classList.remove("active"),x&&x.classList.remove("active"),ze(),await le()})}function ze(){const a=s.querySelector("#ci-360-clear-filters");if(!a)return;const n=A.search||A.priority!=="all"||A.category!=="all"||A.jobId&&A.jobId!=="all"||A.assigneeId!=="all"||A.myIssuesOnly||A.scope&&A.scope!=="all";a.style.display=n?"inline":"none"}async function le(){await Ke(),it()}async function nt(a){const n=s.querySelector("#ci-360-modals-root");if(n){n.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{E=await Re(`/tickets/${a}`)}catch(m){$(m.message||"Could not load ticket",!0),n.innerHTML="";return}he()}}function he(){const a=s.querySelector("#ci-360-modals-root");if(!a||!E)return;const n=E,m=$t.find(r=>r.key===n.category)||$t[0];Rt.find(r=>r.key===n.priority)||Rt[2];const v=n.subtasks||[],T=v.filter(r=>r.completed).length,N=v.length>0?Math.round(T/v.length*100):0,k=n.attachments||[],F=n.comments||[],M=(n.history||[]).slice().reverse(),_=n.workLogs||[],z=n.linkedTickets||[],x=p?._id||p?.id,q=n.reporter&&n.reporter.userId&&String(n.reporter.userId)===String(x)||n.userId&&String(n.userId)===String(x),D=e==="superadmin"||p?.role==="superadmin",G=q||D,l=Array.isArray(n.assignees)&&n.assignees.length>0?n.assignees:n.assignee&&n.assignee.userId?[n.assignee]:[];l.some(r=>r&&r.userId&&String(r.userId)===String(x));const u=n.jobId?._id?n.jobId._id.toString():n.jobId?n.jobId.toString():"",i=n.jobTitle||n.jobId&&n.jobId.title||"";a.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${m.slug}">${m.icon} ${m.label}</span>
              <span class="ci-360-ticket-id" style="font-size:13px;color:#38bdf8;">${y(n.ticketId)}</span>
            </div>
            <button class="ci-360-modal-close" id="btn-close-ci-360-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="ci-360-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="ci-360-detail-main">
              <!-- Issue Title Header -->
              <div class="ci-360-issue-header-wrap">
                <input type="text" class="ci-360-editable-title" id="inp-detail-title" value="${y(n.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Description</span>
                  <button type="button" class="ci-360-tool-btn" id="btn-toggle-desc-edit">
                    ${U?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${U?`
                  <div class="ci-360-editor-toolbar">
                    <button type="button" class="ci-360-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="ci-360-desc-editor" rows="6">${y(n.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-ci-360-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="ci-360-desc-wrap" id="view-detail-desc">
                    ${n.description?wa(n.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>🔗 Reference &amp; External Links (${(n.links||[]).length+(n.linkUrl&&!(n.links||[]).some(r=>r.url===n.linkUrl)?1:0)})</span>
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

                ${n.links&&n.links.length>0||n.linkUrl?`
                  <div class="ci-360-links-list" style="display:flex;flex-direction:column;gap:8px;">
                    ${n.linkUrl&&!(n.links||[]).some(r=>r.url===n.linkUrl)?`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${y(n.linkUrl)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${y(n.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${y(n.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${y(n.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    `:""}
                    ${(n.links||[]).map(r=>`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${y(r.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${y(r.title||r.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${r.title?`<span style="word-break:break-all;">${y(r.url)}</span> · `:""}Added by ${y(r.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${y(r.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${y(r.url)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
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
                  <span>Attachments (${k.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${k.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${k.map(r=>{const w=r.type&&r.type.includes("video")||r.name&&r.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||r.url&&r.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="ci-360-att-card ${w?"is-video":""}" style="${w?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${w?"16px":"13px"};">${w?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${y(r.name)}">
                                  ${y(r.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${ga(r.size)} ${w?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${w?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${r.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${r.url}" download="${y(r.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${r.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${w?`
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
                  <span>Subtasks (${T}/${v.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${N}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${N}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${v.map(r=>`
                    <div class="ci-360-subtask-item">
                      <div class="ci-360-subtask-left">
                        <input type="checkbox" class="ci-360-subtask-cb cb-subtask-toggle" data-subtask-id="${r.id}" ${r.completed?"checked":""} />
                        <span class="ci-360-subtask-title ${r.completed?"done":""}">${y(r.title)}</span>
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
                  <span>Linked Work Items (${z.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${z.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${z.map(r=>`
                      <div class="ci-360-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${y(r.relationship)}</span>
                          <span class="ci-360-ticket-id" style="color:#38bdf8;">${y(r.ticketId)}</span>
                          <span class="ci-360-linked-title" style="font-size:12.5px;">${y(r.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="ci-360-col-badge">${y(r.status||"Open")}</span>
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
                    ${i?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${i?`
                  <div class="ci-360-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div class="ci-360-job-card-title" style="font-weight:700;font-size:13px;">${y(i)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${y(u)}</div>
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
                      ${Y.map(r=>`
                        <option value="${r._id}" ${u===r._id.toString()?"selected":""}>
                          📁 ${y(r.title||"Untitled Job")}
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
                  <button type="button" class="ci-360-act-tab ${W==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${F.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${W==="history"?"active":""}" data-act-tab="history">
                    History (${M.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${W==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${_.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${W==="comments"?`
                  <div class="ci-360-comments-feed">
                    ${F.map(r=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(r.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${y(r.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${y(r.userRole)})</span></span>
                            <span class="ci-360-comment-time">${aa(r.createdAt)}</span>
                          </div>
                          <div class="ci-360-comment-body">${wa(r.content)}</div>
                        </div>
                      </div>
                    `).join("")}

                    <!-- Add Comment Composer -->
                    <div class="ci-360-comment-composer">
                      <div class="ci-360-avatar" style="background:#3b82f6;">
                        ${(p?.name||"U").slice(0,1).toUpperCase()}
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
                ${W==="history"?`
                  <div class="ci-360-history-feed">
                    ${M.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:M.map(r=>`
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(r.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${y(r.userName)}</span>
                            <span class="ci-360-comment-time">${aa(r.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="ci-360-history-field">${y(r.field)}</strong>:
                            ${r.from?`<span style="text-decoration:line-through;color:#ef4444;">${y(r.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${y(r.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${W==="worklog"?`
                  <div class="ci-360-worklog-feed">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${n.loggedHours||0} hrs</strong></span>
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

                    ${_.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:_.map(r=>`
                      <div class="ci-360-worklog-item">
                        <div class="ci-360-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(r.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-worklog-main">
                          <div class="ci-360-worklog-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${y(r.userName)} logged <strong style="color:#38bdf8;">${y(r.timeSpent)}</strong></span>
                            <span class="ci-360-comment-time">${aa(r.loggedAt)}</span>
                          </div>
                          ${r.description?`<div class="ci-360-comment-body" style="font-size:12px;">${y(r.description)}</div>`:""}
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
                  ${ca.map(r=>{let w=n.status||"To Do";return w==="In Progress"?w="Content":w==="Resolved"?w="Under Review":w==="Closed"&&(w="Ready to Leave"),`
                      <option value="${r.key}" ${w===r.key?"selected":""}>
                        ${r.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="ci-360-select-field">
                  ${Rt.map(r=>`
                    <option value="${r.key}" ${n.priority===r.key?"selected":""}>
                      ${r.icon} ${r.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="ci-360-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="ci-360-side-lbl" style="margin-bottom:0;">Assigned Personnel (${l.length})</span>
                  
                    <button type="button" class="ci-360-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="ci-360-assigned-chips-wrap">
                  ${l.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:l.map(r=>`
                    <div class="ci-360-assignee-chip">
                      <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(r.avatar||r.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="ci-360-assignee-chip-name" title="${y(r.name)}">${y(r.name)}</span>
                      ${`
                        <button type="button" class="ci-360-assignee-chip-remove btn-remove-assignee" data-user-id="${r.userId}" title="Remove ${y(r.name)}">&times;</button>
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
                    ${B.map(r=>{const w=l.some(R=>R&&R.userId&&String(R.userId)===String(r._id));return`
                        <label class="ci-360-emp-check-item ${w?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${r._id}" ${w?"checked":""} />
                          <div class="ci-360-avatar" style="width:18px;height:18px;font-size:9px;">${(r.name||"U").slice(0,1).toUpperCase()}</div>
                          <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                            ${y(r.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${y(r.role)})</span>
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
                    ${(n.reporter?.name||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${y(n.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${y(n.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Category</span>
                <select id="sel-detail-category" class="ci-360-select-field">
                  ${$t.map(r=>`
                    <option value="${r.key}" ${n.category===r.key?"selected":""}>
                      ${r.icon} ${r.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="ci-360-date-field" value="${n.dueDate?new Date(n.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="ci-360-select-field">
                  <option value="">None (Workspace General)</option>
                  ${Y.map(r=>`
                    <option value="${r._id}" ${u===r._id.toString()?"selected":""}>
                      📁 ${y(r.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${n.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" class="ci-360-est-input" value="${n.estimatedHours||0}" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(n.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(n.updatedAt).toLocaleString()}</div>
                ${n.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(n.resolvedAt).toLocaleString()}</div>`:""}
              </div>

              <!-- Actions (Delete - Creator or Superadmin) -->
              ${G?`
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
    `,st()}function st(){const a=s.querySelector("#ci-360-modals-root");if(!a||!E)return;const n=a.querySelector("#btn-close-ci-360-modal");n&&(n.onclick=ot);const m=a.querySelector("#ci-360-detail-backdrop");m&&(m.onclick=L=>{L.target===m&&ot()});const v=a.querySelector("#inp-detail-title");v&&(v.onchange=async()=>{const L=v.value.trim();if(L)try{E=await Qe(`/tickets/${E._id}`,{title:L}),await le()}catch(K){$(K.message||"Failed to update title",!0)}});const T=a.querySelector("#btn-toggle-desc-edit");T&&(T.onclick=()=>{U=!U,he()});const N=a.querySelector("#btn-cancel-desc");N&&(N.onclick=()=>{U=!1,he()});const k=a.querySelector("#btn-save-desc");k&&(k.onclick=async()=>{const L=a.querySelector("#inp-detail-desc")?.value;try{E=await Qe(`/tickets/${E._id}`,{description:L}),U=!1,he(),await le(),$("Description saved",!1)}catch(K){$(K.message||"Failed to save description",!0)}});const F=a.querySelector("#sel-detail-status");F&&(F.onchange=async L=>{try{const K=await Qe(`/tickets/${E._id}/status`,{status:L.target.value});E=K,he(),await Ze(),at(),await le();const b=K.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${K.status}`;$(b,!1)}catch(K){$(K.message||"Status change failed",!0)}});const M=a.querySelector("#sel-detail-priority");M&&(M.onchange=async L=>{try{E=await Qe(`/tickets/${E._id}`,{priority:L.target.value}),he(),await le()}catch(K){$(K.message,!0)}});const _=a.querySelector("#btn-toggle-assignee-picker"),z=a.querySelector("#ci-360-detail-assignee-box"),x=a.querySelector("#btn-close-detail-assignee-box"),q=a.querySelector("#btn-save-detail-assignees");_&&z&&(_.onclick=()=>{const L=z.style.display==="none";z.style.display=L?"block":"none"}),x&&z&&(x.onclick=()=>{z.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(L=>{L.onchange=()=>{L.closest(".ci-360-emp-check-item")?.classList.toggle("selected",L.checked)}}),q&&(q.onclick=async()=>{const L=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(K=>K.value);try{q.disabled=!0,E=await Qe(`/tickets/${E._id}`,{assigneeIds:L}),he(),await le(),$("Assignees updated!",!1)}catch(K){$(K.message,!0),q.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(L=>{L.onclick=async()=>{const K=L.dataset.userId,we=(Array.isArray(E.assignees)&&E.assignees.length>0?E.assignees:E.assignee?.userId?[E.assignee]:[]).filter($e=>$e&&$e.userId&&String($e.userId)!==String(K)).map($e=>String($e.userId));try{E=await Qe(`/tickets/${E._id}`,{assigneeIds:we}),he(),await le(),$("Assignee removed",!1)}catch($e){$($e.message,!0)}}});const D=a.querySelector("#sel-detail-category");D&&(D.onchange=async L=>{try{E=await Qe(`/tickets/${E._id}`,{category:L.target.value}),he(),await le()}catch(K){$(K.message,!0)}});const G=a.querySelector("#inp-detail-duedate");G&&(G.onchange=async L=>{try{E=await Qe(`/tickets/${E._id}`,{dueDate:L.target.value||null}),he(),await le()}catch(K){$(K.message,!0)}});const l=a.querySelector("#sel-detail-job");l&&(l.onchange=async L=>{try{E=await Qe(`/tickets/${E._id}`,{jobId:L.target.value||null}),he(),await le(),$(L.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(K){$(K.message,!0)}});const u=a.querySelector("#btn-toggle-job-link"),i=a.querySelector("#ci-360-job-link-box");u&&i&&(u.onclick=()=>{i.style.display=i.style.display==="none"?"block":"none"});const r=a.querySelector("#btn-cancel-job-link");r&&i&&(r.onclick=()=>{i.style.display="none"});const w=a.querySelector("#btn-save-job-link");w&&(w.onclick=async()=>{const L=a.querySelector("#inp-modal-job-select")?.value||null;try{E=await Qe(`/tickets/${E._id}`,{jobId:L}),he(),await le(),$(L?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(K){$(K.message,!0)}});const R=a.querySelector("#btn-unlink-job");R&&(R.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{E=await Qe(`/tickets/${E._id}`,{jobId:null}),he(),await le(),$("Job unlinked",!1)}catch(L){$(L.message,!0)}});const C=a.querySelector("#inp-detail-esthours");C&&(C.onchange=async L=>{try{E=await Qe(`/tickets/${E._id}`,{estimatedHours:Number(L.target.value)||0})}catch(K){$(K.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(L=>{L.onchange=async()=>{const K=L.dataset.subtaskId;try{E=await Qe(`/tickets/${E._id}/subtasks/${K}`,{completed:L.checked}),he(),await le()}catch(b){$(b.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(L=>{L.onclick=async()=>{const K=L.dataset.subtaskId;try{E=await Xe(`/tickets/${E._id}/subtasks/${K}`),he(),await le()}catch(b){$(b.message,!0)}}});const V=a.querySelector("#inp-new-subtask"),ae=a.querySelector("#btn-add-subtask"),H=async()=>{const L=V?.value.trim();if(L)try{E=await Ie(`/tickets/${E._id}/subtasks`,{title:L}),he(),await le()}catch(K){$(K.message,!0)}};ae&&(ae.onclick=H),V&&(V.onkeydown=L=>{L.key==="Enter"&&(L.preventDefault(),H())});const j=a.querySelector("#btn-toggle-add-link"),O=a.querySelector("#add-link-form"),ce=a.querySelector("#btn-cancel-new-link"),ne=a.querySelector("#btn-save-new-link"),se=a.querySelector("#inp-new-link-url"),ue=a.querySelector("#inp-new-link-title");j&&O&&(j.onclick=()=>{const L=O.style.display==="none";O.style.display=L?"block":"none",L&&se&&se.focus()}),ce&&O&&(ce.onclick=()=>{O.style.display="none",se&&(se.value=""),ue&&(ue.value="")}),ne&&se&&(ne.onclick=async()=>{const L=se.value.trim(),K=ue?.value.trim()||"";if(!L){$("Please enter a valid URL link",!0);return}try{ne.disabled=!0,ne.textContent="Saving...",E=await Ie(`/tickets/${E._id}/links`,{url:L,title:K}),he(),await le(),$("Reference link added! 🔗",!1)}catch(b){$(b.message||"Failed to save link",!0),ne.disabled=!1,ne.textContent="Save Link 🔗"}}),a.querySelectorAll(".btn-copy-link").forEach(L=>{L.onclick=()=>{const K=L.dataset.url;K&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(K).then(()=>{$("Link copied to clipboard! 📋")}).catch(()=>{$("Link: "+K)}):$("Link: "+K))}}),a.querySelectorAll(".btn-del-link").forEach(L=>{L.onclick=async()=>{const K=L.dataset.linkId;try{E=await Xe(`/tickets/${E._id}/links/${K}`),he(),await le(),$("Link removed")}catch(b){$(b.message||"Failed to remove link",!0)}}});const J=a.querySelector("#btn-trigger-detail-upload"),ie=a.querySelector("#inp-detail-att-upload"),be=a.querySelector("#detail-att-upload-progress");J&&ie&&(J.onclick=L=>{L.preventDefault(),ie.click()}),ie&&(ie.onchange=async()=>{const L=Array.from(ie.files||[]);if(ie.value="",!!L.length){be&&(be.style.display="block",be.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${L.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const b=(await ba(L,we=>{const $e=a.querySelector("#att-prog-pct"),lt=a.querySelector("#att-prog-bar");$e&&($e.textContent=`${we}%`),lt&&(lt.style.width=`${we}%`)})).map(we=>({name:we.name,url:we.url,size:we.size||0,type:we.type||"application/octet-stream"}));b.length&&(E=await Ie(`/tickets/${E._id}/attachments`,{attachments:b}),he(),$(`Successfully attached ${b.length} file(s)! 📎`,!1))}catch(K){console.error("Upload error:",K),$(`Upload failed: ${K.message}`,!0)}finally{be&&(be.style.display="none")}}}),a.querySelectorAll(".btn-play-att-video").forEach(L=>{L.onclick=()=>{const K=L.dataset.slot,b=a.querySelector("#"+K);if(b){const we=b.style.display==="none";b.style.display=we?"block":"none",L.textContent=we?"⏸ Close Video":"▶ Play Video";const $e=b.querySelector("video");$e&&we?$e.play().catch(()=>{}):$e&&$e.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(L=>{L.onclick=async()=>{const K=L.dataset.attId;try{E=await Xe(`/tickets/${E._id}/attachments/${K}`),he()}catch(b){$(b.message,!0)}}}),a.querySelectorAll(".ci-360-act-tab").forEach(L=>{L.onclick=()=>{W=L.dataset.actTab,he()}});const pe=a.querySelector("#inp-new-comment"),me=a.querySelector("#btn-submit-comment");me&&pe&&(me.onclick=async()=>{const L=pe.value.trim();if(L)try{me.disabled=!0,me.textContent="Saving...",E=await Ie(`/tickets/${E._id}/comments`,{content:L}),he(),$("Comment added",!1)}catch(K){$(K.message||"Failed to add comment",!0)}finally{me.disabled=!1}});const _e=a.querySelector("#btn-open-link-dialog"),Fe=a.querySelector("#ci-360-link-box"),Be=a.querySelector("#btn-cancel-link"),Le=a.querySelector("#btn-submit-link"),de=a.querySelector("#inp-link-target"),De=a.querySelector("#sel-link-rel");_e&&Fe&&(_e.onclick=()=>{Fe.style.display="block"}),Be&&Fe&&(Be.onclick=()=>{Fe.style.display="none"}),Le&&Fe&&(Le.onclick=async()=>{const L=de?.value.trim(),K=De?.value||"relates to";if(L)try{Le.disabled=!0,E=await Ie(`/tickets/${E._id}/links`,{targetTicketId:L,relationship:K}),he(),$(`Linked with ${L}`,!1)}catch(b){$(b.message||"Failed to link ticket",!0)}finally{Le.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(L=>{L.onclick=async()=>{const K=L.dataset.linkId;try{E=await Xe(`/tickets/${E._id}/links/${K}`),he()}catch(b){$(b.message,!0)}}});const He=a.querySelector("#btn-open-worklog-dialog"),Ne=a.querySelector("#ci-360-worklog-box"),Ee=a.querySelector("#btn-cancel-worklog"),ye=a.querySelector("#btn-submit-worklog"),Ae=a.querySelector("#inp-worklog-time"),ke=a.querySelector("#inp-worklog-desc");He&&Ne&&(He.onclick=()=>{Ne.style.display="block"}),Ee&&Ne&&(Ee.onclick=()=>{Ne.style.display="none"}),ye&&Ne&&(ye.onclick=async()=>{const L=Ae?.value.trim(),K=ke?.value.trim();if(!L){$("Enter time spent (e.g. 2h 30m)",!0);return}try{ye.disabled=!0,E=await Ie(`/tickets/${E._id}/worklogs`,{timeSpent:L,description:K}),he(),$("Work logged",!1)}catch(b){$(b.message||"Failed to log work",!0)}finally{ye.disabled=!1}});const fe=a.querySelector("#btn-delete-ticket");fe&&(fe.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${E.ticketId}?`))try{fe.disabled=!0,await Xe(`/tickets/${E._id}`),$(`Ticket ${E.ticketId} deleted`,!1),ot(),await Ze(),at(),await le()}catch(L){$(L.message||"Failed to delete ticket",!0),fe.disabled=!1}})}function ot(){E=null,U=!1;const a=s.querySelector("#ci-360-modals-root");a&&(a.innerHTML="")}function d(a=null){const n=s.querySelector("#ci-360-modals-root");if(!n)return;const m=a||(A.jobId&&A.jobId!=="all"?A.jobId:null);n.innerHTML=`
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
                  ${$t.map(i=>`<option value="${i.key}">${i.icon} ${i.label}</option>`).join("")}
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
                  ${B.map(i=>{const r=p&&String(p._id||p.id)===String(i._id);return`
                      <label class="ci-360-emp-check-item ${r?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${i._id}" ${r?"checked":""} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(i.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${y(i.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${y(i.role)})${r?" — (You)":""}</span>
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
                  ${Y.map(i=>`
                    <option value="${i._id}" ${m&&String(m)===String(i._id)?"selected":""}>
                      📁 ${y(i.title||"Untitled Job")}
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
    `;const v=()=>{n.querySelectorAll(".ci-360-emp-check-item").forEach(i=>{const r=i.querySelector(".chk-create-emp");i.classList.toggle("selected",!!r?.checked)})};n.querySelectorAll(".chk-create-emp").forEach(i=>{i.onchange=v});const T=n.querySelector("#btn-create-assign-self");T&&p&&(T.onclick=()=>{const i=String(p._id||p.id);n.querySelectorAll(".chk-create-emp").forEach(r=>{r.value===i&&(r.checked=!0)}),v()});const N=n.querySelector("#btn-create-clear-assign");N&&(N.onclick=()=>{n.querySelectorAll(".chk-create-emp").forEach(i=>{i.checked=!1}),v()});const k=[],F=n.querySelector("#inp-create-ticket-att"),M=n.querySelector("#create-att-list"),_=n.querySelector("#create-att-count"),z=n.querySelector("#create-att-progress"),x=()=>{_&&(_.textContent=`${k.length} file(s) attached`),M&&(M.innerHTML=k.map((i,r)=>{const w=i.type&&i.type.includes("video")||i.name&&i.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${w?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${y(i.name)}">${y(i.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${ga(i.size)} ${w?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${r}" title="Remove">&times;</button>
          </div>
        `}).join(""),M.querySelectorAll(".btn-del-pending-att").forEach(i=>{i.onclick=()=>{k.splice(Number(i.dataset.idx),1),x()}}))};F&&(F.onchange=async()=>{const i=Array.from(F.files||[]);if(F.value="",!!i.length){z&&(z.style.display="block",z.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${i.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await ba(i,w=>{const R=n.querySelector("#create-prog-pct"),C=n.querySelector("#create-prog-bar");R&&(R.textContent=`${w}%`),C&&(C.style.width=`${w}%`)})).forEach(w=>{k.push({name:w.name,url:w.url,size:w.size||0,type:w.type||"application/octet-stream"})}),x()}catch(r){$(`Failed to upload files: ${r.message}`,!0)}finally{z&&(z.style.display="none"),F.value=""}}});const q=()=>{n.innerHTML=""},D=n.querySelector("#btn-close-create-modal");D&&(D.onclick=q);const G=n.querySelector("#btn-cancel-create-ticket");G&&(G.onclick=q);const l=n.querySelector("#ci-360-create-backdrop");l&&(l.onclick=i=>{i.target===l&&q()});const u=n.querySelector("#btn-submit-create-ticket");u&&(u.onclick=async()=>{const i=n.querySelector("#create-ticket-title")?.value.trim(),r=n.querySelector("#create-ticket-desc")?.value.trim(),w=n.querySelector("#create-ticket-cat")?.value||"Task",R=n.querySelector("#create-ticket-pri")?.value||"Medium",V=Array.from(n.querySelectorAll(".chk-create-emp:checked")).map(O=>O.value),ae=n.querySelector("#create-ticket-duedate")?.value||null,H=n.querySelector("#create-ticket-job")?.value||null,j=n.querySelector("#create-ticket-url")?.value.trim()||"";if(!i){$("Ticket summary / title is required",!0);return}try{u.disabled=!0,u.textContent="Creating...";const O=await Ie("/tickets",{title:i,description:r,category:w,priority:R,assigneeIds:V,assigneeId:V[0]||null,dueDate:ae,jobId:H,linkUrl:j,attachments:k});$(`Ticket ${O.ticketId} created! 🎫`,!1),q(),await Ze(),at(),await le(),nt(O._id)}catch(O){$(O.message||"Could not create ticket",!0),u.disabled=!1,u.textContent="Create Ticket 🚀"}})}s._openCreateTicketModal=d,s._openTicketDetailModal=nt,s._setJobFilter=async a=>{A.jobId=a||"all";const n=s.querySelector("#ci-360-filter-job");n&&(n.value=A.jobId),ze(),await le()}}export{ii as a,ai as b,ti as i};
