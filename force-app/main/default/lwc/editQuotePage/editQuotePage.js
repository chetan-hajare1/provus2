/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";
import POPUP_MODAL from 'c/adjustQuotePrice';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import ID_FIELD from "@salesforce/schema/Quote__c.Id";
import QUOTED_AMT from "@salesforce/schema/Quote__c.TotalQuotedAmount__c";
import TOAST_MESSAGE from '@salesforce/label/c.Toast_Message';
import MODAL_LABEL from '@salesforce/label/c.Toast_Message';

export default class EditQuotePage extends LightningElement {
  @api recordId;

  label = {
    TOAST_MESSAGE,
    MODAL_LABEL,
  };

  //Open Adjust Amount Modal
  async handleOpenModal() {
    const result = await POPUP_MODAL.open({
      label: this.label.MODAL_LABEL,
      size: 'small',
      description: 'Quote modal to adjust the price',
      content: 1000
    });

    //Update Adjusted Amount 
    if (result) {
      let fields = {};
      fields[ID_FIELD.fieldApiName] = this.recordId;
      fields[QUOTED_AMT.fieldApiName] = result;

      let recordInput = { fields };
      updateRecord(recordInput)
        .then(() => {
          const evt = new ShowToastEvent({
            title: "Success!",
            message: this.label.TOAST_MESSAGE,
            variant: "success"
          });
          this.dispatchEvent(evt);
        })
        .catch((error => {
          console.log('Error=>  ', error);
        }))
    }
  }
}


