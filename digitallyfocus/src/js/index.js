import './views/scss/view.scss';

function getMenuView (submenus) {
	let subMenuStr = '';

	submenus.forEach(function (menu) {
		subMenuStr += `<li><a href="${menu.link}">${menu.name}</a></li>`;
	});
	return subMenuStr;
}

function getHeaderView (header) {
	return `
	<div class="responsive-header">
		<div class="logoarea">
			${header.logoarea}
		</div>
		<div class="menubar">
			<span class="mob-logo">${header.logoarea}</span>
			<input type="checkbox" id="navbar-checkbox" class="navbar-checkbox">
			<nav class="menu">
				<ul>
					${
						function (menus) {
							let menuStr = '';
							menus.forEach(function (menu) {
								if (menu.subMenus && menu.subMenus.length) {
									menuStr += `
										<li>
											${menu.name} &#9662;
											<input type="checkbox" class="submenu-checkbox" id="${menu.name}">
											<label class="submenu-label" for="${menu.name}"></label>
											<ul>
												${getMenuView (menu.subMenus)}
											</ul>
										</li>
									`;
								} else {
									menuStr += `<li><a href="${menu.link}">${menu.name}</a></li>`;
								}
							});
							return menuStr;
						} (header.menus)
					}
				</ul>
				<label for="navbar-checkbox" class="navbar-handle"></label>
			</nav>
		</div>
	</div>
	`;
}

function getHomeView (home) {
	return `
	<div id="${home.id}"" class="bgimg-1 page-width"></div>
	<div class="page-width content-padding" style="color: #777;background-color:white;text-align:center;text-align: justify;">
		<h3 style="text-align:center;">
		<font style="vertical-align: inherit;">
			<font style="vertical-align: inherit;">${home.title}</font>
		</font>
		</h3>
		<p>
		<div style="vertical-align: inherit; text-align:center;">
			<font style="vertical-align: inherit;">
				${home.description}
			</font>

			<font style="vertical-align: inherit;">${home.subdescription}</font>
		</div>
		</p>
		<h3 style="text-align:center;">
			<font style="vertical-align: inherit;">
				<font style="vertical-align: inherit;">${home.title}</font>
			</font>
		</h3>
		<div style="vertical-align: inherit; text-align:center;">
			<font style="vertical-align: inherit;">
				${home.text}
			</font>
		</div>
	</div>`;
}

function getContactView (contact) {
	return `
	<div id="${contact.id}" class="contact-us page-width">
		<div class="column">
			<h3 style="text-align:center;">
				<font style="vertical-align: inherit;">
					<font style="vertical-align: inherit;">${contact.title}</font>
				</font>
			</h3>
			<div class="border" style="background-color:transparent;">
				<font style="vertical-align: inherit;">
					${contact.description}
				</font>
				<font style="vertical-align: inherit;">
					<a href="#">${contact.email}</a>
				</font>
			</div>
		</div>
		<div class="column">
			<div><input type="text" placeholder="Name"/></div>
			<div><input type="text" placeholder="Email"/></div>
			<div><textarea placeholder="Message"></textarea></div>
		</div>
	</div>
	`;
}

function getFooterColumnView (column) {
	return `
	<li>
		<h5>${column.title}</h5>
		${
			function (rows) {
				let rowStr = '';
				rows.forEach(function (row) {
					rowStr += `<div>${row}</div>`;
				});
				return rowStr;
			} (column.contact)
		}
	</li>
	`
}

function getFooterView (footer) {
	return `
	<div class="footer content-padding" style="color: #cac2c2;background-color: #384c51;text-align:center;text-align: justify;">
		<ul>
			${getFooterColumnView (footer.phones)}
			${getFooterColumnView (footer.emails)}
			<li>
				<h5>FEEDBACK</h5>
				<div><input type="text" placeholder="your email"/></div>
				<div><textarea placeholder="Feedback"></textarea></div>
			</li>
			${getFooterColumnView (footer.joinUs)}
		</ul>
		<div style="text-align: center;font-size: 9px;">© ${footer.year} | ${footer.company}</div>

	</div>
	`;
}

function pageView (view) {
	return `
	<div id="${view.id}" class="page-width title-bar" style="position:relative;">
		<div style="color:#fff;background-color:#282E34;text-align:center;padding:5px;text-align: justify;">
			<h3 style="text-align:center;">
				<font style="vertical-align: inherit; color:#fff">
					<font style="vertical-align: inherit;">${view.title}</font>
				</font>
			</h3>
		</div>
	</div>

	<div id="customer-testimonials" class="${view.class} page-width">
		<div class="caption">
			<h3 style="text-align:center;">
				<font style="vertical-align: inherit;">
					<font style="vertical-align: inherit;">${view.title}</font>
				</font>
			</h3>
			<div class="border" style="background-color:transparent;">
				<font style="vertical-align: inherit;">
					${view.description}
				</font>
			</div>
		</div>
	</div>`;
}

function getcardsView(fogDATA) {
	const headView = getHeaderView(fogDATA.pages.header);
	const homeView = getHomeView(fogDATA.pages.home);
	const contactView = getContactView(fogDATA.pages.contactme);
	const footerView = getFooterView(fogDATA.pages.footer);

	const mainViews = function (views) {
		let viewStr = '';
		views.forEach(function (view) {
			viewStr += pageView(view);
		});
		return viewStr;
	}(fogDATA.pages.views);

	var cardView = `
		${headView}
		${homeView}
		${mainViews}
		${contactView}
		${footerView}
	`;

	return cardView;
}

function updatecardsLinks(cardDATA) {
	$("body").append(getcardsView(cardDATA));
}

/* ----------------------- Service ----------------------- */

function loadcards(token) {
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/cards.json",
		success: function (data) {
			console.log(data);
			updatecardsLinks(data);
		},
		error: function () {
			console.log("error")
		}
	})
}

$(loadcards);