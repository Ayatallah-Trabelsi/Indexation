
const imageselected = document.getElementById('datafile');
        const searchButton = document.getElementById('search-button');
        const resultsDiv = document.getElementById('results');

        searchButton.addEventListener('click', async (evt) => {
           evt.preventDefault();
           let name = imageselected.files.item(0).name
           fetch(`http://localhost:3000/getimage?id=${name}`,{
           
            headers: {
                "Content-Type": "application/json",
              }, 
           }).then((res) => res.json()).then((data) =>{
            /*resultsDiv.src="./result.jpg"
            return false
           })
           )*/
           // Check if the status is "ok"
            if (data.status === "ok" && data.image) {
                // Set the src attribute of the results image
                resultsDiv.src = `data:image/jpeg;base64,${data.image}`;
            } else {
                // Handle error case
                console.error("Failed to get image data");
            }
    })
    .catch((error) => {
        console.error("Error fetching image data:", error);
    });
        },false);

        /*const uploadForm = document.getElementById('uploadForm');
        const messageDiv = document.getElementById('message');
        
        import weaviate from 'weaviate-ts-client';
        
        const client = weaviate.client({
            scheme: 'http',
            host: 'localhost:8080',
        });
        
        
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
        
            const fileInput = document.querySelector('input[type="file"]');
            const test = await fileInput.files[0].arrayBuffer();
            const resImage = await client.graphql.get()
            .withClassName('Meme')
            .withFields(['image'])
            .withNearImage({ image: test })
            .withLimit(1)
            .do();
            
            const buffer = resImage.data.Get.Meme[0].image;
        
            // Convert buffer to base64 string
            const base64Image = Buffer.from(buffer).toString('base64');
            const dataURL = `data:image/jpeg;base64,${base64Image}`;
            
            // Create an image element and set its source to the data URL
            const imgElement = document.createElement('img');
            imgElement.src = dataURL;
            
            // Append the image element to a container in the HTML document
            document.getElementById('imageContainer').appendChild(imgElement);
        
        
        });*/