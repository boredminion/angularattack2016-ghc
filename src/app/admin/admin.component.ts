import { Component, OnInit, Input } from '@angular/core';
import {GlobalService, ISettings, Settings} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() model;
  globalSettings: ISettings = new Settings();

  constructor(private globalService: GlobalService) {
    this.globalSettings = globalService.globalSettings;
  }

  ngOnInit() {
  }
  
  save() {
    this.globalService.save(this.globalSettings);
  }

}
