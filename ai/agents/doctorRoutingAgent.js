export function doctorRouting(score) {

if (score < 40)
return "ICU Doctor";

if (score < 70)
return "General Physician";

return "Routine Monitoring";
}
