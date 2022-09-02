export class Suggestion {
    public code: string
    public personID: string
    public auctionID: string
    public suggestedPrice: number
    public regDate: string
    public status: SuggestionStatusEnum;
    public table: string


    constructor(
        code: string, 
        personID: string, 
        auctionID: string, 
        suggestedPrice: number, 
        regDate: string,
        status: SuggestionStatusEnum,
        table: string,
        ) {
            this.code = code
            this.personID = personID
            this.auctionID = auctionID
            this.suggestedPrice = suggestedPrice
            this.regDate = regDate
            this.status = status
            this.table = table

    }
    
}


export enum SuggestionStatusEnum {
    Suggested = "Suggested",
    Rejected = "Rejected",
    Accepted = "Accepted",
}