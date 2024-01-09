
// Vytvorenie textu emailu s cestou
const emailTextForSendMyRoute = (username, routeInfo) => {

  const ALL_ROUTES = routeInfo.allCoord.map(item => {
    return item.address.label
  });

  return `
       <html>
       <body>
       <h3>Ahoj, ${username}!</h3>
       <p>Tu sú informácie o tvojej trase:</p>
   
       <h3>Názov trasy:</h3>
       <p>${routeInfo.routeName}</p>
   
       <h3>Pôvodné miesto:</h3>
       <p>${routeInfo.startCoord.address.label}</p>
       <h3>Súradnice miesta:</h3>
       <p>${routeInfo.startCoord.latLng}</p>
       
       <p>----------------------------------------------------------------</p>
       <h3>Pridane miesta:</h3>
       <ul>
          ${ALL_ROUTES.map(route => `<li>${route}</li>`).join('')}
       </ul>
       <p>----------------------------------------------------------------</p>
       
       <h3>Koncové miesto:</h3>
       <p>${routeInfo.endCoord.address.label}</p>
       <h3>Súradnice miesta:</h3>
       <p>${routeInfo.endCoord.latLng}</p>

       <p>----------------------------------------------------------------</p>
       <p>Dĺžka trasy: ${routeInfo.distanceRoute}</p>
       <p>Čas trasy: ${routeInfo.timeRoute}</p>
       <p>----------------------------------------------------------------</p>
   
       <p>Ďakujeme, že používaš našu službu!</p>
     </body>
       </html>
      `;
};

module.exports = emailTextForSendMyRoute;




