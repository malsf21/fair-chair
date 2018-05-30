/* eslint-disable no-unused-vars, no-undef */

import { Component } from '@angular/core'

@Component({
  selector: 'page-guide',
  template: `
    <h1>Fair Chair Guide</h1>
    <p>
      This page is your guide to using Fair Chair - it details every nook and cranny of the app. Click on each category to expand its information. If you have a question or concern that is not covered here, <a (click)="openLink('https://github.com/malsf21/fair-chair/issues')" href="#">submit an issue on our GitHub repository</a>.
    </p>
    <div *ngFor="let guide of guideObject; let i = index" class="card border-primary mt-1">
      <a data-toggle="collapse" href="#collapse-{{i}}">
        <div class="card-header" role="tab">
          <h5 class="mb-0">
            {{ guide.title }}
          </h5>
        </div>
      </a>
      <div id="collapse-{{i}}" class="collapse" role="tabpanel">
        <div class="card-body">
          <p *ngFor="let content of guide.content">
            {{ content }}
          </p>
        </div>
      </div>
    </div>
  `
  })

export class GuidePageComponent {
  guideObject: any;
  constructor () {
    this.guideObject = [
      {
        title: 'The Basics',
        content: [
          'The key feature of Fair Chair is the list view, on the Lists page. The list view allows the user to display the current list. Each list contains three characteristics: the title of the list (which is prominently displayed), the timer (which counts down from a maximum limit), and the delegate list (a user-entered list of possible delegates). In addition, the user has the ability to create lists and switch between different lists.',
          'The values of the list view (the title, the timer, and the delegate list) are all editable and manipulatable through user input. In addition, they are automatically saved within the application.'
        ]
      },
      {
        title: 'List View - Title',
        content: [
          'The title is prominently displayed in the list view, which makes it ideal for displaying the current discussion topic. It can be edited with the "Edit" button in the top left.'
        ]
      },
      {
        title: 'List View - Timer',
        content: [
          'The timer for the list view is very useful for timing delegate speeches, but is also useful for timing unmods or timed caucases. The user can start and pause the timer at will with the "Start"/"Pause" button, and use the reset button to set the timer back to its max value. The max value of the timer can be edited with the "Edit" button in the top left.'
        ]
      },
      {
        title: 'List View - Delegate List',
        content: [
          'The user can quickly add a delegate to the delegate list by inputting the desired name into the delegate input. In addition, each delegate has two actions: a toggle strikethrough button, which is good for crossing a delegate out, and a delete button, which removes them from the list.'
        ]
      },
      {
        title: 'Managing Lists',
        content: [
          'One of the most powerful features of Fair Chair is list management. Each individual list has its own data (title, timer, delegate list), and automatically saves its progress every time an action is taken. In addition, the user can create a new list using the "Add" button, which saves the current list and allows the user to make a new list, with its own data.',
          'In addition, the user can switch in between lists, using the "Browse" button and clicking the switch action beside each list. Switching between lists automatically saves all of the data of the current list, and switches all the data in the list view to the new list. When a user wants to remove a list, they simply click the delete action beside each list.',
          "Lists are maintained inside the app's LocalStorage, which means that they save across sessions - the user can close the app, and re-open it to have all of their progress saved. The user can clear all of their LocalStorage data by clicking on \"Clear All Data\" in the Settings page."
        ]
      },
      {
        title: 'Importing/Exporting Savefiles',
        content: [
          "As discussed previously, all of the app's data is stored internally in its LocalStorage. However, there may be times where a user wants to transfer all of their data or keep a saved copy of it, and Fair Chair's import and export list functions allow the user to do so.",
          "The import and export list options are found in the Settings page. The \"Export List\" button gathers all of the application's data and saves it as a JSON file, which the user can save anywhere in their filesystem. The \"Import List\" button loads a JSON savefile saved somewhere on the user's computer, and then loads all of that data into the application."
        ]
      }
    ]
  }
  openLink () {
    // this.electronService.shell.openExternal(link)
  }
}
