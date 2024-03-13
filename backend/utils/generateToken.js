import jwt from 'jsonwebtoken'

const generateTokenAndSetCookies = (userId, res) => {
    //creo il token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //ms

        httpOnly: true, //per prevenire un attacco XSS (cross-site scripting attacks)  si verificano tipicamente 
                        //quando un'applicazione web non valida o filtra correttamente l'input fornito dagli utenti e 
                        //lo restituisce all'utente senza alcuna sanificazione. Gli attaccanti possono sfruttare questa 
                        //mancanza di sanificazione inserendo script malevoli all'interno dei campi di input 
                        //(come campi di ricerca, commenti, form di inserimento dati) che vengono quindi memorizzati 
                        //nel server e restituiti a tutti gli altri utenti che visualizzano quella pagina.

        sameSite:"strict", //per prevenire gli attacchi CSRF (cross-site request forgery attacks) gli attacchi CSRF sfruttano 
                          //la fiducia tra l'utente autenticato e l'applicazione web per eseguire azioni non autorizzate. 
                          
        secure: process.env.NODE_ENV !== "development"
    });
};

export default generateTokenAndSetCookies;