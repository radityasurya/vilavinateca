import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Events } from "ionic-angular";

@Injectable()
export class IdleProvider {

  public status = 'inactive';
  public activePage;

  constructor(private idle: Idle, public events: Events) {
    // sets an idle timeout of 3 minutes
    this.idle.setIdle(1800);

    // sets a timeout period of 3 minutes. after inactivity, the user will be considered timed out.
    this.idle.setTimeout(1800);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onTimeout.subscribe(() => {
        this.status = 'idle';
        this.events.publish("status:idle");
      }
    );

  }

  start() {
    this.idle.watch();
    this.status = "active";
  }

  reset() {
    this.status = 'active';
    this.events.publish("status:active");
    this.idle.watch();
  }


}
