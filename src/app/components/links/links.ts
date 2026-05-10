import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LinkService } from '../../services/link';
import { Link } from '../../types/link.type';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [],
  templateUrl: './links.html',
  styleUrl: './links.scss',
})
export class LinksComponent implements OnInit {
  links: Link[] = [];
  showEmpty = false;

  constructor(
    private linkService: LinkService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  getMapEmbedUrl(url: string): SafeResourceUrl {
    const embedUrl = url.includes('/maps/embed') 
      ? url
      : 'https://www.google.com/maps/embed?pb=' + url.split('pb=')[1];
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showEmpty = true;
      this.cdr.detectChanges();
    }, 10000);

    this.linkService.getLinks().then((links: Link[]) => {
      this.links = links.filter((link: Link) => link.isVisible);
      this.cdr.detectChanges();
    });
  }
}