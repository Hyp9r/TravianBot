import App from "./app";
import Logger from "./logging/logger";

const application = new App();
application.initialize();
application.setupExpressContext();
application.start();