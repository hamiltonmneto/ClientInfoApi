import { MachineViewModel } from "../view-models/machine-view-model";
import { HttpClient, json } from "aurelia-fetch-client";
// import * as signalR from "@aspnet/signalr";
import "signalr";
import * as $ from "jquery";

let httpClient = new HttpClient();

export class Connection{

  connect : any;
  machine : MachineViewModel;
  command : string;
  result : string;

  constructor(){

    httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:51928/api/Machines/PostCommandAsync')
    });
}

  activate(model: MachineViewModel) {
    this.machine = model;
    // this.machine.Connection.start().catch(err => console.log(err));
    this.connect = this.machine.Connection;
  }


  sendCommand(){
    var t = this.command;
    var myPostData = {
      macAdress : this.machine.MacAddress,
      ipAdress : this.machine.Ip,
      command : this.command
    };
    httpClient.fetch('http://localhost:51928/api/Machines/PostCommandAsync?macAdress='+ this.machine.MacAddress +'&ipAdress='+ this.machine.Ip +'&command='+ this.command, {
        method: "POST"
        // body: JSON.stringify(myPostData)
    })
    .then(r => r.json())
    .then(result => this.result = result);

    // var commandProxy = this.connect.createHubProxy('CommandHub');
    // this.connect.start().done(function() {
    //     // Wire up Send button to call NewContosoChatMessage on the server.
    //       commandProxy.invoke("CommandExec", t);
    //     });
    

  }

}
