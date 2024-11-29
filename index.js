import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

const schemaRes = await client.schema.getter().do();

console.log(schemaRes)

const schemaConfig = {
    'class': 'sim',
    'vectorizer': 'img2vec-neural',
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        'img2vec-neural': {
            'imageFields': [
                'image'
            ]
        }
    },
    'properties': [
        {
            'name': 'image',
            'dataType': ['blob']
        },
        {
            'name': 'text',
            'dataType': ['string']
        }
    ]
}

/*await client.schema
    .classCreator()
    .withClass(schemaConfig)
    .do();
*/

const fs = import('fs');
//import { readFileSync } from 'fs';

const img = readFileSync('./img/landscape.jpg');

const b64 = Buffer.from(img).toString('base64');
    
await client.data.creator()
    .withClassName('Meme')
    .withProperties({
        image: b64,
        text: 'matrix meme'
    })
    .do();

/*const fs = import('fs');
import { readdirSync } from 'fs';

function toBase64(data) {
    return Buffer.from(data).toString('base64'); // Convert data to Base64
  }

const imgFiles = readdirSync('./img');

const promises = imgFiles.map(async (imgFile) =>{
    const b64 = toBase64('./img/${imgFile}');

    await client.data.creator()
    .withClassName('Meme')
    .withProperties({
        image: b64,
        text: imgFile.split('.')[0].split('_').join(' ')
    })
    .do();  
})
await Promise.all(promises);*/


import { readFileSync } from 'fs';
const test = Buffer.from(readFileSync('./test-landscape.jpg') ).toString('base64');

const resImage = await client.graphql.get()
    .withClassName('Meme')
    .withFields(['image'])
    .withNearImage({ image: test })
    .withLimit(2)
    .do();
    
// Write result to filesystem
/*const result = resImage.data.Get.Meme[0].image;

writeFileSync('./result.jpg', result, 'base64');*/

import {  writeFileSync } from 'fs';
const resultImages = resImage.data.Get.Meme.slice(0, 2); // Get the first 2 images

for (let i = 0; i < resultImages.length; i++) {
  const imageData = resultImages[i].image;
  const filename = `./result${i + 1}.jpg`; // Create unique filenames for each image

  writeFileSync(filename, imageData, 'base64');
}