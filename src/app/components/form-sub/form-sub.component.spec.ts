import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormSubComponent } from "./form-sub.component";

describe("FormSubComponent", () => {
  let component: FormSubComponent;
  let fixture: ComponentFixture<FormSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSubComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
