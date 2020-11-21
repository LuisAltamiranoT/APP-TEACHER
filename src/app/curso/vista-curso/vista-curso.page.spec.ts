import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VistaCursoPage } from './vista-curso.page';

describe('VistaCursoPage', () => {
  let component: VistaCursoPage;
  let fixture: ComponentFixture<VistaCursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaCursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VistaCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
