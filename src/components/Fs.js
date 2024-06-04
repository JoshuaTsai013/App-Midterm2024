import React from "react";

import * as FileSystem from 'expo-file-system';

export async function updateFormData(newData) {
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

export async function getStoredTripData() {
    const filename = 'tripData.json';
    const fileUri = FileSystem.documentDirectory + filename;

    try {
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        const tripData = JSON.parse(fileContent);

        console.log('getStoredTripData function Retrieved trip data:', tripData);
        //logStoredJSONFile('tripData.json')
        return tripData; // Return the parsed data js object
    } catch (error) {

        console.error('Error reading data:', error);

        return []; // Return an empty array if the file doesn't exist or there's an error
    }
}


export async function logStoredJSONFile(name) {
    const filename = name; // Or the name of your stored JSON file
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

