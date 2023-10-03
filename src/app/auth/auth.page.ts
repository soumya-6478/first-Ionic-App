import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadindCtrl: LoadingController
  ) {}

  ngOnInit() {}
  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadindCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigate(['/places']);
        }, 2000);
      });
  }
  onSubmit(form: NgForm) {
    console.log(form);
  }
  onSwitchauthMode() {
    this.isLogin = !this.isLogin;
  }
}
