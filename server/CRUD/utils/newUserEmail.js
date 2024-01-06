
    // Vytvorenie textu emailu s informáciami o novom používateľovi
    const emailText = (username, password) => {
        return `
          Vitajte, ${username}!\n\n
          Ďakujeme za registráciu na našom webovom portáli.\n
          Tu sú vaše prihlasovacie údaje:\n
          Používateľské meno: ${username}\n
          Heslo: ${password}\n\n
          Ďakujeme, že ste s nami!
        `;
      };

      module.exports = emailText;