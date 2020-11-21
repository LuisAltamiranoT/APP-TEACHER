import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCursoPage } from './edit-curso.page';

describe('EditCursoPage', () => {
  let component: EditCursoPage;
  let fixture: ComponentFixture<EditCursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
