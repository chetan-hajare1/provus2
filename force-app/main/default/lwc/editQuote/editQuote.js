/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, wire, api } from "lwc";
import GET_QUOTES from "@salesforce/apex/GetQuotes.getQuotesRecords";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import ID_FIELD from "@salesforce/schema/Quote__c.Id";
import START_DATE from "@salesforce/schema/Quote__c.Start_Date__c";
import END_DATE from "@salesforce/schema/Quote__c.EndDate__c";

export default class EditQuote extends LightningElement {
  @api recordId;
  error;
  startDate;
  endDate;

  quoteData = {
    name: "",
    endDate: "",
    startDate: "",
    endDate: ""
  };

  @wire(GET_QUOTES, { quoteId: '$recordId' })
  wiredData({ error, data }) {
    if (data) {
      this.quoteData = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.quoteData = undefined;
    }
  }

  handleChange(event) {
    if (event.target.name == "startDate") {
      this.startDate = event.target.value;
    } else if((event.target.name == "endDate") ) {
      this.endDate = event.target.value;
    }
  }

  handleSave() {

    let fields = {};
    fields[ID_FIELD.fieldApiName] = this.recordId;
    fields[START_DATE.fieldApiName] = this.startDate;
    fields[END_DATE.fieldApiName] = this.endDate;

    let recordInput = { fields };
    updateRecord(recordInput)
      .then(() => {
        const evt = new ShowToastEvent({
          title: "Quote updated",
          message: "Record Successfully Updated",
          variant: "success"
        });
        this.dispatchEvent(evt);
      })
      .catch((error => {
        console.log('Error=>  ', error);
      }))
  }
}