import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TECHNOLOGY_GROUPS } from '../../technologies/technologies';
import { TechnologyNavService } from '../../technologies/technology-nav.service';
import { AccountService } from '../account/account.service';
import { APP_DISPLAY_NAME } from '../app-name';

/** The home page: the technologies in tabs by group, each card opening that technology's study guide. */
@Component({
  selector: 'app-dashboard',
  imports: [NgOptimizedImage, MatCardModule, MatIconModule, MatTabsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  protected readonly appName = APP_DISPLAY_NAME;
  protected readonly auth = inject(AuthService);
  protected readonly account = inject(AccountService);
  protected readonly technologyGroups = TECHNOLOGY_GROUPS;
  protected readonly nav = inject(TechnologyNavService);
}
