import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  readonly BaseURI = "https://localhost:44326/api";

  formModel = this.fb.group({
    UserName : ['',Validators.required],
    Email : ['',Validators.email],
    FullName : [''],
    Passwords : this.fb.group ({
      Password : ['',Validators.required,Validators.minLength(4)],
      ConfirmPassword : ['',Validators.required]
    },{validator : this.comparePasswords})
  });

  comparePasswords(fb:FormGroup)
  {
    let confirmPwdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPwdCtrl.errors=null{required:true}
    if(confirmPwdCtrl.errors ==null || 'passwordMismatch' in confirmPwdCtrl.errors)
    {
      if(fb.get('Password').value != confirmPwdCtrl.value)
      {
        confirmPwdCtrl.setErrors({passwordMismatch: true});
      }
      else{
        confirmPwdCtrl.setErrors(null);
      }
    }
  }

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      fullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password,
    }

    return this.http.post(this.BaseURI+"/AppUser/Register",body);
  }

}
