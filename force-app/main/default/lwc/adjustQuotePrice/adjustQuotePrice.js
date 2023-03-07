import { api } from 'lwc';
import LightningModal from 'lightning/modal';



export default class adjustQuotePrice extends LightningModal {
    @api label
    //Save Handler
    handleSaveClick() {
       this.close(this.refs.adjustedAmountValue.value);  
    }
    //Modal Close Handler
    handleCloseClick() {
        this.close();
    }
}