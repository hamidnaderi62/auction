import { Context } from "fabric-contract-api";
import { Person } from "./person";


export class PersonService {
    private ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    public async exists(personId: string) {
        const data: Uint8Array = await this.ctx.stub.getState(personId);
        return (!!data && data.length > 0);
    }

    public async get(personId: string) {
        const personBuffer = await this.ctx.stub.getState(personId);
        const person = JSON.parse(personBuffer.toString());
        return person;
    }

    public async personLogin(username : string , password : string) {
        const query ={
            selector: {
                table: 'PER',
                username: username,
                password: password
            }
         }
        const queryString = JSON.stringify(query)
        const result = await this.ctx.stub.getQueryResult(queryString)

        const persons = [];
        let finished = false;
        do{
            const res = await result.next()
            if(!res.done){
                const bag = JSON.parse(res.value.value.toString())
                persons.push(bag)
                console.log(bag)
            }
            else{
                finished = true
            }
        }while(!finished)
        return persons
    }


    public async create(
        personId: string,
        code: string,
        name: string,
        tel: string,
        avatar: string,
        username: string,
        password: string
    ) {
        if (await this.exists(personId)) {
            throw new Error(`Person ${personId} already exists`);
        }

        const person = new Person(
            code,
            name,
            tel,
            avatar,
            username,
            password,
            'PER'
        );

        const personBuffer = Buffer.from(JSON.stringify(person));

        await this.ctx.stub.putState(personId, personBuffer);
    }

  
    public async updatePassword(personId: string, newPassword: string) {
        let person = await this.get(personId)
        person.password = newPassword

        const personBuffer = Buffer.from(JSON.stringify(person))

        await this.ctx.stub.putState(personId, personBuffer)
    }



    public async delete(personId :string) {
        await this.ctx.stub.deleteState(personId)
    }
}
