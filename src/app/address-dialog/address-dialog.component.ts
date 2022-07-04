import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/*
  Composant qui affiche un formulaire de connexion,
  demandant l'adresse à utiliser dans l'application pour effectuer les requêtes
  Il est rattaché au bouton "Se connecter" dans la barre du haut

  => cf TopbarComponent
 */

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss'],
})
export class AddressDialogComponent implements OnInit {
  // champ pour renseigner l'adresse
  addressFormControl: FormControl = new FormControl('');

  knownAddresses: string[] = [];
  currentAddress: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { knownAddresses: string[], currentAddress: string }) { }

  ngOnInit(): void {
    this.knownAddresses = this.data.knownAddresses;
    this.currentAddress = this.data.currentAddress;
  }
}
