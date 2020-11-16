import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OficinaPage } from './oficina.page';

describe('OficinaPage', () => {
  let component: OficinaPage;
  let fixture: ComponentFixture<OficinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OficinaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OficinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
