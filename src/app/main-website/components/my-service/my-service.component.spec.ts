import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServiceComponent } from './my-service.component';

describe('MyServiceComponent', () => {
  let component: MyServiceComponent;
  let fixture: ComponentFixture<MyServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
