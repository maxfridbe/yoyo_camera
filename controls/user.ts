import * as yo from 'yo-yo'
import * as css from 'dom-css'

export interface ILoggedUser{
  Username:string;
  isLoggedIn:boolean;
}

export function user_control(user:ILoggedUser,
                              logoutHandler:()=>void,
                              loginHandler:(username:string,password:string)=>void){

  if(user.isLoggedIn){
    return yo`
    <div>
      ${user.Username} <button onclick=${logoutHandler}>Logout</button>
    </div>`
  }
  function login(){
    var u = (<HTMLInputElement>document.getElementById('username')).value;
    var p = (<HTMLInputElement>document.getElementById('password')).value;
    loginHandler(u,p);
  }
  return yo`
  <div>
    <label for="username">Username</label>
    <input type="text" name="username" id="username">
    <label for="password">Password</label>
    <input type="password" name="password" id="password">
    <button onclick=${login}>Login</button>
  </div>`;
}
