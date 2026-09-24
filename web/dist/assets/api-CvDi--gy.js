(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=e(a);fetch(a.href,o)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const ht="/api";function Z(){return localStorage.getItem("ci360_token")}function rt(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function bt(t,i){localStorage.setItem("ci360_token",t),localStorage.setItem("ci360_user",JSON.stringify(i))}function X(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function yt(t){const i=Z(),e=rt();return!i||!e?(window.location.href="/login",null):t&&e.role!==t&&e.role!=="superadmin"?(window.location.href=e.role==="superadmin"?"/admin":e.role==="employee"?"/employee":"/client",null):e}async function _(t,i={}){const e=Z(),n=Object.assign({"Content-Type":"application/json"},i.headers||{});e&&(n.Authorization="Bearer "+e);const a=await fetch(ht+t,Object.assign({},i,{headers:n}));if(a.status===401)throw X(),window.location.href="/login",new Error("Session expired");let o=null;try{o=await a.json()}catch{}if(!a.ok)throw new Error(o&&o.error||"Server status "+a.status+" — Backend waking up, please retry in 10s.");return o}const tt=t=>_(t,{method:"GET"}),F=(t,i)=>_(t,{method:"POST",body:JSON.stringify(i)}),O=(t,i)=>_(t,{method:"PUT",body:JSON.stringify(i)}),kt=(t,i)=>_(t,{method:"PATCH",body:JSON.stringify(i)}),et=t=>_(t,{method:"DELETE"});function wt(t){return t=Number(t)||0,"₹"+t.toLocaleString("en-IN",{maximumFractionDigits:0})}function xt(t){return(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function p(t){return t==null?"":String(t).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function V(t){return t?new Date(t).toISOString().slice(0,10):"—"}function C(){return localStorage.getItem("ci360_theme")||"light"}function D(t){localStorage.setItem("ci360_theme",t),document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),s=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),s&&(s.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const a=document.getElementById("mmsToggleThemeBtn");if(a){const o=a.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function ct(){const t=C();document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),s=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),s&&(s.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const a=document.getElementById("mmsToggleThemeBtn");if(a){const o=a.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{ct()}catch{}function y(t,i){const e=document.createElement("div");e.className="toast",e.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",e.textContent=(i?"⚠️  ":"✓  ")+t,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>e.remove(),200)},2800)}function dt(t){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${t}</div>`,i.onclick=e=>{e.target===i&&i.remove()},document.body.appendChild(i),i}function P(){X(),window.location.href="/login"}let j=null;async function it(){if("serviceWorker"in navigator)try{j=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",j.scope)}catch(t){console.warn("CI360 Service Worker registration notice:",t)}}try{it()}catch{}function pt(){try{const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const i=new t;i.state==="suspended"&&i.resume();const e=i.currentTime,n=i.createOscillator(),a=i.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,e),a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(.2,e+.02),a.gain.exponentialRampToValueAtTime(.001,e+.35),n.connect(a),a.connect(i.destination),n.start(e),n.stop(e+.35);const o=i.createOscillator(),s=i.createGain();o.type="sine",o.frequency.setValueAtTime(880,e+.12),s.gain.setValueAtTime(0,e+.12),s.gain.linearRampToValueAtTime(.22,e+.14),s.gain.exponentialRampToValueAtTime(.001,e+.55),o.connect(s),s.connect(i.destination),o.start(e+.12),o.stop(e+.55)}catch{}}function ut(){try{"vibrate"in navigator&&navigator.vibrate([150,80,150])}catch{}}function Bt(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function mt(){try{if(Bt()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function G(){if(!("Notification"in window))return y("Your browser does not support notifications.",!0),!1;try{const t=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return t==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),y("Notifications enabled for this device!"),await z({title:"CI360 Notifications Active 🔔",message:"You will now receive instant alerts on this phone & browser for jobs and tasks.",tag:"ci360-active"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),y("Notification permission was declined.",!0),!1)}catch(t){console.error("Notification permission request error:",t)}return!1}async function z({title:t,message:i,type:e,id:n,url:a}){var s;if(pt(),ut(),!("Notification"in window)||Notification.permission!=="granted")return;const o={body:i||"You have a new update in CI360.",icon:"/logo.png",badge:"/logo.png",tag:n||"ci360-"+Date.now(),renotify:!0,vibrate:[150,80,150],data:{url:a||window.location.href,type:e||"general"}};try{if(j&&j.showNotification){await j.showNotification(t,o);return}const r=await((s=navigator.serviceWorker)==null?void 0:s.ready);if(r&&r.showNotification){await r.showNotification(t,o);return}}catch(r){console.warn("Service Worker notification dispatch:",r)}try{const r=new Notification(t,o);r.onclick=()=>{window.focus(),r.close()}}catch(r){console.warn("Window Notification fallback notice:",r)}}function ft(){return`
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
            <button id="testNotifBtn" type="button" class="btn ghost small notif-action-btn" title="Test notification delivery on this phone/browser">🧪 Test</button>
            <button id="markAllReadBtn" type="button" class="btn ghost small notif-action-btn">Mark Read</button>
            <button id="clearNotifBtn" type="button" class="btn ghost small notif-action-btn">Clear</button>
            <button id="notifCloseBtn" type="button" class="notif-mobile-close" aria-label="Close notifications">✕</button>
          </div>
        </div>

        ${!mt()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
    </div>`}function gt(){const t=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),e=document.getElementById("notifBadge"),n=document.getElementById("notifList"),a=document.getElementById("clearNotifBtn"),o=document.getElementById("markAllReadBtn"),s=document.getElementById("testNotifBtn"),r=document.getElementById("notifEnableBtn"),v=document.getElementById("notifDismissBannerBtn"),f=document.getElementById("notifPermissionBanner"),k=document.getElementById("notifUnreadBadge");if(!t||!i)return;it();function g(){const l=document.getElementById("notifPermissionBanner");l&&(l.classList.add("hidden"),l.style.setProperty("display","none","important"),l.remove())}function b(){if(mt()){g();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?g():Notification.permission==="default"&&f&&f.style.setProperty("display","flex","important"))}b(),v&&(v.onclick=l=>{l.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),g()}),r&&(r.onclick=async l=>{l.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),g(),await G(),g()});let x=new Set;try{const l=localStorage.getItem("ci360_seen_notif_ids");l&&(x=new Set(JSON.parse(l)))}catch{}let m=!localStorage.getItem("ci360_notifs_initialized"),B=[],$="all";function M(l){return l?l.startsWith("task_completed")?"🎉":l.startsWith("task_due")?"⚡":l.startsWith("task")?"✅":l.startsWith("target_completed")?"🎉":l.startsWith("target")?"🎯":l.startsWith("job_due")?"⏳":l.startsWith("job")?"📋":l.startsWith("ticket")?"🎫":l.startsWith("status")?"🔄":l.startsWith("test")?"🧪":"🔔":"🔔"}function N(l){if(!l)return"";const d=new Date(l),I=Math.floor((new Date-d)/1e3);if(I<60)return"Just now";const H=Math.floor(I/60);if(H<60)return`${H}m ago`;const W=Math.floor(H/60);if(W<24)return`${W}h ago`;const K=Math.floor(W/24);return K===1?"Yesterday":K<7?`${K}d ago`:V(l)}function c(){if(!n)return;let l=B;if($==="task"?l=B.filter(d=>(d.type||"").includes("task")):$==="target"?l=B.filter(d=>(d.type||"").includes("target")):$==="job"?l=B.filter(d=>(d.type||"").includes("job")):$==="ticket"&&(l=B.filter(d=>(d.type||"").includes("ticket"))),l.length===0){n.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${$==="all"?"":$+" "}notifications</div>`;return}n.innerHTML=l.map(d=>{const w=M(d.type);return`
        <div class="notif-item ${d.read?"":"unread"}" data-id="${d._id}" data-type="${p(d.type||"")}">
          <div class="notif-icon">${w}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${p(d.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${N(d.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${p(d.message)}</div>
          </div>
        </div>`}).join(""),n.querySelectorAll(".notif-item").forEach(d=>{d.onclick=async()=>{const w=d.dataset.id,I=d.dataset.type;if(w&&d.classList.contains("unread")){d.classList.remove("unread");try{await _(`/notifications/${w}/read`,{method:"PATCH"})}catch{}}L(),I&&I.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):I&&I.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("jobs"):I&&I.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):I&&I.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}})}async function h(){try{const l=await tt("/notifications");B=l.notifications||[];const d=l.unreadCount||0;e.textContent=d>99?"99+":d,e.style.display=d>0?"flex":"none",k&&(k.textContent=d>0?`${d} new`:"",k.style.display=d>0?"inline-block":"none"),m?(B.forEach(w=>x.add(String(w._id))),m=!1,localStorage.setItem("ci360_notifs_initialized","1")):B.forEach(w=>{!w.read&&!x.has(String(w._id))&&(x.add(String(w._id)),z({title:w.title||"CI360 Alert",message:w.message||"",type:w.type,id:w._id}))});try{localStorage.setItem("ci360_seen_notif_ids",JSON.stringify(Array.from(x).slice(-100)))}catch{}c()}catch{n&&B.length===0&&(n.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}h();const T=setInterval(h,15e3);window.addEventListener("beforeunload",()=>clearInterval(T)),s&&(s.onclick=async l=>{if(l.stopPropagation(),!("Notification"in window&&Notification.permission!=="granted"&&!await G()))try{s.disabled=!0,s.textContent="…";const w=(await F("/notifications/test",{})).notification||{title:"🔔 CI360 Alert Test",message:`Test alert delivered at ${new Date().toLocaleTimeString()}!`};await z({title:w.title,message:w.message,type:"test_alert",id:w._id||Date.now()}),y("✓ Test notification delivered to your device!"),await h()}catch{await z({title:"🔔 CI360 Alert Test",message:`Local test notification delivered at ${new Date().toLocaleTimeString()}!`}),y("✓ Local test notification delivered!")}finally{s.disabled=!1,s.textContent="🧪 Test"}}),i.querySelectorAll(".notif-filter-btn").forEach(l=>{l.onclick=d=>{d.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(w=>w.classList.remove("active")),l.classList.add("active"),$=l.dataset.filter,c()}});const S=document.getElementById("notifBackdrop");function U(){i.style.display="flex",i.classList.add("open"),S&&(S.style.display="block",S.classList.add("open")),t.setAttribute("aria-expanded","true"),b();const l=document.getElementById("topbarUserDropdown");l&&(l.style.display="none"),h()}function L(){i.style.display="none",i.classList.remove("open"),S&&(S.style.display="none",S.classList.remove("open")),t.setAttribute("aria-expanded","false")}function q(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?L():U()}window.ci360CloseNotifications=L;const u=document.getElementById("notifCloseBtn");u&&(u.onclick=l=>{l.stopPropagation(),L()}),S&&(S.onclick=l=>{l.stopPropagation(),L()}),t.onclick=l=>{l.stopPropagation(),q()},o&&(o.onclick=async l=>{l.stopPropagation();try{await _("/notifications/read",{method:"PATCH"}),e.style.display="none",k&&(k.textContent="",k.style.display="none"),B.forEach(d=>d.read=!0),c(),y("All notifications marked as read")}catch(d){y(d.message,!0)}}),document.addEventListener("click",l=>{!i.contains(l.target)&&l.target!==t&&(i.style.display="none")}),a&&(a.onclick=async l=>{l.stopPropagation();try{await et("/notifications"),B=[],n.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',e.style.display="none",k&&(k.textContent="",k.style.display="none"),y("Notifications cleared")}catch(d){y(d.message,!0)}})}function $t({user:t,currentRole:i,activeTab:e,tabs:n,title:a,subtitle:o}){const s=t&&t.name?t.name.charAt(0).toUpperCase():"U",r=t&&t.role==="superadmin"?"Super Admin":t&&t.role==="employee"?"Employee":t&&t.role==="client"?"Client":t&&t.role?t.role.toUpperCase():"User",v=t&&t.name?t.name:"User",f=t&&t.email?t.email:t&&t.username?t.username:"",k=n&&n.some(m=>m.key==="logjob"),g=n&&n.find(m=>m.key===e),b=a||g&&g.label||"Dashboard";let x=[];return i==="superadmin"?x=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="dashboard"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(e),isMore:!0}]:i==="employee"?x=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:e==="myjobs"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"tickets",label:"Tickets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></svg>',active:e==="tickets"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:e==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","tickets","targets"].includes(e),isMore:!0}]:x=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"jobs",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:e==="jobs"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","team"].includes(e),isMore:!0}],`
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
          <div class="user-avatar">${s}</div>
          <div class="user-details">
            <div class="name">${p(t?t.name:"User")}</div>
            <div class="role">${p(r)}</div>
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
              <div class="topbar-breadcrumbs">
                <span class="topbar-crumb-app">
                  <span class="status-indicator-dot"></span>
                  CI360
                </span>
                <span class="topbar-crumb-sep">/</span>
                <span class="topbar-crumb-portal">${p(r)}</span>
                <span class="topbar-crumb-sep">/</span>
                <span class="topbar-crumb-active">${p(b)}</span>
              </div>
              <div class="topbar-title-row">
                <h1 class="page-heading-title">${p(b)}</h1>
                ${o?`<span class="topbar-subtitle-pill" title="${p(o)}">${p(o)}</span>`:""}
              </div>
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

            ${k?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${C()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${C()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${ft()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${s}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${p(v)}</span>
                  <span class="topbar-user-role-badge">${p(r)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${s}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${p(v)}</div>
                      ${f?`<div class="tud-email">${p(f)}</div>`:""}
                      <span class="tud-role-chip">${p(r)}</span>
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
                      <span class="tud-icon">${C()==="dark"?"☀️":"🌙"}</span>
                      <span class="tud-label">Switch to ${C()==="dark"?"Light":"Dark"} Mode</span>
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
                        <span style="font-size:16px" id="tudMobileThemeIcon">${C()==="dark"?"☀️":"🌙"}</span>
                        <span id="tudMobileThemeText">${C()==="dark"?"Light Mode":"Dark Mode"}</span>
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
          ${x.map(m=>`
            <button type="button" class="mbn-item ${m.active?"active":""}" data-tab="${m.key}" ${m.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${m.iconSvg}</span>
              <span class="mbn-label">${p(m.label)}</span>
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
                  <span class="mms-card-label">${p(m.label)}</span>
                </button>
              `).join("")}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${C()==="dark"?"☀️ Light Mode":"🌙 Dark Mode"}</span>
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
    </div>`}function St(t){const i=document.getElementById("mobileNavToggle"),e=document.getElementById("appSidebar"),n=document.getElementById("sidebarOverlay");function a(){e&&e.classList.add("open"),n&&n.classList.add("open")}function o(){e&&e.classList.remove("open"),n&&n.classList.remove("open")}i&&(i.onclick=a),n&&(n.onclick=o);const s=document.getElementById("mobileMoreBackdrop"),r=document.getElementById("mobileMoreSheet"),v=document.getElementById("mmsCloseBtn"),f=document.getElementById("mobileMoreBtn");function k(){s&&s.classList.add("active"),r&&r.classList.add("active")}function g(){s&&s.classList.remove("active"),r&&r.classList.remove("active")}f&&(f.onclick=u=>{u.stopPropagation(),k()}),v&&(v.onclick=g),s&&(s.onclick=u=>{u.target===s&&g()}),document.querySelectorAll(".mbn-item").forEach(u=>{u.dataset.tab&&u.dataset.tab!=="__more__"&&(u.onclick=()=>{g(),t&&t(u.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(u=>{u.onclick=()=>{g(),t&&t(u.dataset.tab)}});const b=document.getElementById("mmsToggleThemeBtn");b&&(b.onclick=()=>{D(C()==="dark"?"light":"dark")});const x=document.getElementById("mmsNotifsBtn");x&&(x.onclick=()=>{g();const u=document.getElementById("notifBellBtn");u&&u.click()});const m=document.getElementById("mmsLogoutBtn");m&&(m.onclick=P);const B=document.getElementById("mobileCalBtn");B&&(B.onclick=()=>{const u=document.querySelector(".period-row");u&&(u.scrollIntoView({behavior:"smooth",block:"center"}),u.classList.add("pulse-highlight"),setTimeout(()=>u.classList.remove("pulse-highlight"),1200))});const $=document.getElementById("tudMobileThemeBtn");$&&($.onclick=u=>{u.stopPropagation(),D(C()==="dark"?"light":"dark")});const M=document.getElementById("tudMobileNotifsBtn");M&&(M.onclick=u=>{u.stopPropagation();const l=document.getElementById("topbarUserDropdown");l&&(l.style.display="none");const d=document.getElementById("notifBellBtn");d&&d.click()});const N=document.getElementById("tudMobileSettingsBtn");N&&(N.onclick=u=>{u.stopPropagation();const l=document.getElementById("topbarUserDropdown");l&&(l.style.display="none"),document.querySelector('[data-tab="manage"]')&&t?t("manage"):k()});const c=document.getElementById("tudMobileHelpBtn");c&&(c.onclick=u=>{u.stopPropagation();const l=document.getElementById("topbarUserDropdown");l&&(l.style.display="none"),document.querySelector('[data-tab="tickets"]')&&t?t("tickets"):dt(`
          <div style="padding:24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">💬</div>
            <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
            <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
              For immediate technical assistance, client onboarding, or support tickets, reach out to your system administrator or use the Support Tickets portal.
            </p>
            <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
          </div>
        `)});const h=document.getElementById("logoutBtnMobile");h&&(h.onclick=P);const T=document.getElementById("topbarUserBtn"),S=document.getElementById("topbarUserDropdown");T&&S&&(T.onclick=u=>{u.stopPropagation();const l=S.style.display!=="none";S.style.display=l?"none":"block",T.setAttribute("aria-expanded",String(!l)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",u=>{!S.contains(u.target)&&!T.contains(u.target)&&(S.style.display="none",T.setAttribute("aria-expanded","false"))}));const U=document.getElementById("tudThemeToggleBtn");U&&(U.onclick=()=>{D(C()==="dark"?"light":"dark")});const L=document.getElementById("topbarQuickLogJobBtn");L&&(L.onclick=()=>{t&&t("logjob")});const q=document.getElementById("logoutBtn");q&&(q.onclick=P),gt(),document.querySelectorAll(".sidebar-item").forEach(u=>{u.onclick=()=>{o(),t&&t(u.dataset.tab)}}),Ct(t)}function Ct(t){const i=document.getElementById("cmdPaletteBackdrop"),e=document.getElementById("cmdSearchInput"),n=document.getElementById("cmdResultsList"),a=document.getElementById("topbarCmdTrigger"),o=document.getElementById("topbarCmdTriggerMobile"),s=document.getElementById("tudCmdBtn"),r=document.getElementById("cmdCloseKbd");if(!i||!e||!n)return;const v=Array.from(document.querySelectorAll(".sidebar-item")),f=v.map(c=>{var h,T;return{type:"tab",id:c.dataset.tab,label:((h=c.querySelector("span:last-child"))==null?void 0:h.textContent)||c.dataset.tab,icon:((T=c.querySelector(".icon"))==null?void 0:T.textContent)||"📌",sub:"Navigate to section",action:()=>{t&&t(c.dataset.tab)}}});v.some(c=>c.dataset.tab==="logjob")&&f.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{t&&t("logjob")}}),f.push({type:"action",id:"toggle-theme",label:C()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{D(C()==="dark"?"light":"dark")}}),f.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const c=document.getElementById("notifBellBtn");c&&c.click()}}),f.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>P()});let g=0,b=[...f];function x(){if(!b.length){n.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}n.innerHTML=b.map((c,h)=>`
      <div class="cmd-result ${h===g?"selected":""}" data-idx="${h}">
        <div class="cmd-result-icon">${c.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${p(c.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${p(c.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),n.querySelectorAll(".cmd-result").forEach(c=>{c.onmouseenter=()=>{g=Number(c.dataset.idx),m()},c.onclick=()=>{B(Number(c.dataset.idx))}})}function m(){n.querySelectorAll(".cmd-result").forEach((c,h)=>{c.classList.toggle("selected",h===g)})}function B(c){const h=b[c];h&&h.action&&(M(),h.action())}function $(){const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),i.classList.add("open"),e.value="",b=[...f],g=0,x(),setTimeout(()=>e.focus(),50)}function M(){i.classList.remove("open"),e.blur()}a&&(a.onclick=$),o&&(o.onclick=$),s&&(s.onclick=()=>{const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),$()}),r&&(r.onclick=M),i.onclick=c=>{c.target===i&&M()},e.oninput=()=>{const c=e.value.trim().toLowerCase();c?b=f.filter(h=>h.label.toLowerCase().includes(c)||h.sub.toLowerCase().includes(c)):b=[...f],g=0,x()},e.onkeydown=c=>{if(c.key==="ArrowDown"){if(c.preventDefault(),b.length>0){g=(g+1)%b.length,m();const h=n.querySelector(".cmd-result.selected");h&&h.scrollIntoView({block:"nearest"})}}else if(c.key==="ArrowUp"){if(c.preventDefault(),b.length>0){g=(g-1+b.length)%b.length,m();const h=n.querySelector(".cmd-result.selected");h&&h.scrollIntoView({block:"nearest"})}}else c.key==="Enter"?(c.preventDefault(),B(g)):c.key==="Escape"&&(c.preventDefault(),M())};const N=c=>{(c.metaKey||c.ctrlKey)&&c.key.toLowerCase()==="k"?(c.preventDefault(),i.classList.contains("open")?M():$()):c.key==="Escape"&&i.classList.contains("open")&&M()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=N,window.addEventListener("keydown",N)}function Mt(t=4){return`
    <div class="grid grid-${Math.min(t,4)}" style="margin-bottom:24px">
      ${Array(t).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function It(t,i,e="📁",n=""){return`
    <div class="empty">
      <span class="empty-icon">${e}</span>
      <h3>${p(t)}</h3>
      <p>${p(i)}</p>
      ${n}
    </div>`}function Et(t,i,e="",n="📊",a=""){let o="";return a&&(o=`<span class="kpi-trend ${a.startsWith("+")||a.includes("↑")||a.toLowerCase().includes("up")?"up":"down"}">${p(a)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${p(t)}</span>
        <div class="kpi-icon">${n}</div>
      </div>
      <div class="kpi-value">${p(i)}</div>
      <div class="kpi-sub">${o}<span>${p(e)}</span></div>
    </div>`}function Tt(t,i="gray"){return`<span class="badge ${i}">${p(t)}</span>`}function Lt(t,i="indigo"){const e=Math.min(100,Math.max(0,Number(t)||0));return`
    <div class="progress-bar-wrap" title="${e.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${e}%"></div>
    </div>`}function _t(t){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([e,n])=>`<button class="pchip ${t===e?"active":""}" data-period="${e}">${n}</button>`).join("")}</div>`}function Nt(t){if(!t)return"U";const i=t.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function lt(t){if(!t)return"";const i=new Date,e=new Date(t),n=Math.floor((i-e)/1e3);if(n<60)return"Just now";const a=Math.floor(n/60);if(a<60)return`${a}m ago`;const o=Math.floor(a/60);if(o<24)return`${o}h ago`;const s=Math.floor(o/24);return s<7?`${s}d ago`:V(t)}function J(t){if(t=Number(t)||0,t===0)return"0 B";const i=1024,e=["B","KB","MB","GB"],n=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,n)).toFixed(1))+" "+e[n]}function R(t="",i=""){const e=(t.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(e)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:e==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(e)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(e)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(e)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(e)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(e)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function At(t){return t?R(t.name||t.filename||"",t.type||"").cls==="img":!1}function ot(t){if(!t||!t.url)return;const i=R(t.name,t.type),e=i.cls==="img",n=i.cls==="pdf",a=p(t.name||"Attachment"),o=J(t.size),s=document.createElement("div");s.className="preview-modal-overlay",s.innerHTML=`
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${i.icon}</span>
          <span>${a}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${o})</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="${t.url}" download="${a}" target="_blank" class="btn ghost small" style="font-size:12px;padding:4px 10px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
          <button type="button" class="btn ghost small preview-modal-close" style="padding:4px 8px;font-size:14px">✕</button>
        </div>
      </div>
      <div class="preview-modal-body">
        ${e?`
          <img src="${t.url}" alt="${a}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${t.url}','_blank')">
        `:n?`
          <iframe src="${t.url}" title="${a}"></iframe>
        `:`
          <div style="text-align:center;padding:40px 20px">
            <div style="font-size:48px;margin-bottom:12px">${i.icon}</div>
            <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${a}</div>
            <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${o}</div>
            <a href="${t.url}" download="${a}" target="_blank" class="btn gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Attachment
            </a>
          </div>
        `}
      </div>
    </div>
  `,s.onclick=r=>{(r.target===s||r.target.closest(".preview-modal-close"))&&s.remove()},document.body.appendChild(s)}function Q(t=[],i={}){if(!t||!t.length)return"";const e=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${p(i.title)} <span style="font-weight:500;color:var(--text-4)">(${t.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${t.map((n,a)=>{const o=R(n.name,n.type),s=p(n.name||"File"),r=J(n.size);return`
            <div class="attachment-chip" data-idx="${a}" title="${s} (${r})">
              <span class="file-type-icon ${o.cls}" style="width:22px;height:22px;font-size:12px">${o.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${a}, this)">${s}</span>
              <span class="attachment-chip-size">${r}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${a}, this)">👁️</button>
                <a href="${n.url}" download="${s}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${e?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${a}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const E={};async function Y(t){const i=Array.from(t||[]);if(!i.length)return[];const n=(await Promise.all(i.map(async a=>new Promise(o=>{const s=new FileReader;s.onload=()=>{o({name:a.name,type:a.type,size:a.size,base64:s.result,data:s.result})},s.onerror=()=>o(null),s.readAsDataURL(a)})))).filter(Boolean);if(!n.length)return[];try{const a=await F("/upload",{files:n});if(a&&a.files&&a.files.length)return a.files}catch(a){console.warn("Backend upload failed, fallback to base64 data URLs:",a)}return n.map(a=>({name:a.name,url:a.base64,size:a.size,type:a.type,uploadedAt:new Date}))}function nt({id:t="uploader",label:i="Attachments & Files",subtitle:e="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:n=!0,accept:a="*/*",maxFiles:o=10}={}){return`
    <div class="uploader-container" id="container-${t}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${p(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${t}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${t}">
        <input type="file" id="input-${t}" ${n?"multiple":""} accept="${a}" style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${p(e)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${t}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${t}"></div>
    </div>
  `}function st(t,i={}){const e=document.getElementById("zone-"+t),n=document.getElementById("input-"+t),a=document.getElementById("list-"+t),o=document.getElementById("count-"+t);E[t]=i.existing?[...i.existing]:[];function s(){const r=E[t]||[];if(o&&(o.textContent=`${r.length} file${r.length===1?"":"s"} attached`),!!a){if(!r.length){a.innerHTML="";return}a.innerHTML=r.map((v,f)=>{const k=R(v.name,v.type),g=p(v.name||"File"),b=J(v.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${k.cls}">${k.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${g}">${g}</div>
              <div class="uploader-file-size">${k.label} · ${b}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${t}', ${f})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${t}', ${f})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(r)}}window.__removeUploaderFile=(r,v)=>{if(E[r]){E[r].splice(v,1);const f=window[`__update_${r}`];f&&f()}},window.__previewUploaderFile=(r,v)=>{const f=(E[r]||[])[v];f&&ot(f)},window[`__update_${t}`]=s,e&&n&&(e.onclick=r=>{r.target.tagName!=="BUTTON"&&!r.target.closest("button")&&n.click()},e.ondragover=r=>{r.preventDefault(),e.classList.add("dragover")},e.ondragleave=()=>e.classList.remove("dragover"),e.ondrop=async r=>{if(r.preventDefault(),e.classList.remove("dragover"),r.dataTransfer&&r.dataTransfer.files&&r.dataTransfer.files.length){y("Uploading files… ⏳");const v=await Y(r.dataTransfer.files);E[t]=[...E[t]||[],...v],s(),y("Files attached! ✓")}},n.onchange=async()=>{if(n.files&&n.files.length){y("Uploading files… ⏳");const r=await Y(n.files);E[t]=[...E[t]||[],...r],s(),y("Files attached! ✓"),n.value=""}}),s()}function at(t){return E[t]||[]}function vt(t,i=[]){E[t]=[...i];const e=window[`__update_${t}`];e&&e()}window.__openPreview=(t,i)=>{const e=i.closest(".attachment-chips-wrap");if(!e)return;const n=i.closest(".attachment-chip");if(!n)return;const a=Number(n.dataset.idx),o=e.dataset.attachments;if(o)try{const s=JSON.parse(decodeURIComponent(o));s[a]&&ot(s[a])}catch{}};function Dt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");return`
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
        ${nt({id:"tkup-"+e,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const Pt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},jt={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function zt(t,i){const e=(t.status||"Open").toLowerCase().replace(" ","-"),n=t.status==="Open",a=(t._id||"").slice(-4).toUpperCase(),o=Nt(t.userName),s=encodeURIComponent(JSON.stringify(t.attachments||[])),r=encodeURIComponent(JSON.stringify(t.adminAttachments||[]));return`
    <div class="ticket-card status-${e}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${a}</span>
            <span class="ticket-subject">${p(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${Pt[t.status]||"gray"}">
            ${n?'<span class="pulse-dot"></span>':""} ${p(t.status)}
          </span>
          <span class="badge ${jt[t.priority]||"gray"}">${p(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${o}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${p(t.userName)}
            <span class="ticket-role-pill">${p(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${lt(t.createdAt)} · ${V(t.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${p(t.message)}</div>

      ${t.attachments&&t.attachments.length?`
        <div data-attachments="${s}">
          ${Q(t.attachments,{title:"Ticket Attachments"})}
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
              ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${lt(t.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${p(t.adminReply)}</div>
            ${t.adminAttachments&&t.adminAttachments.length?`
              <div data-attachments="${r}">
                ${Q(t.adminAttachments,{title:"Support Attached Files"})}
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
            <textarea id="tkreplytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${p(t.adminReply||"")}</textarea>
            ${nt({id:"tkreplyup-"+t._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function A(t,i,e){const n=document.getElementById("tklist-"+i),a=document.getElementById("tkcnt-"+i);if(n)try{const o=await tt("/tickets/job/"+t);a&&(a.textContent=o.length),o.length?(n.innerHTML=o.map(s=>zt(s,e)).join(""),Rt(t,i,e,n,o)):n.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{n.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function Rt(t,i,e,n,a){e&&(n.querySelectorAll(".tk-status-sel").forEach(o=>{o.onchange=async()=>{try{await O("/tickets/"+o.dataset.tkid,{status:o.value}),y("Status updated"),A(t,i,e)}catch(s){y(s.message,!0)}}}),n.querySelectorAll(".tk-quick-resolve-btn").forEach(o=>{o.onclick=async()=>{try{await O("/tickets/"+o.dataset.tkid,{status:"Resolved"}),y("Ticket marked as Resolved! 🎉"),A(t,i,e)}catch(s){y(s.message,!0)}}}),n.querySelectorAll(".ticket-template-btn").forEach(o=>{o.onclick=()=>{const s=document.getElementById("tkreplytxt-"+o.dataset.tkid);s&&(s.value=o.dataset.tpl,s.focus())}}),n.querySelectorAll(".tk-reply-toggle").forEach(o=>{o.onclick=()=>{const s=o.dataset.tkid,r=document.getElementById("tkreplyform-"+s);if(r){r.classList.toggle("show");const v=a.find(f=>f._id===s);st("tkreplyup-"+s,{existing:v?v.adminAttachments:[]})}}}),n.querySelectorAll(".tk-reply-cancel").forEach(o=>{o.onclick=()=>{const s=document.getElementById("tkreplyform-"+o.dataset.tkid);s&&s.classList.remove("show")}}),n.querySelectorAll(".tk-reply-save").forEach(o=>{o.onclick=async()=>{const s=o.dataset.tkid,r=document.getElementById("tkreplytxt-"+s);if(!r)return;const v=at("tkreplyup-"+s);try{await O("/tickets/"+s,{adminReply:r.value.trim(),adminAttachments:v}),y("Response saved! 🛡️"),A(t,i,e)}catch(f){y(f.message,!0)}}}),n.querySelectorAll(".tk-del-btn").forEach(o=>{o.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await et("/tickets/"+o.dataset.tkid),y("Ticket deleted"),A(t,i,e)}catch(s){y(s.message,!0)}}}))}function Ut(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");A(t,e,i),st("tkup-"+e);const n=document.querySelector(`[data-jobid="${t}"].ticket-toggle-btn`);n&&(n.onclick=()=>{const s=document.getElementById("tkform-"+e);if(!s)return;const r=s.style.display==="block";s.style.display=r?"none":"block",n.textContent=r?"+ Raise Ticket":"✕ Cancel"});const a=document.querySelector(`.tk-cancel-btn[data-safeid="${e}"]`);a&&(a.onclick=()=>{const s=document.getElementById("tkform-"+e);s&&(s.style.display="none"),n&&(n.textContent="+ Raise Ticket")});const o=document.querySelector(`.tk-submit-btn[data-safeid="${e}"]`);o&&(o.onclick=async()=>{var k,g;const s=(k=(document.getElementById("tksub-"+e)||{}).value)==null?void 0:k.trim(),r=(g=(document.getElementById("tkmsg-"+e)||{}).value)==null?void 0:g.trim(),v=(document.getElementById("tkpri-"+e)||{}).value,f=at("tkup-"+e);if(!s){y("Please enter a subject",!0);return}if(!r){y("Please enter a message",!0);return}o.disabled=!0,o.textContent="Submitting…";try{await F("/tickets",{jobId:t,subject:s,message:r,priority:v,attachments:f}),y("Ticket submitted! 🎫");const b=document.getElementById("tkform-"+e);b&&(b.style.display="none"),n&&(n.textContent="+ Raise Ticket");const x=document.getElementById("tksub-"+e),m=document.getElementById("tkmsg-"+e);x&&(x.value=""),m&&(m.value=""),vt("tkup-"+e,[]),A(t,e,i)}catch(b){y(b.message,!0)}finally{o.disabled=!1,o.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function qt(){return""}function Ht(){}window.__setTheme=function(t){D(t)};Object.assign(window,{getToken:Z,getUser:rt,setSession:bt,clearSession:X,requireAuth:yt,initTheme:ct,api:_,apiGet:tt,apiPost:F,apiPut:O,apiPatch:kt,apiDelete:et,fmtINR:wt,fmtHours:xt,escapeHtml:p,fmtDate:V,flashToast:y,openModal:dt,logout:P,getTheme:C,setTheme:D,initServiceWorker:it,playNotificationChime:pt,triggerPhoneVibration:ut,requestNotificationPermission:G,triggerSystemNotification:z,fmtFileSize:J,getFileCategory:R,isImageAttachment:At,openFilePreviewModal:ot,renderAttachmentChips:Q,uploadFilesToServer:Y,renderAttachmentUploader:nt,bindAttachmentUploader:st,getUploaderAttachments:at,setUploaderAttachments:vt,renderRoleSwitcher:qt,bindRoleSwitcher:Ht,renderNotificationBell:ft,initNotificationBell:gt,renderAppShell:$t,bindAppShellEvents:St,renderSkeletonCards:Mt,renderEmptyState:It,renderKpiCard:Et,renderBadge:Tt,renderProgressBar:Lt,renderPeriodPicker:_t,renderSupportTicketSection:Dt,bindSupportTicketSection:Ut});export{Z as a,F as b,rt as g,bt as s};
