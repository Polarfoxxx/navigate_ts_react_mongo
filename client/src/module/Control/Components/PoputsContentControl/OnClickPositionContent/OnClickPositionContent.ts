



const handleDeleteClick = (): void => {
    console.log("dd");
}



const ON_CLICK_POSITION_CONTENT = `
<div >
    <button id="deleteButton">delete</button>
</div>
`;

// Přidání posluchače události v JavaScript kódu
const dd = document.getElementById('deleteButton') as HTMLButtonElement 
if(dd) {
    dd.addEventListener('click', handleDeleteClick);

}


export default ON_CLICK_POSITION_CONTENT;