(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const Ce="/api";function ee(){return localStorage.getItem("ci360_token")}function j(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function Ie(e,i){localStorage.setItem("ci360_token",e),localStorage.setItem("ci360_user",JSON.stringify(i))}function te(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function Ee(e){const i=ee(),t=j();if(!i||!t)return window.location.href="/login",null;const o=t.name&&t.name.toLowerCase().includes("ekta")||t.email&&t.email.toLowerCase().includes("ekta");return e&&t.role!==e&&t.role!=="superadmin"?(t.role==="accounts"||o)&&(e==="accounts"||e==="employee")?t:(window.location.href=t.role==="superadmin"?"/admin":t.role==="accounts"||o?"/accounts":t.role==="employee"?"/employee":"/client",null):t}async function L(e,i={}){const t=ee(),o=Object.assign({"Content-Type":"application/json"},i.headers||{});t&&(o.Authorization="Bearer "+t);const s=await fetch(Ce+e,Object.assign({},i,{headers:o}));if(s.status===401)throw te(),window.location.href="/login",new Error("Session expired");let n=null;try{n=await s.json()}catch{}if(!s.ok)throw new Error(n&&n.error||"Server status "+s.status+" — Backend waking up, please retry in 10s.");return n}const ie=e=>L(e,{method:"GET"}),oe=(e,i)=>L(e,{method:"POST",body:JSON.stringify(i)}),V=(e,i)=>L(e,{method:"PUT",body:JSON.stringify(i)}),Me=(e,i)=>L(e,{method:"PATCH",body:JSON.stringify(i)}),ne=e=>L(e,{method:"DELETE"});function Y(e){return e=Number(e)||0,"₹"+e.toLocaleString("en-IN",{maximumFractionDigits:0})}function Te(e){return(Number(e)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function g(e){return e==null?"":String(e).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function q(e){return e?new Date(e).toISOString().slice(0,10):"—"}function M(){return localStorage.getItem("ci360_theme")||"light"}function P(e){localStorage.setItem("ci360_theme",e),document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(n=>{n.classList.toggle("active",n.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const n=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");n&&(n.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),o=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),o&&(o.textContent=e==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const n=s.querySelector("span");n&&(n.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function be(){const e=M();document.documentElement.setAttribute("data-theme",e),document.querySelectorAll(".theme-btn").forEach(n=>{n.classList.toggle("active",n.dataset.theme===e)});const i=document.getElementById("tudThemeToggleBtn");if(i){const n=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");n&&(n.textContent=e==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${e==="dark"?"Light":"Dark"} Mode`)}const t=document.getElementById("tudMobileThemeIcon"),o=document.getElementById("tudMobileThemeText");t&&(t.textContent=e==="dark"?"☀️":"🌙"),o&&(o.textContent=e==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const n=s.querySelector("span");n&&(n.textContent=e==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{be()}catch{}function $(e,i){const t=document.createElement("div");t.className="toast",t.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",t.textContent=(i?"⚠️  ":"✓  ")+e,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(10px)",setTimeout(()=>t.remove(),200)},2800)}function se(e){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${e}</div>`,i.onclick=t=>{t.target===i&&i.remove()},document.body.appendChild(i),i}function O(){te(),window.location.href="/login"}let R=null;async function ae(){if("serviceWorker"in navigator)try{R=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",R.scope)}catch(e){console.warn("CI360 Service Worker registration notice:",e)}}try{ae()}catch{}let me=0,fe=0;const A=new Set,ve=new Set;let ge=!1;function ke(e){try{const i=typeof j=="function"?j():null,t=i&&i._id?String(i._id):"default";return`${e}_${t}`}catch{return`${e}_default`}}function F(){try{const e=ke("ci360_alerted_ids"),i=localStorage.getItem(e);if(i){const t=JSON.parse(i);Array.isArray(t)&&t.forEach(o=>A.add(String(o)))}}catch{}}function Q(){try{const e=ke("ci360_alerted_ids"),i=Array.from(A).slice(-2e3);localStorage.setItem(e,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",e=>{e.key&&e.key.includes("ci360_alerted_ids")&&F()});function le(){try{const e=Date.now();if(e-me<5e3)return;me=e;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const t=new i;t.state==="suspended"&&t.resume();const o=t.currentTime,s=t.createOscillator(),n=t.createGain();s.type="sine",s.frequency.setValueAtTime(587.33,o),n.gain.setValueAtTime(0,o),n.gain.linearRampToValueAtTime(.2,o+.02),n.gain.exponentialRampToValueAtTime(.001,o+.35),s.connect(n),n.connect(t.destination),s.start(o),s.stop(o+.35);const a=t.createOscillator(),l=t.createGain();a.type="sine",a.frequency.setValueAtTime(880,o+.12),l.gain.setValueAtTime(0,o+.12),l.gain.linearRampToValueAtTime(.22,o+.14),l.gain.exponentialRampToValueAtTime(.001,o+.55),a.connect(l),l.connect(t.destination),a.start(o+.12),a.stop(o+.55)}catch{}}function re(){try{const e=Date.now();if(e-fe<5e3)return;fe=e,"vibrate"in navigator&&navigator.vibrate([150,80,150])}catch{}}function _e(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function we(){try{if(_e()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function xe(){if(!("Notification"in window))return $("Your browser does not support notifications.",!0),!1;try{const e=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return e==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),$("Notifications enabled for this device!"),await J({title:"CI360 Notifications Active 🔔",message:"You will now receive instant alerts on this device for jobs and tasks.",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),$("Notification permission was declined.",!0),!1)}catch(e){console.error("Notification permission request error:",e)}return!1}async function J({title:e,message:i,type:t,id:o,url:s}){const n=o?String(o):null;if(F(),n&&A.has(n)||(n&&(A.add(n),Q()),le(),re(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",l={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:n?`ci360-notif-${n}`:"ci360-alert",renotify:!1,vibrate:[150,80,150],data:{url:s||(typeof window<"u"?window.location.href:""),type:t||"general"}};try{const m=new Notification(e,l);m.onclick=()=>{window.focus(),m.close()};return}catch{}try{if(R&&R.showNotification){await R.showNotification(e,l);return}if("serviceWorker"in navigator){const m=await Promise.race([navigator.serviceWorker.ready,new Promise(p=>setTimeout(()=>p(null),400))]);m&&m.showNotification&&await m.showNotification(e,l)}}catch(m){console.warn("Service Worker notification dispatch:",m)}}if(typeof window<"u"&&(window.triggerSystemNotification=J,"Notification"in window)){const e=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",e,!0)};window.addEventListener("click",e,!0)}function Ne(){if(typeof document>"u")return null;let e=document.getElementById("ci360FloatingContainer");return e||(e=document.createElement("div"),e.id="ci360FloatingContainer",e.className="ci360-floating-container",document.body.appendChild(e)),e}function G({id:e,title:i,message:t,type:o,time:s,actionText:n,onAction:a,persistent:l=!1,timeout:m=8e3}){const p=Ne();if(!p)return;const S=`ci360-pop-${e||Math.random().toString(36).slice(2,9)}`;if(document.getElementById(S))return;let u="🔔",h="info",f="UPDATE",C="View Details",x="";const k=(o||"").toLowerCase(),T=(t||"").toLowerCase();k.includes("invoice_overdue")?(u="🚨",h="critical",f="OVERDUE INVOICE",C="Pay / View Invoice",x="billing"):k.includes("invoice_paid")||k.includes("payment")?(u="💳",h="success",f="PAYMENT CLEARED",C="View Billing",x="billing"):k.includes("invoice")?(u="🧾",h="info",f="NEW INVOICE",C="View Invoice",x="billing"):k.includes("job")&&(T.includes("overdue")||k.includes("overdue"))?(u="⚠️",h="critical",f="OVERDUE JOB",C="View Job",x="jobs"):k.includes("job")&&T.includes("due today")?(u="⏳",h="warning",f="JOB DUE TODAY",C="View Job",x="jobs"):k.includes("job_created")?(u="📋",h="info",f="NEW JOB LOGGED",C="View Job",x="jobs"):k.includes("job")||k.includes("status")?(u="🔄",h="info",f="JOB UPDATED",C="View Job",x="jobs"):k.includes("task")&&(T.includes("overdue")||k.includes("overdue"))?(u="⚠️",h="critical",f="OVERDUE TASK",C="Check Tasks",x="dailytasks"):k.includes("task_completed")?(u="✅",h="success",f="TASK COMPLETED",C="View Checklist",x="dailytasks"):k.includes("task")?(u="📝",h="warning",f="DAILY TASK",C="View Tasks",x="dailytasks"):k.includes("ticket")?(u="💬",h="info",f="SUPPORT TICKET",C="View Ticket",x="tickets"):k.includes("target")&&(u="🎉",h="success",f="TARGET REACHED",C="View Targets",x="targets");const c=n||C,v=document.createElement("div");v.id=S,v.className=`ci360-popup-card ci360-priority-${h}`,v.innerHTML=`
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
  `,le(),re();const E=()=>{v.style.opacity="0",v.style.transform="translateX(40px) scale(0.95)",setTimeout(()=>v.remove(),220)};for(v.querySelector(".ci360-popup-close-btn").onclick=I=>{I.stopPropagation(),E()},v.querySelector(".ci360-popup-dismiss-link").onclick=I=>{I.stopPropagation(),E()},v.querySelector(".ci360-popup-action-btn").onclick=I=>{if(I.stopPropagation(),typeof a=="function"?a():x&&typeof window.ci360NavTab=="function"&&window.ci360NavTab(x),e)try{L(`/notifications/${e}/read`,{method:"PATCH"})}catch{}E()};p.children.length>=4;)p.removeChild(p.firstChild);p.appendChild(v),l||setTimeout(()=>{document.body.contains(v)&&E()},h==="critical"?14e3:m)}function he(e=[]){if(!e||!e.length)return;const i=sessionStorage.getItem("ci360_client_overdue_dismissed");if(i&&Date.now()-Number(i)<45*60*1e3)return;const t=e.reduce((l,m)=>l+(Number(m.pendingAmount||m.totalAmount)||0),0),o=`
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
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${Y(t)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${e.length} Overdue Invoice${e.length>1?"s":""}</span>
      </div>

      <div class="ci360-overdue-list">
        ${e.map(l=>{const m=l.dueDate?new Date(l.dueDate):new Date,p=Math.max(1,Math.floor((Date.now()-m.getTime())/(1e3*60*60*24)));return`
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${g(l.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${q(l.dueDate)} <span style="color:var(--red-600);font-weight:700">(${p}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${Y(l.pendingAmount||l.totalAmount||0)}</div>
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
  `,s=se(o),n=s.querySelector("#ci360OverduePayBtn"),a=s.querySelector("#ci360OverdueRemindBtn");n&&(n.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove(),typeof window.ci360NavTab=="function"&&window.ci360NavTab("billing")}),a&&(a.onclick=()=>{sessionStorage.setItem("ci360_client_overdue_dismissed",String(Date.now())),s.remove()})}function Be(){return`
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

        ${!we()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
    </div>`}function $e(){const e=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),t=document.getElementById("notifBadge"),o=document.getElementById("notifList"),s=document.getElementById("clearNotifBtn"),n=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),l=document.getElementById("notifDismissBannerBtn"),m=document.getElementById("notifPermissionBanner"),p=document.getElementById("notifUnreadBadge");if(!e||!i)return;ae();function S(){const d=document.getElementById("notifPermissionBanner");d&&(d.classList.add("hidden"),d.style.setProperty("display","none","important"),d.remove())}function w(){if(we()){S();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?S():Notification.permission==="default"&&m&&m.style.setProperty("display","flex","important"))}w(),l&&(l.onclick=d=>{d.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),S()}),a&&(a.onclick=async d=>{d.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),S(),await xe(),S()}),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),F();let u=[],h="all";function f(d){return d?d.startsWith("task_completed")?"🎉":d.startsWith("task_due")?"⚡":d.startsWith("task")?"✅":d.startsWith("target_completed")?"🎉":d.startsWith("target")?"🎯":d.startsWith("job_due")?"⏳":d.startsWith("job")?"📋":d.startsWith("ticket")?"🎫":d.startsWith("status")?"🔄":d.startsWith("test")?"🧪":"🔔":"🔔"}function C(d){if(!d)return"";const r=new Date(d),y=Math.floor((new Date-r)/1e3);if(y<60)return"Just now";const b=Math.floor(y/60);if(b<60)return`${b}m ago`;const _=Math.floor(b/60);if(_<24)return`${_}h ago`;const K=Math.floor(_/24);return K===1?"Yesterday":K<7?`${K}d ago`:q(d)}function x(){if(!o)return;let d=u;if(h==="task"?d=u.filter(r=>(r.type||"").includes("task")):h==="target"?d=u.filter(r=>(r.type||"").includes("target")):h==="job"?d=u.filter(r=>(r.type||"").includes("job")):h==="ticket"&&(d=u.filter(r=>(r.type||"").includes("ticket"))),d.length===0){o.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${h==="all"?"":h+" "}notifications</div>`;return}o.innerHTML=d.map(r=>{const B=f(r.type);return`
        <div class="notif-item ${r.read?"":"unread"}" data-id="${r._id}" data-type="${g(r.type||"")}">
          <div class="notif-icon">${B}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${g(r.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${C(r.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${g(r.message)}</div>
          </div>
        </div>`}).join(""),o.querySelectorAll(".notif-item").forEach(r=>{r.onclick=async()=>{const B=r.dataset.id,y=r.dataset.type;if(B&&r.classList.contains("unread")){r.classList.remove("unread");try{await L(`/notifications/${B}/read`,{method:"PATCH"})}catch{}}I(),y&&y.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):y&&y.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("jobs"):y&&y.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):y&&y.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}})}let k={jobs:0,tasks:0,invoices:0,tickets:0},T=!1;async function c(d=!1){try{const r=await ie("/notifications");u=r.notifications||[];const B=r.unreadCount||0;if(t&&(t.textContent=B>99?"99+":B,t.style.display=B>0?"flex":"none"),p&&(p.textContent=B>0?`${B} new`:"",p.style.display=B>0?"inline-block":"none"),F(),r.overdue&&r.overdue.invoices&&r.overdue.invoices.length>0){const y=typeof j=="function"?j():null;y&&y.role==="client"&&he(r.overdue.invoices)}if(r.syncTimestamps){const y=r.syncTimestamps;if(!T)k={...y},T=!0;else{const b=[];y.jobs>(k.jobs||0)&&b.push("jobs"),y.tasks>(k.tasks||0)&&b.push("tasks"),y.invoices>(k.invoices||0)&&b.push("invoices"),y.tickets>(k.tickets||0)&&b.push("tickets"),b.length>0&&(k={...y},window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{changedKeys:b,syncTimestamps:y,overdue:r.overdue}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({changedKeys:b,syncTimestamps:y}))}}if(ge){const y=u.filter(b=>!b.read&&!A.has(String(b._id)));if(y.length>0){for(const b of y){const _=String(b._id);ve.add(_),A.add(_),G({id:_,title:b.title||"CI360 Alert",message:b.message||"",type:b.type}),await J({title:b.title||"CI360 Alert",message:b.message||"",type:b.type,id:_})}Q(),window.dispatchEvent(new CustomEvent("ci360:dataUpdated",{detail:{newNotifications:y}})),typeof window.ci360TriggerAutoUpdate=="function"&&window.ci360TriggerAutoUpdate({newNotifications:y})}}else{u.forEach(b=>{const _=String(b._id);ve.add(_),A.add(_)}),Q(),ge=!0;const y=u.filter(b=>!b.read&&(b.type.includes("overdue")||b.title&&b.title.includes("Overdue")));if(y.length>0){const b=y[0];G({id:String(b._id),title:b.title,message:b.message,type:b.type})}}x()}catch{o&&u.length===0&&(o.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=c,window.showInAppPopupAlert=G,window.showClientOverdueInvoiceModal=he),c(),window.__ci360PollInterval=setInterval(c,6e3),window.addEventListener("focus",()=>c(!0)),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(d=>{d.onclick=r=>{r.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(B=>B.classList.remove("active")),d.classList.add("active"),h=d.dataset.filter,x()}});const v=document.getElementById("notifBackdrop");function E(){i.style.display="flex",i.classList.add("open"),v&&(v.style.display="block",v.classList.add("open")),e.setAttribute("aria-expanded","true"),w();const d=document.getElementById("topbarUserDropdown");d&&(d.style.display="none"),c()}function I(){i.style.display="none",i.classList.remove("open"),v&&(v.style.display="none",v.classList.remove("open")),e.setAttribute("aria-expanded","false")}function z(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?I():E()}window.ci360CloseNotifications=I;const U=document.getElementById("notifCloseBtn");U&&(U.onclick=d=>{d.stopPropagation(),I()}),v&&(v.onclick=d=>{d.stopPropagation(),I()}),e.onclick=d=>{d.stopPropagation(),z()},n&&(n.onclick=async d=>{d.stopPropagation();try{await L("/notifications/read",{method:"PATCH"}),t.style.display="none",p&&(p.textContent="",p.style.display="none"),u.forEach(r=>r.read=!0),x(),$("All notifications marked as read")}catch(r){$(r.message,!0)}}),document.addEventListener("click",d=>{!i.contains(d.target)&&d.target!==e&&(i.style.display="none")}),s&&(s.onclick=async d=>{d.stopPropagation();try{await ne("/notifications"),u=[],o.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',t.style.display="none",p&&(p.textContent="",p.style.display="none"),$("Notifications cleared")}catch(r){$(r.message,!0)}})}function Le({user:e,currentRole:i,activeTab:t,tabs:o,title:s,subtitle:n}){const a=e&&e.name?e.name.charAt(0).toUpperCase():"U",l=e&&(e.role==="superadmin"||e.role==="admin")?"Admin":e&&e.role==="accounts"?"Accounts":e&&e.role==="employee"?"Employee":e&&e.role==="client"?"Client":e&&e.role?e.role.toUpperCase():"User",m=e&&e.name?e.name:"User",p=e&&e.email?e.email:e&&e.username?e.username:"",S=o&&o.some(f=>f.key==="logjob"),w=o&&o.find(f=>f.key===t),u=s||w&&w.label||"Dashboard";let h=[];return i==="accounts"?h=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:t==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:t==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(t),isMore:!0}]:i==="superadmin"?h=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:t==="dashboard"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(t),isMore:!0}]:i==="employee"?h=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:t==="myjobs"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:t==="dailytasks"},{key:"tickets",label:"Tickets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></svg>',active:t==="tickets"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:t==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","tickets","targets"].includes(t),isMore:!0}]:h=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:t==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:t==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:t==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:t==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(t),isMore:!0}],`
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
              <button class="theme-btn ${M()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${M()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${Be()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${a}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${g(m)}</span>
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
                      <div class="tud-name">${g(m)}</div>
                      ${p?`<div class="tud-email">${g(p)}</div>`:""}
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
              ${o.map(f=>`
                <button type="button" class="mms-card ${t===f.key?"active":""}" data-tab="${f.key}">
                  <span class="mms-card-icon">${f.icon||"📌"}</span>
                  <span class="mms-card-label">${g(f.label)}</span>
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
    </div>`}function Ae(e){const i=document.getElementById("mobileNavToggle"),t=document.getElementById("appSidebar"),o=document.getElementById("sidebarOverlay");function s(){t&&t.classList.add("open"),o&&o.classList.add("open")}function n(){t&&t.classList.remove("open"),o&&o.classList.remove("open")}i&&(i.onclick=s),o&&(o.onclick=n);const a=document.getElementById("mobileMoreBackdrop"),l=document.getElementById("mobileMoreSheet"),m=document.getElementById("mmsCloseBtn"),p=document.getElementById("mobileMoreBtn");function S(){a&&a.classList.add("active"),l&&l.classList.add("active")}function w(){a&&a.classList.remove("active"),l&&l.classList.remove("active")}p&&(p.onclick=r=>{r.stopPropagation(),S()}),m&&(m.onclick=w),a&&(a.onclick=r=>{r.target===a&&w()}),document.querySelectorAll(".mbn-item").forEach(r=>{r.dataset.tab&&r.dataset.tab!=="__more__"&&(r.onclick=()=>{w(),e&&e(r.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(r=>{r.onclick=()=>{w(),e&&e(r.dataset.tab)}});const u=document.getElementById("mmsToggleThemeBtn");u&&(u.onclick=()=>{P(M()==="dark"?"light":"dark")});const h=document.getElementById("mmsNotifsBtn");h&&(h.onclick=()=>{w();const r=document.getElementById("notifBellBtn");r&&r.click()});const f=document.getElementById("mmsLogoutBtn");f&&(f.onclick=O);const C=document.getElementById("mobileCalBtn");C&&(C.onclick=()=>{const r=document.querySelector(".period-row");r&&(r.scrollIntoView({behavior:"smooth",block:"center"}),r.classList.add("pulse-highlight"),setTimeout(()=>r.classList.remove("pulse-highlight"),1200))});const x=document.getElementById("tudMobileThemeBtn");x&&(x.onclick=r=>{r.stopPropagation(),P(M()==="dark"?"light":"dark")});const k=document.getElementById("tudMobileNotifsBtn");k&&(k.onclick=r=>{r.stopPropagation();const B=document.getElementById("topbarUserDropdown");B&&(B.style.display="none");const y=document.getElementById("notifBellBtn");y&&y.click()});const T=document.getElementById("tudMobileSettingsBtn");T&&(T.onclick=r=>{r.stopPropagation();const B=document.getElementById("topbarUserDropdown");B&&(B.style.display="none"),document.querySelector('[data-tab="manage"]')&&e?e("manage"):S()});const c=document.getElementById("tudMobileHelpBtn");c&&(c.onclick=r=>{r.stopPropagation();const B=document.getElementById("topbarUserDropdown");B&&(B.style.display="none"),document.querySelector('[data-tab="tickets"]')&&e?e("tickets"):se(`
          <div style="padding:24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">💬</div>
            <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
            <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
              For immediate technical assistance, client onboarding, or support tickets, reach out to your system administrator or use the Support Tickets portal.
            </p>
            <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
          </div>
        `)});const v=document.getElementById("logoutBtnMobile");v&&(v.onclick=O);const E=document.getElementById("topbarUserBtn"),I=document.getElementById("topbarUserDropdown");E&&I&&(E.onclick=r=>{r.stopPropagation();const B=I.style.display!=="none";I.style.display=B?"none":"block",E.setAttribute("aria-expanded",String(!B)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",r=>{!I.contains(r.target)&&!E.contains(r.target)&&(I.style.display="none",E.setAttribute("aria-expanded","false"))}));const z=document.getElementById("tudThemeToggleBtn");z&&(z.onclick=()=>{P(M()==="dark"?"light":"dark")});const U=document.getElementById("topbarQuickLogJobBtn");U&&(U.onclick=()=>{e&&e("logjob")});const d=document.getElementById("logoutBtn");d&&(d.onclick=O),$e(),document.querySelectorAll(".sidebar-item").forEach(r=>{r.onclick=()=>{n(),e&&e(r.dataset.tab)}}),De(e)}function De(e){const i=document.getElementById("cmdPaletteBackdrop"),t=document.getElementById("cmdSearchInput"),o=document.getElementById("cmdResultsList"),s=document.getElementById("topbarCmdTrigger"),n=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),l=document.getElementById("cmdCloseKbd");if(!i||!t||!o)return;const m=Array.from(document.querySelectorAll(".sidebar-item")),p=m.map(c=>{var v,E;return{type:"tab",id:c.dataset.tab,label:((v=c.querySelector("span:last-child"))==null?void 0:v.textContent)||c.dataset.tab,icon:((E=c.querySelector(".icon"))==null?void 0:E.textContent)||"📌",sub:"Navigate to section",action:()=>{e&&e(c.dataset.tab)}}});m.some(c=>c.dataset.tab==="logjob")&&p.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{e&&e("logjob")}}),p.push({type:"action",id:"toggle-theme",label:M()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{P(M()==="dark"?"light":"dark")}}),p.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const c=document.getElementById("notifBellBtn");c&&c.click()}}),p.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>O()});let w=0,u=[...p];function h(){if(!u.length){o.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}o.innerHTML=u.map((c,v)=>`
      <div class="cmd-result ${v===w?"selected":""}" data-idx="${v}">
        <div class="cmd-result-icon">${c.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${g(c.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${g(c.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),o.querySelectorAll(".cmd-result").forEach(c=>{c.onmouseenter=()=>{w=Number(c.dataset.idx),f()},c.onclick=()=>{C(Number(c.dataset.idx))}})}function f(){o.querySelectorAll(".cmd-result").forEach((c,v)=>{c.classList.toggle("selected",v===w)})}function C(c){const v=u[c];v&&v.action&&(k(),v.action())}function x(){const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),i.classList.add("open"),t.value="",u=[...p],w=0,h(),setTimeout(()=>t.focus(),50)}function k(){i.classList.remove("open"),t.blur()}s&&(s.onclick=x),n&&(n.onclick=x),a&&(a.onclick=()=>{const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),x()}),l&&(l.onclick=k),i.onclick=c=>{c.target===i&&k()},t.oninput=()=>{const c=t.value.trim().toLowerCase();c?u=p.filter(v=>v.label.toLowerCase().includes(c)||v.sub.toLowerCase().includes(c)):u=[...p],w=0,h()},t.onkeydown=c=>{if(c.key==="ArrowDown"){if(c.preventDefault(),u.length>0){w=(w+1)%u.length,f();const v=o.querySelector(".cmd-result.selected");v&&v.scrollIntoView({block:"nearest"})}}else if(c.key==="ArrowUp"){if(c.preventDefault(),u.length>0){w=(w-1+u.length)%u.length,f();const v=o.querySelector(".cmd-result.selected");v&&v.scrollIntoView({block:"nearest"})}}else c.key==="Enter"?(c.preventDefault(),C(w)):c.key==="Escape"&&(c.preventDefault(),k())};const T=c=>{(c.metaKey||c.ctrlKey)&&c.key.toLowerCase()==="k"?(c.preventDefault(),i.classList.contains("open")?k():x()):c.key==="Escape"&&i.classList.contains("open")&&k()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=T,window.addEventListener("keydown",T)}function Pe(e=4){return`
    <div class="grid grid-${Math.min(e,4)}" style="margin-bottom:24px">
      ${Array(e).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function je(e,i,t="📁",o=""){return`
    <div class="empty">
      <span class="empty-icon">${t}</span>
      <h3>${g(e)}</h3>
      <p>${g(i)}</p>
      ${o}
    </div>`}function ze(e,i,t="",o="📊",s=""){let n="";return s&&(n=`<span class="kpi-trend ${s.startsWith("+")||s.includes("↑")||s.toLowerCase().includes("up")?"up":"down"}">${g(s)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${g(e)}</span>
        <div class="kpi-icon">${o}</div>
      </div>
      <div class="kpi-value">${g(i)}</div>
      <div class="kpi-sub">${n}<span>${g(t)}</span></div>
    </div>`}function Ue(e,i="gray"){return`<span class="badge ${i}">${g(e)}</span>`}function Oe(e,i="indigo"){const t=Math.min(100,Math.max(0,Number(e)||0));return`
    <div class="progress-bar-wrap" title="${t.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${t}%"></div>
    </div>`}function Re(e){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([t,o])=>`<button class="pchip ${e===t?"active":""}" data-period="${t}">${o}</button>`).join("")}</div>`}function qe(e){if(!e)return"U";const i=e.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function ye(e){if(!e)return"";const i=new Date,t=new Date(e),o=Math.floor((i-t)/1e3);if(o<60)return"Just now";const s=Math.floor(o/60);if(s<60)return`${s}m ago`;const n=Math.floor(s/60);if(n<24)return`${n}h ago`;const a=Math.floor(n/24);return a<7?`${a}d ago`:q(e)}function W(e){if(e=Number(e)||0,e===0)return"0 B";const i=1024,t=["B","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,o)).toFixed(1))+" "+t[o]}function H(e="",i=""){const t=(e.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(t)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:t==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(t)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(t)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(t)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(t)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(t)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function He(e){return e?H(e.name||e.filename||"",e.type||"").cls==="img":!1}function ce(e){if(!e||!e.url)return;const i=H(e.name,e.type),t=i.cls==="img",o=i.cls==="pdf",s=g(e.name||"Attachment"),n=W(e.size),a=document.createElement("div");a.className="preview-modal-overlay",a.innerHTML=`
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
  `,a.onclick=l=>{(l.target===a||l.target.closest(".preview-modal-close"))&&a.remove()},document.body.appendChild(a)}function X(e=[],i={}){if(!e||!e.length)return"";const t=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${g(i.title)} <span style="font-weight:500;color:var(--text-4)">(${e.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${e.map((o,s)=>{const n=H(o.name,o.type),a=g(o.name||"File"),l=W(o.size);return`
            <div class="attachment-chip" data-idx="${s}" title="${a} (${l})">
              <span class="file-type-icon ${n.cls}" style="width:22px;height:22px;font-size:12px">${n.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${s}, this)">${a}</span>
              <span class="attachment-chip-size">${l}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${s}, this)">👁️</button>
                <a href="${o.url}" download="${a}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${t?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${s}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const N={};async function Z(e){const i=Array.from(e||[]);if(!i.length)return[];const o=(await Promise.all(i.map(async s=>new Promise(n=>{const a=new FileReader;a.onload=()=>{n({name:s.name,type:s.type,size:s.size,base64:a.result,data:a.result})},a.onerror=()=>n(null),a.readAsDataURL(s)})))).filter(Boolean);if(!o.length)return[];try{const s=await oe("/upload",{files:o});if(s&&s.files&&s.files.length)return s.files}catch(s){console.warn("Backend upload failed, fallback to base64 data URLs:",s)}return o.map(s=>({name:s.name,url:s.base64,size:s.size,type:s.type,uploadedAt:new Date}))}function de({id:e="uploader",label:i="Attachments & Files",subtitle:t="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:o=!0,accept:s="*/*",maxFiles:n=10}={}){return`
    <div class="uploader-container" id="container-${e}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${g(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${e}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${e}">
        <input type="file" id="input-${e}" ${o?"multiple":""} accept="${s}" style="display:none">
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
  `}function ue(e,i={}){const t=document.getElementById("zone-"+e),o=document.getElementById("input-"+e),s=document.getElementById("list-"+e),n=document.getElementById("count-"+e);N[e]=i.existing?[...i.existing]:[];function a(){const l=N[e]||[];if(n&&(n.textContent=`${l.length} file${l.length===1?"":"s"} attached`),!!s){if(!l.length){s.innerHTML="";return}s.innerHTML=l.map((m,p)=>{const S=H(m.name,m.type),w=g(m.name||"File"),u=W(m.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${S.cls}">${S.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${w}">${w}</div>
              <div class="uploader-file-size">${S.label} · ${u}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${e}', ${p})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${e}', ${p})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(l)}}window.__removeUploaderFile=(l,m)=>{if(N[l]){N[l].splice(m,1);const p=window[`__update_${l}`];p&&p()}},window.__previewUploaderFile=(l,m)=>{const p=(N[l]||[])[m];p&&ce(p)},window[`__update_${e}`]=a,t&&o&&(t.onclick=l=>{l.target.tagName!=="BUTTON"&&!l.target.closest("button")&&o.click()},t.ondragover=l=>{l.preventDefault(),t.classList.add("dragover")},t.ondragleave=()=>t.classList.remove("dragover"),t.ondrop=async l=>{if(l.preventDefault(),t.classList.remove("dragover"),l.dataTransfer&&l.dataTransfer.files&&l.dataTransfer.files.length){$("Uploading files… ⏳");const m=await Z(l.dataTransfer.files);N[e]=[...N[e]||[],...m],a(),$("Files attached! ✓")}},o.onchange=async()=>{if(o.files&&o.files.length){$("Uploading files… ⏳");const l=await Z(o.files);N[e]=[...N[e]||[],...l],a(),$("Files attached! ✓"),o.value=""}}),a()}function pe(e){return N[e]||[]}function Se(e,i=[]){N[e]=[...i];const t=window[`__update_${e}`];t&&t()}window.__openPreview=(e,i)=>{const t=i.closest(".attachment-chips-wrap");if(!t)return;const o=i.closest(".attachment-chip");if(!o)return;const s=Number(o.dataset.idx),n=t.dataset.attachments;if(n)try{const a=JSON.parse(decodeURIComponent(n));a[s]&&ce(a[s])}catch{}};function Ve(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");return`
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
        ${de({id:"tkup-"+t,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const Fe={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},Je={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function We(e,i){const t=(e.status||"Open").toLowerCase().replace(" ","-"),o=e.status==="Open",s=(e._id||"").slice(-4).toUpperCase(),n=qe(e.userName),a=encodeURIComponent(JSON.stringify(e.attachments||[])),l=encodeURIComponent(JSON.stringify(e.adminAttachments||[]));return`
    <div class="ticket-card status-${t}" id="tkcard-${e._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${s}</span>
            <span class="ticket-subject">${g(e.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${Fe[e.status]||"gray"}">
            ${o?'<span class="pulse-dot"></span>':""} ${g(e.status)}
          </span>
          <span class="badge ${Je[e.priority]||"gray"}">${g(e.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${n}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${g(e.userName)}
            <span class="ticket-role-pill">${g(e.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${ye(e.createdAt)} · ${q(e.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${g(e.message)}</div>

      ${e.attachments&&e.attachments.length?`
        <div data-attachments="${a}">
          ${X(e.attachments,{title:"Ticket Attachments"})}
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
              ${e.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${ye(e.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${g(e.adminReply)}</div>
            ${e.adminAttachments&&e.adminAttachments.length?`
              <div data-attachments="${l}">
                ${X(e.adminAttachments,{title:"Support Attached Files"})}
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
            ${de({id:"tkreplyup-"+e._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${e._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${e._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function D(e,i,t){const o=document.getElementById("tklist-"+i),s=document.getElementById("tkcnt-"+i);if(o)try{const n=await ie("/tickets/job/"+e);s&&(s.textContent=n.length),n.length?(o.innerHTML=n.map(a=>We(a,t)).join(""),Ke(e,i,t,o,n)):o.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{o.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function Ke(e,i,t,o,s){t&&(o.querySelectorAll(".tk-status-sel").forEach(n=>{n.onchange=async()=>{try{await V("/tickets/"+n.dataset.tkid,{status:n.value}),$("Status updated"),D(e,i,t)}catch(a){$(a.message,!0)}}}),o.querySelectorAll(".tk-quick-resolve-btn").forEach(n=>{n.onclick=async()=>{try{await V("/tickets/"+n.dataset.tkid,{status:"Resolved"}),$("Ticket marked as Resolved! 🎉"),D(e,i,t)}catch(a){$(a.message,!0)}}}),o.querySelectorAll(".ticket-template-btn").forEach(n=>{n.onclick=()=>{const a=document.getElementById("tkreplytxt-"+n.dataset.tkid);a&&(a.value=n.dataset.tpl,a.focus())}}),o.querySelectorAll(".tk-reply-toggle").forEach(n=>{n.onclick=()=>{const a=n.dataset.tkid,l=document.getElementById("tkreplyform-"+a);if(l){l.classList.toggle("show");const m=s.find(p=>p._id===a);ue("tkreplyup-"+a,{existing:m?m.adminAttachments:[]})}}}),o.querySelectorAll(".tk-reply-cancel").forEach(n=>{n.onclick=()=>{const a=document.getElementById("tkreplyform-"+n.dataset.tkid);a&&a.classList.remove("show")}}),o.querySelectorAll(".tk-reply-save").forEach(n=>{n.onclick=async()=>{const a=n.dataset.tkid,l=document.getElementById("tkreplytxt-"+a);if(!l)return;const m=pe("tkreplyup-"+a);try{await V("/tickets/"+a,{adminReply:l.value.trim(),adminAttachments:m}),$("Response saved! 🛡️"),D(e,i,t)}catch(p){$(p.message,!0)}}}),o.querySelectorAll(".tk-del-btn").forEach(n=>{n.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await ne("/tickets/"+n.dataset.tkid),$("Ticket deleted"),D(e,i,t)}catch(a){$(a.message,!0)}}}))}function Ge(e,i=!1){const t=e.replace(/[^a-z0-9]/gi,"");D(e,t,i),ue("tkup-"+t);const o=document.querySelector(`[data-jobid="${e}"].ticket-toggle-btn`);o&&(o.onclick=()=>{const a=document.getElementById("tkform-"+t);if(!a)return;const l=a.style.display==="block";a.style.display=l?"none":"block",o.textContent=l?"+ Raise Ticket":"✕ Cancel"});const s=document.querySelector(`.tk-cancel-btn[data-safeid="${t}"]`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+t);a&&(a.style.display="none"),o&&(o.textContent="+ Raise Ticket")});const n=document.querySelector(`.tk-submit-btn[data-safeid="${t}"]`);n&&(n.onclick=async()=>{var S,w;const a=(S=(document.getElementById("tksub-"+t)||{}).value)==null?void 0:S.trim(),l=(w=(document.getElementById("tkmsg-"+t)||{}).value)==null?void 0:w.trim(),m=(document.getElementById("tkpri-"+t)||{}).value,p=pe("tkup-"+t);if(!a){$("Please enter a subject",!0);return}if(!l){$("Please enter a message",!0);return}n.disabled=!0,n.textContent="Submitting…";try{await oe("/tickets",{jobId:e,subject:a,message:l,priority:m,attachments:p}),$("Ticket submitted! 🎫");const u=document.getElementById("tkform-"+t);u&&(u.style.display="none"),o&&(o.textContent="+ Raise Ticket");const h=document.getElementById("tksub-"+t),f=document.getElementById("tkmsg-"+t);h&&(h.value=""),f&&(f.value=""),Se("tkup-"+t,[]),D(e,t,i)}catch(u){$(u.message,!0)}finally{n.disabled=!1,n.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function Ye(){return""}function Qe(){}window.__setTheme=function(e){P(e)};Object.assign(window,{getToken:ee,getUser:j,setSession:Ie,clearSession:te,requireAuth:Ee,initTheme:be,api:L,apiGet:ie,apiPost:oe,apiPut:V,apiPatch:Me,apiDelete:ne,fmtINR:Y,fmtHours:Te,escapeHtml:g,fmtDate:q,flashToast:$,openModal:se,logout:O,getTheme:M,setTheme:P,initServiceWorker:ae,playNotificationChime:le,triggerPhoneVibration:re,requestNotificationPermission:xe,triggerSystemNotification:J,fmtFileSize:W,getFileCategory:H,isImageAttachment:He,openFilePreviewModal:ce,renderAttachmentChips:X,uploadFilesToServer:Z,renderAttachmentUploader:de,bindAttachmentUploader:ue,getUploaderAttachments:pe,setUploaderAttachments:Se,renderRoleSwitcher:Ye,bindRoleSwitcher:Qe,renderNotificationBell:Be,initNotificationBell:$e,renderAppShell:Le,bindAppShellEvents:Ae,renderSkeletonCards:Pe,renderEmptyState:je,renderKpiCard:ze,renderBadge:Ue,renderProgressBar:Oe,renderPeriodPicker:Re,renderSupportTicketSection:Ve,bindSupportTicketSection:Ge});export{Ee as a,Ae as b,ie as c,q as d,g as e,Y as f,oe as g,$ as h,be as i,ne as j,V as k,j as l,ee as m,se as o,Le as r,Ie as s};
