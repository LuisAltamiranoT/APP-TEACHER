import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerImagePage } from './ver-image.page';

describe('VerImagePage', () => {
  let component: VerImagePage;
  let fixture: ComponentFixture<VerImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
