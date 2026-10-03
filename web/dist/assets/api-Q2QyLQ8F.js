(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const Tt="/api";function ot(){return localStorage.getItem("ci360_token")}function U(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function Mt(t,i){localStorage.setItem("ci360_token",t),localStorage.setItem("ci360_user",JSON.stringify(i))}function st(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function _t(t){const i=ot(),e=U();if(!i||!e)return window.location.href="/login",null;const n=e.name&&e.name.toLowerCase().includes("ekta")||e.email&&e.email.toLowerCase().includes("ekta");return t&&e.role!==t&&e.role!=="superadmin"?(e.role==="accounts"||n)&&(t==="accounts"||t==="employee")?e:(window.location.href=e.role==="superadmin"?"/admin":e.role==="accounts"||n?"/accounts":e.role==="employee"?"/employee":"/client",null):e}async function D(t,i={}){const e=ot(),n=Object.assign({"Content-Type":"application/json"},i.headers||{});e&&(n.Authorization="Bearer "+e);const s=await fetch(Tt+t,Object.assign({},i,{headers:n}));if(s.status===401)throw st(),window.location.href="/login",new Error("Session expired");let o=null;try{o=await s.json()}catch{}if(!s.ok)throw new Error(o&&o.error||"Server status "+s.status+" — Backend waking up, please retry in 10s.");return o}const at=t=>D(t,{method:"GET"}),lt=(t,i)=>D(t,{method:"POST",body:JSON.stringify(i)}),G=(t,i)=>D(t,{method:"PUT",body:JSON.stringify(i)}),At=(t,i)=>D(t,{method:"PATCH",body:JSON.stringify(i)}),rt=t=>D(t,{method:"DELETE"});function tt(t){return t=Number(t)||0,"₹"+t.toLocaleString("en-IN",{maximumFractionDigits:0})}function Lt(t){return(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function h(t){return t==null?"":String(t).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function V(t){return t?new Date(t).toISOString().slice(0,10):"—"}function _(){return localStorage.getItem("ci360_theme")||"light"}function z(t){localStorage.setItem("ci360_theme",t),document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const o=s.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function xt(){const t=_();document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const o=s.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{xt()}catch{}function x(t,i){const e=document.createElement("div");e.className="toast",e.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",e.textContent=(i?"⚠️  ":"✓  ")+t,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>e.remove(),200)},2800)}function ct(t){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${t}</div>`,i.onclick=e=>{e.target===i&&i.remove()},document.body.appendChild(i),i}function H(){st(),window.location.href="/login"}let et=null;async function dt(){if("serviceWorker"in navigator)try{et=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",et.scope)}catch(t){console.warn("CI360 Service Worker registration notice:",t)}}try{dt()}catch{}let gt=0,ht=0;const L=new Set,yt=new Set;let bt=!1;function Bt(t){try{const i=typeof U=="function"?U():null,e=i&&i._id?String(i._id):"default";return`${t}_${e}`}catch{return`${t}_default`}}function X(){try{const t=Bt("ci360_alerted_ids"),i=localStorage.getItem(t);if(i){const e=JSON.parse(i);Array.isArray(e)&&e.forEach(n=>L.add(String(n)))}}catch{}}function Y(){try{const t=Bt("ci360_alerted_ids"),i=Array.from(L).slice(-2e3);localStorage.setItem(t,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",t=>{t.key&&t.key.includes("ci360_alerted_ids")&&X()});let q=null;function Nt(){if(typeof window>"u")return;const t=()=>{try{const i=window.AudioContext||window.webkitAudioContext;i&&(q||(q=new i),q.state==="suspended"&&q.resume())}catch{}window.removeEventListener("touchstart",t,!0),window.removeEventListener("pointerdown",t,!0),window.removeEventListener("click",t,!0)};window.addEventListener("touchstart",t,!0),window.addEventListener("pointerdown",t,!0),window.addEventListener("click",t,!0)}Nt();function F(){try{const t=Date.now();if(t-gt<2500)return;gt=t;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const e=q||new i;e.state==="suspended"&&e.resume();const n=e.currentTime,s=e.createOscillator(),o=e.createGain();s.type="sine",s.frequency.setValueAtTime(587.33,n),o.gain.setValueAtTime(0,n),o.gain.linearRampToValueAtTime(.25,n+.02),o.gain.exponentialRampToValueAtTime(.001,n+.38),s.connect(o),o.connect(e.destination),s.start(n),s.stop(n+.38);const a=e.createOscillator(),r=e.createGain();a.type="sine",a.frequency.setValueAtTime(880,n+.12),r.gain.setValueAtTime(0,n+.12),r.gain.linearRampToValueAtTime(.28,n+.14),r.gain.exponentialRampToValueAtTime(.001,n+.6),a.connect(r),r.connect(e.destination),a.start(n+.12),a.stop(n+.6)}catch{}}function J(){try{const t=Date.now();if(t-ht<2500)return;ht=t,"vibrate"in navigator&&navigator.vibrate([200,100,200,100,200])}catch{}}function Dt(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function $t(){try{if(Dt()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function ut(){if(!("Notification"in window))return x("Your device browser does not support Web Notifications.",!0),!1;try{const t=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return t==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),x("Notifications successfully enabled on this device!"),F(),J(),await O({title:"CI360 Alerts Active 🔔",message:"Instant notifications are now live on this device for jobs, tasks, and overdue invoices!",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),x("Notification permission was not granted.",!0),!1)}catch(t){console.error("Notification permission request error:",t)}return!1}async function O({title:t,message:i,type:e,id:n,url:s}){const o=n?String(n):null;if(X(),o&&L.has(o)||(o&&(L.add(o),Y()),F(),J(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return;localStorage.setItem("ci360_notif_enabled","true")}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",r={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:o?`ci360-notif-${o}`:"ci360-alert-"+Date.now(),renotify:!0,vibrate:[200,100,200,100,200],data:{url:s||(typeof window<"u"?window.location.href:""),type:e||"general"}};try{navigator.serviceWorker&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:t,options:r})}catch{}try{if("serviceWorker"in navigator){const p=et||await navigator.serviceWorker.getRegistration();if(p&&p.showNotification){await p.showNotification(t,r);return}}}catch{}try{const p=new Notification(t,r);p.onclick=()=>{window.focus(),p.close()};return}catch{}}async function St(){F(),J(),Q({id:"test-"+Date.now(),title:"🔔 CI360 Alert Test",message:"Sound, vibration, in-app popup, and device notifications are active!",type:"test"}),await O({title:"🔔 CI360 Alert Test",message:"Sound, vibration, in-app popup, and device notifications are active on this device!",type:"test",id:"test-sys-"+Date.now()}),x("Test alert triggered on this device!")}if(typeof window<"u"&&(window.triggerSystemNotification=O,window.requestNotificationPermission=ut,window.testDeviceNotification=St,"Notification"in window)){const t=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",t,!0),window.removeEventListener("touchstart",t,!0)};window.addEventListener("click",t,!0),window.addEventListener("touchstart",t,!0)}function Pt(){if(typeof document>"u")return null;let t=document.getElementById("ci360FloatingContainer");return t||(t=document.createElement("div"),t.id="ci360FloatingContainer",t.className="ci360-floating-container",document.body.appendChild(t)),t}function Q({id:t,title:i,message:e,type:n,time:s,actionText:o,onAction:a,persistent:r=!1,timeout:p=8e3}){const m=Pt();if(!m)return;const S=`ci360-pop-${t||Math.random().toString(36).slice(2,9)}`;if(document.getElementById(S))return;let g="🔔",f="info",u="UPDATE",C="View Details",B="";const k=(n||"").toLowerCase(),T=(e||"").toLowerCase();k.includes("invoice_overdue")?(g="🚨",f="critical",u="OVERDUE INVOICE",C="Pay / View Invoice",B="billing"):k.includes("invoice_paid")||k.includes("payment")?(g="💳",f="success",u="PAYMENT CLEARED",C="View Billing",B="billing"):k.includes("invoice")?(g="🧾",f="info",u="NEW INVOICE",C="View Invoice",B="billing"):k.includes("job")&&(T.includes("overdue")||k.includes("overdue"))?(g="⚠️",f="critical",u="OVERDUE JOB",C="View Job",B="jobs"):k.includes("job")&&T.includes("due today")?(g="⏳",f="warning",u="JOB DUE TODAY",C="View Job",B="jobs"):k.includes("job_created")?(g="📋",f="info",u="NEW JOB LOGGED",C="View Job",B="jobs"):k.includes("job")||k.includes("status")?(g="🔄",f="info",u="JOB UPDATED",C="View Job",B="jobs"):k.includes("task")&&(T.includes("overdue")||k.includes("overdue"))?(g="⚠️",f="critical",u="OVERDUE TASK",C="Check Tasks",B="dailytasks"):k.includes("task_completed")?(g="✅",f="success",u="TASK COMPLETED",C="View Checklist",B="dailytasks"):k.includes("task")?(g="📝",f="warning",u="DAILY TASK",C="View Tasks",B="dailytasks"):k.includes("ticket")?(g="💬",f="info",u="SUPPORT TICKET",C="View Ticket",B="tickets"):k.includes("target")&&(g="🎉",f="success",u="TARGET REACHED",C="View Targets",B="targets");const c=o||C,v=document.createElement("div");v.id=S,v.className=`ci360-popup-card ci360-priority-${f}`,v.innerHTML=`
    <div class="ci360-popup-indicator"></div>
    <div class="ci360-popup-body">
      <div class="ci360-popup-header">
        <div class="ci360-popup-header-left">
          <div class="ci360-popup-icon-badge">${g}</div>
          <span class="ci360-popup-tag ${f}">${u}</span>
          <span class="ci360-popup-time">${s||"Just now"}</span>
        </div>
        <button type="button" class="ci360-popup-close-btn" aria-label="Dismiss">✕</button>
      </div>
      <div class="ci360-popup-title">${h(i||"CI360 Notification")}</div>
      <div class="ci360-popup-message">${h(e||"")}</div>
      <div class="ci360-popup-footer">
        <button type="button" class="ci360-popup-dismiss-link">Dismiss</button>
        <button type="button" class="ci360-popup-action-btn">
          ${c} →
        </button>
      </div>
    </div>
    <div class="ci360-popup-progress">
      <div class="ci360-popup-progress-fill"></div>
    </div>
  `,F(),J();const $=()=>{v.style.opacity="0",v.style.transform="translateX(40px) scale(0.95)",setTimeout(()=>v.remove(),220)};for(v.querySelector(".ci360-popup-close-btn").onclick=M=>{M.stopPropagation(),$()},v.querySelector(".ci360-popup-dismiss-link").onclick=M=>{M.stopPropagation(),$()},v.querySelector(".ci360-popup-action-btn").onclick=M=>{if(M.stopPropagation(),typeof a=="function"?a():B&&typeof window.ci360NavTab=="function"&&window.ci360NavTab(B),t)try{D(`/notifications/${t}/read`,{method:"PATCH"})}catch{}$()};m.children.length>=4;)m.removeChild(m.firstChild);m.appendChild(v),r||setTimeout(()=>{document.body.contains(v)&&$()},f==="critical"?14e3:p)}function kt(t=[]){if(!t||!t.length)return;const i=sessionStorage.getItem("ci360_client_overdue_dismissed");if(i&&Date.now()-Number(i)<45*60*1e3)return;const e=t.reduce((r,p)=>r+(Number(p.pendingAmount||p.totalAmount)||0),0),n=`
    <div class="ci360-overdue-modal-card">
      <div class="ci360-overdue-header">
        <div class="ci360-overdue-alert-icon">⚠️</div>
        <div>
          <h2 style="margin:0;font-size:17px;font-weight:800;color:var(--red-600)">Action Required: Overdue Invoices</h2>
          <p style="margin:4px 0 0;font-size:12.5px;color:var(--text-3);line-height:1.4">
            You have outstanding balances past due date. Please process settlement to keep active deliverables on track.
          </p>
        </div>
      </div>

      <div class="ci360-overdue-amount-box">
        <div>
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-4);font-weight:700">Total Outstanding Overdue</div>
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${tt(e)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${t.length} Overdue Invoice${t.length>1?"s":""}</span>
      </div>

      <div class="ci360-overdue-list">
        ${t.map(r=>{const p=r.dueDate?new Date(r.dueDate):new Date,m=Math.max(1,Math.floor((Date.now()-p.getTime())/(1e3*60*60*24)));return`
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${h(r.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${V(r.dueDate)} <span style="color:var(--red-600);font-weight:700">(${m}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${tt(r.pendingAmount||r.totalAmount||0)}</div>
                <span class="badge red" style="font-size:9.5px;margin-top:2px">OVERDUE</span>
              </div>
            </div>`}).join("")}
      </div>

      <div class="ci360-overdue-bank-box">
        <div style="font-weight:700;font-size:12px;color:var(--text-1);margin-bottom:4px">Settlement Bank & UPI Details:</div>
        <div style="font-size:12px;color:var(--text-3);line-height:1.5">
          Bank: <strong>HDFC Bank</strong> | A/C: <strong>50200088992211</strong><br>
          IFSC: <strong>HDFC0001234</strong> | UPI: <strong>cognitoinnovo@hdfcbank</strong>
        </div>
      </div>

      <div class="ci360-overdue-actions">
        <button id="ci360OverdueRemindBtn" type="button" class="btn ghost" style="padding:10px 16px;font-size:12.5px">
          Remind Me Later
        </button>
        <button id="ci360OverduePayBtn" type="button" class="btn gold" style="padding:10px 20px;font-size:13px;font-weight:700">
          💳 View & Settle Invoices
        </button>
      </div>
    </div>
  `,s=ct(n),o=s.querySelector("#ci360OverduePayBtn"),a=s.querySelector("#ci360OverdueRemindBtn");o&&(o.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove(),typeof window.ci360NavTab=="function"&&window.ci360NavTab("billing")}),a&&(a.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove()})}function Ct(){return`
    <div class="notif-wrapper">
      <button id="notifBellBtn" type="button" class="notif-bell-btn" title="Notifications" aria-label="Notifications">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span id="notifBadge" class="notif-badge" style="display:none">0</span>
      </button>
      <div id="notifBackdrop" class="notif-backdrop" style="display:none"></div>
      <div id="notifDropdown" class="notif-dropdown" style="display:none">
        <div class="notif-dropdown-header">
          <div class="notif-header-title">
            <span class="notif-header-bell">🔔</span>
            <span class="notif-header-heading">Notifications</span>
            <span id="notifUnreadBadge" class="notif-header-count" style="display:none"></span>
          </div>
          <div class="notif-header-actions">
            <button id="testNotifBtn" type="button" class="btn ghost small notif-action-btn" title="Test alerts on this device">🔔 Test</button>
            <button id="markAllReadBtn" type="button" class="btn ghost small notif-action-btn">Mark Read</button>
            <button id="clearNotifBtn" type="button" class="btn ghost small notif-action-btn">Clear</button>
            <button id="notifCloseBtn" type="button" class="notif-mobile-close" aria-label="Close notifications">✕</button>
          </div>
        </div>

        ${!$t()&&(typeof Notification>"u"||Notification.permission==="default")?`
        <div id="notifPermissionBanner" class="notif-perm-banner">
          <div class="npb-content">
            <span class="npb-icon">🔔</span>
            <div class="npb-text">
              <strong>Enable Phone & Browser Alerts</strong>
              <span>Get notified on this device when jobs or tasks are updated.</span>
            </div>
          </div>
          <div class="npb-actions">
            <button type="button" class="btn primary small npb-btn" id="notifEnableBtn">Enable</button>
            <button type="button" class="npb-close" id="notifDismissBannerBtn" aria-label="Dismiss">✕</button>
          </div>
        </div>`:""}

        <div class="notif-filters">
          <button type="button" class="notif-filter-btn active" data-filter="all">All</button>
          <button type="button" class="notif-filter-btn" data-filter="task">✅ Tasks</button>
          <button type="button" class="notif-filter-btn" data-filter="target">🎯 Targets</button>
          <button type="button" class="notif-filter-btn" data-filter="job">📋 Jobs</button>
          <button type="button" class="notif-filter-btn" data-filter="ticket">🎫 Tickets</button>
        </div>
        <div class="notif-list" id="notifList">
          <div class="empty" style="padding:24px 16px;font-size:12.5px;">Loading notifications…</div>
        </div>
      </div>
    </div>`}function It(){const t=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),e=document.getElementById("notifBadge"),n=document.getElementById("notifList"),s=document.getElementById("clearNotifBtn"),o=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),r=document.getElementById("notifDismissBannerBtn"),p=document.getElementById("notifPermissionBanner"),m=document.getElementById("notifUnreadBadge");if(!t||!i)return;dt();function S(){const l=document.getElementById("notifPermissionBanner");l&&(l.classList.add("hidden"),l.style.setProperty("display","none","important"),l.remove())}function w(){if($t()){S();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?S():Notification.permission==="default"&&p&&p.style.setProperty("display","flex","important"))}w(),r&&(r.onclick=l=>{l.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),S()}),a&&(a.onclick=async l=>{l.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),S(),await ut(),S()});const g=document.getElementById("testNotifBtn");g&&(g.onclick=async l=>{l.stopPropagation(),await St()}),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),X();let f=[],u="all";function C(l){return l?l.startsWith("task_completed")?"🎉":l.startsWith("task_due")?"⚡":l.startsWith("task")?"✅":l.startsWith("target_completed")?"🎉":l.startsWith("target")?"🎯":l.startsWith("job_due")?"⏳":l.startsWith("job")?"📋":l.startsWith("ticket")?"🎫":l.startsWith("status")?"🔄":l.startsWith("test")?"🧪":"🔔":"🔔"}function B(l){if(!l)return"";const d=new Date(l),y=Math.floor((new Date-d)/1e3);if(y<60)return"Just now";const b=Math.floor(y/60);if(b<60)return`${b}m ago`;const E=Math.floor(b/60);if(E<24)return`${E}h ago`;const P=Math.floor(E/24);return P===1?"Yesterday":P<7?`${P}d ago`:V(l)}function k(){if(!n)return;let l=f;if(u==="task"?l=f.filter(d=>(d.type||"").includes("task")):u==="target"?l=f.filter(d=>(d.type||"").includes("target")):u==="job"?l=f.filter(d=>(d.type||"").includes("job")):u==="ticket"&&(l=f.filter(d=>(d.type||"").includes("ticket"))),l.length===0){n.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${u==="all"?"":u+" "}notifications</div>`;return}n.innerHTML=l.map(d=>{const I=C(d.type);return`
        <div class="notif-item ${d.read?"":"unread"}" data-id="${d._id}" data-type="${h(d.type||"")}">
          <div class="notif-icon">${I}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${h(d.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${B(d.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${h(d.message)}</div>
          </div>
        </div>`}).join(""),n.querySelectorAll(".notif-item").forEach(d=>{d.onclick=async()=>{const I=d.dataset.id,y=d.dataset.type;if(I&&d.classList.contains("unread")){d.classList.remove("unread");try{await D(`/notifications/${I}/read`,{method:"PATCH"})}catch{}}N(),y&&y.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):y&&y.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("jobs"):y&&y.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):y&&y.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}})}let T={jobs:0,tasks:0,invoices:0,tickets:0},c=!1;async function v(l=!1){try{const d=await at("/notifications");f=d.notifications||[];const I=d.unreadCount||0;if(e&&(e.textContent=I>99?"99+":I,e.style.display=I>0?"flex":"none"),m&&(m.textContent=I>0?`${I} new`:"",m.style.display=I>0?"inline-block":"none"),X(),d.overdue&&d.overdue.invoices&&d.overdue.invoices.length>0){const y=typeof U=="function"?U():null;y&&y.role==="client"&&kt(d.overdue.invoices)}if(d.syncTimestamps){const y=d.syncTimestamps;if(!c)T={...y},c=!0;else{const b=[];y.jobs>(T.jobs||0)&&b.push("jobs"),y.tasks>(T.tasks||0)&&b.push("tasks"),y.invoices>(T.invoices||0)&&b.push("invoices"),y.tickets>(T.tickets||0)&&b.push("tickets"),b.length>0&&(T={...y},window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{changedKeys:b,syncTimestamps:y,overdue:d.overdue}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({changedKeys:b,syncTimestamps:y}))}}if(bt){const y=f.filter(b=>!b.read&&!L.has(String(b._id)));if(y.length>0){for(const b of y){const E=String(b._id);yt.add(E),L.add(E),Q({id:E,title:b.title||"CI360 Alert",message:b.message||"",type:b.type}),await O({title:b.title||"CI360 Alert",message:b.message||"",type:b.type,id:E})}Y(),window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{newNotifications:y}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({newNotifications:y})}}else{const y=f.filter(b=>!b.read&&!L.has(String(b._id)));if(f.forEach(b=>yt.add(String(b._id))),y.length>0){const b=y.slice(0,3);for(const E of b){const P=String(E._id);L.add(P),Q({id:P,title:E.title||"CI360 Alert",message:E.message||"",type:E.type}),await O({title:E.title||"CI360 Alert",message:E.message||"",type:E.type,id:P})}y.forEach(E=>L.add(String(E._id))),Y()}else f.forEach(b=>L.add(String(b._id))),Y();bt=!0}k()}catch{n&&f.length===0&&(n.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=v,window.showInAppPopupAlert=Q,window.showClientOverdueInvoiceModal=kt),v(),window.__ci360PollInterval=setInterval(v,6e3),window.addEventListener("focus",()=>v(!0)),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(l=>{l.onclick=d=>{d.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(I=>I.classList.remove("active")),l.classList.add("active"),u=l.dataset.filter,k()}});const $=document.getElementById("notifBackdrop");function M(){i.style.display="flex",i.classList.add("open"),$&&($.style.display="block",$.classList.add("open")),t.setAttribute("aria-expanded","true"),w();const l=document.getElementById("topbarUserDropdown");l&&(l.style.display="none"),v()}function N(){i.style.display="none",i.classList.remove("open"),$&&($.style.display="none",$.classList.remove("open")),t.setAttribute("aria-expanded","false")}function K(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?N():M()}window.ci360CloseNotifications=N;const R=document.getElementById("notifCloseBtn");R&&(R.onclick=l=>{l.stopPropagation(),N()}),$&&($.onclick=l=>{l.stopPropagation(),N()}),t.onclick=l=>{l.stopPropagation(),K()},o&&(o.onclick=async l=>{l.stopPropagation();try{await D("/notifications/read",{method:"PATCH"}),e.style.display="none",m&&(m.textContent="",m.style.display="none"),f.forEach(d=>d.read=!0),k(),x("All notifications marked as read")}catch(d){x(d.message,!0)}}),document.addEventListener("click",l=>{!i.contains(l.target)&&l.target!==t&&(i.style.display="none")}),s&&(s.onclick=async l=>{l.stopPropagation();try{await rt("/notifications"),f=[],n.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',e.style.display="none",m&&(m.textContent="",m.style.display="none"),x("Notifications cleared")}catch(d){x(d.message,!0)}})}function jt({user:t,currentRole:i,activeTab:e,tabs:n,title:s,subtitle:o}){const a=t&&t.name?t.name.charAt(0).toUpperCase():"U",r=t&&(t.role==="superadmin"||t.role==="admin")?"Admin":t&&t.role==="accounts"?"Accounts":t&&t.role==="employee"?"Employee":t&&t.role==="client"?"Client":t&&t.role?t.role.toUpperCase():"User",p=t&&t.name?t.name:"User",m=t&&t.email?t.email:t&&t.username?t.username:"",S=n&&n.some(u=>u.key==="logjob"),w=n&&n.find(u=>u.key===e),g=s||w&&w.label||"Dashboard";let f=[];return i==="accounts"?f=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:e==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:e==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:e==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(e),isMore:!0}]:i==="superadmin"?f=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="dashboard"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(e),isMore:!0}]:i==="employee"?f=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:e==="myjobs"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"tickets",label:"Tickets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></svg>',active:e==="tickets"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:e==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","tickets","targets"].includes(e),isMore:!0}]:f=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:e==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:e==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(e),isMore:!0}],`
    <div class="app-shell">
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
      <aside class="app-sidebar" id="appSidebar">
        <div class="sidebar-brand">
          <img src="/logo.png" alt="CI360 Logo" class="brand-logo-img">
          <div class="brand-info">
            <h1>CI360</h1>
            <div class="tag">Intelligence Suite</div>
          </div>
        </div>
        <nav class="sidebar-nav" role="navigation" aria-label="Main navigation">
          <div class="nav-group-label">Navigation</div>
          ${n.map(u=>`
            <button type="button" class="sidebar-item ${e===u.key?"active":""}" data-tab="${u.key}" aria-current="${e===u.key?"page":"false"}">
              <span class="icon">${u.icon||"📌"}</span>
              <span>${u.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${h(t?t.name:"User")}</div>
            <div class="role">${h(r)}</div>
          </div>
        </div>
      </aside>

      <main class="app-main" role="main">
        <header class="app-topbar">
          <!-- Left: Mobile Toggle & Mobile Brand & Breadcrumbs -->
          <div class="topbar-left">
            <button type="button" class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open navigation">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>

            <!-- Mobile Brand Title (Same Logo as Desktop) -->
            <div class="mobile-brand-title">
              <img src="/logo.png" alt="CI360 Logo" class="brand-logo-img mobile-brand-logo-img">
              <div class="mobile-brand-info">
                <span class="mobile-brand-text">CI360</span>
                <span class="mobile-brand-tag">Intelligence</span>
              </div>
            </div>

            <div class="topbar-breadcrumb-wrap">
              <h1 class="page-heading-title">${h(g)}</h1>
            </div>
          </div>

          <!-- Center: Command Palette Trigger -->
          <div class="topbar-center">
            <button type="button" class="cmd-trigger" id="topbarCmdTrigger" aria-label="Search and command palette">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span class="cmd-trigger-text">Search commands, tabs…</span>
              <kbd class="cmd-kbd">⌘K</kbd>
            </button>
          </div>

          <!-- Right: Actions, Theme, Notifications & User Menu -->
          <div class="topbar-right">
            <!-- Mobile Calendar Button (Mockup Right Item 1) -->
            <button type="button" class="mobile-topbar-btn" id="mobileCalBtn" aria-label="Select Period" title="Select Period">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </button>

            <button type="button" class="cmd-trigger-mobile" id="topbarCmdTriggerMobile" title="Quick Search (⌘K)" aria-label="Quick Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>

            ${S?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${_()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${_()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${Ct()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${a}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${h(p)}</span>
                  <span class="topbar-user-role-badge">${h(r)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${a}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${h(p)}</div>
                      ${m?`<div class="tud-email">${h(m)}</div>`:""}
                      <span class="tud-role-chip">${h(r)}</span>
                    </div>
                  </div>
                  <div class="tud-divider"></div>
                  <div class="tud-items">
                    <button type="button" class="tud-item" id="tudCmdBtn" role="menuitem">
                      <span class="tud-icon">⚡</span>
                      <span class="tud-label">Command Palette</span>
                      <kbd class="tud-kbd">⌘K</kbd>
                    </button>
                    <button type="button" class="tud-item" id="tudThemeToggleBtn" role="menuitem">
                      <span class="tud-icon">${_()==="dark"?"☀️":"🌙"}</span>
                      <span class="tud-label">Switch to ${_()==="dark"?"Light":"Dark"} Mode</span>
                    </button>
                    <div class="tud-item-static">
                      <span class="tud-icon">🛡️</span>
                      <span class="tud-label">Session: Verified</span>
                    </div>
                  </div>
                  <div class="tud-divider"></div>
                  <div class="tud-items">
                    <button type="button" class="tud-item danger" id="logoutBtn" role="menuitem">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      <span class="tud-label">Sign out</span>
                    </button>
                  </div>
                </div>

                <!-- Mobile Dropdown Popover matching User Mockup -->
                <div class="tud-mobile-only">
                  <div class="tud-mobile-list">
                    <button type="button" class="tud-mobile-item" id="tudMobileThemeBtn" role="menuitem">
                      <div class="tmi-left">
                        <span style="font-size:16px" id="tudMobileThemeIcon">${_()==="dark"?"☀️":"🌙"}</span>
                        <span id="tudMobileThemeText">${_()==="dark"?"Light Mode":"Dark Mode"}</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    <button type="button" class="tud-mobile-item" id="tudMobileNotifsBtn" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                        <span>Notifications</span>
                      </div>
                      <div class="tmi-right">
                        <span class="tmi-badge" id="tudMobileNotifBadge">3</span>
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    <button type="button" class="tud-mobile-item" id="tudMobileSettingsBtn" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        <span>Settings</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    <button type="button" class="tud-mobile-item" id="tudMobileHelpBtn" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <span>Help & Support</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    <button type="button" class="tud-mobile-item danger" id="logoutBtnMobile" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span>Logout</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Global Command Palette Modal -->
        <div id="cmdPaletteBackdrop" class="cmd-backdrop" aria-hidden="true">
          <div class="cmd-dialog" role="dialog" aria-modal="true" aria-label="Command Palette">
            <div class="cmd-input-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="cmdSearchInput" placeholder="Type a command or jump to tab..." autocomplete="off" spellcheck="false">
              <kbd class="cmd-kbd" id="cmdCloseKbd">ESC</kbd>
            </div>
            <div class="cmd-results" id="cmdResultsList"></div>
            <div class="cmd-footer">
              <span class="cmd-footer-hint"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span class="cmd-footer-hint"><kbd>↵</kbd> select</span>
              <span class="cmd-footer-hint"><kbd>esc</kbd> close</span>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="app-content">
          <div id="content"></div>
        </div>

        <!-- Mobile Bottom Navigation Dock (Matching Mockup 5 Tabs) -->
        <nav class="mobile-bottom-nav" id="mobileBottomNav" aria-label="Mobile Navigation">
          ${f.map(u=>`
            <button type="button" class="mbn-item ${u.active?"active":""}" data-tab="${u.key}" ${u.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${u.iconSvg}</span>
              <span class="mbn-label">${h(u.label)}</span>
              ${u.active?'<span class="mbn-active-dot"></span>':""}
            </button>
          `).join("")}
        </nav>

        <!-- Mobile More Sheet Backdrop & Slide-up Drawer -->
        <div class="mobile-more-backdrop" id="mobileMoreBackdrop" aria-hidden="true">
          <div class="mobile-more-sheet" id="mobileMoreSheet" role="dialog" aria-modal="true" aria-label="All Navigation Items">
            <div class="mms-handle-wrap"><div class="mms-drag-handle"></div></div>
            <div class="mms-header">
              <div class="mms-brand">
                <img src="/logo.png" alt="CI360 Logo" class="brand-logo-img mms-brand-logo-img">
                <div class="mms-brand-info">
                  <span class="mms-title">CI360</span>
                  <span class="mms-subtitle">Suite Navigation</span>
                </div>
              </div>
              <button type="button" class="mms-close-btn" id="mmsCloseBtn" aria-label="Close menu">✕</button>
            </div>
            <div class="mms-grid">
              ${n.map(u=>`
                <button type="button" class="mms-card ${e===u.key?"active":""}" data-tab="${u.key}">
                  <span class="mms-card-icon">${u.icon||"📌"}</span>
                  <span class="mms-card-label">${h(u.label)}</span>
                </button>
              `).join("")}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${_()==="dark"?"☀️ Light Mode":"🌙 Dark Mode"}</span>
              </button>
              <button type="button" class="btn ghost small mms-action-btn" id="mmsNotifsBtn">
                <span>🔔 Notifications</span>
              </button>
              <button type="button" class="btn ghost small danger mms-action-btn" id="mmsLogoutBtn">
                <span>🚪 Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>`}function zt(t){const i=document.getElementById("mobileNavToggle"),e=document.getElementById("appSidebar"),n=document.getElementById("sidebarOverlay");function s(){e&&e.classList.add("open"),n&&n.classList.add("open")}function o(){e&&e.classList.remove("open"),n&&n.classList.remove("open")}i&&(i.onclick=s),n&&(n.onclick=o);const a=document.getElementById("mobileMoreBackdrop"),r=document.getElementById("mobileMoreSheet"),p=document.getElementById("mmsCloseBtn"),m=document.getElementById("mobileMoreBtn");function S(){a&&a.classList.add("active"),r&&r.classList.add("active")}function w(){a&&a.classList.remove("active"),r&&r.classList.remove("active")}m&&(m.onclick=l=>{l.stopPropagation(),S()}),p&&(p.onclick=w),a&&(a.onclick=l=>{l.target===a&&w()}),document.querySelectorAll(".mbn-item").forEach(l=>{l.dataset.tab&&l.dataset.tab!=="__more__"&&(l.onclick=()=>{w(),t&&t(l.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(l=>{l.onclick=()=>{w(),t&&t(l.dataset.tab)}});const g=document.getElementById("mmsToggleThemeBtn");g&&(g.onclick=()=>{z(_()==="dark"?"light":"dark")});const f=document.getElementById("mmsNotifsBtn");f&&(f.onclick=()=>{w();const l=document.getElementById("notifBellBtn");l&&l.click()});const u=document.getElementById("mmsLogoutBtn");u&&(u.onclick=H);const C=document.getElementById("mobileCalBtn");C&&(C.onclick=()=>{const l=document.querySelector(".period-row");l&&(l.scrollIntoView({behavior:"smooth",block:"center"}),l.classList.add("pulse-highlight"),setTimeout(()=>l.classList.remove("pulse-highlight"),1200))});const B=document.getElementById("tudMobileThemeBtn");B&&(B.onclick=l=>{l.stopPropagation(),z(_()==="dark"?"light":"dark")});const k=document.getElementById("tudMobileNotifsBtn");k&&(k.onclick=l=>{l.stopPropagation();const d=document.getElementById("topbarUserDropdown");d&&(d.style.display="none");const I=document.getElementById("notifBellBtn");I&&I.click()});const T=document.getElementById("tudMobileSettingsBtn");T&&(T.onclick=l=>{l.stopPropagation();const d=document.getElementById("topbarUserDropdown");d&&(d.style.display="none"),document.querySelector('[data-tab="manage"]')&&t?t("manage"):S()});const c=document.getElementById("tudMobileHelpBtn");c&&(c.onclick=l=>{l.stopPropagation();const d=document.getElementById("topbarUserDropdown");d&&(d.style.display="none"),document.querySelector('[data-tab="tickets"]')&&t?t("tickets"):ct(`
          <div style="padding:24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">💬</div>
            <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
            <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
              For immediate technical assistance, client onboarding, or support tickets, reach out to your system administrator or use the Support Tickets portal.
            </p>
            <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
          </div>
        `)});const v=document.getElementById("logoutBtnMobile");v&&(v.onclick=H);const $=document.getElementById("topbarUserBtn"),M=document.getElementById("topbarUserDropdown");$&&M&&($.onclick=l=>{l.stopPropagation();const d=M.style.display!=="none";M.style.display=d?"none":"block",$.setAttribute("aria-expanded",String(!d)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",l=>{!M.contains(l.target)&&!$.contains(l.target)&&(M.style.display="none",$.setAttribute("aria-expanded","false"))}));const N=document.getElementById("tudThemeToggleBtn");N&&(N.onclick=()=>{z(_()==="dark"?"light":"dark")});const K=document.getElementById("topbarQuickLogJobBtn");K&&(K.onclick=()=>{t&&t("logjob")});const R=document.getElementById("logoutBtn");R&&(R.onclick=H),It(),document.querySelectorAll(".sidebar-item").forEach(l=>{l.onclick=()=>{o(),t&&t(l.dataset.tab)}}),Ut(t)}function Ut(t){const i=document.getElementById("cmdPaletteBackdrop"),e=document.getElementById("cmdSearchInput"),n=document.getElementById("cmdResultsList"),s=document.getElementById("topbarCmdTrigger"),o=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),r=document.getElementById("cmdCloseKbd");if(!i||!e||!n)return;const p=Array.from(document.querySelectorAll(".sidebar-item")),m=p.map(c=>{var v,$;return{type:"tab",id:c.dataset.tab,label:((v=c.querySelector("span:last-child"))==null?void 0:v.textContent)||c.dataset.tab,icon:(($=c.querySelector(".icon"))==null?void 0:$.textContent)||"📌",sub:"Navigate to section",action:()=>{t&&t(c.dataset.tab)}}});p.some(c=>c.dataset.tab==="logjob")&&m.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{t&&t("logjob")}}),m.push({type:"action",id:"toggle-theme",label:_()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{z(_()==="dark"?"light":"dark")}}),m.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const c=document.getElementById("notifBellBtn");c&&c.click()}}),m.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>H()});let w=0,g=[...m];function f(){if(!g.length){n.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}n.innerHTML=g.map((c,v)=>`
      <div class="cmd-result ${v===w?"selected":""}" data-idx="${v}">
        <div class="cmd-result-icon">${c.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${h(c.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${h(c.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),n.querySelectorAll(".cmd-result").forEach(c=>{c.onmouseenter=()=>{w=Number(c.dataset.idx),u()},c.onclick=()=>{C(Number(c.dataset.idx))}})}function u(){n.querySelectorAll(".cmd-result").forEach((c,v)=>{c.classList.toggle("selected",v===w)})}function C(c){const v=g[c];v&&v.action&&(k(),v.action())}function B(){const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),i.classList.add("open"),e.value="",g=[...m],w=0,f(),setTimeout(()=>e.focus(),50)}function k(){i.classList.remove("open"),e.blur()}s&&(s.onclick=B),o&&(o.onclick=B),a&&(a.onclick=()=>{const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),B()}),r&&(r.onclick=k),i.onclick=c=>{c.target===i&&k()},e.oninput=()=>{const c=e.value.trim().toLowerCase();c?g=m.filter(v=>v.label.toLowerCase().includes(c)||v.sub.toLowerCase().includes(c)):g=[...m],w=0,f()},e.onkeydown=c=>{if(c.key==="ArrowDown"){if(c.preventDefault(),g.length>0){w=(w+1)%g.length,u();const v=n.querySelector(".cmd-result.selected");v&&v.scrollIntoView({block:"nearest"})}}else if(c.key==="ArrowUp"){if(c.preventDefault(),g.length>0){w=(w-1+g.length)%g.length,u();const v=n.querySelector(".cmd-result.selected");v&&v.scrollIntoView({block:"nearest"})}}else c.key==="Enter"?(c.preventDefault(),C(w)):c.key==="Escape"&&(c.preventDefault(),k())};const T=c=>{(c.metaKey||c.ctrlKey)&&c.key.toLowerCase()==="k"?(c.preventDefault(),i.classList.contains("open")?k():B()):c.key==="Escape"&&i.classList.contains("open")&&k()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=T,window.addEventListener("keydown",T)}function Ot(t=4){return`
    <div class="grid grid-${Math.min(t,4)}" style="margin-bottom:24px">
      ${Array(t).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function Rt(t,i,e="📁",n=""){return`
    <div class="empty">
      <span class="empty-icon">${e}</span>
      <h3>${h(t)}</h3>
      <p>${h(i)}</p>
      ${n}
    </div>`}function qt(t,i,e="",n="📊",s=""){let o="";return s&&(o=`<span class="kpi-trend ${s.startsWith("+")||s.includes("↑")||s.toLowerCase().includes("up")?"up":"down"}">${h(s)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${h(t)}</span>
        <div class="kpi-icon">${n}</div>
      </div>
      <div class="kpi-value">${h(i)}</div>
      <div class="kpi-sub">${o}<span>${h(e)}</span></div>
    </div>`}function Ht(t,i="gray"){return`<span class="badge ${i}">${h(t)}</span>`}function Vt(t,i="indigo"){const e=Math.min(100,Math.max(0,Number(t)||0));return`
    <div class="progress-bar-wrap" title="${e.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${e}%"></div>
    </div>`}function Ft(t){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([e,n])=>`<button class="pchip ${t===e?"active":""}" data-period="${e}">${n}</button>`).join("")}</div>`}function Jt(t){if(!t)return"U";const i=t.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function wt(t){if(!t)return"";const i=new Date,e=new Date(t),n=Math.floor((i-e)/1e3);if(n<60)return"Just now";const s=Math.floor(n/60);if(s<60)return`${s}m ago`;const o=Math.floor(s/60);if(o<24)return`${o}h ago`;const a=Math.floor(o/24);return a<7?`${a}d ago`:V(t)}function Z(t){if(t=Number(t)||0,t===0)return"0 B";const i=1024,e=["B","KB","MB","GB"],n=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,n)).toFixed(1))+" "+e[n]}function W(t="",i=""){const e=(t.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(e)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:e==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(e)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(e)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(e)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(e)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(e)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function Wt(t){return t?W(t.name||t.filename||"",t.type||"").cls==="img":!1}function pt(t){if(!t||!t.url)return;const i=W(t.name,t.type),e=i.cls==="img",n=i.cls==="pdf",s=h(t.name||"Attachment"),o=Z(t.size),a=document.createElement("div");a.className="preview-modal-overlay",a.innerHTML=`
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${i.icon}</span>
          <span>${s}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${o})</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="${t.url}" download="${s}" target="_blank" class="btn ghost small" style="font-size:12px;padding:4px 10px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
          <button type="button" class="btn ghost small preview-modal-close" style="padding:4px 8px;font-size:14px">✕</button>
        </div>
      </div>
      <div class="preview-modal-body">
        ${e?`
          <img src="${t.url}" alt="${s}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${t.url}','_blank')">
        `:n?`
          <iframe src="${t.url}" title="${s}"></iframe>
        `:`
          <div style="text-align:center;padding:40px 20px">
            <div style="font-size:48px;margin-bottom:12px">${i.icon}</div>
            <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${s}</div>
            <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${o}</div>
            <a href="${t.url}" download="${s}" target="_blank" class="btn gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Attachment
            </a>
          </div>
        `}
      </div>
    </div>
  `,a.onclick=r=>{(r.target===a||r.target.closest(".preview-modal-close"))&&a.remove()},document.body.appendChild(a)}function it(t=[],i={}){if(!t||!t.length)return"";const e=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${h(i.title)} <span style="font-weight:500;color:var(--text-4)">(${t.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${t.map((n,s)=>{const o=W(n.name,n.type),a=h(n.name||"File"),r=Z(n.size);return`
            <div class="attachment-chip" data-idx="${s}" title="${a} (${r})">
              <span class="file-type-icon ${o.cls}" style="width:22px;height:22px;font-size:12px">${o.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${s}, this)">${a}</span>
              <span class="attachment-chip-size">${r}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${s}, this)">👁️</button>
                <a href="${n.url}" download="${a}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${e?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${s}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const A={};async function nt(t){const i=Array.from(t||[]);if(!i.length)return[];const n=(await Promise.all(i.map(async s=>new Promise(o=>{const a=new FileReader;a.onload=()=>{o({name:s.name,type:s.type,size:s.size,base64:a.result,data:a.result})},a.onerror=()=>o(null),a.readAsDataURL(s)})))).filter(Boolean);if(!n.length)return[];try{const s=await lt("/upload",{files:n});if(s&&s.files&&s.files.length)return s.files}catch(s){console.warn("Backend upload failed, fallback to base64 data URLs:",s)}return n.map(s=>({name:s.name,url:s.base64,size:s.size,type:s.type,uploadedAt:new Date}))}function mt({id:t="uploader",label:i="Attachments & Files",subtitle:e="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:n=!0,accept:s="*/*",maxFiles:o=10}={}){return`
    <div class="uploader-container" id="container-${t}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${h(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${t}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${t}">
        <input type="file" id="input-${t}" ${n?"multiple":""} accept="${s}" style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${h(e)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${t}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${t}"></div>
    </div>
  `}function ft(t,i={}){const e=document.getElementById("zone-"+t),n=document.getElementById("input-"+t),s=document.getElementById("list-"+t),o=document.getElementById("count-"+t);A[t]=i.existing?[...i.existing]:[];function a(){const r=A[t]||[];if(o&&(o.textContent=`${r.length} file${r.length===1?"":"s"} attached`),!!s){if(!r.length){s.innerHTML="";return}s.innerHTML=r.map((p,m)=>{const S=W(p.name,p.type),w=h(p.name||"File"),g=Z(p.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${S.cls}">${S.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${w}">${w}</div>
              <div class="uploader-file-size">${S.label} · ${g}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${t}', ${m})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${t}', ${m})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(r)}}window.__removeUploaderFile=(r,p)=>{if(A[r]){A[r].splice(p,1);const m=window[`__update_${r}`];m&&m()}},window.__previewUploaderFile=(r,p)=>{const m=(A[r]||[])[p];m&&pt(m)},window[`__update_${t}`]=a,e&&n&&(e.onclick=r=>{r.target.tagName!=="BUTTON"&&!r.target.closest("button")&&n.click()},e.ondragover=r=>{r.preventDefault(),e.classList.add("dragover")},e.ondragleave=()=>e.classList.remove("dragover"),e.ondrop=async r=>{if(r.preventDefault(),e.classList.remove("dragover"),r.dataTransfer&&r.dataTransfer.files&&r.dataTransfer.files.length){x("Uploading files… ⏳");const p=await nt(r.dataTransfer.files);A[t]=[...A[t]||[],...p],a(),x("Files attached! ✓")}},n.onchange=async()=>{if(n.files&&n.files.length){x("Uploading files… ⏳");const r=await nt(n.files);A[t]=[...A[t]||[],...r],a(),x("Files attached! ✓"),n.value=""}}),a()}function vt(t){return A[t]||[]}function Et(t,i=[]){A[t]=[...i];const e=window[`__update_${t}`];e&&e()}window.__openPreview=(t,i)=>{const e=i.closest(".attachment-chips-wrap");if(!e)return;const n=i.closest(".attachment-chip");if(!n)return;const s=Number(n.dataset.idx),o=e.dataset.attachments;if(o)try{const a=JSON.parse(decodeURIComponent(o));a[s]&&pt(a[s])}catch{}};function Kt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");return`
    <div class="ticket-section" id="tksec-${e}">
      <div class="ticket-section-header">
        <div class="ticket-section-title">
          <span style="font-size:14px">🎫</span>
          <span>Support &amp; Feedback</span>
          <span class="ticket-count-pill" id="tkcnt-${e}">0</span>
        </div>
        <button type="button" class="btn ghost small ticket-toggle-btn" data-jobid="${t}" data-safeid="${e}">
          + Raise Ticket
        </button>
      </div>

      <div class="ticket-create-form" id="tkform-${e}">
        <div class="form-grid-2">
          <div class="field">
            <label>Subject / Issue *</label>
            <input type="text" id="tksub-${e}" placeholder="e.g. Revision required for Instagram Reel" />
          </div>
          <div class="field">
            <label>Priority</label>
            <select id="tkpri-${e}">
              <option value="Medium" selected>🟡 Medium</option>
              <option value="Low">🟢 Low</option>
              <option value="High">🟠 High</option>
              <option value="Urgent">🔴 Urgent</option>
            </select>
          </div>
        </div>
        <div class="field" style="margin-bottom:10px">
          <label>Detailed Description *</label>
          <textarea id="tkmsg-${e}" rows="3" placeholder="Provide full details, feedback, or blockers so the team can resolve it quickly…"></textarea>
        </div>
        ${mt({id:"tkup-"+e,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
          <button type="button" class="btn ghost small tk-cancel-btn" data-safeid="${e}">Cancel</button>
          <button type="button" class="btn gold small tk-submit-btn" data-jobid="${t}" data-safeid="${e}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Submit Ticket
          </button>
        </div>
      </div>

      <div class="ticket-list" id="tklist-${e}">
        <div style="font-size:12px;color:var(--text-4);padding:8px 0;display:flex;align-items:center;gap:6px">
          <span class="pulse-dot"></span> Loading tickets…
        </div>
      </div>
    </div>`}const Gt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},Yt={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function Qt(t,i){const e=(t.status||"Open").toLowerCase().replace(" ","-"),n=t.status==="Open",s=(t._id||"").slice(-4).toUpperCase(),o=Jt(t.userName),a=encodeURIComponent(JSON.stringify(t.attachments||[])),r=encodeURIComponent(JSON.stringify(t.adminAttachments||[]));return`
    <div class="ticket-card status-${e}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${s}</span>
            <span class="ticket-subject">${h(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${Gt[t.status]||"gray"}">
            ${n?'<span class="pulse-dot"></span>':""} ${h(t.status)}
          </span>
          <span class="badge ${Yt[t.priority]||"gray"}">${h(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${o}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${h(t.userName)}
            <span class="ticket-role-pill">${h(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${wt(t.createdAt)} · ${V(t.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${h(t.message)}</div>

      ${t.attachments&&t.attachments.length?`
        <div data-attachments="${a}">
          ${it(t.attachments,{title:"Ticket Attachments"})}
        </div>
      `:""}

      ${t.adminReply?`
        <div class="ticket-thread-wrap">
          <div class="ticket-admin-reply-card">
            <div class="ticket-admin-reply-header">
              <span class="ticket-shield-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Support Team Response
              </span>
              ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${wt(t.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${h(t.adminReply)}</div>
            ${t.adminAttachments&&t.adminAttachments.length?`
              <div data-attachments="${r}">
                ${it(t.adminAttachments,{title:"Support Attached Files"})}
              </div>
            `:""}
          </div>
        </div>`:""}

      ${i?`
        <div class="ticket-toolbar">
          <label style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Status:</label>
          <select class="tk-status-sel" data-tkid="${t._id}" style="font-size:12px;padding:5px 8px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1)">
            <option value="Open" ${t.status==="Open"?"selected":""}>🔴 Open</option>
            <option value="In Review" ${t.status==="In Review"?"selected":""}>🟡 In Review</option>
            <option value="Resolved" ${t.status==="Resolved"?"selected":""}>🟢 Resolved</option>
            <option value="Closed" ${t.status==="Closed"?"selected":""}>⚪ Closed</option>
          </select>

          <button class="btn ghost small tk-reply-toggle" data-tkid="${t._id}" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ${t.adminReply?"Edit Reply":"💬 Reply"}
          </button>

          ${t.status!=="Resolved"?`
            <button class="btn ghost small tk-quick-resolve-btn" data-tkid="${t._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
              ✓ Quick Resolve
            </button>`:""}

          <button class="btn danger small tk-del-btn" data-tkid="${t._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>

          <div class="ticket-reply-form" id="tkreplyform-${t._id}">
            <div class="ticket-templates-bar">
              <span style="font-size:10px;font-weight:700;color:var(--text-4);text-transform:uppercase;align-self:center">Quick:</span>
              <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="We are actively investigating this and will update you shortly.">🔍 Investigating</button>
              <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="This issue has been resolved and the updates have been saved.">✅ Resolved</button>
              <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="Could you please provide more details so we can assist further?">ℹ️ Need Info</button>
            </div>
            <textarea id="tkreplytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${h(t.adminReply||"")}</textarea>
            ${mt({id:"tkreplyup-"+t._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function j(t,i,e){const n=document.getElementById("tklist-"+i),s=document.getElementById("tkcnt-"+i);if(n)try{const o=await at("/tickets/job/"+t);s&&(s.textContent=o.length),o.length?(n.innerHTML=o.map(a=>Qt(a,e)).join(""),Xt(t,i,e,n,o)):n.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{n.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function Xt(t,i,e,n,s){e&&(n.querySelectorAll(".tk-status-sel").forEach(o=>{o.onchange=async()=>{try{await G("/tickets/"+o.dataset.tkid,{status:o.value}),x("Status updated"),j(t,i,e)}catch(a){x(a.message,!0)}}}),n.querySelectorAll(".tk-quick-resolve-btn").forEach(o=>{o.onclick=async()=>{try{await G("/tickets/"+o.dataset.tkid,{status:"Resolved"}),x("Ticket marked as Resolved! 🎉"),j(t,i,e)}catch(a){x(a.message,!0)}}}),n.querySelectorAll(".ticket-template-btn").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplytxt-"+o.dataset.tkid);a&&(a.value=o.dataset.tpl,a.focus())}}),n.querySelectorAll(".tk-reply-toggle").forEach(o=>{o.onclick=()=>{const a=o.dataset.tkid,r=document.getElementById("tkreplyform-"+a);if(r){r.classList.toggle("show");const p=s.find(m=>m._id===a);ft("tkreplyup-"+a,{existing:p?p.adminAttachments:[]})}}}),n.querySelectorAll(".tk-reply-cancel").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplyform-"+o.dataset.tkid);a&&a.classList.remove("show")}}),n.querySelectorAll(".tk-reply-save").forEach(o=>{o.onclick=async()=>{const a=o.dataset.tkid,r=document.getElementById("tkreplytxt-"+a);if(!r)return;const p=vt("tkreplyup-"+a);try{await G("/tickets/"+a,{adminReply:r.value.trim(),adminAttachments:p}),x("Response saved! 🛡️"),j(t,i,e)}catch(m){x(m.message,!0)}}}),n.querySelectorAll(".tk-del-btn").forEach(o=>{o.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await rt("/tickets/"+o.dataset.tkid),x("Ticket deleted"),j(t,i,e)}catch(a){x(a.message,!0)}}}))}function Zt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");j(t,e,i),ft("tkup-"+e);const n=document.querySelector(`[data-jobid="${t}"].ticket-toggle-btn`);n&&(n.onclick=()=>{const a=document.getElementById("tkform-"+e);if(!a)return;const r=a.style.display==="block";a.style.display=r?"none":"block",n.textContent=r?"+ Raise Ticket":"✕ Cancel"});const s=document.querySelector(`.tk-cancel-btn[data-safeid="${e}"]`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+e);a&&(a.style.display="none"),n&&(n.textContent="+ Raise Ticket")});const o=document.querySelector(`.tk-submit-btn[data-safeid="${e}"]`);o&&(o.onclick=async()=>{var S,w;const a=(S=(document.getElementById("tksub-"+e)||{}).value)==null?void 0:S.trim(),r=(w=(document.getElementById("tkmsg-"+e)||{}).value)==null?void 0:w.trim(),p=(document.getElementById("tkpri-"+e)||{}).value,m=vt("tkup-"+e);if(!a){x("Please enter a subject",!0);return}if(!r){x("Please enter a message",!0);return}o.disabled=!0,o.textContent="Submitting…";try{await lt("/tickets",{jobId:t,subject:a,message:r,priority:p,attachments:m}),x("Ticket submitted! 🎫");const g=document.getElementById("tkform-"+e);g&&(g.style.display="none"),n&&(n.textContent="+ Raise Ticket");const f=document.getElementById("tksub-"+e),u=document.getElementById("tkmsg-"+e);f&&(f.value=""),u&&(u.value=""),Et("tkup-"+e,[]),j(t,e,i)}catch(g){x(g.message,!0)}finally{o.disabled=!1,o.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function te(){return""}function ee(){}window.__setTheme=function(t){z(t)};Object.assign(window,{getToken:ot,getUser:U,setSession:Mt,clearSession:st,requireAuth:_t,initTheme:xt,api:D,apiGet:at,apiPost:lt,apiPut:G,apiPatch:At,apiDelete:rt,fmtINR:tt,fmtHours:Lt,escapeHtml:h,fmtDate:V,flashToast:x,openModal:ct,logout:H,getTheme:_,setTheme:z,initServiceWorker:dt,playNotificationChime:F,triggerPhoneVibration:J,requestNotificationPermission:ut,triggerSystemNotification:O,fmtFileSize:Z,getFileCategory:W,isImageAttachment:Wt,openFilePreviewModal:pt,renderAttachmentChips:it,uploadFilesToServer:nt,renderAttachmentUploader:mt,bindAttachmentUploader:ft,getUploaderAttachments:vt,setUploaderAttachments:Et,renderRoleSwitcher:te,bindRoleSwitcher:ee,renderNotificationBell:Ct,initNotificationBell:It,renderAppShell:jt,bindAppShellEvents:zt,renderSkeletonCards:Ot,renderEmptyState:Rt,renderKpiCard:qt,renderBadge:Ht,renderProgressBar:Vt,renderPeriodPicker:Ft,renderSupportTicketSection:Kt,bindSupportTicketSection:Zt});export{_t as a,zt as b,at as c,V as d,h as e,tt as f,lt as g,x as h,xt as i,rt as j,G as k,U as l,ot as m,ct as o,jt as r,Mt as s};
