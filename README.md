# Listing

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Code scaffolding

Run `ng generate component component-name --project listing` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project listing`.
> Note: Don't forget to add `--project listing` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build listing` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build listing`, go to the dist folder `cd dist/listing` and run `npm publish`.

## Running unit tests

Run `ng test listing` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Angular Material installation process


At first you install angular material [Angular Material] (https://material.angular.io/guide/getting-started/).


 ** Angular Devkit 6+
Using the Angular CLI ng add command will update your Angular project with the correct dependencies, perform configuration changes and execute initialization code.

Run `ng add @angular/material`.


## lib-listing npm installation process


IF you use Linux or Mac open the terminal and Run `sudo npm install angular7-listing@latest` AND If you use Windows open the cmd and Run `npm install angular7-listing@latest` .

## How to implement lib-listing




<------------------------------------------ts page start -------------------------------------------->




  // use for Download the PDF

  custom_link: any = [{
      label: 'shatterblok',
      url: 'http://shatterblok.com/testpdf/html2pdf/shatterblok-agreement.php?id=',
      action: 'null'
  }, {
      label: 'Audiodateline',
      url: 'http://shatterblok.com/testpdf/html2pdf/audiodeadline-agreement.php?id=',
      action: 'null'
  }];




  // use for grab the link
    grab_link: any = {
        colom_name: [
            {
                col_name: 'author',
                field_name: 'author'
            }],
        field: [
            {
                label: 'shatterblok grab url',
                url: 'artixtxp.com/',
                action: 'null'
            },
            {
                label: 'shatterblok grab url',
                url: 'artixtxp.com/',
                action: 'null'
            }]

    };

  tabledata: any = [];

  // use for status search

  public status: any = [{ val: 0, 'name': 'Active' }, { val: 1, 'name': 'Inactive' }, { val: 3, 'name': 'Lock' }];


  //status name set

  statusarray: any = [{val: 0, name: 'Active'}, {val: 1, name: 'Inactive'}, {val: 3, name: 'Lock'}]; 


  // use for ststic email search
  //  Example like this

  emailarray: any = [{val: 'sourotest222@gmail.com', name: 'sourotest222@gmail.com'}, {val: 'octtest@yopmail.com', name: 'octtest@yopmail.com'}, {val: 'septest@yopmail.com', name: 'septest@yopmail.com'}];

  // use for edit any field Navigate that page And you should be import the app-routing.module.ts   ex:- {path: 'editroute/:id', component: < "Write the class name"> },

  //  Example like this

  editroute: any = 'editroute';


  // use for Table Header modification 

  // Like Table head name is " firstname" => "First Name"
  // if any time "ex_ex" not modify that time use this "ex ex" 

  modify_header_array: any = {
      'author': "AUTHOR",
      'priority': 'PRIORITY',
      'status': 'STATUS',
      'image': 'IMAGE',
      'blogtitle':"Blog Title"
  };


  // use for Table Header Skip 

  tabledata_header_skip: any = ['_id','video_thamnail','type', 'password','description','created_at'];



  // use for Table Detail Field Skip

  tabledata_detail_skip: any = ['_id', 'email', 'name'];


  // use for Table Detail inside the modal image path

  tabledata_detail_datatype: any = [{
      key: "images",
      value: 'image',
      fileurl: "http://18.222.26.198/upload/brandimages/"             // Image path 
  }];

  // updateendpoint is use for data update endpoint

  updateendpoint = 'addorupdatedata';

  // deleteendpoint is use for data delete endpoint

  deleteendpoint = 'deletesingledata';

  // this is a database collection name

  tablename = 'users';

  // searchendpoint is use for data search endpoint

  searchendpoint = 'datalist';          // this time not using

  // use for click to another page routing path

  click_to_add_ananother_page = '/adminlist';



  // date_search_endpoint is use for date search endpoint

  date_search_endpoint: any='datalist';

  // send basic limit data 

  limitcond:any={
      "limit":10,
      "skip":0,
      "pagecount":1
  };

  // other data

  libdata:any={
        basecondition:{status:1},       // this is for basic condition if you are added youer end point additional condition
        
//    this is use for view detail header modifications

       detailview_override: [
            { key: "tags_array", val: "Tags" },
            { key: "author", val: "Written By" },
            { key: "blogtitle", val: "Title" },
            { key: "created_datetime", val: "Date Added with time" },
            { key: "created_date", val: "Date Added only" },
        ],                            
        
        // optional
        
// this is use for notes button on that listing
        notes: {
            label: "Blog Notes",
            addendpoint: "addnotedata",               // note add end point
            deleteendpoint: "deletenotedata",         // note delete end point
            listendpoint: "listnotedata",             // note list end point
            user: "5e0c80cd3a339a042de8717d",         // user id
            currentuserfullname: "Debasis",           // user name
            header: 'blogtitle',                     
        },
        updateendpointmany: 'updateendpointmany',     // update many endpoint 
        deleteendpointmany: 'deleteendpointmany',     // delete many endpoint 
      updateendpoint:'statusupdate',                  // update endpoint set
      hideeditbutton:false,                           // (hide edit button ) all these button options are optional not mandatory
       hidedeletebutton:true,                         // (hide delete button)
       hideviewbutton:false,                          // (hide view button)
       hidestatustogglebutton:true,                   // (hide status toggle button)
       hideaction:true,                               // (hide action column)
       hidemultipleselectbutton: false,               // (hide multipleselect chickbox)
       hidedeletemany: true,                          // (hide delete many button)
       hideupdatemany: false,                         // (hide update many button)
       tableheaders:['author','priority','blogtitle','status','wrongone','image'],   //not required (table header name)
      custombuttons:[
          {
              label:"fb search with blog title",            // fb search button name
              link:"https://www.facebook.com/search/top/",  // fb search link
              type:'externallink',                          // external link
              param:[{key:'blogtitle',q:'q'}],              // passed parameter like https://www.facebook.com/search/top/?q=VPOTips%20You%20Should%20Know%20For%20Buying%20Used%20CarsWJY
          },
          {
              label:"G search with blog title ACtive",      // google search button name 
              link:"https://www.google.com/search",         // google search link
              type:'externallink',                          // external link
              param:[{key:'blogtitle',q:'q'},{key:'author',q:'oq'}], //passed parameter like https://www.google.com/search?q=VPOTips%20You%20Should%20Know%20For%20Buying%20Used%20CarsWJY&oq=YmattZ
              cond:'status',                                // condition for status
              condval: 0                                    // condition value status=0 , if value=1 and status =0 then the button will dissappear
          },{
              label:"mask blog",                                     //mask blog search button name
              link:"https://mask-blog1.influxiq.com/blog-details",   // mask search link
              type:'externallink',                                   // external link
              paramtype:'angular',                                   // showing front end 
              param:['blogtitle','_id'],                             // passed to parameter with blog title and id
              cond:'status',                                         // condition for status
              condval: 0                                             // condition value status=0 , if value=1 and status =0 then the button will dissappear
          },
          {
              label: "downLoad Pdf",                               // Label Name to download pdf 
              link: "https://s3.us-east-2.amazonaws.com/crmfiles.influxhostserver/html-pdf/report", // link to download pdf
              type: 'externallink',                                // External link
              paramtype: 'angular',                                // paramtype is angular
              param: ['_id'],                                      // passed Parameter
              //cond:'status',
              // condval: 0
          },
          {
              label:" fb profile ",                              // fb profile button 
              link:"https://www.facebook.com/debasiskar007",     // profile link
              type:'externallink'
          },
          {
              label:" fb profile for inactive",                  // fb profile for inactive status
              link:"https://www.facebook.com/debasiskar007",     // profile link
              type:'externallink',
              cond:'status',                                    // condition for status
              condval:0                                         // condition value status=0 , if value=1 and status =0 then the button will dissappear
          },
          {
              label:" fb profile for active",                        // fb profile for active status
              link:"https://www.facebook.com/debasiskar007",         // profile link
              type:'externallink',                                   // external link
              cond:'status',                                         //condition for status
              condval:1                                              //condition value status=1 if value=0 and status =1 then the button will dissappear
          },
          {
              label:"see brand",                // see brand button
              route:"brand",                    // go to brand route
              type:'internallink',              // same application but different page .
              cond:'status',                    // condition for status
              condval:0                         // condition value status=0 , if value=1 and status =0 then the button will dissappear
          },
          {
              label:"see brand with param",     // see brand button with param
              route:"brand",                    // go to brand route
              type:'internallink',             // same application but different page with params .
              cond:'status',                    // condition for status
              condval:0,                       //condition value status=0 , if value=1 and status =0 then the button will dissappear
              param:['_id','blogtitle'],        // passed with params
          },
           {
               label: "delete",
               toggle: "delete",
               type: 'internallink',
            },
            {
              label:"See Brand With Params",     // see brand button with param
              route:"example",                    // go to brand route
              type:'internallink',             // same application but different page with params .
              cond:'status',                    // condition for status
              condval:1,                       //condition value status=0 , if value=1 and status =0 then the button will dissappear
              param:['_id'],    // passed with params
            },
            {
                label: "Desc from data",                 //  label name to See local data
                type: 'action',                          //  Type - action
                datatype: 'local',                       //  Datatype - local (To display local data)
                datafields: ['description', 'author', 'blogtitle', 'tags_array', 'image', 'video_array', 'created_date', 'created_datetime', 'image_array', 'video', 'img_array', 'vd_array'], // data fields
                // cond:'status',
                // condval:0
            },
            {
                label: "Desc from api data",             //  label name to See Endpoint Call data
                type: 'action',                          //  Type - action
                datatype: 'api',                         //  datatype -api (To display data by calling End Point )
                endpoint: 'getblogdatabyid',             //  End Point Name from where Data is collected
                otherparam: ['author', 'blogtitle'],
                //cond:'status',
                //condval:0,
                param: 'blog_id',                        // param name
                refreshdata: true,
            }
      ]
  }

// send basic sort data
  
  sortdata:any={
      "type":'asc',                                             //  default sort data ascend and descend (desc)
      "field":'author',                                         // default field for sorting
      "options":['priority','author','category','blogtitle']     //  sorting fields options for this table
  };


  // this is a database collection or view name

  date_search_source: any='admin_blog_list'; 

  // datacollection
  
  datacollection: any='getadminbloglistdata';        // end point 
  
  //source count
  
  date_search_source_count: any=0;                 // variable declare and initialize for default counting data

  
  // this is use for  All type of search
  
  authval:any= [                                  // this is used for author search
      { val: 'YmattZ', 'name': 'YmattZ A' },          
      { val: 'YmattZ', 'name': 'YmattZ A' },       // these are all deafult value for search we can change it
      { val: 'Ymatt', 'name': 'YmattZ AB' },
      { val: 'Jessica', 'name': 'A Jessica' }
  ];
  
  // this is search details

  search_settings:any={

      datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"created_at"}],      // this is use for  date search                    //created at = field in res which gives date in unix format that changes to ist using moment.js

      selectsearch:[{ label: 'Search By Status', field: 'status', values: this.status }],       // this is use for  select search

      textsearch:[{label:"Search By Title",field:'blogtitle_search'},{label:"Search by auther",field:"author_search"}],                     // this is use for  text search

      search:[{label:"Search By Author",field:'author_search',values:this.authval}]         // this is use for  Autocomplete search
  };

  // this is search block 

<!-- inserted constructor -->

// console.log('custom_link');
      // console.log(this.custom_link);
      this.datasource = '';
      let endpoint='getadminbloglistdata'; // for main data endpoint
      let endpointc='getadminbloglistdata-count'; // for count endpoint
      // data param for conditionlimit and search
      let data:any={
          "condition":{
              "limit":10,
              "skip":0
          },
          sort:{
              "type":'desc',         // defalut field sort type 
              "field":'author'       // default sort field
          }
      }
      this._apiService.postData(endpointc, data).subscribe((res:any) => {
          // console.log('in constructor');
          console.log(res,' for count');
          this.date_search_source_count =res.count;
          //console.warn('blogData c',res);

      }, error => {
          console.log('Oooops!');
      });

      this._apiService.postData(endpoint,data).subscribe((response:any) => {
          // console.log('in constructor');
          console.log(response,' for table data');
          this.tabledata =response.results.res;
          console.warn('blogData',this.tabledata);

      }, error => {
          console.log('Oooops!');
      });

  }

<------------------------------------------ts page end -------------------------------------------->

`// Insert all data` 

`This is the array => tabledata = result `
 


`<lib-listing *ngIf="tabledata!=null && tabledata.length>0"      // chacking the condition`

    [datasource]="tabledata"                                  // Insert all data into datasource
    [skip]="tabledata_header_skip"                            // Skip The Table Header
    [modify_header_array]="modify_header_array"               // Modify The Table Header
    [apiurl]="_apiService.domain"                             // Insert The JWT Token
    [deleteendpoint]="deleteendpoint"                         // Insert The Delete Data Endpoint
    [updateendpoint]="updateendpoint"                         // Insert The Update Data Endpoint
    [jwttoken]="_apiService.jwttoken"                         // Insert The JWT Token
    [date_search_source]="date_search_source"                 // This is a database collection or view name
    [date_search_endpoint]="date_search_endpoint"             // Thi is use for All search endpoint
    [sourcedata]="tablename"                                  // Insert The database collection OR view name
    [statusarr]="statusarray"                                 // Insert The Status Array
    [detail_datatype]="tabledata_detail_datatype"             // Use for Table Detail inside the modal image path and etc
    [editroute]="editroute"                                   // use for edit any field Navigate that page And you should be 
    [detail_skip_array]="tabledata_detail_skip"               // Use for Table Detail Field Skip
    [url]="custom_link"                                       // Use for Download the PDF 
    [search_settings]="search_settings"                       // Insert All Type Of Search Array
    [searchendpoint]="searchendpoint"                         // searchendpoint is use for data search endpoint
    [sortdata]="sortdata"                                     // send basic sort data
    [datacollection]="datacollection"
    [date_search_source_count]="date_search_source_count"
    [libdata]="libdata"                                       // other data
    [limitcond]="limitcond">
    
 `</lib-listing>`
