import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AvaibleserviceComponent } from "./avaibleservice.component";

describe("AvaibleserviceComponent", () => {
  let component: AvaibleserviceComponent;
  let fixture: ComponentFixture<AvaibleserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvaibleserviceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaibleserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
