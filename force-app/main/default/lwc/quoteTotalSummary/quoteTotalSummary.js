/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";

export default class QuoteTotalSummary extends LightningElement {

    //Open Adjust Amount Modal
    handleAdjustAmt() {
        this.dispatchEvent(new CustomEvent("openmodal"));
    }
}
