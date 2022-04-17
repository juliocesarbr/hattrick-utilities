import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CellValue, Workbook } from 'exceljs';
import { Position } from '../../../core/models/position';
import { PositionService } from '../../../core/services/position.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  fileName: any;
  fileObject: File;

  positionsData: Position[] = this.positionService.index();

  players: any;
  selectedPositionName: any;
  selectedPositionEnglishName: any;

  constructor(
    private fb: FormBuilder,
    private positionService: PositionService
  ) {

    // Init form
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.form = this.fb.group({
      position: [{ value: '', disabled: false }, [Validators.required]],
      file: [{ value: '', disabled: false }, [Validators.required]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid.
    if (this.form.invalid) {
      return;
    }

    console.log('onSubmit() --> this.form.value', this.form.value);

  }

  async onFileSelected(event: any) {

    this.fileObject = event.target.files[0];
    console.log('onFileSelected() --> fileObject:', this.fileObject);

    if (this.fileObject) {
      console.log('positionsData:', this.positionsData);
      const position = this.positionsData.filter((e: any) => e.id === Number(this.form.value.position));

      console.log('position selected:', position);

      this.selectedPositionName = position[0].name;
      this.selectedPositionEnglishName = position[0].englishName;

      this.fileName = this.fileObject.name;
      let headers: any;
      let playersArray: (CellValue[] | { [key: string]: CellValue; })[] = [];

      // this.handleImport(this.fileObject);
      const buffer = await this.readFile(this.fileObject)
      const workbook = new Workbook();
      const file = await workbook.xlsx.load(buffer as Buffer);
      // Get first sheet
      const sheet = await file.getWorksheet(1);

      headers = sheet.getRow(1).values;
      // Iterate trough sheet
      sheet.eachRow(function (row, rowNumber) {
        // Add to array avoiding first element (Because is the header)
        if(rowNumber != 1){
          playersArray.push(row.values);
        }
      });

      console.log('headers:', headers);
      console.log('playersArray:', playersArray);
      this.players = playersArray;
    }
  }

  // handleImport(file: any) {
  //   const wb = new Workbook();
  //   const reader = new FileReader();

  //   let headers: any, playersArray: any;

  //   reader.readAsArrayBuffer(file);
  //   reader.onload = () => {
  //     const buffer = reader.result;
  //     wb.xlsx.load(buffer as Buffer).then(workbook => {
  //       // console.log(workbook, 'workbook instance')
  //       workbook.eachSheet((sheet, id) => {

  //         headers = sheet.getRow(1).values;
  //         console.log('headers', headers);

  //         playersArray = sheet.eachRow((row, rowIndex) => {
  //           // console.log(row.values, rowIndex)
  //           // playersArray.push(row.values);
  //         })

  //         console.log('playersArray', playersArray);
  //       })
  //     });
  //   }
  // }

  readFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        resolve(reader.result)
      }
    })
  }
}
