import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient,HttpEventType,HttpHeaders } from '@angular/common/http';
import { observable } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource_status: any;
  displayedColumns_status = [];
  dataSource_size: any;
  displayedColumns_size = [];
  dataSource_delta: any;
  displayedColumns_delta = [];
  selectedFile:File =null;
  p: number = 1;
  onFileSelected(event){
    this.selectedFile=<File>event.target.files[0];
    console.log(event);
  }
  // @ViewChild('paginator_status', {read: MatPaginator}) paginator:MatPaginator;
  // @ViewChild('paginator_size', {read: MatPaginator}) paginator_size:MatPaginator;
  // @ViewChild('paginator_delta', {read: MatPaginator}) paginator_delta:MatPaginator;

  onUpload(){
    const fd= new FormData();
    fd.append('file',this.selectedFile,this.selectedFile.name)
    this.http.post('http://52.66.87.43:8080/upload',fd,{responseType:'text'}
    // ,{
    //   reportProgress:true,
    //   observe: 'events'
    // }
    )
    .subscribe(event => {
      // if(event.type===HttpEventType.UploadProgress){
      //   console.log('Upload Progress: ' +Math.round(event.loaded*100/event.total)+'%')
      // }
      // else if (event.type===HttpEventType.Response){
      //   console.log(event);
      // }
      if (event=='file uploaded'){
        alert(event)
      }
    });
  }
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.get_status({"cmd_id":"get_status_data"});
    this.get_size({"cmd_id":"get_size_data"});
    this.get_complete_delta({"cmd_id":"get_cd_data"});
  }
//   pageEvent(event){
// console.log(event);
//   }

  get_status(rData){
      this.getData(rData).subscribe((data:any) => {
       this.dataSource_status=new MatTableDataSource(data.data);
      //  this.dataSource_status.paginator=this.paginator;
        console.log("Success",this.dataSource_status);
       this.displayedColumns_status  = data.headers.map(function(elm){return elm.name});
  
    },
    error => { 
      console.log('Error')
    });
  
  }

  get_size(rData){
    this.getData(rData).subscribe((data:any) => {
     this.dataSource_size=new MatTableDataSource(data.data);
    //  this.dataSource_size.paginator=this.paginator_size;
    //  this.paginator.pageIndex = 0;
      console.log("Success",this.dataSource_size);
     this.displayedColumns_size  = data.headers.map(function(elm){return elm.name});

  },
  error => { 
    console.log('Error')
  });

}
get_complete_delta(rData){
  this.getData(rData).subscribe((data:any) => {
   this.dataSource_delta=new MatTableDataSource(data.data);
  //  this.dataSource_delta.paginator=this.paginator_delta;
  //  this.paginator.pageIndex = 0;
    console.log("Success",this.dataSource_delta);
   this.displayedColumns_delta  = data.headers.map(function(elm){return elm.name});

},
error => { 
  console.log('Error')
});

}

  getData(rData){
    return this.http.post('http://52.66.87.43:8080/dev-api/CPA', JSON.stringify(rData), {headers : new HttpHeaders({   'Content-Type': 'application/json','Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Origin': '*'})});
}
}
