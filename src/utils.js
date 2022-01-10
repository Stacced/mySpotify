export const generateState = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  
    return text;
};

export const millisToMinutesAndSeconds = (millis) => {
    const d = new Date(millis)
    return d.getMinutes() + ":" + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
  }