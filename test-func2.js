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
        console.log("checkData - addresses: ",addr," csv: ",bus  )
        let addrArr = [];
        //seperate the addresses from the rest of the data
        addr.map( item => {
            addrArr.push(item.addresses)
        })
        console.log("checkData final array of addresses: ", addrArr );
        console.log("checkData final array of businessess: ", bus );
        let newArr = [];

        addrArr.map (str =>{
            console.log("mapping out the address string: ", typeof(str) );
            //const bowstr = str.split(',');
            newArr.push(str[0])
            console.log("mapping strings to array: ", str[0] )
        })

       /*   1) each array element contains a coma delimited string
            2) convert each string into an array
            3) compare each element in the array to Business Address Object
            4) If there is a match return the address

       */

       console.log("Shazam: ", newArr );

       /*compare the two arrays
             map thru newArr comparing the string to the address of bus.
       */

    bus.map(business =>{
    //    console.log("bus.map: ", business.address )
    //    console.log("can I see the sddresses: ", newArr )
        newArr.map(addr => {
        //    console.log("newArr.map: ", addr.split(','))
            const myArr = addr.split(',');
            myArr.map( item =>{
                console.log("single item: ", item ," compared to: ", business.address);
                if (item == business.address ) {
                    alert("We have a winner!!!")
                }//end iff
            })//end myArr map
        })//newArr map
    })//bus.map

    return true
    /*    addrArr.map( addressStr => {
    //        console.log("Compare address: ", addressStr[0] );
            if ( addressStr[0].includes("1054a Springfield Ave")) {
    //            console.log("This is when an address matches");
                var dataObj = {
                    name: "Acme Assholes",
                    address: "123 4th Street"
                }

               // dataObj=null;
                return finishUp(dataObj)
            }
        }) //end arrArrMap whatever */

    }//end checkData

    async function getCSV(){
        console.log("getCSV")
        let csvArr = [];
        const datafile = './data.csv';

      return d3.csv(datafile , function(data){

        var csvRows    = JSON.stringify(data).split(/\n/);
        //console.log("csvRows: ", csvRows );

        for ( var i = 0; i < data.length ; ++i ) {
        //    console.log("Business name: ", data[i]["Business Name"]," : " ,data[i]["Address"] );
        //    console.log("Address: ", data[i].Address );
            let businessObj = {
                name: data[i]["Business Name"],
                address: data[i].Address
            }
            csvArr.push(businessObj);
        } //end for
    //    console.log("d3.csv - csvArr: ", csvArr )
        getAddr(csvArr);
        });   
    }//end getCSV

    async function getAddr(csvArr ){
    //console.log("getAddr - csvArr: ", csvArr );
        let response = await fetch(`https://sleepy-everglades-99189.herokuapp.com/tracks`);
        let data = await response.json()

    //    const csvData = await getCSV()s
    //    console.log("getAddr - data: ", data );
    //    console.log("getAddr - csvArr");
        return await checkData(data,csvArr);
    }

    async function findAddress() {
        console.log("Give me the func..");
        const csvData = await getCSV();
       // const addressData = await getAddr();
        //console.log("csvData: ", csvData );
      //  console.log("addressData: ", addressData)
        //return  csvData;
        //return await checkData(addressData,csvData)
    }//end async

    findAddress().then (result =>{
        console.log("Find Address Results: ", result );
    
    })
})()//end iffy

