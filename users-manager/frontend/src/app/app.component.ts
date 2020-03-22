import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public post: {  
    title: string,  
    content: string,  
    loveIts: number,  
    created_at: Date
  } 
  @Input() postList: any[] = [{
    post1: {
      title: 'Mon premier post',  
      content: 'zsdjvjsjjdvdjsjvds vsvsdvs dvsjdvjzv dvshdfvhjosdfsd vsdfsvjkdfbshdfb sbskjdfbsdhfbhlsdb sdfbisdfbs dfbsdbsskfs sfjbsd',  
      loveIts: 4,  
      created_at: new Date(),
    },
    post2: {
      title: 'Mon deuxième post',  
      content: 'zsdjvjsjjdvdjsjvds vsvsdvs dvsjdvjzv dvshdfvhjosdfsd vsdfsvjkdfbshdfb sbskjdfbsdhfbhlsdb sdfbisdfbs dfbsdbsskfs sfjbsd',  
      loveIts: 5,  
      created_at: new Date(),
    },
    post3: {
      title: 'Mon troisième post',  
      content: 'zsdjvjsjjdvdjsjvds vsvsdvs dvsjdvjzv dvshdfvhjosdfsd vsdfsvjkdfbshdfb sbskjdfbsdhfbhlsdb sdfbisdfbs dfbsdbsskfs sfjbsd',  
      loveIts: 7,  
      created_at: new Date(),
    },
    post4: {
      title: 'Mon dernier post',  
      content: 'zsdjvjsjjdvdjsjvds vsvsdvs dvsjdvjzv dvshdfvhjosdfsd vsdfsvjkdfbshdfb sbskjdfbsdhfbhlsdb sdfbisdfbs dfbsdbsskfs sfjbsd',    
      loveIts: 2,  
      created_at: new Date(),
    },
  }];
 
  public constructor() {
    
  }
}
