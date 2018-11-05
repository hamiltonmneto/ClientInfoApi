
export class App {

   configureRouter(config, router){
      config.title = "My Monitor System"
      config.map([
        {route: 'home', name: 'home', moduleId: 'home/home', title: 'Home'}, 
        {route: 'contact', name: 'contact', moduleId: 'contact/contact', title: 'Contact'},              
        {route: 'about', name: 'about', moduleId: 'about/about', title: 'About'},
        {route: 'machine-list', name: 'machine-list', moduleId: 'machine-list/machine-list', title: 'machine-list'}  
      ]);
   }
}
