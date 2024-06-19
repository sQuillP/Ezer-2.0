
import { Ezer } from "../Ezer";

/**
 * @description - Makes request to get signed URL and then 
 * makes PUT request to upload image to S3. It will then return the 
 * created URI associated with the image.
 * @returns {Promise<string>} URI of the uploaded image. This should not be lost.
 */
export async function uploadImageToS3(imageObject) {
    const blobPromise = await fetch(imageObject.uri);
    const blob = await blobPromise.blob();
    const imageExt = imageObject.uri.split('.').pop();
    const imageMime = `image/${imageExt}`;
    const fileToUpload = new File([blob],`new_image.${imageExt}`);
    const linkResponse = await Ezer.post('/auth',{ extension:imageExt},{params:{authType: 'imagelink'}});//get signed url
    const s3Link = linkResponse.data.data;
    //Make PUT request to aws s3 bucket
    const response = await fetch(s3Link,{ 
        method: 'PUT', 
        headers: { "Content-Type": imageMime},
        body: fileToUpload
    });
    const imageURL = s3Link.split('?')[0];
    return imageURL;
}



/**
 * @param {string} uri - image URI to delete
 * @description - get a signed S3 url to make DELETE request and remove image data.
 * We probably don't even need to use this TBH.
 */
export async function deleteImageFromS3(uri) {
    //get signed url
    const key = uri.split('/').pop();
    const linkResponse = await Ezer.post('/users/profileImage',{s3Method:'DELETE', content: key});
    const s3Link = linkResponse.data.data;
    //make delete request to that signed url.
    const response = await fetch(s3Link, {
        method:"DELETE",
    });
}