import { Context } from "fabric-contract-api";
import { Transport, TransportStatusEnum } from "./transport";

export class TransportService {
    private ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    public async exists(transportId: string) {
        const data: Uint8Array = await this.ctx.stub.getState(transportId);
        return (!!data && data.length > 0);
    }

    public async get(transportId: string) {
        const transportBuffer = await this.ctx.stub.getState(transportId);
        const transport = JSON.parse(transportBuffer.toString());
        return transport;
    }


    public async create(
        transportId: string,
        orderId: string,
        srcAirportId: string,
        dstAirportId: string,
        airlineId: string,
        flightNo: string,
        status: TransportStatusEnum
    ) {
        if (await this.exists(transportId)) {
            throw new Error(`Transport ${transportId} already exists`);
        }

        const transport = new Transport(
            orderId,
            srcAirportId,
            dstAirportId,
            airlineId,
            flightNo,
            status
        );

        const transportBuffer = Buffer.from(JSON.stringify(transport));

        await this.ctx.stub.putState(transportId, transportBuffer);
    }

  
    public async updateStatus(transportId: string, newStatus: TransportStatusEnum) {
        let transport = await this.get(transportId)
        transport.status = newStatus

        const transportBuffer = Buffer.from(JSON.stringify(transport))

        await this.ctx.stub.putState(transportId, transportBuffer)
    }


    public async delete(transportId :string) {
        await this.ctx.stub.deleteState(transportId)
    }
}
