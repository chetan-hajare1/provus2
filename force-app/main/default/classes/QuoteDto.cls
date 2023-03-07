public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled
  public Date endDate;
  @AuraEnabled
  public Date startDate;
  @AuraEnabled
  public String name;

  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.endDate = quote.EndDate__c;
    this.startDate = quote.Start_Date__c;
    this.name = quote.Name;
  }

  public override SObject refreshSo() {
    return null;
  }
}
