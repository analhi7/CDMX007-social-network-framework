import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Publication} from '../models/publication';
import { UserService } from '../services/user.service';
import { PublicationService } from '../services/publications.service';

import { GLOBAL } from '../services/global';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers : [UserService, PublicationService]
})


export class PublicationsComponent implements OnInit {

  public identity;
  public token;
  public title:string;
  public url: string;
  public status: string;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public publications : Publication[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService : UserService,
    private _publicationService : PublicationService

  ) {
    this.title = "Publicaciones"
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
  
   }

  ngOnInit() {
    console.log("Publications se ha cargado")
    this.getPublications(this.page);
  }

  getPublications(page, adding = false){
    this._publicationService.getPublications(this.token, page).subscribe(
      response =>{
       
        if(response.publications){
          this.total= response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;

         if(!adding){
           this.publications = response.publications;
          

         }else{
           var arrayA = this.publications;
           var arrayB = response.publications;
          
           this.publications = arrayA.concat(arrayB);
         }

          if(page > this.pages){
            // this._router.navigate(['/home']);
          }

        }else{
          this.status =  "error";
        }

      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage !=null){
          this.status = "error";
      }
    
    
  }
  

    );
  }

  public noMore = false;

  viewMore(){
    this.page += 1;
    if(this.page == this.pages){
      this.noMore = true;
    }
      
    this.getPublications(this.page, true);
  
    }

  refresh(event){
    this.getPublications(1);
  }
    
}
