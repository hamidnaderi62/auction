import { Transport } from "../transport/transport";

export class Order {
    public baggageId: string;
    public srcAirportId: string;
    public dstAirportId: string;
    public transports: string[];
    public status: OrderStatusEnum;

    constructor(
        baggageId: string,
        srcAirportId: string,
        dstAirportId: string,
        transports: string[],
        status: OrderStatusEnum
    ) {
        this.baggageId = baggageId
        this.srcAirportId = srcAirportId
        this.dstAirportId = dstAirportId
        this.transports = transports
        //transports.forEach(val => this.transports.push(Object.assign({}, val)));
        this.status = status
    }
}


export enum OrderStatusEnum {
    // 1- Agent Creates a baggage (Out of Order procedure)

    // 2- Agent Creates a baggage transfer Order
    Created,

    // 3a- Agent Delivers baggage to srcAirport
    ClaimedDeliveryToSrcAirport,

    // 3b- srcAirport Confirms Delivery
    ConfirmedDeliveryToSrcAirport,

    // 5a- Airline Delivers baggage to dstAirport
    ClaimedDeliveryToDstAirport,

    // 5b- dstAirport Confirms Delivery
    ConfirmedDeliveryToDstAirport,

    // 6a- dstAirport Delivers to endpoint
    ClaimedDeliveryToEndpoint,

    // 6b- endpoint Confirms Delivery
    ConfirmedDeliveryToEndpoint,
}
