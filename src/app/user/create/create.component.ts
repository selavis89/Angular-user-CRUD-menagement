import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/users/users';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  userForm: Users = {
    id: 0,
    firstName: '',
    lastName: '',
    address: '',
    location: '',
    common: '',
    province: '',
    email: '',
    note: '',
  };

  constructor(private usersService: UsersService, private router: Router) {}
  ngOnInit(): void {}

  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    common: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
  });

  get f() {
    return this.form.controls;
  }

  create() {
    this.usersService.create(this.userForm).subscribe({
      next: (data) => {
        this.router.navigate(['/user/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
