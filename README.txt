Golf Practice App – Local Test Build

How to run (recommended):
1) On a computer, put these files in a folder.
2) In that folder, run:
   python3 -m http.server 8000
3) Open: http://localhost:8000/

Why a server?
- This app uses ES modules (type="module"), and many browsers block module imports when opening index.html directly from the file system.

Phone testing:
- Once you're happy locally, publish to GitHub Pages and open the site in Safari.
