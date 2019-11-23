import { TestBed } from '@angular/core/testing';
import { <%=classify(name)%>Service } from './<%=dasherize(name)%>.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('<%=classify(name)%>Service', () => {
  let service: <%=classify(name)%>Service;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [<%=classify(name)%>Service]
    });

    service = TestBed.get(<%=classify(name)%>Service);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
