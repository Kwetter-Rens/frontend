import {Component, Inject} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kwetter-frontend';

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}
