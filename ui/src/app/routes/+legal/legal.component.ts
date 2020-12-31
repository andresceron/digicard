import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sc-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})

export class LegalComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  public section: string;
  public pdfSource: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      this.section = params.get('section');
      this.pdfSource = `/assets/docs/legal_${this.section}.pdf`;
    });
  }

  public goToPage(path): void {
    this.router.navigate([`/legal/${path}`]);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
