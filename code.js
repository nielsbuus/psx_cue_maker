$(function() {

   $("#filepicker").change(function (){
       var fileNames = extractFilenames(this);
       var cueSheet = filenamesToCue(fileNames);
       $("#cuesheet").text(cueSheet);
       updateInstruction(fileNames[0]);
     });
})

function extractFilenames(fileInputElement) {
  var files = $.makeArray(fileInputElement.files)
  return files.map(function(file) {
    return file.name
  })
}

function filenamesToCue(fileNames) {
  fileNames = fileNames.slice()
  var firstFile = fileNames.shift()

  var sheet =  'FILE "' + firstFile + '" BINARY\n\
  TRACK 01 MODE2/2352\n\
    INDEX 01 00:00:00\n\
';
  var trackCounter = 2
  fileNames.forEach(function(fileName) {
    sheet += 'FILE "' + fileName + '" BINARY\n\
  TRACK ' + padLeadingZero(trackCounter) + " AUDIO\n\
    INDEX 00 00:00:00\n\
    INDEX 01 00:02:00\n\
"
    trackCounter++
  })

  return sheet;
}

function padLeadingZero(number) {
  var padded = "0" + number;
  return padded.substr(padded.length-2);
}

function updateInstruction(firstFile) {
  var cueFileName = firstFile.replace(/\(Track.+\)/i, "").trim().replace(/\s*\.bin$/, ".cue")
  $("#save_instructions").html("Copy the content above and dump it into notepad.exe or whatever you prefer and save it to the same folder as your bins. If you don't know what to call your cue file, my crummy regex suggests: <div class=\"cuefile-name-suggestion\">" + cueFileName + "</div>")
}
