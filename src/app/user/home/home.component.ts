import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/users/users';
import { UsersService } from 'src/app/users/users.service';
import { OrderPipe } from 'ngx-order-pipe';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allUsers: Users[] = [];
  deleteModal: any;
  idTodelete: number = 0;
  searchText: any;

  order: string = '';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  sortedCollection: any[];

  constructor(
    private usersService: UsersService,
    private orderPipe: OrderPipe
  ) {
    this.sortedCollection = orderPipe.transform(this.allUsers, '');
  }

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.get();
  }

  get() {
    this.usersService.get().subscribe((data) => {
      this.allUsers = data;
    });
  }

  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }

  delete() {
    this.usersService.delete(this.idTodelete).subscribe({
      next: (data) => {
        this.allUsers = this.allUsers.filter((_) => _.id != this.idTodelete);
        this.deleteModal.hide();
      },
    });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
