import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StoreSettingsService {

    constructor(private readonly databaseModule: DatabaseService) {}

    async isStoreOpen(id:string) {
        const store = await this.databaseModule.storeSettings.findUnique({
            where: {
                id: id
            }
        }
        )
        return (await store).isOpen
    }
    
    async getAllStoreStatus() {
        return await this.databaseModule.storeSettings.findMany()
    }

    async setIsOpen(isOpen: boolean, id: string) {
        return await this.databaseModule.storeSettings.update({
            where:{
                id: id,
            },
            data:{
                isOpen: isOpen
            }
        }
        )
    }
}
