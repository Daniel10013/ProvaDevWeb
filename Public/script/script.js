var data = 0;
var filter = 0;

$(document).ready(()=>{
 
    allData();

    $('#select').on('change',()=> {
        if($("#select option:selected").val() == -1){
            allData();
        }
        else{
            fetchFilter($("#select option:selected").val())
        }
    });


    $("#section").on('click', (e)=>{
        let id = e.target.id
        if(e.target.id.includes('cor')){
            let btn = document.getElementById(id)
            btn.style.backgroundColor = "#40b03a";
            btn.style.color = "white";
        }
        if(e.target.id.includes('inc')){
            let btn = document.getElementById(id)
            btn.style.backgroundColor = "#c92432";
            btn.style.color = "white";
        }
    })
})

function allData(){
    $("#loader").show();
    $("#section").css("display", "none")
    fetch('http://localhost:3000/api/fetch/all').then(result =>{
        result.json().then(response=>{
            data = response.questions;
            filter = response.filters
            addFiltersOnSelect(filter);
            printQuestions(data)
        }).then(()=>{
            $("#loader").hide();
            $("#section").css("display", "flex")
        })
        }).catch(error=>{
            error["msg"] = "Erro ao fazer requisição a API";
            console.log(error)
        })   
}


function fetchFilter(selectedFilter){
    
    $("#loader").show();
    $("#section").css("display", "none")
    console.log(selectedFilter)
    fetch('http://localhost:3000/api/fetch/filter', {
        method: 'POST',
        body: JSON.stringify({
            filter: selectedFilter
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(result =>{
        result.json().then(response=>{
            data = response.questions;
            printQuestions(data)
        }).then(()=>{
            $("#loader").hide();
            $("#section").css("display", "flex")
        })
        }).catch(error=>{
            error["msg"] = "Erro ao fazer requisição a API";
            console.log(error)
        })  
}

function printQuestions(data){
    $("#section").html(' ')
    data.forEach((eachData, index) =>{
        let answers = [];
        answers.push('<button id="cor'+ index+'" class="btn">'+ eachData.correct_answer +'</button>');
        eachData.incorrect_answers.forEach((item , i)=>{
            answers.push('<button id="'+ i +'inc'+ index+'" class="btn">'+ item +'</button>')
        })
        answers = shuffle(answers);
        $("#section").append(
        '<div class="pergunta">' +
            '<p>Category: ' + eachData.category +'</p>' +
            '<h4>' + eachData.question + '</h4>' +
            '<div class="answerButtons" id="buttons'+ index +'">' +
            '</div>' +
        '</div>'
        );

        $("#buttons" + index).append(answers);
    })


}

function addFiltersOnSelect(filter){
    filter.forEach(eachFilter => {
        $("#select").append('<option value="'+ eachFilter +'">'+ eachFilter +'</option>') 
    });
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}