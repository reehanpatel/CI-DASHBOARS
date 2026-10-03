(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();(function(){try{if(typeof window<"u"&&window.location.pathname.endsWith(".html")){let i=window.location.pathname.slice(0,-5);i==="/index"&&(i="/"),window.history.replaceState(null,"",(i||"/")+window.location.search+window.location.hash)}}catch{}})();const wt="/api";function Q(){return localStorage.getItem("ci360_token")}function q(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function xt(t,i){localStorage.setItem("ci360_token",t),localStorage.setItem("ci360_user",JSON.stringify(i))}function Y(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function Bt(t){const i=Q(),e=q();if(!i||!e)return window.location.href="/login",null;const o=e.name&&e.name.toLowerCase().includes("ekta")||e.email&&e.email.toLowerCase().includes("ekta");return t&&e.role!==t&&e.role!=="superadmin"?(e.role==="accounts"||o)&&(t==="accounts"||t==="employee")?e:(window.location.href=e.role==="superadmin"?"/admin":e.role==="accounts"||o?"/accounts":e.role==="employee"?"/employee":"/client",null):e}async function T(t,i={}){const e=Q(),o=Object.assign({"Content-Type":"application/json"},i.headers||{});e&&(o.Authorization="Bearer "+e);const s=await fetch(wt+t,Object.assign({},i,{headers:o}));if(s.status===401)throw Y(),window.location.href="/login",new Error("Session expired");let n=null;try{n=await s.json()}catch{}if(!s.ok)throw new Error(n&&n.error||"Server status "+s.status+" — Backend waking up, please retry in 10s.");return n}const Z=t=>T(t,{method:"GET"}),X=(t,i)=>T(t,{method:"POST",body:JSON.stringify(i)}),R=(t,i)=>T(t,{method:"PUT",body:JSON.stringify(i)}),$t=(t,i)=>T(t,{method:"PATCH",body:JSON.stringify(i)}),tt=t=>T(t,{method:"DELETE"});function St(t){return t=Number(t)||0,"₹"+t.toLocaleString("en-IN",{maximumFractionDigits:0})}function Ct(t){return(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function f(t){return t==null?"":String(t).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function O(t){return t?new Date(t).toISOString().slice(0,10):"—"}function C(){return localStorage.getItem("ci360_theme")||"light"}function P(t){localStorage.setItem("ci360_theme",t),document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(n=>{n.classList.toggle("active",n.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const n=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");n&&(n.textContent=t==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),o=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),o&&(o.textContent=t==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const n=s.querySelector("span");n&&(n.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function ut(){const t=C();document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(n=>{n.classList.toggle("active",n.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const n=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");n&&(n.textContent=t==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),o=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),o&&(o.textContent=t==="dark"?"Light Mode":"Dark Mode");const s=document.getElementById("mmsToggleThemeBtn");if(s){const n=s.querySelector("span");n&&(n.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{ut()}catch{}function b(t,i){const e=document.createElement("div");e.className="toast",e.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",e.textContent=(i?"⚠️  ":"✓  ")+t,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>e.remove(),200)},2800)}function pt(t){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${t}</div>`,i.onclick=e=>{e.target===i&&i.remove()},document.body.appendChild(i),i}function j(){Y(),window.location.href="/login"}let z=null;async function et(){if("serviceWorker"in navigator)try{z=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",z.scope)}catch(t){console.warn("CI360 Service Worker registration notice:",t)}}try{et()}catch{}let at=0,lt=0;const D=new Set,rt=new Set;let ct=!1;function mt(t){try{const i=typeof q=="function"?q():null,e=i&&i._id?String(i._id):"default";return`${t}_${e}`}catch{return`${t}_default`}}function H(){try{const t=mt("ci360_alerted_ids"),i=localStorage.getItem(t);if(i){const e=JSON.parse(i);Array.isArray(e)&&e.forEach(o=>D.add(String(o)))}}catch{}}function W(){try{const t=mt("ci360_alerted_ids"),i=Array.from(D).slice(-2e3);localStorage.setItem(t,JSON.stringify(i))}catch{}}typeof window<"u"&&window.addEventListener("storage",t=>{t.key&&t.key.includes("ci360_alerted_ids")&&H()});function ft(){try{const t=Date.now();if(t-at<5e3)return;at=t;const i=window.AudioContext||window.webkitAudioContext;if(!i)return;const e=new i;e.state==="suspended"&&e.resume();const o=e.currentTime,s=e.createOscillator(),n=e.createGain();s.type="sine",s.frequency.setValueAtTime(587.33,o),n.gain.setValueAtTime(0,o),n.gain.linearRampToValueAtTime(.2,o+.02),n.gain.exponentialRampToValueAtTime(.001,o+.35),s.connect(n),n.connect(e.destination),s.start(o),s.stop(o+.35);const a=e.createOscillator(),l=e.createGain();a.type="sine",a.frequency.setValueAtTime(880,o+.12),l.gain.setValueAtTime(0,o+.12),l.gain.linearRampToValueAtTime(.22,o+.14),l.gain.exponentialRampToValueAtTime(.001,o+.55),a.connect(l),l.connect(e.destination),a.start(o+.12),a.stop(o+.55)}catch{}}function gt(){try{const t=Date.now();if(t-lt<5e3)return;lt=t,"vibrate"in navigator&&navigator.vibrate([150,80,150])}catch{}}function It(){try{if(typeof Notification<"u"&&Notification.permission==="granted"||localStorage.getItem("ci360_notif_enabled")==="true")return!0}catch{}return!1}function vt(){try{if(It()||localStorage.getItem("ci360_notif_banner_dismissed")==="true"||typeof Notification<"u"&&Notification.permission==="denied")return!0}catch{}return!1}async function ht(){if(!("Notification"in window))return b("Your browser does not support notifications.",!0),!1;try{const t=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return t==="granted"?(localStorage.setItem("ci360_notif_enabled","true"),i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important"),i.remove()),b("Notifications enabled for this device!"),await F({title:"CI360 Notifications Active 🔔",message:"You will now receive instant alerts on this device for jobs and tasks.",id:"ci360-perm-welcome"}),!0):(i&&(i.classList.add("hidden"),i.style.setProperty("display","none","important")),b("Notification permission was declined.",!0),!1)}catch(t){console.error("Notification permission request error:",t)}return!1}async function F({title:t,message:i,type:e,id:o,url:s}){const n=o?String(o):null;if(H(),n&&D.has(n)||(n&&(D.add(n),W()),ft(),gt(),!("Notification"in window)))return;if(Notification.permission==="default")try{if(await Notification.requestPermission()!=="granted")return}catch{return}if(Notification.permission!=="granted")return;const a=typeof window<"u"&&window.location?new URL("/logo.png",window.location.origin).href:"/logo.png",l={body:i||"You have a new update in CI360.",icon:a,badge:a,tag:n?`ci360-notif-${n}`:"ci360-alert",renotify:!1,vibrate:[150,80,150],data:{url:s||(typeof window<"u"?window.location.href:""),type:e||"general"}};try{const u=new Notification(t,l);u.onclick=()=>{window.focus(),u.close()};return}catch{}try{if(z&&z.showNotification){await z.showNotification(t,l);return}if("serviceWorker"in navigator){const u=await Promise.race([navigator.serviceWorker.ready,new Promise(p=>setTimeout(()=>p(null),400))]);u&&u.showNotification&&await u.showNotification(t,l)}}catch(u){console.warn("Service Worker notification dispatch:",u)}}if(typeof window<"u"&&(window.triggerSystemNotification=F,"Notification"in window)){const t=()=>{Notification.permission==="default"&&Notification.requestPermission().then(i=>{i==="granted"&&localStorage.setItem("ci360_notif_enabled","true")}).catch(()=>{}),window.removeEventListener("click",t,!0)};window.addEventListener("click",t,!0)}function yt(){return`
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

        ${!vt()&&(typeof Notification>"u"||Notification.permission==="default")?`
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
    </div>`}function bt(){const t=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),e=document.getElementById("notifBadge"),o=document.getElementById("notifList"),s=document.getElementById("clearNotifBtn"),n=document.getElementById("markAllReadBtn"),a=document.getElementById("notifEnableBtn"),l=document.getElementById("notifDismissBannerBtn"),u=document.getElementById("notifPermissionBanner"),p=document.getElementById("notifUnreadBadge");if(!t||!i)return;et();function x(){const r=document.getElementById("notifPermissionBanner");r&&(r.classList.add("hidden"),r.style.setProperty("display","none","important"),r.remove())}function y(){if(vt()){x();return}"Notification"in window&&(Notification.permission==="granted"||Notification.permission==="denied"?x():Notification.permission==="default"&&u&&u.style.setProperty("display","flex","important"))}y(),l&&(l.onclick=r=>{r.stopPropagation(),localStorage.setItem("ci360_notif_banner_dismissed","true"),x()}),a&&(a.onclick=async r=>{r.stopPropagation(),localStorage.setItem("ci360_notif_enabled","true"),x(),await ht(),x()}),window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null),H();let g=[],k="all";function v(r){return r?r.startsWith("task_completed")?"🎉":r.startsWith("task_due")?"⚡":r.startsWith("task")?"✅":r.startsWith("target_completed")?"🎉":r.startsWith("target")?"🎯":r.startsWith("job_due")?"⏳":r.startsWith("job")?"📋":r.startsWith("ticket")?"🎫":r.startsWith("status")?"🔄":r.startsWith("test")?"🧪":"🔔":"🔔"}function N(r){if(!r)return"";const m=new Date(r),c=Math.floor((new Date-m)/1e3);if(c<60)return"Just now";const w=Math.floor(c/60);if(w<60)return`${w}m ago`;const L=Math.floor(w/60);if(L<24)return`${L}h ago`;const J=Math.floor(L/24);return J===1?"Yesterday":J<7?`${J}d ago`:O(r)}function I(){if(!o)return;let r=g;if(k==="task"?r=g.filter(m=>(m.type||"").includes("task")):k==="target"?r=g.filter(m=>(m.type||"").includes("target")):k==="job"?r=g.filter(m=>(m.type||"").includes("job")):k==="ticket"&&(r=g.filter(m=>(m.type||"").includes("ticket"))),r.length===0){o.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${k==="all"?"":k+" "}notifications</div>`;return}o.innerHTML=r.map(m=>{const B=v(m.type);return`
        <div class="notif-item ${m.read?"":"unread"}" data-id="${m._id}" data-type="${f(m.type||"")}">
          <div class="notif-icon">${B}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${f(m.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${N(m.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${f(m.message)}</div>
          </div>
        </div>`}).join(""),o.querySelectorAll(".notif-item").forEach(m=>{m.onclick=async()=>{const B=m.dataset.id,c=m.dataset.type;if(B&&m.classList.contains("unread")){m.classList.remove("unread");try{await T(`/notifications/${B}/read`,{method:"PATCH"})}catch{}}h(),c&&c.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):c&&c.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("jobs"):c&&c.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):c&&c.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}})}async function $(){try{const r=await Z("/notifications");g=r.notifications||[];const m=r.unreadCount||0;if(e&&(e.textContent=m>99?"99+":m,e.style.display=m>0?"flex":"none"),p&&(p.textContent=m>0?`${m} new`:"",p.style.display=m>0?"inline-block":"none"),H(),!ct)g.forEach(B=>{const c=String(B._id);rt.add(c),D.add(c)}),W(),ct=!0;else{const B=g.filter(c=>!c.read&&!D.has(String(c._id)));if(B.length>0){for(const c of B){const w=String(c._id);rt.add(w),await F({title:c.title||"CI360 Alert",message:c.message||"",type:c.type,id:w})}W()}}I()}catch{o&&g.length===0&&(o.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}typeof window<"u"&&(window.ci360FetchNotifications=$),$(),window.__ci360PollInterval=setInterval($,2e4),window.addEventListener("beforeunload",()=>{window.__ci360PollInterval&&(clearInterval(window.__ci360PollInterval),window.__ci360PollInterval=null)}),i.querySelectorAll(".notif-filter-btn").forEach(r=>{r.onclick=m=>{m.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(B=>B.classList.remove("active")),r.classList.add("active"),k=r.dataset.filter,I()}});const S=document.getElementById("notifBackdrop");function d(){i.style.display="flex",i.classList.add("open"),S&&(S.style.display="block",S.classList.add("open")),t.setAttribute("aria-expanded","true"),y();const r=document.getElementById("topbarUserDropdown");r&&(r.style.display="none"),$()}function h(){i.style.display="none",i.classList.remove("open"),S&&(S.style.display="none",S.classList.remove("open")),t.setAttribute("aria-expanded","false")}function E(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?h():d()}window.ci360CloseNotifications=h;const _=document.getElementById("notifCloseBtn");_&&(_.onclick=r=>{r.stopPropagation(),h()}),S&&(S.onclick=r=>{r.stopPropagation(),h()}),t.onclick=r=>{r.stopPropagation(),E()},n&&(n.onclick=async r=>{r.stopPropagation();try{await T("/notifications/read",{method:"PATCH"}),e.style.display="none",p&&(p.textContent="",p.style.display="none"),g.forEach(m=>m.read=!0),I(),b("All notifications marked as read")}catch(m){b(m.message,!0)}}),document.addEventListener("click",r=>{!i.contains(r.target)&&r.target!==t&&(i.style.display="none")}),s&&(s.onclick=async r=>{r.stopPropagation();try{await tt("/notifications"),g=[],o.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',e.style.display="none",p&&(p.textContent="",p.style.display="none"),b("Notifications cleared")}catch(m){b(m.message,!0)}})}function Mt({user:t,currentRole:i,activeTab:e,tabs:o,title:s,subtitle:n}){const a=t&&t.name?t.name.charAt(0).toUpperCase():"U",l=t&&(t.role==="superadmin"||t.role==="admin")?"Admin":t&&t.role==="accounts"?"Accounts":t&&t.role==="employee"?"Employee":t&&t.role==="client"?"Client":t&&t.role?t.role.toUpperCase():"User",u=t&&t.name?t.name:"User",p=t&&t.email?t.email:t&&t.username?t.username:"",x=o&&o.some(v=>v.key==="logjob"),y=o&&o.find(v=>v.key===e),g=s||y&&y.label||"Dashboard";let k=[];return i==="accounts"?k=[{key:"overview",label:"Overview",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="overview"},{key:"invoices",label:"Invoices",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:e==="invoices"},{key:"payments",label:"Payments",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',active:e==="payments"},{key:"receivables",label:"Pending",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',active:e==="receivables"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["overview","invoices","payments","receivables"].includes(e),isMore:!0}]:i==="superadmin"?k=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="dashboard"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(e),isMore:!0}]:i==="employee"?k=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:e==="myjobs"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"tickets",label:"Tickets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></svg>',active:e==="tickets"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:e==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","tickets","targets"].includes(e),isMore:!0}]:k=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"jobs",label:"All Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',active:e==="jobs"},{key:"delivered",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:e==="delivered"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","delivered","team"].includes(e),isMore:!0}],`
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
          ${o.map(v=>`
            <button type="button" class="sidebar-item ${e===v.key?"active":""}" data-tab="${v.key}" aria-current="${e===v.key?"page":"false"}">
              <span class="icon">${v.icon||"📌"}</span>
              <span>${v.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${f(t?t.name:"User")}</div>
            <div class="role">${f(l)}</div>
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
              <h1 class="page-heading-title">${f(g)}</h1>
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
              <button class="theme-btn ${C()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${C()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${yt()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${a}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${f(u)}</span>
                  <span class="topbar-user-role-badge">${f(l)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${a}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${f(u)}</div>
                      ${p?`<div class="tud-email">${f(p)}</div>`:""}
                      <span class="tud-role-chip">${f(l)}</span>
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
          ${k.map(v=>`
            <button type="button" class="mbn-item ${v.active?"active":""}" data-tab="${v.key}" ${v.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${v.iconSvg}</span>
              <span class="mbn-label">${f(v.label)}</span>
              ${v.active?'<span class="mbn-active-dot"></span>':""}
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
              ${o.map(v=>`
                <button type="button" class="mms-card ${e===v.key?"active":""}" data-tab="${v.key}">
                  <span class="mms-card-icon">${v.icon||"📌"}</span>
                  <span class="mms-card-label">${f(v.label)}</span>
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
    </div>`}function Et(t){const i=document.getElementById("mobileNavToggle"),e=document.getElementById("appSidebar"),o=document.getElementById("sidebarOverlay");function s(){e&&e.classList.add("open"),o&&o.classList.add("open")}function n(){e&&e.classList.remove("open"),o&&o.classList.remove("open")}i&&(i.onclick=s),o&&(o.onclick=n);const a=document.getElementById("mobileMoreBackdrop"),l=document.getElementById("mobileMoreSheet"),u=document.getElementById("mmsCloseBtn"),p=document.getElementById("mobileMoreBtn");function x(){a&&a.classList.add("active"),l&&l.classList.add("active")}function y(){a&&a.classList.remove("active"),l&&l.classList.remove("active")}p&&(p.onclick=c=>{c.stopPropagation(),x()}),u&&(u.onclick=y),a&&(a.onclick=c=>{c.target===a&&y()}),document.querySelectorAll(".mbn-item").forEach(c=>{c.dataset.tab&&c.dataset.tab!=="__more__"&&(c.onclick=()=>{y(),t&&t(c.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(c=>{c.onclick=()=>{y(),t&&t(c.dataset.tab)}});const g=document.getElementById("mmsToggleThemeBtn");g&&(g.onclick=()=>{P(C()==="dark"?"light":"dark")});const k=document.getElementById("mmsNotifsBtn");k&&(k.onclick=()=>{y();const c=document.getElementById("notifBellBtn");c&&c.click()});const v=document.getElementById("mmsLogoutBtn");v&&(v.onclick=j);const N=document.getElementById("mobileCalBtn");N&&(N.onclick=()=>{const c=document.querySelector(".period-row");c&&(c.scrollIntoView({behavior:"smooth",block:"center"}),c.classList.add("pulse-highlight"),setTimeout(()=>c.classList.remove("pulse-highlight"),1200))});const I=document.getElementById("tudMobileThemeBtn");I&&(I.onclick=c=>{c.stopPropagation(),P(C()==="dark"?"light":"dark")});const $=document.getElementById("tudMobileNotifsBtn");$&&($.onclick=c=>{c.stopPropagation();const w=document.getElementById("topbarUserDropdown");w&&(w.style.display="none");const L=document.getElementById("notifBellBtn");L&&L.click()});const S=document.getElementById("tudMobileSettingsBtn");S&&(S.onclick=c=>{c.stopPropagation();const w=document.getElementById("topbarUserDropdown");w&&(w.style.display="none"),document.querySelector('[data-tab="manage"]')&&t?t("manage"):x()});const d=document.getElementById("tudMobileHelpBtn");d&&(d.onclick=c=>{c.stopPropagation();const w=document.getElementById("topbarUserDropdown");w&&(w.style.display="none"),document.querySelector('[data-tab="tickets"]')&&t?t("tickets"):pt(`
          <div style="padding:24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">💬</div>
            <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
            <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
              For immediate technical assistance, client onboarding, or support tickets, reach out to your system administrator or use the Support Tickets portal.
            </p>
            <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
          </div>
        `)});const h=document.getElementById("logoutBtnMobile");h&&(h.onclick=j);const E=document.getElementById("topbarUserBtn"),_=document.getElementById("topbarUserDropdown");E&&_&&(E.onclick=c=>{c.stopPropagation();const w=_.style.display!=="none";_.style.display=w?"none":"block",E.setAttribute("aria-expanded",String(!w)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",c=>{!_.contains(c.target)&&!E.contains(c.target)&&(_.style.display="none",E.setAttribute("aria-expanded","false"))}));const r=document.getElementById("tudThemeToggleBtn");r&&(r.onclick=()=>{P(C()==="dark"?"light":"dark")});const m=document.getElementById("topbarQuickLogJobBtn");m&&(m.onclick=()=>{t&&t("logjob")});const B=document.getElementById("logoutBtn");B&&(B.onclick=j),bt(),document.querySelectorAll(".sidebar-item").forEach(c=>{c.onclick=()=>{n(),t&&t(c.dataset.tab)}}),_t(t)}function _t(t){const i=document.getElementById("cmdPaletteBackdrop"),e=document.getElementById("cmdSearchInput"),o=document.getElementById("cmdResultsList"),s=document.getElementById("topbarCmdTrigger"),n=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),l=document.getElementById("cmdCloseKbd");if(!i||!e||!o)return;const u=Array.from(document.querySelectorAll(".sidebar-item")),p=u.map(d=>{var h,E;return{type:"tab",id:d.dataset.tab,label:((h=d.querySelector("span:last-child"))==null?void 0:h.textContent)||d.dataset.tab,icon:((E=d.querySelector(".icon"))==null?void 0:E.textContent)||"📌",sub:"Navigate to section",action:()=>{t&&t(d.dataset.tab)}}});u.some(d=>d.dataset.tab==="logjob")&&p.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{t&&t("logjob")}}),p.push({type:"action",id:"toggle-theme",label:C()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{P(C()==="dark"?"light":"dark")}}),p.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const d=document.getElementById("notifBellBtn");d&&d.click()}}),p.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>j()});let y=0,g=[...p];function k(){if(!g.length){o.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}o.innerHTML=g.map((d,h)=>`
      <div class="cmd-result ${h===y?"selected":""}" data-idx="${h}">
        <div class="cmd-result-icon">${d.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${f(d.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${f(d.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),o.querySelectorAll(".cmd-result").forEach(d=>{d.onmouseenter=()=>{y=Number(d.dataset.idx),v()},d.onclick=()=>{N(Number(d.dataset.idx))}})}function v(){o.querySelectorAll(".cmd-result").forEach((d,h)=>{d.classList.toggle("selected",h===y)})}function N(d){const h=g[d];h&&h.action&&($(),h.action())}function I(){const d=document.getElementById("topbarUserDropdown");d&&(d.style.display="none"),i.classList.add("open"),e.value="",g=[...p],y=0,k(),setTimeout(()=>e.focus(),50)}function $(){i.classList.remove("open"),e.blur()}s&&(s.onclick=I),n&&(n.onclick=I),a&&(a.onclick=()=>{const d=document.getElementById("topbarUserDropdown");d&&(d.style.display="none"),I()}),l&&(l.onclick=$),i.onclick=d=>{d.target===i&&$()},e.oninput=()=>{const d=e.value.trim().toLowerCase();d?g=p.filter(h=>h.label.toLowerCase().includes(d)||h.sub.toLowerCase().includes(d)):g=[...p],y=0,k()},e.onkeydown=d=>{if(d.key==="ArrowDown"){if(d.preventDefault(),g.length>0){y=(y+1)%g.length,v();const h=o.querySelector(".cmd-result.selected");h&&h.scrollIntoView({block:"nearest"})}}else if(d.key==="ArrowUp"){if(d.preventDefault(),g.length>0){y=(y-1+g.length)%g.length,v();const h=o.querySelector(".cmd-result.selected");h&&h.scrollIntoView({block:"nearest"})}}else d.key==="Enter"?(d.preventDefault(),N(y)):d.key==="Escape"&&(d.preventDefault(),$())};const S=d=>{(d.metaKey||d.ctrlKey)&&d.key.toLowerCase()==="k"?(d.preventDefault(),i.classList.contains("open")?$():I()):d.key==="Escape"&&i.classList.contains("open")&&$()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=S,window.addEventListener("keydown",S)}function Lt(t=4){return`
    <div class="grid grid-${Math.min(t,4)}" style="margin-bottom:24px">
      ${Array(t).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function Tt(t,i,e="📁",o=""){return`
    <div class="empty">
      <span class="empty-icon">${e}</span>
      <h3>${f(t)}</h3>
      <p>${f(i)}</p>
      ${o}
    </div>`}function Nt(t,i,e="",o="📊",s=""){let n="";return s&&(n=`<span class="kpi-trend ${s.startsWith("+")||s.includes("↑")||s.toLowerCase().includes("up")?"up":"down"}">${f(s)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${f(t)}</span>
        <div class="kpi-icon">${o}</div>
      </div>
      <div class="kpi-value">${f(i)}</div>
      <div class="kpi-sub">${n}<span>${f(e)}</span></div>
    </div>`}function At(t,i="gray"){return`<span class="badge ${i}">${f(t)}</span>`}function Pt(t,i="indigo"){const e=Math.min(100,Math.max(0,Number(t)||0));return`
    <div class="progress-bar-wrap" title="${e.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${e}%"></div>
    </div>`}function Dt(t){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([e,o])=>`<button class="pchip ${t===e?"active":""}" data-period="${e}">${o}</button>`).join("")}</div>`}function jt(t){if(!t)return"U";const i=t.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function dt(t){if(!t)return"";const i=new Date,e=new Date(t),o=Math.floor((i-e)/1e3);if(o<60)return"Just now";const s=Math.floor(o/60);if(s<60)return`${s}m ago`;const n=Math.floor(s/60);if(n<24)return`${n}h ago`;const a=Math.floor(n/24);return a<7?`${a}d ago`:O(t)}function V(t){if(t=Number(t)||0,t===0)return"0 B";const i=1024,e=["B","KB","MB","GB"],o=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,o)).toFixed(1))+" "+e[o]}function U(t="",i=""){const e=(t.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(e)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:e==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(e)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(e)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(e)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(e)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(e)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function zt(t){return t?U(t.name||t.filename||"",t.type||"").cls==="img":!1}function it(t){if(!t||!t.url)return;const i=U(t.name,t.type),e=i.cls==="img",o=i.cls==="pdf",s=f(t.name||"Attachment"),n=V(t.size),a=document.createElement("div");a.className="preview-modal-overlay",a.innerHTML=`
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${i.icon}</span>
          <span>${s}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${n})</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="${t.url}" download="${s}" target="_blank" class="btn ghost small" style="font-size:12px;padding:4px 10px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
          <button type="button" class="btn ghost small preview-modal-close" style="padding:4px 8px;font-size:14px">✕</button>
        </div>
      </div>
      <div class="preview-modal-body">
        ${e?`
          <img src="${t.url}" alt="${s}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${t.url}','_blank')">
        `:o?`
          <iframe src="${t.url}" title="${s}"></iframe>
        `:`
          <div style="text-align:center;padding:40px 20px">
            <div style="font-size:48px;margin-bottom:12px">${i.icon}</div>
            <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${s}</div>
            <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${n}</div>
            <a href="${t.url}" download="${s}" target="_blank" class="btn gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Attachment
            </a>
          </div>
        `}
      </div>
    </div>
  `,a.onclick=l=>{(l.target===a||l.target.closest(".preview-modal-close"))&&a.remove()},document.body.appendChild(a)}function K(t=[],i={}){if(!t||!t.length)return"";const e=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${f(i.title)} <span style="font-weight:500;color:var(--text-4)">(${t.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${t.map((o,s)=>{const n=U(o.name,o.type),a=f(o.name||"File"),l=V(o.size);return`
            <div class="attachment-chip" data-idx="${s}" title="${a} (${l})">
              <span class="file-type-icon ${n.cls}" style="width:22px;height:22px;font-size:12px">${n.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${s}, this)">${a}</span>
              <span class="attachment-chip-size">${l}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${s}, this)">👁️</button>
                <a href="${o.url}" download="${a}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${e?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${s}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const M={};async function G(t){const i=Array.from(t||[]);if(!i.length)return[];const o=(await Promise.all(i.map(async s=>new Promise(n=>{const a=new FileReader;a.onload=()=>{n({name:s.name,type:s.type,size:s.size,base64:a.result,data:a.result})},a.onerror=()=>n(null),a.readAsDataURL(s)})))).filter(Boolean);if(!o.length)return[];try{const s=await X("/upload",{files:o});if(s&&s.files&&s.files.length)return s.files}catch(s){console.warn("Backend upload failed, fallback to base64 data URLs:",s)}return o.map(s=>({name:s.name,url:s.base64,size:s.size,type:s.type,uploadedAt:new Date}))}function ot({id:t="uploader",label:i="Attachments & Files",subtitle:e="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:o=!0,accept:s="*/*",maxFiles:n=10}={}){return`
    <div class="uploader-container" id="container-${t}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${f(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${t}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${t}">
        <input type="file" id="input-${t}" ${o?"multiple":""} accept="${s}" style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${f(e)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${t}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${t}"></div>
    </div>
  `}function nt(t,i={}){const e=document.getElementById("zone-"+t),o=document.getElementById("input-"+t),s=document.getElementById("list-"+t),n=document.getElementById("count-"+t);M[t]=i.existing?[...i.existing]:[];function a(){const l=M[t]||[];if(n&&(n.textContent=`${l.length} file${l.length===1?"":"s"} attached`),!!s){if(!l.length){s.innerHTML="";return}s.innerHTML=l.map((u,p)=>{const x=U(u.name,u.type),y=f(u.name||"File"),g=V(u.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${x.cls}">${x.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${y}">${y}</div>
              <div class="uploader-file-size">${x.label} · ${g}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${t}', ${p})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${t}', ${p})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(l)}}window.__removeUploaderFile=(l,u)=>{if(M[l]){M[l].splice(u,1);const p=window[`__update_${l}`];p&&p()}},window.__previewUploaderFile=(l,u)=>{const p=(M[l]||[])[u];p&&it(p)},window[`__update_${t}`]=a,e&&o&&(e.onclick=l=>{l.target.tagName!=="BUTTON"&&!l.target.closest("button")&&o.click()},e.ondragover=l=>{l.preventDefault(),e.classList.add("dragover")},e.ondragleave=()=>e.classList.remove("dragover"),e.ondrop=async l=>{if(l.preventDefault(),e.classList.remove("dragover"),l.dataTransfer&&l.dataTransfer.files&&l.dataTransfer.files.length){b("Uploading files… ⏳");const u=await G(l.dataTransfer.files);M[t]=[...M[t]||[],...u],a(),b("Files attached! ✓")}},o.onchange=async()=>{if(o.files&&o.files.length){b("Uploading files… ⏳");const l=await G(o.files);M[t]=[...M[t]||[],...l],a(),b("Files attached! ✓"),o.value=""}}),a()}function st(t){return M[t]||[]}function kt(t,i=[]){M[t]=[...i];const e=window[`__update_${t}`];e&&e()}window.__openPreview=(t,i)=>{const e=i.closest(".attachment-chips-wrap");if(!e)return;const o=i.closest(".attachment-chip");if(!o)return;const s=Number(o.dataset.idx),n=e.dataset.attachments;if(n)try{const a=JSON.parse(decodeURIComponent(n));a[s]&&it(a[s])}catch{}};function Ut(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");return`
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
        ${ot({id:"tkup-"+e,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const Rt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},qt={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function Ht(t,i){const e=(t.status||"Open").toLowerCase().replace(" ","-"),o=t.status==="Open",s=(t._id||"").slice(-4).toUpperCase(),n=jt(t.userName),a=encodeURIComponent(JSON.stringify(t.attachments||[])),l=encodeURIComponent(JSON.stringify(t.adminAttachments||[]));return`
    <div class="ticket-card status-${e}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${s}</span>
            <span class="ticket-subject">${f(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${Rt[t.status]||"gray"}">
            ${o?'<span class="pulse-dot"></span>':""} ${f(t.status)}
          </span>
          <span class="badge ${qt[t.priority]||"gray"}">${f(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${n}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${f(t.userName)}
            <span class="ticket-role-pill">${f(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${dt(t.createdAt)} · ${O(t.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${f(t.message)}</div>

      ${t.attachments&&t.attachments.length?`
        <div data-attachments="${a}">
          ${K(t.attachments,{title:"Ticket Attachments"})}
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
              ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${dt(t.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${f(t.adminReply)}</div>
            ${t.adminAttachments&&t.adminAttachments.length?`
              <div data-attachments="${l}">
                ${K(t.adminAttachments,{title:"Support Attached Files"})}
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
            <textarea id="tkreplytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${f(t.adminReply||"")}</textarea>
            ${ot({id:"tkreplyup-"+t._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function A(t,i,e){const o=document.getElementById("tklist-"+i),s=document.getElementById("tkcnt-"+i);if(o)try{const n=await Z("/tickets/job/"+t);s&&(s.textContent=n.length),n.length?(o.innerHTML=n.map(a=>Ht(a,e)).join(""),Ot(t,i,e,o,n)):o.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{o.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function Ot(t,i,e,o,s){e&&(o.querySelectorAll(".tk-status-sel").forEach(n=>{n.onchange=async()=>{try{await R("/tickets/"+n.dataset.tkid,{status:n.value}),b("Status updated"),A(t,i,e)}catch(a){b(a.message,!0)}}}),o.querySelectorAll(".tk-quick-resolve-btn").forEach(n=>{n.onclick=async()=>{try{await R("/tickets/"+n.dataset.tkid,{status:"Resolved"}),b("Ticket marked as Resolved! 🎉"),A(t,i,e)}catch(a){b(a.message,!0)}}}),o.querySelectorAll(".ticket-template-btn").forEach(n=>{n.onclick=()=>{const a=document.getElementById("tkreplytxt-"+n.dataset.tkid);a&&(a.value=n.dataset.tpl,a.focus())}}),o.querySelectorAll(".tk-reply-toggle").forEach(n=>{n.onclick=()=>{const a=n.dataset.tkid,l=document.getElementById("tkreplyform-"+a);if(l){l.classList.toggle("show");const u=s.find(p=>p._id===a);nt("tkreplyup-"+a,{existing:u?u.adminAttachments:[]})}}}),o.querySelectorAll(".tk-reply-cancel").forEach(n=>{n.onclick=()=>{const a=document.getElementById("tkreplyform-"+n.dataset.tkid);a&&a.classList.remove("show")}}),o.querySelectorAll(".tk-reply-save").forEach(n=>{n.onclick=async()=>{const a=n.dataset.tkid,l=document.getElementById("tkreplytxt-"+a);if(!l)return;const u=st("tkreplyup-"+a);try{await R("/tickets/"+a,{adminReply:l.value.trim(),adminAttachments:u}),b("Response saved! 🛡️"),A(t,i,e)}catch(p){b(p.message,!0)}}}),o.querySelectorAll(".tk-del-btn").forEach(n=>{n.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await tt("/tickets/"+n.dataset.tkid),b("Ticket deleted"),A(t,i,e)}catch(a){b(a.message,!0)}}}))}function Ft(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");A(t,e,i),nt("tkup-"+e);const o=document.querySelector(`[data-jobid="${t}"].ticket-toggle-btn`);o&&(o.onclick=()=>{const a=document.getElementById("tkform-"+e);if(!a)return;const l=a.style.display==="block";a.style.display=l?"none":"block",o.textContent=l?"+ Raise Ticket":"✕ Cancel"});const s=document.querySelector(`.tk-cancel-btn[data-safeid="${e}"]`);s&&(s.onclick=()=>{const a=document.getElementById("tkform-"+e);a&&(a.style.display="none"),o&&(o.textContent="+ Raise Ticket")});const n=document.querySelector(`.tk-submit-btn[data-safeid="${e}"]`);n&&(n.onclick=async()=>{var x,y;const a=(x=(document.getElementById("tksub-"+e)||{}).value)==null?void 0:x.trim(),l=(y=(document.getElementById("tkmsg-"+e)||{}).value)==null?void 0:y.trim(),u=(document.getElementById("tkpri-"+e)||{}).value,p=st("tkup-"+e);if(!a){b("Please enter a subject",!0);return}if(!l){b("Please enter a message",!0);return}n.disabled=!0,n.textContent="Submitting…";try{await X("/tickets",{jobId:t,subject:a,message:l,priority:u,attachments:p}),b("Ticket submitted! 🎫");const g=document.getElementById("tkform-"+e);g&&(g.style.display="none"),o&&(o.textContent="+ Raise Ticket");const k=document.getElementById("tksub-"+e),v=document.getElementById("tkmsg-"+e);k&&(k.value=""),v&&(v.value=""),kt("tkup-"+e,[]),A(t,e,i)}catch(g){b(g.message,!0)}finally{n.disabled=!1,n.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function Vt(){return""}function Jt(){}window.__setTheme=function(t){P(t)};Object.assign(window,{getToken:Q,getUser:q,setSession:xt,clearSession:Y,requireAuth:Bt,initTheme:ut,api:T,apiGet:Z,apiPost:X,apiPut:R,apiPatch:$t,apiDelete:tt,fmtINR:St,fmtHours:Ct,escapeHtml:f,fmtDate:O,flashToast:b,openModal:pt,logout:j,getTheme:C,setTheme:P,initServiceWorker:et,playNotificationChime:ft,triggerPhoneVibration:gt,requestNotificationPermission:ht,triggerSystemNotification:F,fmtFileSize:V,getFileCategory:U,isImageAttachment:zt,openFilePreviewModal:it,renderAttachmentChips:K,uploadFilesToServer:G,renderAttachmentUploader:ot,bindAttachmentUploader:nt,getUploaderAttachments:st,setUploaderAttachments:kt,renderRoleSwitcher:Vt,bindRoleSwitcher:Jt,renderNotificationBell:yt,initNotificationBell:bt,renderAppShell:Mt,bindAppShellEvents:Et,renderSkeletonCards:Lt,renderEmptyState:Tt,renderKpiCard:Nt,renderBadge:At,renderProgressBar:Pt,renderPeriodPicker:Dt,renderSupportTicketSection:Ut,bindSupportTicketSection:Ft});export{Bt as a,Et as b,Z as c,O as d,f as e,St as f,X as g,b as h,ut as i,tt as j,R as k,q as l,Q as m,pt as o,Mt as r,xt as s};
