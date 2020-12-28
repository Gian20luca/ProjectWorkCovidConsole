import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="logo-footer">
        <img
          class="logo-logo"
          src="https://media-exp1.licdn.com/dms/image/C4D0BAQGJ2Iy-CgIfHA/company-logo_200_200/0?e=2159024400&v=beta&t=vutrdhHQ923Zucq9skPqwv26ifTeCE3OOsGUgM5l03U"
        />
      </div>
      <div class="all-box-footer">
        <div class="box-footer">
          <ul class="primo-box">
            <li class="verdi">Bandi e concorsi</li>
            <li class="verdi">Albo pretorio</li>
            <li class="verdi">Amministrazione trasparente</li>
            <li class="verdi">Contatti</li>
          </ul>
        </div>
        <div class="box-footer">
          <ul>
            <li><h3>RECAPITI E CONTATTI</h3></li>
            <li>Ente - Nord Salento</li>
            <li>Via XXXXXX,27 - Brindisi (BR)</li>
            <li>Fax. 0831.000000</li>
            <li>Tel. 0831.000000</li>
            <li>
              Email:
              <p class="email">info@ente.it</p>
            </li>
            <li>
              PEC:
              <p class="email">info@pec.ente.it</p>
            </li>
          </ul>
        </div>
        <div class="box-footer">
          <h3>INFORMAZIONI GENERALI</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="box-footer">
          <h3>SEGUICI SU</h3>

          <ul id="seguici">
            <a href="https://it-it.facebook.com/linksmanagementandtechnology/"
              ><i class="fab fa-facebook verdi"></i
            ></a>
            <a href="https://www.instagram.com/linksspa/"
              ><i class="fab fa-instagram-square verdi"></i
            ></a>
            <a href="https://www.linkedin.com/company/linksmt/"
              ><i class="fab fa-linkedin verdi"></i
            ></a>
          </ul>
        </div>
      </div>
      <div class="bottom-footer">
        <p class="riga">Privacy</p>
        <p>Note legali</p>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        color: white;
        background-color: #272727;
        padding: 0 100px;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 300px;
      }

      .logo-footer {
        width: 100%;
      }

      .logo-logo {
        margin-left: 5px;
        margin-top: 10px;
        align-items: center;
        width: 100px;
      }

      .all-box-footer {
        list-style-type: none;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
      }

      .box-footer {
        margin: 5px;
        padding: 20px;
        height: auto;
        width: 25%;
      }

      .primo-box > li {
        border-bottom: 1px solid #2bd2bb;
      }

      .box-footer h3 {
        border-bottom: 1px solid #2bd2bb;
      }

      .box-footer > ul {
        list-style-type: none;
        padding: 0;
      }

      #seguici {
        display: flex;
      }

      #seguici > li {
        justify-content: flex-start;
        margin: 0 5px;
      }

      .bottom-footer {
        display: flex;
        border-top: 1px solid black;
        border-color: #2bd2bb;
      }

      .bottom-footer > p {
        padding: 10px;
        margin-bottom: 10px;
      }

      .email {
        display: inline;
        color: #2bd2bb;
      }

      .verdi {
        color: #2bd2bb;
        padding-top: 7px;
        padding-left: 10px;
      }

      .bottom-footer > p {
        margin-top: 10px;
      }

      .riga {
        border-right: 2px solid #2bd2bb;
      }
    `,
  ],
})
export class FooterComponent {}
