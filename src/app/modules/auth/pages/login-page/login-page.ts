import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  selector: 'app-login-page',
  template: `
    <section class="login-section">
      <div class="login-container">
        <div class="login-wrapper">
          <div class="login-content">
            <div class="login-card">
              <div class="login-logo">
                <img src="img/logo/logo.png" alt="logo" />
              </div>
              <app-login-form></app-login-form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  imports: [LoginForm],
  styleUrls: ['./login-page.css'],
})
export class LoginPage {}
