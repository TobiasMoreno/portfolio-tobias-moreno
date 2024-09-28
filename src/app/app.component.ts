import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './ui/footer/footer.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { HeaderComponent } from './ui/header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';
import { RecorridoComponent } from './recorrido/recorrido.component';
import { FormContactanosComponent } from './form-contactanos/form-contactanos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    ProjectListComponent,
    InicioComponent,
    SobreMiComponent,
    RecorridoComponent,
    FormContactanosComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'personal-pages';

  redirect(){
    const phoneCountryCode = "549";
    const phoneNumber = "3512552929";
    const whatsappLink = `https://web.whatsapp.com/send/?phone=${phoneCountryCode}${phoneNumber}&text=Buenos+dias%2C+Tobias+nos+interesó+tu+perfil&type=phone_number&app_absent=0`;
    
    window.open(whatsappLink, "_blank");
  }
}
