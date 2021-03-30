import { Component } from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';
import {sanitizeIdentifier} from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)'
        })),
      state('highlighted',
        style({
          'background-color': 'blue',
          transform: 'translateX(100px)'
      })),
      transition('normal => highlighted', animate(300)),
      // transition('normal <=> highlighted', animate(300)), in case you want to use the same timing
      transition('highlighted => normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0) scale(1)'
        })),
      state('highlighted',
        style({
          'background-color': 'blue',
          transform: 'translateX(100px) scale(1)'
        })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)',
        borderRadius: 0
      })),
      transition('normal <=> highlighted', animate(300)),
      transition('shrunken <=> *', [
        style({'background-color': 'orange'}),
        animate(1000, style({borderRadius: '50px'})),
        animate(500)
      ])
    ]),
    trigger('list1', [
      state('in',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
      transition('void => *', [ // from non existing state to any state (adding element in the list)
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),
    trigger('list2', [
      state('in',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
      transition('void => *', [ // from non existing state to any state (adding element in the list)
        animate(1000, keyframes([ // keyframe show transition between style execution
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3 // 30% of animation time
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 0.5,
            offset: 0.8 // 80% of animation time
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1 // 1000 ms
          })
        ]))

      ]),
      transition('* => void', [
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(500, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate () {
    this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
      this.wildState = 'shrunken';
  }
    onAdd(item) {
      this.list.push(item);
    }

  onDelete(item) {
    const index = this.list.indexOf(item);
    if (index > -1) {
      this.list.splice(index, 1);
    }
  }
}
