import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCursoPage } from './add-curso.page';

describe('AddCursoPage', () => {
  let component: AddCursoPage;
  let fixture: ComponentFixture<AddCursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
