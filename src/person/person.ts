export class Person {
    public personId: string
    public code: string
    public name: string
    public tel: string
    public avatar: string
    public username: string
    public password: string
    public table : string



    constructor(
        code: string, 
        name: string, 
        tel: string, 
        avatar: string, 
        username: string, 
        password: string,
        table: string, 
        ) {
            this.code = code
            this.name = name
            this.tel = tel
            this.avatar = avatar
            this.username = username
            this.password = password
            this.table = table
    }
    
}


