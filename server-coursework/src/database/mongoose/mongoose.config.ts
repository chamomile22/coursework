// Just to init it
import "./mongoose.logger";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

import { ConfigService } from "@module/config";

export const MONGOOSE_CONFIG: MongooseModuleAsyncOptions = {
  useFactory: (config: ConfigService) => ({
    uri: config.db.uri,
    dbName: config.db.name,
  }),
  inject: [ConfigService],
};
