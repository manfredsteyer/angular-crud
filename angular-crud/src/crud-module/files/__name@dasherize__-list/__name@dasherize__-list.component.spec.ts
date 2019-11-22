import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { <%=classify(name)%>ListComponent } from './<%=dasherize(name)%>-List.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { <%=classify(name)%>Service } from '../<%=dasherize(name)%>.service';

describe('<%=classify(name)%>ListComponent', () => {
  let component: <%=classify(name)%>ListComponent;
  let fixture: ComponentFixture<<%=classify(name)%>ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [<%=classify(name)%>ListComponent],
      imports: [HttpClientTestingModule],
      providers: [<%=classify(name)%>]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%=classify(name)%>ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
