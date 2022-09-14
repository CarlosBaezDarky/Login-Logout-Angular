import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) =>{
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success("New user created","Registration successful");
        }else{
          res.errors.forEach((element: { code: any; desciption: string; }) => {
            switch(element.code)
            {
                case 'DuplicateUserName':
                  this.toastr.error("Username is already taken","Registration failed")
                  break;
                default:
                  this.toastr.error(element.desciption,"Registration failed")
                  //Registration faild
                  break;  
            }
          });
        }
      },
      err =>{
        console.log(err);
      }
    );
  }

}
