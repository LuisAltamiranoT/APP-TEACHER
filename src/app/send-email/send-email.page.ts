import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.page.html',
  styleUrls: ['./send-email.page.scss'],
})
export class SendEmailPage implements OnDestroy {

  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(
    private authService: AuthService
  ) { }

  ngOnDestroy() {
    this.authService.logout();
  }

  onSendEmail(): void {
    this.authService.sendVerificationEmail();
  }

}
