function getDot(n) {
  var dots = '';
  for(let i=0; i<n; i++) {
    dots+='<div class="dot"></div>';
  }
  
  return dots;
}


var shadowComponent = {
  title: 'Shadow Animation using pure CSS',
  description: '',
  footerText: 'Last updated 29 Dec 2017',
  view: `
    <div class="view shadow-view">
      <div class="shadow-frame">
        ${ getDot(1) }
      </div>
    </div>
  `
}

export { shadowComponent };
