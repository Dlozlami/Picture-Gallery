import * as SQLite from "expo-sqlite";
import { useState } from "react";

export const initializeDatabase = () => {
  const db = SQLite.openDatabase("picgallery.db");
  console.log("DB connected....");
  createTableAlbum(db); // Create the Album table if it doesn't exist
  return db;
};

export const createTableAlbum = (db) => {
  console.log("createTableAlbum running....");
  // Check if the Album table already exists
  db.transaction((tx) => {
    tx.executeSql(
      `
          SELECT name
          FROM sqlite_master
          WHERE type='table' AND name='Album';
          `,
      [],
      (_, result) => {
        if (result.rows.length === 0) {
          // Create the Album table if it doesn't exist
          tx.executeSql(
            `
                CREATE TABLE Album (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  photo TEXT,
                  streetaddress TEXT,
                  district TEXT,
                  city TEXT,
                  country TEXT,
                  postal_code TEXT
                );
                `,
            [],
            () => {
              console.log("Album table created successfully.");
            },
            (_, error) => {
              console.error("Error creating Album table:", error);
            }
          );
        } else {
          console.log("Album table already exists.");
        }
      },
      (_, error) => {
        console.error("Error checking for Album table:", error);
      }
    );
  });
};

export const insertPhotoData = (db, photoData) => {
  db.transaction((tx) => {
    tx.executeSql(
      `
          INSERT INTO Album (photo, streetaddress, district, city, country, postal_code)
          VALUES (?, ?, ?, ?, ?, ?);
          `,
      [
        photoData.photo,
        photoData.streetaddress,
        photoData.district,
        photoData.city,
        photoData.country,
        photoData.postal_code,
      ],
      (_, result) => {
        console.log("Photo inserted successfully.");
      },
      (_, error) => {
        console.error("Error inserting photo:", error);
      }
    );
  });
};

export const countPhotoRecords = (db, callback) => {
  console.log("print 4");
  db.transaction((tx) => {
    tx.executeSql(
      `
      SELECT COUNT(*) AS count
      FROM Album;
      `,
      [],
      (_, result) => {
        const count = result.rows.item(0).count;
        callback(count);
      },
      (_, error) => {
        console.error("Error counting photo records:", error);
      }
    );
  });
};
