/**
 * Created by BJ Rutledge
 * Date:2024-12-21
 **/
export class HttpError extends Error {
   status: number;
   constructor(message: string, status: number) {
      super(message);
      this.status = status;
   }
}
