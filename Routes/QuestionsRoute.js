import { getAllData, getFilterData } from '../Controller/QuestionsController.js'
export default questionsRoute;

function questionsRoute(app){
    // Rota para pegar dados
    app.get('/api/fetch/all', async (req, res)=>{
        try{
            await getAllData(req, res)
        }   
        catch(err){
            console.log(err)
        }
    })

    app.post('/api/fetch/filter/', async (req, res)=>{
        try{
            await getFilterData(req, res)
        }   
        catch(err){
            console.log(err)
        }
    })

    //Rotas para renderizar views
    app.get('/', async (req, res)=>{
        try{
            res.render('index.ejs')
        }   
        catch(err){
            console.log(err)
        }
    })
}
