import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerImageCursoPage } from './ver-image-curso.page';

describe('VerImageCursoPage', () => {
  let component: VerImageCursoPage;
  let fixture: ComponentFixture<VerImageCursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerImageCursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerImageCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
