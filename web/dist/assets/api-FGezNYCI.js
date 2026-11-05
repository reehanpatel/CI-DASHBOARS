(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const ae="/api";function F(){return localStorage.getItem("ci360_token")}function M(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function we(e,i){localStorage.setItem("ci360_token",e),localStorage.setItem("ci360_user",JSON.stringify(i))}function te(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function Je(e){const i=F(),t=M();if(!i||!t)return te(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null;const s=t.role==="superadmin"||t.role==="admin",o=t.name&&t.name.toLowerCase().includes("ekta")||t.email&&t.email.toLowerCase().includes("ekta");if(e&&t.role!==e&&!s){if((t.role==="accounts"||o)&&(e==="accounts"||e==="employee"))return t;const n=s?"/admin":t.role==="accounts"||o?"/accounts":t.role==="employee"?"/employee":t.role==="client"?"/client":null;return!n||typeof window<"u"&&window.location.pathname.startsWith(n)?(te(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null):(window.location.href=n,null)}return t}async function U(e,i={}){const t=F(),s=Object.assign({"Content-Type":"application/json"},i.headers||{});t&&(s.Authorization="Bearer "+t);const o=await fetch(ae+e,Object.assign({},i,{headers:s}));let n=null;try{n=await o.json()}catch{}if(o.status===401)throw e==="/auth/login"||e.includes("/auth/login")?new Error(n&&n.error||"Invalid username/email or password."):(te(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login?expired=1"),new Error(n&&n.error||"Session expired. Please sign in again."));if(!o.ok)throw new Error(n&&n.error||"Server status "+o.status+" — Backend waking up, please retry in 10s.");return i.method&&i.method!=="GET"&&!e.includes("/notifications")&&typeof window<"u"&&typeof window.ci360FetchNotifications=="function"&&setTimeout(()=>{try{window.ci360FetchNotifications()}catch{}},350),n}const J=e=>U(e,{method:"GET"}),pe=(e,i)=>U(e,{method:"POST",body:JSON.stringify(i)}),R=(e,i)=>U(e,{method:"PUT",body:JSON.stringify(i)}),We=(e,i)=>U(e,{method:"PATCH",body:JSON.stringify(i)}),Q=e=>U(e,{method:"DELETE"}),Ke=e=>J("/archive"+(e?`?type=${encodeURIComponent(e)}`:"")),Ge=(e,i)=>pe(`/archive/restore/${e}/${i}`,{}),Ye=(e,i)=>Q(`/archive/purge/${e}/${i}`),Qe=e=>Q(`/archive/purge-all/${e}`);function be(e){return e=Number(e)||0,"₹"+e.toLocaleString("en-IN",{maximumFractionDigits:0})}function Xe(e){return(Number(e)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function h(e){return e==null?"":String(e).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function ie(e){return e?new Date(e).toISOString().slice(0,10):"—"}function L(){return localStorage.getItem("ci360_theme")||"light"}function K(e){localStorage.setItem("ci360_theme",e),document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(n=>{n.classList.toggle("active",n.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const n=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");n&&(n.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),s=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),s&&(s.textContent=e==="dark"?"Light Mode":"Dark Mode");const o=document.getElementById("mmsToggleThemeBtn");if(o){const n=o.querySelector("span");n&&(n.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function ze(){if(typeof document<"u"&&(document.body?.classList.contains("login-page")||window.location.pathname.includes("login")||document.querySelector(".login-box"))){document.documentElement.setAttribute("data-theme","dark");return}const e=L();document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(n=>{n.classList.toggle("active",n.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const n=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");n&&(n.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),s=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),s&&(s.textContent=e==="dark"?"Light Mode":"Dark Mode");const o=document.getElementById("mmsToggleThemeBtn");if(o){const n=o.querySelector("span");n&&(n.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{ze()}catch{}function T(e,i){const t=document.createElement("div");t.className="toast",t.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",t.textContent=(i?"⚠️  ":"✓  ")+e,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(10px)",setTimeout(()=>t.remove(),200)},2800)}function oe(e){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${e}</div>`,i.onclick=t=>{t.target===i&&i.remove()},document.body.appendChild(i),i}function Z(){te(),window.location.href="/login"}let ee=null;async function ke(){if("serviceWorker"in navigator)try{ee=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",ee.scope),typeof Notification<"u"&&Notification.permission==="granted"&&F()&&fe(ee).catch(()=>{})}catch(e){console.warn("CI360 Service Worker registration notice:",e)}}try{ke()}catch{}let _e=0,Ee=0;const V=new Set,Ae=new Set;let Me=!1;function De(e){try{const i=typeof M=="function"?M():null,t=i&&i._id?String(i._id):"default";return`${e}_${t}`}catch{return`${e}_default`}}function le(){try{const e=De("ci360_alerted_ids"),i=localStorage.getItem(e);if(i){const t=JSON.parse(i);Array.isArray(t)&&t.forEach(s=>V.add(String(s)))}}catch{}}function se(){try{const e=De("ci360_alerted_ids"),i=Array.from(V).slice(-2e3);localStorage.setItem(e,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",e=>{e.key&&e.key.includes("ci360_alerted_ids")&&le()});let X=null;function Ze(){if(typeof window>"u")return;const e=()=>{try{const i=window.AudioContext||window.webkitAudioContext;i&&(X||(X=new i),X.state==="suspended"&&X.resume())}catch{}window.removeEventListener("touchstart",e,!0),window.removeEventListener("pointerdown",e,!0),window.removeEventListener("click",e,!0)};window.addEventListener("touchstart",e,!0),window.addEventListener("pointerdown",e,!0),window.addEventListener("click",e,!0)}Ze();function ue(){try{const e=Date.now();if(e-_e<2500)return;_e=e;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=X||new i;t.state==="suspended"&&t.resume();const s=t.currentTime,o=t.createOscillator(),n=t.createGain();o.type="sine",o.frequency.setValueAtTime(587.33,s),n.gain.setValueAtTime(0,s),n.gain.linearRampToValueAtTime(.25,s+.02),n.gain.exponentialRampToValueAtTime(.001,s+.38),o.connect(n),n.connect(t.destination),o.start(s),o.stop(s+.38);const a=t.createOscillator(),d=t.createGain();a.type="sine",a.frequency.setValueAtTime(880,s+.12),d.gain.setValueAtTime(0,s+.12),d.gain.linearRampToValueAtTime(.28,s+.14),d.gain.exponentialRampToValueAtTime(.001,s+.6),a.connect(d),d.connect(t.destination),a.start(s+.12),a.stop(s+.6)}catch{}}function me(){try{const e=Date.now();if(e-Ee<2500)return;Ee=e,"vibrate"in navigator&&navigator.vibrate([200,100,200,100,200])}catch{}}function xe(){try{if(localStorage.getItem("ci360_notif_enabled")==="false")return!1;if(typeof Notification<"u"&&Notification.permission==="granted")return!0}catch{}return!1}function je(){try{if(xe()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function G(){if(!("Notification"in window))return T("Your device browser does not support Web Notifications.",!0),!1;try{let e;try{e=await Notification.requestPermission()}catch{e=await new Promise(s=>Notification.requestPermission(s))}const i=document.getElementById("notifPermissionBanner");return e==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),fe().catch(()=>{}),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),T("Notifications successfully enabled for Brave, Chrome & all browsers! 🔔"),ue(),me(),await ne({title:"CI360 Laptop Alerts Active 🔔",message:"Instant notifications are now live on your laptop and browser!",id:"ci360-perm-welcome"}),!0):e==="denied"?(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),T("Notifications are blocked. In Brave / Chrome, click the lock or shield icon in the address bar to Allow notifications.",!0),!1):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),T("Notification permission was not granted.",!0),!1)}catch(e){console.error("Notification permission request error:",e)}return!1}function et(e){typeof window>"u"||(localStorage.setItem("ci360_notif_enabled",e?"true":"false"),e&&"Notification"in window&&Notification.permission==="default"&&G())}async function ne({title:e,message:i,type:t,id:s,url:o}){if(typeof window<"u"&&localStorage.getItem("ci360_notif_enabled")==="false")return;const n=s?String(s):null;if(le(),n&&V.has(n)||(n&&(V.add(n),se()),ue(),me(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return;localStorage.setItem("ci360_notif_enabled","true")}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",d={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:n?`ci360-notif-${n}`:"ci360-alert-"+Date.now(),renotify:!0,vibrate:[200,100,200,100,200],data:{url:o||(typeof window<"u"?window.location.href:""),type:t||"general"}};let p=!1;try{const l=new Notification(e,d);l.onclick=u=>{try{u.preventDefault(),window.focus(),d.data&&d.data.url&&(window.location.href=d.data.url),l.close()}catch{}},p=!0}catch{p=!1}if(!p)try{if("serviceWorker"in navigator){const l=ee||await navigator.serviceWorker.getRegistration();l&&l.showNotification&&await l.showNotification(e,d)}}catch(l){console.warn("Service worker notification fallback notice:",l)}try{navigator.serviceWorker&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:e,options:d})}catch{}}function tt(e){const i="=".repeat((4-e.length%4)%4),t=(e+i).replace(/-/g,"+").replace(/_/g,"/"),s=window.atob(t),o=new Uint8Array(s.length);for(let n=0;n<s.length;++n)o[n]=s.charCodeAt(n);return o}async function fe(e=null){try{if(typeof window>"u"||!("serviceWorker"in navigator)||!("PushManager"in window)||typeof Notification>"u"||Notification.permission!=="granted"||!F())return null;const t="serviceWorker"in navigator?navigator.serviceWorker.ready:Promise.resolve(null),s=new Promise(a=>setTimeout(()=>a(null),2500)),o=e||ee||await Promise.race([t,s]);if(!o||!o.pushManager)return null;let n=await o.pushManager.getSubscription();if(!n){const a=await J("/notifications/vapid-public-key").catch(()=>null),d=a&&a.publicKey?a.publicKey:"BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q";n=await o.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:tt(d)})}if(n){const a=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return await U("/notifications/subscribe",{method:"POST",body:JSON.stringify({subscription:n.toJSON?n.toJSON():n,deviceType:a?"mobile":"desktop"})}).catch(()=>{}),n}}catch(i){console.warn("Push subscription registration notice:",i.message)}return null}if(typeof window<"u"&&(window.triggerSystemNotification=ne,window.requestNotificationPermission=G,window.registerPushSubscription=fe,"Notification"in window)){const e=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",e,!0),window.removeEventListener("touchstart",e,!0)};window.addEventListener("click",e,!0),window.addEventListener("touchstart",e,!0)}function Be(e){return e?String(e).replace(/^[\p{Extended_Pictographic}\u2000-\u3300\uD800-\uDFFF\uFE00-\uFE0F\s]+/u,"").trim()||e:""}function it(){if(typeof document>"u")return null;let e=document.getElementById("ci360FloatingContainer");return e||(e=document.createElement("div"),e.id="ci360FloatingContainer",e.className="ci360-floating-container",document.body.appendChild(e)),e}function Pe({id:e,title:i,message:t,type:s,time:o,actionText:n,onAction:a,persistent:d=!1,timeout:p=4500}){const l=it();if(!l)return;const u=`ci360-pop-${e||Math.random().toString(36).slice(2,9)}`;for(;l.firstChild;)try{l.removeChild(l.firstChild)}catch{}let r="🔔",c="info",B="View",v="";const g=(s||"").toLowerCase(),x=(t||"").toLowerCase();g.includes("chat_message")||g.includes("chat")||g.includes("message")?(r="💬",c="info",B="Open Chat",v="teambonding"):g.includes("game_challenge")||g.includes("game")||g.includes("invitation")||g.includes("challenge")?(r="🎮",c="warning",B="View Game",v="teambonding"):g.includes("invoice_overdue")?(r="🚨",c="critical",B="View Invoice",v="billing"):g.includes("invoice_paid")||g.includes("payment")?(r="💳",c="success",B="View Billing",v="billing"):g.includes("invoice")?(r="🧾",c="info",B="View Invoice",v="billing"):g.includes("job")&&(x.includes("overdue")||g.includes("overdue"))?(r="⚠️",c="critical",B="View Job",v="jobs"):g.includes("job")&&x.includes("due today")?(r="⏳",c="warning",B="View Job",v="jobs"):g.includes("job_created")||g.includes("job")||g.includes("status")?(r="📋",c="info",B="View Job",v="jobs"):g.includes("task")&&(x.includes("overdue")||g.includes("overdue"))?(r="⚠️",c="critical",B="View Planner",v="dailytasks"):g.includes("task_completed")?(r="✅",c="success",B="View Planner",v="dailytasks"):g.includes("task")?(r="📅",c="info",B="Open Planner",v="dailytasks"):g.includes("ticket_under_review")||g.includes("ticket")&&x.includes("under review")?(r="🔍",c="warning",B="Review Ticket",v="tickets"):g.includes("ticket_resolved")||g.includes("ticket_completed")||g.includes("ticket")&&x.includes("completed")?(r="✅",c="success",B="View Ticket",v="tickets"):g.includes("ticket")?(r="🎫",c="info",B="View Ticket",v="tickets"):g.includes("target")&&(r="🎯",c="success",B="View Targets",v="targets");const C=n||B;let f=Be(i||"Notification");r&&f.startsWith(r)&&(f=f.slice(r.length).trim());const m=document.createElement("div");m.id=u,m.className=`ci360-popup-card ci360-priority-${c}`,m.innerHTML=`
    <div class="ci360-popup-body">
      <div class="ci360-popup-header">
        <div class="ci360-popup-header-left">
          <span class="ci360-popup-icon">${r}</span>
          <span class="ci360-popup-title">${h(f||"Notification")}</span>
        </div>
        <div class="ci360-popup-header-right">
          ${C?`<button type="button" class="ci360-popup-action-btn">${C}</button>`:""}
          <button type="button" class="ci360-popup-close-btn" aria-label="Dismiss">✕</button>
        </div>
      </div>
      ${t?`<div class="ci360-popup-message">${h(t||"")}</div>`:""}
    </div>
  `,ue(),me();const I=async()=>{if(e){try{await Q(`/notifications/${e}`)}catch{}typeof window.ci360RemoveNotifFromUI=="function"&&window.ci360RemoveNotifFromUI(e)}},A=()=>{m.style.opacity="0",m.style.transform="translateY(-6px) scale(0.97)",setTimeout(()=>{try{m.remove()}catch{}},180),I()},_=m.querySelector(".ci360-popup-close-btn");_&&(_.onclick=S=>{S.stopPropagation(),A()});const y=()=>{if(typeof a=="function")a();else if(v&&typeof window.ci360NavTab=="function"){const S=typeof M=="function"?M():null;let k=v;S&&S.role==="employee"&&(k==="jobs"||k==="myjobs")&&(k="myjobs"),window.ci360NavTab(k)}I(),A()},b=m.querySelector(".ci360-popup-action-btn");for(b&&(b.onclick=S=>{S.stopPropagation(),y()}),m.style.cursor="pointer",m.onclick=S=>{S.target.closest(".ci360-popup-close-btn")||y()};l.children.length>=1;){const S=l.firstChild;S&&l.removeChild(S)}l.appendChild(m),d||setTimeout(()=>{document.body.contains(m)&&A()},p||4500)}function Le(e=[]){if(!e||!e.length)return;const i=sessionStorage.getItem("ci360_client_overdue_dismissed");if(i&&Date.now()-Number(i)<2700*1e3)return;const t=e.reduce((d,p)=>d+(Number(p.pendingAmount||p.totalAmount)||0),0),s=`
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
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${be(t)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${e.length} Overdue Invoice${e.length>1?"s":""}</span>
      </div>

      <div class="ci360-overdue-list">
        ${e.map(d=>{const p=d.dueDate?new Date(d.dueDate):new Date,l=Math.max(1,Math.floor((Date.now()-p.getTime())/(1e3*60*60*24)));return`
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${h(d.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${ie(d.dueDate)} <span style="color:var(--red-600);font-weight:700">(${l}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${be(d.pendingAmount||d.totalAmount||0)}</div>
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
  `,o=oe(s),n=o.querySelector("#ci360OverduePayBtn"),a=o.querySelector("#ci360OverdueRemindBtn");n&&(n.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),o.remove(),typeof window.ci360NavTab=="function"&&window.ci360NavTab("billing")}),a&&(a.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),o.remove()})}function Ue(){return`
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
    </div>`}function Se(e){return e?e.startsWith("chat")||e.startsWith("message")?"💬":e.startsWith("game")||e.startsWith("invitation")||e.startsWith("challenge")?"🎮":e.startsWith("task_completed")?"🎉":e.startsWith("task_due")?"⚡":e.startsWith("task")?"✅":e.startsWith("target_completed")?"🎉":e.startsWith("target")?"🎯":e.startsWith("job_due")?"⏳":e.startsWith("job")?"📋":e.startsWith("ticket_under_review")?"🔍":e.startsWith("ticket_resolved")||e.startsWith("ticket_completed")?"✅":e.startsWith("ticket")?"🎫":e.startsWith("status")?"🔄":e.startsWith("test")?"🧪":"🔔":"🔔"}function re(e){if(!e)return"";const i=new Date(e),s=Math.floor((new Date-i)/1e3);if(s<60)return"Just now";const o=Math.floor(s/60);if(o<60)return`${o}m ago`;const n=Math.floor(o/60);if(n<24)return`${n}h ago`;const a=Math.floor(n/24);return a===1?"Yesterday":a<7?`${a}d ago`:ie(e)}function ye(e){if(!e)return;const i=Se(e.type),t=(e.type||"").toLowerCase(),s=e.title||"Notification",o=e.message||"",n=e.createdAt?ie(e.createdAt)+" at "+new Date(e.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"Recently",a=re(e.createdAt),d=typeof M=="function"?M():null,p=d&&d.role==="employee";let l="Update",u="blue",r="",c="";const B=e.jobId||e.taskId||e.ticketId||e.targetId||null;t.includes("job")?(l="Job Deliverable",u="blue",c=p?"myjobs":"jobs",r=p?"Open in My Jobs 📋":"View Job 📁"):t.includes("chat")||t.includes("bonding_message")||t.includes("message")?(l="Team Chat",u="blue",c="teambonding",r="Open Chat & Lounge 💬"):t.includes("game")||t.includes("challenge")||t.includes("invitation")?(l="Game Challenge",u="purple",c="teambonding",r="Enter Game Lounge 🎮"):t.includes("task")?(l="Daily Planner",u="green",c="dailytasks",r="Open Daily Planner 📅"):t.includes("ticket")?(l="Support Ticket",u="brand",c="tickets",r="Open Support Tickets 🎫"):t.includes("target")?(l="Target Goal",u="gold",c="targets",r="View My Targets 🎯"):(t.includes("invoice")||t.includes("billing"))&&(l="Billing & Invoice",u="purple",c="billing",r="Open Billing 💳");const v=Array.isArray(e.attachments)&&e.attachments.length>0,g=oe(`
    <div class="notif-detail-modal" style="padding:4px 0">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border-xs)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:12px;background:var(--bg-elevated);border:1px solid var(--border-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:var(--shadow-xs)">
            ${i}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap">
              <span class="badge ${u}" style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${l}</span>
              <span style="font-size:11.5px;color:var(--text-4)">${a}</span>
            </div>
            <div style="font-size:11px;color:var(--text-4)">${n}</div>
          </div>
        </div>
        <button type="button" class="btn ghost small notif-modal-close-btn" aria-label="Close" style="padding:4px 8px;font-size:16px;line-height:1;border-radius:6px;color:var(--text-3)">✕</button>
      </div>

      <h3 style="font-size:16.5px;font-weight:800;color:var(--text-1);margin:0 0 12px 0;line-height:1.35;letter-spacing:-0.3px">
        ${h(Be(s))}
      </h3>

      <div style="background:var(--bg-elevated);border:1px solid var(--border-xs);border-radius:var(--r-md);padding:14px 16px;margin-bottom:16px;font-size:13.5px;color:var(--text-2);line-height:1.6;white-space:pre-wrap;word-break:break-word">
        ${h(o)}
      </div>

      ${v?`
        <div style="margin-bottom:16px">
          <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Attachments (${e.attachments.length})</div>
          ${ce(e.attachments,{title:"Attachments"})}
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
  `),x=()=>g.remove(),C=g.querySelector(".notif-modal-close-btn"),f=g.querySelector(".notif-modal-dismiss-btn"),m=g.querySelector(".notif-modal-go-btn");C&&(C.onclick=x),f&&(f.onclick=x),m&&(m.onclick=()=>{x(),typeof window.ci360NavTab=="function"&&window.ci360NavTab(c,B)})}function Oe(){const e=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),t=document.getElementById("notifBadge"),s=document.getElementById("notifList"),o=document.getElementById("clearNotifBtn"),n=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),d=document.getElementById("notifDismissBannerBtn"),p=document.getElementById("notifPermissionBanner"),l=document.getElementById("notifUnreadBadge");if(!e||!i)return;ke();function u(){const y=document.getElementById("notifPermissionBanner");y&&(y.classList.add("hidden"),y.style.setProperty("display","none","important"),y.remove())}function r(){if(je()){u();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?u():Notification.permission==="default"&&p&&p.style.setProperty("display","flex","important"))}r(),d&&(d.onclick=y=>{y.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),u()}),a&&(a.onclick=async y=>{y.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),u(),await G(),u()}),xe()&&fe(),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),le();let c=[],B="all";function v(){if(!s)return;let y=c;if(B==="task"?y=c.filter(b=>(b.type||"").includes("task")):B==="target"?y=c.filter(b=>(b.type||"").includes("target")):B==="job"?y=c.filter(b=>(b.type||"").includes("job")):B==="ticket"?y=c.filter(b=>(b.type||"").includes("ticket")):B==="chat"&&(y=c.filter(b=>(b.type||"").includes("chat")||(b.type||"").includes("game")||(b.type||"").includes("bonding"))),y.length===0){s.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${B==="all"?"":B+" "}notifications</div>`;return}s.innerHTML=y.map(b=>{const S=Se(b.type);return`
        <div class="notif-item ${b.read?"":"unread"}" data-id="${b._id}" data-type="${h(b.type||"")}">
          <div class="notif-icon">${S}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${h(Be(b.title))}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${re(b.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${h(b.message)}</div>
          </div>
          <div style="color:var(--text-4);font-size:16px;line-height:1;margin-top:2px;flex-shrink:0">›</div>
        </div>`}).join(""),s.querySelectorAll(".notif-item").forEach(b=>{b.onclick=async()=>{const S=b.dataset.id,k=c.find($=>String($._id)===String(S));if(S&&b.classList.contains("unread")){b.classList.remove("unread");try{await U(`/notifications/${S}/read`,{method:"PATCH"})}catch{}const $=c.filter(N=>!N.read&&String(N._id)!==String(S)).length;t&&(t.style.display=$>0?"flex":"none",t.textContent=$>99?"99+":$),l&&(l.textContent=$>0?`${$} new`:"",l.style.display=$>0?"inline-block":"none")}if(I(),k)ye(k);else{const $=b.dataset.type,N=typeof M=="function"?M():null,z=N&&N.role==="employee";$&&$.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):$&&$.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab(z?"myjobs":"jobs"):$&&$.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):$&&$.includes("target")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("targets"):$&&($.includes("chat")||$.includes("game")||$.includes("bonding"))&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("teambonding")}}})}let g={jobs:0,tasks:0,invoices:0,tickets:0},x=!1;async function C(y=!1){try{const b=await J("/notifications");c=b.notifications||[];const S=b.unreadCount||0;if(t&&(t.textContent=S>99?"99+":S,t.style.display=S>0?"flex":"none"),l&&(l.textContent=S>0?`${S} new`:"",l.style.display=S>0?"inline-block":"none"),le(),b.overdue&&b.overdue.invoices&&b.overdue.invoices.length>0){const k=typeof M=="function"?M():null;k&&k.role==="client"&&Le(b.overdue.invoices)}if(b.syncTimestamps){const k=b.syncTimestamps;if(!x)g={...k},x=!0;else{const $=[];k.jobs>(g.jobs||0)&&$.push("jobs"),k.tasks>(g.tasks||0)&&$.push("tasks"),k.invoices>(g.invoices||0)&&$.push("invoices"),k.tickets>(g.tickets||0)&&$.push("tickets"),$.length>0&&(g={...k},window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{changedKeys:$,syncTimestamps:k,overdue:b.overdue}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({changedKeys:$,syncTimestamps:k}))}}if(!Me)c.forEach(k=>{const $=String(k._id);Ae.add($),V.add($)}),se(),Me=!0;else{const k=c.filter($=>!$.read&&!V.has(String($._id)));if(k.length>0){const N="ci360_daily_alert_job_"+new Date().toISOString().slice(0,10);let z=!!localStorage.getItem(N);k.forEach(H=>{const O=String(H._id);Ae.add(O),V.add(O)}),se();const P=k[0];if(P){const H=String(P._id);let O=!0;(P.type==="job_due"||P.title&&P.title.includes("Job Due"))&&(z?O=!1:localStorage.setItem(N,"true")),O&&(Pe({id:H,title:P.title||"CI360 Alert",message:P.message||"",type:P.type}),await ne({title:P.title||"CI360 Alert",message:P.message||"",type:P.type,id:H}))}se(),window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{newNotifications:k}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({newNotifications:k})}}v()}catch{s&&c.length===0&&(s.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=C,window.showInAppPopupAlert=Pe,window.showClientOverdueInvoiceModal=Le,window.ci360RemoveNotifFromUI=y=>{if(!y)return;const b=String(y);c=c.filter(k=>String(k._id)!==b);const S=c.filter(k=>!k.read).length;t&&(t.textContent=S>99?"99+":S,t.style.display=S>0?"inline-flex":"none"),l&&(l.textContent=S>0?`${S} unread`:"",l.style.display=S>0?"inline":"none"),v()}),C(),window.__ci360PollInterval=setInterval(C,6e3),window.addEventListener("focus",()=>C(!0)),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(y=>{y.onclick=b=>{b.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(S=>S.classList.remove("active")),y.classList.add("active"),B=y.dataset.filter,v()}});const f=document.getElementById("notifBackdrop");function m(){i.style.display="flex",i.classList.add("open"),f&&(f.style.display="block",f.classList.add("open")),e.setAttribute("aria-expanded","true"),r();const y=document.getElementById("topbarUserDropdown");y&&(y.style.display="none"),C()}function I(){i.style.display="none",i.classList.remove("open"),f&&(f.style.display="none",f.classList.remove("open")),e.setAttribute("aria-expanded","false")}function A(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?I():m()}window.ci360CloseNotifications=I;const _=document.getElementById("notifCloseBtn");_&&(_.onclick=y=>{y.stopPropagation(),I()}),f&&(f.onclick=y=>{y.stopPropagation(),I()}),e.onclick=y=>{y.stopPropagation(),A()},n&&(n.onclick=async y=>{y.stopPropagation();try{await U("/notifications/read",{method:"PATCH"}),t.style.display="none",l&&(l.textContent="",l.style.display="none"),c.forEach(b=>b.read=!0),v(),T("All notifications marked as read")}catch(b){T(b.message,!0)}}),window.__ci360NotifDocClickHandler&&document.removeEventListener("click",window.__ci360NotifDocClickHandler),window.__ci360NotifDocClickHandler=y=>{!i.contains(y.target)&&!e.contains(y.target)&&I()},document.addEventListener("click",window.__ci360NotifDocClickHandler),o&&(o.onclick=async y=>{y.stopPropagation();try{await Q("/notifications"),c=[],s.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',t.style.display="none",l&&(l.textContent="",l.style.display="none"),T("Notifications cleared")}catch(b){T(b.message,!0)}});try{const b=new URLSearchParams(window.location.search).get("notifId");b&&J("/notifications").then(S=>{const $=(S.notifications||[]).find(N=>String(N._id)===String(b));if($){ye($);const N=window.location.pathname+window.location.hash;window.history.replaceState(null,"",N)}}).catch(()=>{})}catch{}}const ge={admin:[{key:"dashboard",label:"Dashboard",icon:"📊",visible:!0,category:"Core"},{key:"dailytasks",label:"Daily Planner",icon:"📅",visible:!0,category:"Productivity"},{key:"tickets",label:"Support Tickets",icon:"🎫",visible:!0,category:"Support"},{key:"billing_dashboard",label:"Accounts & Billing",icon:"💳",href:"/accounts",visible:!0,category:"Finance"},{key:"proposals",label:"Proposal Studio",icon:"📜",visible:!0,category:"Sales"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬",visible:!0,category:"Collaboration"},{key:"logjob",label:"Log a Job",icon:"➕",visible:!0,category:"Operations"},{key:"jobs",label:"All Jobs",icon:"📁",visible:!0,category:"Operations"},{key:"byclient",label:"By Client",icon:"💼",visible:!0,category:"Analytics"},{key:"byperson",label:"By Person",icon:"👥",visible:!0,category:"Analytics"},{key:"accounts",label:"Client Roster",icon:"🏢",visible:!0,category:"Directory"},{key:"targets",label:"Targets",icon:"🎯",visible:!0,category:"Management"},{key:"salaries",label:"Salaries",icon:"💰",visible:!0,superadminOnly:!0,category:"Finance"},{key:"users",label:"Users",icon:"👤",visible:!0,superadminOnly:!0,category:"System"},{key:"manage",label:"Settings & Manage",icon:"⚙️",visible:!0,locked:!0,category:"System"}],employee:[{key:"dashboard",label:"Overview Dashboard",icon:"📊",visible:!0,category:"Core"},{key:"myjobs",label:"My Jobs",icon:"📋",visible:!0,category:"Operations"},{key:"logjob",label:"Log a Job",icon:"➕",visible:!0,category:"Operations"},{key:"jobs",label:"All Jobs",icon:"📁",visible:!0,category:"Operations"},{key:"dailytasks",label:"Daily Planner",icon:"📅",visible:!0,category:"Productivity"},{key:"tickets",label:"Support Tickets",icon:"🎫",visible:!0,category:"Support"},{key:"billing_dashboard",label:"Accounts & Billing",icon:"💳",href:"/accounts",visible:!0,category:"Finance"},{key:"proposals",label:"Proposal Studio",icon:"📜",visible:!0,category:"Sales"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬",visible:!0,category:"Collaboration"},{key:"byclient",label:"By Client",icon:"💼",visible:!0,category:"Analytics"},{key:"byperson",label:"By Person",icon:"👥",visible:!0,category:"Analytics"},{key:"accounts",label:"Client Roster",icon:"🏢",visible:!0,category:"Directory"},{key:"targets",label:"Targets",icon:"🎯",visible:!0,category:"Productivity"},{key:"salaries",label:"Salaries",icon:"💰",visible:!0,superadminOnly:!0,category:"Finance"},{key:"users",label:"Users",icon:"👤",visible:!0,superadminOnly:!0,category:"System"},{key:"manage",label:"Settings & Manage",icon:"⚙️",visible:!0,category:"System"},{key:"settings",label:"Settings",icon:"⚙️",visible:!0,category:"System"}],accounts:[{key:"overview",label:"Overview",icon:"📊",visible:!0,category:"Core"},{key:"invoices",label:"Invoices",icon:"📄",visible:!0,category:"Billing"},{key:"payments",label:"Payments",icon:"💵",visible:!0,category:"Billing"},{key:"receivables",label:"Pending & Receivables",icon:"⏳",visible:!0,category:"Billing"},{key:"billing",label:"Billing Profiles",icon:"📑",visible:!0,category:"Billing"},{key:"tally",label:"TallyPrime Silver",icon:"🏛️",visible:!0,category:"Integration"},{key:"logjob",label:"Log a Job",icon:"➕",visible:!0,category:"Operations"},{key:"jobs",label:"All Jobs",icon:"📁",visible:!0,category:"Operations"},{key:"proposals",label:"Proposal Studio",icon:"📜",visible:!0,category:"Sales"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬",visible:!0,category:"Collaboration"},{key:"tickets",label:"Support Tickets",icon:"🎫",visible:!0,category:"Support"},{key:"settings",label:"Settings",icon:"⚙️",visible:!0,category:"System"}],client:[{key:"dashboard",label:"Overview Dashboard",icon:"📊",visible:!0,category:"Core"},{key:"jobs",label:"All Jobs Logged",icon:"📋",visible:!0,category:"Operations"},{key:"logjob",label:"Log a Job",icon:"➕",visible:!0,category:"Operations"},{key:"delivered",label:"Work Delivered",icon:"📦",visible:!0,category:"Deliverables"},{key:"proposals",label:"Proposals & Scope",icon:"📜",visible:!0,category:"Contracts"},{key:"billing",label:"Billing & Invoices",icon:"💳",visible:!0,category:"Finance"},{key:"tickets",label:"Support Tickets",icon:"🎫",visible:!0,category:"Support"},{key:"team",label:"Our Team",icon:"👥",visible:!0,category:"Personnel"},{key:"teambonding",label:"Team Lounge",icon:"💬",visible:!0,category:"Collaboration"},{key:"settings",label:"Settings",icon:"⚙️",visible:!0,category:"System"}]};function ve(){try{const e=localStorage.getItem("ci360_nav_config");if(e){const i=JSON.parse(e);if(i&&typeof i=="object")return i}}catch{}return ge}async function ot(){try{const e=await J("/settings/navigation");if(e&&e.config)return localStorage.setItem("ci360_nav_config",JSON.stringify(e.config)),e.config}catch{}return ve()}async function nt(e){const i=await R("/settings/navigation",{config:e});return i&&i.config&&localStorage.setItem("ci360_nav_config",JSON.stringify(i.config)),i}async function st(){const e=await pe("/settings/navigation/reset",{});return e&&e.config&&localStorage.setItem("ci360_nav_config",JSON.stringify(e.config)),e}async function at(e,i){let t;try{t=await R(`/users/${e}/modules`,{customModules:i})}catch{t=await R(`/users/${e}`,{customModules:i})}const s=M();return s&&(s.id===e||s._id===e)&&(s.customModules=i,we(F(),s)),t}function qe(e,i,t=!1,s=null){if(!Array.isArray(i))return[];const o=s||M(),a=ve()[e]||ge[e]||[],d=new Set(a.filter(l=>l.visible===!1).map(l=>l.key)),p=o&&o.customModules&&typeof o.customModules=="object"?o.customModules:null;return i.filter(l=>{if(l.locked||e==="admin"&&l.key==="manage")return!0;if(p&&p[l.key]!==void 0)return!!p[l.key];if(!t&&(l.key==="salaries"||l.key==="users")){const u=a.find(r=>r.key===l.key);if(!u||u.visible===!1)return!1}return!d.has(l.key)})}function lt({user:e,currentRole:i,activeTab:t,tabs:s,title:o,subtitle:n}){const a=e&&e.name?e.name.charAt(0).toUpperCase():"U",d=e&&(e.role==="superadmin"||e.role==="admin")?"Admin":e&&e.role==="accounts"?"Accounts":e&&e.role==="employee"?"Employee":e&&e.role==="client"?"Client":e&&e.role?e.role.toUpperCase():"User",p=e&&e.name?e.name:"User",l=e&&e.email?e.email:e&&e.username?e.username:"",u=e&&e.role==="superadmin",r=i==="superadmin"||i==="admin"?"admin":i,c=qe(r,s||[],u,e),B=c&&c.some(f=>f.key==="logjob"),v=c&&c.find(f=>f.key===t)||s&&s.find(f=>f.key===t),g=o||v&&v.label||"Dashboard";let x=[];if(i==="accounts"?x=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:t==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:t==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(t),isMore:!0}]:i==="superadmin"||i==="admin"?x=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="dashboard"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(t),isMore:!0}]:i==="employee"?x=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:t==="myjobs"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"proposals",label:"Proposals",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',active:t==="proposals"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:t==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","proposals","targets"].includes(t),isMore:!0}]:x=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:t==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(t),isMore:!0}],x&&x.length){const m=ve()[r]||ge[r]||[],I=new Set(m.filter(_=>_.visible===!1).map(_=>_.key)),A=e&&e.customModules&&typeof e.customModules=="object"?e.customModules:null;x=x.filter(_=>_.isMore?!0:A&&A[_.key]!==void 0?!!A[_.key]:!I.has(_.key))}return`
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
          ${c.map(f=>f.href?`
            <a href="${f.href}" class="sidebar-item ${t===f.key?"active":""}" data-tab="${f.key}" aria-current="${t===f.key?"page":"false"}" style="text-decoration:none;">
              <span class="icon">${f.icon||"📌"}</span>
              <span>${f.label}</span>
            </a>`:`
            <button type="button" class="sidebar-item ${t===f.key?"active":""}" data-tab="${f.key}" aria-current="${t===f.key?"page":"false"}">
              <span class="icon">${f.icon||"📌"}</span>
              <span>${f.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${h(e?e.name:"User")}</div>
            <div class="role">${h(d)}</div>
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

            ${B?`
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
                  <span class="topbar-user-name">${h(p)}</span>
                  <span class="topbar-user-role-badge">${h(d)}</span>
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
                      ${l?`<div class="tud-email">${h(l)}</div>`:""}
                      <span class="tud-role-chip">${h(d)}</span>
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
          ${x.map(f=>`
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
              ${s.map(f=>f.href?`
                <a href="${f.href}" class="mms-card ${t===f.key?"active":""}" data-tab="${f.key}" style="text-decoration:none;">
                  <span class="mms-card-icon">${f.icon||"📌"}</span>
                  <span class="mms-card-label">${h(f.label)}</span>
                </a>`:`
                <button type="button" class="mms-card ${t===f.key?"active":""}" data-tab="${f.key}">
                  <span class="mms-card-icon">${f.icon||"📌"}</span>
                  <span class="mms-card-label">${h(f.label)}</span>
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
    </div>`}function rt(e){const i=document.getElementById("mobileNavToggle"),t=document.getElementById("appSidebar"),s=document.getElementById("sidebarOverlay");function o(){t&&t.classList.add("open"),s&&s.classList.add("open")}function n(){t&&t.classList.remove("open"),s&&s.classList.remove("open")}i&&(i.onclick=o),s&&(s.onclick=n);const a=document.querySelector(".app-shell");function d(){if(!a)return;a.classList.toggle("sidebar-collapsed");const w=a.classList.contains("sidebar-collapsed");try{localStorage.setItem("ci360_sidebar_collapsed",w?"true":"false")}catch{}}const p=document.getElementById("sidebarCollapseBtn");p&&(p.onclick=d);const l=document.getElementById("desktopSidebarToggle");l&&(l.onclick=d),window.__ci360SidebarKeyBound||(window.__ci360SidebarKeyBound=!0,window.addEventListener("keydown",w=>{if((w.ctrlKey||w.metaKey)&&(w.key==="b"||w.key==="B")){const E=document.activeElement?document.activeElement.tagName.toLowerCase():"";if(E==="input"||E==="textarea"||document.activeElement&&document.activeElement.isContentEditable)return;w.preventDefault(),d()}}));const u=document.getElementById("mobileMoreBackdrop"),r=document.getElementById("mobileMoreSheet"),c=document.getElementById("mmsCloseBtn"),B=document.getElementById("mobileMoreBtn");function v(){u&&u.classList.add("active"),r&&r.classList.add("active")}function g(){u&&u.classList.remove("active"),r&&r.classList.remove("active")}B&&(B.onclick=w=>{w.stopPropagation(),v()}),c&&(c.onclick=g),u&&(u.onclick=w=>{w.target===u&&g()}),document.querySelectorAll(".mbn-item").forEach(w=>{w.dataset.tab&&w.dataset.tab!=="__more__"&&(w.onclick=()=>{g(),e&&e(w.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(w=>{w.onclick=()=>{g(),w.tagName!=="A"&&e&&e(w.dataset.tab)}});const x=document.getElementById("mmsToggleThemeBtn");x&&(x.onclick=()=>{K(L()==="dark"?"light":"dark")});const C=document.getElementById("mmsNotifsBtn");C&&(C.onclick=()=>{g();const w=document.getElementById("notifBellBtn");w&&w.click()});const f=document.getElementById("mmsLogoutBtn");f&&(f.onclick=Z);const m=document.getElementById("mobileCalBtn");m&&(m.onclick=()=>{const w=document.querySelector(".period-row");w&&(w.scrollIntoView({behavior:"smooth",block:"center"}),w.classList.add("pulse-highlight"),setTimeout(()=>w.classList.remove("pulse-highlight"),1200))});const I=document.getElementById("tudMobileThemeBtn");I&&(I.onclick=w=>{w.stopPropagation(),K(L()==="dark"?"light":"dark")});const A=document.getElementById("tudMobileNotifsBtn");A&&(A.onclick=w=>{w.stopPropagation();const E=document.getElementById("topbarUserDropdown");E&&(E.style.display="none");const q=document.getElementById("notifBellBtn");q&&q.click()});const _=document.getElementById("tudMobileSettingsBtn");_&&(_.onclick=w=>{w.stopPropagation();const E=document.getElementById("topbarUserDropdown");E&&(E.style.display="none");const q=document.querySelector('[data-tab="settings"], [data-tab="manage"]');q&&e?e(q.dataset.tab):de()});const y=document.getElementById("tudProfileSettingsBtn");y&&(y.onclick=w=>{w.stopPropagation();const E=document.getElementById("topbarUserDropdown");E&&(E.style.display="none");const q=document.querySelector('[data-tab="settings"], [data-tab="manage"]');q&&e?e(q.dataset.tab):de()});const b=document.getElementById("tudSidebarConfigBtn");b&&(b.onclick=w=>{w.stopPropagation();const E=document.getElementById("topbarUserDropdown");E&&(E.style.display="none"),typeof window.ci360NavTab=="function"?window.ci360NavTab("manage",{section:"sidebar-customizer"}):window.location.href="/admin?tab=manage&section=sidebar-customizer"});const S=document.getElementById("tudMobileSidebarConfigBtn");S&&(S.onclick=w=>{w.stopPropagation();const E=document.getElementById("topbarUserDropdown");E&&(E.style.display="none"),typeof window.ci360NavTab=="function"?window.ci360NavTab("manage",{section:"sidebar-customizer"}):window.location.href="/admin?tab=manage&section=sidebar-customizer"});const k=document.getElementById("tudMobileHelpBtn");k&&(k.onclick=w=>{w.stopPropagation();const E=document.getElementById("topbarUserDropdown");E&&(E.style.display="none"),oe(`
        <div style="padding:24px;text-align:center;">
          <div style="font-size:36px;margin-bottom:12px;">💬</div>
          <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
          <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
            For immediate technical assistance, client onboarding, or workspace inquiries, reach out to your system administrator or support team.
          </p>
          <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
        </div>
      `)});const $=document.getElementById("logoutBtnMobile");$&&($.onclick=Z);const N=document.getElementById("topbarUserBtn"),z=document.getElementById("topbarUserDropdown");N&&z&&(N.onclick=w=>{w.stopPropagation();const E=z.style.display!=="none";z.style.display=E?"none":"block",N.setAttribute("aria-expanded",String(!E)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",w=>{!z.contains(w.target)&&!N.contains(w.target)&&(z.style.display="none",N.setAttribute("aria-expanded","false"))}));const P=document.getElementById("tudThemeToggleBtn");P&&(P.onclick=()=>{K(L()==="dark"?"light":"dark")});const H=document.getElementById("topbarQuickLogJobBtn");H&&(H.onclick=()=>{e&&e("logjob")});const O=document.getElementById("logoutBtn");O&&(O.onclick=Z),Oe(),document.querySelectorAll(".sidebar-item").forEach(w=>{w.onclick=()=>{n(),w.tagName!=="A"&&e&&e(w.dataset.tab)}}),ct(e)}function ct(e){const i=document.getElementById("cmdPaletteBackdrop"),t=document.getElementById("cmdSearchInput"),s=document.getElementById("cmdResultsList"),o=document.getElementById("topbarCmdTrigger"),n=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),d=document.getElementById("cmdCloseKbd");if(!i||!t||!s)return;const p=Array.from(document.querySelectorAll(".sidebar-item")),l=p.map(m=>({type:"tab",id:m.dataset.tab,label:m.querySelector("span:last-child")?.textContent||m.dataset.tab,icon:m.querySelector(".icon")?.textContent||"📌",sub:"Navigate to section",action:()=>{e&&e(m.dataset.tab)}}));p.some(m=>m.dataset.tab==="logjob")&&l.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{e&&e("logjob")}}),l.push({type:"action",id:"toggle-theme",label:L()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{K(L()==="dark"?"light":"dark")}}),l.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const m=document.getElementById("notifBellBtn");m&&m.click()}}),l.push({type:"action",id:"account-settings",label:"Account Settings & Credentials",icon:"⚙️",sub:"Update username, email, and password",action:()=>{de()}}),l.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>Z()});let r=0,c=[...l];function B(){if(!c.length){s.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}s.innerHTML=c.map((m,I)=>`
      <div class="cmd-result ${I===r?"selected":""}" data-idx="${I}">
        <div class="cmd-result-icon">${m.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${h(m.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${h(m.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),s.querySelectorAll(".cmd-result").forEach(m=>{m.onmouseenter=()=>{r=Number(m.dataset.idx),v()},m.onclick=()=>{g(Number(m.dataset.idx))}})}function v(){s.querySelectorAll(".cmd-result").forEach((m,I)=>{m.classList.toggle("selected",I===r)})}function g(m){const I=c[m];I&&I.action&&(C(),I.action())}function x(){const m=document.getElementById("topbarUserDropdown");m&&(m.style.display="none"),i.classList.add("open"),t.value="",c=[...l],r=0,B(),setTimeout(()=>t.focus(),50)}function C(){i.classList.remove("open"),t.blur()}o&&(o.onclick=x),n&&(n.onclick=x),a&&(a.onclick=()=>{const m=document.getElementById("topbarUserDropdown");m&&(m.style.display="none"),x()}),d&&(d.onclick=C),i.onclick=m=>{m.target===i&&C()},t.oninput=()=>{const m=t.value.trim().toLowerCase();m?c=l.filter(I=>I.label.toLowerCase().includes(m)||I.sub.toLowerCase().includes(m)):c=[...l],r=0,B()},t.onkeydown=m=>{if(m.key==="ArrowDown"){if(m.preventDefault(),c.length>0){r=(r+1)%c.length,v();const I=s.querySelector(".cmd-result.selected");I&&I.scrollIntoView({block:"nearest"})}}else if(m.key==="ArrowUp"){if(m.preventDefault(),c.length>0){r=(r-1+c.length)%c.length,v();const I=s.querySelector(".cmd-result.selected");I&&I.scrollIntoView({block:"nearest"})}}else m.key==="Enter"?(m.preventDefault(),g(r)):m.key==="Escape"&&(m.preventDefault(),C())};const f=m=>{(m.metaKey||m.ctrlKey)&&m.key.toLowerCase()==="k"?(m.preventDefault(),i.classList.contains("open")?C():x()):m.key==="Escape"&&i.classList.contains("open")&&C()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=f,window.addEventListener("keydown",f)}function dt(e=4){return`
    <div class="grid grid-${Math.min(e,4)}" style="margin-bottom:24px">
      ${Array(e).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function pt(e,i,t="📁",s=""){return`
    <div class="empty">
      <span class="empty-icon">${t}</span>
      <h3>${h(e)}</h3>
      <p>${h(i)}</p>
      ${s}
    </div>`}function ut(e,i,t="",s="📊",o=""){let n="";return o&&(n=`<span class="kpi-trend ${o.startsWith("+")||o.includes("↑")||o.toLowerCase().includes("up")?"up":"down"}">${h(o)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${h(e)}</span>
        <div class="kpi-icon">${s}</div>
      </div>
      <div class="kpi-value">${h(i)}</div>
      <div class="kpi-sub">${n}<span>${h(t)}</span></div>
    </div>`}function mt(e,i="gray"){return`<span class="badge ${i}">${h(e)}</span>`}function ft(e,i="indigo"){const t=Math.min(100,Math.max(0,Number(e)||0));return`
    <div class="progress-bar-wrap" title="${t.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${t}%"></div>
    </div>`}function gt(e){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([t,s])=>`<button class="pchip ${e===t?"active":""}" data-period="${t}">${s}</button>`).join("")}</div>`}function vt(e){if(!e)return"U";const i=e.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function j(e){if(e=Number(e)||0,e===0)return"0 B";const i=1024,t=["B","KB","MB","GB","TB"],s=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,s)).toFixed(1))+" "+(t[s]||"GB")}const bt=j;function he(e){if(!e)return"";if(/^https?:\/\//i.test(e)||e.startsWith("data:")||e.startsWith("blob:"))return e;if(/^https?:\/\//i.test(ae))try{return new URL(ae).origin+(e.startsWith("/")?e:"/"+e)}catch{}return e}function Y(e="",i=""){const t=(e.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico","tiff","tif","heic","heif"].includes(t)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:t==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(t)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods","tsv"].includes(t)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["ppt","pptx","key"].includes(t)?{icon:"📑",cls:"pres",label:"Presentation"}:["zip","rar","7z","tar","gz","bz2"].includes(t)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm","m4v","3gp","wmv","flv"].includes(t)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a","flac","aac","wma"].includes(t)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:["psd","ai","eps","sketch","fig","xd","blend","obj","fbx","cdr"].includes(t)?{icon:"🎨",cls:"design",label:"Design & Creative"}:["js","ts","jsx","tsx","html","css","json","xml","py","sql","md","sh","php"].includes(t)?{icon:"💻",cls:"code",label:"Code File"}:{icon:"📎",cls:"other",label:"File"}}function yt(e){return e?Y(e.name||e.filename||"",e.type||"").cls==="img":!1}function $e(e){if(!e||!e.url)return;const i=Y(e.name,e.type),t=i.cls==="img",s=i.cls==="pdf",o=h(e.name||"Attachment"),n=j(e.size);let a="";t?a=`<img src="${e.url}" alt="${o}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${e.url}','_blank')">`:s?a=`<iframe src="${e.url}" title="${o}"></iframe>`:i.cls==="video"?a=`
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;width:100%;max-width:880px;">
        <video controls autoplay preload="metadata" style="max-height:70vh;width:100%;border-radius:8px;background:#000;box-shadow:0 8px 24px rgba(0,0,0,0.5);">
          <source src="${e.url}" type="${e.type||"video/mp4"}">
          Your browser does not support HTML5 video streaming.
        </video>
        <div style="margin-top:10px;font-size:12px;color:var(--text-3);display:flex;align-items:center;gap:12px;">
          <span>🎬 ${o}</span>
          <span>•</span>
          <span>${n}</span>
        </div>
      </div>
    `:i.cls==="audio"?a=`
      <div style="text-align:center;padding:32px 20px;max-width:480px;margin:0 auto">
        <div style="font-size:44px;margin-bottom:12px">🎵</div>
        <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${o}</div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:16px">${n}</div>
        <audio controls autoplay style="width:100%;margin-bottom:16px;">
          <source src="${e.url}" type="${e.type||"audio/mpeg"}">
          Your browser does not support audio playback.
        </audio>
        <div>
          <a href="${e.url}" download="${o}" target="_blank" class="btn gold small">Download Audio</a>
        </div>
      </div>
    `:a=`
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:48px;margin-bottom:12px">${i.icon}</div>
        <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${o}</div>
        <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${n}</div>
        <a href="${e.url}" download="${o}" target="_blank" class="btn gold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Attachment
        </a>
      </div>
    `;const d=document.createElement("div");d.className="preview-modal-overlay",d.innerHTML=`
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${i.icon}</span>
          <span>${o}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${n})</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="${e.url}" download="${o}" target="_blank" class="btn ghost small" style="font-size:12px;padding:4px 10px">
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
  `,d.onclick=p=>{(p.target===d||p.target.closest(".preview-modal-close"))&&d.remove()},document.body.appendChild(d)}function ce(e=[],i={}){if(!e||!e.length)return"";const t=!!i.canDelete,s=e.filter(o=>!o||!o.url||o.type==="url"||/^https?:\/\//i.test(o.url||"")?!1:Y(o.name,o.type).cls==="video"||o.name&&o.name.match(/\.(mp4|mov|webm|mkv|avi)$/i)||o.type&&o.type.startsWith("video/"));return`
    <div class="attachment-chips-wrap" data-attachments="${encodeURIComponent(JSON.stringify(e))}">
      ${i.title?`<div class="attachment-chips-header">📎 ${h(i.title)} <span style="font-weight:500;color:var(--text-4)">(${e.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${e.map((o,n)=>{const a=o.type==="url"||/^https?:\/\//i.test(o.url||""),d=a?{cls:"file-type-doc",icon:"🌐"}:Y(o.name,o.type),p=h(o.name||(a?"Live Deliverable URL":"File")),l=a?"Live Link":j(o.size),u=d.cls==="video"||o.name&&o.name.match(/\.(mp4|mov|webm|mkv|avi)$/i),r=he(o.url);return`
            <div class="attachment-chip ${u?"is-video":""}" data-idx="${n}" title="${p} (${l})">
              <span class="file-type-icon ${d.cls}" style="width:22px;height:22px;font-size:12px">${d.icon}</span>
              ${a?`
                <a href="${o.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-name" style="text-decoration:none;color:inherit;cursor:pointer" title="Open live URL in new tab">
                  ${p} <span style="font-size:11px;opacity:0.75">↗</span>
                </a>
              `:`
                <span class="attachment-chip-name" onclick="window.__openPreview(${n}, this)">
                  ${p}
                  ${u?'<span class="badge blue" style="font-size:9.5px;padding:1px 4px;margin-left:5px">🎬 MP4 Video</span>':""}
                </span>
              `}
              <span class="attachment-chip-size">${l}</span>
              <div class="attachment-chip-actions">
                ${a?`
                  <a href="${o.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-btn" title="Open Live Link" onclick="event.stopPropagation()">🔗</a>
                `:`
                  <button type="button" class="attachment-chip-btn" title="${u?"Play Video":"View Preview"}" onclick="window.__openPreview(${n}, this)">${u?"▶️":"👁️"}</button>
                  <a href="${r}" download="${p}" target="_blank" class="attachment-chip-btn" title="Download File" onclick="event.stopPropagation()">⬇️</a>
                `}
                ${t?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${n}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>

      ${s.length>0?`
        <div class="attachment-videos-container" style="display:flex;flex-direction:column;gap:12px;margin-top:10px">
          ${s.map(o=>{const n=h(o.name||"Deliverable Video"),a=j(o.size),d=he(o.url);return`
              <div class="attachment-video-card" style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:8px;padding:12px;overflow:hidden">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:6px">
                  <span style="font-size:12.5px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px">
                    <span style="font-size:16px">🎬</span>
                    <span>${n}</span>
                    <span class="badge blue" style="font-size:10px;padding:2px 6px">${a}</span>
                  </span>
                  <a href="${d}" download="${n}" target="_blank" class="btn ghost small" style="font-size:11.5px;padding:3px 10px" onclick="event.stopPropagation()">
                    ⬇️ Download Video (${a})
                  </a>
                </div>
                <video controls preload="metadata" style="width:100%;max-height:380px;background:#000;border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,0.4);" playsinline>
                  <source src="${d}" type="${o.type||"video/mp4"}">
                  Your browser does not support HTML5 video streaming.
                </video>
              </div>
            `}).join("")}
        </div>
      `:""}
    </div>
  `}const D={};function Ce(e,i){return new Promise((t,s)=>{const o=new XMLHttpRequest,n=typeof F=="function"?F():localStorage.getItem("ci360_token")||"",a=encodeURIComponent(e.name||"file.bin"),d=e.type||"application/octet-stream",p=ae.replace(/\/+$/,""),l=n?`&token=${encodeURIComponent(n)}`:"",u=`${p}/upload/stream?name=${a}&type=${encodeURIComponent(d)}${l}`;o.open("POST",u,!0),n&&o.setRequestHeader("Authorization","Bearer "+n),o.setRequestHeader("Content-Type","application/octet-stream"),o.setRequestHeader("X-File-Name",a),o.setRequestHeader("X-File-Type",d),o.upload&&(o.upload.onprogress=r=>{if(r.lengthComputable&&typeof i=="function"){const c=Math.min(99,Math.round(r.loaded/r.total*100));i(c,r.loaded,r.total)}}),o.onload=()=>{if(o.status>=200&&o.status<300)try{const r=JSON.parse(o.responseText);typeof i=="function"&&i(100,e.size,e.size),t(r.file||r.files&&r.files[0])}catch{s(new Error("Failed to parse upload response"))}else try{const r=JSON.parse(o.responseText);s(new Error(r.error||`Upload failed with HTTP ${o.status}`))}catch{s(new Error(`Upload failed with HTTP ${o.status}`))}},o.onerror=()=>s(new Error("Network error during file upload. Please check connection.")),o.ontimeout=()=>s(new Error("Upload timed out. File may be too heavy or connection slow.")),o.timeout=36e5,o.send(e)})}async function Re(e,i){const t=Array.from(e||[]);if(!t.length)return[];const s=new Array(t.length),o={};for(let l=0;l<t.length;l++)o[l]=0;let n=0;const a=3;async function d(){for(;n<t.length;){const l=n++,u=t[l];try{const r=await Ce(u,(c,B,v)=>{if(o[l]=c,typeof i=="function"){const g=Object.values(o).reduce((C,f)=>C+f,0),x=Math.round(g/t.length);i(x,B,v,u,l,t.length)}});s[l]=r}catch(r){if(console.warn("Fast upload error for",u.name,r),u.size<10*1024*1024){const c=await new Promise(B=>{const v=new FileReader;v.onload=()=>B({name:u.name,url:v.result,size:u.size,type:u.type||"application/octet-stream",uploadedAt:new Date}),v.onerror=()=>B(null),v.readAsDataURL(u)});s[l]=c}else throw r}}}const p=[];for(let l=0;l<Math.min(a,t.length);l++)p.push(d());return await Promise.all(p),s.filter(Boolean)}async function ht(e,i){return Re(e,i)}function Ie({id:e="uploader",label:i="Attachments & Files",subtitle:t="Upload any file: MP4 videos (up to 1GB), images, PDFs, spreadsheets, design assets, or archives",multiple:s=!0,accept:o="",maxFiles:n=30}={}){const a=o?`accept="${o}"`:"";return`
    <div class="uploader-container" id="container-${e}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${h(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${e}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${e}">
        <input type="file" id="input-${e}" ${s?"multiple":""} ${a} style="display:none">
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
  `}function Te(e,i={}){const t=document.getElementById("zone-"+e),s=document.getElementById("input-"+e),o=document.getElementById("list-"+e),n=document.getElementById("count-"+e);D[e]=i.existing?[...i.existing]:[];function a(){const p=D[e]||[];if(n&&(n.textContent=`${p.length} file${p.length===1?"":"s"} attached`),!!o){if(!p.length){o.innerHTML="";return}o.innerHTML=p.map((l,u)=>{const r=Y(l.name,l.type),c=h(l.name||"File"),B=j(l.size),v=r.cls==="video"||l.name&&l.name.match(/\.(mp4|mov|webm|mkv|avi)$/i)||l.type&&l.type.startsWith("video/"),g=he(l.url);return`
        <div class="uploader-file-item ${v?"is-video":""}" style="display:flex;flex-direction:column;gap:6px;padding:8px 10px;background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:6px;margin-bottom:8px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <div class="uploader-file-info" style="display:flex;align-items:center;gap:8px;min-width:0;flex:1">
              <span class="file-type-icon ${r.cls}" style="width:24px;height:24px;font-size:13px">${r.icon}</span>
              <div style="min-width:0;flex:1">
                <div class="uploader-file-name" title="${c}" style="font-size:12px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                  ${c}
                  ${v?'<span class="badge blue" style="font-size:9.5px;padding:1px 5px;margin-left:6px">🎬 Video Deliverable</span>':""}
                </div>
                <div class="uploader-file-size" style="font-size:11px;color:var(--text-3)">${r.label} · ${B}</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${e}', ${u})">Preview / Play</button>
              <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${e}', ${u})">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
          ${v&&g?`
            <div style="margin-top:4px;border-radius:6px;overflow:hidden;background:#000;border:1px solid var(--border-sm)">
              <video controls preload="metadata" style="width:100%;max-height:240px;display:block;" playsinline>
                <source src="${g}" type="${l.type||"video/mp4"}">
                Your browser does not support HTML5 video streaming.
              </video>
            </div>
          `:""}
        </div>
      `}).join(""),i.onChange&&i.onChange(p)}}async function d(p){const l=Array.from(p||[]);if(l.length&&o){for(let u=0;u<l.length;u++){const r=l[u],c=`up-prog-${Date.now()}-${u}`,B=h(r.name||"video.mp4"),v=j(r.size),g=r.type?.startsWith("video/")||r.name?.match(/\.(mp4|mov|webm|mkv|avi)$/i),x=document.createElement("div");x.id=c,x.className="uploader-progress-card",x.style.cssText="padding:10px 12px;background:var(--bg-elevated);border:1px solid var(--brand-500,#3b82f6);border-radius:6px;margin-bottom:8px;",x.innerHTML=`
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:12px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px">
            <span>${g?"🎬":"📎"}</span>
            <span style="max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${B}</span>
          </span>
          <span style="font-size:11.5px;font-weight:700;color:var(--brand-500,#3b82f6)" id="${c}-percent">0%</span>
        </div>
        <div style="background:rgba(255,255,255,0.12);height:7px;border-radius:4px;overflow:hidden;margin-bottom:6px">
          <div id="${c}-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #3b82f6, #06b6d4);transition:width 0.1s linear;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--text-3)">
          <span id="${c}-status">Uploading ${v}… please wait</span>
          <span id="${c}-bytes">0 MB / ${v}</span>
        </div>
      `,o.appendChild(x);try{const C=await Ce(r,(f,m,I)=>{const A=document.getElementById(`${c}-bar`),_=document.getElementById(`${c}-percent`),y=document.getElementById(`${c}-bytes`);A&&(A.style.width=`${f}%`),_&&(_.textContent=`${f}%`),y&&(y.textContent=`${j(m)} / ${j(I)}`)});x.remove(),C&&(D[e]=[...D[e]||[],C],a())}catch(C){console.error("File upload failed:",C);const f=document.getElementById(`${c}-status`);f&&(f.textContent="❌ Upload failed: "+(C.message||"Network error"),f.style.color="var(--red-500, #ef4444)"),T("Upload failed for "+r.name+": "+(C.message||"Network error"),!0)}}T("File attached successfully! ✓")}}window.__removeUploaderFile=(p,l)=>{if(D[p]){D[p].splice(l,1);const u=window[`__update_${p}`];u&&u()}},window.__previewUploaderFile=(p,l)=>{const u=(D[p]||[])[l];u&&$e(u)},window[`__update_${e}`]=a,t&&s&&(t.onclick=p=>{p.target.tagName!=="BUTTON"&&!p.target.closest("button")&&s.click()},t.ondragover=p=>{p.preventDefault(),t.classList.add("dragover")},t.ondragleave=()=>t.classList.remove("dragover"),t.ondrop=async p=>{p.preventDefault(),t.classList.remove("dragover"),p.dataTransfer&&p.dataTransfer.files&&p.dataTransfer.files.length&&await d(p.dataTransfer.files)},s.onchange=async()=>{const p=Array.from(s.files||[]);s.value="",p.length>0&&await d(p)}),a()}function Ne(e){return D[e]||[]}function Fe(e,i=[]){D[e]=[...i];const t=window[`__update_${e}`];t&&t()}window.__openPreview=(e,i)=>{const t=i.closest(".attachment-chips-wrap")||i.closest("[data-attachments]");if(!t)return;const s=i.closest(".attachment-chip"),o=s?Number(s.dataset.idx):e,n=t.dataset.attachments||t.parentElement?.dataset?.attachments;if(n)try{const a=JSON.parse(decodeURIComponent(n));a[o]&&$e(a[o])}catch{}};function wt(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");return`
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
        ${Ie({id:"tkup-"+t,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const kt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},xt={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function Bt(e,i){const t=(e.status||"Open").toLowerCase().replace(" ","-"),s=e.status==="Open",o=(e._id||"").slice(-4).toUpperCase(),n=vt(e.userName),a=encodeURIComponent(JSON.stringify(e.attachments||[])),d=encodeURIComponent(JSON.stringify(e.adminAttachments||[]));return`
    <div class="ticket-card status-${t}" id="tkcard-${e._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${o}</span>
            <span class="ticket-subject">${h(e.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${kt[e.status]||"gray"}">
            ${s?'<span class="pulse-dot"></span>':""} ${h(e.status)}
          </span>
          <span class="badge ${xt[e.priority]||"gray"}">${h(e.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${n}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${h(e.userName)}
            <span class="ticket-role-pill">${h(e.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${re(e.createdAt)} · ${ie(e.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${h(e.message)}</div>

      ${e.attachments&&e.attachments.length?`
        <div data-attachments="${a}">
          ${ce(e.attachments,{title:"Ticket Attachments"})}
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
              ${e.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${re(e.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${h(e.adminReply)}</div>
            ${e.adminAttachments&&e.adminAttachments.length?`
              <div data-attachments="${d}">
                ${ce(e.adminAttachments,{title:"Support Attached Files"})}
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
            ${Ie({id:"tkreplyup-"+e._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${e._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${e._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function W(e,i,t){const s=document.getElementById("tklist-"+i),o=document.getElementById("tkcnt-"+i);if(s)try{const n=await J("/tickets/job/"+e);o&&(o.textContent=n.length),n.length?(s.innerHTML=n.map(a=>Bt(a,t)).join(""),St(e,i,t,s,n)):s.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{s.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function St(e,i,t,s,o){t&&(s.querySelectorAll(".tk-status-sel").forEach(n=>{n.onchange=async()=>{try{await R("/tickets/"+n.dataset.tkid,{status:n.value}),T("Status updated"),W(e,i,t)}catch(a){T(a.message,!0)}}}),s.querySelectorAll(".tk-quick-resolve-btn").forEach(n=>{n.onclick=async()=>{try{await R("/tickets/"+n.dataset.tkid,{status:"Resolved"}),T("Ticket marked as Resolved! 🎉"),W(e,i,t)}catch(a){T(a.message,!0)}}}),s.querySelectorAll(".ticket-template-btn").forEach(n=>{n.onclick=()=>{const a=document.getElementById("tkreplytxt-"+n.dataset.tkid);a&&(a.value=n.dataset.tpl,a.focus())}}),s.querySelectorAll(".tk-reply-toggle").forEach(n=>{n.onclick=()=>{const a=n.dataset.tkid,d=document.getElementById("tkreplyform-"+a);if(d){d.classList.toggle("show");const p=o.find(l=>l._id===a);Te("tkreplyup-"+a,{existing:p?p.adminAttachments:[]})}}}),s.querySelectorAll(".tk-reply-cancel").forEach(n=>{n.onclick=()=>{const a=document.getElementById("tkreplyform-"+n.dataset.tkid);a&&a.classList.remove("show")}}),s.querySelectorAll(".tk-reply-save").forEach(n=>{n.onclick=async()=>{const a=n.dataset.tkid,d=document.getElementById("tkreplytxt-"+a);if(!d)return;const p=Ne("tkreplyup-"+a);try{await R("/tickets/"+a,{adminReply:d.value.trim(),adminAttachments:p}),T("Response saved! 🛡️"),W(e,i,t)}catch(l){T(l.message,!0)}}}),s.querySelectorAll(".tk-del-btn").forEach(n=>{n.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await Q("/tickets/"+n.dataset.tkid),T("Ticket deleted"),W(e,i,t)}catch(a){T(a.message,!0)}}}))}function $t(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");W(e,t,i),Te("tkup-"+t);const s=document.querySelector(`[data-jobid="${e}"].ticket-toggle-btn`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+t);if(!a)return;const d=a.style.display==="block";a.style.display=d?"none":"block",s.textContent=d?"+ Raise Ticket":"✕ Cancel"});const o=document.querySelector(`.tk-cancel-btn[data-safeid="${t}"]`);o&&(o.onclick=()=>{const a=document.getElementById("tkform-"+t);a&&(a.style.display="none"),s&&(s.textContent="+ Raise Ticket")});const n=document.querySelector(`.tk-submit-btn[data-safeid="${t}"]`);n&&(n.onclick=async()=>{const a=(document.getElementById("tksub-"+t)||{}).value?.trim(),d=(document.getElementById("tkmsg-"+t)||{}).value?.trim(),p=(document.getElementById("tkpri-"+t)||{}).value,l=Ne("tkup-"+t);if(!a){T("Please enter a subject",!0);return}if(!d){T("Please enter a message",!0);return}n.disabled=!0,n.textContent="Submitting…";try{await pe("/tickets",{jobId:e,subject:a,message:d,priority:p,attachments:l}),T("Ticket submitted! 🎫");const u=document.getElementById("tkform-"+t);u&&(u.style.display="none"),s&&(s.textContent="+ Raise Ticket");const r=document.getElementById("tksub-"+t),c=document.getElementById("tkmsg-"+t);r&&(r.value=""),c&&(c.value=""),Fe("tkup-"+t,[]),W(e,t,i)}catch(u){T(u.message,!0)}finally{n.disabled=!1,n.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function Ct(){return""}function It(){}function He(e={}){const{title:i="Account Settings & Credentials",subtitle:t="Update your personal name, login email, and security password",showCardWrapper:s=!0,formId:o="accSettingsForm"}=e,n=M()||{},a=n.name?n.name.charAt(0).toUpperCase():"U",d=(n.role||"user").toUpperCase(),p=typeof window<"u"?localStorage.getItem("ci360_notif_enabled")!=="false"&&"Notification"in window&&Notification.permission==="granted":!0,l=typeof navigator<"u"&&(navigator.brave&&typeof navigator.brave.isBrave=="function"||/Brave/i.test(navigator.userAgent)),u=typeof window<"u"&&"Notification"in window?Notification.permission:"default",r=u==="granted"?"Status: 🟢 Active on this laptop & browser":u==="denied"?`Status: 🔴 Blocked by browser. Click the lock/shield icon next to URL in ${l?"Brave":"your browser"} bar to allow.`:"Status: ⚪ Ready to enable (Click toggle or Send Test Alert)";return`
    <div class="${s?"card":""}" style="max-width:100%;margin:0;width:100%;box-sizing:border-box;" id="${o}-wrap">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--gold-500,#d4af37),#b8860b);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:20px;box-shadow:0 4px 12px rgba(212,175,55,0.25);flex-shrink:0;">
          ${h(a)}
        </div>
        <div style="min-width:0;flex:1;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <h3 style="font-size:18px;font-weight:700;color:var(--text-1);margin:0;">${h(i)}</h3>
            <span class="badge gold" style="font-size:11px;padding:2px 8px;">${h(d)}</span>
          </div>
          <div style="font-size:13px;color:var(--text-3);margin-top:2px;">${h(t)}</div>
        </div>
      </div>

      <form id="${o}" onsubmit="return false;" style="display:flex;flex-direction:column;gap:20px;">
        <!-- Personal Identity -->
        <div>
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--gold-500,#d4af37);margin-bottom:12px;display:flex;align-items:center;gap:6px;">
            <span>👤</span> Profile Identity
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
            <div class="field" style="margin-bottom:0;">
              <label for="${o}-name" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Username / Full Name *</label>
              <input type="text" id="${o}-name" class="input" value="${h(n.name||"")}" placeholder="Your display name" required autocomplete="name">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${o}-email" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Email Address *</label>
              <input type="email" id="${o}-email" class="input" value="${h(n.email||"")}" placeholder="name@company.com" required autocomplete="email">
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
            <label for="${o}-currentPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Current Password</label>
            <div style="position:relative;">
              <input type="password" id="${o}-currentPass" class="input" placeholder="Enter current password" autocomplete="current-password" style="padding-right:42px;">
              <button type="button" class="pass-toggle-btn" data-target="${o}-currentPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
            <div class="field" style="margin-bottom:0;">
              <label for="${o}-newPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">New Password</label>
              <div style="position:relative;">
                <input type="password" id="${o}-newPass" class="input" placeholder="Min. 6 characters" autocomplete="new-password" style="padding-right:42px;">
                <button type="button" class="pass-toggle-btn" data-target="${o}-newPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
              </div>
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${o}-confirmPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Confirm New Password</label>
              <div style="position:relative;">
                <input type="password" id="${o}-confirmPass" class="input" placeholder="Re-enter new password" autocomplete="new-password" style="padding-right:42px;">
                <button type="button" class="pass-toggle-btn" data-target="${o}-confirmPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications & Alerts (Browser / Laptop / Web App) -->
        <div style="padding-top:16px;border-top:1px dashed var(--border);">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--gold-500,#d4af37);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
            <span>🔔</span> Laptop & Browser Notifications
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-bottom:14px;">
            Receive real-time desktop popups on your laptop and browser when tasks are assigned, dates change, or jobs update. Works seamlessly in browser tabs and installed web apps.
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;background:var(--bg-2,rgba(255,255,255,0.03));padding:12px 16px;border-radius:10px;border:1px solid var(--border);">
            <div style="display:flex;align-items:center;gap:12px;">
              <input type="checkbox" id="${o}-notifToggle" class="checkbox" ${p?"checked":""} style="width:18px;height:18px;cursor:pointer;">
              <div>
                <label for="${o}-notifToggle" style="font-size:13px;font-weight:600;color:var(--text-1);cursor:pointer;display:block;" id="${o}-notifStateText">
                  ${p?"Notifications Enabled":"Notifications Disabled"}
                </label>
                <div style="font-size:11.5px;color:var(--text-3);" id="${o}-notifSubtext">
                  ${r}
                </div>
              </div>
            </div>
            <button type="button" class="btn ghost small" id="${o}-testNotifBtn" style="padding:6px 12px;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
              <span>🔔</span> Send Test Alert
            </button>
          </div>
          <div style="margin-top:10px;font-size:11.5px;color:var(--text-3);line-height:1.4;">
            💡 <strong>Brave, Chrome, Edge & Firefox on Laptops:</strong> Notifications pop up in the Windows Action Center (bottom-right of your screen) with audio chime. In Brave, ensure notifications are allowed under the site shield/lock icon in the URL bar.
          </div>
        </div>

        <!-- Alert Notice Box -->
        <div id="${o}-alert" style="display:none;padding:12px 14px;border-radius:8px;font-size:13px;line-height:1.4;"></div>

        <!-- Footer Actions -->
        <div style="display:flex;align-items:center;justify-content:flex-end;gap:12px;padding-top:8px;">
          <button type="button" class="btn gold" id="${o}-saveBtn" style="min-width:150px;display:flex;align-items:center;justify-content:center;gap:8px;">
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  `}function Ve(e,i={}){const{formId:t="accSettingsForm",onSaved:s=null,modalBg:o=null}=i,n=e||document;n.querySelectorAll(".pass-toggle-btn").forEach(v=>{v.onclick=()=>{const g=v.dataset.target,x=n.querySelector("#"+g)||document.getElementById(g);if(x){const C=x.type==="password";x.type=C?"text":"password",v.textContent=C?"🙈":"👁️",v.style.opacity=C?"1":"0.65"}}});const a=n.querySelector("#"+t+"-notifToggle")||document.getElementById(t+"-notifToggle"),d=n.querySelector("#"+t+"-notifStateText")||document.getElementById(t+"-notifStateText"),p=n.querySelector("#"+t+"-notifSubtext")||document.getElementById(t+"-notifSubtext"),l=n.querySelector("#"+t+"-testNotifBtn")||document.getElementById(t+"-testNotifBtn");a&&(a.onchange=async()=>{if(a.checked){if("Notification"in window&&Notification.permission!=="granted"&&!await G()){a.checked=!1,d&&(d.textContent="Notifications Disabled"),p&&(p.textContent="Status: Permission not granted");return}localStorage.setItem("ci360_notif_enabled","true"),d&&(d.textContent="Notifications Enabled"),p&&(p.textContent="Status: Active on this device"),T("Notifications enabled on this laptop/device! 🔔")}else localStorage.setItem("ci360_notif_enabled","false"),d&&(d.textContent="Notifications Disabled"),p&&(p.textContent="Status: Disabled in settings"),T("Notifications disabled on this laptop/device.")}),l&&(l.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await G()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):T("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true"),a&&(a.checked=!0),d&&(d.textContent="Notifications Enabled"),p&&(p.textContent="Status: 🟢 Active on this laptop & browser"),await ne({title:"CI360 Laptop Alert 🔔",message:"Desktop & downloaded app notifications are active and working!",id:"ci360-test-"+Date.now()}),T("Test notification sent to your laptop/browser! 🔔")});const u=n.querySelector("#"+t+"-saveBtn")||document.getElementById(t+"-saveBtn"),r=n.querySelector("#"+t+"-alert")||document.getElementById(t+"-alert");function c(v,g=!0){r&&(r.style.display="block",r.style.background=g?"rgba(239,68,68,0.12)":"rgba(34,197,94,0.12)",r.style.border=g?"1px solid rgba(239,68,68,0.3)":"1px solid rgba(34,197,94,0.3)",r.style.color=g?"#ef4444":"#22c55e",r.innerHTML=(g?"⚠️ ":"✓ ")+h(v))}function B(){r&&(r.style.display="none")}u&&(u.onclick=async()=>{B();const v=n.querySelector("#"+t+"-name")||document.getElementById(t+"-name"),g=n.querySelector("#"+t+"-email")||document.getElementById(t+"-email"),x=n.querySelector("#"+t+"-currentPass")||document.getElementById(t+"-currentPass"),C=n.querySelector("#"+t+"-newPass")||document.getElementById(t+"-newPass"),f=n.querySelector("#"+t+"-confirmPass")||document.getElementById(t+"-confirmPass"),m=(v?.value||"").trim(),I=(g?.value||"").trim(),A=x?.value||"",_=C?.value||"",y=f?.value||"";if(!m){c("Please enter your full name or username.",!0),v?.focus();return}if(!I||!I.includes("@")){c("Please enter a valid email address.",!0),g?.focus();return}if(_||y){if(!A){c("Please enter your current password to set a new password.",!0),x?.focus();return}if(_.length<6){c("New password must be at least 6 characters long.",!0),C?.focus();return}if(_!==y){c("New passwords do not match. Please re-check.",!0),f?.focus();return}}const b={name:m,email:I};_&&(b.currentPassword=A,b.newPassword=_);const S=u.innerHTML;u.disabled=!0,u.innerHTML="<span>Saving Changes…</span>";try{const k=await R("/auth/profile",b);k&&k.token&&k.user&&we(k.token,k.user),document.querySelectorAll(".topbar-user-name, .sidebar-user .name, .tud-name").forEach(N=>{N.textContent=k.user.name}),document.querySelectorAll(".tud-email").forEach(N=>{N.textContent=k.user.email});const $=k.user.name?k.user.name.charAt(0).toUpperCase():"U";document.querySelectorAll(".topbar-user-avatar span, .user-avatar, .tud-avatar").forEach(N=>{N.classList.contains("topbar-online-dot")||(N.textContent=$)}),x&&(x.value=""),C&&(C.value=""),f&&(f.value=""),c("Account credentials updated successfully!",!1),T("Account settings saved! ✓"),typeof s=="function"&&s(k.user),o&&setTimeout(()=>{try{o.remove()}catch{}},900)}catch(k){c(k.message||"Failed to update credentials. Please try again.",!0),T(k.message||"Update failed",!0)}finally{u.disabled=!1,u.innerHTML=S}})}function de(){const e=`
    <div style="position:relative;padding:12px 6px;">
      <button type="button" id="closeAccSettingsModalBtn" style="position:absolute;top:-4px;right:0;border:none;background:transparent;color:var(--text-3);font-size:20px;cursor:pointer;padding:6px 10px;" aria-label="Close modal">✕</button>
      ${He({title:"Account Settings",subtitle:"Manage your personal email, username, and password",showCardWrapper:!1,formId:"modalAccSettingsForm"})}
    </div>
  `,i=oe(e),t=i.querySelector("#closeAccSettingsModalBtn");return t&&(t.onclick=()=>i.remove()),Ve(i,{formId:"modalAccSettingsForm",modalBg:i}),i}window.__setTheme=function(e){K(e)};Object.assign(window,{getToken:F,getUser:M,setSession:we,clearSession:te,requireAuth:Je,initTheme:ze,api:U,apiGet:J,apiPost:pe,apiPut:R,apiPatch:We,apiDelete:Q,fmtINR:be,fmtHours:Xe,escapeHtml:h,fmtDate:ie,flashToast:T,openModal:oe,logout:Z,getTheme:L,setTheme:K,initServiceWorker:ke,playNotificationChime:ue,triggerPhoneVibration:me,requestNotificationPermission:G,triggerSystemNotification:ne,isNotificationEnabled:xe,setNotificationEnabled:et,fmtFileSize:j,formatFileSize:bt,uploadSingleFileDirectly:Ce,uploadMultipleFilesFast:Re,getFileCategory:Y,isImageAttachment:yt,openFilePreviewModal:$e,renderAttachmentChips:ce,uploadFilesToServer:ht,renderAttachmentUploader:Ie,bindAttachmentUploader:Te,getUploaderAttachments:Ne,setUploaderAttachments:Fe,renderRoleSwitcher:Ct,bindRoleSwitcher:It,renderNotificationBell:Ue,initNotificationBell:Oe,openNotificationModal:ye,getNotifIcon:Se,renderAppShell:lt,bindAppShellEvents:rt,renderSkeletonCards:dt,renderEmptyState:pt,renderKpiCard:ut,renderBadge:mt,renderProgressBar:ft,renderPeriodPicker:gt,renderSupportTicketSection:wt,bindSupportTicketSection:$t,renderAccountSettingsCard:He,bindAccountSettingsCard:Ve,openAccountSettingsModal:de,getArchive:Ke,restoreArchiveItem:Ge,purgeArchiveItem:Ye,purgeAllArchive:Qe,DEFAULT_SIDEBAR_CONFIG:ge,getCachedSidebarNavConfig:ve,fetchSidebarNavConfig:ot,saveSidebarNavConfig:nt,resetSidebarNavConfig:st,filterTabsForDashboard:qe,saveUserModulePermissions:at});export{F as A,te as B,we as C,ge as D,Je as a,rt as b,J as c,ot as d,h as e,qe as f,be as g,ie as h,ze as i,pe as j,T as k,Q as l,R as m,He as n,Ve as o,oe as p,ve as q,lt as r,at as s,nt as t,st as u,We as v,j as w,re as x,Re as y,M as z};
