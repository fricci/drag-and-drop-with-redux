import { ChangeDetectorRef, Component } from '@angular/core';
import { newBoxPosition, store, undo } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  x = '0px';
  y = '0px';  

  constructor(private changeDetectorRef: ChangeDetectorRef) {  }

  ngOnInit() {
    store.subscribe(() => {
      console.log(store.getState());
      this.x = `${store.getState().position.x}px`;
      this.y = `${store.getState().position.y}px`;
      this.changeDetectorRef.detectChanges();
    })
  }

  onDrop(event: any) {
    store.dispatch(newBoxPosition({ x: event.clientX, y: event.clientY }));
    console.log(event);
    event.preventDefault();
  }

  undo() {
    store.dispatch(undo());
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }
}
