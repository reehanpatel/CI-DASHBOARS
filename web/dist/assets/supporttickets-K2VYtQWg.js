import{c as Re,k as $,e as y,v as Je,l as Qe,p as Ft,m as Qt,j as Se,w as ga,x as ta,y as ba}from"./api-FGezNYCI.js";const ma={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function _a(){try{const s=localStorage.getItem("ci360_planner_settings");if(s)return Object.assign({},ma,JSON.parse(s))}catch{}return Object.assign({},ma)}function Aa(s){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(s))}catch{}}function Ne(){const s=new Date,t=s.getFullYear(),e=String(s.getMonth()+1).padStart(2,"0"),p=String(s.getDate()).padStart(2,"0");return`${t}-${e}-${p}`}function Vt(s,t){const e=new Date(s+"T00:00:00");e.setDate(e.getDate()+t);const p=e.getFullYear(),h=String(e.getMonth()+1).padStart(2,"0"),g=String(e.getDate()).padStart(2,"0");return`${p}-${h}-${g}`}function xt(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function Fe(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function fa(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function Lt(s,t=1){const e=new Date(s+"T00:00:00"),p=e.getDay(),h=(p<t?7:0)+p-t,g=new Date(e);g.setDate(e.getDate()-h);const c=[];for(let r=0;r<7;r++){const R=new Date(g);R.setDate(g.getDate()+r);const Y=R.getFullYear(),A=String(R.getMonth()+1).padStart(2,"0"),E=String(R.getDate()).padStart(2,"0");c.push(`${Y}-${A}-${E}`)}return c}function Da(){try{const s=window.AudioContext||window.webkitAudioContext;if(!s)return;const t=new s,e=t.currentTime,p=t.createOscillator(),h=t.createGain();p.type="sine",p.frequency.setValueAtTime(523.25,e),p.frequency.exponentialRampToValueAtTime(783.99,e+.15),h.gain.setValueAtTime(.2,e),h.gain.exponentialRampToValueAtTime(.001,e+.35),p.connect(h),h.connect(t.destination),p.start(e),p.stop(e+.35)}catch{}}function ai(s,t={}){const{userRole:e="employee",currentUser:p=null,onNavigate:h=null}=t,g=e==="superadmin"||e==="admin";let c=_a(),r={selectedDate:Ne(),viewMode:"daily",filterStatus:"all",searchQuery:"",groupByEmployee:g,collapsedEmployees:{},selectedCategory:"all",selectedPersonnelId:"all",tasks:[],personnelList:[],loading:!1};Ta(),R();async function R(){r.loading=!0,Y();try{const d=[Re("/tasks")];g&&d.push(Re("/personnel").catch(()=>[]));const[a,n]=await Promise.all(d);r.tasks=Array.isArray(a)?a:[],n&&(r.personnelList=Array.isArray(n)?n:[])}catch(d){$("Failed to load planner tasks: "+d.message,!0)}finally{r.loading=!1,O()}}function Y(){s.innerHTML=`
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
    `}function A(d){return r.tasks.filter(a=>{if(a.isDeleted===!0)return!1;if(g&&r.selectedPersonnelId!=="all"){const v=a.personnelId?._id||a.personnelId,T=String(v)===String(r.selectedPersonnelId),N=Array.isArray(a.coOwners)&&a.coOwners.some(w=>{const L=w.personnelId?._id||w.personnelId||w.userId?._id||w.userId;return String(L)===String(r.selectedPersonnelId)});if(!T&&!N)return!1}const n=a.completionDateStr||a.dateStr||(a.dueDate?new Date(a.dueDate).toISOString().slice(0,10):""),f=a.assignedDateStr||(a.assignedDate?new Date(a.assignedDate).toISOString().slice(0,10):"")||(a.createdAt?new Date(a.createdAt).toISOString().slice(0,10):"")||n;if(a.status==="In Progress"){const v=f&&n&&f<=n?f:n||f,T=f&&n&&f<=n?n:f||n;if(v&&T){if(d>=v&&d<=T)return!0}else{if(n&&n===d)return!0;if(f&&f===d)return!0}}return n&&n===d||a.status!=="Completed"&&f&&f===d?!0:!n&&!f?d===Ne():!1})}function E(d,a){if(d.status==="Completed")return!1;const n=d.completionDateStr||d.dateStr||(d.dueDate?new Date(d.dueDate).toISOString().slice(0,10):"");return n?n<a:!1}function G(d,a){const n=d.length,f=d.filter(L=>L.status==="Completed").length,v=d.filter(L=>L.status==="In Progress").length,T=d.filter(L=>L.status==="Pending"||L.status==="Todo").length,N=d.filter(L=>E(L,a)).length,w=n>0?Math.round(f/n*100):0;return{total:n,completed:f,inProgress:v,pending:T,overdue:N,percent:w}}function O(){const d=Ne(),a=r.selectedDate===d,n=A(r.selectedDate),f=G(n,d);s.innerHTML=`
      <div class="ci360-planner-wrap ${c.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${Fe(r.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${y(c.displayName||"Daily Planner")}</h1>
              <p class="ci360-planner-subheading">Plan your day. Track your progress.</p>
            </div>
          </div>

          <div class="ci360-planner-header-actions">
            <!-- View Mode Switcher -->
            <div class="ci360-view-switcher" role="tablist">
              <button type="button" class="ci360-switch-btn ${r.viewMode==="daily"?"active":""}" id="btnViewDaily" title="Daily View">
                <span>📅 Daily</span>
              </button>
              <button type="button" class="ci360-switch-btn ${r.viewMode==="weekly"?"active":""}" id="btnViewWeekly" title="Weekly View">
                <span>🗓️ Weekly</span>
              </button>
              <button type="button" class="ci360-switch-btn ${r.viewMode==="report"?"active":""}" id="btnViewReport" title="Weekly Analytics & Report">
                <span>📊 Report</span>
              </button>
            </div>

            <!-- Primary Add Task Button -->
            <button type="button" class="ci360-btn-primary ${r.selectedDate<d?"is-locked-past":""}" id="btnOpenAddTaskModal" title="${r.selectedDate<d?"Cannot add tasks on previous dates (switch to today or later)":"Add Task"}">
              ${r.selectedDate<d?`
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
              <span class="date-text" id="displayDateLabel">${xt(r.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${r.selectedDate}">
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
                <option value="all" ${r.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${r.personnelList.map(v=>`
                  <option value="${v._id}" ${r.selectedPersonnelId===String(v._id)?"selected":""}>
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
              <div class="ci360-circular-progress" style="--val: ${f.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${f.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${f.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <span class="kpi-num">${f.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${f.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${f.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${f.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${f.overdue>0?`
                <div class="kpi-box overdue">
                  <span class="kpi-num">${f.overdue}</span>
                  <span class="kpi-label">Overdue</span>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${f.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${ge(n,f)}
        </main>

      </div>
    `,tt(),Pe()}function ge(d,a){return r.viewMode==="weekly"?ot():r.viewMode==="report"?$t():we(d,a)}function we(d,a){const n=Ne(),f=r.selectedDate<n;let v=d;if(r.filterStatus==="pending"?v=v.filter(w=>w.status==="Pending"||w.status==="Todo"):r.filterStatus==="in_progress"?v=v.filter(w=>w.status==="In Progress"):r.filterStatus==="completed"?v=v.filter(w=>w.status==="Completed"):r.filterStatus==="overdue"&&(v=v.filter(w=>E(w,n))),r.searchQuery){const w=r.searchQuery.toLowerCase().trim();v=v.filter(L=>{const M=(L.title||"").toLowerCase(),_=(L.description||"").toLowerCase(),q=(L.category||"").toLowerCase(),x=(L.personnelId?.name||L.userId?.name||"").toLowerCase(),U=(L.createdByName||L.createdBy?.name||(L.createdBy?.email?L.createdBy.email.split("@")[0]:"")).toLowerCase(),F=Array.isArray(L.coOwners)?L.coOwners.map(l=>(l.name||"").toLowerCase()).join(" "):"",j=(L.clientId?.name||L.jobId?.clientId?.name||"").toLowerCase();return M.includes(w)||_.includes(w)||q.includes(w)||x.includes(w)||U.includes(w)||F.includes(w)||j.includes(w)})}v.sort((w,L)=>{if(w.status==="Completed"&&L.status!=="Completed")return 1;if(w.status!=="Completed"&&L.status==="Completed")return-1;const M={Urgent:0,High:1,Medium:2,Low:3};return(M[w.priority]||2)-(M[L.priority]||2)});const T=new Map;v.forEach(w=>{let L="unassigned",M="Unassigned / Team",_="",q="";w.personnelId&&typeof w.personnelId=="object"&&w.personnelId._id?(L=String(w.personnelId._id),M=w.personnelId.name||"Team Member",q=w.personnelId.role||"Personnel",_=w.personnelId.department||""):w.userId&&typeof w.userId=="object"&&w.userId._id?(L=String(w.userId._id),M=w.userId.name||"User",q=w.userId.role||"Member"):(w.createdByName||w.createdBy&&w.createdBy.name)&&(M=w.createdByName||w.createdBy.name,L="creator_"+M.toLowerCase().replace(/[^a-z0-9]/g,"_"),q="Creator"),T.has(L)||T.set(L,{key:L,name:M,department:_,role:q,tasks:[]}),T.get(L).tasks.push(w)});const N=Array.from(T.values()).sort((w,L)=>w.key==="unassigned"?1:L.key==="unassigned"?-1:w.name.localeCompare(L.name));return`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <h2 class="ci360-focus-title" style="margin:0;">
              <span class="accent-dot"></span>
              ${f?"Focus Archive":"Today's Focus"}
            </h2>
            <span class="ci360-task-count-badge">${v.length} ${v.length===1?"task":"tasks"}</span>
            ${f?"":`
              <button type="button" class="ci360-btn-primary" id="btnFocusAddTask" style="padding:6px 14px;font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:6px;border-radius:var(--r-md);margin-left:4px;cursor:pointer;box-shadow:0 2px 6px rgba(99,102,241,0.25);">
                <span style="font-size:15px;line-height:1;font-weight:800;">+</span> Add Task
              </button>
            `}
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${r.filterStatus==="all"?"active":""}" data-f="all">All (${a.total})</button>
              <button type="button" class="filter-pill ${r.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${a.pending})</button>
              <button type="button" class="filter-pill ${r.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${a.inProgress})</button>
              <button type="button" class="filter-pill ${r.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${a.completed})</button>
              ${a.overdue>0?`
                <button type="button" class="filter-pill overdue ${r.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${a.overdue})</button>
              `:""}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${g?`
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${r.groupByEmployee?"active":""}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${r.groupByEmployee?"By Employee":"Flat List"}
                </button>
                ${r.groupByEmployee&&N.length>0?`
                  <button type="button" class="filter-pill" id="btnExpandAllEmp" title="Expand all employee tasks">⊞ Expand</button>
                  <button type="button" class="filter-pill" id="btnCollapseAllEmp" title="Collapse all employee tasks">⊟ Collapse</button>
                `:""}
              </div>
            `:""}

            <!-- Search Bar with employee search support -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks, category or employee..." value="${y(r.searchQuery)}">
              ${r.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Past Date Banner (Only for Previous Dates) -->
        ${f?`
          <div class="ci360-past-date-banner">
            <div class="past-banner-icon">🔒</div>
            <div class="past-banner-body">
              <div class="past-banner-title">Previous Date (${Fe(r.selectedDate)})</div>
              <div class="past-banner-desc">
                Adding new tasks on previous dates is restricted. You can edit existing tasks, adjust completion dates, or mark tasks as completed.
              </div>
            </div>
          </div>
        `:""}

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${v.length===0?We(f):g&&r.groupByEmployee?`
              <div class="ci360-emp-groups-container">
                ${N.map(w=>{const L=!!r.collapsedEmployees[w.key],M=w.tasks.filter(U=>U.status==="Completed").length,_=w.tasks.filter(U=>U.status==="In Progress").length,q=w.tasks.filter(U=>U.status==="Pending"||U.status==="Todo").length,x=w.tasks.length>0?Math.round(M/w.tasks.length*100):0;return`
                    <div class="ci360-emp-group-card ${L?"is-collapsed":""}" data-emp-key="${w.key}">
                      <div class="ci360-emp-group-header" data-action="toggle-emp-group" data-emp-key="${w.key}" role="button" tabindex="0">
                        <div class="emp-group-left">
                          <span class="emp-collapse-icon">${L?"▶":"▼"}</span>
                          <div class="emp-avatar">${y((w.name||"U").charAt(0).toUpperCase())}</div>
                          <div class="emp-info">
                            <span class="emp-name">${y(w.name)}</span>
                            ${w.department||w.role?`<span class="emp-subtitle">${y(w.department?w.department+" · "+w.role:w.role)}</span>`:""}
                          </div>
                        </div>

                        <div class="emp-group-right">
                          <span class="emp-stat-pill total">${w.tasks.length} ${w.tasks.length===1?"task":"tasks"}</span>
                          <span class="emp-stat-pill done">${M} done</span>
                          ${_>0?`<span class="emp-stat-pill in-prog">${_} in progress</span>`:""}
                          ${q>0?`<span class="emp-stat-pill pending">${q} pending</span>`:""}
                          <div class="emp-mini-bar-wrap" title="${x}% completed">
                            <div class="emp-mini-bar-fill" style="width:${x}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${L?"":`
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${w.tasks.map(U=>Xe(U,n)).join("")}
                          </div>
                        </div>
                      `}
                    </div>
                  `}).join("")}
              </div>
            `:`
              <div class="ci360-task-list">
                ${v.map(w=>Xe(w,n)).join("")}
              </div>
            `}
        </div>

      </div>
    `}function We(d=!1){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">${d?"📜":"✨"}</div>
        <h3>No tasks found for ${Fe(r.selectedDate)}</h3>
        <p>${d?"No scheduled tasks were recorded on this past date.":"Your schedule is clean and ready. Add your first priority task above or import your daily agenda."}</p>
        ${d?"":`
          <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
            <button type="button" class="ci360-btn-primary" id="btnEmptyStateAddTask">
              + Add Task
            </button>
            <button type="button" class="ci360-btn-secondary" id="btnEmptyStateImport">
              📥 Import List
            </button>
          </div>
        `}
      </div>
    `}function Xe(d,a){const n=d.status==="Completed",f=E(d,a),v=d.completionDateStr||d.dateStr||(d.dueDate?new Date(d.dueDate).toISOString().slice(0,10):a),T=d.assignedDateStr||(d.assignedDate?new Date(d.assignedDate).toISOString().slice(0,10):"")||(d.createdAt?new Date(d.createdAt).toISOString().slice(0,10):""),N=d.status==="In Progress"&&T&&v&&T!==v,w=`pri-${(d.priority||"medium").toLowerCase()}`,L=`status-${(d.status||"pending").toLowerCase().replace(/\s+/g,"-")}`,M=d.createdByName||d.createdBy?.name||(d.createdBy?.email?d.createdBy.email.split("@")[0]:"")||d.personnelId?.name||d.userId?.name||"";return`
      <div class="ci360-task-card ${n?"is-completed":""} ${f?"is-overdue":""}" data-id="${d._id}">
        
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
            <span class="ci360-badge ${w}">
              <span class="badge-dot"></span>
              ${y(d.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${L}">
              ${y(d.status||"Pending")}
            </span>

            <!-- Completion Date / Date Span Badge (Always Visible & Prominent) -->
            ${N?`
              <span class="ci360-badge completion-badge" style="background:rgba(59,130,246,0.15);color:#3b82f6;border-color:rgba(59,130,246,0.3);" title="In Progress from ${Fe(T)} to ${Fe(v)}">
                📅 ${Fe(T)} ➔ Due: ${Fe(v)}
              </span>
            `:`
              <span class="ci360-badge completion-badge" title="Target Completion Date: ${v}">
                📅 Due: ${Fe(v)}
              </span>
            `}

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${d.rescheduledFrom&&d.rescheduledFrom!==v?`
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${Fe(d.rescheduledFrom)} to ${Fe(v)} (${d.dateChangeCount||1} change${(d.dateChangeCount||1)>1?"s":""})">
                🔄 Date Changed: ${Fe(d.rescheduledFrom)} ➔ ${Fe(v)}
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
            ${f?`
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
    `}function ot(){const d=Lt(r.selectedDate,c.weekStartsOn),a=Fe(d[0]),n=Fe(d[6]),f=Ne();return`
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
          ${d.map(v=>{const T=v===f,N=v===r.selectedDate,w=A(v),L=G(w,f);return`
              <div class="ci360-day-column ${T?"is-today":""} ${N?"is-selected":""}" data-date="${v}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${v}">
                  <div class="day-name">${fa(v)}</div>
                  <div class="day-number">${new Date(v+"T00:00:00").getDate()}</div>
                  ${T?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${L.completed}/${L.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${L.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${w.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:w.map(M=>`
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
                ${v<f?`
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
    `}function $t(){const d=Lt(r.selectedDate,c.weekStartsOn),a=xt(d[0]),n=xt(d[6]),f=Ne(),v=r.tasks.filter(_=>{if(_.isDeleted===!0)return!1;const q=_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):"");return d.includes(q)}),T=v.length,N=v.filter(_=>_.status==="Completed").length,w=v.filter(_=>_.status==="In Progress").length,L=T>0?Math.round(N/T*100):0,M={Urgent:0,High:0,Medium:0,Low:0};return v.forEach(_=>{const q=_.priority||"Medium";M[q]!==void 0&&M[q]++}),`
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
            <span class="value" style="font-size:28px;color:var(--amber-500)">${w}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${L}%</span>
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
                ${d.map(_=>{const q=A(_),x=G(q,f);return`
                    <tr>
                      <td><strong>${fa(_)}</strong></td>
                      <td>${Fe(_)}</td>
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
    `}function tt(){const d=document.getElementById("btnViewDaily"),a=document.getElementById("btnViewWeekly"),n=document.getElementById("btnViewReport");d&&(d.onclick=()=>{r.viewMode="daily",O()}),a&&(a.onclick=()=>{r.viewMode="weekly",O()}),n&&(n.onclick=()=>{r.viewMode="report",O()});const f=document.getElementById("btnPrevDay"),v=document.getElementById("btnNextDay"),T=document.getElementById("btnJumpToday"),N=document.getElementById("hiddenDateInput"),w=document.getElementById("datePickerBadge");f&&(f.onclick=()=>{r.selectedDate=Vt(r.selectedDate,-1),O()}),v&&(v.onclick=()=>{r.selectedDate=Vt(r.selectedDate,1),O()}),T&&(T.onclick=()=>{r.selectedDate=Ne(),O()}),w&&N&&(w.onclick=()=>{try{typeof N.showPicker=="function"?N.showPicker():N.focus()}catch{N.focus()}},N.onchange=i=>{i.target.value&&(r.selectedDate=i.target.value,O())});const L=document.getElementById("admTeamSelect");L&&(L.onchange=i=>{r.selectedPersonnelId=i.target.value,O()});const M=document.getElementById("btnOpenAddTaskModal");M&&(M.onclick=()=>{if(r.selectedDate<Ne()){$("Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.",!0);return}Le()});const _=document.getElementById("btnPlannerActionsMenu"),q=document.getElementById("plannerActionsDropdown");_&&q&&(_.onclick=i=>{i.stopPropagation(),q.classList.toggle("hidden")},document.addEventListener("click",i=>{!q.contains(i.target)&&i.target!==_&&q.classList.add("hidden")}));const x=document.getElementById("btnActionImport");x&&(x.onclick=()=>{q?.classList.add("hidden"),dt()});const U=document.getElementById("btnActionExportPng");U&&(U.onclick=()=>{q?.classList.add("hidden"),Me()});const F=document.getElementById("btnActionExportPdf");F&&(F.onclick=()=>{q?.classList.add("hidden"),de()});const j=document.getElementById("btnActionAdminReport");j&&(j.onclick=()=>{q?.classList.add("hidden"),it()});const l=document.getElementById("btnActionBackup");l&&(l.onclick=()=>{q?.classList.add("hidden"),rt()});const u=document.getElementById("btnActionSettings");u&&(u.onclick=()=>{q?.classList.add("hidden"),nt()})}function Pe(d){if(r.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(j=>{j.onclick=()=>{r.filterStatus=j.dataset.f,O()}});const a=document.getElementById("plannerTaskSearchInp");a&&(a.oninput=j=>{r.searchQuery=j.target.value,O()});const n=document.getElementById("btnClearSearch");n&&(n.onclick=()=>{r.searchQuery="",O()});const f=document.getElementById("btnFocusAddTask");f&&(f.onclick=()=>{Le(null,r.selectedDate)});const v=document.getElementById("btnEmptyStateAddTask");v&&(v.onclick=()=>{Le(null,r.selectedDate)});const T=document.getElementById("quickAddTitleInp"),N=document.getElementById("quickAddCompletionDate"),w=document.getElementById("quickAddPriority"),L=document.getElementById("quickAddCategory"),M=document.getElementById("btnQuickAddSubmit"),_=async()=>{const j=Ne();if(r.selectedDate<j){$("Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.",!0);return}const l=(T?.value||"").trim();if(!l){$("Please enter a task title",!0),T?.focus();return}const u=(N?.value||"").trim()||r.selectedDate;if(u<j){$("Cannot set completion date on a previous date.",!0);return}try{const i={title:l,assignedDate:r.selectedDate,assignedDateStr:r.selectedDate,dateStr:u,completionDate:u,completionDateStr:u,dueDate:u,priority:w?.value||c.defaultPriority,category:L?.value||"General",status:"Pending"};if(g){const k=document.getElementById("quickAddAssignee")?.value;k==="all"?(i.assignAll=!0,i.personnelId="all"):k?i.personnelId=k:r.selectedPersonnelId!=="all"&&(i.personnelId=r.selectedPersonnelId)}const o=await Se("/tasks",i);r.tasks.unshift(o),$("Task added to today's focus! ✨"),T&&(T.value="",T.focus()),O()}catch(i){$(i.message,!0)}};M&&(M.onclick=_),T&&(T.onkeydown=j=>{j.key==="Enter"&&_()}),document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(j=>{j.onclick=()=>{const l=j.dataset.empKey;r.collapsedEmployees[l]=!r.collapsedEmployees[l],O()}});const q=document.getElementById("btnToggleEmpGrouping");q&&(q.onclick=()=>{r.groupByEmployee=!r.groupByEmployee,O()});const x=document.getElementById("btnExpandAllEmp");x&&(x.onclick=()=>{r.collapsedEmployees={},O()});const U=document.getElementById("btnCollapseAllEmp");U&&(U.onclick=()=>{document.querySelectorAll(".ci360-emp-group-card").forEach(j=>{const l=j.dataset.empKey;l&&(r.collapsedEmployees[l]=!0)}),O()});const F=document.getElementById("btnEmptyStateImport");F&&(F.onclick=()=>dt())}if(r.viewMode==="weekly"){const a=document.getElementById("btnPrevWeek"),n=document.getElementById("btnNextWeek"),f=document.getElementById("btnThisWeek");a&&(a.onclick=()=>{r.selectedDate=Vt(r.selectedDate,-7),O()}),n&&(n.onclick=()=>{r.selectedDate=Vt(r.selectedDate,7),O()}),f&&(f.onclick=()=>{r.selectedDate=Ne(),O()}),document.querySelectorAll(".day-col-header").forEach(v=>{v.onclick=()=>{r.selectedDate=v.dataset.date,r.viewMode="daily",O()}}),document.querySelectorAll('[data-action="add-day"]').forEach(v=>{v.onclick=()=>{Le(null,v.dataset.date)}})}if(r.viewMode==="report"){const a=document.getElementById("btnDownloadWeeklyPdf");a&&(a.onclick=()=>de());const n=document.getElementById("btnOpenAdminReportModal");n&&(n.onclick=()=>it())}s.querySelectorAll('[data-action="toggle"]').forEach(a=>{a.onclick=async n=>{n.stopPropagation();const f=a.dataset.id;await at(f)}}),s.querySelectorAll('[data-action="edit"]').forEach(a=>{a.onclick=n=>{n.stopPropagation();const f=a.dataset.id,v=r.tasks.find(T=>T._id===f);v&&Le(v)}}),s.querySelectorAll('[data-action="delete"]').forEach(a=>{a.onclick=async n=>{n.stopPropagation();const f=a.dataset.id;await ut(f)}})}async function at(d){const a=r.tasks.find(f=>f._id===d);if(!a)return;const n=a.status!=="Completed";try{const f=await Je(`/tasks/${d}/toggle`,{}),v=r.tasks.findIndex(T=>T._id===d);v!==-1&&(r.tasks[v]=f),n?(c.soundEnabled&&Da(),$("Task marked as completed! 🎉")):$("Task reopened as pending."),O()}catch(f){$(f.message,!0)}}async function ut(d){const a=r.tasks.find(n=>n._id===d);if(a&&confirm(`Are you sure you want to remove "${a.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await Qe(`/tasks/${d}`),r.tasks=r.tasks.filter(n=>n._id!==d),$("Task removed from planner (safely stored in database archive)"),O()}catch(n){$(n.message,!0)}}function Le(d=null,a=null){const n=!!d,f=Ne(),v=d?d.assignedDateStr||(d.assignedDate?new Date(d.assignedDate).toISOString().slice(0,10):"")||d.dateStr||(d.createdAt?new Date(d.createdAt).toISOString().slice(0,10):r.selectedDate):a&&a>=f?a:r.selectedDate>=f?r.selectedDate:f;d?d.completionDateStr||d.dueDate&&new Date(d.dueDate).toISOString().slice(0,10):a&&a>=f||r.selectedDate>=f&&r.selectedDate;const T=`
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
              <input type="date" id="taskDate" class="input" value="${v}" ${n?"":`min="${f}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${d?.completionDateStr||(d?.dueDate?new Date(d.dueDate).toISOString().slice(0,10):"")}" ${n?"":`min="${f}"`} placeholder="Defaults to that day">
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
                ${r.personnelList.map(l=>{const u=d?.personnelId?._id===l._id||d?.personnelId===l._id;return`<option value="${l._id}" ${u?"selected":""}>👤 ${y(l.name)} (${y(l.department||l.role||"Member")})</option>`}).join("")}
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
              ${r.personnelList.map(l=>`
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
    `,N=Ft(T),w=N.querySelector("#taskForm"),L=N.querySelector("#btnModalClose"),M=N.querySelector("#btnCancelModal"),_=N.querySelector("#btnModalDeleteTask"),q=()=>N.remove();L&&(L.onclick=q),M&&(M.onclick=q),_&&d&&(_.onclick=async()=>{q(),await ut(d._id)});let x=[];d&&Array.isArray(d.coOwners)&&(x=d.coOwners.map(l=>({personnelId:l.personnelId?._id||l.personnelId||null,userId:l.userId?._id||l.userId||null,name:l.name||l.personnelId?.name||"",role:l.role||l.personnelId?.role||"",department:l.department||l.personnelId?.department||""})).filter(l=>l.personnelId||l.name));const U=N.querySelector("#coOwnersSelectedContainer"),F=N.querySelector("#taskCoOwnerSelect"),j=()=>{if(U){if(x.length===0){U.innerHTML='<span style="font-size:11.5px;color:var(--text-4);font-style:italic;">No co-owners added yet</span>';return}U.innerHTML=x.map((l,u)=>`
        <span class="co-owner-chip" style="display:inline-flex;align-items:center;gap:6px;background:rgba(99,102,241,0.12);color:var(--accent);border:1px solid rgba(99,102,241,0.25);border-radius:16px;padding:3px 10px;font-size:12px;font-weight:600;">
          👤 ${y(l.name)}
          <button type="button" class="btn-remove-co" data-idx="${u}" style="background:transparent;border:none;color:var(--accent);cursor:pointer;font-size:14px;line-height:1;padding:0;margin-left:2px;font-weight:bold;" title="Remove co-owner">×</button>
        </span>
      `).join(""),U.querySelectorAll(".btn-remove-co").forEach(l=>{l.onclick=()=>{const u=parseInt(l.dataset.idx,10);x.splice(u,1),j()}})}};j(),F&&(F.onchange=()=>{const l=F.value;if(!l)return;const u=r.personnelList.find(i=>String(i._id)===String(l));u&&(x.some(o=>String(o.personnelId)===String(u._id))||(x.push({personnelId:u._id,name:u.name,role:u.role||"",department:u.department||""}),j())),F.value=""}),w.onsubmit=async l=>{l.preventDefault();const u=N.querySelector("#taskTitle").value.trim(),i=N.querySelector("#taskDesc").value.trim(),o=N.querySelector("#taskDate").value||v,z=N.querySelector("#taskCompletionDate")?.value?.trim()||o||r.selectedDate,C=N.querySelector("#taskPriority").value,V=N.querySelector("#taskStatus").value,ie=N.querySelector("#taskCategory").value.trim()||"General";if(!u){$("Task title is required",!0);return}if(!n&&(z<f||o<f)){$("Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.",!0);return}const H={title:u,description:i,assignedDate:o,assignedDateStr:o,dateStr:z,completionDate:z,completionDateStr:z,dueDate:z,startTime:"",dueTime:"",priority:C,status:V,category:ie,coOwners:x};if(g){const W=N.querySelector("#taskAssignee")?.value;W==="all"?(H.assignAll=!0,H.personnelId="all"):W==="me"?H.personnelId="me":W&&(H.personnelId=W)}const B=N.querySelector("#btnSaveTask");B.disabled=!0,B.textContent="Saving...";try{if(n){const W=await Qt(`/tasks/${d._id}`,H),ae=r.tasks.findIndex(ne=>ne._id===d._id);ae!==-1&&(r.tasks[ae]=W),$("Task updated successfully! ✍️")}else{const W=await Se("/tasks",H);Array.isArray(W.tasks)?W.tasks.forEach(ae=>r.tasks.unshift(ae)):r.tasks.unshift(W),$("Task created successfully! ✨")}q(),O()}catch(W){$(W.message,!0),B.disabled=!1,B.textContent=n?"Save Changes":"Create Task"}}}function dt(){let d=[];const a=`
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
              <input type="date" id="importTargetDate" class="input" value="${r.selectedDate<Ne()?Ne():r.selectedDate}" min="${Ne()}">
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
    `,n=Ft(a),f=()=>n.remove();n.querySelector("#btnImportClose").onclick=f,n.querySelector("#btnCancelImport").onclick=f;const v=n.querySelector("#importTextarea"),T=n.querySelector("#importFileInput"),N=n.querySelector("#importDropzone"),w=n.querySelector("#previewListArea"),L=n.querySelector("#previewCountLabel"),M=n.querySelector("#btnConfirmImport"),_=n.querySelector("#importFileInfo");function q(U){if(!U)return[];const F=U.split(/\r?\n/),j=[];for(let l of F)l=l.trim(),l&&(l=l.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),l=l.replace(/^[-*•]\s+/,""),l=l.replace(/^\d+[\.\)]\s+/,""),l=l.trim(),l&&j.push(l));return j}function x(){const U=v.value,F=q(U),j=n.querySelector("#importTargetDate").value,l=A(j),u=new Set(l.map(i=>(i.title||"").trim().toLowerCase()));d=[];for(const i of F){const o=u.has(i.toLowerCase());d.push({title:i,isDuplicate:o})}if(L.textContent=`Preview (${d.length} ${d.length===1?"task":"tasks"} found)`,M.disabled=d.length===0,M.textContent=`Import ${d.length} ${d.length===1?"Task":"Tasks"}`,d.length===0){w.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}w.innerHTML=d.map((i,o)=>`
        <div class="preview-item ${i.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${o+1}.</span>
          <span class="preview-title">${y(i.title)}</span>
          ${i.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}v.oninput=x,N.onclick=()=>T.click(),T.onchange=U=>{const F=U.target.files[0];if(!F)return;_.textContent=`File selected: ${F.name} (${Math.round(F.size/1024)} KB)`;const j=new FileReader;j.onload=l=>{v.value=l.target.result,x()},j.readAsText(F)},N.ondragover=U=>{U.preventDefault(),N.classList.add("dragover")},N.ondragleave=()=>N.classList.remove("dragover"),N.ondrop=U=>{U.preventDefault(),N.classList.remove("dragover");const F=U.dataTransfer.files[0];if(F&&(F.type==="text/plain"||F.name.endsWith(".txt"))){_.textContent=`File dropped: ${F.name}`;const j=new FileReader;j.onload=l=>{v.value=l.target.result,x()},j.readAsText(F)}else $("Please drop a valid .txt plain-text file",!0)},M.onclick=async()=>{if(d.length===0)return;M.disabled=!0,M.textContent="Importing...";const U=n.querySelector("#importTargetDate").value;if(U<Ne()){$("Cannot import tasks for previous dates. Target date must be today or later.",!0),M.disabled=!1,M.textContent=`Import ${d.length} ${d.length===1?"Task":"Tasks"}`;return}const F=n.querySelector("#importPriority").value,j=n.querySelector("#importCategory").value.trim()||"General",l={date:U,tasks:d.map(u=>({title:u.title,priority:F,category:j,status:"Pending"}))};g&&r.selectedPersonnelId!=="all"&&(l.personnelId=r.selectedPersonnelId);try{const u=await Se("/tasks/bulk-import",l);Array.isArray(u.tasks)&&u.tasks.forEach(i=>r.tasks.unshift(i)),$(`Imported ${u.importedCount} tasks successfully! (${u.skippedCount} skipped duplicates)`),f(),r.selectedDate=U,O()}catch(u){$(u.message,!0),M.disabled=!1,M.textContent="Retry Import"}}}async function Me(){const d=A(r.selectedDate),a=G(d,Ne()),n=xt(r.selectedDate),f=2,v=800,T=160,N=90,w=74,L=70,M=Math.max(120,d.length*w),_=T+N+M+L,q=document.createElement("canvas");q.width=v*f,q.height=_*f;const x=q.getContext("2d");x.scale(f,f);const U=document.documentElement.getAttribute("data-theme")==="dark",F=U?"#0F172A":"#F8FAFC",j=U?"#1E293B":"#FFFFFF",l=U?"#334155":"#E2E8F0",u=U?"#F8FAFC":"#0F172A",i=U?"#94A3B8":"#475569",o="#4F46E5",k="#10B981",z="#F59E0B";x.fillStyle=F,x.fillRect(0,0,v,_),x.fillStyle=j,qe(x,24,20,v-48,T-30,16),x.fill(),x.strokeStyle=l,x.lineWidth=1,x.stroke(),x.fillStyle=o,x.font="bold 12px Inter, sans-serif",x.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),x.fillStyle=u,x.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',x.fillText(n,44,86),x.fillStyle=i,x.font="13px Inter, sans-serif",x.fillText(`Planned focus list · ${a.completed} of ${a.total} tasks completed (${a.percent}%)`,44,114);const C=T+6;x.fillStyle=j,qe(x,24,C,v-48,N-16,12),x.fill(),x.stroke();const V=[{label:"TOTAL TASKS",val:String(a.total),color:u},{label:"COMPLETED",val:String(a.completed),color:k},{label:"IN PROGRESS",val:String(a.inProgress),color:z},{label:"PENDING",val:String(a.pending),color:i},{label:"PROGRESS",val:`${a.percent}%`,color:o}],ie=(v-48)/V.length;V.forEach((W,ae)=>{const ne=24+ae*ie+20;x.fillStyle=W.color,x.font="bold 20px Inter, sans-serif",x.fillText(W.val,ne,C+36),x.fillStyle=i,x.font="10px Inter, sans-serif",x.fillText(W.label,ne,C+54)});const H=C+N;x.fillStyle=j,qe(x,24,H,v-48,M+10,16),x.fill(),x.stroke(),d.length===0?(x.fillStyle=i,x.font="14px Inter, sans-serif",x.textAlign="center",x.fillText("No scheduled tasks recorded for this date.",v/2,H+60),x.textAlign="left"):d.forEach((W,ae)=>{const ne=H+16+ae*w,le=W.status==="Completed";x.beginPath(),x.arc(48,ne+14,10,0,Math.PI*2),le?(x.fillStyle=k,x.fill(),x.strokeStyle="#FFFFFF",x.lineWidth=2,x.beginPath(),x.moveTo(44,ne+14),x.lineTo(47,ne+17),x.lineTo(52,ne+11),x.stroke()):(x.strokeStyle=l,x.lineWidth=2,x.stroke()),x.fillStyle=le?i:u,x.font=`${le?"normal":"500"} 14px Inter, sans-serif`;const ue=W.title.length>55?W.title.slice(0,52)+"...":W.title;if(x.fillText(ue,70,ne+18),le){const Oe=x.measureText(ue);x.strokeStyle=i,x.lineWidth=1.2,x.beginPath(),x.moveTo(70,ne+14),x.lineTo(70+Oe.width,ne+14),x.stroke()}const fe=W.priority||"Medium";let Q="#E2E8F0",be="#334155";fe==="Urgent"?(Q="#FEE2E2",be="#DC2626"):fe==="High"?(Q="#FEF3C7",be="#D97706"):fe==="Low"&&(Q="#ECFDF5",be="#059669"),x.fillStyle=Q,qe(x,v-150,ne+4,60,20,10),x.fill(),x.fillStyle=be,x.font="bold 10px Inter, sans-serif",x.fillText(fe,v-138,ne+18);const Ee=W.createdByName||W.createdBy?.name||(W.createdBy?.email?W.createdBy.email.split("@")[0]:"")||W.personnelId?.name||W.userId?.name||"Member",ce=W.completionDateStr||W.dateStr||"",xe=[];xe.push(`✍️ Added by: ${Ee}`),ce&&xe.push(`📅 Due: ${Fe(ce)}`),W.dueTime&&xe.push(`🕒 ${W.dueTime}`),W.category&&W.category!=="General"&&xe.push(`#${W.category}`);const Ie=xe.join("   ·   ");x.fillStyle=i,x.font="11px Inter, sans-serif",x.fillText(Ie,70,ne+36),ae<d.length-1&&(x.strokeStyle=l,x.lineWidth=.6,x.beginPath(),x.moveTo(40,ne+54),x.lineTo(v-40,ne+54),x.stroke())});const B=_-35;x.fillStyle=i,x.font="11px Inter, sans-serif",x.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,B);try{const W=q.toDataURL("image/png"),ae=document.createElement("a");ae.href=W,ae.download=`ci360-daily-planner-${r.selectedDate}.png`,document.body.appendChild(ae),ae.click(),ae.remove(),$("Daily Planner image exported! 🖼️")}catch(W){$("Failed to export image: "+W.message,!0)}}function qe(d,a,n,f,v,T){d.beginPath(),d.moveTo(a+T,n),d.lineTo(a+f-T,n),d.quadraticCurveTo(a+f,n,a+f,n+T),d.lineTo(a+f,n+v-T),d.quadraticCurveTo(a+f,n+v,a+f-T,n+v),d.lineTo(a+T,n+v),d.quadraticCurveTo(a,n+v,a,n+v-T),d.lineTo(a,n+T),d.quadraticCurveTo(a,n,a+T,n),d.closePath()}function de(d={}){const a=Lt(r.selectedDate,c.weekStartsOn),n=xt(a[0]),f=xt(a[6]),v=Ne();let T=r.tasks.filter(F=>{if(F.isDeleted===!0)return!1;const j=F.completionDateStr||F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):""),l=F.assignedDateStr||(F.assignedDate?new Date(F.assignedDate).toISOString().slice(0,10):"")||j;return d.scope==="today"?j===v||l===v:d.scope==="all"?!0:F.status==="In Progress"&&l&&j?a.some(u=>u>=l&&u<=j):a.includes(j)||a.includes(l)});d.personnelId&&d.personnelId!=="all"&&(T=T.filter(F=>{const j=String(F.personnelId?._id||F.personnelId||""),l=Array.isArray(F.coOwners)&&F.coOwners.some(u=>String(u.personnelId?._id||u.personnelId||u.userId?._id||u.userId||"")===String(d.personnelId));return j===String(d.personnelId)||l})),d.status&&d.status!=="all"&&(T=T.filter(F=>F.status===d.status));const N=T.length,w=T.filter(F=>F.status==="Completed").length,L=T.filter(F=>F.status==="In Progress").length,M=N>0?Math.round(w/N*100):0,_=window.open("","_blank");if(!_){$("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const q=d.title||(d.isAdminReport?"CI360 Admin Detailed Executive Report":"Weekly Productivity Report"),x=d.scope==="today"?`Date: ${xt(v)}`:d.scope==="all"?"All Active & Historical Tasks":`${n} – ${f}`,U=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${y(q)} — ${x}</title>
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
            <h1>${y(q)}</h1>
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
            <div class="kpi-num" style="color:#10b981">${w}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">In Progress</div>
            <div class="kpi-num" style="color:#f59e0b">${L}</div>
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
            `:T.map(F=>{const j=F.completionDateStr||F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):"—"),l=F.assignedDateStr||(F.assignedDate?new Date(F.assignedDate).toISOString().slice(0,10):""),u=F.status==="In Progress"&&l&&j&&l!==j?`${Fe(l)} ➔ ${Fe(j)}`:Fe(j),i=F.jobId?.preferredPersonName||F.jobId?.assignments&&F.jobId.assignments[0]?.personId?.name||F.personnelId?.name||F.userId?.name||F.createdByName||"—",o=F.clientId?.name||F.jobId?.clientId?.name||F.clientId?.company||""||"—",k=F.description?y(F.description):'<span style="color:#cbd5e1">—</span>',z=Array.isArray(F.coOwners)&&F.coOwners.length>0?F.coOwners.map(H=>H.name).filter(Boolean).join(", "):"",C=(F.priority||"medium").toLowerCase(),V=C==="urgent"?"badge-urgent":C==="high"?"badge-high":C==="low"?"badge-low":"badge-med",ie=(F.status||"pending").toLowerCase().replace(/\s+/g,"-");return`
                <tr>
                  <td><strong>${u}</strong></td>
                  <td><span class="client-tag">${y(o)}</span></td>
                  <td>
                    <span class="owner-tag">${y(i)}</span>
                    ${z?`<span class="co-owner-sub">👥 Co: ${y(z)}</span>`:""}
                  </td>
                  <td><strong>${y(F.title)}</strong></td>
                  <td><div class="desc-text">${k}</div></td>
                  <td><span class="badge ${V}">${y(F.priority||"Medium")}</span></td>
                  <td><span class="status-tag status-${ie}">${y(F.status||"Pending")}</span></td>
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
    `;_.document.write(U),_.document.close(),$("Report generated for printing & PDF download! 📄")}function it(){const d=Ne(),a=Lt(r.selectedDate,c.weekStartsOn),n=Fe(a[0]),f=Fe(a[6]),v=`
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
              <option value="week" selected>Current Week (${n} – ${f})</option>
              <option value="today">Today Only (${Fe(d)})</option>
              <option value="all">All Available Tasks</option>
            </select>
          </div>

          <!-- Employee Filter -->
          <div class="form-group">
            <label for="admRepPersonnel">Filter by Employee / Person</label>
            <select id="admRepPersonnel" class="input">
              <option value="all">👥 All Team Members</option>
              ${r.personnelList.map(x=>`
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
    `,T=Ft(v),N=T.querySelector("#btnAdminRepClose"),w=T.querySelector("#btnAdminRepCancel"),L=T.querySelector("#btnAdminRepPdf"),M=T.querySelector("#btnAdminRepCsv"),_=()=>T.remove();N&&(N.onclick=_),w&&(w.onclick=_);const q=()=>{const x=T.querySelector("#admRepScope")?.value||"week",U=T.querySelector("#admRepPersonnel")?.value||"all",F=T.querySelector("#admRepStatus")?.value||"all";let j="";if(U!=="all"){const l=r.personnelList.find(u=>String(u._id)===String(U));l&&(j+=`Person: ${l.name} · `)}return F!=="all"&&(j+=`Status: ${F}`),{scope:x,personnelId:U,status:F,filterSummary:j.replace(/\s*·\s*$/,"")}};L&&(L.onclick=()=>{const x=q();_(),de({...x,isAdminReport:!0,title:"CI360 Admin Detailed Executive Task Report"})}),M&&(M.onclick=()=>{const x=q();_(),ye(x)})}function ye(d={}){const a=Lt(r.selectedDate,c.weekStartsOn),n=Ne();let f=r.tasks.filter(_=>{if(_.isDeleted===!0)return!1;const q=_.completionDateStr||_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):""),x=_.assignedDateStr||(_.assignedDate?new Date(_.assignedDate).toISOString().slice(0,10):"")||q;return d.scope==="today"?q===n||x===n:d.scope==="all"?!0:_.status==="In Progress"&&x&&q?a.some(U=>U>=x&&U<=q):a.includes(q)||a.includes(x)});d.personnelId&&d.personnelId!=="all"&&(f=f.filter(_=>{const q=String(_.personnelId?._id||_.personnelId||""),x=Array.isArray(_.coOwners)&&_.coOwners.some(U=>String(U.personnelId?._id||U.personnelId||"")===String(d.personnelId));return q===String(d.personnelId)||x})),d.status&&d.status!=="all"&&(f=f.filter(_=>_.status===d.status));const v=["Date","Client Name","Job Owner","Primary Assignee","Co-Owners","Task Title","Description","Priority","Category","Status","Created By"],T=f.map(_=>{const q=_.completionDateStr||_.dateStr||(_.dueDate?new Date(_.dueDate).toISOString().slice(0,10):""),x=_.jobId?.preferredPersonName||_.jobId?.assignments&&_.jobId.assignments[0]?.personId?.name||_.personnelId?.name||_.userId?.name||_.createdByName||"",U=_.clientId?.name||_.jobId?.clientId?.name||_.clientId?.company||"",F=_.personnelId?.name||_.userId?.name||"",j=Array.isArray(_.coOwners)?_.coOwners.map(V=>V.name).filter(Boolean).join("; "):"",l=_.title||"",u=_.description||"",i=_.priority||"Medium",o=_.category||"General",k=_.status||"Pending",z=_.createdByName||_.createdBy?.name||"",C=V=>`"${String(V||"").replace(/"/g,'""').replace(/\r?\n/g," ")}"`;return[C(q),C(U),C(x),C(F),C(j),C(l),C(u),C(i),C(o),C(k),C(z)].join(",")}),N="\uFEFF"+[v.join(","),...T].join(`\r
`),w=new Blob([N],{type:"text/csv;charset=utf-8;"}),L=URL.createObjectURL(w),M=document.createElement("a");M.href=L,M.download=`ci360-admin-report-${n}.csv`,document.body.appendChild(M),M.click(),document.body.removeChild(M),URL.revokeObjectURL(L),$("Admin CSV report downloaded! 📊")}function rt(){const a=Ft(`
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
    `),n=()=>a.remove();a.querySelector("#btnBackupClose").onclick=n;const f=a.querySelector("#btnDownloadBackupJson");f.onclick=async()=>{f.disabled=!0,f.textContent="Generating backup...";try{const M=await Re("/tasks/backup"),_=new Blob([JSON.stringify(M,null,2)],{type:"application/json"}),q=URL.createObjectURL(_),x=document.createElement("a");x.href=q,x.download=`ci360-planner-backup-${Ne()}.json`,document.body.appendChild(x),x.click(),x.remove(),$("Planner backup downloaded successfully! 💾")}catch(M){$("Backup export failed: "+M.message,!0)}finally{f.disabled=!1,f.textContent="Download JSON Backup"}};const v=a.querySelector("#restoreFileInput"),T=a.querySelector("#restorePreviewArea"),N=a.querySelector("#restoreCountText"),w=a.querySelector("#btnExecuteRestore");let L=null;v.onchange=M=>{const _=M.target.files[0];if(!_)return;const q=new FileReader;q.onload=x=>{try{const U=JSON.parse(x.target.result),F=Array.isArray(U.tasks)?U.tasks:Array.isArray(U)?U:null;if(!F||F.length===0){$("Invalid backup file: No tasks found",!0);return}L=F,T.style.display="block",N.textContent=`Valid backup: ${F.length} tasks ready to restore.`,w.disabled=!1}catch(U){$("Error parsing JSON backup file: "+U.message,!0),T.style.display="none",w.disabled=!0}},q.readAsText(_)},w.onclick=async()=>{if(!L||L.length===0)return;w.disabled=!0,w.textContent="Restoring...";const M=a.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const _=await Se("/tasks/restore",{tasks:L,mode:M});$(`Restored ${_.restoredCount} tasks! (${_.skippedCount} skipped) ✨`),n(),await R()}catch(_){$("Restore failed: "+_.message,!0),w.disabled=!1,w.textContent="Retry Restore"}}}function nt(){const d=`
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
    `,a=Ft(d),n=()=>a.remove();a.querySelector("#btnSettingsClose").onclick=n,a.querySelector("#btnCancelSettings").onclick=n;const f=a.querySelector("#btnPlannerTestNotif");f&&(f.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await requestNotificationPermission()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):$("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true");const v=a.querySelector("#setNotifEnabled");v&&(v.checked=!0);const T=a.querySelector("#plannerNotifStatusLabel");T&&(T.textContent="🟢 Active on this laptop"),await triggerSystemNotification({title:"CI360 Planner Alert 🔔",message:"Laptop & browser notifications are active and ready!",id:"ci360-planner-test-"+Date.now()}),$("Test notification sent to your laptop/browser! 🔔")}),a.querySelector("#settingsForm").onsubmit=v=>{v.preventDefault(),c.displayName=a.querySelector("#setDisplayName").value.trim()||"Daily Planner",c.weekStartsOn=Number(a.querySelector("#setWeekStart").value),c.defaultPriority=a.querySelector("#setDefaultPriority").value,c.density=a.querySelector("#setDensity").value,c.soundEnabled=a.querySelector("#setSound").checked;const T=a.querySelector("#setNotifEnabled")?.checked;localStorage.setItem("ci360_notif_enabled",T?"true":"false"),T&&"Notification"in window&&Notification.permission==="default"&&requestNotificationPermission(),Aa(c),$("Planner preferences saved! ⚙️"),n(),O()}}}function Ta(){if(document.getElementById("ci360-planner-styles"))return;const s=document.createElement("style");s.id="ci360-planner-styles",s.textContent=`
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
  `,document.head.appendChild(s)}function Ea(s){return s!==null?{comment:s,variations:[]}:{variations:[]}}function Pa(s,t,e,p,h){const g={move:s,variations:h};return t&&(g.suffix=t),e&&(g.nag=e),p!==null&&(g.comment=p),g}function Fa(...s){const[t,...e]=s;let p=t;for(const h of e)h!==null&&(p.variations=[h,...h.variations],h.variations=[],p=h);return t}function La(s,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const p=e.variations[0];if(!p){e.comment=t.marker.comment;break}e=p}}return{headers:s,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Ma(s,t){function e(){this.constructor=s}e.prototype=t.prototype,s.prototype=new e}function _t(s,t,e,p){var h=Error.call(this,s);return Object.setPrototypeOf&&Object.setPrototypeOf(h,_t.prototype),h.expected=t,h.found=e,h.location=p,h.name="SyntaxError",h}Ma(_t,Error);function aa(s,t,e){return e=e||" ",s.length>t?s:(t-=s.length,e+=e.repeat(t),s+e.slice(0,t))}_t.prototype.format=function(s){var t="Error: "+this.message;if(this.location){var e=null,p;for(p=0;p<s.length;p++)if(s[p].source===this.location.source){e=s[p].text.split(/\r\n|\n|\r/g);break}var h=this.location.start,g=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(h):h,c=this.location.source+":"+g.line+":"+g.column;if(e){var r=this.location.end,R=aa("",g.line.toString().length," "),Y=e[h.line-1],A=h.line===r.line?r.column:Y.length+1,E=A-h.column||1;t+=`
 --> `+c+`
`+R+` |
`+g.line+" | "+Y+`
`+R+" | "+aa("",h.column-1," ")+aa("",E,"^")}else t+=`
 at `+c}return t};_t.buildMessage=function(s,t){var e={literal:function(Y){return'"'+h(Y.text)+'"'},class:function(Y){var A=Y.parts.map(function(E){return Array.isArray(E)?g(E[0])+"-"+g(E[1]):g(E)});return"["+(Y.inverted?"^":"")+A.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(Y){return Y.description}};function p(Y){return Y.charCodeAt(0).toString(16).toUpperCase()}function h(Y){return Y.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(A){return"\\x0"+p(A)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(A){return"\\x"+p(A)})}function g(Y){return Y.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(A){return"\\x0"+p(A)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(A){return"\\x"+p(A)})}function c(Y){return e[Y.type](Y)}function r(Y){var A=Y.map(c),E,G;if(A.sort(),A.length>0){for(E=1,G=1;E<A.length;E++)A[E-1]!==A[E]&&(A[G]=A[E],G++);A.length=G}switch(A.length){case 1:return A[0];case 2:return A[0]+" or "+A[1];default:return A.slice(0,-1).join(", ")+", or "+A[A.length-1]}}function R(Y){return Y?'"'+h(Y)+'"':"end of input"}return"Expected "+r(s)+" but "+R(t)+" found."};function qa(s,t){t=t!==void 0?t:{};var e={},p=t.grammarSource,h={pgn:Et},g=Et,c="[",r='"',R="]",Y=".",A="O-O-O",E="O-O",G="0-0-0",O="0-0",ge="$",we="{",We="}",Xe=";",ot="(",$t=")",tt="1-0",Pe="0-1",at="1/2-1/2",ut="*",Le=/^[a-zA-Z]/,dt=/^[^"]/,Me=/^[0-9]/,qe=/^[.]/,de=/^[a-zA-Z1-8\-=]/,it=/^[+#]/,ye=/^[!?]/,rt=/^[^}]/,nt=/^[^\r\n]/,d=/^[ \t\r\n]/,a=Ke("tag pair"),n=Be("[",!1),f=Be('"',!1),v=Be("]",!1),T=Ke("tag name"),N=Ze([["a","z"],["A","Z"]],!1,!1),w=Ke("tag value"),L=Ze(['"'],!0,!1),M=Ke("move number"),_=Ze([["0","9"]],!1,!1),q=Be(".",!1),x=Ze(["."],!1,!1),U=Ke("standard algebraic notation"),F=Be("O-O-O",!1),j=Be("O-O",!1),l=Be("0-0-0",!1),u=Be("0-0",!1),i=Ze([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),o=Ze(["+","#"],!1,!1),k=Ke("suffix annotation"),z=Ze(["!","?"],!1,!1),C=Ke("NAG"),V=Be("$",!1),ie=Ke("brace comment"),H=Be("{",!1),B=Ze(["}"],!0,!1),W=Be("}",!1),ae=Ke("rest of line comment"),ne=Be(";",!1),le=Ze(["\r",`
`],!0,!1),ue=Ke("variation"),fe=Be("(",!1),Q=Be(")",!1),be=Ke("game termination marker"),Ee=Be("1-0",!1),ce=Be("0-1",!1),xe=Be("1/2-1/2",!1),Ie=Be("*",!1),Oe=Ke("whitespace"),ze=Ze([" ","	","\r",`
`],!1,!1),He=function(m,S){return La(m,S)},pe=function(m){return Object.fromEntries(m)},Ae=function(m,S){return[m,S]},me=function(m,S){return{root:m,marker:S}},Ce=function(m,S){return Fa(Ea(m),...S.flat())},ke=function(m,S,I,Z,X){return Pa(m,S,I,Z,X)},De=function(m){return m},_e=function(m){return m.replace(/[\r\n]+/g," ")},he=function(m){return m.trim()},D=function(m){return m},K=function(m,S){return{result:m,comment:S}},b=t.peg$currPos|0,Te=[{line:1,column:1}],$e=b,st=t.peg$maxFailExpected||[],J=t.peg$silentFails|0,ht;if(t.startRule){if(!(t.startRule in h))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');g=h[t.startRule]}function Be(m,S){return{type:"literal",text:m,ignoreCase:S}}function Ze(m,S,I){return{type:"class",parts:m,inverted:S,ignoreCase:I}}function At(){return{type:"end"}}function Ke(m){return{type:"other",description:m}}function Dt(m){var S=Te[m],I;if(S)return S;if(m>=Te.length)I=Te.length-1;else for(I=m;!Te[--I];);for(S=Te[I],S={line:S.line,column:S.column};I<m;)s.charCodeAt(I)===10?(S.line++,S.column=1):S.column++,I++;return Te[m]=S,S}function Tt(m,S,I){var Z=Dt(m),X=Dt(S),ve={source:p,start:{offset:m,line:Z.line,column:Z.column},end:{offset:S,line:X.line,column:X.column}};return ve}function ee(m){b<$e||(b>$e&&($e=b,st=[]),st.push(m))}function Bt(m,S,I){return new _t(_t.buildMessage(m,S),m,S,I)}function Et(){var m,S,I;return m=b,S=Nt(),I=Ut(),m=He(S,I),m}function Nt(){var m,S,I;for(m=b,S=[],I=jt();I!==e;)S.push(I),I=jt();return I=re(),m=pe(S),m}function jt(){var m,S,I,Z,X,ve,pt;return J++,m=b,re(),s.charCodeAt(b)===91?(S=c,b++):(S=e,J===0&&ee(n)),S!==e?(re(),I=St(),I!==e?(re(),s.charCodeAt(b)===34?(Z=r,b++):(Z=e,J===0&&ee(f)),Z!==e?(X=Ot(),s.charCodeAt(b)===34?(ve=r,b++):(ve=e,J===0&&ee(f)),ve!==e?(re(),s.charCodeAt(b)===93?(pt=R,b++):(pt=e,J===0&&ee(v)),pt!==e?m=Ae(I,X):(b=m,m=e)):(b=m,m=e)):(b=m,m=e)):(b=m,m=e)):(b=m,m=e),J--,m===e&&J===0&&ee(a),m}function St(){var m,S,I;if(J++,m=b,S=[],I=s.charAt(b),Le.test(I)?b++:(I=e,J===0&&ee(N)),I!==e)for(;I!==e;)S.push(I),I=s.charAt(b),Le.test(I)?b++:(I=e,J===0&&ee(N));else S=e;return S!==e?m=s.substring(m,b):m=S,J--,m===e&&(S=e,J===0&&ee(T)),m}function Ot(){var m,S,I;for(J++,m=b,S=[],I=s.charAt(b),dt.test(I)?b++:(I=e,J===0&&ee(L));I!==e;)S.push(I),I=s.charAt(b),dt.test(I)?b++:(I=e,J===0&&ee(L));return m=s.substring(m,b),J--,S=e,J===0&&ee(w),m}function Ut(){var m,S,I;return m=b,S=Ht(),re(),I=te(),I===e&&(I=null),re(),m=me(S,I),m}function Ht(){var m,S,I,Z;for(m=b,S=gt(),S===e&&(S=null),I=[],Z=Gt();Z!==e;)I.push(Z),Z=Gt();return m=Ce(S,I),m}function Gt(){var m,S,I,Z,X,ve,pt,It;if(m=b,re(),Wt(),re(),S=Ct(),S!==e){for(I=Pt(),I===e&&(I=null),Z=[],X=ct();X!==e;)Z.push(X),X=ct();for(X=re(),ve=gt(),ve===e&&(ve=null),pt=[],It=P();It!==e;)pt.push(It),It=P();m=ke(S,I,Z,ve,pt)}else b=m,m=e;return m}function Wt(){var m,S,I,Z,X,ve;for(J++,m=b,S=[],I=s.charAt(b),Me.test(I)?b++:(I=e,J===0&&ee(_));I!==e;)S.push(I),I=s.charAt(b),Me.test(I)?b++:(I=e,J===0&&ee(_));if(s.charCodeAt(b)===46?(I=Y,b++):(I=e,J===0&&ee(q)),I!==e){for(Z=re(),X=[],ve=s.charAt(b),qe.test(ve)?b++:(ve=e,J===0&&ee(x));ve!==e;)X.push(ve),ve=s.charAt(b),qe.test(ve)?b++:(ve=e,J===0&&ee(x));S=[S,I,Z,X],m=S}else b=m,m=e;return J--,m===e&&(S=e,J===0&&ee(M)),m}function Ct(){var m,S,I,Z,X,ve;if(J++,m=b,S=b,s.substr(b,5)===A?(I=A,b+=5):(I=e,J===0&&ee(F)),I===e&&(s.substr(b,3)===E?(I=E,b+=3):(I=e,J===0&&ee(j)),I===e&&(s.substr(b,5)===G?(I=G,b+=5):(I=e,J===0&&ee(l)),I===e&&(s.substr(b,3)===O?(I=O,b+=3):(I=e,J===0&&ee(u)),I===e))))if(I=b,Z=s.charAt(b),Le.test(Z)?b++:(Z=e,J===0&&ee(N)),Z!==e){if(X=[],ve=s.charAt(b),de.test(ve)?b++:(ve=e,J===0&&ee(i)),ve!==e)for(;ve!==e;)X.push(ve),ve=s.charAt(b),de.test(ve)?b++:(ve=e,J===0&&ee(i));else X=e;X!==e?(Z=[Z,X],I=Z):(b=I,I=e)}else b=I,I=e;return I!==e?(Z=s.charAt(b),it.test(Z)?b++:(Z=e,J===0&&ee(o)),Z===e&&(Z=null),I=[I,Z],S=I):(b=S,S=e),S!==e?m=s.substring(m,b):m=S,J--,m===e&&(S=e,J===0&&ee(U)),m}function Pt(){var m,S,I;for(J++,m=b,S=[],I=s.charAt(b),ye.test(I)?b++:(I=e,J===0&&ee(z));I!==e;)S.push(I),S.length>=2?I=e:(I=s.charAt(b),ye.test(I)?b++:(I=e,J===0&&ee(z)));return S.length<1?(b=m,m=e):m=S,J--,m===e&&(S=e,J===0&&ee(k)),m}function ct(){var m,S,I,Z,X;if(J++,m=b,re(),s.charCodeAt(b)===36?(S=ge,b++):(S=e,J===0&&ee(V)),S!==e){if(I=b,Z=[],X=s.charAt(b),Me.test(X)?b++:(X=e,J===0&&ee(_)),X!==e)for(;X!==e;)Z.push(X),X=s.charAt(b),Me.test(X)?b++:(X=e,J===0&&ee(_));else Z=e;Z!==e?I=s.substring(I,b):I=Z,I!==e?m=De(I):(b=m,m=e)}else b=m,m=e;return J--,m===e&&J===0&&ee(C),m}function gt(){var m;return m=ua(),m===e&&(m=Kt()),m}function ua(){var m,S,I,Z,X;if(J++,m=b,s.charCodeAt(b)===123?(S=we,b++):(S=e,J===0&&ee(H)),S!==e){for(I=b,Z=[],X=s.charAt(b),rt.test(X)?b++:(X=e,J===0&&ee(B));X!==e;)Z.push(X),X=s.charAt(b),rt.test(X)?b++:(X=e,J===0&&ee(B));I=s.substring(I,b),s.charCodeAt(b)===125?(Z=We,b++):(Z=e,J===0&&ee(W)),Z!==e?m=_e(I):(b=m,m=e)}else b=m,m=e;return J--,m===e&&(S=e,J===0&&ee(ie)),m}function Kt(){var m,S,I,Z,X;if(J++,m=b,s.charCodeAt(b)===59?(S=Xe,b++):(S=e,J===0&&ee(ne)),S!==e){for(I=b,Z=[],X=s.charAt(b),nt.test(X)?b++:(X=e,J===0&&ee(le));X!==e;)Z.push(X),X=s.charAt(b),nt.test(X)?b++:(X=e,J===0&&ee(le));I=s.substring(I,b),m=he(I)}else b=m,m=e;return J--,m===e&&(S=e,J===0&&ee(ae)),m}function P(){var m,S,I,Z;return J++,m=b,re(),s.charCodeAt(b)===40?(S=ot,b++):(S=e,J===0&&ee(fe)),S!==e?(I=Ht(),I!==e?(re(),s.charCodeAt(b)===41?(Z=$t,b++):(Z=e,J===0&&ee(Q)),Z!==e?m=D(I):(b=m,m=e)):(b=m,m=e)):(b=m,m=e),J--,m===e&&J===0&&ee(ue),m}function te(){var m,S,I;return J++,m=b,s.substr(b,3)===tt?(S=tt,b+=3):(S=e,J===0&&ee(Ee)),S===e&&(s.substr(b,3)===Pe?(S=Pe,b+=3):(S=e,J===0&&ee(ce)),S===e&&(s.substr(b,7)===at?(S=at,b+=7):(S=e,J===0&&ee(xe)),S===e&&(s.charCodeAt(b)===42?(S=ut,b++):(S=e,J===0&&ee(Ie))))),S!==e?(re(),I=gt(),I===e&&(I=null),m=K(S,I)):(b=m,m=e),J--,m===e&&(S=e,J===0&&ee(be)),m}function re(){var m,S;for(J++,m=[],S=s.charAt(b),d.test(S)?b++:(S=e,J===0&&ee(ze));S!==e;)m.push(S),S=s.charAt(b),d.test(S)?b++:(S=e,J===0&&ee(ze));return J--,S=e,J===0&&ee(Oe),m}if(ht=g(),t.peg$library)return{peg$result:ht,peg$currPos:b,peg$FAILED:e,peg$maxFailExpected:st,peg$maxFailPos:$e};if(ht!==e&&b===s.length)return ht;throw ht!==e&&b<s.length&&ee(At()),Bt(st,$e<s.length?s.charAt($e):null,$e<s.length?Tt($e,$e+1):Tt($e,$e))}/**
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
 */const Xt=0xffffffffffffffffn;function ia(s,t){return(s<<t|s>>64n-t)&0xffffffffffffffffn}function ha(s,t){return s*t&Xt}function za(s){return function(){let t=BigInt(s&Xt),e=BigInt(s>>64n&Xt);const p=ha(ia(ha(t,5n),7n),9n);return e^=t,t=(ia(t,24n)^e^e<<16n)&Xt,e=ia(e,37n),s=e<<64n|t,p}}const ea=za(0xa187eb39cdcaed8f31c4b365b102e01en),Ra=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>ea()))),Ba=Array.from({length:8},()=>ea()),Na=Array.from({length:16},()=>ea()),na=ea(),Ye="w",et="b",je="p",ca="n",Zt="b",zt="r",ft="q",Ue="k",oa="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Yt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:p,piece:h,from:g,to:c,flags:r,captured:R,promotion:Y}=e,A=Ge(g),E=Ge(c);this.color=p,this.piece=h,this.from=A,this.to=E,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=A+E,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const G in se)se[G]&r&&(this.flags+=yt[G]);R&&(this.captured=R),Y&&(this.promotion=Y,this.lan+=Y)}isCapture(){return this.flags.indexOf(yt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(yt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(yt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(yt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(yt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(yt.BIG_PAWN)>-1}}const Ve=-1,yt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},se={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},pa={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},ja={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Oa={...pa,...ja},oe={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},ra={b:[16,32,17,15],w:[-16,-32,-17,-15]},va={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ua=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ha=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ga={p:1,n:2,b:4,r:8,q:16,k:32},Wa="pnbrqkPNBRQK",xa=[ca,Zt,zt,ft],Ka=7,Va=6,Ya=1,Ja=0,Jt={[Ue]:se.KSIDE_CASTLE,[ft]:se.QSIDE_CASTLE},bt={w:[{square:oe.a1,flag:se.QSIDE_CASTLE},{square:oe.h1,flag:se.KSIDE_CASTLE}],b:[{square:oe.a8,flag:se.QSIDE_CASTLE},{square:oe.h8,flag:se.KSIDE_CASTLE}]},Qa={b:Ya,w:Va},sa="--";function wt(s){return s>>4}function Rt(s){return s&15}function $a(s){return"0123456789".indexOf(s)!==-1}function Ge(s){const t=Rt(s),e=wt(s);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function Mt(s){return s===Ye?et:Ye}function Xa(s){const t=s.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const p=parseInt(t[4],10);if(isNaN(p)||p<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const h=t[0].split("/");if(h.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let c=0;c<h.length;c++){let r=0,R=!1;for(let Y=0;Y<h[c].length;Y++)if($a(h[c][Y])){if(R)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};r+=parseInt(h[c][Y],10),R=!0}else{if(!/^[prnbqkPRNBQK]$/.test(h[c][Y]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};r+=1,R=!1}if(r!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const g=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:c,regex:r}of g){if(!r.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${c} king`};if((t[0].match(r)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${c} kings`}}return Array.from(h[0]+h[7]).some(c=>c.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Za(s,t){const e=s.from,p=s.to,h=s.piece;let g=0,c=0,r=0;for(let R=0,Y=t.length;R<Y;R++){const A=t[R].from,E=t[R].to,G=t[R].piece;h===G&&e!==A&&p===E&&(g++,wt(e)===wt(A)&&c++,Rt(e)===Rt(A)&&r++)}return g>0?c>0&&r>0?Ge(e):r>0?Ge(e).charAt(1):Ge(e).charAt(0):""}function mt(s,t,e,p,h,g=void 0,c=se.NORMAL){const r=wt(p);if(h===je&&(r===Ka||r===Ja))for(let R=0;R<xa.length;R++){const Y=xa[R];s.push({color:t,from:e,to:p,piece:h,captured:g,promotion:Y,flags:c|se.PROMOTION})}else s.push({color:t,from:e,to:p,piece:h,captured:g,flags:c})}function ya(s){let t=s.charAt(0);return t>="a"&&t<="h"?s.match(/[a-h]\d.*[a-h]\d/)?void 0:je:(t=t.toLowerCase(),t==="o"?Ue:t)}function la(s){return s.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ka{_board=new Array(128);_turn=Ye;_header={};_kings={w:Ve,b:Ve};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=oa,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:Ve,b:Ve},this._turn=Ye,this._castling={w:0,b:0},this._epSquare=Ve,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Oa},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:p=!1}={}){let h=t.split(/\s+/);if(h.length>=2&&h.length<6){const r=["-","-","0","1"];t=h.concat(r.slice(-(6-h.length))).join(" ")}if(h=t.split(/\s+/),!e){const{ok:r,error:R}=Xa(t);if(!r)throw new Error(R)}const g=h[0];let c=0;this.clear({preserveHeaders:p});for(let r=0;r<g.length;r++){const R=g.charAt(r);if(R==="/")c+=8;else if($a(R))c+=parseInt(R,10);else{const Y=R<"a"?Ye:et;this._put({type:R.toLowerCase(),color:Y},Ge(c)),c++}}this._turn=h[1],h[2].indexOf("K")>-1&&(this._castling.w|=se.KSIDE_CASTLE),h[2].indexOf("Q")>-1&&(this._castling.w|=se.QSIDE_CASTLE),h[2].indexOf("k")>-1&&(this._castling.b|=se.KSIDE_CASTLE),h[2].indexOf("q")>-1&&(this._castling.b|=se.QSIDE_CASTLE),this._epSquare=h[3]==="-"?Ve:oe[h[3]],this._halfMoves=parseInt(h[4],10),this._moveNumber=parseInt(h[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,p="";for(let c=oe.a8;c<=oe.h1;c++){if(this._board[c]){e>0&&(p+=e,e=0);const{color:r,type:R}=this._board[c];p+=r===Ye?R.toUpperCase():R.toLowerCase()}else e++;c+1&136&&(e>0&&(p+=e),c!==oe.h1&&(p+="/"),e=0,c+=8)}let h="";this._castling[Ye]&se.KSIDE_CASTLE&&(h+="K"),this._castling[Ye]&se.QSIDE_CASTLE&&(h+="Q"),this._castling[et]&se.KSIDE_CASTLE&&(h+="k"),this._castling[et]&se.QSIDE_CASTLE&&(h+="q"),h=h||"-";let g="-";if(this._epSquare!==Ve)if(t)g=Ge(this._epSquare);else{const c=this._epSquare+(this._turn===Ye?16:-16),r=[c+1,c-1];for(const R of r){if(R&136)continue;const Y=this._turn;if(this._board[R]?.color===Y&&this._board[R]?.type===je){this._makeMove({color:Y,from:R,to:this._epSquare,piece:je,captured:je,flags:se.EP_CAPTURE});const A=!this._isKingAttacked(Y);if(this._undoMove(),A){g=Ge(this._epSquare);break}}}}return[p,this._turn,h,g,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:p}=this._board[t],h={w:0,b:1}[e],g={p:0,n:1,b:2,r:3,q:4,k:5}[p];return Ra[h][g][t]}_epKey(){return this._epSquare===Ve?0n:Ba[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Na[t]}_computeHash(){let t=0n;for(let e=oe.a8;e<=oe.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=na),t}_updateSetup(t){this._history.length>0||(t!==oa?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(oa)}get(t){return this._board[oe[t]]}findPiece(t){const e=[];for(let p=oe.a8;p<=oe.h1;p++){if(p&136){p+=7;continue}!this._board[p]||this._board[p]?.color!==t.color||this._board[p].color===t.color&&this._board[p].type===t.type&&e.push(Ge(p))}return e}put({type:t,color:e},p){return this._put({type:t,color:e},p)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},p){if(Wa.indexOf(t.toLowerCase())===-1||!(p in oe))return!1;const h=oe[p];if(t==Ue&&!(this._kings[e]==Ve||this._kings[e]==h))return!1;const g=this._board[h];return g&&g.type===Ue&&(this._kings[g.color]=Ve),this._set(h,{type:t,color:e}),t===Ue&&(this._kings[e]=h),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(oe[t]),e&&e.type===Ue&&(this._kings[e.color]=Ve),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[oe.e1]?.type===Ue&&this._board[oe.e1]?.color===Ye,e=this._board[oe.e8]?.type===Ue&&this._board[oe.e8]?.color===et;(!t||this._board[oe.a1]?.type!==zt||this._board[oe.a1]?.color!==Ye)&&(this._castling.w&=-65),(!t||this._board[oe.h1]?.type!==zt||this._board[oe.h1]?.color!==Ye)&&(this._castling.w&=-33),(!e||this._board[oe.a8]?.type!==zt||this._board[oe.a8]?.color!==et)&&(this._castling.b&=-65),(!e||this._board[oe.h8]?.type!==zt||this._board[oe.h8]?.color!==et)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Ve)return;const t=this._epSquare+(this._turn===Ye?-16:16),e=this._epSquare+(this._turn===Ye?16:-16),p=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==Mt(this._turn)||this._board[e]?.type!==je){this._hash^=this._epKey(),this._epSquare=Ve;return}const h=g=>!(g&136)&&this._board[g]?.color===this._turn&&this._board[g]?.type===je;p.some(h)||(this._hash^=this._epKey(),this._epSquare=Ve)}_attacked(t,e,p){const h=[];for(let g=oe.a8;g<=oe.h1;g++){if(g&136){g+=7;continue}if(this._board[g]===void 0||this._board[g].color!==t)continue;const c=this._board[g],r=g-e;if(r===0)continue;const R=r+119;if(Ua[R]&Ga[c.type]){if(c.type===je){if(r>0&&c.color===Ye||r<=0&&c.color===et)if(p)h.push(Ge(g));else return!0;continue}if(c.type==="n"||c.type==="k")if(p){h.push(Ge(g));continue}else return!0;const Y=Ha[R];let A=g+Y,E=!1;for(;A!==e;){if(this._board[A]!=null){E=!0;break}A+=Y}if(!E)if(p){h.push(Ge(g));continue}else return!0}}return p?h:!1}attackers(t,e){return e?this._attacked(e,oe[t],!0):this._attacked(this._turn,oe[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(Mt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,oe[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let p=0,h=0;for(let g=oe.a8;g<=oe.h1;g++){if(h=(h+1)%2,g&136){g+=7;continue}const c=this._board[g];c&&(t[c.type]=c.type in t?t[c.type]+1:1,c.type===Zt&&e.push(h),p++)}if(p===2)return!0;if(p===3&&(t[Zt]===1||t[ca]===1))return!0;if(p===t[Zt]+2){let g=0;const c=e.length;for(let r=0;r<c;r++)g+=e[r];if(g===0||g===c)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:p=void 0}={}){const h=this._moves({square:e,piece:p});return t?h.map(g=>new Yt(this,g)):h.map(g=>this._moveToSan(g,h))}_moves({legal:t=!0,piece:e=void 0,square:p=void 0}={}){const h=p?p.toLowerCase():void 0,g=e?.toLowerCase(),c=[],r=this._turn,R=Mt(r);let Y=oe.a8,A=oe.h1,E=!1;if(h)if(h in oe)Y=A=oe[h],E=!0;else return[];for(let O=Y;O<=A;O++){if(O&136){O+=7;continue}if(!this._board[O]||this._board[O].color===R)continue;const{type:ge}=this._board[O];let we;if(ge===je){if(g&&g!==ge)continue;we=O+ra[r][0],this._board[we]||(mt(c,r,O,we,je),we=O+ra[r][1],Qa[r]===wt(O)&&!this._board[we]&&mt(c,r,O,we,je,void 0,se.BIG_PAWN));for(let We=2;We<4;We++)we=O+ra[r][We],!(we&136)&&(this._board[we]?.color===R?mt(c,r,O,we,je,this._board[we].type,se.CAPTURE):we===this._epSquare&&mt(c,r,O,we,je,je,se.EP_CAPTURE))}else{if(g&&g!==ge)continue;for(let We=0,Xe=va[ge].length;We<Xe;We++){const ot=va[ge][We];for(we=O;we+=ot,!(we&136);){if(!this._board[we])mt(c,r,O,we,ge);else{if(this._board[we].color===r)break;mt(c,r,O,we,ge,this._board[we].type,se.CAPTURE);break}if(ge===ca||ge===Ue)break}}}}if((g===void 0||g===Ue)&&(!E||A===this._kings[r])){if(this._castling[r]&se.KSIDE_CASTLE){const O=this._kings[r],ge=O+2;!this._board[O+1]&&!this._board[ge]&&!this._attacked(R,this._kings[r])&&!this._attacked(R,O+1)&&!this._attacked(R,ge)&&mt(c,r,this._kings[r],ge,Ue,void 0,se.KSIDE_CASTLE)}if(this._castling[r]&se.QSIDE_CASTLE){const O=this._kings[r],ge=O-2;!this._board[O-1]&&!this._board[O-2]&&!this._board[O-3]&&!this._attacked(R,this._kings[r])&&!this._attacked(R,O-1)&&!this._attacked(R,ge)&&mt(c,r,this._kings[r],ge,Ue,void 0,se.QSIDE_CASTLE)}}if(!t||this._kings[r]===-1)return c;const G=[];for(let O=0,ge=c.length;O<ge;O++)this._makeMove(c[O]),this._isKingAttacked(r)||G.push(c[O]),this._undoMove();return G}move(t,{strict:e=!1}={}){let p=null;if(typeof t=="string")p=this._moveFromSan(t,e);else if(t===null)p=this._moveFromSan(sa,e);else if(typeof t=="object"){const g=this._moves();for(let c=0,r=g.length;c<r;c++)if(t.from===Ge(g[c].from)&&t.to===Ge(g[c].to)&&(!("promotion"in g[c])||t.promotion===g[c].promotion)){p=g[c];break}}if(!p)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&p.flags&se.NULL_MOVE)throw new Error("Null move not allowed when in check");const h=new Yt(this,p);return this._makeMove(p),this._incPositionCount(),h}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,p=Mt(e);if(this._push(t),t.flags&se.NULL_MOVE){e===et&&this._moveNumber++,this._halfMoves++,this._turn=p,this._epSquare=Ve;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&se.EP_CAPTURE&&(this._turn===et?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===Ue){if(this._kings[e]=t.to,t.flags&se.KSIDE_CASTLE){const h=t.to-1,g=t.to+1;this._movePiece(g,h)}else if(t.flags&se.QSIDE_CASTLE){const h=t.to+1,g=t.to-2;this._movePiece(g,h)}this._castling[e]=0}if(this._castling[e]){for(let h=0,g=bt[e].length;h<g;h++)if(t.from===bt[e][h].square&&this._castling[e]&bt[e][h].flag){this._castling[e]^=bt[e][h].flag;break}}if(this._castling[p]){for(let h=0,g=bt[p].length;h<g;h++)if(t.to===bt[p][h].square&&this._castling[p]&bt[p][h].flag){this._castling[p]^=bt[p][h].flag;break}}if(this._hash^=this._castlingKey(),t.flags&se.BIG_PAWN){let h;e===et?h=t.to-16:h=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===je&&this._board[t.to-1]?.color===p||!(t.to+1&136)&&this._board[t.to+1]?.type===je&&this._board[t.to+1]?.color===p?(this._epSquare=h,this._hash^=this._epKey()):this._epSquare=Ve}else this._epSquare=Ve;t.piece===je?this._halfMoves=0:t.flags&(se.CAPTURE|se.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===et&&this._moveNumber++,this._turn=p,this._hash^=na}undo(){const t=this._hash,e=this._undoMove();if(e){const p=new Yt(this,e);return this._decPositionCount(t),p}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=na;const p=this._turn,h=Mt(p);if(e.flags&se.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:p})),e.captured)if(e.flags&se.EP_CAPTURE){let g;p===et?g=e.to-16:g=e.to+16,this._set(g,{type:je,color:h})}else this._set(e.to,{type:e.captured,color:h});if(e.flags&(se.KSIDE_CASTLE|se.QSIDE_CASTLE)){let g,c;e.flags&se.KSIDE_CASTLE?(g=e.to+1,c=e.to-1):(g=e.to-2,c=e.to+1),this._movePiece(c,g)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const p=[];let h=!1;for(const G in this._header)this._header[G]&&p.push(`[${G} "${this._header[G]}"]`+t),h=!0;h&&this._history.length&&p.push(t);const g=G=>{const O=this._comments[this.fen()];if(typeof O<"u"){const ge=G.length>0?" ":"";G=`${G}${ge}{${O}}`}return G},c=[];for(;this._history.length>0;)c.push(this._undoMove());const r=[];let R="";for(c.length===0&&r.push(g(""));c.length>0;){R=g(R);const G=c.pop();if(!G)break;if(!this._history.length&&G.color==="b"){const O=`${this._moveNumber}. ...`;R=R?`${R} ${O}`:O}else G.color==="w"&&(R.length&&r.push(R),R=this._moveNumber+".");R=R+" "+this._moveToSan(G,this._moves({legal:!0})),this._makeMove(G)}if(R.length&&r.push(g(R)),r.push(this._header.Result||"*"),e===0)return p.join("")+r.join(" ");const Y=function(){return p.length>0&&p[p.length-1]===" "?(p.pop(),!0):!1},A=function(G,O){for(const ge of O.split(" "))if(ge){if(G+ge.length>e){for(;Y();)G--;p.push(t),G=0}p.push(ge),G+=ge.length,p.push(" "),G++}return Y()&&G--,G};let E=0;for(let G=0;G<r.length;G++){if(E+r[G].length>e&&r[G].includes("{")){E=A(E,r[G]);continue}E+r[G].length>e&&G!==0?(p[p.length-1]===" "&&p.pop(),p.push(t),E=0):G!==0&&(p.push(" "),E++),p.push(r[G]),E+=r[G].length}return p.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??pa[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=pa[t]||null,!0):!1}getHeaders(){const t={};for(const[e,p]of Object.entries(this._header))p!==null&&(t[e]=p);return t}loadPgn(t,{strict:e=!1,newlineChar:p=`\r?
`}={}){p!==`\r?
`&&(t=t.replace(new RegExp(p,"g"),`
`));const h=qa(t);this.reset();const g=h.headers;let c="";for(const Y in g)Y.toLowerCase()==="fen"&&(c=g[Y]),this.header(Y,g[Y]);if(!e)c&&this.load(c,{preserveHeaders:!0});else if(g.SetUp==="1"){if(!("FEN"in g))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(g.FEN,{preserveHeaders:!0})}let r=h.root;for(;r;){if(r.move){const Y=this._moveFromSan(r.move,e);if(Y==null)throw new Error(`Invalid move in PGN: ${r.move}`);this._makeMove(Y),this._incPositionCount()}r.comment!==void 0&&(this._comments[this.fen()]=r.comment),r=r.variations[0]}const R=h.result;R&&Object.keys(this._header).length&&this._header.Result!==R&&this.setHeader("Result",R)}_moveToSan(t,e){let p="";if(t.flags&se.KSIDE_CASTLE)p="O-O";else if(t.flags&se.QSIDE_CASTLE)p="O-O-O";else{if(t.flags&se.NULL_MOVE)return sa;if(t.piece!==je){const h=Za(t,e);p+=t.piece.toUpperCase()+h}t.flags&(se.CAPTURE|se.EP_CAPTURE)&&(t.piece===je&&(p+=Ge(t.from)[0]),p+="x"),p+=Ge(t.to),t.promotion&&(p+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?p+="#":p+="+"),this._undoMove(),p}_moveFromSan(t,e=!1){let p=la(t);if(e||(p==="0-0"?p="O-O":p==="0-0-0"&&(p="O-O-O")),p==sa)return{color:this._turn,from:0,to:0,piece:"k",flags:se.NULL_MOVE};let h=ya(p),g=this._moves({legal:!0,piece:h});for(let G=0,O=g.length;G<O;G++)if(p===la(this._moveToSan(g[G],g)))return g[G];if(e)return null;let c,r,R,Y,A,E=!1;if(r=p.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),r?(c=r[1],R=r[2],Y=r[3],A=r[4],R.length==1&&(E=!0)):(r=p.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),r&&(c=r[1],R=r[2],Y=r[3],A=r[4],R.length==1&&(E=!0))),h=ya(p),g=this._moves({legal:!0,piece:c||h}),!Y)return null;for(let G=0,O=g.length;G<O;G++)if(R){if((!c||c.toLowerCase()==g[G].piece)&&oe[R]==g[G].from&&oe[Y]==g[G].to&&(!A||A.toLowerCase()==g[G].promotion))return g[G];if(E){const ge=Ge(g[G].from);if((!c||c.toLowerCase()==g[G].piece)&&oe[Y]==g[G].to&&(R==ge[0]||R==ge[1])&&(!A||A.toLowerCase()==g[G].promotion))return g[G]}}else if(p===la(this._moveToSan(g[G],g)).replace("x",""))return g[G];return null}ascii(){let t=`   +------------------------+
`;for(let e=oe.a8;e<=oe.h1;e++){if(Rt(e)===0&&(t+=" "+"87654321"[wt(e)]+" |"),this._board[e]){const p=this._board[e].type,g=this._board[e].color===Ye?p.toUpperCase():p.toLowerCase();t+=" "+g+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let p=0;const h=this._turn;for(let g=0,c=e.length;g<c;g++)this._makeMove(e[g]),this._isKingAttacked(h)||(t-1>0?p+=this.perft(t-1):p++),this._undoMove();return p}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let p=oe.a8;p<=oe.h1;p++)this._board[p]==null?e.push(null):e.push({square:Ge(p),type:this._board[p].type,color:this._board[p].color}),p+1&136&&(t.push(e),e=[],p+=8);return t}squareColor(t){if(t in oe){const e=oe[t];return(wt(e)+Rt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],p=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const h=e.pop();if(!h)break;t?p.push(new Yt(this,h)):p.push(this._moveToSan(h,this._moves())),this._makeMove(h)}return p}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},p=h=>{h in this._comments&&(e[h]=this._comments[h])};for(;this._history.length>0;)t.push(this._undoMove());for(p(this.fen());;){const h=t.pop();if(!h)break;this._makeMove(h),p(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const h of[Ue,ft])e[h]!==void 0&&(e[h]?this._castling[t]|=Jt[h]:this._castling[t]&=~Jt[h]);this._updateCastlingRights();const p=this.getCastlingRights(t);return(e[Ue]===void 0||e[Ue]===p[Ue])&&(e[ft]===void 0||e[ft]===p[ft])}getCastlingRights(t){return{[Ue]:(this._castling[t]&Jt[Ue])!==0,[ft]:(this._castling[t]&Jt[ft])!==0}}moveNumber(){return this._moveNumber}}async function ii(s,t={}){const e=t.currentUser||{},p=t.userRole||e?.role||"employee";let h="chat",g=[],c=null,r=[],R=[],Y=null,A=null,E=!1,G=null,O=null;s.innerHTML=`
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
  `,ei(),await tt(),Me();const ge=s.querySelector("#tab-nav-chat"),we=s.querySelector("#tab-nav-lounge"),We=s.querySelector("#bonding-chat-main-wrap"),Xe=s.querySelector("#bonding-lounge-main-wrap");ge?.addEventListener("click",()=>{h="chat",ge.classList.add("active"),we.classList.remove("active"),We.style.display="grid",Xe.style.display="none",Me()}),we?.addEventListener("click",async()=>{h="lounge_games",we.classList.add("active"),ge.classList.remove("active"),We.style.display="none",Xe.style.display="block",await v()}),s.querySelector("#btn-top-new-chat")?.addEventListener("click",x),s.querySelector("#btn-top-new-group")?.addEventListener("click",U),s.querySelector("#btn-top-challenge")?.addEventListener("click",()=>N());const ot=s.querySelector("#bonding-search-input");ot&&ot.addEventListener("input",l=>{const u=l.target.value.toLowerCase().trim();s.querySelectorAll(".bonding-channel-item").forEach(o=>{const k=o.textContent.toLowerCase();o.style.display=k.includes(u)?"flex":"none"})}),ut(),new MutationObserver((l,u)=>{document.body.contains(s)||(A&&clearInterval(A),O&&clearInterval(O),u.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function tt(){try{const[l,u]=await Promise.all([Re("/bonding/channels").catch(()=>[]),Re("/bonding/colleagues").catch(()=>[])]);g=l,r=u,!c&&g.length>0&&(c=g.find(i=>i.name.includes("Lounge"))||g[0]),Le(),c&&await Pe(c._id)}catch(l){console.error("Failed to load bonding data",l)}}async function Pe(l,u=!1){if(l)try{R=await Re(`/bonding/channels/${l}/messages`),u?n():f()}catch(i){console.error("Failed to load messages",i)}}let at=0;function ut(){A&&clearInterval(A),A=setInterval(async()=>{try{if(!document.body.contains(s)){clearInterval(A);return}if(at++,at%2===0){const l=await Re("/bonding/channels").catch(()=>null);l&&JSON.stringify(l.map(u=>u._id+u.lastMessage?.sentAt))!==JSON.stringify(g.map(u=>u._id+u.lastMessage?.sentAt))&&(g=l,Le())}h==="chat"&&c?await Pe(c._id,!0):h==="lounge_games"&&await v(!0)}catch{}},3e3)}function Le(){const l=s.querySelector("#bonding-group-list"),u=s.querySelector("#bonding-direct-list");if(!l||!u)return;const i=g.filter(k=>k.type==="group"),o=g.filter(k=>k.type==="direct");if(i.length===0)l.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const k=e?._id||e?.id,z=p==="superadmin"||e?.role==="superadmin";l.innerHTML=i.map(C=>{const V=c&&c._id===C._id,H=C.createdBy&&C.createdBy.userId&&String(C.createdBy.userId)===String(k)||z;return`
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
        `}).join("")}o.length===0?u.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':u.innerHTML=o.map(k=>{const z=c&&c._id===k._id,C=k.displayName||k.name||"Colleague",V=C.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${z?"active":""}" data-channel-id="${k._id}">
            <div class="bonding-channel-avatar">${V}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${y(C)}</div>
              <div class="bonding-channel-preview">${y(k.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${k._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),dt()}function dt(){const l=s.querySelectorAll(".bonding-channel-item");l.forEach(u=>{u.onclick=async i=>{if(i.target.closest(".bonding-channel-del-btn")||i.target.closest(".bonding-channel-leave-btn"))return;const o=u.dataset.channelId,k=g.find(z=>z._id===o);k&&(c=k,l.forEach(z=>z.classList.remove("active")),u.classList.add("active"),Me(),await Pe(k._id))}}),s.querySelectorAll(".bonding-channel-leave-btn").forEach(u=>{u.onclick=async i=>{i.stopPropagation();const o=u.dataset.channelId,z=g.find(C=>C._id===o)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${z}"?`))try{u.disabled=!0,await Se(`/bonding/channels/${o}/leave`,{}),$(`You left "${z}"`,"info"),g=g.filter(C=>C._id!==o),c&&c._id===o&&(c=g.find(C=>C.type==="group")||g[0]||null,Me(),c&&await Pe(c._id)),Le()}catch(C){$(C.message||"Failed to leave group","error"),u.disabled=!1}}}),s.querySelectorAll(".bonding-channel-del-btn").forEach(u=>{u.onclick=async i=>{i.stopPropagation();const o=u.dataset.channelId,k=g.find(V=>V._id===o),z=k&&k.type==="direct",C=z?"this 1-on-1 chat":`the group "${k?.name||""}"`;if(confirm(`Are you sure you want to delete ${C}? All messages will be permanently removed.`))try{u.disabled=!0,await Qe(`/bonding/channels/${o}`),$(z?"1-on-1 chat deleted":"Group deleted","success"),g=g.filter(V=>V._id!==o),c&&c._id===o&&(c=g[0]||null,Me(),c&&await Pe(c._id)),Le()}catch(V){$(V.message||"Failed to delete conversation","error"),u.disabled=!1}}}),s.querySelector("#btn-create-group")?.addEventListener("click",U),s.querySelector("#btn-new-direct-chat")?.addEventListener("click",x)}function Me(){const l=s.querySelector("#bonding-chat-panel");if(!l)return;if(!c){l.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const u=y(c.displayName||c.name),i=(c.members||[]).length,o=c.type==="group",k=e?._id||e?.id,z=o?null:(c.members||[]).find(H=>H.userId?.toString()!==k?.toString()),C=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(k),V=p==="superadmin"||e?.role==="superadmin",ie=C||V;l.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${o?c.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${u}</div>
            <div class="bonding-chat-sub">
              ${o?`<span>${i} members</span> · <span>${y(c.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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
              <span>👥</span> <span>Members (${i})</span>
            </button>
            ${ie?`
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
        ${qe()}
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
    `,it(z),ye(z),rt(),a()}function qe(){if(!R||R.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const l=e?._id||e?.id;return R.map(u=>{const i=u.sender&&u.sender.userId&&l&&u.sender.userId.toString()===l.toString();if(u.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${u._id}">
            <span>ℹ️</span> <span>${y(u.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${u._id}" title="Delete Message">&times;</button>
          </div>
        `;if(u.type==="challenge"&&u.challengeData){const C=u.challengeData;if(C.status==="declined"||C.status==="cancelled")return"";const V=C.gameTitle||"Game Challenge",ie=C.gameType||"chess",H=ie==="chess"?"♟️":ie==="ludo"?"🎲":"❌",B=C.gameState?.invitationId,W=C.targetUserId?.toString(),ae=u.sender?.userId?.toString(),ne=l&&W===l.toString(),le=l&&ae===l.toString();return`
          <div class="bonding-msg-row ${i?"self":"other"}" data-msg-id="${u._id}">
            <div class="bonding-msg-avatar" title="${y(u.sender?.name||"Teammate")}">
              ${(u.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${y(u.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${j(u.createdAt)}</span>
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
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${B}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${B}" data-action="decline">
                        Decline
                      </button>
                    `:C.status==="pending"&&le?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${B}" data-action="cancel">
                          Cancel
                        </button>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${B}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${de(u)}
            </div>
          </div>
        `}const o=y(u.sender?.name||"Teammate"),k=j(u.createdAt),z=de(u);return`
        <div class="bonding-msg-row ${i?"self":"other"}" data-msg-id="${u._id}">
          <div class="bonding-msg-avatar" title="${o}">${o.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${o}</span>
              <span class="bonding-msg-time">${k}</span>
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
            ${z}
          </div>
        </div>
      `}).join("")}function de(l){return`
      <div class="bonding-reactions-row">
        ${(l.reactions||[]).map(o=>{const k=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(o.users||[]).some(C=>C.toString()===k?.toString())?"active":""}" data-msg-id="${l._id}" data-emoji="${o.emoji}">
          <span>${o.emoji}</span> <span>${o.users?o.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${l._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function it(l){const u=s.querySelector("#btn-chat-challenge");u&&(u.onclick=()=>{l?N(null,l.userId||l._id):N()});const i=s.querySelector("#btn-manage-members");i&&(i.onclick=M);const o=s.querySelector("#btn-delete-group");o&&(o.onclick=q);const k=s.querySelector("#btn-leave-group");k&&(k.onclick=_);const z=s.querySelector("#btn-delete-direct");z&&(z.onclick=async()=>{if(c&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{z.disabled=!0,await Qe(`/bonding/channels/${c._id}`),$("1-on-1 chat deleted successfully","success");const V=c._id;g=g.filter(ie=>ie._id!==V),c=g[0]||null,Le(),Me(),c&&await Pe(c._id)}catch(V){$(V.message||"Could not delete 1-on-1 chat","error"),z.disabled=!1}});const C=s.querySelector("#btn-clear-chat");C&&(C.onclick=async()=>{if(c&&confirm("Are you sure you want to clear all messages in this conversation?"))try{C.disabled=!0,await Qe(`/bonding/channels/${c._id}/messages`),$("Chat messages cleared","success"),R=[],f()}catch(V){$(V.message||"Could not clear chat messages","error")}finally{C.disabled=!1}})}function ye(l){const u=s.querySelector("#bonding-message-input"),i=s.querySelector("#btn-send-message"),o=s.querySelector("#btn-quick-emoji"),k=s.querySelector("#btn-input-challenge");u&&u.addEventListener("keydown",z=>{z.key==="Enter"&&!z.shiftKey&&(z.preventDefault(),nt())}),i&&(i.onclick=nt),k&&(k.onclick=()=>{l?N(null,l.userId||l._id):N()}),o&&(o.onclick=()=>{if(!u)return;const z=["👍","🎉","🔥","💪","🚀","❤️","😂","👏","✨"],C=z[Math.floor(Math.random()*z.length)];u.value+=(u.value?" ":"")+C,u.focus()})}function rt(){s.querySelectorAll(".btn-respond-invite").forEach(o=>{o.onclick=async()=>{const k=o.dataset.inviteId,z=o.dataset.action;await w(k,z)}}),s.querySelectorAll(".btn-launch-match-from-card").forEach(o=>{o.onclick=async()=>{const k=o.dataset.inviteId;try{o.disabled=!0;const z=await Re("/bonding/invitations"),C=(z.incoming||[]).concat(z.sent||[]).find(V=>V._id===k);C&&C.matchId?L(C.matchId):$("Match has not started yet or has expired","warning")}catch(z){$(z.message||"Could not load match","error")}finally{o.disabled=!1}}}),s.querySelectorAll(".bonding-msg-del-btn").forEach(o=>{o.onclick=async k=>{k.stopPropagation();const z=o.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{o.disabled=!0,await Qe(`/bonding/messages/${z}`),R=R.filter(C=>C._id!==z),n(),$("Message deleted","success")}catch(C){$(C.message||"Failed to delete message","error"),o.disabled=!1}}}),s.querySelectorAll(".bonding-rxn-tag").forEach(o=>{o.onclick=async()=>{const k=o.dataset.msgId,z=o.dataset.emoji;await d(k,z)}}),s.querySelectorAll(".bonding-add-rxn-btn").forEach(o=>{o.onclick=k=>{const z=o.dataset.msgId;F(k.currentTarget,async C=>{await d(z,C)})}})}async function nt(){const l=s.querySelector("#bonding-message-input");if(!l||!c||E)return;const u=l.value.trim();if(u)try{E=!0,l.value="";const i=await Se(`/bonding/channels/${c._id}/messages`,{content:u,type:"text"});R.push(i),f(),a()}catch(i){$(i.message||"Failed to send message","error")}finally{E=!1,l.focus()}}async function d(l,u){try{const i=await Se(`/bonding/messages/${l}/react`,{emoji:u}),o=R.find(k=>k._id===l);o&&(o.reactions=i,n())}catch(i){$(i.message||"Failed to react","error")}}function a(){const l=s.querySelector("#bonding-messages-feed");l&&(l.scrollTop=l.scrollHeight)}function n(){const l=s.querySelector("#bonding-messages-feed");if(!l)return;const u=l.scrollHeight-l.scrollTop<=l.clientHeight+80;l.innerHTML=qe(),rt(),u&&a()}function f(){const l=s.querySelector("#bonding-messages-feed");l&&(l.innerHTML=qe(),rt())}async function v(l=!1){const u=s.querySelector("#bonding-lounge-main-wrap");if(u){l||(u.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const i=await Re("/bonding/games/overview");Y=i;const o=i.myStats||{},k=i.availableGames||[],z=i.incomingChallenges||[],C=i.sentChallenges||[],V=i.activeMatches||[],ie=i.recentMatches||[],H=e?._id||e?.id;u.innerHTML=`
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
              ${k.map(B=>`
                <div class="lounge-game-card" data-game-id="${B.id}">
                  <div class="game-card-icon">${B.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${y(B.name)}</h4>
                    <p class="game-card-desc">${y(B.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${B.duration}</span>
                      ${B.id==="ludo"?'<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>':'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${B.id}" data-game-title="${y(B.name)}">
                    ${B.id==="ludo"?"⚔️ Play Ludo (2P, 3P, 4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${z.length+C.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${z.length})</h5>
              ${z.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${z.map(B=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(B.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${y(B.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${y(B.sender.name)}</strong> (${y(B.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${B._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${B._id}" data-action="decline">
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
                    ${C.map(B=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(B.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${y(B.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${y(B.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${B._id}" data-action="cancel">
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
                    ${V.map(B=>{const ae=(B.players||B.gameState?.players||[B.player1,B.player2].filter(Boolean)).filter(fe=>fe.userId&&fe.userId.toString()!==H?.toString()),ne=B.player1?.userId?.toString()===H?.toString()?B.player2:B.player1,le=ae.length>0?ae.map(fe=>y(fe.name)).join(", "):ne?.name?y(ne.name):"Colleagues",ue=H&&B.currentTurnUserId&&B.currentTurnUserId.toString()===H.toString();return`
                        <div class="lounge-active-match-card ${ue?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${B.gameType==="chess"?"♟️":B.gameType==="ludo"?"🎲":"❌"}</span>
                            <div>
                              <div class="match-game-title">${y(B.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${le}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${ue?"my-turn":"wait"}">
                              ${ue?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${B._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${B._id}" title="Delete Match">
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
              ${ie.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${ie.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${ie.map(B=>{const ae=H&&B.player1.userId.toString()===H.toString()?B.player2:B.player1,ne=H&&B.winnerId&&B.winnerId.toString()===H.toString(),le=B.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${y(B.gameTitle)}</span>
                          <span class="recent-date">${j(B.completedAt||B.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${B._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${y(ae.name)}</strong></div>
                          <div class="recent-outcome ${ne?"win":le?"draw":"loss"}">
                            ${ne?"🏆 VICTORY":le?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${y(B.winningReason||B.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${B._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${B._id}" title="Delete Match Record">
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
      `}}}function T(){s.querySelectorAll(".btn-challenge-game").forEach(u=>{u.onclick=()=>{const i=u.dataset.gameId;N(i)}}),s.querySelectorAll(".btn-respond-invite").forEach(u=>{u.onclick=async()=>{const i=u.dataset.inviteId,o=u.dataset.action;await w(i,o),await v()}}),s.querySelectorAll(".btn-resume-match").forEach(u=>{u.onclick=()=>{const i=u.dataset.matchId;L(i)}}),s.querySelectorAll(".btn-recent-rematch").forEach(u=>{u.onclick=async()=>{const i=u.dataset.matchId;try{u.disabled=!0;const o=await Se(`/bonding/matches/${i}/action`,{action:"rematch"});o.match&&($("Rematch created! Opening arena ⚔️","success"),L(o.match._id))}catch(o){$(o.message||"Could not start rematch","error")}finally{u.disabled=!1}}}),s.querySelectorAll(".btn-delete-match").forEach(u=>{u.onclick=async i=>{i.stopPropagation();const o=u.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{u.disabled=!0,await Qe(`/bonding/matches/${o}`),$("Match deleted successfully","success"),await v()}catch(k){$(k.message||"Failed to delete match","error")}finally{u.disabled=!1}}});const l=s.querySelector("#btn-clear-matches");l&&(l.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{l.disabled=!0,await Qe("/bonding/matches?filter=completed"),$("Completed matches history cleared","success"),await v()}catch(u){$(u.message||"Failed to clear matches","error")}finally{l.disabled=!1}})}function N(l=null,u=null){const i=s.querySelector("#bonding-modals-root"),o=e?._id||e?.id,k=new Set(["employee","admin","superadmin"]),z=r.filter(ne=>!ne.isSelf&&ne._id.toString()!==o?.toString()&&k.has(ne.role));let C=l||"chess",V=u?u.toString():null,ie=2,H=V?[V]:[],B="none";function W(){const ne=z.find(Q=>Q._id.toString()===V),le=C==="ludo",ue=ie-1,fe=H.length===ue;i.innerHTML=`
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
                    <button class="ludo-mode-btn ${ie===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${ie===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${ie===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${le?`Step 3 — Select Colleagues to Play With (${H.length}/${ue} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${z.map(Q=>{const be=le?H.includes(Q._id.toString()):V===Q._id.toString();return`
                      <div class="eligible-emp-item ${be?"selected":""}" data-user-id="${Q._id}">
                        <div class="emp-item-avatar">${Q.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${y(Q.name)}</span>
                          <span class="emp-item-role">${y(Q.role==="superadmin"?"Superadmin":Q.role==="admin"?"Admin":"Employee")} · ${y(Q.email||"")}</span>
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
                    <label class="timer-radio-lbl ${B==="none"?"active":""}">
                      <input type="radio" name="timerMode" value="none" ${B==="none"?"checked":""} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${B==="3m"?"active":""}">
                      <input type="radio" name="timerMode" value="3m" ${B==="3m"?"checked":""} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${B==="5m"?"active":""}">
                      <input type="radio" name="timerMode" value="5m" ${B==="5m"?"checked":""} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              `:""}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${le?`🎲 Ludo (${ie} Players · 4 Pawns per base)`:C==="chess"?"♟️ Chess Duel":"❌ Tic-Tac-Toe Challenge"}</div>
                  ${le?`
                    <div><strong>Opponents:</strong> ${H.length>0?H.map(Q=>{const be=z.find(Ee=>Ee._id.toString()===Q);return be?`<strong>${y(be.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+ue+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${ne?`<strong>${y(ne.name)}</strong> (${y(ne.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${C==="chess"?`<div><strong>Time Control:</strong> ${B==="none"?"Untimed":B}</div>`:""}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(le?!fe:!V)?"disabled":""}>
                ${le?`Start ${ie}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,ae()}function ae(){i.querySelector(".bonding-modal-close").onclick=()=>{i.innerHTML=""},i.querySelector("#btn-cancel-challenge-flow").onclick=()=>{i.innerHTML=""},i.querySelectorAll(".game-pill-btn").forEach(ue=>{ue.onclick=()=>{C=ue.dataset.game,W()}}),i.querySelectorAll(".ludo-mode-btn").forEach(ue=>{ue.onclick=()=>{ie=Number(ue.dataset.count),H=H.slice(0,ie-1),W()}});const ne=i.querySelector("#flow-emp-search");ne&&(ne.oninput=ue=>{const fe=ue.target.value.toLowerCase().trim();i.querySelectorAll(".eligible-emp-item").forEach(Q=>{const be=Q.textContent.toLowerCase();Q.style.display=be.includes(fe)?"flex":"none"})}),i.querySelectorAll(".eligible-emp-item").forEach(ue=>{ue.onclick=()=>{const fe=ue.dataset.userId;if(C==="ludo"){const Q=ie-1;H.includes(fe)?H=H.filter(be=>be!==fe):H.length<Q?H.push(fe):H[Q-1]=fe}else V=fe;W()}}),i.querySelectorAll('input[name="timerMode"]').forEach(ue=>{ue.onchange=fe=>{B=fe.target.value,W()}});const le=i.querySelector("#btn-submit-challenge-flow");le&&(le.onclick=async()=>{if(C==="ludo"){const ue=ie-1;if(H.length<ue){$(`Please select ${ue} colleague(s) to play with`,"warning");return}try{le.disabled=!0,le.textContent="Launching Match...";const fe=await Se("/bonding/matches/instant-ludo",{playerCount:ie,targetUserIds:H});i.innerHTML="",$(`Ludo match started (${ie} Players)! 🎲`,"success"),fe&&fe._id&&L(fe._id)}catch(fe){$(fe.message||"Failed to start Ludo match","error"),le.disabled=!1,le.textContent=`Start ${ie}P Ludo Match 🎲`}return}if(!V){$("Please select an employee to challenge","warning");return}try{le.disabled=!0,le.textContent="Sending Challenge...",await Se("/bonding/invitations",{gameType:C,targetUserId:V,matchSettings:{timerMode:B},channelId:null}),$("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),i.innerHTML="",await loadChannels();const ue=g.find(fe=>fe.type==="direct"&&fe.members?.some(Q=>(Q.userId||Q._id)?.toString()===V));ue?selectChannel(ue):c&&await Pe(c._id),h==="lounge_games"&&await v()}catch(ue){$(ue.message||"Could not send challenge","error"),le.disabled=!1,le.textContent="Send Challenge 🚀"}})}W()}async function w(l,u){if(!(!l||!u))try{const i=await Qt(`/bonding/invitations/${l}/respond`,{action:u});u==="accept"?($("Challenge accepted! Entering match arena ⚔️","success"),i.match&&L(i.match._id)):u==="decline"?($("Challenge declined","info"),s.querySelectorAll(`[data-invite-id="${l}"]`).forEach(o=>{const k=o.closest(".lounge-invite-item")||o.closest(".bonding-msg-row");k&&k.remove()})):u==="cancel"&&($("Challenge cancelled","info"),s.querySelectorAll(`[data-invite-id="${l}"]`).forEach(o=>{const k=o.closest(".lounge-invite-item")||o.closest(".bonding-msg-row");k&&k.remove()})),c&&await Pe(c._id),h==="lounge_games"&&await v()}catch(i){$(i.message||"Action failed","error")}}async function L(l){if(!l)return;G=l,O&&clearInterval(O);const u=s.querySelector("#bonding-modals-root");let i=null,o=null,k=[],z="",C=null,V=!1,ie=!1;function H(Q){return Q?JSON.stringify({status:Q.status,turn:Q.currentTurnUserId?.toString(),turnColor:Q.turn,movesCount:Q.moves?.length,dice:Q.gameState?.dice,rolled:Q.gameState?.rolled,lastRoll:Q.gameState?.lastRoll,lastRollColor:Q.gameState?.lastRollColor,lastRollBy:Q.gameState?.lastRollBy,lastActionText:Q.gameState?.lastActionText,tokens:Q.gameState?.tokens,board:Q.gameState?.board,grid:Q.gameState?.grid,fen:Q.gameState?.fen,draw:Q.drawOfferedBy?.toString()}):""}async function B(){try{return i=await Re(`/bonding/matches/${l}`),i}catch(Q){return $(Q.message||"Could not load match","error"),W(),null}}if(i=await B(),!i)return;z=H(i);function W(){O&&clearInterval(O),C&&clearTimeout(C),V=!1,G=null,u.innerHTML="",h==="lounge_games"&&v(!0),c&&Pe(c._id,!0)}O=setInterval(async()=>{if(!G||G!==l){clearInterval(O);return}if(!ie)try{const Q=await Re(`/bonding/matches/${l}`);if(!Q)return;const be=H(Q);be!==z&&(z=be,i=Q,ae())}catch{}},1e3);function ae(){if(!i)return;const Q=e?._id||e?.id,be=Q&&i.player1.userId.toString()===Q.toString(),Ee=be?i.player1:i.player2,ce=be?i.player2:i.player1,xe=Q&&i.currentTurnUserId&&i.currentTurnUserId.toString()===Q.toString(),Ie=i.status!=="active";u.innerHTML=`
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
                      ${i.gameState.players.map(Oe=>{const ze=Oe.userId&&Oe.userId.toString()===Q?.toString(),He={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[Oe.color]||"⚪",pe=(i.gameState?.turnColor||i.turn)===Oe.color;return`
                          <span class="player-tag ${ze?"self":"opp"} ${pe?"turn-active":""}">
                            ${He} <strong>${y(Oe.name)}</strong> ${ze?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${y(Ee.name)} (You · <strong>${i.gameType==="ludo"?Ee.assignedRole==="red"?"🔴 Red":"🟢 Green":i.gameType==="tictactoe"?Ee.assignedRole==="X"?"✕":"◯":Ee.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${y(ce.name)} (<strong>${i.gameType==="ludo"?ce.assignedRole==="red"?"🔴 Red":"🟢 Green":i.gameType==="tictactoe"?ce.assignedRole==="X"?"✕":"◯":ce.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${Ie?"ended":xe?"my-turn":"opp-turn"}">
                ${Ie?`<span>🏁 Finished (${y(i.winningReason||i.status)})</span>`:xe?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${y(ce.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${i.gameType==="ludo"?xe?i.gameState?.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Click ROLL DICE to start your move.":"⏳ Opponent is rolling/moving their tokens...":i.gameType==="tictactoe"?xe?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":xe?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${Ie?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${i.drawOfferedBy&&i.drawOfferedBy.toString()!==Q?.toString()&&!Ie?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${y(ce.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${i.gameType==="chess"?ne(be):""}
              ${i.gameType==="tictactoe"?le():""}
              ${i.gameType==="ludo"?ue(be):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${Ie?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${i.winnerId&&i.winnerId.toString()===Q?.toString()?"🏆":i.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${i.winnerId&&i.winnerId.toString()===Q?.toString()?"VICTORY!":i.status==="draw"?"STALEMATE / DRAW":`${y(i.winnerName)} Wins!`}</h4>
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
      `,fe(xe,be,Ee)}function ne(Q){const be=i.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Ee=new ka(be),ce=Q?i.player1.assignedRole==="white":i.player2.assignedRole==="white",xe={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},Ie=ce?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Oe=ce?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let ze='<div class="chess-board-grid">';for(const Ae of Oe)for(const me of Ie){const Ce=`${me}${Ae}`,ke=Ee.get(Ce),De=(me.charCodeAt(0)-97+Ae)%2!==0,_e=o===Ce,he=k.includes(Ce),D=ke?ke.color==="w"?xe[ke.type.toUpperCase()]:xe[ke.type]:"";ze+=`
            <div class="chess-sq ${De?"light":"dark"} ${_e?"selected":""} ${he?"legal-dot":""}" data-square="${Ce}">
              ${D?`<span class="chess-piece ${ke.color==="w"?"white-piece":"black-piece"}">${D}</span>`:""}
            </div>
          `}ze+="</div>";const pe=(i.moves||[]).map(Ae=>`
        <span class="chess-move-token">${Ae.moveNum}. ${Ae.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${ze}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${pe||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function le(){const Q=i.gameState?.board||Array(9).fill(null),be=i.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${Q.map((Ee,ce)=>{const xe=be.includes(ce);return`
                <div class="ttt-cell ${Ee?"filled":"empty"} ${xe?"win-cell":""}" data-cell-idx="${ce}">
                  ${Ee==="X"?'<span class="ttt-x">✕</span>':Ee==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function ue(Q,be,Ee){const ce=i.gameState||{},xe=ce.activeColors||["red","green"],Ie=ce.players||[{...i.player1,color:"red",assignedRole:"red",isBot:!1},{...i.player2,color:"green",assignedRole:"green",isBot:!1}],Oe=ce.tokens||{},ze=P=>{const te=Oe[P]||(P==="red"?ce.p1Tokens:P==="green"?ce.p2Tokens:[])||[];return Array.from({length:4},(re,m)=>te[m]||{id:m,step:-1})},He=ze("red"),pe=ze("green"),Ae=ze("yellow"),me=ze("blue"),Ce=e?._id||e?.id,De=(Ie.find(P=>P.userId&&P.userId.toString()===Ce?.toString())||Ie[0])?.color||(Q?"red":"green"),_e=ce.turnColor||i.turn||"red",he=De===_e&&i.status==="active",D=!!ce.rolled,K=ce.dice,b=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],Te=[[7,1],[7,2],[7,3],[7,4],[7,5]],$e=[[1,7],[2,7],[3,7],[4,7],[5,7]],st=[[7,13],[7,12],[7,11],[7,10],[7,9]],J=[[13,7],[12,7],[11,7],[10,7],[9,7]],ht=[0,8,13,21,26,34,39,47];function Be(P,te){return te<0?null:te>=56?P==="red"?[7,6]:P==="green"?[6,7]:P==="yellow"?[7,8]:[8,7]:P==="red"?te<=50?b[te]:Te[te-51]:P==="green"?te<=50?b[(13+te)%52]:$e[te-51]:P==="yellow"?te<=50?b[(26+te)%52]:st[te-51]:te<=50?b[(39+te)%52]:J[te-51]}function Ze(P,te){return P!==De||!he||!D||!K||i.status!=="active"?!1:te.step===-1?K===6:te.step>=0&&te.step+K<=56}const At={},Ke=(P,te)=>{te.forEach(re=>{if(re.step>=0&&re.step<56){const m=Be(P,re.step);if(m){const S=m[0]+","+m[1];(At[S]=At[S]||[]).push({color:P,id:re.id,step:re.step,movable:Ze(P,re)})}}})};xe.includes("red")&&Ke("red",He),xe.includes("green")&&Ke("green",pe),xe.includes("yellow")&&Ke("yellow",Ae),xe.includes("blue")&&Ke("blue",me);const Dt={};b.forEach(([P,te],re)=>{Dt[P+","+te]=re});const Tt={};Te.forEach(([P,te],re)=>{Tt[P+","+te]=re+1});const ee={};$e.forEach(([P,te],re)=>{ee[P+","+te]=re+1});const Bt={};st.forEach(([P,te],re)=>{Bt[P+","+te]=re+1});const Et={};J.forEach(([P,te],re)=>{Et[P+","+te]=re+1});const Nt=[];for(let P=0;P<15;P++)for(let te=0;te<15;te++){if(P<6&&te<6||P<6&&te>8||P>8&&te<6||P>8&&te>8||P>=6&&P<=8&&te>=6&&te<=8)continue;const re=P+","+te,m=Dt[re],S=m!==void 0&&ht.includes(m),I=P===6&&te===1,Z=P===1&&te===8,X=P===8&&te===13,ve=P===13&&te===6,pt=Tt[re],It=ee[re],Sa=Bt[re],Ca=Et[re];let lt="ludo-cell";I?lt+=" cell-red-start":Z?lt+=" cell-green-start":X?lt+=" cell-yellow-start":ve?lt+=" cell-blue-start":pt?lt+=" cell-red-stretch":It?lt+=" cell-green-stretch":Sa?lt+=" cell-yellow-stretch":Ca?lt+=" cell-blue-stretch":S&&(lt+=" cell-safe-star");const Ia=At[re]||[];Nt.push(`
            <div class="${lt}" style="grid-row:${P+1};grid-column:${te+1}" data-pos="${re}">
              ${S?'<span class="cell-star-glyph">⭐</span>':""}
              ${I||Z||X||ve?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Ia.map(vt=>`
                <div class="ludo-token token-${vt.color} ${vt.movable?"movable":""}" data-token-id="${vt.id}" data-color="${vt.color}" title="${vt.color.toUpperCase()} Pawn ${vt.id+1}">
                  <span>${vt.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function jt(P){const te=Math.max(1,Math.min(6,Number(P)||1)),re={1:[[30,30,7.5,"#ef4444"]],2:[[16,16,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],3:[[16,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],4:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],5:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[30,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]],6:[[16,16,5.5,"#1e293b"],[44,16,5.5,"#1e293b"],[16,30,5.5,"#1e293b"],[44,30,5.5,"#1e293b"],[16,44,5.5,"#1e293b"],[44,44,5.5,"#1e293b"]]},S=(re[te]||re[6]).map(([I,Z,X,ve])=>`
          <g>
            <circle cx="${I}" cy="${Z+1.2}" r="${X}" fill="#94a3b8" opacity="0.5"/>
            <circle cx="${I}" cy="${Z}" r="${X}" fill="${ve}"/>
            <circle cx="${I-X*.3}" cy="${Z-X*.3}" r="${X*.35}" fill="#ffffff" opacity="0.6"/>
          </g>
        `).join("");return`
          <svg viewBox="0 0 60 60" width="52" height="52" class="ludo-dice-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dice face ${te}">
            <g class="die-pips-layer">
              ${S}
            </g>
          </svg>
        `}function St(P,te,re,m,S){const I=`${P}-yard`;if(!re)return`
            <div class="ludo-yard ${I}">
              <div class="yard-box decorative">
                <div class="yard-title">${te} (Inactive)</div>
              </div>
            </div>
          `;const Z=S.filter(X=>X.step===56).length;return`
          <div class="ludo-yard ${I} ${_e===P?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${te}</span>
                ${Z>0?`<span class="yard-home-badge" title="${Z} of 4 pawns reached Home!">👑 ${Z}/4 Home</span>`:""}
                ${m?`<small class="yard-player-lbl">${y(m.name)}${m.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${S.map((X,ve)=>`
                  <div class="yard-token-slot ${X.step===56?"slot-home":""}">
                    ${X.step===-1?`
                      <div class="ludo-token token-${P} ${Ze(P,X)?"movable":""}" data-token-id="${X.id}" data-color="${P}" title="${P.toUpperCase()} Pawn ${X.id+1}">
                        <span>${X.id+1}</span>
                      </div>
                    `:X.step===56?`
                      <div class="ludo-token token-reached-home token-${P}" title="${P.toUpperCase()} Pawn ${X.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${X.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${ve+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Ot=Ie.find(P=>P.color==="red"),Ut=Ie.find(P=>P.color==="green"),Ht=Ie.find(P=>P.color==="yellow"),Gt=Ie.find(P=>P.color==="blue"),Wt=Ie.find(P=>P.color===_e)||(_e==="red"?Ot:Ut),Ct=Wt?y(Wt.name):_e.toUpperCase(),Pt={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[_e]||"🔴",ct=K||ce.lastRoll||6,gt=he&&!D&&i.status==="active",Kt=ze(De).filter(P=>Ze(De,P));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${St("red","🔴 Red Base",xe.includes("red"),Ot,He)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${St("green","🟢 Green Base",xe.includes("green"),Ut,pe)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${St("blue","🔵 Blue Base",xe.includes("blue"),Gt,me)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${St("yellow","🟡 Yellow Base",xe.includes("yellow"),Ht,Ae)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${He.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn red" title="Red Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${pe.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn green" title="Green Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${Ae.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${me.filter(P=>P.step===56).map(P=>`<div class="home-tri-pawn blue" title="Blue Pawn ${P.id+1} Home! 👑">👑${P.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...He.filter(P=>P.step===56).map(P=>({col:"red",id:P.id})),...pe.filter(P=>P.step===56).map(P=>({col:"green",id:P.id})),...Ae.filter(P=>P.step===56).map(P=>({col:"yellow",id:P.id})),...me.filter(P=>P.step===56).map(P=>({col:"blue",id:P.id}))].map(P=>`
                    <div class="tok-home-champion ${P.col}" title="${P.col.toUpperCase()} Pawn ${P.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${P.id+1}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Nt.join("")}
          </div>

          <!-- Ludo Action & 3D Interactive Dice Console (Clickable dice replaces text button, opponent dice visible!) -->
          <div class="ludo-interactive-console">
            <div class="ludo-dice-interactive-box">
              <div 
                class="ludo-3d-dice ${gt?"clickable pulse-roll":""} ${D?"just-rolled":""} border-${_e}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${gt?"0":"-1"}"
                title="${gt?"Click Dice to Roll!":he?"Choose a pawn to move":`${Ct}'s turn`}"
              >
                ${jt(ct)}
              </div>
              <div class="ludo-dice-action-badge">
                ${gt?'<button class="badge-click-roll btn-dice-roll-badge" id="btn-interactive-ludo-dice-badge" type="button" title="Tap to Roll">🎲 TAP TO ROLL</button>':D?`<span class="badge-rolled-val">${Pt} Rolled ${ct}</span>`:ce.lastRoll?`<span class="badge-last-roll">${Pt} Rolled ${ce.lastRoll}</span>`:'<span class="badge-waiting">Ready</span>'}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${_e}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${Ct}</strong> (${_e.toUpperCase()})
                </span>
                ${he?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${he&&D?"highlight":""}">
                ${he&&!D&&i.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":he&&D&&i.status==="active"?Kt.length>0?Kt.length===1?`🎲 Rolled <strong>${ct}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${ct}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${ct}</strong>. No legal moves possible — turn passing...`:i.status==="active"?D||ce.lastRoll?`🎲 ${Pt} <strong>${Ct}</strong> rolled <strong>${ct}</strong>!`:`⏳ Waiting for <strong>${Ct}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${y(ce.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function fe(Q,be,Ee){u.querySelector("#btn-close-arena").onclick=W;const ce=u.querySelector("#btn-arena-resign");ce&&(ce.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{ce.disabled=!0,await Se(`/bonding/matches/${l}/action`,{action:"resign"}),await B(),ae()}catch(pe){$(pe.message||"Resign failed","error"),ce.disabled=!1}});const xe=u.querySelector("#btn-arena-draw");xe&&(xe.onclick=async()=>{try{await Se(`/bonding/matches/${l}/action`,{action:"offer_draw"}),$("Draw offer sent to opponent","info"),await B(),ae()}catch(pe){$(pe.message||"Draw offer failed","error")}});const Ie=u.querySelector("#btn-confirm-accept-draw");Ie&&(Ie.onclick=async()=>{try{await Se(`/bonding/matches/${l}/action`,{action:"accept_draw"}),$("Draw agreed!","info"),await B(),ae()}catch(pe){$(pe.message,"error")}});const Oe=u.querySelector("#btn-confirm-decline-draw");Oe&&(Oe.onclick=async()=>{try{await Se(`/bonding/matches/${l}/action`,{action:"decline_draw"}),await B(),ae()}catch(pe){$(pe.message,"error")}}),[u.querySelector("#btn-arena-delete-match"),u.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(pe=>{pe.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{pe.disabled=!0,await Qe(`/bonding/matches/${l}`),$("Match deleted","success"),W(),h==="lounge_games"&&await v()}catch(Ae){$(Ae.message||"Failed to delete match","error"),pe.disabled=!1}}});const He=u.querySelector("#btn-arena-rematch-action");if(He&&(He.onclick=async()=>{try{He.disabled=!0,He.textContent="Creating Rematch...";const pe=await Se(`/bonding/matches/${l}/action`,{action:"rematch"});pe.match&&($("Rematch created! New match live ⚔️","success"),O&&clearInterval(O),L(pe.match._id))}catch(pe){$(pe.message||"Rematch failed","error"),He.disabled=!1,He.textContent="🔄 Request Rematch"}}),i.gameType==="chess"&&Q&&i.status==="active"){const pe=i.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Ae=new ka(pe),me=Ee.assignedRole==="white"?"w":"b";u.querySelectorAll(".chess-sq").forEach(Ce=>{Ce.onclick=async()=>{const ke=Ce.dataset.square;if(o){if(o===ke){o=null,k=[],ae();return}if(k.includes(ke)){const _e=Ae.get(o);let he;_e&&_e.type==="p"&&(ke.endsWith("8")||ke.endsWith("1"))&&(he=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const D={from:o,to:ke,promotion:he?he.toLowerCase():void 0};o=null,k=[],i=await Se(`/bonding/matches/${l}/move`,{move:D}),ae()}catch(D){$(D.message||"Illegal chess move","error"),o=null,k=[],ae()}return}}const De=Ae.get(ke);De&&De.color===me?(o=ke,k=Ae.moves({square:ke,verbose:!0}).map(he=>he.to),ae()):(o=null,k=[],ae())}})}if(i.gameType==="tictactoe"&&Q&&i.status==="active"&&u.querySelectorAll(".ttt-cell.empty").forEach(pe=>{pe.onclick=async()=>{const Ae=pe.dataset.cellIdx;try{pe.style.opacity="0.5",i=await Se(`/bonding/matches/${l}/move`,{cellIndex:Number(Ae)}),ae()}catch(me){$(me.message||"Invalid move","error")}}}),i.gameType==="ludo"&&i.status==="active"){const pe=i.gameState||{},Ae=!!pe.rolled;pe.turnColor||i.turn;const me=u.querySelector("#btn-interactive-ludo-dice"),Ce=u.querySelector("#btn-interactive-ludo-dice-badge");if(canClickRoll){const ke=async()=>{if(ie||me&&me.dataset.rolling==="true")return;ie=!0,me&&(me.dataset.rolling="true",me.classList.remove("pulse-roll"),me.classList.add("rolling")),Ce&&(Ce.disabled=!0,Ce.innerHTML="🎲 ROLLING...",Ce.classList.add("is-rolling"));const De=setInterval(()=>{if(me){const he=Math.floor(Math.random()*6)+1;me.innerHTML=renderDiceSvg(he)}},60),_e=setTimeout(()=>{clearInterval(De),ie=!1,me&&(me.classList.remove("rolling"),delete me.dataset.rolling),Ce&&(Ce.disabled=!1,Ce.innerHTML="🎲 TAP TO ROLL",Ce.classList.remove("is-rolling"))},4e3);try{const he=Se(`/bonding/matches/${l}/move`,{action:"roll"}),D=new Promise(b=>setTimeout(b,550)),[K]=await Promise.all([he,D]);clearInterval(De),clearTimeout(_e),ie=!1,i=K,z=H(K),ae()}catch(he){clearInterval(De),clearTimeout(_e),ie=!1,$(he.message||"Failed to roll","error"),me&&(me.classList.remove("rolling"),delete me.dataset.rolling),Ce&&(Ce.disabled=!1,Ce.innerHTML="🎲 TAP TO ROLL",Ce.classList.remove("is-rolling"))}};me&&(me.onclick=ke,me.onkeydown=De=>{(De.key==="Enter"||De.key===" ")&&(De.preventDefault(),ke())}),Ce&&(Ce.onclick=ke)}if(isMyCurrentTurn&&Ae){const De=(pe.tokens||{})[myColor]||[],_e=pe.dice||pe.lastRoll||0,he=De.filter(D=>D.step===-1&&_e===6||D.step>=0&&D.step+_e<=56);if(he.length===1&&!V){V=!0;const D=he[0];C&&clearTimeout(C),C=setTimeout(async()=>{try{const K=await Se(`/bonding/matches/${l}/move`,{action:"move",tokenId:Number(D.id)});i=K,z=H(K),V=!1,ae()}catch(K){V=!1,$(K.message||"Auto-move failed","error")}},400)}}isMyCurrentTurn&&Ae&&u.querySelectorAll(".ludo-token.movable").forEach(ke=>{ke.onclick=async De=>{De.stopPropagation();const _e=ke.dataset.tokenId;try{ke.style.opacity="0.5";const he=await Se(`/bonding/matches/${l}/move`,{action:"move",tokenId:Number(_e)});i=he,z=H(he),ae()}catch(he){$(he.message||"Invalid token move","error"),ke.style.opacity="1"}}})}}ae()}function M(){if(!c||c.type==="direct")return;const l=s.querySelector("#bonding-modals-root"),u=H=>H==="employee"||H==="admin"||H==="superadmin",i=c.members||[],o=new Set(i.map(H=>H.userId?.toString())),k=r.filter(H=>u(H.role)&&!o.has(H._id.toString()));l.innerHTML=`
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
                  ${k.map(H=>`
                    <option value="${H._id}">${y(H.name)} (${y(H.role==="superadmin"?"Superadmin":H.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${k.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${k.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${i.length}):</label>
              <div class="bonding-members-list">
                ${i.map(H=>{const B=e?._id||e?.id,W=B&&H.userId&&H.userId.toString()===B.toString(),ae=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(B),ne=p==="superadmin"||e?.role==="superadmin",le=ae||ne;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(H.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${y(H.name)} ${W?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${y(H.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${W?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${H.userId}">
                            🚪 Leave Group
                          </button>
                        `:le?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${H.userId}" data-name="${y(H.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const H=e?._id||e?.id,B=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(H),W=p==="superadmin"||e?.role==="superadmin";return B||W?`
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
    `,l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""};const z=l.querySelector("#btn-modal-delete-group");z&&(z.onclick=()=>{l.innerHTML="",q()});const C=l.querySelector("#btn-modal-leave-group");C&&(C.onclick=()=>{l.innerHTML="",_()}),l.querySelectorAll(".btn-leave-group-action").forEach(H=>{H.onclick=()=>{l.innerHTML="",_()}});const V=l.querySelector("#btn-submit-add-member");V&&(V.onclick=async()=>{const B=l.querySelector("#sel-add-colleague").value;if(!B){$("Please select a colleague to add","warning");return}try{V.disabled=!0,V.textContent="Adding...";const W=await Qt(`/bonding/channels/${c._id}/members`,{action:"add",userIds:[B]});$("Colleague added to group! 🎉","success"),c=W.channel,l.innerHTML="",await Pe(c._id),Me()}catch(W){$(W.message||"Failed to add member","error"),V.disabled=!1,V.textContent="Add to Group"}}),l.querySelectorAll(".btn-remove-member").forEach(H=>{H.onclick=async()=>{const B=H.dataset.userId,W=H.dataset.name;if(confirm(`Are you sure you want to remove ${W} from this group?`))try{H.disabled=!0;const ae=await Qt(`/bonding/channels/${c._id}/members`,{action:"remove",userId:B});$(`${W} removed from group`,"info"),c=ae.channel,l.innerHTML="",await Pe(c._id),Me()}catch(ae){$(ae.message||"Failed to remove member","error"),H.disabled=!1}}})}async function _(){if(!c||c.type==="direct")return;const l=c.name;if(confirm(`Are you sure you want to leave the group "${l}"?`))try{await Se(`/bonding/channels/${c._id}/leave`,{}),$(`You left "${l}"`,"info"),g=await Re("/bonding/channels").catch(()=>[]),c=g.find(i=>i.type==="group")||g[0]||null,Le(),Me(),c&&await Pe(c._id)}catch(i){$(i.message||"Failed to leave group","error")}}async function q(){if(!c||c.type==="direct")return;const l=c.name;if(confirm(`Are you sure you want to delete the group "${l}"?

All messages in this lounge will be deleted.`))try{await Qe(`/bonding/channels/${c._id}`),$(`Group "${l}" deleted successfully`,"success"),g=await Re("/bonding/channels").catch(()=>[]),c=g.find(i=>i.type==="group")||g[0]||null,Le(),Me(),c&&await Pe(c._id)}catch(i){$(i.message||"Failed to delete group","error")}}function x(){const l=s.querySelector("#bonding-modals-root"),u=k=>k==="employee"||k==="admin"||k==="superadmin",i=r.filter(k=>!k.isSelf&&u(k.role));l.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${i.map(k=>`
                <div class="bonding-user-pick-item" data-user-id="${k._id}" data-name="${y(k.name)}">
                  <div class="bonding-member-avatar">${k.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${y(k.name)}</span>
                    <span class="user-pick-role">${y(k.role==="superadmin"?"Superadmin":k.role==="admin"?"Admin":"Employee")} · ${y(k.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelectorAll(".bonding-user-pick-item").forEach(k=>{k.onclick=async()=>{const z=k.dataset.userId;try{const C=await Se("/bonding/channels",{type:"direct",targetUserId:z});l.innerHTML="",g=await Re("/bonding/channels"),c=g.find(V=>V._id===C._id)||C,Le(),Me(),await Pe(c._id)}catch(C){$(C.message||"Failed to open personal chat","error")}}})}function U(){const l=s.querySelector("#bonding-modals-root"),u=C=>C==="employee"||C==="admin"||C==="superadmin",i=r.filter(C=>!C.isSelf&&u(C.role));l.innerHTML=`
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
    `,l.querySelector(".bonding-modal-close").onclick=()=>{l.innerHTML=""},l.querySelector("#btn-cancel-create-grp").onclick=()=>{l.innerHTML=""};let o="👥";const k=l.querySelectorAll(".avatar-opt");k.forEach(C=>{C.onclick=()=>{k.forEach(V=>V.classList.remove("active")),C.classList.add("active"),o=C.textContent.trim()}});const z=l.querySelector("#btn-confirm-create-grp");z.onclick=async()=>{const C=l.querySelector("#new-group-name"),V=l.querySelector("#new-group-desc"),ie=C.value.trim();if(!ie){$("Please enter a group name","warning"),C.focus();return}const H=l.querySelectorAll(".new-group-member-chk:checked"),B=Array.from(H).map(W=>W.value);try{z.disabled=!0,z.textContent="Creating...";const W=await Se("/bonding/channels",{type:"group",name:ie,description:V.value.trim(),avatar:o,memberIds:B});$(`Group "${ie}" created! 🎉`,"success"),l.innerHTML="",g=await Re("/bonding/channels"),c=g.find(ae=>ae._id===W._id)||W,Le(),Me(),await Pe(c._id)}catch(W){$(W.message||"Failed to create group","error"),z.disabled=!1,z.textContent="Create Group 🎉"}}}function F(l,u){const i=document.querySelector(".bonding-emoji-popup");i&&i.remove();const o=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],k=document.createElement("div");k.className="bonding-emoji-popup",k.innerHTML=o.map(V=>`<button class="emoji-opt-btn" data-e="${V}">${V}</button>`).join("");const z=l.getBoundingClientRect();k.style.top=`${z.bottom+window.scrollY+6}px`,k.style.left=`${z.left+window.scrollX}px`,document.body.appendChild(k),k.querySelectorAll(".emoji-opt-btn").forEach(V=>{V.onclick=ie=>{ie.stopPropagation(),u(V.dataset.e),k.remove()}});const C=V=>{k.contains(V.target)||(k.remove(),document.removeEventListener("click",C))};setTimeout(()=>document.addEventListener("click",C),10)}function j(l){if(!l)return"";try{return new Date(l).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function ei(){const s=document.getElementById("ci360-bonding-styles");s&&s.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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
      animation: diceRollTumble 0.45s cubic-bezier(0.4, 0, 0.2, 1) infinite !important;
      transform-origin: center center !important;
      pointer-events: none !important;
    }

    @keyframes diceRollTumble {
      0% { transform: scale(0.9) rotate(0deg); }
      25% { transform: scale(1.15) rotate(90deg); }
      50% { transform: scale(0.92) rotate(180deg); }
      75% { transform: scale(1.12) rotate(270deg); }
      100% { transform: scale(1) rotate(360deg); }
    }

    .ludo-3d-dice.just-rolled {
      animation: dicePopBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
      transform-origin: center center !important;
    }

    @keyframes dicePopBounce {
      0% { transform: scale(0.85); }
      50% { transform: scale(1.22); }
      100% { transform: scale(1); }
    }

    .btn-dice-roll-badge.is-rolling {
      opacity: 0.85 !important;
      cursor: wait !important;
      pointer-events: none !important;
      animation: badgeRollSpin 0.7s infinite linear !important;
    }

    @keyframes badgeRollSpin {
      0% { opacity: 0.7; transform: scale(0.98); }
      50% { opacity: 1; transform: scale(1.02); }
      100% { opacity: 0.7; transform: scale(0.98); }
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
  `,document.head.appendChild(t)}function wa(s){if(!s)return"";const t=y(s),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return t.replace(e,p=>`<a href="${p}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${p} ↗</a>`)}const da=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],kt=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],qt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function ni(s,t={}){const{userRole:e="employee",currentUser:p=null,initialTicketId:h=null}=t,g=e==="superadmin"||e==="admin";if(e==="client"||p&&p.role==="client"){s.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let c=[],r={},R=[],Y=[],A={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},E=null,G="comments",O=!1;s.innerHTML=`
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
            ${kt.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
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
  `,await Promise.all([Xe(),We(),ot(),$t()]),tt(),at(),Pe(),Me(),h&&it(h);const ge=setInterval(()=>{if(!document.contains(s)){clearInterval(ge);return}!(s.querySelector(".dragging")||s.querySelector("input:focus")||s.querySelector("textarea:focus"))&&!E&&de()},12e3),we=()=>{document.contains(s)&&!E&&de()};window.addEventListener("focus",we);async function We(){try{const a=new URLSearchParams;A.search&&a.set("search",A.search),A.priority!=="all"&&a.set("priority",A.priority),A.category!=="all"&&a.set("category",A.category),A.assigneeId!=="all"&&a.set("assigneeId",A.assigneeId),A.jobId&&A.jobId!=="all"&&a.set("jobId",A.jobId),A.reporterId&&A.reporterId!=="all"&&a.set("reporterId",A.reporterId),A.scope==="created"&&a.set("reporterId",p?._id||p?.id),A.scope==="assigned"&&a.set("assigneeId",p?._id||p?.id),A.myIssuesOnly&&a.set("myIssuesOnly","true");const n=await Re("/tickets?"+a.toString());c=Array.isArray(n)?n:[]}catch(a){$(a.message||"Failed to load tickets",!0),c=[]}}async function Xe(){try{r=await Re("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function ot(){try{let a;try{a=await Re("/tickets/staff")}catch{a=await Re("/users")}R=(a||[]).filter(n=>n.active!==!1&&n.role!=="client")}catch(a){console.warn("Could not fetch employees:",a),R=[]}}async function $t(){try{const a=await Re("/jobs?limit=250");Y=Array.isArray(a)?a:a?.jobs||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function tt(){const a=s.querySelector("#ci-360-stats-root");a&&(a.innerHTML=`
      <div class="ci-360-stat-card ${A.status==="all"&&!A.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="ci-360-stat-val">${r.total||0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${A.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${r.toDo||0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${A.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${r.content??(r.inProgress||0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${A.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${r.design||0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${A.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${r.underReview||0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${A.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
        <span class="ci-360-stat-val">${r.readyToLeave??(r.resolved||r.closed||0)}</span>
        <span class="ci-360-stat-lbl">Ready to Leave</span>
      </div>
      <div class="ci-360-stat-card critical" data-stat-filter="critical">
        <span class="ci-360-stat-val">${r.critical||0}</span>
        <span class="ci-360-stat-lbl">Critical 🔴</span>
      </div>
      <div class="ci-360-stat-card overdue" data-stat-filter="overdue">
        <span class="ci-360-stat-val">${r.overdue||0}</span>
        <span class="ci-360-stat-lbl">Overdue ⚠️</span>
      </div>
    `,a.querySelectorAll(".ci-360-stat-card").forEach(n=>{n.onclick=async()=>{const f=n.dataset.statFilter;f==="all"?(A.status="all",A.priority="all"):f==="critical"?(A.priority="Critical",A.status="all"):(A.status=f,A.priority="all"),await de()}}))}function Pe(){const a=s.querySelector("#ci-360-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${R.map(f=>`
          <option value="${f._id}" ${A.assigneeId===f._id.toString()?"selected":""}>
            ${y(f.name)} (${y(f.role)})
          </option>
        `).join("")}
      `);const n=s.querySelector("#ci-360-filter-job");n&&(n.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${Y.map(f=>`
          <option value="${f._id}" ${A.jobId===f._id.toString()?"selected":""}>
            📁 ${y(f.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function at(){const a=s.querySelector("#ci-360-board-columns-root");if(!a)return;const n={};da.forEach(f=>{n[f.key]=[]}),c.forEach(f=>{let v=f.status||"To Do";v==="In Progress"?v="Content":v==="Resolved"?v="Under Review":v==="Closed"&&(v="Ready to Leave"),n[v]||(n[v]=[]),n[v].push(f)}),a.innerHTML=da.map(f=>{const v=n[f.key]||[];return`
        <div class="ci-360-board-column" data-status="${f.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${y(f.label)}</span>
              <span class="ci-360-col-badge">${v.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${f.key}">
            ${v.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:v.map(T=>ut(T)).join("")}
          </div>
        </div>
      `}).join(""),Le(),dt()}function ut(a){const n=kt.find(U=>U.key===a.category)||kt[0],f=qt.find(U=>U.key===a.priority)||qt[2],v=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",T=(a.subtasks||[]).filter(U=>U.completed).length,N=(a.subtasks||[]).length,w=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],L=p?._id||p?.id,M=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(L)||a.userId&&String(a.userId)===String(L),_=e==="superadmin"||p?.role==="superadmin",q=M||_;let x="";if(w.length===0)x='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const U=w.slice(0,3),F=w.length-3;x=`
        <div class="ci-360-avatar-group">
          ${U.map(j=>`
            <div class="ci-360-avatar" title="Assignee: ${y(j.name||"Member")} (${y(j.role||"")})">
              ${(j.avatar||j.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${F>0?`
            <div class="ci-360-avatar extra-count" title="${F} more assignees: ${y(w.slice(3).map(j=>j.name).join(", "))}">
              +${F}
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
          ${q?`
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
            <span class="ci-360-pri-icon" title="Priority: ${f.label}">${f.icon}</span>
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
    `}function Le(){const a=s.querySelectorAll(".ci-360-card"),n=s.querySelectorAll(".ci-360-board-column");a.forEach(f=>{f.ondragstart=v=>{v.dataTransfer.setData("text/plain",f.dataset.ticketId),f.classList.add("dragging")},f.ondragend=()=>{f.classList.remove("dragging")}}),n.forEach(f=>{f.ondragover=v=>{v.preventDefault(),f.classList.add("drag-over")},f.ondragleave=()=>{f.classList.remove("drag-over")},f.ondrop=async v=>{v.preventDefault(),f.classList.remove("drag-over");const T=v.dataTransfer.getData("text/plain"),N=f.dataset.status;if(!T||!N)return;const w=c.find(q=>q._id.toString()===T);if(!w||w.status===N)return;const L=w.status,M=w.assignees?[...w.assignees]:[],_=w.assignee?{...w.assignee}:null;if(w.status=N,N==="Under Review"){const q={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};w.assignee=q,w.assignees=[q]}at();try{const q=await Je(`/tickets/${T}/status`,{status:N}),x=N==="Under Review"?`Moved ${q.ticketId} to Under Review (Default assigned to John)`:`Moved ${q.ticketId} to ${N}`;$(x,!1),await de()}catch(q){$(q.message||"Status update failed",!0),w.status=L,w.assignees=M,w.assignee=_,await de()}}})}function dt(){s.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async n=>{n.stopPropagation(),n.preventDefault();const f=a.dataset.ticketId,v=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${v}?`)){a.disabled=!0;try{await Qe(`/tickets/${f}`),$(`Ticket ${v} deleted`,!1),await de()}catch(T){$(T.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),s.querySelectorAll(".ci-360-card").forEach(a=>{a.onclick=n=>{if(n.target.tagName==="A"||n.target.closest(".btn-delete-card-ticket"))return;const f=a.dataset.ticketId;it(f)}})}function Me(){const a=s.querySelector("#btn-ci-360-refresh");a&&(a.onclick=async()=>{await de(),$("Board updated",!1)});const n=s.querySelector("#btn-ci-360-create-ticket");n&&(n.onclick=()=>{d()});const f=s.querySelector("#ci-360-search-input");let v=null;f&&(f.oninput=j=>{clearTimeout(v),v=setTimeout(async()=>{A.search=j.target.value.trim(),qe(),await de()},300)});const T=s.querySelector("#ci-360-filter-priority");T&&(T.onchange=async j=>{A.priority=j.target.value,qe(),await de()});const N=s.querySelector("#ci-360-filter-category");N&&(N.onchange=async j=>{A.category=j.target.value,qe(),await de()});const w=s.querySelector("#ci-360-filter-job");w&&(w.onchange=async j=>{A.jobId=j.target.value,qe(),await de()});const L=s.querySelector("#ci-360-filter-assignee");L&&(L.onchange=async j=>{A.assigneeId=j.target.value,qe(),await de()});const M=s.querySelector("#ci-360-pill-my-issues");M&&(M.onclick=async()=>{A.myIssuesOnly=!A.myIssuesOnly,M.classList.toggle("active",A.myIssuesOnly),qe(),await de()});const _=s.querySelector("#ci-360-pill-scope-all"),q=s.querySelector("#ci-360-pill-scope-assigned"),x=s.querySelector("#ci-360-pill-scope-created"),U=async j=>{A.scope=j,_&&_.classList.toggle("active",j==="all"),q&&q.classList.toggle("active",j==="assigned"),x&&x.classList.toggle("active",j==="created"),qe(),await de()};_&&(_.onclick=()=>U("all")),q&&(q.onclick=()=>U("assigned")),x&&(x.onclick=()=>U("created"));const F=s.querySelector("#ci-360-clear-filters");F&&(F.onclick=async()=>{A={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},f&&(f.value=""),T&&(T.value="all"),N&&(N.value="all");const j=s.querySelector("#ci-360-filter-job");j&&(j.value="all"),L&&(L.value="all"),M&&M.classList.remove("active"),_&&_.classList.add("active"),q&&q.classList.remove("active"),x&&x.classList.remove("active"),qe(),await de()})}function qe(){const a=s.querySelector("#ci-360-clear-filters");if(!a)return;const n=A.search||A.priority!=="all"||A.category!=="all"||A.jobId&&A.jobId!=="all"||A.assigneeId!=="all"||A.myIssuesOnly||A.scope&&A.scope!=="all";a.style.display=n?"inline":"none"}async function de(){await We(),at()}async function it(a){const n=s.querySelector("#ci-360-modals-root");if(n){n.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{E=await Re(`/tickets/${a}`)}catch(f){$(f.message||"Could not load ticket",!0),n.innerHTML="";return}ye()}}function ye(){const a=s.querySelector("#ci-360-modals-root");if(!a||!E)return;const n=E,f=kt.find(o=>o.key===n.category)||kt[0];qt.find(o=>o.key===n.priority)||qt[2];const v=n.subtasks||[],T=v.filter(o=>o.completed).length,N=v.length>0?Math.round(T/v.length*100):0,w=n.attachments||[],L=n.comments||[],M=(n.history||[]).slice().reverse(),_=n.workLogs||[],q=n.linkedTickets||[],x=p?._id||p?.id,U=n.reporter&&n.reporter.userId&&String(n.reporter.userId)===String(x)||n.userId&&String(n.userId)===String(x),F=e==="superadmin"||p?.role==="superadmin",j=U||F,l=Array.isArray(n.assignees)&&n.assignees.length>0?n.assignees:n.assignee&&n.assignee.userId?[n.assignee]:[];l.some(o=>o&&o.userId&&String(o.userId)===String(x));const u=n.jobId?._id?n.jobId._id.toString():n.jobId?n.jobId.toString():"",i=n.jobTitle||n.jobId&&n.jobId.title||"";a.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${f.slug}">${f.icon} ${f.label}</span>
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
                    ${O?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${O?`
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
                  <span>🔗 Reference &amp; External Links (${(n.links||[]).length+(n.linkUrl&&!(n.links||[]).some(o=>o.url===n.linkUrl)?1:0)})</span>
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
                    ${n.linkUrl&&!(n.links||[]).some(o=>o.url===n.linkUrl)?`
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
                    ${(n.links||[]).map(o=>`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${y(o.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${y(o.title||o.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${o.title?`<span style="word-break:break-all;">${y(o.url)}</span> · `:""}Added by ${y(o.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${y(o.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${y(o.url)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
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
                  <span>Attachments (${w.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${w.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${w.map(o=>{const k=o.type&&o.type.includes("video")||o.name&&o.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||o.url&&o.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="ci-360-att-card ${k?"is-video":""}" style="${k?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${k?"16px":"13px"};">${k?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${o.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${y(o.name)}">
                                  ${y(o.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${ga(o.size)} ${k?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${k?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${o.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${o.url}" download="${y(o.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${o.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${k?`
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
                  <span>Subtasks (${T}/${v.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${N}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${N}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${v.map(o=>`
                    <div class="ci-360-subtask-item">
                      <div class="ci-360-subtask-left">
                        <input type="checkbox" class="ci-360-subtask-cb cb-subtask-toggle" data-subtask-id="${o.id}" ${o.completed?"checked":""} />
                        <span class="ci-360-subtask-title ${o.completed?"done":""}">${y(o.title)}</span>
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
                  <span>Linked Work Items (${q.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${q.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${q.map(o=>`
                      <div class="ci-360-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${y(o.relationship)}</span>
                          <span class="ci-360-ticket-id" style="color:#38bdf8;">${y(o.ticketId)}</span>
                          <span class="ci-360-linked-title" style="font-size:12.5px;">${y(o.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="ci-360-col-badge">${y(o.status||"Open")}</span>
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
                      ${Y.map(o=>`
                        <option value="${o._id}" ${u===o._id.toString()?"selected":""}>
                          📁 ${y(o.title||"Untitled Job")}
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
                  <button type="button" class="ci-360-act-tab ${G==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${L.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${G==="history"?"active":""}" data-act-tab="history">
                    History (${M.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${G==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${_.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${G==="comments"?`
                  <div class="ci-360-comments-feed">
                    ${L.map(o=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(o.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${y(o.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${y(o.userRole)})</span></span>
                            <span class="ci-360-comment-time">${ta(o.createdAt)}</span>
                          </div>
                          <div class="ci-360-comment-body">${wa(o.content)}</div>
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
                ${G==="history"?`
                  <div class="ci-360-history-feed">
                    ${M.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:M.map(o=>`
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(o.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${y(o.userName)}</span>
                            <span class="ci-360-comment-time">${ta(o.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="ci-360-history-field">${y(o.field)}</strong>:
                            ${o.from?`<span style="text-decoration:line-through;color:#ef4444;">${y(o.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${y(o.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${G==="worklog"?`
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
                    `:_.map(o=>`
                      <div class="ci-360-worklog-item">
                        <div class="ci-360-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(o.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-worklog-main">
                          <div class="ci-360-worklog-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${y(o.userName)} logged <strong style="color:#38bdf8;">${y(o.timeSpent)}</strong></span>
                            <span class="ci-360-comment-time">${ta(o.loggedAt)}</span>
                          </div>
                          ${o.description?`<div class="ci-360-comment-body" style="font-size:12px;">${y(o.description)}</div>`:""}
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
                  ${da.map(o=>{let k=n.status||"To Do";return k==="In Progress"?k="Content":k==="Resolved"?k="Under Review":k==="Closed"&&(k="Ready to Leave"),`
                      <option value="${o.key}" ${k===o.key?"selected":""}>
                        ${o.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="ci-360-select-field">
                  ${qt.map(o=>`
                    <option value="${o.key}" ${n.priority===o.key?"selected":""}>
                      ${o.icon} ${o.label}
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
                  `:l.map(o=>`
                    <div class="ci-360-assignee-chip">
                      <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(o.avatar||o.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="ci-360-assignee-chip-name" title="${y(o.name)}">${y(o.name)}</span>
                      ${`
                        <button type="button" class="ci-360-assignee-chip-remove btn-remove-assignee" data-user-id="${o.userId}" title="Remove ${y(o.name)}">&times;</button>
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
                    ${R.map(o=>{const k=l.some(z=>z&&z.userId&&String(z.userId)===String(o._id));return`
                        <label class="ci-360-emp-check-item ${k?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${o._id}" ${k?"checked":""} />
                          <div class="ci-360-avatar" style="width:18px;height:18px;font-size:9px;">${(o.name||"U").slice(0,1).toUpperCase()}</div>
                          <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                            ${y(o.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${y(o.role)})</span>
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
                  ${kt.map(o=>`
                    <option value="${o.key}" ${n.category===o.key?"selected":""}>
                      ${o.icon} ${o.label}
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
                  ${Y.map(o=>`
                    <option value="${o._id}" ${u===o._id.toString()?"selected":""}>
                      📁 ${y(o.title||"Untitled Job")}
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
              ${j?`
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
    `,rt()}function rt(){const a=s.querySelector("#ci-360-modals-root");if(!a||!E)return;const n=a.querySelector("#btn-close-ci-360-modal");n&&(n.onclick=nt);const f=a.querySelector("#ci-360-detail-backdrop");f&&(f.onclick=D=>{D.target===f&&nt()});const v=a.querySelector("#inp-detail-title");v&&(v.onchange=async()=>{const D=v.value.trim();if(D)try{E=await Je(`/tickets/${E._id}`,{title:D}),await de()}catch(K){$(K.message||"Failed to update title",!0)}});const T=a.querySelector("#btn-toggle-desc-edit");T&&(T.onclick=()=>{O=!O,ye()});const N=a.querySelector("#btn-cancel-desc");N&&(N.onclick=()=>{O=!1,ye()});const w=a.querySelector("#btn-save-desc");w&&(w.onclick=async()=>{const D=a.querySelector("#inp-detail-desc")?.value;try{E=await Je(`/tickets/${E._id}`,{description:D}),O=!1,ye(),await de(),$("Description saved",!1)}catch(K){$(K.message||"Failed to save description",!0)}});const L=a.querySelector("#sel-detail-status");L&&(L.onchange=async D=>{try{const K=await Je(`/tickets/${E._id}/status`,{status:D.target.value});E=K,ye(),await Xe(),tt(),await de();const b=K.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${K.status}`;$(b,!1)}catch(K){$(K.message||"Status change failed",!0)}});const M=a.querySelector("#sel-detail-priority");M&&(M.onchange=async D=>{try{E=await Je(`/tickets/${E._id}`,{priority:D.target.value}),ye(),await de()}catch(K){$(K.message,!0)}});const _=a.querySelector("#btn-toggle-assignee-picker"),q=a.querySelector("#ci-360-detail-assignee-box"),x=a.querySelector("#btn-close-detail-assignee-box"),U=a.querySelector("#btn-save-detail-assignees");_&&q&&(_.onclick=()=>{const D=q.style.display==="none";q.style.display=D?"block":"none"}),x&&q&&(x.onclick=()=>{q.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(D=>{D.onchange=()=>{D.closest(".ci-360-emp-check-item")?.classList.toggle("selected",D.checked)}}),U&&(U.onclick=async()=>{const D=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(K=>K.value);try{U.disabled=!0,E=await Je(`/tickets/${E._id}`,{assigneeIds:D}),ye(),await de(),$("Assignees updated!",!1)}catch(K){$(K.message,!0),U.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(D=>{D.onclick=async()=>{const K=D.dataset.userId,Te=(Array.isArray(E.assignees)&&E.assignees.length>0?E.assignees:E.assignee?.userId?[E.assignee]:[]).filter($e=>$e&&$e.userId&&String($e.userId)!==String(K)).map($e=>String($e.userId));try{E=await Je(`/tickets/${E._id}`,{assigneeIds:Te}),ye(),await de(),$("Assignee removed",!1)}catch($e){$($e.message,!0)}}});const F=a.querySelector("#sel-detail-category");F&&(F.onchange=async D=>{try{E=await Je(`/tickets/${E._id}`,{category:D.target.value}),ye(),await de()}catch(K){$(K.message,!0)}});const j=a.querySelector("#inp-detail-duedate");j&&(j.onchange=async D=>{try{E=await Je(`/tickets/${E._id}`,{dueDate:D.target.value||null}),ye(),await de()}catch(K){$(K.message,!0)}});const l=a.querySelector("#sel-detail-job");l&&(l.onchange=async D=>{try{E=await Je(`/tickets/${E._id}`,{jobId:D.target.value||null}),ye(),await de(),$(D.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(K){$(K.message,!0)}});const u=a.querySelector("#btn-toggle-job-link"),i=a.querySelector("#ci-360-job-link-box");u&&i&&(u.onclick=()=>{i.style.display=i.style.display==="none"?"block":"none"});const o=a.querySelector("#btn-cancel-job-link");o&&i&&(o.onclick=()=>{i.style.display="none"});const k=a.querySelector("#btn-save-job-link");k&&(k.onclick=async()=>{const D=a.querySelector("#inp-modal-job-select")?.value||null;try{E=await Je(`/tickets/${E._id}`,{jobId:D}),ye(),await de(),$(D?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(K){$(K.message,!0)}});const z=a.querySelector("#btn-unlink-job");z&&(z.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{E=await Je(`/tickets/${E._id}`,{jobId:null}),ye(),await de(),$("Job unlinked",!1)}catch(D){$(D.message,!0)}});const C=a.querySelector("#inp-detail-esthours");C&&(C.onchange=async D=>{try{E=await Je(`/tickets/${E._id}`,{estimatedHours:Number(D.target.value)||0})}catch(K){$(K.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(D=>{D.onchange=async()=>{const K=D.dataset.subtaskId;try{E=await Je(`/tickets/${E._id}/subtasks/${K}`,{completed:D.checked}),ye(),await de()}catch(b){$(b.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(D=>{D.onclick=async()=>{const K=D.dataset.subtaskId;try{E=await Qe(`/tickets/${E._id}/subtasks/${K}`),ye(),await de()}catch(b){$(b.message,!0)}}});const V=a.querySelector("#inp-new-subtask"),ie=a.querySelector("#btn-add-subtask"),H=async()=>{const D=V?.value.trim();if(D)try{E=await Se(`/tickets/${E._id}/subtasks`,{title:D}),ye(),await de()}catch(K){$(K.message,!0)}};ie&&(ie.onclick=H),V&&(V.onkeydown=D=>{D.key==="Enter"&&(D.preventDefault(),H())});const B=a.querySelector("#btn-toggle-add-link"),W=a.querySelector("#add-link-form"),ae=a.querySelector("#btn-cancel-new-link"),ne=a.querySelector("#btn-save-new-link"),le=a.querySelector("#inp-new-link-url"),ue=a.querySelector("#inp-new-link-title");B&&W&&(B.onclick=()=>{const D=W.style.display==="none";W.style.display=D?"block":"none",D&&le&&le.focus()}),ae&&W&&(ae.onclick=()=>{W.style.display="none",le&&(le.value=""),ue&&(ue.value="")}),ne&&le&&(ne.onclick=async()=>{const D=le.value.trim(),K=ue?.value.trim()||"";if(!D){$("Please enter a valid URL link",!0);return}try{ne.disabled=!0,ne.textContent="Saving...",E=await Se(`/tickets/${E._id}/links`,{url:D,title:K}),ye(),await de(),$("Reference link added! 🔗",!1)}catch(b){$(b.message||"Failed to save link",!0),ne.disabled=!1,ne.textContent="Save Link 🔗"}}),a.querySelectorAll(".btn-copy-link").forEach(D=>{D.onclick=()=>{const K=D.dataset.url;K&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(K).then(()=>{$("Link copied to clipboard! 📋")}).catch(()=>{$("Link: "+K)}):$("Link: "+K))}}),a.querySelectorAll(".btn-del-link").forEach(D=>{D.onclick=async()=>{const K=D.dataset.linkId;try{E=await Qe(`/tickets/${E._id}/links/${K}`),ye(),await de(),$("Link removed")}catch(b){$(b.message||"Failed to remove link",!0)}}});const fe=a.querySelector("#btn-trigger-detail-upload"),Q=a.querySelector("#inp-detail-att-upload"),be=a.querySelector("#detail-att-upload-progress");fe&&Q&&(fe.onclick=D=>{D.preventDefault(),Q.click()}),Q&&(Q.onchange=async()=>{const D=Array.from(Q.files||[]);if(Q.value="",!!D.length){be&&(be.style.display="block",be.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${D.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const b=(await ba(D,Te=>{const $e=a.querySelector("#att-prog-pct"),st=a.querySelector("#att-prog-bar");$e&&($e.textContent=`${Te}%`),st&&(st.style.width=`${Te}%`)})).map(Te=>({name:Te.name,url:Te.url,size:Te.size||0,type:Te.type||"application/octet-stream"}));b.length&&(E=await Se(`/tickets/${E._id}/attachments`,{attachments:b}),ye(),$(`Successfully attached ${b.length} file(s)! 📎`,!1))}catch(K){console.error("Upload error:",K),$(`Upload failed: ${K.message}`,!0)}finally{be&&(be.style.display="none")}}}),a.querySelectorAll(".btn-play-att-video").forEach(D=>{D.onclick=()=>{const K=D.dataset.slot,b=a.querySelector("#"+K);if(b){const Te=b.style.display==="none";b.style.display=Te?"block":"none",D.textContent=Te?"⏸ Close Video":"▶ Play Video";const $e=b.querySelector("video");$e&&Te?$e.play().catch(()=>{}):$e&&$e.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(D=>{D.onclick=async()=>{const K=D.dataset.attId;try{E=await Qe(`/tickets/${E._id}/attachments/${K}`),ye()}catch(b){$(b.message,!0)}}}),a.querySelectorAll(".ci-360-act-tab").forEach(D=>{D.onclick=()=>{G=D.dataset.actTab,ye()}});const Ee=a.querySelector("#inp-new-comment"),ce=a.querySelector("#btn-submit-comment");ce&&Ee&&(ce.onclick=async()=>{const D=Ee.value.trim();if(D)try{ce.disabled=!0,ce.textContent="Saving...",E=await Se(`/tickets/${E._id}/comments`,{content:D}),ye(),$("Comment added",!1)}catch(K){$(K.message||"Failed to add comment",!0)}finally{ce.disabled=!1}});const xe=a.querySelector("#btn-open-link-dialog"),Ie=a.querySelector("#ci-360-link-box"),Oe=a.querySelector("#btn-cancel-link"),ze=a.querySelector("#btn-submit-link"),He=a.querySelector("#inp-link-target"),pe=a.querySelector("#sel-link-rel");xe&&Ie&&(xe.onclick=()=>{Ie.style.display="block"}),Oe&&Ie&&(Oe.onclick=()=>{Ie.style.display="none"}),ze&&Ie&&(ze.onclick=async()=>{const D=He?.value.trim(),K=pe?.value||"relates to";if(D)try{ze.disabled=!0,E=await Se(`/tickets/${E._id}/links`,{targetTicketId:D,relationship:K}),ye(),$(`Linked with ${D}`,!1)}catch(b){$(b.message||"Failed to link ticket",!0)}finally{ze.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(D=>{D.onclick=async()=>{const K=D.dataset.linkId;try{E=await Qe(`/tickets/${E._id}/links/${K}`),ye()}catch(b){$(b.message,!0)}}});const Ae=a.querySelector("#btn-open-worklog-dialog"),me=a.querySelector("#ci-360-worklog-box"),Ce=a.querySelector("#btn-cancel-worklog"),ke=a.querySelector("#btn-submit-worklog"),De=a.querySelector("#inp-worklog-time"),_e=a.querySelector("#inp-worklog-desc");Ae&&me&&(Ae.onclick=()=>{me.style.display="block"}),Ce&&me&&(Ce.onclick=()=>{me.style.display="none"}),ke&&me&&(ke.onclick=async()=>{const D=De?.value.trim(),K=_e?.value.trim();if(!D){$("Enter time spent (e.g. 2h 30m)",!0);return}try{ke.disabled=!0,E=await Se(`/tickets/${E._id}/worklogs`,{timeSpent:D,description:K}),ye(),$("Work logged",!1)}catch(b){$(b.message||"Failed to log work",!0)}finally{ke.disabled=!1}});const he=a.querySelector("#btn-delete-ticket");he&&(he.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${E.ticketId}?`))try{he.disabled=!0,await Qe(`/tickets/${E._id}`),$(`Ticket ${E.ticketId} deleted`,!1),nt(),await Xe(),tt(),await de()}catch(D){$(D.message||"Failed to delete ticket",!0),he.disabled=!1}})}function nt(){E=null,O=!1;const a=s.querySelector("#ci-360-modals-root");a&&(a.innerHTML="")}function d(a=null){const n=s.querySelector("#ci-360-modals-root");if(!n)return;const f=a||(A.jobId&&A.jobId!=="all"?A.jobId:null);n.innerHTML=`
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
                  ${kt.map(i=>`<option value="${i.key}">${i.icon} ${i.label}</option>`).join("")}
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
                  ${R.map(i=>{const o=p&&String(p._id||p.id)===String(i._id);return`
                      <label class="ci-360-emp-check-item ${o?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${i._id}" ${o?"checked":""} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(i.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${y(i.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${y(i.role)})${o?" — (You)":""}</span>
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
                    <option value="${i._id}" ${f&&String(f)===String(i._id)?"selected":""}>
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
    `;const v=()=>{n.querySelectorAll(".ci-360-emp-check-item").forEach(i=>{const o=i.querySelector(".chk-create-emp");i.classList.toggle("selected",!!o?.checked)})};n.querySelectorAll(".chk-create-emp").forEach(i=>{i.onchange=v});const T=n.querySelector("#btn-create-assign-self");T&&p&&(T.onclick=()=>{const i=String(p._id||p.id);n.querySelectorAll(".chk-create-emp").forEach(o=>{o.value===i&&(o.checked=!0)}),v()});const N=n.querySelector("#btn-create-clear-assign");N&&(N.onclick=()=>{n.querySelectorAll(".chk-create-emp").forEach(i=>{i.checked=!1}),v()});const w=[],L=n.querySelector("#inp-create-ticket-att"),M=n.querySelector("#create-att-list"),_=n.querySelector("#create-att-count"),q=n.querySelector("#create-att-progress"),x=()=>{_&&(_.textContent=`${w.length} file(s) attached`),M&&(M.innerHTML=w.map((i,o)=>{const k=i.type&&i.type.includes("video")||i.name&&i.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${k?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${y(i.name)}">${y(i.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${ga(i.size)} ${k?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${o}" title="Remove">&times;</button>
          </div>
        `}).join(""),M.querySelectorAll(".btn-del-pending-att").forEach(i=>{i.onclick=()=>{w.splice(Number(i.dataset.idx),1),x()}}))};L&&(L.onchange=async()=>{const i=Array.from(L.files||[]);if(L.value="",!!i.length){q&&(q.style.display="block",q.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${i.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await ba(i,k=>{const z=n.querySelector("#create-prog-pct"),C=n.querySelector("#create-prog-bar");z&&(z.textContent=`${k}%`),C&&(C.style.width=`${k}%`)})).forEach(k=>{w.push({name:k.name,url:k.url,size:k.size||0,type:k.type||"application/octet-stream"})}),x()}catch(o){$(`Failed to upload files: ${o.message}`,!0)}finally{q&&(q.style.display="none"),L.value=""}}});const U=()=>{n.innerHTML=""},F=n.querySelector("#btn-close-create-modal");F&&(F.onclick=U);const j=n.querySelector("#btn-cancel-create-ticket");j&&(j.onclick=U);const l=n.querySelector("#ci-360-create-backdrop");l&&(l.onclick=i=>{i.target===l&&U()});const u=n.querySelector("#btn-submit-create-ticket");u&&(u.onclick=async()=>{const i=n.querySelector("#create-ticket-title")?.value.trim(),o=n.querySelector("#create-ticket-desc")?.value.trim(),k=n.querySelector("#create-ticket-cat")?.value||"Task",z=n.querySelector("#create-ticket-pri")?.value||"Medium",V=Array.from(n.querySelectorAll(".chk-create-emp:checked")).map(W=>W.value),ie=n.querySelector("#create-ticket-duedate")?.value||null,H=n.querySelector("#create-ticket-job")?.value||null,B=n.querySelector("#create-ticket-url")?.value.trim()||"";if(!i){$("Ticket summary / title is required",!0);return}try{u.disabled=!0,u.textContent="Creating...";const W=await Se("/tickets",{title:i,description:o,category:k,priority:z,assigneeIds:V,assigneeId:V[0]||null,dueDate:ie,jobId:H,linkUrl:B,attachments:w});$(`Ticket ${W.ticketId} created! 🎫`,!1),U(),await Xe(),tt(),await de(),it(W._id)}catch(W){$(W.message||"Could not create ticket",!0),u.disabled=!1,u.textContent="Create Ticket 🚀"}})}s._openCreateTicketModal=d,s._openTicketDetailModal=it,s._setJobFilter=async a=>{A.jobId=a||"all";const n=s.querySelector("#ci-360-filter-job");n&&(n.value=A.jobId),qe(),await de()}}export{ni as a,ii as b,ai as i};
