import { ChangeDetectorRef, Component } from '@angular/core';
import { newBoxPosition, store, undo } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  x = '100px';
  y = '100px';  

  elevated = false;

  private shiftX: number = 0;
  private shiftY: number = 0;

  constructor(private changeDetectorRef: ChangeDetectorRef) {  }

  ngOnInit() {
    store.subscribe(() => {
      this.x = `${store.getState().position.x}px`;
      this.y = `${store.getState().position.y}px`;
      this.changeDetectorRef.detectChanges();
    })
  }

  onDrop(event: any) {
    store.dispatch(newBoxPosition({ x: event.clientX - this.shiftX, y: event.clientY - this.shiftY }));
    event.preventDefault();
  }

  undo() {
    store.dispatch(undo());
  }

  onDragEnd(event: any) {
    event.target.classList.toggle("on-drag");
    this.elevated = false;
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDragStart(event: any) {
    event.target.classList.toggle("on-drag");
    this. shiftX = event.clientX - event.target.getBoundingClientRect().left;
    this. shiftY = event.clientY - event.target.getBoundingClientRect().top;
    this.elevated = true;
  }
}
