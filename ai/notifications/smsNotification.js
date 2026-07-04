import { smsAlert }
from "../integrations/twilio/smsAlert.js";

export async function smsNotification(
phone,
message
) {

return await smsAlert(
phone,
message
);
}
