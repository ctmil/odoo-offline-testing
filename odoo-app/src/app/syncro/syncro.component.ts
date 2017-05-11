import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'ng2-config';

var PouchDB = require('pouchdb');

@Component({
  selector: 'app-syncro',
  templateUrl: './syncro.component.html',
  styleUrls: ['./syncro.component.css']
})
export class SyncroComponent implements OnInit {

	pdb: any = {};
	list_db: any = [];
	db: any;
	db_info: any;

	constructor(private config: ConfigService) {
		}

	ngOnInit() {
		this.pdb = this.config.getSettings("databases");
		for (var dbindex in this.pdb) {
			this.list_db.push(this.pdb[dbindex]);
			if (this.pdb[dbindex].adapter == 'websql') {
				this.db = new PouchDB(this.pdb[dbindex].dbname, { "adapter": "websql" });
				}
			else {
				this.db = new PouchDB(this.pdb[dbindex].dbname) }
			var new_db = new PouchDB(this.pdb[dbindex].dbsync);
			new_db.info().then(function (remote_info) {
				console.log('Remote info ',remote_info);
				for (var i = 0; i < this.list_db.length; i++) {
					console.log('index');
					console.log(this.list_db[i]);
					//if (this.list_db[i].dbname == dbindex) {
					//	this.list_db[i].dbname['remote_count'] = remote_info.doc_count;
					//	};
					}
				});	
			}
		console.log('this.pdb');
		console.log(this.list_db);
 		}

}
