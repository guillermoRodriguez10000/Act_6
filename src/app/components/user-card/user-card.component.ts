import { Component, Input } from '@angular/core';
import { IUsuarios } from '../../interface/iusuarios.interface';
import { RouterLink } from '@angular/router';
import { BotonesComponent } from '../botones/botones.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink,BotonesComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user?: IUsuarios

  
}
