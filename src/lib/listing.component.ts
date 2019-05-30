import {Component, OnInit, ViewChild, Input, Inject,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ViewContainerRef} from '@angular/core';
import {MatSort, MatTableDataSource,MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { ApiService } from './api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event} from "@angular/router";
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import { DomSanitizer} from '@angular/platform-browser';
declare var $:any;
import * as momentImported from 'moment';
const moment = momentImported;

@Component({
  selector: 'lib-listing',
  templateUrl: './listing.module.html',
  styleUrls: ['./listing.module.css']
})
export class ListingComponent implements OnInit {

  myControl = new FormControl();


  datasourceval:any;
  search_settingsval:any;
  click_to_add_ananother_pageval:any;
  grab_linkval:any;
  date_search_sourceval:any;
  date_search_endpointval:any;
  urlval:any;
  searchendpointval:any;
  searchListval:any;
  pdf_link_val:any;
  statusarrval:any;
  skipval:any;
  errormg:any;
  jwttokenval:any;
  detail_datatypeval:any;
  detail_skip_arrayval:any;
  deleteendpointval:any;
  editrouteval:any;
  apiurlval:any;
  updateendpointval:any;
  modify_header_arrayval:any;
  selection :any;
  sourcedataval :any;
  emailarrayval :any;
  columns :any=[];
  olddata :any=[];
  tsearch :any=[];
  autosearch :any=[];
  public x :any;
  public custombuttonval :any;
  public result :any = {};
  public sh :any = false;
  public art :any = false;
  public aud2 :any = false;
  public aud :any = false;


  @Input()
  set search_settings(search_settings: any) {
    this.search_settingsval = search_settings;
    console.log('this.search_settingsval');
    console.log(this.search_settingsval);
    /*for (let i= 0; i<= this.search_settingsval.search.length; i++) {
      console.log(this.search_settingsval.search[i].label);
    }*/

  /*  console.log(this.search_settingsval.selectsearch);
    console.log(this.search_settingsval.selectsearch[0].label);
    console.log(this.search_settingsval.selectsearch[0].values);
    console.log(this.search_settingsval.datesearch);*/
  }

  @Input()
  set click_to_add_ananother_page(click_to_add_ananother_page: any) {
    this.click_to_add_ananother_pageval = click_to_add_ananother_page;
    console.log('this.click_to_add_ananother_pageval');
    console.log(this.click_to_add_ananother_pageval);
  }

  @Input()
  set grab_link(grab_link: any) {
    this.grab_linkval = grab_link;
    console.log('this.grab_linkval');
    console.log(this.grab_linkval);
  }
  @Input()
  set custombutton(custombutton: any) {
    this.custombuttonval = custombutton;
    console.log('this.custombuttonval');
    console.log(this.custombuttonval);
  }

  @Input()
  set date_search_source(date_search_source: any) {
    this.date_search_sourceval = date_search_source;
    console.log('this.date_search_sourceval');
    console.log(this.date_search_sourceval);
  }

  @Input()
  set date_search_endpoint(date_search_endpoint: any) {
    this.date_search_endpointval = date_search_endpoint;
    console.log('this.date_search_endpointval');
    console.log(this.date_search_endpointval);
  }
   @Input()
  set url(url: any) {
    this.urlval = url;
    console.log('this.urlval');
    console.log(this.urlval);
  }
    @Input()
  set searchendpoint(searchendpoint: any) {
    this.searchendpointval = searchendpoint;
    console.log('this.searchendpointval');
    console.log(this.searchendpointval);
  }
   @Input()
  set pdf_link(pdf_link: any) {
    this.pdf_link_val = pdf_link;
    console.log('this.pdf_link_val');
    console.log(this.pdf_link_val);
  }
  @Input()
  set searchList(searchList: any) {
    this.searchListval = searchList;
    console.log('this.searchListval');
    console.log(this.searchListval);
  }
  @Input()
  set datasource(datasource: any) {
    this.datasourceval = datasource;
    console.log('this.datasourceval');
    console.log(this.datasourceval);
  }

  @Input()
  set skip(skip: any) {
    this.skipval = skip;
    console.log('this.skipval');
    console.log(this.skipval);
  }
  @Input()
  set detail_datatype(detail_datatype: any) {
    this.detail_datatypeval = detail_datatype;
    console.log('this.detail_datatypeval');
    console.log(this.detail_datatypeval);
  }
 @Input()
  set detail_skip_array(detail_skip_array: any) {
    this.detail_skip_arrayval = detail_skip_array;
    console.log('this.detail_skip_arrayval');
    console.log(this.detail_skip_arrayval);
  }

@Input()
  set sourcedata(sourcedata: any) {
    this.sourcedataval = sourcedata;
    console.log('this.sourcedataval');
    console.log(this.sourcedataval);
  }

  @Input()
  set modify_header_array(modify_header_array: any) {
    this.modify_header_arrayval = modify_header_array;
    console.log('this.modify_header_arrayval');
    console.log(this.modify_header_arrayval);
  }

  @Input()
    set deleteendpoint(deleteendpointval: any) {
      this.deleteendpointval = deleteendpointval;
      console.log('this.deleteendpointval');
      console.log(this.deleteendpointval);
    }

 @Input()
    set updateendpoint(updateendpoint: any) {
      this.updateendpointval = updateendpoint;
      console.log('this.updateendpointval');
      console.log(this.updateendpointval);
    }
    @Input()
    set apiurl(apiurl: any) {
      this.apiurlval = apiurl;
      console.log('this.apiurlval');
      console.log(this.apiurlval);
    }

@Input()
    set jwttoken(jwttoken: any) {
      this.jwttokenval = jwttoken;
      console.log('this.jwttokenval');
      console.log(this.jwttokenval);
    }

    @Input()
    set statusarr(statusarr: any) {
      this.statusarrval = statusarr;
      console.log('this.statusarrval');
      console.log(this.statusarrval);
    }

    @Input()
    set emailarray(emailarray: any) {
      this.emailarrayval = emailarray;
      console.log('this.emailarrayval');
      console.log(this.emailarrayval);
    }

  @Input()
  set editroute(editroute: any) {
    console.log('editroute');
    console.log(editroute);
    this.editrouteval = editroute;
    console.log('this.editrouteval');
    console.log(this.editrouteval);
  }


  stateGroups: string[] = this.searchListval;
  stateGroup: Observable<string[]>;

  displayedColumns: string[] = [];
  datacolumns: string[] = [];
  displayedColumnsheader: string[] = [];
  formarray: any = [];
  start_date: any ;
  dateSearch_condition: any ={};
  selectSearch_condition: any ={};
  autoSearch_condition: any ={};
  textSearch_condition: any ={};
  end_date: any ;
  public i: any ;
  loading: any = false ;
  public preresult: any={};
  //dataSource = new MatTableDataSource(this.datasourceval);
  dataSource = new MatTableDataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // options: FormGroup;
  myForm:any;
  // myForm:any;

  constructor(public _apiService: ApiService,public dialog: MatDialog,private bottomSheet: MatBottomSheet,public fb: FormBuilder,private router: Router, private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef, public _http: HttpClient, public sanitizer:DomSanitizer) {

    this.router.events.subscribe((event: Event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });



   /* this.myForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      password: ['', Validators.required]
    });*/



  }
  /*@Directive({
    selector: '[Listing]'
  })*/






  inputblur(val:any){
    console.log('on blur .....');
    this.myForm.controls[val].markAsUntouched();
  }
  ngOnInit() {

    if (this.search_settingsval !=null && this.search_settingsval.search != null && this.search_settingsval.search != '') {
      console.log('----------------');
      let source: any;
      let condition: any = {};
      source = {
        source: this.date_search_sourceval,
        condition: condition
      };
      let link = this.apiurlval + '' + this.date_search_endpointval;
      this._apiService.postSearch(link, this.jwttokenval, source).subscribe(res => {
        console.log(res);
        this.result = res;
        console.log(this.result);
        this.preresult = this.result.res;
        console.log(this.preresult);
      });

    }

    // this._service.success(this.columns[0].date,'dndnnd',this.options);
   /* this.stateGroupOptions = this.myControl.valueChanges
        .pipe(
            startWith(''),
            map(value => this._filterGroup(value))
        );*/

    this.stateGroup = this.myControl.valueChanges
        .pipe(
            startWith(''),
            map(value => this._filter(value))
        );

    /*const factory = this.resolver.resolveComponentFactory(
        componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
*/

    this.x = this.datasourceval;
    let x=this.x;

    let temp = []
    let keys = x[0]
    temp = Object.keys(keys)

    let coldef_list = [];
    let header_list = [];
    for (let i = 0; i < temp.length; i++) {
      coldef_list.push(temp[i].replace(/\s/g, "_"));
      header_list.push(temp[i])
    }
    //coldef_list.push('Actions');
    //header_list.push('Actions')
    console.log('coldef_list',coldef_list);
    console.log('header_list',header_list);

    for (let i = 0; i < coldef_list.length; i++) {
      let ff = `row.${coldef_list[i]}`
      var tt = { columnDef: `${coldef_list[i]}`,    header: `${header_list[i].replace(/_/g," ")}`,  cell: (row) => eval(ff) ,objlength:header_list.length  };
      // console.log('tt.columnDef');
      // console.log(tt.columnDef);
      for (let b in this.modify_header_arrayval){
        if(b==tt.header) tt.header=this.modify_header_arrayval[b];
      }

      if(this.skipval.indexOf(tt.columnDef)==-1)
      this.columns.push(tt);
      // console.log('this.columns');
      // console.log(this.columns);
    }
    let displayedcols= this.columns.map(x => x.columnDef);
    displayedcols.push('Actions');

    this.displayedColumns =displayedcols;
    this.displayedColumns.unshift('select');

    let data_list = [];
    for (let i = 0; i < this.x.length; i++) {
      data_list.push(this.createData(x[i]));
    }
    this.olddata=data_list;
console.log(data_list)
    this.dataSource = new MatTableDataSource(data_list);
    this.selection = new SelectionModel(true, []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  onSubmit() {
    let x: any;
    this.errormg = '';
    let data = this.myForm.value;
    console.log('data');
    console.log(data);
    console.log(this.myForm.valid);
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }
  }
  dateSearch(val: any) {
    console.log("start date");
    console.log(this.start_date);
    console.log(this.end_date);
    let sd = moment(this.start_date).unix();
    let ed = moment(this.end_date).unix();
    console.log(moment(this.start_date).unix());
    console.log(moment(this.end_date).unix());
    console.log(new Date(this.end_date).getTime());
    let link = this.apiurlval + ''+ this.date_search_endpointval;
    console.log(link);
    if(moment(this.end_date).unix()!=null && moment(this.start_date).unix()!=null ) {


      let source:any;
      let condition: any;
      condition = {};

      condition[val] = {
        $lte: new Date(this.end_date).getTime(),
            $gte: new Date(this.start_date).getTime(),
      };
      this.dateSearch_condition = {};
      this.dateSearch_condition = condition;
      let conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
          source= {
            source: this.date_search_sourceval,
            condition: conditionobj,
          };
      console.log(source);
      this._apiService.postSearch(link,this.jwttokenval, source).subscribe(res => {
        console.log(res);
        let result: any = {};
        result = res;
        console.log(result.res);
        this.dataSource = new MatTableDataSource(result.res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

      /*this._http.post(link, {source:this.date_search_sourceval,
        condition: {
          'created_at': {
            $lte: new Date(this.end_date).getTime(),
            $gte: new Date(this.start_date).getTime(),
          }
        },token: this.jwttokenval,
      }).subscribe( res =>{
        let result: any ={};
        result = res;
        console.log("ok");
        console.log(res);
        console.log(result.res);
        let newdata = result.res;
        this.dataSource = new MatTableDataSource(result.res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })*/
    }else
      console.log("error");
  }



  selectSearch (value:any,type:any){
    console.log('type');
    console.log(type);
    let link = this.apiurlval + ''+ this.date_search_endpointval;
    console.log(link);
    let source:any;
    let condition: any;
    condition = {};
    condition[type.field]=value;
    this.selectSearch_condition = {};
    this.selectSearch_condition = condition;
    let conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
    source= {
      source: this.date_search_sourceval,
      condition: conditionobj
    };
    if(value !=null ) {
      this._apiService.postSearch(link, this.jwttokenval, source).subscribe(res => {
        console.log(res);
        let result: any = {};
        result = res;
        console.log("ok");
        console.log(res);
        console.log(result.res);
        let newdata = result.res;
        this.dataSource = new MatTableDataSource(result.res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else
    {
      console.log('oops');
    }
  console.log("error");
  }
  autosearchfunction (value: any) {
    console.log(value);
    let val:any=this.autosearch[value];
    console.log(val);
    let source:any;
    let condition: any={};
    if(this.autosearch[value].length>0 && {$or:[this.autosearch[value].toLowerCase(),this.autosearch[value].toUpperCase(),this.autosearch[value]]})condition[value+'_regex']=val;
    this.autoSearch_condition = {};
    this.autoSearch_condition = condition;
    let conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
    source= {
      source: this.date_search_sourceval,
      condition: conditionobj
    };
    let link = this.apiurlval + ''+ this.date_search_endpointval;
    this._apiService.postSearch(link, this.jwttokenval, source).subscribe(res => {
      console.log(res);
      // let result:any={};
      this.result = res;
      console.log(this.result);
      console.log(this.result.res);
      this.dataSource = new MatTableDataSource(this.result.res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  textsearchfunction (value:any){
    console.log('value');
    console.log(value);
    console.log(value.toLowerCase());
    console.log(this.tsearch[value]);
    let link = this.apiurlval + ''+ this.date_search_endpointval;
    console.log(link);
    let source:any;
    let condition: any={};
    //condition = {};
    let val:any =this.tsearch[value].toLowerCase();
    // condition={$or:[this.tsearch[value].toLowerCase(),this.tsearch[value].toUpperCase()]};
    if(this.tsearch[value].length>1 && {$or:[this.tsearch[value].toLowerCase(),this.tsearch[value].toUpperCase()]})condition[value+'_regex']=val;
    this.textSearch_condition = {};
    this.textSearch_condition = condition;
    //condition[value]="/222/";
    //condition={email:{$regx:'/222/i'}};
    let conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
    source= {
      source: this.date_search_sourceval,
      condition: conditionobj
    };
    console.log('source');
    console.log(source);
    //add loader
    this.loading = true;
    if(value !=null  ) {
      this._apiService.postSearch(link, this.jwttokenval, source).subscribe(res => {
        console.log(res);
        let result: any = {};
        result = res;
        //close loader
        this.loading = false;
        console.log("ok");
        console.log(res);
        console.log(result.res);
        let newdata = result.res;
        this.dataSource = new MatTableDataSource(result.res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else
    {
      console.log('oops');
    }
  console.log("error");
  }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchListval.filter(option => option.toLowerCase().includes(filterValue));
  }

  /*private _filterGroup(value: string): StateGroup[] {
   /!* if (value) {
      return this.searchListval
          .map(group => ({names: _filter(group.names, value)}))
          .filter(group => group.names.length > 0);
    }

    return this.searchListval;*!/
    const filterValue = value.toLowerCase();

    return this.searchListval.filter(option => option.toLowerCase().includes(filterValue));
  }*/

  getstatus(val:any){
    // console.log('val');
    // console.log(val);
    for(let b in this.statusarrval){
      if(this.statusarrval[b].val==val)
        return this.statusarrval[b].name;
      // console.log(this.statusarrval[b].name);
    }
    return "N/A";
  }
  hi(val: any){
    // console.log('hi  val');
    // console.log(val);
    if (val.shatterblok_agreement_date != null && val.audiodeadline_agreement_date ==null ){
      // console.log('shatter blok');
      this.sh = true;
      this.aud = false;
    }
    if (val.shatterblok_agreement_date != null && val.audiodeadline_agreement_date !=null) {
      this.sh = true;
      this.aud = true;
    }
    if (val.shatterblok_agreement_date == null && val.audiodeadline_agreement_date ==null) {
      this.sh = false;
      this.aud = false;
    }
  }
  grapurl(val: any){
    //  for all row checking
// console.log(val)
    if (val != null) {
      this.art = true;
      this.aud2 = true;
    }
    if (val == null) {
      this.art = false;
      this.aud2 = false;
    }
    // console.log(this.sh);
    // console.log(this.aud);
  }

    copyText(row: any, val: string){
    console.log('row in copyText');
    console.log(row);
    console.log('val in copyText');
    console.log(val)
      let fullurl = val+''+row;
    console.log(fullurl);
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = fullurl;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

  clickurl(val: any , url: any) {
    let i
    console.log('ok');
    console.log(val);
    console.log(val._id);
    console.log(url);
    console.log(url + '' +val._id + '' + this.pdf_link_val);
    let link= url + '' +val._id + '' + this.pdf_link_val;
    window.open(link, "_blank");
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  createData(point:any){
    let data = {};
    Object.keys(point).forEach(function (key) {
      data[key.replace(/\s/g, "_")] = point[key];
    });
    return data
  }

  applyFilter(filterValue: string) {
    console.log(filterValue)
    console.log(this.dataSource);
    // console.log(this.dataSource[name])
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /*applyFilter1(filterValue: string, val: any) {
    console.log(filterValue);
    console.log(val.value);
    let value= new MatTableDataSource(val.value);

    value.filter = filterValue.trim().toLowerCase();
    console.log(value);
    /!* this.dataSource.filterPredicate = function(data, filter: string): boolean {
      // return data.name.toLowerCase().includes(filter);
    };
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*!/
  }*/

  styleCell(col_name,row){

    /*
     if (col_name['columnDef']=='progress' && row['progress']=='100'){
     return {'color' : 'red'}
     } else {
     return {}
     }
     */


    return {}
  }


  viewdata(data1:any){
    let data:any;
    data=data1;
    let data2:any=[];
    console.log('data');
    console.log(data);

      for (let key in data) {
        let flagk:any='';
          if (data.hasOwnProperty(key)) {
              console.log(key + " -> " + data[key]+"--->"+typeof (data[key]));
              if(typeof (data[key])=='boolean') {
                  if(data[key]==true) data[key]='Yes';
                  if(data[key]==false) data[key]='No';
              }

              if(typeof (data[key])=='object') {
                  let tempdata:any=[];
                  for(let k in data[key]){
                      console.log('key');
                      console.log(key);
                      console.log(this.detail_datatypeval);
                      for(let p in this.detail_datatypeval){
                          console.log('p');
                          console.log(p);
                          console.log(key);
                          console.log(data[key][k]);
                          if(this.detail_datatypeval[p].key==key && this.detail_datatypeval[p].value=='image'){

                              let imgval:any=this.detail_datatypeval[p].fileurl+data[key][k].replace(/'/g, '');
                              console.log('imgval');
                              console.log('imgval');
                              console.log(imgval);
                              console.log(data[key][k].replace(/'/g, ''));
                              tempdata.push("<img mat-card-image src="+imgval+"><br/>");
                             // tempdata.push("<span>"+data[key][k]+"</span><br/>")


                          }
                          if(this.detail_datatypeval[p].key==key && this.detail_datatypeval[p].value!='image'){
                              //tempdata.push("<img mat-card-image src="+data[key][k]+"><br/>")
                              tempdata.push("<span>"+data[key][k]+"</span><br/>");


                          }
                      }

                  }
                  data[key]=tempdata;
              }
          }
      }

      console.log('data');
      console.log(data);
      for(let n in data){
        if(data[n]!=null && data[n]!=''){
          data2[n]=data[n];
        }
      }

    for(let v in this.detail_skip_arrayval){
      //data2[this.detail_skip_arrayval[v]]='';
      delete data2[this.detail_skip_arrayval[v]];
      console.log('this.detail_skip_arrayval[v]');
      console.log(this.detail_skip_arrayval[v]);
    }
      let res = Object.entries(data2);
    console.log('this.detail_skip_array');
    console.log(this.detail_skip_arrayval);
    console.log(this.detail_datatypeval);

    console.log('res');
    console.log(res);



    const dialogRef = this.dialog.open(Confirmdialog, {
      height: 'auto',
      panelClass: 'custom-modalbox',
      data: {isconfirmation:false,data:res}
    });

  }
  managestatus(data:any){
    console.log('data');
    console.log(data);
    let bs=this.bottomSheet.open(BottomSheet,{panelClass: 'custom-bottomsheet',data:{items:this.statusarrval}});

    bs.afterDismissed().subscribe(result => {
      console.log('The bottom sheet was closed');
      console.log(result);
      if(result!=null){
        data.status = result.val;
        data.id = data._id;
      this._apiService.togglestatus(this.apiurlval + 'statusupdate', data, this.jwttokenval, this.sourcedataval).subscribe(res => {
        let result: any = {};
        result = res;
        if (result.status == 'success') {
          for (let c in this.olddata) {
            //this.olddata = this.olddata.filter(olddata => olddata._id != ids[c]);
            if (this.olddata[c]._id == data._id) {
              console.log('in data update');
              console.log(data);
              this.olddata[c].status = data.status;
            }
          }
          this.dataSource = new MatTableDataSource(this.olddata);
          this.selection = new SelectionModel(true, []);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          let dialogRef = this.dialog.open(Confirmdialog, {
            panelClass: 'custom-modalbox',
            data: {message: 'Status updated successfully!!', isconfirmation: false}
          });

        }

      }, error => {
        console.log('Oooops!');
      });
    }
      //this.animal = result;
    });

  }

// for tree view in modal
  custombuttonfunc(data:any){
    console.log('data');
    console.log(data);    // row data
    console.log(this.custombuttonval);    // object from where the library has been used
    let unsafeurl:any=this.custombuttonval.url;   //iframe url
    for(let b in this.custombuttonval.fields){
      unsafeurl=unsafeurl+'/'+data[this.custombuttonval.fields[b]];
    }
    console.log('unsafeurl');
    console.log(unsafeurl);
    unsafeurl=this.sanitizer.bypassSecurityTrustResourceUrl(unsafeurl);   //for sanitizing the url for security, otherwise it won't be able to show the page in iframe, hence modal

    const dialogRef = this.dialog.open(Confirmdialog, {       // for opening the modal
      height: 'auto',
      panelClass: 'custom-data-modal',
      data: {isconfirmation:false,data:[{data:data,customdata:unsafeurl}]}
    });


  }



  managestatusmultiple(){

    let ids:any=[];
    let c:any;
    for(c in this.selection.selected){

      ids.push(this.selection.selected[c]._id);
    }
    console.log('ids');
    console.log(ids);
    //console.log('data');
    //console.log(data);
    let bs=this.bottomSheet.open(BottomSheet,{data:{items:this.statusarrval}});

    bs.afterDismissed().subscribe(result => {
      console.log('The bottom sheet was closed');
      console.log(result);
      if(result!=null){
        //data.status = result.val;
        //data.id = data._id;
        let newstatus:any=result.val;
      this._apiService.togglestatusmany(this.apiurlval + 'statusupdate', ids,result.val, this.jwttokenval, this.sourcedataval).subscribe(res => {
        let result: any = {};
        result = res;
        if (result.status == 'success') {
          for (let c in this.olddata) {
            //this.olddata = this.olddata.filter(olddata => olddata._id != ids[c]);
            if (ids.indexOf(this.olddata[c]._id)>-1) {
              console.log('in data update');
              //console.log(data);
              this.olddata[c].status = newstatus;
            }
          }
          this.dataSource = new MatTableDataSource(this.olddata);
          this.selection = new SelectionModel(true, []);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          let dialogRef = this.dialog.open(Confirmdialog, {
            panelClass: 'custom-modalbox',
            data: {message: 'Status updated successfully!!', isconfirmation: false}
          });

        }

      }, error => {
        console.log('Oooops!');
      });
    }
      //this.animal = result;
    });

  }

  deletemultiple(){
    console.log('this.selection.selected.length');
    console.log(this.selection.selected.length);
    console.log(this.selection);
    console.log(this.selection.selected);

    const dialogRef = this.dialog.open(Confirmdialog, {
      panelClass: 'custom-modalbox',
      data: {message: 'Are you sure you want to delete the selected records?'}
    });
    let ids:any=[];
    let c:any;
    for(c in this.selection.selected){

      ids.push(this.selection.selected[c]._id);
    }
    console.log('ids');
    console.log(ids);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result=='yes'){
        this._apiService.deteManyData(this.apiurlval+this.deleteendpointval,ids,this.jwttokenval,this.sourcedataval).subscribe(res => {
          let result: any = {};
          result = res;
          if(result.status=='success'){
            for(let c in ids){
              this.olddata = this.olddata.filter(olddata => olddata._id != ids[c]);
            }
            console.log('this.olddata');
            console.log(this.olddata);
            this.dataSource = new MatTableDataSource(this.olddata);
            this.selection = new SelectionModel(true, []);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            let dialogRef = this.dialog.open(Confirmdialog, {
              panelClass: 'custom-modalbox',
              data: {message: 'Record(s)  deleted successfully !!',isconfirmation:false}
            });

          }

        }, error => {
          console.log('Oooops!');
        });

      }
      //this.animal = result;
    });
  }
  deletedata(data:any){
    //alert(5);
    //this._apiService.deteOneData(this.apiurlval+this.deleteendpointval,data,this.jwttokenval);
    console.log('data 889 ---');
    console.log(data);
    console.log('jwttokenval');
    console.log(this.jwttokenval);


    const dialogRef = this.dialog.open(Confirmdialog, {
      panelClass: 'custom-modalbox',
      height: 'auto',
      data: {message: 'Are you sure to delete this record ??'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result=='yes'){
        this._apiService.deteOneData(this.apiurlval+this.deleteendpointval,data,this.jwttokenval,this.sourcedataval).subscribe(res => {
          let result: any = {};
          result = res;
          if(result.status=='success'){
            console.log('this.olddata');
            console.log(this.olddata);
            console.log(this.olddata._id);
            this.olddata = this.olddata.filter(olddata => olddata._id != data._id)
            this.dataSource = new MatTableDataSource(this.olddata);
            this.selection = new SelectionModel(true, []);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            let dialogRef = this.dialog.open(Confirmdialog, {
              panelClass: 'custom-modalbox',
              data: {message: 'Record  deleted successfully !!',isconfirmation:false}
            });
          }

        }, error => {
          console.log('Oooops!');
        });

      }
      //this.animal = result;
    });

  }

 editdata(data:any){
    console.log('data');
    console.log(data);
    console.log(this.editrouteval);
    console.log(this.editrouteval+data._id);
    console.log(this.jwttokenval);
   this.router.navigate([this.editrouteval,data._id]);
    //this.na


  }



}


@Component({
  selector: 'confirmdialog',
  templateUrl: 'confirm-dialog.html',
})
export class Confirmdialog {

  constructor(
      public dialogRef: MatDialogRef<Confirmdialog>,
      @Inject(MAT_DIALOG_DATA) public data: any ,public sanitizer:DomSanitizer) {
    console.log('my data ...');
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  sanitizeUrl(unsafeurl:any,data:any,rowdata:any){
    for(let b in data){
      unsafeurl=unsafeurl+'/'+rowdata[data[b]];

    }
    console.log('unsafeurl');
    console.log(unsafeurl);
    console.log(data);
    console.log(rowdata);
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeurl);
  }

}




@Component({
  selector: 'bottom-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheet>,@Inject(MAT_BOTTOM_SHEET_DATA) public data:any) {}

  openLink(val:any): void {
    console.log('bottomsheet data');
    console.log(val);
    this.bottomSheetRef.dismiss(val);
    //event.preventDefault();
  }
}
