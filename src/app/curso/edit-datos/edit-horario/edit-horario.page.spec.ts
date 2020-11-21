import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditHorarioPage } from './edit-horario.page';

describe('EditHorarioPage', () => {
  let component: EditHorarioPage;
  let fixture: ComponentFixture<EditHorarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHorarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditHorarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
