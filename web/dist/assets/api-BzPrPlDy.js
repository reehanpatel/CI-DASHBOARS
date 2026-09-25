(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=e(a);fetch(a.href,o)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const xt="/api";function X(){return localStorage.getItem("ci360_token")}function H(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function Bt(t,i){localStorage.setItem("ci360_token",t),localStorage.setItem("ci360_user",JSON.stringify(i))}function tt(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function $t(t){const i=X(),e=H();return!i||!e?(window.location.href="/login",null):t&&e.role!==t&&e.role!=="superadmin"?(window.location.href=e.role==="superadmin"?"/admin":e.role==="employee"?"/employee":"/client",null):e}async function T(t,i={}){const e=X(),n=Object.assign({"Content-Type":"application/json"},i.headers||{});e&&(n.Authorization="Bearer "+e);const a=await fetch(xt+t,Object.assign({},i,{headers:n}));if(a.status===401)throw tt(),window.location.href="/login",new Error("Session expired");let o=null;try{o=await a.json()}catch{}if(!a.ok)throw new Error(o&&o.error||"Server status "+a.status+" — Backend waking up, please retry in 10s.");return o}const et=t=>T(t,{method:"GET"}),F=(t,i)=>T(t,{method:"POST",body:JSON.stringify(i)}),q=(t,i)=>T(t,{method:"PUT",body:JSON.stringify(i)}),St=(t,i)=>T(t,{method:"PATCH",body:JSON.stringify(i)}),it=t=>T(t,{method:"DELETE"});function It(t){return t=Number(t)||0,"₹"+t.toLocaleString("en-IN",{maximumFractionDigits:0})}function Ct(t){return(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function m(t){return t==null?"":String(t).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function V(t){return t?new Date(t).toISOString().slice(0,10):"—"}function $(){return localStorage.getItem("ci360_theme")||"light"}function A(t){localStorage.setItem("ci360_theme",t),document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),s=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),s&&(s.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const a=document.getElementById("mmsToggleThemeBtn");if(a){const o=a.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function mt(){const t=$();document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),s=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),s&&(s.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const a=document.getElementById("mmsToggleThemeBtn");if(a){const o=a.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{mt()}catch{}function y(t,i){const e=document.createElement("div");e.className="toast",e.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",e.textContent=(i?"⚠️  ":"✓  ")+t,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>e.remove(),200)},2800)}function ft(t){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${t}</div>`,i.onclick=e=>{e.target===i&&i.remove()},document.body.appendChild(i),i}function z(){tt(),window.location.href="/login"}let R=null;async function nt(){if("serviceWorker"in navigator)try{R=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",R.scope)}catch(t){console.warn("CI360 Service Worker registration notice:",t)}}try{nt()}catch{}let rt=0,ct=0;const D=new Set,dt=new Set;let ut=!1;function gt(t){try{const i=typeof H=="function"?H():null,e=i&&i._id?String(i._id):"default";return`${t}_${e}`}catch{return`${t}_default`}}function O(){try{const t=gt("ci360_alerted_ids"),i=localStorage.getItem(t);if(i){const e=JSON.parse(i);Array.isArray(e)&&e.forEach(n=>D.add(String(n)))}}catch{}}function G(){try{const t=gt("ci360_alerted_ids"),i=Array.from(D).slice(-2e3);localStorage.setItem(t,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",t=>{t.key&&t.key.includes("ci360_alerted_ids")&&O()});function vt(){try{const t=Date.now();if(t-rt<5e3)return;rt=t;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const e=new i;e.state==="suspended"&&e.resume();const n=e.currentTime,a=e.createOscillator(),o=e.createGain();a.type="sine",a.frequency.setValueAtTime(587.33,n),o.gain.setValueAtTime(0,n),o.gain.linearRampToValueAtTime(.2,n+.02),o.gain.exponentialRampToValueAtTime(.001,n+.35),a.connect(o),o.connect(e.destination),a.start(n),a.stop(n+.35);const s=e.createOscillator(),l=e.createGain();s.type="sine",s.frequency.setValueAtTime(880,n+.12),l.gain.setValueAtTime(0,n+.12),l.gain.linearRampToValueAtTime(.22,n+.14),l.gain.exponentialRampToValueAtTime(.001,n+.55),s.connect(l),l.connect(e.destination),s.start(n+.12),s.stop(n+.55)}catch{}}function ht(){try{const t=Date.now();if(t-ct<5e3)return;ct=t,"vibrate"in navigator&&navigator.vibrate([150,80,150])}catch{}}function Mt(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function bt(){try{if(Mt()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function Q(){if(!("Notification"in window))return y("Your browser does not support notifications.",!0),!1;try{const t=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return t==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),y("Notifications enabled for this device!"),await P({title:"CI360 Notifications Active 🔔",message:"You will now receive instant alerts on this device for jobs and tasks.",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),y("Notification permission was declined.",!0),!1)}catch(t){console.error("Notification permission request error:",t)}return!1}async function P({title:t,message:i,type:e,id:n,url:a}){const o=n?String(n):null;if(O(),o&&D.has(o)||(o&&(D.add(o),G()),vt(),ht(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return}catch{return}if(Notification.permission!=="granted")return;const s=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",l={body:i||"You have a new update in CI360.",icon:s,badge:s,tag:o?`ci360-notif-${o}`:"ci360-alert",renotify:!1,vibrate:[150,80,150],data:{url:a||(typeof window<"u"?window.location.href:""),type:e||"general"}};try{const p=new Notification(t,l);p.onclick=()=>{window.focus(),p.close()};return}catch{}try{if(R&&R.showNotification){await R.showNotification(t,l);return}if("serviceWorker"in navigator){const p=await Promise.race([navigator.serviceWorker.ready,new Promise(g=>setTimeout(()=>g(null),400))]);p&&p.showNotification&&await p.showNotification(t,l)}}catch(p){console.warn("Service Worker notification dispatch:",p)}}if(typeof window<"u"&&(window.triggerSystemNotification=P,"Notification"in window)){const t=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",t,!0)};window.addEventListener("click",t,!0)}function yt(){return`
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

        ${!bt()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
    </div>`}function kt(){const t=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),e=document.getElementById("notifBadge"),n=document.getElementById("notifList"),a=document.getElementById("clearNotifBtn"),o=document.getElementById("markAllReadBtn"),s=document.getElementById("testNotifBtn"),l=document.getElementById("notifEnableBtn"),p=document.getElementById("notifDismissBannerBtn"),g=document.getElementById("notifPermissionBanner"),x=document.getElementById("notifUnreadBadge");if(!t||!i)return;nt();function h(){const c=document.getElementById("notifPermissionBanner");c&&(c.classList.add("hidden"),c.style.setProperty("display","none","important"),c.remove())}function b(){if(bt()){h();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?h():Notification.permission==="default"&&g&&g.style.setProperty("display","flex","important"))}b(),p&&(p.onclick=c=>{c.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),h()}),l&&(l.onclick=async c=>{c.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),h(),await Q(),h()}),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),O();let k=[],f="all";function _(c){return c?c.startsWith("task_completed")?"🎉":c.startsWith("task_due")?"⚡":c.startsWith("task")?"✅":c.startsWith("target_completed")?"🎉":c.startsWith("target")?"🎯":c.startsWith("job_due")?"⏳":c.startsWith("job")?"📋":c.startsWith("ticket")?"🎫":c.startsWith("status")?"🔄":c.startsWith("test")?"🧪":"🔔":"🔔"}function E(c){if(!c)return"";const u=new Date(c),v=Math.floor((new Date-u)/1e3);if(v<60)return"Just now";const I=Math.floor(v/60);if(I<60)return`${I}m ago`;const W=Math.floor(I/60);if(W<24)return`${W}h ago`;const K=Math.floor(W/24);return K===1?"Yesterday":K<7?`${K}d ago`:V(c)}function S(){if(!n)return;let c=k;if(f==="task"?c=k.filter(u=>(u.type||"").includes("task")):f==="target"?c=k.filter(u=>(u.type||"").includes("target")):f==="job"?c=k.filter(u=>(u.type||"").includes("job")):f==="ticket"&&(c=k.filter(u=>(u.type||"").includes("ticket"))),c.length===0){n.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${f==="all"?"":f+" "}notifications</div>`;return}n.innerHTML=c.map(u=>{const d=_(u.type);return`
        <div class="notif-item ${u.read?"":"unread"}" data-id="${u._id}" data-type="${m(u.type||"")}">
          <div class="notif-icon">${d}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${m(u.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${E(u.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${m(u.message)}</div>
          </div>
        </div>`}).join(""),n.querySelectorAll(".notif-item").forEach(u=>{u.onclick=async()=>{const d=u.dataset.id,v=u.dataset.type;if(d&&u.classList.contains("unread")){u.classList.remove("unread");try{await T(`/notifications/${d}/read`,{method:"PATCH"})}catch{}}B(),v&&v.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):v&&v.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("jobs"):v&&v.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):v&&v.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}})}async function C(){try{const c=await et("/notifications");k=c.notifications||[];const u=c.unreadCount||0;if(e&&(e.textContent=u>99?"99+":u,e.style.display=u>0?"flex":"none"),x&&(x.textContent=u>0?`${u} new`:"",x.style.display=u>0?"inline-block":"none"),O(),!ut)k.forEach(d=>{const v=String(d._id);dt.add(v),D.add(v)}),G(),ut=!0;else{const d=k.filter(v=>!v.read&&!D.has(String(v._id)));if(d.length>0){for(const v of d){const I=String(v._id);dt.add(I),await P({title:v.title||"CI360 Alert",message:v.message||"",type:v.type,id:I})}G()}}S()}catch{n&&k.length===0&&(n.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=C),C(),window.__ci360PollInterval=setInterval(C,2e4),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),s&&(s.onclick=async c=>{if(c.stopPropagation(),!("Notification"in window&&Notification.permission!=="granted"&&!await Q()))try{s.disabled=!0,s.textContent="…";const d=(await F("/notifications/test",{})).notification||{title:"🔔 CI360 Alert Test",message:`Test alert delivered at ${new Date().toLocaleTimeString()}!`};await P({title:d.title,message:d.message,type:"test_alert",id:d._id||Date.now()}),y("✓ Test notification delivered to your device!"),await C()}catch{await P({title:"🔔 CI360 Alert Test",message:`Local test notification delivered at ${new Date().toLocaleTimeString()}!`,id:"ci360-test-"+Date.now()}),y("✓ Local test notification delivered!")}finally{s.disabled=!1,s.textContent="🧪 Test"}}),i.querySelectorAll(".notif-filter-btn").forEach(c=>{c.onclick=u=>{u.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(d=>d.classList.remove("active")),c.classList.add("active"),f=c.dataset.filter,S()}});const r=document.getElementById("notifBackdrop");function w(){i.style.display="flex",i.classList.add("open"),r&&(r.style.display="block",r.classList.add("open")),t.setAttribute("aria-expanded","true"),b();const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),C()}function B(){i.style.display="none",i.classList.remove("open"),r&&(r.style.display="none",r.classList.remove("open")),t.setAttribute("aria-expanded","false")}function L(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?B():w()}window.ci360CloseNotifications=B;const j=document.getElementById("notifCloseBtn");j&&(j.onclick=c=>{c.stopPropagation(),B()}),r&&(r.onclick=c=>{c.stopPropagation(),B()}),t.onclick=c=>{c.stopPropagation(),L()},o&&(o.onclick=async c=>{c.stopPropagation();try{await T("/notifications/read",{method:"PATCH"}),e.style.display="none",x&&(x.textContent="",x.style.display="none"),k.forEach(u=>u.read=!0),S(),y("All notifications marked as read")}catch(u){y(u.message,!0)}}),document.addEventListener("click",c=>{!i.contains(c.target)&&c.target!==t&&(i.style.display="none")}),a&&(a.onclick=async c=>{c.stopPropagation();try{await it("/notifications"),k=[],n.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',e.style.display="none",x&&(x.textContent="",x.style.display="none"),y("Notifications cleared")}catch(u){y(u.message,!0)}})}function Et({user:t,currentRole:i,activeTab:e,tabs:n,title:a,subtitle:o}){const s=t&&t.name?t.name.charAt(0).toUpperCase():"U",l=t&&(t.role==="superadmin"||t.role==="admin")?"Admin":t&&t.role==="employee"?"Employee":t&&t.role==="client"?"Client":t&&t.role?t.role.toUpperCase():"User",p=t&&t.name?t.name:"User",g=t&&t.email?t.email:t&&t.username?t.username:"",x=n&&n.some(f=>f.key==="logjob"),h=n&&n.find(f=>f.key===e),b=a||h&&h.label||"Dashboard";let k=[];return i==="superadmin"?k=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="dashboard"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(e),isMore:!0}]:i==="employee"?k=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:e==="myjobs"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"tickets",label:"Tickets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></svg>',active:e==="tickets"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:e==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","tickets","targets"].includes(e),isMore:!0}]:k=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"jobs",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:e==="jobs"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","team"].includes(e),isMore:!0}],`
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
            <button type="button" class="sidebar-item ${e===f.key?"active":""}" data-tab="${f.key}" aria-current="${e===f.key?"page":"false"}">
              <span class="icon">${f.icon||"📌"}</span>
              <span>${f.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${s}</div>
          <div class="user-details">
            <div class="name">${m(t?t.name:"User")}</div>
            <div class="role">${m(l)}</div>
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
                <span class="topbar-crumb-portal">${m(l)}</span>
                <span class="topbar-crumb-sep">/</span>
                <span class="topbar-crumb-active">${m(b)}</span>
              </div>
              <div class="topbar-title-row">
                <h1 class="page-heading-title">${m(b)}</h1>
                ${o?`<span class="topbar-subtitle-pill" title="${m(o)}">${m(o)}</span>`:""}
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

            ${x?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${$()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${$()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${yt()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${s}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${m(p)}</span>
                  <span class="topbar-user-role-badge">${m(l)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${s}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${m(p)}</div>
                      ${g?`<div class="tud-email">${m(g)}</div>`:""}
                      <span class="tud-role-chip">${m(l)}</span>
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
                      <span class="tud-icon">${$()==="dark"?"☀️":"🌙"}</span>
                      <span class="tud-label">Switch to ${$()==="dark"?"Light":"Dark"} Mode</span>
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
                        <span style="font-size:16px" id="tudMobileThemeIcon">${$()==="dark"?"☀️":"🌙"}</span>
                        <span id="tudMobileThemeText">${$()==="dark"?"Light Mode":"Dark Mode"}</span>
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
          ${k.map(f=>`
            <button type="button" class="mbn-item ${f.active?"active":""}" data-tab="${f.key}" ${f.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${f.iconSvg}</span>
              <span class="mbn-label">${m(f.label)}</span>
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
                <button type="button" class="mms-card ${e===f.key?"active":""}" data-tab="${f.key}">
                  <span class="mms-card-icon">${f.icon||"📌"}</span>
                  <span class="mms-card-label">${m(f.label)}</span>
                </button>
              `).join("")}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${$()==="dark"?"☀️ Light Mode":"🌙 Dark Mode"}</span>
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
    </div>`}function Tt(t){const i=document.getElementById("mobileNavToggle"),e=document.getElementById("appSidebar"),n=document.getElementById("sidebarOverlay");function a(){e&&e.classList.add("open"),n&&n.classList.add("open")}function o(){e&&e.classList.remove("open"),n&&n.classList.remove("open")}i&&(i.onclick=a),n&&(n.onclick=o);const s=document.getElementById("mobileMoreBackdrop"),l=document.getElementById("mobileMoreSheet"),p=document.getElementById("mmsCloseBtn"),g=document.getElementById("mobileMoreBtn");function x(){s&&s.classList.add("active"),l&&l.classList.add("active")}function h(){s&&s.classList.remove("active"),l&&l.classList.remove("active")}g&&(g.onclick=d=>{d.stopPropagation(),x()}),p&&(p.onclick=h),s&&(s.onclick=d=>{d.target===s&&h()}),document.querySelectorAll(".mbn-item").forEach(d=>{d.dataset.tab&&d.dataset.tab!=="__more__"&&(d.onclick=()=>{h(),t&&t(d.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(d=>{d.onclick=()=>{h(),t&&t(d.dataset.tab)}});const b=document.getElementById("mmsToggleThemeBtn");b&&(b.onclick=()=>{A($()==="dark"?"light":"dark")});const k=document.getElementById("mmsNotifsBtn");k&&(k.onclick=()=>{h();const d=document.getElementById("notifBellBtn");d&&d.click()});const f=document.getElementById("mmsLogoutBtn");f&&(f.onclick=z);const _=document.getElementById("mobileCalBtn");_&&(_.onclick=()=>{const d=document.querySelector(".period-row");d&&(d.scrollIntoView({behavior:"smooth",block:"center"}),d.classList.add("pulse-highlight"),setTimeout(()=>d.classList.remove("pulse-highlight"),1200))});const E=document.getElementById("tudMobileThemeBtn");E&&(E.onclick=d=>{d.stopPropagation(),A($()==="dark"?"light":"dark")});const S=document.getElementById("tudMobileNotifsBtn");S&&(S.onclick=d=>{d.stopPropagation();const v=document.getElementById("topbarUserDropdown");v&&(v.style.display="none");const I=document.getElementById("notifBellBtn");I&&I.click()});const C=document.getElementById("tudMobileSettingsBtn");C&&(C.onclick=d=>{d.stopPropagation();const v=document.getElementById("topbarUserDropdown");v&&(v.style.display="none"),document.querySelector('[data-tab="manage"]')&&t?t("manage"):x()});const r=document.getElementById("tudMobileHelpBtn");r&&(r.onclick=d=>{d.stopPropagation();const v=document.getElementById("topbarUserDropdown");v&&(v.style.display="none"),document.querySelector('[data-tab="tickets"]')&&t?t("tickets"):ft(`
          <div style="padding:24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">💬</div>
            <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
            <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
              For immediate technical assistance, client onboarding, or support tickets, reach out to your system administrator or use the Support Tickets portal.
            </p>
            <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
          </div>
        `)});const w=document.getElementById("logoutBtnMobile");w&&(w.onclick=z);const B=document.getElementById("topbarUserBtn"),L=document.getElementById("topbarUserDropdown");B&&L&&(B.onclick=d=>{d.stopPropagation();const v=L.style.display!=="none";L.style.display=v?"none":"block",B.setAttribute("aria-expanded",String(!v)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",d=>{!L.contains(d.target)&&!B.contains(d.target)&&(L.style.display="none",B.setAttribute("aria-expanded","false"))}));const j=document.getElementById("tudThemeToggleBtn");j&&(j.onclick=()=>{A($()==="dark"?"light":"dark")});const c=document.getElementById("topbarQuickLogJobBtn");c&&(c.onclick=()=>{t&&t("logjob")});const u=document.getElementById("logoutBtn");u&&(u.onclick=z),kt(),document.querySelectorAll(".sidebar-item").forEach(d=>{d.onclick=()=>{o(),t&&t(d.dataset.tab)}}),_t(t)}function _t(t){const i=document.getElementById("cmdPaletteBackdrop"),e=document.getElementById("cmdSearchInput"),n=document.getElementById("cmdResultsList"),a=document.getElementById("topbarCmdTrigger"),o=document.getElementById("topbarCmdTriggerMobile"),s=document.getElementById("tudCmdBtn"),l=document.getElementById("cmdCloseKbd");if(!i||!e||!n)return;const p=Array.from(document.querySelectorAll(".sidebar-item")),g=p.map(r=>{var w,B;return{type:"tab",id:r.dataset.tab,label:((w=r.querySelector("span:last-child"))==null?void 0:w.textContent)||r.dataset.tab,icon:((B=r.querySelector(".icon"))==null?void 0:B.textContent)||"📌",sub:"Navigate to section",action:()=>{t&&t(r.dataset.tab)}}});p.some(r=>r.dataset.tab==="logjob")&&g.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{t&&t("logjob")}}),g.push({type:"action",id:"toggle-theme",label:$()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{A($()==="dark"?"light":"dark")}}),g.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const r=document.getElementById("notifBellBtn");r&&r.click()}}),g.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>z()});let h=0,b=[...g];function k(){if(!b.length){n.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}n.innerHTML=b.map((r,w)=>`
      <div class="cmd-result ${w===h?"selected":""}" data-idx="${w}">
        <div class="cmd-result-icon">${r.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${m(r.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${m(r.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),n.querySelectorAll(".cmd-result").forEach(r=>{r.onmouseenter=()=>{h=Number(r.dataset.idx),f()},r.onclick=()=>{_(Number(r.dataset.idx))}})}function f(){n.querySelectorAll(".cmd-result").forEach((r,w)=>{r.classList.toggle("selected",w===h)})}function _(r){const w=b[r];w&&w.action&&(S(),w.action())}function E(){const r=document.getElementById("topbarUserDropdown");r&&(r.style.display="none"),i.classList.add("open"),e.value="",b=[...g],h=0,k(),setTimeout(()=>e.focus(),50)}function S(){i.classList.remove("open"),e.blur()}a&&(a.onclick=E),o&&(o.onclick=E),s&&(s.onclick=()=>{const r=document.getElementById("topbarUserDropdown");r&&(r.style.display="none"),E()}),l&&(l.onclick=S),i.onclick=r=>{r.target===i&&S()},e.oninput=()=>{const r=e.value.trim().toLowerCase();r?b=g.filter(w=>w.label.toLowerCase().includes(r)||w.sub.toLowerCase().includes(r)):b=[...g],h=0,k()},e.onkeydown=r=>{if(r.key==="ArrowDown"){if(r.preventDefault(),b.length>0){h=(h+1)%b.length,f();const w=n.querySelector(".cmd-result.selected");w&&w.scrollIntoView({block:"nearest"})}}else if(r.key==="ArrowUp"){if(r.preventDefault(),b.length>0){h=(h-1+b.length)%b.length,f();const w=n.querySelector(".cmd-result.selected");w&&w.scrollIntoView({block:"nearest"})}}else r.key==="Enter"?(r.preventDefault(),_(h)):r.key==="Escape"&&(r.preventDefault(),S())};const C=r=>{(r.metaKey||r.ctrlKey)&&r.key.toLowerCase()==="k"?(r.preventDefault(),i.classList.contains("open")?S():E()):r.key==="Escape"&&i.classList.contains("open")&&S()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=C,window.addEventListener("keydown",C)}function Lt(t=4){return`
    <div class="grid grid-${Math.min(t,4)}" style="margin-bottom:24px">
      ${Array(t).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function Nt(t,i,e="📁",n=""){return`
    <div class="empty">
      <span class="empty-icon">${e}</span>
      <h3>${m(t)}</h3>
      <p>${m(i)}</p>
      ${n}
    </div>`}function At(t,i,e="",n="📊",a=""){let o="";return a&&(o=`<span class="kpi-trend ${a.startsWith("+")||a.includes("↑")||a.toLowerCase().includes("up")?"up":"down"}">${m(a)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${m(t)}</span>
        <div class="kpi-icon">${n}</div>
      </div>
      <div class="kpi-value">${m(i)}</div>
      <div class="kpi-sub">${o}<span>${m(e)}</span></div>
    </div>`}function Pt(t,i="gray"){return`<span class="badge ${i}">${m(t)}</span>`}function Dt(t,i="indigo"){const e=Math.min(100,Math.max(0,Number(t)||0));return`
    <div class="progress-bar-wrap" title="${e.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${e}%"></div>
    </div>`}function jt(t){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([e,n])=>`<button class="pchip ${t===e?"active":""}" data-period="${e}">${n}</button>`).join("")}</div>`}function zt(t){if(!t)return"U";const i=t.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function pt(t){if(!t)return"";const i=new Date,e=new Date(t),n=Math.floor((i-e)/1e3);if(n<60)return"Just now";const a=Math.floor(n/60);if(a<60)return`${a}m ago`;const o=Math.floor(a/60);if(o<24)return`${o}h ago`;const s=Math.floor(o/24);return s<7?`${s}d ago`:V(t)}function J(t){if(t=Number(t)||0,t===0)return"0 B";const i=1024,e=["B","KB","MB","GB"],n=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,n)).toFixed(1))+" "+e[n]}function U(t="",i=""){const e=(t.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(e)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:e==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(e)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(e)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(e)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(e)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(e)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function Rt(t){return t?U(t.name||t.filename||"",t.type||"").cls==="img":!1}function ot(t){if(!t||!t.url)return;const i=U(t.name,t.type),e=i.cls==="img",n=i.cls==="pdf",a=m(t.name||"Attachment"),o=J(t.size),s=document.createElement("div");s.className="preview-modal-overlay",s.innerHTML=`
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
  `,s.onclick=l=>{(l.target===s||l.target.closest(".preview-modal-close"))&&s.remove()},document.body.appendChild(s)}function Y(t=[],i={}){if(!t||!t.length)return"";const e=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${m(i.title)} <span style="font-weight:500;color:var(--text-4)">(${t.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${t.map((n,a)=>{const o=U(n.name,n.type),s=m(n.name||"File"),l=J(n.size);return`
            <div class="attachment-chip" data-idx="${a}" title="${s} (${l})">
              <span class="file-type-icon ${o.cls}" style="width:22px;height:22px;font-size:12px">${o.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${a}, this)">${s}</span>
              <span class="attachment-chip-size">${l}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${a}, this)">👁️</button>
                <a href="${n.url}" download="${s}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${e?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${a}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const M={};async function Z(t){const i=Array.from(t||[]);if(!i.length)return[];const n=(await Promise.all(i.map(async a=>new Promise(o=>{const s=new FileReader;s.onload=()=>{o({name:a.name,type:a.type,size:a.size,base64:s.result,data:s.result})},s.onerror=()=>o(null),s.readAsDataURL(a)})))).filter(Boolean);if(!n.length)return[];try{const a=await F("/upload",{files:n});if(a&&a.files&&a.files.length)return a.files}catch(a){console.warn("Backend upload failed, fallback to base64 data URLs:",a)}return n.map(a=>({name:a.name,url:a.base64,size:a.size,type:a.type,uploadedAt:new Date}))}function st({id:t="uploader",label:i="Attachments & Files",subtitle:e="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:n=!0,accept:a="*/*",maxFiles:o=10}={}){return`
    <div class="uploader-container" id="container-${t}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${m(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${t}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${t}">
        <input type="file" id="input-${t}" ${n?"multiple":""} accept="${a}" style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${m(e)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${t}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${t}"></div>
    </div>
  `}function at(t,i={}){const e=document.getElementById("zone-"+t),n=document.getElementById("input-"+t),a=document.getElementById("list-"+t),o=document.getElementById("count-"+t);M[t]=i.existing?[...i.existing]:[];function s(){const l=M[t]||[];if(o&&(o.textContent=`${l.length} file${l.length===1?"":"s"} attached`),!!a){if(!l.length){a.innerHTML="";return}a.innerHTML=l.map((p,g)=>{const x=U(p.name,p.type),h=m(p.name||"File"),b=J(p.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${x.cls}">${x.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${h}">${h}</div>
              <div class="uploader-file-size">${x.label} · ${b}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${t}', ${g})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${t}', ${g})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(l)}}window.__removeUploaderFile=(l,p)=>{if(M[l]){M[l].splice(p,1);const g=window[`__update_${l}`];g&&g()}},window.__previewUploaderFile=(l,p)=>{const g=(M[l]||[])[p];g&&ot(g)},window[`__update_${t}`]=s,e&&n&&(e.onclick=l=>{l.target.tagName!=="BUTTON"&&!l.target.closest("button")&&n.click()},e.ondragover=l=>{l.preventDefault(),e.classList.add("dragover")},e.ondragleave=()=>e.classList.remove("dragover"),e.ondrop=async l=>{if(l.preventDefault(),e.classList.remove("dragover"),l.dataTransfer&&l.dataTransfer.files&&l.dataTransfer.files.length){y("Uploading files… ⏳");const p=await Z(l.dataTransfer.files);M[t]=[...M[t]||[],...p],s(),y("Files attached! ✓")}},n.onchange=async()=>{if(n.files&&n.files.length){y("Uploading files… ⏳");const l=await Z(n.files);M[t]=[...M[t]||[],...l],s(),y("Files attached! ✓"),n.value=""}}),s()}function lt(t){return M[t]||[]}function wt(t,i=[]){M[t]=[...i];const e=window[`__update_${t}`];e&&e()}window.__openPreview=(t,i)=>{const e=i.closest(".attachment-chips-wrap");if(!e)return;const n=i.closest(".attachment-chip");if(!n)return;const a=Number(n.dataset.idx),o=e.dataset.attachments;if(o)try{const s=JSON.parse(decodeURIComponent(o));s[a]&&ot(s[a])}catch{}};function Ut(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");return`
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
        ${st({id:"tkup-"+e,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const qt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},Ht={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function Ot(t,i){const e=(t.status||"Open").toLowerCase().replace(" ","-"),n=t.status==="Open",a=(t._id||"").slice(-4).toUpperCase(),o=zt(t.userName),s=encodeURIComponent(JSON.stringify(t.attachments||[])),l=encodeURIComponent(JSON.stringify(t.adminAttachments||[]));return`
    <div class="ticket-card status-${e}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${a}</span>
            <span class="ticket-subject">${m(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${qt[t.status]||"gray"}">
            ${n?'<span class="pulse-dot"></span>':""} ${m(t.status)}
          </span>
          <span class="badge ${Ht[t.priority]||"gray"}">${m(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${o}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${m(t.userName)}
            <span class="ticket-role-pill">${m(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${pt(t.createdAt)} · ${V(t.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${m(t.message)}</div>

      ${t.attachments&&t.attachments.length?`
        <div data-attachments="${s}">
          ${Y(t.attachments,{title:"Ticket Attachments"})}
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
              ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${pt(t.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${m(t.adminReply)}</div>
            ${t.adminAttachments&&t.adminAttachments.length?`
              <div data-attachments="${l}">
                ${Y(t.adminAttachments,{title:"Support Attached Files"})}
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
            <textarea id="tkreplytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${m(t.adminReply||"")}</textarea>
            ${st({id:"tkreplyup-"+t._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function N(t,i,e){const n=document.getElementById("tklist-"+i),a=document.getElementById("tkcnt-"+i);if(n)try{const o=await et("/tickets/job/"+t);a&&(a.textContent=o.length),o.length?(n.innerHTML=o.map(s=>Ot(s,e)).join(""),Ft(t,i,e,n,o)):n.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{n.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function Ft(t,i,e,n,a){e&&(n.querySelectorAll(".tk-status-sel").forEach(o=>{o.onchange=async()=>{try{await q("/tickets/"+o.dataset.tkid,{status:o.value}),y("Status updated"),N(t,i,e)}catch(s){y(s.message,!0)}}}),n.querySelectorAll(".tk-quick-resolve-btn").forEach(o=>{o.onclick=async()=>{try{await q("/tickets/"+o.dataset.tkid,{status:"Resolved"}),y("Ticket marked as Resolved! 🎉"),N(t,i,e)}catch(s){y(s.message,!0)}}}),n.querySelectorAll(".ticket-template-btn").forEach(o=>{o.onclick=()=>{const s=document.getElementById("tkreplytxt-"+o.dataset.tkid);s&&(s.value=o.dataset.tpl,s.focus())}}),n.querySelectorAll(".tk-reply-toggle").forEach(o=>{o.onclick=()=>{const s=o.dataset.tkid,l=document.getElementById("tkreplyform-"+s);if(l){l.classList.toggle("show");const p=a.find(g=>g._id===s);at("tkreplyup-"+s,{existing:p?p.adminAttachments:[]})}}}),n.querySelectorAll(".tk-reply-cancel").forEach(o=>{o.onclick=()=>{const s=document.getElementById("tkreplyform-"+o.dataset.tkid);s&&s.classList.remove("show")}}),n.querySelectorAll(".tk-reply-save").forEach(o=>{o.onclick=async()=>{const s=o.dataset.tkid,l=document.getElementById("tkreplytxt-"+s);if(!l)return;const p=lt("tkreplyup-"+s);try{await q("/tickets/"+s,{adminReply:l.value.trim(),adminAttachments:p}),y("Response saved! 🛡️"),N(t,i,e)}catch(g){y(g.message,!0)}}}),n.querySelectorAll(".tk-del-btn").forEach(o=>{o.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await it("/tickets/"+o.dataset.tkid),y("Ticket deleted"),N(t,i,e)}catch(s){y(s.message,!0)}}}))}function Vt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");N(t,e,i),at("tkup-"+e);const n=document.querySelector(`[data-jobid="${t}"].ticket-toggle-btn`);n&&(n.onclick=()=>{const s=document.getElementById("tkform-"+e);if(!s)return;const l=s.style.display==="block";s.style.display=l?"none":"block",n.textContent=l?"+ Raise Ticket":"✕ Cancel"});const a=document.querySelector(`.tk-cancel-btn[data-safeid="${e}"]`);a&&(a.onclick=()=>{const s=document.getElementById("tkform-"+e);s&&(s.style.display="none"),n&&(n.textContent="+ Raise Ticket")});const o=document.querySelector(`.tk-submit-btn[data-safeid="${e}"]`);o&&(o.onclick=async()=>{var x,h;const s=(x=(document.getElementById("tksub-"+e)||{}).value)==null?void 0:x.trim(),l=(h=(document.getElementById("tkmsg-"+e)||{}).value)==null?void 0:h.trim(),p=(document.getElementById("tkpri-"+e)||{}).value,g=lt("tkup-"+e);if(!s){y("Please enter a subject",!0);return}if(!l){y("Please enter a message",!0);return}o.disabled=!0,o.textContent="Submitting…";try{await F("/tickets",{jobId:t,subject:s,message:l,priority:p,attachments:g}),y("Ticket submitted! 🎫");const b=document.getElementById("tkform-"+e);b&&(b.style.display="none"),n&&(n.textContent="+ Raise Ticket");const k=document.getElementById("tksub-"+e),f=document.getElementById("tkmsg-"+e);k&&(k.value=""),f&&(f.value=""),wt("tkup-"+e,[]),N(t,e,i)}catch(b){y(b.message,!0)}finally{o.disabled=!1,o.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function Jt(){return""}function Wt(){}window.__setTheme=function(t){A(t)};Object.assign(window,{getToken:X,getUser:H,setSession:Bt,clearSession:tt,requireAuth:$t,initTheme:mt,api:T,apiGet:et,apiPost:F,apiPut:q,apiPatch:St,apiDelete:it,fmtINR:It,fmtHours:Ct,escapeHtml:m,fmtDate:V,flashToast:y,openModal:ft,logout:z,getTheme:$,setTheme:A,initServiceWorker:nt,playNotificationChime:vt,triggerPhoneVibration:ht,requestNotificationPermission:Q,triggerSystemNotification:P,fmtFileSize:J,getFileCategory:U,isImageAttachment:Rt,openFilePreviewModal:ot,renderAttachmentChips:Y,uploadFilesToServer:Z,renderAttachmentUploader:st,bindAttachmentUploader:at,getUploaderAttachments:lt,setUploaderAttachments:wt,renderRoleSwitcher:Jt,bindRoleSwitcher:Wt,renderNotificationBell:yt,initNotificationBell:kt,renderAppShell:Et,bindAppShellEvents:Tt,renderSkeletonCards:Lt,renderEmptyState:Nt,renderKpiCard:At,renderBadge:Pt,renderProgressBar:Dt,renderPeriodPicker:jt,renderSupportTicketSection:Ut,bindSupportTicketSection:Vt});export{X as a,F as b,H as g,Bt as s};
