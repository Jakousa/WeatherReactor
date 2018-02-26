const template = body => `
<!DOCTYPE html>
<html>
  <head>
    <title>reaktor 2018</title>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
  </head>
  <body>
    <div id="app">${body}</div>
    <script src="dist/main.js"></script>    
  </body>
</html>
`

module.exports = template
