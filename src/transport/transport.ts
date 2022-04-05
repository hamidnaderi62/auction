export class Transport {
    public orderId: string;
    public srcAirportId: string;
    public dstAirportId: string;
    public airlineId: string;
    public flightNo: string;
    public status: TransportStatusEnum;

    constructor(
        orderId: string,
        srcAirportId: string,
        dstAirportId: string,
        airlineId: string,
        flightNo: string,
        status: TransportStatusEnum
    ) {
        this.orderId = orderId
        this.srcAirportId = srcAirportId
        this.dstAirportId = dstAirportId
        this.airlineId = airlineId
        this.flightNo = flightNo
        this.status = status
    }
}

export enum TransportStatusEnum {
    // 1- Agent Creates a baggage (Out of Order procedure)

    // 2- Agent Creates a baggage transfer Order
    //Created,

    // 3a- Agent Delivers baggage to srcAirport
    ClaimedDeliveryToSrcAirport,

    // 3b- srcAirport Confirms Delivery
    ConfirmedDeliveryToSrcAirport,

    // 4a- srcAirport Delivers baggage to Airline
    ClaimedDeliveryToAirline,

    // 4b- Airline Confirms Delivery
    ConfirmedDeliveryToAirline,

    // 5a- Airline Delivers baggage to dstAirport
    ClaimedDeliveryToDstAirport,

    // 5b- dstAirport Confirms Delivery
    ConfirmedDeliveryToDstAirport,

    // 6a- dstAirport Delivers to endpoint
    //ClaimedDeliveryToEndpoint,

    // 6b- endpoint Confirms Delivery
    //ConfirmedDeliveryToEndpoint,
}
