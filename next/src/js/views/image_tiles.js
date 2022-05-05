function getPxlView(num) {
	var view = '';

	for( let i=0; i < num; i++) {
		view +=`<div class="unit"></div>`;
	}

	return view;
}
// 
var imageTileComponent = {
	title: 'Text Animation using pure CSS',
	description: '',
	footerText: 'Last updated 27 Jan 2018',
	view: `
	<div class="view image-tile-container">
		<div class="tile-container">
			<span class="pixel">
				${getPxlView(897)}
			</span>
		</div>
	</div>
	`
}

export { imageTileComponent };