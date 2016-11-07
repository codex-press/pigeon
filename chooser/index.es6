import dom from 'dom';
import article from 'article';
import * as u from 'utility';

import icons from '../icons/birds.js';
import '../pigeon/index.es6';
import '../raven/index.es6';
import '../toucan/index.es6';

let s = string => string.split(' ');

let colors = {
  basic: ['default'],
  pigeon: s('default inverted taxi'),
  raven: s('default celtic coldshoulder ebony goldrush inverted'),
  heron: s('default greenland cherry cyan'),
  toucan: ['default'],
};

article.ready.then(() => {

  // if the chooser exists, don't do anything. this used in /docs/themes/pigeon
  // etc.
  if (dom('.chooser').length > 0)
    return;

  // allows you to 
  if (dom('.scoped').length === 0)
    dom(document.documentElement).addClass('scoped');

  let html = '<div class=result></div>';
  html += Object.keys(colors).reduce((html, theme) => {
    let swatches = colors[theme].map(color => {
      return `
        <div class="swatch scoped ${theme} ${color}"
          data-theme="${theme}" data-color="${color}">
        </div>`;
    }).join('');
    return html + `<div class=theme>${ icons[theme] || '' } ${ swatches }</div>`;
  }, '');

  dom.body().append(`<div class="fixed chooser">${ html }</div>`);

  let i = Math.round(Math.random() * (Object.keys(colors).length - 1));
  let theme = Object.keys(colors)[i];
  i = Math.round(Math.random() * (colors[theme].length - 1));
  let color = colors[theme][i];
  if (u.parseURLParams().theme) {
    theme = u.parseURLParams().theme;
    color = 'default';
  }
  setColor(theme, color);

  // changing the swatches
  dom('.chooser .scoped').on('click', e => {
    dom('.scoped:not(.swatch)').removeClass(theme, color);
    theme = dom(e.target).closestW('.swatch').data('theme');
    color = dom(e.target).closestW('.swatch').data('color');
    setColor(theme, color);
  });

  function setColor(theme, color) {
    dom('.scoped:not(.swatch)').addClass(theme, color);
    let text = 'themes/' + theme;
    if (color !== 'default')
      text += '/' + color;
    dom('.chooser .result').text(text);
    setTimeout(() => article.resize());
  }

  // select all when they click on it
  dom('.chooser .result').on('click', e => {
    var range = document.createRange();
    range.selectNode(dom.first('.chooser .result'));
    getSelection().removeAllRanges();
    getSelection().addRange(range);
  });

  // dragging the .chooser
  let chooser = dom.first('.chooser')

  // set in the bottom left to start with
  let y = window.innerHeight - chooser.clientHeight - 30;
  let x = 30;
  dom(chooser).setTransform({x, y});

  // this offset of the mouse inside the .chooser, set on mousedown, used in 
  // mouseup
  let offsetX, offsetY;
  let mousemove = e => {
    e.preventDefault();
    let maxY = window.innerHeight - chooser.clientHeight;
    let maxX = window.innerWidth - chooser.clientWidth;
    y = Math.min(maxY, Math.max(0, e.clientY - offsetY)),
    x = Math.min(maxX, Math.max(0, e.clientX - offsetX)),
    dom(chooser).setTransform({x, y});
  };

  dom(chooser).on('mousedown', e => {
    // not on child elements
    if (e.target != chooser)
      return;
    offsetX = e.clientX - dom(chooser).rect().left;
    offsetY = e.clientY - dom(chooser).rect().top;
    dom(window).on('mousemove', mousemove)
    dom(window).on('mouseup', e => dom(window).off('mousemove', mousemove));
  });

  article.on('resize', () => {
    let maxY = window.innerHeight - chooser.clientHeight;
    let maxX = window.innerWidth - chooser.clientWidth;
    y = Math.min(maxY, Math.max(0, y));
    x = Math.min(maxX, Math.max(0, x));
    dom(chooser).setTransform({y, x});
  });

});


