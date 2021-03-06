import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

interface MentorData{
  Name:string,
  Section:string,
  University:string,
  GraduateYear:number,
  Work:string,
  Mail:string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mentorList=[];
  mentorData:MentorData;
  mentorForm:FormGroup;

  constructor(private service:FirebaseService,
    public formBuilder: FormBuilder


    ) {
    this.mentorData = {} as MentorData;
  }

ngOnInit(){


  this.service.get_mentors().subscribe(data => {

    this.mentorList = data.map(e => {
      return {
        id: e.payload.doc.id,
        Name: e.payload.doc.data()['Name'],
        Section: e.payload.doc.data()['Section'],
        University: e.payload.doc.data()['University'],
        GraduateYear : e.payload.doc.data()['GraduateYear'],
        Work : e.payload.doc.data()['Work'],
        Mail : e.payload.doc.data()['Mail'],
      };
    })

    console.log(this.mentorList);

  });

  this.mentorForm = this.formBuilder.group({
    Name: ['', [Validators.required]],
    Section: ['', [Validators.required]],
    University: ['', [Validators.required]],
    GraduateYear: ['', [Validators.required]],
    Work: ['',],
    Mail: ['',[Validators.required]]
  })
}

CreateRecord() {
  console.log(this.mentorForm.value);
  this.service.create_mentor(this.mentorForm.value).then(resp => {
    this.mentorForm.reset();
  })
    .catch(error => {
      console.log(error);
    });
}

openPage(){
  window.open("https://giris.turkiye.gov.tr/Giris/", '_system', 'location=yes');
}


}




