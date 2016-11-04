import dom from 'dom';
import article from 'article';

import icons from './icons/birds.js';
import './pigeon';
import './raven';
import './toucan';

let s = string => string.split(' ');

let themes = {
  basic: [''],
  pigeon: s(' inverted taxi'),
  raven: s(' celtic coldshoulder ebony goldrush inverted'),
  toucan: [''],
  heron: s(' greenland cherry cyan'),
};

dom.ready.then(() => {

  let i = Math.round(Math.random() * (Object.keys(themes).length - 1));
  let theme = Object.keys(themes)[i];
  i = Math.round(Math.random() * (themes[theme].length - 1));
  let classes = theme + ' ' + themes[theme][i];
  dom(document.documentElement).addClass(classes.trim());

  let html = '<div class=drag></div>';
  html += Object.keys(themes).reduce((html, theme) => {
    let swatches = themes[theme].map(color => {
      return `
        <div class="swatch ${theme} ${color}" data-value="${theme} ${color || ''}">
        </div>`;
    }).join('');
    return html + `<div class=theme>${ icons[theme] || '' } ${ swatches }</div>`;
  }, '');

  dom.body().append(`<div class=chooser>${ html }</div>`);

  let chooser = dom.first('.chooser')
  dom(chooser).setTransform({
    y: window.innerHeight / 2 - chooser.clientHeight / 2,
    x: window.innerWidth / 2 - chooser.clientWidth / 2,
  });

  // dragging the thing
  let drag = dom('.chooser .drag');
  let x,y;
  let mousemove = e => {
    e.preventDefault();
    dom(chooser).setTransform({
      y: e.clientY - y,
      x: e.clientX - x,
    });
  }
  drag.on('mousedown', e => {
    x = e.clientX - drag.rect().left;
    y = e.clientY - drag.rect().top;
    dom(document).on('mousemove', mousemove)
  });
  drag.on('mouseup', e => dom(document).off('mousemove', mousemove));


  dom('.chooser .swatch').on('click', e => {
    dom(document.documentElement).removeClass(...classes.trim().split(' '));
    classes = dom(e.target).closestW('.swatch').data('value').trim();
    console.log(classes);
    dom(document.documentElement).addClass(classes);
    article.resize();
  });

});


