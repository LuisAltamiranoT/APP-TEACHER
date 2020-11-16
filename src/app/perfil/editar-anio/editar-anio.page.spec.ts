import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarAnioPage } from './editar-anio.page';

describe('EditarAnioPage', () => {
  let component: EditarAnioPage;
  let fixture: ComponentFixture<EditarAnioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAnioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarAnioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
