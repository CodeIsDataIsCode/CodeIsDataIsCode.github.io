"use strict";
/**
 * 打开数据库
 * @param {object} dbName 数据库的名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库的版本
 * @return {object} 该函数会返回一个数据库实例
 https://blog.csdn.net/qq_44760844/article/details/129533925?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7EPosition-2-129533925-blog-124562339.235%5Ev32%5Epc_relevant_default_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7EPosition-2-129533925-blog-124562339.235%5Ev32%5Epc_relevant_default_base3&utm_relevant_index=5


我们将创建数据库的操作封装成了一个函数，并且该函数返回一个promise对象，使得在调用的时候可以链式调用，函数主要接收两个参数：数据库名称、数据库版本。
函数内部主要有三个回调函数，分别是：
onsuccess：数据库打开成功或者创建成功后的回调，这里我们将数据库实例返回了出去。
onerror：数据库打开或创建失败后的回调。
onupgradeneeded：当数据库版本有变化的时候会执行该函数，比如我们想创建新的存储库（表），就可以在该函数里面操作，更新数据库版本即可。

 */
function dbOpenDB(dbName, version = 1) {
    return new Promise((resolve, reject) => {
        //  兼容浏览器
        var indexedDB = window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
        let db;
        // 打开数据库，若没有则会创建
        const request = indexedDB.open(dbName, version);
        // 数据库打开成功回调
        request.onsuccess = function (event) {
            db = event.target.result; // 数据库对象
            console.log("数据库打开成功");
            resolve(db);
        };
        // 数据库打开失败的回调
        request.onerror = function (event) {
            console.log("数据库打开报错");
        };
        // 数据库有更新时候的回调
        request.onupgradeneeded = function (event) {
            // 数据库创建或升级的时候会触发
            console.log("onupgradeneeded");
            db = event.target.result; // 数据库对象
            var objectStore;
            // 创建存储库
            objectStore = db.createObjectStore("signalChat", {
                keyPath: "sequenceId", // 这是主键
                // autoIncrement: true // 实现自增
            });
            // 创建索引，在后面查询数据的时候可以根据索引查
            objectStore.createIndex("link", "link", { unique: false });
            objectStore.createIndex("sequenceId", "sequenceId", { unique: false });
            objectStore.createIndex("messageType", "messageType", {
                unique: false,
            });
        };
    });
}
/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 
 IndexedDB插入数据需要通过事务来进行操作，插入的方法也很简单，利用IndexedDB提供的add方法即可，这里我们同样将插入数据的操作封装成了一个函数，接收三个参数，分别如下：

db：在创建或连接数据库时，返回的db实例，需要那个时候保存下来。
storeName：仓库名称(或者表名)，在创建或连接数据库时我们就已经创建好了仓库。
data：需要插入的数据，通常是一个对象

**【注意】：**插入的数据是一个对象，而且必须包含我们声明的索引键值对。
*/
function dbAddData(db, storeName, data) {
    var request = db
        .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
        .objectStore(storeName) // 仓库对象
        .add(data);
    request.onsuccess = function (event) {
        console.log("数据写入成功");
    };
    request.onerror = function (event) {
        console.log("数据写入失败");
    };
}
/**
 * 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 
 主键即刚刚我们在创建数据库时声明的keyPath，通过主键只能查询出一条数据。
 
 */
function dbGetDataByKey(db, storeName, key) {
    return new Promise((resolve, reject) => {
        var transaction = db.transaction([storeName]); // 事务
        var objectStore = transaction.objectStore(storeName); // 仓库对象
        var request = objectStore.get(key); // 通过主键获取数据
        request.onerror = function (event) {
            console.log("事务失败");
        };
        request.onsuccess = function (event) {
            console.log("主键查询结果: ", request.result);
            resolve(request.result);
        };
    });
}
/**
 * 通过游标读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称

上面函数开启了一个游标，然后逐行读取数据，存入数组，最终得到整个仓库的所有数据。

*/
function dbCursorGetData(db, storeName) {
    let list = [];
    var store = db
        .transaction(storeName, "readwrite") // 事务
        .objectStore(storeName); // 仓库对象
    var request = store.openCursor(); // 指针对象
    // 游标开启成功，逐行读数据
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            // 必须要检查
            list.push(cursor.value);
            cursor.continue(); // 遍历了存储对象中的所有内容
        }
        else {
            console.log("游标读取的数据：", list);
        }
    };
}
/**
 * 通过索引读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值

索引名称即我们创建仓库的时候创建的索引名称，也就是键值对中的键，最终会查询出所有满足我们传入函数索引值的数据。

*/
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
/**
 * 通过索引和游标查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值

上面函数接收四个参数，分别是：

db：数据库实例
storeName：仓库名
indexName：索引名称
indexName：索引值

利用索引和游标结合查询，我们可以查询出索引值满足我们传入函数值的所有数据对象，而不是之查询出一条数据或者所有数据。


*/
function dbCursorGetDataByIndex(db, storeName, indexName, indexValue) {
    let list = [];
    var store = db.transaction(storeName, "readwrite").objectStore(storeName); // 仓库对象
    var request = store
        .index(indexName) // 索引对象
        .openCursor(IDBKeyRange.only(indexValue)); // 指针对象
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            // 必须要检查
            list.push(cursor.value);
            cursor.continue(); // 遍历了存储对象中的所有内容
        }
        else {
            console.log("游标索引查询结果：", list);
        }
    };
    request.onerror = function (e) { };
}
/**
 * 通过索引和游标分页查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 * @param {number} page 页码
 * @param {number} pageSize 查询条数
这里用到了IndexedDB的一个API：advance。该函数可以让我们的游标跳过多少条开始查询。假如我们的额分页是每页10条数据，现在需要查询第2页，那么我们就需要跳过前面10条数据，从11条数据开始查询，直到计数器等于10，那么我们就关闭游标，结束查询。

*/
function dbCursorGetDataByIndexAndPage(db, storeName, indexName, indexValue, page, pageSize) {
    let list = [];
    let counter = 0; // 计数器
    let advanced = true; // 是否跳过多少条查询
    var store = db.transaction(storeName, "readwrite").objectStore(storeName); // 仓库对象
    var request = store
        .index(indexName) // 索引对象
        .openCursor(IDBKeyRange.only(indexValue)); // 指针对象
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (page > 1 && advanced) {
            advanced = false;
            cursor.advance((page - 1) * pageSize); // 跳过多少条
            return;
        }
        if (cursor) {
            // 必须要检查
            list.push(cursor.value);
            counter++;
            if (counter < pageSize) {
                cursor.continue(); // 遍历了存储对象中的所有内容
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
/**
 * 更新数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} data 数据

put方法接收一个数据对象。

*/
function dbUpdateDB(db, storeName, data) {
    var request = db
        .transaction([storeName], "readwrite") // 事务对象
        .objectStore(storeName) // 仓库对象
        .put(data);
    request.onsuccess = function () {
        console.log("数据更新成功");
    };
    request.onerror = function () {
        console.log("数据更新失败");
    };
}
/**
 * 通过主键删除数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} id 主键值
主键即我们创建数据库时申明的keyPath，它是唯一的。该种删除只能删除一条数据，必须传入主键。

*/
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
/**
 * 通过索引和游标删除指定的数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名
 * @param {object} indexValue 索引值
有时候我们拿不到主键值，只能只能通过索引值来删除，通过这种方式，我们可以删除一条数据（索引值唯一）或者所有满足条件的数据（索引值不唯一）。
上段代码可以删除索引值为indexValue的所有数据，值得注意的是使用了IDBKeyRange.only(）API，该API代表只能当两个值相等时，具体API解释可参考MDN官网。

*/
function dbCursorDelete(db, storeName, indexName, indexValue) {
    var store = db.transaction(storeName, "readwrite").objectStore(storeName);
    var request = store
        .index(indexName) // 索引对象
        .openCursor(IDBKeyRange.only(indexValue)); // 指针对象
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        var deleteRequest;
        if (cursor) {
            deleteRequest = cursor.delete(); // 请求删除当前项
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
/**
 * 关闭数据库
 * @param {object} db 数据库实例
当我们数据库操作完毕后，建议关闭它，节约资源。

*/
function dbCloseDB(db) {
    db.close();
    console.log("数据库已关闭");
}
/**
 * 删除数据库
 * @param {object} dbName 数据库名称
最后我们需要删库跑路，删除操作也很简单。

*/
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
