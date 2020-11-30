import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EliminarCursoPage } from './eliminar-curso.page';

describe('EliminarCursoPage', () => {
  let component: EliminarCursoPage;
  let fixture: ComponentFixture<EliminarCursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarCursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
