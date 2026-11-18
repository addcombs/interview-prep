import { NgOptimizedImage } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { APP_DISPLAY_NAME } from '../main/app-name';
import { STUDY_GUIDES } from './study-guides/study-guide';
import { findTechnology } from './technologies';
import { TechnologyNavService } from './technology-nav.service';

/** One technology's study guide (concepts, interview questions and pitfalls), opened from its dashboard card. */
@Component({
  selector: 'app-study-guide-page',
  imports: [NgOptimizedImage, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './study-guide-page.html',
  styleUrl: './study-guide-page.scss',
})
export class StudyGuidePageComponent {
  /** From the route's :slug, through component input binding. */
  readonly slug = input.required<string>();
  protected readonly found = computed(() => findTechnology(this.slug()));
  protected readonly guide = computed(() => STUDY_GUIDES[this.slug()]);
  private readonly title = inject(Title);
  private readonly nav = inject(TechnologyNavService);

  constructor() {
    effect(() => {
      const found = this.found();
      this.title.setTitle(`${found && this.guide() ? `${found.technology.name} study guide` : 'Study guide not found'} - ${APP_DISPLAY_NAME}`);
      // Going back, or opening the side menu, lands on this technology's tab.
      if (found) this.nav.selectedGroup.set(found.groupIndex);
    });
  }
}
