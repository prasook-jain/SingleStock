const airtable = require('airtable');

//Add APIKEY to .env folder before submiting assignment
airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyFxvyTYhr9optmZ'
})

var query = airtable.base('app6Vas60DNc0g354')('Imported table')

export async function createData(date, shareValue){
    let newShare = {};

    try{
        newShare = await new Promise((resolve, reject) => {
            query.create({
                "date": date,
                "close": 205.95,
                "volume": 20206666,
                "open": shareValue,
                "high": 211,
                "low": 201.8
            }, function(err, record) {
                if (err) {
                  newShare = {}
                  console.log('Err in async call : ', err);
                  reject(err)
                } else {
                    resolve({
                        id:record.getId(),
                        date: new Date(record.get('date')),
                        isEmpty: record.get('open')<=0?true:false,
                        open: shareValue
                    })
                }
            });
        })
    } catch(err) {
        console.log('Inside CreateData Err:', err);
        newShare = {}
    }
    return newShare
}

export async function updateData(shareObj, value){
    let isUpdate = false;
    try{
        isUpdate = await new Promise( function(resolve, reject){
            query.update(shareObj.id,{
                'open': value,
            }, function done(err){
                if(err){
                    console.log('inside query error function', err)
                    resolve(false)
                } else {
                    resolve(true)
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
        isDelete = await new Promise( function(resolve, reject){
            query.destroy(shareObj.id, function done(err, deletedRecord){
                if(err){
                    console.error('Error inside deleteData', err)
                    resolve(false)
                } else {
                    // console.log(deletedRecord)
                    resolve(true)
                }
            })
        })
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

export default async function getData(){
    let shares = {};
    try{
        shares = await new Promise(function(resolve, reject){
            query.select({
                maxRecords: 300,
                view: 'Grid view',
                fields: ['date', 'open']
            }).eachPage(function page(records, fetchNextPage){
                records.forEach(function(record){
                    shares[record.get('date')] = {
                        id: record.id,
                        date: new Date(record.get('date')),
                        isEmpty: record.get('open')<=0?true:false,
                        open: record.get('open'),
                    }
                })
                fetchNextPage();
            }, function done(err){
                if(err) {
                    console.log('Errors in getData:', err);
                    reject(err);
                } else {
                    // console.log('Inside getData, : ',shares)
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
