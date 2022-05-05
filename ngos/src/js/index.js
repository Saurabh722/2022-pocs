import './views/scss/view.scss';


function getNGOCardsView(ngos) {
	var cardView = "";

	ngos.forEach(function(ngo){
		cardView += `
		<div class="card">
			<img src="${ngo.thumbnail}"/>
			<div class="card-overlay">
				<h3>${ngo.title}</h3>
				<p>${ngo.text}</p>
			</div>
		</div>
		`
	});

	return cardView;
}

function getNGOsView(ngoDATA) {
	var ngoView = `
	<div class="main-container">
		<div class="banner">
			<img src="img/ngo-banner.jpg"/>
			<div class="banner-image-text">neXt</div>
		</div>
		<div class="ngo-container">
			<!-- <header>NGOs</header> -->
			<div class="ngo-grid">
				${getNGOCardsView(ngoDATA.ngos)}
			</div>
		</div>
	</div>
	`;
	return ngoView;
}

function updateNGOsLinks(ngoDATA) {
	$("#main-page").html(getNGOsView(ngoDATA));
}

/* ----------------------- End Parser ----------------------- */

/* ----------------------- Service ----------------------- */

function loadNGOs($file, isRender) {
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/ngos.json",
		success: function (data) {
			console.log(data);
			updateNGOsLinks(data);
		},
		error: function () {
			console.log("error")
		}
	})
}

/* ----------------------- End Service ----------------------- */

/* ----------------------- View ----------------------- */

/* ----------------------- End View ----------------------- */


/* ----------------------- EventBinding ----------------------- */

$(loadNGOs);