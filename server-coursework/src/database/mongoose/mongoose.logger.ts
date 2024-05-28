import util from "util";

import { Logger } from "@nestjs/common";
import mongoose from "mongoose";

// https://dev.to/sw360cab/mongoose-debug-messages-with-a-custom-logging-library-or-style-1hk4
mongoose.set("debug", (collectionName, methodName, ...methodArgs) => {
  const logger = new Logger("mongoose");
  const msgMapper = (m): string =>
    util
      .inspect(m, false, 10, true)
      .replace(/\n/g, "")
      .replace(/\s{2,}/g, " ");
  logger.debug(`${collectionName}.${methodName}(${methodArgs.map(msgMapper).join(", ")})`);
});
