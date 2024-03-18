import { HttpClient } from "@angular/common/http"
import { Injectable,inject } from "@angular/core"
import { Observable } from "rxjs"
import { IUsuarios } from "../interface/iusuarios.interface"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient: HttpClient = inject(HttpClient) 
  baseUrl: string = 'https://peticiones.online/api/users'
  
  getAll(): Observable<IUsuarios[]> {
    return this.httpClient.get<IUsuarios[]>(this.baseUrl)
  }

  getById(_id:string): Observable<IUsuarios>{
    return this.httpClient.get<IUsuarios>(`${this.baseUrl}/${_id}`)
  }

  delete(_id: string | undefined): Observable<IUsuarios> | any{
    return this.httpClient.delete<IUsuarios>(`${this.baseUrl}/${_id}`)
  }

  insert(values: IUsuarios): Observable<IUsuarios>{
    return this.httpClient.post<IUsuarios>(this.baseUrl,values)
  }

  update(values: IUsuarios): Observable<IUsuarios> {
    return this.httpClient.put<IUsuarios>(`${this.baseUrl}/${values._id}`, values)
  } 


}
