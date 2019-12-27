import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  constructor( private auth: AuthService, private router: Router) {
   }

  ngOnInit() {
    this.usuario = new UsuarioModel();

   }

   onSubmit( form: NgForm ) {
    if (form.invalid) {return; }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
      timer: 1500
    });
    Swal.showLoading();

    this.auth.nuevoUsuario( this.usuario ).subscribe( resp => {
      console.log(resp);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        text: 'Registro realizado Correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
     }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar cuenta',
          text: err.error.error.message
        });
     });
    // console.log('Formulario Enviado');
    // console.log(this.usuario);
    // console.log(form);
   }

}
