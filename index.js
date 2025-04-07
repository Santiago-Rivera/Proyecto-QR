import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            message: "Type in your URL: ",
            name: "URL",
        },
    ])
    .then((answers) => {
        const url = answers.URL;

        // Generate a unique filename for the QR code image
        const timestamp = Date.now();
        const qrImageFilename = `qr_img_${timestamp}.png`;

        // Create the QR code image
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream(qrImageFilename));

        // Append the URL and the corresponding QR code image filename to the text file
        const logEntry = `URL: ${url}, QR Image: ${qrImageFilename}\n`;
        fs.appendFile("URL.txt", logEntry, (err) => {
            if (err) throw err;
            console.log("The URL and QR image filename have been appended to the file!");
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment.");
        } else {
            console.error("An error occurred:", error);
        }
    });