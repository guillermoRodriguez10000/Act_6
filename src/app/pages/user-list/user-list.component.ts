import { Component, inject } from '@angular/core';
import { IUsuarios } from '../../interface/iusuarios.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  arrUsuarios: IUsuarios[] = []
  usersServices: UsersService = inject(UsersService)

  async ngOnInit(): Promise<void> {
    await this.usersServices.getAll().subscribe( (data: any) => {
      this.arrUsuarios = data.results
    } )
  }

}
