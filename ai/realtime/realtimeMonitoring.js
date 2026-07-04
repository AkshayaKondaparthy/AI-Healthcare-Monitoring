import { realtimeVitals }
from "./realtimeVitals.js";

import { realtimeAlerts }
from "./realtimeAlerts.js";

export function realtimeMonitoring() {

const vitals =
realtimeVitals();

const alert =
realtimeAlerts(vitals);

return {

```
vitals,

alert
```

};
}
