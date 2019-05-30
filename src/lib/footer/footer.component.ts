import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormGroup, Form, Validators, FormBuilder, FormControl} from "@angular/forms";
import {UploadInput, humanizeBytes, UploaderOptions, UploadFile, UploadOutput} from 'ngx-uploader';
import { FieldConfig} from "./interface";
import {ApiService} from '../api.service';

// import any = jasmine.any;

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  public uploaderror:any='';
  fileservername:any=[];


myForm: FormGroup;
public field: any;
public myForm1: any;
public f1: any;

/*public uploadtypec: any = 'multiple';
public filenamevalc: any = 'upload';
public uploadpathc: any = 'modelimages';
public filepathc: any = 'https://developmentapi.audiodeadline.com/nodeserver/uploads/modelimages';*/

  public nameis = 0;
/*field: FieldConfig;
group: FormGroup;
  placeholderval: any;
  typeval: any;
  nameval: any;*/
  /*type: any = ['text'];
  placeholder: any = ['Usaername', 'Name'];
  name: any = ['username', 'email'];
  message: any = ['error'];*/

  public fields:any = [
    {
      inputType: 'file',
      type: 'file',
      uploadtypec: 'multiple',
      filenamevalc: 'upload',
      uploadpathc: 'modelimages',
      filepathc: 'https://developmentapi.audiodeadline.com/nodeserver/uploads/modelimages',
      // name: new FormControl([this.apiService.fileservername[uploader]])
      name:  new FormControl('', [
        Validators.required,
        // Validators.username,
      ]),
    },
    {
      inputType: 'input',
      label: 'username',
      type: 'test',
        /*validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
      ]*/
      // name: 'username',
      name:  new FormControl('', [
        Validators.required,
        // Validators.username,
      ]),
      message: 'Please enter a valid Username '
      // validations: this.Validator[],
    },
    {
      inputType: 'input',
      label: 'Phone Number',
      type: 'number',
      /*validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Phone number Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
              "/^[1-9]{1}[0-9]{9}$/"
          ),
          message: "Invalid phone number"
        }
      ]*/
      // name: 'phone',

      name:  new FormControl('', [Validators.required]),
      message: 'Please enter a valid Phone Number ',
    },
    {
      inputType: 'input',
      label: 'Email',
      type: 'text',
      // name: 'email',
      /*validation: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
              "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]*/
     name: new FormControl('',[ Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])]),

    },
    {
      inputType: 'input',
      placeholder: 'password',
      label: 'Password',
      type: 'password',
      /*validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Password Required"
        }
      ]*/
      // name: 'password',
      name:  new FormControl('', [
        Validators.required,
        // Validators.email,
      ]),
      message: 'Please enter a valid Password ',
    },

    {
      inputType: 'chackbox',
      label: "Accept Terms",
      name: new FormControl(),
      value: true
    },
    {
      inputType: "radio",
      label: "Gender",
      name: new FormControl(),
      radiooptions: ["Male", "Female"],
      value: "Male"
    },
    {
      inputType: "date",
      type: "date",
      label: "DOB",
      name: new FormControl(),
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Date of Birth Required"
        }
      ]
    },
    {
      inputType: "select",
      type: "select",
      label: "Country",
      name: new FormControl(),
      value: "UK",
      selectoptions: ["India", "UAE", "UK", "US"]
    },
    {
      inputType: 'file',
      name: new FormControl(),
    }

    ];
  public lengthis: any;
  public percentageis: any;
  public progress: any=[];
  public inprogress: any;



  constructor(public fb: FormBuilder, public apiService: ApiService) {

    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;


    /*for (let item of this.fields) {
      this. f1 = this.myForm.controls[item.name].patchValue(true);
    }*/
    this.myForm = new FormGroup({
      fields: new FormControl(this.fields)
    });

this.myForm1 = this.fb.group({
  name1: ['', Validators.required],
  name2: ['', Validators.required],
  name3: ['', Validators.required],
})
   /*this.myForm = new FormGroup({})
    console.log('this.fields');
    console.log(this.fields[0].name);*/
  }

  ngOnInit() {
    console.log('this.fields');
    console.log(this.fields);

    console.log('file uploade')
    console.log(this.apiService.fileservername);
   /* for (let ip of this.fields) {
      console.log(ip.name);
      this.field = ip.name;
    }*/
  }


  onSubmit() {
    console.log('this.myForm.value');
    // console.log(this.myForm.value);
    for (let result of this.myForm.value.fields) {
      console.log(result.name.value);
      this.f1 = result.name.value;
    }
  }
 onSubmit1() {
    console.log('this.myForm.value');
    console.log(this.myForm1.value);
  }
getloop() {
    for (let ip of this.fields) {
      console.log(ip);
      this.field = ip.name;
    }
}


}
