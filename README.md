# data

## Example images

`img/`

## Scripts

`scripts/`

**NOTE: Need Azure ML keys**

Example usage:

```
PREDICTION_KEY=abc TRAINING_KEY=def PROJECT_ID=hij node src/downloadTags.js
PREDICTION_KEY=abc TRAINING_KEY=def PROJECT_ID=hij node src/uploadImages.js
PREDICTION_KEY=abc TRAINING_KEY=def PROJECT_ID=hij node src/train.js
PREDICTION_KEY=abc TRAINING_KEY=def PROJECT_ID=hij ITERATION_ID=1 node src/testPrediction.js
```
