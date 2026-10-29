(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const Nt="/api";function K(){return localStorage.getItem("ci360_token")}function N(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function Bt(t,i){localStorage.setItem("ci360_token",t),localStorage.setItem("ci360_user",JSON.stringify(i))}function V(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function Lt(t){const i=K(),e=N();if(!i||!e)return V(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null;const n=e.role==="superadmin"||e.role==="admin",s=e.name&&e.name.toLowerCase().includes("ekta")||e.email&&e.email.toLowerCase().includes("ekta");if(t&&e.role!==t&&!n){if((e.role==="accounts"||s)&&(t==="accounts"||t==="employee"))return e;const o=n?"/admin":e.role==="accounts"||s?"/accounts":e.role==="employee"?"/employee":e.role==="client"?"/client":null;return!o||typeof window<"u"&&window.location.pathname.startsWith(o)?(V(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null):(window.location.href=o,null)}return e}async function P(t,i={}){const e=K(),n=Object.assign({"Content-Type":"application/json"},i.headers||{});e&&(n.Authorization="Bearer "+e);const s=await fetch(Nt+t,Object.assign({},i,{headers:n}));let o=null;try{o=await s.json()}catch{}if(s.status===401)throw t==="/auth/login"||t.includes("/auth/login")?new Error(o&&o.error||"Invalid username/email or password."):(V(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login?expired=1"),new Error(o&&o.error||"Session expired. Please sign in again."));if(!s.ok)throw new Error(o&&o.error||"Server status "+s.status+" — Backend waking up, please retry in 10s.");return i.method&&i.method!=="GET"&&!t.includes("/notifications")&&typeof window<"u"&&typeof window.ci360FetchNotifications=="function"&&setTimeout(()=>{try{window.ci360FetchNotifications()}catch{}},350),o}const U=t=>P(t,{method:"GET"}),nt=(t,i)=>P(t,{method:"POST",body:JSON.stringify(i)}),O=(t,i)=>P(t,{method:"PUT",body:JSON.stringify(i)}),Pt=(t,i)=>P(t,{method:"PATCH",body:JSON.stringify(i)}),G=t=>P(t,{method:"DELETE"}),Dt=t=>U("/archive"+(t?`?type=${encodeURIComponent(t)}`:"")),zt=(t,i)=>nt(`/archive/restore/${t}/${i}`,{}),jt=(t,i)=>G(`/archive/purge/${t}/${i}`),Ut=t=>G(`/archive/purge-all/${t}`);function rt(t){return t=Number(t)||0,"₹"+t.toLocaleString("en-IN",{maximumFractionDigits:0})}function qt(t){return(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function h(t){return t==null?"":String(t).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function Y(t){return t?new Date(t).toISOString().slice(0,10):"—"}function M(){return localStorage.getItem("ci360_theme")||"light"}function j(t){localStorage.setItem("ci360_theme",t),document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const o=s.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function $t(){var o;if(typeof document<"u"&&((o=document.body)!=null&&o.classList.contains("login-page")||window.location.pathname.includes("login")||document.querySelector(".login-box"))){document.documentElement.setAttribute("data-theme","dark");return}const t=M();document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(a=>{a.classList.toggle("active",a.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const a=i.querySelector(".tud-icon"),l=i.querySelector(".tud-label");a&&(a.textContent=t==="dark"?"☀️":"🌙"),l&&(l.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const a=s.querySelector("span");a&&(a.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{$t()}catch{}function E(t,i){const e=document.createElement("div");e.className="toast",e.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",e.textContent=(i?"⚠️  ":"✓  ")+t,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>e.remove(),200)},2800)}function Q(t){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${t}</div>`,i.onclick=e=>{e.target===i&&i.remove()},document.body.appendChild(i),i}function R(){V(),window.location.href="/login"}let H=null;async function pt(){if("serviceWorker"in navigator)try{H=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",H.scope),typeof Notification<"u"&&Notification.permission==="granted"&&K()&&st(H).catch(()=>{})}catch(t){console.warn("CI360 Service Worker registration notice:",t)}}try{pt()}catch{}let ht=0,bt=0;const D=new Set,wt=new Set;let kt=!1;function St(t){try{const i=typeof N=="function"?N():null,e=i&&i._id?String(i._id):"default";return`${t}_${e}`}catch{return`${t}_default`}}function tt(){try{const t=St("ci360_alerted_ids"),i=localStorage.getItem(t);if(i){const e=JSON.parse(i);Array.isArray(e)&&e.forEach(n=>D.add(String(n)))}}catch{}}function Z(){try{const t=St("ci360_alerted_ids"),i=Array.from(D).slice(-2e3);localStorage.setItem(t,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",t=>{t.key&&t.key.includes("ci360_alerted_ids")&&tt()});let q=null;function Ot(){if(typeof window>"u")return;const t=()=>{try{const i=window.AudioContext||window.webkitAudioContext;i&&(q||(q=new i),q.state==="suspended"&&q.resume())}catch{}window.removeEventListener("touchstart",t,!0),window.removeEventListener("pointerdown",t,!0),window.removeEventListener("click",t,!0)};window.addEventListener("touchstart",t,!0),window.addEventListener("pointerdown",t,!0),window.addEventListener("click",t,!0)}Ot();function F(){try{const t=Date.now();if(t-ht<2500)return;ht=t;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const e=q||new i;e.state==="suspended"&&e.resume();const n=e.currentTime,s=e.createOscillator(),o=e.createGain();s.type="sine",s.frequency.setValueAtTime(587.33,n),o.gain.setValueAtTime(0,n),o.gain.linearRampToValueAtTime(.25,n+.02),o.gain.exponentialRampToValueAtTime(.001,n+.38),s.connect(o),o.connect(e.destination),s.start(n),s.stop(n+.38);const a=e.createOscillator(),l=e.createGain();a.type="sine",a.frequency.setValueAtTime(880,n+.12),l.gain.setValueAtTime(0,n+.12),l.gain.linearRampToValueAtTime(.28,n+.14),l.gain.exponentialRampToValueAtTime(.001,n+.6),a.connect(l),l.connect(e.destination),a.start(n+.12),a.stop(n+.6)}catch{}}function J(){try{const t=Date.now();if(t-bt<2500)return;bt=t,"vibrate"in navigator&&navigator.vibrate([200,100,200,100,200])}catch{}}function Ct(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function Et(){try{if(Ct()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function ut(){if(!("Notification"in window))return E("Your device browser does not support Web Notifications.",!0),!1;try{const t=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return t==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),await st(),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),E("Notifications successfully enabled on this device!"),F(),J(),await W({title:"CI360 Alerts Active 🔔",message:"Instant notifications are now live on this device for jobs, tasks, and overdue invoices!",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),E("Notification permission was not granted.",!0),!1)}catch(t){console.error("Notification permission request error:",t)}return!1}async function W({title:t,message:i,type:e,id:n,url:s}){const o=n?String(n):null;if(tt(),o&&D.has(o)||(o&&(D.add(o),Z()),F(),J(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return;localStorage.setItem("ci360_notif_enabled","true")}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",l={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:o?`ci360-notif-${o}`:"ci360-alert-"+Date.now(),renotify:!0,vibrate:[200,100,200,100,200],data:{url:s||(typeof window<"u"?window.location.href:""),type:e||"general"}};try{navigator.serviceWorker&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:t,options:l})}catch{}try{if("serviceWorker"in navigator){const f=H||await navigator.serviceWorker.getRegistration();if(f&&f.showNotification){await f.showNotification(t,l);return}}}catch{}try{const f=new Notification(t,l);f.onclick=()=>{window.focus(),f.close()};return}catch{}}function Rt(t){const i="=".repeat((4-t.length%4)%4),e=(t+i).replace(/-/g,"+").replace(/_/g,"/"),n=window.atob(e),s=new Uint8Array(n.length);for(let o=0;o<n.length;++o)s[o]=n.charCodeAt(o);return s}async function st(t=null){try{if(typeof window>"u"||!("serviceWorker"in navigator)||!("PushManager"in window)||typeof Notification>"u"||Notification.permission!=="granted"||!K())return null;const e=t||H||await navigator.serviceWorker.ready;if(!e||!e.pushManager)return null;let n=await e.pushManager.getSubscription();if(!n){const s=await U("/notifications/vapid-public-key").catch(()=>null),o=s&&s.publicKey?s.publicKey:"BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q";n=await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Rt(o)})}if(n){const s=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return await P("/notifications/subscribe",{method:"POST",body:JSON.stringify({subscription:n.toJSON?n.toJSON():n,deviceType:s?"mobile":"desktop"})}).catch(()=>{}),n}}catch(i){console.warn("Push subscription registration notice:",i.message)}return null}if(typeof window<"u"&&(window.triggerSystemNotification=W,window.requestNotificationPermission=ut,window.registerPushSubscription=st,"Notification"in window)){const t=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",t,!0),window.removeEventListener("touchstart",t,!0)};window.addEventListener("click",t,!0),window.addEventListener("touchstart",t,!0)}function Ht(){if(typeof document>"u")return null;let t=document.getElementById("ci360FloatingContainer");return t||(t=document.createElement("div"),t.id="ci360FloatingContainer",t.className="ci360-floating-container",document.body.appendChild(t)),t}function lt({id:t,title:i,message:e,type:n,time:s,actionText:o,onAction:a,persistent:l=!1,timeout:f=8e3}){F(),J();const u=Ht();if(!u)return;const w=`ci360-pop-${t||Math.random().toString(36).slice(2,9)}`;if(document.getElementById(w))return;let c="🔔",v="info",m="UPDATE",B="View Details",$="";const x=(n||"").toLowerCase(),S=(e||"").toLowerCase();x.includes("invoice_overdue")?(c="🚨",v="critical",m="OVERDUE INVOICE",B="Pay / View Invoice",$="billing"):x.includes("invoice_paid")||x.includes("payment")?(c="💳",v="success",m="PAYMENT CLEARED",B="View Billing",$="billing"):x.includes("invoice")?(c="🧾",v="info",m="NEW INVOICE",B="View Invoice",$="billing"):x.includes("job")&&(S.includes("overdue")||x.includes("overdue"))?(c="⚠️",v="critical",m="OVERDUE JOB",B="View Job",$="jobs"):x.includes("job")&&S.includes("due today")?(c="⏳",v="warning",m="JOB DUE TODAY",B="View Job",$="jobs"):x.includes("job_created")?(c="📋",v="info",m="NEW JOB LOGGED",B="View Job",$="jobs"):x.includes("job")||x.includes("status")?(c="🔄",v="info",m="JOB UPDATED",B="View Job",$="jobs"):x.includes("task")&&(S.includes("overdue")||x.includes("overdue"))?(c="⚠️",v="critical",m="OVERDUE TASK",B="Check Planner",$="dailytasks"):x.includes("task_completed")?(c="✅",v="success",m="TASK COMPLETED",B="View Planner",$="dailytasks"):x.includes("task")?(c="📅",v="warning",m="DAILY PLANNER",B="Open Planner",$="dailytasks"):x.includes("ticket")?(c="💬",v="info",m="SUPPORT TICKET",B="View Ticket",$="tickets"):x.includes("target")&&(c="🎉",v="success",m="TARGET REACHED",B="View Targets",$="targets");const d=o||B,b=document.createElement("div");b.id=w,b.className=`ci360-popup-card ci360-priority-${v}`,b.innerHTML=`
    <div class="ci360-popup-indicator"></div>
    <div class="ci360-popup-body">
      <div class="ci360-popup-header">
        <div class="ci360-popup-header-left">
          <div class="ci360-popup-icon-badge">${c}</div>
          <span class="ci360-popup-tag ${v}">${m}</span>
          <span class="ci360-popup-time">${s||"Just now"}</span>
        </div>
        <button type="button" class="ci360-popup-close-btn" aria-label="Dismiss">✕</button>
      </div>
      <div class="ci360-popup-title">${h(i||"CI360 Notification")}</div>
      <div class="ci360-popup-message">${h(e||"")}</div>
      <div class="ci360-popup-footer">
        <button type="button" class="ci360-popup-dismiss-link">Dismiss</button>
        <button type="button" class="ci360-popup-action-btn">
          ${d} →
        </button>
      </div>
    </div>
    <div class="ci360-popup-progress">
      <div class="ci360-popup-progress-fill"></div>
    </div>
  `,F(),J();const T=()=>{b.style.opacity="0",b.style.transform="translateX(40px) scale(0.95)",setTimeout(()=>b.remove(),220)};b.querySelector(".ci360-popup-close-btn").onclick=p=>{p.stopPropagation(),T()},b.querySelector(".ci360-popup-dismiss-link").onclick=p=>{p.stopPropagation(),T()};const I=()=>{if(typeof a=="function")a();else if($&&typeof window.ci360NavTab=="function"){const p=typeof N=="function"?N():null;let g=$;p&&p.role==="employee"&&(g==="jobs"||g==="myjobs")&&(g="myjobs"),window.ci360NavTab(g)}if(t)try{P(`/notifications/${t}/read`,{method:"PATCH"})}catch{}T()};for(b.querySelector(".ci360-popup-action-btn").onclick=p=>{p.stopPropagation(),I()},b.style.cursor="pointer",b.onclick=p=>{p.target.closest(".ci360-popup-close-btn")||p.target.closest(".ci360-popup-dismiss-link")||I()};u.children.length>=4;)u.removeChild(u.firstChild);u.appendChild(b),l||setTimeout(()=>{document.body.contains(b)&&T()},v==="critical"?14e3:f)}function xt(t=[]){if(!t||!t.length)return;const i=sessionStorage.getItem("ci360_client_overdue_dismissed");if(i&&Date.now()-Number(i)<45*60*1e3)return;const e=t.reduce((l,f)=>l+(Number(f.pendingAmount||f.totalAmount)||0),0),n=`
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
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${rt(e)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${t.length} Overdue Invoice${t.length>1?"s":""}</span>
      </div>

      <div class="ci360-overdue-list">
        ${t.map(l=>{const f=l.dueDate?new Date(l.dueDate):new Date,u=Math.max(1,Math.floor((Date.now()-f.getTime())/(1e3*60*60*24)));return`
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${h(l.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${Y(l.dueDate)} <span style="color:var(--red-600);font-weight:700">(${u}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${rt(l.pendingAmount||l.totalAmount||0)}</div>
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
  `,s=Q(n),o=s.querySelector("#ci360OverduePayBtn"),a=s.querySelector("#ci360OverdueRemindBtn");o&&(o.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove(),typeof window.ci360NavTab=="function"&&window.ci360NavTab("billing")}),a&&(a.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove()})}function It(){return`
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
            <button id="markAllReadBtn" type="button" class="btn ghost small notif-action-btn">Mark Read</button>
            <button id="clearNotifBtn" type="button" class="btn ghost small notif-action-btn">Clear</button>
            <button id="notifCloseBtn" type="button" class="notif-mobile-close" aria-label="Close notifications">✕</button>
          </div>
        </div>

        ${!Et()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
    </div>`}function mt(t){return t?t.startsWith("task_completed")?"🎉":t.startsWith("task_due")?"⚡":t.startsWith("task")?"✅":t.startsWith("target_completed")?"🎉":t.startsWith("target")?"🎯":t.startsWith("job_due")?"⏳":t.startsWith("job")?"📋":t.startsWith("ticket")?"🎫":t.startsWith("status")?"🔄":t.startsWith("test")?"🧪":"🔔":"🔔"}function et(t){if(!t)return"";const i=new Date(t),n=Math.floor((new Date-i)/1e3);if(n<60)return"Just now";const s=Math.floor(n/60);if(s<60)return`${s}m ago`;const o=Math.floor(s/60);if(o<24)return`${o}h ago`;const a=Math.floor(o/24);return a===1?"Yesterday":a<7?`${a}d ago`:Y(t)}function ct(t){if(!t)return;const i=mt(t.type),e=(t.type||"").toLowerCase(),n=t.title||"Notification",s=t.message||"",o=t.createdAt?Y(t.createdAt)+" at "+new Date(t.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"Recently",a=et(t.createdAt),l=typeof N=="function"?N():null,f=l&&l.role==="employee";let u="Update",w="blue",y="",c="";const v=t.jobId||t.taskId||t.ticketId||t.targetId||null;e.includes("job")?(u="Job Deliverable",w="blue",c=f?"myjobs":"jobs",y=f?"Open in My Jobs 📋":"View Job 📁"):e.includes("task")?(u="Daily Planner",w="green",c="dailytasks",y="Open Daily Planner 📅"):e.includes("ticket")?(u="Support Ticket",w="brand",c="tickets",y="Open Support Tickets 🎫"):e.includes("target")?(u="Target Goal",w="gold",c="targets",y="View My Targets 🎯"):(e.includes("invoice")||e.includes("billing"))&&(u="Billing & Invoice",w="purple",c="billing",y="Open Billing 💳");const m=Array.isArray(t.attachments)&&t.attachments.length>0,B=Q(`
    <div class="notif-detail-modal" style="padding:4px 0">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border-xs)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:12px;background:var(--bg-elevated);border:1px solid var(--border-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:var(--shadow-xs)">
            ${i}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap">
              <span class="badge ${w}" style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${u}</span>
              <span style="font-size:11.5px;color:var(--text-4)">${a}</span>
            </div>
            <div style="font-size:11px;color:var(--text-4)">${o}</div>
          </div>
        </div>
        <button type="button" class="btn ghost small notif-modal-close-btn" aria-label="Close" style="padding:4px 8px;font-size:16px;line-height:1;border-radius:6px;color:var(--text-3)">✕</button>
      </div>

      <h3 style="font-size:16.5px;font-weight:800;color:var(--text-1);margin:0 0 12px 0;line-height:1.35;letter-spacing:-0.3px">
        ${h(n)}
      </h3>

      <div style="background:var(--bg-elevated);border:1px solid var(--border-xs);border-radius:var(--r-md);padding:14px 16px;margin-bottom:16px;font-size:13.5px;color:var(--text-2);line-height:1.6;white-space:pre-wrap;word-break:break-word">
        ${h(s)}
      </div>

      ${m?`
        <div style="margin-bottom:16px">
          <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Attachments (${t.attachments.length})</div>
          ${it(t.attachments,{title:"Attachments"})}
        </div>
      `:""}

      <div class="modal-actions" style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border-xs);display:flex;justify-content:flex-end;align-items:center;gap:10px;flex-wrap:wrap">
        <button type="button" class="btn secondary notif-modal-dismiss-btn" style="font-weight:600">Close</button>
        ${c?`
          <button type="button" class="btn primary notif-modal-go-btn" style="font-weight:700;display:inline-flex;align-items:center;gap:6px">
            <span>${y}</span>
          </button>
        `:""}
      </div>
    </div>
  `),$=()=>B.remove(),x=B.querySelector(".notif-modal-close-btn"),S=B.querySelector(".notif-modal-dismiss-btn"),d=B.querySelector(".notif-modal-go-btn");x&&(x.onclick=$),S&&(S.onclick=$),d&&(d.onclick=()=>{$(),typeof window.ci360NavTab=="function"&&window.ci360NavTab(c,v)})}function At(){const t=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),e=document.getElementById("notifBadge"),n=document.getElementById("notifList"),s=document.getElementById("clearNotifBtn"),o=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),l=document.getElementById("notifDismissBannerBtn"),f=document.getElementById("notifPermissionBanner"),u=document.getElementById("notifUnreadBadge");if(!t||!i)return;pt();function w(){const p=document.getElementById("notifPermissionBanner");p&&(p.classList.add("hidden"),p.style.setProperty("display","none","important"),p.remove())}function y(){if(Et()){w();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?w():Notification.permission==="default"&&f&&f.style.setProperty("display","flex","important"))}y(),l&&(l.onclick=p=>{p.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),w()}),a&&(a.onclick=async p=>{p.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),w(),await ut(),w()}),Ct()&&st(),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),tt();let c=[],v="all";function m(){if(!n)return;let p=c;if(v==="task"?p=c.filter(g=>(g.type||"").includes("task")):v==="target"?p=c.filter(g=>(g.type||"").includes("target")):v==="job"?p=c.filter(g=>(g.type||"").includes("job")):v==="ticket"&&(p=c.filter(g=>(g.type||"").includes("ticket"))),p.length===0){n.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${v==="all"?"":v+" "}notifications</div>`;return}n.innerHTML=p.map(g=>{const A=mt(g.type);return`
        <div class="notif-item ${g.read?"":"unread"}" data-id="${g._id}" data-type="${h(g.type||"")}">
          <div class="notif-icon">${A}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${h(g.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${et(g.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${h(g.message)}</div>
          </div>
          <div style="color:var(--text-4);font-size:16px;line-height:1;margin-top:2px;flex-shrink:0">›</div>
        </div>`}).join(""),n.querySelectorAll(".notif-item").forEach(g=>{g.onclick=async()=>{const A=g.dataset.id,C=c.find(r=>String(r._id)===String(A));if(A&&g.classList.contains("unread")){g.classList.remove("unread");try{await P(`/notifications/${A}/read`,{method:"PATCH"})}catch{}const r=c.filter(k=>!k.read&&String(k._id)!==String(A)).length;e&&(e.style.display=r>0?"flex":"none",e.textContent=r>99?"99+":r),u&&(u.textContent=r>0?`${r} new`:"",u.style.display=r>0?"inline-block":"none")}if(b(),C)ct(C);else{const r=g.dataset.type,k=typeof N=="function"?N():null,_=k&&k.role==="employee";r&&r.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):r&&r.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab(_?"myjobs":"jobs"):r&&r.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):r&&r.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}}})}let B={jobs:0,tasks:0,invoices:0,tickets:0},$=!1;async function x(p=!1){try{const g=await U("/notifications");c=g.notifications||[];const A=g.unreadCount||0;if(e&&(e.textContent=A>99?"99+":A,e.style.display=A>0?"flex":"none"),u&&(u.textContent=A>0?`${A} new`:"",u.style.display=A>0?"inline-block":"none"),tt(),g.overdue&&g.overdue.invoices&&g.overdue.invoices.length>0){const C=typeof N=="function"?N():null;C&&C.role==="client"&&xt(g.overdue.invoices)}if(g.syncTimestamps){const C=g.syncTimestamps;if(!$)B={...C},$=!0;else{const r=[];C.jobs>(B.jobs||0)&&r.push("jobs"),C.tasks>(B.tasks||0)&&r.push("tasks"),C.invoices>(B.invoices||0)&&r.push("invoices"),C.tickets>(B.tickets||0)&&r.push("tickets"),r.length>0&&(B={...C},window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{changedKeys:r,syncTimestamps:C,overdue:g.overdue}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({changedKeys:r,syncTimestamps:C}))}}if(kt){const C=c.filter(r=>!r.read&&!D.has(String(r._id)));if(C.length>0){for(const r of C){const k=String(r._id);wt.add(k),lt({id:k,title:r.title||"CI360 Alert",message:r.message||"",type:r.type}),await W({title:r.title||"CI360 Alert",message:r.message||"",type:r.type,id:k})}Z(),window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{newNotifications:C}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({newNotifications:C})}}else{const C=c.filter(r=>!r.read&&!D.has(String(r._id)));if(c.forEach(r=>wt.add(String(r._id))),C.length>0){const r=C.slice(0,3);for(const k of r){const _=String(k._id);lt({id:_,title:k.title||"CI360 Alert",message:k.message||"",type:k.type}),await W({title:k.title||"CI360 Alert",message:k.message||"",type:k.type,id:_})}C.forEach(k=>D.add(String(k._id))),Z()}else c.forEach(r=>D.add(String(r._id))),Z();kt=!0}m()}catch{n&&c.length===0&&(n.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=x,window.showInAppPopupAlert=lt,window.showClientOverdueInvoiceModal=xt),x(),window.__ci360PollInterval=setInterval(x,6e3),window.addEventListener("focus",()=>x(!0)),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(p=>{p.onclick=g=>{g.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(A=>A.classList.remove("active")),p.classList.add("active"),v=p.dataset.filter,m()}});const S=document.getElementById("notifBackdrop");function d(){i.style.display="flex",i.classList.add("open"),S&&(S.style.display="block",S.classList.add("open")),t.setAttribute("aria-expanded","true"),y();const p=document.getElementById("topbarUserDropdown");p&&(p.style.display="none"),x()}function b(){i.style.display="none",i.classList.remove("open"),S&&(S.style.display="none",S.classList.remove("open")),t.setAttribute("aria-expanded","false")}function T(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?b():d()}window.ci360CloseNotifications=b;const I=document.getElementById("notifCloseBtn");I&&(I.onclick=p=>{p.stopPropagation(),b()}),S&&(S.onclick=p=>{p.stopPropagation(),b()}),t.onclick=p=>{p.stopPropagation(),T()},o&&(o.onclick=async p=>{p.stopPropagation();try{await P("/notifications/read",{method:"PATCH"}),e.style.display="none",u&&(u.textContent="",u.style.display="none"),c.forEach(g=>g.read=!0),m(),E("All notifications marked as read")}catch(g){E(g.message,!0)}}),window.__ci360NotifDocClickHandler&&document.removeEventListener("click",window.__ci360NotifDocClickHandler),window.__ci360NotifDocClickHandler=p=>{!i.contains(p.target)&&!t.contains(p.target)&&b()},document.addEventListener("click",window.__ci360NotifDocClickHandler),s&&(s.onclick=async p=>{p.stopPropagation();try{await G("/notifications"),c=[],n.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',e.style.display="none",u&&(u.textContent="",u.style.display="none"),E("Notifications cleared")}catch(g){E(g.message,!0)}});try{const g=new URLSearchParams(window.location.search).get("notifId");g&&U("/notifications").then(A=>{const r=(A.notifications||[]).find(k=>String(k._id)===String(g));if(r){ct(r);const k=window.location.pathname+window.location.hash;window.history.replaceState(null,"",k)}}).catch(()=>{})}catch{}}function Vt({user:t,currentRole:i,activeTab:e,tabs:n,title:s,subtitle:o}){const a=t&&t.name?t.name.charAt(0).toUpperCase():"U",l=t&&(t.role==="superadmin"||t.role==="admin")?"Admin":t&&t.role==="accounts"?"Accounts":t&&t.role==="employee"?"Employee":t&&t.role==="client"?"Client":t&&t.role?t.role.toUpperCase():"User",f=t&&t.name?t.name:"User",u=t&&t.email?t.email:t&&t.username?t.username:"",w=n&&n.some(m=>m.key==="logjob"),y=n&&n.find(m=>m.key===e),c=s||y&&y.label||"Dashboard";let v=[];return i==="accounts"?v=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:e==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:e==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:e==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(e),isMore:!0}]:i==="superadmin"?v=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="dashboard"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(e),isMore:!0}]:i==="employee"?v=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:e==="myjobs"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"proposals",label:"Proposals",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',active:e==="proposals"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:e==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","proposals","targets"].includes(e),isMore:!0}]:v=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:e==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:e==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(e),isMore:!0}],`
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
          ${n.map(m=>`
            <button type="button" class="sidebar-item ${e===m.key?"active":""}" data-tab="${m.key}" aria-current="${e===m.key?"page":"false"}">
              <span class="icon">${m.icon||"📌"}</span>
              <span>${m.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${h(t?t.name:"User")}</div>
            <div class="role">${h(l)}</div>
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
              <h1 class="page-heading-title">${h(c)}</h1>
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

            ${w?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${M()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${M()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${It()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${a}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${h(f)}</span>
                  <span class="topbar-user-role-badge">${h(l)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${a}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${h(f)}</div>
                      ${u?`<div class="tud-email">${h(u)}</div>`:""}
                      <span class="tud-role-chip">${h(l)}</span>
                    </div>
                  </div>
                  <div class="tud-divider"></div>
                  <div class="tud-items">
                    <button type="button" class="tud-item" id="tudProfileSettingsBtn" role="menuitem">
                      <span class="tud-icon">⚙️</span>
                      <span class="tud-label">Account Settings</span>
                    </button>
                    <button type="button" class="tud-item" id="tudCmdBtn" role="menuitem">
                      <span class="tud-icon">⚡</span>
                      <span class="tud-label">Command Palette</span>
                      <kbd class="tud-kbd">⌘K</kbd>
                    </button>
                    <button type="button" class="tud-item" id="tudThemeToggleBtn" role="menuitem">
                      <span class="tud-icon">${M()==="dark"?"☀️":"🌙"}</span>
                      <span class="tud-label">Switch to ${M()==="dark"?"Light":"Dark"} Mode</span>
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
                        <span style="font-size:16px" id="tudMobileThemeIcon">${M()==="dark"?"☀️":"🌙"}</span>
                        <span id="tudMobileThemeText">${M()==="dark"?"Light Mode":"Dark Mode"}</span>
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
          ${v.map(m=>`
            <button type="button" class="mbn-item ${m.active?"active":""}" data-tab="${m.key}" ${m.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${m.iconSvg}</span>
              <span class="mbn-label">${h(m.label)}</span>
              ${m.active?'<span class="mbn-active-dot"></span>':""}
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
              ${n.map(m=>`
                <button type="button" class="mms-card ${e===m.key?"active":""}" data-tab="${m.key}">
                  <span class="mms-card-icon">${m.icon||"📌"}</span>
                  <span class="mms-card-label">${h(m.label)}</span>
                </button>
              `).join("")}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${M()==="dark"?"☀️ Light Mode":"🌙 Dark Mode"}</span>
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
    </div>`}function Ft(t){const i=document.getElementById("mobileNavToggle"),e=document.getElementById("appSidebar"),n=document.getElementById("sidebarOverlay");function s(){e&&e.classList.add("open"),n&&n.classList.add("open")}function o(){e&&e.classList.remove("open"),n&&n.classList.remove("open")}i&&(i.onclick=s),n&&(n.onclick=o);const a=document.getElementById("mobileMoreBackdrop"),l=document.getElementById("mobileMoreSheet"),f=document.getElementById("mmsCloseBtn"),u=document.getElementById("mobileMoreBtn");function w(){a&&a.classList.add("active"),l&&l.classList.add("active")}function y(){a&&a.classList.remove("active"),l&&l.classList.remove("active")}u&&(u.onclick=r=>{r.stopPropagation(),w()}),f&&(f.onclick=y),a&&(a.onclick=r=>{r.target===a&&y()}),document.querySelectorAll(".mbn-item").forEach(r=>{r.dataset.tab&&r.dataset.tab!=="__more__"&&(r.onclick=()=>{y(),t&&t(r.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(r=>{r.onclick=()=>{y(),t&&t(r.dataset.tab)}});const c=document.getElementById("mmsToggleThemeBtn");c&&(c.onclick=()=>{j(M()==="dark"?"light":"dark")});const v=document.getElementById("mmsNotifsBtn");v&&(v.onclick=()=>{y();const r=document.getElementById("notifBellBtn");r&&r.click()});const m=document.getElementById("mmsLogoutBtn");m&&(m.onclick=R);const B=document.getElementById("mobileCalBtn");B&&(B.onclick=()=>{const r=document.querySelector(".period-row");r&&(r.scrollIntoView({behavior:"smooth",block:"center"}),r.classList.add("pulse-highlight"),setTimeout(()=>r.classList.remove("pulse-highlight"),1200))});const $=document.getElementById("tudMobileThemeBtn");$&&($.onclick=r=>{r.stopPropagation(),j(M()==="dark"?"light":"dark")});const x=document.getElementById("tudMobileNotifsBtn");x&&(x.onclick=r=>{r.stopPropagation();const k=document.getElementById("topbarUserDropdown");k&&(k.style.display="none");const _=document.getElementById("notifBellBtn");_&&_.click()});const S=document.getElementById("tudMobileSettingsBtn");S&&(S.onclick=r=>{r.stopPropagation();const k=document.getElementById("topbarUserDropdown");k&&(k.style.display="none");const _=document.querySelector('[data-tab="settings"], [data-tab="manage"]');_&&t?t(_.dataset.tab):ot()});const d=document.getElementById("tudProfileSettingsBtn");d&&(d.onclick=r=>{r.stopPropagation();const k=document.getElementById("topbarUserDropdown");k&&(k.style.display="none");const _=document.querySelector('[data-tab="settings"], [data-tab="manage"]');_&&t?t(_.dataset.tab):ot()});const b=document.getElementById("tudMobileHelpBtn");b&&(b.onclick=r=>{r.stopPropagation();const k=document.getElementById("topbarUserDropdown");k&&(k.style.display="none"),Q(`
        <div style="padding:24px;text-align:center;">
          <div style="font-size:36px;margin-bottom:12px;">💬</div>
          <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
          <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
            For immediate technical assistance, client onboarding, or workspace inquiries, reach out to your system administrator or support team.
          </p>
          <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
        </div>
      `)});const T=document.getElementById("logoutBtnMobile");T&&(T.onclick=R);const I=document.getElementById("topbarUserBtn"),p=document.getElementById("topbarUserDropdown");I&&p&&(I.onclick=r=>{r.stopPropagation();const k=p.style.display!=="none";p.style.display=k?"none":"block",I.setAttribute("aria-expanded",String(!k)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",r=>{!p.contains(r.target)&&!I.contains(r.target)&&(p.style.display="none",I.setAttribute("aria-expanded","false"))}));const g=document.getElementById("tudThemeToggleBtn");g&&(g.onclick=()=>{j(M()==="dark"?"light":"dark")});const A=document.getElementById("topbarQuickLogJobBtn");A&&(A.onclick=()=>{t&&t("logjob")});const C=document.getElementById("logoutBtn");C&&(C.onclick=R),At(),document.querySelectorAll(".sidebar-item").forEach(r=>{r.onclick=()=>{o(),t&&t(r.dataset.tab)}}),Jt(t)}function Jt(t){const i=document.getElementById("cmdPaletteBackdrop"),e=document.getElementById("cmdSearchInput"),n=document.getElementById("cmdResultsList"),s=document.getElementById("topbarCmdTrigger"),o=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),l=document.getElementById("cmdCloseKbd");if(!i||!e||!n)return;const f=Array.from(document.querySelectorAll(".sidebar-item")),u=f.map(d=>{var b,T;return{type:"tab",id:d.dataset.tab,label:((b=d.querySelector("span:last-child"))==null?void 0:b.textContent)||d.dataset.tab,icon:((T=d.querySelector(".icon"))==null?void 0:T.textContent)||"📌",sub:"Navigate to section",action:()=>{t&&t(d.dataset.tab)}}});f.some(d=>d.dataset.tab==="logjob")&&u.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{t&&t("logjob")}}),u.push({type:"action",id:"toggle-theme",label:M()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{j(M()==="dark"?"light":"dark")}}),u.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const d=document.getElementById("notifBellBtn");d&&d.click()}}),u.push({type:"action",id:"account-settings",label:"Account Settings & Credentials",icon:"⚙️",sub:"Update username, email, and password",action:()=>{ot()}}),u.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>R()});let y=0,c=[...u];function v(){if(!c.length){n.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}n.innerHTML=c.map((d,b)=>`
      <div class="cmd-result ${b===y?"selected":""}" data-idx="${b}">
        <div class="cmd-result-icon">${d.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${h(d.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${h(d.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),n.querySelectorAll(".cmd-result").forEach(d=>{d.onmouseenter=()=>{y=Number(d.dataset.idx),m()},d.onclick=()=>{B(Number(d.dataset.idx))}})}function m(){n.querySelectorAll(".cmd-result").forEach((d,b)=>{d.classList.toggle("selected",b===y)})}function B(d){const b=c[d];b&&b.action&&(x(),b.action())}function $(){const d=document.getElementById("topbarUserDropdown");d&&(d.style.display="none"),i.classList.add("open"),e.value="",c=[...u],y=0,v(),setTimeout(()=>e.focus(),50)}function x(){i.classList.remove("open"),e.blur()}s&&(s.onclick=$),o&&(o.onclick=$),a&&(a.onclick=()=>{const d=document.getElementById("topbarUserDropdown");d&&(d.style.display="none"),$()}),l&&(l.onclick=x),i.onclick=d=>{d.target===i&&x()},e.oninput=()=>{const d=e.value.trim().toLowerCase();d?c=u.filter(b=>b.label.toLowerCase().includes(d)||b.sub.toLowerCase().includes(d)):c=[...u],y=0,v()},e.onkeydown=d=>{if(d.key==="ArrowDown"){if(d.preventDefault(),c.length>0){y=(y+1)%c.length,m();const b=n.querySelector(".cmd-result.selected");b&&b.scrollIntoView({block:"nearest"})}}else if(d.key==="ArrowUp"){if(d.preventDefault(),c.length>0){y=(y-1+c.length)%c.length,m();const b=n.querySelector(".cmd-result.selected");b&&b.scrollIntoView({block:"nearest"})}}else d.key==="Enter"?(d.preventDefault(),B(y)):d.key==="Escape"&&(d.preventDefault(),x())};const S=d=>{(d.metaKey||d.ctrlKey)&&d.key.toLowerCase()==="k"?(d.preventDefault(),i.classList.contains("open")?x():$()):d.key==="Escape"&&i.classList.contains("open")&&x()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=S,window.addEventListener("keydown",S)}function Wt(t=4){return`
    <div class="grid grid-${Math.min(t,4)}" style="margin-bottom:24px">
      ${Array(t).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function Kt(t,i,e="📁",n=""){return`
    <div class="empty">
      <span class="empty-icon">${e}</span>
      <h3>${h(t)}</h3>
      <p>${h(i)}</p>
      ${n}
    </div>`}function Gt(t,i,e="",n="📊",s=""){let o="";return s&&(o=`<span class="kpi-trend ${s.startsWith("+")||s.includes("↑")||s.toLowerCase().includes("up")?"up":"down"}">${h(s)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${h(t)}</span>
        <div class="kpi-icon">${n}</div>
      </div>
      <div class="kpi-value">${h(i)}</div>
      <div class="kpi-sub">${o}<span>${h(e)}</span></div>
    </div>`}function Yt(t,i="gray"){return`<span class="badge ${i}">${h(t)}</span>`}function Qt(t,i="indigo"){const e=Math.min(100,Math.max(0,Number(t)||0));return`
    <div class="progress-bar-wrap" title="${e.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${e}%"></div>
    </div>`}function Xt(t){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([e,n])=>`<button class="pchip ${t===e?"active":""}" data-period="${e}">${n}</button>`).join("")}</div>`}function Zt(t){if(!t)return"U";const i=t.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function at(t){if(t=Number(t)||0,t===0)return"0 B";const i=1024,e=["B","KB","MB","GB"],n=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,n)).toFixed(1))+" "+e[n]}function X(t="",i=""){const e=(t.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(e)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:e==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(e)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(e)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(e)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(e)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(e)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function te(t){return t?X(t.name||t.filename||"",t.type||"").cls==="img":!1}function ft(t){if(!t||!t.url)return;const i=X(t.name,t.type),e=i.cls==="img",n=i.cls==="pdf",s=h(t.name||"Attachment"),o=at(t.size),a=document.createElement("div");a.className="preview-modal-overlay",a.innerHTML=`
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
  `,a.onclick=l=>{(l.target===a||l.target.closest(".preview-modal-close"))&&a.remove()},document.body.appendChild(a)}function it(t=[],i={}){if(!t||!t.length)return"";const e=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${h(i.title)} <span style="font-weight:500;color:var(--text-4)">(${t.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${t.map((n,s)=>{const o=X(n.name,n.type),a=h(n.name||"File"),l=at(n.size);return`
            <div class="attachment-chip" data-idx="${s}" title="${a} (${l})">
              <span class="file-type-icon ${o.cls}" style="width:22px;height:22px;font-size:12px">${o.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${s}, this)">${a}</span>
              <span class="attachment-chip-size">${l}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${s}, this)">👁️</button>
                <a href="${n.url}" download="${a}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${e?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${s}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const L={};async function dt(t){const i=Array.from(t||[]);if(!i.length)return[];const n=(await Promise.all(i.map(async s=>new Promise(o=>{const a=new FileReader;a.onload=()=>{o({name:s.name,type:s.type,size:s.size,base64:a.result,data:a.result})},a.onerror=()=>o(null),a.readAsDataURL(s)})))).filter(Boolean);if(!n.length)return[];try{const s=await nt("/upload",{files:n});if(s&&s.files&&s.files.length)return s.files}catch(s){console.warn("Backend upload failed, fallback to base64 data URLs:",s)}return n.map(s=>({name:s.name,url:s.base64,size:s.size,type:s.type,uploadedAt:new Date}))}function gt({id:t="uploader",label:i="Attachments & Files",subtitle:e="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:n=!0,accept:s="*/*",maxFiles:o=10}={}){return`
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
  `}function vt(t,i={}){const e=document.getElementById("zone-"+t),n=document.getElementById("input-"+t),s=document.getElementById("list-"+t),o=document.getElementById("count-"+t);L[t]=i.existing?[...i.existing]:[];function a(){const l=L[t]||[];if(o&&(o.textContent=`${l.length} file${l.length===1?"":"s"} attached`),!!s){if(!l.length){s.innerHTML="";return}s.innerHTML=l.map((f,u)=>{const w=X(f.name,f.type),y=h(f.name||"File"),c=at(f.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${w.cls}">${w.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${y}">${y}</div>
              <div class="uploader-file-size">${w.label} · ${c}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${t}', ${u})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${t}', ${u})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(l)}}window.__removeUploaderFile=(l,f)=>{if(L[l]){L[l].splice(f,1);const u=window[`__update_${l}`];u&&u()}},window.__previewUploaderFile=(l,f)=>{const u=(L[l]||[])[f];u&&ft(u)},window[`__update_${t}`]=a,e&&n&&(e.onclick=l=>{l.target.tagName!=="BUTTON"&&!l.target.closest("button")&&n.click()},e.ondragover=l=>{l.preventDefault(),e.classList.add("dragover")},e.ondragleave=()=>e.classList.remove("dragover"),e.ondrop=async l=>{if(l.preventDefault(),e.classList.remove("dragover"),l.dataTransfer&&l.dataTransfer.files&&l.dataTransfer.files.length){E("Uploading files… ⏳");const f=await dt(l.dataTransfer.files);L[t]=[...L[t]||[],...f],a(),E("Files attached! ✓")}},n.onchange=async()=>{if(n.files&&n.files.length){E("Uploading files… ⏳");const l=await dt(n.files);L[t]=[...L[t]||[],...l],a(),E("Files attached! ✓"),n.value=""}}),a()}function yt(t){return L[t]||[]}function Tt(t,i=[]){L[t]=[...i];const e=window[`__update_${t}`];e&&e()}window.__openPreview=(t,i)=>{const e=i.closest(".attachment-chips-wrap");if(!e)return;const n=i.closest(".attachment-chip");if(!n)return;const s=Number(n.dataset.idx),o=e.dataset.attachments;if(o)try{const a=JSON.parse(decodeURIComponent(o));a[s]&&ft(a[s])}catch{}};function ee(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");return`
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
        ${gt({id:"tkup-"+e,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const ie={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},oe={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function ne(t,i){const e=(t.status||"Open").toLowerCase().replace(" ","-"),n=t.status==="Open",s=(t._id||"").slice(-4).toUpperCase(),o=Zt(t.userName),a=encodeURIComponent(JSON.stringify(t.attachments||[])),l=encodeURIComponent(JSON.stringify(t.adminAttachments||[]));return`
    <div class="ticket-card status-${e}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${s}</span>
            <span class="ticket-subject">${h(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${ie[t.status]||"gray"}">
            ${n?'<span class="pulse-dot"></span>':""} ${h(t.status)}
          </span>
          <span class="badge ${oe[t.priority]||"gray"}">${h(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${o}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${h(t.userName)}
            <span class="ticket-role-pill">${h(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${et(t.createdAt)} · ${Y(t.createdAt)}</span>
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
              ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${et(t.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${h(t.adminReply)}</div>
            ${t.adminAttachments&&t.adminAttachments.length?`
              <div data-attachments="${l}">
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
            ${gt({id:"tkreplyup-"+t._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function z(t,i,e){const n=document.getElementById("tklist-"+i),s=document.getElementById("tkcnt-"+i);if(n)try{const o=await U("/tickets/job/"+t);s&&(s.textContent=o.length),o.length?(n.innerHTML=o.map(a=>ne(a,e)).join(""),se(t,i,e,n,o)):n.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{n.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function se(t,i,e,n,s){e&&(n.querySelectorAll(".tk-status-sel").forEach(o=>{o.onchange=async()=>{try{await O("/tickets/"+o.dataset.tkid,{status:o.value}),E("Status updated"),z(t,i,e)}catch(a){E(a.message,!0)}}}),n.querySelectorAll(".tk-quick-resolve-btn").forEach(o=>{o.onclick=async()=>{try{await O("/tickets/"+o.dataset.tkid,{status:"Resolved"}),E("Ticket marked as Resolved! 🎉"),z(t,i,e)}catch(a){E(a.message,!0)}}}),n.querySelectorAll(".ticket-template-btn").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplytxt-"+o.dataset.tkid);a&&(a.value=o.dataset.tpl,a.focus())}}),n.querySelectorAll(".tk-reply-toggle").forEach(o=>{o.onclick=()=>{const a=o.dataset.tkid,l=document.getElementById("tkreplyform-"+a);if(l){l.classList.toggle("show");const f=s.find(u=>u._id===a);vt("tkreplyup-"+a,{existing:f?f.adminAttachments:[]})}}}),n.querySelectorAll(".tk-reply-cancel").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplyform-"+o.dataset.tkid);a&&a.classList.remove("show")}}),n.querySelectorAll(".tk-reply-save").forEach(o=>{o.onclick=async()=>{const a=o.dataset.tkid,l=document.getElementById("tkreplytxt-"+a);if(!l)return;const f=yt("tkreplyup-"+a);try{await O("/tickets/"+a,{adminReply:l.value.trim(),adminAttachments:f}),E("Response saved! 🛡️"),z(t,i,e)}catch(u){E(u.message,!0)}}}),n.querySelectorAll(".tk-del-btn").forEach(o=>{o.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await G("/tickets/"+o.dataset.tkid),E("Ticket deleted"),z(t,i,e)}catch(a){E(a.message,!0)}}}))}function ae(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");z(t,e,i),vt("tkup-"+e);const n=document.querySelector(`[data-jobid="${t}"].ticket-toggle-btn`);n&&(n.onclick=()=>{const a=document.getElementById("tkform-"+e);if(!a)return;const l=a.style.display==="block";a.style.display=l?"none":"block",n.textContent=l?"+ Raise Ticket":"✕ Cancel"});const s=document.querySelector(`.tk-cancel-btn[data-safeid="${e}"]`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+e);a&&(a.style.display="none"),n&&(n.textContent="+ Raise Ticket")});const o=document.querySelector(`.tk-submit-btn[data-safeid="${e}"]`);o&&(o.onclick=async()=>{var w,y;const a=(w=(document.getElementById("tksub-"+e)||{}).value)==null?void 0:w.trim(),l=(y=(document.getElementById("tkmsg-"+e)||{}).value)==null?void 0:y.trim(),f=(document.getElementById("tkpri-"+e)||{}).value,u=yt("tkup-"+e);if(!a){E("Please enter a subject",!0);return}if(!l){E("Please enter a message",!0);return}o.disabled=!0,o.textContent="Submitting…";try{await nt("/tickets",{jobId:t,subject:a,message:l,priority:f,attachments:u}),E("Ticket submitted! 🎫");const c=document.getElementById("tkform-"+e);c&&(c.style.display="none"),n&&(n.textContent="+ Raise Ticket");const v=document.getElementById("tksub-"+e),m=document.getElementById("tkmsg-"+e);v&&(v.value=""),m&&(m.value=""),Tt("tkup-"+e,[]),z(t,e,i)}catch(c){E(c.message,!0)}finally{o.disabled=!1,o.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function le(){return""}function re(){}function Mt(t={}){const{title:i="Account Settings & Credentials",subtitle:e="Update your personal name, login email, and security password",showCardWrapper:n=!0,formId:s="accSettingsForm"}=t,o=N()||{},a=o.name?o.name.charAt(0).toUpperCase():"U",l=(o.role||"user").toUpperCase();return`
    <div class="${n?"card":""}" style="max-width:760px;margin:0 auto;width:100%;" id="${s}-wrap">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--gold-500,#d4af37),#b8860b);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:20px;box-shadow:0 4px 12px rgba(212,175,55,0.25);flex-shrink:0;">
          ${h(a)}
        </div>
        <div style="min-width:0;flex:1;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <h3 style="font-size:18px;font-weight:700;color:var(--text-1);margin:0;">${h(i)}</h3>
            <span class="badge gold" style="font-size:11px;padding:2px 8px;">${h(l)}</span>
          </div>
          <div style="font-size:13px;color:var(--text-3);margin-top:2px;">${h(e)}</div>
        </div>
      </div>

      <form id="${s}" onsubmit="return false;" style="display:flex;flex-direction:column;gap:20px;">
        <!-- Personal Identity -->
        <div>
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--gold-500,#d4af37);margin-bottom:12px;display:flex;align-items:center;gap:6px;">
            <span>👤</span> Profile Identity
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
            <div class="field" style="margin-bottom:0;">
              <label for="${s}-name" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Username / Full Name *</label>
              <input type="text" id="${s}-name" class="input" value="${h(o.name||"")}" placeholder="Your display name" required autocomplete="name">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${s}-email" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Email Address *</label>
              <input type="email" id="${s}-email" class="input" value="${h(o.email||"")}" placeholder="name@company.com" required autocomplete="email">
            </div>
          </div>
        </div>

        <!-- Security & Password -->
        <div style="padding-top:16px;border-top:1px dashed var(--border);">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--gold-500,#d4af37);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
            <span>🔐</span> Change Password
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-bottom:14px;">
            Leave password fields blank if you only want to update your name or email.
          </div>

          <div class="field" style="margin-bottom:14px;">
            <label for="${s}-currentPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Current Password</label>
            <div style="position:relative;">
              <input type="password" id="${s}-currentPass" class="input" placeholder="Enter current password" autocomplete="current-password" style="padding-right:42px;">
              <button type="button" class="pass-toggle-btn" data-target="${s}-currentPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
            <div class="field" style="margin-bottom:0;">
              <label for="${s}-newPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">New Password</label>
              <div style="position:relative;">
                <input type="password" id="${s}-newPass" class="input" placeholder="Min. 6 characters" autocomplete="new-password" style="padding-right:42px;">
                <button type="button" class="pass-toggle-btn" data-target="${s}-newPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
              </div>
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${s}-confirmPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Confirm New Password</label>
              <div style="position:relative;">
                <input type="password" id="${s}-confirmPass" class="input" placeholder="Re-enter new password" autocomplete="new-password" style="padding-right:42px;">
                <button type="button" class="pass-toggle-btn" data-target="${s}-confirmPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Alert Notice Box -->
        <div id="${s}-alert" style="display:none;padding:12px 14px;border-radius:8px;font-size:13px;line-height:1.4;"></div>

        <!-- Footer Actions -->
        <div style="display:flex;align-items:center;justify-content:flex-end;gap:12px;padding-top:8px;">
          <button type="button" class="btn gold" id="${s}-saveBtn" style="min-width:150px;display:flex;align-items:center;justify-content:center;gap:8px;">
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  `}function _t(t,i={}){const{formId:e="accSettingsForm",onSaved:n=null,modalBg:s=null}=i,o=t||document;o.querySelectorAll(".pass-toggle-btn").forEach(w=>{w.onclick=()=>{const y=w.dataset.target,c=o.querySelector("#"+y)||document.getElementById(y);if(c){const v=c.type==="password";c.type=v?"text":"password",w.textContent=v?"🙈":"👁️",w.style.opacity=v?"1":"0.65"}}});const a=o.querySelector("#"+e+"-saveBtn")||document.getElementById(e+"-saveBtn"),l=o.querySelector("#"+e+"-alert")||document.getElementById(e+"-alert");function f(w,y=!0){l&&(l.style.display="block",l.style.background=y?"rgba(239,68,68,0.12)":"rgba(34,197,94,0.12)",l.style.border=y?"1px solid rgba(239,68,68,0.3)":"1px solid rgba(34,197,94,0.3)",l.style.color=y?"#ef4444":"#22c55e",l.innerHTML=(y?"⚠️ ":"✓ ")+h(w))}function u(){l&&(l.style.display="none")}a&&(a.onclick=async()=>{u();const w=o.querySelector("#"+e+"-name")||document.getElementById(e+"-name"),y=o.querySelector("#"+e+"-email")||document.getElementById(e+"-email"),c=o.querySelector("#"+e+"-currentPass")||document.getElementById(e+"-currentPass"),v=o.querySelector("#"+e+"-newPass")||document.getElementById(e+"-newPass"),m=o.querySelector("#"+e+"-confirmPass")||document.getElementById(e+"-confirmPass"),B=((w==null?void 0:w.value)||"").trim(),$=((y==null?void 0:y.value)||"").trim(),x=(c==null?void 0:c.value)||"",S=(v==null?void 0:v.value)||"",d=(m==null?void 0:m.value)||"";if(!B){f("Please enter your full name or username.",!0),w==null||w.focus();return}if(!$||!$.includes("@")){f("Please enter a valid email address.",!0),y==null||y.focus();return}if(S||d){if(!x){f("Please enter your current password to set a new password.",!0),c==null||c.focus();return}if(S.length<6){f("New password must be at least 6 characters long.",!0),v==null||v.focus();return}if(S!==d){f("New passwords do not match. Please re-check.",!0),m==null||m.focus();return}}const b={name:B,email:$};S&&(b.currentPassword=x,b.newPassword=S);const T=a.innerHTML;a.disabled=!0,a.innerHTML="<span>Saving Changes…</span>";try{const I=await O("/auth/profile",b);I&&I.token&&I.user&&Bt(I.token,I.user),document.querySelectorAll(".topbar-user-name, .sidebar-user .name, .tud-name").forEach(g=>{g.textContent=I.user.name}),document.querySelectorAll(".tud-email").forEach(g=>{g.textContent=I.user.email});const p=I.user.name?I.user.name.charAt(0).toUpperCase():"U";document.querySelectorAll(".topbar-user-avatar span, .user-avatar, .tud-avatar").forEach(g=>{g.classList.contains("topbar-online-dot")||(g.textContent=p)}),c&&(c.value=""),v&&(v.value=""),m&&(m.value=""),f("Account credentials updated successfully!",!1),E("Account settings saved! ✓"),typeof n=="function"&&n(I.user),s&&setTimeout(()=>{try{s.remove()}catch{}},900)}catch(I){f(I.message||"Failed to update credentials. Please try again.",!0),E(I.message||"Update failed",!0)}finally{a.disabled=!1,a.innerHTML=T}})}function ot(){const t=`
    <div style="position:relative;padding:12px 6px;">
      <button type="button" id="closeAccSettingsModalBtn" style="position:absolute;top:-4px;right:0;border:none;background:transparent;color:var(--text-3);font-size:20px;cursor:pointer;padding:6px 10px;" aria-label="Close modal">✕</button>
      ${Mt({title:"Account Settings",subtitle:"Manage your personal email, username, and password",showCardWrapper:!1,formId:"modalAccSettingsForm"})}
    </div>
  `,i=Q(t),e=i.querySelector("#closeAccSettingsModalBtn");return e&&(e.onclick=()=>i.remove()),_t(i,{formId:"modalAccSettingsForm",modalBg:i}),i}window.__setTheme=function(t){j(t)};Object.assign(window,{getToken:K,getUser:N,setSession:Bt,clearSession:V,requireAuth:Lt,initTheme:$t,api:P,apiGet:U,apiPost:nt,apiPut:O,apiPatch:Pt,apiDelete:G,fmtINR:rt,fmtHours:qt,escapeHtml:h,fmtDate:Y,flashToast:E,openModal:Q,logout:R,getTheme:M,setTheme:j,initServiceWorker:pt,playNotificationChime:F,triggerPhoneVibration:J,requestNotificationPermission:ut,triggerSystemNotification:W,fmtFileSize:at,getFileCategory:X,isImageAttachment:te,openFilePreviewModal:ft,renderAttachmentChips:it,uploadFilesToServer:dt,renderAttachmentUploader:gt,bindAttachmentUploader:vt,getUploaderAttachments:yt,setUploaderAttachments:Tt,renderRoleSwitcher:le,bindRoleSwitcher:re,renderNotificationBell:It,initNotificationBell:At,openNotificationModal:ct,getNotifIcon:mt,renderAppShell:Vt,bindAppShellEvents:Ft,renderSkeletonCards:Wt,renderEmptyState:Kt,renderKpiCard:Gt,renderBadge:Yt,renderProgressBar:Qt,renderPeriodPicker:Xt,renderSupportTicketSection:ee,bindSupportTicketSection:ae,renderAccountSettingsCard:Mt,bindAccountSettingsCard:_t,openAccountSettingsModal:ot,getArchive:Dt,restoreArchiveItem:zt,purgeArchiveItem:jt,purgeAllArchive:Ut});export{Lt as a,Ft as b,U as c,Y as d,h as e,rt as f,nt as g,E as h,$t as i,G as j,O as k,Mt as l,_t as m,Pt as n,Q as o,N as p,K as q,Vt as r,V as s,Bt as t};
