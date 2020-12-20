import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalAttentionPage } from './modal-attention.page';

describe('ModalAttentionPage', () => {
  let component: ModalAttentionPage;
  let fixture: ComponentFixture<ModalAttentionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAttentionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAttentionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
