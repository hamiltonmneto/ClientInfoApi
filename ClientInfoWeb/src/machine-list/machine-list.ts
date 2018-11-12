import {HttpClient} from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { MachineViewModel } from "../view-models/machine-view-model"
import {DialogService} from 'aurelia-dialog';
import { Connection } from '../connection-modal/connection';
// import "signalr";
import * as $ from "jquery";
// import { hubConnection } from "signalr-no-jquery";
// import * as $ from "aspsignalr";

@autoinject
export class MachineList{

    gridOptions;
    columnDefinitions;
    dataset : any[];
    machine : MachineViewModel;
    dialogService : DialogService;
    selectedTitle : '';
  
    selected : any[];
    records: any[];

    constructor( private http: HttpClient, dialogService : DialogService ){
        this.dialogService = dialogService;
        this.defineGrid();
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:51928/api/Machines/GetMachines');
        });
    }
    activate() {
        return this.http.fetch("")
        .then(response => response.json())
        .then(records => this.records = records)
        .then(r => {
            this.getData();
        });
    }

        /* Define grid Options and Columns */
    defineGrid() {
        this.columnDefinitions = [
        { id: '_IP', name: 'IP', field: '_IP', sortable: true, minWidth: 100 },
        { id: '_Name', name: 'Computer Name', field: '_Name', sortable: true, minWidth: 100 },
        { id: '_LogguedUser', name: 'Last User Logged', field: '_LogguedUser', sortable: true, minWidth: 100 },
        { id: '_OsVersion', name: 'Windows Version', field: '_OsVersion', minWidth: 100 },
        { id: '_MacAddress', name: 'Mac Adress', field: '_MacAddress', minWidth: 100 }
        ];
        this.gridOptions = {
            enableAutoResize: false,
            enableCellNavigation: true,
            enableCheckboxSelector: true,
            checkboxSelector: {
              // remove the unnecessary "Select All" checkbox in header when in single selection mode
              hideSelectAllCheckbox: true
            },
            rowSelectionOptions: {
              // True (Single Selection), False (Multiple Selections)
              selectActiveRow: true,
            },
            enableRowSelection: true
          };
    }

    onGrid1SelectedRowsChanged(e, args) {
      var machine = new MachineViewModel();
        const grid = args && args.grid;
        if (Array.isArray(args.rows)) {
          this.selectedTitle = args.rows.map(idx => {
            const item = grid.getDataItem(idx);
            machine.Ip = item._IP;
            machine.MacAddress = item._MacAddress;
            machine.Name = item._Name;
            // const connection = hubConnection();
            // const t = $.hubConnection("http://" + item._IP + ":6969/"+ item._MacAddress);
            // var commandProxy = t.createHubProxy('CommandHub');
            // t.start().done(function() {
            //   // Wire up Send button to call NewContosoChatMessage on the server.
            //   commandProxy.invoke("CommandExec", "dir");
            //   });
            // commandProxy.invoke("CommandExec", "dir");
            // machine.Connection  = $.hubConnection("http://" + item._IP + ":6969/"+ item._MacAddress);
            this.machine = machine;
            return item._MacAddress || '';
          });
        }
      }

    getData() {

        this.dataset = [];
        for (let i = 0; i < this.records.length; i++) {

        this.dataset[i] = {
            id: i,
            _IP: this.records[i]._IP,
            _Name: this.records[i]._Name,
            _LogguedUser: this.records[i]._LogguedUser,
            _OsVersion: this.records[i]._OsVersion,
            _MacAddress: this.records[i]._MacAddress
            };
        }
    }

    connectMachine(){
      this.dialogService.open({ viewModel: Connection, model: this.machine, lock: false }).whenClosed(response => {
        if (!response.wasCancelled) {
          console.log('good');
        } else {
          console.log('bad');
        }
        console.log(response.output);
      });
    }
}
