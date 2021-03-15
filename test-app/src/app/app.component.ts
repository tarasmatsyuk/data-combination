import { Component } from '@angular/core';
import {routerTransition} from './routerTransition';
import {RouterState} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ routerTransition ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-app';

  getState(outlet: any): RouterState {
    return outlet.activatedRouteData.state;
  }
}
