import { Context } from "fabric-contract-api";
import { Suggestion, SuggestionStatusEnum } from "./suggestion";

export class SuggestionService {
    private ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    public async exists(suggestionId: string) {
        const data: Uint8Array = await this.ctx.stub.getState(suggestionId);
        return (!!data && data.length > 0);
    }

    public async get(suggestionId: string) {
        const suggestionBuffer = await this.ctx.stub.getState(suggestionId);
        const suggestion = JSON.parse(suggestionBuffer.toString());
        return suggestion;
    }


    public async getSuggestionsByPerson(personId : string) {
        const query ={
            selector: {
                table: 'SUG',
                personID: personId
            }
         }
        const queryString = JSON.stringify(query)
        const result = await this.ctx.stub.getQueryResult(queryString)

        const suggestions = [];
        let finished = false;
        do{
            const res = await result.next()
            if(!res.done){
                const bag = JSON.parse(res.value.value.toString())
                suggestions.push(bag)
                console.log(bag)
            }
            else{
                finished = true
            }
        }while(!finished)
        return suggestions
    }

    public async getSuggestionsByAuction(auctionId : string) {
        const query ={
            selector: {
                table: 'SUG',
                auctionID: auctionId
            }
         }
        const queryString = JSON.stringify(query)
        const result = await this.ctx.stub.getQueryResult(queryString)

        const suggestions = [];
        let finished = false;
        do{
            const res = await result.next()
            if(!res.done){
                const bag = JSON.parse(res.value.value.toString())
                suggestions.push(bag)
                console.log(bag)
            }
            else{
                finished = true
            }
        }while(!finished)
        return suggestions
    }


    public async getSortedSuggestionOfAuction(auctionId : string) {
        const query ={
            selector: {
                table: 'SUG',
                auctionID: auctionId
            },
            sort: [{"suggestedPrice" : "desc"}]

         }
        const queryString = JSON.stringify(query)
        const result = await this.ctx.stub.getQueryResult(queryString)

        const suggestions = [];
        let finished = false;
        do{
            const res = await result.next()
            if(!res.done){
                const bag = JSON.parse(res.value.value.toString())
                suggestions.push(bag)
                console.log(bag)
            }
            else{
                finished = true
            }
        }while(!finished)
        return suggestions
    }

    public async create(
        suggestionId: string,
        personID: string,
        auctionID: string,
        suggestedPrice: number,
        regDate: string,
        status: SuggestionStatusEnum
    ) {
        if (await this.exists(suggestionId)) {
            throw new Error(`Suggestion ${suggestionId} already exists`);
        }

        const suggestion = new Suggestion(
            personID,
            auctionID,
            suggestedPrice,
            regDate,
            status,
            'SUG'
        );

        const suggestionBuffer = Buffer.from(JSON.stringify(suggestion));

        await this.ctx.stub.putState(suggestionId, suggestionBuffer);
    }

  
    public async updateStatus(suggestionId: string, newStatus: SuggestionStatusEnum) {
        let suggestion = await this.get(suggestionId)
        suggestion.status = newStatus

        const suggestionBuffer = Buffer.from(JSON.stringify(suggestion))

        await this.ctx.stub.putState(suggestionId, suggestionBuffer)
    }



    public async delete(suggestionId :string) {
        await this.ctx.stub.deleteState(suggestionId)
    }
}
