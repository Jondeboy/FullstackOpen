sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: User clicks "Save" and Browser saves the note in the local notes list
    Note right of browser: Note is rendered for the user
    Note right of browser: Browser sends json object including content (text) and date to the server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: Server saves the note in the notes list and returns success code
    server-->>browser: Status 201 with json message "note created"
    deactivate server