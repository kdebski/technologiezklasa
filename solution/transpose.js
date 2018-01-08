function createPad(text_length, key_length, pad) {
  if (text_length % key_length == 0) {
    return "";
  }
  return Array(key_length - (text_length % key_length) + 1).join(pad);
}
function sort_key(key) {
  sorted_key = [];
  for (var letter = 'a'; letter <= 'z'; letter = String.fromCharCode(letter.charCodeAt(0) + 1)) {
    if (key.indexOf(letter) >= 0) {
      sorted_key.push(key.indexOf(letter));
    }
  }
  return sorted_key;
}
function get_text_column(full_text, column_number, row_length, column_length) {
  text_column = "";
  for (var i=0; i<column_length; i++) {
    text_column += full_text.charAt(i * row_length + column_number);
  }
  return text_column;
}

function transposeEncrypt(unsecured_text, key, pad) {
  var padded_text = unsecured_text + createPad(unsecured_text.length, key.length, pad);
  var sorted_key = sort_key(key);
  var secured_text = "";
  for (var i=0; i<sorted_key.length; i++) {
    secured_text += get_text_column(padded_text, sorted_key[i], key.length, padded_text.length/key.length)
  }
  return secured_text;
}

function sort_columns(sorted_key) {
  sorted_columns = Array(sorted_key.length);
  for (var i=0; i<sorted_key.length; i++) {
    sorted_columns[i] = sorted_key.indexOf(i);
  }
  return sorted_columns;
}

function transposeDecrypt(secured_text, key, pad) {
  var sorted_columns = sort_columns(sort_key(key));
  var column_length = secured_text.length/key.length;
  var unsecured_text = "";
  for (var j=0; j<secured_text.length/key.length; j++) {
    for (var i=0; i<sorted_columns.length; i++) {
      unsecured_text += secured_text.charAt(j + column_length * sorted_columns[i]);
    }
  }
  return unsecured_text;
}

function encrypt() {
  document.getElementById("secured_text").value = transposeEncrypt(document.getElementById("unsecured_text").value.toLowerCase(),
                                                                   document.getElementById("key").value.toLowerCase(),
                                                                   document.getElementById("pad").value.toLowerCase()
                                                                 );
}
function decrypt() {
  document.getElementById("unsecured_text").value = transposeDecrypt(document.getElementById("secured_text").value.toLowerCase(),
                                                                   document.getElementById("key").value.toLowerCase(),
                                                                   document.getElementById("pad").value.toLowerCase());
}
