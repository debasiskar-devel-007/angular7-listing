import {Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import {MatSort, MatTableDataSource,MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { ApiService } from './api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material';



@Component({
  selector: 'lib-listing',
  templateUrl: './listing.module.html',
  styleUrls: ['./listing.module.css']
})
export class ListingComponent implements OnInit {

  datasourceval:any;
  statusarrval:any;
  skipval:any;
  jwttokenval:any;
  deleteendpointval:any;
  apiurlval:any;
  updateendpointval:any;
  modify_header_arrayval:any;
  selection :any;
  sourcedataval :any;
  columns :any=[];
  olddata :any=[];
  public x :any;

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


  displayedColumns: string[] = [];
  datacolumns: string[] = [];
  displayedColumnsheader: string[] = [];
  //dataSource = new MatTableDataSource(this.datasourceval);
  dataSource = new MatTableDataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public _apiService: ApiService,public dialog: MatDialog,private bottomSheet: MatBottomSheet) {

  }

  ngOnInit() {


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
      console.log(tt.columnDef);
      for (let b in this.modify_header_arrayval){
        if(b==tt.header) tt.header=this.modify_header_arrayval[b];
      }
      if(this.skipval.indexOf(tt.columnDef)==-1)
      this.columns.push(tt)
    }
    let displayedcols= this.columns.map(x => x.columnDef);
    displayedcols.push('Actions');

    this.displayedColumns =displayedcols;
    this.displayedColumns.unshift('select');

    let data_list = []
    for (let i = 0; i < this.x.length; i++) {
      data_list.push(this.createData(x[i]));
    }
    this.olddata=data_list;

    this.dataSource = new MatTableDataSource(data_list);
    this.selection = new SelectionModel(true, []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getstatus(val:any){
    for(let b in this.statusarrval){
      if(this.statusarrval[b].val==val)
        return this.statusarrval[b].name;

    }
    return "N/A";
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
    let data = {}
    Object.keys(point).forEach(function (key) {
      data[key.replace(/\s/g, "_")] = point[key];
    })
    return data
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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


  viewdata(data:any){
    console.log('data');
    console.log(data);

    let res = Object.entries(data);

    console.log('res');
    console.log(res);

    const dialogRef = this.dialog.open(Confirmdialog, {
      width: '70%',
      height: 'auto',
      data: {isconfirmation:false,data:res}
    });

  }
  managestatus(data:any){
    console.log('data');
    console.log(data);
    let bs=this.bottomSheet.open(BottomSheet,{data:{items:this.statusarrval}});

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
            width: '50%',
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
            width: '50%',
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
      width: '50%',
      data: {message: 'Are you sure to delete selected records ??'}
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
            this.dataSource = new MatTableDataSource(this.olddata);
            this.selection = new SelectionModel(true, []);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            let dialogRef = this.dialog.open(Confirmdialog, {
              width: '50%',
              data: {message: 'Are you sure to delete this record ??',isconfirmation:false}
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
      width: '50%',
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

            this.olddata = this.olddata.filter(olddata => olddata._id != data._id)
            this.dataSource = new MatTableDataSource(this.olddata);
            this.selection = new SelectionModel(true, []);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            let dialogRef = this.dialog.open(Confirmdialog, {
              width: '50%',
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
    console.log(this.jwttokenval);

  }


}


@Component({
  selector: 'confirmdialog',
  templateUrl: 'confirm-dialog.html',
})
export class Confirmdialog {

  constructor(
      public dialogRef: MatDialogRef<Confirmdialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('my data ...');
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
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