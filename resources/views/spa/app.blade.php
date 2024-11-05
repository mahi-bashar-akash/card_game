 <!doctype html>
 <html lang="en">
     <head>
         {{-- Title --}}
         <title> Game </title>

         {{-- Meta resources --}}
         @include('component.meta')

         {{-- Style sheet --}}
         @vite('resources/scss/style-sheet.scss')

         {{-- App config --}}
         @vite('resources/js/spa/app.js')
     </head>
     <body>
         <div id="app"></div>
     </body>
 </html>
