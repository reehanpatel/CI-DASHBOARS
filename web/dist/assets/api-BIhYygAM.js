(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const oe="/api";function F(){return localStorage.getItem("ci360_token")}function N(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function he(e,i){localStorage.setItem("ci360_token",e),localStorage.setItem("ci360_user",JSON.stringify(i))}function ee(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function Je(e){const i=F(),t=N();if(!i||!t)return ee(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null;const s=t.role==="superadmin"||t.role==="admin",n=t.name&&t.name.toLowerCase().includes("ekta")||t.email&&t.email.toLowerCase().includes("ekta");if(e&&t.role!==e&&!s){if((t.role==="accounts"||n)&&(e==="accounts"||e==="employee"))return t;const o=s?"/admin":t.role==="accounts"||n?"/accounts":t.role==="employee"?"/employee":t.role==="client"?"/client":null;return!o||typeof window<"u"&&window.location.pathname.startsWith(o)?(ee(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null):(window.location.href=o,null)}return t}async function U(e,i={}){const t=F(),s=Object.assign({"Content-Type":"application/json"},i.headers||{});t&&(s.Authorization="Bearer "+t);const n=await fetch(oe+e,Object.assign({},i,{headers:s}));let o=null;try{o=await n.json()}catch{}if(n.status===401)throw e==="/auth/login"||e.includes("/auth/login")?new Error(o&&o.error||"Invalid username/email or password."):(ee(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login?expired=1"),new Error(o&&o.error||"Session expired. Please sign in again."));if(!n.ok)throw new Error(o&&o.error||"Server status "+n.status+" — Backend waking up, please retry in 10s.");return i.method&&i.method!=="GET"&&!e.includes("/notifications")&&typeof window<"u"&&typeof window.ci360FetchNotifications=="function"&&setTimeout(()=>{try{window.ci360FetchNotifications()}catch{}},350),o}const J=e=>U(e,{method:"GET"}),ce=(e,i)=>U(e,{method:"POST",body:JSON.stringify(i)}),H=(e,i)=>U(e,{method:"PUT",body:JSON.stringify(i)}),We=(e,i)=>U(e,{method:"PATCH",body:JSON.stringify(i)}),Y=e=>U(e,{method:"DELETE"}),Ke=e=>J("/archive"+(e?`?type=${encodeURIComponent(e)}`:"")),Ge=(e,i)=>ce(`/archive/restore/${e}/${i}`,{}),Ye=(e,i)=>Y(`/archive/purge/${e}/${i}`),Qe=e=>Y(`/archive/purge-all/${e}`);function ve(e){return e=Number(e)||0,"₹"+e.toLocaleString("en-IN",{maximumFractionDigits:0})}function Xe(e){return(Number(e)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function w(e){return e==null?"":String(e).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function te(e){return e?new Date(e).toISOString().slice(0,10):"—"}function L(){return localStorage.getItem("ci360_theme")||"light"}function K(e){localStorage.setItem("ci360_theme",e),document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),s=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),s&&(s.textContent=e==="dark"?"Light Mode":"Dark Mode");const n=document.getElementById("mmsToggleThemeBtn");if(n){const o=n.querySelector("span");o&&(o.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function Le(){if(typeof document<"u"&&(document.body?.classList.contains("login-page")||window.location.pathname.includes("login")||document.querySelector(".login-box"))){document.documentElement.setAttribute("data-theme","dark");return}const e=L();document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),s=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),s&&(s.textContent=e==="dark"?"Light Mode":"Dark Mode");const n=document.getElementById("mmsToggleThemeBtn");if(n){const o=n.querySelector("span");o&&(o.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{Le()}catch{}function E(e,i){const t=document.createElement("div");t.className="toast",t.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",t.textContent=(i?"⚠️  ":"✓  ")+e,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(10px)",setTimeout(()=>t.remove(),200)},2800)}function ie(e){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${e}</div>`,i.onclick=t=>{t.target===i&&i.remove()},document.body.appendChild(i),i}function X(){ee(),window.location.href="/login"}let Z=null;async function we(){if("serviceWorker"in navigator)try{Z=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",Z.scope),typeof Notification<"u"&&Notification.permission==="granted"&&F()&&me(Z).catch(()=>{})}catch(e){console.warn("CI360 Service Worker registration notice:",e)}}try{we()}catch{}let Me=0,Ee=0;const V=new Set,_e=new Set;let Ae=!1;function ze(e){try{const i=typeof N=="function"?N():null,t=i&&i._id?String(i._id):"default";return`${e}_${t}`}catch{return`${e}_default`}}function se(){try{const e=ze("ci360_alerted_ids"),i=localStorage.getItem(e);if(i){const t=JSON.parse(i);Array.isArray(t)&&t.forEach(s=>V.add(String(s)))}}catch{}}function ne(){try{const e=ze("ci360_alerted_ids"),i=Array.from(V).slice(-2e3);localStorage.setItem(e,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",e=>{e.key&&e.key.includes("ci360_alerted_ids")&&se()});let Q=null;function Ze(){if(typeof window>"u")return;const e=()=>{try{const i=window.AudioContext||window.webkitAudioContext;i&&(Q||(Q=new i),Q.state==="suspended"&&Q.resume())}catch{}window.removeEventListener("touchstart",e,!0),window.removeEventListener("pointerdown",e,!0),window.removeEventListener("click",e,!0)};window.addEventListener("touchstart",e,!0),window.addEventListener("pointerdown",e,!0),window.addEventListener("click",e,!0)}Ze();function de(){try{const e=Date.now();if(e-Me<2500)return;Me=e;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=Q||new i;t.state==="suspended"&&t.resume();const s=t.currentTime,n=t.createOscillator(),o=t.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,s),o.gain.setValueAtTime(0,s),o.gain.linearRampToValueAtTime(.25,s+.02),o.gain.exponentialRampToValueAtTime(.001,s+.38),n.connect(o),o.connect(t.destination),n.start(s),n.stop(s+.38);const a=t.createOscillator(),p=t.createGain();a.type="sine",a.frequency.setValueAtTime(880,s+.12),p.gain.setValueAtTime(0,s+.12),p.gain.linearRampToValueAtTime(.28,s+.14),p.gain.exponentialRampToValueAtTime(.001,s+.6),a.connect(p),p.connect(t.destination),a.start(s+.12),a.stop(s+.6)}catch{}}function pe(){try{const e=Date.now();if(e-Ee<2500)return;Ee=e,"vibrate"in navigator&&navigator.vibrate([200,100,200,100,200])}catch{}}function De(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function je(){try{if(De()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function ke(){if(!("Notification"in window))return E("Your device browser does not support Web Notifications.",!0),!1;try{const e=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return e==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),await me(),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),E("Notifications successfully enabled on this device!"),de(),pe(),await ue({title:"CI360 Alerts Active 🔔",message:"Instant notifications are now live on this device for jobs, tasks, and overdue invoices!",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),E("Notification permission was not granted.",!0),!1)}catch(e){console.error("Notification permission request error:",e)}return!1}async function ue({title:e,message:i,type:t,id:s,url:n}){const o=s?String(s):null;if(se(),o&&V.has(o)||(o&&(V.add(o),ne()),de(),pe(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return;localStorage.setItem("ci360_notif_enabled","true")}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",p={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:o?`ci360-notif-${o}`:"ci360-alert-"+Date.now(),renotify:!0,vibrate:[200,100,200,100,200],data:{url:n||(typeof window<"u"?window.location.href:""),type:t||"general"}};try{navigator.serviceWorker&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:e,options:p})}catch{}try{if("serviceWorker"in navigator){const d=Z||await navigator.serviceWorker.getRegistration();if(d&&d.showNotification){await d.showNotification(e,p);return}}}catch{}try{const d=new Notification(e,p);d.onclick=()=>{window.focus(),d.close()};return}catch{}}function et(e){const i="=".repeat((4-e.length%4)%4),t=(e+i).replace(/-/g,"+").replace(/_/g,"/"),s=window.atob(t),n=new Uint8Array(s.length);for(let o=0;o<s.length;++o)n[o]=s.charCodeAt(o);return n}async function me(e=null){try{if(typeof window>"u"||!("serviceWorker"in navigator)||!("PushManager"in window)||typeof Notification>"u"||Notification.permission!=="granted"||!F())return null;const t=e||Z||await navigator.serviceWorker.ready;if(!t||!t.pushManager)return null;let s=await t.pushManager.getSubscription();if(!s){const n=await J("/notifications/vapid-public-key").catch(()=>null),o=n&&n.publicKey?n.publicKey:"BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q";s=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:et(o)})}if(s){const n=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return await U("/notifications/subscribe",{method:"POST",body:JSON.stringify({subscription:s.toJSON?s.toJSON():s,deviceType:n?"mobile":"desktop"})}).catch(()=>{}),s}}catch(i){console.warn("Push subscription registration notice:",i.message)}return null}if(typeof window<"u"&&(window.triggerSystemNotification=ue,window.requestNotificationPermission=ke,window.registerPushSubscription=me,"Notification"in window)){const e=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",e,!0),window.removeEventListener("touchstart",e,!0)};window.addEventListener("click",e,!0),window.addEventListener("touchstart",e,!0)}function xe(e){return e?String(e).replace(/^[\p{Extended_Pictographic}\u2000-\u3300\uD800-\uDFFF\uFE00-\uFE0F\s]+/u,"").trim()||e:""}function tt(){if(typeof document>"u")return null;let e=document.getElementById("ci360FloatingContainer");return e||(e=document.createElement("div"),e.id="ci360FloatingContainer",e.className="ci360-floating-container",document.body.appendChild(e)),e}function Ne({id:e,title:i,message:t,type:s,time:n,actionText:o,onAction:a,persistent:p=!1,timeout:d=4500}){const l=tt();if(!l)return;const g=`ci360-pop-${e||Math.random().toString(36).slice(2,9)}`;for(;l.firstChild;)try{l.removeChild(l.firstChild)}catch{}let r="🔔",c="info",y="View",h="";const v=(s||"").toLowerCase(),x=(t||"").toLowerCase();v.includes("chat_message")||v.includes("chat")||v.includes("message")?(r="💬",c="info",y="Open Chat",h="teambonding"):v.includes("game_challenge")||v.includes("game")||v.includes("invitation")||v.includes("challenge")?(r="🎮",c="warning",y="View Game",h="teambonding"):v.includes("invoice_overdue")?(r="🚨",c="critical",y="View Invoice",h="billing"):v.includes("invoice_paid")||v.includes("payment")?(r="💳",c="success",y="View Billing",h="billing"):v.includes("invoice")?(r="🧾",c="info",y="View Invoice",h="billing"):v.includes("job")&&(x.includes("overdue")||v.includes("overdue"))?(r="⚠️",c="critical",y="View Job",h="jobs"):v.includes("job")&&x.includes("due today")?(r="⏳",c="warning",y="View Job",h="jobs"):v.includes("job_created")||v.includes("job")||v.includes("status")?(r="📋",c="info",y="View Job",h="jobs"):v.includes("task")&&(x.includes("overdue")||v.includes("overdue"))?(r="⚠️",c="critical",y="View Planner",h="dailytasks"):v.includes("task_completed")?(r="✅",c="success",y="View Planner",h="dailytasks"):v.includes("task")?(r="📅",c="info",y="Open Planner",h="dailytasks"):v.includes("ticket_under_review")||v.includes("ticket")&&x.includes("under review")?(r="🔍",c="warning",y="Review Ticket",h="tickets"):v.includes("ticket_resolved")||v.includes("ticket_completed")||v.includes("ticket")&&x.includes("completed")?(r="✅",c="success",y="View Ticket",h="tickets"):v.includes("ticket")?(r="🎫",c="info",y="View Ticket",h="tickets"):v.includes("target")&&(r="🎯",c="success",y="View Targets",h="targets");const I=o||y;let m=xe(i||"Notification");r&&m.startsWith(r)&&(m=m.slice(r.length).trim());const u=document.createElement("div");u.id=g,u.className=`ci360-popup-card ci360-priority-${c}`,u.innerHTML=`
    <div class="ci360-popup-body">
      <div class="ci360-popup-header">
        <div class="ci360-popup-header-left">
          <span class="ci360-popup-icon">${r}</span>
          <span class="ci360-popup-title">${w(m||"Notification")}</span>
        </div>
        <div class="ci360-popup-header-right">
          ${I?`<button type="button" class="ci360-popup-action-btn">${I}</button>`:""}
          <button type="button" class="ci360-popup-close-btn" aria-label="Dismiss">✕</button>
        </div>
      </div>
      ${t?`<div class="ci360-popup-message">${w(t||"")}</div>`:""}
    </div>
  `,de(),pe();const S=async()=>{if(e){try{await Y(`/notifications/${e}`)}catch{}typeof window.ci360RemoveNotifFromUI=="function"&&window.ci360RemoveNotifFromUI(e)}},A=()=>{u.style.opacity="0",u.style.transform="translateY(-6px) scale(0.97)",setTimeout(()=>{try{u.remove()}catch{}},180),S()},T=u.querySelector(".ci360-popup-close-btn");T&&(T.onclick=B=>{B.stopPropagation(),A()});const b=()=>{if(typeof a=="function")a();else if(h&&typeof window.ci360NavTab=="function"){const B=typeof N=="function"?N():null;let C=h;B&&B.role==="employee"&&(C==="jobs"||C==="myjobs")&&(C="myjobs"),window.ci360NavTab(C)}S(),A()},f=u.querySelector(".ci360-popup-action-btn");for(f&&(f.onclick=B=>{B.stopPropagation(),b()}),u.style.cursor="pointer",u.onclick=B=>{B.target.closest(".ci360-popup-close-btn")||b()};l.children.length>=1;){const B=l.firstChild;B&&l.removeChild(B)}l.appendChild(u),p||setTimeout(()=>{document.body.contains(u)&&A()},d||4500)}function Pe(e=[]){if(!e||!e.length)return;const i=sessionStorage.getItem("ci360_client_overdue_dismissed");if(i&&Date.now()-Number(i)<2700*1e3)return;const t=e.reduce((p,d)=>p+(Number(d.pendingAmount||d.totalAmount)||0),0),s=`
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
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${ve(t)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${e.length} Overdue Invoice${e.length>1?"s":""}</span>
      </div>

      <div class="ci360-overdue-list">
        ${e.map(p=>{const d=p.dueDate?new Date(p.dueDate):new Date,l=Math.max(1,Math.floor((Date.now()-d.getTime())/(1e3*60*60*24)));return`
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${w(p.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${te(p.dueDate)} <span style="color:var(--red-600);font-weight:700">(${l}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${ve(p.pendingAmount||p.totalAmount||0)}</div>
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
  `,n=ie(s),o=n.querySelector("#ci360OverduePayBtn"),a=n.querySelector("#ci360OverdueRemindBtn");o&&(o.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),n.remove(),typeof window.ci360NavTab=="function"&&window.ci360NavTab("billing")}),a&&(a.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),n.remove()})}function Ue(){return`
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

        ${!je()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
          <button type="button" class="notif-filter-btn" data-filter="chat">💬 Chat</button>
        </div>
        <div class="notif-list" id="notifList">
          <div class="empty" style="padding:24px 16px;font-size:12.5px;">Loading notifications…</div>
        </div>
      </div>
    </div>`}function Be(e){return e?e.startsWith("chat")||e.startsWith("message")?"💬":e.startsWith("game")||e.startsWith("invitation")||e.startsWith("challenge")?"🎮":e.startsWith("task_completed")?"🎉":e.startsWith("task_due")?"⚡":e.startsWith("task")?"✅":e.startsWith("target_completed")?"🎉":e.startsWith("target")?"🎯":e.startsWith("job_due")?"⏳":e.startsWith("job")?"📋":e.startsWith("ticket_under_review")?"🔍":e.startsWith("ticket_resolved")||e.startsWith("ticket_completed")?"✅":e.startsWith("ticket")?"🎫":e.startsWith("status")?"🔄":e.startsWith("test")?"🧪":"🔔":"🔔"}function ae(e){if(!e)return"";const i=new Date(e),s=Math.floor((new Date-i)/1e3);if(s<60)return"Just now";const n=Math.floor(s/60);if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const a=Math.floor(o/24);return a===1?"Yesterday":a<7?`${a}d ago`:te(e)}function ye(e){if(!e)return;const i=Be(e.type),t=(e.type||"").toLowerCase(),s=e.title||"Notification",n=e.message||"",o=e.createdAt?te(e.createdAt)+" at "+new Date(e.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"Recently",a=ae(e.createdAt),p=typeof N=="function"?N():null,d=p&&p.role==="employee";let l="Update",g="blue",r="",c="";const y=e.jobId||e.taskId||e.ticketId||e.targetId||null;t.includes("job")?(l="Job Deliverable",g="blue",c=d?"myjobs":"jobs",r=d?"Open in My Jobs 📋":"View Job 📁"):t.includes("chat")||t.includes("bonding_message")||t.includes("message")?(l="Team Chat",g="blue",c="teambonding",r="Open Chat & Lounge 💬"):t.includes("game")||t.includes("challenge")||t.includes("invitation")?(l="Game Challenge",g="purple",c="teambonding",r="Enter Game Lounge 🎮"):t.includes("task")?(l="Daily Planner",g="green",c="dailytasks",r="Open Daily Planner 📅"):t.includes("ticket")?(l="Support Ticket",g="brand",c="tickets",r="Open Support Tickets 🎫"):t.includes("target")?(l="Target Goal",g="gold",c="targets",r="View My Targets 🎯"):(t.includes("invoice")||t.includes("billing"))&&(l="Billing & Invoice",g="purple",c="billing",r="Open Billing 💳");const h=Array.isArray(e.attachments)&&e.attachments.length>0,v=ie(`
    <div class="notif-detail-modal" style="padding:4px 0">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border-xs)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:12px;background:var(--bg-elevated);border:1px solid var(--border-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:var(--shadow-xs)">
            ${i}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap">
              <span class="badge ${g}" style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${l}</span>
              <span style="font-size:11.5px;color:var(--text-4)">${a}</span>
            </div>
            <div style="font-size:11px;color:var(--text-4)">${o}</div>
          </div>
        </div>
        <button type="button" class="btn ghost small notif-modal-close-btn" aria-label="Close" style="padding:4px 8px;font-size:16px;line-height:1;border-radius:6px;color:var(--text-3)">✕</button>
      </div>

      <h3 style="font-size:16.5px;font-weight:800;color:var(--text-1);margin:0 0 12px 0;line-height:1.35;letter-spacing:-0.3px">
        ${w(xe(s))}
      </h3>

      <div style="background:var(--bg-elevated);border:1px solid var(--border-xs);border-radius:var(--r-md);padding:14px 16px;margin-bottom:16px;font-size:13.5px;color:var(--text-2);line-height:1.6;white-space:pre-wrap;word-break:break-word">
        ${w(n)}
      </div>

      ${h?`
        <div style="margin-bottom:16px">
          <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Attachments (${e.attachments.length})</div>
          ${le(e.attachments,{title:"Attachments"})}
        </div>
      `:""}

      <div class="modal-actions" style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border-xs);display:flex;justify-content:flex-end;align-items:center;gap:10px;flex-wrap:wrap">
        <button type="button" class="btn secondary notif-modal-dismiss-btn" style="font-weight:600">Close</button>
        ${c?`
          <button type="button" class="btn primary notif-modal-go-btn" style="font-weight:700;display:inline-flex;align-items:center;gap:6px">
            <span>${r}</span>
          </button>
        `:""}
      </div>
    </div>
  `),x=()=>v.remove(),I=v.querySelector(".notif-modal-close-btn"),m=v.querySelector(".notif-modal-dismiss-btn"),u=v.querySelector(".notif-modal-go-btn");I&&(I.onclick=x),m&&(m.onclick=x),u&&(u.onclick=()=>{x(),typeof window.ci360NavTab=="function"&&window.ci360NavTab(c,y)})}function Oe(){const e=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),t=document.getElementById("notifBadge"),s=document.getElementById("notifList"),n=document.getElementById("clearNotifBtn"),o=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),p=document.getElementById("notifDismissBannerBtn"),d=document.getElementById("notifPermissionBanner"),l=document.getElementById("notifUnreadBadge");if(!e||!i)return;we();function g(){const b=document.getElementById("notifPermissionBanner");b&&(b.classList.add("hidden"),b.style.setProperty("display","none","important"),b.remove())}function r(){if(je()){g();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?g():Notification.permission==="default"&&d&&d.style.setProperty("display","flex","important"))}r(),p&&(p.onclick=b=>{b.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),g()}),a&&(a.onclick=async b=>{b.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),g(),await ke(),g()}),De()&&me(),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),se();let c=[],y="all";function h(){if(!s)return;let b=c;if(y==="task"?b=c.filter(f=>(f.type||"").includes("task")):y==="target"?b=c.filter(f=>(f.type||"").includes("target")):y==="job"?b=c.filter(f=>(f.type||"").includes("job")):y==="ticket"?b=c.filter(f=>(f.type||"").includes("ticket")):y==="chat"&&(b=c.filter(f=>(f.type||"").includes("chat")||(f.type||"").includes("game")||(f.type||"").includes("bonding"))),b.length===0){s.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${y==="all"?"":y+" "}notifications</div>`;return}s.innerHTML=b.map(f=>{const B=Be(f.type);return`
        <div class="notif-item ${f.read?"":"unread"}" data-id="${f._id}" data-type="${w(f.type||"")}">
          <div class="notif-icon">${B}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${w(xe(f.title))}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${ae(f.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${w(f.message)}</div>
          </div>
          <div style="color:var(--text-4);font-size:16px;line-height:1;margin-top:2px;flex-shrink:0">›</div>
        </div>`}).join(""),s.querySelectorAll(".notif-item").forEach(f=>{f.onclick=async()=>{const B=f.dataset.id,C=c.find($=>String($._id)===String(B));if(B&&f.classList.contains("unread")){f.classList.remove("unread");try{await U(`/notifications/${B}/read`,{method:"PATCH"})}catch{}const $=c.filter(_=>!_.read&&String(_._id)!==String(B)).length;t&&(t.style.display=$>0?"flex":"none",t.textContent=$>99?"99+":$),l&&(l.textContent=$>0?`${$} new`:"",l.style.display=$>0?"inline-block":"none")}if(S(),C)ye(C);else{const $=f.dataset.type,_=typeof N=="function"?N():null,z=_&&_.role==="employee";$&&$.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):$&&$.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab(z?"myjobs":"jobs"):$&&$.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):$&&$.includes("target")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("targets"):$&&($.includes("chat")||$.includes("game")||$.includes("bonding"))&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("teambonding")}}})}let v={jobs:0,tasks:0,invoices:0,tickets:0},x=!1;async function I(b=!1){try{const f=await J("/notifications");c=f.notifications||[];const B=f.unreadCount||0;if(t&&(t.textContent=B>99?"99+":B,t.style.display=B>0?"flex":"none"),l&&(l.textContent=B>0?`${B} new`:"",l.style.display=B>0?"inline-block":"none"),se(),f.overdue&&f.overdue.invoices&&f.overdue.invoices.length>0){const C=typeof N=="function"?N():null;C&&C.role==="client"&&Pe(f.overdue.invoices)}if(f.syncTimestamps){const C=f.syncTimestamps;if(!x)v={...C},x=!0;else{const $=[];C.jobs>(v.jobs||0)&&$.push("jobs"),C.tasks>(v.tasks||0)&&$.push("tasks"),C.invoices>(v.invoices||0)&&$.push("invoices"),C.tickets>(v.tickets||0)&&$.push("tickets"),$.length>0&&(v={...C},window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{changedKeys:$,syncTimestamps:C,overdue:f.overdue}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({changedKeys:$,syncTimestamps:C}))}}if(!Ae)c.forEach(C=>{const $=String(C._id);_e.add($),V.add($)}),ne(),Ae=!0;else{const C=c.filter($=>!$.read&&!V.has(String($._id)));if(C.length>0){const _="ci360_daily_alert_job_"+new Date().toISOString().slice(0,10);let z=!!localStorage.getItem(_);C.forEach(R=>{const O=String(R._id);_e.add(O),V.add(O)}),ne();const P=C[0];if(P){const R=String(P._id);let O=!0;(P.type==="job_due"||P.title&&P.title.includes("Job Due"))&&(z?O=!1:localStorage.setItem(_,"true")),O&&(Ne({id:R,title:P.title||"CI360 Alert",message:P.message||"",type:P.type}),await ue({title:P.title||"CI360 Alert",message:P.message||"",type:P.type,id:R}))}ne(),window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{newNotifications:C}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({newNotifications:C})}}h()}catch{s&&c.length===0&&(s.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=I,window.showInAppPopupAlert=Ne,window.showClientOverdueInvoiceModal=Pe,window.ci360RemoveNotifFromUI=b=>{if(!b)return;const f=String(b);c=c.filter(C=>String(C._id)!==f);const B=c.filter(C=>!C.read).length;t&&(t.textContent=B>99?"99+":B,t.style.display=B>0?"inline-flex":"none"),l&&(l.textContent=B>0?`${B} unread`:"",l.style.display=B>0?"inline":"none"),h()}),I(),window.__ci360PollInterval=setInterval(I,6e3),window.addEventListener("focus",()=>I(!0)),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(b=>{b.onclick=f=>{f.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(B=>B.classList.remove("active")),b.classList.add("active"),y=b.dataset.filter,h()}});const m=document.getElementById("notifBackdrop");function u(){i.style.display="flex",i.classList.add("open"),m&&(m.style.display="block",m.classList.add("open")),e.setAttribute("aria-expanded","true"),r();const b=document.getElementById("topbarUserDropdown");b&&(b.style.display="none"),I()}function S(){i.style.display="none",i.classList.remove("open"),m&&(m.style.display="none",m.classList.remove("open")),e.setAttribute("aria-expanded","false")}function A(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?S():u()}window.ci360CloseNotifications=S;const T=document.getElementById("notifCloseBtn");T&&(T.onclick=b=>{b.stopPropagation(),S()}),m&&(m.onclick=b=>{b.stopPropagation(),S()}),e.onclick=b=>{b.stopPropagation(),A()},o&&(o.onclick=async b=>{b.stopPropagation();try{await U("/notifications/read",{method:"PATCH"}),t.style.display="none",l&&(l.textContent="",l.style.display="none"),c.forEach(f=>f.read=!0),h(),E("All notifications marked as read")}catch(f){E(f.message,!0)}}),window.__ci360NotifDocClickHandler&&document.removeEventListener("click",window.__ci360NotifDocClickHandler),window.__ci360NotifDocClickHandler=b=>{!i.contains(b.target)&&!e.contains(b.target)&&S()},document.addEventListener("click",window.__ci360NotifDocClickHandler),n&&(n.onclick=async b=>{b.stopPropagation();try{await Y("/notifications"),c=[],s.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',t.style.display="none",l&&(l.textContent="",l.style.display="none"),E("Notifications cleared")}catch(f){E(f.message,!0)}});try{const f=new URLSearchParams(window.location.search).get("notifId");f&&J("/notifications").then(B=>{const $=(B.notifications||[]).find(_=>String(_._id)===String(f));if($){ye($);const _=window.location.pathname+window.location.hash;window.history.replaceState(null,"",_)}}).catch(()=>{})}catch{}}const ge={admin:[{key:"dashboard",label:"Dashboard",icon:"📊",visible:!0,category:"Core"},{key:"dailytasks",label:"Daily Planner",icon:"📅",visible:!0,category:"Productivity"},{key:"tickets",label:"Support Tickets",icon:"🎫",visible:!0,category:"Support"},{key:"billing_dashboard",label:"Accounts & Billing",icon:"💳",href:"/accounts",visible:!0,category:"Finance"},{key:"proposals",label:"Proposal Studio",icon:"📜",visible:!0,category:"Sales"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬",visible:!0,category:"Collaboration"},{key:"logjob",label:"Log a Job",icon:"➕",visible:!0,category:"Operations"},{key:"jobs",label:"All Jobs",icon:"📁",visible:!0,category:"Operations"},{key:"byclient",label:"By Client",icon:"💼",visible:!0,category:"Analytics"},{key:"byperson",label:"By Person",icon:"👥",visible:!0,category:"Analytics"},{key:"accounts",label:"Client Roster",icon:"🏢",visible:!0,category:"Directory"},{key:"targets",label:"Targets",icon:"🎯",visible:!0,category:"Management"},{key:"salaries",label:"Salaries",icon:"💰",visible:!0,superadminOnly:!0,category:"Finance"},{key:"users",label:"Users",icon:"👤",visible:!0,superadminOnly:!0,category:"System"},{key:"manage",label:"Settings & Manage",icon:"⚙️",visible:!0,locked:!0,category:"System"}],employee:[{key:"dashboard",label:"Overview Dashboard",icon:"📊",visible:!0,category:"Core"},{key:"myjobs",label:"My Jobs",icon:"📋",visible:!0,category:"Operations"},{key:"dailytasks",label:"Daily Planner",icon:"📅",visible:!0,category:"Productivity"},{key:"tickets",label:"Support Tickets",icon:"🎫",visible:!0,category:"Support"},{key:"proposals",label:"Proposal Studio",icon:"📜",visible:!0,category:"Sales"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬",visible:!0,category:"Collaboration"},{key:"targets",label:"My Targets",icon:"🎯",visible:!0,category:"Productivity"},{key:"accounts_redirect",label:"Accounts Dashboard 💰",icon:"💳",visible:!0,category:"Finance"},{key:"settings",label:"Settings",icon:"⚙️",visible:!0,category:"System"}],accounts:[{key:"overview",label:"Overview",icon:"📊",visible:!0,category:"Core"},{key:"invoices",label:"Invoices",icon:"📄",visible:!0,category:"Billing"},{key:"payments",label:"Payments",icon:"💵",visible:!0,category:"Billing"},{key:"receivables",label:"Pending & Receivables",icon:"⏳",visible:!0,category:"Billing"},{key:"billing",label:"Billing Profiles",icon:"📑",visible:!0,category:"Billing"},{key:"tally",label:"TallyPrime Silver",icon:"🏛️",visible:!0,category:"Integration"},{key:"settings",label:"Settings",icon:"⚙️",visible:!0,category:"System"}],client:[{key:"dashboard",label:"Overview Dashboard",icon:"📊",visible:!0,category:"Core"},{key:"jobs",label:"All Jobs Logged",icon:"📋",visible:!0,category:"Operations"},{key:"logjob",label:"Log a Job",icon:"➕",visible:!0,category:"Operations"},{key:"delivered",label:"Work Delivered",icon:"📦",visible:!0,category:"Deliverables"},{key:"proposals",label:"Proposals & Scope",icon:"📜",visible:!0,category:"Contracts"},{key:"billing",label:"Billing & Invoices",icon:"💳",visible:!0,category:"Finance"},{key:"team",label:"Our Team",icon:"👥",visible:!0,category:"Personnel"},{key:"settings",label:"Settings",icon:"⚙️",visible:!0,category:"System"}]};function fe(){try{const e=localStorage.getItem("ci360_nav_config");if(e){const i=JSON.parse(e);if(i&&typeof i=="object")return i}}catch{}return ge}async function it(){try{const e=await J("/settings/navigation");if(e&&e.config)return localStorage.setItem("ci360_nav_config",JSON.stringify(e.config)),e.config}catch{}return fe()}async function nt(e){const i=await H("/settings/navigation",{config:e});return i&&i.config&&localStorage.setItem("ci360_nav_config",JSON.stringify(i.config)),i}async function ot(){const e=await ce("/settings/navigation/reset",{});return e&&e.config&&localStorage.setItem("ci360_nav_config",JSON.stringify(e.config)),e}async function st(e,i){const t=await H(`/users/${e}/modules`,{customModules:i}),s=N();return s&&(s.id===e||s._id===e)&&(s.customModules=i,he(F(),s)),t}function qe(e,i,t=!1,s=null){if(!Array.isArray(i))return[];const n=s||N(),a=fe()[e]||ge[e]||[],p=new Set(a.filter(l=>l.visible===!1).map(l=>l.key)),d=n&&n.customModules&&typeof n.customModules=="object"?n.customModules:null;return i.filter(l=>l.locked||e==="admin"&&l.key==="manage"?!0:!t&&(l.key==="salaries"||l.key==="users")?!1:d&&d[l.key]!==void 0?!!d[l.key]:!p.has(l.key))}function at({user:e,currentRole:i,activeTab:t,tabs:s,title:n,subtitle:o}){const a=e&&e.name?e.name.charAt(0).toUpperCase():"U",p=e&&(e.role==="superadmin"||e.role==="admin")?"Admin":e&&e.role==="accounts"?"Accounts":e&&e.role==="employee"?"Employee":e&&e.role==="client"?"Client":e&&e.role?e.role.toUpperCase():"User",d=e&&e.name?e.name:"User",l=e&&e.email?e.email:e&&e.username?e.username:"",g=e&&e.role==="superadmin",r=i==="superadmin"||i==="admin"?"admin":i,c=qe(r,s||[],g,e),y=c&&c.some(m=>m.key==="logjob"),h=c&&c.find(m=>m.key===t)||s&&s.find(m=>m.key===t),v=n||h&&h.label||"Dashboard";let x=[];if(i==="accounts"?x=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:t==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:t==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(t),isMore:!0}]:i==="superadmin"||i==="admin"?x=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="dashboard"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(t),isMore:!0}]:i==="employee"?x=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:t==="myjobs"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"proposals",label:"Proposals",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',active:t==="proposals"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:t==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","proposals","targets"].includes(t),isMore:!0}]:x=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:t==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(t),isMore:!0}],x&&x.length){const u=fe()[r]||ge[r]||[],S=new Set(u.filter(T=>T.visible===!1).map(T=>T.key)),A=e&&e.customModules&&typeof e.customModules=="object"?e.customModules:null;x=x.filter(T=>T.isMore?!0:A&&A[T.key]!==void 0?!!A[T.key]:!S.has(T.key))}return`
    <div class="app-shell ${typeof localStorage<"u"&&localStorage.getItem("ci360_sidebar_collapsed")==="true"?"sidebar-collapsed":""}">
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
      <aside class="app-sidebar" id="appSidebar">
        <div class="sidebar-brand">
          <img src="/logo.png" alt="CI360 Logo" class="brand-logo-img">
          <div class="brand-info">
            <h1>CI360</h1>
            <div class="tag">Intelligence Suite</div>
          </div>
          <button type="button" class="sidebar-collapse-btn" id="sidebarCollapseBtn" title="Toggle Sidebar (Ctrl+B)" aria-label="Minimize sidebar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
        <nav class="sidebar-nav" role="navigation" aria-label="Main navigation">
          <div class="nav-group-label">Navigation</div>
          ${c.map(m=>m.href?`
            <a href="${m.href}" class="sidebar-item ${t===m.key?"active":""}" data-tab="${m.key}" aria-current="${t===m.key?"page":"false"}" style="text-decoration:none;">
              <span class="icon">${m.icon||"📌"}</span>
              <span>${m.label}</span>
            </a>`:`
            <button type="button" class="sidebar-item ${t===m.key?"active":""}" data-tab="${m.key}" aria-current="${t===m.key?"page":"false"}">
              <span class="icon">${m.icon||"📌"}</span>
              <span>${m.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${w(e?e.name:"User")}</div>
            <div class="role">${w(p)}</div>
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

            <button type="button" class="desktop-sidebar-toggle" id="desktopSidebarToggle" title="Toggle Sidebar (Ctrl+B)" aria-label="Toggle sidebar">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
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
              <h1 class="page-heading-title">${w(v)}</h1>
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

            ${y?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${L()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${L()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${Ue()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${a}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${w(d)}</span>
                  <span class="topbar-user-role-badge">${w(p)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${a}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${w(d)}</div>
                      ${l?`<div class="tud-email">${w(l)}</div>`:""}
                      <span class="tud-role-chip">${w(p)}</span>
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
                      <span class="tud-icon">${L()==="dark"?"☀️":"🌙"}</span>
                      <span class="tud-label">Switch to ${L()==="dark"?"Light":"Dark"} Mode</span>
                    </button>
                    <div class="tud-item-static">
                      <span class="tud-icon">🛡️</span>
                      <span class="tud-label">Session: Verified</span>
                    </div>
                    ${e&&e.role==="superadmin"?`
                    <button type="button" class="tud-item" id="tudSidebarConfigBtn" role="menuitem">
                      <span class="tud-icon">🧭</span>
                      <span class="tud-label">Customize Sidebars</span>
                    </button>`:""}
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
                        <span style="font-size:16px" id="tudMobileThemeIcon">${L()==="dark"?"☀️":"🌙"}</span>
                        <span id="tudMobileThemeText">${L()==="dark"?"Light Mode":"Dark Mode"}</span>
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

                    ${e&&e.role==="superadmin"?`
                    <button type="button" class="tud-mobile-item" id="tudMobileSidebarConfigBtn" role="menuitem">
                      <div class="tmi-left">
                        <span style="font-size:16px">🧭</span>
                        <span>Customize Sidebars</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>`:""}

                    <button type="button" class="tud-mobile-item" id="tudMobileHelpBtn" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <span>Help & Support</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    ${e&&e.role==="superadmin"?`
                    <button type="button" class="tud-mobile-item" id="tudMobileSidebarConfigBtn" role="menuitem">
                      <div class="tmi-left">
                        <span style="font-size:16px">🧭</span>
                        <span>Customize Sidebars</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>`:""}

                    <button type="button" class="tud-mobile-item danger" id="logoutBtnMobile" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span>Logout</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    ${e&&e.role==="superadmin"?`
                    <button type="button" class="tud-mobile-item" id="tudMobileSidebarConfigBtn" role="menuitem">
                      <div class="tmi-left">
                        <span style="font-size:16px">🧭</span>
                        <span>Customize Sidebars</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>`:""}
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
          ${x.map(m=>`
            <button type="button" class="mbn-item ${m.active?"active":""}" data-tab="${m.key}" ${m.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${m.iconSvg}</span>
              <span class="mbn-label">${w(m.label)}</span>
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
              ${s.map(m=>m.href?`
                <a href="${m.href}" class="mms-card ${t===m.key?"active":""}" data-tab="${m.key}" style="text-decoration:none;">
                  <span class="mms-card-icon">${m.icon||"📌"}</span>
                  <span class="mms-card-label">${w(m.label)}</span>
                </a>`:`
                <button type="button" class="mms-card ${t===m.key?"active":""}" data-tab="${m.key}">
                  <span class="mms-card-icon">${m.icon||"📌"}</span>
                  <span class="mms-card-label">${w(m.label)}</span>
                </button>`).join("")}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${L()==="dark"?"☀️ Light Mode":"🌙 Dark Mode"}</span>
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
    </div>`}function lt(e){const i=document.getElementById("mobileNavToggle"),t=document.getElementById("appSidebar"),s=document.getElementById("sidebarOverlay");function n(){t&&t.classList.add("open"),s&&s.classList.add("open")}function o(){t&&t.classList.remove("open"),s&&s.classList.remove("open")}i&&(i.onclick=n),s&&(s.onclick=o);const a=document.querySelector(".app-shell");function p(){if(!a)return;a.classList.toggle("sidebar-collapsed");const k=a.classList.contains("sidebar-collapsed");try{localStorage.setItem("ci360_sidebar_collapsed",k?"true":"false")}catch{}}const d=document.getElementById("sidebarCollapseBtn");d&&(d.onclick=p);const l=document.getElementById("desktopSidebarToggle");l&&(l.onclick=p),window.__ci360SidebarKeyBound||(window.__ci360SidebarKeyBound=!0,window.addEventListener("keydown",k=>{if((k.ctrlKey||k.metaKey)&&(k.key==="b"||k.key==="B")){const M=document.activeElement?document.activeElement.tagName.toLowerCase():"";if(M==="input"||M==="textarea"||document.activeElement&&document.activeElement.isContentEditable)return;k.preventDefault(),p()}}));const g=document.getElementById("mobileMoreBackdrop"),r=document.getElementById("mobileMoreSheet"),c=document.getElementById("mmsCloseBtn"),y=document.getElementById("mobileMoreBtn");function h(){g&&g.classList.add("active"),r&&r.classList.add("active")}function v(){g&&g.classList.remove("active"),r&&r.classList.remove("active")}y&&(y.onclick=k=>{k.stopPropagation(),h()}),c&&(c.onclick=v),g&&(g.onclick=k=>{k.target===g&&v()}),document.querySelectorAll(".mbn-item").forEach(k=>{k.dataset.tab&&k.dataset.tab!=="__more__"&&(k.onclick=()=>{v(),e&&e(k.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(k=>{k.onclick=()=>{v(),k.tagName!=="A"&&e&&e(k.dataset.tab)}});const x=document.getElementById("mmsToggleThemeBtn");x&&(x.onclick=()=>{K(L()==="dark"?"light":"dark")});const I=document.getElementById("mmsNotifsBtn");I&&(I.onclick=()=>{v();const k=document.getElementById("notifBellBtn");k&&k.click()});const m=document.getElementById("mmsLogoutBtn");m&&(m.onclick=X);const u=document.getElementById("mobileCalBtn");u&&(u.onclick=()=>{const k=document.querySelector(".period-row");k&&(k.scrollIntoView({behavior:"smooth",block:"center"}),k.classList.add("pulse-highlight"),setTimeout(()=>k.classList.remove("pulse-highlight"),1200))});const S=document.getElementById("tudMobileThemeBtn");S&&(S.onclick=k=>{k.stopPropagation(),K(L()==="dark"?"light":"dark")});const A=document.getElementById("tudMobileNotifsBtn");A&&(A.onclick=k=>{k.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none");const q=document.getElementById("notifBellBtn");q&&q.click()});const T=document.getElementById("tudMobileSettingsBtn");T&&(T.onclick=k=>{k.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none");const q=document.querySelector('[data-tab="settings"], [data-tab="manage"]');q&&e?e(q.dataset.tab):re()});const b=document.getElementById("tudProfileSettingsBtn");b&&(b.onclick=k=>{k.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none");const q=document.querySelector('[data-tab="settings"], [data-tab="manage"]');q&&e?e(q.dataset.tab):re()});const f=document.getElementById("tudSidebarConfigBtn");f&&(f.onclick=k=>{k.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none"),typeof window.ci360NavTab=="function"?window.ci360NavTab("manage",{section:"sidebar-customizer"}):window.location.href="/admin?tab=manage&section=sidebar-customizer"});const B=document.getElementById("tudMobileSidebarConfigBtn");B&&(B.onclick=k=>{k.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none"),typeof window.ci360NavTab=="function"?window.ci360NavTab("manage",{section:"sidebar-customizer"}):window.location.href="/admin?tab=manage&section=sidebar-customizer"});const C=document.getElementById("tudMobileHelpBtn");C&&(C.onclick=k=>{k.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none"),ie(`
        <div style="padding:24px;text-align:center;">
          <div style="font-size:36px;margin-bottom:12px;">💬</div>
          <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
          <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
            For immediate technical assistance, client onboarding, or workspace inquiries, reach out to your system administrator or support team.
          </p>
          <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
        </div>
      `)});const $=document.getElementById("logoutBtnMobile");$&&($.onclick=X);const _=document.getElementById("topbarUserBtn"),z=document.getElementById("topbarUserDropdown");_&&z&&(_.onclick=k=>{k.stopPropagation();const M=z.style.display!=="none";z.style.display=M?"none":"block",_.setAttribute("aria-expanded",String(!M)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",k=>{!z.contains(k.target)&&!_.contains(k.target)&&(z.style.display="none",_.setAttribute("aria-expanded","false"))}));const P=document.getElementById("tudThemeToggleBtn");P&&(P.onclick=()=>{K(L()==="dark"?"light":"dark")});const R=document.getElementById("topbarQuickLogJobBtn");R&&(R.onclick=()=>{e&&e("logjob")});const O=document.getElementById("logoutBtn");O&&(O.onclick=X),Oe(),document.querySelectorAll(".sidebar-item").forEach(k=>{k.onclick=()=>{o(),k.tagName!=="A"&&e&&e(k.dataset.tab)}}),rt(e)}function rt(e){const i=document.getElementById("cmdPaletteBackdrop"),t=document.getElementById("cmdSearchInput"),s=document.getElementById("cmdResultsList"),n=document.getElementById("topbarCmdTrigger"),o=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),p=document.getElementById("cmdCloseKbd");if(!i||!t||!s)return;const d=Array.from(document.querySelectorAll(".sidebar-item")),l=d.map(u=>({type:"tab",id:u.dataset.tab,label:u.querySelector("span:last-child")?.textContent||u.dataset.tab,icon:u.querySelector(".icon")?.textContent||"📌",sub:"Navigate to section",action:()=>{e&&e(u.dataset.tab)}}));d.some(u=>u.dataset.tab==="logjob")&&l.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{e&&e("logjob")}}),l.push({type:"action",id:"toggle-theme",label:L()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{K(L()==="dark"?"light":"dark")}}),l.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const u=document.getElementById("notifBellBtn");u&&u.click()}}),l.push({type:"action",id:"account-settings",label:"Account Settings & Credentials",icon:"⚙️",sub:"Update username, email, and password",action:()=>{re()}}),l.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>X()});let r=0,c=[...l];function y(){if(!c.length){s.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}s.innerHTML=c.map((u,S)=>`
      <div class="cmd-result ${S===r?"selected":""}" data-idx="${S}">
        <div class="cmd-result-icon">${u.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${w(u.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${w(u.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),s.querySelectorAll(".cmd-result").forEach(u=>{u.onmouseenter=()=>{r=Number(u.dataset.idx),h()},u.onclick=()=>{v(Number(u.dataset.idx))}})}function h(){s.querySelectorAll(".cmd-result").forEach((u,S)=>{u.classList.toggle("selected",S===r)})}function v(u){const S=c[u];S&&S.action&&(I(),S.action())}function x(){const u=document.getElementById("topbarUserDropdown");u&&(u.style.display="none"),i.classList.add("open"),t.value="",c=[...l],r=0,y(),setTimeout(()=>t.focus(),50)}function I(){i.classList.remove("open"),t.blur()}n&&(n.onclick=x),o&&(o.onclick=x),a&&(a.onclick=()=>{const u=document.getElementById("topbarUserDropdown");u&&(u.style.display="none"),x()}),p&&(p.onclick=I),i.onclick=u=>{u.target===i&&I()},t.oninput=()=>{const u=t.value.trim().toLowerCase();u?c=l.filter(S=>S.label.toLowerCase().includes(u)||S.sub.toLowerCase().includes(u)):c=[...l],r=0,y()},t.onkeydown=u=>{if(u.key==="ArrowDown"){if(u.preventDefault(),c.length>0){r=(r+1)%c.length,h();const S=s.querySelector(".cmd-result.selected");S&&S.scrollIntoView({block:"nearest"})}}else if(u.key==="ArrowUp"){if(u.preventDefault(),c.length>0){r=(r-1+c.length)%c.length,h();const S=s.querySelector(".cmd-result.selected");S&&S.scrollIntoView({block:"nearest"})}}else u.key==="Enter"?(u.preventDefault(),v(r)):u.key==="Escape"&&(u.preventDefault(),I())};const m=u=>{(u.metaKey||u.ctrlKey)&&u.key.toLowerCase()==="k"?(u.preventDefault(),i.classList.contains("open")?I():x()):u.key==="Escape"&&i.classList.contains("open")&&I()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=m,window.addEventListener("keydown",m)}function ct(e=4){return`
    <div class="grid grid-${Math.min(e,4)}" style="margin-bottom:24px">
      ${Array(e).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function dt(e,i,t="📁",s=""){return`
    <div class="empty">
      <span class="empty-icon">${t}</span>
      <h3>${w(e)}</h3>
      <p>${w(i)}</p>
      ${s}
    </div>`}function pt(e,i,t="",s="📊",n=""){let o="";return n&&(o=`<span class="kpi-trend ${n.startsWith("+")||n.includes("↑")||n.toLowerCase().includes("up")?"up":"down"}">${w(n)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${w(e)}</span>
        <div class="kpi-icon">${s}</div>
      </div>
      <div class="kpi-value">${w(i)}</div>
      <div class="kpi-sub">${o}<span>${w(t)}</span></div>
    </div>`}function ut(e,i="gray"){return`<span class="badge ${i}">${w(e)}</span>`}function mt(e,i="indigo"){const t=Math.min(100,Math.max(0,Number(e)||0));return`
    <div class="progress-bar-wrap" title="${t.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${t}%"></div>
    </div>`}function gt(e){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([t,s])=>`<button class="pchip ${e===t?"active":""}" data-period="${t}">${s}</button>`).join("")}</div>`}function ft(e){if(!e)return"U";const i=e.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function j(e){if(e=Number(e)||0,e===0)return"0 B";const i=1024,t=["B","KB","MB","GB","TB"],s=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,s)).toFixed(1))+" "+(t[s]||"GB")}const vt=j;function be(e){if(!e)return"";if(/^https?:\/\//i.test(e)||e.startsWith("data:")||e.startsWith("blob:"))return e;if(/^https?:\/\//i.test(oe))try{return new URL(oe).origin+(e.startsWith("/")?e:"/"+e)}catch{}return e}function G(e="",i=""){const t=(e.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico","tiff","tif","heic","heif"].includes(t)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:t==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(t)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods","tsv"].includes(t)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["ppt","pptx","key"].includes(t)?{icon:"📑",cls:"pres",label:"Presentation"}:["zip","rar","7z","tar","gz","bz2"].includes(t)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm","m4v","3gp","wmv","flv"].includes(t)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a","flac","aac","wma"].includes(t)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:["psd","ai","eps","sketch","fig","xd","blend","obj","fbx","cdr"].includes(t)?{icon:"🎨",cls:"design",label:"Design & Creative"}:["js","ts","jsx","tsx","html","css","json","xml","py","sql","md","sh","php"].includes(t)?{icon:"💻",cls:"code",label:"Code File"}:{icon:"📎",cls:"other",label:"File"}}function yt(e){return e?G(e.name||e.filename||"",e.type||"").cls==="img":!1}function $e(e){if(!e||!e.url)return;const i=G(e.name,e.type),t=i.cls==="img",s=i.cls==="pdf",n=w(e.name||"Attachment"),o=j(e.size);let a="";t?a=`<img src="${e.url}" alt="${n}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${e.url}','_blank')">`:s?a=`<iframe src="${e.url}" title="${n}"></iframe>`:i.cls==="video"?a=`
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;width:100%;max-width:880px;">
        <video controls autoplay preload="metadata" style="max-height:70vh;width:100%;border-radius:8px;background:#000;box-shadow:0 8px 24px rgba(0,0,0,0.5);">
          <source src="${e.url}" type="${e.type||"video/mp4"}">
          Your browser does not support HTML5 video streaming.
        </video>
        <div style="margin-top:10px;font-size:12px;color:var(--text-3);display:flex;align-items:center;gap:12px;">
          <span>🎬 ${n}</span>
          <span>•</span>
          <span>${o}</span>
        </div>
      </div>
    `:i.cls==="audio"?a=`
      <div style="text-align:center;padding:32px 20px;max-width:480px;margin:0 auto">
        <div style="font-size:44px;margin-bottom:12px">🎵</div>
        <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${n}</div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:16px">${o}</div>
        <audio controls autoplay style="width:100%;margin-bottom:16px;">
          <source src="${e.url}" type="${e.type||"audio/mpeg"}">
          Your browser does not support audio playback.
        </audio>
        <div>
          <a href="${e.url}" download="${n}" target="_blank" class="btn gold small">Download Audio</a>
        </div>
      </div>
    `:a=`
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:48px;margin-bottom:12px">${i.icon}</div>
        <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${n}</div>
        <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${o}</div>
        <a href="${e.url}" download="${n}" target="_blank" class="btn gold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Attachment
        </a>
      </div>
    `;const p=document.createElement("div");p.className="preview-modal-overlay",p.innerHTML=`
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${i.icon}</span>
          <span>${n}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${o})</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="${e.url}" download="${n}" target="_blank" class="btn ghost small" style="font-size:12px;padding:4px 10px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
          <button type="button" class="btn ghost small preview-modal-close" style="padding:4px 8px;font-size:14px">✕</button>
        </div>
      </div>
      <div class="preview-modal-body">
        ${a}
      </div>
    </div>
  `,p.onclick=d=>{(d.target===p||d.target.closest(".preview-modal-close"))&&p.remove()},document.body.appendChild(p)}function le(e=[],i={}){if(!e||!e.length)return"";const t=!!i.canDelete,s=e.filter(n=>!n||!n.url||n.type==="url"||/^https?:\/\//i.test(n.url||"")?!1:G(n.name,n.type).cls==="video"||n.name&&n.name.match(/\.(mp4|mov|webm|mkv|avi)$/i)||n.type&&n.type.startsWith("video/"));return`
    <div class="attachment-chips-wrap" data-attachments="${encodeURIComponent(JSON.stringify(e))}">
      ${i.title?`<div class="attachment-chips-header">📎 ${w(i.title)} <span style="font-weight:500;color:var(--text-4)">(${e.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${e.map((n,o)=>{const a=n.type==="url"||/^https?:\/\//i.test(n.url||""),p=a?{cls:"file-type-doc",icon:"🌐"}:G(n.name,n.type),d=w(n.name||(a?"Live Deliverable URL":"File")),l=a?"Live Link":j(n.size),g=p.cls==="video"||n.name&&n.name.match(/\.(mp4|mov|webm|mkv|avi)$/i),r=be(n.url);return`
            <div class="attachment-chip ${g?"is-video":""}" data-idx="${o}" title="${d} (${l})">
              <span class="file-type-icon ${p.cls}" style="width:22px;height:22px;font-size:12px">${p.icon}</span>
              ${a?`
                <a href="${n.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-name" style="text-decoration:none;color:inherit;cursor:pointer" title="Open live URL in new tab">
                  ${d} <span style="font-size:11px;opacity:0.75">↗</span>
                </a>
              `:`
                <span class="attachment-chip-name" onclick="window.__openPreview(${o}, this)">
                  ${d}
                  ${g?'<span class="badge blue" style="font-size:9.5px;padding:1px 4px;margin-left:5px">🎬 MP4 Video</span>':""}
                </span>
              `}
              <span class="attachment-chip-size">${l}</span>
              <div class="attachment-chip-actions">
                ${a?`
                  <a href="${n.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-btn" title="Open Live Link" onclick="event.stopPropagation()">🔗</a>
                `:`
                  <button type="button" class="attachment-chip-btn" title="${g?"Play Video":"View Preview"}" onclick="window.__openPreview(${o}, this)">${g?"▶️":"👁️"}</button>
                  <a href="${r}" download="${d}" target="_blank" class="attachment-chip-btn" title="Download File" onclick="event.stopPropagation()">⬇️</a>
                `}
                ${t?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${o}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>

      ${s.length>0?`
        <div class="attachment-videos-container" style="display:flex;flex-direction:column;gap:12px;margin-top:10px">
          ${s.map(n=>{const o=w(n.name||"Deliverable Video"),a=j(n.size),p=be(n.url);return`
              <div class="attachment-video-card" style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:8px;padding:12px;overflow:hidden">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:6px">
                  <span style="font-size:12.5px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px">
                    <span style="font-size:16px">🎬</span>
                    <span>${o}</span>
                    <span class="badge blue" style="font-size:10px;padding:2px 6px">${a}</span>
                  </span>
                  <a href="${p}" download="${o}" target="_blank" class="btn ghost small" style="font-size:11.5px;padding:3px 10px" onclick="event.stopPropagation()">
                    ⬇️ Download Video (${a})
                  </a>
                </div>
                <video controls preload="metadata" style="width:100%;max-height:380px;background:#000;border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,0.4);" playsinline>
                  <source src="${p}" type="${n.type||"video/mp4"}">
                  Your browser does not support HTML5 video streaming.
                </video>
              </div>
            `}).join("")}
        </div>
      `:""}
    </div>
  `}const D={};function Se(e,i){return new Promise((t,s)=>{const n=new XMLHttpRequest,o=typeof F=="function"?F():localStorage.getItem("ci360_token")||"",a=encodeURIComponent(e.name||"file.bin"),p=e.type||"application/octet-stream",d=oe.replace(/\/+$/,""),l=o?`&token=${encodeURIComponent(o)}`:"",g=`${d}/upload/stream?name=${a}&type=${encodeURIComponent(p)}${l}`;n.open("POST",g,!0),o&&n.setRequestHeader("Authorization","Bearer "+o),n.setRequestHeader("Content-Type","application/octet-stream"),n.setRequestHeader("X-File-Name",a),n.setRequestHeader("X-File-Type",p),n.upload&&(n.upload.onprogress=r=>{if(r.lengthComputable&&typeof i=="function"){const c=Math.min(99,Math.round(r.loaded/r.total*100));i(c,r.loaded,r.total)}}),n.onload=()=>{if(n.status>=200&&n.status<300)try{const r=JSON.parse(n.responseText);typeof i=="function"&&i(100,e.size,e.size),t(r.file||r.files&&r.files[0])}catch{s(new Error("Failed to parse upload response"))}else try{const r=JSON.parse(n.responseText);s(new Error(r.error||`Upload failed with HTTP ${n.status}`))}catch{s(new Error(`Upload failed with HTTP ${n.status}`))}},n.onerror=()=>s(new Error("Network error during file upload. Please check connection.")),n.ontimeout=()=>s(new Error("Upload timed out. File may be too heavy or connection slow.")),n.timeout=36e5,n.send(e)})}async function Fe(e,i){const t=Array.from(e||[]);if(!t.length)return[];const s=new Array(t.length),n={};for(let l=0;l<t.length;l++)n[l]=0;let o=0;const a=3;async function p(){for(;o<t.length;){const l=o++,g=t[l];try{const r=await Se(g,(c,y,h)=>{if(n[l]=c,typeof i=="function"){const v=Object.values(n).reduce((I,m)=>I+m,0),x=Math.round(v/t.length);i(x,y,h,g,l,t.length)}});s[l]=r}catch(r){if(console.warn("Fast upload error for",g.name,r),g.size<10*1024*1024){const c=await new Promise(y=>{const h=new FileReader;h.onload=()=>y({name:g.name,url:h.result,size:g.size,type:g.type||"application/octet-stream",uploadedAt:new Date}),h.onerror=()=>y(null),h.readAsDataURL(g)});s[l]=c}else throw r}}}const d=[];for(let l=0;l<Math.min(a,t.length);l++)d.push(p());return await Promise.all(d),s.filter(Boolean)}async function bt(e,i){return Fe(e,i)}function Ce({id:e="uploader",label:i="Attachments & Files",subtitle:t="Upload any file: MP4 videos (up to 1GB), images, PDFs, spreadsheets, design assets, or archives",multiple:s=!0,accept:n="",maxFiles:o=30}={}){const a=n?`accept="${n}"`:"";return`
    <div class="uploader-container" id="container-${e}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${w(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${e}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${e}">
        <input type="file" id="input-${e}" ${s?"multiple":""} ${a} style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${w(t)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${e}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${e}"></div>
    </div>
  `}function Ie(e,i={}){const t=document.getElementById("zone-"+e),s=document.getElementById("input-"+e),n=document.getElementById("list-"+e),o=document.getElementById("count-"+e);D[e]=i.existing?[...i.existing]:[];function a(){const d=D[e]||[];if(o&&(o.textContent=`${d.length} file${d.length===1?"":"s"} attached`),!!n){if(!d.length){n.innerHTML="";return}n.innerHTML=d.map((l,g)=>{const r=G(l.name,l.type),c=w(l.name||"File"),y=j(l.size),h=r.cls==="video"||l.name&&l.name.match(/\.(mp4|mov|webm|mkv|avi)$/i)||l.type&&l.type.startsWith("video/"),v=be(l.url);return`
        <div class="uploader-file-item ${h?"is-video":""}" style="display:flex;flex-direction:column;gap:6px;padding:8px 10px;background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:6px;margin-bottom:8px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <div class="uploader-file-info" style="display:flex;align-items:center;gap:8px;min-width:0;flex:1">
              <span class="file-type-icon ${r.cls}" style="width:24px;height:24px;font-size:13px">${r.icon}</span>
              <div style="min-width:0;flex:1">
                <div class="uploader-file-name" title="${c}" style="font-size:12px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                  ${c}
                  ${h?'<span class="badge blue" style="font-size:9.5px;padding:1px 5px;margin-left:6px">🎬 Video Deliverable</span>':""}
                </div>
                <div class="uploader-file-size" style="font-size:11px;color:var(--text-3)">${r.label} · ${y}</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${e}', ${g})">Preview / Play</button>
              <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${e}', ${g})">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
          ${h&&v?`
            <div style="margin-top:4px;border-radius:6px;overflow:hidden;background:#000;border:1px solid var(--border-sm)">
              <video controls preload="metadata" style="width:100%;max-height:240px;display:block;" playsinline>
                <source src="${v}" type="${l.type||"video/mp4"}">
                Your browser does not support HTML5 video streaming.
              </video>
            </div>
          `:""}
        </div>
      `}).join(""),i.onChange&&i.onChange(d)}}async function p(d){const l=Array.from(d||[]);if(l.length&&n){for(let g=0;g<l.length;g++){const r=l[g],c=`up-prog-${Date.now()}-${g}`,y=w(r.name||"video.mp4"),h=j(r.size),v=r.type?.startsWith("video/")||r.name?.match(/\.(mp4|mov|webm|mkv|avi)$/i),x=document.createElement("div");x.id=c,x.className="uploader-progress-card",x.style.cssText="padding:10px 12px;background:var(--bg-elevated);border:1px solid var(--brand-500,#3b82f6);border-radius:6px;margin-bottom:8px;",x.innerHTML=`
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:12px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px">
            <span>${v?"🎬":"📎"}</span>
            <span style="max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${y}</span>
          </span>
          <span style="font-size:11.5px;font-weight:700;color:var(--brand-500,#3b82f6)" id="${c}-percent">0%</span>
        </div>
        <div style="background:rgba(255,255,255,0.12);height:7px;border-radius:4px;overflow:hidden;margin-bottom:6px">
          <div id="${c}-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #3b82f6, #06b6d4);transition:width 0.1s linear;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--text-3)">
          <span id="${c}-status">Uploading ${h}… please wait</span>
          <span id="${c}-bytes">0 MB / ${h}</span>
        </div>
      `,n.appendChild(x);try{const I=await Se(r,(m,u,S)=>{const A=document.getElementById(`${c}-bar`),T=document.getElementById(`${c}-percent`),b=document.getElementById(`${c}-bytes`);A&&(A.style.width=`${m}%`),T&&(T.textContent=`${m}%`),b&&(b.textContent=`${j(u)} / ${j(S)}`)});x.remove(),I&&(D[e]=[...D[e]||[],I],a())}catch(I){console.error("File upload failed:",I);const m=document.getElementById(`${c}-status`);m&&(m.textContent="❌ Upload failed: "+(I.message||"Network error"),m.style.color="var(--red-500, #ef4444)"),E("Upload failed for "+r.name+": "+(I.message||"Network error"),!0)}}E("File attached successfully! ✓")}}window.__removeUploaderFile=(d,l)=>{if(D[d]){D[d].splice(l,1);const g=window[`__update_${d}`];g&&g()}},window.__previewUploaderFile=(d,l)=>{const g=(D[d]||[])[l];g&&$e(g)},window[`__update_${e}`]=a,t&&s&&(t.onclick=d=>{d.target.tagName!=="BUTTON"&&!d.target.closest("button")&&s.click()},t.ondragover=d=>{d.preventDefault(),t.classList.add("dragover")},t.ondragleave=()=>t.classList.remove("dragover"),t.ondrop=async d=>{d.preventDefault(),t.classList.remove("dragover"),d.dataTransfer&&d.dataTransfer.files&&d.dataTransfer.files.length&&await p(d.dataTransfer.files)},s.onchange=async()=>{const d=Array.from(s.files||[]);s.value="",d.length>0&&await p(d)}),a()}function Te(e){return D[e]||[]}function Re(e,i=[]){D[e]=[...i];const t=window[`__update_${e}`];t&&t()}window.__openPreview=(e,i)=>{const t=i.closest(".attachment-chips-wrap")||i.closest("[data-attachments]");if(!t)return;const s=i.closest(".attachment-chip"),n=s?Number(s.dataset.idx):e,o=t.dataset.attachments||t.parentElement?.dataset?.attachments;if(o)try{const a=JSON.parse(decodeURIComponent(o));a[n]&&$e(a[n])}catch{}};function ht(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");return`
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
        ${Ce({id:"tkup-"+t,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const wt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},kt={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function xt(e,i){const t=(e.status||"Open").toLowerCase().replace(" ","-"),s=e.status==="Open",n=(e._id||"").slice(-4).toUpperCase(),o=ft(e.userName),a=encodeURIComponent(JSON.stringify(e.attachments||[])),p=encodeURIComponent(JSON.stringify(e.adminAttachments||[]));return`
    <div class="ticket-card status-${t}" id="tkcard-${e._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${n}</span>
            <span class="ticket-subject">${w(e.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${wt[e.status]||"gray"}">
            ${s?'<span class="pulse-dot"></span>':""} ${w(e.status)}
          </span>
          <span class="badge ${kt[e.priority]||"gray"}">${w(e.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${o}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${w(e.userName)}
            <span class="ticket-role-pill">${w(e.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${ae(e.createdAt)} · ${te(e.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${w(e.message)}</div>

      ${e.attachments&&e.attachments.length?`
        <div data-attachments="${a}">
          ${le(e.attachments,{title:"Ticket Attachments"})}
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
              ${e.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${ae(e.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${w(e.adminReply)}</div>
            ${e.adminAttachments&&e.adminAttachments.length?`
              <div data-attachments="${p}">
                ${le(e.adminAttachments,{title:"Support Attached Files"})}
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
            <textarea id="tkreplytxt-${e._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${w(e.adminReply||"")}</textarea>
            ${Ce({id:"tkreplyup-"+e._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${e._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${e._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function W(e,i,t){const s=document.getElementById("tklist-"+i),n=document.getElementById("tkcnt-"+i);if(s)try{const o=await J("/tickets/job/"+e);n&&(n.textContent=o.length),o.length?(s.innerHTML=o.map(a=>xt(a,t)).join(""),Bt(e,i,t,s,o)):s.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{s.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function Bt(e,i,t,s,n){t&&(s.querySelectorAll(".tk-status-sel").forEach(o=>{o.onchange=async()=>{try{await H("/tickets/"+o.dataset.tkid,{status:o.value}),E("Status updated"),W(e,i,t)}catch(a){E(a.message,!0)}}}),s.querySelectorAll(".tk-quick-resolve-btn").forEach(o=>{o.onclick=async()=>{try{await H("/tickets/"+o.dataset.tkid,{status:"Resolved"}),E("Ticket marked as Resolved! 🎉"),W(e,i,t)}catch(a){E(a.message,!0)}}}),s.querySelectorAll(".ticket-template-btn").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplytxt-"+o.dataset.tkid);a&&(a.value=o.dataset.tpl,a.focus())}}),s.querySelectorAll(".tk-reply-toggle").forEach(o=>{o.onclick=()=>{const a=o.dataset.tkid,p=document.getElementById("tkreplyform-"+a);if(p){p.classList.toggle("show");const d=n.find(l=>l._id===a);Ie("tkreplyup-"+a,{existing:d?d.adminAttachments:[]})}}}),s.querySelectorAll(".tk-reply-cancel").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplyform-"+o.dataset.tkid);a&&a.classList.remove("show")}}),s.querySelectorAll(".tk-reply-save").forEach(o=>{o.onclick=async()=>{const a=o.dataset.tkid,p=document.getElementById("tkreplytxt-"+a);if(!p)return;const d=Te("tkreplyup-"+a);try{await H("/tickets/"+a,{adminReply:p.value.trim(),adminAttachments:d}),E("Response saved! 🛡️"),W(e,i,t)}catch(l){E(l.message,!0)}}}),s.querySelectorAll(".tk-del-btn").forEach(o=>{o.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await Y("/tickets/"+o.dataset.tkid),E("Ticket deleted"),W(e,i,t)}catch(a){E(a.message,!0)}}}))}function $t(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");W(e,t,i),Ie("tkup-"+t);const s=document.querySelector(`[data-jobid="${e}"].ticket-toggle-btn`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+t);if(!a)return;const p=a.style.display==="block";a.style.display=p?"none":"block",s.textContent=p?"+ Raise Ticket":"✕ Cancel"});const n=document.querySelector(`.tk-cancel-btn[data-safeid="${t}"]`);n&&(n.onclick=()=>{const a=document.getElementById("tkform-"+t);a&&(a.style.display="none"),s&&(s.textContent="+ Raise Ticket")});const o=document.querySelector(`.tk-submit-btn[data-safeid="${t}"]`);o&&(o.onclick=async()=>{const a=(document.getElementById("tksub-"+t)||{}).value?.trim(),p=(document.getElementById("tkmsg-"+t)||{}).value?.trim(),d=(document.getElementById("tkpri-"+t)||{}).value,l=Te("tkup-"+t);if(!a){E("Please enter a subject",!0);return}if(!p){E("Please enter a message",!0);return}o.disabled=!0,o.textContent="Submitting…";try{await ce("/tickets",{jobId:e,subject:a,message:p,priority:d,attachments:l}),E("Ticket submitted! 🎫");const g=document.getElementById("tkform-"+t);g&&(g.style.display="none"),s&&(s.textContent="+ Raise Ticket");const r=document.getElementById("tksub-"+t),c=document.getElementById("tkmsg-"+t);r&&(r.value=""),c&&(c.value=""),Re("tkup-"+t,[]),W(e,t,i)}catch(g){E(g.message,!0)}finally{o.disabled=!1,o.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function St(){return""}function Ct(){}function He(e={}){const{title:i="Account Settings & Credentials",subtitle:t="Update your personal name, login email, and security password",showCardWrapper:s=!0,formId:n="accSettingsForm"}=e,o=N()||{},a=o.name?o.name.charAt(0).toUpperCase():"U",p=(o.role||"user").toUpperCase();return`
    <div class="${s?"card":""}" style="max-width:100%;margin:0;width:100%;box-sizing:border-box;" id="${n}-wrap">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--gold-500,#d4af37),#b8860b);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:20px;box-shadow:0 4px 12px rgba(212,175,55,0.25);flex-shrink:0;">
          ${w(a)}
        </div>
        <div style="min-width:0;flex:1;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <h3 style="font-size:18px;font-weight:700;color:var(--text-1);margin:0;">${w(i)}</h3>
            <span class="badge gold" style="font-size:11px;padding:2px 8px;">${w(p)}</span>
          </div>
          <div style="font-size:13px;color:var(--text-3);margin-top:2px;">${w(t)}</div>
        </div>
      </div>

      <form id="${n}" onsubmit="return false;" style="display:flex;flex-direction:column;gap:20px;">
        <!-- Personal Identity -->
        <div>
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--gold-500,#d4af37);margin-bottom:12px;display:flex;align-items:center;gap:6px;">
            <span>👤</span> Profile Identity
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
            <div class="field" style="margin-bottom:0;">
              <label for="${n}-name" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Username / Full Name *</label>
              <input type="text" id="${n}-name" class="input" value="${w(o.name||"")}" placeholder="Your display name" required autocomplete="name">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${n}-email" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Email Address *</label>
              <input type="email" id="${n}-email" class="input" value="${w(o.email||"")}" placeholder="name@company.com" required autocomplete="email">
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
            <label for="${n}-currentPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Current Password</label>
            <div style="position:relative;">
              <input type="password" id="${n}-currentPass" class="input" placeholder="Enter current password" autocomplete="current-password" style="padding-right:42px;">
              <button type="button" class="pass-toggle-btn" data-target="${n}-currentPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
            <div class="field" style="margin-bottom:0;">
              <label for="${n}-newPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">New Password</label>
              <div style="position:relative;">
                <input type="password" id="${n}-newPass" class="input" placeholder="Min. 6 characters" autocomplete="new-password" style="padding-right:42px;">
                <button type="button" class="pass-toggle-btn" data-target="${n}-newPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
              </div>
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${n}-confirmPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Confirm New Password</label>
              <div style="position:relative;">
                <input type="password" id="${n}-confirmPass" class="input" placeholder="Re-enter new password" autocomplete="new-password" style="padding-right:42px;">
                <button type="button" class="pass-toggle-btn" data-target="${n}-confirmPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Alert Notice Box -->
        <div id="${n}-alert" style="display:none;padding:12px 14px;border-radius:8px;font-size:13px;line-height:1.4;"></div>

        <!-- Footer Actions -->
        <div style="display:flex;align-items:center;justify-content:flex-end;gap:12px;padding-top:8px;">
          <button type="button" class="btn gold" id="${n}-saveBtn" style="min-width:150px;display:flex;align-items:center;justify-content:center;gap:8px;">
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  `}function Ve(e,i={}){const{formId:t="accSettingsForm",onSaved:s=null,modalBg:n=null}=i,o=e||document;o.querySelectorAll(".pass-toggle-btn").forEach(g=>{g.onclick=()=>{const r=g.dataset.target,c=o.querySelector("#"+r)||document.getElementById(r);if(c){const y=c.type==="password";c.type=y?"text":"password",g.textContent=y?"🙈":"👁️",g.style.opacity=y?"1":"0.65"}}});const a=o.querySelector("#"+t+"-saveBtn")||document.getElementById(t+"-saveBtn"),p=o.querySelector("#"+t+"-alert")||document.getElementById(t+"-alert");function d(g,r=!0){p&&(p.style.display="block",p.style.background=r?"rgba(239,68,68,0.12)":"rgba(34,197,94,0.12)",p.style.border=r?"1px solid rgba(239,68,68,0.3)":"1px solid rgba(34,197,94,0.3)",p.style.color=r?"#ef4444":"#22c55e",p.innerHTML=(r?"⚠️ ":"✓ ")+w(g))}function l(){p&&(p.style.display="none")}a&&(a.onclick=async()=>{l();const g=o.querySelector("#"+t+"-name")||document.getElementById(t+"-name"),r=o.querySelector("#"+t+"-email")||document.getElementById(t+"-email"),c=o.querySelector("#"+t+"-currentPass")||document.getElementById(t+"-currentPass"),y=o.querySelector("#"+t+"-newPass")||document.getElementById(t+"-newPass"),h=o.querySelector("#"+t+"-confirmPass")||document.getElementById(t+"-confirmPass"),v=(g?.value||"").trim(),x=(r?.value||"").trim(),I=c?.value||"",m=y?.value||"",u=h?.value||"";if(!v){d("Please enter your full name or username.",!0),g?.focus();return}if(!x||!x.includes("@")){d("Please enter a valid email address.",!0),r?.focus();return}if(m||u){if(!I){d("Please enter your current password to set a new password.",!0),c?.focus();return}if(m.length<6){d("New password must be at least 6 characters long.",!0),y?.focus();return}if(m!==u){d("New passwords do not match. Please re-check.",!0),h?.focus();return}}const S={name:v,email:x};m&&(S.currentPassword=I,S.newPassword=m);const A=a.innerHTML;a.disabled=!0,a.innerHTML="<span>Saving Changes…</span>";try{const T=await H("/auth/profile",S);T&&T.token&&T.user&&he(T.token,T.user),document.querySelectorAll(".topbar-user-name, .sidebar-user .name, .tud-name").forEach(f=>{f.textContent=T.user.name}),document.querySelectorAll(".tud-email").forEach(f=>{f.textContent=T.user.email});const b=T.user.name?T.user.name.charAt(0).toUpperCase():"U";document.querySelectorAll(".topbar-user-avatar span, .user-avatar, .tud-avatar").forEach(f=>{f.classList.contains("topbar-online-dot")||(f.textContent=b)}),c&&(c.value=""),y&&(y.value=""),h&&(h.value=""),d("Account credentials updated successfully!",!1),E("Account settings saved! ✓"),typeof s=="function"&&s(T.user),n&&setTimeout(()=>{try{n.remove()}catch{}},900)}catch(T){d(T.message||"Failed to update credentials. Please try again.",!0),E(T.message||"Update failed",!0)}finally{a.disabled=!1,a.innerHTML=A}})}function re(){const e=`
    <div style="position:relative;padding:12px 6px;">
      <button type="button" id="closeAccSettingsModalBtn" style="position:absolute;top:-4px;right:0;border:none;background:transparent;color:var(--text-3);font-size:20px;cursor:pointer;padding:6px 10px;" aria-label="Close modal">✕</button>
      ${He({title:"Account Settings",subtitle:"Manage your personal email, username, and password",showCardWrapper:!1,formId:"modalAccSettingsForm"})}
    </div>
  `,i=ie(e),t=i.querySelector("#closeAccSettingsModalBtn");return t&&(t.onclick=()=>i.remove()),Ve(i,{formId:"modalAccSettingsForm",modalBg:i}),i}window.__setTheme=function(e){K(e)};Object.assign(window,{getToken:F,getUser:N,setSession:he,clearSession:ee,requireAuth:Je,initTheme:Le,api:U,apiGet:J,apiPost:ce,apiPut:H,apiPatch:We,apiDelete:Y,fmtINR:ve,fmtHours:Xe,escapeHtml:w,fmtDate:te,flashToast:E,openModal:ie,logout:X,getTheme:L,setTheme:K,initServiceWorker:we,playNotificationChime:de,triggerPhoneVibration:pe,requestNotificationPermission:ke,triggerSystemNotification:ue,fmtFileSize:j,formatFileSize:vt,uploadSingleFileDirectly:Se,uploadMultipleFilesFast:Fe,getFileCategory:G,isImageAttachment:yt,openFilePreviewModal:$e,renderAttachmentChips:le,uploadFilesToServer:bt,renderAttachmentUploader:Ce,bindAttachmentUploader:Ie,getUploaderAttachments:Te,setUploaderAttachments:Re,renderRoleSwitcher:St,bindRoleSwitcher:Ct,renderNotificationBell:Ue,initNotificationBell:Oe,openNotificationModal:ye,getNotifIcon:Be,renderAppShell:at,bindAppShellEvents:lt,renderSkeletonCards:ct,renderEmptyState:dt,renderKpiCard:pt,renderBadge:ut,renderProgressBar:mt,renderPeriodPicker:gt,renderSupportTicketSection:ht,bindSupportTicketSection:$t,renderAccountSettingsCard:He,bindAccountSettingsCard:Ve,openAccountSettingsModal:re,getArchive:Ke,restoreArchiveItem:Ge,purgeArchiveItem:Ye,purgeAllArchive:Qe,DEFAULT_SIDEBAR_CONFIG:ge,getCachedSidebarNavConfig:fe,fetchSidebarNavConfig:it,saveSidebarNavConfig:nt,resetSidebarNavConfig:ot,filterTabsForDashboard:qe,saveUserModulePermissions:st});export{F as A,ee as B,he as C,ge as D,Je as a,lt as b,J as c,it as d,w as e,qe as f,ve as g,te as h,Le as i,ce as j,E as k,Y as l,H as m,He as n,Ve as o,ie as p,fe as q,at as r,st as s,nt as t,ot as u,We as v,j as w,ae as x,Fe as y,N as z};
