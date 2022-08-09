const BASE_API = 'https://api.covalenthq.com/v1/'
const API_KEY = 'ckey_3c37381716b14c1ea1571de52a6'
const CHAIN_ID = '1'
const ADDRESS = 'demo.eth'
const displayAPI = document.getElementById('displayItems')
document.cookie = "AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax";

let pageNumber = document.getElementById('page-number').innerHTML
let buttonPrev = document.getElementById('prev')
let buttonNext = document.getElementById('next')


let maxPage 
if(pageNumber == 1){
    newAPI(1)
}

const handlePage = (type) =>{
    displayAPI.innerHTML = null
    let pageNumber = document.getElementById('page-number')
    let currentPage = Number.parseInt(pageNumber.innerHTML)
    
    if(type == 'next'){
        
        const handleAdd = (currentPage) =>{
            let add = currentPage + 1
            return add
        }
        pageNumber.innerHTML = handleAdd(currentPage)
    }
    if(type == 'prev'){
        
        const handleMin = (currentPage) =>{
            let min = currentPage - 1
            return min
        }
        pageNumber.innerHTML = handleMin(currentPage)
    }
    let pageNumberInteger = Number.parseInt(pageNumber.innerHTML)
    newAPI(pageNumberInteger)
}

function newAPI(page){

    if(page <= 1 ){
        buttonPrev.disabled = true
    }else{
        buttonPrev.disabled = false
    }

    if(page == maxPage){
        buttonNext.disabled = true
    }else{
        buttonNext.disabled = false
    }
    let getA 
    fetch(`${BASE_API}${CHAIN_ID}/address/${ADDRESS}/balances_v2/?&key=${API_KEY}`,{
        method : "GET",
        accept : "application/json" 
        })
        .then( res => res.json())
        .then( res =>{ 
            const dataArr = res.data.items
            console.log(dataArr);
            let displayItems = page<=1? 0 : 10 * (page - 1)
            let currentPageItems = 10 * page
            maxPage = Number.parseInt( dataArr.length/10 + 1)
            for(displayItems; displayItems<currentPageItems; displayItems++){
                displayAPI.innerHTML += 
                `
                    <li id="displayItems">
                        <h3>name = ${dataArr[displayItems].contract_name}</h3>
                        <h4type = >${dataArr[displayItems].type}</h4type>
                        <h5>contract-address = ${dataArr[displayItems].contract_address}</h5>
                        <p>contract-decimals = ${dataArr[displayItems].contract_decimals}</p>
                        <p>last-transferred-at = ${dataArr[displayItems].last_transferred_at}</p>
                        <img style="width:30px" src="${dataArr[displayItems].logo_url}" alt=""/>
                    </li>
                `
            }
            
        })
        .catch( err => console.log(err))
}
