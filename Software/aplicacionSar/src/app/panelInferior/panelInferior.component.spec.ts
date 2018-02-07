import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PanelInferiorComponent } from "./panelInferior.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PanelInferiorComponent", () => {

  let fixture: ComponentFixture<PanelInferiorComponent>;
  let component: PanelInferiorComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PanelInferiorComponent]
    });

    fixture = TestBed.createComponent(PanelInferiorComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
