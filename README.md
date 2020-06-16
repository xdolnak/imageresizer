# Boataround coding challenge #

## Introduction ##

This coding challenge helps us to know the kay you are thinking, which technologies you prefer and the level of your knowledge

Create the simple image resizer application which takes a source file and resize it to the requested dimensions.

## Requirements ##

Application have one endpoint which accepts parameters:

 * path (path to image)
 * width (in pixels)
 * height (in pixels)
 * format (jpeg, webp, png...) (optional)
 * method (fit, fill, scaleWidth, scaleHeight, crop)

Don't shrink images.

Resize methods (implement as many as you can, but one is enough to show functionality)

 * Fit - the image should fit the requested width and height without changing aspect ratio
 * ScaleWidth - resize the image to requested width without changing aspect ratio
 * Scale Height - resize the image to requested height without changing aspect ratio
 * Fill - Resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.
 * Crop - Ensure the image covers both provided dimensions by cropping/clipping to fit.

## Technology ##

The tech stack is up to you but preferred technologies are:

 * PHP
 * NodeJS
 * Python

## Optional features ##

 * Use Open API specification
 * Create docker container(s) with all required code
 * Create tests
 * Modularity - Possibility to switch image source (local files, S3 bucket...)
 * Implement cache

## Delivery ##

Create a fork from this repository and start your work on that fork.
Commit often.
Use proper commit messages.
When all your code is committed and pushed create a pull request to the original repository.

The code will be reviewed and commented.

If you have any questions don't hesitate to ask <miroslav.kostka@dev.boataround.com>
