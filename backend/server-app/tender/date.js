function formateDate(dateString){
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthIndex = date.getMonth();
    const year = date.getFullYear().toString().slice(0);
    const formattedDate = `${year}-${String(monthIndex + 1).padStart(2,"0")}-${day}`;
    return formattedDate;

}
module.exports = formateDate;