import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from 'src/app/services/persona.service';



@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  listPersonas: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;


  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _personaService: PersonaService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      direccion: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]],
      telefono: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]]
    })
  }


  ngOnInit(): void {
    this.obtenerPersonas();
  }

  obtenerPersonas() {
    this._personaService.getListPersonas().subscribe(data => {
      console.log(data);
      this.listPersonas = data;
    }, error => {
      console.log(error);
    })
  }

  guardarPersona() {

    const persona: any = {
      nombre: this.form.get('nombre')?.value,
      apellidos: this.form.get('apellidos')?.value,
      direccion: this.form.get('direccion')?.value,
      telefono: this.form.get('telefono')?.value,
    }

    if (this.id == undefined) {
      // Agregamos una nueva persona
      this._personaService.savePersona(persona).subscribe(data => {
        this.toastr.success('La persona fue registrada con exito!', 'Persona Registrada');
        this.obtenerPersonas();
        this.form.reset();
      }, error => {
        this.toastr.error('Opss.. ocurrio un error', 'Error')
        console.log(error);
      })
    } else {

      persona.id = this.id;
      // Editamos persona
      this._personaService.updatePersona(this.id, persona).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('La persona fue actualizada con exito!', 'Persona Actualizada');
        this.obtenerPersonas();
      }, error => {
        console.log(error);
      })

    }


  }

  eliminarPersona(id: number) {
    this._personaService.deletePersona(id).subscribe(data => {
      this.toastr.error('La persona fue eliminada con exito!', 'Persona eliminada');
      this.obtenerPersonas();
    }, error => {
      console.log(error);
    })

  }

  editarPersona(persona: any) {
    this.accion = 'Editar';
    this.id = persona.id;

    this.form.patchValue({
      nombre: persona.nombre,
      apellidos: persona.apellidos,
      direccion: persona.direccion,
      telefono: persona.telefono
    })
  }



}
