import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { <%=classify(name)%>EditComponent } from './<%=dasherize(name)%>-edit.component';
import { <%=classify(name)%>Service } from '../<%=dasherize(name)%>.service';

describe('<%=classify(name)%>EditComponent', () => {
  let component: <%=classify(name)%>EditComponent;
  let fixture: ComponentFixture<<%=classify(name)%>EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [<%=classify(name)%>EditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [<%=classify(name)%>Service]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%=classify(name)%>EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
