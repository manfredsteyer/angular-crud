import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { <%=classify(name)%>ListComponent } from './<%=dasherize(name)%>-list.component';
import { <%=classify(name)%>Service } from '../<%=dasherize(name)%>.service';

describe('<%=classify(name)%>ListComponent', () => {
  let component: <%=classify(name)%>ListComponent;
  let fixture: ComponentFixture<<%=classify(name)%>ListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [<%=classify(name)%>ListComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule, MatFormFieldModule, MatIconModule, MatInputModule, NoopAnimationsModule],
      providers: [<%=classify(name)%>Service]
    }).compileComponents();
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
