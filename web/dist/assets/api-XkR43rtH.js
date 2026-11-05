(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const ie="/api";function R(){return localStorage.getItem("ci360_token")}function P(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function Me(e,i){localStorage.setItem("ci360_token",e),localStorage.setItem("ci360_user",JSON.stringify(i))}function X(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function Re(e){const i=R(),t=P();if(!i||!t)return X(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null;const s=t.role==="superadmin"||t.role==="admin",n=t.name&&t.name.toLowerCase().includes("ekta")||t.email&&t.email.toLowerCase().includes("ekta");if(e&&t.role!==e&&!s){if((t.role==="accounts"||n)&&(e==="accounts"||e==="employee"))return t;const o=s?"/admin":t.role==="accounts"||n?"/accounts":t.role==="employee"?"/employee":t.role==="client"?"/client":null;return!o||typeof window<"u"&&window.location.pathname.startsWith(o)?(X(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null):(window.location.href=o,null)}return t}async function j(e,i={}){const t=R(),s=Object.assign({"Content-Type":"application/json"},i.headers||{});t&&(s.Authorization="Bearer "+t);const n=await fetch(ie+e,Object.assign({},i,{headers:s}));let o=null;try{o=await n.json()}catch{}if(n.status===401)throw e==="/auth/login"||e.includes("/auth/login")?new Error(o&&o.error||"Invalid username/email or password."):(X(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login?expired=1"),new Error(o&&o.error||"Session expired. Please sign in again."));if(!n.ok)throw new Error(o&&o.error||"Server status "+n.status+" — Backend waking up, please retry in 10s.");return i.method&&i.method!=="GET"&&!e.includes("/notifications")&&typeof window<"u"&&typeof window.ci360FetchNotifications=="function"&&setTimeout(()=>{try{window.ci360FetchNotifications()}catch{}},350),o}const V=e=>j(e,{method:"GET"}),fe=(e,i)=>j(e,{method:"POST",body:JSON.stringify(i)}),G=(e,i)=>j(e,{method:"PUT",body:JSON.stringify(i)}),Oe=(e,i)=>j(e,{method:"PATCH",body:JSON.stringify(i)}),J=e=>j(e,{method:"DELETE"}),He=e=>V("/archive"+(e?`?type=${encodeURIComponent(e)}`:"")),Fe=(e,i)=>fe(`/archive/restore/${e}/${i}`,{}),Ve=(e,i)=>J(`/archive/purge/${e}/${i}`),We=e=>J(`/archive/purge-all/${e}`);function pe(e){return e=Number(e)||0,"₹"+e.toLocaleString("en-IN",{maximumFractionDigits:0})}function Je(e){return(Number(e)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function b(e){return e==null?"":String(e).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function Z(e){return e?new Date(e).toISOString().slice(0,10):"—"}function N(){return localStorage.getItem("ci360_theme")||"light"}function F(e){localStorage.setItem("ci360_theme",e),document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),s=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),s&&(s.textContent=e==="dark"?"Light Mode":"Dark Mode");const n=document.getElementById("mmsToggleThemeBtn");if(n){const o=n.querySelector("span");o&&(o.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function _e(){if(typeof document<"u"&&(document.body?.classList.contains("login-page")||window.location.pathname.includes("login")||document.querySelector(".login-box"))){document.documentElement.setAttribute("data-theme","dark");return}const e=N();document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),s=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),s&&(s.textContent=e==="dark"?"Light Mode":"Dark Mode");const n=document.getElementById("mmsToggleThemeBtn");if(n){const o=n.querySelector("span");o&&(o.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{_e()}catch{}function M(e,i){const t=document.createElement("div");t.className="toast",t.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",t.textContent=(i?"⚠️  ":"✓  ")+e,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(10px)",setTimeout(()=>t.remove(),200)},2800)}function ee(e){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${e}</div>`,i.onclick=t=>{t.target===i&&i.remove()},document.body.appendChild(i),i}function Y(){X(),window.location.href="/login"}let Q=null;async function ge(){if("serviceWorker"in navigator)try{Q=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",Q.scope),typeof Notification<"u"&&Notification.permission==="granted"&&R()&&de(Q).catch(()=>{})}catch(e){console.warn("CI360 Service Worker registration notice:",e)}}try{ge()}catch{}let Be=0,Se=0;const q=new Set,Ce=new Set;let Ie=!1;function Ae(e){try{const i=typeof P=="function"?P():null,t=i&&i._id?String(i._id):"default";return`${e}_${t}`}catch{return`${e}_default`}}function ne(){try{const e=Ae("ci360_alerted_ids"),i=localStorage.getItem(e);if(i){const t=JSON.parse(i);Array.isArray(t)&&t.forEach(s=>q.add(String(s)))}}catch{}}function te(){try{const e=Ae("ci360_alerted_ids"),i=Array.from(q).slice(-2e3);localStorage.setItem(e,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",e=>{e.key&&e.key.includes("ci360_alerted_ids")&&ne()});let K=null;function Ke(){if(typeof window>"u")return;const e=()=>{try{const i=window.AudioContext||window.webkitAudioContext;i&&(K||(K=new i),K.state==="suspended"&&K.resume())}catch{}window.removeEventListener("touchstart",e,!0),window.removeEventListener("pointerdown",e,!0),window.removeEventListener("click",e,!0)};window.addEventListener("touchstart",e,!0),window.addEventListener("pointerdown",e,!0),window.addEventListener("click",e,!0)}Ke();function le(){try{const e=Date.now();if(e-Be<2500)return;Be=e;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=K||new i;t.state==="suspended"&&t.resume();const s=t.currentTime,n=t.createOscillator(),o=t.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,s),o.gain.setValueAtTime(0,s),o.gain.linearRampToValueAtTime(.25,s+.02),o.gain.exponentialRampToValueAtTime(.001,s+.38),n.connect(o),o.connect(t.destination),n.start(s),n.stop(s+.38);const a=t.createOscillator(),u=t.createGain();a.type="sine",a.frequency.setValueAtTime(880,s+.12),u.gain.setValueAtTime(0,s+.12),u.gain.linearRampToValueAtTime(.28,s+.14),u.gain.exponentialRampToValueAtTime(.001,s+.6),a.connect(u),u.connect(t.destination),a.start(s+.12),a.stop(s+.6)}catch{}}function re(){try{const e=Date.now();if(e-Se<2500)return;Se=e,"vibrate"in navigator&&navigator.vibrate([200,100,200,100,200])}catch{}}function Ne(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function Le(){try{if(Ne()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function ve(){if(!("Notification"in window))return M("Your device browser does not support Web Notifications.",!0),!1;try{const e=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return e==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),await de(),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),M("Notifications successfully enabled on this device!"),le(),re(),await ce({title:"CI360 Alerts Active 🔔",message:"Instant notifications are now live on this device for jobs, tasks, and overdue invoices!",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),M("Notification permission was not granted.",!0),!1)}catch(e){console.error("Notification permission request error:",e)}return!1}async function ce({title:e,message:i,type:t,id:s,url:n}){const o=s?String(s):null;if(ne(),o&&q.has(o)||(o&&(q.add(o),te()),le(),re(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return;localStorage.setItem("ci360_notif_enabled","true")}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",u={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:o?`ci360-notif-${o}`:"ci360-alert-"+Date.now(),renotify:!0,vibrate:[200,100,200,100,200],data:{url:n||(typeof window<"u"?window.location.href:""),type:t||"general"}};try{navigator.serviceWorker&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:e,options:u})}catch{}try{if("serviceWorker"in navigator){const p=Q||await navigator.serviceWorker.getRegistration();if(p&&p.showNotification){await p.showNotification(e,u);return}}}catch{}try{const p=new Notification(e,u);p.onclick=()=>{window.focus(),p.close()};return}catch{}}function Ge(e){const i="=".repeat((4-e.length%4)%4),t=(e+i).replace(/-/g,"+").replace(/_/g,"/"),s=window.atob(t),n=new Uint8Array(s.length);for(let o=0;o<s.length;++o)n[o]=s.charCodeAt(o);return n}async function de(e=null){try{if(typeof window>"u"||!("serviceWorker"in navigator)||!("PushManager"in window)||typeof Notification>"u"||Notification.permission!=="granted"||!R())return null;const t=e||Q||await navigator.serviceWorker.ready;if(!t||!t.pushManager)return null;let s=await t.pushManager.getSubscription();if(!s){const n=await V("/notifications/vapid-public-key").catch(()=>null),o=n&&n.publicKey?n.publicKey:"BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q";s=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Ge(o)})}if(s){const n=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return await j("/notifications/subscribe",{method:"POST",body:JSON.stringify({subscription:s.toJSON?s.toJSON():s,deviceType:n?"mobile":"desktop"})}).catch(()=>{}),s}}catch(i){console.warn("Push subscription registration notice:",i.message)}return null}if(typeof window<"u"&&(window.triggerSystemNotification=ce,window.requestNotificationPermission=ve,window.registerPushSubscription=de,"Notification"in window)){const e=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",e,!0),window.removeEventListener("touchstart",e,!0)};window.addEventListener("click",e,!0),window.addEventListener("touchstart",e,!0)}function ye(e){return e?String(e).replace(/^[\p{Extended_Pictographic}\u2000-\u3300\uD800-\uDFFF\uFE00-\uFE0F\s]+/u,"").trim()||e:""}function Ye(){if(typeof document>"u")return null;let e=document.getElementById("ci360FloatingContainer");return e||(e=document.createElement("div"),e.id="ci360FloatingContainer",e.className="ci360-floating-container",document.body.appendChild(e)),e}function Ee({id:e,title:i,message:t,type:s,time:n,actionText:o,onAction:a,persistent:u=!1,timeout:p=4500}){const r=Ye();if(!r)return;const f=`ci360-pop-${e||Math.random().toString(36).slice(2,9)}`;for(;r.firstChild;)try{r.removeChild(r.firstChild)}catch{}let l="🔔",d="info",v="View",w="";const c=(s||"").toLowerCase(),C=(t||"").toLowerCase();c.includes("chat_message")||c.includes("chat")||c.includes("message")?(l="💬",d="info",v="Open Chat",w="teambonding"):c.includes("game_challenge")||c.includes("game")||c.includes("invitation")||c.includes("challenge")?(l="🎮",d="warning",v="View Game",w="teambonding"):c.includes("invoice_overdue")?(l="🚨",d="critical",v="View Invoice",w="billing"):c.includes("invoice_paid")||c.includes("payment")?(l="💳",d="success",v="View Billing",w="billing"):c.includes("invoice")?(l="🧾",d="info",v="View Invoice",w="billing"):c.includes("job")&&(C.includes("overdue")||c.includes("overdue"))?(l="⚠️",d="critical",v="View Job",w="jobs"):c.includes("job")&&C.includes("due today")?(l="⏳",d="warning",v="View Job",w="jobs"):c.includes("job_created")||c.includes("job")||c.includes("status")?(l="📋",d="info",v="View Job",w="jobs"):c.includes("task")&&(C.includes("overdue")||c.includes("overdue"))?(l="⚠️",d="critical",v="View Planner",w="dailytasks"):c.includes("task_completed")?(l="✅",d="success",v="View Planner",w="dailytasks"):c.includes("task")?(l="📅",d="info",v="Open Planner",w="dailytasks"):c.includes("ticket_under_review")||c.includes("ticket")&&C.includes("under review")?(l="🔍",d="warning",v="Review Ticket",w="tickets"):c.includes("ticket_resolved")||c.includes("ticket_completed")||c.includes("ticket")&&C.includes("completed")?(l="✅",d="success",v="View Ticket",w="tickets"):c.includes("ticket")?(l="🎫",d="info",v="View Ticket",w="tickets"):c.includes("target")&&(l="🎯",d="success",v="View Targets",w="targets");const I=o||v;let B=ye(i||"Notification");l&&B.startsWith(l)&&(B=B.slice(l.length).trim());const m=document.createElement("div");m.id=f,m.className=`ci360-popup-card ci360-priority-${d}`,m.innerHTML=`
    <div class="ci360-popup-body">
      <div class="ci360-popup-header">
        <div class="ci360-popup-header-left">
          <span class="ci360-popup-icon">${l}</span>
          <span class="ci360-popup-title">${b(B||"Notification")}</span>
        </div>
        <div class="ci360-popup-header-right">
          ${I?`<button type="button" class="ci360-popup-action-btn">${I}</button>`:""}
          <button type="button" class="ci360-popup-close-btn" aria-label="Dismiss">✕</button>
        </div>
      </div>
      ${t?`<div class="ci360-popup-message">${b(t||"")}</div>`:""}
    </div>
  `,le(),re();const S=async()=>{if(e){try{await J(`/notifications/${e}`)}catch{}typeof window.ci360RemoveNotifFromUI=="function"&&window.ci360RemoveNotifFromUI(e)}},L=()=>{m.style.opacity="0",m.style.transform="translateY(-6px) scale(0.97)",setTimeout(()=>{try{m.remove()}catch{}},180),S()},E=m.querySelector(".ci360-popup-close-btn");E&&(E.onclick=k=>{k.stopPropagation(),L()});const y=()=>{if(typeof a=="function")a();else if(w&&typeof window.ci360NavTab=="function"){const k=typeof P=="function"?P():null;let $=w;k&&k.role==="employee"&&($==="jobs"||$==="myjobs")&&($="myjobs"),window.ci360NavTab($)}S(),L()},g=m.querySelector(".ci360-popup-action-btn");for(g&&(g.onclick=k=>{k.stopPropagation(),y()}),m.style.cursor="pointer",m.onclick=k=>{k.target.closest(".ci360-popup-close-btn")||y()};r.children.length>=1;){const k=r.firstChild;k&&r.removeChild(k)}r.appendChild(m),u||setTimeout(()=>{document.body.contains(m)&&L()},p||4500)}function Te(e=[]){if(!e||!e.length)return;const i=sessionStorage.getItem("ci360_client_overdue_dismissed");if(i&&Date.now()-Number(i)<2700*1e3)return;const t=e.reduce((u,p)=>u+(Number(p.pendingAmount||p.totalAmount)||0),0),s=`
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
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${pe(t)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${e.length} Overdue Invoice${e.length>1?"s":""}</span>
      </div>

      <div class="ci360-overdue-list">
        ${e.map(u=>{const p=u.dueDate?new Date(u.dueDate):new Date,r=Math.max(1,Math.floor((Date.now()-p.getTime())/(1e3*60*60*24)));return`
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${b(u.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${Z(u.dueDate)} <span style="color:var(--red-600);font-weight:700">(${r}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${pe(u.pendingAmount||u.totalAmount||0)}</div>
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
  `,n=ee(s),o=n.querySelector("#ci360OverduePayBtn"),a=n.querySelector("#ci360OverdueRemindBtn");o&&(o.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),n.remove(),typeof window.ci360NavTab=="function"&&window.ci360NavTab("billing")}),a&&(a.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),n.remove()})}function Pe(){return`
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

        ${!Le()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
    </div>`}function he(e){return e?e.startsWith("chat")||e.startsWith("message")?"💬":e.startsWith("game")||e.startsWith("invitation")||e.startsWith("challenge")?"🎮":e.startsWith("task_completed")?"🎉":e.startsWith("task_due")?"⚡":e.startsWith("task")?"✅":e.startsWith("target_completed")?"🎉":e.startsWith("target")?"🎯":e.startsWith("job_due")?"⏳":e.startsWith("job")?"📋":e.startsWith("ticket_under_review")?"🔍":e.startsWith("ticket_resolved")||e.startsWith("ticket_completed")?"✅":e.startsWith("ticket")?"🎫":e.startsWith("status")?"🔄":e.startsWith("test")?"🧪":"🔔":"🔔"}function oe(e){if(!e)return"";const i=new Date(e),s=Math.floor((new Date-i)/1e3);if(s<60)return"Just now";const n=Math.floor(s/60);if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const a=Math.floor(o/24);return a===1?"Yesterday":a<7?`${a}d ago`:Z(e)}function ue(e){if(!e)return;const i=he(e.type),t=(e.type||"").toLowerCase(),s=e.title||"Notification",n=e.message||"",o=e.createdAt?Z(e.createdAt)+" at "+new Date(e.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"Recently",a=oe(e.createdAt),u=typeof P=="function"?P():null,p=u&&u.role==="employee";let r="Update",f="blue",l="",d="";const v=e.jobId||e.taskId||e.ticketId||e.targetId||null;t.includes("job")?(r="Job Deliverable",f="blue",d=p?"myjobs":"jobs",l=p?"Open in My Jobs 📋":"View Job 📁"):t.includes("chat")||t.includes("bonding_message")||t.includes("message")?(r="Team Chat",f="blue",d="teambonding",l="Open Chat & Lounge 💬"):t.includes("game")||t.includes("challenge")||t.includes("invitation")?(r="Game Challenge",f="purple",d="teambonding",l="Enter Game Lounge 🎮"):t.includes("task")?(r="Daily Planner",f="green",d="dailytasks",l="Open Daily Planner 📅"):t.includes("ticket")?(r="Support Ticket",f="brand",d="tickets",l="Open Support Tickets 🎫"):t.includes("target")?(r="Target Goal",f="gold",d="targets",l="View My Targets 🎯"):(t.includes("invoice")||t.includes("billing"))&&(r="Billing & Invoice",f="purple",d="billing",l="Open Billing 💳");const w=Array.isArray(e.attachments)&&e.attachments.length>0,c=ee(`
    <div class="notif-detail-modal" style="padding:4px 0">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border-xs)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:12px;background:var(--bg-elevated);border:1px solid var(--border-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:var(--shadow-xs)">
            ${i}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap">
              <span class="badge ${f}" style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${r}</span>
              <span style="font-size:11.5px;color:var(--text-4)">${a}</span>
            </div>
            <div style="font-size:11px;color:var(--text-4)">${o}</div>
          </div>
        </div>
        <button type="button" class="btn ghost small notif-modal-close-btn" aria-label="Close" style="padding:4px 8px;font-size:16px;line-height:1;border-radius:6px;color:var(--text-3)">✕</button>
      </div>

      <h3 style="font-size:16.5px;font-weight:800;color:var(--text-1);margin:0 0 12px 0;line-height:1.35;letter-spacing:-0.3px">
        ${b(ye(s))}
      </h3>

      <div style="background:var(--bg-elevated);border:1px solid var(--border-xs);border-radius:var(--r-md);padding:14px 16px;margin-bottom:16px;font-size:13.5px;color:var(--text-2);line-height:1.6;white-space:pre-wrap;word-break:break-word">
        ${b(n)}
      </div>

      ${w?`
        <div style="margin-bottom:16px">
          <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Attachments (${e.attachments.length})</div>
          ${se(e.attachments,{title:"Attachments"})}
        </div>
      `:""}

      <div class="modal-actions" style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border-xs);display:flex;justify-content:flex-end;align-items:center;gap:10px;flex-wrap:wrap">
        <button type="button" class="btn secondary notif-modal-dismiss-btn" style="font-weight:600">Close</button>
        ${d?`
          <button type="button" class="btn primary notif-modal-go-btn" style="font-weight:700;display:inline-flex;align-items:center;gap:6px">
            <span>${l}</span>
          </button>
        `:""}
      </div>
    </div>
  `),C=()=>c.remove(),I=c.querySelector(".notif-modal-close-btn"),B=c.querySelector(".notif-modal-dismiss-btn"),m=c.querySelector(".notif-modal-go-btn");I&&(I.onclick=C),B&&(B.onclick=C),m&&(m.onclick=()=>{C(),typeof window.ci360NavTab=="function"&&window.ci360NavTab(d,v)})}function ze(){const e=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),t=document.getElementById("notifBadge"),s=document.getElementById("notifList"),n=document.getElementById("clearNotifBtn"),o=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),u=document.getElementById("notifDismissBannerBtn"),p=document.getElementById("notifPermissionBanner"),r=document.getElementById("notifUnreadBadge");if(!e||!i)return;ge();function f(){const y=document.getElementById("notifPermissionBanner");y&&(y.classList.add("hidden"),y.style.setProperty("display","none","important"),y.remove())}function l(){if(Le()){f();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?f():Notification.permission==="default"&&p&&p.style.setProperty("display","flex","important"))}l(),u&&(u.onclick=y=>{y.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),f()}),a&&(a.onclick=async y=>{y.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),f(),await ve(),f()}),Ne()&&de(),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),ne();let d=[],v="all";function w(){if(!s)return;let y=d;if(v==="task"?y=d.filter(g=>(g.type||"").includes("task")):v==="target"?y=d.filter(g=>(g.type||"").includes("target")):v==="job"?y=d.filter(g=>(g.type||"").includes("job")):v==="ticket"?y=d.filter(g=>(g.type||"").includes("ticket")):v==="chat"&&(y=d.filter(g=>(g.type||"").includes("chat")||(g.type||"").includes("game")||(g.type||"").includes("bonding"))),y.length===0){s.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${v==="all"?"":v+" "}notifications</div>`;return}s.innerHTML=y.map(g=>{const k=he(g.type);return`
        <div class="notif-item ${g.read?"":"unread"}" data-id="${g._id}" data-type="${b(g.type||"")}">
          <div class="notif-icon">${k}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${b(ye(g.title))}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${oe(g.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${b(g.message)}</div>
          </div>
          <div style="color:var(--text-4);font-size:16px;line-height:1;margin-top:2px;flex-shrink:0">›</div>
        </div>`}).join(""),s.querySelectorAll(".notif-item").forEach(g=>{g.onclick=async()=>{const k=g.dataset.id,$=d.find(x=>String(x._id)===String(k));if(k&&g.classList.contains("unread")){g.classList.remove("unread");try{await j(`/notifications/${k}/read`,{method:"PATCH"})}catch{}const x=d.filter(_=>!_.read&&String(_._id)!==String(k)).length;t&&(t.style.display=x>0?"flex":"none",t.textContent=x>99?"99+":x),r&&(r.textContent=x>0?`${x} new`:"",r.style.display=x>0?"inline-block":"none")}if(S(),$)ue($);else{const x=g.dataset.type,_=typeof P=="function"?P():null,O=_&&_.role==="employee";x&&x.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):x&&x.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab(O?"myjobs":"jobs"):x&&x.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):x&&x.includes("target")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("targets"):x&&(x.includes("chat")||x.includes("game")||x.includes("bonding"))&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("teambonding")}}})}let c={jobs:0,tasks:0,invoices:0,tickets:0},C=!1;async function I(y=!1){try{const g=await V("/notifications");d=g.notifications||[];const k=g.unreadCount||0;if(t&&(t.textContent=k>99?"99+":k,t.style.display=k>0?"flex":"none"),r&&(r.textContent=k>0?`${k} new`:"",r.style.display=k>0?"inline-block":"none"),ne(),g.overdue&&g.overdue.invoices&&g.overdue.invoices.length>0){const $=typeof P=="function"?P():null;$&&$.role==="client"&&Te(g.overdue.invoices)}if(g.syncTimestamps){const $=g.syncTimestamps;if(!C)c={...$},C=!0;else{const x=[];$.jobs>(c.jobs||0)&&x.push("jobs"),$.tasks>(c.tasks||0)&&x.push("tasks"),$.invoices>(c.invoices||0)&&x.push("invoices"),$.tickets>(c.tickets||0)&&x.push("tickets"),x.length>0&&(c={...$},window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{changedKeys:x,syncTimestamps:$,overdue:g.overdue}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({changedKeys:x,syncTimestamps:$}))}}if(!Ie)d.forEach($=>{const x=String($._id);Ce.add(x),q.add(x)}),te(),Ie=!0;else{const $=d.filter(x=>!x.read&&!q.has(String(x._id)));if($.length>0){const _="ci360_daily_alert_job_"+new Date().toISOString().slice(0,10);let O=!!localStorage.getItem(_);$.forEach(h=>{const T=String(h._id);Ce.add(T),q.add(T)}),te();const A=$[0];if(A){const h=String(A._id);let T=!0;(A.type==="job_due"||A.title&&A.title.includes("Job Due"))&&(O?T=!1:localStorage.setItem(_,"true")),T&&(Ee({id:h,title:A.title||"CI360 Alert",message:A.message||"",type:A.type}),await ce({title:A.title||"CI360 Alert",message:A.message||"",type:A.type,id:h}))}te(),window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{newNotifications:$}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({newNotifications:$})}}w()}catch{s&&d.length===0&&(s.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=I,window.showInAppPopupAlert=Ee,window.showClientOverdueInvoiceModal=Te,window.ci360RemoveNotifFromUI=y=>{if(!y)return;const g=String(y);d=d.filter($=>String($._id)!==g);const k=d.filter($=>!$.read).length;t&&(t.textContent=k>99?"99+":k,t.style.display=k>0?"inline-flex":"none"),r&&(r.textContent=k>0?`${k} unread`:"",r.style.display=k>0?"inline":"none"),w()}),I(),window.__ci360PollInterval=setInterval(I,6e3),window.addEventListener("focus",()=>I(!0)),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(y=>{y.onclick=g=>{g.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(k=>k.classList.remove("active")),y.classList.add("active"),v=y.dataset.filter,w()}});const B=document.getElementById("notifBackdrop");function m(){i.style.display="flex",i.classList.add("open"),B&&(B.style.display="block",B.classList.add("open")),e.setAttribute("aria-expanded","true"),l();const y=document.getElementById("topbarUserDropdown");y&&(y.style.display="none"),I()}function S(){i.style.display="none",i.classList.remove("open"),B&&(B.style.display="none",B.classList.remove("open")),e.setAttribute("aria-expanded","false")}function L(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?S():m()}window.ci360CloseNotifications=S;const E=document.getElementById("notifCloseBtn");E&&(E.onclick=y=>{y.stopPropagation(),S()}),B&&(B.onclick=y=>{y.stopPropagation(),S()}),e.onclick=y=>{y.stopPropagation(),L()},o&&(o.onclick=async y=>{y.stopPropagation();try{await j("/notifications/read",{method:"PATCH"}),t.style.display="none",r&&(r.textContent="",r.style.display="none"),d.forEach(g=>g.read=!0),w(),M("All notifications marked as read")}catch(g){M(g.message,!0)}}),window.__ci360NotifDocClickHandler&&document.removeEventListener("click",window.__ci360NotifDocClickHandler),window.__ci360NotifDocClickHandler=y=>{!i.contains(y.target)&&!e.contains(y.target)&&S()},document.addEventListener("click",window.__ci360NotifDocClickHandler),n&&(n.onclick=async y=>{y.stopPropagation();try{await J("/notifications"),d=[],s.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',t.style.display="none",r&&(r.textContent="",r.style.display="none"),M("Notifications cleared")}catch(g){M(g.message,!0)}});try{const g=new URLSearchParams(window.location.search).get("notifId");g&&V("/notifications").then(k=>{const x=(k.notifications||[]).find(_=>String(_._id)===String(g));if(x){ue(x);const _=window.location.pathname+window.location.hash;window.history.replaceState(null,"",_)}}).catch(()=>{})}catch{}}function Qe({user:e,currentRole:i,activeTab:t,tabs:s,title:n,subtitle:o}){const a=e&&e.name?e.name.charAt(0).toUpperCase():"U",u=e&&(e.role==="superadmin"||e.role==="admin")?"Admin":e&&e.role==="accounts"?"Accounts":e&&e.role==="employee"?"Employee":e&&e.role==="client"?"Client":e&&e.role?e.role.toUpperCase():"User",p=e&&e.name?e.name:"User",r=e&&e.email?e.email:e&&e.username?e.username:"",f=s&&s.some(c=>c.key==="logjob"),l=s&&s.find(c=>c.key===t),d=n||l&&l.label||"Dashboard";let v=[];return i==="accounts"?v=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:t==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:t==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(t),isMore:!0}]:i==="superadmin"||i==="admin"?v=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="dashboard"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(t),isMore:!0}]:i==="employee"?v=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:t==="myjobs"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"proposals",label:"Proposals",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',active:t==="proposals"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:t==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","proposals","targets"].includes(t),isMore:!0}]:v=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:t==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(t),isMore:!0}],`
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
          ${s.map(c=>c.href?`
            <a href="${c.href}" class="sidebar-item ${t===c.key?"active":""}" data-tab="${c.key}" aria-current="${t===c.key?"page":"false"}" style="text-decoration:none;">
              <span class="icon">${c.icon||"📌"}</span>
              <span>${c.label}</span>
            </a>`:`
            <button type="button" class="sidebar-item ${t===c.key?"active":""}" data-tab="${c.key}" aria-current="${t===c.key?"page":"false"}">
              <span class="icon">${c.icon||"📌"}</span>
              <span>${c.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${b(e?e.name:"User")}</div>
            <div class="role">${b(u)}</div>
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
              <h1 class="page-heading-title">${b(d)}</h1>
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

            ${f?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${N()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${N()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${Pe()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${a}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${b(p)}</span>
                  <span class="topbar-user-role-badge">${b(u)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${a}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${b(p)}</div>
                      ${r?`<div class="tud-email">${b(r)}</div>`:""}
                      <span class="tud-role-chip">${b(u)}</span>
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
                      <span class="tud-icon">${N()==="dark"?"☀️":"🌙"}</span>
                      <span class="tud-label">Switch to ${N()==="dark"?"Light":"Dark"} Mode</span>
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
                        <span style="font-size:16px" id="tudMobileThemeIcon">${N()==="dark"?"☀️":"🌙"}</span>
                        <span id="tudMobileThemeText">${N()==="dark"?"Light Mode":"Dark Mode"}</span>
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
          ${v.map(c=>`
            <button type="button" class="mbn-item ${c.active?"active":""}" data-tab="${c.key}" ${c.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${c.iconSvg}</span>
              <span class="mbn-label">${b(c.label)}</span>
              ${c.active?'<span class="mbn-active-dot"></span>':""}
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
              ${s.map(c=>c.href?`
                <a href="${c.href}" class="mms-card ${t===c.key?"active":""}" data-tab="${c.key}" style="text-decoration:none;">
                  <span class="mms-card-icon">${c.icon||"📌"}</span>
                  <span class="mms-card-label">${b(c.label)}</span>
                </a>`:`
                <button type="button" class="mms-card ${t===c.key?"active":""}" data-tab="${c.key}">
                  <span class="mms-card-icon">${c.icon||"📌"}</span>
                  <span class="mms-card-label">${b(c.label)}</span>
                </button>`).join("")}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${N()==="dark"?"☀️ Light Mode":"🌙 Dark Mode"}</span>
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
    </div>`}function Xe(e){const i=document.getElementById("mobileNavToggle"),t=document.getElementById("appSidebar"),s=document.getElementById("sidebarOverlay");function n(){t&&t.classList.add("open"),s&&s.classList.add("open")}function o(){t&&t.classList.remove("open"),s&&s.classList.remove("open")}i&&(i.onclick=n),s&&(s.onclick=o);const a=document.querySelector(".app-shell");function u(){if(!a)return;a.classList.toggle("sidebar-collapsed");const h=a.classList.contains("sidebar-collapsed");try{localStorage.setItem("ci360_sidebar_collapsed",h?"true":"false")}catch{}}const p=document.getElementById("sidebarCollapseBtn");p&&(p.onclick=u);const r=document.getElementById("desktopSidebarToggle");r&&(r.onclick=u),window.__ci360SidebarKeyBound||(window.__ci360SidebarKeyBound=!0,window.addEventListener("keydown",h=>{if((h.ctrlKey||h.metaKey)&&(h.key==="b"||h.key==="B")){const T=document.activeElement?document.activeElement.tagName.toLowerCase():"";if(T==="input"||T==="textarea"||document.activeElement&&document.activeElement.isContentEditable)return;h.preventDefault(),u()}}));const f=document.getElementById("mobileMoreBackdrop"),l=document.getElementById("mobileMoreSheet"),d=document.getElementById("mmsCloseBtn"),v=document.getElementById("mobileMoreBtn");function w(){f&&f.classList.add("active"),l&&l.classList.add("active")}function c(){f&&f.classList.remove("active"),l&&l.classList.remove("active")}v&&(v.onclick=h=>{h.stopPropagation(),w()}),d&&(d.onclick=c),f&&(f.onclick=h=>{h.target===f&&c()}),document.querySelectorAll(".mbn-item").forEach(h=>{h.dataset.tab&&h.dataset.tab!=="__more__"&&(h.onclick=()=>{c(),e&&e(h.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(h=>{h.onclick=()=>{c(),h.tagName!=="A"&&e&&e(h.dataset.tab)}});const C=document.getElementById("mmsToggleThemeBtn");C&&(C.onclick=()=>{F(N()==="dark"?"light":"dark")});const I=document.getElementById("mmsNotifsBtn");I&&(I.onclick=()=>{c();const h=document.getElementById("notifBellBtn");h&&h.click()});const B=document.getElementById("mmsLogoutBtn");B&&(B.onclick=Y);const m=document.getElementById("mobileCalBtn");m&&(m.onclick=()=>{const h=document.querySelector(".period-row");h&&(h.scrollIntoView({behavior:"smooth",block:"center"}),h.classList.add("pulse-highlight"),setTimeout(()=>h.classList.remove("pulse-highlight"),1200))});const S=document.getElementById("tudMobileThemeBtn");S&&(S.onclick=h=>{h.stopPropagation(),F(N()==="dark"?"light":"dark")});const L=document.getElementById("tudMobileNotifsBtn");L&&(L.onclick=h=>{h.stopPropagation();const T=document.getElementById("topbarUserDropdown");T&&(T.style.display="none");const U=document.getElementById("notifBellBtn");U&&U.click()});const E=document.getElementById("tudMobileSettingsBtn");E&&(E.onclick=h=>{h.stopPropagation();const T=document.getElementById("topbarUserDropdown");T&&(T.style.display="none");const U=document.querySelector('[data-tab="settings"], [data-tab="manage"]');U&&e?e(U.dataset.tab):ae()});const y=document.getElementById("tudProfileSettingsBtn");y&&(y.onclick=h=>{h.stopPropagation();const T=document.getElementById("topbarUserDropdown");T&&(T.style.display="none");const U=document.querySelector('[data-tab="settings"], [data-tab="manage"]');U&&e?e(U.dataset.tab):ae()});const g=document.getElementById("tudMobileHelpBtn");g&&(g.onclick=h=>{h.stopPropagation();const T=document.getElementById("topbarUserDropdown");T&&(T.style.display="none"),ee(`
        <div style="padding:24px;text-align:center;">
          <div style="font-size:36px;margin-bottom:12px;">💬</div>
          <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
          <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
            For immediate technical assistance, client onboarding, or workspace inquiries, reach out to your system administrator or support team.
          </p>
          <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
        </div>
      `)});const k=document.getElementById("logoutBtnMobile");k&&(k.onclick=Y);const $=document.getElementById("topbarUserBtn"),x=document.getElementById("topbarUserDropdown");$&&x&&($.onclick=h=>{h.stopPropagation();const T=x.style.display!=="none";x.style.display=T?"none":"block",$.setAttribute("aria-expanded",String(!T)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",h=>{!x.contains(h.target)&&!$.contains(h.target)&&(x.style.display="none",$.setAttribute("aria-expanded","false"))}));const _=document.getElementById("tudThemeToggleBtn");_&&(_.onclick=()=>{F(N()==="dark"?"light":"dark")});const O=document.getElementById("topbarQuickLogJobBtn");O&&(O.onclick=()=>{e&&e("logjob")});const A=document.getElementById("logoutBtn");A&&(A.onclick=Y),ze(),document.querySelectorAll(".sidebar-item").forEach(h=>{h.onclick=()=>{o(),h.tagName!=="A"&&e&&e(h.dataset.tab)}}),Ze(e)}function Ze(e){const i=document.getElementById("cmdPaletteBackdrop"),t=document.getElementById("cmdSearchInput"),s=document.getElementById("cmdResultsList"),n=document.getElementById("topbarCmdTrigger"),o=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),u=document.getElementById("cmdCloseKbd");if(!i||!t||!s)return;const p=Array.from(document.querySelectorAll(".sidebar-item")),r=p.map(m=>({type:"tab",id:m.dataset.tab,label:m.querySelector("span:last-child")?.textContent||m.dataset.tab,icon:m.querySelector(".icon")?.textContent||"📌",sub:"Navigate to section",action:()=>{e&&e(m.dataset.tab)}}));p.some(m=>m.dataset.tab==="logjob")&&r.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{e&&e("logjob")}}),r.push({type:"action",id:"toggle-theme",label:N()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{F(N()==="dark"?"light":"dark")}}),r.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const m=document.getElementById("notifBellBtn");m&&m.click()}}),r.push({type:"action",id:"account-settings",label:"Account Settings & Credentials",icon:"⚙️",sub:"Update username, email, and password",action:()=>{ae()}}),r.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>Y()});let l=0,d=[...r];function v(){if(!d.length){s.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}s.innerHTML=d.map((m,S)=>`
      <div class="cmd-result ${S===l?"selected":""}" data-idx="${S}">
        <div class="cmd-result-icon">${m.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${b(m.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${b(m.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),s.querySelectorAll(".cmd-result").forEach(m=>{m.onmouseenter=()=>{l=Number(m.dataset.idx),w()},m.onclick=()=>{c(Number(m.dataset.idx))}})}function w(){s.querySelectorAll(".cmd-result").forEach((m,S)=>{m.classList.toggle("selected",S===l)})}function c(m){const S=d[m];S&&S.action&&(I(),S.action())}function C(){const m=document.getElementById("topbarUserDropdown");m&&(m.style.display="none"),i.classList.add("open"),t.value="",d=[...r],l=0,v(),setTimeout(()=>t.focus(),50)}function I(){i.classList.remove("open"),t.blur()}n&&(n.onclick=C),o&&(o.onclick=C),a&&(a.onclick=()=>{const m=document.getElementById("topbarUserDropdown");m&&(m.style.display="none"),C()}),u&&(u.onclick=I),i.onclick=m=>{m.target===i&&I()},t.oninput=()=>{const m=t.value.trim().toLowerCase();m?d=r.filter(S=>S.label.toLowerCase().includes(m)||S.sub.toLowerCase().includes(m)):d=[...r],l=0,v()},t.onkeydown=m=>{if(m.key==="ArrowDown"){if(m.preventDefault(),d.length>0){l=(l+1)%d.length,w();const S=s.querySelector(".cmd-result.selected");S&&S.scrollIntoView({block:"nearest"})}}else if(m.key==="ArrowUp"){if(m.preventDefault(),d.length>0){l=(l-1+d.length)%d.length,w();const S=s.querySelector(".cmd-result.selected");S&&S.scrollIntoView({block:"nearest"})}}else m.key==="Enter"?(m.preventDefault(),c(l)):m.key==="Escape"&&(m.preventDefault(),I())};const B=m=>{(m.metaKey||m.ctrlKey)&&m.key.toLowerCase()==="k"?(m.preventDefault(),i.classList.contains("open")?I():C()):m.key==="Escape"&&i.classList.contains("open")&&I()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=B,window.addEventListener("keydown",B)}function et(e=4){return`
    <div class="grid grid-${Math.min(e,4)}" style="margin-bottom:24px">
      ${Array(e).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function tt(e,i,t="📁",s=""){return`
    <div class="empty">
      <span class="empty-icon">${t}</span>
      <h3>${b(e)}</h3>
      <p>${b(i)}</p>
      ${s}
    </div>`}function it(e,i,t="",s="📊",n=""){let o="";return n&&(o=`<span class="kpi-trend ${n.startsWith("+")||n.includes("↑")||n.toLowerCase().includes("up")?"up":"down"}">${b(n)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${b(e)}</span>
        <div class="kpi-icon">${s}</div>
      </div>
      <div class="kpi-value">${b(i)}</div>
      <div class="kpi-sub">${o}<span>${b(t)}</span></div>
    </div>`}function nt(e,i="gray"){return`<span class="badge ${i}">${b(e)}</span>`}function ot(e,i="indigo"){const t=Math.min(100,Math.max(0,Number(e)||0));return`
    <div class="progress-bar-wrap" title="${t.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${t}%"></div>
    </div>`}function st(e){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([t,s])=>`<button class="pchip ${e===t?"active":""}" data-period="${t}">${s}</button>`).join("")}</div>`}function at(e){if(!e)return"U";const i=e.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function D(e){if(e=Number(e)||0,e===0)return"0 B";const i=1024,t=["B","KB","MB","GB","TB"],s=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,s)).toFixed(1))+" "+(t[s]||"GB")}const lt=D;function me(e){if(!e)return"";if(/^https?:\/\//i.test(e)||e.startsWith("data:")||e.startsWith("blob:"))return e;if(/^https?:\/\//i.test(ie))try{return new URL(ie).origin+(e.startsWith("/")?e:"/"+e)}catch{}return e}function W(e="",i=""){const t=(e.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico","tiff","tif","heic","heif"].includes(t)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:t==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(t)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods","tsv"].includes(t)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["ppt","pptx","key"].includes(t)?{icon:"📑",cls:"pres",label:"Presentation"}:["zip","rar","7z","tar","gz","bz2"].includes(t)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm","m4v","3gp","wmv","flv"].includes(t)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a","flac","aac","wma"].includes(t)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:["psd","ai","eps","sketch","fig","xd","blend","obj","fbx","cdr"].includes(t)?{icon:"🎨",cls:"design",label:"Design & Creative"}:["js","ts","jsx","tsx","html","css","json","xml","py","sql","md","sh","php"].includes(t)?{icon:"💻",cls:"code",label:"Code File"}:{icon:"📎",cls:"other",label:"File"}}function rt(e){return e?W(e.name||e.filename||"",e.type||"").cls==="img":!1}function be(e){if(!e||!e.url)return;const i=W(e.name,e.type),t=i.cls==="img",s=i.cls==="pdf",n=b(e.name||"Attachment"),o=D(e.size);let a="";t?a=`<img src="${e.url}" alt="${n}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${e.url}','_blank')">`:s?a=`<iframe src="${e.url}" title="${n}"></iframe>`:i.cls==="video"?a=`
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
    `;const u=document.createElement("div");u.className="preview-modal-overlay",u.innerHTML=`
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
  `,u.onclick=p=>{(p.target===u||p.target.closest(".preview-modal-close"))&&u.remove()},document.body.appendChild(u)}function se(e=[],i={}){if(!e||!e.length)return"";const t=!!i.canDelete,s=e.filter(n=>!n||!n.url||n.type==="url"||/^https?:\/\//i.test(n.url||"")?!1:W(n.name,n.type).cls==="video"||n.name&&n.name.match(/\.(mp4|mov|webm|mkv|avi)$/i)||n.type&&n.type.startsWith("video/"));return`
    <div class="attachment-chips-wrap" data-attachments="${encodeURIComponent(JSON.stringify(e))}">
      ${i.title?`<div class="attachment-chips-header">📎 ${b(i.title)} <span style="font-weight:500;color:var(--text-4)">(${e.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${e.map((n,o)=>{const a=n.type==="url"||/^https?:\/\//i.test(n.url||""),u=a?{cls:"file-type-doc",icon:"🌐"}:W(n.name,n.type),p=b(n.name||(a?"Live Deliverable URL":"File")),r=a?"Live Link":D(n.size),f=u.cls==="video"||n.name&&n.name.match(/\.(mp4|mov|webm|mkv|avi)$/i),l=me(n.url);return`
            <div class="attachment-chip ${f?"is-video":""}" data-idx="${o}" title="${p} (${r})">
              <span class="file-type-icon ${u.cls}" style="width:22px;height:22px;font-size:12px">${u.icon}</span>
              ${a?`
                <a href="${n.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-name" style="text-decoration:none;color:inherit;cursor:pointer" title="Open live URL in new tab">
                  ${p} <span style="font-size:11px;opacity:0.75">↗</span>
                </a>
              `:`
                <span class="attachment-chip-name" onclick="window.__openPreview(${o}, this)">
                  ${p}
                  ${f?'<span class="badge blue" style="font-size:9.5px;padding:1px 4px;margin-left:5px">🎬 MP4 Video</span>':""}
                </span>
              `}
              <span class="attachment-chip-size">${r}</span>
              <div class="attachment-chip-actions">
                ${a?`
                  <a href="${n.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-btn" title="Open Live Link" onclick="event.stopPropagation()">🔗</a>
                `:`
                  <button type="button" class="attachment-chip-btn" title="${f?"Play Video":"View Preview"}" onclick="window.__openPreview(${o}, this)">${f?"▶️":"👁️"}</button>
                  <a href="${l}" download="${p}" target="_blank" class="attachment-chip-btn" title="Download File" onclick="event.stopPropagation()">⬇️</a>
                `}
                ${t?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${o}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>

      ${s.length>0?`
        <div class="attachment-videos-container" style="display:flex;flex-direction:column;gap:12px;margin-top:10px">
          ${s.map(n=>{const o=b(n.name||"Deliverable Video"),a=D(n.size),u=me(n.url);return`
              <div class="attachment-video-card" style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:8px;padding:12px;overflow:hidden">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:6px">
                  <span style="font-size:12.5px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px">
                    <span style="font-size:16px">🎬</span>
                    <span>${o}</span>
                    <span class="badge blue" style="font-size:10px;padding:2px 6px">${a}</span>
                  </span>
                  <a href="${u}" download="${o}" target="_blank" class="btn ghost small" style="font-size:11.5px;padding:3px 10px" onclick="event.stopPropagation()">
                    ⬇️ Download Video (${a})
                  </a>
                </div>
                <video controls preload="metadata" style="width:100%;max-height:380px;background:#000;border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,0.4);" playsinline>
                  <source src="${u}" type="${n.type||"video/mp4"}">
                  Your browser does not support HTML5 video streaming.
                </video>
              </div>
            `}).join("")}
        </div>
      `:""}
    </div>
  `}const z={};function we(e,i){return new Promise((t,s)=>{const n=new XMLHttpRequest,o=typeof R=="function"?R():localStorage.getItem("ci360_token")||"",a=encodeURIComponent(e.name||"file.bin"),u=e.type||"application/octet-stream",p=ie.replace(/\/+$/,""),r=o?`&token=${encodeURIComponent(o)}`:"",f=`${p}/upload/stream?name=${a}&type=${encodeURIComponent(u)}${r}`;n.open("POST",f,!0),o&&n.setRequestHeader("Authorization","Bearer "+o),n.setRequestHeader("Content-Type","application/octet-stream"),n.setRequestHeader("X-File-Name",a),n.setRequestHeader("X-File-Type",u),n.upload&&(n.upload.onprogress=l=>{if(l.lengthComputable&&typeof i=="function"){const d=Math.min(99,Math.round(l.loaded/l.total*100));i(d,l.loaded,l.total)}}),n.onload=()=>{if(n.status>=200&&n.status<300)try{const l=JSON.parse(n.responseText);typeof i=="function"&&i(100,e.size,e.size),t(l.file||l.files&&l.files[0])}catch{s(new Error("Failed to parse upload response"))}else try{const l=JSON.parse(n.responseText);s(new Error(l.error||`Upload failed with HTTP ${n.status}`))}catch{s(new Error(`Upload failed with HTTP ${n.status}`))}},n.onerror=()=>s(new Error("Network error during file upload. Please check connection.")),n.ontimeout=()=>s(new Error("Upload timed out. File may be too heavy or connection slow.")),n.timeout=36e5,n.send(e)})}async function De(e,i){const t=Array.from(e||[]);if(!t.length)return[];const s=new Array(t.length),n={};for(let r=0;r<t.length;r++)n[r]=0;let o=0;const a=3;async function u(){for(;o<t.length;){const r=o++,f=t[r];try{const l=await we(f,(d,v,w)=>{if(n[r]=d,typeof i=="function"){const c=Object.values(n).reduce((I,B)=>I+B,0),C=Math.round(c/t.length);i(C,v,w,f,r,t.length)}});s[r]=l}catch(l){if(console.warn("Fast upload error for",f.name,l),f.size<10*1024*1024){const d=await new Promise(v=>{const w=new FileReader;w.onload=()=>v({name:f.name,url:w.result,size:f.size,type:f.type||"application/octet-stream",uploadedAt:new Date}),w.onerror=()=>v(null),w.readAsDataURL(f)});s[r]=d}else throw l}}}const p=[];for(let r=0;r<Math.min(a,t.length);r++)p.push(u());return await Promise.all(p),s.filter(Boolean)}async function ct(e,i){return De(e,i)}function xe({id:e="uploader",label:i="Attachments & Files",subtitle:t="Upload any file: MP4 videos (up to 1GB), images, PDFs, spreadsheets, design assets, or archives",multiple:s=!0,accept:n="",maxFiles:o=30}={}){const a=n?`accept="${n}"`:"";return`
    <div class="uploader-container" id="container-${e}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${b(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${e}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${e}">
        <input type="file" id="input-${e}" ${s?"multiple":""} ${a} style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${b(t)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${e}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${e}"></div>
    </div>
  `}function ke(e,i={}){const t=document.getElementById("zone-"+e),s=document.getElementById("input-"+e),n=document.getElementById("list-"+e),o=document.getElementById("count-"+e);z[e]=i.existing?[...i.existing]:[];function a(){const p=z[e]||[];if(o&&(o.textContent=`${p.length} file${p.length===1?"":"s"} attached`),!!n){if(!p.length){n.innerHTML="";return}n.innerHTML=p.map((r,f)=>{const l=W(r.name,r.type),d=b(r.name||"File"),v=D(r.size),w=l.cls==="video"||r.name&&r.name.match(/\.(mp4|mov|webm|mkv|avi)$/i)||r.type&&r.type.startsWith("video/"),c=me(r.url);return`
        <div class="uploader-file-item ${w?"is-video":""}" style="display:flex;flex-direction:column;gap:6px;padding:8px 10px;background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:6px;margin-bottom:8px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <div class="uploader-file-info" style="display:flex;align-items:center;gap:8px;min-width:0;flex:1">
              <span class="file-type-icon ${l.cls}" style="width:24px;height:24px;font-size:13px">${l.icon}</span>
              <div style="min-width:0;flex:1">
                <div class="uploader-file-name" title="${d}" style="font-size:12px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                  ${d}
                  ${w?'<span class="badge blue" style="font-size:9.5px;padding:1px 5px;margin-left:6px">🎬 Video Deliverable</span>':""}
                </div>
                <div class="uploader-file-size" style="font-size:11px;color:var(--text-3)">${l.label} · ${v}</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${e}', ${f})">Preview / Play</button>
              <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${e}', ${f})">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
          ${w&&c?`
            <div style="margin-top:4px;border-radius:6px;overflow:hidden;background:#000;border:1px solid var(--border-sm)">
              <video controls preload="metadata" style="width:100%;max-height:240px;display:block;" playsinline>
                <source src="${c}" type="${r.type||"video/mp4"}">
                Your browser does not support HTML5 video streaming.
              </video>
            </div>
          `:""}
        </div>
      `}).join(""),i.onChange&&i.onChange(p)}}async function u(p){const r=Array.from(p||[]);if(r.length&&n){for(let f=0;f<r.length;f++){const l=r[f],d=`up-prog-${Date.now()}-${f}`,v=b(l.name||"video.mp4"),w=D(l.size),c=l.type?.startsWith("video/")||l.name?.match(/\.(mp4|mov|webm|mkv|avi)$/i),C=document.createElement("div");C.id=d,C.className="uploader-progress-card",C.style.cssText="padding:10px 12px;background:var(--bg-elevated);border:1px solid var(--brand-500,#3b82f6);border-radius:6px;margin-bottom:8px;",C.innerHTML=`
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:12px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px">
            <span>${c?"🎬":"📎"}</span>
            <span style="max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${v}</span>
          </span>
          <span style="font-size:11.5px;font-weight:700;color:var(--brand-500,#3b82f6)" id="${d}-percent">0%</span>
        </div>
        <div style="background:rgba(255,255,255,0.12);height:7px;border-radius:4px;overflow:hidden;margin-bottom:6px">
          <div id="${d}-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #3b82f6, #06b6d4);transition:width 0.1s linear;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--text-3)">
          <span id="${d}-status">Uploading ${w}… please wait</span>
          <span id="${d}-bytes">0 MB / ${w}</span>
        </div>
      `,n.appendChild(C);try{const I=await we(l,(B,m,S)=>{const L=document.getElementById(`${d}-bar`),E=document.getElementById(`${d}-percent`),y=document.getElementById(`${d}-bytes`);L&&(L.style.width=`${B}%`),E&&(E.textContent=`${B}%`),y&&(y.textContent=`${D(m)} / ${D(S)}`)});C.remove(),I&&(z[e]=[...z[e]||[],I],a())}catch(I){console.error("File upload failed:",I);const B=document.getElementById(`${d}-status`);B&&(B.textContent="❌ Upload failed: "+(I.message||"Network error"),B.style.color="var(--red-500, #ef4444)"),M("Upload failed for "+l.name+": "+(I.message||"Network error"),!0)}}M("File attached successfully! ✓")}}window.__removeUploaderFile=(p,r)=>{if(z[p]){z[p].splice(r,1);const f=window[`__update_${p}`];f&&f()}},window.__previewUploaderFile=(p,r)=>{const f=(z[p]||[])[r];f&&be(f)},window[`__update_${e}`]=a,t&&s&&(t.onclick=p=>{p.target.tagName!=="BUTTON"&&!p.target.closest("button")&&s.click()},t.ondragover=p=>{p.preventDefault(),t.classList.add("dragover")},t.ondragleave=()=>t.classList.remove("dragover"),t.ondrop=async p=>{p.preventDefault(),t.classList.remove("dragover"),p.dataTransfer&&p.dataTransfer.files&&p.dataTransfer.files.length&&await u(p.dataTransfer.files)},s.onchange=async()=>{const p=Array.from(s.files||[]);s.value="",p.length>0&&await u(p)}),a()}function $e(e){return z[e]||[]}function je(e,i=[]){z[e]=[...i];const t=window[`__update_${e}`];t&&t()}window.__openPreview=(e,i)=>{const t=i.closest(".attachment-chips-wrap")||i.closest("[data-attachments]");if(!t)return;const s=i.closest(".attachment-chip"),n=s?Number(s.dataset.idx):e,o=t.dataset.attachments||t.parentElement?.dataset?.attachments;if(o)try{const a=JSON.parse(decodeURIComponent(o));a[n]&&be(a[n])}catch{}};function dt(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");return`
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
        ${xe({id:"tkup-"+t,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const pt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},ut={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function mt(e,i){const t=(e.status||"Open").toLowerCase().replace(" ","-"),s=e.status==="Open",n=(e._id||"").slice(-4).toUpperCase(),o=at(e.userName),a=encodeURIComponent(JSON.stringify(e.attachments||[])),u=encodeURIComponent(JSON.stringify(e.adminAttachments||[]));return`
    <div class="ticket-card status-${t}" id="tkcard-${e._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${n}</span>
            <span class="ticket-subject">${b(e.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${pt[e.status]||"gray"}">
            ${s?'<span class="pulse-dot"></span>':""} ${b(e.status)}
          </span>
          <span class="badge ${ut[e.priority]||"gray"}">${b(e.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${o}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${b(e.userName)}
            <span class="ticket-role-pill">${b(e.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${oe(e.createdAt)} · ${Z(e.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${b(e.message)}</div>

      ${e.attachments&&e.attachments.length?`
        <div data-attachments="${a}">
          ${se(e.attachments,{title:"Ticket Attachments"})}
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
              ${e.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${oe(e.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${b(e.adminReply)}</div>
            ${e.adminAttachments&&e.adminAttachments.length?`
              <div data-attachments="${u}">
                ${se(e.adminAttachments,{title:"Support Attached Files"})}
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
            <textarea id="tkreplytxt-${e._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${b(e.adminReply||"")}</textarea>
            ${xe({id:"tkreplyup-"+e._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${e._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${e._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function H(e,i,t){const s=document.getElementById("tklist-"+i),n=document.getElementById("tkcnt-"+i);if(s)try{const o=await V("/tickets/job/"+e);n&&(n.textContent=o.length),o.length?(s.innerHTML=o.map(a=>mt(a,t)).join(""),ft(e,i,t,s,o)):s.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{s.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function ft(e,i,t,s,n){t&&(s.querySelectorAll(".tk-status-sel").forEach(o=>{o.onchange=async()=>{try{await G("/tickets/"+o.dataset.tkid,{status:o.value}),M("Status updated"),H(e,i,t)}catch(a){M(a.message,!0)}}}),s.querySelectorAll(".tk-quick-resolve-btn").forEach(o=>{o.onclick=async()=>{try{await G("/tickets/"+o.dataset.tkid,{status:"Resolved"}),M("Ticket marked as Resolved! 🎉"),H(e,i,t)}catch(a){M(a.message,!0)}}}),s.querySelectorAll(".ticket-template-btn").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplytxt-"+o.dataset.tkid);a&&(a.value=o.dataset.tpl,a.focus())}}),s.querySelectorAll(".tk-reply-toggle").forEach(o=>{o.onclick=()=>{const a=o.dataset.tkid,u=document.getElementById("tkreplyform-"+a);if(u){u.classList.toggle("show");const p=n.find(r=>r._id===a);ke("tkreplyup-"+a,{existing:p?p.adminAttachments:[]})}}}),s.querySelectorAll(".tk-reply-cancel").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplyform-"+o.dataset.tkid);a&&a.classList.remove("show")}}),s.querySelectorAll(".tk-reply-save").forEach(o=>{o.onclick=async()=>{const a=o.dataset.tkid,u=document.getElementById("tkreplytxt-"+a);if(!u)return;const p=$e("tkreplyup-"+a);try{await G("/tickets/"+a,{adminReply:u.value.trim(),adminAttachments:p}),M("Response saved! 🛡️"),H(e,i,t)}catch(r){M(r.message,!0)}}}),s.querySelectorAll(".tk-del-btn").forEach(o=>{o.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await J("/tickets/"+o.dataset.tkid),M("Ticket deleted"),H(e,i,t)}catch(a){M(a.message,!0)}}}))}function gt(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");H(e,t,i),ke("tkup-"+t);const s=document.querySelector(`[data-jobid="${e}"].ticket-toggle-btn`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+t);if(!a)return;const u=a.style.display==="block";a.style.display=u?"none":"block",s.textContent=u?"+ Raise Ticket":"✕ Cancel"});const n=document.querySelector(`.tk-cancel-btn[data-safeid="${t}"]`);n&&(n.onclick=()=>{const a=document.getElementById("tkform-"+t);a&&(a.style.display="none"),s&&(s.textContent="+ Raise Ticket")});const o=document.querySelector(`.tk-submit-btn[data-safeid="${t}"]`);o&&(o.onclick=async()=>{const a=(document.getElementById("tksub-"+t)||{}).value?.trim(),u=(document.getElementById("tkmsg-"+t)||{}).value?.trim(),p=(document.getElementById("tkpri-"+t)||{}).value,r=$e("tkup-"+t);if(!a){M("Please enter a subject",!0);return}if(!u){M("Please enter a message",!0);return}o.disabled=!0,o.textContent="Submitting…";try{await fe("/tickets",{jobId:e,subject:a,message:u,priority:p,attachments:r}),M("Ticket submitted! 🎫");const f=document.getElementById("tkform-"+t);f&&(f.style.display="none"),s&&(s.textContent="+ Raise Ticket");const l=document.getElementById("tksub-"+t),d=document.getElementById("tkmsg-"+t);l&&(l.value=""),d&&(d.value=""),je("tkup-"+t,[]),H(e,t,i)}catch(f){M(f.message,!0)}finally{o.disabled=!1,o.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function vt(){return""}function yt(){}function Ue(e={}){const{title:i="Account Settings & Credentials",subtitle:t="Update your personal name, login email, and security password",showCardWrapper:s=!0,formId:n="accSettingsForm"}=e,o=P()||{},a=o.name?o.name.charAt(0).toUpperCase():"U",u=(o.role||"user").toUpperCase();return`
    <div class="${s?"card":""}" style="max-width:760px;margin:0 auto;width:100%;" id="${n}-wrap">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--gold-500,#d4af37),#b8860b);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:20px;box-shadow:0 4px 12px rgba(212,175,55,0.25);flex-shrink:0;">
          ${b(a)}
        </div>
        <div style="min-width:0;flex:1;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <h3 style="font-size:18px;font-weight:700;color:var(--text-1);margin:0;">${b(i)}</h3>
            <span class="badge gold" style="font-size:11px;padding:2px 8px;">${b(u)}</span>
          </div>
          <div style="font-size:13px;color:var(--text-3);margin-top:2px;">${b(t)}</div>
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
              <input type="text" id="${n}-name" class="input" value="${b(o.name||"")}" placeholder="Your display name" required autocomplete="name">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${n}-email" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Email Address *</label>
              <input type="email" id="${n}-email" class="input" value="${b(o.email||"")}" placeholder="name@company.com" required autocomplete="email">
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
  `}function qe(e,i={}){const{formId:t="accSettingsForm",onSaved:s=null,modalBg:n=null}=i,o=e||document;o.querySelectorAll(".pass-toggle-btn").forEach(f=>{f.onclick=()=>{const l=f.dataset.target,d=o.querySelector("#"+l)||document.getElementById(l);if(d){const v=d.type==="password";d.type=v?"text":"password",f.textContent=v?"🙈":"👁️",f.style.opacity=v?"1":"0.65"}}});const a=o.querySelector("#"+t+"-saveBtn")||document.getElementById(t+"-saveBtn"),u=o.querySelector("#"+t+"-alert")||document.getElementById(t+"-alert");function p(f,l=!0){u&&(u.style.display="block",u.style.background=l?"rgba(239,68,68,0.12)":"rgba(34,197,94,0.12)",u.style.border=l?"1px solid rgba(239,68,68,0.3)":"1px solid rgba(34,197,94,0.3)",u.style.color=l?"#ef4444":"#22c55e",u.innerHTML=(l?"⚠️ ":"✓ ")+b(f))}function r(){u&&(u.style.display="none")}a&&(a.onclick=async()=>{r();const f=o.querySelector("#"+t+"-name")||document.getElementById(t+"-name"),l=o.querySelector("#"+t+"-email")||document.getElementById(t+"-email"),d=o.querySelector("#"+t+"-currentPass")||document.getElementById(t+"-currentPass"),v=o.querySelector("#"+t+"-newPass")||document.getElementById(t+"-newPass"),w=o.querySelector("#"+t+"-confirmPass")||document.getElementById(t+"-confirmPass"),c=(f?.value||"").trim(),C=(l?.value||"").trim(),I=d?.value||"",B=v?.value||"",m=w?.value||"";if(!c){p("Please enter your full name or username.",!0),f?.focus();return}if(!C||!C.includes("@")){p("Please enter a valid email address.",!0),l?.focus();return}if(B||m){if(!I){p("Please enter your current password to set a new password.",!0),d?.focus();return}if(B.length<6){p("New password must be at least 6 characters long.",!0),v?.focus();return}if(B!==m){p("New passwords do not match. Please re-check.",!0),w?.focus();return}}const S={name:c,email:C};B&&(S.currentPassword=I,S.newPassword=B);const L=a.innerHTML;a.disabled=!0,a.innerHTML="<span>Saving Changes…</span>";try{const E=await G("/auth/profile",S);E&&E.token&&E.user&&Me(E.token,E.user),document.querySelectorAll(".topbar-user-name, .sidebar-user .name, .tud-name").forEach(g=>{g.textContent=E.user.name}),document.querySelectorAll(".tud-email").forEach(g=>{g.textContent=E.user.email});const y=E.user.name?E.user.name.charAt(0).toUpperCase():"U";document.querySelectorAll(".topbar-user-avatar span, .user-avatar, .tud-avatar").forEach(g=>{g.classList.contains("topbar-online-dot")||(g.textContent=y)}),d&&(d.value=""),v&&(v.value=""),w&&(w.value=""),p("Account credentials updated successfully!",!1),M("Account settings saved! ✓"),typeof s=="function"&&s(E.user),n&&setTimeout(()=>{try{n.remove()}catch{}},900)}catch(E){p(E.message||"Failed to update credentials. Please try again.",!0),M(E.message||"Update failed",!0)}finally{a.disabled=!1,a.innerHTML=L}})}function ae(){const e=`
    <div style="position:relative;padding:12px 6px;">
      <button type="button" id="closeAccSettingsModalBtn" style="position:absolute;top:-4px;right:0;border:none;background:transparent;color:var(--text-3);font-size:20px;cursor:pointer;padding:6px 10px;" aria-label="Close modal">✕</button>
      ${Ue({title:"Account Settings",subtitle:"Manage your personal email, username, and password",showCardWrapper:!1,formId:"modalAccSettingsForm"})}
    </div>
  `,i=ee(e),t=i.querySelector("#closeAccSettingsModalBtn");return t&&(t.onclick=()=>i.remove()),qe(i,{formId:"modalAccSettingsForm",modalBg:i}),i}window.__setTheme=function(e){F(e)};Object.assign(window,{getToken:R,getUser:P,setSession:Me,clearSession:X,requireAuth:Re,initTheme:_e,api:j,apiGet:V,apiPost:fe,apiPut:G,apiPatch:Oe,apiDelete:J,fmtINR:pe,fmtHours:Je,escapeHtml:b,fmtDate:Z,flashToast:M,openModal:ee,logout:Y,getTheme:N,setTheme:F,initServiceWorker:ge,playNotificationChime:le,triggerPhoneVibration:re,requestNotificationPermission:ve,triggerSystemNotification:ce,fmtFileSize:D,formatFileSize:lt,uploadSingleFileDirectly:we,uploadMultipleFilesFast:De,getFileCategory:W,isImageAttachment:rt,openFilePreviewModal:be,renderAttachmentChips:se,uploadFilesToServer:ct,renderAttachmentUploader:xe,bindAttachmentUploader:ke,getUploaderAttachments:$e,setUploaderAttachments:je,renderRoleSwitcher:vt,bindRoleSwitcher:yt,renderNotificationBell:Pe,initNotificationBell:ze,openNotificationModal:ue,getNotifIcon:he,renderAppShell:Qe,bindAppShellEvents:Xe,renderSkeletonCards:et,renderEmptyState:tt,renderKpiCard:it,renderBadge:nt,renderProgressBar:ot,renderPeriodPicker:st,renderSupportTicketSection:dt,bindSupportTicketSection:gt,renderAccountSettingsCard:Ue,bindAccountSettingsCard:qe,openAccountSettingsModal:ae,getArchive:He,restoreArchiveItem:Fe,purgeArchiveItem:Ve,purgeAllArchive:We});export{Re as a,Xe as b,V as c,Z as d,b as e,pe as f,fe as g,M as h,_e as i,J as j,G as k,Ue as l,qe as m,Oe as n,ee as o,D as p,P as q,Qe as r,R as s,oe as t,De as u,X as v,Me as w};
