(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const oe="/api";function H(){return localStorage.getItem("ci360_token")}function P(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function Te(e,i){localStorage.setItem("ci360_token",e),localStorage.setItem("ci360_user",JSON.stringify(i))}function X(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function Ue(e){const i=H(),t=P();if(!i||!t)return X(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null;const s=t.role==="superadmin"||t.role==="admin",o=t.name&&t.name.toLowerCase().includes("ekta")||t.email&&t.email.toLowerCase().includes("ekta");if(e&&t.role!==e&&!s){if((t.role==="accounts"||o)&&(e==="accounts"||e==="employee"))return t;const n=s?"/admin":t.role==="accounts"||o?"/accounts":t.role==="employee"?"/employee":t.role==="client"?"/client":null;return!n||typeof window<"u"&&window.location.pathname.startsWith(n)?(X(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login"),null):(window.location.href=n,null)}return t}async function q(e,i={}){const t=H(),s=Object.assign({"Content-Type":"application/json"},i.headers||{});t&&(s.Authorization="Bearer "+t);const o=await fetch(oe+e,Object.assign({},i,{headers:s}));let n=null;try{n=await o.json()}catch{}if(o.status===401)throw e==="/auth/login"||e.includes("/auth/login")?new Error(n&&n.error||"Invalid username/email or password."):(X(),typeof window<"u"&&window.location.pathname!=="/login"&&(window.location.href="/login?expired=1"),new Error(n&&n.error||"Session expired. Please sign in again."));if(!o.ok)throw new Error(n&&n.error||"Server status "+o.status+" — Backend waking up, please retry in 10s.");return i.method&&i.method!=="GET"&&!e.includes("/notifications")&&typeof window<"u"&&typeof window.ci360FetchNotifications=="function"&&setTimeout(()=>{try{window.ci360FetchNotifications()}catch{}},350),n}const V=e=>q(e,{method:"GET"}),ge=(e,i)=>q(e,{method:"POST",body:JSON.stringify(i)}),G=(e,i)=>q(e,{method:"PUT",body:JSON.stringify(i)}),qe=(e,i)=>q(e,{method:"PATCH",body:JSON.stringify(i)}),W=e=>q(e,{method:"DELETE"}),Re=e=>V("/archive"+(e?`?type=${encodeURIComponent(e)}`:"")),He=(e,i)=>ge(`/archive/restore/${e}/${i}`,{}),Oe=(e,i)=>W(`/archive/purge/${e}/${i}`),Fe=e=>W(`/archive/purge-all/${e}`);function ue(e){return e=Number(e)||0,"₹"+e.toLocaleString("en-IN",{maximumFractionDigits:0})}function Ve(e){return(Number(e)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function b(e){return e==null?"":String(e).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function ee(e){return e?new Date(e).toISOString().slice(0,10):"—"}function N(){return localStorage.getItem("ci360_theme")||"light"}function F(e){localStorage.setItem("ci360_theme",e),document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(n=>{n.classList.toggle("active",n.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const n=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");n&&(n.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),s=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),s&&(s.textContent=e==="dark"?"Light Mode":"Dark Mode");const o=document.getElementById("mmsToggleThemeBtn");if(o){const n=o.querySelector("span");n&&(n.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function Me(){if(typeof document<"u"&&(document.body?.classList.contains("login-page")||window.location.pathname.includes("login")||document.querySelector(".login-box"))){document.documentElement.setAttribute("data-theme","dark");return}const e=N();document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(n=>{n.classList.toggle("active",n.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const n=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");n&&(n.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),s=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),s&&(s.textContent=e==="dark"?"Light Mode":"Dark Mode");const o=document.getElementById("mmsToggleThemeBtn");if(o){const n=o.querySelector("span");n&&(n.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{Me()}catch{}function T(e,i){const t=document.createElement("div");t.className="toast",t.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",t.textContent=(i?"⚠️  ":"✓  ")+e,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(10px)",setTimeout(()=>t.remove(),200)},2800)}function te(e){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${e}</div>`,i.onclick=t=>{t.target===i&&i.remove()},document.body.appendChild(i),i}function Y(){X(),window.location.href="/login"}let Q=null;async function ve(){if("serviceWorker"in navigator)try{Q=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",Q.scope),typeof Notification<"u"&&Notification.permission==="granted"&&H()&&de(Q).catch(()=>{})}catch(e){console.warn("CI360 Service Worker registration notice:",e)}}try{ve()}catch{}let $e=0,Se=0;const D=new Set,Ce=new Set;let Ie=!1;function _e(e){try{const i=typeof P=="function"?P():null,t=i&&i._id?String(i._id):"default";return`${e}_${t}`}catch{return`${e}_default`}}function ne(){try{const e=_e("ci360_alerted_ids"),i=localStorage.getItem(e);if(i){const t=JSON.parse(i);Array.isArray(t)&&t.forEach(s=>D.add(String(s)))}}catch{}}function ie(){try{const e=_e("ci360_alerted_ids"),i=Array.from(D).slice(-2e3);localStorage.setItem(e,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",e=>{e.key&&e.key.includes("ci360_alerted_ids")&&ne()});let K=null;function Je(){if(typeof window>"u")return;const e=()=>{try{const i=window.AudioContext||window.webkitAudioContext;i&&(K||(K=new i),K.state==="suspended"&&K.resume())}catch{}window.removeEventListener("touchstart",e,!0),window.removeEventListener("pointerdown",e,!0),window.removeEventListener("click",e,!0)};window.addEventListener("touchstart",e,!0),window.addEventListener("pointerdown",e,!0),window.addEventListener("click",e,!0)}Je();function re(){try{const e=Date.now();if(e-$e<2500)return;$e=e;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=K||new i;t.state==="suspended"&&t.resume();const s=t.currentTime,o=t.createOscillator(),n=t.createGain();o.type="sine",o.frequency.setValueAtTime(587.33,s),n.gain.setValueAtTime(0,s),n.gain.linearRampToValueAtTime(.25,s+.02),n.gain.exponentialRampToValueAtTime(.001,s+.38),o.connect(n),n.connect(t.destination),o.start(s),o.stop(s+.38);const a=t.createOscillator(),d=t.createGain();a.type="sine",a.frequency.setValueAtTime(880,s+.12),d.gain.setValueAtTime(0,s+.12),d.gain.linearRampToValueAtTime(.28,s+.14),d.gain.exponentialRampToValueAtTime(.001,s+.6),a.connect(d),d.connect(t.destination),a.start(s+.12),a.stop(s+.6)}catch{}}function ce(){try{const e=Date.now();if(e-Se<2500)return;Se=e,"vibrate"in navigator&&navigator.vibrate([200,100,200,100,200])}catch{}}function Ae(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function Ne(){try{if(Ae()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function ye(){if(!("Notification"in window))return T("Your device browser does not support Web Notifications.",!0),!1;try{const e=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return e==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),await de(),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),T("Notifications successfully enabled on this device!"),re(),ce(),await Z({title:"CI360 Alerts Active 🔔",message:"Instant notifications are now live on this device for jobs, tasks, and overdue invoices!",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),T("Notification permission was not granted.",!0),!1)}catch(e){console.error("Notification permission request error:",e)}return!1}async function Z({title:e,message:i,type:t,id:s,url:o}){const n=s?String(s):null;if(ne(),n&&D.has(n)||(n&&(D.add(n),ie()),re(),ce(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return;localStorage.setItem("ci360_notif_enabled","true")}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",d={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:n?`ci360-notif-${n}`:"ci360-alert-"+Date.now(),renotify:!0,vibrate:[200,100,200,100,200],data:{url:o||(typeof window<"u"?window.location.href:""),type:t||"general"}};try{navigator.serviceWorker&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:e,options:d})}catch{}try{if("serviceWorker"in navigator){const l=Q||await navigator.serviceWorker.getRegistration();if(l&&l.showNotification){await l.showNotification(e,d);return}}}catch{}try{const l=new Notification(e,d);l.onclick=()=>{window.focus(),l.close()};return}catch{}}function We(e){const i="=".repeat((4-e.length%4)%4),t=(e+i).replace(/-/g,"+").replace(/_/g,"/"),s=window.atob(t),o=new Uint8Array(s.length);for(let n=0;n<s.length;++n)o[n]=s.charCodeAt(n);return o}async function de(e=null){try{if(typeof window>"u"||!("serviceWorker"in navigator)||!("PushManager"in window)||typeof Notification>"u"||Notification.permission!=="granted"||!H())return null;const t=e||Q||await navigator.serviceWorker.ready;if(!t||!t.pushManager)return null;let s=await t.pushManager.getSubscription();if(!s){const o=await V("/notifications/vapid-public-key").catch(()=>null),n=o&&o.publicKey?o.publicKey:"BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q";s=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:We(n)})}if(s){const o=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return await q("/notifications/subscribe",{method:"POST",body:JSON.stringify({subscription:s.toJSON?s.toJSON():s,deviceType:o?"mobile":"desktop"})}).catch(()=>{}),s}}catch(i){console.warn("Push subscription registration notice:",i.message)}return null}if(typeof window<"u"&&(window.triggerSystemNotification=Z,window.requestNotificationPermission=ye,window.registerPushSubscription=de,"Notification"in window)){const e=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",e,!0),window.removeEventListener("touchstart",e,!0)};window.addEventListener("click",e,!0),window.addEventListener("touchstart",e,!0)}function Ke(){if(typeof document>"u")return null;let e=document.getElementById("ci360FloatingContainer");return e||(e=document.createElement("div"),e.id="ci360FloatingContainer",e.className="ci360-floating-container",document.body.appendChild(e)),e}function pe({id:e,title:i,message:t,type:s,time:o,actionText:n,onAction:a,persistent:d=!1,timeout:l=6500}){const r=Ke();if(!r)return;const g=`ci360-pop-${e||Math.random().toString(36).slice(2,9)}`;if(document.getElementById(g))return;let c="🔔",h="info",B="View",m="";const x=(s||"").toLowerCase(),I=(t||"").toLowerCase();x.includes("invoice_overdue")?(c="🚨",h="critical",B="View Invoice",m="billing"):x.includes("invoice_paid")||x.includes("payment")?(c="💳",h="success",B="View Billing",m="billing"):x.includes("invoice")?(c="🧾",h="info",B="View Invoice",m="billing"):x.includes("job")&&(I.includes("overdue")||x.includes("overdue"))?(c="⚠️",h="critical",B="View Job",m="jobs"):x.includes("job")&&I.includes("due today")?(c="⏳",h="warning",B="View Job",m="jobs"):x.includes("job_created")||x.includes("job")||x.includes("status")?(c="📋",h="info",B="View Job",m="jobs"):x.includes("task")&&(I.includes("overdue")||x.includes("overdue"))?(c="⚠️",h="critical",B="View Planner",m="dailytasks"):x.includes("task_completed")?(c="✅",h="success",B="View Planner",m="dailytasks"):x.includes("task")?(c="📅",h="info",B="Open Planner",m="dailytasks"):x.includes("ticket")?(c="🎫",h="info",B="View Ticket",m="tickets"):x.includes("target")&&(c="🎯",h="success",B="View Targets",m="targets");const C=n||B,p=document.createElement("div");p.id=g,p.className=`ci360-popup-card ci360-priority-${h}`,p.innerHTML=`
    <div class="ci360-popup-body">
      <div class="ci360-popup-header">
        <div class="ci360-popup-header-left">
          <span class="ci360-popup-icon">${c}</span>
          <span class="ci360-popup-title">${b(i||"Notification")}</span>
        </div>
        <div class="ci360-popup-header-right">
          ${C?`<button type="button" class="ci360-popup-action-btn">${C}</button>`:""}
          <button type="button" class="ci360-popup-close-btn" aria-label="Dismiss">✕</button>
        </div>
      </div>
      ${t?`<div class="ci360-popup-message">${b(t||"")}</div>`:""}
    </div>
  `,re(),ce();const S=async()=>{if(e){try{await W(`/notifications/${e}`)}catch{}typeof window.ci360RemoveNotifFromUI=="function"&&window.ci360RemoveNotifFromUI(e)}},L=()=>{p.style.opacity="0",p.style.transform="translateY(-6px) scale(0.97)",setTimeout(()=>{try{p.remove()}catch{}},180),S()},E=p.querySelector(".ci360-popup-close-btn");E&&(E.onclick=k=>{k.stopPropagation(),L()});const y=()=>{if(typeof a=="function")a();else if(m&&typeof window.ci360NavTab=="function"){const k=typeof P=="function"?P():null;let $=m;k&&k.role==="employee"&&($==="jobs"||$==="myjobs")&&($="myjobs"),window.ci360NavTab($)}S(),L()},v=p.querySelector(".ci360-popup-action-btn");for(v&&(v.onclick=k=>{k.stopPropagation(),y()}),p.style.cursor="pointer",p.onclick=k=>{k.target.closest(".ci360-popup-close-btn")||y()};r.children.length>=3;){const k=r.firstChild;k&&r.removeChild(k)}r.appendChild(p),d||setTimeout(()=>{document.body.contains(p)&&L()},l)}function Ee(e=[]){if(!e||!e.length)return;const i=sessionStorage.getItem("ci360_client_overdue_dismissed");if(i&&Date.now()-Number(i)<2700*1e3)return;const t=e.reduce((d,l)=>d+(Number(l.pendingAmount||l.totalAmount)||0),0),s=`
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
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${ue(t)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${e.length} Overdue Invoice${e.length>1?"s":""}</span>
      </div>

      <div class="ci360-overdue-list">
        ${e.map(d=>{const l=d.dueDate?new Date(d.dueDate):new Date,r=Math.max(1,Math.floor((Date.now()-l.getTime())/(1e3*60*60*24)));return`
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${b(d.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${ee(d.dueDate)} <span style="color:var(--red-600);font-weight:700">(${r}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${ue(d.pendingAmount||d.totalAmount||0)}</div>
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
  `,o=te(s),n=o.querySelector("#ci360OverduePayBtn"),a=o.querySelector("#ci360OverdueRemindBtn");n&&(n.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),o.remove(),typeof window.ci360NavTab=="function"&&window.ci360NavTab("billing")}),a&&(a.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),o.remove()})}function Le(){return`
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

        ${!Ne()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
    </div>`}function be(e){return e?e.startsWith("task_completed")?"🎉":e.startsWith("task_due")?"⚡":e.startsWith("task")?"✅":e.startsWith("target_completed")?"🎉":e.startsWith("target")?"🎯":e.startsWith("job_due")?"⏳":e.startsWith("job")?"📋":e.startsWith("ticket")?"🎫":e.startsWith("status")?"🔄":e.startsWith("test")?"🧪":"🔔":"🔔"}function se(e){if(!e)return"";const i=new Date(e),s=Math.floor((new Date-i)/1e3);if(s<60)return"Just now";const o=Math.floor(s/60);if(o<60)return`${o}m ago`;const n=Math.floor(o/60);if(n<24)return`${n}h ago`;const a=Math.floor(n/24);return a===1?"Yesterday":a<7?`${a}d ago`:ee(e)}function me(e){if(!e)return;const i=be(e.type),t=(e.type||"").toLowerCase(),s=e.title||"Notification",o=e.message||"",n=e.createdAt?ee(e.createdAt)+" at "+new Date(e.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"Recently",a=se(e.createdAt),d=typeof P=="function"?P():null,l=d&&d.role==="employee";let r="Update",g="blue",u="",c="";const h=e.jobId||e.taskId||e.ticketId||e.targetId||null;t.includes("job")?(r="Job Deliverable",g="blue",c=l?"myjobs":"jobs",u=l?"Open in My Jobs 📋":"View Job 📁"):t.includes("task")?(r="Daily Planner",g="green",c="dailytasks",u="Open Daily Planner 📅"):t.includes("ticket")?(r="Support Ticket",g="brand",c="tickets",u="Open Support Tickets 🎫"):t.includes("target")?(r="Target Goal",g="gold",c="targets",u="View My Targets 🎯"):(t.includes("invoice")||t.includes("billing"))&&(r="Billing & Invoice",g="purple",c="billing",u="Open Billing 💳");const B=Array.isArray(e.attachments)&&e.attachments.length>0,m=te(`
    <div class="notif-detail-modal" style="padding:4px 0">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border-xs)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:12px;background:var(--bg-elevated);border:1px solid var(--border-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:var(--shadow-xs)">
            ${i}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap">
              <span class="badge ${g}" style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${r}</span>
              <span style="font-size:11.5px;color:var(--text-4)">${a}</span>
            </div>
            <div style="font-size:11px;color:var(--text-4)">${n}</div>
          </div>
        </div>
        <button type="button" class="btn ghost small notif-modal-close-btn" aria-label="Close" style="padding:4px 8px;font-size:16px;line-height:1;border-radius:6px;color:var(--text-3)">✕</button>
      </div>

      <h3 style="font-size:16.5px;font-weight:800;color:var(--text-1);margin:0 0 12px 0;line-height:1.35;letter-spacing:-0.3px">
        ${b(s)}
      </h3>

      <div style="background:var(--bg-elevated);border:1px solid var(--border-xs);border-radius:var(--r-md);padding:14px 16px;margin-bottom:16px;font-size:13.5px;color:var(--text-2);line-height:1.6;white-space:pre-wrap;word-break:break-word">
        ${b(o)}
      </div>

      ${B?`
        <div style="margin-bottom:16px">
          <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Attachments (${e.attachments.length})</div>
          ${ae(e.attachments,{title:"Attachments"})}
        </div>
      `:""}

      <div class="modal-actions" style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border-xs);display:flex;justify-content:flex-end;align-items:center;gap:10px;flex-wrap:wrap">
        <button type="button" class="btn secondary notif-modal-dismiss-btn" style="font-weight:600">Close</button>
        ${c?`
          <button type="button" class="btn primary notif-modal-go-btn" style="font-weight:700;display:inline-flex;align-items:center;gap:6px">
            <span>${u}</span>
          </button>
        `:""}
      </div>
    </div>
  `),x=()=>m.remove(),I=m.querySelector(".notif-modal-close-btn"),C=m.querySelector(".notif-modal-dismiss-btn"),p=m.querySelector(".notif-modal-go-btn");I&&(I.onclick=x),C&&(C.onclick=x),p&&(p.onclick=()=>{x(),typeof window.ci360NavTab=="function"&&window.ci360NavTab(c,h)})}function Pe(){const e=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),t=document.getElementById("notifBadge"),s=document.getElementById("notifList"),o=document.getElementById("clearNotifBtn"),n=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),d=document.getElementById("notifDismissBannerBtn"),l=document.getElementById("notifPermissionBanner"),r=document.getElementById("notifUnreadBadge");if(!e||!i)return;ve();function g(){const y=document.getElementById("notifPermissionBanner");y&&(y.classList.add("hidden"),y.style.setProperty("display","none","important"),y.remove())}function u(){if(Ne()){g();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?g():Notification.permission==="default"&&l&&l.style.setProperty("display","flex","important"))}u(),d&&(d.onclick=y=>{y.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),g()}),a&&(a.onclick=async y=>{y.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),g(),await ye(),g()}),Ae()&&de(),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),ne();let c=[],h="all";function B(){if(!s)return;let y=c;if(h==="task"?y=c.filter(v=>(v.type||"").includes("task")):h==="target"?y=c.filter(v=>(v.type||"").includes("target")):h==="job"?y=c.filter(v=>(v.type||"").includes("job")):h==="ticket"&&(y=c.filter(v=>(v.type||"").includes("ticket"))),y.length===0){s.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${h==="all"?"":h+" "}notifications</div>`;return}s.innerHTML=y.map(v=>{const k=be(v.type);return`
        <div class="notif-item ${v.read?"":"unread"}" data-id="${v._id}" data-type="${b(v.type||"")}">
          <div class="notif-icon">${k}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${b(v.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${se(v.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${b(v.message)}</div>
          </div>
          <div style="color:var(--text-4);font-size:16px;line-height:1;margin-top:2px;flex-shrink:0">›</div>
        </div>`}).join(""),s.querySelectorAll(".notif-item").forEach(v=>{v.onclick=async()=>{const k=v.dataset.id,$=c.find(w=>String(w._id)===String(k));if(k&&v.classList.contains("unread")){v.classList.remove("unread");try{await q(`/notifications/${k}/read`,{method:"PATCH"})}catch{}const w=c.filter(_=>!_.read&&String(_._id)!==String(k)).length;t&&(t.style.display=w>0?"flex":"none",t.textContent=w>99?"99+":w),r&&(r.textContent=w>0?`${w} new`:"",r.style.display=w>0?"inline-block":"none")}if(S(),$)me($);else{const w=v.dataset.type,_=typeof P=="function"?P():null,z=_&&_.role==="employee";w&&w.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):w&&w.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab(z?"myjobs":"jobs"):w&&w.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):w&&w.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}}})}let m={jobs:0,tasks:0,invoices:0,tickets:0},x=!1;async function I(y=!1){try{const v=await V("/notifications");c=v.notifications||[];const k=v.unreadCount||0;if(t&&(t.textContent=k>99?"99+":k,t.style.display=k>0?"flex":"none"),r&&(r.textContent=k>0?`${k} new`:"",r.style.display=k>0?"inline-block":"none"),ne(),v.overdue&&v.overdue.invoices&&v.overdue.invoices.length>0){const $=typeof P=="function"?P():null;$&&$.role==="client"&&Ee(v.overdue.invoices)}if(v.syncTimestamps){const $=v.syncTimestamps;if(!x)m={...$},x=!0;else{const w=[];$.jobs>(m.jobs||0)&&w.push("jobs"),$.tasks>(m.tasks||0)&&w.push("tasks"),$.invoices>(m.invoices||0)&&w.push("invoices"),$.tickets>(m.tickets||0)&&w.push("tickets"),w.length>0&&(m={...$},window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{changedKeys:w,syncTimestamps:$,overdue:v.overdue}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({changedKeys:w,syncTimestamps:$}))}}if(Ie){const $=c.filter(w=>!w.read&&!D.has(String(w._id)));if($.length>0){const _="ci360_daily_alert_job_"+new Date().toISOString().slice(0,10);let z=!!localStorage.getItem(_);for(const A of $){const f=String(A._id);if(Ce.add(f),A.type==="job_due"||A.title&&A.title.includes("Job Due")){if(z){D.add(f);continue}z=!0,localStorage.setItem(_,"true")}pe({id:f,title:A.title||"CI360 Alert",message:A.message||"",type:A.type}),await Z({title:A.title||"CI360 Alert",message:A.message||"",type:A.type,id:f})}ie(),window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{newNotifications:$}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({newNotifications:$})}}else{const $=c.filter(w=>!w.read&&!D.has(String(w._id)));if(c.forEach(w=>Ce.add(String(w._id))),$.length>0){const _="ci360_daily_alert_job_"+new Date().toISOString().slice(0,10);let z=!!localStorage.getItem(_);const A=$.slice(0,3);for(const f of A){const M=String(f._id);if(f.type==="job_due"||f.title&&f.title.includes("Job Due")){if(z){D.add(M);continue}z=!0,localStorage.setItem(_,"true")}pe({id:M,title:f.title||"CI360 Alert",message:f.message||"",type:f.type}),await Z({title:f.title||"CI360 Alert",message:f.message||"",type:f.type,id:M})}$.forEach(f=>D.add(String(f._id))),ie()}else c.forEach(w=>D.add(String(w._id))),ie();Ie=!0}B()}catch{s&&c.length===0&&(s.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=I,window.showInAppPopupAlert=pe,window.showClientOverdueInvoiceModal=Ee,window.ci360RemoveNotifFromUI=y=>{if(!y)return;const v=String(y);c=c.filter($=>String($._id)!==v);const k=c.filter($=>!$.read).length;t&&(t.textContent=k>99?"99+":k,t.style.display=k>0?"inline-flex":"none"),r&&(r.textContent=k>0?`${k} unread`:"",r.style.display=k>0?"inline":"none"),B()}),I(),window.__ci360PollInterval=setInterval(I,6e3),window.addEventListener("focus",()=>I(!0)),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(y=>{y.onclick=v=>{v.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(k=>k.classList.remove("active")),y.classList.add("active"),h=y.dataset.filter,B()}});const C=document.getElementById("notifBackdrop");function p(){i.style.display="flex",i.classList.add("open"),C&&(C.style.display="block",C.classList.add("open")),e.setAttribute("aria-expanded","true"),u();const y=document.getElementById("topbarUserDropdown");y&&(y.style.display="none"),I()}function S(){i.style.display="none",i.classList.remove("open"),C&&(C.style.display="none",C.classList.remove("open")),e.setAttribute("aria-expanded","false")}function L(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?S():p()}window.ci360CloseNotifications=S;const E=document.getElementById("notifCloseBtn");E&&(E.onclick=y=>{y.stopPropagation(),S()}),C&&(C.onclick=y=>{y.stopPropagation(),S()}),e.onclick=y=>{y.stopPropagation(),L()},n&&(n.onclick=async y=>{y.stopPropagation();try{await q("/notifications/read",{method:"PATCH"}),t.style.display="none",r&&(r.textContent="",r.style.display="none"),c.forEach(v=>v.read=!0),B(),T("All notifications marked as read")}catch(v){T(v.message,!0)}}),window.__ci360NotifDocClickHandler&&document.removeEventListener("click",window.__ci360NotifDocClickHandler),window.__ci360NotifDocClickHandler=y=>{!i.contains(y.target)&&!e.contains(y.target)&&S()},document.addEventListener("click",window.__ci360NotifDocClickHandler),o&&(o.onclick=async y=>{y.stopPropagation();try{await W("/notifications"),c=[],s.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',t.style.display="none",r&&(r.textContent="",r.style.display="none"),T("Notifications cleared")}catch(v){T(v.message,!0)}});try{const v=new URLSearchParams(window.location.search).get("notifId");v&&V("/notifications").then(k=>{const w=(k.notifications||[]).find(_=>String(_._id)===String(v));if(w){me(w);const _=window.location.pathname+window.location.hash;window.history.replaceState(null,"",_)}}).catch(()=>{})}catch{}}function Ge({user:e,currentRole:i,activeTab:t,tabs:s,title:o,subtitle:n}){const a=e&&e.name?e.name.charAt(0).toUpperCase():"U",d=e&&(e.role==="superadmin"||e.role==="admin")?"Admin":e&&e.role==="accounts"?"Accounts":e&&e.role==="employee"?"Employee":e&&e.role==="client"?"Client":e&&e.role?e.role.toUpperCase():"User",l=e&&e.name?e.name:"User",r=e&&e.email?e.email:e&&e.username?e.username:"",g=s&&s.some(m=>m.key==="logjob"),u=s&&s.find(m=>m.key===t),c=o||u&&u.label||"Dashboard";let h=[];return i==="accounts"?h=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:t==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:t==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(t),isMore:!0}]:i==="superadmin"||i==="admin"?h=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="dashboard"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(t),isMore:!0}]:i==="employee"?h=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:t==="myjobs"},{key:"dailytasks",label:"Planner",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"proposals",label:"Proposals",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',active:t==="proposals"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:t==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","proposals","targets"].includes(t),isMore:!0}]:h=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:t==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(t),isMore:!0}],`
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
          ${s.map(m=>`
            <button type="button" class="sidebar-item ${t===m.key?"active":""}" data-tab="${m.key}" aria-current="${t===m.key?"page":"false"}">
              <span class="icon">${m.icon||"📌"}</span>
              <span>${m.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${b(e?e.name:"User")}</div>
            <div class="role">${b(d)}</div>
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
              <h1 class="page-heading-title">${b(c)}</h1>
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

            ${g?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${N()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${N()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${Le()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${a}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${b(l)}</span>
                  <span class="topbar-user-role-badge">${b(d)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${a}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${b(l)}</div>
                      ${r?`<div class="tud-email">${b(r)}</div>`:""}
                      <span class="tud-role-chip">${b(d)}</span>
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
          ${h.map(m=>`
            <button type="button" class="mbn-item ${m.active?"active":""}" data-tab="${m.key}" ${m.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${m.iconSvg}</span>
              <span class="mbn-label">${b(m.label)}</span>
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
              ${s.map(m=>`
                <button type="button" class="mms-card ${t===m.key?"active":""}" data-tab="${m.key}">
                  <span class="mms-card-icon">${m.icon||"📌"}</span>
                  <span class="mms-card-label">${b(m.label)}</span>
                </button>
              `).join("")}
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
    </div>`}function Ye(e){const i=document.getElementById("mobileNavToggle"),t=document.getElementById("appSidebar"),s=document.getElementById("sidebarOverlay");function o(){t&&t.classList.add("open"),s&&s.classList.add("open")}function n(){t&&t.classList.remove("open"),s&&s.classList.remove("open")}i&&(i.onclick=o),s&&(s.onclick=n);const a=document.querySelector(".app-shell");function d(){if(!a)return;a.classList.toggle("sidebar-collapsed");const f=a.classList.contains("sidebar-collapsed");try{localStorage.setItem("ci360_sidebar_collapsed",f?"true":"false")}catch{}}const l=document.getElementById("sidebarCollapseBtn");l&&(l.onclick=d);const r=document.getElementById("desktopSidebarToggle");r&&(r.onclick=d),window.__ci360SidebarKeyBound||(window.__ci360SidebarKeyBound=!0,window.addEventListener("keydown",f=>{if((f.ctrlKey||f.metaKey)&&(f.key==="b"||f.key==="B")){const M=document.activeElement?document.activeElement.tagName.toLowerCase():"";if(M==="input"||M==="textarea"||document.activeElement&&document.activeElement.isContentEditable)return;f.preventDefault(),d()}}));const g=document.getElementById("mobileMoreBackdrop"),u=document.getElementById("mobileMoreSheet"),c=document.getElementById("mmsCloseBtn"),h=document.getElementById("mobileMoreBtn");function B(){g&&g.classList.add("active"),u&&u.classList.add("active")}function m(){g&&g.classList.remove("active"),u&&u.classList.remove("active")}h&&(h.onclick=f=>{f.stopPropagation(),B()}),c&&(c.onclick=m),g&&(g.onclick=f=>{f.target===g&&m()}),document.querySelectorAll(".mbn-item").forEach(f=>{f.dataset.tab&&f.dataset.tab!=="__more__"&&(f.onclick=()=>{m(),e&&e(f.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(f=>{f.onclick=()=>{m(),e&&e(f.dataset.tab)}});const x=document.getElementById("mmsToggleThemeBtn");x&&(x.onclick=()=>{F(N()==="dark"?"light":"dark")});const I=document.getElementById("mmsNotifsBtn");I&&(I.onclick=()=>{m();const f=document.getElementById("notifBellBtn");f&&f.click()});const C=document.getElementById("mmsLogoutBtn");C&&(C.onclick=Y);const p=document.getElementById("mobileCalBtn");p&&(p.onclick=()=>{const f=document.querySelector(".period-row");f&&(f.scrollIntoView({behavior:"smooth",block:"center"}),f.classList.add("pulse-highlight"),setTimeout(()=>f.classList.remove("pulse-highlight"),1200))});const S=document.getElementById("tudMobileThemeBtn");S&&(S.onclick=f=>{f.stopPropagation(),F(N()==="dark"?"light":"dark")});const L=document.getElementById("tudMobileNotifsBtn");L&&(L.onclick=f=>{f.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none");const R=document.getElementById("notifBellBtn");R&&R.click()});const E=document.getElementById("tudMobileSettingsBtn");E&&(E.onclick=f=>{f.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none");const R=document.querySelector('[data-tab="settings"], [data-tab="manage"]');R&&e?e(R.dataset.tab):le()});const y=document.getElementById("tudProfileSettingsBtn");y&&(y.onclick=f=>{f.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none");const R=document.querySelector('[data-tab="settings"], [data-tab="manage"]');R&&e?e(R.dataset.tab):le()});const v=document.getElementById("tudMobileHelpBtn");v&&(v.onclick=f=>{f.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none"),te(`
        <div style="padding:24px;text-align:center;">
          <div style="font-size:36px;margin-bottom:12px;">💬</div>
          <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
          <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
            For immediate technical assistance, client onboarding, or workspace inquiries, reach out to your system administrator or support team.
          </p>
          <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
        </div>
      `)});const k=document.getElementById("logoutBtnMobile");k&&(k.onclick=Y);const $=document.getElementById("topbarUserBtn"),w=document.getElementById("topbarUserDropdown");$&&w&&($.onclick=f=>{f.stopPropagation();const M=w.style.display!=="none";w.style.display=M?"none":"block",$.setAttribute("aria-expanded",String(!M)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",f=>{!w.contains(f.target)&&!$.contains(f.target)&&(w.style.display="none",$.setAttribute("aria-expanded","false"))}));const _=document.getElementById("tudThemeToggleBtn");_&&(_.onclick=()=>{F(N()==="dark"?"light":"dark")});const z=document.getElementById("topbarQuickLogJobBtn");z&&(z.onclick=()=>{e&&e("logjob")});const A=document.getElementById("logoutBtn");A&&(A.onclick=Y),Pe(),document.querySelectorAll(".sidebar-item").forEach(f=>{f.onclick=()=>{n(),e&&e(f.dataset.tab)}}),Qe(e)}function Qe(e){const i=document.getElementById("cmdPaletteBackdrop"),t=document.getElementById("cmdSearchInput"),s=document.getElementById("cmdResultsList"),o=document.getElementById("topbarCmdTrigger"),n=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),d=document.getElementById("cmdCloseKbd");if(!i||!t||!s)return;const l=Array.from(document.querySelectorAll(".sidebar-item")),r=l.map(p=>({type:"tab",id:p.dataset.tab,label:p.querySelector("span:last-child")?.textContent||p.dataset.tab,icon:p.querySelector(".icon")?.textContent||"📌",sub:"Navigate to section",action:()=>{e&&e(p.dataset.tab)}}));l.some(p=>p.dataset.tab==="logjob")&&r.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{e&&e("logjob")}}),r.push({type:"action",id:"toggle-theme",label:N()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{F(N()==="dark"?"light":"dark")}}),r.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const p=document.getElementById("notifBellBtn");p&&p.click()}}),r.push({type:"action",id:"account-settings",label:"Account Settings & Credentials",icon:"⚙️",sub:"Update username, email, and password",action:()=>{le()}}),r.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>Y()});let u=0,c=[...r];function h(){if(!c.length){s.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}s.innerHTML=c.map((p,S)=>`
      <div class="cmd-result ${S===u?"selected":""}" data-idx="${S}">
        <div class="cmd-result-icon">${p.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${b(p.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${b(p.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),s.querySelectorAll(".cmd-result").forEach(p=>{p.onmouseenter=()=>{u=Number(p.dataset.idx),B()},p.onclick=()=>{m(Number(p.dataset.idx))}})}function B(){s.querySelectorAll(".cmd-result").forEach((p,S)=>{p.classList.toggle("selected",S===u)})}function m(p){const S=c[p];S&&S.action&&(I(),S.action())}function x(){const p=document.getElementById("topbarUserDropdown");p&&(p.style.display="none"),i.classList.add("open"),t.value="",c=[...r],u=0,h(),setTimeout(()=>t.focus(),50)}function I(){i.classList.remove("open"),t.blur()}o&&(o.onclick=x),n&&(n.onclick=x),a&&(a.onclick=()=>{const p=document.getElementById("topbarUserDropdown");p&&(p.style.display="none"),x()}),d&&(d.onclick=I),i.onclick=p=>{p.target===i&&I()},t.oninput=()=>{const p=t.value.trim().toLowerCase();p?c=r.filter(S=>S.label.toLowerCase().includes(p)||S.sub.toLowerCase().includes(p)):c=[...r],u=0,h()},t.onkeydown=p=>{if(p.key==="ArrowDown"){if(p.preventDefault(),c.length>0){u=(u+1)%c.length,B();const S=s.querySelector(".cmd-result.selected");S&&S.scrollIntoView({block:"nearest"})}}else if(p.key==="ArrowUp"){if(p.preventDefault(),c.length>0){u=(u-1+c.length)%c.length,B();const S=s.querySelector(".cmd-result.selected");S&&S.scrollIntoView({block:"nearest"})}}else p.key==="Enter"?(p.preventDefault(),m(u)):p.key==="Escape"&&(p.preventDefault(),I())};const C=p=>{(p.metaKey||p.ctrlKey)&&p.key.toLowerCase()==="k"?(p.preventDefault(),i.classList.contains("open")?I():x()):p.key==="Escape"&&i.classList.contains("open")&&I()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=C,window.addEventListener("keydown",C)}function Xe(e=4){return`
    <div class="grid grid-${Math.min(e,4)}" style="margin-bottom:24px">
      ${Array(e).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function Ze(e,i,t="📁",s=""){return`
    <div class="empty">
      <span class="empty-icon">${t}</span>
      <h3>${b(e)}</h3>
      <p>${b(i)}</p>
      ${s}
    </div>`}function et(e,i,t="",s="📊",o=""){let n="";return o&&(n=`<span class="kpi-trend ${o.startsWith("+")||o.includes("↑")||o.toLowerCase().includes("up")?"up":"down"}">${b(o)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${b(e)}</span>
        <div class="kpi-icon">${s}</div>
      </div>
      <div class="kpi-value">${b(i)}</div>
      <div class="kpi-sub">${n}<span>${b(t)}</span></div>
    </div>`}function tt(e,i="gray"){return`<span class="badge ${i}">${b(e)}</span>`}function it(e,i="indigo"){const t=Math.min(100,Math.max(0,Number(e)||0));return`
    <div class="progress-bar-wrap" title="${t.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${t}%"></div>
    </div>`}function ot(e){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([t,s])=>`<button class="pchip ${e===t?"active":""}" data-period="${t}">${s}</button>`).join("")}</div>`}function nt(e){if(!e)return"U";const i=e.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function U(e){if(e=Number(e)||0,e===0)return"0 B";const i=1024,t=["B","KB","MB","GB","TB"],s=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,s)).toFixed(1))+" "+(t[s]||"GB")}const st=U;function fe(e){if(!e)return"";if(/^https?:\/\//i.test(e)||e.startsWith("data:")||e.startsWith("blob:"))return e;if(/^https?:\/\//i.test(oe))try{return new URL(oe).origin+(e.startsWith("/")?e:"/"+e)}catch{}return e}function J(e="",i=""){const t=(e.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(t)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:t==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(t)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(t)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(t)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(t)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(t)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function at(e){return e?J(e.name||e.filename||"",e.type||"").cls==="img":!1}function he(e){if(!e||!e.url)return;const i=J(e.name,e.type),t=i.cls==="img",s=i.cls==="pdf",o=b(e.name||"Attachment"),n=U(e.size),a=document.createElement("div");a.className="preview-modal-overlay",a.innerHTML=`
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
        ${t?`
          <img src="${e.url}" alt="${o}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${e.url}','_blank')">
        `:s?`
          <iframe src="${e.url}" title="${o}"></iframe>
        `:i.cls==="video"?`
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
        `:`
          <div style="text-align:center;padding:40px 20px">
            <div style="font-size:48px;margin-bottom:12px">${i.icon}</div>
            <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${o}</div>
            <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${n}</div>
            <a href="${e.url}" download="${o}" target="_blank" class="btn gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Attachment
            </a>
          </div>
        `}
      </div>
    </div>
  `,a.onclick=d=>{(d.target===a||d.target.closest(".preview-modal-close"))&&a.remove()},document.body.appendChild(a)}function ae(e=[],i={}){if(!e||!e.length)return"";const t=!!i.canDelete,s=e.filter(o=>!o||!o.url||o.type==="url"||/^https?:\/\//i.test(o.url||"")?!1:J(o.name,o.type).cls==="video"||o.name&&o.name.match(/\.(mp4|mov|webm|mkv|avi)$/i)||o.type&&o.type.startsWith("video/"));return`
    <div class="attachment-chips-wrap" data-attachments="${encodeURIComponent(JSON.stringify(e))}">
      ${i.title?`<div class="attachment-chips-header">📎 ${b(i.title)} <span style="font-weight:500;color:var(--text-4)">(${e.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${e.map((o,n)=>{const a=o.type==="url"||/^https?:\/\//i.test(o.url||""),d=a?{cls:"file-type-doc",icon:"🌐"}:J(o.name,o.type),l=b(o.name||(a?"Live Deliverable URL":"File")),r=a?"Live Link":U(o.size),g=d.cls==="video"||o.name&&o.name.match(/\.(mp4|mov|webm|mkv|avi)$/i),u=fe(o.url);return`
            <div class="attachment-chip ${g?"is-video":""}" data-idx="${n}" title="${l} (${r})">
              <span class="file-type-icon ${d.cls}" style="width:22px;height:22px;font-size:12px">${d.icon}</span>
              ${a?`
                <a href="${o.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-name" style="text-decoration:none;color:inherit;cursor:pointer" title="Open live URL in new tab">
                  ${l} <span style="font-size:11px;opacity:0.75">↗</span>
                </a>
              `:`
                <span class="attachment-chip-name" onclick="window.__openPreview(${n}, this)">
                  ${l}
                  ${g?'<span class="badge blue" style="font-size:9.5px;padding:1px 4px;margin-left:5px">🎬 MP4 Video</span>':""}
                </span>
              `}
              <span class="attachment-chip-size">${r}</span>
              <div class="attachment-chip-actions">
                ${a?`
                  <a href="${o.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-btn" title="Open Live Link" onclick="event.stopPropagation()">🔗</a>
                `:`
                  <button type="button" class="attachment-chip-btn" title="${g?"Play Video":"View Preview"}" onclick="window.__openPreview(${n}, this)">${g?"▶️":"👁️"}</button>
                  <a href="${u}" download="${l}" target="_blank" class="attachment-chip-btn" title="Download File" onclick="event.stopPropagation()">⬇️</a>
                `}
                ${t?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${n}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>

      ${s.length>0?`
        <div class="attachment-videos-container" style="display:flex;flex-direction:column;gap:12px;margin-top:10px">
          ${s.map(o=>{const n=b(o.name||"Deliverable Video"),a=U(o.size),d=fe(o.url);return`
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
  `}const j={};function we(e,i){return new Promise((t,s)=>{const o=new XMLHttpRequest,n=typeof H=="function"?H():localStorage.getItem("ci360_token")||"",a=encodeURIComponent(e.name||"upload.mp4"),d=e.type||(e.name&&e.name.match(/\.(mp4|mov|webm)$/i)?"video/mp4":"application/octet-stream"),l=oe.replace(/\/+$/,""),r=n?`&token=${encodeURIComponent(n)}`:"",g=`${l}/upload/stream?name=${a}&type=${encodeURIComponent(d)}${r}`;o.open("POST",g,!0),n&&o.setRequestHeader("Authorization","Bearer "+n),o.setRequestHeader("Content-Type","application/octet-stream"),o.setRequestHeader("X-File-Name",a),o.setRequestHeader("X-File-Type",d),o.upload&&(o.upload.onprogress=u=>{if(u.lengthComputable&&typeof i=="function"){const c=Math.round(u.loaded/u.total*100);i(c,u.loaded,u.total)}}),o.onload=()=>{if(o.status>=200&&o.status<300)try{const u=JSON.parse(o.responseText);t(u.file||u.files&&u.files[0])}catch{s(new Error("Failed to parse upload response"))}else try{const u=JSON.parse(o.responseText);s(new Error(u.error||`Upload failed with HTTP ${o.status}`))}catch{s(new Error(`Upload failed with HTTP ${o.status}`))}},o.onerror=()=>s(new Error("Network error during file upload. Please check connection.")),o.ontimeout=()=>s(new Error("Upload timed out. File may be too heavy or connection slow.")),o.timeout=36e5,o.send(e)})}async function lt(e,i){const t=Array.from(e||[]);if(!t.length)return[];const s=[];for(let o=0;o<t.length;o++){const n=t[o];try{const a=await we(n,(d,l,r)=>{typeof i=="function"&&i(d,l,r,n,o,t.length)});a&&s.push(a)}catch(a){if(console.warn("Direct stream upload failed, attempting fallback for",n.name,a),n.size<15*1024*1024){const d=await new Promise(l=>{const r=new FileReader;r.onload=()=>l({name:n.name,url:r.result,size:n.size,type:n.type||"application/octet-stream",uploadedAt:new Date}),r.onerror=()=>l(null),r.readAsDataURL(n)});d&&s.push(d)}else throw a}}return s}function xe({id:e="uploader",label:i="Attachments & Files",subtitle:t="Upload briefs, proofs, PDFs, MP4 videos (up to 1GB), spreadsheets, or design assets",multiple:s=!0,accept:o="*/*,video/mp4,video/*,.mp4,.mov,.webm,.avi",maxFiles:n=10}={}){return`
    <div class="uploader-container" id="container-${e}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${b(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${e}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${e}">
        <input type="file" id="input-${e}" ${s?"multiple":""} accept="${o}" style="display:none">
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
  `}function ke(e,i={}){const t=document.getElementById("zone-"+e),s=document.getElementById("input-"+e),o=document.getElementById("list-"+e),n=document.getElementById("count-"+e);j[e]=i.existing?[...i.existing]:[];function a(){const l=j[e]||[];if(n&&(n.textContent=`${l.length} file${l.length===1?"":"s"} attached`),!!o){if(!l.length){o.innerHTML="";return}o.innerHTML=l.map((r,g)=>{const u=J(r.name,r.type),c=b(r.name||"File"),h=U(r.size),B=u.cls==="video"||r.name&&r.name.match(/\.(mp4|mov|webm|mkv|avi)$/i)||r.type&&r.type.startsWith("video/"),m=fe(r.url);return`
        <div class="uploader-file-item ${B?"is-video":""}" style="display:flex;flex-direction:column;gap:6px;padding:8px 10px;background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:6px;margin-bottom:8px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <div class="uploader-file-info" style="display:flex;align-items:center;gap:8px;min-width:0;flex:1">
              <span class="file-type-icon ${u.cls}" style="width:24px;height:24px;font-size:13px">${u.icon}</span>
              <div style="min-width:0;flex:1">
                <div class="uploader-file-name" title="${c}" style="font-size:12px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                  ${c}
                  ${B?'<span class="badge blue" style="font-size:9.5px;padding:1px 5px;margin-left:6px">🎬 Video Deliverable</span>':""}
                </div>
                <div class="uploader-file-size" style="font-size:11px;color:var(--text-3)">${u.label} · ${h}</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${e}', ${g})">Preview / Play</button>
              <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${e}', ${g})">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
          ${B&&m?`
            <div style="margin-top:4px;border-radius:6px;overflow:hidden;background:#000;border:1px solid var(--border-sm)">
              <video controls preload="metadata" style="width:100%;max-height:240px;display:block;" playsinline>
                <source src="${m}" type="${r.type||"video/mp4"}">
                Your browser does not support HTML5 video streaming.
              </video>
            </div>
          `:""}
        </div>
      `}).join(""),i.onChange&&i.onChange(l)}}async function d(l){const r=Array.from(l||[]);if(r.length&&o){for(let g=0;g<r.length;g++){const u=r[g],c=`up-prog-${Date.now()}-${g}`,h=b(u.name||"video.mp4"),B=U(u.size),m=u.type?.startsWith("video/")||u.name?.match(/\.(mp4|mov|webm|mkv|avi)$/i),x=document.createElement("div");x.id=c,x.className="uploader-progress-card",x.style.cssText="padding:10px 12px;background:var(--bg-elevated);border:1px solid var(--brand-500,#3b82f6);border-radius:6px;margin-bottom:8px;",x.innerHTML=`
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:12px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px">
            <span>${m?"🎬":"📎"}</span>
            <span style="max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${h}</span>
          </span>
          <span style="font-size:11.5px;font-weight:700;color:var(--brand-500,#3b82f6)" id="${c}-percent">0%</span>
        </div>
        <div style="background:rgba(255,255,255,0.12);height:7px;border-radius:4px;overflow:hidden;margin-bottom:6px">
          <div id="${c}-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #3b82f6, #06b6d4);transition:width 0.1s linear;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--text-3)">
          <span id="${c}-status">Uploading ${B}… please wait</span>
          <span id="${c}-bytes">0 MB / ${B}</span>
        </div>
      `,o.appendChild(x);try{const I=await we(u,(C,p,S)=>{const L=document.getElementById(`${c}-bar`),E=document.getElementById(`${c}-percent`),y=document.getElementById(`${c}-bytes`);L&&(L.style.width=`${C}%`),E&&(E.textContent=`${C}%`),y&&(y.textContent=`${U(p)} / ${U(S)}`)});x.remove(),I&&(j[e]=[...j[e]||[],I],a())}catch(I){console.error("File upload failed:",I);const C=document.getElementById(`${c}-status`);C&&(C.textContent="❌ Upload failed: "+(I.message||"Network error"),C.style.color="var(--red-500, #ef4444)"),T("Upload failed for "+u.name+": "+(I.message||"Network error"),!0)}}T("File attached successfully! ✓")}}window.__removeUploaderFile=(l,r)=>{if(j[l]){j[l].splice(r,1);const g=window[`__update_${l}`];g&&g()}},window.__previewUploaderFile=(l,r)=>{const g=(j[l]||[])[r];g&&he(g)},window[`__update_${e}`]=a,t&&s&&(t.onclick=l=>{l.target.tagName!=="BUTTON"&&!l.target.closest("button")&&s.click()},t.ondragover=l=>{l.preventDefault(),t.classList.add("dragover")},t.ondragleave=()=>t.classList.remove("dragover"),t.ondrop=async l=>{l.preventDefault(),t.classList.remove("dragover"),l.dataTransfer&&l.dataTransfer.files&&l.dataTransfer.files.length&&await d(l.dataTransfer.files)},s.onchange=async()=>{if(s.files&&s.files.length){const l=s.files;s.value="",await d(l)}}),a()}function Be(e){return j[e]||[]}function ze(e,i=[]){j[e]=[...i];const t=window[`__update_${e}`];t&&t()}window.__openPreview=(e,i)=>{const t=i.closest(".attachment-chips-wrap")||i.closest("[data-attachments]");if(!t)return;const s=i.closest(".attachment-chip"),o=s?Number(s.dataset.idx):e,n=t.dataset.attachments||t.parentElement?.dataset?.attachments;if(n)try{const a=JSON.parse(decodeURIComponent(n));a[o]&&he(a[o])}catch{}};function rt(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");return`
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
    </div>`}const ct={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},dt={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function pt(e,i){const t=(e.status||"Open").toLowerCase().replace(" ","-"),s=e.status==="Open",o=(e._id||"").slice(-4).toUpperCase(),n=nt(e.userName),a=encodeURIComponent(JSON.stringify(e.attachments||[])),d=encodeURIComponent(JSON.stringify(e.adminAttachments||[]));return`
    <div class="ticket-card status-${t}" id="tkcard-${e._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${o}</span>
            <span class="ticket-subject">${b(e.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${ct[e.status]||"gray"}">
            ${s?'<span class="pulse-dot"></span>':""} ${b(e.status)}
          </span>
          <span class="badge ${dt[e.priority]||"gray"}">${b(e.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${n}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${b(e.userName)}
            <span class="ticket-role-pill">${b(e.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${se(e.createdAt)} · ${ee(e.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${b(e.message)}</div>

      ${e.attachments&&e.attachments.length?`
        <div data-attachments="${a}">
          ${ae(e.attachments,{title:"Ticket Attachments"})}
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
              ${e.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${se(e.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${b(e.adminReply)}</div>
            ${e.adminAttachments&&e.adminAttachments.length?`
              <div data-attachments="${d}">
                ${ae(e.adminAttachments,{title:"Support Attached Files"})}
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
    </div>`}async function O(e,i,t){const s=document.getElementById("tklist-"+i),o=document.getElementById("tkcnt-"+i);if(s)try{const n=await V("/tickets/job/"+e);o&&(o.textContent=n.length),n.length?(s.innerHTML=n.map(a=>pt(a,t)).join(""),ut(e,i,t,s,n)):s.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{s.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function ut(e,i,t,s,o){t&&(s.querySelectorAll(".tk-status-sel").forEach(n=>{n.onchange=async()=>{try{await G("/tickets/"+n.dataset.tkid,{status:n.value}),T("Status updated"),O(e,i,t)}catch(a){T(a.message,!0)}}}),s.querySelectorAll(".tk-quick-resolve-btn").forEach(n=>{n.onclick=async()=>{try{await G("/tickets/"+n.dataset.tkid,{status:"Resolved"}),T("Ticket marked as Resolved! 🎉"),O(e,i,t)}catch(a){T(a.message,!0)}}}),s.querySelectorAll(".ticket-template-btn").forEach(n=>{n.onclick=()=>{const a=document.getElementById("tkreplytxt-"+n.dataset.tkid);a&&(a.value=n.dataset.tpl,a.focus())}}),s.querySelectorAll(".tk-reply-toggle").forEach(n=>{n.onclick=()=>{const a=n.dataset.tkid,d=document.getElementById("tkreplyform-"+a);if(d){d.classList.toggle("show");const l=o.find(r=>r._id===a);ke("tkreplyup-"+a,{existing:l?l.adminAttachments:[]})}}}),s.querySelectorAll(".tk-reply-cancel").forEach(n=>{n.onclick=()=>{const a=document.getElementById("tkreplyform-"+n.dataset.tkid);a&&a.classList.remove("show")}}),s.querySelectorAll(".tk-reply-save").forEach(n=>{n.onclick=async()=>{const a=n.dataset.tkid,d=document.getElementById("tkreplytxt-"+a);if(!d)return;const l=Be("tkreplyup-"+a);try{await G("/tickets/"+a,{adminReply:d.value.trim(),adminAttachments:l}),T("Response saved! 🛡️"),O(e,i,t)}catch(r){T(r.message,!0)}}}),s.querySelectorAll(".tk-del-btn").forEach(n=>{n.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await W("/tickets/"+n.dataset.tkid),T("Ticket deleted"),O(e,i,t)}catch(a){T(a.message,!0)}}}))}function mt(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");O(e,t,i),ke("tkup-"+t);const s=document.querySelector(`[data-jobid="${e}"].ticket-toggle-btn`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+t);if(!a)return;const d=a.style.display==="block";a.style.display=d?"none":"block",s.textContent=d?"+ Raise Ticket":"✕ Cancel"});const o=document.querySelector(`.tk-cancel-btn[data-safeid="${t}"]`);o&&(o.onclick=()=>{const a=document.getElementById("tkform-"+t);a&&(a.style.display="none"),s&&(s.textContent="+ Raise Ticket")});const n=document.querySelector(`.tk-submit-btn[data-safeid="${t}"]`);n&&(n.onclick=async()=>{const a=(document.getElementById("tksub-"+t)||{}).value?.trim(),d=(document.getElementById("tkmsg-"+t)||{}).value?.trim(),l=(document.getElementById("tkpri-"+t)||{}).value,r=Be("tkup-"+t);if(!a){T("Please enter a subject",!0);return}if(!d){T("Please enter a message",!0);return}n.disabled=!0,n.textContent="Submitting…";try{await ge("/tickets",{jobId:e,subject:a,message:d,priority:l,attachments:r}),T("Ticket submitted! 🎫");const g=document.getElementById("tkform-"+t);g&&(g.style.display="none"),s&&(s.textContent="+ Raise Ticket");const u=document.getElementById("tksub-"+t),c=document.getElementById("tkmsg-"+t);u&&(u.value=""),c&&(c.value=""),ze("tkup-"+t,[]),O(e,t,i)}catch(g){T(g.message,!0)}finally{n.disabled=!1,n.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function ft(){return""}function gt(){}function De(e={}){const{title:i="Account Settings & Credentials",subtitle:t="Update your personal name, login email, and security password",showCardWrapper:s=!0,formId:o="accSettingsForm"}=e,n=P()||{},a=n.name?n.name.charAt(0).toUpperCase():"U",d=(n.role||"user").toUpperCase();return`
    <div class="${s?"card":""}" style="max-width:760px;margin:0 auto;width:100%;" id="${o}-wrap">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--gold-500,#d4af37),#b8860b);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:20px;box-shadow:0 4px 12px rgba(212,175,55,0.25);flex-shrink:0;">
          ${b(a)}
        </div>
        <div style="min-width:0;flex:1;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <h3 style="font-size:18px;font-weight:700;color:var(--text-1);margin:0;">${b(i)}</h3>
            <span class="badge gold" style="font-size:11px;padding:2px 8px;">${b(d)}</span>
          </div>
          <div style="font-size:13px;color:var(--text-3);margin-top:2px;">${b(t)}</div>
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
              <input type="text" id="${o}-name" class="input" value="${b(n.name||"")}" placeholder="Your display name" required autocomplete="name">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${o}-email" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Email Address *</label>
              <input type="email" id="${o}-email" class="input" value="${b(n.email||"")}" placeholder="name@company.com" required autocomplete="email">
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
  `}function je(e,i={}){const{formId:t="accSettingsForm",onSaved:s=null,modalBg:o=null}=i,n=e||document;n.querySelectorAll(".pass-toggle-btn").forEach(g=>{g.onclick=()=>{const u=g.dataset.target,c=n.querySelector("#"+u)||document.getElementById(u);if(c){const h=c.type==="password";c.type=h?"text":"password",g.textContent=h?"🙈":"👁️",g.style.opacity=h?"1":"0.65"}}});const a=n.querySelector("#"+t+"-saveBtn")||document.getElementById(t+"-saveBtn"),d=n.querySelector("#"+t+"-alert")||document.getElementById(t+"-alert");function l(g,u=!0){d&&(d.style.display="block",d.style.background=u?"rgba(239,68,68,0.12)":"rgba(34,197,94,0.12)",d.style.border=u?"1px solid rgba(239,68,68,0.3)":"1px solid rgba(34,197,94,0.3)",d.style.color=u?"#ef4444":"#22c55e",d.innerHTML=(u?"⚠️ ":"✓ ")+b(g))}function r(){d&&(d.style.display="none")}a&&(a.onclick=async()=>{r();const g=n.querySelector("#"+t+"-name")||document.getElementById(t+"-name"),u=n.querySelector("#"+t+"-email")||document.getElementById(t+"-email"),c=n.querySelector("#"+t+"-currentPass")||document.getElementById(t+"-currentPass"),h=n.querySelector("#"+t+"-newPass")||document.getElementById(t+"-newPass"),B=n.querySelector("#"+t+"-confirmPass")||document.getElementById(t+"-confirmPass"),m=(g?.value||"").trim(),x=(u?.value||"").trim(),I=c?.value||"",C=h?.value||"",p=B?.value||"";if(!m){l("Please enter your full name or username.",!0),g?.focus();return}if(!x||!x.includes("@")){l("Please enter a valid email address.",!0),u?.focus();return}if(C||p){if(!I){l("Please enter your current password to set a new password.",!0),c?.focus();return}if(C.length<6){l("New password must be at least 6 characters long.",!0),h?.focus();return}if(C!==p){l("New passwords do not match. Please re-check.",!0),B?.focus();return}}const S={name:m,email:x};C&&(S.currentPassword=I,S.newPassword=C);const L=a.innerHTML;a.disabled=!0,a.innerHTML="<span>Saving Changes…</span>";try{const E=await G("/auth/profile",S);E&&E.token&&E.user&&Te(E.token,E.user),document.querySelectorAll(".topbar-user-name, .sidebar-user .name, .tud-name").forEach(v=>{v.textContent=E.user.name}),document.querySelectorAll(".tud-email").forEach(v=>{v.textContent=E.user.email});const y=E.user.name?E.user.name.charAt(0).toUpperCase():"U";document.querySelectorAll(".topbar-user-avatar span, .user-avatar, .tud-avatar").forEach(v=>{v.classList.contains("topbar-online-dot")||(v.textContent=y)}),c&&(c.value=""),h&&(h.value=""),B&&(B.value=""),l("Account credentials updated successfully!",!1),T("Account settings saved! ✓"),typeof s=="function"&&s(E.user),o&&setTimeout(()=>{try{o.remove()}catch{}},900)}catch(E){l(E.message||"Failed to update credentials. Please try again.",!0),T(E.message||"Update failed",!0)}finally{a.disabled=!1,a.innerHTML=L}})}function le(){const e=`
    <div style="position:relative;padding:12px 6px;">
      <button type="button" id="closeAccSettingsModalBtn" style="position:absolute;top:-4px;right:0;border:none;background:transparent;color:var(--text-3);font-size:20px;cursor:pointer;padding:6px 10px;" aria-label="Close modal">✕</button>
      ${De({title:"Account Settings",subtitle:"Manage your personal email, username, and password",showCardWrapper:!1,formId:"modalAccSettingsForm"})}
    </div>
  `,i=te(e),t=i.querySelector("#closeAccSettingsModalBtn");return t&&(t.onclick=()=>i.remove()),je(i,{formId:"modalAccSettingsForm",modalBg:i}),i}window.__setTheme=function(e){F(e)};Object.assign(window,{getToken:H,getUser:P,setSession:Te,clearSession:X,requireAuth:Ue,initTheme:Me,api:q,apiGet:V,apiPost:ge,apiPut:G,apiPatch:qe,apiDelete:W,fmtINR:ue,fmtHours:Ve,escapeHtml:b,fmtDate:ee,flashToast:T,openModal:te,logout:Y,getTheme:N,setTheme:F,initServiceWorker:ve,playNotificationChime:re,triggerPhoneVibration:ce,requestNotificationPermission:ye,triggerSystemNotification:Z,fmtFileSize:U,formatFileSize:st,uploadSingleFileDirectly:we,getFileCategory:J,isImageAttachment:at,openFilePreviewModal:he,renderAttachmentChips:ae,uploadFilesToServer:lt,renderAttachmentUploader:xe,bindAttachmentUploader:ke,getUploaderAttachments:Be,setUploaderAttachments:ze,renderRoleSwitcher:ft,bindRoleSwitcher:gt,renderNotificationBell:Le,initNotificationBell:Pe,openNotificationModal:me,getNotifIcon:be,renderAppShell:Ge,bindAppShellEvents:Ye,renderSkeletonCards:Xe,renderEmptyState:Ze,renderKpiCard:et,renderBadge:tt,renderProgressBar:it,renderPeriodPicker:ot,renderSupportTicketSection:rt,bindSupportTicketSection:mt,renderAccountSettingsCard:De,bindAccountSettingsCard:je,openAccountSettingsModal:le,getArchive:Re,restoreArchiveItem:He,purgeArchiveItem:Oe,purgeAllArchive:Fe});export{Ue as a,Ye as b,V as c,ee as d,b as e,ue as f,ge as g,T as h,Me as i,W as j,G as k,De as l,je as m,qe as n,te as o,U as p,P as q,Ge as r,H as s,se as t,we as u,X as v,Te as w};
