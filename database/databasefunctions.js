import * as SQLite from 'expo-sqlite'

// API call to get data
export async function getAllData()
    {
    const response = await fetch('http://api.vlexum.com:3000/fish')
    const data = await response.json()

    return data;
    }

// function to download db to local db
export async function downloadDatabase()
    {
    // open/make local database
    const db = SQLite.openDatabase("fish.db");
    const data = await getAllData();


    // // testing function that prints out whatever index of data your tryna see. Can also print whole thing
    // const printInfo = (_array) => {
    // console.log("Download success! printing data at chosen index (zero probably)\n");
    // //console.log(Object.values(_array[1]));
    // console.log(_array[0]);
    //
    // };

    // start DATABASE transaction
    db.transaction(tx => {

        // drop old table on app start (MIGHT REMOVE)
        tx.executeSql("DROP TABLE IF EXISTS fishTable;", [])

        // check if local table exists first
        tx.executeSql(
        "create table if not exists fishTable (hex integer prmiary key not null, lastCaught date, length integer, pit varchar(100), riverMile float, species varchar(100));",
        []
        );

        //upload data to local database
        for (var i = 0; i < data.length; i++)
        {
        const array = data[i];

        tx.executeSql("INSERT INTO fishTable (hex, lastCaught, length, pit, riverMile, species) VALUES (?, ?, ?, ?, ?, ?)",
                        [array.hex, array.lastCaught, array.length, array.pit, array.riverMile, array.species])
        }

        console.log("database download complete");


        // // function for testing, just selects the table to print it out and stuff. printInfo above is called for this
        //         tx.executeSql(
        // "select * from fishTable",
        // null,
        // // success
        // (_, { rows: { _array } }) => printInfo(_array),
        // // error
        // () => console.log("error fetching")
        //             );

    });
    }
