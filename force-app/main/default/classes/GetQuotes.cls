public class GetQuotes {
    
    @AuraEnabled(cacheable=true)
    public static QuoteDto getQuotesRecords(String quoteId){
        QuoteDto quoteObj;
        try{
            Quote__c quote = [SELECT Id, Name, Start_Date__c, EndDate__c
                              FROM Quote__c
                              WHERE Id =: quoteId
                              WITH SECURITY_ENFORCED];
                quoteObj = new QuoteDto(quote);
    }
    catch(Exception ex){
        throw new AuraHandledException(ex.getMessage());
    }
    return quoteObj;
}
}