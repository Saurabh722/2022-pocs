function get3dView(num) {
    var view = '';

    for( let i=0; i < num; i++) {
        view +='<div class="ball_item"></div>';
    }

    return view;
}

var ball3DComponent = {
    title: 'Ball tiles using pure CSS',
    description: '',
    footerText: 'Last updated 29 Dec 2017',
    view: `
    <div class="view ball-3d-view">
        <div class="ball">
            ${get3dView(60)}
        </div>
    </div>
    `
  }
  
  export { ball3DComponent };