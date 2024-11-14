import{S as ae,r as se,M as ie,_ as ne}from"./vue3-grid-layout-D3-g_Uw_.js";import{d as re,r as h,i as oe,j as ce,k as ue,c as M,a as n,w as c,u as i,g as L,n as E,l as S,m as de,v as pe,p as P,F as B,h as C,q as me,s as j,f as w,t as D,T as fe,x as k,I,S as Y,y as F,z as ge,B as T,D as he,A as G,E as ve,G as ke}from"./index-Kru8MpPs.js";const ye=`<!DOCTYPE html>
<html lang="ko" style="height: 100%;">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0" />
    <title>{{title}}</title>
    <link rel="stylesheet" href="/V2_pc/resource/css/include.css" />
    <script src="/V2_pc/resource/js/jquery-3.5.1.min.js"><\/script>
    <script src="/V2_pc/resource/js/bootstrap/bootstrap.min.js"><\/script>
    <script src="/main.js" type="module"><\/script>
    <script type="text/javascript">
      window.onload = function deviceCheck() {
        const user = navigator.userAgent;
        if (user.indexOf('iPhone') > -1 || user.indexOf('Android') > -1) {
          // mo
          styleAdd('mo');
        } else {
          // pc
          styleAdd('pc');
        }
      };
      function styleAdd(device) {
        const objLink = document.createElement('link');
        objLink.rel = 'stylesheet';
        objLink.type = 'text/css';
        objLink.href = '/V2_' + device + '/resource/css/styles.scss';
        document.querySelector('title').after(objLink);
      }
    <\/script>
    <!-- pub -->
  </head>
  <body>
    <div hx-get="{{bos_file_path}}" hx-swap="outerHTML" hx-trigger="load"></div>
  </body>
</html>
`,_e=`<!DOCTYPE html>
<html lang="ko" style="height: 100%;">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0" />
    <title>{{title}}</title>
    <link rel="stylesheet" href="/V2_mo/resource/css/include.css" />
    <script src="/V2_mo/resource/js/jquery-3.5.1.min.js"><\/script>
    <script src="/V2_mo/resource/js/bootstrap/bootstrap.min.js"><\/script>
    <script src="/main.js" type="module"><\/script>
    <script type="text/javascript">
      window.onload = function deviceCheck() {
        const user = navigator.userAgent;
        if (user.indexOf('iPhone') > -1 || user.indexOf('Android') > -1) {
          // mo
          styleAdd('mo');
        } else {
          // pc
          styleAdd('pc');
        }
      };
      function styleAdd(device) {
        const objLink = document.createElement('link');
        objLink.rel = 'stylesheet';
        objLink.type = 'text/css';
        objLink.href = '/V2_' + device + '/resource/css/styles.scss';
        document.querySelector('title').after(objLink);
      }
    <\/script>
    <!-- pub -->
  </head>
  <body>
    <div hx-get="{{bos_file_path}}" hx-swap="outerHTML" hx-trigger="load"></div>
  </body>
</html>
`,be={class:""},Ce=re({__name:"LifeCare",setup(we){const U=[{label:"MO (1080px)",value:1080},{label:"PC (1184px)",value:1184}],m={fullNotLink:'<div style="position: relative"><img class="img-linkpage" src="{{src}}" alt="img" /></div>',fullHaveLink:'<div style="position: relative"><a href="{{link}}" {{target_blank}}><span class="blind">{{spanBlind}}</span><img class="img-linkpage" src="{{src}}" alt="img" /></a></div>',absoluteLinks:'<div style="position: relative">{{list_link}}<img class="img-linkpage" src="{{src}}" alt="img" /></div>',onlyLink:'<a href="{{link}}" style="background-color: transparent; {{position}}" {{target_blank}}><span class="blind">{{spanBlind}}</span></a>',grid:'<div style="display: grid; grid-template-columns: repeat({{col}}, 1fr); grid-gap: 0;">{{list_link}}</div>',root:'<div class="eventPage-shell">{{template}}</div>',style:{mo:`<style>
  .eventPage-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 1080px;
    overflow: hidden;
    margin: 0 auto;
  }
  .img-linkpage {
    display: block;
    max-width: 100%;
    height: auto;
  }
</style>`,pc:`<style>
  .eventPage-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 1184px;
    overflow: hidden;
    margin: 0 auto;
  }
  .img-linkpage {
    display: block;
    max-width: 100%;
    height: auto;
  }
</style>`}},R=h(null),O=h(),q=h(0),x=h(!1),z=h(!0),H=h(""),J=h(!1),W=h(!1),e=oe({size_screen:1184,base_url:"https://image2.lglifecare.com/cnsEvent/202411/54976/pc_54976_",count_image:6,data:[],formDataTemplate:[],title:"SAMPLE",isCustomListImageLink:!1,listCustomLink:void 0}),A=h([]),$=ce(()=>e.listCustomLink?e.listCustomLink.split(`
`).map(o=>o.trim()):[]),X=()=>{x.value=!x.value},K=()=>{O.value.validate().then(async()=>{q.value++,H.value="",z.value=!0,Q()}).catch(o=>{C.error(o)})},Q=async()=>{const{base_url:o,count_image:t,size_screen:r,isCustomListImageLink:l}=e,d=(l?$.value:Array.from({length:t}).map((s,a)=>`${o}${a<9?"0"+(a+1):a+1}.png`)).map((s,a)=>new Promise((b,g)=>{const p=new Image;p.src=s,p.onload=function(){b({index:a+1,height:this.height,width:this.width,src:s})},p.onerror=function(){g("Error when load image")}})),y=await Promise.all(d).catch(s=>{C.error(s)}),v=y==null?void 0:y.reduce((s,a)=>{const{width:b}=a;if(b===r)s.push(a);else{let g=s[s.length-1];Array.isArray(g)?g.reduce((p,V)=>p+V.width,0)===r?s=[...s,[a]]:(g=s.pop(),s=[...s,[...g,a]]):s=[...s,[a]]}return s},[]);e.formDataTemplate=v;let f=0;const _=v==null?void 0:v.reduce((s,a)=>{if(Array.isArray(a)){let b=[],g=0;a.forEach((p,V)=>{b.push({x:g,y:f,w:p.width,h:p.height,i:`image_${p.index}`,label:`${p.index}`,src_image:p.src}),g+=p.width}),s.push(...b),f+=a[0].height}else s.push({x:0,y:s[s.length-1]?f:0,w:r,h:a.height,i:`image_${a.index}`,label:`${a.index}`,src_image:a.src}),f+=a.height;return s},[]);A.value=_};function Z(){if(!A.value.length){C.error("Please submit data first!");return}R.value=setTimeout(()=>{const o=e.formDataTemplate.map((r,l)=>Array.isArray(r)?r.map((u,d)=>({...u,...e.data.find(y=>y.src===u.src)})):{...r,...e.data.find(u=>u.src===r.src)});let t="";o.forEach((r,l)=>{if(Array.isArray(r)){const u=r.map((d,y)=>{if(d.isFullImage)return d.full.link?m.fullHaveLink.replace("{{src}}",d.src).replace("{{link}}",d.full.link).replace("{{target_blank}}",d.full.isTargetBlank?'target="_blank"':"").replace("{{spanBlind}}",d.full.spanBlind||""):m.fullNotLink.replace("{{src}}",d.src);{const v=d.absolute.map((f,_)=>{var a;let s=(a=f.label_position)==null?void 0:a.replace(/\n/g,"");return m.onlyLink.replace("{{link}}",f.link).replace("{{position}}",s||"position: absolute;").replace("{{target_blank}}",f.isTargetBlank?'target="_blank"':"").replace("{{spanBlind}}",f.spanBlind||"")});return m.absoluteLinks.replace("{{src}}",d.src).replace("{{list_link}}",v.join(""))}});t+=m.grid.replace("{{col}}",r.length+"").replace("{{list_link}}",u.join(""))}else{const{src:u,width:d,height:y,isFullImage:v,absolute:f,full:_}=r;if(v)_.link?t+=m.fullHaveLink.replace("{{src}}",u).replace("{{link}}",_.link).replace("{{target_blank}}",_.isTargetBlank?'target="_blank"':"").replace("{{spanBlind}}",_.spanBlind||""):t+=m.fullNotLink.replace("{{src}}",u);else{const s=f.map((a,b)=>{var p;let g=(p=a.label_position)==null?void 0:p.replace(/\n/g,"");return m.onlyLink.replace("{{link}}",a.link).replace("{{position}}",g||"position: absolute;").replace("{{target_blank}}",a.isTargetBlank?'target="_blank"':"").replace("{{spanBlind}}",a.spanBlind||"")});t+=m.absoluteLinks.replace("{{src}}",u).replace("{{list_link}}",s.join(""))}}}),t=m.root.replace("{{template}}",t).replace("{{style}}",m.style[e.size_screen===1080?"mo":"pc"]),N({template:t,nameFile:`${e.size_screen===1080?"mo":"pc"}_bos_${e.base_url.split("/").reverse()[1]}.html`}),W.value=!1},1e3)}function ee({index:o,data:t}){console.log("CHANGE DATA",o),e.data[o]=t}const N=({template:o,nameFile:t})=>{const r=new Blob([o],{type:"text/html"});me.saveAs(r,t||`${e.size_screen===1080?"mo":"pc"}_bos_${e.base_url.split("/").reverse()[1]}.html`)},te=()=>{const o=e.size_screen===1080?_e:ye,t=e.size_screen===1080?"MO":"PC",r=e.base_url.split("/").reverse()[1];O.value.validate().then(async()=>{N({template:o.replace("{{bos_file_path}}",`/uxtech/linkpage/${j().startOf("day").format("YYYYMM")}/include/${t.toLowerCase()}_bos_${r}.html`).replace("{{title}}",e.title||""),nameFile:`${t.toLowerCase()}_${r}_${j().startOf("day").format("MMDD")}.html`})}).catch(l=>{C.error(l)})},le=()=>{let o=` ,{
    "UA": "EVENT",
    "1Depth": "{{title}}",
    "2Depth": "{{device}}",
    "3Depth": "",
    "Note": "",
    "Wire": "https://wire.lgcns.com/jira/browse/COMMERCE2-{{issue}}",
    "URL": "/uxtech/linkpage/{{month}}/{{file}}",
    "ST": "완료",
    "Update": "{{date}}"
  }`;const t=e.base_url.split("/").reverse()[1],r=e.size_screen===1080?"MO":"PC",l=o.replace("{{title}}",e.title||"").replace("{{device}}",r).replace("{{month}}",j().startOf("day").format("YYYYMM")).replace("{{file}}",`${r.toLowerCase()}_${t}_${j().startOf("day").format("MMDD")}.html`).replace("{{date}}",j().startOf("day").format("YYYY-MM-DD")).replace("{{issue}}",t);navigator.clipboard.writeText(l).then(()=>{C.success("Copy json success!")}).catch(()=>{C.error("Copy json failed!")})};return ue(()=>e.listCustomLink,o=>{o&&e.isCustomListImageLink&&(e.count_image=$.value.length)}),(o,t)=>{const r=ne;return w(),M(B,null,[n(i(fe).Title,{class:""},{default:c(()=>t[6]||(t[6]=[D("Lifecare Page")])),_:1}),L("div",{class:"flex relative gap-8",style:S(x.value&&{gap:"0"})},[L("div",{class:E(["transition-all duration-300",x.value?"w-0 overflow-hidden flex-grow-0 flex-shrink-0":"flex-1 min-w-[300px]"])},[n(i(k),{ref_key:"formRef",ref:O,class:E([[x.value&&"hidden"],"sticky top-5"]),layout:"vertical",model:e,"label-col":{span:24},"wrapper-col":{span:24},autocomplete:"off"},{default:c(()=>[n(i(k).Item,{"wrapper-col":{offset:0,span:24}},{default:c(()=>[n(i(k).Item,{name:"title",label:"Title task",rules:[{required:!0,message:"Required!"}]},{default:c(()=>[n(i(I),{value:e.title,"onUpdate:value":t[0]||(t[0]=l=>e.title=l),valueModifiers:{trim:!0},"allow-clear":!0},null,8,["value"])]),_:1}),n(i(k).Item,{name:"size_screen",label:"Screen size",rules:[{required:!0,message:"Required!"}]},{default:c(()=>[n(i(Y),{value:e.size_screen,"onUpdate:value":t[1]||(t[1]=l=>e.size_screen=l)},{default:c(()=>[(w(),M(B,null,F(U,(l,u)=>n(i(Y).Option,{key:u,value:l.value},{default:c(()=>[D(ke(l.label),1)]),_:2},1032,["value"])),64))]),_:1},8,["value"])]),_:1}),n(i(k).Item,{name:"isCustomListImageLink",label:"List link image custom",rules:[{required:!0,message:"Required!"}]},{default:c(()=>[n(i(ae),{checked:e.isCustomListImageLink,"onUpdate:checked":t[2]||(t[2]=l=>e.isCustomListImageLink=l)},null,8,["checked"])]),_:1}),e.isCustomListImageLink?(w(),P(i(k).Item,{key:1,name:"listCustomLink",label:"List image: "+$.value.length},{default:c(()=>[n(i(ge),{value:e.listCustomLink,"onUpdate:value":t[5]||(t[5]=l=>e.listCustomLink=l),"allow-clear":!0,rows:5},null,8,["value"])]),_:1},8,["label"])):(w(),M(B,{key:0},[n(i(k).Item,{name:"base_url",label:"Base url image",rules:[{required:!0,message:"Required!"}]},{default:c(()=>[n(i(I),{value:e.base_url,"onUpdate:value":t[3]||(t[3]=l=>e.base_url=l),"allow-clear":!0},null,8,["value"])]),_:1}),n(i(k).Item,{name:"count_image",rules:[{required:!0,message:"Required!"}],label:"Count image"},{default:c(()=>[n(i(I),{value:e.count_image,"onUpdate:value":t[4]||(t[4]=l=>e.count_image=l),type:"number",min:0,"allow-clear":!0},null,8,["value"])]),_:1})],64)),n(i(T),{type:"primary",class:"block w-full",onClick:K},{default:c(()=>t[7]||(t[7]=[D("Submit")])),_:1})]),_:1})]),_:1},8,["class","model"])],2),L("div",{class:E(["highlight flex flex-col items-center bg-white grow-2 shrink-2 relative transition-all duration-300",e.size_screen===1080?"basis-[1080px]":"basis-[1184px]"]),style:S(A.value.length===0&&{opacity:0})},[de(L("div",{class:"sticky items-center w-full z-10 top-0 px-2 py-2 bg-[#ffffff88] backdrop-blur flex gap-3",style:S(!z.value&&{display:"none"})},[n(i(T),{shape:"circle",class:"btn-func",onClick:X},{default:c(()=>[n(i(he),{class:E(x.value&&"rotate-180")},null,8,["class"])]),_:1}),n(i(T),{class:"",onClick:Z},{default:c(()=>[n(i(G)),t[8]||(t[8]=D(" Download bos file "))]),_:1}),n(i(T),{class:"",type:"primary",onClick:te},{default:c(()=>[n(i(G)),t[9]||(t[9]=D(" Download main file "))]),_:1}),n(i(T),{shape:"circle",class:"btn-func",onClick:le},{icon:c(()=>[n(i(ve))]),_:1})],4),[[pe,z.value]]),L("div",{class:"highlight-inner",style:S({"min-width":`${e.size_screen}px`,"max-width":`${e.size_screen}px`})},[L("div",be,[(w(),P(i(se),{key:q.value,layout:A.value,"col-num":e.size_screen,"row-height":1,"is-draggable":!1,"is-resizable":!1,"is-mirrored":!1,"use-css-transforms":!1,margin:[0,0]},{default:c(()=>[(w(!0),M(B,null,F(A.value,(l,u)=>(w(),P(i(ie),{x:l.x,y:l.y,w:l.w,h:l.h,i:l.i,key:l.i},{default:c(()=>[n(r,{item:l,isGetNewData:J.value,onOnGetData:d=>ee({index:u,data:d})},null,8,["item","isGetNewData","onOnGetData"])]),_:2},1032,["x","y","w","h","i"]))),128))]),_:1},8,["layout","col-num"]))])],4)],6)],4)],64)}}});export{Ce as default};
