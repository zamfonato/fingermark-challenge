import { State } from "../@types";

class OpenState implements State {
  private context: Kiosk;
  constructor(context: Kiosk) {
    this.context = context;
  }
  openKiosk() {
    console.log("Kiosk is already open");
  }

  closeKiosk() {
    console.log("Closing Kiosk");
    this.context.setState(this.context.closedState);
  }
}

class ClosedState implements State {
  private context: Kiosk;
  constructor(context: Kiosk) {
    this.context = context;
  }
  openKiosk() {
    console.log("Opening Kiosk");
    this.context.setState(this.context.openState);
  }

  closeKiosk() {
    console.log("Kiosk is already closed");
  }
}

class Kiosk {
    private state: State;
    public openState: State;
    public closedState: State;
  
    constructor() {
      this.openState = new OpenState(this);
      this.closedState = new ClosedState(this);
      this.state = this.closedState;
    }
  
    public setState(state: State) {
      this.state = state;
    }
  
    public openKiosk() {
      this.state.openKiosk();
    }
  
    public closeKiosk() {
      this.state.closeKiosk();
    }
  }
  