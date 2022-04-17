import { Component } from '@angular/core';
import { PositionService } from './core/services/position.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hattrick-utilities';

  constructor(
    private positionService: PositionService
  )  {
    // Save positions in local storage
    this.positionService.saveInLocalStorage();
  }
}
