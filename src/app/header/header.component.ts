import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentLang = 'en';
  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private plateformID
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.plateformID)) {
      this.currentLang = localStorage.getItem('currentLanguage') || 'en';
      if (this.currentLang == 'ar') document.documentElement.dir = 'rtl';
    }
  }
  changeCurrentLang(lang: string) {
    this.translate.use(lang);
    if (isPlatformBrowser(this.plateformID)) {
      localStorage.setItem('currentLanguage', lang);
    }
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      document.documentElement.lang = event.lang;

      event.lang == 'ar'
        ? (document.documentElement.dir = 'rtl')
        : (document.documentElement.dir = 'ltr');
    });
  }
}
