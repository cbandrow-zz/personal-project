const jsonData = (content) => {
  console.log(content, 'content from jsonData')
   let data = {
     "requests": [
    	{
    	  "image": {
    	    "content": `${content}`
    	  },
    	  "features": [
    	      {
    	      	"type": "WEB_DETECTION",
    			    "maxResults": 200
    	     }
    	  ]
    	}
    ]
  }
  return data
};

export default jsonData
