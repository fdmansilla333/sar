import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TablaInfoComponent } from "./tablaInfo.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TablaInfoComponent", () => {

  let fixture: ComponentFixture<TablaInfoComponent>;
  let component: TablaInfoComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TablaInfoComponent]
    });

    fixture = TestBed.createComponent(TablaInfoComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
