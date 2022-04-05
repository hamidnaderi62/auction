import { Context } from "fabric-contract-api";
import { Transport } from "../transport/transport";
import { Order, OrderStatusEnum } from "./order";

export class OrderService {
    private ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    public async exists(orderId: string) {
        const data: Uint8Array = await this.ctx.stub.getState(orderId);
        return (!!data && data.length > 0);
    }

    public async get(orderId: string) {
        const orderBuffer = await this.ctx.stub.getState(orderId);
        const order = JSON.parse(orderBuffer.toString());
        return order;
    }


    public async create(
        orderId: string,
        baggageId: string,
        srcAirportId: string,
        dstAirportId: string,
        transports: string[],
        status: OrderStatusEnum
    ) {
        if (await this.exists(orderId)) {
            throw new Error(`Order ${orderId} already exists`);
        }

        const order = new Order(
            baggageId,
            srcAirportId,
            dstAirportId,
            transports,
            status
        );

        const orderBuffer = Buffer.from(JSON.stringify(order));

        await this.ctx.stub.putState(orderId, orderBuffer);
    }

  
    //// ToDo implement update method
    public async updateStatus(orderId: string, newStatus: OrderStatusEnum) {
        let order = await this.get(orderId)
        order.status = newStatus

        const orderBuffer = Buffer.from(JSON.stringify(order))

        await this.ctx.stub.putState(orderId, orderBuffer)
    }


    ////
    public async updateTransports(orderId: string, transportId: string) {
        let order = await this.get(orderId)
        order.transports.push(transportId);

        const orderBuffer = Buffer.from(JSON.stringify(order))

        await this.ctx.stub.putState(orderId, orderBuffer)
    }

    //// ToDo implement delete method
    public async delete(orderId :string) {
        await this.ctx.stub.deleteState(orderId)
    }
}
