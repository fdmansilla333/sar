import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PanelControlComponent } from "./panelControl.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PanelControlComponent", () => {

  let fixture: ComponentFixture<PanelControlComponent>;
  let component: PanelControlComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PanelControlComponent]
    });

    fixture = TestBed.createComponent(PanelControlComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
