import dom from 'dom';
import article from 'article';

import './pigeon';
import './raven';
import './toucan';

let themes = 'basic pigeon pigeon-inverted pigeon-taxi raven raven-celtic raven-coldshoulder raven-ebony raven-goldrush raven-inverted toucan heron heron-greenland heron-cherry'.split(' ');

dom.ready.then(() => {

  let i = Math.round(Math.random() * themes.length);
  let theme = themes[i];
  dom(document.documentElement).addClass(theme);

  let links = themes.map(t => `<div>${t}</div>`).join('');
  dom.body().append(`<div class="chooser sidebar">${ links }</div>`);

  dom('.chooser div').on('click', e => {
    dom(document.documentElement).removeClass(theme);
    theme = e.target.textContent;
    dom(document.documentElement).addClass(theme);
    article.resize();
  });

});


