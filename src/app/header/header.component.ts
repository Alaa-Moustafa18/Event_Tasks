import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentLang = 'en';
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('currentLanguage') || 'en';

    if (this.currentLang == 'ar') document.documentElement.dir = 'rtl';
  }
  changeCurrentLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('currentLanguage', lang);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      document.documentElement.lang = event.lang;
      if (event.lang == 'ar') document.documentElement.dir = 'rtl';
    });
  }
}
