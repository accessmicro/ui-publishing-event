const TEMPLATE_DEFAULT = {
  fullNotLink: `<div style="position: relative"><img class="img_linkpage" src="{{src}}" alt="img" /></div>`,
  fullHaveLink: `<div style="position: relative"><a href="{{link}}" id="ga_event_click" {{target_blank}}><span class="blind">{{spanBlind}}</span><img class="img_linkpage" src="{{src}}" alt="img" /></a></div>`,
  absoluteLinks: `<div style="position: relative">{{list_link}}<img class="img_linkpage" src="{{src}}" alt="img" /></div>`,
  onlyLink: `<a href="{{link}}" id="ga_event_click" style="background-color: transparent; {{position}}" {{target_blank}}><span class="blind">{{spanBlind}}</span></a>`,
  grid: `<div style="display: grid; grid-template-columns: repeat({{col}}, 1fr); grid-gap: 0;">{{list_link}}</div>`,
  root: `{{head}}\n<div style="display: inline-flex; flex-direction: column">{{template}}{{footer}}</div></body></html>`,
  head: {
    mo: `<!DOCTYPE html>
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
  </script>
</head>
<body>
  <link rel="stylesheet" href="https://www.lgpral.kr/V2_mo/resource/css/LGPRAL/linkpage.css" />`,
    pc: `<!DOCTYPE html>
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
    </script>
  </head>

  <body>
    <link rel="stylesheet" href="https://www.lgpral.kr/V2_pc/resource/css/LGPRAL/linkpage.css" />`
  },
  footer: {
    mo: `<div style="position: relative">
    <a href="https://www.lgpral.kr/eventExhibition/1464"
      style="position: absolute; display: block; top: 30%; left: 34%; width: 32%; height: 55%; font-size: 0; color: rgba(0, 0, 0, 0)"
      id="ga_event_click"></a>
    <img class="img_linkpage" src="https://img2.lgpral.kr/pral/bos/202308/0809/btn_mo_list_single.png" alt="" />
  </div>`,
  pc: `<div style="position: relative">
  <a href="https://www.lgpral.kr/eventExhibition/1464" style="position: absolute; display: block; top: 30%; left: 34%; width: 32%; height: 55%; font-size: 0; color: rgba(0, 0, 0, 0)" id="ga_event_click"></a>
  <img class="img_linkpage" src="https://img2.lgpral.kr/pral/bos/202308/0809/btn_pc_list_single.png" alt="" />
</div>`
  }
}

export {
  TEMPLATE_DEFAULT
}