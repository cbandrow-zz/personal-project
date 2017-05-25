const jsonData = (content) => {
   let data = {
     "requests": [
    	{
    	  "image": {
    	    "content": `${content}`
    	  },
    	  "features": [
    	      {
    	      	"type": "WEB_DETECTION",
    			    "maxResults": 15,
    	     }
    	  ]
    	}
    ]
  }
  return data
};

export default jsonData

let data = {
  "requests":[
    {
      "image":{
        "content":`${content}`
      },
      "features":[
        {
          "type":"TYPE_UNSPECIFIED",
          "maxResults":10
        }
      ]
    }
  ]
}
