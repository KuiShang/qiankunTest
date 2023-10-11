const Home = { template: '<div>vue Home1 </div>' };
// const About = { template: '<div>vue About2 </div>' };

const About = () =>
  import(
    /* webpackChunkName: "edit-attrVal" */
    './about.vue'
  );

const routes = [
  { path: '/', name: "home", component: Home },
  { path: '/about', name: "about", component: About },
];
export default routes;
