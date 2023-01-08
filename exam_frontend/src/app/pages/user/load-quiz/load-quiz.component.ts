import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements  OnInit{
  catId: any;
  quizzes:any;
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService
  ){}
  ngOnInit(): void {
   this._route.params.subscribe((params)=>{
    this.catId = params['catId'];
    // console.log(params);
    if(this.catId==0)
   {
    this._quiz.getActiveQuizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        // console.log(this.quizzes);
      },
    (error)=>{
      console.log(error);
      alert("error in loading all quizzes");
    }
    );
   }
   else{
    // console.log("According to the conditional id");
    this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
(data:any)=>{
  this.quizzes=data;
},
(error)=>{
  alert("error in loading quiz");
}

    )
   }
   });
   
  }

}
