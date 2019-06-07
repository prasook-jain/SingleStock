const airtable = require('airtable');

//Add APIKEY to .env folder before submiting assignment
airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyFxvyTYhr9optmZ'
})

var query = airtable.base('app6Vas60DNc0g354')('Imported table')

export async function getData(){
    let shares = [];
    try{
        shares = await new Promise(function(resolve, reject){
            query.select({
                maxRecords: 300,
                view: 'Grid view',
                fields: ['date', 'open']
            }).eachPage(function page(records, fetchNextPage){
                records.forEach(function(record){
                    shares.push({
                        id: record.id,
                        date: record.get('date'),
                        isEmpty: record.get('open')<=0?true:false,
                        open: record.get('open'),
                    })
                    // console.log('Retrieved', record.get('date'),record.get('open'))
                })
                fetchNextPage();
            }, function done(err){
                if(err) {
                    console.log('Errors in getData:', err);
                    reject(err);
                } else {
                    console.log(shares)
                    resolve(shares);
                }
            })
        })
    } catch(err) {
        console.log('Error during async/await getData() in airtableAPI.')
        console.log('Following is the error : ')
        console.log(err)
    }
    return shares
}

export async function updateData(shareObj, value){
    let isUpdate;
    try{
        isUpdate = await new Promise( function(resolve, reject){
            query.update(shareObj.id,{
                'open': value,
            }, function done(err){
                if(err){
                    console.log('inside query error function', err)
                    resolve(false)
                } else {
                    resolve(true);
                }
            })
        })
    } catch(err){
        isUpdate = false;
        console.log('error inside catch pharse',err);
    }
    return isUpdate;
}

// async function update(){
//     let shareObj = (await getData())[0];
//     console.log('update function', await updateData(shareObj, shareObj.open))
// }
// update();

export async function deleteData(shareObj){
    let isDelete;
    try{
        isDelete = await updateData(shareObj, -1);
        // new Promise( function(resolve, reject){
        //     query.destroy(shareObj.id, function done(err, deletedRecord){
        //         if(err){
        //             console.error('Error inside deleteData', err)
        //             resolve(false)
        //         } else {
        //             console.log(deletedRecord)
        //             resolve(true)
        //         }
        //     })
        // })
    } catch(err){
        isDelete = false
        console.log('Inside catch of deleteData ', err);
    }
    return isDelete;
}

// async function deleteFn(){
//     let shareObj = (await getData())[0]
//     console.log('delete function', await deleteData(shareObj));
// }

// deleteFn()