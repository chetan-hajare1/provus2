/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from "lightning/uiRecordApi";
import ID_FIELD from "@salesforce/schema/Quote__c.Id";
import ADJUSTED_AMOUNT from "@salesforce/schema/Quote__c.TotalQuotedAmount__c";

export default class QuoteTotalSummary extends LightningElement {

    @api recordId;
    showQuoteModal = false;
    adjustedAmount;

    handleChange(event) {
        if (event.target.name == "adjustedAmount")
            this.adjustedAmount = event.target.value;
    }

    handleSave() {
        let fields = {};

        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[ADJUSTED_AMOUNT.fieldApiName] = this.adjustedAmount;

        let recordInput = { fields };
        console.log(recordInput);
        updateRecord(recordInput)
            .then(() => {
                console.log('inside then');
                this.showQuoteModal = false;
                const evt = new ShowToastEvent({
                    title: "Adjusted Value updated",
                    message: "Record Successfully Updated",
                    variant: "success"
                });
                this.dispatchEvent(evt);
            })
            .catch((error) => {
                console.log("Error=> ", error);
            })
    }

    modalHandler() {
        this.showQuoteModal = true;
    }

    closeModal() {
        this.showQuoteModal = false;
    }
}
