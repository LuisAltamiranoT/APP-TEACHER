import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReporteGeneralPage } from './reporte-general.page';

describe('ReporteGeneralPage', () => {
  let component: ReporteGeneralPage;
  let fixture: ComponentFixture<ReporteGeneralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteGeneralPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
