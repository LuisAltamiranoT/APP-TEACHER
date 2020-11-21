import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CursoGroupPage } from './curso-group.page';

describe('CursoGroupPage', () => {
  let component: CursoGroupPage;
  let fixture: ComponentFixture<CursoGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
