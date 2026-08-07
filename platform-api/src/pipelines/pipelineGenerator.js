const {

generateCloudRunWorkflow

} = require("./cloudrun");

function generatePipeline(application){

switch(application.service){

case "Cloud Run":

return generateCloudRunWorkflow();

default:

return generateCloudRunWorkflow();

}

}

module.exports={

generatePipeline

};