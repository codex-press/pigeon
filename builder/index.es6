import dom from 'dom';
import article from 'article';
import fonts from './builder/google_fonts.json';

// needs: 
//   syntax highlighting
//   preview what the fonts look like (infinite scroll type?)
//   font weights
//   link colors
//   better sizing of it and can move it around
//   add the category from font data to the font stack

let fontOptions = fonts.items.map(f => `<option>${ f.family }</option>`);

let template = `
  <div class=builder>
    <div class=option>Background color: <input class=background type=color value=#ffffff></div>
    <div class=option>Text color: <input class=color type=color value=#000000></div>

    <div class=option>
      Body font:
      <select class=body-font>
        <option selected>Default</option>
        ${ fontOptions }
      </select>
    </div>

    <div class=option>
      Header font:
      <select class=header-font>
        <option selected>Default</option>
        ${ fontOptions }
      </select>
    </div>

    <pre class=css-output><code></code></pre>
    <style></style>
  </div>
`;

let color = '';
let bgColor = '';
let bodyFont = '';
let headerFont = '';

dom.ready.then(() => {
  dom.body().append(template);

  dom('.builder').on('input', e => templateCSS());
 
  dom('input.color').on('input', e => color = e.target.value);
  dom('input.background').on('input', e => bgColor = e.target.value);
  
  dom('select.body-font').on('input', e => bodyFont = e.target.value);
  dom('select.header-font').on('input', e => headerFont = e.target.value);
});


function templateCSS() {
  let props = {body: [], headers: [], };

  if (color)
    props.body.push(`color: ${ color };`);

  if (bgColor)
    props.body.push(`background: ${ bgColor };`);

  if (bodyFont)
    props.body.push(`font-family: ${ bodyFont };`);
  
  if (headerFont)
    props.headers.push(`font-family: ${ headerFont };`);

  let css = '';

  if (bodyFont || headerFont) {
    let fonts = [bodyFont,headerFont].filter(f => !!f).join('|');
    css += `@import url('https://fonts.googleapis.com/css?family=${ fonts.replace(/ /g,'+') }');\n`;
  }

  if (props.body.length)
    css += `
body {
  ${ props.body.join('\n  ').trim() }
}`;

  if (props.headers.length)
    css += `
h1, h2, h3, h4, h5, h6 {
  ${ props.headers.join('\n  ').trim() }
}`;


  dom('.builder style').text(css);
  dom('.css-output').text(css);
}


