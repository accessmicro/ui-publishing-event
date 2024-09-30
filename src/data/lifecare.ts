const PC_MAIN_TEMPLATE = `<!DOCTYPE html>
<html lang="ko" style="height: 100%;">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0" />
    <title>{{title}}</title>
    <link rel="stylesheet" href="/V2_pc/resource/css/include.css" />
    <script src="/V2_pc/resource/js/jquery-3.5.1.min.js"></script>
    <script src="/V2_pc/resource/js/bootstrap/bootstrap.min.js"></script>
    <script src="/main.js" type="module"></script>
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
    <!-- pub -->
  </head>
  <body>
    <div hx-get="{{bos_file_path}}" hx-swap="outerHTML" hx-trigger="load"></div>
  </body>
</html>
`

const MO_MAIN_TEMPLATE = `<!DOCTYPE html>
<html lang="ko" style="height: 100%;">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0" />
    <title>{{title}}</title>
    <link rel="stylesheet" href="/V2_mo/resource/css/include.css" />
    <script src="/V2_mo/resource/js/jquery-3.5.1.min.js"></script>
    <script src="/V2_mo/resource/js/bootstrap/bootstrap.min.js"></script>
    <script src="/main.js" type="module"></script>
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
    <!-- pub -->
  </head>
  <body>
    <div hx-get="{{bos_file_path}}" hx-swap="outerHTML" hx-trigger="load"></div>
  </body>
</html>
`

export {
  PC_MAIN_TEMPLATE,
  MO_MAIN_TEMPLATE
}