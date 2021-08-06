import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightListComponent } from './flight-list.component';
import { FlightService } from '../flight.service';

describe('FlightListComponent', () => {
  let component: FlightListComponent;
  let fixture: ComponentFixture<FlightListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FlightListComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [FlightService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
