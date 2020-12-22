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

  ionViewDidLeave(){
    this.authService.logout();
  }

  onSendEmail(): void {
    let data = this.authService.sendVerificationEmail();
    if (data) {
      this.authService.showInfo('Se ha enviado correctamente el mensaje')
    }
  }

}
