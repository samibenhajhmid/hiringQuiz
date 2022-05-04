import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../shared/services/quiz.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {AssessmentService} from "../../shared/services/assessment.service";



@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  data:any;
  passed = '';

  constructor(private quizService : QuizService, private assessmentService:AssessmentService, private router: Router) { }

  ngOnInit(): void {
   this.getQuizzesByAssessmentCode();

  }
  getQuizzesByAssessmentCode(){
    return this.quizService.getQuizzesByAssessmentCode(history.state.assessmentCode).subscribe({
      next: (res)=>{
       this.data = res;
        for (let item of this.data){
          if(this.quizService.passedList.includes(item['id'])){
            item['isEnabled']= false;
            item['isPassed']='  Passed'
          }
          else {
            item['isEnabled']= true;
            item['isPassed']='';
          }
          console.log(item)
        }

      },
      error :()=>{
        console.log("Error while getting Quizzes")
      }
    })

}

  startQuiz(id){
    Swal.fire({
      title: '<h1 class="text-danger" >Important Instructions</h1>',
      width: 800,
      html:
        '              <li>• No negative marks for wrong question</li>\n'+
        '              <li>• Click <b>Start quiz</b> button in order to start the quiz</li>\n' +
        '              <li>• The time will start counting at the moment you click on start quiz button.</li>\n' +
        '              <li>• You can\'t resume the quiz, if interrupted due to any reason</li>\n' +
        '              <li>• Click to next button in order to proceed next question.</li>\n' +
        '              <li>• <b>Click on submit button after completion of the quiz.</b></li>\n',
      showCancelButton: true,
      confirmButtonText: `Start`,

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.quizService.passedList.push(id)
        this.router.navigate(['/start-quiz', id],{ state: { quizId: id, relatedQuiz:this.data[id-1].title , passedData:history.state,
          relatedAssessment:this.data[0].relatedAssessment} });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }



}
