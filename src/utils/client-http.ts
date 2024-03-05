import ky, { type KyInstance } from "ky";

const clientHttp = () =>
  ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  });

export default clientHttp;
