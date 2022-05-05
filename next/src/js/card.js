function card (component) {
  var selected = component.title == 'Shadow Animation using pure CSS1' ? ' selected' : ''
  return `
  <a class="ss-card${selected}">
    <span class="close-btn">✕</span>
    <div class="view-display">
      <div class="frame">
        ${ component.view }
      </div>
    </div>

    <div class="card-block">
      <h4 class="card-title">${ component.title }</h4>
      <p class="card-text">
        ${ component.description }
      </p>
    </div>
    <div class="card-footer">
      <small class="text-muted">${ component.footerText }</small>
    </div>
  </a>
  `
}

function cards( components ) {
  var cardsView = '';

  for(let i=0; i < components.length; i++) {
    cardsView += card(components[i])
  }

  return cardsView;
}

export { cards };
