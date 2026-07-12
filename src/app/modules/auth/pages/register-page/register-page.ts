import { Component } from '@angular/core';
import { RegisterForm } from '../../components/register-form/register-form';

@Component({
  selector: 'app-register-page',
  template: `
    <section class="login-section">
      <div class="login-container">
        <div class="login-wrapper">
          <div class="login-content">
            <div class="login-card">
              <div class="login-logo">
                <img src="img/logo/logo.png" alt="logo" />
              </div>
              <app-register-form></app-register-form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  imports: [RegisterForm],
  styleUrls: ['./register-page.css'],
})
export class RegisterPage {}
