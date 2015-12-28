import PageObject from 'razer-cars-app/tests/page-object';
import navItem from './helpers/nav-item';

export default PageObject.create({
  navigate: navItem('.mdl-navigation__link'),
});
