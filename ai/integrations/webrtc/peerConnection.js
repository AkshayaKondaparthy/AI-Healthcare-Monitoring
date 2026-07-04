import rtcConfig
from "./rtcConfig.js";

export function createPeer() {

return new RTCPeerConnection(
rtcConfig
);
}
