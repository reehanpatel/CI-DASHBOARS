(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const Me="/api";function se(){return localStorage.getItem("ci360_token")}function z(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function Te(e,i){localStorage.setItem("ci360_token",e),localStorage.setItem("ci360_user",JSON.stringify(i))}function ae(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function _e(e){const i=se(),t=z();if(!i||!t)return window.location.href="/login",null;const n=t.name&&t.name.toLowerCase().includes("ekta")||t.email&&t.email.toLowerCase().includes("ekta");return e&&t.role!==e&&t.role!=="superadmin"?(t.role==="accounts"||n)&&(e==="accounts"||e==="employee")?t:(window.location.href=t.role==="superadmin"?"/admin":t.role==="accounts"||n?"/accounts":t.role==="employee"?"/employee":"/client",null):t}async function N(e,i={}){const t=se(),n=Object.assign({"Content-Type":"application/json"},i.headers||{});t&&(n.Authorization="Bearer "+t);const s=await fetch(Me+e,Object.assign({},i,{headers:n}));if(s.status===401)throw ae(),window.location.href="/login",new Error("Session expired");let o=null;try{o=await s.json()}catch{}if(!s.ok)throw new Error(o&&o.error||"Server status "+s.status+" — Backend waking up, please retry in 10s.");return i.method&&i.method!=="GET"&&!e.includes("/notifications")&&typeof window<"u"&&typeof window.ci360FetchNotifications=="function"&&setTimeout(()=>{try{window.ci360FetchNotifications()}catch{}},350),o}const Z=e=>N(e,{method:"GET"}),le=(e,i)=>N(e,{method:"POST",body:JSON.stringify(i)}),G=(e,i)=>N(e,{method:"PUT",body:JSON.stringify(i)}),Ae=(e,i)=>N(e,{method:"PATCH",body:JSON.stringify(i)}),re=e=>N(e,{method:"DELETE"});function ie(e){return e=Number(e)||0,"₹"+e.toLocaleString("en-IN",{maximumFractionDigits:0})}function Ne(e){return(Number(e)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function g(e){return e==null?"":String(e).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function W(e){return e?new Date(e).toISOString().slice(0,10):"—"}function T(){return localStorage.getItem("ci360_theme")||"light"}function j(e){localStorage.setItem("ci360_theme",e),document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),n&&(n.textContent=e==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const o=s.querySelector("span");o&&(o.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function xe(){const e=T();document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),n&&(n.textContent=e==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const o=s.querySelector("span");o&&(o.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{xe()}catch{}function $(e,i){const t=document.createElement("div");t.className="toast",t.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",t.textContent=(i?"⚠️  ":"✓  ")+e,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(10px)",setTimeout(()=>t.remove(),200)},2800)}function ce(e){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${e}</div>`,i.onclick=t=>{t.target===i&&i.remove()},document.body.appendChild(i),i}function q(){ae(),window.location.href="/login"}let H=null;async function de(){if("serviceWorker"in navigator)try{H=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",H.scope),typeof Notification<"u"&&Notification.permission==="granted"&&X(H).catch(()=>{})}catch(e){console.warn("CI360 Service Worker registration notice:",e)}}try{de()}catch{}let ge=0,he=0;const L=new Set,ye=new Set;let be=!1;function Be(e){try{const i=typeof z=="function"?z():null,t=i&&i._id?String(i._id):"default";return`${e}_${t}`}catch{return`${e}_default`}}function Y(){try{const e=Be("ci360_alerted_ids"),i=localStorage.getItem(e);if(i){const t=JSON.parse(i);Array.isArray(t)&&t.forEach(n=>L.add(String(n)))}}catch{}}function Q(){try{const e=Be("ci360_alerted_ids"),i=Array.from(L).slice(-2e3);localStorage.setItem(e,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",e=>{e.key&&e.key.includes("ci360_alerted_ids")&&Y()});let R=null;function Le(){if(typeof window>"u")return;const e=()=>{try{const i=window.AudioContext||window.webkitAudioContext;i&&(R||(R=new i),R.state==="suspended"&&R.resume())}catch{}window.removeEventListener("touchstart",e,!0),window.removeEventListener("pointerdown",e,!0),window.removeEventListener("click",e,!0)};window.addEventListener("touchstart",e,!0),window.addEventListener("pointerdown",e,!0),window.addEventListener("click",e,!0)}Le();function V(){try{const e=Date.now();if(e-ge<2500)return;ge=e;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=R||new i;t.state==="suspended"&&t.resume();const n=t.currentTime,s=t.createOscillator(),o=t.createGain();s.type="sine",s.frequency.setValueAtTime(587.33,n),o.gain.setValueAtTime(0,n),o.gain.linearRampToValueAtTime(.25,n+.02),o.gain.exponentialRampToValueAtTime(.001,n+.38),s.connect(o),o.connect(t.destination),s.start(n),s.stop(n+.38);const a=t.createOscillator(),l=t.createGain();a.type="sine",a.frequency.setValueAtTime(880,n+.12),l.gain.setValueAtTime(0,n+.12),l.gain.linearRampToValueAtTime(.28,n+.14),l.gain.exponentialRampToValueAtTime(.001,n+.6),a.connect(l),l.connect(t.destination),a.start(n+.12),a.stop(n+.6)}catch{}}function F(){try{const e=Date.now();if(e-he<2500)return;he=e,"vibrate"in navigator&&navigator.vibrate([200,100,200,100,200])}catch{}}function $e(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function Se(){try{if($e()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function ue(){if(!("Notification"in window))return $("Your device browser does not support Web Notifications.",!0),!1;try{const e=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return e==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),await X(),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),$("Notifications successfully enabled on this device!"),V(),F(),await J({title:"CI360 Alerts Active 🔔",message:"Instant notifications are now live on this device for jobs, tasks, and overdue invoices!",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),$("Notification permission was not granted.",!0),!1)}catch(e){console.error("Notification permission request error:",e)}return!1}async function J({title:e,message:i,type:t,id:n,url:s}){const o=n?String(n):null;if(Y(),o&&L.has(o)||(o&&(L.add(o),Q()),V(),F(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return;localStorage.setItem("ci360_notif_enabled","true")}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",l={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:o?`ci360-notif-${o}`:"ci360-alert-"+Date.now(),renotify:!0,vibrate:[200,100,200,100,200],data:{url:s||(typeof window<"u"?window.location.href:""),type:t||"general"}};try{navigator.serviceWorker&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:e,options:l})}catch{}try{if("serviceWorker"in navigator){const p=H||await navigator.serviceWorker.getRegistration();if(p&&p.showNotification){await p.showNotification(e,l);return}}}catch{}try{const p=new Notification(e,l);p.onclick=()=>{window.focus(),p.close()};return}catch{}}function De(e){const i="=".repeat((4-e.length%4)%4),t=(e+i).replace(/-/g,"+").replace(/_/g,"/"),n=window.atob(t),s=new Uint8Array(n.length);for(let o=0;o<n.length;++o)s[o]=n.charCodeAt(o);return s}async function X(e=null){try{if(typeof window>"u"||!("serviceWorker"in navigator)||!("PushManager"in window)||typeof Notification>"u"||Notification.permission!=="granted")return null;const i=e||H||await navigator.serviceWorker.ready;if(!i||!i.pushManager)return null;let t=await i.pushManager.getSubscription();if(!t){const n=await Z("/notifications/vapid-public-key").catch(()=>null),s=n&&n.publicKey?n.publicKey:"BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q";t=await i.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:De(s)})}if(t){const n=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return await N("/notifications/subscribe",{method:"POST",body:JSON.stringify({subscription:t.toJSON?t.toJSON():t,deviceType:n?"mobile":"desktop"})}).catch(()=>{}),t}}catch(i){console.warn("Push subscription registration notice:",i.message)}return null}if(typeof window<"u"&&(window.triggerSystemNotification=J,window.requestNotificationPermission=ue,window.registerPushSubscription=X,"Notification"in window)){const e=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",e,!0),window.removeEventListener("touchstart",e,!0)};window.addEventListener("click",e,!0),window.addEventListener("touchstart",e,!0)}function Pe(){if(typeof document>"u")return null;let e=document.getElementById("ci360FloatingContainer");return e||(e=document.createElement("div"),e.id="ci360FloatingContainer",e.className="ci360-floating-container",document.body.appendChild(e)),e}function te({id:e,title:i,message:t,type:n,time:s,actionText:o,onAction:a,persistent:l=!1,timeout:p=8e3}){V(),F();const m=Pe();if(!m)return;const S=`ci360-pop-${e||Math.random().toString(36).slice(2,9)}`;if(document.getElementById(S))return;let u="🔔",h="info",f="UPDATE",C="View Details",x="";const b=(n||"").toLowerCase(),_=(t||"").toLowerCase();b.includes("invoice_overdue")?(u="🚨",h="critical",f="OVERDUE INVOICE",C="Pay / View Invoice",x="billing"):b.includes("invoice_paid")||b.includes("payment")?(u="💳",h="success",f="PAYMENT CLEARED",C="View Billing",x="billing"):b.includes("invoice")?(u="🧾",h="info",f="NEW INVOICE",C="View Invoice",x="billing"):b.includes("job")&&(_.includes("overdue")||b.includes("overdue"))?(u="⚠️",h="critical",f="OVERDUE JOB",C="View Job",x="jobs"):b.includes("job")&&_.includes("due today")?(u="⏳",h="warning",f="JOB DUE TODAY",C="View Job",x="jobs"):b.includes("job_created")?(u="📋",h="info",f="NEW JOB LOGGED",C="View Job",x="jobs"):b.includes("job")||b.includes("status")?(u="🔄",h="info",f="JOB UPDATED",C="View Job",x="jobs"):b.includes("task")&&(_.includes("overdue")||b.includes("overdue"))?(u="⚠️",h="critical",f="OVERDUE TASK",C="Check Tasks",x="dailytasks"):b.includes("task_completed")?(u="✅",h="success",f="TASK COMPLETED",C="View Checklist",x="dailytasks"):b.includes("task")?(u="📝",h="warning",f="DAILY TASK",C="View Tasks",x="dailytasks"):b.includes("ticket")?(u="💬",h="info",f="SUPPORT TICKET",C="View Ticket",x="tickets"):b.includes("target")&&(u="🎉",h="success",f="TARGET REACHED",C="View Targets",x="targets");const c=o||C,v=document.createElement("div");v.id=S,v.className=`ci360-popup-card ci360-priority-${h}`,v.innerHTML=`
    <div class="ci360-popup-indicator"></div>
    <div class="ci360-popup-body">
      <div class="ci360-popup-header">
        <div class="ci360-popup-header-left">
          <div class="ci360-popup-icon-badge">${u}</div>
          <span class="ci360-popup-tag ${h}">${f}</span>
          <span class="ci360-popup-time">${s||"Just now"}</span>
        </div>
        <button type="button" class="ci360-popup-close-btn" aria-label="Dismiss">✕</button>
      </div>
      <div class="ci360-popup-title">${g(i||"CI360 Notification")}</div>
      <div class="ci360-popup-message">${g(t||"")}</div>
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
  `,V(),F();const M=()=>{v.style.opacity="0",v.style.transform="translateX(40px) scale(0.95)",setTimeout(()=>v.remove(),220)};for(v.querySelector(".ci360-popup-close-btn").onclick=I=>{I.stopPropagation(),M()},v.querySelector(".ci360-popup-dismiss-link").onclick=I=>{I.stopPropagation(),M()},v.querySelector(".ci360-popup-action-btn").onclick=I=>{if(I.stopPropagation(),typeof a=="function"?a():x&&typeof window.ci360NavTab=="function"&&window.ci360NavTab(x),e)try{N(`/notifications/${e}/read`,{method:"PATCH"})}catch{}M()};m.children.length>=4;)m.removeChild(m.firstChild);m.appendChild(v),l||setTimeout(()=>{document.body.contains(v)&&M()},h==="critical"?14e3:p)}function we(e=[]){if(!e||!e.length)return;const i=sessionStorage.getItem("ci360_client_overdue_dismissed");if(i&&Date.now()-Number(i)<45*60*1e3)return;const t=e.reduce((l,p)=>l+(Number(p.pendingAmount||p.totalAmount)||0),0),n=`
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
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${ie(t)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${e.length} Overdue Invoice${e.length>1?"s":""}</span>
      </div>

      <div class="ci360-overdue-list">
        ${e.map(l=>{const p=l.dueDate?new Date(l.dueDate):new Date,m=Math.max(1,Math.floor((Date.now()-p.getTime())/(1e3*60*60*24)));return`
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${g(l.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${W(l.dueDate)} <span style="color:var(--red-600);font-weight:700">(${m}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${ie(l.pendingAmount||l.totalAmount||0)}</div>
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
  `,s=ce(n),o=s.querySelector("#ci360OverduePayBtn"),a=s.querySelector("#ci360OverdueRemindBtn");o&&(o.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove(),typeof window.ci360NavTab=="function"&&window.ci360NavTab("billing")}),a&&(a.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove()})}function Ce(){return`
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

        ${!Se()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
    </div>`}function Ie(){const e=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),t=document.getElementById("notifBadge"),n=document.getElementById("notifList"),s=document.getElementById("clearNotifBtn"),o=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),l=document.getElementById("notifDismissBannerBtn"),p=document.getElementById("notifPermissionBanner"),m=document.getElementById("notifUnreadBadge");if(!e||!i)return;de();function S(){const d=document.getElementById("notifPermissionBanner");d&&(d.classList.add("hidden"),d.style.setProperty("display","none","important"),d.remove())}function k(){if(Se()){S();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?S():Notification.permission==="default"&&p&&p.style.setProperty("display","flex","important"))}k(),l&&(l.onclick=d=>{d.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),S()}),a&&(a.onclick=async d=>{d.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),S(),await ue(),S()}),$e()&&X(),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),Y();let u=[],h="all";function f(d){return d?d.startsWith("task_completed")?"🎉":d.startsWith("task_due")?"⚡":d.startsWith("task")?"✅":d.startsWith("target_completed")?"🎉":d.startsWith("target")?"🎯":d.startsWith("job_due")?"⏳":d.startsWith("job")?"📋":d.startsWith("ticket")?"🎫":d.startsWith("status")?"🔄":d.startsWith("test")?"🧪":"🔔":"🔔"}function C(d){if(!d)return"";const r=new Date(d),y=Math.floor((new Date-r)/1e3);if(y<60)return"Just now";const w=Math.floor(y/60);if(w<60)return`${w}m ago`;const E=Math.floor(w/60);if(E<24)return`${E}h ago`;const D=Math.floor(E/24);return D===1?"Yesterday":D<7?`${D}d ago`:W(d)}function x(){if(!n)return;let d=u;if(h==="task"?d=u.filter(r=>(r.type||"").includes("task")):h==="target"?d=u.filter(r=>(r.type||"").includes("target")):h==="job"?d=u.filter(r=>(r.type||"").includes("job")):h==="ticket"&&(d=u.filter(r=>(r.type||"").includes("ticket"))),d.length===0){n.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${h==="all"?"":h+" "}notifications</div>`;return}n.innerHTML=d.map(r=>{const B=f(r.type);return`
        <div class="notif-item ${r.read?"":"unread"}" data-id="${r._id}" data-type="${g(r.type||"")}">
          <div class="notif-icon">${B}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${g(r.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${C(r.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${g(r.message)}</div>
          </div>
        </div>`}).join(""),n.querySelectorAll(".notif-item").forEach(r=>{r.onclick=async()=>{const B=r.dataset.id,y=r.dataset.type;if(B&&r.classList.contains("unread")){r.classList.remove("unread");try{await N(`/notifications/${B}/read`,{method:"PATCH"})}catch{}}I(),y&&y.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):y&&y.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("jobs"):y&&y.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):y&&y.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}})}let b={jobs:0,tasks:0,invoices:0,tickets:0},_=!1;async function c(d=!1){try{const r=await Z("/notifications");u=r.notifications||[];const B=r.unreadCount||0;if(t&&(t.textContent=B>99?"99+":B,t.style.display=B>0?"flex":"none"),m&&(m.textContent=B>0?`${B} new`:"",m.style.display=B>0?"inline-block":"none"),Y(),r.overdue&&r.overdue.invoices&&r.overdue.invoices.length>0){const y=typeof z=="function"?z():null;y&&y.role==="client"&&we(r.overdue.invoices)}if(r.syncTimestamps){const y=r.syncTimestamps;if(!_)b={...y},_=!0;else{const w=[];y.jobs>(b.jobs||0)&&w.push("jobs"),y.tasks>(b.tasks||0)&&w.push("tasks"),y.invoices>(b.invoices||0)&&w.push("invoices"),y.tickets>(b.tickets||0)&&w.push("tickets"),w.length>0&&(b={...y},window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{changedKeys:w,syncTimestamps:y,overdue:r.overdue}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({changedKeys:w,syncTimestamps:y}))}}if(be){const y=u.filter(w=>!w.read&&!L.has(String(w._id)));if(y.length>0){for(const w of y){const E=String(w._id);ye.add(E),te({id:E,title:w.title||"CI360 Alert",message:w.message||"",type:w.type}),await J({title:w.title||"CI360 Alert",message:w.message||"",type:w.type,id:E})}Q(),window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{newNotifications:y}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({newNotifications:y})}}else{const y=u.filter(w=>!w.read&&!L.has(String(w._id)));if(u.forEach(w=>ye.add(String(w._id))),y.length>0){const w=y.slice(0,3);for(const E of w){const D=String(E._id);te({id:D,title:E.title||"CI360 Alert",message:E.message||"",type:E.type}),await J({title:E.title||"CI360 Alert",message:E.message||"",type:E.type,id:D})}y.forEach(E=>L.add(String(E._id))),Q()}else u.forEach(w=>L.add(String(w._id))),Q();be=!0}x()}catch{n&&u.length===0&&(n.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=c,window.showInAppPopupAlert=te,window.showClientOverdueInvoiceModal=we),c(),window.__ci360PollInterval=setInterval(c,6e3),window.addEventListener("focus",()=>c(!0)),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(d=>{d.onclick=r=>{r.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(B=>B.classList.remove("active")),d.classList.add("active"),h=d.dataset.filter,x()}});const v=document.getElementById("notifBackdrop");function M(){i.style.display="flex",i.classList.add("open"),v&&(v.style.display="block",v.classList.add("open")),e.setAttribute("aria-expanded","true"),k();const d=document.getElementById("topbarUserDropdown");d&&(d.style.display="none"),c()}function I(){i.style.display="none",i.classList.remove("open"),v&&(v.style.display="none",v.classList.remove("open")),e.setAttribute("aria-expanded","false")}function U(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?I():M()}window.ci360CloseNotifications=I;const O=document.getElementById("notifCloseBtn");O&&(O.onclick=d=>{d.stopPropagation(),I()}),v&&(v.onclick=d=>{d.stopPropagation(),I()}),e.onclick=d=>{d.stopPropagation(),U()},o&&(o.onclick=async d=>{d.stopPropagation();try{await N("/notifications/read",{method:"PATCH"}),t.style.display="none",m&&(m.textContent="",m.style.display="none"),u.forEach(r=>r.read=!0),x(),$("All notifications marked as read")}catch(r){$(r.message,!0)}}),document.addEventListener("click",d=>{!i.contains(d.target)&&d.target!==e&&(i.style.display="none")}),s&&(s.onclick=async d=>{d.stopPropagation();try{await re("/notifications"),u=[],n.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',t.style.display="none",m&&(m.textContent="",m.style.display="none"),$("Notifications cleared")}catch(r){$(r.message,!0)}})}function je({user:e,currentRole:i,activeTab:t,tabs:n,title:s,subtitle:o}){const a=e&&e.name?e.name.charAt(0).toUpperCase():"U",l=e&&(e.role==="superadmin"||e.role==="admin")?"Admin":e&&e.role==="accounts"?"Accounts":e&&e.role==="employee"?"Employee":e&&e.role==="client"?"Client":e&&e.role?e.role.toUpperCase():"User",p=e&&e.name?e.name:"User",m=e&&e.email?e.email:e&&e.username?e.username:"",S=n&&n.some(f=>f.key==="logjob"),k=n&&n.find(f=>f.key===t),u=s||k&&k.label||"Dashboard";let h=[];return i==="accounts"?h=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:t==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:t==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(t),isMore:!0}]:i==="superadmin"?h=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="dashboard"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(t),isMore:!0}]:i==="employee"?h=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:t==="myjobs"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"tickets",label:"Tickets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></svg>',active:t==="tickets"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:t==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","tickets","targets"].includes(t),isMore:!0}]:h=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:t==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(t),isMore:!0}],`
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
          ${n.map(f=>`
            <button type="button" class="sidebar-item ${t===f.key?"active":""}" data-tab="${f.key}" aria-current="${t===f.key?"page":"false"}">
              <span class="icon">${f.icon||"📌"}</span>
              <span>${f.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${g(e?e.name:"User")}</div>
            <div class="role">${g(l)}</div>
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
              <h1 class="page-heading-title">${g(u)}</h1>
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
              <button class="theme-btn ${T()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${T()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${Ce()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${a}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${g(p)}</span>
                  <span class="topbar-user-role-badge">${g(l)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${a}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${g(p)}</div>
                      ${m?`<div class="tud-email">${g(m)}</div>`:""}
                      <span class="tud-role-chip">${g(l)}</span>
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
                      <span class="tud-icon">${T()==="dark"?"☀️":"🌙"}</span>
                      <span class="tud-label">Switch to ${T()==="dark"?"Light":"Dark"} Mode</span>
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
                        <span style="font-size:16px" id="tudMobileThemeIcon">${T()==="dark"?"☀️":"🌙"}</span>
                        <span id="tudMobileThemeText">${T()==="dark"?"Light Mode":"Dark Mode"}</span>
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
          ${h.map(f=>`
            <button type="button" class="mbn-item ${f.active?"active":""}" data-tab="${f.key}" ${f.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${f.iconSvg}</span>
              <span class="mbn-label">${g(f.label)}</span>
              ${f.active?'<span class="mbn-active-dot"></span>':""}
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
              ${n.map(f=>`
                <button type="button" class="mms-card ${t===f.key?"active":""}" data-tab="${f.key}">
                  <span class="mms-card-icon">${f.icon||"📌"}</span>
                  <span class="mms-card-label">${g(f.label)}</span>
                </button>
              `).join("")}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${T()==="dark"?"☀️ Light Mode":"🌙 Dark Mode"}</span>
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
    </div>`}function ze(e){const i=document.getElementById("mobileNavToggle"),t=document.getElementById("appSidebar"),n=document.getElementById("sidebarOverlay");function s(){t&&t.classList.add("open"),n&&n.classList.add("open")}function o(){t&&t.classList.remove("open"),n&&n.classList.remove("open")}i&&(i.onclick=s),n&&(n.onclick=o);const a=document.getElementById("mobileMoreBackdrop"),l=document.getElementById("mobileMoreSheet"),p=document.getElementById("mmsCloseBtn"),m=document.getElementById("mobileMoreBtn");function S(){a&&a.classList.add("active"),l&&l.classList.add("active")}function k(){a&&a.classList.remove("active"),l&&l.classList.remove("active")}m&&(m.onclick=r=>{r.stopPropagation(),S()}),p&&(p.onclick=k),a&&(a.onclick=r=>{r.target===a&&k()}),document.querySelectorAll(".mbn-item").forEach(r=>{r.dataset.tab&&r.dataset.tab!=="__more__"&&(r.onclick=()=>{k(),e&&e(r.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(r=>{r.onclick=()=>{k(),e&&e(r.dataset.tab)}});const u=document.getElementById("mmsToggleThemeBtn");u&&(u.onclick=()=>{j(T()==="dark"?"light":"dark")});const h=document.getElementById("mmsNotifsBtn");h&&(h.onclick=()=>{k();const r=document.getElementById("notifBellBtn");r&&r.click()});const f=document.getElementById("mmsLogoutBtn");f&&(f.onclick=q);const C=document.getElementById("mobileCalBtn");C&&(C.onclick=()=>{const r=document.querySelector(".period-row");r&&(r.scrollIntoView({behavior:"smooth",block:"center"}),r.classList.add("pulse-highlight"),setTimeout(()=>r.classList.remove("pulse-highlight"),1200))});const x=document.getElementById("tudMobileThemeBtn");x&&(x.onclick=r=>{r.stopPropagation(),j(T()==="dark"?"light":"dark")});const b=document.getElementById("tudMobileNotifsBtn");b&&(b.onclick=r=>{r.stopPropagation();const B=document.getElementById("topbarUserDropdown");B&&(B.style.display="none");const y=document.getElementById("notifBellBtn");y&&y.click()});const _=document.getElementById("tudMobileSettingsBtn");_&&(_.onclick=r=>{r.stopPropagation();const B=document.getElementById("topbarUserDropdown");B&&(B.style.display="none"),document.querySelector('[data-tab="manage"]')&&e?e("manage"):S()});const c=document.getElementById("tudMobileHelpBtn");c&&(c.onclick=r=>{r.stopPropagation();const B=document.getElementById("topbarUserDropdown");B&&(B.style.display="none"),document.querySelector('[data-tab="tickets"]')&&e?e("tickets"):ce(`
          <div style="padding:24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">💬</div>
            <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
            <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
              For immediate technical assistance, client onboarding, or support tickets, reach out to your system administrator or use the Support Tickets portal.
            </p>
            <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
          </div>
        `)});const v=document.getElementById("logoutBtnMobile");v&&(v.onclick=q);const M=document.getElementById("topbarUserBtn"),I=document.getElementById("topbarUserDropdown");M&&I&&(M.onclick=r=>{r.stopPropagation();const B=I.style.display!=="none";I.style.display=B?"none":"block",M.setAttribute("aria-expanded",String(!B)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",r=>{!I.contains(r.target)&&!M.contains(r.target)&&(I.style.display="none",M.setAttribute("aria-expanded","false"))}));const U=document.getElementById("tudThemeToggleBtn");U&&(U.onclick=()=>{j(T()==="dark"?"light":"dark")});const O=document.getElementById("topbarQuickLogJobBtn");O&&(O.onclick=()=>{e&&e("logjob")});const d=document.getElementById("logoutBtn");d&&(d.onclick=q),Ie(),document.querySelectorAll(".sidebar-item").forEach(r=>{r.onclick=()=>{o(),e&&e(r.dataset.tab)}}),Ue(e)}function Ue(e){const i=document.getElementById("cmdPaletteBackdrop"),t=document.getElementById("cmdSearchInput"),n=document.getElementById("cmdResultsList"),s=document.getElementById("topbarCmdTrigger"),o=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),l=document.getElementById("cmdCloseKbd");if(!i||!t||!n)return;const p=Array.from(document.querySelectorAll(".sidebar-item")),m=p.map(c=>{var v,M;return{type:"tab",id:c.dataset.tab,label:((v=c.querySelector("span:last-child"))==null?void 0:v.textContent)||c.dataset.tab,icon:((M=c.querySelector(".icon"))==null?void 0:M.textContent)||"📌",sub:"Navigate to section",action:()=>{e&&e(c.dataset.tab)}}});p.some(c=>c.dataset.tab==="logjob")&&m.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{e&&e("logjob")}}),m.push({type:"action",id:"toggle-theme",label:T()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{j(T()==="dark"?"light":"dark")}}),m.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const c=document.getElementById("notifBellBtn");c&&c.click()}}),m.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>q()});let k=0,u=[...m];function h(){if(!u.length){n.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}n.innerHTML=u.map((c,v)=>`
      <div class="cmd-result ${v===k?"selected":""}" data-idx="${v}">
        <div class="cmd-result-icon">${c.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${g(c.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${g(c.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),n.querySelectorAll(".cmd-result").forEach(c=>{c.onmouseenter=()=>{k=Number(c.dataset.idx),f()},c.onclick=()=>{C(Number(c.dataset.idx))}})}function f(){n.querySelectorAll(".cmd-result").forEach((c,v)=>{c.classList.toggle("selected",v===k)})}function C(c){const v=u[c];v&&v.action&&(b(),v.action())}function x(){const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),i.classList.add("open"),t.value="",u=[...m],k=0,h(),setTimeout(()=>t.focus(),50)}function b(){i.classList.remove("open"),t.blur()}s&&(s.onclick=x),o&&(o.onclick=x),a&&(a.onclick=()=>{const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),x()}),l&&(l.onclick=b),i.onclick=c=>{c.target===i&&b()},t.oninput=()=>{const c=t.value.trim().toLowerCase();c?u=m.filter(v=>v.label.toLowerCase().includes(c)||v.sub.toLowerCase().includes(c)):u=[...m],k=0,h()},t.onkeydown=c=>{if(c.key==="ArrowDown"){if(c.preventDefault(),u.length>0){k=(k+1)%u.length,f();const v=n.querySelector(".cmd-result.selected");v&&v.scrollIntoView({block:"nearest"})}}else if(c.key==="ArrowUp"){if(c.preventDefault(),u.length>0){k=(k-1+u.length)%u.length,f();const v=n.querySelector(".cmd-result.selected");v&&v.scrollIntoView({block:"nearest"})}}else c.key==="Enter"?(c.preventDefault(),C(k)):c.key==="Escape"&&(c.preventDefault(),b())};const _=c=>{(c.metaKey||c.ctrlKey)&&c.key.toLowerCase()==="k"?(c.preventDefault(),i.classList.contains("open")?b():x()):c.key==="Escape"&&i.classList.contains("open")&&b()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=_,window.addEventListener("keydown",_)}function Oe(e=4){return`
    <div class="grid grid-${Math.min(e,4)}" style="margin-bottom:24px">
      ${Array(e).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function Re(e,i,t="📁",n=""){return`
    <div class="empty">
      <span class="empty-icon">${t}</span>
      <h3>${g(e)}</h3>
      <p>${g(i)}</p>
      ${n}
    </div>`}function qe(e,i,t="",n="📊",s=""){let o="";return s&&(o=`<span class="kpi-trend ${s.startsWith("+")||s.includes("↑")||s.toLowerCase().includes("up")?"up":"down"}">${g(s)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${g(e)}</span>
        <div class="kpi-icon">${n}</div>
      </div>
      <div class="kpi-value">${g(i)}</div>
      <div class="kpi-sub">${o}<span>${g(t)}</span></div>
    </div>`}function He(e,i="gray"){return`<span class="badge ${i}">${g(e)}</span>`}function Ve(e,i="indigo"){const t=Math.min(100,Math.max(0,Number(e)||0));return`
    <div class="progress-bar-wrap" title="${t.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${t}%"></div>
    </div>`}function Fe(e){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([t,n])=>`<button class="pchip ${e===t?"active":""}" data-period="${t}">${n}</button>`).join("")}</div>`}function Je(e){if(!e)return"U";const i=e.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function ke(e){if(!e)return"";const i=new Date,t=new Date(e),n=Math.floor((i-t)/1e3);if(n<60)return"Just now";const s=Math.floor(n/60);if(s<60)return`${s}m ago`;const o=Math.floor(s/60);if(o<24)return`${o}h ago`;const a=Math.floor(o/24);return a<7?`${a}d ago`:W(e)}function ee(e){if(e=Number(e)||0,e===0)return"0 B";const i=1024,t=["B","KB","MB","GB"],n=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,n)).toFixed(1))+" "+t[n]}function K(e="",i=""){const t=(e.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(t)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:t==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(t)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(t)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(t)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(t)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(t)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function We(e){return e?K(e.name||e.filename||"",e.type||"").cls==="img":!1}function pe(e){if(!e||!e.url)return;const i=K(e.name,e.type),t=i.cls==="img",n=i.cls==="pdf",s=g(e.name||"Attachment"),o=ee(e.size),a=document.createElement("div");a.className="preview-modal-overlay",a.innerHTML=`
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${i.icon}</span>
          <span>${s}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${o})</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="${e.url}" download="${s}" target="_blank" class="btn ghost small" style="font-size:12px;padding:4px 10px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
          <button type="button" class="btn ghost small preview-modal-close" style="padding:4px 8px;font-size:14px">✕</button>
        </div>
      </div>
      <div class="preview-modal-body">
        ${t?`
          <img src="${e.url}" alt="${s}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${e.url}','_blank')">
        `:n?`
          <iframe src="${e.url}" title="${s}"></iframe>
        `:`
          <div style="text-align:center;padding:40px 20px">
            <div style="font-size:48px;margin-bottom:12px">${i.icon}</div>
            <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${s}</div>
            <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${o}</div>
            <a href="${e.url}" download="${s}" target="_blank" class="btn gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Attachment
            </a>
          </div>
        `}
      </div>
    </div>
  `,a.onclick=l=>{(l.target===a||l.target.closest(".preview-modal-close"))&&a.remove()},document.body.appendChild(a)}function ne(e=[],i={}){if(!e||!e.length)return"";const t=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${g(i.title)} <span style="font-weight:500;color:var(--text-4)">(${e.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${e.map((n,s)=>{const o=K(n.name,n.type),a=g(n.name||"File"),l=ee(n.size);return`
            <div class="attachment-chip" data-idx="${s}" title="${a} (${l})">
              <span class="file-type-icon ${o.cls}" style="width:22px;height:22px;font-size:12px">${o.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${s}, this)">${a}</span>
              <span class="attachment-chip-size">${l}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${s}, this)">👁️</button>
                <a href="${n.url}" download="${a}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${t?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${s}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const A={};async function oe(e){const i=Array.from(e||[]);if(!i.length)return[];const n=(await Promise.all(i.map(async s=>new Promise(o=>{const a=new FileReader;a.onload=()=>{o({name:s.name,type:s.type,size:s.size,base64:a.result,data:a.result})},a.onerror=()=>o(null),a.readAsDataURL(s)})))).filter(Boolean);if(!n.length)return[];try{const s=await le("/upload",{files:n});if(s&&s.files&&s.files.length)return s.files}catch(s){console.warn("Backend upload failed, fallback to base64 data URLs:",s)}return n.map(s=>({name:s.name,url:s.base64,size:s.size,type:s.type,uploadedAt:new Date}))}function me({id:e="uploader",label:i="Attachments & Files",subtitle:t="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:n=!0,accept:s="*/*",maxFiles:o=10}={}){return`
    <div class="uploader-container" id="container-${e}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${g(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${e}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${e}">
        <input type="file" id="input-${e}" ${n?"multiple":""} accept="${s}" style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${g(t)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${e}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${e}"></div>
    </div>
  `}function fe(e,i={}){const t=document.getElementById("zone-"+e),n=document.getElementById("input-"+e),s=document.getElementById("list-"+e),o=document.getElementById("count-"+e);A[e]=i.existing?[...i.existing]:[];function a(){const l=A[e]||[];if(o&&(o.textContent=`${l.length} file${l.length===1?"":"s"} attached`),!!s){if(!l.length){s.innerHTML="";return}s.innerHTML=l.map((p,m)=>{const S=K(p.name,p.type),k=g(p.name||"File"),u=ee(p.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${S.cls}">${S.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${k}">${k}</div>
              <div class="uploader-file-size">${S.label} · ${u}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${e}', ${m})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${e}', ${m})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(l)}}window.__removeUploaderFile=(l,p)=>{if(A[l]){A[l].splice(p,1);const m=window[`__update_${l}`];m&&m()}},window.__previewUploaderFile=(l,p)=>{const m=(A[l]||[])[p];m&&pe(m)},window[`__update_${e}`]=a,t&&n&&(t.onclick=l=>{l.target.tagName!=="BUTTON"&&!l.target.closest("button")&&n.click()},t.ondragover=l=>{l.preventDefault(),t.classList.add("dragover")},t.ondragleave=()=>t.classList.remove("dragover"),t.ondrop=async l=>{if(l.preventDefault(),t.classList.remove("dragover"),l.dataTransfer&&l.dataTransfer.files&&l.dataTransfer.files.length){$("Uploading files… ⏳");const p=await oe(l.dataTransfer.files);A[e]=[...A[e]||[],...p],a(),$("Files attached! ✓")}},n.onchange=async()=>{if(n.files&&n.files.length){$("Uploading files… ⏳");const l=await oe(n.files);A[e]=[...A[e]||[],...l],a(),$("Files attached! ✓"),n.value=""}}),a()}function ve(e){return A[e]||[]}function Ee(e,i=[]){A[e]=[...i];const t=window[`__update_${e}`];t&&t()}window.__openPreview=(e,i)=>{const t=i.closest(".attachment-chips-wrap");if(!t)return;const n=i.closest(".attachment-chip");if(!n)return;const s=Number(n.dataset.idx),o=t.dataset.attachments;if(o)try{const a=JSON.parse(decodeURIComponent(o));a[s]&&pe(a[s])}catch{}};function Ke(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");return`
    <div class="ticket-section" id="tksec-${t}">
      <div class="ticket-section-header">
        <div class="ticket-section-title">
          <span style="font-size:14px">🎫</span>
          <span>Support &amp; Feedback</span>
          <span class="ticket-count-pill" id="tkcnt-${t}">0</span>
        </div>
        <button type="button" class="btn ghost small ticket-toggle-btn" data-jobid="${e}" data-safeid="${t}">
          + Raise Ticket
        </button>
      </div>

      <div class="ticket-create-form" id="tkform-${t}">
        <div class="form-grid-2">
          <div class="field">
            <label>Subject / Issue *</label>
            <input type="text" id="tksub-${t}" placeholder="e.g. Revision required for Instagram Reel" />
          </div>
          <div class="field">
            <label>Priority</label>
            <select id="tkpri-${t}">
              <option value="Medium" selected>🟡 Medium</option>
              <option value="Low">🟢 Low</option>
              <option value="High">🟠 High</option>
              <option value="Urgent">🔴 Urgent</option>
            </select>
          </div>
        </div>
        <div class="field" style="margin-bottom:10px">
          <label>Detailed Description *</label>
          <textarea id="tkmsg-${t}" rows="3" placeholder="Provide full details, feedback, or blockers so the team can resolve it quickly…"></textarea>
        </div>
        ${me({id:"tkup-"+t,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
          <button type="button" class="btn ghost small tk-cancel-btn" data-safeid="${t}">Cancel</button>
          <button type="button" class="btn gold small tk-submit-btn" data-jobid="${e}" data-safeid="${t}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Submit Ticket
          </button>
        </div>
      </div>

      <div class="ticket-list" id="tklist-${t}">
        <div style="font-size:12px;color:var(--text-4);padding:8px 0;display:flex;align-items:center;gap:6px">
          <span class="pulse-dot"></span> Loading tickets…
        </div>
      </div>
    </div>`}const Ge={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},Qe={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function Ye(e,i){const t=(e.status||"Open").toLowerCase().replace(" ","-"),n=e.status==="Open",s=(e._id||"").slice(-4).toUpperCase(),o=Je(e.userName),a=encodeURIComponent(JSON.stringify(e.attachments||[])),l=encodeURIComponent(JSON.stringify(e.adminAttachments||[]));return`
    <div class="ticket-card status-${t}" id="tkcard-${e._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${s}</span>
            <span class="ticket-subject">${g(e.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${Ge[e.status]||"gray"}">
            ${n?'<span class="pulse-dot"></span>':""} ${g(e.status)}
          </span>
          <span class="badge ${Qe[e.priority]||"gray"}">${g(e.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${o}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${g(e.userName)}
            <span class="ticket-role-pill">${g(e.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${ke(e.createdAt)} · ${W(e.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${g(e.message)}</div>

      ${e.attachments&&e.attachments.length?`
        <div data-attachments="${a}">
          ${ne(e.attachments,{title:"Ticket Attachments"})}
        </div>
      `:""}

      ${e.adminReply?`
        <div class="ticket-thread-wrap">
          <div class="ticket-admin-reply-card">
            <div class="ticket-admin-reply-header">
              <span class="ticket-shield-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Support Team Response
              </span>
              ${e.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${ke(e.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${g(e.adminReply)}</div>
            ${e.adminAttachments&&e.adminAttachments.length?`
              <div data-attachments="${l}">
                ${ne(e.adminAttachments,{title:"Support Attached Files"})}
              </div>
            `:""}
          </div>
        </div>`:""}

      ${i?`
        <div class="ticket-toolbar">
          <label style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Status:</label>
          <select class="tk-status-sel" data-tkid="${e._id}" style="font-size:12px;padding:5px 8px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1)">
            <option value="Open" ${e.status==="Open"?"selected":""}>🔴 Open</option>
            <option value="In Review" ${e.status==="In Review"?"selected":""}>🟡 In Review</option>
            <option value="Resolved" ${e.status==="Resolved"?"selected":""}>🟢 Resolved</option>
            <option value="Closed" ${e.status==="Closed"?"selected":""}>⚪ Closed</option>
          </select>

          <button class="btn ghost small tk-reply-toggle" data-tkid="${e._id}" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ${e.adminReply?"Edit Reply":"💬 Reply"}
          </button>

          ${e.status!=="Resolved"?`
            <button class="btn ghost small tk-quick-resolve-btn" data-tkid="${e._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
              ✓ Quick Resolve
            </button>`:""}

          <button class="btn danger small tk-del-btn" data-tkid="${e._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>

          <div class="ticket-reply-form" id="tkreplyform-${e._id}">
            <div class="ticket-templates-bar">
              <span style="font-size:10px;font-weight:700;color:var(--text-4);text-transform:uppercase;align-self:center">Quick:</span>
              <button type="button" class="ticket-template-btn" data-tkid="${e._id}" data-tpl="We are actively investigating this and will update you shortly.">🔍 Investigating</button>
              <button type="button" class="ticket-template-btn" data-tkid="${e._id}" data-tpl="This issue has been resolved and the updates have been saved.">✅ Resolved</button>
              <button type="button" class="ticket-template-btn" data-tkid="${e._id}" data-tpl="Could you please provide more details so we can assist further?">ℹ️ Need Info</button>
            </div>
            <textarea id="tkreplytxt-${e._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${g(e.adminReply||"")}</textarea>
            ${me({id:"tkreplyup-"+e._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${e._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${e._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function P(e,i,t){const n=document.getElementById("tklist-"+i),s=document.getElementById("tkcnt-"+i);if(n)try{const o=await Z("/tickets/job/"+e);s&&(s.textContent=o.length),o.length?(n.innerHTML=o.map(a=>Ye(a,t)).join(""),Ze(e,i,t,n,o)):n.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{n.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function Ze(e,i,t,n,s){t&&(n.querySelectorAll(".tk-status-sel").forEach(o=>{o.onchange=async()=>{try{await G("/tickets/"+o.dataset.tkid,{status:o.value}),$("Status updated"),P(e,i,t)}catch(a){$(a.message,!0)}}}),n.querySelectorAll(".tk-quick-resolve-btn").forEach(o=>{o.onclick=async()=>{try{await G("/tickets/"+o.dataset.tkid,{status:"Resolved"}),$("Ticket marked as Resolved! 🎉"),P(e,i,t)}catch(a){$(a.message,!0)}}}),n.querySelectorAll(".ticket-template-btn").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplytxt-"+o.dataset.tkid);a&&(a.value=o.dataset.tpl,a.focus())}}),n.querySelectorAll(".tk-reply-toggle").forEach(o=>{o.onclick=()=>{const a=o.dataset.tkid,l=document.getElementById("tkreplyform-"+a);if(l){l.classList.toggle("show");const p=s.find(m=>m._id===a);fe("tkreplyup-"+a,{existing:p?p.adminAttachments:[]})}}}),n.querySelectorAll(".tk-reply-cancel").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplyform-"+o.dataset.tkid);a&&a.classList.remove("show")}}),n.querySelectorAll(".tk-reply-save").forEach(o=>{o.onclick=async()=>{const a=o.dataset.tkid,l=document.getElementById("tkreplytxt-"+a);if(!l)return;const p=ve("tkreplyup-"+a);try{await G("/tickets/"+a,{adminReply:l.value.trim(),adminAttachments:p}),$("Response saved! 🛡️"),P(e,i,t)}catch(m){$(m.message,!0)}}}),n.querySelectorAll(".tk-del-btn").forEach(o=>{o.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await re("/tickets/"+o.dataset.tkid),$("Ticket deleted"),P(e,i,t)}catch(a){$(a.message,!0)}}}))}function Xe(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");P(e,t,i),fe("tkup-"+t);const n=document.querySelector(`[data-jobid="${e}"].ticket-toggle-btn`);n&&(n.onclick=()=>{const a=document.getElementById("tkform-"+t);if(!a)return;const l=a.style.display==="block";a.style.display=l?"none":"block",n.textContent=l?"+ Raise Ticket":"✕ Cancel"});const s=document.querySelector(`.tk-cancel-btn[data-safeid="${t}"]`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+t);a&&(a.style.display="none"),n&&(n.textContent="+ Raise Ticket")});const o=document.querySelector(`.tk-submit-btn[data-safeid="${t}"]`);o&&(o.onclick=async()=>{var S,k;const a=(S=(document.getElementById("tksub-"+t)||{}).value)==null?void 0:S.trim(),l=(k=(document.getElementById("tkmsg-"+t)||{}).value)==null?void 0:k.trim(),p=(document.getElementById("tkpri-"+t)||{}).value,m=ve("tkup-"+t);if(!a){$("Please enter a subject",!0);return}if(!l){$("Please enter a message",!0);return}o.disabled=!0,o.textContent="Submitting…";try{await le("/tickets",{jobId:e,subject:a,message:l,priority:p,attachments:m}),$("Ticket submitted! 🎫");const u=document.getElementById("tkform-"+t);u&&(u.style.display="none"),n&&(n.textContent="+ Raise Ticket");const h=document.getElementById("tksub-"+t),f=document.getElementById("tkmsg-"+t);h&&(h.value=""),f&&(f.value=""),Ee("tkup-"+t,[]),P(e,t,i)}catch(u){$(u.message,!0)}finally{o.disabled=!1,o.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function et(){return""}function tt(){}window.__setTheme=function(e){j(e)};Object.assign(window,{getToken:se,getUser:z,setSession:Te,clearSession:ae,requireAuth:_e,initTheme:xe,api:N,apiGet:Z,apiPost:le,apiPut:G,apiPatch:Ae,apiDelete:re,fmtINR:ie,fmtHours:Ne,escapeHtml:g,fmtDate:W,flashToast:$,openModal:ce,logout:q,getTheme:T,setTheme:j,initServiceWorker:de,playNotificationChime:V,triggerPhoneVibration:F,requestNotificationPermission:ue,triggerSystemNotification:J,fmtFileSize:ee,getFileCategory:K,isImageAttachment:We,openFilePreviewModal:pe,renderAttachmentChips:ne,uploadFilesToServer:oe,renderAttachmentUploader:me,bindAttachmentUploader:fe,getUploaderAttachments:ve,setUploaderAttachments:Ee,renderRoleSwitcher:et,bindRoleSwitcher:tt,renderNotificationBell:Ce,initNotificationBell:Ie,renderAppShell:je,bindAppShellEvents:ze,renderSkeletonCards:Oe,renderEmptyState:Re,renderKpiCard:qe,renderBadge:He,renderProgressBar:Ve,renderPeriodPicker:Fe,renderSupportTicketSection:Ke,bindSupportTicketSection:Xe});export{_e as a,ze as b,Z as c,W as d,g as e,ie as f,le as g,$ as h,xe as i,re as j,G as k,z as l,se as m,ce as o,je as r,Te as s};
