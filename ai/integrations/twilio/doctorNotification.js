import { smsAlert }
from "./smsAlert.js";

export async function doctorNotification(
doctorPhone,
patient
) {

const message = `

Critical patient alert:

Name: ${patient.name}

Heart Rate: ${patient.heartRate}

Oxygen: ${patient.oxygen}

`;

return await smsAlert(
doctorPhone,
message
);
}
