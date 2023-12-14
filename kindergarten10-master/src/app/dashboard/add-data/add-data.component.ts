import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  public addChildForm!: FormGroup;
  @Input() currentPage!: number;

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    public backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, [Validators.required, this.ageValidator.bind(this)]]
    });
  }

  get nameError() {
    const nameControl = this.addChildForm.get('name');
    return nameControl?.hasError('required') && nameControl.touched;
  }

  get kindergardenError() {
    const kindergardenControl = this.addChildForm.get('kindergardenId');
    return kindergardenControl?.hasError('required') && kindergardenControl.touched;
  }

  get birthDateError() {
    const birthDateControl = this.addChildForm.get('birthDate');
    return birthDateControl?.hasError('required') && birthDateControl.touched;
  }

  ageValidator(control: FormControl): { [key: string]: any } | null {
    const currentDate = new Date();
    const birthDate = new Date(control.value);

    if (isNaN(birthDate.getTime())) {
      return null; // If the birthdate is not a valid date, skip the validation
    }

    const age = currentDate.getFullYear() - birthDate.getFullYear();

    if (age > 5) {
      return { childTooOld: true }; // Validation failed: child is older than 5 years
    }

    return null; // Validation passed
  }

  onSubmit() {
    if (this.addChildForm.valid) {
      console.log(this.currentPage);
      this.backendService.addChildData(this.addChildForm.value, this.currentPage);
    }
    console.log(this.storeService.children);
  }
}
