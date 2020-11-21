import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAulaPage } from './edit-aula.page';

describe('EditAulaPage', () => {
  let component: EditAulaPage;
  let fixture: ComponentFixture<EditAulaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAulaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAulaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
