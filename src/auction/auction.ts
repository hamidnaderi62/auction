export class Auction {
    public code: string
    public title: string
    public desc: string
    public features: string
    public basePrice: number
    public image1: string
    public image2: string
    public image3: string
    public availableDays: number
    public regDate: string
    public personID: string
    public status: AuctionStatusEnum
    public table: string



    constructor(
        code: string, 
        title: string, 
        desc: string, 
        features: string, 
        basePrice: number, 
        image1: string,
        image2: string,
        image3: string,
        availableDays: number,
        regDate: string,
        personID: string,
        status: AuctionStatusEnum,
        table : string
        ) {
            this.code = code
            this.title = title
            this.desc = desc
            this.features = features
            this.basePrice = basePrice
            this.image1 = image1
            this.image2 = image2
            this.image3 = image3
            this.availableDays = availableDays
            this.regDate = regDate
            this.personID = personID
            this.status = status
            this.table = table

    }
    
}


export enum AuctionStatusEnum {
    Available,
    Expired,
    Accepted,
}