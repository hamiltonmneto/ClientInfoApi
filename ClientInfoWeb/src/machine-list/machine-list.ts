import {HttpClient} from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';

@autoinject
export class MachineList{

    records: any[];

    constructor( private http: HttpClient ){
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:51928/api/Machines/GetMachines');
        });
    }
    activate() {
        return this.http.fetch("")
            .then(response => response.json())
            .then(records => this.records = records);
    }

}