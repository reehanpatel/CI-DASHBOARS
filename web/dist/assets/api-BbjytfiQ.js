(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const Le="/api";function K(){return localStorage.getItem("ci360_token")}function _(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function Be(e,i){localStorage.setItem("ci360_token",e),localStorage.setItem("ci360_user",JSON.stringify(i))}function F(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function Ne(e){const i=K(),t=_();if(!i||!t)return F(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null;const o=t.role==="superadmin"||t.role==="admin",s=t.name&&t.name.toLowerCase().includes("ekta")||t.email&&t.email.toLowerCase().includes("ekta");if(e&&t.role!==e&&!o){if((t.role==="accounts"||s)&&(e==="accounts"||e==="employee"))return t;const n=o?"/admin":t.role==="accounts"||s?"/accounts":t.role==="employee"?"/employee":t.role==="client"?"/client":null;return!n||typeof window<"u"&&window.location.pathname.startsWith(n)?(F(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null):(window.location.href=n,null)}return t}async function P(e,i={}){const t=K(),o=Object.assign({"Content-Type":"application/json"},i.headers||{});t&&(o.Authorization="Bearer "+t);const s=await fetch(Le+e,Object.assign({},i,{headers:o}));let n=null;try{n=await s.json()}catch{}if(s.status===401)throw e==="/auth/login"||e.includes("/auth/login")?new Error(n&&n.error||"Invalid username/email or password."):(F(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login?expired=1"),new Error(n&&n.error||"Session expired. Please sign in again."));if(!s.ok)throw new Error(n&&n.error||"Server status "+s.status+" — Backend waking up, please retry in 10s.");return i.method&&i.method!=="GET"&&!e.includes("/notifications")&&typeof window<"u"&&typeof window.ci360FetchNotifications=="function"&&setTimeout(()=>{try{window.ci360FetchNotifications()}catch{}},350),n}const U=e=>P(e,{method:"GET"}),oe=(e,i)=>P(e,{method:"POST",body:JSON.stringify(i)}),O=(e,i)=>P(e,{method:"PUT",body:JSON.stringify(i)}),Pe=(e,i)=>P(e,{method:"PATCH",body:JSON.stringify(i)}),G=e=>P(e,{method:"DELETE"}),De=e=>U("/archive"+(e?`?type=${encodeURIComponent(e)}`:"")),ze=(e,i)=>oe(`/archive/restore/${e}/${i}`,{}),je=(e,i)=>G(`/archive/purge/${e}/${i}`),Ue=e=>G(`/archive/purge-all/${e}`);function re(e){return e=Number(e)||0,"₹"+e.toLocaleString("en-IN",{maximumFractionDigits:0})}function qe(e){return(Number(e)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function h(e){return e==null?"":String(e).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function Q(e){return e?new Date(e).toISOString().slice(0,10):"—"}function M(){return localStorage.getItem("ci360_theme")||"light"}function j(e){localStorage.setItem("ci360_theme",e),document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(n=>{n.classList.toggle("active",n.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const n=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");n&&(n.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),o=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),o&&(o.textContent=e==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const n=s.querySelector("span");n&&(n.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function $e(){var n;if(typeof document<"u"&&((n=document.body)!=null&&n.classList.contains("login-page")||window.location.pathname.includes("login")||document.querySelector(".login-box"))){document.documentElement.setAttribute("data-theme","dark");return}const e=M();document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(a=>{a.classList.toggle("active",a.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const a=i.querySelector(".tud-icon"),l=i.querySelector(".tud-label");a&&(a.textContent=e==="dark"?"☀️":"🌙"),l&&(l.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),o=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),o&&(o.textContent=e==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const a=s.querySelector("span");a&&(a.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{$e()}catch{}function S(e,i){const t=document.createElement("div");t.className="toast",t.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",t.textContent=(i?"⚠️  ":"✓  ")+e,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(10px)",setTimeout(()=>t.remove(),200)},2800)}function Y(e){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${e}</div>`,i.onclick=t=>{t.target===i&&i.remove()},document.body.appendChild(i),i}function R(){F(),window.location.href="/login"}let H=null;async function pe(){if("serviceWorker"in navigator)try{H=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",H.scope),typeof Notification<"u"&&Notification.permission==="granted"&&K()&&se(H).catch(()=>{})}catch(e){console.warn("CI360 Service Worker registration notice:",e)}}try{pe()}catch{}let he=0,be=0;const D=new Set,we=new Set;let ke=!1;function Se(e){try{const i=typeof _=="function"?_():null,t=i&&i._id?String(i._id):"default";return`${e}_${t}`}catch{return`${e}_default`}}function ee(){try{const e=Se("ci360_alerted_ids"),i=localStorage.getItem(e);if(i){const t=JSON.parse(i);Array.isArray(t)&&t.forEach(o=>D.add(String(o)))}}catch{}}function Z(){try{const e=Se("ci360_alerted_ids"),i=Array.from(D).slice(-2e3);localStorage.setItem(e,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",e=>{e.key&&e.key.includes("ci360_alerted_ids")&&ee()});let q=null;function Oe(){if(typeof window>"u")return;const e=()=>{try{const i=window.AudioContext||window.webkitAudioContext;i&&(q||(q=new i),q.state==="suspended"&&q.resume())}catch{}window.removeEventListener("touchstart",e,!0),window.removeEventListener("pointerdown",e,!0),window.removeEventListener("click",e,!0)};window.addEventListener("touchstart",e,!0),window.addEventListener("pointerdown",e,!0),window.addEventListener("click",e,!0)}Oe();function V(){try{const e=Date.now();if(e-he<2500)return;he=e;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=q||new i;t.state==="suspended"&&t.resume();const o=t.currentTime,s=t.createOscillator(),n=t.createGain();s.type="sine",s.frequency.setValueAtTime(587.33,o),n.gain.setValueAtTime(0,o),n.gain.linearRampToValueAtTime(.25,o+.02),n.gain.exponentialRampToValueAtTime(.001,o+.38),s.connect(n),n.connect(t.destination),s.start(o),s.stop(o+.38);const a=t.createOscillator(),l=t.createGain();a.type="sine",a.frequency.setValueAtTime(880,o+.12),l.gain.setValueAtTime(0,o+.12),l.gain.linearRampToValueAtTime(.28,o+.14),l.gain.exponentialRampToValueAtTime(.001,o+.6),a.connect(l),l.connect(t.destination),a.start(o+.12),a.stop(o+.6)}catch{}}function J(){try{const e=Date.now();if(e-be<2500)return;be=e,"vibrate"in navigator&&navigator.vibrate([200,100,200,100,200])}catch{}}function Ce(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function Ie(){try{if(Ce()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function ue(){if(!("Notification"in window))return S("Your device browser does not support Web Notifications.",!0),!1;try{const e=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return e==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),await se(),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),S("Notifications successfully enabled on this device!"),V(),J(),await W({title:"CI360 Alerts Active 🔔",message:"Instant notifications are now live on this device for jobs, tasks, and overdue invoices!",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),S("Notification permission was not granted.",!0),!1)}catch(e){console.error("Notification permission request error:",e)}return!1}async function W({title:e,message:i,type:t,id:o,url:s}){const n=o?String(o):null;if(ee(),n&&D.has(n)||(n&&(D.add(n),Z()),V(),J(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return;localStorage.setItem("ci360_notif_enabled","true")}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",l={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:n?`ci360-notif-${n}`:"ci360-alert-"+Date.now(),renotify:!0,vibrate:[200,100,200,100,200],data:{url:s||(typeof window<"u"?window.location.href:""),type:t||"general"}};try{navigator.serviceWorker&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:e,options:l})}catch{}try{if("serviceWorker"in navigator){const u=H||await navigator.serviceWorker.getRegistration();if(u&&u.showNotification){await u.showNotification(e,l);return}}}catch{}try{const u=new Notification(e,l);u.onclick=()=>{window.focus(),u.close()};return}catch{}}function Re(e){const i="=".repeat((4-e.length%4)%4),t=(e+i).replace(/-/g,"+").replace(/_/g,"/"),o=window.atob(t),s=new Uint8Array(o.length);for(let n=0;n<o.length;++n)s[n]=o.charCodeAt(n);return s}async function se(e=null){try{if(typeof window>"u"||!("serviceWorker"in navigator)||!("PushManager"in window)||typeof Notification>"u"||Notification.permission!=="granted"||!K())return null;const t=e||H||await navigator.serviceWorker.ready;if(!t||!t.pushManager)return null;let o=await t.pushManager.getSubscription();if(!o){const s=await U("/notifications/vapid-public-key").catch(()=>null),n=s&&s.publicKey?s.publicKey:"BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q";o=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Re(n)})}if(o){const s=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return await P("/notifications/subscribe",{method:"POST",body:JSON.stringify({subscription:o.toJSON?o.toJSON():o,deviceType:s?"mobile":"desktop"})}).catch(()=>{}),o}}catch(i){console.warn("Push subscription registration notice:",i.message)}return null}if(typeof window<"u"&&(window.triggerSystemNotification=W,window.requestNotificationPermission=ue,window.registerPushSubscription=se,"Notification"in window)){const e=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",e,!0),window.removeEventListener("touchstart",e,!0)};window.addEventListener("click",e,!0),window.addEventListener("touchstart",e,!0)}function He(){if(typeof document>"u")return null;let e=document.getElementById("ci360FloatingContainer");return e||(e=document.createElement("div"),e.id="ci360FloatingContainer",e.className="ci360-floating-container",document.body.appendChild(e)),e}function le({id:e,title:i,message:t,type:o,time:s,actionText:n,onAction:a,persistent:l=!1,timeout:u=8e3}){V(),J();const m=He();if(!m)return;const b=`ci360-pop-${e||Math.random().toString(36).slice(2,9)}`;if(document.getElementById(b))return;let d="🔔",g="info",f="View Details",x="";const B=(o||"").toLowerCase(),C=(t||"").toLowerCase();B.includes("invoice_overdue")?(d="🚨",g="critical",f="Pay / View Invoice",x="billing"):B.includes("invoice_paid")||B.includes("payment")?(d="💳",g="success",f="View Billing",x="billing"):B.includes("invoice")?(d="🧾",g="info",f="View Invoice",x="billing"):B.includes("job")&&(C.includes("overdue")||B.includes("overdue"))?(d="⚠️",g="critical",f="View Job",x="jobs"):B.includes("job")&&C.includes("due today")?(d="⏳",g="warning",f="View Job",x="jobs"):B.includes("job_created")?(d="📋",g="info",f="View Job",x="jobs"):B.includes("job")||B.includes("status")?(d="🔄",g="info",f="View Job",x="jobs"):B.includes("task")&&(C.includes("overdue")||B.includes("overdue"))?(d="⚠️",g="critical",f="Check Planner",x="dailytasks"):B.includes("task_completed")?(d="✅",g="success",f="View Planner",x="dailytasks"):B.includes("task")?(d="📅",g="warning",f="Open Planner",x="dailytasks"):B.includes("ticket")?(d="💬",g="info",f="View Ticket",x="tickets"):B.includes("target")&&(d="🎉",g="success",f="View Targets",x="targets");const I=n||f,c=document.createElement("div");c.id=b,c.className=`ci360-popup-card ci360-priority-${g}`,c.innerHTML=`
    <div class="ci360-popup-body">
      <div class="ci360-popup-header">
        <div class="ci360-popup-header-left">
          <span class="ci360-popup-icon">${d}</span>
          <span class="ci360-popup-title">${h(i||"CI360 Notification")}</span>
        </div>
        <div class="ci360-popup-header-right">
          <button type="button" class="ci360-popup-action-btn">${I} →</button>
          <button type="button" class="ci360-popup-close-btn" aria-label="Dismiss">✕</button>
        </div>
      </div>
      ${t?`<div class="ci360-popup-message">${h(t||"")}</div>`:""}
    </div>
  `,V(),J();const w=()=>{c.style.opacity="0",c.style.transform="translateX(20px) scale(0.96)",setTimeout(()=>c.remove(),180)},L=c.querySelector(".ci360-popup-close-btn");L&&(L.onclick=p=>{p.stopPropagation(),w()});const E=c.querySelector(".ci360-popup-dismiss-link");E&&(E.onclick=p=>{p.stopPropagation(),w()});const y=()=>{if(typeof a=="function")a();else if(x&&typeof window.ci360NavTab=="function"){const p=typeof _=="function"?_():null;let A=x;p&&p.role==="employee"&&(A==="jobs"||A==="myjobs")&&(A="myjobs"),window.ci360NavTab(A)}if(e)try{P(`/notifications/${e}/read`,{method:"PATCH"})}catch{}w()};for(c.querySelector(".ci360-popup-action-btn").onclick=p=>{p.stopPropagation(),y()},c.style.cursor="pointer",c.onclick=p=>{p.target.closest(".ci360-popup-close-btn")||p.target.closest(".ci360-popup-dismiss-link")||y()};m.children.length>=4;)m.removeChild(m.firstChild);m.appendChild(c),l||setTimeout(()=>{document.body.contains(c)&&w()},g==="critical"?14e3:u)}function xe(e=[]){if(!e||!e.length)return;const i=sessionStorage.getItem("ci360_client_overdue_dismissed");if(i&&Date.now()-Number(i)<45*60*1e3)return;const t=e.reduce((l,u)=>l+(Number(u.pendingAmount||u.totalAmount)||0),0),o=`
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
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${re(t)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${e.length} Overdue Invoice${e.length>1?"s":""}</span>
      </div>

      <div class="ci360-overdue-list">
        ${e.map(l=>{const u=l.dueDate?new Date(l.dueDate):new Date,m=Math.max(1,Math.floor((Date.now()-u.getTime())/(1e3*60*60*24)));return`
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${h(l.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${Q(l.dueDate)} <span style="color:var(--red-600);font-weight:700">(${m}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${re(l.pendingAmount||l.totalAmount||0)}</div>
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
  `,s=Y(o),n=s.querySelector("#ci360OverduePayBtn"),a=s.querySelector("#ci360OverdueRemindBtn");n&&(n.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove(),typeof window.ci360NavTab=="function"&&window.ci360NavTab("billing")}),a&&(a.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove()})}function Ee(){return`
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

        ${!Ie()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
    </div>`}function me(e){return e?e.startsWith("task_completed")?"🎉":e.startsWith("task_due")?"⚡":e.startsWith("task")?"✅":e.startsWith("target_completed")?"🎉":e.startsWith("target")?"🎯":e.startsWith("job_due")?"⏳":e.startsWith("job")?"📋":e.startsWith("ticket")?"🎫":e.startsWith("status")?"🔄":e.startsWith("test")?"🧪":"🔔":"🔔"}function te(e){if(!e)return"";const i=new Date(e),o=Math.floor((new Date-i)/1e3);if(o<60)return"Just now";const s=Math.floor(o/60);if(s<60)return`${s}m ago`;const n=Math.floor(s/60);if(n<24)return`${n}h ago`;const a=Math.floor(n/24);return a===1?"Yesterday":a<7?`${a}d ago`:Q(e)}function ce(e){if(!e)return;const i=me(e.type),t=(e.type||"").toLowerCase(),o=e.title||"Notification",s=e.message||"",n=e.createdAt?Q(e.createdAt)+" at "+new Date(e.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"Recently",a=te(e.createdAt),l=typeof _=="function"?_():null,u=l&&l.role==="employee";let m="Update",b="blue",v="",d="";const g=e.jobId||e.taskId||e.ticketId||e.targetId||null;t.includes("job")?(m="Job Deliverable",b="blue",d=u?"myjobs":"jobs",v=u?"Open in My Jobs 📋":"View Job 📁"):t.includes("task")?(m="Daily Planner",b="green",d="dailytasks",v="Open Daily Planner 📅"):t.includes("ticket")?(m="Support Ticket",b="brand",d="tickets",v="Open Support Tickets 🎫"):t.includes("target")?(m="Target Goal",b="gold",d="targets",v="View My Targets 🎯"):(t.includes("invoice")||t.includes("billing"))&&(m="Billing & Invoice",b="purple",d="billing",v="Open Billing 💳");const f=Array.isArray(e.attachments)&&e.attachments.length>0,x=Y(`
    <div class="notif-detail-modal" style="padding:4px 0">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border-xs)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:12px;background:var(--bg-elevated);border:1px solid var(--border-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:var(--shadow-xs)">
            ${i}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap">
              <span class="badge ${b}" style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${m}</span>
              <span style="font-size:11.5px;color:var(--text-4)">${a}</span>
            </div>
            <div style="font-size:11px;color:var(--text-4)">${n}</div>
          </div>
        </div>
        <button type="button" class="btn ghost small notif-modal-close-btn" aria-label="Close" style="padding:4px 8px;font-size:16px;line-height:1;border-radius:6px;color:var(--text-3)">✕</button>
      </div>

      <h3 style="font-size:16.5px;font-weight:800;color:var(--text-1);margin:0 0 12px 0;line-height:1.35;letter-spacing:-0.3px">
        ${h(o)}
      </h3>

      <div style="background:var(--bg-elevated);border:1px solid var(--border-xs);border-radius:var(--r-md);padding:14px 16px;margin-bottom:16px;font-size:13.5px;color:var(--text-2);line-height:1.6;white-space:pre-wrap;word-break:break-word">
        ${h(s)}
      </div>

      ${f?`
        <div style="margin-bottom:16px">
          <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Attachments (${e.attachments.length})</div>
          ${ie(e.attachments,{title:"Attachments"})}
        </div>
      `:""}

      <div class="modal-actions" style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border-xs);display:flex;justify-content:flex-end;align-items:center;gap:10px;flex-wrap:wrap">
        <button type="button" class="btn secondary notif-modal-dismiss-btn" style="font-weight:600">Close</button>
        ${d?`
          <button type="button" class="btn primary notif-modal-go-btn" style="font-weight:700;display:inline-flex;align-items:center;gap:6px">
            <span>${v}</span>
          </button>
        `:""}
      </div>
    </div>
  `),B=()=>x.remove(),C=x.querySelector(".notif-modal-close-btn"),I=x.querySelector(".notif-modal-dismiss-btn"),c=x.querySelector(".notif-modal-go-btn");C&&(C.onclick=B),I&&(I.onclick=B),c&&(c.onclick=()=>{B(),typeof window.ci360NavTab=="function"&&window.ci360NavTab(d,g)})}function Ae(){const e=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),t=document.getElementById("notifBadge"),o=document.getElementById("notifList"),s=document.getElementById("clearNotifBtn"),n=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),l=document.getElementById("notifDismissBannerBtn"),u=document.getElementById("notifPermissionBanner"),m=document.getElementById("notifUnreadBadge");if(!e||!i)return;pe();function b(){const y=document.getElementById("notifPermissionBanner");y&&(y.classList.add("hidden"),y.style.setProperty("display","none","important"),y.remove())}function v(){if(Ie()){b();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?b():Notification.permission==="default"&&u&&u.style.setProperty("display","flex","important"))}v(),l&&(l.onclick=y=>{y.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),b()}),a&&(a.onclick=async y=>{y.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),b(),await ue(),b()}),Ce()&&se(),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),ee();let d=[],g="all";function f(){if(!o)return;let y=d;if(g==="task"?y=d.filter(p=>(p.type||"").includes("task")):g==="target"?y=d.filter(p=>(p.type||"").includes("target")):g==="job"?y=d.filter(p=>(p.type||"").includes("job")):g==="ticket"&&(y=d.filter(p=>(p.type||"").includes("ticket"))),y.length===0){o.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${g==="all"?"":g+" "}notifications</div>`;return}o.innerHTML=y.map(p=>{const A=me(p.type);return`
        <div class="notif-item ${p.read?"":"unread"}" data-id="${p._id}" data-type="${h(p.type||"")}">
          <div class="notif-icon">${A}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${h(p.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${te(p.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${h(p.message)}</div>
          </div>
          <div style="color:var(--text-4);font-size:16px;line-height:1;margin-top:2px;flex-shrink:0">›</div>
        </div>`}).join(""),o.querySelectorAll(".notif-item").forEach(p=>{p.onclick=async()=>{const A=p.dataset.id,$=d.find(r=>String(r._id)===String(A));if(A&&p.classList.contains("unread")){p.classList.remove("unread");try{await P(`/notifications/${A}/read`,{method:"PATCH"})}catch{}const r=d.filter(k=>!k.read&&String(k._id)!==String(A)).length;t&&(t.style.display=r>0?"flex":"none",t.textContent=r>99?"99+":r),m&&(m.textContent=r>0?`${r} new`:"",m.style.display=r>0?"inline-block":"none")}if(w(),$)ce($);else{const r=p.dataset.type,k=typeof _=="function"?_():null,T=k&&k.role==="employee";r&&r.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):r&&r.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab(T?"myjobs":"jobs"):r&&r.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):r&&r.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}}})}let x={jobs:0,tasks:0,invoices:0,tickets:0},B=!1;async function C(y=!1){try{const p=await U("/notifications");d=p.notifications||[];const A=p.unreadCount||0;if(t&&(t.textContent=A>99?"99+":A,t.style.display=A>0?"flex":"none"),m&&(m.textContent=A>0?`${A} new`:"",m.style.display=A>0?"inline-block":"none"),ee(),p.overdue&&p.overdue.invoices&&p.overdue.invoices.length>0){const $=typeof _=="function"?_():null;$&&$.role==="client"&&xe(p.overdue.invoices)}if(p.syncTimestamps){const $=p.syncTimestamps;if(!B)x={...$},B=!0;else{const r=[];$.jobs>(x.jobs||0)&&r.push("jobs"),$.tasks>(x.tasks||0)&&r.push("tasks"),$.invoices>(x.invoices||0)&&r.push("invoices"),$.tickets>(x.tickets||0)&&r.push("tickets"),r.length>0&&(x={...$},window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{changedKeys:r,syncTimestamps:$,overdue:p.overdue}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({changedKeys:r,syncTimestamps:$}))}}if(ke){const $=d.filter(r=>!r.read&&!D.has(String(r._id)));if($.length>0){for(const r of $){const k=String(r._id);we.add(k),le({id:k,title:r.title||"CI360 Alert",message:r.message||"",type:r.type}),await W({title:r.title||"CI360 Alert",message:r.message||"",type:r.type,id:k})}Z(),window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{newNotifications:$}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({newNotifications:$})}}else{const $=d.filter(r=>!r.read&&!D.has(String(r._id)));if(d.forEach(r=>we.add(String(r._id))),$.length>0){const r=$.slice(0,3);for(const k of r){const T=String(k._id);le({id:T,title:k.title||"CI360 Alert",message:k.message||"",type:k.type}),await W({title:k.title||"CI360 Alert",message:k.message||"",type:k.type,id:T})}$.forEach(k=>D.add(String(k._id))),Z()}else d.forEach(r=>D.add(String(r._id))),Z();ke=!0}f()}catch{o&&d.length===0&&(o.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=C,window.showInAppPopupAlert=le,window.showClientOverdueInvoiceModal=xe),C(),window.__ci360PollInterval=setInterval(C,6e3),window.addEventListener("focus",()=>C(!0)),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(y=>{y.onclick=p=>{p.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(A=>A.classList.remove("active")),y.classList.add("active"),g=y.dataset.filter,f()}});const I=document.getElementById("notifBackdrop");function c(){i.style.display="flex",i.classList.add("open"),I&&(I.style.display="block",I.classList.add("open")),e.setAttribute("aria-expanded","true"),v();const y=document.getElementById("topbarUserDropdown");y&&(y.style.display="none"),C()}function w(){i.style.display="none",i.classList.remove("open"),I&&(I.style.display="none",I.classList.remove("open")),e.setAttribute("aria-expanded","false")}function L(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?w():c()}window.ci360CloseNotifications=w;const E=document.getElementById("notifCloseBtn");E&&(E.onclick=y=>{y.stopPropagation(),w()}),I&&(I.onclick=y=>{y.stopPropagation(),w()}),e.onclick=y=>{y.stopPropagation(),L()},n&&(n.onclick=async y=>{y.stopPropagation();try{await P("/notifications/read",{method:"PATCH"}),t.style.display="none",m&&(m.textContent="",m.style.display="none"),d.forEach(p=>p.read=!0),f(),S("All notifications marked as read")}catch(p){S(p.message,!0)}}),window.__ci360NotifDocClickHandler&&document.removeEventListener("click",window.__ci360NotifDocClickHandler),window.__ci360NotifDocClickHandler=y=>{!i.contains(y.target)&&!e.contains(y.target)&&w()},document.addEventListener("click",window.__ci360NotifDocClickHandler),s&&(s.onclick=async y=>{y.stopPropagation();try{await G("/notifications"),d=[],o.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',t.style.display="none",m&&(m.textContent="",m.style.display="none"),S("Notifications cleared")}catch(p){S(p.message,!0)}});try{const p=new URLSearchParams(window.location.search).get("notifId");p&&U("/notifications").then(A=>{const r=(A.notifications||[]).find(k=>String(k._id)===String(p));if(r){ce(r);const k=window.location.pathname+window.location.hash;window.history.replaceState(null,"",k)}}).catch(()=>{})}catch{}}function Fe({user:e,currentRole:i,activeTab:t,tabs:o,title:s,subtitle:n}){const a=e&&e.name?e.name.charAt(0).toUpperCase():"U",l=e&&(e.role==="superadmin"||e.role==="admin")?"Admin":e&&e.role==="accounts"?"Accounts":e&&e.role==="employee"?"Employee":e&&e.role==="client"?"Client":e&&e.role?e.role.toUpperCase():"User",u=e&&e.name?e.name:"User",m=e&&e.email?e.email:e&&e.username?e.username:"",b=o&&o.some(f=>f.key==="logjob"),v=o&&o.find(f=>f.key===t),d=s||v&&v.label||"Dashboard";let g=[];return i==="accounts"?g=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:t==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:t==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(t),isMore:!0}]:i==="superadmin"||i==="admin"?g=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="dashboard"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(t),isMore:!0}]:i==="employee"?g=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:t==="myjobs"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"proposals",label:"Proposals",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',active:t==="proposals"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:t==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","proposals","targets"].includes(t),isMore:!0}]:g=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:t==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(t),isMore:!0}],`
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
          ${o.map(f=>`
            <button type="button" class="sidebar-item ${t===f.key?"active":""}" data-tab="${f.key}" aria-current="${t===f.key?"page":"false"}">
              <span class="icon">${f.icon||"📌"}</span>
              <span>${f.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${h(e?e.name:"User")}</div>
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
              <h1 class="page-heading-title">${h(d)}</h1>
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

            ${b?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${M()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${M()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${Ee()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${a}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${h(u)}</span>
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
                      <div class="tud-name">${h(u)}</div>
                      ${m?`<div class="tud-email">${h(m)}</div>`:""}
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
          ${g.map(f=>`
            <button type="button" class="mbn-item ${f.active?"active":""}" data-tab="${f.key}" ${f.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${f.iconSvg}</span>
              <span class="mbn-label">${h(f.label)}</span>
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
              ${o.map(f=>`
                <button type="button" class="mms-card ${t===f.key?"active":""}" data-tab="${f.key}">
                  <span class="mms-card-icon">${f.icon||"📌"}</span>
                  <span class="mms-card-label">${h(f.label)}</span>
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
    </div>`}function Ve(e){const i=document.getElementById("mobileNavToggle"),t=document.getElementById("appSidebar"),o=document.getElementById("sidebarOverlay");function s(){t&&t.classList.add("open"),o&&o.classList.add("open")}function n(){t&&t.classList.remove("open"),o&&o.classList.remove("open")}i&&(i.onclick=s),o&&(o.onclick=n);const a=document.getElementById("mobileMoreBackdrop"),l=document.getElementById("mobileMoreSheet"),u=document.getElementById("mmsCloseBtn"),m=document.getElementById("mobileMoreBtn");function b(){a&&a.classList.add("active"),l&&l.classList.add("active")}function v(){a&&a.classList.remove("active"),l&&l.classList.remove("active")}m&&(m.onclick=r=>{r.stopPropagation(),b()}),u&&(u.onclick=v),a&&(a.onclick=r=>{r.target===a&&v()}),document.querySelectorAll(".mbn-item").forEach(r=>{r.dataset.tab&&r.dataset.tab!=="__more__"&&(r.onclick=()=>{v(),e&&e(r.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(r=>{r.onclick=()=>{v(),e&&e(r.dataset.tab)}});const d=document.getElementById("mmsToggleThemeBtn");d&&(d.onclick=()=>{j(M()==="dark"?"light":"dark")});const g=document.getElementById("mmsNotifsBtn");g&&(g.onclick=()=>{v();const r=document.getElementById("notifBellBtn");r&&r.click()});const f=document.getElementById("mmsLogoutBtn");f&&(f.onclick=R);const x=document.getElementById("mobileCalBtn");x&&(x.onclick=()=>{const r=document.querySelector(".period-row");r&&(r.scrollIntoView({behavior:"smooth",block:"center"}),r.classList.add("pulse-highlight"),setTimeout(()=>r.classList.remove("pulse-highlight"),1200))});const B=document.getElementById("tudMobileThemeBtn");B&&(B.onclick=r=>{r.stopPropagation(),j(M()==="dark"?"light":"dark")});const C=document.getElementById("tudMobileNotifsBtn");C&&(C.onclick=r=>{r.stopPropagation();const k=document.getElementById("topbarUserDropdown");k&&(k.style.display="none");const T=document.getElementById("notifBellBtn");T&&T.click()});const I=document.getElementById("tudMobileSettingsBtn");I&&(I.onclick=r=>{r.stopPropagation();const k=document.getElementById("topbarUserDropdown");k&&(k.style.display="none");const T=document.querySelector('[data-tab="settings"], [data-tab="manage"]');T&&e?e(T.dataset.tab):ne()});const c=document.getElementById("tudProfileSettingsBtn");c&&(c.onclick=r=>{r.stopPropagation();const k=document.getElementById("topbarUserDropdown");k&&(k.style.display="none");const T=document.querySelector('[data-tab="settings"], [data-tab="manage"]');T&&e?e(T.dataset.tab):ne()});const w=document.getElementById("tudMobileHelpBtn");w&&(w.onclick=r=>{r.stopPropagation();const k=document.getElementById("topbarUserDropdown");k&&(k.style.display="none"),Y(`
        <div style="padding:24px;text-align:center;">
          <div style="font-size:36px;margin-bottom:12px;">💬</div>
          <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
          <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
            For immediate technical assistance, client onboarding, or workspace inquiries, reach out to your system administrator or support team.
          </p>
          <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
        </div>
      `)});const L=document.getElementById("logoutBtnMobile");L&&(L.onclick=R);const E=document.getElementById("topbarUserBtn"),y=document.getElementById("topbarUserDropdown");E&&y&&(E.onclick=r=>{r.stopPropagation();const k=y.style.display!=="none";y.style.display=k?"none":"block",E.setAttribute("aria-expanded",String(!k)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",r=>{!y.contains(r.target)&&!E.contains(r.target)&&(y.style.display="none",E.setAttribute("aria-expanded","false"))}));const p=document.getElementById("tudThemeToggleBtn");p&&(p.onclick=()=>{j(M()==="dark"?"light":"dark")});const A=document.getElementById("topbarQuickLogJobBtn");A&&(A.onclick=()=>{e&&e("logjob")});const $=document.getElementById("logoutBtn");$&&($.onclick=R),Ae(),document.querySelectorAll(".sidebar-item").forEach(r=>{r.onclick=()=>{n(),e&&e(r.dataset.tab)}}),Je(e)}function Je(e){const i=document.getElementById("cmdPaletteBackdrop"),t=document.getElementById("cmdSearchInput"),o=document.getElementById("cmdResultsList"),s=document.getElementById("topbarCmdTrigger"),n=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),l=document.getElementById("cmdCloseKbd");if(!i||!t||!o)return;const u=Array.from(document.querySelectorAll(".sidebar-item")),m=u.map(c=>{var w,L;return{type:"tab",id:c.dataset.tab,label:((w=c.querySelector("span:last-child"))==null?void 0:w.textContent)||c.dataset.tab,icon:((L=c.querySelector(".icon"))==null?void 0:L.textContent)||"📌",sub:"Navigate to section",action:()=>{e&&e(c.dataset.tab)}}});u.some(c=>c.dataset.tab==="logjob")&&m.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{e&&e("logjob")}}),m.push({type:"action",id:"toggle-theme",label:M()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{j(M()==="dark"?"light":"dark")}}),m.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const c=document.getElementById("notifBellBtn");c&&c.click()}}),m.push({type:"action",id:"account-settings",label:"Account Settings & Credentials",icon:"⚙️",sub:"Update username, email, and password",action:()=>{ne()}}),m.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>R()});let v=0,d=[...m];function g(){if(!d.length){o.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}o.innerHTML=d.map((c,w)=>`
      <div class="cmd-result ${w===v?"selected":""}" data-idx="${w}">
        <div class="cmd-result-icon">${c.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${h(c.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${h(c.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),o.querySelectorAll(".cmd-result").forEach(c=>{c.onmouseenter=()=>{v=Number(c.dataset.idx),f()},c.onclick=()=>{x(Number(c.dataset.idx))}})}function f(){o.querySelectorAll(".cmd-result").forEach((c,w)=>{c.classList.toggle("selected",w===v)})}function x(c){const w=d[c];w&&w.action&&(C(),w.action())}function B(){const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),i.classList.add("open"),t.value="",d=[...m],v=0,g(),setTimeout(()=>t.focus(),50)}function C(){i.classList.remove("open"),t.blur()}s&&(s.onclick=B),n&&(n.onclick=B),a&&(a.onclick=()=>{const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),B()}),l&&(l.onclick=C),i.onclick=c=>{c.target===i&&C()},t.oninput=()=>{const c=t.value.trim().toLowerCase();c?d=m.filter(w=>w.label.toLowerCase().includes(c)||w.sub.toLowerCase().includes(c)):d=[...m],v=0,g()},t.onkeydown=c=>{if(c.key==="ArrowDown"){if(c.preventDefault(),d.length>0){v=(v+1)%d.length,f();const w=o.querySelector(".cmd-result.selected");w&&w.scrollIntoView({block:"nearest"})}}else if(c.key==="ArrowUp"){if(c.preventDefault(),d.length>0){v=(v-1+d.length)%d.length,f();const w=o.querySelector(".cmd-result.selected");w&&w.scrollIntoView({block:"nearest"})}}else c.key==="Enter"?(c.preventDefault(),x(v)):c.key==="Escape"&&(c.preventDefault(),C())};const I=c=>{(c.metaKey||c.ctrlKey)&&c.key.toLowerCase()==="k"?(c.preventDefault(),i.classList.contains("open")?C():B()):c.key==="Escape"&&i.classList.contains("open")&&C()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=I,window.addEventListener("keydown",I)}function We(e=4){return`
    <div class="grid grid-${Math.min(e,4)}" style="margin-bottom:24px">
      ${Array(e).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function Ke(e,i,t="📁",o=""){return`
    <div class="empty">
      <span class="empty-icon">${t}</span>
      <h3>${h(e)}</h3>
      <p>${h(i)}</p>
      ${o}
    </div>`}function Ge(e,i,t="",o="📊",s=""){let n="";return s&&(n=`<span class="kpi-trend ${s.startsWith("+")||s.includes("↑")||s.toLowerCase().includes("up")?"up":"down"}">${h(s)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${h(e)}</span>
        <div class="kpi-icon">${o}</div>
      </div>
      <div class="kpi-value">${h(i)}</div>
      <div class="kpi-sub">${n}<span>${h(t)}</span></div>
    </div>`}function Qe(e,i="gray"){return`<span class="badge ${i}">${h(e)}</span>`}function Ye(e,i="indigo"){const t=Math.min(100,Math.max(0,Number(e)||0));return`
    <div class="progress-bar-wrap" title="${t.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${t}%"></div>
    </div>`}function Xe(e){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([t,o])=>`<button class="pchip ${e===t?"active":""}" data-period="${t}">${o}</button>`).join("")}</div>`}function Ze(e){if(!e)return"U";const i=e.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function ae(e){if(e=Number(e)||0,e===0)return"0 B";const i=1024,t=["B","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,o)).toFixed(1))+" "+t[o]}function X(e="",i=""){const t=(e.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(t)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:t==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(t)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(t)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(t)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(t)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(t)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function et(e){return e?X(e.name||e.filename||"",e.type||"").cls==="img":!1}function fe(e){if(!e||!e.url)return;const i=X(e.name,e.type),t=i.cls==="img",o=i.cls==="pdf",s=h(e.name||"Attachment"),n=ae(e.size),a=document.createElement("div");a.className="preview-modal-overlay",a.innerHTML=`
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${i.icon}</span>
          <span>${s}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${n})</span>
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
        `:o?`
          <iframe src="${e.url}" title="${s}"></iframe>
        `:`
          <div style="text-align:center;padding:40px 20px">
            <div style="font-size:48px;margin-bottom:12px">${i.icon}</div>
            <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${s}</div>
            <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${n}</div>
            <a href="${e.url}" download="${s}" target="_blank" class="btn gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Attachment
            </a>
          </div>
        `}
      </div>
    </div>
  `,a.onclick=l=>{(l.target===a||l.target.closest(".preview-modal-close"))&&a.remove()},document.body.appendChild(a)}function ie(e=[],i={}){if(!e||!e.length)return"";const t=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${h(i.title)} <span style="font-weight:500;color:var(--text-4)">(${e.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${e.map((o,s)=>{const n=o.type==="url"||/^https?:\/\//i.test(o.url||""),a=n?{cls:"file-type-doc",icon:"🌐"}:X(o.name,o.type),l=h(o.name||(n?"Live Deliverable URL":"File")),u=n?"Live Link":ae(o.size);return`
            <div class="attachment-chip" data-idx="${s}" title="${l} (${u})">
              <span class="file-type-icon ${a.cls}" style="width:22px;height:22px;font-size:12px">${a.icon}</span>
              ${n?`
                <a href="${o.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-name" style="text-decoration:none;color:inherit;cursor:pointer" title="Open live URL in new tab">
                  ${l} <span style="font-size:11px;opacity:0.75">↗</span>
                </a>
              `:`
                <span class="attachment-chip-name" onclick="window.__openPreview(${s}, this)">${l}</span>
              `}
              <span class="attachment-chip-size">${u}</span>
              <div class="attachment-chip-actions">
                ${n?`
                  <a href="${o.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-btn" title="Open Live Link" onclick="event.stopPropagation()">🔗</a>
                `:`
                  <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${s}, this)">👁️</button>
                  <a href="${o.url}" download="${l}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                `}
                ${t?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${s}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const N={};async function de(e){const i=Array.from(e||[]);if(!i.length)return[];const o=(await Promise.all(i.map(async s=>new Promise(n=>{const a=new FileReader;a.onload=()=>{n({name:s.name,type:s.type,size:s.size,base64:a.result,data:a.result})},a.onerror=()=>n(null),a.readAsDataURL(s)})))).filter(Boolean);if(!o.length)return[];try{const s=await oe("/upload",{files:o});if(s&&s.files&&s.files.length)return s.files}catch(s){console.warn("Backend upload failed, fallback to base64 data URLs:",s)}return o.map(s=>({name:s.name,url:s.base64,size:s.size,type:s.type,uploadedAt:new Date}))}function ge({id:e="uploader",label:i="Attachments & Files",subtitle:t="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:o=!0,accept:s="*/*",maxFiles:n=10}={}){return`
    <div class="uploader-container" id="container-${e}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${h(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${e}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${e}">
        <input type="file" id="input-${e}" ${o?"multiple":""} accept="${s}" style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${h(t)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${e}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${e}"></div>
    </div>
  `}function ve(e,i={}){const t=document.getElementById("zone-"+e),o=document.getElementById("input-"+e),s=document.getElementById("list-"+e),n=document.getElementById("count-"+e);N[e]=i.existing?[...i.existing]:[];function a(){const l=N[e]||[];if(n&&(n.textContent=`${l.length} file${l.length===1?"":"s"} attached`),!!s){if(!l.length){s.innerHTML="";return}s.innerHTML=l.map((u,m)=>{const b=X(u.name,u.type),v=h(u.name||"File"),d=ae(u.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${b.cls}">${b.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${v}">${v}</div>
              <div class="uploader-file-size">${b.label} · ${d}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${e}', ${m})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${e}', ${m})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(l)}}window.__removeUploaderFile=(l,u)=>{if(N[l]){N[l].splice(u,1);const m=window[`__update_${l}`];m&&m()}},window.__previewUploaderFile=(l,u)=>{const m=(N[l]||[])[u];m&&fe(m)},window[`__update_${e}`]=a,t&&o&&(t.onclick=l=>{l.target.tagName!=="BUTTON"&&!l.target.closest("button")&&o.click()},t.ondragover=l=>{l.preventDefault(),t.classList.add("dragover")},t.ondragleave=()=>t.classList.remove("dragover"),t.ondrop=async l=>{if(l.preventDefault(),t.classList.remove("dragover"),l.dataTransfer&&l.dataTransfer.files&&l.dataTransfer.files.length){S("Uploading files… ⏳");const u=await de(l.dataTransfer.files);N[e]=[...N[e]||[],...u],a(),S("Files attached! ✓")}},o.onchange=async()=>{if(o.files&&o.files.length){S("Uploading files… ⏳");const l=await de(o.files);N[e]=[...N[e]||[],...l],a(),S("Files attached! ✓"),o.value=""}}),a()}function ye(e){return N[e]||[]}function Me(e,i=[]){N[e]=[...i];const t=window[`__update_${e}`];t&&t()}window.__openPreview=(e,i)=>{const t=i.closest(".attachment-chips-wrap");if(!t)return;const o=i.closest(".attachment-chip");if(!o)return;const s=Number(o.dataset.idx),n=t.dataset.attachments;if(n)try{const a=JSON.parse(decodeURIComponent(n));a[s]&&fe(a[s])}catch{}};function tt(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");return`
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
        ${ge({id:"tkup-"+t,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const it={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},nt={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function ot(e,i){const t=(e.status||"Open").toLowerCase().replace(" ","-"),o=e.status==="Open",s=(e._id||"").slice(-4).toUpperCase(),n=Ze(e.userName),a=encodeURIComponent(JSON.stringify(e.attachments||[])),l=encodeURIComponent(JSON.stringify(e.adminAttachments||[]));return`
    <div class="ticket-card status-${t}" id="tkcard-${e._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${s}</span>
            <span class="ticket-subject">${h(e.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${it[e.status]||"gray"}">
            ${o?'<span class="pulse-dot"></span>':""} ${h(e.status)}
          </span>
          <span class="badge ${nt[e.priority]||"gray"}">${h(e.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${n}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${h(e.userName)}
            <span class="ticket-role-pill">${h(e.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${te(e.createdAt)} · ${Q(e.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${h(e.message)}</div>

      ${e.attachments&&e.attachments.length?`
        <div data-attachments="${a}">
          ${ie(e.attachments,{title:"Ticket Attachments"})}
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
              ${e.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${te(e.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${h(e.adminReply)}</div>
            ${e.adminAttachments&&e.adminAttachments.length?`
              <div data-attachments="${l}">
                ${ie(e.adminAttachments,{title:"Support Attached Files"})}
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
            <textarea id="tkreplytxt-${e._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${h(e.adminReply||"")}</textarea>
            ${ge({id:"tkreplyup-"+e._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${e._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${e._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function z(e,i,t){const o=document.getElementById("tklist-"+i),s=document.getElementById("tkcnt-"+i);if(o)try{const n=await U("/tickets/job/"+e);s&&(s.textContent=n.length),n.length?(o.innerHTML=n.map(a=>ot(a,t)).join(""),st(e,i,t,o,n)):o.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{o.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function st(e,i,t,o,s){t&&(o.querySelectorAll(".tk-status-sel").forEach(n=>{n.onchange=async()=>{try{await O("/tickets/"+n.dataset.tkid,{status:n.value}),S("Status updated"),z(e,i,t)}catch(a){S(a.message,!0)}}}),o.querySelectorAll(".tk-quick-resolve-btn").forEach(n=>{n.onclick=async()=>{try{await O("/tickets/"+n.dataset.tkid,{status:"Resolved"}),S("Ticket marked as Resolved! 🎉"),z(e,i,t)}catch(a){S(a.message,!0)}}}),o.querySelectorAll(".ticket-template-btn").forEach(n=>{n.onclick=()=>{const a=document.getElementById("tkreplytxt-"+n.dataset.tkid);a&&(a.value=n.dataset.tpl,a.focus())}}),o.querySelectorAll(".tk-reply-toggle").forEach(n=>{n.onclick=()=>{const a=n.dataset.tkid,l=document.getElementById("tkreplyform-"+a);if(l){l.classList.toggle("show");const u=s.find(m=>m._id===a);ve("tkreplyup-"+a,{existing:u?u.adminAttachments:[]})}}}),o.querySelectorAll(".tk-reply-cancel").forEach(n=>{n.onclick=()=>{const a=document.getElementById("tkreplyform-"+n.dataset.tkid);a&&a.classList.remove("show")}}),o.querySelectorAll(".tk-reply-save").forEach(n=>{n.onclick=async()=>{const a=n.dataset.tkid,l=document.getElementById("tkreplytxt-"+a);if(!l)return;const u=ye("tkreplyup-"+a);try{await O("/tickets/"+a,{adminReply:l.value.trim(),adminAttachments:u}),S("Response saved! 🛡️"),z(e,i,t)}catch(m){S(m.message,!0)}}}),o.querySelectorAll(".tk-del-btn").forEach(n=>{n.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await G("/tickets/"+n.dataset.tkid),S("Ticket deleted"),z(e,i,t)}catch(a){S(a.message,!0)}}}))}function at(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");z(e,t,i),ve("tkup-"+t);const o=document.querySelector(`[data-jobid="${e}"].ticket-toggle-btn`);o&&(o.onclick=()=>{const a=document.getElementById("tkform-"+t);if(!a)return;const l=a.style.display==="block";a.style.display=l?"none":"block",o.textContent=l?"+ Raise Ticket":"✕ Cancel"});const s=document.querySelector(`.tk-cancel-btn[data-safeid="${t}"]`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+t);a&&(a.style.display="none"),o&&(o.textContent="+ Raise Ticket")});const n=document.querySelector(`.tk-submit-btn[data-safeid="${t}"]`);n&&(n.onclick=async()=>{var b,v;const a=(b=(document.getElementById("tksub-"+t)||{}).value)==null?void 0:b.trim(),l=(v=(document.getElementById("tkmsg-"+t)||{}).value)==null?void 0:v.trim(),u=(document.getElementById("tkpri-"+t)||{}).value,m=ye("tkup-"+t);if(!a){S("Please enter a subject",!0);return}if(!l){S("Please enter a message",!0);return}n.disabled=!0,n.textContent="Submitting…";try{await oe("/tickets",{jobId:e,subject:a,message:l,priority:u,attachments:m}),S("Ticket submitted! 🎫");const d=document.getElementById("tkform-"+t);d&&(d.style.display="none"),o&&(o.textContent="+ Raise Ticket");const g=document.getElementById("tksub-"+t),f=document.getElementById("tkmsg-"+t);g&&(g.value=""),f&&(f.value=""),Me("tkup-"+t,[]),z(e,t,i)}catch(d){S(d.message,!0)}finally{n.disabled=!1,n.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function lt(){return""}function rt(){}function Te(e={}){const{title:i="Account Settings & Credentials",subtitle:t="Update your personal name, login email, and security password",showCardWrapper:o=!0,formId:s="accSettingsForm"}=e,n=_()||{},a=n.name?n.name.charAt(0).toUpperCase():"U",l=(n.role||"user").toUpperCase();return`
    <div class="${o?"card":""}" style="max-width:760px;margin:0 auto;width:100%;" id="${s}-wrap">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--gold-500,#d4af37),#b8860b);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:20px;box-shadow:0 4px 12px rgba(212,175,55,0.25);flex-shrink:0;">
          ${h(a)}
        </div>
        <div style="min-width:0;flex:1;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <h3 style="font-size:18px;font-weight:700;color:var(--text-1);margin:0;">${h(i)}</h3>
            <span class="badge gold" style="font-size:11px;padding:2px 8px;">${h(l)}</span>
          </div>
          <div style="font-size:13px;color:var(--text-3);margin-top:2px;">${h(t)}</div>
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
              <input type="text" id="${s}-name" class="input" value="${h(n.name||"")}" placeholder="Your display name" required autocomplete="name">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${s}-email" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Email Address *</label>
              <input type="email" id="${s}-email" class="input" value="${h(n.email||"")}" placeholder="name@company.com" required autocomplete="email">
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
  `}function _e(e,i={}){const{formId:t="accSettingsForm",onSaved:o=null,modalBg:s=null}=i,n=e||document;n.querySelectorAll(".pass-toggle-btn").forEach(b=>{b.onclick=()=>{const v=b.dataset.target,d=n.querySelector("#"+v)||document.getElementById(v);if(d){const g=d.type==="password";d.type=g?"text":"password",b.textContent=g?"🙈":"👁️",b.style.opacity=g?"1":"0.65"}}});const a=n.querySelector("#"+t+"-saveBtn")||document.getElementById(t+"-saveBtn"),l=n.querySelector("#"+t+"-alert")||document.getElementById(t+"-alert");function u(b,v=!0){l&&(l.style.display="block",l.style.background=v?"rgba(239,68,68,0.12)":"rgba(34,197,94,0.12)",l.style.border=v?"1px solid rgba(239,68,68,0.3)":"1px solid rgba(34,197,94,0.3)",l.style.color=v?"#ef4444":"#22c55e",l.innerHTML=(v?"⚠️ ":"✓ ")+h(b))}function m(){l&&(l.style.display="none")}a&&(a.onclick=async()=>{m();const b=n.querySelector("#"+t+"-name")||document.getElementById(t+"-name"),v=n.querySelector("#"+t+"-email")||document.getElementById(t+"-email"),d=n.querySelector("#"+t+"-currentPass")||document.getElementById(t+"-currentPass"),g=n.querySelector("#"+t+"-newPass")||document.getElementById(t+"-newPass"),f=n.querySelector("#"+t+"-confirmPass")||document.getElementById(t+"-confirmPass"),x=((b==null?void 0:b.value)||"").trim(),B=((v==null?void 0:v.value)||"").trim(),C=(d==null?void 0:d.value)||"",I=(g==null?void 0:g.value)||"",c=(f==null?void 0:f.value)||"";if(!x){u("Please enter your full name or username.",!0),b==null||b.focus();return}if(!B||!B.includes("@")){u("Please enter a valid email address.",!0),v==null||v.focus();return}if(I||c){if(!C){u("Please enter your current password to set a new password.",!0),d==null||d.focus();return}if(I.length<6){u("New password must be at least 6 characters long.",!0),g==null||g.focus();return}if(I!==c){u("New passwords do not match. Please re-check.",!0),f==null||f.focus();return}}const w={name:x,email:B};I&&(w.currentPassword=C,w.newPassword=I);const L=a.innerHTML;a.disabled=!0,a.innerHTML="<span>Saving Changes…</span>";try{const E=await O("/auth/profile",w);E&&E.token&&E.user&&Be(E.token,E.user),document.querySelectorAll(".topbar-user-name, .sidebar-user .name, .tud-name").forEach(p=>{p.textContent=E.user.name}),document.querySelectorAll(".tud-email").forEach(p=>{p.textContent=E.user.email});const y=E.user.name?E.user.name.charAt(0).toUpperCase():"U";document.querySelectorAll(".topbar-user-avatar span, .user-avatar, .tud-avatar").forEach(p=>{p.classList.contains("topbar-online-dot")||(p.textContent=y)}),d&&(d.value=""),g&&(g.value=""),f&&(f.value=""),u("Account credentials updated successfully!",!1),S("Account settings saved! ✓"),typeof o=="function"&&o(E.user),s&&setTimeout(()=>{try{s.remove()}catch{}},900)}catch(E){u(E.message||"Failed to update credentials. Please try again.",!0),S(E.message||"Update failed",!0)}finally{a.disabled=!1,a.innerHTML=L}})}function ne(){const e=`
    <div style="position:relative;padding:12px 6px;">
      <button type="button" id="closeAccSettingsModalBtn" style="position:absolute;top:-4px;right:0;border:none;background:transparent;color:var(--text-3);font-size:20px;cursor:pointer;padding:6px 10px;" aria-label="Close modal">✕</button>
      ${Te({title:"Account Settings",subtitle:"Manage your personal email, username, and password",showCardWrapper:!1,formId:"modalAccSettingsForm"})}
    </div>
  `,i=Y(e),t=i.querySelector("#closeAccSettingsModalBtn");return t&&(t.onclick=()=>i.remove()),_e(i,{formId:"modalAccSettingsForm",modalBg:i}),i}window.__setTheme=function(e){j(e)};Object.assign(window,{getToken:K,getUser:_,setSession:Be,clearSession:F,requireAuth:Ne,initTheme:$e,api:P,apiGet:U,apiPost:oe,apiPut:O,apiPatch:Pe,apiDelete:G,fmtINR:re,fmtHours:qe,escapeHtml:h,fmtDate:Q,flashToast:S,openModal:Y,logout:R,getTheme:M,setTheme:j,initServiceWorker:pe,playNotificationChime:V,triggerPhoneVibration:J,requestNotificationPermission:ue,triggerSystemNotification:W,fmtFileSize:ae,getFileCategory:X,isImageAttachment:et,openFilePreviewModal:fe,renderAttachmentChips:ie,uploadFilesToServer:de,renderAttachmentUploader:ge,bindAttachmentUploader:ve,getUploaderAttachments:ye,setUploaderAttachments:Me,renderRoleSwitcher:lt,bindRoleSwitcher:rt,renderNotificationBell:Ee,initNotificationBell:Ae,openNotificationModal:ce,getNotifIcon:me,renderAppShell:Fe,bindAppShellEvents:Ve,renderSkeletonCards:We,renderEmptyState:Ke,renderKpiCard:Ge,renderBadge:Qe,renderProgressBar:Ye,renderPeriodPicker:Xe,renderSupportTicketSection:tt,bindSupportTicketSection:at,renderAccountSettingsCard:Te,bindAccountSettingsCard:_e,openAccountSettingsModal:ne,getArchive:De,restoreArchiveItem:ze,purgeArchiveItem:je,purgeAllArchive:Ue});export{Ne as a,Ve as b,U as c,Q as d,h as e,re as f,oe as g,S as h,$e as i,G as j,O as k,Te as l,_e as m,Pe as n,Y as o,_ as p,K as q,Fe as r,F as s,te as t,Be as u};
