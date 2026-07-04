import jsPDF from "jspdf";

export function generatePDF(patient) {

const doc =
new jsPDF();

doc.setFontSize(20);

doc.text(
"AI Healthcare Report",
20,
20
);

doc.setFontSize(12);

doc.text(
`Patient: ${patient.name}`,
20,
40
);

doc.text(
`Diagnosis: ${patient.diagnosis}`,
20,
50
);

doc.text(
`Heart Rate: ${patient.heartRate}`,
20,
60
);

doc.text(
`Oxygen: ${patient.oxygen}`,
20,
70
);

doc.save(
"patient-report.pdf"
);
}
