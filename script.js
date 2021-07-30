const resultadoBody = document.querySelector('.resultado')
const valorDoReal = document.querySelector('.valorReal');
const cardDolar = document.querySelector('.dolar');
const cardIene = document.querySelector('.iene');


valorDoReal.addEventListener('change', buscarPreço)

function buscarPreço(){
    fetch('https://economia.awesomeapi.com.br/json/last/BRL-USD,BRL-JPY,USD-JPY,JPY-USD,USD-BRL,JPY-BRL')
    .then(res => res.json())
    .then(resJson => {
        let compraDolarReais = valorDoReal.value * resJson.BRLUSD.bid;
        let compraIeneReais = valorDoReal.value * resJson.BRLJPY.bid;
        let dolarCompraIene = compraDolarReais * resJson.USDJPY.bid;

        

        if (dolarCompraIene >  compraIeneReais){
            if ((dolarCompraIene - compraIeneReais) < 3) {
                const createP = document.createElement('p');
                createP.innerText = `Com R$ ${valorDoReal.value} BRL você compra a praticamente a mesma quantidade, seja comprando via USD ou JPY diretamente. A diferença é de apenas ¥ ${(dolarCompraIene - compraIeneReais).toFixed(2).replace('.',',')} JPY. `
                resultadoBody.appendChild(createP);
            } 
            else {
                const createP = document.createElement('p'); 
                createP.innerText = `Comprar USD e depois comprar JPY compra ¥ ${(dolarCompraIene - compraIeneReais).toFixed(2).replace('.',',')} JPY a mais do que BRL -> JPY diretamente. `
                resultadoBody.appendChild(createP);
            }           
        }
        else if (dolarCompraIene === compraIeneReais ) {
            if (!valorDoReal.value === 0 || !valorDoReal.value === '') {
                const createP = document.createElement('p'); 
                createP.innerText = `Com R$ ${valorDoReal.value} BRL você compra a mesma quantidade, seja comprando via USD ou JPY diretamente. `
                resultadoBody.appendChild(createP);
            }     
                  
        }
        else {
            const createP = document.createElement('p'); 
            createP.innerText = `Com R$ ${valorDoReal.value} BRL você compra ${compraIeneReais.toFixed(2)} JPY. `
            resultadoBody.appendChild(createP);  
        }

        cardDolar.innerHTML = `<p>Última cotação: </p>
                                <span>R$ ${(+resJson.USDBRL.bid).toFixed(2)}</span>
                                <p>Com R$ 1 você compra: </p>
                                <span>$ ${(+resJson.BRLUSD.bid).toFixed(2)} USD</span>
                                <p>Com R$ ${valorDoReal.value} você compra: </p>
                                <span>$ ${(compraDolarReais).toFixed(2)} USD</span>`;

        cardIene.innerHTML = `<p>Última cotação: </p>
                                <span>R$ ${(+resJson.JPYBRL.bid).toFixed(2)}</span>
                                <p>Com R$ 1 você compra: </p>
                                <span>¥ ${(+resJson.BRLJPY.bid).toFixed(2)} JPY</span>
                                <p>Com R$ ${valorDoReal.value} você compra: </p>
                                <span>¥ ${(compraIeneReais).toFixed(2)} JPY</span>`;

                                
    })

    
    
    resultadoBody.innerText='';

}