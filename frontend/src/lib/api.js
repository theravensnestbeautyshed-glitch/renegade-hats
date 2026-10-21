import axios from "axios";

const BASE = process.env.REACT_APP_BACKEND_URL;
export const STATIC_CATALOG = !BASE;
export const api = axios.create({ baseURL: BASE ? `${BASE}/api` : "/api" });

export const formatCAD = (n) =>
  `$${Number(n ?? 0).toLocaleString("en-CA", { minimumFractionDigits: 0 })} CAD`;

export const IMG = "https://static.prod-images.emergentagent.com/jobs/ef4dfbc2-be2e-46cd-afc0-0ca495bb7551/images/";
