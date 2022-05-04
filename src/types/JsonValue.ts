export interface JsonObject {
  [x: string]: JsonValue;
}

export type JsonArray = Array<JsonValue>;

type JsonValue = string | number | boolean | null | JsonArray | JsonObject;

export default JsonValue;
