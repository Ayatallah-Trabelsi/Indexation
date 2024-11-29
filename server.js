const express = require("express")
const app = express()
const cors = require("cors");
app.use(cors());
const weaviate = require('weaviate-ts-client');

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});


const fs =require("fs");
app.get("/getimage",async(req,res) =>{
    const name = req.query.id;
    const test = Buffer.from(fs.readFileSync(`./${name}`) ).toString('base64');

const resImage = await client.graphql.get()
    .withClassName('Meme')
    .withFields(['image'])
    .withNearImage({ image: test })
    .withLimit(1)
    .do();
    
// Write result to filesystem
const result = resImage.data.Get.Meme[0].image;


writeFileSync('./result.jpg', result, 'base64');
res.send("./result.jpg")
})





app.listen(3000,() =>{
    console.log("server is running")
})