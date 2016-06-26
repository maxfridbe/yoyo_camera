import * as yo from 'yo-yo'
import * as css from 'dom-css'
import {PubSub} from './util/pubsub'

import {user_control,ILoggedUser} from './controls/user'
import {image_control} from './controls/camera'

class Camera{
  element = this.render();
  render(){
    var updated = image_control("http://placehold.it/350x350");
    // if(this.element){
    //   yo.update(this.element,updated);
    // }
    return updated;
  }
}

class User{
  onLogin = (username:string, password:string)=>{
    console.log('onlogin');
    this.usr.Username =username;
    this.usr.isLoggedIn = true;
    PubSub.Pub("Login");
  }
  onLogout = ()=>{
    console.log('onlogout');
    this.usr.isLoggedIn = false;
    this.usr.Username = null;
    PubSub.Pub("Logout");
  }
  usr = <ILoggedUser>{
    Username:null,
    isLoggedIn:false
  };
  // element = this.render();
  render(){
    var updated = user_control(this.usr,this.onLogout,this.onLogin);
    // if(this.element){
    //   yo.update(this.element,updated);
    // }
    return updated;
  }
}

class Page{
  usr:User;
  camera:Camera;
  constructor(){
    this.usr = new User();
    this.camera = new Camera();
    this.element = this.render();
    PubSub.Sub("Login",()=>{
      this.render();
    });
    PubSub.Sub("Logout",()=>{
      this.render();
    });
  }
  element:HTMLElement;
  render(){
    var updated = yo`
      <div>
        <section>
          ${this.usr.render()}
        </section>
        <section>
          ${this.usr.usr.isLoggedIn ?  this.camera.render(): ""}
        </section>
      </div>
    `;
    if(this.element){
      yo.update(this.element,updated);
    }
    return updated;
  }
}

var page = new Page();


document.body.appendChild(page.element)
