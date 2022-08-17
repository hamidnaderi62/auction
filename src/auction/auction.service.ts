import { Context } from "fabric-contract-api";
import { Auction, AuctionStatusEnum } from "./auction";

export class AuctionService {
    private ctx: Context;
    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    public async exists(auctionId: string) {
        const data: Uint8Array = await this.ctx.stub.getState(auctionId);
        return (!!data && data.length > 0);
    }

    public async get(auctionId: string) {
        const auctionBuffer = await this.ctx.stub.getState(auctionId);
        const auction = JSON.parse(auctionBuffer.toString());
        return auction;
    }

    public async getAuctionsByStatus(auctionStatus : AuctionStatusEnum) {
        const query ={
            selector: {
                table: 'AUC',
                status: auctionStatus
            }
         }
        const queryString = JSON.stringify(query)
        const result = await this.ctx.stub.getQueryResult(queryString)

        const auctions = [];
        let finished = false;
        do{
            const res = await result.next()
            if(!res.done){
                const bag = JSON.parse(res.value.value.toString())
                auctions.push(bag)
                console.log(bag)
            }
            else{
                finished = true
            }
        }while(!finished)
        return auctions
    }


    public async getAuctionsByPerson(personId : string) {
        const query ={
            selector: {
                table : 'AUC',
                personID: personId
            }
         }
        const queryString = JSON.stringify(query)
        const result = await this.ctx.stub.getQueryResult(queryString)

        const auctions = [];
        let finished = false;
        do{
            const res = await result.next()
            if(!res.done){
                const bag = JSON.parse(res.value.value.toString())
                auctions.push(bag)
                console.log(bag)
            }
            else{
                finished = true
            }
        }while(!finished)
        return auctions
    }


    public async create(
        auctionId: string,
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
        status: AuctionStatusEnum
    ) {
        if (await this.exists(auctionId)) {
            throw new Error(`Auction ${auctionId} already exists`);
        }

        const auction = new Auction(
            code,
            title,
            desc,
            features,
            basePrice,
            image1,
            image2,
            image3,
            availableDays,
            regDate,
            personID,
            status,
            'AUC'
        );

        const auctionBuffer = Buffer.from(JSON.stringify(auction));

        await this.ctx.stub.putState(auctionId, auctionBuffer);
    }

  
    public async updateStatus(auctionId: string, newStatus: AuctionStatusEnum) {
        let auction = await this.get(auctionId)
        auction.status = newStatus

        const auctionBuffer = Buffer.from(JSON.stringify(auction))

        await this.ctx.stub.putState(auctionId, auctionBuffer)
    }



    public async delete(auctionId :string) {
        await this.ctx.stub.deleteState(auctionId)
    }
}
