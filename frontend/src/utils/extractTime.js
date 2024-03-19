export function extractTime(dateString){
    const date= new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return `${hours}:${minutes}`;
    
    //prende un numero come input e restituisce una stringa che rappresenta quel numero con al massimo due cifre, 
    //inserendo uno zero all'inizio se il numero è composto da una sola cifra.
    function padZero(number){
        return number.toString().padStart(2,"0");
    }

}