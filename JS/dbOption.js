"use strict";
function dbOpenDB(dbName, version = 1) {
    return new Promise((resolve, reject) => {
        var indexedDB = window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
        let db;
        const request = indexedDB.open(dbName, version);
        request.onsuccess = function (event) {
            db = event.target.result;
            console.log("数据库打开成功");
            resolve(db);
        };
        request.onerror = function (event) {
            console.log("数据库打开报错");
        };
        request.onupgradeneeded = function (event) {
            console.log("onupgradeneeded");
            db = event.target.result;
            var objectStore;
            objectStore = db.createObjectStore("signalChat", {
                keyPath: "sequenceId",
            });
            objectStore.createIndex("link", "link", { unique: false });
            objectStore.createIndex("sequenceId", "sequenceId", { unique: false });
            objectStore.createIndex("messageType", "messageType", {
                unique: false,
            });
        };
    });
}
function dbAddData(db, storeName, data) {
    var request = db
        .transaction([storeName], "readwrite")
        .objectStore(storeName)
        .add(data);
    request.onsuccess = function (event) {
        console.log("数据写入成功");
    };
    request.onerror = function (event) {
        console.log("数据写入失败");
    };
}
function dbGetDataByKey(db, storeName, key) {
    return new Promise((resolve, reject) => {
        var transaction = db.transaction([storeName]);
        var objectStore = transaction.objectStore(storeName);
        var request = objectStore.get(key);
        request.onerror = function (event) {
            console.log("事务失败");
        };
        request.onsuccess = function (event) {
            console.log("主键查询结果: ", request.result);
            resolve(request.result);
        };
    });
}
function dbCursorGetData(db, storeName) {
    let list = [];
    var store = db
        .transaction(storeName, "readwrite")
        .objectStore(storeName);
    var request = store.openCursor();
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            list.push(cursor.value);
            cursor.continue();
        }
        else {
            console.log("游标读取的数据：", list);
        }
    };
}
function dbGetDataByIndex(db, storeName, indexName, indexValue) {
    var store = db.transaction(storeName, "readwrite").objectStore(storeName);
    var request = store.index(indexName).get(indexValue);
    request.onerror = function () {
        console.log("事务失败");
    };
    request.onsuccess = function (e) {
        var result = e.target.result;
        console.log("索引查询结果：", result);
    };
}
function dbCursorGetDataByIndex(db, storeName, indexName, indexValue) {
    let list = [];
    var store = db.transaction(storeName, "readwrite").objectStore(storeName);
    var request = store
        .index(indexName)
        .openCursor(IDBKeyRange.only(indexValue));
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            list.push(cursor.value);
            cursor.continue();
        }
        else {
            console.log("游标索引查询结果：", list);
        }
    };
    request.onerror = function (e) { };
}
function dbCursorGetDataByIndexAndPage(db, storeName, indexName, indexValue, page, pageSize) {
    let list = [];
    let counter = 0;
    let advanced = true;
    var store = db.transaction(storeName, "readwrite").objectStore(storeName);
    var request = store
        .index(indexName)
        .openCursor(IDBKeyRange.only(indexValue));
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (page > 1 && advanced) {
            advanced = false;
            cursor.advance((page - 1) * pageSize);
            return;
        }
        if (cursor) {
            list.push(cursor.value);
            counter++;
            if (counter < pageSize) {
                cursor.continue();
            }
            else {
                cursor = null;
                console.log("分页查询结果", list);
            }
        }
        else {
            console.log("分页查询结果", list);
        }
    };
    request.onerror = function (e) { };
}
function dbUpdateDB(db, storeName, data) {
    var request = db
        .transaction([storeName], "readwrite")
        .objectStore(storeName)
        .put(data);
    request.onsuccess = function () {
        console.log("数据更新成功");
    };
    request.onerror = function () {
        console.log("数据更新失败");
    };
}
function dbDeleteDB(db, storeName, id) {
    var request = db
        .transaction([storeName], "readwrite")
        .objectStore(storeName)
        .delete(id);
    request.onsuccess = function () {
        console.log("数据删除成功");
    };
    request.onerror = function () {
        console.log("数据删除失败");
    };
}
function dbCursorDelete(db, storeName, indexName, indexValue) {
    var store = db.transaction(storeName, "readwrite").objectStore(storeName);
    var request = store
        .index(indexName)
        .openCursor(IDBKeyRange.only(indexValue));
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        var deleteRequest;
        if (cursor) {
            deleteRequest = cursor.delete();
            deleteRequest.onerror = function () {
                console.log("游标删除该记录失败");
            };
            deleteRequest.onsuccess = function () {
                console.log("游标删除该记录成功");
            };
            cursor.continue();
        }
    };
    request.onerror = function (e) { };
}
function dbCloseDB(db) {
    db.close();
    console.log("数据库已关闭");
}
function dbDeleteDBAll(dbName) {
    console.log(dbName);
    let deleteRequest = window.indexedDB.deleteDatabase(dbName);
    deleteRequest.onerror = function (event) {
        console.log("删除失败");
    };
    deleteRequest.onsuccess = function (event) {
        console.log("删除成功");
    };
}
