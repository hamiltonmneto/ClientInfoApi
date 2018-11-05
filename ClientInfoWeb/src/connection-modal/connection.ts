import { MachineViewModel } from "../view-models/machine-view-model";
import { HttpClient, json } from "aurelia-fetch-client";

let httpClient = new HttpClient();

export class Connection{

  machine : MachineViewModel;
  command = '';

  constructor(){

    httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:51928/api/Machines/PostCommandAsync')
    });
}

  activate(model: MachineViewModel) {
    this.machine = model;
  }


  sendCommand(){
    var myPostData = {
      macAdress : this.machine.MacAddress,
      ipAdress : this.machine.Ip,
      command : this.command
    };
    httpClient.fetch('http://localhost:51928/api/Machines/PostCommandAsync?macAdress='+ this.machine.MacAddress +'&ipAdress='+ this.machine.Ip +'&command='+ this.command, {
        method: "POST"
        // body: JSON.stringify(myPostData)
    });
  }

}
