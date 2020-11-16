import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EliminarDataPage } from './eliminar-data.page';

describe('EliminarDataPage', () => {
  let component: EliminarDataPage;
  let fixture: ComponentFixture<EliminarDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
