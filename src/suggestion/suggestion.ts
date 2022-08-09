export class Suggestion {
    public personID: string
    public auctionID: string
    public suggestedPrice: number
    public regDate: string
    public status: SuggestionStatusEnum;
    public table: string


    constructor(
        personID: string, 
        auctionID: string, 
        suggestedPrice: number, 
        regDate: string,
        status: SuggestionStatusEnum,
        table: string,
        ) {
            this.personID = personID
            this.auctionID = auctionID
            this.suggestedPrice = suggestedPrice
            this.regDate = regDate
            this.status = status
            this.table = table

    }
    
}


export enum SuggestionStatusEnum {
    Suggested,
    Rejected,
    Accepted,
}