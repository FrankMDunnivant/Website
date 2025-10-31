(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();const L="modulepreload",C=function(o){return"/vite-deploy-demo/"+o},v={},p=function(t,e,i){let n=Promise.resolve();if(e&&e.length>0){let m=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};var s=m;document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),d=r?.nonce||r?.getAttribute("nonce");n=m(e.map(l=>{if(l=C(l),l in v)return;v[l]=!0;const h=l.endsWith(".css"),c=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${c}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":L,h||(f.as="script"),f.crossOrigin="",f.href=l,d&&f.setAttribute("nonce",d),document.head.appendChild(f),h)return new Promise((_,E)=>{f.addEventListener("load",_),f.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(r){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=r,window.dispatchEvent(d),!d.defaultPrevented)throw r}return n.then(r=>{for(const d of r||[])d.status==="rejected"&&a(d.reason);return t().catch(a)})},b=new Map;async function u(o){if(b.has(o))return b.get(o);let t;switch(o){case"about":t=(await p(async()=>{const{default:e}=await import("./about-BzsJCBf2.js");return{default:e}},[])).default;break;case"contact":t=(await p(async()=>{const{default:e}=await import("./contact-DdFhMGlD.js");return{default:e}},[])).default;break;case"published-books":t=(await p(async()=>{const{default:e}=await import("./published-books-BWhLZ3SU.js");return{default:e}},[])).default;break;case"publications":t=(await p(async()=>{const{default:e}=await import("./publications-5FJVZxV9.js");return{default:e}},[])).default;break;case"pedagogical-publications":t=(await p(async()=>{const{default:e}=await import("./pedagogical-publications-BNFHzjcx.js");return{default:e}},[])).default;break;case"other-publications":t=(await p(async()=>{const{default:e}=await import("./other-publications-C1iJenTB.js");return{default:e}},[])).default;break;case"environmental-software":t=(await p(async()=>{const{default:e}=await import("./environmental-software-BKlVuMh2.js");return{default:e}},[])).default;break;case"equipment":t=(await p(async()=>{const{default:e}=await import("./equipment-CEVnLM-v.js");return{default:e}},[])).default;break;case"funding":t=(await p(async()=>{const{default:e}=await import("./funding-DuD83VPc.js");return{default:e}},[])).default;break;default:throw new Error(`Unknown content ID: ${o}`)}return b.set(o,t),t}function P(o){o.forEach(t=>{u(t).catch(e=>{console.warn(`Failed to preload content for ${t}:`,e)})})}const k=[{id:"about",title:"About",loadContent:()=>u("about")},{id:"contact",title:"Contact",loadContent:()=>u("contact")},{id:"published-books",title:"Published Books",loadContent:()=>u("published-books")},{id:"publications",title:"Publications",loadContent:()=>u("publications"),children:[{id:"pedagogical-publications",title:"Pedagogical Publications",loadContent:()=>u("pedagogical-publications")},{id:"other-publications",title:"Other Publications",loadContent:()=>u("other-publications")}]},{id:"environmental-software",title:"Environmental Software",loadContent:()=>u("environmental-software")},{id:"equipment",title:"Equipment",loadContent:()=>u("equipment")},{id:"funding",title:"Funding",loadContent:()=>u("funding")}];function T(o,t){const e=o.children&&o.children.length>0,i=t===o.id||e&&o.children.some(r=>r.id===t),n="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5",a="bg-white text-ocean-900 border-2 border-white",s="bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50";return e?`
      <li class="nav-dropdown">
        <button 
          class="${n} ${i?a:s} flex items-center gap-1.5"
          data-section="${o.id}"
          aria-haspopup="true"
          aria-expanded="false"
          aria-label="${o.title} menu"
        >
          ${o.title}
          <span class="dropdown-arrow text-xs" aria-hidden="true">▼</span>
        </button>
        <div class="dropdown-menu absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl p-2 min-w-[200px] z-[1001]" role="menu">
          ${o.children.map(r=>`
            <button 
              class="dropdown-item w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-gray-100 hover:text-ocean-700 hover:translate-x-1 my-0.5 ${t===r.id?"bg-ocean-500 text-white":"text-gray-700"}"
              data-section="${r.id}"
              role="menuitem"
            >
              ${r.title}
            </button>
          `).join("")}
        </div>
      </li>
    `:`
    <li>
      <button 
        class="${n} ${t===o.id?a:s}"
        data-section="${o.id}"
      >
        ${o.title}
      </button>
    </li>
  `}function g(o,t){return`
    <header class="sticky top-0 z-50 bg-gradient-to-br from-ocean-900 to-ocean-700 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold mb-2 drop-shadow-lg">Frank M. Dunnivant</h1>
            <p class="text-lg sm:text-xl font-light opacity-95">Professor of Chemistry, Whitman College</p>
          </div>
          <div class="mt-4 md:mt-0">
            <div class="relative">
              <input 
                type="search" 
                id="search-input"
                placeholder="Search website..." 
                class="w-full md:w-64 px-4 py-2 pr-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Search website"
              >
              <svg class="absolute right-3 top-2.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <div id="search-results" class="hidden absolute mt-2 bg-white rounded-lg shadow-xl max-w-md max-h-96 overflow-y-auto z-50"></div>
          </div>
        </div>
        <nav aria-label="Main navigation" class="mt-4">
          <ul class="flex flex-wrap gap-2 items-center">
            ${o.map(e=>T(e,t)).join("")}
          </ul>
        </nav>
      </div>
    </header>
  `}function S(){return`
    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      <div class="bg-white p-6 sm:p-10 rounded-xl shadow-lg">
        <div class="flex items-center justify-center min-h-[300px]">
          <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-700 mb-4"></div>
            <p class="text-gray-600 text-lg">Loading content...</p>
          </div>
        </div>
      </div>
    </main>
  `}function $(o,t,e){const i=o.find(n=>n.id===t)||o.flatMap(n=>n.children||[]).find(n=>n.id===t);return i?`
    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      <div class="bg-white p-6 sm:p-10 rounded-xl shadow-lg animate-fade-in">
        <h2 class="text-3xl font-serif font-bold text-ocean-900 mb-6 pb-3 border-b-4 border-ocean-500">${i.title}</h2>
        <div class="content">
          ${e}
        </div>
      </div>
    </main>
  `:`
      <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div class="bg-white p-6 sm:p-10 rounded-xl shadow-lg animate-fade-in">
          <h2 class="text-3xl font-serif font-bold text-ocean-900 mb-6 pb-3 border-b-4 border-ocean-500">Section Not Found</h2>
          <p class="text-gray-700 leading-relaxed">The requested section could not be found.</p>
        </div>
      </main>
    `}function x(){return`
    <footer class="bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p class="text-gray-600 text-sm mb-1">&copy; ${new Date().getFullYear()} Frank M. Dunnivant | Whitman College Department of Chemistry</p>
      </div>
    </footer>
  `}async function y(o){if(!o||o.trim().length<2)return[];const t=[],e=o.toLowerCase(),i=["about","contact","published-books","publications","pedagogical-publications","other-publications","environmental-software","equipment","funding"],n={about:"About",contact:"Contact","published-books":"Published Books",publications:"Publications","pedagogical-publications":"Pedagogical Publications","other-publications":"Other Publications","environmental-software":"Environmental Software",equipment:"Equipment",funding:"Funding"};for(const a of i)try{const s=await u(a),r=s.toLowerCase(),d=r.split(e).length-1;if(d>0){const m=r.indexOf(e),l=Math.max(0,m-50),h=Math.min(s.length,m+e.length+50);let c=s.substring(l,h);c=c.replace(/<[^>]*>/g," ").trim(),l>0&&(c="..."+c),h<s.length&&(c=c+"..."),t.push({sectionId:a,sectionTitle:n[a],snippet:c,matchCount:d})}}catch(s){console.error(`Error searching section ${a}:`,s)}return t.sort((a,s)=>s.matchCount-a.matchCount)}class A{state;appElement;eventListenerAttached=!1;searchTimeout=null;constructor(t){this.appElement=t,this.state={currentSection:"about",sections:k,loadedContent:new Map,isLoading:!1}}async init(){this.attachEventListeners(),await this.render(),setTimeout(()=>{P(["contact","publications","published-books"])},1e3)}findSection(t){for(const e of this.state.sections){if(e.id===t)return e;if(e.children){for(const i of e.children)if(i.id===t)return i}}return null}sectionExists(t){return this.findSection(t)!==null}async getContent(t){if(this.state.loadedContent.has(t))return this.state.loadedContent.get(t);const e=this.findSection(t);if(!e||!e.loadContent)throw new Error(`No content loader for section: ${t}`);const i=await e.loadContent();return this.state.loadedContent.set(t,i),i}async setCurrentSection(t){if(!this.sectionExists(t)){console.error("Section not found:",t);return}const e=this.findSection(t);e&&(document.title=`${e.title} - Frank M. Dunnivant, Professor of Chemistry`,this.updateMetaDescription(e.title)),this.state.currentSection=t,await this.render(),this.scrollToTop()}updateMetaDescription(t){let e=`${t} - Frank M. Dunnivant, Professor of Chemistry at Whitman College.`;const i=document.querySelector('meta[name="description"]');i&&i.setAttribute("content",e)}async render(){try{this.state.isLoading=!0;const t=[g(this.state.sections,this.state.currentSection),S(),x()].join("");this.appElement.innerHTML=t;const e=await this.getContent(this.state.currentSection);this.state.isLoading=!1;const i=[g(this.state.sections,this.state.currentSection),$(this.state.sections,this.state.currentSection,e),x()].join("");this.appElement.innerHTML=i,this.attachSearchListener()}catch(t){console.error("Failed to render:",t),this.state.isLoading=!1,this.renderError()}}renderError(){const t=[g(this.state.sections,this.state.currentSection),`<main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div class="bg-red-50 border border-red-200 p-6 sm:p-10 rounded-xl">
          <h2 class="text-2xl font-bold text-red-700 mb-4">Error Loading Content</h2>
          <p class="text-gray-700">Sorry, there was an error loading this section. Please try again.</p>
          <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-ocean-700 text-white rounded-lg">
            Reload Page
          </button>
        </div>
      </main>`,x()].join("");this.appElement.innerHTML=t}attachSearchListener(){const t=document.getElementById("search-input"),e=document.getElementById("search-results");!t||!e||(t.addEventListener("input",i=>{const n=i.target.value;this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=window.setTimeout(async()=>{if(n.length<2){e.classList.add("hidden");return}const a=await y(n);a.length===0?e.innerHTML=`
            <div class="p-4 text-gray-600">
              No results found for "${n}"
            </div>
          `:e.innerHTML=a.map(s=>`
            <button 
              class="w-full text-left p-3 hover:bg-gray-100 border-b border-gray-100 last:border-0"
              data-section="${s.sectionId}"
            >
              <div class="font-semibold text-ocean-900">${s.sectionTitle}</div>
              <div class="text-sm text-gray-600 mt-1">${s.snippet}</div>
              <div class="text-xs text-gray-500 mt-1">${s.matchCount} match${s.matchCount>1?"es":""}</div>
            </button>
          `).join(""),e.classList.remove("hidden")},300)}),document.addEventListener("click",i=>{!t.contains(i.target)&&!e.contains(i.target)&&e.classList.add("hidden")}))}attachEventListeners(){this.eventListenerAttached||(this.appElement.addEventListener("click",async t=>{const i=t.target.closest("button[data-section]");if(i){t.preventDefault(),t.stopPropagation();const n=i.getAttribute("data-section");if(n){await this.setCurrentSection(n);const a=document.getElementById("search-results");a&&a.classList.add("hidden")}}}),document.addEventListener("keydown",t=>{if((t.ctrlKey||t.metaKey)&&t.key==="k"){t.preventDefault();const e=document.getElementById("search-input");e&&e.focus()}if(t.key==="Escape"){const e=document.getElementById("search-results");e&&e.classList.add("hidden")}}),this.eventListenerAttached=!0)}scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}getCurrentSection(){return this.state.currentSection}async navigateTo(t){await this.setCurrentSection(t)}async search(t){return await y(t)}}document.documentElement.style.scrollBehavior="smooth";const w=document.querySelector("#app");if(!w)throw new Error("Could not find #app element");const M=new A(w);M.init().catch(o=>{console.error("Failed to initialize application:",o),w.innerHTML=`
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
        <h1 class="text-2xl font-bold text-red-600 mb-4">Failed to Load</h1>
        <p class="text-gray-700 mb-4">Sorry, the application failed to initialize.</p>
        <button onclick="location.reload()" class="px-6 py-2 bg-ocean-700 text-white rounded-lg">
          Reload Page
        </button>
      </div>
    </div>
  `});window.addEventListener("popstate",()=>{});
