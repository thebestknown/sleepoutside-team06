import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.js";

loadHeaderFooter(); //we were missing this

//showing alerts
const alerts = new Alert();
alerts.init();
