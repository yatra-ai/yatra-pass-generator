const express = require('express');
import { response } from "express";
import { PKPass } from "passkit-generator";

const app = express();

app.get('/generate-pass', async (req, res) => {
    try {
        // Define pass information according to your pass template
        const passDefinition = {
            // ... pass properties like serialNumber, description, organizationName, etc.
        };

        // Replace these with the paths to your actual certificates and keys
        let pass = new PKPass({}, 
            {
                wwdr: "~/projects/WWDR.pem", // Apple's WWDR certificate
                signerCert: "~/projects/passcertificate.pem", // Your pass certificate from Apple
                signerKey:  "~/projects/passkey.pem", // Your private key associated with the certificate
            },
        );

        // Adjust headers for the passbook file
        res.setHeader('Content-Type', 'application/vnd.apple.pkpass');
        res.setHeader('Content-Disposition', 'attachment; filename=pass.pkpass');

        // Pipe the pass file
        // pass.pipe(res);
        res.json(pass)

    } catch (error) {
        console.error("Error generating pass: ", error);
        res.status(500).send('An error occurred while generating the pass.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
