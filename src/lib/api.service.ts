import {ElementRef, EventEmitter, Injectable, Input, ViewChild} from '@angular/core';
import { switchMap, map, takeWhile } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';


@Injectable()
export class ApiService {
  public domain_for_fileupload_val: any = 'http://developmentapi.audiodeadline.com:7031/uploads' + 'uploads' ;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;
  @ViewChild('fileInput1') uploaderInput: ElementRef;
  /*@Input()
  set domain_for_fileupload(domain_for_fileupload: any) {
    this.domain_for_fileupload_val = domain_for_fileupload;
    console.log('this.skipval');
    console.log(this.domain_for_fileupload_val);
  }*/
  public lengthis;
  public percentageis;
  public inprogress;
  public progress:any=[];
  public uploadtype;
  public uploaderror:any='';
  // public uploadOutputval:any;
  fileservername:any=[];

  /*@Input()
  set uploadOutput(uploadOutput: any){
    this.uploadOutputval = uploadOutput;
    console.log('this.uploadOutput');
    console.log(this.uploadOutput);
  }*/
  constructor(private _http: HttpClient,
              private _authHttp: HttpClient,

              ) {
    this.options = { concurrency: 10, maxUploads: 10 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    //console.log('this.domain');
    //console.log(this.domain);
  }

  onUploadOutput(uploadOutput: UploadOutput, arrayvalue: any, uploadtypec: any, uploadpath: any): void {
    // this.uploaderInput.nativeElement.value = '';
    if (uploadOutput.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: 'http://developmentapi.audiodeadline.com:7031/uploads',
        method: 'POST',
        data: { path: uploadpath }
      };
      this.uploadInput.emit(event);
    } else if (uploadOutput.type === 'addedToQueue' && typeof uploadOutput.file !== 'undefined') {
      if (uploadOutput.file.response != '') {
        this.files = [];
        this.files.push(uploadOutput.file);
        console.log('this.files*********');
        console.log(this.files);
        this.lengthis = this.files.length;
        this.percentageis = this.files[0].progress.data.percentage;
      }
    } else if (uploadOutput.type === 'uploading' && typeof uploadOutput.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof uploadOutput.file !== 'undefined' && file.id === uploadOutput.file.id);
      this.files[index] = uploadOutput.file;
      this.lengthis = this.files.length;
      if(this.files[0]!=null && this.files[0].progress!=null)
        this.percentageis = this.files[0].progress.data.percentage;
      console.log('this.files==================');
      console.log(this.files);
    } else if (uploadOutput.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== uploadOutput.file);
    } else if (uploadOutput.type === 'dragOver') {
      this.dragOver = true;
    } else if (uploadOutput.type === 'dragOut') {
      this.dragOver = false;
    } else if (uploadOutput.type === 'drop') {
      this.dragOver = false;
    }
    console.log('files');
    console.log(this.files);
    if(this.files[0]!=null && this.files[0].progress!=null) {
      if(this.progress[arrayvalue]==null)this.progress[arrayvalue]=0;
      this.inprogress=true;
      console.log('file upload progressing');
      console.log(this.files[0].progress.data.percentage);
      this.progress[arrayvalue] = (this.files[0].progress.data.percentage);
      if(this.progress[arrayvalue]==100) {
        this.progress[arrayvalue]=null;
        this.inprogress=null;
      }
      console.log('this.uploadtype in api service');
      console.log(uploadtypec);
    }
    if (uploadtypec=='single'){
      // this.fileservername = [];
      if(this.fileservername[arrayvalue] == null) this.fileservername[arrayvalue]=[];
      this.fileservername[arrayvalue]=[];
      if(this.files[0].response!=null) this.fileservername[arrayvalue].push(this.files[0].response);
    }
    if (uploadtypec == 'multiple') {
      console.log('this.files[0].response');
      // console.log(this.files[0].response);
      console.log(this.files.length);
      console.log(this.files);
      if (this.fileservername[arrayvalue] == null) this.fileservername[arrayvalue] = [];
      // if(this.files[0].response!=null){
      if(this.files.length==1) {
        if(this.files[0] && this.files[0].response!=null && this.files[0].response.error_code==null ) {
          this.fileservername[arrayvalue].push(this.files[0].response);
          this.files = [];
          this.uploaderror='';
        }
        if(this.files[0] !=null && this.files[0].response!=null && this.files[0].response.error_code!=null){
          this.uploaderror='error occured on uploading !!!';
        }
      }
      if(this.files.length>1)
      {
        console.log('sdfdsf==== in multiple length ');
        for(let b in this.files){
          if(this.files[b].response!=null && this.files[b].response.error_code==null) {
            this.fileservername[arrayvalue].push(this.files[b].response);
          }
        }
        this.files=[];
      }
      //}
    }
    console.log('this.fileservername');
    console.log(this.fileservername);
    console.log(this.uploaderror);
    //this.uploaderservice.filenamevalc1=this.fileservername;
    //UploaderComponent.filenamevalc1=87;
    //console.log(classval);

  }
  isTokenExpired() {

    // const helper = new JwtHelperService();
    // const decodedToken = helper.decodeToken(localStorage.getItem('id_token'));
    // var isIdTokenExpired = helper.isTokenExpired(localStorage.getItem('id_token'));
    // console.log('refresh_token',localStorage.getItem('refresh_token'))
    // const isRefreshTokenExpired = helper.isTokenExpired(localStorage.getItem('refresh_token'));
    // console.log('id_token isExpired:',isIdTokenExpired)
    // console.log('refresh_token isExpired:',isRefreshTokenExpired)



  }

  getclientip() {

    console.log('endpoint');

    // this.isTokenExpired()
    var result = this._http.get("http://ipinfo.io/?format=json&token=9797c42b93078a").pipe(map(res => res));

    return result;
  }



  getEndpoint(endpoint: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'access-token': ''
      })
    };
    console.log('endpoint');
    console.log(endpoint);
    console.log('httpOptions');
    console.log(httpOptions);
    console.log('');

    // this.isTokenExpired()
    var result = this._http.post('' + endpoint.source, {}, httpOptions).pipe(map(res => res));

    return result;
  }

  getData(endpoint: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'access-token': ''
      })
    };
    console.log('endpoint');
    console.log(endpoint);
    console.log('httpOptions');
    console.log(httpOptions);
    console.log('');

    // this.isTokenExpired()
    var result = this._http.post('' + 'datalist', endpoint, httpOptions).pipe(map(res => res));

    return result;
  }

  // getData end

  postData(endpoint:any, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'access-token': ''
      })
    };
    console.log('');
    console.log('endpoint');
    console.log(endpoint);
    console.log('httpOptions');
    console.log(httpOptions);
    var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map(res => res));
    return result;
  }
  postDatawithoutToken(endpoint:any, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log('');
    console.log('endpoint');
    console.log(endpoint);
    var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map(res => res));
    return result;
  }

  postlogin(endpoint:any, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log('');
    console.log('endpoint');
    console.log(endpoint);
    var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map(res => res));
    return result;
  } // postData end




  postSearch( link,token,source) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': token
      })
    };
    console.log('------ ');
    console.log("link in postSearch");
    console.log(link);
    console.log(source);
    var result = this._http.post(link, source, httpOptions).pipe(map(res => res));
    return result;
  }
postSearch1( link,source) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': source.token
      })
    };
    console.log('------ ');
    console.log("link");
    console.log(link);
    var result = this._http.post(link, source).pipe(map(res => res));
    return result;
  }





  putData(endpoint:any, data, id:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ''
      })
    };
    console.log('');
    console.log("endpoint");
    console.log(endpoint);
    var result = this._http.put(this.getEndpointUrl(endpoint)+'/'+id, JSON.stringify(data), httpOptions).pipe(map(res => res));
    return result;
  }


  deteOneData(endpoint:any, data,token,source) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': token
      })
    };
    console.log('------ ');
    console.log("endpoint");
    console.log(endpoint);
    console.log(data);
    let dataval:any;
    dataval={source:source,id:data._id}
    var result = this._http.post(endpoint,dataval, httpOptions).pipe(map(res => res));
    return result;
  }

    togglestatus(endpoint:any, data,token,source) {
      console.log(endpoint);
      console.log(data);
      console.log(token);
      console.log(source);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': token
      })
    };
    console.log('------ ');
    console.log("endpoint");
    console.log(endpoint);
    console.log(data);
    let dataval:any;
    dataval={source:source,data:data}
    var result = this._http.post(endpoint,dataval, httpOptions).pipe(map(res => res));
    return result;
  }

  deteManyData(endpoint:any, data,token,source) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': token
      })
    };
    console.log('------ ');
    console.log("endpoint");
    console.log(endpoint);
    console.log(data);
    let dataval:any;
    dataval={source:source,ids:data}
    var result = this._http.post(endpoint+'many',dataval, httpOptions).pipe(map(res => res));
    return result;
  }

    togglestatusmany(endpoint:any, data,val,token,source) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': token
      })
    };
    console.log('------ ');
    console.log("endpoint");
    console.log(endpoint);
    console.log(data);
    let dataval:any;
    dataval={source:source,data:{ids:data,val:val}};
    var result = this._http.post(endpoint+'many',dataval, httpOptions).pipe(map(res => res));
    return result;
  }



  private getEndpointUrl(endpoint: string) {
      return '' + endpoint;
  }

}
