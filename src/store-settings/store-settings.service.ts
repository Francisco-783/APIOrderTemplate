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

}
