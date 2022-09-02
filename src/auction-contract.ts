/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Context,
    Contract,
    Info,
    Returns,
    Transaction,
} from "fabric-contract-api";
import { Auction, AuctionStatusEnum } from "./auction/auction";
import { AuctionService } from "./auction/auction.service";

import { Person } from "./person/person";
import { PersonService } from "./person/person.service";

import { Suggestion, SuggestionStatusEnum } from "./suggestion/suggestion";
import { SuggestionService } from "./suggestion/suggestion.service";

import { transports } from "winston";


// ToDo Test before/afterTransaction logs using fabric samples network
// ToDo implement and test transaction methods
@Info({ title: "AuctionContract", description: "My Smart Contract" })
export class AuctionContract extends Contract {
    public async beforeTransaction(ctx: Context): Promise<void> {
        // IDxxx called fn: funcName, params: ...
        const { fcn: methodName, params: methodParms } =
            ctx.stub.getFunctionAndParameters();
        const id = ctx.clientIdentity.getID();
        const mspId = ctx.clientIdentity.getMSPID();

        console.log(
            `Function: ${methodName}, Params: ${methodParms} Called by Id: ${id} From ${mspId}`
        );
    }

    public async afterTransaction(ctx: Context, result: any): Promise<void> {
        console.log(`Result: ${result}`);
    }


    // *** Auction
    @Transaction(false)
    @Returns("boolean")
    public async auctionExists(
        ctx: Context,
        auctionId: string
    ): Promise<boolean> {
        const auctionService = new AuctionService(ctx);
        return await auctionService.exists(auctionId);
    }

    @Transaction(false)
    @Returns("Auction")
    public async getAuction(ctx: Context, auctionId: string): Promise<Auction> {
        const auctionService = new AuctionService(ctx);
        const auction = await auctionService.get(auctionId);
        return auction;
    }

    
    @Transaction(false)
    @Returns("Auction")
    public async getAuctionsByStatus(ctx: Context, auctionStatus: AuctionStatusEnum) {
        const auctionService = new AuctionService(ctx);
        const auction = await auctionService.getAuctionsByStatus(auctionStatus)
        return auction;
    }

    @Transaction(false)
    @Returns("Auction")
    public async getAuctionsByPerson(ctx: Context, personId: string) {
        const auctionService = new AuctionService(ctx);
        const auction = await auctionService.getAuctionsByPerson(personId)
        return auction;
    }




    @Transaction(true)
    public async createAuction(
        ctx: Context,
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
        personID: string
    ) {
        const auctionService = new AuctionService(ctx);
        await auctionService.create(auctionId, code, title, desc, features, basePrice, image1, image2, image3, availableDays, regDate , personID, AuctionStatusEnum.Available);
        // events tx
        const eventData = { auctionId, code, title, desc, features, basePrice, image1, image2, image3, availableDays, regDate, personID};
        ctx.stub.setEvent(
            "AuctionCreated",
            Buffer.from(JSON.stringify(eventData))
        );
    }

    @Transaction(true)
    public async updateAuctionStatus(
        ctx: Context,
        auctionId: string,
        newStatus: AuctionStatusEnum
    ) {
        const auctionService = new AuctionService(ctx);
        await auctionService.updateStatus(auctionId, newStatus);
    }

    @Transaction(true)
    public async deleteAuction(ctx: Context, auctionId: string) {
        const auctionService = new AuctionService(ctx);
        await auctionService.delete(auctionId);
    }

    // *** Person
    @Transaction(false)
    @Returns("Person")
    public async getPerson(ctx: Context, personId: string): Promise<Person> {
        const personService = new PersonService(ctx);
        const person = await personService.get(personId);
        return person;
    }

    @Transaction(false)
    @Returns("Person")
    public async personLogin(ctx: Context, username: string, password: string) {
        const personService = new PersonService(ctx);
        const person = await personService.personLogin(username , password)
        return person;
    }

    @Transaction(true)
    public async createPerson(
        ctx: Context,
        personId: string,
        code: string,
        name: string,
        tel: string,
        avatar: string,
        username: string,
        password: string
    ) {
        const person = new PersonService(ctx);
        await person.create(personId, code, name, tel, avatar, username, password);
    }

    @Transaction(true)
    public async updatePersonPassword(
        ctx: Context,
        personId: string,
        newPassword: string
    ) {
        const personService = new PersonService(ctx);
        await personService.updatePassword(personId, newPassword);
    }

    @Transaction(true)
    public async deletePerson(ctx: Context, personId: string) {
        const personService = new PersonService(ctx);
        await personService.delete(personId);
    }

    
    // *** Suggestion 
    @Transaction(false)
    @Returns("Suggestion")
    public async getSuggestion(ctx: Context, suggestionId: string): Promise<Suggestion> {
        const suggestionService = new SuggestionService(ctx);
        const suggestion = await suggestionService.get(suggestionId);
        return suggestion;
    }

    @Transaction(false)
    @Returns("Suggestion")
    public async getSuggestionsByPerson(ctx: Context, personId: string) {
        const suggestionService = new SuggestionService(ctx);
        const suggestions = await suggestionService.getSuggestionsByPerson(personId);
        return suggestions;
    }

    @Transaction(false)
    @Returns("Suggestion")
    public async getSuggestionsByAuction(ctx: Context, auctionId: string) {
        const suggestionService = new SuggestionService(ctx);
        const suggestions = await suggestionService.getSuggestionsByAuction(auctionId);
        return suggestions;
    }


    @Transaction(true)
    public async deleteSuggestion(ctx: Context, suggestionId: string) {
        const suggestionService = new SuggestionService(ctx);
        await suggestionService.delete(suggestionId);
    }

    @Transaction(true)
    public async acceptSuggestionAutomatically(ctx: Context) {
        
        const auctionService = new AuctionService(ctx);
        const suggestionService = new SuggestionService(ctx)
        const auctions = await auctionService.getAuctionsByStatus(AuctionStatusEnum.Available)
        console.log(auctions.length)
        auctions.forEach(async auction => {
            let current_time = new Date().getTime();
            let auction_time = new Date(auction.regDate).getTime() + auction.availableDays * 86400000;
            console.log(current_time)
            console.log(auction_time)
            if(current_time >= auction_time)
            {
                const suggestions : Array<Suggestion> = await suggestionService.getSuggestionsByAuction(auction.code);                
                console.log(suggestions.length)
                if(suggestions.length > 0 )
                {
                    let maxSuggestedPrice = 0 ;
                    let maxSuggestionCode = '';

                    suggestions.forEach(suggestion => {
                        if(suggestion.suggestedPrice > maxSuggestedPrice)
                            maxSuggestedPrice = suggestion.suggestedPrice;
                            maxSuggestionCode = suggestion.code;
                    });
                    console.log(maxSuggestedPrice)
                    console.log(maxSuggestionCode)
                    try {
                        await suggestionService.updateStatus(maxSuggestionCode, SuggestionStatusEnum.Accepted);
                        await auctionService.updateStatus(auction.code, AuctionStatusEnum.Sold); 
                    }
                    catch(err) {

                    }
                    
                }

                else
                {
                    await auctionService.updateStatus(auction.code, AuctionStatusEnum.Expired);    
                }

                
            }
        });
       
    }


    // acceptSuggestion
    @Transaction(true)
    public async acceptSuggestion( 
        ctx: Context,
        suggestionId: string
        ){
        const suggestionService = new SuggestionService(ctx)
        const suggestion = await suggestionService.get(suggestionId)
        if (!suggestion)
            throw new Error(`@@@ پیشنهاد وجود ندارد $$$`)
            //throw new Error(`suggestion by suggestionId ${suggestionId} not exist`)
        
        const auctionId =  suggestion.auctionID;
        const auctionService = new AuctionService(ctx)
        const auction = await auctionService.get(auctionId)
        if (!auction)
            throw new Error(`@@@ درخواست فروش با این مشخصات وجود ندارد $$$`)
            //throw new Error(`auction by auctionId ${auctionId} not exist`)
                
        
        if (auction.status !== AuctionStatusEnum.Available)
            throw new Error(`@@@ درخواست فروشی با این مشخصات در دسترس  نمی باشد $$$`)
            //throw new Error(`auction by auctionId ${auctionId} is not Available`)  
        
        
        if (suggestion.status !== SuggestionStatusEnum.Suggested)
            throw new Error(`@@@ پیشنهاد معتبر نمی باشد $$$`)
            //throw new Error(`suggestion by suggestionId ${suggestionId} is not valid`)
           
        await suggestionService.updateStatus(suggestionId, SuggestionStatusEnum.Accepted);
        await auctionService.updateStatus(auctionId, AuctionStatusEnum.Sold);    
        //throw new Error(`@@@ پیشنهاد منتخب ثبت شد $$$`) 

    }


        // createSuggestion
        @Transaction(true)
        public async createSuggestion( 
            ctx: Context,
            suggestionId: string,
            code: string,
            personID: string,
            auctionID: string,
            suggestedPrice: number,
            regDate: string
        ){
                    
            const auctionService = new AuctionService(ctx)
            const auction = await auctionService.get(auctionID)
            if (!auction)
                throw new Error(`auction by auctionId ${auctionID} not exist`)
                    
            
            if (auction.personID === personID)
                throw new Error(`@@@ فروشنده امکان ثبت پیشنهاد برای درخواست خود ندارد $$$`) //
                //throw new Error(`@@@ auction owner can not register suggestion for that auction $$$`) // 
                
            if (auction.status !== AuctionStatusEnum.Available)
                throw new Error(`@@@ درخواست فروشی با این مشخصات در دسترس  نمی باشد $$$`)
                //throw new Error(`auction by auctionId ${auctionID} is not Available`)    
            
            
            if (suggestedPrice < auction.basePrice)
                throw new Error(`@@@ قیمت پیشنهادی نمی تواند کمتر از قیمت پایه باشد $$$`)
                //throw new Error(`suggested price cannot be lower than base price`)    
                
            if (new Date(regDate).getTime() < new Date(auction.regDate).getTime())
                throw new Error(`@@@ تاریخ ثبت پیشنهاد نمی تواند قبل از تاریخ ثبت درخواست فروش باشد $$$`)
                //throw new Error(`suggestion registration date cannot be befor than auction registration date`)  
            
            if (new Date(regDate).getTime() > new Date(auction.regDate).getTime() + auction.availableDays * 86400000)
                throw new Error(`@@@ تاریخ ثبت پیشنهاد نمی تواند پس از زمان انقضای درخواست باشد $$$`)
                //throw new Error(`suggestion registration date cannot be after than auction available days`)  

            const suggestionService = new SuggestionService(ctx)
            await suggestionService.create(
                suggestionId,
                code,
                personID,
                auctionID,
                suggestedPrice,
                regDate,
                SuggestionStatusEnum.Suggested
            )
            //throw new Error(`@@@ پیشنهاد ثبت شد $$$`)
            //throw new Error(`your new suggestion register successfully`) 
    
        }


}
