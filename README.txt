----Features----

AES-256-CBC encryption to protect form field data.

Fields appear one at a time and disappear after right click anywhere in the screen or tab key and move to next field.

Random decoy fields are filtered out automatically.

Once all real fields are filled, the form auto-submits to the server.

Works without a database — just frontend and backend communication via API.



----Technology Used----

Frontend: React.js

Backend: Node.js (Express)

Encryption: AES-256-CBC (using crypto on the backend, crypto-js on the frontend)



----Working----

The backend defines a list of form fields ('name:text','email:text','dob:date','location:text').

Each field is encrypted with a secret key and a random IV (initialization vector).

The encrypted data is sent to the frontend as JSON.

The frontend uses the same secret key to decrypt the field data.

Any field that isn't valid is ignored.

The user sees one field at a time — once they fill it and move on, the next one appears.

After all fields are complete, the data is automatically submitted to the backend.