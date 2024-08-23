import { Injectable } from "@nestjs/common";
import { ConfigService } from "../../../config";
import { LocalFileSystemDuplexConnector, MongoDBDuplexConnector, MongoTransferer } from "mongodb-snapshot";
import { BackupDto } from "../dto";

@Injectable()
export class BackupsService {
  private readonly defaultPath = "./backup.tar";

  constructor(private readonly configService: ConfigService) {}

  async backup(data: BackupDto) {
    const mongoConnector = new MongoDBDuplexConnector({
      connection: {
        uri: this.configService.db.uri,
        dbname: this.configService.db.name,
      },
    });

    const localFileConnector = new LocalFileSystemDuplexConnector({
      connection: {
        path: data.path ?? this.defaultPath,
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

  async restore(data: BackupDto) {
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
        path: data.path ?? this.defaultPath,
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