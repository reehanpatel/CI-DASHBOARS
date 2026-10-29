(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const Tt="/api";function J(){return localStorage.getItem("ci360_token")}function _(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function Mt(t,i){localStorage.setItem("ci360_token",t),localStorage.setItem("ci360_user",JSON.stringify(i))}function R(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function _t(t){const i=J(),e=_();if(!i||!e)return R(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null;const n=e.role==="superadmin"||e.role==="admin",s=e.name&&e.name.toLowerCase().includes("ekta")||e.email&&e.email.toLowerCase().includes("ekta");if(t&&e.role!==t&&!n){if((e.role==="accounts"||s)&&(t==="accounts"||t==="employee"))return e;const o=n?"/admin":e.role==="accounts"||s?"/accounts":e.role==="employee"?"/employee":e.role==="client"?"/client":null;return!o||typeof window<"u"&&window.location.pathname.startsWith(o)?(R(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null):(window.location.href=o,null)}return e}async function L(t,i={}){const e=J(),n=Object.assign({"Content-Type":"application/json"},i.headers||{});e&&(n.Authorization="Bearer "+e);const s=await fetch(Tt+t,Object.assign({},i,{headers:n}));let o=null;try{o=await s.json()}catch{}if(s.status===401)throw t==="/auth/login"||t.includes("/auth/login")?new Error(o&&o.error||"Invalid username/email or password."):(R(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login?expired=1"),new Error(o&&o.error||"Session expired. Please sign in again."));if(!s.ok)throw new Error(o&&o.error||"Server status "+s.status+" — Backend waking up, please retry in 10s.");return i.method&&i.method!=="GET"&&!t.includes("/notifications")&&typeof window<"u"&&typeof window.ci360FetchNotifications=="function"&&setTimeout(()=>{try{window.ci360FetchNotifications()}catch{}},350),o}const q=t=>L(t,{method:"GET"}),rt=(t,i)=>L(t,{method:"POST",body:JSON.stringify(i)}),Q=(t,i)=>L(t,{method:"PUT",body:JSON.stringify(i)}),At=(t,i)=>L(t,{method:"PATCH",body:JSON.stringify(i)}),ct=t=>L(t,{method:"DELETE"});function st(t){return t=Number(t)||0,"₹"+t.toLocaleString("en-IN",{maximumFractionDigits:0})}function Nt(t){return(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function y(t){return t==null?"":String(t).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function W(t){return t?new Date(t).toISOString().slice(0,10):"—"}function M(){return localStorage.getItem("ci360_theme")||"light"}function j(t){localStorage.setItem("ci360_theme",t),document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const o=s.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function xt(){var o;if(typeof document<"u"&&((o=document.body)!=null&&o.classList.contains("login-page")||window.location.pathname.includes("login")||document.querySelector(".login-box"))){document.documentElement.setAttribute("data-theme","dark");return}const t=M();document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(a=>{a.classList.toggle("active",a.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const a=i.querySelector(".tud-icon"),l=i.querySelector(".tud-label");a&&(a.textContent=t==="dark"?"☀️":"🌙"),l&&(l.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const a=s.querySelector("span");a&&(a.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{xt()}catch{}function C(t,i){const e=document.createElement("div");e.className="toast",e.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",e.textContent=(i?"⚠️  ":"✓  ")+t,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>e.remove(),200)},2800)}function et(t){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${t}</div>`,i.onclick=e=>{e.target===i&&i.remove()},document.body.appendChild(i),i}function U(){R(),window.location.href="/login"}let O=null;async function dt(){if("serviceWorker"in navigator)try{O=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",O.scope),typeof Notification<"u"&&Notification.permission==="granted"&&J()&&it(O).catch(()=>{})}catch(t){console.warn("CI360 Service Worker registration notice:",t)}}try{dt()}catch{}let ht=0,yt=0;const D=new Set,bt=new Set;let wt=!1;function Bt(t){try{const i=typeof _=="function"?_():null,e=i&&i._id?String(i._id):"default";return`${t}_${e}`}catch{return`${t}_default`}}function X(){try{const t=Bt("ci360_alerted_ids"),i=localStorage.getItem(t);if(i){const e=JSON.parse(i);Array.isArray(e)&&e.forEach(n=>D.add(String(n)))}}catch{}}function Y(){try{const t=Bt("ci360_alerted_ids"),i=Array.from(D).slice(-2e3);localStorage.setItem(t,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",t=>{t.key&&t.key.includes("ci360_alerted_ids")&&X()});let z=null;function Lt(){if(typeof window>"u")return;const t=()=>{try{const i=window.AudioContext||window.webkitAudioContext;i&&(z||(z=new i),z.state==="suspended"&&z.resume())}catch{}window.removeEventListener("touchstart",t,!0),window.removeEventListener("pointerdown",t,!0),window.removeEventListener("click",t,!0)};window.addEventListener("touchstart",t,!0),window.addEventListener("pointerdown",t,!0),window.addEventListener("click",t,!0)}Lt();function H(){try{const t=Date.now();if(t-ht<2500)return;ht=t;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const e=z||new i;e.state==="suspended"&&e.resume();const n=e.currentTime,s=e.createOscillator(),o=e.createGain();s.type="sine",s.frequency.setValueAtTime(587.33,n),o.gain.setValueAtTime(0,n),o.gain.linearRampToValueAtTime(.25,n+.02),o.gain.exponentialRampToValueAtTime(.001,n+.38),s.connect(o),o.connect(e.destination),s.start(n),s.stop(n+.38);const a=e.createOscillator(),l=e.createGain();a.type="sine",a.frequency.setValueAtTime(880,n+.12),l.gain.setValueAtTime(0,n+.12),l.gain.linearRampToValueAtTime(.28,n+.14),l.gain.exponentialRampToValueAtTime(.001,n+.6),a.connect(l),l.connect(e.destination),a.start(n+.12),a.stop(n+.6)}catch{}}function V(){try{const t=Date.now();if(t-yt<2500)return;yt=t,"vibrate"in navigator&&navigator.vibrate([200,100,200,100,200])}catch{}}function $t(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function St(){try{if($t()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function ut(){if(!("Notification"in window))return C("Your device browser does not support Web Notifications.",!0),!1;try{const t=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return t==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),await it(),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),C("Notifications successfully enabled on this device!"),H(),V(),await F({title:"CI360 Alerts Active 🔔",message:"Instant notifications are now live on this device for jobs, tasks, and overdue invoices!",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),C("Notification permission was not granted.",!0),!1)}catch(t){console.error("Notification permission request error:",t)}return!1}async function F({title:t,message:i,type:e,id:n,url:s}){const o=n?String(n):null;if(X(),o&&D.has(o)||(o&&(D.add(o),Y()),H(),V(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return;localStorage.setItem("ci360_notif_enabled","true")}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",l={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:o?`ci360-notif-${o}`:"ci360-alert-"+Date.now(),renotify:!0,vibrate:[200,100,200,100,200],data:{url:s||(typeof window<"u"?window.location.href:""),type:e||"general"}};try{navigator.serviceWorker&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:t,options:l})}catch{}try{if("serviceWorker"in navigator){const f=O||await navigator.serviceWorker.getRegistration();if(f&&f.showNotification){await f.showNotification(t,l);return}}}catch{}try{const f=new Notification(t,l);f.onclick=()=>{window.focus(),f.close()};return}catch{}}function Dt(t){const i="=".repeat((4-t.length%4)%4),e=(t+i).replace(/-/g,"+").replace(/_/g,"/"),n=window.atob(e),s=new Uint8Array(n.length);for(let o=0;o<n.length;++o)s[o]=n.charCodeAt(o);return s}async function it(t=null){try{if(typeof window>"u"||!("serviceWorker"in navigator)||!("PushManager"in window)||typeof Notification>"u"||Notification.permission!=="granted"||!J())return null;const e=t||O||await navigator.serviceWorker.ready;if(!e||!e.pushManager)return null;let n=await e.pushManager.getSubscription();if(!n){const s=await q("/notifications/vapid-public-key").catch(()=>null),o=s&&s.publicKey?s.publicKey:"BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q";n=await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Dt(o)})}if(n){const s=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return await L("/notifications/subscribe",{method:"POST",body:JSON.stringify({subscription:n.toJSON?n.toJSON():n,deviceType:s?"mobile":"desktop"})}).catch(()=>{}),n}}catch(i){console.warn("Push subscription registration notice:",i.message)}return null}if(typeof window<"u"&&(window.triggerSystemNotification=F,window.requestNotificationPermission=ut,window.registerPushSubscription=it,"Notification"in window)){const t=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",t,!0),window.removeEventListener("touchstart",t,!0)};window.addEventListener("click",t,!0),window.addEventListener("touchstart",t,!0)}function Pt(){if(typeof document>"u")return null;let t=document.getElementById("ci360FloatingContainer");return t||(t=document.createElement("div"),t.id="ci360FloatingContainer",t.className="ci360-floating-container",document.body.appendChild(t)),t}function ot({id:t,title:i,message:e,type:n,time:s,actionText:o,onAction:a,persistent:l=!1,timeout:f=8e3}){H(),V();const p=Pt();if(!p)return;const $=`ci360-pop-${t||Math.random().toString(36).slice(2,9)}`;if(document.getElementById($))return;let r="🔔",b="info",g="UPDATE",x="View Details",B="";const k=(n||"").toLowerCase(),I=(e||"").toLowerCase();k.includes("invoice_overdue")?(r="🚨",b="critical",g="OVERDUE INVOICE",x="Pay / View Invoice",B="billing"):k.includes("invoice_paid")||k.includes("payment")?(r="💳",b="success",g="PAYMENT CLEARED",x="View Billing",B="billing"):k.includes("invoice")?(r="🧾",b="info",g="NEW INVOICE",x="View Invoice",B="billing"):k.includes("job")&&(I.includes("overdue")||k.includes("overdue"))?(r="⚠️",b="critical",g="OVERDUE JOB",x="View Job",B="jobs"):k.includes("job")&&I.includes("due today")?(r="⏳",b="warning",g="JOB DUE TODAY",x="View Job",B="jobs"):k.includes("job_created")?(r="📋",b="info",g="NEW JOB LOGGED",x="View Job",B="jobs"):k.includes("job")||k.includes("status")?(r="🔄",b="info",g="JOB UPDATED",x="View Job",B="jobs"):k.includes("task")&&(I.includes("overdue")||k.includes("overdue"))?(r="⚠️",b="critical",g="OVERDUE TASK",x="Check Tasks",B="dailytasks"):k.includes("task_completed")?(r="✅",b="success",g="TASK COMPLETED",x="View Checklist",B="dailytasks"):k.includes("task")?(r="📝",b="warning",g="DAILY TASK",x="View Tasks",B="dailytasks"):k.includes("ticket")?(r="💬",b="info",g="SUPPORT TICKET",x="View Ticket",B="tickets"):k.includes("target")&&(r="🎉",b="success",g="TARGET REACHED",x="View Targets",B="targets");const c=o||x,h=document.createElement("div");h.id=$,h.className=`ci360-popup-card ci360-priority-${b}`,h.innerHTML=`
    <div class="ci360-popup-indicator"></div>
    <div class="ci360-popup-body">
      <div class="ci360-popup-header">
        <div class="ci360-popup-header-left">
          <div class="ci360-popup-icon-badge">${r}</div>
          <span class="ci360-popup-tag ${b}">${g}</span>
          <span class="ci360-popup-time">${s||"Just now"}</span>
        </div>
        <button type="button" class="ci360-popup-close-btn" aria-label="Dismiss">✕</button>
      </div>
      <div class="ci360-popup-title">${y(i||"CI360 Notification")}</div>
      <div class="ci360-popup-message">${y(e||"")}</div>
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
  `,H(),V();const T=()=>{h.style.opacity="0",h.style.transform="translateX(40px) scale(0.95)",setTimeout(()=>h.remove(),220)};h.querySelector(".ci360-popup-close-btn").onclick=m=>{m.stopPropagation(),T()},h.querySelector(".ci360-popup-dismiss-link").onclick=m=>{m.stopPropagation(),T()};const A=()=>{if(typeof a=="function")a();else if(B&&typeof window.ci360NavTab=="function"){const m=typeof _=="function"?_():null;let v=B;m&&m.role==="employee"&&(v==="jobs"||v==="myjobs")&&(v="myjobs"),window.ci360NavTab(v)}if(t)try{L(`/notifications/${t}/read`,{method:"PATCH"})}catch{}T()};for(h.querySelector(".ci360-popup-action-btn").onclick=m=>{m.stopPropagation(),A()},h.style.cursor="pointer",h.onclick=m=>{m.target.closest(".ci360-popup-close-btn")||m.target.closest(".ci360-popup-dismiss-link")||A()};p.children.length>=4;)p.removeChild(p.firstChild);p.appendChild(h),l||setTimeout(()=>{document.body.contains(h)&&T()},b==="critical"?14e3:f)}function kt(t=[]){if(!t||!t.length)return;const i=sessionStorage.getItem("ci360_client_overdue_dismissed");if(i&&Date.now()-Number(i)<45*60*1e3)return;const e=t.reduce((l,f)=>l+(Number(f.pendingAmount||f.totalAmount)||0),0),n=`
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
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${st(e)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${t.length} Overdue Invoice${t.length>1?"s":""}</span>
      </div>

      <div class="ci360-overdue-list">
        ${t.map(l=>{const f=l.dueDate?new Date(l.dueDate):new Date,p=Math.max(1,Math.floor((Date.now()-f.getTime())/(1e3*60*60*24)));return`
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${y(l.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${W(l.dueDate)} <span style="color:var(--red-600);font-weight:700">(${p}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${st(l.pendingAmount||l.totalAmount||0)}</div>
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
  `,s=et(n),o=s.querySelector("#ci360OverduePayBtn"),a=s.querySelector("#ci360OverdueRemindBtn");o&&(o.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove(),typeof window.ci360NavTab=="function"&&window.ci360NavTab("billing")}),a&&(a.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove()})}function Ct(){return`
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

        ${!St()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
    </div>`}function pt(t){return t?t.startsWith("task_completed")?"🎉":t.startsWith("task_due")?"⚡":t.startsWith("task")?"✅":t.startsWith("target_completed")?"🎉":t.startsWith("target")?"🎯":t.startsWith("job_due")?"⏳":t.startsWith("job")?"📋":t.startsWith("ticket")?"🎫":t.startsWith("status")?"🔄":t.startsWith("test")?"🧪":"🔔":"🔔"}function Z(t){if(!t)return"";const i=new Date(t),n=Math.floor((new Date-i)/1e3);if(n<60)return"Just now";const s=Math.floor(n/60);if(s<60)return`${s}m ago`;const o=Math.floor(s/60);if(o<24)return`${o}h ago`;const a=Math.floor(o/24);return a===1?"Yesterday":a<7?`${a}d ago`:W(t)}function at(t){if(!t)return;const i=pt(t.type),e=(t.type||"").toLowerCase(),n=t.title||"Notification",s=t.message||"",o=t.createdAt?W(t.createdAt)+" at "+new Date(t.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"Recently",a=Z(t.createdAt),l=typeof _=="function"?_():null,f=l&&l.role==="employee";let p="Update",$="blue",w="",r="";const b=t.jobId||t.taskId||t.ticketId||t.targetId||null;e.includes("job")?(p="Job Deliverable",$="blue",r=f?"myjobs":"jobs",w=f?"Open in My Jobs 📋":"View Job 📁"):e.includes("task")?(p="Daily Task",$="green",r="dailytasks",w="Open Daily Tasks ✅"):e.includes("ticket")?(p="Support Ticket",$="brand",r="tickets",w="Open Support Tickets 🎫"):e.includes("target")?(p="Target Goal",$="gold",r="targets",w="View My Targets 🎯"):(e.includes("invoice")||e.includes("billing"))&&(p="Billing & Invoice",$="purple",r="billing",w="Open Billing 💳");const g=Array.isArray(t.attachments)&&t.attachments.length>0,x=et(`
    <div class="notif-detail-modal" style="padding:4px 0">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border-xs)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:12px;background:var(--bg-elevated);border:1px solid var(--border-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:var(--shadow-xs)">
            ${i}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap">
              <span class="badge ${$}" style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${p}</span>
              <span style="font-size:11.5px;color:var(--text-4)">${a}</span>
            </div>
            <div style="font-size:11px;color:var(--text-4)">${o}</div>
          </div>
        </div>
        <button type="button" class="btn ghost small notif-modal-close-btn" aria-label="Close" style="padding:4px 8px;font-size:16px;line-height:1;border-radius:6px;color:var(--text-3)">✕</button>
      </div>

      <h3 style="font-size:16.5px;font-weight:800;color:var(--text-1);margin:0 0 12px 0;line-height:1.35;letter-spacing:-0.3px">
        ${y(n)}
      </h3>

      <div style="background:var(--bg-elevated);border:1px solid var(--border-xs);border-radius:var(--r-md);padding:14px 16px;margin-bottom:16px;font-size:13.5px;color:var(--text-2);line-height:1.6;white-space:pre-wrap;word-break:break-word">
        ${y(s)}
      </div>

      ${g?`
        <div style="margin-bottom:16px">
          <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Attachments (${t.attachments.length})</div>
          ${tt(t.attachments,{title:"Attachments"})}
        </div>
      `:""}

      <div class="modal-actions" style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border-xs);display:flex;justify-content:flex-end;align-items:center;gap:10px;flex-wrap:wrap">
        <button type="button" class="btn secondary notif-modal-dismiss-btn" style="font-weight:600">Close</button>
        ${r?`
          <button type="button" class="btn primary notif-modal-go-btn" style="font-weight:700;display:inline-flex;align-items:center;gap:6px">
            <span>${w}</span>
          </button>
        `:""}
      </div>
    </div>
  `),B=()=>x.remove(),k=x.querySelector(".notif-modal-close-btn"),I=x.querySelector(".notif-modal-dismiss-btn"),c=x.querySelector(".notif-modal-go-btn");k&&(k.onclick=B),I&&(I.onclick=B),c&&(c.onclick=()=>{B(),typeof window.ci360NavTab=="function"&&window.ci360NavTab(r,b)})}function It(){const t=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),e=document.getElementById("notifBadge"),n=document.getElementById("notifList"),s=document.getElementById("clearNotifBtn"),o=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),l=document.getElementById("notifDismissBannerBtn"),f=document.getElementById("notifPermissionBanner"),p=document.getElementById("notifUnreadBadge");if(!t||!i)return;dt();function $(){const m=document.getElementById("notifPermissionBanner");m&&(m.classList.add("hidden"),m.style.setProperty("display","none","important"),m.remove())}function w(){if(St()){$();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?$():Notification.permission==="default"&&f&&f.style.setProperty("display","flex","important"))}w(),l&&(l.onclick=m=>{m.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),$()}),a&&(a.onclick=async m=>{m.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),$(),await ut(),$()}),$t()&&it(),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),X();let r=[],b="all";function g(){if(!n)return;let m=r;if(b==="task"?m=r.filter(v=>(v.type||"").includes("task")):b==="target"?m=r.filter(v=>(v.type||"").includes("target")):b==="job"?m=r.filter(v=>(v.type||"").includes("job")):b==="ticket"&&(m=r.filter(v=>(v.type||"").includes("ticket"))),m.length===0){n.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${b==="all"?"":b+" "}notifications</div>`;return}n.innerHTML=m.map(v=>{const E=pt(v.type);return`
        <div class="notif-item ${v.read?"":"unread"}" data-id="${v._id}" data-type="${y(v.type||"")}">
          <div class="notif-icon">${E}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${y(v.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${Z(v.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${y(v.message)}</div>
          </div>
          <div style="color:var(--text-4);font-size:16px;line-height:1;margin-top:2px;flex-shrink:0">›</div>
        </div>`}).join(""),n.querySelectorAll(".notif-item").forEach(v=>{v.onclick=async()=>{const E=v.dataset.id,d=r.find(u=>String(u._id)===String(E));if(E&&v.classList.contains("unread")){v.classList.remove("unread");try{await L(`/notifications/${E}/read`,{method:"PATCH"})}catch{}const u=r.filter(S=>!S.read&&String(S._id)!==String(E)).length;e&&(e.style.display=u>0?"flex":"none",e.textContent=u>99?"99+":u),p&&(p.textContent=u>0?`${u} new`:"",p.style.display=u>0?"inline-block":"none")}if(h(),d)at(d);else{const u=v.dataset.type,S=typeof _=="function"?_():null,G=S&&S.role==="employee";u&&u.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):u&&u.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab(G?"myjobs":"jobs"):u&&u.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):u&&u.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}}})}let x={jobs:0,tasks:0,invoices:0,tickets:0},B=!1;async function k(m=!1){try{const v=await q("/notifications");r=v.notifications||[];const E=v.unreadCount||0;if(e&&(e.textContent=E>99?"99+":E,e.style.display=E>0?"flex":"none"),p&&(p.textContent=E>0?`${E} new`:"",p.style.display=E>0?"inline-block":"none"),X(),v.overdue&&v.overdue.invoices&&v.overdue.invoices.length>0){const d=typeof _=="function"?_():null;d&&d.role==="client"&&kt(v.overdue.invoices)}if(v.syncTimestamps){const d=v.syncTimestamps;if(!B)x={...d},B=!0;else{const u=[];d.jobs>(x.jobs||0)&&u.push("jobs"),d.tasks>(x.tasks||0)&&u.push("tasks"),d.invoices>(x.invoices||0)&&u.push("invoices"),d.tickets>(x.tickets||0)&&u.push("tickets"),u.length>0&&(x={...d},window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{changedKeys:u,syncTimestamps:d,overdue:v.overdue}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({changedKeys:u,syncTimestamps:d}))}}if(wt){const d=r.filter(u=>!u.read&&!D.has(String(u._id)));if(d.length>0){for(const u of d){const S=String(u._id);bt.add(S),ot({id:S,title:u.title||"CI360 Alert",message:u.message||"",type:u.type}),await F({title:u.title||"CI360 Alert",message:u.message||"",type:u.type,id:S})}Y(),window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{newNotifications:d}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({newNotifications:d})}}else{const d=r.filter(u=>!u.read&&!D.has(String(u._id)));if(r.forEach(u=>bt.add(String(u._id))),d.length>0){const u=d.slice(0,3);for(const S of u){const G=String(S._id);ot({id:G,title:S.title||"CI360 Alert",message:S.message||"",type:S.type}),await F({title:S.title||"CI360 Alert",message:S.message||"",type:S.type,id:G})}d.forEach(S=>D.add(String(S._id))),Y()}else r.forEach(u=>D.add(String(u._id))),Y();wt=!0}g()}catch{n&&r.length===0&&(n.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=k,window.showInAppPopupAlert=ot,window.showClientOverdueInvoiceModal=kt),k(),window.__ci360PollInterval=setInterval(k,6e3),window.addEventListener("focus",()=>k(!0)),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(m=>{m.onclick=v=>{v.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(E=>E.classList.remove("active")),m.classList.add("active"),b=m.dataset.filter,g()}});const I=document.getElementById("notifBackdrop");function c(){i.style.display="flex",i.classList.add("open"),I&&(I.style.display="block",I.classList.add("open")),t.setAttribute("aria-expanded","true"),w();const m=document.getElementById("topbarUserDropdown");m&&(m.style.display="none"),k()}function h(){i.style.display="none",i.classList.remove("open"),I&&(I.style.display="none",I.classList.remove("open")),t.setAttribute("aria-expanded","false")}function T(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?h():c()}window.ci360CloseNotifications=h;const A=document.getElementById("notifCloseBtn");A&&(A.onclick=m=>{m.stopPropagation(),h()}),I&&(I.onclick=m=>{m.stopPropagation(),h()}),t.onclick=m=>{m.stopPropagation(),T()},o&&(o.onclick=async m=>{m.stopPropagation();try{await L("/notifications/read",{method:"PATCH"}),e.style.display="none",p&&(p.textContent="",p.style.display="none"),r.forEach(v=>v.read=!0),g(),C("All notifications marked as read")}catch(v){C(v.message,!0)}}),window.__ci360NotifDocClickHandler&&document.removeEventListener("click",window.__ci360NotifDocClickHandler),window.__ci360NotifDocClickHandler=m=>{!i.contains(m.target)&&!t.contains(m.target)&&h()},document.addEventListener("click",window.__ci360NotifDocClickHandler),s&&(s.onclick=async m=>{m.stopPropagation();try{await ct("/notifications"),r=[],n.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',e.style.display="none",p&&(p.textContent="",p.style.display="none"),C("Notifications cleared")}catch(v){C(v.message,!0)}});try{const v=new URLSearchParams(window.location.search).get("notifId");v&&q("/notifications").then(E=>{const u=(E.notifications||[]).find(S=>String(S._id)===String(v));if(u){at(u);const S=window.location.pathname+window.location.hash;window.history.replaceState(null,"",S)}}).catch(()=>{})}catch{}}function jt({user:t,currentRole:i,activeTab:e,tabs:n,title:s,subtitle:o}){const a=t&&t.name?t.name.charAt(0).toUpperCase():"U",l=t&&(t.role==="superadmin"||t.role==="admin")?"Admin":t&&t.role==="accounts"?"Accounts":t&&t.role==="employee"?"Employee":t&&t.role==="client"?"Client":t&&t.role?t.role.toUpperCase():"User",f=t&&t.name?t.name:"User",p=t&&t.email?t.email:t&&t.username?t.username:"",$=n&&n.some(g=>g.key==="logjob"),w=n&&n.find(g=>g.key===e),r=s||w&&w.label||"Dashboard";let b=[];return i==="accounts"?b=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:e==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:e==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:e==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(e),isMore:!0}]:i==="superadmin"?b=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="dashboard"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(e),isMore:!0}]:i==="employee"?b=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:e==="myjobs"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"proposals",label:"Proposals",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',active:e==="proposals"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:e==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","proposals","targets"].includes(e),isMore:!0}]:b=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:e==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:e==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(e),isMore:!0}],`
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
          ${n.map(g=>`
            <button type="button" class="sidebar-item ${e===g.key?"active":""}" data-tab="${g.key}" aria-current="${e===g.key?"page":"false"}">
              <span class="icon">${g.icon||"📌"}</span>
              <span>${g.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${y(t?t.name:"User")}</div>
            <div class="role">${y(l)}</div>
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
              <h1 class="page-heading-title">${y(r)}</h1>
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

            ${$?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${M()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${M()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
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
                  <span class="topbar-user-name">${y(f)}</span>
                  <span class="topbar-user-role-badge">${y(l)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${a}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${y(f)}</div>
                      ${p?`<div class="tud-email">${y(p)}</div>`:""}
                      <span class="tud-role-chip">${y(l)}</span>
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
          ${b.map(g=>`
            <button type="button" class="mbn-item ${g.active?"active":""}" data-tab="${g.key}" ${g.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${g.iconSvg}</span>
              <span class="mbn-label">${y(g.label)}</span>
              ${g.active?'<span class="mbn-active-dot"></span>':""}
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
              ${n.map(g=>`
                <button type="button" class="mms-card ${e===g.key?"active":""}" data-tab="${g.key}">
                  <span class="mms-card-icon">${g.icon||"📌"}</span>
                  <span class="mms-card-label">${y(g.label)}</span>
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
    </div>`}function zt(t){const i=document.getElementById("mobileNavToggle"),e=document.getElementById("appSidebar"),n=document.getElementById("sidebarOverlay");function s(){e&&e.classList.add("open"),n&&n.classList.add("open")}function o(){e&&e.classList.remove("open"),n&&n.classList.remove("open")}i&&(i.onclick=s),n&&(n.onclick=o);const a=document.getElementById("mobileMoreBackdrop"),l=document.getElementById("mobileMoreSheet"),f=document.getElementById("mmsCloseBtn"),p=document.getElementById("mobileMoreBtn");function $(){a&&a.classList.add("active"),l&&l.classList.add("active")}function w(){a&&a.classList.remove("active"),l&&l.classList.remove("active")}p&&(p.onclick=d=>{d.stopPropagation(),$()}),f&&(f.onclick=w),a&&(a.onclick=d=>{d.target===a&&w()}),document.querySelectorAll(".mbn-item").forEach(d=>{d.dataset.tab&&d.dataset.tab!=="__more__"&&(d.onclick=()=>{w(),t&&t(d.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(d=>{d.onclick=()=>{w(),t&&t(d.dataset.tab)}});const r=document.getElementById("mmsToggleThemeBtn");r&&(r.onclick=()=>{j(M()==="dark"?"light":"dark")});const b=document.getElementById("mmsNotifsBtn");b&&(b.onclick=()=>{w();const d=document.getElementById("notifBellBtn");d&&d.click()});const g=document.getElementById("mmsLogoutBtn");g&&(g.onclick=U);const x=document.getElementById("mobileCalBtn");x&&(x.onclick=()=>{const d=document.querySelector(".period-row");d&&(d.scrollIntoView({behavior:"smooth",block:"center"}),d.classList.add("pulse-highlight"),setTimeout(()=>d.classList.remove("pulse-highlight"),1200))});const B=document.getElementById("tudMobileThemeBtn");B&&(B.onclick=d=>{d.stopPropagation(),j(M()==="dark"?"light":"dark")});const k=document.getElementById("tudMobileNotifsBtn");k&&(k.onclick=d=>{d.stopPropagation();const u=document.getElementById("topbarUserDropdown");u&&(u.style.display="none");const S=document.getElementById("notifBellBtn");S&&S.click()});const I=document.getElementById("tudMobileSettingsBtn");I&&(I.onclick=d=>{d.stopPropagation();const u=document.getElementById("topbarUserDropdown");u&&(u.style.display="none"),document.querySelector('[data-tab="manage"]')&&t?t("manage"):$()});const c=document.getElementById("tudMobileHelpBtn");c&&(c.onclick=d=>{d.stopPropagation();const u=document.getElementById("topbarUserDropdown");u&&(u.style.display="none"),et(`
        <div style="padding:24px;text-align:center;">
          <div style="font-size:36px;margin-bottom:12px;">💬</div>
          <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
          <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
            For immediate technical assistance, client onboarding, or workspace inquiries, reach out to your system administrator or support team.
          </p>
          <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
        </div>
      `)});const h=document.getElementById("logoutBtnMobile");h&&(h.onclick=U);const T=document.getElementById("topbarUserBtn"),A=document.getElementById("topbarUserDropdown");T&&A&&(T.onclick=d=>{d.stopPropagation();const u=A.style.display!=="none";A.style.display=u?"none":"block",T.setAttribute("aria-expanded",String(!u)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",d=>{!A.contains(d.target)&&!T.contains(d.target)&&(A.style.display="none",T.setAttribute("aria-expanded","false"))}));const m=document.getElementById("tudThemeToggleBtn");m&&(m.onclick=()=>{j(M()==="dark"?"light":"dark")});const v=document.getElementById("topbarQuickLogJobBtn");v&&(v.onclick=()=>{t&&t("logjob")});const E=document.getElementById("logoutBtn");E&&(E.onclick=U),It(),document.querySelectorAll(".sidebar-item").forEach(d=>{d.onclick=()=>{o(),t&&t(d.dataset.tab)}}),Ut(t)}function Ut(t){const i=document.getElementById("cmdPaletteBackdrop"),e=document.getElementById("cmdSearchInput"),n=document.getElementById("cmdResultsList"),s=document.getElementById("topbarCmdTrigger"),o=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),l=document.getElementById("cmdCloseKbd");if(!i||!e||!n)return;const f=Array.from(document.querySelectorAll(".sidebar-item")),p=f.map(c=>{var h,T;return{type:"tab",id:c.dataset.tab,label:((h=c.querySelector("span:last-child"))==null?void 0:h.textContent)||c.dataset.tab,icon:((T=c.querySelector(".icon"))==null?void 0:T.textContent)||"📌",sub:"Navigate to section",action:()=>{t&&t(c.dataset.tab)}}});f.some(c=>c.dataset.tab==="logjob")&&p.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{t&&t("logjob")}}),p.push({type:"action",id:"toggle-theme",label:M()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{j(M()==="dark"?"light":"dark")}}),p.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const c=document.getElementById("notifBellBtn");c&&c.click()}}),p.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>U()});let w=0,r=[...p];function b(){if(!r.length){n.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}n.innerHTML=r.map((c,h)=>`
      <div class="cmd-result ${h===w?"selected":""}" data-idx="${h}">
        <div class="cmd-result-icon">${c.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${y(c.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${y(c.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),n.querySelectorAll(".cmd-result").forEach(c=>{c.onmouseenter=()=>{w=Number(c.dataset.idx),g()},c.onclick=()=>{x(Number(c.dataset.idx))}})}function g(){n.querySelectorAll(".cmd-result").forEach((c,h)=>{c.classList.toggle("selected",h===w)})}function x(c){const h=r[c];h&&h.action&&(k(),h.action())}function B(){const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),i.classList.add("open"),e.value="",r=[...p],w=0,b(),setTimeout(()=>e.focus(),50)}function k(){i.classList.remove("open"),e.blur()}s&&(s.onclick=B),o&&(o.onclick=B),a&&(a.onclick=()=>{const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),B()}),l&&(l.onclick=k),i.onclick=c=>{c.target===i&&k()},e.oninput=()=>{const c=e.value.trim().toLowerCase();c?r=p.filter(h=>h.label.toLowerCase().includes(c)||h.sub.toLowerCase().includes(c)):r=[...p],w=0,b()},e.onkeydown=c=>{if(c.key==="ArrowDown"){if(c.preventDefault(),r.length>0){w=(w+1)%r.length,g();const h=n.querySelector(".cmd-result.selected");h&&h.scrollIntoView({block:"nearest"})}}else if(c.key==="ArrowUp"){if(c.preventDefault(),r.length>0){w=(w-1+r.length)%r.length,g();const h=n.querySelector(".cmd-result.selected");h&&h.scrollIntoView({block:"nearest"})}}else c.key==="Enter"?(c.preventDefault(),x(w)):c.key==="Escape"&&(c.preventDefault(),k())};const I=c=>{(c.metaKey||c.ctrlKey)&&c.key.toLowerCase()==="k"?(c.preventDefault(),i.classList.contains("open")?k():B()):c.key==="Escape"&&i.classList.contains("open")&&k()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=I,window.addEventListener("keydown",I)}function Ot(t=4){return`
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
      <h3>${y(t)}</h3>
      <p>${y(i)}</p>
      ${n}
    </div>`}function qt(t,i,e="",n="📊",s=""){let o="";return s&&(o=`<span class="kpi-trend ${s.startsWith("+")||s.includes("↑")||s.toLowerCase().includes("up")?"up":"down"}">${y(s)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${y(t)}</span>
        <div class="kpi-icon">${n}</div>
      </div>
      <div class="kpi-value">${y(i)}</div>
      <div class="kpi-sub">${o}<span>${y(e)}</span></div>
    </div>`}function Ht(t,i="gray"){return`<span class="badge ${i}">${y(t)}</span>`}function Vt(t,i="indigo"){const e=Math.min(100,Math.max(0,Number(t)||0));return`
    <div class="progress-bar-wrap" title="${e.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${e}%"></div>
    </div>`}function Ft(t){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([e,n])=>`<button class="pchip ${t===e?"active":""}" data-period="${e}">${n}</button>`).join("")}</div>`}function Jt(t){if(!t)return"U";const i=t.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function nt(t){if(t=Number(t)||0,t===0)return"0 B";const i=1024,e=["B","KB","MB","GB"],n=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,n)).toFixed(1))+" "+e[n]}function K(t="",i=""){const e=(t.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(e)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:e==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(e)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(e)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(e)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(e)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(e)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function Wt(t){return t?K(t.name||t.filename||"",t.type||"").cls==="img":!1}function mt(t){if(!t||!t.url)return;const i=K(t.name,t.type),e=i.cls==="img",n=i.cls==="pdf",s=y(t.name||"Attachment"),o=nt(t.size),a=document.createElement("div");a.className="preview-modal-overlay",a.innerHTML=`
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
  `,a.onclick=l=>{(l.target===a||l.target.closest(".preview-modal-close"))&&a.remove()},document.body.appendChild(a)}function tt(t=[],i={}){if(!t||!t.length)return"";const e=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${y(i.title)} <span style="font-weight:500;color:var(--text-4)">(${t.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${t.map((n,s)=>{const o=K(n.name,n.type),a=y(n.name||"File"),l=nt(n.size);return`
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
  `}const N={};async function lt(t){const i=Array.from(t||[]);if(!i.length)return[];const n=(await Promise.all(i.map(async s=>new Promise(o=>{const a=new FileReader;a.onload=()=>{o({name:s.name,type:s.type,size:s.size,base64:a.result,data:a.result})},a.onerror=()=>o(null),a.readAsDataURL(s)})))).filter(Boolean);if(!n.length)return[];try{const s=await rt("/upload",{files:n});if(s&&s.files&&s.files.length)return s.files}catch(s){console.warn("Backend upload failed, fallback to base64 data URLs:",s)}return n.map(s=>({name:s.name,url:s.base64,size:s.size,type:s.type,uploadedAt:new Date}))}function ft({id:t="uploader",label:i="Attachments & Files",subtitle:e="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:n=!0,accept:s="*/*",maxFiles:o=10}={}){return`
    <div class="uploader-container" id="container-${t}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${y(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${t}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${t}">
        <input type="file" id="input-${t}" ${n?"multiple":""} accept="${s}" style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${y(e)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${t}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${t}"></div>
    </div>
  `}function gt(t,i={}){const e=document.getElementById("zone-"+t),n=document.getElementById("input-"+t),s=document.getElementById("list-"+t),o=document.getElementById("count-"+t);N[t]=i.existing?[...i.existing]:[];function a(){const l=N[t]||[];if(o&&(o.textContent=`${l.length} file${l.length===1?"":"s"} attached`),!!s){if(!l.length){s.innerHTML="";return}s.innerHTML=l.map((f,p)=>{const $=K(f.name,f.type),w=y(f.name||"File"),r=nt(f.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${$.cls}">${$.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${w}">${w}</div>
              <div class="uploader-file-size">${$.label} · ${r}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${t}', ${p})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${t}', ${p})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(l)}}window.__removeUploaderFile=(l,f)=>{if(N[l]){N[l].splice(f,1);const p=window[`__update_${l}`];p&&p()}},window.__previewUploaderFile=(l,f)=>{const p=(N[l]||[])[f];p&&mt(p)},window[`__update_${t}`]=a,e&&n&&(e.onclick=l=>{l.target.tagName!=="BUTTON"&&!l.target.closest("button")&&n.click()},e.ondragover=l=>{l.preventDefault(),e.classList.add("dragover")},e.ondragleave=()=>e.classList.remove("dragover"),e.ondrop=async l=>{if(l.preventDefault(),e.classList.remove("dragover"),l.dataTransfer&&l.dataTransfer.files&&l.dataTransfer.files.length){C("Uploading files… ⏳");const f=await lt(l.dataTransfer.files);N[t]=[...N[t]||[],...f],a(),C("Files attached! ✓")}},n.onchange=async()=>{if(n.files&&n.files.length){C("Uploading files… ⏳");const l=await lt(n.files);N[t]=[...N[t]||[],...l],a(),C("Files attached! ✓"),n.value=""}}),a()}function vt(t){return N[t]||[]}function Et(t,i=[]){N[t]=[...i];const e=window[`__update_${t}`];e&&e()}window.__openPreview=(t,i)=>{const e=i.closest(".attachment-chips-wrap");if(!e)return;const n=i.closest(".attachment-chip");if(!n)return;const s=Number(n.dataset.idx),o=e.dataset.attachments;if(o)try{const a=JSON.parse(decodeURIComponent(o));a[s]&&mt(a[s])}catch{}};function Kt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");return`
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
        ${ft({id:"tkup-"+e,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const Gt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},Qt={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function Yt(t,i){const e=(t.status||"Open").toLowerCase().replace(" ","-"),n=t.status==="Open",s=(t._id||"").slice(-4).toUpperCase(),o=Jt(t.userName),a=encodeURIComponent(JSON.stringify(t.attachments||[])),l=encodeURIComponent(JSON.stringify(t.adminAttachments||[]));return`
    <div class="ticket-card status-${e}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${s}</span>
            <span class="ticket-subject">${y(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${Gt[t.status]||"gray"}">
            ${n?'<span class="pulse-dot"></span>':""} ${y(t.status)}
          </span>
          <span class="badge ${Qt[t.priority]||"gray"}">${y(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${o}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${y(t.userName)}
            <span class="ticket-role-pill">${y(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${Z(t.createdAt)} · ${W(t.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${y(t.message)}</div>

      ${t.attachments&&t.attachments.length?`
        <div data-attachments="${a}">
          ${tt(t.attachments,{title:"Ticket Attachments"})}
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
              ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${Z(t.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${y(t.adminReply)}</div>
            ${t.adminAttachments&&t.adminAttachments.length?`
              <div data-attachments="${l}">
                ${tt(t.adminAttachments,{title:"Support Attached Files"})}
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
            <textarea id="tkreplytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${y(t.adminReply||"")}</textarea>
            ${ft({id:"tkreplyup-"+t._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function P(t,i,e){const n=document.getElementById("tklist-"+i),s=document.getElementById("tkcnt-"+i);if(n)try{const o=await q("/tickets/job/"+t);s&&(s.textContent=o.length),o.length?(n.innerHTML=o.map(a=>Yt(a,e)).join(""),Xt(t,i,e,n,o)):n.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{n.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function Xt(t,i,e,n,s){e&&(n.querySelectorAll(".tk-status-sel").forEach(o=>{o.onchange=async()=>{try{await Q("/tickets/"+o.dataset.tkid,{status:o.value}),C("Status updated"),P(t,i,e)}catch(a){C(a.message,!0)}}}),n.querySelectorAll(".tk-quick-resolve-btn").forEach(o=>{o.onclick=async()=>{try{await Q("/tickets/"+o.dataset.tkid,{status:"Resolved"}),C("Ticket marked as Resolved! 🎉"),P(t,i,e)}catch(a){C(a.message,!0)}}}),n.querySelectorAll(".ticket-template-btn").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplytxt-"+o.dataset.tkid);a&&(a.value=o.dataset.tpl,a.focus())}}),n.querySelectorAll(".tk-reply-toggle").forEach(o=>{o.onclick=()=>{const a=o.dataset.tkid,l=document.getElementById("tkreplyform-"+a);if(l){l.classList.toggle("show");const f=s.find(p=>p._id===a);gt("tkreplyup-"+a,{existing:f?f.adminAttachments:[]})}}}),n.querySelectorAll(".tk-reply-cancel").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplyform-"+o.dataset.tkid);a&&a.classList.remove("show")}}),n.querySelectorAll(".tk-reply-save").forEach(o=>{o.onclick=async()=>{const a=o.dataset.tkid,l=document.getElementById("tkreplytxt-"+a);if(!l)return;const f=vt("tkreplyup-"+a);try{await Q("/tickets/"+a,{adminReply:l.value.trim(),adminAttachments:f}),C("Response saved! 🛡️"),P(t,i,e)}catch(p){C(p.message,!0)}}}),n.querySelectorAll(".tk-del-btn").forEach(o=>{o.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await ct("/tickets/"+o.dataset.tkid),C("Ticket deleted"),P(t,i,e)}catch(a){C(a.message,!0)}}}))}function Zt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");P(t,e,i),gt("tkup-"+e);const n=document.querySelector(`[data-jobid="${t}"].ticket-toggle-btn`);n&&(n.onclick=()=>{const a=document.getElementById("tkform-"+e);if(!a)return;const l=a.style.display==="block";a.style.display=l?"none":"block",n.textContent=l?"+ Raise Ticket":"✕ Cancel"});const s=document.querySelector(`.tk-cancel-btn[data-safeid="${e}"]`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+e);a&&(a.style.display="none"),n&&(n.textContent="+ Raise Ticket")});const o=document.querySelector(`.tk-submit-btn[data-safeid="${e}"]`);o&&(o.onclick=async()=>{var $,w;const a=($=(document.getElementById("tksub-"+e)||{}).value)==null?void 0:$.trim(),l=(w=(document.getElementById("tkmsg-"+e)||{}).value)==null?void 0:w.trim(),f=(document.getElementById("tkpri-"+e)||{}).value,p=vt("tkup-"+e);if(!a){C("Please enter a subject",!0);return}if(!l){C("Please enter a message",!0);return}o.disabled=!0,o.textContent="Submitting…";try{await rt("/tickets",{jobId:t,subject:a,message:l,priority:f,attachments:p}),C("Ticket submitted! 🎫");const r=document.getElementById("tkform-"+e);r&&(r.style.display="none"),n&&(n.textContent="+ Raise Ticket");const b=document.getElementById("tksub-"+e),g=document.getElementById("tkmsg-"+e);b&&(b.value=""),g&&(g.value=""),Et("tkup-"+e,[]),P(t,e,i)}catch(r){C(r.message,!0)}finally{o.disabled=!1,o.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function te(){return""}function ee(){}window.__setTheme=function(t){j(t)};Object.assign(window,{getToken:J,getUser:_,setSession:Mt,clearSession:R,requireAuth:_t,initTheme:xt,api:L,apiGet:q,apiPost:rt,apiPut:Q,apiPatch:At,apiDelete:ct,fmtINR:st,fmtHours:Nt,escapeHtml:y,fmtDate:W,flashToast:C,openModal:et,logout:U,getTheme:M,setTheme:j,initServiceWorker:dt,playNotificationChime:H,triggerPhoneVibration:V,requestNotificationPermission:ut,triggerSystemNotification:F,fmtFileSize:nt,getFileCategory:K,isImageAttachment:Wt,openFilePreviewModal:mt,renderAttachmentChips:tt,uploadFilesToServer:lt,renderAttachmentUploader:ft,bindAttachmentUploader:gt,getUploaderAttachments:vt,setUploaderAttachments:Et,renderRoleSwitcher:te,bindRoleSwitcher:ee,renderNotificationBell:Ct,initNotificationBell:It,openNotificationModal:at,getNotifIcon:pt,renderAppShell:jt,bindAppShellEvents:zt,renderSkeletonCards:Ot,renderEmptyState:Rt,renderKpiCard:qt,renderBadge:Ht,renderProgressBar:Vt,renderPeriodPicker:Ft,renderSupportTicketSection:Kt,bindSupportTicketSection:Zt});export{_t as a,zt as b,q as c,W as d,y as e,st as f,rt as g,C as h,xt as i,ct as j,Q as k,_ as l,J as m,R as n,et as o,jt as r,Mt as s};
