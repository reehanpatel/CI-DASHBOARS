import{c as Ue,k as $,e as f,x as ut,l as gt,p as Wt,m as ra,j as Ae,y as wa,z as pa,A as $a}from"./api-Cwe-Rvi5.js";const Sa={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function Ra(){try{const i=localStorage.getItem("ci360_planner_settings");if(i)return Object.assign({},Sa,JSON.parse(i))}catch{}return Object.assign({},Sa)}function Ba(i){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(i))}catch{}}function Je(){const i=new Date,t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),d=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${d}`}function na(i,t){const e=new Date(i+"T00:00:00");e.setDate(e.getDate()+t);const d=e.getFullYear(),h=String(e.getMonth()+1).padStart(2,"0"),g=String(e.getDate()).padStart(2,"0");return`${d}-${h}-${g}`}function Mt(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function Ve(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function Ca(i){return i?new Date(i+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function Kt(i,t=1){const e=new Date(i+"T00:00:00"),d=e.getDay(),h=(d<t?7:0)+d-t,g=new Date(e);g.setDate(e.getDate()-h);const l=[];for(let n=0;n<7;n++){const K=new Date(g);K.setDate(g.getDate()+n);const ae=K.getFullYear(),P=String(K.getMonth()+1).padStart(2,"0"),O=String(K.getDate()).padStart(2,"0");l.push(`${ae}-${P}-${O}`)}return l}function ja(){try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i,e=t.currentTime,d=t.createOscillator(),h=t.createGain();d.type="sine",d.frequency.setValueAtTime(523.25,e),d.frequency.exponentialRampToValueAtTime(783.99,e+.15),h.gain.setValueAtTime(.2,e),h.gain.exponentialRampToValueAtTime(.001,e+.35),d.connect(h),h.connect(t.destination),d.start(e),d.stop(e+.35)}catch{}}function bn(i,t={}){const{userRole:e="employee",currentUser:d=null,onNavigate:h=null}=t,g=e==="superadmin"||e==="admin";let l=Ra(),n={selectedDate:Je(),viewMode:"daily",filterStatus:"all",searchQuery:"",groupByEmployee:g,collapsedEmployees:{},selectedCategory:"all",selectedPersonnelId:"all",reportPersonnelId:"all",tasks:[],personnelList:[],clientList:[],loading:!1};Na(),K();async function K(){n.loading=!0,ae();try{const s=[Ue("/tasks"),Ue("/personnel").catch(()=>[]),Ue("/clients").catch(()=>[])],[a,o,m]=await Promise.all(s);n.tasks=Array.isArray(a)?a:[],o&&(n.personnelList=Array.isArray(o)?o:[]),m&&(n.clientList=Array.isArray(m)?m:[])}catch(s){$("Failed to load planner tasks: "+s.message,!0)}finally{n.loading=!1,X()}}function ae(){i.innerHTML=`
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
    `}function P(s){return n.tasks.filter(a=>{if(a.isDeleted===!0)return!1;if(g&&n.selectedPersonnelId!=="all"){const v=a.personnelId?._id||a.personnelId,B=String(v)===String(n.selectedPersonnelId),G=Array.isArray(a.coOwners)&&a.coOwners.some(I=>{const U=I.personnelId?._id||I.personnelId||I.userId?._id||I.userId;return String(U)===String(n.selectedPersonnelId)});if(!B&&!G)return!1}const o=a.completionDateStr||a.dateStr||(a.dueDate?new Date(a.dueDate).toISOString().slice(0,10):""),m=a.assignedDateStr||(a.assignedDate?new Date(a.assignedDate).toISOString().slice(0,10):"")||(a.createdAt?new Date(a.createdAt).toISOString().slice(0,10):"")||o;if(a.status==="In Progress"){const v=m&&o&&m<=o?m:o||m,B=m&&o&&m<=o?o:m||o;if(v&&B){if(s>=v&&s<=B)return!0}else{if(o&&o===s)return!0;if(m&&m===s)return!0}}return o&&o===s||a.status!=="Completed"&&m&&m===s?!0:!o&&!m?s===Je():!1})}function O(s,a){if(s.status==="Completed")return!1;const o=s.completionDateStr||s.dateStr||(s.dueDate?new Date(s.dueDate).toISOString().slice(0,10):"");return o?o<a:!1}function ee(s,a){const o=s.length,m=s.filter(U=>U.status==="Completed").length,v=s.filter(U=>U.status==="In Progress").length,B=s.filter(U=>U.status==="Pending"||U.status==="Todo").length,G=s.filter(U=>O(U,a)).length,I=o>0?Math.round(m/o*100):0;return{total:o,completed:m,inProgress:v,pending:B,overdue:G,percent:I}}function X(){const s=Je(),a=n.selectedDate===s,o=P(n.selectedDate),m=ee(o,s);i.innerHTML=`
      <div class="ci360-planner-wrap ${l.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${Ve(n.selectedDate)}</span>
              </div>
              <h1 class="ci360-planner-heading">${f(l.displayName||"Daily Planner")}</h1>
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
            <button type="button" class="ci360-btn-primary ${n.selectedDate<s?"is-locked-past":""}" id="btnOpenAddTaskModal" title="${n.selectedDate<s?"Cannot add tasks on previous dates (switch to today or later)":"Add Task"}">
              ${n.selectedDate<s?`
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
              <span class="date-text" id="displayDateLabel">${Mt(n.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${n.selectedDate}">
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
                <option value="all" ${n.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${n.personnelList.map(v=>`
                  <option value="${v._id}" ${n.selectedPersonnelId===String(v._id)?"selected":""}>
                    ${f(v.name)} (${f(v.department||v.role||"Team")})
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
          ${we(o,m)}
        </main>

      </div>
    `,xt(),Pt()}function we(s,a){return n.viewMode==="weekly"?yt():n.viewMode==="report"?Ct():Fe(s,a)}function Fe(s,a){const o=Je(),m=n.selectedDate<o;let v=s;if(n.filterStatus==="pending"?v=v.filter(I=>I.status==="Pending"||I.status==="Todo"):n.filterStatus==="in_progress"?v=v.filter(I=>I.status==="In Progress"):n.filterStatus==="completed"?v=v.filter(I=>I.status==="Completed"):n.filterStatus==="overdue"&&(v=v.filter(I=>O(I,o))),n.searchQuery){const I=n.searchQuery.toLowerCase().trim();v=v.filter(U=>{const V=(U.title||"").toLowerCase(),F=(U.description||"").toLowerCase(),J=(U.category||"").toLowerCase(),x=(U.clientName||"").toLowerCase(),L=(U.personnelId?.name||U.userId?.name||"").toLowerCase(),oe=(U.createdByName||U.createdBy?.name||(U.createdBy?.email?U.createdBy.email.split("@")[0]:"")).toLowerCase(),A=Array.isArray(U.coOwners)?U.coOwners.map(te=>(te.name||"").toLowerCase()).join(" "):"",R=(U.clientId?.name||U.jobId?.clientId?.name||"").toLowerCase();return V.includes(I)||F.includes(I)||J.includes(I)||x.includes(I)||L.includes(I)||oe.includes(I)||A.includes(I)||R.includes(I)})}v.sort((I,U)=>{if(I.status==="Completed"&&U.status!=="Completed")return 1;if(I.status!=="Completed"&&U.status==="Completed")return-1;const V={Urgent:0,High:1,Medium:2,Low:3};return(V[I.priority]||2)-(V[U.priority]||2)});const B=new Map;v.forEach(I=>{let U="unassigned",V="Unassigned / Team",F="",J="";I.personnelId&&typeof I.personnelId=="object"&&I.personnelId._id?(U=String(I.personnelId._id),V=I.personnelId.name||"Team Member",J=I.personnelId.role||"Personnel",F=I.personnelId.department||""):I.userId&&typeof I.userId=="object"&&I.userId._id?(U=String(I.userId._id),V=I.userId.name||"User",J=I.userId.role||"Member"):(I.createdByName||I.createdBy&&I.createdBy.name)&&(V=I.createdByName||I.createdBy.name,U="creator_"+V.toLowerCase().replace(/[^a-z0-9]/g,"_"),J="Creator"),B.has(U)||B.set(U,{key:U,name:V,department:F,role:J,tasks:[]}),B.get(U).tasks.push(I)});const G=Array.from(B.values()).sort((I,U)=>I.key==="unassigned"?1:U.key==="unassigned"?-1:I.name.localeCompare(U.name));return`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <h2 class="ci360-focus-title" style="margin:0;">
              <span class="accent-dot"></span>
              ${m?"Focus Archive":"Today's Focus"}
            </h2>
            <span class="ci360-task-count-badge">${v.length} ${v.length===1?"task":"tasks"}</span>
            ${m?"":`
              <button type="button" class="ci360-btn-primary" id="btnFocusAddTask" style="padding:6px 14px;font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:6px;border-radius:var(--r-md);margin-left:4px;cursor:pointer;box-shadow:0 2px 6px rgba(99,102,241,0.25);">
                <span style="font-size:15px;line-height:1;font-weight:800;">+</span> Add Task
              </button>
            `}
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${n.filterStatus==="all"?"active":""}" data-f="all">All (${a.total})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${a.pending})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${a.inProgress})</button>
              <button type="button" class="filter-pill ${n.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${a.completed})</button>
              ${a.overdue>0?`
                <button type="button" class="filter-pill overdue ${n.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${a.overdue})</button>
              `:""}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${g?`
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${n.groupByEmployee?"active":""}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${n.groupByEmployee?"By Employee":"Flat List"}
                </button>
                ${n.groupByEmployee&&G.length>0?`
                  <button type="button" class="filter-pill" id="btnExpandAllEmp" title="Expand all employee tasks">⊞ Expand</button>
                  <button type="button" class="filter-pill" id="btnCollapseAllEmp" title="Collapse all employee tasks">⊟ Collapse</button>
                `:""}
              </div>
            `:""}

            <!-- Search Bar with employee search support -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks, client name, employee or co-owner..." value="${f(n.searchQuery)}">
              ${n.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Past Date Banner (Only for Previous Dates) -->
        ${m?`
          <div class="ci360-past-date-banner">
            <div class="past-banner-icon">🔒</div>
            <div class="past-banner-body">
              <div class="past-banner-title">Previous Date (${Ve(n.selectedDate)})</div>
              <div class="past-banner-desc">
                Adding new tasks on previous dates is restricted. You can edit existing tasks, adjust completion dates, or mark tasks as completed.
              </div>
            </div>
          </div>
        `:""}

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${v.length===0?tt(m):g&&n.groupByEmployee?`
              <div class="ci360-emp-groups-container">
                ${G.map(I=>{const U=!!n.collapsedEmployees[I.key],V=I.tasks.filter(L=>L.status==="Completed").length,F=I.tasks.filter(L=>L.status==="In Progress").length,J=I.tasks.filter(L=>L.status==="Pending"||L.status==="Todo").length,x=I.tasks.length>0?Math.round(V/I.tasks.length*100):0;return`
                    <div class="ci360-emp-group-card ${U?"is-collapsed":""}" data-emp-key="${I.key}">
                      <div class="ci360-emp-group-header" data-action="toggle-emp-group" data-emp-key="${I.key}" role="button" tabindex="0">
                        <div class="emp-group-left">
                          <span class="emp-collapse-icon">${U?"▶":"▼"}</span>
                          <div class="emp-avatar">${f((I.name||"U").charAt(0).toUpperCase())}</div>
                          <div class="emp-info">
                            <span class="emp-name">${f(I.name)}</span>
                            ${I.department||I.role?`<span class="emp-subtitle">${f(I.department?I.department+" · "+I.role:I.role)}</span>`:""}
                          </div>
                        </div>

                        <div class="emp-group-right">
                          <span class="emp-stat-pill total">${I.tasks.length} ${I.tasks.length===1?"task":"tasks"}</span>
                          <span class="emp-stat-pill done">${V} done</span>
                          ${F>0?`<span class="emp-stat-pill in-prog">${F} in progress</span>`:""}
                          ${J>0?`<span class="emp-stat-pill pending">${J} pending</span>`:""}
                          <div class="emp-mini-bar-wrap" title="${x}% completed">
                            <div class="emp-mini-bar-fill" style="width:${x}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${U?"":`
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${I.tasks.map(L=>ct(L,o)).join("")}
                          </div>
                        </div>
                      `}
                    </div>
                  `}).join("")}
              </div>
            `:`
              <div class="ci360-task-list">
                ${v.map(I=>ct(I,o)).join("")}
              </div>
            `}
        </div>

      </div>
    `}function tt(s=!1){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">${s?"📜":"✨"}</div>
        <h3>No tasks found for ${Ve(n.selectedDate)}</h3>
        <p>${s?"No scheduled tasks were recorded on this past date.":"Your schedule is clean and ready. Add your first priority task above or import your daily agenda."}</p>
        ${s?"":`
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
    `}function ct(s,a){const o=s.status==="Completed",m=O(s,a),v=s.completionDateStr||s.dateStr||(s.dueDate?new Date(s.dueDate).toISOString().slice(0,10):a),B=s.assignedDateStr||(s.assignedDate?new Date(s.assignedDate).toISOString().slice(0,10):"")||(s.createdAt?new Date(s.createdAt).toISOString().slice(0,10):""),G=s.status==="In Progress"&&B&&v&&B!==v,I=`pri-${(s.priority||"medium").toLowerCase()}`,U=`status-${(s.status||"pending").toLowerCase().replace(/\s+/g,"-")}`,V=s.createdByName||s.createdBy?.name||(s.createdBy?.email?s.createdBy.email.split("@")[0]:"")||s.personnelId?.name||s.userId?.name||"";return`
      <div class="ci360-task-card ${o?"is-completed":""} ${m?"is-overdue":""}" data-id="${s._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${o?"checked":""}" data-action="toggle" data-id="${s._id}" title="${o?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${f(s.title)}</span>
          </div>

          ${s.description?`
            <div class="ci360-task-desc">${f(s.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${I}">
              <span class="badge-dot"></span>
              ${f(s.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${U}">
              ${f(s.status||"Pending")}
            </span>

            <!-- Completion Date / Date Span Badge (Always Visible & Prominent) -->
            ${G?`
              <span class="ci360-badge completion-badge" style="background:rgba(59,130,246,0.15);color:#3b82f6;border-color:rgba(59,130,246,0.3);" title="In Progress from ${Ve(B)} to ${Ve(v)}">
                📅 ${Ve(B)} ➔ Due: ${Ve(v)}
              </span>
            `:`
              <span class="ci360-badge completion-badge" title="Target Completion Date: ${v}">
                📅 Due: ${Ve(v)}
              </span>
            `}

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${s.rescheduledFrom&&s.rescheduledFrom!==v?`
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${Ve(s.rescheduledFrom)} to ${Ve(v)} (${s.dateChangeCount||1} change${(s.dateChangeCount||1)>1?"s":""})">
                🔄 Date Changed: ${Ve(s.rescheduledFrom)} ➔ ${Ve(v)}
              </span>
            `:""}

            <!-- Added By Badge (Shows Who Created the Task) -->
            ${V?`
              <span class="ci360-badge creator-badge" title="Created / Added by: ${f(V)}">
                ✍️ Added by: ${f(V)}
              </span>
            `:""}

            <!-- Category -->
            ${s.category?`
              <span class="ci360-badge category-badge">
                #${f(s.category)}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${m?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name (if different from addedByName) -->
            ${g&&(s.personnelId?.name||s.userId?.name)&&(s.personnelId?.name||s.userId?.name)!==V?`
              <span class="ci360-badge personnel-badge" title="Assigned Employee">
                👤 Assigned: ${f(s.personnelId?.name||s.userId?.name)}
              </span>
            `:""}

            <!-- Co-Owners Badge (Multiple People) -->
            ${Array.isArray(s.coOwners)&&s.coOwners.length>0?`
              <span class="ci360-badge coowner-badge" style="background:rgba(99,102,241,0.12);color:var(--accent);border:1px solid rgba(99,102,241,0.25);" title="Co-Owners: ${s.coOwners.map(F=>F.name).filter(Boolean).join(", ")}">
                👥 Co-Owners: ${f(s.coOwners.map(F=>F.name).filter(Boolean).join(", "))}
              </span>
            `:""}

            <!-- Client Badge -->
            ${s.clientName||s.clientId?.name||s.jobId?.clientId?.name||s.category&&s.category!=="General"&&s.category?`
              <span class="ci360-badge client-badge" style="background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.25);" title="Client: ${f(s.clientName||s.clientId?.name||s.jobId?.clientId?.name||s.category)}">
                🏢 ${f(s.clientName||s.clientId?.name||s.jobId?.clientId?.name||s.category)}
              </span>
            `:""}
          </div>
        </div>

        <!-- Task Actions Menu: Previous tasks can be edited, deleted, changed by all -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${s._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${s._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function yt(){const s=Kt(n.selectedDate,l.weekStartsOn),a=Ve(s[0]),o=Ve(s[6]),m=Je();return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${a} – ${o}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${s.map(v=>{const B=v===m,G=v===n.selectedDate,I=P(v),U=ee(I,m);return`
              <div class="ci360-day-column ${B?"is-today":""} ${G?"is-selected":""}" data-date="${v}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${v}">
                  <div class="day-name">${Ca(v)}</div>
                  <div class="day-number">${new Date(v+"T00:00:00").getDate()}</div>
                  ${B?'<span class="today-pill">Today</span>':""}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${U.completed}/${U.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${U.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${I.length===0?`
                    <div class="day-empty">No tasks</div>
                  `:I.map(V=>`
                    <div class="ci360-mini-task-card ${V.status==="Completed"?"done":""}" data-id="${V._id}">
                      <button type="button" class="mini-check ${V.status==="Completed"?"checked":""}" data-action="toggle" data-id="${V._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${V._id}">
                        <div class="mini-title">${f(V.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(V.priority||"medium").toLowerCase()}">${V.priority||"Med"}</span>
                          ${V.dueTime?`<span class="mini-time">${f(V.dueTime)}</span>`:""}
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
    `}function Ct(){const s=Kt(n.selectedDate,l.weekStartsOn),a=Mt(s[0]),o=Mt(s[6]),m=Je(),v=n.reportPersonnelId||"all",B=n.personnelList.find(L=>String(L._id)===String(v)),G=B?B.name:"",I=n.tasks.filter(L=>{if(L.isDeleted===!0)return!1;const oe=L.completionDateStr||L.dateStr||(L.dueDate?new Date(L.dueDate).toISOString().slice(0,10):""),A=L.assignedDateStr||(L.assignedDate?new Date(L.assignedDate).toISOString().slice(0,10):"")||oe;if(!(L.status==="In Progress"&&A&&oe?s.some(te=>te>=A&&te<=oe):s.includes(oe)||s.includes(A)))return!1;if(v!=="all"){const te=String(L.personnelId?._id||L.personnelId||""),z=Array.isArray(L.coOwners)&&L.coOwners.some(S=>String(S.personnelId?._id||S.personnelId||S.userId?._id||S.userId||"")===String(v));return te===String(v)||z}return!0}),U=I.length,V=I.filter(L=>L.status==="Completed").length,F=I.filter(L=>L.status==="In Progress").length,J=U>0?Math.round(V/U*100):0,x={Urgent:0,High:0,Medium:0,Low:0};return I.forEach(L=>{const oe=L.priority||"Medium";x[oe]!==void 0&&x[oe]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3);display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span>Week Period: ${a} – ${o}</span>
              ${v!=="all"&&G?`
                <span class="badge blue" style="font-size:11.5px;padding:2px 8px;font-weight:700;">👤 Employee: ${f(G)}</span>
              `:`
                <span class="badge gray" style="font-size:11.5px;padding:2px 8px;font-weight:600;">👥 All Team Members</span>
              `}
            </div>
          </div>

          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            ${g?`
              <div style="display:inline-flex;align-items:center;gap:6px;">
                <label for="selectWeeklyReportEmployee" style="font-size:12px;font-weight:700;color:var(--text-2);white-space:nowrap;">Whose Report:</label>
                <select id="selectWeeklyReportEmployee" class="input" style="padding:6px 12px;font-size:12.5px;font-weight:600;min-width:180px;height:36px;border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);border:1px solid var(--border-sm);">
                  <option value="all" ${v==="all"?"selected":""}>👥 All Team Members</option>
                  ${n.personnelList.map(L=>`
                    <option value="${L._id}" ${String(L._id)===String(v)?"selected":""}>
                      👤 ${f(L.name)} (${f(L.department||L.role||"Member")})
                    </option>
                  `).join("")}
                </select>
              </div>
            `:""}

            <button type="button" class="ci360-btn-primary" id="btnDownloadWeeklyPdf" title="Download weekly report PDF for the selected employee">
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
            <span class="value" style="font-size:28px">${U}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${V}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${F}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${J}%</span>
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
                ${s.map(L=>{const oe=P(L),A=ee(oe,m);return`
                    <tr>
                      <td><strong>${Ca(L)}</strong></td>
                      <td>${Ve(L)}</td>
                      <td>${A.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${A.completed}</td>
                      <td>${A.pending+A.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${A.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${A.percent}%</span>
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
              <div style="font-size:22px;font-weight:700">${x.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${x.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${x.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${x.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function xt(){const s=document.getElementById("btnViewDaily"),a=document.getElementById("btnViewWeekly"),o=document.getElementById("btnViewReport");s&&(s.onclick=()=>{n.viewMode="daily",X()}),a&&(a.onclick=()=>{n.viewMode="weekly",X()}),o&&(o.onclick=()=>{n.viewMode="report",X()});const m=document.getElementById("btnPrevDay"),v=document.getElementById("btnNextDay"),B=document.getElementById("btnJumpToday"),G=document.getElementById("hiddenDateInput"),I=document.getElementById("datePickerBadge");m&&(m.onclick=()=>{n.selectedDate=na(n.selectedDate,-1),X()}),v&&(v.onclick=()=>{n.selectedDate=na(n.selectedDate,1),X()}),B&&(B.onclick=()=>{n.selectedDate=Je(),X()}),I&&G&&(I.onclick=()=>{try{typeof G.showPicker=="function"?G.showPicker():G.focus()}catch{G.focus()}},G.onchange=z=>{z.target.value&&(n.selectedDate=z.target.value,X())});const U=document.getElementById("admTeamSelect");U&&(U.onchange=z=>{n.selectedPersonnelId=z.target.value,X()});const V=document.getElementById("btnOpenAddTaskModal");V&&(V.onclick=()=>{if(n.selectedDate<Je()){$("Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.",!0);return}bt()});const F=document.getElementById("btnPlannerActionsMenu"),J=document.getElementById("plannerActionsDropdown");F&&J&&(F.onclick=z=>{z.stopPropagation(),J.classList.toggle("hidden")},document.addEventListener("click",z=>{!J.contains(z.target)&&z.target!==F&&J.classList.add("hidden")}));const x=document.getElementById("btnActionImport");x&&(x.onclick=()=>{J?.classList.add("hidden"),St()});const L=document.getElementById("btnActionExportPng");L&&(L.onclick=()=>{J?.classList.add("hidden"),at()});const oe=document.getElementById("btnActionExportPdf");oe&&(oe.onclick=()=>{J?.classList.add("hidden"),be()});const A=document.getElementById("btnActionAdminReport");A&&(A.onclick=()=>{J?.classList.add("hidden"),ft()});const R=document.getElementById("btnActionBackup");R&&(R.onclick=()=>{J?.classList.add("hidden"),It()});const te=document.getElementById("btnActionSettings");te&&(te.onclick=()=>{J?.classList.add("hidden"),wt()})}function Pt(s){if(n.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(A=>{A.onclick=()=>{n.filterStatus=A.dataset.f,X()}});const a=document.getElementById("plannerTaskSearchInp");a&&(a.oninput=A=>{const R=A.target.value;n.searchQuery=R;const te=A.target.selectionStart;X();const z=document.getElementById("plannerTaskSearchInp");if(z&&(z.focus(),te!==null))try{z.setSelectionRange(te,te)}catch{}});const o=document.getElementById("btnClearSearch");o&&(o.onclick=()=>{n.searchQuery="",X()});const m=document.getElementById("btnFocusAddTask");m&&(m.onclick=()=>{bt(null,n.selectedDate)});const v=document.getElementById("btnEmptyStateAddTask");v&&(v.onclick=()=>{bt(null,n.selectedDate)});const B=document.getElementById("quickAddTitleInp"),G=document.getElementById("quickAddCompletionDate"),I=document.getElementById("quickAddPriority"),U=document.getElementById("quickAddCategory"),V=document.getElementById("btnQuickAddSubmit"),F=async()=>{const A=Je();if(n.selectedDate<A){$("Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.",!0);return}const R=(B?.value||"").trim();if(!R){$("Please enter a task title",!0),B?.focus();return}const te=(G?.value||"").trim()||n.selectedDate;if(te<A){$("Cannot set completion date on a previous date.",!0);return}try{const z={title:R,assignedDate:n.selectedDate,assignedDateStr:n.selectedDate,dateStr:te,completionDate:te,completionDateStr:te,dueDate:te,priority:I?.value||l.defaultPriority,category:U?.value||"General",status:"Pending"};if(g){const xe=document.getElementById("quickAddAssignee")?.value;xe==="all"?(z.assignAll=!0,z.personnelId="all"):xe?z.personnelId=xe:n.selectedPersonnelId!=="all"&&(z.personnelId=n.selectedPersonnelId)}const S=await Ae("/tasks",z);n.tasks.unshift(S),$("Task added to today's focus! ✨"),B&&(B.value="",B.focus()),X()}catch(z){$(z.message,!0)}};V&&(V.onclick=F),B&&(B.onkeydown=A=>{A.key==="Enter"&&F()}),document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(A=>{A.onclick=()=>{const R=A.dataset.empKey;n.collapsedEmployees[R]=!n.collapsedEmployees[R],X()}});const J=document.getElementById("btnToggleEmpGrouping");J&&(J.onclick=()=>{n.groupByEmployee=!n.groupByEmployee,X()});const x=document.getElementById("btnExpandAllEmp");x&&(x.onclick=()=>{n.collapsedEmployees={},X()});const L=document.getElementById("btnCollapseAllEmp");L&&(L.onclick=()=>{document.querySelectorAll(".ci360-emp-group-card").forEach(A=>{const R=A.dataset.empKey;R&&(n.collapsedEmployees[R]=!0)}),X()});const oe=document.getElementById("btnEmptyStateImport");oe&&(oe.onclick=()=>St())}if(n.viewMode==="weekly"){const a=document.getElementById("btnPrevWeek"),o=document.getElementById("btnNextWeek"),m=document.getElementById("btnThisWeek");a&&(a.onclick=()=>{n.selectedDate=na(n.selectedDate,-7),X()}),o&&(o.onclick=()=>{n.selectedDate=na(n.selectedDate,7),X()}),m&&(m.onclick=()=>{n.selectedDate=Je(),X()}),document.querySelectorAll(".day-col-header").forEach(v=>{v.onclick=()=>{n.selectedDate=v.dataset.date,n.viewMode="daily",X()}}),document.querySelectorAll('[data-action="add-day"]').forEach(v=>{v.onclick=()=>{bt(null,v.dataset.date)}})}if(n.viewMode==="report"){const a=document.getElementById("selectWeeklyReportEmployee");a&&(a.onchange=v=>{n.reportPersonnelId=v.target.value,X()});const o=document.getElementById("btnDownloadWeeklyPdf");o&&(o.onclick=()=>be({personnelId:n.reportPersonnelId||"all"}));const m=document.getElementById("btnOpenAdminReportModal");m&&(m.onclick=()=>ft())}i.querySelectorAll('[data-action="toggle"]').forEach(a=>{a.onclick=async o=>{o.stopPropagation();const m=a.dataset.id;await kt(m)}}),i.querySelectorAll('[data-action="edit"]').forEach(a=>{a.onclick=o=>{o.stopPropagation();const m=a.dataset.id,v=n.tasks.find(B=>B._id===m);v&&bt(v)}}),i.querySelectorAll('[data-action="delete"]').forEach(a=>{a.onclick=async o=>{o.stopPropagation();const m=a.dataset.id;await He(m)}})}async function kt(s){const a=n.tasks.find(m=>m._id===s);if(!a)return;const o=a.status!=="Completed";try{const m=await ut(`/tasks/${s}/toggle`,{}),v=n.tasks.findIndex(B=>B._id===s);v!==-1&&(n.tasks[v]=m),o?(l.soundEnabled&&ja(),$("Task marked as completed! 🎉")):$("Task reopened as pending."),X()}catch(m){$(m.message,!0)}}async function He(s){const a=n.tasks.find(o=>o._id===s);if(a&&confirm(`Are you sure you want to remove "${a.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await gt(`/tasks/${s}`),n.tasks=n.tasks.filter(o=>o._id!==s),$("Task removed from planner (safely stored in database archive)"),X()}catch(o){$(o.message,!0)}}function bt(s=null,a=null){const o=!!s,m=Je(),v=s?s.assignedDateStr||(s.assignedDate?new Date(s.assignedDate).toISOString().slice(0,10):"")||s.dateStr||(s.createdAt?new Date(s.createdAt).toISOString().slice(0,10):n.selectedDate):a&&a>=m?a:n.selectedDate>=m?n.selectedDate:m;s?s.completionDateStr||s.dueDate&&new Date(s.dueDate).toISOString().slice(0,10):a&&a>=m||n.selectedDate>=m&&n.selectedDate;const B=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${o?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${f(s?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${f(s?.description||"")}</textarea>
          </div>

          <!-- Date Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${v}" ${o?"":`min="${m}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${s?.completionDateStr||(s?.dueDate?new Date(s.dueDate).toISOString().slice(0,10):"")}" ${o?"":`min="${m}"`} placeholder="Defaults to that day">
              <small style="color:var(--text-3);font-size:11px;">If left blank, will default to that day (${v})</small>
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${s?.priority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!s&&l.defaultPriority==="Medium"||s?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!s&&l.defaultPriority==="High"||s?.priority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${s?.priority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${s?.status==="Pending"||s?.status==="Todo"||!s?"selected":""}>Pending</option>
                <option value="In Progress" ${s?.status==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${s?.status==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskClientName">Client Name</label>
              <input type="text" id="taskClientName" class="input" list="clientOptions" placeholder="Enter or select client name..." value="${f(s?.clientName||(s?.category&&s.category!=="General"?s.category:""))}">
              <datalist id="clientOptions">
                ${(n.clientList||[]).map(R=>`<option value="${f(R.name)}">`).join("")}
                <option value="Internal CI">
                <option value="General">
              </datalist>
            </div>
          </div>

          <!-- Superadmin Assign To -->
          ${g?`
            <div class="form-group">
              <label for="taskAssignee">Primary Assignee / Owner</label>
              <select id="taskAssignee" class="input">
                <option value="me" ${!s||!s?.personnelId&&!s?.assignAll?"selected":""}>Myself (Admin)</option>
                <option value="all" ${s?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${n.personnelList.map(R=>{const te=s?.personnelId?._id===R._id||s?.personnelId===R._id;return`<option value="${R._id}" ${te?"selected":""}>👤 ${f(R.name)} (${f(R.department||R.role||"Member")})</option>`}).join("")}
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
              ${n.personnelList.map(R=>`
                <option value="${R._id}">+ 👤 ${f(R.name)} (${f(R.department||R.role||"Member")})</option>
              `).join("")}
            </select>
          </div>

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${o?`
                <button type="button" class="btn danger small" id="btnModalDeleteTask" style="padding:6px 12px;background:#ef4444;color:#fff;border-radius:var(--r-sm);border:none;cursor:pointer;font-weight:700;font-size:12px;">🗑️ Delete Task</button>
              `:""}
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
              <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
                ${o?"Save Changes":"Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    `,G=Wt(B),I=G.querySelector("#taskForm"),U=G.querySelector("#btnModalClose"),V=G.querySelector("#btnCancelModal"),F=G.querySelector("#btnModalDeleteTask"),J=()=>G.remove();U&&(U.onclick=J),V&&(V.onclick=J),F&&s&&(F.onclick=async()=>{J(),await He(s._id)});let x=[];s&&Array.isArray(s.coOwners)&&(x=s.coOwners.map(R=>({personnelId:R.personnelId?._id||R.personnelId||null,userId:R.userId?._id||R.userId||null,name:R.name||R.personnelId?.name||"",role:R.role||R.personnelId?.role||"",department:R.department||R.personnelId?.department||""})).filter(R=>R.personnelId||R.name));const L=G.querySelector("#coOwnersSelectedContainer"),oe=G.querySelector("#taskCoOwnerSelect"),A=()=>{if(L){if(x.length===0){L.innerHTML='<span style="font-size:11.5px;color:var(--text-4);font-style:italic;">No co-owners added yet</span>';return}L.innerHTML=x.map((R,te)=>`
        <span class="co-owner-chip" style="display:inline-flex;align-items:center;gap:6px;background:rgba(99,102,241,0.12);color:var(--accent);border:1px solid rgba(99,102,241,0.25);border-radius:16px;padding:3px 10px;font-size:12px;font-weight:600;">
          👤 ${f(R.name)}
          <button type="button" class="btn-remove-co" data-idx="${te}" style="background:transparent;border:none;color:var(--accent);cursor:pointer;font-size:14px;line-height:1;padding:0;margin-left:2px;font-weight:bold;" title="Remove co-owner">×</button>
        </span>
      `).join(""),L.querySelectorAll(".btn-remove-co").forEach(R=>{R.onclick=()=>{const te=parseInt(R.dataset.idx,10);x.splice(te,1),A()}})}};A(),oe&&(oe.onchange=()=>{const R=oe.value;if(!R)return;const te=n.personnelList.find(z=>String(z._id)===String(R));te&&(x.some(S=>String(S.personnelId)===String(te._id))||(x.push({personnelId:te._id,name:te.name,role:te.role||"",department:te.department||""}),A())),oe.value=""}),I.onsubmit=async R=>{R.preventDefault();const te=G.querySelector("#taskTitle").value.trim(),z=G.querySelector("#taskDesc").value.trim(),S=G.querySelector("#taskDate").value||v,Be=G.querySelector("#taskCompletionDate")?.value?.trim()||S||n.selectedDate,Pe=G.querySelector("#taskPriority").value,Ne=G.querySelector("#taskStatus").value,c=(G.querySelector("#taskClientName")?.value||G.querySelector("#taskCategory")?.value||"").trim(),b=c||"General";if(!te){$("Task title is required",!0);return}if(!o&&(Be<m||S<m)){$("Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.",!0);return}const r={title:te,description:z,assignedDate:S,assignedDateStr:S,dateStr:Be,completionDate:Be,completionDateStr:Be,dueDate:Be,startTime:"",dueTime:"",priority:Pe,status:Ne,category:b,clientName:c,coOwners:x};if(g){const w=G.querySelector("#taskAssignee")?.value;w==="all"?(r.assignAll=!0,r.personnelId="all"):w==="me"?r.personnelId="me":w&&(r.personnelId=w)}const u=G.querySelector("#btnSaveTask");u.disabled=!0,u.textContent="Saving...";try{if(o){const w=await ra(`/tasks/${s._id}`,r),E=n.tasks.findIndex(C=>C._id===s._id);E!==-1&&(n.tasks[E]=w),$("Task updated successfully! ✍️")}else{const w=await Ae("/tasks",r);Array.isArray(w.tasks)?w.tasks.forEach(E=>n.tasks.unshift(E)):n.tasks.unshift(w),$("Task created successfully! ✨")}J(),X()}catch(w){$(w.message,!0),u.disabled=!1,u.textContent=o?"Save Changes":"Create Task"}}}function St(){let s=[];const a=`
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
              <input type="date" id="importTargetDate" class="input" value="${n.selectedDate<Je()?Je():n.selectedDate}" min="${Je()}">
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
    `,o=Wt(a),m=()=>o.remove();o.querySelector("#btnImportClose").onclick=m,o.querySelector("#btnCancelImport").onclick=m;const v=o.querySelector("#importTextarea"),B=o.querySelector("#importFileInput"),G=o.querySelector("#importDropzone"),I=o.querySelector("#previewListArea"),U=o.querySelector("#previewCountLabel"),V=o.querySelector("#btnConfirmImport"),F=o.querySelector("#importFileInfo");function J(L){if(!L)return[];const oe=L.split(/\r?\n/),A=[];for(let R of oe)R=R.trim(),R&&(R=R.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),R=R.replace(/^[-*•]\s+/,""),R=R.replace(/^\d+[\.\)]\s+/,""),R=R.trim(),R&&A.push(R));return A}function x(){const L=v.value,oe=J(L),A=o.querySelector("#importTargetDate").value,R=P(A),te=new Set(R.map(z=>(z.title||"").trim().toLowerCase()));s=[];for(const z of oe){const S=te.has(z.toLowerCase());s.push({title:z,isDuplicate:S})}if(U.textContent=`Preview (${s.length} ${s.length===1?"task":"tasks"} found)`,V.disabled=s.length===0,V.textContent=`Import ${s.length} ${s.length===1?"Task":"Tasks"}`,s.length===0){I.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}I.innerHTML=s.map((z,S)=>`
        <div class="preview-item ${z.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${S+1}.</span>
          <span class="preview-title">${f(z.title)}</span>
          ${z.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}v.oninput=x,G.onclick=()=>B.click(),B.onchange=L=>{const oe=L.target.files[0];if(!oe)return;F.textContent=`File selected: ${oe.name} (${Math.round(oe.size/1024)} KB)`;const A=new FileReader;A.onload=R=>{v.value=R.target.result,x()},A.readAsText(oe)},G.ondragover=L=>{L.preventDefault(),G.classList.add("dragover")},G.ondragleave=()=>G.classList.remove("dragover"),G.ondrop=L=>{L.preventDefault(),G.classList.remove("dragover");const oe=L.dataTransfer.files[0];if(oe&&(oe.type==="text/plain"||oe.name.endsWith(".txt"))){F.textContent=`File dropped: ${oe.name}`;const A=new FileReader;A.onload=R=>{v.value=R.target.result,x()},A.readAsText(oe)}else $("Please drop a valid .txt plain-text file",!0)},V.onclick=async()=>{if(s.length===0)return;V.disabled=!0,V.textContent="Importing...";const L=o.querySelector("#importTargetDate").value;if(L<Je()){$("Cannot import tasks for previous dates. Target date must be today or later.",!0),V.disabled=!1,V.textContent=`Import ${s.length} ${s.length===1?"Task":"Tasks"}`;return}const oe=o.querySelector("#importPriority").value,A=o.querySelector("#importCategory").value.trim()||"General",R={date:L,tasks:s.map(te=>({title:te.title,priority:oe,category:A,status:"Pending"}))};g&&n.selectedPersonnelId!=="all"&&(R.personnelId=n.selectedPersonnelId);try{const te=await Ae("/tasks/bulk-import",R);Array.isArray(te.tasks)&&te.tasks.forEach(z=>n.tasks.unshift(z)),$(`Imported ${te.importedCount} tasks successfully! (${te.skippedCount} skipped duplicates)`),m(),n.selectedDate=L,X()}catch(te){$(te.message,!0),V.disabled=!1,V.textContent="Retry Import"}}}async function at(){const s=P(n.selectedDate),a=ee(s,Je()),o=Mt(n.selectedDate),m=2,v=800,B=160,G=90,I=74,U=70,V=Math.max(120,s.length*I),F=B+G+V+U,J=document.createElement("canvas");J.width=v*m,J.height=F*m;const x=J.getContext("2d");x.scale(m,m);const L=document.documentElement.getAttribute("data-theme")==="dark",oe=L?"#0F172A":"#F8FAFC",A=L?"#1E293B":"#FFFFFF",R=L?"#334155":"#E2E8F0",te=L?"#F8FAFC":"#0F172A",z=L?"#94A3B8":"#475569",S="#4F46E5",xe="#10B981",Be="#F59E0B";x.fillStyle=oe,x.fillRect(0,0,v,F),x.fillStyle=A,Xe(x,24,20,v-48,B-30,16),x.fill(),x.strokeStyle=R,x.lineWidth=1,x.stroke(),x.fillStyle=S,x.font="bold 12px Inter, sans-serif",x.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),x.fillStyle=te,x.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',x.fillText(o,44,86),x.fillStyle=z,x.font="13px Inter, sans-serif",x.fillText(`Planned focus list · ${a.completed} of ${a.total} tasks completed (${a.percent}%)`,44,114);const Pe=B+6;x.fillStyle=A,Xe(x,24,Pe,v-48,G-16,12),x.fill(),x.stroke();const Ne=[{label:"TOTAL TASKS",val:String(a.total),color:te},{label:"COMPLETED",val:String(a.completed),color:xe},{label:"IN PROGRESS",val:String(a.inProgress),color:Be},{label:"PENDING",val:String(a.pending),color:z},{label:"PROGRESS",val:`${a.percent}%`,color:S}],c=(v-48)/Ne.length;Ne.forEach((u,w)=>{const E=24+w*c+20;x.fillStyle=u.color,x.font="bold 20px Inter, sans-serif",x.fillText(u.val,E,Pe+36),x.fillStyle=z,x.font="10px Inter, sans-serif",x.fillText(u.label,E,Pe+54)});const b=Pe+G;x.fillStyle=A,Xe(x,24,b,v-48,V+10,16),x.fill(),x.stroke(),s.length===0?(x.fillStyle=z,x.font="14px Inter, sans-serif",x.textAlign="center",x.fillText("No scheduled tasks recorded for this date.",v/2,b+60),x.textAlign="left"):s.forEach((u,w)=>{const E=b+16+w*I,C=u.status==="Completed";x.beginPath(),x.arc(48,E+14,10,0,Math.PI*2),C?(x.fillStyle=xe,x.fill(),x.strokeStyle="#FFFFFF",x.lineWidth=2,x.beginPath(),x.moveTo(44,E+14),x.lineTo(47,E+17),x.lineTo(52,E+11),x.stroke()):(x.strokeStyle=R,x.lineWidth=2,x.stroke()),x.fillStyle=C?z:te,x.font=`${C?"normal":"500"} 14px Inter, sans-serif`;const N=u.title.length>55?u.title.slice(0,52)+"...":u.title;if(x.fillText(N,70,E+18),C){const pe=x.measureText(N);x.strokeStyle=z,x.lineWidth=1.2,x.beginPath(),x.moveTo(70,E+14),x.lineTo(70+pe.width,E+14),x.stroke()}const ie=u.priority||"Medium";let M="#E2E8F0",Q="#334155";ie==="Urgent"?(M="#FEE2E2",Q="#DC2626"):ie==="High"?(M="#FEF3C7",Q="#D97706"):ie==="Low"&&(M="#ECFDF5",Q="#059669"),x.fillStyle=M,Xe(x,v-150,E+4,60,20,10),x.fill(),x.fillStyle=Q,x.font="bold 10px Inter, sans-serif",x.fillText(ie,v-138,E+18);const T=u.createdByName||u.createdBy?.name||(u.createdBy?.email?u.createdBy.email.split("@")[0]:"")||u.personnelId?.name||u.userId?.name||"Member",me=u.completionDateStr||u.dateStr||"",se=[];se.push(`✍️ Added by: ${T}`),me&&se.push(`📅 Due: ${Ve(me)}`),u.dueTime&&se.push(`🕒 ${u.dueTime}`),u.category&&u.category!=="General"&&se.push(`#${u.category}`);const ce=se.join("   ·   ");x.fillStyle=z,x.font="11px Inter, sans-serif",x.fillText(ce,70,E+36),w<s.length-1&&(x.strokeStyle=R,x.lineWidth=.6,x.beginPath(),x.moveTo(40,E+54),x.lineTo(v-40,E+54),x.stroke())});const r=F-35;x.fillStyle=z,x.font="11px Inter, sans-serif",x.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,r);try{const u=J.toDataURL("image/png"),w=document.createElement("a");w.href=u,w.download=`ci360-daily-planner-${n.selectedDate}.png`,document.body.appendChild(w),w.click(),w.remove(),$("Daily Planner image exported! 🖼️")}catch(u){$("Failed to export image: "+u.message,!0)}}function Xe(s,a,o,m,v,B){s.beginPath(),s.moveTo(a+B,o),s.lineTo(a+m-B,o),s.quadraticCurveTo(a+m,o,a+m,o+B),s.lineTo(a+m,o+v-B),s.quadraticCurveTo(a+m,o+v,a+m-B,o+v),s.lineTo(a+B,o+v),s.quadraticCurveTo(a,o+v,a,o+v-B),s.lineTo(a,o+B),s.quadraticCurveTo(a,o,a+B,o),s.closePath()}function be(s={}){const a=Kt(n.selectedDate,l.weekStartsOn),o=Mt(a[0]),m=Mt(a[6]),v=Je();let B=n.tasks.filter(A=>{if(A.isDeleted===!0)return!1;const R=A.completionDateStr||A.dateStr||(A.dueDate?new Date(A.dueDate).toISOString().slice(0,10):""),te=A.assignedDateStr||(A.assignedDate?new Date(A.assignedDate).toISOString().slice(0,10):"")||R;return s.scope==="today"?R===v||te===v:s.scope==="all"?!0:A.status==="In Progress"&&te&&R?a.some(z=>z>=te&&z<=R):a.includes(R)||a.includes(te)});s.personnelId&&s.personnelId!=="all"&&(B=B.filter(A=>{const R=String(A.personnelId?._id||A.personnelId||""),te=Array.isArray(A.coOwners)&&A.coOwners.some(z=>String(z.personnelId?._id||z.personnelId||z.userId?._id||z.userId||"")===String(s.personnelId));return R===String(s.personnelId)||te})),s.status&&s.status!=="all"&&(B=B.filter(A=>A.status===s.status));const G=B.length,I=B.filter(A=>A.status==="Completed").length,U=B.filter(A=>A.status==="In Progress").length,V=G>0?Math.round(I/G*100):0,F=window.open("","_blank");if(!F){$("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const J=s.title||(s.isAdminReport?"CI360 Admin Detailed Executive Report":"Weekly Productivity Report"),x=s.scope==="today"?`Date: ${Mt(v)}`:s.scope==="all"?"All Active & Historical Tasks":`${o} – ${m}`;let L="";if(s.personnelId&&s.personnelId!=="all"){const A=n.personnelList.find(R=>String(R._id)===String(s.personnelId));A&&(L=`👤 Employee: ${A.name} (${A.department||A.role||"Member"})`)}const oe=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${f(J)} — ${x}</title>
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
            <h1>${f(J)}</h1>
            <div class="period">
              ${x}
              ${L?`<span class="filter-tag" style="background:#dbeafe;color:#1e40af;font-weight:700;">${f(L)}</span>`:""}
              ${s.filterSummary?`<span class="filter-tag">${f(s.filterSummary)}</span>`:""}
            </div>
          </div>
          <div style="text-align:right" class="no-print">
            <button onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:13px;box-shadow:0 2px 4px rgba(79,70,229,0.3);">🖨️ Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${G}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${I}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">In Progress</div>
            <div class="kpi-num" style="color:#f59e0b">${U}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${V}%</div>
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
            ${B.length===0?`
              <tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;font-weight:600">No scheduled tasks match the selected criteria.</td></tr>
            `:B.map(A=>{const R=A.completionDateStr||A.dateStr||(A.dueDate?new Date(A.dueDate).toISOString().slice(0,10):"—"),te=A.assignedDateStr||(A.assignedDate?new Date(A.assignedDate).toISOString().slice(0,10):""),z=A.status==="In Progress"&&te&&R&&te!==R?`${Ve(te)} ➔ ${Ve(R)}`:Ve(R),S=A.jobId?.preferredPersonName||A.jobId?.assignments&&A.jobId.assignments[0]?.personId?.name||A.personnelId?.name||A.userId?.name||A.createdByName||"—",xe=A.clientId?.name||A.jobId?.clientId?.name||A.clientId?.company||""||"—",Be=A.description?f(A.description):'<span style="color:#cbd5e1">—</span>',Pe=Array.isArray(A.coOwners)&&A.coOwners.length>0?A.coOwners.map(r=>r.name).filter(Boolean).join(", "):"",Ne=(A.priority||"medium").toLowerCase(),c=Ne==="urgent"?"badge-urgent":Ne==="high"?"badge-high":Ne==="low"?"badge-low":"badge-med",b=(A.status||"pending").toLowerCase().replace(/\s+/g,"-");return`
                <tr>
                  <td><strong>${z}</strong></td>
                  <td><span class="client-tag">${f(xe)}</span></td>
                  <td>
                    <span class="owner-tag">${f(S)}</span>
                    ${Pe?`<span class="co-owner-sub">👥 Co: ${f(Pe)}</span>`:""}
                  </td>
                  <td><strong>${f(A.title)}</strong></td>
                  <td><div class="desc-text">${Be}</div></td>
                  <td><span class="badge ${c}">${f(A.priority||"Medium")}</span></td>
                  <td><span class="status-tag status-${b}">${f(A.status||"Pending")}</span></td>
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
    `;F.document.write(oe),F.document.close(),$("Report generated for printing & PDF download! 📄")}function ft(){const s=Je(),a=Kt(n.selectedDate,l.weekStartsOn),o=Ve(a[0]),m=Ve(a[6]),v=`
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
              <option value="week" selected>Current Week (${o} – ${m})</option>
              <option value="today">Today Only (${Ve(s)})</option>
              <option value="all">All Available Tasks</option>
            </select>
          </div>

          <!-- Employee Filter -->
          <div class="form-group">
            <label for="admRepPersonnel">Filter by Employee / Person</label>
            <select id="admRepPersonnel" class="input">
              <option value="all" ${!n.reportPersonnelId||n.reportPersonnelId==="all"?"selected":""}>👥 All Team Members</option>
              ${n.personnelList.map(x=>`
                <option value="${x._id}" ${String(x._id)===String(n.reportPersonnelId)?"selected":""}>👤 ${f(x.name)} (${f(x.department||x.role||"Member")})</option>
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
    `,B=Wt(v),G=B.querySelector("#btnAdminRepClose"),I=B.querySelector("#btnAdminRepCancel"),U=B.querySelector("#btnAdminRepPdf"),V=B.querySelector("#btnAdminRepCsv"),F=()=>B.remove();G&&(G.onclick=F),I&&(I.onclick=F);const J=()=>{const x=B.querySelector("#admRepScope")?.value||"week",L=B.querySelector("#admRepPersonnel")?.value||"all",oe=B.querySelector("#admRepStatus")?.value||"all";let A="";if(L!=="all"){const R=n.personnelList.find(te=>String(te._id)===String(L));R&&(A+=`Person: ${R.name} · `)}return oe!=="all"&&(A+=`Status: ${oe}`),{scope:x,personnelId:L,status:oe,filterSummary:A.replace(/\s*·\s*$/,"")}};U&&(U.onclick=()=>{const x=J();F(),be({...x,isAdminReport:!0,title:"CI360 Admin Detailed Executive Task Report"})}),V&&(V.onclick=()=>{const x=J();F(),Te(x)})}function Te(s={}){const a=Kt(n.selectedDate,l.weekStartsOn),o=Je();let m=n.tasks.filter(F=>{if(F.isDeleted===!0)return!1;const J=F.completionDateStr||F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):""),x=F.assignedDateStr||(F.assignedDate?new Date(F.assignedDate).toISOString().slice(0,10):"")||J;return s.scope==="today"?J===o||x===o:s.scope==="all"?!0:F.status==="In Progress"&&x&&J?a.some(L=>L>=x&&L<=J):a.includes(J)||a.includes(x)});s.personnelId&&s.personnelId!=="all"&&(m=m.filter(F=>{const J=String(F.personnelId?._id||F.personnelId||""),x=Array.isArray(F.coOwners)&&F.coOwners.some(L=>String(L.personnelId?._id||L.personnelId||"")===String(s.personnelId));return J===String(s.personnelId)||x})),s.status&&s.status!=="all"&&(m=m.filter(F=>F.status===s.status));const v=["Date","Client Name","Job Owner","Primary Assignee","Co-Owners","Task Title","Description","Priority","Category","Status","Created By"],B=m.map(F=>{const J=F.completionDateStr||F.dateStr||(F.dueDate?new Date(F.dueDate).toISOString().slice(0,10):""),x=F.jobId?.preferredPersonName||F.jobId?.assignments&&F.jobId.assignments[0]?.personId?.name||F.personnelId?.name||F.userId?.name||F.createdByName||"",L=F.clientId?.name||F.jobId?.clientId?.name||F.clientId?.company||"",oe=F.personnelId?.name||F.userId?.name||"",A=Array.isArray(F.coOwners)?F.coOwners.map(Ne=>Ne.name).filter(Boolean).join("; "):"",R=F.title||"",te=F.description||"",z=F.priority||"Medium",S=F.category||"General",xe=F.status||"Pending",Be=F.createdByName||F.createdBy?.name||"",Pe=Ne=>`"${String(Ne||"").replace(/"/g,'""').replace(/\r?\n/g," ")}"`;return[Pe(J),Pe(L),Pe(x),Pe(oe),Pe(A),Pe(R),Pe(te),Pe(z),Pe(S),Pe(xe),Pe(Be)].join(",")}),G="\uFEFF"+[v.join(","),...B].join(`\r
`),I=new Blob([G],{type:"text/csv;charset=utf-8;"}),U=URL.createObjectURL(I),V=document.createElement("a");V.href=U,V.download=`ci360-admin-report-${o}.csv`,document.body.appendChild(V),V.click(),document.body.removeChild(V),URL.revokeObjectURL(U),$("Admin CSV report downloaded! 📊")}function It(){const a=Wt(`
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
    `),o=()=>a.remove();a.querySelector("#btnBackupClose").onclick=o;const m=a.querySelector("#btnDownloadBackupJson");m.onclick=async()=>{m.disabled=!0,m.textContent="Generating backup...";try{const V=await Ue("/tasks/backup"),F=new Blob([JSON.stringify(V,null,2)],{type:"application/json"}),J=URL.createObjectURL(F),x=document.createElement("a");x.href=J,x.download=`ci360-planner-backup-${Je()}.json`,document.body.appendChild(x),x.click(),x.remove(),$("Planner backup downloaded successfully! 💾")}catch(V){$("Backup export failed: "+V.message,!0)}finally{m.disabled=!1,m.textContent="Download JSON Backup"}};const v=a.querySelector("#restoreFileInput"),B=a.querySelector("#restorePreviewArea"),G=a.querySelector("#restoreCountText"),I=a.querySelector("#btnExecuteRestore");let U=null;v.onchange=V=>{const F=V.target.files[0];if(!F)return;const J=new FileReader;J.onload=x=>{try{const L=JSON.parse(x.target.result),oe=Array.isArray(L.tasks)?L.tasks:Array.isArray(L)?L:null;if(!oe||oe.length===0){$("Invalid backup file: No tasks found",!0);return}U=oe,B.style.display="block",G.textContent=`Valid backup: ${oe.length} tasks ready to restore.`,I.disabled=!1}catch(L){$("Error parsing JSON backup file: "+L.message,!0),B.style.display="none",I.disabled=!0}},J.readAsText(F)},I.onclick=async()=>{if(!U||U.length===0)return;I.disabled=!0,I.textContent="Restoring...";const V=a.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const F=await Ae("/tasks/restore",{tasks:U,mode:V});$(`Restored ${F.restoredCount} tasks! (${F.skippedCount} skipped) ✨`),o(),await K()}catch(F){$("Restore failed: "+F.message,!0),I.disabled=!1,I.textContent="Retry Restore"}}}function wt(){const s=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${f(l.displayName||"Daily Planner")}">
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
              <input type="text" id="setTimezone" class="input" value="${f(l.timezone||"Asia/Kolkata")}" readonly>
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
    `,a=Wt(s),o=()=>a.remove();a.querySelector("#btnSettingsClose").onclick=o,a.querySelector("#btnCancelSettings").onclick=o;const m=a.querySelector("#btnPlannerTestNotif");m&&(m.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await requestNotificationPermission()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):$("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true");const v=a.querySelector("#setNotifEnabled");v&&(v.checked=!0);const B=a.querySelector("#plannerNotifStatusLabel");B&&(B.textContent="🟢 Active on this laptop"),await triggerSystemNotification({title:"CI360 Planner Alert 🔔",message:"Laptop & browser notifications are active and ready!",id:"ci360-planner-test-"+Date.now()}),$("Test notification sent to your laptop/browser! 🔔")}),a.querySelector("#settingsForm").onsubmit=v=>{v.preventDefault(),l.displayName=a.querySelector("#setDisplayName").value.trim()||"Daily Planner",l.weekStartsOn=Number(a.querySelector("#setWeekStart").value),l.defaultPriority=a.querySelector("#setDefaultPriority").value,l.density=a.querySelector("#setDensity").value,l.soundEnabled=a.querySelector("#setSound").checked;const B=a.querySelector("#setNotifEnabled")?.checked;localStorage.setItem("ci360_notif_enabled",B?"true":"false"),B&&"Notification"in window&&Notification.permission==="default"&&requestNotificationPermission(),Ba(l),$("Planner preferences saved! ⚙️"),o(),X()}}}function Na(){if(document.getElementById("ci360-planner-styles"))return;const i=document.createElement("style");i.id="ci360-planner-styles",i.textContent=`
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
  `,document.head.appendChild(i)}function Oa(i){return i!==null?{comment:i,variations:[]}:{variations:[]}}function Ua(i,t,e,d,h){const g={move:i,variations:h};return t&&(g.suffix=t),e&&(g.nag=e),d!==null&&(g.comment=d),g}function Ha(...i){const[t,...e]=i;let d=t;for(const h of e)h!==null&&(d.variations=[h,...h.variations],h.variations=[],d=h);return t}function Ga(i,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){const d=e.variations[0];if(!d){e.comment=t.marker.comment;break}e=d}}return{headers:i,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Wa(i,t){function e(){this.constructor=i}e.prototype=t.prototype,i.prototype=new e}function Nt(i,t,e,d){var h=Error.call(this,i);return Object.setPrototypeOf&&Object.setPrototypeOf(h,Nt.prototype),h.expected=t,h.found=e,h.location=d,h.name="SyntaxError",h}Wa(Nt,Error);function ua(i,t,e){return e=e||" ",i.length>t?i:(t-=i.length,e+=e.repeat(t),i+e.slice(0,t))}Nt.prototype.format=function(i){var t="Error: "+this.message;if(this.location){var e=null,d;for(d=0;d<i.length;d++)if(i[d].source===this.location.source){e=i[d].text.split(/\r\n|\n|\r/g);break}var h=this.location.start,g=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(h):h,l=this.location.source+":"+g.line+":"+g.column;if(e){var n=this.location.end,K=ua("",g.line.toString().length," "),ae=e[h.line-1],P=h.line===n.line?n.column:ae.length+1,O=P-h.column||1;t+=`
 --> `+l+`
`+K+` |
`+g.line+" | "+ae+`
`+K+" | "+ua("",h.column-1," ")+ua("",O,"^")}else t+=`
 at `+l}return t};Nt.buildMessage=function(i,t){var e={literal:function(ae){return'"'+h(ae.text)+'"'},class:function(ae){var P=ae.parts.map(function(O){return Array.isArray(O)?g(O[0])+"-"+g(O[1]):g(O)});return"["+(ae.inverted?"^":"")+P.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(ae){return ae.description}};function d(ae){return ae.charCodeAt(0).toString(16).toUpperCase()}function h(ae){return ae.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(P){return"\\x0"+d(P)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(P){return"\\x"+d(P)})}function g(ae){return ae.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(P){return"\\x0"+d(P)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(P){return"\\x"+d(P)})}function l(ae){return e[ae.type](ae)}function n(ae){var P=ae.map(l),O,ee;if(P.sort(),P.length>0){for(O=1,ee=1;O<P.length;O++)P[O-1]!==P[O]&&(P[ee]=P[O],ee++);P.length=ee}switch(P.length){case 1:return P[0];case 2:return P[0]+" or "+P[1];default:return P.slice(0,-1).join(", ")+", or "+P[P.length-1]}}function K(ae){return ae?'"'+h(ae)+'"':"end of input"}return"Expected "+n(i)+" but "+K(t)+" found."};function Ka(i,t){t=t!==void 0?t:{};var e={},d=t.grammarSource,h={pgn:We},g=We,l="[",n='"',K="]",ae=".",P="O-O-O",O="O-O",ee="0-0-0",X="0-0",we="$",Fe="{",tt="}",ct=";",yt="(",Ct=")",xt="1-0",Pt="0-1",kt="1/2-1/2",He="*",bt=/^[a-zA-Z]/,St=/^[^"]/,at=/^[0-9]/,Xe=/^[.]/,be=/^[a-zA-Z1-8\-=]/,ft=/^[+#]/,Te=/^[!?]/,It=/^[^}]/,wt=/^[^\r\n]/,s=/^[ \t\r\n]/,a=je("tag pair"),o=he("[",!1),m=he('"',!1),v=he("]",!1),B=je("tag name"),G=Le([["a","z"],["A","Z"]],!1,!1),I=je("tag value"),U=Le(['"'],!0,!1),V=je("move number"),F=Le([["0","9"]],!1,!1),J=he(".",!1),x=Le(["."],!1,!1),L=je("standard algebraic notation"),oe=he("O-O-O",!1),A=he("O-O",!1),R=he("0-0-0",!1),te=he("0-0",!1),z=Le([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),S=Le(["+","#"],!1,!1),xe=je("suffix annotation"),Be=Le(["!","?"],!1,!1),Pe=je("NAG"),Ne=he("$",!1),c=je("brace comment"),b=he("{",!1),r=Le(["}"],!0,!1),u=he("}",!1),w=je("rest of line comment"),E=he(";",!1),C=Le(["\r",`
`],!0,!1),N=je("variation"),ie=he("(",!1),M=he(")",!1),Q=je("game termination marker"),T=he("1-0",!1),me=he("0-1",!1),se=he("1/2-1/2",!1),ce=he("*",!1),pe=je("whitespace"),fe=Le([" ","	","\r",`
`],!1,!1),Ce=function(k,_){return Ga(k,_)},Ee=function(k){return Object.fromEntries(k)},j=function(k,_){return[k,_]},le=function(k,_){return{root:k,marker:_}},$e=function(k,_){return Ha(Oa(k),..._.flat())},q=function(k,_,D,de,ge){return Ua(k,_,D,de,ge)},re=function(k){return k},ue=function(k){return k.replace(/[\r\n]+/g," ")},ke=function(k){return k.trim()},y=function(k){return k},W=function(k,_){return{result:k,comment:_}},p=t.peg$currPos|0,Ie=[{line:1,column:1}],Z=p,_e=t.peg$maxFailExpected||[],Y=t.peg$silentFails|0,Ge;if(t.startRule){if(!(t.startRule in h))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');g=h[t.startRule]}function he(k,_){return{type:"literal",text:k,ignoreCase:_}}function Le(k,_,D){return{type:"class",parts:k,inverted:_,ignoreCase:D}}function Ye(){return{type:"end"}}function je(k){return{type:"other",description:k}}function it(k){var _=Ie[k],D;if(_)return _;if(k>=Ie.length)D=Ie.length-1;else for(D=k;!Ie[--D];);for(_=Ie[D],_={line:_.line,column:_.column};D<k;)i.charCodeAt(D)===10?(_.line++,_.column=1):_.column++,D++;return Ie[k]=_,_}function lt(k,_,D){var de=it(k),ge=it(_),De={source:d,start:{offset:k,line:de.line,column:de.column},end:{offset:_,line:ge.line,column:ge.column}};return De}function ne(k){p<Z||(p>Z&&(Z=p,_e=[]),_e.push(k))}function nt(k,_,D){return new Nt(Nt.buildMessage(k,_),k,_,D)}function We(){var k,_,D;return k=p,_=Ke(),D=Re(),k=Ce(_,D),k}function Ke(){var k,_,D;for(k=p,_=[],D=Me();D!==e;)_.push(D),D=Me();return D=rt(),k=Ee(_),k}function Me(){var k,_,D,de,ge,De,At;return Y++,k=p,rt(),i.charCodeAt(p)===91?(_=l,p++):(_=e,Y===0&&ne(o)),_!==e?(rt(),D=Oe(),D!==e?(rt(),i.charCodeAt(p)===34?(de=n,p++):(de=e,Y===0&&ne(m)),de!==e?(ge=qe(),i.charCodeAt(p)===34?(De=n,p++):(De=e,Y===0&&ne(m)),De!==e?(rt(),i.charCodeAt(p)===93?(At=K,p++):(At=e,Y===0&&ne(v)),At!==e?k=j(D,ge):(p=k,k=e)):(p=k,k=e)):(p=k,k=e)):(p=k,k=e)):(p=k,k=e),Y--,k===e&&Y===0&&ne(a),k}function Oe(){var k,_,D;if(Y++,k=p,_=[],D=i.charAt(p),bt.test(D)?p++:(D=e,Y===0&&ne(G)),D!==e)for(;D!==e;)_.push(D),D=i.charAt(p),bt.test(D)?p++:(D=e,Y===0&&ne(G));else _=e;return _!==e?k=i.substring(k,p):k=_,Y--,k===e&&(_=e,Y===0&&ne(B)),k}function qe(){var k,_,D;for(Y++,k=p,_=[],D=i.charAt(p),St.test(D)?p++:(D=e,Y===0&&ne(U));D!==e;)_.push(D),D=i.charAt(p),St.test(D)?p++:(D=e,Y===0&&ne(U));return k=i.substring(k,p),Y--,_=e,Y===0&&ne(I),k}function Re(){var k,_,D;return k=p,_=Ze(),rt(),D=ca(),D===e&&(D=null),rt(),k=le(_,D),k}function Ze(){var k,_,D,de;for(k=p,_=Ut(),_===e&&(_=null),D=[],de=pt();de!==e;)D.push(de),de=pt();return k=$e(_,D),k}function pt(){var k,_,D,de,ge,De,At,Ft;if(k=p,rt(),Xt(),rt(),_=Zt(),_!==e){for(D=ea(),D===e&&(D=null),de=[],ge=Ot();ge!==e;)de.push(ge),ge=Ot();for(ge=rt(),De=Ut(),De===e&&(De=null),At=[],Ft=Ht();Ft!==e;)At.push(Ft),Ft=Ht();k=q(_,D,de,De,At)}else p=k,k=e;return k}function Xt(){var k,_,D,de,ge,De;for(Y++,k=p,_=[],D=i.charAt(p),at.test(D)?p++:(D=e,Y===0&&ne(F));D!==e;)_.push(D),D=i.charAt(p),at.test(D)?p++:(D=e,Y===0&&ne(F));if(i.charCodeAt(p)===46?(D=ae,p++):(D=e,Y===0&&ne(J)),D!==e){for(de=rt(),ge=[],De=i.charAt(p),Xe.test(De)?p++:(De=e,Y===0&&ne(x));De!==e;)ge.push(De),De=i.charAt(p),Xe.test(De)?p++:(De=e,Y===0&&ne(x));_=[_,D,de,ge],k=_}else p=k,k=e;return Y--,k===e&&(_=e,Y===0&&ne(V)),k}function Zt(){var k,_,D,de,ge,De;if(Y++,k=p,_=p,i.substr(p,5)===P?(D=P,p+=5):(D=e,Y===0&&ne(oe)),D===e&&(i.substr(p,3)===O?(D=O,p+=3):(D=e,Y===0&&ne(A)),D===e&&(i.substr(p,5)===ee?(D=ee,p+=5):(D=e,Y===0&&ne(R)),D===e&&(i.substr(p,3)===X?(D=X,p+=3):(D=e,Y===0&&ne(te)),D===e))))if(D=p,de=i.charAt(p),bt.test(de)?p++:(de=e,Y===0&&ne(G)),de!==e){if(ge=[],De=i.charAt(p),be.test(De)?p++:(De=e,Y===0&&ne(z)),De!==e)for(;De!==e;)ge.push(De),De=i.charAt(p),be.test(De)?p++:(De=e,Y===0&&ne(z));else ge=e;ge!==e?(de=[de,ge],D=de):(p=D,D=e)}else p=D,D=e;return D!==e?(de=i.charAt(p),ft.test(de)?p++:(de=e,Y===0&&ne(S)),de===e&&(de=null),D=[D,de],_=D):(p=_,_=e),_!==e?k=i.substring(k,p):k=_,Y--,k===e&&(_=e,Y===0&&ne(L)),k}function ea(){var k,_,D;for(Y++,k=p,_=[],D=i.charAt(p),Te.test(D)?p++:(D=e,Y===0&&ne(Be));D!==e;)_.push(D),_.length>=2?D=e:(D=i.charAt(p),Te.test(D)?p++:(D=e,Y===0&&ne(Be)));return _.length<1?(p=k,k=e):k=_,Y--,k===e&&(_=e,Y===0&&ne(xe)),k}function Ot(){var k,_,D,de,ge;if(Y++,k=p,rt(),i.charCodeAt(p)===36?(_=we,p++):(_=e,Y===0&&ne(Ne)),_!==e){if(D=p,de=[],ge=i.charAt(p),at.test(ge)?p++:(ge=e,Y===0&&ne(F)),ge!==e)for(;ge!==e;)de.push(ge),ge=i.charAt(p),at.test(ge)?p++:(ge=e,Y===0&&ne(F));else de=e;de!==e?D=i.substring(D,p):D=de,D!==e?k=re(D):(p=k,k=e)}else p=k,k=e;return Y--,k===e&&Y===0&&ne(Pe),k}function Ut(){var k;return k=Bt(),k===e&&(k=ta()),k}function Bt(){var k,_,D,de,ge;if(Y++,k=p,i.charCodeAt(p)===123?(_=Fe,p++):(_=e,Y===0&&ne(b)),_!==e){for(D=p,de=[],ge=i.charAt(p),It.test(ge)?p++:(ge=e,Y===0&&ne(r));ge!==e;)de.push(ge),ge=i.charAt(p),It.test(ge)?p++:(ge=e,Y===0&&ne(r));D=i.substring(D,p),i.charCodeAt(p)===125?(de=tt,p++):(de=e,Y===0&&ne(u)),de!==e?k=ue(D):(p=k,k=e)}else p=k,k=e;return Y--,k===e&&(_=e,Y===0&&ne(c)),k}function ta(){var k,_,D,de,ge;if(Y++,k=p,i.charCodeAt(p)===59?(_=ct,p++):(_=e,Y===0&&ne(E)),_!==e){for(D=p,de=[],ge=i.charAt(p),wt.test(ge)?p++:(ge=e,Y===0&&ne(C));ge!==e;)de.push(ge),ge=i.charAt(p),wt.test(ge)?p++:(ge=e,Y===0&&ne(C));D=i.substring(D,p),k=ke(D)}else p=k,k=e;return Y--,k===e&&(_=e,Y===0&&ne(w)),k}function Ht(){var k,_,D,de;return Y++,k=p,rt(),i.charCodeAt(p)===40?(_=yt,p++):(_=e,Y===0&&ne(ie)),_!==e?(D=Ze(),D!==e?(rt(),i.charCodeAt(p)===41?(de=Ct,p++):(de=e,Y===0&&ne(M)),de!==e?k=y(D):(p=k,k=e)):(p=k,k=e)):(p=k,k=e),Y--,k===e&&Y===0&&ne(N),k}function ca(){var k,_,D;return Y++,k=p,i.substr(p,3)===xt?(_=xt,p+=3):(_=e,Y===0&&ne(T)),_===e&&(i.substr(p,3)===Pt?(_=Pt,p+=3):(_=e,Y===0&&ne(me)),_===e&&(i.substr(p,7)===kt?(_=kt,p+=7):(_=e,Y===0&&ne(se)),_===e&&(i.charCodeAt(p)===42?(_=He,p++):(_=e,Y===0&&ne(ce))))),_!==e?(rt(),D=Ut(),D===e&&(D=null),k=W(_,D)):(p=k,k=e),Y--,k===e&&(_=e,Y===0&&ne(Q)),k}function rt(){var k,_;for(Y++,k=[],_=i.charAt(p),s.test(_)?p++:(_=e,Y===0&&ne(fe));_!==e;)k.push(_),_=i.charAt(p),s.test(_)?p++:(_=e,Y===0&&ne(fe));return Y--,_=e,Y===0&&ne(pe),k}if(Ge=g(),t.peg$library)return{peg$result:Ge,peg$currPos:p,peg$FAILED:e,peg$maxFailExpected:_e,peg$maxFailPos:Z};if(Ge!==e&&p===i.length)return Ge;throw Ge!==e&&p<i.length&&ne(Ye()),nt(_e,Z<i.length?i.charAt(Z):null,Z<i.length?lt(Z,Z+1):lt(Z,Z))}/**
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
 */const sa=0xffffffffffffffffn;function ga(i,t){return(i<<t|i>>64n-t)&0xffffffffffffffffn}function Ia(i,t){return i*t&sa}function Va(i){return function(){let t=BigInt(i&sa),e=BigInt(i>>64n&sa);const d=Ia(ga(Ia(t,5n),7n),9n);return e^=t,t=(ga(t,24n)^e^e<<16n)&sa,e=ga(e,37n),i=e<<64n|t,d}}const da=Va(0xa187eb39cdcaed8f31c4b365b102e01en),Ya=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>da()))),Ja=Array.from({length:8},()=>da()),Qa=Array.from({length:16},()=>da()),ba=da(),dt="w",vt="b",Qe="p",ya="n",la="b",Jt="r",Et="q",et="k",ma="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class oa{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){const{color:d,piece:h,from:g,to:l,flags:n,captured:K,promotion:ae}=e,P=ot(g),O=ot(l);this.color=d,this.piece=h,this.from=P,this.to=O,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=P+O,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(const ee in Se)Se[ee]&n&&(this.flags+=zt[ee]);K&&(this.captured=K),ae&&(this.promotion=ae,this.lan+=ae)}isCapture(){return this.flags.indexOf(zt.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(zt.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(zt.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(zt.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(zt.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(zt.BIG_PAWN)>-1}}const st=-1,zt={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},Se={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ka={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Xa={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Za={...ka,...Xa},ye={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},fa={b:[16,32,17,15],w:[-16,-32,-17,-15]},Aa={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},en=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],tn=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],an={p:1,n:2,b:4,r:8,q:16,k:32},nn="pnbrqkPNBRQK",_a=[ya,la,Jt,Et],on=7,rn=6,sn=1,ln=0,ia={[et]:Se.KSIDE_CASTLE,[Et]:Se.QSIDE_CASTLE},Dt={w:[{square:ye.a1,flag:Se.QSIDE_CASTLE},{square:ye.h1,flag:Se.KSIDE_CASTLE}],b:[{square:ye.a8,flag:Se.QSIDE_CASTLE},{square:ye.h8,flag:Se.KSIDE_CASTLE}]},dn={b:sn,w:rn},ha="--";function Rt(i){return i>>4}function Qt(i){return i&15}function Pa(i){return"0123456789".indexOf(i)!==-1}function ot(i){const t=Qt(i),e=Rt(i);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function Vt(i){return i===dt?vt:dt}function cn(i){const t=i.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const d=parseInt(t[4],10);if(isNaN(d)||d<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const h=t[0].split("/");if(h.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let l=0;l<h.length;l++){let n=0,K=!1;for(let ae=0;ae<h[l].length;ae++)if(Pa(h[l][ae])){if(K)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};n+=parseInt(h[l][ae],10),K=!0}else{if(!/^[prnbqkPRNBQK]$/.test(h[l][ae]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};n+=1,K=!1}if(n!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const g=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:l,regex:n}of g){if(!n.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${l} king`};if((t[0].match(n)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${l} kings`}}return Array.from(h[0]+h[7]).some(l=>l.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function pn(i,t){const e=i.from,d=i.to,h=i.piece;let g=0,l=0,n=0;for(let K=0,ae=t.length;K<ae;K++){const P=t[K].from,O=t[K].to,ee=t[K].piece;h===ee&&e!==P&&d===O&&(g++,Rt(e)===Rt(P)&&l++,Qt(e)===Qt(P)&&n++)}return g>0?l>0&&n>0?ot(e):n>0?ot(e).charAt(1):ot(e).charAt(0):""}function Tt(i,t,e,d,h,g=void 0,l=Se.NORMAL){const n=Rt(d);if(h===Qe&&(n===on||n===ln))for(let K=0;K<_a.length;K++){const ae=_a[K];i.push({color:t,from:e,to:d,piece:h,captured:g,promotion:ae,flags:l|Se.PROMOTION})}else i.push({color:t,from:e,to:d,piece:h,captured:g,flags:l})}function Da(i){let t=i.charAt(0);return t>="a"&&t<="h"?i.match(/[a-h]\d.*[a-h]\d/)?void 0:Qe:(t=t.toLowerCase(),t==="o"?et:t)}function va(i){return i.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class Ta{_board=new Array(128);_turn=dt;_header={};_kings={w:st,b:st};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=ma,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:st,b:st},this._turn=dt,this._castling={w:0,b:0},this._epSquare=st,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Za},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:d=!1}={}){let h=t.split(/\s+/);if(h.length>=2&&h.length<6){const n=["-","-","0","1"];t=h.concat(n.slice(-(6-h.length))).join(" ")}if(h=t.split(/\s+/),!e){const{ok:n,error:K}=cn(t);if(!n)throw new Error(K)}const g=h[0];let l=0;this.clear({preserveHeaders:d});for(let n=0;n<g.length;n++){const K=g.charAt(n);if(K==="/")l+=8;else if(Pa(K))l+=parseInt(K,10);else{const ae=K<"a"?dt:vt;this._put({type:K.toLowerCase(),color:ae},ot(l)),l++}}this._turn=h[1],h[2].indexOf("K")>-1&&(this._castling.w|=Se.KSIDE_CASTLE),h[2].indexOf("Q")>-1&&(this._castling.w|=Se.QSIDE_CASTLE),h[2].indexOf("k")>-1&&(this._castling.b|=Se.KSIDE_CASTLE),h[2].indexOf("q")>-1&&(this._castling.b|=Se.QSIDE_CASTLE),this._epSquare=h[3]==="-"?st:ye[h[3]],this._halfMoves=parseInt(h[4],10),this._moveNumber=parseInt(h[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,d="";for(let l=ye.a8;l<=ye.h1;l++){if(this._board[l]){e>0&&(d+=e,e=0);const{color:n,type:K}=this._board[l];d+=n===dt?K.toUpperCase():K.toLowerCase()}else e++;l+1&136&&(e>0&&(d+=e),l!==ye.h1&&(d+="/"),e=0,l+=8)}let h="";this._castling[dt]&Se.KSIDE_CASTLE&&(h+="K"),this._castling[dt]&Se.QSIDE_CASTLE&&(h+="Q"),this._castling[vt]&Se.KSIDE_CASTLE&&(h+="k"),this._castling[vt]&Se.QSIDE_CASTLE&&(h+="q"),h=h||"-";let g="-";if(this._epSquare!==st)if(t)g=ot(this._epSquare);else{const l=this._epSquare+(this._turn===dt?16:-16),n=[l+1,l-1];for(const K of n){if(K&136)continue;const ae=this._turn;if(this._board[K]?.color===ae&&this._board[K]?.type===Qe){this._makeMove({color:ae,from:K,to:this._epSquare,piece:Qe,captured:Qe,flags:Se.EP_CAPTURE});const P=!this._isKingAttacked(ae);if(this._undoMove(),P){g=ot(this._epSquare);break}}}}return[d,this._turn,h,g,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;const{color:e,type:d}=this._board[t],h={w:0,b:1}[e],g={p:0,n:1,b:2,r:3,q:4,k:5}[d];return Ya[h][g][t]}_epKey(){return this._epSquare===st?0n:Ja[this._epSquare&7]}_castlingKey(){const t=this._castling.w>>5|this._castling.b>>3;return Qa[t]}_computeHash(){let t=0n;for(let e=ye.a8;e<=ye.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=ba),t}_updateSetup(t){this._history.length>0||(t!==ma?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(ma)}get(t){return this._board[ye[t]]}findPiece(t){const e=[];for(let d=ye.a8;d<=ye.h1;d++){if(d&136){d+=7;continue}!this._board[d]||this._board[d]?.color!==t.color||this._board[d].color===t.color&&this._board[d].type===t.type&&e.push(ot(d))}return e}put({type:t,color:e},d){return this._put({type:t,color:e},d)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},d){if(nn.indexOf(t.toLowerCase())===-1||!(d in ye))return!1;const h=ye[d];if(t==et&&!(this._kings[e]==st||this._kings[e]==h))return!1;const g=this._board[h];return g&&g.type===et&&(this._kings[g.color]=st),this._set(h,{type:t,color:e}),t===et&&(this._kings[e]=h),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){const e=this.get(t);return this._clear(ye[t]),e&&e.type===et&&(this._kings[e.color]=st),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();const t=this._board[ye.e1]?.type===et&&this._board[ye.e1]?.color===dt,e=this._board[ye.e8]?.type===et&&this._board[ye.e8]?.color===vt;(!t||this._board[ye.a1]?.type!==Jt||this._board[ye.a1]?.color!==dt)&&(this._castling.w&=-65),(!t||this._board[ye.h1]?.type!==Jt||this._board[ye.h1]?.color!==dt)&&(this._castling.w&=-33),(!e||this._board[ye.a8]?.type!==Jt||this._board[ye.a8]?.color!==vt)&&(this._castling.b&=-65),(!e||this._board[ye.h8]?.type!==Jt||this._board[ye.h8]?.color!==vt)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===st)return;const t=this._epSquare+(this._turn===dt?-16:16),e=this._epSquare+(this._turn===dt?16:-16),d=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==Vt(this._turn)||this._board[e]?.type!==Qe){this._hash^=this._epKey(),this._epSquare=st;return}const h=g=>!(g&136)&&this._board[g]?.color===this._turn&&this._board[g]?.type===Qe;d.some(h)||(this._hash^=this._epKey(),this._epSquare=st)}_attacked(t,e,d){const h=[];for(let g=ye.a8;g<=ye.h1;g++){if(g&136){g+=7;continue}if(this._board[g]===void 0||this._board[g].color!==t)continue;const l=this._board[g],n=g-e;if(n===0)continue;const K=n+119;if(en[K]&an[l.type]){if(l.type===Qe){if(n>0&&l.color===dt||n<=0&&l.color===vt)if(d)h.push(ot(g));else return!0;continue}if(l.type==="n"||l.type==="k")if(d){h.push(ot(g));continue}else return!0;const ae=tn[K];let P=g+ae,O=!1;for(;P!==e;){if(this._board[P]!=null){O=!0;break}P+=ae}if(!O)if(d){h.push(ot(g));continue}else return!0}}return d?h:!1}attackers(t,e){return e?this._attacked(e,ye[t],!0):this._attacked(this._turn,ye[t],!0)}_isKingAttacked(t){const e=this._kings[t];return e===-1?!1:this._attacked(Vt(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,ye[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const t={b:0,n:0,r:0,q:0,k:0,p:0},e=[];let d=0,h=0;for(let g=ye.a8;g<=ye.h1;g++){if(h=(h+1)%2,g&136){g+=7;continue}const l=this._board[g];l&&(t[l.type]=l.type in t?t[l.type]+1:1,l.type===la&&e.push(h),d++)}if(d===2)return!0;if(d===3&&(t[la]===1||t[ya]===1))return!0;if(d===t[la]+2){let g=0;const l=e.length;for(let n=0;n<l;n++)g+=e[n];if(g===0||g===l)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:d=void 0}={}){const h=this._moves({square:e,piece:d});return t?h.map(g=>new oa(this,g)):h.map(g=>this._moveToSan(g,h))}_moves({legal:t=!0,piece:e=void 0,square:d=void 0}={}){const h=d?d.toLowerCase():void 0,g=e?.toLowerCase(),l=[],n=this._turn,K=Vt(n);let ae=ye.a8,P=ye.h1,O=!1;if(h)if(h in ye)ae=P=ye[h],O=!0;else return[];for(let X=ae;X<=P;X++){if(X&136){X+=7;continue}if(!this._board[X]||this._board[X].color===K)continue;const{type:we}=this._board[X];let Fe;if(we===Qe){if(g&&g!==we)continue;Fe=X+fa[n][0],this._board[Fe]||(Tt(l,n,X,Fe,Qe),Fe=X+fa[n][1],dn[n]===Rt(X)&&!this._board[Fe]&&Tt(l,n,X,Fe,Qe,void 0,Se.BIG_PAWN));for(let tt=2;tt<4;tt++)Fe=X+fa[n][tt],!(Fe&136)&&(this._board[Fe]?.color===K?Tt(l,n,X,Fe,Qe,this._board[Fe].type,Se.CAPTURE):Fe===this._epSquare&&Tt(l,n,X,Fe,Qe,Qe,Se.EP_CAPTURE))}else{if(g&&g!==we)continue;for(let tt=0,ct=Aa[we].length;tt<ct;tt++){const yt=Aa[we][tt];for(Fe=X;Fe+=yt,!(Fe&136);){if(!this._board[Fe])Tt(l,n,X,Fe,we);else{if(this._board[Fe].color===n)break;Tt(l,n,X,Fe,we,this._board[Fe].type,Se.CAPTURE);break}if(we===ya||we===et)break}}}}if((g===void 0||g===et)&&(!O||P===this._kings[n])){if(this._castling[n]&Se.KSIDE_CASTLE){const X=this._kings[n],we=X+2;!this._board[X+1]&&!this._board[we]&&!this._attacked(K,this._kings[n])&&!this._attacked(K,X+1)&&!this._attacked(K,we)&&Tt(l,n,this._kings[n],we,et,void 0,Se.KSIDE_CASTLE)}if(this._castling[n]&Se.QSIDE_CASTLE){const X=this._kings[n],we=X-2;!this._board[X-1]&&!this._board[X-2]&&!this._board[X-3]&&!this._attacked(K,this._kings[n])&&!this._attacked(K,X-1)&&!this._attacked(K,we)&&Tt(l,n,this._kings[n],we,et,void 0,Se.QSIDE_CASTLE)}}if(!t||this._kings[n]===-1)return l;const ee=[];for(let X=0,we=l.length;X<we;X++)this._makeMove(l[X]),this._isKingAttacked(n)||ee.push(l[X]),this._undoMove();return ee}move(t,{strict:e=!1}={}){let d=null;if(typeof t=="string")d=this._moveFromSan(t,e);else if(t===null)d=this._moveFromSan(ha,e);else if(typeof t=="object"){const g=this._moves();for(let l=0,n=g.length;l<n;l++)if(t.from===ot(g[l].from)&&t.to===ot(g[l].to)&&(!("promotion"in g[l])||t.promotion===g[l].promotion)){d=g[l];break}}if(!d)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&d.flags&Se.NULL_MOVE)throw new Error("Null move not allowed when in check");const h=new oa(this,d);return this._makeMove(d),this._incPositionCount(),h}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){const e=this._turn,d=Vt(e);if(this._push(t),t.flags&Se.NULL_MOVE){e===vt&&this._moveNumber++,this._halfMoves++,this._turn=d,this._epSquare=st;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&Se.EP_CAPTURE&&(this._turn===vt?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===et){if(this._kings[e]=t.to,t.flags&Se.KSIDE_CASTLE){const h=t.to-1,g=t.to+1;this._movePiece(g,h)}else if(t.flags&Se.QSIDE_CASTLE){const h=t.to+1,g=t.to-2;this._movePiece(g,h)}this._castling[e]=0}if(this._castling[e]){for(let h=0,g=Dt[e].length;h<g;h++)if(t.from===Dt[e][h].square&&this._castling[e]&Dt[e][h].flag){this._castling[e]^=Dt[e][h].flag;break}}if(this._castling[d]){for(let h=0,g=Dt[d].length;h<g;h++)if(t.to===Dt[d][h].square&&this._castling[d]&Dt[d][h].flag){this._castling[d]^=Dt[d][h].flag;break}}if(this._hash^=this._castlingKey(),t.flags&Se.BIG_PAWN){let h;e===vt?h=t.to-16:h=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===Qe&&this._board[t.to-1]?.color===d||!(t.to+1&136)&&this._board[t.to+1]?.type===Qe&&this._board[t.to+1]?.color===d?(this._epSquare=h,this._hash^=this._epKey()):this._epSquare=st}else this._epSquare=st;t.piece===Qe?this._halfMoves=0:t.flags&(Se.CAPTURE|Se.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===vt&&this._moveNumber++,this._turn=d,this._hash^=ba}undo(){const t=this._hash,e=this._undoMove();if(e){const d=new oa(this,e);return this._decPositionCount(t),d}return null}_undoMove(){const t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=ba;const d=this._turn,h=Vt(d);if(e.flags&Se.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:d})),e.captured)if(e.flags&Se.EP_CAPTURE){let g;d===vt?g=e.to-16:g=e.to+16,this._set(g,{type:Qe,color:h})}else this._set(e.to,{type:e.captured,color:h});if(e.flags&(Se.KSIDE_CASTLE|Se.QSIDE_CASTLE)){let g,l;e.flags&Se.KSIDE_CASTLE?(g=e.to+1,l=e.to-1):(g=e.to-2,l=e.to+1),this._movePiece(l,g)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){const d=[];let h=!1;for(const ee in this._header)this._header[ee]&&d.push(`[${ee} "${this._header[ee]}"]`+t),h=!0;h&&this._history.length&&d.push(t);const g=ee=>{const X=this._comments[this.fen()];if(typeof X<"u"){const we=ee.length>0?" ":"";ee=`${ee}${we}{${X}}`}return ee},l=[];for(;this._history.length>0;)l.push(this._undoMove());const n=[];let K="";for(l.length===0&&n.push(g(""));l.length>0;){K=g(K);const ee=l.pop();if(!ee)break;if(!this._history.length&&ee.color==="b"){const X=`${this._moveNumber}. ...`;K=K?`${K} ${X}`:X}else ee.color==="w"&&(K.length&&n.push(K),K=this._moveNumber+".");K=K+" "+this._moveToSan(ee,this._moves({legal:!0})),this._makeMove(ee)}if(K.length&&n.push(g(K)),n.push(this._header.Result||"*"),e===0)return d.join("")+n.join(" ");const ae=function(){return d.length>0&&d[d.length-1]===" "?(d.pop(),!0):!1},P=function(ee,X){for(const we of X.split(" "))if(we){if(ee+we.length>e){for(;ae();)ee--;d.push(t),ee=0}d.push(we),ee+=we.length,d.push(" "),ee++}return ae()&&ee--,ee};let O=0;for(let ee=0;ee<n.length;ee++){if(O+n[ee].length>e&&n[ee].includes("{")){O=P(O,n[ee]);continue}O+n[ee].length>e&&ee!==0?(d[d.length-1]===" "&&d.pop(),d.push(t),O=0):ee!==0&&(d.push(" "),O++),d.push(n[ee]),O+=n[ee].length}return d.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??ka[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=ka[t]||null,!0):!1}getHeaders(){const t={};for(const[e,d]of Object.entries(this._header))d!==null&&(t[e]=d);return t}loadPgn(t,{strict:e=!1,newlineChar:d=`\r?
`}={}){d!==`\r?
`&&(t=t.replace(new RegExp(d,"g"),`
`));const h=Ka(t);this.reset();const g=h.headers;let l="";for(const ae in g)ae.toLowerCase()==="fen"&&(l=g[ae]),this.header(ae,g[ae]);if(!e)l&&this.load(l,{preserveHeaders:!0});else if(g.SetUp==="1"){if(!("FEN"in g))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(g.FEN,{preserveHeaders:!0})}let n=h.root;for(;n;){if(n.move){const ae=this._moveFromSan(n.move,e);if(ae==null)throw new Error(`Invalid move in PGN: ${n.move}`);this._makeMove(ae),this._incPositionCount()}n.comment!==void 0&&(this._comments[this.fen()]=n.comment),n=n.variations[0]}const K=h.result;K&&Object.keys(this._header).length&&this._header.Result!==K&&this.setHeader("Result",K)}_moveToSan(t,e){let d="";if(t.flags&Se.KSIDE_CASTLE)d="O-O";else if(t.flags&Se.QSIDE_CASTLE)d="O-O-O";else{if(t.flags&Se.NULL_MOVE)return ha;if(t.piece!==Qe){const h=pn(t,e);d+=t.piece.toUpperCase()+h}t.flags&(Se.CAPTURE|Se.EP_CAPTURE)&&(t.piece===Qe&&(d+=ot(t.from)[0]),d+="x"),d+=ot(t.to),t.promotion&&(d+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?d+="#":d+="+"),this._undoMove(),d}_moveFromSan(t,e=!1){let d=va(t);if(e||(d==="0-0"?d="O-O":d==="0-0-0"&&(d="O-O-O")),d==ha)return{color:this._turn,from:0,to:0,piece:"k",flags:Se.NULL_MOVE};let h=Da(d),g=this._moves({legal:!0,piece:h});for(let ee=0,X=g.length;ee<X;ee++)if(d===va(this._moveToSan(g[ee],g)))return g[ee];if(e)return null;let l,n,K,ae,P,O=!1;if(n=d.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),n?(l=n[1],K=n[2],ae=n[3],P=n[4],K.length==1&&(O=!0)):(n=d.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),n&&(l=n[1],K=n[2],ae=n[3],P=n[4],K.length==1&&(O=!0))),h=Da(d),g=this._moves({legal:!0,piece:l||h}),!ae)return null;for(let ee=0,X=g.length;ee<X;ee++)if(K){if((!l||l.toLowerCase()==g[ee].piece)&&ye[K]==g[ee].from&&ye[ae]==g[ee].to&&(!P||P.toLowerCase()==g[ee].promotion))return g[ee];if(O){const we=ot(g[ee].from);if((!l||l.toLowerCase()==g[ee].piece)&&ye[ae]==g[ee].to&&(K==we[0]||K==we[1])&&(!P||P.toLowerCase()==g[ee].promotion))return g[ee]}}else if(d===va(this._moveToSan(g[ee],g)).replace("x",""))return g[ee];return null}ascii(){let t=`   +------------------------+
`;for(let e=ye.a8;e<=ye.h1;e++){if(Qt(e)===0&&(t+=" "+"87654321"[Rt(e)]+" |"),this._board[e]){const d=this._board[e].type,g=this._board[e].color===dt?d.toUpperCase():d.toLowerCase();t+=" "+g+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){const e=this._moves({legal:!1});let d=0;const h=this._turn;for(let g=0,l=e.length;g<l;g++)this._makeMove(e[g]),this._isKingAttacked(h)||(t-1>0?d+=this.perft(t-1):d++),this._undoMove();return d}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const t=[];let e=[];for(let d=ye.a8;d<=ye.h1;d++)this._board[d]==null?e.push(null):e.push({square:ot(d),type:this._board[d].type,color:this._board[d].color}),d+1&136&&(t.push(e),e=[],d+=8);return t}squareColor(t){if(t in ye){const e=ye[t];return(Rt(e)+Qt(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){const e=[],d=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){const h=e.pop();if(!h)break;t?d.push(new oa(this,h)):d.push(this._moveToSan(h,this._moves())),this._makeMove(h)}return d}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){const e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){const t=[],e={},d=h=>{h in this._comments&&(e[h]=this._comments[h])};for(;this._history.length>0;)t.push(this._undoMove());for(d(this.fen());;){const h=t.pop();if(!h)break;this._makeMove(h),d(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{const e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(const h of[et,Et])e[h]!==void 0&&(e[h]?this._castling[t]|=ia[h]:this._castling[t]&=~ia[h]);this._updateCastlingRights();const d=this.getCastlingRights(t);return(e[et]===void 0||e[et]===d[et])&&(e[Et]===void 0||e[Et]===d[Et])}getCastlingRights(t){return{[et]:(this._castling[t]&ia[et])!==0,[Et]:(this._castling[t]&ia[Et])!==0}}moveNumber(){return this._moveNumber}}async function mn(i,t={}){const e=t.currentUser||{},d=t.userRole||e?.role||"employee";let h="chat",g=[],l=null,n=[],K=[],ae=null,P=null,O=!1,ee=null,X=null,we="multiplayer",Fe="all";i.innerHTML=`
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
  `,un(),await kt(),be();const tt=i.querySelector("#tab-nav-chat"),ct=i.querySelector("#tab-nav-lounge"),yt=i.querySelector("#bonding-chat-main-wrap"),Ct=i.querySelector("#bonding-lounge-main-wrap");tt?.addEventListener("click",async()=>{h="chat",tt.classList.add("active"),ct.classList.remove("active"),yt.style.display="grid",Ct.style.display="none",be(),l&&await He(l._id)}),ct?.addEventListener("click",async()=>{h="lounge_games",ct.classList.add("active"),tt.classList.remove("active"),yt.style.display="none",Ct.style.display="block",await G()}),i.querySelector("#btn-top-new-chat")?.addEventListener("click",S),i.querySelector("#btn-top-new-group")?.addEventListener("click",xe),i.querySelector("#btn-top-challenge")?.addEventListener("click",()=>U());const xt=i.querySelector("#bonding-search-input");xt&&xt.addEventListener("input",c=>{const b=c.target.value.toLowerCase().trim();i.querySelectorAll(".bonding-channel-item").forEach(u=>{const w=u.textContent.toLowerCase();u.style.display=w.includes(b)?"flex":"none"})}),St(),new MutationObserver((c,b)=>{document.body.contains(i)||(P&&clearInterval(P),X&&clearInterval(X),b.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function kt(){try{const[c,b]=await Promise.all([Ue("/bonding/channels").catch(()=>[]),Ue("/bonding/colleagues").catch(()=>[])]);if(g=c,n=b,g.length>0){const r=localStorage.getItem("ci360_bonding_active_channel");r&&g.some(u=>u._id===r)?l=g.find(u=>u._id===r):l||(l=g.find(u=>u.name.includes("Lounge"))||g[0])}at(),l&&await He(l._id)}catch(c){console.error("Failed to load bonding data",c)}}async function He(c,b=!1){if(c)try{localStorage.setItem("ci360_bonding_active_channel",c),K=await Ue(`/bonding/channels/${c}/messages`),b?v():B()}catch(r){console.error("Failed to load messages",r)}}let bt=0;function St(){P&&clearInterval(P),P=setInterval(async()=>{try{if(!document.body.contains(i)){clearInterval(P);return}if(bt++,bt%2===0){const c=await Ue("/bonding/channels").catch(()=>null);c&&JSON.stringify(c.map(b=>b._id+b.lastMessage?.sentAt))!==JSON.stringify(g.map(b=>b._id+b.lastMessage?.sentAt))&&(g=c,at())}h==="chat"&&l?await He(l._id,!0):h==="lounge_games"&&await G(!0)}catch{}},3e3)}function at(){const c=i.querySelector("#bonding-group-list"),b=i.querySelector("#bonding-direct-list");if(!c||!b)return;const r=g.filter(w=>w.type==="group"),u=g.filter(w=>w.type==="direct");if(r.length===0)c.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const w=e?._id||e?.id,E=d==="superadmin"||e?.role==="superadmin";c.innerHTML=r.map(C=>{const N=l&&l._id===C._id,M=C.createdBy&&C.createdBy.userId&&String(C.createdBy.userId)===String(w)||E;return`
          <div class="bonding-channel-item ${N?"active":""}" data-channel-id="${C._id}">
            <div class="bonding-channel-icon">${C.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${f(C.name)}</div>
              <div class="bonding-channel-preview">${f(C.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${M?`
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
        `}).join("")}u.length===0?b.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':b.innerHTML=u.map(w=>{const E=l&&l._id===w._id,C=w.displayName||w.name||"Colleague",N=C.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${E?"active":""}" data-channel-id="${w._id}">
            <div class="bonding-channel-avatar">${N}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${f(C)}</div>
              <div class="bonding-channel-preview">${f(w.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${w._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),Xe()}function Xe(){const c=i.querySelectorAll(".bonding-channel-item");c.forEach(b=>{b.onclick=async r=>{if(r.target.closest(".bonding-channel-del-btn")||r.target.closest(".bonding-channel-leave-btn"))return;const u=b.dataset.channelId,w=g.find(E=>E._id===u);w&&(l=w,c.forEach(E=>E.classList.remove("active")),b.classList.add("active"),be(),await He(w._id))}}),i.querySelectorAll(".bonding-channel-leave-btn").forEach(b=>{b.onclick=async r=>{r.stopPropagation();const u=b.dataset.channelId,E=g.find(C=>C._id===u)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${E}"?`))try{b.disabled=!0,await Ae(`/bonding/channels/${u}/leave`,{}),$(`You left "${E}"`,"info"),g=g.filter(C=>C._id!==u),l&&l._id===u&&(l=g.find(C=>C.type==="group")||g[0]||null,be(),l&&await He(l._id)),at()}catch(C){$(C.message||"Failed to leave group","error"),b.disabled=!1}}}),i.querySelectorAll(".bonding-channel-del-btn").forEach(b=>{b.onclick=async r=>{r.stopPropagation();const u=b.dataset.channelId,w=g.find(N=>N._id===u),E=w&&w.type==="direct",C=E?"this 1-on-1 chat":`the group "${w?.name||""}"`;if(confirm(`Are you sure you want to delete ${C}? All messages will be permanently removed.`))try{b.disabled=!0,await gt(`/bonding/channels/${u}`),$(E?"1-on-1 chat deleted":"Group deleted","success"),g=g.filter(N=>N._id!==u),l&&l._id===u&&(l=g[0]||null,be(),l&&await He(l._id)),at()}catch(N){$(N.message||"Failed to delete conversation","error"),b.disabled=!1}}}),i.querySelector("#btn-create-group")?.addEventListener("click",xe),i.querySelector("#btn-new-direct-chat")?.addEventListener("click",S)}function be(){const c=i.querySelector("#bonding-chat-panel");if(!c)return;if(!l){c.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const b=f(l.displayName||l.name),r=(l.members||[]).length,u=l.type==="group",w=e?._id||e?.id,E=u?null:(l.members||[]).find(M=>M.userId?.toString()!==w?.toString()),C=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(w),N=d==="superadmin"||e?.role==="superadmin",ie=C||N;c.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${u?l.avatar||"👥":"👤"}</div>
          <div>
            <div class="bonding-chat-title">${b}</div>
            <div class="bonding-chat-sub">
              ${u?`<span>${r} members</span> · <span>${f(l.description||"Public Lounge")}</span>`:'<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>'}
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

          ${u?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${r})</span>
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
        ${ft()}
      </div>

      <div class="bonding-chat-input-bar">
        <button class="bonding-input-action-btn" id="btn-quick-emoji" title="Insert Emoji">
          <span>😀</span>
        </button>
        <button class="bonding-input-action-btn" id="btn-input-challenge" title="Send Multiplayer Challenge">
          <span>🎮</span>
        </button>
        <input
          type="text"
          id="bonding-message-input"
          class="bonding-input-field"
          placeholder="Type a message or challenge to a game... (Press Enter to send)"
          autocomplete="off"
        />
        <button class="bonding-send-btn" id="btn-send-message">
          <span>Send</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `,It(E),wt(E),s(),m()}function ft(){if(!K||K.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const c=e?._id||e?.id;return K.map(b=>{const r=b.sender&&b.sender.userId&&c&&b.sender.userId.toString()===c.toString();if(b.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${b._id}">
            <span>ℹ️</span> <span>${f(b.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${b._id}" title="Delete Message">&times;</button>
          </div>
        `;if(b.type==="challenge"&&b.challengeData){const C=b.challengeData,N=C.gameTitle||"Game Challenge",ie=C.gameType||"dotsboxes",M=ie==="dotsboxes"?"⏹️":ie==="ludo"?"🎲":ie==="chess"?"♟️":"❌",Q=C.gameState?.invitationId,T=C.targetUserId?.toString(),me=b.sender?.userId?.toString(),se=c&&T===c.toString(),ce=c&&me===c.toString();return`
          <div class="bonding-msg-row ${r?"self":"other"}" data-msg-id="${b._id}">
            <div class="bonding-msg-avatar" title="${f(b.sender?.name||"Teammate")}">
              ${(b.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${f(b.sender?.name||"Teammate")}</span>
                <span class="bonding-msg-time">${Ne(b.createdAt)}</span>
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
                  <div class="game-bubble-icon">${M}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${f(N)}</h4>
                    <p class="game-bubble-desc">${f(b.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${C.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':C.status==="active"||C.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':C.status==="declined"?'<span class="badge red">❌ Challenge Declined</span>':C.status==="cancelled"?'<span class="badge gray">🚫 Challenge Cancelled</span>':`<span class="badge gray">${f(C.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${C.status==="pending"&&se?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${Q}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${Q}" data-action="decline">
                        Decline
                      </button>
                    `:C.status==="pending"&&ce?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${Q}" data-action="cancel">
                          Cancel
                        </button>
                      `:C.status==="declined"||C.status==="cancelled"?`
                        <div class="game-pending-text" style="font-size:11.5px;color:var(--text-3);font-style:italic;">
                          ${C.status==="declined"?"Challenge was declined":"Challenge was cancelled"}
                        </div>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-match-id="${C.gameState?.matchId||""}" data-invite-id="${Q||""}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${Te(b)}
            </div>
          </div>
        `}const u=f(b.sender?.name||"Teammate"),w=Ne(b.createdAt),E=Te(b);return`
        <div class="bonding-msg-row ${r?"self":"other"}" data-msg-id="${b._id}">
          <div class="bonding-msg-avatar" title="${u}">${u.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${u}</span>
              <span class="bonding-msg-time">${w}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${b._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${f(b.content).replace(/\n/g,"<br/>")}
            </div>
            ${E}
          </div>
        </div>
      `}).join("")}function Te(c){return`
      <div class="bonding-reactions-row">
        ${(c.reactions||[]).map(u=>{const w=e?._id||e?.id;return`
        <button class="bonding-rxn-tag ${(u.users||[]).some(C=>C.toString()===w?.toString())?"active":""}" data-msg-id="${c._id}" data-emoji="${u.emoji}">
          <span>${u.emoji}</span> <span>${u.users?u.users.length:1}</span>
        </button>
      `}).join("")}
        <button class="bonding-add-rxn-btn" data-msg-id="${c._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `}function It(c){const b=i.querySelector("#btn-chat-challenge");b&&(b.onclick=()=>{c?U(null,c.userId||c._id):U()});const r=i.querySelector("#btn-manage-members");r&&(r.onclick=R);const u=i.querySelector("#btn-delete-group");u&&(u.onclick=z);const w=i.querySelector("#btn-leave-group");w&&(w.onclick=te);const E=i.querySelector("#btn-delete-direct");E&&(E.onclick=async()=>{if(l&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{E.disabled=!0,await gt(`/bonding/channels/${l._id}`),$("1-on-1 chat deleted successfully","success");const N=l._id;g=g.filter(ie=>ie._id!==N),l=g[0]||null,at(),be(),l&&await He(l._id)}catch(N){$(N.message||"Could not delete 1-on-1 chat","error"),E.disabled=!1}});const C=i.querySelector("#btn-clear-chat");C&&(C.onclick=async()=>{if(l&&confirm("Are you sure you want to clear all messages in this conversation?"))try{C.disabled=!0,await gt(`/bonding/channels/${l._id}/messages`),$("Chat messages cleared","success"),K=[],B()}catch(N){$(N.message||"Could not clear chat messages","error")}finally{C.disabled=!1}})}function wt(c){const b=i.querySelector("#bonding-message-input"),r=i.querySelector("#btn-send-message"),u=i.querySelector("#btn-quick-emoji"),w=i.querySelector("#btn-input-challenge");b&&b.addEventListener("keydown",E=>{E.key==="Enter"&&!E.shiftKey&&(E.preventDefault(),a())}),r&&(r.onclick=a),w&&(w.onclick=()=>{c?U(null,c.userId||c._id):U()}),u&&(u.onclick=E=>{E.stopPropagation(),b&&Be(u,C=>{const N=b.selectionStart??b.value.length,ie=b.selectionEnd??b.value.length,M=b.value;b.value=M.substring(0,N)+C+M.substring(ie),b.focus();const Q=N+C.length;try{b.setSelectionRange(Q,Q)}catch{}})})}function s(){i.querySelectorAll(".btn-respond-invite").forEach(u=>{u.onclick=async()=>{const w=u.dataset.inviteId,E=u.dataset.action;await V(w,E)}}),i.querySelectorAll(".btn-launch-match-from-card").forEach(u=>{u.onclick=async()=>{const w=u.dataset.matchId,E=u.dataset.inviteId;if(w){F(w);return}try{u.disabled=!0;const C=await Ue("/bonding/invitations"),ie=(C.incoming||[]).concat(C.sent||[]).find(T=>T._id===E||T.matchId&&T.matchId.toString()===E);if(ie&&ie.matchId){F(ie.matchId);return}const Q=(await Ue("/bonding/matches").catch(()=>[])||[]).find(T=>T.invitationId===E||T._id===E);if(Q){F(Q._id);return}$("Match has not started yet or has finished","warning")}catch(C){$(C.message||"Could not load match","error")}finally{u.disabled=!1}}}),i.querySelectorAll(".bonding-msg-del-btn").forEach(u=>{u.onclick=async w=>{w.stopPropagation();const E=u.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{u.disabled=!0,await gt(`/bonding/messages/${E}`),K=K.filter(C=>C._id!==E),v(),$("Message deleted","success")}catch(C){$(C.message||"Failed to delete message","error"),u.disabled=!1}}}),i.querySelectorAll(".bonding-rxn-tag").forEach(u=>{u.onclick=async()=>{const w=u.dataset.msgId,E=u.dataset.emoji;await o(w,E)}}),i.querySelectorAll(".bonding-add-rxn-btn").forEach(u=>{u.onclick=w=>{const E=u.dataset.msgId;Pe(w.currentTarget,async C=>{await o(E,C)})}})}async function a(){const c=i.querySelector("#bonding-message-input");if(!c||!l||O)return;const b=c.value.trim();if(b)try{O=!0,c.value="";const r=await Ae(`/bonding/channels/${l._id}/messages`,{content:b,type:"text"});K.push(r),B(),m()}catch(r){$(r.message||"Failed to send message","error")}finally{O=!1,c.focus()}}async function o(c,b){try{const r=await Ae(`/bonding/messages/${c}/react`,{emoji:b}),u=K.find(w=>w._id===c);u&&(u.reactions=r,v())}catch(r){$(r.message||"Failed to react","error")}}function m(){const c=i.querySelector("#bonding-messages-feed");c&&(c.scrollTop=c.scrollHeight)}function v(){const c=i.querySelector("#bonding-messages-feed");if(!c)return;const b=c.scrollHeight-c.scrollTop<=c.clientHeight+80;c.innerHTML=ft(),s(),b&&m()}function B(){const c=i.querySelector("#bonding-messages-feed");c&&(c.innerHTML=ft(),s())}async function G(c=!1){const b=i.querySelector("#bonding-lounge-main-wrap");if(b){c||(b.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const r=await Ue("/bonding/games/overview");ae=r;let u={leaderboard:[],myBests:[]};if(we==="arcade")try{u=await Ue("/bonding/arcade/leaderboard?gameId="+Fe)}catch(T){console.error("Failed to load arcade data:",T)}const w=r.myStats||{},E=r.availableGames||[],C=r.incomingChallenges||[],N=r.sentChallenges||[],ie=r.activeMatches||[],M=r.recentMatches||[],Q=e?._id||e?.id;b.innerHTML=`
        <div class="lounge-container">
          <!-- Segmented Navigation: Multiplayer vs Single-Player Arcade -->
          <div class="lounge-tab-nav-bar" style="display:flex;gap:10px;margin-bottom:20px;border-bottom:1px solid var(--border-sm);padding-bottom:14px;flex-wrap:wrap;">
            <button class="lounge-subtab-btn ${we==="multiplayer"?"active":""}" data-subtab="multiplayer" style="padding:9px 20px;border-radius:var(--r-md);font-weight:700;font-size:13px;display:inline-flex;align-items:center;gap:8px;border:none;cursor:pointer;background:${we==="multiplayer"?"var(--brand-600)":"var(--bg-surface)"};color:${we==="multiplayer"?"#fff":"var(--text-2)"};box-shadow:${we==="multiplayer"?"0 2px 8px rgba(99,102,241,0.3)":"none"};">
              <span>⚔️</span> <span>Multiplayer Duels (Dots & Boxes, Ludo, Tic-Tac-Toe)</span>
            </button>
            <button class="lounge-subtab-btn ${we==="arcade"?"active":""}" data-subtab="arcade" style="padding:9px 20px;border-radius:var(--r-md);font-weight:700;font-size:13px;display:inline-flex;align-items:center;gap:8px;border:none;cursor:pointer;background:${we==="arcade"?"var(--brand-600)":"var(--bg-surface)"};color:${we==="arcade"?"#fff":"var(--text-2)"};box-shadow:${we==="arcade"?"0 2px 8px rgba(99,102,241,0.3)":"none"};">
              <span>🕹️</span> <span>Single-Player Arcade & Leaderboard 🏆</span>
            </button>
          </div>

          ${we==="arcade"?J(u,Q):`
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
              ${E.map(T=>`
                <div class="lounge-game-card" data-game-id="${T.id}">
                  <div class="game-card-icon">${T.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${f(T.name)}</h4>
                    <p class="game-card-desc">${f(T.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${T.duration}</span>
                      ${T.id==="ludo"||T.id==="dotsboxes"?`<span class="meta-pill">👥 Up to 4 Players</span><span class="meta-pill">${T.id==="dotsboxes"?"⏹️ 16 Boxes Grid":"🎯 4 Pawns / Base"}</span>`:'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${T.id}" data-game-title="${f(T.name)}">
                    ${T.id==="dotsboxes"?"⚔️ Play Dots & Boxes (2P–4P)":T.id==="ludo"?"⚔️ Play Ludo (2P–4P)":"⚔️ Challenge Employee"}
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
                <span class="badge blue">${C.length+N.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${C.length})</h5>
              ${C.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${C.map(T=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(T.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${f(T.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${f(T.sender.name)}</strong> (${f(T.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${T._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${T._id}" data-action="decline">
                            Decline
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

              <!-- Sent -->
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${N.length})</h5>
              ${N.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${N.map(T=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(T.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${f(T.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${f(T.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${T._id}" data-action="cancel">
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
                <span class="badge green">${ie.length} Live</span>
              </div>

              ${ie.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${ie.map(T=>{const se=(T.players||T.gameState?.players||[T.player1,T.player2].filter(Boolean)).filter(Ce=>Ce.userId&&Ce.userId.toString()!==Q?.toString()),ce=T.player1?.userId?.toString()===Q?.toString()?T.player2:T.player1,pe=se.length>0?se.map(Ce=>f(Ce.name)).join(", "):ce?.name?f(ce.name):"Colleagues",fe=Q&&T.currentTurnUserId&&T.currentTurnUserId.toString()===Q.toString();return`
                        <div class="lounge-active-match-card ${fe?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${T.gameType==="dotsboxes"?"⏹️":T.gameType==="ludo"?"🎲":T.gameType==="chess"?"♟️":"❌"}</span>
                            <div>
                              <div class="match-game-title">${f(T.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${pe}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${fe?"my-turn":"wait"}">
                              ${fe?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${T._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${T._id}" title="Delete Match">
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
              ${M.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${M.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${M.map(T=>{const se=Q&&T.player1.userId.toString()===Q.toString()?T.player2:T.player1,ce=Q&&T.winnerId&&T.winnerId.toString()===Q.toString(),pe=T.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${f(T.gameTitle)}</span>
                          <span class="recent-date">${Ne(T.completedAt||T.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${T._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${f(se.name)}</strong></div>
                          <div class="recent-outcome ${ce?"win":pe?"draw":"loss"}">
                            ${ce?"🏆 VICTORY":pe?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${f(T.winningReason||T.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${T._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${T._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        `}
        </div>
      `,I()}catch(r){b.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${f(r.message)}</p>
        </div>
      `}}}function I(){i.querySelectorAll(".lounge-subtab-btn").forEach(b=>{b.onclick=async()=>{we=b.dataset.subtab,await G()}}),i.querySelectorAll(".arcade-filter-pill").forEach(b=>{b.onclick=async()=>{Fe=b.dataset.filter,await G()}}),i.querySelectorAll(".btn-play-arcade").forEach(b=>{b.onclick=()=>{const r=b.dataset.game;x(r)}}),i.querySelectorAll(".btn-challenge-game").forEach(b=>{b.onclick=()=>{const r=b.dataset.gameId;U(r)}}),i.querySelectorAll(".btn-respond-invite").forEach(b=>{b.onclick=async()=>{const r=b.dataset.inviteId,u=b.dataset.action;await V(r,u),await G()}}),i.querySelectorAll(".btn-resume-match").forEach(b=>{b.onclick=()=>{const r=b.dataset.matchId;F(r)}}),i.querySelectorAll(".btn-recent-rematch").forEach(b=>{b.onclick=async()=>{const r=b.dataset.matchId;try{b.disabled=!0;const u=await Ae(`/bonding/matches/${r}/action`,{action:"rematch"});u.match&&($("Rematch created! Opening arena ⚔️","success"),F(u.match._id))}catch(u){$(u.message||"Could not start rematch","error")}finally{b.disabled=!1}}}),i.querySelectorAll(".btn-delete-match").forEach(b=>{b.onclick=async r=>{r.stopPropagation();const u=b.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{b.disabled=!0,await gt(`/bonding/matches/${u}`),$("Match deleted successfully","success"),await G()}catch(w){$(w.message||"Failed to delete match","error")}finally{b.disabled=!1}}});const c=i.querySelector("#btn-clear-matches");c&&(c.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{c.disabled=!0,await gt("/bonding/matches?filter=completed"),$("Completed matches history cleared","success"),await G()}catch(b){$(b.message||"Failed to clear matches","error")}finally{c.disabled=!1}})}function U(c=null,b=null){const r=i.querySelector("#bonding-modals-root"),u=e?._id||e?.id,w=new Set(["employee","admin","superadmin"]),E=n.filter(se=>!se.isSelf&&se._id.toString()!==u?.toString()&&w.has(se.role));let C=c||"dotsboxes",N=b?b.toString():null,ie=2,M=N?[N]:[],Q="none";function T(){const se=E.find(Ce=>Ce._id.toString()===N),ce=C==="dotsboxes"||C==="ludo",pe=ie-1,fe=M.length===pe;r.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${C==="dotsboxes"?"Play Dots & Boxes (2P, 3P, 4P)":C==="ludo"?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${C==="dotsboxes"?"active":""}" data-game="dotsboxes">
                    <span>⏹️</span> <span>Dots & Boxes</span>
                  </button>
                  <button class="game-pill-btn ${C==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                  <button class="game-pill-btn ${C==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                </div>
              </div>

              <!-- MULTIPLAYER: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${ce?`
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
                  ${ce?`Step ${ce?3:2} — Select Colleagues to Play With (${M.length}/${pe} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${E.map(Ce=>{const Ee=ce?M.includes(Ce._id.toString()):N===Ce._id.toString();return`
                      <div class="eligible-emp-item ${Ee?"selected":""}" data-user-id="${Ce._id}">
                        <div class="emp-item-avatar">${Ce.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${f(Ce.name)}</span>
                          <span class="emp-item-role">${f(Ce.role==="superadmin"?"Superadmin":Ce.role==="admin"?"Admin":"Employee")} · ${f(Ce.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${Ee?"active":""}">
                          ${Ee?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${C==="dotsboxes"?`⏹️ Dots & Boxes (${ie} Players)`:C==="ludo"?`🎲 Ludo (${ie} Players · 4 Pawns)`:"❌ Tic-Tac-Toe Challenge"}</div>
                  ${ce?`
                    <div><strong>Opponents:</strong> ${M.length>0?M.map(Ce=>{const Ee=E.find(j=>j._id.toString()===Ce);return Ee?`<strong>${f(Ee.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+pe+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${se?`<strong>${f(se.name)}</strong> (${f(se.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(ce?!fe:!N)?"disabled":""}>
                ${C==="dotsboxes"?`Start ${ie}P Dots & Boxes ⏹️`:C==="ludo"?`Start ${ie}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,me()}function me(){r.querySelector(".bonding-modal-close").onclick=()=>{r.innerHTML=""},r.querySelector("#btn-cancel-challenge-flow").onclick=()=>{r.innerHTML=""},r.querySelectorAll(".game-pill-btn").forEach(pe=>{pe.onclick=()=>{C=pe.dataset.game,T()}}),r.querySelectorAll(".ludo-mode-btn").forEach(pe=>{pe.onclick=()=>{ie=Number(pe.dataset.count),M=M.slice(0,ie-1),T()}});const se=r.querySelector("#flow-emp-search");se&&(se.oninput=pe=>{const fe=pe.target.value.toLowerCase().trim();r.querySelectorAll(".eligible-emp-item").forEach(Ce=>{const Ee=Ce.textContent.toLowerCase();Ce.style.display=Ee.includes(fe)?"flex":"none"})}),r.querySelectorAll(".eligible-emp-item").forEach(pe=>{pe.onclick=()=>{const fe=pe.dataset.userId;if(C==="dotsboxes"||C==="ludo"){const Ee=ie-1;M.includes(fe)?M=M.filter(j=>j!==fe):M.length<Ee?M.push(fe):M[Ee-1]=fe}else N=fe;T()}});const ce=r.querySelector("#btn-submit-challenge-flow");ce&&(ce.onclick=async()=>{if(C==="dotsboxes"){const pe=ie-1;if(M.length<pe){$(`Please select ${pe} colleague(s) to play with`,"warning");return}try{ce.disabled=!0,ce.textContent="Launching Dots & Boxes...";const fe=await Ae("/bonding/matches/instant-dotsboxes",{playerCount:ie,targetUserIds:M});r.innerHTML="",$(`Dots & Boxes match started (${ie} Players)! ⏹️`,"success"),fe&&fe._id&&F(fe._id)}catch(fe){$(fe.message||"Failed to start Dots & Boxes match","error"),ce.disabled=!1,ce.textContent=`Start ${ie}P Dots & Boxes ⏹️`}return}if(C==="ludo"){const pe=ie-1;if(M.length<pe){$(`Please select ${pe} colleague(s) to play with`,"warning");return}try{ce.disabled=!0,ce.textContent="Launching Match...";const fe=await Ae("/bonding/matches/instant-ludo",{playerCount:ie,targetUserIds:M});r.innerHTML="",$(`Ludo match started (${ie} Players)! 🎲`,"success"),fe&&fe._id&&F(fe._id)}catch(fe){$(fe.message||"Failed to start Ludo match","error"),ce.disabled=!1,ce.textContent=`Start ${ie}P Ludo Match 🎲`}return}if(!N){$("Please select an employee to challenge","warning");return}try{ce.disabled=!0,ce.textContent="Sending Challenge...",await Ae("/bonding/invitations",{gameType:C,targetUserId:N,matchSettings:{timerMode:Q},channelId:null}),$("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),r.innerHTML="",await loadChannels();const pe=g.find(fe=>fe.type==="direct"&&fe.members?.some(Ce=>(Ce.userId||Ce._id)?.toString()===N));pe?selectChannel(pe):l&&await He(l._id),h==="lounge_games"&&await G()}catch(pe){$(pe.message||"Could not send challenge","error"),ce.disabled=!1,ce.textContent="Send Challenge 🚀"}})}T()}async function V(c,b){if(!(!c||!b))try{const r=await ra(`/bonding/invitations/${c}/respond`,{action:b});b==="accept"?($("Challenge accepted! Entering match arena ⚔️","success"),r.match&&F(r.match._id)):b==="decline"?($("Challenge declined","info"),i.querySelectorAll(`[data-invite-id="${c}"]`).forEach(u=>{const w=u.closest(".lounge-invite-item")||u.closest(".bonding-msg-row");w&&w.remove()})):b==="cancel"&&($("Challenge cancelled","info"),i.querySelectorAll(`[data-invite-id="${c}"]`).forEach(u=>{const w=u.closest(".lounge-invite-item")||u.closest(".bonding-msg-row");w&&w.remove()})),l&&await He(l._id),h==="lounge_games"&&await G()}catch(r){$(r.message||"Action failed","error")}}async function F(c){if(!c)return;ee=c,X&&clearInterval(X);const b=i.querySelector("#bonding-modals-root");let r=null,u=null,w=[],E="",C=null,N=!1,ie=!1,M=0;function Q(j){return j?JSON.stringify({status:j.status,turn:j.currentTurnUserId?.toString(),turnColor:j.turn,movesCount:j.moves?.length,dice:j.gameState?.dice,rolled:j.gameState?.rolled,lastRoll:j.gameState?.lastRoll,lastRollColor:j.gameState?.lastRollColor,lastRollBy:j.gameState?.lastRollBy,lastActionText:j.gameState?.lastActionText,tokens:j.gameState?.tokens,board:j.gameState?.board,grid:j.gameState?.grid,fen:j.gameState?.fen,hLines:j.gameState?.hLines,vLines:j.gameState?.vLines,boxes:j.gameState?.boxes,scores:j.gameState?.scores,draw:j.drawOfferedBy?.toString(),rematchOfferedBy:j.rematchOfferedBy?.toString(),rematchDeclined:!!j.rematchDeclined}):""}async function T(){try{return r=await Ue(`/bonding/matches/${c}`),r}catch(j){return $(j.message||"Could not load match","error"),me(),null}}if(r=await T(),!r)return;E=Q(r);function me(){X&&clearInterval(X),C&&clearTimeout(C),N=!1,ee=null,b.innerHTML="",h==="lounge_games"&&G(!0),l&&He(l._id,!0)}X=setInterval(async()=>{if(!ee||ee!==c){clearInterval(X);return}if(!(ie&&Date.now()-M<2500))try{const j=await Ue(`/bonding/matches/${c}`);if(!j)return;const le=Q(j);if(le!==E){if(E=le,r=j,j.rematchDeclined){$("Rematch was declined","info"),me();return}se()}}catch{}},800);function se(){if(!r)return;const j=e?._id||e?.id,le=j&&r.player1.userId.toString()===j.toString(),$e=le?r.player1:r.player2,q=le?r.player2:r.player1,re=j&&r.currentTurnUserId&&r.currentTurnUserId.toString()===j.toString(),ue=r.status!=="active";b.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${r.gameType==="ludo"?"🎲":r.gameType==="dotsboxes"?"⏹️":r.gameType==="chess"?"♟️":"❌"}</span>
                <div>
                  <h3 class="arena-title">${f(r.gameTitle)}</h3>
                  ${(r.gameType==="ludo"||r.gameType==="dotsboxes")&&r.gameState?.players?`
                    <div class="arena-players-vs ludo-players-wrap">
                      ${r.gameState.players.map(ke=>{const y=ke.userId&&ke.userId.toString()===j?.toString(),W={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵",amber:"🟠"}[ke.color]||"⚪",p=(r.gameState?.turnColor||r.turn)===ke.color;return`
                          <span class="player-tag ${y?"self":"opp"} ${p?"turn-active":""}">
                            ${W} <strong>${f(ke.name)}</strong> ${y?"(You)":""}
                          </span>
                        `}).join('<span class="vs-pill">vs</span>')}
                    </div>
                  `:`
                    <div class="arena-players-vs">
                      <span class="player-tag self">${f($e.name)} (You · <strong>${r.gameType==="ludo"?$e.assignedRole==="red"?"🔴 Red":"🟢 Green":r.gameType==="tictactoe"?$e.assignedRole==="X"?"✕":"◯":$e.assignedRole}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${f(q.name)} (<strong>${r.gameType==="ludo"?q.assignedRole==="red"?"🔴 Red":"🟢 Green":r.gameType==="tictactoe"?q.assignedRole==="X"?"✕":"◯":q.assignedRole}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${ue?"ended":re?"my-turn":"opp-turn"}">
                ${ue?`<span>🏁 Finished (${f(r.winningReason||r.status)})</span>`:re?"<span>⚡ YOUR TURN</span>":`<span>⏳ Waiting for ${f(q.name)}...</span>`}
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${r.gameType==="ludo"?re?r.gameState?.rolled?"👉 Click one of your glowing tokens to advance!":"🎲 Your turn! Tap the dice to roll.":"⏳ Opponent is rolling/moving their tokens...":r.gameType==="tictactoe"?re?"👉 Tap any open cell to place your symbol!":"⏳ Opponent is deciding their move...":re?"👉 Click your piece, then click a green target dot to move!":"⏳ Opponent is thinking..."}
              </div>
              <div class="arena-action-btns">
                ${ue?"":`
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                `}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${r.drawOfferedBy&&r.drawOfferedBy.toString()!==j?.toString()&&!ue?`
              <div class="arena-draw-offer-banner">
                <span>🤝 ${f(q.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            `:""}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${r.gameType==="dotsboxes"?ce(le):""}
              ${r.gameType==="chess"?pe(le):""}
              ${r.gameType==="tictactoe"?fe():""}
              ${r.gameType==="ludo"?Ce(le):""}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${ue?`
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${r.winnerId&&r.winnerId.toString()===j?.toString()?"🏆":r.status==="draw"?"🤝":"🎖️"}</div>
                <div class="game-over-text">
                  <h4>${r.winnerId&&r.winnerId.toString()===j?.toString()?"VICTORY!":r.status==="draw"?"STALEMATE / DRAW":`${f(r.winnerName)} Wins!`}</h4>
                  <p>Reason: ${f(r.winningReason||"Match concluded")}</p>
                </div>
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                  ${r.rematchOfferedBy&&r.rematchOfferedBy.toString()===j?.toString()?`
                    <div class="game-pending-text" style="font-size:12px;color:var(--text-2);padding:6px 12px;background:var(--bg-surface);border-radius:var(--r-md);border:1px solid var(--border-sm);">
                      ⏳ Rematch requested. Waiting for opponent...
                    </div>
                  `:r.rematchOfferedBy?`
                    <button class="btn-arena-rematch" id="btn-arena-accept-rematch" style="background:#10b981;border-color:#10b981;">
                      ✅ Accept Rematch
                    </button>
                    <button class="btn-arena-action" id="btn-arena-decline-rematch" style="border:1px solid var(--border-sm);">
                      ❌ Decline
                    </button>
                  `:`
                    <button class="btn-arena-rematch" id="btn-arena-rematch-action">
                      🔄 Request Rematch
                    </button>
                  `}
                  <button class="btn-arena-action danger" id="btn-arena-delete-match-ended">
                    🗑️ Delete Match
                  </button>
                </div>
              </div>
            `:""}
          </div>
        </div>
      `,Ee(re,le,$e)}function ce(j,le,$e){const q=r.gameState||{},re=q.rows||4,ue=q.cols||4,ke=q.players||[{...r.player1,color:"red",assignedRole:"red"},{...r.player2,color:"blue",assignedRole:"blue"}],y=q.activeColors||["red","blue"],W=r.turn||q.turnColor||"red",p=e?._id||e?.id,Z=(ke.find(ne=>ne.userId&&ne.userId.toString()===p?.toString())||ke[0])?.color||(j?"red":"blue"),_e=Z===W&&r.status==="active",Y=q.scores||{red:0,blue:0,green:0,amber:0},Ge=q.hLines||Array(re+1).fill(null).map(()=>Array(ue).fill(null)),he=q.vLines||Array(re).fill(null).map(()=>Array(ue+1).fill(null)),Le=q.boxes||Array(re).fill(null).map(()=>Array(ue).fill(null)),Ye={red:{name:"Red",hex:"#ef4444",light:"rgba(239,68,68,0.18)",border:"#f87171"},blue:{name:"Blue",hex:"#3b82f6",light:"rgba(59,130,246,0.18)",border:"#60a5fa"},green:{name:"Green",hex:"#10b981",light:"rgba(16,185,129,0.18)",border:"#34d399"},amber:{name:"Amber",hex:"#f59e0b",light:"rgba(245,158,11,0.18)",border:"#fbbf24"}},je=ke.find(ne=>ne.color===W),it=je?f(je.name):W.toUpperCase();let lt=[];for(let ne=0;ne<=re*2;ne++)for(let nt=0;nt<=ue*2;nt++){const We=ne%2===0,Ke=nt%2===0;if(We&&Ke)lt.push(`
              <div class="dots-cell dot-intersection" data-r="${ne/2}" data-c="${nt/2}">
                <span class="dots-dot"></span>
              </div>
            `);else if(We&&!Ke){const Me=ne/2,Oe=Math.floor(nt/2),qe=Ge[Me]&&Ge[Me][Oe],Re=!!qe,Ze=qe?.color||"",pt=_e&&!Re&&r.status==="active";lt.push(`
              <div 
                class="dots-cell dots-line h-line ${Re?"drawn color-"+Ze:""} ${pt?"clickable my-color-"+Z:""}"
                data-type="h" 
                data-r="${Me}" 
                data-c="${Oe}"
                role="button"
                tabindex="${pt?"0":"-1"}"
                title="${Re?`Drawn by ${f(qe.player||Ze)}`:pt?"Click to draw line":""}"
              >
                <div class="dots-line-bar"></div>
              </div>
            `)}else if(!We&&Ke){const Me=Math.floor(ne/2),Oe=nt/2,qe=he[Me]&&he[Me][Oe],Re=!!qe,Ze=qe?.color||"",pt=_e&&!Re&&r.status==="active";lt.push(`
              <div 
                class="dots-cell dots-line v-line ${Re?"drawn color-"+Ze:""} ${pt?"clickable my-color-"+Z:""}"
                data-type="v" 
                data-r="${Me}" 
                data-c="${Oe}"
                role="button"
                tabindex="${pt?"0":"-1"}"
                title="${Re?`Drawn by ${f(qe.player||Ze)}`:pt?"Click to draw line":""}"
              >
                <div class="dots-line-bar"></div>
              </div>
            `)}else{const Me=Math.floor(ne/2),Oe=Math.floor(nt/2),qe=Le[Me]&&Le[Me][Oe],Re=!!qe,Ze=qe?.owner||"",pt=qe?.ownerName?qe.ownerName.charAt(0).toUpperCase():Ze.charAt(0).toUpperCase();lt.push(`
              <div class="dots-cell dots-box ${Re?"claimed color-"+Ze:""}" data-br="${Me}" data-bc="${Oe}">
                ${Re?`
                  <div class="dots-box-claim-badge">
                    <span class="box-owner-initial">${pt}</span>
                    <span class="box-score-tag">+1</span>
                  </div>
                `:""}
              </div>
            `)}}return`
        <div class="dotsboxes-arena-layout">
          <!-- Scoreboard Header for up to 4 Players -->
          <div class="dotsboxes-scoreboard">
            ${y.map(ne=>{const nt=ke.find(Oe=>Oe.color===ne)||{name:Ye[ne].name},We=W===ne&&r.status==="active",Ke=nt.userId&&nt.userId.toString()===p?.toString(),Me=Y[ne]||0;return`
                <div class="dots-player-card ${ne} ${We?"is-turn-active":""}">
                  <div class="dots-player-header">
                    <span class="dots-player-dot" style="background:${Ye[ne].hex}"></span>
                    <span class="dots-player-name">${f(nt.name)} ${Ke?"(You)":""}</span>
                    ${We?'<span class="dots-turn-pill">TURN</span>':""}
                  </div>
                  <div class="dots-player-score">
                    <span class="score-val" style="color:${Ye[ne].hex}">${Me}</span>
                    <span class="score-lbl">boxes</span>
                  </div>
                </div>
              `}).join("")}
          </div>

          <!-- Board Grid Container (9x9) -->
          <div class="dotsboxes-board-wrapper">
            <div class="dotsboxes-grid">
              ${lt.join("")}
            </div>
          </div>

          <!-- Console & Status Bar -->
          <div class="dotsboxes-console-bar">
            <div class="dots-guidance ${_e?"highlight":""}">
              ${_e?`👉 It is your turn (<strong>${Ye[Z].name}</strong>)! Click any open line between two dots to draw.`:`⏳ Waiting for <strong>${it}</strong> (<strong>${Ye[W]?.name||W}</strong>) to draw a line...`}
            </div>
            <div class="dots-caption">
              ${f(q.lastActionText||"Connect 4 sides to claim a box and earn a bonus turn!")}
            </div>
          </div>
        </div>
      `}function pe(j){const le=r.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",$e=new Ta(le),q=j?r.player1.assignedRole==="white":r.player2.assignedRole==="white",re={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},ue=q?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],ke=q?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let y='<div class="chess-board-grid">';for(const Ie of ke)for(const Z of ue){const _e=`${Z}${Ie}`,Y=$e.get(_e),Ge=(Z.charCodeAt(0)-97+Ie)%2!==0,he=u===_e,Le=w.includes(_e),Ye=Y?Y.color==="w"?re[Y.type.toUpperCase()]:re[Y.type]:"";y+=`
            <div class="chess-sq ${Ge?"light":"dark"} ${he?"selected":""} ${Le?"legal-dot":""}" data-square="${_e}">
              ${Ye?`<span class="chess-piece ${Y.color==="w"?"white-piece":"black-piece"}">${Ye}</span>`:""}
            </div>
          `}y+="</div>";const p=(r.moves||[]).map(Ie=>`
        <span class="chess-move-token">${Ie.moveNum}. ${Ie.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${y}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${p||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function fe(){const j=r.gameState?.board||Array(9).fill(null),le=r.winningCells||[];return`
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${j.map(($e,q)=>{const re=le.includes(q);return`
                <div class="ttt-cell ${$e?"filled":"empty"} ${re?"win-cell":""}" data-cell-idx="${q}">
                  ${$e==="X"?'<span class="ttt-x">✕</span>':$e==="O"?'<span class="ttt-o">◯</span>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function Ce(j,le,$e){const q=r.gameState||{},re=q.activeColors||["red","green"],ue=q.players||[{...r.player1,color:"red",assignedRole:"red",isBot:!1},{...r.player2,color:"green",assignedRole:"green",isBot:!1}],ke=q.tokens||{},y=H=>{const ve=ke[H]||(H==="red"?q.p1Tokens:H==="green"?q.p2Tokens:[])||[];return Array.from({length:4},(ze,ht)=>ve[ht]||{id:ht,step:-1})},W=y("red"),p=y("green"),Ie=y("yellow"),Z=y("blue"),_e=e?._id||e?.id,Ge=(ue.find(H=>H.userId&&H.userId.toString()===_e?.toString())||ue[0])?.color||(j?"red":"green"),he=q.turnColor||r.turn||"red",Le=Ge===he&&r.status==="active",Ye=!!q.rolled,je=q.dice,it=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],lt=[[7,1],[7,2],[7,3],[7,4],[7,5]],ne=[[1,7],[2,7],[3,7],[4,7],[5,7]],nt=[[7,13],[7,12],[7,11],[7,10],[7,9]],We=[[13,7],[12,7],[11,7],[10,7],[9,7]],Ke=[0,8,13,21,26,34,39,47];function Me(H,ve){return ve<0?null:ve>=56?H==="red"?[7,6]:H==="green"?[6,7]:H==="yellow"?[7,8]:[8,7]:H==="red"?ve<=50?it[ve]:lt[ve-51]:H==="green"?ve<=50?it[(13+ve)%52]:ne[ve-51]:H==="yellow"?ve<=50?it[(26+ve)%52]:nt[ve-51]:ve<=50?it[(39+ve)%52]:We[ve-51]}function Oe(H,ve){return H!==Ge||!Le||!Ye||!je||r.status!=="active"?!1:ve.step===-1?je===6:ve.step>=0&&ve.step+je<=56}const qe={},Re=(H,ve)=>{ve.forEach(ze=>{if(ze.step>=0&&ze.step<56){const ht=Me(H,ze.step);if(ht){const _t=ht[0]+","+ht[1];(qe[_t]=qe[_t]||[]).push({color:H,id:ze.id,step:ze.step,movable:Oe(H,ze)})}}})};re.includes("red")&&Re("red",W),re.includes("green")&&Re("green",p),re.includes("yellow")&&Re("yellow",Ie),re.includes("blue")&&Re("blue",Z);const Ze={};it.forEach(([H,ve],ze)=>{Ze[H+","+ve]=ze});const pt={};lt.forEach(([H,ve],ze)=>{pt[H+","+ve]=ze+1});const Xt={};ne.forEach(([H,ve],ze)=>{Xt[H+","+ve]=ze+1});const Zt={};nt.forEach(([H,ve],ze)=>{Zt[H+","+ve]=ze+1});const ea={};We.forEach(([H,ve],ze)=>{ea[H+","+ve]=ze+1});const Ot=[];for(let H=0;H<15;H++)for(let ve=0;ve<15;ve++){if(H<6&&ve<6||H<6&&ve>8||H>8&&ve<6||H>8&&ve>8||H>=6&&H<=8&&ve>=6&&ve<=8)continue;const ze=H+","+ve,ht=Ze[ze],_t=ht!==void 0&&Ke.includes(ht),Gt=H===6&&ve===1,jt=H===1&&ve===8,mt=H===8&&ve===13,aa=H===13&&ve===6,Fa=pt[ze],La=Xt[ze],Ma=Zt[ze],za=ea[ze];let $t="ludo-cell";Gt?$t+=" cell-red-start":jt?$t+=" cell-green-start":mt?$t+=" cell-yellow-start":aa?$t+=" cell-blue-start":Fa?$t+=" cell-red-stretch":La?$t+=" cell-green-stretch":Ma?$t+=" cell-yellow-stretch":za?$t+=" cell-blue-stretch":_t&&($t+=" cell-safe-star");const qa=qe[ze]||[];Ot.push(`
            <div class="${$t}" style="grid-row:${H+1};grid-column:${ve+1}" data-pos="${ze}">
              ${_t?'<span class="cell-star-glyph">⭐</span>':""}
              ${Gt||jt||mt||aa?'<span class="cell-arrow-glyph">➔</span>':""}
              ${qa.map(Lt=>`
                <div class="ludo-token token-${Lt.color} ${Lt.movable?"movable":""}" data-token-id="${Lt.id}" data-color="${Lt.color}" title="${Lt.color.toUpperCase()} Pawn ${Lt.id+1}">
                  <span>${Lt.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function Ut(H,ve=!1){if(ve||!H)return`
            <div class="ludo-direct-number-box num-prompt" role="img" aria-label="Dice ready">
              <span class="ludo-direct-num prompt-icon" style="font-size:30px;line-height:1;">🎲</span>
            </div>
          `;const ze=Math.max(1,Math.min(6,Number(H)||1));return`
          <div class="ludo-direct-number-box num-${ze}" role="img" aria-label="Number ${ze}">
            <span class="ludo-direct-num">${ze}</span>
          </div>
        `}function Bt(H,ve,ze,ht,_t){const Gt=`${H}-yard`;if(!ze)return`
            <div class="ludo-yard ${Gt}">
              <div class="yard-box decorative">
                <div class="yard-title">${ve} (Inactive)</div>
              </div>
            </div>
          `;const jt=_t.filter(mt=>mt.step===56).length;return`
          <div class="ludo-yard ${Gt} ${he===H?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${ve}</span>
                ${jt>0?`<span class="yard-home-badge" title="${jt} of 4 pawns reached Home!">👑 ${jt}/4 Home</span>`:""}
                ${ht?`<small class="yard-player-lbl">${f(ht.name)}${ht.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${_t.map((mt,aa)=>`
                  <div class="yard-token-slot ${mt.step===56?"slot-home":""}">
                    ${mt.step===-1?`
                      <div class="ludo-token token-${H} ${Oe(H,mt)?"movable":""}" data-token-id="${mt.id}" data-color="${H}" title="${H.toUpperCase()} Pawn ${mt.id+1}">
                        <span>${mt.id+1}</span>
                      </div>
                    `:mt.step===56?`
                      <div class="ludo-token token-reached-home token-${H}" title="${H.toUpperCase()} Pawn ${mt.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${mt.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${aa+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const ta=ue.find(H=>H.color==="red"),Ht=ue.find(H=>H.color==="green"),ca=ue.find(H=>H.color==="yellow"),rt=ue.find(H=>H.color==="blue"),k=ue.find(H=>H.color===he)||(he==="red"?ta:Ht),_=k?f(k.name):he.toUpperCase(),D={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[he]||"🔴",de=!!(Ye&&(je||q.lastRoll&&q.lastRollColor===he)),ge=je||(de?q.lastRoll:null),De=Le&&!de&&r.status==="active",Ft=y(Ge).filter(H=>Oe(Ge,H));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${Bt("red","🔴 Red Base",re.includes("red"),ta,W)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${Bt("green","🟢 Green Base",re.includes("green"),Ht,p)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${Bt("blue","🔵 Blue Base",re.includes("blue"),rt,Z)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${Bt("yellow","🟡 Yellow Base",re.includes("yellow"),ca,Ie)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${W.filter(H=>H.step===56).map(H=>`<div class="home-tri-pawn red" title="Red Pawn ${H.id+1} Home! 👑">👑${H.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${p.filter(H=>H.step===56).map(H=>`<div class="home-tri-pawn green" title="Green Pawn ${H.id+1} Home! 👑">👑${H.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${Ie.filter(H=>H.step===56).map(H=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${H.id+1} Home! 👑">👑${H.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${Z.filter(H=>H.step===56).map(H=>`<div class="home-tri-pawn blue" title="Blue Pawn ${H.id+1} Home! 👑">👑${H.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...W.filter(H=>H.step===56).map(H=>({col:"red",id:H.id})),...p.filter(H=>H.step===56).map(H=>({col:"green",id:H.id})),...Ie.filter(H=>H.step===56).map(H=>({col:"yellow",id:H.id})),...Z.filter(H=>H.step===56).map(H=>({col:"blue",id:H.id}))].map(H=>`
                    <div class="tok-home-champion ${H.col}" title="${H.col.toUpperCase()} Pawn ${H.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${H.id+1}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Ot.join("")}
          </div>

          <!-- Ludo Action & Interactive Dice Console -->
          <div class="ludo-interactive-console">
            <div class="ludo-dice-interactive-box">
              <div 
                class="ludo-3d-dice ${De?"clickable":""} ${de?"just-rolled":""} border-${he}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${De?"0":"-1"}"
                title="${De?"Tap dice to roll!":Le?"Choose a pawn to move":de?`${_} rolled ${ge}`:`Waiting for ${_} to roll`}"
                style="${De?"cursor:pointer;touch-action:manipulation;":""}"
              >
                ${Ut(ge,!de)}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${he}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${_}</strong> (${he.toUpperCase()})
                </span>
                ${Le?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${Le&&de?"highlight":""}">
                ${Le&&!de&&r.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":Le&&de&&r.status==="active"?Ft.length>0?Ft.length===1?`🎲 Rolled <strong>${ge}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${ge}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${ge}</strong>. No legal moves possible — turn passing...`:r.status==="active"?de?`🎲 ${D} <strong>${_}</strong> rolled <strong>${ge}</strong>!`:`⏳ Waiting for <strong>${_}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${f(q.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function Ee(j,le,$e){b.querySelector("#btn-close-arena").onclick=me;const q=b.querySelector("#btn-arena-resign");q&&(q.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{q.disabled=!0,await Ae(`/bonding/matches/${c}/action`,{action:"resign"}),await T(),se()}catch(Z){$(Z.message||"Resign failed","error"),q.disabled=!1}});const re=b.querySelector("#btn-arena-draw");re&&(re.onclick=async()=>{try{await Ae(`/bonding/matches/${c}/action`,{action:"offer_draw"}),$("Draw offer sent to opponent","info"),await T(),se()}catch(Z){$(Z.message||"Draw offer failed","error")}});const ue=b.querySelector("#btn-confirm-accept-draw");ue&&(ue.onclick=async()=>{try{await Ae(`/bonding/matches/${c}/action`,{action:"accept_draw"}),$("Draw agreed!","info"),await T(),se()}catch(Z){$(Z.message,"error")}});const ke=b.querySelector("#btn-confirm-decline-draw");ke&&(ke.onclick=async()=>{try{await Ae(`/bonding/matches/${c}/action`,{action:"decline_draw"}),await T(),se()}catch(Z){$(Z.message,"error")}}),[b.querySelector("#btn-arena-delete-match"),b.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(Z=>{Z.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{Z.disabled=!0,await gt(`/bonding/matches/${c}`),$("Match deleted","success"),me(),h==="lounge_games"&&await G()}catch(_e){$(_e.message||"Failed to delete match","error"),Z.disabled=!1}}});const W=b.querySelector("#btn-arena-rematch-action");W&&(W.onclick=async()=>{try{W.disabled=!0,W.textContent="Requesting...";const Z=await Ae(`/bonding/matches/${c}/action`,{action:"rematch_request"});Z.match&&(r=Z.match,E=Q(Z.match),se(),$("Rematch request sent! Waiting for opponent ⚔️","info"))}catch(Z){$(Z.message||"Rematch request failed","error"),W.disabled=!1,W.textContent="🔄 Request Rematch"}});const p=b.querySelector("#btn-arena-accept-rematch");p&&(p.onclick=async()=>{try{p.disabled=!0,p.textContent="Starting...";const Z=await Ae(`/bonding/matches/${c}/action`,{action:"rematch_accept"});Z.match&&(r=Z.match,E=Q(Z.match),$("Rematch started! Same game is live ⚔️","success"),se())}catch(Z){$(Z.message||"Could not accept rematch","error"),p.disabled=!1}});const Ie=b.querySelector("#btn-arena-decline-rematch");if(Ie&&(Ie.onclick=async()=>{try{await Ae(`/bonding/matches/${c}/action`,{action:"rematch_decline"}),$("Rematch declined","info"),me()}catch{me()}}),r.gameType==="dotsboxes"&&j&&r.status==="active"&&b.querySelectorAll(".dots-line.clickable").forEach(Z=>{Z.onclick=async()=>{const _e=Z.dataset.type,Y=Z.dataset.r,Ge=Z.dataset.c;try{Z.style.opacity="0.5";const he=await Ae(`/bonding/matches/${c}/move`,{type:_e,r:Y,c:Ge});r=he,E=Q(he),se()}catch(he){Z.style.opacity="1",$(he.message||"Failed to draw line","error")}}}),r.gameType==="chess"&&j&&r.status==="active"){const Z=r.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",_e=new Ta(Z),Y=$e.assignedRole==="white"?"w":"b";b.querySelectorAll(".chess-sq").forEach(Ge=>{Ge.onclick=async()=>{const he=Ge.dataset.square;if(u){if(u===he){u=null,w=[],se();return}if(w.includes(he)){const Ye=_e.get(u);let je;Ye&&Ye.type==="p"&&(he.endsWith("8")||he.endsWith("1"))&&(je=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const it={from:u,to:he,promotion:je?je.toLowerCase():void 0};u=null,w=[],r=await Ae(`/bonding/matches/${c}/move`,{move:it}),se()}catch(it){$(it.message||"Illegal chess move","error"),u=null,w=[],se()}return}}const Le=_e.get(he);Le&&Le.color===Y?(u=he,w=_e.moves({square:he,verbose:!0}).map(je=>je.to),se()):(u=null,w=[],se())}})}if(r.gameType==="tictactoe"&&j&&r.status==="active"&&b.querySelectorAll(".ttt-cell.empty").forEach(Z=>{Z.onclick=async()=>{const _e=Z.dataset.cellIdx;try{Z.style.opacity="0.5",r=await Ae(`/bonding/matches/${c}/move`,{cellIndex:Number(_e)}),se()}catch(Y){$(Y.message||"Invalid move","error")}}}),r.gameType==="ludo"&&r.status==="active"){const Z=r.gameState||{},_e=!!Z.rolled,Y=Z.turnColor||r.turn||"red",Ge=!!(_e&&(Z.dice||Z.lastRoll&&Z.lastRollColor===Y)),he=e?._id||e?.id,Le=Z.players||[{...r.player1,color:"red",assignedRole:"red",isBot:!1},{...r.player2,color:"green",assignedRole:"green",isBot:!1}],Ye=he&&r.player1.userId.toString()===he.toString(),it=(Le.find(Ke=>Ke.userId&&Ke.userId.toString()===he?.toString())||(Ye?Le[0]:Le[1]))?.color||(Ye?"red":"green"),lt=it===Y&&r.status==="active",ne=Le.find(Ke=>Ke.color===Y)||(Y==="red"?r.player1:r.player2),nt=f(ne?.name||(Y==="red"?"Player 1":"Player 2")),We=b.querySelector("#btn-interactive-ludo-dice");if(We){const Ke=async Me=>{if(Me&&(Me.preventDefault(),Me.stopPropagation()),!lt){$(`${nt}'s turn right now`,"info");return}if(Ge){$("Dice already rolled! Tap your glowing pawn to move.","info");return}if(r.status!=="active"){$("Match has ended","info");return}if(ie||We.dataset.rolling==="true")return;ie=!0,M=Date.now(),We.dataset.rolling="true",We.classList.add("rolling");let Oe=0;const qe=setInterval(()=>{Oe++;const Re=Math.floor(Math.random()*6)+1;We.innerHTML=renderNumberDisplay(Re),Oe>=4&&clearInterval(qe)},50);try{const Re=await Ae(`/bonding/matches/${c}/move`,{action:"roll"});clearInterval(qe),r=Re,E=Q(Re),se()}catch(Re){clearInterval(qe),$(Re.message||"Failed to roll dice","error"),We&&(delete We.dataset.rolling,We.classList.remove("rolling"))}finally{ie=!1}};We.onclick=Ke,We.onkeydown=Me=>{(Me.key==="Enter"||Me.key===" ")&&(Me.preventDefault(),Ke(Me))}}if(lt&&Ge){const Me=(Z.tokens||{})[it]||[],Oe=Z.dice||Z.lastRoll||0,qe=Me.filter(Re=>Re.step===-1&&Oe===6||Re.step>=0&&Re.step+Oe<=56);if(qe.length===1&&!N){N=!0;const Re=qe[0];C&&clearTimeout(C),C=setTimeout(async()=>{try{const Ze=await Ae(`/bonding/matches/${c}/move`,{action:"move",tokenId:Number(Re.id)});r=Ze,E=Q(Ze),N=!1,se()}catch(Ze){N=!1,$(Ze.message||"Auto-move failed","error")}},400)}}lt&&_e&&b.querySelectorAll(".ludo-token.movable").forEach(Ke=>{Ke.onclick=async Me=>{Me.stopPropagation();const Oe=Ke.dataset.tokenId;try{Ke.style.opacity="0.5";const qe=await Ae(`/bonding/matches/${c}/move`,{action:"move",tokenId:Number(Oe)});r=qe,E=Q(qe),se()}catch(qe){$(qe.message||"Invalid token move","error"),Ke.style.opacity="1"}}})}}se()}function J(c,b){const r=c?.leaderboard||[],u=c?.myBests||[],w={};u.forEach(N=>{w[N.gameId]=N.highScore});const E=[{id:"snake",title:"Retro Snake",icon:"🐍",tag:"Speed & Reflexes",desc:"Classic 90s arcade nostalgia! Eat apples, grow longer, avoid collisions, and climb the company rank.",best:w.snake!==void 0?w.snake+" pts":"Unranked"},{id:"2048",title:"2048 Puzzle",icon:"🔢",tag:"Strategy & Logic",desc:"Slide matching tiles together, merge numbers from 2 to 2048 and beyond. Addictive break puzzle!",best:w[2048]!==void 0?w[2048]+" pts":"Unranked"},{id:"memory",title:"Memory Card Match",icon:"🃏",tag:"Focus & Speed",desc:"Flip and match 8 pairs of company emoji cards. Fast times and minimal moves yield massive high scores.",best:w.memory!==void 0?w.memory+" pts":"Unranked"}],C=[{id:"all",label:"🌐 All Games"},{id:"snake",label:"🐍 Retro Snake"},{id:"2048",label:"🔢 2048 Puzzle"},{id:"memory",label:"🃏 Memory Match"}];return`
      <!-- Arcade Games Grid -->
      <div class="lounge-section">
        <div class="lounge-section-head">
          <h3>🕹️ Single-Player Break Arcade</h3>
          <p>Instant-play casual single-player challenges. Play anytime during break time to climb the company leaderboard!</p>
        </div>

        <div class="arcade-games-grid">
          ${E.map(N=>`
            <div class="arcade-game-card">
              <div class="arcade-card-top">
                <span class="arcade-card-icon">${N.icon}</span>
                <span class="arcade-card-badge">${N.tag}</span>
              </div>
              <h4 class="arcade-card-title">${N.title}</h4>
              <p class="arcade-card-desc">${N.desc}</p>
              <div class="arcade-card-best">
                <span>Personal Best:</span> <strong>${N.best}</strong>
              </div>
              <button class="arcade-play-btn btn-play-arcade" data-game="${N.id}">
                <span>▶ Play ${N.title}</span>
              </button>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Global Leaderboard Section -->
      <div class="lounge-section" style="margin-top:28px;">
        <div class="lounge-section-head" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <h3>🏆 CI360 Global Arcade Leaderboard</h3>
            <p>Top scores across all departments. Play games to earn bragging rights and bonding points!</p>
          </div>
          <!-- Filter pills -->
          <div class="arcade-filter-pills" style="display:flex;gap:6px;flex-wrap:wrap;">
            ${C.map(N=>`
              <button class="arcade-filter-pill ${Fe===N.id?"active":""}" data-filter="${N.id}">
                ${N.label}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="arcade-leaderboard-box">
          ${r.length===0?`
            <div class="box-empty-text" style="padding:40px;text-align:center;">
              <span style="font-size:32px;display:block;margin-bottom:8px;">🕹️</span>
              No high scores recorded for this game yet. Be the first employee to play and claim Rank #1!
            </div>
          `:`
            <div class="arcade-leaderboard-table-wrap">
              <table class="arcade-leaderboard-table">
                <thead>
                  <tr>
                    <th style="width:70px;text-align:center;">Rank</th>
                    <th>Colleague</th>
                    <th>Game</th>
                    <th style="text-align:right;">High Score</th>
                    <th style="text-align:right;">Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${r.map(N=>{const ie=b&&N.userId&&N.userId.toString()===b.toString(),M=N.rank===1?"🥇":N.rank===2?"🥈":N.rank===3?"🥉":`#${N.rank}`,Q={snake:"🐍",2048:"🔢",memory:"🃏"};return`
                      <tr class="${ie?"is-my-row":""}">
                        <td style="text-align:center;">
                          <span class="leaderboard-rank-badge rank-${N.rank}">${M}</span>
                        </td>
                        <td>
                          <div class="leaderboard-user-cell">
                            <div class="leaderboard-avatar">${(N.userName||"U").charAt(0).toUpperCase()}</div>
                            <div>
                              <span class="leaderboard-user-name">${f(N.userName)} ${ie?'<strong style="color:#6366f1;">(You)</strong>':""}</span>
                              <span class="leaderboard-user-role">${f(N.userRole||"Team Member")}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span class="leaderboard-game-tag">
                            <span>${Q[N.gameId]||"🎮"}</span>
                            <span>${f(N.gameTitle)}</span>
                          </span>
                        </td>
                        <td style="text-align:right;">
                          <span class="leaderboard-score-val">${N.score.toLocaleString()}</span>
                        </td>
                        <td style="text-align:right;color:var(--text-3);font-size:12px;">
                          ${new Date(N.date).toLocaleDateString([],{month:"short",day:"numeric"})}
                        </td>
                      </tr>
                    `}).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `}function x(c){const b=i.querySelector("#bonding-modals-root");let r=null;const u={snake:{title:"Retro Snake",icon:"🐍",desc:"Use Arrow Keys or on-screen controls to eat apples and grow!"},2048:{title:"2048 Puzzle",icon:"🔢",desc:"Slide and combine tiles. Reach 2048 to win!"},memory:{title:"Memory Match",icon:"🃏",desc:"Flip and match 8 pairs of company cards with fewest moves!"}},w=u[c]||u.snake;function E(){typeof r=="function"&&r(),b.innerHTML="",h==="lounge_games"&&G(!0)}b.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card arcade-game-modal-card" style="max-width:440px;width:95%;">
          <div class="bonding-modal-header">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:24px;">${w.icon}</span>
              <div>
                <h3 style="margin:0;font-size:16px;">${w.title}</h3>
                <span style="font-size:11.5px;color:var(--text-3);">${w.desc}</span>
              </div>
            </div>
            <button class="bonding-modal-close" id="btn-close-arcade">&times;</button>
          </div>

          <div class="bonding-modal-body arcade-game-body" id="arcade-game-container" style="padding:16px;">
            <!-- Dynamic Game Canvas / Board injected here -->
          </div>
        </div>
      </div>
    `,b.querySelector("#btn-close-arcade").onclick=E;const C=b.querySelector("#arcade-game-container");c==="snake"?r=L(C):c==="2048"?r=oe(C):c==="memory"&&(r=A(C))}function L(c,b){c.innerHTML=`
      <div class="arcade-play-area">
        <div class="arcade-score-bar">
          <div class="arcade-score-box">
            <span class="lbl">Score</span>
            <span class="val" id="snake-live-score">0</span>
          </div>
          <button class="arcade-restart-btn" id="btn-restart-snake">🔄 Restart</button>
        </div>
        <div class="arcade-canvas-wrap" style="position:relative;margin:10px auto;max-width:320px;">
          <canvas id="snakeCanvas" width="320" height="320" style="background:#0f172a;border-radius:12px;border:2px solid #334155;display:block;margin:0 auto;box-shadow:0 8px 24px rgba(0,0,0,0.4);"></canvas>
          <div class="arcade-game-over-overlay" id="snake-over-overlay" style="display:none;position:absolute;inset:0;background:rgba(15,23,42,0.9);border-radius:12px;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;">
            <div class="over-content">
              <h3 style="color:#ef4444;margin:0 0 8px;">GAME OVER 💥</h3>
              <p style="margin:0 0 8px;font-size:14px;color:#fff;">Your Score: <strong id="snake-final-score" style="font-size:22px;color:#facc15;">0</strong></p>
              <div id="snake-rank-msg" style="font-size:13px;color:#10b981;margin:8px 0;font-weight:700;"></div>
              <button class="bonding-btn-primary" id="btn-snake-play-again" style="margin-top:8px;">Play Again 🔄</button>
            </div>
          </div>
        </div>
        <div class="arcade-dpad">
          <button class="dpad-btn up" data-dir="up">▲</button>
          <div class="dpad-middle">
            <button class="dpad-btn left" data-dir="left">◀</button>
            <button class="dpad-btn down" data-dir="down">▼</button>
            <button class="dpad-btn right" data-dir="right">▶</button>
          </div>
        </div>
      </div>
    `;const r=c.querySelector("#snakeCanvas"),u=r.getContext("2d"),w=c.querySelector("#snake-live-score"),E=c.querySelector("#snake-over-overlay"),C=c.querySelector("#snake-final-score"),N=c.querySelector("#snake-rank-msg"),ie=c.querySelector("#btn-restart-snake"),M=c.querySelector("#btn-snake-play-again"),Q=16,T=20;let me=[{x:10,y:10},{x:9,y:10},{x:8,y:10}],se={x:1,y:0},ce={x:1,y:0},pe={x:15,y:10},fe=0,Ce=!1,Ee=null;function j(){for(;;){const y=Math.floor(Math.random()*T),W=Math.floor(Math.random()*T);if(!me.some(p=>p.x===y&&p.y===W)){pe={x:y,y:W};break}}}function le(){u.fillStyle="#0f172a",u.fillRect(0,0,r.width,r.height),u.strokeStyle="#1e293b",u.lineWidth=.5;for(let y=0;y<=r.width;y+=Q)u.beginPath(),u.moveTo(y,0),u.lineTo(y,r.height),u.stroke(),u.beginPath(),u.moveTo(0,y),u.lineTo(r.width,y),u.stroke();u.fillStyle="#ef4444",u.beginPath(),u.arc(pe.x*Q+Q/2,pe.y*Q+Q/2,Q/2.3,0,Math.PI*2),u.fill(),u.fillStyle="#4ade80",u.fillRect(pe.x*Q+Q/2-1,pe.y*Q+1,2,3),me.forEach((y,W)=>{u.fillStyle=W===0?"#10b981":W%2===0?"#34d399":"#059669";const p=y.x*Q+1,Ie=y.y*Q+1,Z=Q-2,_e=Q-2;u.fillRect(p,Ie,Z,_e),W===0&&(u.fillStyle="#0f172a",u.beginPath(),u.arc(p+4,Ie+4,1.5,0,Math.PI*2),u.arc(p+Z-4,Ie+4,1.5,0,Math.PI*2),u.fill())})}async function $e(){Ce=!0,Ee&&clearInterval(Ee),C.textContent=fe,E.style.display="flex";try{const y=await Ae("/bonding/arcade/score",{gameId:"snake",gameTitle:"Retro Snake",score:fe,metrics:{length:me.length}});y.isNewPersonalBest?(N.textContent=`🎉 NEW PERSONAL BEST! Leaderboard Rank: #${y.rank}`,$(`New Personal Best on Snake! Rank #${y.rank} 🏆`,"success")):N.textContent=`Leaderboard Rank: #${y.rank}`}catch(y){console.error("Failed to submit score:",y)}}function q(){if(Ce)return;se=ce;const y={x:me[0].x+se.x,y:me[0].y+se.y};if(y.x<0||y.x>=T||y.y<0||y.y>=T){$e();return}if(me.some(W=>W.x===y.x&&W.y===y.y)){$e();return}me.unshift(y),y.x===pe.x&&y.y===pe.y?(fe+=10,w.textContent=fe,j()):me.pop(),le()}function re(y){y==="up"&&se.y!==1?ce={x:0,y:-1}:y==="down"&&se.y!==-1?ce={x:0,y:1}:y==="left"&&se.x!==1?ce={x:-1,y:0}:y==="right"&&se.x!==-1&&(ce={x:1,y:0})}function ue(y){["ArrowUp","KeyW"].includes(y.code)?(y.preventDefault(),re("up")):["ArrowDown","KeyS"].includes(y.code)?(y.preventDefault(),re("down")):["ArrowLeft","KeyA"].includes(y.code)?(y.preventDefault(),re("left")):["ArrowRight","KeyD"].includes(y.code)&&(y.preventDefault(),re("right"))}window.addEventListener("keydown",ue),c.querySelectorAll(".dpad-btn").forEach(y=>{y.onclick=W=>{W.preventDefault(),re(y.dataset.dir)}});function ke(){Ee&&clearInterval(Ee),me=[{x:10,y:10},{x:9,y:10},{x:8,y:10}],se={x:1,y:0},ce={x:1,y:0},fe=0,w.textContent="0",Ce=!1,E.style.display="none",j(),le(),Ee=setInterval(q,115)}return ie.onclick=ke,M.onclick=ke,ke(),()=>{Ee&&clearInterval(Ee),window.removeEventListener("keydown",ue)}}function oe(c,b){c.innerHTML=`
      <div class="arcade-play-area">
        <div class="arcade-score-bar">
          <div class="arcade-score-box">
            <span class="lbl">Score</span>
            <span class="val" id="g2048-live-score">0</span>
          </div>
          <button class="arcade-restart-btn" id="btn-restart-2048">🔄 New Game</button>
        </div>
        <div class="arcade-canvas-wrap" style="position:relative;margin:10px auto;max-width:320px;">
          <div class="g2048-grid" id="g2048Board"></div>
          <div class="arcade-game-over-overlay" id="g2048-over-overlay" style="display:none;position:absolute;inset:0;background:rgba(15,23,42,0.92);border-radius:12px;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;">
            <div class="over-content">
              <h3 style="color:#ef4444;margin:0 0 8px;">GAME OVER 💥</h3>
              <p style="margin:0 0 8px;font-size:14px;color:#fff;">Final Score: <strong id="g2048-final-score" style="font-size:22px;color:#facc15;">0</strong></p>
              <div id="g2048-rank-msg" style="font-size:13px;color:#10b981;margin:8px 0;font-weight:700;"></div>
              <button class="bonding-btn-primary" id="btn-g2048-play-again" style="margin-top:8px;">Play Again 🔄</button>
            </div>
          </div>
        </div>
        <div class="arcade-dpad">
          <button class="dpad-btn up" data-dir="up">▲</button>
          <div class="dpad-middle">
            <button class="dpad-btn left" data-dir="left">◀</button>
            <button class="dpad-btn down" data-dir="down">▼</button>
            <button class="dpad-btn right" data-dir="right">▶</button>
          </div>
        </div>
      </div>
    `;const r=c.querySelector("#g2048Board"),u=c.querySelector("#g2048-live-score"),w=c.querySelector("#g2048-over-overlay"),E=c.querySelector("#g2048-final-score"),C=c.querySelector("#g2048-rank-msg"),N=c.querySelector("#btn-restart-2048"),ie=c.querySelector("#btn-g2048-play-again");let M=Array(4).fill(null).map(()=>Array(4).fill(0)),Q=0,T=!1;function me(){u.textContent=Q,r.innerHTML="";for(let j=0;j<4;j++)for(let le=0;le<4;le++){const $e=M[j][le],q=document.createElement("div");q.className=`g2048-tile val-${$e}`,q.textContent=$e>0?$e:"",r.appendChild(q)}}function se(){const j=[];for(let $e=0;$e<4;$e++)for(let q=0;q<4;q++)M[$e][q]===0&&j.push({r:$e,c:q});if(j.length===0)return;const le=j[Math.floor(Math.random()*j.length)];M[le.r][le.c]=Math.random()<.9?2:4}function ce(j){let le=j.filter(q=>q!==0),$e=0;for(let q=0;q<le.length-1;q++)le[q]===le[q+1]&&(le[q]*=2,$e+=le[q],le.splice(q+1,1));for(;le.length<4;)le.push(0);return{row:le,gained:$e}}function pe(j){if(T)return;let le=!1,$e=0;if(j==="left")for(let q=0;q<4;q++){const re=ce(M[q]);re.row.some((ue,ke)=>ue!==M[q][ke])&&(le=!0),M[q]=re.row,$e+=re.gained}else if(j==="right")for(let q=0;q<4;q++){const re=[...M[q]].reverse(),ue=ce(re),ke=ue.row.reverse();ke.some((y,W)=>y!==M[q][W])&&(le=!0),M[q]=ke,$e+=ue.gained}else if(j==="up")for(let q=0;q<4;q++){const re=[M[0][q],M[1][q],M[2][q],M[3][q]],ue=ce(re);for(let ke=0;ke<4;ke++)M[ke][q]!==ue.row[ke]&&(le=!0),M[ke][q]=ue.row[ke];$e+=ue.gained}else if(j==="down")for(let q=0;q<4;q++){const re=[M[3][q],M[2][q],M[1][q],M[0][q]],ue=ce(re),ke=ue.row.reverse();for(let y=0;y<4;y++)M[y][q]!==ke[y]&&(le=!0),M[y][q]=ke[y];$e+=ue.gained}le&&(Q+=$e,se(),me(),fe())}async function fe(){for(let j=0;j<4;j++)for(let le=0;le<4;le++)if(M[j][le]===0)return;for(let j=0;j<4;j++)for(let le=0;le<4;le++){const $e=M[j][le];if(j<3&&M[j+1][le]===$e||le<3&&M[j][le+1]===$e)return}T=!0,E.textContent=Q,w.style.display="flex";try{const j=await Ae("/bonding/arcade/score",{gameId:"2048",gameTitle:"2048 Puzzle",score:Q});j.isNewPersonalBest?(C.textContent=`🎉 NEW PERSONAL BEST! Leaderboard Rank: #${j.rank}`,$(`New Personal Best on 2048! Rank #${j.rank} 🏆`,"success")):C.textContent=`Leaderboard Rank: #${j.rank}`}catch(j){console.error("Failed to submit 2048 score:",j)}}function Ce(j){["ArrowUp","KeyW"].includes(j.code)?(j.preventDefault(),pe("up")):["ArrowDown","KeyS"].includes(j.code)?(j.preventDefault(),pe("down")):["ArrowLeft","KeyA"].includes(j.code)?(j.preventDefault(),pe("left")):["ArrowRight","KeyD"].includes(j.code)&&(j.preventDefault(),pe("right"))}window.addEventListener("keydown",Ce),c.querySelectorAll(".dpad-btn").forEach(j=>{j.onclick=le=>{le.preventDefault(),pe(j.dataset.dir)}});function Ee(){M=Array(4).fill(null).map(()=>Array(4).fill(0)),Q=0,T=!1,w.style.display="none",se(),se(),me()}return N.onclick=Ee,ie.onclick=Ee,Ee(),()=>{window.removeEventListener("keydown",Ce)}}function A(c,b){c.innerHTML=`
      <div class="arcade-play-area">
        <div class="arcade-score-bar">
          <div class="arcade-score-box">
            <span class="lbl">Moves</span>
            <span class="val" id="memory-moves">0</span>
          </div>
          <div class="arcade-score-box">
            <span class="lbl">Time</span>
            <span class="val" id="memory-timer">00:00</span>
          </div>
          <button class="arcade-restart-btn" id="btn-restart-memory">🔄 Shuffle & Restart</button>
        </div>
        <div class="arcade-canvas-wrap" style="position:relative;margin:10px auto;max-width:320px;">
          <div class="memory-grid" id="memoryBoard"></div>
          <div class="arcade-game-over-overlay" id="memory-over-overlay" style="display:none;position:absolute;inset:0;background:rgba(15,23,42,0.92);border-radius:12px;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;">
            <div class="over-content">
              <h3 style="color:#10b981;margin:0 0 8px;">🎉 VICTORY! ALL MATCHED!</h3>
              <p style="margin:0 0 8px;font-size:14px;color:#fff;">Final Score: <strong id="memory-final-score" style="font-size:22px;color:#facc15;">0</strong></p>
              <div id="memory-rank-msg" style="font-size:13px;color:#10b981;margin:8px 0;font-weight:700;"></div>
              <button class="bonding-btn-primary" id="btn-memory-play-again" style="margin-top:8px;">Play Again 🔄</button>
            </div>
          </div>
        </div>
      </div>
    `;const r=c.querySelector("#memoryBoard"),u=c.querySelector("#memory-moves"),w=c.querySelector("#memory-timer"),E=c.querySelector("#memory-over-overlay"),C=c.querySelector("#memory-final-score"),N=c.querySelector("#memory-rank-msg"),ie=c.querySelector("#btn-restart-memory"),M=c.querySelector("#btn-memory-play-again"),Q=["🚀","💻","☕","🎯","🔥","🏆","💡","🎨"];let T=[],me=[],se=0,ce=0,pe=null,fe=!1,Ce=!1;function Ee(){pe&&clearInterval(pe),se=0,ce=0,fe=!1,Ce=!1,me=[],u.textContent="0",w.textContent="00:00",E.style.display="none";const q=[...Q,...Q];for(let re=q.length-1;re>0;re--){const ue=Math.floor(Math.random()*(re+1));[q[re],q[ue]]=[q[ue],q[re]]}T=q.map((re,ue)=>({id:ue,icon:re,flipped:!1,matched:!1})),pe=setInterval(()=>{ce++;const re=String(Math.floor(ce/60)).padStart(2,"0"),ue=String(ce%60).padStart(2,"0");w.textContent=`${re}:${ue}`},1e3),j()}function j(){r.innerHTML="",T.forEach((q,re)=>{const ue=document.createElement("div");ue.className=`memory-card ${q.flipped||q.matched?"flipped":""} ${q.matched?"matched":""}`,ue.innerHTML=`
          <div class="card-inner">
            <div class="card-front">❓</div>
            <div class="card-back">${q.icon}</div>
          </div>
        `,ue.onclick=()=>le(re),r.appendChild(ue)})}async function le(q){if(fe||Ce)return;const re=T[q];if(!(re.flipped||re.matched)&&(re.flipped=!0,me.push(q),j(),me.length===2)){se++,u.textContent=se,fe=!0;const[ue,ke]=me;T[ue].icon===T[ke].icon?(T[ue].matched=!0,T[ke].matched=!0,me=[],fe=!1,j(),$e()):setTimeout(()=>{T[ue].flipped=!1,T[ke].flipped=!1,me=[],fe=!1,j()},700)}}async function $e(){if(T.every(q=>q.matched)){Ce=!0,pe&&clearInterval(pe);const q=Math.max(100,Math.round(1800-se*30-ce*8));C.textContent=q,E.style.display="flex";try{const re=await Ae("/bonding/arcade/score",{gameId:"memory",gameTitle:"Memory Match",score:q,metrics:{moves:se,seconds:ce}});re.isNewPersonalBest?(N.textContent=`🎉 NEW PERSONAL BEST! Leaderboard Rank: #${re.rank}`,$(`New Personal Best on Memory Match! Rank #${re.rank} 🏆`,"success")):N.textContent=`Leaderboard Rank: #${re.rank}`}catch(re){console.error("Failed to submit memory score:",re)}}}return ie.onclick=Ee,M.onclick=Ee,Ee(),()=>{pe&&clearInterval(pe)}}function R(){if(!l||l.type==="direct")return;const c=i.querySelector("#bonding-modals-root"),b=M=>M==="employee"||M==="admin"||M==="superadmin",r=l.members||[],u=new Set(r.map(M=>M.userId?.toString())),w=n.filter(M=>b(M.role)&&!u.has(M._id.toString()));c.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${f(l.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${w.map(M=>`
                    <option value="${M._id}">${f(M.name)} (${f(M.role==="superadmin"?"Superadmin":M.role==="admin"?"Admin":"Employee")})</option>
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
              <label class="bonding-form-label">Current Members (${r.length}):</label>
              <div class="bonding-members-list">
                ${r.map(M=>{const Q=e?._id||e?.id,T=Q&&M.userId&&M.userId.toString()===Q.toString(),me=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(Q),se=d==="superadmin"||e?.role==="superadmin",ce=me||se;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(M.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${f(M.name)} ${T?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${f(M.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${T?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${M.userId}">
                            🚪 Leave Group
                          </button>
                        `:ce?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${M.userId}" data-name="${f(M.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const M=e?._id||e?.id,Q=l.createdBy&&l.createdBy.userId&&String(l.createdBy.userId)===String(M),T=d==="superadmin"||e?.role==="superadmin";return Q||T?`
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""};const E=c.querySelector("#btn-modal-delete-group");E&&(E.onclick=()=>{c.innerHTML="",z()});const C=c.querySelector("#btn-modal-leave-group");C&&(C.onclick=()=>{c.innerHTML="",te()}),c.querySelectorAll(".btn-leave-group-action").forEach(M=>{M.onclick=()=>{c.innerHTML="",te()}});const N=c.querySelector("#btn-submit-add-member");N&&(N.onclick=async()=>{const Q=c.querySelector("#sel-add-colleague").value;if(!Q){$("Please select a colleague to add","warning");return}try{N.disabled=!0,N.textContent="Adding...";const T=await ra(`/bonding/channels/${l._id}/members`,{action:"add",userIds:[Q]});$("Colleague added to group! 🎉","success"),l=T.channel,c.innerHTML="",await He(l._id),be()}catch(T){$(T.message||"Failed to add member","error"),N.disabled=!1,N.textContent="Add to Group"}}),c.querySelectorAll(".btn-remove-member").forEach(M=>{M.onclick=async()=>{const Q=M.dataset.userId,T=M.dataset.name;if(confirm(`Are you sure you want to remove ${T} from this group?`))try{M.disabled=!0;const me=await ra(`/bonding/channels/${l._id}/members`,{action:"remove",userId:Q});$(`${T} removed from group`,"info"),l=me.channel,c.innerHTML="",await He(l._id),be()}catch(me){$(me.message||"Failed to remove member","error"),M.disabled=!1}}})}async function te(){if(!l||l.type==="direct")return;const c=l.name;if(confirm(`Are you sure you want to leave the group "${c}"?`))try{await Ae(`/bonding/channels/${l._id}/leave`,{}),$(`You left "${c}"`,"info"),g=await Ue("/bonding/channels").catch(()=>[]),l=g.find(r=>r.type==="group")||g[0]||null,at(),be(),l&&await He(l._id)}catch(r){$(r.message||"Failed to leave group","error")}}async function z(){if(!l||l.type==="direct")return;const c=l.name;if(confirm(`Are you sure you want to delete the group "${c}"?

All messages in this lounge will be deleted.`))try{await gt(`/bonding/channels/${l._id}`),$(`Group "${c}" deleted successfully`,"success"),g=await Ue("/bonding/channels").catch(()=>[]),l=g.find(r=>r.type==="group")||g[0]||null,at(),be(),l&&await He(l._id)}catch(r){$(r.message||"Failed to delete group","error")}}function S(){const c=i.querySelector("#bonding-modals-root"),b=w=>w==="employee"||w==="admin"||w==="superadmin",r=n.filter(w=>!w.isSelf&&b(w.role));c.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${r.map(w=>`
                <div class="bonding-user-pick-item" data-user-id="${w._id}" data-name="${f(w.name)}">
                  <div class="bonding-member-avatar">${w.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${f(w.name)}</span>
                    <span class="user-pick-role">${f(w.role==="superadmin"?"Superadmin":w.role==="admin"?"Admin":"Employee")} · ${f(w.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelectorAll(".bonding-user-pick-item").forEach(w=>{w.onclick=async()=>{const E=w.dataset.userId;try{const C=await Ae("/bonding/channels",{type:"direct",targetUserId:E});c.innerHTML="",g=await Ue("/bonding/channels"),l=g.find(N=>N._id===C._id)||C,at(),be(),await He(l._id)}catch(C){$(C.message||"Failed to open personal chat","error")}}})}function xe(){const c=i.querySelector("#bonding-modals-root"),b=C=>C==="employee"||C==="admin"||C==="superadmin",r=n.filter(C=>!C.isSelf&&b(C.role));c.innerHTML=`
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
                ${r.map(C=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${C._id}" />
                    <span>${f(C.name)} (${f(C.role==="superadmin"?"Superadmin":C.role==="admin"?"Admin":"Employee")})</span>
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
    `,c.querySelector(".bonding-modal-close").onclick=()=>{c.innerHTML=""},c.querySelector("#btn-cancel-create-grp").onclick=()=>{c.innerHTML=""};let u="👥";const w=c.querySelectorAll(".avatar-opt");w.forEach(C=>{C.onclick=()=>{w.forEach(N=>N.classList.remove("active")),C.classList.add("active"),u=C.textContent.trim()}});const E=c.querySelector("#btn-confirm-create-grp");E.onclick=async()=>{const C=c.querySelector("#new-group-name"),N=c.querySelector("#new-group-desc"),ie=C.value.trim();if(!ie){$("Please enter a group name","warning"),C.focus();return}const M=c.querySelectorAll(".new-group-member-chk:checked"),Q=Array.from(M).map(T=>T.value);try{E.disabled=!0,E.textContent="Creating...";const T=await Ae("/bonding/channels",{type:"group",name:ie,description:N.value.trim(),avatar:u,memberIds:Q});$(`Group "${ie}" created! 🎉`,"success"),c.innerHTML="",g=await Ue("/bonding/channels"),l=g.find(me=>me._id===T._id)||T,at(),be(),await He(l._id)}catch(T){$(T.message||"Failed to create group","error"),E.disabled=!1,E.textContent="Create Group 🎉"}}}function Be(c,b){const r=document.querySelector(".bonding-chat-emoji-palette");if(r){r.remove();return}const u=[{name:"Smileys & Faces",icon:"😀",emojis:["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","😉","😍","🥰","😘","😋","😎","🤔","🤨","😐","😴","🤯","🥳","🥺"]},{name:"Hands & People",icon:"👍",emojis:["👍","👎","👏","🙌","👐","🤝","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","👇","💪","🫡","🙏","🙋","🙆"]},{name:"Celebration & Work",icon:"🎉",emojis:["🎉","🎊","🔥","✨","💯","🚀","🎯","🏆","🥇","⭐","🌟","💡","📌","💼","📊","📈","⏱️","⏳","✅","❌","⚡"]},{name:"Break & Fun",icon:"☕",emojis:["☕","🍵","🍕","🍔","🍟","🎂","🍰","🍩","🍿","🍺","🍻","🎮","🎲","⏹️","🧩","🎵","🏖️","⚽","❤️","💖","💙"]}];let w=0;const E=document.createElement("div");E.className="bonding-chat-emoji-palette";function C(){const M=u[w];E.innerHTML=`
        <div class="emoji-palette-tabs">
          ${u.map((Q,T)=>`
            <button class="emoji-tab-btn ${T===w?"active":""}" data-cat-idx="${T}" title="${Q.name}">
              ${Q.icon}
            </button>
          `).join("")}
        </div>
        <div class="emoji-palette-header">
          <span>${M.name}</span>
          <button class="emoji-palette-close" type="button">&times;</button>
        </div>
        <div class="emoji-palette-grid">
          ${M.emojis.map(Q=>`
            <button class="chat-emoji-cell" data-e="${Q}" type="button">${Q}</button>
          `).join("")}
        </div>
      `,E.querySelectorAll(".emoji-tab-btn").forEach(Q=>{Q.onclick=T=>{T.stopPropagation(),w=Number(Q.dataset.catIdx),C()}}),E.querySelector(".emoji-palette-close").onclick=Q=>{Q.stopPropagation(),E.remove()},E.querySelectorAll(".chat-emoji-cell").forEach(Q=>{Q.onclick=T=>{T.stopPropagation(),b(Q.dataset.e),E.remove()}})}C();const N=c.getBoundingClientRect();E.style.position="fixed",E.style.bottom=`${window.innerHeight-N.top+8}px`,E.style.left=`${Math.max(12,Math.min(window.innerWidth-300,N.left-40))}px`,document.body.appendChild(E);const ie=M=>{!E.contains(M.target)&&M.target!==c&&!c.contains(M.target)&&(E.remove(),document.removeEventListener("click",ie))};setTimeout(()=>document.addEventListener("click",ie),10)}function Pe(c,b){const r=document.querySelector(".bonding-emoji-popup");r&&r.remove();const u=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],w=document.createElement("div");w.className="bonding-emoji-popup",w.innerHTML=u.map(N=>`<button class="emoji-opt-btn" data-e="${N}">${N}</button>`).join("");const E=c.getBoundingClientRect();w.style.top=`${E.bottom+window.scrollY+6}px`,w.style.left=`${E.left+window.scrollX}px`,document.body.appendChild(w),w.querySelectorAll(".emoji-opt-btn").forEach(N=>{N.onclick=ie=>{ie.stopPropagation(),b(N.dataset.e),w.remove()}});const C=N=>{w.contains(N.target)||(w.remove(),document.removeEventListener("click",C))};setTimeout(()=>document.addEventListener("click",C),10)}function Ne(c){if(!c)return"";try{return new Date(c).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function un(){const i=document.getElementById("ci360-bonding-styles");i&&i.remove();const t=document.createElement("style");t.id="ci360-bonding-styles",t.textContent=`
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

    /* Input bar - Kept strictly in 1 single clean line */
    .bonding-chat-input-bar {
      padding: 10px 18px;
      border-top: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      flex-direction: row !important;
      align-items: center !important;
      gap: 10px;
      background: var(--bg-card, #ffffff);
      flex-wrap: nowrap !important;
      white-space: nowrap !important;
      box-sizing: border-box !important;
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
      flex-shrink: 0 !important;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-input-action-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-input-action-btn:hover {
      background: #1e293b;
    }

    .bonding-input-field {
      flex: 1 1 auto !important;
      height: 42px !important;
      min-height: 42px !important;
      max-height: 42px !important;
      line-height: normal !important;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      padding: 0 14px !important;
      border-radius: 10px;
      font-size: 13.5px;
      color: inherit;
      outline: none;
      font-family: inherit;
      box-sizing: border-box !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }

    [data-theme="dark"] .bonding-input-field {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-send-btn {
      flex-shrink: 0 !important;
      height: 42px !important;
      padding: 0 18px !important;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-sizing: border-box !important;
      white-space: nowrap !important;
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
      transition: transform 0.12s ease, opacity 0.12s ease;
      user-select: none;
      box-sizing: border-box !important;
      touch-action: manipulation;
    }

    [data-theme="dark"] .ludo-3d-dice {
      background: linear-gradient(145deg, #ffffff 0%, #f1f5f9 60%, #cbd5e1 100%) !important;
      box-shadow: 0 4px 0 #94a3b8, 0 8px 16px rgba(0, 0, 0, 0.45) !important;
    }

    .ludo-3d-dice.clickable {
      cursor: pointer !important;
      animation: ludoDicePulse 1.8s ease-in-out infinite alternate !important;
    }

    @keyframes ludoDicePulse {
      0% { transform: scale(0.98); }
      100% { transform: scale(1.04); }
    }

    .ludo-3d-dice.clickable:hover {
      transform: translateY(-2px);
    }

    .ludo-3d-dice.clickable:active {
      transform: translateY(2px) scale(0.96);
    }

    .ludo-3d-dice.border-red {
      border-color: #ef4444 !important;
      box-shadow: 0 4px 0 #dc2626, 0 6px 14px rgba(239, 68, 68, 0.3) !important;
    }
    .ludo-3d-dice.border-green {
      border-color: #10b981 !important;
      box-shadow: 0 4px 0 #059669, 0 6px 14px rgba(16, 185, 129, 0.3) !important;
    }
    .ludo-3d-dice.border-yellow {
      border-color: #f59e0b !important;
      box-shadow: 0 4px 0 #d97706, 0 6px 14px rgba(245, 158, 11, 0.3) !important;
    }
    .ludo-3d-dice.border-blue {
      border-color: #3b82f6 !important;
      box-shadow: 0 4px 0 #2563eb, 0 6px 14px rgba(59, 130, 246, 0.3) !important;
    }

    .ludo-direct-number-box {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
      height: 100% !important;
      user-select: none !important;
      pointer-events: none !important;
    }

    .ludo-direct-num {
      font-size: 38px !important;
      font-weight: 900 !important;
      line-height: 1 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif !important;
      color: #0f172a !important;
      letter-spacing: -1px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      pointer-events: none !important;
    }

    [data-theme="dark"] .ludo-direct-num {
      color: #0f172a !important;
    }

    .ludo-direct-number-box.num-6 .ludo-direct-num {
      color: #ef4444 !important;
      text-shadow: 0 1px 4px rgba(239, 68, 68, 0.35);
    }

    .ludo-3d-dice.rolling {
      animation: ludoDiceWobble 0.22s ease-in-out infinite alternate !important;
      pointer-events: none !important;
    }

    @keyframes ludoDiceWobble {
      0% { transform: rotate(-7deg) scale(0.96); }
      100% { transform: rotate(7deg) scale(1.04); }
    }

    .ludo-3d-dice.just-rolled {
      animation: ludoDicePop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }

    @keyframes ludoDicePop {
      0% { transform: scale(0.85); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
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
    /* Dots & Boxes 4x4 Arena */
    .dots-board-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: rgba(15, 23, 42, 0.4);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      max-width: 440px;
      margin: 0 auto;
    }
    .dots-scoreboard {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      width: 100%;
    }
    .dots-player-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(30, 41, 59, 0.7);
    }
    .dots-player-pill.active-turn {
      outline: 2px solid #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }
    .dots-grid-container {
      position: relative;
      padding: 12px;
      background: rgba(15, 23, 42, 0.85);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.4);
    }
    .dots-board-9x9 {
      display: grid;
      grid-template-columns: repeat(4, 18px 46px) 18px;
      grid-template-rows: repeat(4, 18px 46px) 18px;
      align-items: center;
      justify-items: center;
      user-select: none;
    }
    .dot-node {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #f8fafc;
      box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
      z-index: 5;
    }
    .dots-line {
      transition: all 0.15s ease;
      border-radius: 4px;
      z-index: 3;
    }
    .dots-line.h-line {
      width: 44px;
      height: 10px;
    }
    .dots-line.v-line {
      width: 10px;
      height: 44px;
    }
    .dots-line.empty {
      background: rgba(255, 255, 255, 0.08);
    }
    .dots-line.clickable {
      cursor: pointer;
    }
    .dots-line.clickable:hover {
      background: rgba(56, 189, 248, 0.7) !important;
      transform: scale(1.08);
      box-shadow: 0 0 8px #38bdf8;
    }
    .dots-line.drawn.c-red { background: #ef4444; box-shadow: 0 0 8px rgba(239, 68, 68, 0.6); }
    .dots-line.drawn.c-blue { background: #3b82f6; box-shadow: 0 0 8px rgba(59, 130, 246, 0.6); }
    .dots-line.drawn.c-green { background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.6); }
    .dots-line.drawn.c-amber { background: #f59e0b; box-shadow: 0 0 8px rgba(245, 158, 11, 0.6); }

    .dots-box-cell {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 800;
      border-radius: 6px;
      transition: all 0.2s ease;
      z-index: 1;
    }
    .dots-box-cell.closed.c-red { background: rgba(239, 68, 68, 0.25); color: #f87171; border: 1px dashed rgba(239, 68, 68, 0.4); }
    .dots-box-cell.closed.c-blue { background: rgba(59, 130, 246, 0.25); color: #60a5fa; border: 1px dashed rgba(59, 130, 246, 0.4); }
    .dots-box-cell.closed.c-green { background: rgba(16, 185, 129, 0.25); color: #34d399; border: 1px dashed rgba(16, 185, 129, 0.4); }
    .dots-box-cell.closed.c-amber { background: rgba(245, 158, 11, 0.25); color: #fbbf24; border: 1px dashed rgba(245, 158, 11, 0.4); }

    /* Chat Emoji Palette Popover */
    .chat-emoji-picker-popover {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 10px;
      width: 290px;
      max-height: 260px;
      background: var(--bg-surface, #1e293b);
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
      border-radius: 14px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
      z-index: 10005;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: popoverFadeIn 0.15s ease-out;
    }
    @keyframes popoverFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .emoji-picker-nav {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(0, 0, 0, 0.15);
      padding: 4px;
      gap: 2px;
    }
    .emoji-picker-tab {
      flex: 1;
      padding: 4px;
      font-size: 15px;
      background: transparent;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: background 0.12s;
    }
    .emoji-picker-tab:hover, .emoji-picker-tab.active {
      background: rgba(255, 255, 255, 0.12);
    }
    .emoji-picker-body {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 4px;
    }
    .emoji-picker-btn {
      background: transparent;
      border: none;
      font-size: 20px;
      padding: 6px 2px;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: transform 0.1s, background 0.1s;
    }
    .emoji-picker-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: scale(1.2);
    }

    /* Single-Player Arcade Styles */
    .arcade-hero-banner {
      background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(236, 72, 153, 0.12) 100%);
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
    }
    .arcade-game-card {
      background: var(--bg-surface, #1e293b);
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
      border-radius: 14px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }
    .arcade-game-card:hover {
      transform: translateY(-2px);
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
    .arcade-leaderboard-card {
      background: var(--bg-surface, #1e293b);
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
      border-radius: 14px;
      overflow: hidden;
    }
    .arcade-modal-card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 18px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
      max-width: 520px;
      width: 95%;
      margin: 30px auto;
      overflow: hidden;
      color: #f8fafc;
    }
    .arcade-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(15, 23, 42, 0.8);
    }
    .arcade-modal-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    /* 2048 Board */
    .grid-2048 {
      display: grid;
      grid-template-columns: repeat(4, 70px);
      grid-template-rows: repeat(4, 70px);
      gap: 8px;
      background: #bbada0;
      padding: 8px;
      border-radius: 10px;
    }
    .cell-2048 {
      background: rgba(238, 228, 218, 0.35);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 800;
      color: #776e65;
      user-select: none;
      transition: all 0.1s ease;
    }
    .cell-2048.val-2 { background: #eee4da; color: #776e65; }
    .cell-2048.val-4 { background: #ede0c8; color: #776e65; }
    .cell-2048.val-8 { background: #f2b179; color: #f9f6f2; }
    .cell-2048.val-16 { background: #f59563; color: #f9f6f2; }
    .cell-2048.val-32 { background: #f67c5f; color: #f9f6f2; }
    .cell-2048.val-64 { background: #f65e3b; color: #f9f6f2; }
    .cell-2048.val-128 { background: #edcf72; color: #f9f6f2; font-size: 20px; box-shadow: 0 0 8px rgba(237, 207, 114, 0.5); }
    .cell-2048.val-256 { background: #edcc61; color: #f9f6f2; font-size: 20px; box-shadow: 0 0 10px rgba(237, 204, 97, 0.6); }
    .cell-2048.val-512 { background: #edc850; color: #f9f6f2; font-size: 20px; box-shadow: 0 0 12px rgba(237, 200, 80, 0.7); }
    .cell-2048.val-1024 { background: #edc53f; color: #f9f6f2; font-size: 16px; box-shadow: 0 0 14px rgba(237, 197, 63, 0.8); }
    .cell-2048.val-2048 { background: #edc22e; color: #f9f6f2; font-size: 16px; box-shadow: 0 0 18px rgba(237, 194, 46, 0.9); }

    /* Memory Match Grid */
    .memory-grid {
      display: grid;
      grid-template-columns: repeat(4, 68px);
      gap: 10px;
      user-select: none;
    }
    .memory-card {
      width: 68px;
      height: 68px;
      border-radius: 10px;
      background: #1e293b;
      border: 2px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .memory-card:hover:not(.flipped):not(.matched) {
      border-color: #38bdf8;
      transform: scale(1.04);
    }
    .memory-card.flipped {
      background: #334155;
      border-color: #38bdf8;
      transform: rotateY(180deg);
    }
    .memory-card.matched {
      background: rgba(16, 185, 129, 0.2);
      border-color: #10b981;
      cursor: default;
    }

  `,document.head.appendChild(t)}function Ea(i){if(!i)return"";const t=f(i),e=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return t.replace(e,d=>`<a href="${d}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${d} ↗</a>`)}const xa=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],qt=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Yt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function fn(i,t={}){const{userRole:e="employee",currentUser:d=null,initialTicketId:h=null}=t,g=e==="superadmin"||e==="admin";if(e==="client"||d&&d.role==="client"){i.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let l=[],n={},K=[],ae=[],P={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:t.initialJobId||"all",myIssuesOnly:!1},O=null,ee="comments",X=!1;i.innerHTML=`
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
            ${qt.map(a=>`<option value="${a.key}">${a.icon} ${a.label}</option>`).join("")}
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
  `,await Promise.all([ct(),tt(),yt(),Ct()]),xt(),kt(),Pt(),at(),h&&ft(h);const we=setInterval(()=>{if(!document.contains(i)){clearInterval(we);return}!(i.querySelector(".dragging")||i.querySelector("input:focus")||i.querySelector("textarea:focus"))&&!O&&be()},12e3),Fe=()=>{document.contains(i)&&!O&&be()};window.addEventListener("focus",Fe);async function tt(){try{const a=new URLSearchParams;P.search&&a.set("search",P.search),P.priority!=="all"&&a.set("priority",P.priority),P.category!=="all"&&a.set("category",P.category),P.assigneeId!=="all"&&a.set("assigneeId",P.assigneeId),P.jobId&&P.jobId!=="all"&&a.set("jobId",P.jobId),P.reporterId&&P.reporterId!=="all"&&a.set("reporterId",P.reporterId),P.scope==="created"&&a.set("reporterId",d?._id||d?.id),P.scope==="assigned"&&a.set("assigneeId",d?._id||d?.id),P.myIssuesOnly&&a.set("myIssuesOnly","true");const o=await Ue("/tickets?"+a.toString());l=Array.isArray(o)?o:[]}catch(a){$(a.message||"Failed to load tickets",!0),l=[]}}async function ct(){try{n=await Ue("/tickets/stats")}catch(a){console.warn("Could not fetch ticket stats:",a)}}async function yt(){try{let a;try{a=await Ue("/tickets/staff")}catch{a=await Ue("/users")}K=(a||[]).filter(o=>o.active!==!1&&o.role!=="client")}catch(a){console.warn("Could not fetch employees:",a),K=[]}}async function Ct(){try{const a=await Ue("/jobs?limit=250");ae=Array.isArray(a)?a:a?.jobs||[]}catch(a){console.warn("Could not fetch jobs:",a)}}function xt(){const a=i.querySelector("#ci-360-stats-root");a&&(a.innerHTML=`
      <div class="ci-360-stat-card ${P.status==="all"&&!P.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="ci-360-stat-val">${n.total||0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${P.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${n.toDo||0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${P.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${n.content??(n.inProgress||0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${P.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${n.design||0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${P.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${n.underReview||0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${P.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
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
    `,a.querySelectorAll(".ci-360-stat-card").forEach(o=>{o.onclick=async()=>{const m=o.dataset.statFilter;m==="all"?(P.status="all",P.priority="all"):m==="critical"?(P.priority="Critical",P.status="all"):(P.status=m,P.priority="all"),await be()}}))}function Pt(){const a=i.querySelector("#ci-360-filter-assignee");a&&(a.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${K.map(m=>`
          <option value="${m._id}" ${P.assigneeId===m._id.toString()?"selected":""}>
            ${f(m.name)} (${f(m.role)})
          </option>
        `).join("")}
      `);const o=i.querySelector("#ci-360-filter-job");o&&(o.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${ae.map(m=>`
          <option value="${m._id}" ${P.jobId===m._id.toString()?"selected":""}>
            📁 ${f(m.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function kt(){const a=i.querySelector("#ci-360-board-columns-root");if(!a)return;const o={};xa.forEach(m=>{o[m.key]=[]}),l.forEach(m=>{let v=m.status||"To Do";v==="In Progress"?v="Content":v==="Resolved"?v="Under Review":v==="Closed"&&(v="Ready to Leave"),o[v]||(o[v]=[]),o[v].push(m)}),a.innerHTML=xa.map(m=>{const v=o[m.key]||[];return`
        <div class="ci-360-board-column" data-status="${m.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${f(m.label)}</span>
              <span class="ci-360-col-badge">${v.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${m.key}">
            ${v.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:v.map(B=>He(B)).join("")}
          </div>
        </div>
      `}).join(""),bt(),St()}function He(a){const o=qt.find(L=>L.key===a.category)||qt[0],m=Yt.find(L=>L.key===a.priority)||Yt[2],v=a.dueDate&&new Date(a.dueDate)<new Date&&a.status!=="Ready to Leave"&&a.status!=="Closed",B=(a.subtasks||[]).filter(L=>L.completed).length,G=(a.subtasks||[]).length,I=Array.isArray(a.assignees)&&a.assignees.length>0?a.assignees:a.assignee&&a.assignee.userId?[a.assignee]:[],U=d?._id||d?.id,V=a.reporter&&a.reporter.userId&&String(a.reporter.userId)===String(U)||a.userId&&String(a.userId)===String(U),F=e==="superadmin"||d?.role==="superadmin",J=V||F;let x="";if(I.length===0)x='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const L=I.slice(0,3),oe=I.length-3;x=`
        <div class="ci-360-avatar-group">
          ${L.map(A=>`
            <div class="ci-360-avatar" title="Assignee: ${f(A.name||"Member")} (${f(A.role||"")})">
              ${(A.avatar||A.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${oe>0?`
            <div class="ci-360-avatar extra-count" title="${oe} more assignees: ${f(I.slice(3).map(A=>A.name).join(", "))}">
              +${oe}
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
            ${V?`
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
          ${J?`
            <button type="button" class="ci-360-card-quick-del btn-delete-card-ticket" data-ticket-id="${a._id}" data-ticket-num="${f(a.ticketId)}" title="Delete Ticket (${F?"Superadmin":"Creator"})">
              🗑️
            </button>
          `:""}
        </div>

        <div class="ci-360-card-title" title="${f(a.title)}">
          ${f(a.title)}
        </div>

        ${a.jobTitle||a.jobId&&a.jobId.title?`
          <div class="ci-360-card-job-link" title="Linked Internal Job: ${f(a.jobTitle||a.jobId.title)}">
            📁 ${f(a.jobTitle||a.jobId.title)}
          </div>
        `:""}

        ${a.linkUrl||a.links&&a.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${f(a.linkUrl||a.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${f(a.linkUrl||a.links[0]?.url)}">
              🔗 ${a.links&&a.links[0]?.title?f(a.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="ci-360-card-bottom">
          <div class="ci-360-card-id-row">
            <span class="ci-360-pri-icon" title="Priority: ${m.label}">${m.icon}</span>
            <span class="ci-360-ticket-id">${f(a.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${G>0?`
              <span class="ci-360-subtask-badge" title="${B} of ${G} subtasks completed">
                ☑ ${B}/${G}
              </span>
            `:""}
            ${x}
          </div>
        </div>
      </div>
    `}function bt(){const a=i.querySelectorAll(".ci-360-card"),o=i.querySelectorAll(".ci-360-board-column");a.forEach(m=>{m.ondragstart=v=>{v.dataTransfer.setData("text/plain",m.dataset.ticketId),m.classList.add("dragging")},m.ondragend=()=>{m.classList.remove("dragging")}}),o.forEach(m=>{m.ondragover=v=>{v.preventDefault(),m.classList.add("drag-over")},m.ondragleave=()=>{m.classList.remove("drag-over")},m.ondrop=async v=>{v.preventDefault(),m.classList.remove("drag-over");const B=v.dataTransfer.getData("text/plain"),G=m.dataset.status;if(!B||!G)return;const I=l.find(J=>J._id.toString()===B);if(!I||I.status===G)return;const U=I.status,V=I.assignees?[...I.assignees]:[],F=I.assignee?{...I.assignee}:null;if(I.status=G,G==="Under Review"){const J={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};I.assignee=J,I.assignees=[J]}kt();try{const J=await ut(`/tickets/${B}/status`,{status:G}),x=G==="Under Review"?`Moved ${J.ticketId} to Under Review (Default assigned to John)`:`Moved ${J.ticketId} to ${G}`;$(x,!1),await be()}catch(J){$(J.message||"Status update failed",!0),I.status=U,I.assignees=V,I.assignee=F,await be()}}})}function St(){i.querySelectorAll(".btn-delete-card-ticket").forEach(a=>{a.onclick=async o=>{o.stopPropagation(),o.preventDefault();const m=a.dataset.ticketId,v=a.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${v}?`)){a.disabled=!0;try{await gt(`/tickets/${m}`),$(`Ticket ${v} deleted`,!1),await be()}catch(B){$(B.message||"Failed to delete ticket",!0),a.disabled=!1}}}}),i.querySelectorAll(".ci-360-card").forEach(a=>{a.onclick=o=>{if(o.target.tagName==="A"||o.target.closest(".btn-delete-card-ticket"))return;const m=a.dataset.ticketId;ft(m)}})}function at(){const a=i.querySelector("#btn-ci-360-refresh");a&&(a.onclick=async()=>{await be(),$("Board updated",!1)});const o=i.querySelector("#btn-ci-360-create-ticket");o&&(o.onclick=()=>{s()});const m=i.querySelector("#ci-360-search-input");let v=null;m&&(m.oninput=A=>{clearTimeout(v),v=setTimeout(async()=>{P.search=A.target.value.trim(),Xe(),await be()},300)});const B=i.querySelector("#ci-360-filter-priority");B&&(B.onchange=async A=>{P.priority=A.target.value,Xe(),await be()});const G=i.querySelector("#ci-360-filter-category");G&&(G.onchange=async A=>{P.category=A.target.value,Xe(),await be()});const I=i.querySelector("#ci-360-filter-job");I&&(I.onchange=async A=>{P.jobId=A.target.value,Xe(),await be()});const U=i.querySelector("#ci-360-filter-assignee");U&&(U.onchange=async A=>{P.assigneeId=A.target.value,Xe(),await be()});const V=i.querySelector("#ci-360-pill-my-issues");V&&(V.onclick=async()=>{P.myIssuesOnly=!P.myIssuesOnly,V.classList.toggle("active",P.myIssuesOnly),Xe(),await be()});const F=i.querySelector("#ci-360-pill-scope-all"),J=i.querySelector("#ci-360-pill-scope-assigned"),x=i.querySelector("#ci-360-pill-scope-created"),L=async A=>{P.scope=A,F&&F.classList.toggle("active",A==="all"),J&&J.classList.toggle("active",A==="assigned"),x&&x.classList.toggle("active",A==="created"),Xe(),await be()};F&&(F.onclick=()=>L("all")),J&&(J.onclick=()=>L("assigned")),x&&(x.onclick=()=>L("created"));const oe=i.querySelector("#ci-360-clear-filters");oe&&(oe.onclick=async()=>{P={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},m&&(m.value=""),B&&(B.value="all"),G&&(G.value="all");const A=i.querySelector("#ci-360-filter-job");A&&(A.value="all"),U&&(U.value="all"),V&&V.classList.remove("active"),F&&F.classList.add("active"),J&&J.classList.remove("active"),x&&x.classList.remove("active"),Xe(),await be()})}function Xe(){const a=i.querySelector("#ci-360-clear-filters");if(!a)return;const o=P.search||P.priority!=="all"||P.category!=="all"||P.jobId&&P.jobId!=="all"||P.assigneeId!=="all"||P.myIssuesOnly||P.scope&&P.scope!=="all";a.style.display=o?"inline":"none"}async function be(){await tt(),kt()}async function ft(a){const o=i.querySelector("#ci-360-modals-root");if(o){o.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{O=await Ue(`/tickets/${a}`)}catch(m){$(m.message||"Could not load ticket",!0),o.innerHTML="";return}Te()}}function Te(){const a=i.querySelector("#ci-360-modals-root");if(!a||!O)return;const o=O,m=qt.find(S=>S.key===o.category)||qt[0];Yt.find(S=>S.key===o.priority)||Yt[2];const v=o.subtasks||[],B=v.filter(S=>S.completed).length,G=v.length>0?Math.round(B/v.length*100):0,I=o.attachments||[],U=o.comments||[],V=(o.history||[]).slice().reverse(),F=o.workLogs||[],J=o.linkedTickets||[],x=d?._id||d?.id,L=o.reporter&&o.reporter.userId&&String(o.reporter.userId)===String(x)||o.userId&&String(o.userId)===String(x),oe=e==="superadmin"||d?.role==="superadmin",A=L||oe,R=Array.isArray(o.assignees)&&o.assignees.length>0?o.assignees:o.assignee&&o.assignee.userId?[o.assignee]:[];R.some(S=>S&&S.userId&&String(S.userId)===String(x));const te=o.jobId?._id?o.jobId._id.toString():o.jobId?o.jobId.toString():"",z=o.jobTitle||o.jobId&&o.jobId.title||"";a.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${m.slug}">${m.icon} ${m.label}</span>
              <span class="ci-360-ticket-id" style="font-size:13px;color:#38bdf8;">${f(o.ticketId)}</span>
            </div>
            <button class="ci-360-modal-close" id="btn-close-ci-360-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="ci-360-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="ci-360-detail-main">
              <!-- Issue Title Header -->
              <div class="ci-360-issue-header-wrap">
                <input type="text" class="ci-360-editable-title" id="inp-detail-title" value="${f(o.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Description</span>
                  <button type="button" class="ci-360-tool-btn" id="btn-toggle-desc-edit">
                    ${X?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${X?`
                  <div class="ci-360-editor-toolbar">
                    <button type="button" class="ci-360-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="ci-360-desc-editor" rows="6">${f(o.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-ci-360-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="ci-360-desc-wrap" id="view-detail-desc">
                    ${o.description?Ea(o.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>🔗 Reference &amp; External Links (${(o.links||[]).length+(o.linkUrl&&!(o.links||[]).some(S=>S.url===o.linkUrl)?1:0)})</span>
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
                    ${o.linkUrl&&!(o.links||[]).some(S=>S.url===o.linkUrl)?`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${f(o.linkUrl)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${f(o.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${f(o.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${f(o.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    `:""}
                    ${(o.links||[]).map(S=>`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${f(S.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${f(S.title||S.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${S.title?`<span style="word-break:break-all;">${f(S.url)}</span> · `:""}Added by ${f(S.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${f(S.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${f(S.url)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${S.id}" title="Remove Link">&times;</button>
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
                  <span>Attachments (${I.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${I.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${I.map(S=>{const xe=S.type&&S.type.includes("video")||S.name&&S.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||S.url&&S.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="ci-360-att-card ${xe?"is-video":""}" style="${xe?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${xe?"16px":"13px"};">${xe?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${S.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${f(S.name)}">
                                  ${f(S.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${wa(S.size)} ${xe?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${xe?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${S.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${S.url}" download="${f(S.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${S.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${xe?`
                            <div class="ci-360-video-slot" id="video-slot-${S.id}" style="display:none;margin-top:6px;width:100%;">
                              <video controls preload="metadata" style="width:100%;max-height:360px;border-radius:6px;background:#000;">
                                <source src="${S.url}" type="${S.type||"video/mp4"}">
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
                  <span>Subtasks (${B}/${v.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${G}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${G}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${v.map(S=>`
                    <div class="ci-360-subtask-item">
                      <div class="ci-360-subtask-left">
                        <input type="checkbox" class="ci-360-subtask-cb cb-subtask-toggle" data-subtask-id="${S.id}" ${S.completed?"checked":""} />
                        <span class="ci-360-subtask-title ${S.completed?"done":""}">${f(S.title)}</span>
                      </div>
                      <button type="button" class="ci-360-att-del btn-del-subtask" data-subtask-id="${S.id}" title="Remove subtask">&times;</button>
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
                  <span>Linked Work Items (${J.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${J.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${J.map(S=>`
                      <div class="ci-360-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${f(S.relationship)}</span>
                          <span class="ci-360-ticket-id" style="color:#38bdf8;">${f(S.ticketId)}</span>
                          <span class="ci-360-linked-title" style="font-size:12.5px;">${f(S.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="ci-360-col-badge">${f(S.status||"Open")}</span>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${S.id}" title="Remove link">&times;</button>
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
                    ${z?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${z?`
                  <div class="ci-360-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div class="ci-360-job-card-title" style="font-weight:700;font-size:13px;">${f(z)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${f(te)}</div>
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
                      ${ae.map(S=>`
                        <option value="${S._id}" ${te===S._id.toString()?"selected":""}>
                          📁 ${f(S.title||"Untitled Job")}
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
                  <button type="button" class="ci-360-act-tab ${ee==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${U.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${ee==="history"?"active":""}" data-act-tab="history">
                    History (${V.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${ee==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${F.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${ee==="comments"?`
                  <div class="ci-360-comments-feed">
                    ${U.map(S=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(S.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${f(S.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${f(S.userRole)})</span></span>
                            <span class="ci-360-comment-time">${pa(S.createdAt)}</span>
                          </div>
                          <div class="ci-360-comment-body">${Ea(S.content)}</div>
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
                ${ee==="history"?`
                  <div class="ci-360-history-feed">
                    ${V.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:V.map(S=>`
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(S.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${f(S.userName)}</span>
                            <span class="ci-360-comment-time">${pa(S.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="ci-360-history-field">${f(S.field)}</strong>:
                            ${S.from?`<span style="text-decoration:line-through;color:#ef4444;">${f(S.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${f(S.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${ee==="worklog"?`
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

                    ${F.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:F.map(S=>`
                      <div class="ci-360-worklog-item">
                        <div class="ci-360-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(S.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-worklog-main">
                          <div class="ci-360-worklog-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${f(S.userName)} logged <strong style="color:#38bdf8;">${f(S.timeSpent)}</strong></span>
                            <span class="ci-360-comment-time">${pa(S.loggedAt)}</span>
                          </div>
                          ${S.description?`<div class="ci-360-comment-body" style="font-size:12px;">${f(S.description)}</div>`:""}
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
                  ${xa.map(S=>{let xe=o.status||"To Do";return xe==="In Progress"?xe="Content":xe==="Resolved"?xe="Under Review":xe==="Closed"&&(xe="Ready to Leave"),`
                      <option value="${S.key}" ${xe===S.key?"selected":""}>
                        ${S.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="ci-360-select-field">
                  ${Yt.map(S=>`
                    <option value="${S.key}" ${o.priority===S.key?"selected":""}>
                      ${S.icon} ${S.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="ci-360-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="ci-360-side-lbl" style="margin-bottom:0;">Assigned Personnel (${R.length})</span>
                  
                    <button type="button" class="ci-360-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="ci-360-assigned-chips-wrap">
                  ${R.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:R.map(S=>`
                    <div class="ci-360-assignee-chip">
                      <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(S.avatar||S.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="ci-360-assignee-chip-name" title="${f(S.name)}">${f(S.name)}</span>
                      ${`
                        <button type="button" class="ci-360-assignee-chip-remove btn-remove-assignee" data-user-id="${S.userId}" title="Remove ${f(S.name)}">&times;</button>
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
                    ${K.map(S=>{const xe=R.some(Be=>Be&&Be.userId&&String(Be.userId)===String(S._id));return`
                        <label class="ci-360-emp-check-item ${xe?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${S._id}" ${xe?"checked":""} />
                          <div class="ci-360-avatar" style="width:18px;height:18px;font-size:9px;">${(S.name||"U").slice(0,1).toUpperCase()}</div>
                          <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                            ${f(S.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${f(S.role)})</span>
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
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${f(o.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${f(o.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Category</span>
                <select id="sel-detail-category" class="ci-360-select-field">
                  ${qt.map(S=>`
                    <option value="${S.key}" ${o.category===S.key?"selected":""}>
                      ${S.icon} ${S.label}
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
                  ${ae.map(S=>`
                    <option value="${S._id}" ${te===S._id.toString()?"selected":""}>
                      📁 ${f(S.title||"Untitled Job")}
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
              ${A?`
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
    `,It()}function It(){const a=i.querySelector("#ci-360-modals-root");if(!a||!O)return;const o=a.querySelector("#btn-close-ci-360-modal");o&&(o.onclick=wt);const m=a.querySelector("#ci-360-detail-backdrop");m&&(m.onclick=y=>{y.target===m&&wt()});const v=a.querySelector("#inp-detail-title");v&&(v.onchange=async()=>{const y=v.value.trim();if(y)try{O=await ut(`/tickets/${O._id}`,{title:y}),await be()}catch(W){$(W.message||"Failed to update title",!0)}});const B=a.querySelector("#btn-toggle-desc-edit");B&&(B.onclick=()=>{X=!X,Te()});const G=a.querySelector("#btn-cancel-desc");G&&(G.onclick=()=>{X=!1,Te()});const I=a.querySelector("#btn-save-desc");I&&(I.onclick=async()=>{const y=a.querySelector("#inp-detail-desc")?.value;try{O=await ut(`/tickets/${O._id}`,{description:y}),X=!1,Te(),await be(),$("Description saved",!1)}catch(W){$(W.message||"Failed to save description",!0)}});const U=a.querySelector("#sel-detail-status");U&&(U.onchange=async y=>{try{const W=await ut(`/tickets/${O._id}/status`,{status:y.target.value});O=W,Te(),await ct(),xt(),await be();const p=W.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${W.status}`;$(p,!1)}catch(W){$(W.message||"Status change failed",!0)}});const V=a.querySelector("#sel-detail-priority");V&&(V.onchange=async y=>{try{O=await ut(`/tickets/${O._id}`,{priority:y.target.value}),Te(),await be()}catch(W){$(W.message,!0)}});const F=a.querySelector("#btn-toggle-assignee-picker"),J=a.querySelector("#ci-360-detail-assignee-box"),x=a.querySelector("#btn-close-detail-assignee-box"),L=a.querySelector("#btn-save-detail-assignees");F&&J&&(F.onclick=()=>{const y=J.style.display==="none";J.style.display=y?"block":"none"}),x&&J&&(x.onclick=()=>{J.style.display="none"}),a.querySelectorAll(".chk-detail-emp").forEach(y=>{y.onchange=()=>{y.closest(".ci-360-emp-check-item")?.classList.toggle("selected",y.checked)}}),L&&(L.onclick=async()=>{const y=Array.from(a.querySelectorAll(".chk-detail-emp:checked")).map(W=>W.value);try{L.disabled=!0,O=await ut(`/tickets/${O._id}`,{assigneeIds:y}),Te(),await be(),$("Assignees updated!",!1)}catch(W){$(W.message,!0),L.disabled=!1}}),a.querySelectorAll(".btn-remove-assignee").forEach(y=>{y.onclick=async()=>{const W=y.dataset.userId,Ie=(Array.isArray(O.assignees)&&O.assignees.length>0?O.assignees:O.assignee?.userId?[O.assignee]:[]).filter(Z=>Z&&Z.userId&&String(Z.userId)!==String(W)).map(Z=>String(Z.userId));try{O=await ut(`/tickets/${O._id}`,{assigneeIds:Ie}),Te(),await be(),$("Assignee removed",!1)}catch(Z){$(Z.message,!0)}}});const oe=a.querySelector("#sel-detail-category");oe&&(oe.onchange=async y=>{try{O=await ut(`/tickets/${O._id}`,{category:y.target.value}),Te(),await be()}catch(W){$(W.message,!0)}});const A=a.querySelector("#inp-detail-duedate");A&&(A.onchange=async y=>{try{O=await ut(`/tickets/${O._id}`,{dueDate:y.target.value||null}),Te(),await be()}catch(W){$(W.message,!0)}});const R=a.querySelector("#sel-detail-job");R&&(R.onchange=async y=>{try{O=await ut(`/tickets/${O._id}`,{jobId:y.target.value||null}),Te(),await be(),$(y.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(W){$(W.message,!0)}});const te=a.querySelector("#btn-toggle-job-link"),z=a.querySelector("#ci-360-job-link-box");te&&z&&(te.onclick=()=>{z.style.display=z.style.display==="none"?"block":"none"});const S=a.querySelector("#btn-cancel-job-link");S&&z&&(S.onclick=()=>{z.style.display="none"});const xe=a.querySelector("#btn-save-job-link");xe&&(xe.onclick=async()=>{const y=a.querySelector("#inp-modal-job-select")?.value||null;try{O=await ut(`/tickets/${O._id}`,{jobId:y}),Te(),await be(),$(y?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(W){$(W.message,!0)}});const Be=a.querySelector("#btn-unlink-job");Be&&(Be.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{O=await ut(`/tickets/${O._id}`,{jobId:null}),Te(),await be(),$("Job unlinked",!1)}catch(y){$(y.message,!0)}});const Pe=a.querySelector("#inp-detail-esthours");Pe&&(Pe.onchange=async y=>{try{O=await ut(`/tickets/${O._id}`,{estimatedHours:Number(y.target.value)||0})}catch(W){$(W.message,!0)}}),a.querySelectorAll(".cb-subtask-toggle").forEach(y=>{y.onchange=async()=>{const W=y.dataset.subtaskId;try{O=await ut(`/tickets/${O._id}/subtasks/${W}`,{completed:y.checked}),Te(),await be()}catch(p){$(p.message,!0)}}}),a.querySelectorAll(".btn-del-subtask").forEach(y=>{y.onclick=async()=>{const W=y.dataset.subtaskId;try{O=await gt(`/tickets/${O._id}/subtasks/${W}`),Te(),await be()}catch(p){$(p.message,!0)}}});const Ne=a.querySelector("#inp-new-subtask"),c=a.querySelector("#btn-add-subtask"),b=async()=>{const y=Ne?.value.trim();if(y)try{O=await Ae(`/tickets/${O._id}/subtasks`,{title:y}),Te(),await be()}catch(W){$(W.message,!0)}};c&&(c.onclick=b),Ne&&(Ne.onkeydown=y=>{y.key==="Enter"&&(y.preventDefault(),b())});const r=a.querySelector("#btn-toggle-add-link"),u=a.querySelector("#add-link-form"),w=a.querySelector("#btn-cancel-new-link"),E=a.querySelector("#btn-save-new-link"),C=a.querySelector("#inp-new-link-url"),N=a.querySelector("#inp-new-link-title");r&&u&&(r.onclick=()=>{const y=u.style.display==="none";u.style.display=y?"block":"none",y&&C&&C.focus()}),w&&u&&(w.onclick=()=>{u.style.display="none",C&&(C.value=""),N&&(N.value="")}),E&&C&&(E.onclick=async()=>{const y=C.value.trim(),W=N?.value.trim()||"";if(!y){$("Please enter a valid URL link",!0);return}try{E.disabled=!0,E.textContent="Saving...",O=await Ae(`/tickets/${O._id}/links`,{url:y,title:W}),Te(),await be(),$("Reference link added! 🔗",!1)}catch(p){$(p.message||"Failed to save link",!0),E.disabled=!1,E.textContent="Save Link 🔗"}}),a.querySelectorAll(".btn-copy-link").forEach(y=>{y.onclick=()=>{const W=y.dataset.url;W&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(W).then(()=>{$("Link copied to clipboard! 📋")}).catch(()=>{$("Link: "+W)}):$("Link: "+W))}}),a.querySelectorAll(".btn-del-link").forEach(y=>{y.onclick=async()=>{const W=y.dataset.linkId;try{O=await gt(`/tickets/${O._id}/links/${W}`),Te(),await be(),$("Link removed")}catch(p){$(p.message||"Failed to remove link",!0)}}});const ie=a.querySelector("#btn-trigger-detail-upload"),M=a.querySelector("#inp-detail-att-upload"),Q=a.querySelector("#detail-att-upload-progress");ie&&M&&(ie.onclick=y=>{y.preventDefault(),M.click()}),M&&(M.onchange=async()=>{const y=Array.from(M.files||[]);if(M.value="",!!y.length){Q&&(Q.style.display="block",Q.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${y.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const p=(await $a(y,Ie=>{const Z=a.querySelector("#att-prog-pct"),_e=a.querySelector("#att-prog-bar");Z&&(Z.textContent=`${Ie}%`),_e&&(_e.style.width=`${Ie}%`)})).map(Ie=>({name:Ie.name,url:Ie.url,size:Ie.size||0,type:Ie.type||"application/octet-stream"}));p.length&&(O=await Ae(`/tickets/${O._id}/attachments`,{attachments:p}),Te(),$(`Successfully attached ${p.length} file(s)! 📎`,!1))}catch(W){console.error("Upload error:",W),$(`Upload failed: ${W.message}`,!0)}finally{Q&&(Q.style.display="none")}}}),a.querySelectorAll(".btn-play-att-video").forEach(y=>{y.onclick=()=>{const W=y.dataset.slot,p=a.querySelector("#"+W);if(p){const Ie=p.style.display==="none";p.style.display=Ie?"block":"none",y.textContent=Ie?"⏸ Close Video":"▶ Play Video";const Z=p.querySelector("video");Z&&Ie?Z.play().catch(()=>{}):Z&&Z.pause()}}}),a.querySelectorAll(".btn-del-att").forEach(y=>{y.onclick=async()=>{const W=y.dataset.attId;try{O=await gt(`/tickets/${O._id}/attachments/${W}`),Te()}catch(p){$(p.message,!0)}}}),a.querySelectorAll(".ci-360-act-tab").forEach(y=>{y.onclick=()=>{ee=y.dataset.actTab,Te()}});const T=a.querySelector("#inp-new-comment"),me=a.querySelector("#btn-submit-comment");me&&T&&(me.onclick=async()=>{const y=T.value.trim();if(y)try{me.disabled=!0,me.textContent="Saving...",O=await Ae(`/tickets/${O._id}/comments`,{content:y}),Te(),$("Comment added",!1)}catch(W){$(W.message||"Failed to add comment",!0)}finally{me.disabled=!1}});const se=a.querySelector("#btn-open-link-dialog"),ce=a.querySelector("#ci-360-link-box"),pe=a.querySelector("#btn-cancel-link"),fe=a.querySelector("#btn-submit-link"),Ce=a.querySelector("#inp-link-target"),Ee=a.querySelector("#sel-link-rel");se&&ce&&(se.onclick=()=>{ce.style.display="block"}),pe&&ce&&(pe.onclick=()=>{ce.style.display="none"}),fe&&ce&&(fe.onclick=async()=>{const y=Ce?.value.trim(),W=Ee?.value||"relates to";if(y)try{fe.disabled=!0,O=await Ae(`/tickets/${O._id}/links`,{targetTicketId:y,relationship:W}),Te(),$(`Linked with ${y}`,!1)}catch(p){$(p.message||"Failed to link ticket",!0)}finally{fe.disabled=!1}}),a.querySelectorAll(".btn-del-link").forEach(y=>{y.onclick=async()=>{const W=y.dataset.linkId;try{O=await gt(`/tickets/${O._id}/links/${W}`),Te()}catch(p){$(p.message,!0)}}});const j=a.querySelector("#btn-open-worklog-dialog"),le=a.querySelector("#ci-360-worklog-box"),$e=a.querySelector("#btn-cancel-worklog"),q=a.querySelector("#btn-submit-worklog"),re=a.querySelector("#inp-worklog-time"),ue=a.querySelector("#inp-worklog-desc");j&&le&&(j.onclick=()=>{le.style.display="block"}),$e&&le&&($e.onclick=()=>{le.style.display="none"}),q&&le&&(q.onclick=async()=>{const y=re?.value.trim(),W=ue?.value.trim();if(!y){$("Enter time spent (e.g. 2h 30m)",!0);return}try{q.disabled=!0,O=await Ae(`/tickets/${O._id}/worklogs`,{timeSpent:y,description:W}),Te(),$("Work logged",!1)}catch(p){$(p.message||"Failed to log work",!0)}finally{q.disabled=!1}});const ke=a.querySelector("#btn-delete-ticket");ke&&(ke.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${O.ticketId}?`))try{ke.disabled=!0,await gt(`/tickets/${O._id}`),$(`Ticket ${O.ticketId} deleted`,!1),wt(),await ct(),xt(),await be()}catch(y){$(y.message||"Failed to delete ticket",!0),ke.disabled=!1}})}function wt(){O=null,X=!1;const a=i.querySelector("#ci-360-modals-root");a&&(a.innerHTML="")}function s(a=null){const o=i.querySelector("#ci-360-modals-root");if(!o)return;const m=a||(P.jobId&&P.jobId!=="all"?P.jobId:null);o.innerHTML=`
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
                  ${qt.map(z=>`<option value="${z.key}">${z.icon} ${z.label}</option>`).join("")}
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
                  ${K.map(z=>{const S=d&&String(d._id||d.id)===String(z._id);return`
                      <label class="ci-360-emp-check-item ${S?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${z._id}" ${S?"checked":""} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(z.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${f(z.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${f(z.role)})${S?" — (You)":""}</span>
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
                  ${ae.map(z=>`
                    <option value="${z._id}" ${m&&String(m)===String(z._id)?"selected":""}>
                      📁 ${f(z.title||"Untitled Job")}
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
    `;const v=()=>{o.querySelectorAll(".ci-360-emp-check-item").forEach(z=>{const S=z.querySelector(".chk-create-emp");z.classList.toggle("selected",!!S?.checked)})};o.querySelectorAll(".chk-create-emp").forEach(z=>{z.onchange=v});const B=o.querySelector("#btn-create-assign-self");B&&d&&(B.onclick=()=>{const z=String(d._id||d.id);o.querySelectorAll(".chk-create-emp").forEach(S=>{S.value===z&&(S.checked=!0)}),v()});const G=o.querySelector("#btn-create-clear-assign");G&&(G.onclick=()=>{o.querySelectorAll(".chk-create-emp").forEach(z=>{z.checked=!1}),v()});const I=[],U=o.querySelector("#inp-create-ticket-att"),V=o.querySelector("#create-att-list"),F=o.querySelector("#create-att-count"),J=o.querySelector("#create-att-progress"),x=()=>{F&&(F.textContent=`${I.length} file(s) attached`),V&&(V.innerHTML=I.map((z,S)=>{const xe=z.type&&z.type.includes("video")||z.name&&z.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${xe?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${f(z.name)}">${f(z.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${wa(z.size)} ${xe?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${S}" title="Remove">&times;</button>
          </div>
        `}).join(""),V.querySelectorAll(".btn-del-pending-att").forEach(z=>{z.onclick=()=>{I.splice(Number(z.dataset.idx),1),x()}}))};U&&(U.onchange=async()=>{const z=Array.from(U.files||[]);if(U.value="",!!z.length){J&&(J.style.display="block",J.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${z.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await $a(z,xe=>{const Be=o.querySelector("#create-prog-pct"),Pe=o.querySelector("#create-prog-bar");Be&&(Be.textContent=`${xe}%`),Pe&&(Pe.style.width=`${xe}%`)})).forEach(xe=>{I.push({name:xe.name,url:xe.url,size:xe.size||0,type:xe.type||"application/octet-stream"})}),x()}catch(S){$(`Failed to upload files: ${S.message}`,!0)}finally{J&&(J.style.display="none"),U.value=""}}});const L=()=>{o.innerHTML=""},oe=o.querySelector("#btn-close-create-modal");oe&&(oe.onclick=L);const A=o.querySelector("#btn-cancel-create-ticket");A&&(A.onclick=L);const R=o.querySelector("#ci-360-create-backdrop");R&&(R.onclick=z=>{z.target===R&&L()});const te=o.querySelector("#btn-submit-create-ticket");te&&(te.onclick=async()=>{const z=o.querySelector("#create-ticket-title")?.value.trim(),S=o.querySelector("#create-ticket-desc")?.value.trim(),xe=o.querySelector("#create-ticket-cat")?.value||"Task",Be=o.querySelector("#create-ticket-pri")?.value||"Medium",Ne=Array.from(o.querySelectorAll(".chk-create-emp:checked")).map(u=>u.value),c=o.querySelector("#create-ticket-duedate")?.value||null,b=o.querySelector("#create-ticket-job")?.value||null,r=o.querySelector("#create-ticket-url")?.value.trim()||"";if(!z){$("Ticket summary / title is required",!0);return}try{te.disabled=!0,te.textContent="Creating...";const u=await Ae("/tickets",{title:z,description:S,category:xe,priority:Be,assigneeIds:Ne,assigneeId:Ne[0]||null,dueDate:c,jobId:b,linkUrl:r,attachments:I});$(`Ticket ${u.ticketId} created! 🎫`,!1),L(),await ct(),xt(),await be(),ft(u._id)}catch(u){$(u.message||"Could not create ticket",!0),te.disabled=!1,te.textContent="Create Ticket 🚀"}})}i._openCreateTicketModal=s,i._openTicketDetailModal=ft,i._setJobFilter=async a=>{P.jobId=a||"all";const o=i.querySelector("#ci-360-filter-job");o&&(o.value=P.jobId),Xe(),await be()}}export{fn as a,mn as b,bn as i};
