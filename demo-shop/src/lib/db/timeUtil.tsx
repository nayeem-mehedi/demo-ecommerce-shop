export function compareDates(d1: Date, d2: Date) {

    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
  
    if (date1 < date2) {
      console.log(`${d1} is less than ${d2}`);
    } else if (date1 > date2) {
      console.log(`${d1} is greater than ${d2}`);
    } else {
      console.log(`Both dates are equal`);
    }
  };


export function isNew(d1: Date, days : number) : boolean {
    let diff = Date.now() - new Date(d1).getTime();
    let millForDay = 86400000;
    return diff < days * millForDay;
};