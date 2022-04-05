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
import { Airline } from "./airline/airline";
import { AirlinesService } from "./airline/airlines.service";
import { Airport } from "./airports/airport";
import { AirportsService } from "./airports/airports.service";
import { Baggage } from "./baggage/baggage";
import { BaggageService } from "./baggage/baggage.service";
import { Transport, TransportStatusEnum } from "./transport/transport";
import { TransportService } from "./transport/transport-service";
import { Order, OrderStatusEnum } from "./order/order";
import { OrderService } from "./order/order-service";
import { transports } from "winston";


// ToDo Test before/afterTransaction logs using fabric samples network
// ToDo implement and test transaction methods
@Info({ title: "InterAirliningContract", description: "My Smart Contract" })
export class InterAirliningContract extends Contract {
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


    // *** Baggage
    @Transaction(false)
    @Returns("boolean")
    public async baggageExists(
        ctx: Context,
        baggageId: string
    ): Promise<boolean> {
        const baggageService = new BaggageService(ctx);
        return await baggageService.exists(baggageId);
    }

    @Transaction(false)
    @Returns("Baggage")
    public async getBaggage(ctx: Context, baggageId: string): Promise<Baggage> {
        const baggageService = new BaggageService(ctx);
        const baggage = await baggageService.get(baggageId);
        return baggage;
    }

    @Transaction(false)
    @Returns("Baggage")
    public async getBaggageByQuery(ctx: Context, baggageValue: string) {
        const baggageService = new BaggageService(ctx);
        const baggage = await baggageService.getBaggageByQuery(+baggageValue)
        return baggage;
    }

    @Transaction(false)
    @Returns("Baggage")
    public async getBaggageByQueryWithPagination(ctx: Context, baggageValue: string , pageSize:string , bookmark:string) {
        const baggageService = new BaggageService(ctx);
        const baggage = await baggageService.getBaggageByQueryWithPagination(+baggageValue , +pageSize , bookmark)
        return baggage;
    }

    @Transaction(true)
    public async createBaggage(
        ctx: Context,
        baggageId: string,
        owner: string,
        weight: string,
        value: string
    ) {
        const baggageService = new BaggageService(ctx);
        await baggageService.create(baggageId, owner, weight, value);
        // events tx
        const eventData = { baggageId, owner, weight, value };
        ctx.stub.setEvent(
            "BaggageCreated",
            Buffer.from(JSON.stringify(eventData))
        );
    }

    @Transaction(true)
    public async updateBaggageOwner(
        ctx: Context,
        baggageId: string,
        newOwner: string
    ) {
        const baggageService = new BaggageService(ctx);
        await baggageService.updateOwner(baggageId, newOwner);
    }

    @Transaction(true)
    public async updateBaggageValue(
        ctx: Context,
        baggageId: string,
        newValue: string
    ) {
        const baggageService = new BaggageService(ctx);
        await baggageService.updateValue(baggageId, newValue);
    }

    @Transaction(true)
    public async updateBaggageWeight(
        ctx: Context,
        baggageId: string,
        newWeight: string
    ) {
        const baggageService = new BaggageService(ctx);
        await baggageService.updateWeight(baggageId, newWeight);
    }

    @Transaction(true)
    public async deleteBaggage(ctx: Context, baggageId: string) {
        const baggageService = new BaggageService(ctx);
        await baggageService.delete(baggageId);
    }

    // *** Airline
    @Transaction(false)
    @Returns("Airline")
    public async getAirline(ctx: Context, airlineId: string): Promise<Airline> {
        const airlineService = new AirlinesService(ctx);
        const airline = await airlineService.get(airlineId);
        return airline;
    }

    @Transaction(true)
    public async createAirline(
        ctx: Context,
        airlineId: string,
        name: string,
        country: string
    ) {
        const airline = new AirlinesService(ctx);
        await airline.create(airlineId, name, country);
    }

    @Transaction(true)
    public async updateAirlineCountry(
        ctx: Context,
        airlineId: string,
        newCountry: string
    ) {
        const airlineService = new AirlinesService(ctx);
        await airlineService.updateCountry(airlineId, newCountry);
    }

    @Transaction(true)
    public async deleteAirline(ctx: Context, airlineId: string) {
        const airlineService = new AirlinesService(ctx);
        await airlineService.delete(airlineId);
    }

    // *** Airport
    @Transaction(false)
    @Returns("Airport")
    public async getAirport(ctx: Context, airportId: string): Promise<Airport> {
        const airportService = new AirportsService(ctx);
        const airport = await airportService.get(airportId);
        return airport;
    }

    @Transaction(true)
    public async createAirport(
        ctx: Context,
        airportId: string,
        name: string,
        location: string
    ) {
        const airport = new AirportsService(ctx);
        await airport.create(airportId, name, location);
    }

    @Transaction(true)
    public async updateAirportLocation(
        ctx: Context,
        airportId: string,
        newLocation: string
    ) {
        const airportService = new AirportsService(ctx);
        await airportService.updateLocation(airportId, newLocation);
    }

    @Transaction(true)
    public async deleteAirport(ctx: Context, airportId: string) {
        const airportService = new AirportsService(ctx);
        await airportService.delete(airportId);
    }

    // *** Transport 
    @Transaction(false)
    @Returns("Transport")
    public async getTransport(ctx: Context, transportId: string): Promise<Order> {
        const transportService = new TransportService(ctx);
        const transport = await transportService.get(transportId);
        return transport;
    }

    @Transaction(true)
    public async createTransport(
        ctx: Context,
        transportId: string,
        orderId: string,
        srcAirportId: string,
        dstAirportId: string,
        airlineId: string,
        flightNo: string
    ) {
        const transportService = new TransportService(ctx);
        await transportService.create(
            transportId,
            orderId,
            srcAirportId,
            dstAirportId,
            airlineId,
            flightNo,
            TransportStatusEnum.ClaimedDeliveryToAirline
        );

        // raise event for transport created
        const transport = new Transport(
            orderId,
            srcAirportId,
            dstAirportId,
            airlineId,
            flightNo,
            TransportStatusEnum.ClaimedDeliveryToAirline
        );
        const transportEventData = {
            transportId,
            ...transport,
        };
        const transportEventBuffer = Buffer.from(JSON.stringify(transportEventData));
        ctx.stub.setEvent("TransportCreated", transportEventBuffer);

        const orderService = new OrderService(ctx);
        const order = await orderService.updateTransports(orderId, transportId);
    }



    @Transaction(true)
    public async updateTransportStatus(
        ctx: Context,
        transportId: string,
        newStatus: TransportStatusEnum
    ) {
        const transportService = new TransportService(ctx);
        await transportService.updateStatus(transportId, newStatus);
    }

    @Transaction(true)
    public async deleteTransport(ctx: Context, transportId: string) {
        const transportService = new TransportService(ctx);
        await transportService.delete(transportId);
    }


    // ToDo Implement transportClaimDelivery
    @Transaction(true)
    public async transportClaimDelivery(ctx: Context, transportId: string, src: string, dst: string) {
        const transportService = new TransportService(ctx)
        const transport = await transportService.get(transportId)
        if (!transport)
            throw new Error(`transport by transportId ${transportId} not exist`)
                
        // 4a- srcAirport Delivers baggage to Airline
        if (transport.status === TransportStatusEnum.ConfirmedDeliveryToSrcAirport)
        if(transport.srcAirportId !== src)
            throw new Error(`invalid source ${src}`)

        if(transport.airlineId !== dst)
            throw new Error(`invalid destination ${dst}`)    

            transportService.updateStatus(transportId, TransportStatusEnum.ClaimedDeliveryToAirline)
        
        // 5a- Airline Delivers baggage to dstAirport
        if (transport.status === TransportStatusEnum.ConfirmedDeliveryToAirline)
        if(transport.airlineId !== src)
            throw new Error(`invalid source ${src}`)

        if(transport.dstAirportId !== dst)
            throw new Error(`invalid destination ${dst}`)    

            transportService.updateStatus(transportId, TransportStatusEnum.ClaimedDeliveryToDstAirport)

    }

    // ToDo Implement transportConfirmDelivery
    @Transaction(true)
    public async transportConfirmDelivery(ctx: Context , transportId : string, orderId: string) {
        const transportService = new TransportService(ctx)
        const transport = await transportService.get(transportId)
        if (!transport)
            throw new Error(`transport by transportId ${transportId} not exist`)

        const orderService = new OrderService(ctx)
        const order = await orderService.get(orderId)
        if (!order)
            throw new Error(`order by orderId ${orderId} not exist`)

                
        // 3b- srcAirport Confirms Delivery
        if (transport.status === TransportStatusEnum.ClaimedDeliveryToSrcAirport)
            transportService.updateStatus(transportId, TransportStatusEnum.ConfirmedDeliveryToSrcAirport)

        // 4b- Airline Confirms Delivery
        if (transport.status === TransportStatusEnum.ClaimedDeliveryToAirline)
            transportService.updateStatus(transportId, TransportStatusEnum.ConfirmedDeliveryToAirline)

        // 5b- dstAirport Confirms Delivery
        if (transport.status === TransportStatusEnum.ClaimedDeliveryToDstAirport)
            transportService.updateStatus(transportId, TransportStatusEnum.ConfirmedDeliveryToDstAirport)
            if (transport.dstAirportId === order.dstAirportId)
                orderService.updateStatus(orderId, OrderStatusEnum.ConfirmedDeliveryToDstAirport)


    }

    // *** Order 
    @Transaction(false)
    @Returns("Order")
    public async getOrder(ctx: Context, orderId: string): Promise<Order> {
        const orderService = new OrderService(ctx);
        const order = await orderService.get(orderId);
        return order;
    }

    @Transaction(true)
    public async createOrder(
        ctx: Context,
        orderId: string,
        baggageId: string,
        srcAirportId: string,
        dstAirportId: string
    ) {
        const orderService = new OrderService(ctx);
        await orderService.create(
            orderId,
            baggageId,
            srcAirportId,
            dstAirportId,
            [],
            OrderStatusEnum.Created
        );

        // raise event for order created
        const order = new Order(
            baggageId,
            srcAirportId,
            dstAirportId,
            [],
            OrderStatusEnum.Created
        );
        const orderEventData = {
            orderId,
            ...order,
        };
        const orderEventBuffer = Buffer.from(JSON.stringify(orderEventData));
        ctx.stub.setEvent("OrderCreated", orderEventBuffer);
    }



    @Transaction(true)
    public async updateOrderStatus(
        ctx: Context,
        orderId: string,
        newStatus: OrderStatusEnum
    ) {
        const orderService = new OrderService(ctx);
        await orderService.updateStatus(orderId, newStatus);
    }

    @Transaction(true)
    public async deleteOrder(ctx: Context, orderId: string) {
        const orderService = new OrderService(ctx);
        await orderService.delete(orderId);
    }


    // ToDo Implement orderClaimDelivery
    @Transaction(true)
    public async orderClaimDelivery(ctx: Context, orderId: string, src: string, dst: string) {
        const orderService = new OrderService(ctx)
        const order = await orderService.get(orderId)
        if (!order)
            throw new Error(`order by orderId ${orderId} not exist`)



        // 3a- Agent Delivers baggage to srcAirport
        if (order.status === OrderStatusEnum.Created)
            if(order.srcAirportId !== src)
                throw new Error(`invalid destination ${src}`)

            orderService.updateStatus(orderId, OrderStatusEnum.ClaimedDeliveryToSrcAirport)
        
        
        // 5a- Airline Delivers baggage to dstAirport
        if (order.status === OrderStatusEnum.ConfirmedDeliveryToSrcAirport)
            if(order.srcAirportId!== src)
                throw new Error(`invalid source ${src}`)

            if(order.dstAirportId !== dst)
                throw new Error(`invalid destination ${dst}`)    

            if(order.transports.length > 0 )
                if(order.dstAirportId !== order.transports[order.transports.length-1].dstAirportId)
                    throw new Error(`invalid destination ${dst}`)    

            orderService.updateStatus(orderId, OrderStatusEnum.ClaimedDeliveryToDstAirport)

        // 6a- dstAirport Delivers to endpoint
        if (order.status === OrderStatusEnum.ConfirmedDeliveryToDstAirport)
            orderService.updateStatus(orderId, OrderStatusEnum.ClaimedDeliveryToEndpoint)
    }

    // ToDo Implement orderConfirmDelivery
    @Transaction(true)
    public async orderConfirmDelivery(ctx: Context , orderId : string) {
        const orderService = new OrderService(ctx)
        const order = await orderService.get(orderId)
        if (!order)
            throw new Error(`order by orderId ${orderId} not exist`)


        // 3b- srcAirport Confirms Delivery
        if (order.status === OrderStatusEnum.ClaimedDeliveryToSrcAirport)
            orderService.updateStatus(orderId, OrderStatusEnum.ConfirmedDeliveryToSrcAirport)

        // 5b- dstAirport Confirms Delivery
        if (order.status === OrderStatusEnum.ClaimedDeliveryToDstAirport)
            orderService.updateStatus(orderId, OrderStatusEnum.ConfirmedDeliveryToDstAirport)

        // 6b- endpoint Confirms Delivery
        if (order.status === OrderStatusEnum.ClaimedDeliveryToEndpoint)
            orderService.updateStatus(orderId, OrderStatusEnum.ConfirmedDeliveryToEndpoint)

    }
}
