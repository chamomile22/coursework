import { Injectable } from "@nestjs/common";
import { ConfigService } from "../../../config";
import { LocalFileSystemDuplexConnector, MongoDBDuplexConnector, MongoTransferer } from "mongodb-snapshot";

@Injectable()
export class BackupsService {
  constructor(private readonly configService: ConfigService) {}

  async backup() {
    const mongoConnector = new MongoDBDuplexConnector({
      connection: {
        uri: this.configService.db.uri,
        dbname: this.configService.db.name,
      },
    });

    const localFileConnector = new LocalFileSystemDuplexConnector({
      connection: {
        path: './backup.tar',
      },
    });

    const transferer = new MongoTransferer({
      source: mongoConnector,
      targets: [localFileConnector],
    });

    for await (const { total, write } of transferer) {
      console.log(`remaining bytes to write: ${total - write}`);
    }
  }

  async restore() {
    const mongoConnector = new MongoDBDuplexConnector({
      connection: {
        uri: this.configService.db.uri,
        dbname: this.configService.db.name,
      },
      astarget: {
        remove_on_startup: true,
      }
    });

    const localFileConnector = new LocalFileSystemDuplexConnector({
      connection: {
        path: './backup.tar',
      },
    });

    const transferer = new MongoTransferer({
      source: localFileConnector,
      targets: [mongoConnector],
    });

    for await (const { total, write } of transferer) {
      console.log(`remaining bytes to write: ${total - write}`);
    }
  }
}