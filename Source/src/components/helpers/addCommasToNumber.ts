/**
 * Created by BJ Rutledge
 * Date:2024-12-26
 **/

const addCommasToNumber = (number: number | undefined): string | null => {
   if (number === undefined) return null;
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default addCommasToNumber;
