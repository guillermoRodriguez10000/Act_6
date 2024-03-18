import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IUsuarios } from '../../interface/iusuarios.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  activateRoute: ActivatedRoute = inject(ActivatedRoute)

  formularioUsuarios!: FormGroup
  usersServices: UsersService = inject(UsersService)
  router: Router = inject(Router)

  async ngOnInit() {
    this.formularioUsuarios = new FormGroup({
      _id: new FormControl(''),
      id: new FormControl(''),

      first_name: new FormControl('', [
        Validators.required
      ]),
      last_name: new FormControl('', [
        Validators.required
      ]),    
      email: new FormControl('', [
        Validators.required
      ]),  
      image: new FormControl('', [
        Validators.required
      ]),  
    },[])

    await this.activateRoute.params.subscribe(async (params: any) => {
      let id = params.id

    console.log(params)
    //TRATAMOS DE OBTENER EL USUARIO CON EL ID OBTENIDO 
    await this.usersServices.getById(id).subscribe( (respuesta: IUsuarios | any) => {
      console.log(respuesta)
      //SI EL USUARIO EXISTE EN LA API SE LE ASIGNA LA PROPIEDAD USUARIO Y SI NO EXISTE SE MUESTRA UN MSG
      if(respuesta._id){
        // this.formularioUsuarios = respuesta
        this.formularioUsuarios = new FormGroup({
          _id: new FormControl(respuesta?._id),
          id: new FormControl(respuesta?.id),
          first_name: new FormControl(respuesta.first_name, [
            Validators.required
          ]),
          last_name: new FormControl(respuesta.last_name, [
            Validators.required
          ]),    
          email: new FormControl(respuesta.email, [
            Validators.required
          ]),  
          image: new FormControl(respuesta.image, [
            Validators.required
          ]),  
        },[])
      }
    })
    })

  }



  async getDataForm() {
    if(this.formularioUsuarios.value._id){
      // UPDATE
      await this.usersServices.update(this.formularioUsuarios.value).subscribe((result: IUsuarios) => {
        // console.log(result)
        // ESTE SI NOS DEVUELVE UN OBJETO CON _id correcto (el insert no)
        if(result._id){ //PODEMOS USARLO
          alert(`El usuario ${result.username} se ha actualizado correctamente`)
          this.router.navigate(['/home'])
        }else{
          alert('Error')
        }
      })
    } else {
      // INSERT
      await this.usersServices.insert(this.formularioUsuarios.value).subscribe((result: IUsuarios) => {
        // console.log(result)
        // LA RESPUESTA DE LA API DEVUELVE EL ._id en el .id, comportamiento anomalo
        // if(result._id){ // NO PUEDO USAR ESTA LOGICA YA QUE SI NO NOS AVISA DE QUE SE CREO EL USUARIO CORRECRTAMENTE NI NOS LLEVA AL HOME
        if(result.id){ // ESTE .id es el ._id, LA RESPUESTA DE LA API NO ES CORRECTA
          alert(`El usuario ${result.username} se ha creado correctamente`)
          this.router.navigate(['/home'])
        }else{
          alert('Error')
        }
      });
    }
  }

  volver():void {
    this.router.navigate(['/home'])
  }


}
