import { Injectable } from '@angular/core';
import { switchMap, map, takeWhile } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class ApiService {
  constructor(private _http: HttpClient,
              private _authHttp: HttpClient,

              ) {
    //console.log('this.domain');
    //console.log(this.domain);
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
