export default function dateFormater(data) {
   const dataObj = new Date(data);

   const dia = String(dataObj.getDate()).padStart(2, "0");
   const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
   const ano = String(dataObj.getFullYear()).slice(2);

   return `${dia}/${mes}/${ano}`;
}
