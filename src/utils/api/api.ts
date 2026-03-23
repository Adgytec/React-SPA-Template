import { getEnvVar } from "@/utils/env/env";

export const createEndpoint = (path: string) => {
    const baseEndpoint = getEnvVar("VITE_ADGYTEC_FLOW_ENDPOINT");
    return new URL(path, baseEndpoint);
};
