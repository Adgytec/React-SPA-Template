import { httpReqHeaders } from "@adgytec/adgytec-web-utils";
import urlJoin from "url-join";
import { env } from "@/env";

export const createEndpoint = (path: string) => {
    return urlJoin(env.VITE_ADGYTEC_FLOW_ENDPOINT, path);
};

export const JSONHeader = {
    [httpReqHeaders.contentType.key]:
        httpReqHeaders.contentType.valueApplicationJSON,
};

export type Endpoint = {
    path: string;
    method: string;
};
