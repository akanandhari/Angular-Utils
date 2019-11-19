import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef, ViewChild, SimpleChanges, ChangeDetectorRef, Injectable } from '@angular/core';

import { Input } from '@angular/core';
import { debounceTime, distinctUntilChanged,switchMap, catchError } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timer } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  @Input() Label: string;
   @Input() searchURL: any = null;
  @Input() DisplayContent: string[] = [];
  @Input() selectedObjIn: any[] = [];
  @Input() DeafultLength: number=3;
  @Input() DefaultMaxLength: number=1000;
  flag:boolean=false;
  errorMessage:any='No record Found,use different criteria';
  @Input() set bdisable( condition : boolean ) {
 condition ? this.queryField.disable() :this.queryField.enable();
   
  }
  queryField: FormControl = new FormControl();
  @Output('SelectedItem') selectedObject = new EventEmitter();
  searchInput: string;
  autoCompleteContent: any[] = [];
  public selectedItem: any = null;


  @ViewChild('searchComponent') textInput;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    })
  }
  constructor(public eRef: ElementRef, public changeDetector: ChangeDetectorRef , public httpClient: HttpClient) {
this.bdisable=false;
    // this.changeDetector.detectChanges();
  }
  ngOnInit() {
    this.queryField.valueChanges.pipe(debounceTime(300),
    switchMap(
      query=>{
      if (query != null && query.length>= this.DeafultLength && query != '') {
    let structure: any = {};
   
    structure.query = query;
   return  this.httpClient.post<any[]>(this.searchURL, structure, this.httpOptions)
  }
  else {
    this.autoCompleteContent = [];
      if ((this.searchInput == null || this.searchInput.split('').length == 0))//&& this.selectedItem==null
      {
        this.selectedObject.emit({});
      }
      return [];
    }
}
),
).subscribe((result) => {
  if(result!=null && !result.error){
  this.autoCompleteContent = result;
  }
  else
  {
    this.autoCompleteContent=[];
    this.flag=true;
    if( result!=null&&result.error)
    {
      this.errorMessage='Too many results found,Refine your search';
    }
    else
    {
      this.errorMessage='No record Found,use different search';
    }
    const oTimer=timer(4000);
    oTimer.subscribe((t)=>{
      this.flag=false;
    })
  
  }
  },  (err)=>
  {
    console.log(err);
    this.autoCompleteContent=[];
    this.flag=true;
    const oTimer=timer(4000);
    oTimer.subscribe((t)=>{
      this.flag=false;
    })
  });
  this.changeDetector.detectChanges();
  }
  clear() {
    this.autoCompleteContent = [];
    let cle = {};  
    this.selectedObject.emit(cle);
    this.selectedItem = {};
    this.searchInput = null;
    this.textInput.nativeElement.value = null;
  }





  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedObjIn != undefined) {
      if (changes.selectedObjIn.currentValue ) {//&& !changes.selectedObjIn.isFirstChange()
        if (changes.selectedObjIn.currentValue == undefined || changes.selectedObjIn.currentValue == null
          ||
          changes.selectedObjIn.currentValue[this.DisplayContent[0]] == null
         // ){
          
           || changes.selectedObjIn.currentValue[this.DisplayContent[0]].split('').length == 0) { // Need to check this condition
      // this.queryField.setValue('',{emitEvent:false});
        }
        else {
          let searchInput = '';
          this.DisplayContent.forEach(element => {
            if (searchInput != "") {
              searchInput += " ";
            }
            searchInput += changes.selectedObjIn.currentValue[element];
          });
          this.queryField.patchValue(searchInput,{emitEvent:false});
        }
      }
    }
  }
  @HostListener('document:click', ['$event'])
  onOusideClick(ev) {
    if (!this.eRef.nativeElement.contains(ev.target)) {
      this.autoCompleteContent = [];
    }

  }
  SelectItem(item: any) {
    this.autoCompleteContent = [];
    this.selectedObject.emit(item);
    let searchInput = '';
    this.selectedItem = item;
    this.DisplayContent.forEach(element => {
      searchInput += item[element] +" ";
    });
    this.queryField.setValue(searchInput,{emitEvent:false});
    this.textInput.nativeElement.blur();
    this.autoCompleteContent = [];
    if (document.activeElement != this.textInput.nativeElement)
      this.textInput.nativeElement.blur();
  }
}

