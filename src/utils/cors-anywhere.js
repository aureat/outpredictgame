const cors_api_url = "https://csb-qbo4dc-lvsifszlk-altunh.vercel.app/";

function doCORSRequest(options, callback) {
  const x = new XMLHttpRequest();
  x.open(options.method, cors_api_url + options.url);
  x.onload = x.onerror = function () {
    callback({
      method: options.method,
      url: options.url,
      data: options.data,
      status: x.status,
      statusText: x.statusText,
      responseText: x.responseText || ""
    });
  };
  if (/^POST/i.test(options.method)) {
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
  x.send(options.data);
}

function doGETRequest(url, callback) {
  return doCORSRequest(
    {
      method: "GET",
      url: url,
      data: ""
    },
    callback
  );
}

function doPOSTRequest({ url, data }, callback) {
  return doCORSRequest(
    {
      method: "POST",
      url: url,
      data: data
    },
    callback
  );
}

function doRequest({ method, url, data }, callback) {
  return doCORSRequest(
    {
      method: method,
      url: url,
      data: data
    },
    callback
  );
}

export { doGETRequest, doPOSTRequest, doRequest };
