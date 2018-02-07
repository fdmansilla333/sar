import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TablaSensoresComponent } from "./tablaSensores.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TablaSensoresComponent", () => {

  let fixture: ComponentFixture<TablaSensoresComponent>;
  let component: TablaSensoresComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TablaSensoresComponent]
    });

    fixture = TestBed.createComponent(TablaSensoresComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
