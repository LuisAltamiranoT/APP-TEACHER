import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsistenciaAnteriorPage } from './asistencia-anterior.page';

describe('AsistenciaAnteriorPage', () => {
  let component: AsistenciaAnteriorPage;
  let fixture: ComponentFixture<AsistenciaAnteriorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaAnteriorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenciaAnteriorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
