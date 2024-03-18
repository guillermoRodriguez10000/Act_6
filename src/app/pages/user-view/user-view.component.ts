import { Component, inject } from '@angular/core';
import { IUsuarios } from '../../interface/iusuarios.interface';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  //Necesitamos capturar la ruta activa que me da el id producto.
  activateRoute: ActivatedRoute = inject(ActivatedRoute)
  userService:UsersService = inject(UsersService)
  usuario: IUsuarios | any
  router: Router = inject(Router) 
  //PASOS:
  // CUANDO ARRANCA EL ELEMENTO
  ngOnInit():void{
    //OBTENEMOS EL ID DEL USUARIO DE LA URL 
    this.activateRoute.params.subscribe(async (params: any) => {
      let id = params.id

    console.log(id)
    //TRATAMOS DE OBTENER EL USUARIO CON EL ID OBTENIDO 
    await this.userService.getById(id).subscribe( (respuesta: IUsuarios | any) => {
      console.log(respuesta)
      //SI EL USUARIO EXISTE EN LA API SE LE ASIGNA LA PROPIEDAD USUARIO Y SI NO EXISTE SE MUESTRA UN MSG
      if(respuesta._id){
        this.usuario = respuesta
      }else{
        alert('Respuesta del servidor errónea')
      }
    })
    })
  }

  async deleteUsuario(): Promise<any> {
    let popUpBorrar = confirm(`Estas seguro que deseas borrar el usuario ${this.usuario.username}` )
    if(popUpBorrar === true){
      let borrarDefinitivo = await this.userService.delete(this.usuario._id)
      await borrarDefinitivo.subscribe( (respuesta:any) => {
        alert(`Se ha borrado el usuario --> ${this.usuario.username}`)
        this.router.navigate(['/home'])
      })
    }
  }
}
