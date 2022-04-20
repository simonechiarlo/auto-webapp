goto(null,'patenti')
reader = new FileReader();

patenti = null;
vetture = null;
manutenzioni = null;
getData()



async function getData(){
    try{
        response = await fetch('/data')
        data = await response.json();

    }
    catch{
        data = JSON.parse(`[
    
            [
                {"nomeTitolare":"example","numeroPatente":"example","categoria":"example","dataRilascio":"example","dataScadenza":"example"},
                {"nomeTitolare":"example","numeroPatente":"example","categoria":"example","dataRilascio":"example","dataScadenza":"example"},
                {"nomeTitolare":"example","numeroPatente":"example","categoria":"example","dataRilascio":"example","dataScadenza":"example"},
                {"nomeTitolare":"example","numeroPatente":"example","categoria":"example","dataRilascio":"example","dataScadenza":"example"}
            ],
            [
                {"targa":"example","libretto":"example","annoImmatricolazione":"example","marca":"example","modello":"example","assic":"example","scadAss":"example","scadBollo":"example","scadRevisione":"example","ultimoCambioPneumatici":"example","ultimoTagliando":"example"},
                {"targa":"example","libretto":"example","annoImmatricolazione":"example","marca":"example","modello":"example","assic":"example","scadAss":"example","scadBollo":"example","scadRevisione":"example","ultimoCambioPneumatici":"example","ultimoTagliando":"example"},
                {"targa":"example","libretto":"example","annoImmatricolazione":"example","marca":"example","modello":"example","assic":"example","scadAss":"example","scadBollo":"example","scadRevisione":"example","ultimoCambioPneumatici":"example","ultimoTagliando":"example"},
                {"targa":"example","libretto":"example","annoImmatricolazione":"example","marca":"example","modello":"example","assic":"example","scadAss":"example","scadBollo":"example","scadRevisione":"example","ultimoCambioPneumatici":"example","ultimoTagliando":"example"}
            ],
            [
                {"targa":"example","data":"example","tipo":"example","spesa":"example","chilometri":"example"},
                {"targa":"example","data":"example","tipo":"example","spesa":"example","chilometri":"example"},
                {"targa":"example","data":"example","tipo":"example","spesa":"example","chilometri":"example"},
                {"targa":"example","data":"example","tipo":"example","spesa":"example","chilometri":"example"}
            ]
        ]`)
    }
  
    //console.log(data);
    
    
    
    patenti = data[0];
    vetture = data[1];
    manutenzioni = data[2];
    mostra()
   
}
{ //gestione patenti

    patenteSelezionata = null;
    indexOfpatenteSelezionata = null;
    
    function selezionaPatente(num){
        //console.log(num);
        indexOfpatenteSelezionata = num;
        patenteSelezionata = patenti[num]
        dettagliPatente();
        
    }
    
    function dettagliPatente(){
        $("#editPatenti").empty();
        addToPatenti=`
        <div id="dettagliPatente">
        <p>nomeTitolare:</p><input readonly type="text" value="${patenteSelezionata.nomeTitolare}"> </input>
        <p>numeroPatente:</p><input readonly type="text" value="${patenteSelezionata.numeroPatente}"> </input>
        <p>categoria:</p><input readonly type="text" value="${patenteSelezionata.categoria}"> </input>
        <p>dataRilascio:</p><input readonly type="date" value="${patenteSelezionata.dataRilascio}"> </input>
        <p>dataScadenza:</p><input readonly type="date" value="${patenteSelezionata.dataScadenza}"> </input>
        </div>
        <p id="modificaPatenti" onclick="abilitaModificaPatenti()">Modifica</p>
        `
        $("#editPatenti").append(addToPatenti)
        
        
    }
    
    function abilitaModificaPatenti(){
        $("#modificaPatenti").remove()
        $("#editPatenti input").attr("readonly",false);
        $("#editPatenti").append(`
        <p onclick="salvaPatenti()">Salva</p>
        <p onclick="annullaPatenti()">Annula</p>
        `)
    }
        
    function salvaPatenti(){
        nuovaPatente = new Array;
        for(el of $("#dettagliPatente").find("input")) nuovaPatente.push(el.value);
        
        patenti[indexOfpatenteSelezionata].nomeTitolare= nuovaPatente[0]
        patenti[indexOfpatenteSelezionata].numeroPatente= nuovaPatente[1]
        patenti[indexOfpatenteSelezionata].categoria= nuovaPatente[2]
        patenti[indexOfpatenteSelezionata].dataRilascio= nuovaPatente[3]
        patenti[indexOfpatenteSelezionata].dataScadenza= nuovaPatente[4]
        mostra();
        dettagliPatente();
        
        //console.log(nuovaPatente);
    }

    function annullaPatenti(){
        dettagliPatente();
    }

} // end of gestione patenti


{ //gestione vetture

    vetturaSelezionata = null;
    indexOfvetturaSelezionata = null;
    
    function selezionaVettura(num){
        //console.log(num);
        indexOfvetturaSelezionata = num;
        vetturaSelezionata = vetture[num]
        dettagliVettura();
        
    }
    
    function dettagliVettura(){
        $("#editVetture").empty();
        addToVetture=`
        <div id="dettagliVettura">
        <p>targa:</p><input readonly type="text" value="${vetturaSelezionata.targa}"> </input>
        <p>nlibretto:</p><input readonly type="text" value="${vetturaSelezionata.libretto}"> </input>
        <p>annoImmatricolazione:</p><input readonly type="date" value="${vetturaSelezionata.annoImmatricolazione}"> </input>
        <p>marca:</p><input readonly type="text" value="${vetturaSelezionata.marca}"> </input>
        <p>modello:</p><input readonly type="text" value="${vetturaSelezionata.modello}"> </input>
        <p>assic:</p><input readonly type="text" value="${vetturaSelezionata.assic}"> </input>
        <p>scadAss:</p><input readonly type="date" value="${vetturaSelezionata.scadAss}"> </input>
        <p>scadBollo:</p><input readonly type="date" value="${vetturaSelezionata.scadBollo}"> </input>
        <p>scadRevisione:</p><input readonly type="date" value="${vetturaSelezionata.scadRevisione}"> </input>
        <p>ultimoCambioPneumatici:</p><input readonly type="date" value="${vetturaSelezionata.ultimoCambioPneumatici}"> </input>
        <p>ultimoTagliando:</p><input readonly type="text" value="${vetturaSelezionata.ultimoTagliando}"> </input>
        </div>
        <p id="modificaVetture" onclick="abilitaModificaVetture()">Modifica</p>
        `
        $("#editVetture").append(addToVetture)
        
        
    }
    
    function abilitaModificaVetture(){
        $("#modificaVetture").remove()
        $("#editVetture input").attr("readonly",false);
        $("#editVetture").append(`
        <p onclick="salvaVetture()">Salva</p>
        <p onclick="annullaVetture()">Annula</p>
        `)
    }
        
    function salvaVetture(){
        nuovaVettura = new Array;
        for(el of $("#dettagliVettura").find("input")) nuovaVettura.push(el.value);
        //console.log(vetture[indexOfvetturaSelezionata]);
        
        vetture[indexOfvetturaSelezionata].targa= nuovaVettura[0]
        vetture[indexOfvetturaSelezionata].libretto= nuovaVettura[1]
        vetture[indexOfvetturaSelezionata].annoImmatricolazione= nuovaVettura[2]
        vetture[indexOfvetturaSelezionata].marca= nuovaVettura[3]
        vetture[indexOfvetturaSelezionata].modello= nuovaVettura[4]
        vetture[indexOfvetturaSelezionata].assic= nuovaVettura[5]
        vetture[indexOfvetturaSelezionata].scadAss= nuovaVettura[6]
        vetture[indexOfvetturaSelezionata].scadBollo= nuovaVettura[7]
        vetture[indexOfvetturaSelezionata].scadRevisione= nuovaVettura[8]
        vetture[indexOfvetturaSelezionata].ultimoCambioPneumatici= nuovaVettura[9]
        vetture[indexOfvetturaSelezionata].ultimoTagliando= nuovaVettura[10]
        mostra();
        dettagliVettura();
        
    }

    function annullaVetture(){
        dettagliVettura();
    }

} // end of gestione vetture



{ //gestione manutenzioni

    manutenzioneSelezionata = null;
    indexOfmanutenzioneSelezionata = null;
    
    function selezionaManutenzione(num){
        //console.log(num);
        indexOfmanutenzioneSelezionata = num;
        manutenzioneSelezionata = manutenzioni[num]
        dettagliManutenzione();
        
    }
    
    function dettagliManutenzione(){
        $("#editManutenzioni").empty();
        addToManutenzioni=`
        <div id="dettagliManutenzione">
        <p>targa:</p><input readonly type="text" value="${manutenzioneSelezionata.targa}"> </input>
        <p>data:</p><input readonly type="date" value="${manutenzioneSelezionata.data}"> </input>
        <p>tipo:</p><input readonly type="text" value="${manutenzioneSelezionata.tipo}"> </input>
        <p>spesa:</p><input readonly type="text" value="${manutenzioneSelezionata.spesa}"> </input>
        <p>chilometri:</p><input readonly type="text" value="${manutenzioneSelezionata.chilometri}"> </input>
        </div>
        <p id="modificaManutenzioni" onclick="abilitaModificaManutenzioni()">Modifica</p>
        `
        $("#editManutenzioni").append(addToManutenzioni)
        
        
    }
    
    function abilitaModificaManutenzioni(){
        $("#modificaManutenzioni").remove()
        $("#editManutenzioni input").attr("readonly",false);
        $("#editManutenzioni").append(`
        <p onclick="salvaManutenzioni()">Salva</p>
        <p onclick="annullaManutenzioni()">Annula</p>
        `)
    }
        
    function salvaManutenzioni(){
        nuovaManutenzione = new Array;
        for(el of $("#dettagliManutenzione").find("input")) nuovaManutenzione.push(el.value);
        
        manutenzioni[indexOfmanutenzioneSelezionata].targa= nuovaManutenzione[0]
        manutenzioni[indexOfmanutenzioneSelezionata].data= nuovaManutenzione[1]
        manutenzioni[indexOfmanutenzioneSelezionata].tipo= nuovaManutenzione[2]
        manutenzioni[indexOfmanutenzioneSelezionata].spesa= nuovaManutenzione[3]
        manutenzioni[indexOfmanutenzioneSelezionata].chilometri= nuovaManutenzione[4]
        mostra();
        dettagliManutenzione();
        
        //console.log(nuovaManutenzione);
    }

    function annullaManutenzioni(){
        dettagliManutenzione();
    }

} // end of gestione manutenzioni






function mostra(){
    $("#sidePatenti").empty()
    addToPatenti = new String
    addToVetture = new String
    addToManutenzioni = new String
    let i =0
    //console.log(patenti);
    for(let patente of patenti){
        addToPatenti+=`
        <div class="rigaContent" onclick="selezionaPatente(${i})">
        <p> ${patente.nomeTitolare} </p>
        </div>`
        i++
    }


    $("#sideVetture").empty()
    i =0
    for(let vettura of vetture){
        addToVetture+=`
        <div class="rigaContent" onclick="selezionaVettura(${i})">
        <p> ${vettura.targa} </p>
        </div>`
        i++
    }
    i =0


    $("#sideManutenzioni").empty()
    i =0
    for(let manutenzione of manutenzioni){
        addToManutenzioni+=`
        <div class="rigaContent" onclick="selezionaManutenzione(${i})">
        <p> ${manutenzione.targa} </p>
        </div>`
        i++
    }
    i =0
    

    $("#sidePatenti").append(addToPatenti)
    $("#sideVetture").append(addToVetture)
    $("#sideManutenzioni").append(addToManutenzioni)
}


function sendData(){
    fetch('/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        patenti,
        vetture,
        manutenzioni
    }),
  })}



  function goto(evt, tabname) {
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabname).style.display = "block";
    if(evt) evt.currentTarget.className += " active";
  }




//carica csv
function load(dest,inp){
    if(!inp.value) return;   // value è una stringa, è vuota (e falsa) se non ci sono files... ora non serve più, ma buono a sapersi

    if(dest != null)alert("occhio che la destinazione non è vuota") // mettici una scelta
    reader.readAsText(inp.files[0]);
    reader.onloadend = ()=>{
        dest = JSON.parse(reader.result);
        //console.log(dest);
    }
}
