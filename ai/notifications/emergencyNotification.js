import { smsNotification }
from "./smsNotification.js";

import { whatsappNotification }
from "./whatsappNotification.js";

export async function emergencyNotification(
patient
) {

const message = `

🚨 Emergency Alert

Patient:
${patient.name}

HR:
${patient.heartRate}

Oxygen:
${patient.oxygen}

`;

await smsNotification(
patient.phone,
message
);

await whatsappNotification(
patient.phone,
message
);
}
