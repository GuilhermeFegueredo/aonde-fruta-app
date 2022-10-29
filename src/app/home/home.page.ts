import { NovoUsuario, Usuario } from '../model/usuario';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { UsuarioService } from './login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  email = '';
  senha = '';
  novoUsuarioForm: FormGroup;
  usuario: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Usuario mockado
    this.email = 'izabelpi@email.com';
    this.senha = '12345678';

    this.novoUsuarioForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  logar() {
    this.usuarioService
      .autenticaUsuario(this.email, this.senha)
      .pipe(first())
      .subscribe(
        (user) => {
          this.usuario = user;
        },
        (error) => {
          alert('Usuário ou senha inválida.');
          console.log('Error Usuario Service: ', error);
        },
        () => this.entrarMap(this.usuario)
      );
  }

  entrarMap(user: Usuario | NovoUsuario) {
    this.router.navigate(['map'], { state: { usuario: user } });
  }

  cadastrarUsuario() {
    if (this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.usuarioService.salvaUsuario(novoUsuario).subscribe(
        () => alert('Perfil criado com sucesso!'),
        (error) => {
          alert('Desculpe, seu perfil não foi criado. Tente novamente!');
          console.log(error);
        },
        () => {
          this.router.navigate(['']);
          this.limparFormulario();
        }
      );
    } else {
      alert('Algo saiu errado. Preencha novamente!');
    }
  }

  limparFormulario() {
    this.novoUsuarioForm.reset();
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }
}
