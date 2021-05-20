import {Component, OnInit} from '@angular/core';
import {RxjsRecursionTesterService} from "./rxjs-test/rxjs-recursion-tester";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rxjs-recursion-test';

  constructor(
      private testerService: RxjsRecursionTesterService,
  ) {
  }
  ngOnInit(): void {
    this.testerService.recursionTester().subscribe(result => {
      console.log(`RESULT: ${JSON.stringify(result)}`)
    });
  }
}
