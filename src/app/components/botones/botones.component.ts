import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUsuarios } from '../../interface/iusuarios.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-botones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botones.component.html',
  styleUrl: './botones.component.css'
})
export class BotonesComponent {
  @Input() user:IUsuarios | any
  userServices: UsersService = inject(UsersService) 
  router: Router = inject(Router)

 async deleteUsuario(): Promise<any> {
    let popUpBorrar = confirm(`Estas seguro que deseas borrar el usuario ${this.user.username}` )
    if(popUpBorrar === true){
      let borrarDefinitivo = await this.userServices.delete(this.user._id)
      await borrarDefinitivo.subscribe( (respuesta:any) => {
        alert(`Se ha borrado el usuario --> ${this.user.username}`)
        this.router.navigate(['/home'])
      })
    }
  }

}
