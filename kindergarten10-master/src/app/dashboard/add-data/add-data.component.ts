import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog'; 

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  public addChildForm!: FormGroup;
  @Input() currentPage!: number;
  loading = false; 


  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    public backendService: BackendService,
    private dialog: MatDialog
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
      this.loading = true; // Set loading to true before making the backend call
  
      // Simulate an asynchronous operation, replace it with your actual backend call
      setTimeout(() => {
        this.loading = false; // Set loading to false when the operation is complete
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '250px',
          data: { title: 'Success', message: 'Child Successfully Registered' }
        });
  
        dialogRef.afterClosed().subscribe(result => {
          // Perform actions here if needed
          if (!this.loading) {
            this.backendService.addChildData(this.addChildForm.value, this.currentPage);
          }
        });
      }, 2000); // Simulating a 2-second backend call, replace it with your actual backend call
    }
  }  
}
