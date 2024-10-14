import{S as ae,r as ie,M as se,_ as ne}from"./vue3-grid-layout-C2IJjFBD.js";import{d as re,r as h,i as oe,j as R,k as ce,a as w,c as D,b as n,w as c,u as s,g as x,n as S,l as E,m as pe,v as de,p as P,F as T,h as A,q as ue,s as I,t as M,T as me,x as v,I as q,S as $,y as Y,z as ge,B,D as fe,A as he,E as ke,G as ve}from"./index-DQp7ueh_.js";const m={fullNotLink:'<div style="position: relative"><img class="img_linkpage" src="{{src}}" alt="img" /></div>',fullHaveLink:'<div style="position: relative"><a href="{{link}}" id="ga_event_click" {{target_blank}}><span class="blind">{{spanBlind}}</span><img class="img_linkpage" src="{{src}}" alt="img" /></a></div>',absoluteLinks:'<div style="position: relative">{{list_link}}<img class="img_linkpage" src="{{src}}" alt="img" /></div>',onlyLink:'<a href="{{link}}" id="ga_event_click" style="background-color: transparent; {{position}}" {{target_blank}}><span class="blind">{{spanBlind}}</span></a>',grid:'<div style="display: grid; grid-template-columns: repeat({{col}}, 1fr); grid-gap: 0;">{{list_link}}</div>',root:`{{head}}
<div style="display: inline-flex; flex-direction: column">{{template}}{{footer}}</div></body></html>`,head:{mo:`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{title}}</title>
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
</head>
<body>
  <link rel="stylesheet" href="https://www.lgpral.kr/V2_mo/resource/css/LGPRAL/linkpage.css" />`,pc:`<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
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
  </head>

  <body>
    <link rel="stylesheet" href="https://www.lgpral.kr/V2_pc/resource/css/LGPRAL/linkpage.css" />`},footer:{mo:`<div style="position: relative">
    <a href="https://www.lgpral.kr/eventExhibition/1464"
      style="position: absolute; display: block; top: 30%; left: 34%; width: 32%; height: 55%; font-size: 0; color: rgba(0, 0, 0, 0)"
      id="ga_event_click"></a>
    <img class="img_linkpage" src="https://img2.lgpral.kr/pral/bos/202308/0809/btn_mo_list_single.png" alt="" />
  </div>`,pc:`<div style="position: relative">
  <a href="https://www.lgpral.kr/eventExhibition/1464" style="position: absolute; display: block; top: 30%; left: 34%; width: 32%; height: 55%; font-size: 0; color: rgba(0, 0, 0, 0)" id="ga_event_click"></a>
  <img class="img_linkpage" src="https://img2.lgpral.kr/pral/bos/202308/0809/btn_pc_list_single.png" alt="" />
</div>`}},_e={class:""},Le=re({__name:"PralPage",setup(ye){const V=[{label:"MO (1080px)",value:1080},{label:"PC (1184px)",value:1184}],z=h(null),F=h(),U=h(0),L=h(!1),j=h(!0),H=h(""),X=h(!1),J=h(!1),e=oe({size_screen:1184,base_url:"https://img2.lgpral.kr/pral/bos/202410/53334/pc_pral_promotion_",count_image:10,data:[],formDataTemplate:[],title:"SAMPLE",isCustomListImageLink:!1,listCustomLink:void 0}),C=h([]),O=R(()=>e.listCustomLink?e.listCustomLink.split(`
`).map(o=>o.trim()):[]),G=R(()=>`${e.size_screen===1080?"mo":"pc"}_pral_${e.base_url.split("_").reverse()[1]}_${I().startOf("day").format("MMDD")}.html`),W=()=>{L.value=!L.value},K=()=>{F.value.validate().then(async()=>{U.value++,H.value="",j.value=!0,Q()}).catch(o=>{A.error(o)})},Q=async()=>{const{base_url:o,count_image:t,size_screen:r,isCustomListImageLink:l}=e,d=(l?O.value:Array.from({length:t}).map((i,a)=>`${o}${a<9?"0"+(a+1):a+1}.png`)).map((i,a)=>new Promise((b,f)=>{const u=new Image;u.src=i,u.onload=function(){b({index:a+1,height:this.height,width:this.width,src:i})},u.onerror=function(){f("Error when load image")}})),_=await Promise.all(d).catch(i=>{A.error(i)}),k=_==null?void 0:_.reduce((i,a)=>{const{width:b}=a;if(b===r)i.push(a);else{let f=i[i.length-1];Array.isArray(f)?f.reduce((u,N)=>u+N.width,0)===r?i=[...i,[a]]:(f=i.pop(),i=[...i,[...f,a]]):i=[...i,[a]]}return i},[]);e.formDataTemplate=k;let g=0;const y=k==null?void 0:k.reduce((i,a)=>{if(Array.isArray(a)){let b=[],f=0;a.forEach((u,N)=>{b.push({x:f,y:g,w:u.width,h:u.height,i:`image_${u.index}`,label:`${u.index}`,src_image:u.src}),f+=u.width}),i.push(...b),g+=a[0].height}else i.push({x:0,y:i[i.length-1]?g:0,w:r,h:a.height,i:`image_${a.index}`,label:`${a.index}`,src_image:a.src}),g+=a.height;return i},[]);C.value=y};function Z(){if(!C.value.length){A.error("Please submit data first!");return}z.value&&clearTimeout(z.value),e.data.length===e.count_image&&(z.value=setTimeout(()=>{const o=e.formDataTemplate.map((r,l)=>Array.isArray(r)?r.map((p,d)=>({...p,...e.data.find(_=>_.src===p.src)})):{...r,...e.data.find(p=>p.src===r.src)});let t="";o.forEach((r,l)=>{if(Array.isArray(r)){const p=r.map((d,_)=>{if(d.isFullImage)return d.full.link?m.fullHaveLink.replace("{{src}}",d.src).replace("{{link}}",d.full.link).replace("{{target_blank}}",d.full.isTargetBlank?'target="_blank"':"").replace("{{spanBlind}}",d.full.spanBlind||""):m.fullNotLink.replace("{{src}}",d.src);{const k=d.absolute.map((g,y)=>{var a;let i=(a=g.label_position)==null?void 0:a.replace(/\n/g,"");return m.onlyLink.replace("{{link}}",g.link).replace("{{position}}",i||"position: absolute;").replace("{{target_blank}}",g.isTargetBlank?'target="_blank"':"").replace("{{spanBlind}}",g.spanBlind||"")});return m.absoluteLinks.replace("{{src}}",d.src).replace("{{list_link}}",k.join(""))}});t+=m.grid.replace("{{col}}",r.length+"").replace("{{list_link}}",p.join(""))}else{const{src:p,width:d,height:_,isFullImage:k,absolute:g,full:y}=r;if(k)y.link?t+=m.fullHaveLink.replace("{{src}}",p).replace("{{link}}",y.link).replace("{{target_blank}}",y.isTargetBlank?'target="_blank"':"").replace("{{spanBlind}}",y.spanBlind||""):t+=m.fullNotLink.replace("{{src}}",p);else{const i=g.map((a,b)=>{var u;let f=(u=a.label_position)==null?void 0:u.replace(/\n/g,"");return m.onlyLink.replace("{{link}}",a.link).replace("{{position}}",f||"position: absolute;").replace("{{target_blank}}",a.isTargetBlank?'target="_blank"':"").replace("{{spanBlind}}",a.spanBlind||"")});t+=m.absoluteLinks.replace("{{src}}",p).replace("{{list_link}}",i.join(""))}}}),t=m.root.replace("{{template}}",t).replace("{{head}}",m.head[e.size_screen===1080?"mo":"pc"]).replace("{{title}}",e.title||"SAMPLE").replace("{{footer}}",m.footer[e.size_screen===1080?"mo":"pc"]),te({template:t,nameFile:G.value}),J.value=!1},1e3))}function ee({index:o,data:t}){console.log("CHANGE DATA",o),e.data[o]=t}const te=({template:o,nameFile:t})=>{const r=new Blob([o],{type:"text/html"});ue.saveAs(r,t)},le=()=>{let o=` ,{
    "UA": "{{device}}",
    "1Depth": "{{title}}",
    "2Depth": "",
    "3Depth": "",
    "Note": "",
    "Wire": "https://wire.lgcns.com/jira/browse/COMMERCE2-{{issue}}",
    "URL": "/uxtech/linkpage/{{month}}/{{file}}",
    "ST": "완료",
    "Update": "{{date}}"
  }`;const t=e.base_url.split("/").reverse()[1],r=e.size_screen===1080?"MO":"PC",l=o.replace("{{title}}",e.title||"").replace("{{device}}",r).replace("{{month}}",I().startOf("day").format("YYYYMM")).replace("{{file}}",G.value).replace("{{date}}",I().startOf("day").format("YYYY-MM-DD")).replace("{{issue}}",t);navigator.clipboard.writeText(l).then(()=>{A.success("Copy json success!")}).catch(()=>{A.error("Copy json failed!")})};return ce(()=>e.listCustomLink,o=>{o&&e.isCustomListImageLink&&(e.count_image=O.value.length)}),(o,t)=>{const r=ne;return w(),D(T,null,[n(s(me).Title,{class:""},{default:c(()=>t[6]||(t[6]=[M("Pral Page")])),_:1}),x("div",{class:"flex relative gap-8",style:E(L.value&&{gap:"0"})},[x("div",{class:S(["transition-all duration-300",L.value?"w-0 overflow-hidden flex-grow-0 flex-shrink-0":"flex-1 min-w-[300px]"])},[n(s(v),{ref_key:"formRef",ref:F,class:S([[L.value&&"hidden"],"sticky top-5"]),layout:"vertical",model:e,"label-col":{span:24},"wrapper-col":{span:24},autocomplete:"off"},{default:c(()=>[n(s(v).Item,{"wrapper-col":{offset:0,span:24}},{default:c(()=>[n(s(v).Item,{name:"title",label:"Title task",rules:[{required:!0,message:"Required!"}]},{default:c(()=>[n(s(q),{value:e.title,"onUpdate:value":t[0]||(t[0]=l=>e.title=l),valueModifiers:{trim:!0},"allow-clear":!0},null,8,["value"])]),_:1}),n(s(v).Item,{name:"size_screen",label:"Screen size",rules:[{required:!0,message:"Required!"}]},{default:c(()=>[n(s($),{value:e.size_screen,"onUpdate:value":t[1]||(t[1]=l=>e.size_screen=l)},{default:c(()=>[(w(),D(T,null,Y(V,(l,p)=>n(s($).Option,{key:p,value:l.value},{default:c(()=>[M(ve(l.label),1)]),_:2},1032,["value"])),64))]),_:1},8,["value"])]),_:1}),n(s(v).Item,{name:"isCustomListImageLink",label:"List link image custom",rules:[{required:!0,message:"Required!"}]},{default:c(()=>[n(s(ae),{checked:e.isCustomListImageLink,"onUpdate:checked":t[2]||(t[2]=l=>e.isCustomListImageLink=l),disabled:!0},null,8,["checked"])]),_:1}),e.isCustomListImageLink?(w(),P(s(v).Item,{key:1,name:"listCustomLink",label:"List image: "+O.value.length},{default:c(()=>[n(s(ge),{value:e.listCustomLink,"onUpdate:value":t[5]||(t[5]=l=>e.listCustomLink=l),"allow-clear":!0,rows:5},null,8,["value"])]),_:1},8,["label"])):(w(),D(T,{key:0},[n(s(v).Item,{name:"base_url",label:"Base url image",rules:[{required:!0,message:"Required!"}]},{default:c(()=>[n(s(q),{value:e.base_url,"onUpdate:value":t[3]||(t[3]=l=>e.base_url=l),"allow-clear":!0},null,8,["value"])]),_:1}),n(s(v).Item,{name:"count_image",rules:[{required:!0,message:"Required!"}],label:"Count image"},{default:c(()=>[n(s(q),{value:e.count_image,"onUpdate:value":t[4]||(t[4]=l=>e.count_image=l),type:"number",min:0,"allow-clear":!0},null,8,["value"])]),_:1})],64)),n(s(B),{type:"primary",class:"block w-full",onClick:K},{default:c(()=>t[7]||(t[7]=[M("Submit")])),_:1})]),_:1})]),_:1},8,["class","model"])],2),x("div",{class:S(["highlight flex flex-col items-center bg-white grow-2 shrink-2 relative transition-all duration-300",e.size_screen===1080?"basis-[1080px]":"basis-[1184px]"]),style:E(C.value.length===0&&{opacity:0})},[pe(x("div",{class:"sticky items-center w-full z-10 top-0 px-2 py-2 bg-[#ffffff88] backdrop-blur flex gap-3",style:E(!j.value&&{display:"none"})},[n(s(B),{shape:"circle",class:"btn-func",onClick:W},{default:c(()=>[n(s(fe),{class:S(L.value&&"rotate-180")},null,8,["class"])]),_:1}),n(s(B),{shape:"circle",class:"btn-func",onClick:Z},{icon:c(()=>[n(s(he))]),_:1}),n(s(B),{shape:"circle",class:"btn-func",onClick:le},{icon:c(()=>[n(s(ke))]),_:1})],4),[[de,j.value]]),x("div",{class:"highlight-inner",style:E({"min-width":`${e.size_screen}px`,"max-width":`${e.size_screen}px`})},[x("div",_e,[(w(),P(s(ie),{key:U.value,layout:C.value,"col-num":e.size_screen,"row-height":1,"is-draggable":!1,"is-resizable":!1,"is-mirrored":!1,"use-css-transforms":!1,margin:[0,0]},{default:c(()=>[(w(!0),D(T,null,Y(C.value,(l,p)=>(w(),P(s(se),{x:l.x,y:l.y,w:l.w,h:l.h,i:l.i,key:l.i},{default:c(()=>[n(r,{item:l,isGetNewData:X.value,onOnGetData:d=>ee({index:p,data:d})},null,8,["item","isGetNewData","onOnGetData"])]),_:2},1032,["x","y","w","h","i"]))),128))]),_:1},8,["layout","col-num"]))])],4)],6)],4)],64)}}});export{Le as default};
