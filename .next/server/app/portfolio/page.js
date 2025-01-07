(()=>{var e={};e.id=444,e.ids=[444],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9584:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>d,routeModule:()=>x,tree:()=>c});var a=s(482),i=s(9108),r=s(2563),n=s.n(r),l=s(8300),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);s.d(t,o);let c=["",{children:["portfolio",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,2504)),"D:\\Projects\\webpage\\ai-research-sc-analytics-main\\jw-ai-sc-de\\src\\app\\portfolio\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,1342)),"D:\\Projects\\webpage\\ai-research-sc-analytics-main\\jw-ai-sc-de\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,8206)),"D:\\Projects\\webpage\\ai-research-sc-analytics-main\\jw-ai-sc-de\\src\\app\\not-found.tsx"]}],d=["D:\\Projects\\webpage\\ai-research-sc-analytics-main\\jw-ai-sc-de\\src\\app\\portfolio\\page.tsx"],m="/portfolio/page",p={require:s,loadChunk:()=>Promise.resolve()},x=new a.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/portfolio/page",pathname:"/portfolio",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},2385:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,2583,23)),Promise.resolve().then(s.t.bind(s,6840,23)),Promise.resolve().then(s.t.bind(s,8771,23)),Promise.resolve().then(s.t.bind(s,3225,23)),Promise.resolve().then(s.t.bind(s,9295,23)),Promise.resolve().then(s.t.bind(s,3982,23))},7373:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,1476,23))},8501:(e,t,s)=>{Promise.resolve().then(s.bind(s,3932))},4:(e,t,s)=>{Promise.resolve().then(s.bind(s,9737))},3932:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var a=s(2295);s(3729);var i=s(783),r=s.n(i);function n(){return a.jsx("main",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center p-8",children:[a.jsx("h1",{className:"text-6xl font-bold mb-4 gradient-text",children:"404"}),a.jsx("h2",{className:"text-2xl font-semibold mb-6",children:"Page Not Found"}),a.jsx("p",{className:"text-gray-300 mb-8",children:"The page you are looking for might have been removed or is temporarily unavailable."}),a.jsx(r(),{href:"/",className:"px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors",children:"Return Home"})]})})}},9737:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var a=s(2295);s(3729);var i=s(5763);let r=[{title:"AI Research & Development",description:"Leading research initiatives in computer vision and GPT-4 integration",imagePath:"/images/ai_network.jpg",tags:["AI","Computer Vision","GPT-4","Research"]},{title:"Supply Chain Analytics",description:"End-to-end supply chain optimization and analytics solutions",imagePath:"/images/logistics.jpg",tags:["Analytics","Supply Chain","Optimization"]},{title:"Business Intelligence",description:"Enterprise-wide BI implementation and analytics frameworks",imagePath:"/images/bi.jpg",tags:["BI","Data Analytics","Visualization"]},{title:"Warehouse Operations",description:"Large-scale warehouse management and optimization systems",imagePath:"/images/warehouse.jpg",tags:["Operations","Management","Optimization"]}];function n(){return a.jsx("main",{className:"min-h-screen py-16",children:(0,a.jsxs)("div",{className:"container mx-auto px-4",children:[a.jsx("h1",{className:"text-4xl font-bold mb-8 gradient-text text-center",children:"Portfolio"}),a.jsx("p",{className:"text-lg text-gray-300 mb-12 text-center max-w-3xl mx-auto",children:"A showcase of projects and achievements in AI, analytics, and operational excellence."}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:r.map((e,t)=>(0,a.jsxs)("div",{className:"glass-card overflow-hidden",children:[a.jsx(i.Z,{imagePath:e.imagePath,title:e.title,description:e.description}),a.jsx("div",{className:"p-6",children:a.jsx("div",{className:"flex flex-wrap gap-2 mt-4",children:e.tags.map((e,t)=>a.jsx("span",{className:"px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm",children:e},t))})})]},t))})]})})}},5763:(e,t,s)=>{"use strict";s.d(t,{Z:()=>o});var a=s(2295);s(3729);var i=s(1223),r=s.n(i);let n=({title:e,subtitle:t,aspectRatio:s="16/9",className:i=""})=>(0,a.jsxs)("div",{className:`placeholder-gradient rounded-lg relative overflow-hidden ${{square:"aspect-square","16/9":"aspect-[16/9]","4/3":"aspect-[4/3]"}[s]} ${i}`,children:[a.jsx("div",{className:"absolute inset-0 hero-pattern opacity-20"}),(0,a.jsxs)("div",{className:"absolute inset-0 flex flex-col items-center justify-center p-4 text-center",children:[a.jsx("h3",{className:"text-xl font-semibold mb-2 text-white",children:e}),t&&a.jsx("p",{className:"text-sm text-gray-300",children:t})]})]});var l=s(1556);let o=({imagePath:e,title:t,description:s,onClick:i})=>{let o=!e||""===e,c=o?"":(0,l.al)(e);return a.jsx("div",{className:"image-card cursor-pointer",onClick:i,children:o?a.jsx(n,{title:t,subtitle:s,aspectRatio:"16/9",className:"w-full h-full"}):(0,a.jsxs)("div",{className:"relative w-full aspect-[16/9]",children:[a.jsx(r(),{src:c,alt:t,fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",priority:!0,className:"object-cover rounded-lg",unoptimized:!0}),(0,a.jsxs)("div",{className:"absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end rounded-lg",children:[a.jsx("h3",{className:"text-xl font-semibold mb-2 text-white",children:t}),a.jsx("p",{className:"text-sm text-gray-200",children:s})]})]})})}},1556:(e,t,s)=>{"use strict";s.d(t,{Yo:()=>n,al:()=>i,lq:()=>r});let a=()=>"/ai-research-sc-analytics-v2",i=e=>{let t=a(),s=e.startsWith("/")?e:`/images/${e}`;return`${t}${s}`},r=e=>{let t=a(),s=e.startsWith("/")?e:`/audio/${e}`;return`${t}${s}`},n=e=>{let t=a(),s=e.startsWith("/")?e:`/videos/${e}`;return`${t}${s}`}},1342:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c,metadata:()=>o});var a=s(5036),i=s(3640),r=s.n(i);s(5023);var n=s(646),l=s.n(n);let o={title:"AI Research & Supply Chain Analytics Portfolio",description:"Showcasing research papers and supply chain analytics projects"};function c({children:e}){return a.jsx("html",{lang:"en",className:r().className,children:(0,a.jsxs)("body",{children:[a.jsx("nav",{className:"bg-gray-900 border-b border-gray-800",children:a.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:a.jsx("div",{className:"flex items-center justify-between h-16",children:(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx(l(),{href:"/",className:"text-2xl font-bold gradient-text",children:"Portfolio"}),a.jsx("div",{className:"hidden md:block ml-10",children:(0,a.jsxs)("div",{className:"flex items-center space-x-4",children:[a.jsx(l(),{href:"/research",className:"text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors",children:"Research Papers"}),a.jsx(l(),{href:"/supply-chain",className:"text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors",children:"Supply Chain & Analytics"})]})})]})})})}),a.jsx("main",{className:"min-h-screen",children:e})]})})}},8206:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>r,__esModule:()=>i,default:()=>n});let a=(0,s(6843).createProxy)(String.raw`D:\Projects\webpage\ai-research-sc-analytics-main\jw-ai-sc-de\src\app\not-found.tsx`),{__esModule:i,$$typeof:r}=a,n=a.default},2504:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>r,__esModule:()=>i,default:()=>n});let a=(0,s(6843).createProxy)(String.raw`D:\Projects\webpage\ai-research-sc-analytics-main\jw-ai-sc-de\src\app\portfolio\page.tsx`),{__esModule:i,$$typeof:r}=a,n=a.default},5023:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[709,223],()=>s(9584));module.exports=a})();