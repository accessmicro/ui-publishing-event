const TEMPLATE_DEFAULT = {
  fullNotLink: `<div style="position: relative"><img class="img-linkpage" src="{{src}}" alt="img" /></div>`,
  fullHaveLink: `<div style="position: relative"><a href="{{link}}" id="ga_event_click" {{target_blank}}><span class="blind">{{spanBlind}}</span><img class="img-linkpage" src="{{src}}" alt="img" /></a></div>`,
  absoluteLinks: `<div style="position: relative">{{list_link}}<img class="img-linkpage" src="{{src}}" alt="img" /></div>`,
  onlyLink: `<a href="{{link}}" id="ga_event_click" style="background-color: transparent; {{position}}" {{target_blank}}><span class="blind">{{spanBlind}}</span></a>`,
  grid: `<div style="display: grid; grid-template-columns: repeat({{col}}, 1fr); grid-gap: 0;">{{list_link}}</div>`,
  root: `{{head}}\n<div class="eventPage-shell">{{template}}{{footer}}</div></body></html>`,
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
<body>`,
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

  <body>`
  },
  footer: {
    mo: `<div style="margin: 56px 0; display: flex; justify-content: center;">
    <a target="_self" href="https://www.lgpral.kr/eventExhibition/1464" id="ga_event_click"
      style="display: block; width: 270px; height: 48px; line-height: 48px; font-size: 20px; font-weight: 700; text-align: center; background: #242223; color: #fff;">
      <span class="blind">목록 이동</span>
      목록
    </a>
  </div>
`,
  pc: `<div style="margin: 56px 0; display: flex; justify-content: center;">
  <a target="_self" href="https://www.lgpral.kr/eventExhibition/1464" id="ga_event_click"
    style="display: block; width: 270px; height: 48px; line-height: 48px; font-size: 20px; font-weight: 700; text-align: center; background: #242223; color: #fff;">
    <span class="blind">목록 이동</span>
    목록
  </a>
</div>
`
  }
}

export {
  TEMPLATE_DEFAULT
}