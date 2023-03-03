import * as SQLite from 'expo-sqlite'
import { Alert } from 'react-native';
import React, {useState} from "react";

// API call to get data
export async function getAllData(){
  const response = await fetch('http://api.teamphysh.com:3000/fish')
  const data = await response.json()

  return data;
}

// API call to get newest data than current date
export async function getNewData(date) {
  const response = await fetch('http://api.teamphysh.com:3000/fish/sync/'+date)
  const data = await response.json()

  return data;
}

// function to download db to local db
export async function downloadDatabase() {
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
    tx.executeSql("DROP TABLE IF EXISTS fishTable;", []);

    // check if local table exists first
    tx.executeSql(
    "create table if not exists fishTable (hex integer prmiary key not null, lastCaught date, length integer, pit varchar(100), riverMile float, species varchar(100));",
    []
    );


    // drop date table
    tx.executeSql(
      "DROP TABLE IF EXISTS recentDate;",
      []
      );
    // create table entry to store date
    tx.executeSql(
      "create table if not exists recentDate (idNum integer primary key not null, lastSync date);",
      []
      );
    // store sync date
    tx.executeSql("INSERT INTO recentDate (idNum, lastSync) VALUES (?, ?)",
    [1, getCurrentDateNonReadable()])
    

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

    // drop everything test
    // tx.executeSql("DROP TABLE IF EXISTS catchTable;", []);
    // tx.executeSql("DROP TABLE IF EXISTS fishTable;", []);
    // tx.executeSql("DROP TABLE IF EXISTS history;", []);

  });


}

// Uploads catch data and clears catch table
export async function uploadDatabase(data) {

  await fetch( "http://api.teamphysh.com:3000/fish/data" , {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

    body: JSON.stringify(data)
  }).then( response => {
    // return response.json();
      console.log("Sent Data");
      // console.log(response.json());
  })
  .catch(error => {
    console.log("ERROR");
  })

  // clear recent catches
  clearRecent()
}

// clears recent catches
export async function clearRecent() {
  const db = SQLite.openDatabase("fish.db");
  
  // start DATABASE transaction
  db.transaction(tx => {

    // drop old table on app start (MIGHT REMOVE)
    tx.executeSql("DROP TABLE IF EXISTS catchTable;", []);
  });
}

// clears local database (Whole thing)
export async function clearLocal() {
  const db = SQLite.openDatabase("fish.db");
    
  // start DATABASE transaction
  db.transaction(tx => {

    // drop old table on app start (MIGHT REMOVE)
    tx.executeSql("DROP TABLE IF EXISTS fishTable;", []);
  });
}


function inserter(array){

  const db = SQLite.openDatabase("fish.db");

  db.transaction(tx => {

    tx.executeSql("INSERT INTO fishTable (hex, lastCaught, length, pit, riverMile, species) VALUES (?, ?, ?, ?, ?, ?)",
                          [array.hex, array.lastCaught, array.length, array.pit, array.riverMile, array.species])

  });
}

// This function first gets the newest data (newer than current last retrieved date)
// and then it download and stores it and updates the date. 
export async function updateDatabase() {
    // open/make local database
    const db = SQLite.openDatabase("fish.db");
    
    db.transaction(tx => {

      const useDate = async (_array) => {

        // get date
        var retrievedDate = Object.values(_array[0]);

        console.log("USED DATE:");
        console.log(retrievedDate[1]);

        // retrieve data from date
        const data = await getNewData(retrievedDate[1]);
        console.log("NEW DATA:");
        console.log(data);

        //upload data to local database
        for (var i = 0; i < data.length; i++)
        {
          const array = data[i];

          // call inserter to insert because it is non-async
          inserter(array);
        }
        

        };

      // retrieve new data
      tx.executeSql(
        "select * from recentDate WHERE idNum = ?",
        [1],
        // success
        (_, { rows: { _array } }) => useDate(_array),
        // error
        () => console.log("date table error when updating")
                    );
    

      // PROBLEM: We upload our data and then try to download the new data with our data in it. our data we just sent isnt included
      // this is most likly because the post request is async and were downloading all the new values before its officially posted
      // BASICALLY: DATA THAT WAS JUST UPLOADED HASNT REACHED SERVER, AND WE ARE ASKING FOR IT BACK. make sometihng non-async to fix
      // update last date
      tx.executeSql("UPDATE recentDate SET lastSync = ? WHERE idNum = ?;",
                      [getCurrentDateNonReadable(), 1]
                      );
    });



    
}

// date grabber function. gets current date/time FORMATTED TO READ!
// commented out block is for if we want to get ride of timestamp and just use date
export function getCurrentDate() {

  var date;
  date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  //date = new Date();
  // if we dont want seconds/minutes
  // date = date.getUTCFullYear() + '-' +
  // ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
  // ('00' + date.getUTCDate()).slice(-2);

  return date;//format: d-m-y H:M:S;
}

// date grabber function. gets current date/time NOT FORMATTED TO READ! Just used by updateDatabase currently
export function getCurrentDateNonReadable() {

  var date = new Date();
  var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                date.getUTCDate(), date.getUTCHours(),
                date.getUTCMinutes(), date.getUTCSeconds());

  return date.toISOString();//format: d-m-y H:M:S;
}



