( function(){

    async function finishUp (busAddr) {
        if (busAddr) {
        alert("Found business " + busAddr.name + " at "+ busAddr.address )
        return busAddr;
        } else {
            alert("Sorry, no businesses found.")
        } 
    }

    //function to seperate and check each address against the business list
    async function checkData(addr,bus) {
        let addrArr = [];
        //seperate the addresses from the rest of the data
        addr.map( item => {
            addrArr.push(item.addresses)
        })
        console.log("checkData final array of addresses: ", addrArr )
        addrArr.map( addressStr => {
            console.log("Compare address: ", addressStr[0] );
            if ( addressStr[0].includes("1054a Springfield Ave")) {
                console.log("This is when an address matches");
                var dataObj = {
                    name: "Acme Assholes",
                    address: "123 4th Street"
                }

               // dataObj=null;
                return finishUp(dataObj)
            }
        })
    }//end checkData

    async function getCSV(){
        let csvArr = [];
        const datafile = './data.csv';

      return d3.csv(datafile , function(data){
              csvArr = [
                  {data: "one"},
                  {data: "two"}
              ]  

            return getAddr(csvArr);
        });   
    }//end getCSV

    async function getAddr(csvData){
        let response = await fetch(`https://sleepy-everglades-99189.herokuapp.com/tracks`);
        let data = await response.json()
        //console.log("Get address data: ", data )

        return await checkData(data,csvData);
    }

    async function findAddress() {
        console.log("Give me the func..");
        const csvData = await getCSV();
        console.log("csvData: ", csvData );
        return  csvData;
    }//end async

    findAddress().then (result =>{
        console.log("Find Address Results: ", result );
    
    })
})()//end iffy

