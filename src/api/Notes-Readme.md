# Information and notes on API for Website

- To retrieve API Key do the following:
  /_API EXAMPLE - https://api.harvardartmuseums.org/RESOURCE_TYPE?apikey=YOUR_API_KEY_/

- Data is in JSON format to below:
  {
  "info": {
  "totalrecordsperquery": 10,
  "totalrecords": 224111,
  "pages": 22412,
  "page": 1,
  "next": "",
  "prev": "",
  "responsetime": "5 ms"
  },
  "records": [

      ],
      "aggregations": {

      }

  }

- you can return large numbers of records from 10 to 100 by addting the size parameter to a request such as:
  &size=100

- And to move through the a large record you can use page parameter and se it like &page=2. Example of both would be:

  https://api.harvardartmuseums.org/object?size=5&page=42

- any bad or missing API key returns 401 Unauthorized or anything that isn't in the resourses returns a 404 Not Found

- Images support IIIF and is used to resize images on the fly. You can append height and width parameters to image URLs to get it to fit. Example:
  https://nrs.harvard.edu/urn-3:HUAM:OCP16703_dynmc?height=150&width=150

- IIIF image service is accessed through the data found in the field iiifbaseuri. Similar to examples below:

  # Image Request URI:

  {scheme}://{server}{/prefix}/{identifier}/{region}/{size}/{rotation}/{quality}.{format}

  # example:

  http://www.example.org/image-service/abcd1234/full/full/0/default.jpg

  # Image Information Request URI Syntax

  {scheme}://{server}{/prefix}/{identifier}/info.json

  # example:

  http://www.example.org/image-service/abcd1234/info.json

  # Harvard Examples:

  https://ids.lib.harvard.edu/ids/iiif/18483392
  https://ids.lib.harvard.edu/ids/iiif/18483392/full/full/0/default.jpg

  # Top level collection and presentation manifests

  https://iiif.harvardartmuseums.org/collections/top
  https://iiif.harvardartmuseums.org/manifests
  https://iiif.harvardartmuseums.org/manifests/object/299843

- Resources that are accessible in this API include the following:

  Object
  Person
  Exhibition
  Publication
  Gallery
  Spectrum
  Classification
  Century
  Color
  Culture
  Group
  Medium
  Support
  Period
  Place
  Technique
  Worktype
  Activity
  Site
  Video
  Image
  Audio
  Annotation

Example code Snippets:

# Node.js

    var rest = require("restler");

    // Find all of the objects with the word "dog" in the title and return only a few fields per record
    rest.get("https://api.harvardartmuseums.org/object", {
        query: {
          apikey: "YOUR APIKEY HERE",
          title: "dog",
          fields: "objectnumber,title,dated",
        }
    }).on("complete", function(data, response) {
        console.log(data);
    });
