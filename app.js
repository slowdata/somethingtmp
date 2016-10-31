$(document).ready(function() {

  var btn = $('#copy-button')[0];
  var clipboard = new Clipboard(btn);


  $('#getPassword').submit(function (e) {
    e.preventDefault();

    var serviceURL = 'http://192.168.1.70:8000/pg.asmx';
    var soapRequest=
      '<?xml version="1.0" encoding="utf-8"?>\
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
          <soap:Body>\
            <PS xmlns="http://tempuri.org/">\
              <niss>${nissInput.value}</niss>\
            </PS>\
          </soap:Body>\
        </soap:Envelope>'

    $.ajax({
      type: 'POST',
      url: serviceURL,
      contentType: 'text/xml',
      dataType: 'xml',
      data: soapRequest,
      success: successOccur,
      error: errorOccur
    });

  });
});

function successOccur(data, status, req) {
  if (status == "success") {
    //console.log(req.responseText);
    var xml = $($.parseXML(req.responseText));
    var ps = {
      nome: xml.find("_nome").text(),
      morada: xml.find("_morada").text(),
      niss: xml.find("_niss").text(),
      password: xml.find("_password").text()
    };
    $('#ps-nome').val(ps.nome);
    $('#ps-morada').val(ps.morada);
    $('#ps-niss').val(ps.niss);
    $('#pw').text(ps.password);

  }
}

function errorOccur(data, status, req) {
  $('#pass-alert').removeClass('alert-success');
  $('#pass-alert').addClass('alert-danger');
  if(req) $('#pw').text(req);
}
