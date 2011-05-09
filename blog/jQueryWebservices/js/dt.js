var DT = {};

DT.Soap = {
  getEnvelope: function(body) {
    var soapEnv = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'><soapenv:Body>" + body + "</soapenv:Body></soapenv:Envelope>";
    return soapEnv;
  }
}

DT.ws = function(wsUrl) {
    this.wsUrl = wsUrl;
}
DT.ws.prototype = {
    wsUrl: null,
    getData: function(soapEnvelope, fnComplete, fnSuccess, fnError) {
        $.ajax({
            url: this.wsUrl,
            type: "POST",
            dataType: "xml",
            data: soapEnvelope,
            contentType: "text/xml; charset=\"utf-8\"",
            complete: fnComplete,
            success: fnSuccess,
            error: fnError
        });
    }
}

DT.wsCustom = new DT.ws("wsCustom.asmx");
DT.wsCustom.HelloWorld = function(fnComplete, fnSuccess, fnError) {
    var soapEnv = DT.Soap.getEnvelope("<HelloWorld xmlns='http://yournamespace.com/'></HelloWorld>");
    this.getData(soapEnv, fnComplete, fnSuccess, fnError);
}

DT.xml.loadXMLDoc = function(fname) {
    var xmlDoc;
    // code for IE
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.load(fname);
        return (xmlDoc);
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (window.XMLHttpRequest) {
        xmlDoc = new window.XMLHttpRequest();
        xmlDoc.open("GET", fname, false);
        xmlDoc.send("");
        return xmlDoc.responseXML;
    } else {
        alert('Your browser cannot handle this script');
    }
}

DT.xml.xslTransform = function(xml, xsl) {
    // code for IE
    if (window.ActiveXObject) {
        ex = xml.transformNode(xsl);
        return ex;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        return resultDocument;
    }
}

$().ready(function() {
    DT.wsCustom.HelloWorld(function(xData, textStatus) {
        xsl = DT.xml.loadXMLDoc("yourxsl.xslt");
        doc = DT.xml.xslTransform(xData.responseXML, xsl);
        $("#HelloWorldDiv").html(doc);
    });
});
