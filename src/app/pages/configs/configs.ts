import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { FormUserComponent } from '../../core/components/form-user/form-user.component';
import { FormProvedorComponent } from "../../core/components/form-provedor/form-provedor.component";
import { FormFechaduraComponent } from "../../core/components/form-fechadura/form-fechadura.component";
import { FormSalaComponent } from "../../core/components/form-sala/form-sala.component";

enum Menus {
  USER,
  PROVEDOR,
  FECHADURAS,
  SALAS,
  NAO_SELECIONADO
}

@Component({
  selector: 'app-configs',
  imports: [MatSidenavModule, MatListModule, MatIconModule, FormUserComponent, FormProvedorComponent, FormFechaduraComponent, FormSalaComponent],
  templateUrl: './configs.html',
  styleUrl: './configs.css'
})
export class Configs {

  menu = {
    user: Menus.USER,
    provedor: Menus.PROVEDOR,
    fechaduras: Menus.FECHADURAS,
    salas: Menus.SALAS,
    naoSelecionado: Menus.NAO_SELECIONADO
  }

  menuAtivo: Menus = Menus.NAO_SELECIONADO;

  handleMenu(menuNav: Menus): void {
    this.menuAtivo = menuNav;
  }
}
