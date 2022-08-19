import fetch from 'node-fetch';

export async function getAllData(req, res){
    try{
        fetch('https://opentdb.com/api.php?amount=30&amp;category=18').then(result =>{
            result.json().then(response=>{
                let filters = getFilters(response.results);
                res.send({questions: response.results, filters: filters});
            })
        }).catch(error=>{
            error["msg"] = "Erro ao fazer requisição a API";
            res.send(error);
        })
    }
    catch(err){
        console.log(err)
    }
}

export async function getFilterData(req, res){
    try{
        console.log(req.body);
        fetch('https://opentdb.com/api.php?amount=30&amp;category=18').then(result =>{
            result.json().then(response=>{
                let filteredData = response.results.filter(data => data.category == req.body.filter);
                res.send({questions: filteredData});
            })
        }).catch(error=>{
            error["msg"] = "Erro ao fazer requisição a API";
            res.send(error);
        })
    }
    catch(err){
        console.log(err)
    }
}

function getFilters(data = []){
    let array_to_filter = [];
    data.map(eachData =>{
        array_to_filter.push(eachData.category);
    })
    
    let set = new Set(array_to_filter)
    let filters = []
    set.forEach(eachSet =>{
        filters.push(eachSet);
    })
    return filters;
}