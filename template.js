export default (title, body, jsfile) => `
<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
  </head>
  <body>
    <div id="app">${body}</div>
    <script src="dist/${jsfile}"></script>    
  </body>
</html>
`
