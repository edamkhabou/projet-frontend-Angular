import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalLayoutComponent } from './global-layout.component';

describe('GlobalLayoutComponent', () => {
  let component: GlobalLayoutComponent;
  let fixture: ComponentFixture<GlobalLayoutComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
