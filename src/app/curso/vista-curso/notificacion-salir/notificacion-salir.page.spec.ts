import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificacionSalirPage } from './notificacion-salir.page';

describe('NotificacionSalirPage', () => {
  let component: NotificacionSalirPage;
  let fixture: ComponentFixture<NotificacionSalirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionSalirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionSalirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
