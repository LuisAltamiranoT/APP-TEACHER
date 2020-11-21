import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodigoQrPage } from './codigo-qr.page';

describe('CodigoQrPage', () => {
  let component: CodigoQrPage;
  let fixture: ComponentFixture<CodigoQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoQrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodigoQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
