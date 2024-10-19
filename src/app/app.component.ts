import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import {} from '@angular/common/http';
import { FooterComponent } from "./shared/footer/footer.component";
import { CookieService } from 'ngx-cookie-service';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [ RouterOutlet, HomeComponent, FooterComponent]
})
export class AppComponent {
  title = 'casamento';
}
