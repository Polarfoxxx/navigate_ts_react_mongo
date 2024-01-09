
// Vytvorenie textu emailu s informáciami o novom používateľovi
const emailTextForNewUser = (username, password) => {
  return `
        <html>
        <body>
          <p>Vitajte, ${username}!</p>
          <p>Ďakujeme za registráciu na našom webovom portáli.</p>
          <p>Tu sú vaše prihlasovacie údaje:</p>
          <ul>
            <li>Používateľské meno: ${username}</li>
            <li>Heslo: ${password}</li>
          </ul>
          <p>Ďakujeme, že ste s nami!</p>
        </body>
      </html>
        `;
};

module.exports = emailTextForNewUser;