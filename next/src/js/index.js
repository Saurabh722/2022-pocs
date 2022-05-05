import './views/scss/view.scss';

import { components } from './components';
import { cards } from './card';

var mainView = `
<div class="responsive-header">
        <div class="logoarea">
            <span class="logo"></span>
            <span class="logo-text">neXt move</span>
        </div>
        <div class="menubar">
            <div class="mob-logo">
              <img src="imgs/css-king-white-2-70x74.svg"/><span>neXt move</span>
            </div>
            <input type="checkbox" id="navbar-checkbox" class="navbar-checkbox">
            <nav class="menu">
                <ul>
                    <li>About!</li>
                    <li>CSS Only
                        <input type="checkbox" class="submenu-checkbox" id="bra-tab">
                        <label for="bra-tab" class="submenu-label"></label>
                        <ul>
                            <li>Limited time</li>
                            <li>New Arrivals</li>
                            <li>All bras</li>
                            <li>Styles</li>
                        </ul>
                    </li>
                    <li>
                        Components
                        <input type="checkbox" class="submenu-checkbox" id="panties-tab">
                        <label class="submenu-label" for="panties-tab"></label>
                        <ul>
                            <li>Limited time</li>
                            <li>New Arrivals</li>
                            <li>All panties</li>
                            <li>Styles</li>
                        </ul>
                    </li>
                    <li>Forum
                        <input type="checkbox" class="submenu-checkbox" id="sport-tab">
                        <label class="submenu-label" for="sport-tab"></label>
                        <ul>
                            <li>Limited time</li>
                            <li>New Arrivals</li>
                            <li>All sport</li>
                            <li>Styles</li>
                        </ul>
                    </li>
                    <li>ARTs</li>
                </ul>
                <label for="navbar-checkbox" class="navbar-handle"></label>
            </nav>
        </div>
    </div>
  <div class="page">
  <div class="page-container">
    <div class="ss-cards-container">
    ${ cards(components) }
    </div>
  </div>
</div>
<footer></footer>
`
export { mainView };
