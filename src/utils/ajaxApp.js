export default (action, data, callback) => {
    let sendData = { action: action }
    if(data){
        Object.assign(sendData, data);
    }

    //TODO: заменить на относительный путь после отладки
    fetch("/data.php", {
        method: "POST",
        body: JSON.stringify(sendData)
    })
    .then(res => res.json())
    .then(json => callback(json));
}