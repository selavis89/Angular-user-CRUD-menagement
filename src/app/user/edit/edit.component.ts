import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/users/users';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
    });
  }

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

  getById(id: number) {
    this.usersService.getById(id).subscribe((data) => {
      this.userForm = data;
    });
  }

  update() {
    this.usersService.update(this.userForm).subscribe({
      next: (data) => {
        this.router.navigate(['/user/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
