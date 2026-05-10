import { Injectable } from '@angular/core';
import { defineOneEntry } from 'oneentry';
import { environment } from '../../enviroments/enviroment';
import { Link } from '../types/link.type';


let { Pages } = defineOneEntry(environment.oneEntryUrl, {
  token: environment.oneEntryToken,
  langCode: 'en_US'
});

@Injectable({
  providedIn: 'root',
})
export class LinkService {

  async getLinks(): Promise<Link[]> {
    try {
      let pages = await Pages.getPages();

      if (!Array.isArray(pages)) return [];

      pages.sort((a: any, b: any) => a.position - b.position);

      return pages.map((page: any) => {
        const url = page.pageUrl || '';
        return {
          title: page.localizeInfos?.['title'] || '',
          isVisible: page.isVisible ?? true,
          url,
          isMap: url.includes('google.com/maps')
        };
    })
    } catch (error) {
      console.log("Error while seaching for links: ", error)
      return []
    }
  }
}
