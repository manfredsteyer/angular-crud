import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { <%=classify(name)%>ListComponent } from './<%=dasherize(name)%>-list.component';
import { <%=classify(name)%>Service } from '../<%=dasherize(name)%>.service';

describe('<%=classify(name)%>ListComponent', () => {
  let component: <%=classify(name)%>ListComponent;
  let fixture: ComponentFixture<<%=classify(name)%>ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [<%=classify(name)%>ListComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [<%=classify(name)%>Service]
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
