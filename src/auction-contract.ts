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

    /*
    @Transaction(false)
    @Returns("Baggage")
    public async getBaggageByQueryWithPagination(ctx: Context, baggageValue: string , pageSize:string , bookmark:string) {
        const baggageService = new BaggageService(ctx);
        const baggage = await baggageService.getBaggageByQueryWithPagination(+baggageValue , +pageSize , bookmark)
        return baggage;
    }

    */



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
    public async createSuggestion(
        ctx: Context,
        suggestionId: string,
        personID: string,
        auctionID: string,
        suggestedPrice: number,
        regDate: string
    ) {
        const suggestionService = new SuggestionService(ctx);
        await suggestionService.create(
            suggestionId,
            personID,
            auctionID,
            suggestedPrice,
            regDate,
            SuggestionStatusEnum.Suggested
        );
    }



    @Transaction(true)
    public async updateSuggestionStatus(
        ctx: Context,
        suggestionId: string,
        newStatus: SuggestionStatusEnum
    ) {
        const suggestionService = new SuggestionService(ctx);
        await suggestionService.updateStatus(suggestionId, newStatus);
    }

    @Transaction(true)
    public async deleteSuggestion(ctx: Context, suggestionId: string) {
        const suggestionService = new SuggestionService(ctx);
        await suggestionService.delete(suggestionId);
    }

/*
    // drugClaimDelivery
    @Transaction(true)
    public async drugClaimDelivery(ctx: Context, drugId: string, productDate: string, expireDate: string) {
        const drugService = new DrugService(ctx)
        const drug = await drugService.get(drugId)
        if (!drug)
            throw new Error(`drug by drugId ${drugId} not exist`)
        
        if (Date.now() > drug.expireDate )
            throw new Error(`drug by drugId ${drugId} expired`)    
                
        //
        if (drug.status === DrugStatusEnum.Manufactured)
            drugService.updateStatus(drugId, DrugStatusEnum.ClaimedDeliveryToDistributer)

        //        
        if (drug.status === DrugStatusEnum.ConfirmedDeliveryToDistributer)
            drugService.updateStatus(drugId, DrugStatusEnum.ClaimedDeliveryToPharmacy)   
            
        //        
        if (drug.status === DrugStatusEnum.ConfirmedDeliveryToPharmacy)
            drugService.updateStatus(drugId, DrugStatusEnum.ClaimedDeliveryToPatient)       
        

    }

    // drugConfirmDelivery
    @Transaction(true)
    public async drugConfirmDelivery(ctx: Context , drugId : string) {
        const drugService = new DrugService(ctx)
        const drug = await drugService.get(drugId)
        if (!drug)
            throw new Error(`drug by drugId ${drugId} not exist`)

        //
        if (drug.status === DrugStatusEnum.ClaimedDeliveryToDistributer)
            drugService.updateStatus(drugId, DrugStatusEnum.ConfirmedDeliveryToDistributer)

        //
        if (drug.status === DrugStatusEnum.ClaimedDeliveryToPharmacy)
            drugService.updateStatus(drugId, DrugStatusEnum.ConfirmedDeliveryToPharmacy)

        //
        if (drug.status === DrugStatusEnum.ClaimedDeliveryToPatient)
            drugService.updateStatus(drugId, DrugStatusEnum.ConfirmedDeliveryToPatient)

    }
    */

}