(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const je="/api";function q(){return localStorage.getItem("ci360_token")}function N(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function Ie(e,i){localStorage.setItem("ci360_token",e),localStorage.setItem("ci360_user",JSON.stringify(i))}function G(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function Ue(e){const i=q(),t=N();if(!i||!t)return G(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null;const n=t.role==="superadmin"||t.role==="admin",s=t.name&&t.name.toLowerCase().includes("ekta")||t.email&&t.email.toLowerCase().includes("ekta");if(e&&t.role!==e&&!n){if((t.role==="accounts"||s)&&(e==="accounts"||e==="employee"))return t;const o=n?"/admin":t.role==="accounts"||s?"/accounts":t.role==="employee"?"/employee":t.role==="client"?"/client":null;return!o||typeof window<"u"&&window.location.pathname.startsWith(o)?(G(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null):(window.location.href=o,null)}return t}async function D(e,i={}){const t=q(),n=Object.assign({"Content-Type":"application/json"},i.headers||{});t&&(n.Authorization="Bearer "+t);const s=await fetch(je+e,Object.assign({},i,{headers:n}));let o=null;try{o=await s.json()}catch{}if(s.status===401)throw e==="/auth/login"||e.includes("/auth/login")?new Error(o&&o.error||"Invalid username/email or password."):(G(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login?expired=1"),new Error(o&&o.error||"Session expired. Please sign in again."));if(!s.ok)throw new Error(o&&o.error||"Server status "+s.status+" — Backend waking up, please retry in 10s.");return i.method&&i.method!=="GET"&&!e.includes("/notifications")&&typeof window<"u"&&typeof window.ci360FetchNotifications=="function"&&setTimeout(()=>{try{window.ci360FetchNotifications()}catch{}},350),o}const O=e=>D(e,{method:"GET"}),me=(e,i)=>D(e,{method:"POST",body:JSON.stringify(i)}),J=(e,i)=>D(e,{method:"PUT",body:JSON.stringify(i)}),qe=(e,i)=>D(e,{method:"PATCH",body:JSON.stringify(i)}),F=e=>D(e,{method:"DELETE"}),Re=e=>O("/archive"+(e?`?type=${encodeURIComponent(e)}`:"")),He=(e,i)=>me(`/archive/restore/${e}/${i}`,{}),Oe=(e,i)=>F(`/archive/purge/${e}/${i}`),Fe=e=>F(`/archive/purge-all/${e}`);function de(e){return e=Number(e)||0,"₹"+e.toLocaleString("en-IN",{maximumFractionDigits:0})}function Ve(e){return(Number(e)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function v(e){return e==null?"":String(e).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function Q(e){return e?new Date(e).toISOString().slice(0,10):"—"}function _(){return localStorage.getItem("ci360_theme")||"light"}function H(e){localStorage.setItem("ci360_theme",e),document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),n&&(n.textContent=e==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const o=s.querySelector("span");o&&(o.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function Ee(){if(typeof document<"u"&&(document.body?.classList.contains("login-page")||window.location.pathname.includes("login")||document.querySelector(".login-box"))){document.documentElement.setAttribute("data-theme","dark");return}const e=_();document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),n&&(n.textContent=e==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const o=s.querySelector("span");o&&(o.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{Ee()}catch{}function E(e,i){const t=document.createElement("div");t.className="toast",t.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",t.textContent=(i?"⚠️  ":"✓  ")+e,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(10px)",setTimeout(()=>t.remove(),200)},2800)}function X(e){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${e}</div>`,i.onclick=t=>{t.target===i&&i.remove()},document.body.appendChild(i),i}function W(){G(),window.location.href="/login"}let K=null;async function fe(){if("serviceWorker"in navigator)try{K=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",K.scope),typeof Notification<"u"&&Notification.permission==="granted"&&q()&&re(K).catch(()=>{})}catch(e){console.warn("CI360 Service Worker registration notice:",e)}}try{fe()}catch{}let xe=0,Be=0;const j=new Set,$e=new Set;let Se=!1;function Te(e){try{const i=typeof N=="function"?N():null,t=i&&i._id?String(i._id):"default";return`${e}_${t}`}catch{return`${e}_default`}}function ie(){try{const e=Te("ci360_alerted_ids"),i=localStorage.getItem(e);if(i){const t=JSON.parse(i);Array.isArray(t)&&t.forEach(n=>j.add(String(n)))}}catch{}}function te(){try{const e=Te("ci360_alerted_ids"),i=Array.from(j).slice(-2e3);localStorage.setItem(e,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",e=>{e.key&&e.key.includes("ci360_alerted_ids")&&ie()});let V=null;function Je(){if(typeof window>"u")return;const e=()=>{try{const i=window.AudioContext||window.webkitAudioContext;i&&(V||(V=new i),V.state==="suspended"&&V.resume())}catch{}window.removeEventListener("touchstart",e,!0),window.removeEventListener("pointerdown",e,!0),window.removeEventListener("click",e,!0)};window.addEventListener("touchstart",e,!0),window.addEventListener("pointerdown",e,!0),window.addEventListener("click",e,!0)}Je();function ae(){try{const e=Date.now();if(e-xe<2500)return;xe=e;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=V||new i;t.state==="suspended"&&t.resume();const n=t.currentTime,s=t.createOscillator(),o=t.createGain();s.type="sine",s.frequency.setValueAtTime(587.33,n),o.gain.setValueAtTime(0,n),o.gain.linearRampToValueAtTime(.25,n+.02),o.gain.exponentialRampToValueAtTime(.001,n+.38),s.connect(o),o.connect(t.destination),s.start(n),s.stop(n+.38);const a=t.createOscillator(),l=t.createGain();a.type="sine",a.frequency.setValueAtTime(880,n+.12),l.gain.setValueAtTime(0,n+.12),l.gain.linearRampToValueAtTime(.28,n+.14),l.gain.exponentialRampToValueAtTime(.001,n+.6),a.connect(l),l.connect(t.destination),a.start(n+.12),a.stop(n+.6)}catch{}}function le(){try{const e=Date.now();if(e-Be<2500)return;Be=e,"vibrate"in navigator&&navigator.vibrate([200,100,200,100,200])}catch{}}function Me(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function Ae(){try{if(Me()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function ge(){if(!("Notification"in window))return E("Your device browser does not support Web Notifications.",!0),!1;try{const e=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return e==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),await re(),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),E("Notifications successfully enabled on this device!"),ae(),le(),await Y({title:"CI360 Alerts Active 🔔",message:"Instant notifications are now live on this device for jobs, tasks, and overdue invoices!",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),E("Notification permission was not granted.",!0),!1)}catch(e){console.error("Notification permission request error:",e)}return!1}async function Y({title:e,message:i,type:t,id:n,url:s}){const o=n?String(n):null;if(ie(),o&&j.has(o)||(o&&(j.add(o),te()),ae(),le(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return;localStorage.setItem("ci360_notif_enabled","true")}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",l={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:o?`ci360-notif-${o}`:"ci360-alert-"+Date.now(),renotify:!0,vibrate:[200,100,200,100,200],data:{url:s||(typeof window<"u"?window.location.href:""),type:t||"general"}};try{navigator.serviceWorker&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:e,options:l})}catch{}try{if("serviceWorker"in navigator){const p=K||await navigator.serviceWorker.getRegistration();if(p&&p.showNotification){await p.showNotification(e,l);return}}}catch{}try{const p=new Notification(e,l);p.onclick=()=>{window.focus(),p.close()};return}catch{}}function We(e){const i="=".repeat((4-e.length%4)%4),t=(e+i).replace(/-/g,"+").replace(/_/g,"/"),n=window.atob(t),s=new Uint8Array(n.length);for(let o=0;o<n.length;++o)s[o]=n.charCodeAt(o);return s}async function re(e=null){try{if(typeof window>"u"||!("serviceWorker"in navigator)||!("PushManager"in window)||typeof Notification>"u"||Notification.permission!=="granted"||!q())return null;const t=e||K||await navigator.serviceWorker.ready;if(!t||!t.pushManager)return null;let n=await t.pushManager.getSubscription();if(!n){const s=await O("/notifications/vapid-public-key").catch(()=>null),o=s&&s.publicKey?s.publicKey:"BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q";n=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:We(o)})}if(n){const s=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return await D("/notifications/subscribe",{method:"POST",body:JSON.stringify({subscription:n.toJSON?n.toJSON():n,deviceType:s?"mobile":"desktop"})}).catch(()=>{}),n}}catch(i){console.warn("Push subscription registration notice:",i.message)}return null}if(typeof window<"u"&&(window.triggerSystemNotification=Y,window.requestNotificationPermission=ge,window.registerPushSubscription=re,"Notification"in window)){const e=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",e,!0),window.removeEventListener("touchstart",e,!0)};window.addEventListener("click",e,!0),window.addEventListener("touchstart",e,!0)}function Ke(){if(typeof document>"u")return null;let e=document.getElementById("ci360FloatingContainer");return e||(e=document.createElement("div"),e.id="ci360FloatingContainer",e.className="ci360-floating-container",document.body.appendChild(e)),e}function ce({id:e,title:i,message:t,type:n,time:s,actionText:o,onAction:a,persistent:l=!1,timeout:p=6500}){const r=Ke();if(!r)return;const y=`ci360-pop-${e||Math.random().toString(36).slice(2,9)}`;if(document.getElementById(y))return;let d="🔔",w="info",S="View",u="";const B=(n||"").toLowerCase(),T=(t||"").toLowerCase();B.includes("invoice_overdue")?(d="🚨",w="critical",S="View Invoice",u="billing"):B.includes("invoice_paid")||B.includes("payment")?(d="💳",w="success",S="View Billing",u="billing"):B.includes("invoice")?(d="🧾",w="info",S="View Invoice",u="billing"):B.includes("job")&&(T.includes("overdue")||B.includes("overdue"))?(d="⚠️",w="critical",S="View Job",u="jobs"):B.includes("job")&&T.includes("due today")?(d="⏳",w="warning",S="View Job",u="jobs"):B.includes("job_created")||B.includes("job")||B.includes("status")?(d="📋",w="info",S="View Job",u="jobs"):B.includes("task")&&(T.includes("overdue")||B.includes("overdue"))?(d="⚠️",w="critical",S="View Planner",u="dailytasks"):B.includes("task_completed")?(d="✅",w="success",S="View Planner",u="dailytasks"):B.includes("task")?(d="📅",w="info",S="Open Planner",u="dailytasks"):B.includes("ticket")?(d="🎫",w="info",S="View Ticket",u="tickets"):B.includes("target")&&(d="🎯",w="success",S="View Targets",u="targets");const I=o||S,c=document.createElement("div");c.id=y,c.className=`ci360-popup-card ci360-priority-${w}`,c.innerHTML=`
    <div class="ci360-popup-body">
      <div class="ci360-popup-header">
        <div class="ci360-popup-header-left">
          <span class="ci360-popup-icon">${d}</span>
          <span class="ci360-popup-title">${v(i||"Notification")}</span>
        </div>
        <div class="ci360-popup-header-right">
          ${I?`<button type="button" class="ci360-popup-action-btn">${I}</button>`:""}
          <button type="button" class="ci360-popup-close-btn" aria-label="Dismiss">✕</button>
        </div>
      </div>
      ${t?`<div class="ci360-popup-message">${v(t||"")}</div>`:""}
    </div>
  `,ae(),le();const $=async()=>{if(e){try{await F(`/notifications/${e}`)}catch{}typeof window.ci360RemoveNotifFromUI=="function"&&window.ci360RemoveNotifFromUI(e)}},P=()=>{c.style.opacity="0",c.style.transform="translateY(-6px) scale(0.97)",setTimeout(()=>{try{c.remove()}catch{}},180),$()},M=c.querySelector(".ci360-popup-close-btn");M&&(M.onclick=k=>{k.stopPropagation(),P()});const g=()=>{if(typeof a=="function")a();else if(u&&typeof window.ci360NavTab=="function"){const k=typeof N=="function"?N():null;let x=u;k&&k.role==="employee"&&(x==="jobs"||x==="myjobs")&&(x="myjobs"),window.ci360NavTab(x)}$(),P()},m=c.querySelector(".ci360-popup-action-btn");for(m&&(m.onclick=k=>{k.stopPropagation(),g()}),c.style.cursor="pointer",c.onclick=k=>{k.target.closest(".ci360-popup-close-btn")||g()};r.children.length>=3;){const k=r.firstChild;k&&r.removeChild(k)}r.appendChild(c),l||setTimeout(()=>{document.body.contains(c)&&P()},p)}function Ce(e=[]){if(!e||!e.length)return;const i=sessionStorage.getItem("ci360_client_overdue_dismissed");if(i&&Date.now()-Number(i)<2700*1e3)return;const t=e.reduce((l,p)=>l+(Number(p.pendingAmount||p.totalAmount)||0),0),n=`
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
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${de(t)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${e.length} Overdue Invoice${e.length>1?"s":""}</span>
      </div>

      <div class="ci360-overdue-list">
        ${e.map(l=>{const p=l.dueDate?new Date(l.dueDate):new Date,r=Math.max(1,Math.floor((Date.now()-p.getTime())/(1e3*60*60*24)));return`
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${v(l.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${Q(l.dueDate)} <span style="color:var(--red-600);font-weight:700">(${r}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${de(l.pendingAmount||l.totalAmount||0)}</div>
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
  `,s=X(n),o=s.querySelector("#ci360OverduePayBtn"),a=s.querySelector("#ci360OverdueRemindBtn");o&&(o.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove(),typeof window.ci360NavTab=="function"&&window.ci360NavTab("billing")}),a&&(a.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove()})}function _e(){return`
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

        ${!Ae()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
    </div>`}function ve(e){return e?e.startsWith("task_completed")?"🎉":e.startsWith("task_due")?"⚡":e.startsWith("task")?"✅":e.startsWith("target_completed")?"🎉":e.startsWith("target")?"🎯":e.startsWith("job_due")?"⏳":e.startsWith("job")?"📋":e.startsWith("ticket")?"🎫":e.startsWith("status")?"🔄":e.startsWith("test")?"🧪":"🔔":"🔔"}function oe(e){if(!e)return"";const i=new Date(e),n=Math.floor((new Date-i)/1e3);if(n<60)return"Just now";const s=Math.floor(n/60);if(s<60)return`${s}m ago`;const o=Math.floor(s/60);if(o<24)return`${o}h ago`;const a=Math.floor(o/24);return a===1?"Yesterday":a<7?`${a}d ago`:Q(e)}function pe(e){if(!e)return;const i=ve(e.type),t=(e.type||"").toLowerCase(),n=e.title||"Notification",s=e.message||"",o=e.createdAt?Q(e.createdAt)+" at "+new Date(e.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"Recently",a=oe(e.createdAt),l=typeof N=="function"?N():null,p=l&&l.role==="employee";let r="Update",y="blue",h="",d="";const w=e.jobId||e.taskId||e.ticketId||e.targetId||null;t.includes("job")?(r="Job Deliverable",y="blue",d=p?"myjobs":"jobs",h=p?"Open in My Jobs 📋":"View Job 📁"):t.includes("task")?(r="Daily Planner",y="green",d="dailytasks",h="Open Daily Planner 📅"):t.includes("ticket")?(r="Support Ticket",y="brand",d="tickets",h="Open Support Tickets 🎫"):t.includes("target")?(r="Target Goal",y="gold",d="targets",h="View My Targets 🎯"):(t.includes("invoice")||t.includes("billing"))&&(r="Billing & Invoice",y="purple",d="billing",h="Open Billing 💳");const S=Array.isArray(e.attachments)&&e.attachments.length>0,u=X(`
    <div class="notif-detail-modal" style="padding:4px 0">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border-xs)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:12px;background:var(--bg-elevated);border:1px solid var(--border-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:var(--shadow-xs)">
            ${i}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap">
              <span class="badge ${y}" style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${r}</span>
              <span style="font-size:11.5px;color:var(--text-4)">${a}</span>
            </div>
            <div style="font-size:11px;color:var(--text-4)">${o}</div>
          </div>
        </div>
        <button type="button" class="btn ghost small notif-modal-close-btn" aria-label="Close" style="padding:4px 8px;font-size:16px;line-height:1;border-radius:6px;color:var(--text-3)">✕</button>
      </div>

      <h3 style="font-size:16.5px;font-weight:800;color:var(--text-1);margin:0 0 12px 0;line-height:1.35;letter-spacing:-0.3px">
        ${v(n)}
      </h3>

      <div style="background:var(--bg-elevated);border:1px solid var(--border-xs);border-radius:var(--r-md);padding:14px 16px;margin-bottom:16px;font-size:13.5px;color:var(--text-2);line-height:1.6;white-space:pre-wrap;word-break:break-word">
        ${v(s)}
      </div>

      ${S?`
        <div style="margin-bottom:16px">
          <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Attachments (${e.attachments.length})</div>
          ${ne(e.attachments,{title:"Attachments"})}
        </div>
      `:""}

      <div class="modal-actions" style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border-xs);display:flex;justify-content:flex-end;align-items:center;gap:10px;flex-wrap:wrap">
        <button type="button" class="btn secondary notif-modal-dismiss-btn" style="font-weight:600">Close</button>
        ${d?`
          <button type="button" class="btn primary notif-modal-go-btn" style="font-weight:700;display:inline-flex;align-items:center;gap:6px">
            <span>${h}</span>
          </button>
        `:""}
      </div>
    </div>
  `),B=()=>u.remove(),T=u.querySelector(".notif-modal-close-btn"),I=u.querySelector(".notif-modal-dismiss-btn"),c=u.querySelector(".notif-modal-go-btn");T&&(T.onclick=B),I&&(I.onclick=B),c&&(c.onclick=()=>{B(),typeof window.ci360NavTab=="function"&&window.ci360NavTab(d,w)})}function Ne(){const e=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),t=document.getElementById("notifBadge"),n=document.getElementById("notifList"),s=document.getElementById("clearNotifBtn"),o=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),l=document.getElementById("notifDismissBannerBtn"),p=document.getElementById("notifPermissionBanner"),r=document.getElementById("notifUnreadBadge");if(!e||!i)return;fe();function y(){const g=document.getElementById("notifPermissionBanner");g&&(g.classList.add("hidden"),g.style.setProperty("display","none","important"),g.remove())}function h(){if(Ae()){y();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?y():Notification.permission==="default"&&p&&p.style.setProperty("display","flex","important"))}h(),l&&(l.onclick=g=>{g.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),y()}),a&&(a.onclick=async g=>{g.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),y(),await ge(),y()}),Me()&&re(),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),ie();let d=[],w="all";function S(){if(!n)return;let g=d;if(w==="task"?g=d.filter(m=>(m.type||"").includes("task")):w==="target"?g=d.filter(m=>(m.type||"").includes("target")):w==="job"?g=d.filter(m=>(m.type||"").includes("job")):w==="ticket"&&(g=d.filter(m=>(m.type||"").includes("ticket"))),g.length===0){n.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${w==="all"?"":w+" "}notifications</div>`;return}n.innerHTML=g.map(m=>{const k=ve(m.type);return`
        <div class="notif-item ${m.read?"":"unread"}" data-id="${m._id}" data-type="${v(m.type||"")}">
          <div class="notif-icon">${k}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${v(m.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${oe(m.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${v(m.message)}</div>
          </div>
          <div style="color:var(--text-4);font-size:16px;line-height:1;margin-top:2px;flex-shrink:0">›</div>
        </div>`}).join(""),n.querySelectorAll(".notif-item").forEach(m=>{m.onclick=async()=>{const k=m.dataset.id,x=d.find(f=>String(f._id)===String(k));if(k&&m.classList.contains("unread")){m.classList.remove("unread");try{await D(`/notifications/${k}/read`,{method:"PATCH"})}catch{}const f=d.filter(C=>!C.read&&String(C._id)!==String(k)).length;t&&(t.style.display=f>0?"flex":"none",t.textContent=f>99?"99+":f),r&&(r.textContent=f>0?`${f} new`:"",r.style.display=f>0?"inline-block":"none")}if($(),x)pe(x);else{const f=m.dataset.type,C=typeof N=="function"?N():null,U=C&&C.role==="employee";f&&f.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):f&&f.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab(U?"myjobs":"jobs"):f&&f.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):f&&f.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}}})}let u={jobs:0,tasks:0,invoices:0,tickets:0},B=!1;async function T(g=!1){try{const m=await O("/notifications");d=m.notifications||[];const k=m.unreadCount||0;if(t&&(t.textContent=k>99?"99+":k,t.style.display=k>0?"flex":"none"),r&&(r.textContent=k>0?`${k} new`:"",r.style.display=k>0?"inline-block":"none"),ie(),m.overdue&&m.overdue.invoices&&m.overdue.invoices.length>0){const x=typeof N=="function"?N():null;x&&x.role==="client"&&Ce(m.overdue.invoices)}if(m.syncTimestamps){const x=m.syncTimestamps;if(!B)u={...x},B=!0;else{const f=[];x.jobs>(u.jobs||0)&&f.push("jobs"),x.tasks>(u.tasks||0)&&f.push("tasks"),x.invoices>(u.invoices||0)&&f.push("invoices"),x.tickets>(u.tickets||0)&&f.push("tickets"),f.length>0&&(u={...x},window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{changedKeys:f,syncTimestamps:x,overdue:m.overdue}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({changedKeys:f,syncTimestamps:x}))}}if(Se){const x=d.filter(f=>!f.read&&!j.has(String(f._id)));if(x.length>0){for(const f of x){const C=String(f._id);$e.add(C),ce({id:C,title:f.title||"CI360 Alert",message:f.message||"",type:f.type}),await Y({title:f.title||"CI360 Alert",message:f.message||"",type:f.type,id:C})}te(),window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{newNotifications:x}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({newNotifications:x})}}else{const x=d.filter(f=>!f.read&&!j.has(String(f._id)));if(d.forEach(f=>$e.add(String(f._id))),x.length>0){const f=x.slice(0,3);for(const C of f){const U=String(C._id);ce({id:U,title:C.title||"CI360 Alert",message:C.message||"",type:C.type}),await Y({title:C.title||"CI360 Alert",message:C.message||"",type:C.type,id:U})}x.forEach(C=>j.add(String(C._id))),te()}else d.forEach(f=>j.add(String(f._id))),te();Se=!0}S()}catch{n&&d.length===0&&(n.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=T,window.showInAppPopupAlert=ce,window.showClientOverdueInvoiceModal=Ce,window.ci360RemoveNotifFromUI=g=>{if(!g)return;const m=String(g);d=d.filter(x=>String(x._id)!==m);const k=d.filter(x=>!x.read).length;t&&(t.textContent=k>99?"99+":k,t.style.display=k>0?"inline-flex":"none"),r&&(r.textContent=k>0?`${k} unread`:"",r.style.display=k>0?"inline":"none"),S()}),T(),window.__ci360PollInterval=setInterval(T,6e3),window.addEventListener("focus",()=>T(!0)),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(g=>{g.onclick=m=>{m.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(k=>k.classList.remove("active")),g.classList.add("active"),w=g.dataset.filter,S()}});const I=document.getElementById("notifBackdrop");function c(){i.style.display="flex",i.classList.add("open"),I&&(I.style.display="block",I.classList.add("open")),e.setAttribute("aria-expanded","true"),h();const g=document.getElementById("topbarUserDropdown");g&&(g.style.display="none"),T()}function $(){i.style.display="none",i.classList.remove("open"),I&&(I.style.display="none",I.classList.remove("open")),e.setAttribute("aria-expanded","false")}function P(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?$():c()}window.ci360CloseNotifications=$;const M=document.getElementById("notifCloseBtn");M&&(M.onclick=g=>{g.stopPropagation(),$()}),I&&(I.onclick=g=>{g.stopPropagation(),$()}),e.onclick=g=>{g.stopPropagation(),P()},o&&(o.onclick=async g=>{g.stopPropagation();try{await D("/notifications/read",{method:"PATCH"}),t.style.display="none",r&&(r.textContent="",r.style.display="none"),d.forEach(m=>m.read=!0),S(),E("All notifications marked as read")}catch(m){E(m.message,!0)}}),window.__ci360NotifDocClickHandler&&document.removeEventListener("click",window.__ci360NotifDocClickHandler),window.__ci360NotifDocClickHandler=g=>{!i.contains(g.target)&&!e.contains(g.target)&&$()},document.addEventListener("click",window.__ci360NotifDocClickHandler),s&&(s.onclick=async g=>{g.stopPropagation();try{await F("/notifications"),d=[],n.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',t.style.display="none",r&&(r.textContent="",r.style.display="none"),E("Notifications cleared")}catch(m){E(m.message,!0)}});try{const m=new URLSearchParams(window.location.search).get("notifId");m&&O("/notifications").then(k=>{const f=(k.notifications||[]).find(C=>String(C._id)===String(m));if(f){pe(f);const C=window.location.pathname+window.location.hash;window.history.replaceState(null,"",C)}}).catch(()=>{})}catch{}}function Ge({user:e,currentRole:i,activeTab:t,tabs:n,title:s,subtitle:o}){const a=e&&e.name?e.name.charAt(0).toUpperCase():"U",l=e&&(e.role==="superadmin"||e.role==="admin")?"Admin":e&&e.role==="accounts"?"Accounts":e&&e.role==="employee"?"Employee":e&&e.role==="client"?"Client":e&&e.role?e.role.toUpperCase():"User",p=e&&e.name?e.name:"User",r=e&&e.email?e.email:e&&e.username?e.username:"",y=n&&n.some(u=>u.key==="logjob"),h=n&&n.find(u=>u.key===t),d=s||h&&h.label||"Dashboard";let w=[];return i==="accounts"?w=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:t==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:t==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(t),isMore:!0}]:i==="superadmin"||i==="admin"?w=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="dashboard"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(t),isMore:!0}]:i==="employee"?w=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:t==="myjobs"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"proposals",label:"Proposals",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',active:t==="proposals"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:t==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","proposals","targets"].includes(t),isMore:!0}]:w=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:t==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(t),isMore:!0}],`
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
          ${n.map(u=>`
            <button type="button" class="sidebar-item ${t===u.key?"active":""}" data-tab="${u.key}" aria-current="${t===u.key?"page":"false"}">
              <span class="icon">${u.icon||"📌"}</span>
              <span>${u.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${v(e?e.name:"User")}</div>
            <div class="role">${v(l)}</div>
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
              <h1 class="page-heading-title">${v(d)}</h1>
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
              <button class="theme-btn ${_()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${_()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${_e()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${a}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${v(p)}</span>
                  <span class="topbar-user-role-badge">${v(l)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${a}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${v(p)}</div>
                      ${r?`<div class="tud-email">${v(r)}</div>`:""}
                      <span class="tud-role-chip">${v(l)}</span>
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
          ${w.map(u=>`
            <button type="button" class="mbn-item ${u.active?"active":""}" data-tab="${u.key}" ${u.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${u.iconSvg}</span>
              <span class="mbn-label">${v(u.label)}</span>
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
                <button type="button" class="mms-card ${t===u.key?"active":""}" data-tab="${u.key}">
                  <span class="mms-card-icon">${u.icon||"📌"}</span>
                  <span class="mms-card-label">${v(u.label)}</span>
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
    </div>`}function Ye(e){const i=document.getElementById("mobileNavToggle"),t=document.getElementById("appSidebar"),n=document.getElementById("sidebarOverlay");function s(){t&&t.classList.add("open"),n&&n.classList.add("open")}function o(){t&&t.classList.remove("open"),n&&n.classList.remove("open")}i&&(i.onclick=s),n&&(n.onclick=o);const a=document.querySelector(".app-shell");function l(){if(!a)return;a.classList.toggle("sidebar-collapsed");const b=a.classList.contains("sidebar-collapsed");try{localStorage.setItem("ci360_sidebar_collapsed",b?"true":"false")}catch{}}const p=document.getElementById("sidebarCollapseBtn");p&&(p.onclick=l);const r=document.getElementById("desktopSidebarToggle");r&&(r.onclick=l),window.__ci360SidebarKeyBound||(window.__ci360SidebarKeyBound=!0,window.addEventListener("keydown",b=>{if((b.ctrlKey||b.metaKey)&&(b.key==="b"||b.key==="B")){const A=document.activeElement?document.activeElement.tagName.toLowerCase():"";if(A==="input"||A==="textarea"||document.activeElement&&document.activeElement.isContentEditable)return;b.preventDefault(),l()}}));const y=document.getElementById("mobileMoreBackdrop"),h=document.getElementById("mobileMoreSheet"),d=document.getElementById("mmsCloseBtn"),w=document.getElementById("mobileMoreBtn");function S(){y&&y.classList.add("active"),h&&h.classList.add("active")}function u(){y&&y.classList.remove("active"),h&&h.classList.remove("active")}w&&(w.onclick=b=>{b.stopPropagation(),S()}),d&&(d.onclick=u),y&&(y.onclick=b=>{b.target===y&&u()}),document.querySelectorAll(".mbn-item").forEach(b=>{b.dataset.tab&&b.dataset.tab!=="__more__"&&(b.onclick=()=>{u(),e&&e(b.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(b=>{b.onclick=()=>{u(),e&&e(b.dataset.tab)}});const B=document.getElementById("mmsToggleThemeBtn");B&&(B.onclick=()=>{H(_()==="dark"?"light":"dark")});const T=document.getElementById("mmsNotifsBtn");T&&(T.onclick=()=>{u();const b=document.getElementById("notifBellBtn");b&&b.click()});const I=document.getElementById("mmsLogoutBtn");I&&(I.onclick=W);const c=document.getElementById("mobileCalBtn");c&&(c.onclick=()=>{const b=document.querySelector(".period-row");b&&(b.scrollIntoView({behavior:"smooth",block:"center"}),b.classList.add("pulse-highlight"),setTimeout(()=>b.classList.remove("pulse-highlight"),1200))});const $=document.getElementById("tudMobileThemeBtn");$&&($.onclick=b=>{b.stopPropagation(),H(_()==="dark"?"light":"dark")});const P=document.getElementById("tudMobileNotifsBtn");P&&(P.onclick=b=>{b.stopPropagation();const A=document.getElementById("topbarUserDropdown");A&&(A.style.display="none");const z=document.getElementById("notifBellBtn");z&&z.click()});const M=document.getElementById("tudMobileSettingsBtn");M&&(M.onclick=b=>{b.stopPropagation();const A=document.getElementById("topbarUserDropdown");A&&(A.style.display="none");const z=document.querySelector('[data-tab="settings"], [data-tab="manage"]');z&&e?e(z.dataset.tab):se()});const g=document.getElementById("tudProfileSettingsBtn");g&&(g.onclick=b=>{b.stopPropagation();const A=document.getElementById("topbarUserDropdown");A&&(A.style.display="none");const z=document.querySelector('[data-tab="settings"], [data-tab="manage"]');z&&e?e(z.dataset.tab):se()});const m=document.getElementById("tudMobileHelpBtn");m&&(m.onclick=b=>{b.stopPropagation();const A=document.getElementById("topbarUserDropdown");A&&(A.style.display="none"),X(`
        <div style="padding:24px;text-align:center;">
          <div style="font-size:36px;margin-bottom:12px;">💬</div>
          <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
          <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
            For immediate technical assistance, client onboarding, or workspace inquiries, reach out to your system administrator or support team.
          </p>
          <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
        </div>
      `)});const k=document.getElementById("logoutBtnMobile");k&&(k.onclick=W);const x=document.getElementById("topbarUserBtn"),f=document.getElementById("topbarUserDropdown");x&&f&&(x.onclick=b=>{b.stopPropagation();const A=f.style.display!=="none";f.style.display=A?"none":"block",x.setAttribute("aria-expanded",String(!A)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",b=>{!f.contains(b.target)&&!x.contains(b.target)&&(f.style.display="none",x.setAttribute("aria-expanded","false"))}));const C=document.getElementById("tudThemeToggleBtn");C&&(C.onclick=()=>{H(_()==="dark"?"light":"dark")});const U=document.getElementById("topbarQuickLogJobBtn");U&&(U.onclick=()=>{e&&e("logjob")});const ke=document.getElementById("logoutBtn");ke&&(ke.onclick=W),Ne(),document.querySelectorAll(".sidebar-item").forEach(b=>{b.onclick=()=>{o(),e&&e(b.dataset.tab)}}),Qe(e)}function Qe(e){const i=document.getElementById("cmdPaletteBackdrop"),t=document.getElementById("cmdSearchInput"),n=document.getElementById("cmdResultsList"),s=document.getElementById("topbarCmdTrigger"),o=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),l=document.getElementById("cmdCloseKbd");if(!i||!t||!n)return;const p=Array.from(document.querySelectorAll(".sidebar-item")),r=p.map(c=>({type:"tab",id:c.dataset.tab,label:c.querySelector("span:last-child")?.textContent||c.dataset.tab,icon:c.querySelector(".icon")?.textContent||"📌",sub:"Navigate to section",action:()=>{e&&e(c.dataset.tab)}}));p.some(c=>c.dataset.tab==="logjob")&&r.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{e&&e("logjob")}}),r.push({type:"action",id:"toggle-theme",label:_()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{H(_()==="dark"?"light":"dark")}}),r.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const c=document.getElementById("notifBellBtn");c&&c.click()}}),r.push({type:"action",id:"account-settings",label:"Account Settings & Credentials",icon:"⚙️",sub:"Update username, email, and password",action:()=>{se()}}),r.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>W()});let h=0,d=[...r];function w(){if(!d.length){n.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}n.innerHTML=d.map((c,$)=>`
      <div class="cmd-result ${$===h?"selected":""}" data-idx="${$}">
        <div class="cmd-result-icon">${c.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${v(c.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${v(c.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),n.querySelectorAll(".cmd-result").forEach(c=>{c.onmouseenter=()=>{h=Number(c.dataset.idx),S()},c.onclick=()=>{u(Number(c.dataset.idx))}})}function S(){n.querySelectorAll(".cmd-result").forEach((c,$)=>{c.classList.toggle("selected",$===h)})}function u(c){const $=d[c];$&&$.action&&(T(),$.action())}function B(){const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),i.classList.add("open"),t.value="",d=[...r],h=0,w(),setTimeout(()=>t.focus(),50)}function T(){i.classList.remove("open"),t.blur()}s&&(s.onclick=B),o&&(o.onclick=B),a&&(a.onclick=()=>{const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),B()}),l&&(l.onclick=T),i.onclick=c=>{c.target===i&&T()},t.oninput=()=>{const c=t.value.trim().toLowerCase();c?d=r.filter($=>$.label.toLowerCase().includes(c)||$.sub.toLowerCase().includes(c)):d=[...r],h=0,w()},t.onkeydown=c=>{if(c.key==="ArrowDown"){if(c.preventDefault(),d.length>0){h=(h+1)%d.length,S();const $=n.querySelector(".cmd-result.selected");$&&$.scrollIntoView({block:"nearest"})}}else if(c.key==="ArrowUp"){if(c.preventDefault(),d.length>0){h=(h-1+d.length)%d.length,S();const $=n.querySelector(".cmd-result.selected");$&&$.scrollIntoView({block:"nearest"})}}else c.key==="Enter"?(c.preventDefault(),u(h)):c.key==="Escape"&&(c.preventDefault(),T())};const I=c=>{(c.metaKey||c.ctrlKey)&&c.key.toLowerCase()==="k"?(c.preventDefault(),i.classList.contains("open")?T():B()):c.key==="Escape"&&i.classList.contains("open")&&T()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=I,window.addEventListener("keydown",I)}function Xe(e=4){return`
    <div class="grid grid-${Math.min(e,4)}" style="margin-bottom:24px">
      ${Array(e).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function Ze(e,i,t="📁",n=""){return`
    <div class="empty">
      <span class="empty-icon">${t}</span>
      <h3>${v(e)}</h3>
      <p>${v(i)}</p>
      ${n}
    </div>`}function et(e,i,t="",n="📊",s=""){let o="";return s&&(o=`<span class="kpi-trend ${s.startsWith("+")||s.includes("↑")||s.toLowerCase().includes("up")?"up":"down"}">${v(s)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${v(e)}</span>
        <div class="kpi-icon">${n}</div>
      </div>
      <div class="kpi-value">${v(i)}</div>
      <div class="kpi-sub">${o}<span>${v(t)}</span></div>
    </div>`}function tt(e,i="gray"){return`<span class="badge ${i}">${v(e)}</span>`}function it(e,i="indigo"){const t=Math.min(100,Math.max(0,Number(e)||0));return`
    <div class="progress-bar-wrap" title="${t.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${t}%"></div>
    </div>`}function ot(e){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([t,n])=>`<button class="pchip ${e===t?"active":""}" data-period="${t}">${n}</button>`).join("")}</div>`}function nt(e){if(!e)return"U";const i=e.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function Z(e){if(e=Number(e)||0,e===0)return"0 B";const i=1024,t=["B","KB","MB","GB","TB"],n=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,n)).toFixed(1))+" "+(t[n]||"GB")}const st=Z;function ee(e="",i=""){const t=(e.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(t)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:t==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(t)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(t)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(t)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(t)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(t)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function at(e){return e?ee(e.name||e.filename||"",e.type||"").cls==="img":!1}function ye(e){if(!e||!e.url)return;const i=ee(e.name,e.type),t=i.cls==="img",n=i.cls==="pdf",s=v(e.name||"Attachment"),o=Z(e.size),a=document.createElement("div");a.className="preview-modal-overlay",a.innerHTML=`
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
        `:i.cls==="video"?`
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;width:100%;max-width:880px;">
            <video controls autoplay preload="metadata" style="max-height:70vh;width:100%;border-radius:8px;background:#000;box-shadow:0 8px 24px rgba(0,0,0,0.5);">
              <source src="${e.url}" type="${e.type||"video/mp4"}">
              Your browser does not support HTML5 video streaming.
            </video>
            <div style="margin-top:10px;font-size:12px;color:var(--text-3);display:flex;align-items:center;gap:12px;">
              <span>🎬 ${s}</span>
              <span>•</span>
              <span>${o}</span>
            </div>
          </div>
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
      ${i.title?`<div class="attachment-chips-header">📎 ${v(i.title)} <span style="font-weight:500;color:var(--text-4)">(${e.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${e.map((n,s)=>{const o=n.type==="url"||/^https?:\/\//i.test(n.url||""),a=o?{cls:"file-type-doc",icon:"🌐"}:ee(n.name,n.type),l=v(n.name||(o?"Live Deliverable URL":"File")),p=o?"Live Link":Z(n.size);return`
            <div class="attachment-chip" data-idx="${s}" title="${l} (${p})">
              <span class="file-type-icon ${a.cls}" style="width:22px;height:22px;font-size:12px">${a.icon}</span>
              ${o?`
                <a href="${n.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-name" style="text-decoration:none;color:inherit;cursor:pointer" title="Open live URL in new tab">
                  ${l} <span style="font-size:11px;opacity:0.75">↗</span>
                </a>
              `:`
                <span class="attachment-chip-name" onclick="window.__openPreview(${s}, this)">${l}</span>
              `}
              <span class="attachment-chip-size">${p}</span>
              <div class="attachment-chip-actions">
                ${o?`
                  <a href="${n.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-btn" title="Open Live Link" onclick="event.stopPropagation()">🔗</a>
                `:`
                  <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${s}, this)">👁️</button>
                  <a href="${n.url}" download="${l}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                `}
                ${t?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${s}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const L={};function Le(e,i){return new Promise((t,n)=>{const s=new XMLHttpRequest,o=typeof q=="function"?q():localStorage.getItem("ci360_token")||"",a=encodeURIComponent(e.name||"upload.mp4"),l=e.type||(e.name&&e.name.match(/\.(mp4|mov|webm)$/i)?"video/mp4":"application/octet-stream"),p=`/api/upload/stream?name=${a}&type=${encodeURIComponent(l)}`;s.open("POST",p,!0),o&&s.setRequestHeader("Authorization","Bearer "+o),s.setRequestHeader("Content-Type","application/octet-stream"),s.setRequestHeader("X-File-Name",a),s.setRequestHeader("X-File-Type",l),s.upload&&typeof i=="function"&&(s.upload.onprogress=r=>{if(r.lengthComputable){const y=Math.round(r.loaded/r.total*100);i(y,r.loaded,r.total)}}),s.onload=()=>{if(s.status>=200&&s.status<300)try{const r=JSON.parse(s.responseText);t(r.file||r.files&&r.files[0])}catch{n(new Error("Failed to parse upload response"))}else try{const r=JSON.parse(s.responseText);n(new Error(r.error||`Upload failed with HTTP ${s.status}`))}catch{n(new Error(`Upload failed with HTTP ${s.status}`))}},s.onerror=()=>n(new Error("Network error during file upload")),s.ontimeout=()=>n(new Error("Upload timed out")),s.timeout=18e5,s.send(e)})}async function ue(e,i){const t=Array.from(e||[]);if(!t.length)return[];const n=[];for(let s=0;s<t.length;s++){const o=t[s];try{const a=await Le(o,(l,p,r)=>{typeof i=="function"&&i(l,p,r,o,s,t.length)});a&&n.push(a)}catch(a){if(console.warn("Direct stream upload failed, attempting fallback for",o.name,a),o.size<15*1024*1024){const l=await new Promise(p=>{const r=new FileReader;r.onload=()=>p({name:o.name,url:r.result,size:o.size,type:o.type||"application/octet-stream",uploadedAt:new Date}),r.onerror=()=>p(null),r.readAsDataURL(o)});l&&n.push(l)}else throw a}}return n}function he({id:e="uploader",label:i="Attachments & Files",subtitle:t="Upload briefs, proofs, PDFs, MP4 videos (up to 1GB), spreadsheets, or design assets",multiple:n=!0,accept:s="*/*,video/mp4,video/*,.mp4,.mov,.webm,.avi",maxFiles:o=10}={}){return`
    <div class="uploader-container" id="container-${e}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${v(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${e}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${e}">
        <input type="file" id="input-${e}" ${n?"multiple":""} accept="${s}" style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${v(t)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${e}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${e}"></div>
    </div>
  `}function be(e,i={}){const t=document.getElementById("zone-"+e),n=document.getElementById("input-"+e),s=document.getElementById("list-"+e),o=document.getElementById("count-"+e);L[e]=i.existing?[...i.existing]:[];function a(){const l=L[e]||[];if(o&&(o.textContent=`${l.length} file${l.length===1?"":"s"} attached`),!!s){if(!l.length){s.innerHTML="";return}s.innerHTML=l.map((p,r)=>{const y=ee(p.name,p.type),h=v(p.name||"File"),d=Z(p.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${y.cls}">${y.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${h}">${h}</div>
              <div class="uploader-file-size">${y.label} · ${d}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${e}', ${r})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${e}', ${r})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(l)}}window.__removeUploaderFile=(l,p)=>{if(L[l]){L[l].splice(p,1);const r=window[`__update_${l}`];r&&r()}},window.__previewUploaderFile=(l,p)=>{const r=(L[l]||[])[p];r&&ye(r)},window[`__update_${e}`]=a,t&&n&&(t.onclick=l=>{l.target.tagName!=="BUTTON"&&!l.target.closest("button")&&n.click()},t.ondragover=l=>{l.preventDefault(),t.classList.add("dragover")},t.ondragleave=()=>t.classList.remove("dragover"),t.ondrop=async l=>{if(l.preventDefault(),t.classList.remove("dragover"),l.dataTransfer&&l.dataTransfer.files&&l.dataTransfer.files.length){E("Uploading files… ⏳");const p=await ue(l.dataTransfer.files);L[e]=[...L[e]||[],...p],a(),E("Files attached! ✓")}},n.onchange=async()=>{if(n.files&&n.files.length){E("Uploading files… ⏳");const l=await ue(n.files);L[e]=[...L[e]||[],...l],a(),E("Files attached! ✓"),n.value=""}}),a()}function we(e){return L[e]||[]}function Pe(e,i=[]){L[e]=[...i];const t=window[`__update_${e}`];t&&t()}window.__openPreview=(e,i)=>{const t=i.closest(".attachment-chips-wrap");if(!t)return;const n=i.closest(".attachment-chip");if(!n)return;const s=Number(n.dataset.idx),o=t.dataset.attachments;if(o)try{const a=JSON.parse(decodeURIComponent(o));a[s]&&ye(a[s])}catch{}};function lt(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");return`
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
        ${he({id:"tkup-"+t,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const rt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},ct={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function dt(e,i){const t=(e.status||"Open").toLowerCase().replace(" ","-"),n=e.status==="Open",s=(e._id||"").slice(-4).toUpperCase(),o=nt(e.userName),a=encodeURIComponent(JSON.stringify(e.attachments||[])),l=encodeURIComponent(JSON.stringify(e.adminAttachments||[]));return`
    <div class="ticket-card status-${t}" id="tkcard-${e._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${s}</span>
            <span class="ticket-subject">${v(e.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${rt[e.status]||"gray"}">
            ${n?'<span class="pulse-dot"></span>':""} ${v(e.status)}
          </span>
          <span class="badge ${ct[e.priority]||"gray"}">${v(e.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${o}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${v(e.userName)}
            <span class="ticket-role-pill">${v(e.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${oe(e.createdAt)} · ${Q(e.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${v(e.message)}</div>

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
              ${e.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${oe(e.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${v(e.adminReply)}</div>
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
            <textarea id="tkreplytxt-${e._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${v(e.adminReply||"")}</textarea>
            ${he({id:"tkreplyup-"+e._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${e._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${e._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function R(e,i,t){const n=document.getElementById("tklist-"+i),s=document.getElementById("tkcnt-"+i);if(n)try{const o=await O("/tickets/job/"+e);s&&(s.textContent=o.length),o.length?(n.innerHTML=o.map(a=>dt(a,t)).join(""),pt(e,i,t,n,o)):n.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{n.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function pt(e,i,t,n,s){t&&(n.querySelectorAll(".tk-status-sel").forEach(o=>{o.onchange=async()=>{try{await J("/tickets/"+o.dataset.tkid,{status:o.value}),E("Status updated"),R(e,i,t)}catch(a){E(a.message,!0)}}}),n.querySelectorAll(".tk-quick-resolve-btn").forEach(o=>{o.onclick=async()=>{try{await J("/tickets/"+o.dataset.tkid,{status:"Resolved"}),E("Ticket marked as Resolved! 🎉"),R(e,i,t)}catch(a){E(a.message,!0)}}}),n.querySelectorAll(".ticket-template-btn").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplytxt-"+o.dataset.tkid);a&&(a.value=o.dataset.tpl,a.focus())}}),n.querySelectorAll(".tk-reply-toggle").forEach(o=>{o.onclick=()=>{const a=o.dataset.tkid,l=document.getElementById("tkreplyform-"+a);if(l){l.classList.toggle("show");const p=s.find(r=>r._id===a);be("tkreplyup-"+a,{existing:p?p.adminAttachments:[]})}}}),n.querySelectorAll(".tk-reply-cancel").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplyform-"+o.dataset.tkid);a&&a.classList.remove("show")}}),n.querySelectorAll(".tk-reply-save").forEach(o=>{o.onclick=async()=>{const a=o.dataset.tkid,l=document.getElementById("tkreplytxt-"+a);if(!l)return;const p=we("tkreplyup-"+a);try{await J("/tickets/"+a,{adminReply:l.value.trim(),adminAttachments:p}),E("Response saved! 🛡️"),R(e,i,t)}catch(r){E(r.message,!0)}}}),n.querySelectorAll(".tk-del-btn").forEach(o=>{o.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await F("/tickets/"+o.dataset.tkid),E("Ticket deleted"),R(e,i,t)}catch(a){E(a.message,!0)}}}))}function ut(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");R(e,t,i),be("tkup-"+t);const n=document.querySelector(`[data-jobid="${e}"].ticket-toggle-btn`);n&&(n.onclick=()=>{const a=document.getElementById("tkform-"+t);if(!a)return;const l=a.style.display==="block";a.style.display=l?"none":"block",n.textContent=l?"+ Raise Ticket":"✕ Cancel"});const s=document.querySelector(`.tk-cancel-btn[data-safeid="${t}"]`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+t);a&&(a.style.display="none"),n&&(n.textContent="+ Raise Ticket")});const o=document.querySelector(`.tk-submit-btn[data-safeid="${t}"]`);o&&(o.onclick=async()=>{const a=(document.getElementById("tksub-"+t)||{}).value?.trim(),l=(document.getElementById("tkmsg-"+t)||{}).value?.trim(),p=(document.getElementById("tkpri-"+t)||{}).value,r=we("tkup-"+t);if(!a){E("Please enter a subject",!0);return}if(!l){E("Please enter a message",!0);return}o.disabled=!0,o.textContent="Submitting…";try{await me("/tickets",{jobId:e,subject:a,message:l,priority:p,attachments:r}),E("Ticket submitted! 🎫");const y=document.getElementById("tkform-"+t);y&&(y.style.display="none"),n&&(n.textContent="+ Raise Ticket");const h=document.getElementById("tksub-"+t),d=document.getElementById("tkmsg-"+t);h&&(h.value=""),d&&(d.value=""),Pe("tkup-"+t,[]),R(e,t,i)}catch(y){E(y.message,!0)}finally{o.disabled=!1,o.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function mt(){return""}function ft(){}function De(e={}){const{title:i="Account Settings & Credentials",subtitle:t="Update your personal name, login email, and security password",showCardWrapper:n=!0,formId:s="accSettingsForm"}=e,o=N()||{},a=o.name?o.name.charAt(0).toUpperCase():"U",l=(o.role||"user").toUpperCase();return`
    <div class="${n?"card":""}" style="max-width:760px;margin:0 auto;width:100%;" id="${s}-wrap">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--gold-500,#d4af37),#b8860b);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:20px;box-shadow:0 4px 12px rgba(212,175,55,0.25);flex-shrink:0;">
          ${v(a)}
        </div>
        <div style="min-width:0;flex:1;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <h3 style="font-size:18px;font-weight:700;color:var(--text-1);margin:0;">${v(i)}</h3>
            <span class="badge gold" style="font-size:11px;padding:2px 8px;">${v(l)}</span>
          </div>
          <div style="font-size:13px;color:var(--text-3);margin-top:2px;">${v(t)}</div>
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
              <input type="text" id="${s}-name" class="input" value="${v(o.name||"")}" placeholder="Your display name" required autocomplete="name">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${s}-email" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Email Address *</label>
              <input type="email" id="${s}-email" class="input" value="${v(o.email||"")}" placeholder="name@company.com" required autocomplete="email">
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
  `}function ze(e,i={}){const{formId:t="accSettingsForm",onSaved:n=null,modalBg:s=null}=i,o=e||document;o.querySelectorAll(".pass-toggle-btn").forEach(y=>{y.onclick=()=>{const h=y.dataset.target,d=o.querySelector("#"+h)||document.getElementById(h);if(d){const w=d.type==="password";d.type=w?"text":"password",y.textContent=w?"🙈":"👁️",y.style.opacity=w?"1":"0.65"}}});const a=o.querySelector("#"+t+"-saveBtn")||document.getElementById(t+"-saveBtn"),l=o.querySelector("#"+t+"-alert")||document.getElementById(t+"-alert");function p(y,h=!0){l&&(l.style.display="block",l.style.background=h?"rgba(239,68,68,0.12)":"rgba(34,197,94,0.12)",l.style.border=h?"1px solid rgba(239,68,68,0.3)":"1px solid rgba(34,197,94,0.3)",l.style.color=h?"#ef4444":"#22c55e",l.innerHTML=(h?"⚠️ ":"✓ ")+v(y))}function r(){l&&(l.style.display="none")}a&&(a.onclick=async()=>{r();const y=o.querySelector("#"+t+"-name")||document.getElementById(t+"-name"),h=o.querySelector("#"+t+"-email")||document.getElementById(t+"-email"),d=o.querySelector("#"+t+"-currentPass")||document.getElementById(t+"-currentPass"),w=o.querySelector("#"+t+"-newPass")||document.getElementById(t+"-newPass"),S=o.querySelector("#"+t+"-confirmPass")||document.getElementById(t+"-confirmPass"),u=(y?.value||"").trim(),B=(h?.value||"").trim(),T=d?.value||"",I=w?.value||"",c=S?.value||"";if(!u){p("Please enter your full name or username.",!0),y?.focus();return}if(!B||!B.includes("@")){p("Please enter a valid email address.",!0),h?.focus();return}if(I||c){if(!T){p("Please enter your current password to set a new password.",!0),d?.focus();return}if(I.length<6){p("New password must be at least 6 characters long.",!0),w?.focus();return}if(I!==c){p("New passwords do not match. Please re-check.",!0),S?.focus();return}}const $={name:u,email:B};I&&($.currentPassword=T,$.newPassword=I);const P=a.innerHTML;a.disabled=!0,a.innerHTML="<span>Saving Changes…</span>";try{const M=await J("/auth/profile",$);M&&M.token&&M.user&&Ie(M.token,M.user),document.querySelectorAll(".topbar-user-name, .sidebar-user .name, .tud-name").forEach(m=>{m.textContent=M.user.name}),document.querySelectorAll(".tud-email").forEach(m=>{m.textContent=M.user.email});const g=M.user.name?M.user.name.charAt(0).toUpperCase():"U";document.querySelectorAll(".topbar-user-avatar span, .user-avatar, .tud-avatar").forEach(m=>{m.classList.contains("topbar-online-dot")||(m.textContent=g)}),d&&(d.value=""),w&&(w.value=""),S&&(S.value=""),p("Account credentials updated successfully!",!1),E("Account settings saved! ✓"),typeof n=="function"&&n(M.user),s&&setTimeout(()=>{try{s.remove()}catch{}},900)}catch(M){p(M.message||"Failed to update credentials. Please try again.",!0),E(M.message||"Update failed",!0)}finally{a.disabled=!1,a.innerHTML=P}})}function se(){const e=`
    <div style="position:relative;padding:12px 6px;">
      <button type="button" id="closeAccSettingsModalBtn" style="position:absolute;top:-4px;right:0;border:none;background:transparent;color:var(--text-3);font-size:20px;cursor:pointer;padding:6px 10px;" aria-label="Close modal">✕</button>
      ${De({title:"Account Settings",subtitle:"Manage your personal email, username, and password",showCardWrapper:!1,formId:"modalAccSettingsForm"})}
    </div>
  `,i=X(e),t=i.querySelector("#closeAccSettingsModalBtn");return t&&(t.onclick=()=>i.remove()),ze(i,{formId:"modalAccSettingsForm",modalBg:i}),i}window.__setTheme=function(e){H(e)};Object.assign(window,{getToken:q,getUser:N,setSession:Ie,clearSession:G,requireAuth:Ue,initTheme:Ee,api:D,apiGet:O,apiPost:me,apiPut:J,apiPatch:qe,apiDelete:F,fmtINR:de,fmtHours:Ve,escapeHtml:v,fmtDate:Q,flashToast:E,openModal:X,logout:W,getTheme:_,setTheme:H,initServiceWorker:fe,playNotificationChime:ae,triggerPhoneVibration:le,requestNotificationPermission:ge,triggerSystemNotification:Y,fmtFileSize:Z,formatFileSize:st,uploadSingleFileDirectly:Le,getFileCategory:ee,isImageAttachment:at,openFilePreviewModal:ye,renderAttachmentChips:ne,uploadFilesToServer:ue,renderAttachmentUploader:he,bindAttachmentUploader:be,getUploaderAttachments:we,setUploaderAttachments:Pe,renderRoleSwitcher:mt,bindRoleSwitcher:ft,renderNotificationBell:_e,initNotificationBell:Ne,openNotificationModal:pe,getNotifIcon:ve,renderAppShell:Ge,bindAppShellEvents:Ye,renderSkeletonCards:Xe,renderEmptyState:Ze,renderKpiCard:et,renderBadge:tt,renderProgressBar:it,renderPeriodPicker:ot,renderSupportTicketSection:lt,bindSupportTicketSection:ut,renderAccountSettingsCard:De,bindAccountSettingsCard:ze,openAccountSettingsModal:se,getArchive:Re,restoreArchiveItem:He,purgeArchiveItem:Oe,purgeAllArchive:Fe});export{Ue as a,Ye as b,O as c,Q as d,v as e,de as f,me as g,E as h,Ee as i,F as j,J as k,De as l,ze as m,qe as n,X as o,Z as p,N as q,Ge as r,q as s,oe as t,Le as u,G as v,Ie as w};
