import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  showGasPrices: boolean = false;
  showAdressField: boolean = false;
  addressFormControl: FormControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
