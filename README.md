# js-task-03
A simple todo [app](https://github.com/VolhaValasevich/js-task-03/tree/master#todo-app) + an [app for finding a character](https://github.com/VolhaValasevich/js-task-03/tree/master#app-for-finding-a-character) from [The Rick and Morty API](https://rickandmortyapi.com).

# Todo app
This app allows you to create a list of notes, add new notes, remove/update existing notes, sort notes by title, body and date, and export/import notes from excel.
## Installation and start
Run `npm install` before using the app for the first time.

If the list of notes does not exist yet, it will be created automatically. Note that the app will create and use todo.json file in your current working directory.
## Usage
#### Available commands:
- [List all notes](https://github.com/VolhaValasevich/js-task-03/tree/master#list-all-notes)
- [Add a new note](https://github.com/VolhaValasevich/js-task-03/tree/master#add-a-new-note)
- [Read a selected note](https://github.com/VolhaValasevich/js-task-03/tree/master#read-a-selected-note)
- [Remove a selected note](https://github.com/VolhaValasevich/js-task-03/tree/master#remove-a-selected-note)
- [Sort notes](https://github.com/VolhaValasevich/js-task-03/tree/master#sort-notes)
- [Import notes from an Excel file](https://github.com/VolhaValasevich/js-task-03/tree/master#import-notes-from-an-excel-file)
- [Export notes to an Excel file](https://github.com/VolhaValasevich/js-task-03/tree/master#export-notes-to-an-excel-file)
- [Update note](https://github.com/VolhaValasevich/js-task-03/tree/master#update-note)
##### List all notes
```
index.js list
```

This command will show all notes from todo.json in the command terminal. It does not take any parameters.
##### Add a new note
```
index.js add --title "New title" --body "New body"
index.js add -t "New title" -b "New body"
```

This command will add a new note to todo.json.
- --title or -t : Title of a new note. The title should be unique; if a note with the same title already exists, a warning will be displayed.
- --body or -b : Body of a new note.

Each note has a ```date``` parameter. It will be added automatically based on note creation time.
##### Read a selected note
```
index.js read --title title
index.js read -t title
```
This command will show title, body and creation time of a note with the specified title.
- --title or -t : The title of the note you want to read. If there is no note with such title, an error message will be displayed.
##### Remove a selected note
```
index.js remove --title title
index.js remove -t title
```
This command will remove the note with the specified title from todo.json.
- --title or -t : The title of the note you want to remove. If there is no note with such title, an error message will be displayed.
##### Sort notes
```
index.js sort
index.js sort --parameter titlelength --order desc
index.js sort -p date
```
This command will sort all notes by chosen parameter in chosen order, display them in the console terminal and rewrite todo.json.
- --parameter or -p : A parameter to sort notes by. Available parameters: date, titlelength, bodylength, title (alphabetical). Default: title.
- --order or -o : Order of sorting (asc or desc). Default: asc.
##### Import notes from an Excel file
```
index.js readExcel --file notes.xlsx
index.js readExcel -f notes.xlsx
```
This command will read all notes from an Excel file and save them in todo.json. Note that the existing todo.json file will be rewritten.
- --file or -f : A path to .xslx file with notes.
##### Export notes to an Excel file
```
index.js writeExcel --file notes.xlsx
index.js writeExcel -f notes.xlsx
```
This command will write all notes from todo.json to an Excel file.
- --file or -f : A path to .xslx file where notes will be saved.
##### Update note
```
index.js update --title "old title" --newtitle "new title" --body "new body"
index.js update -t "old title" -n "new title" -b "new body"
```
This command will update title/body of a selected note.
- --title or -t : Title of a note you want to update. If there is no note with such title, an error message will be displayed.
- --newtitle or -n : New title of a note. Optional argument.
- --body or -b : New body of a note. Optional argument.
# App for finding a character
This app allows you to search for a character(s) on the Rick and Morty database. You can enter multiple parameters for search. 
Search results will be displayed in the console terminal and saved in a unique .json file.
## Installation and start
Run `npm install` before using the app for the first time.
## Usage
```
index.js -n Rick
index.js --name "Rick Sanchez" --status Alive
```
### Available parameters for search:
- --id or -i
- --name or -n
- --status or -u
- --species or -s
- --type or -t
- --gender or -g
- --origin or -o
- --location or -l

At least one parameter for search is required. Note that the search is case sensitive and accepts any partial matches.
