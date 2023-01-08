import { Component, OnInit } from '@angular/core';
import { AnimationDurations } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }

  ngOnInit(): void { }
  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == 'null') {
      // alert('username is required !!');
      this.snack.open("Username is required !!", "ok", {
        duration: 3000
      });
      return;
    }

    //adduser: userservice
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //Success
        console.log(data);
        // alert("Success");
        Swal.fire('Successfully Done !! ', 'Your Username is '+data.username,'success')
      },
      (error) => {
        //error
        console.log(error);
        // alert("Something Went Wrong")
        this.snack.open("User with this username already exist !!", "ok", {
          duration: 5000
        });
      }
    )

  }
}
