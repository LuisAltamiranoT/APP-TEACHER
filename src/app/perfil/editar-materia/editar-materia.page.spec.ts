import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarMateriaPage } from './editar-materia.page';

describe('EditarMateriaPage', () => {
  let component: EditarMateriaPage;
  let fixture: ComponentFixture<EditarMateriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMateriaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarMateriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
