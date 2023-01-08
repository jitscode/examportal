import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  loginData={
    username:'',
    password:'',
  };
  constructor(private snack:MatSnackBar ,private login:LoginService ,private router:Router ) {}

  ngOnInit(): void{}
  formSubmit(){
    console.log("Login button clicked")
    if(this.loginData.username.trim()==''|| this.loginData.username.trim()==null)
    {
      this.snack.open("Username is required ",'Ok',{duration:3000});
      return;
    }
    if(this.loginData.password.trim()==''|| this.loginData.password.trim()==null)
    {
      this.snack.open("Password is required ",'Ok',{duration:3000});
      return;
    }
    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
(data:any)=>{
  console.log("success");
  console.log(data);
  //login....
  this.login.loginUser(data.token);
  this.login.getCurrentUser().subscribe(
    (user:any)=>{
      this.login.setUser(user);
      console.log(user);
      //redirect .....ADMIN:admin-dashboard
      //redirect .....NORMAL:normal-dashboard
      if(this.login.getUserRole()=="ADMIN"){
        //admin dashboard
        window.location.href='/admin';

        // this.router.navigate(['admin']);
      }
      else if(this.login.getUserRole()=="NORMAL"){
       //USER-DASHBOARD
       window.location.href='/user-dashboard/0';

      //  this.router.navigate(['user-dashboard']);

      }
      else{
        //logout fire
        this.login.logout();
      }
    }
  )

},
(error)=>{
console.log("Error");
console.log(error);
this.snack.open('Invalid Credentials !!' , 'try again',{duration:3000})
}
    );

  }
}
