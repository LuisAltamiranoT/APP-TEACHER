import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReporteIndividualPage } from './reporte-individual.page';

describe('ReporteIndividualPage', () => {
  let component: ReporteIndividualPage;
  let fixture: ComponentFixture<ReporteIndividualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteIndividualPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteIndividualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
