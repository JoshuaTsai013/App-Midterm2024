import React from "react";
import { FlatList } from "react-native";
import JourneyDetail from "./JourneyDetail";
import * as FileSystem from 'expo-file-system';

    const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        imageUri: '...' // URI of the selected image
    };

    async function handleFormSubmission() {
        try {
            // Store the image file
            const imageFileUri = await storeImageFile(formData.imageUri);

            // Update the formData object with the saved image file URI
            const formDataWithImageUri = {
                ...formData,
                imageUri: imageFileUri,
            };

            // Store the updated form data
            await storeFormData(formDataWithImageUri);
        } catch (error) {
            // Handle errors appropriately (e.g., show an error message to the user)
        }
    }


    async function storeFormData(formData) {
        try {
            const filename = 'formData.json'; // Choose a suitable filename
            const fileUri = FileSystem.documentDirectory + filename; // Path in app's documents directory

            // Convert form data to JSON string
            const jsonString = JSON.stringify(formData);

            // Write JSON string to file
            await FileSystem.writeAsStringAsync(fileUri, jsonString);
            console.log('Form data saved successfully!');

            return fileUri; // Return file URI if needed
        } catch (error) {
            console.error('Error storing form data:', error);
            throw error; // Rethrow the error for handling elsewhere
        }
    }

    async function storeImageFile(imageUri) {
        try {
            const filename = 'image.jpg'; // Adjust the extension if needed (e.g., '.png')
            const fileUri = FileSystem.documentDirectory + filename;

            // If the image is from the camera or photo library, get its local URI
            const localUri = await FileSystem.downloadAsync(imageUri, fileUri);

            console.log('Image file saved successfully!', localUri.uri);
            return localUri.uri;
        } catch (error) {
            console.error('Error storing image file:', error);
            throw error;
        }
    }
    async function updateFormData(newData) {
        const filename = 'formData.json';
        const fileUri = FileSystem.documentDirectory + filename;

        try {
            // Read existing data
            const existingDataString = await FileSystem.readAsStringAsync(fileUri);
            const existingData = JSON.parse(existingDataString);

            // Update data
            const updatedData = { ...existingData, ...newData }; // Merge new data with existing

            // Save updated data
            const updatedDataString = JSON.stringify(updatedData);
            await FileSystem.writeAsStringAsync(fileUri, updatedDataString);

            console.log('Form data updated successfully!');
        } catch (error) {
            console.error('Error updating form data:', error);
        }
    }

    async function logStoredJSONFile() {
        const filename = 'formData.json'; // Or the name of your stored JSON file
        const fileUri = FileSystem.documentDirectory + filename;

        try {
            const fileContent = await FileSystem.readAsStringAsync(fileUri);
            const data = JSON.parse(fileContent);

            console.log(data); // Simple log
            console.table(data); // Log as a table (if applicable)
        } catch (error) {
            console.error('Error reading or parsing JSON file:', error);
        }
    }
      
export {handleFormSubmission,storeFormData,storeImageFile,updateFormData,logStoredJSONFile};