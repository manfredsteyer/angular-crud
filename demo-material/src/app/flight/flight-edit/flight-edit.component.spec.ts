import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightEditComponent } from './flight-edit.component';
import { FlightService } from '../flight.service';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('FlightEditComponent', () => {
  let component: FlightEditComponent;
  let fixture: ComponentFixture<FlightEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FlightEditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule, MatFormFieldModule],
      providers: [FlightService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
